import { describe, expect, it } from "vitest";
import { shuffleQuestion, shuffleQuiz } from "../quiz-shuffle";

function seq(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length];
}

const q = (correct: number) => ({ question: "x", options: ["A", "B", "C", "D"], correct });

describe("xáo đáp án trong một câu", () => {
  it("đáp án đúng đi theo vị trí mới, không ở lại chỗ cũ", () => {
    for (let i = 0; i < 200; i++) {
      const original = q(2);
      const out = shuffleQuestion(original);
      expect(out.options[out.correct]).toBe(original.options[original.correct]);
    }
  });

  it("giữ nguyên tập đáp án", () => {
    const out = shuffleQuestion(q(0), seq(0.3, 0.7, 0.1));
    expect([...out.options].sort()).toEqual(["A", "B", "C", "D"]);
  });

  it("giữ các trường khác của câu hỏi", () => {
    const out = shuffleQuestion({ ...q(1), explanation: "vì sao" } as never) as { explanation: string };
    expect(out.explanation).toBe("vì sao");
  });
});

describe("xáo cả bộ câu hỏi", () => {
  it("không mất câu nào và không nhân bản câu nào", () => {
    const input = [q(0), q(1), q(2)].map((x, i) => ({ ...x, question: `câu ${i}` }));
    const out = shuffleQuiz(input);
    expect(out.map((x) => x.question).sort()).toEqual(["câu 0", "câu 1", "câu 2"]);
  });

  it("mọi câu vẫn chấm đúng sau khi xáo", () => {
    const input = [q(0), q(1), q(2), q(3)];
    for (let i = 0; i < 100; i++) {
      for (const out of shuffleQuiz(input)) {
        expect(out.options[out.correct]).toBeDefined();
        expect(out.correct).toBeGreaterThanOrEqual(0);
        expect(out.correct).toBeLessThan(out.options.length);
      }
    }
  });

  it("không sửa mảng đầu vào", () => {
    const input = [q(0), q(3)];
    const snapshot = JSON.stringify(input);
    shuffleQuiz(input);
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});
