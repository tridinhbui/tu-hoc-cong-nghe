import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

/**
 * Optimized database queries using joins to reduce round trips
 */

/**
 * Fetch complete user data in a single query with joins
 * Replaces multiple separate calls to getUserProfile, getUserStats, getUserProgress
 */
export async function getUserCompleteData(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_profiles")
    .select(`
      *,
      user_stats(*),
      user_progress(
        lesson_id,
        completed,
        quiz_score,
        completed_at
      )
    `)
    .eq("id", userId)
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data;
}

/**
 * Fetch leaderboard with user profiles in a single query
 * Optimized version of getLeaderboard with joins
 */
export async function getLeaderboardOptimized(limit: number = 10) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_stats")
    .select(`
      user_id,
      total_xp,
      total_lessons_completed,
      avg_quiz_score,
      current_level,
      user_profiles!inner(
        full_name,
        email
      )
    `)
    .order("total_xp", { ascending: false })
    .limit(limit);

  if (error) {
    throw handleSupabaseError(error);
  }

  // Add rank calculation
  return data?.map((entry: Record<string, unknown>, index: number) => ({
    ...entry,
    rank: index + 1,
  })) || [];
}

/**
 * Fetch lesson progress with lesson metadata in a single query
 * Useful for dashboard to show lesson titles with progress
 */
export async function getUserProgressWithLessonData(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_progress")
    .select(`
      lesson_id,
      completed,
      quiz_score,
      completed_at,
      lessons!inner(
        id,
        slug,
        title,
        subtitle,
        duration,
        difficulty,
        track,
        stage_number,
        day_number
      )
    `)
    .eq("user_id", userId)
    .order("lesson_id", { ascending: true });

  if (error) {
    throw handleSupabaseError(error);
  }

  return data;
}

/**
 * Fetch stage progress with lesson details
 * Optimized for dashboard stage view
 */
export async function getStageProgressWithLessons(userId: string, stageNumber: number) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_progress")
    .select(`
      lesson_id,
      completed,
      quiz_score,
      lessons!inner(
        id,
        slug,
        title,
        subtitle,
        duration,
        difficulty,
        day_number
      )
    `)
    .eq("user_id", userId)
    .eq("lessons.stage_number", stageNumber)
    .order("lessons.day_number", { ascending: true });

  if (error) {
    throw handleSupabaseError(error);
  }

  return data;
}

/**
 * Fetch user badges with badge definitions
 * Single query instead of separate badge lookup
 */
export async function getUserBadgesWithDefinitions(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("user_badges")
    .select(`
      badge_key,
      badge_name,
      badge_description,
      badge_icon,
      earned_at
    `)
    .eq("user_id", userId)
    .order("earned_at", { ascending: false });

  if (error) {
    throw handleSupabaseError(error);
  }

  return data;
}
