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
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-3 sm:p-4 lg:p-6">
      <style>{`
        @keyframes bg-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .bg-shake { animation: bg-shake 0.5s ease-in-out; }
      `}</style>

      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">Đã xếp đúng {placedCount}/{total}</p>
          <div className="w-32 sm:w-40 lg:w-56 h-1.5 sm:h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-1 sm:mt-1.5">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${total > 0 ? (placedCount / total) * 100 : 0}%` }} />
          </div>
        </div>
        <button
          onClick={resetRound}
          className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border-2 border-stone-200 dark:border-stone-800 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Chơi lại</span>
          <span className="sm:hidden">Lại</span>
        </button>
      </div>

      {finished ? (
        <div className="text-center py-10">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">Hoàn thành ván chơi!</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Bấm &quot;Chơi lại&quot; để thử một ván mới.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6">
            <p className="text-[11px] sm:text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">{config.sourceHint}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {sourceItems.map((item) => {
                const isSelected = selectedId === item.id;
                const isWrong = wrongFlashId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", String(item.id))}
                    onClick={() => setSelectedId((cur) => (cur === item.id ? null : item.id))}
                    className={`select-none cursor-pointer rounded-xl border-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors ${
                      isWrong
                        ? "bg-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                        : isSelected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                        : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700"
                    }`}
                  >
                    {item.term}
                  </div>
                );
              })}
              {sourceItems.length === 0 && <p className="text-sm text-stone-400 dark:text-stone-500 italic">Đang xử lý...</p>}
            </div>
          </div>

          <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
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
                  className={`min-h-[120px] rounded-2xl border-2 p-3 transition-colors ${
                    isDragOver
                      ? "border-dashed border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30"
                      : "border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40"
                  } ${selectedId !== null ? "cursor-pointer" : ""}`}
                >
                  <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">{bucket.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bucketItems.map((item) => (
                      <span key={item.id} className="rounded-lg border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1.5 text-xs font-semibold">
                        {item.term}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {submitting && <p className="text-center text-sm text-stone-400 dark:text-stone-500 mt-4">Đang lưu kết quả...</p>}
        </>
      )}
    </div>
  );
}
