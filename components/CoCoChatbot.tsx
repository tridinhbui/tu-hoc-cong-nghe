"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, BookOpen, RotateCcw, X } from "lucide-react";
import CoCoAvatar from "@/components/CoCoAvatar";
import TypingText from "@/components/TypingText";
import { useI18n } from "@/lib/i18n/context";

/**
 * Chatbot Cơ Cơ - nút nổi trên MỌI trang (gắn ở app/layout.tsx), mở ra một
 * khung trò chuyện hỏi đáp với trợ lý học.
 *
 * Câu trả lời hiện ra theo ba nhịp giống CoCoSays: ba chấm "đang gõ" trong
 * lúc chờ API, rồi chữ gõ dần từng ký tự, rồi các bài học liên quan hiện ra
 * sau khi gõ xong. Chỉ tin nhắn MỚI NHẤT được gõ; tin cũ (kể cả tin khôi phục
 * từ sessionStorage khi chuyển trang) hiện nguyên ngay, không gõ lại.
 *
 * Người bật giảm chuyển động thấy nguyên câu ngay, không chấm không gõ.
 *
 * Nằm ở góc phải, ngay trên nút ConnectMenu (bottom-6), để hai nút không đè
 * nhau. Ẩn ở trang đăng nhập / đặt lại mật khẩu như các widget chat khác.
 */

type LessonLink = { title: string; slug: string };
type Msg = {
  id: number;
  role: "user" | "assistant";
  content: string;
  links?: LessonLink[];
  /** Đang gõ dần - tắt khi TypingText báo xong. */
  typing?: boolean;
};

const STORAGE_KEY = "thcn_coco_chat";
const HIDDEN_PATHS = ["/login", "/auth/reset-password"];
const subscribeNoop = () => () => {};

function loadHistory(): Msg[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Msg[];
    return Array.isArray(parsed) ? parsed.map((m) => ({ ...m, typing: false })) : [];
  } catch {
    return [];
  }
}

function saveHistory(msgs: Msg[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-30)));
  } catch {
    /* private mode / storage bị chặn: lịch sử chỉ sống trong trang này */
  }
}

export default function CoCoChatbot() {
  const { t, locale } = useI18n();
  const pathname = usePathname() ?? "/";
  const reduced = useSyncExternalStore(
    subscribeNoop,
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    () => false
  );

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  // Khôi phục lịch sử lần đầu mở (không phải lúc mount: phần lớn lượt xem
  // trang không bao giờ mở chat, không cần đụng storage).
  function openChat() {
    setOpen(true);
    if (loaded) return;
    const history = loadHistory();
    nextId.current = history.reduce((m, x) => Math.max(m, x.id), 0) + 1;
    if (history.length > 0) {
      setMessages(history);
    } else {
      setMessages([{ id: nextId.current++, role: "assistant", content: t.cocoChat.greeting, typing: !reduced }]);
    }
    setLoaded(true);
  }

  useEffect(() => {
    if (loaded) saveHistory(messages);
  }, [messages, loaded]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Bám đáy trong lúc chữ đang gõ: nội dung cao dần theo từng ký tự, nên theo
  // dõi kích thước chứ không chỉ theo số tin nhắn.
  useEffect(() => {
    const content = contentRef.current;
    const scroller = scrollRef.current;
    if (!open || !content || !scroller) return;
    const ro = new ResizeObserver(() => {
      scroller.scrollTop = scroller.scrollHeight;
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  function finishTyping(id: number) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, typing: false } : m)));
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || waiting) return;
    setInput("");
    const userMsg: Msg = { id: nextId.current++, role: "user", content };
    // Tin đang gõ dở thì hiện nốt luôn: người học đã hỏi câu mới, không ai
    // muốn chờ câu cũ gõ xong.
    const history = [...messages.map((m) => ({ ...m, typing: false })), userMsg];
    setMessages(history);
    setWaiting(true);

    let reply: Msg;
    try {
      const res = await fetch("/api/coco-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          pathname,
          // Lời chào không gửi đi: nó là câu mồi của giao diện, không phải
          // điều Cơ Cơ đã thật sự nói trong ngữ cảnh mô hình.
          messages: history
            .filter((m, i) => !(i === 0 && m.role === "assistant"))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (res.status === 429) {
        reply = { id: nextId.current++, role: "assistant", content: t.cocoChat.rateLimited };
      } else if (!res.ok) {
        throw new Error(String(res.status));
      } else {
        const data = (await res.json()) as { reply: string | null; links?: LessonLink[] };
        const links = data.links ?? [];
        const body =
          data.reply ?? (links.length > 0 ? t.cocoChat.offlineWithLinks : t.cocoChat.offlineNoLinks);
        reply = { id: nextId.current++, role: "assistant", content: body, links };
      }
    } catch {
      reply = { id: nextId.current++, role: "assistant", content: t.cocoChat.error };
    }

    setWaiting(false);
    setMessages((prev) => [...prev, { ...reply, typing: !reduced }]);
  }

  function reset() {
    setMessages([{ id: nextId.current++, role: "assistant", content: t.cocoChat.greeting, typing: !reduced }]);
    setInput("");
    inputRef.current?.focus();
  }

  const showSuggestions = loaded && !waiting && messages.length <= 1 && !messages[0]?.typing;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label={t.cocoChat.fabLabel}
          title={t.cocoChat.fabLabel}
          className="group fixed bottom-[5.25rem] right-4 sm:right-6 z-[45] flex h-12 items-center gap-2 rounded-full border border-brand-200 bg-white py-1 pl-1 pr-1 transition-all hover:border-brand-400 hover:pr-4 dark:border-brand-800 dark:bg-stone-900 dark:hover:border-brand-500 cursor-pointer select-none"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950">
            <CoCoAvatar size={34} float />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-stone-900" />
          </span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-ink transition-all group-hover:max-w-[8rem] sm:inline">
            {t.cocoChat.fabLabel}
          </span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[55] bg-stone-950/40 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-label={t.cocoChat.title}
        aria-hidden={!open}
        className={`fixed z-[60] flex flex-col overflow-hidden border border-line-strong bg-white transition-all duration-300 ease-out dark:bg-stone-900
          inset-x-0 bottom-0 h-[85dvh] rounded-t-xl
          sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(600px,calc(100dvh-3rem))] sm:w-[380px] sm:rounded-xl
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none invisible"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line bg-brand-50 px-4 py-3 dark:bg-brand-950/40">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-stone-900">
            <CoCoAvatar size={34} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-ink-max">{t.cocoChat.title}</p>
            <p className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {waiting ? t.coco.typingLabel : t.cocoChat.status}
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            aria-label={t.cocoChat.reset}
            title={t.cocoChat.reset}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-white hover:text-ink dark:hover:bg-stone-800 cursor-pointer"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.cocoChat.close}
            title={t.cocoChat.close}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-white hover:text-ink dark:hover:bg-stone-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <div ref={contentRef} className="space-y-3" aria-live="polite">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-brand-600 px-3.5 py-2 text-sm leading-relaxed text-white">
                    {m.content}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex items-end gap-2">
                  <CoCoAvatar size={28} />
                  <div className="min-w-0 max-w-[85%] space-y-2">
                    <p className="whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm bg-surface-raised px-3.5 py-2 text-sm leading-relaxed text-ink-body dark:bg-stone-800">
                      {m.typing ? (
                        <TypingText text={m.content} speed={14} onDone={() => finishTyping(m.id)} />
                      ) : (
                        m.content
                      )}
                    </p>
                    {!m.typing && m.links && m.links.length > 0 && (
                      <div className="space-y-1.5 motion-safe:animate-[coco-rise_0.3s_ease-out]">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                          {t.cocoChat.relatedLessons}
                        </p>
                        {m.links.map((l) => (
                          <Link
                            key={l.slug}
                            href={`/bai-hoc/${l.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink hover:border-brand-400 hover:text-accent-strong"
                          >
                            <BookOpen size={14} className="shrink-0 text-accent" />
                            <span className="truncate">{l.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {waiting && (
              <div className="flex items-end gap-2">
                <CoCoAvatar size={28} />
                <span
                  className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface-raised px-3.5 py-3 dark:bg-stone-800"
                  aria-label={t.coco.typingLabel}
                >
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-stone-400 motion-safe:animate-bounce dark:bg-stone-500"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </span>
              </div>
            )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 pl-9 motion-safe:animate-[coco-rise_0.3s_ease-out]">
                {t.cocoChat.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-left text-xs text-accent-strong hover:bg-brand-50 dark:border-brand-800 dark:bg-stone-900 dark:hover:bg-brand-950 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-line px-3 pb-2 pt-3"
        >
          <div className="flex items-end gap-2 rounded-xl border border-line-strong bg-white px-3 py-2 focus-within:border-brand-500 dark:bg-stone-900">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={1000}
              placeholder={t.cocoChat.placeholder}
              className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || waiting}
              aria-label={t.cocoChat.send}
              title={t.cocoChat.send}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[11px] text-ink-faint">{t.cocoChat.disclaimer}</p>
        </form>
      </div>
    </>
  );
}
