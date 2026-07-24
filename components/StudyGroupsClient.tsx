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
  getMyStudyRoom,
  getStudyRoomMembers,
  getStudyRooms,
  isStudyRoomBotCommand,
  joinOrCreateStudyRoom,
  joinStudyRoom,
  leaveStudyRoom,
  getRoomMessages,
  requestStudyRoomBot,
  sendRoomMessage,
  deleteRoomMessage,
  updateRoomMessage,
  setRoomMessagePinned,
  subscribeToRoomMessages,
} from "@/lib/supabase-study-rooms";
import { trackFeatureClick } from "@/lib/feature-events";
import { isValidAvatar } from "@/lib/avatar-utils";
import {
  type StudyRoomMember,
  type StudyRoomMessage,
  type StudyRoomSummary,
  type StudyRoomTopic,
} from "@/lib/supabase-study-rooms";

interface SessionUser {
  id: string;
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

  const handleStageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setZoom3D((prev) => Math.max(0.6, Math.min(1.85, prev - e.deltaY * 0.0015)));
  };

  // 1. Mobile Viewport Segmented Tab Toggle state ("3d" | "chat")
  const [mobileTab, setMobileTab] = useState<"3d" | "chat">("3d");

  // 2. Focus Lofi Audio Player state & Web Audio synth engine
  const [lofiPlaying, setLofiPlaying] = useState(false);
  const [lofiTrack, setLofiTrack] = useState<"lofi" | "rain" | "waves">("lofi");
  const [isMicMuted, setIsMicMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // 3. Group Daily Quests & 3D Chest Reward state
  const [questProgress, setQuestProgress] = useState({ done: 2, total: 3 });
  const [isChestUnlocked, setIsChestUnlocked] = useState(false);

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
    setIsDragging3D(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
    rotationStartRef.current = { ...rotation3D };
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging3D) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    setRotation3D({
      x: Math.max(-10, Math.min(65, rotationStartRef.current.x - deltaY * 0.4)),
      y: rotationStartRef.current.y + deltaX * 0.5,
    });
  };

  const handleStageMouseUp = () => {
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
      return;
    }
    let cancelled = false;
    getRoomMessages(myRoom.room_id)
      .then((list) => {
        if (!cancelled) setMessages(list);
      })
      .catch((error) => console.error("Error loading room messages:", error));

    const unsubscribe = subscribeToRoomMessages(
      myRoom.room_id,
      (message) => {
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev.map((m) => (m.id === message.id ? message : m)) : [...prev, message]));
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const toggleReaction = (msgId: number, emoji: string) => {
    if (!user?.id) return;
    setReactions((prev) => {
      const msgReactions = prev[msgId] || {};
      const userList = msgReactions[emoji] || [];
      const hasReacted = userList.includes(user.id);
      const updatedUsers = hasReacted
        ? userList.filter((id) => id !== user.id)
        : [...userList, user.id];

      const newMsgReactions = { ...msgReactions };
      if (updatedUsers.length > 0) {
        newMsgReactions[emoji] = updatedUsers;
      } else {
        delete newMsgReactions[emoji];
      }

      return { ...prev, [msgId]: newMsgReactions };
    });
  };

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

    let finalContent = rawContent;
    if (replyingTo) {
      const cleanContent = replyingTo.content.replace(/^↩️ \[Trả lời [^\]]+\]:\s*"/, "").replace(/"$/, "");
      finalContent = `↩️ [Trả lời ${replyingTo.senderName}]: "${cleanContent.slice(0, 45)}..."\n${rawContent}`;
    }

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

    setSendingMessage(true);
    try {
      await sendRoomMessage(myRoom.room_id, user.id, finalContent);
      setMessageInput("");
      setReplyingTo(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn");
    } finally {
      setSendingMessage(false);
    }
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

              {/* Center/Right Action Bar: Lofi Focus Sound + Mic Toggle + Mobile Segmented Tab Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

                {/* 🎙️ Mic Status Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMicMuted((prev) => !prev);
                    toast.info(isMicMuted ? "🎙️ Đã bật micro phòng học" : "🔇 Đã tắt micro phòng học");
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer ${
                    !isMicMuted
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700"
                  }`}
                  title="Bật/Tắt Micro"
                >
                  <span>{isMicMuted ? "🔇" : "🎙️"}</span>
                  <span className="hidden md:inline">{isMicMuted ? "Mic: Tắt" : "Mic: Mở"}</span>
                </button>

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
                } flex-col h-[78vh] min-h-[560px] sm:min-h-[640px] flex-1 rounded-2xl border border-stone-800 bg-stone-950 p-3.5 sm:p-4 shadow-2xl relative overflow-hidden text-white justify-between select-none transition-colors ${
                  isDragging3D ? "cursor-grabbing border-emerald-500/70" : "cursor-grab"
                }`}
                style={{ perspective: "800px", perspectiveOrigin: "50% 45%" }}
              >
                {/* Ambient Radial Lighting & Starfield Grid Background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-[0.14]" />
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />

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

                {/* ── 3D SPATIAL DRAG ROTATION & MOUSE WHEEL ZOOM CANVAS ── */}
                <motion.div
                  animate={{
                    rotateX: rotation3D.x,
                    rotateY: rotation3D.y,
                    scale: zoom3D,
                  }}
                  transition={isDragging3D ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 200, damping: 20 }}
                  className="relative flex-1 min-h-0 w-full flex items-center justify-center my-auto transition-transform duration-200"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Outer 3D Grid Floor Ring */}
                  <div
                    className="absolute inset-8 rounded-full border border-dashed border-emerald-500/25 pointer-events-none"
                    style={{ transform: "translateZ(-20px)" }}
                  />

                  {/* Central 3D Interactive Spatial Roundtable Map */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotateZ: 3 }}
                    className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-gradient-to-b from-stone-800 via-emerald-950/80 to-stone-950 border-2 border-emerald-400/80 shadow-[0_0_40px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center text-center p-2 z-10 shrink-0 cursor-pointer"
                    style={{ transform: "translateZ(10px)" }}
                    onClick={() => {
                      toast.success("🔮 Đã nạp năng lượng 3D Spatial Boost cho cả phòng!");
                    }}
                  >
                    <div className="absolute inset-1 rounded-full border border-dashed border-emerald-300/40 animate-spin-slow pointer-events-none" />

                    <div className="relative z-10">
                      <motion.span
                        animate={{ y: [0, -3, 0], scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-lg sm:text-xl mb-0.5 inline-block drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                      >
                        🔮
                      </motion.span>
                      <p className="text-[8px] sm:text-[9px] font-black text-emerald-300 uppercase tracking-widest">
                        BÀN HỌC 3D
                      </p>
                      <p className="text-xs font-black text-white mt-0.5">
                        {myRoom.weekly_xp_progress} / {myRoom.weekly_xp_goal} XP
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChestUnlocked(true);
                          toast.success("🎁 Đã mở Rương Nhiệm Vụ Nhóm! Cả phòng được thưởng +150 XP Bonus 🎉");
                        }}
                        className={`mt-1 inline-flex items-center gap-1 text-[8px] font-extrabold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                          isChestUnlocked
                            ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md"
                            : "bg-emerald-950/90 text-emerald-300 border-emerald-400/40 hover:bg-emerald-800"
                        }`}
                      >
                        <span>{isChestUnlocked ? "👑 Rương Đã Mở" : "🎁 Nhận Rương XP"}</span>
                      </button>
                    </div>
                  </motion.div>

                  {/* 4 Interactive Holographic 3D Landmarks on Map Floor */}
                  {[
                    { id: "valuation", name: "Định Giá", icon: "🏰", pos: "absolute top-2 left-[20%] sm:left-[28%]" },
                    { id: "trading", name: "Giao Dịch", icon: "🏛️", pos: "absolute top-2 right-[20%] sm:right-[28%]" },
                    { id: "cashflow", name: "Dòng Tiền", icon: "⚓", pos: "absolute bottom-2 left-[20%] sm:left-[28%]" },
                    { id: "fed", name: "Lãi Suất", icon: "⚡", pos: "absolute bottom-2 right-[20%] sm:right-[28%]" },
                  ].map((node) => (
                    <motion.button
                      key={node.id}
                      type="button"
                      onClick={() => {
                        setActiveMapNode(node.id);
                        toast.success(`Đã kích hoạt trạm 3D [${node.name}]! +15% XP cho cả phòng.`);
                      }}
                      whileHover={{ scale: 1.2, translateZ: 30 }}
                      className={`${node.pos} z-15 flex items-center gap-1 bg-stone-900/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/40 text-[9px] font-black text-emerald-300 shadow-md cursor-pointer transition-all`}
                      style={{ transform: "translateZ(12px)" }}
                    >
                      <span>{node.icon}</span>
                      <span className="hidden sm:inline">{node.name}</span>
                    </motion.button>
                  ))}

                  {/* 🪑 INTIMATE COZY MEMBER POD SEATS (KÉO SÁT NGỒI XUNG QUANH BÀN TRÒN 3D) */}
                  {(() => {
                    const seatClasses = [
                      "absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20",       // Seat 0: Top Center (Sát ngay phía trên bàn)
                      "absolute top-8 sm:top-10 left-[18%] sm:left-[26%] z-20",         // Seat 1: Top Left (Kéo sát vào phía bàn)
                      "absolute top-8 sm:top-10 right-[18%] sm:right-[26%] z-20",       // Seat 2: Top Right (Kéo sát vào phía bàn)
                      "absolute bottom-4 sm:bottom-6 left-[18%] sm:left-[26%] z-20",    // Seat 3: Bottom Left (Kéo sát vào phía bàn)
                      "absolute bottom-4 sm:bottom-6 right-[18%] sm:right-[26%] z-20",  // Seat 4: Bottom Right (Kéo sát vào phía bàn)
                    ];

                    const sortedMembers = [...myRoomMembers].sort((a, b) => b.weekly_lessons - a.weekly_lessons);

                    return seatClasses.map((posClass, idx) => {
                      const member = sortedMembers[idx];
                      const isMe = member?.user_id === user?.id;

                      if (member) {
                        return (
                          <motion.div
                            key={member.user_id}
                            style={{ transform: "translateZ(25px)" }}
                            whileHover={{ scale: 1.12, translateZ: 40 }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2.5 + idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
                            className={`${posClass} flex flex-col items-center text-center p-1 sm:p-1.5 rounded-xl border transition-all duration-300 w-18 sm:w-22 bg-stone-900/95 backdrop-blur-md shadow-[0_12px_24px_rgba(0,0,0,0.6)] ${
                              isMe
                                ? "border-emerald-400 bg-emerald-950/90 shadow-[0_0_18px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/50"
                                : "border-stone-700 hover:border-emerald-400/70"
                            }`}
                          >
                            {/* Top Learner Crown */}
                            {idx === 0 && (
                              <span className="absolute -top-3 text-xs animate-bounce drop-shadow-md z-30" title="Top 1 Bài học tuần này">
                                👑
                              </span>
                            )}

                            <div className="relative mb-0.5">
                              <div className={`rounded-full p-0.5 ${isMe ? "ring-2 ring-emerald-400" : "ring-1 ring-stone-700"}`}>
                                <Avatar name={member.full_name} avatarUrl={member.avatar_url} size={24} />
                              </div>
                              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase text-white bg-emerald-600 px-1 py-0.1 rounded-full shadow-xs whitespace-nowrap">
                                Lv.{member.current_level}
                              </span>
                            </div>

                            <p className="text-[9px] font-black text-white truncate max-w-[64px]" title={member.full_name || "Thành viên"}>
                              {member.full_name || "Thành viên"}{isMe ? " (Bạn)" : ""}
                            </p>
                            <span className="text-[8px] font-extrabold text-emerald-400 mt-0.5">
                              🔥 {member.weekly_lessons} bài
                            </span>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={`empty-${idx}`}
                          style={{ transform: "translateZ(15px)" }}
                          className={`${posClass} flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl border border-dashed border-stone-800 bg-stone-900/40 text-stone-500 text-center w-18 sm:w-22 min-h-[60px] backdrop-blur-xs`}
                        >
                          <span className="text-xs mb-0.5 opacity-50">🪑</span>
                          <span className="text-[8px] font-bold text-stone-400 uppercase">Ghế trống</span>
                        </motion.div>
                      );
                    });
                  })()}
                </motion.div>

                {/* Footer hint */}
                <div className="relative z-30 shrink-0 text-center text-[10px] text-stone-400 font-semibold pt-1">
                  🖐️ Kéo chuột để xoay 3D 360° · 🔍 Lăn chuột để Zoom in/out · Bấm 🔄 để đặt lại góc ({Math.round(zoom3D * 100)}%)
                </div>
              </div>

              {/* RIGHT COLUMN: Group Chat Box Matched 80% Viewport Height */}
              <div
                className={`lg:col-span-5 ${
                  mobileTab === "chat" ? "flex" : "hidden lg:flex"
                } flex-col h-[78vh] min-h-[560px] sm:min-h-[640px] flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xl p-3 sm:p-3.5`}
              >
                <h3 className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-2 shrink-0 flex items-center justify-between">
                  <span>💬 Trò chuyện nhóm</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Live
                  </span>
                </h3>
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

                  // Check if message contains a quote reply
                  const isQuoteReply = msg.content.startsWith("↩️ [Trả lời ");
                  let quoteHeader = "";
                  let mainText = msg.content;
                  if (isQuoteReply) {
                    const lines = msg.content.split("\n");
                    quoteHeader = lines[0];
                    mainText = lines.slice(1).join("\n");
                  }

                  return (
                    <div key={msg.id} className={`group relative flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                      <div className={`flex items-center gap-1.5 max-w-[85%] w-fit min-w-0 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`relative rounded-2xl px-3.5 py-2 shadow-2xs w-fit ${
                          isMine
                            ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-tr-xs"
                            : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs"
                        }`}>
                          {!isMine && (
                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                              {senderName}
                            </p>
                          )}

                          {/* Quoted Message Box */}
                          {isQuoteReply && (
                            <div className="mb-1.5 p-1.5 rounded-lg border-l-2 border-emerald-400 bg-emerald-500/10 text-[11px] font-medium leading-snug">
                              <p className="opacity-90 font-bold">{quoteHeader}</p>
                            </div>
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
                                      toggleReaction(msg.id, emoji);
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
                                onClick={() => toggleReaction(msg.id, emoji)}
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
