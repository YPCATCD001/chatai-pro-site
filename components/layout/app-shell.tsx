"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  MessageSquareText,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const NAV = [
  {
    group: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, match: "/dashboard" },
      { href: "/bots", label: "Bots", icon: Bot, match: "/bots" },
      { href: "/conversations", label: "Conversations", icon: MessageSquareText, match: "/conversations" },
      { href: "/analytics", label: "Analytics", icon: BarChart3, match: "/analytics" },
    ],
  },
  {
    group: "Account",
    items: [
      { href: "/pricing", label: "Pricing", icon: CreditCard, match: "/pricing" },
      { href: "/settings", label: "Settings", icon: Settings, match: "/settings" },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 px-4 flex items-center border-b border-border/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-bold shadow-sm shadow-violet-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight">ChatAI Pro</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-5">
        {NAV.map((section) => (
          <div key={section.group}>
            <div className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {section.group}
            </div>
            <nav className="space-y-0.5">
              {section.items.map((n) => {
                const Icon = n.icon;
                const active = isActive(n.match);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      "sidebar-item flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg transition-all duration-150 " +
                      (active
                        ? "active bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60")
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.25 : 1.75} />
                    <span className="truncate">{n.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-border/80 p-2.5 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          )}
          <span className="truncate">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted/60 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {email ? email.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{email || "User"}</div>
            <div className="text-xs text-muted-foreground truncate">Free plan</div>
          </div>
          <button
            onClick={signOut}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen app-bg text-foreground">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-border/80 bg-card/60 backdrop-blur-sm sticky top-0 h-screen hidden md:flex flex-col">
          <SidebarContent />
        </aside>

        <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/80">
          <div className="h-14 flex items-center justify-between px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="font-semibold text-sm">ChatAI Pro</span>
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <div className="border-t border-border/80 bg-card/95 backdrop-blur-md">
              <div className="p-2.5 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                <SidebarContent />
              </div>
            </div>
          )}
        </div>

        <main className="flex-1 min-w-0 md:pt-0 pt-14">
          <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
