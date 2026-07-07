import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - the leaderboard is a non-critical feature, so a missing
// table should degrade to "no ranking data yet" instead of crashing the
// dashboard.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  current_level: number;
  total_xp: number;
  lessons_completed: number;
  avg_quiz_score: number;
  current_stage: number;
  preferred_track: string;
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: number;
  user_id: string;
  total_lessons_completed: number;
  total_xp: number;
  current_level: number;
  avg_quiz_score: number;
  longest_streak: number;
  last_lesson_date: string | null;
  total_study_time_hours: number;
  created_at: string;
  updated_at: string;
}

// Tạo user profile khi đăng ký
export async function createUserProfile(userId: string, email: string, fullName?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .insert([
      {
        id: userId,
        email,
        full_name: fullName,
        current_level: 1,
        total_xp: 0,
        lessons_completed: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Lấy user profile
export async function getUserProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Cập nhật user profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Lấy user stats
export async function getUserStats(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserStats;
}

// Tạo/cập nhật user stats
export async function upsertUserStats(userId: string, stats: Partial<UserStats>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .upsert(
      [
        {
          user_id: userId,
          ...stats,
        },
      ],
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserStats;
}

// Cập nhật dark mode
export async function setDarkMode(userId: string, darkMode: boolean) {
  return updateUserProfile(userId, { dark_mode: darkMode });
}

// Cập nhật preferred track
export async function setPreferredTrack(userId: string, track: "personal" | "professional") {
  return updateUserProfile(userId, { preferred_track: track });
}

// Lấy top users từ leaderboard
export async function getLeaderboard(limit: number = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .select(`
      user_id,
      total_xp,
      total_lessons_completed,
      avg_quiz_score,
      current_level,
      user_profiles(full_name, email)
    `)
    .order("total_xp", { ascending: false })
    .limit(limit);

  if (error && isMissingTableError(error)) {
    return [];
  }
  if (error) {
    throw handleSupabaseError(error);
  }

  return data;
}

// Cập nhật stats từ progress
export async function recalculateUserStats(userId: string) {
  const supabase = createClient();

  // Lấy tất cả progress của user
  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("completed, quiz_score")
    .eq("user_id", userId)
    .eq("completed", true);

  if (progressError) {
    throw handleSupabaseError(progressError);
  }

  const lessonsCompleted = progress?.length || 0;
  const totalXp = lessonsCompleted * 10; // 10 XP per lesson
  const quizScores = progress?.filter((p) => p.quiz_score !== null).map((p) => p.quiz_score) || [];
  const avgScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;
  const currentLevel = Math.floor(totalXp / 150) + 1;

  // Cập nhật user_profiles
  await updateUserProfile(userId, {
    lessons_completed: lessonsCompleted,
    total_xp: totalXp,
    current_level: currentLevel,
    avg_quiz_score: Math.round(avgScore * 100) / 100,
  });

  // Cập nhật user_stats
  return upsertUserStats(userId, {
    total_lessons_completed: lessonsCompleted,
    total_xp: totalXp,
    current_level: currentLevel,
    avg_quiz_score: Math.round(avgScore * 100) / 100,
  });
}
