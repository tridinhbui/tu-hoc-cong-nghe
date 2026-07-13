"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLeaderboardByMetric, getMyLeaderboardRank, type LeaderboardMetric, type LeaderboardRow } from "@/lib/supabase-user";

// Small circular avatar with an initials fallback for learners who haven't
// uploaded a profile photo - keeps the row layout stable either way instead
// of collapsing the space where the image would've been.
function LeaderboardAvatar({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={24}
        height={24}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-stone-200 dark:border-stone-700"
      />
    );
  }
  return (
    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[10px] font-extrabold">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

interface LeaderboardProps {
  userId?: string;
}

const TABS: { metric: LeaderboardMetric; label: string; format: (v: number) => string }[] = [
  { metric: "xp", label: "XP", format: (v) => `${v} XP` },
  { metric: "lessons", label: "Số bài", format: (v) => `${v} bài` },
  { metric: "avg_score", label: "Điểm TB", format: (v) => `${Math.round(v)}%` },
  { metric: "streak", label: "Chuỗi ngày", format: (v) => `${v} ngày` },
];

export default function Leaderboard({ userId }: LeaderboardProps) {
  const [metric, setMetric] = useState<LeaderboardMetric>("xp");
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const activeTab = TABS.find((t) => t.metric === metric)!;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [top, mine] = await Promise.all([
          getLeaderboardByMetric(metric, 10),
          userId ? getMyLeaderboardRank(metric, userId) : Promise.resolve(null),
        ]);
        if (cancelled) return;
        setEntries(top);
        setMyRank(mine);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
        if (!cancelled) {
          setEntries([]);
          setMyRank(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [metric, userId]);

  // Whether the current user is already visible in the top-10 list, so the
  // "Hạng của bạn" summary only appears when it'd actually add information.
  // Checked by user_id, not by comparing rank numbers - ties mean multiple
  // people can share the same competition rank, so matching on rank alone
  // would highlight (or hide) the wrong person whenever there's a tie.
  const myRankInTop10 = userId !== undefined && entries.some((e) => e.user_id === userId);

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 h-fit lg:sticky lg:top-24">
      <div className="mb-3">
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Top Người Học
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-stone-400 dark:text-stone-500">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
          </span>
          Số liệu thật, cập nhật trực tiếp
        </div>
      </div>

      <div className="flex gap-1 mb-4 bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
        {TABS.map((tab) => (
          <button
            key={tab.metric}
            onClick={() => {
              if (tab.metric === metric) return;
              setLoading(true);
              setMetric(tab.metric);
            }}
            className={`flex-1 text-[11px] font-bold py-1.5 rounded-md transition-all cursor-pointer ${
              metric === tab.metric
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-xs text-stone-400 dark:text-stone-500">Đang tải...</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Chưa có đủ dữ liệu xếp hạng. Hoàn thành bài học để lên bảng đầu tiên!
        </p>
      ) : (
        <>
          <div className="space-y-1.5">
            {entries.map((entry, idx) => {
              const rank = idx + 1;
              const isCurrent = entry.user_id === userId;
              const href = isCurrent ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900"
                      : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-extrabold ${
                      rank === 1
                        ? "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-300"
                        : rank === 2
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                          : rank === 3
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    {rank}
                  </div>

                  <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} />

                  <div className="flex-1 min-w-0">
                    <div className={`font-bold truncate ${isCurrent ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                      {entry.name}
                    </div>
                    <div className={`text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                      {activeTab.format(entry.value)}
                    </div>
                  </div>

                  {isCurrent && <div className="text-emerald-600 font-bold text-sm">✓</div>}
                </Link>
              );
            })}
          </div>

          {/* Own rank, shown separately whenever it isn't already visible
              in the top 10 above - otherwise there'd be no way to know
              where you stand once you fall outside it. */}
          {myRank !== null && !myRankInTop10 && (
            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-stone-50 dark:bg-stone-800/50 border border-dashed border-stone-300 dark:border-stone-700">
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-extrabold bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px]">
                  #{myRank.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-stone-900 dark:text-stone-100">Hạng của bạn</div>
                  <div className="text-stone-500 dark:text-stone-400">{activeTab.format(myRank.value)}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
