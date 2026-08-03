"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, ShieldAlert, Sparkles, Trophy, RotateCcw, CheckCircle2, XCircle, Building2, Sliders } from "lucide-react";
import { toast } from "sonner";
import { soundManager } from "@/lib/sounds";
import { recalculateUserStats } from "@/lib/supabase-user";
import { recordCustomGameSession } from "@/lib/games";
import { useIsClient } from "@/lib/use-is-client";

interface CompanyDeal {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  fcffYear1: number; // in Millions USD
  defaultWacc: number; // e.g. 0.10 (10%)
  defaultG: number; // e.g. 0.03 (3%)
  netDebt: number; // in Millions USD
  shares: number; // in Millions
  currentPrice: number; // Current trading price in USD
  isUndervalued: boolean; // Correct decision
  dealRationale: string;
}

const DEALS: CompanyDeal[] = [
  {
    id: "tech-titan",
    name: "Alpha Cloud Tech",
    ticker: "ACT",
    industry: "SaaS & AI Software",
    fcffYear1: 250,
    defaultWacc: 0.09,
    defaultG: 0.04,
    netDebt: 300,
    shares: 100,
    currentPrice: 38.5,
    isUndervalued: true,
    dealRationale: "Dòng tiền tự do dồi dào + chi phí vốn rẻ làm định giá thực đạt $47.0/cp, cao hơn 22% so với thị trường! HOAC: Mô hình SaaS có recurring revenue ổn định."
  },
  {
    id: "consumer-staple",
    name: "Vinafood Global",
    ticker: "VFG",
    industry: "FMCG & Thực phẩm",
    fcffYear1: 180,
    defaultWacc: 0.11,
    defaultG: 0.03,
    netDebt: 450,
    shares: 80,
    currentPrice: 28.0,
    isUndervalued: false,
    dealRationale: "Nợ vay cao và chi phí vốn 11% khiến giá trị hợp lý chỉ là $22.5/cp. Thị trường định giá cổ phiếu quá cao tại mức $28!"
  },
  {
    id: "green-energy",
    name: "Aero Wind Power",
    ticker: "AWP",
    industry: "Năng lượng tái tạo",
    fcffYear1: 320,
    defaultWacc: 0.08,
    defaultG: 0.035,
    netDebt: 800,
    shares: 120,
    currentPrice: 42.0,
    isUndervalued: true,
    dealRationale: "Ngành năng lượng xanh hưởng lợi chính sách và chi phí vốn rẻ 8%, định giá DCF hợp lý đạt $52.5/cp!"
  },
  {
    id: "retail-chain",
    name: "Mega Mart Retails",
    ticker: "MMR",
    industry: "Bán lẻ đa kênh",
    fcffYear1: 120,
    defaultWacc: 0.10,
    defaultG: 0.02,
    netDebt: 200,
    shares: 50,
    currentPrice: 32.0,
    isUndervalued: false,
    dealRationale: "Bán lẻ truyền thống tăng trưởng chậm (2%), chị phí vốn cao -> định giá chỉ $26.0/cp. Giá thị trường $32 là quá cao!"
  },
  {
    id: "biotech-pharma",
    name: "Genomics Pharma",
    ticker: "GNP",
    industry: "Dược phẩm & Sinh học",
    fcffYear1: 400,
    defaultWacc: 0.12,
    defaultG: 0.04,
    netDebt: 600,
    shares: 100,
    currentPrice: 35.0,
    isUndervalued: true,
    dealRationale: "Công ty sở hữu bằng sáng chế độc quyền phát triển thuốc, định giá hợp lý $44.0/cp vượt xa giá thị trường!"
  },
  {
    id: "fintech-disruptor",
    name: "PayFlow Digital",
    ticker: "PFD",
    industry: "Fintech & Digital Payments",
    fcffYear1: 180,
    defaultWacc: 0.10,
    defaultG: 0.05,
    netDebt: 150,
    shares: 90,
    currentPrice: 24.0,
    isUndervalued: true,
    dealRationale: "Startup Fintech với tăng trưởng mạnh 5%/năm, WACC 10%, định giá DCF = $26.7/cp, cao hơn giá thị trường $24!"
  },
  {
    id: "real-estate-reit",
    name: "Golden Tower REIT",
    ticker: "GTO",
    industry: "Bất động sản & REIT",
    fcffYear1: 150,
    defaultWacc: 0.07,
    defaultG: 0.02,
    netDebt: 2000,
    shares: 200,
    currentPrice: 18.5,
    isUndervalued: false,
    dealRationale: "REIT có nợ khủng (LTV cao), chi phí vốn thấp nhưng tăng trưởng chậm -> định giá $17.1/cp, thị trường định giá cao hơn!"
  }
];

export default function DcfValuationGame({ userId, onClose }: { userId: string; onClose: () => void }) {
  const mounted = useIsClient();
  const [round, setRound] = useState(0); // 0 to 4
  const [score, setScore] = useState(0);
  const [wacc, setWacc] = useState(0.10);
  const [growthG, setGrowthG] = useState(0.03);
  const [gameState, setGameState] = useState<"playing" | "evaluated" | "finished">("playing");
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; targetPrice: number } | null>(null);

  const deal = DEALS[round];

  // Sync sliders when round changes
  useEffect(() => {
    if (deal) {
      setWacc(deal.defaultWacc);
      setGrowthG(deal.defaultG);
      setGameState("playing");
      setLastResult(null);
    }
  }, [round]);

  // Calculate DCF Valuation Model
  const calcEv = () => {
    const denom = Math.max(0.005, wacc - growthG);
    return Math.round(deal.fcffYear1 / denom);
  };

  const calcEquityValue = () => {
    return Math.max(0, calcEv() - deal.netDebt);
  };

  const calcTargetPrice = () => {
    return Math.round((calcEquityValue() / deal.shares) * 10) / 10;
  };

  const calculatedPrice = calcTargetPrice();

  const handleMakeDecision = (userDecisionBuy: boolean) => {
    if (gameState !== "playing") return;

    // Is current market price lower than calculated target price?
    const isActuallyUndervalued = calculatedPrice > deal.currentPrice;
    const isCorrect = userDecisionBuy === isActuallyUndervalued;

    setLastResult({ isCorrect, targetPrice: calculatedPrice });
    setGameState("evaluated");

    if (isCorrect) {
      soundManager.playWin();
      setScore((prev) => prev + 100);
      toast.success("Định giá & Phán quyết chính xác! +100 Điểm", { icon: "🎯" });
    } else {
      soundManager.playWrong();
      toast.error("Phán quyết sai lầm! Chi phí cơ hội bị tổn thất.", { icon: "❌" });
    }
  };

  const handleNextRound = () => {
    if (round < DEALS.length - 1) {
      setRound((prev) => prev + 1);
    } else {
      soundManager.playWin();
      setGameState("finished");
      if (userId) {
        const maxScore = DEALS.length * 100;
        const xpEarned = Math.round((score / maxScore) * 50);
        recordCustomGameSession(userId, "dcf-mastermind", score, maxScore, xpEarned);
        recalculateUserStats(userId);
      }
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-stone-950 to-slate-950 border-2 border-indigo-500/40 rounded-3xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-400 font-black text-xl shadow-lg">
              🧮
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-indigo-300 flex items-center gap-2">
                Đấu Trường Định Giá DCF & M&A
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold">
                  Thương vụ {round + 1}/{DEALS.length}
                </span>
              </h2>
              <p className="text-xs text-stone-400">Xác định Giá trị Nội tại (Target Price) & Phán quyết Mua / Né</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-xs">
              Score: {score}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Finished Screen */}
        {gameState === "finished" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-5"
          >
            <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-4 border-indigo-400 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(99,102,241,0.6)] animate-bounce">
              🏆
            </div>

            <div>
              <h3 className="text-2xl font-black text-indigo-300">HOÀN THÀNH ĐẤU TRƯỜNG ĐỊNH GIÁ!</h3>
              <p className="text-sm text-stone-300 mt-1 max-w-md">
                Bạn đã hoàn thành phân tích định giá DCF cho cả 5 thương vụ doanh nghiệp lớn!
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-950/40 border border-indigo-500/30 px-6 py-4 text-center">
              <span className="text-xs uppercase font-extrabold text-indigo-400">Tổng điểm thương vụ đạt được</span>
              <div className="text-3xl font-black text-indigo-300 mt-1">{score} / 700 ĐIỂM</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRound(0);
                  setScore(0);
                  setGameState("playing");
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-stone-950 font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử thách lại</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Valuation Deal Screen */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-y-auto">
            {/* Left Column: Target Company Dossier (5 Cols) */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">Hồ sơ Doanh nghiệp Target</span>
                  <h3 className="text-lg font-black text-white">{deal.name} ({deal.ticker})</h3>
                  <span className="text-xs text-stone-400">{deal.industry}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-2xl font-black text-indigo-300">
                  🏢
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Dòng tiền tự do năm tới (FCFF):</span>
                  <span className="font-extrabold text-emerald-400">${deal.fcffYear1}M</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Nợ thuần (Net Debt):</span>
                  <span className="font-extrabold text-amber-400">${deal.netDebt}M</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Số lượng Cổ phiếu lưu hành:</span>
                  <span className="font-extrabold text-stone-200">{deal.shares}M cổ phiếu</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 font-extrabold">
                  <span className="text-indigo-300">Thị giá hiện tại (Market Price):</span>
                  <span className="text-amber-300 text-sm">${deal.currentPrice} / cp</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive DCF Sliders & Model Output (7 Cols) */}
            <div className="lg:col-span-7 bg-stone-900/90 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
              <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Mô Hình Định Giá DCF Interactive:
              </h3>

              {/* Sliders */}
              <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                {/* WACC Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-300">Chi phí vốn bình quân (WACC):</span>
                    <span className="text-indigo-400 font-extrabold">{Math.round(wacc * 1000) / 10}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.06"
                    max="0.16"
                    step="0.005"
                    value={wacc}
                    disabled={gameState !== "playing"}
                    onChange={(e) => setWacc(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* Growth Rate Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-300">Tốc độ tăng trưởng dài hạn (g):</span>
                    <span className="text-emerald-400 font-extrabold">{Math.round(growthG * 1000) / 10}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.05"
                    step="0.005"
                    value={growthG}
                    disabled={gameState !== "playing"}
                    onChange={(e) => setGrowthG(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated DCF Output Card */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                  <span className="text-[10px] font-black uppercase text-indigo-400">Giá trị Doanh nghiệp (EV)</span>
                  <div className="text-base font-black text-indigo-200 mt-0.5">${calcEv()}M</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Giá Mục Tiêu DCF (Target Price)</span>
                  <div className="text-lg font-black text-emerald-300 mt-0.5">${calculatedPrice} / cp</div>
                </div>
              </div>

              {/* Decision Buttons */}
              {gameState === "playing" ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleMakeDecision(true)}
                    className="py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>⚡ MUA VÀO (Rẻ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMakeDecision(false)}
                    className="py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>⛔ NÉ XA (Đắt)</span>
                  </button>
                </div>
              ) : (
                /* Evaluated Feedback Card */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-2"
                >
                  <div className={`p-4 rounded-2xl border ${lastResult?.isCorrect ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200" : "bg-red-950/50 border-red-500/40 text-red-200"}`}>
                    <div className="flex items-center gap-2 font-black text-sm mb-1">
                      {lastResult?.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span>{lastResult?.isCorrect ? "Phán quyết chuẩn xác!" : "Phán quyết chưa đúng!"}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-stone-300 mt-1">{deal.dealRationale}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextRound}
                    className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-stone-950 font-black text-sm shadow-lg transition-all cursor-pointer"
                  >
                    Thương vụ tiếp theo →
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
