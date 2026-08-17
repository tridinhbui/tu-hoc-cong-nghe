"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { RotateCcw, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getBucketConfig, getDifficultyTimeLimitSeconds, recordGameSession, type GameType, type GameDifficulty } from "@/lib/games";
import { soundManager } from "@/lib/sounds";
import { useI18n } from "@/lib/i18n/context";
import { localizeBucketConfig } from "@/lib/games-i18n";
import { format } from "@/lib/i18n";

interface BucketGameProps {
  userId: string;
  gameType: GameType;
  difficulty?: GameDifficulty;
  onFinished: (score: number, total: number, xpEarned: number) => void;
}

interface RoundItem {
  id: number;
  term: string;
  bucket: string;
  placed: boolean;
  scored: boolean | null; // null = not yet scored; set on first attempt only
}

// Generic "drag each item into the correct category column" game, driven by
// getBucketConfig(gameType) - one component powers system-dashboard-match,
// ratio-category, and any future bucket game without code changes.
export default function BucketGame({ userId, gameType, difficulty = "trung-binh", onFinished }: BucketGameProps) {
  const { t, locale } = useI18n();
  const bg = t.games.bucketGame;
  // Dịch NGAY tại đây chứ không lúc vẽ: `config.buckets[].label` là thứ người
  // chơi thả thẻ vào, và nó cũng đi vào phần so khớp bên dưới.
  const config = useMemo(
    () => localizeBucketConfig(getBucketConfig(gameType, difficulty), gameType, locale),
    [gameType, difficulty, locale]
  );
  const timeLimit = getDifficultyTimeLimitSeconds(difficulty);

  const buildRound = useMemo(
    () => () => {
      const shuffled = [...config.items].sort(() => Math.random() - 0.5).slice(0, config.roundSize);
      return shuffled.map((item, i) => ({ id: i, term: item.term, bucket: item.bucket, placed: false, scored: null as boolean | null }));
    },
    [config]
  );

  const [items, setItems] = useState<RoundItem[]>(() => buildRound());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragOverBucket, setDragOverBucket] = useState<string | null>(null);
  const [wrongFlashId, setWrongFlashId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit ?? 0);
  
  // Advanced features states
  const [combo, setCombo] = useState(0);
  const [freezeActive, setFreezeActive] = useState(false);
  const [freezeUsed, setFreezeUsed] = useState(false);
  const [helper5050Used, setHelper5050Used] = useState(false);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const total = items.length;
  const placedCount = items.filter((it) => it.placed).length;

  function resetRound() {
    setItems(buildRound());
    setSelectedId(null);
    setDragOverBucket(null);
    setWrongFlashId(null);
    setSubmitting(false);
    setFinished(false);
    setTimeLeft(timeLimit ?? 0);
    setCombo(0);
    setFreezeActive(false);
    setFreezeUsed(false);
    setHelper5050Used(false);
  }

  async function handleFinish(finalItems: RoundItem[]) {
    const score = finalItems.filter((it) => it.scored === true).length;
    setSubmitting(true);
    try {
      const xpEarned = await recordGameSession(userId, gameType, score, total);
      setFinished(true);
      if (score / total >= 0.7) {
        soundManager.playWin();
      } else {
        soundManager.playWrong();
      }
      onFinished(score, total, xpEarned);
    } finally {
      setSubmitting(false);
    }
  }

  // Hard-mode countdown - ticks down once per second and force-finishes the
  // round (scoring whatever's placed so far) if it hits 0 before all items
  // are placed.
  useEffect(() => {
    if (!timeLimit || finished) return;
    if (freezeActive) return; // Freeze time power-up
    if (timeLeft <= 0) {
      void handleFinish(itemsRef.current);
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
    toast.success(bg.toastFreezeOn);
    window.setTimeout(() => {
      setFreezeActive(false);
      toast.info(bg.toastFreezeOff);
    }, 5000);
  };

  const activate5050Helper = () => {
    if (helper5050Used || finished) return;
    setHelper5050Used(true);
    
    const unplaced = items.filter(it => !it.placed);
    if (unplaced.length === 0) return;
    
    // Auto-place up to 2 items
    const itemsToPlace = [...unplaced].sort(() => Math.random() - 0.5).slice(0, Math.min(unplaced.length, 2));
    const placedIds = itemsToPlace.map(it => it.id);
    
    const nextItems = items.map(it => 
      placedIds.includes(it.id) ? { ...it, placed: true, scored: true } : it
    );
    
    setItems(nextItems);
    soundManager.playPowerup();
    toast.success(format(bg.toastHelper, { count: itemsToPlace.length }));
    
    if (nextItems.every((it) => it.placed)) {
      void handleFinish(nextItems);
    }
  };

  function attemptPlace(itemId: number, bucket: string) {
    const item = items.find((it) => it.id === itemId);
    if (!item || item.placed) return;

    if (item.bucket === bucket) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      if (nextCombo >= 2) {
        soundManager.playCombo(nextCombo);
      } else {
        soundManager.playCorrect();
      }
      
      const nextItems = items.map((it) =>
        it.id === itemId ? { ...it, placed: true, scored: it.scored === null ? true : it.scored } : it
      );
      setItems(nextItems);
      setSelectedId(null);
      if (nextItems.every((it) => it.placed)) void handleFinish(nextItems);
    } else {
      setCombo(0); // Reset combo
      soundManager.playWrong();
      const targetBucketLabel = config.buckets.find((b) => b.id === item.bucket)?.label || bg.correctBucketFallback;
      toast.error(format(bg.toastWrongBucket, { term: item.term, target: targetBucketLabel }));
      setItems((prev) => prev.map((it) => (it.id === itemId && it.scored === null ? { ...it, scored: false } : it)));
      setSelectedId(null);
      setWrongFlashId(itemId);
      window.setTimeout(() => setWrongFlashId((cur) => (cur === itemId ? null : cur)), 550);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, bucket: string) {
    e.preventDefault();
    setDragOverBucket(null);
    const itemId = Number(e.dataTransfer.getData("text/plain"));
    if (!Number.isNaN(itemId)) attemptPlace(itemId, bucket);
  }

  const sourceItems = items.filter((it) => !it.placed);
  const gridCols = config.buckets.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative subtle background glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        @keyframes bg-shake { 
          0%, 100% { transform: translateX(0); } 
          20% { transform: translateX(-6px); } 
          40% { transform: translateX(6px); } 
          60% { transform: translateX(-4px); } 
          80% { transform: translateX(4px); } 
        }
        .bg-shake { animation: bg-shake 0.4s ease-in-out; }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 pb-4 border-b border-stone-200/50">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black text-stone-800 flex items-center gap-2">
            <span>{format(bg.placedCount, { placed: placedCount, total })}</span>
            {combo >= 2 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                className="inline-block text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shadow-sm animate-pulse border border-amber-200/40"
              >
                {format(bg.comboLabel, { combo })}
              </motion.span>
            )}
          </p>
          <div className="w-36 sm:w-44 lg:w-60 h-2 bg-stone-100 rounded-full overflow-hidden mt-1.5 shadow-inner">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: `${total > 0 ? (placedCount / total) * 100 : 0}%` }} />
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
              title={bg.freezeTitle}
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
              title={bg.helperTitle}
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
                    animate={{ strokeDashoffset: 100 - (timeLeft / timeLimit) * 100 }}
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
            onClick={resetRound}
            className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-colors cursor-pointer"
            title={bg.restartTitle}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="text-4xl mb-3 animate-bounce">🏆</span>
          <p className="text-lg font-extrabold text-stone-900">{bg.finishedRound}</p>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xs">
            {bg.finishedDesc}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 relative z-10">
            <p className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest mb-2.5">
              {config.sourceHint}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {sourceItems.map((item) => {
                const isSelected = selectedId === item.id;
                const isWrong = wrongFlashId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", String(item.id))}
                    onClick={() => setSelectedId((cur) => (cur === item.id ? null : item.id))}
                    className={`select-none cursor-grab rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 active:cursor-grabbing ${
                      isWrong
                        ? "bg-shake border-red-500 bg-red-50/50 text-red-700 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                        : isSelected
                        ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-[0_0_12px_rgba(16,185,129,0.2)] scale-[1.04]"
                        : "border-stone-200 bg-white text-stone-800 hover:border-emerald-300 hover:shadow"
                    }`}
                  >
                    {item.term}
                  </div>
                );
              })}
              {sourceItems.length === 0 && <p className="text-sm text-stone-400 italic">{bg.processing}</p>}
            </div>
          </div>

          <div className={`grid grid-cols-1 ${gridCols} gap-4 relative z-10`}>
            {config.buckets.map((bucket) => {
              const bucketItems = items.filter((it) => it.placed && it.bucket === bucket.id);
              const isDragOver = dragOverBucket === bucket.id;
              return (
                <div
                  key={bucket.id}
                  onDragOver={(e) => { e.preventDefault(); if (dragOverBucket !== bucket.id) setDragOverBucket(bucket.id); }}
                  onDragLeave={() => setDragOverBucket((cur) => (cur === bucket.id ? null : cur))}
                  onDrop={(e) => handleDrop(e, bucket.id)}
                  onClick={() => selectedId !== null && attemptPlace(selectedId, bucket.id)}
                  className={`min-h-[140px] rounded-2xl border-2 p-4 transition-all duration-300 ${
                    isDragOver
                      ? "border-dashed border-emerald-500 bg-emerald-50/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.02]"
                      : selectedId !== null 
                      ? "cursor-pointer border-dashed border-stone-300 bg-stone-50/60 hover:border-emerald-400"
                      : "border-stone-200 bg-stone-50/40 hover:bg-stone-50/80"
                  }`}
                >
                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/55 mb-3">
                    <p className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">
                      {bucket.label}
                    </p>
                    {selectedId !== null && (
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                        {bg.tapToDrop}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bucketItems.map((item) => (
                      <span key={item.id} className="rounded-lg border border-emerald-200 bg-emerald-50/60 text-emerald-700 px-3 py-1.5 text-xs font-extrabold shadow-sm transition-transform duration-250 hover:scale-105">
                        {item.term}
                      </span>
                    ))}
                  </div>
                  {selectedId !== null && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        attemptPlace(selectedId, bucket.id);
                      }}
                      className="mt-3 w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{bg.dropHere}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {submitting && <p className="text-center text-xs text-stone-400 mt-4 animate-pulse">{bg.savingResult}</p>}
        </>
      )}
    </div>
  );
}
