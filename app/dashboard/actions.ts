"use server";

import { getResumeLesson } from "@/lib/resume-learning";
import { getCompletedLessons, getTotalTimeSpentMinutes } from "@/lib/supabase-progress";

// Wraps lib/resume-learning.ts as a Server Action. That module reads the
// full lesson dataset (lib/lessons.ts, ~1.3MB of lesson content) via
// getLessonsMeta() - it must run server-side. Before this,
// ResumeLearningButton.tsx (a client component) imported getResumeLesson
// directly and called it in a useEffect, which pulled the entire lessons
// array into the client bundle (verified via a production build: a
// separate ~1.3MB chunk containing every lesson's content, shipped on every
// /dashboard load). A Server Action keeps that data server-only and returns
// only the small resolved lesson object to the client.
export async function getResumeLessonAction(userId: string, track: "personal" | "professional") {
  return getResumeLesson(userId, track);
}

// Feeds the Tài Tài greeting card on the dashboard: the next lesson to
// continue plus enough context (total minutes learned so far, whether any
// lesson has been completed at all) for the greeting text to actually
// reflect the learner's real progress instead of being a generic label.
export async function getDashboardGreetingAction(userId: string, track: "personal" | "professional") {
  const [nextLesson, completedLessons, totalMinutes] = await Promise.all([
    getResumeLesson(userId, track),
    getCompletedLessons(userId),
    getTotalTimeSpentMinutes(userId),
  ]);

  return {
    nextLesson,
    completedCount: completedLessons.length,
    totalMinutes,
  };
}
