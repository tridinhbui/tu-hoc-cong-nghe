"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getPairConfig, pickPairRound, recordGameSession, type GameType } from "@/lib/games";

interface Props {
  userId: string;
  gameType: GameType;
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
export default function PairGame({ userId, gameType, onFinished }: Props) {
  const config = useMemo(() => getPairConfig(gameType), [gameType]);
  const [round, setRound] = useState<{ left: string; right: string }[]>(() => pickPairRound(gameType));
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

  function startNewRound() {
    const newRound = pickPairRound(gameType);
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
    setFinished(false);
    setSubmitting(false);
  }

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType]);

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
    const base = "w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all cursor-pointer select-none";
    if (!cs) return base;
    if (cs.matched) return `${base} border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 cursor-default`;
    const shaking = kind === "left" ? shakePair.left === index : shakePair.right === index;
    if (shaking) return `${base} border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 animate-[pg-wiggle_0.5s_ease-in-out]`;
    if (selected) return `${base} border-stone-900 dark:border-stone-100 ring-2 ring-stone-900 dark:ring-stone-100 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100`;
    return `${base} border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-emerald-400 dark:hover:border-emerald-600`;
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-3 sm:p-4 lg:p-6">
      <style>{`@keyframes pg-wiggle{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>

      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">Đã ghép {matchedCount}/{round.length} cặp</p>
          <div className="w-32 sm:w-40 lg:w-56 h-1.5 sm:h-2 bg-stone-100 dark:bg-stone-800 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${round.length ? (matchedCount / round.length) * 100 : 0}%` }} />
          </div>
        </div>
        <button
          onClick={startNewRound}
          className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border-2 border-stone-200 dark:border-stone-800 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex-shrink-0"
        >
          <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Chơi lại</span>
          <span className="sm:hidden">Lại</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
        <span>{config.leftLabel}</span>
        <span>{config.rightLabel}</span>
      </div>
      <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mb-3 sm:mb-4">{config.hint}</p>

      {finished ? (
        <div className="text-center py-10">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{submitting ? "Đang lưu kết quả..." : "Hoàn thành ván chơi!"}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Điểm: {score}/{round.length}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex flex-col gap-2.5">
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
                {round[idx]?.left}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
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
                {round[idx]?.right}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
