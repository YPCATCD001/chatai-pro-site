"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, MessageCircle, Sparkles } from "lucide-react";
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

      const aiResponse = await sendToDeepSeek(history, systemPrompt);

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

  const primaryColor = botSettings?.primary_color || "#8b5cf6";

  if (mode === "widget") {
    return (
      <div className="flex flex-col h-full bg-background rounded-2xl shadow-xl border border-border/60 overflow-hidden">
        <div
          className="px-4 py-3.5 text-white flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
        >
          <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">{botSettings?.name || "AI Assistant"}</div>
            <div className="text-xs text-white/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              在线
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((m, index) => (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {m.role === "assistant" && (
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center mr-2 shrink-0 text-white shadow-sm"
                  style={{ background: primaryColor }}
                >
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "text-white rounded-br-md"
                    : "bg-card text-foreground rounded-bl-md shadow-sm border border-border/60"
                }`}
                style={m.role === "user" ? { background: primaryColor } : {}}
              >
                <div className="whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center ml-2 shrink-0 border border-border/40">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-2 justify-start">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center mr-2 shrink-0 text-white shadow-sm"
                style={{ background: primaryColor }}
              >
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-border/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="text-xs text-red-500 text-center bg-red-50 border border-red-100 rounded-xl p-3">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-border/60 bg-card">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all max-h-24 placeholder:text-muted-foreground/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-11 w-11 rounded-xl text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 shadow-lg shadow-primary/25"
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
    <div className="flex flex-col h-[600px] rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border/60 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ background: primaryColor }}
          >
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{botSettings?.name || "对话"}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AI 助手在线
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-muted/20">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">开始对话</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              发送消息与 AI 助手交流，我将尽力帮助你解答问题
            </p>
          </div>
        )}
        
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`flex items-end gap-3 ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {m.role === "assistant" && (
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mr-2 shrink-0 text-white shadow-sm"
                style={{ background: primaryColor }}
              >
                <Bot className="h-5 w-5" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-sm ${
                m.role === "user"
                  ? "text-white rounded-br-md"
                  : "bg-card text-foreground rounded-bl-md shadow-sm border border-border/60"
              }`}
              style={m.role === "user" ? { background: primaryColor } : {}}
            >
              <div className="whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
              <div className="text-[10px] opacity-50 mt-2 flex items-center gap-1">
                {m.role === "assistant" && <Sparkles className="w-3 h-3" />}
                {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            {m.role === "user" && (
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center ml-2 shrink-0 border border-border/40">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex items-end gap-3 justify-start animate-fade-up">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center mr-2 shrink-0 text-white shadow-sm"
              style={{ background: primaryColor }}
            >
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-card rounded-2xl rounded-bl-md px-5 py-4 shadow-sm border border-border/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-sm text-red-500 text-center bg-red-50 border border-red-100 rounded-xl p-3">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border/60 bg-card">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的消息... (Enter 发送，Shift+Enter 换行)"
            rows={2}
            className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all max-h-32 placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-12 px-6 rounded-xl text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20"
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
