"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Users, Send, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import {
  STUDY_ROOM_TOPICS,
  getMyStudyRoom,
  getRoomMessages,
  sendRoomMessage,
  subscribeToRoomMessages,
  type StudyRoomSummary,
  type StudyRoomMessage,
} from "@/lib/supabase-study-rooms";

function topicLabel(topic: string) {
  return STUDY_ROOM_TOPICS.find((t) => t.id === topic)?.label ?? topic;
}

const LAST_SEEN_ROOM_KEY = "thtcdn_study_room_last_seen_id";
const LAST_READ_AT_KEY_PREFIX = "thtcdn_study_room_last_read_";

// Floating widget for the caller's active weekly study-group chat, mounted
// on the dashboard alongside FloatingChatbot (the feedback widget) rather
// than folded into the full /nhom-hoc page - so a message from a groupmate
// (or "Tài Tài"'s daily progress recap, see
// app/api/cron/daily-study-group-update/route.ts) is visible without
// leaving the dashboard. Renders nothing if the caller has no active room.
export default function FloatingStudyGroupChat() {
  const [userId, setUserId] = useState<string | null>(null);
  const [room, setRoom] = useState<StudyRoomSummary | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<StudyRoomMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      try {
        const myRoom = await getMyStudyRoom();
        if (!myRoom) return;
        setRoom(myRoom);

        const lastSeenRoomId = window.localStorage.getItem(LAST_SEEN_ROOM_KEY);
        const isNewRoom = lastSeenRoomId !== String(myRoom.room_id);
        window.localStorage.setItem(LAST_SEEN_ROOM_KEY, String(myRoom.room_id));

        const msgs = await getRoomMessages(myRoom.room_id);
        setMessages(msgs);

        if (isNewRoom) {
          toast.success(`Bạn vừa được ghép vào nhóm học mới: ${topicLabel(myRoom.topic)}! Chào mọi người trong nhóm nhé.`);
          setOpen(true);
        } else {
          const lastReadAt = window.localStorage.getItem(LAST_READ_AT_KEY_PREFIX + myRoom.room_id);
          const unread = lastReadAt ? msgs.filter((m) => m.created_at > lastReadAt).length : msgs.length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Error loading study room for floating chat:", error);
      }
    };
    void init();
  }, []);

  useEffect(() => {
    if (!room) return;
    const unsubscribe = subscribeToRoomMessages(room.room_id, (message) => {
      setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
      setOpen((currentlyOpen) => {
        if (!currentlyOpen) setUnreadCount((c) => c + 1);
        return currentlyOpen;
      });
    });
    return unsubscribe;
  }, [room]);

  useEffect(() => {
    if (open && room) {
      setUnreadCount(0);
      window.localStorage.setItem(LAST_READ_AT_KEY_PREFIX + room.room_id, new Date().toISOString());
    }
  }, [open, room, messages.length]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    const content = input.trim();
    if (!content || !room || !userId || sending) return;
    setSending(true);
    try {
      await sendRoomMessage(room.room_id, userId, content);
      setInput("");
      trackFeatureClick("floating_study_chat_send", { label: String(room.room_id) });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn");
    } finally {
      setSending(false);
    }
  }

  if (!room) return null;

  const pinnedMessage = messages.find((m) => m.is_pinned) ?? null;
  const scrollMessages = messages.filter((m) => !m.is_pinned);

  return (
    <>
      <button
        onClick={() => {
          setOpen((v) => !v);
          trackFeatureClick("floating_study_chat_toggle", { label: open ? "close" : "open" });
        }}
        aria-label="Chat nhóm học"
        title={`Nhóm ${topicLabel(room.topic)}`}
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none bg-emerald-600 hover:bg-emerald-500 hover:scale-110"
      >
        <Users className="w-6 h-6 text-white" />
        {unreadCount > 0 && !open && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white dark:border-stone-950">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/20 z-40 sm:hidden" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed z-50 transition-all duration-300 ease-out
          bottom-0 left-0 right-0
          sm:bottom-44 sm:right-6 sm:left-auto sm:w-[380px]
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}
        `}
      >
        <div className="bg-white dark:bg-stone-900 sm:rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl h-[70vh] sm:h-[480px]">
          <div className="bg-emerald-600 px-4 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">Nhóm {topicLabel(room.topic)}</p>
              <p className="text-emerald-100 text-xs">{room.member_count}/{room.max_members} thành viên</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Đóng"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {pinnedMessage && (
            <div className="shrink-0 px-3 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900">
              <div className="flex items-center gap-1.5 mb-1">
                <Image src="/tai-tai-avatar.jpg" alt="Tài Tài" width={16} height={16} className="rounded-full" />
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">Tài Tài · Quản lý nhóm · Đã ghim</span>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">{pinnedMessage.content}</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-stone-50/50 dark:bg-stone-950/40">
            {scrollMessages.length === 0 ? (
              <p className="text-xs text-stone-400 dark:text-stone-500 text-center py-8">
                Chưa có tin nhắn nào. Chào các bạn trong nhóm nhé!
              </p>
            ) : (
              scrollMessages.map((msg) => {
                if (msg.is_bot) {
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-[85%] rounded-xl px-3 py-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Image src="/tai-tai-avatar.jpg" alt="Tài Tài" width={16} height={16} className="rounded-full" />
                          <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">Tài Tài · Quản lý nhóm</span>
                        </div>
                        <p className="text-sm text-stone-800 dark:text-stone-200">{msg.content}</p>
                      </div>
                    </div>
                  );
                }
                const isMine = msg.sender_id === userId;
                return (
                  <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-xl px-3 py-2 ${
                        isMine
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                          : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.content}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-stone-200 dark:border-stone-800 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Nhắn gì đó cho nhóm..."
              maxLength={2000}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
            <button
              onClick={() => void handleSend()}
              disabled={sending || !input.trim()}
              className="shrink-0 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors disabled:opacity-40"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
