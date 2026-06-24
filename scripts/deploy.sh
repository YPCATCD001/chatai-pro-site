#!/bin/bash
# ChatAI Pro — 一键部署脚本
# 用法: ./scripts/deploy.sh [vercel|netlify|docker]

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# 颜色输出
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo -e "\n${GREEN}=== ChatAI Pro 部署工具 ===${NC}\n"

# 检查环境变量
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}⚠️  警告: 未找到 .env.local, 正在从 .env.local.example 创建模板...${NC}"
  cp .env.local.example .env.local
  echo -e "   请编辑 .env.local 填入真实配置值后重试\n"
  exit 1
fi

# 加载环境变量
export $(grep -v '^#' .env.local | xargs) 2>/dev/null || true

# 验证关键变量
MISSING=()
[ -z "$NEXT_PUBLIC_SUPABASE_URL" ] && MISSING+=("NEXT_PUBLIC_SUPABASE_URL")
[ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] && MISSING+=("NEXT_PUBLIC_SUPABASE_ANON_KEY")
[ -z "$SUPABASE_SERVICE_ROLE_KEY" ] && MISSING+=("SUPABASE_SERVICE_ROLE_KEY")
[ -z "$DEEPSEEK_API_KEY" ] && MISSING+=("DEEPSEEK_API_KEY")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo -e "${RED}❌ 缺少关键环境变量: ${MISSING[*]}${NC}"
  echo "   请编辑 .env.local 并填入正确的值"
  exit 1
fi

echo -e "${GREEN}✅ 环境变量配置正确${NC}"
echo "   Supabase: ${NEXT_PUBLIC_SUPABASE_URL}"
echo "   DeepSeek: ${DEEPSEEK_API_KEY:0:10}..."
echo ""

# 部署目标
TARGET=${1:-vercel}

case "$TARGET" in
  vercel)
    echo -e "${GREEN}🚀 部署到 Vercel${NC}"
    echo ""
    if ! command -v vercel &> /dev/null; then
      echo "正在安装 Vercel CLI..."
      npm install -g vercel
    fi
    echo "执行: vercel --prod"
    vercel --prod --yes
    ;;
  netlify)
    echo -e "${GREEN}🚀 部署到 Netlify${NC}"
    echo ""
    if ! command -v netlify &> /dev/null; then
      echo "正在安装 Netlify CLI..."
      npm install -g netlify-cli
    fi
    echo "执行: netlify deploy --prod"
    netlify deploy --prod --build
    ;;
  docker)
    echo -e "${GREEN}🚀 Docker 容器构建${NC}"
    echo ""
    echo "执行: docker build -t chatai-pro ."
    docker build -t chatai-pro .
    echo -e "\n✅ 构建完成! 使用方式:"
    echo "   docker run -p 3000:3000 --env-file .env.local chatai-pro"
    echo "   或: docker-compose up -d"
    ;;
  *)
    echo -e "${RED}❌ 未知部署目标: $TARGET${NC}"
    echo "   支持: vercel | netlify | docker"
    exit 1
    ;;
esac

echo -e "\n${GREEN}✅ 部署完成!${NC}"
echo "   Supabase Auth 回调 URL: ${NEXT_PUBLIC_APP_URL}/auth/callback"
echo "   请在 Supabase Dashboard 中配置此 URL"
