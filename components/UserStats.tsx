"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress, LEVELS } from "@/lib/levels";
import { getLevelStats, type LevelStats } from "@/lib/supabase-user";

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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    getLevelStats(userId)
      .then((stats) => {
        if (!cancelled) setLevelStats(stats);
      })
      .catch((error) => console.error("Error loading level stats:", error));
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
    <div ref={rootRef} className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-4">
      <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
        {/* Level Info */}
        <div>
          <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            Level
          </p>
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            {currentLevel.name}
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            {currentLevel.level} / {LEVELS.length}
          </p>
          {levelStats?.myTopPercent !== null && levelStats?.myTopPercent !== undefined && (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              Bạn nằm trong top {levelStats.myTopPercent}%
            </p>
          )}
        </div>

        {/* XP Display */}
        <div className="text-right">
          <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            XP
          </p>
          <div className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{xp}</div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {xpToNext > 0 ? `+${xpToNext}` : "Max"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs">
          <div className="text-center">
            <div className="font-extrabold text-stone-900 dark:text-stone-100">{lessonsCompleted}</div>
            <p className="text-stone-500 dark:text-stone-400">bài</p>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-stone-900 dark:text-stone-100">{Math.round(avgQuizScore)}</div>
            <p className="text-stone-500 dark:text-stone-400">điểm</p>
          </div>
        </div>
      </div>

      {/* Level roadmap - every milestone laid out, not just the current
          level's name, so a learner can see the whole journey ahead
          (what's next, how far, and how many levels remain) at a glance. */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
        {levelStats && (
          <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-stone-400 dark:text-stone-500">
            <span className="relative flex w-1.5 h-1.5">
              <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
            </span>
            Số liệu thật, cập nhật trực tiếp từ toàn bộ học viên trên hệ thống
          </div>
        )}
        <div className="relative flex items-start justify-between">
          {/* Connecting line + filled progress, sits behind the dots */}
          <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-800 mx-2.5" />
          <div
            className="absolute top-2.5 left-2.5 h-0.5 bg-emerald-500 transition-all duration-500"
            style={{
              width: `calc(${((currentLevel.level - 1 + (nextLevel ? progress / 100 : 0)) / (LEVELS.length - 1)) * 100}% - 20px)`,
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
                className="relative flex flex-1 min-w-0 flex-col items-center gap-1.5 group bg-transparent text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold border-2 ${
                    isCurrent
                      ? "bg-emerald-500 border-emerald-500 text-white scale-125 shadow-md"
                      : reached
                        ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-400"
                        : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-600"
                  }`}
                >
                  {lvl.level}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight px-0.5 ${
                    isCurrent
                      ? "text-emerald-700 dark:text-emerald-400"
                      : reached
                        ? "text-stone-600 dark:text-stone-400"
                        : "text-stone-400 dark:text-stone-600"
                  }`}
                >
                  {lvl.name}
                </span>
                {levelStats && (
                  <span className="text-[9px] sm:text-[10px] text-stone-400 dark:text-stone-600">
                    {levelStats.levelCounts[lvl.level] ?? 0} người
                  </span>
                )}

                {/* Hover card: who's leading this level, by XP */}
                {topUsers.length > 0 && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 z-30 mt-2 w-56 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-2.5 shadow-xl origin-top transition-all duration-150 ${
                    isTooltipOpen ? "opacity-100 scale-100 pointer-events-auto" : "pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  }`}>
                    <p className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                      Top {lvl.name}
                    </p>
                    <div className="space-y-1.5">
                      {topUsers.map((u, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {u.avatarUrl ? (
                            <Image
                              src={u.avatarUrl}
                              alt={u.name}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded-full object-cover flex-shrink-0 border border-stone-200 dark:border-stone-700"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[9px] font-extrabold">
                              {u.name.trim().charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate flex-1">
                            {u.name}
                          </span>
                          <span className="text-xs text-stone-500 dark:text-stone-400 flex-shrink-0">{u.xp} XP</span>
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
