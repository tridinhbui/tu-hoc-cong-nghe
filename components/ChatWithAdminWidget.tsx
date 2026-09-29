"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  ImagePlus,
  Loader2,
  Trash2,
  CornerUpLeft,
  MoreVertical,
  Copy,
  Pin,
  PinOff,
  CheckCheck,
  Pencil,
  Maximize2,
  Minimize2,
  Clock,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import EmojiPicker from "@/components/EmojiPicker";
import { announceWidgetOpened, onOtherWidgetOpened } from "@/lib/floating-widget-coordinator";
import { useDraggablePosition } from "@/lib/hooks/useDraggablePosition";
import { getRandomCommunityShoutout, type CommunityShoutout } from "@/lib/cloudflare-user";
import { resolveOpenChange } from "@/lib/controlled-open";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  getChatHistory,
  sendMessage,
  updateChatMessage,
  subscribeToChatMessages,
  uploadChatImage,
  isAllowedChatImage,
  markMessagesSeenByUser,
  deleteChatMessage,
  getChatReactions,
  toggleChatReaction,
  type ChatMessage,
  type ChatReactionMap,
} from "@/lib/cloudflare-chat";
import { useResizablePanel } from "@/lib/use-resizable-panel";
import { getCurrentUserId } from "@/lib/current-user";

const REACTION_EMOJIS = ["👍", "❤️", "🔥", "🚀", "💡", "😂"];

/* i18n-ignore-start: a WIRE FORMAT, not display copy. Replying prepends this
   marker to the message body before it is stored, and the renderer parses it
   back out. Translating it would leave every quoted reply already in the
   database unparseable, so it stays Vietnamese in both languages - the same
   reason the Bảng tin topic hashtags are not translated. */
const QUOTE_REPLY_PREFIX = "↩️ [Trả lời ";
/* i18n-ignore-end */

// Optimistic bubbles get a negative id so `id < 0` marks them as in-flight -
// real rows use a positive identity sequence. Without them the bubble only
// appeared after the insert round-tripped, which read as the chat lagging.
let optimisticIdCounter = -1;
const nextOptimisticId = () => optimisticIdCounter--;
const isPendingMessage = (msg: { id: number }) => msg.id < 0;

interface ChatWithAdminWidgetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export default function ChatWithAdminWidget({
  isOpen: controlledIsOpen,
  onOpenChange,
  hideTrigger,
}: ChatWithAdminWidgetProps = {}) {
  const { t } = useI18n();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [isExpanded, setIsExpanded] = useState(false);
  // Nút phóng to cũ chỉ có hai nấc và nấc rộng vẫn chặn ở max-w-2xl (672px) -
  // người dùng báo "phóng to hết rồi mà vẫn bị khuyết". Giờ bề rộng kéo được
  // và nhớ lại; nút phóng to giữ nguyên vì nó còn đổi cả chiều cao.
  const { width: panelWidth, dragging, handleProps } = useResizablePanel(
    "thtcdn_feedback_panel_width",
    isExpanded ? 672 : 384
  );
  const [isWidgetDragging, setIsWidgetDragging] = useState(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const bubbleDrag = useDraggablePosition("thtcdn_admin_chat_bubble_pos", bubbleRef);

  // So với trạng thái CÓ HIỆU LỰC, không phải `internalIsOpen` - cùng lỗi và
  // cùng cách sửa như FloatingStudyGroupChat.tsx, xem chú thích dài ở đó.
  //
  // Tóm tắt: khi GlobalChatWrapper truyền `isOpen`, sự thật nằm ở cha còn
  // `internalIsOpen` đứng yên ở `false`. Bấm X gọi `setIsOpen(false)`, bản cũ
  // so `false !== false` ra sai, `onOpenChange` không chạy, panel không đóng.
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const setIsOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      const { next, changed } = resolveOpenChange(isOpenRef.current, open);
      setInternalIsOpen(next);
      if (changed) {
        onOpenChange?.(next);
      }
    },
    [onOpenChange]
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [shoutout, setShoutout] = useState<CommunityShoutout | null>(null);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Interactive Messenger-like states
  const [replyingTo, setReplyingTo] = useState<{ id: number; senderName: string; content: string } | null>(null);
  const [editingMessage, setEditingMessage] = useState<{ id: number; content: string } | null>(null);
  const [reactions, setReactions] = useState<ChatReactionMap>({});
  const [activeMenuMsgId, setActiveMenuMsgId] = useState<number | null>(null);
  const [pinnedMsgId, setPinnedMsgId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasLoadedHistoryRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen) announceWidgetOpened("admin-chat");
  }, [isOpen]);

  useEffect(() => onOtherWidgetOpened("admin-chat", () => setIsOpen(false)), []);

  useEffect(() => {
    if (!isOpen) return;
    getRandomCommunityShoutout()
      .then(setShoutout)
      .catch((error) => console.error("Error loading community shoutout:", error));
  }, [isOpen]);

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

  function togglePinMessage(msgId: number) {
    setPinnedMsgId((prev) => {
      const next = prev === msgId ? null : msgId;
      toast.success(next ? t.chat.pinned : t.chat.unpinned);
      return next;
    });
  }

  const toggleReaction = async (msgId: number, emoji: string) => {
    if (!userId) return;

    // Optimistic flip so the emoji lands instantly, then reconcile with the
    // server's authoritative map (reactions are persisted, not local-only).
    const previous = reactions;
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

    try {
      const saved = await toggleChatReaction(msgId, emoji);
      if (saved) setReactions(saved);
    } catch (error) {
      console.error("Error toggling chat reaction:", error);
      setReactions(previous);
      toast.error(t.chat.reactionFailed);
    }
  };

  const handleDeleteMessage = async (msgId: number) => {
    if (!userId) return;
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    if (pinnedMsgId === msgId) setPinnedMsgId(null);
    toast.success(t.adminChat.recalledToast);
    await deleteChatMessage(msgId, userId).catch((error) => console.error("Error deleting message:", error));
  };

  useEffect(() => {
    if (!isOpen || !userId) return;

    const unsubscribe = subscribeToChatMessages(
      userId,
      (message) => {
        setMessages((prev) => {
          const existingIdx = prev.findIndex((m) => m.id === message.id);
          if (existingIdx === -1) return [...prev, message];
          const next = [...prev];
          next[existingIdx] = message;
          return next;
        });
        if (message.sender === "admin") void markMessagesSeenByUser(userId);
      },
      (deletedId) => {
        setMessages((prev) => prev.filter((m) => m.id !== deletedId));
        if (pinnedMsgId === deletedId) setPinnedMsgId(null);
      }
    );

    return unsubscribe;
  }, [isOpen, userId, pinnedMsgId]);

  const loadConversation = useCallback(async () => {
    if (hasLoadedHistoryRef.current || loadingHistory) return;

    setLoadingHistory(true);
    try {
      const id = await getCurrentUserId();
      if (!id) return;

      setUserId(id);
      const [history, savedReactions] = await Promise.all([
        getChatHistory(id),
        getChatReactions(id).catch((error) => {
          console.error("Error loading chat reactions:", error);
          return {} as ChatReactionMap;
        }),
      ]);
      setMessages(history);
      setReactions(savedReactions);
      hasLoadedHistoryRef.current = true;
      void markMessagesSeenByUser(id);
    } finally {
      setLoadingHistory(false);
    }
  }, [loadingHistory]);

  useEffect(() => {
    if (!isOpen) return;
    void loadConversation();
  }, [isOpen, loadConversation]);

  function pickImage(file: File | null | undefined) {
    if (!file) return;
    const invalidReason = isAllowedChatImage(file);
    if (invalidReason) {
      toast.error(t.libData.chatUpload[invalidReason]);
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

  function handlePaste(e: React.ClipboardEvent) {
    const file = Array.from(e.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();
    if (file) pickImage(file);
  }

  const handleSend = async () => {
    const rawContent = input.trim();
    if ((!rawContent && !pendingImage) || !userId || sending) return;

    if (editingMessage) {
      if (!rawContent) return;
      setSending(true);
      try {
        const updated = await updateChatMessage(editingMessage.id, rawContent);
        if (updated) {
          setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        } else {
          setMessages((prev) => prev.map((m) => (m.id === editingMessage.id ? { ...m, content: rawContent } : m)));
        }
        setInput("");
        setEditingMessage(null);
        toast.success(t.chat.edited);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t.chat.editFailed);
      } finally {
        setSending(false);
      }
      return;
    }

    let finalContent = rawContent;
    if (replyingTo && rawContent) {
      const cleanContent = replyingTo.content.replace(/^↩️ \[Trả lời [^\]]+\]:\s*"/, "").replace(/"$/, "");
      finalContent = `${QUOTE_REPLY_PREFIX}${replyingTo.senderName}]: "${cleanContent.slice(0, 45)}..."\n${rawContent}`;
    }

    setSending(true);
    setInput("");
    setReplyingTo(null);
    const imageFile = pendingImage;
    const localPreview = pendingImagePreview;
    clearPendingImage(true);

    // Show the bubble immediately, then swap it for the server's row.
    const optimisticId = nextOptimisticId();
    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        user_id: userId,
        sender: "user",
        content: finalContent,
        image_url: localPreview,
        read: false,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadChatImage(userId, imageFile);
        setUploadingImage(false);
      }

      const saved = await sendMessage(userId, "user", finalContent, imageUrl);
      setMessages((prev) => {
        const withoutOptimistic = prev.filter((m) => m.id !== optimisticId);
        if (!saved) return withoutOptimistic;
        // The realtime subscription may have already delivered this row.
        return withoutOptimistic.some((m) => m.id === saved.id) ? withoutOptimistic : [...withoutOptimistic, saved];
      });
    } catch (error) {
      console.error("Error sending chat image:", error);
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setInput(rawContent);
      toast.error(error instanceof Error ? error.message : t.chat.sendFailedRetry);
    } finally {
      if (localPreview) URL.revokeObjectURL(localPreview);
      setUploadingImage(false);
      setSending(false);
    }
  };

  const pinnedMessage = messages.find((m) => m.id === pinnedMsgId) ?? null;
  const scrollMessages = messages.filter((m) => m.id !== pinnedMsgId);

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && !hideTrigger && (
          <motion.button
            ref={bubbleRef}
            drag
            dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 120, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={() => {
              setIsWidgetDragging(true);
              bubbleDrag.onDragStart();
            }}
            onDragEnd={() => {
              setTimeout(() => setIsWidgetDragging(false), 120);
              bubbleDrag.onDragEnd();
            }}
            // Only scale is animated. x/y stay out of initial/animate and live
            // in style, owned by `drag` - see useDraggablePosition.
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ x: bubbleDrag.x, y: bubbleDrag.y }}
            onClick={(e) => {
              if (isWidgetDragging) {
                e.stopPropagation();
                return;
              }
              setIsOpen(true);
            }}
            aria-label={t.adminChat.openAria}
            title={t.adminChat.dragTitle}
            className="fixed bottom-6 right-4 sm:right-6 z-40 w-14 h-14 rounded-md bg-white dark:bg-stone-100 transition-colors hover:border-stone-400 flex items-center justify-center group overflow-hidden border border-line-strong cursor-grab active:cursor-grabbing select-none touch-none"
          >
            <Logo size={56} className="pointer-events-none" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-[1px] bg-brand-600 pointer-events-none" aria-hidden />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-950 text-white text-xs px-2.5 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {t.adminChat.dragTitle}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            // `transition-all` tắt trong lúc kéo: nó làm bề rộng đuổi theo con
            // trỏ chậm một nhịp, và cảm giác là panel dính chứ không phải mượt.
            className={`fixed inset-x-4 top-4 bottom-4 z-50 bg-white dark:bg-stone-900 rounded-md border border-line-strong flex flex-col overflow-hidden ${
              dragging ? "" : "transition-all duration-300"
            } ${
              // Bề rộng đọc từ biến CSS nên nó chỉ áp từ sm trở lên; dưới
              // sm panel vẫn chiếm trọn bề ngang như cũ. Giá trị dự phòng là
              // đúng hai cỡ thiết kế cũ, dùng cho lần dựng đầu trước khi hook
              // đọc xong localStorage.
              isExpanded
                ? "sm:inset-x-auto sm:top-6 sm:bottom-6 sm:right-6 sm:w-[var(--chat-w,42rem)] max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)]"
                : "sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:w-[var(--chat-w,24rem)] max-h-[calc(100dvh-2rem)] sm:max-h-[480px]"
            }`}
            // Bề rộng kéo tay chỉ áp từ sm trở lên; dưới đó panel chiếm trọn
            // bề ngang và một cạnh kéo 6px trên cảm ứng là bẫy chứ không phải
            // điều khiển.
            style={panelWidth !== null ? ({ "--chat-w": `${panelWidth}px` } as React.CSSProperties) : undefined}
          >
            {/* Cạnh kéo. Chỉ hiện từ sm trở lên, cùng lý do trên. */}
            <div
              {...handleProps}
              role="separator"
              aria-orientation="vertical"
              aria-label={t.adminChat.resizeHandle}
              className="absolute inset-y-0 left-0 z-10 hidden w-1.5 cursor-col-resize sm:block group/resize"
            >
              <span className="absolute inset-y-0 left-0 w-px bg-stone-200 transition-colors group-hover/resize:bg-brand-400 dark:bg-stone-800 dark:group-hover/resize:bg-brand-500" />
            </div>
            {/* Header */}
            <div className="bg-stone-950 text-white px-4 py-3 flex items-center gap-3 border-b border-stone-800 shrink-0">
              <div className="relative flex-shrink-0">
                <Logo size={34} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-[1px] bg-brand-500" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-[13px] tracking-tight">{t.adminChat.title}</h3>
                <p className="text-[10px] text-brand-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-[1px] bg-brand-500" />
                  {t.adminChat.status}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="hidden sm:flex text-stone-400 hover:text-white hover:bg-white/10 p-1.5 rounded-sm transition-colors flex-shrink-0 cursor-pointer"
                aria-label={isExpanded ? t.adminChat.collapseChat : t.adminChat.expandChat}
                title={isExpanded ? t.adminChat.collapseChat : t.adminChat.expandChat}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white hover:bg-white/10 p-1.5 rounded-sm transition-colors flex-shrink-0 cursor-pointer"
                aria-label={t.adminChat.closeAria}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pinned Message Banner */}
            {pinnedMessage && (
              <div className="shrink-0 px-3.5 py-2 bg-surface-raised dark:bg-stone-950 border-b border-line flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Pin className="w-3 h-3 text-ink-muted" aria-hidden />
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                      {format(t.adminChat.pinnedBy, { who: pinnedMessage.sender === "user" ? t.chat.you : t.adminChat.adminName })}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-heading leading-relaxed font-medium truncate">
                    {pinnedMessage.content}
                  </p>
                </div>
                <button
                  onClick={() => setPinnedMsgId(null)}
                  className="text-stone-400 hover:text-ink-body p-0.5 rounded-sm cursor-pointer"
                  title={t.adminChat.unpinTitle}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Community shoutout */}
            {shoutout && (
              <div className="shrink-0 px-4 py-2 bg-page dark:bg-stone-950/40 border-b border-line text-[11px] text-ink-body font-semibold leading-relaxed flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.75} aria-hidden />
                {format(t.libData.shoutouts[shoutout.variant] ?? t.libData.shoutouts[0], {
                  name: shoutout.name,
                  value: shoutout.value,
                })}
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
              className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-200 scrollbar-thin ${
                isDraggingImage ? "bg-brand-50/50 dark:bg-brand-950/20" : "bg-surface"
              }`}
            >
              {isDraggingImage && (
                <p className="text-xs font-bold text-accent text-center">
                  {t.chat.dropImage}
                </p>
              )}
              {loadingHistory && scrollMessages.length === 0 && (
                <p className="text-center text-xs text-ink-faint mt-12">
                  {t.adminChat.loading}
                </p>
              )}
              {!loadingHistory && scrollMessages.length === 0 && (
                <div className="text-center px-4 py-8 mt-6">
                  <div className="w-12 h-12 rounded-md border border-line bg-surface-raised flex items-center justify-center mx-auto mb-3">
                    <Logo size={28} className="opacity-60" />
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed font-medium">
                    {t.adminChat.emptyPart1}
                    <br />
                    {t.adminChat.emptyPart2}
                  </p>
                </div>
              )}
              {scrollMessages.map((msg) => {
                const isMine = msg.sender === "user";
                const isPending = isPendingMessage(msg);
                const senderName = isMine ? t.chat.you : t.adminChat.adminName;
                const msgReactions = reactions[msg.id] || {};

                // Check if message contains a quote reply
                const isQuoteReply = msg.content && msg.content.startsWith(QUOTE_REPLY_PREFIX);
                let quoteHeader = "";
                let mainText = msg.content || "";
                if (isQuoteReply && msg.content) {
                  const lines = msg.content.split("\n");
                  // Emoji trong tiền tố là định dạng lưu trữ, không phải giao diện:
                  // giữ nó trong dữ liệu, bỏ nó khi hiển thị.
                  quoteHeader = lines[0].replace(/^↩️\s*/u, "");
                  mainText = lines.slice(1).join("\n");
                }

                return (
                  <div
                    key={msg.id}
                    className={`group relative flex flex-col ${isMine ? "items-end" : "items-start"} ${
                      isPending ? "opacity-60" : ""
                    }`}
                  >
                    <div className={`flex items-end gap-1.5 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="relative max-w-[85%] w-fit min-w-0">
                        <div
                          className={`relative rounded-md px-3 py-2 text-[12px] leading-relaxed w-fit ${
                            isMine
                              ? "bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950"
                              : "bg-white dark:bg-stone-800/90 text-ink-heading border border-line"
                          }`}
                        >
                          {/* Quoted Message Box */}
                          {isQuoteReply && (
                            <div
                              className={`mb-1.5 p-1.5 rounded-xs border-l-2 text-[11px] font-medium leading-snug ${
                                isMine
                                  ? "border-brand-400 bg-black/15 dark:bg-stone-200/20 text-stone-100 dark:text-stone-800"
                                  : "border-brand-500 bg-stone-100 dark:bg-stone-900/60 text-ink-body"
                              }`}
                            >
                              <p className="opacity-90 font-bold">{quoteHeader}</p>
                            </div>
                          )}

                          {msg.image_url && (
                            // `width`/`height` chỉ là gợi ý tỉ lệ; cặp
                            // `width: auto, height: auto` trả kích thước hiển
                            // thị về đúng cỡ tự nhiên của ảnh như thẻ <img> cũ,
                            // để `max-h-40` vẫn là thứ quyết định khung.
                            //
                            // Bấm vào ảnh vẫn mở BẢN GỐC trong tab mới - đó là
                            // chủ đích, và cũng là lý do bản gốc vẫn cần được
                            // thu nhỏ lúc tải lên (lib/downscale-image.ts) chứ
                            // không chỉ dựa vào trình tối ưu ở đây.
                            <Image
                              src={msg.image_url}
                              alt={t.chat.attachmentAlt}
                              width={320}
                              height={240}
                              sizes="320px"
                              style={{ width: "auto", height: "auto" }}
                              className="max-w-full max-h-40 rounded-sm mb-2 object-contain cursor-pointer hover:opacity-95 transition-opacity"
                              onClick={() => window.open(msg.image_url!, "_blank")}
                            />
                          )}
                          {mainText && <p className="whitespace-pre-wrap break-words">{mainText}</p>}
                        </div>

                        {/* 3-Dots Menu Trigger Button - hidden while in flight,
                            since reply/pin/react all need a real row id. */}
                        <div className={`${isPending ? "hidden" : ""} ${isMine ? "absolute right-full top-1/2 mr-1 -translate-y-1/2" : "absolute left-full top-1/2 ml-1 -translate-y-1/2"}`}>
                          <button
                            onClick={() => setActiveMenuMsgId(activeMenuMsgId === msg.id ? null : msg.id)}
                            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded-sm hover:bg-surface-sunken text-ink-muted cursor-pointer bg-white dark:bg-stone-800 border border-line"
                            title={t.chat.optionsTitle}
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* 3-Dots Dropdown Popup Menu */}
                          {activeMenuMsgId === msg.id && (
                            <div
                              className={`absolute bottom-full mb-1 z-50 min-w-[155px] bg-white dark:bg-stone-900 rounded-sm p-1 border border-line-strong text-xs space-y-0.5 ${
                                isMine ? "right-0" : "left-0"
                              }`}
                            >
                              {/* Quick Emoji Reaction Row */}
                              <div className="flex items-center justify-between px-1.5 py-1 bg-surface-raised dark:bg-stone-800/60 rounded-xs mb-1 border border-line">
                                {REACTION_EMOJIS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => {
                                      void toggleReaction(msg.id, emoji);
                                      setActiveMenuMsgId(null);
                                    }}
                                    className="rounded-xs p-0.5 text-[11px] cursor-pointer hover:bg-white dark:hover:bg-stone-700"
                                    title={format(t.chat.reactionTitle, { emoji })}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>

                              <button
                                onClick={() => {
                                  setReplyingTo({
                                    id: msg.id,
                                    senderName,
                                    content: mainText || msg.content,
                                  });
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-surface-raised dark:hover:bg-stone-800 text-ink-heading font-semibold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                <CornerUpLeft className="w-3 h-3 text-ink-muted" aria-hidden />
                                <span>{t.chat.reply}</span>
                              </button>

                              <button
                                onClick={() => {
                                  togglePinMessage(msg.id);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-surface-raised dark:hover:bg-stone-800 text-ink-heading font-semibold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                {pinnedMsgId === msg.id ? (
                                  <PinOff className="w-3 h-3 text-ink-muted" aria-hidden />
                                ) : (
                                  <Pin className="w-3 h-3 text-ink-muted" aria-hidden />
                                )}
                                <span>{pinnedMsgId === msg.id ? t.chat.unpin : t.chat.pin}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void copyMessageText(mainText || msg.content);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-surface-raised dark:hover:bg-stone-800 text-ink-heading font-semibold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                <Copy className="w-3 h-3 text-ink-muted" aria-hidden />
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
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-surface-raised dark:hover:bg-stone-800 text-ink-heading font-semibold transition-colors text-left text-[11px] cursor-pointer"
                                  >
                                    <Pencil className="w-3 h-3 text-ink-muted" aria-hidden />
                                    <span>{t.chat.edit}</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setActiveMenuMsgId(null);
                                      void handleDeleteMessage(msg.id);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-red-50 dark:hover:bg-red-950/40 text-danger font-semibold transition-colors text-left text-[11px] cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" aria-hidden />
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
                                  onClick={() => void toggleReaction(msg.id, emoji)}
                                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-xs border transition-colors cursor-pointer ${
                                    hasMyReaction
                                      ? "bg-brand-50 border-accent-line text-accent-strong dark:bg-brand-950/40"
                                      : "bg-white dark:bg-stone-900 border-line text-ink-body"
                                  }`}
                                >
                                  <span>{emoji}</span>
                                  <span>{count}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Message Status */}
                        {isMine && (
                          <div className="mt-1 flex items-center justify-end gap-1 text-[9px] font-bold text-ink-faint whitespace-nowrap">
                            {isPending ? (
                              <>
                                <Clock className="h-3 w-3 shrink-0 text-stone-400" aria-hidden />
                                <span className="whitespace-nowrap">{t.chat.sending}</span>
                              </>
                            ) : (
                              <>
                                <CheckCheck className={`h-3 w-3 shrink-0 ${msg.read ? "text-brand-500" : "text-stone-400"}`} />
                                <span className="whitespace-nowrap">{msg.read ? t.chat.seen : t.chat.sent}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="p-3 bg-white dark:bg-stone-900 border-t border-line shrink-0">
              {/* Replying Banner Preview */}
              {replyingTo && (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm bg-brand-50 dark:bg-brand-950/40 border border-accent-line text-xs text-ink-heading mb-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-accent">
                      {format(t.chat.replyingTo, { name: replyingTo.senderName })}
                    </span>
                    <p className="truncate text-[10px] text-ink-soft mt-0.2">
                      {replyingTo.content}
                    </p>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-stone-400 hover:text-ink-body p-0.5 rounded-sm cursor-pointer"
                    title={t.chat.cancelReply}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Editing Banner Preview */}
              {editingMessage && (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm bg-surface-raised dark:bg-stone-950 border border-line text-xs text-ink-heading mb-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-ink-max">{t.chat.editing}</span>
                    <p className="truncate text-[10px] text-ink-soft mt-0.2">
                      {editingMessage.content}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingMessage(null);
                      setInput("");
                    }}
                    className="text-stone-400 hover:text-ink-body p-0.5 rounded-sm cursor-pointer"
                    title={t.chat.cancelEdit}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {pendingImagePreview && (
                <div className="relative inline-block mb-2 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pendingImagePreview || ""}
                    alt={t.chat.previewAlt}
                    className="w-14 h-14 rounded-sm object-cover border border-line"
                  />
                  <button
                    onClick={() => clearPendingImage()}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-950 hover:bg-red-600 text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => pickImage(e.target.files?.[0])}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  title={t.chat.attachImage}
                  className="p-2 border border-line text-ink-muted hover:text-ink-heading hover:border-stone-500 rounded-sm transition-colors flex-shrink-0 cursor-pointer"
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
                  placeholder={editingMessage ? t.chat.editPlaceholder : t.adminChat.inputPlaceholder}
                  className="flex-1 min-w-0 px-3 py-2 border border-line bg-page dark:bg-stone-950/60 text-ink rounded-sm text-xs focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-stone-950 transition-colors placeholder:text-stone-400"
                />

                <button
                  onClick={() => void handleSend()}
                  disabled={(!input.trim() && !pendingImage) || sending || !userId}
                  className="p-2 bg-stone-950 text-white hover:bg-brand-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300 rounded-sm disabled:opacity-30 disabled:pointer-events-none transition-colors flex-shrink-0 cursor-pointer"
                  aria-label={t.chat.sendAria}
                >
                  {uploadingImage || sending ? (
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  ) : (
                    <Send className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
