import { createClient } from "@/lib/cloudflare";
import { TECH_INTERVIEW_QUESTIONS, formatCategoryLabel } from "@/lib/interview-bank";

// "Which interview topic am I weakest in?" - derived from
// user_interview_question_attempts, the per-question record the submit route
// writes.
//
// Before this existed the drill only stored an aggregate score per run, so a
// learner who kept failing networking questions and acing SQL looked
// identical to one performing evenly. The point of a 276-question bank split
// across 14 topics is knowing which of the 14 to go back to.

export interface CategoryPerformance {
  /** Raw category string as stored, for filtering the bank. */
  category: string;
  /** Cleaned for display. */
  label: string;
  attempted: number;
  correct: number;
  /** 0-100, rounded. */
  accuracy: number;
}

/** Attempts below this in a category mean the accuracy figure is noise - two
 *  questions answered says nothing about whether someone knows LBO modelling.
 *  Categories under the threshold are reported but flagged as unreliable. */
export const MIN_ATTEMPTS_FOR_SIGNAL = 5;

export function isReliable(perf: CategoryPerformance): boolean {
  return perf.attempted >= MIN_ATTEMPTS_FOR_SIGNAL;
}

/** Đã đi qua bao nhiêu phần của ngân hàng câu hỏi phỏng vấn.
 *
 *  DÒNG TIẾN ĐỘ Ở /phong-van-ky-thuat TỪNG LÀ SỐ BỊA: trang ghi cứng
 *  `{ pct: 21, xp: 1119 }` kèm thanh tiến độ `width: "21%"`, nên mọi người học
 *  đều thấy mình đã xong đúng 21% với đúng 1119 XP. Cùng khuyết tật với huy
 *  hiệu "33 rương" ở DailyQuestsWidget.
 *
 *  Đếm theo câu KHÁC NHAU chứ không theo số lượt trả lời: làm lại một câu đã
 *  làm thì không đi thêm được phần nào của ngân hàng, mà bảng attempts thì ghi
 *  mỗi lần trả lời một dòng. */
export interface InterviewCoverage {
  /** Số câu khác nhau đã trả lời ít nhất một lần. */
  attempted: number;
  /** Tổng số câu trong ngân hàng. */
  total: number;
  /** Phần trăm đã đi qua, làm tròn. */
  pct: number;
}

export async function getInterviewCoverage(userId: string): Promise<InterviewCoverage> {
  const total = TECH_INTERVIEW_QUESTIONS.length;
  const cloudflare = createClient();
  const { data, error } = await cloudflare
    .from("user_interview_question_attempts")
    .select("question_id")
    .eq("user_id", userId);

  if (error || !data) return { attempted: 0, total, pct: 0 };

  const distinct = new Set((data as { question_id: number }[]).map((r) => r.question_id));
  return {
    attempted: distinct.size,
    total,
    pct: total > 0 ? Math.round((distinct.size / total) * 100) : 0,
  };
}

/** Per-category accuracy for a user, weakest first among the categories with
 *  enough attempts to mean anything. Returns an empty array when the table
 *  isn't migrated yet or the learner has done no interview drills. */
export async function getCategoryPerformance(userId: string): Promise<CategoryPerformance[]> {
  const cloudflare = createClient();
  const { data, error } = await cloudflare
    .from("user_interview_question_attempts")
    .select("category, correct")
    .eq("user_id", userId);

  if (error || !data) return [];

  const byCategory = new Map<string, { attempted: number; correct: number }>();
  for (const row of data as { category: string; correct: boolean }[]) {
    const entry = byCategory.get(row.category) ?? { attempted: 0, correct: 0 };
    entry.attempted++;
    if (row.correct) entry.correct++;
    byCategory.set(row.category, entry);
  }

  return Array.from(byCategory.entries())
    .map(([category, e]) => ({
      category,
      label: formatCategoryLabel(category),
      attempted: e.attempted,
      correct: e.correct,
      accuracy: e.attempted > 0 ? Math.round((e.correct / e.attempted) * 100) : 0,
    }))
    .sort((a, b) => {
      // Reliable categories first, then weakest accuracy, then most attempted
      // as the tie-break - a 40% over 20 questions is a stronger signal than
      // a 40% over 5.
      const aOk = isReliable(a);
      const bOk = isReliable(b);
      if (aOk !== bOk) return aOk ? -1 : 1;
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.attempted - a.attempted;
    });
}

/** The single topic most worth re-drilling, or null if there isn't enough
 *  data yet to name one honestly. */
export function weakestCategory(performance: CategoryPerformance[]): CategoryPerformance | null {
  const reliable = performance.filter(isReliable);
  if (reliable.length === 0) return null;
  return reliable[0];
}

/** Một câu người học trả lời sai nhiều lần.
 *
 *  Khác `getCategoryPerformance` ở mức chi tiết, và đó là điểm chính: biết
 *  "mạng máy tính của bạn yếu" giúp chọn chủ đề để ôn, nhưng không chỉ ra ĐÚNG câu đã
 *  làm sai hai lần. Bảng user_interview_question_attempts vốn đã ghi từng câu một -
 *  cột question_id nằm sẵn ở đó từ migration đầu, chỉ chưa ai đọc tới. */
export interface MissedQuestion {
  questionId: number;
  category: string;
  label: string;
  attempted: number;
  wrong: number;
  /** 0-100. Càng thấp càng đáng luyện lại. */
  accuracy: number;
}

/** Ngưỡng để một câu được gọi là "hay sai".
 *
 *  Sai một lần trên một lần làm là chuyện bình thường - có thể do bấm nhầm,
 *  do đọc vội, hoặc đơn giản là lần đầu gặp. Danh sách này để người học quay
 *  lại đúng chỗ mình LẶP LẠI lỗi, nên nó cần ít nhất hai lần sai, hoặc một
 *  câu đã làm nhiều lần mà vẫn dưới nửa. Đặt thấp hơn thì danh sách đầy những
 *  câu chỉ mới gặp một lần và mất hết ý nghĩa. */
export const MIN_WRONG_FOR_MISSED = 2;

/** Những câu sai lặp lại, sai nhiều nhất trước.
 *
 *  Trả mảng rỗng khi bảng chưa migrate hoặc người học chưa luyện lần nào -
 *  cùng cách xử lý với getCategoryPerformance, để giao diện không phải phân
 *  biệt "chưa có dữ liệu" với "hỏng". */
export async function getMostMissedQuestions(userId: string): Promise<MissedQuestion[]> {
  const cloudflare = createClient();
  const { data, error } = await cloudflare
    .from("user_interview_question_attempts")
    .select("question_id, category, correct")
    .eq("user_id", userId);

  if (error || !data) return [];

  const byQuestion = new Map<number, { category: string; attempted: number; wrong: number }>();
  for (const row of data as { question_id: number; category: string; correct: boolean }[]) {
    const entry = byQuestion.get(row.question_id) ?? { category: row.category, attempted: 0, wrong: 0 };
    entry.attempted++;
    if (!row.correct) entry.wrong++;
    byQuestion.set(row.question_id, entry);
  }

  return Array.from(byQuestion.entries())
    .filter(([, e]) => e.wrong >= MIN_WRONG_FOR_MISSED)
    .map(([questionId, e]) => ({
      questionId,
      category: e.category,
      label: formatCategoryLabel(e.category),
      attempted: e.attempted,
      wrong: e.wrong,
      accuracy: e.attempted > 0 ? Math.round(((e.attempted - e.wrong) / e.attempted) * 100) : 0,
    }))
    .sort((a, b) => b.wrong - a.wrong || a.accuracy - b.accuracy);
}
