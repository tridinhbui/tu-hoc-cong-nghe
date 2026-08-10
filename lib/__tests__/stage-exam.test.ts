import { describe, it, expect } from "vitest";
import {
  passedStageExam,
  stageExamPassed,
  stageLessonIds,
  findStage,
  getTrackStages,
  buildEligibility,
  STAGE_EXAM_PASS_RATIO,
  STAGE_EXAM_QUESTION_COUNT,
  MIN_QUESTIONS_FOR_STAGE_EXAM,
  STAGE_EXAM_RETRY_COOLDOWN_MS,
  retryCooldownRemaining,
  formatCooldown,
} from "@/lib/stage-exam";
import type { Stage } from "@/lib/track-stages";

// Passing this exam credits an entire chặng - 20+ lessons and the XP for all
// of them - so the threshold and the stage->lesson resolution are the two
// things that must not drift.

describe("passedStageExam", () => {
  it("requires the full pass ratio, rounded up", () => {
    // 15 questions at 80% = 12 needed, not 11.
    expect(passedStageExam(11, 15)).toBe(false);
    expect(passedStageExam(12, 15)).toBe(true);
  });

  it("is stricter than the 60% used for an ordinary quiz gate", () => {
    expect(STAGE_EXAM_PASS_RATIO).toBeGreaterThan(0.6);
  });

  it("fails a zero-question submission rather than passing vacuously", () => {
    // Math.ceil(0 * 0.8) === 0, so a naive `score >= threshold` would pass
    // an empty answer set - which would credit a whole chặng for nothing.
    expect(passedStageExam(0, 0)).toBe(false);
  });

  it("fails when every answer was wrong", () => {
    expect(passedStageExam(0, 15)).toBe(false);
  });

  it("passes a perfect score", () => {
    expect(passedStageExam(15, 15)).toBe(true);
  });

  it("scales with however many answers actually counted", () => {
    // Tokens from another stage are discarded before grading, so `total` can
    // be lower than the number of questions served.
    expect(passedStageExam(4, 5)).toBe(true);
    expect(passedStageExam(3, 5)).toBe(false);
  });
});

describe("stageLessonIds", () => {
  const allIds = [1, 2, 3, 4, 5, 900, 901];

  it("returns the ids inside the stage's day range", () => {
    const stage = {
      label: "X",
      name: "x",
      days: [2, 4],
      available: true,
      parts: [],
    } as unknown as Stage;
    expect(stageLessonIds(stage, allIds)).toEqual([2, 3, 4]);
  });

  it("includes extraLessonIds declared on the stage", () => {
    const stage = {
      label: "X",
      name: "x",
      days: [2, 3],
      extraLessonIds: [900],
      available: true,
      parts: [],
    } as unknown as Stage;
    expect(stageLessonIds(stage, allIds)).toEqual([2, 3, 900]);
  });

  it("includes extraLessonIds declared on a part", () => {
    const stage = {
      label: "X",
      name: "x",
      days: [2, 3],
      available: true,
      parts: [{ name: "p", days: [2, 3], extraLessonIds: [901] }],
    } as unknown as Stage;
    expect(stageLessonIds(stage, allIds)).toEqual([2, 3, 901]);
  });

  it("ignores extra ids that aren't real lessons", () => {
    const stage = {
      label: "X",
      name: "x",
      days: [2, 2],
      extraLessonIds: [999999],
      available: true,
      parts: [],
    } as unknown as Stage;
    expect(stageLessonIds(stage, allIds)).toEqual([2]);
  });

  it("does not duplicate an extra id already inside the range", () => {
    const stage = {
      label: "X",
      name: "x",
      days: [2, 4],
      extraLessonIds: [3],
      available: true,
      parts: [],
    } as unknown as Stage;
    expect(stageLessonIds(stage, allIds)).toEqual([2, 3, 4]);
  });
});

describe("findStage", () => {
  it("resolves a real stage label on each track", () => {
    for (const track of ["personal", "professional"] as const) {
      const first = getTrackStages(track)[0];
      expect(findStage(track, first.label)?.name).toBe(first.name);
    }
  });

  it("returns null for an unknown label instead of falling back to a stage", () => {
    // The route 404s on null; silently defaulting would let a crafted request
    // credit a chặng the learner never named.
    expect(findStage("personal", "Chặng 999")).toBeNull();
    expect(findStage("personal", "")).toBeNull();
  });
});

describe("buildEligibility", () => {
  const stage = { label: "Chặng 1", name: "Nền tảng", days: [1, 5], available: true, parts: [] } as unknown as Stage;

  it("marks a stage with too few questions as ineligible", () => {
    const e = buildEligibility(stage, [1, 2, 3], MIN_QUESTIONS_FOR_STAGE_EXAM - 1, new Set());
    expect(e.eligible).toBe(false);
  });

  it("marks a stage with enough questions as eligible", () => {
    const e = buildEligibility(stage, [1, 2, 3], MIN_QUESTIONS_FOR_STAGE_EXAM, new Set());
    expect(e.eligible).toBe(true);
  });

  it("is ineligible when the stage has no lessons at all", () => {
    const e = buildEligibility(stage, [], 100, new Set());
    expect(e.eligible).toBe(false);
  });

  it("counts only this stage's completed lessons", () => {
    const e = buildEligibility(stage, [1, 2, 3], 50, new Set([1, 3, 99]));
    expect(e.completedCount).toBe(2);
    expect(e.lessonCount).toBe(3);
  });

  it("requires enough questions to fill an exam without repeating", () => {
    expect(MIN_QUESTIONS_FOR_STAGE_EXAM).toBeGreaterThanOrEqual(STAGE_EXAM_QUESTION_COUNT);
  });
});

describe("retryCooldownRemaining", () => {
  const now = new Date("2026-07-30T12:00:00Z").getTime();

  it("allows a retry when there is no prior failure", () => {
    expect(retryCooldownRemaining(null, now)).toBe(0);
  });

  it("blocks immediately after a failure", () => {
    const justNow = new Date(now - 1000).toISOString();
    expect(retryCooldownRemaining(justNow, now)).toBeGreaterThan(0);
  });

  it("allows a retry once the cooldown has elapsed", () => {
    const longAgo = new Date(now - STAGE_EXAM_RETRY_COOLDOWN_MS - 1).toISOString();
    expect(retryCooldownRemaining(longAgo, now)).toBe(0);
  });

  it("allows a retry exactly at the boundary", () => {
    const exactly = new Date(now - STAGE_EXAM_RETRY_COOLDOWN_MS).toISOString();
    expect(retryCooldownRemaining(exactly, now)).toBe(0);
  });

  it("does not block on a clock skew that puts the failure in the future", () => {
    // A future timestamp would otherwise produce a cooldown longer than the
    // window, locking someone out for hours over a few seconds of drift.
    const future = new Date(now + 60_000).toISOString();
    expect(retryCooldownRemaining(future, now)).toBe(0);
  });

  it("ignores an unparseable timestamp rather than locking the learner out", () => {
    expect(retryCooldownRemaining("not-a-date", now)).toBe(0);
  });
});

const VI_COOLDOWN = { minutes: "{n} phút", hours: "{n} giờ", hoursMinutes: "{h} giờ {m} phút" };

describe("formatCooldown", () => {
  it("reads in minutes under an hour, rounding up", () => {
    expect(formatCooldown(60_000, VI_COOLDOWN)).toBe("1 phút");
    expect(formatCooldown(90_000, VI_COOLDOWN)).toBe("2 phút");
  });

  it("reads in hours and minutes above an hour", () => {
    expect(formatCooldown(60 * 60_000, VI_COOLDOWN)).toBe("1 giờ");
    expect(formatCooldown(65 * 60_000, VI_COOLDOWN)).toBe("1 giờ 5 phút");
  });
});

describe("stageExamPassed - the rule the route applies", () => {
  it("passes a full paper at or above the ratio", () => {
    expect(stageExamPassed(12, 15, 15)).toBe(true);
    expect(stageExamPassed(15, 15, 15)).toBe(true);
  });

  it("fails a full paper below the ratio", () => {
    expect(stageExamPassed(11, 15, 15)).toBe(false);
  });

  it("fails a single correct answer submitted alone", () => {
    // The exploit this exists to close: before it, one correct answer scored
    // 1/1, cleared the 80% ratio, and credited an entire chặng - 20+ lessons
    // and the XP for all of them.
    expect(stageExamPassed(1, 1, 15)).toBe(false);
  });

  it("fails a short paper even when every answer on it was right", () => {
    expect(stageExamPassed(3, 3, 15)).toBe(false);
    expect(stageExamPassed(14, 14, 15)).toBe(false);
  });

  it("fails an empty submission", () => {
    expect(stageExamPassed(0, 0, 15)).toBe(false);
  });

  it("fails when the stage has no questions to expect", () => {
    expect(stageExamPassed(0, 0, 0)).toBe(false);
  });

  it("accepts a shorter exam when the pool itself is small", () => {
    // A 10-question pool serves a 10-question exam; 8 of 10 is a real pass.
    expect(stageExamPassed(8, 10, 10)).toBe(true);
    expect(stageExamPassed(7, 10, 10)).toBe(false);
  });
});
