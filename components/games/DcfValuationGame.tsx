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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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
}

// Structural shape of the seven deals: id, ticker, numbers and the
// correct-decision flag (never shown to the player, so not display copy).
// `name` is a fictional company name kept identical in both languages -
// `industry` is real copy and comes from `t.finalOne.dcfGame.industries`,
// keyed by `id`; see `dealsOf`.
/* i18n-ignore-start: fictional company names, proper nouns kept identical in both languages */
const DEAL_SHAPE: Omit<CompanyDeal, "industry">[] = [
  {
    id: "tech-titan",
    name: "Alpha Cloud Tech",
    ticker: "ACT",
    fcffYear1: 250,
    defaultWacc: 0.09,
    defaultG: 0.04,
    netDebt: 300,
    shares: 100,
    currentPrice: 38.5,
    isUndervalued: true,
  },
  {
    id: "consumer-staple",
    name: "Vinafood Global",
    ticker: "VFG",
    fcffYear1: 180,
    defaultWacc: 0.11,
    defaultG: 0.03,
    netDebt: 450,
    shares: 80,
    currentPrice: 28.0,
    isUndervalued: false,
  },
  {
    id: "green-energy",
    name: "Aero Wind Power",
    ticker: "AWP",
    fcffYear1: 320,
    defaultWacc: 0.08,
    defaultG: 0.035,
    netDebt: 800,
    shares: 120,
    currentPrice: 42.0,
    isUndervalued: true,
  },
  {
    id: "retail-chain",
    name: "Mega Mart Retails",
    ticker: "MMR",
    fcffYear1: 120,
    defaultWacc: 0.10,
    defaultG: 0.02,
    netDebt: 200,
    shares: 50,
    currentPrice: 32.0,
    isUndervalued: false,
  },
  {
    id: "biotech-pharma",
    name: "Genomics Pharma",
    ticker: "GNP",
    fcffYear1: 400,
    defaultWacc: 0.12,
    defaultG: 0.04,
    netDebt: 600,
    shares: 100,
    currentPrice: 35.0,
    isUndervalued: true,
  },
  {
    id: "fintech-disruptor",
    name: "PayFlow Digital",
    ticker: "PFD",
    fcffYear1: 180,
    defaultWacc: 0.10,
    defaultG: 0.05,
    netDebt: 150,
    shares: 90,
    currentPrice: 24.0,
    isUndervalued: true,
  },
  {
    id: "real-estate-reit",
    name: "Golden Tower REIT",
    ticker: "GTO",
    fcffYear1: 150,
    defaultWacc: 0.07,
    defaultG: 0.02,
    netDebt: 2000,
    shares: 200,
    currentPrice: 18.5,
    isUndervalued: false,
  }
];
/* i18n-ignore-end */

function dealsOf(t: Dictionary): CompanyDeal[] {
  const industries = t.finalOne.dcfGame.industries;
  return DEAL_SHAPE.map((deal) => ({
    ...deal,
    industry: industries[deal.id as keyof typeof industries],
  }));
}

export default function DcfValuationGame({ userId, onClose }: { userId: string; onClose: () => void }) {
  const { t } = useI18n();
  const dcf = t.games.dcf;
  const DEALS = React.useMemo(() => dealsOf(t), [t]);
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
      toast.success(dcf.toastCorrect, { icon: "🎯" });
    } else {
      soundManager.playWrong();
      toast.error(dcf.toastWrong, { icon: "❌" });
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
                {dcf.title}
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold">
                  {format(dcf.dealCounter, { current: round + 1, total: DEALS.length })}
                </span>
              </h2>
              <p className="text-xs text-stone-400">{dcf.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-xs">
              {format(dcf.score, { score })}
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
              <h3 className="text-2xl font-black text-indigo-300">{dcf.finishedTitle}</h3>
              <p className="text-sm text-stone-300 mt-1 max-w-md">
                {dcf.finishedDesc}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-950/40 border border-indigo-500/30 px-6 py-4 text-center">
              <span className="text-xs uppercase font-extrabold text-indigo-400">{dcf.totalScoreLabel}</span>
              <div className="text-3xl font-black text-indigo-300 mt-1">{format(dcf.totalScoreValue, { score })}</div>
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
                <span>{dcf.retryButton}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-all cursor-pointer"
              >
                {dcf.closeButton}
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
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">{dcf.dossierLabel}</span>
                  <h3 className="text-lg font-black text-white">{deal.name} ({deal.ticker})</h3>
                  <span className="text-xs text-stone-400">{deal.industry}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-2xl font-black text-indigo-300">
                  🏢
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">{dcf.fcffLabel}</span>
                  <span className="font-extrabold text-emerald-400">${deal.fcffYear1}M</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">{dcf.netDebtLabel}</span>
                  <span className="font-extrabold text-amber-400">${deal.netDebt}M</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">{dcf.sharesLabel}</span>
                  <span className="font-extrabold text-stone-200">{format(dcf.sharesUnit, { shares: deal.shares })}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 font-extrabold">
                  <span className="text-indigo-300">{dcf.marketPriceLabel}</span>
                  <span className="text-amber-300 text-sm">{format(dcf.pricePerShare, { price: deal.currentPrice })}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive DCF Sliders & Model Output (7 Cols) */}
            <div className="lg:col-span-7 bg-stone-900/90 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
              <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> {dcf.modelTitle}
              </h3>

              {/* Sliders */}
              <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                {/* WACC Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-300">{dcf.waccLabel}</span>
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
                    <span className="text-stone-300">{dcf.growthLabel}</span>
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
                  <span className="text-[10px] font-black uppercase text-indigo-400">{dcf.evLabel}</span>
                  <div className="text-base font-black text-indigo-200 mt-0.5">${calcEv()}M</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="text-[10px] font-black uppercase text-emerald-400">{dcf.targetPriceLabel}</span>
                  <div className="text-lg font-black text-emerald-300 mt-0.5">{format(dcf.pricePerShare, { price: calculatedPrice })}</div>
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
                    <span>{dcf.buyButton}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMakeDecision(false)}
                    className="py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{dcf.passButton}</span>
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
                      <span>{lastResult?.isCorrect ? dcf.correctVerdict : dcf.wrongVerdict}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-stone-300 mt-1">{dcf.dealRationale[deal.id as keyof typeof dcf.dealRationale]}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextRound}
                    className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-stone-950 font-black text-sm shadow-lg transition-all cursor-pointer"
                  >
                    {dcf.nextDeal}
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
