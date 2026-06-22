"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Bot {
  id: string;
  name: string;
  welcome_message: string;
  primary_color: string;
  position: string;
  avatar_url: string | null;
  status: string;
  api_key?: string;
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
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/bots/${bot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          welcome_message: welcome,
          primary_color: primaryColor,
          position,
          status,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      const updated = await res.json();
      onSaved(updated);
      setMsg("Saved!");
    } catch (e: any) {
      setMsg(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl">
      <h2 className="font-semibold text-lg">Bot settings</h2>
      <p className="text-slate-500 text-sm mt-1">
        Customize how your bot looks and behaves on your website.
      </p>
      <form onSubmit={save} className="mt-5 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Bot name</label>
          <input
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Welcome message</label>
          <textarea
            className="min-h-[80px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={welcome}
            onChange={(e) => setWelcome(e.target.value)}
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <select
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active — visible on your website</option>
            <option value="paused">Paused — hidden from visitors</option>
          </select>
        </div>
        {msg ? <div className="text-sm text-emerald-700">{msg}</div> : null}
        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>

      <div className="mt-8 rounded-lg border border-slate-200 p-4">
        <div className="text-sm font-medium">API Key</div>
        <div className="text-xs text-slate-500 mt-0.5">
          Used to authenticate requests from the embedded widget.
        </div>
        <div className="font-mono text-xs text-slate-700 mt-3 break-all bg-slate-50 p-2 rounded border border-slate-200">
          {bot.api_key || "<hidden>"}
        </div>
      </div>
    </div>
  );
}
