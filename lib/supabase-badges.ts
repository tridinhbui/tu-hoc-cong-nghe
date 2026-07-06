import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { BADGE_DEFINITIONS } from "@/lib/badges";

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
