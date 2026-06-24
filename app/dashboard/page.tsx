import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";
import {
  MessageSquare,
  Bot as BotIcon,
  FileText,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Zap,
  BookOpen,
  Code2,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Bots",
      value: "0",
      change: "+0",
      trend: "up",
      icon: BotIcon,
      color: "from-violet-500 to-fuchsia-500",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
    {
      label: "Documents",
      value: "0",
      change: "+0",
      trend: "up",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Conversations",
      value: "0",
      change: "+0",
      trend: "up",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Avg Response",
      value: "--",
      change: "ms",
      trend: "neutral",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Welcome back</span>
              <span className="text-primary">👋</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[15px]">
              Manage your AI chatbots and track performance all in one place.
            </p>
          </div>
          <Link href="/bots">
            <Button variant="primary" size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create Bot
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group rounded-2xl border border-border/60 bg-card p-5 card-shadow card-shadow-lift overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none">
                <div
                  className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color}`}
                />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bgColor} ${stat.textColor}`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-muted-foreground">{stat.change}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-3xl font-bold tracking-tight num">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6 card-shadow overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Quick Start
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Three steps to launch your first AI bot
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                Get started
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Create a bot",
                  desc: "Pick a name, color and welcome message",
                  icon: BotIcon,
                  href: "/bots",
                  color: "violet",
                },
                {
                  step: "02",
                  title: "Add knowledge",
                  desc: "Upload PDFs, paste URLs, or write FAQs",
                  icon: BookOpen,
                  href: "/bots",
                  color: "blue",
                },
                {
                  step: "03",
                  title: "Embed on site",
                  desc: "Copy one script tag into your HTML",
                  icon: Code2,
                  href: "/bots",
                  color: "emerald",
                },
              ].map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group relative rounded-xl border border-border/60 p-4 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-200"
                >
                  <div className="text-xs font-bold text-primary/60 mb-2">
                    STEP {s.step}
                  </div>
                  <div className="font-semibold text-[15px]">{s.title}</div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Get started
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 card-shadow overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold tracking-tight">Your Plan</h2>
                <p className="text-xs text-muted-foreground">Free tier</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {PLANS.free.features.slice(0, 4).map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>

            <Link href="/pricing">
              <Button variant="primary" className="w-full gap-2">
                Upgrade Plan
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/60 bg-card p-6 card-shadow">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold tracking-tight">Recent Bots</h2>
              <Link
                href="/bots"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-dashed border-border/60 p-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-muted/50 flex items-center justify-center mb-3">
                  <BotIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No bots created yet
                </p>
                <Link href="/bots">
                  <Button variant="secondary" size="sm" className="mt-3 gap-2">
                    <Sparkles className="w-4 h-4" />
                    Create your first bot
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 card-shadow">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold tracking-tight">
                Conversation Insights
              </h2>
              <Link
                href="/analytics"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Analytics
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Total Messages</div>
                    <div className="text-xs text-muted-foreground">
                      All time
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold num">0</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <BarChart3 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Resolution Rate</div>
                    <div className="text-xs text-muted-foreground">
                      AI-handled chats
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold num">--</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
                    <TrendingUp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Satisfaction</div>
                    <div className="text-xs text-muted-foreground">
                      User feedback
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold num">--</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
