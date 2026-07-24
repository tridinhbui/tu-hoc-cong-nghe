"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, DollarSign, Layers, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";
import { addXpToUser } from "@/lib/supabase-progress";

interface GoldmanSachsWidgetProps {
  userId: string;
}

interface MACompany {
  id: string;
  name: string;
  ticker: string;
  revenue: string;
  ebitda: string;
  evEbitdaMultiple: number;
  synergyPotential: string;
  recommendedPrice: number; // In million USD
}

const MA_DEALS: MACompany[] = [
  {
    id: "tech-corp",
    name: "TechCloud AI Global",
    ticker: "TCAI",
    revenue: "240M USD",
    ebitda: "45M USD",
    evEbitdaMultiple: 12,
    synergyPotential: "+15M USD tiết kiệm chi phí vận hành",
    recommendedPrice: 540,
  },
  {
    id: "retail-chain",
    name: "VinMart Retail Chain",
    ticker: "VMR",
    revenue: "850M USD",
    ebitda: "90M USD",
    evEbitdaMultiple: 8,
    synergyPotential: "+30M USD mở rộng chuỗi cung ứng",
    recommendedPrice: 720,
  },
];

export default function GoldmanSachsWidget({ userId }: GoldmanSachsWidgetProps) {
  const [selectedDeal, setSelectedDeal] = useState<MACompany>(MA_DEALS[0]);
  const [userOffer, setUserOffer] = useState<number>(540);
  const [pitchSubmitted, setPitchSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmitPitch = () => {
    const target = selectedDeal.recommendedPrice;
    const diffPercent = Math.abs(userOffer - target) / target;

    let dealScore = 100;
    if (diffPercent > 0.2) dealScore = 60;
    else if (diffPercent > 0.1) dealScore = 80;
    else dealScore = 95;

    setScore(dealScore);
    setPitchSubmitted(true);

    if (dealScore >= 80) {
      toast.success(`🎉 DEAL M&A THÀNH CÔNG RỰC RỠ! Bạn đạt ${dealScore}/100 điểm, nhận +120 XP & 80 Coins!`);
      if (userId) void addXpToUser(userId, 120);
    } else {
      toast.info(`Deal hoàn tất với ${dealScore}/100 điểm. Định giá hơi lệch so với mức cân bằng thị trường!`);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-sky-400 shadow-md shrink-0">
            <Image src="/rpg/goldman_sachs.png" alt="Goldman Sachs HQ" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40">
                🏛️ GOLDMAN SACHS WALL ST.
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                ⭐ INVESTMENT BANKING
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">Tập Đoàn Goldman Sachs Investment Bank</h3>
            <p className="text-xs text-slate-400">Đấu Trường M&A Dealmaking, Định Giá Doanh Nghiệp & IPO Pitching</p>
          </div>
        </div>
      </div>

      {/* Select Deal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MA_DEALS.map((deal) => (
          <div
            key={deal.id}
            onClick={() => {
              setSelectedDeal(deal);
              setUserOffer(deal.recommendedPrice);
              setPitchSubmitted(false);
              setScore(null);
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedDeal.id === deal.id
                ? "bg-sky-950/60 border-sky-400 ring-2 ring-sky-400/30 shadow-lg"
                : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-sky-400 tracking-wider">M&A CASE #{deal.ticker}</span>
              <span className="text-xs font-bold text-slate-400">EBITDA: {deal.ebitda}</span>
            </div>
            <h4 className="text-base font-extrabold text-white mt-1">{deal.name}</h4>
            <p className="text-xs text-slate-400 mt-1">{deal.synergyPotential}</p>
          </div>
        ))}
      </div>

      {/* Valuation Workspace */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-white">Định Giá Thương Vụ: {selectedDeal.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">Mẫu số bội số EV/EBITDA ngành: {selectedDeal.evEbitdaMultiple}x</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Doanh thu: {selectedDeal.revenue}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Đưa ra mức giá chào mua (Enterprise Value Pitch):</span>
            <span className="text-sky-400 font-mono text-base font-black">{userOffer} Triệu USD</span>
          </div>

          <input
            type="range"
            min={Math.round(selectedDeal.recommendedPrice * 0.5)}
            max={Math.round(selectedDeal.recommendedPrice * 1.5)}
            step={10}
            value={userOffer}
            onChange={(e) => setUserOffer(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleSubmitPitch}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 font-extrabold text-xs text-slate-950 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nộp Báo Cáo Thuyết Minh M&A (Pitch Deal)</span>
          </button>
        </div>

        {pitchSubmitted && score !== null && (
          <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/40 text-xs space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sky-300 uppercase tracking-wider">Đánh Giá Hội Đồng Goldman Sachs:</span>
              <span className="font-black text-emerald-400 text-sm">{score}/100 Điểm</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Mức giá định giá hợp lý của thương vụ dựa trên phương pháp EV/EBITDA chuẩn là ~<strong>{selectedDeal.recommendedPrice} Million USD</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
