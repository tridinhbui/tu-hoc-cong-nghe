import { describe, it, expect } from "vitest";
import { IB_TECHNICAL_QUESTIONS, getIbCategoryCounts } from "@/lib/ib-question-bank";
import { CAREER_TECHNICAL_QUESTIONS } from "@/lib/career-question-bank";
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
//
// Since lib/career-question-bank.ts landed there are two sources behind the
// same mapping: the reused IB categories, and categories written for roles the
// IB bank says nothing about. Several tests below used to assume one source -
// that every mapped category exists in the IB bank, that investment-banking
// belongs on all of them - and those assumptions are now wrong by design, so
// they are scoped to the IB half rather than dropped.

const careerIds = new Set(FINANCE_CAREERS.map((c) => c.id));

/** Every question a career drill can serve, from both banks. */
const ALL_TECHNICAL = [...IB_TECHNICAL_QUESTIONS, ...CAREER_TECHNICAL_QUESTIONS];
const IB_CATEGORIES = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.category));

describe("IB_CATEGORY_CAREERS mapping", () => {
  it("maps every technical category in the bank", () => {
    const categories = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.category));
    for (const category of categories) {
      expect(IB_CATEGORY_CAREERS[category], `category "${category}" has no career mapping`).toBeDefined();
    }
  });

  it("maps every category in the career-specific bank", () => {
    // An unmapped category is content nobody can be served: the filter runs on
    // exactly this map.
    for (const category of new Set(CAREER_TECHNICAL_QUESTIONS.map((q) => q.category))) {
      expect(IB_CATEGORY_CAREERS[category], `category "${category}" has no career mapping`).toBeDefined();
    }
  });

  it("does not map categories that exist in neither bank", () => {
    const categories = new Set(ALL_TECHNICAL.map((q) => q.category));
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

  it("keeps investment-banking on every IB category - it is that bank's own role", () => {
    // Scoped to the IB half on purpose. "Quản lý quỹ - Phí & hiệu suất" is
    // fund-management knowledge; putting IB on it would recreate the padding
    // this mapping exists to avoid.
    for (const [category, ids] of Object.entries(IB_CATEGORY_CAREERS)) {
      if (!IB_CATEGORIES.has(category)) continue;
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

  it("gives an auditor accounting and control questions but no deal mechanics", () => {
    const questions = getTechnicalQuestionsForCareer("auditor");
    expect(questions.length).toBeGreaterThan(0);
    for (const q of questions) {
      expect(q.category, `auditor should not drill "${q.category}"`).not.toMatch(
        /LBO|Merger|Restructuring/
      );
    }
  });

  it("never returns a question outside the technical pool", () => {
    const technicalIds = new Set(ALL_TECHNICAL.map((q) => q.id));
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
    // The reuse layer took coverage to 19 of 44 careers and the first
    // career-specific bank added a few more. The gap is still large, and the
    // UI must keep saying so rather than implying coverage that isn't there.
    const covered = getCareersCoveredByBank().length;
    expect(covered).toBeGreaterThan(1);
    expect(covered).toBeLessThan(FINANCE_CAREERS.length);
  });

  it("names categories that exist in one of the banks", () => {
    const labels = new Set(getIbCategoryCounts(ALL_TECHNICAL).map((c) => c.label));
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
