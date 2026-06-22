"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-xs">
            AI
          </span>
          ChatAI Pro
        </div>
        <div className="flex items-center gap-5">
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/login" className="hover:text-slate-900">Sign in</Link>
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
        </div>
        <div className="text-xs">
          &copy; {new Date().getFullYear()} ChatAI Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
