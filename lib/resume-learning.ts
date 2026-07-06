import { getCompletedLessons } from "./supabase-progress";
import { getLessonsMeta } from "./lessons-loader";

/**
 * Get the next lesson to continue learning
 * Returns the first incomplete lesson in the curriculum
 */
export async function getResumeLesson(userId: string, track: "personal" | "professional") {
  const completedLessons = await getCompletedLessons(userId);
  const allLessons = await getLessonsMeta();
  
  // Filter lessons by track
  const trackLessons = allLessons.filter(l => l.track === track || (track === "personal" && !l.track));
  
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
  const trackLessons = allLessons.filter(l => l.track === track || (track === "personal" && !l.track));
  
  // Find last completed lesson (highest ID)
  const completedTrackLessons = trackLessons.filter(lesson => completedLessons.includes(lesson.id));
  
  if (completedTrackLessons.length === 0) {
    return null;
  }
  
  return completedTrackLessons.sort((a, b) => b.id - a.id)[0];
}
