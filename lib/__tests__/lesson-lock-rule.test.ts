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
  it("is always unlocked, regardless of progress, prerequisites, or track — all lessons are open by product decision", () => {
    const prev = lesson({ id: 4, track: "professional" });
    const l = lesson({ id: 5, track: "personal", prerequisiteId: 1 });
    expect(computeLessonLocked(l, [prev, l], new Set(), new Set())).toBe(false);
    expect(computeLessonLocked(l, [prev, l], new Set([1, 4]), new Set())).toBe(false);
    expect(computeLessonLocked(l, [prev, l], new Set(), new Set([5]))).toBe(false);
  });
});
