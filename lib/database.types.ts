export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          subscription_tier: "free" | "starter" | "growth" | "agency";
          subscription_status: "active" | "canceled" | "past_due";
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          monthly_message_count: number;
          reset_date: string | null;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          subscription_tier?: "free" | "starter" | "growth" | "agency";
          subscription_status?: "active" | "canceled" | "past_due";
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          monthly_message_count?: number;
          reset_date?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>;
      };
      bots: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          welcome_message: string;
          primary_color: string;
          position: "bottom-right" | "bottom-left";
          avatar_url: string | null;
          status: "active" | "paused";
          api_key: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          welcome_message?: string;
          primary_color?: string;
          position?: "bottom-right" | "bottom-left";
          avatar_url?: string | null;
          status?: "active" | "paused";
          api_key?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bots"]["Row"]>;
      };
      knowledge_base: {
        Row: {
          id: string;
          bot_id: string;
          type: "document" | "url" | "faq";
          title: string;
          content: string | null;
          file_url: string | null;
          source_url: string | null;
          status: "processing" | "ready" | "error";
          created_at: string;
        };
        Insert: {
          id?: string;
          bot_id: string;
          type: "document" | "url" | "faq";
          title: string;
          content?: string | null;
          file_url?: string | null;
          source_url?: string | null;
          status?: "processing" | "ready" | "error";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["knowledge_base"]["Row"]>;
      };
      conversations: {
        Row: {
          id: string;
          bot_id: string;
          visitor_id: string;
          visitor_email: string | null;
          status: "active" | "closed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          bot_id: string;
          visitor_id: string;
          visitor_email?: string | null;
          status?: "active" | "closed";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Row"]>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Row"]>;
      };
      embeddings: {
        Row: {
          id: string;
          knowledge_base_id: string;
          bot_id: string;
          content: string;
          embedding: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          knowledge_base_id: string;
          bot_id: string;
          content: string;
          embedding?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["embeddings"]["Row"]>;
      };
    };
    Functions: {
      match_bot_embeddings: {
        Args: {
          _bot_id: string;
          _embedding: string;
          _limit?: number;
        };
        Returns: {
          id: string;
          content: string;
          similarity: number;
        }[];
      };
    };
    Views: {};
  };
}
