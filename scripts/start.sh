#!/usr/bin/env bash
# ============================================================
# ChatAI Pro — Quick Start (本地开发)
# ============================================================
set -e

echo "=============================================="
echo "  ChatAI Pro — 本地开发快速启动"
echo "=============================================="
echo ""

# Step 1: 检查 Node.js 版本
REQUIRED_NODE_MAJOR=20
NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt "$REQUIRED_NODE_MAJOR" ]; then
    echo "❌ Node.js 版本过低 (v$NODE_VERSION)，需要 Node.js 18+ (推荐 20+)"
    exit 1
fi
echo "✅ Node.js v$(node -v | sed 's/v//')"

# Step 2: 安装依赖
if [ ! -d node_modules ]; then
    echo ""
    echo "📦 安装 npm 依赖..."
    npm install
fi
echo "✅ 依赖就绪"

# Step 3: 检查环境变量
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  .env.local 未找到"
    echo "   从模板创建：cp .env.local.example .env.local"
    echo "   然后填入以下必填变量："
    echo "     - NEXT_PUBLIC_SUPABASE_URL"
    echo "     - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "     - SUPABASE_SERVICE_ROLE_KEY"
    echo "     - DEEPSEEK_API_KEY"
    echo "     - NEXT_PUBLIC_APP_URL"
    cp .env.local.example .env.local
    echo ""
    echo "✅ 已创建 .env.local（请编辑填入真实值）"
    echo ""
    echo "然后执行：npm run dev"
    exit 0
fi

# Step 4: 启动
echo ""
echo "🚀 启动开发服务器 (http://localhost:3000)..."
exec npm run dev
