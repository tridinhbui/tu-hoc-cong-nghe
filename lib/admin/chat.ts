import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface ChatThread {
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export interface ChatThreadMessage {
  id: number;
  user_id: string;
  sender: "user" | "admin";
  content: string;
  read: boolean;
  created_at: string;
}

// Live 2-way chat (AdminChat widget) is a separate inbox from the async
// contact_messages feedback form. This groups chat_messages by user so an
// admin can see every conversation, not just one-way submissions.
export async function getChatThreads(): Promise<ChatThread[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, user_id, sender, content, read, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const byUser = new Map<string, ChatThreadMessage[]>();
  for (const row of data as ChatThreadMessage[]) {
    const list = byUser.get(row.user_id) ?? [];
    list.push(row);
    byUser.set(row.user_id, list);
  }

  const userIds = [...byUser.keys()];
  if (userIds.length === 0) return [];

  const { data: users } = await supabase
    .from("user_profiles")
    .select("id, email, full_name")
    .in("id", userIds);
  const userMap = new Map((users ?? []).map((u) => [u.id, u]));

  const threads: ChatThread[] = userIds.map((userId) => {
    const messages = byUser.get(userId)!;
    const last = messages[0];
    const unread = messages.filter((m) => m.sender === "user" && !m.read).length;
    const profile = userMap.get(userId);
    return {
      user_id: userId,
      user_name: profile?.full_name ?? null,
      user_email: profile?.email ?? null,
      last_message: last.content,
      last_message_at: last.created_at,
      unread_count: unread,
    };
  });

  return threads.sort((a, b) => (a.last_message_at < b.last_message_at ? 1 : -1));
}

export async function getChatThreadMessages(userId: string): Promise<ChatThreadMessage[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, user_id, sender, content, read, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as ChatThreadMessage[];
}

export async function sendAdminChatReply(userId: string, content: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("chat_messages")
    .insert({ user_id: userId, sender: "admin", content });
  if (error) throw new Error(error.message);
}

export async function markThreadRead(userId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("chat_messages")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("sender", "user")
    .eq("read", false);
  if (error) throw new Error(error.message);
}

export async function getUnreadChatCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("chat_messages")
    .select("*", { count: "exact", head: true })
    .eq("sender", "user")
    .eq("read", false);
  if (error) return 0;
  return count ?? 0;
}
