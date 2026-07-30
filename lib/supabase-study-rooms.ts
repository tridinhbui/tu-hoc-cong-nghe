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
  /** Id of the message this one replies to, or null. Resolved against the
   *  loaded list at render time rather than copied into `content`, so an edit
   *  or deletion of the original is reflected in every quote of it. */
  reply_to_id: number | null;
}

export interface StudyRoomMission {
  mission_key: "lessons" | "quizzes" | "checkins";
  title: string;
  description: string;
  current_value: number;
  target_value: number;
  completed: boolean;
  streak_weeks: number;
  is_permanent: boolean;
  reward_claimed: boolean;
  leader_id: string | null;
}

export interface StudyRoomNote {
  id: number;
  room_id: number;
  author_id: string;
  content: string;
  color: string;
  created_at: string;
  author_name?: string | null;
}

export interface StudyRoomPomodoro {
  room_id: number;
  mode: "focus" | "break";
  is_running: boolean;
  duration_seconds: number;
  remaining_seconds: number;
  started_at: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface StudyRoomQuizAttempt {
  id: number;
  room_id: number;
  user_id: string;
  track: string;
  score: number;
  total: number;
  percent: number;
  created_at: string;
}

export interface StudyRoomRewardClaimResult {
  ok: boolean;
  message: string;
  streak_weeks: number;
  is_permanent: boolean;
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
/** How many messages one page of chat history holds. */
export const ROOM_MESSAGE_PAGE_SIZE = 50;

/** The most recent page of a room's messages, oldest-first for rendering.
 *
 *  Previously this selected every message a room had ever produced with no
 *  limit, so an active room re-downloaded thousands of rows on every mount.
 *  Pass `beforeId` to walk backwards through history (see the "load older"
 *  handler in StudyGroupsClient). */
export async function getRoomMessages(
  roomId: number,
  beforeId?: number,
  limit = ROOM_MESSAGE_PAGE_SIZE
): Promise<StudyRoomMessage[]> {
  const supabase = createClient();
  // Ordered descending to take the *newest* page, then flipped for display -
  // ascending + limit would return the oldest messages instead.
  let query = supabase
    .from("study_room_messages")
    .select("*")
    .eq("room_id", roomId)
    .order("id", { ascending: false })
    .limit(limit);

  if (beforeId !== undefined) {
    query = query.lt("id", beforeId);
  }

  const { data, error } = await query;

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return ((data ?? []) as StudyRoomMessage[]).reverse();
}

/** The room's pinned message, fetched independently of the history page.
 *
 *  A pin is pinned precisely because it should stay visible, and it is often
 *  old - so it frequently falls outside the newest page. Without this it
 *  would silently vanish from the banner as soon as a room got chatty. */
export async function getPinnedRoomMessage(roomId: number): Promise<StudyRoomMessage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("study_room_messages")
    .select("*")
    .eq("room_id", roomId)
    .eq("is_pinned", true)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  return (data as StudyRoomMessage) ?? null;
}

export async function sendRoomMessage(
  roomId: number,
  senderId: string,
  content: string,
  imageUrl?: string | null,
  replyToId?: number | null
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
  if (replyToId) {
    insertPayload.reply_to_id = replyToId;
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

  void recordStudyRoomCheckin(roomId, "chat").catch(() => {});

  return data as StudyRoomMessage;
}

export async function recordStudyRoomCheckin(roomId: number, source = "chat"): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("record_study_room_checkin", { p_room_id: roomId, p_source: source });
  if (error) {
    if (isMissingTableError(error)) return false;
    throw handleSupabaseError(error);
  }
  return Boolean(data);
}

export async function getStudyRoomMissions(roomId: number): Promise<StudyRoomMission[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_study_room_mission_status", { p_room_id: roomId });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomMission[];
}

export async function claimStudyRoomWeeklyReward(roomId: number): Promise<StudyRoomRewardClaimResult> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("claim_study_room_weekly_reward", { p_room_id: roomId });
  if (error) throw handleSupabaseError(error);
  const rows = (data ?? []) as StudyRoomRewardClaimResult[];
  return rows[0] ?? { ok: false, message: "Không nhận được phản hồi từ máy chủ.", streak_weeks: 0, is_permanent: false };
}

export async function getStudyRoomNotes(roomId: number): Promise<StudyRoomNote[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("study_room_notes")
    .select("id, room_id, author_id, content, color, created_at")
    .eq("room_id", roomId)
    .order("created_at", { ascending: false });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomNote[];
}

export async function addStudyRoomNote(roomId: number, authorId: string, content: string, color = "emerald"): Promise<StudyRoomNote> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("study_room_notes")
    .insert({ room_id: roomId, author_id: authorId, content: content.trim(), color })
    .select("id, room_id, author_id, content, color, created_at")
    .single();
  if (error) throw handleSupabaseError(error);
  void recordStudyRoomCheckin(roomId, "note").catch(() => {});
  return data as StudyRoomNote;
}

export async function deleteStudyRoomNote(noteId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("study_room_notes").delete().eq("id", noteId);
  if (error) throw handleSupabaseError(error);
}

export async function getStudyRoomPomodoro(roomId: number): Promise<StudyRoomPomodoro | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("study_room_pomodoro")
    .select("*")
    .eq("room_id", roomId)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  return data as StudyRoomPomodoro | null;
}

export async function setStudyRoomPomodoro(
  roomId: number,
  mode: "focus" | "break",
  isRunning: boolean,
  durationSeconds: number,
  remainingSeconds: number
): Promise<StudyRoomPomodoro> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("set_study_room_pomodoro", {
    p_room_id: roomId,
    p_mode: mode,
    p_is_running: isRunning,
    p_duration_seconds: durationSeconds,
    p_remaining_seconds: remainingSeconds,
  });
  if (error) throw handleSupabaseError(error);
  return data as StudyRoomPomodoro;
}

export async function recordStudyRoomQuizAttempt(
  roomId: number,
  track: string,
  score: number,
  total: number
): Promise<StudyRoomQuizAttempt> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("record_study_room_quiz_attempt", {
    p_room_id: roomId,
    p_track: track,
    p_score: score,
    p_total: total,
  });
  if (error) throw handleSupabaseError(error);
  return data as StudyRoomQuizAttempt;
}

export async function getStudyRoomQuizAttempts(roomId: number): Promise<StudyRoomQuizAttempt[]> {
  const supabase = createClient();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const { data, error } = await supabase
    .from("study_room_quiz_attempts")
    .select("*")
    .eq("room_id", roomId)
    .gte("created_at", weekStart.toISOString())
    .order("created_at", { ascending: false });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return (data ?? []) as StudyRoomQuizAttempt[];
}

export async function getStudyRoomReactions(roomId: number): Promise<Record<number, Record<string, string[]>>> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_study_room_reactions", { p_room_id: roomId });
  if (error) {
    if (isMissingTableError(error)) return {};
    throw handleSupabaseError(error);
  }
  const grouped: Record<number, Record<string, string[]>> = {};
  for (const row of (data ?? []) as { message_id: number; emoji: string; user_ids: string[] }[]) {
    grouped[row.message_id] ??= {};
    grouped[row.message_id][row.emoji] = row.user_ids ?? [];
  }
  return grouped;
}

export async function toggleStudyRoomReaction(roomId: number, messageId: number, emoji: string): Promise<Record<number, Record<string, string[]>>> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("toggle_study_room_message_reaction", { p_message_id: messageId, p_emoji: emoji });
  if (error) throw handleSupabaseError(error);
  const grouped: Record<number, Record<string, string[]>> = {};
  for (const row of (data ?? []) as { message_id: number; emoji: string; user_ids: string[] }[]) {
    grouped[row.message_id] ??= {};
    grouped[row.message_id][row.emoji] = row.user_ids ?? [];
  }
  if (!Object.keys(grouped).length) return getStudyRoomReactions(roomId);
  return grouped;
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

export async function deleteRoomMessage(messageId: number): Promise<boolean> {
  const response = await fetch(`/api/study-room-messages/${messageId}`, {
    method: "DELETE",
  });

  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(payload?.error || "Không thu hồi được tin nhắn");
  }

  return true;
}

export async function updateRoomMessage(messageId: number, content: string): Promise<StudyRoomMessage> {
  const response = await fetch(`/api/study-room-messages/${messageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  const payload = (await response.json().catch(() => null)) as { message?: StudyRoomMessage; error?: string } | null;
  if (!response.ok || !payload?.message) {
    throw new Error(payload?.error || "Không sửa được tin nhắn");
  }

  return payload.message;
}

export async function setRoomMessagePinned(messageId: number, pinned: boolean): Promise<StudyRoomMessage> {
  const response = await fetch(`/api/study-room-messages/${messageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isPinned: pinned }),
  });

  const payload = (await response.json().catch(() => null)) as { message?: StudyRoomMessage; error?: string } | null;
  if (!response.ok || !payload?.message) {
    throw new Error(payload?.error || "Không cập nhật được ghim");
  }

  return payload.message;
}

export function subscribeToRoomMessages(
  roomId: number,
  onMessage: (message: StudyRoomMessage) => void,
  onDelete?: (messageId: number) => void
) {
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
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "study_room_messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => onMessage(payload.new as StudyRoomMessage)
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "study_room_messages",
        filter: `room_id=eq.${roomId}`,
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
