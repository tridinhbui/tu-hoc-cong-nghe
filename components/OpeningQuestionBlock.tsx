"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary } from "@/components/ui/system";

interface OpeningQuestionBlockProps {
  question: React.ReactNode;
  options: React.ReactNode[];
  correct: number;
  explanation: React.ReactNode;
}

// Accepts ReactNode rather than plain strings so rich content (markdown/LaTeX)
// can reuse the same opening-question UI instead of a hand-rolled copy.
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
      <div className="eyebrow border-b border-line-strong pb-2 text-ink-muted">
        {t.finalTwo.openingQuestionBlock.header}
      </div>
      <p className="text-ink-heading font-bold leading-relaxed text-base sm:text-lg">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-line-strong bg-white dark:bg-stone-900 text-ink-heading hover:border-line-firm font-medium";
          if (submitted) {
            if (i === correct) btnCls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
            else if (i === selected) btnCls = "border-red-600 dark:border-red-400 bg-danger-soft text-ink-max font-bold";
            else btnCls = "border-line bg-white dark:bg-stone-900 text-ink-faint";
          } else if (selected === i) {
            btnCls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3.5 rounded-sm border text-sm transition-colors flex items-center gap-3 cursor-pointer ${btnCls}`}
            >
              <span className={`w-6 h-6 rounded-xs font-mono text-xs font-medium flex items-center justify-center border shrink-0 ${
                selected === i ? "border-current" : "text-ink-muted border-line-strong"
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
          className={`${btnPrimary} w-full cursor-pointer`}
        >
          {t.finalTwo.openingQuestionBlock.confirmButton}
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-sm p-4 text-xs leading-relaxed border border-l-2 text-ink-body ${
            selected === correct ? "bg-accent-soft border-accent-line border-l-brand-600 dark:border-l-brand-400" : "bg-danger-soft border-danger-line border-l-red-600 dark:border-l-red-400"
          }`}
        >
          <p className={`font-bold mb-1 ${selected === correct ? "text-accent-strong" : "text-danger"}`}>
            {selected === correct ? t.finalTwo.openingQuestionBlock.correctFeedback : t.finalTwo.openingQuestionBlock.incorrectFeedback}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
