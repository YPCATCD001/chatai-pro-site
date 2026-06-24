import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BotTabsClient } from "./bot-tabs-client";

export async function generateStaticParams() {
  return [{ id: "preview" }];
}

export const dynamic = "force-static";

export default function BotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = params as unknown as { id: string };
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="mb-5">
          <Link
            href="/bots"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> All bots
          </Link>
        </div>
        <BotTabsClient botId={id} />
      </div>
    </main>
  );
}
