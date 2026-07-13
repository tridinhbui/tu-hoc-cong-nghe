import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface LearningAnalytics {
  totalLessonsCompleted: number;
  totalXpEarned: number;
  averageQuizScore: number;
  totalTimeSpent: number; // in minutes
  currentLevel: number;
  streakDays: number;
  longestStreak: number;
  lessonsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  weeklyActivity: {
    week: number;
    lessonsCompleted: number;
    xpEarned: number;
  }[];
  weakAreas: {
    topic: string;
    averageScore: number;
    lessonsCount: number;
  }[];
  notes: {
    totalNotes: number;
    lessonsWithNotes: number;
    topLessons: {
      lessonId: number;
      title: string;
      slug: string;
      notesCount: number;
    }[];
  };
}

/**
 * Get comprehensive learning analytics for a user
 */
export async function getUserAnalytics(userId: string): Promise<LearningAnalytics> {
  const supabase = createClient();

  // Get user progress
  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("lesson_id, completed, quiz_score, time_spent_seconds, completed_at")
    .eq("user_id", userId)
    .eq("completed", true);

  if (progressError) {
    throw handleSupabaseError(progressError);
  }

  // Get user stats
  const { data: stats, error: statsError } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (statsError && statsError.code !== "PGRST116") {
    throw handleSupabaseError(statsError);
  }

  // Get user streak
  const { data: streak, error: streakError } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (streakError && streakError.code !== "PGRST116") {
    throw handleSupabaseError(streakError);
  }

  // Get lesson data for difficulty breakdown
  const lessonIds = progress?.map(p => p.lesson_id) || [];
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, difficulty")
    .in("id", lessonIds);

  if (lessonsError) {
    throw handleSupabaseError(lessonsError);
  }

  // Get user notes. This is optional analytics sugar, so missing-table
  // environments should degrade to zeroes instead of breaking the page.
  const { data: notesRows, error: notesError } = await supabase
    .from("lesson_notes")
    .select("lesson_id")
    .eq("user_id", userId);

  if (notesError && !isMissingTableError(notesError)) {
    throw handleSupabaseError(notesError);
  }

  const notesByLesson = new Map<number, number>();
  for (const row of notesRows ?? []) {
    const lessonId = row.lesson_id as number;
    notesByLesson.set(lessonId, (notesByLesson.get(lessonId) ?? 0) + 1);
  }

  const noteLessonIds = Array.from(notesByLesson.keys());
  const { data: noteLessons, error: noteLessonsError } = noteLessonIds.length
    ? await supabase
        .from("lessons")
        .select("id, title, slug")
        .in("id", noteLessonIds)
    : { data: [], error: null };

  if (noteLessonsError) {
    throw handleSupabaseError(noteLessonsError);
  }

  const noteLessonMeta = new Map(
    (noteLessons ?? []).map((lesson) => [
      lesson.id as number,
      { title: lesson.title as string, slug: lesson.slug as string },
    ])
  );

  // Calculate analytics
  const totalLessonsCompleted = progress?.length || 0;
  const totalXpEarned = stats?.total_xp || 0;
  const quizScores = progress?.map(p => p.quiz_score).filter((s): s is number => s !== null) || [];
  const averageQuizScore = quizScores.length > 0 
    ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
    : 0;
  const totalTimeSpent = progress?.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0) || 0;
  const currentLevel = stats?.current_level || 1;
  const streakDays = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;

  // Difficulty breakdown
  const lessonsByDifficulty = {
    easy: lessons?.filter(l => l.difficulty === "Dễ").length || 0,
    medium: lessons?.filter(l => l.difficulty === "Trung bình").length || 0,
    hard: lessons?.filter(l => l.difficulty === "Khó").length || 0,
  };

  // Weekly activity (last 8 weeks)
  const weeklyActivity = [];
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weekProgress = progress?.filter(p => {
      const completedAt = p.completed_at ? new Date(p.completed_at) : null;
      return completedAt && completedAt >= weekStart && completedAt < weekEnd;
    }) || [];

    weeklyActivity.push({
      week: i + 1,
      lessonsCompleted: weekProgress.length,
      xpEarned: weekProgress.length * 10, // 10 XP per lesson
    });
  }

  // Weak areas (topics with low quiz scores)
  const weakAreas: { topic: string; averageScore: number; lessonsCount: number }[] = [];
  // This would require lesson topic data - simplified for now
  // In a real implementation, you'd group by lesson topic/stage

  const topLessons = Array.from(notesByLesson.entries())
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .map(([lessonId, notesCount]) => {
      const meta = noteLessonMeta.get(lessonId);
      return {
        lessonId,
        title: meta?.title ?? `Bai hoc #${lessonId}`,
        slug: meta?.slug ?? "",
        notesCount,
      };
    })
    .slice(0, 5);

  return {
    totalLessonsCompleted,
    totalXpEarned,
    averageQuizScore: Math.round(averageQuizScore * 100) / 100,
    totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
    currentLevel,
    streakDays,
    longestStreak,
    lessonsByDifficulty,
    weeklyActivity,
    weakAreas,
    notes: {
      totalNotes: notesRows?.length ?? 0,
      lessonsWithNotes: notesByLesson.size,
      topLessons,
    },
  };
}

/**
 * Get learning time distribution by hour of day
 */
export async function getLearningTimeDistribution(userId: string): Promise<number[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_progress")
    .select("completed_at")
    .eq("user_id", userId)
    .eq("completed", true)
    .not("completed_at", "is", null);

  if (error) {
    throw handleSupabaseError(error);
  }

  // Initialize 24-hour array
  const hourlyDistribution = new Array(24).fill(0);

  data?.forEach(progress => {
    if (progress.completed_at) {
      const hour = new Date(progress.completed_at).getHours();
      hourlyDistribution[hour]++;
    }
  });

  return hourlyDistribution;
}
