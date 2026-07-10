import { createAdminClient } from "@/lib/supabase-admin";
import { handleSupabaseError } from "@/lib/errors";

export interface SystemAnalytics {
  totalUsers: number;
  activeUsersThisWeek: number;
  totalLessonsCompleted: number;
  avgLessonsPerUser: number;
  avgQuizScore: number;
  avgStudyTimeMinutes: number;
  completionByStage: {
    stage: string;
    completed: number;
    total: number;
    percentage: number;
  }[];
  topicPerformance: {
    topic: string;
    avgScore: number;
    completions: number;
  }[];
  dailyActiveUsers: {
    date: string;
    count: number;
  }[];
  userRetention: {
    week: number;
    retained: number;
    percentage: number;
  }[];
}

export async function getSystemAnalytics(): Promise<SystemAnalytics> {
  const admin = createAdminClient();

  try {
    // Total users
    const { data: users, error: usersError } = await admin
      .from("user_profiles")
      .select("id", { count: "exact" });

    if (usersError) throw usersError;
    const totalUsers = users?.length || 0;

    // Active users this week. `user_stats.last_lesson_date` (used here
    // previously) is never actually written by any code path - the only
    // function that upserts user_stats (recalculateUserStats in
    // lib/supabase-user.ts) isn't called from anywhere in the app - so that
    // query always returned zero rows regardless of real activity. Count
    // distinct users with a completed lesson in the last 7 days from
    // user_progress directly instead, the same source of truth the rest of
    // this page's stats already use.
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: activeUsers, error: activeError } = await admin
      .from("user_progress")
      .select("user_id")
      .eq("completed", true)
      .gte("completed_at", weekAgo);

    if (activeError) throw activeError;
    const activeUsersThisWeek = new Set((activeUsers ?? []).map((r) => r.user_id)).size;

    // Lessons completed
    const { data: progress, error: progressError } = await admin
      .from("user_progress")
      .select("quiz_score, time_spent_seconds", { count: "exact" })
      .eq("completed", true);

    if (progressError) throw progressError;
    const totalLessonsCompleted = progress?.length || 0;
    const avgQuizScore = progress?.length
      ? progress.reduce((sum, p) => sum + (p.quiz_score || 0), 0) / progress.length
      : 0;
    const avgStudyTimeMinutes = progress?.length
      ? progress.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0) / progress.length / 60
      : 0;

    const avgLessonsPerUser = totalUsers ? totalLessonsCompleted / totalUsers : 0;

    // Daily active users (last 7 days). This depends on the
    // get_daily_active_users RPC (supabase/migrations/20260709_daily_active_users.sql)
    // - handled independently of the rest of the dashboard's stats so a
    // missing/failed migration on a given environment only blanks out this
    // one chart instead of throwing and zeroing out every other stat on the
    // page (total users, quiz scores, etc. don't depend on it at all).
    let dailyStats: { date?: string; count?: number }[] = [];
    try {
      const { data, error: dailyError } = await admin.rpc("get_daily_active_users", { days: 7 });
      if (dailyError) throw dailyError;
      dailyStats = data || [];
    } catch (error) {
      console.error("Error fetching daily active users:", error);
    }

    // Simple retention (placeholder - would need more complex query)
    const userRetention = [
      { week: 1, retained: activeUsersThisWeek, percentage: 100 },
      { week: 2, retained: Math.floor(activeUsersThisWeek * 0.8), percentage: 80 },
      { week: 4, retained: Math.floor(activeUsersThisWeek * 0.6), percentage: 60 },
    ];

    return {
      totalUsers,
      activeUsersThisWeek,
      totalLessonsCompleted,
      avgLessonsPerUser,
      avgQuizScore: Math.round(avgQuizScore),
      avgStudyTimeMinutes: Math.round(avgStudyTimeMinutes),
      completionByStage: [],
      topicPerformance: [],
      dailyActiveUsers: dailyStats.map((d) => ({
        date: d.date || "N/A",
        count: d.count || 0,
      })),
      userRetention,
    };
  } catch (error) {
    throw handleSupabaseError(error);
  }
}

export async function getLessonCompletionStats() {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("user_progress")
    .select("lesson_id, completed, quiz_score")
    .eq("completed", true);

  if (error) throw handleSupabaseError(error);

  return data || [];
}
