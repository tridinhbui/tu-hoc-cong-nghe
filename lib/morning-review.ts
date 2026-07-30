import type { SRSItemState } from "./spaced-repetition";
import { isDueForReview } from "./spaced-repetition";

// Picks and orders the 10 questions behind the 7:30 push
// (app/api/cron/morning-review). Two decisions live here, both of which
// exist because the plain mistake list on /on-tap-cau-sai is ordered by
// last_attempt_at and capped at 50 - fine for browsing, wrong for a
// 90-second session:
//
// 1. WHICH questions. A question missed four times is worth far more of a
//    short session than one missed once last night, and a card the spacing
//    schedule says is due is worth more than one reviewed this morning.
//
// 2. IN WHAT ORDER. Consecutive questions from the same lesson let someone
//    coast on the context they just loaded, which is blocked practice.
//    Interleaving - forcing a switch of topic between items - reliably
//    beats it on retention, and costs nothing but a reorder.

export const MORNING_REVIEW_SIZE = 10;

// Missing this many times means the normal review loop is not working on
// this question and repeating it verbatim is mostly wasted effort - so it
// goes to the front, where attention is highest.
const LEECH_WRONG_COUNT = 3;

export interface ReviewCandidate {
  lessonId: number;
  questionIndex: number;
  wrongCount: number;
  lastAttemptAt: string;
}

/** Lower is more urgent. */
function priorityTier(item: ReviewCandidate, srs: SRSItemState | undefined, now: Date): number {
  if (item.wrongCount >= LEECH_WRONG_COUNT) return 0;
  // No SRS state at all means it has never been through a review session,
  // which counts as due - otherwise brand new mistakes would sort last.
  if (!srs || isDueForReview(srs.nextReviewAt, now)) return 1;
  return 2;
}

/** Must stay byte-identical to OnTapCauSaiClient's own `itemKey`: the SRS
 *  map this indexes is what that page has already persisted to localStorage
 *  under `thtcdn_srs_states_<userId>`. A different separator here would not
 *  fail loudly - it would just silently miss every stored schedule and treat
 *  every question as never reviewed. */
export function reviewItemKey(item: { lessonId: number; questionIndex: number }): string {
  return `${item.lessonId}-${item.questionIndex}`;
}

/**
 * Reorders an already-chosen set so that no two adjacent items come from the
 * same lesson, wherever the mix allows it. Greedy: repeatedly take the
 * highest-priority item whose lesson differs from the previous one, falling
 * back to the highest-priority item left when every remaining candidate is
 * from that same lesson (which is what happens when someone's mistakes are
 * concentrated in one or two lessons - a real case, not an edge case).
 */
function interleaveByLesson<T extends { lessonId: number }>(items: T[]): T[] {
  const remaining = [...items];
  const ordered: T[] = [];
  let previousLessonId: number | null = null;

  while (remaining.length > 0) {
    let pick = remaining.findIndex((item) => item.lessonId !== previousLessonId);
    if (pick === -1) pick = 0;
    const [chosen] = remaining.splice(pick, 1);
    ordered.push(chosen);
    previousLessonId = chosen.lessonId;
  }

  return ordered;
}

/**
 * The morning session: at most `limit` questions, most-urgent first, then
 * spread across lessons.
 *
 * `srsMap` is keyed by reviewItemKey. It lives in the browser's
 * localStorage (see OnTapCauSaiClient), so the cron that sends the push
 * cannot see it - the cron only decides *whether* there is anything to
 * review, and this function decides what the session actually contains once
 * the page opens.
 */
export function selectMorningReview<T extends ReviewCandidate>(
  candidates: T[],
  srsMap: Record<string, SRSItemState> = {},
  now: Date = new Date(),
  limit: number = MORNING_REVIEW_SIZE,
): T[] {
  const ranked = [...candidates].sort((a, b) => {
    const tierDiff =
      priorityTier(a, srsMap[reviewItemKey(a)], now) - priorityTier(b, srsMap[reviewItemKey(b)], now);
    if (tierDiff !== 0) return tierDiff;

    // Within a tier: the more often missed comes first, then the one left
    // alone the longest.
    if (a.wrongCount !== b.wrongCount) return b.wrongCount - a.wrongCount;
    return new Date(a.lastAttemptAt).getTime() - new Date(b.lastAttemptAt).getTime();
  });

  return interleaveByLesson(ranked.slice(0, limit));
}
