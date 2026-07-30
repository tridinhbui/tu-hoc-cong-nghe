import type { Lesson } from "@/lib/lesson-types";

// `day` used to be parsed out of the title. It is now a real field, moved
// there by lib/lesson-day-prefix.js at build time; the title parse is kept
// only as a fallback for any caller still passing a raw, unprocessed lesson.
type LessonLike = Pick<Lesson, "id" | "title" | "track"> & { day?: number };

/** The legacy curriculum day for a lesson, or undefined if it never had one. */
function resolveDay(lesson: Pick<Lesson, "title"> & { day?: number }): number | undefined {
  if (typeof lesson.day === "number") return lesson.day;
  const dayMatch = lesson.title.match(/Day\s+(\d+)/i);
  return dayMatch ? Number(dayMatch[1]) : undefined;
}

export function getLessonDisplayLabel(lesson: LessonLike): string {
  const stageMatch = lesson.title.match(/^Chặng\s+(\d+),\s*Bài\s+(\d+)/i);
  if (stageMatch) {
    return `Chặng ${stageMatch[1]} · Bài ${stageMatch[2]}`;
  }

  const day = resolveDay(lesson);
  if (day !== undefined) {
    return `Day ${day}`;
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

/** Key into RECALL_SCHEDULE (lib/recall-schedule.ts). Reads the `day` field
 *  now that the number no longer lives in the title - returning undefined here
 *  silently disables spaced repetition for that lesson, so this must keep
 *  resolving for every lesson that previously had "Day N" in its title. */
export function getLessonRecallDay(lesson: LessonLike): number | undefined {
  return resolveDay(lesson);
}
