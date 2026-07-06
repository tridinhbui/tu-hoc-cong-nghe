"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);
      const history = await getChatHistory(user.id);
      setMessages(history);
    };

    init();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToChatMessages(userId, (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    return unsubscribe;
  }, [userId]);

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
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg hover:shadow-xl hover:bg-stone-800 dark:hover:bg-white transition flex items-center justify-center group"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-900 dark:bg-stone-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
              Hỗ trợ Admin
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
            className="fixed bottom-6 right-6 z-50 w-96 max-h-96 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stone-900 dark:bg-stone-950 text-white px-4 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">Admin Support</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">Admin thường phản hồi trong vòng 24 giờ</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-900/50">
              {messages.length === 0 && (
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
