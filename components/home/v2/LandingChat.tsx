"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import CoCoAvatar from "@/components/CoCoAvatar";
import { useInViewOnce } from "@/components/ui/effects";
import { useI18n } from "@/lib/i18n/context";
import { INK, Mono, RULE } from "@/components/home/v2/kit";

/*
 * Khung chat kịch bản cho trang chủ. Không gọi AI: câu hỏi và câu trả lời là
 * chữ cố định trong từ điển (t.home.v2.chat*), chỉ trình diễn bằng nhịp
 *   bấm gửi -> ba chấm "đang gõ" -> câu trả lời hiện dần từng chữ.
 * Chạy một lần khi vào khung nhìn; reduced-motion thấy nguyên hội thoại ngay.
 * Lúc kết xuất trên máy chủ chữ luôn đầy đủ (xem effects.tsx).
 */

type Phase = "idle" | "asking" | "thinking" | "answering" | "done";

const ASK_MS = 700;
const THINK_MS = 900;
const CHAR_MS = 22;

export default function LandingChat({ question, answer, className = "" }: { question: string; answer: string; className?: string }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>("0px 0px -20% 0px");
  const [phase, setPhase] = useState<Phase>("done");
  const [n, setN] = useState(answer.length);

  useEffect(() => {
    if (!seen || reduce) return;
    const timers: number[] = [];
    // Mọi setState nằm trong hẹn giờ, không đồng bộ trong thân effect.
    timers.push(
      window.setTimeout(() => {
        setPhase("asking");
        setN(0);
        timers.push(
          window.setTimeout(() => {
            setPhase("thinking");
            timers.push(
              window.setTimeout(() => {
                setPhase("answering");
                let i = 0;
                const step = () => {
                  i += 1;
                  setN(i);
                  if (i < answer.length) timers.push(window.setTimeout(step, CHAR_MS * (0.6 + Math.random() * 0.8)));
                  else setPhase("done");
                };
                timers.push(window.setTimeout(step, CHAR_MS));
              }, THINK_MS),
            );
          }, ASK_MS),
        );
      }, 0),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [seen, reduce, answer]);

  const showQuestion = phase !== "idle";
  const showBot = phase === "thinking" || phase === "answering" || phase === "done";

  return (
    <div ref={ref} className={`min-w-0 border-2 ${RULE} bg-white/60 ${INK} dark:bg-white/[0.04] ${className}`}>
      <div className={`flex items-center justify-between gap-3 border-b-2 ${RULE} px-3 py-2`}>
        <span className="flex items-center gap-2">
          <CoCoAvatar size={22} />
          <Mono className="font-bold">{t.home.v2.chatLabel}</Mono>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="relative inline-flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <Mono className="text-emerald-700 dark:text-emerald-400">{t.home.v2.chatOnline}</Mono>
        </span>
      </div>

      <div className="min-h-[148px] space-y-3 p-3 sm:p-4" aria-live="off">
        {showQuestion && (
          <div className="thcn-rise flex justify-end">
            <p className="max-w-[88%] bg-brand-600 px-3 py-2 text-[14px] leading-6 text-white">{question}</p>
          </div>
        )}
        {showBot && (
          <div className="thcn-rise flex items-start gap-2">
            <CoCoAvatar size={26} className="mt-0.5" />
            <div className={`min-w-0 max-w-[88%] border ${RULE} bg-[#eeebe3] px-3 py-2 text-[14px] leading-6 dark:bg-[#15171c]`}>
              {phase === "thinking" ? (
                <span className="inline-flex items-center gap-1 py-1" aria-label={t.home.v2.chatTyping}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-current opacity-50 motion-safe:animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </span>
              ) : (
                <>
                  <span className="sr-only">{answer}</span>
                  <span aria-hidden>
                    {answer.slice(0, n)}
                    {phase === "answering" && <span className="thcn-caret" />}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`flex items-center gap-2 border-t ${RULE} px-3 py-2`}>
        <span className="min-w-0 flex-1 truncate font-mono text-[12px] opacity-50">{t.home.v2.chatPlaceholder}</span>
        <span className="font-mono text-[11px] font-bold text-accent-strong">↵</span>
      </div>
    </div>
  );
}
