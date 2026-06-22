import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";
import Link from "next/link";
import {
  Bot,
  Zap,
  Languages,
  Shield,
  BarChart3,
  PlugZap,
  Check,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "Custom AI Bot",
      description: "Create a branded bot with your name, colors and welcome message.",
    },
    {
      icon: <PlugZap className="h-5 w-5" />,
      title: "One-line Embed",
      description: "Paste a single script tag. The widget appears on your site in seconds.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Knowledge Base",
      description: "Upload PDFs, scrape URLs, or write FAQs — the AI answers from your docs.",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Streaming Replies",
      description: "Fast, natural replies powered by Mistral with a typing indicator.",
    },
    {
      icon: <Languages className="h-5 w-5" />,
      title: "Multi-language",
      description: "The bot auto-detects the visitor's language and replies in kind.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Built-in Analytics",
      description: "See conversations, top questions, and how often the AI answers.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure by Default",
      description: "Supabase Auth, RLS policies, and API-key protected chat endpoints.",
    },
  ];

  const steps = [
    { n: "1", title: "Create your bot", text: "Name it, pick a color, set a friendly welcome message." },
    { n: "2", title: "Upload your docs", text: "Drop PDFs, add URLs, or type FAQs — we handle the rest." },
    { n: "3", title: "Embed on your site", text: "Copy one script tag into your HTML and go live." },
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Founder, Maison & Cie",
      text: "ChatAI Pro replaced two part-time support agents. It handles 80% of FAQs automatically.",
    },
    {
      name: "Jonas Weber",
      role: "CTO, Helio SaaS",
      text: "Setup took 15 minutes. Documentation upload + embed on the marketing site and we were live.",
    },
    {
      name: "Alessandro Rossi",
      role: "Owner, Piazza Bistro",
      text: "Our customers get answers in Italian, English and German, 24/7 — and the tool just works.",
    },
  ];

  const faqs = [
    {
      q: "Do I need a developer to set this up?",
      a: "No. You create a bot, upload documents, and copy a script tag into your site — anyone can do it.",
    },
    {
      q: "What languages does the bot support?",
      a: "English, German, French, Spanish, Italian and Dutch. The bot auto-detects the visitor's language.",
    },
    {
      q: "How is my data handled?",
      a: "Data lives in Supabase with row-level security so each user only sees their own bots and conversations.",
    },
    {
      q: "Can I try before I buy?",
      a: "Yes — the Free plan gives you 1 bot, 5 documents, and 100 AI messages per month to test.",
    },
    {
      q: "Can I white-label the widget?",
      a: "The Agency plan supports removing ChatAI Pro branding so your clients only see your name.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 to-white -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl -z-10" />
        <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-fuchsia-200/40 blur-3xl -z-10" />
        <div className="container mx-auto max-w-7xl px-4 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full px-3 py-1 mb-6">
            <span className="inline-block h-1.5 w-1.5 bg-indigo-600 rounded-full animate-pulse" />
            Built for European SMBs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto">
            An AI customer service bot on your website in{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              under 5 minutes
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your docs, point to your website, or write FAQs — ChatAI Pro deploys a
            branded chat bot that answers questions 24/7 and reduces your support cost.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg" variant="primary" className="h-12 px-6 text-base">
                Start free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button size="lg" variant="outline" className="h-12 px-6 text-base">
                See pricing
              </Button>
            </Link>
          </div>

          {/* Chat preview */}
          <div className="mt-16 max-w-3xl mx-auto rounded-2xl border border-slate-200 shadow-xl bg-white p-4 text-left">
            <div className="h-96 rounded-xl border border-slate-200 bg-gradient-to-b from-indigo-50 to-white flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-3">
                <div className="font-semibold">ChatAI Support Bot</div>
                <div className="text-xs opacity-90">Powered by AI · Online</div>
              </div>
              <div className="flex-1 p-4 space-y-3 text-sm overflow-hidden">
                <div className="max-w-[80%] bg-white border border-slate-200 rounded-xl rounded-tl-sm p-3 self-start">
                  Hi there! Ask me anything about ChatAI Pro — pricing, setup or features.
                </div>
                <div className="max-w-[80%] ml-auto bg-indigo-100 text-slate-800 rounded-xl rounded-tr-sm p-3">
                  Do you support German?
                </div>
                <div className="max-w-[80%] bg-white border border-slate-200 rounded-xl rounded-tl-sm p-3">
                  Yes — the bot auto-detects your visitors' language and replies in the same language.
                </div>
                <div className="inline-flex items-center gap-1.5 max-w-[80%] bg-white border border-slate-200 rounded-xl rounded-tl-sm p-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
              <div className="p-3 border-t border-slate-200 flex gap-2">
                <input
                  disabled
                  placeholder="Try typing a question…"
                  className="flex-1 h-10 px-3 rounded-lg bg-slate-100 text-slate-500 text-sm outline-none"
                />
                <Button disabled size="sm">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Launch in 3 steps</h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              From signup to live chat on your website in less than five minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need</h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              ChatAI Pro is the fastest way to put an AI customer service rep on any website.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 p-6 hover:border-indigo-200 hover:shadow-md transition">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <div className="font-semibold text-lg">{f.title}</div>
                <p className="text-slate-600 text-sm mt-2">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Simple pricing</h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Start free, upgrade when you need more. All plans include unlimited websites.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((tier) => {
              const plan = PLANS[tier];
              const highlighted = plan.highlighted;
              return (
                <div
                  key={tier}
                  className={
                    "rounded-2xl border p-6 bg-white flex flex-col " +
                    (highlighted
                      ? "border-indigo-500 shadow-lg ring-2 ring-indigo-100 scale-[1.02]"
                      : "border-slate-200 shadow-sm")
                  }
                >
                  <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                    {plan.name}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">€{plan.price_monthly}</span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier === "free" ? "/register" : "/pricing?plan=" + tier}
                    className="mt-6 inline-flex"
                  >
                    <Button
                      variant={highlighted ? "primary" : "outline"}
                      className="w-full"
                    >
                      {tier === "free" ? "Start free" : "Upgrade"}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by small businesses</h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              ChatAI Pro replaces support headcount while keeping customers happy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 p-6 shadow-sm bg-white">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-slate-700 text-sm leading-relaxed">“{t.text}”</p>
                <div className="mt-4 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently asked</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
              >
                <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-slate-400 group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <p className="text-slate-600 text-sm mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-600 text-white text-center p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold">Put AI on your website today</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Free forever plan. No credit card required. Live chat in minutes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-12 bg-white text-indigo-700 hover:bg-indigo-50 border-white text-base">
                  Create free account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="h-12 bg-indigo-900 text-white hover:bg-indigo-950 text-base">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
