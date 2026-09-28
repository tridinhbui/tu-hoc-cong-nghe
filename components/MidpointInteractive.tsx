"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/lesson-types";
import { useLessonCompletion } from "@/lib/lesson-completion-context";
import { getMidpointDone, saveMidpointDone } from "@/lib/progress";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, textLink } from "@/components/ui/system";

interface MidpointInteractiveProps {
  question: QuizQuestion;
  lessonId: number;
  onComplete?: () => void;
}

export default function MidpointInteractive({
  question,
  lessonId,
  onComplete,
}: MidpointInteractiveProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const lessonCompletion = useLessonCompletion();

  // Tells the enclosing LessonPageLayout this lesson has a midpoint check,
  // so completion won't fire until it's answered too (not just the sidebar
  // "Kiểm tra nhanh" quiz + full scroll). If it was already answered in a
  // previous visit (persisted via saveMidpointDone below), report it as
  // already done right away - this component's own selected/submitted
  // state always starts fresh on mount with no persistence, so without
  // this a revisit could never satisfy the completion gate without
  // re-answering, even for someone who genuinely already did.
  useEffect(() => {
    lessonCompletion?.registerMidpoint();
    if (getMidpointDone(lessonId)) {
      lessonCompletion?.markMidpointDone();
    }
  }, [lessonCompletion, lessonId]);

  const isCorrect = selected === question.correct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-md border border-line-strong bg-[#f3f1ec] dark:bg-stone-950 p-6 my-8"
    >
      <div className="flex items-center gap-2 mb-4 border-b border-line-strong pb-2">
        <h3 className="text-base font-bold text-ink">{t.finalOne.midpointInteractive.stopAndCheck}</h3>
        <span className="eyebrow ml-auto text-ink-muted">
          {t.finalOne.midpointInteractive.midpointBadge}
        </span>
      </div>

      <p className="text-ink-heading font-semibold mb-4">{question.question}</p>

      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-sm border transition-colors cursor-pointer ${
              submitted
                ? i === question.correct
                  ? "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-semibold"
                  : selected === i
                    ? "border-red-600 dark:border-red-400 bg-danger-soft text-ink-max font-semibold"
                    : "border-line bg-white dark:bg-stone-900 text-ink-faint"
                : selected === i
                  ? "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-semibold"
                  : "border-line-strong bg-white dark:bg-stone-900 text-ink-body hover:border-stone-950 dark:hover:border-stone-300"
            }`}
          >
            <span className="font-mono text-sm font-medium">{String.fromCharCode(65 + i)}.</span>{" "}
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => {
            setSubmitted(true);
            // Answering the question IS completing the midpoint check -
            // count it done the moment they submit, not only if they later
            // click the "Tiếp tục đọc" button below (which many people skip,
            // just scrolling on past the explanation). Gating completion on
            // that button meant "answered the midpoint but lesson never
            // counts as done" - one of the reported bugs.
            saveMidpointDone(lessonId);
            lessonCompletion?.markMidpointDone();
          }}
          className={`${btnPrimary} w-full cursor-pointer`}
        >
          {t.finalOne.midpointInteractive.checkButton}
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-4 rounded-sm border border-l-2 bg-white dark:bg-stone-900 ${
            isCorrect
              ? "border-accent-line border-l-brand-600 dark:border-l-brand-400"
              : "border-danger-line border-l-red-600 dark:border-l-red-400"
          }`}
        >
          <p className={`font-bold ${isCorrect ? "text-accent-strong" : "text-danger"}`}>
            {isCorrect ? t.finalOne.midpointInteractive.correct : t.finalOne.midpointInteractive.incorrect}
          </p>
          <p className="text-sm mt-1 text-ink-body">
            {question.explanation}
          </p>
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              saveMidpointDone(lessonId);
              lessonCompletion?.markMidpointDone();
              onComplete?.();
            }}
            className={`${textLink} mt-3 cursor-pointer`}
          >
            {t.finalOne.midpointInteractive.continueReading}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
