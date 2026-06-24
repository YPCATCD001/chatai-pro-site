import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

const newDicts = `
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
`;

const marker = "export const translations: Record<Locale, Dict>";
const idx = src.indexOf(marker);
if (idx === -1) { console.error("ERROR: marker not found"); process.exit(1); }
src = src.slice(0, idx) + newDicts + "\n\n" + src.slice(idx);

const oldRecord = `  zh,
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
  sv,
  pl,
  tr,
  th,
  vi,
  id,
  cs,
  ru,
};`;

if (!src.includes(oldRecord)) { console.error("ERROR: old record not found"); process.exit(1); }
src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ cs + ru inserted successfully");
