"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { RefreshCw, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getPairConfig, pickPairRound, getDifficultyTimeLimitSeconds, recordGameSession, type GameType, type GameDifficulty } from "@/lib/games";
import { soundManager } from "@/lib/sounds";
import { useI18n } from "@/lib/i18n/context";
import { localizePairConfig } from "@/lib/games-i18n";
import { format } from "@/lib/i18n";

interface Props {
  userId: string;
  gameType: GameType;
  difficulty?: GameDifficulty;
  onFinished: (score: number, total: number, xpEarned: number) => void;
}

interface CardState {
  matched: boolean;
  everWrong: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Generic "match each left card to its right-column partner" game, driven by
// getPairConfig(gameType) - powers en-vi-terms, term-definition, formula-match
// and any future pair game from data alone.
export default function PairGame({ userId, gameType, difficulty = "trung-binh", onFinished }: Props) {
  const { t, locale } = useI18n();
  const pg = t.games.pairGame;
  // Chỉ NHÃN CỘT và câu hướng dẫn được dịch. `config.pool` giữ nguyên tiếng
  // Việt: với `en-vi-terms` thì chính vế tiếng Việt là đề bài.
  const config = useMemo(
    () => localizePairConfig(getPairConfig(gameType, difficulty), gameType, locale),
    [gameType, difficulty, locale]
  );
  const timeLimit = getDifficultyTimeLimitSeconds(difficulty);
  const [round, setRound] = useState<{ left: string; right: string }[]>(() => pickPairRound(gameType, difficulty));
  const [leftOrder, setLeftOrder] = useState<number[]>([]);
  const [rightOrder, setRightOrder] = useState<number[]>([]);
  const [leftCards, setLeftCards] = useState<Record<number, CardState>>({});
  const [rightCards, setRightCards] = useState<Record<number, CardState>>({});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [shakePair, setShakePair] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });
  const [matchedCount, setMatchedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit ?? 0);

  // Advanced features states
  const [combo, setCombo] = useState(0);
  const [freezeActive, setFreezeActive] = useState(false);
  const [freezeUsed, setFreezeUsed] = useState(false);
  const [helper5050Used, setHelper5050Used] = useState(false);

  const scoreRef = useRef(0);
  const roundLenRef = useRef(0);

  function startNewRound() {
    const newRound = pickPairRound(gameType, difficulty);
    const indices = newRound.map((_, i) => i);
    setRound(newRound);
    setLeftOrder(shuffle(indices));
    setRightOrder(shuffle(indices));
    setLeftCards(Object.fromEntries(indices.map((i) => [i, { matched: false, everWrong: false }])));
    setRightCards(Object.fromEntries(indices.map((i) => [i, { matched: false, everWrong: false }])));
    setSelectedLeft(null);
    setSelectedRight(null);
    setShakePair({ left: null, right: null });
    setMatchedCount(0);
    setScore(0);
    scoreRef.current = 0;
    roundLenRef.current = newRound.length;
    setFinished(false);
    setSubmitting(false);
    setTimeLeft(timeLimit ?? 0);
    
    // Reset power-ups and combo
    setCombo(0);
    setFreezeActive(false);
    setFreezeUsed(false);
    setHelper5050Used(false);
  }

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType, difficulty]);

  // Hard-mode countdown - force-finishes with whatever's matched so far.
  useEffect(() => {
    if (!timeLimit || finished) return;
    if (freezeActive) return; // Freeze time power-up
    if (timeLeft <= 0) {
      setFinished(true);
      setSubmitting(true);
      recordGameSession(userId, gameType, scoreRef.current, roundLenRef.current)
        .then((xpEarned) => onFinished(scoreRef.current, roundLenRef.current, xpEarned))
        .catch(() => onFinished(scoreRef.current, roundLenRef.current, 0))
        .finally(() => setSubmitting(false));
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timeLimit, finished, freezeActive]);

  const activateFreezeTime = () => {
    if (freezeUsed || finished) return;
    setFreezeUsed(true);
    setFreezeActive(true);
    soundManager.playFreeze();
    toast.success(pg.toastFreezeOn);
    window.setTimeout(() => {
      setFreezeActive(false);
      toast.info(pg.toastFreezeOff);
    }, 5000);
  };

  const activate5050Helper = () => {
    if (helper5050Used || finished) return;
    
    const unmatchedIndices = round.map((_, i) => i).filter(i => !leftCards[i]?.matched);
    if (unmatchedIndices.length === 0) return;
    
    setHelper5050Used(true);
    
    // Auto-match up to 2 pairs
    const pairsToMatch = [...unmatchedIndices].sort(() => Math.random() - 0.5).slice(0, Math.min(unmatchedIndices.length, 2));
    
    setLeftCards((prev) => {
      const next = { ...prev };
      pairsToMatch.forEach(i => {
        next[i] = { ...next[i], matched: true };
      });
      return next;
    });
    
    setRightCards((prev) => {
      const next = { ...prev };
      pairsToMatch.forEach(i => {
        next[i] = { ...next[i], matched: true };
      });
      return next;
    });
    
    const newMatched = matchedCount + pairsToMatch.length;
    setMatchedCount(newMatched);
    
    const newScore = score + pairsToMatch.length;
    setScore(newScore);
    scoreRef.current = newScore;
    
    soundManager.playPowerup();
    toast.success(format(pg.toastHelper, { count: pairsToMatch.length }));
    
    if (newMatched >= round.length) {
      setFinished(true);
      setSubmitting(true);
      if (newScore / round.length >= 0.7) {
        soundManager.playWin();
      } else {
        soundManager.playWrong();
      }
      recordGameSession(userId, gameType, newScore, round.length)
        .then((xpEarned) => onFinished(newScore, round.length, xpEarned))
        .catch(() => onFinished(newScore, round.length, 0))
        .finally(() => setSubmitting(false));
    }
  };

  async function tryMatch(leftIdx: number, rightIdx: number) {
    const l = leftCards[leftIdx];
    const r = rightCards[rightIdx];
    if (!l || !r || l.matched || r.matched) return;

    const isMatch =
      leftIdx === rightIdx ||
      round[leftIdx]?.right.trim().toLowerCase() === round[rightIdx]?.right.trim().toLowerCase() ||
      round[leftIdx]?.left.trim().toLowerCase() === round[rightIdx]?.left.trim().toLowerCase();

    if (isMatch) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      if (nextCombo >= 2) {
        soundManager.playCombo(nextCombo);
      } else {
        soundManager.playCorrect();
      }
      
      const countsForScore = !l.everWrong && !r.everWrong;
      setLeftCards((prev) => ({ ...prev, [leftIdx]: { ...prev[leftIdx], matched: true } }));
      setRightCards((prev) => ({ ...prev, [rightIdx]: { ...prev[rightIdx], matched: true } }));
      setSelectedLeft(null);
      setSelectedRight(null);
      const newScore = countsForScore ? score + 1 : score;
      const newMatched = matchedCount + 1;
      setScore(newScore);
      scoreRef.current = newScore;
      setMatchedCount(newMatched);
      if (newMatched >= round.length) {
        setFinished(true);
        setSubmitting(true);
        try {
          if (newScore / round.length >= 0.7) {
            soundManager.playWin();
          } else {
            soundManager.playWrong();
          }
          const xpEarned = await recordGameSession(userId, gameType, newScore, round.length);
          onFinished(newScore, round.length, xpEarned);
        } catch {
          onFinished(newScore, round.length, 0);
        } finally {
          setSubmitting(false);
        }
      }
    } else {
      setCombo(0); // Reset combo
      soundManager.playWrong();
      setLeftCards((prev) => ({ ...prev, [leftIdx]: { ...prev[leftIdx], everWrong: true } }));
      setRightCards((prev) => ({ ...prev, [rightIdx]: { ...prev[rightIdx], everWrong: true } }));
      setShakePair({ left: leftIdx, right: rightIdx });
      setTimeout(() => {
        setShakePair({ left: null, right: null });
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  }

  function handleLeftClick(idx: number) {
    if (leftCards[idx]?.matched || shakePair.left !== null) return;
    if (selectedRight !== null) void tryMatch(idx, selectedRight);
    else setSelectedLeft(idx === selectedLeft ? null : idx);
  }
  function handleRightClick(idx: number) {
    if (rightCards[idx]?.matched || shakePair.right !== null) return;
    if (selectedLeft !== null) void tryMatch(selectedLeft, idx);
    else setSelectedRight(idx === selectedRight ? null : idx);
  }
  function handleDrop(e: React.DragEvent, side: "left" | "right", index: number) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as { side: "left" | "right"; index: number };
      if (data.side === side) return;
      if (side === "left") void tryMatch(index, data.index);
      else void tryMatch(data.index, index);
    } catch {
      /* ignore */
    }
  }

  function cardClass(kind: "left" | "right", index: number, cs: CardState | undefined, selected: boolean) {
    const base = "w-full text-left px-3.5 py-3 rounded-xl border font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none";
    if (!cs) return base;
    if (cs.matched) return `${base} border-emerald-500 bg-emerald-50/50 text-emerald-600 opacity-75 cursor-default flex items-center justify-between shadow-sm scale-[0.98]`;
    const shaking = kind === "left" ? shakePair.left === index : shakePair.right === index;
    if (shaking) return `${base} border-red-500 bg-red-50/60 text-red-700 shadow-[0_0_12px_rgba(239,68,68,0.25)] animate-[pg-wiggle_0.4s_ease-in-out]`;
    if (selected) return `${base} border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500 text-emerald-700 shadow-md scale-[1.03]`;
    return `${base} border-stone-200 bg-white text-stone-900 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 active:scale-95`;
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative subtle background glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        @keyframes pg-wiggle { 
          0%, 100% { transform: translateX(0); } 
          20% { transform: translateX(-5px); } 
          40% { transform: translateX(5px); } 
          60% { transform: translateX(-4px); } 
          80% { transform: translateX(4px); } 
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 pb-4 border-b border-stone-200/50">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black text-stone-800 flex items-center gap-2">
            <span>{format(pg.matchedCount, { matched: matchedCount, total: round.length })}</span>
            {combo >= 2 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                className="inline-block text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shadow-sm animate-pulse border border-amber-200/40"
              >
                {format(pg.comboLabel, { combo })}
              </motion.span>
            )}
          </p>
          <div className="w-36 sm:w-44 lg:w-60 h-2 bg-stone-100 rounded-full mt-1.5 overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: `${round.length ? (matchedCount / round.length) * 100 : 0}%` }} />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Power-up: Freeze */}
          {timeLimit && !finished && (
            <button
              onClick={activateFreezeTime}
              disabled={freezeUsed}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                freezeActive
                  ? "bg-sky-500 border-sky-400 text-white animate-pulse"
                  : freezeUsed
                    ? "opacity-40 bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed"
                    : "bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100/50"
              }`}
              title={pg.freezeTitle}
            >
              ❄️
            </button>
          )}

          {/* Power-up: 50/50 */}
          {!finished && (
            <button
              onClick={activate5050Helper}
              disabled={helper5050Used}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                helper5050Used
                  ? "opacity-40 bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100/50"
              }`}
              title={pg.helperTitle}
            >
              ⚡
            </button>
          )}

          {/* SVG countdown timer */}
          {timeLimit && !finished && (
            <div className="flex items-center gap-1.5 bg-stone-50 p-1.5 rounded-xl border border-stone-200/50">
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 transform -rotate-90 overflow-visible" viewBox="0 0 36 36">
                  <circle
                    className="text-stone-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                  <motion.circle
                    className={
                      freezeActive
                        ? "text-sky-500"
                        : timeLeft <= 5
                          ? "text-rose-500"
                          : timeLeft <= 10
                            ? "text-amber-500"
                            : "text-emerald-500"
                    }
                    strokeWidth="3.5"
                    strokeDasharray="100"
                    animate={{ strokeDashoffset: 100 - (timeLeft / timeLimit) * 105 }}
                    transition={{ duration: 0.5 }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                </svg>
                <span className="absolute text-[9px] font-black text-stone-700">
                  {freezeActive ? "❄️" : `${timeLeft}s`}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={startNewRound}
            className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-colors cursor-pointer"
            title={pg.restartTitle}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-stone-400 uppercase tracking-widest mb-1 relative z-10">
        <span>{config.leftLabel}</span>
        <span>{config.rightLabel}</span>
      </div>
      <p className="text-xs text-stone-500 mb-4 relative z-10">{config.hint}</p>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="text-4xl mb-3 animate-bounce">🏆</span>
          <p className="text-lg font-extrabold text-stone-900">
            {submitting ? pg.savingResult : pg.finishedRound}
          </p>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xs">
            {format(pg.finishedDesc, { score, total: round.length })}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="flex flex-col gap-3">
            {leftOrder.map((idx) => (
              <div
                key={`left-${idx}`}
                draggable={!leftCards[idx]?.matched}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ side: "left", index: idx }))}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "left", idx)}
                onClick={() => handleLeftClick(idx)}
                className={cardClass("left", idx, leftCards[idx], selectedLeft === idx)}
              >
                <span className="truncate">{round[idx]?.left}</span>
                {leftCards[idx]?.matched && <span className="text-emerald-500 ml-1.5 shrink-0">✓</span>}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {rightOrder.map((idx) => (
              <div
                key={`right-${idx}`}
                draggable={!rightCards[idx]?.matched}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ side: "right", index: idx }))}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "right", idx)}
                onClick={() => handleRightClick(idx)}
                className={cardClass("right", idx, rightCards[idx], selectedRight === idx)}
              >
                <span className="line-clamp-2">{round[idx]?.right}</span>
                {rightCards[idx]?.matched && <span className="text-emerald-500 ml-1.5 shrink-0">✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
