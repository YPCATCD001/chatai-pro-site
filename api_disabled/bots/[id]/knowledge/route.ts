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

    // confirm ownership
    const { data: ownerBot, error: ownerErr } = await supabase
      .from("bots")
      .select("user_id")
      .eq("id", id)
      .single();
    if (ownerErr || !ownerBot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((ownerBot as any).user_id !== user.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("knowledge_base")
      .select("*")
      .eq("bot_id", id)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
