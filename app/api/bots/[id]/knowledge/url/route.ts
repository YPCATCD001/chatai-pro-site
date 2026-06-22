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

    const { url } = await request.json();
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json({ error: "Valid http(s) URL is required" }, { status: 400 });
    }

    // Fetch and parse the HTML page.
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ChatAI-Pro/1.0 (+https://chatai.pro/bot)",
        Accept: "text/html, text/plain, application/xhtml+xml",
      },
      // cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: HTTP ${res.status}` },
        { status: 400 }
      );
    }
    const contentType = res.headers.get("content-type") || "";
    if (!/text\/html|application\/xhtml|text\/plain/i.test(contentType)) {
      return NextResponse.json({ error: "URL does not serve a supported content type" }, { status: 400 });
    }

    const html = await res.text();
    const { title, text } = await extractReadable(html, url);

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "The URL did not return enough readable text" },
        { status: 400 }
      );
    }

    const { data: kb, error: kbErr } = await supabase
      .from("knowledge_base")
      .insert({
        bot_id: id,
        type: "url",
        title: title || url,
        source_url: url,
        content: "",
        status: "processing",
      } as any)
      .select()
      .single();

    if (kbErr || !kb) {
      return NextResponse.json({ error: kbErr?.message || "Failed to save" }, { status: 500 });
    }

    try {
      await processAndStoreKnowledge((kb as any).id, id, title || url, text);
    } catch (e: any) {
      console.error("vec failed", e);
    }

    return NextResponse.json({ ...(kb as any), status: "ready" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

async function extractReadable(html: string, _url: string): Promise<{ title: string; text: string }> {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  // Prefer cheerio if it loads cleanly; fall back to regex-based stripping.
  try {
    const cheerioMod = await import("cheerio");
    const cheerio = (cheerioMod as any).default || cheerioMod;
    const $ = cheerio.load(html);
    $("script, style, noscript, iframe, svg").remove();
    const main = $("main, article, #content, .content, body").first();
    const raw = (main.length ? main.text() : $("body").text() || "").toString();
    const cleaned = raw
      .replace(/\s*\n\s*/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (cleaned && cleaned.length >= 20) {
      return { title: title.trim(), text: cleaned };
    }
  } catch (_e) {
    // fall through to regex fallback
  }
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [])[1] || html;
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { title: title.trim(), text };
}
