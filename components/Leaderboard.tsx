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
  1: "🥇",
  2: "🥈",
  3: "🥉",
  4: "🎖️",
  5: "🏅",
  6: "⭐",
  7: "🌟",
  8: "✨",
  9: "⚡",
  10: "💪",
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

              // Premium styling for top 3 and current user
              let cardBgClass = "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800";
              let shadowClass = "hover:shadow-[0_12px_24px_-15px_rgba(16,185,129,0.3)]";
              
              if (isCurrent) {
                cardBgClass = "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-250 dark:border-emerald-900 shadow-[0_10px_24px_-18px_rgba(16,185,129,0.5)]";
              } else if (rank === 1) {
                cardBgClass = "bg-gradient-to-r from-amber-500/[0.05] via-amber-500/[0.08] to-transparent dark:from-amber-950/20 dark:via-amber-950/10 dark:to-transparent border-amber-300 dark:border-amber-700/80 hover:border-amber-400 dark:hover:border-amber-600";
                shadowClass = "shadow-[0_4px_16px_-12px_rgba(251,191,36,0.2)] hover:shadow-[0_10px_24px_-10px_rgba(251,191,36,0.35)] scale-[1.015]";
              } else if (rank === 2) {
                cardBgClass = "bg-gradient-to-r from-slate-400/[0.05] via-slate-400/[0.08] to-transparent dark:from-slate-800/20 dark:via-slate-800/10 dark:to-transparent border-slate-300/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600";
                shadowClass = "shadow-[0_4px_16px_-12px_rgba(148,163,184,0.15)] hover:shadow-[0_10px_24px_-10px_rgba(148,163,184,0.25)] scale-[1.008]";
              } else if (rank === 3) {
                cardBgClass = "bg-gradient-to-r from-orange-400/[0.05] via-orange-400/[0.07] to-transparent dark:from-orange-950/20 dark:via-orange-950/10 dark:to-transparent border-orange-250/80 dark:border-orange-900/80 hover:border-orange-350 dark:hover:border-orange-850";
                shadowClass = "shadow-[0_4px_16px_-12px_rgba(249,115,22,0.15)] hover:shadow-[0_10px_24px_-10px_rgba(249,115,22,0.25)] scale-[1.002]";
              } else {
                cardBgClass = "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/30 dark:hover:bg-stone-850/30";
              }

              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`group relative flex items-center justify-between overflow-hidden px-3.5 py-2.5 rounded-xl text-xs transition-all duration-300 active:scale-[0.99] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${cardBgClass} ${shadowClass}`}
                >
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    rank === 1
                      ? "bg-[linear-gradient(135deg,rgba(251,191,36,0.1),transparent_40%)]"
                      : rank === 2
                        ? "bg-[linear-gradient(135deg,rgba(148,163,184,0.1),transparent_40%)]"
                        : rank === 3
                          ? "bg-[linear-gradient(135deg,rgba(249,115,22,0.08),transparent_40%)]"
                          : "bg-[linear-gradient(135deg,rgba(16,185,129,0.06),transparent_40%)]"
                  }`} />

                  {/* Left block: Rank + Avatar + Name details */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 font-extrabold text-[10px] transition-transform duration-300 group-hover:scale-110 shadow-inner border border-stone-200/10 ${
                        rank === 1
                          ? "bg-gradient-to-br from-amber-400 to-yellow-300 dark:from-amber-500 dark:to-yellow-500 text-amber-950 dark:text-white"
                          : rank === 2
                            ? "bg-gradient-to-br from-slate-300 to-slate-100 dark:from-slate-600 dark:to-slate-500 text-slate-900 dark:text-white"
                            : rank === 3
                              ? "bg-gradient-to-br from-amber-300 to-orange-200 dark:from-orange-600 dark:to-orange-500 text-amber-900 dark:text-white"
                              : rank === 4
                                ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                                : rank === 5
                                  ? "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300"
                                  : rank === 6
                                    ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300"
                                    : "bg-stone-50 dark:bg-stone-850 text-stone-650 dark:text-stone-350"
                      }`}
                    >
                      <span className="text-xs">{RANK_MEDALS[rank] || rank}</span>
                    </div>

                    <RankAvatarFrame rank={rank}>
                      <div className="relative z-10">
                        <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} />
                      </div>
                    </RankAvatarFrame>

                    <div className="relative z-10 min-w-0">
                      <div className={`font-bold truncate text-xs ${isCurrent ? "text-emerald-950 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"} ${rank <= 3 ? "text-[12px] sm:text-xs" : ""}`}>
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
                      <span className={`font-extrabold text-[11px] sm:text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : rank <= 3 ? "text-stone-850 dark:text-stone-100 font-black" : "text-stone-700 dark:text-stone-200"}`}>
                        {activeTab.format(entry.value)}
                      </span>
                    </div>
                    <div className={`text-stone-300 dark:text-stone-600 transition-transform duration-300 group-hover:translate-x-0.5 ${isCurrent ? "text-emerald-600 font-bold" : ""}`}>
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
