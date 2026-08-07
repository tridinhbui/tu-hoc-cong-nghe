"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Lock, CheckCircle2, Sparkles, Star, Shield, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface SeasonPassWidgetProps {
  userId: string;
  userLevel?: number;
  userXp?: number;
}

interface PassReward {
  level: number;
  freeReward: string;
  freeEmoji: string;
  vipReward: string;
  vipEmoji: string;
  isUnlocked: boolean;
  isClaimed: boolean;
}

// The levels/milestones themselves are structure, not copy - kept as plain
// data and paired positionally with t.seasonPass.rewards (see
// lib/i18n/dictionaries/sections/quests-referral.ts).
const REWARD_LEVELS = [1, 3, 5, 10, 15, 20, 25, 30];

export default function SeasonPassWidget({ userId, userLevel = 5, userXp = 450 }: SeasonPassWidgetProps) {
  const { t } = useI18n();
  const currentPassLevel = Math.min(30, Math.floor(userLevel * 1.5) || 1);
  const [claimedLevels, setClaimedLevels] = useState<number[]>([]);

  const REWARDS: PassReward[] = useMemo(
    () =>
      REWARD_LEVELS.map((level, i) => {
        const copy = t.seasonPass.rewards[i];
        return {
          level,
          freeReward: copy.freeReward,
          freeEmoji: copy.freeEmoji,
          vipReward: copy.vipReward,
          vipEmoji: copy.vipEmoji,
          isUnlocked: currentPassLevel >= level,
          isClaimed: claimedLevels.includes(level),
        };
      }),
    [t, currentPassLevel, claimedLevels]
  );

  const handleClaim = (reward: PassReward) => {
    if (!reward.isUnlocked || reward.isClaimed) return;
    setClaimedLevels((prev) => [...prev, reward.level]);
    toast.success(format(t.seasonPass.claimToast, { level: reward.level, emoji: reward.freeEmoji, reward: reward.freeReward }));
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800/40 rounded-3xl p-5 shadow-sm relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
            {t.seasonPass.badge}
          </span>
          <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
            {t.seasonPass.title}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {t.seasonPass.subtitle}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-700 px-4 py-2 rounded-2xl text-right">
          <span className="text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 block">{t.seasonPass.levelLabel}</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400">{format(t.seasonPass.levelValue, { level: currentPassLevel })}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-3 mb-6 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentPassLevel / 30) * 100}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 rounded-full shadow-inner"
        />
      </div>

      {/* Pass Tracks Carousel / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REWARDS.map((r) => (
          <div
            key={r.level}
            className={`border-2 rounded-2xl p-4 transition-all relative overflow-hidden flex flex-col justify-between ${
              r.isClaimed
                ? "bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 opacity-70"
                : r.isUnlocked
                ? "bg-gradient-to-b from-amber-50/80 to-white dark:from-amber-950/30 dark:to-stone-900 border-amber-400 dark:border-amber-700 shadow-md"
                : "bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                {format(t.seasonPass.milestoneLabel, { level: r.level })}
              </span>
              {r.isClaimed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : r.isUnlocked ? (
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              ) : (
                <Lock className="w-4 h-4 text-stone-400" />
              )}
            </div>

            {/* Reward Items */}
            <div className="space-y-2 mb-4">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 rounded-xl flex items-center gap-2">
                <span className="text-xl">{r.freeEmoji}</span>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black uppercase text-stone-400 block">{t.seasonPass.freeLabel}</span>
                  <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate">{r.freeReward}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30 border border-amber-300 dark:border-amber-700/60 p-2 rounded-xl flex items-center gap-2">
                <span className="text-xl">{r.vipEmoji}</span>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 block">{t.seasonPass.vipLabel}</span>
                  <p className="text-xs font-black text-amber-700 dark:text-amber-300 truncate">{r.vipReward}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleClaim(r)}
              disabled={!r.isUnlocked || r.isClaimed}
              className={`w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                r.isClaimed
                  ? "bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-default"
                  : r.isUnlocked
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 hover:scale-105 shadow-md"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed"
              }`}
            >
              {r.isClaimed ? t.seasonPass.claimed : r.isUnlocked ? t.seasonPass.claim : t.seasonPass.locked}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
