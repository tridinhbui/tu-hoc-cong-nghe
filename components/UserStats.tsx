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
      <div className="flex items-center justify-between gap-6">
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

        {/* Progress Bar */}
        {nextLevel && (
          <div className="flex-1 min-w-0">
            <div className="h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700">
              <div
                className="h-full bg-stone-400 dark:bg-stone-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

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
    </div>
  );
}
