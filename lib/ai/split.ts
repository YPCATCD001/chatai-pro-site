export function splitText(text: string): string[] {
  return simpleSplit(text, 800, 200);
}

function simpleSplit(text: string, chunkSize: number, overlap: number): string[] {
  if (!text) return [];
  const clean = text.replace(/\r/g, "").trim();
  const chunks: string[] = [];
  // Prefer to split on double newlines (paragraphs).
  const paragraphs = clean.split(/\n\s*\n/).filter(Boolean);
  const out: string[] = [];
  let current = "";
  for (const p of paragraphs) {
    const candidate = current ? current + "\n\n" + p : p;
    if (candidate.length <= chunkSize) {
      current = candidate;
    } else {
        if (current) out.push(current);
        // Fallback: split by sentences if a single paragraph exceeds chunkSize.
        if (p.length <= chunkSize) {
          current = p;
        } else {
          const sentences = p.split(/(?<=[.!?])\s+/).filter(Boolean);
          current = "";
          for (const s of sentences) {
            const cand = current ? current + " " + s : s;
            if (cand.length <= chunkSize) {
              current = cand;
            } else {
              if (current) out.push(current);
              current = s;
            }
          }
        }
      }
  }
  if (current) out.push(current);

  // Overlap tailing chunks by `overlap` characters.
  for (let i = 0; i < out.length; i++) {
    let chunk = out[i];
    if (i > 0) {
      const prev = out[i - 1];
      const tail = prev.slice(-overlap);
      chunk = tail + chunk;
    }
    chunks.push(chunk.slice(0, chunkSize + overlap));
  }
  return chunks;
}
