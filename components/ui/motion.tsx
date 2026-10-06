"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/*
 * Lớp chuyển động dùng chung của trang chủ: hiện dần khi cuộn, parallax,
 * theo con trỏ, từ trường. Cùng một ngôn ngữ cho cả trang - nhẹ, chậm, êm.
 *
 * Luật chung:
 *  - Chỉ animate transform/opacity. Không setState theo frame: mọi giá trị
 *    động đi qua CSS variable hoặc thuộc tính data-*, ghi thẳng vào DOM.
 *  - Máy chủ kết xuất trạng thái CUỐI. Trạng thái ẩn chỉ được đặt SAU khi gắn
 *    (và chỉ cho phần tử còn nằm dưới màn hình), nên JS lỗi hay tắt JS vẫn
 *    thấy đủ nội dung.
 *  - prefers-reduced-motion: không đặt gì, không nghe gì - đứng yên ở cuối.
 */

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Hiện dần + trượt nhẹ khi vào khung nhìn, một lần. `delay` (ms) để so le. */
export function Reveal({
  as = "div",
  delay = 0,
  y,
  variant = "rise",
  className,
  style,
  children,
}: {
  as?: "div" | "p" | "li" | "span";
  delay?: number;
  /** Quãng trượt (px), mặc định 18. */
  y?: number;
  /** `line`: đường kẻ vẽ ra từ trái sang phải thay vì trượt. */
  variant?: "rise" | "line";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    // Đã nằm trong màn hình lúc gắn (hero, LCP): để nguyên, không giấu.
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return;
    el.dataset.rv = "pre";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          // Hai nhịp frame để trình duyệt kịp ghi trạng thái "pre" rồi mới chuyển.
          requestAnimationFrame(() => (el.dataset.rv = "in"));
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as as unknown as React.ComponentType<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
  return (
    <Tag
      ref={ref}
      className={className}
      data-rv-v={variant}
      style={{ ...style, "--rv-d": `${delay}ms`, "--rv-y": `${y ?? 18}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* Một bộ nghe scroll duy nhất cho mọi Parallax: passive + rAF. */
type Item = { el: HTMLElement; speed: number; on: boolean };
const items = new Set<Item>();
let ticking = false;
let bound = false;

function paint() {
  ticking = false;
  const mid = window.innerHeight / 2;
  items.forEach((it) => {
    if (!it.on) return;
    const r = it.el.getBoundingClientRect();
    const off = (r.top + r.height / 2 - mid) * it.speed;
    it.el.style.setProperty("--py", `${off.toFixed(1)}px`);
  });
}
function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(paint);
  }
}

/**
 * Dịch chuyển theo scroll. speed dương: trôi ngược chiều cuộn (xa hơn);
 * âm: nhanh hơn nội dung. Giá trị nhỏ (0.04-0.15) mới êm.
 */
export function Parallax({
  speed = 0.08,
  className,
  children,
  ...rest
}: {
  speed?: number;
  className?: string;
  children?: ReactNode;
} & { "aria-hidden"?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const it: Item = { el, speed, on: false };
    items.add(it);
    const io = new IntersectionObserver(
      (entries) => {
        it.on = entries.some((e) => e.isIntersecting);
        if (it.on) onScroll();
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(el);
    if (!bound) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      bound = true;
    }
    return () => {
      io.disconnect();
      items.delete(it);
      if (items.size === 0 && bound) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        bound = false;
      }
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ transform: "translate3d(0, var(--py, 0px), 0)" }} {...rest}>
      {children}
    </div>
  );
}

/**
 * Theo con trỏ: ghi --mx/--my (px, trong vùng) và --tx/--ty (-1..1) lên phần
 * tử, giới hạn một lần ghi mỗi frame. Con trỏ rời vùng thì --tx/--ty về 0.
 * Chỉ chuột; cảm ứng không có con trỏ để theo.
 */
export function usePointerVars<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    let ev: PointerEvent | null = null;
    const flush = () => {
      raf = 0;
      if (!ev) return;
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      el.style.setProperty("--mx", `${x.toFixed(0)}px`);
      el.style.setProperty("--my", `${y.toFixed(0)}px`);
      el.style.setProperty("--tx", ((x / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--ty", ((y / r.height) * 2 - 1).toFixed(3));
      el.dataset.hover = "1";
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ev = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const leave = () => {
      ev = null;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
      el.dataset.hover = "0";
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/**
 * Cổng cho animation liên tục: đặt data-live="1" khi phần tử đang trong khung
 * nhìn VÀ tab đang hiện; CSS chỉ cho keyframes chạy khi data-live="1".
 */
export function useLiveGate<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let inView = false;
    const apply = () => {
      el.dataset.live = inView && !document.hidden ? "1" : "0";
    };
    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      apply();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, [ref]);
}

/** Từ trường rất nhẹ: phần tử nghiêng về phía con trỏ tối đa `pull` px. */
export function Magnetic({ pull = 6, className, children }: { pull?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const set = (x: number, y: number) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      set(Math.max(-1, Math.min(1, dx)) * pull, Math.max(-1, Math.min(1, dy)) * pull * 0.6);
    };
    const leave = () => set(0, 0);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pull]);
  return (
    <span ref={ref} className={`inline-flex transition-transform duration-300 ease-out ${className ?? ""}`}>
      {children}
    </span>
  );
}
