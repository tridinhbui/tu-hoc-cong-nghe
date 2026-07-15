"use server";

import { getLessonById } from "@/lib/lessons-loader";
import type { QuizMistakeRow } from "@/lib/quiz-mistakes";

export interface GeneratedFlashcardCandidate {
  term: string;
  definition: string;
}

// Takes the caller's own unresolved-mistake rows (fetched client-side via
// lib/quiz-mistakes.ts#getUnresolvedMistakeRows, which uses the browser
// Supabase client and therefore has a real session/auth.uid() for the
// quiz_mistakes RLS check to pass) rather than re-querying by userId here.
// This Server Action previously called getUnresolvedMistakeRows(userId)
// itself - but that function's browser client has no session when invoked
// from a Server Action (no window/localStorage/cookies to read), so
// auth.uid() evaluated to null and the RLS-protected SELECT silently
// returned zero rows every time, regardless of how many real mistakes the
// user had. "Tạo từ lỗi sai" always reported "không tìm thấy" as a result.
// This action now only needs lesson content lookups, which are genuinely
// server-only (lib/lessons.ts, ~1.3MB) and don't touch Supabase at all.
export async function getMistakeFlashcardCandidates(rows: QuizMistakeRow[]): Promise<GeneratedFlashcardCandidate[]> {
  try {
    if (!rows || rows.length === 0) return [];

    const candidates: GeneratedFlashcardCandidate[] = [];

    // Resolve up to 10 candidates to keep response quick
    const targetRows = rows.slice(0, 10);

    for (const row of targetRows) {
      const lesson = await getLessonById(row.lesson_id);
      if (lesson && lesson.quiz && lesson.quiz[row.question_index]) {
        const questionObj = lesson.quiz[row.question_index];
        candidates.push({
          term: `[Lỗi sai: ${lesson.title}] ${questionObj.question}`,
          definition: `Đáp án đúng: ${questionObj.options[questionObj.correct]}. Giải thích: ${questionObj.explanation}`,
        });
      }
    }
    
    return candidates;
  } catch (error) {
    console.error("Error generating mistake flashcards:", error);
    return [];
  }
}

export async function getLessonDetailsForRecall(lessonId: number) {
  try {
    const lesson = await getLessonById(lessonId);
    if (!lesson) return null;
    return {
      title: lesson.title,
      slug: lesson.slug,
      quiz: lesson.quiz,
    };
  } catch (error) {
    console.error("Error loading lesson detail for recall:", error);
    return null;
  }
}
