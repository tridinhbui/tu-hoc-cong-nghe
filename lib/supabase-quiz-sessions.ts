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

export interface QuizAnswerSubmission {
  token: string;
  selected: number;
}

// Grades and records a quiz session server-side (app/api/knowledge-challenge/submit)
// instead of inserting a client-computed score/xp_earned directly - direct
// insert is revoked for `authenticated` (see
// supabase/migrations/20260714_harden_quiz_writes.sql) precisely so a
// score/XP value can no longer be fabricated from devtools. `answers` are
// the signed per-question tokens from the /api/knowledge-challenge
// response, each paired with the option index the learner picked - the
// server re-derives the score from those tokens, it never trusts a score
// computed in the browser.
export async function submitQuizSession(
  track: QuizTrack,
  difficulty: QuizDifficulty,
  answers: QuizAnswerSubmission[]
): Promise<{ score: number; total: number; xpEarned: number }> {
  const res = await fetch("/api/knowledge-challenge/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "quiz", track, difficulty, answers }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit quiz session (${res.status})`);
  }

  return res.json();
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
