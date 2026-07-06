import { describe, it, expect } from "vitest";
import { isLessonIdInTrack } from "@/lib/track-stages";

describe("isLessonIdInTrack", () => {
  it("classifies Day 1 (personal Chặng 1) as personal, not professional", () => {
    expect(isLessonIdInTrack(1, "personal")).toBe(true);
    expect(isLessonIdInTrack(1, "professional")).toBe(false);
  });

  it("classifies Day 21 (professional Chặng 1: Kế toán nền tảng) as professional, not personal", () => {
    // This is the exact bug fixed this session: getResumeLesson() filtered
    // by an explicit `track` field that almost no lesson object actually has,
    // so the professional track always looked empty. isLessonIdInTrack must
    // classify by day-number range instead.
    expect(isLessonIdInTrack(21, "professional")).toBe(true);
    expect(isLessonIdInTrack(21, "personal")).toBe(false);
  });

  it("classifies Chặng 0 (Days 263-268, personal foundation) correctly", () => {
    expect(isLessonIdInTrack(263, "personal")).toBe(true);
    expect(isLessonIdInTrack(268, "personal")).toBe(true);
    expect(isLessonIdInTrack(263, "professional")).toBe(false);
  });

  it("classifies Day 1101 (professional Chặng 10, advanced) as professional", () => {
    expect(isLessonIdInTrack(1101, "professional")).toBe(true);
    expect(isLessonIdInTrack(1101, "personal")).toBe(false);
  });

  it("returns false for an id that falls in no stage's day range on either track", () => {
    expect(isLessonIdInTrack(99999, "personal")).toBe(false);
    expect(isLessonIdInTrack(99999, "professional")).toBe(false);
  });
});
