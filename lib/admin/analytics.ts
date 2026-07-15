import { createAdminClient } from "@/lib/supabase-admin";
import { handleSupabaseError } from "@/lib/errors";
import { getLessonsMeta } from "@/lib/lessons-loader";

export interface SystemAnalytics {
  totalUsers: number;
  activeUsersThisWeek: number;
  totalLessonsCompleted: number;
  avgLessonsPerUser: number;
  avgQuizScore: number;
  avgStudyTimeMinutes: number;
  trackBreakdown: {
    personal: number;
    professional: number;
    cfa: number;
  };
  topLessons: {
    id: number;
    title: string;
    slug: string;
    completions: number;
    avgScore: number;
  }[];
  dailyActiveUsers: {
    date: string;
    count: number;
  }[];
}

export async function getSystemAnalytics(): Promise<SystemAnalytics> {
  const admin = createAdminClient();

  try {
    // 1. Total users (using count only for performance)
    const { count: totalUsersCount, error: usersError } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true });

    if (usersError) throw usersError;
    const totalUsers = totalUsersCount || 0;

    // 2. Active users this week based on actual login
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: activeUsersCount, error: activeError } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true })
      .gte("last_login_at", weekAgo);

    if (activeError) throw activeError;
    const activeUsersThisWeek = activeUsersCount || 0;

    // 3. Track breakdown
    const { data: trackData, error: trackError } = await admin
      .from("user_profiles")
      .select("preferred_track");

    const trackBreakdown = { personal: 0, professional: 0, cfa: 0 };
    if (!trackError && trackData) {
      trackData.forEach((row) => {
        const track = row.preferred_track || "personal";
        if (track === "professional") trackBreakdown.professional++;
        else if (track === "cfa") trackBreakdown.cfa++;
        else trackBreakdown.personal++;
      });
    }

    // 4. Lessons completed & Quiz averages
    const { data: progress, error: progressError } = await admin
      .from("user_progress")
      .select("lesson_id, quiz_score, time_spent_seconds")
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

    // 5. Daily active users (last 7 days)
    let dailyStats: { date?: string; count?: number }[] = [];
    try {
      const { data, error: dailyError } = await admin.rpc("get_daily_active_users", { days: 7 });
      if (dailyError) throw dailyError;
      dailyStats = data || [];
    } catch (error) {
      console.error("Error fetching daily active users:", error);
    }

    // 6. Top 5 popular lessons
    const lessonMeta = await getLessonsMeta();
    const lessonCounts: Record<number, { count: number; totalScore: number }> = {};
    
    (progress ?? []).forEach((row) => {
      const id = row.lesson_id;
      if (id === undefined || id === null) return;
      if (!lessonCounts[id]) {
        lessonCounts[id] = { count: 0, totalScore: 0 };
      }
      lessonCounts[id].count++;
      lessonCounts[id].totalScore += row.quiz_score || 0;
    });

    const topLessons = Object.entries(lessonCounts)
      .map(([idStr, stats]) => {
        const id = Number(idStr);
        const meta = lessonMeta.find((l) => l.id === id);
        return {
          id,
          title: meta?.title || `Bài học #${id}`,
          slug: meta?.slug || "",
          completions: stats.count,
          avgScore: Math.round(stats.totalScore / stats.count),
        };
      })
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 5);

    return {
      totalUsers,
      activeUsersThisWeek,
      totalLessonsCompleted,
      avgLessonsPerUser,
      avgQuizScore: Math.round(avgQuizScore),
      avgStudyTimeMinutes: Math.round(avgStudyTimeMinutes),
      trackBreakdown,
      topLessons,
      dailyActiveUsers: dailyStats.map((d) => ({
        date: d.date || "N/A",
        count: d.count || 0,
      })),
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
