export interface CareerLessonProgress {
  total: number;
  completed: number;
  lessons: { slug: string; title: string; completed: boolean }[];
}

/** Client-safe wrapper around /api/career-lesson-progress - resolves a
 *  career's relatedLessonSlugs to real lesson ids/titles and the caller's
 *  own completion status for each. */
export async function getCareerLessonProgress(slugs: string[]): Promise<CareerLessonProgress> {
  const res = await fetch("/api/career-lesson-progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slugs }),
  });
  if (!res.ok) throw new Error("Không tải được tiến độ bài học liên quan");
  return res.json();
}
