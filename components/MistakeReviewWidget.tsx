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
        className="group block bg-white dark:bg-stone-900 border border-amber-200/90 dark:border-amber-900/60 rounded-3xl p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:border-amber-300 relative overflow-hidden"
      >
        {/* Cụm lá góc phải dưới, cùng tone brand */}
        <div className="absolute -bottom-1 -right-1 w-20 h-14 opacity-80 pointer-events-none select-none z-0">
          <svg viewBox="0 0 80 50" fill="none" className="w-full h-full">
            <path d="M50 50C45 35 30 25 20 28C25 35 35 45 45 50Z" fill="#6c9bdc" opacity="0.8" />
            <path d="M60 50C58 30 45 15 35 20C40 30 50 42 55 50Z" fill="#417acd" opacity="0.9" />
            <path d="M70 50C68 25 55 8 45 14C52 24 62 38 68 50Z" fill="#2961b8" />
            <path d="M78 50C75 32 68 20 60 25C65 35 72 44 76 50Z" fill="#9fbfe9" opacity="0.85" />
          </svg>
        </div>

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-[#f59e0b] text-white shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <AlertCircle className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm sm:text-base font-black text-ink group-hover:text-warn-strong transition-colors">
                {t.finalTwo.mistakeReviewWidget.title}
              </h3>
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#fef3c7] dark:bg-amber-950/80 text-[#92400e] dark:text-amber-300 border border-amber-300/80 dark:border-amber-800 text-[10.5px] font-black">
                {format(t.finalTwo.mistakeReviewWidget.countSuffix, { count: mistakeCount })}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#b45309] dark:text-amber-400 leading-snug">
              {format(t.finalTwo.mistakeReviewWidget.body, { count: mistakeCount })}
            </p>
          </div>

          <div className="shrink-0 text-warn group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
