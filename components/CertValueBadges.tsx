"use client";

import { Target, BookOpen, PenTool, TrendingUp } from "lucide-react";

interface ValueItem {
  icon: "target" | "book" | "pen" | "chart";
  title: string;
  desc: string;
}

interface CertValueBadgesProps {
  items: ValueItem[];
}



export default function CertValueBadges({ items }: CertValueBadgesProps) {
  const resolved = items;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {resolved.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-accent-strong flex items-center justify-center shrink-0 border border-brand-100 dark:border-brand-900/60">
            {item.icon === "target" && <Target className="w-5 h-5" />}
            {item.icon === "book" && <BookOpen className="w-5 h-5" />}
            {item.icon === "pen" && <PenTool className="w-5 h-5" />}
            {item.icon === "chart" && <TrendingUp className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-black text-ink-max truncate">
              {item.title}
            </h3>
            <p className="text-[11px] font-medium text-ink-muted leading-snug mt-0.5 line-clamp-2">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
