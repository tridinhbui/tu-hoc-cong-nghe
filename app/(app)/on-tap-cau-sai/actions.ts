"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById } from "@/lib/lessons-loader";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";

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
    .select("lesson_id, question_index, wrong_count, last_attempt_at")
    .eq("user_id", userId)
    .eq("resolved", false)
    .order("last_attempt_at", { ascending: false })
    .limit(50);

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") return [];
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return [];

  const lessonIds = Array.from(new Set(data.map((row) => row.lesson_id)));
  const lessons = await Promise.all(lessonIds.map((id) => getLessonById(id)));
  const lessonById = new Map(lessons.filter(Boolean).map((l) => [l!.id, l!]));

  const items: QuizMistakeReviewItem[] = [];
  for (const row of data) {
    const lesson = lessonById.get(row.lesson_id);
    const question = lesson?.quiz?.[row.question_index];
    if (!lesson || !question) continue; // lesson/question removed or edited since - skip rather than show stale/broken data
    items.push({
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonLabel: getLessonDisplayLabel({ id: lesson.id, title: lesson.title, track: lesson.track }),
      lessonTitle: getLessonShortTitle({ title: lesson.title }),
      questionIndex: row.question_index,
      question: question.question,
      options: question.options,
      correct: question.correct,
      explanation: question.explanation,
      wrongCount: row.wrong_count,
      lastAttemptAt: row.last_attempt_at,
    });
  }
  return items;
}
