-- ============================================================
-- ChatAI Pro — Supabase Database Schema
-- 适用环境：Supabase Cloud (PostgreSQL 15+)
-- 使用方式：在 Supabase Dashboard → SQL Editor 中执行
-- ============================================================

-- ------------------------------------------------------------
-- 1. 核心表（幂等创建）
-- ------------------------------------------------------------

-- 扩展表：users（与 auth.users 保持 1:1 同步）
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    subscription_tier TEXT NOT NULL DEFAULT 'free',
    subscription_status TEXT NOT NULL DEFAULT 'active',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    monthly_message_count INTEGER NOT NULL DEFAULT 0,
    reset_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- bots：AI 机器人表（api_key 自动生成）
CREATE TABLE IF NOT EXISTS public.bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    welcome_message TEXT NOT NULL DEFAULT 'Hi there! How can I help you today?',
    primary_color TEXT NOT NULL DEFAULT '#6366f1',
    position TEXT NOT NULL DEFAULT 'bottom-right',
    avatar_url TEXT,
    api_key TEXT NOT NULL DEFAULT ('bk_' || encode(gen_random_bytes(24), 'hex')),
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bots_user_id ON public.bots(user_id);
CREATE INDEX IF NOT EXISTS idx_bots_api_key ON public.bots(api_key);

-- knowledge_base：机器人知识库（支持文档 / URL / FAQ）
CREATE TABLE IF NOT EXISTS public.knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id UUID NOT NULL REFERENCES public.bots(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('document', 'url', 'faq')),
    title TEXT NOT NULL,
    content TEXT,
    file_url TEXT,
    source_url TEXT,
    status TEXT NOT NULL DEFAULT 'ready',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kb_bot_id ON public.knowledge_base(bot_id);
CREATE INDEX IF NOT EXISTS idx_kb_bot_id_status ON public.knowledge_base(bot_id, status);

-- conversations：访客对话记录
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id UUID NOT NULL REFERENCES public.bots(id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL,
    visitor_email TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conv_bot_id ON public.conversations(bot_id);
CREATE INDEX IF NOT EXISTS idx_conv_bot_id_visitor ON public.conversations(bot_id, visitor_id);
CREATE INDEX IF NOT EXISTS idx_conv_updated_at ON public.conversations(updated_at DESC);

-- messages：对话消息记录
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_msg_conv_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_msg_created_at ON public.messages(created_at);

-- ------------------------------------------------------------
-- 2. Row Level Security (RLS) 策略
-- ------------------------------------------------------------

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- users：用户仅能看/改自己的记录
DROP POLICY IF EXISTS "users_read_own" ON public.users;
CREATE POLICY "users_read_own" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_insert_own" ON public.users;
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON public.users;
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- bots：用户仅能看/改自己的机器人
DROP POLICY IF EXISTS "bots_own" ON public.bots;
CREATE POLICY "bots_own" ON public.bots FOR ALL USING (auth.uid() = user_id);

-- knowledge_base：通过 bot_id -> bots.user_id 关联校验
DROP POLICY IF EXISTS "kb_by_bot_owner" ON public.knowledge_base;
CREATE POLICY "kb_by_bot_owner" ON public.knowledge_base FOR ALL USING (
    EXISTS (SELECT 1 FROM public.bots b WHERE b.id = knowledge_base.bot_id AND b.user_id = auth.uid())
);

-- conversations：机器人 owner 可读
DROP POLICY IF EXISTS "conv_by_bot_owner" ON public.conversations;
CREATE POLICY "conv_by_bot_owner" ON public.conversations FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.bots b WHERE b.id = conversations.bot_id AND b.user_id = auth.uid())
);

-- messages：机器人 owner 可读
DROP POLICY IF EXISTS "msg_by_bot_owner" ON public.messages;
CREATE POLICY "msg_by_bot_owner" ON public.messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.conversations c
        JOIN public.bots b ON b.id = c.bot_id
        WHERE c.id = messages.conversation_id AND b.user_id = auth.uid()
    )
);

-- ------------------------------------------------------------
-- 3. 触发器：自动维护 updated_at & users 同步
-- ------------------------------------------------------------

-- moddatetime extension 用于自动更新 updated_at
CREATE EXTENSION IF NOT EXISTS moddatetime;

DROP TRIGGER IF EXISTS handle_updated_at_users ON public.users;
CREATE TRIGGER handle_updated_at_users
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

DROP TRIGGER IF EXISTS handle_updated_at_bots ON public.bots;
CREATE TRIGGER handle_updated_at_bots
    BEFORE UPDATE ON public.bots
    FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

DROP TRIGGER IF EXISTS handle_updated_at_kb ON public.knowledge_base;
CREATE TRIGGER handle_updated_at_kb
    BEFORE UPDATE ON public.knowledge_base
    FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

DROP TRIGGER IF EXISTS handle_updated_at_conversations ON public.conversations;
CREATE TRIGGER handle_updated_at_conversations
    BEFORE UPDATE ON public.conversations
    FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

-- 用户注册后同步到 public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, subscription_tier, subscription_status, monthly_message_count)
    VALUES (NEW.id, NEW.email, 'free', 'active', 0)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 每月消息计数 RPC（使用 service_role 调用，避免 RLS 绕过问题）
CREATE OR REPLACE FUNCTION public.increment_monthly_message(user_uid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.users
    SET monthly_message_count = COALESCE(monthly_message_count, 0) + 1
    WHERE id = user_uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 允许 service_role 与 authenticated 角色执行此函数
REVOKE ALL ON FUNCTION public.increment_monthly_message(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_monthly_message(UUID) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 4. 为匿名用户（widget 访客）开放少量只读权限
--    widget 实际上通过 API 路由 + service_role 访问，
--    但此处保持策略最小化以避免信息泄漏
-- ------------------------------------------------------------

-- 为 public schema 添加基本的 usage grants（service_role 有更多权限）
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bots TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_base TO authenticated;
GRANT SELECT, INSERT ON public.conversations TO authenticated;
GRANT SELECT, INSERT ON public.messages TO authenticated;

-- ============================================================
-- 部署完成后，请在 Supabase 中设置以下内容：
-- ============================================================
--   1. 确认 SITE_URL 指向你的 Vercel 域名（Auth → URL Configuration）
--   2. 添加 Redirect URLs:
--        https://your-domain.com/auth/callback
--        http://localhost:3000/auth/callback    (开发环境)
--   3. Auth → Providers → Email: 启用
--   4. (可选) 配置邮箱 SMTP 以发送验证邮件
