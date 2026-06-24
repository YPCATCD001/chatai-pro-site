// Script to insert new language dicts into translations.ts
// Run: node scripts/insert-dicts.mjs

import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

// All 15 new language dict definitions
const newDicts = `
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
`;

// Now insert before "export const translations"
const marker = "export const translations: Record<Locale, Dict>";
const idx = src.indexOf(marker);
if (idx === -1) {
  console.error("ERROR: Could not find translations export marker");
  process.exit(1);
}

src = src.slice(0, idx) + newDicts + "\n\n" + src.slice(idx);

// Now update the record to include all languages
const oldRecord = `export const translations: Record<Locale, Dict> = {
  zh,
  en,
  de,
  fr,
  it,
  es,
};`;

const newRecord = `export const translations: Record<Locale, Dict> = {
  zh,
  en,
  de,
  fr,
  it,
  es,
  ja,
  ko,
};`;

if (!src.includes(oldRecord)) {
  console.error("ERROR: Could not find old record to replace");
  process.exit(1);
}

src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ ja + ko inserted successfully");
