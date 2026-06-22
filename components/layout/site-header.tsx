"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-sm shadow-sm">
            AI
          </span>
          ChatAI Pro
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <Link href="/#features" className="hover:text-slate-900">Features</Link>
          <Link href="/#how" className="hover:text-slate-900">How it works</Link>
          <Link href="/#pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/#faq" className="hover:text-slate-900">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 shadow-sm"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
