"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById } from "@/lib/lessons-loader";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";
import { questionFingerprint } from "@/lib/stable-hash";

export interface QuizMistakeReviewItem {
  lessonId: number;
  lessonSlug: string;
  lessonLabel: string;
  lessonTitle: string;
  questionIndex: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  wrongCount: number;
  lastAttemptAt: string;
  /** Where "go read the source" should send the learner. Lesson questions
   *  point at their lesson page; IB bank questions have no lesson page, so
   *  they point back at the drill. Computed here rather than in the client,
   *  which would otherwise have to know that a negative lessonId means IB. */
  href: string;
}

// Mistake rows only store (lesson_id, question_index) - the actual question
// text/options/explanation live in lib/lessons.ts (~1.3MB, server-only), so
// this Server Action re-derives them from the CURRENT lesson content rather
// than freezing a copy at the time of the mistake. That also means an edited
// or removed question naturally drops out of review instead of showing
// stale text.
export async function getQuizMistakesReviewAction(userId: string): Promise<QuizMistakeReviewItem[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("quiz_mistakes")
    .select("lesson_id, question_index, wrong_count, last_attempt_at, question_hash")
    .eq("user_id", userId)
    .eq("resolved", false)
    .order("last_attempt_at", { ascending: false })
    .limit(50);

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") return [];
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return [];

  // IB interview questions are stored with a NEGATIVE lesson_id - the negated
  // id of the question in lib/ib-question-bank.ts (see the IB branch of
  // app/api/knowledge-challenge/route.ts). There is no lesson row to look up,
  // so before this split every IB mistake was written to the table and then
  // silently dropped here by the `!lesson` guard below, making the review
  // flow look like it simply ignored interview practice.
  const lessonRows = data.filter((row) => row.lesson_id > 0);

  const lessonIds = Array.from(new Set(lessonRows.map((row) => row.lesson_id)));
  const lessons = await Promise.all(lessonIds.map((id) => getLessonById(id)));
  const lessonById = new Map(lessons.filter(Boolean).map((l) => [l!.id, l!]));

  const items: QuizMistakeReviewItem[] = [];
  for (const row of lessonRows) {
    const lesson = lessonById.get(row.lesson_id);
    const question = lesson?.quiz?.[row.question_index];
    if (!lesson || !question) continue; // lesson/question removed or edited since - skip rather than show stale/broken data
    // Chỉ số câu ổn định đúng chừng nào mảng quiz của bài không đổi. Chèn,
    // xoá hay đảo một câu là hàng cũ trỏ sang câu khác, và người học được cho
    // xem một câu họ chưa từng làm sai kèm dòng "bạn đã sai N lần" - im lặng
    // hoàn toàn, vì hàng vẫn giải ra một câu hỏi hợp lệ.
    //
    // question_hash NULL nghĩa là hàng được ghi trước khi có cột này: không
    // biết thì cứ hiển thị, đúng hành vi cũ. Có hash mà lệch thì bỏ qua, cùng
    // cách một câu bị xoá hẳn đang được bỏ qua ngay ở dòng trên.
    if (row.question_hash && row.question_hash !== questionFingerprint(question.question)) continue;
    items.push({
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonLabel: getLessonDisplayLabel({ id: lesson.id, title: lesson.title, track: lesson.track }),
      lessonTitle: getLessonShortTitle({ title: lesson.title }),
      questionIndex: row.question_index,
      question: question.question,
      options: question.options,
      correct: question.correct,
      explanation: question.explanation ?? "",
      wrongCount: row.wrong_count,
      lastAttemptAt: row.last_attempt_at,
      href: `/bai-hoc/${lesson.slug}`,
    });
  }

  // Ba ngân hàng câu hỏi phỏng vấn (IB, kỹ thuật theo nghề, câu hỏi nghề) đã
  // được gỡ cùng /phong-van-ky-thuat, nên nhánh giải mã các hàng lesson_id âm không
  // còn nguồn để tra. Các hàng ấy vẫn nằm trong quiz_mistakes dưới dạng
  // lesson_id ÂM và giờ rơi ra khỏi phần ôn tập - đúng như chú thích cũ ở đây
  // mô tả cho một ngân hàng thiếu trong map: `continue` bỏ hàng đó lặng lẽ.
  //
  // Cố ý không xoá các hàng đó khỏi cơ sở dữ liệu: nếu sau này có ngân hàng câu
  // hỏi công nghệ, cách nối lại là dựng một map mới ở đúng chỗ này, và dữ liệu
  // cũ thì không lấy lại được sau khi xoá.

  return items;
}
