"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, RefreshCw, ArrowUpRight, Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Conversation {
  id: string;
  bot_id: string;
  visitor_id: string;
  visitor_email: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  bots?: { id: string; name: string; primary_color?: string } | null;
}

export default function ConversationsPage() {
  const [items, setItems] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await (createClient() as any)
        .from("conversations")
        .select("*, bots(id, name, primary_color)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      if (Array.isArray(data)) setItems(data as Conversation[]);
    } catch (e: any) {
      setError(e.message || "Failed to load conversations");
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Analytics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Conversations
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[15px]">
              Track all visitor interactions with your AI bots
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card card-shadow overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">Loading conversations...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No conversations yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Once visitors chat with your bots, their conversations will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {items.map((c) => (
                <Link 
                  key={c.id} 
                  href={`/conversations/${c.id}`}
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" 
                    style={{ background: (c as any).bots?.primary_color || "#8b5cf6" }}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[15px]">
                        {(c as any).bots?.name || "Unknown Bot"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {c.visitor_email || c.visitor_id.slice(0, 8)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {new Date(c.updated_at).toLocaleDateString()} at{" "}
                      {new Date(c.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      c.status === "active" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {c.status}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Showing {items.length} conversation{items.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </AppShell>
  );
}
