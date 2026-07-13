"use client";

import { useEffect, useState, type ReactNode } from "react";
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
    <div className="h-fit rounded-[28px] border border-stone-200/90 dark:border-stone-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,250,251,0.94))] dark:bg-[linear-gradient(180deg,rgba(28,25,23,0.98),rgba(24,24,27,0.94))] p-5 shadow-[0_26px_60px_-42px_rgba(28,25,23,0.32)] lg:sticky lg:top-24">
      <div className="mb-4">
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Top Người Học
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-stone-400 dark:text-stone-500">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
          </span>
          Số liệu thật, cập nhật trực tiếp
        </div>
      </div>

      <div className="mb-4 flex gap-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-900/60 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.metric}
            onClick={() => {
              if (tab.metric === metric) return;
              setLoading(true);
              setMetric(tab.metric);
            }}
            className={`flex-1 rounded-xl py-2 text-[11px] font-bold transition-all cursor-pointer ${
              metric === tab.metric
                ? "bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-[0_10px_24px_-20px_rgba(28,25,23,0.45)]"
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
          <div className="space-y-2">
            {entries.map((entry, idx) => {
              const rank = idx + 1;
              const isCurrent = entry.user_id === userId;
              const href = isCurrent ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`group relative flex items-center gap-2.5 overflow-hidden rounded-2xl px-3.5 py-3 text-xs transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 shadow-[0_18px_34px_-24px_rgba(16,185,129,0.36)]"
                      : "bg-white/92 dark:bg-stone-900/92 border border-stone-200 dark:border-stone-800 hover:-translate-y-0.5 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-stone-900 hover:shadow-[0_18px_34px_-26px_rgba(28,25,23,0.2)]"
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

                  <div
                    className={`relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl font-extrabold transition-transform duration-200 group-hover:scale-105 ${
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

                  <div className="relative z-10 flex-1 min-w-0">
                    <div className={`font-bold truncate ${isCurrent ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                      {entry.name}
                    </div>
                    <div className={`text-xs ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                      {activeTab.format(entry.value)}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-2">
                    <span
                      className={`hidden sm:inline-flex whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-200 ${
                        isCurrent
                          ? "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : "border-stone-200 bg-white text-stone-500 opacity-85 group-hover:border-stone-300 group-hover:text-stone-700 group-hover:opacity-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400 dark:group-hover:border-stone-700 dark:group-hover:text-stone-300"
                      }`}
                    >
                      {isCurrent ? "Hồ sơ của bạn" : "Xem hồ sơ"}
                    </span>
                    {!isCurrent && (
                      <span className="inline-flex sm:hidden whitespace-nowrap rounded-full border border-stone-200 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500 shadow-sm dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
                        Chạm xem
                      </span>
                    )}
                    {isCurrent ? <div className="text-emerald-600 font-bold text-sm">✓</div> : <div className="text-stone-300 font-bold text-sm transition-transform duration-200 group-hover:translate-x-0.5">→</div>}
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
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-3 py-3 text-xs dark:border-stone-700 dark:bg-stone-800/50">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-stone-200 text-[10px] font-extrabold text-stone-700 dark:bg-stone-700 dark:text-stone-300">
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
