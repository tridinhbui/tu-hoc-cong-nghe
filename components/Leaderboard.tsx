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
    <div className="bg-white border-2 border-stone-200 rounded-xl p-5 h-fit sticky top-24">
      <div className="mb-4">
        <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">
          Top Người Học
        </p>
      </div>

      <div className="space-y-1.5">
        {topEntries.map((entry) => {
          const isCurrent = currentUserRank === entry.rank;
          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                isCurrent
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-white border border-stone-200 hover:border-stone-300"
              }`}
            >
              {/* Rank Badge */}
              <div
                className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-extrabold ${
                  entry.rank === 1
                    ? "bg-amber-200 text-amber-900"
                    : entry.rank === 2
                      ? "bg-gray-300 text-gray-900"
                      : entry.rank === 3
                        ? "bg-amber-100 text-amber-800"
                        : "bg-stone-100 text-stone-700"
                }`}
              >
                {entry.rank}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className={`font-bold truncate ${isCurrent ? "text-emerald-900" : "text-stone-900"}`}>
                  {entry.name}
                </div>
                <div className={`text-xs ${isCurrent ? "text-emerald-700" : "text-stone-500"}`}>
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
    </div>
  );
}
