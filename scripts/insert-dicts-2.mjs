import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

const newDicts = `
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
`;

const marker = "export const translations: Record<Locale, Dict>";
const idx = src.indexOf(marker);
if (idx === -1) { console.error("ERROR: marker not found"); process.exit(1); }
src = src.slice(0, idx) + newDicts + "\n\n" + src.slice(idx);

// Update the record
const oldRecord = `  zh,
  en,
  de,
  fr,
  it,
  es,
  ja,
  ko,
};`;

const newRecord = `  zh,
  en,
  de,
  fr,
  it,
  es,
  ja,
  ko,
  pt,
  nl,
};`;

if (!src.includes(oldRecord)) { console.error("ERROR: old record not found"); process.exit(1); }
src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ pt + nl inserted successfully");
