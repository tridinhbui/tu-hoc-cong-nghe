"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase";
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
    <div className="max-w-6xl mx-auto mb-6">
      <Link
        href="/on-tap-cau-sai"
        className="group block bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 transition-all hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-100">
                {t.finalTwo.mistakeReviewWidget.title}
              </h3>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {format(t.finalTwo.mistakeReviewWidget.countSuffix, { count: mistakeCount })}
              </span>
            </div>
            <p className="text-xs text-rose-700 dark:text-rose-300/80">
              {format(t.finalTwo.mistakeReviewWidget.body, { count: mistakeCount })}
            </p>
          </div>
          <div className="flex-shrink-0 text-rose-500 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
