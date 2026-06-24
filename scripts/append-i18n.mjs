import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
const src = fs.readFileSync(target, "utf-8");

// --- 15 种新语言字典（严格匹配 Dict 结构）---
const newDicts = `
const ja: Dict = {
  nav: { features: "機能", how: "使い方", pricing: "料金プラン", faq: "よくある質問", signIn: "サインイン", getStarted: "今すぐ始める" },
  hero: {
    badge: "🇪🇺 ヨーロッパの中小企業向け · 現在世界中で利用可能",
    titleLine1: "いつでも対応可能な",
    titleLine2: "AIカスタマーサービスを構築",
    subtitle:
      "PDFをアップロードするか、自社サイトを指定するか、FAQをいくつか記述するだけ — ChatAI Proがブランド化されたチャットボットを配置し、24時間365日訪問者の質問に対応し、手動サポートを80%削減します。",
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
    title1: "必要なすべてを、", title2: "すぐに使える状態で",
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
    subtitle:
      "PDF를 업로드하거나, 회사 웹사이트를 지정하거나, FAQ를 몇 가지 작성하기만 하면 — ChatAI Pro가 브랜드화된 챗봇을 배포하여 24시간 365일 방문자의 질문에 답변하고, 수동 지원을 80% 줄여줍니다.",
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
    subtitle:
      "Envie PDFs, indique o site da sua empresa ou escreva algumas FAQs — ChatAI Pro implanta um chatbot com a sua marca que responde aos visitantes 24 horas por dia, 7 dias por semana, reduzindo o atendimento manual em 80%.",
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
      free: { name: "FREE", price: "0", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["1 bot", "100 mensagens IA / mês", "5 documentos de conhecimento", "Widget com sua marca", "Suporte da comunidade"], cta: "Começar grátis" },
      starter: { name: "STARTER", badge: "🔥 Mais popular", price: "49", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["2 bots", "3.000 mensagens IA / mês", "50 documentos de conhecimento", "Remover marca", "Análise básica", "Suporte por e-mail"], cta: "Atualizar" },
      growth: { name: "GROWTH", price: "129", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["5 bots", "10.000 mensagens IA / mês", "200 documentos de conhecimento", "Painel de análise completo", "Suporte multilíngue", "Suporte prioritário"], cta: "Atualizar" },
      agency: { name: "AGENCY", price: "299", perMonth: "/mês", billing: "Mensal · Cancele quando quiser", features: ["Bots ilimitados", "50.000 mensagens IA / mês", "Documentos ilimitados", "Widget white-label", "Acesso à API", "Gerente de conta dedicado"], cta: "Atualizar" },
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
    trust: ["Plano gratuito para sempre", "Sem cartão de crédito", "Implantado em 5 min"],
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
    subtitle:
      "Upload PDF's, verwijs naar uw bedrijfswebsite of schrijf enkele FAQ's — ChatAI Pro zet een chatbot met uw merk op die 24/7 bezoekers beantwoordt en handmatige ondersteuning met 80% vermindert.",
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
      { title: "Inbinden in één regel", desc: "Kopieer een script-tag in uw HTML. Geen ontwikkelwerk nodig om live te gaan.", tag: "Geen configuratie" },
      { title: "Plug-and-play kennisbank", desc: "Upload PDF's, crawl URL's of schrijf FAQ's — de AI haalt automatisch antwoorden uit uw documenten.", tag: "Slimme opzoeking" },
      { title: "Streaming antwoorden", desc: "Denk-en-type-indicator, vloeiende streaming reacties — geen vertraging.", tag: "<200ms" },
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
    title: "Nog vragen?", sub: "We hebben de meest voorkomende verzameld.",
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
    badge: "🇪🇺 Byggt för europeiska SMF-företag · Nu tillgängligt globalt",
    titleLine1: "Träna en AI-baserad",
    titleLine2: "kundtjänst som alltid finns tillgänglig",
    subtitle:
      "Ladda upp PDF:er, peka mot företagets webbplats eller skriv några FAQ — ChatAI Pro driftsätter en chatbot med er varumärke som svarar besökare dygnet runt och minskar manuell support med 80%.",
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
  logos: { title: "Förtrodd av hundratals SMF-företag", list: ["Maison & Cie", "Helio SaaS", "Piazza Bistro", "Nordic Brew", "Atlas Tech", "Bonjour Paris"] },
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
    titleLine1: "Wyszkolaj zawsze dostępną",
    titleLine2: "AI do obsługi klienta",
    subtitle:
      "Prześlij pliki PDF, wskaż witrynę firmy lub napisz kilka FAQ — ChatAI Pro wdraża czatbota z Twoją marką, który odpowiada odwiedzającym 24/7 i ogranicza obsługę ręczną o 80%.",
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
      starter: { name: "STARTER", badge: "🔥 Najpopularniejszy", price: "49", perMonth: "/miesiąc", billing: "M