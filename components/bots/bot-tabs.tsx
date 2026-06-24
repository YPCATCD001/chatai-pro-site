"use client";

import { useEffect, useState } from "react";
import { SettingsTab } from "@/components/bots/tabs/settings-tab";
import { KnowledgeTab } from "@/components/bots/tabs/knowledge-tab";
import { EmbedTab } from "@/components/bots/tabs/embed-tab";
import { PreviewTab } from "@/components/bots/tabs/preview-tab";
import { createClient } from "@/lib/supabase/client";

interface Bot {
  id: string;
  name: string;
  welcome_message: string;
  primary_color: string;
  position: string;
  avatar_url: string | null;
  status: string;
  api_key?: string;
  created_at?: string;
}

const TABS = [
  { id: "settings", label: "Settings" },
  { id: "knowledge", label: "Knowledge" },
  { id: "embed", label: "Embed" },
  { id: "preview", label: "Preview" },
] as const;

export function BotTabs({ botId }: { botId: string }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("settings");
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await (createClient() as any)
          .from("bots")
          .select("*")
          .eq("id", botId)
          .single();
        if (error) throw error;
        if (!data) throw new Error("Bot not found");
        setBot(data as Bot);
      } catch (e: any) {
        setError(e.message || "Failed to load bot");
      } finally {
        setLoading(false);
      }
    })();
  }, [botId]);

  if (loading) return <div className="text-slate-500 text-sm">Loading...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (!bot) return null;

  return (
    <div>
      <div className="flex items-start gap-4 mb-6 flex-wrap">
        <div
          className="h-12 w-12 rounded-xl text-white font-bold text-lg flex items-center justify-center shadow-sm"
          style={{ background: bot.primary_color }}
        >
          {bot.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{bot.name}</h1>
          <p className="text-slate-500 text-sm">{bot.welcome_message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "px-4 py-2 text-sm font-medium border-b-2 transition " +
              (tab === t.id
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-slate-500 hover:text-slate-800")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "settings" ? (
        <SettingsTab bot={bot} onSaved={(b) => setBot(b)} />
      ) : tab === "knowledge" ? (
        <KnowledgeTab bot={bot} />
      ) : tab === "embed" ? (
        <EmbedTab bot={bot} />
      ) : (
        <PreviewTab bot={bot} />
      )}
    </div>
  );
}
