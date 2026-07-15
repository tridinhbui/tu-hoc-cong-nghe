import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { FINANCE_GLOSSARY } from "@/lib/finance-glossary";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883";
}

export type GameType =
  | "financial-statement-match"
  | "en-vi-terms"
  | "ratio-category"
  | "term-definition"
  | "formula-match";

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
  accent: "emerald" | "sky" | "amber" | "violet" | "rose";
}

export const GAMES: GameMeta[] = [
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
];

export function getGameMeta(id: GameType): GameMeta {
  return GAMES.find((g) => g.id === id) ?? GAMES[0];
}

// Pass threshold to earn XP - a round that's mostly wrong shouldn't reward
// XP just for participating, but doesn't need to be perfect either.
const PASS_RATIO = 0.7;
const XP_PER_CORRECT = 2;

export function computeGameXp(score: number, total: number): number {
  if (total <= 0) return 0;
  if (score / total < PASS_RATIO) return 0;
  return Math.min(50, score * XP_PER_CORRECT);
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
  { term: "Tiền mặt", bucket: "balance-sheet" },
  { term: "Hàng tồn kho", bucket: "balance-sheet" },
  { term: "Khoản phải thu", bucket: "balance-sheet" },
  { term: "Tài sản cố định", bucket: "balance-sheet" },
  { term: "Khoản phải trả", bucket: "balance-sheet" },
  { term: "Nợ dài hạn", bucket: "balance-sheet" },
  { term: "Vốn chủ sở hữu", bucket: "balance-sheet" },
  { term: "Lợi nhuận giữ lại", bucket: "balance-sheet" },
  { term: "Doanh thu", bucket: "income-statement" },
  { term: "Giá vốn hàng bán", bucket: "income-statement" },
  { term: "Lợi nhuận gộp", bucket: "income-statement" },
  { term: "Chi phí bán hàng", bucket: "income-statement" },
  { term: "Khấu hao", bucket: "income-statement" },
  { term: "Lợi nhuận trước thuế", bucket: "income-statement" },
  { term: "Thuế thu nhập doanh nghiệp", bucket: "income-statement" },
  { term: "Lợi nhuận ròng", bucket: "income-statement" },
  { term: "Dòng tiền hoạt động", bucket: "cash-flow" },
  { term: "Dòng tiền đầu tư", bucket: "cash-flow" },
  { term: "Dòng tiền tài chính", bucket: "cash-flow" },
  { term: "Chi mua tài sản cố định", bucket: "cash-flow" },
  { term: "Trả cổ tức", bucket: "cash-flow" },
  { term: "Vay nợ mới", bucket: "cash-flow" },
  { term: "Thay đổi tiền mặt ròng", bucket: "cash-flow" },
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
};

export function getBucketConfig(gameType: GameType): BucketConfig {
  return BUCKET_CONFIGS[gameType] ?? BUCKET_CONFIGS["financial-statement-match"]!;
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
};

export function getPairConfig(gameType: GameType): PairConfig {
  const cfg = PAIR_CONFIGS[gameType];
  if (cfg) return cfg;
  // Fallback: en-vi-terms built from the glossary.
  const pool = Object.entries(FINANCE_GLOSSARY).map(([vi, en]) => ({ left: vi, right: en }));
  return { pool, roundSize: 8, leftLabel: "Tiếng Việt", rightLabel: "English", hint: "Kéo thả hoặc bấm chọn 1 thẻ rồi bấm thẻ tương ứng để ghép cặp." };
}

export function pickPairRound(gameType: GameType): { left: string; right: string }[] {
  const cfg = getPairConfig(gameType);
  return [...cfg.pool].sort(() => Math.random() - 0.5).slice(0, Math.min(cfg.roundSize, cfg.pool.length));
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
  gameType: GameType,
  score: number,
  total: number
): Promise<number> {
  const xpEarned = computeGameXp(score, total);
  const supabase = createClient();
  const { error } = await supabase
    .from("game_sessions")
    .insert([{ user_id: userId, game_type: gameType, score, total, xp_earned: xpEarned }]);

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
  return xpEarned;
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
    if (row.xp_earned > cur) bestByGame.set(row.game_type, row.xp_earned);
  }
  return Array.from(bestByGame.values()).reduce((sum, v) => sum + v, 0);
}

export async function getGameHistory(userId: string, gameType: GameType, limit = 20): Promise<GameSession[]> {
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

export async function getGameLeaderboard(gameType: GameType, limit = 10): Promise<GameLeaderboardRow[]> {
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
  "financial-statement-match": ["Kế Toán Trưởng Vũ Trụ", "Thần Cân Đối Kế Toán", "Đại Sư Báo Cáo Tài Chính"],
  "en-vi-terms": ["Phù Thuỷ Song Ngữ Tài Chính", "Thánh Thuật Ngữ", "Dịch Giả Phố Wall"],
  "ratio-category": ["Bậc Thầy Chỉ Số", "Nhà Phân Tích Thượng Thừa", "Trùm Tỷ Số Tài Chính"],
  "term-definition": ["Từ Điển Sống", "Học Giả Tài Chính", "Bộ Não Bách Khoa"],
  "formula-match": ["Thần Đồng Công Thức", "Pháp Sư Con Số", "Cao Thủ Định Lượng"],
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
