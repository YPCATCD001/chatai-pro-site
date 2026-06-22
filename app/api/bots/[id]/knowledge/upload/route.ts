import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { processAndStoreKnowledge } from "@/lib/ai/rag";
import { getPlanLimits, type SubscriptionTier } from "@/lib/plans";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

    const { data: userRow } = await supabase
      .from("users")
      .select("subscription_tier")
      .eq("id", user.user.id)
      .single();
    const tier: SubscriptionTier =
      (userRow as any)?.subscription_tier || "free";
    const limits = getPlanLimits(tier);
    const { count } = await supabase
      .from("knowledge_base")
      .select("*", { count: "exact", head: true })
      .eq("bot_id", id);
    if ((count ?? 0) >= limits.documents) {
      return NextResponse.json(
        { error: `Document limit reached (${limits.documents}). Upgrade to add more.` },
        { status: 403 }
      );
    }

    const form = await request.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File is too large (max 20MB)" }, { status: 400 });
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_TYPES.includes(file.type) && !["pdf", "txt", "docx"].includes(ext)) {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, TXT or DOCX." }, { status: 400 });
    }

    const fileBytes = await file.arrayBuffer();

    // Extract text from file - store directly in database, no Storage dependency
    let text = "";
    try {
      if (ext === "txt") {
        text = Buffer.from(fileBytes).toString("utf-8");
      } else if (ext === "pdf") {
        text = await extractPdfText(Buffer.from(fileBytes));
      } else if (ext === "docx") {
        text = await extractDocxText(Buffer.from(fileBytes));
      }
    } catch (extractErr: any) {
      return NextResponse.json(
        { error: `Failed to extract text: ${extractErr.message}` },
        { status: 500 }
      );
    }

    // Create KB row with content stored inline
    const { data: kb, error: kbErr } = await supabase
      .from("knowledge_base")
      .insert({
        bot_id: id,
        type: "document",
        title: file.name,
        content: text.substring(0, 500000), // cap at 500KB text
        status: "ready",
      } as any)
      .select()
      .single();

    if (kbErr || !kb) {
      return NextResponse.json({ error: kbErr?.message || "Failed to save" }, { status: 500 });
    }

    // Vectorize text for RAG search
    if (text.trim()) {
      try {
        await processAndStoreKnowledge((kb as any).id, id, file.name, text, supabase);
      } catch (vecErr: any) {
        console.error("vectorization failed:", vecErr);
      }
    }

    return NextResponse.json({ ...(kb as any), status: "ready" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const pdf = await import("pdf-parse").then((m) => m.default || (m as any));
  const data = await pdf(buffer);
  return (data?.text || "").toString();
}

async function extractDocxText(buffer: Buffer): Promise<string> {
  const { extractDocx } = await import("@/lib/ai/docx");
  return extractDocx(buffer);
}
