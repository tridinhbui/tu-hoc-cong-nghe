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
