import "server-only";
import { getCompletedLessons } from "./supabase-progress";
import { getLessonsMeta } from "./lessons-loader";
import { isLessonIdInTrack } from "./track-stages";

// Reads the full lesson dataset via getLessonsMeta() - must only ever be
// called from server-side code (a Server Action, e.g. app/dashboard/actions.ts,
// or a Server Component), never imported directly by a "use client"
// component. See app/dashboard/actions.ts for why.

// Most lessons don't carry an explicit `track` field - membership is decided
// by which track's stage day-ranges the id falls into (see track-stages.ts).
// An explicit `track` field, when present, still takes priority.
function isInTrack(lesson: { id: number; track?: "professional" | "personal" | "bonus" }, track: "personal" | "professional") {
  if (lesson.track === "bonus") return false;
  if (lesson.track) return lesson.track === track;
  return isLessonIdInTrack(lesson.id, track);
}

/**
 * Get the next lesson to continue learning
 * Returns the first incomplete lesson in the curriculum
 */
export async function getResumeLesson(userId: string, track: "personal" | "professional") {
  const completedLessons = await getCompletedLessons(userId);
  const allLessons = await getLessonsMeta();

  // Filter lessons by track, ordered by id so "first incomplete" is stable
  const trackLessons = allLessons.filter((l) => isInTrack(l, track)).sort((a, b) => a.id - b.id);

  // Find first incomplete lesson
  const nextLesson = trackLessons.find(lesson => !completedLessons.includes(lesson.id));

  return nextLesson || null;
}

/**
 * Get the last completed lesson for resume context
 */
export async function getLastCompletedLesson(userId: string, track: "personal" | "professional") {
  const completedLessons = await getCompletedLessons(userId);
  const allLessons = await getLessonsMeta();

  // Filter lessons by track
  const trackLessons = allLessons.filter((l) => isInTrack(l, track));

  // Find last completed lesson (highest ID)
  const completedTrackLessons = trackLessons.filter(lesson => completedLessons.includes(lesson.id));

  if (completedTrackLessons.length === 0) {
    return null;
  }

  return completedTrackLessons.sort((a, b) => b.id - a.id)[0];
}
