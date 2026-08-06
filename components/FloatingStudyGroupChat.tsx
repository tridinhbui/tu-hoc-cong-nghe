"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { toast } from "sonner";
import { Users, Send, X, ImagePlus, Paperclip, FileText, Download, Trash2, CornerUpLeft, MoreVertical, Copy, Pin, PinOff, CheckCheck, Pencil, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import { uploadChatImage, isAllowedChatImage, uploadChatFile, isAllowedChatFile } from "@/lib/supabase-chat";
import { announceWidgetOpened, onOtherWidgetOpened } from "@/lib/floating-widget-coordinator";
import EmojiPicker from "@/components/EmojiPicker";
import { motion } from "framer-motion";
import { useDraggablePosition } from "@/lib/hooks/useDraggablePosition";
import { useI18n } from "@/lib/i18n/context";
import { format, type Dictionary } from "@/lib/i18n";
import {
  STUDY_ROOM_TOPICS,
  getMyStudyRoom,
  getRoomMessages,
  getStudyRoomMembers,
  isStudyRoomBotCommand,
  requestStudyRoomBot,
  sendRoomMessage,
  deleteRoomMessage,
  updateRoomMessage,
  setRoomMessagePinned,
  subscribeToRoomMessages,
  type StudyRoomSummary,
  type StudyRoomMessage,
  type StudyRoomMember,
} from "@/lib/supabase-study-rooms";

const REACTION_EMOJIS = ["👍", "❤️", "🔥", "🚀", "💡", "😂"];

// Takes the dictionary because it is a plain function. STUDY_ROOM_TOPICS uses the
// same ids as t.tracks ("personal" | "professional" | "cfa"), so the track names
// are reused rather than duplicated as a second set of keys.
function topicLabel(topic: string, t: Dictionary) {
  if (topic === "personal" || topic === "professional" || topic === "cfa") {
    return t.tracks[topic].tab;
  }
  return STUDY_ROOM_TOPICS.find((entry) => entry.id === topic)?.label ?? topic;
}

function initials(name: string | null | undefined) {
  return (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Optimistic bubbles get a negative id so `id < 0` is enough to mark them as
// still-in-flight - real rows use a positive identity sequence. Without them
// the bubble only appeared after the insert round-tripped, which on a slow
// connection read as the chat lagging behind what you typed.
let optimisticIdCounter = -1;
const nextOptimisticId = () => optimisticIdCounter--;
const isPendingMessage = (msg: { id: number }) => msg.id < 0;

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
  const { t } = useI18n();
  const [userId, setUserId] = useState<string | null>(null);
  const [room, setRoom] = useState<StudyRoomSummary | null>(null);
  const [members, setMembers] = useState<Map<string, StudyRoomMember>>(new Map());
  const [internalOpen, setInternalOpen] = useState(false);
  const [isBubbleDragging, setIsBubbleDragging] = useState(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const bubbleDrag = useDraggablePosition("thtcdn_study_group_chat_bubble_pos", bubbleRef);
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
  /** Resolves reply_to_id against the loaded window - see the quote block below. */
  const messageById = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

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
          toast.success(format(t.groupChat.matchedToast, { topic: topicLabel(myRoom.topic, t) }));
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
    const unsubscribe = subscribeToRoomMessages(
      room.room_id,
      (message) => {
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev.map((m) => (m.id === message.id ? message : m)) : [...prev, message]));
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

  // keepPreviewUrl: the optimistic bubble reuses the object URL to render the
  // attachment while the upload is in flight, so the caller revokes it later.
  function clearPendingImage(keepPreviewUrl = false) {
    if (pendingImagePreview && !keepPreviewUrl) URL.revokeObjectURL(pendingImagePreview);
    setPendingImage(null);
    setPendingImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function pickFile(file: File | null | undefined) {
    if (!file) return;
    const invalidReason = isAllowedChatFile(file);
    if (invalidReason) {
      toast.error(invalidReason);
      return;
    }
    setPendingFile(file);
  }

  function clearPendingFile() {
    setPendingFile(null);
    if (docInputRef.current) docInputRef.current.value = "";
  }

  function handlePaste(e: React.ClipboardEvent) {
    const file = Array.from(e.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();
    if (file) pickImage(file);
  }

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
      toast.success(updated.is_pinned ? "Đã ghim tin nhắn" : "Đã bỏ ghim tin nhắn");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không cập nhật được ghim");
    }
  }

  const toggleReaction = (msgId: number, emoji: string) => {
    if (!userId) return;
    setReactions((prev) => {
      const msgReactions = prev[msgId] || {};
      const userList = msgReactions[emoji] || [];
      const hasReacted = userList.includes(userId);
      const updatedUsers = hasReacted
        ? userList.filter((id) => id !== userId)
        : [...userList, userId];

      const newMsgReactions = { ...msgReactions };
      if (updatedUsers.length > 0) {
        newMsgReactions[emoji] = updatedUsers;
      } else {
        delete newMsgReactions[emoji];
      }

      return { ...prev, [msgId]: newMsgReactions };
    });
  };

  async function handleSend() {
    const rawContent = input.trim();
    if ((!rawContent && !pendingImage && !pendingFile) || !room || !userId) return;

    if (editingMessage) {
      if (!rawContent) return;
      setSending(true);
      try {
        const updated = await updateRoomMessage(editingMessage.id, rawContent);
        setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setInput("");
        setEditingMessage(null);
        toast.success(t.chat.edited);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không sửa được tin nhắn");
      } finally {
        setSending(false);
      }
      return;
    }

    // Reply is a foreign key (reply_to_id), not a prefix pasted into the
    // body - see 20260820_study_room_message_replies.sql.
    const finalContent = rawContent;
    const replyToId = replyingTo?.id ?? null;

    if (rawContent && !pendingImage && !pendingFile && isStudyRoomBotCommand(rawContent)) {
      setSending(true);
      setInput("");
      setReplyingTo(null);
      try {
        const botMessage = await requestStudyRoomBot(room.room_id, rawContent);
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
    setReplyingTo(null);
    const imageFile = pendingImage;
    const localPreview = pendingImagePreview;
    const docFile = pendingFile;
    clearPendingImage(true);
    clearPendingFile();

    // Show the bubble immediately, then swap it for the server's row.
    const optimisticId = nextOptimisticId();
    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        room_id: room.room_id,
        sender_id: userId,
        content: finalContent,
        image_url: localPreview,
        file_url: null,
        file_name: docFile?.name ?? null,
        created_at: new Date().toISOString(),
        is_bot: false,
        is_pinned: false,
        reply_to_id: replyToId,
      },
    ]);

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadChatImage(userId, imageFile);
      }
      let fileMeta: { url: string; name: string } | null = null;
      if (docFile) {
        fileMeta = await uploadChatFile(userId, docFile);
      }
      const sent = await sendRoomMessage(room.room_id, userId, finalContent, imageUrl, replyToId, fileMeta);
      setMessages((prev) => {
        const withoutOptimistic = prev.filter((m) => m.id !== optimisticId);
        // The realtime subscription may have already delivered this row.
        return withoutOptimistic.some((m) => m.id === sent.id) ? withoutOptimistic : [...withoutOptimistic, sent];
      });
      trackFeatureClick("floating_study_chat_send", { label: String(room.room_id) });
    } catch (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setInput(rawContent);
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn");
    } finally {
      if (localPreview) URL.revokeObjectURL(localPreview);
      setSending(false);
    }
  }

  const pinnedMessage = messages.find((m) => m.is_pinned) ?? null;
  const scrollMessages = messages.filter((m) => !m.is_pinned);

  return (
    <>
      {!hideTrigger && (
        <motion.button
          ref={bubbleRef}
          drag
          dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 120, bottom: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => {
            setIsBubbleDragging(true);
            bubbleDrag.onDragStart();
          }}
          onDragEnd={() => {
            setTimeout(() => setIsBubbleDragging(false), 120);
            bubbleDrag.onDragEnd();
          }}
          style={{ x: bubbleDrag.x, y: bubbleDrag.y }}
          onClick={(e) => {
            if (isBubbleDragging) {
              e.stopPropagation();
              return;
            }
            if (!room) {
              window.location.href = "/nhom-hoc";
              return;
            }
            setOpen((v) => !v);
            trackFeatureClick("floating_study_chat_toggle", { label: open ? "close" : "open" });
          }}
          aria-label={t.groupChat.openAria}
          title={room ? format(t.groupChat.dragTitle, { topic: topicLabel(room.topic, t) }) : t.groupChat.joinTitle}
          className="fixed bottom-21 right-4 sm:bottom-23 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl hover:scale-108 transition-all duration-200 flex items-center justify-center border-2 border-white dark:border-stone-800 cursor-grab active:cursor-grabbing select-none touch-none group"
        >
          <Users className="w-6 h-6 text-white transition-transform group-hover:scale-110 pointer-events-none" />

          {unreadCount > 0 && !open && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md z-10 pointer-events-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </motion.button>
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
        <div className="bg-white dark:bg-stone-900 sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-stone-100 dark:border-stone-800/80 flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl h-[72dvh] sm:h-[480px]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-4.5 py-4 flex items-center gap-3 shrink-0 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Users className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[13px] tracking-tight truncate">{format(t.groupChat.roomTitle, { topic: room ? topicLabel(room.topic, t) : t.groupChat.roomFallback })}</p>
              <p className="text-emerald-100/90 text-[10px] font-medium mt-0.5">{format(t.groupChat.memberCount, { count: room?.member_count ?? 1, max: room?.max_members ?? 5 })}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.groupChat.closeAria}
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
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">{t.groupChat.pinnedByAdmin}</span>
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
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center animate-pulse">{t.groupChat.dropImage}</p>
            )}
            {scrollMessages.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3 shadow-inner text-stone-400">
                  <Users className="w-5 h-5 opacity-60" />
                </div>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                  {t.groupChat.emptyPart1}
              <br />
              {t.groupChat.emptyPart2}
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
                          <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">{t.groupChat.byAdmin}</span>
                        </div>
                        <p className="text-[12px] text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  );
                }
                const isMine = msg.sender_id === userId;
                const isPending = isPendingMessage(msg);
                const member = msg.sender_id ? members.get(msg.sender_id) : null;
                const senderName = member?.full_name || t.chat.member;
                const msgReactions = reactions[msg.id] || {};

                // Quote resolved live from the original rather than copied
                // into this message's text, so edits and deletions of the
                // original propagate. null = original gone or out of window.
                const repliedTo = msg.reply_to_id ? messageById.get(msg.reply_to_id) ?? null : null;
                const repliedToName = repliedTo?.is_bot
                  ? t.chat.admin
                  : repliedTo?.sender_id
                  ? members.get(repliedTo.sender_id)?.full_name || t.chat.member
                  : null;
                const mainText = msg.content || "";

                return (
                  <div
                    key={msg.id}
                    className={`group relative flex flex-col ${isMine ? "items-end" : "items-start"} ${
                      isPending ? "opacity-60" : ""
                    }`}
                  >
                    <div className={`flex items-end gap-1.5 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                      {!isMine &&
                        (isValidAvatar(member?.avatar_url) ? (
                          <Image
                            src={member.avatar_url}
                            alt={senderName}
                            width={24}
                            height={24}
                            className="rounded-full object-cover flex-shrink-0 mb-0.5 border border-stone-100 dark:border-stone-800"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[9px] font-extrabold flex items-center justify-center flex-shrink-0 mb-0.5 border border-stone-100 dark:border-stone-800">
                            {initials(member?.full_name)}
                          </div>
                        ))}
                      <div className="relative max-w-[85%] w-fit min-w-0">
                        {!isMine && (
                          <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 mb-0.5 ml-1">
                            {senderName}
                          </p>
                        )}
                        <div
                          className={`relative rounded-2xl px-3.5 py-2 text-[12px] leading-relaxed shadow-xs w-fit ${
                            isMine
                              ? "bg-emerald-700 dark:bg-emerald-600 text-white rounded-tr-xs"
                              : "bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-100 rounded-tl-xs border border-stone-100 dark:border-stone-800"
                          }`}
                        >
                          {/* Quoted message, read live from the original */}
                          {msg.reply_to_id !== null && (
                            <div className="mb-1.5 p-1.5 rounded-lg border-l-2 border-emerald-400 bg-black/10 dark:bg-white/10 text-[11px] font-medium leading-snug">
                              {repliedTo ? (
                                <>
                                  <span className="block font-bold opacity-90">↩️ {repliedToName}</span>
                                  <span className="block truncate opacity-75">
                                    {!repliedTo.content && repliedTo.image_url
                                      ? t.chat.imagePlaceholder
                                      : !repliedTo.content && repliedTo.file_name
                                        ? `[Tệp: ${repliedTo.file_name}]`
                                        : repliedTo.content}
                                  </span>
                                </>
                              ) : (
                                <span className="block italic opacity-60">{t.chat.deleted}</span>
                              )}
                            </div>
                          )}

                          {msg.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={msg.image_url}
                              alt={t.chat.attachmentAlt}
                              className="max-w-full max-h-40 rounded-lg mb-2 object-contain cursor-pointer hover:opacity-95 transition-opacity"
                              onClick={() => window.open(msg.image_url!, "_blank")}
                            />
                          )}
                          {msg.file_name && (
                            msg.file_url ? (
                              <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={msg.file_name}
                                className={`mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-colors ${
                                  isMine
                                    ? "bg-white/15 hover:bg-white/25"
                                    : "bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800"
                                }`}
                              >
                                <FileText className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate flex-1">{msg.file_name}</span>
                                <Download className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                              </a>
                            ) : (
                              <div className="mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium opacity-70 bg-black/10 dark:bg-white/10">
                                <FileText className="w-4 h-4 flex-shrink-0 animate-pulse" />
                                <span className="truncate flex-1">{format(t.groupChat.uploading, { name: msg.file_name })}</span>
                              </div>
                            )
                          )}
                          {mainText && <p className="whitespace-pre-wrap break-words">{mainText}</p>}
                        </div>

                        {/* 3-Dots Menu Trigger Button - hidden while in flight,
                            since reply/pin/react all need a real row id. */}
                        <div className={`${isPending ? "hidden" : ""} ${isMine ? "absolute right-full top-1/2 mr-1 -translate-y-1/2" : "relative"}`}>
                          <button
                            onClick={() => setActiveMenuMsgId(activeMenuMsgId === msg.id ? null : msg.id)}
                            className={`${isMine ? "opacity-70" : "opacity-0 mt-1"} group-hover:opacity-100 transition-all duration-200 p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-pointer shadow-xs bg-white/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700 hover:scale-105`}
                            title={t.chat.optionsTitle}
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* 3-Dots Dropdown Popup Menu */}
                          {activeMenuMsgId === msg.id && (
                            <div className={`absolute bottom-full mb-1 z-50 min-w-[155px] bg-white dark:bg-stone-900 rounded-2xl p-1.5 shadow-xl border border-stone-200 dark:border-stone-800 backdrop-blur-md text-xs space-y-1 ${isMine ? "right-0" : "left-0"}`}>
                              {/* Quick Emoji Reaction Row */}
                              <div className="flex items-center justify-between px-1.5 py-1 bg-stone-50 dark:bg-stone-800/60 rounded-xl mb-1 border border-stone-100 dark:border-stone-700/50">
                                {REACTION_EMOJIS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => {
                                      toggleReaction(msg.id, emoji);
                                      setActiveMenuMsgId(null);
                                    }}
                                    className="hover:scale-130 transition-transform p-0.5 text-[11px]"
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
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px]"
                              >
                                <CornerUpLeft className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>{t.chat.reply}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void togglePinMessage(msg);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px]"
                              >
                                {msg.is_pinned ? <PinOff className="w-3 h-3 text-amber-600 dark:text-amber-400" /> : <Pin className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                                <span>{msg.is_pinned ? t.chat.unpin : t.chat.pin}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void copyMessageText(mainText || msg.content);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px]"
                              >
                                <Copy className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                                <span>{t.chat.copy}</span>
                              </button>

                              {isMine && (
                                <>
                                <button
                                  onClick={() => {
                                    setEditingMessage({ id: msg.id, content: mainText || msg.content });
                                    setInput(mainText || msg.content);
                                    setReplyingTo(null);
                                    setActiveMenuMsgId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px]"
                                >
                                  <Pencil className="w-3 h-3 text-sky-600 dark:text-sky-400" />
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
                                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold transition-colors text-left text-[11px]"
                                >
                                  <Trash2 className="w-3 h-3 text-rose-500" />
                                  <span>{t.chat.recall}</span>
                                </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Display Active Reaction Badges */}
                        {Object.keys(msgReactions).length > 0 && (
                          <div className={`flex flex-wrap gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
                            {Object.entries(msgReactions).map(([emoji, userIds]) => {
                              const count = userIds.length;
                              if (count === 0) return null;
                              const hasMyReaction = userId ? userIds.includes(userId) : false;
                              return (
                                <button
                                  key={emoji}
                                  onClick={() => toggleReaction(msg.id, emoji)}
                                  className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full border transition-all ${
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
                          <div className="mt-1 flex items-center justify-end gap-1 text-[9px] font-bold text-stone-400 dark:text-stone-500 whitespace-nowrap">
                            {isPending ? (
                              <>
                                <Clock className="h-3 w-3 text-stone-400 shrink-0 animate-pulse" />
                                <span className="whitespace-nowrap">{t.chat.sending}</span>
                              </>
                            ) : (
                              <>
                                <CheckCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                                <span className="whitespace-nowrap">{members.size > 1 ? t.chat.seen : t.chat.sent}</span>
                              </>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800/40 shrink-0">
            {/* Replying Banner Preview */}
            {replyingTo && (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200 mb-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.chat.replyingTo, { name: replyingTo.senderName })}</span>
                  <p className="truncate text-[10px] text-stone-600 dark:text-stone-400 mt-0.2">{replyingTo.content}</p>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 rounded-full cursor-pointer"
                  title={t.chat.cancelReply}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {editingMessage && (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-stone-800 dark:text-stone-200 mb-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-sky-600 dark:text-sky-400">{t.chat.editing}</span>
                  <p className="truncate text-[10px] text-stone-600 dark:text-stone-400 mt-0.2">{editingMessage.content}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingMessage(null);
                    setInput("");
                  }}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 rounded-full cursor-pointer"
                  title={t.chat.cancelEdit}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {pendingImagePreview && (
              <div className="relative inline-block mb-2 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pendingImagePreview} alt={t.chat.previewAlt} className="w-14 h-14 rounded-lg border border-stone-300 dark:border-stone-700 object-cover shadow-md" />
                <button
                  onClick={() => clearPendingImage()}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-all border border-white dark:border-stone-950 active:scale-90"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {pendingFile && (
              <div className="relative inline-flex items-center gap-1.5 mb-2 max-w-full pl-2 pr-6 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-[11px] font-medium text-stone-700 dark:text-stone-200">
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate max-w-[180px]">{pendingFile.name}</span>
                <button
                  onClick={() => clearPendingFile()}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-all border border-white dark:border-stone-950 active:scale-90"
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
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip"
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                title={t.chat.attachImage}
                className="p-2 border border-stone-100 dark:border-stone-800/50 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition flex-shrink-0 active:scale-95"
              >
                <ImagePlus className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => docInputRef.current?.click()}
                title={t.chat.attachFile}
                className="p-2 border border-stone-100 dark:border-stone-800/50 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition flex-shrink-0 active:scale-95"
              >
                <Paperclip className="w-4.5 h-4.5" />
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
                placeholder={editingMessage ? "Chỉnh lại nội dung tin nhắn..." : "Nhắn gì đó cho nhóm... hoặc /taitai"}
                maxLength={2000}
                className="flex-1 min-w-0 px-3 py-2 border border-stone-100 dark:border-stone-800/40 bg-stone-50/50 dark:bg-stone-950/60 text-stone-900 dark:text-stone-100 rounded-xl text-xs focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-700 focus:bg-white dark:focus:bg-stone-950 transition-all placeholder:text-stone-400"
              />
              
              <button
                onClick={() => void handleSend()}
                disabled={sending || (!input.trim() && !pendingImage && !pendingFile)}
                className="p-2 bg-gradient-to-br from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white rounded-xl hover:shadow disabled:opacity-30 disabled:pointer-events-none transition flex-shrink-0 active:scale-95"
                aria-label={t.chat.sendAria}
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
