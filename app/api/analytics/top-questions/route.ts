import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Use RLS-based queries since authenticated user owns their bots/conversations
    const { data: conversations } = await supabase
      .from("conversations")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(500);

    const convList = (conversations as { id: string }[] | null) ?? [];
    if (!convList.length) return NextResponse.json({ questions: [] });

    const convIds = convList.map((c) => c.id);

    const { data: userMessages } = await supabase
      .from("messages")
      .select("content")
      .eq("role", "user")
      .in("conversation_id", convIds)
      .order("created_at", { ascending: false })
      .limit(500);

    const msgList = (userMessages as { content: string | null }[] | null) ?? [];

    const counts = new Map<string, number>();
    for (const m of msgList) {
      const key = (m.content || "").slice(0, 200).trim();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    const questions = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([content, count]) => ({ question: content, count }));

    return NextResponse.json({ questions });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
