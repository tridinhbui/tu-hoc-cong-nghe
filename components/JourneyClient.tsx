"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, BookOpen } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";
import { getMyJourney, getJourneyStats, type JourneyMilestone, type JourneyStats } from "@/lib/journey";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const TYPE_ACCENT: Record<JourneyMilestone["type"], string> = {
  signup: "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30",
  lesson_milestone: "border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30",
  badge: "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30",
};

export default function JourneyClient() {
  const { userId, checking } = useAuthGate();
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

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-violet-700 dark:text-violet-400">
            🗺️ Hành trình
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Hành trình của tôi</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 mb-6">
          Những cột mốc thật trong quá trình học của bạn, từ ngày đầu tiên đến bây giờ.
        </p>

        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1.5 text-sky-500" />
              <p className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{stats.totalLessons}</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Bài đã học</p>
            </div>
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-center">
              <Flame className="w-5 h-5 mx-auto mb-1.5 text-rose-500" />
              <p className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{stats.currentStreak}</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Streak hiện tại</p>
            </div>
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-center">
              <Trophy className="w-5 h-5 mx-auto mb-1.5 text-amber-500" />
              <p className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{stats.longestStreak}</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Streak dài nhất</p>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-stone-400 dark:text-stone-500">Đang tải...</p>
        ) : milestones.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl">
            <p className="font-bold text-stone-900 dark:text-stone-100">Hành trình của bạn sắp bắt đầu!</p>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Hoàn thành bài học đầu tiên để mở cột mốc đầu tiên.</p>
          </div>
        ) : (
          <div className="relative pl-8">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-stone-200 dark:bg-stone-800" aria-hidden="true" />
            <div className="space-y-5">
              {[...milestones].reverse().map((m, i) => (
                <div key={`${m.type}-${m.date}-${i}`} className="relative">
                  <span
                    className={`absolute -left-8 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm bg-white dark:bg-stone-950 ${TYPE_ACCENT[m.type]}`}
                  >
                    {m.emoji}
                  </span>
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 ml-2">
                    <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 mb-0.5">{formatDate(m.date)}</p>
                    <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">{m.title}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
