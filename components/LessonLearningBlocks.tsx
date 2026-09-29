"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, StatusDot, Sys } from "@/components/ui/system";

interface LessonQuestionCardProps {
  title?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function LessonQuestionCard({
  title,
  question,
  options,
  correct,
  explanation,
}: LessonQuestionCardProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const resolvedTitle = title ?? t.learningBlocks.defaultQuestionTitle;

  return (
    <div className="overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-9 items-center gap-2 border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
        <StatusDot />
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{resolvedTitle}</span>
      </div>
      <div className="space-y-4 p-5">
        <p className="max-w-[68ch] text-base font-bold leading-7 text-ink-max">{question}</p>

        {/* Cùng khuôn phương án với cột quiz của LessonPageLayout: hàng vuông
            viền 1px, rãnh chữ cái mono, chọn = xanh, sai = đỏ. */}
        <ul className="space-y-2">
          {options.map((opt, i) => {
            let btnCls =
              "border-stone-300 bg-white text-ink hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300";
            let gutter = "text-ink-faint";
            if (submitted) {
              if (i === correct) {
                btnCls = "border-brand-600 bg-brand-50 font-semibold text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-100";
                gutter = "text-accent-strong";
              } else if (i === selected) {
                btnCls = "border-red-500 bg-red-50 text-red-900 dark:border-red-500/70 dark:bg-red-950/40 dark:text-red-200";
                gutter = "text-red-600 dark:text-red-400";
              } else {
                btnCls = "border-stone-200 bg-white text-ink-muted dark:border-stone-800 dark:bg-stone-900";
              }
            } else if (selected === i) {
              btnCls = "border-brand-600 bg-brand-50 font-semibold text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-100";
              gutter = "text-accent-strong";
            }

            return (
              <li key={i}>
                <button
                  disabled={submitted}
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  className={`flex w-full items-start gap-3 rounded-sm border px-3 py-2.5 text-left text-[15px] leading-6 transition-colors disabled:cursor-default ${btnCls}`}
                >
                  <Sys className={`mt-[3px] w-4 flex-shrink-0 text-[11px] ${gutter}`}>{String.fromCharCode(65 + i)}</Sys>
                  <span className="flex-1">{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {selected !== null && !submitted && (
          <button onClick={() => setSubmitted(true)} className={`${btnPrimary} w-full`}>
            {t.learningBlocks.confirmAnswer}
          </button>
        )}

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[68ch] border-l-2 pl-4 text-sm leading-7 text-ink-body ${
              selected === correct ? "border-brand-600 dark:border-brand-400" : "border-red-500"
            }`}
          >
            <p className={`mb-1 font-bold ${selected === correct ? "text-accent-strong" : "text-danger"}`}>
              {selected === correct ? t.learningBlocks.correctFeedbackTitle : t.learningBlocks.incorrectFeedbackTitle}
            </p>
            <p>{explanation}</p>
          </motion.div>
        )}
      </div>
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
  const { t } = useI18n();
  const rows = [
    { label: t.learningBlocks.keyIdeaLabel, value: summary.keyIdea, strong: true },
    summary.formula ? { label: t.learningBlocks.formulaLabel, value: summary.formula } : null,
    summary.commonMistake ? { label: t.learningBlocks.mistakeLabel, value: summary.commonMistake } : null,
    summary.action ? { label: t.learningBlocks.actionLabel, value: summary.action } : null,
  ].filter((r): r is { label: string; value: string; strong?: boolean } => r !== null);
  return (
    <div className="overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-9 items-center border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.learningBlocks.summaryTitle}</span>
      </div>
      <dl className="divide-y divide-stone-200 dark:divide-stone-800">
        {rows.map((row, i) => (
          <div key={row.label} className="flex items-baseline gap-4 px-4 py-3.5 sm:px-5">
            <Sys className="flex-shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</Sys>
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{row.label}</dt>
              <dd className={`mt-1 max-w-[68ch] text-[15px] leading-7 ${row.strong ? "font-bold text-ink-max" : "text-ink-body"}`}>{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface LessonApplicationCardProps {
  title?: string;
  message: string;
  secondary?: string;
}

export function LessonApplicationCard({ title, message, secondary }: LessonApplicationCardProps) {
  const { t } = useI18n();
  const resolvedTitle = title ?? t.learningBlocks.defaultApplicationTitle;
  return (
    <div className="max-w-[68ch] border-l-2 border-stone-950 pl-4 dark:border-stone-200 sm:pl-5">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{resolvedTitle}</p>
      <p className="text-base font-semibold leading-7 text-ink-max">{message}</p>
      {secondary && <p className="mt-2 text-[15px] leading-7 text-ink-body">{secondary}</p>}
    </div>
  );
}

interface ReviewLoopCardProps {
  title?: string;
  prompt: string;
  cta?: string;
}

export function ReviewLoopCard({ title, prompt, cta }: ReviewLoopCardProps) {
  const { t } = useI18n();
  const resolvedTitle = title ?? t.learningBlocks.defaultReviewTitle;
  const resolvedCta = cta ?? t.learningBlocks.defaultReviewCta;
  return (
    <div className="max-w-[68ch] border-l-2 border-stone-950 pl-4 dark:border-stone-200 sm:pl-5">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{resolvedTitle}</p>
      <p className="text-base font-semibold leading-7 text-ink-max">{prompt}</p>
      <p className="mt-3 inline-flex rounded-sm border border-line-strong px-2.5 py-1 text-xs font-semibold text-ink-body dark:border-stone-700">
        {resolvedCta}
      </p>
    </div>
  );
}
