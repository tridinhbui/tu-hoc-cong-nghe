"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, TrendingDown, DollarSign, Award, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { addXpToUser } from "@/lib/supabase-progress";

interface FedVaultWidgetProps {
  userId: string;
}

export default function FedVaultWidget({ userId }: FedVaultWidgetProps) {
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
      toast.success("🎉 ĐẠT CHỈ TIÊU HẠ CÁNH MỀM (SOFT LANDING)! Bạn nhận +100 XP & 50 Coins từ Fed!");
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
    <div className="p-4 sm:p-6 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-amber-400 shadow-md shrink-0">
            <Image src="/rpg/fed_reserve.jpg" alt="Federal Reserve Building" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                🏛️ US FEDERAL RESERVE
              </span>
              {completedScenario && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ✓ Hoàn thành Soft Landing
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">Cục Dự Trữ Liên Bang Fed</h3>
            <p className="text-xs text-stone-400">Mô phỏng điều hành Lãi suất Điều hành & Kho thỏi vàng quốc gia</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Đặt lại kịch bản</span>
        </button>
      </div>

      {/* Objective Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-extrabold text-amber-300 uppercase tracking-wider">🎯 Nhiệm vụ Chủ tịch Fed:</p>
          <p className="text-stone-300">
            Lạm phát hiện tại đang ở mức <strong className="text-rose-400">6.5%</strong>. Hãy điều chỉnh Lãi suất Fed (Fed Funds Rate) để hạ Lạm phát về dưới <strong className="text-emerald-400">3.0%</strong> nhưng vẫn giữ Tăng trưởng GDP trên <strong className="text-emerald-400">1.5%</strong> (Tránh suy thoái).
          </p>
        </div>
      </div>

      {/* Main Stats Gauge Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Lãi suất Fed</span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-300">{fedRate}%</span>
          </div>
          <span className="text-[10px] text-stone-400">Công cụ chính điều tiết</span>
        </div>

        <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
          <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Lạm phát (CPI)</span>
          <div className="my-2 flex items-baseline gap-1">
            <span className={`text-2xl sm:text-3xl font-black ${inflation <= 3.0 ? "text-emerald-400" : "text-rose-400"}`}>
              {inflation}%
            </span>
          </div>
          <span className="text-[10px] text-stone-400">Mục tiêu: ≤ 3.0%</span>
        </div>

        <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
          <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Tăng trưởng GDP</span>
          <div className="my-2">
            <span className={`text-2xl sm:text-3xl font-black ${gdp >= 1.5 ? "text-emerald-400" : "text-amber-400"}`}>
              {gdp}%
            </span>
          </div>
          <span className="text-[10px] text-stone-400">Mục tiêu: ≥ 1.5%</span>
        </div>

        <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">S&P 500 Index</span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-300">{marketIndex}</span>
          </div>
          <span className="text-[10px] text-stone-400">Phản ứng thị trường</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase text-stone-300 tracking-wider">
            Điều chỉnh Lãi suất (Khóa họp FOMC):
          </span>
          <span className="text-xs text-stone-400 font-mono">Đã họp {turns} phiên</span>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => handleAdjustRate(-0.5)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <TrendingDown className="w-4 h-4" />
            <span>Giảm -0.50% (Hạ nhiệt)</span>
          </button>
          <button
            onClick={() => handleAdjustRate(-0.25)}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <TrendingDown className="w-4 h-4" />
            <span>Giảm -0.25%</span>
          </button>
          <button
            onClick={() => handleAdjustRate(0.25)}
            className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Tăng +0.25%</span>
          </button>
          <button
            onClick={() => handleAdjustRate(0.5)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Tăng +0.50% (Thắt chặt)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
