/** Chỉ mục bài tập viết mã, sinh bởi scripts/generate-lesson-data.mjs. Nhỏ
 *  (vài chục dòng) nên nạp thẳng vào client được, không kéo theo thân bài. */
import data from "@/lib/lessons-data/_exercises.json";

export interface ExerciseRef {
  lessonId: number;
  slug: string;
  title: string;
  block: number;
  track: string;
}

export const EXERCISES: ExerciseRef[] = (data ?? []) as ExerciseRef[];

export const exerciseKey = (lessonId: number, block: number) => `${lessonId}:${block}`;
