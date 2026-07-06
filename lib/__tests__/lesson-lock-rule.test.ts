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
  it("is never locked when the lesson is fundamental, regardless of progress", () => {
    const l = lesson({ id: 5, isFundamental: true });
    expect(computeLessonLocked(l, [l], new Set(), new Set())).toBe(false);
  });

  it("is unlocked when the user has an explicit admin unlock grant", () => {
    const l = lesson({ id: 5 });
    expect(computeLessonLocked(l, [l], new Set(), new Set([5]))).toBe(false);
  });

  it("is locked when the implicit prerequisite (id - 1) is not completed", () => {
    const prev = lesson({ id: 4 });
    const l = lesson({ id: 5 });
    expect(computeLessonLocked(l, [prev, l], new Set(), new Set())).toBe(true);
  });

  it("is unlocked once the implicit prerequisite (id - 1) is completed", () => {
    const prev = lesson({ id: 4 });
    const l = lesson({ id: 5 });
    expect(computeLessonLocked(l, [prev, l], new Set([4]), new Set())).toBe(false);
  });

  it("respects an explicit prerequisiteId override instead of id - 1", () => {
    const prereq = lesson({ id: 1 });
    const filler = lesson({ id: 4 }); // not completed, but not the real prerequisite
    const l = lesson({ id: 5, prerequisiteId: 1 });
    // Locked based on prereq (id 1) completion, not filler (id 4).
    expect(computeLessonLocked(l, [prereq, filler, l], new Set(), new Set())).toBe(true);
    expect(computeLessonLocked(l, [prereq, filler, l], new Set([1]), new Set())).toBe(false);
    expect(computeLessonLocked(l, [prereq, filler, l], new Set([4]), new Set())).toBe(true);
  });

  it("does not lock across tracks for an implicit (id - 1) prerequisite", () => {
    // Day 201 (personal) sits right after Day 200 (professional finale) —
    // must not be locked behind a professional-track lesson.
    const professionalFinale = lesson({ id: 200, track: "professional" });
    const personalStart = lesson({ id: 201, track: "personal" });
    expect(
      computeLessonLocked(personalStart, [professionalFinale, personalStart], new Set(), new Set())
    ).toBe(false);
  });

  it("still enforces an explicit prerequisiteId even across tracks", () => {
    const otherTrackPrereq = lesson({ id: 100, track: "professional" });
    const l = lesson({ id: 201, track: "personal", prerequisiteId: 100 });
    expect(computeLessonLocked(l, [otherTrackPrereq, l], new Set(), new Set())).toBe(true);
    expect(computeLessonLocked(l, [otherTrackPrereq, l], new Set([100]), new Set())).toBe(false);
  });

  it("is unlocked if the prerequisite lesson can't be found at all", () => {
    const l = lesson({ id: 5 }); // implicit prerequisite id 4 doesn't exist in the list
    expect(computeLessonLocked(l, [l], new Set(), new Set())).toBe(false);
  });
});
