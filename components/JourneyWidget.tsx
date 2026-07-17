"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, BookOpen } from "lucide-react";
import { getMyJourney, getJourneyStats, type JourneyMilestone, type JourneyStats } from "@/lib/journey";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const TYPE_ACCENT: Record<JourneyMilestone["type"], string> = {
  signup: "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30",
  lesson_milestone: "border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30",
  badge: "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30",
};

export default function JourneyWidget({ userId }: { userId: string }) {
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [stats, setStats] = useState<JourneyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    Promise.all([getMyJourney(userId), getJourneyStats(userId)])
      .then(([j, s]) => {
        setMilestones(j);
        setStats(s);
      })
      .catch((err) => console.error("Error loading journey:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="relative mt-8 px-1">


      {loading ? (
        <p className="text-xs text-stone-400 dark:text-stone-500">Đang tải...</p>
      ) : milestones.length === 0 ? (
        <div className="text-center py-8 bg-stone-50 dark:bg-stone-950/40 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Hành trình của bạn sắp bắt đầu!</p>
          <p className="text-[10px] text-stone-500 dark:text-stone-405 mt-0.5">Hoàn thành bài học đầu tiên để mở cột mốc đầu tiên.</p>
        </div>
      ) : (
        <div className="relative pl-7 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
          <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-stone-250 dark:bg-stone-800" aria-hidden="true" />
          <div className="space-y-4">
            {[...milestones].reverse().map((m, i) => (
              <div key={`${m.type}-${m.date}-${i}`} className="relative">
                <span
                  className={`absolute -left-7 top-1.5 w-6 h-6 rounded-full border flex items-center justify-center text-xs bg-white dark:bg-stone-900 ${TYPE_ACCENT[m.type]}`}
                >
                  {m.emoji}
                </span>
                <div className="bg-stone-50/50 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-800/80 rounded-xl px-4 py-2.5 ml-2.5">
                  <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 mb-0.5">{formatDate(m.date)}</p>
                  <p className="font-extrabold text-stone-900 dark:text-stone-100 text-xs">{m.title}</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
