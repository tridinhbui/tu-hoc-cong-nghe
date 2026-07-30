import { COMPETENCIES, getSkillDomain, type CompetencyId, type SkillDomainId } from "@/lib/career-competency";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";

// The lesson set backing each competency's leaderboard - kept out of
// career-competency.ts (which stays free of the CFA data, see its header
// comment) and out of the migration (SQL shouldn't own a copy of the
// taxonomy). Mirrors the domains that dominate each competency's weighting
// in computeCompetencyScores; interview_readiness has no lesson-native
// signal of its own there (it's mostly quiz/mock-interview driven), so it
// reuses the same accounting+valuation+ma domains computeCompetencyScores
// folds a 25% lesson-coverage term from.
function union(...domainIds: SkillDomainId[]): number[] {
  return Array.from(new Set(domainIds.flatMap((id) => getSkillDomain(id).lessonIds)));
}

export const COMPETENCY_LESSON_IDS: Record<CompetencyId, number[]> = {
  finance_knowledge: union("accounting", "corporate_finance", "equity_portfolio", "fixed_income", "personal_finance"),
  excel_modeling: union("modeling_excel", "fpa_budgeting"),
  valuation: union("valuation", "ma"),
  interview_readiness: union("accounting", "valuation", "ma"),
  cfa_readiness: Array.from(
    new Set([...CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds), ...getSkillDomain("ethics").lessonIds])
  ),
  ib_readiness: union("ma", "valuation", "accounting", "modeling_excel"),
};

export const COMPETENCY_LEADERBOARD_TABS = COMPETENCIES.map((c) => ({
  id: c.id,
  label: c.label,
  lessonIds: COMPETENCY_LESSON_IDS[c.id],
}));
