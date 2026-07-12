import { describe, it, expect } from "vitest";
import { computeLessonLocked, isChallengeGated } from "@/lib/lesson-lock-rule";
import type { LessonMeta } from "@/lib/lesson-types";

function lesson(overrides: Partial<LessonMeta> & { id: number }): LessonMeta {
  return {
    slug: `lesson-${overrides.id}`,
    title: `Lesson ${overrides.id}`,
    subtitle: "",
    duration: "5 phút",
    difficulty: "Dễ",
    ...overrides,
  };
}

describe("computeLessonLocked", () => {
  it("is disabled site-wide - always returns false regardless of progress", () => {
    // Matches the early return added to computeLessonLocked itself
    // (lib/lesson-lock-rule.ts) per an explicit "unlock every lesson"
    // request. The suite below (skipped, not deleted) is the real
    // sequential-unlock behavior and should pass again unmodified the
    // moment that early return is removed.
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l8 = lesson({ id: 8, track: "personal" });
    expect(computeLessonLocked(l8, lessons, new Set(), new Set())).toBe(false);
  });
});

describe.skip("computeLessonLocked (sequential-unlock rule - re-enable by removing the early return in lib/lesson-lock-rule.ts)", () => {
  it("unlocks first 7 lessons in each stage regardless of progress", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l7 = lesson({ id: 7, track: "personal" });
    const l8 = lesson({ id: 8, track: "personal" });

    expect(computeLessonLocked(l7, lessons, new Set(), new Set())).toBe(false);
    expect(computeLessonLocked(l8, lessons, new Set(), new Set())).toBe(true);
  });

  it("locks lessons beyond first 7 until previous lesson is completed", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l8 = lesson({ id: 8, track: "personal" });
    const l9 = lesson({ id: 9, track: "personal" });

    // Lesson 8 locked without lesson 7 completed
    expect(computeLessonLocked(l8, lessons, new Set(), new Set())).toBe(true);

    // Lesson 8 unlocked with lesson 7 completed
    expect(computeLessonLocked(l8, lessons, new Set([7]), new Set())).toBe(false);

    // Lesson 9 locked without lesson 8 completed
    expect(computeLessonLocked(l9, lessons, new Set([7]), new Set())).toBe(true);

    // Lesson 9 unlocked with lesson 8 completed
    expect(computeLessonLocked(l9, lessons, new Set([7, 8]), new Set())).toBe(false);
  });

  it("respects admin unlock grants", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l8 = lesson({ id: 8, track: "personal" });

    // Lesson 8 locked normally
    expect(computeLessonLocked(l8, lessons, new Set(), new Set())).toBe(true);

    // Lesson 8 unlocked via admin grant
    expect(computeLessonLocked(l8, lessons, new Set(), new Set([8]))).toBe(false);
  });

  it("always unlocks fundamental lessons", () => {
    const l8 = lesson({ id: 8, track: "personal", isFundamental: true });

    expect(computeLessonLocked(l8, [], new Set(), new Set())).toBe(false);
  });

  it("requires passing the gate challenge for challenge-gated lessons even once the prerequisite is done", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l10 = lesson({ id: 10, track: "personal" }); // 10 % 5 === 0 -> gated

    expect(isChallengeGated(10)).toBe(true);
    expect(isChallengeGated(9)).toBe(false);

    // Prerequisite (lesson 9) done, but challenge not passed - still locked.
    expect(computeLessonLocked(l10, lessons, new Set([9]), new Set())).toBe(true);

    // Prerequisite done and challenge passed - unlocked.
    expect(computeLessonLocked(l10, lessons, new Set([9]), new Set(), new Set([10]))).toBe(false);
  });

  it("does not require a challenge pass for non-gated lessons", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => lesson({ id: i + 1, track: "personal" }));
    const l9 = lesson({ id: 9, track: "personal" }); // not a multiple of 5

    expect(computeLessonLocked(l9, lessons, new Set([8]), new Set())).toBe(false);
  });
});
