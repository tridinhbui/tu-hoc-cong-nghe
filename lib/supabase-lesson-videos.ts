import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

/** Public read - used by the video player's own small API route, not the
 *  main lesson-page hot path (see lib/lessons-loader.ts's getLessonBySlug
 *  comment on why that path stays DB-free). */
export async function getLessonVideoUrl(lessonId: number): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("lesson_videos")
    .select("video_url")
    .eq("lesson_id", lessonId)
    .maybeSingle();
  return data?.video_url ?? null;
}

/** Bulk read for the admin table - one query instead of N. */
export async function getAllLessonVideoUrls(): Promise<Record<number, string>> {
  const supabase = createAdminClient();
  const { data } = await supabase.from("lesson_videos").select("lesson_id, video_url");
  const map: Record<number, string> = {};
  for (const row of data ?? []) {
    map[row.lesson_id] = row.video_url;
  }
  return map;
}

export async function saveLessonVideoUrl(lessonId: number, videoUrl: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_videos")
    .upsert({ lesson_id: lessonId, video_url: videoUrl, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function deleteLessonVideoUrl(lessonId: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("lesson_videos").delete().eq("lesson_id", lessonId);
  if (error) throw error;
}
