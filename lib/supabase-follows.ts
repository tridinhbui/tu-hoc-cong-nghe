import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import type { CommunityFeedPost, CommunityReactionSummary } from "@/lib/supabase-community";

// See supabase/migrations/20260822_user_follows.sql. Follow relationships
// are public (RLS allows any authenticated reader to select the whole
// table), same openness as the rest of FinSocial - there's no private
// account concept on this app.

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202";
}

export async function isFollowing(followerId: string, followedId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_follows")
    .select("follower_id")
    .eq("follower_id", followerId)
    .eq("followed_id", followedId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return false;
    throw handleSupabaseError(error);
  }
  return Boolean(data);
}

export async function followUser(followerId: string, followedId: string): Promise<void> {
  if (followerId === followedId) throw new Error("Không thể tự theo dõi chính mình.");
  const supabase = createClient();
  const { error } = await supabase.from("user_follows").insert({ follower_id: followerId, followed_id: followedId });
  // 23505 = already following - not an error, just a no-op retry.
  if (error && error.code !== "23505" && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export async function unfollowUser(followerId: string, followedId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("followed_id", followedId);
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export interface FollowCounts {
  followers: number;
  following: number;
}

export async function getFollowCounts(userId: string): Promise<FollowCounts> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_follow_counts", { p_user_id: userId }).maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return { followers: 0, following: 0 };
    throw handleSupabaseError(error);
  }
  return {
    followers: Number((data as { followers?: number } | null)?.followers ?? 0),
    following: Number((data as { following?: number } | null)?.following ?? 0),
  };
}

/** One person's own posts, for their profile wall
 *  (app/(app)/nguoi-hoc/[userId]/page.tsx). Same row shape as
 *  getCommunityFeed so the client can reuse the CommunityFeedPost type and
 *  existing post-card rendering - `is_following` is always false here since
 *  the RPC doesn't compute it (the wall's follow button lives once in the
 *  page header, not per-post). */
export async function getUserCommunityPosts(userId: string, limit = 20, beforeId?: number): Promise<CommunityFeedPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_user_community_posts", {
    p_user_id: userId,
    p_limit: limit,
    p_before_id: beforeId ?? null,
  });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as Array<Omit<CommunityFeedPost, "reaction_summary" | "is_following"> & { reaction_summary: CommunityReactionSummary[] | null }>).map(
    (post) => ({
      ...post,
      reaction_summary: Array.isArray(post.reaction_summary) ? post.reaction_summary : [],
      is_following: false,
    })
  );
}
