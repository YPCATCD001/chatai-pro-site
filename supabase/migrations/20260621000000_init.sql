-- ============================================================
-- ChatAI Pro - Database Schema (Supabase PostgreSQL + pgvector)
-- ============================================================

-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "vector" with schema "public";

-- ------------------------------------------------------------
-- Custom types
-- ------------------------------------------------------------

do $$ begin
  create type subscription_tier as enum ('free', 'starter', 'growth', 'agency');
exception when duplicate_object then null; end $$;

do $$ begin
  create type subscription_status as enum ('active', 'canceled', 'past_due');
exception when duplicate_object then null; end $$;

do $$ begin
  create type bot_position as enum ('bottom-right', 'bottom-left');
exception when duplicate_object then null; end $$;

do $$ begin
  create type bot_status as enum ('active', 'paused');
exception when duplicate_object then null; end $$;

do $$ begin
  create type kb_type as enum ('document', 'url', 'faq');
exception when duplicate_object then null; end $$;

do $$ begin
  create type kb_status as enum ('processing', 'ready', 'error');
exception when duplicate_object then null; end $$;

do $$ begin
  create type conversation_status as enum ('active', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type message_role as enum ('user', 'assistant', 'system');
exception when duplicate_object then null; end $$;

-- ------------------------------------------------------------
-- users table (linked via Supabase Auth id)
-- ------------------------------------------------------------

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  subscription_tier subscription_tier not null default 'free',
  subscription_status subscription_status not null default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  monthly_message_count int not null default 0,
  reset_date timestamptz
);

-- ------------------------------------------------------------
-- bots table
-- ------------------------------------------------------------

create table if not exists bots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  welcome_message text not null default 'Hi there! How can I help you today?',
  primary_color text not null default '#6366f1',
  position bot_position not null default 'bottom-right',
  avatar_url text,
  status bot_status not null default 'active',
  api_key text unique not null default ('bk_' || encode(gen_random_bytes(24), 'hex')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- knowledge_base table
-- ------------------------------------------------------------

create table if not exists knowledge_base (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id) on delete cascade,
  type kb_type not null,
  title text not null,
  content text,
  file_url text,
  source_url text,
  status kb_status not null default 'processing',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- conversations table
-- ------------------------------------------------------------

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references bots(id) on delete cascade,
  visitor_id text not null,
  visitor_email text,
  status conversation_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- messages table
-- ------------------------------------------------------------

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role message_role not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- embeddings table - pgvector
-- ------------------------------------------------------------

create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  knowledge_base_id uuid not null references knowledge_base(id) on delete cascade,
  bot_id uuid not null references bots(id) on delete cascade,
  content text not null,
  embedding vector(1024),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes (for perf)
-- ------------------------------------------------------------

create index if not exists idx_bots_user_id on bots(user_id);
create index if not exists idx_kb_bot_id on knowledge_base(bot_id);
create index if not exists idx_conversations_bot_id on conversations(bot_id);
create index if not exists idx_conversations_visitor on conversations(visitor_id);
create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_embeddings_bot on embeddings(bot_id);
create index if not exists idx_embeddings_kb on embeddings(knowledge_base_id);

-- ------------------------------------------------------------
-- Row Level Security (RLS)
-- ------------------------------------------------------------

alter table users enable row level security;
alter table bots enable row level security;
alter table knowledge_base enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table embeddings enable row level security;

-- users: self read/write
drop policy if exists "users_self_read" on users;
create policy "users_self_read" on users for select using (auth.uid() = id);
drop policy if exists "users_self_write" on users;
create policy "users_self_write" on users for insert with check (auth.uid() = id);
drop policy if exists "users_self_update" on users;
create policy "users_self_update" on users for update using (auth.uid() = id);

-- bots: owner only
drop policy if exists "bots_owner_all" on bots;
create policy "bots_owner_all" on bots for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- knowledge_base: owner only
drop policy if exists "kb_owner" on knowledge_base;
create policy "kb_owner" on knowledge_base for all using (
  exists (
    select 1 from bots b
    where b.id = knowledge_base.bot_id and b.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from bots b
    where b.id = knowledge_base.bot_id and b.user_id = auth.uid()
  )
);

-- conversations: owner only
drop policy if exists "conversations_owner" on conversations;
create policy "conversations_owner" on conversations for all using (
  exists (
    select 1 from bots b
    where b.id = conversations.bot_id and b.user_id = auth.uid()
  )
);

-- messages: owner only
drop policy if exists "messages_owner" on messages;
create policy "messages_owner" on messages for all using (
  exists (
    select 1 from conversations c
    join bots b on b.id = c.bot_id
    where c.id = messages.conversation_id and b.user_id = auth.uid()
  )
);

-- embeddings: owner only (hidden)
drop policy if exists "embeddings_owner" on embeddings;
create policy "embeddings_owner" on embeddings for all using (
  exists (
    select 1 from bots b
    where b.id = embeddings.bot_id and b.user_id = auth.uid()
  )
);

-- ============================================================
-- Public Chat API policies (anon role)
-- ============================================================
-- These policies allow the public chat API (embedded on websites)
-- to read/write data without a user session. Application code
-- validates api_key before any operations.

-- bots: allow anon to read non-sensitive info (for bot info & api_key validation)
drop policy if exists "bots_anon_read" on bots;
create policy "bots_anon_read" on bots for select using (true);

-- users: allow anon to read subscription tier info (for message quota)
drop policy if exists "users_anon_read" on users;
create policy "users_anon_read" on users for select using (true);

-- users: allow anon to update monthly_message_count (for quota tracking)
drop policy if exists "users_anon_update" on users;
create policy "users_anon_update" on users for update using (true);

-- conversations: allow anon read/write (for chat threads)
drop policy if exists "conversations_anon_all" on conversations;
create policy "conversations_anon_all" on conversations for all using (true) with check (true);

-- messages: allow anon read/write (for chat messages)
drop policy if exists "messages_anon_all" on messages;
create policy "messages_anon_all" on messages for all using (true) with check (true);

-- knowledge_base: allow anon read (for content display)
drop policy if exists "kb_anon_read" on knowledge_base;
create policy "kb_anon_read" on knowledge_base for select using (true);

-- embeddings: allow anon read (for vector search via RPC)
drop policy if exists "embeddings_anon_read" on embeddings;
create policy "embeddings_anon_read" on embeddings for select using (true);

-- ------------------------------------------------------------
-- Trigger to auto-create a users row after signup
-- ------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, subscription_tier, subscription_status)
  values (new.id, new.email, 'free', 'active')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- updated_at trigger helper
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on users;
create trigger set_users_updated_at before update on users for each row execute function set_updated_at();

drop trigger if exists set_bots_updated_at on bots;
create trigger set_bots_updated_at before update on bots for each row execute function set_updated_at();

drop trigger if exists set_conversations_updated_at on conversations;
create trigger set_conversations_updated_at before update on conversations for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- Vector search helper (cosine similarity)
-- ------------------------------------------------------------

create or replace function public.match_bot_embeddings(
  _bot_id uuid,
  _embedding vector(1024),
  _limit int default 3
)
returns table (
  id uuid,
  content text,
  similarity double precision
)
language plpgsql
as $$
begin
  return query
    select
      e.id,
      e.content,
      (1 - (e.embedding <=> _embedding))::double precision as similarity
    from embeddings e
    where e.bot_id = _bot_id and e.embedding is not null
    order by e.embedding <=> _embedding
    limit _limit;
end;
$$;

grant execute on function public.match_bot_embeddings(uuid, vector(1024), int) to anon, authenticated;

-- ------------------------------------------------------------
-- Monthly message counter helper
-- ------------------------------------------------------------

create or replace function public.increment_monthly_message(user_uid uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  update users
  set monthly_message_count = monthly_message_count + 1
  where id = user_uid;
end;
$$;

grant execute on function public.increment_monthly_message(uuid) to anon, authenticated;

-- ------------------------------------------------------------
-- Storage bucket creation note:
-- In Supabase Dashboard -> Storage, create a bucket named:
--   knowledge-base
-- with public access disabled (or use signed URLs).
--
-- Also add the following storage policy:
--   "authenticated users upload own bot files"
--   allow all on storage.objects where bucket_id='knowledge-base'
--     and (storage.foldername(name))[1] = auth.uid()::text
-- ------------------------------------------------------------
