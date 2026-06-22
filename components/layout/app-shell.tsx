"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Dashboard", match: "/dashboard" },
  { href: "/bots", label: "Bots", match: "/bots" },
  { href: "/conversations", label: "Conversations", match: "/conversations" },
  { href: "/analytics", label: "Analytics", match: "/analytics" },
  { href: "/pricing", label: "Pricing", match: "/pricing" },
  { href: "/settings", label: "Settings", match: "/settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
      if (!data.session) location.href = "/login";
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
      if (!session) location.href = "/login";
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    location.href = "/";
  }

  const isActive = (match: string) =>
    pathname === match || pathname.startsWith(match + "/");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white min-h-screen sticky top-0 hidden md:block">
          <div className="h-16 px-5 flex items-center border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-xs shadow-sm">
                AI
              </span>
              <span>ChatAI Pro</span>
            </Link>
          </div>
          <nav className="p-3 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={
                  "block px-3 py-2 text-sm rounded-md " +
                  (isActive(n.match)
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100")
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="truncate text-slate-700">{email}</div>
              <button
                onClick={signOut}
                className="text-slate-500 hover:text-slate-800 text-xs"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200">
          <div className="h-14 flex items-center justify-between px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-xs shadow-sm">
                AI
              </span>
              ChatAI Pro
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-slate-700 px-3 py-1.5 rounded-md border border-slate-300 text-sm"
            >
              Menu
            </button>
          </div>
          {open ? (
            <div className="px-3 py-2 border-t border-slate-200 space-y-1 bg-white">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={
                    "block px-3 py-2 text-sm rounded-md " +
                    (isActive(n.match) ? "bg-indigo-50 text-indigo-700" : "text-slate-700")
                  }
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={signOut}
                className="block w-full text-left px-3 py-2 text-sm text-slate-500"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>

        <main className="flex-1 min-w-0 md:pt-0 pt-16">
          <div className="p-6 md:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
