import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

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
export async function getCompletedLessons(userId: string) {
  const supabase = createClient();
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
    throw handleSupabaseError(error);
  }

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
