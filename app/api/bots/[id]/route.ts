import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: ownerBot, error: ownerErr } = await supabase
      .from("bots")
      .select("user_id")
      .eq("id", id)
      .single();
    if (ownerErr || !ownerBot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((ownerBot as any).user_id !== user.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("bots")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: ownerBot, error: ownerErr } = await supabase
      .from("bots")
      .select("user_id")
      .eq("id", id)
      .single();
    if (ownerErr || !ownerBot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((ownerBot as any).user_id !== user.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const payload: Record<string, any> = {};
    if (body.name !== undefined) payload.name = body.name.toString().trim();
    if (body.welcome_message !== undefined)
      payload.welcome_message = body.welcome_message.toString().trim();
    if (body.primary_color) payload.primary_color = body.primary_color;
    if (body.position) payload.position = body.position;
    if (body.avatar_url !== undefined) payload.avatar_url = body.avatar_url || null;
    if (body.status) payload.status = body.status;

    const { data, error } = await (supabase as any)
      .from("bots")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: ownerBot, error: ownerErr } = await supabase
      .from("bots")
      .select("user_id")
      .eq("id", id)
      .single();
    if (ownerErr || !ownerBot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((ownerBot as any).user_id !== user.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { error } = await supabase.from("bots").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
