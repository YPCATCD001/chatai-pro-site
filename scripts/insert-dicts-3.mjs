import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

const newDicts = `
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
};`;

if (!src.includes(oldRecord)) { console.error("ERROR: old record not found"); process.exit(1); }
src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ sv + pl inserted successfully");
