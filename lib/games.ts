import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { FINANCE_GLOSSARY } from "@/lib/finance-glossary";
import { recalculateUserStats } from "@/lib/supabase-user";

function isMissingTableError(error: { code?: string } | null): boolean {
  return (
    error?.code === "PGRST205" ||
    error?.code === "42P01" ||
    error?.code === "PGRST202" ||
    error?.code === "42883" ||
    error?.code === "23514" ||
    error?.code === "42703"
  );
}

export type GameType =
  | "financial-statement-match"
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
  | "pvp-duel"
  | "wall-street-millionaire"
  | "snowball-racer"
  | "dcf-mastermind";

// Special game metadata for non-bucket/pair games
export interface SpecialGameMeta {
  id: SpecialGameType;
  title: string;
  description: string;
  emoji: string;
  accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "indigo" | "teal" | "cyan";
}

export const SPECIAL_GAMES: SpecialGameMeta[] = [
  {
    id: "wall-street-millionaire",
    title: "Ai Là Triệu Phú Phố Wall",
    description: "15 câu hỏi tài chính cấp độ cao kết hợp với cơ chế trợ giúp kiểu game show.",
    emoji: "💰",
    accent: "amber",
  },
  {
    id: "dcf-mastermind",
    title: "Đấu Trường Định Giá DCF & M&A",
    description: "Phân tích 5 thương vụ M&A, xác định giá trị nội tại (Target Price) và phán quyết mua/né.",
    emoji: "🧮",
    accent: "indigo",
  },
  {
    id: "snowball-racer",
    title: "Đua Xe Lãi Kép & Hòn Tuyết Lăn",
    description: "Lựa chọn chiến lược đầu tư qua 20 năm để đạt mục tiêu $1,000,000 thông qua sức mạnh lãi kép.",
    emoji: "🏎️",
    accent: "emerald",
  },
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
    description: "Thách thức tổng hợp: Trộn ngẫu nhiên kiến thức từ Báo cáo tài chính, Thuật ngữ, Chỉ số, Công thức và Rủi ro!",
    emoji: "🎲",
    mechanic: "pair",
    accent: "rose",
  },
  {
    id: "financial-statement-match",
    title: "Báo cáo tài chính",
    description: "Kéo từng khoản mục vào đúng báo cáo (Bảng cân đối / Kết quả kinh doanh / Lưu chuyển tiền tệ).",
    emoji: "📊",
    mechanic: "bucket",
    accent: "emerald",
  },
  {
    id: "en-vi-terms",
    title: "Thuật ngữ Anh - Việt",
    description: "Ghép đúng cặp thuật ngữ tài chính English ↔ Tiếng Việt, lấy từ chính các bài bạn đã học.",
    emoji: "🔤",
    mechanic: "pair",
    accent: "sky",
  },
  {
    id: "ratio-category",
    title: "Phân loại chỉ số tài chính",
    description: "Kéo từng tỷ số vào đúng nhóm: Thanh khoản / Sinh lời / Đòn bẩy / Hiệu quả hoạt động.",
    emoji: "🧮",
    mechanic: "bucket",
    accent: "amber",
  },
  {
    id: "term-definition",
    title: "Thuật ngữ & Định nghĩa",
    description: "Ghép mỗi thuật ngữ tài chính với định nghĩa ngắn gọn đúng của nó.",
    emoji: "📖",
    mechanic: "pair",
    accent: "violet",
  },
  {
    id: "formula-match",
    title: "Tên & Công thức",
    description: "Ghép tên chỉ số với đúng công thức tính của nó (ROE, P/E, Current Ratio...).",
    emoji: "➗",
    mechanic: "pair",
    accent: "rose",
  },
  {
    id: "risk-category",
    title: "Phân loại rủi ro đầu tư",
    description: "Kéo từng loại tài sản vào đúng nhóm rủi ro: Thấp / Trung bình / Cao.",
    emoji: "⚖️",
    mechanic: "bucket",
    accent: "indigo",
  },
  {
    id: "ticker-match",
    title: "Mã chứng khoán",
    description: "Ghép tên doanh nghiệp niêm yết với đúng mã cổ phiếu trên sàn.",
    emoji: "🏢",
    mechanic: "pair",
    accent: "teal",
  },
  {
    id: "cost-category",
    title: "Phân loại chi phí",
    description: "Kéo từng khoản chi phí vào đúng nhóm: Cố định (Fixed) hay Biến đổi (Variable).",
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
  "financial-statement-match": [
    { slug: "dong-tien", title: "Day 4: Dòng tiền là gì?", subtitle: "Phân biệt Báo cáo kết quả kinh doanh, Bảng cân đối & Lưu chuyển tiền tệ" },
    { slug: "tai-chinh-la-gi", title: "Day 1: Tài chính là gì?", subtitle: "Nền tảng phân bổ nguồn lực và đọc hiểu thông số" },
    { slug: "thu-nhap-chi-phi-tiet-kiem", title: "Day 3: Thu nhập, chi phí, tiết kiệm", subtitle: "Phân loại dòng tiền vào ra" },
  ],
  "en-vi-terms": [
    { slug: "tai-chinh-la-gi", title: "Day 1: Tài chính là gì?", subtitle: "Các thuật ngữ tài chính Anh - Việt cốt lõi" },
    { slug: "tien-la-gi", title: "Day 2: Tiền là gì?", subtitle: "Các thuộc tính và từ vựng tiền tệ" },
  ],
  "ratio-category": [
    { slug: "chi-so-tai-chinh-co-ban", title: "Các chỉ số tài chính cơ bản", subtitle: "Hiểu rõ nhóm chỉ số Thanh khoản, Sinh lời, Đòn bẩy" },
    { slug: "dong-tien", title: "Day 4: Dòng tiền là gì?", subtitle: "Chỉ số lưu chuyển tiền tệ và khả năng thanh toán" },
  ],
  "term-definition": [
    { slug: "tai-chinh-la-gi", title: "Day 1: Tài chính là gì?", subtitle: "Thuật ngữ và khái niệm định nghĩa gốc" },
    { slug: "tai-san-tieu-san", title: "Day 5: Tài sản và tiêu sản", subtitle: "Hiểu đúng bản chất từng khái niệm" },
  ],
  "formula-match": [
    { slug: "chi-so-tai-chinh-co-ban", title: "Các chỉ số tài chính cơ bản", subtitle: "Công thức ROE, ROA, P/E, Current Ratio" },
    { slug: "lai-suat-la-gi", title: "Day 6: Lãi suất là gì?", subtitle: "Công thức và tác động của lãi suất" },
    { slug: "lai-don-lai-kep", title: "Day 7: Lãi đơn & Lãi kép", subtitle: "Công thức tính giá trị theo thời gian của tiền" },
  ],
  "risk-category": [
    { slug: "tai-san-tieu-san", title: "Day 5: Tài sản và tiêu sản", subtitle: "Đánh giá mức độ rủi ro và giá trị tài sản" },
    { slug: "lai-suat-la-gi", title: "Day 6: Lãi suất là gì?", subtitle: "Rủi ro biến động lãi suất và thị trường" },
  ],
  "ticker-match": [
    { slug: "tai-chinh-la-gi", title: "Day 1: Tài chính là gì?", subtitle: "Tìm hiểu doanh nghiệp và niêm yết trên thị trường" },
    { slug: "chi-so-tai-chinh-co-ban", title: "Các chỉ số tài chính cơ bản", subtitle: "Đánh giá các doanh nghiệp VN30 hàng đầu" },
  ],
  "cost-category": [
    { slug: "thu-nhap-chi-phi-tiet-kiem", title: "Day 3: Thu nhập, chi phí, tiết kiệm", subtitle: "Phân loại chi phí cố định và chi phí biến đổi" },
    { slug: "dong-tien", title: "Day 4: Dòng tiền là gì?", subtitle: "Tác động của chi phí đến dòng tiền doanh nghiệp" },
  ],
  "random-mix": [
    { slug: "tai-chinh-la-gi", title: "Day 1: Tài chính là gì?", subtitle: "Tổng hợp kiến thức nền tảng tài chính" },
    { slug: "dong-tien", title: "Day 4: Dòng tiền là gì?", subtitle: "Tổng hợp phân tích dòng tiền & Báo cáo" },
    { slug: "chi-so-tai-chinh-co-ban", title: "Các chỉ số tài chính cơ bản", subtitle: "Tổng hợp công thức và tỷ số tài chính" },
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

// ─── Game 1 content: financial statement line items ────────────────────────

export type StatementBucket = "balance-sheet" | "income-statement" | "cash-flow";

export const STATEMENT_LABELS: Record<StatementBucket, string> = {
  "balance-sheet": "Bảng cân đối kế toán",
  "income-statement": "Báo cáo kết quả kinh doanh",
  "cash-flow": "Báo cáo lưu chuyển tiền tệ",
};

export interface StatementItem {
  term: string;
  bucket: StatementBucket;
}

export const STATEMENT_ITEMS: StatementItem[] = [
  // Bảng cân đối kế toán (Balance Sheet)
  { term: "Tiền mặt & Tương đương tiền", bucket: "balance-sheet" },
  { term: "Hàng tồn kho (Sắt thép HPG / Hàng hóa FPT)", bucket: "balance-sheet" },
  { term: "Phải thu ngắn hạn khách hàng", bucket: "balance-sheet" },
  { term: "Tài sản cố định hữu hình", bucket: "balance-sheet" },
  { term: "Chi phí xây dựng dở dang dài hạn", bucket: "balance-sheet" },
  { term: "Phải trả người bán ngắn hạn", bucket: "balance-sheet" },
  { term: "Vay & nợ thuê tài chính ngắn hạn", bucket: "balance-sheet" },
  { term: "Vay & nợ thuê tài chính dài hạn", bucket: "balance-sheet" },
  { term: "Vốn góp của chủ sở hữu", bucket: "balance-sheet" },
  { term: "Thặng dư vốn cổ phần", bucket: "balance-sheet" },
  { term: "Lợi nhuận sau thuế chưa phân phối", bucket: "balance-sheet" },
  { term: "Người mua trả tiền trước ngắn hạn", bucket: "balance-sheet" },
  { term: "Chi phí trả trước dài hạn", bucket: "balance-sheet" },
  { term: "Tiền gửi ngân hàng có kỳ hạn", bucket: "balance-sheet" },
  { term: "Bất động sản đầu tư", bucket: "balance-sheet" },
  { term: "Quyền sử dụng đất & Lợi thế thương mại", bucket: "balance-sheet" },
  { term: "Trái phiếu doanh nghiệp phát hành", bucket: "balance-sheet" },
  { term: "Quỹ đầu tư phát triển", bucket: "balance-sheet" },
  { term: "Thuế & các khoản phải nộp Nhà nước", bucket: "balance-sheet" },

  // Báo cáo kết quả kinh doanh (Income Statement)
  { term: "Doanh thu bán hàng & dịch vụ", bucket: "income-statement" },
  { term: "Các khoản giảm trừ doanh thu", bucket: "income-statement" },
  { term: "Doanh thu thuần", bucket: "income-statement" },
  { term: "Giá vốn hàng bán (COGS)", bucket: "income-statement" },
  { term: "Lợi nhuận gộp", bucket: "income-statement" },
  { term: "Doanh thu hoạt động tài chính", bucket: "income-statement" },
  { term: "Chi phí lãi vay", bucket: "income-statement" },
  { term: "Chi phí bán hàng & Marketing", bucket: "income-statement" },
  { term: "Chi phí quản lý doanh nghiệp", bucket: "income-statement" },
  { term: "Chi phí Nghiên cứu & Phát triển (R&D)", bucket: "income-statement" },
  { term: "Chi phí khấu hao tài sản cố định trong kỳ", bucket: "income-statement" },
  { term: "Thu nhập khác", bucket: "income-statement" },
  { term: "Chi phí thuế TNDN hiện hành", bucket: "income-statement" },
  { term: "Lợi nhuận sau thuế (Lợi nhuận ròng)", bucket: "income-statement" },
  { term: "Lãi cơ bản trên cổ phiếu (EPS)", bucket: "income-statement" },

  // Báo cáo lưu chuyển tiền tệ (Cash Flow Statement)
  { term: "Dòng tiền thuần từ hoạt động kinh doanh", bucket: "cash-flow" },
  { term: "Dòng tiền thuần từ hoạt động đầu tư", bucket: "cash-flow" },
  { term: "Dòng tiền thuần từ hoạt động tài chính", bucket: "cash-flow" },
  { term: "Tiền chi mua sắm tài sản cố định (CapEx)", bucket: "cash-flow" },
  { term: "Tiền thu từ thanh lý tài sản cố định", bucket: "cash-flow" },
  { term: "Tiền chi trả nợ gốc vay", bucket: "cash-flow" },
  { term: "Tiền thu từ nhận nợ vay mới", bucket: "cash-flow" },
  { term: "Tiền chi trả cổ tức cho cổ đông", bucket: "cash-flow" },
  { term: "Tiền thu từ phát hành cổ phiếu mới", bucket: "cash-flow" },
  { term: "Lãi tiền gửi ngân hàng đã thu bằng tiền", bucket: "cash-flow" },
  { term: "Tiền lãi vay đã trả trong kỳ", bucket: "cash-flow" },
  { term: "Tiền chi mua cổ phiếu công ty con", bucket: "cash-flow" },
  { term: "Tăng/giảm tiền & tương đương tiền ròng", bucket: "cash-flow" },
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
  const entries = Object.entries(FINANCE_GLOSSARY).map(([vi, en]) => ({ vi, en }));
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
  { term: "Current Ratio", bucket: "liquidity" },
  { term: "Quick Ratio", bucket: "liquidity" },
  { term: "Cash Ratio", bucket: "liquidity" },
  { term: "ROE", bucket: "profitability" },
  { term: "ROA", bucket: "profitability" },
  { term: "Biên lợi nhuận gộp", bucket: "profitability" },
  { term: "Biên lợi nhuận ròng", bucket: "profitability" },
  { term: "Debt-to-Equity", bucket: "leverage" },
  { term: "Debt-to-Assets", bucket: "leverage" },
  { term: "Interest Coverage", bucket: "leverage" },
  { term: "Vòng quay hàng tồn kho", bucket: "efficiency" },
  { term: "Vòng quay khoản phải thu", bucket: "efficiency" },
  { term: "Vòng quay tổng tài sản", bucket: "efficiency" },
];

const RISK_ITEMS: BucketItem[] = [
  { term: "Tiền gửi tiết kiệm", bucket: "low" },
  { term: "Trái phiếu Chính phủ", bucket: "low" },
  { term: "Chứng chỉ quỹ trái phiếu", bucket: "low" },
  { term: "Vàng", bucket: "low" },
  { term: "Trái phiếu doanh nghiệp lớn", bucket: "medium" },
  { term: "Bất động sản cho thuê", bucket: "medium" },
  { term: "Quỹ đầu tư cân bằng", bucket: "medium" },
  { term: "Cổ phiếu Bluechip (VN30)", bucket: "medium" },
  { term: "Cổ phiếu Penny", bucket: "high" },
  { term: "Tiền mã hóa (Crypto)", bucket: "high" },
  { term: "Hợp đồng phái sinh", bucket: "high" },
  { term: "Cổ phiếu công ty mới IPO", bucket: "high" },
];

const COST_ITEMS: BucketItem[] = [
  { term: "Tiền thuê mặt bằng", bucket: "fixed" },
  { term: "Lương quản lý (cố định hàng tháng)", bucket: "fixed" },
  { term: "Khấu hao tài sản cố định", bucket: "fixed" },
  { term: "Bảo hiểm nhà xưởng", bucket: "fixed" },
  { term: "Lãi vay ngân hàng cố định", bucket: "fixed" },
  { term: "Phí thuê phần mềm hàng tháng", bucket: "fixed" },
  { term: "Nguyên vật liệu trực tiếp", bucket: "variable" },
  { term: "Hoa hồng bán hàng", bucket: "variable" },
  { term: "Chi phí vận chuyển hàng bán", bucket: "variable" },
  { term: "Chi phí đóng gói sản phẩm", bucket: "variable" },
  { term: "Nhân công trực tiếp sản xuất (theo sản lượng)", bucket: "variable" },
  { term: "Phí giao dịch thẻ (theo doanh số)", bucket: "variable" },
];

const BUCKET_CONFIGS: Partial<Record<GameType, BucketConfig>> = {
  "financial-statement-match": {
    buckets: [
      { id: "balance-sheet", label: STATEMENT_LABELS["balance-sheet"] },
      { id: "income-statement", label: STATEMENT_LABELS["income-statement"] },
      { id: "cash-flow", label: STATEMENT_LABELS["cash-flow"] },
    ],
    items: STATEMENT_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn thẻ, rồi thả vào đúng báo cáo",
  },
  "ratio-category": {
    buckets: [
      { id: "liquidity", label: "Thanh khoản" },
      { id: "profitability", label: "Sinh lời" },
      { id: "leverage", label: "Đòn bẩy" },
      { id: "efficiency", label: "Hiệu quả hoạt động" },
    ],
    items: RATIO_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn tỷ số, rồi thả vào đúng nhóm",
  },
  "risk-category": {
    buckets: [
      { id: "low", label: "Rủi ro thấp" },
      { id: "medium", label: "Rủi ro trung bình" },
      { id: "high", label: "Rủi ro cao" },
    ],
    items: RISK_ITEMS,
    roundSize: 10,
    sourceHint: "Kéo hoặc chọn tài sản, rồi thả vào đúng mức rủi ro",
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
  const base = BUCKET_CONFIGS[gameType] ?? BUCKET_CONFIGS["financial-statement-match"]!;
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
  { left: "ROE", right: "Lợi nhuận ròng trên vốn chủ sở hữu" },
  { left: "P/E", right: "Giá cổ phiếu chia lợi nhuận mỗi cổ phần" },
  { left: "Dòng tiền tự do (FCF)", right: "Tiền còn lại sau khi trừ chi đầu tư (CapEx)" },
  { left: "Khấu hao", right: "Phân bổ dần chi phí tài sản dài hạn qua nhiều năm" },
  { left: "Thanh khoản", right: "Khả năng chuyển tài sản thành tiền mặt nhanh" },
  { left: "Đòn bẩy tài chính", right: "Dùng nợ vay để khuếch đại lợi nhuận (và rủi ro)" },
  { left: "Vốn lưu động", right: "Tài sản ngắn hạn trừ nợ ngắn hạn" },
  { left: "WACC", right: "Chi phí vốn bình quân gia quyền" },
  { left: "NPV", right: "Giá trị hiện tại ròng của dòng tiền tương lai" },
  { left: "IRR", right: "Tỷ suất chiết khấu làm NPV bằng 0" },
  { left: "EBITDA", right: "Lợi nhuận trước lãi vay, thuế và khấu hao" },
  { left: "Cổ tức", right: "Phần lợi nhuận công ty chia cho cổ đông" },
];

const FORMULA_PAIRS: { left: string; right: string }[] = [
  { left: "ROE", right: "Lợi nhuận ròng / Vốn chủ sở hữu" },
  { left: "ROA", right: "Lợi nhuận ròng / Tổng tài sản" },
  { left: "Current Ratio", right: "Tài sản ngắn hạn / Nợ ngắn hạn" },
  { left: "P/E", right: "Giá cổ phiếu / EPS" },
  { left: "EPS", right: "Lợi nhuận ròng / Số cổ phiếu lưu hành" },
  { left: "Debt-to-Equity", right: "Tổng nợ / Vốn chủ sở hữu" },
  { left: "Biên lợi nhuận gộp", right: "Lợi nhuận gộp / Doanh thu" },
  { left: "FCF", right: "Dòng tiền hoạt động − CapEx" },
  { left: "Quick Ratio", right: "(Tài sản ngắn hạn − Hàng tồn kho) / Nợ ngắn hạn" },
  { left: "Vốn lưu động", right: "Tài sản ngắn hạn − Nợ ngắn hạn" },
];

const TICKER_PAIRS: { left: string; right: string }[] = [
  { left: "Vinamilk", right: "VNM" },
  { left: "FPT Corporation", right: "FPT" },
  { left: "Hòa Phát Group", right: "HPG" },
  { left: "Vingroup", right: "VIC" },
  { left: "Thế Giới Di Động", right: "MWG" },
  { left: "Vietcombank", right: "VCB" },
  { left: "Sabeco", right: "SAB" },
  { left: "Masan Group", right: "MSN" },
  { left: "Petrolimex", right: "PLX" },
  { left: "Vietjet Air", right: "VJC" },
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
    hint: "Bấm 1 doanh nghiệp rồi bấm đúng mã cổ phiếu (hoặc kéo thả) để ghép cặp.",
  },
};

export function getPairConfig(gameType: GameType, difficulty: GameDifficulty = "trung-binh"): PairConfig {
  if (gameType === "random-mix") {
    const glossaryPairs = Object.entries(FINANCE_GLOSSARY).map(([vi, en]) => ({ left: vi, right: en }));
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
    pool: Object.entries(FINANCE_GLOSSARY).map(([vi, en]) => ({ left: vi, right: en })),
    roundSize: 8,
    leftLabel: "Tiếng Việt",
    rightLabel: "English",
    hint: "Kéo thả hoặc bấm chọn 1 thẻ rồi bấm thẻ tương ứng để ghép cặp.",
  };
  return { ...base, roundSize: scaleRoundSize(base.roundSize, base.pool.length, difficulty) };
}

export function pickPairRound(gameType: GameType, difficulty: GameDifficulty = "trung-binh"): { left: string; right: string }[] {
  const cfg = getPairConfig(gameType, difficulty);
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
  userId: string,
  gameType: AnyGameType,
  score: number,
  total: number
): Promise<number> {
  const xpEarned = computeGameXp(score, total);
  const supabase = createClient();
  const { error } = await supabase
    .from("game_sessions")
    .insert([{ user_id: userId, game_type: gameType, score, total, xp_earned: xpEarned }]);

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("thtcdn_game_session_recorded"));
    if (xpEarned > 0) {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: "Thắng Mini-Game!" } }));
    }
  }

  void recalculateUserStats(userId).catch(() => {});

  return xpEarned;
}

export async function recordCustomGameSession(
  userId: string,
  gameType: AnyGameType,
  score: number,
  total: number,
  xpEarned: number
): Promise<void> {
  const safeXpEarned = Math.max(0, Math.min(MAX_GAME_XP_PER_TYPE, Math.round(xpEarned)));
  const supabase = createClient();
  const { error } = await supabase
    .from("game_sessions")
    .insert([{ user_id: userId, game_type: gameType, score, total, xp_earned: safeXpEarned }]);

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("thtcdn_game_session_recorded"));
    if (safeXpEarned > 0) {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: safeXpEarned, label: "Trò chơi tài chính!" } }));
    }
  }

  void recalculateUserStats(userId).catch(() => {});
}

/**
 * Total game XP that counts toward a user's real total_xp/level: the BEST
 * xp_earned per game type, summed. Deliberately best-per-game rather than
 * sum-of-all-sessions so replaying the same game can't farm unlimited XP -
 * each game contributes its best result once (max 50/game). Folded into
 * recalculateUserStats alongside lesson + quiz XP; without this the "+X XP"
 * a game shows on finish never actually reached the user's level/leaderboard.
 */
export async function getTotalGameXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("game_sessions")
    .select("game_type, xp_earned")
    .eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }

  const bestByGame = new Map<string, number>();
  for (const row of (data ?? []) as { game_type: string; xp_earned: number }[]) {
    const cur = bestByGame.get(row.game_type) ?? 0;
    const safeXp = Math.max(0, Math.min(MAX_GAME_XP_PER_TYPE, Number(row.xp_earned) || 0));
    if (safeXp > cur) bestByGame.set(row.game_type, safeXp);
  }
  return Array.from(bestByGame.values()).reduce((sum, v) => sum + v, 0);
}

export async function getGameHistory(userId: string, gameType: AnyGameType, limit = 20): Promise<GameSession[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("game_sessions")
    .select("id, game_type, score, total, xp_earned, created_at")
    .eq("user_id", userId)
    .eq("game_type", gameType)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return data as GameSession[];
}

export interface GameLeaderboardRow {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  bestScore: number;
  bestTotal: number;
  playedAt: string;
}

export async function getGameLeaderboard(gameType: AnyGameType, limit = 10): Promise<GameLeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_game_leaderboard", { p_game_type: gameType, p_limit: limit });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as { user_id: string; name: string; avatar_url: string | null; best_score: number; best_total: number; played_at: string }[]).map(
    (row) => ({
      user_id: row.user_id,
      name: row.name,
      avatarUrl: row.avatar_url,
      bestScore: row.best_score,
      bestTotal: row.best_total,
      playedAt: row.played_at,
    })
  );
}

export interface CombinedLeaderboardRow {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  totalXp: number;
  gamesPlayed: number;
  lastPlayedAt: string;
}

export async function getCombinedGameLeaderboard(limit = 10): Promise<CombinedLeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_combined_game_leaderboard", { p_limit: limit });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (
    (data ?? []) as {
      user_id: string;
      name: string;
      avatar_url: string | null;
      total_xp: number;
      games_played: number;
      last_played_at: string;
    }[]
  ).map((row) => ({
    user_id: row.user_id,
    name: row.name,
    avatarUrl: row.avatar_url,
    totalXp: row.total_xp,
    gamesPlayed: row.games_played,
    lastPlayedAt: row.last_played_at,
  }));
}

// ─── Fun finance-themed titles for the top 3 of each game's leaderboard ───

const GAME_TITLES: Record<GameType, [string, string, string]> = {
  "random-mix": ["Đại Sư Trộn Ngẫu Nhiên", "Phù Thủy Tổng Hợp", "Cao Thủ Ngẫu Nhiên"],
  "financial-statement-match": ["Kế Toán Trưởng Vũ Trụ", "Thần Cân Đối Kế Toán", "Đại Sư Báo Cáo Tài Chính"],
  "en-vi-terms": ["Phù Thuỷ Song Ngữ Tài Chính", "Thánh Thuật Ngữ", "Dịch Giả Phố Wall"],
  "ratio-category": ["Bậc Thầy Chỉ Số", "Nhà Phân Tích Thượng Thừa", "Trùm Tỷ Số Tài Chính"],
  "term-definition": ["Từ Điển Sống", "Học Giả Tài Chính", "Bộ Não Bách Khoa"],
  "formula-match": ["Thần Đồng Công Thức", "Pháp Sư Con Số", "Cao Thủ Định Lượng"],
  "risk-category": ["Vệ Thần Danh Mục", "Cao Thủ Quản Trị Rủi Ro", "Bậc Thầy Phân Bổ Tài Sản"],
  "ticker-match": ["Thổ Địa Sàn Chứng Khoán", "Cao Thủ Đọc Bảng Điện", "Huyền Thoại Mã Cổ Phiếu"],
  "cost-category": ["Kế Toán Chi Phí Thượng Thừa", "Bậc Thầy Fixed & Variable", "Huyền Thoại Phân Loại Chi Phí"],
};

/** Rank is 1-based. Returns null for rank 4+. */
export function getGameTitle(gameType: GameType, rank: number): string | null {
  if (rank < 1 || rank > 3) return null;
  return GAME_TITLES[gameType][rank - 1];
}

const COMBINED_TITLES: [string, string, string] = ["Huyền Thoại Mini Game", "Đại Kiện Tướng Tài Chính", "Cao Thủ Toàn Năng"];

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
