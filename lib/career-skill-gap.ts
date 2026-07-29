// "Job Skill Gap" - pick a target (a career from lib/finance-careers.ts, or
// the CFA Level I certification), and this says what's still missing:
//
//   Muốn IB   -> thiếu M&A, DCF, accounting, interview technicals
//   Muốn CFA  -> thiếu ethics, FRA, fixed income
//   Muốn FP&A -> thiếu budgeting, variance analysis, Excel dashboard
//
// Requirements are expressed as "this domain, to this % coverage" against the
// same SKILL_DOMAINS the competency profile scores (lib/career-competency.ts),
// so the gap panel and the radar can never disagree about how much accounting
// someone has actually done.
//
// Only the targets whose profile genuinely differs from their category are
// spelled out by hand; the other ~25 careers fall back to a per-category
// baseline blended with the CFA subjects each career already declares
// (FinanceCareer.relatedCfaSubjectIds). That keeps this file from turning
// into 40 near-identical literals that nobody would keep in sync.

import type { SkillDomainId } from "@/lib/career-competency";

export type RequirementPriority = "must" | "should";

export interface SkillRequirement {
  domain: SkillDomainId;
  /** Coverage % of that domain considered "ready" for this target. */
  target: number;
  priority: RequirementPriority;
}

export interface CareerLike {
  id: string;
  category: "investment" | "accounting" | "banking" | "advisory";
  relatedCfaSubjectIds?: readonly string[];
}

const must = (domain: SkillDomainId, target: number): SkillRequirement => ({ domain, target, priority: "must" });
const should = (domain: SkillDomainId, target: number): SkillRequirement => ({ domain, target, priority: "should" });

/** Targets that are certifications rather than jobs. Keyed in the same
 *  namespace as career ids - the UI passes whichever the user picked. */
export const CERTIFICATION_TARGETS: Record<string, { label: string; emoji: string; requirements: SkillRequirement[] }> = {
  "cfa-level-1": {
    label: "CFA Level I",
    emoji: "🎓",
    requirements: [
      must("ethics", 90),
      must("accounting", 70), // FRA is the single heaviest subject on the exam
      must("fixed_income", 60),
      must("equity_portfolio", 60),
      must("quant", 60),
      must("corporate_finance", 50),
      should("economics", 50),
      should("derivatives_risk", 40),
    ],
  },
};

const CAREER_REQUIREMENTS: Record<string, SkillRequirement[]> = {
  "investment-banking": [
    must("ma", 80),
    must("valuation", 80),
    must("accounting", 70),
    must("modeling_excel", 70),
    should("corporate_finance", 60),
  ],
  "ma-origination": [must("ma", 80), must("valuation", 70), should("accounting", 50), should("corporate_finance", 60)],
  "ma-execution": [must("ma", 85), must("modeling_excel", 70), must("valuation", 70), should("accounting", 60)],
  "pmi-specialist": [must("ma", 70), must("fpa_budgeting", 60), should("accounting", 50)],
  "pe-vc-analyst": [must("valuation", 75), must("modeling_excel", 75), must("ma", 60), should("accounting", 60)],
  "valuation-specialist": [must("valuation", 85), must("accounting", 70), should("modeling_excel", 60)],
  fpa: [
    must("fpa_budgeting", 80), // budgeting + variance analysis
    must("modeling_excel", 70), // Excel dashboard
    must("accounting", 60),
    should("corporate_finance", 50),
  ],
  "management-accountant": [must("accounting", 80), must("fpa_budgeting", 70), should("modeling_excel", 50)],
  "cfo-track": [must("accounting", 70), must("corporate_finance", 70), must("fpa_budgeting", 60), should("valuation", 50)],
  accountant: [must("accounting", 85), should("fpa_budgeting", 40)],
  auditor: [must("accounting", 85), must("ethics", 60), should("derivatives_risk", 30)],
  "internal-audit": [must("accounting", 70), must("ethics", 70), should("derivatives_risk", 40)],
  "compliance-officer": [must("ethics", 90), must("derivatives_risk", 50), should("fixed_income", 40)],
  "tax-advisory": [must("accounting", 80), should("corporate_finance", 40)],
  "equity-research-analyst": [must("valuation", 80), must("accounting", 70), must("equity_portfolio", 70), should("economics", 50)],
  "investment-analyst": [must("valuation", 70), must("equity_portfolio", 70), must("accounting", 60), should("economics", 50)],
  "fund-manager": [must("equity_portfolio", 80), must("valuation", 60), must("derivatives_risk", 50), should("economics", 60)],
  "portfolio-analyst": [must("equity_portfolio", 80), must("quant", 60), should("derivatives_risk", 40)],
  "etf-fund-specialist": [must("equity_portfolio", 75), should("quant", 50), should("economics", 40)],
  "fixed-income-trader": [must("fixed_income", 85), must("derivatives_risk", 60), should("economics", 60)],
  "credit-officer": [must("fixed_income", 70), must("accounting", 70), should("derivatives_risk", 40)],
  "consumer-credit-analyst": [must("fixed_income", 50), must("accounting", 60), should("quant", 40)],
  "risk-management": [must("derivatives_risk", 80), must("quant", 60), should("fixed_income", 50)],
  quant: [must("quant", 85), must("derivatives_risk", 70), should("equity_portfolio", 50)],
  treasury: [must("fpa_budgeting", 60), must("derivatives_risk", 60), must("fixed_income", 50)],
  "macro-research-analyst": [must("economics", 80), must("fixed_income", 50), should("equity_portfolio", 40)],
  "wealth-manager": [must("personal_finance", 80), must("equity_portfolio", 60), should("fixed_income", 50), should("ethics", 40)],
  "personal-financial-advisor": [must("personal_finance", 85), must("equity_portfolio", 50), should("ethics", 40)],
  "financial-coach": [must("personal_finance", 85), should("equity_portfolio", 40)],
  "household-finance-planner": [must("personal_finance", 90), should("fixed_income", 30)],
  "non-finance-learner": [must("personal_finance", 60), should("equity_portfolio", 30)],
  "financial-analyst": [must("accounting", 70), must("valuation", 60), must("modeling_excel", 60), should("corporate_finance", 50)],
  "ir-specialist": [must("valuation", 60), must("accounting", 60), should("equity_portfolio", 50)],
};

// Baseline per category for careers with no hand-written profile above.
const CATEGORY_BASELINE: Record<CareerLike["category"], SkillRequirement[]> = {
  investment: [must("valuation", 60), must("equity_portfolio", 60), should("accounting", 50), should("economics", 40)],
  accounting: [must("accounting", 75), should("fpa_budgeting", 50), should("ethics", 40)],
  banking: [must("fixed_income", 60), must("accounting", 60), should("derivatives_risk", 40)],
  advisory: [must("personal_finance", 60), must("equity_portfolio", 50), should("ethics", 40)],
};

// Each CFA subject a career declares implies its domain should be on the
// requirement list even if the hand-written/baseline profile missed it.
const CFA_SUBJECT_TO_DOMAIN: Record<string, SkillDomainId> = {
  ethics: "ethics",
  quant: "quant",
  economics: "economics",
  fsa: "accounting",
  corporate: "corporate_finance",
  equity: "equity_portfolio",
  fixedIncome: "fixed_income",
  derivatives: "derivatives_risk",
  alternatives: "equity_portfolio",
  portfolio: "equity_portfolio",
};

/** The requirement list for any target id - a career, or a key of
 *  CERTIFICATION_TARGETS. Deduplicated, highest target wins, `must` beats
 *  `should` when the same domain is required by two sources. */
export function getRequirementsForTarget(target: CareerLike | null, targetId?: string): SkillRequirement[] {
  const certId = targetId ?? target?.id;
  if (certId && CERTIFICATION_TARGETS[certId]) {
    return CERTIFICATION_TARGETS[certId].requirements;
  }
  if (!target) return [];

  const base = CAREER_REQUIREMENTS[target.id] ?? CATEGORY_BASELINE[target.category];
  const fromCfa = (target.relatedCfaSubjectIds ?? [])
    .map((id) => CFA_SUBJECT_TO_DOMAIN[id])
    .filter((d): d is SkillDomainId => Boolean(d))
    .map((domain) => should(domain, 50));

  const merged = new Map<SkillDomainId, SkillRequirement>();
  for (const req of [...base, ...fromCfa]) {
    const existing = merged.get(req.domain);
    if (!existing) {
      merged.set(req.domain, req);
      continue;
    }
    merged.set(req.domain, {
      domain: req.domain,
      target: Math.max(existing.target, req.target),
      priority: existing.priority === "must" || req.priority === "must" ? "must" : "should",
    });
  }
  return Array.from(merged.values());
}

export interface SkillGapItem {
  domain: SkillDomainId;
  label: string;
  gapHint: string;
  priority: RequirementPriority;
  /** Current coverage %, 0-100. */
  current: number;
  /** Required coverage %, 0-100. */
  target: number;
  /** target - current, floored at 0. */
  gap: number;
  /** How many more lessons in this domain would close the gap. */
  lessonsToGo: number;
  met: boolean;
}

export interface SkillGapResult {
  items: SkillGapItem[];
  /** 0-100: how close the profile is to the target overall, weighting
   *  `must` requirements twice as heavily as `should`. */
  readiness: number;
}

export function computeSkillGap(
  requirements: SkillRequirement[],
  coverage: Record<SkillDomainId, { done: number; total: number; percent: number }>,
  domainMeta: Record<SkillDomainId, { label: string; gapHint: string }>
): SkillGapResult {
  const items: SkillGapItem[] = requirements.map((req) => {
    const stat = coverage[req.domain] ?? { done: 0, total: 0, percent: 0 };
    const gap = Math.max(0, req.target - stat.percent);
    const lessonsNeeded = Math.ceil((req.target / 100) * stat.total);
    return {
      domain: req.domain,
      label: domainMeta[req.domain]?.label ?? req.domain,
      gapHint: domainMeta[req.domain]?.gapHint ?? "",
      priority: req.priority,
      current: stat.percent,
      target: req.target,
      gap,
      lessonsToGo: Math.max(0, lessonsNeeded - stat.done),
      met: gap === 0,
    };
  });

  // Biggest, highest-priority gaps first - the panel is a to-do list, so the
  // thing most worth doing next has to be at the top.
  items.sort((a, b) => {
    if (a.met !== b.met) return a.met ? 1 : -1;
    if (a.priority !== b.priority) return a.priority === "must" ? -1 : 1;
    return b.gap - a.gap;
  });

  let weighted = 0;
  let weightTotal = 0;
  for (const item of items) {
    const weight = item.priority === "must" ? 2 : 1;
    weightTotal += weight;
    weighted += weight * Math.min(1, item.target > 0 ? item.current / item.target : 1);
  }

  return {
    items,
    readiness: weightTotal > 0 ? Math.round((weighted / weightTotal) * 100) : 0,
  };
}
