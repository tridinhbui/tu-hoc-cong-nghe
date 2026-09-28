"use client";

import { useEffect, useState } from "react";
import { BookOpen, Flame, Target, Gamepad2, ShieldCheck, Zap, Heart, type LucideIcon } from "lucide-react";
import {
  getLeaderboardByMetric,
  getMyLeaderboardRank,
  getCompositeLeaderboard,
  getMyCompositeRank,
  getCommunityContributionLeaderboard,
  getMyCommunityContributionRank,
  type LeaderboardMetric,
  type LeaderboardRow,
  type CompositeRank,
} from "@/lib/cloudflare-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import MyRankRow from "@/components/leaderboard/MyRankRow";
import RankTable from "@/components/analytics/RankTable";
import { APP_SYS } from "@/components/analytics/system-codes";
import { SectionHead, Sys, tabClass } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n";

type LeaderboardUiMetric = LeaderboardMetric | "composite" | "game" | "community";

/*
 * Bảng xếp hạng đầy đủ ở /analytics, theo ngôn ngữ bảng hệ thống của trang
 * chủ. Bản trước là một bục vinh danh: vầng sáng vàng/bạc/đồng, ảnh cúp 3D,
 * viên thuốc "danh hiệu" theo hạng và biệt danh tự đặt cho từng vị trí. Danh
 * hiệu ấy không phải dữ liệu của ai - nó là chữ trang trí gắn theo số hạng -
 * nên theo luật 5 ("siêu dữ liệu không bịa") nó đi cùng cái bục. Còn lại là
 * đúng thứ người ta mở bảng để xem: hạng, người, giá trị, và mình ở đâu.
 */

// `labelKey`/`format` both read from the dictionary rather than storing
// translated text directly - TABS is a module-level const built once outside
// any component, so it can't call useI18n() itself.
const TABS: {
  metric: LeaderboardUiMetric;
  labelKey: keyof Pick<
    Dictionary["leaderboard"],
    "compositeScore" | "totalXp" | "lessonsCount" | "avgScore" | "streakDays" | "contribution" | "gamer"
  >;
  icon: LucideIcon;
  format: (v: number, u: Dictionary["leaderboard"]["units"]) => string;
}[] = [
  // Default tab: the weighted overall score (see
  // 20260819_composite_leaderboard.sql). Listed first because it, not raw XP,
  // is meant to be the headline "who is doing best overall" ranking.
  { metric: "composite", labelKey: "compositeScore", icon: ShieldCheck, format: (v, u) => `${v}${u.outOf1000}` },
  { metric: "xp", labelKey: "totalXp", icon: Zap, format: (v, u) => `${v} ${u.xp}` },
  { metric: "lessons", labelKey: "lessonsCount", icon: BookOpen, format: (v, u) => `${v} ${u.lessons}` },
  { metric: "avg_score", labelKey: "avgScore", icon: Target, format: (v, u) => `${Math.round(v)}${u.percent}` },
  { metric: "streak", labelKey: "streakDays", icon: Flame, format: (v, u) => `${v} ${u.days}` },
  { metric: "community", labelKey: "contribution", icon: Heart, format: (v, u) => `${v} ${u.interactions}` },
  { metric: "game", labelKey: "gamer", icon: Gamepad2, format: (v, u) => `${v} ${u.xp}` },
];

export default function Leaderboard({ userId, compact = false }: { userId?: string; compact?: boolean }) {
  const { t } = useI18n();
  const [metric, setMetric] = useState<LeaderboardUiMetric>("composite");
  const [entries, setEntries] = useState<(LeaderboardRow & { careerTitle?: string; careerEmoji?: string })[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
  // Component breakdown for the composite tab, so the score isn't opaque.
  const [myComposite, setMyComposite] = useState<CompositeRank | null>(null);
  const [loading, setLoading] = useState(true);
  // Xem ghi chú cùng kiểu ở components/analytics/LeaderboardSection.tsx:
  // trạng thái "đang đổi bảng" suy ra từ chỉ số nào đã tải xong.
  const [loadedMetric, setLoadedMetric] = useState<string | null>(null);
  const switching = loadedMetric !== metric;

  const activeTab = TABS.find((tab) => tab.metric === metric)!;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let top: (LeaderboardRow & { careerTitle?: string; careerEmoji?: string })[] = [];
        let mine: { rank: number; value: number } | null = null;

        if (metric === "composite") {
          const [topRows, mineRank] = await Promise.all([
            getCompositeLeaderboard(20),
            userId ? getMyCompositeRank(userId) : Promise.resolve(null),
          ]);
          top = topRows;
          mine = mineRank;
          if (!cancelled) setMyComposite(mineRank);
        } else if (metric === "game") {
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
        } else if (metric === "community") {
          // Real posts + comments + reactions. This branch previously derived a
          // value from the XP leaderboard (total_xp * 0.15 plus a rank-based
          // offset) and showed it as "X tương tác" - a number no community
          // table had ever produced.
          const [topRows, mineRank] = await Promise.all([
            getCommunityContributionLeaderboard(20),
            userId ? getMyCommunityContributionRank(userId) : Promise.resolve(null),
          ]);
          top = topRows;
          mine = mineRank;
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
          setLoadedMetric(metric);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [metric, userId]);

  // `compact` giữ nguyên API cũ: mười hàng đầu và đệm hàng hẹp hơn.
  const shown = compact ? entries.slice(0, 10) : entries;
  const fmt = (v: number) => activeTab.format(v, t.leaderboard.units);
  const meInTop = !!userId && shown.some((e) => e.user_id === userId);

  return (
    <section className="rounded-md border border-stone-300 bg-white p-4 sm:p-5 dark:border-stone-700 dark:bg-stone-900">
      <SectionHead
        code={APP_SYS.leaderboard}
        eyebrow={t.leaderboard[activeTab.labelKey]}
        title={t.leaderboard.titleCompact}
        size={compact ? "sm" : "md"}
      />

      {/* Tab chữ có gạch dưới xanh - không phải hộp viên thuốc. */}
      <div role="tablist" className="mt-4 flex gap-5 overflow-x-auto border-b border-line scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = metric === tab.metric;
          return (
            <button
              key={tab.metric}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                if (tab.metric !== metric) setMetric(tab.metric);
              }}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap ${tabClass(isActive)}`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-accent" : "text-ink-faint"}`} aria-hidden />
              <span>{t.leaderboard[tab.labelKey]}</span>
            </button>
          );
        })}
      </div>

      {metric === "composite" && (
        <div className="mt-4 border-b border-line pb-4">
          <p className="text-sm font-black text-ink-max">{t.leaderboard.compositeTitle}</p>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            {t.leaderboard.compositeDescPrefix} <strong className="font-mono tabular-nums">35%</strong>{" "}
            {t.leaderboard.compositeDescXp} <strong className="font-mono tabular-nums">30%</strong>{" "}
            {t.leaderboard.compositeDescExam} <strong className="font-mono tabular-nums">20%</strong>{" "}
            {t.leaderboard.compositeDescAccuracy} <strong className="font-mono tabular-nums">15%</strong>{" "}
            {t.leaderboard.compositeDescStreak}
          </p>
          {myComposite && (
            <dl className="mt-3 grid grid-cols-2 border-y border-line sm:grid-cols-4 sm:divide-x sm:divide-stone-200 dark:sm:divide-stone-800">
              {[
                { label: t.leaderboard.compositeLearningXp, value: `${Math.round(myComposite.learningXp)}` },
                { label: t.leaderboard.compositeExamPoints, value: `${Math.round(myComposite.examPoints)}/1400` },
                { label: t.leaderboard.compositeAccuracy, value: `${Math.round(myComposite.accuracy)}%` },
                { label: t.leaderboard.compositeStreak, value: `${Math.round(myComposite.streakDays)}` },
              ].map((item) => (
                <div key={item.label} className="px-3 py-2 first:pl-0 sm:first:pl-3">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">{item.label}</dt>
                  <dd className="mt-0.5 font-mono text-sm font-medium tabular-nums text-ink-max">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {loading ? (
        <p className="py-10 text-center text-sm font-semibold text-ink-muted">
          {compact ? t.leaderboard.loadingCompact : t.leaderboard.loadingFull}
        </p>
      ) : entries.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-muted">{t.leaderboard.empty}</p>
      ) : (
        <div className={`mt-4 transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          <div className="mb-1.5 flex items-center justify-between gap-3 px-2">
            <Sys className="text-ink-faint">#</Sys>
            <Sys className="text-ink-faint">{`01-${APP_SYS.rank(shown.length)}`}</Sys>
          </div>
          <RankTable
            rows={shown.map((e) => ({ ...e, sub: e.careerTitle ?? null }))}
            userId={userId}
            formatValue={fmt}
            youLabel={t.rankWidget.you}
            dense={compact}
          />

          {/* Dòng "Bạn" LUÔN hiện khi có người đăng nhập, kể cả chưa có hạng. */}
          {userId && !meInTop && (
            <div className="mt-3">
              <MyRankRow rank={myRank?.rank ?? null} valueLabel={myRank ? fmt(myRank.value) : null} compact={compact} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
