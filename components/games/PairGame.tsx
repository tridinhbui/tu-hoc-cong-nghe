"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { RefreshCw, Timer } from "lucide-react";
import { getPairConfig, pickPairRound, getDifficultyTimeLimitSeconds, recordGameSession, type GameType, type GameDifficulty } from "@/lib/games";

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
  const config = useMemo(() => getPairConfig(gameType, difficulty), [gameType, difficulty]);
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
  }

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType, difficulty]);

  // Hard-mode countdown - force-finishes with whatever's matched so far.
  useEffect(() => {
    if (!timeLimit || finished) return;
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
  }, [timeLeft, timeLimit, finished]);

  async function tryMatch(leftIdx: number, rightIdx: number) {
    const l = leftCards[leftIdx];
    const r = rightCards[rightIdx];
    if (!l || !r || l.matched || r.matched) return;

    if (leftIdx === rightIdx) {
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
          const xpEarned = await recordGameSession(userId, gameType, newScore, round.length);
          onFinished(newScore, round.length, xpEarned);
        } catch {
          onFinished(newScore, round.length, 0);
        } finally {
          setSubmitting(false);
        }
      }
    } else {
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
    if (cs.matched) return `${base} border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 opacity-75 cursor-default flex items-center justify-between shadow-sm scale-[0.98]`;
    const shaking = kind === "left" ? shakePair.left === index : shakePair.right === index;
    if (shaking) return `${base} border-red-500 bg-red-50/60 dark:bg-red-950/30 text-red-700 dark:text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)] animate-[pg-wiggle_0.4s_ease-in-out]`;
    if (selected) return `${base} border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500 dark:ring-emerald-500 text-emerald-700 dark:text-emerald-450 shadow-md scale-[1.03]`;
    return `${base} border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-105 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 active:scale-95`;
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm relative overflow-hidden">
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

      <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-extrabold text-stone-850 dark:text-stone-250">Đã ghép {matchedCount}/{round.length} cặp</p>
          <div className="w-36 sm:w-44 lg:w-60 h-2 bg-stone-100 dark:bg-stone-800/80 rounded-full mt-1.5 overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: `${round.length ? (matchedCount / round.length) * 100 : 0}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {timeLimit && !finished && (
            <span className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-2 rounded-xl ${timeLeft <= 10 ? "text-rose-600 bg-rose-50 dark:bg-rose-950/40 animate-pulse" : "text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800"}`}>
              <Timer className="w-3.5 h-3.5" />
              {timeLeft}s
            </span>
          )}
          <button
            onClick={startNewRound}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-105 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1 relative z-10">
        <span>{config.leftLabel}</span>
        <span>{config.rightLabel}</span>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 relative z-10">{config.hint}</p>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="text-4xl mb-3 animate-bounce">🏆</span>
          <p className="text-lg font-extrabold text-stone-900 dark:text-stone-50">
            {submitting ? "Đang lưu kết quả..." : "Hoàn thành ván chơi!"}
          </p>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-450 mt-1 max-w-xs">
            Bạn đạt được {score}/{round.length} cặp ghép đúng ở lượt đầu tiên. Bấm &quot;Chơi lại&quot; để tiếp tục rèn luyện!
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
