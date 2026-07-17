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
  freezes_used?: number;
  last_streak_before_break?: number | null;
  created_at: string;
  updated_at: string;
}

// Every user gets 3 lifetime streak freezes - each one silently absorbs a
// missed day (the gap is forgiven, streak count stays put) instead of
// resetting to 1. Once all 3 are used, a missed day breaks the streak
// normally again.
export const MAX_STREAK_FREEZES = 3;

export function getRemainingStreakFreezes(streak: UserStreak | null): number {
  if (!streak) return MAX_STREAK_FREEZES;
  return Math.max(0, MAX_STREAK_FREEZES - (streak.freezes_used ?? 0));
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
export async function updateStreak(userId: string): Promise<UserStreak & { freezeUsedThisUpdate?: boolean }> {
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
  let newFreezesUsed = currentStreak.freezes_used ?? 0;
  let freezeUsedThisUpdate = false;

  // Set only when the streak actually breaks below, so restoreStreakWithXp
  // has something to offer back - left untouched (via `undefined` -> not
  // included in the update payload) on every other path, and explicitly
  // cleared once a fresh streak is actively being rebuilt.
  let lastStreakBeforeBreak: number | null | undefined = undefined;

  if (currentStreak.last_activity_date === yesterdayString) {
    // Continue streak
    newStreak += 1;
    newLongestStreak = Math.max(newLongestStreak, newStreak);
    if (currentStreak.last_streak_before_break) lastStreakBeforeBreak = null;
  } else if (newFreezesUsed < MAX_STREAK_FREEZES) {
    // Gap of 2+ days, but a freeze is available - absorb it silently: the
    // streak count is neither incremented nor reset, just carried forward
    // as if today were the missed day.
    newFreezesUsed += 1;
    freezeUsedThisUpdate = true;
  } else {
    // Streak broken, no freezes left, start new streak - but remember what
    // was lost so it can be bought back with XP (restoreStreakWithXp).
    lastStreakBeforeBreak = currentStreak.current_streak;
    newStreak = 1;
  }

  const payload: Record<string, unknown> = {
    current_streak: newStreak,
    longest_streak: newLongestStreak,
    last_activity_date: today,
    freezes_used: newFreezesUsed,
  };
  if (lastStreakBeforeBreak !== undefined) payload.last_streak_before_break = lastStreakBeforeBreak;

  // Update streak
  let { data, error } = await supabase
    .from("user_streaks")
    .update(payload)
    .eq("user_id", userId)
    .select()
    .single();

  // freezes_used/last_streak_before_break columns not migrated yet on this
  // environment - retry with just the original columns rather than failing
  // every streak update.
  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    ({ data, error } = await supabase
      .from("user_streaks")
      .update({
        current_streak: newStreak,
        longest_streak: newLongestStreak,
        last_activity_date: today,
      })
      .eq("user_id", userId)
      .select()
      .single());
  }

  if (error) {
    throw handleSupabaseError(error);
  }

  // freezes_used explicitly overridden (not just spread from `data`) since
  // the fallback update path above never persists that column, which would
  // otherwise leave it undefined and make the "remaining freezes" toast in
  // LessonPageLayout show a stale/wrong count until the migration runs.
  return { ...(data as UserStreak), freezes_used: newFreezesUsed, freezeUsedThisUpdate };
}

export const STREAK_RESTORE_XP_COST = 150;

export interface StreakRestoreOffer {
  canRestore: boolean;
  lostStreak: number;
}

/** Is there a recently-broken streak (freezes exhausted) available to buy back? */
export function getStreakRestoreOffer(streak: UserStreak | null): StreakRestoreOffer {
  const lost = streak?.last_streak_before_break ?? null;
  if (!lost || lost <= (streak?.current_streak ?? 0)) {
    return { canRestore: false, lostStreak: 0 };
  }
  return { canRestore: true, lostStreak: lost };
}

/**
 * Spends STREAK_RESTORE_XP_COST XP to restore a just-broken streak back to
 * what it was. Throws if there's nothing to restore or XP is insufficient -
 * the caller (a confirm-style UI action) should show that as an error.
 */
export async function restoreStreakWithXp(userId: string): Promise<UserStreak> {
  const supabase = createClient();

  const streak = await getUserStreak(userId);
  const offer = getStreakRestoreOffer(streak);
  if (!streak || !offer.canRestore) {
    throw new Error("Không có chuỗi ngày nào để khôi phục.");
  }

  const { data: statsRow, error: statsError } = await supabase
    .from("user_stats")
    .select("total_xp, xp_spent")
    .eq("user_id", userId)
    .maybeSingle();
  if (statsError) throw handleSupabaseError(statsError);

  const availableXp = (statsRow?.total_xp ?? 0) - (statsRow?.xp_spent ?? 0);
  if (availableXp < STREAK_RESTORE_XP_COST) {
    throw new Error(`Không đủ XP - cần ${STREAK_RESTORE_XP_COST} XP để khôi phục chuỗi.`);
  }

  const { error: spendError } = await supabase
    .from("user_stats")
    .update({ xp_spent: (statsRow?.xp_spent ?? 0) + STREAK_RESTORE_XP_COST })
    .eq("user_id", userId);
  if (spendError) throw handleSupabaseError(spendError);

  const today = new Date().toISOString().split("T")[0];
  const restoredStreak = offer.lostStreak;
  const { data, error } = await supabase
    .from("user_streaks")
    .update({
      current_streak: restoredStreak,
      longest_streak: Math.max(streak.longest_streak, restoredStreak),
      last_activity_date: today,
      last_streak_before_break: null,
    })
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw handleSupabaseError(error);

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
