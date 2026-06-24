"use client";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useI18n } from "@/lib/i18n/i18n-provider";
import Link from "next/link";
import {
  Bot,
  Zap,
  Globe2,
  ShieldCheck,
  BarChart3,
  Code2,
  Check,
  ArrowRight,
  Rocket,
  Layers,
  Clock3,
  Users,
  Play,
  Star,
} from "lucide-react";

const accentClasses = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-slate-600 to-slate-800",
];

function LandingPageClient() {
  const { t } = useI18n();
  const featureIcons = [
    <Bot key="bot" className="h-8 w-8" />,
    <Code2 key="code" className="h-8 w-8" />,
    <Layers key="layers" className="h-8 w-8" />,
    <Zap key="zap" className="h-8 w-8" />,
    <Globe2 key="globe" className="h-8 w-8" />,
    <BarChart3 key="chart" className="h-8 w-8" />,
  ];

  const planKeys = ["free", "starter", "growth", "agency"] as const;
  const planData = planKeys.map((k) => ({
    key: k,
    plan: t.pricing.plans[k],
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="relative">
        {/* Background decoration */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30 blur-[120px] rounded-full opacity-70" />
          <div className="absolute top-[600px] -right-40 h-[600px] w-[600px] bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-[120px] rounded-full" />
          <div className="absolute top-[1200px] -left-40 h-[600px] w-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-[120px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-white">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-sm shadow-lg shadow-indigo-500/30">
                AI
              </span>
              <span className="text-lg tracking-tight">ChatAI Pro</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
              <a href="#features" className="hover:text-white transition">{t.nav.features}</a>
              <a href="#how" className="hover:text-white transition">{t.nav.how}</a>
              <a href="#pricing" className="hover:text-white transition">{t.nav.pricing}</a>
              <a href="#faq" className="hover:text-white transition">{t.nav.faq}</a>
            </nav>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm text-slate-300 hover:text-white px-3 py-2 rounded-md transition"
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-fuchsia-600 shadow-lg shadow-indigo-500/25 transition-all"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </div>
        </header>

        {/* ======== HERO ======== */}
        <section className="relative pt-24 pb-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 backdrop-blur-sm animate-fade-up">
                <span className="inline-block h-2 w-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {t.hero.badge}
              </div>
            </div>

            <div className="text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.05] max-w-5xl mx-auto text-balance">
                {t.hero.titleLine1}
                <span className="block mt-3 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent animate-gradient">
                  {t.hero.titleLine2}
                </span>
              </h1>
              <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "250ms" }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:from-indigo-600 hover:via-violet-600 hover:to-fuchsia-600 text-white rounded-xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base font-medium border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl backdrop-blur-sm transition-all hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t.hero.ctaSecondary}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              {t.hero.stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {s.n}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Hero Chat Preview */}
            <div
              className="relative mt-20 max-w-4xl mx-auto animate-fade-up"
              style={{ animationDelay: "550ms" }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-fuchsia-500/40 blur-3xl rounded-[3rem] opacity-50" />

              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-3 shadow-2xl shadow-indigo-500/20">
                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="mx-auto text-xs text-slate-400 font-mono truncate">
                    your-website.com — ChatAI Pro
                  </div>
                  <div className="w-12" />
                </div>

                <div className="grid md:grid-cols-5 gap-4 p-4 md:p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
                  {/* LEFT — Brand card */}
                  <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 text-white text-lg font-bold shadow-lg mb-4">
                        AI
                      </div>
                      <div className="text-white font-semibold text-lg">{t.hero.chat.brandTitle}</div>
                      <div className="text-slate-300 text-sm mt-1">{t.hero.chat.brandSub}</div>
                    </div>

                    <div className="mt-8 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {t.hero.chat.status}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <Clock3 className="h-3 w-3" />
                        {t.hero.chat.avgResp}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-3 w-3" />
                        {t.hero.chat.weekly}
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="h-6 w-2 rounded-sm bg-gradient-to-t from-indigo-500 to-fuchsia-400"
                            style={{ opacity: 0.3 + (i % 5) * 0.15, height: `${12 + (i % 4) * 8}px` }}
                          />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">+</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — Chat messages */}
                  <div className="md:col-span-3 flex flex-col justify-center gap-4">
                    <div className="flex gap-3 items-start animate-float" style={{ animationDelay: "0s" }}>
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30">
                        AI
                      </div>
                      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-3.5 text-slate-100 max-w-md shadow-lg">
                        {t.hero.chat.botHello}
                      </div>
                    </div>

                    <div className="flex gap-3 items-start justify-end animate-float" style={{ animationDelay: "1.5s" }}>
                      <div className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-md shadow-lg shadow-fuchsia-500/20">
                        {t.hero.chat.userMsg}
                      </div>
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center text-sm font-semibold border border-white/10">
                        U
                      </div>
                    </div>

                    <div className="flex gap-3 items-start animate-float" style={{ animationDelay: "3s" }}>
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30">
                        AI
                      </div>
                      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-3.5 text-slate-100 max-w-md shadow-lg">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-indigo-300 animate-typing" />
                          <span className="h-2 w-2 rounded-full bg-indigo-300 animate-typing" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 rounded-full bg-indigo-300 animate-typing" style={{ animationDelay: "300ms" }} />
                        </div>
                        <div className="text-sm text-slate-400 mt-3 leading-relaxed">
                          {t.hero.chat.typing}
                          <span className="text-white font-semibold"> {t.hero.chat.typing2} </span>
                          {t.hero.chat.typing3}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        {t.hero.chat.source}
                      </div>
                      <div>{t.hero.chat.refDocs}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating emoji accents */}
              <div className="hidden md:block absolute -top-6 -left-8 h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-2xl shadow-xl animate-float-slow">
                ⚡
              </div>
              <div className="hidden md:block absolute top-1/3 -right-10 h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl shadow-xl animate-float">
                💬
              </div>
              <div className="hidden md:block absolute -bottom-8 left-20 h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center text-xl shadow-xl animate-float-slow">
                🚀
              </div>
            </div>
          </div>
        </section>

        {/* ======== LOGOS STRIP ======== */}
        <section className="relative py-12 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
              {t.logos.title}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500 font-semibold text-lg">
              {t.logos.list.map((b) => (
                <span key={b} className="opacity-60 hover:opacity-100 transition tracking-wider">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ======== BENTO GRID FEATURES ======== */}
        <section id="features" className="relative py-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
                {t.features.badge}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto text-balance leading-tight">
                {t.features.title1}
                <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {t.features.title2}
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
                {t.features.sub}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              {t.features.items.map((f, i) => (
                <div
                  key={f.title}
                  className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm p-8 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden ${
                    i === 0 ? "md:col-span-2" : "md:col-span-2"
                  } ${i >= 2 ? "md:col-span-2" : ""} ${i === 5 ? "md:col-span-2" : ""}`}
                >
                  <div
                    className={`absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${accentClasses[i]} opacity-[0.15] blur-3xl group-hover:opacity-[0.3] transition-opacity duration-700`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${accentClasses[i]} text-white flex items-center justify-center shadow-lg`}>
                        {featureIcons[i]}
                      </div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 border border-white/10 rounded-full px-3 py-1">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}

              {/* Security highlight — big block */}
              <div className="md:col-span-4 relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-10">
                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-32 w-[80%] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-2xl" />
                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-5">
                      <ShieldCheck className="h-3 w-3" /> {t.features.security.badge.replace("🛡️ ", "").replace("🛡️", "")}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {t.features.security.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-6">
                      {t.features.security.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {t.features.security.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-xs text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {t.features.security.stats.map((s) => (
                      <div
                        key={s.l}
                        className="rounded-2xl bg-slate-900/40 border border-emerald-500/10 p-5 text-center"
                      >
                        <div className="text-2xl font-bold text-white">{s.k}</div>
                        <div className="text-xs text-emerald-300/80 mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== HOW IT WORKS ======== */}
        <section id="how" className="relative py-28 px-4 border-t border-white/5 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 mb-4">
                <Rocket className="h-3 w-3" /> {t.how.badge}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto text-balance leading-tight">
                {t.how.title1}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  {t.how.title2}
                </span>
              </h2>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              <div className="grid md:grid-cols-3 gap-6 relative">
                {t.how.steps.map((step, i) => (
                  <div key={step.title} className="relative group">
                    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-sm hover:border-white/20 hover:-translate-y-2 transition-all duration-500 h-full">
                      <div className="absolute -top-5 left-8 h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white font-bold flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <div className="mt-6">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-white flex items-center justify-center mb-5">
                          <Rocket className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{step.text}</p>
                      </div>

                      <div className="absolute bottom-3 right-5 text-7xl font-black text-white/[0.04] select-none">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {i < t.how.steps.length - 1 && (
                      <div className="hidden md:flex absolute top-20 -right-3 h-7 w-7 rounded-full bg-slate-900 border border-white/10 items-center justify-center text-slate-500 z-10">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======== PRICING ======== */}
        <section id="pricing" className="relative py-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
                <Star className="h-3 w-3" /> {t.pricing.badge}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto text-balance leading-tight">
                {t.pricing.title1}
                <span className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent">
                  {t.pricing.title2}
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
                {t.pricing.sub}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {planData.map(({ key, plan }) => {
                const highlighted = key === "starter";
                return (
                  <div
                    key={key}
                    className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                      highlighted
                        ? "bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20 border border-indigo-400/30 shadow-2xl shadow-indigo-500/20 md:scale-[1.03]"
                        : "border border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {highlighted && "badge" in plan && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full px-4 py-1.5 shadow-lg shadow-indigo-500/40">
                        {plan.badge}
                      </div>
                    )}

                    <div className={`text-sm font-semibold uppercase tracking-wider ${highlighted ? "text-indigo-300" : "text-slate-400"}`}>
                      {plan.name}
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">€{plan.price}</span>
                      <span className="text-slate-400 text-sm">{plan.perMonth}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{plan.billing}</p>

                    <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-1">
                      {plan.features.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${highlighted ? "bg-indigo-500/30 text-indigo-300" : "bg-white/10 text-emerald-400"}`}>
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={key === "free" ? "/register" : "/pricing?plan=" + key}
                      className="mt-8 inline-flex w-full"
                    >
                      <Button
                        className={`w-full h-12 rounded-xl font-semibold text-base transition-all ${
                          highlighted
                            ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:from-indigo-600 hover:via-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
                            : "border border-white/20 bg-white/5 hover:bg-white/10 text-white"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======== TESTIMONIALS ======== */}
        <section className="relative py-28 px-4 border-t border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-full px-3 py-1 mb-4">
                <Star className="h-3 w-3" /> {t.testimonials.badge}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto text-balance leading-tight">
                {t.testimonials.title}
              </h2>
              <div className="mt-6 inline-flex items-center gap-1 text-amber-400 text-lg">
                ★★★★★ <span className="text-slate-400 text-base ml-2">{t.testimonials.rating}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.testimonials.items.map((t2) => (
                <div
                  key={t2.name}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-1 duration-500"
                >
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-6">"{t2.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 text-white flex items-center justify-center text-base font-bold shadow-lg">
                      {t2.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t2.name}</div>
                      <div className="text-slate-400 text-xs">{t2.role}</div>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-6xl font-serif text-white/[0.06] leading-none select-none">
                    "
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== FAQ ======== */}
        <section id="faq" className="relative py-28 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.faq.title}</h2>
              <p className="mt-4 text-lg text-slate-400">{t.faq.sub}</p>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-white/15 transition-all open:bg-white/[0.05]"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-6 text-left">
                    <span className="text-lg text-white font-medium pr-4">{item.q}</span>
                    <span className="shrink-0 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-open:rotate-45 group-open:bg-indigo-500/20 group-open:text-indigo-300 group-open:border-indigo-500/30 transition-all duration-300 text-lg">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 -mt-2 text-slate-400 leading-relaxed border-t border-white/5 pt-5">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center text-slate-400 text-sm">{t.faq.contact}</div>
          </div>
        </section>

        {/* ======== FINAL CTA ======== */}
        <section className="relative py-28 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 border border-white/10 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600" />
              <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight text-balance">
                  {t.finalCta.title}
                </h2>
                <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">{t.finalCta.sub}</p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-2xl shadow-indigo-900/40 transition-all hover:scale-105"
                    >
                      {t.finalCta.primary}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base font-medium border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm transition-all hover:scale-105"
                    >
                      {t.finalCta.secondary}
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 text-sm text-white/70 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {t.finalCta.trust.map((line) => (
                    <span key={line}>✓ {line}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== FOOTER ======== */}
        <footer className="border-t border-white/10 bg-slate-950/50">
          <div className="container mx-auto max-w-7xl px-4 py-12 text-sm text-slate-400 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-3 text-white font-semibold">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-sm shadow-lg shadow-indigo-500/30">
                AI
              </span>
              <span className="text-lg">ChatAI Pro</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/pricing" className="hover:text-white transition">{t.nav.pricing}</Link>
              <Link href="/login" className="hover:text-white transition">{t.nav.signIn}</Link>
              <a href="#" className="hover:text-white transition">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition">{t.footer.terms}</a>
            </div>
            <div className="text-xs text-slate-500">© {new Date().getFullYear()} {t.footer.rights}</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <LandingPageClient />;
}
