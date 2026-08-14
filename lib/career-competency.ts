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
  | "quant"
  | "ai_tools";

export interface SkillDomain {
  id: SkillDomainId;
  lessonIds: number[];
}

// `label` và `gapHint` TỪNG nằm ở đây. Chúng là câu chữ, nên giờ ở
// t.skillDomains[id] trong từ điển, và tầng dữ liệu này chỉ còn id + lessonIds.
//
// Không chỉ vì i18n. Hai trường đó đi từ module data, qua
// app/api/career-profile/route.ts, tới một client component - nên một API route
// đang trả câu chữ, và ngôn ngữ của nó do server chọn chứ không do người đọc
// chọn. Đúng loại việc AGENTS.md ghi về app/api/world-boss: hoặc route đọc
// locale, hoặc route trả id. Ở đây id là lối đúng, vì id còn là khoá tra.

// A lesson may legitimately belong to several domains (an LBO lesson is both
// modeling and M&A) - domains are overlapping views on the catalog, not a
// partition of it.
export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "personal_finance",
    // 1301-1308 là chặng thuế TNCN; 1249/1284/1285 là quy trình hoạch định
    // tài chính cá nhân - đều thuộc đây chứ không phải kế toán doanh nghiệp.
    // 1761-1763: cụm chọn bảo hiểm cá nhân - đọc điều khoản, đọc bảng minh
    // họa liên kết đầu tư, và so hai hợp đồng. Cùng miền với các bài bảo hiểm
    // đã có ở dải 241-298.
    lessonIds: [...range(1, 20), ...range(241, 298), 1048, 1249, 1255, 1284, 1285, ...range(1301, 1308), ...range(1351, 1353), ...range(1761, 1763)],
  },
  {
    id: "accounting",
    lessonIds: [
      ...range(21, 80),
      271,
      1001, 1007, 1010, 1011, 1012, 1013, 1015, 1016, 1018, 1019, 1022, 1023, 1026, 1027, 1035,
      1101, 1244, 1265, 1266,
      // 1751: ghi nhận doanh thu theo tiến độ - một quy tắc kế toán, nên nó
      // cũng thuộc miền này chứ không chỉ tài chính doanh nghiệp.
      1751,
      // Chặng 41: báo cáo được LẬP ra thế nào - phần còn thiếu bên cạnh
      // hàng chục bài dạy đọc báo cáo.
      ...range(1721, 1725),
      // Chặng 24 (VAS/IFRS, thuế doanh nghiệp, thuế hoãn lại), đọc BCTC ngân
      // hàng, và khung báo cáo ESG - đều là đọc và lập báo cáo.
      1014, 1327, 1401, ...range(1441, 1448),
      // 199/200 là hai bài tổng ôn khép lại track: đọc báo cáo rồi tự phân
      // tích trọn vẹn một doanh nghiệp.
      199, 200,
      // Chặng 33: kiểm toán là cách bộ báo cáo này được xác nhận, nên nó
      // thuộc cùng nhóm với việc đọc và lập báo cáo.
      ...range(1531, 1534), 1536,
      // Ba bài đọc-sâu bổ sung cho chặng "Đọc 3 báo cáo tài chính": thuyết
      // minh, phân tích theo tỷ trọng, và ý kiến kiểm toán.
      ...range(1690, 1692),
      // 1050 (credit-debit-phan-2): bút toán thực chiến, đi sau bài Ghi sổ kép.
      1050,
      // 1051 (khau-hao): ba phương pháp và đường đi qua ba báo cáo.
      1051,
      // 1053 (bao-cao-luu-chuyen-tien-te): đọc chất lượng lợi nhuận.
      1053,
      // 1055 (bang-can-doi-ke-toan): Current Ratio, D/E và goodwill - đọc
      // sức khoẻ tài chính từ bảng cân đối.
      1055,
    ],
  },
  {
    id: "valuation",
    lessonIds: [
      77, 78, 79,
      ...range(121, 140),
      803, 1002, 1003, 1004, 1006, 1008, 1009, 1036, 1047, 1102, 1103, 1105, 1219, 1220, 1271,
      // 1054: chuỗi Revenue → FCF → EV → giá cổ phiếu, và vì sao EV/EBITDA
      // trung lập với đòn bẩy còn P/E thì không.
      1054,
      // 1056: chọn phương pháp định giá theo hoàn cảnh, và đối chiếu chéo.
      1056,
      // Định giá ngân hàng (P/B, thu nhập thặng dư), REIT (FFO/AFFO), xuyên
      // biên giới, và ESG đưa vào WACC - đều là biến thể của cùng một việc.
      // 1481/1482 là viết và bảo vệ luận điểm định giá, nên đi kèm ở đây.
      1286, 1329, 1402, 1463, 1481, 1482, 199, 200, 801,
    ],
  },
  {
    id: "corporate_finance",
    // Chặng 39 (FinTech) là kinh tế học của một sản phẩm: doanh thu đến từ
    // đâu, biên đóng góp, điểm hoà vốn - cùng bộ câu hỏi của tài chính doanh
    // nghiệp, chỉ đặt trên một mô hình kinh doanh khác.
    // 1751-1753: cụm nhà thầu xây dựng. Cùng bộ câu hỏi của tài chính doanh
    // nghiệp - vốn bị giam bao lâu, giá nào bù được chi phí vốn - chỉ đặt
    // trên một hợp đồng thi công thay vì một doanh nghiệp.
    lessonIds: [...range(92, 120), 1017, 1020, 1038, 1209, 1243, 1247, 1253, 1259, ...range(1701, 1706), ...range(1711, 1715), ...range(1731, 1735), ...range(1751, 1753)],
  },
  {
    id: "modeling_excel",
    // Chặng 23 (Excel) và Chặng 29 (công cụ dữ liệu) đều là dựng và dò lỗi
    // trên một file thật; 1483 là bài kiểm tra dựng mô hình trong tuyển dụng.
    lessonIds: [
      116, 117, 139, 1024, 1028, 1102, 1103, 1105, 1106, 1202, 1203, 1256, 1272,
      ...range(1311, 1320), 1342, ...range(1431, 1436), 1483, ...range(1491, 1496),
    ],
  },
  {
    id: "ma",
    // 1049 (danh-gia-deal-dau-tu): khung đọc một thương vụ mua lại.
    // 1052 (synergy-ma): kỷ luật ước lượng synergy, bổ trợ cho 109.
    lessonIds: [108, 109, 110, 117, 118, 119, 1021, 1049, 1052, 1103, 1106, 1107, 1108, 1109, 1110, 1247, 1260, 1318, 1337, 1338, 1339, ...range(1521, 1526)],
  },
  {
    id: "fixed_income",
    lessonIds: [...range(141, 160), ...range(221, 240), 802, 1104, 1222, 1289, 1453],
  },
  {
    id: "equity_portfolio",
    // Gồm cả tâm lý nhà đầu tư (Chặng 12) và ESG investing: cả hai đổi cách
    // chọn và giữ danh mục chứ không phải một chủ đề tách rời. Chặng 25 (thị
    // trường VN) và Chặng 27 (private markets) cũng là nơi danh mục được xây.
    lessonIds: [
      ...range(161, 180), ...range(201, 220), 1032, 1215, 1216, 1221,
      ...range(1229, 1231), ...range(1235, 1242), 1245, 1250, 1251, 1252, 1287, 1288, 1031,
      ...range(1451, 1457), ...range(1471, 1474), 805, 1025,
      // 1583-1590: Alternative Investments - đặc điểm nhóm, đo hiệu suất, nợ tư
      // nhân, hạ tầng, nông lâm nghiệp, chiến lược hedge fund, tài sản số, phân bổ.
      ...range(1583, 1590),
    ],
  },
  {
    id: "derivatives_risk",
    // Chặng 19 định giá quyền chọn là phái sinh đúng nghĩa; bảo hiểm và
    // Solvency II là quản trị rủi ro có vốn pháp định; 1328 xử lý rủi ro khí
    // hậu như một rủi ro tài chính, nên thuộc đây chứ không phải nhóm ESG.
    lessonIds: [...range(181, 198), 804, 1029, 1207, 1208, 1217, 1218, 1223, 1232, 1234, 1254, 1328, ...range(1411, 1414), 1005, ...range(1527, 1530), ...range(1537, 1541), ...range(1551, 1553), 1556, ...range(1557, 1563), ...range(1613, 1630), ...range(1637, 1648), ...range(1650, 1672), 1704, 1705,
      // Chặng 43: định phí và dự phòng bảo hiểm - quản trị rủi ro có vốn
      // pháp định, cùng nhóm với Solvency II đã nằm ở đây.
      ...range(1741, 1745)],
  },
  {
    id: "fpa_budgeting",
    // Chặng 31 là phần lập kế hoạch đứng trước các sản phẩm đầu ra ở Chặng 11.
    // 1513 (dòng tiền 13 tuần) cũng thuộc treasury nên nằm ở cả đây.
    lessonIds: [...range(111, 115), 1202, 1203, 1204, 1205, 1206, 1210, 1213, 1214, 1257, ...range(1511, 1516), 1702, 1706],
  },
  {
    id: "ethics",
    // AML/KYC, quản trị doanh nghiệp, dùng AI có trách nhiệm và đạo đức dữ
    // liệu đều là cùng một câu hỏi: cái gì được phép làm với thông tin và
    // tiền của người khác.
    lessonIds: [
      ...range(1039, 1046),
      1273,
      1274,
      ...range(1281, 1283),
      ...range(1331, 1336),
      // 1571-1582: chiều sâu từng Standard, cộng hai bài nền tảng về khung ra
      // quyết định và niềm tin trong ngành.
      ...range(1571, 1582),
      ...range(1591, 1602),
      ...range(1603, 1612),
      1330,
      1506,
      1535,
      1536,
    ],
  },
  {
    id: "economics",
    // Chặng 26 là kinh tế học quốc tế (ngang giá lãi suất, PPP, rủi ro tỷ giá)
    // - 1463 định giá xuyên biên giới nằm ở nhóm định giá vì nó là phép định
    // giá, còn ba bài còn lại là cơ chế tỷ giá nên thuộc đây.
    lessonIds: [9, 146, 147, 148, ...range(1224, 1228), 1258, ...range(1321, 1326), 1340, 1341, 1461, 1462, 1464],
  },
  {
    id: "quant",
    // Chặng 22 (thống kê, hồi quy, chuỗi thời gian) và Chặng 30 (chọn chỉ số,
    // cohort, A/B test, nhân quả) là cùng một bộ kỹ năng suy diễn, chỉ khác
    // ngữ cảnh áp dụng. Đây cũng là nhóm mà ba nghề dữ liệu đặt yêu cầu vào,
    // nên nếu thiếu chúng thì lộ trình dữ liệu không nuôi chính yêu cầu đó.
    lessonIds: [7, 10, ...range(81, 91), 1033, 1037, 1233, 1246, ...range(1421, 1426), ...range(1501, 1505), 1554, 1555, ...range(1631, 1636)],
  },
  {
    // Chặng 13 có 20 bài và cho tới giờ không bài nào thuộc domain nào, nên
    // học xong cả chặng vẫn không nhích được chỉ số năng lực nào. Nó không
    // nhét vừa nhóm nào sẵn có: dùng AI để đọc báo cáo không phải kế toán,
    // cũng không phải Excel. Domain riêng là cách trung thực hơn là ép nó
    // vào một nhóm gần đúng.
    id: "ai_tools",
    lessonIds: [...range(1261, 1280), 1034],
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
  | "frm_readiness"
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

/* i18n-ignore-start: `label`, `blurb`, `actionLabel` của bảy trục đã có lớp
   phủ trong lib/i18n/dictionaries/sections/badges-competency.ts, khoá theo
   `id`. Sáu trục có nhãn vốn đã là tiếng Anh ("Valuation", "CFA readiness")
   cố ý KHÔNG có mục dịch - chép chúng vào từ điển tạo cặp giá trị trùng nhau
   giữa hai ngôn ngữ, và dictionary-parity đã bắt đúng chuyện đó. */
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
    // The IB question bank moved off /kiem-tra to its own page; that route
    // now serves lesson-track quizzes only, so this used to send anyone
    // clicking "luyện phỏng vấn" to a page with no interview questions.
    actionHref: "/phong-van-ky-thuat",
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
    id: "frm_readiness",
    label: "FRM readiness",
    blurb: "Độ phủ 10 môn thi FRM Part I & II - đo lường và quản trị rủi ro",
    color: "#dc2626",
    actionHref: "/frm",
    actionLabel: "Vào lộ trình FRM",
  },
  {
    id: "ib_readiness",
    label: "IB readiness",
    blurb: "Accounting - valuation - M&A - technical interview cho Investment Banking",
    color: "#be123c",
    actionHref: "/phong-van-ky-thuat",
    actionLabel: "Luyện IB technicals",
  },
];
/* i18n-ignore-end */

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
  /** Lesson ids mapped into the 10 official FRM subjects (lib/frm-track.ts).
   *  Passed in for the same reason cfaLessonIds is: this file stays free of
   *  both curricula. Optional so callers written before FRM existed keep
   *  compiling - they just score frm_readiness at 0. */
  frmLessonIds?: number[];
}

export interface CompetencyScore {
  id: CompetencyId;
  /** 0-100, rounded. */
  score: number;
  /** Human-readable breakdown of what produced the number, so the UI can
   *  answer "why is this 45%?" without re-deriving anything.
   *
   *  `key` và `unit` tồn tại vì hàm này chạy ở ROUTE API
   *  (app/api/career-profile/route.ts) rồi gửi kết quả xuống client - chuỗi
   *  sinh ở server thì từ điển phía client không với tới được. `label` là bản
   *  tiếng Việt dự phòng; giao diện tra `t.competencyParts[key]` trước.
   *
   *  `unit` tách khỏi `value` vì cùng lý do: "3/10 bài" ghép sẵn ở server thì
   *  không dịch được chữ "bài", còn value "3/10" cộng một khoá đơn vị thì
   *  dịch được. Mục nào không có đơn vị (phần trăm, tỷ lệ module) thì bỏ trống. */
  parts: { key: string; label: string; value: string; unit?: string }[];
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

/* i18n-ignore-start: `label` của mỗi `part` là bản tiếng Việt DỰ PHÒNG. Hàm
   này chạy ở route API rồi gửi kết quả xuống client, nên nó gửi kèm `key` và
   `unit`; giao diện tra `t.competencyParts[key]` và `t.competencyUnits[unit]`.
   lib/__tests__/badges-competency-i18n.test.ts chạy chính hàm này để lấy bộ
   khoá thật rồi đối chiếu, nên thêm một part mà quên dịch sẽ làm đỏ build. */
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

  // FRM readiness. Không có bảng module riêng như CFA, nên điểm đứng trên ba
  // chân: độ phủ bài của 10 môn FRM, và hai domain mà GARP kiểm tra nặng nhất
  // xuyên suốt cả hai phần thi - phái sinh/quản trị rủi ro và định lượng.
  const frmLessonSet = new Set(signals.frmLessonIds ?? []);
  let frmLessonsDone = 0;
  for (const id of frmLessonSet) if (completed.has(id)) frmLessonsDone++;
  const frmLessonCoverage = frmLessonSet.size > 0 ? frmLessonsDone / frmLessonSet.size : 0;
  const frmScore =
    0.6 * frmLessonCoverage +
    0.25 * coverage("derivatives_risk") +
    0.15 * coverage("quant");

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
        { key: "accounting", label: "Kế toán & BCTC", value: `${accountingCounts.done}/${accountingCounts.total}`, unit: "lessons" },
        { key: "equityPortfolio", label: "Cổ phiếu & danh mục", value: `${counts("equity_portfolio").done}/${counts("equity_portfolio").total}`, unit: "lessons" },
        { key: "fixedIncome", label: "Trái phiếu", value: `${counts("fixed_income").done}/${counts("fixed_income").total}`, unit: "lessons" },
      ],
    },
    {
      id: "excel_modeling",
      score: clampPercent(excelModeling * 100),
      parts: [
        { key: "modeling", label: "Mô hình tài chính", value: `${modelingCounts.done}/${modelingCounts.total}`, unit: "lessons" },
        { key: "budgeting", label: "Ngân sách & dự báo", value: `${fpaCounts.done}/${fpaCounts.total}`, unit: "lessons" },
      ],
    },
    {
      id: "valuation",
      score: clampPercent(valuationScore * 100),
      parts: [
        { key: "valuationLessons", label: "Bài định giá", value: `${valuationCounts.done}/${valuationCounts.total}`, unit: "lessons" },
        { key: "ma", label: "M&A", value: `${maCounts.done}/${maCounts.total}`, unit: "lessons" },
      ],
    },
    {
      id: "interview_readiness",
      score: clampPercent(interviewScore * 100),
      parts: [
        { key: "ibQuestions", label: "Câu hỏi IB đã làm", value: `${ibQuiz.questions}`, unit: "questions" },
        { key: "ibAccuracy", label: "Độ chính xác IB", value: ibQuiz.questions > 0 ? `${Math.round(ibQuiz.accuracy * 100)}%` : "—" },
        { key: "mockInterview", label: "Mock interview", value: `${mock.sessions}`, unit: "sessions" },
      ],
    },
    {
      id: "cfa_readiness",
      score: clampPercent(cfaScore * 100),
      parts: [
        { key: "cfaLessons", label: "Bài thuộc 10 môn CFA", value: `${cfaLessonsDone}/${cfaLessonSet.size}`, unit: "lessons" },
        { key: "cfaModules", label: "Module CFA", value: `${signals.completedCfaModuleIds.length}/${signals.totalCfaModules}` },
        { key: "cfaQuiz", label: "Quiz CFA", value: `${cfaQuiz.questions}`, unit: "questions" },
      ],
    },
    {
      id: "frm_readiness",
      score: clampPercent(frmScore * 100),
      parts: [
        { key: "frmLessons", label: "Bài thuộc 10 môn FRM", value: `${frmLessonsDone}/${frmLessonSet.size}`, unit: "lessons" },
        { key: "derivativesRisk", label: "Phái sinh & rủi ro", value: `${counts("derivatives_risk").done}/${counts("derivatives_risk").total}`, unit: "lessons" },
        { key: "quant", label: "Định lượng", value: `${counts("quant").done}/${counts("quant").total}`, unit: "lessons" },
      ],
    },
    {
      id: "ib_readiness",
      score: clampPercent(ibScore * 100),
      parts: [
        { key: "ma", label: "M&A", value: `${maCounts.done}/${maCounts.total}`, unit: "lessons" },
        { key: "valuation", label: "Định giá", value: `${valuationCounts.done}/${valuationCounts.total}`, unit: "lessons" },
        { key: "technicalsDrilled", label: "Technicals đã luyện", value: `${ibQuiz.questions}`, unit: "questions" },
      ],
    },
  ];
}
/* i18n-ignore-end */

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
