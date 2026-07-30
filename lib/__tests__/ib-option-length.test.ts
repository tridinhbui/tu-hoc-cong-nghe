import { describe, expect, it } from "vitest";
import { IB_TECHNICAL_QUESTIONS, isBehavioralCategory } from "@/lib/ib-question-bank";

// Guards the IB bank against the "length tell": when the correct option is
// reliably the longest of the four, a learner scores by picking the longest
// sentence, without knowing any finance. That silently inflates the two
// competency scores derived from this bank - interview_readiness and
// ib_readiness in lib/career-competency.ts - so the bank's guessability is
// asserted here rather than left to spot checks.
//
// The delivery route shuffles option order per question
// (app/api/knowledge-challenge/route.ts), so *position* leaks nothing even
// though every override is authored with correct: 0. Length survives
// shuffling, which is why it is the thing measured.
//
// Rebalancing is happening category by category (see
// scripts/audit-ib-option-length.mjs for the progress readout). Categories
// already done are held to chance level; the rest are covered only by the
// whole-bank ratchet below, which may fall but never rise.

/** Categories whose options have been rewritten to a uniform length band. */
const REBALANCED_CATEGORIES = new Set([
  "Restructuring / Distressed M&A",
  "Valuation - Basic",
  "Accounting - Basic",
  "Discounted Cash Flow - Basic",
]);

/** With four options, "correct is longest" lands at ~25% by chance. 40% is
 *  the ceiling: loose enough that a single awkward question doesn't fail the
 *  suite, tight enough that a systematic tell can't hide under it. */
const MAX_LONGEST_SHARE = 0.4;

/** Over-correcting is its own tell - a bank where the right answer is always
 *  the shortest is exactly as guessable. */
const MAX_SHORTEST_SHARE = 0.4;

/** Mean length of the correct option relative to the mean of all four. */
const MAX_MEAN_RATIO = 1.25;

/** Snapshot of the un-rebalanced backlog. Ratchet only: rewriting more
 *  categories lowers this number, and nothing may raise it. Lower it as
 *  categories land. */
const MAX_TOTAL_LONGEST = 168;

interface CategoryStats {
  n: number;
  longest: number;
  shortest: number;
  ratioSum: number;
}

function statsByCategory(): Map<string, CategoryStats> {
  const byCategory = new Map<string, CategoryStats>();
  for (const question of IB_TECHNICAL_QUESTIONS) {
    const lengths = question.options.map((option) => option.length);
    const correctLength = lengths[question.correct] ?? 0;
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;

    const stats = byCategory.get(question.category) ?? { n: 0, longest: 0, shortest: 0, ratioSum: 0 };
    stats.n++;
    if (correctLength === Math.max(...lengths)) stats.longest++;
    if (correctLength === Math.min(...lengths)) stats.shortest++;
    stats.ratioSum += mean > 0 ? correctLength / mean : 0;
    byCategory.set(question.category, stats);
  }
  return byCategory;
}

describe("IB technical question options", () => {
  it("never draws behavioral questions into the scored pool", () => {
    // Behavioral options are meaningless scrape artifacts, so measuring or
    // scoring them would be measuring noise.
    expect(IB_TECHNICAL_QUESTIONS.every((q) => !isBehavioralCategory(q.category))).toBe(true);
  });

  it("gives every question four distinct options", () => {
    for (const question of IB_TECHNICAL_QUESTIONS) {
      expect(question.options.length, `question ${question.id}`).toBe(4);
      expect(new Set(question.options).size, `question ${question.id} repeats an option`).toBe(4);
      expect(question.correct, `question ${question.id}`).toBeGreaterThanOrEqual(0);
      expect(question.correct, `question ${question.id}`).toBeLessThan(question.options.length);
    }
  });

  it.each([...REBALANCED_CATEGORIES])("keeps option length uninformative in %s", (category) => {
    const stats = statsByCategory().get(category);
    expect(stats, `no questions found for ${category}`).toBeDefined();
    if (!stats) return;

    expect(stats.longest / stats.n).toBeLessThanOrEqual(MAX_LONGEST_SHARE);
    expect(stats.shortest / stats.n).toBeLessThanOrEqual(MAX_SHORTEST_SHARE);
    expect(stats.ratioSum / stats.n).toBeLessThanOrEqual(MAX_MEAN_RATIO);
  });

  it("does not let the un-rebalanced backlog grow", () => {
    const total = [...statsByCategory().values()].reduce((sum, stats) => sum + stats.longest, 0);
    expect(total).toBeLessThanOrEqual(MAX_TOTAL_LONGEST);
  });
});
