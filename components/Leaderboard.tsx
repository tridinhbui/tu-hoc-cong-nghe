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
  return (
    <div className="bg-white border-2 border-stone-200 rounded-2xl p-8">
      <div className="mb-6">
        <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-2">
          Bảng xếp hạng
        </p>
        <h3 className="text-2xl font-extrabold text-stone-900">Top Người Học</h3>
        <p className="text-sm text-stone-600 mt-2">
          Xếp hạng dựa trên điểm kinh nghiệm và kết quả quiz
        </p>
      </div>

      <div className="space-y-2">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-400 font-semibold">Chưa có dữ liệu xếp hạng</p>
          </div>
        ) : (
          entries.map((entry, idx) => {
            const isCurrent = currentUserRank === entry.rank;
            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-white border-stone-200 hover:border-stone-300"
                }`}
              >
                {/* Rank Badge */}
                <div
                  className={`w-10 h-10 rounded-lg font-extrabold text-sm flex items-center justify-center flex-shrink-0 ${
                    entry.rank === 1
                      ? "bg-amber-200 text-amber-900"
                      : entry.rank === 2
                        ? "bg-gray-300 text-gray-900"
                        : entry.rank === 3
                          ? "bg-amber-100 text-amber-800"
                          : "bg-stone-100 text-stone-700"
                  }`}
                >
                  #{entry.rank}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-bold text-base ${
                      isCurrent ? "text-emerald-900" : "text-stone-900"
                    }`}
                  >
                    {entry.name}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isCurrent ? "text-emerald-700" : "text-stone-600"
                    }`}
                  >
                    {entry.level.name} · {entry.xp} XP
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-stone-900">
                      {entry.lessonsCompleted}
                    </div>
                    <p className="text-xs text-stone-500">bài</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-stone-900">
                      {entry.avgQuizScore.toFixed(0)}
                    </div>
                    <p className="text-xs text-stone-500">điểm</p>
                  </div>
                </div>

                {isCurrent && (
                  <div className="flex-shrink-0 text-emerald-600 font-extrabold text-lg">
                    ✓
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
