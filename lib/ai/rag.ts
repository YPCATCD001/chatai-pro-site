import { createClient } from "@/lib/supabase/server";
import { getServiceRoleClient } from "@/lib/supabase/service";
import { splitText } from "@/lib/ai/split";
import type { Database } from "@/lib/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Store the knowledge content with precomputed chunks so retrieval can
 * match text against these chunks directly, without needing an external
 * embeddings API. Each chunk is stored as a row in the embeddings table
 * (we keep the column name for schema compatibility; the `embedding`
 * column may be NULL when embeddings are not used).
 */
export async function processAndStoreKnowledge(
  knowledgeId: string,
  botId: string,
  title: string,
  content: string,
  supabase?: SupabaseClient<any, any>
) {
  if (!content || !content.trim()) {
    const client = supabase || (await createClient());
    await client
      .from("knowledge_base")
      .update({ status: "ready", content: "" })
      .eq("id", knowledgeId);
    return;
  }

  const chunks = splitText(content);

  const rows: Database["public"]["Tables"]["embeddings"]["Insert"][] =
    chunks.map((text, i) => ({
      knowledge_base_id: knowledgeId,
      bot_id: botId,
      content: text,
      // Embedding not required when using keyword fallback. Set to null.
      metadata: { index: i, title },
    }));

  const client = supabase || (await createClient());

  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    const { error } = await client.from("embeddings").insert(batch as any);
    if (error) {
      await client
        .from("knowledge_base")
        .update({ status: "error", content: content.slice(0, 1_000_000) })
        .eq("id", knowledgeId);
      throw error;
    }
  }

  await client
    .from("knowledge_base")
    .update({ status: "ready", content: content.slice(0, 1_000_000) })
    .eq("id", knowledgeId);
}

/**
 * Tokenize a string into lowercase words for lightweight keyword overlap
 * matching. Keeps only letters/digits so non-English content still works
 * (via character n-grams computed later by the caller).
 */
function tokenize(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, " ")
    .trim()
    .split(/\s+/);
}

/**
 * Simple overlap score: tokens from query that appear in chunk, weighted
 * by rarity (unique words). Returns a value between 0 and 1.
 */
function computeOverlapScore(queryTokens: Set<string>, chunk: string): number {
  if (!queryTokens.size) return 0;
  const chunkTokens = tokenize(chunk);
  if (!chunkTokens.length) return 0;
  let hits = 0;
  for (const t of chunkTokens) {
    if (queryTokens.has(t)) hits++;
  }
  // F1-like balance of precision/recall on short passages
  const recall = hits / Math.max(queryTokens.size, 1);
  const precision = hits / Math.max(chunkTokens.length, 1);
  if (recall + precision === 0) return 0;
  return (2 * recall * precision) / (recall + precision);
}

/**
 * Retrieve relevant text passages for a given query using lightweight
 * keyword overlap. Falls back gracefully when no embeddings API is
 * configured (e.g. when using DeepSeek which provides only chat).
 */
export async function retrieveRelevantChunks(
  botId: string,
  query: string,
  limit = 3,
  usePublicClient = false
): Promise<{ content: string; similarity: number }[]> {
  const supabase = usePublicClient
    ? getServiceRoleClient()
    : await createClient();

  // Try to match via SQL RPC if embeddings are present; otherwise fall
  // back to text-based ranking below.
  try {
    const { data } = await supabase.rpc("match_bot_embeddings", {
      _bot_id: botId,
      _embedding: null as any, // will be ignored; no vector index needed
      _limit: Math.max(limit, 20),
    } as any);
    // If the SQL function returned meaningful results, use them
    if (data && Array.isArray(data) && (data as any[]).length > 0 && (data as any[])[0]?.similarity != null) {
      return (data as { content: string; similarity: number }[]).slice(0, limit);
    }
  } catch {
    // Fall through to keyword ranking
  }

  return keywordRank(supabase, botId, query, limit);
}

/**
 * Public-facing (service-role) retrieval, used by embedded chat widgets.
 */
export async function retrieveRelevantChunksPublic(
  botId: string,
  query: string,
  limit = 3
): Promise<{ content: string; similarity: number }[]> {
  const supabase = getServiceRoleClient();
  return keywordRank(supabase, botId, query, limit);
}

async function keywordRank(
  supabase: SupabaseClient<any, any>,
  botId: string,
  query: string,
  limit: number
): Promise<{ content: string; similarity: number }[]> {
  // First try the embeddings table (we store plain text content there)
  const { data: embeddings } = await supabase
    .from("embeddings")
    .select("content")
    .eq("bot_id", botId)
    .limit(200);

  const queryTokens = new Set(tokenize(query));

  const results: { content: string; similarity: number }[] = [];
  if (embeddings && embeddings.length > 0) {
    for (const row of embeddings) {
      const content = (row as any).content;
      if (!content) continue;
      const score = computeOverlapScore(queryTokens, content);
      if (score > 0) results.push({ content, similarity: score });
    }
  }

  // Also look up the original knowledge_base rows if no embeddings exist
  if (results.length < limit) {
    const { data: kbs } = await supabase
      .from("knowledge_base")
      .select("content, title")
      .eq("bot_id", botId)
      .limit(20);

    if (kbs && kbs.length > 0) {
      for (const row of kbs) {
        const content = (row as any).content;
        if (!content) continue;
        const chunks = splitText(content);
        for (const chunk of chunks) {
          const score = computeOverlapScore(queryTokens, chunk);
          if (score > 0) results.push({ content: chunk, similarity: score });
        }
      }
    }
  }

  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, limit);
}
