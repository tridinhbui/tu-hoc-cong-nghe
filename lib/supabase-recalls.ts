import { createClient } from "./supabase";

export interface LessonRecall {
  lesson_id: number;
  recall_stage: number;
  next_recall_at: string;
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "PGRST116" || error.code === "42P01" || error.message?.includes("does not exist") || false;
}

export async function getLessonRecalls(userId: string): Promise<LessonRecall[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_lesson_recalls")
    .select("lesson_id, recall_stage, next_recall_at")
    .eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) {
      if (typeof window !== "undefined") {
        const localData = window.localStorage.getItem(`lesson_recalls_${userId}`);
        return localData ? (JSON.parse(localData) as LessonRecall[]) : [];
      }
      return [];
    }
    console.error("Error reading lesson recalls:", error);
    return [];
  }

  return (data ?? []) as LessonRecall[];
}

export async function scheduleLessonRecall(
  userId: string,
  lessonId: number,
  stage: number = 1
): Promise<boolean> {
  const supabase = createClient();
  
  // Calculate next recall date: stage 1 = +1 day, stage 2 = +3 days, stage 3 = +7 days, stage 4 = +30 days
  const days = stage === 2 ? 3 : stage === 3 ? 7 : stage === 4 ? 30 : 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + days);

  // Same bug class fixed twice already this session (flashcards, then
  // milestone exams): without an explicit onConflict target, PostgREST's
  // upsert defaults to the table's PRIMARY KEY (id), which is never part of
  // this payload - so every call past the first (from markLessonComplete)
  // behaved as a plain INSERT and hit the real user_lesson_recalls_unique
  // (user_id, lesson_id) constraint, failing with 23505 instead of updating
  // the stage. In practice this meant recall_stage never advanced past 1,
  // the "+10 XP" toast never fired, and reviewed lessons never left the due
  // list.
  const { error } = await supabase
    .from("user_lesson_recalls")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        recall_stage: stage,
        next_recall_at: nextDate.toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

  if (error) {
    if (isMissingTableError(error)) {
      if (typeof window !== "undefined") {
        const list = await getLessonRecalls(userId);
        const idx = list.findIndex((r) => r.lesson_id === lessonId);
        const entry = {
          lesson_id: lessonId,
          recall_stage: stage,
          next_recall_at: nextDate.toISOString(),
        };
        if (idx !== -1) {
          list[idx] = entry;
        } else {
          list.push(entry);
        }
        window.localStorage.setItem(`lesson_recalls_${userId}`, JSON.stringify(list));
        return true;
      }
    }
    console.error("Error scheduling lesson recall:", error);
    return false;
  }

  return true;
}

export async function processRecallAttempt(
  userId: string,
  lessonId: number,
  success: boolean
): Promise<boolean> {
  const recalls = await getLessonRecalls(userId);
  const existing = recalls.find((r) => r.lesson_id === lessonId);
  
  let nextStage = 1;
  if (success) {
    nextStage = existing ? Math.min(4, existing.recall_stage + 1) : 2;
  } else {
    nextStage = 1; // Reset to stage 1 on failure
  }

  return scheduleLessonRecall(userId, lessonId, nextStage);
}
