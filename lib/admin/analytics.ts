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
    // 1. Total users count (exact count, head only)
    const { count: totalUsersCount, error: usersError } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true });

    if (usersError) throw usersError;
    const totalUsers = totalUsersCount || 0;

    // 2. Active users this week (completed at least one lesson in last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    // We fetch all active user IDs in the last 7 days, paginated to avoid limit
    let activeUserIds = new Set<string>();
    let activePage = 0;
    const activePageSize = 1000;
    
    while (true) {
      const { data: activeData, error: activeError } = await admin
        .from("user_progress")
        .select("user_id")
        .eq("completed", true)
        .gte("completed_at", weekAgo)
        .range(activePage * activePageSize, (activePage + 1) * activePageSize - 1);

      if (activeError) throw activeError;
      if (!activeData || activeData.length === 0) break;
      
      activeData.forEach((row) => activeUserIds.add(row.user_id));
      if (activeData.length < activePageSize) break;
      activePage++;
    }
    const activeUsersThisWeek = activeUserIds.size;

    // 3. Track breakdown (three separate count queries to bypass 1000 limit)
    const { count: personalCount } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true })
      .eq("preferred_track", "personal");

    const { count: professionalCount } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true })
      .eq("preferred_track", "professional");

    const { count: cfaCount } = await admin
      .from("user_profiles")
      .select("*", { count: "exact", head: true })
      .eq("preferred_track", "cfa");

    // Any users without preferred_track or preferred_track not matching professional/cfa default to personal
    const professional = professionalCount || 0;
    const cfa = cfaCount || 0;
    const personal = totalUsers - professional - cfa;

    const trackBreakdown = { personal, professional, cfa };

    // 4. Fetch all completed user_progress rows with pagination to bypass 1000 limit
    let allProgress: { lesson_id: number; quiz_score: number | null; time_spent_seconds: number | null }[] = [];
    let progressPage = 0;
    const progressPageSize = 1000;

    while (true) {
      const { data: progressData, error: progressError } = await admin
        .from("user_progress")
        .select("lesson_id, quiz_score, time_spent_seconds")
        .eq("completed", true)
        .range(progressPage * progressPageSize, (progressPage + 1) * progressPageSize - 1);

      if (progressError) throw progressError;
      if (!progressData || progressData.length === 0) break;

      allProgress = [...allProgress, ...progressData];
      if (progressData.length < progressPageSize) break;
      progressPage++;
    }

    const totalLessonsCompleted = allProgress.length;
    const avgQuizScore = allProgress.length
      ? allProgress.reduce((sum, p) => sum + (p.quiz_score || 0), 0) / allProgress.length
      : 0;
    const avgStudyTimeMinutes = allProgress.length
      ? allProgress.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0) / allProgress.length / 60
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
    
    allProgress.forEach((row) => {
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
