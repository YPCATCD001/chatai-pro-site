import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPlanLimits, type SubscriptionTier } from "@/lib/plans";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("bots")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

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

    const body = await request.json();
    const name = body.name?.toString().trim();
    if (!name) return NextResponse.json({ error: "Bot name is required" }, { status: 400 });

    // Plan limits check (via service role since users row might not be writable through RLS fully)
    const { data: userRow, error: uErr } = await supabase
      .from("users")
      .select("subscription_tier")
      .eq("id", user.user.id)
      .single();

    const tier: SubscriptionTier =
      (userRow as any)?.subscription_tier || "free";
    const limits = getPlanLimits(tier);

    const { count, error: cErr } = await supabase
      .from("bots")
      .select("*", { count: "exact", head: true });

    if (cErr) {
      return NextResponse.json(
        { error: cErr.message || "Failed" },
        { status: 400 }
      );
    }

    if ((count ?? 0) >= limits.bots) {
      return NextResponse.json(
        {
          error: `You've reached your bot limit (${limits.bots}). Upgrade your plan.`,
        },
        { status: 403 }
      );
    }

    const payload: any = {
      user_id: user.user.id,
      name,
      welcome_message: body.welcome_message?.toString()?.trim() ||
        "Hi there! How can I help you today?",
      primary_color: body.primary_color || "#6366f1",
      position: body.position === "bottom-left" ? "bottom-left" : "bottom-right",
      avatar_url: body.avatar_url || null,
      status: body.status === "paused" ? "paused" : "active",
    };

    const { data, error } = await supabase
      .from("bots")
      .insert(payload)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
