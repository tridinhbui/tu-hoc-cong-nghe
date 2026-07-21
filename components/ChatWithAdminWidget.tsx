"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";
import EmojiPicker from "@/components/EmojiPicker";
import { announceWidgetOpened, onOtherWidgetOpened } from "@/lib/floating-widget-coordinator";
import { getRandomCommunityShoutout } from "@/lib/supabase-user";
import {
  getChatHistory,
  sendMessage,
  subscribeToChatMessages,
  uploadChatImage,
  isAllowedChatImage,
  markMessagesSeenByUser,
  type ChatMessage,
} from "@/lib/supabase-chat";

interface ChatWithAdminWidgetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ChatWithAdminWidget({ isOpen: controlledIsOpen, onOpenChange }: ChatWithAdminWidgetProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const setIsOpen = useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    setInternalIsOpen((prev) => {
      const next = typeof open === "function" ? open(prev) : open;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);
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

  // A fresh shoutout celebrating a real top learner every time the chat is
  // opened - not persisted, not mixed into the actual message history, just
  // a "here's who's doing great right now" banner from the admin chatbot.
  useEffect(() => {
    if (!isOpen) return;
    getRandomCommunityShoutout()
      .then(setShoutout)
      .catch((error) => console.error("Error loading community shoutout:", error));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !userId) return;

    const unsubscribe = subscribeToChatMessages(userId, (message) => {
      setMessages((prev) => {
        const existingIdx = prev.findIndex((m) => m.id === message.id);
        if (existingIdx === -1) return [...prev, message];
        // UPDATE event (e.g. admin marked our message as read) - patch in place.
        const next = [...prev];
        next[existingIdx] = message;
        return next;
      });
      // A fresh admin message arrived while the chat is open - mark it seen
      // immediately instead of waiting for the next load.
      if (message.sender === "admin") void markMessagesSeenByUser(userId);
    });

    return unsubscribe;
  }, [isOpen, userId]);

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
      const history = await getChatHistory(user.id);
      setMessages(history);
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
    // Revoke any previously picked image's blob URL before overwriting it -
    // otherwise dragging/pasting a second image before sending/clearing the
    // first leaks that object URL for the life of the page.
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

  // Ctrl+V a screenshot straight into the chat, not just drag-drop/file
  // picker - the most common way people actually share a screenshot.
  function handlePaste(e: React.ClipboardEvent) {
    const file = Array.from(e.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();
    if (file) pickImage(file);
  }

  const handleSend = async () => {
    if ((!input.trim() && !pendingImage) || !userId || sending) return;

    setSending(true);
    const content = input;
    setInput("");
    const imageFile = pendingImage;
    clearPendingImage();

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadChatImage(userId, imageFile);
        setUploadingImage(false);
      }

      const saved = await sendMessage(userId, "user", content, imageUrl);
      if (saved) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === saved.id)) return prev;
          return [...prev, saved];
        });
      }
    } catch (error) {
      console.error("Error sending chat image:", error);
      toast.error(error instanceof Error ? error.message : "Không gửi được ảnh. Vui lòng thử lại.");
    } finally {
      setUploadingImage(false);
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-white dark:bg-stone-100 shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center group overflow-hidden border border-stone-200 dark:border-stone-300"
          >
            <Logo size={56} className="rounded-full" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-100" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-900 dark:bg-stone-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
              Admin Chatbot
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
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 sm:w-96 max-h-[75vh] sm:max-h-96 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stone-900 dark:bg-stone-950 text-white px-4 py-4 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Logo size={36} className="rounded-full" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold">Admin Chatbot</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                  </span>
                  Đang hoạt động
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-lg transition flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Community shoutout - a fresh one every time the chat opens */}
            {shoutout && (
              <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                {shoutout}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-900/50">
              {loadingHistory && messages.length === 0 && (
                <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-8">
                  Đang tải cuộc trò chuyện...
                </p>
              )}
              {!loadingHistory && messages.length === 0 && (
                <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-8">
                  Gửi tin nhắn để bắt đầu trò chuyện với admin. Admin thường phản hồi trong vòng 24 giờ.
                </p>
              )}
              {(() => {
                const lastUserMsgId = [...messages].reverse().find((m) => m.sender === "user")?.id;
                return messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-xl ${
                        msg.sender === "user"
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-br-none"
                          : "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-bl-none"
                      }`}
                    >
                      {msg.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={msg.image_url}
                          alt="Ảnh đính kèm"
                          className="max-w-full max-h-48 rounded-lg mb-1.5 cursor-pointer object-cover"
                          onClick={() => window.open(msg.image_url!, "_blank")}
                        />
                      )}
                      {msg.content && <p className="text-sm">{msg.content}</p>}
                      <p className="text-xs mt-1 text-stone-500 dark:text-stone-400">
                        {new Date(msg.created_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {msg.sender === "user" && msg.id === lastUserMsgId && msg.read && (
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 mr-1">Admin đã xem</span>
                    )}
                  </div>
                ));
              })()}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - also a drop zone for dragging in a screenshot, and
                onPaste catches Ctrl+V'd images (the most common way people
                actually share a screenshot). */}
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
              className={`border-t p-4 bg-white dark:bg-stone-900 transition-colors ${
                isDraggingImage ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-stone-200 dark:border-stone-800"
              }`}
            >
              {pendingImagePreview && (
                <div className="relative inline-block mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pendingImagePreview} alt="Xem trước" className="h-16 rounded-lg border border-stone-200 dark:border-stone-700 object-cover" />
                  <button
                    onClick={clearPendingImage}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {isDraggingImage && (
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center mb-2">Thả ảnh vào đây để đính kèm</p>
              )}
              <div className="flex gap-2">
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
                  className="p-2 border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition flex-shrink-0"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
                <EmojiPicker onSelect={(emoji) => setInput((prev) => prev + emoji)} />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  onPaste={handlePaste}
                  placeholder="Nhập tin nhắn, dán hoặc kéo ảnh vào..."
                  className="flex-1 min-w-0 px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                />
                <button
                  onClick={handleSend}
                  disabled={(!input.trim() && !pendingImage) || sending || !userId}
                  className="p-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white disabled:opacity-40 transition flex-shrink-0"
                >
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
