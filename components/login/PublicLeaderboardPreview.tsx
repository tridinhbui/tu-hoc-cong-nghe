"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/cloudflare-user";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { Sys, StatusDot, btnPrimary, tabClass } from "@/components/ui/system";

type MetricFilter = "xp" | "streak" | "lessons";

/* i18n-ignore-start: định danh hạng (01, 02...) - số máy, cùng một chuỗi ở mọi
   ngôn ngữ. */
const rankId = (n: number) => String(n).padStart(2, "0");
/* i18n-ignore-end */

function Avatar({ entry, size }: { entry: LeaderboardRow; size: 36 | 40 }) {
  const box = size === 40 ? "h-9 w-9 sm:h-10 sm:w-10" : "h-8 w-8";
  return isValidAvatar(entry.avatarUrl) ? (
    <Image
      src={entry.avatarUrl}
      alt={entry.name}
      width={size}
      height={size}
      className={`${box} rounded-full border border-line-strong object-cover dark:border-stone-700`}
    />
  ) : (
    <div
      className={`${box} flex items-center justify-center rounded-full border border-line-strong bg-surface-raised text-xs font-black text-ink-soft dark:border-stone-700 dark:bg-stone-800`}
    >
      {entry.name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

/*
 * Bảng xếp hạng công khai, đặt TRONG một Frame của trang chủ
 * (THCN://COMMUNITY/LEADERBOARD) - nên nó không tự vẽ khung, bóng hay nền
 * riêng nữa, chỉ là thân của cửa sổ đó.
 *
 * Luật 5 - siêu dữ liệu không bịa - đã gỡ ba thứ khỏi đây:
 *  - Dữ liệu giả lập dự phòng (sáu học viên với XP/streak gõ tay) từng hiện
 *    mỗi khi bảng trống hoặc lỗi, dưới nhãn "LIVE". Giờ bảng trống thì nói là
 *    trống.
 *  - Tab "Số bài học" gọi RPC với metric "xp" rồi in số XP kèm chữ "bài hoàn
 *    thành". get_leaderboard có cột `lessons` thật (lib/d1/rpc.ts), nên gọi
 *    đúng nó.
 *  - Dòng "Hơn 430+ học viên đang duy trì nhịp học" ở chân: không có phép đếm
 *    nào đứng sau con số đó.
 * Bục vinh danh cũng không còn nhân bản người đứng đầu vào ba chỗ khi bảng
 * có ít hơn ba người.
 */
export default function PublicLeaderboardPreview() {
  const { t, locale } = useI18n();
  const [metric, setMetric] = useState<MetricFilter>("xp");
  // null = đang tải (hiện khung xương), [] = bảng thật sự trống.
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<LeaderboardRow | null>(null);
  const [cheers, setCheers] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric(metric, 9)
      .then((data) => {
        if (!cancelled) setRows(data ?? []);
      })
      .catch(() => {
        if (!cancelled) setRows([]);
      });
    return () => {
      cancelled = true;
    };
  }, [metric]);

  const top = rows ?? [];
  // Thứ tự đứng trên bục: hạng 2 - hạng 1 - hạng 3. Chỉ những hạng có người.
  const podium = ([1, 0, 2] as const)
    .map((i) => ({ entry: top[i], rank: i + 1 }))
    .filter((p): p is { entry: LeaderboardRow; rank: number } => !!p.entry);

  const rankTitle = (rank: number) =>
    rank === 1 ? t.leaderboardPreview.rankGold : rank === 2 ? t.leaderboardPreview.rankSilver : t.leaderboardPreview.rankBronze;
  const pillarHeight = (rank: number) => (rank === 1 ? "h-12 sm:h-14" : rank === 2 ? "h-8 sm:h-10" : "h-6 sm:h-8");

  function handleCheerUser(userId: string, e: React.MouseEvent) {
    e.stopPropagation();
    setCheers((prev) => ({ ...prev, [userId]: (prev[userId] || 0) + 1 }));
  }

  function getMetricUnit(val: number) {
    if (metric === "xp") return format(t.leaderboardPreview.metricXp, { value: val.toLocaleString(intlLocale(locale)) });
    if (metric === "streak") return format(t.leaderboardPreview.metricStreak, { value: val });
    return format(t.leaderboardPreview.metricLessons, { value: val });
  }

  function switchMetric(next: MetricFilter) {
    if (next === metric) return;
    setRows(null);
    setSelectedUser(null);
    setMetric(next);
  }

  const tabs: { id: MetricFilter; label: string }[] = [
    { id: "xp", label: t.leaderboardPreview.tabXp },
    { id: "streak", label: t.leaderboardPreview.tabStreak },
    { id: "lessons", label: t.leaderboardPreview.tabLessons },
  ];

  return (
    <div className="space-y-3 font-sans">
      {/* Tiêu đề + tab chữ (gạch dưới xanh cho tab đang mở, không viên thuốc) */}
      <div>
        <p className="eyebrow flex items-center gap-1.5 text-ink-soft">
          <StatusDot />
          {t.leaderboardPreview.liveTitle}
        </p>
        <div className="mt-2 flex items-center gap-5 border-b border-line-strong">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={metric === tab.id}
              onClick={() => switchMetric(tab.id)}
              className={`${tabClass(metric === tab.id)} cursor-pointer`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {rows === null ? (
        <ul aria-hidden className="divide-y divide-stone-200 dark:divide-stone-800">
          {[0, 1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-center gap-3 py-2.5">
              <span className="h-3 w-4 animate-pulse rounded-xs bg-surface-sunken" />
              <span className="h-8 w-8 animate-pulse rounded-full bg-surface-sunken" />
              <span className="h-3 flex-1 animate-pulse rounded-xs bg-surface-sunken" />
              <span className="h-3 w-14 animate-pulse rounded-xs bg-surface-sunken" />
            </li>
          ))}
        </ul>
      ) : top.length === 0 ? (
        <p className="rounded-sm border border-dashed border-stone-300 px-4 py-6 text-center text-sm text-ink-muted dark:border-stone-700">
          {t.leaderboardPreview.empty}
        </p>
      ) : (
        <>
          {/* Bục vinh danh: ba cột phẳng, chiều cao cột nói thứ hạng; hạng 1
              đứng trên nền mực thay cho vàng/bạc/đồng tô gradient. */}
          <div className="rounded-sm border border-line-strong bg-page p-2.5 sm:p-3 dark:border-stone-700 dark:bg-stone-950">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="eyebrow text-ink-muted">{t.leaderboardPreview.podiumBadge}</p>
              <p className="truncate text-xs font-bold text-ink">
                {metric === "xp" && t.leaderboardPreview.podiumTitleXp}
                {metric === "streak" && t.leaderboardPreview.podiumTitleStreak}
                {metric === "lessons" && t.leaderboardPreview.podiumTitleLessons}
              </p>
            </div>

            <div className="grid min-h-[90px] grid-cols-3 items-end gap-1.5 pt-1 sm:gap-2">
              {podium.map(({ entry, rank }, idx) => {
                const userCheers = cheers[entry.user_id] || 0;
                return (
                  <motion.div
                    key={entry.user_id + metric}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    onClick={() => setSelectedUser(entry)}
                    className={`group flex cursor-pointer flex-col items-center ${
                      podium.length < 3 && rank === 1 ? "col-start-2" : ""
                    }`}
                  >
                    <div className="mb-1 flex flex-col items-center">
                      <Avatar entry={entry} size={40} />
                      <p className="mt-1 max-w-[80px] truncate text-center text-[11px] font-black leading-none text-ink-max sm:max-w-[100px]">
                        {entry.name}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold tabular-nums text-ink-muted">{getMetricUnit(entry.value)}</p>
                      <button
                        type="button"
                        onClick={(e) => handleCheerUser(entry.user_id, e)}
                        className={`mt-1 inline-flex items-center gap-1 rounded-xs border px-1.5 py-px text-[10px] font-bold transition-colors ${
                          userCheers > 0
                            ? "border-brand-600 text-accent-strong dark:border-brand-400"
                            : "border-stone-300 text-ink-muted hover:border-stone-400 hover:text-ink dark:border-stone-700 dark:hover:border-stone-600"
                        }`}
                        title={t.leaderboardPreview.cheerButtonTitle}
                      >
                        <Heart className={`h-2.5 w-2.5 ${userCheers > 0 ? "fill-current" : ""}`} />
                        <span>
                          {userCheers > 0
                            ? format(t.leaderboardPreview.cheerButtonCount, { count: userCheers })
                            : t.leaderboardPreview.cheerButtonIdle}
                        </span>
                      </button>
                    </div>

                    <div
                      className={`flex w-full flex-col items-center justify-center rounded-t-xs border border-b-0 ${pillarHeight(rank)} ${
                        rank === 1
                          ? "border-stone-950 bg-stone-950 text-white dark:border-stone-200 dark:bg-stone-100 dark:text-stone-950"
                          : "border-stone-300 bg-white text-ink-soft dark:border-stone-700 dark:bg-stone-900"
                      }`}
                    >
                      <Sys className="opacity-70">{rankId(rank)}</Sys>
                      <span className="text-[9px] font-bold uppercase tracking-wider">{rankTitle(rank)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-stone-950 bg-stone-950 p-3 text-white dark:border-stone-700"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-600 text-xs font-black text-stone-200">
                    {selectedUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-black">
                      <span className="truncate">{selectedUser.name}</span>
                      <span className="rounded-xs border border-stone-600 px-1.5 py-px text-[10px] font-bold text-stone-300">
                        {t.leaderboardPreview.activeLearnerBadge}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400">
                      {format(t.leaderboardPreview.achievementLine, { metric: getMetricUnit(selectedUser.value) })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCheerUser(selectedUser.user_id, e)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 text-xs font-bold text-stone-950 transition-colors hover:bg-brand-300"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    <span>{format(t.leaderboardPreview.cheerActionLabel, { count: cheers[selectedUser.user_id] || 0 })}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="cursor-pointer rounded-sm border border-stone-600 px-3 py-1.5 text-xs font-bold text-stone-300 transition-colors hover:border-stone-300"
                  >
                    {t.leaderboardPreview.closeButton}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bảng hạng: hạng mono trái, số mono căn phải - khuôn StatTable. */}
          <ol className="divide-y divide-stone-200 border-t border-stone-300 dark:divide-stone-800 dark:border-stone-700">
            {top.slice(0, 6).map((entry, idx) => {
              const cheered = (cheers[entry.user_id] || 0) > 0;
              return (
                <li
                  key={entry.user_id}
                  onClick={() => setSelectedUser(entry)}
                  className="flex cursor-pointer items-center gap-3 py-2 transition-colors hover:bg-page dark:hover:bg-stone-800/50"
                >
                  <Sys className="w-5 shrink-0 text-ink-faint">{rankId(idx + 1)}</Sys>
                  <Avatar entry={entry} size={36} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-body">{entry.name}</span>
                  <span className="shrink-0 text-[13px] font-bold tabular-nums text-ink-max">
                    {getMetricUnit(entry.value)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleCheerUser(entry.user_id, e)}
                    aria-pressed={cheered}
                    className={`shrink-0 cursor-pointer rounded-sm border p-1.5 transition-colors ${
                      cheered
                        ? "border-brand-600 text-accent-strong dark:border-brand-400"
                        : "border-stone-300 text-ink-muted hover:border-stone-400 hover:text-ink dark:border-stone-700 dark:hover:border-stone-600"
                    }`}
                    title={t.leaderboardPreview.cheerShortTitle}
                    aria-label={t.leaderboardPreview.cheerShortTitle}
                  >
                    <Heart className={`h-3.5 w-3.5 ${cheered ? "fill-current" : ""}`} />
                  </button>
                </li>
              );
            })}
          </ol>
        </>
      )}

      <div className="flex justify-end border-t border-stone-300 pt-3 dark:border-stone-700">
        <Link href="/login?mode=signup" className={btnPrimary}>
          <span>{t.leaderboardPreview.footerCta}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
