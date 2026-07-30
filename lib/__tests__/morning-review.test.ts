import { describe, it, expect } from "vitest";
import { selectMorningReview, reviewItemKey, MORNING_REVIEW_SIZE, type ReviewCandidate } from "@/lib/morning-review";
import type { SRSItemState } from "@/lib/spaced-repetition";

const NOW = new Date("2026-07-30T00:30:00Z");

function candidate(
  lessonId: number,
  questionIndex: number,
  wrongCount = 1,
  daysAgo = 1,
): ReviewCandidate {
  return {
    lessonId,
    questionIndex,
    wrongCount,
    lastAttemptAt: new Date(NOW.getTime() - daysAgo * 86_400_000).toISOString(),
  };
}

function srs(nextReviewAt: string): SRSItemState {
  return { level: 2, intervalDays: 3, nextReviewAt };
}

describe("selectMorningReview", () => {
  it("caps the session at ten questions", () => {
    const many = Array.from({ length: 40 }, (_, i) => candidate(i, 0));
    expect(selectMorningReview(many, {}, NOW)).toHaveLength(MORNING_REVIEW_SIZE);
    expect(MORNING_REVIEW_SIZE).toBe(10);
  });

  it("returns an empty session when there is nothing to review", () => {
    expect(selectMorningReview([], {}, NOW)).toEqual([]);
  });

  it("puts leeches ahead of questions missed only once", () => {
    const items = [candidate(1, 0, 1), candidate(2, 0, 5), candidate(3, 0, 1)];
    expect(selectMorningReview(items, {}, NOW)[0].lessonId).toBe(2);
  });

  it("ranks a question not yet due below one that is", () => {
    const notDue = candidate(1, 0);
    const due = candidate(2, 0);
    const map = {
      [reviewItemKey(notDue)]: srs(new Date(NOW.getTime() + 5 * 86_400_000).toISOString()),
      [reviewItemKey(due)]: srs(new Date(NOW.getTime() - 86_400_000).toISOString()),
    };
    expect(selectMorningReview([notDue, due], map, NOW)[0].lessonId).toBe(2);
  });

  it("treats a question with no SRS history as due, not as least urgent", () => {
    const neverReviewed = candidate(1, 0);
    const scheduledFarOut = candidate(2, 0);
    const map = {
      [reviewItemKey(scheduledFarOut)]: srs(new Date(NOW.getTime() + 10 * 86_400_000).toISOString()),
    };
    expect(selectMorningReview([neverReviewed, scheduledFarOut], map, NOW)[0].lessonId).toBe(1);
  });

  it("never places two questions from the same lesson back to back", () => {
    const items = [
      candidate(1, 0), candidate(1, 1), candidate(1, 2),
      candidate(2, 0), candidate(2, 1),
      candidate(3, 0),
    ];
    const session = selectMorningReview(items, {}, NOW);
    for (let i = 1; i < session.length; i++) {
      expect(session[i].lessonId, `vị trí ${i} trùng bài với vị trí ${i - 1}`).not.toBe(session[i - 1].lessonId);
    }
  });

  it("still returns everything when every mistake is in one lesson", () => {
    // Interleaving is impossible here - dropping items to satisfy it would
    // silently shrink the session, which is worse than blocked practice.
    const items = [candidate(1, 0), candidate(1, 1), candidate(1, 2)];
    expect(selectMorningReview(items, {}, NOW)).toHaveLength(3);
  });

  it("does not mutate the caller's array", () => {
    const items = [candidate(3, 0), candidate(1, 0), candidate(2, 0)];
    const snapshot = items.map((i) => i.lessonId);
    selectMorningReview(items, {}, NOW);
    expect(items.map((i) => i.lessonId)).toEqual(snapshot);
  });

  it("breaks ties by staleness, oldest attempt first", () => {
    const recent = candidate(1, 0, 2, 1);
    const stale = candidate(2, 0, 2, 30);
    expect(selectMorningReview([recent, stale], {}, NOW)[0].lessonId).toBe(2);
  });
});
