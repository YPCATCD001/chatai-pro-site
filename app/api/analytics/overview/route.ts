import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Use RLS-scoped conversations query
    const { data: conversations } = await supabase
      .from("conversations")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    const convList = (conversations as { id: string; created_at: string }[] | null) ?? [];

    if (!convList.length) {
      return NextResponse.json({
        total_conversations: 0,
        total_messages: 0,
        total_user_messages: 0,
        total_assistant_messages: 0,
        last_7d_conversations: 0,
        last_7d_messages: 0,
      });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    const convIds = convList.map((c) => c.id);
    const recentConvIds = convList
      .filter((c) => new Date(c.created_at).getTime() > Date.now() - 7 * 24 * 3600 * 1000)
      .map((c) => c.id);

    const { count: totalMessages } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .in("conversation_id", convIds);

    const { count: totalUserMessages } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("role", "user")
      .in("conversation_id", convIds);

    const { count: totalAssistantMessages } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("role", "assistant")
      .in("conversation_id", convIds);

    const { count: last7dMessages } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo)
      .in("conversation_id", recentConvIds.length ? recentConvIds : ["--none--"]);

    return NextResponse.json({
      total_conversations: convIds.length,
      total_messages: totalMessages || 0,
      total_user_messages: totalUserMessages || 0,
      total_assistant_messages: totalAssistantMessages || 0,
      last_7d_conversations: recentConvIds.length,
      last_7d_messages: last7dMessages || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
