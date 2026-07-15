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
}

export default function UserStats({
  xp,
  lessonsCompleted,
  totalLessons,
  avgQuizScore = 0,
  userId,
}: UserStatsProps) {
  const currentLevel = getLevelByXp(xp);
  const nextLevel = getNextLevel(currentLevel.level);
  const xpToNext = getXpToNextLevel(xp);
  const progress = getLevelProgress(xp);

  const [levelStats, setLevelStats] = useState<LevelStats | null>(null);
  const [openLevelTooltip, setOpenLevelTooltip] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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
    <div ref={rootRef} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 sm:p-4">
      {/* Top section with compact stats */}
      <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        {/* Level Info */}
        <div className="min-w-[100px]">
          <p className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            Cấp độ
          </p>
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5 truncate">
            {currentLevel.name}
          </h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            {currentLevel.level}/{LEVELS.length}
          </p>
        </div>

        {/* XP Display */}
        <div>
          <p className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            XP
          </p>
          <div className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">{xp}</div>
          <p className="text-[10px] text-stone-400 dark:text-stone-500">
            {xpToNext > 0 ? `+${xpToNext}` : "Tối đa"}
          </p>
        </div>

        {/* Streak Display */}
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center flex-shrink-0">
            <Flame className={`w-3.5 h-3.5 ${hasActivityToday ? "text-orange-500" : "text-stone-400 dark:text-stone-600"}`} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
              Streak
            </p>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-none mt-0.5">
              {streak} ngày
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 text-[11px] border-l border-stone-100 dark:border-stone-850 pl-3">
          <div className="text-center">
            <div className="font-bold text-stone-900 dark:text-stone-100">{lessonsCompleted}</div>
            <p className="text-stone-500 dark:text-stone-400 text-[10px]">Đã học</p>
          </div>
          <div className="text-center">
            <div className="font-bold text-stone-900 dark:text-stone-100">{Math.round(avgQuizScore)}%</div>
            <p className="text-stone-500 dark:text-stone-400 text-[10px]">Quiz TB</p>
          </div>
        </div>
      </div>

      {/* Level Roadmap - Shrunk to fit compact height */}
      <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
        <div className="relative flex items-start justify-between">
          {/* Connecting line + progress */}
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-stone-100 dark:bg-stone-800 mx-2" />
          <div
            className="absolute top-2 left-2 h-0.5 bg-emerald-500 transition-all duration-500"
            style={{
              width: `calc(${((currentLevel.level - 1 + (nextLevel ? progress / 100 : 0)) / (LEVELS.length - 1)) * 100}% - 16px)`,
            }}
          />

          {LEVELS.map((lvl) => {
            const reached = xp >= lvl.minXp;
            const isCurrent = lvl.level === currentLevel.level;
            const topUsers = levelStats?.topUsersByLevel[lvl.level] ?? [];
            const isTooltipOpen = openLevelTooltip === lvl.level;
            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => setOpenLevelTooltip((current) => (current === lvl.level ? null : lvl.level))}
                onMouseEnter={() => setOpenLevelTooltip(lvl.level)}
                className="relative flex flex-1 min-w-0 flex-col items-center gap-1 group bg-transparent text-left"
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold border ${
                    isCurrent
                      ? "bg-emerald-500 border-emerald-500 text-white scale-110 shadow-sm"
                      : reached
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-700 dark:text-emerald-400"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-450"
                  }`}
                >
                  {lvl.level}
                </div>
                <span
                  className={`text-[9px] font-semibold text-center leading-tight px-0.5 ${
                    isCurrent
                      ? "text-emerald-700 dark:text-emerald-400"
                      : reached
                        ? "text-stone-600 dark:text-stone-400"
                        : "text-stone-400 dark:text-stone-500"
                  }`}
                >
                  {lvl.name}
                </span>
                
                {topUsers.length > 0 && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 z-30 mt-1.5 w-48 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-2 py-2 shadow-lg origin-top transition-all duration-150 ${
                    isTooltipOpen ? "opacity-100 scale-100 pointer-events-auto" : "pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  }`}>
                    <p className="text-[9px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                      Top {lvl.name}
                    </p>
                    <div className="space-y-1">
                      {topUsers.map((u, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          {u.avatarUrl ? (
                            <Image
                              src={u.avatarUrl}
                              alt={u.name}
                              width={16}
                              height={16}
                              className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[8px] font-extrabold">
                              {u.name.trim().charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="text-[10px] font-semibold text-stone-800 dark:text-stone-200 truncate flex-1">
                            {u.name}
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 flex-shrink-0">{u.xp} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
