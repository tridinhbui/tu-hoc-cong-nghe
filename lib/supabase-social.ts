import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { uniqueRealtimeTopic } from "@/lib/supabase-realtime-topic";

export interface SearchAccountResult {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_level: number;
  total_xp: number;
}

export type FriendshipStatus = "pending" | "accepted" | "rejected";
export type FriendshipDirection = "incoming" | "outgoing" | "friend";

export interface SocialConnection {
  friendship_id: number;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_level: number;
  total_xp: number;
  status: FriendshipStatus;
  requested_by: string;
  created_at: string;
  updated_at: string;
  responded_at: string | null;
  direction: FriendshipDirection;
}

export interface DirectMessage {
  id: number;
  friendship_id: number;
  sender_id: string;
  content: string;
  read_by_recipient: boolean;
  created_at: string;
}

function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

function canonicalizePair(userId: string, otherUserId: string) {
  return userId < otherUserId
    ? { user_a: userId, user_b: otherUserId }
    : { user_a: otherUserId, user_b: userId };
}

export async function searchAccounts(searchTerm: string, limit = 8): Promise<SearchAccountResult[]> {
  const supabase = createClient();
  const trimmed = searchTerm.trim();
  if (trimmed.length < 2) return [];

  const { data, error } = await supabase.rpc("search_accounts", {
    search_term: trimmed,
    result_limit: limit,
  });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (data ?? []) as SearchAccountResult[];
}

export async function getMySocialGraph(): Promise<SocialConnection[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_social_graph");

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (data ?? []) as SocialConnection[];
}

/** Số lời mời kết bạn đang chờ MÌNH trả lời.
 *
 *  Đây là con số chưa từng hiện ở đâu trên giao diện. Trang Bạn bè chỉ tới
 *  được từ menu, và không nút nổi nào ở góc nói rằng có người vừa gửi lời
 *  mời - nên nó im lặng theo đúng nghĩa đen, và đó là lỗi người dùng báo.
 *
 *  Chỉ đếm chiều "incoming": lời mời mình gửi đi thì mình biết rồi, và đếm cả
 *  hai chiều sẽ báo một việc mà người dùng mở ra không làm gì được. */
export async function getPendingFriendRequestCount(): Promise<number> {
  const connections = await getMySocialGraph();
  return connections.filter((c) => c.status === "pending" && c.direction === "incoming").length;
}

/** Số tin nhắn riêng chưa đọc, gộp mọi cuộc trò chuyện.
 *
 *  Nuôi huy hiệu của nút Kết nối. Trước đây huy hiệu chỉ đếm lời mời kết bạn,
 *  trong khi dòng menu ngay bên cạnh ghi phụ đề "lời mời và tin nhắn riêng" -
 *  nên tin nhắn riêng im lặng đúng như lời mời từng im lặng.
 *
 *  Lọc theo tập tình bạn của mình chứ không dựa vào RLS làm bộ lọc: RLS đã
 *  chặn đúng, nhưng một truy vấn `count` không có `in()` sẽ quét cả bảng rồi
 *  mới lọc, và số đó lớn dần theo toàn hệ thống chứ không theo số bạn của một
 *  người.
 *
 *  `sender_id != mình` là phần không thể bỏ: cờ `read_by_recipient` chỉ có
 *  nghĩa với tin NGƯỜI KHÁC gửi, còn tin mình vừa gửi thì cờ vẫn false cho tới
 *  khi bên kia đọc - thiếu điều kiện này thì gửi tin cho bạn là tự bật huy
 *  hiệu của chính mình. */
export async function getUnreadDirectMessageCount(userId: string): Promise<number> {
  const connections = await getMySocialGraph();
  const friendshipIds = connections.filter((c) => c.status === "accepted").map((c) => c.friendship_id);
  if (friendshipIds.length === 0) return 0;

  const supabase = createClient();
  const { count, error } = await supabase
    .from("direct_messages")
    .select("id", { count: "exact", head: true })
    .in("friendship_id", friendshipIds)
    .eq("read_by_recipient", false)
    .neq("sender_id", userId);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }
  return count ?? 0;
}

/** Đánh dấu đã đọc mọi tin của ĐỐI PHƯƠNG trong một cuộc trò chuyện.
 *
 *  Gọi lúc mở cuộc trò chuyện ra. Chỉ lật cờ, và policy cùng trigger ở
 *  20260910_direct_message_read_state.sql giữ cho nó không làm được gì khác -
 *  Postgres không giới hạn UPDATE theo cột trong policy được, nên phần đó nằm
 *  ở trigger.
 *
 *  Nuốt lỗi thay vì ném: đây là việc phụ chạy kèm lúc mở hộp thoại, và một
 *  môi trường chưa chạy migration thì đáng để huy hiệu sai hơn là để cả khung
 *  chat không mở được. */
export async function markDirectMessagesRead(friendshipId: number, userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("direct_messages")
    .update({ read_by_recipient: true })
    .eq("friendship_id", friendshipId)
    .eq("read_by_recipient", false)
    .neq("sender_id", userId);
  if (error && !isMissingTableError(error)) {
    console.warn("markDirectMessagesRead:", error.message);
  }
}

export async function sendFriendRequest(currentUserId: string, targetUserId: string) {
  const supabase = createClient();
  const pair = canonicalizePair(currentUserId, targetUserId);

  const { data: existing, error: existingError } = await supabase
    .from("user_friendships")
    .select("*")
    .eq("user_a", pair.user_a)
    .eq("user_b", pair.user_b)
    .maybeSingle();

  if (existingError && !isMissingTableError(existingError)) {
    throw handleSupabaseError(existingError);
  }

  const now = new Date().toISOString();

  if (existing) {
    if (existing.status === "accepted") return existing;

    const updatePatch =
      existing.status === "pending" && existing.requested_by !== currentUserId
        ? {
            status: "accepted" as const,
            updated_at: now,
            responded_at: now,
          }
        : {
            status: "pending" as const,
            requested_by: currentUserId,
            updated_at: now,
            responded_at: null,
          };

    const { data, error } = await supabase
      .from("user_friendships")
      .update(updatePatch)
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw handleSupabaseError(error);
    return data;
  }

  const { data, error } = await supabase
    .from("user_friendships")
    .insert({
      ...pair,
      requested_by: currentUserId,
      status: "pending",
      updated_at: now,
    })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data;
}

export async function respondToFriendRequest(friendshipId: number, status: "accepted" | "rejected") {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_friendships")
    .update({
      status,
      updated_at: now,
      responded_at: now,
    })
    .eq("id", friendshipId)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data;
}

export async function getDirectMessages(friendshipId: number): Promise<DirectMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("direct_messages")
    .select("*")
    .eq("friendship_id", friendshipId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (data ?? []) as DirectMessage[];
}

export async function sendDirectMessage(friendshipId: number, senderId: string, content: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("direct_messages")
    .insert({
      friendship_id: friendshipId,
      sender_id: senderId,
      content: content.trim(),
    })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data as DirectMessage;
}

export function subscribeToSocialGraph(userId: string, onChange: () => void) {
  const supabase = createClient();

  const channel = supabase
    .channel(uniqueRealtimeTopic(`social_graph:${userId}`))
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "user_friendships",
        filter: `user_a=eq.${userId}`,
      },
      onChange
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "user_friendships",
        filter: `user_b=eq.${userId}`,
      },
      onChange
    )
    // Tin nhắn riêng, KHÔNG lọc theo friendship_id. Huy hiệu cần biết có tin
    // mới ở BẤT KỲ cuộc trò chuyện nào, mà `postgres_changes` chỉ lọc được
    // theo một cột bằng một giá trị - đăng ký một kênh cho mỗi người bạn thì
    // số kênh lớn dần theo danh sách bạn bè.
    //
    // Realtime áp RLS cho từng người đăng ký, và direct_messages có policy
    // SELECT giới hạn trong tình bạn của chính mình, nên không lọc ở đây
    // không có nghĩa là nhận tin của người lạ.
    //
    // Cả INSERT lẫn UPDATE: INSERT làm huy hiệu sáng, còn UPDATE là lúc
    // markDirectMessagesRead lật cờ - thiếu nó thì huy hiệu chỉ tắt sau khi
    // tải lại trang.
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "direct_messages" },
      onChange
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "direct_messages" },
      onChange
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToDirectMessages(friendshipId: number, onMessage: (message: DirectMessage) => void) {
  const supabase = createClient();

  const channel = supabase
    .channel(uniqueRealtimeTopic(`direct_messages:${friendshipId}`))
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "direct_messages",
        filter: `friendship_id=eq.${friendshipId}`,
      },
      (payload) => onMessage(payload.new as DirectMessage)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
