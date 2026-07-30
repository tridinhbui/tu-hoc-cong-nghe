// "Hồ sơ năng lực nghề nghiệp" - the competency profile rendered on
// /su-nghiep (Kiến thức tài chính 72%, Excel/Modeling 45%, Valuation 60%,
// Interview readiness 30%, CFA/IB readiness...).
//
// Everything here is pure and data-only so it can be unit-tested and shared
// between the aggregation route (app/api/career-profile/route.ts, which has
// the Supabase rows) and the client (which only ever receives the computed
// numbers). No Supabase import, no lessons-loader import - the lesson ids
// below are the same ids used by user_progress.lesson_id and by
// lib/cfa-track.ts, hand-curated from lib/lessons-data/_index.json rather
// than keyword-matched on slugs at runtime: slugs like "cong-ty-lai-ma-het-tien"
// ("a company that profits but runs out of cash") would otherwise land in
// the M&A bucket purely because "ma" appears as a token.

/** Inclusive id range helper - the lesson catalog is numbered in contiguous
 *  blocks per stage, so ranges express most domains far more legibly than
 *  a 60-element literal. */
function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

export type SkillDomainId =
  | "personal_finance"
  | "accounting"
  | "valuation"
  | "corporate_finance"
  | "modeling_excel"
  | "ma"
  | "fixed_income"
  | "equity_portfolio"
  | "derivatives_risk"
  | "fpa_budgeting"
  | "ethics"
  | "economics"
  | "quant";

export interface SkillDomain {
  id: SkillDomainId;
  label: string;
  /** Short "what you're missing" phrasing used by the Job Skill Gap panel. */
  gapHint: string;
  lessonIds: number[];
}

// A lesson may legitimately belong to several domains (an LBO lesson is both
// modeling and M&A) - domains are overlapping views on the catalog, not a
// partition of it.
export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "personal_finance",
    label: "Tài chính cá nhân",
    gapHint: "ngân sách, quỹ khẩn cấp, kế hoạch tài chính cá nhân",
    lessonIds: [...range(1, 20), ...range(241, 298)],
  },
  {
    id: "accounting",
    label: "Kế toán & Báo cáo tài chính",
    gapHint: "kế toán, đọc 3 báo cáo tài chính, chỉ số tài chính",
    lessonIds: [
      ...range(21, 80),
      271,
      1001, 1007, 1010, 1011, 1012, 1013, 1015, 1016, 1018, 1019, 1022, 1023, 1026, 1027, 1035,
      1101, 1244, 1265, 1266,
    ],
  },
  {
    id: "valuation",
    label: "Định giá (Valuation)",
    gapHint: "DCF, comps, precedent transactions, terminal value",
    lessonIds: [
      77, 78, 79,
      ...range(121, 140),
      803, 1002, 1003, 1004, 1006, 1008, 1009, 1036, 1102, 1103, 1105, 1219, 1220, 1271,
    ],
  },
  {
    id: "corporate_finance",
    label: "Tài chính doanh nghiệp",
    gapHint: "cấu trúc vốn, WACC, chính sách cổ tức, quyết định đầu tư",
    lessonIds: [...range(92, 120), 1017, 1020, 1038, 1209, 1243],
  },
  {
    id: "modeling_excel",
    label: "Excel & Mô hình tài chính",
    gapHint: "dựng mô hình 3 báo cáo, LBO, bảng độ nhạy, dashboard Excel",
    lessonIds: [116, 117, 139, 1024, 1028, 1102, 1103, 1105, 1106, 1202, 1203, 1256, 1272, ...range(1311, 1320), 1342],
  },
  {
    id: "ma",
    label: "M&A",
    gapHint: "M&A, synergy, deal structure, due diligence, LBO",
    lessonIds: [108, 109, 110, 117, 118, 119, 1021, 1103, 1106, 1107, 1108, 1109, 1110, 1260, 1318, 1337, 1338, 1339],
  },
  {
    id: "fixed_income",
    label: "Trái phiếu & Tín dụng",
    gapHint: "trái phiếu, YTM, duration, credit spread, xếp hạng tín nhiệm",
    lessonIds: [...range(141, 160), ...range(221, 240), 802, 1104, 1222],
  },
  {
    id: "equity_portfolio",
    label: "Cổ phiếu & Danh mục",
    gapHint: "phân tích cổ phiếu, xây danh mục, đo lường rủi ro - lợi nhuận",
    lessonIds: [...range(161, 180), ...range(201, 220), 1032, 1221, 1242, 1245, 1250],
  },
  {
    id: "derivatives_risk",
    label: "Phái sinh & Quản trị rủi ro",
    gapHint: "phái sinh, phòng hộ, VaR, stress testing, Basel",
    lessonIds: [...range(181, 198), 804, 1029, 1207, 1208, 1217, 1218, 1223, 1254],
  },
  {
    id: "fpa_budgeting",
    label: "FP&A & Ngân sách",
    gapHint: "lập ngân sách, rolling forecast, phân tích variance, KPI",
    lessonIds: [...range(111, 115), 1202, 1203, 1204, 1205, 1206, 1210, 1213, 1214, 1257],
  },
  {
    id: "ethics",
    label: "Đạo đức nghề nghiệp",
    gapHint: "Code of Ethics, Standards of Conduct, GIPS",
    lessonIds: [...range(1039, 1046), ...range(1331, 1336)],
  },
  {
    id: "economics",
    label: "Kinh tế học",
    gapHint: "chu kỳ kinh tế, chính sách tiền tệ - tài khóa, tỷ giá",
    lessonIds: [9, 146, 147, 148, ...range(1224, 1228), 1258, ...range(1321, 1326), 1340, 1341],
  },
  {
    id: "quant",
    label: "Phương pháp định lượng",
    gapHint: "giá trị thời gian của tiền, NPV/IRR, xác suất - thống kê",
    lessonIds: [7, 10, ...range(81, 91), 1037, 1233, 1246],
  },
];

const DOMAIN_BY_ID = new Map(SKILL_DOMAINS.map((d) => [d.id, d]));

export function getSkillDomain(id: SkillDomainId): SkillDomain {
  const domain = DOMAIN_BY_ID.get(id);
  if (!domain) throw new Error(`Unknown skill domain: ${id}`);
  return domain;
}

export type CompetencyId =
  | "finance_knowledge"
  | "excel_modeling"
  | "valuation"
  | "interview_readiness"
  | "cfa_readiness"
  | "ib_readiness";

export interface CompetencyDef {
  id: CompetencyId;
  label: string;
  blurb: string;
  /** Tailwind-ish accent used by the radar/bars, kept next to the data so
   *  the panel never has to maintain a parallel color map. */
  color: string;
  /** Where the learner should go to move this number. */
  actionHref: string;
  actionLabel: string;
}

export const COMPETENCIES: CompetencyDef[] = [
  {
    id: "finance_knowledge",
    label: "Kiến thức tài chính",
    blurb: "Nền tảng kế toán, doanh nghiệp, cổ phiếu, trái phiếu và tài chính cá nhân",
    color: "#0d9488",
    actionHref: "/dashboard",
    actionLabel: "Học tiếp bài mới",
  },
  {
    id: "excel_modeling",
    label: "Excel / Modeling",
    blurb: "Dựng mô hình tài chính, bảng độ nhạy, ngân sách và dự báo",
    color: "#2563eb",
    actionHref: "/cong-cu",
    actionLabel: "Luyện mô hình",
  },
  {
    id: "valuation",
    label: "Valuation",
    blurb: "DCF, comps, precedent transactions và báo cáo định giá",
    color: "#7c3aed",
    actionHref: "/nghe-nghiep-hoc",
    actionLabel: "Học bài định giá",
  },
  {
    id: "interview_readiness",
    label: "Interview readiness",
    blurb: "Mức sẵn sàng cho vòng phỏng vấn technical + behavioral",
    color: "#4f46e5",
    actionHref: "/kiem-tra",
    actionLabel: "Luyện phỏng vấn",
  },
  {
    id: "cfa_readiness",
    label: "CFA readiness",
    blurb: "Độ phủ 10 môn thi CFA Level I và kết quả quiz CFA",
    color: "#0891b2",
    actionHref: "/cfa",
    actionLabel: "Vào lộ trình CFA",
  },
  {
    id: "ib_readiness",
    label: "IB readiness",
    blurb: "Accounting - valuation - M&A - technical interview cho Investment Banking",
    color: "#be123c",
    actionHref: "/kiem-tra",
    actionLabel: "Luyện IB technicals",
  },
];

export interface QuizSessionSignal {
  track: "personal" | "professional" | "cfa" | "ib" | "mock-interview";
  score: number;
  total: number;
}

/** Everything the scoring below needs, in the shape the aggregation route
 *  can assemble straight from Supabase rows. */
export interface CompetencySignals {
  completedLessonIds: number[];
  quizSessions: QuizSessionSignal[];
  /** cfa_module_progress rows with completed = true. */
  completedCfaModuleIds: string[];
  /** Total CFA modules that exist, so module coverage is a ratio not a count. */
  totalCfaModules: number;
  /** Lesson ids mapped into the 10 official CFA Level I subjects
   *  (lib/cfa-track.ts) - passed in rather than imported so this file stays
   *  free of the CFA data too. */
  cfaLessonIds: number[];
}

export interface CompetencyScore {
  id: CompetencyId;
  /** 0-100, rounded. */
  score: number;
  /** Human-readable breakdown of what produced the number, so the UI can
   *  answer "why is this 45%?" without re-deriving anything. */
  parts: { label: string; value: string }[];
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Share of a domain's lessons the learner has completed, 0..1. */
function domainCoverage(domainId: SkillDomainId, completed: Set<number>): number {
  const { lessonIds } = getSkillDomain(domainId);
  if (lessonIds.length === 0) return 0;
  let done = 0;
  for (const id of lessonIds) if (completed.has(id)) done++;
  return done / lessonIds.length;
}

function domainCounts(domainId: SkillDomainId, completed: Set<number>) {
  const { lessonIds } = getSkillDomain(domainId);
  let done = 0;
  for (const id of lessonIds) if (completed.has(id)) done++;
  return { done, total: lessonIds.length };
}

interface TrackQuizStats {
  sessions: number;
  questions: number;
  accuracy: number; // 0..1, 0 when no questions answered
}

function quizStats(sessions: QuizSessionSignal[], track: QuizSessionSignal["track"]): TrackQuizStats {
  const rows = sessions.filter((s) => s.track === track);
  const questions = rows.reduce((sum, s) => sum + Math.max(0, s.total), 0);
  const correct = rows.reduce((sum, s) => sum + Math.max(0, s.score), 0);
  return {
    sessions: rows.length,
    questions,
    accuracy: questions > 0 ? correct / questions : 0,
  };
}

// Quiz signals are "accuracy, discounted until enough questions have been
// answered to mean anything" - a single lucky 1/1 shouldn't read as 100%
// mastery. `saturationQuestions` is the volume at which accuracy is trusted
// at face value; below it the score scales linearly with volume.
function quizConfidenceScore(stats: TrackQuizStats, saturationQuestions: number): number {
  if (stats.questions === 0) return 0;
  const volumeFactor = Math.min(1, stats.questions / saturationQuestions);
  return stats.accuracy * volumeFactor;
}

/** Volume of IB-style technical questions that counts as "properly drilled". */
export const IB_DRILL_SATURATION = 60;
/** Mock interviews that count as fully rehearsed. */
export const MOCK_INTERVIEW_SATURATION = 3;

export function computeCompetencyScores(signals: CompetencySignals): CompetencyScore[] {
  const completed = new Set(signals.completedLessonIds);

  const coverage = (id: SkillDomainId) => domainCoverage(id, completed);
  const counts = (id: SkillDomainId) => domainCounts(id, completed);

  const ibQuiz = quizStats(signals.quizSessions, "ib");
  const mock = quizStats(signals.quizSessions, "mock-interview");
  const cfaQuiz = quizStats(signals.quizSessions, "cfa");

  // Interview readiness deliberately weights *doing* over *reading*: a full
  // mock interview is worth more than any number of completed lessons,
  // because that's the thing candidates actually fail on.
  const mockVolume = Math.min(1, mock.sessions / MOCK_INTERVIEW_SATURATION);
  const mockQuality = mock.questions > 0 ? mock.accuracy : 0;
  const interviewScore =
    0.35 * quizConfidenceScore(ibQuiz, IB_DRILL_SATURATION) +
    0.4 * (mockVolume * (0.4 + 0.6 * mockQuality)) +
    0.25 * ((coverage("accounting") + coverage("valuation") + coverage("ma")) / 3);

  const cfaLessonSet = new Set(signals.cfaLessonIds);
  let cfaLessonsDone = 0;
  for (const id of cfaLessonSet) if (completed.has(id)) cfaLessonsDone++;
  const cfaLessonCoverage = cfaLessonSet.size > 0 ? cfaLessonsDone / cfaLessonSet.size : 0;
  const hasModules = signals.totalCfaModules > 0;
  const cfaModuleCoverage = hasModules
    ? Math.min(1, signals.completedCfaModuleIds.length / signals.totalCfaModules)
    : 0;
  // The Module table is seeded per environment and can legitimately be
  // empty (or unreadable). When there are no modules to complete, the 20%
  // they'd carry folds back into lesson coverage instead of silently
  // capping every account's CFA readiness at 80%.
  const cfaScore =
    (hasModules ? 0.55 : 0.75) * cfaLessonCoverage +
    (hasModules ? 0.2 : 0) * cfaModuleCoverage +
    0.15 * quizConfidenceScore(cfaQuiz, 50) +
    0.1 * coverage("ethics");

  const financeKnowledge =
    0.3 * coverage("accounting") +
    0.2 * coverage("corporate_finance") +
    0.2 * coverage("equity_portfolio") +
    0.15 * coverage("fixed_income") +
    0.15 * coverage("personal_finance");

  const excelModeling = 0.6 * coverage("modeling_excel") + 0.4 * coverage("fpa_budgeting");

  const valuationScore = 0.75 * coverage("valuation") + 0.25 * coverage("ma");

  const ibScore =
    0.25 * coverage("ma") +
    0.25 * coverage("valuation") +
    0.2 * coverage("accounting") +
    0.15 * coverage("modeling_excel") +
    0.15 * quizConfidenceScore(ibQuiz, IB_DRILL_SATURATION);

  const accountingCounts = counts("accounting");
  const modelingCounts = counts("modeling_excel");
  const fpaCounts = counts("fpa_budgeting");
  const valuationCounts = counts("valuation");
  const maCounts = counts("ma");

  return [
    {
      id: "finance_knowledge",
      score: clampPercent(financeKnowledge * 100),
      parts: [
        { label: "Kế toán & BCTC", value: `${accountingCounts.done}/${accountingCounts.total} bài` },
        { label: "Cổ phiếu & danh mục", value: `${counts("equity_portfolio").done}/${counts("equity_portfolio").total} bài` },
        { label: "Trái phiếu", value: `${counts("fixed_income").done}/${counts("fixed_income").total} bài` },
      ],
    },
    {
      id: "excel_modeling",
      score: clampPercent(excelModeling * 100),
      parts: [
        { label: "Mô hình tài chính", value: `${modelingCounts.done}/${modelingCounts.total} bài` },
        { label: "Ngân sách & dự báo", value: `${fpaCounts.done}/${fpaCounts.total} bài` },
      ],
    },
    {
      id: "valuation",
      score: clampPercent(valuationScore * 100),
      parts: [
        { label: "Bài định giá", value: `${valuationCounts.done}/${valuationCounts.total} bài` },
        { label: "M&A", value: `${maCounts.done}/${maCounts.total} bài` },
      ],
    },
    {
      id: "interview_readiness",
      score: clampPercent(interviewScore * 100),
      parts: [
        { label: "Câu hỏi IB đã làm", value: `${ibQuiz.questions} câu` },
        { label: "Độ chính xác IB", value: ibQuiz.questions > 0 ? `${Math.round(ibQuiz.accuracy * 100)}%` : "—" },
        { label: "Mock interview", value: `${mock.sessions} lần` },
      ],
    },
    {
      id: "cfa_readiness",
      score: clampPercent(cfaScore * 100),
      parts: [
        { label: "Bài thuộc 10 môn CFA", value: `${cfaLessonsDone}/${cfaLessonSet.size} bài` },
        { label: "Module CFA", value: `${signals.completedCfaModuleIds.length}/${signals.totalCfaModules}` },
        { label: "Quiz CFA", value: `${cfaQuiz.questions} câu` },
      ],
    },
    {
      id: "ib_readiness",
      score: clampPercent(ibScore * 100),
      parts: [
        { label: "M&A", value: `${maCounts.done}/${maCounts.total} bài` },
        { label: "Định giá", value: `${valuationCounts.done}/${valuationCounts.total} bài` },
        { label: "Technicals đã luyện", value: `${ibQuiz.questions} câu` },
      ],
    },
  ];
}

/** Per-domain coverage, used by the Job Skill Gap panel. Same numbers the
 *  competencies are built from, exposed one level lower. */
export function computeDomainCoverage(
  completedLessonIds: number[]
): Record<SkillDomainId, { done: number; total: number; percent: number }> {
  const completed = new Set(completedLessonIds);
  const result = {} as Record<SkillDomainId, { done: number; total: number; percent: number }>;
  for (const domain of SKILL_DOMAINS) {
    const { done, total } = domainCounts(domain.id, completed);
    result[domain.id] = { done, total, percent: clampPercent((total > 0 ? done / total : 0) * 100) };
  }
  return result;
}
