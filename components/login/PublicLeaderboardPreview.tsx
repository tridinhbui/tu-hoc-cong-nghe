"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Crown, Medal, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";
import { isValidAvatar } from "@/lib/avatar-utils";

// Small public teaser of the real leaderboard, shown to signed-out visitors
// on the homepage - social proof that real people are actively using the
// site, not just a claim in the hero copy. Degrades to nothing if the data
// isn't available yet (fresh install, RPC not migrated) rather than showing
// an empty/broken card to a cold visitor.
export default function PublicLeaderboardPreview() {
  const [top, setTop] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric("xp", 9)
      .then((rows) => {
        if (!cancelled) setTop(rows);
      })
      .catch((error) => console.error("Error loading public leaderboard preview:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  if (top.length === 0) return null;

  const podium = [top[1], top[0], top[2]].filter(Boolean);
  const podiumMeta = [
    { rank: 2, height: "h-24", tone: "from-slate-200 to-slate-100 text-slate-800", ring: "ring-slate-200", title: "Bạc" },
    { rank: 1, height: "h-32", tone: "from-amber-300 to-yellow-100 text-amber-950", ring: "ring-amber-200", title: "Vàng" },
    { rank: 3, height: "h-20", tone: "from-orange-200 to-amber-100 text-orange-950", ring: "ring-orange-200", title: "Đồng" },
  ];
  const badgePreview = [
    { icon: Trophy, label: "Top XP tuần", value: `${top[0]?.value?.toLocaleString("vi-VN") ?? 0} XP` },
    { icon: ShieldCheck, label: "Chuỗi học", value: "Duy trì mỗi ngày" },
    { icon: Award, label: "Huy hiệu", value: "Nhà phân tích" },
  ];

  return (
    <div className="animated-border-card relative overflow-hidden rounded-[20px] border border-stone-200/80 bg-white shadow-[0_16px_40px_-28px_rgba(16,185,129,0.28)] dark:border-stone-800 dark:bg-stone-900">
      <style>{`
        @keyframes leaderboard-podium-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes leaderboard-soft-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(16,185,129,0.0); }
          50% { box-shadow: 0 12px 32px rgba(245,158,11,0.16); }
        }
        @keyframes leaderboard-badge-pulse {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        .leaderboard-podium-float {
          animation: leaderboard-podium-float 4.8s ease-in-out infinite;
        }
        .leaderboard-soft-glow {
          animation: leaderboard-soft-glow 4.2s ease-in-out infinite;
        }
        .leaderboard-badge-pulse {
          animation: leaderboard-badge-pulse 3s ease-in-out infinite;
        }
        .leaderboard-scan {
          animation: leaderboard-podium-float 6s ease-in-out infinite;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8%] top-[-10%] h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-[-12%] bottom-[-15%] h-48 w-48 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="leaderboard-scan absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),transparent)] opacity-45" />
      </div>
      <div className="border-b border-stone-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 dark:border-stone-800 dark:from-emerald-950/35 dark:to-teal-950/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              Bảng vinh danh live
            </p>
          </div>
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-black text-stone-600 ring-1 ring-emerald-100 dark:bg-stone-950/50 dark:text-stone-300 dark:ring-emerald-900"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Cập nhật trực tiếp
          </motion.div>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-[20px] border border-stone-100 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/35">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                Bục vinh quang
              </p>
              <p className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">
                Top học viên theo XP
              </p>
            </div>
            <Crown className="h-7 w-7 text-amber-400" />
          </div>

          <div className="grid min-h-[190px] grid-cols-3 items-end gap-2">
            {podium.map((entry, idx) => {
              const meta = podiumMeta[idx];
              return (
                <motion.div
                  key={entry.user_id}
                  className="leaderboard-podium-float flex min-w-0 flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: idx * 0.06 }}
                >
                  <div className="relative mb-2">
                    <span className={`absolute -inset-1.5 rounded-full bg-gradient-to-r ${meta.tone} opacity-70 blur-md`} />
                    {isValidAvatar(entry.avatarUrl) ? (
                      <Image
                        src={entry.avatarUrl}
                        alt={entry.name}
                        width={48}
                        height={48}
                        className={`relative h-12 w-12 rounded-full border border-white object-cover shadow-[0_10px_24px_-18px_rgba(15,23,42,0.28)] ring-4 ${meta.ring} dark:border-stone-900`}
                      />
                    ) : (
                      <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-white bg-gradient-to-br ${meta.tone} text-sm font-black shadow-[0_10px_24px_-18px_rgba(15,23,42,0.28)] ring-4 ${meta.ring} dark:border-stone-900`}>
                        {entry.name.trim().charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${meta.tone} text-[10px] font-black shadow-sm dark:border-stone-900`}>
                      {meta.rank}
                    </span>
                  </div>
                  <p className="max-w-full truncate text-center text-xs font-black text-stone-900 dark:text-stone-100">
                    {entry.name}
                  </p>
                  <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400">
                    {entry.value.toLocaleString("vi-VN")} XP
                  </p>
                  <div className={`leaderboard-soft-glow mt-2 flex w-full items-end justify-center rounded-t-[20px] bg-gradient-to-b ${meta.tone} px-2 pb-3 pt-2 shadow-inner ${meta.height}`}>
                    <div className="text-center">
                      <Medal className="mx-auto h-5 w-5 opacity-80" />
                      <p className="mt-1 text-[10px] font-black uppercase tracking-wide">{meta.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {badgePreview.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              className="leaderboard-badge-pulse rounded-[20px] border border-stone-100 bg-white px-3 py-2.5 dark:border-stone-800 dark:bg-stone-950/40 shadow-[0_8px_20px_-18px_rgba(15,23,42,0.2)]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.08 }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-black uppercase tracking-wide text-stone-400">{label}</p>
                  <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3">
          {top.slice(0, 6).map((entry, idx) => (
            <motion.div
              key={entry.user_id}
              className="flex min-w-0 items-center gap-2 rounded-[18px] border border-stone-100 bg-stone-50/70 px-2.5 py-2 dark:border-stone-800 dark:bg-stone-800/40 shadow-[0_8px_20px_-18px_rgba(15,23,42,0.14)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: idx * 0.03 }}
            >
              <div className="relative flex-shrink-0">
                {isValidAvatar(entry.avatarUrl) ? (
                  <Image
                    src={entry.avatarUrl}
                    alt={entry.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full border border-stone-200 object-cover dark:border-stone-700"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-[11px] font-extrabold text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                    {entry.name.trim().charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-stone-900 text-[8px] font-extrabold text-white dark:border-stone-900">
                  {idx + 1}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">
                  {entry.name}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">{entry.value.toLocaleString("vi-VN")} XP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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
