import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const apiKey = new URL(req.url).searchParams.get("apiKey") ||
    req.headers.get("x-api-key") || "";

  if (!id || !apiKey) {
    return NextResponse.json({ error: "Missing botId or apiKey" }, { status: 400 });
  }

  const supabase = getServiceRoleClient();
  const { data: bot, error } = await supabase
    .from("bots")
    .select("id, name, welcome_message, primary_color, position, avatar_url")
    .eq("id", id)
    .eq("api_key", apiKey)
    .eq("status", "active")
    .single();

  if (error || !bot) {
    return NextResponse.json({ error: "Invalid bot or apiKey" }, { status: 401 });
  }

  return NextResponse.json(bot, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
