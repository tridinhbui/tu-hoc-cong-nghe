"use client";

import { useEffect, useMemo, useState } from "react";
import { trackFeatureClick } from "@/lib/feature-events";
import MyRankRow from "@/components/leaderboard/MyRankRow";
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
  type LeaderboardMetric,
  type LeaderboardRow,
} from "@/lib/cloudflare-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import RankTable from "@/components/analytics/RankTable";
import { APP_SYS } from "@/components/analytics/system-codes";
import { SectionHead, tabClass } from "@/components/ui/system";

type TabId = LeaderboardMetric | "track_personal" | "track_professional" | "weekly" | "monthly" | "friends" | "game";

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
    { id: "track_personal", label: t.leaderboardSection.tabTrackPersonal, format: (v) => format(t.leaderboardSection.valueLessons, { v }) },
    { id: "track_professional", label: t.leaderboardSection.tabTrackProfessional, format: (v) => format(t.leaderboardSection.valueLessons, { v }) },
    { id: "weekly", label: t.leaderboardSection.tabWeekly, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "monthly", label: t.leaderboardSection.tabMonthly, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "friends", label: t.leaderboardSection.tabFriends, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
    { id: "game", label: t.leaderboardSection.tabGame, format: (v) => format(t.leaderboardSection.valueXp, { v }) },
  ];
}

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

  // Every other TabId variant returns above; what's left is a plain
  // LeaderboardMetric ("xp" | "lessons" | "avg_score" | "streak").
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
    <section className="rounded-md border border-line-strong bg-white p-4 sm:p-5 dark:border-stone-700 dark:bg-stone-900">
      <SectionHead code={APP_SYS.rankings} title={t.leaderboardSection.title} sub={t.leaderboardSection.subtitle} size="sm" />

      {/* Tab chữ, cuộn ngang khi hẹp - không cần nút mũi tên tròn nổi. */}
      <div role="tablist" className="mt-4 flex gap-4 overflow-x-auto border-b border-line scrollbar-none">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tabItem.id}
            onClick={() => {
              setActiveTab(tabItem.id);
              trackFeatureClick("leaderboard_tab_click", { label: tabItem.id });
            }}
            className={`shrink-0 cursor-pointer select-none whitespace-nowrap ${tabClass(activeTab === tabItem.id)}`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-6 text-sm text-ink-faint">{t.leaderboardSection.loading}</p>
      ) : entries.length === 0 ? (
        <p className="py-6 text-sm text-ink-muted">{t.leaderboardSection.noData}</p>
      ) : (
        <div className={`mt-4 transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          <RankTable rows={entries} userId={userId} formatValue={tab.format} />

          {/* Dòng "Bạn" LUÔN hiện khi có người đăng nhập, kể cả chưa có hạng. */}
          {userId !== undefined && !myRankInTop10 && (
            <div className="mt-3">
              <MyRankRow rank={myRank?.rank ?? null} valueLabel={myRank ? tab.format(myRank.value) : null} compact />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
