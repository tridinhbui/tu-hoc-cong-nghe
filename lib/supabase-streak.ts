import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - streaks are a non-critical gamification feature, so treat
// a missing table as "no streak yet" instead of crashing the caller.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get user's streak information
 */
export async function getUserStreak(userId: string): Promise<UserStreak | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && isMissingTableError(error)) {
    return null;
  }
  if (error && error.code !== "PGRST116") {
    throw handleSupabaseError(error);
  }

  return data as UserStreak | null;
}

/**
 * Update user's streak after completing a lesson
 * This should be called when a user completes a lesson
 */
export async function updateStreak(userId: string): Promise<UserStreak> {
  const supabase = createClient();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Get current streak
  const currentStreak = await getUserStreak(userId);
  
  if (!currentStreak) {
    // Create new streak record
    const { data, error } = await supabase
      .from("user_streaks")
      .insert([
        {
          user_id: userId,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        },
      ])
      .select()
      .single();

    if (error) {
      throw handleSupabaseError(error);
    }

    return data as UserStreak;
  }

  // Check if the last activity was today (already updated today)
  if (currentStreak.last_activity_date === today) {
    return currentStreak;
  }

  // Check if the last activity was yesterday (continue streak)
  const lastActivityDate = new Date(currentStreak.last_activity_date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  let newStreak = currentStreak.current_streak;
  let newLongestStreak = currentStreak.longest_streak;

  if (currentStreak.last_activity_date === yesterdayString) {
    // Continue streak
    newStreak += 1;
    newLongestStreak = Math.max(newLongestStreak, newStreak);
  } else {
    // Streak broken, start new streak
    newStreak = 1;
  }

  // Update streak
  const { data, error } = await supabase
    .from("user_streaks")
    .update({
      current_streak: newStreak,
      longest_streak: newLongestStreak,
      last_activity_date: today,
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserStreak;
}

/**
 * Check if user has activity today (for streak display)
 */
export async function hasActivityToday(userId: string): Promise<boolean> {
  const supabase = createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from("user_streaks")
    .select("last_activity_date")
    .eq("user_id", userId)
    .single();

  if (error && isMissingTableError(error)) {
    return false;
  }
  if (error && error.code !== "PGRST116") {
    throw handleSupabaseError(error);
  }

  return data?.last_activity_date === today || false;
}

/**
 * Get streak bonus XP (optional: give bonus XP for maintaining streaks)
 */
export function getStreakBonusXP(streak: number): number {
  if (streak >= 30) return 50; // 30+ day streak: 50 bonus XP
  if (streak >= 14) return 25; // 14+ day streak: 25 bonus XP
  if (streak >= 7) return 10;  // 7+ day streak: 10 bonus XP
  if (streak >= 3) return 5;   // 3+ day streak: 5 bonus XP
  return 0;
}
