import type { Lesson } from "@/lib/lesson-types";

type LessonLike = Pick<Lesson, "id" | "title" | "track">;

export function getLessonDisplayLabel(lesson: LessonLike): string {
  const stageMatch = lesson.title.match(/^Chặng\s+(\d+),\s*Bài\s+(\d+)/i);
  if (stageMatch) {
    return `Chặng ${stageMatch[1]} · Bài ${stageMatch[2]}`;
  }

  const dayMatch = lesson.title.match(/Day\s+(\d+)/i);
  if (dayMatch) {
    return `Day ${dayMatch[1]}`;
  }

  if (lesson.track === "bonus") {
    return "Case chuyên sâu";
  }

  return `Bài ${lesson.id}`;
}

export function getLessonShortTitle(lesson: Pick<Lesson, "title">): string {
  return lesson.title
    .replace(/^Tự học Tài chính Day\s+\d+:\s*/i, "")
    .replace(/^Chặng\s+\d+,\s*Bài\s+\d+:\s*/i, "")
    .trim();
}

export function getLessonRecallDay(lesson: LessonLike): number | undefined {
  const dayMatch = lesson.title.match(/Day\s+(\d+)/i);
  return dayMatch ? Number(dayMatch[1]) : undefined;
}
