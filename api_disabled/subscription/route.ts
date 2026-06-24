import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("users")
      .select("subscription_tier, subscription_status, stripe_customer_id, monthly_message_count, reset_date")
      .eq("id", user.user.id)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe is not configured for this server." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const tier: string = body.tier || "starter";

    const prices: Record<string, number> = {
      starter: 4900,
      growth: 12900,
      agency: 29900,
    };
    const amount = prices[tier];
    if (!amount) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

    const { data: row } = await supabase
      .from("users")
      .select("email, stripe_customer_id")
      .eq("id", user.user.id)
      .single();

    let customerId = (row as any)?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: (row as any)?.email || user.user.email,
        metadata: { user_id: user.user.id },
      });
      customerId = customer.id;
      await (supabase as any)
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.user.id);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `ChatAI Pro - ${tier}` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: { user_id: user.user.id, tier },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=1`,
    });

    return NextResponse.json({ url: session.url, session_id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
