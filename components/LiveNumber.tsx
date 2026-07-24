"use client";

import { useEffect, useRef, useState } from "react";
import { animateCountTo } from "@/lib/animate-count";

// A number that visibly reads as "live" - pulsing dot glued to it, not just
// a plain figure - so a count-up animation on mount doesn't get mistaken
// for a static hardcoded marketing claim. Shared by the homepage hero,
// stat section, and the login page.
export default function LiveNumber({ value, className = "" }: { value: number; className?: string }) {
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
    <span className={`relative inline-flex items-baseline font-bold text-stone-900 dark:text-stone-100 tabular-nums ${className}`}>
      <span className="relative flex w-1.5 h-1.5 mr-1.5">
        <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
      </span>
      {displayValue.toLocaleString("vi-VN")}+
    </span>
  );
}
