"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, BookOpen, Target, Flame, Gamepad2 } from "lucide-react";
import { getLeaderboardByMetric, getMyLeaderboardRank, type LeaderboardMetric, type LeaderboardRow } from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";

// Check if avatar url is a valid image link
function isValidAvatar(url: string | null | undefined): boolean {
  return !!(url && url !== "null" && url.trim() !== "" && (url.startsWith("http") || url.startsWith("/") || url.startsWith("blob:")));
}

// Small circular avatar with an initials fallback for learners who haven't
// uploaded a profile photo - keeps the row layout stable either way instead
// of collapsing the space where the image would've been.
function LeaderboardAvatar({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl!}
        alt={name}
        width={24}
        height={24}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-stone-200 dark:border-stone-700"
      />
    );
  }
  
  const initials = name.trim().split(" ").map(n => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[9px] font-extrabold shadow-inner">
      {initials}
    </div>
  );
}

// Larger avatar for top 3 podium columns with robust initials fallback
function PodiumAvatar({ name, avatarUrl, size }: { name: string; avatarUrl: string | null; size: number }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl!}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full rounded-full object-cover"
      />
    );
  }
  
  const initials = name.trim().split(" ").map(n => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-850 dark:to-stone-800 text-stone-500 dark:text-stone-400 font-extrabold shadow-inner" style={{ fontSize: `${size * 0.32}px` }}>
      {initials}
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
          {/* Top 3 Podium */}
          {entries.length > 0 && (
            <div className="flex items-end justify-center gap-2 pt-6 pb-3 mb-4 border-b border-stone-150 dark:border-stone-800/80 bg-gradient-to-b from-stone-50/50 to-transparent dark:from-stone-900/10 rounded-2xl px-1">
              
              {/* Rank 2 (Silver) */}
              {entries[1] && (
                <Link
                  href={entries[1].user_id === userId ? "/profile" : `/nguoi-hoc/${entries[1].user_id}`}
                  className="flex flex-col items-center flex-1 min-w-0 group cursor-pointer pb-1"
                >
                  <div className="relative mb-2">
                    <div className="w-12 h-12 rounded-full border-[2.5px] border-slate-300 p-0.5 bg-white dark:bg-stone-900 relative shadow-md shadow-slate-400/10 group-hover:scale-105 transition-all duration-300">
                      <PodiumAvatar name={entries[1].name} avatarUrl={entries[1].avatarUrl} size={40} />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900 text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-white dark:border-stone-900">
                      2
                    </span>
                  </div>
                  <div className="text-center w-full max-w-[85px] px-0.5">
                    <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate group-hover:text-stone-950 dark:group-hover:text-white transition-colors">{entries[1].name}</p>
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 mt-0.5">{activeTab.format(entries[1].value)}</p>
                    {getLeaderboardTitle(metric, 2) && (
                      <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 truncate mt-0.5">{getLeaderboardTitle(metric, 2)?.replace("🥈 ", "")}</p>
                    )}
                  </div>
                  <div className="w-full h-11 mt-2 rounded-t-lg bg-gradient-to-t from-slate-200/50 via-slate-100/30 to-slate-50/10 dark:from-slate-800/40 dark:via-slate-800/20 dark:to-transparent border-t border-x border-slate-200 dark:border-slate-800/60" />
                </Link>
              )}

              {/* Rank 1 (Gold) */}
              {entries[0] && (
                <Link
                  href={entries[0].user_id === userId ? "/profile" : `/nguoi-hoc/${entries[0].user_id}`}
                  className="flex flex-col items-center flex-[1.2] min-w-0 group cursor-pointer z-10"
                >
                  <div className="relative mb-2">
                    {/* Crown Icon */}
                    <svg className="w-5 h-5 text-amber-400 absolute -top-4.5 left-1/2 -translate-x-1/2 drop-shadow-[0_1.5px_3px_rgba(245,158,11,0.5)] animate-[bounce_2.5s_infinite]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16L3 5l5 5 4-7 4 7 5-5-2 11H5z" />
                    </svg>
                    
                    {/* Glowing ring */}
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/40 to-yellow-350/40 blur-[2px] opacity-75 group-hover:scale-105 transition-all duration-300" />
                    
                    <div className="w-15 h-15 rounded-full border-[3px] border-amber-400 p-0.5 bg-white dark:bg-stone-900 relative shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-all duration-300">
                      <PodiumAvatar name={entries[0].name} avatarUrl={entries[0].avatarUrl} size={52} />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow border border-white dark:border-stone-900">
                      1
                    </span>
                  </div>
                  <div className="text-center w-full max-w-[100px] px-0.5">
                    <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-450 transition-colors">{entries[0].name}</p>
                    <p className="text-[11px] font-black text-amber-600 dark:text-amber-400 mt-0.5">{activeTab.format(entries[0].value)}</p>
                    {getLeaderboardTitle(metric, 1) && (
                      <p className="text-[8px] font-bold text-amber-500 dark:text-amber-500 truncate mt-0.5">{getLeaderboardTitle(metric, 1)?.replace("🥇 ", "")}</p>
                    )}
                  </div>
                  <div className="w-full h-15 mt-2 rounded-t-xl bg-gradient-to-t from-amber-550/20 via-amber-400/10 to-amber-200/[0.02] dark:from-amber-500/10 dark:via-amber-500/5 dark:to-transparent border-t border-x border-amber-400/30 dark:border-amber-550/20 shadow-[0_-5px_15px_-8px_rgba(245,158,11,0.2)]" />
                </Link>
              )}

              {/* Rank 3 (Bronze) */}
              {entries[2] && (
                <Link
                  href={entries[2].user_id === userId ? "/profile" : `/nguoi-hoc/${entries[2].user_id}`}
                  className="flex flex-col items-center flex-1 min-w-0 group cursor-pointer pb-1"
                >
                  <div className="relative mb-2">
                    <div className="w-11 h-11 rounded-full border-[2px] border-amber-600/80 p-0.5 bg-white dark:bg-stone-900 relative shadow-sm shadow-orange-500/5 group-hover:scale-105 transition-all duration-300">
                      <PodiumAvatar name={entries[2].name} avatarUrl={entries[2].avatarUrl} size={36} />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-600 to-amber-700 text-white text-[9px] font-black w-4.2 h-4.2 rounded-full flex items-center justify-center shadow-sm border border-white dark:border-stone-900">
                      3
                    </span>
                  </div>
                  <div className="text-center w-full max-w-[85px] px-0.5">
                    <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate group-hover:text-stone-950 dark:group-hover:text-white transition-colors">{entries[2].name}</p>
                    <p className="text-[10px] font-black text-amber-750 dark:text-orange-400 mt-0.5">{activeTab.format(entries[2].value)}</p>
                    {getLeaderboardTitle(metric, 3) && (
                      <p className="text-[8px] font-bold text-amber-650 dark:text-orange-500/80 truncate mt-0.5">{getLeaderboardTitle(metric, 3)?.replace("🥉 ", "")}</p>
                    )}
                  </div>
                  <div className="w-full h-9 mt-2 rounded-t-lg bg-gradient-to-t from-amber-700/15 via-amber-600/5 to-transparent dark:from-orange-950/20 dark:via-orange-950/5 dark:to-transparent border-t border-x border-amber-650/20 dark:border-orange-950/30" />
                </Link>
              )}

            </div>
          )}

          {/* List of other ranks (4 - 10) */}
          <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-0.5 scrollbar-thin">
            {entries.slice(3).map((entry, idx) => {
              const rank = idx + 4;
              const isCurrent = entry.user_id === userId;
              const href = isCurrent ? "/profile" : `/nguoi-hoc/${entry.user_id}`;

              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`group relative flex items-center justify-between overflow-hidden px-3.5 py-2.5 rounded-xl text-xs transition-all duration-300 active:scale-[0.99] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    isCurrent
                      ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-250 dark:border-emerald-900 shadow-[0_4px_12px_-8px_rgba(16,185,129,0.3)]"
                      : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/30 dark:hover:bg-stone-850/30"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(16,185,129,0.04),transparent_40%)]" />

                  {/* Left block: Rank + Avatar + Name details */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`relative z-10 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 font-extrabold text-[10px] transition-transform duration-300 group-hover:scale-115 border ${
                        rank === 4
                          ? "bg-purple-50 dark:bg-purple-950/60 border-purple-100 dark:border-purple-900 text-purple-700 dark:text-purple-300"
                          : rank === 5
                            ? "bg-sky-50 dark:bg-sky-950/60 border-sky-100 dark:border-sky-900 text-sky-700 dark:text-sky-300"
                            : rank === 6
                              ? "bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900 text-teal-700 dark:text-teal-300"
                              : "bg-stone-50 dark:bg-stone-850 border-stone-150 dark:border-stone-800 text-stone-500 dark:text-stone-400"
                      }`}
                    >
                      <span className="text-[10px]">{rank}</span>
                    </div>

                    <div className="relative z-10">
                      <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} />
                    </div>

                    <div className="relative z-10 min-w-0">
                      <div className={`font-bold truncate text-xs ${isCurrent ? "text-emerald-950 dark:text-emerald-400 font-extrabold" : "text-stone-900 dark:text-stone-100"}`}>
                        {entry.name}
                      </div>
                    </div>
                  </div>

                  {/* Right block: Value + Arrow */}
                  <div className="relative z-10 flex items-center gap-2 shrink-0 ml-2">
                    <div className="text-right">
                      <span className={`font-extrabold text-[11px] sm:text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-700 dark:text-stone-200"}`}>
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

          {/* Own rank, shown separately at the bottom of all sub-leaderboards */}
          {myRank !== null && (
            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-stone-50 dark:bg-stone-850 border border-dashed border-stone-300 dark:border-stone-700 shadow-inner">
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
