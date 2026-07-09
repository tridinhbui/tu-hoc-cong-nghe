"use server";

import { getResumeLesson } from "@/lib/resume-learning";
import { getCompletedLessons, getTotalTimeSpentMinutes } from "@/lib/supabase-progress";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Wraps lib/resume-learning.ts as a Server Action. That module reads the
// full lesson dataset (lib/lessons.ts, ~1.3MB of lesson content) via
// getLessonsMeta() - it must run server-side. Before this,
// ResumeLearningButton.tsx (a client component) imported getResumeLesson
// directly and called it in a useEffect, which pulled the entire lessons
// array into the client bundle (verified via a production build: a
// separate ~1.3MB chunk containing every lesson's content, shipped on every
// /dashboard load). A Server Action keeps that data server-only and returns
// only the small resolved lesson object to the client.
//
// Every Supabase call in this file must use createServerSupabaseClient()
// (reads the session from request cookies), never the plain createClient()
// from lib/supabase.ts. That one builds a browser client with no cookie jar
// - calling it here queried as an anonymous user, so RLS silently returned
// zero rows no matter how much progress the account actually had. That's
// what caused the dashboard to say "you haven't completed any lesson" for
// users who genuinely had (reported: completed lessons, but going back to
// the dashboard showed no progress and no way to tell where to continue).
export async function getResumeLessonAction(userId: string, track: "personal" | "professional") {
  const supabase = await createServerSupabaseClient();
  return getResumeLesson(userId, track, supabase);
}

// Feeds the Tài Tài greeting card on the dashboard: the next lesson to
// continue plus enough context (total minutes learned so far, whether any
// lesson has been completed at all) for the greeting text to actually
// reflect the learner's real progress instead of being a generic label.
export async function getDashboardGreetingAction(userId: string, track: "personal" | "professional") {
  const supabase = await createServerSupabaseClient();
  const [nextLesson, completedLessons, totalMinutes] = await Promise.all([
    getResumeLesson(userId, track, supabase),
    getCompletedLessons(userId, supabase),
    getTotalTimeSpentMinutes(userId, supabase),
  ]);

  return {
    nextLesson,
    completedCount: completedLessons.length,
    totalMinutes,
  };
}
