import { describe, expect, it } from "vitest";
import { computeFlowProgress } from "@/lib/learning-flow-progress";
import type { LearningFlow } from "@/lib/learning-flows";

const FLOW: LearningFlow = {
  id: "website",
  emoji: "🏠",
  status: "ready",
  firstWinSlug: "a",
  steps: [
    { id: "s1", lessonSlugs: ["a", "b"] },
    { id: "s2", lessonSlugs: ["c", "d"] },
  ],
  branches: { deepenSlug: "x", buildSlug: "y" },
};
const titles: Record<string, string> = { a: "A", b: "B", c: "C", d: "D", x: "X", y: "Y" };
const titleOf = (s: string) => titles[s];

describe("computeFlowProgress", () => {
  it("starts at the first win, in chapter 1", () => {
    const p = computeFlowProgress(FLOW, new Set(), titleOf);
    expect(p).toMatchObject({ done: 0, total: 6, stepIndex: 0, next: { slug: "a", title: "A" } });
  });

  it("follows journey order, not alphabetical or id order", () => {
    const p = computeFlowProgress(FLOW, new Set(["a", "b", "d"]), titleOf);
    expect(p.next?.slug).toBe("c");
    expect(p.stepIndex).toBe(1);
    expect(p.done).toBe(3);
  });

  // Hai nhánh cuối là lựa chọn của người học, nên hết các chặng là "xong" dù
  // bài nhánh chưa học - thẻ không được đẩy họ vào một nhánh.
  it("never proposes a branch lesson as next", () => {
    const p = computeFlowProgress(FLOW, new Set(["a", "b", "c", "d"]), titleOf);
    expect(p.next).toBeNull();
    expect(p.stepIndex).toBe(2);
  });

  it("skips slugs that no longer resolve to a lesson", () => {
    const p = computeFlowProgress(FLOW, new Set(), (s) => (s === "a" ? undefined : titles[s]));
    expect(p.next?.slug).toBe("b");
    expect(p.total).toBe(5);
  });
});
