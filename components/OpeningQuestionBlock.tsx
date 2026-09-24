"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

interface OpeningQuestionBlockProps {
  question: React.ReactNode;
  options: React.ReactNode[];
  correct: number;
  explanation: React.ReactNode;
}

// Shared by regular lessons (LessonPageClient) and CFA modules
// (CfaModulePageClient) - accepts ReactNode rather than plain strings so CFA
// content (rendered through CfaContentRenderer for markdown/LaTeX) can reuse
// the exact same opening-question UI instead of a second hand-rolled copy.
export default function OpeningQuestionBlock({
  question,
  options,
  correct,
  explanation,
}: OpeningQuestionBlockProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-extrabold text-ink-muted uppercase tracking-widest">
        {t.finalTwo.openingQuestionBlock.header}
      </div>
      <p className="text-ink-heading font-bold leading-relaxed text-base sm:text-lg">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-line bg-white/95 dark:bg-stone-900 text-ink-heading hover:border-line-firm hover:bg-stone-50 dark:hover:bg-stone-800/60 font-medium";
          if (submitted) {
            if (i === correct) btnCls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-accent-ink-strong font-bold";
            else if (i === selected) btnCls = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-alert-ink font-bold";
            else btnCls = "border-line-soft bg-stone-50/20 dark:bg-stone-900/20 text-ink-muted opacity-60";
          } else if (selected === i) {
            btnCls = "border-line-invert bg-surface-raised text-ink font-bold border-2";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 cursor-pointer ${btnCls}`}
            >
              <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center border shrink-0 ${
                selected === i ? "bg-white/80 dark:bg-stone-900/80 border-current" : "bg-surface-raised text-ink-body border-line-mid"
              }`}>
                {["A", "B", "C", "D"][i]}
              </span>
              <span className="leading-snug">{opt}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-ink-invert py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          {t.finalTwo.openingQuestionBlock.confirmButton}
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 text-xs leading-relaxed border ${
            selected === correct ? "bg-emerald-50/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-accent-ink" : "bg-rose-50/40 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-alert-deep"
          }`}
        >
          <p className="font-semibold mb-1">
            {selected === correct ? t.finalTwo.openingQuestionBlock.correctFeedback : t.finalTwo.openingQuestionBlock.incorrectFeedback}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
