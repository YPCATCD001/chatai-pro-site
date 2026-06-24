"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, Link as LinkIcon, HelpCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Bot { id: string; }
interface KBItem {
  id: string;
  bot_id: string;
  type: "document" | "url" | "faq";
  title: string;
  status: string;
  content?: string | null;
  file_url?: string | null;
  source_url?: string | null;
  created_at?: string;
}

export function KnowledgeTab({ bot }: { bot: Bot }) {
  const [items, setItems] = useState<KBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileUploading, setFileUploading] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [faq, setFaq] = useState("");
  const [faqA, setFaqA] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, [bot.id]);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await (createClient() as any)
        .from("knowledge_base")
        .select("*")
        .eq("bot_id", bot.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (Array.isArray(data)) setItems(data as KBItem[]);
    } catch (e: any) {
      alert(e.message || "Failed to load knowledge base");
    } finally {
      setLoading(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploading(file.name);
    try {
      const { data: { user } } = await (createClient() as any).auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const filePath = `${user.id}/${bot.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await (createClient() as any)
        .storage
        .from("knowledge-base")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicData } = createClient()
        .storage
        .from("knowledge-base")
        .getPublicUrl(filePath);

      const { error: insertError } = await (createClient() as any)
        .from("knowledge_base")
        .insert({
          bot_id: bot.id,
          type: "document",
          title: file.name,
          file_url: publicData.publicUrl,
          status: "processing",
        } as any);
      if (insertError) throw insertError;

      load();
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setFileUploading(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function addUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const { error } = await (createClient() as any)
        .from("knowledge_base")
        .insert({
          bot_id: bot.id,
          type: "url",
          title: url.trim(),
          source_url: url.trim(),
          status: "processing",
        } as any);
      if (error) throw error;
      setUrl("");
      load();
    } catch (e: any) { alert(e.message || "Failed"); }
  }

  async function addFaq(e: React.FormEvent) {
    e.preventDefault();
    if (!faq.trim() || !faqA.trim()) return;
    try {
      const { error } = await (createClient() as any)
        .from("knowledge_base")
        .insert({
          bot_id: bot.id,
          type: "faq",
          title: faq.trim(),
          content: faqA.trim(),
          status: "ready",
        } as any);
      if (error) throw error;
      setFaq("");
      setFaqA("");
      load();
    } catch (e: any) { alert(e.message || "Failed"); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      const { error } = await (createClient() as any)
        .from("knowledge_base")
        .delete()
        .eq("id", id);
      if (error) throw error;
      load();
    } catch (e: any) {
      alert(e.message || "Failed to delete");
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {/* Left: sources */}
      <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-lg">Knowledge sources</h2>
        <p className="text-slate-500 text-sm mt-1">
          Upload PDFs, point to your website, or write FAQs to teach the bot.
        </p>

        <div className="mt-5 grid md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
            <Upload className="h-5 w-5 mx-auto text-slate-500" />
            <div className="text-sm font-medium mt-1">Upload documents</div>
            <div className="text-xs text-slate-500 mb-2">PDF, TXT, DOCX · max 20MB</div>
            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.txt,.docx" onChange={onFileChange} />
            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              {fileUploading ? "Uploading…" : "Choose file"}
            </Button>
          </div>

          <form onSubmit={addUrl} className="rounded-lg border border-slate-200 p-4">
            <LinkIcon className="h-5 w-5 text-slate-500" />
            <div className="text-sm font-medium mt-1">Add a URL</div>
            <div className="text-xs text-slate-500 mb-2">We'll scrape the page.</div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-site.com/about"
              className="h-9 w-full rounded-md border border-slate-300 px-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <Button size="sm" variant="primary" className="mt-2 w-full" type="submit">Add URL</Button>
          </form>

          <form onSubmit={addFaq} className="rounded-lg border border-slate-200 p-4">
            <HelpCircle className="h-5 w-5 text-slate-500" />
            <div className="text-sm font-medium mt-1">Add FAQ</div>
            <input
              value={faq}
              onChange={(e) => setFaq(e.target.value)}
              placeholder="Question"
              className="h-9 w-full rounded-md border border-slate-300 px-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mt-2"
            />
            <input
              value={faqA}
              onChange={(e) => setFaqA(e.target.value)}
              placeholder="Answer"
              className="h-9 w-full rounded-md border border-slate-300 px-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mt-2"
            />
            <Button size="sm" variant="primary" className="mt-2 w-full" type="submit">Add FAQ</Button>
          </form>
        </div>

        <h3 className="mt-8 mb-3 font-medium text-sm text-slate-700">
          Sources ({items.length})
        </h3>
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            No sources yet — add a document, URL or FAQ above.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            {items.map((item) => (
              <li key={item.id} className="p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-slate-100 text-slate-500 text-xs flex items-center justify-center uppercase">
                  {item.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{item.title}</div>
                  <div className="text-xs text-slate-500">
                    {item.source_url || item.file_url || item.type}
                  </div>
                </div>
                <span className={"text-xs " + (item.status === "ready" ? "text-emerald-600" : "text-slate-500")}>
                  {item.status}
                </span>
                <Button size="sm" variant="ghost" onClick={() => remove(item.id)}>
                  <Trash2 className="h-4 w-4 text-slate-500" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: status */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm self-start">
        <h2 className="font-semibold text-lg">Vectorization</h2>
        <p className="text-slate-500 text-sm mt-1">
          ChatAI Pro automatically converts your sources into embeddings so the bot can answer from them.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="inline-block h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 text-xs flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>All sources are chunked automatically.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 text-xs flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>Top related chunks are shown to the AI for each question.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 text-xs flex items-center justify-center mt-0.5">
              ✓
            </span>
            <span>New chat conversations automatically use the latest knowledge.</span>
          </li>
        </ul>
        <div className="mt-5 text-xs text-slate-500">
          Tip: add at least 2-3 relevant sources for best answers.
        </div>
      </div>
    </div>
  );
}
