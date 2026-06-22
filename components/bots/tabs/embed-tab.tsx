"use client";

import { useEffect, useState } from "react";

interface Bot {
  id: string;
  api_key?: string;
  name: string;
}

export function EmbedTab({ bot }: { bot: Bot }) {
  const [snippet, setSnippet] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/bots/${bot.id}/embed`);
        const data = await res.json();
        if (data?.snippet) setSnippet(data.snippet);
      } catch {
        // fallback
        const origin = window.location.origin;
        setSnippet(
          `<script>\n(function(){var s=document.createElement('script');\n s.src='${origin}/widget.js?botId=${bot.id}&apiKey=${bot.api_key || ""}';\n document.head.appendChild(s);})();\n</script>`
        );
      }
    })();
  }, [bot.id, bot.api_key]);

  function copy() {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-lg">Embed on your website</h2>
        <p className="text-slate-500 text-sm mt-1">
          Paste this script tag just before the closing <code>&lt;/head&gt;</code> on any page
          where you want the chat widget to appear.
        </p>

        <div className="mt-5 rounded-lg bg-slate-900 text-slate-100 p-4 text-sm font-mono whitespace-pre overflow-x-auto">
          {snippet || "Loading…"}
        </div>
        <button
          onClick={copy}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-4 h-10 text-sm hover:bg-indigo-700"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>

        <h3 className="mt-8 font-medium text-slate-800">How to install</h3>
        <ol className="mt-2 space-y-2 text-sm text-slate-600 list-decimal list-inside">
          <li>Copy the snippet above.</li>
          <li>Paste it into the HTML of every page you want the widget on.</li>
          <li>Refresh your website — the widget should appear in the corner.</li>
        </ol>

        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 p-3 text-sm">
          Your API key is included in the snippet. Anyone with the key can call
          your bot on your behalf — only embed it on websites you control.
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm self-start">
        <h2 className="font-semibold text-lg">Widget URL</h2>
        <p className="text-slate-500 text-sm mt-1">
          You can also use this URL directly to load the widget from any site.
        </p>
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 break-all">
          {`${window.location.origin}/widget.js?botId=${bot.id}&apiKey=${bot.api_key || ""}`}
        </div>
        <h3 className="mt-6 font-medium text-slate-800 text-sm">Tips</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600 list-disc list-inside">
          <li>Test the widget in your Preview tab.</li>
          <li>Customize your brand color in Settings.</li>
          <li>Use knowledge to teach the bot about your business.</li>
        </ul>
      </div>
    </div>
  );
}
