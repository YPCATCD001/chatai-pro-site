import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { processAndStoreKnowledge } from "@/lib/ai/rag";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: bot, error: botErr } = await supabase
      .from("bots")
      .select("id, user_id")
      .eq("id", id)
      .single();
    if (botErr || !bot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((bot as any).user_id !== user.user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const items: { question: string; answer: string }[] = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return NextResponse.json({ error: "No FAQ items provided" }, { status: 400 });
    }

    const results = [];
    for (const item of items) {
      const q = (item.question || "").toString().trim();
      const a = (item.answer || "").toString().trim();
      if (!q || !a) continue;

      const { data: kb, error } = await (supabase as any)
        .from("knowledge_base")
        .insert({
          bot_id: id,
          type: "faq",
          title: q.slice(0, 200),
          content: "",
          status: "processing",
        })
        .select()
        .single();

      if (!kb) {
        console.error("failed to save FAQ", error);
        continue;
      }

      try {
        await processAndStoreKnowledge((kb as any).id, id, q, `Question: ${q}\nAnswer: ${a}`);
      } catch (e) {
        console.error("FAQ vectorization failed", e);
      }
      results.push({ ...(kb as any), status: "ready" });
    }

    return NextResponse.json({ ok: true, items: results });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
