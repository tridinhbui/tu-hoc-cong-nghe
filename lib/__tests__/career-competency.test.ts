import { describe, it, expect } from "vitest";
import {
  COMPETENCIES,
  IB_DRILL_SATURATION,
  MOCK_INTERVIEW_SATURATION,
  SKILL_DOMAINS,
  computeCompetencyScores,
  computeDomainCoverage,
  getSkillDomain,
  type CompetencyId,
  type CompetencySignals,
  type QuizSessionSignal,
  type SkillDomainId,
} from "@/lib/career-competency";

// Lesson ids are read out of SKILL_DOMAINS rather than hard-coded, so these
// tests describe the scoring rules and survive the catalog changing.

const lessonsIn = (domain: SkillDomainId) => getSkillDomain(domain).lessonIds;
const allLessonIds = Array.from(new Set(SKILL_DOMAINS.flatMap((d) => d.lessonIds)));

function signals(over: Partial<CompetencySignals> = {}): CompetencySignals {
  return {
    completedLessonIds: [],
    quizSessions: [],
    completedCfaModuleIds: [],
    totalCfaModules: 0,
    cfaLessonIds: [],
    ...over,
  };
}

const scoreOf = (result: ReturnType<typeof computeCompetencyScores>, id: CompetencyId) =>
  result.find((s) => s.id === id)!.score;

const ibQuiz = (score: number, total: number): QuizSessionSignal => ({ track: "ib", score, total });
const mockRun = (score: number, total: number): QuizSessionSignal => ({ track: "mock-interview", score, total });

describe("computeCompetencyScores", () => {
  it("returns one entry per defined competency, in that order", () => {
    const result = computeCompetencyScores(signals());
    expect(result.map((s) => s.id)).toEqual(COMPETENCIES.map((c) => c.id));
  });

  it("scores a brand-new account at zero everywhere", () => {
    const result = computeCompetencyScores(signals());
    expect(result.every((s) => s.score === 0)).toBe(true);
  });

  it("keeps every score inside 0-100 even with a fully completed catalog", () => {
    const result = computeCompetencyScores(
      signals({
        completedLessonIds: allLessonIds,
        quizSessions: [ibQuiz(500, 500), mockRun(50, 50), { track: "cfa", score: 200, total: 200 }],
        completedCfaModuleIds: ["a", "b", "c"],
        totalCfaModules: 3,
        cfaLessonIds: allLessonIds,
      })
    );
    for (const entry of result) {
      expect(entry.score).toBeGreaterThanOrEqual(0);
      expect(entry.score).toBeLessThanOrEqual(100);
    }
  });

  it("gives full valuation only when both valuation and M&A lessons are done", () => {
    // Asserts the property, not the arithmetic. Two earlier versions of this
    // test hard-coded a number (75) and then re-derived one from
    // computeDomainCoverage, and both broke on unrelated edits to the domain
    // lesson lists - the second by a single point, because it rounded each
    // domain's percentage before weighting while the implementation rounds once
    // at the end. What the test is actually for is the ordering: valuation
    // alone is worth at least its 0.75 weight but never full marks, because the
    // remaining 0.25 needs M&A. The domains share lessons (an LBO lesson is
    // both), so the exact figure moves with the catalog and is not the point.
    const valuationOnly = computeCompetencyScores(signals({ completedLessonIds: lessonsIn("valuation") }));
    expect(scoreOf(valuationOnly, "valuation")).toBeGreaterThanOrEqual(75);
    expect(scoreOf(valuationOnly, "valuation")).toBeLessThan(100);

    const both = computeCompetencyScores(
      signals({ completedLessonIds: [...lessonsIn("valuation"), ...lessonsIn("ma")] })
    );
    expect(scoreOf(both, "valuation")).toBe(100);
  });

  it("blends Excel modeling and budgeting 60/40", () => {
    // The two domains share lessons, so completing one moves the other's
    // coverage too - the weights are asserted against actual coverage rather
    // than against a clean 60/40 split that the overlap makes untrue.
    const weighted = (completed: number[]) => {
      const coverage = computeDomainCoverage(completed);
      return Math.round(0.6 * coverage.modeling_excel.percent + 0.4 * coverage.fpa_budgeting.percent);
    };

    for (const completed of [lessonsIn("modeling_excel"), lessonsIn("fpa_budgeting")]) {
      const result = computeCompetencyScores(signals({ completedLessonIds: completed }));
      expect(scoreOf(result, "excel_modeling")).toBe(weighted(completed));
    }

    // And modeling still carries the heavier weight of the two.
    const modelingOnly = computeCompetencyScores(signals({ completedLessonIds: lessonsIn("modeling_excel") }));
    expect(scoreOf(modelingOnly, "excel_modeling")).toBeGreaterThanOrEqual(60);
  });

  it("discounts a tiny quiz sample instead of reading it as mastery", () => {
    // A single perfect 1/1 must not score anywhere near a full drill.
    const lucky = computeCompetencyScores(signals({ quizSessions: [ibQuiz(1, 1)] }));
    const drilled = computeCompetencyScores(signals({ quizSessions: [ibQuiz(IB_DRILL_SATURATION, IB_DRILL_SATURATION)] }));
    expect(scoreOf(lucky, "ib_readiness")).toBeLessThan(scoreOf(drilled, "ib_readiness"));
    expect(scoreOf(lucky, "ib_readiness")).toBeLessThanOrEqual(1);
  });

  it("stops crediting IB volume past the saturation point", () => {
    const atSaturation = computeCompetencyScores(
      signals({ quizSessions: [ibQuiz(IB_DRILL_SATURATION, IB_DRILL_SATURATION)] })
    );
    const wayPast = computeCompetencyScores(
      signals({ quizSessions: [ibQuiz(IB_DRILL_SATURATION * 10, IB_DRILL_SATURATION * 10)] })
    );
    expect(scoreOf(wayPast, "ib_readiness")).toBe(scoreOf(atSaturation, "ib_readiness"));
  });

  it("lets accuracy, not just volume, move the IB score", () => {
    const perfect = computeCompetencyScores(signals({ quizSessions: [ibQuiz(60, 60)] }));
    const half = computeCompetencyScores(signals({ quizSessions: [ibQuiz(30, 60)] }));
    expect(scoreOf(half, "ib_readiness")).toBeLessThan(scoreOf(perfect, "ib_readiness"));
  });

  it("weights a mock interview above the same volume of drilling", () => {
    // The comment in the source is explicit that doing beats reading; this
    // pins that a mock run moves interview readiness more than an IB drill of
    // comparable size does.
    const oneMock = computeCompetencyScores(signals({ quizSessions: [mockRun(10, 10)] }));
    const equivalentDrill = computeCompetencyScores(signals({ quizSessions: [ibQuiz(10, 10)] }));
    expect(scoreOf(oneMock, "interview_readiness")).toBeGreaterThan(scoreOf(equivalentDrill, "interview_readiness"));
  });

  it("credits a mock interview even when the score on it was poor", () => {
    const bombed = computeCompetencyScores(signals({ quizSessions: [mockRun(0, 10)] }));
    expect(scoreOf(bombed, "interview_readiness")).toBeGreaterThan(0);
  });

  it("stops crediting mock volume past the saturation point", () => {
    const runs = (n: number) => Array.from({ length: n }, () => mockRun(10, 10));
    const saturated = computeCompetencyScores(signals({ quizSessions: runs(MOCK_INTERVIEW_SATURATION) }));
    const excessive = computeCompetencyScores(signals({ quizSessions: runs(MOCK_INTERVIEW_SATURATION * 5) }));
    expect(scoreOf(excessive, "interview_readiness")).toBe(scoreOf(saturated, "interview_readiness"));
  });

  it("does not cap CFA readiness when the Module table is empty", () => {
    // With no modules to complete, the 20% they carry folds into lesson
    // coverage rather than leaving every account stuck below 80.
    const cfaLessons = lessonsIn("accounting");
    const noModules = computeCompetencyScores(
      signals({
        completedLessonIds: [...cfaLessons, ...lessonsIn("ethics")],
        cfaLessonIds: cfaLessons,
        totalCfaModules: 0,
      })
    );
    expect(scoreOf(noModules, "cfa_readiness")).toBe(85); // 0.75 lessons + 0.10 ethics
  });

  it("uses the module split once modules exist", () => {
    const cfaLessons = lessonsIn("accounting");
    const withModules = computeCompetencyScores(
      signals({
        completedLessonIds: [...cfaLessons, ...lessonsIn("ethics")],
        cfaLessonIds: cfaLessons,
        completedCfaModuleIds: ["m1", "m2"],
        totalCfaModules: 2,
      })
    );
    expect(scoreOf(withModules, "cfa_readiness")).toBe(85); // 0.55 + 0.20 + 0.10
  });

  it("does not let more completed modules than exist push coverage past 100%", () => {
    const withExtras = computeCompetencyScores(
      signals({ completedCfaModuleIds: ["a", "b", "c", "d"], totalCfaModules: 2 })
    );
    expect(scoreOf(withExtras, "cfa_readiness")).toBeLessThanOrEqual(100);
    expect(scoreOf(withExtras, "cfa_readiness")).toBe(20); // module component only
  });

  it("ignores negative quiz numbers rather than letting them inflate a score", () => {
    const negatives = computeCompetencyScores(signals({ quizSessions: [ibQuiz(-50, -50)] }));
    expect(scoreOf(negatives, "ib_readiness")).toBe(0);
    expect(scoreOf(negatives, "interview_readiness")).toBe(0);
  });

  it("ignores duplicate lesson ids when measuring coverage", () => {
    const once = computeCompetencyScores(signals({ completedLessonIds: lessonsIn("valuation") }));
    const duplicated = computeCompetencyScores(
      signals({ completedLessonIds: [...lessonsIn("valuation"), ...lessonsIn("valuation")] })
    );
    expect(scoreOf(duplicated, "valuation")).toBe(scoreOf(once, "valuation"));
  });

  it("ignores lesson ids that belong to no domain", () => {
    const result = computeCompetencyScores(signals({ completedLessonIds: [999999, -1] }));
    expect(result.every((s) => s.score === 0)).toBe(true);
  });

  it("explains each score with a non-empty breakdown", () => {
    const result = computeCompetencyScores(signals({ completedLessonIds: lessonsIn("valuation") }));
    for (const entry of result) {
      expect(entry.parts.length).toBeGreaterThan(0);
      for (const part of entry.parts) {
        expect(part.label).toBeTruthy();
        expect(part.value).toBeTruthy();
      }
    }
  });

  it("reports IB accuracy as a dash rather than 0% when nothing has been answered", () => {
    const result = computeCompetencyScores(signals());
    const parts = result.find((s) => s.id === "interview_readiness")!.parts;
    expect(parts.find((p) => p.label === "Độ chính xác IB")?.value).toBe("—");
  });
});

describe("computeDomainCoverage", () => {
  it("reports every domain, at zero, for a new account", () => {
    const coverage = computeDomainCoverage([]);
    for (const domain of SKILL_DOMAINS) {
      expect(coverage[domain.id]).toEqual({ done: 0, total: domain.lessonIds.length, percent: 0 });
    }
  });

  it("reports 100% for a fully completed domain", () => {
    const coverage = computeDomainCoverage(lessonsIn("valuation"));
    expect(coverage.valuation.percent).toBe(100);
    expect(coverage.valuation.done).toBe(lessonsIn("valuation").length);
  });

  it("counts a lesson in every domain it belongs to - domains overlap", () => {
    // Domains are overlapping views on the catalog, not a partition, so a
    // lesson shared by two domains has to count for both.
    const shared = allLessonIds.find(
      (id) => SKILL_DOMAINS.filter((d) => d.lessonIds.includes(id)).length > 1
    );
    if (shared === undefined) return; // no overlap in the current catalog
    const owners = SKILL_DOMAINS.filter((d) => d.lessonIds.includes(shared));
    const coverage = computeDomainCoverage([shared]);
    for (const owner of owners) {
      expect(coverage[owner.id].done).toBe(1);
    }
  });

  it("never produces NaN for a domain with no lessons", () => {
    const coverage = computeDomainCoverage([]);
    for (const domain of SKILL_DOMAINS) {
      expect(Number.isFinite(coverage[domain.id].percent)).toBe(true);
    }
  });
});
