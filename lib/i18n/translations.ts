export type Locale =
  | "zh" | "en" | "de" | "fr" | "it" | "es"
  | "ja" | "ko" | "pt" | "nl" | "sv" | "pl"
  | "tr" | "th" | "vi" | "id" | "cs" | "ru"
  | "ar" | "hi" | "he";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
];

export const RTL_LOCALES: Locale[] = ["ar", "he"];

export type Dict = typeof en;

const en = {
  nav: {
    features: "Features",
    how: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    getStarted: "Get started",
  },
  hero: {
    badge: "🇪🇺 Built for European SMBs · Now globally available",
    titleLine1: "Train an always-on",
    titleLine2: "AI customer service",
    subtitle:
      "Upload PDFs, point to your company website, or write a few FAQs — ChatAI Pro deploys a branded chatbot that answers visitors 24/7, cutting manual support by 80%.",
    ctaPrimary: "Start free · No credit card",
    ctaSecondary: "Watch demo",
    stats: [
      { n: "5 min", label: "From signup to live" },
      { n: "80%", label: "FAQ auto-handled" },
      { n: "40+", label: "Languages" },
      { n: "24/7", label: "Always on" },
    ],
    chat: {
      brandTitle: "Hello · Bonjour",
      brandSub: "Your dedicated AI agent",
      status: "Currently replying to visitors",
      avgResp: "Avg response · 1.2 sec",
      weekly: "Handled this week · 247 conversations",
      botHello:
        "Hi there 👋 I'm your company AI. Ask me anything about pricing, ordering, or shipping!",
      userMsg: "How fast is your express shipping?",
      typing: "Express shipping · delivered in",
      typing2: "24 hours",
      typing3: "in metropolitan areas",
      source: "Source: FAQ #3 · Shipping policy.pdf",
      refDocs: "Ref docs · 2",
    },
  },
  logos: {
    title: "Trusted by hundreds of SMBs",
    list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"],
  },
  features: {
    badge: "✨ Core capabilities",
    title1: "Everything you need,",
    title2: "all set up and ready",
    sub: "ChatAI Pro is the fastest, simplest way to put AI customer service on any website.",
    items: [
      {
        title: "Custom AI Bot",
        desc: "A dedicated agent with your name, colors and welcome message — customers feel they're talking to you.",
        tag: "Branded",
      },
      {
        title: "One-line embed",
        desc: "Copy a script tag into your HTML. No dev work required to go live.",
        tag: "Zero config",
      },
      {
        title: "Plug-and-play knowledge",
        desc: "Upload PDFs, crawl URLs, or write FAQs — the AI automatically pulls answers from your docs.",
        tag: "Smart retrieval",
      },
      {
        title: "Streaming replies",
        desc: "Think-and-output typing indicator, smooth streaming responses — no lag.",
        tag: "<200ms",
      },
      {
        title: "Automatic multilingual",
        desc: "Visitors ask in any language, the bot replies in the same one — no setup needed.",
        tag: "40+ languages",
      },
      {
        title: "Live analytics",
        desc: "Conversation volume, top questions, AI reply rate — operations at a glance.",
        tag: "Data-driven",
      },
    ],
    security: {
      badge: "🛡️ Enterprise security",
      title: "Your data never leaves your tenant",
      desc: "Supabase Row-Level Security isolates every user's data. Your documents serve only your bot and never train any model. API calls are HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-level security", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [
        { k: "99.9%", l: "Service uptime" },
        { k: "<200ms", l: "Avg AI response" },
        { k: "AES-256", l: "Encryption" },
        { k: "SOC2", l: "Compliance" },
      ],
    },
  },
  how: {
    badge: "🚀 3 simple steps",
    title1: "From signup to live,",
    title2: "in just 5 minutes",
    steps: [
      {
        title: "Create your bot",
        text: "Pick a name, a theme color and a welcome message. Done in 30 seconds.",
      },
      {
        title: "Feed it your docs",
        text: "Drop in PDFs, paste URLs, or just write a few FAQ entries directly.",
      },
      {
        title: "Embed on your site",
        text: "Copy one script line into your HTML. Your AI customer service is live.",
      },
    ],
  },
  pricing: {
    badge: "⭐ Transparent pricing",
    title1: "Pick a plan that fits",
    title2: "your business size",
    sub: "The free plan is forever. Upgrading never auto-renews.",
    plans: {
      free: {
        name: "FREE",
        price: "0",
        perMonth: "/month",
        billing: "Monthly · Cancel anytime",
        features: ["1 bot", "100 AI messages / month", "5 knowledge docs", "Branded widget", "Community support"],
        cta: "Start free",
      },
      starter: {
        name: "STARTER",
        badge: "🔥 Most popular",
        price: "49",
        perMonth: "/month",
        billing: "Monthly · Cancel anytime",
        features: [
          "2 bots",
          "3,000 AI messages / month",
          "50 knowledge docs",
          "Remove branding",
          "Basic analytics",
          "Email support",
        ],
        cta: "Upgrade",
      },
      growth: {
        name: "GROWTH",
        price: "129",
        perMonth: "/month",
        billing: "Monthly · Cancel anytime",
        features: [
          "5 bots",
          "10,000 AI messages / month",
          "200 knowledge docs",
          "Full analytics dashboard",
          "Multi-language support",
          "Priority support",
        ],
        cta: "Upgrade",
      },
      agency: {
        name: "AGENCY",
        price: "299",
        perMonth: "/month",
        billing: "Monthly · Cancel anytime",
        features: [
          "Unlimited bots",
          "50,000 AI messages / month",
          "Unlimited documents",
          "White-label widget",
          "API access",
          "Dedicated account manager",
        ],
        cta: "Upgrade",
      },
    },
  },
  testimonials: {
    badge: "⭐ Reviews",
    title: "Owners and engineers love it",
    rating: "Avg 4.9 / 5",
    items: [
      {
        name: "Marie Dupont",
        role: "Founder · Maison & Cie",
        text: "We used to have two part-time support staff. Now one ChatAI Pro bot handles 80% of common questions.",
        initial: "M",
      },
      {
        name: "Jonas Weber",
        role: "Tech lead · Helio SaaS",
        text: "From signup to the marketing site embed took 15 minutes. Document upload and code embedding are super smooth.",
        initial: "J",
      },
      {
        name: "Alessandro Rossi",
        role: "Owner · Piazza Bistro",
        text: "Our customers ask in Italian, English, German. The bot replies in the same language, 24/7.",
        initial: "A",
      },
    ],
  },
  faq: {
    title: "Still have questions?",
    sub: "We've compiled the most common ones.",
    items: [
      {
        q: "Do I need to know how to code?",
        a: "Not at all. Sign up → create a bot → upload docs → copy the script. Anyone non-technical can do it in 5 minutes.",
      },
      {
        q: "Which languages are supported?",
        a: "English, German, French, Spanish, Italian, Dutch, Chinese, Japanese and 40+ more. The bot auto-detects the visitor's language and replies in the same one.",
      },
      {
        q: "Is my data safe?",
        a: "Everything lives in your Supabase tenant with Row-Level Security. Each user only sees their own bots and conversations.",
      },
      {
        q: "Can I try it for free first?",
        a: "Yes. The free plan includes 1 bot, 5 documents and 100 AI messages per month — no credit card required.",
      },
      {
        q: "Can I remove your branding?",
        a: "Yes. The Starter plan and above support removing the ChatAI Pro branding so customers see only your name and logo.",
      },
    ],
    contact: "Didn't find an answer? Email support@chatai-pro.com — we reply within 24 hours.",
  },
  finalCta: {
    title: "Put AI customer service on your website today",
    sub: "Start free, done in 5 minutes. No credit card, no lock-in.",
    primary: "Create free account",
    secondary: "Existing user · Sign in",
    trust: [
      "Free plan forever",
      "No credit card",
      "Deployed in 5 min",
    ],
  },
  footer: {
    rights: "ChatAI Pro — All rights reserved",
    privacy: "Privacy policy",
    terms: "Terms of service",
  },
  langSwitcher: {
    label: "Language",
  },
};

const zh: Dict = {
  nav: {
    features: "功能",
    how: "使用流程",
    pricing: "价格",
    faq: "常见问题",
    signIn: "登录",
    getStarted: "免费开始",
  },
  hero: {
    badge: "🇪🇺 面向欧洲中小企业 · 现已全球上线",
    titleLine1: "用你的文档训练一个",
    titleLine2: "永远在线的 AI 客服",
    subtitle:
      "上传 PDF、指向你公司网站，或者写几条 FAQ —— ChatAI Pro 为你部署一个带品牌的聊天机器人，24/7 回答访客问题，把人工客服成本砍掉 80%。",
    ctaPrimary: "免费开始 · 无需信用卡",
    ctaSecondary: "观看演示",
    stats: [
      { n: "5 分钟", label: "从注册到上线" },
      { n: "80%", label: "常见问题自动处理" },
      { n: "40+", label: "支持语言" },
      { n: "24/7", label: "全天候值守" },
    ],
    chat: {
      brandTitle: "你好 · Bonjour",
      brandSub: "你的专属 AI 客服",
      status: "正在回复你的访客",
      avgResp: "平均响应时间 · 1.2 秒",
      weekly: "本周已处理 · 247 条对话",
      botHello: "你好 👋 我是你们公司的 AI 客服，有什么关于价格、下单、发货的问题都可以直接问我！",
      userMsg: "你们的加急配送是多久到？",
      typing: "加急配送 · 下单后",
      typing2: "24 小时",
      typing3: "内送达市区",
      source: "来源：常见问题 #3 · 配送政策.pdf",
      refDocs: "参考文档 · 2",
    },
  },
  logos: {
    title: "数百位中小企业主的选择",
    list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"],
  },
  features: {
    badge: "✨ 核心能力",
    title1: "一切你需要的功能，",
    title2: "全都准备好了",
    sub: "ChatAI Pro 是把 AI 客服放到任意网站最快、最简单的方式。",
    items: [
      { title: "Custom AI Bot", desc: "用你的名字、配色和欢迎语打造专属客服机器人，客户感觉就是在和你对话。", tag: "品牌定制" },
      { title: "一行代码嵌入", desc: "复制 script 标签粘贴到 HTML，无需任何开发即可上线。", tag: "零配置" },
      { title: "知识库即插即用", desc: "上传 PDF / 抓取网页 / 编写 FAQ，AI 自动从你的文档中提取答案。", tag: "智能检索" },
      { title: "流式实时回复", desc: "边想边输出，打字指示器 + 流畅流式响应，响应不卡顿。", tag: "<200ms" },
      { title: "自动多语种", desc: "访客用什么语言提问，机器人就用什么语言回答，无需配置。", tag: "40+ 语言" },
      { title: "实时数据看板", desc: "对话量、热门问题、AI 回复率——一目了然的运营数据。", tag: "数据驱动" },
    ],
    security: {
      badge: "🛡️ 企业级安全",
      title: "数据从不出你的租户",
      desc: "Supabase 行级安全（RLS）隔离每一位用户的数据，你的文档只服务你的机器人，从不参与任何模型训练。API 调用全程 HTTPS + Bearer Token 鉴权。",
      chips: ["🔒 行级安全", "🔐 API Key 鉴权", "🛡️ 数据隔离", "🇪🇺 欧洲合规"],
      stats: [
        { k: "99.9%", l: "服务可用率" },
        { k: "<200ms", l: "AI 平均响应" },
        { k: "AES-256", l: "数据加密" },
        { k: "SOC2", l: "合规标准" },
      ],
    },
  },
  how: {
    badge: "🚀 三步上手",
    title1: "从注册到上线，",
    title2: "只需 5 分钟",
    steps: [
      { title: "创建机器人", text: "起个名字、选个主题色、写一句欢迎语，30 秒搞定。" },
      { title: "喂给它你的资料", text: "拖入 PDF、粘贴网址，或者直接写几段 FAQ 条目。" },
      { title: "嵌入到你的网站", text: "复制一行 script 代码放进 HTML，你的 AI 客服就上线了。" },
    ],
  },
  pricing: {
    badge: "⭐ 透明定价",
    title1: "选一个适合你",
    title2: "业务规模",
    sub: "免费版永久可用。升级到任意套餐都不会自动续费。",
    plans: {
      free: {
        name: "免费版", price: "0", perMonth: "/月", billing: "按月计费 · 随时取消",
        features: ["1 个机器人", "每月 100 条 AI 消息", "5 篇知识库文档", "带品牌组件", "社区支持"],
        cta: "立即开始",
      },
      starter: {
        name: "起步版", badge: "🔥 最受欢迎", price: "49", perMonth: "/月", billing: "按月计费 · 随时取消",
        features: ["2 个机器人", "每月 3,000 条 AI 消息", "50 篇知识库文档", "去除品牌标识", "基础数据分析", "邮件支持"],
        cta: "升级套餐",
      },
      growth: {
        name: "增长版", price: "129", perMonth: "/月", billing: "按月计费 · 随时取消",
        features: ["5 个机器人", "每月 10,000 条 AI 消息", "200 篇知识库文档", "完整数据分析面板", "多语言支持", "优先支持"],
        cta: "升级套餐",
      },
      agency: {
        name: "企业版", price: "299", perMonth: "/月", billing: "按月计费 · 随时取消",
        features: ["不限数量机器人", "每月 50,000 条 AI 消息", "不限数量文档", "白标组件", "API 访问权限", "专属客户经理"],
        cta: "升级套餐",
      },
    },
  },
  testimonials: {
    badge: "⭐ 用户评价",
    title: "店主和工程师都说好",
    rating: "平均 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "创始人 · Maison & Cie", text: "之前雇了两名兼职客服，现在一个 ChatAI Pro 机器人处理了 80% 的常见问题。", initial: "M" },
      { name: "Jonas Weber", role: "技术负责人 · Helio SaaS", text: "从注册到正式嵌入营销网站，只用了 15 分钟。文档上传和代码嵌入流程特别丝滑。", initial: "J" },
      { name: "Alessandro Rossi", role: "店主 · Piazza Bistro", text: "我们的顾客用意语、英语、德语问问题，机器人都能 24/7 用对应语言回答。", initial: "A" },
    ],
  },
  faq: {
    title: "还有问题？",
    sub: "我们整理了用户最常问的几个问题。",
    items: [
      { q: "需要懂代码才能用吗？", a: "完全不用。注册后创建机器人 → 上传文档 → 复制一行脚本粘贴到网站，任何非技术人员都能在 5 分钟内完成。" },
      { q: "支持哪些语言？", a: "英语、德语、法语、西班牙语、意大利语、荷兰语、中文、日语等 40+ 种语言，机器人会自动识别访客语言并用同语言回答。" },
      { q: "我的数据安全吗？", a: "所有数据存储在 Supabase，启用行级安全（RLS），每个用户只能看到自己的机器人和对话记录。" },
      { q: "可以先免费试用吗？", a: "可以。免费版包含 1 个机器人、5 份文档、每月 100 次 AI 消息，无需信用卡。" },
      { q: "能去掉你们的品牌吗？", a: "起步版及以上支持去除 ChatAI Pro 品牌标识，客户只会看到你的名字和 logo。" },
    ],
    contact: "没找到答案？发送邮件到 support@chatai-pro.com，我们 24 小时内回复。",
  },
  finalCta: {
    title: "现在就把 AI 客服放到你的网站上",
    sub: "免费开始，5 分钟搞定。不需要信用卡，不绑定时长。",
    primary: "创建免费账号",
    secondary: "已有账号 · 登录",
    trust: ["免费版永久可用", "无需信用卡", "5 分钟部署完成"],
  },
  footer: { rights: "ChatAI Pro — 保留所有权利", privacy: "隐私政策", terms: "服务条款" },
  langSwitcher: { label: "语言" },
};

const de: Dict = {
  nav: { features: "Funktionen", how: "So funktioniert's", pricing: "Preise", faq: "FAQ", signIn: "Anmelden", getStarted: "Kostenlos starten" },
  hero: {
    badge: "🇪🇺 Für europäische KMUs · Weltweit verfügbar",
    titleLine1: "Trainiere einen",
    titleLine2: "immer verfügbaren AI-Service",
    subtitle:
      "PDFs hochladen, auf deine Unternehmenswebsite verlinken oder FAQs schreiben – ChatAI Pro stellt einen gebrandeten Chatbot bereit, der Besucher 24/7 beantwortet und den Supportaufwand um 80 % senkt.",
    ctaPrimary: "Kostenlos starten · Ohne Kreditkarte",
    ctaSecondary: "Demo ansehen",
    stats: [
      { n: "5 Min.", label: "Von der Anmeldung zum Live-Betrieb" },
      { n: "80%", label: "FAQs automatisch beantwortet" },
      { n: "40+", label: "Sprachen" },
      { n: "24/7", label: "Immer verfügbar" },
    ],
    chat: {
      brandTitle: "Hallo · Bonjour", brandSub: "Dein persönlicher KI-Agent",
      status: "Antwortet gerade deinen Besuchern", avgResp: "Ø Antwortzeit · 1,2 Sek.",
      weekly: "Diese Woche bearbeitet · 247 Gespräche",
      botHello: "Hallo 👋 Ich bin die KI deines Unternehmens. Frag mich zu Preisen, Bestellungen oder Versand!",
      userMsg: "Wie schnell ist euer Expressversand?",
      typing: "Expressversand · Lieferung innerhalb", typing2: "24 Stunden", typing3: "in Großstädten",
      source: "Quelle: FAQ #3 · Versandrichtlinie.pdf", refDocs: "Referenzdokumente · 2",
    },
  },
  logos: { title: "Hunderte KMUs vertrauen uns", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Kernfunktionen",
    title1: "Alles, was du brauchst,",
    title2: "ist bereits startklar",
    sub: "ChatAI Pro ist die schnellste und einfachste Möglichkeit, KI-Service auf jeder Website einzusetzen.",
    items: [
      { title: "Custom AI Bot", desc: "Ein persönlicher Agent mit deinem Namen, Farben und Willkommensnachricht – Kunden haben das Gefühl, mit dir zu sprechen.", tag: "Gebrandet" },
      { title: "Einzeilige Einbettung", desc: "Ein Script-Tag in dein HTML kopieren. Keine Entwicklungsarbeit nötig.", tag: "Kein Setup" },
      { title: "Steckfertige Wissensbasis", desc: "PDFs hochladen, URLs crawlen oder FAQs schreiben – die KI zieht Antworten automatisch aus deinen Dokumenten.", tag: "Smarter Abruf" },
      { title: "Streaming-Antworten", desc: "Denk- und Tippindikator, flüssige Streaming-Antworten – ohne Verzögerung.", tag: "<200 ms" },
      { title: "Automatisch mehrsprachig", desc: "Besucher fragen in jeder Sprache, der Bot antwortet in derselben – ganz ohne Konfiguration.", tag: "40+ Sprachen" },
      { title: "Live-Analyse", desc: "Gesprächsvolumen, Top-Fragen, KI-Antwortrate – der Betrieb auf einen Blick.", tag: "Datengetrieben" },
    ],
    security: {
      badge: "🛡️ Enterprise-Sicherheit",
      title: "Deine Daten bleiben in deinem Tenant",
      desc: "Supabase Row-Level Security isoliert die Daten jedes Nutzers. Deine Dokumente dienen nur deinem Bot und trainieren niemals ein Modell. API-Aufrufe sind durchgängig HTTPS + Bearer Token geschützt.",
      chips: ["🔒 Row-Level-Security", "🔐 API-Key-Auth", "🛡️ Datenisolation", "🇪🇺 DSGVO-konform"],
      stats: [
        { k: "99,9%", l: "Verfügbarkeit" },
        { k: "<200 ms", l: "Ø KI-Antwort" },
        { k: "AES-256", l: "Verschlüsselung" },
        { k: "SOC2", l: "Compliance" },
      ],
    },
  },
  how: {
    badge: "🚀 In 3 einfachen Schritten",
    title1: "Von der Anmeldung bis Live,",
    title2: "in nur 5 Minuten",
    steps: [
      { title: "Bot erstellen", text: "Name, Theme-Farbe und Willkommensnachricht auswählen. In 30 Sekunden erledigt." },
      { title: "Mit Dokumenten füttern", text: "PDFs hochladen, URLs einfügen oder direkt FAQs schreiben." },
      { title: "Auf deiner Website einbetten", text: "Eine Script-Zeile in dein HTML kopieren. Fertig – dein KI-Service ist live." },
    ],
  },
  pricing: {
    badge: "⭐ Transparente Preise",
    title1: "Wähle den Plan, der zu",
    title2: "deinem Unternehmen passt",
    sub: "Der Free-Plan ist für immer kostenlos. Ein Upgrade wird nie automatisch verlängert.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/Monat", billing: "Monatlich · Jederzeit kündbar", features: ["1 Bot", "100 KI-Nachrichten / Monat", "5 Wissensdokumente", "Gebrandetes Widget", "Community-Support"], cta: "Jetzt starten" },
      starter: { name: "STARTER", badge: "🔥 Am beliebtesten", price: "49", perMonth: "/Monat", billing: "Monatlich · Jederzeit kündbar", features: ["2 Bots", "3.000 KI-Nachrichten / Monat", "50 Wissensdokumente", "Branding entfernen", "Basis-Analyse", "E-Mail-Support"], cta: "Upgrade" },
      growth: { name: "GROWTH", price: "129", perMonth: "/Monat", billing: "Monatlich · Jederzeit kündbar", features: ["5 Bots", "10.000 KI-Nachrichten / Monat", "200 Wissensdokumente", "Vollständiges Analyse-Dashboard", "Mehrsprachig", "Priority-Support"], cta: "Upgrade" },
      agency: { name: "AGENCY", price: "299", perMonth: "/Monat", billing: "Monatlich · Jederzeit kündbar", features: ["Unbegrenzte Bots", "50.000 KI-Nachrichten / Monat", "Unbegrenzte Dokumente", "White-Label-Widget", "API-Zugriff", "Dedizierter Account-Manager"], cta: "Upgrade" },
    },
  },
  testimonials: {
    badge: "⭐ Bewertungen",
    title: "Geschäftsinhaber und Ingenieure lieben es",
    rating: "Ø 4,9 / 5",
    items: [
      { name: "Marie Dupont", role: "Gründerin · Maison & Cie", text: "Früher hatten wir zwei Teilzeit-Mitarbeiter im Support. Jetzt erledigt ein ChatAI Pro-Bot 80 % der Standardfragen.", initial: "M" },
      { name: "Jonas Weber", role: "Tech-Lead · Helio SaaS", text: "Von der Anmeldung bis zur Einbettung auf der Marketing-Site dauerte es 15 Minuten. Dokument-Upload und Code-Einbettung laufen super glatt.", initial: "J" },
      { name: "Alessandro Rossi", role: "Inhaber · Piazza Bistro", text: "Unsere Gäste fragen auf Italienisch, Englisch, Deutsch. Der Bot antwortet in derselben Sprache, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Noch Fragen?",
    sub: "Wir haben die häufigsten zusammengestellt.",
    items: [
      { q: "Brauche ich Programmierkenntnisse?", a: "Ganz und gar nicht. Anmelden → Bot erstellen → Dokumente hochladen → Script kopieren. Jeder Nicht-Techniker schafft das in 5 Minuten." },
      { q: "Welche Sprachen werden unterstützt?", a: "Englisch, Deutsch, Französisch, Spanisch, Italienisch, Niederländisch, Chinesisch, Japanisch und 40+ weitere. Der Bot erkennt die Besuchersprache automatisch und antwortet gleichlautend." },
      { q: "Sind meine Daten sicher?", a: "Alles lebt in deinem Supabase-Tenant mit Row-Level Security. Jeder Nutzer sieht nur seine eigenen Bots und Gespräche." },
      { q: "Kann ich es zuerst kostenlos testen?", a: "Ja. Der Free-Plan umfasst 1 Bot, 5 Dokumente und 100 KI-Nachrichten pro Monat – ohne Kreditkarte." },
      { q: "Kann ich euer Branding entfernen?", a: "Ja. Ab dem Starter-Plan kannst du das ChatAI Pro-Branding entfernen, sodass Kunden nur deinen Namen und dein Logo sehen." },
    ],
    contact: "Keine Antwort gefunden? Schreibe an support@chatai-pro.com – wir melden uns innerhalb von 24 Stunden.",
  },
  finalCta: {
    title: "Bring noch heute KI-Service auf deine Website",
    sub: "Kostenlos starten, in 5 Minuten fertig. Ohne Kreditkarte, ohne Bindung.",
    primary: "Kostenloses Konto erstellen",
    secondary: "Bereits registriert · Anmelden",
    trust: ["Free-Plan für immer", "Ohne Kreditkarte", "In 5 Min. live"],
  },
  footer: { rights: "ChatAI Pro — Alle Rechte vorbehalten", privacy: "Datenschutz", terms: "AGB" },
  langSwitcher: { label: "Sprache" },
};

const fr: Dict = {
  nav: { features: "Fonctionnalités", how: "Comment ça marche", pricing: "Tarifs", faq: "FAQ", signIn: "Connexion", getStarted: "Commencer gratuitement" },
  hero: {
    badge: "🇪🇺 Pour les PME européennes · Disponible dans le monde",
    titleLine1: "Entraînez un",
    titleLine2: "service client IA toujours disponible",
    subtitle:
      "Téléversez des PDFs, pointez vers le site de votre entreprise, ou rédigez quelques FAQs — ChatAI Pro déploie un chatbot à votre image qui répond aux visiteurs 24/7 et réduit le support manuel de 80 %.",
    ctaPrimary: "Commencer gratuitement · Sans carte bancaire",
    ctaSecondary: "Voir la démo",
    stats: [
      { n: "5 min", label: "De l'inscription en ligne" },
      { n: "80%", label: "FAQ traitées automatiquement" },
      { n: "40+", label: "Langues" },
      { n: "24/7", label: "Toujours disponible" },
    ],
    chat: {
      brandTitle: "Bonjour · Hello", brandSub: "Votre agent IA dédié",
      status: "Répond actuellement à vos visiteurs", avgResp: "Réponse moyenne · 1,2 s",
      weekly: "Traité cette semaine · 247 conversations",
      botHello: "Bonjour 👋 Je suis l'IA de votre entreprise. Demandez-moi tout sur les prix, les commandes ou la livraison !",
      userMsg: "Quel délai pour votre livraison express ?",
      typing: "Livraison express · Livré sous", typing2: "24 h", typing3: "en zone urbaine",
      source: "Source : FAQ #3 · Politique de livraison.pdf", refDocs: "Docs référencés · 2",
    },
  },
  logos: { title: "La confiance de centaines de PME", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Fonctionnalités clés",
    title1: "Tout ce qu'il faut,",
    title2: "tout est prêt",
    sub: "ChatAI Pro est la façon la plus rapide et la plus simple de mettre un service client IA sur n'importe quel site.",
    items: [
      { title: "Bot IA personnalisé", desc: "Un agent dédié avec votre nom, vos couleurs et votre message d'accueil — les clients ont l'impression de parler à vous.", tag: "À votre image" },
      { title: "Intégration en une ligne", desc: "Copiez une balise script dans votre HTML. Aucun développement requis pour passer en ligne.", tag: "Zéro config" },
      { title: "Base de connaissances prête à l'emploi", desc: "PDFs, crawl d'URLs ou FAQs rédigées — l'IA puise automatiquement les réponses dans vos docs.", tag: "Récupération intelligente" },
      { title: "Réponses en streaming", desc: "Indicateur de frappe, réponses fluides en streaming — aucun lag.", tag: "<200 ms" },
      { title: "Multilingue automatique", desc: "Les visiteurs posent une question dans leur langue, le bot répond dans la même — sans config.", tag: "40+ langues" },
      { title: "Analytique en direct", desc: "Volume de conversations, questions fréquentes, taux de réponse IA — l'exploitation en un clin d'œil.", tag: "Piloté par les données" },
    ],
    security: {
      badge: "🛡️ Sécurité entreprise",
      title: "Vos données ne sortent jamais de votre tenant",
      desc: "La sécurité par ligne (RLS) de Supabase isole les données de chaque utilisateur. Vos documents ne servent que votre bot et n'entraînent jamais aucun modèle. Les appels d'API sont en HTTPS + Bearer Token de bout en bout.",
      chips: ["🔒 Sécurité par ligne", "🔐 Auth par clé API", "🛡️ Isolation des données", "🇪🇺 Conforme RGPD"],
      stats: [
        { k: "99,9%", l: "Disponibilité" },
        { k: "<200 ms", l: "Réponse IA moy." },
        { k: "AES-256", l: "Chiffrement" },
        { k: "SOC2", l: "Conformité" },
      ],
    },
  },
  how: {
    badge: "🚀 3 étapes simples",
    title1: "De l'inscription en ligne,",
    title2: "en seulement 5 minutes",
    steps: [
      { title: "Créer votre bot", text: "Choisissez un nom, une couleur de thème et un message d'accueil. Fait en 30 secondes." },
      { title: "Alimentez-le avec vos docs", text: "Déposez des PDFs, collez des URLs, ou rédigez directement quelques entrées de FAQ." },
      { title: "Intégrez-le sur votre site", text: "Copiez une ligne de script dans votre HTML. Votre service client IA est en ligne." },
    ],
  },
  pricing: {
    badge: "⭐ Tarifs transparents",
    title1: "Choisissez l'offre adaptée",
    title2: "à votre taille",
    sub: "L'offre gratuite est à vie. Aucun renouvellement automatique lors d'un passage à une offre supérieure.",
    plans: {
      free: { name: "GRATUIT", price: "0", perMonth: "/mois", billing: "Mensuel · Annulable à tout moment", features: ["1 bot", "100 messages IA / mois", "5 docs de connaissance", "Widget à la marque", "Support communauté"], cta: "Commencer" },
      starter: { name: "STARTER", badge: "🔥 Le plus populaire", price: "49", perMonth: "/mois", billing: "Mensuel · Annulable à tout moment", features: ["2 bots", "3 000 messages IA / mois", "50 docs de connaissance", "Retirer la marque", "Analytique de base", "Support e-mail"], cta: "Passer à" },
      growth: { name: "GROWTH", price: "129", perMonth: "/mois", billing: "Mensuel · Annulable à tout moment", features: ["5 bots", "10 000 messages IA / mois", "200 docs de connaissance", "Tableau de bord analytique", "Multilingue", "Support prioritaire"], cta: "Passer à" },
      agency: { name: "AGENCE", price: "299", perMonth: "/mois", billing: "Mensuel · Annulable à tout moment", features: ["Bots illimités", "50 000 messages IA / mois", "Documents illimités", "Widget en marque blanche", "Accès API", "Account manager dédié"], cta: "Passer à" },
    },
  },
  testimonials: {
    badge: "⭐ Avis",
    title: "Les patrons et ingénieurs adorent",
    rating: "Moyenne 4,9 / 5",
    items: [
      { name: "Marie Dupont", role: "Fondatrice · Maison & Cie", text: "Nous avions deux employés à temps partiel au support. Maintenant, un seul bot ChatAI Pro gère 80 % des questions courantes.", initial: "M" },
      { name: "Jonas Weber", role: "Responsable tech · Helio SaaS", text: "De l'inscription à l'intégration sur le site marketing en 15 minutes. L'upload de docs et l'incorporation de code sont vraiment fluides.", initial: "J" },
      { name: "Alessandro Rossi", role: "Propriétaire · Piazza Bistro", text: "Nos clients posent des questions en italien, anglais, allemand. Le bot répond dans la même langue, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "D'autres questions ?",
    sub: "Voici les plus fréquentes.",
    items: [
      { q: "Faut-il savoir coder ?", a: "Pas du tout. Inscription → création d'un bot → upload de docs → copie du script. Toute personne non technique y arrive en 5 minutes." },
      { q: "Quelles langues sont prises en charge ?", a: "Anglais, allemand, français, espagnol, italien, néerlandais, chinois, japonais et 40+ autres. Le bot détecte la langue du visiteur et y répond automatiquement." },
      { q: "Mes données sont-elles sûres ?", a: "Tout vit dans votre tenant Supabase avec sécurité par ligne (RLS). Chaque utilisateur ne voit que ses propres bots et conversations." },
      { q: "Puis-je essayer gratuitement ?", a: "Oui. L'offre gratuite inclut 1 bot, 5 documents et 100 messages IA par mois — sans carte bancaire." },
      { q: "Puis-je retirer votre branding ?", a: "Oui. À partir du Starter, vous pouvez retirer le branding ChatAI Pro pour n'afficher que votre nom et votre logo." },
    ],
    contact: "Pas de réponse ? Écrivez à support@chatai-pro.com — nous revenons vers vous sous 24 h.",
  },
  finalCta: {
    title: "Mettez un service client IA sur votre site dès aujourd'hui",
    sub: "Gratuit pour commencer, terminé en 5 minutes. Sans carte bancaire, sans engagement.",
    primary: "Créer un compte gratuit",
    secondary: "Déjà inscrit · Connexion",
    trust: ["Offre gratuite à vie", "Sans carte bancaire", "En ligne en 5 min"],
  },
  footer: { rights: "ChatAI Pro — Tous droits réservés", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation" },
  langSwitcher: { label: "Langue" },
};

const it: Dict = {
  nav: { features: "Funzionalità", how: "Come funziona", pricing: "Prezzi", faq: "FAQ", signIn: "Accedi", getStarted: "Inizia gratis" },
  hero: {
    badge: "🇪🇺 Per le PMI europee · Disponibile nel mondo",
    titleLine1: "Addestra un",
    titleLine2: "servizio clienti IA sempre attivo",
    subtitle:
      "Carica PDF, punta al sito della tua azienda o scrivi qualche FAQ — ChatAI Pro rilascia un chatbot con il tuo marchio che risponde ai visitatori 24/7, tagliando l'80 % del supporto manuale.",
    ctaPrimary: "Inizia gratis · Senza carta di credito",
    ctaSecondary: "Vedi la demo",
    stats: [
      { n: "5 min", label: "Dalla registrazione al live" },
      { n: "80%", label: "FAQ gestite in automatico" },
      { n: "40+", label: "Lingue" },
      { n: "24/7", label: "Sempre attivo" },
    ],
    chat: {
      brandTitle: "Ciao · Bonjour", brandSub: "Il tuo agente IA dedicato",
      status: "Sta rispondendo ai tuoi visitatori", avgResp: "Risposta media · 1,2 s",
      weekly: "Gestite questa settimana · 247 conversazioni",
      botHello: "Ciao 👋 Sono l'IA della tua azienda. Chiedimi quello che vuoi su prezzi, ordini o spedizioni!",
      userMsg: "Quanto è veloce la vostra spedizione express?",
      typing: "Spedizione express · Consegna in", typing2: "24 ore", typing3: "nelle aree urbane",
      source: "Fonte: FAQ #3 · Informativa_spedizioni.pdf", refDocs: "Doc. citati · 2",
    },
  },
  logos: { title: "La fiducia di centinaia di PMI", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Funzionalità chiave",
    title1: "Tutto ciò che serve,",
    title2: "già pronto all'uso",
    sub: "ChatAI Pro è il modo più veloce e semplice per mettere un servizio clienti IA su qualsiasi sito.",
    items: [
      { title: "Bot IA personalizzato", desc: "Un agente dedicato con il tuo nome, colori e messaggio di benvenuto — i clienti hanno l'impressione di parlare con te.", tag: "Personalizzato" },
      { title: "Integrazione in una riga", desc: "Copia un tag script nel tuo HTML. Nessuno sviluppo richiesto per andare online.", tag: "Zero config" },
      { title: "Conoscenza plug-and-play", desc: "Carica PDF, indicizza URL o scrivi FAQ — l'IA pesca automaticamente le risposte dai tuoi documenti.", tag: "Retrival intelligente" },
      { title: "Risposte in streaming", desc: "Indicatore di battitura, risposte fluide in streaming — nessun ritardo.", tag: "<200 ms" },
      { title: "Multilingua automatico", desc: "I visitatori chiedono in una lingua, il bot risponde nella stessa — nessuna configurazione.", tag: "40+ lingue" },
      { title: "Analitiche in tempo reale", desc: "Volume di conversazioni, domande frequenti, tasso di risposta IA — l'operatività a colpo d'occhio.", tag: "Data-driven" },
    ],
    security: {
      badge: "🛡️ Sicurezza enterprise",
      title: "I tuoi dati non escono mai dal tuo tenant",
      desc: "La Row-Level Security di Supabase isola i dati di ogni utente. I tuoi documenti servono solo il tuo bot e non allenano alcun modello. Le chiamate API sono HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-Level-Security", "🔐 Auth con API Key", "🛡️ Isolamento dati", "🇪🇺 GDPR-ready"],
      stats: [
        { k: "99,9%", l: "Disponibilità" },
        { k: "<200 ms", l: "Risposta IA media" },
        { k: "AES-256", l: "Crittografia" },
        { k: "SOC2", l: "Conformità" },
      ],
    },
  },
  how: {
    badge: "🚀 In 3 semplici passi",
    title1: "Dalla registrazione al live,",
    title2: "in soli 5 minuti",
    steps: [
      { title: "Crea il tuo bot", text: "Scegli nome, colore tema e messaggio di benvenuto. Fatto in 30 secondi." },
      { title: "Carica i tuoi documenti", text: "Trascina PDF, incolla URL, o scrivi direttamente qualche voce FAQ." },
      { title: "Incorpora sul tuo sito", text: "Copia una riga di script nel tuo HTML. Il tuo servizio clienti IA è online." },
    ],
  },
  pricing: {
    badge: "⭐ Prezzi trasparenti",
    title1: "Scegli il piano adatto",
    title2: "alla tua azienda",
    sub: "Il piano free è per sempre. Aggiornare non attiva mai rinnovi automatici.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/mese", billing: "Mensile · Cancellabile in qualsiasi momento", features: ["1 bot", "100 messaggi IA / mese", "5 doc conoscenza", "Widget marchiato", "Supporto community"], cta: "Inizia" },
      starter: { name: "STARTER", badge: "🔥 Più popolare", price: "49", perMonth: "/mese", billing: "Mensile · Cancellabile in qualsiasi momento", features: ["2 bot", "3.000 messaggi IA / mese", "50 doc conoscenza", "Rimuovi branding", "Analitiche base", "Supporto e-mail"], cta: "Aggiorna" },
      growth: { name: "GROWTH", price: "129", perMonth: "/mese", billing: "Mensile · Cancellabile in qualsiasi momento", features: ["5 bot", "10.000 messaggi IA / mese", "200 doc conoscenza", "Dashboard analitico completo", "Multilingua", "Supporto prioritario"], cta: "Aggiorna" },
      agency: { name: "AGENCY", price: "299", perMonth: "/mese", billing: "Mensile · Cancellabile in qualsiasi momento", features: ["Bots illimitati", "50.000 messaggi IA / mese", "Documenti illimitati", "Widget white-label", "Accesso API", "Account manager dedicato"], cta: "Aggiorna" },
    },
  },
  testimonials: {
    badge: "⭐ Recensioni",
    title: "Imprenditori e ingegneri lo adorano",
    rating: "Media 4,9 / 5",
    items: [
      { name: "Marie Dupont", role: "Fondatrice · Maison & Cie", text: "Prima avevamo due persone part-time al supporto. Ora un solo bot ChatAI Pro gestisce l'80 % delle domande comuni.", initial: "M" },
      { name: "Jonas Weber", role: "Responsabile tech · Helio SaaS", text: "Dalla registrazione all'incorporazione sul sito marketing in 15 minuti. Caricamento doc e integrazione codice sono davvero fluidi.", initial: "J" },
      { name: "Alessandro Rossi", role: "Titolare · Piazza Bistro", text: "I nostri clienti chiedono in italiano, inglese, tedesco. Il bot risponde nella stessa lingua, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Altre domande ?",
    sub: "Ecco le più comuni.",
    items: [
      { q: "Devo saper programmare ?", a: "Nient'affatto. Registrazione → crea bot → carica doc → copia lo script. Qualsiasi persona non tecnica ce la fa in 5 minuti." },
      { q: "Quali lingue sono supportate ?", a: "Inglese, tedesco, francese, spagnolo, italiano, olandese, cinese, giapponese e altre 40+. Il bot riconosce la lingua del visitatore e risponde di conseguenza." },
      { q: "I miei dati sono al sicuro ?", a: "Tutto risiede nel tuo tenant Supabase con Row-Level Security. Ogni utente vede solo i propri bot e conversazioni." },
      { q: "Posso provarlo gratis prima ?", a: "Sì. Il piano free include 1 bot, 5 documenti e 100 messaggi IA al mese — senza carta di credito." },
      { q: "Posso togliere il vostro branding ?", a: "Sì. Dal piano Starter in su puoi rimuovere il branding ChatAI Pro e mostrare solo il tuo nome e logo." },
    ],
    contact: "Nessuna risposta? Scrivi a support@chatai-pro.com — rispondiamo entro 24 ore.",
  },
  finalCta: {
    title: "Metti un servizio clienti IA sul tuo sito oggi stesso",
    sub: "Gratuito per iniziare, finito in 5 minuti. Senza carta di credito, senza vincoli.",
    primary: "Crea un account gratuito",
    secondary: "Già registrato · Accedi",
    trust: ["Piano free per sempre", "Senza carta di credito", "Live in 5 min"],
  },
  footer: { rights: "ChatAI Pro — Tutti i diritti riservati", privacy: "Informativa privacy", terms: "Condizioni del servizio" },
  langSwitcher: { label: "Lingua" },
};

const es: Dict = {
  nav: { features: "Funciones", how: "Cómo funciona", pricing: "Precios", faq: "FAQ", signIn: "Iniciar sesión", getStarted: "Empezar gratis" },
  hero: {
    badge: "🇪🇺 Para pymes europeas · Disponible en todo el mundo",
    titleLine1: "Entrena un servicio",
    titleLine2: "al cliente IA siempre disponible",
    subtitle:
      "Sube PDFs, enlaza la web de tu empresa o redacta unas FAQs — ChatAI Pro despliega un chatbot con tu marca que responde a los visitantes 24/7 y reduce el soporte manual en un 80 %.",
    ctaPrimary: "Empieza gratis · Sin tarjeta de crédito",
    ctaSecondary: "Ver demo",
    stats: [
      { n: "5 min", label: "Del registro al live" },
      { n: "80%", label: "FAQs atendidas automáticamente" },
      { n: "40+", label: "Idiomas" },
      { n: "24/7", label: "Siempre disponible" },
    ],
    chat: {
      brandTitle: "Hola · Bonjour", brandSub: "Tu agente IA dedicado",
      status: "Respondiendo a tus visitantes", avgResp: "Respuesta media · 1,2 s",
      weekly: "Atendidas esta semana · 247 conversaciones",
      botHello: "¡Hola 👋 Soy la IA de tu empresa. Pregúntame sobre precios, pedidos o envíos!",
      userMsg: "¿Cuánto tarda vuestro envío express?",
      typing: "Envío express · Entrega en", typing2: "24 horas", typing3: "en zonas urbanas",
      source: "Fuente: FAQ #3 · Política_de_envíos.pdf", refDocs: "Docs citados · 2",
    },
  },
  logos: { title: "La confianza de cientos de pymes", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Funciones clave",
    title1: "Todo lo que necesitas,",
    title2: "ya está listo",
    sub: "ChatAI Pro es la forma más rápida y sencilla de poner un servicio al cliente IA en cualquier sitio.",
    items: [
      { title: "Bot IA personalizado", desc: "Un agente dedicado con tu nombre, colores y mensaje de bienvenida — los clientes sienten que hablan contigo.", tag: "Con tu marca" },
      { title: "Integración en una línea", desc: "Copia una etiqueta script en tu HTML. Sin desarrollo para pasar a producción.", tag: "Cero config" },
      { title: "Base de conocimientos plug-and-play", desc: "Sube PDFs, indexa URLs o redacta FAQs — la IA extrae automáticamente las respuestas de tus documentos.", tag: "Recuperación inteligente" },
      { title: "Respuestas en streaming", desc: "Indicador de escritura, respuestas fluídas en streaming — sin lag.", tag: "<200 ms" },
      { title: "Multilingüe automático", desc: "Los visitantes preguntan en un idioma, el bot responde en el mismo — sin configuración.", tag: "40+ idiomas" },
      { title: "Analítica en vivo", desc: "Volumen de conversaciones, preguntas frecuentes, tasa de respuesta IA — la operativa de un vistazo.", tag: "Data-driven" },
    ],
    security: {
      badge: "🛡️ Seguridad empresarial",
      title: "Tus datos nunca salen de tu tenant",
      desc: "La seguridad por fila (RLS) de Supabase aísla los datos de cada usuario. Tus documentos solo sirven a tu bot y no entrenan ningún modelo. Las llamadas API son HTTPS + Bearer Token de extremo a extremo.",
      chips: ["🔒 Seguridad por fila", "🔐 Auth con API Key", "🛡️ Aislamiento de datos", "🇪🇺 RGPD listo"],
      stats: [
        { k: "99,9%", l: "Disponibilidad" },
        { k: "<200 ms", l: "Respuesta IA media" },
        { k: "AES-256", l: "Cifrado" },
        { k: "SOC2", l: "Conformidad" },
      ],
    },
  },
  how: {
    badge: "🚀 En 3 sencillos pasos",
    title1: "Del registro al live,",
    title2: "en solo 5 minutos",
    steps: [
      { title: "Crea tu bot", text: "Elige un nombre, color de tema y mensaje de bienvenida. Hecho en 30 segundos." },
      { title: "Aliméntalo con tus docs", text: "Arrastra PDFs, pega URLs o redacta directamente unas entradas FAQ." },
      { title: "Incrústalos en tu web", text: "Copia una línea de script en tu HTML. Tu servicio al cliente IA está en línea." },
    ],
  },
  pricing: {
    badge: "⭐ Precios transparentes",
    title1: "Elige el plan que mejor",
    title2: "se adapta a tu negocio",
    sub: "El plan gratuito es para siempre. Actualizar nunca activa renovaciones automáticas.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/mes", billing: "Mensual · Cancela cuando quieras", features: ["1 bot", "100 mensajes IA / mes", "5 docs conocimiento", "Widget con marca", "Soporte comunidad"], cta: "Empezar" },
      starter: { name: "STARTER", badge: "🔥 Más popular", price: "49", perMonth: "/mes", billing: "Mensual · Cancela cuando quieras", features: ["2 bots", "3.000 mensajes IA / mes", "50 docs conocimiento", "Quitar branding", "Analítica básica", "Soporte e-mail"], cta: "Actualizar" },
      growth: { name: "GROWTH", price: "129", perMonth: "/mes", billing: "Mensual · Cancela cuando quieras", features: ["5 bots", "10.000 mensajes IA / mes", "200 docs conocimiento", "Dashboard analítico completo", "Multilingüe", "Soporte prioritario"], cta: "Actualizar" },
      agency: { name: "AGENCY", price: "299", perMonth: "/mes", billing: "Mensual · Cancela cuando quieras", features: ["Bots ilimitados", "50.000 mensajes IA / mes", "Documentos ilimitados", "Widget white-label", "Acceso API", "Account manager dedicado"], cta: "Actualizar" },
    },
  },
  testimonials: {
    badge: "⭐ Reseñas",
    title: "A dueños y a ingenieros les encanta",
    rating: "Promedio 4,9 / 5",
    items: [
      { name: "Marie Dupont", role: "Fundadora · Maison & Cie", text: "Antes teníamos dos personas a tiempo parcial en soporte. Ahora un solo bot ChatAI Pro gestiona el 80 % de las preguntas comunes.", initial: "M" },
      { name: "Jonas Weber", role: "Responsable tech · Helio SaaS", text: "Del registro a la integración en el sitio de marketing en 15 minutos. La subida de docs y la incorporación del código son super fluidas.", initial: "J" },
      { name: "Alessandro Rossi", role: "Dueño · Piazza Bistro", text: "Nuestros clientes preguntan en italiano, inglés, alemán. El bot responde en el mismo idioma, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "¿Más preguntas?",
    sub: "Aquí tienes las más frecuentes.",
    items: [
      { q: "¿Hay que saber programar?", a: "Para nada. Registro → crea bot → sube docs → copia el script. Cualquier persona no técnica lo consigue en 5 minutos." },
      { q: "¿Qué idiomas se admiten?", a: "Inglés, alemán, francés, español, italiano, neerlandés, chino, japonés y 40+ más. El bot detecta el idioma del visitante y responde en el mismo." },
      { q: "¿Mis datos están seguros?", a: "Todo vive en tu tenant Supabase con Row-Level Security. Cada usuario ve solo sus propios bots y conversaciones." },
      { q: "¿Puedo probarlo gratis antes?", a: "Sí. El plan gratuito incluye 1 bot, 5 documentos y 100 mensajes IA al mes — sin tarjeta de crédito." },
      { q: "¿Puedo quitar vuestro branding?", a: "Sí. A partir del plan Starter puedes quitar el branding ChatAI Pro para que solo vean tu nombre y logo." },
    ],
    contact: "¿Sin respuesta? Escribe a support@chatai-pro.com — te contestamos en 24 horas.",
  },
  finalCta: {
    title: "Pon un servicio al cliente IA en tu web hoy mismo",
    sub: "Gratis para empezar, terminado en 5 minutos. Sin tarjeta, sin permanencia.",
    primary: "Crear cuenta gratuita",
    secondary: "Ya tienes cuenta · Inicia sesión",
    trust: ["Plan free para siempre", "Sin tarjeta de crédito", "En línea en 5 min"],
  },
  footer: { rights: "ChatAI Pro — Todos los derechos reservados", privacy: "Política de privacidad", terms: "Términos del servicio" },
  langSwitcher: { label: "Idioma" },
};


const ja: Dict = {
  nav: { features: "機能", how: "使い方", pricing: "料金プラン", faq: "よくある質問", signIn: "サインイン", getStarted: "今すぐ始める" },
  hero: {
    badge: "🇪🇺 ヨーロッパの中小企業向け · 現在世界中で利用可能",
    titleLine1: "いつでも対応可能な",
    titleLine2: "AIカスタマーサービスを構築",
    subtitle: "PDFをアップロードするか、自社サイトを指定するか、FAQをいくつか記述するだけ — ChatAI Proがブランド化されたチャットボットを配置し、24時間365日訪問者の質問に対応し、手動サポートを80%削減します。",
    ctaPrimary: "無料で開始 · クレジットカード不要",
    ctaSecondary: "デモを見る",
    stats: [
      { n: "5分", label: "サインアップから公開まで" },
      { n: "80%", label: "FAQの自動対応率" },
      { n: "40+", label: "対応言語" },
      { n: "24/7", label: "常時稼働" },
    ],
    chat: {
      brandTitle: "こんにちは · Bonjour", brandSub: "あなた専用のAIエージェント",
      status: "現在、訪問者に返信中", avgResp: "平均応答時間 · 1.2秒",
      weekly: "今週の対応件数 · 247件の会話",
      botHello: "こんにちは 👋 私は貴社のAIです。料金、注文、配送についてなんでも聞いてください！",
      userMsg: "速達配送はどれくらい早いですか？",
      typing: "速達配送 · お届けまで", typing2: "24時間", typing3: "都市部にて",
      source: "出典: FAQ #3 · 配送ポリシー.pdf", refDocs: "参照ドキュメント · 2件",
    },
  },
  logos: { title: "何百もの中小企業に信頼されています", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ 主要機能",
    title1: "必要なすべてを,", title2: "すぐに使える状態で",
    sub: "ChatAI Proは、どんなウェブサイトにも最速かつ最も簡単にAIカスタマーサービスを導入する方法です。",
    items: [
      { title: "カスタムAIボット", desc: "貴社の名前、配色、ウェルカムメッセージを備えた専用エージェント — お客様は貴社と話しているように感じます。", tag: "ブランド化" },
      { title: "1行で埋め込み", desc: "スクリプトタグをHTMLにコピーするだけ。公開までに開発作業は必要ありません。", tag: "設定ゼロ" },
      { title: "簡単接続可能な知識ベース", desc: "PDFをアップロード、URLをクロール、またはFAQを記述 — AIが自動的にドキュメントから回答を抽出します。", tag: "スマート検索" },
      { title: "ストリーミング返信", desc: "思考中のタイピングインジケーター、スムーズなストリーミング応答 — 遅延なし。", tag: "<200ms" },
      { title: "自動多言語対応", desc: "訪問者がどんな言語で質問しても、ボットは同じ言語で返信 — 設定不要。", tag: "40+言語" },
      { title: "ライブ分析", desc: "会話量、よくある質問、AI返信率 — 運用状況を一目で確認。", tag: "データドリブン" },
    ],
    security: {
      badge: "🛡️ エンタープライズレベルのセキュリティ", title: "データはお客様のテナント外に出ません",
      desc: "Supabaseの行レベルセキュリティ（RLS）により、各ユーザーのデータは完全に分離されます。お客様のドキュメントはお客様のボットにのみ使用され、いかなるモデルの学習にも使用されません。API呼び出しはHTTPS + Bearer Tokenによるエンドツーエンドの通信です。",
      chips: ["🔒 行レベルセキュリティ", "🔐 APIキー認証", "🛡️ データ分離", "🇪🇺 GDPR対応"],
      stats: [{ k: "99.9%", l: "サービス稼働率" }, { k: "<200ms", l: "平均AI応答時間" }, { k: "AES-256", l: "暗号化" }, { k: "SOC2", l: "コンプライアンス" }],
    },
  },
  how: {
    badge: "🚀 3つの簡単なステップ", title1: "サインアップから公開まで、", title2: "たった5分で",
    steps: [
      { title: "ボットを作成", text: "名前、テーマカラー、ウェルカムメッセージを選ぶだけ。30秒で完了します。" },
      { title: "ドキュメントを登録", text: "PDFをドロップするか、URLを貼り付けるか、FAQを直接いくつか記述するだけです。" },
      { title: "サイトに埋め込む", text: "1行のスクリプトをHTMLにコピーするだけ。AIカスタマーサービスがすぐに公開されます。" },
    ],
  },
  pricing: {
    badge: "⭐ 明確な料金プラン", title1: "ビジネスの規模に合った", title2: "プランをお選びください",
    sub: "無料プランは永遠に無料です。アップグレードは自動更新されません。",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/月", billing: "月額 · いつでも解約可能", features: ["1つのボット", "月100回のAIメッセージ", "5つのナレッジドキュメント", "ブランド化ウィジェット", "コミュニティサポート"], cta: "無料で開始" },
      starter: { name: "STARTER", badge: "🔥 最も人気", price: "49", perMonth: "/月", billing: "月額 · いつでも解約可能", features: ["2つのボット", "月3,000回のAIメッセージ", "50のナレッジドキュメント", "ブランド除去", "基本分析", "メールサポート"], cta: "アップグレード" },
      growth: { name: "GROWTH", price: "129", perMonth: "/月", billing: "月額 · いつでも解約可能", features: ["5つのボット", "月10,000回のAIメッセージ", "200のナレッジドキュメント", "完全な分析ダッシュボード", "多言語サポート", "優先サポート"], cta: "アップグレード" },
      agency: { name: "AGENCY", price: "299", perMonth: "/月", billing: "月額 · いつでも解約可能", features: ["無制限のボット", "月50,000回のAIメッセージ", "無制限のドキュメント", "ホワイトラベルウィジェット", "APIアクセス", "専任アカウントマネージャー"], cta: "アップグレード" },
    },
  },
  testimonials: {
    badge: "⭐ レビュー", title: "オーナーとエンジニアに愛されています", rating: "平均 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "創業者 · Maison & Cie", text: "以前はパートタイムのサポートスタッフが2人いました。今では1つのChatAI Proボットが一般的な質問の80%に対応しています。", initial: "M" },
      { name: "Jonas Weber", role: "テックリード · Helio SaaS", text: "サインアップからマーケティングサイトへの埋め込みまで15分でした。ドキュメントのアップロードとコードの埋め込みは非常にスムーズです。", initial: "J" },
      { name: "Alessandro Rossi", role: "オーナー · Piazza Bistro", text: "お客様はイタリア語、英語、ドイツ語で質問します。ボットは同じ言語で24時間365日返信してくれます。", initial: "A" },
    ],
  },
  faq: {
    title: "まだ質問がありますか？", sub: "最もよくある質問をまとめました。",
    items: [
      { q: "コーディングの知識は必要ですか？", a: "まったく必要ありません。サインアップ → ボット作成 → ドキュメントアップロード → スクリプトをコピー。技術的な知識がない方でも5分で設定できます。" },
      { q: "対応言語は何ですか？", a: "英語、ドイツ語、フランス語、スペイン語、イタリア語、オランダ語、中国語、日本語など40以上の言語に対応しています。ボットが訪問者の言語を自動検出し、同じ言語で返信します。" },
      { q: "データは安全ですか？", a: "すべてのデータは行レベルセキュリティ（RLS）を備えたお客様のSupabaseテナント内に保存されます。各ユーザーは自身のボットと会話のみを閲覧できます。" },
      { q: "最初に無料で試せますか？", a: "はい。無料プランには1つのボット、5つのドキュメント、月100回のAIメッセージが含まれています — クレジットカード不要です。" },
      { q: "ブランド表示を削除できますか？", a: "はい。Starterプラン以上でChatAI Proのブランド表示を削除し、お客様の名前とロゴのみを表示できます。" },
    ],
    contact: "回答が見つかりませんか？support@chatai-pro.com までメールをお送りください — 24時間以内に返信いたします。",
  },
  finalCta: {
    title: "今日からウェブサイトにAIカスタマーサービスを導入しましょう",
    sub: "無料で開始、5分で完了。クレジットカード不要、契約縛りなし。",
    primary: "無料アカウントを作成", secondary: "既存ユーザー · サインイン",
    trust: ["無料プラン永久無料", "クレジットカード不要", "5分でデプロイ"],
  },
  footer: { rights: "ChatAI Pro — All rights reserved", privacy: "プライバシーポリシー", terms: "利用規約" },
  langSwitcher: { label: "言語" },
};

const ko: Dict = {
  nav: { features: "기능", how: "사용 방법", pricing: "요금제", faq: "자주 묻는 질문", signIn: "로그인", getStarted: "지금 시작하기" },
  hero: {
    badge: "🇪🇺 유럽 중소기업을 위해 제작 · 현재 전 세계적으로 이용 가능",
    titleLine1: "언제나 대기하는",
    titleLine2: "AI 고객 서비스를 구축하세요",
    subtitle: "PDF를 업로드하거나, 회사 웹사이트를 지정하거나, FAQ를 몇 가지 작성하기만 하면 — ChatAI Pro가 브랜드화된 챗봇을 배포하여 24시간 365일 방문자의 질문에 답변하고, 수동 지원을 80% 줄여줍니다.",
    ctaPrimary: "무료로 시작하기 · 신용카드 불필요",
    ctaSecondary: "데모 보기",
    stats: [
      { n: "5분", label: "가입부터 서비스 개시까지" },
      { n: "80%", label: "FAQ 자동 처리율" },
      { n: "40+", label: "지원 언어" },
      { n: "24/7", label: "상시 운영" },
    ],
    chat: {
      brandTitle: "안녕하세요 · Bonjour", brandSub: "전용 AI 에이전트입니다",
      status: "현재 방문자에게 답변 중", avgResp: "평균 응답 시간 · 1.2초",
      weekly: "이번 주 처리 건수 · 247개의 대화",
      botHello: "안녕하세요 👋 저는 회사 AI입니다. 요금, 주문, 배송에 관해 무엇이든 물어보세요!",
      userMsg: "익스프레스 배송은 얼마나 빠른가요?",
      typing: "익스프레스 배송 · 배달까지", typing2: "24시간", typing3: "도심 지역 기준",
      source: "출처: FAQ #3 · 배송 정책.pdf", refDocs: "참고 문서 · 2개",
    },
  },
  logos: { title: "수백 중소기업이 신뢰합니다", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ 핵심 기능",
    title1: "필요한 모든 것을,", title2: "즉시 사용 가능하게 준비",
    sub: "ChatAI Pro는 어떤 웹사이트에도 가장 빠르고 간단하게 AI 고객 서비스를 도입하는 방법입니다.",
    items: [
      { title: "커스텀 AI 봇", desc: "귀사의 이름, 색상, 환영 메시지로 구성된 전용 에이전트 — 고객은 마치 귀사와 대화하는 듯한 느낌을 받습니다.", tag: "브랜드화" },
      { title: "한 줄로 임베드", desc: "스크립트 태그를 HTML에 복사하기만 하면 됩니다. 개발 작업 없이 바로 서비스를 개시할 수 있습니다.", tag: "설정 불필요" },
      { title: "즉시 연결 가능한 지식 베이스", desc: "PDF 업로드, URL 크롤링, 또는 FAQ 작성 — AI가 자동으로 문서에서 답변을 찾아냅니다.", tag: "스마트 검색" },
      { title: "스트리밍 답변", desc: "생각 중 표시기와 부드러운 스트리밍 응답 — 지연 없음.", tag: "<200ms" },
      { title: "자동 다국어 지원", desc: "방문자가 어떤 언어로 질문해도 봇이 같은 언어로 답변 — 설정 불필요.", tag: "40+ 언어" },
      { title: "실시간 분석", desc: "대화량, 인기 질문, AI 답변률 — 운영 현황을 한눈에.", tag: "데이터 기반" },
    ],
    security: {
      badge: "🛡️ 엔터프라이즈급 보안", title: "데이터는 절대 테넌트 외부로 유출되지 않습니다",
      desc: "Supabase RLS(Row-Level Security)가 각 사용자의 데이터를 완벽하게 격리합니다. 귀사의 문서는 귀사의 봇에만 사용되며, 어떤 모델 학습에도 사용되지 않습니다. API 호출은 HTTPS + Bearer Token으로 종단 간 암호화됩니다.",
      chips: ["🔒 행 단위 보안(RLS)", "🔐 API Key 인증", "🛡️ 데이터 격리", "🇪🇺 GDPR 준비"],
      stats: [{ k: "99.9%", l: "서비스 가동 시간" }, { k: "<200ms", l: "평균 AI 응답 시간" }, { k: "AES-256", l: "암호화" }, { k: "SOC2", l: "컴플라이언스" }],
    },
  },
  how: {
    badge: "🚀 3가지 간단한 단계", title1: "가입부터 서비스 개시까지,", title2: "단 5분 만에",
    steps: [
      { title: "봇을 생성하세요", text: "이름, 테마 색상, 환영 메시지를 선택하세요. 30초 안에 완료됩니다." },
      { title: "문서를 등록하세요", text: "PDF를 드롭하거나, URL을 붙여넣거나, FAQ를 직접 몇 가지 작성하기만 하면 됩니다." },
      { title: "사이트에 임베드하세요", text: "한 줄의 스크립트를 HTML에 복사하세요. AI 고객 서비스가 바로 시작됩니다." },
    ],
  },
  pricing: {
    badge: "⭐ 투명한 요금제", title1: "비즈니스 규모에 맞는", title2: "플랜을 선택하세요",
    sub: "무료 플랜은 평생 무료입니다. 업그레이드는 자동 갱신되지 않습니다.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/월", billing: "월별 결제 · 언제든 취소 가능", features: ["1개의 봇", "월 100회 AI 메시지", "5개의 지식 문서", "브랜드화 위젯", "커뮤니티 지원"], cta: "무료로 시작" },
      starter: { name: "STARTER", badge: "🔥 가장 인기", price: "49", perMonth: "/월", billing: "월별 결제 · 언제든 취소 가능", features: ["2개의 봇", "월 3,000회 AI 메시지", "50개의 지식 문서", "브랜드 제거", "기본 분석", "이메일 지원"], cta: "업그레이드" },
      growth: { name: "GROWTH", price: "129", perMonth: "/월", billing: "월별 결제 · 언제든 취소 가능", features: ["5개의 봇", "월 10,000회 AI 메시지", "200개의 지식 문서", "전체 분석 대시보드", "다국어 지원", "우선 지원"], cta: "업그레이드" },
      agency: { name: "AGENCY", price: "299", perMonth: "/월", billing: "월별 결제 · 언제든 취소 가능", features: ["무제한 봇", "월 50,000회 AI 메시지", "무제한 문서", "화이트라벨 위젯", "API 접근", "전담 계정 매니저"], cta: "업그레이드" },
    },
  },
  testimonials: {
    badge: "⭐ 리뷰", title: "사장님과 엔지니어가 사랑합니다", rating: "평균 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "창업자 · Maison & Cie", text: "예전에는 파트타임 지원 직원이 2명 있었습니다. 이제 ChatAI Pro 봇 하나가 일반적인 질문의 80%를 처리합니다.", initial: "M" },
      { name: "Jonas Weber", role: "테크 리드 · Helio SaaS", text: "가입부터 마케팅 사이트 임베드까지 15분밖에 걸리지 않았습니다. 문서 업로드와 코드 임베드가 정말 매끄럽습니다.", initial: "J" },
      { name: "Alessandro Rossi", role: "사장 · Piazza Bistro", text: "고객들이 이탈리아어, 영어, 독일어로 질문합니다. 봇이 같은 언어로 24시간 365일 답변해 줍니다.", initial: "A" },
    ],
  },
  faq: {
    title: "아직 궁금한 점이 있나요?", sub: "가장 자주 묻는 질문을 모았습니다.",
    items: [
      { q: "코딩을 알아야 하나요?", a: "전혀 그렇지 않습니다. 가입 → 봇 생성 → 문서 업로드 → 스크립트 복사. 비기술자도 5분 만에 완료할 수 있습니다." },
      { q: "어떤 언어를 지원하나요?", a: "영어, 독일어, 프랑스어, 스페인어, 이탈리아어, 네덜란드어, 중국어, 일본어 등 40개 이상의 언어를 지원합니다. 봇이 방문자의 언어를 자동 감지하여 같은 언어로 답변합니다." },
      { q: "제 데이터는 안전한가요?", a: "모든 데이터는 행 단위 보안(RLS)이 적용된 귀사의 Supabase 테넌트에 저장됩니다. 각 사용자는 자신의 봇과 대화만 볼 수 있습니다." },
      { q: "먼저 무료로 사용해 볼 수 있나요?", a: "네. 무료 플랜에는 봇 1개, 문서 5개, 월 100회 AI 메시지가 포함됩니다 — 신용카드 불필요입니다." },
      { q: "브랜드 표시를 제거할 수 있나요?", a: "네. Starter 플랜 이상에서 ChatAI Pro 브랜드 표시를 제거하고 고객에게는 귀사의 이름과 로고만 보이게 할 수 있습니다." },
    ],
    contact: "답변을 찾지 못하셨나요? support@chatai-pro.com 으로 이메일을 보내주세요 — 24시간 이내에 답변드립니다.",
  },
  finalCta: {
    title: "오늘 바로 웹사이트에 AI 고객 서비스를 도입하세요",
    sub: "무료로 시작, 5분 만에 완료. 신용카드 불필요, 약정 없음.",
    primary: "무료 계정 만들기", secondary: "기존 사용자 · 로그인",
    trust: ["평생 무료 플랜", "신용카드 불필요", "5분 만에 배포"],
  },
  footer: { rights: "ChatAI Pro — All rights reserved", privacy: "개인정보 처리방침", terms: "서비스 약관" },
  langSwitcher: { label: "언어" },
};



const pt: Dict = {
  nav: { features: "Funcionalidades", how: "Como funciona", pricing: "Planos", faq: "Perguntas frequentes", signIn: "Entrar", getStarted: "Começar agora" },
  hero: {
    badge: "🇪🇺 Feito para PMEs europeias · Agora disponível globalmente",
    titleLine1: "Treine um atendimento ao cliente",
    titleLine2: "com IA sempre disponível",
    subtitle: "Envie PDFs, indique o site da sua empresa ou escreva algumas FAQs — ChatAI Pro implanta um chatbot com a sua marca que responde aos visitantes 24h por dia, 7 dias por semana, reduzindo o atendimento manual em 80%.",
    ctaPrimary: "Comece grátis · Sem cartão de crédito",
    ctaSecondary: "Ver demonstração",
    stats: [
      { n: "5 min", label: "Do cadastro ao ar" },
      { n: "80%", label: "FAQs respondidas automaticamente" },
      { n: "40+", label: "Idiomas" },
      { n: "24/7", label: "Sempre disponível" },
    ],
    chat: {
      brandTitle: "Olá · Bonjour", brandSub: "Seu agente de IA dedicado",
      status: "Respondendo a visitantes agora", avgResp: "Resposta média · 1,2 seg",
      weekly: "Atendidas esta semana · 247 conversas",
      botHello: "Olá 👋 Sou a IA da sua empresa. Pergunte-me qualquer coisa sobre preços, pedidos ou envios!",
      userMsg: "Quão rápido é o envio expresso?",
      typing: "Envio expresso · entregue em", typing2: "24 horas", typing3: "nas áreas metropolitanas",
      source: "Fonte: FAQ #3 · Política de envio.pdf", refDocs: "Docs de referência · 2",
    },
  },
  logos: { title: "Confiado por centenas de PMEs", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Principais funcionalidades",
    title1: "Tudo o que você precisa,", title2: "tudo pronto para usar",
    sub: "ChatAI Pro é a maneira mais rápida e simples de colocar atendimento ao cliente com IA em qualquer site.",
    items: [
      { title: "Bot de IA personalizado", desc: "Um agente dedicado com seu nome, cores e mensagem de boas-vindas — os clientes sentem que estão falando com você.", tag: "Com sua marca" },
      { title: "Incorporação em uma linha", desc: "Copie uma tag script no seu HTML. Sem trabalho de desenvolvimento para entrar no ar.", tag: "Sem configuração" },
      { title: "Base de conhecimento plug-and-play", desc: "Envie PDFs, rastreie URLs ou escreva FAQs — a IA extrai automaticamente as respostas dos seus documentos.", tag: "Busca inteligente" },
      { title: "Respostas em streaming", desc: "Indicador de digitação ao pensar, respostas em streaming suaves — sem atraso.", tag: "<200ms" },
      { title: "Multilíngue automático", desc: "Visitantes perguntam em qualquer idioma, o bot responde no mesmo — sem configuração.", tag: "Mais de 40 idiomas" },
      { title: "Análise ao vivo", desc: "Volume de conversas, perguntas principais, taxa de resposta da IA — operação em um relance.", tag: "Baseado em dados" },
    ],
    security: {
      badge: "🛡️ Segurança empresarial", title: "Seus dados nunca saem do seu tenant",
      desc: "A segurança em nível de linha (RLS) do Supabase isola os dados de cada usuário. Seus documentos servem apenas ao seu bot e nunca treinam nenhum modelo. As chamadas de API são HTTPS + Bearer Token de ponta a ponta.",
      chips: ["🔒 Segurança em nível de linha (RLS)", "🔐 Autenticação API Key", "🛡️ Isolamento de dados", "🇪🇺 Pronto para GDPR"],
      stats: [{ k: "99.9%", l: "Tempo de atividade" }, { k: "<200ms", l: "Resposta média da IA" }, { k: "AES-256", l: "Criptografia" }, { k: "SOC2", l: "Conformidade" }],
    },
  },
  how: {
    badge: "🚀 3 passos simples", title1: "Do cadastro ao ar,", title2: "em apenas 5 minutos",
    steps: [
      { title: "Crie seu bot", text: "Escolha um nome, uma cor de tema e uma mensagem de boas-vindas. Pronto em 30 segundos." },
      { title: "Alimente-o com seus documentos", text: "Solte PDFs, cole URLs ou simplesmente escreva algumas entradas de FAQ diretamente." },
      { title: "Incorpore no seu site", text: "Copie uma linha de script no seu HTML. Seu atendimento ao cliente com IA está no ar." },
    ],
  },
  pricing: {
    badge: "⭐ Preços transparentes", title1: "Escolha um plano que combina", title2: "com o tamanho do seu negócio",
    sub: "O plano gratuito é para sempre. A atualização nunca é renovada automaticamente.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["1 bot", "100 mensagens de IA / mês", "5 documentos de conhecimento", "Widget com sua marca", "Suporte da comunidade"], cta: "Começar grátis" },
      starter: { name: "STARTER", badge: "🔥 Mais popular", price: "49", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["2 bots", "3.000 mensagens de IA / mês", "50 documentos de conhecimento", "Remover marca", "Análise básica", "Suporte por e-mail"], cta: "Atualizar" },
      growth: { name: "GROWTH", price: "129", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["5 bots", "10.000 mensagens de IA / mês", "200 documentos de conhecimento", "Painel de análise completo", "Suporte multilíngue", "Suporte prioritário"], cta: "Atualizar" },
      agency: { name: "AGENCY", price: "299", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["Bots ilimitados", "50.000 mensagens de IA / mês", "Documentos ilimitados", "Widget white-label", "Acesso à API", "Gerente de conta dedicado"], cta: "Atualizar" },
    },
  },
  testimonials: {
    badge: "⭐ Avaliações", title: "Donos e engenheiros amam", rating: "Média 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Fundadora · Maison & Cie", text: "Tínhamos duas funcionárias de meio período no atendimento. Agora um bot do ChatAI Pro resolve 80% das perguntas comuns.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Do cadastro à incorporação no site de marketing levou 15 minutos. O envio de documentos e a incorporação do código são super fluidos.", initial: "J" },
      { name: "Alessandro Rossi", role: "Dono · Piazza Bistro", text: "Nossos clientes perguntam em italiano, inglês, alemão. O bot responde no mesmo idioma, 24h por dia.", initial: "A" },
    ],
  },
  faq: {
    title: "Ainda tem dúvidas?", sub: "Reunimos as mais frequentes.",
    items: [
      { q: "Preciso saber programar?", a: "De jeito nenhum. Cadastre-se → crie um bot → envie documentos → copie o script. Qualquer pessoa sem conhecimento técnico consegue fazer em 5 minutos." },
      { q: "Quais idiomas são suportados?", a: "Inglês, alemão, francês, espanhol, italiano, holandês, chinês, japonês e mais de 40 outros. O bot detecta automaticamente o idioma do visitante e responde no mesmo." },
      { q: "Meus dados estão seguros?", a: "Tudo fica no seu tenant do Supabase com segurança em nível de linha (RLS). Cada usuário só vê seus próprios bots e conversas." },
      { q: "Posso testar grátis antes?", a: "Sim. O plano gratuito inclui 1 bot, 5 documentos e 100 mensagens de IA por mês — sem cartão de crédito." },
      { q: "Posso remover a marca de vocês?", a: "Sim. O plano Starter ou superior suporta a remoção da marca ChatAI Pro para que os clientes vejam apenas seu nome e logotipo." },
    ],
    contact: "Não encontrou a resposta? Envie um e-mail para support@chatai-pro.com — respondemos em até 24 horas.",
  },
  finalCta: {
    title: "Coloque atendimento ao cliente com IA no seu site hoje",
    sub: "Comece grátis, pronto em 5 minutos. Sem cartão de crédito, sem fidelidade.",
    primary: "Criar conta gratuita", secondary: "Usuário existente · Entrar",
    trust: ["Plano gratuito para sempre", "Sem cartão de crédito", "Implementado em 5 min"],
  },
  footer: { rights: "ChatAI Pro — Todos os direitos reservados", privacy: "Política de privacidade", terms: "Termos de serviço" },
  langSwitcher: { label: "Idioma" },
};

const nl: Dict = {
  nav: { features: "Functies", how: "Hoe het werkt", pricing: "Prijzen", faq: "Veelgestelde vragen", signIn: "Inloggen", getStarted: "Nu starten" },
  hero: {
    badge: "🇪🇺 Gemaakt voor Europese MKB-bedrijven · Nu wereldwijd beschikbaar",
    titleLine1: "Train een altijd beschikbare",
    titleLine2: "AI-klantenservice",
    subtitle: "Upload PDF's, verwijs naar uw bedrijfswebsite of schrijf enkele FAQ's — ChatAI Pro zet een chatbot met uw merk op die 24/7 bezoekers beantwoordt en handmatige ondersteuning met 80% vermindert.",
    ctaPrimary: "Gratis starten · Geen creditcard nodig",
    ctaSecondary: "Demo bekijken",
    stats: [
      { n: "5 min", label: "Van aanmelding tot live" },
      { n: "80%", label: "FAQ's automatisch beantwoord" },
      { n: "40+", label: "Talen" },
      { n: "24/7", label: "Altijd beschikbaar" },
    ],
    chat: {
      brandTitle: "Hallo · Bonjour", brandSub: "Uw toegewijde AI-agent",
      status: "Beantwoordt momenteel bezoekers", avgResp: "Gem. reactietijd · 1,2 sec",
      weekly: "Deze week afgehandeld · 247 gesprekken",
      botHello: "Hoi 👋 Ik ben de AI van uw bedrijf. Vraag me alles over prijzen, bestellen of verzending!",
      userMsg: "Hoe snel is jullie expresverzending?",
      typing: "Expresverzending · geleverd in", typing2: "24 uur", typing3: "in grootstedelijke gebieden",
      source: "Bron: FAQ #3 · Verzendbeleid.pdf", refDocs: "Referentiedocs · 2",
    },
  },
  logos: { title: "Vertrouwd door honderden MKB-bedrijven", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Kernmogelijkheden",
    title1: "Alles wat u nodig hebt,", title2: "klaar voor gebruik",
    sub: "ChatAI Pro is de snelste en eenvoudigste manier om AI-klantenservice op elke website te plaatsen.",
    items: [
      { title: "Aangepaste AI-bot", desc: "Een toegewijde agent met uw naam, kleuren en welkomstbericht — klanten voelen alsof ze met u praten.", tag: "Met uw merk" },
      { title: "Inbinden op één regel", desc: "Kopieer een script-tag in uw HTML. Geen ontwikkelwerk nodig om live te gaan.", tag: "Geen configuratie" },
      { title: "Plug-and-play kennisbank", desc: "Upload PDF's, crawl URL's of schrijf FAQ's — de AI haalt automatisch antwoorden uit uw documenten.", tag: "Slim opzoeken" },
      { title: "Streaming-antwoorden", desc: "Denk-en-type-indicator, vloeiende streaming-reacties — geen vertraging.", tag: "<200ms" },
      { title: "Automatisch meertalig", desc: "Bezoekers vragen in elke taal, de bot antwoordt in dezelfde taal — geen instelling nodig.", tag: "40+ talen" },
      { title: "Live analytics", desc: "Gespreksvolume, topvragen, AI-reactiepercentage — bedrijfsvoering in één oogopslag.", tag: "Datagedreven" },
    ],
    security: {
      badge: "🛡️ Enterprise-beveiliging", title: "Uw gegevens verlaten nooit uw tenant",
      desc: "Supabase Row-Level Security (RLS) isoleert de gegevens van elke gebruiker. Uw documenten dienen alleen uw bot en trainen nooit een model. API-aanroepen zijn HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key-authenticatie", "🛡️ Gegevensisolatie", "🇪🇺 GDPR-klaar"],
      stats: [{ k: "99.9%", l: "Beschikbaarheid" }, { k: "<200ms", l: "Gem. AI-reactie" }, { k: "AES-256", l: "Versleuteling" }, { k: "SOC2", l: "Naleving" }],
    },
  },
  how: {
    badge: "🚀 3 eenvoudige stappen", title1: "Van aanmelding tot live,", title2: "in slechts 5 minuten",
    steps: [
      { title: "Maak uw bot", text: "Kies een naam, een themakleur en een welkomstbericht. Klaar in 30 seconden." },
      { title: "Voed hem met uw documenten", text: "Sleep PDF's erin, plak URL's of schrijf gewoon enkele FAQ-regels direct." },
      { title: "Bind in op uw site", text: "Kopieer één scriptregel in uw HTML. Uw AI-klantenservice is live." },
    ],
  },
  pricing: {
    badge: "⭐ Transparante prijzen", title1: "Kies een plan dat past", title2: "bij uw bedrijfsgrootte",
    sub: "Het gratis plan is voor altijd. Upgraden wordt nooit automatisch vernieuwd.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/maand", billing: "Per maand · Altijd opzegbaar", features: ["1 bot", "100 AI-berichten / maand", "5 kennisdocumenten", "Widget met merk", "Community-ondersteuning"], cta: "Gratis starten" },
      starter: { name: "STARTER", badge: "🔥 Populairste", price: "49", perMonth: "/maand", billing: "Per maand · Altijd opzegbaar", features: ["2 bots", "3.000 AI-berichten / maand", "50 kennisdocumenten", "Merk verwijderen", "Basis analytics", "E-mailondersteuning"], cta: "Upgraden" },
      growth: { name: "GROWTH", price: "129", perMonth: "/maand", billing: "Per maand · Altijd opzegbaar", features: ["5 bots", "10.000 AI-berichten / maand", "200 kennisdocumenten", "Volledig analytics-dashboard", "Meertalige ondersteuning", "Prioriteitsondersteuning"], cta: "Upgraden" },
      agency: { name: "AGENCY", price: "299", perMonth: "/maand", billing: "Per maand · Altijd opzegbaar", features: ["Onbeperkte bots", "50.000 AI-berichten / maand", "Onbeperkte documenten", "White-label widget", "API-toegang", "Toegewijde accountmanager"], cta: "Upgraden" },
    },
  },
  testimonials: {
    badge: "⭐ Beoordelingen", title: "Eigenaren en engineers zijn er dol op", rating: "Gemiddeld 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Oprichter · Maison & Cie", text: "Vroeger hadden we twee deeltijdse supportmedewerkers. Nu handelt één ChatAI Pro-bot 80% van de veelvoorkomende vragen af.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Van aanmelding tot inbinden op de marketingwebsite duurde 15 minuten. Documentupload en code-inbinden verlopen heel soepel.", initial: "J" },
      { name: "Alessandro Rossi", role: "Eigenaar · Piazza Bistro", text: "Onze klanten vragen in het Italiaans, Engels, Duits. De bot antwoordt in dezelfde taal, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Nog vragen?", sub: "Wij hebben de meest voorkomende verzameld.",
    items: [
      { q: "Moet ik kunnen coderen?", a: "Helemaal niet. Aanmelden → bot aanmaken → documenten uploaden → script kopiëren. Iedereen zonder technische kennis kan het in 5 minuten doen." },
      { q: "Welke talen worden ondersteund?", a: "Engels, Duits, Frans, Spaans, Italiaans, Nederlands, Chinees, Japans en meer dan 40 andere. De bot detecteert automatisch de taal van de bezoeker en antwoordt in dezelfde taal." },
      { q: "Zijn mijn gegevens veilig?", a: "Alles leeft in uw Supabase-tenant met Row-Level Security (RLS). Elke gebruiker ziet alleen zijn eigen bots en gesprekken." },
      { q: "Kan ik het eerst gratis proberen?", a: "Ja. Het gratis plan bevat 1 bot, 5 documenten en 100 AI-berichten per maand — geen creditcard nodig." },
      { q: "Kan ik jullie merk verwijderen?", a: "Ja. Het Starter-plan en hoger ondersteunen het verwijderen van het ChatAI Pro-merk, zodat klanten alleen uw naam en logo zien." },
    ],
    contact: "Geen antwoord gevonden? E-mail support@chatai-pro.com — we reageren binnen 24 uur.",
  },
  finalCta: {
    title: "Zet vandaag AI-klantenservice op uw website",
    sub: "Gratis starten, klaar in 5 minuten. Geen creditcard, geen verplichtingen.",
    primary: "Gratis account aanmaken", secondary: "Bestaande gebruiker · Inloggen",
    trust: ["Gratis plan voor altijd", "Geen creditcard", "Gedeployd in 5 min"],
  },
  footer: { rights: "ChatAI Pro — Alle rechten voorbehouden", privacy: "Privacybeleid", terms: "Servicevoorwaarden" },
  langSwitcher: { label: "Taal" },
};



const sv: Dict = {
  nav: { features: "Funktioner", how: "Så här fungerar det", pricing: "Priser", faq: "Vanliga frågor", signIn: "Logga in", getStarted: "Kom igång nu" },
  hero: {
    badge: "🇪🇺 Byggt för europeiska MKB-företag · Nu tillgängligt globalt",
    titleLine1: "Träna en AI-baserad",
    titleLine2: "kundtjänst som alltid finns tillgänglig",
    subtitle: "Ladda upp PDF:er, peka mot företagets webbplats eller skriv några FAQ — ChatAI Pro driftsätter en chatbot med er varumärke som svarar besökare dygnet runt och minskar manuell support med 80%.",
    ctaPrimary: "Börja gratis · Ingen kreditkort krävs",
    ctaSecondary: "Se demo",
    stats: [
      { n: "5 min", label: "Från registrering till live" },
      { n: "80%", label: "FAQ besvaras automatiskt" },
      { n: "40+", label: "Språk" },
      { n: "24/7", label: "Alltid tillgänglig" },
    ],
    chat: {
      brandTitle: "Hej · Bonjour", brandSub: "Er dedikerade AI-agent",
      status: "Svarar just nu på besökare", avgResp: "Genomsn. svarstid · 1,2 sek",
      weekly: "Hantera denna vecka · 247 konversationer",
      botHello: "Hej 👋 Jag är ert företags-AI. Fråga mig vad som helst om priser, beställningar eller leverans!",
      userMsg: "Hur snabb är er expresleverans?",
      typing: "Expresleverans · Levereras inom", typing2: "24 timmar", typing3: "i storstadsområden",
      source: "Källa: FAQ #3 · Leveranspolicy.pdf", refDocs: "Referensdokument · 2",
    },
  },
  logos: { title: "Förtrodd av hundratals MKB-företag", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Funktioner i fokus",
    title1: "Allt du behöver,", title2: "redo att användas direkt",
    sub: "ChatAI Pro är det snabbaste och enklaste sättet att få en AI-baserad kundtjänst på vilken webbplats som helst.",
    items: [
      { title: "Anpassad AI-bot", desc: "En dedikerad agent med ert namn, färger och välkomstmeddelande — kunderna känner att de pratar med just er.", tag: "Med ert varumärke" },
      { title: "Bädda in på en rad", desc: "Kopiera en script-tagg i ert HTML. Ingen utveckling behövs för att gå live.", tag: "Noll konfig" },
      { title: "Plug-and-play kunskapsbas", desc: "Ladda upp PDF:er, crawla URL:er eller skriv FAQ — AI hämtar automatiskt svar från era dokument.", tag: "Smart sökning" },
      { title: "Strömmande svar", desc: "Tänk-och-skriv-indikator, smidiga strömmande svar — ingen fördröjning.", tag: "<200ms" },
      { title: "Automatisk flerspråkighet", desc: "Besökare frågar på vilket språk som helst, botten svarar på samma — ingen konfiguration.", tag: "40+ språk" },
      { title: "Live-analys", desc: "Konversationsvolym, toppfrågor, AI-svarsfrekvens — driften syns vid ett ögonkast.", tag: "Datadriven" },
    ],
    security: {
      badge: "🛡️ Enterprisesäkerhet", title: "Era data lämnar aldrig er tenant",
      desc: "Supabase Row-Level Security (RLS) isolerar varje användares data. Era dokument tjänar endast er bot och tränar aldrig någon modell. API-anrop är HTTPS + Bearer Token från punkt till punkt.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key-autentisering", "🛡️ Dataisolering", "🇪🇺 GDPR-redo"],
      stats: [{ k: "99.9%", l: "Drifttid" }, { k: "<200ms", l: "Genomsn. AI-svarstid" }, { k: "AES-256", l: "Kryptering" }, { k: "SOC2", l: "Efterlevnad" }],
    },
  },
  how: {
    badge: "🚀 3 enkla steg", title1: "Från registrering till live,", title2: "på bara 5 minuter",
    steps: [
      { title: "Skapa er bot", text: "Välj namn, temafärg och välkomstmeddelande. Klar på 30 sekunder." },
      { title: "Mata den med era dokument", text: "Släpp PDF:er, klistra in URL:er eller skriv bara några FAQ-poster direkt." },
      { title: "Bädda in på er webbplats", text: "Kopiera en script-rad i ert HTML. Er AI-baserade kundtjänst är live." },
    ],
  },
  pricing: {
    badge: "⭐ Transparenta priser", title1: "Välj en plan som passar", title2: "er affärsstorlek",
    sub: "Den fria planen gäller för alltid. Uppgraderingar förnyas aldrig automatiskt.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/månad", billing: "Månadsvis · Avsluta när som helst", features: ["1 bot", "100 AI-meddelanden / månad", "5 kunskapsdokument", "Branded widget", "Community-support"], cta: "Börja gratis" },
      starter: { name: "STARTER", badge: "🔥 Mest populär", price: "49", perMonth: "/månad", billing: "Månadsvis · Avsluta när som helst", features: ["2 bots", "3 000 AI-meddelanden / månad", "50 kunskapsdokument", "Ta bort varumärke", "Grundläggande analys", "E-postsupport"], cta: "Uppgradera" },
      growth: { name: "GROWTH", price: "129", perMonth: "/månad", billing: "Månadsvis · Avsluta när som helst", features: ["5 bots", "10 000 AI-meddelanden / månad", "200 kunskapsdokument", "Fullständig analysdashboard", "Flerspråkigt stöd", "Prioriterad support"], cta: "Uppgradera" },
      agency: { name: "AGENCY", price: "299", perMonth: "/månad", billing: "Månadsvis · Avsluta när som helst", features: ["Obegränsade bots", "50 000 AI-meddelanden / månad", "Obegränsade dokument", "White-label widget", "API-åtkomst", "Dedikerad kontoansvarig"], cta: "Uppgradera" },
    },
  },
  testimonials: {
    badge: "⭐ Recensioner", title: "Ägare och ingenjörer älskar det", rating: "Snittbetyg 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Grundare · Maison & Cie", text: "Tidigare hade vi två deltidskonsulter på supporten. Nu hanterar en enda ChatAI Pro-bot 80% av de vanliga frågorna.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Från registrering till inbäddning på marknadsföringssajt tog det 15 minuter. Dokumentuppladdning och kodinbäddning är jätte-smidiga.", initial: "J" },
      { name: "Alessandro Rossi", role: "Ägare · Piazza Bistro", text: "Våra kunder frågar på italienska, engelska, tyska. Botten svarar på samma språk, dygnet runt.", initial: "A" },
    ],
  },
  faq: {
    title: "Fler frågor?", sub: "Vi har samlat de vanligaste.",
    items: [
      { q: "Behöver jag kunna koda?", a: "Inte alls. Registrera dig → skapa en bot → ladda upp dokument → kopiera script. Vem som helst utan teknisk bakgrund klarar det på 5 minuter." },
      { q: "Vilka språk stöds?", a: "Engelska, tyska, franska, spanska, italienska, nederländska, kinesiska, japanska och 40+ fler. Botten upptäcker automatiskt besökarens språk och svarar på samma." },
      { q: "Är mina data säkra?", a: "Allt bor i er Supabase-tenant med Row-Level Security (RLS). Varje användare ser endast sina egna bots och konversationer." },
      { q: "Kan jag prova gratis först?", a: "Ja. Den fria planen inkluderar 1 bot, 5 dokument och 100 AI-meddelanden per månad — inget kreditkort krävs." },
      { q: "Kan jag ta bort ert varumärke?", a: "Ja. Starter-planen och uppåt stödjer borttagning av ChatAI Pro-varumärket så kunden endast ser ert namn och er logotyp." },
    ],
    contact: "Inget svar hittades? Skicka e-post till support@chatai-pro.com — vi svarar inom 24 timmar.",
  },
  finalCta: {
    title: "Sätt en AI-baserad kundtjänst på er webbplats idag",
    sub: "Börja gratis, klart på 5 minuter. Inga kreditkort, inga bindningstider.",
    primary: "Skapa ett gratis konto", secondary: "Befintlig användare · Logga in",
    trust: ["Fri plan för alltid", "Inget kreditkort", "Upp på 5 minuter"],
  },
  footer: { rights: "ChatAI Pro — Alla rättigheter förbehållna", privacy: "Integritetspolicy", terms: "Användarvillkor" },
  langSwitcher: { label: "Språk" },
};

const pl: Dict = {
  nav: { features: "Funkcje", how: "Jak to działa", pricing: "Cennik", faq: "Częste pytania", signIn: "Zaloguj się", getStarted: "Zacznij teraz" },
  hero: {
    badge: "🇪🇺 Stworzone dla europejskich MŚP · Teraz dostępne na całym świecie",
    titleLine1: "Wyszkólaj zawsze dostępną",
    titleLine2: "AI do obsługi klienta",
    subtitle: "Prześlij pliki PDF, wskaż witrynę firmy lub napisz kilka FAQ — ChatAI Pro wdraża czatbota z Twoją marką, który odpowiada odwiedzającym 24/7 i ogranicza obsługę ręczną o 80%.",
    ctaPrimary: "Zacznij za darmo · Bez karty kredytowej",
    ctaSecondary: "Zobacz demo",
    stats: [
      { n: "5 min", label: "Od rejestracji do live" },
      { n: "80%", label: "FAQ obsługiwanych automatycznie" },
      { n: "40+", label: "Języków" },
      { n: "24/7", label: "Zawsze dostępny" },
    ],
    chat: {
      brandTitle: "Cześć · Bonjour", brandSub: "Twój dedykowany agent AI",
      status: "Aktualnie odpowiada odwiedzającym", avgResp: "Średni czas odp. · 1,2 s",
      weekly: "Rozmów obsłużonych w tym tyg. · 247",
      botHello: "Cześć 👋 Jestem AI Twojej firmy. Pytaj mnie o cokolwiek – ceny, zamówienia, wysyłkę!",
      userMsg: "Jak szybka jest Wasza wysyłka ekspresowa?",
      typing: "Wysyłka ekspresowa · dostawa w ciągu", typing2: "24 godzin", typing3: "na obszarach miejskich",
      source: "Źródło: FAQ #3 · Polityka wysyłki.pdf", refDocs: "Dokumenty referencyjne · 2",
    },
  },
  logos: { title: "Zaufane przez setki MŚP", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Główne funkcje",
    title1: "Wszystko czego potrzebujesz,", title2: "już gotowe do użycia",
    sub: "ChatAI Pro to najszybszy i najprostszy sposób na umieszczenie AI do obsługi klienta na dowolnej witrynie.",
    items: [
      { title: "Niestandardowy bot AI", desc: "Dedykowany agent z Twoją nazwą, kolorami i powitaniem — klienci czują, że rozmawiają z Tobą.", tag: "Z Twoją marką" },
      { title: "Osadzenie w jednej linii", desc: "Skopiuj tag script do swojego HTML. Żaden developer nie jest potrzebny, aby zacząć działać.", tag: "Bez konfiguracji" },
      { title: "Baza wiedzy plug-and-play", desc: "Przesyłaj PDF, przeszukuj URL lub pisz FAQ — AI automatycznie wyciąga odpowiedzi z Twoich dokumentów.", tag: "Inteligentne wyszukiwanie" },
      { title: "Strumieniowe odpowiedzi", desc: "Wskaźnik pisania na żywo, płynne odpowiedzi strumieniowe — bez opóźnień.", tag: "<200ms" },
      { title: "Automatyczna wielojęzyczność", desc: "Odwiedzający pytają w dowolnym języku, bot odpowiada w tym samym — bez ustawień.", tag: "40+ języków" },
      { title: "Analityka na żywo", desc: "Liczba rozmów, najczęstsze pytania, odsetek odpowiedzi AI — stan operacyjny na pierwszy rzut oka.", tag: "Oparty na danych" },
    ],
    security: {
      badge: "🛡️ Bezpieczeństwo enterprise", title: "Twoje dane nigdy nie opuszczają Twojego tenanta",
      desc: "Row-Level Security (RLS) w Supabase izoluje dane każdego użytkownika. Twoje dokumenty służą tylko Twojemu botowi i nigdy nie uczą żadnego modelu. Wywołania API to szyfrowanie HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-level security (RLS)", "🔐 Uwierzytelnianie API Key", "🛡️ Izolacja danych", "🇪🇺 Gotowe na RODO"],
      stats: [{ k: "99.9%", l: "Czas działania usługi" }, { k: "<200ms", l: "Średnia odpowiedź AI" }, { k: "AES-256", l: "Szyfrowanie" }, { k: "SOC2", l: "Zgodność" }],
    },
  },
  how: {
    badge: "🚀 3 proste kroki", title1: "Od rejestracji do działania,", title2: "w zaledwie 5 minut",
    steps: [
      { title: "Stwórz swojego bota", text: "Wybierz nazwę, kolor motywu i komunikat powitalny. Gotowe w 30 sekund." },
      { title: "Nakarm go dokumentami", text: "Upuść PDF, wklej URL lub napisz kilka wpisów FAQ bezpośrednio." },
      { title: "Osadź na swojej witrynie", text: "Skopiuj jedną linię script do swojego HTML. Twoja AI do obsługi klienta jest live." },
    ],
  },
  pricing: {
    badge: "⭐ Przejrzyste ceny", title1: "Wybierz plan pasujący do", title2: "rozmiaru Twojej firmy",
    sub: "Plan darmowy jest na zawsze. Aktualizacja nigdy nie przedłuży się automatycznie.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/miesiąc", billing: "Miesięcznie · Anuluj w dowolnym momencie", features: ["1 bot", "100 wiadomości AI / miesiąc", "5 dokumentów wiedzy", "Widget z marką", "Wsparcie społeczności"], cta: "Zacznij za darmo" },
      starter: { name: "STARTER", badge: "🔥 Najpopularniejszy", price: "49", perMonth: "/miesiąc", billing: "Miesięcznie · Anuluj w dowolnym momencie", features: ["2 boty", "3 000 wiadomości AI / miesiąc", "50 dokumentów wiedzy", "Usuń markę", "Podstawowa analityka", "Wsparcie e-mailowe"], cta: "Uaktualnij" },
      growth: { name: "GROWTH", price: "129", perMonth: "/miesiąc", billing: "Miesięcznie · Anuluj w dowolnym momencie", features: ["5 botów", "10 000 wiadomości AI / miesiąc", "200 dokumentów wiedzy", "Pełny panel analityczny", "Wielojęzyczność", "Wsparcie priorytetowe"], cta: "Uaktualnij" },
      agency: { name: "AGENCY", price: "299", perMonth: "/miesiąc", billing: "Miesięcznie · Anuluj w dowolnym momencie", features: ["Nieograniczona liczba botów", "50 000 wiadomości AI / miesiąc", "Nieograniczone dokumenty", "Widget white-label", "Dostęp do API", "Dedykowany menedżer konta"], cta: "Uaktualnij" },
    },
  },
  testimonials: {
    badge: "⭐ Recenzje", title: "Właściciele i inżynierowie to kochają", rating: "Średnia 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Założyciel · Maison & Cie", text: "Kiedyś mieliśmy dwie osoby na pół etatu w supportcie. Teraz jeden bot ChatAI Pro obsługuje 80% typowych pytań.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Od rejestracji do osadzenia na stronie marketingowej minęło 15 minut. Wgrywanie dokumentów i osadzanie kodu są super płynne.", initial: "J" },
      { name: "Alessandro Rossi", role: "Właściciel · Piazza Bistro", text: "Nasi klienci pytają po włosku, angielsku, niemiecku. Bot odpowiada w tym samym języku, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Wciąż masz pytania?", sub: "Zebraliśmy te najczęstsze.",
    items: [
      { q: "Czy muszę umieć kodować?", a: "Wcale nie. Zarejestruj się → stwórz bota → prześlij dokumenty → skopiuj script. Każda osoba bez wiedzy technicznej poradzi sobie w 5 minut." },
      { q: "Jakie języki są obsługiwane?", a: "Angielski, niemiecki, francuski, hiszpański, włoski, holenderski, chiński, japoński i ponad 40 innych. Bot automatycznie wykrywa język odwiedzającego i odpowiada w nim samym." },
      { q: "Czy moje dane są bezpieczne?", a: "Wszystko mieszka w Twoim Supabase-tenant z Row-Level Security (RLS). Każdy użytkownik widzi tylko swoich botów i rozmowy." },
      { q: "Czy mogę najpierw przetestować za darmo?", a: "Tak. Plan darmowy zawiera 1 bota, 5 dokumentów i 100 wiadomości AI miesięcznie — bez karty kredytowej." },
      { q: "Czy mogę usunąć Waszą markę?", a: "Tak. Plan Starter i wyższe obsługują usunięcie marki ChatAI Pro, aby klient widział tylko Twoją nazwę i logo." },
    ],
    contact: "Brak odpowiedzi? Napisz na support@chatai-pro.com — odpowiadamy w ciągu 24 godzin.",
  },
  finalCta: {
    title: "Wprowadź AI do obsługi klienta na swojej witrynie już dziś",
    sub: "Zacznij za darmo, gotowe w 5 minut. Bez karty kredytowej, bez zobowiązań.",
    primary: "Utwórz darmowe konto", secondary: "Istniejący użytkownik · Zaloguj się",
    trust: ["Darmowy plan na zawsze", "Bez karty kredytowej", "Wdrożenie w 5 min"],
  },
  footer: { rights: "ChatAI Pro — Wszystkie prawa zastrzeżone", privacy: "Polityka prywatności", terms: "Regulamin" },
  langSwitcher: { label: "Język" },
};



const tr: Dict = {
  nav: { features: "Özellikler", how: "Nasıl çalışır", pricing: "Fiyatlar", faq: "SSS", signIn: "Giriş yap", getStarted: "Hemen başla" },
  hero: {
    badge: "🇪🇺 Avrupa KOBİ'leri için üretilmiştir · Şimdi dünya çapında kullanılabilir",
    titleLine1: "7/24 erişilebilir bir",
    titleLine2: "AI müşteri hizmeti eğitin",
    subtitle: "PDF'leri yükleyin, şirket web sitenizi gösterin veya birkaç SSS yazın — ChatAI Pro, markanızla özelleştirilmiş bir sohbet botu devreye alır, ziyaretçilere 7/24 yanıt verir ve manuel desteği %80 oranında azaltır.",
    ctaPrimary: "Ücretsiz başlayın · Kredi kartı gerekmez",
    ctaSecondary: "Demo izle",
    stats: [
      { n: "5 dk", label: "Kayıttan canlıya" },
      { n: "%80", label: "SSS otomatik yanıtlanır" },
      { n: "40+", label: "Dil" },
      { n: "24/7", label: "Her zaman açık" },
    ],
    chat: {
      brandTitle: "Merhaba · Bonjour", brandSub: "Size özel AI asistanınız",
      status: "Şu anda ziyaretçilere yanıt veriyor", avgResp: "Ortalama yanıt · 1,2 sn",
      weekly: "Bu hafta işlenen · 247 sohbet",
      botHello: "Merhaba 👋 Ben şirketinizin AI'sı. Fiyatlar, siparişler veya kargo hakkında bana her şeyi sorabilirsiniz!",
      userMsg: "Ekspres kargonuz ne kadar hızlı?",
      typing: "Ekspres kargo · teslim süresi", typing2: "24 saat", typing3: "büyükşehirlerde",
      source: "Kaynak: SSS #3 · Kargo politikası.pdf", refDocs: "Referans doküman · 2",
    },
  },
  logos: { title: "Yüzlerce KOBİ'nin güveniyle", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Temel özellikler",
    title1: "İhtiyacınız olan her şey,", title2: "kuruluma hazır şekilde",
    sub: "ChatAI Pro, herhangi bir web sitesine AI tabanlı müşteri hizmeti koymanın en hızlı ve en kolay yoludur.",
    items: [
      { title: "Özel AI Bot", desc: "Adınız, renkleriniz ve hoş geldiniz mesajınızla özelleştirilmiş bir asistan — müşteriler sizinle konuştuğunu hisseder.", tag: "Markanızla" },
      { title: "Tek satırda yerleştirme", desc: "Bir script etiketini HTML'nize kopyalayın. Canlıya geçmek için geliştirici gerekmez.", tag: "Sıfır config" },
      { title: "Tak-çalıştır bilgi bankası", desc: "PDF'leri yükleyin, URL'leri tarayın veya SSS yazın — AI yanıtları otomatik olarak belgelerinizden çeker.", tag: "Akıllı arama" },
      { title: "Akış yanıtlar", desc: "Düşünür-yazar göstergesi, pürüzsüz akış yanıtlar — gecikme yok.", tag: "<200ms" },
      { title: "Otomatik çoklu dil", desc: "Ziyaretçiler hangi dilde sorarsa sorsun, bot aynı dille yanıt verir — kurulum gerekmez.", tag: "40+ dil" },
      { title: "Canlı analiz", desc: "Sohbet hacmi, en çok sorulanlar, AI yanıt oranı — işleyişin tek bakışta görünmesi.", tag: "Veri odaklı" },
    ],
    security: {
      badge: "🛡️ Kurumsal güvenlik", title: "Verileriniz tenant'tan asla çıkmaz",
      desc: "Supabase Row-Level Security (RLS) her kullanıcının verisini izole eder. Belgeleriniz sadece botunuza hizmet eder ve hiçbir modeli eğitmez. API çağrıları uçtan uca HTTPS + Bearer Token ile şifrelidir.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key ile kimlik doğrulama", "🛡️ Veri yalıtımı", "🇪🇺 GDPR hazır"],
      stats: [{ k: "%99.9", l: "Hizmet çalışma süresi" }, { k: "<200ms", l: "Ortalama AI yanıtı" }, { k: "AES-256", l: "Şifreleme" }, { k: "SOC2", l: "Uyum" }],
    },
  },
  how: {
    badge: "🚀 3 basit adım", title1: "Kayıttan canlıya,", title2: "sadece 5 dakikada",
    steps: [
      { title: "Botunuzu oluşturun", text: "Bir isim, tema rengi ve hoş geldiniz mesajı seçin. 30 saniyede hazır." },
      { title: "Belgelerinizle besleyin", text: "PDF'leri sürükleyin, URL'leri yapıştırın veya doğrudan birkaç SSS maddesi yazın." },
      { title: "Sitenize yerleştirin", text: "Bir satır script'i HTML'nize kopyalayın. AI müşteri hizmetiniz canlıda." },
    ],
  },
  pricing: {
    badge: "⭐ Şeffaf fiyatlar", title1: "İşletmenizin boyutuna", title2: "uygun bir plan seçin",
    sub: "Ücretsiz plan sonsuza dek geçerlidir. Yükseltmeler asla otomatik yenilenmez.",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/ay", billing: "Aylık · İstediğiniz zaman iptal", features: ["1 bot", "100 AI mesajı / ay", "5 bilgi belgesi", "Markalı widget", "Topluluk desteği"], cta: "Ücretsiz başlayın" },
      starter: { name: "STARTER", badge: "🔥 En popüler", price: "49", perMonth: "/ay", billing: "Aylık · İstediğiniz zaman iptal", features: ["2 bot", "3.000 AI mesajı / ay", "50 bilgi belgesi", "Markayı kaldır", "Temel analiz", "E-posta desteği"], cta: "Yükselt" },
      growth: { name: "GROWTH", price: "129", perMonth: "/ay", billing: "Aylık · İstediğiniz zaman iptal", features: ["5 bot", "10.000 AI mesajı / ay", "200 bilgi belgesi", "Tam analiz paneli", "Çoklu dil desteği", "Öncelikli destek"], cta: "Yükselt" },
      agency: { name: "AGENCY", price: "299", perMonth: "/ay", billing: "Aylık · İstediğiniz zaman iptal", features: ["Sınırsız bot", "50.000 AI mesajı / ay", "Sınırsız belge", "White-label widget", "API erişimi", "Özel hesap yöneticisi"], cta: "Yükselt" },
    },
  },
  testimonials: {
    badge: "⭐ Değerlendirmeler", title: "Sahip ve mühendisler çok sever", rating: "Ortalama 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Kurucu · Maison & Cie", text: "Eskiden yarı zamanlı iki destek personeli vardı. Şimdi tek bir ChatAI Pro botu %80 yaygın soruyu hallediyor.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Kayıttan marketing sitesine yerleştirmeye 15 dakika kaldı. Belge yükleme ve kod yerleştirme çok akıcı.", initial: "J" },
      { name: "Alessandro Rossi", role: "Sahip · Piazza Bistro", text: "Müşterilerimiz İtalyanca, İngilizce, Almanca soruyor. Bot aynı dille 7/24 yanıt veriyor.", initial: "A" },
    ],
  },
  faq: {
    title: "Başka sorunuz var mı?", sub: "En yaygın olanlarını derledik.",
    items: [
      { q: "Kod yazmayı bilmek gerekiyor mu?", a: "Hepsi değil. Kayıt ol → bot oluştur → belgeleri yükle → script'i kopyala. Teknik olmayan herkes 5 dakikada yapar." },
      { q: "Hangi diller destekleniyor?", a: "İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Felemenkçe, Çince, Japonca ve 40+ fazla dil. Bot ziyaretçinin dilini otomatik algılar ve aynı dille yanıt verir." },
      { q: "Verilerim güvenli mi?", a: "Her şey Row-Level Security (RLS) ile sizin Supabase tenant'ınızda yaşar. Her kullanıcı sadece kendi botlarını ve sohbetlerini görür." },
      { q: "Önce ücretsiz deneyebilir miyim?", a: "Evet. Ücretsiz plan 1 bot, 5 belge ve ayda 100 AI mesajı içerir — kredi kartı gerekmez." },
      { q: "Sizin markanızı kaldırabilir miyim?", a: "Evet. Starter plan ve üstünde ChatAI Pro markasını kaldırabilir, müşteriler sadece sizin adınızı ve logonuzu görür." },
    ],
    contact: "Yanıt bulamadınız mı? support@chatai-pro.com adresine e-posta atın — 24 saat içinde yanıt veriyoruz.",
  },
  finalCta: {
    title: "AI müşteri hizmetini bugün sitenize yerleştirin",
    sub: "Ücretsiz başlayın, 5 dakikada hazır. Kredi kartı yok, sözleşme yok.",
    primary: "Ücretsiz hesap oluştur", secondary: "Zaten üye · Giriş yap",
    trust: ["Ücretsiz plan sonsuza dek", "Kredi kartı gerekmez", "5 dakikada kurulur"],
  },
  footer: { rights: "ChatAI Pro — Tüm hakları saklıdır", privacy: "Gizlilik politikası", terms: "Kullanım koşulları" },
  langSwitcher: { label: "Dil" },
};

const th: Dict = {
  nav: { features: "ฟีเจอร์", how: "วิธีใช้งาน", pricing: "ราคา", faq: "คำถามที่พบบ่อย", signIn: "เข้าสู่ระบบ", getStarted: "เริ่มตอนนี้" },
  hero: {
    badge: "🇪🇺 ออกแบบสำหรับ SMB ยุโรป · ใช้งานได้ทั่วโลกแล้ว",
    titleLine1: "ฝึกฝน AI ที่",
    titleLine2: "พร้อมให้บริการลูกค้า 24/7",
    subtitle: "อัปโหลด PDF, ชี้ไปที่เว็บไซต์บริษัท หรือเขียนคำถามที่พบบ่อยสองสามข้อ — ChatAI Pro จะนำ chatbot ที่มีบรanding ของคุณไปใช้งาน ตอบผู้เข้าชมตลอด 24 ชั่วโมง และลดการสนับสนุนด้วยตนเองลง 80%",
    ctaPrimary: "เริ่มฟรี · ไม่ต้องใช้บัตรเครดิต",
    ctaSecondary: "ดูตัวอย่าง",
    stats: [
      { n: "5 นาที", label: "ตั้งแต่ลงทะเบียนจนใช้งานได้" },
      { n: "80%", label: "FAQ ที่ตอบอัตโนมัติ" },
      { n: "40+", label: "ภาษา" },
      { n: "24/7", label: "พร้อมให้บริการตลอด" },
    ],
    chat: {
      brandTitle: "สวัสดี · Bonjour", brandSub: "AI agent ส่วนตัวของคุณ",
      status: "กำลังตอบผู้เข้าชมตอนนี้", avgResp: "เวลาตอบเฉลี่ย · 1.2 วินาที",
      weekly: "สัปดาห์นี้จัดการแล้ว · 247 การสนทนา",
      botHello: "สวัสดี 👋 ผมคือ AI ของบริษัทคุณ ถามเรื่องราคา การสั่งซื้อ หรือการจัดส่งได้ทันที!",
      userMsg: "การจัดส่งด่วนของคุณเร็วแค่ไหน?",
      typing: "การจัดส่งด่วน · ส่งภายใน", typing2: "24 ชั่วโมง", typing3: "ในเขตเมืองใหญ่",
      source: "ที่มา: FAQ #3 · นโยบายการจัดส่ง.pdf", refDocs: "เอกสารอ้างอิง · 2",
    },
  },
  logos: { title: "ได้รับความไว้วางใจจาก SMB หลายร้อยแห่ง", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ ความสามารถหลัก",
    title1: "ทุกอย่างที่คุณต้องการ,", title2: "พร้อมใช้งานทันที",
    sub: "ChatAI Pro คือวิธีที่รวดเร็วและง่ายที่สุดในการนำ AI บริการลูกค้าไปไว้บนเว็บไซต์ใดๆ",
    items: [
      { title: "Custom AI Bot", desc: "agent เฉพาะที่ใช้ชื่อ สี และข้อความต้อนรับของคุณ — ลูกค้ารู้สึกเหมือนกำลังคุยกับคุณเอง", tag: "พร้อม Brand" },
      { title: "ฝังในหนึ่งบรรทัด", desc: "คัดลอก script tag ใส่ HTML ของคุณ ไม่ต้องมี dev work ก็สามารถใช้งานได้", tag: "ไม่ต้องตั้งค่า" },
      { title: "ฐานความรู้ Plug-and-play", desc: "อัปโหลด PDF, crawl URL หรือเขียน FAQ — AI ดึงคำตอบจากเอกสารของคุณโดยอัตโนมัติ", tag: "ค้นหาอัจฉริยะ" },
      { title: "คำตอบแบบ Streaming", desc: "มีตัวบ่งชี้ขณะพิมพ์, สตรีมคำตอบที่ราบรื่น — ไม่มีหน่วง", tag: "<200ms" },
      { title: "หลายภาษาอัตโนมัติ", desc: "ผู้เข้าชมถามในภาษาไหนก็ได้ bot จะตอบในภาษาเดียวกัน — ไม่ต้องตั้งค่า", tag: "40+ ภาษา" },
      { title: "แ analytics สด", desc: "ปริมาณการสนทนา, คำถามยอดนิยม, อัตราการตอบของ AI — ดูภาพรวมการใช้งานได้ในทีเดียว", tag: "เน้นข้อมูล" },
    ],
    security: {
      badge: "🛡️ ความปลอดภัยระดับ Enterprise", title: "ข้อมูลของคุณไม่เคยออกจาก tenant",
      desc: "Supabase Row-Level Security (RLS) ทำการแยกข้อมูลของผู้ใช้แต่ละคนออกจากกัน เอกสารของคุณใช้เพื่อให้บริการกับ bot ของคุณเท่านั้น และไม่เคยใช้ train โมเดลใดๆ การเรียก API เป็น HTTPS + Bearer Token ตลอดทั้งวิธี",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key authentication", "🛡️ Data isolation", "🇪🇺 GDPR พร้อม"],
      stats: [{ k: "99.9%", l: "เวลาที่ใช้งานได้" }, { k: "<200ms", l: "เวลาตอบ AI เฉลี่ย" }, { k: "AES-256", l: "การเข้ารหัส" }, { k: "SOC2", l: "การปฏิบัติตามมาตรฐาน" }],
    },
  },
  how: {
    badge: "🚀 3 ขั้นตอนง่ายๆ", title1: "ตั้งแต่ลงทะเบียนจนใช้งานได้,", title2: "เพียง 5 นาที",
    steps: [
      { title: "สร้าง bot ของคุณ", text: "เลือกชื่อ สีธีม และข้อความต้อนรับ เสร็จใน 30 วินาที" },
      { title: "ป้อนเอกสารของคุณ", text: "ลาก PDF มาวาง, วาง URL หรือเขียนรายการ FAQ สองสามข้อโดยตรง" },
      { title: "ฝังบนเว็บไซต์ของคุณ", text: "คัดลอก script หนึ่งบรรทัดใส่ HTML ของคุณ AI บริการลูกค้าของคุณพร้อมใช้งานแล้ว" },
    ],
  },
  pricing: {
    badge: "⭐ ราคาชัดเจน", title1: "เลือกแผนที่เหมาะกับ", title2: "ขนาดธุรกิจของคุณ",
    sub: "แผนฟรีใช้ได้ตลอดไป การอัปเกรดไม่เคยต่ออัตโนมัติ",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/เดือน", billing: "รายเดือน · ยกเลิกได้ตลอดเวลา", features: ["1 bot", "100 ข้อความ AI / เดือน", "5 เอกสารความรู้", "Widget พร้อม brand", "การสนับสนุนชุมชน"], cta: "เริ่มฟรี" },
      starter: { name: "STARTER", badge: "🔥 ยอดนิยมที่สุด", price: "49", perMonth: "/เดือน", billing: "รายเดือน · ยกเลิกได้ตลอดเวลา", features: ["2 bot", "3,000 ข้อความ AI / เดือน", "50 เอกสารความรู้", "เอา brand ออก", "พื้นฐาน analytics", "การสนับสนุนอีเมล"], cta: "อัปเกรด" },
      growth: { name: "GROWTH", price: "129", perMonth: "/เดือน", billing: "รายเดือน · ยกเลิกได้ตลอดเวลา", features: ["5 bot", "10,000 ข้อความ AI / เดือน", "200 เอกสารความรู้", "แดชบอร์ด analytics เต็มรูปแบบ", "รองรับหลายภาษา", "การสนับสนุนลำดับความสำคัญ"], cta: "อัปเกรด" },
      agency: { name: "AGENCY", price: "299", perMonth: "/เดือน", billing: "รายเดือน · ยกเลิกได้ตลอดเวลา", features: ["bot ไม่จำกัด", "50,000 ข้อความ AI / เดือน", "เอกสารไม่จำกัด", "Widget White-label", "การเข้าถึง API", "ผู้จัดการบัญชีเฉพาะ"], cta: "อัปเกรด" },
    },
  },
  testimonials: {
    badge: "⭐ รีวิว", title: "เจ้าของและวิศวกรต่างชื่นชม", rating: "คะแนนเฉลี่ย 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "ผู้ก่อตั้ง · Maison & Cie", text: "ก่อนหน้านี้เรามีพนักงานส่วนนึงสองคนที่ทำงานด้าน support ตอนนี้ bot ChatAI Pro ตัวเดียวจัดการคำถามทั่วไปได้ 80%", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "ตั้งแต่ลงทะเบียนจนนำไปฝังบน marketing site ใช้เวลา 15 นาทีเท่านั้น การอัปโหลดเอกสารและการฝังรหัสเป็นไปอย่างราบรื่นมาก", initial: "J" },
      { name: "Alessandro Rossi", role: "เจ้าของ · Piazza Bistro", text: "ลูกค้าของเราถามเป็นภาษาอิตาเลียน อังกฤษ เยอรมัน bot ตอบในภาษาเดียวกันตลอด 24 ชั่วโมง", initial: "A" },
    ],
  },
  faq: {
    title: "ยังมีคำถามอยู่ไหม?", sub: "เราได้รวบรวมคำถามที่พบบ่อยไว้แล้ว",
    items: [
      { q: "จำเป็นต้องรู้วิธีเขียนโค้ดไหม?", a: "ไม่เลย ลงทะเบียน → สร้าง bot → อัปโหลดเอกสาร → คัดลอก script ใครก็ตามที่ไม่มีพื้นหลังเทคนิคสามารถทำได้ใน 5 นาที" },
      { q: "รองรับภาษาอะไรบ้าง?", a: "อังกฤษ เยอรมัน ฝรั่งเศส สเปน อิตาลี ดัตช์ จีน ญี่ปุ่น และอีก 40+ ภาษา bot จะตรวจจับภาษาของผู้เข้าชมโดยอัตโนมัติและตอบในภาษาเดียวกัน" },
      { q: "ข้อมูลของฉันปลอดภัยไหม?", a: "ทุกอย่างอยู่ใน Supabase tenant ของคุณด้วย Row-Level Security (RLS) ผู้ใช้แต่ละคนเห็นเฉพาะ bot และการสนทนาของตนเองเท่านั้น" },
      { q: "ลองใช้ฟรีก่อนได้ไหม?", a: "ได้ แผนฟรีรวม 1 bot, 5 เอกสาร และ 100 ข้อความ AI ต่อเดือน — ไม่ต้องใช้บัตรเครดิต" },
      { q: "สามารถเอา brand ของพวกคุณออกได้ไหม?", a: "ได้ แผน Starter ขึ้นไปรองรับการเอา brand ChatAI Pro ออก เพื่อให้ลูกค้าเห็นเพียงชื่อและโลโก้ของคุณเท่านั้น" },
    ],
    contact: "ไม่พบคำตอบใช่ไหม? ส่งอีเมลไปที่ support@chatai-pro.com — เราตอบภายใน 24 ชั่วโมง",
  },
  finalCta: {
    title: "นำ AI บริการลูกค้าไปไว้บนเว็บไซต์ของคุณวันนี้",
    sub: "เริ่มฟรี เสร็จใน 5 นาที ไม่ต้องใช้บัตรเครดิต ไม่มีข้อผูกมัด",
    primary: "สร้างบัญชีฟรี", secondary: "มีบัญชีอยู่แล้ว · เข้าสู่ระบบ",
    trust: ["แผนฟรีตลอดไป", "ไม่ต้องใช้บัตรเครดิต", "ใช้งานได้ใน 5 นาที"],
  },
  footer: { rights: "ChatAI Pro — สงวนลิขสิทธิ์ทั้งหมด", privacy: "นโยบายความเป็นส่วนตัว", terms: "เงื่อนไขการใช้งาน" },
  langSwitcher: { label: "ภาษา" },
};



const vi: Dict = {
  nav: { features: "Tính năng", how: "Cách hoạt động", pricing: "Bảng giá", faq: "Câu hỏi thường gặp", signIn: "Đăng nhập", getStarted: "Bắt đầu ngay" },
  hero: {
    badge: "🇪🇺 Xây dựng cho SMB châu Âu · Đã có mặt trên toàn cầu",
    titleLine1: "Tạo một dịch vụ chăm sóc khách hàng",
    titleLine2: "AI hoạt động 24/7",
    subtitle: "Tải lên tệp PDF, liên kết đến trang web công ty hoặc viết một số Câu hỏi thường gặp — ChatAI Pro triển khai chatbot mang thương hiệu của bạn để trả lời khách truy cập 24/7, giảm 80% công việc hỗ trợ thủ công.",
    ctaPrimary: "Bắt đầu miễn phí · Không cần thẻ tín dụng",
    ctaSecondary: "Xem bản trình diễn",
    stats: [
      { n: "5 phút", label: "Từ đăng ký đến hoạt động" },
      { n: "80%", label: "Câu hỏi thường gặp được xử lý tự động" },
      { n: "40+", label: "Ngôn ngữ" },
      { n: "24/7", label: "Luôn sẵn sàng" },
    ],
    chat: {
      brandTitle: "Xin chào · Bonjour", brandSub: "Trợ lý AI dành riêng của bạn",
      status: "Đang trả lời khách truy cập", avgResp: "Thời gian phản hồi trung bình · 1,2 giây",
      weekly: "Đã xử lý trong tuần này · 247 cuộc trò chuyện",
      botHello: "Chào bạn 👋 Tôi là AI của công ty. Hãy hỏi tôi bất cứ điều gì về giá cả, đặt hàng hoặc vận chuyển!",
      userMsg: "Vận chuyển nhanh của bạn nhanh đến đâu?",
      typing: "Vận chuyển nhanh · giao hàng trong", typing2: "24 giờ", typing3: "ở các khu vực đô thị",
      source: "Nguồn: FAQ #3 · Chính sách vận chuyển.pdf", refDocs: "Tài liệu tham khảo · 2",
    },
  },
  logos: { title: "Được tin tưởng bởi hàng trăm SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Khả năng cốt lõi",
    title1: "Mọi thứ bạn cần,", title2: "đã được cài đặt và sẵn sàng",
    sub: "ChatAI Pro là cách nhanh nhất và đơn giản nhất để đưa dịch vụ chăm sóc khách hàng AI lên bất kỳ trang web nào.",
    items: [
      { title: "Bot AI tùy chỉnh", desc: "Một trợ lý chuyên biệt với tên, màu sắc và thông điệp chào mừng của bạn — khách hàng cảm thấy họ đang nói chuyện với bạn.", tag: "Thương hiệu" },
      { title: "Nhúng một dòng mã", desc: "Sao chép thẻ script vào HTML của bạn. Không cần công việc phát triển để hoạt động.", tag: "Cấu hình không" },
      { title: "Kiến thức cắm và chạy", desc: "Tải lên tệp PDF, thu thập URL hoặc viết Câu hỏi thường gặp — AI tự động lấy câu trả lời từ tài liệu của bạn.", tag: "Truy xuất thông minh" },
      { title: "Phản hồi trực tiếp", desc: "Biểu tượng đang suy nghĩ và nhập câu trả lời, phản hồi trực tiếp mượt mà — không có độ trễ.", tag: "<200ms" },
      { title: "Đa ngôn ngữ tự động", desc: "Khách truy cập hỏi bằng bất kỳ ngôn ngữ nào, bot trả lời bằng cùng một ngôn ngữ — không cần cài đặt.", tag: "40+ ngôn ngữ" },
      { title: "Phân tích trực tiếp", desc: "Khối lượng cuộc trò chuyện, câu hỏi hàng đầu, tỷ lệ trả lời của AI — hoạt động chỉ trong một cái nhìn.", tag: "Dựa trên dữ liệu" },
    ],
    security: {
      badge: "🛡️ Bảo mật doanh nghiệp", title: "Dữ liệu của bạn không bao giờ rời khỏi tenant của bạn",
      desc: "Supabase Row-Level Security cách ly dữ liệu của mỗi người dùng. Tài liệu của bạn chỉ phục vụ bot của bạn và không bao giờ đào tạo bất kỳ mô hình nào. Cuộc gọi API là HTTPS + Bearer Token từ đầu đến cuối.",
      chips: ["🔒 Row-level security", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "Thời gian hoạt động dịch vụ" }, { k: "<200ms", l: "Phản hồi AI trung bình" }, { k: "AES-256", l: "Mã hóa" }, { k: "SOC2", l: "Tuân thủ" }],
    },
  },
  how: {
    badge: "🚀 3 bước đơn giản", title1: "Từ đăng ký đến hoạt động,", title2: "chỉ trong 5 phút",
    steps: [
      { title: "Tạo bot của bạn", text: "Chọn tên, màu sắc chủ đề và thông điệp chào mừng. Hoàn thành trong 30 giây." },
      { title: "Cung cấp tài liệu của bạn", text: "Thả tệp PDF, dán URL hoặc chỉ cần viết một số mục Câu hỏi thường gặp trực tiếp." },
      { title: "Nhúng vào trang web của bạn", text: "Sao chép một dòng script vào HTML của bạn. Dịch vụ chăm sóc khách hàng AI của bạn đã hoạt động." },
    ],
  },
  pricing: {
    badge: "⭐ Bảng giá minh bạch", title1: "Chọn gói phù hợp", title2: "với quy mô doanh nghiệp của bạn",
    sub: "Gói miễn phí là vĩnh viễn. Nâng cấp không bao giờ tự động gia hạn.",
    plans: {
      free: { name: "MIỄN PHÍ", price: "0", perMonth: "/tháng", billing: "Theo tháng · Hủy bất cứ lúc nào", features: ["1 bot", "100 tin nhắn AI / tháng", "5 tài liệu kiến thức", "Widget mang thương hiệu", "Hỗ trợ cộng đồng"], cta: "Bắt đầu miễn phí" },
      starter: { name: "STARTER", badge: "🔥 Phổ biến nhất", price: "49", perMonth: "/tháng", billing: "Theo tháng · Hủy bất cứ lúc nào", features: ["2 bot", "3.000 tin nhắn AI / tháng", "50 tài liệu kiến thức", "Xóa thương hiệu", "Phân tích cơ bản", "Hỗ trợ qua email"], cta: "Nâng cấp" },
      growth: { name: "GROWTH", price: "129", perMonth: "/tháng", billing: "Theo tháng · Hủy bất cứ lúc nào", features: ["5 bot", "10.000 tin nhắn AI / tháng", "200 tài liệu kiến thức", "Bảng điều khiển phân tích đầy đủ", "Hỗ trợ đa ngôn ngữ", "Hỗ trợ ưu tiên"], cta: "Nâng cấp" },
      agency: { name: "AGENCY", price: "299", perMonth: "/tháng", billing: "Theo tháng · Hủy bất cứ lúc nào", features: ["Bot không giới hạn", "50.000 tin nhắn AI / tháng", "Tài liệu không giới hạn", "Widget White-label", "Truy cập API", "Quản lý tài khoản chuyên biệt"], cta: "Nâng cấp" },
    },
  },
  testimonials: {
    badge: "⭐ Đánh giá", title: "Chủ sở hữu và kỹ sư đều yêu thích", rating: "Điểm trung bình 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Người sáng lập · Maison & Cie", text: "Trước đây chúng tôi có hai nhân viên hỗ trợ bán thời gian. Bây giờ một bot ChatAI Pro xử lý 80% các câu hỏi thông thường.", initial: "M" },
      { name: "Jonas Weber", role: "Trưởng nhóm kỹ thuật · Helio SaaS", text: "Từ đăng ký đến nhúng vào trang web tiếp thị chỉ mất 15 phút. Tải lên tài liệu và nhúng mã rất mượt mà.", initial: "J" },
      { name: "Alessandro Rossi", role: "Chủ sở hữu · Piazza Bistro", text: "Khách hàng của chúng tôi hỏi bằng tiếng Ý, tiếng Anh, tiếng Đức. Bot trả lời bằng cùng một ngôn ngữ, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Vẫn còn câu hỏi?", sub: "Chúng tôi đã tổng hợp những câu hỏi phổ biến nhất.",
    items: [
      { q: "Tôi có cần biết cách viết mã không?", a: "Hoàn toàn không. Đăng ký → tạo bot → tải tài liệu → sao chép script. Bất kỳ ai không kỹ thuật cũng có thể làm được trong 5 phút." },
      { q: "Những ngôn ngữ nào được hỗ trợ?", a: "Tiếng Anh, tiếng Đức, tiếng Pháp, tiếng Tây Ban Nha, tiếng Ý, tiếng Hà Lan, tiếng Trung, tiếng Nhật và hơn 40 ngôn ngữ khác. Bot tự động phát hiện ngôn ngữ của khách truy cập và trả lời bằng cùng một ngôn ngữ." },
      { q: "Dữ liệu của tôi có an toàn không?", a: "Mọi thứ được lưu trữ trong tenant Supabase của bạn với Row-Level Security. Mỗi người dùng chỉ thấy các bot và cuộc trò chuyện của riêng họ." },
      { q: "Tôi có thể dùng thử miễn phí trước không?", a: "Có. Gói miễn phí bao gồm 1 bot, 5 tài liệu và 100 tin nhắn AI mỗi tháng — không cần thẻ tín dụng." },
      { q: "Tôi có thể xóa thương hiệu của bạn không?", a: "Có. Gói Bắt đầu trở lên hỗ trợ xóa thương hiệu ChatAI Pro để khách hàng chỉ thấy tên và logo của bạn." },
    ],
    contact: "Không tìm thấy câu trả lời? Gửi email đến support@chatai-pro.com — chúng tôi trả lời trong 24 giờ.",
  },
  finalCta: {
    title: "Đưa dịch vụ chăm sóc khách hàng AI lên trang web của bạn ngay hôm nay",
    sub: "Bắt đầu miễn phí, hoàn thành trong 5 phút. Không cần thẻ tín dụng, không ràng buộc.",
    primary: "Tạo tài khoản miễn phí", secondary: "Người dùng hiện có · Đăng nhập",
    trust: ["Gói miễn phí vĩnh viễn", "Không cần thẻ tín dụng", "Triển khai trong 5 phút"],
  },
  footer: { rights: "ChatAI Pro — Đã đăng ký bản quyền", privacy: "Chính sách bảo mật", terms: "Điều khoản dịch vụ" },
  langSwitcher: { label: "Ngôn ngữ" },
};

const id: Dict = {
  nav: { features: "Fitur", how: "Cara kerja", pricing: "Harga", faq: "FAQ", signIn: "Masuk", getStarted: "Mulai sekarang" },
  hero: {
    badge: "🇪🇺 Dibangun untuk SMB Eropa · Sekarang tersedia secara global",
    titleLine1: "Layanan pelanggan AI",
    titleLine2: "yang aktif 24/7",
    subtitle: "Unggah PDF, arahkan ke situs web perusahaan, atau tulis beberapa FAQ — ChatAI Pro menerapkan chatbot bermerek yang menjawab pengunjung 24/7, mengurangi dukungan manual sebesar 80%.",
    ctaPrimary: "Mulai gratis · Tanpa kartu kredit",
    ctaSecondary: "Tonton demo",
    stats: [
      { n: "5 menit", label: "Dari pendaftaran hingga live" },
      { n: "80%", label: "FAQ ditangani otomatis" },
      { n: "40+", label: "Bahasa" },
      { n: "24/7", label: "Selalu aktif" },
    ],
    chat: {
      brandTitle: "Halo · Bonjour", brandSub: "Asisten AI khusus Anda",
      status: "Sedang membalas pengunjung", avgResp: "Rata-rata respons · 1,2 detik",
      weekly: "Ditangani minggu ini · 247 percakapan",
      botHello: "Halo 👋 Saya adalah AI perusahaan Anda. Tanyakan apa pun tentang harga, pemesanan, atau pengiriman!",
      userMsg: "Seberapa cepat pengiriman kilat Anda?",
      typing: "Pengiriman kilat · dikirim dalam", typing2: "24 jam", typing3: "di wilayah metropolitan",
      source: "Sumber: FAQ #3 · Kebijakan pengiriman.pdf", refDocs: "Dokumen rujukan · 2",
    },
  },
  logos: { title: "Dipercaya oleh ratusan SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Kemampuan inti",
    title1: "Segala yang Anda butuhkan,", title2: "semua siap dipakai",
    sub: "ChatAI Pro adalah cara tercepat dan termudah untuk menghadirkan layanan pelanggan AI di situs web mana pun.",
    items: [
      { title: "Bot AI kustom", desc: "Asisten khusus dengan nama, warna, dan pesan selamat datang Anda — pelanggan merasa sedang berbicara dengan Anda.", tag: "Bermerek" },
      { title: "Embed satu baris", desc: "Salin tag script ke HTML Anda. Tidak perlu kerja pengembang untuk mulai aktif.", tag: "Nol konfigurasi" },
      { title: "Pengetahuan plug-and-play", desc: "Unggah PDF, kumpulkan URL, atau tulis FAQ — AI secara otomatis menarik jawaban dari dokumen Anda.", tag: "Pencarian cerdas" },
      { title: "Balasan langsung", desc: "Indikator mengetik think-and-output, respons streaming yang mulus — tanpa jeda.", tag: "<200ms" },
      { title: "Multibahasa otomatis", desc: "Pengunjung bertanya dalam bahasa apa pun, bot membalas dalam bahasa yang sama — tanpa pengaturan.", tag: "40+ bahasa" },
      { title: "Analitik langsung", desc: "Volume percakapan, pertanyaan teratas, tingkat balasan AI — operasional sekilas terlihat.", tag: "Berbasis data" },
    ],
    security: {
      badge: "🛡️ Keamanan enterprise", title: "Data Anda tidak pernah keluar dari tenant Anda",
      desc: "Supabase Row-Level Security mengisolasi data setiap pengguna. Dokumen Anda hanya melayani bot Anda dan tidak pernah melatih model mana pun. Panggilan API adalah HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-level security (RLS)", "🔐 Auth API Key", "🛡️ Isolasi data", "🇪🇺 Siap GDPR"],
      stats: [{ k: "99.9%", l: "Waktu aktif layanan" }, { k: "<200ms", l: "Rata-rata respons AI" }, { k: "AES-256", l: "Enkripsi" }, { k: "SOC2", l: "Kepatuhan" }],
    },
  },
  how: {
    badge: "🚀 3 langkah mudah", title1: "Dari pendaftaran hingga live,", title2: "hanya dalam 5 menit",
    steps: [
      { title: "Buat bot Anda", text: "Pilih nama, warna tema, dan pesan selamat datang. Selesai dalam 30 detik." },
      { title: "Berikan dokumen Anda", text: "Lepas PDF, tempel URL, atau langsung tulis beberapa entri FAQ." },
      { title: "Embed di situs Anda", text: "Salin satu baris script ke HTML Anda. Layanan pelanggan AI Anda sudah aktif." },
    ],
  },
  pricing: {
    badge: "⭐ Harga transparan", title1: "Pilih paket yang cocok", title2: "dengan ukuran bisnis Anda",
    sub: "Paket gratis selamanya. Peningkatan tidak pernah diperpanjang otomatis.",
    plans: {
      free: { name: "GRATIS", price: "0", perMonth: "/bulan", billing: "Bulanan · Batal kapan saja", features: ["1 bot", "100 pesan AI / bulan", "5 dokumen pengetahuan", "Widget bermerek", "Dukungan komunitas"], cta: "Mulai gratis" },
      starter: { name: "STARTER", badge: "🔥 Paling populer", price: "49", perMonth: "/bulan", billing: "Bulanan · Batal kapan saja", features: ["2 bot", "3.000 pesan AI / bulan", "50 dokumen pengetahuan", "Hapus merek", "Analitik dasar", "Dukungan email"], cta: "Tingkatkan" },
      growth: { name: "GROWTH", price: "129", perMonth: "/bulan", billing: "Bulanan · Batal kapan saja", features: ["5 bot", "10.000 pesan AI / bulan", "200 dokumen pengetahuan", "Dasbor analitik lengkap", "Dukungan multibahasa", "Dukungan prioritas"], cta: "Tingkatkan" },
      agency: { name: "AGENCY", price: "299", perMonth: "/bulan", billing: "Bulanan · Batal kapan saja", features: ["Bot tak terbatas", "50.000 pesan AI / bulan", "Dokumen tak terbatas", "Widget white-label", "Akses API", "Manajer akun khusus"], cta: "Tingkatkan" },
    },
  },
  testimonials: {
    badge: "⭐ Ulasan", title: "Pemilik dan insinyur menyukainya", rating: "Rata-rata 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Pendiri · Maison & Cie", text: "Dulu kami punya dua staf dukungan paruh waktu. Sekarang satu bot ChatAI Pro menangani 80% pertanyaan umum.", initial: "M" },
      { name: "Jonas Weber", role: "Kepala teknis · Helio SaaS", text: "Dari pendaftaran hingga penyematan di situs pemasaran butuh 15 menit. Pengunggahan dokumen dan penyematan kode sangatlah lancar.", initial: "J" },
      { name: "Alessandro Rossi", role: "Pemilik · Piazza Bistro", text: "Pelanggan kami bertanya dalam bahasa Italia, Inggris, Jerman. Bot membalas dalam bahasa yang sama, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Masih ada pertanyaan?", sub: "Kami telah merangkum yang paling umum.",
    items: [
      { q: "Apakah saya harus tahu cara membuat kode?", a: "Sama sekali tidak. Daftar → buat bot → unggah dokumen → salin script. Siapa pun tanpa latar belakang teknis bisa melakukannya dalam 5 menit." },
      { q: "Bahasa apa saja yang didukung?", a: "Inggris, Jerman, Prancis, Spanyol, Italia, Belanda, Tiongkok, Jepang, dan 40+ lainnya. Bot mendeteksi otomatis bahasa pengunjung dan membalas dalam bahasa yang sama." },
      { q: "Apakah data saya aman?", a: "Semua tinggal di tenant Supabase Anda dengan Row-Level Security (RLS). Setiap pengguna hanya melihat bot dan percakapan mereka sendiri." },
      { q: "Bisakah saya mencoba gratis dulu?", a: "Ya. Paket gratis mencakup 1 bot, 5 dokumen, dan 100 pesan AI per bulan — tanpa kartu kredit." },
      { q: "Bisakah saya menghapus merek Anda?", a: "Ya. Paket Starter ke atas mendukung penghapusan merek ChatAI Pro sehingga pelanggan hanya melihat nama dan logo Anda." },
    ],
    contact: "Tidak menemukan jawaban? Kirim email ke support@chatai-pro.com — kami membalas dalam 24 jam.",
  },
  finalCta: {
    title: "Hadirkan layanan pelanggan AI di situs web Anda hari ini",
    sub: "Gratis untuk memulai, selesai dalam 5 menit. Tanpa kartu kredit, tanpa kewajiban.",
    primary: "Buat akun gratis", secondary: "Pengguna lama · Masuk",
    trust: ["Paket gratis selamanya", "Tanpa kartu kredit", "Diterapkan dalam 5 menit"],
  },
  footer: { rights: "ChatAI Pro — Semua hak dilindungi", privacy: "Kebijakan privasi", terms: "Ketentuan layanan" },
  langSwitcher: { label: "Bahasa" },
};



const cs: Dict = {
  nav: { features: "Funkce", how: "Jak to funguje", pricing: "Ceník", faq: "FAQ", signIn: "Přihlásit se", getStarted: "Začít" },
  hero: {
    badge: "🇪🇺 Vytvořeno pro evropské SMB · Nyní dostupné po celém světě",
    titleLine1: "Vytvořte si službu zákaznickou",
    titleLine2: "s AI, která je neustále online",
    subtitle: "Nahrajte PDF, nasměrujte na webové stránky společnosti, nebo napište pár FAQ — ChatAI Pro nasadí chatbot s vaší značkou, který odpovídá návštěvníkům 24/7 a snižuje manuální podporu o 80%.",
    ctaPrimary: "Začít zdarma · Bez kreditní karty",
    ctaSecondary: "Sledovat demo",
    stats: [
      { n: "5 minut", label: "Od registrace po provoz" },
      { n: "80%", label: "FAQ zpracováno automaticky" },
      { n: "40+", label: "Jazyků" },
      { n: "24/7", label: "Vždy online" },
    ],
    chat: {
      brandTitle: "Dobrý den · Bonjour", brandSub: "Váš vyhrazený AI asistent",
      status: "Právě odpovídá návštěvníkům", avgResp: "Průměrná reakce · 1,2 sekundy",
      weekly: "Zpracováno tento týden · 247 konverzací",
      botHello: "Dobrý den 👋 Jsem AI vaší společnosti. Zeptejte se mě na ceník, objednávky nebo dopravu!",
      userMsg: "Jak rychlá je vaše expresní doprava?",
      typing: "Expresní doprava · doručeno během", typing2: "24 hodin", typing3: "v metropolitních oblastech",
      source: "Zdroj: FAQ #3 · Zásady dopravy.pdf", refDocs: "Odkazované dokumenty · 2",
    },
  },
  logos: { title: "Důvěřuje nám stovky SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Hlavní schopnosti",
    title1: "Vše, co potřebujete,", title2: "již připraveno k použití",
    sub: "ChatAI Pro je nejrychlejší a nejjednodušší způsob, jak dát službu zákaznickou s AI na jakékoli webové stránky.",
    items: [
      { title: "Vlastní AI bot", desc: "Vyhrazený asistent s vaším jménem, barvou a uvítací zprávou — zákazníci mají pocit, že mluví s vámi.", tag: "S vaší značkou" },
      { title: "Jednořádkové vložení", desc: "Zkopírujte script tag do vašeho HTML. Pro spuštění není potřeba žádná práce vývojáře.", tag: "Žádná konfigurace" },
      { title: "Plug-and-play znalosti", desc: "Nahrajte PDF, prohledněte URL nebo napište FAQ — AI automaticky vybírá odpovědi z vašich dokumentů.", tag: "Chytré vyhledávání" },
      { title: "Přímé odpovědi", desc: "Indikátor přemýšlení a psaní, plynulé streamingové odpovědi — bez zpoždění.", tag: "<200ms" },
      { title: "Automatická vícejazyčnost", desc: "Návštěvníci se ptají v jakémkoli jazyce, bot odpovídá ve stejném — žádné nastavení.", tag: "40+ jazyků" },
      { title: "Živá analytika", desc: "Objem konverzací, nejčastější otázky, míra odpovědí AI — provoz na první pohled.", tag: "Na základě dat" },
    ],
    security: {
      badge: "🛡️ Podniková bezpečnost", title: "Vaše data nikdy neopustí váš tenant",
      desc: "Supabase Row-Level Security (RLS) izoluje data každého uživatele. Vaše dokumenty slouží pouze vašemu botu a nikdy netrénují žádný model. Volání API jsou HTTPS + Bearer Token od začátku do konce.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "Dostupnost služby" }, { k: "<200ms", l: "Průměrná reakce AI" }, { k: "AES-256", l: "Šifrování" }, { k: "SOC2", l: "Kompatibilita" }],
    },
  },
  how: {
    badge: "🚀 3 jednoduché kroky", title1: "Od registrace po provoz,", title2: "jen za 5 minut",
    steps: [
      { title: "Vytvořte si bota", text: "Vyberte jméno, barvu tématu a uvítací zprávu. Hotovo za 30 sekund." },
      { title: "Nakrmte ho vašimi dokumenty", text: "Vložte PDF, vložte URL nebo přímo napište pár záznamů FAQ." },
      { title: "Vložte na své stránky", text: "Zkopírujte jeden řádek scriptu do vašeho HTML. Vaše služba zákaznická s AI je v provozu." },
    ],
  },
  pricing: {
    badge: "⭐ Průhledné ceny", title1: "Vyberte si plán,", title2: "který odpovídá vaší firmě",
    sub: "Plán zdarma je navždy. Upgrade se nikdy neobnoví automaticky.",
    plans: {
      free: { name: "ZDARMA", price: "0", perMonth: "/měsíc", billing: "Měsíčně · Zrušení kdykoli", features: ["1 bot", "100 zpráv AI / měsíc", "5 dokumentů znalostí", "Widget s vaší značkou", "Podpora komunity"], cta: "Začít zdarma" },
      starter: { name: "STARTER", badge: "🔥 Nejpopulárnější", price: "49", perMonth: "/měsíc", billing: "Měsíčně · Zrušení kdykoli", features: ["2 boty", "3 000 zpráv AI / měsíc", "50 dokumentů znalostí", "Odebrat značku", "Základní analytika", "E-mailová podpora"], cta: "Upgrade" },
      growth: { name: "GROWTH", price: "129", perMonth: "/měsíc", billing: "Měsíčně · Zrušení kdykoli", features: ["5 botů", "10 000 zpráv AI / měsíc", "200 dokumentů znalostí", "Kompletní analytický dashboard", "Podpora více jazyků", "Prioritní podpora"], cta: "Upgrade" },
      agency: { name: "AGENCY", price: "299", perMonth: "/měsíc", billing: "Měsíčně · Zrušení kdykoli", features: ["Neomezený počet botů", "50 000 zpráv AI / měsíc", "Neomezené dokumenty", "Widget white-label", "Přístup k API", "Přidělený manažer účtu"], cta: "Upgrade" },
    },
  },
  testimonials: {
    badge: "⭐ Recenze", title: "Majitelé a inženýři to milují", rating: "Průměr 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Zakladatelka · Maison & Cie", text: "Dříve jsme měli dva pracovníci podpory na částečný úvazek. Nyní jeden bot ChatAI Pro řeší 80% běžných otázek.", initial: "M" },
      { name: "Jonas Weber", role: "Tech lead · Helio SaaS", text: "Od registrace po vložení na marketingové stránky trvalo 15 minut. Nahrávání dokumentů a vkládání kódu je super plynulé.", initial: "J" },
      { name: "Alessandro Rossi", role: "Majitel · Piazza Bistro", text: "Naši zákazníci se ptají v italštině, angličtině, němčině. Bot odpovídá ve stejném jazyce, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Stále máte otázky?", sub: "Sestavili jsme ty nejčastější.",
    items: [
      { q: "Potřebuji umět programovat?", a: "Vůbec ne. Registrovat se → vytvořit bota → nahrát dokumenty → zkopírovat script. Každý ne-technik to zvládne za 5 minut." },
      { q: "Jaké jazyky jsou podporovány?", a: "Angličtina, němčina, francouzština, španělština, italština, nizozemština, čínština, japonština a 40+ dalších. Bot automaticky detekuje jazyk návštěvníka a odpovídá ve stejném." },
      { q: "Jsou moje data v bezpečí?", a: "Vše je uloženo ve vašem Supabase tenantovi s Row-Level Security (RLS). Každý uživatel vidí pouze své vlastní boty a konverzace." },
      { q: "Mohu si to nejdříve vyzkoušet zdarma?", a: "Ano. Plán zdarma zahrnuje 1 bota, 5 dokumentů a 100 zpráv AI měsíčně — bez kreditní karty." },
      { q: "Mohu odstranit vaši značku?", a: "Ano. Plán Starter a vyšší podporují odstranění značky ChatAI Pro, takže zákazníci vidí pouze vaše jméno a logo." },
    ],
    contact: "Nenašli jste odpověď? Napište na support@chatai-pro.com — odpovídáme do 24 hodin.",
  },
  finalCta: {
    title: "Přiveďte službu zákaznickou s AI na své webové stránky ještě dnes",
    sub: "Začněte zdarma, hotovo za 5 minut. Bez kreditní karty, bez závazků.",
    primary: "Vytvořit zdarma účet", secondary: "Již máte účet · Přihlásit se",
    trust: ["Plán zdarma navždy", "Bez kreditní karty", "Nasazeno za 5 minut"],
  },
  footer: { rights: "ChatAI Pro — Všechna práva vyhrazena", privacy: "Zásady ochrany osobních údajů", terms: "Obchodní podmínky" },
  langSwitcher: { label: "Jazyk" },
};

const ru: Dict = {
  nav: { features: "Возможности", how: "Как это работает", pricing: "Тарифы", faq: "Частые вопросы", signIn: "Войти", getStarted: "Начать" },
  hero: {
    badge: "🇪🇺 Создано для европейских SMB · Теперь доступно по всему миру",
    titleLine1: "Настройте службу поддержки",
    titleLine2: "на базе AI, работающую 24/7",
    subtitle: "Загрузите PDF, укажите сайт компании или напишите несколько FAQ — ChatAI Pro развёрнет брендовый чатбот, отвечающий посетителям 24/7 и сокращающий ручную поддержку на 80%.",
    ctaPrimary: "Начать бесплатно · Без карты",
    ctaSecondary: "Смотреть демо",
    stats: [
      { n: "5 минут", label: "От регистрации до запуска" },
      { n: "80%", label: "FAQ обрабатывается автоматически" },
      { n: "40+", label: "Языков" },
      { n: "24/7", label: "Всегда онлайн" },
    ],
    chat: {
      brandTitle: "Здравствуйте · Bonjour", brandSub: "Ваш персональный AI-ассистент",
      status: "Отвечает посетителям прямо сейчас", avgResp: "Среднее время ответа · 1,2 секунды",
      weekly: "Обработано на этой неделе · 247 диалогов",
      botHello: "Привет 👋 Я — AI вашей компании. Спрашивайте меня о ценах, заказах или доставке!",
      userMsg: "Насколько быстрая ваша экспресс-доставка?",
      typing: "Экспресс-доставка · доставляется в течение", typing2: "24 часов", typing3: "в крупных городах",
      source: "Источник: FAQ #3 · Политика доставки.pdf", refDocs: "Справочные документы · 2",
    },
  },
  logos: { title: "Нам доверяют сотни SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ Основные возможности",
    title1: "Всё, что нужно,", title2: "уже настроено и готово",
    sub: "ChatAI Pro — это самый быстрый и простой способ запустить службу поддержки на базе AI на любом сайте.",
    items: [
      { title: "Кастомный AI-бот", desc: "Персональный ассистент с вашим именем, цветами и приветствием — клиенты чувствуют, что общаются с вами.", tag: "С брендом" },
      { title: "Вставка в одну строку", desc: "Скопируйте тег script в ваш HTML. Для запуска не нужна работа разработчика.", tag: "Без настроек" },
      { title: "База знаний plug-and-play", desc: "Загружайте PDF, парсите URL или пишите FAQ — AI автоматически ищет ответы в ваших документах.", tag: "Умный поиск" },
      { title: "Потоковые ответы", desc: "Индикатор «думает и печатает», плавные потоковые ответы — без задержек.", tag: "<200ms" },
      { title: "Автоматическая мультиязычность", desc: "Посетители спрашивают на любом языке — бот отвечает на том же, без настроек.", tag: "40+ языков" },
      { title: "Живая аналитика", desc: "Объём диалогов, популярные вопросы, процент ответов AI — работа видна с первого взгляда.", tag: "На основе данных" },
    ],
    security: {
      badge: "🛡️ Корпоративная безопасность", title: "Ваши данные никогда не покидают ваш tenant",
      desc: "Supabase Row-Level Security (RLS) изолирует данные каждого пользователя. Ваши документы служат только вашему боту и никогда не обучают модели. Вызовы API — HTTPS + Bearer Token end-to-end.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "Время работы сервиса" }, { k: "<200ms", l: "Средний ответ AI" }, { k: "AES-256", l: "Шифрование" }, { k: "SOC2", l: "Соответствие стандартам" }],
    },
  },
  how: {
    badge: "🚀 3 простых шага", title1: "От регистрации до запуска,", title2: "всего за 5 минут",
    steps: [
      { title: "Создайте своего бота", text: "Выберите имя, цвет темы и приветствие. Готово за 30 секунд." },
      { title: "Загрузите свои документы", text: "Перетащите PDF, вставьте URL или напишите несколько записей FAQ прямо на сайте." },
      { title: "Вставьте на свой сайт", text: "Скопируйте одну строку script в ваш HTML. Ваша служба поддержки на базе AI запущена." },
    ],
  },
  pricing: {
    badge: "⭐ Прозрачные тарифы", title1: "Выберите план,", title2: "подходящий вашему бизнесу",
    sub: "Бесплатный план — навсегда. Обновление никогда не продлевается автоматически.",
    plans: {
      free: { name: "БЕСПЛАТНО", price: "0", perMonth: "/месяц", billing: "Ежемесячно · Отмена в любое время", features: ["1 бот", "100 сообщений AI / месяц", "5 документов базы знаний", "Брендовый виджет", "Поддержка сообщества"], cta: "Начать бесплатно" },
      starter: { name: "STARTER", badge: "🔥 Самый популярный", price: "49", perMonth: "/месяц", billing: "Ежемесячно · Отмена в любое время", features: ["2 бота", "3 000 сообщений AI / месяц", "50 документов базы знаний", "Убрать бренд", "Базовая аналитика", "Поддержка по email"], cta: "Обновить" },
      growth: { name: "GROWTH", price: "129", perMonth: "/месяц", billing: "Ежемесячно · Отмена в любое время", features: ["5 ботов", "10 000 сообщений AI / месяц", "200 документов базы знаний", "Полная панель аналитики", "Поддержка нескольких языков", "Приоритетная поддержка"], cta: "Обновить" },
      agency: { name: "AGENCY", price: "299", perMonth: "/месяц", billing: "Ежемесячно · Отмена в любое время", features: ["Неограниченное число ботов", "50 000 сообщений AI / месяц", "Неограниченные документы", "Виджет white-label", "Доступ к API", "Персональный менеджер"], cta: "Обновить" },
    },
  },
  testimonials: {
    badge: "⭐ Отзывы", title: "Его любят владельцы и инженеры", rating: "Средняя оценка 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "Основатель · Maison & Cie", text: "Раньше у нас было два сотрудника поддержки на полставки. Теперь один бот ChatAI Pro решает 80% обычных вопросов.", initial: "M" },
      { name: "Jonas Weber", role: "Тимлид · Helio SaaS", text: "От регистрации до вставки на маркетинговый сайт прошло 15 минут. Загрузка документов и вставка кода работают суперплавно.", initial: "J" },
      { name: "Alessandro Rossi", role: "Владелец · Piazza Bistro", text: "Наши клиенты спрашивают на итальянском, английском, немецком. Бот отвечает на том же языке, 24/7.", initial: "A" },
    ],
  },
  faq: {
    title: "Остались вопросы?", sub: "Мы собрали самые частые из них.",
    items: [
      { q: "Нужно ли уметь программировать?", a: "Совсем нет. Зарегистрируйтесь → создайте бота → загрузите документы → скопируйте script. С этим справится любой не-техник за 5 минут." },
      { q: "Какие языки поддерживаются?", a: "Английский, немецкий, французский, испанский, итальянский, голландский, китайский, японский и ещё 40+. Бот автоматически определяет язык посетителя и отвечает на нём же." },
      { q: "Мои данные в безопасности?", a: "Всё хранится в вашем Supabase tenant с Row-Level Security (RLS). Каждый пользователь видит только своих ботов и свои диалоги." },
      { q: "Можно ли сначала попробовать бесплатно?", a: "Да. Бесплатный план включает 1 бота, 5 документов и 100 сообщений AI в месяц — без карты." },
      { q: "Можно ли убрать ваш бренд?", a: "Да. План Starter и выше поддерживают удаление бренда ChatAI Pro, так что клиенты видят только ваше имя и логотип." },
    ],
    contact: "Не нашли ответа? Пишите на support@chatai-pro.com — отвечаем в течение 24 часов.",
  },
  finalCta: {
    title: "Запустите службу поддержки на базе AI на своём сайте уже сегодня",
    sub: "Начните бесплатно, готово за 5 минут. Без карты, без обязательств.",
    primary: "Создать бесплатный аккаунт", secondary: "Уже есть аккаунт · Войти",
    trust: ["Бесплатный план навсегда", "Без карты", "Развёртывание за 5 минут"],
  },
  footer: { rights: "ChatAI Pro — Все права защищены", privacy: "Политика конфиденциальности", terms: "Условия использования" },
  langSwitcher: { label: "Язык" },
};



const ar: Dict = {
  nav: { features: "المزايا", how: "كيف يعمل", pricing: "الأسعار", faq: "الأسئلة الشائعة", signIn: "تسجيل الدخول", getStarted: "ابدأ الآن" },
  hero: {
    badge: "🇪🇺 مصمم لشركات SMB الأوروبية · متاح عالمياً",
    titleLine1: "قم بإعداد خدمة عملاء تعمل بالذكاء الاصطناعي",
    titleLine2: "على مدار الساعة",
    subtitle: "ارفع ملف PDF، أو رابط موقع الشركة، أو اكتب بعض الأسئلة الشائعة — ChatAI Pro يطلق بوت دردشة بعلامتك التجارية يجيب على الزوار على مدار الساعة ويقلل الدعم اليدوي بنسبة 80%.",
    ctaPrimary: "ابدأ مجاناً · بدون بطاقة ائتمان",
    ctaSecondary: "شاهد العرض",
    stats: [
      { n: "5 دقائق", label: "من التسجيل حتى الإطلاق" },
      { n: "80%", label: "من الأسئلة تلقائياً" },
      { n: "+40", label: "لغة" },
      { n: "24/7", label: "متصل دائماً" },
    ],
    chat: {
      brandTitle: "مرحباً · Bonjour", brandSub: "مساعدك الشخصي بالذكاء الاصطناعي",
      status: "يُجيب الزوار الآن", avgResp: "متوسط الاستجابة · ١,٢ ثانية",
      weekly: "تمت معالجتها هذا الأسبوع · 247 محادثة",
      botHello: "مرحباً 👋 أنا الذكاء الاصطناعي الخاص بشركتك. اسألني عن الأسعار، الطلبات أو التوصيل!",
      userMsg: "ما سرعة التوصيل السريع؟",
      typing: "التوصيل السريع · يتم التوصيل خلال", typing2: "٢٤ ساعة", typing3: "في المدن الكبرى",
      source: "المصدر: FAQ #3 · سياسة التوصيل.pdf", refDocs: "الوثائق المرجعية · ٢",
    },
  },
  logos: { title: "يثق به مئات الشركات SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ الإمكانات الأساسية",
    title1: "كل ما تحتاجه،", title2: "مُجهز وجاهز",
    sub: "ChatAI Pro هي أسرع وأسهل طريقة لإطلاق خدمة عملاء بالذكاء الاصطناعي على أي موقع.",
    items: [
      { title: "بوت ذكاء اصطناعي مخصص", desc: "مساعد مخصص باسمك، ألوانك ورسالة ترحيب — يشعر عملاؤك أنهم يتحدثون معك.", tag: "بعلامتك التجارية" },
      { title: "تضمين في سطر واحد", desc: "انسخ tag script إلى HTML الخاص بك. لا تحتاج إلى عمل مطور لتبدأ العمل.", tag: "بدون إعدادات" },
      { title: "قاعدة معارف جاهزة", desc: "ارفع PDF، اجعل URL، أو اكتب أسئلة شائعة — الذكاء الاصطناعي يسحب الإجابات تلقائياً من وثائقك.", tag: "بحث ذكي" },
      { title: "ردود فورية", desc: "مؤشر يفكر ويكتب، ردود بث سلس — بدون تأخير.", tag: "<200ms" },
      { title: "متعدد اللغات تلقائياً", desc: "يسألك الزوار بأي لغة، ويرد البوت بنفس اللغة — بدون إعدادات.", tag: "+40 لغة" },
      { title: "تحليلات مباشرة", desc: "حجم المحادثات، أكثر الأسئلة شيوعاً، نسبة ردود الذكاء الاصطناعي — العمل واضح من لمحة.", tag: "قائم على البيانات" },
    ],
    security: {
      badge: "🛡️ أمان للمؤسسات", title: "بياناتك لا تغادر مساحتك أبداً",
      desc: "يساعدك Row-Level Security من Supabase على عزل بيانات كل مستخدم. وثائقك لا تخدم سوى بوتك ولا تُستخدم أبداً لتدريب أي نموذج. الاستدعاءات API تمر عبر HTTPS + Bearer Token من البداية إلى النهاية.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "معدل تشغيل الخدمة" }, { k: "<200ms", l: "متوسط استجابة الذكاء الاصطناعي" }, { k: "AES-256", l: "التشفير" }, { k: "SOC2", l: "الامتثال" }],
    },
  },
  how: {
    badge: "🚀 ٣ خطوات سهلة", title1: "من التسجيل حتى الإطلاق،", title2: "في ٥ دقائق فقط",
    steps: [
      { title: "أنشئ بوتك", text: "اختر اسم، ألوان القالب ورسالة ترحيب. تنتهي في ٣٠ ثانية." },
      { title: "أعطه وثائقك", text: "اسحب وأفلت PDF، أو الصق URL، أو اكتب مباشرة بعض الأسئلة الشائعة." },
      { title: "ضمّنه في موقعك", text: "انسخ سطر واحد من script إلى HTML الخاص بك. خدمة عملائك بالذكاء الاصطناعي مُطلقة." },
    ],
  },
  pricing: {
    badge: "⭐ أسعار شفافة", title1: "اختر الباقة", title2: "المناسبة لمشروعك",
    sub: "الباقة المجانية للأبد. الترقية لا تتجدد تلقائياً أبداً.",
    plans: {
      free: { name: "مجاني", price: "0", perMonth: "/شهر", billing: "شهري · إلغاء في أي وقت", features: ["بوت واحد", "١٠٠ رسالة بالذكاء الاصطناعي / شهر", "٥ وثائق معارف", "ودجيت بعلامتك التجارية", "دعم المجتمع"], cta: "ابدأ مجاناً" },
      starter: { name: "مبتدئ", badge: "🔥 الأكثر شيوعاً", price: "49", perMonth: "/شهر", billing: "شهري · إلغاء في أي وقت", features: ["بوتان", "٣٠٠٠ رسالة بالذكاء الاصطناعي / شهر", "٥٠ وثيقة معارف", "إزالة العلامة التجارية", "تحليلات أساسية", "دعم عبر البريد"], cta: "ترقية" },
      growth: { name: "نمو", price: "129", perMonth: "/شهر", billing: "شهري · إلغاء في أي وقت", features: ["٥ بوتات", "١٠٠٠٠ رسالة بالذكاء الاصطناعي / شهر", "٢٠٠ وثيقة معارف", "لوحة تحليلات كاملة", "دعم متعدد اللغات", "دعم ذو أولوية"], cta: "ترقية" },
      agency: { name: "وكالة", price: "299", perMonth: "/شهر", billing: "شهري · إلغاء في أي وقت", features: ["بوتات غير محدودة", "٥٠٠٠٠ رسالة بالذكاء الاصطناعي / شهر", "وثائق غير محدودة", "ودجيت بالعلامة البيضاء", "وصول إلى API", "مدير حساب مخصص"], cta: "ترقية" },
    },
  },
  testimonials: {
    badge: "⭐ التقييمات", title: "يحبه المالكون والمُهندسون", rating: "متوسط ٤,٩ من ٥",
    items: [
      { name: "Marie Dupont", role: "مؤسسة · Maison & Cie", text: "كان لدينا موظفا دعم بدوام جزئي. الآن بوت ChatAI Pro يعالج ٨٠٪ من الأسئلة العادية.", initial: "M" },
      { name: "Jonas Weber", role: "قائد تقني · Helio SaaS", text: "استغرق الأمر ١٥ دقيقة من التسجيل حتى التضمين على الموقع التسويقي. تحميل الوثائق وإدراج الكود سلس جداً.", initial: "J" },
      { name: "Alessandro Rossi", role: "مالك · Piazza Bistro", text: "عملاؤنا يسألون بالإيطالية، الإنجليزية، الألمانية. البوت يرد بنفس اللغة، على مدار الساعة.", initial: "A" },
    ],
  },
  faq: {
    title: "لا تزال لديك أسئلة؟", sub: "لقد جمعنا الأسئلة الأكثر شيوعاً.",
    items: [
      { q: "هل أحتاج إلى معرفة كيفية البرمجة؟", a: "على الإطلاق لا. سجّل → أنشئ بوتاً → ارفع وثائق → انسخ script. أي شخص غير تقني يمكنه فعل ذلك في ٥ دقائق." },
      { q: "ما اللغات المدعومة؟", a: "الإنجليزية، الألمانية، الفرنسية، الإسبانية، الإيطالية، الهولندية، الصينية، اليابانية وأكثر من ٤٠ لغة أخرى. يكتشف البوت تلقائياً لغة الزائر ويُجيب بنفس اللغة." },
      { q: "هل بياناتي آمنة؟", a: "كل شيء يبقى في مساحة Supabase الخاصة بك مع Row-Level Security (RLS). يرى كل مستخدم بوتاته ومحادثاته الخاصة فقط." },
      { q: "هل يمكنني التجربة أولاً مجاناً؟", a: "نعم. الباقة المجانية تشمل ١ بوت، ٥ وثائق و١٠٠ رسالة بالذكاء الاصطناعي شهرياً — بدون بطاقة ائتمان." },
      { q: "هل يمكنني إزالة علامتك التجارية؟", a: "نعم. تدعم باقة المبتدئ فما فوق إزالة علامة ChatAI Pro التجارية، ليرى عملاؤك اسمك وشعارك فقط." },
    ],
    contact: "لم تجد الإجابة؟ أرسل بريداً إلى support@chatai-pro.com — نُجيب خلال ٢٤ ساعة.",
  },
  finalCta: {
    title: "أطلق خدمة عملاء بالذكاء الاصطناعي على موقعك اليوم",
    sub: "ابدأ مجاناً، ينتهي في ٥ دقائق. بدون بطاقة ائتمان، بدون التزامات.",
    primary: "أنشئ حساباً مجانياً", secondary: "مستخدم حالي · تسجيل الدخول",
    trust: ["باقة مجانية للأبد", "بدون بطاقة ائتمان", "إطلاق في ٥ دقائق"],
  },
  footer: { rights: "ChatAI Pro · جميع الحقوق محفوظة", privacy: "سياسة الخصوصية", terms: "شروط الخدمة" },
  langSwitcher: { label: "اللغة" },
};

const hi: Dict = {
  nav: { features: "विशेषताएँ", how: "कैसे काम करता है", pricing: "मूल्य निर्धारण", faq: "सामान्य प्रश्न", signIn: "साइन इन", getStarted: "शुरू करें" },
  hero: {
    badge: "🇪🇺 यूरोपीय SMB के लिए बनाया गया · अब विश्व स्तर पर उपलब्ध",
    titleLine1: "AI-संचालित ग्राहक सेवा",
    titleLine2: "सेट करें 24/7 चल रही",
    subtitle: "PDF अपलोड करें, कंपनी की वेबसाइट पर पॉइंट करें, या कुछ FAQ लिखें — ChatAI Pro आपके ब्रांडेड चैटबॉट को लॉन्च करता है जो 24/7 आगंतुकों को जवाब देता है और मैनुअल सपोर्ट को 80% तक घटाता है।",
    ctaPrimary: "मुफ्त में शुरू करें · क्रेडिट कार्ड नहीं",
    ctaSecondary: "डेमो देखें",
    stats: [
      { n: "5 मिनट", label: "साइनअप से लाइव तक" },
      { n: "80%", label: "FAQs स्वचालित" },
      { n: "40+", label: "भाषाएँ" },
      { n: "24/7", label: "हमेशा ऑन" },
    ],
    chat: {
      brandTitle: "नमस्ते · Bonjour", brandSub: "आपका समर्पित AI सहायक",
      status: "फिलहाल आगंतुकों को जवाब दे रहा है", avgResp: "औसत प्रतिक्रिया · 1.2 सेकंड",
      weekly: "इस सप्ताह संभाला गया · 247 बातचीत",
      botHello: "नमस्ते 👋 मैं आपकी कंपनी का AI हूं। मुझे मूल्य, ऑर्डर या शिपिंग के बारे में पूछें!",
      userMsg: "आपकी एक्सप्रेस शिपिंग कितनी तेज़ है?",
      typing: "एक्सप्रेस शिपिंग · भेज दिया गया", typing2: "24 घंटे", typing3: "महानगरों में",
      source: "स्रोत: FAQ #3 · शिपिंग नीति.pdf", refDocs: "संदर्भ दस्तावेज़ · 2",
    },
  },
  logos: { title: "सैकड़ों SMB पर भरोसा", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ मुख्य क्षमताएँ",
    title1: "आपको जो कुछ चाहिए,", title2: "सब कुछ सेट और तैयार",
    sub: "ChatAI Pro किसी भी वेबसाइट पर AI ग्राहक सेवा लॉन्च करने का सबसे तेज़ और आसान तरीका है।",
    items: [
      { title: "कस्टम AI बॉट", desc: "आपके नाम, रंगों और स्वागत संदेश के साथ समर्पित सहायक — ग्राहक महसूस करते हैं कि वे आपसे बात कर रहे हैं।", tag: "ब्रांडेड" },
      { title: "एक-लाइन एम्बेड", desc: "अपने HTML में script टैग कॉपी करें। लाइव होने के लिए किसी डेवलपर के काम की ज़रूरत नहीं।", tag: "कोई कॉन्फ़िगरेशन नहीं" },
      { title: "प्लग-एंड-प्ले नॉलेज", desc: "PDF अपलोड करें, URL स्क्रैप करें, या FAQ लिखें — AI आपके दस्तावेज़ों से जवाब अपने आप निकालता है।", tag: "स्मार्ट खोज" },
      { title: "तुरंत जवाब", desc: "'सोच और टाइप' इंडिकेटर, स्मूद स्ट्रीमिंग जवाब — कोई देरी नहीं।", tag: "<200ms" },
      { title: "स्वचालित बहुभाषी", desc: "आगंतुक किसी भी भाषा में पूछते हैं, बॉट उसी भाषा में जवाब देता है — कोई सेटअप नहीं।", tag: "40+ भाषाएँ" },
      { title: "लाइव एनालिटिक्स", desc: "बातचीत का मात्रा, शीर्ष प्रश्न, AI जवाब दर — एक नज़र में ऑपरेशन दिख।", tag: "डेटा-संचालित" },
    ],
    security: {
      badge: "🛡️ एंटरप्राइज़ सुरक्षा", title: "आपका डेटा आपके टेनेंट से कभी नहीं निकलता",
      desc: "Supabase Row-Level Security (RLS) प्रत्येक उपयोगकर्ता के डेटा को अलग करती है। आपके दस्तावेज़ केवल आपके बॉट की सेवा करते हैं और कभी किसी मॉडल को ट्रेन नहीं करते। API कॉल HTTPS + Bearer Token end-to-end हैं।",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "सेवा अपटाइम" }, { k: "<200ms", l: "औसत AI प्रतिक्रिया" }, { k: "AES-256", l: "एन्क्रिप्शन" }, { k: "SOC2", l: "अनुपालन" }],
    },
  },
  how: {
    badge: "🚀 3 आसान स्टेप", title1: "साइनअप से लाइव,", title2: "सिर्फ 5 मिनट में",
    steps: [
      { title: "अपना बॉट बनाएं", text: "नाम, थीम रंग और स्वागत संदेश चुनें। 30 सेकंड में हो जाएगा।" },
      { title: "अपने दस्तावेज़ खिलाएं", text: "PDF छोड़ें, URL चिपकाएं, या सीधे कुछ FAQ एंट्री लिखें।" },
      { title: "अपनी साइट पर एम्बेड करें", text: "एक लाइन script को अपने HTML में कॉपी करें। आपकी AI ग्राहक सेवा लाइव है।" },
    ],
  },
  pricing: {
    badge: "⭐ पारदर्शी मूल्य", title1: "अपने व्यवसाय के आकार", title2: "के अनुसार योजना चुनें",
    sub: "फ्री प्लान हमेशा के लिए। अपग्रेड कभी ऑटो-रिन्यू नहीं होते।",
    plans: {
      free: { name: "FREE", price: "0", perMonth: "/माह", billing: "मासिक · कभी भी रद्द करें", features: ["1 बॉट", "100 AI संदेश / माह", "5 नॉलेज दस्तावेज़", "ब्रांडेड विजेट", "कम्यूनिटी सपोर्ट"], cta: "मुफ्त में शुरू करें" },
      starter: { name: "STARTER", badge: "🔥 सबसे लोकप्रिय", price: "49", perMonth: "/माह", billing: "मासिक · कभी भी रद्द करें", features: ["2 बॉट", "3,000 AI संदेश / माह", "50 नॉलेज दस्तावेज़", "ब्रांड हटाएँ", "बुनियादी एनालिटिक्स", "ईमेल सपोर्ट"], cta: "अपग्रेड" },
      growth: { name: "GROWTH", price: "129", perMonth: "/माह", billing: "मासिक · कभी भी रद्द करें", features: ["5 बॉट", "10,000 AI संदेश / माह", "200 नॉलेज दस्तावेज़", "फुल एनालिटिक्स डैशबोर्ड", "बहुभाषी सपोर्ट", "प्रायोरिटी सपोर्ट"], cta: "अपग्रेड" },
      agency: { name: "AGENCY", price: "299", perMonth: "/माह", billing: "मासिक · कभी भी रद्द करें", features: ["असीमित बॉट", "50,000 AI संदेश / माह", "असीमित दस्तावेज़", "व्हाइट-लेबल विजेट", "API एक्सेस", "डेडीकेटेड अकाउंट मैनेजर"], cta: "अपग्रेड" },
    },
  },
  testimonials: {
    badge: "⭐ समीक्षाएँ", title: "मालिक और इंजीनियर दोनों पसंद करते हैं", rating: "औसत 4.9 / 5",
    items: [
      { name: "Marie Dupont", role: "फाउंडर · Maison & Cie", text: "पहले हमारे पास दो पार्ट-टाइम सपोर्ट स्टाफ थे। अब एक ChatAI Pro बॉट 80% सामान्य सवालों को हैंडल करता है।", initial: "M" },
      { name: "Jonas Weber", role: "टेक लीड · Helio SaaS", text: "साइनअप से मार्केटिंग साइट पर एम्बेड होने तक 15 मिनट लगे। दस्तावेज़ अपलोड और कोड स्लॉटिंग सुपर स्मूद है।", initial: "J" },
      { name: "Alessandro Rossi", role: "मालिक · Piazza Bistro", text: "हमारे ग्राहक इटालियन, अंग्रेजी, जर्मन में पूछते हैं। बॉट उसी भाषा में जवाब देता है, 24/7।", initial: "A" },
    ],
  },
  faq: {
    title: "कोई सवाल है?", sub: "हमने सबसे सामान्य एकत्र किए हैं।",
    items: [
      { q: "क्या मुझे कोड लिखना आना चाहिए?", a: "बिल्कुल नहीं। साइन अप → बॉट बनाएं → दस्तावेज़ अपलोड → script कॉपी। कोई भी गैर-तकनीकी व्यक्ति 5 मिनट में ऐसा कर सकता है।" },
      { q: "कौन सी भाषाएँ समर्थित हैं?", a: "अंग्रेजी, जर्मन, फ्रेंच, स्पैनिश, इटालियन, डच, चीनी, जापानी और 40+ अधिक। बॉट आगंतुक की भाषा को अपने आप पहचानता है और उसी भाषा में जवाब देता है।" },
      { q: "क्या मेरा डेटा सुरक्षित है?", a: "सब कुछ आपके Supabase टेनेंट में Row-Level Security (RLS) के साथ रहता है। हर उपयोगकर्ता केवल अपने खुद के बॉट और बातचीत देख सकता है।" },
      { q: "क्या मैं पहले मुफ्त में आज़मा सकता हूँ?", a: "हाँ। फ्री प्लान में 1 बॉट, 5 दस्तावेज़ और 100 AI संदेश प्रति माह शामिल — बिना क्रेडिट कार्ड के।" },
      { q: "क्या मैं आपका ब्रांड हटा सकता हूँ?", a: "हाँ। स्टार्टर प्लान और उससे ऊपर ChatAI Pro ब्रांड हटाने की सुविधा देते हैं, ताकि ग्राहक केवल आपका नाम और लोगो देखें।" },
    ],
    contact: "जवाब नहीं मिला? support@chatai-pro.com पर ईमेल भेजें — हम 24 घंटे में जवाब देते हैं।",
  },
  finalCta: {
    title: "आज ही अपनी वेबसाइट पर AI ग्राहक सेवा लॉन्च करें",
    sub: "मुफ्त में शुरू करें, 5 मिनट में तैयार। बिना क्रेडिट कार्ड, बिना बंधन।",
    primary: "मुफ्त खाता बनाएँ", secondary: "मौजूदा उपयोगकर्ता · साइन इन",
    trust: ["हमेशा के लिए फ्री प्लान", "कोई क्रेडिट कार्ड नहीं", "5 मिनट में तैनात"],
  },
  footer: { rights: "ChatAI Pro · सर्वाधिकार सुरक्षित", privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें" },
  langSwitcher: { label: "भाषा" },
};

const he: Dict = {
  nav: { features: "תכונות", how: "איך זה עובד", pricing: "מחירון", faq: "שאלות נפוצות", signIn: "התחברות", getStarted: "להתחיל" },
  hero: {
    badge: "🇪🇺 נבנה עבור SMB באירופה · זמין עכשיו גלובאלית",
    titleLine1: "הקמו שירות לקוחות",
    titleLine2: "מבוסס-AI שפעיל 24/7",
    subtitle: "העלו PDF, הצביעו לאתר החברה, או כתבו כמה שאלות נפוצות — ChatAI Pro משיק צ'אטבוט מותג שעונה למבקרים 24/7 ומקטין את התמיכה הידנית ב-80%.",
    ctaPrimary: "התחילו בחינם · בלי כרטיס אשראי",
    ctaSecondary: "צפו בדמו",
    stats: [
      { n: "5 דקות", label: "מההרשמה ועד לעיל" },
      { n: "80%", label: "שאלות נפוצות אוטומטיות" },
      { n: "40+", label: "שפות" },
      { n: "24/7", label: "תמיד פעיל" },
    ],
    chat: {
      brandTitle: "שלום · Bonjour", brandSub: "עוזר ה-AI שלך",
      status: "עונה עכשיו למבקרים", avgResp: "תגובה ממוצעת · 1.2 שניות",
      weekly: "טופל השבוע · 247 שיחות",
      botHello: "שלום 👋 אני ה-AI של החברה שלכם. שאל אותי על מחירים, הזמנות או משלוחים!",
      userMsg: "כמה מהיר המשלוח המהיר שלכם?",
      typing: "משלוח מהיר · נמסר בתוך", typing2: "24 שעות", typing3: "במטרופולינים",
      source: "מקור: FAQ #3 · מדיניות משלוחים.pdf", refDocs: "מסמכים מקוריים · 2",
    },
  },
  logos: { title: "בטוחים על ידי מאות SMB", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
  features: {
    badge: "✨ יכולות ליבה",
    title1: "כל מה שאתם צריכים,", title2: "כבר מוכן",
    sub: "ChatAI Pro הוא הדרך המהירה והפשוטה ביותר להשיק שירות לקוחות מבוסס-AI באתר.",
    items: [
      { title: "בוט AI מותאם", desc: "עוזר ייחודי עם השם, הצבעים והודעת ברוכים הבאים שלכם — לקוחות מרגישים שהם מדברים איתכם.", tag: "מותג" },
      { title: "הטמעה בשורה אחת", desc: "העתיקו את תגית script ל-HTML שלכם. אין צורך בעבודה של מפתח כדי לעבור ללייב.", tag: "בלי הגדרות" },
      { title: "בסיס ידע plug-and-play", desc: "העלו PDF, גרפו URL, או כתבו שאלות נפוצות — ה-AI מושך תשובות אוטומטית מהמסמכים שלכם.", tag: "חיפוש חכם" },
      { title: "תשובות ישירות", desc: "אינדיקטור 'חושב ומקליד', תשובות סטרימינג חלקות — בלי השהיה.", tag: "<200ms" },
      { title: "רב לשוני אוטומטי", desc: "מבקרים שואלים בכל שפה, הבוט עונה באותה שפה — בלי הגדרות.", tag: "40+ שפות" },
      { title: "אנליטיקה בלייב", desc: "נפח שיחות, השאלות המובילות, שיעור תשובות ה-AI — התפעול נראה במבט ראשון.", tag: "מבוסס נתונים" },
    ],
    security: {
      badge: "🛡️ ביטחון ארגוני", title: "הנתונים שלך אף פעם לא עוזבים את הטננט שלך",
      desc: "Row-Level Security (RLS) של Supabase מבודדת את הנתונים של כל משתמש. המסמכים שלך משרתים רק את הבוט שלך ולעולם לא מאמנים מודל. קריאות API הן HTTPS + Bearer Token מקצה לקצה.",
      chips: ["🔒 Row-level security (RLS)", "🔐 API Key auth", "🛡️ Data isolation", "🇪🇺 GDPR-ready"],
      stats: [{ k: "99.9%", l: "זמינות שירות" }, { k: "<200ms", l: "תגובת AI ממוצעת" }, { k: "AES-256", l: "הצפנה" }, { k: "SOC2", l: "תאימות" }],
    },
  },
  how: {
    badge: "🚀 3 שלבים פשוטים", title1: "מההרשמה ועד ללייב,", title2: "רק 5 דקות",
    steps: [
      { title: "צרו את הבוט שלכם", text: "בחרו שם, צבע נושא והודעת ברוכים הבאים. נעשה ב-30 שניות." },
      { title: "האכילו אותו במסמכים", text: "גררו PDF, הדביקו URL, או כתבו ישירות כמה רשומות FAQ." },
      { title: "הטמיעו באתר שלכם", text: "העתיקו שורת script אחת ל-HTML שלכם. שירות הלקוחות עם AI שלכם בלייב." },
    ],
  },
  pricing: {
    badge: "⭐ מחיר שקוף", title1: "בחרו תוכנית", title2: "שמתאימה לגודל העסק שלכם",
    sub: "התוכנית החינמית לנצח. שדרוגים לעולם לא מתחדשים אוטומטית.",
    plans: {
      free: { name: "חינמית", price: "0", perMonth: "/חודש", billing: "חודשי · ביטול בכל עת", features: ["1 בוט", "100 הודעות AI / חודש", "5 מסמכי ידע", "וידג'ט מותג", "תמיכה קהילתית"], cta: "התחילו בחינם" },
      starter: { name: "STARTER", badge: "🔥 הכי פופולרי", price: "49", perMonth: "/חודש", billing: "חודשי · ביטול בכל עת", features: ["2 בוטים", "3,000 הודעות AI / חודש", "50 מסמכי ידע", "הסר מותג", "אנליטיקה בסיסית", "תמיכה באימייל"], cta: "שדרוג" },
      growth: { name: "GROWTH", price: "129", perMonth: "/חודש", billing: "חודשי · ביטול בכל עת", features: ["5 בוטים", "10,000 הודעות AI / חודש", "200 מסמכי ידע", "לוח בקרה אנליטי מלא", "תמיכה רב לשונית", "תמיכה בעדיפות גבוהה"], cta: "שדרוג" },
      agency: { name: "AGENCY", price: "299", perMonth: "/חודש", billing: "חודשי · ביטול בכל עת", features: ["בלתי מוגבל בוטים", "50,000 הודעות AI / חודש", "מסמכים בלתי מוגבלים", "וידג'ט לבן", "גישה API", "מנהל חשבון ייעודי"], cta: "שדרוג" },
    },
  },
  testimonials: {
      badge: "⭐ ביקורות", title: "בעלים ומהנדסים אוהבים", rating: "ממוצע 4.9 / 5",
      items: [
        { name: "Marie Dupont", role: "מייסדת · Maison & Cie", text: "היו לנו שני עובדי תמיכה במשרה חלקית. עכשיו בוט ChatAI Pro אחד מטפל ב-80% מהשאלות הרגילות.", initial: "M" },
        { name: "Jonas Weber", role: "טכנ ליד · Helio SaaS", text: "מההרשמה ועד ההטמעה באתר שיווקי עברו 15 דקות. העלאת מסמכים ושיבוץ קוד חלקים במיוחד.", initial: "J" },
        { name: "Alessandro Rossi", role: "בעלים · Piazza Bistro", text: "הלקוחות שלנו שואלים באיטלקית, אנגלית, גרמנית. הבוט עונה באותה שפה, 24/7.", initial: "A" },
      ],
    },
    faq: {
      title: "יש לך עוד שאלות?", sub: "הרכבנו את הנפוצות ביותר.",
      items: [
        { q: "האם אני צריך לדעת לפתח?", a: "בכלל לא. הרשמה → יצירת בוט → העלאת מסמכים → העתקת script. כל אדם לא-טכני יכול לעשות את זה ב-5 דקות." },
        { q: "אילו שפות נתמכות?", a: "אנגלית, גרמנית, צרפתית, ספרדית, איטלקית, הולנדית, סינית, יפנית ועוד 40+. הבוט מזהה אוטומטית את שפת המבקר ועונה באותה שפה." },
        { q: "האם הנתונים שלי בטוחים?", a: "הכל נשאר בטננט Supabase שלך עם Row-Level Security (RLS). כל משתמש רואה רק את הבוטים ושיחות משלו." },
        { q: "האם אני יכול לנסות תחילה בחינם?", a: "כן. התוכנית החינמית כוללת 1 בוט, 5 מסמכים ו-100 הודעות AI בחודש — בלי כרטיס אשראי." },
        { q: "האם אני יכול להסיר את המותג שלכם?", a: "כן. תוכנית Starter ומעלה תומכות בהסרת המותג ChatAI Pro, כדי שלקוחות ירקו רק את השם והלוגו שלכם." },
      ],
      contact: "לא מצאתם תשובה? שלחו אימייל ל- support@chatai-pro.com — אנו עונים בתוך 24 שעות.",
    },
    finalCta: {
      title: "השיקו שירות לקוחות מבוסס-AI באתר שלכם היום",
      sub: "התחילו בחינם, נעשה ב-5 דקות. בלי כרטיס אשראי, בלי התחייבויות.",
      primary: "צרו חשבון בחינם", secondary: "משתמש קיים · התחברות",
      trust: ["תוכנית חינמית לנצח", "בלי כרטיס אשראי", "פריסה ב-5 דקות"],
    },
    footer: { rights: "ChatAI Pro · כל הזכויות שמורות", privacy: "מדיניות פרטיות", terms: "תנאי שימוש" },
    langSwitcher: { label: "שפה" },
};


export const translations: Record<Locale, Dict> = {
  zh,
  en,
  de,
  fr,
  it,
  es,
  ja,
  ko,
  pt,
  nl,
  sv,
  pl,
  tr,
  th,
  vi,
  id,
  cs,
  ru,
  ar,
  hi,
  he,
};
