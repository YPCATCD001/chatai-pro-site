-- ============================================================
-- Column Level Security Patch
-- Run this in Supabase Dashboard SQL Editor if the initial
-- migration was already applied before these security fixes.
-- ============================================================

-- Revoke anon access to sensitive columns on bots table
revoke select (api_key) on bots from anon;

-- Revoke anon access to sensitive columns on users table
revoke select (stripe_customer_id, stripe_subscription_id, email) on users from anon;

-- Verify: check current column privileges for anon role
-- Run this query to verify:
-- select table_name, column_name, privilege_type
-- from information_schema.column_privileges
-- where grantee = 'anon' and table_schema = 'public'
-- order by table_name, column_name;
