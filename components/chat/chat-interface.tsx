"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import {
  searchKnowledge,
  getBotSettings,
  sendToDeepSeek,
  saveMessage,
  createConversation,
  buildSystemPrompt,
} from "@/lib/ai/chat-service";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  botId: string;
  initialConversationId?: string;
  mode?: "widget" | "full";
}

export function ChatInterface({ botId, initialConversationId, mode = "full" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId || null);
  const [botSettings, setBotSettings] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadBotSettings();
    if (initialConversationId) {
      loadMessages(initialConversationId);
    }
  }, [botId, initialConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function loadBotSettings() {
    const settings = await getBotSettings(botId);
    setBotSettings(settings);
    
    if (settings?.welcome_message && !initialConversationId) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: settings.welcome_message,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  }

  async function loadMessages(convId: string) {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient() as any;
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      if (data) setMessages(data);
    } catch (e) {
      console.warn("Failed to load messages:", e);
    }
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      let convId = conversationId;
      if (!convId) {
        convId = await createConversation(botId);
        if (!convId) throw new Error("Failed to create conversation");
        setConversationId(convId);
      }

      await saveMessage(convId, "user", userMessage.content);

      const knowledge = await searchKnowledge(botId, userMessage.content);
      
      const history = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      history.push({ role: "user", content: userMessage.content });

      const systemPrompt = buildSystemPrompt(
        botSettings?.name || "AI Assistant",
        knowledge
      );

      const apiKey = botSettings?.api_key || process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || "";
      
      if (!apiKey) {
        throw new Error("AI 服务未配置");
      }

      const aiResponse = await sendToDeepSeek(history, apiKey, systemPrompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      await saveMessage(convId, "assistant", aiResponse);
    } catch (err: any) {
      setError(err.message || "发送失败，请稍后再试");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const primaryColor = botSettings?.primary_color || "#6366f1";

  if (mode === "widget") {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div
          className="px-4 py-3 text-white flex items-center gap-3"
          style={{ background: primaryColor }}
        >
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">{botSettings?.name || "AI Assistant"}</div>
            <div className="text-xs text-white/80">在线</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center mr-2 shrink-0 text-white"
                  style={{ background: primaryColor }}
                >
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "text-white rounded-br-md"
                    : "bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100"
                }`}
                style={m.role === "user" ? { background: primaryColor } : {}}
              >
                <div className="whitespace-pre-wrap break-words">{m.content}</div>
              </div>
              {m.role === "user" && (
                <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center ml-2 shrink-0">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center mr-2 shrink-0 text-white"
                style={{ background: primaryColor }}
              >
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-3 py-2 shadow-sm border border-slate-100">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              </div>
            </div>
          )}
          {error && (
            <div className="text-xs text-red-500 text-center bg-red-50 rounded-lg p-2">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10 max-h-24"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-xl text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: primaryColor }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold">{botSettings?.name || "对话"}</h2>
        <p className="text-sm text-slate-500">与 AI 助手实时交流</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center mr-3 shrink-0 text-white"
                style={{ background: primaryColor }}
              >
                <Bot className="h-5 w-5" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "text-white rounded-tr-md"
                  : "bg-white text-slate-800 rounded-tl-md shadow-sm border border-slate-100"
              }`}
              style={m.role === "user" ? { background: primaryColor } : {}}
            >
              <div className="whitespace-pre-wrap break-words">{m.content}</div>
              <div className="text-[10px] opacity-60 mt-2">
                {new Date(m.created_at).toLocaleTimeString()}
              </div>
            </div>
            {m.role === "user" && (
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center ml-3 shrink-0">
                <User className="h-5 w-5 text-slate-500" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center mr-3 shrink-0 text-white"
              style={{ background: primaryColor }}
            >
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            </div>
          </div>
        )}
        {error && (
          <div className="text-sm text-red-500 text-center bg-red-50 rounded-xl p-3">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的消息... (Enter 发送，Shift+Enter 换行)"
            rows={2}
            className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10 max-h-32"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-12 px-6 rounded-xl text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ background: primaryColor }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            发送
          </button>
        </div>
      </form>
    </div>
  );
}
