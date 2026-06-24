"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { AI_MODELS } from "@/lib/ai/chat-service";
import { Cpu, Check } from "lucide-react";

interface Bot {
  id: string;
  name: string;
  welcome_message: string;
  primary_color: string;
  position: string;
  avatar_url: string | null;
  status: string;
  api_key?: string;
  model?: string;
}

export function SettingsTab({
  bot,
  onSaved,
}: {
  bot: Bot;
  onSaved: (b: Bot) => void;
}) {
  const [name, setName] = useState(bot.name);
  const [welcome, setWelcome] = useState(bot.welcome_message);
  const [primaryColor, setPrimaryColor] = useState(bot.primary_color);
  const [position, setPosition] = useState(bot.position);
  const [status, setStatus] = useState(bot.status);
  const [model, setModel] = useState(bot.model || "deepseek-chat");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const { data, error } = await (createClient() as any)
        .from("bots")
        .update({
          name,
          welcome_message: welcome,
          primary_color: primaryColor,
          position,
          status,
          model,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bot.id)
        .select()
        .single();
      if (error) throw error;
      onSaved(data as Bot);
      setMsg("Saved successfully!");
      setTimeout(() => setMsg(null), 3000);
    } catch (e: any) {
      setMsg(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-semibold text-lg tracking-tight">Bot settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize how your bot looks and behaves on your website.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <div className="rounded-2xl border border-border/60 bg-card card-shadow p-6 space-y-5">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-primary" />
            Basic Info
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bot name</label>
            <input
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Welcome message</label>
            <textarea
              className="min-h-[90px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 resize-none"
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card card-shadow p-6 space-y-5">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-primary" />
            AI Model
          </h3>
          
          <div className="grid gap-3">
            {AI_MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModel(m.id)}
                className={
                  "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 " +
                  (model === m.id
                    ? "border-primary/50 bg-primary/5 ring-2 ring-primary/20"
                    : "border-border/60 hover:border-border hover:bg-muted/30")
                }
              >
                <div className={
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " +
                  (model === m.id ? "bg-primary text-white" : "bg-muted text-muted-foreground")
                }>
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{m.name}</span>
                    {model === m.id && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card card-shadow p-6 space-y-5">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-primary" />
            Appearance
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-11 w-14 rounded-xl border border-border cursor-pointer bg-background"
                />
                <input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Widget position</label>
              <select
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="bottom-right">Bottom right</option>
                <option value="bottom-left">Bottom left</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active — visible on your website</option>
              <option value="paused">Paused — hidden from visitors</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          {msg && (
            <span className={"text-sm " + (msg.includes("Saved") ? "text-emerald-600" : "text-red-500")}>
              {msg}
            </span>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-border/60 bg-card card-shadow p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <span className="text-lg">🔑</span>
          </div>
          <div>
            <div className="font-medium text-sm">API Key</div>
            <div className="text-xs text-muted-foreground">
              Used to authenticate requests from the embedded widget.
            </div>
          </div>
        </div>
        <div className="font-mono text-xs mt-2 p-4 rounded-xl bg-muted/50 border border-border/60 break-all">
          {bot.api_key || "<hidden>"}
        </div>
      </div>
    </div>
  );
}
