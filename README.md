# ChatAI Pro

一个面向中小企业的 AI 客服 SaaS 平台 — 用户可以在 5 分钟内部署一个 24/7 在线的 AI 客服机器人。

- 用户可以上传 PDF/TXT/DOCX 文档、抓取 URL、手工添加 FAQ
- 生成一行 `<script>` 嵌入代码，粘贴到任何网站即可启用浮动聊天按钮
- 流式对话（SSE）、对话历史、问答分析

---

## 技术栈

- **前端**: Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS
- **后端**: Next.js Route Handlers（Node.js runtime）
- **数据库**: PostgreSQL（Supabase 托管 或 自建）
- **AI 模型**: DeepSeek Chat API（与 OpenAI API 兼容）
- **检索**: 关键词匹配（F1 得分）—— 无需 embeddings / GPU
- **支付**: Stripe Checkout（可选）
- **部署**: Vercel（一键） 或 Docker（自托管）

## 功能模块

- 用户认证（邮箱 + 密码）
- 机器人管理（创建 / 编辑 / 删除 / 列表）
- 知识库（TXT / DOCX / PDF 上传、URL 抓取、FAQ 手工添加）
- 嵌入代码（`<script>`）一键生成
- 公开对话接口（SSE 流式响应）
- 对话历史
- 分析（会话数 / 消息数 / 热门问题 TOP）
- 订阅与计费（Free / Starter / Growth / Agency）

## 目录结构

```
app/
  api/              # 所有 API 路由
    auth/           # 认证（注册/登录/登出/回调/重置）
    bots/           # 机器人 / 知识库 / 嵌入代码
    chat/           # 公开对话接口 (SSE 流式)
    conversations/  # 对话历史
    analytics/      # 分析接口
    subscription/   # 订阅 & Stripe Checkout
    me/             # 当前用户信息
  dashboard/        # 登录后的首页
  bots/             # 机器人列表 & 详情
  conversations/    # 对话历史列表
  analytics/        # 分析面板
  pricing/          # 定价页
  settings/         # 用户设置
  widget.js/        # 嵌入到外部网站的 widget JS
  page.tsx          # 公网站首页
components/         # UI 组件（app shell / auth form / bot tabs 等）
lib/                # 工具库、Supabase 客户端、AI 检索、Stripe、plans
supabase/
  schema.sql        # 数据库初始化（DDL + RLS + triggers），在 Supabase SQL Editor 执行
```

---

## 🔧 本地开发（3 步）

### 前置条件

- Node.js **18+**（推荐 20 LTS）
- npm 9+
- 一个 Supabase 项目（免费版即可）
- 一个 DeepSeek API Key（免费额度足够测试）

### Step 1: 安装依赖

```bash
npm install
```

### Step 2: 创建 Supabase 项目并运行数据库脚本

1. 到 [supabase.com/dashboard](https://supabase.com/dashboard) 新建项目（建议 Region 选 `southeast-asia` 或 `us-east-1`）。
2. 打开 **SQL Editor** → **New Query**，复制粘贴 `supabase/schema.sql` 的全部内容，点 **Run** 执行。
3. 打开 **Project Settings → API**，复制以下 3 个值：
   - `Project URL`
   - `anon public` key
   - `service_role secret` key（点 **Reveal** 显示）

### Step 3: 配置环境变量

```bash
cp .env.local.example .env.local
# 然后用编辑器打开 .env.local 填入以下内容
```

`.env.local` 中至少需要：

| Key | 必填 | 说明 |
|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | 仅服务器端使用（service_role key） |
| `DEEPSEEK_API_KEY` | ✅ | 从 https://platform.deepseek.com 获取 |
| `NEXT_PUBLIC_APP_URL` | ✅ | `http://localhost:3000`（本地）或你的生产域名 |
| `STRIPE_SECRET_KEY` | ☐ | 不配置时订阅升级会失败，其他功能正常 |

### Step 4: 启动

```bash
npm run dev
# 或一键脚本
./scripts/start.sh
```

浏览器访问 http://localhost:3000

### Step 5: 初始化使用流程

1. 注册一个账号：`/register`
2. 登录后跳转到 `/dashboard`
3. 进入 Bots 页 → **+ New Bot** → 命名后保存
4. 进入 Bot 详情：
   - **Knowledge** → 添加 FAQ / URL / 上传 TXT PDF DOCX
   - **Embed** → 复制生成的 `<script>` 标签
   - **Preview** → 在预览窗口测试聊天（流式响应）
5. 把 Embed 里的 script 粘贴到客户网站的 `<head>` 末尾 → 右下角出现浮动按钮，访客即可对话
6. 对话出现在 `/conversations`，指标出现在 `/analytics`

---

## 🚀 方案 A：部署到 Vercel（推荐，零运维）

### 1. 推送到 Git 仓库

把项目推到 GitHub / GitLab / Bitbucket。

### 2. 在 Vercel 新建项目

1. 登录 https://vercel.com/new
2. 选择你的仓库 → **Import**
3. **Framework Preset** 会自动识别为 **Next.js**（保持默认）
4. **Build Command**: `next build`（默认）
5. **Root Directory**: `/`（默认）
6. **Environment Variables** — 把 `.env.local` 中的所有变量逐一粘贴到这里
   > `NEXT_PUBLIC_APP_URL` 请写你绑定的生产域名（或 Vercel 自动分配的 `https://project.vercel.app`）

7. 点击 **Deploy**

### 3. 配置 Supabase 允许 Vercel 访问

打开 Supabase → **Authentication → URL Configuration → Redirect URLs**：

```
https://your-domain.com/auth/callback
https://your-domain.com
http://localhost:3000             # 保留本地开发
```

### 4. 访问生产环境

部署完成后 Vercel 会给出生产域名（如 `https://chatai-pro.vercel.app`）。

- 首页：`https://chatai-pro.vercel.app`
- 机器人管理：`https://chatai-pro.vercel.app/bots`

---

## 🐳 方案 B：自托管（Docker + Docker Compose）

适用于部署在自有服务器 / AWS EC2 / 阿里云 ECS 等。

### 前置条件

- 安装 Docker 和 Docker Compose v2+
- 准备一个域名（或直接用 IP + 端口）
- 一个 Supabase 项目（也可以用自托管的 PostgreSQL）

### 一键启动

```bash
# 1. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入 Supabase / DeepSeek / APP_URL

# 2. 构建并启动容器（后台）
docker compose up -d --build

# 3. 查看日志
docker compose logs -f

# 4. 停止
docker compose down
```

应用监听端口 `3000`，访问 `http://服务器IP:3000`。

### 推荐：前面挂一个 Nginx 反代 + SSL

```nginx
server {
    listen 80;
    server_name chat.your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name chat.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/chat.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chat.your-domain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # SSE 需要的长连接头
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;
        proxy_read_timeout 3600s;
    }
}
```

> SSE（流式响应）必须关闭 `proxy_buffering`，否则消息会被攒到末尾才一次性发送。

---

## 🔌 API 一览

所有需要登录的接口使用 Supabase 自带的 cookie 会话。
公开接口（`/api/chat`、`/api/bots/[id]/public`）使用 `botId + apiKey` 鉴权。

| 方法 | 路由 | 鉴权 | 说明 |
|------|------|------|------|
| POST | `/api/auth/register` | — | 注册新账号 |
| POST | `/api/auth/login` | — | 登录（返回 session cookie） |
| POST | `/api/auth/logout` | 登录用户 | 登出 |
| GET  | `/api/me` | 登录用户 | 当前用户信息 |
| GET  | `/api/bots` | 登录用户 | 机器人列表 |
| POST | `/api/bots` | 登录用户 | 创建机器人（受 plan 限制） |
| GET  | `/api/bots/[id]` | 登录用户 | 机器人详情 |
| PUT  | `/api/bots/[id]` | 登录用户 | 更新机器人 |
| DELETE| `/api/bots/[id]` | 登录用户 | 删除机器人 |
| GET  | `/api/bots/[id]/knowledge` | 登录用户 | 知识库列表 |
| POST | `/api/bots/[id]/knowledge/upload` | 登录用户 | 上传文件（PDF/TXT/DOCX） |
| POST | `/api/bots/[id]/knowledge/url` | 登录用户 | 抓取 URL（cheerio 解析） |
| POST | `/api/bots/[id]/knowledge/faq` | 登录用户 | 添加 FAQ（批量） |
| DELETE| `/api/knowledge/[id]` | 登录用户 | 删除知识库条目 |
| GET  | `/api/bots/[id]/embed` | 登录用户 | 生成嵌入代码（含 apiKey） |
| GET  | `/api/bots/[id]/public?apiKey=...` | apiKey | widget 加载时调用的公开配置 |
| POST | `/api/chat?botId=...&apiKey=...` | apiKey | SSE 流式对话接口 |
| GET  | `/api/conversations` | 登录用户 | 所有对话列表 |
| GET  | `/api/conversations/[id]/messages` | 登录用户 | 单对话消息 |
| GET  | `/api/analytics/overview` | 登录用户 | 总体指标（对话数/消息数/7天趋势） |
| GET  | `/api/analytics/top-questions` | 登录用户 | 热门问题 TOP |
| GET  | `/api/subscription` | 登录用户 | 订阅状态 & 升级链接 |
| POST | `/api/subscription` | 登录用户 | 创建 Stripe Checkout 会话 |

---

## 🔐 安全提示

1. **永远不要把 `.env.local` 提交到 Git**（已在 `.gitignore` 中排除）
2. `SUPABASE_SERVICE_ROLE_KEY` 只能在服务器端（API routes）使用，**绝不能出现在浏览器端代码**
3. widget 嵌入到任何第三方网站时，仅暴露 `botId + apiKey`，不会泄露用户凭证
4. 所有公开接口均已在代码中显式设置 `Access-Control-Allow-Origin: *`，因此任何网站都可以嵌入 widget
5. 数据库表已启用 **Row Level Security（RLS）**，用户只能读写自己的 bots / knowledge / conversations
6. Stripe Webhook 需要在 Stripe Dashboard 中配置，并把 `STRIPE_WEBHOOK_SECRET` 写入环境变量

---

## 📦 生产部署清单

- [ ] Supabase: 执行 `supabase/schema.sql`
- [ ] Supabase: Auth → **Redirect URLs** 添加生产域名
- [ ] Supabase: Auth → **Email** 确认配置（或关闭 Confirm Email）
- [ ] Vercel/Docker: 配置所有环境变量
- [ ] Vercel/Docker: `NEXT_PUBLIC_APP_URL` 改成生产域名（如 `https://chat.your-domain.com`）
- [ ] 测试完整流程：注册 → 创建 bot → 上传知识库 → 对话 → 查看 conversations
- [ ] （可选）配置 Stripe 产品 + 价格 ID，接入订阅升级

---

## 🛠️ 故障排查

| 现象 | 可能原因 | 解决 |
|------|---------|------|
| 打开 `/dashboard` 立即被重定向回 `/login` | 浏览器没有有效 session cookie 或被 CORS 拦截 | 确认浏览器非无痕模式；确认 `NEXT_PUBLIC_SUPABASE_URL` 正确 |
| widget 打开聊天窗口，点击发送后无响应 | widget 使用旧的 `apiBase`（可能是缓存的 `localhost:3000`） | 检查浏览器 DevTools → Network，看 `/api/chat` 的请求 URL；在 Embed 页重新复制脚本 |
| 聊天 429 "Monthly message quota reached" | 免费 plan 每月 100 条消息（用户维度） | 升级 plan 或 在 Supabase 的 users 表手动把 `subscription_tier` 改成 `starter` |
| 流式响应非常慢 | DeepSeek 有时会限流；检查 DeepSeek API Key 是否有额度 | 换一个 API key；把 `DEEPSEEK_CHAT_MODEL` 改成更小的模型 |
| Supabase 报错 `row-level security policy` | 当前用户查询了不属于他的数据 | 确保登录者是该 bot 的 owner；或确认 service role key 配置正确 |
| `schema.sql` 执行报错 "relation already exists" | 之前已经跑过一次 | schema.sql 本身是幂等的（全部使用 `CREATE TABLE IF NOT EXISTS`），如果有自定义 alter 语句需要注意 |

---

## License

MIT
