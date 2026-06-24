import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConversationDetailClient } from "./conversation-detail-client";

export async function generateStaticParams() {
  return [{ id: "preview" }];
}

export const dynamic = "force-static";

export default function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = params as unknown as { id: string };
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <ConversationDetailClient id={id} />
      </div>
    </main>
  );
}
