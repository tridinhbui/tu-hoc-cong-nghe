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

/**
 * Client-side badge awarding is intentionally disabled.
 * Earned badges must be written only from trusted server-side code / SQL
 * after verifying the user's real state, never from the browser.
 */
export async function awardBadge(userId: string, badgeKey: string) {
  void userId;
  void badgeKey;
  return null;
}

export async function awardBadges(userId: string, badgeKeys: string[]) {
  void userId;
  void badgeKeys;
  return [] as UserBadge[];
}
