"use server";

import { getUnresolvedMistakeRows } from "@/lib/quiz-mistakes";
import { getLessonById } from "@/lib/lessons-loader";

export interface GeneratedFlashcardCandidate {
  term: string;
  definition: string;
}

// Scans user's quiz mistakes and generates a list of candidates
export async function getMistakeFlashcardCandidates(userId: string): Promise<GeneratedFlashcardCandidate[]> {
  try {
    const rows = await getUnresolvedMistakeRows(userId);
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
