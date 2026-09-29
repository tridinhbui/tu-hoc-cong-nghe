"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * Bộ hiệu ứng chung của trang chủ biên tập: gõ chữ, giải mã, thanh nạp.
 *
 * Luật chung cho cả ba:
 *  - Lúc kết xuất trên máy chủ, chữ luôn ĐẦY ĐỦ. Máy tìm kiếm, trình đọc màn
 *    hình và người tắt JavaScript đọc được hết; hiệu ứng chỉ chạy sau khi gắn.
 *  - Chạy MỘT lần, khi phần tử lần đầu lọt vào màn hình.
 *  - reduced-motion: không chạy gì cả, chữ đứng yên ở trạng thái cuối.
 */

export function useInViewOnce<T extends Element>(margin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, margin]);
  return { ref, seen };
}

/** Gõ từng ký tự. Chữ thật nằm ở sr-only; phần đang gõ thì aria-hidden. */
export function TypeText({
  text,
  speed = 28,
  delay = 0,
  cursor = true,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
  onDone?: () => void;
}) {
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLSpanElement>();
  const [n, setN] = useState(text.length);
  const [typing, setTyping] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      doneRef.current?.();
      return;
    }
    let i = 0;
    let timer: number;
    const step = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = window.setTimeout(step, speed * (0.6 + Math.random() * 0.8));
      else {
        setTyping(false);
        doneRef.current?.();
      }
    };
    // Xoá chữ và bắt đầu gõ trong cùng một nhịp hẹn giờ, không đồng bộ trong
    // thân effect - xem react-hooks/set-state-in-effect.
    timer = window.setTimeout(() => {
      setN(0);
      setTyping(true);
      timer = window.setTimeout(step, delay);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [seen, reduce, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, n)}
        {cursor && (typing || n < text.length) && <span className="thcn-caret" />}
      </span>
    </span>
  );
}

/* i18n-ignore-start: bảng ký tự nhiễu của hiệu ứng giải mã, không phải chữ. */
const NOISE = "▓▒░<>/\\_#01{}[]=+*$%&?";
/* i18n-ignore-end */

/** Giải mã: từng ký tự quay qua ký tự nhiễu rồi chốt về đúng chữ, trái sang phải. */
export function Scramble({
  text,
  duration = 900,
  delay = 0,
  className = "",
}: {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLSpanElement>();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!seen || reduce) return;
    let raf = 0;
    let start = 0;
    const chars = [...text];
    const frame = (ts: number) => {
      if (!start) start = ts + delay;
      const p = Math.max(0, (ts - start) / duration);
      if (p >= 1) {
        setOut(text);
        return;
      }
      const settled = Math.floor(p * chars.length);
      setOut(
        chars
          .map((c, i) => (c === " " || i < settled ? c : NOISE[(Math.random() * NOISE.length) | 0]))
          .join("")
      );
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduce, text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/**
 * Thanh nạp kiểu log gỡ lỗi: `[████░░░░] 64%  đang nạp ...` rồi chốt `OK`.
 * Đặt ở đầu mỗi section - nó là nhịp "tờ tài liệu đang được dựng" của trang.
 */
export function LoadBar({
  label,
  done,
  className = "",
  cells = 18,
}: {
  label: string;
  done: string;
  className?: string;
  cells?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  const [p, setP] = useState(100);

  useEffect(() => {
    if (!seen || reduce) return;
    let v = 0;
    let timer: number;
    const step = () => {
      // Nhảy không đều như tiến trình thật: nhanh, khựng, rồi chạy nốt.
      v = Math.min(100, v + 4 + Math.random() * 16);
      setP(v);
      if (v < 100) timer = window.setTimeout(step, 40 + Math.random() * 110);
    };
    timer = window.setTimeout(() => {
      setP(0);
      timer = window.setTimeout(step, 120);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [seen, reduce]);

  const filled = Math.round((p / 100) * cells);
  const ok = p >= 100;
  return (
    <div ref={ref} aria-hidden className={`flex min-w-0 items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.06em] ${className}`}>
      <span className="shrink-0 whitespace-pre">
        [<span className="text-accent">{"█".repeat(filled)}</span>
        <span className="opacity-30">{"░".repeat(cells - filled)}</span>]
      </span>
      <span className="w-9 tabular-nums">{Math.floor(p)}%</span>
      <span className="hidden min-w-0 truncate opacity-70 sm:inline">{label}</span>
      <span className={`ml-auto shrink-0 font-bold ${ok ? "text-accent" : "opacity-40"}`}>
        {ok ? done : "…"}
      </span>
    </div>
  );
}
