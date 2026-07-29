import { describe, it, expect } from "vitest";
import { calculateNextSRS, isDueForReview } from "../spaced-repetition";

describe("Spaced Repetition Algorithm (SM-2 / Leitner Box)", () => {
  const now = new Date("2026-07-29T10:00:00Z");

  it("resets interval to 1 day on 'forget'", () => {
    const res = calculateNextSRS(3, "forget", now);
    expect(res.level).toBe(1);
    expect(res.intervalDays).toBe(1);
    expect(res.nextReviewAt).toBe("2026-07-30T10:00:00.000Z");
  });

  it("sets interval to 3 days on 'hard'", () => {
    const res = calculateNextSRS(2, "hard", now);
    expect(res.level).toBe(2);
    expect(res.intervalDays).toBe(3);
    expect(res.nextReviewAt).toBe("2026-08-01T10:00:00.000Z");
  });

  it("increments level and sets 7 days on 'good' from level 2", () => {
    const res = calculateNextSRS(2, "good", now);
    expect(res.level).toBe(3);
    expect(res.intervalDays).toBe(7);
    expect(res.nextReviewAt).toBe("2026-08-05T10:00:00.000Z");
  });

  it("sets interval to 30 days and level 4 on 'mastered'", () => {
    const res = calculateNextSRS(1, "mastered", now);
    expect(res.level).toBe(4);
    expect(res.intervalDays).toBe(30);
    expect(res.nextReviewAt).toBe("2026-08-28T10:00:00.000Z");
  });

  it("correctly evaluates if an item is due for review", () => {
    expect(isDueForReview(null, now)).toBe(true);
    expect(isDueForReview("2026-07-28T10:00:00.000Z", now)).toBe(true);
    expect(isDueForReview("2026-07-31T10:00:00.000Z", now)).toBe(false);
  });
});
