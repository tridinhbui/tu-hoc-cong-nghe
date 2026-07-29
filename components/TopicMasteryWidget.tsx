"use client";

import { useState } from "react";
import Link from "next/link";
import { DOMAIN_NAMES, type DomainType } from "@/lib/levels";
import { BrainCircuit, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function TopicMasteryWidget() {
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
    <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
            <BrainCircuit className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
              Bản Đồ Độ Thành Thạo Kiến Thức (Topic Mastery)
            </h3>
            <p className="text-[11px] font-bold text-stone-400">Tự động phân tích điểm mạnh & điểm yếu</p>
          </div>
        </div>

        <Link
          href="/roadmap"
          className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          Xem Lộ Trình <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.entries(mastery) as [DomainType, typeof mastery[DomainType]][]).map(([key, item]) => {
          const isHigh = item.score >= 80;
          const isLow = item.score < 50;

          return (
            <div
              key={key}
              className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900 dark:text-stone-100">
                  {DOMAIN_NAMES[key]}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
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
              <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  style={{ width: `${item.score}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh ? "bg-emerald-500" : isLow ? "bg-rose-500" : "bg-amber-500"
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold">
                <span>Đã làm: {item.done} / {item.totalLessons} bài</span>
                {isLow && <span className="text-rose-500 font-black">Khuyên dùng: Ôn lại</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
