import { TECH_GLOSSARY } from "@/lib/tech-glossary";
import { appendGameSession, getLocalPlayer, listGameSessions } from "@/lib/local-store";

export type GameType =
  | "system-dashboard-match"
  | "en-vi-terms"
  | "ratio-category"
  | "term-definition"
  | "formula-match"
  | "risk-category"
  | "ticker-match"
  | "cost-category"
  | "random-mix";

export type SpecialGameType =
  | "weekly-case-challenge"
  | "world-boss-raid"
  | "solo-knowledge-boss"
  | "vn30-fund-sim"
  | "pvp-duel";

// Special game metadata for non-bucket/pair games
export interface SpecialGameMeta {
  id: SpecialGameType;
  title: string;
  description: string;
  emoji: string;
  accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "indigo" | "teal" | "cyan";
}

/* i18n-ignore-start: mọi chuỗi hiển thị trong phần dữ liệu của tệp này đã có
   lớp phủ trong lib/i18n/dictionaries/sections/games-meta.ts - tên game, mô tả,
   ba mức độ khó, nhãn ô, 47 khoản mục báo cáo, ba bộ kéo-thả còn lại, nhãn và
   gợi ý của game ghép cặp, và danh hiệu hạng 1-2-3. Component đắp qua
   `localizeBucketConfig`/`localizePairConfig` (lib/games-i18n.ts).

   BA THỨ CỐ Ý KHÔNG DỊCH, và đây là lý do:
   - `TICKER_PAIRS` ghép tên doanh nghiệp với mã cổ phiếu (Vinamilk ↔ VNM). Cả
     hai vế là danh từ riêng.
   - Vế trái của mọi game ghép cặp: ký hiệu chỉ số (ROE, P/E), tên doanh nghiệp,
     hoặc thuật ngữ vốn đã là tiếng Anh.
   - `en-vi-terms` và phần glossary của `random-mix` ĐÃ song ngữ sẵn - trò chơi
     chính là ghép thuật ngữ Anh với thuật ngữ Việt. Dịch vế Việt sang Anh thì
     hai cột giống hệt nhau và trò chơi biến mất.

   lib/__tests__/games-content-i18n.test.ts làm đỏ build khi mảng dịch lệch độ
   dài - ở đây điều đó nghiêm trọng hơn chỗ khác, vì `bucket` của mỗi thẻ quyết
   định ĐÁP ÁN: lệch một phần tử là thẻ mang nhãn của thẻ bên cạnh và ô đúng
   thành ô sai. */
export const SPECIAL_GAMES: SpecialGameMeta[] = [
];

export type AnyGameType = GameType | SpecialGameType;

export type GameDifficulty = "de" | "trung-binh" | "kho";

export const GAME_DIFFICULTIES: { id: GameDifficulty; label: string; hint: string }[] = [
  { id: "de", label: "Dễ", hint: "Ít thẻ hơn, không giới hạn thời gian" },
  { id: "trung-binh", label: "Trung bình", hint: "Số thẻ mặc định, không giới hạn thời gian" },
  { id: "kho", label: "Khó", hint: "Nhiều thẻ hơn + giới hạn 60 giây" },
];

// Only "khó" adds time pressure - easy/medium stay untimed so newer players
// aren't punished by a clock on top of learning the material itself.
export function getDifficultyTimeLimitSeconds(difficulty: GameDifficulty): number | null {
  return difficulty === "kho" ? 60 : null;
}

function scaleRoundSize(baseSize: number, poolSize: number, difficulty: GameDifficulty): number {
  const delta = difficulty === "de" ? -4 : difficulty === "kho" ? 6 : 0;
  return Math.max(4, Math.min(poolSize, baseSize + delta));
}

// "bucket" = drag items into the right category column; "pair" = match items
// in a left column to their partner in the right column. Both mechanics are
// generic and data-driven (see BucketGame / PairGame components), so new
// games are added by dropping data here, not by writing new components.
export type GameMechanic = "bucket" | "pair";

export interface GameMeta {
  id: GameType;
  title: string;
  description: string;
  emoji: string;
  mechanic: GameMechanic;
  accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "indigo" | "teal" | "cyan";
}

export const GAMES: GameMeta[] = [
  {
    id: "random-mix",
    title: "🎲 Trộn ngẫu nhiên tất cả chủ đề",
    description: "Thách thức tổng hợp: Trộn ngẫu nhiên kiến thức từ Tầng hệ thống, Thuật ngữ, Chỉ số, Công thức và Rủi ro!",
    emoji: "🎲",
    mechanic: "pair",
    accent: "rose",
  },
  {
    id: "system-dashboard-match",
    title: "Tầng của hệ thống",
    description: "Kéo từng thành phần vào đúng tầng (Giao diện / Dịch vụ / Dữ liệu & hạ tầng).",
    emoji: "📊",
    mechanic: "bucket",
    accent: "emerald",
  },
  {
    id: "en-vi-terms",
    title: "Thuật ngữ Anh - Việt",
    description: "Ghép đúng cặp thuật ngữ công nghệ English ↔ Tiếng Việt, lấy từ chính các bài bạn đã học.",
    emoji: "🔤",
    mechanic: "pair",
    accent: "sky",
  },
  {
    id: "ratio-category",
    title: "Phân loại chỉ số hệ thống",
    description: "Kéo từng chỉ số vào đúng nhóm: Độ trễ / Thông lượng / Độ tin cậy / Chi phí.",
    emoji: "🧮",
    mechanic: "bucket",
    accent: "amber",
  },
  {
    id: "term-definition",
    title: "Thuật ngữ & Định nghĩa",
    description: "Ghép mỗi thuật ngữ công nghệ với định nghĩa ngắn gọn đúng của nó.",
    emoji: "📖",
    mechanic: "pair",
    accent: "violet",
  },
  {
    id: "formula-match",
    title: "Tên & Công thức",
    description: "Ghép tên chỉ số với đúng công thức tính của nó (uptime, tỷ lệ lỗi, MTTR...).",
    emoji: "➗",
    mechanic: "pair",
    accent: "rose",
  },
  {
    id: "risk-category",
    title: "Phân loại rủi ro thay đổi",
    description: "Kéo từng thay đổi mã vào đúng mức rủi ro: Thấp / Trung bình / Cao.",
    emoji: "⚖️",
    mechanic: "bucket",
    accent: "indigo",
  },
  {
    id: "ticker-match",
    title: "Công ty & Công nghệ",
    description: "Ghép tên công ty với đúng công nghệ do họ tạo ra.",
    emoji: "🏢",
    mechanic: "pair",
    accent: "teal",
  },
  {
    id: "cost-category",
    title: "Phân loại chi phí",
    description: "Kéo từng khoản chi phí hạ tầng vào đúng nhóm: Cố định (Fixed) hay Biến đổi (Variable).",
    emoji: "🧾",
    mechanic: "bucket",
    accent: "cyan",
  },
];

export function getGameMeta(id: GameType): GameMeta {
  return GAMES.find((g) => g.id === id) ?? GAMES[0];
}

export interface RelatedLesson {
  slug: string;
  title: string;
  subtitle: string;
}

export const GAME_RELATED_LESSONS: Record<GameType, RelatedLesson[]> = {
  "system-dashboard-match": [
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Phân biệt Báo cáo kết quả kinh doanh, Bảng cân đối & Lưu chuyển tiền tệ" },
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Nền tảng phân bổ nguồn lực và đọc hiểu thông số" },
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Phân loại dòng tiền vào ra" },
  ],
  "en-vi-terms": [
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Các thuật ngữ tài chính Anh - Việt cốt lõi" },
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Các thuộc tính và từ vựng tiền tệ" },
  ],
  "ratio-category": [
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Hiểu rõ nhóm chỉ số Thanh khoản, Sinh lời, Đòn bẩy" },
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Chỉ số lưu chuyển tiền tệ và khả năng thanh toán" },
  ],
  "term-definition": [
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Thuật ngữ và khái niệm định nghĩa gốc" },
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Hiểu đúng bản chất từng khái niệm" },
  ],
  "formula-match": [
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Công thức ROE, ROA, P/E, Current Ratio" },
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Công thức và tác động của lãi suất" },
    { slug: "present-value", title: "Present Value: giá trị hiện tại", subtitle: "Công thức tính giá trị theo thời gian của tiền" },
  ],
  "risk-category": [
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Đánh giá mức độ rủi ro và giá trị tài sản" },
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Rủi ro biến động lãi suất và thị trường" },
  ],
  "ticker-match": [
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Tìm hiểu doanh nghiệp và niêm yết trên thị trường" },
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Đánh giá các doanh nghiệp VN30 hàng đầu" },
  ],
  "cost-category": [
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Phân loại chi phí cố định và chi phí biến đổi" },
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Tác động của chi phí đến dòng tiền doanh nghiệp" },
  ],
  "random-mix": [
    { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán", subtitle: "Tổng hợp kiến thức nền tảng tài chính" },
    { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền", subtitle: "Tổng hợp phân tích dòng tiền & Báo cáo" },
    { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview", subtitle: "Tổng hợp công thức và tỷ số tài chính" },
  ],
};

export function getGameRelatedLessons(gameType: GameType): RelatedLesson[] {
  return GAME_RELATED_LESSONS[gameType] ?? GAME_RELATED_LESSONS["random-mix"];
}

// Pass threshold to earn XP - a round that's mostly wrong shouldn't reward
// XP just for participating, but doesn't need to be perfect either.
const PASS_RATIO = 0.7;
const XP_PER_CORRECT = 2;
const MAX_GAME_XP_PER_TYPE = 50;

export function computeGameXp(score: number, total: number): number {
  if (total <= 0) return 0;
  if (score / total < PASS_RATIO) return 0;
  return Math.min(MAX_GAME_XP_PER_TYPE, score * XP_PER_CORRECT);
}

// ─── Game 1 content: các thành phần của một hệ thống, theo tầng ───────────

export type StatementBucket = "frontend" | "backend" | "data";

export const STATEMENT_LABELS: Record<StatementBucket, string> = {
  frontend: "Tầng giao diện (client)",
  backend: "Tầng dịch vụ (server)",
  data: "Tầng dữ liệu & hạ tầng",
};

export interface StatementItem {
  term: string;
  bucket: StatementBucket;
}

export const STATEMENT_ITEMS: StatementItem[] = [
  // Tầng giao diện (client)
  { term: "Thành phần React dựng danh sách sản phẩm", bucket: "frontend" },
  { term: "Biểu định kiểu CSS và bố cục responsive", bucket: "frontend" },
  { term: "Kiểm tra hợp lệ biểu mẫu ngay trên trình duyệt", bucket: "frontend" },
  { term: "Bộ định tuyến trang phía client", bucket: "frontend" },
  { term: "Trạng thái cục bộ của một màn hình", bucket: "frontend" },
  { term: "Ảnh và font tải kèm trang", bucket: "frontend" },
  { term: "Service worker cho chế độ ngoại tuyến", bucket: "frontend" },
  { term: "Nhãn ARIA cho trình đọc màn hình", bucket: "frontend" },
  { term: "Hoạt ảnh chuyển trang", bucket: "frontend" },
  { term: "localStorage giữ giỏ hàng tạm", bucket: "frontend" },
  { term: "Chia gói JavaScript theo tuyến đường", bucket: "frontend" },
  { term: "Chủ đề sáng/tối lưu theo thiết bị", bucket: "frontend" },
  { term: "Đo Core Web Vitals trên máy người dùng", bucket: "frontend" },

  // Tầng dịch vụ (server)
  { term: "Endpoint REST trả danh sách đơn hàng", bucket: "backend" },
  { term: "Middleware xác thực JWT", bucket: "backend" },
  { term: "Quy tắc phân quyền theo vai trò", bucket: "backend" },
  { term: "Giới hạn tần suất gọi API", bucket: "backend" },
  { term: "Hàng đợi xử lý việc nền", bucket: "backend" },
  { term: "Tác vụ định kỳ chạy theo lịch (cron)", bucket: "backend" },
  { term: "Gọi cổng thanh toán bên thứ ba", bucket: "backend" },
  { term: "Tầng nghiệp vụ tính giá và khuyến mãi", bucket: "backend" },
  { term: "Ghi log có cấu trúc cho mỗi request", bucket: "backend" },
  { term: "Kiểm tra sức khoẻ dịch vụ (health check)", bucket: "backend" },
  { term: "Sinh và ký lại refresh token", bucket: "backend" },
  { term: "Xử lý webhook đến từ đối tác", bucket: "backend" },
  { term: "Bộ chuyển đổi dữ liệu trước khi trả về client", bucket: "backend" },
  { term: "Thử lại có độ trễ tăng dần khi gọi dịch vụ ngoài", bucket: "backend" },

  // Tầng dữ liệu & hạ tầng
  { term: "Bảng người dùng và chỉ mục trên email", bucket: "data" },
  { term: "Migration thêm cột vào bảng đơn hàng", bucket: "data" },
  { term: "Bản sao chỉ đọc của cơ sở dữ liệu", bucket: "data" },
  { term: "Sao lưu hằng đêm và thử khôi phục", bucket: "data" },
  { term: "Redis làm bộ nhớ đệm phiên đăng nhập", bucket: "data" },
  { term: "Kho lưu trữ đối tượng chứa ảnh tải lên", bucket: "data" },
  { term: "CDN phân phối tệp tĩnh", bucket: "data" },
  { term: "Cân bằng tải trước cụm máy chủ", bucket: "data" },
  { term: "Container và tệp cấu hình triển khai", bucket: "data" },
  { term: "Chứng chỉ TLS và bản ghi DNS", bucket: "data" },
  { term: "Kho dữ liệu phục vụ báo cáo", bucket: "data" },
  { term: "Hệ thống giám sát và cảnh báo", bucket: "data" },
  { term: "Quản lý bí mật và biến môi trường", bucket: "data" },
  { term: "Nhóm tự mở rộng theo tải", bucket: "data" },
];

export function pickStatementRound(count = 10): StatementItem[] {
  const shuffled = [...STATEMENT_ITEMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ─── Game 2 content: EN-VI term pairs, sourced from the lesson glossary ────

export interface TermPair {
  vi: string;
  en: string;
}

export function pickTermRound(count = 8): TermPair[] {
  const entries = Object.entries(TECH_GLOSSARY).map(([vi, en]) => ({ vi, en }));
  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ─── Generic bucket-game config (drag item -> correct category column) ─────

export interface BucketItem {
  term: string;
  bucket: string;
}
export interface BucketConfig {
  buckets: { id: string; label: string }[];
  items: BucketItem[];
  roundSize: number;
  sourceHint: string;
}

const RATIO_ITEMS: BucketItem[] = [
  { term: "Độ trễ trung vị (p50)", bucket: "latency" },
  { term: "Độ trễ đuôi (p99)", bucket: "latency" },
  { term: "Thời gian phản hồi đầu tiên (TTFB)", bucket: "latency" },
  { term: "Số request mỗi giây (RPS)", bucket: "throughput" },
  { term: "Số công việc xử lý mỗi phút", bucket: "throughput" },
  { term: "Băng thông thực tế", bucket: "throughput" },
  { term: "Tỷ lệ lỗi 5xx", bucket: "reliability" },
  { term: "Thời gian hoạt động (uptime)", bucket: "reliability" },
  { term: "Thời gian khôi phục trung bình (MTTR)", bucket: "reliability" },
  { term: "Chi phí trên mỗi request", bucket: "cost" },
  { term: "Mức dùng CPU trung bình", bucket: "cost" },
  { term: "Tỷ lệ trúng cache", bucket: "cost" },
];

const RISK_ITEMS: BucketItem[] = [
  { term: "Đổi tên biến cục bộ", bucket: "low" },
  { term: "Thêm một bài kiểm thử mới", bucket: "low" },
  { term: "Sửa lỗi chính tả trong tài liệu", bucket: "low" },
  { term: "Thêm log vào một hàm sẵn có", bucket: "low" },
  { term: "Nâng phiên bản thư viện lên bản vá", bucket: "medium" },
  { term: "Thêm một cột mới vào bảng dữ liệu", bucket: "medium" },
  { term: "Đổi cấu hình cache", bucket: "medium" },
  { term: "Tách một hàm lớn thành nhiều hàm nhỏ", bucket: "medium" },
  { term: "Đổi kiểu dữ liệu của một cột đang dùng", bucket: "high" },
  { term: "Xoá một endpoint API công khai", bucket: "high" },
  { term: "Di trú cơ sở dữ liệu sang máy chủ khác", bucket: "high" },
  { term: "Đổi thuật toán băm mật khẩu", bucket: "high" },
];

const COST_ITEMS: BucketItem[] = [
  { term: "Thuê máy chủ theo tháng", bucket: "fixed" },
  { term: "Gói giám sát trả cố định hàng tháng", bucket: "fixed" },
  { term: "Khấu hao thiết bị phòng máy", bucket: "fixed" },
  { term: "Phí tên miền và chứng chỉ TLS", bucket: "fixed" },
  { term: "Lương đội vận hành", bucket: "fixed" },
  { term: "Phí bản quyền phần mềm theo năm", bucket: "fixed" },
  { term: "Băng thông truyền ra Internet", bucket: "variable" },
  { term: "Số lần gọi hàm serverless", bucket: "variable" },
  { term: "Dung lượng lưu trữ đối tượng đã dùng", bucket: "variable" },
  { term: "Phí gửi email theo số lượng", bucket: "variable" },
  { term: "Token gọi API mô hình ngôn ngữ", bucket: "variable" },
  { term: "Phí ghi log theo số dòng", bucket: "variable" },
];

const BUCKET_CONFIGS: Partial<Record<GameType, BucketConfig>> = {
  "system-dashboard-match": {
    buckets: [
      { id: "frontend", label: STATEMENT_LABELS["frontend"] },
      { id: "backend", label: STATEMENT_LABELS["backend"] },
      { id: "data", label: STATEMENT_LABELS["data"] },
    ],
    items: STATEMENT_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn thẻ, rồi thả vào đúng tầng",
  },
  "ratio-category": {
    buckets: [
      { id: "latency", label: "Độ trễ" },
      { id: "throughput", label: "Thông lượng" },
      { id: "reliability", label: "Độ tin cậy" },
      { id: "cost", label: "Chi phí" },
    ],
    items: RATIO_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn chỉ số, rồi thả vào đúng nhóm",
  },
  "risk-category": {
    buckets: [
      { id: "low", label: "Rủi ro thấp" },
      { id: "medium", label: "Rủi ro trung bình" },
      { id: "high", label: "Rủi ro cao" },
    ],
    items: RISK_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn thay đổi, rồi thả vào đúng mức rủi ro",
  },
  "cost-category": {
    buckets: [
      { id: "fixed", label: "Chi phí cố định (Fixed)" },
      { id: "variable", label: "Chi phí biến đổi (Variable)" },
    ],
    items: COST_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn khoản chi phí, rồi thả vào đúng nhóm",
  },
};

export function getBucketConfig(gameType: GameType, difficulty: GameDifficulty = "trung-binh"): BucketConfig {
  const base = BUCKET_CONFIGS[gameType] ?? BUCKET_CONFIGS["system-dashboard-match"]!;
  return { ...base, roundSize: scaleRoundSize(base.roundSize, base.items.length, difficulty) };
}

// ─── Generic pair-game config (match left column -> right column) ──────────

export interface PairConfig {
  pool: { left: string; right: string }[];
  roundSize: number;
  leftLabel: string;
  rightLabel: string;
  hint: string;
}

const TERM_DEFINITION_PAIRS: { left: string; right: string }[] = [
  { left: "API", right: "Giao diện để hai chương trình gọi nhau" },
  { left: "Cache", right: "Bộ nhớ đệm giữ lại kết quả đã tính để khỏi tính lại" },
  { left: "Idempotent", right: "Gọi nhiều lần cho cùng một kết quả như gọi một lần" },
  { left: "Race condition", right: "Lỗi do hai luồng cùng chạm một dữ liệu không có khoá" },
  { left: "Index (CSDL)", right: "Cấu trúc giúp tìm dòng mà không phải quét cả bảng" },
  { left: "Load balancer", right: "Thành phần chia lưu lượng cho nhiều máy chủ" },
  { left: "Deadlock", right: "Hai tiến trình cùng chờ tài nguyên của nhau, không ai đi tiếp" },
  { left: "Big-O", right: "Cách mô tả số bước tăng ra sao khi dữ liệu lớn dần" },
  { left: "Refactor", right: "Sửa cấu trúc mã mà không đổi hành vi bên ngoài" },
  { left: "Rollback", right: "Đưa hệ thống về bản phát hành trước khi có lỗi" },
  { left: "Rate limit", right: "Giới hạn số lần gọi trong một khoảng thời gian" },
  { left: "Garbage collection", right: "Cơ chế tự thu hồi bộ nhớ không còn ai tham chiếu" },
];

const FORMULA_PAIRS: { left: string; right: string }[] = [
  { left: "Uptime", right: "Thời gian hoạt động / Tổng thời gian" },
  { left: "Tỷ lệ lỗi", right: "Số request lỗi / Tổng số request" },
  { left: "Thông lượng", right: "Số request / Đơn vị thời gian" },
  { left: "Tỷ lệ trúng cache", right: "Số lần trúng / (Trúng + Trượt)" },
  { left: "Chi phí mỗi request", right: "Tổng chi phí hạ tầng / Số request" },
  { left: "MTTR", right: "Tổng thời gian khôi phục / Số sự cố" },
  { left: "Độ phủ kiểm thử", right: "Số dòng được chạy bởi test / Tổng số dòng" },
  { left: "Ngân sách lỗi", right: "1 − Mục tiêu SLO" },
  { left: "Hệ số mở rộng", right: "Thông lượng sau / Thông lượng trước" },
  { left: "Độ trễ trung bình", right: "Tổng thời gian phản hồi / Số request" },
];

const TICKER_PAIRS: { left: string; right: string }[] = [
  { left: "Google", right: "Android" },
  { left: "Meta", right: "React" },
  { left: "Microsoft", right: "TypeScript" },
  { left: "Amazon", right: "AWS" },
  { left: "Apple", right: "Swift" },
  { left: "Oracle", right: "Java" },
  { left: "JetBrains", right: "Kotlin" },
  { left: "Mozilla", right: "Rust" },
  { left: "Docker Inc.", right: "Docker" },
  { left: "Canonical", right: "Ubuntu" },
];

const PAIR_CONFIGS: Partial<Record<GameType, PairConfig>> = {
  "term-definition": {
    pool: TERM_DEFINITION_PAIRS,
    roundSize: 6,
    leftLabel: "Thuật ngữ",
    rightLabel: "Định nghĩa",
    hint: "Bấm 1 thuật ngữ rồi bấm định nghĩa đúng (hoặc kéo thả) để ghép cặp.",
  },
  "formula-match": {
    pool: FORMULA_PAIRS,
    roundSize: 6,
    leftLabel: "Tên chỉ số",
    rightLabel: "Công thức",
    hint: "Bấm 1 tên chỉ số rồi bấm công thức đúng (hoặc kéo thả) để ghép cặp.",
  },
  "ticker-match": {
    pool: TICKER_PAIRS,
    roundSize: 6,
    leftLabel: "Doanh nghiệp",
    rightLabel: "Mã cổ phiếu",
    hint: "Bấm 1 công ty rồi bấm đúng công nghệ (hoặc kéo thả) để ghép cặp.",
  },
};

export function getPairConfig(gameType: GameType, difficulty: GameDifficulty = "trung-binh"): PairConfig {
  if (gameType === "random-mix") {
    const glossaryPairs = Object.entries(TECH_GLOSSARY).map(([vi, en]) => ({ left: vi, right: en }));
    const allPools = [
      ...TERM_DEFINITION_PAIRS,
      ...FORMULA_PAIRS,
      ...TICKER_PAIRS,
      ...glossaryPairs,
    ];
    const base = {
      pool: allPools,
      roundSize: 8,
      leftLabel: "Thuật ngữ / Tên",
      rightLabel: "Định nghĩa / Mã / Khái niệm",
      hint: "Chế độ Trộn Ngẫu Nhiên: Ghép đúng các cặp thuộc các chủ đề khác nhau!",
    };
    return { ...base, roundSize: scaleRoundSize(base.roundSize, base.pool.length, difficulty) };
  }

  const cfg = PAIR_CONFIGS[gameType];
  const base = cfg ?? {
    // Fallback: en-vi-terms built from the glossary.
    pool: Object.entries(TECH_GLOSSARY).map(([vi, en]) => ({ left: vi, right: en })),
    roundSize: 8,
    leftLabel: "Tiếng Việt",
    rightLabel: "English",
    hint: "Kéo thả hoặc bấm chọn 1 thẻ rồi bấm thẻ tương ứng để ghép cặp.",
  };
  return { ...base, roundSize: scaleRoundSize(base.roundSize, base.pool.length, difficulty) };
}

/**
 * Rút một ván từ MỘT cấu hình đã có sẵn.
 *
 * Nhận `cfg` thay vì `gameType` là điều kiện để dịch được, không phải sở
 * thích về kiểu dáng. Bản trước nhận `gameType` rồi tự gọi `getPairConfig`,
 * nên nó luôn rút từ pool TIẾNG VIỆT kể cả khi component vừa dịch pool đó
 * xong: bản dịch nằm trong biến `config` còn ván chơi đến từ một nguồn khác.
 * Kết quả là nhãn cột tiếng Anh đứng trên thẻ bài tiếng Việt - không lỗi,
 * không cảnh báo, chỉ là một màn hình nửa nọ nửa kia.
 */
export function pickPairRoundFrom(cfg: PairConfig): { left: string; right: string }[] {
  const shuffled = [...cfg.pool].sort(() => Math.random() - 0.5);

  const result: { left: string; right: string }[] = [];
  const usedLeft = new Set<string>();
  const usedRight = new Set<string>();

  for (const pair of shuffled) {
    const leftKey = pair.left.trim().toLowerCase();
    const rightKey = pair.right.trim().toLowerCase();
    if (!usedLeft.has(leftKey) && !usedRight.has(rightKey)) {
      usedLeft.add(leftKey);
      usedRight.add(rightKey);
      result.push(pair);
      if (result.length >= cfg.roundSize) break;
    }
  }

  return result;
}

// ─── Session recording / leaderboard / history ─────────────────────────────

export interface GameSession {
  id: number;
  game_type: GameType;
  score: number;
  total: number;
  xp_earned: number;
  created_at: string;
}

export async function recordGameSession(
  _userId: string,
  gameType: AnyGameType,
  score: number,
  total: number
): Promise<number> {
  const xpEarned = computeGameXp(score, total);
  appendGameSession({ game_type: gameType, score, total, xp_earned: xpEarned });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("thtcdn_game_session_recorded"));
    if (xpEarned > 0) {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: "Thắng Mini-Game!" } }));
    }
  }

  return xpEarned;
}

export async function recordCustomGameSession(
  _userId: string,
  gameType: AnyGameType,
  score: number,
  total: number,
  xpEarned: number
): Promise<void> {
  const safeXpEarned = Math.max(0, Math.min(MAX_GAME_XP_PER_TYPE, Math.round(xpEarned)));
  appendGameSession({ game_type: gameType, score, total, xp_earned: safeXpEarned });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("thtcdn_game_session_recorded"));
    if (safeXpEarned > 0) {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: safeXpEarned, label: "Thắng mini-game!" } }));
    }
  }
}

/**
 * Total game XP that counts toward a user's real total_xp/level: the BEST
 * xp_earned per game type, summed. Deliberately best-per-game rather than
 * sum-of-all-sessions so replaying the same game can't farm unlimited XP -
 * each game contributes its best result once (max 50/game). Folded into
 * recalculateUserStats alongside lesson + quiz XP; without this the "+X XP"
 * a game shows on finish never actually reached the user's level/leaderboard.
 */
export async function getTotalGameXp(_userId: string): Promise<number> {
  const bestByGame = new Map<string, number>();
  for (const row of listGameSessions()) {
    const cur = bestByGame.get(row.game_type) ?? 0;
    const safeXp = Math.max(0, Math.min(MAX_GAME_XP_PER_TYPE, Number(row.xp_earned) || 0));
    if (safeXp > cur) bestByGame.set(row.game_type, safeXp);
  }
  return Array.from(bestByGame.values()).reduce((sum, v) => sum + v, 0);
}

export async function getGameHistory(_userId: string, gameType: AnyGameType, limit = 20): Promise<GameSession[]> {
  // `appendGameSession` đã chèn vào đầu mảng, nên thứ tự mới-nhất-trước có sẵn.
  return listGameSessions()
    .filter((s) => s.game_type === gameType)
    .slice(0, limit) as GameSession[];
}

export interface GameLeaderboardRow {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  bestScore: number;
  bestTotal: number;
  playedAt: string;
}

/**
 * Không còn máy chủ thì không còn bảng xếp hạng nhiều người: hàm này trả về
 * kỷ lục của chính máy này, tối đa một hàng. Giữ nguyên kiểu trả về để
 * GameLeaderboard/ModeLeaderboard render y như cũ mà không phải sửa.
 */
export async function getGameLeaderboard(gameType: AnyGameType, _limit = 10): Promise<GameLeaderboardRow[]> {
  const mine = listGameSessions().filter((s) => s.game_type === gameType);
  if (mine.length === 0) return [];

  const best = mine.reduce((a, b) => (b.score > a.score ? b : a));
  const player = getLocalPlayer();
  return [
    {
      user_id: player.id,
      name: player.name,
      avatarUrl: null,
      bestScore: best.score,
      bestTotal: best.total,
      playedAt: best.created_at,
    },
  ];
}

export interface CombinedLeaderboardRow {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  totalXp: number;
  gamesPlayed: number;
  lastPlayedAt: string;
}

/** Cục bộ, cùng lý do như `getGameLeaderboard`: một hàng duy nhất. */
export async function getCombinedGameLeaderboard(_limit = 10): Promise<CombinedLeaderboardRow[]> {
  const sessions = listGameSessions();
  if (sessions.length === 0) return [];

  const player = getLocalPlayer();
  return [
    {
      user_id: player.id,
      name: player.name,
      avatarUrl: null,
      totalXp: await getTotalGameXp(player.id),
      gamesPlayed: new Set(sessions.map((s) => s.game_type)).size,
      lastPlayedAt: sessions[0].created_at,
    },
  ];
}

// ─── Fun tech-themed titles for the top 3 of each game's leaderboard ───

const GAME_TITLES: Record<GameType, [string, string, string]> = {
  "random-mix": ["Đại Sư Trộn Ngẫu Nhiên", "Phù Thủy Tổng Hợp", "Cao Thủ Ngẫu Nhiên"],
  "system-dashboard-match": ["Kiến Trúc Sư Vũ Trụ", "Thần Phân Tầng Hệ Thống", "Đại Sư Kiến Trúc"],
  "en-vi-terms": ["Phù Thuỷ Song Ngữ Công Nghệ", "Thánh Thuật Ngữ", "Dịch Giả Silicon Valley"],
  "ratio-category": ["Bậc Thầy Chỉ Số", "Nhà Phân Tích Thượng Thừa", "Trùm Đo Lường Hệ Thống"],
  "term-definition": ["Từ Điển Sống", "Học Giả Công Nghệ", "Bộ Não Bách Khoa"],
  "formula-match": ["Thần Đồng Công Thức", "Pháp Sư Con Số", "Cao Thủ Định Lượng"],
  "risk-category": ["Vệ Thần Bản Phát Hành", "Cao Thủ Quản Trị Rủi Ro", "Bậc Thầy Đánh Giá Thay Đổi"],
  "ticker-match": ["Thổ Địa Làng Công Nghệ", "Cao Thủ Nhận Diện Công Nghệ", "Huyền Thoại Mã Nguồn"],
  "cost-category": ["Quản Trị Chi Phí Thượng Thừa", "Bậc Thầy Fixed & Variable", "Huyền Thoại Tối Ưu Hạ Tầng"],
};

/** Rank is 1-based. Returns null for rank 4+. */
export function getGameTitle(gameType: GameType, rank: number): string | null {
  if (rank < 1 || rank > 3) return null;
  return GAME_TITLES[gameType][rank - 1];
}

const COMBINED_TITLES: [string, string, string] = ["Huyền Thoại Mini Game", "Đại Kiện Tướng Công Nghệ", "Cao Thủ Toàn Năng"];

/* i18n-ignore-end */

/** Rank is 1-based. Returns null for rank 4+. For the cross-game combined leaderboard. */
export function getCombinedGameTitle(rank: number): string | null {
  if (rank < 1 || rank > 3) return null;
  return COMBINED_TITLES[rank - 1];
}

export interface EarnedGameTitle {
  gameType: GameType | "combined";
  gameEmoji: string;
  gameLabel: string;
  title: string;
  rank: number;
}

/**
 * Every top-3 title a user currently holds, across each game's own
 * leaderboard plus the combined one - feeds the consolidated "Thành tích"
 * section on the profile page. Reuses the existing per-game/combined
 * leaderboard RPCs (top 3 only) rather than a dedicated query, since each
 * one already exists and is cheap at limit=3.
 */
export async function getMyGameTitles(userId: string): Promise<EarnedGameTitle[]> {
  const [perGame, combined] = await Promise.all([
    Promise.all(GAMES.map((g) => getGameLeaderboard(g.id, 3).then((rows) => ({ game: g, rows })))),
    getCombinedGameLeaderboard(3),
  ]);

  const earned: EarnedGameTitle[] = [];
  for (const { game, rows } of perGame) {
    const idx = rows.findIndex((r) => r.user_id === userId);
    if (idx === -1) continue;
    const title = getGameTitle(game.id, idx + 1);
    if (title) earned.push({ gameType: game.id, gameEmoji: game.emoji, gameLabel: game.title, title, rank: idx + 1 });
  }
  const combinedIdx = combined.findIndex((r) => r.user_id === userId);
  if (combinedIdx !== -1) {
    const title = getCombinedGameTitle(combinedIdx + 1);
    if (title) earned.push({ gameType: "combined", gameEmoji: "👑", gameLabel: "BXH tổng hợp", title, rank: combinedIdx + 1 });
  }
  return earned;
}
