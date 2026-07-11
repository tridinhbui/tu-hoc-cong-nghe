import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

/** Lesson ids the user has unlocked by passing their gate challenge. */
export async function getChallengePassedLessonIds(userId: string): Promise<number[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_challenge_passes")
    .select("lesson_id")
    .eq("user_id", userId);

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return (data ?? []).map((r) => r.lesson_id as number);
}

export async function recordChallengePass(
  userId: string,
  lessonId: number,
  score: number,
  total: number
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_challenge_passes")
    .upsert([{ user_id: userId, lesson_id: lessonId, score, total }], { onConflict: "user_id,lesson_id" });

  if (error && !isMissingTableError(error)) {
    throw handleSupabaseError(error);
  }
}
