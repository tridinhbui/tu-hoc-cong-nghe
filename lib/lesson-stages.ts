import type { LessonMeta } from "@/lib/lesson-types";

/**
 * Map lesson IDs to their stage number within a track.
 * Used to determine tiered lesson unlock rules.
 */
export function getLessonStage(lesson: LessonMeta): number | null {
  const track = lesson.track || "personal";
  const id = lesson.id;

  if (track === "personal") {
    if (id >= 1 && id <= 20) return 1;
    if (id >= 201 && id <= 220) return 2;
    if (id >= 221 && id <= 240) return 3;
    if (id >= 241 && id <= 262) return 4;
    if (id >= 263 && id <= 268) return 0;
    if (id >= 269 && id <= 278) return 5;
    if (id >= 279 && id <= 288) return 6;
  } else if (track === "professional") {
    if (id >= 21 && id <= 40) return 1;
    if (id >= 41 && id <= 60) return 2;
    if (id >= 61 && id <= 80) return 3;
    if (id >= 81 && id <= 100) return 4;
    if (id >= 101 && id <= 120) return 5;
    if (id >= 121 && id <= 140) return 6;
  }

  return null;
}

/**
 * Get all lessons in the same stage and track
 */
export function getLessonsInStage(
  lesson: LessonMeta,
  allLessons: LessonMeta[]
): LessonMeta[] {
  const stage = getLessonStage(lesson);
  if (stage === null) return [];

  const track = lesson.track || "personal";
  return allLessons.filter((l) => {
    const lTrack = l.track || "personal";
    return lTrack === track && getLessonStage(l) === stage;
  });
}

/**
 * Get the position of a lesson within its stage (0-indexed)
 */
export function getLessonPositionInStage(
  lesson: LessonMeta,
  allLessons: LessonMeta[]
): number {
  const stageMatches = getLessonsInStage(lesson, allLessons).sort((a, b) => a.id - b.id);
  return stageMatches.findIndex((l) => l.id === lesson.id);
}
