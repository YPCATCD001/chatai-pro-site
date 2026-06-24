"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import {
  Bot,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Rocket,
} from "lucide-react";

const perks = [
  {
    icon: CheckCircle2,
    title: "免费版永久可用",
  },
  {
    icon: CheckCircle2,
    title: "无需信用卡",
  },
  {
    icon: CheckCircle2,
    title: "5 分钟部署完成",
  },
];

const features = [
  {
    icon: Rocket,
    title: "从零到上线",
    desc: "创建机器人、上传文档、一行代码嵌入网站，全流程 5 分钟。",
  },
  {
    icon: Zap,
    title: "40+ 语言自动识别",
    desc: "访客用什么语言提问，机器人就用什么语言回答，无需配置。",
  },
  {
    icon: ShieldCheck,
    title: "数据永远属于你",
    desc: "Supabase RLS 行级隔离。你的文档不参与任何模型训练。",
  },
];

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white antialiased">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-slate-950 via-40% to-slate-950" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[860px] rounded-full bg-violet-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="w-full">
          <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 text-white text-sm font-bold shadow-lg shadow-violet-500/30">
                AI
              </span>
              <span className="font-bold text-lg tracking-tight text-white">
                ChatAI Pro
              </span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="hidden sm:inline">已有账号？</span>
              <Link
                href="/login"
                className="text-white font-medium text-indigo-400 hover:text-indigo-300 transition"
              >
                立即登录 →
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: brand/features */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  免费开始 · 无需信用卡
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                把你的文档变成
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  AI 客服
                </span>
                <br />
                5 分钟上线
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                ChatAI Pro 专为欧洲中小企业设计。注册即用，支持欧元定价与 GDPR 合规。
              </p>

              {/* Perks */}
              <div className="flex flex-wrap gap-4 mb-10">
                {perks.map((p) => (
                  <div key={p.title} className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <p.icon className="h-4 w-4 text-emerald-400" />
                    {p.title}
                  </div>
                ))}
              </div>

              {/* Features grid */}
              <div className="space-y-5">
                {features.map((f) => (
                  <div key={f.title} className="group flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 group-hover:border-violet-400/40 transition-colors">
                      <f.icon className="h-5 w-5 text-violet-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{f.title}</div>
                      <div className="text-sm text-slate-400">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: auth card */}
            <div className="w-full max-w-md mx-auto">
              <AuthForm mode="register" />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-slate-500">
          © 2026 ChatAI Pro — 保留所有权利
        </footer>
      </div>
    </div>
  );
}
