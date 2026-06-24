"use client";

import { createClient } from "@/lib/supabase/client";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function searchKnowledge(botId: string, query: string): Promise<string[]> {
  try {
    const supabase = createClient() as any;
    const keywords = query.split(/\s+/).filter((k) => k.length > 1);
    const results: string[] = [];

    let embeddingsQuery = supabase
      .from("embeddings")
      .select("content")
      .eq("bot_id", botId)
      .limit(5);

    if (keywords.length > 0) {
      const searchTerm = keywords.join(" | ");
      embeddingsQuery = embeddingsQuery.textSearch("content", searchTerm, {
        type: "websearch",
      });
    }

    const { data: embeddingsData, error: embeddingsError } = await embeddingsQuery;
    
    if (embeddingsError) {
      console.warn("Embeddings search failed:", embeddingsError);
    } else if (embeddingsData) {
      results.push(...embeddingsData.map((item: any) => item.content).filter(Boolean));
    }

    let kbQuery = supabase
      .from("knowledge_base")
      .select("title, content")
      .eq("bot_id", botId)
      .eq("status", "ready")
      .limit(5);

    if (keywords.length > 0) {
      const searchTerm = keywords.join(" | ");
      kbQuery = kbQuery.or(`title.fts.${searchTerm},content.fts.${searchTerm}`);
    }

    const { data: kbData, error: kbError } = await kbQuery;
    
    if (kbError) {
      console.warn("Knowledge base search failed:", kbError);
    } else if (kbData) {
      for (const item of kbData) {
        const text = item.title && item.content 
          ? `${item.title}\n${item.content}` 
          : item.content || item.title;
        if (text && !results.includes(text)) {
          results.push(text);
        }
      }
    }

    return results.slice(0, 8);
  } catch (e) {
    console.warn("Knowledge search error:", e);
    return [];
  }
}

export async function getBotSettings(botId: string) {
  try {
    const supabase = createClient() as any;
    const { data, error } = await supabase
      .from("bots")
      .select("name, welcome_message, primary_color")
      .eq("id", botId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn("Failed to get bot settings:", e);
    return null;
  }
}

export async function sendToDeepSeek(
  messages: ChatMessage[],
  systemPrompt?: string
): Promise<string> {
  const finalMessages: ChatMessage[] = [];
  
  if (systemPrompt) {
    finalMessages.push({ role: "system", content: systemPrompt });
  }
  
  finalMessages.push(...messages);

  const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY || "";
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: finalMessages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "抱歉，我暂时无法回答这个问题。";
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
) {
  try {
    const supabase = createClient() as any;
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role,
        content,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn("Failed to save message:", e);
    return null;
  }
}

export async function createConversation(botId: string): Promise<string | null> {
  try {
    const supabase = createClient() as any;
    const visitorId = "visitor_" + Math.random().toString(36).substring(2, 10);
    
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        bot_id: botId,
        visitor_id: visitorId,
        status: "active",
      })
      .select()
      .single();
    
    if (error) throw error;
    return data.id;
  } catch (e) {
    console.warn("Failed to create conversation:", e);
    return null;
  }
}

export function buildSystemPrompt(botName: string, knowledge: string[]): string {
  let prompt = `你是 ${botName}，一个专业的 AI 客服助手。`;
  prompt += `\n\n请用友好、专业的语气回答用户的问题。`;
  prompt += `\n回答要简洁明了，重点突出。`;
  
  if (knowledge.length > 0) {
    prompt += `\n\n以下是参考知识库内容，请基于这些信息回答用户的问题：\n`;
    prompt += knowledge.map((k, i) => `[${i + 1}] ${k}`).join("\n");
    prompt += `\n\n如果参考资料中没有相关信息，请礼貌地告诉用户你无法回答该问题。`;
  }
  
  return prompt;
}
