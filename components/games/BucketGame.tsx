"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { RotateCcw, Timer, Snowflake, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getBucketConfig, getDifficultyTimeLimitSeconds, recordGameSession, type GameType, type GameDifficulty } from "@/lib/games";
import { soundManager } from "@/lib/sounds";
import { useI18n } from "@/lib/i18n/context";
import { localizeBucketConfig } from "@/lib/games-i18n";
import { btnPrimary, panel } from "@/components/ui/system";
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
    <div className={`${panel} relative overflow-hidden p-4 sm:p-5 lg:p-6`}>

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

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 pb-4 border-b border-line">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-black text-ink sm:text-sm">
            <span className="tabular-nums">{format(bg.placedCount, { placed: placedCount, total })}</span>
            {combo >= 2 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                className="inline-block rounded-xs border border-brand-300 px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-brand-700 dark:border-brand-700 dark:text-brand-300"
              >
                {format(bg.comboLabel, { combo })}
              </motion.span>
            )}
          </p>
          <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-xs bg-stone-200 sm:w-44 lg:w-60 dark:bg-stone-800">
            <div className="h-full bg-brand-600 transition-all duration-300 dark:bg-brand-500" style={{ width: `${total > 0 ? (placedCount / total) * 100 : 0}%` }} />
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
                    : "border-stone-300 text-ink-body hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-600"
              }`}
              title={bg.freezeTitle}
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
                  : "border-stone-300 text-ink-body hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-600"
              }`}
              title={bg.helperTitle}
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
                <span className="absolute font-mono text-[9px] font-medium tabular-nums text-ink">
                  {freezeActive ? <Snowflake className="h-3 w-3 text-brand-600" strokeWidth={2} aria-hidden /> : `${timeLeft}s`}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={resetRound}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-line-strong text-ink-muted transition-colors hover:border-stone-400 hover:text-ink dark:border-stone-700 dark:hover:border-stone-600"
            title={bg.restartTitle}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-brand-600 text-white"><Trophy className="h-6 w-6" strokeWidth={1.5} aria-hidden /></span>
          <p className="text-lg font-black text-ink-max">{bg.finishedRound}</p>
          <p className="mt-1 max-w-xs text-xs text-ink-soft sm:text-sm">
            {bg.finishedDesc}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 relative z-10">
            <p className="eyebrow mb-2.5 text-ink-soft">
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
                    className={`cursor-grab select-none rounded-sm border px-3 py-2 text-xs font-semibold transition-colors active:cursor-grabbing sm:text-sm ${
                      isWrong
                        ? "bg-shake border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                        : isSelected
                        ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-200"
                        : "border-stone-300 bg-white text-ink hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600"
                    }`}
                  >
                    {item.term}
                  </div>
                );
              })}
              {sourceItems.length === 0 && <p className="text-sm text-ink-faint">{bg.processing}</p>}
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
                  className={`min-h-[140px] rounded-md border p-4 transition-colors ${
                    isDragOver
                      ? "border-dashed border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950"
                      : selectedId !== null
                      ? "cursor-pointer border-dashed border-stone-400 bg-page hover:border-brand-600 dark:border-stone-600 dark:bg-stone-950"
                      : "border-stone-300 bg-page dark:border-stone-700 dark:bg-stone-950"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-1.5 dark:border-stone-800">
                    <p className="eyebrow text-ink-soft">
                      {bucket.label}
                    </p>
                    {selectedId !== null && (
                      <span className="text-[10px] font-bold text-accent-strong">
                        {bg.tapToDrop}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bucketItems.map((item) => (
                      <span key={item.id} className="rounded-sm border border-line-strong bg-white px-3 py-1.5 text-xs font-bold text-ink dark:border-stone-700 dark:bg-stone-900">
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
                      className={`${btnPrimary} mt-3 w-full px-3 py-2 text-xs`}
                    >
                      <span>{bg.dropHere}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {submitting && <p className="mt-4 text-center text-xs text-ink-faint">{bg.savingResult}</p>}
        </>
      )}
    </div>
  );
}
