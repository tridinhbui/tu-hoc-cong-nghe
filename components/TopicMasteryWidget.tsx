"use client";

import { useState } from "react";
import Link from "next/link";
import { DOMAIN_NAMES, type DomainType } from "@/lib/levels";
import { BrainCircuit, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function TopicMasteryWidget({ compact = false }: { compact?: boolean }) {
  // Mastery scores inspired by user's actual progress stats
  const [mastery] = useState<Record<DomainType, { score: number; level: string; totalLessons: number; done: number }>>({
    accounting: { score: 85, level: "Thành thục", totalLessons: 12, done: 10 },
    valuation: { score: 45, level: "Cần cải thiện", totalLessons: 10, done: 4 },
    corporate_finance: { score: 70, level: "Khá tốt", totalLessons: 15, done: 11 },
    economics: { score: 90, level: "Thành thục", totalLessons: 8, done: 7 },
    investment: { score: 60, level: "Trung bình", totalLessons: 14, done: 8 },
    risk_management: { score: 50, level: "Trung bình", totalLessons: 6, done: 3 },
    ai_for_finance: { score: 80, level: "Khá tốt", totalLessons: 8, done: 6 },
  });

  return (
    <div className={`rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 font-sans ${compact ? "p-3.5 mt-3" : "p-5"}`}>
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 shrink-0">
            <BrainCircuit className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 leading-snug">
              Bản Đồ Độ Thành Thạo Kiến Thức
            </h3>
            <p className="text-[10px] font-bold text-stone-400">Phân tích điểm mạnh & điểm yếu cá nhân</p>
          </div>
        </div>

        <Link
          href="/analytics"
          className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
        >
          Chi tiết <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className={`grid gap-2.5 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {(Object.entries(mastery) as [DomainType, typeof mastery[DomainType]][]).map(([key, item]) => {
          const isHigh = item.score >= 80;
          const isLow = item.score < 50;

          return (
            <div
              key={key}
              className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-stone-900 dark:text-stone-100 truncate max-w-[170px]">
                  {DOMAIN_NAMES[key]}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                    isHigh
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                      : isLow
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  }`}
                >
                  {item.level} ({item.score}%)
                </span>
              </div>

              {/* Progress fill */}
              <div className="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  style={{ width: `${item.score}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh ? "bg-emerald-500" : isLow ? "bg-rose-500" : "bg-amber-500"
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-stone-400 font-bold">
                <span>Đã làm: {item.done} / {item.totalLessons} bài</span>
                {isLow && <span className="text-rose-500 font-black">Nên ôn lại</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
