import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import { REFERRER_BONUS_XP, REFERRED_BONUS_XP } from "@/lib/referrals";

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

export async function getPendingAppealCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("lesson_completion_appeals")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  if (error) return 0;
  return count ?? 0;
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

  // Best xp_earned per game_type, summed - same rule as
  // lib/games.ts#getTotalGameXp (kept as a duplicate formula rather than a
  // shared import since this runs on the admin service-role client, not the
  // browser client getTotalGameXp uses). Missing this previously meant
  // approving an appeal overwrote total_xp and silently dropped any
  // mini-game XP the user had earned, until it happened to self-correct on
  // their next dashboard/profile visit.
  const { data: gameSessions } = await supabase
    .from("game_sessions")
    .select("game_type, xp_earned")
    .eq("user_id", appeal.user_id);
  const bestGameXpByType = new Map<string, number>();
  for (const row of (gameSessions ?? []) as { game_type: string; xp_earned: number }[]) {
    const cur = bestGameXpByType.get(row.game_type) ?? 0;
    if (row.xp_earned > cur) bestGameXpByType.set(row.game_type, row.xp_earned);
  }
  const gameXp = Array.from(bestGameXpByType.values()).reduce((sum, v) => sum + v, 0);

  // Approving an appeal is this user's first confirmed lesson completion in
  // plenty of cases (that's often exactly why they're appealing) - convert
  // any pending referral the same way recalculateUserStats does client-side,
  // using a direct update instead of the reward_my_referral() RPC since that
  // RPC is bound to auth.uid() and this runs on the service-role client
  // (no authenticated caller, RLS bypassed entirely).
  const lessonsCompleted = progress?.length ?? 0;
  if (lessonsCompleted >= 1) {
    await supabase
      .from("referrals")
      .update({ status: "rewarded", rewarded_at: new Date().toISOString() })
      .eq("referred_id", appeal.user_id)
      .eq("status", "pending");
  }
  const { data: referralRows } = await supabase
    .from("referrals")
    .select("referrer_id, referred_id")
    .eq("status", "rewarded")
    .or(`referrer_id.eq.${appeal.user_id},referred_id.eq.${appeal.user_id}`);
  const referralXp = ((referralRows ?? []) as { referrer_id: string; referred_id: string }[]).reduce(
    (sum, row) =>
      sum +
      (row.referrer_id === appeal.user_id ? REFERRER_BONUS_XP : 0) +
      (row.referred_id === appeal.user_id ? REFERRED_BONUS_XP : 0),
    0
  );

  const totalXp = lessonsCompleted * 10 + quizXp + gameXp + referralXp;
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
