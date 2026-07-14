"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";
import { getRandomCommunityShoutout } from "@/lib/supabase-user";
import {
  getChatHistory,
  sendMessage,
  subscribeToChatMessages,
  type ChatMessage,
} from "@/lib/supabase-chat";

export default function ChatWithAdminWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [shoutout, setShoutout] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasLoadedHistoryRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [isOpen, messages]);

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
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
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
    } finally {
      setLoadingHistory(false);
    }
  }, [loadingHistory]);

  useEffect(() => {
    if (!isOpen) return;
    void loadConversation();
  }, [isOpen, loadConversation]);

  const handleSend = async () => {
    if (!input.trim() || !userId || sending) return;

    setSending(true);
    const content = input;
    setInput("");

    const saved = await sendMessage(userId, "user", content);
    if (saved) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === saved.id)) return prev;
        return [...prev, saved];
      });
    }
    setSending(false);
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-xl ${
                      msg.sender === "user"
                        ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-br-none"
                        : "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "user" ? "text-stone-500 dark:text-stone-400" : "text-stone-500 dark:text-stone-400"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-stone-200 dark:border-stone-800 p-4 bg-white dark:bg-stone-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending || !userId}
                  className="p-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white disabled:opacity-40 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
