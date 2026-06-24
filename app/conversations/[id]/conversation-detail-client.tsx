"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ChatInterface } from "@/components/chat/chat-interface";

export function ConversationDetailClient({ id }: { id: string }) {
  return (
    <div>
      <div className="mb-4">
        <Link
          href="/conversations"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> All conversations
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Conversation</h1>
      <p className="text-slate-500 text-sm mb-6">
        与访客的完整对话记录
      </p>

      <ChatInterface botId="preview" initialConversationId={id} mode="full" />
      
      <div className="text-[10px] text-slate-400 mt-3 break-all">
        Conversation ID: {id}
      </div>
    </div>
  );
}
