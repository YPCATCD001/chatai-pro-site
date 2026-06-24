import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return NextResponse.json({
    url: url,
    keyLength: key.length,
    keyStartsWith: key.substring(0, 15) + "...",
    envFound: !!key,
  });
}
