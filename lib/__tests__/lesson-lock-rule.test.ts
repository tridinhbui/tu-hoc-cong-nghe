import { describe, it, expect } from "vitest";
import { computeLessonLocked } from "@/lib/lesson-lock-rule";
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
});
