import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { uniqueRealtimeTopic } from "@/lib/supabase-realtime-topic";
import { createCoalescer } from "@/lib/coalesced-refresh";

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
  /** Whether the viewer already follows this post's author (see
   *  supabase/migrations/20260822_user_follows.sql). Always `false` on rows
   *  from getUserCommunityPosts (a profile wall) - that function doesn't
   *  compute it, since the follow button there lives once in the page
   *  header, not per-post. */
  is_following: boolean;
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
//
// CHI PHÍ. Ba kênh này là những kênh realtime DUY NHẤT trong repo không có
// `filter`, và đúng là chúng không thể có: feed là chung. Nhưng cả ba gọi cùng
// một `onChange()` không mang payload, còn bên nhận thì tải lại TOÀN BỘ feed
// cộng một truy vấn bình luận cho mỗi thread đang mở. Nên một người thả cảm
// xúc ở bất kỳ đâu làm MỌI người đang mở /finsocial chạy một truy vấn feed.
// Phần đắt không phải message realtime mà là số truy vấn và lượng dữ liệu ra.
//
// Hai chỗ cắt ở đây, không chỗ nào đổi thứ người dùng nhìn thấy:
//
// 1. Bỏ UPDATE trên bảng cảm xúc. Người khác chỉ thấy `reaction_count`; đổi
//    cảm xúc từ 💡 sang 🔥 là một UPDATE không làm số đó nhúc nhích, nên nó
//    từng kích hoạt một lần tải lại toàn feed cho mọi người xem để dựng lại
//    đúng những con số cũ. INSERT và DELETE thì có đổi số đếm nên vẫn giữ.
//
//    Bình luận thì GIỮ nguyên `*`: sửa nội dung một bình luận có đổi chữ trong
//    thread đang mở, và bên nhận có tải lại các thread đó.
//
// 2. Gộp và hoãn khi tab bị ẩn - xem lib/coalesced-refresh.ts.
const FEED_REFRESH_WINDOW_MS = 1200;

export function subscribeToCommunityFeed(onChange: () => void) {
  const supabase = createClient();
  const coalescer = createCoalescer(onChange, { windowMs: FEED_REFRESH_WINDOW_MS });
  const fire = () => coalescer.trigger();

  const channel = supabase
    .channel(uniqueRealtimeTopic("community_feed_live"))
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "community_posts" },
      fire
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "community_post_reactions" },
      fire
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "community_post_reactions" },
      fire
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "community_post_comments" },
      fire
    )
    .subscribe();

  const onVisibility = () => coalescer.onVisible();
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", onVisibility);
  }

  return () => {
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", onVisibility);
    }
    coalescer.cancel();
    supabase.removeChannel(channel);
  };
}

// ─── Notifications ─────────────────────────────────────────────────────
//
// See supabase/migrations/20260821_community_notifications.sql. Rows are
// only ever created by a database trigger (on comment/reaction insert), not
// by the client - so there is no createNotification() here on purpose.

/** Hai loại đầu đến từ FinSocial và luôn có `actor_id` + `post_id`. Ba loại
 *  sau đến từ thao tác của admin (duyệt/từ chối khiếu nại, đóng báo lỗi AI)
 *  và luôn có `lesson_slug` thay vào đó - xem ràng buộc `_shape_check` trong
 *  migration 20260901_learner_feedback_notifications.sql, nơi hình dạng này
 *  được ép ở tầng cơ sở dữ liệu chứ không chỉ ở kiểu TypeScript. */
export type CommunityNotificationType =
  | "comment"
  | "reaction"
  | "appeal_approved"
  | "appeal_rejected"
  | "ai_report_resolved";

export interface CommunityNotification {
  id: number;
  actor_id: string | null;
  actor_name: string;
  actor_avatar: string | null;
  type: CommunityNotificationType;
  post_id: number | null;
  comment_id: number | null;
  emoji: string | null;
  lesson_slug: string | null;
  /** Ghi chú admin, chỉ có ở `appeal_rejected`. */
  detail: string | null;
  created_at: string;
  read_at: string | null;
}

interface CommunityNotificationRow {
  id: number;
  actor_id: string | null;
  type: CommunityNotificationType;
  post_id: number | null;
  comment_id: number | null;
  emoji: string | null;
  lesson_slug: string | null;
  detail: string | null;
  created_at: string;
  read_at: string | null;
  actor: { full_name: string | null; avatar_url: string | null } | null;
}

/* i18n-ignore-start: danh sách CỘT gửi cho Supabase, không phải chữ. */
const NOTIFICATION_SELECT_BASE =
  "id, actor_id, type, post_id, comment_id, emoji, created_at, read_at, actor:actor_id(full_name, avatar_url)";
/* i18n-ignore-end */
const NOTIFICATION_SELECT = `${NOTIFICATION_SELECT_BASE}, lesson_slug, detail`;

/** `lesson_slug`/`detail` đến từ migration 20260901. Môi trường chưa chạy nó
 *  sẽ trả 42703 (undefined_column), và PostgREST đổi thành PGRST204 - cùng
 *  cách phân biệt mà lib/admin/ai-reports.ts đã dùng cho `report_status`. */
function isMissingNotificationColumn(error: { code?: string } | null): boolean {
  return error?.code === "42703" || error?.code === "PGRST204";
}

export async function getNotifications(userId: string, limit = 20): Promise<CommunityNotification[]> {
  const supabase = createClient();
  const query = (select: string) =>
    supabase
      .from("community_notifications")
      .select(select)
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

  let { data, error } = await query(NOTIFICATION_SELECT);

  // Rơi về tập cột cũ thay vì làm rỗng cả chuông: trước khi migration được
  // chạy, thông báo comment/reaction vẫn phải hiện bình thường. Chúng không
  // dùng hai cột mới, nên mất cột không đồng nghĩa mất dữ liệu.
  if (error && isMissingNotificationColumn(error)) {
    ({ data, error } = await query(NOTIFICATION_SELECT_BASE));
  }

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as unknown as CommunityNotificationRow[]).map((row) => ({
    id: row.id,
    actor_id: row.actor_id,
    // Rỗng chứ không phải tên tiếng Việt viết cứng - xem lib/public-user-profile.ts.
    actor_name: row.actor?.full_name || "",
    actor_avatar: row.actor?.avatar_url ?? null,
    type: row.type,
    post_id: row.post_id,
    comment_id: row.comment_id,
    emoji: row.emoji,
    lesson_slug: row.lesson_slug ?? null,
    detail: row.detail ?? null,
    created_at: row.created_at,
    read_at: row.read_at,
  }));
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("community_notifications")
    .select("id", { count: "exact", head: true })
    .eq("recipient_id", userId)
    .is("read_at", null);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }
  return count ?? 0;
}

/** Marks specific notifications read, or every unread one if `ids` is
 *  omitted (the "mark all as read" case - opening the bell dropdown). */
export async function markNotificationsRead(userId: string, ids?: number[]): Promise<void> {
  const supabase = createClient();
  let query = supabase
    .from("community_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", userId)
    .is("read_at", null);

  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  const { error } = await query;
  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export function subscribeToCommunityNotifications(userId: string, onChange: () => void) {
  const supabase = createClient();
  const channel = supabase
    .channel(uniqueRealtimeTopic(`community_notifications:${userId}`))
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "community_notifications", filter: `recipient_id=eq.${userId}` },
      () => onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
