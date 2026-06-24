import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

const newDicts = `
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
};`;

if (!src.includes(oldRecord)) { console.error("ERROR: old record not found"); process.exit(1); }
src = src.replace(oldRecord, newRecord);
fs.writeFileSync(target, src, "utf-8");
console.log("✅ vi + id inserted successfully");
