import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { isLessonInRange, TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";

function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

interface ProgressRow {
  lesson_id: number;
  completed: boolean;
  quiz_score: number | null;
  time_spent_seconds: number | null;
  completed_at: string | null;
}

interface LessonMetaRow {
  id: number;
  difficulty: string | null;
  title?: string | null;
  slug?: string | null;
  track?: string | null;
}

function inferAnalyticsTopic(lesson: LessonMetaRow): string {
  if (lesson.track === "bonus") return "Bài case & ứng dụng";

  const personalStage = TRACK_PERSONAL.stages.find((stage) => isLessonInRange(lesson.id, stage));
  if (lesson.track === "personal" || !lesson.track) {
    if (!personalStage) return "Tài chính cá nhân";
    if (personalStage.label === "Chặng 0" || personalStage.label === "Chặng 1") return "Nền tảng tiền bạc & rủi ro";
    if (personalStage.label === "Chặng 2" || personalStage.label === "Chặng 5") return "Đầu tư cá nhân";
    if (personalStage.label === "Chặng 3") return "Trái phiếu & lãi suất";
    if (personalStage.label === "Chặng 4" || personalStage.label === "Chặng 6") return "Danh mục & hưu trí";
    return "Nhà ở & bảo vệ tài sản";
  }

  const professionalStage = TRACK_PROFESSIONAL.stages.find((stage) => isLessonInRange(lesson.id, stage));
  if (!professionalStage) return "Tài chính chuyên ngành";
  if (professionalStage.label === "Chặng 1" || professionalStage.label === "Chặng 2" || professionalStage.label === "Chặng 3") {
    return "Kế toán & báo cáo tài chính";
  }
  if (professionalStage.label === "Chặng 4" || professionalStage.label === "Chặng 5" || professionalStage.label === "Chặng 6") {
    return "Định giá & tài chính doanh nghiệp";
  }
  if (professionalStage.label === "Chặng 7") return "Trái phiếu & tín dụng";
  if (professionalStage.label === "Chặng 8" || professionalStage.label === "Chặng 9") return "Rủi ro, danh mục & phái sinh";
  return "Ứng dụng nghề nghiệp";
}

export interface LearningAnalytics {
  totalLessonsCompleted: number;
  totalLessonsStarted: number;
  completionRate: number;
  totalXpEarned: number;
  averageQuizScore: number;
  totalTimeSpent: number;
  averageMinutesPerLesson: number;
  currentLevel: number;
  streakDays: number;
  longestStreak: number;
  consistencyScore: number;
  bestStudyHour: number | null;
  peakStudyWindow: string;
  recentMomentum: {
    last7DaysLessons: number;
    last30DaysLessons: number;
    last7DaysMinutes: number;
    weeklyTrendPercent: number;
  };
  lessonsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  lessonsByTrack: {
    personal: number;
    professional: number;
    bonus: number;
  };
  weeklyActivity: {
    week: number;
    label: string;
    lessonsCompleted: number;
    xpEarned: number;
    minutesSpent: number;
  }[];
  weakAreas: {
    topic: string;
    averageScore: number;
    lessonsCount: number;
  }[];
  studyTimeDistribution: {
    hour: number;
    lessonsCompleted: number;
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
  manualFlags: {
    totalFlags: number;
  };
}

function formatWeekLabel(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function getPeakStudyWindow(hour: number | null) {
  if (hour === null) return "Chưa đủ dữ liệu";
  if (hour < 6) return "Khuya / rất sớm";
  if (hour < 12) return "Buổi sáng";
  if (hour < 18) return "Buổi chiều";
  if (hour < 22) return "Buổi tối";
  return "Đêm muộn";
}

export async function getUserAnalytics(userId: string): Promise<LearningAnalytics> {
  const supabase = createClient();

  const [
    progressResponse,
    completedProgressResponse,
    statsResponse,
    streakResponse,
    notesResponse,
    flagsResponse,
  ] = await Promise.all([
    supabase
      .from("user_progress")
      .select("lesson_id, completed, quiz_score, time_spent_seconds, completed_at")
      .eq("user_id", userId),
    supabase
      .from("user_progress")
      .select("lesson_id, completed, quiz_score, time_spent_seconds, completed_at")
      .eq("user_id", userId)
      .eq("completed", true),
    supabase.from("user_stats").select("*").eq("user_id", userId).single(),
    supabase.from("user_streaks").select("*").eq("user_id", userId).single(),
    supabase.from("lesson_notes").select("lesson_id").eq("user_id", userId),
    supabase.from("lesson_manual_flags").select("lesson_id").eq("user_id", userId),
  ]);

  if (progressResponse.error) {
    throw handleSupabaseError(progressResponse.error);
  }
  if (completedProgressResponse.error) {
    throw handleSupabaseError(completedProgressResponse.error);
  }
  if (statsResponse.error && statsResponse.error.code !== "PGRST116") {
    throw handleSupabaseError(statsResponse.error);
  }
  if (streakResponse.error && streakResponse.error.code !== "PGRST116") {
    throw handleSupabaseError(streakResponse.error);
  }
  if (notesResponse.error && !isMissingTableError(notesResponse.error)) {
    throw handleSupabaseError(notesResponse.error);
  }
  if (flagsResponse.error && !isMissingTableError(flagsResponse.error)) {
    throw handleSupabaseError(flagsResponse.error);
  }

  const allProgress = (progressResponse.data ?? []) as ProgressRow[];
  const completedProgress = (completedProgressResponse.data ?? []) as ProgressRow[];
  const stats = statsResponse.data;
  const streak = streakResponse.data;

  const lessonIdsForMeta = Array.from(new Set([...allProgress.map((p) => p.lesson_id), ...(notesResponse.data ?? []).map((row) => row.lesson_id as number)]));

  const { data: lessons, error: lessonsError } = lessonIdsForMeta.length
    ? await supabase.from("lessons").select("id, difficulty, title, slug, track").in("id", lessonIdsForMeta)
    : { data: [], error: null };

  if (lessonsError) {
    throw handleSupabaseError(lessonsError);
  }

  const lessonRows = (lessons ?? []) as LessonMetaRow[];
  const lessonsById = new Map(lessonRows.map((lesson) => [lesson.id, lesson]));

  const notesByLesson = new Map<number, number>();
  for (const row of notesResponse.data ?? []) {
    const lessonId = row.lesson_id as number;
    notesByLesson.set(lessonId, (notesByLesson.get(lessonId) ?? 0) + 1);
  }

  const totalLessonsStarted = allProgress.length;
  const totalLessonsCompleted = completedProgress.length;
  const completionRate =
    totalLessonsStarted > 0 ? Math.round((totalLessonsCompleted / totalLessonsStarted) * 100) : 0;
  const totalXpEarned = stats?.total_xp || 0;
  const quizScores = completedProgress
    .map((progress) => progress.quiz_score)
    .filter((score): score is number => score !== null);
  const averageQuizScore =
    quizScores.length > 0 ? quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length : 0;
  const totalTimeSpentSeconds =
    completedProgress.reduce((sum, progress) => sum + (progress.time_spent_seconds || 0), 0) || 0;
  const totalTimeSpent = Math.round(totalTimeSpentSeconds / 60);
  const averageMinutesPerLesson =
    totalLessonsCompleted > 0 ? Math.round(totalTimeSpent / totalLessonsCompleted) : 0;
  const currentLevel = stats?.current_level || 1;
  const streakDays = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;

  const lessonsByDifficulty = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  const lessonsByTrack = {
    personal: 0,
    professional: 0,
    bonus: 0,
  };
  const topicMistakeCount = new Map<string, number>();

  for (const progress of completedProgress) {
    const lesson = lessonsById.get(progress.lesson_id);
    if (lesson?.difficulty === "Dễ") lessonsByDifficulty.easy += 1;
    if (lesson?.difficulty === "Trung bình") lessonsByDifficulty.medium += 1;
    if (lesson?.difficulty === "Khó") lessonsByDifficulty.hard += 1;

    if (lesson?.track === "professional") lessonsByTrack.professional += 1;
    else if (lesson?.track === "bonus") lessonsByTrack.bonus += 1;
    else lessonsByTrack.personal += 1;

    const quizScore = progress.quiz_score;
    if (typeof quizScore === "number" && quizScore <= 70) {
      const topic = inferAnalyticsTopic(lesson ?? { id: progress.lesson_id, title: null, slug: null, track: null, difficulty: null });
      topicMistakeCount.set(topic, (topicMistakeCount.get(topic) ?? 0) + 1);
    }
  }

  const hourlyDistribution = new Array(24).fill(0);
  for (const progress of completedProgress) {
    if (!progress.completed_at) continue;
    const hour = new Date(progress.completed_at).getHours();
    hourlyDistribution[hour] += 1;
  }

  const bestStudyHourValue = Math.max(...hourlyDistribution);
  const bestStudyHour = bestStudyHourValue > 0 ? hourlyDistribution.findIndex((value) => value === bestStudyHourValue) : null;

  const weeklyActivity = [];
  for (let i = 7; i >= 0; i -= 1) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weekProgress = completedProgress.filter((progress) => {
      if (!progress.completed_at) return false;
      const completedAt = new Date(progress.completed_at);
      return completedAt >= weekStart && completedAt < weekEnd;
    });

    const minutesSpent = Math.round(
      weekProgress.reduce((sum, progress) => sum + (progress.time_spent_seconds || 0), 0) / 60
    );

    weeklyActivity.push({
      week: 8 - i,
      label: formatWeekLabel(weekStart),
      lessonsCompleted: weekProgress.length,
      xpEarned: weekProgress.length * 10,
      minutesSpent,
    });
  }

  const weeksWithActivity = weeklyActivity.filter((week) => week.lessonsCompleted > 0).length;
  const consistencyScore = Math.round((weeksWithActivity / Math.max(weeklyActivity.length, 1)) * 100);

  const now = new Date();
  const last7DaysStart = new Date(now);
  last7DaysStart.setDate(now.getDate() - 7);
  const prev7DaysStart = new Date(now);
  prev7DaysStart.setDate(now.getDate() - 14);
  const last30DaysStart = new Date(now);
  last30DaysStart.setDate(now.getDate() - 30);

  const last7DaysProgress = completedProgress.filter((progress) => {
    if (!progress.completed_at) return false;
    const completedAt = new Date(progress.completed_at);
    return completedAt >= last7DaysStart;
  });

  const prev7DaysProgress = completedProgress.filter((progress) => {
    if (!progress.completed_at) return false;
    const completedAt = new Date(progress.completed_at);
    return completedAt >= prev7DaysStart && completedAt < last7DaysStart;
  });

  const last30DaysProgress = completedProgress.filter((progress) => {
    if (!progress.completed_at) return false;
    const completedAt = new Date(progress.completed_at);
    return completedAt >= last30DaysStart;
  });

  const weeklyTrendPercent =
    prev7DaysProgress.length > 0
      ? Math.round(((last7DaysProgress.length - prev7DaysProgress.length) / prev7DaysProgress.length) * 100)
      : last7DaysProgress.length > 0
        ? 100
        : 0;

  const recentMomentum = {
    last7DaysLessons: last7DaysProgress.length,
    last30DaysLessons: last30DaysProgress.length,
    last7DaysMinutes: Math.round(
      last7DaysProgress.reduce((sum, progress) => sum + (progress.time_spent_seconds || 0), 0) / 60
    ),
    weeklyTrendPercent,
  };

  const topLessons = Array.from(notesByLesson.entries())
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .map(([lessonId, notesCount]) => {
      const lesson = lessonsById.get(lessonId);
      return {
        lessonId,
        title: lesson?.title ?? `Bài học #${lessonId}`,
        slug: lesson?.slug ?? "",
        notesCount,
      };
    })
    .slice(0, 5);

  const weakAreas = Array.from(topicMistakeCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([topic, count]) => ({
      topic,
      averageScore: Math.max(0, 100 - count * 12),
      lessonsCount: count,
    }));

  return {
    totalLessonsCompleted,
    totalLessonsStarted,
    completionRate,
    totalXpEarned,
    averageQuizScore: Math.round(averageQuizScore * 100) / 100,
    totalTimeSpent,
    averageMinutesPerLesson,
    currentLevel,
    streakDays,
    longestStreak,
    consistencyScore,
    bestStudyHour,
    peakStudyWindow: getPeakStudyWindow(bestStudyHour),
    recentMomentum,
    lessonsByDifficulty,
    lessonsByTrack,
    weeklyActivity,
    weakAreas,
    studyTimeDistribution: hourlyDistribution.map((lessonsCompleted, hour) => ({
      hour,
      lessonsCompleted,
    })),
    notes: {
      totalNotes: notesResponse.data?.length ?? 0,
      lessonsWithNotes: notesByLesson.size,
      topLessons,
    },
    manualFlags: {
      totalFlags: flagsResponse.data?.length ?? 0,
    },
  };
}

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

  const hourlyDistribution = new Array(24).fill(0);
  data?.forEach((progress) => {
    if (progress.completed_at) {
      const hour = new Date(progress.completed_at).getHours();
      hourlyDistribution[hour] += 1;
    }
  });

  return hourlyDistribution;
}
