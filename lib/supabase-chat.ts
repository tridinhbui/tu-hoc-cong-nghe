import { createClient } from "@/lib/supabase";

export interface ChatMessage {
  id: number;
  user_id: string;
  sender: "user" | "admin";
  content: string;
  read: boolean;
  created_at: string;
}

// PGRST205 = table not found in schema cache (migration not run yet on this Supabase project)
function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205";
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
      console.error("Error fetching chat history:", error);
    }
    return [];
  }

  return data as ChatMessage[];
}

export async function sendMessage(
  userId: string,
  sender: "user" | "admin",
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .insert([{ user_id: userId, sender, content }])
    .select()
    .single();

  if (error) {
    if (!isMissingTableError(error)) {
      console.error("Error sending message:", error);
    }
    return null;
  }

  return data as ChatMessage;
}

export function subscribeToChatMessages(
  userId: string,
  onMessage: (message: ChatMessage) => void
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
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
