import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { BADGE_DEFINITIONS, CAREER_BADGE_DEFINITIONS, getLevelBadgeKeys } from "@/lib/badges";
import { getLevelByXp } from "@/lib/levels";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

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
 * Career-map milestones, derived from real tables the same way level badges
 * are derived from user_profiles - never client-awarded (see the note on
 * awardBadge below). Resolves relatedLessonSlugs -> lesson-completion via
 * the same server route the career detail view and dashboard widget use
 * (/api/career-lesson-progress), rather than duplicating that resolution
 * logic here; lib/lessons-loader.ts is server-only and can't be imported
 * into this client-callable module directly.
 */
async function getEarnedCareerBadgeKeys(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<string[]> {
  const earned: string[] = [];

  const [goalRow, { data: quizRow }] = await Promise.all([
    (async () => {
      try {
        const { data } = await supabase.from("user_career_goals").select("career_id").eq("user_id", userId).maybeSingle();
        return data;
      } catch {
        return null;
      }
    })(),
    supabase
      .from("user_quest_completions")
      .select("quest_type")
      .eq("user_id", userId)
      .eq("quest_type", "career_assessment")
      .maybeSingle(),
  ]);

  if (goalRow?.career_id) earned.push("career_goal_set");
  if (quizRow) earned.push("career_quiz_done");

  const goalCareer = goalRow?.career_id ? FINANCE_CAREERS.find((c) => c.id === goalRow.career_id) : null;
  if (goalCareer && goalCareer.relatedLessonSlugs.length > 0) {
    try {
      const res = await fetch("/api/career-lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: goalCareer.relatedLessonSlugs }),
      });
      if (res.ok) {
        const progress = (await res.json()) as { total: number; completed: number };
        if (progress.total > 0 && progress.completed === progress.total) {
          earned.push("career_path_complete");
        }
      }
    } catch {
      // Non-critical - a network hiccup here just means the badge doesn't
      // show up this load, not a broken profile page.
    }
  }

  return earned;
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

  const [badges, earnedCareerBadgeKeys] = await Promise.all([
    getUserBadges(userId),
    getEarnedCareerBadgeKeys(supabase, userId),
  ]);
  const state = { currentLevel };
  const existingByKey = new Map(badges.map((badge) => [badge.badge_key, badge]));

  const allowedBadgeKeys = [...getLevelBadgeKeys(currentLevel), ...earnedCareerBadgeKeys];

  return allowedBadgeKeys
    .map((badgeKey, index) => {
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
    })
    .filter(
      (badge) =>
        badge.badge_key in CAREER_BADGE_DEFINITIONS || isBadgeEarnedByCurrentState(badge.badge_key, state)
    );
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
