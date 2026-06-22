import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: bot, error } = await supabase
      .from("bots")
      .select("id, user_id, name, welcome_message, primary_color, position, avatar_url, api_key")
      .eq("id", id)
      .single() as { data: any; error: any };
    if (error || !bot) return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    if ((bot as any).user_id !== user.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const snippet = `<!-- ChatAI Pro Embed Code -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/widget.js?botId=${bot.id}&apiKey=${bot.api_key}';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
<!-- End ChatAI Pro Embed Code -->`;

    return NextResponse.json({
      bot,
      snippet,
      widget_url: `${baseUrl}/widget.js?botId=${bot.id}&apiKey=${bot.api_key}`,
      config: {
        botId: bot.id,
        apiKey: bot.api_key,
        welcomeMessage: bot.welcome_message,
        primaryColor: bot.primary_color,
        position: bot.position,
        avatarUrl: bot.avatar_url,
        botName: bot.name,
        apiBase: baseUrl,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
