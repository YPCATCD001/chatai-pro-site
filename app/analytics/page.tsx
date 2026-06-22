"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";

interface Overview {
  total_conversations?: number;
  total_messages?: number;
  last_7d_conversations?: number;
  last_7d_messages?: number;
}

interface TopQuestion { question: string; count: number; }

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview>({});
  const [topQuestions, setTopQuestions] = useState<TopQuestion[]>([]);

  useEffect(() => {
    fetch("/api/analytics/overview").then(r => r.json()).then(d => setOverview(d));
    fetch("/api/analytics/top-questions").then(r => r.json()).then(d => setTopQuestions(d.questions || []));
  }, []);

  const stats = [
    { label: "Total conversations", value: overview.total_conversations ?? 0 },
    { label: "Total messages", value: overview.total_messages ?? 0 },
    { label: "Conversations (last 7d)", value: overview.last_7d_conversations ?? 0 },
    { label: "Messages (last 7d)", value: overview.last_7d_messages ?? 0 },
  ];

  return (
    <AppShell>
      <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
      <p className="text-slate-500 mt-1 mb-6">Usage and performance for all your bots.</p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">{s.label}</div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-lg">Top visitor questions</h2>
        <p className="text-slate-500 text-sm mt-1">
          The questions your visitors ask most often. A great source of knowledge to add.
        </p>

        {topQuestions.length === 0 ? (
          <div className="mt-5 text-sm text-slate-500">No data yet — once visitors start chatting, questions will appear here.</div>
        ) : (
          <ul className="mt-5 divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            {topQuestions.slice(0, 20).map((q, i) => (
              <li key={i} className="flex items-center justify-between p-3">
                <span className="text-sm text-slate-800 truncate">{q.question}</span>
                <span className="text-xs text-slate-500 shrink-0 ml-4">{q.count}×</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
