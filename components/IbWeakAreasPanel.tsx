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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { panel, textLink } from "@/components/ui/system";

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
  maxItems?: number;
}

function accuracyTone(accuracy: number): string {
  if (accuracy >= 80) return "text-accent";
  if (accuracy >= 60) return "text-ink-body";
  return "text-danger";
}

function barTone(accuracy: number): string {
  if (accuracy >= 80) return "bg-brand-600 dark:bg-brand-500";
  if (accuracy >= 60) return "bg-stone-500";
  return "bg-red-600 dark:bg-red-500";
}

export default function IbWeakAreasPanel({ userId, onDrillSection, refreshKey = 0, maxItems = 2 }: Props) {
  const { t } = useI18n();
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tải điểm mạnh yếu từ D1 khi đổi người dùng hoặc vừa xong một lượt; không đọc được lúc render
    void load();
  }, [load, refreshKey]);

  if (!userId || (!loading && performance.length === 0)) return null;

  if (loading) {
    return (
      <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
        <span className="text-xs font-bold text-ink-muted">{t.ibWeakAreas.computingLoading}</span>
      </div>
    );
  }

  const weakest = weakestCategory(performance);
  // Sort lowest accuracy first
  const sortedWeakest = [...performance]
  .filter((p) => p.attempted > 0)
  .sort((a, b) => a.accuracy - b.accuracy)
  .slice(0, maxItems);

  if (sortedWeakest.length === 0) return null;

  return (
    <div className={`${panel} p-5 flex flex-col justify-between`}>
    <div>
    <div className="flex items-center justify-between gap-2 mb-3">
    <h3 className="eyebrow text-ink-soft flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-danger" />
          <span>{t.interview.weakAreasHeading}</span>
        </h3>
        {weakest && (
          <button
          type="button" onClick={() => onDrillSection(weakest.label)}
          className={`${textLink} !text-[11px] cursor-pointer`}
        >
        {t.interview.drillWeakCta}
      </button>
    )}
      </div>

      <div className="space-y-2.5">
      {sortedWeakest.map((p) => (
        <div key={p.category} className="p-3 rounded-sm border border-line-strong">
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <span className="text-xs font-black text-ink truncate">
                  {p.label}
                  </span>
                  <span className={`font-mono text-xs font-medium tabular-nums ${accuracyTone(p.accuracy)}`}>
                  {p.accuracy}% ({p.correct}/{p.attempted})
                </span>
              </div>
              <div className="h-1.5 rounded-xs bg-surface-raised overflow-hidden">
                <div
                className={`h-full transition-all duration-500 ${barTone(p.accuracy)}`}
                style={{ width: `${Math.max(4, p.accuracy)}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
}
