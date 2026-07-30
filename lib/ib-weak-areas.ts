import { createClient } from "@/lib/supabase";
import { formatCategoryLabel } from "@/lib/ib-question-bank";

// "Which IB topic am I weakest in?" - derived from user_ib_question_attempts,
// the per-question record the submit route writes (see
// supabase/migrations/20260820_ib_question_attempts.sql).
//
// Before this existed the drill only stored an aggregate score per run, so a
// learner who kept failing DCF questions and acing accounting looked
// identical to one performing evenly. The point of a 276-question bank split
// across 14 topics is knowing which of the 14 to go back to.

export interface CategoryPerformance {
  /** Raw category string as stored, for filtering the bank. */
  category: string;
  /** Cleaned for display. */
  label: string;
  attempted: number;
  correct: number;
  /** 0-100, rounded. */
  accuracy: number;
}

/** Attempts below this in a category mean the accuracy figure is noise - two
 *  questions answered says nothing about whether someone knows LBO modelling.
 *  Categories under the threshold are reported but flagged as unreliable. */
export const MIN_ATTEMPTS_FOR_SIGNAL = 5;

export function isReliable(perf: CategoryPerformance): boolean {
  return perf.attempted >= MIN_ATTEMPTS_FOR_SIGNAL;
}

/** Per-category accuracy for a user, weakest first among the categories with
 *  enough attempts to mean anything. Returns an empty array when the table
 *  isn't migrated yet or the learner has done no IB drills. */
export async function getCategoryPerformance(userId: string): Promise<CategoryPerformance[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_ib_question_attempts")
    .select("category, correct")
    .eq("user_id", userId);

  if (error || !data) return [];

  const byCategory = new Map<string, { attempted: number; correct: number }>();
  for (const row of data as { category: string; correct: boolean }[]) {
    const entry = byCategory.get(row.category) ?? { attempted: 0, correct: 0 };
    entry.attempted++;
    if (row.correct) entry.correct++;
    byCategory.set(row.category, entry);
  }

  return Array.from(byCategory.entries())
    .map(([category, e]) => ({
      category,
      label: formatCategoryLabel(category),
      attempted: e.attempted,
      correct: e.correct,
      accuracy: e.attempted > 0 ? Math.round((e.correct / e.attempted) * 100) : 0,
    }))
    .sort((a, b) => {
      // Reliable categories first, then weakest accuracy, then most attempted
      // as the tie-break - a 40% over 20 questions is a stronger signal than
      // a 40% over 5.
      const aOk = isReliable(a);
      const bOk = isReliable(b);
      if (aOk !== bOk) return aOk ? -1 : 1;
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.attempted - a.attempted;
    });
}

/** The single topic most worth re-drilling, or null if there isn't enough
 *  data yet to name one honestly. */
export function weakestCategory(performance: CategoryPerformance[]): CategoryPerformance | null {
  const reliable = performance.filter(isReliable);
  if (reliable.length === 0) return null;
  return reliable[0];
}
