import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getCompletedLessons } from "./supabase-progress";
import { getLessonsMeta } from "./lessons-loader";
import { isLessonIdInTrack, orderLessonsForTrack } from "./track-stages";

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
export async function getResumeLesson(userId: string, track: "personal" | "professional", client?: SupabaseClient) {
  const completedLessons = await getCompletedLessons(userId, client);
  const allLessons = await getLessonsMeta();

  // Follow the actual curriculum order shown on the dashboard instead of raw
  // numeric ids. Personal Chặng 0 intentionally comes first but lives at ids
  // 263-268, so id-sorting made resume skip it and jump straight to Day 1.
  const trackLessons = orderLessonsForTrack(allLessons.filter((l) => isInTrack(l, track)), track);

  // Find first incomplete lesson
  const nextLesson = trackLessons.find(lesson => !completedLessons.includes(lesson.id));

  return nextLesson || null;
}

/**
 * Get the last completed lesson for resume context
 */
export async function getLastCompletedLesson(userId: string, track: "personal" | "professional", client?: SupabaseClient) {
  const completedLessons = await getCompletedLessons(userId, client);
  const allLessons = await getLessonsMeta();

  const trackLessons = orderLessonsForTrack(allLessons.filter((l) => isInTrack(l, track)), track);
  const completedSet = new Set(completedLessons);

  for (let i = trackLessons.length - 1; i >= 0; i -= 1) {
    if (completedSet.has(trackLessons[i].id)) {
      return trackLessons[i];
    }
  }

  return null;
}
