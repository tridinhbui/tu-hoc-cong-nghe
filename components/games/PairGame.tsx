"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { RefreshCw, Timer, Snowflake, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getPairConfig, pickPairRoundFrom, getDifficultyTimeLimitSeconds, recordGameSession, type GameType, type GameDifficulty } from "@/lib/games";
import { soundManager } from "@/lib/sounds";
import { useI18n } from "@/lib/i18n/context";
import { localizePairConfig } from "@/lib/games-i18n";
import { panel } from "@/components/ui/system";
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
  // Ván chơi phải rút TỪ `config`, không phải từ pickPairRound(gameType):
  // hàm đó tự gọi lại getPairConfig nên luôn trả về pool tiếng Việt, và nhãn
  // cột đã dịch sẽ đứng trên những thẻ bài chưa dịch.
  //
  // `config.pool` của `en-vi-terms` và `ticker-match` vẫn nguyên tiếng Việt -
  // đó là ràng buộc của lớp phủ, không phải việc của file này.
  const config = useMemo(
    () => localizePairConfig(getPairConfig(gameType, difficulty), gameType, locale),
    [gameType, difficulty, locale]
  );
  const timeLimit = getDifficultyTimeLimitSeconds(difficulty);
  const [round, setRound] = useState<{ left: string; right: string }[]>(() => pickPairRoundFrom(config));
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
    const newRound = pickPairRoundFrom(config);
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
    const base = "w-full cursor-pointer select-none rounded-sm border px-3.5 py-3 text-left text-xs font-bold transition-colors sm:text-sm";
    if (!cs) return base;
    if (cs.matched) return `${base} flex cursor-default items-center justify-between border-stone-200 bg-stone-100 text-ink-muted dark:border-stone-800 dark:bg-stone-950`;
    const shaking = kind === "left" ? shakePair.left === index : shakePair.right === index;
    // Rung khi ghép sai là cơ chế của trò chơi, không phải trang trí - giữ lại.
    if (shaking) return `${base} animate-[pg-wiggle_0.4s_ease-in-out] border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300`;
    if (selected) return `${base} border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-200`;
    return `${base} border-stone-300 bg-white text-ink hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300`;
  }

  return (
    <div className={`${panel} relative overflow-hidden p-4 sm:p-5 lg:p-6`}>

      <style>{`
        @keyframes pg-wiggle { 
          0%, 100% { transform: translateX(0); } 
          20% { transform: translateX(-5px); } 
          40% { transform: translateX(5px); } 
          60% { transform: translateX(-4px); } 
          80% { transform: translateX(4px); } 
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 pb-4 border-b border-line">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-black text-ink sm:text-sm">
            <span className="tabular-nums">{format(pg.matchedCount, { matched: matchedCount, total: round.length })}</span>
            {combo >= 2 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                className="inline-block rounded-xs border border-brand-300 px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-brand-700 dark:border-brand-700 dark:text-brand-300"
              >
                {format(pg.comboLabel, { combo })}
              </motion.span>
            )}
          </p>
          <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-xs bg-stone-200 sm:w-44 lg:w-60 dark:bg-stone-800">
            <div className="h-full bg-brand-600 transition-all duration-300 dark:bg-brand-500" style={{ width: `${round.length ? (matchedCount / round.length) * 100 : 0}%` }} />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Power-up: Freeze */}
          {timeLimit && !finished && (
            <button
              onClick={activateFreezeTime}
              disabled={freezeUsed}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                freezeActive
                  ? "border-brand-600 bg-brand-600 text-white"
                  : freezeUsed
                    ? "cursor-not-allowed border-stone-200 text-ink-faint opacity-40 dark:border-stone-800"
                    : "border-stone-300 text-ink-body hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
              }`}
              title={pg.freezeTitle}
            >
              <Snowflake className="w-4 h-4" strokeWidth={1.75} aria-hidden />
            </button>
          )}

          {/* Power-up: 50/50 */}
          {!finished && (
            <button
              onClick={activate5050Helper}
              disabled={helper5050Used}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                helper5050Used
                  ? "cursor-not-allowed border-stone-200 text-ink-faint opacity-40 dark:border-stone-800"
                  : "border-stone-300 text-ink-body hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
              }`}
              title={pg.helperTitle}
            >
              <Zap className="w-4 h-4" strokeWidth={1.75} aria-hidden />
            </button>
          )}

          {/* SVG countdown timer */}
          {timeLimit && !finished && (
            <div className="flex items-center gap-1.5 rounded-sm border border-line-strong p-0.5 dark:border-stone-700">
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 transform -rotate-90 overflow-visible" viewBox="0 0 36 36">
                  <circle
                    className="text-stone-200 dark:text-stone-800"
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
                        ? "text-stone-400"
                        : timeLeft <= 5
                          ? "text-rose-500"
                          : "text-brand-500"
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
                <span className="absolute font-mono text-[9px] font-medium tabular-nums text-ink">
                  {freezeActive ? <Snowflake className="h-3 w-3 text-brand-600" strokeWidth={2} aria-hidden /> : `${timeLeft}s`}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={startNewRound}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-line-strong text-ink-muted transition-colors hover:border-stone-950 hover:text-ink dark:border-stone-700 dark:hover:border-stone-300"
            title={pg.restartTitle}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="eyebrow relative z-10 mb-1 grid grid-cols-2 gap-2 text-ink-soft">
        <span>{config.leftLabel}</span>
        <span>{config.rightLabel}</span>
      </div>
      <p className="relative z-10 mb-4 text-xs text-ink-muted">{config.hint}</p>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950"><Trophy className="h-6 w-6" strokeWidth={1.5} aria-hidden /></span>
          <p className="text-lg font-black text-ink-max">
            {submitting ? pg.savingResult : pg.finishedRound}
          </p>
          <p className="mt-1 max-w-xs text-xs text-ink-soft sm:text-sm">
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
                {leftCards[idx]?.matched && <span className="ml-1.5 shrink-0 text-accent">✓</span>}
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
                {rightCards[idx]?.matched && <span className="ml-1.5 shrink-0 text-accent">✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
