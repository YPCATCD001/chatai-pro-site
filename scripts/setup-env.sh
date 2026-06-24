#!/bin/bash
# ChatAI Pro — 环境变量设置向导

cd "$(dirname "$0")/.."

if [ -f .env.local ]; then
  echo "已存在 .env.local, 是否覆盖? (y/N)"
  read -r overwrite
  [ "$overwrite" != "y" ] && exit 0
fi

echo "=== ChatAI Pro 环境变量配置 ==="
echo ""

read -p "Supabase URL: " SUPABASE_URL
read -p "Supabase Anon Key: " SUPABASE_ANON
read -p "Supabase Service Role Key: " SUPABASE_SERVICE
read -p "DeepSeek API Key: " DEEPSEEK_KEY
read -p "应用 URL (默认 http://localhost:3000): " APP_URL

cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE}
DEEPSEEK_API_KEY=${DEEPSEEK_KEY}
DEEPSEEK_CHAT_MODEL=deepseek-chat
NEXT_PUBLIC_APP_URL=${APP_URL:-http://localhost:3000}
STRIPE_SECRET_KEY=
EOF

echo ""
echo "✅ .env.local 创建完成"
echo ""
cat .env.local
