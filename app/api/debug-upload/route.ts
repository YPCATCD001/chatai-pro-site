import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const envVars = {
    HTTP_PROXY: process.env.HTTP_PROXY || "",
    HTTPS_PROXY: process.env.HTTPS_PROXY || "",
    NO_PROXY: process.env.NO_PROXY || "",
    http_proxy: process.env.http_proxy || "",
    https_proxy: process.env.https_proxy || "",
  };
  return NextResponse.json({
    url,
    key,
    envVars,
  });
}
