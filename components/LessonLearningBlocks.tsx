"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LessonQuestionCardProps {
  title?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function LessonQuestionCard({
  title = "Bắt đầu bằng một câu hỏi",
  question,
  options,
  correct,
  explanation,
}: LessonQuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4 rounded-[24px] border border-stone-200/90 bg-gradient-to-br from-white via-stone-50 to-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] dark:border-stone-800 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        {title}
      </div>
      <p className="text-base font-semibold leading-relaxed text-stone-800 dark:text-stone-300">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:bg-stone-800/60";
          if (submitted) {
            if (i === correct) {
              btnCls = "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500/70 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold";
            } else if (i === selected) {
              btnCls = "border-rose-500 bg-rose-50 text-rose-800 dark:border-rose-500/70 dark:bg-rose-950/50 dark:text-rose-400";
            } else {
              btnCls = "border-stone-100 bg-stone-50 text-stone-500 opacity-60 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-400";
            }
          } else if (selected === i) {
            btnCls = "border-stone-900 bg-stone-100 text-stone-900 font-semibold border-2 dark:border-stone-100 dark:bg-stone-800 dark:text-stone-100";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-200 ${btnCls}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-lg border text-[10px] font-bold ${
                  selected === i
                    ? "border-current bg-white/80 dark:bg-stone-900/80"
                    : "border-stone-200 bg-stone-50 text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full rounded-xl bg-stone-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-stone-800 active:scale-[0.98] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          Xác nhận câu trả lời
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 text-xs leading-relaxed ${
            selected === correct
              ? "border-emerald-100 bg-emerald-50/60 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "border-rose-100 bg-rose-50/50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400"
          }`}
        >
          <p className="mb-1 font-semibold">
            {selected === correct ? "Đúng rồi!" : "Chưa đúng — nhưng không sao!"}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

export interface LessonSummaryData {
  keyIdea: string;
  formula?: string;
  commonMistake?: string;
  action?: string;
}

interface LessonSummaryCardProps {
  summary: LessonSummaryData;
}

export function LessonSummaryCard({ summary }: LessonSummaryCardProps) {
  return (
    <div className="rounded-[24px] border border-stone-200/80 bg-stone-900 p-5 text-stone-100 shadow-[0_10px_40px_rgba(15,23,42,0.14)] dark:border-stone-800">
      <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
        Ghi nhớ nhanh
      </div>
      <div className="space-y-3 text-sm leading-relaxed">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Ý chính</p>
          <p className="font-semibold text-white">{summary.keyIdea}</p>
        </div>
        {summary.formula && (
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Công thức / nguyên lý</p>
            <p className="font-medium text-stone-200">{summary.formula}</p>
          </div>
        )}
        {summary.commonMistake && (
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Lỗi thường gặp</p>
            <p className="font-medium text-stone-200">{summary.commonMistake}</p>
          </div>
        )}
        {summary.action && (
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">Áp dụng ngay</p>
            <p className="font-medium text-stone-200">{summary.action}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface LessonApplicationCardProps {
  title?: string;
  message: string;
  secondary?: string;
}

export function LessonApplicationCard({ title = "Áp dụng ngay", message, secondary }: LessonApplicationCardProps) {
  return (
    <div className="rounded-[24px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-5 shadow-[0_10px_40px_rgba(16,185,129,0.1)] dark:border-emerald-900/70 dark:from-emerald-950/30 dark:via-stone-950 dark:to-emerald-950/30">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        {title}
      </div>
      <p className="text-sm font-semibold leading-relaxed text-emerald-900 dark:text-emerald-200">{message}</p>
      {secondary && <p className="mt-2 text-sm leading-relaxed text-emerald-800/80 dark:text-emerald-300/80">{secondary}</p>}
    </div>
  );
}

interface ReviewLoopCardProps {
  title?: string;
  prompt: string;
  cta?: string;
}

export function ReviewLoopCard({ title = "Ôn lại nhanh", prompt, cta = "Ghi nhớ lại bài này" }: ReviewLoopCardProps) {
  return (
    <div className="rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-5 shadow-[0_10px_40px_rgba(245,158,11,0.12)] dark:border-amber-900/70 dark:from-amber-950/30 dark:via-stone-950 dark:to-amber-950/30">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
        {title}
      </div>
      <p className="text-sm font-semibold leading-relaxed text-amber-900 dark:text-amber-200">{prompt}</p>
      <div className="mt-3 inline-flex rounded-full border border-amber-300/70 bg-white/70 px-3 py-1 text-[11px] font-semibold text-amber-800 dark:border-amber-800/70 dark:bg-stone-900/70 dark:text-amber-300">
        {cta}
      </div>
    </div>
  );
}
