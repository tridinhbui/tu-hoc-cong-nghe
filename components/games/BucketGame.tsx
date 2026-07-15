"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { getBucketConfig, recordGameSession, type GameType } from "@/lib/games";

interface BucketGameProps {
  userId: string;
  gameType: GameType;
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
// getBucketConfig(gameType) - one component powers financial-statement-match,
// ratio-category, and any future bucket game without code changes.
export default function BucketGame({ userId, gameType, onFinished }: BucketGameProps) {
  const config = useMemo(() => getBucketConfig(gameType), [gameType]);

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

  const total = items.length;
  const placedCount = items.filter((it) => it.placed).length;

  function resetRound() {
    setItems(buildRound());
    setSelectedId(null);
    setDragOverBucket(null);
    setWrongFlashId(null);
    setSubmitting(false);
    setFinished(false);
  }

  async function handleFinish(finalItems: RoundItem[]) {
    const score = finalItems.filter((it) => it.scored === true).length;
    setSubmitting(true);
    try {
      const xpEarned = await recordGameSession(userId, gameType, score, total);
      setFinished(true);
      onFinished(score, total, xpEarned);
    } finally {
      setSubmitting(false);
    }
  }

  function attemptPlace(itemId: number, bucket: string) {
    const item = items.find((it) => it.id === itemId);
    if (!item || item.placed) return;

    if (item.bucket === bucket) {
      const nextItems = items.map((it) =>
        it.id === itemId ? { ...it, placed: true, scored: it.scored === null ? true : it.scored } : it
      );
      setItems(nextItems);
      setSelectedId(null);
      if (nextItems.every((it) => it.placed)) void handleFinish(nextItems);
    } else {
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
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm relative overflow-hidden">
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

      <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-extrabold text-stone-850 dark:text-stone-250">Đã xếp đúng {placedCount}/{total}</p>
          <div className="w-36 sm:w-44 lg:w-60 h-2 bg-stone-100 dark:bg-stone-800/80 rounded-full overflow-hidden mt-1.5 shadow-inner">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: `${total > 0 ? (placedCount / total) * 100 : 0}%` }} />
          </div>
        </div>
        <button
          onClick={resetRound}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-105 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Chơi lại</span>
        </button>
      </div>

      {finished ? (
        <div className="text-center py-10 relative z-10 flex flex-col items-center">
          <span className="text-4xl mb-3 animate-bounce">🏆</span>
          <p className="text-lg font-extrabold text-stone-900 dark:text-stone-50">Hoàn thành ván chơi!</p>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xs">
            Chúc mừng bạn đã hoàn thành phân loại! Hãy bấm &quot;Chơi lại&quot; ở trên để nâng cao kỷ lục và tích lũy thêm XP.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 relative z-10">
            <p className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2.5">
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
                        ? "bg-shake border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                        : isSelected
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)] scale-[1.04]"
                        : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 text-stone-800 dark:text-stone-200 hover:border-emerald-350 dark:hover:border-emerald-700 hover:shadow"
                    }`}
                  >
                    {item.term}
                  </div>
                );
              })}
              {sourceItems.length === 0 && <p className="text-sm text-stone-400 dark:text-stone-500 italic">Đang xử lý...</p>}
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
                      ? "border-dashed border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.02]"
                      : selectedId !== null 
                      ? "cursor-pointer border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/40 hover:border-emerald-400 dark:hover:border-emerald-700"
                      : "border-stone-200 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-900/30 hover:bg-stone-50/80 dark:hover:bg-stone-900/50"
                  }`}
                >
                  <p className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-200/55 dark:border-stone-800/55">
                    {bucket.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bucketItems.map((item) => (
                      <span key={item.id} className="rounded-lg border border-emerald-250 dark:border-emerald-900/80 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 text-xs font-extrabold shadow-sm transition-transform duration-250 hover:scale-105">
                        {item.term}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {submitting && <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-4 animate-pulse">Đang lưu kết quả...</p>}
        </>
      )}
    </div>
  );
}
