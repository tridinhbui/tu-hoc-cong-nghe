import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface ContactMessage {
  id: number;
  user_id: string | null;
  name: string;
  email: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface MessagesQuery {
  search?: string;
  filter?: "all" | "read" | "unread";
  page?: number;
  pageSize?: number;
}

export interface MessagesResult {
  messages: ContactMessage[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getMessages(query: MessagesQuery = {}): Promise<MessagesResult> {
  const { search = "", filter = "all", page = 1, pageSize = 20 } = query;
  const supabase = createAdminClient();

  let q = supabase.from("contact_messages").select("*", { count: "exact" });

  if (filter === "read") q = q.eq("is_read", true);
  if (filter === "unread") q = q.eq("is_read", false);
  if (search.trim()) {
    q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await q
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching contact messages:", error);
    return { messages: [], total: 0, page, pageSize, totalPages: 0 };
  }

  const total = count ?? 0;
  return {
    messages: (data as ContactMessage[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function markMessageRead(id: number, isRead: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteMessage(id: number) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getUnreadMessageCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);
  if (error) return 0;
  return count ?? 0;
}
