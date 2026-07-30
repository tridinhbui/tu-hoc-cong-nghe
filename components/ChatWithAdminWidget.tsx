"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";
import EmojiPicker from "@/components/EmojiPicker";
import { announceWidgetOpened, onOtherWidgetOpened } from "@/lib/floating-widget-coordinator";
import { getRandomCommunityShoutout } from "@/lib/supabase-user";
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
} from "@/lib/supabase-chat";

const REACTION_EMOJIS = ["👍", "❤️", "🔥", "🚀", "💡", "😂"];

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
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWidgetDragging, setIsWidgetDragging] = useState(false);

  const setIsOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      setInternalIsOpen((prev) => {
        const next = typeof open === "function" ? open(prev) : open;
        if (prev !== next) {
          onOpenChange?.(next);
        }
        return next;
      });
    },
    [onOpenChange]
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [shoutout, setShoutout] = useState<string | null>(null);
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
      toast.success("Đã sao chép tin nhắn");
    } catch {
      toast.error("Không sao chép được tin nhắn");
    }
  }

  function togglePinMessage(msgId: number) {
    setPinnedMsgId((prev) => {
      const next = prev === msgId ? null : msgId;
      toast.success(next ? "Đã ghim tin nhắn" : "Đã bỏ ghim tin nhắn");
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
      toast.error("Không lưu được cảm xúc. Vui lòng thử lại.");
    }
  };

  const handleDeleteMessage = async (msgId: number) => {
    if (!userId) return;
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    if (pinnedMsgId === msgId) setPinnedMsgId(null);
    toast.success("🗑️ Đã thu hồi tin nhắn thành công!");
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
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);
      const [history, savedReactions] = await Promise.all([
        getChatHistory(user.id),
        getChatReactions(user.id).catch((error) => {
          console.error("Error loading chat reactions:", error);
          return {} as ChatReactionMap;
        }),
      ]);
      setMessages(history);
      setReactions(savedReactions);
      hasLoadedHistoryRef.current = true;
      void markMessagesSeenByUser(user.id);
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
        toast.success("Đã chỉnh sửa tin nhắn");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không sửa được tin nhắn");
      } finally {
        setSending(false);
      }
      return;
    }

    let finalContent = rawContent;
    if (replyingTo && rawContent) {
      const cleanContent = replyingTo.content.replace(/^↩️ \[Trả lời [^\]]+\]:\s*"/, "").replace(/"$/, "");
      finalContent = `↩️ [Trả lời ${replyingTo.senderName}]: "${cleanContent.slice(0, 45)}..."\n${rawContent}`;
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
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn. Vui lòng thử lại.");
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
            drag
            dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 120, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={() => setIsWidgetDragging(true)}
            onDragEnd={() => setTimeout(() => setIsWidgetDragging(false), 120)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => {
              if (isWidgetDragging) {
                e.stopPropagation();
                return;
              }
              setIsOpen(true);
            }}
            aria-label="Admin Chatbot"
            title="Admin Chatbot (Kéo thả để di chuyển)"
            className="fixed bottom-6 right-4 sm:right-6 z-40 w-14 h-14 rounded-full bg-white dark:bg-stone-100 shadow-lg hover:shadow-xl hover:scale-105 transition-transform flex items-center justify-center group overflow-hidden border border-stone-200 dark:border-stone-300 cursor-grab active:cursor-grabbing select-none touch-none"
          >
            <Logo size={56} className="rounded-full pointer-events-none" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-100 pointer-events-none" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-900 dark:bg-stone-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
              Admin Chatbot (Kéo thả để di chuyển)
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
            className={`fixed inset-x-4 top-4 bottom-4 z-50 bg-white dark:bg-stone-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-stone-100 dark:border-stone-800/80 flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "sm:inset-x-auto sm:top-6 sm:bottom-6 sm:right-6 sm:w-[calc(100vw-3rem)] sm:max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)]"
                : "sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:w-96 max-h-[calc(100dvh-2rem)] sm:max-h-[480px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white px-4.5 py-4 flex items-center gap-3 border-b border-stone-100/10 shadow-sm shrink-0">
              <div className="relative flex-shrink-0">
                <Logo size={38} className="rounded-full" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[13px] tracking-tight">Tài Tài Chatbot</h3>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                  </span>
                  Đang hoạt động • Phản hồi siêu tốc
                </p>
              </div>
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="hidden sm:flex text-stone-400 hover:text-white hover:bg-white/10 p-1.5 rounded-xl transition-all flex-shrink-0 active:scale-95 cursor-pointer"
                aria-label={isExpanded ? "Thu nhỏ chat" : "Phóng to chat"}
                title={isExpanded ? "Thu nhỏ chat" : "Phóng to chat"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white hover:bg-white/10 p-1.5 rounded-xl transition-all flex-shrink-0 active:scale-95 cursor-pointer"
                aria-label="Đóng chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pinned Message Banner */}
            {pinnedMessage && (
              <div className="shrink-0 px-3.5 py-2 bg-amber-50/80 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Pin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">
                      Tin nhắn đã ghim ({pinnedMessage.sender === "user" ? "Bạn" : "Admin"})
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-800 dark:text-stone-200 leading-relaxed font-medium truncate">
                    {pinnedMessage.content}
                  </p>
                </div>
                <button
                  onClick={() => setPinnedMsgId(null)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 rounded-full cursor-pointer"
                  title="Bỏ ghim"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Community shoutout */}
            {shoutout && (
              <div className="shrink-0 px-4 py-2 bg-emerald-50/60 dark:bg-emerald-950/20 border-b border-emerald-100/50 dark:border-emerald-900/30 text-[11px] text-emerald-800 dark:text-emerald-300 font-bold leading-relaxed flex items-center gap-1.5">
                <span className="text-xs">💡</span> {shoutout}
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
                isDraggingImage ? "bg-emerald-50/50 dark:bg-emerald-950/20" : "bg-stone-50 dark:bg-stone-950"
              }`}
            >
              {isDraggingImage && (
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center animate-pulse">
                  Thả ảnh vào đây để đính kèm 📂
                </p>
              )}
              {loadingHistory && scrollMessages.length === 0 && (
                <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-12 animate-pulse">
                  Đang tải cuộc trò chuyện...
                </p>
              )}
              {!loadingHistory && scrollMessages.length === 0 && (
                <div className="text-center px-4 py-8 mt-6">
                  <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Logo size={28} className="opacity-60" />
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
                    Gửi tin nhắn để bắt đầu trò chuyện với admin.<br />Admin thường phản hồi trong vòng 24 giờ.
                  </p>
                </div>
              )}
              {scrollMessages.map((msg) => {
                const isMine = msg.sender === "user";
                const isPending = isPendingMessage(msg);
                const senderName = isMine ? "Bạn" : "Admin";
                const msgReactions = reactions[msg.id] || {};

                // Check if message contains a quote reply
                const isQuoteReply = msg.content && msg.content.startsWith("↩️ [Trả lời ");
                let quoteHeader = "";
                let mainText = msg.content || "";
                if (isQuoteReply && msg.content) {
                  const lines = msg.content.split("\n");
                  quoteHeader = lines[0];
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
                          className={`relative rounded-2xl px-3.5 py-2 text-[12px] leading-relaxed shadow-xs w-fit ${
                            isMine
                              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-tr-xs"
                              : "bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-100 border border-stone-100 dark:border-stone-800/60 rounded-tl-xs"
                          }`}
                        >
                          {/* Quoted Message Box */}
                          {isQuoteReply && (
                            <div
                              className={`mb-1.5 p-1.5 rounded-lg border-l-2 text-[11px] font-medium leading-snug ${
                                isMine
                                  ? "border-emerald-400 bg-black/15 dark:bg-stone-200/20 text-stone-100 dark:text-stone-800"
                                  : "border-emerald-500 bg-stone-100 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300"
                              }`}
                            >
                              <p className="opacity-90 font-bold">{quoteHeader}</p>
                            </div>
                          )}

                          {msg.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={msg.image_url}
                              alt="Đính kèm"
                              className="max-w-full max-h-40 rounded-lg mb-2 object-contain cursor-pointer hover:opacity-95 transition-opacity"
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
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-pointer shadow-xs bg-white/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700 hover:scale-105"
                            title="Tùy chọn tin nhắn"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* 3-Dots Dropdown Popup Menu */}
                          {activeMenuMsgId === msg.id && (
                            <div
                              className={`absolute bottom-full mb-1 z-50 min-w-[155px] bg-white dark:bg-stone-900 rounded-2xl p-1.5 shadow-xl border border-stone-200 dark:border-stone-800 backdrop-blur-md text-xs space-y-1 ${
                                isMine ? "right-0" : "left-0"
                              }`}
                            >
                              {/* Quick Emoji Reaction Row */}
                              <div className="flex items-center justify-between px-1.5 py-1 bg-stone-50 dark:bg-stone-800/60 rounded-xl mb-1 border border-stone-100 dark:border-stone-700/50">
                                {REACTION_EMOJIS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => {
                                      void toggleReaction(msg.id, emoji);
                                      setActiveMenuMsgId(null);
                                    }}
                                    className="hover:scale-130 transition-transform p-0.5 text-[11px] cursor-pointer"
                                    title={`Thả ${emoji}`}
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
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                <CornerUpLeft className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Trả lời tin nhắn</span>
                              </button>

                              <button
                                onClick={() => {
                                  togglePinMessage(msg.id);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                {pinnedMsgId === msg.id ? (
                                  <PinOff className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                ) : (
                                  <Pin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                )}
                                <span>{pinnedMsgId === msg.id ? "Bỏ ghim tin nhắn" : "Ghim tin nhắn"}</span>
                              </button>

                              <button
                                onClick={() => {
                                  void copyMessageText(mainText || msg.content);
                                  setActiveMenuMsgId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px] cursor-pointer"
                              >
                                <Copy className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                                <span>Sao chép</span>
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
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-800 dark:text-stone-200 font-bold transition-colors text-left text-[11px] cursor-pointer"
                                  >
                                    <Pencil className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                                    <span>Sửa tin nhắn</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setActiveMenuMsgId(null);
                                      void handleDeleteMessage(msg.id);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold transition-colors text-left text-[11px] cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3 text-rose-500" />
                                    <span>Thu hồi tin nhắn</span>
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
                                  className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full border transition-all cursor-pointer ${
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

                        {/* Message Status */}
                        {isMine && (
                          <div className="mt-1 flex items-center justify-end gap-1 text-[9px] font-bold text-stone-400 dark:text-stone-500 whitespace-nowrap">
                            {isPending ? (
                              <>
                                <Clock className="h-3 w-3 shrink-0 text-stone-400 animate-pulse" />
                                <span className="whitespace-nowrap">Đang gửi...</span>
                              </>
                            ) : (
                              <>
                                <CheckCheck className={`h-3 w-3 shrink-0 ${msg.read ? "text-emerald-500" : "text-stone-400"}`} />
                                <span className="whitespace-nowrap">{msg.read ? "Đã xem" : "Đã gửi"}</span>
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
            <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800/40 shrink-0">
              {/* Replying Banner Preview */}
              {replyingTo && (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200 mb-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      💬 Đang trả lời {replyingTo.senderName}:
                    </span>
                    <p className="truncate text-[10px] text-stone-600 dark:text-stone-400 mt-0.2">
                      {replyingTo.content}
                    </p>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 rounded-full cursor-pointer"
                    title="Hủy trả lời"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Editing Banner Preview */}
              {editingMessage && (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-stone-800 dark:text-stone-200 mb-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-sky-600 dark:text-sky-400">Đang sửa tin nhắn:</span>
                    <p className="truncate text-[10px] text-stone-600 dark:text-stone-400 mt-0.2">
                      {editingMessage.content}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingMessage(null);
                      setInput("");
                    }}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 rounded-full cursor-pointer"
                    title="Hủy sửa"
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
                    alt="Preview"
                    className="w-14 h-14 rounded-lg object-cover border border-stone-100 dark:border-stone-800/50 shadow-md"
                  />
                  <button
                    onClick={() => clearPendingImage()}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors border border-white dark:border-stone-950 active:scale-90 cursor-pointer"
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
                  title="Đính kèm ảnh"
                  className="p-2 border border-stone-100 dark:border-stone-800/50 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition flex-shrink-0 active:scale-95 cursor-pointer"
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
                  placeholder={editingMessage ? "Chỉnh lại nội dung tin nhắn..." : "Nhập tin nhắn, dán ảnh..."}
                  className="flex-1 min-w-0 px-3 py-2 border border-stone-100 dark:border-stone-800/40 bg-stone-50/50 dark:bg-stone-950/60 text-stone-900 dark:text-stone-100 rounded-xl text-xs focus:outline-none focus:border-stone-400 dark:focus:border-stone-700 focus:bg-white dark:focus:bg-stone-950 transition-all placeholder:text-stone-400"
                />

                <button
                  onClick={() => void handleSend()}
                  disabled={(!input.trim() && !pendingImage) || sending || !userId}
                  className="p-2 bg-gradient-to-br from-stone-900 to-stone-800 dark:from-white dark:to-stone-100 text-white dark:text-stone-900 rounded-xl hover:shadow disabled:opacity-30 disabled:pointer-events-none transition flex-shrink-0 active:scale-95 cursor-pointer"
                  aria-label="Gửi tin nhắn"
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
