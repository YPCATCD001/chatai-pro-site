"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import {
  Bot,
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  MessageSquarePlus,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "品牌定制机器人",
    desc: "用你的名字、配色和欢迎语打造专属客服机器人。",
  },
  {
    icon: Zap,
    title: "秒级响应",
    desc: "平均响应时间 <200ms，打字指示器 + 流式渲染。",
  },
  {
    icon: ShieldCheck,
    title: "企业级安全",
    desc: "Supabase RLS 行级隔离，每一位用户数据独立存储。",
  },
];

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white antialiased">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-slate-950 via-40% to-slate-950" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[860px] rounded-full bg-indigo-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="w-full">
          <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
              AI
            </span>
            <span className="font-bold text-lg tracking-tight text-white">
              ChatAI Pro
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="hidden sm:inline">还没有账号？</span>
            <Link
              href="/register"
              className="text-white font-medium text-indigo-400 hover:text-indigo-300 transition"
            >
              创建账号 →
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  欢迎回来
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight leading-[1.05] mb-6">
                用你的文档
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  训练一个 AI
                </span>
                <br />
                永远在线的客服
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                上传 PDF、指向你公司网站，或者写几条 FAQ。
                <br />
                登录后即可管理你的机器人、知识库和对话数据。
              </p>

              <div className="space-y-5">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="group flex items-start gap-4"
                  >
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 group-hover:border-indigo-400/40 transition-colors">
                      <f.icon className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{f.title}</div>
                      <div className="text-sm text-slate-400">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini testimonial */}
              <div className="mt-12 p-6 rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {"★★★★★"}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  &ldquo;之前雇了两名兼职客服，现在一个 ChatAI Pro 机器人处理了 80% 的常见问题。&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 flex items-center justify-center font-bold text-slate-900">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Marie Dupont</div>
                    <div className="text-xs text-slate-500">创始人 · Maison &amp; Cie</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: auth card */}
            <div className="w-full max-w-md mx-auto">
              <AuthForm mode="login" />
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
