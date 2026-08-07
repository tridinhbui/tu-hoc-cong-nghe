"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Eye, RotateCcw, X } from "lucide-react";
import type { LessonHighlight } from "@/lib/lesson-highlights";
import { resolveStage } from "@/lib/highlight-stage-grouping";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface LessonInfo {
  slug: string;
  title: string;
}

interface HighlightReviewProps {
  /** Pre-shuffled by the caller - see the note on `deck` below. */
  deck: LessonHighlight[];
  lessonsById: Record<number, LessonInfo>;
  onRestart: () => void;
  onExit: () => void;
}

/**
 * Active-recall pass over the learner's own highlighted passages: the quote is
 * shown with its source hidden, they try to place it, then reveal which lesson
 * and stage it came from and jump back to it.
 *
 * Deliberately not spaced repetition - `user_flashcards` already does that,
 * with its own scheduling columns. This is a lightweight sweep through what
 * they marked, so it keeps no state beyond the current session.
 */
// `deck` arrives already shuffled because shuffling is impure: doing it in
// render (or a useMemo) makes the component render differently on every pass,
// which React may do at will. The caller shuffles inside the click handler
// that starts the review instead.
export default function HighlightReview({ deck, lessonsById, onRestart, onExit }: HighlightReviewProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [recalled, setRecalled] = useState(0);

  const current = deck[index];
  const isLast = index === deck.length - 1;
  const done = index >= deck.length;

  function next(gotIt: boolean) {
    if (gotIt) setRecalled((n) => n + 1);
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  function restart() {
    setIndex(0);
    setRevealed(false);
    setRecalled(0);
    onRestart();
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 text-center">
        <p className="text-2xl font-black text-stone-900 dark:text-stone-100">
          {recalled}/{deck.length}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.highlightReview.recalledSuffix}</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.highlightReview.restart}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-xl bg-stone-900 dark:bg-stone-100 px-3 py-2 text-xs font-bold text-white dark:text-stone-900 hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t.highlightReview.done}
          </button>
        </div>
      </div>
    );
  }

  const lesson = lessonsById[current.lesson_id];
  const stage = resolveStage(current.lesson_id, t);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          {format(t.highlightReview.reviewProgress, { current: index + 1, total: deck.length })}
        </p>
        <button
          type="button"
          onClick={onExit}
          aria-label={t.highlightReview.exitAria}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${(index / deck.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20 p-4">
        <p className="text-base leading-relaxed text-stone-900 dark:text-stone-100">{current.quote}</p>
      </div>

      {revealed ? (
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {stage.label} · {stage.name}
            </p>
            <Link
              href={`/bai-hoc/${lesson?.slug ?? current.lesson_slug}`}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              {lesson?.title ?? current.lesson_slug}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => next(false)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              {t.highlightReview.notRecalled}
            </button>
            <button
              type="button"
              onClick={() => next(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              {isLast ? t.highlightReview.recalledLast : t.highlightReview.recalledNext}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          {t.highlightReview.revealPrompt}
        </button>
      )}
    </div>
  );
}
