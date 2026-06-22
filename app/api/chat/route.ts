import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase/service";
import { retrieveRelevantChunksPublic } from "@/lib/ai/rag";
import { chatStream } from "@/lib/ai/mistral";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENCODER = new TextEncoder();

export async function POST(req: NextRequest) {
  try {
    let botId: string | undefined;
    let apiKey: string | undefined;
    let message: string | undefined;
    let visitorId: string | undefined;
    let conversationId: string | undefined;

    const url = new URL(req.url);
    botId = url.searchParams.get("botId") || undefined;
    apiKey = url.searchParams.get("apiKey") || req.headers.get("x-api-key") || undefined;

    try {
      const body = await req.json();
      botId = body.botId || body.bot_id || botId;
      apiKey = body.apiKey || body.api_key || apiKey;
      message = body.message || body.query;
      visitorId = body.visitorId || body.visitor_id;
      conversationId = body.conversationId || body.conversation_id;
    } catch {
      // body may be empty if all data is in URL
    }

    if (!botId || !apiKey) {
      return new Response(JSON.stringify({ error: "botId and apiKey required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
    if (!message || !message.trim()) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const supabase = getServiceRoleClient();

    // Verify bot & API key using service client (bypasses RLS)
    const { data: bot, error: bErr } = await supabase
      .from("bots")
      .select("id, user_id, name, welcome_message, primary_color, position, avatar_url, api_key, status")
      .eq("id", botId)
      .eq("api_key", apiKey)
      .single();

    if (bErr || !bot) {
      return new Response(JSON.stringify({ error: "Invalid bot or API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if ((bot as any).status !== "active") {
      return new Response(JSON.stringify({ error: "Bot is paused" }), {
        status: 403,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Message quota
    const { data: userRow } = await supabase
      .from("users")
      .select("subscription_tier, monthly_message_count")
      .eq("id", (bot as any).user_id)
      .single();

    const messagesPerMonthLimit: Record<string, number> = {
      free: 100,
      starter: 3000,
      growth: 10000,
      agency: 50000,
    };
    const tier = (userRow as any)?.subscription_tier || "free";
    const limit = messagesPerMonthLimit[tier] || 100;
    if (((userRow as any)?.monthly_message_count || 0) >= limit) {
      return new Response(
        JSON.stringify({
          error: "Monthly message quota reached. The bot owner needs to upgrade their subscription.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    if (!visitorId) {
      visitorId = "v_" + Math.random().toString(36).slice(2, 10);
    }

    // Find or create a conversation
    let convId = conversationId;
    if (!convId) {
      const { data: conv } = await supabase
        .from("conversations")
        .insert({ bot_id: botId, visitor_id: visitorId, status: "active" } as any)
        .select()
        .single();
      convId = (conv as any)?.id;
    } else {
      await (supabase as any)
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", convId);
    }

    // Save user message
    await supabase.from("messages").insert({
      conversation_id: convId!,
      role: "user",
      content: message!,
    } as any);

    // Retrieve context via public-friendly retrieval (uses service client)
    const chunks = await retrieveRelevantChunksPublic(botId, message!, 4);
    const context = chunks.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n");

    const isEnglish = /^[\x00-\x7F\s.,!?'"-]+$/.test(message!);
    const systemPrompt = buildSystemPrompt((bot as any).name, (bot as any).welcome_message, context, isEnglish);

    // Get recent history for context (last 6 messages excluding current)
    const { data: history } = await supabase
      .from("messages")
      .select("role, content, created_at")
      .eq("conversation_id", convId!)
      .order("created_at", { ascending: false })
      .limit(6);
    const historyMsgs = (history || []).slice().reverse();

    // Build messages array
    const msgs: { role: "system" | "user" | "assistant"; content: string }[] = [];
    msgs.push({ role: "system", content: systemPrompt });
    for (const m of historyMsgs) {
      msgs.push({ role: (m as any).role, content: (m as any).content });
    }

    // --- Streaming ---
    const stream = new ReadableStream({
      async start(controller) {
        const meta = JSON.stringify({
          type: "meta",
          conversationId: convId,
          visitorId,
          botName: (bot as any).name,
        });
        controller.enqueue(ENCODER.encode(`data: ${meta}\n\n`));

        try {
          let full = "";
          for await (const chunk of chatStream(msgs)) {
            if (chunk.delta) {
              full += chunk.delta;
              controller.enqueue(
                ENCODER.encode(
                  `data: ${JSON.stringify({ type: "delta", content: chunk.delta })}\n\n`
                )
              );
            }
          }

          // Save assistant message
          await supabase.from("messages").insert({
            conversation_id: convId!,
            role: "assistant",
            content: full,
          } as any);

          // Increment monthly counter
          try {
            await supabase.rpc("increment_monthly_message", { user_uid: (bot as any).user_id } as any);
          } catch {
            await (supabase as any)
              .from("users")
              .update({ monthly_message_count: ((userRow as any)?.monthly_message_count || 0) + 1 })
              .eq("id", (bot as any).user_id);
          }

          controller.enqueue(
            ENCODER.encode(`data: ${JSON.stringify({ type: "done", content: full })}\n\n`)
          );
          controller.close();
        } catch (err: any) {
          console.error("chat stream error", err);
          controller.enqueue(
            ENCODER.encode(
              `data: ${JSON.stringify({ type: "error", message: err?.message || "Failed" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform, no-store",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

function buildSystemPrompt(
  botName: string,
  welcomeMessage: string,
  context: string,
  preferEnglish: boolean
) {
  const languageInstruction = preferEnglish
    ? "Always reply in English."
    : "Detect the user's language and reply in the same language. Supported: English, German, French, Spanish, Italian, Dutch.";

  return `You are ${botName}, a helpful AI assistant embedded on a website. ${languageInstruction}

Welcome message: "${welcomeMessage}"

Below is relevant knowledge from the website. Use it to answer questions accurately and concisely. If the answer is not in the knowledge, politely say so and offer to transfer to a human: say "I don't have specific information about that. Would you like me to show contact details?"

=== KNOWLEDGE ===
${context || "No specific knowledge available."}
=== END KNOWLEDGE ===

Instructions:
- Be concise and friendly.
- Use 2-4 sentences unless the user asks for detail.
- Never invent facts.
- If user asks for contact, show: "You can reach the team at [contact email/phone]."
- Format responses with plain text only - no markdown headings, no HTML.`;
}
