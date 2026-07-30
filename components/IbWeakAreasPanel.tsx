"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, TrendingDown } from "lucide-react";
import {
  getCategoryPerformance,
  weakestCategory,
  isReliable,
  MIN_ATTEMPTS_FOR_SIGNAL,
  type CategoryPerformance,
} from "@/lib/ib-weak-areas";

// Reads the per-question record written by the submit route and turns it into
// "which section should I go back to". Without this the drill could tell you
// you scored 3/5 but not that every miss for the last month has been DCF.
//
// Two things it deliberately does NOT do. It won't name a weakest section
// below MIN_ATTEMPTS_FOR_SIGNAL attempts - 0% over two questions is noise,
// and sending someone to re-drill the wrong 30 questions is worse than
// staying quiet. And it renders nothing at all before the first drill, rather
// than an empty chart implying the feature is broken.

interface Props {
  userId: string | null;
  /** Re-drill a single section. Same handler the post-drill buttons use. */
  onDrillSection: (label: string) => void;
  /** Bumped by the page after each completed run so the panel refetches. */
  refreshKey?: number;
}

function accuracyTone(accuracy: number): string {
  if (accuracy >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (accuracy >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

function barTone(accuracy: number): string {
  if (accuracy >= 80) return "bg-emerald-500";
  if (accuracy >= 60) return "bg-amber-500";
  return "bg-rose-500";
}

export default function IbWeakAreasPanel({ userId, onDrillSection, refreshKey = 0 }: Props) {
  const [performance, setPerformance] = useState<CategoryPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setPerformance(await getCategoryPerformance(userId));
    } catch (error) {
      console.error("Error loading IB weak areas:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  // Nothing to say before the first drill - an empty panel would read as a
  // bug rather than as "you haven't started yet".
  if (!userId || (!loading && performance.length === 0)) return null;

  if (loading) {
    return (
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
        <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Đang tính điểm mạnh yếu...</span>
      </div>
    );
  }

  const weakest = weakestCategory(performance);
  const totalAttempts = performance.reduce((sum, p) => sum + p.attempted, 0);

  return (
    <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h3 className="text-sm font-black uppercase tracking-widest text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-rose-500" />
          Điểm mạnh yếu theo section
        </h3>
        <span className="text-xs font-bold text-stone-400 dark:text-stone-500">{totalAttempts} câu đã làm</span>
      </div>

      {weakest ? (
        <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
          Yếu nhất hiện tại:{" "}
          <strong className="text-rose-600 dark:text-rose-400">{weakest.label}</strong> — đúng{" "}
          {weakest.correct}/{weakest.attempted} ({weakest.accuracy}%).{" "}
          <button
            type="button"
            onClick={() => onDrillSection(weakest.label)}
            className="font-bold text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:no-underline cursor-pointer"
          >
            Luyện lại section này
          </button>
        </p>
      ) : (
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
          Chưa section nào đủ {MIN_ATTEMPTS_FOR_SIGNAL} câu để kết luận. Làm thêm vài lượt nữa rồi quay lại đây.
        </p>
      )}

      <div className="space-y-2.5">
        {performance.map((p) => {
          const reliable = isReliable(p);
          return (
            <div key={p.category}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <button
                  type="button"
                  onClick={() => onDrillSection(p.label)}
                  className="text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 hover:underline underline-offset-2 truncate text-left cursor-pointer"
                >
                  {p.label}
                </button>
                <span className="shrink-0 text-[11px] font-bold tabular-nums">
                  <span className={reliable ? accuracyTone(p.accuracy) : "text-stone-400 dark:text-stone-500"}>
                    {p.accuracy}%
                  </span>
                  <span className="text-stone-400 dark:text-stone-500"> · {p.correct}/{p.attempted}</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    reliable ? barTone(p.accuracy) : "bg-stone-300 dark:bg-stone-700"
                  }`}
                  style={{ width: `${Math.max(2, p.accuracy)}%` }}
                />
              </div>
              {!reliable && (
                <p className="mt-0.5 text-[10px] text-stone-400 dark:text-stone-500">
                  Chưa đủ dữ liệu — cần ít nhất {MIN_ATTEMPTS_FOR_SIGNAL} câu
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
