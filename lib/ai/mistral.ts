// DeepSeek OpenAI-compatible API client.
// Docs: https://api-docs.deepseek.com/
// Base URL: https://api.deepseek.com
//   - Chat:    POST /chat/completions  (stream=true -> SSE)
//   - Embeds:  POST /embeddings
// Auth: Authorization: Bearer <DEEPSEEK_API_KEY>

const API_BASE = "https://api.deepseek.com";

type Msg = { role: "system" | "user" | "assistant"; content: string };

function apiKey(): string {
  return process.env.DEEPSEEK_API_KEY || "";
}

// ---------- Streaming Chat ----------
// Yields { delta, done }. DeepSeek returns OpenAI-compatible SSE:
//   data: {"choices":[{"delta":{"content":"..."}}]}
//   data: [DONE]
export async function* chatStream(
  messages: Msg[]
): AsyncGenerator<{ delta: string; done: boolean }> {
  const key = apiKey();
  if (!key) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }

  const model = process.env.DEEPSEEK_CHAT_MODEL || "deepseek-chat";

  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.2,
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(`DeepSeek chat failed: ${res.status} ${text}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames separated by \n\n
    let sepIdx: number;
    while ((sepIdx = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sepIdx).trim();
      buffer = buffer.slice(sepIdx + 2);
      if (!frame) continue;

      const lines = frame.split("\n");
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const payload = t.slice(5).trim();
        if (!payload || payload === "[DONE]") {
          yield { delta: "", done: true };
          continue;
        }
        try {
          const obj = JSON.parse(payload);
          const delta = obj?.choices?.[0]?.delta?.content || "";
          if (delta) yield { delta, done: false };
        } catch {
          // ignore non-JSON frames
        }
      }
    }
  }
  yield { delta: "", done: true };
}

// ---------- Embeddings (batch) ----------
// DeepSeek embeddings endpoint accepts multiple inputs and returns a
// `data: [{embedding: [...]}, ...]` array in input order.
export async function createEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const key = apiKey();
  if (!key) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }
  if (!texts.length) return [];

  const model = process.env.DEEPSEEK_EMBEDDING_MODEL || "text-embedding-v2";

  const BATCH = 16;
  const out: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH).map((t) => (t || " ").slice(0, 4000));
    const res = await fetch(`${API_BASE}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, input: batch, encoding_format: "float" }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`DeepSeek embeddings failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    const arr: { embedding: number[]; index: number }[] = json.data || [];
    arr.sort((a, b) => a.index - b.index);
    for (const item of arr) out.push(item.embedding);
  }
  return out;
}

// ---------- Embedding (single) ----------
export async function createEmbedding(text: string): Promise<number[]> {
  const res = await createEmbeddings([text]);
  return res[0] || [];
}
