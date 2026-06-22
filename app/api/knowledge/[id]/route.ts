import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify ownership via RLS (join through bot ownership)
    const { data: kb, error } = await supabase
      .from("knowledge_base")
      .select("id, bot_id")
      .eq("id", id)
      .single();
    if (error || !kb) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { error: del } = await supabase
      .from("knowledge_base")
      .delete()
      .eq("id", id);
    if (del) return NextResponse.json({ error: del.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
