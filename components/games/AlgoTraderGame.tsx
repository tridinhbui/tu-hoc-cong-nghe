"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, PieChart, Trophy, RefreshCw, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function AlgoTraderGame({ onBack }: { onBack?: () => void }) {
  const { t } = useI18n();
  const at = t.games.algoTrader;
  const [stocks, setStocks] = useState(50);
  const [bonds, setBonds] = useState(30);
  const [gold, setGold] = useState(20);
  const [isCalculated, setIsCalculated] = useState(false);
  const [portfolioReturn, setPortfolioReturn] = useState(0);

  const totalAlloc = stocks + bonds + gold;

  const handleSimulate = () => {
    if (totalAlloc !== 100) {
      toast.error(format(at.toastAllocError, { total: totalAlloc }));
      return;
    }

    // Expected Returns: Stocks 15%, Bonds 6%, Gold 8%
    const expectedReturn = (stocks * 0.15 + bonds * 0.06 + gold * 0.08).toFixed(1);
    setPortfolioReturn(Number(expectedReturn));
    setIsCalculated(true);
    toast.success(format(at.toastSuccess, { pct: expectedReturn }));
  };

  return (
    <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-black text-stone-600 hover:text-purple-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {at.backButton}
          </button>
        )}
        <div className="text-center flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {at.subtitleBadge}
          </span>
          <h2 className="text-xl font-black text-stone-900 mt-1">
            {at.title}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-stone-900 flex items-center gap-2">
              {at.stocksLabel}
            </span>
            <span className="text-sm font-black text-emerald-600">{stocks}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={stocks}
            onChange={(e) => setStocks(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-stone-900 flex items-center gap-2">
              {at.bondsLabel}
            </span>
            <span className="text-sm font-black text-blue-600">{bonds}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={bonds}
            onChange={(e) => setBonds(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-stone-900 flex items-center gap-2">
              {at.goldLabel}
            </span>
            <span className="text-sm font-black text-amber-600">{gold}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={gold}
            onChange={(e) => setGold(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <span className="text-xs font-black text-stone-500">{at.totalAllocLabel}</span>
            <span className={`text-base font-black ${totalAlloc === 100 ? "text-emerald-500" : "text-rose-500"}`}>
              {format(at.totalAllocValue, { total: totalAlloc })}
            </span>
          </div>
        </div>

        {isCalculated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border-2 border-purple-300 rounded-2xl p-4 text-center"
          >
            <p className="text-xs font-black text-purple-600 uppercase">
              {at.resultBadge}
            </p>
            <p className="text-2xl font-black text-stone-900 mt-1">
              {at.resultLabel} <span className="text-emerald-600">{format(at.resultValue, { pct: portfolioReturn })}</span>
            </p>
            <p className="text-xs text-stone-500 mt-1">{at.rewardNote}</p>
          </motion.div>
        )}

        <button
          onClick={handleSimulate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/25"
        >
          <Cpu className="w-5 h-5" /> {at.simulateButton}
        </button>
      </div>
    </div>
  );
}
