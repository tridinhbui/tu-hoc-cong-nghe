"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  getPinnedRoomMessage,
  ROOM_MESSAGE_PAGE_SIZE,
  requestStudyRoomBot,
  sendRoomMessage,
  setStudyRoomPomodoro,
  deleteRoomMessage,
  updateRoomMessage,
  setRoomMessagePinned,
  subscribeToRoomMessages,
  subscribeToStudyRoomMembers,
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
import { getRoomLighting } from "@/lib/study-room-lighting";
import StudyRoomWorld from "@/components/study-room/StudyRoomWorld";
import { getEquippedGear } from "@/lib/supabase-equipment";
import { colorForUser } from "@/lib/supabase-lobby";
import type { CharacterEquipments } from "@/lib/rpg-items";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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

/** Camera limits, shared by the drag gesture, the wheel and the keyboard so the
 *  three can never disagree about how far the room may be turned. Pitch stops
 *  short of the floor plane at both ends: past ~65° the seats occlude each
 *  other, below -10° the camera slides under the floor. */
const PITCH_MIN = -10;
const PITCH_MAX = 65;
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.85;
/** Per-keypress camera steps. Deliberately coarse - a keyboard user wants to
 *  reach the far side of the table in a few presses, not sixty. */
const KEY_YAW_STEP = 15;
const KEY_PITCH_STEP = 8;
const KEY_ZOOM_STEP = 0.12;

/** Degrees of yaw per pixel of horizontal drag. Momentum reuses it so a flick
 *  glides at exactly the speed the finger was already turning the room. */
const YAW_DEG_PER_PX = 0.5;
/** Minimum release speed (px/ms) that counts as a flick rather than a stop. */
const MIN_FLICK_VELOCITY = 0.15;
/** Velocity retained per 60fps frame, and the speed at which the glide ends.
 *  0.94^60 ≈ 0.024, so a flick coasts for roughly a second. */
const MOMENTUM_DECAY = 0.94;
const MOMENTUM_STOP_VELOCITY = 0.02;

/** How long a newly seated member stays highlighted. */
const ARRIVAL_HIGHLIGHT_MS = 2600;
/** Roster poll interval - see the live-roster effect for why it exists
 *  alongside the realtime subscription. */
const ROSTER_POLL_MS = 25_000;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Everything about a roster that the seats actually draw. The poll below
 *  re-fetches every 25s whether or not anything moved; comparing this lets an
 *  unchanged answer cost nothing instead of re-rendering the whole room. */
const rosterSignature = (members: StudyRoomMember[]) =>
  members
    .map((m) => `${m.user_id}:${m.full_name}:${m.avatar_url}:${m.current_level}:${m.weekly_lessons}`)
    .join("|");

/** Study stations standing around the room. Each one can be lit up once per
 *  session - the "+15% XP" is flavour, so the only real state worth keeping is
 *  which ones this visitor has already touched, to stop the toast firing on
 *  every idle click. */
function quickCheersOf(t: Dictionary) {
  const d = t.dataRest.studyGroupsClient.quickCheers;
  return [
    { emoji: "👋", label: d.clap.label, message: d.clap.message },
    { emoji: "❤️", label: d.heart.label, message: d.heart.message },
    { emoji: "🔔", label: d.reminder.label, message: d.reminder.message },
    { emoji: "🔥", label: d.boost.label, message: d.boost.message },
  ];
}

function holoPylonsOf(t: Dictionary) {
  const d = t.dataRest.studyGroupsClient.holoPylons;
  return [
    { id: "valuation" as const, name: d.valuation, icon: "🏰", angle: 42 },
    { id: "trading" as const, name: d.trading, icon: "🏛️", angle: 138 },
    { id: "cashflow" as const, name: d.cashflow, icon: "⚓", angle: 222 },
    { id: "fed" as const, name: d.fed, icon: "⚡", angle: 318 },
  ];
}

// "Học cùng nhóm": small (default cap 5) topic-based groups, either
// randomly matched into an open room or picked manually from the browse
// list - unlike the 1:1 referral loop this is meant to stay ongoing (a
// shared weekly goal + mini leaderboard), not a one-time invite. Every
// Monday, everyone active in the last 7 days gets auto-placed into a fresh
// random room for their preferred track (see the weekly-study-match cron +
// weekly_rematch_study_rooms()) - the manual join/browse UI below stays as
// the opt-out path for anyone who wants to switch mid-week.
export default function StudyGroupsClient({ embedded = false }: { embedded?: boolean } = {}) {
  const { t } = useI18n();
  const quickCheers = useMemo(() => quickCheersOf(t), [t]);
  const holoPylons = useMemo(() => holoPylonsOf(t), [t]);
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
  /** Căn phòng đi lại được là mặc định: nó là căn phòng thật, có người khác
   *  đang đứng trong đó và đi tới chỗ họ được. Bàn học CSS bên dưới vẫn giữ
   *  nguyên vì nó chở những thứ căn phòng 3D không chở: sơ đồ ghế theo hạng,
   *  hiệu ứng cổ vũ, huy hiệu vừa-vào-phòng. */
  const [walkMode, setWalkMode] = useState(true);
  /** Đồ trang bị cho nhân vật trong phòng đi lại được. Nạp một lần khi biết
   *  người dùng là ai; hỏng thì vào phòng tay không, không phải không vào. */
  const [gear, setGear] = useState<CharacterEquipments>({});
  const [rotation3D, setRotation3D] = useState<{ x: number; y: number }>({ x: 20, y: 0 });
  const [zoom3D, setZoom3D] = useState<number>(1.0);
  const [isDragging3D, setIsDragging3D] = useState(false);
  const [activeMapNode, setActiveMapNode] = useState<string | null>(null);
  /** Pylons already lit this session, so a second click acknowledges instead of
   *  re-announcing a boost that was never granted twice. */
  const [litPylons, setLitPylons] = useState<Set<string>>(new Set());
  /** Honour the OS "reduce motion" setting: every idle float, spin and pulse in
   *  the room is decoration, so all of it is safe to simply switch off. A room
   *  with five bobbing avatars, a spinning table ring and a breathing lamp is
   *  exactly the kind of surface that setting exists for. */
  const reduceMotion = useReducedMotion() ?? false;
  /** Idle float for one seated member, staggered so the room doesn't pulse in
   *  unison. Returns a static prop set when motion is reduced. */
  const seatFloat = (idx: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -3, 0], rotate: [-0.8, 0.8, -0.8] },
          transition: {
            duration: 2.6 + idx * 0.35,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationStartRef = useRef<{ x: number; y: number }>({ x: 20, y: 0 });
  /** Whether the current pointer gesture belongs to the stage yet - see
   *  handleStageMouseDown. Kept in a ref so the decision survives the moves
   *  that happen before React re-renders. */
  const gestureRef = useRef<{ active: boolean; captured: boolean }>({ active: false, captured: false });
  /** In-flight momentum frame, so a new grab can cut the glide short. */
  const momentumRafRef = useRef<number | null>(null);
  /** Rolling pointer sample used to derive a release velocity. `v` is px/ms,
   *  smoothed, so one jittery final sample can't decide the whole glide. */
  const flickRef = useRef<{ x: number; t: number; v: number }>({ x: 0, t: 0, v: 0 });

  const stopMomentum = () => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  };

  /** Coast the yaw to a stop after a flick. Nothing else about the camera
   *  moves - pitch and zoom have no inertia, because neither is a gesture you
   *  throw. */
  const glideYaw = (initialVelocity: number) => {
    let velocity = initialVelocity;
    let last = performance.now();

    const step = (now: number) => {
      // A backgrounded tab can hand back a dt of seconds; clamping keeps the
      // room from teleporting when the user returns to it.
      const dt = Math.min(now - last, 32);
      last = now;
      setRotation3D((prev) => ({ ...prev, y: prev.y + velocity * dt * YAW_DEG_PER_PX }));
      velocity *= Math.pow(MOMENTUM_DECAY, dt / 16.67);
      if (Math.abs(velocity) < MOMENTUM_STOP_VELOCITY) {
        momentumRafRef.current = null;
        return;
      }
      momentumRafRef.current = requestAnimationFrame(step);
    };

    momentumRafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => stopMomentum, []);

  const handleStageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setZoom3D((prev) => clamp(prev - e.deltaY * 0.0015, ZOOM_MIN, ZOOM_MAX));
  };

  const resetCamera = () => {
    setRotation3D({ x: 20, y: 0 });
    setZoom3D(1.0);
  };

  /** Arrow keys orbit, +/- zoom, 0 resets. Without this the room could only be
   *  turned by dragging, which left every seat but the near ones unreachable
   *  for anyone not using a mouse or touchscreen. */
  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const nudge = (dx: number, dy: number) =>
      setRotation3D((prev) => ({
        x: clamp(prev.x + dx, PITCH_MIN, PITCH_MAX),
        y: prev.y + dy,
      }));

    switch (e.key) {
      case "ArrowLeft":
        nudge(0, -KEY_YAW_STEP);
        break;
      case "ArrowRight":
        nudge(0, KEY_YAW_STEP);
        break;
      case "ArrowUp":
        nudge(KEY_PITCH_STEP, 0);
        break;
      case "ArrowDown":
        nudge(-KEY_PITCH_STEP, 0);
        break;
      case "+":
      case "=":
        setZoom3D((prev) => clamp(prev + KEY_ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));
        break;
      case "-":
      case "_":
        setZoom3D((prev) => clamp(prev - KEY_ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));
        break;
      case "0":
        resetCamera();
        break;
      default:
        return;
    }
    // Only reached when a key was handled, so arrow-key page scrolling is
    // suppressed over the stage but left alone everywhere else.
    e.preventDefault();
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
            toast.success(t.studyGroups.breakStarted);
          } else {
            setPomoMode("focus");
            setPomoSeconds(25 * 60);
            if (myRoom?.room_id) void setStudyRoomPomodoro(myRoom.room_id, "focus", false, 25 * 60, 25 * 60).catch(() => {});
            toast.info(t.studyGroups.focusStarted);
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
      toast.info(t.studyGroups.lofiOff);
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
      toast.success(format(t.studyGroups.lofiOn, { track: lofiTrack.toUpperCase() }));
    } catch {
      toast.error(t.studyGroups.lofiFailed);
    }
  };

  const handleStageMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const isTouch = "touches" in e;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    // Grabbing the room mid-glide should catch it, not fight it.
    stopMomentum();
    dragStartRef.current = { x: clientX, y: clientY };
    rotationStartRef.current = { ...rotation3D };
    flickRef.current = { x: clientX, t: performance.now(), v: 0 };
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

    const now = performance.now();

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
      // Restart velocity sampling here, not at mousedown: someone who presses,
      // hesitates, then flicks would otherwise divide the flick by all the
      // time they spent holding still, and get no momentum at all.
      // (sampleMs is 0 on this pass, so the block below skips itself and the
      // rotation still applies on the very move that captured the gesture.)
      flickRef.current = { x: clientX, t: now, v: 0 };
    }

    const sampleMs = now - flickRef.current.t;
    if (sampleMs > 0) {
      const instant = (clientX - flickRef.current.x) / sampleMs;
      flickRef.current = { x: clientX, t: now, v: flickRef.current.v * 0.6 + instant * 0.4 };
    }

    setRotation3D({
      x: clamp(rotationStartRef.current.x - deltaY * 0.4, PITCH_MIN, PITCH_MAX),
      y: rotationStartRef.current.y + deltaX * YAW_DEG_PER_PX,
    });
  };

  const handleStageMouseUp = () => {
    const wasRotating = gestureRef.current.captured;
    gestureRef.current = { active: false, captured: false };
    setIsDragging3D(false);

    // Consume the sample either way, so a later mouseleave that never rotated
    // anything can't relaunch the previous drag's momentum.
    const velocity = flickRef.current.v;
    flickRef.current.v = 0;
    if (wasRotating && !reduceMotion && Math.abs(velocity) >= MIN_FLICK_VELOCITY) {
      glideYaw(velocity);
    }
  };

  const handlePylonClick = (id: string, name: string) => {
    setActiveMapNode(id);
    if (litPylons.has(id)) {
      toast.info(format(t.studyGroups.stationLit, { name }));
      return;
    }
    setLitPylons((prev) => new Set(prev).add(id));
    toast.success(format(t.studyGroups.stationActivated, { name }));
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

  /** Ids present in the roster on the previous fetch. Seeded by the first
   *  successful load, so opening a room you were already in doesn't play five
   *  join animations at once - after that, anything unseen genuinely just
   *  walked in. */
  const seenMemberIdsRef = useRef<Set<string> | null>(null);
  /** Signature of the roster currently on screen - see rosterSignature. */
  const rosterSignatureRef = useRef<string | null>(null);
  const [arrivingIds, setArrivingIds] = useState<Set<string>>(new Set());
  const arrivalTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (arrivalTimerRef.current !== null) window.clearTimeout(arrivalTimerRef.current);
    },
    []
  );

  /** Swap in a freshly fetched roster, flagging anyone who wasn't in the last
   *  one so their seat can announce itself. */
  const applyRoster = useCallback((members: StudyRoomMember[]) => {
    const signature = rosterSignature(members);
    if (signature === rosterSignatureRef.current) return;
    rosterSignatureRef.current = signature;

    const previous = seenMemberIdsRef.current;
    seenMemberIdsRef.current = new Set(members.map((m) => m.user_id));
    setMyRoomMembers(members);

    if (previous === null) return;
    const arrivals = members.filter((m) => !previous.has(m.user_id));
    if (arrivals.length === 0) return;

    setArrivingIds(new Set(arrivals.map((m) => m.user_id)));
    if (arrivalTimerRef.current !== null) window.clearTimeout(arrivalTimerRef.current);
    arrivalTimerRef.current = window.setTimeout(() => setArrivingIds(new Set()), ARRIVAL_HIGHLIGHT_MS);

    // One collapsed toast, not one per arrival: the Monday re-match can seat
    // four strangers at once, and four stacked toasts would bury the room.
    const names = arrivals.map((m) => m.full_name || t.studyGroups.memberRole);
    toast.success(
      names.length === 1
        ? format(t.studyGroups.arrivedOne, { name: names[0] })
        : format(t.studyGroups.arrivedMany, { count: names.length, names: names.join(", ") })
    );
  }, []);

  // Keep the seated roster live. It used to be fetched exactly three times -
  // on mount and after a join - so anyone who arrived while you sat in the
  // room never showed up: their seat kept reading "Ghế trống" even while
  // their voice indicator lit up, because LiveKit presence updates live and
  // the roster did not.
  useEffect(() => {
    const roomId = myRoom?.room_id;
    if (!roomId) return;

    let cancelled = false;
    const pull = async () => {
      try {
        const members = await getStudyRoomMembers(roomId);
        if (!cancelled) applyRoster(members);
      } catch {
        // A dropped roster refresh isn't worth interrupting anyone over; the
        // next tick recovers.
      }
    };

    const unsubscribe = subscribeToStudyRoomMembers(roomId, () => void pull());
    // Realtime only fires if study_room_members is in the supabase_realtime
    // publication. The poll is the floor: one RPC per interval, skipped while
    // the tab is hidden, and it makes the roster converge either way.
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void pull();
    }, ROSTER_POLL_MS);

    return () => {
      cancelled = true;
      unsubscribe();
      window.clearInterval(interval);
    };
  }, [myRoom?.room_id, applyRoster]);

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

  /** useCallback rather than a plain function because it now closes over
   *  applyRoster, which makes it a reactive value the init effect has to
   *  depend on. Both are stable, so nothing actually re-runs. */
  const refreshMyRoom = useCallback(async () => {
    const room = await getMyStudyRoom();
    setMyRoom(room);
    if (room) {
      const members = await getStudyRoomMembers(room.room_id);
      applyRoster(members);
    } else {
      seenMemberIdsRef.current = null;
      rosterSignatureRef.current = null;
      setMyRoomMembers([]);
    }
  }, [applyRoster]);

  async function refreshBrowseList(topic: StudyRoomTopic) {
    setLoadingRooms(true);
    try {
      const list = await getStudyRooms(topic);
      setRooms(list);
    } catch (error) {
      console.error("Error loading study rooms:", error);
      toast.error(error instanceof Error ? error.message : t.studyGroups.roomsLoadFailed);
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
      toast.success(t.studyGroups.cheerSent);
    } catch {
      toast.error(t.studyGroups.cheerFailed);
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
      // Đồ trang bị đọc từ user_equipments - cùng bảng mà bản đồ game dùng,
      // nên cởi mũ ở /game thì nhân vật ở đây cũng bỏ mũ.
      void getEquippedGear(session.user.id).then(setGear).catch(() => {});
      try {
        await refreshMyRoom();
      } catch (error) {
        console.error("Error loading study room:", error);
      }
      setLoading(false);
    };
    void init();
  }, [router, supabase.auth, refreshMyRoom]);

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
    Promise.all([
      getRoomMessages(myRoom.room_id),
      getPinnedRoomMessage(myRoom.room_id),
      refreshRoomEngagement(myRoom.room_id),
    ])
      .then(([list, pinned]) => {
        if (cancelled) return;
        // The pin is merged in rather than appended: it is usually already in
        // the newest page, and duplicating it would render it twice.
        const merged = pinned && !list.some((m) => m.id === pinned.id) ? [pinned, ...list] : list;
        setMessages(merged);
        setHasOlderMessages(list.length >= ROOM_MESSAGE_PAGE_SIZE);
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

  const [hasOlderMessages, setHasOlderMessages] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  /** True while the reader is parked near the bottom of the log. */
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasUnseenBelow, setHasUnseenBelow] = useState(false);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  /** Within this many px of the bottom still counts as "following along". */
  const NEAR_BOTTOM_PX = 120;

  const handleMessagesScroll = useCallback(() => {
    const box = scrollBoxRef.current;
    if (!box) return;
    const distanceFromBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
    const near = distanceFromBottom <= NEAR_BOTTOM_PX;
    setIsNearBottom(near);
    if (near) setHasUnseenBelow(false);
  }, []);

  async function loadOlderMessages() {
    const box = scrollBoxRef.current;
    if (!myRoom || loadingOlder || !hasOlderMessages) return;

    const oldest = messages.filter((m) => m.id > 0).reduce<number | null>((min, m) => (min === null || m.id < min ? m.id : min), null);
    if (oldest === null) return;

    setLoadingOlder(true);
    const heightBefore = box?.scrollHeight ?? 0;
    try {
      const older = await getRoomMessages(myRoom.room_id, oldest);
      setHasOlderMessages(older.length >= ROOM_MESSAGE_PAGE_SIZE);
      if (older.length > 0) {
        setMessages((prev) => {
          const known = new Set(prev.map((m) => m.id));
          return [...older.filter((m) => !known.has(m.id)), ...prev];
        });
        // Prepending content pushes everything down; restoring the delta keeps
        // the message the reader was looking at under their eyes.
        requestAnimationFrame(() => {
          const el = scrollBoxRef.current;
          if (el) el.scrollTop += el.scrollHeight - heightBefore;
        });
      }
    } catch (error) {
      console.error("Error loading older messages:", error);
      toast.error(t.studyGroups.loadOlderFailed);
    } finally {
      setLoadingOlder(false);
    }
  }

  // Auto-scroll only when the reader is already at the bottom. Yanking someone
  // out of the history they are reading because a third party said "ok" is the
  // single most irritating thing a chat log can do.
  useEffect(() => {
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setHasUnseenBelow(true);
    }
    // isNearBottom is intentionally not a dependency: this should react to new
    // messages, not to the reader scrolling around.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toast.success(t.chat.copied);
    } catch {
      toast.error(t.chat.copyFailed);
    }
  }

  async function togglePinMessage(msg: StudyRoomMessage) {
    try {
      const updated = await setRoomMessagePinned(msg.id, !msg.is_pinned);
      setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      toast.success(updated.is_pinned ? t.studyGroups.pinned : t.studyGroups.unpinned);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.pinFailed);
    }
  }

  const toggleReaction = async (msgId: number, emoji: string) => {
    if (!user?.id || !myRoom) return;
    try {
      const next = await toggleStudyRoomReaction(myRoom.room_id, msgId, emoji);
      setReactions(next);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.reactionFailed);
    }
  };

  async function handleManualCheckin() {
    if (!myRoom) return;
    try {
      await recordStudyRoomCheckin(myRoom.room_id, "manual");
      await refreshRoomEngagement(myRoom.room_id);
      toast.success(t.studyGroups.checkedIn);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.checkinFailed);
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
      toast.info(nextRunning ? t.studyGroups.pomodoroSyncOn : t.studyGroups.pomodoroSyncOff);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.pomodoroSyncFailed);
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
      toast.error(error instanceof Error ? error.message : t.studyGroups.chestFailed);
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
      toast.success(t.studyGroups.noteAdded);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.noteSaveFailed);
    }
  }

  async function handleDeleteNote(noteId: number) {
    try {
      await deleteStudyRoomNote(noteId);
      setStickyNotes((prev) => prev.filter((note) => note.id !== noteId));
      toast.success(t.studyGroups.noteDeleted);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.noteDeleteFailed);
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
        toast.success(format(t.studyGroups.quizScoreGood, { score }));
      } else {
        toast.info(format(t.studyGroups.quizScoreKeepGoing, { score }));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.quizScoreSaveFailed);
    }
  }

  function memberRole(member: StudyRoomMember) {
    if (member.user_id === roomLeaderId) return t.studyGroups.roleLeader;
    if (member.current_level >= 10) return t.studyGroups.roleMentor;
    if (member.weekly_lessons >= 3) return t.studyGroups.roleActive;
    return t.studyGroups.memberRole;
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
        toast.success(t.chat.edited);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t.studyGroups.messageEditFailed);
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
        toast.error(error instanceof Error ? error.message : t.studyGroups.taitaiFailed);
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
              file_url: null,
              file_name: null,
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
      toast.success(t.studyGroups.matched);
      await refreshMyRoom();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.matchFailed);
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
      toast.success(t.studyGroups.joined);
      await refreshMyRoom();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.joinFailed);
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave() {
    if (busy) return;
    setBusy(true);
    try {
      await leaveStudyRoom();
      toast.success(t.studyGroups.left);
      setMyRoom(null);
      seenMemberIdsRef.current = null;
      rosterSignatureRef.current = null;
      setMyRoomMembers([]);
      await refreshBrowseList(browseTopic);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.studyGroups.leaveFailed);
    } finally {
      setBusy(false);
    }
  }

  // Bảng ánh sáng theo giờ thật của người học. Đọc đồng hồ ở đây an toàn: mọi
  // lần render trên server đều dừng ở nhánh `loading` ngay dưới, nên không có
  // bản HTML nào của căn phòng để lệch khi hydrate.
  const lighting = getRoomLighting(new Date().getHours());

  if (loading) {
    return (
      <div className={`${embedded ? "min-h-[320px]" : "min-h-screen bg-white dark:bg-stone-950"} flex items-center justify-center`}>
        <p className="text-stone-500 dark:text-stone-400">{t.studyGroups.loading}</p>
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
            {t.studyGroups.back}
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">{t.studyGroups.title}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {t.studyGroups.subtitle}
          </p>
        </div>
      </div>
      )}

      <div className={`${embedded ? "flex flex-col lg:h-full lg:overflow-hidden" : "max-w-7xl mx-auto px-3 sm:px-4 py-3 min-h-[calc(100vh-4rem)] flex flex-col font-sans"}`}>
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
                    {format(t.studyGroups.roomHeader, { topic: topicLabel(myRoom.topic), count: myRoom.member_count, max: myRoom.max_members })}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-20 sm:w-32 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (myRoom.weekly_xp_progress / Math.max(1, myRoom.weekly_xp_goal)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {format(t.studyGroups.xpProgress, { current: myRoom.weekly_xp_progress, goal: myRoom.weekly_xp_goal })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center/Right Action Bar: Group Co-Pomodoro + Lofi Focus Sound + Mic Toggle + Mobile Segmented Tab Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* ⏱️ Group Co-Pomodoro Timer Widget */}
                <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-stone-700 text-[10px] font-mono font-black">
                  <span className={pomoRunning ? "animate-pulse text-emerald-500" : "text-amber-500"}>
                    {pomoMode === "focus" ? t.studyGroups.pomodoroFocus : t.studyGroups.pomodoroBreak}
                  </span>
                  <span className="text-stone-900 dark:text-stone-100 font-extrabold">{formatPomoTime(pomoSeconds)}</span>
                  <button
                    type="button"
                    onClick={() => void handleTogglePomodoro()}
                    className="ml-0.5 text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {pomoRunning ? t.studyGroups.pomodoroPause : t.studyGroups.pomodoroStart}
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
                  title={t.studyGroups.lofiToggleTitle}
                >
                  <span>🎧</span>
                  <span className="hidden sm:inline">{lofiPlaying ? t.studyGroups.lofiPlaying : t.studyGroups.lofiIdle}</span>
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
                      title={t.studyGroups.micToggleTitle}
                    >
                      <span>{voice.micEnabled ? "🎙️" : "🔇"}</span>
                      <span className="hidden md:inline">{voice.micEnabled ? t.studyGroups.micOn : t.studyGroups.micOff}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void voice.leave()}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border bg-rose-500 text-white border-rose-400 transition-all cursor-pointer"
                      title={t.studyGroups.leaveVoiceTitle}
                    >
                      <span>📴</span>
                      <span className="hidden md:inline">{format(t.studyGroups.leaveVoice, { count: voice.participantIds.length })}</span>
                    </button>
                    {voice.needsAudioUnlock && (
                      <button
                        type="button"
                        onClick={() => void voice.unlockAudio()}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border bg-amber-500 text-stone-950 border-amber-400 animate-pulse cursor-pointer"
                        title={t.studyGroups.autoplayBlockedTitle}
                      >
                        {t.studyGroups.autoplayBlocked}
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
                        ? t.studyGroups.voiceUnavailableTitle
                        : t.studyGroups.voiceJoinTitle
                    }
                  >
                    <span>🎙️</span>
                    <span className="hidden md:inline">
                      {voice.status === "connecting"
                        ? t.studyGroups.voiceJoining
                        : voice.status === "unavailable"
                        ? t.studyGroups.voiceDisabled
                        : t.studyGroups.voiceJoin}
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
                    {t.studyGroups.tab3d}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab("chat")}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      mobileTab === "chat" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs" : "text-stone-500"
                    }`}
                  >
                    {t.studyGroups.tabChat}
                  </button>
                </div>

                <button
                  onClick={handleLeave}
                  disabled={busy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.studyGroups.leaveRoom}</span>
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
                  <p className="flex flex-wrap items-center gap-1.5 font-extrabold text-stone-900 dark:text-stone-100">
                    <span>{t.studyGroups.questsTitle}</span>
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                      {isPermanentRoom
                        ? t.studyGroups.permanentGroup
                        : format(t.studyGroups.streakWeeks, { weeks: groupStreakWeeks })}
                    </span>
                  </p>
                  <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-tight mt-0.5">
                    {t.studyGroups.questsHint}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void handleManualCheckin()}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-xs cursor-pointer shrink-0 active:scale-95 flex items-center gap-1"
              >
                <span>{t.studyGroups.checkInNow}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {missions.length === 0 ? (
                <div className="md:col-span-3 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-3 text-xs font-bold text-stone-500 dark:text-stone-400">
                  {t.studyGroups.questsEmpty}
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
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
              {/* LEFT COLUMN: 3D Spatial Table Stage 80% Viewport Height with Mouse Wheel Zoom */}
              {/* Ở chế độ đi lại, KHÔNG gắn các handler xoay phòng: chúng và
                  camera quỹ đạo của cảnh three.js cùng nghe một cú kéo chuột,
                  và khi cả hai cùng phản ứng thì căn phòng vừa xoay theo CSS
                  vừa xoay theo camera - chóng mặt và không điều khiển nổi. */}
              <div
                onMouseDown={walkMode ? undefined : handleStageMouseDown}
                onMouseMove={walkMode ? undefined : handleStageMouseMove}
                onMouseUp={walkMode ? undefined : handleStageMouseUp}
                onMouseLeave={walkMode ? undefined : handleStageMouseUp}
                onTouchStart={walkMode ? undefined : handleStageMouseDown}
                onTouchMove={walkMode ? undefined : handleStageMouseMove}
                onTouchEnd={walkMode ? undefined : handleStageMouseUp}
                onWheel={walkMode ? undefined : handleStageWheel}
                onKeyDown={walkMode ? undefined : handleStageKeyDown}
                tabIndex={walkMode ? -1 : 0}
                role="group"
                aria-label={
                  walkMode
                    ? t.studyGroups.stageAriaWalk
                    : t.studyGroups.stageAriaDesk
                }
                className={`lg:col-span-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  mobileTab === "3d" ? "flex" : "hidden lg:flex"
                } flex-col h-[64vh] min-h-[440px] sm:h-[74vh] sm:min-h-[600px] lg:h-[78vh] lg:min-h-[640px] flex-1 rounded-2xl border border-stone-800 bg-stone-950 p-3 sm:p-4 shadow-2xl relative overflow-hidden text-white justify-between select-none transition-colors ${
                  walkMode ? "" : isDragging3D ? "cursor-grabbing border-emerald-500/70" : "cursor-grab"
                }`}
                // touchAction "pan-y" is the other half of the scroll fix in
                // handleStageMouseDown: the browser keeps vertical panning
                // (the page scrolls normally over the room) and hands us the
                // horizontal axis, which is the one we turn into rotation.
                style={{ perspective: "900px", perspectiveOrigin: "50% 38%", touchAction: "pan-y" }}
              >

                {/* Stage Header Controls
                    Bọc dòng thay vì một hàng ngang cứng. Trên máy 375px, cái
                    nhãn dài cộng hai nút cộng thanh cổ vũ vượt xa bề ngang màn
                    hình, mà thẻ sân khấu lại `overflow-hidden` - nên phần bên
                    phải, tức thanh cổ vũ, bị cắt mất khỏi màn hình chứ không
                    xuống dòng. Ba thứ giữ nó lại: cho phép wrap, `min-w-0` để
                    cụm trái được co, và giấu bớt phần nhãn ở màn hẹp. */}
                <div className="relative z-30 mb-1 flex shrink-0 flex-wrap items-center justify-between gap-1.5">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="max-w-full truncate text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 backdrop-blur-md">
                      {walkMode ? t.studyGroups.modeWalk : t.studyGroups.modeDesk}
                      {/* Chủ đề và buổi trong ngày là thông tin phụ: trên màn
                          hẹp chúng đẩy cả hàng vỡ ra, và cả hai đều đã hiện ở
                          chỗ khác trong trang. */}
                      <span className="hidden sm:inline">
                        {" · "}
                        {topicLabel(myRoom.topic).toUpperCase()} · {lighting.label.toUpperCase()}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWalkMode((prev) => !prev);
                      }}
                      className="text-[9px] font-bold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 px-2 py-0.5 rounded-full border border-emerald-500/40 transition-all cursor-pointer"
                      title={walkMode ? t.studyGroups.viewDeskTitle : t.studyGroups.viewWalkTitle}
                    >
                      {walkMode ? t.studyGroups.viewDesk : t.studyGroups.viewWalk}
                    </button>
                    {!walkMode && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetCamera();
                        }}
                        className="text-[9px] font-bold text-stone-300 bg-stone-900/90 hover:bg-stone-800 px-2 py-0.5 rounded-full border border-stone-700 transition-all cursor-pointer"
                        title={t.studyGroups.resetViewTitle}
                        aria-label={format(t.studyGroups.resetViewAria, { zoom: Math.round(zoom3D * 100) })}
                      >
                        {format(t.studyGroups.resetView, { zoom: Math.round(zoom3D * 100) })}
                      </button>
                    )}
                  </div>

                  {/* Quick Cheer Actions Bar */}
                  <div className="flex shrink-0 items-center gap-0.5 rounded-xl border border-stone-800 bg-stone-900/90 px-1.5 py-0.5 shadow-xs backdrop-blur-md sm:gap-1 sm:px-2">
                    <span className="text-[9px] font-bold text-stone-400 mr-1 hidden sm:inline">{t.studyGroups.cheerLabel}</span>
                    {quickCheers.map((cheer) => (
                      <button
                        key={cheer.emoji}
                        type="button"
                        onClick={() => void handleQuickCheer(cheer.message)}
                        className="cursor-pointer p-0.5 text-xs transition-transform hover:scale-125 sm:p-1"
                        title={`${cheer.label} ${cheer.emoji}`}
                        aria-label={format(t.studyGroups.cheerAria, { label: cheer.label })}
                      >
                        {cheer.emoji}
                      </button>
                    ))}
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
                {walkMode && user ? (
                  <div className="relative flex-1 min-h-0 w-full">
                    <StudyRoomWorld
                      roomId={myRoom.room_id}
                      userId={user.id}
                      name={myMemberRow?.full_name || t.studyGroups.noteAuthorYou}
                      avatarUrl={myMemberRow?.avatar_url ?? null}
                      level={myMemberRow?.current_level ?? 1}
                      weeklyLessons={myMemberRow?.weekly_lessons ?? 0}
                      weeklyXpProgress={myRoom.weekly_xp_progress}
                      weeklyXpGoal={myRoom.weekly_xp_goal}
                      missionLines={missions.map(
                        (m) => `${m.completed ? "✓" : "•"} ${m.title}: ${m.current_value}/${m.target_value}`
                      )}
                      topicLabel={topicLabel(myRoom.topic)}
                      gear={gear}
                      members={myRoomMembers.map((m) => ({
                        userId: m.user_id,
                        name: m.full_name || t.studyGroups.memberRole,
                        avatarUrl: m.avatar_url,
                        color: colorForUser(m.user_id),
                        level: m.current_level,
                      }))}
                      onExit={() => setWalkMode(false)}
                    />
                  </div>
                ) : (
                  <>
                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
                  {/* Lamp bloom and vignette stay outside the world: light is
                      screen-space, it shouldn't rotate with the furniture. */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 transition-[background] duration-700"
                    style={{
                      background: `radial-gradient(ellipse at 50% 32%, transparent 38%, rgba(0,0,0,${lighting.vignette}) 100%)`,
                    }}
                  />

                  {/* Weekly goal + reward chest. Deliberately a HUD card in the
                      corner rather than a billboard over the table: it is UI,
                      not furniture, and at the table it sat exactly at head
                      height - covering the two nearest faces and having its own
                      XP figure covered by their nameplates in turn. Out here it
                      also escapes the 3D rasterizer, so the text stays crisp
                      instead of shimmering as the room turns. */}
                  <div className="absolute left-0 bottom-0 z-30 w-40 rounded-2xl border border-emerald-400/40 bg-stone-950/85 backdrop-blur-md px-3 py-2.5 text-center shadow-[0_0_28px_rgba(16,185,129,0.25)]">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                      {t.studyGroups.weeklyGoalTitle}
                    </p>
                    <p className="text-sm font-black text-white mt-0.5 tabular-nums">
                      {format(t.studyGroups.weeklyGoalXp, { current: myRoom.weekly_xp_progress, goal: myRoom.weekly_xp_goal })}
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
                      className={`mt-2 w-full inline-flex items-center justify-center gap-1 text-[10px] font-extrabold px-2 py-1 rounded-full border transition-all cursor-pointer ${
                        rewardClaimed || isChestUnlocked
                          ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md"
                          : !allMissionsDone
                          ? "bg-stone-900/90 text-stone-500 border-stone-700 cursor-not-allowed"
                          : "bg-emerald-950/90 text-emerald-300 border-emerald-400/40 hover:bg-emerald-800"
                      }`}
                    >
                      {rewardClaimed || isChestUnlocked
                        ? t.studyGroups.chestOpened
                        : claimingReward
                        ? t.studyGroups.chestOpening
                        : t.studyGroups.chestClaim}
                    </button>
                  </div>

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
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full transition-[background] duration-700"
                          style={{ background: lighting.floorPool }}
                        />
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
                          background: lighting.backWall,
                          transition: "background 700ms ease",
                        }}
                      >
                        {/* Window onto a night skyline */}
                        <div
                          className="absolute top-9 left-12 w-[152px] h-[94px] rounded-md border-2 border-stone-700 transition-[background,box-shadow] duration-700"
                          style={{ background: lighting.windowSky, boxShadow: lighting.windowGlow }}
                        >
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
                        {/* Bookshelf, filling the one empty quadrant of the
                            back wall (window top-left, clock top-right,
                            whiteboard bottom-right). Book widths and hues are
                            derived from the index so the shelves look stocked
                            rather than tiled, with no random() to avoid a
                            different room on every re-render. */}
                        <div className="absolute bottom-[18px] left-10 w-[124px] rounded-sm border-2 border-stone-700 bg-stone-900/90 px-1 py-1 space-y-1">
                          {[0, 1, 2].map((shelf) => (
                            <div key={shelf} className="flex items-end gap-[2px] h-[22px] border-b border-stone-700/80">
                              {Array.from({ length: 7 }).map((_, book) => {
                                const seed = shelf * 7 + book;
                                return (
                                  <span
                                    key={book}
                                    className="rounded-t-[1px]"
                                    style={{
                                      width: 4 + (seed % 3) * 2,
                                      height: 13 + (seed % 5) * 2,
                                      background: `hsl(${(seed * 47) % 360} 34% ${26 + (seed % 3) * 7}%)`,
                                    }}
                                  />
                                );
                              })}
                            </div>
                          ))}
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
                                ? lighting.sideWallLeft
                                : lighting.sideWallRight,
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
                        {/* The shade owns no transform of its own, so it is
                            free to take a framer animation - boxShadow only,
                            which keeps the bloom alive without moving the
                            fixture off its cord. */}
                        <motion.div
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  boxShadow: [
                                    "0 10px 60px rgba(16,185,129,0.36)",
                                    "0 10px 78px rgba(16,185,129,0.48)",
                                    "0 10px 60px rgba(16,185,129,0.36)",
                                  ],
                                }
                          }
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-7 mx-auto rounded-b-[32px] bg-gradient-to-b from-stone-700 to-stone-900 border border-stone-600 shadow-[0_10px_60px_rgba(16,185,129,0.36)]"
                        />
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
                      {/* Tabletop, lying flat on its pedestal. A real <button>
                          rather than a clickable div: it is the largest hit
                          target in the room, and it was previously reachable
                          only with a mouse. */}
                      <button
                        type="button"
                        aria-label={t.studyGroups.boostAria}
                        className="absolute left-1/2 top-1/2 rounded-full border-2 border-emerald-400/60 cursor-pointer"
                        style={{
                          width: 208,
                          height: 208,
                          transform: `translate(-50%, -50%) translateY(${FLOOR_Y - 74}px) rotateX(90deg)`,
                          background:
                            "radial-gradient(circle at 38% 32%, #2c2724 0%, #1c1917 48%, #0a0908 100%)",
                          boxShadow: "0 0 54px rgba(16,185,129,0.22)",
                        }}
                        onClick={() => toast.success(t.studyGroups.boostDone)}
                      >
                        <div
                          className={`absolute inset-5 rounded-full border border-dashed border-emerald-300/30 ${
                            reduceMotion ? "" : "animate-spin [animation-duration:20s]"
                          }`}
                        />
                        <div className="absolute inset-[38%] rounded-full bg-emerald-500/15 blur-md" />
                      </button>

                      {/* ── HOLO PYLONS around the room ── */}
                      {holoPylons.map((node) => {
                        const isLit = litPylons.has(node.id);
                        const isActive = activeMapNode === node.id;
                        return (
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
                            onClick={() => handlePylonClick(node.id, node.name)}
                            aria-pressed={isLit}
                            aria-label={
                              isLit
                                ? format(t.studyGroups.pylonAriaLit, { name: node.name })
                                : format(t.studyGroups.pylonAriaUnlit, { name: node.name })
                            }
                            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-[9px] font-black shadow-lg cursor-pointer transition-all hover:scale-110 ${
                              isActive
                                ? "border-emerald-300 bg-emerald-900/90 text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.6)]"
                                : isLit
                                ? "border-emerald-400/70 bg-emerald-950/90 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]"
                                : "border-emerald-500/40 bg-stone-900/90 text-emerald-300"
                            }`}
                          >
                            <span className="text-sm leading-none">{node.icon}</span>
                            <span className="whitespace-nowrap">
                              {node.name}
                              {isLit ? " ✓" : ""}
                            </span>
                          </button>
                          {/* Beam down to the floor, so the pylon reads as
                              planted in the room rather than floating. A lit
                              station burns brighter - the only persistent
                              reward for having found it. */}
                          <div
                            className={`w-px h-11 mx-auto bg-gradient-to-b to-transparent ${
                              isLit ? "from-emerald-300" : "from-emerald-400/60"
                            }`}
                          />
                        </div>
                        );
                      })}

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
                          const isArriving = member ? arrivingIds.has(member.user_id) : false;

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
                                    {...seatFloat(idx)}
                                    className="flex flex-col items-center"
                                  >
                                  {/* Arrival pop lives on its own layer: the
                                      parent already owns a looping y/rotate
                                      float, and a second animate prop on the
                                      same element would replace it. */}
                                  <motion.div
                                    animate={
                                      reduceMotion || !isArriving ? { scale: 1 } : { scale: [0.45, 1.15, 1] }
                                    }
                                    transition={{ duration: 0.65, ease: "easeOut" }}
                                    className="relative flex flex-col items-center"
                                  >
                                    {/* Absolutely positioned, not stacked above
                                        the nameplate: the figure hangs off a
                                        fixed anchor and flows downward, so a
                                        badge in normal flow would push the
                                        chair legs through the floor for as
                                        long as it was shown, then snap back. */}
                                    {isArriving && (
                                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-1.5 py-px rounded-full bg-amber-400 text-stone-950 text-[8px] font-black whitespace-nowrap shadow-md">
                                        {t.studyGroups.justJoined}
                                      </span>
                                    )}

                                    {/* Level, streak and role sit *above* the
                                        nameplate. They used to hang off the
                                        bottom of the stack, below the chair
                                        legs - which put them at floor level,
                                        where the camera pitch smeared them into
                                        the floor glow and the nearest seats
                                        pushed them off the bottom of the stage.
                                        Up here they have empty air to live in. */}
                                    <div className="mb-0.5 flex items-center gap-1">
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-[9px] font-black text-white">
                                        {format(t.studyGroups.levelShort, { level: member.current_level })}
                                      </span>
                                      <span className="text-[9px] font-black text-emerald-300 whitespace-nowrap">
                                        🔥 {member.weekly_lessons}
                                      </span>
                                    </div>
                                    <span className="mb-1 text-[9px] font-black text-amber-300 truncate max-w-[100px]">
                                      {memberRole(member)}
                                    </span>

                                    {/* Name plate. Capped and truncated: a full
                                        Vietnamese name billboards to ~140px,
                                        and five plates that wide collide into
                                        one unreadable pile at any camera angle.
                                        The full name is still in the title. */}
                                    <div
                                      className={`mb-1 max-w-[104px] px-2 py-0.5 rounded-full border shadow-md ${
                                        isArriving
                                          ? "bg-amber-400 border-amber-200 text-stone-950"
                                          : isMe
                                          ? "bg-emerald-500 border-emerald-300 text-stone-950"
                                          : "bg-stone-900/95 border-stone-700 text-white"
                                      }`}
                                      title={member.full_name || t.studyGroups.memberRole}
                                    >
                                      <span className="block truncate text-[9px] font-black">
                                        {member.full_name || t.studyGroups.memberRole}
                                        {isMe ? t.studyGroups.you : ""}
                                      </span>
                                    </div>

                                    {/* Head */}
                                    <div className="relative">
                                      {idx === 0 && (
                                        <span
                                          className="absolute -top-4 left-1/2 -translate-x-1/2 text-base animate-bounce"
                                          title={t.studyGroups.topLessonTitle}
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
                                          title={t.studyGroups.inVoiceTitle}
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

                                  </motion.div>
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
                                  <span className="mt-1 text-[8px] font-bold uppercase text-stone-500">{t.studyGroups.emptySeat}</span>
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
                    {t.studyGroups.hint3dDesktop}
                  </span>
                  <span className="sm:hidden">{t.studyGroups.hint3dMobile}</span>
                  <span className="ml-1 tabular-nums">({Math.round(zoom3D * 100)}%)</span>
                </div>
                  </>
                )}
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
                      {t.studyGroups.chatTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatSubTab("notes")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        chatSubTab === "notes" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {format(t.studyGroups.notesTab, { count: stickyNotes.length })}
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatSubTab("quiz")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        chatSubTab === "quiz" ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {t.studyGroups.quizTab}
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {t.studyGroups.live}
                  </span>
                </div>
                {chatSubTab === "chat" && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="mb-2 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 shrink-0 text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1">
                      <span>💡</span>
                      <span>{t.studyGroups.chatCheckinHint}</span>
                    </div>
                    {pinnedMessage && (
                      <div className="mb-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 shrink-0">
                        <p className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400">{t.studyGroups.pinnedByAdmin}</p>
                        <p className="text-[11px] text-stone-800 dark:text-stone-200 leading-snug truncate">{pinnedMessage.content}</p>
                      </div>
                    )}
                    <div className="relative flex-1 min-h-0 flex flex-col">
                    <div
                      ref={scrollBoxRef}
                      onScroll={handleMessagesScroll}
                      className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 p-3 space-y-2.5"
                    >
              {hasOlderMessages && (
                <div className="flex justify-center pb-1">
                  <button
                    onClick={() => void loadOlderMessages()}
                    disabled={loadingOlder}
                    className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[10px] font-black text-stone-500 dark:text-stone-400 hover:text-emerald-600 disabled:opacity-60 cursor-pointer"
                  >
                    {loadingOlder ? t.studyGroups.loading : t.studyGroups.loadOlder}
                  </button>
                </div>
              )}
              {scrollMessages.length === 0 ? (
                <p className="text-xs text-stone-400 dark:text-stone-500 text-center py-8">
                  {t.studyGroups.chatEmpty}
                </p>
              ) : (
                scrollMessages.map((msg) => {
                  if (msg.is_bot) {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="max-w-[85%] rounded-xl px-3 py-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                          <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 mb-0.5">{t.studyGroups.byAdmin}</p>
                          <p className="text-sm break-words text-stone-800 dark:text-stone-200">{msg.content}</p>
                        </div>
                      </div>
                    );
                  }
                  const isMine = msg.sender_id === user?.id;
                  const sender = msg.sender_id ? memberById.get(msg.sender_id) : undefined;
                  const senderName = sender?.full_name || t.studyGroups.memberRole;
                  const msgReactions = reactions[msg.id] || {};

                  // The quote is looked up live, so editing or deleting the
                  // original updates every reply that points at it. `null`
                  // here means the original is gone (reply_to_id was set to
                  // null by the FK) or is older than the loaded window.
                  const repliedTo = msg.reply_to_id ? messageById.get(msg.reply_to_id) ?? null : null;
                  const repliedToName = repliedTo?.is_bot
                    ? t.chat.admin
                    : repliedTo?.sender_id
                    ? memberById.get(repliedTo.sender_id)?.full_name || t.studyGroups.memberRole
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
                                    {!repliedTo.content && repliedTo.image_url
                                      ? t.chat.imagePlaceholder
                                      : !repliedTo.content && repliedTo.file_name
                                        ? format(t.chat.filePlaceholder, { name: repliedTo.file_name })
                                        : repliedTo.content}
                                  </span>
                                </>
                              ) : (
                                <span className="block italic opacity-60">{t.chat.deleted}</span>
                              )}
                            </button>
                          )}

                          <p className="text-sm break-words">{mainText}</p>
                        </div>

                        {/* An optimistic bubble has no server row yet, so the
                            edit/delete/pin menu would have nothing to act on. */}
                        {!isPending && (
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuMsgId(activeMenuMsgId === msg.id ? null : msg.id)}
                            className={`${isMine ? "opacity-70" : "opacity-0"} group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-pointer shadow-xs bg-white/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700 hover:scale-105`}
                            title={t.chat.optionsTitle}
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
                                    title={format(t.studyGroups.reactionTitle, { emoji })}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() => {
                                  setReplyingTo({ id: msg.id, senderName: isMine ? t.chat.you : senderName, content: msg.content });
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                <CornerUpLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{t.chat.reply}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void togglePinMessage(msg);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                {msg.is_pinned ? <PinOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Pin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                                <span>{msg.is_pinned ? t.chat.unpin : t.chat.pin}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void copyMessageText(mainText || msg.content);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left"
                              >
                                <Copy className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                                <span>{t.chat.copy}</span>
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
                                  <span>{t.chat.edit}</span>
                                </button>

                                <button
                                  onClick={async () => {
                                    setActiveMenuMsgId(null);
                                    try {
                                      await deleteRoomMessage(msg.id);
                                      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                                      toast.success(t.chat.recalled);
                                    } catch (err) {
                                      toast.error(t.chat.recallFailed);
                                    }
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold transition-colors text-left"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>{t.chat.recall}</span>
                                </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        )}
                      </div>

                      {/* Send status. Only ever shown on your own optimistic
                          bubbles - a confirmed message needs no annotation. */}
                      {isPending && (
                        <div className={`mt-0.5 flex items-center gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
                          {hasFailed ? (
                            <>
                              <span className="text-[10px] font-bold text-rose-500">{t.studyGroups.sendFailed}</span>
                              <button
                                onClick={() => retryMessage(msg.id)}
                                className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                              >
                                {t.studyGroups.retry}
                              </button>
                              <button
                                onClick={() => discardFailedMessage(msg.id)}
                                className="text-[10px] font-bold text-stone-400 hover:text-stone-600 cursor-pointer"
                              >
                                {t.studyGroups.discard}
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-semibold text-stone-400">{t.chat.sending}</span>
                          )}
                        </div>
                      )}

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
                          <span className="whitespace-nowrap">{myRoomMembers.length > 1 ? t.chat.seen : t.chat.sent}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Shown only when new messages arrived while the reader was up in
                the history - the alternative is silently yanking them down. */}
            {hasUnseenBelow && (
              <button
                onClick={() => {
                  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                  setHasUnseenBelow(false);
                }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-black shadow-lg cursor-pointer"
              >
                {t.studyGroups.newMessages}
              </button>
            )}
            </div>

            {/* Replying Banner Preview */}
            {replyingTo && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200 mt-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.chat.replyingTo, { name: replyingTo.senderName })}</span>
                  <p className="truncate text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{replyingTo.content}</p>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full cursor-pointer"
                  title={t.chat.cancelReply}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {editingMessage && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-stone-800 dark:text-stone-200 mt-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-sky-600 dark:text-sky-400">{t.chat.editing}</span>
                  <p className="truncate text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{editingMessage.content}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingMessage(null);
                    setMessageInput("");
                  }}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full cursor-pointer"
                  title={t.chat.cancelEdit}
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
                placeholder={
                  editingMessage
                    ? t.studyGroups.editPlaceholder
                    : replyingTo
                      ? format(t.studyGroups.replyPlaceholder, { name: replyingTo.senderName })
                      : t.studyGroups.chatPlaceholder
                }
                maxLength={2000}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
              <button
                onClick={() => void handleSendMessage()}
                disabled={sendingMessage || !messageInput.trim()}
                className="shrink-0 w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
                aria-label={t.chat.sendAria}
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
                placeholder={t.studyGroups.notePlaceholder}
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void handleAddNote()}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500 cursor-pointer shrink-0"
              >
                {t.studyGroups.noteAdd}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {stickyNotes.length === 0 ? (
                <div className="h-full min-h-[180px] rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 flex items-center justify-center text-center px-6">
                  <p className="text-xs font-bold text-stone-500 dark:text-stone-400">
                    {t.studyGroups.notesEmpty}
                  </p>
                </div>
              ) : (
                stickyNotes.map((note) => {
                  const author = memberById.get(note.author_id);
                  const isAuthor = note.author_id === user?.id;
                  return (
                    <div key={note.id} className={`p-3 rounded-2xl border ${noteColorClass(note.color)} text-xs space-y-1 shadow-xs`}>
                      <div className="flex items-center justify-between gap-2 font-black text-[10px] opacity-80">
                        <span className="truncate">📌 {isAuthor ? t.studyGroups.noteAuthorYou : author?.full_name || t.studyGroups.memberRole}</span>
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
                          {t.studyGroups.noteDelete}
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
                <span>{t.studyGroups.quizChallengeTitle}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[9px]">{t.studyGroups.quizReward}</span>
              </p>
              <p className="text-stone-600 dark:text-stone-300 text-[11px]">
                {t.studyGroups.quizHint}
              </p>
            </div>

            {!groupQuizSubmitted ? (
              <div className="space-y-4">
                {loadingGroupQuiz ? (
                  <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-6 text-center text-xs font-bold text-stone-500">
                    {t.studyGroups.quizLoading}
                  </div>
                ) : groupQuizQuestions.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 p-6 text-center text-xs font-bold text-stone-500">
                    {t.studyGroups.quizEmpty}
                  </div>
                ) : (
                  groupQuizQuestions.map((q, qIdx) => (
                    <div key={`${q.lessonId}-${qIdx}`} className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 space-y-2 text-xs">
                      <p className="font-black text-stone-900 dark:text-stone-100">
                        {format(t.studyGroups.quizQuestion, { index: qIdx + 1, question: q.question })}
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
                  {t.studyGroups.quizSubmit}
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="text-4xl">{groupQuizScore && groupQuizScore >= 80 ? "🎁" : "💪"}</div>
                <h4 className="font-black text-sm text-stone-900 dark:text-stone-100">
                  {format(t.studyGroups.quizResult, { score: groupQuizScore ?? 0 })}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {groupQuizScore && groupQuizScore >= 80 ? t.studyGroups.quizResultGood : t.studyGroups.quizResultRetry}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGroupQuizSubmitted(false);
                    setGroupQuizAnswers({});
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
                >
                  {t.studyGroups.quizRetry}
                </button>
              </div>
            )}
            {quizAttempts.length > 0 && (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 p-3 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">{t.studyGroups.quizWeeklyScores}</p>
                {quizAttempts.slice(0, 5).map((attempt) => {
                  const member = memberById.get(attempt.user_id);
                  return (
                    <div key={attempt.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-stone-700 dark:text-stone-200 truncate">
                        {attempt.user_id === user?.id ? t.studyGroups.noteAuthorYou : member?.full_name || t.studyGroups.memberRole}
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

      {/* Nhắc học của phòng.
      
          Bản trước là chữ cứng: nó nói "Bài 12: Phân tích Báo cáo Dòng tiền"
          cho MỌI phòng, mọi ngày, mãi mãi - kèm dòng "Thưởng +50 XP / bài" cho
          một khoản thưởng không tồn tại ở đâu trong mã, và nút bấm đi thẳng về
          dashboard. Ba lời hứa, không lời nào có thật.
      
          Giờ nó đọc đúng thứ phòng thật sự có: nhiệm vụ tuần và chủ đề phòng.
          Không có khái niệm "bài học của phòng hôm nay" trong dữ liệu, nên
          không dựng ra một cái. */}
            <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/30 rounded-2xl p-3 sm:p-3.5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center text-lg shrink-0 shadow-xs">
                  🎯
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      {t.studyGroups.roomGoalTitle}
                    </span>
                  </div>
                  {(() => {
                    const lessonMission = missions.find((m) => m.mission_key === "lessons");
                    if (lessonMission) {
                      const left = Math.max(0, lessonMission.target_value - lessonMission.current_value);
                      return (
                        <p className="text-xs sm:text-sm font-black text-stone-100 mt-1 truncate">
                          {lessonMission.title} · {lessonMission.current_value}/{lessonMission.target_value}
                          {left > 0 ? format(t.studyGroups.roomGoalRemaining, { count: left }) : t.studyGroups.roomGoalDone}
                        </p>
                      );
                    }
                    return (
                      <p className="text-xs sm:text-sm font-black text-stone-100 mt-1 truncate">
                        {format(t.studyGroups.roomTopic, { topic: topicLabel(myRoom.topic) })}
                      </p>
                    );
                  })()}
                </div>
              </div>

              <Link
                href="/hoc-bai"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
              >
                <span>{t.studyGroups.studyNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-1">
                {t.studyGroups.matchRandom}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                {t.studyGroups.matchRandomHint}
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
                  {t.studyGroups.orPickRoom}
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
                <p className="text-xs text-stone-400">{t.studyGroups.roomsLoading}</p>
              ) : rooms.length === 0 ? (
                <p className="text-xs text-stone-400">
                  {t.studyGroups.roomsEmpty}
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
                            {format(t.studyGroups.roomCard, { id: room.room_id, count: room.member_count, max: room.max_members })}
                          </p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500">
                            {format(t.studyGroups.roomCardXp, { current: room.weekly_xp_progress, goal: room.weekly_xp_goal })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => void handleJoinRoom(room.room_id)}
                        disabled={busy}
                        className="shrink-0 px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                      >
                        {t.studyGroups.join}
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
