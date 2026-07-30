import { describe, it, expect } from "vitest";
import { IB_TECHNICAL_QUESTIONS, getIbCategoryCounts } from "@/lib/ib-question-bank";
import {
  IB_CATEGORY_CAREERS,
  getTechnicalQuestionsForCareer,
  getCareersCoveredByBank,
  bankCoversCareer,
  MIN_QUESTIONS_FOR_CAREER_DRILL,
} from "@/lib/ib-question-careers";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

// The bank was written for Investment Banking, but its accounting, valuation
// and DCF sections are the shared core of most analytical finance roles.
// These tests pin the reuse mapping so it can't drift from either the bank's
// categories or the career list.

const careerIds = new Set(FINANCE_CAREERS.map((c) => c.id));

describe("IB_CATEGORY_CAREERS mapping", () => {
  it("maps every technical category in the bank", () => {
    const categories = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.category));
    for (const category of categories) {
      expect(IB_CATEGORY_CAREERS[category], `category "${category}" has no career mapping`).toBeDefined();
    }
  });

  it("does not map categories that no longer exist in the bank", () => {
    const categories = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.category));
    for (const mapped of Object.keys(IB_CATEGORY_CAREERS)) {
      expect(categories.has(mapped), `mapping references unknown category "${mapped}"`).toBe(true);
    }
  });

  it("only references careers that actually exist in FINANCE_CAREERS", () => {
    for (const [category, ids] of Object.entries(IB_CATEGORY_CAREERS)) {
      for (const id of ids) {
        expect(careerIds.has(id), `category "${category}" maps to unknown career "${id}"`).toBe(true);
      }
    }
  });

  it("lists no career twice within one category", () => {
    for (const [category, ids] of Object.entries(IB_CATEGORY_CAREERS)) {
      expect(new Set(ids).size, `category "${category}" repeats a career`).toBe(ids.length);
    }
  });

  it("keeps investment-banking on every category - it is the bank's own role", () => {
    for (const [category, ids] of Object.entries(IB_CATEGORY_CAREERS)) {
      expect(ids, `category "${category}"`).toContain("investment-banking");
    }
  });
});

describe("getTechnicalQuestionsForCareer", () => {
  it("gives investment-banking the whole technical bank", () => {
    expect(getTechnicalQuestionsForCareer("investment-banking")).toHaveLength(IB_TECHNICAL_QUESTIONS.length);
  });

  it("returns nothing for a career the bank does not cover", () => {
    // An unmapped career must come back empty rather than silently falling
    // back to the full IB set - telling an aspiring tax adviser that LBO
    // modelling is part of their interview would be worse than saying nothing.
    expect(getTechnicalQuestionsForCareer("tax-advisory")).toEqual([]);
    expect(getTechnicalQuestionsForCareer("not-a-real-career")).toEqual([]);
  });

  it("gives an auditor accounting questions but no deal mechanics", () => {
    const questions = getTechnicalQuestionsForCareer("auditor");
    expect(questions.length).toBeGreaterThan(0);
    for (const q of questions) {
      expect(q.category).toMatch(/^Accounting/);
    }
  });

  it("never returns a question outside the technical pool", () => {
    const technicalIds = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.id));
    for (const careerId of careerIds) {
      for (const q of getTechnicalQuestionsForCareer(careerId)) {
        expect(technicalIds.has(q.id)).toBe(true);
      }
    }
  });
});

describe("getCareersCoveredByBank", () => {
  it("sorts by coverage, largest first", () => {
    const counts = getCareersCoveredByBank().map((c) => c.questionCount);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });

  it("puts investment-banking first with full coverage", () => {
    const [top] = getCareersCoveredByBank();
    expect(top.careerId).toBe("investment-banking");
    expect(top.questionCount).toBe(IB_TECHNICAL_QUESTIONS.length);
  });

  it("reports a count matching what the filter actually returns", () => {
    for (const { careerId, questionCount } of getCareersCoveredByBank()) {
      expect(getTechnicalQuestionsForCareer(careerId)).toHaveLength(questionCount);
    }
  });

  it("covers well under half the career list - the gap is real and must not be hidden", () => {
    // 40 of 41 careers have no bank of their own. The reuse layer widens that
    // a little; it does not close it, and the UI must not imply otherwise.
    const covered = getCareersCoveredByBank().length;
    expect(covered).toBeGreaterThan(1);
    expect(covered).toBeLessThan(FINANCE_CAREERS.length);
  });

  it("names categories that exist in the bank", () => {
    const labels = new Set(getIbCategoryCounts(IB_TECHNICAL_QUESTIONS).map((c) => c.label));
    for (const { categories } of getCareersCoveredByBank()) {
      for (const label of categories) {
        expect(labels.has(label), `unknown category label "${label}"`).toBe(true);
      }
    }
  });
});

describe("bankCoversCareer", () => {
  it("is true only when there are enough questions to fill a drill", () => {
    for (const careerId of careerIds) {
      const count = getTechnicalQuestionsForCareer(careerId).length;
      expect(bankCoversCareer(careerId)).toBe(count >= MIN_QUESTIONS_FOR_CAREER_DRILL);
    }
  });

  it("rejects careers with no coverage", () => {
    expect(bankCoversCareer("tax-advisory")).toBe(false);
    expect(bankCoversCareer("financial-coach")).toBe(false);
  });
});
