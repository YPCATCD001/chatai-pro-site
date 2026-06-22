"use client";

import { useEffect, useRef, useState } from "react";

interface Bot {
  id: string;
  api_key?: string;
  name: string;
  primary_color: string;
  position: string;
  welcome_message: string;
  avatar_url: string | null;
}

export function PreviewTab({ bot }: { bot: Bot }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const body = document.body;
    // Clear any existing widget UI
    const existingFab = document.getElementById("chatai-fab");
    const existingWin = document.getElementById("chatai-window");
    if (existingFab) existingFab.remove();
    if (existingWin) existingWin.remove();
    // Reset the widget load flag so the script re-runs (supports React remounts).
    const winAny = window as any;
    const flagKeys = Object.keys(winAny).filter((k: string) =>
      k.startsWith("__ChatAIWidgetLoaded_")
    );
    flagKeys.forEach((k) => delete winAny[k]);

    // Inject widget.js with query params using a cache-buster so fresh script runs.
    const cacheBuster = Date.now() + "_" + Math.random().toString(36).slice(2, 7);
    const src = `/widget.js?botId=${encodeURIComponent(bot.id)}&apiKey=${encodeURIComponent(
      bot.api_key || ""
    )}&cb=${cacheBuster}`;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setLoaded(true);
    body.appendChild(script);

    return () => {
      const fab = document.getElementById("chatai-fab");
      const win = document.getElementById("chatai-window");
      if (fab) fab.remove();
      if (win) win.remove();
    };
  }, [bot.id, bot.api_key]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-lg">Preview your widget</h2>
      <p className="text-slate-500 text-sm mt-1">
        This is how your widget will appear on your website. Click the floating button to open it.
      </p>
      <div
        ref={containerRef}
        className="mt-5 rounded-xl bg-gradient-to-b from-slate-100 to-slate-200 min-h-[480px] relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 p-4 text-sm text-slate-600">
          {loaded ? (
            <span className="inline-flex items-center gap-2 text-emerald-700">
              ● Widget loaded — click the floating button in the bottom-right corner.
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-slate-500">Loading widget…</span>
          )}
        </div>
      </div>
    </div>
  );
}
