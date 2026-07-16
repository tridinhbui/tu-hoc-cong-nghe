"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Flame } from "lucide-react";
import { getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress, LEVELS } from "@/lib/levels";
import { getLevelStats, type LevelStats } from "@/lib/supabase-user";
import { getUserStreak, hasActivityToday as checkActivityToday } from "@/lib/supabase-streak";

interface UserStatsProps {
  xp: number;
  lessonsCompleted: number;
  totalLessons: number;
  avgQuizScore?: number;
  userId?: string;
  sidebar?: boolean;
}

const LEVEL_EMOJIS: Record<number, string> = {
  1: "🌱", // Tò mò
  2: "🎒", // Học viên
  3: "💼", // Nhà đầu tư
  4: "📊", // Nhà phân tích
  5: "🛡️", // Cố vấn Tài chính
  6: "👑", // Thạo thủ Tài chính
};

export default function UserStats({
  xp,
  lessonsCompleted,
  totalLessons,
  avgQuizScore = 0,
  userId,
  sidebar = false,
}: UserStatsProps) {
  const currentLevel = getLevelByXp(xp);
  const nextLevel = getNextLevel(currentLevel.level);
  const xpToNext = getXpToNextLevel(xp);
  const progress = getLevelProgress(xp);

  const [levelStats, setLevelStats] = useState<LevelStats | null>(null);
  const [openLevelTooltip, setOpenLevelTooltip] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    const loadActiveTitle = () => {
      if (typeof window !== "undefined") {
        setActiveTitle(window.localStorage.getItem(`thtcdn_active_title_${userId}`));
      }
    };
    loadActiveTitle();
    window.addEventListener("thtcdn_profile_updated", loadActiveTitle);
    return () => {
      window.removeEventListener("thtcdn_profile_updated", loadActiveTitle);
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    
    // Fetch Level Stats
    getLevelStats(userId)
      .then((stats) => {
        if (!cancelled) setLevelStats(stats);
      })
      .catch((error) => console.error("Error loading level stats:", error));

    // Fetch Streak
    getUserStreak(userId)
      .then((streakData) => {
        if (!cancelled) setStreak(streakData?.current_streak || 0);
      })
      .catch((error) => console.error("Error loading streak:", error));

    checkActivityToday(userId)
      .then((todayActivity) => {
        if (!cancelled) setHasActivityToday(todayActivity);
      })
      .catch((error) => console.error("Error checking today activity:", error));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (openLevelTooltip === null) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenLevelTooltip(null);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [openLevelTooltip]);

  return (
    <div
      ref={rootRef}
      className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md group ${
        sidebar ? "p-3.5" : "p-4 sm:p-5"
      }`}
    >
      {/* Subtle background glow bubbles for gamified accent */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125" />

      {/* Gamified Header Section */}
      <div className={`flex items-center gap-3 relative z-10 ${sidebar ? "mb-3" : "mb-4"}`}>
        <div className={`rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-150 dark:border-stone-800 flex items-center justify-center text-xl shadow-sm shrink-0 ${
          sidebar ? "w-9 h-9 text-lg" : "w-11 h-11 text-xl"
        }`}>
          {LEVEL_EMOJIS[currentLevel.level] || "🌱"}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[8px] sm:text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block leading-none">
            Cấp độ {currentLevel.level} / {LEVELS.length}
          </span>
          <h3 className={`font-extrabold text-stone-900 dark:text-stone-50 mt-0.5 tracking-tight leading-none truncate ${
            sidebar ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          }`}>
            {currentLevel.name}
          </h3>
          {activeTitle && (
            <span className="text-[9px] font-bold text-amber-500 dark:text-amber-400 mt-0.5 block leading-none truncate">
              🏆 {activeTitle}
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className={`font-extrabold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-lg ${
            sidebar ? "text-[9px] px-2 py-1" : "text-[10px] px-2.5 py-1.5"
          }`}>
            {xp} XP
          </span>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className={`grid grid-cols-2 gap-2 relative z-10 ${sidebar ? "mb-3" : "mb-4"}`}>
        {/* Streak Box */}
        <div className={`bg-stone-50/60 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-850 rounded-xl flex items-center justify-between gap-1.5 ${
          sidebar ? "p-2" : "p-3"
        }`}>
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[9px] font-extrabold text-stone-455 dark:text-stone-500 uppercase tracking-wider block">Streak</span>
            <span className={`font-extrabold text-stone-900 dark:text-stone-150 mt-0.5 block leading-none truncate ${
              sidebar ? "text-xs" : "text-sm"
            }`}>{streak} ngày</span>
          </div>
          <div className={`rounded-full flex items-center justify-center shrink-0 transition-colors ${
            sidebar ? "w-6 h-6" : "w-8 h-8"
          } ${
            streak > 0 
              ? "bg-orange-50/50 dark:bg-orange-950/20" 
              : "bg-stone-100 dark:bg-stone-850"
          }`}>
            {streak > 0 ? (
              <div className="relative w-6 h-6 flex items-center justify-center scale-90">
                {/* Heatwave pulsing ring */}
                {hasActivityToday && (
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 dark:bg-orange-500/10 scale-125 animate-[heatwave_2s_ease-in-out_infinite]" />
                )}
                {/* Glow behind the flame */}
                <div className="absolute inset-0 rounded-full bg-orange-500/30 dark:bg-orange-600/20 blur-[5px] animate-pulse" />
                
                {/* Animated Custom SVG Flame */}
                <svg className="w-5 h-5 relative z-10 drop-shadow-[0_1px_4px_rgba(249,115,22,0.7)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                    <linearGradient id="flameMid" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="70%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#fef08a" />
                    </linearGradient>
                    <linearGradient id="flameCore" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M17.5 11.5c-.3-1.8-1.5-3.3-2.3-4.5-1.2-1.8-2.2-3.8-2-6 .1.8-.1 1.6-.7 2.2-.6.7-1.4 1.1-2 1.8C9 6.7 8.3 8.3 8.3 10c0 .3 0 .6.1.9-.9-.9-1.2-2.1-1-3.3-.8 1-1.3 2.3-1.3 3.7.1 4.5 3.9 8.2 8.4 8.2 4.6 0 8.3-3.7 8.3-8.3 0-.7-.1-1.4-.3-2-.3.9-.6 1.7-1 2.3z"
                    fill="url(#flameOuter)"
                    className="origin-bottom animate-[flameWobble_1.6s_ease-in-out_infinite]"
                  />
                  <path
                    d="M15.5 12.5c-.2-1.4-1-2.6-1.6-3.5-.8-1.4-1.5-3-1.4-4.7.1.6-.1 1.3-.5 1.7-.4.5-1 .8-1.4 1.4-.8 1-1.3 2.2-1.3 3.5 0 .2 0 .5.1.7-.6-.7-.8-1.6-.7-2.5-.5.7-.9 1.8-.9 2.9 0 3.5 2.9 6.3 6.3 6.3 3.5 0 6.3-2.8 6.3-6.3 0-.5-.1-1.1-.2-1.5-.2.7-.4 1.3-.7 1.8z"
                    fill="url(#flameMid)"
                    className="origin-bottom opacity-90 animate-[flameMidWobble_1.2s_ease-in-out_infinite]"
                  />
                  <path
                    d="M14.2 13.5c-.2-1.1-.9-2.1-1.4-2.8-.7-1.1-1.3-2.3-1.2-3.6.1.5-.1 1-.4 1.4-.3.4-.8.7-1.2 1.1-.9 1-1.3 2-1.3 3 0 .2 0 .4.1.6-.5-.5-.7-1.3-.6-2-.5.6-.8 1.4-.8 2.2 0 2.7 2.3 5 5 5s5-2.2 5-5c0-.4-.1-.8-.2-1.2-.2.5-.4 1-.6 1.3z"
                    fill="url(#flameCore)"
                    className="origin-bottom opacity-95 animate-[flameCoreWobble_0.9s_ease-in-out_infinite]"
                  />
                </svg>
              </div>
            ) : (
              <Flame className={`${sidebar ? "w-3 h-3" : "w-4 h-4"} text-stone-400 dark:text-stone-600`} />
            )}
          </div>
        </div>

        {/* Progress Box */}
        <div className={`bg-stone-50/60 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-850 rounded-xl flex flex-col justify-between ${
          sidebar ? "p-2" : "p-3"
        }`}>
          <span className="text-[8px] sm:text-[9px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block">Bài học</span>
          <div className="flex items-baseline gap-1 mt-0.5 truncate">
            <span className={`font-extrabold text-stone-900 dark:text-stone-105 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{lessonsCompleted}</span>
            <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500">/ {totalLessons}</span>
          </div>
        </div>

        {/* Quiz TB Box */}
        <div className={`bg-stone-50/60 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-850 rounded-xl flex flex-col justify-between ${
          sidebar ? "p-2" : "p-3"
        }`}>
          <span className="text-[8px] sm:text-[9px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block">Quiz TB</span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className={`font-extrabold text-stone-900 dark:text-stone-105 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{Math.round(avgQuizScore)}</span>
            <span className="text-[9px] font-bold text-stone-450 dark:text-stone-500">%</span>
          </div>
        </div>

        {/* XP Target Box */}
        <div className={`bg-stone-50/60 dark:bg-stone-950/20 border border-stone-150 dark:border-stone-850 rounded-xl flex flex-col justify-between ${
          sidebar ? "p-2" : "p-3"
        }`}>
          <span className="text-[8px] sm:text-[9px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block">Tiến cấp</span>
          <div className="flex items-baseline gap-0.5 mt-0.5 truncate">
            <span className={`font-extrabold text-stone-950 dark:text-stone-50 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{xpToNext > 0 ? `+${xpToNext}` : "Tối đa"}</span>
            {xpToNext > 0 && <span className="text-[8px] font-extrabold text-stone-400 dark:text-stone-500">XP</span>}
          </div>
        </div>
      </div>

      {/* Level Progress Bar & Alert Banner */}
      {nextLevel && (
        <div className="mt-2.5 pt-2.5 border-t border-stone-150 dark:border-stone-800/80 relative z-10">
          <div className="flex items-center justify-between text-[10px] mb-1 font-bold text-stone-500 dark:text-stone-450">
            <span>Tiến độ cấp {currentLevel.level} ({Math.round(progress)}%)</span>
            <span className="text-emerald-600 dark:text-emerald-450">Cấp {nextLevel.level}: {nextLevel.name}</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800/70 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[pulse_1.5s_infinite]" />
            </div>
          </div>
          
          {/* Gamified dopamine info banner */}
          {sidebar ? (
            <div className="mt-2.5 p-2 bg-stone-50/50 dark:bg-stone-950/30 border border-stone-150/80 dark:border-stone-850/60 rounded-xl text-[10px] text-stone-500 dark:text-stone-450 flex items-center justify-center gap-1.5 font-bold">
              <span>🎯 Còn ~{Math.max(1, Math.ceil(xpToNext / 20))} bài học (+{xpToNext} XP) lên cấp {nextLevel.level}</span>
            </div>
          ) : (
            <div className="mt-3.5 p-3 bg-stone-50/80 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🎯</span>
                <span>
                  Còn khoảng <span className="font-extrabold text-stone-900 dark:text-stone-100">{Math.max(1, Math.ceil(xpToNext / 20))} bài học</span> (+{xpToNext} XP) để lên cấp!
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🏆</span>
                <span>
                  Sắp mở danh hiệu: <span className="font-extrabold text-amber-600 dark:text-amber-400">{nextLevel.name}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {!nextLevel && (
        <div className="mt-2.5 pt-2.5 border-t border-stone-150 dark:border-stone-800/80 relative z-10">
          <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl flex items-center gap-2 text-xs text-amber-700 dark:text-amber-350 font-bold">
            <span>👑 Bạn đã đạt cấp độ tối đa! Chúc mừng Thạo thủ Tài chính!</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes heatwave {
          0%, 100% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.6;
          }
        }
        @keyframes sparkFloat {
          0% {
            transform: translateY(0) scale(0.3);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-20px) scale(1.3);
            opacity: 0;
          }
        }
        @keyframes flameWobble {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.04, 0.96); }
        }
        @keyframes flameMidWobble {
          0%, 100% { transform: rotate(2deg) scale(0.98); }
          50% { transform: rotate(-3deg) scale(1.02, 0.98); }
        }
        @keyframes flameCoreWobble {
          0%, 100% { transform: rotate(-1deg) scale(1.02); }
          50% { transform: rotate(2deg) scale(0.96, 1.04); }
        }
      `}</style>
    </div>
  );
}
