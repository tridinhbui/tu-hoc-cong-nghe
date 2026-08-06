"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, HelpCircle, Users, Sparkles, CheckCircle2, XCircle, DollarSign, ShieldAlert, ArrowLeft, RotateCcw, Award } from "lucide-react";
import { toast } from "sonner";
import { soundManager } from "@/lib/sounds";
import { recalculateUserStats } from "@/lib/supabase-user";
import { recordCustomGameSession } from "@/lib/games";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

export interface MillionaireQuestion {
  level: number;
  prize: number;
  prizeText: string;
  isMilestone?: boolean;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  taiTaiHint: string;
}

const CORRECT_INDICES = [1, 0, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1];
const PRIZES = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
const MILESTONE_LEVELS = new Set([5, 10, 15]);

// 15 Standard Wall Street Millionaire Questions matching finance knowledge progression.
// Text content lives in the dictionary (t.games.millionaire); only ids/level/prize/
// correctIndex/isMilestone are data here so a correct answer can never move via translation.
function buildMillionaireQuestions(t: Dictionary): MillionaireQuestion[] {
  const m = t.games.millionaire;
  return CORRECT_INDICES.map((correctIndex, i) => {
    const level = i + 1;
    const key = String(level) as keyof typeof m.questions;
    const q = m.questions[key];
    return {
      level,
      prize: PRIZES[i],
      prizeText: m.prizeTexts[key],
      isMilestone: MILESTONE_LEVELS.has(level),
      question: q.question,
      options: q.options as [string, string, string, string],
      correctIndex,
      explanation: q.explanation,
      taiTaiHint: q.taiTaiHint,
    };
  });
}

interface WallStreetMillionaireGameProps {
  userId: string;
  onClose: () => void;
}

export default function WallStreetMillionaireGame({ userId, onClose }: WallStreetMillionaireGameProps) {
  const { t } = useI18n();
  const m = t.games.millionaire;
  const MILLIONAIRE_QUESTIONS = useMemo(() => buildMillionaireQuestions(t), [t]);
  const mounted = useIsClient();
  const [currentLevel, setCurrentLevel] = useState(0); // 0 to 14
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"playing" | "locked" | "revealed" | "banked" | "won" | "lost">("playing");
  
  // Lifelines state
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedTaiTai, setUsedTaiTai] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  
  // Rules modal state
  const [showRules, setShowRules] = useState(false);

  // Active Lifeline Modals/Overlays
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [showTaiTaiModal, setShowTaiTaiModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [audiencePoll, setAudiencePoll] = useState<number[]>([25, 25, 25, 25]);

  // Earnings
  const [earnedCash, setEarnedCash] = useState(0);

  const q = MILLIONAIRE_QUESTIONS[currentLevel];

  // Helper: Use 50:50
  const handleUseFiftyFifty = () => {
    if (usedFiftyFifty || gameState !== "playing") return;
    setUsedFiftyFifty(true);
    soundManager.playPowerup();

    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== q.correctIndex);
    // Randomly pick 2 wrong indices to remove
    const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
    const eliminated = [shuffled[0], shuffled[1]];
    setEliminatedIndices(eliminated);
    toast.success(m.toastFiftyFifty, { icon: "🪄" });
  };

  // Helper: Use Mascot Tài Tài
  const handleUseTaiTai = () => {
    if (usedTaiTai || gameState !== "playing") return;
    setUsedTaiTai(true);
    soundManager.playPowerup();
    setShowTaiTaiModal(true);
  };

  // Helper: Use Audience Poll
  const handleUseAudience = () => {
    if (usedAudience || gameState !== "playing") return;
    setUsedAudience(true);
    soundManager.playPowerup();

    // Generate biased poll favoring the correct option
    const poll = [10, 10, 10, 10];
    const correctBoost = 60 + Math.floor(Math.random() * 25); // 60-85%
    const remaining = 100 - correctBoost;
    
    poll[q.correctIndex] = correctBoost;
    let pool = remaining;
    for (let i = 0; i < 4; i++) {
      if (i !== q.correctIndex) {
        const share = Math.floor(Math.random() * pool);
        poll[i] = share;
        pool -= share;
      }
    }
    // Add rest to first non-correct
    const firstOther = [0, 1, 2, 3].find((i) => i !== q.correctIndex)!;
    poll[firstOther] += pool;

    setAudiencePoll(poll);
    setShowAudienceModal(true);
  };

  // Lock answer selection
  const handleSelectOption = (index: number) => {
    if (gameState !== "playing" || eliminatedIndices.includes(index)) return;
    setSelectedOption(index);
    setGameState("locked");
    soundManager.playCorrect();

    // After 2.5s suspense, reveal answer
    setTimeout(() => {
      if (index === q.correctIndex) {
        // Correct Answer!
        soundManager.playWin();
        setGameState("revealed");

        const isFinal = currentLevel === 14;
        if (isFinal) {
          // WON 1 MILLION DOLLARS!
          setEarnedCash(1000000);
          setGameState("won");
          if (userId) {
            recordCustomGameSession(userId, "wall-street-millionaire", 15, 15, 50);
            recalculateUserStats(userId);
          }
        } else {
          // Move to next question after 1.8s
          setTimeout(() => {
            setCurrentLevel((prev) => prev + 1);
            setSelectedOption(null);
            setEliminatedIndices([]);
            setGameState("playing");
          }, 1800);
        }
      } else {
        // Wrong Answer!
        soundManager.playWrong();
        setGameState("lost");

        // Determine safe milestone payout
        let safePayout = 0;
        if (currentLevel >= 9) safePayout = 32000;
        else if (currentLevel >= 4) safePayout = 1000;
        setEarnedCash(safePayout);
        if (userId) {
          const xpEarned = Math.round((currentLevel / 15) * 50);
          recordCustomGameSession(userId, "wall-street-millionaire", currentLevel, 15, xpEarned);
          recalculateUserStats(userId);
        }
      }
    }, 2200);
  };

  // Walk Away with Cash
  const handleBankAndWalkAway = () => {
    if (gameState !== "playing" && gameState !== "locked") return;
    const currentBank = currentLevel > 0 ? MILLIONAIRE_QUESTIONS[currentLevel - 1].prize : 0;
    setEarnedCash(currentBank);
    setGameState("banked");
    soundManager.playWin();
    toast.success(format(m.toastWalkAway, { prize: MILLIONAIRE_QUESTIONS[currentLevel - 1]?.prizeText || "$0" }), { icon: "💰" });
    if (userId) {
      const xpEarned = Math.round((currentLevel / 15) * 50);
      recordCustomGameSession(userId, "wall-street-millionaire", currentLevel, 15, xpEarned);
      recalculateUserStats(userId);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-stone-950 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header & Close */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg">
              💰
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-amber-300 flex items-center gap-2">
                {m.title}
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
                  {format(m.questionCounter, { current: currentLevel + 1 })}
                </span>
              </h2>
              <p className="text-xs text-stone-400">{m.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentLevel > 0 && (gameState === "playing" || gameState === "locked") && (
              <button
                type="button"
                onClick={handleBankAndWalkAway}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>{format(m.walkAwayButton, { prize: MILLIONAIRE_QUESTIONS[currentLevel - 1].prizeText })}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Grid Layout: Left Question Arena + Right Prize Ladder */}
        {gameState === "won" || gameState === "lost" || gameState === "banked" ? (
          /* Game Over / Victory Screen */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-5"
          >
            {gameState === "won" ? (
              <div className="w-24 h-24 rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(245,158,11,0.6)] animate-bounce">
                👑
              </div>
            ) : gameState === "banked" ? (
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-3 border-emerald-400 flex items-center justify-center text-4xl shadow-lg">
                💰
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-500/20 border-3 border-red-400 flex items-center justify-center text-4xl shadow-lg">
                💔
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-amber-300">
                {gameState === "won"
                  ? m.wonTitle
                  : gameState === "banked"
                  ? m.bankedTitle
                  : m.lostTitle}
              </h3>
              <p className="text-sm text-stone-300 mt-1 max-w-md">
                {gameState === "won"
                  ? m.wonDesc
                  : gameState === "banked"
                  ? m.bankedDesc
                  : format(m.lostDesc, { answer: q.options[q.correctIndex] })}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-950/40 border border-amber-500/30 px-6 py-4 text-center">
              <span className="text-xs uppercase font-extrabold text-amber-400">{m.earnedLabel}</span>
              <div className="text-3xl font-black text-amber-300 mt-1">{format(m.earnedAmount, { amount: earnedCash.toLocaleString() })}</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentLevel(0);
                  setSelectedOption(null);
                  setEliminatedIndices([]);
                  setUsedFiftyFifty(false);
                  setUsedTaiTai(false);
                  setUsedAudience(false);
                  setGameState("playing");
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{m.retryButton}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-all cursor-pointer"
              >
                {m.closeButton}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-y-auto">
            {/* Left Arena: Lifelines + Question Card + 4 Options (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Lifeline Buttons */}
              <div className="flex items-center justify-between gap-2 bg-stone-900/80 border border-amber-500/20 p-2.5 rounded-2xl">
                <span className="text-xs font-bold text-amber-300 hidden sm:inline">{m.lifelinesLabel}</span>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-around">
                  {/* 50:50 */}
                  <button
                    type="button"
                    onClick={handleUseFiftyFifty}
                    disabled={usedFiftyFifty || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedFiftyFifty
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-indigo-950/80 border-indigo-500/50 text-indigo-300 hover:bg-indigo-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>{m.fiftyFifty}</span>
                  </button>

                  {/* Ask Mascot Tài Tài */}
                  <button
                    type="button"
                    onClick={handleUseTaiTai}
                    disabled={usedTaiTai || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedTaiTai
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-amber-950/80 border-amber-500/50 text-amber-300 hover:bg-amber-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>{m.askTaiTai}</span>
                  </button>

                  {/* Audience Poll */}
                  <button
                    type="button"
                    onClick={handleUseAudience}
                    disabled={usedAudience || gameState !== "playing"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                      usedAudience
                        ? "bg-stone-800 text-stone-500 border-stone-700 opacity-50 cursor-not-allowed"
                        : "bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 hover:scale-105 shadow-md"
                    }`}
                  >
                    <span>{m.audiencePollButton}</span>
                  </button>
                </div>
              </div>

              {/* Question Card Box */}
              <div className="relative bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-xl text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                  {format(m.prizeLevelBadge, { prize: q.prizeText })}
                </div>
                <h3 className="text-base sm:text-lg font-black text-amber-100 leading-relaxed mt-2">
                  {q.question}
                </h3>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => {
                  const isEliminated = eliminatedIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === q.correctIndex;

                  let optionStyle =
                    "border-amber-500/30 bg-slate-900/90 text-stone-200 hover:border-amber-400 hover:bg-slate-800";

                  if (isEliminated) {
                    optionStyle = "border-stone-800 bg-stone-950/40 text-stone-600 opacity-30 cursor-not-allowed";
                  } else if (gameState === "locked" && isSelected) {
                    optionStyle = "border-amber-400 bg-amber-500/20 text-amber-200 animate-pulse ring-2 ring-amber-400";
                  } else if (gameState === "revealed") {
                    if (isCorrect) {
                      optionStyle = "border-emerald-400 bg-emerald-500/30 text-emerald-200 font-extrabold ring-2 ring-emerald-400";
                    } else if (isSelected) {
                      optionStyle = "border-red-400 bg-red-500/30 text-red-200 ring-2 ring-red-400";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={gameState !== "playing" || isEliminated}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm flex items-start gap-2 cursor-pointer ${optionStyle}`}
                    >
                      <span className="shrink-0 font-extrabold text-amber-400">{opt.slice(0, 3)}</span>
                      <span>{opt.slice(3)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Prize Ladder (4 Cols) */}
            <div className="lg:col-span-4 bg-stone-900/90 border border-amber-500/30 rounded-2xl p-3 sm:p-4 space-y-1">
              <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider mb-2 flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span>{m.prizeLadderTitle}</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </h4>

              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                {[...MILLIONAIRE_QUESTIONS].reverse().map((item) => {
                  const isActive = currentLevel === item.level - 1;
                  const isPassed = currentLevel > item.level - 1;

                  return (
                    <div
                      key={item.level}
                      className={`flex items-center justify-between px-3 py-1 rounded-xl text-xs font-black transition-all ${
                        isActive
                          ? "bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 font-black scale-[1.02]"
                          : isPassed
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                          : item.isMilestone
                          ? "bg-stone-800 text-amber-300 border border-amber-500/40 font-bold"
                          : "text-stone-400 bg-stone-950/40"
                      }`}
                    >
                      <span>
                        {item.level}. {item.isMilestone ? "🔒" : ""}
                      </span>
                      <span>{item.prizeText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mascot Tai Tai Modal */}
        {showTaiTaiModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-stone-900 border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
                🤖
              </div>
              <h3 className="text-lg font-black text-amber-300">{m.taiTaiModalTitle}</h3>
              <p className="text-sm text-stone-200 italic bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl">
                "{q.taiTaiHint}"
              </p>
              <button
                type="button"
                onClick={() => setShowTaiTaiModal(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs cursor-pointer shadow-md"
              >
                {m.taiTaiThanks}
              </button>
            </motion.div>
          </div>
        )}

        {/* Audience Poll Modal */}
        {showAudienceModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-stone-900 border-2 border-emerald-400 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <h3 className="text-lg font-black text-emerald-300">{m.audienceModalTitle}</h3>

              <div className="space-y-2 text-left">
                {["A", "B", "C", "D"].map((letter, idx) => (
                  <div key={letter} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-stone-300">
                      <span>{format(m.audienceOptionLabel, { letter })}</span>
                      <span className="text-emerald-400 font-extrabold">{audiencePoll[idx]}%</span>
                    </div>
                    <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden border border-stone-700">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full transition-all duration-700"
                        style={{ width: `${audiencePoll[idx]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAudienceModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs cursor-pointer shadow-md"
              >
                {m.audienceGotIt}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
