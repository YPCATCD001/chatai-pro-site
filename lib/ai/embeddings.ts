import { createEmbeddings as mistralCreateEmbeddings, createEmbedding as mistralCreateEmbedding } from "@/lib/ai/mistral";

const BATCH_SIZE = 16;

export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (!texts.length) return [];
  const results: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const res = await mistralCreateEmbeddings(batch);
    for (const item of res) results.push(item);
  }
  return results;
}

export async function createEmbedding(text: string): Promise<number[]> {
  return mistralCreateEmbedding(text);
}
