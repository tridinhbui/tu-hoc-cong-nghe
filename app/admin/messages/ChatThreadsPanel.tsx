"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";
import type { ChatThread, ChatThreadMessage } from "@/lib/admin/chat";
import { sendAdminChatReplyAction, markThreadReadAction, getChatThreadMessagesAction } from "./actions";
import EmptyState from "@/components/admin/EmptyState";

export default function ChatThreadsPanel({ threads }: { threads: ChatThread[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatThreadMessage[]>([]);
  const [reply, setReply] = useState("");
  const [loadingThread, setLoadingThread] = useState(false);
  const [sending, setSending] = useState(false);

  async function openThread(userId: string) {
    setActiveUserId(userId);
    setLoadingThread(true);
    const msgs = await getChatThreadMessagesAction(userId);
    setMessages(msgs);
    setLoadingThread(false);

    const thread = threads.find((t) => t.user_id === userId);
    if (thread && thread.unread_count > 0) {
      await markThreadReadAction(userId);
      startTransition(() => router.refresh());
    }
  }

  async function handleSend() {
    if (!activeUserId || !reply.trim()) return;
    setSending(true);
    try {
      await sendAdminChatReplyAction(activeUserId, reply.trim());
      setReply("");
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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không gửi được tin nhắn");
    }
    setSending(false);
  }

  if (threads.length === 0) {
    return <EmptyState icon={MessageCircle} title="Chưa có cuộc trò chuyện nào" description="Tin nhắn từ khung chat trực tiếp của người dùng sẽ hiện ở đây." />;
  }

  const activeThread = threads.find((t) => t.user_id === activeUserId);

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
                {t.user_name || t.user_email || "Người dùng"}
              </span>
              {t.unread_count > 0 && (
                <span className="text-[10px] font-bold bg-blue-600 text-white rounded-full px-1.5 py-0.5">{t.unread_count}</span>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">{t.last_message}</p>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
              {new Date(t.last_message_at).toLocaleString("vi-VN")}
            </p>
          </button>
        ))}
      </div>

      {/* Conversation */}
      <div className="flex flex-col">
        {!activeUserId ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 dark:text-stone-500">
            Chọn một cuộc trò chuyện để xem
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800">
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {activeThread?.user_name || activeThread?.user_email || "Người dùng"}
              </p>
              {activeThread?.user_email && <p className="text-xs text-stone-500 dark:text-stone-400">{activeThread.user_email}</p>}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
              {loadingThread ? (
                <p className="text-xs text-stone-400">Đang tải...</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                        m.sender === "admin"
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                      }`}
                    >
                      {m.image_url && (
                        <a href={m.image_url} target="_blank" rel="noopener noreferrer">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.image_url} alt="Ảnh đính kèm" className="max-w-full max-h-48 rounded-lg mb-1.5 object-cover" />
                        </a>
                      )}
                      {m.content}
                      <p className="text-[10px] opacity-60 mt-1">
                        {new Date(m.created_at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-stone-200 dark:border-stone-800 flex gap-2">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Trả lời..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
              />
              <button
                onClick={handleSend}
                disabled={sending || !reply.trim()}
                className="px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
