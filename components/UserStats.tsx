"use client";

import { getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress, LEVELS } from "@/lib/levels";

interface UserStatsProps {
  xp: number;
  lessonsCompleted: number;
  totalLessons: number;
  avgQuizScore?: number;
}

export default function UserStats({
  xp,
  lessonsCompleted,
  totalLessons,
  avgQuizScore = 0,
}: UserStatsProps) {
  const currentLevel = getLevelByXp(xp);
  const nextLevel = getNextLevel(currentLevel.level);
  const xpToNext = getXpToNextLevel(xp);
  const progress = getLevelProgress(xp);

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-4">
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
            return (
              <div key={lvl.level} className="relative flex flex-col items-center gap-1.5 flex-1 min-w-0">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
