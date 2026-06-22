import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ArrowLeft } from "lucide-react";
import { BotTabs } from "@/components/bots/bot-tabs";

export default async function BotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell>
      <div className="mb-5">
        <Link
          href="/bots"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> All bots
        </Link>
      </div>
      <BotTabs botId={id} />
    </AppShell>
  );
}
