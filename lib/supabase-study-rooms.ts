import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

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
  return data as StudyRoomMessage;
}

export function subscribeToRoomMessages(roomId: number, onMessage: (message: StudyRoomMessage) => void) {
  const supabase = createClient();

  const channel = supabase
    .channel(`study_room_messages:${roomId}`)
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
