import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

export interface ChatMessage {
  id: number;
  user_id: string;
  sender: "user" | "admin";
  content: string;
  image_url: string | null;
  read: boolean;
  created_at: string;
}

// PGRST205 = table not found in schema cache (migration not run yet on this Supabase project)
function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205";
}

// PGRST202 = RPC not found in schema cache (reaction migration not run yet)
function isMissingFunctionError(error: { code?: string } | null) {
  return error?.code === "PGRST202" || error?.code === "42883";
}

// image_url column not migrated yet on this environment - retry without it
// rather than failing the whole read/write.
function isMissingColumnError(error: { code?: string } | null) {
  return error?.code === "42703" || error?.code === "PGRST204";
}

const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB - generous for a screenshot, small enough to not stall the chat

export function isAllowedChatImage(file: File): string | null {
  if (!IMAGE_MIME_TYPES.has(file.type)) return "Chỉ chấp nhận ảnh PNG, JPG, WEBP hoặc GIF.";
  if (file.size > MAX_IMAGE_SIZE) return "Ảnh vượt quá giới hạn 8MB.";
  return null;
}

export async function uploadChatImage(userId: string, file: File): Promise<string> {
  const invalidReason = isAllowedChatImage(file);
  if (invalidReason) throw new Error(invalidReason);

  const supabase = createClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("chat-images")
    .upload(path, file, { contentType: file.type || "image/png" });
  if (error) throw handleSupabaseError(error);

  const { data } = supabase.storage.from("chat-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function getChatHistory(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return [];
  }

  return data as ChatMessage[];
}

export async function sendMessage(
  userId: string,
  sender: "user" | "admin",
  content: string,
  imageUrl?: string | null
) {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("chat_messages")
    .insert([{ user_id: userId, sender, content, image_url: imageUrl ?? null }])
    .select()
    .single();

  if (error && isMissingColumnError(error)) {
    ({ data, error } = await supabase
      .from("chat_messages")
      .insert([{ user_id: userId, sender, content }])
      .select()
      .single());
  }

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return null;
  }

  return data as ChatMessage;
}

export async function deleteChatMessage(messageId: number, userId: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("chat_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return false;
  }
  return true;
}

export async function updateChatMessage(messageId: number, content: string): Promise<ChatMessage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .update({ content })
    .eq("id", messageId)
    .select()
    .single();

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return null;
  }

  return data as ChatMessage;
}
export type ChatReactionMap = Record<number, Record<string, string[]>>;

function groupReactionRows(rows: unknown): ChatReactionMap {
  const grouped: ChatReactionMap = {};
  for (const row of (rows ?? []) as { message_id: number; emoji: string; user_ids: string[] }[]) {
    grouped[row.message_id] ??= {};
    grouped[row.message_id][row.emoji] = row.user_ids ?? [];
  }
  return grouped;
}

export async function getChatReactions(userId: string): Promise<ChatReactionMap> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_chat_message_reactions", { p_user_id: userId });
  if (error) {
    // Migration not applied yet on this environment - reactions degrade to
    // absent rather than breaking the whole conversation load.
    if (!isMissingTableError(error) && !isMissingFunctionError(error)) {
      throw handleSupabaseError(error);
    }
    return {};
  }
  return groupReactionRows(data);
}

export async function toggleChatReaction(messageId: number, emoji: string): Promise<ChatReactionMap | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("toggle_chat_message_reaction", {
    p_message_id: messageId,
    p_emoji: emoji,
  });
  if (error) {
    if (!isMissingTableError(error) && !isMissingFunctionError(error)) {
      throw handleSupabaseError(error);
    }
    return null;
  }
  return groupReactionRows(data);
}


// Fires on new messages, updates, and DELETE events (when a message is recalled)
export function subscribeToChatMessages(
  userId: string,
  onMessage: (message: ChatMessage) => void,
  onDelete?: (messageId: number) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`chat_messages:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onMessage(payload.new as ChatMessage);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "chat_messages",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onMessage(payload.new as ChatMessage);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "chat_messages",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        if (onDelete && payload.old && (payload.old as { id?: number }).id) {
          onDelete((payload.old as { id: number }).id);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// Marks the admin's messages in this user's thread as seen. Best-effort: the
// RPC is restricted to auth.uid() = userId, so this is only ever called for
// the signed-in user's own thread.
export async function markMessagesSeenByUser(userId: string) {
  const supabase = createClient();
  const { error } = await supabase.rpc("mark_admin_chat_messages_seen", { p_user_id: userId });
  if (error) console.error("Error marking admin messages as seen:", error);
}
