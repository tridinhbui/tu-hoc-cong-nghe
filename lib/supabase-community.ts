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
  /** Null until the author edits the post. Drives the "đã chỉnh sửa" marker. */
  edited_at: string | null;
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
  edited_at: string | null;
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

export async function createManualPost(
  userId: string,
  content: string,
  imageUrl?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  const trimmed = content.trim();
  if (!trimmed && !imageUrl) throw new Error("Bài viết phải có nội dung hoặc hình ảnh.");
  if (trimmed.length > 500) throw new Error("Nội dung tối đa 500 ký tự.");

  const supabase = createClient();

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

  const payload: Record<string, unknown> = {
    user_id: userId,
    kind: "manual",
    content: trimmed,
  };
  if (imageUrl || metadata) {
    payload.metadata = { ...(metadata ?? {}), ...(imageUrl ? { image_url: imageUrl } : {}) };
  }

  const { error } = await supabase.from("community_posts").insert(payload);

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

export const MANUAL_POST_MAX_LENGTH = 500;
export const COMMENT_MAX_LENGTH = 300;

/** True if this post is one the current user is allowed to edit.
 *
 *  Mirrors the RLS policy in 20260819_community_edit_own_content.sql rather
 *  than being the security boundary itself - the database is. This exists so
 *  the UI can hide a button that would fail, not to decide who may edit. */
export function canEditPost(post: Pick<CommunityFeedPost, "user_id" | "kind">, userId: string | null): boolean {
  return Boolean(userId) && post.user_id === userId && post.kind === "manual";
}

/** Edits the text of one's own manual post. `edited_at` is stamped here so
 *  the feed can mark the post as changed - readers who already reacted
 *  deserve to see that the text moved under them. */
export async function updateOwnPost(postId: number, content: string): Promise<void> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Nội dung không được để trống.");
  if (trimmed.length > MANUAL_POST_MAX_LENGTH) {
    throw new Error(`Nội dung tối đa ${MANUAL_POST_MAX_LENGTH} ký tự.`);
  }

  const supabase = createClient();
  // No .eq("user_id", ...) or kind filter here on purpose: RLS already
  // restricts this to the author's own manual, non-hidden posts, and
  // duplicating the rule in the client would just be a second copy to drift.
  const { data, error } = await supabase
    .from("community_posts")
    .update({ content: trimmed, edited_at: new Date().toISOString() })
    .eq("id", postId)
    .select("id");

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
  // RLS refusals are not errors - they simply match zero rows. Without this
  // check a blocked edit would look like a success and the UI would show the
  // new text until the next reload silently reverted it.
  if (!data || data.length === 0) {
    throw new Error("Không sửa được bài viết này. Chỉ bài bạn tự đăng mới có thể chỉnh sửa.");
  }
}

export async function updateOwnComment(commentId: number, content: string): Promise<void> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Nội dung không được để trống.");
  if (trimmed.length > COMMENT_MAX_LENGTH) {
    throw new Error(`Bình luận tối đa ${COMMENT_MAX_LENGTH} ký tự.`);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("community_post_comments")
    .update({ content: trimmed, edited_at: new Date().toISOString() })
    .eq("id", commentId)
    .select("id");

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
  if (!data || data.length === 0) {
    throw new Error("Không sửa được bình luận này.");
  }
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
