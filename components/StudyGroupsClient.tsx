"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Shuffle, Users, LogOut, Send, CornerUpLeft, Smile, X, MoreVertical, Trash2, Copy, Pin, PinOff, CheckCheck, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase";
import {
  STUDY_ROOM_TOPICS,
  addStudyRoomNote,
  claimStudyRoomWeeklyReward,
  deleteStudyRoomNote,
  getMyStudyRoom,
  getStudyRoomMembers,
  getStudyRoomMissions,
  getStudyRoomNotes,
  getStudyRoomPomodoro,
  getStudyRoomQuizAttempts,
  getStudyRoomReactions,
  getStudyRooms,
  isStudyRoomBotCommand,
  joinOrCreateStudyRoom,
  joinStudyRoom,
  leaveStudyRoom,
  recordStudyRoomCheckin,
  recordStudyRoomQuizAttempt,
  getRoomMessages,
  requestStudyRoomBot,
  sendRoomMessage,
  setStudyRoomPomodoro,
  deleteRoomMessage,
  updateRoomMessage,
  setRoomMessagePinned,
  subscribeToRoomMessages,
  toggleStudyRoomReaction,
} from "@/lib/supabase-study-rooms";
import { trackFeatureClick } from "@/lib/feature-events";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useStudyRoomVoice } from "@/lib/use-study-room-voice";
import {
  type StudyRoomMission,
  type StudyRoomMember,
  type StudyRoomMessage,
  type StudyRoomNote,
  type StudyRoomPomodoro,
  type StudyRoomQuizAttempt,
  type StudyRoomSummary,
  type StudyRoomTopic,
} from "@/lib/supabase-study-rooms";

interface SessionUser {
  id: string;
}

interface GroupQuizQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
}

const REACTION_EMOJIS = ["👍", "❤️", "🔥", "🚀", "💡", "😂"];

function Avatar({ name, avatarUrl, size = 36 }: { name?: string | null; avatarUrl?: string | null; size?: number }) {
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return isValidAvatar(avatarUrl) ? (
    <Image
      src={avatarUrl}
      alt={name || "User"}
      width={size}
      height={size}
      className="rounded-full object-cover border border-stone-200 dark:border-stone-700"
    />
  ) : (
    <div
      className="rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-extrabold flex items-center justify-center border border-stone-300 dark:border-stone-600 shrink-0"
      style={{ width: size, height: size, fontSize: Math.max(11, Math.floor(size / 2.6)) }}
    >
      {initials}
    </div>
  );
}

function topicLabel(topic: StudyRoomTopic) {
  return STUDY_ROOM_TOPICS.find((t) => t.id === topic)?.label ?? topic;
}

function missionIcon(key: StudyRoomMission["mission_key"]) {
  if (key === "lessons") return "📚";
  if (key === "quizzes") return "⚡";
  return "📍";
}

function noteColorClass(color: string) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100",
    amber: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100",
    sky: "bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-100",
    rose: "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-100",
    violet: "bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800 text-violet-950 dark:text-violet-100",
  };
  return colors[color] ?? colors.emerald;
}

function formatShortTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Optimistic message ids. Negative so they can never collide with a real
// bigserial id, which is what lets the realtime subscription and the
// optimistic bubble coexist in one list without deduplication guesswork.
let optimisticIdCounter = -1;
const nextOptimisticId = () => optimisticIdCounter--;
const isPendingMessage = (msg: { id: number }) => msg.id < 0;

// ── Geometry of the 3D study room ──────────────────────────────────────
//
// The room is built out of real CSS 3D surfaces (a floor plane and three
// walls inside one `preserve-3d` world) rather than a flat panel with a dot
// grid, so rotating the camera actually walks around the space. All numbers
// below are *virtual* pixels at zoom 1: the whole world is scaled down by a
// breakpoint class on its wrapper, which is what lets one set of coordinates
// serve a 375px phone and a 1440px desktop without a second layout.
const ROOM_W = 560;
const ROOM_D = 460;
const ROOM_H = 300;
/** Floor height below the world origin. Walls sit on it, characters stand on it. */
const FLOOR_Y = 130;
const SEAT_RADIUS = 175;
/** Seat angles around the table, in degrees, 0 = nearest the camera.
 *
 *  Deliberately not a plain `idx * 72`: the top learner takes the far side
 *  (180°, the "head" of the table, fully visible) and the near-centre slot
 *  is left empty, so the camera looks *into* the circle instead of at the
 *  back of whoever drew seat one. */
const SEAT_ANGLES = [180, 108, 252, 36, 324];

// "Học cùng nhóm": small (default cap 5) topic-based groups, either
// randomly matched into an open room or picked manually from the browse
// list - unlike the 1:1 referral loop this is meant to stay ongoing (a
// shared weekly goal + mini leaderboard), not a one-time invite. Every
// Monday, everyone active in the last 7 days gets auto-placed into a fresh
// random room for their preferred track (see the weekly-study-match cron +
// weekly_rematch_study_rooms()) - the manual join/browse UI below stays as
// the opt-out path for anyone who wants to switch mid-week.
export default function StudyGroupsClient({ embedded = false }: { embedded?: boolean } = {}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [myRoom, setMyRoom] = useState<StudyRoomSummary | null>(null);
  const [myRoomMembers, setMyRoomMembers] = useState<StudyRoomMember[]>([]);
  const [browseTopic, setBrowseTopic] = useState<StudyRoomTopic>("personal");
  const [rooms, setRooms] = useState<StudyRoomSummary[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<StudyRoomMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [rotation3D, setRotation3D] = useState<{ x: number; y: number }>({ x: 20, y: 0 });
  const [zoom3D, setZoom3D] = useState<number>(1.0);
  const [isDragging3D, setIsDragging3D] = useState(false);
  const [activeMapNode, setActiveMapNode] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationStartRef = useRef<{ x: number; y: number }>({ x: 20, y: 0 });
  /** Whether the current pointer gesture belongs to the stage yet - see
   *  handleStageMouseDown. Kept in a ref so the decision survives the moves
   *  that happen before React re-renders. */
  const gestureRef = useRef<{ active: boolean; captured: boolean }>({ active: false, captured: false });

  const handleStageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setZoom3D((prev) => Math.max(0.6, Math.min(1.85, prev - e.deltaY * 0.0015)));
  };

  // 1. Mobile Viewport Segmented Tab Toggle state ("3d" | "chat")
  const [mobileTab, setMobileTab] = useState<"3d" | "chat">("3d");

  // 2. Focus Lofi Audio Player state & Web Audio synth engine
  const [lofiPlaying, setLofiPlaying] = useState(false);
  const [lofiTrack, setLofiTrack] = useState<"lofi" | "rain" | "waves">("lofi");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // 2b. Room voice chat (LiveKit). Opt-in, audio-only, mic starts muted -
  // see the header comment in lib/use-study-room-voice.ts.
  const voice = useStudyRoomVoice(myRoom?.room_id ?? null);

  // 3. Group Daily Quests & 3D Chest Reward state
  const [isChestUnlocked, setIsChestUnlocked] = useState(false);
  const [missions, setMissions] = useState<StudyRoomMission[]>([]);
  const [claimingReward, setClaimingReward] = useState(false);

  // 4. Group Co-Pomodoro Timer State (25m Focus / 5m Break)
  const [pomoMode, setPomoMode] = useState<"focus" | "break">("focus");
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [pomoRunning, setPomoRunning] = useState(false);

  // Active Chat Effect from Shop
  const [activeChatEffect, setActiveChatEffect] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      try {
        const effect = localStorage.getItem(`thtcdn_active_chat_effect_${user.id}`);
        if (effect) setActiveChatEffect(effect);
      } catch (e) {}
    }
  }, [user?.id]);

  // 5. Right Column Sub-tab: "chat" | "notes" | "quiz"
  const [chatSubTab, setChatSubTab] = useState<"chat" | "notes" | "quiz">("chat");

  // 6. Shared Group Sticky Notes State
  const [stickyNotes, setStickyNotes] = useState<StudyRoomNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");

  // 7. Group Quiz Challenge State
  const [groupQuizAnswers, setGroupQuizAnswers] = useState<Record<number, number>>({});
  const [groupQuizSubmitted, setGroupQuizSubmitted] = useState(false);
  const [groupQuizScore, setGroupQuizScore] = useState<number | null>(null);
  const [groupQuizQuestions, setGroupQuizQuestions] = useState<GroupQuizQuestion[]>([]);
  const [loadingGroupQuiz, setLoadingGroupQuiz] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<StudyRoomQuizAttempt[]>([]);

  // Co-Pomodoro Countdown Effect
  useEffect(() => {
    if (!pomoRunning) return;
    const interval = setInterval(() => {
      setPomoSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPomoRunning(false);
          if (pomoMode === "focus") {
            setPomoMode("break");
            setPomoSeconds(5 * 60);
            if (myRoom?.room_id) void setStudyRoomPomodoro(myRoom.room_id, "break", false, 5 * 60, 5 * 60).catch(() => {});
            toast.success("☕ Hết 25 phút học tập! Cả nhóm nghỉ giải lao 5 phút (+15 XP Tập trung nhóm)! 🎉");
          } else {
            setPomoMode("focus");
            setPomoSeconds(25 * 60);
            if (myRoom?.room_id) void setStudyRoomPomodoro(myRoom.room_id, "focus", false, 25 * 60, 25 * 60).catch(() => {});
            toast.info("🎯 Hết giờ nghỉ! Bắt đầu phiên 25 phút tập trung tiếp theo!");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pomoRunning, pomoMode, myRoom?.room_id]);

  function formatPomoTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  }

  const toggleLofiMusic = () => {
    if (lofiPlaying) {
      if (gainNodeRef.current) gainNodeRef.current.gain.value = 0;
      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch {}
      }
      setLofiPlaying(false);
      toast.info("🔇 Đã tắt nhạc Focus Lofi");
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      if (lofiTrack === "lofi") {
        [220, 277.18, 329.63, 440].forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gain);
          osc.start();
        });
      } else {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.08;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noise.connect(gain);
        noise.start();
        noiseSourceRef.current = noise;
      }
      setLofiPlaying(true);
      toast.success(`🎧 Đã bật nhạc Focus [${lofiTrack.toUpperCase()}] Chill!`);
    } catch {
      toast.error("Không thể khởi chạy nhạc Lofi");
    }
  };

  const handleStageMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const isTouch = "touches" in e;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
    rotationStartRef.current = { ...rotation3D };
    // A mouse press over the stage can only mean "rotate", so it captures
    // straight away. A finger press can't: the stage fills most of a phone
    // screen, and the overwhelmingly common gesture on it is scrolling past
    // to the rest of the page. Touch therefore starts *uncommitted* and has
    // to prove horizontal intent in handleStageMouseMove before it steals
    // the gesture - without this, every scroll spun the room to a random
    // angle and left the seats unreadable.
    gestureRef.current = { active: true, captured: !isTouch };
    if (!isTouch) setIsDragging3D(true);
  };

  /** Horizontal travel, in px, that separates "spin the room" from "scroll". */
  const DRAG_INTENT_PX = 12;

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture.active) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    if (!gesture.captured) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) >= DRAG_INTENT_PX) {
        // Committed to a vertical scroll - stay out of the way for the rest
        // of this touch rather than re-testing on every move event.
        gesture.active = false;
        return;
      }
      if (Math.abs(deltaX) < DRAG_INTENT_PX) return;
      gesture.captured = true;
      setIsDragging3D(true);
    }

    setRotation3D({
      x: Math.max(-10, Math.min(65, rotationStartRef.current.x - deltaY * 0.4)),
      y: rotationStartRef.current.y + deltaX * 0.5,
    });
  };

  const handleStageMouseUp = () => {
    gestureRef.current = { active: false, captured: false };
    setIsDragging3D(false);
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const myMemberRow = useMemo(
    () => myRoomMembers.find((m) => m.user_id === user?.id) ?? null,
    [myRoomMembers, user?.id]
  );

  const memberById = useMemo(
    () => new Map(myRoomMembers.map((m) => [m.user_id, m])),
    [myRoomMembers]
  );

  const pinnedMessage = useMemo(() => messages.find((m) => m.is_pinned) ?? null, [messages]);
  const scrollMessages = useMemo(() => messages.filter((m) => !m.is_pinned), [messages]);
  const allMissionsDone = missions.length > 0 && missions.every((m) => m.completed);
  const rewardClaimed = missions.some((m) => m.reward_claimed);
  const groupStreakWeeks = missions[0]?.streak_weeks ?? 0;
  const isPermanentRoom = missions[0]?.is_permanent ?? false;
  const roomLeaderId = missions[0]?.leader_id ?? myRoomMembers[0]?.user_id ?? null;

  function hydratePomodoro(row: StudyRoomPomodoro | null) {
    if (!row) return;
    let remaining = row.remaining_seconds;
    if (row.is_running && row.started_at) {
      const elapsed = Math.floor((Date.now() - new Date(row.started_at).getTime()) / 1000);
      remaining = Math.max(0, row.remaining_seconds - elapsed);
    }
    setPomoMode(row.mode);
    setPomoRunning(row.is_running && remaining > 0);
    setPomoSeconds(remaining);
  }

  async function refreshRoomEngagement(roomId = myRoom?.room_id) {
    if (!roomId) return;
    const [missionRows, noteRows, attemptRows, pomodoroRow, reactionRows] = await Promise.all([
      getStudyRoomMissions(roomId),
      getStudyRoomNotes(roomId),
      getStudyRoomQuizAttempts(roomId),
      getStudyRoomPomodoro(roomId),
      getStudyRoomReactions(roomId),
    ]);
    setMissions(missionRows);
    setStickyNotes(noteRows);
    setQuizAttempts(attemptRows);
    hydratePomodoro(pomodoroRow);
    setReactions(reactionRows);
    setIsChestUnlocked(missionRows.length > 0 && missionRows.every((m) => m.completed) && missionRows.some((m) => m.reward_claimed));
  }

  async function refreshMyRoom() {
    const room = await getMyStudyRoom();
    setMyRoom(room);
    if (room) {
      const members = await getStudyRoomMembers(room.room_id);
      setMyRoomMembers(members);
    } else {
      setMyRoomMembers([]);
    }
  }

  async function refreshBrowseList(topic: StudyRoomTopic) {
    setLoadingRooms(true);
    try {
      const list = await getStudyRooms(topic);
      setRooms(list);
    } catch (error) {
      console.error("Error loading study rooms:", error);
      toast.error(error instanceof Error ? error.message : "Không tải được danh sách phòng học");
    } finally {
      setLoadingRooms(false);
    }
  }

  async function handleQuickCheer(text: string) {
    if (!myRoom || !user || sendingMessage) return;
    try {
      const sent = await sendRoomMessage(myRoom.room_id, user.id, text);
      setMessages((prev) => (prev.some((m) => m.id === sent.id) ? prev : [...prev, sent]));
      void refreshRoomEngagement(myRoom.room_id).catch(() => {});
      toast.success("Đã gửi lời cổ vũ đến cả nhóm! 🎉");
    } catch {
      toast.error("Không thể gửi lời cổ vũ");
    }
  }

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace("/login");
        return;
      }
      setUser({ id: session.user.id });
      try {
        await refreshMyRoom();
      } catch (error) {
        console.error("Error loading study room:", error);
      }
      setLoading(false);
    };
    void init();
  }, [router, supabase.auth]);

  useEffect(() => {
    if (myRoom) return; // no need to browse while already in a room
    void refreshBrowseList(browseTopic);
  }, [browseTopic, myRoom]);

  useEffect(() => {
    if (!myRoom) {
      setMessages([]);
      setMissions([]);
      setStickyNotes([]);
      setQuizAttempts([]);
      setGroupQuizQuestions([]);
      return;
    }
    let cancelled = false;
    Promise.all([getRoomMessages(myRoom.room_id), refreshRoomEngagement(myRoom.room_id)])
      .then(([list]) => {
        if (!cancelled) {
          setMessages(list);
        }
      })
      .catch((error) => console.error("Error loading room messages:", error));

    const unsubscribe = subscribeToRoomMessages(
      myRoom.room_id,
      (message) => {
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev.map((m) => (m.id === message.id ? message : m)) : [...prev, message]));
        void getStudyRoomMissions(myRoom.room_id).then(setMissions).catch(() => {});
      },
      (deletedId) => {
        setMessages((prev) => prev.filter((m) => m.id !== deletedId));
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [myRoom?.room_id]);

  useEffect(() => {
    if (!myRoom) return;
    let cancelled = false;
    setLoadingGroupQuiz(true);
    fetch(`/api/knowledge-challenge?track=${myRoom.topic}&difficulty=tat-ca`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("failed"))))
      .then((data) => {
        if (cancelled) return;
        const picked = ((data.questions ?? []) as GroupQuizQuestion[]).slice(0, 3);
        setGroupQuizQuestions(picked);
        setGroupQuizAnswers({});
        setGroupQuizSubmitted(false);
        setGroupQuizScore(null);
      })
      .catch((error) => console.error("Error loading group quiz:", error))
      .finally(() => {
        if (!cancelled) setLoadingGroupQuiz(false);
      });
    return () => {
      cancelled = true;
    };
  }, [myRoom?.room_id, myRoom?.topic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** Lookup for resolving reply_to_id against the loaded window. */
  const messageById = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);
  /** Briefly flashes the message a reply jumped to, so the eye can find it. */
  const [highlightedMsgId, setHighlightedMsgId] = useState<number | null>(null);
  /** Optimistic bubbles whose send failed. They stay in the list rather than
   *  vanishing - a message that disappears reads as "sent" to the eye, which
   *  is the worst possible outcome when it wasn't. */
  const [failedMessageIds, setFailedMessageIds] = useState<Set<number>>(new Set());
  /** What each failed bubble needs in order to be sent again. */
  const failedPayloadRef = useRef<Map<number, { content: string; replyToId: number | null }>>(new Map());

  const [replyingTo, setReplyingTo] = useState<{ id: number; senderName: string; content: string } | null>(null);
  const [editingMessage, setEditingMessage] = useState<{ id: number; content: string } | null>(null);
  const [reactions, setReactions] = useState<Record<number, Record<string, string[]>>>({});
  const [activeMenuMsgId, setActiveMenuMsgId] = useState<number | null>(null);

  async function copyMessageText(content: string) {
    const text = content.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Đã sao chép tin nhắn");
    } catch {
      toast.error("Không sao chép được tin nhắn");
    }
  }

  async function togglePinMessage(msg: StudyRoomMessage) {
    try {
      const updated = await setRoomMessagePinned(msg.id, !msg.is_pinned);
      setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      toast.success(updated.is_pinned ? "Đã ghim tin nhắn" : "Đã bỏ ghim tin nhắn");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không cập nhật được ghim");
    }
  }

  const toggleReaction = async (msgId: number, emoji: string) => {
    if (!user?.id || !myRoom) return;
    try {
      const next = await toggleStudyRoomReaction(myRoom.room_id, msgId, emoji);
      setReactions(next);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thả reaction được");
    }
  };

  async function handleManualCheckin() {
    if (!myRoom) return;
    try {
      await recordStudyRoomCheckin(myRoom.room_id, "manual");
      await refreshRoomEngagement(myRoom.room_id);
      toast.success("Đã điểm danh hôm nay. Tiến độ nhiệm vụ nhóm đã cập nhật!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không điểm danh được lúc này");
    }
  }

  async function handleTogglePomodoro() {
    if (!myRoom) return;
    const nextRunning = !pomoRunning;
    const duration = pomoMode === "focus" ? 25 * 60 : 5 * 60;
    const remaining = pomoSeconds > 0 ? pomoSeconds : duration;
    try {
      const row = await setStudyRoomPomodoro(myRoom.room_id, pomoMode, nextRunning, duration, remaining);
      hydratePomodoro(row);
      if (nextRunning) void recordStudyRoomCheckin(myRoom.room_id, "pomodoro").catch(() => {});
      toast.info(nextRunning ? "Đã bắt đầu Pomodoro sync cho cả phòng" : "Đã tạm dừng Pomodoro nhóm");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không cập nhật được Pomodoro nhóm");
    }
  }

  async function handleClaimGroupReward() {
    if (!myRoom || claimingReward) return;
    setClaimingReward(true);
    try {
      const result = await claimStudyRoomWeeklyReward(myRoom.room_id);
      await refreshRoomEngagement(myRoom.room_id);
      if (result.ok) {
        setIsChestUnlocked(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không mở được rương nhóm");
    } finally {
      setClaimingReward(false);
    }
  }

  async function handleAddNote() {
    if (!myRoom || !user?.id || !newNoteText.trim()) return;
    const noteColors = ["emerald", "amber", "sky", "rose", "violet"];
    const color = noteColors[stickyNotes.length % noteColors.length];
    try {
      const note = await addStudyRoomNote(myRoom.room_id, user.id, newNoteText.trim(), color);
      setStickyNotes((prev) => [note, ...prev]);
      setNewNoteText("");
      void refreshRoomEngagement(myRoom.room_id).catch(() => {});
      toast.success("Đã dán ghi chú mới lên bảng nhóm!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không lưu được ghi chú");
    }
  }

  async function handleDeleteNote(noteId: number) {
    try {
      await deleteStudyRoomNote(noteId);
      setStickyNotes((prev) => prev.filter((note) => note.id !== noteId));
      toast.success("Đã xóa ghi chú");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không xóa được ghi chú");
    }
  }

  async function handleSubmitGroupQuiz() {
    if (!myRoom || groupQuizQuestions.length === 0) return;
    let correct = 0;
    groupQuizQuestions.forEach((q, idx) => {
      if (groupQuizAnswers[idx] === q.correct) correct++;
    });
    const score = Math.round((correct / groupQuizQuestions.length) * 100);
    setGroupQuizScore(score);
    setGroupQuizSubmitted(true);
    try {
      await recordStudyRoomQuizAttempt(myRoom.room_id, myRoom.topic, correct, groupQuizQuestions.length);
      await refreshRoomEngagement(myRoom.room_id);
      if (score >= 80) {
        toast.success(`Quiz nhóm đạt ${score}%. Đã cộng tiến độ nhiệm vụ tuần!`);
      } else {
        toast.info(`Quiz nhóm đạt ${score}%. Cứ làm tiếp, tiến độ quiz tuần vẫn được ghi nhận.`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không lưu được điểm quiz nhóm");
    }
  }

  function memberRole(member: StudyRoomMember) {
    if (member.user_id === roomLeaderId) return "Trưởng nhóm";
    if (member.current_level >= 10) return "Mentor";
    if (member.weekly_lessons >= 3) return "Tích cực";
    return "Thành viên";
  }

  async function handleSendMessage() {
    const rawContent = messageInput.trim();
    if (!rawContent || !myRoom || !user || sendingMessage) return;

    if (editingMessage) {
      setSendingMessage(true);
      try {
        const updated = await updateRoomMessage(editingMessage.id, rawContent);
        setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setMessageInput("");
        setEditingMessage(null);
        toast.success("Đã chỉnh sửa tin nhắn");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không sửa được tin nhắn");
      } finally {
        setSendingMessage(false);
      }
      return;
    }

    // The reply is a foreign key now, not a prefix baked into the text - so
    // what gets stored is exactly what the user typed.
    const replyToId = replyingTo?.id ?? null;

    if (isStudyRoomBotCommand(rawContent)) {
      setSendingMessage(true);
      setMessageInput("");
      setReplyingTo(null);
      try {
        const botMessage = await requestStudyRoomBot(myRoom.room_id, rawContent);
        setMessages((prev) => (prev.some((m) => m.id === botMessage.id) ? prev : [...prev, botMessage]));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không gọi được Tài Tài");
      } finally {
        setSendingMessage(false);
      }
      return;
    }

    // The input is cleared up front and the bubble goes up immediately.
    // Waiting for the round-trip left a visible gap on mobile data, and a
    // gap after pressing send is indistinguishable from a failure - people
    // press again, and the room gets the message twice.
    setMessageInput("");
    setReplyingTo(null);
    void deliverMessage(rawContent, replyToId, nextOptimisticId());
  }

  /** Sends (or re-sends) one message, keeping its optimistic bubble in place
   *  until the server confirms it or the attempt fails. */
  async function deliverMessage(content: string, replyToId: number | null, optimisticId: number) {
    if (!myRoom || !user) return;

    setFailedMessageIds((prev) => {
      if (!prev.has(optimisticId)) return prev;
      const next = new Set(prev);
      next.delete(optimisticId);
      return next;
    });

    setMessages((prev) =>
      prev.some((m) => m.id === optimisticId)
        ? prev
        : [
            ...prev,
            {
              id: optimisticId,
              room_id: myRoom.room_id,
              sender_id: user.id,
              content,
              image_url: null,
              created_at: new Date().toISOString(),
              is_bot: false,
              is_pinned: false,
              reply_to_id: replyToId,
            },
          ]
    );

    setSendingMessage(true);
    try {
      const sent = await sendRoomMessage(myRoom.room_id, user.id, content, null, replyToId);
      failedPayloadRef.current.delete(optimisticId);
      setMessages((prev) => {
        const withoutOptimistic = prev.filter((m) => m.id !== optimisticId);
        // The realtime subscription may have already delivered this row.
        return withoutOptimistic.some((m) => m.id === sent.id) ? withoutOptimistic : [...withoutOptimistic, sent];
      });
    } catch (error) {
      console.error("Error sending room message:", error);
      failedPayloadRef.current.set(optimisticId, { content, replyToId });
      setFailedMessageIds((prev) => new Set(prev).add(optimisticId));
    } finally {
      setSendingMessage(false);
    }
  }

  function retryMessage(optimisticId: number) {
    const payload = failedPayloadRef.current.get(optimisticId);
    if (payload) void deliverMessage(payload.content, payload.replyToId, optimisticId);
  }

  function discardFailedMessage(optimisticId: number) {
    failedPayloadRef.current.delete(optimisticId);
    setFailedMessageIds((prev) => {
      const next = new Set(prev);
      next.delete(optimisticId);
      return next;
    });
    setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
  }

  async function handleRandomMatch(topic: StudyRoomTopic) {
    if (busy) return;
    setBusy(true);
    trackFeatureClick("study_room_random_match", { label: topic });
    try {
      await joinOrCreateStudyRoom(topic);
      toast.success("Đã ghép bạn vào một phòng học ngẫu nhiên!");
      await refreshMyRoom();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể ghép nhóm lúc này");
    } finally {
      setBusy(false);
    }
  }

  async function handleJoinRoom(roomId: number) {
    if (busy) return;
    setBusy(true);
    trackFeatureClick("study_room_manual_join", { label: String(roomId) });
    try {
      await joinStudyRoom(roomId);
      toast.success("Đã tham gia phòng học!");
      await refreshMyRoom();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tham gia phòng này");
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave() {
    if (busy) return;
    setBusy(true);
    try {
      await leaveStudyRoom();
      toast.success("Đã rời phòng học");
      setMyRoom(null);
      setMyRoomMembers([]);
      await refreshBrowseList(browseTopic);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể rời phòng lúc này");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className={`${embedded ? "min-h-[320px]" : "min-h-screen bg-white dark:bg-stone-950"} flex items-center justify-center`}>
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className={embedded ? "" : "min-h-screen bg-white dark:bg-stone-950"}>
      {!embedded && (
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">Học cùng nhóm</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Ghép ngẫu nhiên với người lạ hoặc tự chọn phòng để cùng học chung một chủ đề, đua mục tiêu XP mỗi tuần.
          </p>
        </div>
      </div>
      )}

      <div className={`${embedded ? "h-full flex flex-col overflow-hidden" : "max-w-7xl mx-auto px-3 sm:px-4 py-3 min-h-[calc(100vh-4rem)] flex flex-col font-sans"}`}>
        {myRoom ? (
          <div className="h-full flex flex-col min-h-0 space-y-3">
            {/* Top Room Info, Lofi Audio & Mobile Segmented Tab Bar */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-3 sm:px-4 py-2 shrink-0 flex items-center justify-between gap-2 sm:gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                  👥
                </span>
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 truncate">
                    Phòng {topicLabel(myRoom.topic)} · {myRoom.member_count}/{myRoom.max_members} thành viên
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-20 sm:w-32 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (myRoom.weekly_xp_progress / Math.max(1, myRoom.weekly_xp_goal)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {myRoom.weekly_xp_progress}/{myRoom.weekly_xp_goal} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Center/Right Action Bar: Group Co-Pomodoro + Lofi Focus Sound + Mic Toggle + Mobile Segmented Tab Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* ⏱️ Group Co-Pomodoro Timer Widget */}
                <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-stone-700 text-[10px] font-mono font-black">
                  <span className={pomoRunning ? "animate-pulse text-emerald-500" : "text-amber-500"}>
                    {pomoMode === "focus" ? "🎯 25m" : "☕ 5m"}
                  </span>
                  <span className="text-stone-900 dark:text-stone-100 font-extrabold">{formatPomoTime(pomoSeconds)}</span>
                  <button
                    type="button"
                    onClick={() => void handleTogglePomodoro()}
                    className="ml-0.5 text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {pomoRunning ? "Tạm dừng" : "Bắt đầu"}
                  </button>
                </div>
                {/* 🎧 Lofi Chill Focus Audio Button */}
                <button
                  type="button"
                  onClick={toggleLofiMusic}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer ${
                    lofiPlaying
                      ? "bg-emerald-500 text-white border-emerald-400 animate-pulse shadow-xs"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200"
                  }`}
                  title="Bật/Tắt nhạc Lofi Chill tập trung"
                >
                  <span>🎧</span>
                  <span className="hidden sm:inline">{lofiPlaying ? "Nhạc Lofi: Đang phát" : "Nhạc Lofi Chill"}</span>
                </button>

                {/* 🎙️ Voice chat - opt in, then unmute. Two separate steps on
                    purpose: rooms are re-matched with strangers every Monday,
                    so nothing connects and no microphone opens until the user
                    asks for it twice. */}
                {voice.status === "connected" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => void voice.toggleMic()}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer ${
                        voice.micEnabled
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700"
                      }`}
                      title="Bật/Tắt Micro"
                    >
                      <span>{voice.micEnabled ? "🎙️" : "🔇"}</span>
                      <span className="hidden md:inline">{voice.micEnabled ? "Mic: Mở" : "Mic: Tắt"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void voice.leave()}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border bg-rose-500 text-white border-rose-400 transition-all cursor-pointer"
                      title="Rời voice"
                    >
                      <span>📴</span>
                      <span className="hidden md:inline">Rời voice ({voice.participantIds.length})</span>
                    </button>
                    {voice.needsAudioUnlock && (
                      <button
                        type="button"
                        onClick={() => void voice.unlockAudio()}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border bg-amber-500 text-stone-950 border-amber-400 animate-pulse cursor-pointer"
                        title="Trình duyệt đang chặn tự phát âm thanh"
                      >
                        🔈 Bấm để nghe
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => void voice.join()}
                    disabled={voice.status === "connecting" || voice.status === "unavailable"}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                      voice.status === "unavailable"
                        ? "bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200"
                    }`}
                    title={
                      voice.status === "unavailable"
                        ? "Voice chưa được cấu hình trên máy chủ"
                        : "Vào kênh thoại của phòng (mic tắt sẵn)"
                    }
                  >
                    <span>🎙️</span>
                    <span className="hidden md:inline">
                      {voice.status === "connecting"
                        ? "Đang vào..."
                        : voice.status === "unavailable"
                        ? "Voice chưa bật"
                        : "Vào voice"}
                    </span>
                  </button>
                )}

                {/* 📱 Mobile Segmented Tab Control (< lg screens) */}
                <div className="lg:hidden flex bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700 text-[10px] font-extrabold">
                  <button
                    type="button"
                    onClick={() => setMobileTab("3d")}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      mobileTab === "3d" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-stone-500"
                    }`}
                  >
                    🛋️ Bàn 3D
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab("chat")}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      mobileTab === "chat" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-stone-500"
                    }`}
                  >
                    💬 Chat
                  </button>
                </div>

                <button
                  onClick={handleLeave}
                  disabled={busy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Rời phòng</span>
                </button>
              </div>
            </div>

            {/* 💡 Group Attendance & Daily Quest Guidance Banner */}
            <div className="mb-3 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/15 border border-amber-500/40 text-xs font-medium text-stone-800 dark:text-stone-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                  📍
                </span>
                <div>
                  <p className="font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>Nhiệm vụ tuần của phòng học</span>
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                      {isPermanentRoom ? "Nhóm vĩnh viễn" : `${groupStreakWeeks}/3 tuần streak`}
                    </span>
                  </p>
                  <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-tight mt-0.5">
                    Hoàn thành 3 nhiệm vụ để mở rương nhóm. Nhắn chat, dán note, làm quiz hoặc bật Pomodoro đều được tính là hoạt động nhóm.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void handleManualCheckin()}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-xs cursor-pointer shrink-0 active:scale-95 flex items-center gap-1"
              >
                <span>👋 Bấm điểm danh ngay</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {missions.length === 0 ? (
                <div className="md:col-span-3 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-3 text-xs font-bold text-stone-500 dark:text-stone-400">
                  Chưa có dữ liệu nhiệm vụ tuần. Sau khi chạy migration mới, tiến độ sẽ tự lấy từ Supabase.
                </div>
              ) : (
                missions.map((mission) => {
                  const pct = Math.min(100, Math.round((mission.current_value / Math.max(1, mission.target_value)) * 100));
                  return (
                    <div key={mission.mission_key} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-3 shadow-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate">
                            {missionIcon(mission.mission_key)} {mission.title}
                          </p>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">{mission.description}</p>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${
                          mission.completed
                            ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        }`}>
                          {mission.current_value}/{mission.target_value}
                        </span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Main 2-Column Split View */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 overflow-hidden">
              {/* LEFT COLUMN: 3D Spatial Table Stage 80% Viewport Height with Mouse Wheel Zoom */}
              <div
                onMouseDown={handleStageMouseDown}
                onMouseMove={handleStageMouseMove}
                onMouseUp={handleStageMouseUp}
                onMouseLeave={handleStageMouseUp}
                onTouchStart={handleStageMouseDown}
                onTouchMove={handleStageMouseMove}
                onTouchEnd={handleStageMouseUp}
                onWheel={handleStageWheel}
                className={`lg:col-span-7 ${
                  mobileTab === "3d" ? "flex" : "hidden lg:flex"
                } flex-col h-[64vh] min-h-[440px] sm:h-[74vh] sm:min-h-[600px] lg:h-[78vh] lg:min-h-[640px] flex-1 rounded-2xl border border-stone-800 bg-stone-950 p-3 sm:p-4 shadow-2xl relative overflow-hidden text-white justify-between select-none transition-colors ${
                  isDragging3D ? "cursor-grabbing border-emerald-500/70" : "cursor-grab"
                }`}
                // touchAction "pan-y" is the other half of the scroll fix in
                // handleStageMouseDown: the browser keeps vertical panning
                // (the page scrolls normally over the room) and hands us the
                // horizontal axis, which is the one we turn into rotation.
                style={{ perspective: "900px", perspectiveOrigin: "50% 38%", touchAction: "pan-y" }}
              >

                {/* Stage Header Controls */}
                <div className="relative z-30 flex items-center justify-between shrink-0 mb-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 backdrop-blur-md">
                      🌐 BÀN HỌC 3D · {topicLabel(myRoom.topic).toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRotation3D({ x: 20, y: 0 });
                        setZoom3D(1.0);
                      }}
                      className="text-[9px] font-bold text-stone-300 bg-stone-900/90 hover:bg-stone-800 px-2 py-0.5 rounded-full border border-stone-700 transition-all cursor-pointer"
                      title="Đặt lại góc 3D và độ Zoom"
                    >
                      🔄 Góc & Zoom ({Math.round(zoom3D * 100)}%)
                    </button>
                  </div>

                  {/* Quick Cheer Actions Bar */}
                  <div className="flex items-center gap-1 bg-stone-900/90 backdrop-blur-md px-2 py-0.5 rounded-xl border border-stone-800 shadow-xs">
                    <span className="text-[9px] font-bold text-stone-400 mr-1 hidden sm:inline">Cổ vũ:</span>
                    <button
                      onClick={() => void handleQuickCheer("👋 Đập tay cổ vũ mọi người cùng học bài nào!")}
                      className="hover:scale-125 transition-transform p-1 text-xs cursor-pointer"
                      title="Đập tay 👋"
                    >
                      👋
                    </button>
                    <button
                      onClick={() => void handleQuickCheer("❤️ Bắn tim yêu thương tiếp năng lượng học tập!")}
                      className="hover:scale-125 transition-transform p-1 text-xs cursor-pointer"
                      title="Bắn tim ❤️"
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => void handleQuickCheer("🔔 Ới ời cả nhóm ơi vào làm bài thôi nào!")}
                      className="hover:scale-125 transition-transform p-1 text-xs cursor-pointer"
                      title="Nhắc học 🔔"
                    >
                      🔔
                    </button>
                    <button
                      onClick={() => void handleQuickCheer("🔥 Tiếp sức cháy hết mình hôm nay!")}
                      className="hover:scale-125 transition-transform p-1 text-xs cursor-pointer"
                      title="Tiếp sức 🔥"
                    >
                      🔥
                    </button>
                  </div>
                </div>

                {/* ── THE ROOM ────────────────────────────────────────────
                    A floor plane and three walls inside one `preserve-3d`
                    world, with everything else standing on the floor, so
                    dragging the camera genuinely walks around the space
                    instead of skewing a flat panel.

                    Anything carrying a hand-written `style.transform` below
                    must NOT also take a framer transform prop (animate={{y}},
                    whileHover={{scale}}) - framer writes the whole transform
                    string and would drop the placement. Where both are needed
                    the placement lives on a plain wrapper and the animation on
                    a child. */}
                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
                  {/* Lamp bloom and vignette stay outside the world: light is
                      screen-space, it shouldn't rotate with the furniture. */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_50%_32%,transparent_38%,rgba(0,0,0,0.6)_100%)]" />

                  {/* One set of virtual coordinates, three screen sizes. */}
                  <div
                    className="scale-[0.5] sm:scale-[0.7] lg:scale-[0.9]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      animate={{ rotateX: rotation3D.x, rotateY: rotation3D.y, scale: zoom3D }}
                      transition={
                        isDragging3D
                          ? { type: "tween", duration: 0 }
                          : { type: "spring", stiffness: 200, damping: 20 }
                      }
                      className="relative"
                      style={{ width: ROOM_W, height: ROOM_H, transformStyle: "preserve-3d" }}
                    >
                      {/* ── FLOOR ── */}
                      <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                          width: ROOM_W,
                          height: ROOM_D,
                          transform: `translate(-50%, -50%) translateY(${FLOOR_Y}px) rotateX(90deg)`,
                          backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 48px), repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 2px, transparent 2px 96px), linear-gradient(180deg, #1c1917 0%, #0a0908 100%)",
                          boxShadow: "inset 0 0 140px rgba(0,0,0,0.95)",
                        }}
                      >
                        {/* Pool of lamplight on the boards */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.26)_0%,rgba(16,185,129,0.07)_45%,transparent_72%)]" />
                        {/* Rug under the table */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] rounded-full border border-emerald-500/20 bg-emerald-950/30" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-dashed border-emerald-400/25" />
                      </div>

                      {/* ── BACK WALL ── */}
                      <div
                        className="absolute left-1/2 top-1/2 overflow-hidden"
                        style={{
                          width: ROOM_W,
                          height: ROOM_H,
                          transform: `translate(-50%, -50%) translateY(${FLOOR_Y - ROOM_H / 2}px) translateZ(-${ROOM_D / 2}px)`,
                          background: "linear-gradient(180deg, #0a0908 0%, #1c1917 60%, #292524 100%)",
                        }}
                      >
                        {/* Window onto a night skyline */}
                        <div className="absolute top-9 left-12 w-[152px] h-[94px] rounded-md border-2 border-stone-700 bg-[linear-gradient(165deg,#0b3b33_0%,#052e2b_55%,#03211f_100%)] shadow-[0_0_46px_rgba(16,185,129,0.28)]">
                          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                            <div className="border-r border-b border-stone-700/70" />
                            <div className="border-b border-stone-700/70" />
                            <div className="border-r border-stone-700/70" />
                            <div />
                          </div>
                        </div>
                        {/* Wall clock */}
                        <div className="absolute top-12 right-[92px] w-10 h-10 rounded-full border-2 border-stone-700 bg-stone-900 shadow-inner">
                          <span className="absolute left-1/2 top-1/2 w-[1px] h-3 -translate-x-1/2 -translate-y-full bg-stone-500" />
                          <span className="absolute left-1/2 top-1/2 w-2.5 h-[1px] bg-stone-500" />
                        </div>
                        {/* Whiteboard */}
                        <div className="absolute bottom-[92px] right-8 w-[148px] h-[80px] rounded-md border-2 border-stone-700 bg-stone-800/80 p-2.5">
                          <div className="h-1.5 w-2/3 rounded-full bg-emerald-500/60" />
                          <div className="mt-2 h-1.5 w-1/2 rounded-full bg-stone-600" />
                          <div className="mt-2 h-1.5 w-3/5 rounded-full bg-stone-600" />
                          <div className="mt-2 h-1.5 w-1/3 rounded-full bg-stone-600" />
                        </div>
                        {/* Baseboard */}
                        <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-stone-800 border-t border-stone-700" />
                      </div>

                      {/* ── SIDE WALLS ── */}
                      {([-1, 1] as const).map((side) => (
                        <div
                          key={side}
                          className="absolute left-1/2 top-1/2 overflow-hidden"
                          style={{
                            width: ROOM_D,
                            height: ROOM_H,
                            transform: `translate(-50%, -50%) translateY(${FLOOR_Y - ROOM_H / 2}px) translateX(${
                              side * (ROOM_W / 2)
                            }px) rotateY(${side * -90}deg)`,
                            background:
                              side === -1
                                ? "linear-gradient(90deg, #0a0908 0%, #191614 100%)"
                                : "linear-gradient(270deg, #0a0908 0%, #191614 100%)",
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-stone-800 border-t border-stone-700" />
                        </div>
                      ))}

                      {/* ── PENDANT LAMP ── */}
                      <div
                        className="absolute left-1/2 top-1/2 pointer-events-none"
                        style={{ transform: `translate(-50%, -50%) translateY(-118px) rotateY(${-rotation3D.y}deg)` }}
                      >
                        <div className="w-px h-14 mx-auto bg-stone-700" />
                        <div className="w-16 h-7 mx-auto rounded-b-[32px] bg-gradient-to-b from-stone-700 to-stone-900 border border-stone-600 shadow-[0_10px_60px_rgba(16,185,129,0.55)]" />
                        <div className="w-7 h-2.5 mx-auto -mt-1 rounded-full bg-emerald-200/90 blur-[5px]" />
                      </div>

                      {/* ── ROUND TABLE ── */}
                      {/* Pedestal, turned to face the camera so it keeps
                          reading as a solid column at any yaw. */}
                      <div
                        className="absolute left-1/2 top-1/2 rounded-b-lg border-x border-stone-700 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950"
                        style={{
                          width: 48,
                          height: 74,
                          transform: `translate(-50%, -50%) translateY(${FLOOR_Y - 37}px) rotateY(${-rotation3D.y}deg)`,
                        }}
                      />
                      {/* Tabletop, lying flat on its pedestal */}
                      <div
                        className="absolute left-1/2 top-1/2 rounded-full border-2 border-emerald-400/60 cursor-pointer"
                        style={{
                          width: 208,
                          height: 208,
                          transform: `translate(-50%, -50%) translateY(${FLOOR_Y - 74}px) rotateX(90deg)`,
                          background:
                            "radial-gradient(circle at 38% 32%, #2c2724 0%, #1c1917 48%, #0a0908 100%)",
                          boxShadow: "0 0 70px rgba(16,185,129,0.38)",
                        }}
                        onClick={() => toast.success("🔮 Đã nạp năng lượng 3D Spatial Boost cho cả phòng!")}
                      >
                        <div className="absolute inset-5 rounded-full border border-dashed border-emerald-300/30 animate-spin [animation-duration:20s]" />
                        <div className="absolute inset-[38%] rounded-full bg-emerald-500/15 blur-md" />
                      </div>

                      {/* Holographic panel projected over the table. The one
                          place text must stay legible, so it billboards to the
                          camera rather than lying on the tabletop where the
                          pitch would crush it to a sliver. */}
                      <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translateY(-4px) rotateY(${-rotation3D.y}deg) rotateX(${-rotation3D.x}deg)`,
                        }}
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-44 rounded-2xl border border-emerald-400/50 bg-stone-950/85 backdrop-blur-md px-3 py-2.5 text-center shadow-[0_0_40px_rgba(16,185,129,0.45)]"
                        >
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-300">
                            🔮 Bàn học 3D
                          </p>
                          <p className="text-sm font-black text-white mt-0.5 tabular-nums">
                            {myRoom.weekly_xp_progress} / {myRoom.weekly_xp_goal} XP
                          </p>
                          <div className="mt-1.5 h-1.5 rounded-full bg-stone-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((myRoom.weekly_xp_progress / Math.max(1, myRoom.weekly_xp_goal)) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleClaimGroupReward();
                            }}
                            disabled={!allMissionsDone || rewardClaimed || claimingReward}
                            className={`mt-2 w-full inline-flex items-center justify-center gap-1 text-[9px] font-extrabold px-2 py-1 rounded-full border transition-all cursor-pointer ${
                              rewardClaimed || isChestUnlocked
                                ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md"
                                : !allMissionsDone
                                ? "bg-stone-900/90 text-stone-500 border-stone-700 cursor-not-allowed"
                                : "bg-emerald-950/90 text-emerald-300 border-emerald-400/40 hover:bg-emerald-800"
                            }`}
                          >
                            {rewardClaimed || isChestUnlocked
                              ? "👑 Rương Đã Mở"
                              : claimingReward
                              ? "Đang mở..."
                              : "🎁 Nhận Rương"}
                          </button>
                        </motion.div>
                      </div>

                      {/* ── HOLO PYLONS around the room ── */}
                      {[
                        { id: "valuation", name: "Định Giá", icon: "🏰", angle: 42 },
                        { id: "trading", name: "Giao Dịch", icon: "🏛️", angle: 138 },
                        { id: "cashflow", name: "Dòng Tiền", icon: "⚓", angle: 222 },
                        { id: "fed", name: "Lãi Suất", icon: "⚡", angle: 318 },
                      ].map((node) => (
                        <div
                          key={node.id}
                          className="absolute left-1/2 top-1/2"
                          style={{
                            transform: `translate(-50%, -50%) rotateY(${node.angle}deg) translateZ(248px) translateY(${
                              FLOOR_Y - 46
                            }px) rotateY(${-node.angle - rotation3D.y}deg)`,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMapNode(node.id);
                              toast.success(`Đã kích hoạt trạm 3D [${node.name}]! +15% XP cho cả phòng.`);
                            }}
                            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-[9px] font-black shadow-lg cursor-pointer transition-all hover:scale-110 ${
                              activeMapNode === node.id
                                ? "border-emerald-300 bg-emerald-900/90 text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.6)]"
                                : "border-emerald-500/40 bg-stone-900/90 text-emerald-300"
                            }`}
                          >
                            <span className="text-sm leading-none">{node.icon}</span>
                            <span className="whitespace-nowrap">{node.name}</span>
                          </button>
                          {/* Beam down to the floor, so the pylon reads as
                              planted in the room rather than floating. */}
                          <div className="w-px h-11 mx-auto bg-gradient-to-b from-emerald-400/60 to-transparent" />
                        </div>
                      ))}

                      {/* ── MEMBERS SEATED AROUND THE TABLE ── */}
                      {(() => {
                        const sortedMembers = [...myRoomMembers].sort((a, b) => b.weekly_lessons - a.weekly_lessons);

                        return SEAT_ANGLES.map((angle, idx) => {
                          const member = sortedMembers[idx];
                          const isMe = member?.user_id === user?.id;
                          // LiveKit participant identity is the Supabase user
                          // id (see the token route), so voice state maps onto
                          // seats without a second lookup table.
                          const inVoice = member ? voice.participantIds.includes(member.user_id) : false;
                          const isSpeaking = member ? voice.speakingIds.includes(member.user_id) : false;

                          // Real ring placement: swing out to the seat angle,
                          // then push away from the table centre.
                          const place = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${SEAT_RADIUS}px)`;
                          // Then undo the seat angle *and* the camera's yaw, so
                          // the figure keeps facing the viewer as the room
                          // spins. Pitch is deliberately left alone - a standee
                          // that leans back with the camera reads as standing
                          // on the floor; one that stays bolt upright reads as
                          // a sticker pasted on the lens.
                          const face = `rotateY(${-angle - rotation3D.y}deg)`;

                          return (
                            <div key={member?.user_id ?? `empty-${idx}`}>
                              {/* Contact shadow, painted flat on the floor */}
                              <div
                                className="absolute left-1/2 top-1/2 rounded-full bg-black/70 blur-[6px] pointer-events-none"
                                style={{
                                  width: member ? 62 : 46,
                                  height: member ? 24 : 18,
                                  transform: `${place} translateY(${FLOOR_Y - 1}px) rotateX(90deg)`,
                                }}
                              />

                              {member ? (
                                <div
                                  className="absolute left-1/2 top-1/2"
                                  style={{ transform: `${place} translateY(${FLOOR_Y - 78}px) ${face}` }}
                                >
                                  <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{
                                      duration: 2.6 + idx * 0.35,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    className="flex flex-col items-center"
                                  >
                                    {/* Name plate */}
                                    <div
                                      className={`mb-1 px-2 py-0.5 rounded-full border whitespace-nowrap shadow-md ${
                                        isMe
                                          ? "bg-emerald-500 border-emerald-300 text-stone-950"
                                          : "bg-stone-900/95 border-stone-700 text-white"
                                      }`}
                                    >
                                      <span className="text-[9px] font-black">
                                        {member.full_name || "Thành viên"}
                                        {isMe ? " (Bạn)" : ""}
                                      </span>
                                    </div>

                                    {/* Head */}
                                    <div className="relative">
                                      {idx === 0 && (
                                        <span
                                          className="absolute -top-4 left-1/2 -translate-x-1/2 text-base animate-bounce"
                                          title="Top 1 bài học tuần này"
                                        >
                                          👑
                                        </span>
                                      )}
                                      {/* Speaking halo. Rendered behind the
                                          head rather than as a ring on it, so
                                          "who is talking" is readable at the
                                          size a phone actually shows a seat. */}
                                      {isSpeaking && (
                                        <span className="absolute -inset-2 rounded-full bg-emerald-400/40 blur-md animate-pulse pointer-events-none" />
                                      )}
                                      <div
                                        className={`relative rounded-full p-0.5 bg-stone-900 shadow-[0_8px_18px_rgba(0,0,0,0.7)] ${
                                          isSpeaking
                                            ? "ring-[3px] ring-emerald-300"
                                            : isMe
                                            ? "ring-2 ring-emerald-400"
                                            : "ring-2 ring-stone-700"
                                        }`}
                                      >
                                        <Avatar name={member.full_name} avatarUrl={member.avatar_url} size={44} />
                                      </div>
                                      {inVoice && (
                                        <span
                                          className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-emerald-600 border border-emerald-300 text-[8px] flex items-center justify-center shadow-md"
                                          title="Đang ở trong voice"
                                        >
                                          🎙️
                                        </span>
                                      )}
                                    </div>

                                    {/* Shoulders / torso */}
                                    <div
                                      className={`-mt-2 w-[56px] h-[44px] rounded-t-[28px] rounded-b-sm border-t border-x shadow-[0_10px_20px_rgba(0,0,0,0.6)] ${
                                        isMe
                                          ? "bg-gradient-to-b from-emerald-500 to-emerald-700 border-emerald-300"
                                          : "bg-gradient-to-b from-stone-600 to-stone-800 border-stone-500"
                                      }`}
                                    />

                                    {/* Chair back and legs */}
                                    <div className="w-[68px] h-2.5 -mt-0.5 rounded-md bg-stone-800 border border-stone-700" />
                                    <div className="flex gap-9">
                                      <span className="w-[3px] h-4 bg-stone-800 rounded-b-sm" />
                                      <span className="w-[3px] h-4 bg-stone-800 rounded-b-sm" />
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-1 flex items-center gap-1">
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-[8px] font-black text-white">
                                        Lv.{member.current_level}
                                      </span>
                                      <span className="text-[9px] font-black text-emerald-300">
                                        🔥 {member.weekly_lessons}
                                      </span>
                                    </div>
                                    <span className="text-[8px] font-black text-amber-300 truncate max-w-[92px]">
                                      {memberRole(member)}
                                    </span>
                                  </motion.div>
                                </div>
                              ) : (
                                /* Empty seat: the chair on its own, so the gap
                                   reads as "room for one more" rather than a
                                   rendering hole. */
                                <div
                                  className="absolute left-1/2 top-1/2 flex flex-col items-center"
                                  style={{ transform: `${place} translateY(${FLOOR_Y - 34}px) ${face}` }}
                                >
                                  <div className="w-[52px] h-[34px] rounded-t-xl border border-dashed border-stone-700 bg-stone-900/50" />
                                  <div className="w-[62px] h-2 rounded-md bg-stone-800/80 border border-stone-700" />
                                  <div className="flex gap-8">
                                    <span className="w-[3px] h-4 bg-stone-800/80" />
                                    <span className="w-[3px] h-4 bg-stone-800/80" />
                                  </div>
                                  <span className="mt-1 text-[8px] font-bold uppercase text-stone-500">Ghế trống</span>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </motion.div>
                  </div>
                </div>

                {/* Footer hint */}
                <div className="relative z-30 shrink-0 text-center text-[10px] text-stone-400 font-semibold pt-1">
                  <span className="hidden sm:inline">
                    🖐️ Kéo chuột để xoay phòng 360° · 🔍 Lăn chuột để Zoom · Bấm 🔄 để về góc gốc
                  </span>
                  <span className="sm:hidden">👉 Vuốt ngang để xoay phòng · vuốt dọc để cuộn trang</span>
                  <span className="ml-1 tabular-nums">({Math.round(zoom3D * 100)}%)</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Group Chat Box Matched 80% Viewport Height */}
              <div
                className={`lg:col-span-5 ${
                  mobileTab === "chat" ? "flex" : "hidden lg:flex"
                } flex-col h-[78vh] min-h-[560px] sm:min-h-[640px] flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xl p-3 sm:p-3.5`}
              >
                {/* Sub-tab Navigation Header */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2 mb-2 shrink-0">
                  <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700 text-[10px] font-black">
                    <button
                      type="button"
                      onClick={() => setChatSubTab("chat")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        chatSubTab === "chat" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      💬 Trò chuyện
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatSubTab("notes")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        chatSubTab === "notes" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      📌 Ghi chú ({stickyNotes.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatSubTab("quiz")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        chatSubTab === "quiz" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      ⚡ Quiz Nhóm
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Live
                  </span>
                </div>
                {chatSubTab === "chat" && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="mb-2 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 shrink-0 text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1">
                      <span>💡</span>
                      <span>Nhắn 1 tin nhắn bất kỳ lên chat để tự động ghi nhận điểm danh nhóm hôm nay!</span>
                    </div>
                    {pinnedMessage && (
                      <div className="mb-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 shrink-0">
                        <p className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400">Tài Tài · Quản lý nhóm · Đã ghim</p>
                        <p className="text-[11px] text-stone-800 dark:text-stone-200 leading-snug truncate">{pinnedMessage.content}</p>
                      </div>
                    )}
                    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 p-3 space-y-2.5">
              {scrollMessages.length === 0 ? (
                <p className="text-xs text-stone-400 dark:text-stone-500 text-center py-8">
                  Chưa có tin nhắn nào. Chào các thành viên trong nhóm nhé!
                </p>
              ) : (
                scrollMessages.map((msg) => {
                  if (msg.is_bot) {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="max-w-[85%] rounded-xl px-3 py-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                          <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 mb-0.5">Tài Tài · Quản lý nhóm</p>
                          <p className="text-sm break-words text-stone-800 dark:text-stone-200">{msg.content}</p>
                        </div>
                      </div>
                    );
                  }
                  const isMine = msg.sender_id === user?.id;
                  const sender = msg.sender_id ? memberById.get(msg.sender_id) : undefined;
                  const senderName = sender?.full_name || "Thành viên";
                  const msgReactions = reactions[msg.id] || {};

                  // The quote is looked up live, so editing or deleting the
                  // original updates every reply that points at it. `null`
                  // here means the original is gone (reply_to_id was set to
                  // null by the FK) or is older than the loaded window.
                  const repliedTo = msg.reply_to_id ? messageById.get(msg.reply_to_id) ?? null : null;
                  const repliedToName = repliedTo?.is_bot
                    ? "Tài Tài"
                    : repliedTo?.sender_id
                    ? memberById.get(repliedTo.sender_id)?.full_name || "Thành viên"
                    : null;
                  const mainText = msg.content;

                  const isPending = isPendingMessage(msg);
                  const hasFailed = failedMessageIds.has(msg.id);
                  const isDragon = isMine && activeChatEffect === "chat_effect_dragon_fire";
                  const isDiamond = isMine && activeChatEffect === "chat_effect_diamond_glow";

                  return (
                    <div
                      key={msg.id}
                      id={`room-msg-${msg.id}`}
                      className={`group relative flex flex-col transition-colors duration-500 ${
                        isMine ? "items-end" : "items-start"
                      } ${highlightedMsgId === msg.id ? "bg-emerald-500/15 rounded-2xl -mx-1 px-1 py-0.5" : ""} ${
                        isPending && !hasFailed ? "opacity-60" : ""
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 max-w-[85%] w-fit min-w-0 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`relative rounded-2xl px-3.5 py-2 shadow-2xs w-fit ${
                          isDragon
                            ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-xs border-2 border-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.7)]"
                            : isDiamond
                            ? "bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white rounded-tr-xs border-2 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                            : isMine
                            ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-tr-xs"
                            : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs"
                        }`}>
                          {!isMine && (
                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                              {senderName}
                            </p>
                          )}

                          {/* Quoted message - tap to jump to the original */}
                          {msg.reply_to_id !== null && (
                            <button
                              type="button"
                              onClick={() => {
                                if (!repliedTo) return;
                                const el = document.getElementById(`room-msg-${repliedTo.id}`);
                                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                setHighlightedMsgId(repliedTo.id);
                                window.setTimeout(() => setHighlightedMsgId((cur) => (cur === repliedTo.id ? null : cur)), 1600);
                              }}
                              disabled={!repliedTo}
                              className="mb-1.5 w-full text-left p-1.5 rounded-lg border-l-2 border-emerald-400 bg-emerald-500/10 text-[11px] font-medium leading-snug disabled:cursor-default"
                            >
                              {repliedTo ? (
                                <>
                                  <span className="block font-bold opacity-90">↩️ {repliedToName}</span>
                                  <span className="block truncate opacity-75">
                                    {repliedTo.image_url && !repliedTo.content ? "[Hình ảnh]" : repliedTo.content}
                                  </span>
                                </>
                              ) : (
                                <span className="block italic opacity-60">↩️ Tin nhắn đã bị xoá</span>
                              )}
                            </button>
                          )}

                          <p className="text-sm break-words">{mainText}</p>
                        </div>

                        {/* 3-Dots Menu Trigger Button */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuMsgId(activeMenuMsgId === msg.id ? null : msg.id)}
                            className={`${isMine ? "opacity-70" : "opacity-0"} group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-pointer shadow-xs bg-white/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700 hover:scale-105`}
                            title="Tùy chọn tin nhắn"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {/* 3-Dots Dropdown Popup Menu */}
                          {activeMenuMsgId === msg.id && (
                            <div className={`absolute top-full mt-1 z-50 min-w-[165px] bg-white dark:bg-stone-900 rounded-2xl p-1.5 shadow-xl border border-stone-200 dark:border-stone-800 backdrop-blur-md text-xs space-y-1 ${isMine ? "right-0" : "left-0"}`}>
                              {/* Quick Emoji Reaction Row */}
                              <div className="flex items-center justify-between px-2 py-1 bg-stone-50 dark:bg-stone-800/60 rounded-xl mb-1 border border-stone-100 dark:border-stone-700/50">
                                {REACTION_EMOJIS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => {
                                      void toggleReaction(msg.id, emoji);
                                      setActiveMenuMsgId(null);
                                    }}
                                    className="hover:scale-130 transition-transform p-0.5"
                                    title={`Thả ${emoji}`}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() => {
                                  setReplyingTo({ id: msg.id, senderName: isMine ? "bạn" : senderName, content: msg.content });
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                <CornerUpLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Trả lời tin nhắn</span>
                              </button>

                              <button
                                onClick={() => {
                                  void togglePinMessage(msg);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                {msg.is_pinned ? <PinOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Pin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                                <span>{msg.is_pinned ? "Bỏ ghim tin nhắn" : "Ghim tin nhắn"}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void copyMessageText(mainText || msg.content);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                <Copy className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                                <span>Sao chép</span>
                              </button>

                              {isMine && (
                                <>
                                <button
                                  onClick={() => {
                                    setEditingMessage({ id: msg.id, content: mainText || msg.content });
                                    setMessageInput(mainText || msg.content);
                                    setReplyingTo(null);
                                    setActiveMenuMsgId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                                  <span>Sửa tin nhắn</span>
                                </button>

                                <button
                                  onClick={async () => {
                                    setActiveMenuMsgId(null);
                                    try {
                                      await deleteRoomMessage(msg.id);
                                      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                                      toast.success("Đã thu hồi tin nhắn thành công!");
                                    } catch (err) {
                                      toast.error("Không thể thu hồi tin nhắn này");
                                    }
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold transition-colors text-left"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Thu hồi tin nhắn</span>
                                </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Displayed Active Emoji Reactions */}
                      {Object.keys(msgReactions).length > 0 && (
                        <div className={`flex flex-wrap gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
                          {Object.entries(msgReactions).map(([emoji, userIds]) => {
                            const count = userIds.length;
                            if (count === 0) return null;
                            const hasMyReaction = user?.id ? userIds.includes(user.id) : false;
                            return (
                              <button
                                key={emoji}
                                onClick={() => void toggleReaction(msg.id, emoji)}
                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                  hasMyReaction
                                    ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                                    : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
                                }`}
                              >
                                <span>{emoji}</span>
                                <span>{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {isMine && (
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-stone-400 dark:text-stone-500 whitespace-nowrap">
                          <CheckCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span className="whitespace-nowrap">{myRoomMembers.length > 1 ? "Đã xem" : "Đã gửi"}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Replying Banner Preview */}
            {replyingTo && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200 mt-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">💬 Đang trả lời {replyingTo.senderName}:</span>
                  <p className="truncate text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{replyingTo.content}</p>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full cursor-pointer"
                  title="Hủy trả lời"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {editingMessage && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-stone-800 dark:text-stone-200 mt-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-sky-600 dark:text-sky-400">Đang sửa tin nhắn:</span>
                  <p className="truncate text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{editingMessage.content}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingMessage(null);
                    setMessageInput("");
                  }}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full cursor-pointer"
                  title="Hủy sửa"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void handleSendMessage();
                  }
                }}
                placeholder={editingMessage ? "Chỉnh lại nội dung tin nhắn..." : replyingTo ? `Viết câu trả lời cho ${replyingTo.senderName}...` : "Nhắn gì đó cho nhóm... hoặc /taitai"}
                maxLength={2000}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
              <button
                onClick={() => void handleSendMessage()}
                disabled={sendingMessage || !messageInput.trim()}
                className="shrink-0 w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {chatSubTab === "notes" && (
          <div className="flex-1 flex flex-col min-h-0 space-y-3">
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Dán ghi chú công thức hoặc mẹo học cho cả nhóm..."
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void handleAddNote()}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500 cursor-pointer shrink-0"
              >
                + Dán Ghi Chú
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {stickyNotes.length === 0 ? (
                <div className="h-full min-h-[180px] rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 flex items-center justify-center text-center px-6">
                  <p className="text-xs font-bold text-stone-500 dark:text-stone-400">
                    Chưa có ghi chú nào. Dán công thức, checklist hoặc câu hỏi để cả phòng cùng thấy.
                  </p>
                </div>
              ) : (
                stickyNotes.map((note) => {
                  const author = memberById.get(note.author_id);
                  const isAuthor = note.author_id === user?.id;
                  return (
                    <div key={note.id} className={`p-3 rounded-2xl border ${noteColorClass(note.color)} text-xs space-y-1 shadow-xs`}>
                      <div className="flex items-center justify-between gap-2 font-black text-[10px] opacity-80">
                        <span className="truncate">📌 {isAuthor ? "Bạn" : author?.full_name || "Thành viên"}</span>
                        <span className="shrink-0">{formatShortTime(note.created_at)}</span>
                      </div>
                      <p className="font-semibold leading-relaxed whitespace-pre-wrap break-words">{note.content}</p>
                      {isAuthor && (
                        <button
                          type="button"
                          onClick={() => void handleDeleteNote(note.id)}
                          className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-rose-600 dark:text-rose-300 hover:underline"
                        >
                          <Trash2 className="w-3 h-3" />
                          Xóa
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {chatSubTab === "quiz" && (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-1 space-y-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/15 border border-amber-500/40 text-xs space-y-1 shrink-0">
              <p className="font-black text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>⚡ THỬ THÁCH 3 PHÚT NHÓM HÔM NAY</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[9px]">Thưởng Rương +150 XP</span>
              </p>
              <p className="text-stone-600 dark:text-stone-300 text-[11px]">
                Mỗi lần làm quiz sẽ ghi điểm từng thành viên và cộng tiến độ nhiệm vụ quiz tuần.
              </p>
            </div>

            {!groupQuizSubmitted ? (
              <div className="space-y-4">
                {loadingGroupQuiz ? (
                  <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-6 text-center text-xs font-bold text-stone-500">
                    Đang lấy câu hỏi cho phòng...
                  </div>
                ) : groupQuizQuestions.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 p-6 text-center text-xs font-bold text-stone-500">
                    Chưa có câu hỏi phù hợp cho chủ đề này.
                  </div>
                ) : (
                  groupQuizQuestions.map((q, qIdx) => (
                    <div key={`${q.lessonId}-${qIdx}`} className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 space-y-2 text-xs">
                      <p className="font-black text-stone-900 dark:text-stone-100">
                        Câu {qIdx + 1}: {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => setGroupQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                              groupQuizAnswers[qIdx] === optIdx
                                ? "bg-emerald-500 text-stone-950 border-emerald-400 font-black"
                                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}

                <button
                  type="button"
                  onClick={() => void handleSubmitGroupQuiz()}
                  disabled={loadingGroupQuiz || groupQuizQuestions.length === 0 || Object.keys(groupQuizAnswers).length < groupQuizQuestions.length}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs transition-all cursor-pointer shadow-md"
                >
                  Nộp Bài Thi Nhóm
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="text-4xl">{groupQuizScore && groupQuizScore >= 80 ? "🎁" : "💪"}</div>
                <h4 className="font-black text-sm text-stone-900 dark:text-stone-100">
                  Kết quả Quiz Nhóm: {groupQuizScore}%
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {groupQuizScore && groupQuizScore >= 80 ? "Điểm rất ổn. Lượt này đã được lưu vào bảng quiz nhóm." : "Lượt này vẫn được tính vào nhiệm vụ quiz tuần, làm lại để cải thiện accuracy nhé."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGroupQuizSubmitted(false);
                    setGroupQuizAnswers({});
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
                >
                  Thử Lại
                </button>
              </div>
            )}
            {quizAttempts.length > 0 && (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 p-3 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Điểm quiz tuần này</p>
                {quizAttempts.slice(0, 5).map((attempt) => {
                  const member = memberById.get(attempt.user_id);
                  return (
                    <div key={attempt.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-stone-700 dark:text-stone-200 truncate">
                        {attempt.user_id === user?.id ? "Bạn" : member?.full_name || "Thành viên"}
                      </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                        {attempt.score}/{attempt.total} · {attempt.percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
              </div>
            </div>

      {/* Bottom Group Daily Recommended Lesson Widget */}
            <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/30 rounded-2xl p-3 sm:p-3.5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center text-lg shrink-0 shadow-xs">
                  🎯
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      MỤC TIÊU CẢ PHÒNG HÔM NAY
                    </span>
                    <span className="text-[10px] font-bold text-amber-300">🔥 Thưởng +50 XP / bài</span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-stone-100 mt-1">
                    Bài 12: Phân Tích Báo Cáo Dòng Tiền & Khả Năng Thanh Toán
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Vào Học Bài Này Ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-1">
                Ghép ngẫu nhiên
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                Chọn chủ đề, hệ thống sẽ ghép bạn vào một phòng còn trống hoặc tạo phòng mới nếu chưa có.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STUDY_ROOM_TOPICS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => void handleRandomMatch(t.id)}
                    disabled={busy}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    <Shuffle className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest">
                  Hoặc tự chọn phòng
                </h2>
                <div className="flex gap-1 bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
                  {STUDY_ROOM_TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setBrowseTopic(t.id)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-all ${
                        browseTopic === t.id
                          ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                          : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {loadingRooms ? (
                <p className="text-xs text-stone-400">Đang tải danh sách phòng...</p>
              ) : rooms.length === 0 ? (
                <p className="text-xs text-stone-400">
                  Chưa có phòng nào còn trống cho chủ đề này - bấm "Ghép ngẫu nhiên" ở trên để tạo phòng đầu tiên.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {rooms.map((room) => (
                    <div
                      key={room.room_id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Users className="w-4 h-4 text-stone-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            Phòng #{room.room_id} · {room.member_count}/{room.max_members} thành viên
                          </p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500">
                            {room.weekly_xp_progress}/{room.weekly_xp_goal} XP tuần này
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => void handleJoinRoom(room.room_id)}
                        disabled={busy}
                        className="shrink-0 px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                      >
                        Tham gia
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
