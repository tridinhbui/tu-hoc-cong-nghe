"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackFeatureClick } from "@/lib/feature-events";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import {
  getLeaderboardByMetric,
  getMyLeaderboardRank,
  getTrackLeaderboard,
  getMyTrackLeaderboardRank,
  getXpLeaderboardSince,
  getMyXpRankSince,
  getFriendsLeaderboard,
  getCompetencyLeaderboard,
  getMyCompetencyLeaderboardRank,
  type LeaderboardMetric,
  type LeaderboardRow,
} from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";
import { COMPETENCY_LEADERBOARD_TABS } from "@/lib/competency-leaderboard";
import type { CompetencyId } from "@/lib/career-competency";

// Same avatar/rank-frame visual pattern as the compact dashboard widget
// (components/Leaderboard.tsx) - kept as a separate component instead of
// editing that one, since it stays the 5-tab sidebar widget and regressing
// it isn't worth the reuse.
function LeaderboardAvatar({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={28}
        height={28}
        className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-stone-200 dark:border-stone-700"
      />
    );
  }
  return (
    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-extrabold">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function RankAvatarFrame({ rank, children }: { rank: number; children: ReactNode }) {
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
      <div className="relative">{children}</div>
    </div>
  );
}

const RANK_MEDALS: Record<number, string> = { 1: "🏆", 2: "🥈", 3: "🥉" };

type TabId = LeaderboardMetric | "track_personal" | "track_professional" | "weekly" | "monthly" | "friends" | "game" | CompetencyId;

interface TabDef {
  id: TabId;
  label: string;
  format: (v: number) => string;
}

// Labels are display text only - `id` is what drives tab selection, data
// loading (loadTab) and the lookup in COMPETENCY_LESSON_IDS_BY_TAB, so
// translating `label` here changes nothing structural.
function buildTabs(t: Dictionary): TabDef[] {
  return [
    { id: "xp", label: t.leaderboardSection.tabXp, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "lessons", label: t.leaderboardSection.tabLessons, format: (v) => format(t.leaderboardSection.valueLessons, { v }) },
    { id: "avg_score", label: t.leaderboardSection.tabAvgScore, format: (v) => format(t.leaderboardSection.valueAvgScore, { v: Math.round(v) }) },
    { id: "streak", label: t.leaderboardSection.tabStreak, format: (v) => format(t.leaderboardSection.valueStreakDays, { v }) },
    { id: "badges", label: t.leaderboardSection.tabBadges, format: (v) => format(t.leaderboardSection.valueBadges, { v }) },
    { id: "track_personal", label: t.leaderboardSection.tabTrackPersonal, format: (v) => format(t.leaderboardSection.valueLessons, { v }) },
    { id: "track_professional", label: t.leaderboardSection.tabTrackProfessional, format: (v) => format(t.leaderboardSection.valueLessons, { v }) },
    { id: "weekly", label: t.leaderboardSection.tabWeekly, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "monthly", label: t.leaderboardSection.tabMonthly, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "friends", label: t.leaderboardSection.tabFriends, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "game", label: t.leaderboardSection.tabGame, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    ...COMPETENCY_LEADERBOARD_TABS.map((c) => ({ id: c.id as TabId, label: c.label, format: (v: number) => format(t.leaderboardSection.valueLessons, { v }) })),
  ];
}

const COMPETENCY_LESSON_IDS_BY_TAB = new Map(COMPETENCY_LEADERBOARD_TABS.map((c) => [c.id as TabId, c.lessonIds]));

interface LeaderboardSectionProps {
  userId?: string;
}

async function loadTab(tabId: TabId, userId?: string): Promise<{ top: LeaderboardRow[]; mine: { rank: number; value: number } | null }> {
  if (tabId === "game") {
    const gameRows = await getCombinedGameLeaderboard(50);
    const top = gameRows.slice(0, 10).map((row) => ({ user_id: row.user_id, value: row.totalXp, name: row.name, avatarUrl: row.avatarUrl }));
    let mine: { rank: number; value: number } | null = null;
    if (userId) {
      const myIndex = gameRows.findIndex((r) => r.user_id === userId);
      if (myIndex !== -1) mine = { rank: myIndex + 1, value: gameRows[myIndex].totalXp };
    }
    return { top, mine };
  }

  if (tabId === "track_personal" || tabId === "track_professional") {
    const track = tabId === "track_personal" ? "personal" : "professional";
    const [top, mine] = await Promise.all([
      getTrackLeaderboard(track, 10),
      userId ? getMyTrackLeaderboardRank(track, userId) : Promise.resolve(null),
    ]);
    return { top, mine };
  }

  if (tabId === "weekly" || tabId === "monthly") {
    const since = new Date(Date.now() - (tabId === "weekly" ? 7 : 30) * 24 * 60 * 60 * 1000);
    const [top, mine] = await Promise.all([
      getXpLeaderboardSince(since, 10),
      userId ? getMyXpRankSince(since, userId) : Promise.resolve(null),
    ]);
    return { top, mine };
  }

  if (tabId === "friends") {
    const top = await getFriendsLeaderboard("xp");
    const mine = userId ? (() => {
      const idx = top.findIndex((r) => r.user_id === userId);
      return idx === -1 ? null : { rank: idx + 1, value: top[idx].value };
    })() : null;
    return { top: top.slice(0, 10), mine };
  }

  const competencyLessonIds = COMPETENCY_LESSON_IDS_BY_TAB.get(tabId);
  if (competencyLessonIds) {
    const [top, mine] = await Promise.all([
      getCompetencyLeaderboard(competencyLessonIds, 10),
      userId ? getMyCompetencyLeaderboardRank(competencyLessonIds, userId) : Promise.resolve(null),
    ]);
    return { top, mine };
  }

  // Every other TabId variant returns above; what's left is a plain
  // LeaderboardMetric ("xp" | "lessons" | "avg_score" | "streak" | "badges").
  const metric = tabId as LeaderboardMetric;
  const [top, mine] = await Promise.all([
    getLeaderboardByMetric(metric, 10),
    userId ? getMyLeaderboardRank(metric, userId) : Promise.resolve(null),
  ]);
  return { top, mine };
}

export default function LeaderboardSection({ userId }: LeaderboardSectionProps) {
  const { t } = useI18n();
  const TABS = useMemo(() => buildTabs(t), [t]);
  const [activeTab, setActiveTab] = useState<TabId>("xp");
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
  const [loading, setLoading] = useState(true);
  // `switching` (làm mờ bảng trong lúc đổi tab) suy ra từ tab nào đã tải
  // xong, không phải một cờ bật lên ở đầu effect. Cùng lý do như `loading` ở
  // các bảng xếp hạng khác: cờ riêng là setState đồng bộ trong effect, và nó
  // rời khỏi dữ liệu nên mọi nhánh thoát mới phải nhớ tắt.
  const [loadedTab, setLoadedTab] = useState<string | null>(null);
  const switching = loadedTab !== activeTab;
  const tabsRef = useRef<HTMLDivElement>(null);

  const tab = TABS.find((tabItem) => tabItem.id === activeTab)!;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { top, mine } = await loadTab(activeTab, userId);
        if (cancelled) return;
        setEntries(top);
        setMyRank(mine);
      } catch (error) {
        console.error("Error loading leaderboard section:", error);
        if (!cancelled) {
          setEntries([]);
          setMyRank(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoadedTab(activeTab);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeTab, userId]);

  const myRankInTop10 = userId !== undefined && entries.some((e) => e.user_id === userId);

  return (
    <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">{t.leaderboardSection.title}</p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{t.leaderboardSection.subtitle}</p>
      </div>

      <div className="relative mb-4">
        <button
          type="button"
          onClick={() => tabsRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
          aria-label={t.leaderboardSection.scrollLeft}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none px-7">
          {TABS.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => {
                setActiveTab(tabItem.id);
                trackFeatureClick("leaderboard_tab_click", { label: tabItem.id });
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer select-none ${
                activeTab === tabItem.id
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm"
                  : "bg-white/95 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800/80 hover:bg-stone-50 dark:hover:bg-stone-800"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => tabsRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
          aria-label={t.leaderboardSection.scrollRight}
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-stone-400 dark:text-stone-500">{t.leaderboardSection.loading}</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-stone-500 dark:text-stone-400">{t.leaderboardSection.noData}</p>
      ) : (
        <div className={`transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          <div className="space-y-1.5">
            {entries.map((entry, idx) => {
              const rank = idx + 1;
              const isCurrent = entry.user_id === userId;
              const href = isCurrent ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
              return (
                <Link
                  key={entry.user_id}
                  href={href}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900"
                      : "bg-white/95 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-extrabold text-[11px] ${
                        rank === 1
                          ? "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-300"
                          : rank === 2
                            ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            : rank === 3
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400"
                              : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {RANK_MEDALS[rank] ?? rank}
                    </div>
                    <RankAvatarFrame rank={rank}>
                      <LeaderboardAvatar name={entry.name} avatarUrl={entry.avatarUrl} />
                    </RankAvatarFrame>
                    <div className={`font-bold truncate ${isCurrent ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                      {entry.name}
                    </div>
                  </div>
                  <div className={`font-extrabold shrink-0 ml-2 ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-700 dark:text-stone-200"}`}>
                    {tab.format(entry.value)}
                  </div>
                </Link>
              );
            })}
          </div>

          {myRank !== null && !myRankInTop10 && (
            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-stone-50 dark:bg-stone-800/50 border border-dashed border-stone-300 dark:border-stone-700">
                <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 font-extrabold bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[11px]">
                  #{myRank.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-stone-900 dark:text-stone-100">{t.leaderboardSection.myRankLabel}</div>
                  <div className="text-stone-500 dark:text-stone-400">{tab.format(myRank.value)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
