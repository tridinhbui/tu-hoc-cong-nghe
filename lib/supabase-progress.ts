import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { scheduleLessonRecall } from "@/lib/supabase-recalls";
import { recalculateUserStats } from "@/lib/supabase-user";

export async function addXpToUser(userId: string, xpAmount: number): Promise<void> {
  if (!userId) return;
  await recalculateUserStats(userId).catch(() => {});
}

export interface UserProgress {
  id: number;
  user_id: string;
  lesson_id: number;
  completed: boolean;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_seconds: number | null;
  created_at: string;
  updated_at: string;
}

// Lấy progress của user cho một bài
export async function getLessonProgress(userId: string, lessonId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned (not an error)
    throw handleSupabaseError(error);
  }

  return (data as UserProgress) || null;
}

// Lấy tất cả progress của user
export async function getUserProgress(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .order("lesson_id", { ascending: true });

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProgress[];
}

// Lấy các bài đã hoàn thành
//
// Accepts an optional pre-authenticated client for server-side callers
// (Server Actions/Components). createClient() from lib/supabase.ts builds a
// browser client with no cookie jar to read a session from - calling this
// with the default client from a Server Action silently queries as an
// anonymous user, and RLS then returns zero rows regardless of how much
// progress actually exists. Server callers must pass a client built with
// lib/supabase-server.ts's createServerSupabaseClient() instead.
export async function getCompletedLessons(userId: string, client?: SupabaseClient) {
  const supabase = client ?? createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);

  if (error) {
    throw handleSupabaseError(error);
  }

  return data?.map((p) => p.lesson_id) || [];
}

// Lấy progress của user cho một stage
export async function getStageProgress(userId: string, stageNumber: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select(`
      *,
      lessons!inner(stage_number)
    `)
    .eq("user_id", userId)
    .eq("lessons.stage_number", stageNumber);

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProgress[];
}

// Đánh dấu bài đã hoàn thành
export async function markLessonComplete(
  userId: string,
  lessonId: number,
  quizScore?: number,
  timeSpentSeconds?: number
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      [
        {
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          quiz_score: quizScore,
          time_spent_seconds: timeSpentSeconds,
        },
      ],
      { onConflict: "user_id,lesson_id" }
    )
    .select()
    .single();

  if (error) {
    if (error.code === "23503" || error.code === "23514") {
      console.warn("Postgres FK/Check constraint error in markLessonComplete, ignored:", error);
    } else {
      throw handleSupabaseError(error);
    }
  }

  void scheduleLessonRecall(userId, lessonId, 1).catch(() => {});
  void recalculateUserStats(userId).catch(() => {});

  return data as UserProgress;
}

// Cập nhật quiz score
export async function updateQuizScore(userId: string, lessonId: number, score: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .update({ quiz_score: score })
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProgress;
}

// Tổng số phút học thực tế (tổng time_spent_seconds đã ghi nhận), dùng cho
// lời chào tóm tắt của Tài Tài trên dashboard.
export async function getTotalTimeSpentMinutes(userId: string, client?: SupabaseClient): Promise<number> {
  const supabase = client ?? createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("time_spent_seconds")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching total time spent:", error);
    return 0;
  }

  const totalSeconds = (data ?? []).reduce((sum, row) => sum + (row.time_spent_seconds ?? 0), 0);
  return Math.round(totalSeconds / 60);
}

// Lấy progress stats
export async function getProgressStats(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("completed, quiz_score")
    .eq("user_id", userId);

  if (error) {
    throw handleSupabaseError(error);
  }

  const completed = data?.filter((p) => p.completed).length || 0;
  const quizScores = data?.filter((p) => p.completed && p.quiz_score !== null).map((p) => p.quiz_score) || [];
  const avgScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

  return {
    lessonsCompleted: completed,
    averageScore: Math.round(avgScore * 100) / 100,
    totalLessonsStarted: data?.length || 0,
  };
}

// Xóa progress (cho testing)
export async function deleteLessonProgress(userId: string, lessonId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_progress")
    .delete()
    .eq("user_id", userId)
    .eq("lesson_id", lessonId);

  if (error) {
    throw handleSupabaseError(error);
  }

  return true;
}
