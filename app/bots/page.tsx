"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";
import { Plus, Trash2, Settings, Sparkles, MessageCircle, MoreHorizontal } from "lucide-react";
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
  const [primaryColor, setPrimaryColor] = useState("#8b5cf6");
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
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Manage</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Your Bots
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[15px]">
              Create and manage your AI customer service chatbots
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Bot
          </Button>
        </div>

        {showCreate ? (
          <div className="rounded-2xl border border-border/60 bg-card card-shadow p-6 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg tracking-tight">Create a new bot</h2>
                <p className="text-sm text-muted-foreground">Set up your AI assistant in under a minute</p>
              </div>
            </div>
            <form onSubmit={createBot} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bot name</label>
                <input
                  className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Support Bot"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Welcome message</label>
                <textarea
                  className="min-h-[90px] w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
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
                      className="h-11 w-14 rounded-lg border border-border cursor-pointer bg-background"
                    />
                    <input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-11 flex-1 rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Widget position</label>
                  <select
                    className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="bottom-right">Bottom right</option>
                    <option value="bottom-left">Bottom left</option>
                  </select>
                </div>
              </div>
              {error ? <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</div> : null}
              <div className="flex items-center gap-2 pt-1">
                <Button type="submit" variant="primary" disabled={saving} className="gap-2">
                  {saving ? "Creating..." : "Create bot"}
                </Button>
                <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        {loading ? (
          <div className="text-sm text-muted-foreground py-12 text-center">Loading your bots...</div>
        ) : bots.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-12 text-center card-shadow">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="text-lg font-semibold tracking-tight">No bots yet</div>
            <div className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">
              Create your first AI chatbot to start automating customer conversations.
            </div>
            <Button className="mt-5 gap-2" variant="primary" onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" /> Create your first bot
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot, index) => (
              <div
                key={bot.id}
                className="group relative rounded-2xl border border-border/60 bg-card card-shadow card-shadow-lift overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{ background: bot.primary_color }}
                />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-11 w-11 rounded-xl text-white font-bold flex items-center justify-center text-base shadow-sm"
                        style={{ background: bot.primary_color }}
                      >
                        {bot.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-[15px] tracking-tight">{bot.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </div>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px] leading-relaxed">
                    {bot.welcome_message}
                  </p>

                  <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border/40">
                    <Link href={`/bots/${bot.id}`} className="flex-1">
                      <Button size="sm" variant="primary" className="w-full gap-1.5">
                        <Settings className="h-3.5 w-3.5" /> Manage
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => deleteBot(bot.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
