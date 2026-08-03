import { CFA_LEVEL_1_SUBJECTS, type CfaSubjectId } from "@/lib/cfa-track";
import {
  drawSubject as drawByWeight,
  normalisedShares,
  parseWeight,
  pickWeighted,
  subjectPlan,
  trimOptions,
  type Rng,
  type WeightedSubject,
} from "@/lib/exam-weighting";

/** Luật ra đề CFA Level I: bao nhiêu câu mỗi môn, và mỗi câu mấy lựa chọn.
 *
 *  Lý do tồn tại: trước đây đường ra đề CFA gom phẳng 366 bài rồi xáo đều. Đo
 *  ra thì FSA chiếm 24,9% số câu trong khi đề thi thật cho nó 11-14%, còn
 *  Ethics - môn NẶNG NHẤT đề thi, 15-20% - chỉ được 12,1%. Sai lệch đó không
 *  dừng ở trải nghiệm luyện tập: điểm chảy thẳng vào `avg_quiz_score`, nên một
 *  người luyện toàn FSA rồi được báo là đã sẵn sàng thi.
 *
 *  Phần cân trọng số nằm ở `lib/exam-weighting.ts` vì FRM cần đúng cơ chế đó.
 *  File này chỉ còn giữ những gì RIÊNG của CFA: mười môn, ba lựa chọn mỗi câu,
 *  180 câu chia hai ca 135 phút. */

export type { Rng };

export type SubjectWeight = WeightedSubject<CfaSubjectId>;

export { parseWeight };

export const SUBJECT_WEIGHTS: SubjectWeight[] = CFA_LEVEL_1_SUBJECTS.map((s) => ({
  id: s.id,
  ...parseWeight(s.weight),
}));

/** Tỷ lệ mục tiêu từng môn, đã chuẩn hoá về tổng 1. Trung điểm các dải CFA cộng
 *  lại ra 102,5% nên bước chuẩn hoá là bắt buộc; sau khi chia, mỗi môn vẫn nằm
 *  gọn trong dải của nó (kiểm trong test). */
export const SUBJECT_SHARE = normalisedShares(SUBJECT_WEIGHTS);

export function examSubjectPlan(total: number): Map<CfaSubjectId, number> {
  return subjectPlan(SUBJECT_SHARE, total);
}

export function drawSubject(rng: Rng = Math.random): CfaSubjectId {
  return drawByWeight(SUBJECT_SHARE, rng);
}

/** Bài nào thuộc môn nào. Một bài chỉ nằm ở đúng một môn (đã kiểm trong test),
 *  nên map một-một là đủ. */
export const SUBJECT_OF_LESSON: Map<number, CfaSubjectId> = new Map(
  CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds.map((id) => [id, s.id] as const))
);

/** Chọn câu cho track CFA theo trọng số môn của đề thi thật. */
export function pickCfaWeighted<T extends { lessonId: number }>(
  pool: T[],
  count: number,
  rng: Rng = Math.random
): T[] {
  return pickWeighted(pool, count, SUBJECT_SHARE, (q) => SUBJECT_OF_LESSON.get(q.lessonId), rng);
}

// ── Định dạng câu hỏi ──────────────────────────────────────────────────────

/** Số lựa chọn của một câu hỏi CFA. Đề thi thật dùng ba, kho câu hỏi của ta
 *  dùng bốn. */
export const CFA_OPTION_COUNT = 3;

/** Cắt câu hỏi về đúng ba lựa chọn như đề CFA. Kho của ta là bốn lựa chọn nên
 *  luôn phải bỏ bớt một phương án sai; xem `trimOptions` để biết vì sao cắt lúc
 *  giao chứ không viết lại kho. */
export function toThreeOptions<T extends { options: string[]; correct: number }>(
  question: T,
  rng: Rng = Math.random
): T {
  return trimOptions(question, CFA_OPTION_COUNT, rng);
}

// ── Thi thử ────────────────────────────────────────────────────────────────

/** Đề thi CFA Level I thật: 180 câu, hai ca, mỗi ca 135 phút.
 *
 *  Giữ đúng con số thật thay vì một bản rút gọn cho dễ chịu: cả điểm của một
 *  bài thi thử là biết mình chịu được bao lâu, và 90 câu trong 135 phút là
 *  đúng cái sức bền đó. */
export const CFA_EXAM = {
  totalQuestions: 180,
  sessions: 2,
  get questionsPerSession() {
    return this.totalQuestions / this.sessions;
  },
  minutesPerSession: 135,
  /** Ngưỡng đỗ CFA Institute không công bố; 70% là mốc các đơn vị luyện thi
   *  dùng làm chuẩn thận trọng, và ta nói rõ đó là ước lượng chứ không phải
   *  con số chính thức. */
  passRatio: 0.7,
} as const;

export interface SubjectScore {
  id: CfaSubjectId;
  name: string;
  correct: number;
  total: number;
}

/** Điểm tách theo môn. Đây mới là thứ dùng được sau một bài thi thử: tổng điểm
 *  chỉ nói đỗ hay trượt, còn "Ethics 8/27" nói cần học lại cái gì. */
export function scoreBySubject(
  answers: Array<{ lessonId: number; correct: boolean }>
): SubjectScore[] {
  const nameOf = new Map(CFA_LEVEL_1_SUBJECTS.map((s) => [s.id, s.name]));
  const acc = new Map<CfaSubjectId, { correct: number; total: number }>();
  for (const a of answers) {
    const subject = SUBJECT_OF_LESSON.get(a.lessonId);
    if (!subject) continue;
    const cur = acc.get(subject) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    acc.set(subject, cur);
  }
  // Giữ nguyên thứ tự môn của đề cương, không sắp theo điểm: người học đọc
  // bảng này nhiều lần và cần tìm được môn mình quan tâm ở cùng một chỗ.
  return CFA_LEVEL_1_SUBJECTS.filter((s) => acc.has(s.id)).map((s) => ({
    id: s.id,
    name: nameOf.get(s.id) ?? s.id,
    correct: acc.get(s.id)!.correct,
    total: acc.get(s.id)!.total,
  }));
}
