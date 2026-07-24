"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Shuffle, Users, LogOut, Send, CornerUpLeft, Smile, X, MoreVertical, Trash2 } from "lucide-react";
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
  const [roomViewMode, setRoomViewMode] = useState<"3d" | "list">("3d");
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

    const unsubscribe = subscribeToRoomMessages(myRoom.room_id, (message) => {
      setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [myRoom?.room_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [replyingTo, setReplyingTo] = useState<{ id: number; senderName: string; content: string } | null>(null);
  const [reactions, setReactions] = useState<Record<number, Record<string, string[]>>>({});
  const [activeMenuMsgId, setActiveMenuMsgId] = useState<number | null>(null);

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

      <div className={`${embedded ? "" : "max-w-4xl mx-auto px-6 py-8"}`}>
        {myRoom ? (
          <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
            <p className="text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 border border-dashed border-stone-200 dark:border-stone-700 rounded-lg px-3.5 py-2.5 mb-5">
              Bạn đang ở nhóm ngẫu nhiên tuần này - có thể tự đổi nhóm bất kỳ lúc nào bằng cách rời phòng và chọn phòng khác.
            </p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  Phòng học của bạn
                </p>
                <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                  {topicLabel(myRoom.topic)} · {myRoom.member_count}/{myRoom.max_members} thành viên
                </h2>
              </div>
              <button
                onClick={handleLeave}
                disabled={busy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                Rời phòng
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400 mb-1.5">
                <span>Mục tiêu XP cả nhóm tuần này</span>
              <span>{myRoom.weekly_xp_progress} / {myRoom.weekly_xp_goal} XP</span>
              </div>
              <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (myRoom.weekly_xp_progress / Math.max(1, myRoom.weekly_xp_goal)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest flex items-center gap-2">
                  <span>🛋️ Phòng Học Nhóm 3D</span>
                </h3>

                {/* View Mode Toggle Switcher */}
                <div className="inline-flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 border border-stone-200 dark:border-stone-700 text-xs font-extrabold">
                  <button
                    onClick={() => setRoomViewMode("3d")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      roomViewMode === "3d"
                        ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    🛋️ Bàn Tròn 3D
                  </button>
                  <button
                    onClick={() => setRoomViewMode("list")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      roomViewMode === "list"
                        ? "bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    📊 Danh Sách
                  </button>
                </div>
              </div>

              {roomViewMode === "3d" ? (
                /* 🏰 3D Isometric Roundtable Virtual Desk Stage */
                <div className="relative rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-stone-900 via-stone-950 to-emerald-950/70 p-5 sm:p-7 shadow-2xl overflow-hidden text-white">
                  {/* 3D Perspective Grid Background */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-[0.15]" />
                  
                  {/* Top Ambient Glow */}
                  <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/20 rounded-full blur-3xl" />

                  {/* 🔮 Center 3D Isometric Study Desk & Radially Positioned Member Seats */}
                  <div className="relative mx-auto w-full max-w-xl h-[420px] sm:h-[460px] flex items-center justify-center my-2">
                    {/* Central 3D Roundtable */}
                    <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-stone-800/90 via-amber-950/90 to-stone-900 border-4 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.3)] flex flex-col items-center justify-center text-center p-4 z-10">
                      <div className="absolute inset-2.5 rounded-full border border-dashed border-amber-400/40 animate-spin-slow pointer-events-none" />
                      
                      <div className="relative z-10">
                        <span className="text-3xl mb-1 animate-bounce inline-block">🔮</span>
                        <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                          BÀN HỌC {topicLabel(myRoom.topic).toUpperCase()}
                        </p>
                        <p className="text-xs sm:text-sm font-black text-white mt-1">
                          {myRoom.weekly_xp_progress} / {myRoom.weekly_xp_goal} XP
                        </p>
                        <span className="mt-1 inline-block text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                          ⚡ +15% XP BONUS
                        </span>
                      </div>
                    </div>

                    {/* 🪑 5 Seated Member Pods Positioned Radially Around the Table */}
                    {(() => {
                      const seatClasses = [
                        "absolute -top-2 left-1/2 -translate-x-1/2 z-20", // Seat 0: Top Center
                        "absolute top-8 left-1 sm:left-3 z-20",            // Seat 1: Top Left
                        "absolute top-8 right-1 sm:right-3 z-20",          // Seat 2: Top Right
                        "absolute bottom-2 left-3 sm:left-8 z-20",         // Seat 3: Bottom Left
                        "absolute bottom-2 right-3 sm:right-8 z-20",       // Seat 4: Bottom Right
                      ];

                      const sortedMembers = [...myRoomMembers].sort((a, b) => b.weekly_lessons - a.weekly_lessons);

                      return seatClasses.map((posClass, idx) => {
                        const member = sortedMembers[idx];
                        const isMe = member?.user_id === user?.id;

                        if (member) {
                          return (
                            <div
                              key={member.user_id}
                              className={`${posClass} flex flex-col items-center text-center p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 w-28 sm:w-32 bg-stone-900/90 backdrop-blur-md ${
                                isMe
                                  ? "border-emerald-400 bg-emerald-950/80 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105"
                                  : "border-stone-700/80 hover:border-amber-400/60"
                              }`}
                            >
                              {/* Top Learner Crown / Rank Badge */}
                              {idx === 0 && (
                                <span className="absolute -top-3.5 text-lg animate-bounce drop-shadow-md z-30" title="Top 1 Bài học tuần này">
                                  👑
                                </span>
                              )}

                              <div className="relative mb-1">
                                <div className={`rounded-full p-1 ${isMe ? "ring-2 ring-emerald-400" : "ring-1 ring-amber-400/50"}`}>
                                  <Avatar name={member.full_name} avatarUrl={member.avatar_url} size={40} />
                                </div>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase text-white bg-amber-600 px-1.5 py-0.2 rounded-full shadow-xs whitespace-nowrap">
                                  Lv.{member.current_level}
                                </span>
                              </div>

                              <p className="text-[10px] sm:text-[11px] font-black text-white truncate max-w-[90px]" title={member.full_name || "Thành viên"}>
                                {member.full_name || "Thành viên"}{isMe ? " (Bạn)" : ""}
                              </p>
                              <span className="text-[9px] font-extrabold text-emerald-400 mt-0.5">
                                🔥 {member.weekly_lessons} bài
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={`empty-${idx}`}
                            className={`${posClass} flex flex-col items-center justify-center p-2 rounded-2xl border border-dashed border-stone-700/60 bg-stone-900/40 text-stone-500 text-center w-28 sm:w-32 min-h-[90px] backdrop-blur-xs`}
                          >
                            <span className="text-base mb-0.5 opacity-50">🪑</span>
                            <span className="text-[9px] font-bold text-stone-400 uppercase">Ghế trống</span>
                            <span className="text-[8px] font-medium text-stone-500 mt-0.5">Đang chờ ghép</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              ) : (
                /* Standard Member List View */
                <div className="space-y-2">
                  {[...myRoomMembers]
                    .sort((a, b) => b.weekly_lessons - a.weekly_lessons)
                    .map((member, idx) => (
                      <div
                        key={member.user_id}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
                          member.user_id === user?.id
                            ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20"
                            : "border-stone-200 dark:border-stone-800"
                        }`}
                      >
                        <span className="text-xs font-extrabold text-stone-400 dark:text-stone-500 w-4 text-center shrink-0">
                          {idx + 1}
                        </span>
                        <Avatar name={member.full_name} avatarUrl={member.avatar_url} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                            {member.full_name || "Người dùng"}{member.user_id === user?.id ? " (Bạn)" : ""}
                          </p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500">
                            Level {member.current_level} · {member.total_xp} XP tổng
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                            {member.weekly_lessons} bài
                          </p>
                          <p className="text-[10px] text-stone-400 dark:text-stone-500">tuần này</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {myMemberRow && myRoom.member_count < myRoom.max_members && (
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-3">
                  Còn {myRoom.max_members - myRoom.member_count} chỗ trống - phòng sẽ tự nhận thêm thành viên mới ghép ngẫu nhiên vào chủ đề này.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-3">
              Trò chuyện nhóm
            </h3>
            {pinnedMessage && (
              <div className="mb-3 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 mb-0.5">Tài Tài · Quản lý nhóm · Đã ghim</p>
                <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">{pinnedMessage.content}</p>
              </div>
            )}
            <div className="h-72 overflow-y-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 p-3 space-y-2.5">
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
                      <div className={`flex items-center gap-1.5 max-w-[82%] ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`relative rounded-2xl px-3.5 py-2 shadow-2xs ${
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
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-pointer shadow-xs bg-white/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700"
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

                              {/* Reply Option */}
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

                              {/* Delete / Recall Option */}
                              {(isMine || user?.id) && (
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
                placeholder={replyingTo ? `Viết câu trả lời cho ${replyingTo.senderName}...` : "Nhắn gì đó cho nhóm... hoặc /taitai"}
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
