import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

let studyRoomRealtimeSubscriptionSeq = 0;

export type StudyRoomTopic = "personal" | "professional" | "cfa";

export const STUDY_ROOM_TOPICS: { id: StudyRoomTopic; label: string }[] = [
  { id: "personal", label: "Tài chính cá nhân" },
  { id: "professional", label: "Tài chính chuyên ngành" },
  { id: "cfa", label: "CFA Level I" },
];

export interface StudyRoomSummary {
  room_id: number;
  topic: StudyRoomTopic;
  member_count: number;
  max_members: number;
  weekly_xp_goal: number;
  weekly_xp_progress: number;
  created_at: string;
}

export interface StudyRoomMember {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_level: number;
  total_xp: number;
  weekly_lessons: number;
}

export interface StudyRoomMessage {
  id: number;
  room_id: number;
  sender_id: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  is_bot: boolean;
  is_pinned: boolean;
}

const STUDY_ROOM_BOT_COMMANDS = new Set(["/taitai", "/tai", "/bot", "/rules", "/luat"]);

function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883";
}

/** Random-matches the caller into an open room for this topic (or creates a
 *  new one if every existing room is full). Leaves whatever room they were
 *  previously in first - see the migration's one-active-room-at-a-time rule. */
export async function joinOrCreateStudyRoom(topic: StudyRoomTopic): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("join_or_create_study_room", { p_topic: topic });
  if (error) throw handleSupabaseError(error);
  return data as number;
}

/** Joins a specific room picked from the browse list, instead of random matching. */
export async function joinStudyRoom(roomId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("join_study_room", { p_room_id: roomId });
  if (error) throw handleSupabaseError(error);
}

export async function leaveStudyRoom(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("leave_study_room");
  if (error) throw handleSupabaseError(error);
}

export async function getStudyRooms(topic?: StudyRoomTopic): Promise<StudyRoomSummary[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_study_rooms", { p_topic: topic ?? null });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomSummary[];
}

export async function getMyStudyRoom(): Promise<StudyRoomSummary | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_study_room");
  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  const rows = (data ?? []) as StudyRoomSummary[];
  return rows[0] ?? null;
}

export async function getStudyRoomMembers(roomId: number): Promise<StudyRoomMember[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_study_room_members", { p_room_id: roomId });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomMember[];
}

// Group chat - same shape as lib/supabase-social.ts's direct-message
// functions, keyed by room_id instead of friendship_id. RLS restricts
// read/insert to current (not-left) members of the room, see
// supabase/migrations/20260719_study_room_weekly_match_and_chat.sql.
export async function getRoomMessages(roomId: number): Promise<StudyRoomMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("study_room_messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomMessage[];
}

export async function sendRoomMessage(
  roomId: number,
  senderId: string,
  content: string,
  imageUrl?: string | null
): Promise<StudyRoomMessage> {
  const supabase = createClient();
  const insertPayload: any = {
    room_id: roomId,
    sender_id: senderId,
    content: content.trim()
  };
  if (imageUrl) {
    insertPayload.image_url = imageUrl;
  }
  const { data, error } = await supabase
    .from("study_room_messages")
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);

  if (typeof window !== "undefined") {
    const todayKey = new Date().toISOString().split("T")[0];
    const checkinKey = `study_group_checkin_${senderId}_${todayKey}`;
    localStorage.setItem(checkinKey, "true");
    window.dispatchEvent(new CustomEvent("thtcdn:study-group-checkin", { detail: { senderId, dayKey: todayKey } }));
  }

  return data as StudyRoomMessage;
}

export function isStudyRoomBotCommand(input: string): boolean {
  return STUDY_ROOM_BOT_COMMANDS.has(input.trim().toLowerCase());
}

export async function requestStudyRoomBot(roomId: number, command: string): Promise<StudyRoomMessage> {
  const response = await fetch("/api/study-room-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, command }),
  });

  const payload = (await response.json().catch(() => null)) as { message?: StudyRoomMessage; error?: string } | null;
  if (!response.ok || !payload?.message) {
    throw new Error(payload?.error || "Không gọi được Tài Tài lúc này");
  }

  return payload.message;
}

export function subscribeToRoomMessages(roomId: number, onMessage: (message: StudyRoomMessage) => void) {
  const supabase = createClient();
  const channelName = `study_room_messages:${roomId}:${++studyRoomRealtimeSubscriptionSeq}`;

  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "study_room_messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => onMessage(payload.new as StudyRoomMessage)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
