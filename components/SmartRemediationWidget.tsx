"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { getUnresolvedMistakeRows, type QuizMistakeRow } from "@/lib/quiz-mistakes";
import type { LessonMeta } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";

interface SmartRemediationWidgetProps {
  userId: string;
  lessonsMeta: LessonMeta[];
}

export default function SmartRemediationWidget({ userId, lessonsMeta }: SmartRemediationWidgetProps) {
  const { t } = useI18n();
  const [criticalMistake, setCriticalMistake] = useState<{
    row: QuizMistakeRow;
    lesson: LessonMeta;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMistakes = async () => {
      try {
        const rows = await getUnresolvedMistakeRows(userId);
        // Find a mistake where they failed at least 2 times
        const critical = rows.find((r) => r.wrong_count >= 2);
        
        if (critical) {
          const lesson = lessonsMeta.find((l) => l.id === critical.lesson_id);
          if (lesson) {
            setCriticalMistake({ row: critical, lesson });
          }
        }
      } catch (err) {
        console.error("Error loading smart remediation:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadMistakes();
  }, [userId, lessonsMeta]);

  if (loading || !criticalMistake) return null;

  const { row, lesson } = criticalMistake;

  return (
    <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/10 dark:bg-rose-950/10 p-4.5 shadow-sm relative overflow-hidden group">
      {/* Light glow effects */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.03] rounded-full blur-2xl pointer-events-none" />

      <div className="flex gap-3.5 items-start">
        <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5.5 h-5.5" />
        </div>
        
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100/60 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border border-rose-200/40">
                {t.smartRemediation.badge}
              </span>
              <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {t.smartRemediation.xpBonus}
              </span>
            </div>

            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-1.5 leading-snug">
              {t.smartRemediation.titlePart1} {row.wrong_count} {t.smartRemediation.titlePart2} &quot;{lesson.title}&quot;
            </h4>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              {t.smartRemediation.description}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/bai-hoc/${lesson.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              {t.smartRemediation.reviewNow} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/game"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-extrabold rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
            >
              {t.smartRemediation.playMiniGame}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
