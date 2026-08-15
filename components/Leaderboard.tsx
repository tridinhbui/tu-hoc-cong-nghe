"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, BookOpen, Crown, Flame, Target, Gamepad2, ShieldCheck, Zap, Briefcase, GraduationCap, Heart, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
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
} from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import { getCareerLeaderboard, type CareerLeaderboardRow } from "@/lib/finance-careers";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format as formatI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

type LeaderboardUiMetric = LeaderboardMetric | "composite" | "game" | "career" | "cfa" | "community";

function LeaderboardAvatar({ name, avatarUrl, size = 36 }: { name: string; avatarUrl: string | null; size?: number }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shadow-inner"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name.trim().split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div
      className="flex items-center justify-center rounded-full bg-stone-200 font-bold text-stone-600 dark:bg-stone-700 dark:text-stone-200"
      style={{ width: size, height: size, fontSize: `${Math.max(10, size * 0.32)}px` }}
    >
      {initials}
    </div>
  );
}

// Khung avatar theo hạng: vòng vàng/bạc/đồng PHẲNG, vương miện cho hạng nhất.
function AvatarWithFrame({ rank, name, avatarUrl, size = 44 }: { rank: number; name: string; avatarUrl: string | null; size?: number }) {
  // Ba hạng đầu có khung riêng - vàng, bạc, đồng - và hạng nhất đội vương miện.
  //
  // ĐỌC ĐOẠN NÀY TRƯỚC KHI "LÀM ĐẸP" THÊM. Bản trước bản trước đã có khung
  // riêng cho cả năm nhóm hạng, và nó bị gỡ sạch vì một lý do có thật: mỗi
  // khung là một gradient kim loại CỘNG một vầng sáng `blur-md` CỘNG một ảnh
  // cúp 3D, riêng hạng nhất thêm `animate-pulse` và `animate-bounce`. Năm bảng
  // màu phát sáng cạnh nhau thì không còn thứ bậc nào đọc được, vì mọi hàng
  // giành sự chú ý ngang nhau.
  //
  // Bản này lấy lại thứ ĐÁNG lấy và bỏ thứ đã hỏng. Vàng/bạc/đồng là quy ước
  // huy chương mà ai cũng đọc được ngay, tức chúng MANG THÔNG TIN về thứ hạng -
  // khác hẳn năm gradient trang trí. Nên giữ đúng ba màu ấy, và giữ ở dạng
  // PHẲNG: một vòng màu đặc, không chuyển sắc, không quầng sáng, không ảnh cúp,
  // không chuyển động. Hạng 4-5 về lại viền trung tính, từ 6 trở đi không viền.
  //
  // Vương miện chỉ hạng nhất, và nó THAY con số "1" từng nằm đúng chỗ đó chứ
  // không chồng thêm lên - hai dấu hiệu cho cùng một điều là cách bản cũ bắt
  // đầu trượt.
  const ringByRank: Record<number, string> = {
    1: "bg-amber-400 dark:bg-amber-500",
    2: "bg-stone-400 dark:bg-stone-400",
    3: "bg-orange-700 dark:bg-orange-600",
  };

  if (rank <= 3) {
    const crownSize = Math.max(12, Math.round(size * 0.32));
    return (
      <div className="relative inline-flex items-center justify-center pt-2.5">
        <div className={`rounded-full p-[2px] ${ringByRank[rank]}`}>
          <div className="rounded-full bg-white p-[2px] dark:bg-stone-900">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>
        {rank === 1 ? (
          <Crown
            className="absolute left-1/2 top-0 -translate-x-1/2 fill-amber-400 text-amber-500 dark:fill-amber-500 dark:text-amber-400"
            style={{ width: crownSize, height: crownSize }}
            aria-hidden="true"
          />
        ) : (
          <span
            className={`absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-sm px-1.5 py-px text-[9px] font-black tabular-nums text-white ${ringByRank[rank]}`}
          >
            {rank}
          </span>
        )}
      </div>
    );
  }

  if (rank <= 5) {
    return (
      <div className="relative inline-flex items-center justify-center pt-1">
        <div className="rounded-full p-[1.5px] bg-stone-300 dark:bg-stone-700">
          <div className="rounded-full bg-white p-[1.5px] dark:bg-stone-900">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
    </div>
  );
}

// `labelKey`/`format` both read from the dictionary rather than storing
// translated text directly - TABS is a module-level const built once outside
// any component, so it can't call useI18n() itself. Callers pass
// t.leaderboard/t.leaderboard.units in at render time (see LB() below).
const TABS: {
  metric: LeaderboardUiMetric;
  labelKey: keyof Pick<
    Dictionary["leaderboard"],
    "compositeScore" | "totalXp" | "lessonsCount" | "avgScore" | "streakDays" | "career" | "cfaArena" | "contribution" | "gamer"
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
  { metric: "career", labelKey: "career", icon: Briefcase, format: (v, u) => `${v} ${u.lessons}` },
  { metric: "cfa", labelKey: "cfaArena", icon: GraduationCap, format: (v, u) => `${v} ${u.points}` },
  { metric: "community", labelKey: "contribution", icon: Heart, format: (v, u) => `${v} ${u.interactions}` },
  { metric: "game", labelKey: "gamer", icon: Gamepad2, format: (v, u) => `${v} ${u.xp}` },
];

const PODIUM_ORDER = [3, 1, 0, 2, 4];

/** Danh hiệu và biệt danh theo hạng. Dữ liệu nằm ở
 *  `t.leaderboardHonors` (sections/leaderboard-honors.ts) chứ không phải
 *  literal trong file này: bảng xếp hạng tiếng Anh trước đây hiện "HUY CHƯƠNG
 *  BẠC" và "HỌC CHẮC TỪNG BƯỚC" dán trên từng bục. */
function getLeaderboardTitle(t: Dictionary, metric: LeaderboardUiMetric, rank: number): string | null {
  return t.leaderboardHonors.titles[metric]?.[rank - 1] ?? null;
}

function getLeaderboardHonor(t: Dictionary, metric: LeaderboardUiMetric, rank: number) {
  const title = getLeaderboardTitle(t, metric, rank);
  const table = (t.leaderboardHonors as Record<string, unknown>)[metric] as
    | Record<number, { badge: string; nickname: string }>
    | undefined;
  const honor = table?.[rank] ?? {
    badge: formatI18n(t.leaderboardHonors.fallbackBadge, { rank }),
    nickname: formatI18n(t.leaderboardHonors.fallbackNickname, { rank }),
  };
  return { title: title ?? honor.badge, ...honor };
}

function getPodiumHeight(rank: number) {
  if (rank === 1) return "h-16";
  if (rank === 2) return "h-13";
  if (rank === 3) return "h-11";
  return "h-9";
}

// MỘT hình dạng huy hiệu cho mọi hạng, chỉ khác màu nền ở ba hạng đầu.
//
// Trước đây có bốn hình dạng: hạng 1 gradient vàng + icon Crown, hạng 2
// gradient bạc + Medal, hạng 3 gradient đồng + Award, còn lại gradient xám +
// Star - bốn gradient và bốn icon để nói đúng một thứ mà con số hạng đã nói.
// Hình dạng vẫn là một; thứ quay lại chỉ là MÀU, và nó phải trùng màu vòng
// khung trong AvatarWithFrame: nếu không, cùng một người đội vương miện vàng
// lại đeo huy hiệu xanh lá, và màu thôi chỉ ra được ai đang đứng nhất.
const BADGE_TONE_BY_RANK: Record<number, string> = {
  1: "bg-amber-400 text-stone-950 dark:bg-amber-500",
  2: "bg-stone-400 text-white dark:bg-stone-400 dark:text-stone-950",
  3: "bg-orange-700 text-white dark:bg-orange-600",
};

function RankBadgePill({ rank, badgeText }: { rank: number; badgeText: string }) {
  return (
    <div
      className={`inline-flex max-w-full items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${
        BADGE_TONE_BY_RANK[rank] ?? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
      }`}
    >
      <span className="truncate">{badgeText}</span>
    </div>
  );
}

// Hạng NHẤT nổi, còn lại dùng chung một thẻ trung tính.
//
// Bản trước trả về năm bộ khác nhau, mỗi bộ một gradient nền, một `ring`, một
// bóng có màu và một màu chữ riêng - amber, slate, amber-orange, violet,
// emerald. Đó là chỗ phần lớn "cảm giác gamification" đến từ, và nó làm hạng 4
// (tím) trông nổi hơn hạng 2 (xám bạc) dù xếp sau.
function getPodiumTone(rank: number) {
  if (rank === 1) {
    return {
      card: "border-emerald-600/60 dark:border-emerald-500/50 bg-white dark:bg-stone-900",
      pedestal: "bg-emerald-600/10 border-emerald-600/40 dark:bg-emerald-500/10 dark:border-emerald-500/30",
      chip: "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-stone-950",
      name: "text-stone-900 dark:text-stone-100",
      value: "text-emerald-700 dark:text-emerald-400",
      pedestalLabel: "1",
    };
  }
  return {
    card: "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900",
    pedestal: "bg-stone-100 border-stone-200 dark:bg-stone-800/60 dark:border-stone-700",
    chip: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
    name: "text-stone-900 dark:text-stone-100",
    value: "text-stone-700 dark:text-stone-300",
    pedestalLabel: String(rank),
  };
}

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
  const leadTabsRef = useRef<HTMLDivElement>(null);

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
        } else if (metric === "career") {
          const careerRows = await getCareerLeaderboard(20);
          top = careerRows.map((row) => ({
            user_id: row.user_id,
            value: row.value,
            name: row.name,
            avatarUrl: row.avatarUrl,
            careerTitle: row.careerTitle,
            careerEmoji: row.careerEmoji,
          }));
          if (userId) {
            const myIndex = careerRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: careerRows[myIndex].value };
          }
        } else if (metric === "cfa") {
          const { getCfaLeaderboard } = await import("@/lib/cfa-track");
          const cfaRows = await getCfaLeaderboard(20);
          top = cfaRows.map((row) => ({
            user_id: row.user_id,
            value: row.value,
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = cfaRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: cfaRows[myIndex].value };
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

  const podiumEntries = useMemo(() => entries.slice(0, 5), [entries]);
  const remainingEntries = useMemo(() => entries.slice(5), [entries]);

  if (compact) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400 shadow-xs">
              <Trophy className="h-3.5 w-3.5 fill-amber-400 text-amber-600 dark:text-amber-400" />
              {t.leaderboard.eyebrowCompact}
            </div>
            <h2 className="mt-2.5 text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">{t.leaderboard.titleCompact}</h2>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-xs">
            {t.leaderboard[activeTab.labelKey]}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="relative mt-4 group/lead-tabs">
          <button
            type="button"
            onClick={() => leadTabsRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer hidden sm:flex"
            aria-label={t.leaderboard.scrollLeft}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => leadTabsRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer hidden sm:flex"
            aria-label={t.leaderboard.scrollRight}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div
            ref={leadTabsRef}
            className="flex gap-1 overflow-x-auto rounded-2xl bg-stone-100/90 dark:bg-stone-900/90 p-1 scrollbar-none px-2 sm:px-4"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = metric === tab.metric;
              return (
                <button
                  key={tab.metric}
                  onClick={() => {
                    if (tab.metric !== metric) setMetric(tab.metric);
                  }}
                  className={`flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-md ring-1 ring-stone-200/60 dark:ring-stone-700 font-extrabold"
                      : "text-stone-500 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50 hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-500" : "text-stone-400"}`} />
                  <span>{t.leaderboard[tab.labelKey]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {metric === "composite" && (
          <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-800 dark:bg-stone-800/40">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.leaderboard.compositeTitle}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                  {t.leaderboard.compositeDescPrefix} <strong>35%</strong> {t.leaderboard.compositeDescXp}{" "}
                  <strong>30%</strong> {t.leaderboard.compositeDescExam} <strong>20%</strong> {t.leaderboard.compositeDescAccuracy}{" "}
                  <strong>15%</strong> {t.leaderboard.compositeDescStreak}
                </p>
                {myComposite && (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {[
                      { label: t.leaderboard.compositeLearningXp, value: `${Math.round(myComposite.learningXp)}` },
                      { label: t.leaderboard.compositeExamPoints, value: `${Math.round(myComposite.examPoints)}/1400` },
                      { label: t.leaderboard.compositeAccuracy, value: `${Math.round(myComposite.accuracy)}%` },
                      { label: t.leaderboard.compositeStreak, value: `${Math.round(myComposite.streakDays)}` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 px-2 py-1.5"
                      >
                        <p className="text-[9px] font-extrabold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                          {item.label}
                        </p>
                        <p className="text-[11px] font-black text-stone-900 dark:text-stone-100">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex flex-col items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-stone-500 dark:text-stone-400">{t.leaderboard.loadingCompact}</p>
          </div>
        ) : entries.length === 0 ? (
          <p className="mt-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">{t.leaderboard.empty}</p>
        ) : (
          <div className={`mt-5 space-y-4 transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
            {/* Podium Top 5 */}
            <div className="pt-6 pb-2 overflow-x-auto scrollbar-none">
              <div className="mx-auto grid min-w-[340px] grid-cols-5 items-end gap-1.5 px-0.5">
                {PODIUM_ORDER.map((podiumIndex) => {
                  const entry = podiumEntries[podiumIndex];
                  if (!entry) return null;
                  const rank = podiumIndex + 1;
                  const tone = getPodiumTone(rank);
                  const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                  const isChampion = rank === 1;

                  return (
                    <Link key={entry.user_id} href={href} className="group flex min-w-0 flex-col items-center">
                      <div className={`w-full rounded-2xl border px-1.5 py-3 text-center transition-all duration-200 group-hover:-translate-y-1 ${tone.card} ${isChampion ? "scale-[1.03] z-10" : ""}`}>
                        {/* Avatar with Frame */}
                        <div className="mx-auto mb-2 flex justify-center">
                          <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={isChampion ? 44 : 36} />
                        </div>

                        {/* Rank Badge */}
                        <div className={`mx-auto mb-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black ${tone.chip}`}>
                          #{rank}
                        </div>

                        {/* Honor Badge Pill */}
                        <div className="mb-1 flex justify-center">
                          <RankBadgePill rank={rank} badgeText={getLeaderboardHonor(t, metric, rank).badge} />
                        </div>

                        <p className={`text-xs font-black leading-tight line-clamp-1 break-words ${tone.name}`}>{entry.name}</p>
                        <p className="mt-0.5 text-[8px] font-extrabold uppercase leading-tight text-emerald-600 dark:text-emerald-400 line-clamp-1 break-words">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : getLeaderboardHonor(t, metric, rank).nickname}
                        </p>
                        <p className={`mt-1 text-[11px] font-black leading-tight ${tone.value}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                      </div>

                      {/* 3D Pedestal Step Base */}
                      <div className={`mt-1 w-full rounded-t-xl border-x border-t ${tone.pedestal} ${getPodiumHeight(rank)} flex items-center justify-center font-black text-[10px] uppercase text-stone-400/80 shadow-xs`}>
                        {tone.pedestalLabel}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sub-ranks #6+ Framed Cards */}
            <div className="border-t border-stone-200/80 dark:border-stone-800 pt-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">{t.leaderboard.nextRanks}</p>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  {t.leaderboard.rangeCompact}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {entries.slice(5, 10).map((entry, idx) => {
                const actualRank = idx + 6;
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isCurrent = entry.user_id === userId;
                const honor = getLeaderboardHonor(t, metric, actualRank);

                return (
                  <Link
                    key={entry.user_id}
                    href={href}
                    className={`flex items-center justify-between gap-3 border-b border-stone-100 px-1 py-2 transition-colors group last:border-b-0 dark:border-stone-800/80 ${
                      isCurrent
                        ? "bg-emerald-50/70 dark:bg-emerald-950/30"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Metallic Rank Shield Badge */}
                      <div className="w-7 shrink-0 text-right font-bold tabular-nums text-xs text-stone-400 dark:text-stone-500">
                        {actualRank}
                      </div>

                      {/* Framed Avatar */}
                      <AvatarWithFrame rank={actualRank} name={entry.name} avatarUrl={entry.avatarUrl} size={36} />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-black text-stone-900 dark:text-stone-100 transition-colors">{entry.name}</p>
                        <p className="truncate text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : honor.nickname}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {/* Framed Badge Tag */}
                      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500 mb-0.5">
                        {honor.badge}
                      </div>
                      <p className="text-xs font-black text-stone-900 dark:text-stone-100">{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* User MyRank Banner */}
            {myRank && (
              <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/60 px-4 py-3 dark:border-stone-700 dark:bg-stone-800/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-amber-950 shadow">
                      <Trophy className="h-4 w-4 fill-amber-950 text-amber-950" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.leaderboard.yourRank}</p>
                      <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                        {formatI18n(t.leaderboard.byMetricCompact, { metric: t.leaderboard[activeTab.labelKey].toLowerCase() })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-600 dark:text-amber-400">#{myRank.rank}</p>
                    <p className="text-xs font-extrabold text-stone-700 dark:text-stone-300">{activeTab.format(myRank.value, t.leaderboard.units)}</p>
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
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700 shadow-xs">
            <Trophy className="h-3.5 w-3.5 fill-amber-400 text-amber-600" />
            {t.leaderboard.eyebrowFull}
          </div>
          <h2 className="mt-2.5 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{t.leaderboard.titleFull}</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700 shadow-xs">
          {t.leaderboard[activeTab.labelKey]}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto rounded-2xl bg-stone-100 p-1.5 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = metric === tab.metric;
          return (
            <button
              key={tab.metric}
              onClick={() => {
                if (tab.metric !== metric) setMetric(tab.metric);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                isActive
                  ? "bg-white text-stone-900 shadow-md ring-1 ring-stone-200/80"
                  : "text-stone-500 hover:bg-white/60 hover:text-stone-800"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-500" : "text-stone-400"}`} />
              <span>{t.leaderboard[tab.labelKey]}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-stone-500">{t.leaderboard.loadingFull}</p>
        </div>
      ) : entries.length === 0 ? (
        <p className="mt-8 py-12 text-center text-sm text-stone-500">{t.leaderboard.empty}</p>
      ) : (
        <div className={`transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          {/* Top 5 Podium */}
          <div className="mt-8 pt-6 pb-2 overflow-x-auto scrollbar-none">
            <div className="mx-auto grid min-w-[500px] grid-cols-5 items-end justify-center gap-2 px-1">
              {PODIUM_ORDER.map((podiumIndex) => {
                const entry = podiumEntries[podiumIndex];
                if (!entry) return null;
                const rank = podiumIndex + 1;
                const tone = getPodiumTone(rank);
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isChampion = rank === 1;

                return (
                  <Link key={entry.user_id} href={href} className="group flex min-w-0 flex-col items-center">
                    <div className={`w-full rounded-[24px] border px-2.5 py-4 text-center transition-all duration-200 group-hover:-translate-y-1.5 ${tone.card} ${isChampion ? "scale-[1.04] z-10" : ""}`}>
                      {/* Avatar with Frame */}
                      <div className="mx-auto mb-3 flex justify-center">
                        <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={isChampion ? 52 : 44} />
                      </div>

                      {/* Rank Chip */}
                      <div className={`mx-auto mb-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-black ${tone.chip}`}>
                        #{rank}
                      </div>

                      {/* Badge Pill */}
                      <div className="mb-1.5 flex justify-center">
                        <RankBadgePill rank={rank} badgeText={getLeaderboardHonor(t, metric, rank).badge} />
                      </div>

                      <p className="text-sm font-black leading-tight text-stone-900 line-clamp-1 break-words">{entry.name}</p>
                      <p className="mt-1 text-[9px] font-extrabold uppercase leading-tight text-emerald-600 dark:text-emerald-400 line-clamp-1 break-words">
                        {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : getLeaderboardHonor(t, metric, rank).nickname}
                      </p>
                      <p className={`mt-1.5 text-sm font-black ${tone.value}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>

                    {/* Pedestal Step */}
                    <div className={`mt-1.5 w-full rounded-t-[20px] border-x border-t ${tone.pedestal} ${getPodiumHeight(rank)} flex items-center justify-center font-black text-xs uppercase text-stone-400/80 shadow-xs`}>
                      {tone.pedestalLabel}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Remaining Ranks #6+ Framed Cards */}
          <div className="mt-8 rounded-[26px] border border-stone-200/80 bg-stone-50/70 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-stone-600">{t.leaderboard.nextRanks}</h3>
              </div>
              <span className="text-[10px] font-black text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                {t.leaderboard.rangeFull}
              </span>
            </div>

            <div className="space-y-2.5">
              {remainingEntries.map((entry, idx) => {
                const rank = idx + 6;
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isCurrent = entry.user_id === userId;
                const honor = getLeaderboardHonor(t, metric, rank);

                return (
                  <Link
                    key={entry.user_id}
                    href={href}
                    className={`flex items-center justify-between gap-4 border-b border-stone-100 px-1 py-2.5 transition-colors group last:border-b-0 ${
                      isCurrent ? "bg-emerald-50/70" : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Metallic Rank Shield Badge */}
                      <div className="w-8 shrink-0 text-right font-bold tabular-nums text-xs text-stone-400">
                        {rank}
                      </div>

                      {/* Avatar with Custom Frame */}
                      <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={38} />

                      <div className="min-w-0">
                        <p className="truncate font-black text-stone-900 transition-colors">{entry.name}</p>
                        <p className="truncate text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : honor.nickname}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400 mb-0.5">
                        {honor.badge}
                      </div>
                      <p className={`font-black ${isCurrent ? "text-emerald-700" : "text-stone-800"}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* My Rank Footer */}
            {myRank && (
              <div className="mt-4 rounded-xl border border-dashed border-stone-300 bg-stone-50/60 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white dark:bg-emerald-500 dark:text-stone-950">
                      <Trophy className="h-5 w-5 fill-amber-950 text-amber-950" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-stone-900">{t.leaderboard.yourRank}</p>
                      <p className="text-xs text-stone-500">
                        {formatI18n(t.leaderboard.byMetricFull, { metric: t.leaderboard[activeTab.labelKey].toLowerCase() })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-amber-600">#{myRank.rank}</p>
                    <p className="text-xs font-extrabold text-stone-700">{activeTab.format(myRank.value, t.leaderboard.units)}</p>
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
