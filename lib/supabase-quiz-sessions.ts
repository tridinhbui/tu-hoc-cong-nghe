import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

export type QuizTrack = "personal" | "professional" | "cfa";
export type QuizDifficulty = "de" | "trung-binh" | "kho" | "tat-ca";

// "Table not found in schema cache" (PostgREST) or "relation does not
// exist" (raw Postgres) - user_quiz_sessions is a new table
// (supabase/migrations/20260712_user_quiz_sessions.sql) that may not be
// applied to every environment yet. Quiz XP is a nice-to-have on top of
// lesson-completion XP, not something worth crashing the quiz page over,
// so a missing table degrades to "0 bonus XP" instead of throwing.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

// 5 XP per correct answer - a full 5-question quiz with a perfect score
// earns 25 XP, roughly 2.5x a single lesson completion (10 XP), which
// feels proportional to "reviewed material across a whole track" rather
// than "read one lesson".
const XP_PER_CORRECT_ANSWER = 5;

export function computeQuizXp(score: number, total: number): number {
  if (total <= 0) return 0;
  return score * XP_PER_CORRECT_ANSWER;
}

export async function recordQuizSession(
  userId: string,
  track: QuizTrack,
  difficulty: QuizDifficulty,
  score: number,
  total: number
): Promise<number> {
  const xpEarned = computeQuizXp(score, total);
  const supabase = createClient();
  const { error } = await supabase
    .from("user_quiz_sessions")
    .insert([{ user_id: userId, track, difficulty, score, total, xp_earned: xpEarned }]);

  if (error && !isMissingTableError(error)) {
    throw handleSupabaseError(error);
  }
  return xpEarned;
}

/** Sum of XP earned from all past standalone quiz sessions - added on top
 *  of lesson-completion XP in recalculateUserStats. Returns 0 (not an
 *  error) if the table isn't there yet. */
export async function getTotalQuizXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_quiz_sessions")
    .select("xp_earned")
    .eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }
  return (data ?? []).reduce((sum, row) => sum + (row.xp_earned as number), 0);
}
