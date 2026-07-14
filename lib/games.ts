import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { FINANCE_GLOSSARY } from "@/lib/finance-glossary";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883";
}

export type GameType = "financial-statement-match" | "en-vi-terms";

export const GAMES: { id: GameType; title: string; description: string; emoji: string }[] = [
  {
    id: "financial-statement-match",
    title: "Kéo thả: Báo cáo tài chính",
    description: "Kéo từng khoản mục vào đúng báo cáo tài chính (Bảng cân đối / Kết quả kinh doanh / Lưu chuyển tiền tệ).",
    emoji: "📊",
  },
  {
    id: "en-vi-terms",
    title: "Kéo thả: Thuật ngữ Anh - Việt",
    description: "Ghép đúng cặp thuật ngữ tài chính English ↔ Tiếng Việt, lấy từ chính các bài bạn đã học.",
    emoji: "🔤",
  },
];

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

// ─── Fun finance-themed titles for the top 3 of each game's leaderboard ───

const GAME_TITLES: Record<GameType, [string, string, string]> = {
  "financial-statement-match": ["Kế Toán Trưởng Vũ Trụ", "Thần Cân Đối Kế Toán", "Đại Sư Báo Cáo Tài Chính"],
  "en-vi-terms": ["Phù Thuỷ Song Ngữ Tài Chính", "Thánh Thuật Ngữ", "Dịch Giả Phố Wall"],
};

/** Rank is 1-based. Returns null for rank 4+. */
export function getGameTitle(gameType: GameType, rank: number): string | null {
  if (rank < 1 || rank > 3) return null;
  return GAME_TITLES[gameType][rank - 1];
}
