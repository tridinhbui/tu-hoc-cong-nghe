"use server";

import { getResumeLesson } from "@/lib/resume-learning";
import { getCompletedLessons, getTotalTimeSpentMinutes } from "@/lib/supabase-progress";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta, getLessonById } from "@/lib/lessons-loader";
import { isLessonIdInTrack } from "@/lib/track-stages";

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
  const [nextLesson, completedLessons, totalMinutes, profile, allLessons] = await Promise.all([
    getResumeLesson(userId, track, supabase),
    getCompletedLessons(userId, supabase),
    getTotalTimeSpentMinutes(userId, supabase),
    supabase.from("user_profiles").select("full_name, email").eq("id", userId).single(),
    getLessonsMeta(),
  ]);

  const firstName =
    profile.data?.full_name?.trim().split(/\s+/).pop() || // Vietnamese names: given name is last
    profile.data?.email?.split("@")[0] ||
    null;

  // Track-scoped completion, for the "Chặng X · Y% track" progress bar on
  // the resume card - completedLessons above spans every track, so it has
  // to be filtered down to just this one before it means anything as a %.
  const trackLessonIds = allLessons.filter((l) => isLessonIdInTrack(l.id, track)).map((l) => l.id);
  const completedInTrack = trackLessonIds.filter((id) => completedLessons.includes(id)).length;
  const trackProgressPercent = trackLessonIds.length > 0 ? Math.round((completedInTrack / trackLessonIds.length) * 100) : 0;

  // Enough to tell the learner exactly what's left on the in-progress lesson
  // (scroll % + quiz answered count) right on the dashboard card, instead of
  // them having to open the lesson to see the checklist. Quiz count comes
  // from the full lesson record (server-only - lib/lessons.ts is ~1.3MB and
  // must never reach a client bundle, see the note above on this file).
  let nextLessonCriteria: { readPercent: number; quizTotal: number } | null = null;
  if (nextLesson) {
    const [readingRow, fullLesson] = await Promise.all([
      supabase
        .from("reading_progress")
        .select("max_percent_reached")
        .eq("user_id", userId)
        .eq("lesson_id", nextLesson.id)
        .maybeSingle(),
      getLessonById(nextLesson.id),
    ]);
    nextLessonCriteria = {
      readPercent: Math.round(readingRow.data?.max_percent_reached ?? 0),
      quizTotal: fullLesson?.quiz?.length ?? 0,
    };
  }

  return {
    nextLesson,
    nextLessonCriteria,
    completedCount: completedLessons.length,
    totalMinutes,
    firstName,
    trackProgress: {
      completed: completedInTrack,
      total: trackLessonIds.length,
      percent: trackProgressPercent,
    },
  };
}
