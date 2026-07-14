import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export type AppealStatus = "pending" | "approved" | "rejected";

export interface LessonAppeal {
  id: number;
  lesson_id: number;
  lesson_slug: string;
  note: string | null;
  status: AppealStatus;
  admin_note: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export async function submitLessonAppeal(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  note: string
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("lesson_completion_appeals").insert({
    user_id: userId,
    lesson_id: lessonId,
    lesson_slug: lessonSlug,
    note: note.trim().slice(0, 500) || null,
  });

  if (error) {
    // A duplicate pending appeal for the same lesson hits the unique
    // constraint - surface that as a clear message instead of a generic
    // Postgres error.
    if (error.code === "23505") {
      throw new Error("Bạn đã gửi khiếu nại cho bài này rồi, đang chờ admin duyệt.");
    }
    if (!isMissingTableError(error)) throw handleSupabaseError(error);
  }
}

export async function getMyLessonAppeals(userId: string): Promise<LessonAppeal[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_completion_appeals")
    .select("id, lesson_id, lesson_slug, note, status, admin_note, created_at, reviewed_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return data as LessonAppeal[];
}
