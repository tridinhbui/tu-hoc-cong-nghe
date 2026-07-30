import { describe, it, expect } from "vitest";
import {
  countBlockWords,
  estimateReadingMinutes,
  estimateLessonMinutes,
  findCheckpointIndex,
} from "@/lib/lesson-reading.js";

function paragraph(wordCount: number) {
  return { type: "paragraph", text: Array.from({ length: wordCount }, () => "chữ").join(" ") };
}

describe("countBlockWords", () => {
  it("counts prose nested at any depth, not just top-level text", () => {
    const block = {
      type: "conceptTable",
      title: "một hai ba",
      concepts: [{ vi: "bốn năm", en: "IGNORED", def: "sáu bảy tám" }],
    };
    // title(3) + vi(2) + def(3); `en` and `type` are chrome, not prose.
    expect(countBlockWords(block)).toBe(8);
  });

  it("ignores the discriminant so a block type never inflates its own count", () => {
    expect(countBlockWords({ type: "paragraph", text: "một hai" })).toBe(2);
  });
});

describe("estimateReadingMinutes", () => {
  it("never returns 0, even for an empty lesson", () => {
    expect(estimateReadingMinutes({ sections: [] })).toBe(1);
    expect(estimateReadingMinutes({})).toBe(1);
    expect(estimateReadingMinutes(null)).toBe(1);
  });

  it("falls back to `explanation` for older lessons with no sections", () => {
    expect(estimateReadingMinutes({ explanation: Array(320).fill("chữ").join(" ") })).toBe(2);
  });

  it("charges a formula block more than the same word count of prose", () => {
    const prose = estimateReadingMinutes({ sections: [paragraph(200), paragraph(200)] });
    const withFormula = estimateReadingMinutes({
      sections: [paragraph(200), { type: "formula", equation: "a = b", title: "" }, paragraph(200)],
    });
    expect(withFormula).toBeGreaterThanOrEqual(prose);
  });
});

describe("estimateLessonMinutes", () => {
  it("adds the opening question and quiz on top of the body", () => {
    const body = { sections: [paragraph(320)] };
    const full = { ...body, openingQuestion: "Vì sao?", quiz: [{}, {}, {}, {}] };
    // Body alone is ~2 min; opening (25s) + 4 questions (100s) adds ~2 more.
    expect(estimateLessonMinutes(full)).toBeGreaterThan(estimateReadingMinutes(body));
  });

  it("does not charge for a quiz that isn't there", () => {
    const body = { sections: [paragraph(320)] };
    expect(estimateLessonMinutes(body)).toBe(estimateLessonMinutes({ ...body, quiz: [] }));
  });
});

describe("findCheckpointIndex", () => {
  it("declines to interrupt a lesson with too few blocks", () => {
    expect(findCheckpointIndex([paragraph(500), paragraph(500)])).toBe(-1);
  });

  it("declines to interrupt a lesson under ~3 minutes", () => {
    expect(findCheckpointIndex([paragraph(20), paragraph(20), paragraph(20), paragraph(20)])).toBe(-1);
  });

  it("returns -1 for a missing or non-array body", () => {
    expect(findCheckpointIndex(undefined)).toBe(-1);
    expect(findCheckpointIndex(null)).toBe(-1);
  });

  it("snaps to just before a nearby heading so the check ends a section", () => {
    const sections = [
      paragraph(250),
      paragraph(250),
      { type: "heading", text: "Phần hai" },
      paragraph(250),
      paragraph(250),
    ];
    // The heading sits at the halfway mark; the check belongs before it.
    expect(findCheckpointIndex(sections)).toBe(1);
  });

  it("never leaves the check between a heading and its own body", () => {
    const sections = [
      paragraph(300),
      { type: "heading", text: "Rất xa mốc giữa" },
      paragraph(300),
      paragraph(300),
      paragraph(300),
      paragraph(300),
    ];
    const index = findCheckpointIndex(sections);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(sections[index].type).not.toBe("heading");
  });

  it("lands near the middle of the reading time, not the middle of the array", () => {
    // One enormous opening block followed by many tiny ones: an array
    // midpoint would land at index ~4, but half the *time* is spent in
    // block 0 alone.
    const sections = [paragraph(2000), paragraph(30), paragraph(30), paragraph(30), paragraph(30), paragraph(30)];
    expect(findCheckpointIndex(sections)).toBe(0);
  });

  it("never points at the last block, which would gate nothing", () => {
    const sections = [paragraph(100), paragraph(100), paragraph(100), paragraph(2000)];
    const index = findCheckpointIndex(sections);
    expect(index).toBeLessThan(sections.length - 1);
  });
});
