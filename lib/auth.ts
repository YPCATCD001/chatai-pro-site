import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function getCurrentUserIdOnServer(): Promise<string | null> {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function requireUserIdOnServer(): Promise<string> {
  const id = await getCurrentUserIdOnServer();
  if (!id) throw new Error("UNAUTHENTICATED");
  return id;
}

export async function getSessionOnClient() {
  return createBrowserClient().auth.getSession();
}
