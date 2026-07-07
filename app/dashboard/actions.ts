"use server";

import { getResumeLesson } from "@/lib/resume-learning";

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
