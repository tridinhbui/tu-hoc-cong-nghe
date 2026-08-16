import { MIN_ATTEMPTS_FOR_SIGNAL, type CategoryPerformance } from "@/lib/ib-weak-areas";

/**
 * Thang tiến bộ của vòng phỏng vấn IB: mức thành thạo từng section, cấp bậc
 * analyst, và những mode mở khoá được bằng chính hai thứ đó.
 *
 * MỌI THỨ Ở ĐÂY ĐỀU DẪN XUẤT TỪ `user_ib_question_attempts`, bảng ghi từng câu
 * mà route submit đã viết sẵn (lib/ib-weak-areas.ts đọc nó). Không có bảng mới,
 * không có điểm nào được phát vì bấm nút. Đó là ràng buộc chính của file này:
 * một cấp bậc kiếm được bằng cách mở màn hình lên là huy hiệu, còn một cấp bậc
 * kiếm được bằng 12 câu đúng trong một section thì nói được một điều thật.
 *
 * Không có chuỗi hiển thị nào ở đây. Hàm trả về id và số; phần chữ nằm ở từ
 * điển i18n như mọi nơi khác - xem `t.interview.*`.
 */

/** Bậc thành thạo của MỘT section.
 *
 *  `untested` không phải "kém": nó là "chưa đo được". Tách riêng vì gộp nó vào
 *  `weak` sẽ khiến một người chưa từng làm section nào hiện ra như đang yếu ở
 *  cả 14 section - và lời khuyên "hãy luyện chỗ yếu nhất" sinh ra từ đó là bịa. */
export type MasteryTier = "untested" | "weak" | "improving" | "strong" | "mastered";

/** Số câu tối thiểu để được gọi là ĐÃ THÀNH THẠO.
 *
 *  Cao hơn MIN_ATTEMPTS_FOR_SIGNAL (5) một cách có chủ ý. Năm câu đúng cả năm
 *  là đủ để nói "không có dấu hiệu yếu", không đủ để nói "đã thành thạo" - với
 *  một section 33 câu thì 5 câu là 15% nội dung, và tuyên bố thành thạo dựa
 *  trên đó chính là loại con số thổi phồng mà AGENTS.md đã phải đi dọn một lần
 *  ở chỗ khác. */
export const MASTERY_MIN_ATTEMPTS = 12;

export const IMPROVING_MIN_ACCURACY = 60;
export const STRONG_MIN_ACCURACY = 75;
export const MASTERED_MIN_ACCURACY = 90;

export function masteryTier(perf: Pick<CategoryPerformance, "attempted" | "accuracy">): MasteryTier {
  if (perf.attempted < MIN_ATTEMPTS_FOR_SIGNAL) return "untested";
  if (perf.accuracy < IMPROVING_MIN_ACCURACY) return "weak";
  if (perf.accuracy < STRONG_MIN_ACCURACY) return "improving";
  // Đúng ≥90% nhưng mới làm ít câu thì dừng ở `strong`. Đây là chỗ duy nhất
  // trong thang này mà số lượng phủ quyết tỉ lệ, và nó cố ý: `mastered` là thứ
  // mở khoá mode khác, nên nó phải đắt hơn một lượt may mắn.
  if (perf.accuracy < MASTERED_MIN_ACCURACY) return "strong";
  return perf.attempted >= MASTERY_MIN_ATTEMPTS ? "mastered" : "strong";
}

export const TIER_ORDER: MasteryTier[] = ["untested", "weak", "improving", "strong", "mastered"];

export function tierAtLeast(tier: MasteryTier, floor: MasteryTier): boolean {
  return TIER_ORDER.indexOf(tier) >= TIER_ORDER.indexOf(floor);
}

export interface SectionMastery {
  /** Chuỗi category thô, dùng để lọc ngân hàng câu hỏi. */
  category: string;
  /** Đã làm sạch để hiển thị. */
  label: string;
  tier: MasteryTier;
  /** Tổng số câu trong section, đọc từ ngân hàng - không phải số đã làm. */
  total: number;
  attempted: number;
  correct: number;
  /** 0-100. Bằng 0 khi chưa làm câu nào, và `tier` là `untested` khi đó. */
  accuracy: number;
}

/** Ghép hiệu suất đã đo với TOÀN BỘ section của ngân hàng.
 *
 *  Phải ghép chứ không thể chỉ đọc `performance`: bảng attempts chỉ có dòng cho
 *  section đã làm, nên một người mới sẽ thấy danh sách rỗng và tưởng bộ đề chỉ
 *  có bấy nhiêu. Section chưa đụng tới vẫn phải hiện ra - đó chính là thứ cần
 *  luyện tiếp. */
export function buildSectionMastery(
  performance: CategoryPerformance[],
  bankCounts: { category: string; label: string; count: number }[]
): SectionMastery[] {
  const byCategory = new Map(performance.map((p) => [p.category, p]));
  return bankCounts.map(({ category, label, count }) => {
    const perf = byCategory.get(category);
    const attempted = perf?.attempted ?? 0;
    const accuracy = perf?.accuracy ?? 0;
    return {
      category,
      label,
      total: count,
      attempted,
      correct: perf?.correct ?? 0,
      accuracy,
      tier: masteryTier({ attempted, accuracy }),
    };
  });
}

export function countAtLeast(sections: SectionMastery[], floor: MasteryTier): number {
  return sections.filter((s) => tierAtLeast(s.tier, floor)).length;
}

/** Điểm cấp bậc của một section. `untested` và `weak` đều bằng 0 - chưa chứng
 *  minh được gì thì chưa cộng gì, dù lý do khác nhau. */
export const TIER_POINTS: Record<MasteryTier, number> = {
  untested: 0,
  weak: 0,
  improving: 1,
  strong: 2,
  mastered: 3,
};

export function rankPoints(sections: SectionMastery[]): number {
  return sections.reduce((sum, s) => sum + TIER_POINTS[s.tier], 0);
}

/** Bậc analyst. `id` tra sang từ điển; ngưỡng nằm ở đây.
 *
 *  Với 14 section, điểm tối đa là 42, nên `associate` ở mốc 34 là gần đỉnh chứ
 *  không phải không tới được. Thang cố ý thưa ở đầu và dày ở cuối: hai section
 *  đầu tiên đạt "đang lên" đã đổi được cấp, còn từ Analyst II lên Analyst III
 *  thì phải thành thạo thật. */
export const RANKS = [
  { id: "candidate", minPoints: 0 },
  { id: "intern", minPoints: 3 },
  { id: "analyst1", minPoints: 8 },
  { id: "analyst2", minPoints: 16 },
  { id: "analyst3", minPoints: 25 },
  { id: "associate", minPoints: 34 },
] as const;

export type RankId = (typeof RANKS)[number]["id"];

export interface RankState {
  id: RankId;
  index: number;
  points: number;
  /** Ngưỡng của bậc kế tiếp, hoặc null nếu đã ở bậc cao nhất. */
  nextId: RankId | null;
  nextAtPoints: number | null;
  pointsToNext: number;
  /** 0-100, phần đã đi được TRONG bậc hiện tại. 100 khi đã ở bậc cao nhất. */
  progressPct: number;
}

export function rankFor(points: number): RankState {
  let index = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (points >= RANKS[i].minPoints) {
      index = i;
      break;
    }
  }
  const current = RANKS[index];
  const next = index < RANKS.length - 1 ? RANKS[index + 1] : null;
  if (!next) {
    return {
      id: current.id,
      index,
      points,
      nextId: null,
      nextAtPoints: null,
      pointsToNext: 0,
      progressPct: 100,
    };
  }
  const span = next.minPoints - current.minPoints;
  return {
    id: current.id,
    index,
    points,
    nextId: next.id,
    nextAtPoints: next.minPoints,
    pointsToNext: next.minPoints - points,
    progressPct: Math.min(100, Math.round(((points - current.minPoints) / span) * 100)),
  };
}

/* ─────────────────────────── Mode và mở khoá ─────────────────────────── */

/** Các vòng phỏng vấn CHẠY ĐƯỢC.
 *
 *  `trung-binh` không có trong danh sách này, và đó là một lỗi được sửa chứ
 *  không phải một lựa chọn thiết kế: ngân hàng technical có 160 câu `de` và
 *  116 câu `kho`, TRÒN 0 câu `trung-binh`. Route lọc `q.difficulty === "trung-binh"`
 *  nên nó luôn trả pool rỗng và trang rơi vào màn "Chưa có câu hỏi nào cho độ
 *  khó này" - trong khi dòng gợi ý ngay dưới ô chọn lại đang khuyên dùng đúng
 *  nó cho "mock analyst round". Một mode luôn hỏng thì không mở khoá được, nên
 *  nó bị bỏ khỏi thang thay vì được gác.
 *
 *  `mock` không phải một độ khó - nó là `track=mock-interview` ở route, lấy 10
 *  câu rải đều các section thay vì 5 câu ngẫu nhiên. */
export type InterviewModeId = "de" | "tat-ca" | "kho" | "mock";

export const INTERVIEW_MODE_IDS: InterviewModeId[] = ["de", "tat-ca", "kho", "mock"];

/** Số câu mỗi mode hỏi. Khớp với QUESTION_COUNT và
 *  MOCK_INTERVIEW_QUESTION_COUNT trong app/api/knowledge-challenge/route.ts. */
export const MODE_QUESTION_COUNT: Record<InterviewModeId, number> = {
  de: 5,
  "tat-ca": 5,
  kho: 5,
  mock: 10,
};

/** Số section phải đạt "vững" để mở vòng áp lực. */
export const KHO_REQUIRED_STRONG = 3;

/** Bốn section của Kế toán + Định giá. Mốc "Full Analyst Mock" gác ở đây vì
 *  đó là phần mọi vòng phỏng vấn analyst đều hỏi, bất kể nhóm nào. Ghi bằng
 *  chuỗi category THÔ để khớp thẳng dữ liệu ngân hàng. */
export const MOCK_MILESTONE_SECTIONS = [
  "Accounting - Basic",
  "Accounting - Advanced",
  "Valuation - Basic",
  "Valuation - Advanced",
];

/** Mốc mở khoá cần tier nào. `strong` chứ không phải `mastered`: bốn section
 *  cùng lúc ở mức thành thạo là 48 câu đúng ≥90%, đủ xa để mốc này thành thứ
 *  không ai với tới. */
export const MOCK_MILESTONE_TIER: MasteryTier = "strong";

export interface ModeLock {
  unlocked: boolean;
  /** Còn thiếu bao nhiêu section nữa. 0 khi đã mở. */
  remaining: number;
  /** Tổng số section mốc này yêu cầu, để dựng câu "2/3". */
  required: number;
}

export function modeLocks(sections: SectionMastery[]): Record<InterviewModeId, ModeLock> {
  const strongCount = countAtLeast(sections, "strong");
  const milestoneDone = MOCK_MILESTONE_SECTIONS.filter((category) => {
    const section = sections.find((s) => s.category === category);
    return section ? tierAtLeast(section.tier, MOCK_MILESTONE_TIER) : false;
  }).length;

  return {
    // Hai mode luôn mở. Vòng sàng lọc là chỗ bắt đầu, và bộ trộn là mặc định -
    // gác cả hai lại thì người mới không có gì để bấm ở lần vào đầu tiên, tức
    // là thang tiến bộ chặn mất chính cái việc sinh ra dữ liệu cho nó.
    de: { unlocked: true, remaining: 0, required: 0 },
    "tat-ca": { unlocked: true, remaining: 0, required: 0 },
    kho: {
      unlocked: strongCount >= KHO_REQUIRED_STRONG,
      remaining: Math.max(0, KHO_REQUIRED_STRONG - strongCount),
      required: KHO_REQUIRED_STRONG,
    },
    mock: {
      unlocked: milestoneDone >= MOCK_MILESTONE_SECTIONS.length,
      remaining: MOCK_MILESTONE_SECTIONS.length - milestoneDone,
      required: MOCK_MILESTONE_SECTIONS.length,
    },
  };
}

/* ─────────────────────── Nên luyện gì tiếp theo ─────────────────────── */

/** Section đáng luyện nhất, hoặc null nếu ngân hàng rỗng.
 *
 *  Thứ tự ưu tiên, và lý do từng bước:
 *  1. `weak` đo được - đây là chỗ đang mất điểm thật, và có đủ dữ liệu để nói.
 *  2. `improving` - gần chạm `strong`, tức là gần một điểm cấp bậc.
 *  3. `untested` nhiều câu nhất - chưa đo thì không nói được là yếu, nhưng
 *     section 33 câu chưa đụng tới là khoảng trống lớn hơn section 3 câu.
 *  4. còn lại: yếu nhất theo tỉ lệ.
 *
 *  Bước 3 là chỗ khác với `weakestCategory` của lib/ib-weak-areas.ts, vốn trả
 *  null khi chưa đủ dữ liệu. Ở đó null là đúng: nó đang tuyên bố "đây là điểm
 *  yếu của bạn". Ở đây câu hỏi nhẹ hơn - "làm gì tiếp" - và với người chưa làm
 *  gì thì vẫn có câu trả lời đúng. */
export function recommendedSection(sections: SectionMastery[]): SectionMastery | null {
  if (sections.length === 0) return null;
  const byAccuracy = (a: SectionMastery, b: SectionMastery) => a.accuracy - b.accuracy;

  const weak = sections.filter((s) => s.tier === "weak").sort(byAccuracy);
  if (weak.length > 0) return weak[0];

  const improving = sections.filter((s) => s.tier === "improving").sort(byAccuracy);
  if (improving.length > 0) return improving[0];

  const untested = sections.filter((s) => s.tier === "untested").sort((a, b) => b.total - a.total);
  if (untested.length > 0) return untested[0];

  return [...sections].sort(byAccuracy)[0];
}

/** MỘT mục tiêu kế tiếp, không phải một danh sách.
 *
 *  Thứ tự: mở vòng áp lực trước, rồi tới mốc mock, rồi tới bậc kế tiếp. Lý do
 *  là cái nào gần nhất thì nói cái đó - một màn hình bày cả ba mục tiêu cùng
 *  lúc thì không mục tiêu nào là mục tiêu. */
export type ObjectiveKind = "unlock-kho" | "unlock-mock" | "next-rank" | "maxed";

export interface NextObjective {
  kind: ObjectiveKind;
  /** Số section/điểm còn thiếu. 0 với `maxed`. */
  remaining: number;
}

export function nextObjective(sections: SectionMastery[], rank: RankState): NextObjective {
  const locks = modeLocks(sections);
  if (!locks.kho.unlocked) return { kind: "unlock-kho", remaining: locks.kho.remaining };
  if (!locks.mock.unlocked) return { kind: "unlock-mock", remaining: locks.mock.remaining };
  if (rank.nextId) return { kind: "next-rank", remaining: rank.pointsToNext };
  return { kind: "maxed", remaining: 0 };
}

/* ───────────────────────────── Vòng thi ───────────────────────────── */

/** Ba chặng của một vòng phỏng vấn.
 *
 *  Dẫn xuất từ HAI trường có thật của mỗi câu hỏi - `difficulty` (`de`/`kho`)
 *  và hậu tố Basic/Advanced trong tên category - chứ không phải từ vị trí câu
 *  hỏi trong lượt. Gán "câu áp lực" cho câu thứ năm bất kỳ là dán nhãn, và một
 *  người làm hai lượt sẽ thấy ngay là nó không tương ứng với gì cả.
 *
 *    khởi động  = de  + Basic          (hoặc Brain Teaser)
 *    lõi        = de  + Advanced, hoặc kho + Basic
 *    áp lực     = kho + Advanced
 *
 *  Ngân hàng chỉ có hai mức khó (160 `de`, 116 `kho`), nên nếu chỉ dùng
 *  `difficulty` thì chặng giữa sẽ rỗng. Trục Basic/Advanced là trục thật thứ
 *  hai, và ghép hai trục lại thì ba chặng đều có câu. */
export type RoundPhase = "warmup" | "core" | "pressure";

export const ROUND_PHASES: RoundPhase[] = ["warmup", "core", "pressure"];

export function phaseFor(difficulty: string, category: string): RoundPhase {
  const advanced = category.includes("Advanced");
  if (difficulty === "kho") return advanced ? "pressure" : "core";
  return advanced ? "core" : "warmup";
}

export function sortByPhase<T extends { phase: RoundPhase }>(questions: T[]): T[] {
  return [...questions].sort((a, b) => ROUND_PHASES.indexOf(a.phase) - ROUND_PHASES.indexOf(b.phase));
}
