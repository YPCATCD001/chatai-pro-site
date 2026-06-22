import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";
import { MessageSquare, Bot as BotIcon, FileText, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-500 mt-1">Your AI customer service bots at a glance.</p>
        </div>
        <Link href="/bots">
          <Button variant="primary" size="lg">
            <BotIcon className="h-4 w-4 mr-2" />
            Manage bots
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Bots", icon: <BotIcon className="h-4 w-4" />, hint: "Create multiple bots" },
          { label: "Documents", icon: <FileText className="h-4 w-4" />, hint: "Upload PDFs, add URLs" },
          { label: "Conversations", icon: <MessageSquare className="h-4 w-4" />, hint: "See every chat" },
          { label: "Analytics", icon: <BarChart3 className="h-4 w-4" />, hint: "Top questions + trends" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-indigo-50 text-indigo-600">
                {c.icon}
              </span>
              {c.label}
            </div>
            <p className="text-xs text-slate-500 mt-2">{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold">Quick start</h2>
        <p className="text-slate-500 text-sm mt-1">Three steps to your first live chat bot.</p>

        <ol className="mt-5 grid md:grid-cols-3 gap-4">
          {[
            { t: "Create a bot", d: "Pick a name, primary color and welcome message.", href: "/bots" },
            { t: "Add knowledge", d: "Upload a PDF, paste a URL, or write FAQs.", href: "/bots" },
            { t: "Embed on your site", d: "Copy one script tag into your HTML.", href: "/bots" },
          ].map((s, i) => (
            <li key={s.t} className="rounded-xl border border-slate-200 p-5">
              <div className="text-xs font-semibold text-indigo-600">STEP {i + 1}</div>
              <div className="mt-1 font-semibold">{s.t}</div>
              <p className="text-sm text-slate-500 mt-1">{s.d}</p>
              <Link href={s.href} className="inline-flex mt-3 text-sm text-indigo-600 hover:underline">
                Open bots →
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold">Your plan</h3>
          <p className="text-slate-500 text-sm mt-1">
            You are currently on the <span className="font-medium text-slate-800">Free</span> plan. Upgrade for more bots, documents and messages.
          </p>
          <Link href="/pricing">
            <Button variant="primary" className="mt-4">
              Upgrade
            </Button>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold">What you get</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {PLANS.free.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
