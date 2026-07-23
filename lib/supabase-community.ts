import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202";
}

export type CommunityPostKind = "streak" | "manual";

export interface CommunityFeedPost {
  id: number;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  kind: CommunityPostKind;
  content: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  reaction_count: number;
  my_reaction: string | null;
  comment_count: number;
  reaction_summary: CommunityReactionSummary[];
}

export interface CommunityReactionSummary {
  emoji: string;
  count: number;
}

export interface CommunityPostComment {
  id: number;
  post_id: number;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  content: string;
  created_at: string;
}

export async function getCommunityFeed(beforeId?: number, limit = 20): Promise<CommunityFeedPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_community_feed", {
    p_limit: limit,
    p_before_id: beforeId ?? null,
  });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as Array<Omit<CommunityFeedPost, "reaction_summary"> & { reaction_summary: CommunityReactionSummary[] | null }>).map(
    (post) => ({
      ...post,
      reaction_summary: Array.isArray(post.reaction_summary) ? post.reaction_summary : [],
    })
  );
}

const MANUAL_POST_COOLDOWN_MINUTES = 60;

export async function createManualPost(userId: string, content: string): Promise<void> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Nội dung không được để trống.");
  if (trimmed.length > 500) throw new Error("Nội dung tối đa 500 ký tự.");

  const supabase = createClient();

  // Simple client-enforced rate limit (best-effort, not a hard security
  // boundary) to keep the feed from being spammed - mirrors the cooldown
  // pattern already used for reminder emails, just per-user/short-lived
  // instead of server-tracked, since a public feed post is low-stakes.
  const cutoff = new Date(Date.now() - MANUAL_POST_COOLDOWN_MINUTES * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("community_posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("kind", "manual")
    .gte("created_at", cutoff);

  if ((count ?? 0) > 0) {
    throw new Error(`Bạn chỉ có thể đăng tối đa 1 bài mỗi ${MANUAL_POST_COOLDOWN_MINUTES} phút.`);
  }

  const { error } = await supabase.from("community_posts").insert({
    user_id: userId,
    kind: "manual",
    content: trimmed,
  });

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
}

export async function deleteOwnPost(postId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("community_posts").delete().eq("id", postId);
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export async function reactToPost(postId: number, userId: string, emoji = "👍"): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("community_post_reactions")
    .upsert({ post_id: postId, user_id: userId, emoji }, { onConflict: "post_id,user_id" });
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export async function removeReaction(postId: number, userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("community_post_reactions")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export async function getCommunityPostComments(postId: number, limit = 30): Promise<CommunityPostComment[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_community_post_comments", {
    p_post_id: postId,
    p_limit: limit,
  });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (data ?? []) as CommunityPostComment[];
}

export async function createComment(postId: number, userId: string, content: string): Promise<void> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Bình luận không được để trống.");
  if (trimmed.length > 300) throw new Error("Bình luận tối đa 300 ký tự.");

  const supabase = createClient();
  const { error } = await supabase.from("community_post_comments").insert({
    post_id: postId,
    user_id: userId,
    content: trimmed,
  });

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
}

export async function deleteOwnComment(commentId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("community_post_comments").delete().eq("id", commentId);
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

// Same channel-naming/cleanup pattern as subscribeToRoomMessages in
// lib/supabase-study-rooms.ts, unfiltered since this feed has no single
// scope id - every signed-in client gets every new post.
export function subscribeToCommunityFeed(onChange: () => void) {
  const supabase = createClient();
  const channel = supabase
    .channel("community_feed_live")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "community_posts" },
      () => onChange()
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "community_post_reactions" },
      () => onChange()
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "community_post_comments" },
      () => onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
