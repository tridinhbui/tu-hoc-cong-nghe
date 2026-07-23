"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, BookOpen, Sparkles } from "lucide-react";
import { getLeaderboardByMetric, getMyLeaderboardRank, type LeaderboardMetric, type LeaderboardRow } from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";

function LeaderboardAvatar({ name, avatarUrl, size = 24 }: { name: string; avatarUrl: string | null; size?: number }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name.trim().split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div
      className="flex items-center justify-center rounded-full bg-stone-200 font-extrabold text-stone-600 shadow-inner"
      style={{ width: size, height: size, fontSize: `${Math.max(10, size * 0.3)}px` }}
    >
      {initials}
    </div>
  );
}

const TABS: { metric: LeaderboardMetric | "game"; label: string; format: (v: number) => string }[] = [
  { metric: "xp", label: "XP", format: (v) => `${v} XP` },
  { metric: "lessons", label: "Số bài", format: (v) => `${v} bài` },
  { metric: "avg_score", label: "Điểm TB", format: (v) => `${Math.round(v)}%` },
  { metric: "streak", label: "Chuỗi ngày", format: (v) => `${v} ngày` },
  { metric: "game", label: "Game thủ", format: (v) => `${v} XP` },
];

const LEADERBOARD_TITLES: Record<LeaderboardMetric | "game", Record<number, string>> = {
  xp: { 1: "Bậc thầy tài chính", 2: "Chuyên gia đầu tư", 3: "Nhà đầu tư tài năng", 4: "Kiện tướng tích lũy", 5: "Thợ săn XP" },
  lessons: { 1: "Vua sách giáo khoa", 2: "Thủ kho tri thức", 3: "Máy học không ngừng", 4: "Mọt sách chính hiệu", 5: "Người đọc thông thái" },
  avg_score: { 1: "Thần chính xác", 2: "Đại sư câu hỏi", 3: "Quiz master", 4: "Chiến thần IQ", 5: "Kẻ hủy diệt đáp án" },
  streak: { 1: "Huyền thoại streak", 2: "Lửa không tắt", 3: "Kiên trì vàng", 4: "Ngọn lửa đam mê", 5: "Học đều mỗi ngày" },
  badges: { 1: "Bộ sưu tập huy hiệu", 2: "Thợ săn huy hiệu", 3: "Người mở khóa", 4: "Nhà sưu tầm vĩ đại", 5: "Danh hiệu đầy mình" },
  game: { 1: "Huyền thoại Mini Game", 2: "Đại kiện tướng Tài chính", 3: "Cao thủ toàn năng", 4: "Thần bài tài chính", 5: "Kỷ lục gia trò chơi" },
};

const PODIUM_ORDER = [3, 1, 0, 2, 4];

function getLeaderboardTitle(metric: LeaderboardMetric | "game", rank: number): string | null {
  return LEADERBOARD_TITLES[metric]?.[rank] ?? null;
}

function getPodiumHeight(rank: number) {
  if (rank === 1) return "h-32";
  if (rank === 2) return "h-24";
  if (rank === 3) return "h-20";
  if (rank === 4) return "h-16";
  return "h-14";
}

function getPodiumTone(rank: number) {
  if (rank === 1) {
    return {
      card: "border-amber-300 bg-gradient-to-b from-amber-50 via-white to-amber-50/70",
      pedestal: "from-amber-500/30 via-yellow-400/20 to-transparent border-amber-300/70",
      chip: "bg-amber-500 text-white",
      value: "text-amber-700",
    };
  }
  if (rank === 2) {
    return {
      card: "border-slate-300 bg-gradient-to-b from-slate-50 via-white to-slate-50/70",
      pedestal: "from-slate-400/30 via-slate-300/15 to-transparent border-slate-300/70",
      chip: "bg-slate-500 text-white",
      value: "text-slate-700",
    };
  }
  if (rank === 3) {
    return {
      card: "border-orange-300 bg-gradient-to-b from-orange-50 via-white to-orange-50/70",
      pedestal: "from-orange-500/25 via-amber-400/15 to-transparent border-orange-300/70",
      chip: "bg-orange-500 text-white",
      value: "text-orange-700",
    };
  }
  if (rank === 4) {
    return {
      card: "border-violet-200 bg-gradient-to-b from-violet-50 via-white to-violet-50/70",
      pedestal: "from-violet-400/20 via-violet-300/10 to-transparent border-violet-200/70",
      chip: "bg-violet-500 text-white",
      value: "text-violet-700",
    };
  }
  return {
    card: "border-emerald-200 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/70",
    pedestal: "from-emerald-400/20 via-emerald-300/10 to-transparent border-emerald-200/70",
    chip: "bg-emerald-500 text-white",
    value: "text-emerald-700",
  };
}

export default function Leaderboard({ userId, compact = false }: { userId?: string; compact?: boolean }) {
  const [metric, setMetric] = useState<LeaderboardMetric | "game">("xp");
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
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
          top = gameRows.slice(0, 20).map((row) => ({
            user_id: row.user_id,
            value: row.totalXp,
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = gameRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: gameRows[myIndex].totalXp };
          }
        } else {
          const [topRows, mineRank] = await Promise.all([
            getLeaderboardByMetric(metric as LeaderboardMetric, 20),
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

  const podiumEntries = useMemo(() => entries.slice(0, 5), [entries]);
  const remainingEntries = useMemo(() => entries.slice(5), [entries]);

  if (compact) {
    return (
      <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
              <Trophy className="h-3.5 w-3.5" />
              BXH
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-stone-900">Bảng xếp hạng</h2>
            <p className="mt-1 text-sm leading-6 text-stone-500">Top cộng đồng nằm cạnh thống kê cá nhân để xem nhanh trong cùng một màn.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <Sparkles className="h-4 w-4" />
            {activeTab.label}
          </div>
        </div>

        <div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl bg-stone-100 p-1 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.metric}
              onClick={() => {
                if (tab.metric !== metric) setMetric(tab.metric);
              }}
              className={`shrink-0 rounded-2xl px-3 py-2 text-xs font-bold transition ${
                metric === tab.metric ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-5 text-sm text-stone-500">Đang tải BXH...</p>
        ) : entries.length === 0 ? (
          <p className="mt-5 text-sm text-stone-500">Chưa có đủ dữ liệu xếp hạng.</p>
        ) : (
          <div className={`mt-5 space-y-3 transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
            {entries.slice(0, 8).map((entry, idx) => {
              const rank = idx + 1;
              const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
              const isCurrent = entry.user_id === userId;
              const tone = rank === 1
                ? "border-amber-200 bg-amber-50/70"
                : rank === 2
                  ? "border-slate-200 bg-slate-50/70"
                  : rank === 3
                    ? "border-orange-200 bg-orange-50/70"
                    : isCurrent
                      ? "border-emerald-200 bg-emerald-50/70"
                      : "border-stone-200 bg-white";

              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition hover:border-stone-300 ${tone}`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black ${
                    rank === 1 ? "bg-amber-500 text-white" :
                    rank === 2 ? "bg-slate-500 text-white" :
                    rank === 3 ? "bg-orange-500 text-white" :
                    "bg-stone-100 text-stone-700"
                  }`}>
                    #{rank}
                  </div>
                  <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} size={38} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-stone-900">{entry.name}</p>
                    <p className="truncate text-xs text-stone-500">{getLeaderboardTitle(metric, rank) ?? "Người học nổi bật"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-stone-900">{activeTab.format(entry.value)}</p>
                  </div>
                </Link>
              );
            })}

            {myRank && (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-stone-900">Hạng của bạn</p>
                    <p className="text-xs text-stone-500">Theo chỉ số {activeTab.label.toLowerCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-emerald-700">#{myRank.rank}</p>
                    <p className="text-xs font-bold text-stone-500">{activeTab.format(myRank.value)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
            <Trophy className="h-3.5 w-3.5" />
            Vinh Danh BXH
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Top 5 nổi bật</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
            Trả lại khu vực bục vinh danh, làm lớn hơn để 5 vị trí dẫn đầu thực sự nổi bật thay vì lẫn vào list.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700">
          <Sparkles className="h-4 w-4" />
          {activeTab.label}
        </div>
      </div>

      <div className="mt-5 flex gap-1 rounded-2xl bg-stone-100 p-1 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.metric}
            onClick={() => {
              if (tab.metric !== metric) setMetric(tab.metric);
            }}
            className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-bold transition ${
              metric === tab.metric ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-stone-500">Đang tải BXH...</p>
      ) : entries.length === 0 ? (
        <p className="mt-6 text-sm text-stone-500">Chưa có đủ dữ liệu xếp hạng.</p>
      ) : (
        <div className={`transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          <div className="mt-8 overflow-x-auto pb-2">
            <div className="mx-auto flex min-w-[860px] items-end justify-center gap-3 px-2">
              {PODIUM_ORDER.map((podiumIndex) => {
                const entry = podiumEntries[podiumIndex];
                if (!entry) return null;
                const rank = podiumIndex + 1;
                const tone = getPodiumTone(rank);
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isChampion = rank === 1;

                return (
                  <Link key={entry.user_id} href={href} className="group flex min-w-[150px] flex-1 flex-col items-center">
                    <div className={`w-full rounded-[26px] border p-4 text-center shadow-sm transition-transform duration-200 group-hover:-translate-y-1 ${tone.card} ${isChampion ? "mb-0 scale-[1.04]" : "mb-1"}`}>
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
                        <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} size={isChampion ? 56 : 52} />
                      </div>
                      <div className={`mx-auto mb-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-black ${tone.chip}`}>
                        #{rank}
                      </div>
                      <p className="truncate text-sm font-black text-stone-900">{entry.name}</p>
                      <p className={`mt-1 text-sm font-black ${tone.value}`}>{activeTab.format(entry.value)}</p>
                      {getLeaderboardTitle(metric, rank) && (
                        <p className="mt-2 line-clamp-2 text-[11px] font-bold leading-5 text-stone-500">
                          {getLeaderboardTitle(metric, rank)}
                        </p>
                      )}
                    </div>
                    <div className={`mt-3 w-full rounded-t-[24px] border-x border-t bg-gradient-to-t ${tone.pedestal} ${getPodiumHeight(rank)}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-[26px] border border-stone-200 bg-stone-50/70 p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-stone-500" />
              <h3 className="text-sm font-black uppercase tracking-[0.16em] text-stone-600">Các vị trí tiếp theo</h3>
            </div>

            <div className="space-y-2">
              {remainingEntries.map((entry, idx) => {
                const rank = idx + 6;
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isCurrent = entry.user_id === userId;
                return (
                  <Link
                    key={entry.user_id}
                    href={href}
                    className={`flex items-center justify-between rounded-2xl border px-3.5 py-3 text-sm transition ${
                      isCurrent
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-white bg-white hover:border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 font-black text-stone-600">#{rank}</div>
                      <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} size={30} />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-stone-900">{entry.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${isCurrent ? "text-emerald-700" : "text-stone-700"}`}>{activeTab.format(entry.value)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {myRank && (
              <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-stone-900">Hạng của bạn</p>
                    <p className="text-xs text-stone-500">Theo chỉ số {activeTab.label.toLowerCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-emerald-700">#{myRank.rank}</p>
                    <p className="text-xs font-bold text-stone-500">{activeTab.format(myRank.value)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
