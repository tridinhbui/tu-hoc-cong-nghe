"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { saveLessonVideoUrl, deleteLessonVideoUrl } from "@/lib/supabase-lesson-videos";
import { getServerDictionary } from "@/lib/i18n/server";

export async function saveLessonVideoAction(lessonId: number, videoUrl: string): Promise<void> {
  await requireAdmin();
  if (!videoUrl.trim()) {
    throw new Error((await getServerDictionary()).adminThree.videosAdminClient.errNoUrl);
  }
  await saveLessonVideoUrl(lessonId, videoUrl.trim());
}

export async function deleteLessonVideoAction(lessonId: number): Promise<void> {
  await requireAdmin();
  await deleteLessonVideoUrl(lessonId);
}
