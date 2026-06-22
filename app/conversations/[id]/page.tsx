"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export default function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [convId, setConvId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const p = await params;
      if (cancelled) return;
      setConvId(p.id);
      try {
        const res = await fetch(`/api/conversations/${p.id}/messages`);
        const data = await res.json();
        if (Array.isArray(data) && !cancelled) setMessages(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <AppShell>
      <div className="mb-4">
        <Link
          href="/conversations"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> All conversations
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Conversation</h1>
      <p className="text-slate-500 text-sm mb-6">
        The full transcript with this visitor.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : messages.length === 0 ? (
          <div className="text-sm text-slate-500 text-center py-10">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  "flex " +
                  (m.role === "user" ? "justify-end" : "justify-start")
                }
              >
                <div
                  className={
                    "max-w-[80%] rounded-xl px-4 py-2.5 text-sm " +
                    (m.role === "user"
                      ? "bg-indigo-100 text-slate-800 rounded-tr-sm"
                      : "bg-slate-100 text-slate-800 rounded-tl-sm")
                  }
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  <div className="text-[10px] text-slate-400 mt-1.5">
                    {new Date(m.created_at).toLocaleString()} · {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {convId && (
        <div className="text-[10px] text-slate-400 mt-3 break-all">
          Conversation ID: {convId}
        </div>
      )}
    </AppShell>
  );
}
