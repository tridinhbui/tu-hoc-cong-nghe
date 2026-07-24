"use client";

import { useEffect, useState } from "react";
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

type MetricFilter = "xp" | "streak" | "lessons";

// Mock Fallback Data in case DB table is empty or loading
const MOCK_LEADERBOARD: Record<MetricFilter, LeaderboardRow[]> = {
  xp: [
    { user_id: "1", name: "Thúy Đặng", value: 4639, avatarUrl: "/avatars/avatar-1.png" },
    { user_id: "2", name: "Con đố finance", value: 4558, avatarUrl: "/avatars/avatar-2.png" },
    { user_id: "3", name: "Kim Anh Vũ", value: 3256, avatarUrl: "" },
    { user_id: "4", name: "Minh Huy", value: 2987, avatarUrl: "" },
    { user_id: "5", name: "Ân Triệu Ca", value: 2606, avatarUrl: "" },
    { user_id: "6", name: "Dead Poets Society", value: 2449, avatarUrl: "" },
  ],
  streak: [
    { user_id: "1", name: "Thúy Đặng", value: 28, avatarUrl: "/avatars/avatar-1.png" },
    { user_id: "4", name: "Minh Huy", value: 21, avatarUrl: "" },
    { user_id: "2", name: "Con đố finance", value: 18, avatarUrl: "/avatars/avatar-2.png" },
    { user_id: "3", name: "Kim Anh Vũ", value: 14, avatarUrl: "" },
    { user_id: "5", name: "Ân Triệu Ca", value: 12, avatarUrl: "" },
    { user_id: "6", name: "Dead Poets Society", value: 9, avatarUrl: "" },
  ],
  lessons: [
    { user_id: "2", name: "Con đố finance", value: 64, avatarUrl: "/avatars/avatar-2.png" },
    { user_id: "1", name: "Thúy Đặng", value: 58, avatarUrl: "/avatars/avatar-1.png" },
    { user_id: "3", name: "Kim Anh Vũ", value: 42, avatarUrl: "" },
    { user_id: "4", name: "Minh Huy", value: 39, avatarUrl: "" },
    { user_id: "5", name: "Ân Triệu Ca", value: 31, avatarUrl: "" },
    { user_id: "6", name: "Dead Poets Society", value: 27, avatarUrl: "" },
  ],
};

export default function PublicLeaderboardPreview() {
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
  }, [metric]);

  const top = leaderboardData.length > 0 ? leaderboardData : MOCK_LEADERBOARD[metric];
  const podium = [top[1] || top[0], top[0], top[2] || top[0]].filter(Boolean);

  const podiumMeta = [
    { rank: 2, height: "h-16 sm:h-20", tone: "from-slate-300 via-slate-200 to-slate-100 text-slate-900 border-slate-300", ring: "ring-slate-300", title: "BẠC 🥈" },
    { rank: 1, height: "h-22 sm:h-26", tone: "from-amber-400 via-amber-300 to-yellow-100 text-amber-950 border-amber-400", ring: "ring-amber-300", title: "VÀNG 🥇" },
    { rank: 3, height: "h-14 sm:h-16", tone: "from-orange-300 via-amber-200 to-orange-100 text-orange-950 border-orange-300", ring: "ring-orange-300", title: "ĐỒNG 🥉" },
  ];

  function handleCheerUser(userId: string, e: React.MouseEvent) {
    e.stopPropagation();
    setCheers((prev) => ({ ...prev, [userId]: (prev[userId] || 0) + 1 }));
  }

  function getMetricUnit(val: number) {
    if (metric === "xp") return `${val.toLocaleString("vi-VN")} XP`;
    if (metric === "streak") return `${val} ngày streak`;
    return `${val} bài hoàn thành`;
  }

  return (
    <div className="animated-border-card relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-stone-900 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.3)]">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-[-10%] bottom-[-10%] h-64 w-64 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
      </div>

      {/* Header Bar with Live Indicator & Metric Tabs */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-emerald-50/90 dark:from-emerald-950/50 dark:via-teal-950/40 dark:to-emerald-950/50 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
              BẢNG VINH DANH LIVE HỌC VIÊN
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
              <span>Top XP</span>
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
              <span>Streak</span>
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
              <span>Số bài học</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3.5 sm:p-4 space-y-3 font-sans">
        {/* Podium Stage Box */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 p-3 sm:p-4 relative overflow-hidden">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                BỤC VINH QUANG 🏆
              </p>
              <p className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
                {metric === "xp" && "Học viên xuất sắc nhất tuần này"}
                {metric === "streak" && "Top học viên kiên trì giữ chuỗi streak"}
                {metric === "lessons" && "Học viên chinh phục nhiều bài học nhất"}
              </p>
            </div>
            <Crown className="w-6 h-6 text-amber-400 animate-bounce shrink-0" />
          </div>

          {/* 3D Animated Podium Grid */}
          <div className="grid grid-cols-3 items-end gap-2 sm:gap-3 min-h-[150px] pt-2">
            {podium.map((entry, idx) => {
              const meta = podiumMeta[idx];
              const userCheers = cheers[entry.user_id] || 0;
              const isSelected = selectedUser?.user_id === entry.user_id;

              return (
                <motion.div
                  key={entry.user_id + metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  onClick={() => setSelectedUser(entry)}
                  className="group cursor-pointer flex flex-col items-center relative"
                >
                  {/* Floating User Avatar Pod */}
                  <div className="relative mb-2 flex flex-col items-center">
                    {meta.rank === 1 && (
                      <span className="absolute -top-6 text-xl animate-bounce z-20">👑</span>
                    )}

                    <div className="relative">
                      <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${meta.tone} opacity-50 blur-md group-hover:opacity-100 transition-opacity`} />
                      {isValidAvatar(entry.avatarUrl) ? (
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          width={56}
                          height={56}
                          className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white dark:border-stone-900 object-cover shadow-lg ring-4 ${meta.ring}`}
                        />
                      ) : (
                        <div
                          className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white dark:border-stone-900 bg-gradient-to-br ${meta.tone} text-base font-black shadow-lg ring-4 ${meta.ring}`}
                        >
                          {entry.name.trim().charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                      <span
                        className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white dark:border-stone-900 bg-gradient-to-br ${meta.tone} text-xs font-black shadow-md`}
                      >
                        {meta.rank}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 text-center truncate max-w-[90px] sm:max-w-[120px]">
                      {entry.name}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {getMetricUnit(entry.value)}
                    </p>

                    {/* Interactive Cheer Button on Hover/Touch */}
                    <button
                      onClick={(e) => handleCheerUser(entry.user_id, e)}
                      className="mt-1 inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-300 hover:scale-110 active:scale-95 transition-transform shadow-xs"
                      title="Bấm để cổ vũ học viên"
                    >
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>{userCheers > 0 ? `+${userCheers}` : "Thả tim"}</span>
                    </button>
                  </div>

                  {/* 3D Pillar */}
                  <div
                    className={`w-full rounded-t-2xl bg-gradient-to-b ${meta.tone} border-t-2 ${meta.tone} flex items-center justify-center p-2 shadow-inner backdrop-blur-md transition-all duration-300 group-hover:brightness-110 ${meta.height}`}
                  >
                    <div className="text-center">
                      <Medal className="mx-auto w-5 h-5 sm:w-6 sm:h-6 opacity-90" />
                      <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider">{meta.title}</p>
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
                      Học viên tích cực
                    </span>
                  </p>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Thành tích: {getMetricUnit(selectedUser.value)} · CFA Candidate
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleCheerUser(selectedUser.user_id, e)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Cổ vũ (+{cheers[selectedUser.user_id] || 0})</span>
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Đóng
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
                  title="Cổ vũ"
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
            <span>Hơn 430+ học viên đang duy trì nhịp học mỗi ngày</span>
          </div>

          <Link
            href="/login?mode=signup"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 px-5 py-2.5 font-black transition-all hover:scale-102 shadow-md cursor-pointer"
          >
            <span>Vào học cùng cộng đồng</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
