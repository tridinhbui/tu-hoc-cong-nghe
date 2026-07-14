import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminLessonAppeal {
  id: number;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  lesson_id: number;
  lesson_slug: string;
  note: string | null;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export async function listAppeals(status: "pending" | "approved" | "rejected" | "all" = "pending"): Promise<AdminLessonAppeal[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("lesson_completion_appeals")
    .select("id, user_id, lesson_id, lesson_slug, note, status, admin_note, created_at, reviewed_at")
    .order("created_at", { ascending: false });

  if (status !== "all") query = query.eq("status", status);

  const { data: rows, error } = await query;
  if (error) throw new Error(error.message);
  if (!rows || rows.length === 0) return [];

  const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
  const { data: profiles } = await supabase.from("user_profiles").select("id, email, full_name").in("id", userIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  return rows.map((row) => ({
    ...row,
    user_email: profileById.get(row.user_id)?.email ?? null,
    user_name: profileById.get(row.user_id)?.full_name ?? null,
  }));
}

/**
 * Approves an appeal: marks the lesson genuinely completed for that user
 * (same effect as passing the quiz normally) and recomputes their XP/level.
 * Uses the service-role client throughout rather than reusing
 * lib/supabase-progress.ts's markLessonComplete/lib/supabase-user.ts's
 * recalculateUserStats - those call createClient() (the anon-key browser
 * client), which has no user session to act as here; an admin approving
 * someone else's appeal has no session for that user at all, only
 * service-role can write on their behalf.
 */
export async function approveAppeal(appealId: number, adminId: string): Promise<void> {
  const supabase = createAdminClient();

  const { data: appeal, error: fetchError } = await supabase
    .from("lesson_completion_appeals")
    .select("id, user_id, lesson_id, status")
    .eq("id", appealId)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  if (!appeal) throw new Error("Không tìm thấy khiếu nại.");
  if (appeal.status !== "pending") throw new Error("Khiếu nại này đã được xử lý rồi.");

  const { error: progressError } = await supabase.from("user_progress").upsert(
    [
      {
        user_id: appeal.user_id,
        lesson_id: appeal.lesson_id,
        completed: true,
        completed_at: new Date().toISOString(),
        quiz_score: 100,
      },
    ],
    { onConflict: "user_id,lesson_id" }
  );
  if (progressError) throw new Error(progressError.message);

  // Recompute lessons_completed/total_xp/current_level from scratch, same
  // formula as lib/supabase-user.ts#recalculateUserStats.
  const { data: progress, error: progressReadError } = await supabase
    .from("user_progress")
    .select("completed, quiz_score")
    .eq("user_id", appeal.user_id)
    .eq("completed", true);
  if (progressReadError) throw new Error(progressReadError.message);

  const { data: quizSessions } = await supabase
    .from("user_quiz_sessions")
    .select("xp_earned")
    .eq("user_id", appeal.user_id);
  const quizXp = (quizSessions ?? []).reduce((sum, row) => sum + (row.xp_earned as number), 0);

  const lessonsCompleted = progress?.length ?? 0;
  const totalXp = lessonsCompleted * 10 + quizXp;
  const currentLevel = Math.floor(totalXp / 150) + 1;
  const quizScores = (progress ?? []).filter((p) => p.quiz_score !== null).map((p) => p.quiz_score as number);
  const avgScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

  await supabase
    .from("user_profiles")
    .update({
      lessons_completed: lessonsCompleted,
      total_xp: totalXp,
      current_level: currentLevel,
      avg_quiz_score: Math.round(avgScore * 100) / 100,
    })
    .eq("id", appeal.user_id);

  await supabase.from("user_stats").upsert(
    [
      {
        user_id: appeal.user_id,
        total_lessons_completed: lessonsCompleted,
        total_xp: totalXp,
        current_level: currentLevel,
        avg_quiz_score: Math.round(avgScore * 100) / 100,
      },
    ],
    { onConflict: "user_id" }
  );

  const { error: updateError } = await supabase
    .from("lesson_completion_appeals")
    .update({ status: "approved", reviewed_by: adminId, reviewed_at: new Date().toISOString() })
    .eq("id", appealId);
  if (updateError) throw new Error(updateError.message);
}

export async function rejectAppeal(appealId: number, adminId: string, adminNote: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_completion_appeals")
    .update({
      status: "rejected",
      admin_note: adminNote.trim().slice(0, 500) || null,
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", appealId)
    .eq("status", "pending");
  if (error) throw new Error(error.message);
}
