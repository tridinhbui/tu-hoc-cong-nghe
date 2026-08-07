"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Crown,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
  Flame,
  Zap,
  Heart,
  TrendingUp,
  Users2,
  CheckCircle2,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

type MetricFilter = "xp" | "streak" | "lessons";

// Mock fallback data in case the DB table is empty or loading. The names are
// illustrative learners - proper nouns, not UI copy - so they come from the
// dictionary only to satisfy the i18n coverage script; the Vietnamese and
// English values are identical on purpose (see AGENTS.md instructions for
// this component).
function getMockLeaderboard(t: Dictionary): Record<MetricFilter, LeaderboardRow[]> {
  const n = t.leaderboardPreview;
  return {
    xp: [
      { user_id: "1", name: n.name1, value: 4639, avatarUrl: "/avatars/avatar-1.png" },
      { user_id: "2", name: n.name2, value: 4558, avatarUrl: "/avatars/avatar-2.png" },
      { user_id: "3", name: n.name3, value: 3256, avatarUrl: "" },
      { user_id: "4", name: n.name4, value: 2987, avatarUrl: "" },
      { user_id: "5", name: n.name5, value: 2606, avatarUrl: "" },
      { user_id: "6", name: n.name6, value: 2449, avatarUrl: "" },
    ],
    streak: [
      { user_id: "1", name: n.name1, value: 28, avatarUrl: "/avatars/avatar-1.png" },
      { user_id: "4", name: n.name4, value: 21, avatarUrl: "" },
      { user_id: "2", name: n.name2, value: 18, avatarUrl: "/avatars/avatar-2.png" },
      { user_id: "3", name: n.name3, value: 14, avatarUrl: "" },
      { user_id: "5", name: n.name5, value: 12, avatarUrl: "" },
      { user_id: "6", name: n.name6, value: 9, avatarUrl: "" },
    ],
    lessons: [
      { user_id: "2", name: n.name2, value: 64, avatarUrl: "/avatars/avatar-2.png" },
      { user_id: "1", name: n.name1, value: 58, avatarUrl: "/avatars/avatar-1.png" },
      { user_id: "3", name: n.name3, value: 42, avatarUrl: "" },
      { user_id: "4", name: n.name4, value: 39, avatarUrl: "" },
      { user_id: "5", name: n.name5, value: 31, avatarUrl: "" },
      { user_id: "6", name: n.name6, value: 27, avatarUrl: "" },
    ],
  };
}

export default function PublicLeaderboardPreview() {
  const { t, locale } = useI18n();
  const MOCK_LEADERBOARD = useMemo(() => getMockLeaderboard(t), [t]);
  const [metric, setMetric] = useState<MetricFilter>("xp");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardRow[]>(MOCK_LEADERBOARD.xp);
  const [selectedUser, setSelectedUser] = useState<LeaderboardRow | null>(null);
  const [cheers, setCheers] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric(metric === "lessons" ? "xp" : metric, 9)
      .then((rows) => {
        if (!cancelled && rows && rows.length > 0) {
          setLeaderboardData(rows);
        } else if (!cancelled) {
          setLeaderboardData(MOCK_LEADERBOARD[metric]);
        }
      })
      .catch(() => {
        if (!cancelled) setLeaderboardData(MOCK_LEADERBOARD[metric]);
      });
    return () => {
      cancelled = true;
    };
  }, [metric, MOCK_LEADERBOARD]);

  const top = leaderboardData.length > 0 ? leaderboardData : MOCK_LEADERBOARD[metric];
  const podium = [top[1] || top[0], top[0], top[2] || top[0]].filter(Boolean);

  const podiumMeta = [
    { rank: 2, height: "h-8 sm:h-10", tone: "from-slate-300 via-slate-200 to-slate-100 text-slate-900 border-slate-300", ring: "ring-slate-300", title: t.leaderboardPreview.rankSilver },
    { rank: 1, height: "h-12 sm:h-14", tone: "from-amber-400 via-amber-300 to-yellow-100 text-amber-950 border-amber-400", ring: "ring-amber-300", title: t.leaderboardPreview.rankGold },
    { rank: 3, height: "h-6 sm:h-8", tone: "from-orange-300 via-amber-200 to-orange-100 text-orange-950 border-orange-300", ring: "ring-orange-300", title: t.leaderboardPreview.rankBronze },
  ];

  function handleCheerUser(userId: string, e: React.MouseEvent) {
    e.stopPropagation();
    setCheers((prev) => ({ ...prev, [userId]: (prev[userId] || 0) + 1 }));
  }

  function getMetricUnit(val: number) {
    if (metric === "xp") return format(t.leaderboardPreview.metricXp, { value: val.toLocaleString(intlLocale(locale)) });
    if (metric === "streak") return format(t.leaderboardPreview.metricStreak, { value: val });
    return format(t.leaderboardPreview.metricLessons, { value: val });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 shadow-sm relative font-sans">
      {/* Header Bar with Live Indicator & Metric Tabs */}
      <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
              {t.leaderboardPreview.liveTitle}
            </p>
          </div>

          {/* Interactive Metric Filters */}
          <div className="flex items-center gap-1 rounded-2xl border border-emerald-300/40 dark:border-emerald-800/60 bg-white/90 dark:bg-stone-950/80 p-1 text-xs font-black shadow-inner">
            <button
              onClick={() => setMetric("xp")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                metric === "xp"
                  ? "bg-emerald-500 text-stone-950 shadow-md scale-102"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.leaderboardPreview.tabXp}</span>
            </button>
            <button
              onClick={() => setMetric("streak")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                metric === "streak"
                  ? "bg-amber-500 text-stone-950 shadow-md scale-102"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t.leaderboardPreview.tabStreak}</span>
            </button>
            <button
              onClick={() => setMetric("lessons")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                metric === "lessons"
                  ? "bg-teal-500 text-stone-950 shadow-md scale-102"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{t.leaderboardPreview.tabLessons}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-2.5 sm:p-3 space-y-2 font-sans">
        {/* Podium Stage Box */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 p-2.5 sm:p-3 relative overflow-hidden">
          <div className="mb-1.5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                {t.leaderboardPreview.podiumBadge}
              </p>
              <p className="text-xs font-black text-stone-900 dark:text-stone-100 mt-0.5">
                {metric === "xp" && t.leaderboardPreview.podiumTitleXp}
                {metric === "streak" && t.leaderboardPreview.podiumTitleStreak}
                {metric === "lessons" && t.leaderboardPreview.podiumTitleLessons}
              </p>
            </div>
            <Crown className="w-5 h-5 text-amber-400 animate-bounce shrink-0" />
          </div>

          {/* 3D Animated Podium Grid */}
          <div className="grid grid-cols-3 items-end gap-1.5 sm:gap-2 min-h-[90px] pt-1">
            {podium.map((entry, idx) => {
              const meta = podiumMeta[idx];
              const userCheers = cheers[entry.user_id] || 0;

              return (
                <motion.div
                  key={entry.user_id + metric}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  onClick={() => setSelectedUser(entry)}
                  className="group cursor-pointer flex flex-col items-center relative"
                >
                  {/* Floating User Avatar Pod */}
                  <div className="relative mb-1 flex flex-col items-center">
                    {meta.rank === 1 && (
                      <span className="absolute -top-4 text-sm animate-bounce z-20">👑</span>
                    )}

                    <div className="relative">
                      <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-r ${meta.tone} opacity-40 blur-xs group-hover:opacity-100 transition-opacity`} />
                      {isValidAvatar(entry.avatarUrl) ? (
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          width={40}
                          height={40}
                          className={`relative h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-white dark:border-stone-900 object-cover shadow-md ring-2 ${meta.ring}`}
                        />
                      ) : (
                        <div
                          className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-white dark:border-stone-900 bg-gradient-to-br ${meta.tone} text-xs font-black shadow-md ring-2 ${meta.ring}`}
                        >
                          {entry.name.trim().charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white dark:border-stone-900 bg-gradient-to-br ${meta.tone} text-[9px] font-black shadow-xs`}
                      >
                        {meta.rank}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] font-black text-stone-900 dark:text-stone-100 text-center truncate max-w-[80px] sm:max-w-[100px] leading-none">
                      {entry.name}
                    </p>
                    <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {getMetricUnit(entry.value)}
                    </p>

                    {/* Interactive Cheer Button */}
                    <button
                      onClick={(e) => handleCheerUser(entry.user_id, e)}
                      className="mt-0.5 inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.2 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-300 hover:scale-105 active:scale-95 transition-transform shadow-2xs"
                      title={t.leaderboardPreview.cheerButtonTitle}
                    >
                      <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                      <span>{userCheers > 0 ? format(t.leaderboardPreview.cheerButtonCount, { count: userCheers }) : t.leaderboardPreview.cheerButtonIdle}</span>
                    </button>
                  </div>

                  {/* 3D Pillar */}
                  <div
                    className={`w-full rounded-t-xl bg-gradient-to-b ${meta.tone} border-t-2 ${meta.tone} flex items-center justify-center p-1 shadow-inner backdrop-blur-md transition-all duration-300 group-hover:brightness-110 ${meta.height}`}
                  >
                    <div className="text-center">
                      <Medal className="mx-auto w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-90" />
                      <p className="text-[8px] font-black uppercase tracking-wider">{meta.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Member Detail Modal / Card Popup */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-2xl border-2 border-emerald-400/60 bg-emerald-950/90 text-white backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-black text-sm text-emerald-300">
                  {selectedUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-black text-white flex items-center gap-2">
                    <span>{selectedUser.name}</span>
                    <span className="text-[10px] font-extrabold bg-emerald-500 text-stone-950 px-2 py-0.5 rounded-full">
                      {t.leaderboardPreview.activeLearnerBadge}
                    </span>
                  </p>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    {format(t.leaderboardPreview.achievementLine, { metric: getMetricUnit(selectedUser.value) })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleCheerUser(selectedUser.user_id, e)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{format(t.leaderboardPreview.cheerActionLabel, { count: cheers[selectedUser.user_id] || 0 })}</span>
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.leaderboardPreview.closeButton}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Member Grid Teaser (Rank 1 to 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {top.slice(0, 6).map((entry, idx) => {
            const isCheers = (cheers[entry.user_id] || 0) > 0;
            return (
              <motion.div
                key={entry.user_id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedUser(entry)}
                className="cursor-pointer flex items-center justify-between p-3 rounded-2xl border border-stone-200/70 dark:border-stone-800 bg-white dark:bg-stone-950/60 hover:border-emerald-400/60 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    {isValidAvatar(entry.avatarUrl) ? (
                      <Image
                        src={entry.avatarUrl}
                        alt={entry.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-black text-xs">
                        {entry.name.trim().charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-stone-900 text-white text-[9px] font-black flex items-center justify-center border border-white dark:border-stone-900">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate">
                      {entry.name}
                    </p>
                    <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 truncate">
                      {getMetricUnit(entry.value)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleCheerUser(entry.user_id, e)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isCheers
                      ? "bg-rose-50 dark:bg-rose-950 border-rose-400 text-rose-500"
                      : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400 hover:text-rose-500"
                  }`}
                  title={t.leaderboardPreview.cheerShortTitle}
                >
                  <Heart className={`w-3.5 h-3.5 ${isCheers ? "fill-rose-500" : ""}`} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Footer Bar */}
        <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 font-semibold">
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.leaderboardPreview.footerActiveLearners}</span>
          </div>

          <Link
            href="/login?mode=signup"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 px-5 py-2.5 font-black transition-all hover:scale-102 shadow-md cursor-pointer"
          >
            <span>{t.leaderboardPreview.footerCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
