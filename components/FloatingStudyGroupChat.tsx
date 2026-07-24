"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { toast } from "sonner";
import { Users, Send, X, ImagePlus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import { uploadChatImage, isAllowedChatImage } from "@/lib/supabase-chat";
import { announceWidgetOpened, onOtherWidgetOpened } from "@/lib/floating-widget-coordinator";
import EmojiPicker from "@/components/EmojiPicker";
import {
  STUDY_ROOM_TOPICS,
  getMyStudyRoom,
  getRoomMessages,
  getStudyRoomMembers,
  isStudyRoomBotCommand,
  requestStudyRoomBot,
  sendRoomMessage,
  deleteRoomMessage,
  subscribeToRoomMessages,
  type StudyRoomSummary,
  type StudyRoomMessage,
  type StudyRoomMember,
} from "@/lib/supabase-study-rooms";

function topicLabel(topic: string) {
  return STUDY_ROOM_TOPICS.find((t) => t.id === topic)?.label ?? topic;
}

function initials(name: string | null | undefined) {
  return (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const LAST_SEEN_ROOM_KEY = "thtcdn_study_room_last_seen_id";
const LAST_READ_AT_KEY_PREFIX = "thtcdn_study_room_last_read_";

interface FloatingStudyGroupChatProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

// Floating widget for the caller's active weekly study-group chat, mounted
// on the dashboard alongside FloatingChatbot (the feedback widget) rather
// than folded into the full /nhom-hoc page - so a message from a groupmate
// (or "Tài Tài"'s daily progress recap, see
// app/api/cron/daily-study-group-update/route.ts) is visible without
// leaving the dashboard. Renders nothing if the caller has no active room.
export default function FloatingStudyGroupChat({ isOpen: controlledIsOpen, onOpenChange, hideTrigger }: FloatingStudyGroupChatProps = {}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [room, setRoom] = useState<StudyRoomSummary | null>(null);
  const [members, setMembers] = useState<Map<string, StudyRoomMember>>(new Map());
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  
  const setOpen = useCallback((openState: boolean | ((prev: boolean) => boolean)) => {
    setInternalOpen((prev) => {
      const next = typeof openState === "function" ? openState(prev) : openState;
      if (prev !== next) {
        onOpenChange?.(next);
      }
      return next;
    });
  }, [onOpenChange]);
  const [messages, setMessages] = useState<StudyRoomMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

        const roomMembers = await getStudyRoomMembers(myRoom.room_id);
        setMembers(new Map(roomMembers.map((m) => [m.user_id, m])));

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

  const handleDeleteStudyMessage = async (msgId: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    toast.success("🗑️ Đã thu hồi tin nhắn khỏi nhóm học!");
    await deleteRoomMessage(msgId).catch((error) => console.error("Error deleting room message:", error));
  };

  useEffect(() => {
    if (!room) return;
    const unsubscribe = subscribeToRoomMessages(
      room.room_id,
      (message) => {
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
        setOpen((currentlyOpen) => {
          if (!currentlyOpen) setUnreadCount((c) => c + 1);
          return currentlyOpen;
        });
      },
      (deletedId) => {
        setMessages((prev) => prev.filter((m) => m.id !== deletedId));
      }
    );
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

  useEffect(() => {
    if (open) announceWidgetOpened("study-group-chat");
  }, [open]);

  useEffect(() => onOtherWidgetOpened("study-group-chat", () => setOpen(false)), []);

  function pickImage(file: File | null | undefined) {
    if (!file) return;
    const invalidReason = isAllowedChatImage(file);
    if (invalidReason) {
      toast.error(invalidReason);
      return;
    }
    setPendingImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setPendingImage(file);
  }

  function clearPendingImage() {
    if (pendingImagePreview) URL.revokeObjectURL(pendingImagePreview);
    setPendingImage(null);
    setPendingImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handlePaste(e: React.ClipboardEvent) {
    const file = Array.from(e.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();
    if (file) pickImage(file);
  }

  async function handleSend() {
    const content = input.trim();
    // Note: deliberately NOT gating this on `sending`. Each call captures its
    // own `content`/`imageFile` snapshot below, so overlapping sends (e.g. the
    // user types and hits Enter again before a slow previous send resolves)
    // are independent and safe - they just both go out. Blocking on `sending`
    // used to make the second Enter press a silent no-op: it wouldn't clear
    // the input or send anything, which read as "the box won't clear so I can
    // type the next message" on a slow connection.
    if ((!content && !pendingImage) || !room || !userId) return;
    if (content && !pendingImage && isStudyRoomBotCommand(content)) {
      setSending(true);
      setInput("");
      try {
        const botMessage = await requestStudyRoomBot(room.room_id, content);
        setMessages((prev) => (prev.some((m) => m.id === botMessage.id) ? prev : [...prev, botMessage]));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không gọi được Tài Tài");
      } finally {
        setSending(false);
      }
      return;
    }
    setSending(true);
    setInput("");
    const imageFile = pendingImage;
    clearPendingImage();

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadChatImage(userId, imageFile);
      }
      const sent = await sendRoomMessage(room.room_id, userId, content, imageUrl);
      // Append immediately instead of waiting on the Realtime postgres_changes
      // subscription to echo the insert back - that round trip can lag or
      // (if Realtime replication hiccups) never arrive at all, which is what
      // made sent messages appear stuck until a full page reload re-fetched
      // history. subscribeToRoomMessages already dedupes by id, so if the
      // Realtime event does arrive later it's a no-op here.
      setMessages((prev) => (prev.some((m) => m.id === sent.id) ? prev : [...prev, sent]));
      trackFeatureClick("floating_study_chat_send", { label: String(room.room_id) });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn");
    } finally {
      setSending(false);
    }
  }

  const pinnedMessage = messages.find((m) => m.is_pinned) ?? null;
  const scrollMessages = messages.filter((m) => !m.is_pinned);

  return (
    <>
      {!hideTrigger && (
        <button
          onClick={() => {
            if (!room) {
              window.location.href = "/nhom-hoc";
              return;
            }
            setOpen((v) => !v);
            trackFeatureClick("floating_study_chat_toggle", { label: open ? "close" : "open" });
          }}
          aria-label="Chat nhóm học"
          title={room ? `Nhóm ${topicLabel(room.topic)}` : "Tham gia Nhóm Học"}
          className="fixed bottom-21 right-4 sm:bottom-23 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl hover:scale-108 transition-all duration-200 flex items-center justify-center border-2 border-white dark:border-stone-800 cursor-pointer select-none group"
        >
          <Users className="w-6 h-6 text-white transition-transform group-hover:scale-110" />

          {unreadCount > 0 && !open && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md z-10">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/20 z-40 sm:hidden" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed z-50 transition-all duration-300 ease-out
          bottom-0 left-0 right-0
          sm:bottom-24 sm:right-[5.5rem] sm:left-auto sm:w-[380px]
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}
        `}
      >
        <div className="bg-white dark:bg-stone-900 sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-stone-100 dark:border-stone-800/80 flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl h-[72vh] sm:h-[480px]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-4.5 py-4 flex items-center gap-3 shrink-0 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Users className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[13px] tracking-tight truncate">Nhóm {room ? topicLabel(room.topic) : "Học tập"}</p>
              <p className="text-emerald-100/90 text-[10px] font-medium mt-0.5">{room?.member_count ?? 1}/{room?.max_members ?? 5} thành viên hoạt động</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Đóng"
              className="w-7 h-7 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Pinned Message */}
          {pinnedMessage && (
            <div className="shrink-0 px-3.5 py-2.5 bg-amber-50/80 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30">
              <div className="flex items-center gap-1.5 mb-1">
                <TaiTaiAvatar size={16} />
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">Tài Tài • Quản lý nhóm • Đã ghim</span>
              </div>
              <p className="text-[11px] text-stone-800 dark:text-stone-200 leading-relaxed font-medium">{pinnedMessage.content}</p>
            </div>
          )}

          {/* Messages Body */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingImage(true);
            }}
            onDragLeave={() => setIsDraggingImage(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingImage(false);
              pickImage(e.dataTransfer.files?.[0]);
            }}
            className={`flex-1 overflow-y-auto p-4 space-y-3.5 transition-colors duration-200 scrollbar-thin ${
              isDraggingImage ? "bg-emerald-50/50 dark:bg-emerald-950/20" : "bg-stone-50 dark:bg-stone-950"
            }`}
          >
            {isDraggingImage && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center animate-pulse">Thả ảnh vào đây để đính kèm 📂</p>
            )}
            {scrollMessages.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-850 flex items-center justify-center mx-auto mb-3 shadow-inner text-stone-400">
                  <Users className="w-5 h-5 opacity-60" />
                </div>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                  Chưa có tin nhắn nào.<br/>Nhắn gì đó chào các bạn trong nhóm nhé!
                </p>
              </div>
            ) : (
              scrollMessages.map((msg) => {
                if (msg.is_bot) {
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 bg-amber-50/80 dark:bg-amber-950/20 shadow-xs">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <TaiTaiAvatar size={16} />
                          <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">Tài Tài • Quản lý nhóm</span>
                        </div>
                        <p className="text-[12px] text-stone-850 dark:text-stone-250 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  );
                }
                const isMine = msg.sender_id === userId;
                const member = msg.sender_id ? members.get(msg.sender_id) : null;
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
                    {!isMine &&
                      (isValidAvatar(member?.avatar_url) ? (
                        <Image
                          src={member.avatar_url}
                          alt={member.full_name || "Thành viên"}
                          width={24}
                          height={24}
                          className="rounded-full object-cover flex-shrink-0 mb-0.5 border border-stone-100 dark:border-stone-850"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[9px] font-extrabold flex items-center justify-center flex-shrink-0 mb-0.5 border border-stone-150 dark:border-stone-800">
                          {initials(member?.full_name)}
                        </div>
                      ))}
                    <div className="max-w-[75%]">
                      {!isMine && (
                        <p className="text-[9px] font-bold text-stone-450 dark:text-stone-500 mb-0.5 ml-1">
                          {member?.full_name || "Thành viên"}
                        </p>
                      )}
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed shadow-xs ${
                          isMine
                            ? "bg-gradient-to-br from-emerald-700 to-teal-600 text-white rounded-tr-sm"
                            : "bg-white dark:bg-stone-850/90 text-stone-800 dark:text-stone-100 rounded-tl-sm"
                        }`}
                      >
                        {msg.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={msg.image_url}
                            alt="Đính kèm"
                            className="max-w-full max-h-40 rounded-lg mb-2 object-contain cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => window.open(msg.image_url!, "_blank")}
                          />
                        )}
                        {msg.content && <p className="whitespace-pre-wrap break-words">{msg.content}</p>}
                      </div>
                      {isMine && (
                        <div className="flex items-center justify-end gap-1 mt-0.5">
                          <button
                            type="button"
                            onClick={() => handleDeleteStudyMessage(msg.id)}
                            className="text-[9px] font-bold text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                            title="Thu hồi &amp; xóa khỏi DB"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Thu hồi</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-850/40 shrink-0">
            {pendingImagePreview && (
              <div className="relative inline-block mb-2 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pendingImagePreview} alt="Preview" className="w-14 h-14 rounded-lg border border-stone-300 dark:border-stone-700 object-cover shadow-md" />
                <button
                  onClick={clearPendingImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-650 text-white rounded-full flex items-center justify-center shadow transition-all border border-white dark:border-stone-950 active:scale-90"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => pickImage(e.target.files?.[0])}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Đính kèm ảnh"
                className="p-2 border border-stone-100 dark:border-stone-850/50 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-xl transition flex-shrink-0 active:scale-95"
              >
                <ImagePlus className="w-4.5 h-4.5" />
              </button>
              
              <EmojiPicker onSelect={(emoji) => setInput((prev) => prev + emoji)} />
              
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
                onPaste={handlePaste}
                placeholder="Nhắn gì đó cho nhóm... hoặc /taitai"
                maxLength={2000}
                className="flex-1 min-w-0 px-3 py-2 border border-stone-100 dark:border-stone-850/40 bg-stone-50/50 dark:bg-stone-950/60 text-stone-900 dark:text-stone-100 rounded-xl text-xs focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-700 focus:bg-white dark:focus:bg-stone-950 transition-all placeholder:text-stone-400"
              />
              
              <button
                onClick={() => void handleSend()}
                disabled={sending || (!input.trim() && !pendingImage)}
                className="p-2 bg-gradient-to-br from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white rounded-xl hover:shadow disabled:opacity-30 disabled:pointer-events-none transition flex-shrink-0 active:scale-95"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
