"use client";

import { useEffect, useRef, useState } from "react";
import { animateCountTo } from "@/lib/animate-count";
import { useI18n } from "@/lib/i18n/context";
import { intlLocale } from "@/lib/i18n";

/** Chấm xanh "đang sống" - xanh lá chứ không phải xanh thương hiệu: đây là ô
 *  trạng thái của dữ liệu sống, cùng quy ước với chấm trạng thái trong menu.
 *  Hai vòng lan lệch nhịp để nhìn từ xa vẫn thấy nó đang thở. */
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-flex h-3 w-3 shrink-0 ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
      <span className="absolute -inset-1 rounded-full bg-emerald-400/30 motion-safe:animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_2px_rgba(16,185,129,0.65)]" />
    </span>
  );
}

// A number that visibly reads as "live" - pulsing dot glued to it, not just
// a plain figure - so a count-up animation on mount doesn't get mistaken
// for a static hardcoded marketing claim. Used by the homepage hero.
//
// Mỗi lần số đổi (lúc tải và mỗi lần tăng), ô số loé xanh một nhịp: `key`
// theo giá trị làm span dựng lại và chạy lại keyframe `thcn-live-flash`.
export default function LiveNumber({ value, className = "" }: { value: number; className?: string }) {
  const { locale } = useI18n();
  const [displayValue, setDisplayValue] = useState(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    animateCountTo(value, setDisplayValue, cancelledRef);
    return () => {
      cancelledRef.current = true;
    };
  }, [value]);

  return (
    <span className={`relative inline-flex items-center gap-2.5 font-bold text-ink tabular-nums ${className}`}>
      <LiveDot />
      <span key={value} className="thcn-live-flash -mx-1 rounded-sm px-1">
        {displayValue.toLocaleString(intlLocale(locale))}+
      </span>
    </span>
  );
}
