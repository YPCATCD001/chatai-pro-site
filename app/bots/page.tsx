"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";
import { Plus, Trash2, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Bot {
  id: string;
  name: string;
  welcome_message: string;
  primary_color: string;
  position: string;
  status: string;
  created_at: string;
  api_key?: string;
}

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [welcome, setWelcome] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [position, setPosition] = useState("bottom-right");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBots();
  }, []);

  async function loadBots() {
    setLoading(true);
    try {
      const { data, error } = await (createClient() as any)
        .from("bots")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (Array.isArray(data)) setBots(data as Bot[]);
    } catch (e: any) {
      setError(e.message || "Failed to load bots");
    } finally {
      setLoading(false);
    }
  }

  function generateApiKey() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "bot_";
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  async function createBot(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { data: { user } } = await (createClient() as any).auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const apiKey = generateApiKey();
      const { error } = await (createClient() as any)
        .from("bots")
        .insert({
          name: name.trim() || "My AI Bot",
          welcome_message: welcome.trim() || "Hi there! How can I help you today?",
          primary_color: primaryColor,
          position: position as "bottom-right" | "bottom-left",
          user_id: user.id,
          api_key: apiKey,
          status: "active",
        } as any);
      if (error) throw error;
      setShowCreate(false);
      setName("");
      setWelcome("");
      loadBots();
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBot(id: string) {
    if (!confirm("Delete this bot? All knowledge and conversations will be removed.")) return;
    try {
      const { error } = await (createClient() as any).from("bots").delete().eq("id", id);
      if (error) throw error;
      loadBots();
    } catch (e: any) {
      setError(e.message || "Failed to delete bot");
    }
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Your bots</h1>
          <p className="text-slate-500 mt-1">Create and manage your AI chat bots.</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" /> New bot
        </Button>
      </div>

      {showCreate ? (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-8 max-w-2xl">
          <h2 className="font-semibold text-lg mb-1">Create a new bot</h2>
          <p className="text-sm text-slate-500 mb-5">You can edit these settings later.</p>
          <form onSubmit={createBot} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bot name</label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme Support Bot"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Welcome message</label>
              <textarea
                className="min-h-[80px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={welcome}
                onChange={(e) => setWelcome(e.target.value)}
                placeholder="Hi there! How can I help you today?"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-14 rounded-md border border-slate-300 cursor-pointer"
                  />
                  <input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Widget position</label>
                <select
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="bottom-right">Bottom right</option>
                  <option value="bottom-left">Bottom left</option>
                </select>
              </div>
            </div>
            {error ? <div className="text-sm text-red-600">{error}</div> : null}
            <div className="flex items-center gap-2">
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving…" : "Create bot"}
              </Button>
              <Button variant="outline" type="button" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-slate-500">Loading your bots…</div>
      ) : bots.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="text-lg font-semibold">No bots yet</div>
          <div className="text-sm text-slate-500 mt-1">Create your first bot to get started.</div>
          <Button className="mt-4" variant="primary" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4 mr-2" /> New bot
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.map((bot) => (
            <div key={bot.id} className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-10 w-10 rounded-lg text-white font-bold flex items-center justify-center"
                  style={{ background: bot.primary_color }}
                >
                  {bot.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{bot.name}</div>
                  <div className="text-xs text-slate-500">{bot.position === "bottom-left" ? "Bottom left" : "Bottom right"}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 flex-1">
                {bot.welcome_message}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/bots/${bot.id}`}>
                  <Button size="sm" variant="primary">
                    <Settings className="h-3.5 w-3.5 mr-2" /> Manage
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteBot(bot.id)}
                  className="text-red-600 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
