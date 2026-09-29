"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getCompositeLeaderboard,
  getLeaderboardByMetric,
  getMyCompositeRank,
  getMyLeaderboardRank,
  getMyXpRankSince,
  getXpLeaderboardSince,
  type LeaderboardMetric,
  type LeaderboardRow,
} from "@/lib/cloudflare-user";
import Avatar from "@/components/Avatar";
import RankBadge from "@/components/games/RankBadge";
import MyRankRow from "@/components/leaderboard/MyRankRow";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { Frame, tabClass } from "@/components/ui/system";

type Metric = "composite" | "xp" | "streak" | "lessons" | "avg_score";
type Period = "7d" | "30d" | "all";

const METRICS: { id: Metric; label: keyof Dictionary["rankWidget"] }[] = [
  { id: "composite", label: "tabComposite" },
  { id: "xp", label: "tabXp" },
  { id: "streak", label: "tabStreak" },
  { id: "lessons", label: "tabLessons" },
  { id: "avg_score", label: "tabAvg" },
];

const PERIODS: { id: Period; label: keyof Dictionary["rankWidget"]; days: number | null }[] = [
  { id: "7d", label: "period7", days: 7 },
  { id: "30d", label: "period30", days: 30 },
  { id: "all", label: "periodAll", days: null },
];

const TOP_N = 5;

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS_TITLE = "THCN://COMMUNITY/LEADERBOARD";
/* i18n-ignore-end */

type Mine = { rank: number; value: number } | null;

/** Bảng xếp hạng thu nhỏ ở cột phải dashboard: năm chỉ số, top 5, và luôn có
 *  dòng "Bạn" ở cuối.
 *
 *  Lọc theo thời gian (7 / 30 ngày) CHỈ có ở tab XP, vì chỉ XP có RPC theo mốc
 *  thời gian (`get_xp_leaderboard_since`). Hiện bộ lọc ấy ở tab chuỗi ngày hay
 *  điểm TB thì bấm vào không đổi gì - một nút nói dối. Chuỗi ngày vốn đã là
 *  "hiện tại", còn tổng hợp / số bài / điểm TB là tích luỹ.
 *
 *  Cùng các RPC mà bảng đầy đủ ở /analytics dùng, nên hai nơi không thể nói
 *  hai thứ hạng khác nhau. */
/** `bare`: bỏ khung và tiêu đề riêng, để thẻ nằm trong một nhóm thu gọn đã
 *  mang sẵn tiêu đề (dashboard). Mặc định giữ khung như cũ. */
export default function DashboardLeaderboardCard({ userId, bare = false }: { userId: string; bare?: boolean }) {
  const { t } = useI18n();
  const [metric, setMetric] = useState<Metric>("composite");
  const [period, setPeriod] = useState<Period>("7d");
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [mine, setMine] = useState<Mine>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const key = metric === "xp" ? `xp:${period}` : metric;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let top: LeaderboardRow[] = [];
      let me: Mine = null;
      try {
        if (metric === "composite") {
          [top, me] = await Promise.all([getCompositeLeaderboard(TOP_N), getMyCompositeRank(userId)]);
        } else if (metric === "xp" && period !== "all") {
          const days = PERIODS.find((p) => p.id === period)!.days!;
          const since = new Date(Date.now() - days * 86_400_000);
          [top, me] = await Promise.all([getXpLeaderboardSince(since, TOP_N), getMyXpRankSince(since, userId)]);
        } else {
          const m = metric as LeaderboardMetric;
          [top, me] = await Promise.all([getLeaderboardByMetric(m, TOP_N), getMyLeaderboardRank(m, userId)]);
        }
      } catch {
        top = [];
        me = null;
      }
      if (cancelled) return;
      setRows(top);
      setMine(me ? { rank: me.rank, value: me.value } : null);
      setLoadedKey(key);
    })();
    return () => {
      cancelled = true;
    };
  }, [metric, period, userId, key]);

  const u = t.leaderboard.units;
  const format = (v: number) => {
    switch (metric) {
      case "composite":
        return `${v}${u.outOf1000}`;
      case "xp":
        return `${v} ${u.xp}`;
      case "streak":
        return `${v} ${u.days}`;
      case "lessons":
        return `${v} ${u.lessons}`;
      case "avg_score":
        return `${Math.round(v)}${u.percent}`;
    }
  };

  const switching = loadedKey !== key;
  const meInTop = !!rows?.some((r) => r.user_id === userId);

  const body = (
    <section>
      {!bare && (
        <header>
          <h2 className="text-sm font-bold tracking-tight text-ink-body">{t.rankWidget.title}</h2>
        </header>
      )}

      <div className={`${bare ? "" : "mt-3 "}flex gap-5 overflow-x-auto border-b border-line scrollbar-none`} role="tablist">
        {METRICS.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={metric === m.id}
            onClick={() => setMetric(m.id)}
            className={`shrink-0 cursor-pointer whitespace-nowrap ${tabClass(metric === m.id)}`}
          >
            {t.rankWidget[m.label]}
          </button>
        ))}
      </div>

      {metric === "xp" && (
        <div className="mt-2 flex gap-4 border-b border-line">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`cursor-pointer !text-xs !pb-1.5 ${tabClass(period === p.id)}`}
            >
              {t.rankWidget[p.label]}
            </button>
          ))}
        </div>
      )}

      <div className={`mt-3 transition-opacity duration-150 ${switching && rows ? "opacity-40" : "opacity-100"}`}>
        {rows === null ? (
          <p className="py-6 text-center text-xs text-ink-faint">{t.rankWidget.loading}</p>
        ) : rows.length === 0 ? (
          <p className="py-4 text-center text-xs text-ink-muted">{t.rankWidget.empty}</p>
        ) : (
          <ol className="divide-y divide-line">
            {rows.map((row, i) => {
              const isMe = row.user_id === userId;
              return (
                <li key={row.user_id}>
                  <Link
                    href={isMe ? "/profile" : `/nguoi-hoc/${row.user_id}`}
                    className={`flex items-center gap-2.5 rounded-sm px-2 py-1.5 transition-colors ${
                      isMe ? "bg-accent-soft" : "hover:bg-surface-raised dark:hover:bg-stone-950"
                    }`}
                  >
                    <RankBadge rank={i + 1} className="w-6 shrink-0 text-center font-mono text-xs font-medium tabular-nums text-ink-muted" />
                    <Avatar name={row.name} url={row.avatarUrl} size={28} />
                    <span className={`min-w-0 flex-1 truncate text-sm ${isMe ? "font-bold text-accent-strong" : "font-semibold text-ink-body"}`}>
                      {isMe ? t.rankWidget.you : row.name}
                    </span>
                    <span className="shrink-0 font-mono text-sm font-medium tabular-nums text-ink-muted">{format(row.value)}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}

        {rows !== null && !meInTop && (
          <>
            {rows.length > 0 && <div className="my-1.5 text-center text-xs leading-none text-ink-faint">…</div>}
            <MyRankRow rank={mine?.rank ?? null} valueLabel={mine ? format(mine.value) : null} compact />
          </>
        )}
      </div>

      <Link
        href="/analytics"
        className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-ink-muted underline-offset-4 hover:text-accent-strong hover:underline"
      >
        {t.rankWidget.viewAll}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );

  if (bare) return body;

  return (
    <Frame title={SYS_TITLE} bodyClassName="p-4">
      {body}
    </Frame>
  );
}
