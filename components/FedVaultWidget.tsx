"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, TrendingDown, DollarSign, Award, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { addXpToUser } from "@/lib/supabase-progress";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface FedVaultWidgetProps {
  userId: string;
}

export default function FedVaultWidget({ userId }: FedVaultWidgetProps) {
  const { t } = useI18n();
  const [fedRate, setFedRate] = useState<number>(4.25);
  const [inflation, setInflation] = useState<number>(6.5);
  const [gdp, setGdp] = useState<number>(1.8);
  const [unemployment, setUnemployment] = useState<number>(4.1);
  const [marketIndex, setMarketIndex] = useState<number>(4500);
  const [turns, setTurns] = useState<number>(0);
  const [completedScenario, setCompletedScenario] = useState<boolean>(false);

  // Scenario 1: Soft Landing Challenge (Lower inflation below 3% while keeping GDP > 1.5%)
  const handleAdjustRate = (delta: number) => {
    const newRate = Math.max(0, Math.min(10, +(fedRate + delta).toFixed(2)));
    setFedRate(newRate);

    // Simulation Physics
    // High rate reduces inflation, slows GDP, increases unemployment, pressures stocks
    // Low rate increases inflation, boosts GDP, lowers unemployment, inflates stocks
    const rateDiff = newRate - 4.25;
    const newInflation = Math.max(1.0, +(6.5 - rateDiff * 0.8 - turns * 0.15).toFixed(1));
    const newGdp = Math.max(-2.0, +(1.8 - rateDiff * 0.5 + Math.random() * 0.4).toFixed(1));
    const newUnemp = Math.max(3.0, +(4.1 + rateDiff * 0.3).toFixed(1));
    const newMarket = Math.round(4500 - rateDiff * 250 + (newGdp > 0 ? 100 : -200));

    setInflation(newInflation);
    setGdp(newGdp);
    setUnemployment(newUnemp);
    setMarketIndex(newMarket);
    const nextTurns = turns + 1;
    setTurns(nextTurns);

    if (newInflation <= 3.0 && newGdp >= 1.5 && !completedScenario) {
      setCompletedScenario(true);
      toast.success(t.fedVault.toastSoftLanding);
      if (userId) void addXpToUser(userId, 100);
    }
  };

  const handleReset = () => {
    setFedRate(4.25);
    setInflation(6.5);
    setGdp(1.8);
    setUnemployment(4.1);
    setMarketIndex(4500);
    setTurns(0);
    setCompletedScenario(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-lg space-y-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-amber-400 shadow-md shrink-0">
            <Image src="/rpg/fed_reserve.jpg" alt={t.fedVault.buildingAlt} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                {t.fedVault.fedEyebrow}
              </span>
              {completedScenario && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {t.fedVault.completedBadge}
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{t.fedVault.title}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">{t.fedVault.subtitle}</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold border border-stone-200/80 dark:border-stone-700 transition-colors self-start sm:self-auto cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.fedVault.resetButton}</span>
        </button>
      </div>

      {/* Objective Card */}
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider">{t.fedVault.objectiveLabel}</p>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
            {t.fedVault.objectivePart1}<strong className="text-rose-600 dark:text-rose-400">6.5%</strong>{t.fedVault.objectivePart2}<strong className="text-emerald-600 dark:text-emerald-400">3.0%</strong>{t.fedVault.objectivePart3}<strong className="text-emerald-600 dark:text-emerald-400">1.5%</strong>{t.fedVault.objectivePart4}
          </p>
        </div>
      </div>

      {/* Main Stats Gauge Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-stone-50/80 dark:bg-stone-950/60 p-4.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">{t.fedVault.rateLabel}</span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-300">{fedRate}%</span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">{t.fedVault.rateDesc}</span>
        </div>

        <div className="bg-stone-50/80 dark:bg-stone-950/60 p-4.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-widest">{t.fedVault.inflationLabel}</span>
          <div className="my-2 flex items-baseline gap-1">
            <span className={`text-2xl sm:text-3xl font-black ${inflation <= 3.0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {inflation}%
            </span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">{t.fedVault.inflationTarget}</span>
        </div>

        <div className="bg-stone-50/80 dark:bg-stone-950/60 p-4.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] font-black text-teal-700 dark:text-sky-400 uppercase tracking-widest">{t.fedVault.gdpLabel}</span>
          <div className="my-2">
            <span className={`text-2xl sm:text-3xl font-black ${gdp >= 1.5 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {gdp}%
            </span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">{t.fedVault.gdpTarget}</span>
        </div>

        <div className="bg-stone-50/80 dark:bg-stone-950/60 p-4.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] font-black text-indigo-700 dark:text-purple-400 uppercase tracking-widest">{t.fedVault.spIndex}</span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-purple-300">{marketIndex}</span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">{t.fedVault.marketDesc}</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-stone-50/90 dark:bg-stone-950 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase text-stone-800 dark:text-stone-200 tracking-wider">
            {t.fedVault.fomcLabel}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono font-bold">{format(t.fedVault.meetingsCount, { turns })}</span>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => handleAdjustRate(-0.5)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <TrendingDown className="w-4 h-4" />
            <span>{t.fedVault.decreaseLarge}</span>
          </button>
          <button
            onClick={() => handleAdjustRate(-0.25)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 font-bold text-xs text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <TrendingDown className="w-4 h-4" />
            <span>{t.fedVault.decreaseSmall}</span>
          </button>
          <button
            onClick={() => handleAdjustRate(0.25)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.fedVault.increaseSmall}</span>
          </button>
          <button
            onClick={() => handleAdjustRate(0.5)}
            className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 font-bold text-xs text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.fedVault.increaseLarge}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
