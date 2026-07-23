"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Lock, CheckCircle2, Sparkles, Star, Shield, ChevronRight } from "lucide-react";
import { toast } from "sonner";

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

export default function SeasonPassWidget({ userId, userLevel = 5, userXp = 450 }: SeasonPassWidgetProps) {
  const currentPassLevel = Math.min(30, Math.floor(userLevel * 1.5) || 1);
  const [claimedLevels, setClaimedLevels] = useState<number[]>([]);

  const REWARDS: PassReward[] = [
    { level: 1, freeReward: "+50 Coins", freeEmoji: "🪙", vipReward: "+100 Coins", vipEmoji: "💰", isUnlocked: currentPassLevel >= 1, isClaimed: claimedLevels.includes(1) },
    { level: 3, freeReward: "X2 XP Scroll 1H", freeEmoji: "📜", vipReward: "Rolex Submariner", vipEmoji: "⌚", isUnlocked: currentPassLevel >= 3, isClaimed: claimedLevels.includes(3) },
    { level: 5, freeReward: "Bút Vàng M&A", freeEmoji: "🖋️", vipReward: "Kính Bloomberg", vipEmoji: "🕶️", isUnlocked: currentPassLevel >= 5, isClaimed: claimedLevels.includes(5) },
    { level: 10, freeReward: "Vest Armani", freeEmoji: "👔", vipReward: "Hào Quang Phố Wall", vipEmoji: "✨", isUnlocked: currentPassLevel >= 10, isClaimed: claimedLevels.includes(10) },
    { level: 15, freeReward: "Thẻ VN30 Vinamilk", freeEmoji: "📇", vipReward: "+500 Coins", vipEmoji: "💎", isUnlocked: currentPassLevel >= 15, isClaimed: claimedLevels.includes(15) },
    { level: 20, freeReward: "Thắt Lưng Hermes", freeEmoji: "🎗️", vipReward: "Cúp Vô Địch NYSE", vipEmoji: "🏆", isUnlocked: currentPassLevel >= 20, isClaimed: claimedLevels.includes(20) },
    { level: 25, freeReward: "Title 'Wall Street Shark'", freeEmoji: "🦈", vipReward: "Siêu Xe Wall St.", vipEmoji: "🏎️", isUnlocked: currentPassLevel >= 25, isClaimed: claimedLevels.includes(25) },
    { level: 30, freeReward: "Golden Crown Legend", freeEmoji: "👑", vipReward: "Wall Street Legend", vipEmoji: "🏛️", isUnlocked: currentPassLevel >= 30, isClaimed: claimedLevels.includes(30) },
  ];

  const handleClaim = (reward: PassReward) => {
    if (!reward.isUnlocked || reward.isClaimed) return;
    setClaimedLevels((prev) => [...prev, reward.level]);
    toast.success(`🎉 Đã nhận thưởng Season Pass Cấp ${reward.level}: ${reward.freeEmoji} ${reward.freeReward}!`);
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800/40 rounded-3xl p-5 shadow-sm relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
            📜 Season 1: Wall Street Empire Pass
          </span>
          <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
            Thẻ Mùa Chiến Thắng Wall Street (30 Cấp)
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Tích lũy Season XP để mở khóa danh hiệu, phụ kiện Armani & Rolex đẳng cấp!
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-700 px-4 py-2 rounded-2xl text-right">
          <span className="text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 block">Season Pass Level</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400">Lv. {currentPassLevel} / 30</span>
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
                Mốc Lv.{r.level}
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
                  <span className="text-[9px] font-black uppercase text-stone-400 block">Miễn Phí</span>
                  <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate">{r.freeReward}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30 border border-amber-300 dark:border-amber-700/60 p-2 rounded-xl flex items-center gap-2">
                <span className="text-xl">{r.vipEmoji}</span>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 block">VIP Pass</span>
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
              {r.isClaimed ? "Đã Nhận" : r.isUnlocked ? "Nhận Thưởng" : "Chưa Mở"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
