"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Conversation {
  id: string;
  bot_id: string;
  visitor_id: string;
  visitor_email: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  bots?: { id: string; name: string } | null;
}

export default function ConversationsPage() {
  const [items, setItems] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [botId, setBotId] = useState("");

  useEffect(() => { load(); }, []);

  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await (createClient() as any)
        .from("conversations")
        .select("*, bots(id, name)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      if (Array.isArray(data)) setItems(data as Conversation[]);
    } catch (e: any) {
      setError(e.message || "Failed to load conversations");
    } finally { setLoading(false); }
  }

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Conversations</h1>
        <p className="text-slate-500 mt-1">All visitor chats with your bots.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={load}>Refresh</Button>
        </div>
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No conversations yet. Once a visitor chats with your bot, it will appear here.
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left font-medium px-4 py-3">Bot</th>
                <th className="text-left font-medium px-4 py-3">Visitor</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Last updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">
                    {(c as any).bots?.name || c.bot_id}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {c.visitor_email || c.visitor_id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs border border-emerald-100">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(c.updated_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/conversations/${c.id}`}>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3.5 w-3.5 mr-2" /> View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}
