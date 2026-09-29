"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { getUnresolvedMistakeRows, type QuizMistakeRow } from "@/lib/quiz-mistakes";
import type { LessonMeta } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary, panel } from "@/components/ui/system";

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
    <div className={`${panel} p-4.5 relative overflow-hidden`}>

      <div className="flex gap-3.5 items-start">
        <div className="w-10 h-10 rounded-sm border border-line-strong bg-surface-raised text-alert dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-sm border border-red-300 dark:border-red-800 text-alert-strong">
                {t.smartRemediation.badge}
              </span>
              {/* Huy hiệu "x1.5 XP" đã bỏ: không đường ghi XP nào nhân thưởng cho
                  việc ôn lại câu sai, nên con số ấy là siêu dữ liệu bịa. */}
            </div>

            <h4 className="text-sm font-black tracking-tight text-ink-max mt-1.5 leading-snug">
              {t.smartRemediation.titlePart1} {row.wrong_count} {t.smartRemediation.titlePart2} &quot;{lesson.title}&quot;
            </h4>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              {t.smartRemediation.description}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/bai-hoc/${lesson.slug}`}
              className={`${btnPrimary} !px-3 !py-1.5 !text-xs !gap-1`}
            >
              {t.smartRemediation.reviewNow} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/game"
              className={`${btnSecondary} !px-3 !py-1.5 !text-xs !gap-1`}
            >
              {t.smartRemediation.playMiniGame}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
