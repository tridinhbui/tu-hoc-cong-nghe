"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getUserAnalytics, type LearningAnalytics } from "@/lib/supabase-analytics";

// Small icon button, same footprint as BookmarkButton next to it - opens a
// compact stats card on hover (desktop) or tap (mobile) instead of sending
// people all the way to /analytics just to check their XP mid-lesson.
export default function LessonStatsHover() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<LearningAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open || stats || loading) return;
    setLoading(true);
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const data = await getUserAnalytics(user.id);
        setStats(data);
      } catch (error) {
        console.error("Error loading lesson stats preview:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, stats, loading]);

  // The button and the popover aren't touching (there's a visual gap for the
  // little arrow/spacing), so a plain onMouseLeave on the wrapper closed the
  // popover the instant the cursor crossed that gap, before it ever reached
  // "Xem đầy đủ". Closing after a short delay - cancelled if the cursor lands
  // back on the button or the popover in time - survives that crossing.
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }
  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  useEffect(() => () => cancelClose(), []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
        aria-label="Xem nhanh thống kê"
        title="Thống kê"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 hover:text-stone-700 dark:hover:text-stone-200 transition-all cursor-pointer"
      >
        <BarChart3 className="w-4 h-4" />
      </button>

      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute right-0 top-full mt-2 z-50 w-56 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl shadow-lg p-4"
        >
          {loading && !stats ? (
            <p className="text-xs text-stone-400 dark:text-stone-500">Đang tải...</p>
          ) : stats ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide">Level</p>
                  <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{stats.currentLevel}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide">XP</p>
                  <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{stats.totalXpEarned}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide">Bài xong</p>
                  <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{stats.totalLessonsCompleted}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide">Chuỗi ngày</p>
                  <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{stats.streakDays}</p>
                </div>
              </div>
              <Link
                href="/analytics"
                className="block text-center text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 pt-2 mt-1 border-t border-stone-100 dark:border-stone-800"
              >
                Xem đầy đủ →
              </Link>
            </div>
          ) : (
            <p className="text-xs text-stone-400 dark:text-stone-500">Đăng nhập để xem thống kê</p>
          )}
        </div>
      )}
    </div>
  );
}
