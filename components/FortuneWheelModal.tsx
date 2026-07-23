"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Trophy, Award, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

interface FortuneWheelModalProps {
  userId: string;
  onClose: () => void;
  onRewardClaimed?: (type: string, amount: number) => void;
}

const SECTORS = [
  { label: "+50 Coins", emoji: "🪙", color: "#f59e0b", xp: 0, coins: 50 },
  { label: "+30 XP CFA", emoji: "⚡", color: "#10b981", xp: 30, coins: 0 },
  { label: "Champagne Wall St.", emoji: "🍷", color: "#8b5cf6", xp: 20, coins: 0 },
  { label: "Thẻ VN30 Hiếm", emoji: "📇", color: "#0284c7", xp: 15, coins: 25 },
  { label: "+100 Coins M&A", emoji: "🪙", color: "#eab308", xp: 0, coins: 100 },
  { label: "Hợp Đồng M&A", emoji: "📜", color: "#ec4899", xp: 50, coins: 0 },
  { label: "Rolex Executive", emoji: "⌚", color: "#6366f1", xp: 40, coins: 50 },
  { label: "Thuốc X2 XP 24H", emoji: "🧪", color: "#14b8a6", xp: 60, coins: 0 },
];

export default function FortuneWheelModal({ userId, onClose, onRewardClaimed }: FortuneWheelModalProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonSector, setWonSector] = useState<typeof SECTORS[0] | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const spinWheel = () => {
    if (spinning || hasSpunToday) return;
    setSpinning(true);
    setWonSector(null);

    // Pick random index 0-7
    const randomIndex = Math.floor(Math.random() * SECTORS.length);
    const sectorAngle = 360 / SECTORS.length;
    const targetAngle = 360 * 5 + (360 - randomIndex * sectorAngle - sectorAngle / 2);

    setRotation(targetAngle);

    setTimeout(async () => {
      setSpinning(false);
      setHasSpunToday(true);
      const prize = SECTORS[randomIndex];
      setWonSector(prize);

      toast.success(`🎉 Chúc mừng! Bạn trúng ${prize.emoji} ${prize.label}!`);

      // Update user DB
      if (userId) {
        try {
          const supabase = createClient();
          if (prize.coins > 0) {
            const { data: profile } = await supabase.from("user_profiles").select("coins").eq("id", userId).single();
            const currentCoins = profile?.coins || 0;
            await supabase.from("user_profiles").update({ coins: currentCoins + prize.coins }).eq("id", userId);
            window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: currentCoins + prize.coins } }));
          }
          onRewardClaimed?.(prize.label, prize.coins || prize.xp);
        } catch (err) {
          console.error("Error updating spin prize:", err);
        }
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-stone-900 border-2 border-amber-400/80 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-center overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
          🎡 Vòng Quay Wall Street
        </span>
        <h2 className="text-xl font-black text-stone-900 dark:text-white mt-2">
          Vòng Quay Vận Mây Phố Wall
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Quay mỗi ngày để nhận Coins, XP và xa xỉ phẩm Wall Street!
        </p>

        {/* Wheel Canvas Container */}
        <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
          {/* Wheel Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-600 drop-shadow-md" />

          {/* Rotating Wheel */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.15, 0.9, 0.2, 1] }}
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-xl overflow-hidden relative"
            style={{
              background: `conic-gradient(
                #f59e0b 0deg 45deg,
                #10b981 45deg 90deg,
                #8b5cf6 90deg 135deg,
                #0284c7 135deg 180deg,
                #eab308 180deg 225deg,
                #ec4899 225deg 270deg,
                #6366f1 270deg 315deg,
                #14b8a6 315deg 360deg
              )`,
            }}
          >
            {SECTORS.map((sec, idx) => {
              const angle = idx * 45 + 22.5;
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 left-1/2 w-full h-8 -mt-4 -ml-32 flex items-center justify-end pr-3 font-black text-white text-[11px] drop-shadow-sm pointer-events-none"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <span className="flex items-center gap-1">
                    <span>{sec.emoji}</span>
                    <span className="truncate max-w-[80px]">{sec.label}</span>
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Center Hub */}
          <div className="absolute w-14 h-14 bg-white dark:bg-stone-900 border-4 border-amber-400 rounded-full flex items-center justify-center shadow-lg z-20">
            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Prize Reveal Banner */}
        {wonSector && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300 rounded-2xl p-3 text-stone-900 dark:text-white"
          >
            <p className="text-xs font-black">
              🎁 Bạn vừa nhận được: <span className="text-amber-600 dark:text-amber-400">{wonSector.emoji} {wonSector.label}</span>
            </p>
          </motion.div>
        )}

        {/* Spin Action Button */}
        <button
          onClick={spinWheel}
          disabled={spinning || hasSpunToday}
          className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            hasSpunToday
              ? "bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed"
              : spinning
              ? "bg-amber-500/50 text-white cursor-wait animate-pulse"
              : "bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white hover:scale-105 shadow-amber-500/30"
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} />
          {spinning ? "Đang quay..." : hasSpunToday ? "Đã quay hôm nay (Quay lại ngày mai)" : "QUAY NGAY HÔM NAY (MIỄN PHÍ)"}
        </button>
      </motion.div>
    </div>
  );
}
