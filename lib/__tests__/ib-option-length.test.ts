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

/** Categories whose options have been rewritten to a uniform length band.
 *  Every technical category except Brain Teaser is now listed: the rewrite
 *  finished, but the list was never caught up, leaving ten of them with no
 *  per-category guard at all. Brain Teaser stays out - it is 4 questions of
 *  riddles whose options are not finance claims and do not balance the same
 *  way. */
const REBALANCED_CATEGORIES = new Set([
  "Restructuring / Distressed M&A",
  "Valuation - Basic",
  "Valuation - Advanced",
  "Accounting - Basic",
  "Accounting - Advanced",
  "Discounted Cash Flow - Basic",
  "Discounted Cash Flow - Advanced",
  "Merger Model - Basic",
  "Merger Model - Advanced",
  "LBO Model - Basic",
  "LBO Model - Advanced",
  "Enterprise / Equity Value - Basic",
  "Enterprise / Equity Value - Advanced",
]);

/** With four options, "correct is longest" lands at ~25% by chance. 40% is
 *  the ceiling: loose enough that a single awkward question doesn't fail the
 *  suite, tight enough that a systematic tell can't hide under it. */
const MAX_LONGEST_SHARE = 0.4;

/** Over-correcting is its own tell - a bank where the right answer is always
 *  the shortest is exactly as guessable. */
const MAX_SHORTEST_SHARE = 0.4;

/** Mean length of the correct option relative to the mean of all four, bounded
 *  both ways. The floor matters as much as the ceiling: an average below 1
 *  means the correct answer is reliably the *shorter* one, which is the same
 *  tell upside down. */
const MAX_MEAN_RATIO = 1.25;
const MIN_MEAN_RATIO = 0.85;

/** Share checks need enough questions to mean anything. "Discounted Cash Flow -
 *  Advanced" has 7: one question moves its share by 14 points, so 3 correct
 *  answers landing shortest reads as 43% and trips a 40% ceiling that was set
 *  for categories ten times the size. Small categories are held to the mean
 *  ratio instead, which doesn't quantise like that. */
const MIN_CATEGORY_SIZE_FOR_SHARE = 10;

/** Whole-bank ceiling. Ratchet only: nothing may raise it. Sat at 168 long
 *  after the bank reached 70 (chance level for 276 questions is ~69), which
 *  left room for 98 questions to regress unnoticed. */
const MAX_TOTAL_LONGEST = 70;

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

    if (stats.n >= MIN_CATEGORY_SIZE_FOR_SHARE) {
      expect(stats.longest / stats.n).toBeLessThanOrEqual(MAX_LONGEST_SHARE);
      expect(stats.shortest / stats.n).toBeLessThanOrEqual(MAX_SHORTEST_SHARE);
    }
    expect(stats.ratioSum / stats.n).toBeLessThanOrEqual(MAX_MEAN_RATIO);
    expect(stats.ratioSum / stats.n).toBeGreaterThanOrEqual(MIN_MEAN_RATIO);
  });

  it("does not let the un-rebalanced backlog grow", () => {
    const total = [...statsByCategory().values()].reduce((sum, stats) => sum + stats.longest, 0);
    expect(total).toBeLessThanOrEqual(MAX_TOTAL_LONGEST);
  });
});
