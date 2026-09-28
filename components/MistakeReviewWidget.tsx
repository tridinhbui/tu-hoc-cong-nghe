"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface MistakeReviewWidgetProps {
  userId: string;
}

export default function MistakeReviewWidget({ userId }: MistakeReviewWidgetProps) {
  const { t } = useI18n();
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMistakes = async () => {
      try {
        const { getUnresolvedMistakeCount } = await import("@/lib/quiz-mistakes");
        const count = await getUnresolvedMistakeCount(userId);
        setMistakeCount(count);
      } catch (error) {
        console.error("Failed to load mistake count:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMistakes();
  }, [userId]);

  if (loading || mistakeCount === 0) return null;

  return (
    <div className="w-full mb-4">
      <Link
        href="/on-tap-cau-sai"
        className="group block bg-white dark:bg-stone-900 border border-line-strong rounded-md p-4 sm:p-5 transition-colors hover:border-stone-950 dark:hover:border-stone-300 relative overflow-hidden"
      >
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-10 h-10 rounded-sm border border-stone-300 bg-[#f3f1ec] text-warn dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-ink-max">
                {t.finalTwo.mistakeReviewWidget.title}
              </h3>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm border border-line-strong text-[10.5px] font-bold text-ink-muted">
                {format(t.finalTwo.mistakeReviewWidget.countSuffix, { count: mistakeCount })}
              </span>
            </div>
            <p className="text-xs font-medium text-ink-soft leading-snug">
              {format(t.finalTwo.mistakeReviewWidget.body, { count: mistakeCount })}
            </p>
          </div>

          <div className="shrink-0 text-ink-muted group-hover:text-accent-strong transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
