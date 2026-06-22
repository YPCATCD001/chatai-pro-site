"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

let cachedBrowserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost-supabase-mock";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "anon-mock";
  return createBrowserClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export function getClient() {
  if (cachedBrowserClient) return cachedBrowserClient;
  cachedBrowserClient = createClient();
  return cachedBrowserClient;
}

export const supabase = getClient();
