"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, BookOpen, Target, Flame, Gamepad2 } from "lucide-react";
import { getLeaderboardByMetric, getMyLeaderboardRank, type LeaderboardMetric, type LeaderboardRow } from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";

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

function RankAvatarFrame({
  rank,
  children,
}: {
  rank: number;
  children: ReactNode;
}) {
  const isTopThree = rank <= 3;
  const haloClass =
    rank === 1
      ? "from-amber-300/70 via-yellow-200/40 to-amber-400/20"
      : rank === 2
        ? "from-slate-300/70 via-slate-200/40 to-slate-400/20"
        : "from-amber-200/70 via-orange-100/35 to-amber-300/20";

  return (
    <div className="relative">
      {isTopThree && (
        <span
          className={`pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r ${haloClass} blur-[1px] opacity-80 animate-pulse`}
          aria-hidden="true"
        />
      )}
      {isTopThree && (
        <span
          className="pointer-events-none absolute -inset-1 rounded-full border border-white/70 dark:border-stone-900/80 opacity-60"
          aria-hidden="true"
        />
      )}
      {isTopThree && (
        <span
          className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-75 animate-[shimmer_1.8s_ease-in-out_infinite]"
          aria-hidden="true"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

interface LeaderboardProps {
  userId?: string;
}

const TABS: { metric: LeaderboardMetric | "game"; label: string; format: (v: number) => string }[] = [
  { metric: "xp", label: "XP", format: (v) => `${v} XP` },
  { metric: "lessons", label: "Số bài", format: (v) => `${v} bài` },
  { metric: "avg_score", label: "Điểm TB", format: (v) => `${Math.round(v)}%` },
  { metric: "streak", label: "Chuỗi ngày", format: (v) => `${v} ngày` },
  { metric: "game", label: "Game thủ", format: (v) => `${v} XP` },
];

// Fun titles for top 3 per leaderboard metric
const LEADERBOARD_TITLES: Record<LeaderboardMetric | "game", Record<number, string>> = {
  xp: {
    1: "Bậc thầy tài chính",
    2: "Chuyên gia đầu tư",
    3: "Nhà đầu tư tài năng",
  },
  lessons: {
    1: "Vua sách giáo khoa",
    2: "Thủ kho tri thức",
    3: "Máy học không ngừng",
  },
  avg_score: {
    1: "Thần chính xác",
    2: "Đại sư câu hỏi",
    3: "Quiz master",
  },
  streak: {
    1: "Huyền thoại streak",
    2: "Lửa không tắt",
    3: "Kiên trì vàng",
  },
  badges: {
    1: "Bộ sưu tập huy hiệu",
    2: "Thợ săn huy hiệu",
    3: "Người mở khóa",
  },
  game: {
    1: "Huyền thoại Mini Game",
    2: "Đại kiện tướng Tài chính",
    3: "Cao thủ toàn năng",
  },
};

const METRIC_TITLE_ICONS: Record<LeaderboardMetric | "game", typeof Trophy | typeof Gamepad2> = {
  xp: Trophy,
  lessons: BookOpen,
  avg_score: Target,
  streak: Flame,
  badges: Trophy,
  game: Gamepad2,
};

const RANK_MEDALS: Record<number, string> = {
  1: "🏆",
  2: "🥈",
  3: "🥉",
};

function getLeaderboardTitle(metric: LeaderboardMetric | "game", rank: number): string | null {
  const title = LEADERBOARD_TITLES[metric]?.[rank];
  if (!title) return null;
  const medal = RANK_MEDALS[rank] ?? "";
  return medal ? `${medal} ${title}` : title;
}

export default function Leaderboard({ userId }: LeaderboardProps) {
  const [metric, setMetric] = useState<LeaderboardMetric | "game">("xp");
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
  // `loading` is only ever true before the very first successful fetch -
  // `switching` covers every later tab change. Splitting them keeps the
  // current list mounted (just dimmed) while a new metric loads, instead of
  // unmounting it back to "Đang tải..." and remounting once data arrives,
  // which is what made tapping between tabs flicker the whole table even
  // though each fetch is fast.
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  const activeTab = TABS.find((t) => t.metric === metric)!;

  useEffect(() => {
    let cancelled = false;
    setSwitching(true);
    (async () => {
      try {
        let top: LeaderboardRow[] = [];
        let mine: { rank: number; value: number } | null = null;

        if (metric === "game") {
          const gameRows = await getCombinedGameLeaderboard(50);
          top = gameRows.slice(0, 10).map((row) => ({
            user_id: row.user_id,
            value: row.totalXp,
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = gameRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) {
              mine = { rank: myIndex + 1, value: gameRows[myIndex].totalXp };
            }
          }
        } else {
          const [topRows, mineRank] = await Promise.all([
            getLeaderboardByMetric(metric as LeaderboardMetric, 10),
            userId ? getMyLeaderboardRank(metric as LeaderboardMetric, userId) : Promise.resolve(null),
          ]);
          top = topRows;
          mine = mineRank;
        }

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
        if (!cancelled) {
          setLoading(false);
          setSwitching(false);
        }
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
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-3 sm:p-4 lg:p-5 h-fit lg:sticky lg:top-24">
      <div className="mb-2 sm:mb-3">
        <p className="text-[11px] sm:text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Top Người Học
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-[9px] sm:text-[10px] font-bold text-stone-400 dark:text-stone-500">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">Số liệu thật, cập nhật trực tiếp</span>
          <span className="sm:hidden">Cập nhật trực tiếp</span>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3 bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 overflow-x-auto scrollbar-none whitespace-nowrap">
        {TABS.map((tab) => (
          <button
            key={tab.metric}
            onClick={() => {
              if (tab.metric === metric) return;
              setMetric(tab.metric);
            }}
            className={`flex-1 text-[9px] sm:text-[10px] font-extrabold py-1 px-1 sm:px-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              metric === tab.metric
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
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
        <div className={`transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          <div className="space-y-1.5">
            {entries.map((entry, idx) => {
              const rank = idx + 1;
              const isCurrent = entry.user_id === userId;
              const href = isCurrent ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
              const topTitle = rank <= 3 ? getLeaderboardTitle(metric, rank) : null;
              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`group relative flex items-center justify-between overflow-hidden px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 shadow-[0_10px_24px_-18px_rgba(16,185,129,0.5)]"
                      : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/20 hover:shadow-[0_14px_30px_-20px_rgba(16,185,129,0.45)]"
                  }`}
                >
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    rank === 1
                      ? "bg-[linear-gradient(135deg,rgba(251,191,36,0.08),transparent_40%)]"
                      : rank === 2
                        ? "bg-[linear-gradient(135deg,rgba(148,163,184,0.08),transparent_40%)]"
                        : rank === 3
                          ? "bg-[linear-gradient(135deg,rgba(251,191,36,0.05),transparent_40%)]"
                          : "bg-[linear-gradient(135deg,rgba(16,185,129,0.06),transparent_40%)]"
                  }`} />

                  {/* Left block: Rank + Avatar + Name details */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`relative z-10 w-5.5 h-5.5 rounded flex items-center justify-center flex-shrink-0 font-extrabold text-[10px] transition-transform duration-200 group-hover:scale-105 ${
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

                    <RankAvatarFrame rank={rank}>
                      <div className="relative z-10">
                        <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} />
                      </div>
                    </RankAvatarFrame>

                    <div className="relative z-10 min-w-0">
                      <div className={`font-bold truncate text-xs ${isCurrent ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                        {entry.name}
                      </div>
                      {topTitle && (
                        <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 truncate max-w-[135px]">
                          {topTitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right block: Value + Arrow */}
                  <div className="relative z-10 flex items-center gap-2 shrink-0 ml-2">
                    <div className="text-right">
                      <span className={`font-extrabold text-[11px] sm:text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-700 dark:text-stone-200"}`}>
                        {activeTab.format(entry.value)}
                      </span>
                    </div>
                    <div className={`text-stone-300 dark:text-stone-600 transition-transform duration-200 group-hover:translate-x-0.5 ${isCurrent ? "text-emerald-600 font-bold" : ""}`}>
                      {isCurrent ? "✓" : "→"}
                    </div>
                  </div>
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
        </div>
      )}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
