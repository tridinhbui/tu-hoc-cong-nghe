import { describe, it, expect } from "vitest";
import { LEVEL_EXAMS, shuffleArray, getRandomizedExamQuestions } from "@/lib/level-exams";

describe("LEVEL_EXAMS Question Bank & Rigorous Standards", () => {
  it("defines exam configurations for all levels from 2 to 15", () => {
    for (let lvl = 2; lvl <= 15; lvl++) {
      expect(LEVEL_EXAMS[lvl]).toBeDefined();
      expect(LEVEL_EXAMS[lvl].level).toBe(lvl);
      expect(LEVEL_EXAMS[lvl].minPassPercentage).toBeGreaterThanOrEqual(80);
      // app/api/level-exam serves the whole bank rather than sampling from it,
      // so the bank size IS the exam length - 20 is the floor for a promotion
      // exam to be worth the badge it hands out.
      expect(LEVEL_EXAMS[lvl].questions.length).toBeGreaterThanOrEqual(20);
    }
  });

  it("gives every question a unique id within its own exam", () => {
    Object.values(LEVEL_EXAMS).forEach((exam) => {
      const ids = exam.questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  it("ensures every exam question has valid fields and correctIndex within bounds", () => {
    Object.values(LEVEL_EXAMS).forEach((exam) => {
      exam.questions.forEach((q, idx) => {
        expect(q.id).toBeTruthy();
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation.length).toBeGreaterThan(5);
      });
    });
  });

  it("shuffles array elements correctly without losing items", () => {
    const original = ["A", "B", "C", "D", "E"];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it("randomizes exam questions and updates correctIndex accordingly", () => {
    const randomized = getRandomizedExamQuestions(5, 5);
    expect(randomized).toHaveLength(5);
    randomized.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.options[q.correctIndex]).toBeTruthy();
    });
  });
});
