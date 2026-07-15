import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - bookmarks are a non-critical UX nicety, so a missing
// table on the read path should not crash every lesson page's initial load.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface LessonBookmark {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  lesson_title: string;
  created_at: string;
}

/**
 * Get all bookmarks for a user
 */
export async function getUserBookmarks(userId: string): Promise<LessonBookmark[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_bookmarks")
    .select("id, user_id, lesson_id, lesson_slug, lesson_title, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonBookmark[];
}

/**
 * Check if a lesson is bookmarked by the user
 */
export async function isLessonBookmarked(userId: string, lessonId: number): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error && isMissingTableError(error)) {
    return false;
  }
  if (error && error.code !== "PGRST116") {
    throw handleSupabaseError(error);
  }

  return !!data;
}

/**
 * Add a bookmark for a lesson
 */
export async function addBookmark(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  lessonTitle: string
): Promise<LessonBookmark> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_bookmarks")
    .insert([
      {
        user_id: userId,
        lesson_id: lessonId,
        lesson_slug: lessonSlug,
        lesson_title: lessonTitle,
      },
    ])
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonBookmark;
}

/**
 * Remove a bookmark for a lesson
 */
export async function removeBookmark(userId: string, lessonId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("lesson_bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("lesson_id", lessonId);

  if (error) {
    throw handleSupabaseError(error);
  }
}

/**
 * Toggle bookmark (add if not exists, remove if exists)
 */
export async function toggleBookmark(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  lessonTitle: string
): Promise<{ bookmarked: boolean; bookmark?: LessonBookmark }> {
  const isBookmarked = await isLessonBookmarked(userId, lessonId);

  if (isBookmarked) {
    await removeBookmark(userId, lessonId);
    return { bookmarked: false };
  } else {
    const bookmark = await addBookmark(userId, lessonId, lessonSlug, lessonTitle);
    return { bookmarked: true, bookmark };
  }
}
