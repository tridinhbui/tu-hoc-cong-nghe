import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { BADGE_DEFINITIONS, getLevelBadgeKeys } from "@/lib/badges";
import { getLevelByXp } from "@/lib/levels";

export interface UserBadge {
  id: number;
  user_id: string;
  badge_key: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  earned_at: string;
}

// PGRST205 = table not found in schema cache (migration not run yet on this Supabase project)
function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205";
}

export async function getUserBadges(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_badges")
    .select("*")
    .eq("user_id", userId)
    .order("earned_at", { ascending: false });

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return [];
  }

  return data as UserBadge[];
}

function isBadgeEarnedByCurrentState(
  badgeKey: string,
  state: {
    currentLevel: number;
  }
): boolean {
  return getLevelBadgeKeys(state.currentLevel).includes(badgeKey);
}

/**
 * Read badges defensively. `user_badges` is historical state, and production
 * has had progress rows reset/deleted while badge rows survived, leaving
 * orphaned badges that the learner no longer qualifies for. Profile display
 * should reflect the current source-of-truth tables, not stale badge rows.
 */
export async function getEligibleUserBadges(userId: string) {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("current_level, total_xp")
    .eq("id", userId)
    .single();

  if (profileError) throw handleSupabaseError(profileError);

  const currentLevel =
    profile?.current_level && profile.current_level > 0
      ? profile.current_level
      : getLevelByXp(profile?.total_xp ?? 0).level;

  const allowedBadgeKeys = getLevelBadgeKeys(currentLevel);
  if (allowedBadgeKeys.length === 0) return [];

  const badges = await getUserBadges(userId);
  const state = {
    currentLevel,
  };

  const existingByKey = new Map(badges.map((badge) => [badge.badge_key, badge]));

  return allowedBadgeKeys.map((badgeKey, index) => {
    const existing = existingByKey.get(badgeKey);
    const def = BADGE_DEFINITIONS[badgeKey];

    return (
      existing ?? {
        id: -(index + 1),
        user_id: userId,
        badge_key: def.key,
        badge_name: def.name,
        badge_description: def.description,
        badge_icon: def.icon,
        earned_at: new Date(0).toISOString(),
      }
    );
  }).filter((badge) => isBadgeEarnedByCurrentState(badge.badge_key, state));
}

/** Award a badge if not already earned. Returns the badge if newly awarded, null if already had it. */
export async function awardBadge(userId: string, badgeKey: string) {
  const def = BADGE_DEFINITIONS[badgeKey];
  if (!def) return null;

  const supabase = createClient();

  // Check if already earned
  const { data: existing, error: checkError } = await supabase
    .from("user_badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_key", badgeKey)
    .single();

  if (checkError && isMissingTableError(checkError)) return null;
  if (existing) return null; // already has it

  const { data, error } = await supabase
    .from("user_badges")
    .insert([
      {
        user_id: userId,
        badge_key: def.key,
        badge_name: def.name,
        badge_description: def.description,
        badge_icon: def.icon,
      },
    ])
    .select()
    .single();

  if (error) {
    // Unique constraint race - not an actual error for UX
    if (error.code !== "23505" && !isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return null;
  }

  return data as UserBadge;
}

export async function awardBadges(userId: string, badgeKeys: string[]) {
  const newlyAwarded: UserBadge[] = [];
  for (const key of badgeKeys) {
    const badge = await awardBadge(userId, key);
    if (badge) newlyAwarded.push(badge);
  }
  return newlyAwarded;
}
