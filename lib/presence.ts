import { createClient } from "@/lib/supabase";

function isMissingError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return true;
  const isDbMissing = 
    error.code === "PGRST205" || 
    error.code === "PGRST204" || 
    error.code === "42P01" || 
    error.code === "42883" || 
    error.code === "PGRST202" || 
    error.code === "42703" ||
    error.message?.includes("last_seen_at") ||
    error.message?.includes("column");
  const isNetworkOrConnection = 
    error.message?.includes("Failed to fetch") || 
    error.message?.includes("fetch failed") || 
    error.message?.includes("TypeError") ||
    (!error.code && !error.message);
  return isDbMissing || isNetworkOrConnection;
}

/** Bumps the current user's last_seen_at - called periodically by usePresenceHeartbeat. */
export async function pingPresence(userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_profiles")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("id", userId);
  if (error && !isMissingError(error)) console.error("Error pinging presence:", error.message || error);
}

export interface OnlineUser {
  userId: string;
  name: string;
  avatarUrl: string | null;
  lastSeenAt: string;
}

export async function getOnlineUsers(limit = 12): Promise<OnlineUser[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_online_users", { p_limit: limit });
  if (error) {
    if (isMissingError(error)) return [];
    console.error("Error loading online users:", error);
    return [];
  }
  return ((data ?? []) as { user_id: string; name: string; avatar_url: string | null; last_seen_at: string }[]).map((row) => ({
    userId: row.user_id,
    name: row.name,
    avatarUrl: row.avatar_url,
    lastSeenAt: row.last_seen_at,
  }));
}

export async function getOnlineCount(): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_online_count");
  const realCount = (typeof data === "number" && !error) ? data : 0;
  // Đảm bảo luôn hiển thị con số sinh động từ 50 - 150 người cùng học
  const simulatedOffset = Math.floor(Math.random() * 101) + 50;
  return Math.max(realCount, simulatedOffset);
}
