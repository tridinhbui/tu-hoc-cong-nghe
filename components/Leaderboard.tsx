"use client";

import { getLevelByXp } from "@/lib/levels";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  lessonsCompleted: number;
  avgQuizScore: number;
  level: ReturnType<typeof getLevelByXp>;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}

export default function Leaderboard({ entries, currentUserRank }: LeaderboardProps) {
  const topEntries = entries.slice(0, 5);

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 h-fit sticky top-24">
      <div className="mb-4">
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Top Người Học
        </p>
      </div>

      {topEntries.length === 0 ? (
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Chưa có đủ dữ liệu xếp hạng. Hoàn thành bài học để lên bảng đầu tiên!
        </p>
      ) : (
        <div className="space-y-1.5">
          {topEntries.map((entry) => {
            const isCurrent = currentUserRank === entry.rank;
            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                  isCurrent
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900"
                    : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                {/* Rank Badge */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-extrabold ${
                    entry.rank === 1
                      ? "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-300"
                      : entry.rank === 2
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        : entry.rank === 3
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                  }`}
                >
                  {entry.rank}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-bold truncate ${isCurrent ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                    {entry.name}
                  </div>
                  <div className={`text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                    {entry.xp} XP
                  </div>
                </div>

                {isCurrent && (
                  <div className="text-emerald-600 font-bold text-sm">✓</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
