"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { MessageCircle, Send, ImagePlus, X, Loader2, Trash2 } from "lucide-react";
import type { ChatThread, ChatThreadMessage } from "@/lib/admin/chat";
import { sendAdminChatReplyAction, markThreadReadAction, getChatThreadMessagesAction, getChatThreadsAction } from "./actions";
import { uploadChatImage, isAllowedChatImage, deleteChatMessage } from "@/lib/supabase-chat";
import EmptyState from "@/components/admin/EmptyState";
import EmojiPicker from "@/components/EmojiPicker";
import { useI18n } from "@/lib/i18n/context";
import { intlLocale } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/current-user";

// 15 giây, không phải 4. Mỗi nhịp là hai Server Action đọc Supabase, chạy
// suốt thời gian trang quản trị mở - 900 lần mỗi giờ ở mức 4 giây. Hộp thư
// quản trị không phải phòng chat thời gian thực.
const POLL_INTERVAL_MS = 15000;

export default function ChatThreadsPanel({ threads: initialThreads }: { threads: ChatThread[] }) {
  const { t, locale } = useI18n();
  const tc = t.adminThree.chatThreadsPanel;
  const [threads, setThreads] = useState(initialThreads);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatThreadMessage[]>([]);
  const [reply, setReply] = useState("");
  const [loadingThread, setLoadingThread] = useState(false);
  const [sending, setSending] = useState(false);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUserIdRef = useRef<string | null>(null);
  useEffect(() => {
    activeUserIdRef.current = activeUserId;
  }, [activeUserId]);

  // Polls the whole thread list (badges, last message, ordering) so the
  // sidebar stays live without a full page reload. Skips ticks while the
  // tab is hidden - an admin tab forgotten overnight was otherwise ~43k
  // pointless Supabase queries (2 queries / 4s).
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      getChatThreadsAction()
        .then(setThreads)
        .catch((error) => console.error("Error polling chat threads:", error));
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Polls the currently open conversation for new messages / read-receipt
  // flips - there's no client-side realtime subscription here since
  // chat_messages RLS is scoped to the message owner, not the admin.
  useEffect(() => {
    if (!activeUserId) return;
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      getChatThreadMessagesAction(activeUserId)
        .then((msgs) => {
          if (activeUserIdRef.current !== activeUserId) return;
          setMessages(msgs);
        })
        .catch((error) => console.error("Error polling chat thread messages:", error));
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [activeUserId]);

  async function openThread(userId: string) {
    setActiveUserId(userId);
    setLoadingThread(true);
    const msgs = await getChatThreadMessagesAction(userId);
    setMessages(msgs);
    setLoadingThread(false);

    const thread = threads.find((t) => t.user_id === userId);
    if (thread && thread.unread_count > 0) {
      await markThreadReadAction(userId);
      setThreads((prev) => prev.map((t) => (t.user_id === userId ? { ...t, unread_count: 0 } : t)));
    }
  }

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
    if (!activeUserId || (!reply.trim() && !pendingImage) || sending) return;
    setSending(true);
    const content = reply.trim();
    setReply("");
    const imageFile = pendingImage;
    clearPendingImage();

    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        setUploadingImage(true);
        // Upload under the ADMIN's own uid, not the target user's - the
        // storage policy (20260722_cfa_tables_rls_and_chat_images_hardening)
        // only allows writing into your own auth.uid() folder; the folder is
        // purely organizational, the message row still targets activeUserId.
        const adminUserId = await getCurrentUserId();
        if (!adminUserId) throw new Error(tc.sessionExpired);
        imageUrl = await uploadChatImage(adminUserId, imageFile);
        setUploadingImage(false);
      }

      await sendAdminChatReplyAction(activeUserId, content, imageUrl);
      // Re-fetch from the server instead of optimistically appending
      // locally: if this send lands while openThread()'s own fetch for this
      // same thread is still in flight (very common for the very first
      // reply in a thread, sent right after opening it), that fetch's
      // setMessages(msgs) and this optimistic append raced each other,
      // resulting in the new message showing up twice. Refetching after the
      // insert (once, sequentially, no longer racing the initial load)
      // keeps a single source of truth.
      const msgs = await getChatThreadMessagesAction(activeUserId);
      setMessages(msgs);
      getChatThreadsAction().then(setThreads).catch(() => {});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tc.sendFailed);
    } finally {
      setUploadingImage(false);
      setSending(false);
    }
  }

  const handleAdminDeleteMessage = async (msgId: number) => {
    if (!activeUserId) return;
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    toast.success(tc.messageDeleted);
    await deleteChatMessage(msgId, activeUserId).catch((error) => console.error("Error deleting message:", error));
  };

  if (threads.length === 0) {
    return <EmptyState icon={MessageCircle} title={tc.emptyTitle} description={tc.emptyDescription} />;
  }

  const activeThread = threads.find((t) => t.user_id === activeUserId);
  const lastAdminMsgId = [...messages].reverse().find((m) => m.sender === "admin")?.id;

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[420px]">
      {/* Thread list */}
      <div className="border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800 overflow-y-auto max-h-[480px]">
        {threads.map((t) => (
          <button
            key={t.user_id}
            onClick={() => openThread(t.user_id)}
            className={`w-full text-left p-3 transition-colors ${
              activeUserId === t.user_id ? "bg-stone-100 dark:bg-stone-800" : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                {t.user_name || t.user_email || tc.unknownUser}
              </span>
              {t.unread_count > 0 && (
                <span className="text-[10px] font-bold bg-blue-600 text-white rounded-full px-1.5 py-0.5">{t.unread_count}</span>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">{t.last_message}</p>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
              {new Date(t.last_message_at).toLocaleString(intlLocale(locale))}
            </p>
          </button>
        ))}
      </div>

      {/* Conversation */}
      <div className="flex flex-col">
        {!activeUserId ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 dark:text-stone-500">
            {tc.selectThreadPrompt}
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800">
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {activeThread?.user_name || activeThread?.user_email || tc.unknownUser}
              </p>
              {activeThread?.user_email && <p className="text-xs text-stone-500 dark:text-stone-400">{activeThread.user_email}</p>}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
              {loadingThread ? (
                <p className="text-xs text-stone-400">{tc.loading}</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex flex-col ${m.sender === "admin" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                        m.sender === "admin"
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                      }`}
                    >
                      {m.image_url && (
                        <a href={m.image_url} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={m.image_url}
                            alt={tc.attachedImageAlt}
                            width={320}
                            height={240}
                            sizes="320px"
                            style={{ width: "auto", height: "auto" }}
                            className="max-w-full max-h-48 rounded-lg mb-1.5 object-cover"
                          />
                        </a>
                      )}
                      {m.content}
                      <p className="text-[10px] opacity-60 mt-1">
                        {new Date(m.created_at).toLocaleTimeString(intlLocale(locale), { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {m.sender === "admin" && (
                      <div className="flex items-center gap-2 mt-0.5 mr-1">
                        {m.id === lastAdminMsgId && m.read && (
                          <span className="text-[10px] text-stone-400 dark:text-stone-500">{tc.seen}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleAdminDeleteMessage(m.id)}
                          className="text-[9px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer"
                          title={tc.recallAndDelete}
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>{tc.recall}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
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
              className={`p-3 border-t transition-colors ${
                isDraggingImage ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-stone-200 dark:border-stone-800"
              }`}
            >
              {pendingImagePreview && (
                <div className="relative inline-block mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pendingImagePreview} alt={tc.previewAlt} className="h-16 rounded-lg border border-stone-200 dark:border-stone-700 object-cover" />
                  <button
                    onClick={clearPendingImage}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {isDraggingImage && (
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center mb-2">{tc.dropImageHint}</p>
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
                  title={tc.attachImage}
                  className="p-2 border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition flex-shrink-0"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
                <EmojiPicker onSelect={(emoji) => setReply((prev) => prev + emoji)} />
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onPaste={handlePaste}
                  placeholder={tc.replyPlaceholder}
                  className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
                />
                <button
                  onClick={handleSend}
                  disabled={sending || (!reply.trim() && !pendingImage)}
                  className="px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 disabled:opacity-50 flex-shrink-0"
                >
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
