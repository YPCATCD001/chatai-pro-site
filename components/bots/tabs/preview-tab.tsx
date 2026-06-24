"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Monitor } from "lucide-react";

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
    const existingFab = document.getElementById("chatai-fab");
    const existingWin = document.getElementById("chatai-window");
    if (existingFab) existingFab.remove();
    if (existingWin) existingWin.remove();
    
    const winAny = window as any;
    const flagKeys = Object.keys(winAny).filter((k: string) =>
      k.startsWith("__ChatAIWidgetLoaded_")
    );
    flagKeys.forEach((k) => delete winAny[k]);

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg tracking-tight">Widget Preview</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            See how your chat widget will look on your website
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Monitor className="w-4 h-4" />
          <span>Live preview</span>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="rounded-2xl border border-border/60 bg-gradient-to-b from-muted/50 to-muted min-h-[480px] relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 p-4">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-card border border-border/60 shadow-sm">
            {loaded ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700 font-medium">Widget active</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-amber-700">Loading...</span>
              </>
            )}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center opacity-30">
            <Eye className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your website content</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Click the floating button below to test
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary text-sm">💡</span>
          </div>
          <div>
            <h3 className="text-sm font-medium">Widget Position</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your widget is configured to appear at the{" "}
              <span className="font-medium text-foreground">
                {bot.position === "bottom-right" ? "bottom right" : "bottom left"}
              </span>{" "}
              corner of your website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
