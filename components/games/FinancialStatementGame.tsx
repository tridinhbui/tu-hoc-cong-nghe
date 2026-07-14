"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  pickStatementRound,
  recordGameSession,
  STATEMENT_LABELS,
  type StatementBucket,
  type StatementItem,
} from "@/lib/games";

interface FinancialStatementGameProps {
  userId: string;
  onFinished: (score: number, total: number, xpEarned: number) => void;
}

interface RoundItem extends StatementItem {
  id: number;
  placed: boolean;
  scored: boolean | null; // null = not yet scored, true/false = outcome of first attempt
}

const BUCKETS: StatementBucket[] = ["balance-sheet", "income-statement", "cash-flow"];

function buildRound(): RoundItem[] {
  return pickStatementRound(10).map((item, i) => ({
    ...item,
    id: i,
    placed: false,
    scored: null,
  }));
}

export default function FinancialStatementGame({ userId, onFinished }: FinancialStatementGameProps) {
  const [items, setItems] = useState<RoundItem[]>(() => buildRound());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragOverBucket, setDragOverBucket] = useState<StatementBucket | null>(null);
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
      const xpEarned = await recordGameSession(userId, "financial-statement-match", score, total);
      setFinished(true);
      onFinished(score, total, xpEarned);
    } finally {
      setSubmitting(false);
    }
  }

  function attemptPlace(itemId: number, bucket: StatementBucket) {
    const item = items.find((it) => it.id === itemId);
    if (!item || item.placed) return;

    const isCorrect = item.bucket === bucket;

    if (isCorrect) {
      const nextItems = items.map((it) =>
        it.id === itemId
          ? { ...it, placed: true, scored: it.scored === null ? true : it.scored }
          : it
      );
      setItems(nextItems);
      setSelectedId(null);
      const allPlaced = nextItems.every((it) => it.placed);
      if (allPlaced) {
        void handleFinish(nextItems);
      }
    } else {
      // Record a first-attempt miss for scoring, but keep the item in the source area.
      setItems((prev) =>
        prev.map((it) => (it.id === itemId && it.scored === null ? { ...it, scored: false } : it))
      );
      setSelectedId(null);
      setWrongFlashId(itemId);
      window.setTimeout(() => {
        setWrongFlashId((cur) => (cur === itemId ? null : cur));
      }, 550);
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, itemId: number) {
    e.dataTransfer.setData("text/plain", String(itemId));
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, bucket: StatementBucket) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverBucket !== bucket) setDragOverBucket(bucket);
  }

  function handleDragLeave(bucket: StatementBucket) {
    setDragOverBucket((cur) => (cur === bucket ? null : cur));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, bucket: StatementBucket) {
    e.preventDefault();
    setDragOverBucket(null);
    const idStr = e.dataTransfer.getData("text/plain");
    const itemId = Number(idStr);
    if (Number.isNaN(itemId)) return;
    attemptPlace(itemId, bucket);
  }

  function handleCardClick(itemId: number) {
    const item = items.find((it) => it.id === itemId);
    if (!item || item.placed) return;
    setSelectedId((cur) => (cur === itemId ? null : itemId));
  }

  function handleBucketClick(bucket: StatementBucket) {
    if (selectedId === null) return;
    attemptPlace(selectedId, bucket);
  }

  const sourceItems = items.filter((it) => !it.placed);

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6">
      <style>{`
        @keyframes fsg-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .fsg-shake {
          animation: fsg-shake 0.5s ease-in-out;
        }
      `}</style>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Đã xếp đúng {placedCount}/{total}
          </p>
          <div className="w-40 sm:w-56 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${total > 0 ? (placedCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
        <button
          onClick={resetRound}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border-2 border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Chơi lại
        </button>
      </div>

      {finished ? (
        <div className="text-center py-10">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">Hoàn thành ván chơi!</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Bấm &quot;Chơi lại&quot; để thử một ván mới.
          </p>
        </div>
      ) : (
        <>
          {/* Source area */}
          <div className="mb-6">
            <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
              Kéo hoặc chọn thẻ, rồi thả vào đúng báo cáo
            </p>
            <div className="flex flex-wrap gap-2">
              {sourceItems.map((item) => {
                const isSelected = selectedId === item.id;
                const isWrong = wrongFlashId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => handleCardClick(item.id)}
                    className={`select-none cursor-pointer rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors ${
                      isWrong
                        ? "fsg-shake border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                        : isSelected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                        : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700"
                    }`}
                  >
                    {item.term}
                  </div>
                );
              })}
              {sourceItems.length === 0 && (
                <p className="text-sm text-stone-400 dark:text-stone-500 italic">Đang xử lý...</p>
              )}
            </div>
          </div>

          {/* Destination buckets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUCKETS.map((bucket) => {
              const bucketItems = items.filter((it) => it.placed && it.bucket === bucket);
              const isDragOver = dragOverBucket === bucket;
              return (
                <div
                  key={bucket}
                  onDragOver={(e) => handleDragOver(e, bucket)}
                  onDragLeave={() => handleDragLeave(bucket)}
                  onDrop={(e) => handleDrop(e, bucket)}
                  onClick={() => handleBucketClick(bucket)}
                  className={`min-h-[140px] rounded-2xl border-2 p-3 transition-colors ${
                    isDragOver
                      ? "border-dashed border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30"
                      : "border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40"
                  } ${selectedId !== null ? "cursor-pointer" : ""}`}
                >
                  <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                    {STATEMENT_LABELS[bucket]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {bucketItems.map((item) => (
                      <span
                        key={item.id}
                        className="rounded-lg border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1.5 text-xs font-semibold"
                      >
                        {item.term}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {submitting && (
            <p className="text-center text-sm text-stone-400 dark:text-stone-500 mt-4">Đang lưu kết quả...</p>
          )}
        </>
      )}
    </div>
  );
}
