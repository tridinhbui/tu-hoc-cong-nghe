"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, ArrowRight, Gift } from "lucide-react";

interface UnifiedSuccessScreenProps {
  xpEarned: number;
  newOverallLevel: number;
  reward: {
    hasReward: boolean;
    rewardType?: "xp" | "coin" | "card";
    rewardValue?: number | string;
    rewardName?: string;
  };
  unlockedSkills: Array<{ id: string; name: string }>;
  onClose: () => void;
}

export default function UnifiedSuccessScreen({
  xpEarned,
  newOverallLevel,
  reward,
  unlockedSkills,
  onClose
}: UnifiedSuccessScreenProps) {
  const [chestOpened, setChestOpened] = useState(false);

  return (
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-900 mb-4 animate-bounce">
          <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h2 className="text-2xl font-black text-stone-900 dark:text-white">
          Bài Học Hoàn Thành! 🎉
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Nỗ lực học tập của bạn hôm nay đã được ghi nhận xứng đáng.
        </p>

        {/* XP & Level Summary */}
        <div className="bg-stone-50 dark:bg-stone-950/40 border border-stone-250/10 rounded-2xl p-4 my-6 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500 dark:text-stone-400 font-medium">XP tích lũy được:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">+{xpEarned} XP</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Finance Level hiện tại:</span>
            <span className="font-extrabold text-amber-500">Lv. {newOverallLevel}</span>
          </div>
        </div>

        {/* Random Chest Reward Area */}
        {reward.hasReward && (
          <div className="border border-dashed border-amber-300 dark:border-amber-900/60 rounded-2xl p-4 my-4 bg-amber-50/20 dark:bg-amber-950/10">
            <h4 className="text-xs uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
              <Gift className="w-3.5 h-3.5" /> Bạn nhận được 1 Hộp quà May Mắn!
            </h4>
            
            <AnimatePresence mode="wait">
              {!chestOpened ? (
                <motion.button
                  key="closed"
                  onClick={() => setChestOpened(true)}
                  whileHover={{ scale: 1.03 }}
                  className="mt-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Bấm để mở hộp quà
                </motion.button>
              ) : (
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm font-black text-stone-900 dark:text-white flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {reward.rewardName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Skill tree unlock notice */}
        {unlockedSkills.length > 0 && (
          <div className="text-left text-xs bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-950 rounded-2xl p-3.5 mb-6">
            <span className="font-bold text-sky-700 dark:text-sky-400 block mb-1">
              🔓 Kỹ năng mới được mở khóa trên Skill Tree:
            </span>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-300">
              {unlockedSkills.map(skill => (
                <li key={skill.id} className="font-medium">{skill.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-2 mt-6">
          <button
            onClick={onClose}
            className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-stone-850 dark:hover:bg-stone-100 transition-colors shadow-sm"
          >
            Tiếp tục lộ trình <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
