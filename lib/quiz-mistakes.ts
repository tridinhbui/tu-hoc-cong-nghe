import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { questionFingerprint } from "@/lib/stable-hash";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883";
}

// Fire-and-forget by design (called from every quiz answer submission,
// success or failure of the log write must never block or interrupt the
// quiz UI) - best-effort, same tier as e.g. streak updates elsewhere in
// this codebase, not the critical lesson-completion write.
export async function recordQuizMistake(
  lessonId: number,
  questionIndex: number,
  correct: boolean,
  /** Nội dung câu hỏi tại thời điểm trả lời. Dùng để đường đọc biết hàng này
   *  còn nói về đúng câu hỏi đó không sau khi nội dung bài được sửa - xem
   *  supabase/migrations/20260902_quiz_mistake_question_hash.sql. Không truyền
   *  thì hàng được ghi với hash NULL, tức quay về hành vi cũ cho riêng hàng đó. */
  questionText?: string
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("record_quiz_mistake", {
    p_lesson_id: lessonId,
    p_question_index: questionIndex,
    p_correct: correct,
    p_question_hash: questionText ? questionFingerprint(questionText) : null,
  });
  if (error && !isMissingTableError(error)) {
    console.error("Error recording quiz mistake:", error);
  }
}

export interface QuizMistakeRow {
  lesson_id: number;
  question_index: number;
  wrong_count: number;
  last_attempt_at: string;
}

export async function getUnresolvedMistakeRows(userId: string): Promise<QuizMistakeRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz_mistakes")
    .select("lesson_id, question_index, wrong_count, last_attempt_at")
    .eq("user_id", userId)
    .eq("resolved", false)
    .order("last_attempt_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as QuizMistakeRow[];
}

export async function getUnresolvedMistakeCount(userId: string): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("quiz_mistakes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("resolved", false);

  if (error) {
    if (isMissingTableError(error)) return 0;
    return 0;
  }
  return count ?? 0;
}
