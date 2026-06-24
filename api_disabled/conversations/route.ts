import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const botId = searchParams.get("botId");
    const q = searchParams.get("q")?.toString();

    // RLS automatically filters to user-owned conversations via bots.user_id
    let query = supabase
      .from("conversations")
      .select(
        "id, bot_id, visitor_id, visitor_email, status, created_at, updated_at, bots!inner(name)"
      )
      .eq("bots.user_id", user.user.id)
      .order("updated_at", { ascending: false });

    if (botId) {
      query = query.eq("bot_id", botId);
    }
    if (q) {
      const { data: msgData } = await supabase
        .from("messages")
        .select("conversation_id")
        .ilike("content", `%${q}%`);
      const ids = Array.from(new Set((msgData || []).map((m: any) => m.conversation_id)));
      if (ids.length) query = query.in("id", ids);
      else query = query.in("id", ["--nothing--"]);
    }

    const { data, error } = await query.limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
