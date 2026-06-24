"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const isLogin = mode === "login";
  const gradient = isLogin
    ? "from-indigo-500 via-violet-500 to-fuchsia-500"
    : "from-violet-500 via-indigo-500 to-fuchsia-500";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (!isLogin) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: location.origin + "/auth/callback" },
        });
        if (error) throw error;
        setCheckEmail(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "发生错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: location.origin + "/auth/callback" },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Google 登录暂时不可用");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Card */}
      <div className="relative">
        {/* Glow border */}
        <div className={`absolute -inset-[1px] rounded-[28px] bg-gradient-to-br ${gradient} opacity-30 blur-[2px]`} />
        <div className="relative rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 mb-4 shadow-lg shadow-indigo-500/30">
              {isLogin ? (
                <Lock className="h-6 w-6 text-white" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {isLogin ? "欢迎回来 👋" : "创建你的账号"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {isLogin
                ? "登录以管理你的机器人、知识库和对话"
                : "免费开始，不需要信用卡，随时可以取消"}
            </p>
          </div>

          {/* Success check email state */}
          {checkEmail ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-300">请查收邮箱</div>
                  <div className="mt-1 text-emerald-200/80">
                    我们已向 <span className="font-medium">{email}</span> 发送了验证邮件。
                    点击邮件中的链接确认地址后即可登录。
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Social login row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-slate-200 hover:bg-white/[0.06] hover:border-white/20 transition-all disabled:opacity-50"
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setError("GitHub 登录即将上线")}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-slate-200 hover:bg-white/[0.06] hover:border-white/20 transition-all disabled:opacity-50"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-900/60 px-3 text-xs text-slate-500">
                    或使用邮箱 {isLogin ? "登录" : "注册"}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">邮箱</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.05]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">密码</label>
                    {isLogin && (
                      <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                        忘记密码？
                      </a>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? "输入你的密码" : "至少 6 个字符"}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.05]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-center"
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me (login only) */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="peer sr-only"
                      />
                      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-all peer-checked:border-indigo-400/60 peer-checked:bg-gradient-to-br peer-checked:from-indigo-500 peer-checked:to-violet-500">
                        <svg
                          className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-400">记住我</span>
                    </label>
                  </div>
                )}

                {/* Terms (register only) */}
                {!isLogin && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    注册即表示你同意我们的
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 mx-1">服务条款</a>
                    和
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 mx-1">隐私政策</a>
                    。
                  </p>
                )}

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative group w-full h-12 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:shadow-xl active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      请稍候…
                    </>
                  ) : (
                    <>
                      {isLogin ? "登录" : "免费创建账号"}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Divider with switch link */}
          {!checkEmail && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
              {isLogin ? (
                <>
                  还没有账号？{" "}
                  <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
                    立即注册
                  </a>
                </>
              ) : (
                <>
                  已有账号？{" "}
                  <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
                    去登录
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trust badges under the card */}
      <div className="mt-6 flex items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 flex-wrap">
        <div className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          SSL 加密
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          GDPR 合规
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          数据可导出
        </div>
      </div>
    </div>
  );
}
