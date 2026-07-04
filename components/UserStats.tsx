"use client";

import { LEVELS, getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress } from "@/lib/levels";

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
    <div className="space-y-6">
      {/* ── Current Level + XP ── */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-8">
        <div className="space-y-6">
          {/* Level Display */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                Level hiện tại
              </p>
              <h3 className="text-3xl font-extrabold text-stone-900">
                {currentLevel.name}
              </h3>
              <p className="text-sm text-stone-600 mt-2">
                Cấp độ {currentLevel.level} / {LEVELS.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-stone-500 uppercase tracking-widest mb-1">
                Điểm kinh nghiệm
              </div>
              <div className="text-4xl font-extrabold text-stone-900">{xp}</div>
              <p className="text-xs text-stone-400 mt-1">
                {xpToNext > 0 ? `+${xpToNext} để lên cấp` : "Max level!"}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextLevel && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-600">
                  {currentLevel.minXp}
                </span>
                <span className="font-bold text-stone-900">{progress}%</span>
                <span className="font-semibold text-stone-600">
                  {nextLevel.minXp}
                </span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border-2 border-stone-200">
                <div
                  className="h-full bg-gradient-to-r from-stone-400 to-stone-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Lessons Completed */}
        <div className="bg-white border-2 border-stone-200 rounded-xl p-4">
          <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">
            Bài đã học
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-stone-900">
              {lessonsCompleted}
            </span>
            <span className="text-sm text-stone-600">/ {totalLessons}</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            {Math.round((lessonsCompleted / totalLessons) * 100)}%
          </p>
        </div>

        {/* Progress Percentage */}
        <div className="bg-white border-2 border-stone-200 rounded-xl p-4">
          <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">
            Tiến độ
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-emerald-600">
              {Math.round((lessonsCompleted / totalLessons) * 100)}
            </span>
            <span className="text-sm text-stone-600">%</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">Hoàn thành</p>
        </div>

        {/* Avg Quiz Score */}
        <div className="bg-white border-2 border-stone-200 rounded-xl p-4 col-span-2 sm:col-span-1">
          <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">
            Quiz trung bình
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-stone-900">
              {avgQuizScore.toFixed(1)}
            </span>
            <span className="text-sm text-stone-600">/ 100</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            {avgQuizScore >= 80 ? "Xuất sắc!" : avgQuizScore >= 60 ? "Tốt" : "Cần cố gắng"}
          </p>
        </div>
      </div>
    </div>
  );
}
