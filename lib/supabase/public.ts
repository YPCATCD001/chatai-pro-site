import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

let cached: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Creates a Supabase client with the anonymous key for public API routes.
 * Used by chat endpoints where visitors authenticate via bot API key (not Supabase auth).
 * RLS policies must permit API-key-based access for the queries these routes perform.
 */
export function createPublicClient() {
  if (!cached) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    cached = createClient<Database>(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    });
  }
  return cached;
}
