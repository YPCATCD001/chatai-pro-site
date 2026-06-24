import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

const newDicts = `
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
};`;

if (!src.includes(oldRecord)) { console.error("ERROR: old record not found"); process.exit(1); }
src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ tr + th inserted successfully");
