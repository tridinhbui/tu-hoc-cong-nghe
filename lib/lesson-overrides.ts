import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export interface LessonOverride {
  id: number;
  is_fundamental: boolean;
  prerequisite_id: number | null;
  is_visible: boolean;
}

/**
 * Reads the admin-controlled lock/visibility flags for every lesson from
 * Supabase. Uses the regular (RLS-respecting) server client since `lessons`
 * has a public SELECT policy — no need for the service-role client here.
 * Falls back to an empty map (nothing overridden) if the table hasn't been
 * synced yet, so the dashboard degrades to "no overrides" rather than
 * breaking.
 */
export async function getLessonOverrides(): Promise<Map<number, LessonOverride>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("id, is_fundamental, prerequisite_id, is_visible");

  if (error || !data) {
    return new Map();
  }

  return new Map(data.map((row) => [row.id, row as LessonOverride]));
}

/** Lesson ids a specific user has been granted early access to via admin approval. */
export async function getUserLessonUnlocks(userId: string): Promise<Set<number>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("user_lesson_unlocks")
    .select("lesson_id")
    .eq("user_id", userId);

  if (error || !data) return new Set();
  return new Set(data.map((row) => row.lesson_id));
}
