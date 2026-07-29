"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { saveLessonVideoUrl, deleteLessonVideoUrl } from "@/lib/supabase-lesson-videos";

export async function saveLessonVideoAction(lessonId: number, videoUrl: string): Promise<void> {
  await requireAdmin();
  if (!videoUrl.trim()) throw new Error("URL video không được để trống");
  await saveLessonVideoUrl(lessonId, videoUrl.trim());
}

export async function deleteLessonVideoAction(lessonId: number): Promise<void> {
  await requireAdmin();
  await deleteLessonVideoUrl(lessonId);
}
