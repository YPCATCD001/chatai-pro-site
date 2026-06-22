"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "register") {
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
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {mode === "register" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            {mode === "register"
              ? "Start for free — no credit card required."
              : "Sign in to manage your bots, knowledge and conversations."}
          </p>
        </div>

        {checkEmail ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 p-4 text-sm">
            Check your inbox to confirm your email address. After verification, you can sign in.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
                {error}
              </div>
            ) : null}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full h-11"
            >
              {loading ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-slate-600">
          {mode === "register" ? (
            <>Already have an account? <a className="text-indigo-600 hover:underline" href="/login">Sign in</a></>
          ) : (
            <>New here? <a className="text-indigo-600 hover:underline" href="/register">Create an account</a></>
          )}
        </div>
      </div>
    </div>
  );
}
