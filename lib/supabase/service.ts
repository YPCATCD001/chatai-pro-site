import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

let cached: ReturnType<typeof createClient<Database>> | null = null;

export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost-supabase-mock";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "service-role-mock";
  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

export function getServiceRoleClient() {
  if (!cached) cached = createServiceRoleClient();
  return cached;
}

export async function storageUpload(
  bucket: string,
  path: string,
  body: Buffer | ArrayBuffer | string | Uint8Array,
  contentType: string = "application/octet-stream"
): Promise<{ path: string; id?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    throw new Error("Supabase URL/key not configured");
  }
  const endpoint = `${url}/storage/v1/object/${bucket}/${path}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": contentType,
      "x-upsert": "true",
      // 明确告诉 Supabase Storage 我们在使用 service role
      "x-metadata-source": "server-side",
    },
    // credentials: 'omit' - 不携带 cookies，防止 Storage 把用户 session 当作验证信息
    body: body as any,
    // 确保 Next.js 不会自动注入 cookies
    cache: "no-store",
  } as RequestInit);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Storage upload failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data;
}

export function storagePublicUrl(bucket: string, path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}

export const serviceRole = {
  from: (table: any) => getServiceRoleClient().from(table),
  rpc: (fn: string, args?: any) => getServiceRoleClient().rpc(fn, args),
  auth: {
    getUser: () => getServiceRoleClient().auth.getUser(),
  },
  storage: {
    from: (bucket: string) => getServiceRoleClient().storage.from(bucket),
  },
};
