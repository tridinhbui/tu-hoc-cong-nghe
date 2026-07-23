"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, Trophy, RefreshCw, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import GoldCoinIcon from "@/components/GoldCoinIcon";

interface CandlestickQuestion {
  id: number;
  patternName: string;
  trend: "bullish" | "bearish";
  description: string;
  candles: { type: "green" | "red"; height: number; wickTop: number; wickBottom: number }[];
}

const PATTERNS: CandlestickQuestion[] = [
  {
    id: 1,
    patternName: "Mô hình Nến Búa (Hammer Candle)",
    trend: "bullish",
    description: "Thân nhỏ ở trên, bóng nến dưới dài gấp 2-3 lần thân. Tín hiệu đảo chiều tăng giá mạnh!",
    candles: [
      { type: "red", height: 40, wickTop: 5, wickBottom: 15 },
      { type: "red", height: 30, wickTop: 5, wickBottom: 20 },
      { type: "green", height: 20, wickTop: 5, wickBottom: 65 },
    ],
  },
  {
    id: 2,
    patternName: "Mô hình Nến Nhấn Chìm Tăng (Bullish Engulfing)",
    trend: "bullish",
    description: "Nến xanh lớn bao trùm toàn bộ nến đỏ phía trước. Phe Mua áp đảo hoàn toàn phe Bán!",
    candles: [
      { type: "red", height: 30, wickTop: 10, wickBottom: 10 },
      { type: "green", height: 75, wickTop: 8, wickBottom: 8 },
    ],
  },
  {
    id: 3,
    patternName: "Mô hình Nến Sao Băng (Shooting Star)",
    trend: "bearish",
    description: "Bóng nến trên dài ngoằng, thân nhỏ ở dưới. Tín hiệu đảo chiều giảm giá khốc liệt!",
    candles: [
      { type: "green", height: 45, wickTop: 10, wickBottom: 5 },
      { type: "red", height: 20, wickTop: 65, wickBottom: 5 },
    ],
  },
];

export default function CandlestickGame({ onBack, completedLessonIds = [] }: { onBack?: () => void; completedLessonIds?: number[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = PATTERNS[currentIndex];

  const handleGuess = (trend: "bullish" | "bearish") => {
    if (trend === currentQ.trend) {
      const addedScore = 50 + streak * 10;
      setScore((s) => s + addedScore);
      setStreak((s) => s + 1);
      toast.success(`📈 CHÍNH XÁC! +${addedScore} ĐIỂM (${currentQ.patternName})`);
    } else {
      setStreak(0);
      toast.error(`📉 SAI RỒI! ${currentQ.patternName} báo hiệu ${currentQ.trend === "bullish" ? "TĂNG GIÁ 📈" : "GIẢM GIÁ 📉"}`);
    }

    if (currentIndex < PATTERNS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-black text-stone-600 hover:text-amber-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Bản Đồ
          </button>
        )}
        <div className="text-center flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            📊 NYSE Central District
          </span>
          <h2 className="text-xl font-black text-stone-900 mt-1">
            Sàn Giao Dịch Nến Nhật 10S
          </h2>
          <p className="text-[10px] font-bold text-amber-700 mt-0.5">
            🎯 Đồng bộ với {completedLessonIds.length} bài học Phân Tích Kỹ Thuật của bạn
          </p>
        </div>
        <div className="flex items-center gap-1 font-black text-amber-600 text-sm">
          <GoldCoinIcon className="w-4 h-4" /> {score} pts
        </div>
      </div>

      {!isFinished ? (
        <div className="text-center space-y-6">
          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 flex items-center justify-center gap-6 min-h-[180px]">
            {currentQ.candles.map((c, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center relative w-12 h-36">
                {/* Wick */}
                <div
                  className="w-1 bg-stone-400 rounded-full absolute"
                  style={{ top: `${100 - c.height - c.wickTop}%`, height: `${c.height + c.wickTop + c.wickBottom}%` }}
                />
                {/* Body */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-8 rounded-md z-10 shadow-sm ${
                    c.type === "green"
                      ? "bg-emerald-500 border border-emerald-400"
                      : "bg-rose-500 border border-rose-400"
                  }`}
                  style={{ height: `${c.height}%` }}
                />
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-black text-stone-900">
              {currentQ.patternName}
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              {currentQ.description}
            </p>
          </div>

          {/* Action Buttons: Bullish vs Bearish */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleGuess("bullish")}
              className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-base shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-5 h-5" /> TĂNG GIÁ (BULLISH 📈)
            </button>
            <button
              onClick={() => handleGuess("bearish")}
              className="py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-base shadow-lg shadow-rose-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <TrendingDown className="w-5 h-5" /> GIẢM GIÁ (BEARISH 📉)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-stone-900">
            HOÀN THÀNH PHIÊN TRADING!
          </h3>
          <p className="text-sm font-bold text-amber-600">
            Tổng điểm đạt được: {score} XP & Coins!
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-black text-sm hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> Chơi Lại Phiên Mới
          </button>
        </div>
      )}
    </div>
  );
}
