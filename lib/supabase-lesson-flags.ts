import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface LessonManualFlag {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  lesson_title: string;
  created_at: string;
}

export async function getUserLessonFlags(userId: string): Promise<LessonManualFlag[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_manual_flags")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error && isMissingTableError(error)) {
    return [];
  }
  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonManualFlag[];
}

export async function isLessonFlagged(userId: string, lessonId: number): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_manual_flags")
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

export async function addLessonFlag(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  lessonTitle: string
): Promise<LessonManualFlag> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_manual_flags")
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

  return data as LessonManualFlag;
}

export async function removeLessonFlag(userId: string, lessonId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("lesson_manual_flags")
    .delete()
    .eq("user_id", userId)
    .eq("lesson_id", lessonId);

  if (error) {
    throw handleSupabaseError(error);
  }
}

export async function toggleLessonFlag(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  lessonTitle: string
): Promise<{ flagged: boolean; flag?: LessonManualFlag }> {
  const flagged = await isLessonFlagged(userId, lessonId);

  if (flagged) {
    await removeLessonFlag(userId, lessonId);
    return { flagged: false };
  }

  const flag = await addLessonFlag(userId, lessonId, lessonSlug, lessonTitle);
  return { flagged: true, flag };
}
