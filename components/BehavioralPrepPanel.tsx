"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Lightbulb, ChevronRight, ChevronLeft, MessageSquareQuote } from "lucide-react";
import type { BehavioralPrepQuestion } from "@/app/api/ib-behavioral/route";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Behavioral/fit prep, deliberately un-scored. "Walk me through your resume"
// and "Why banking?" have no single right answer, so the old multiple-choice
// treatment had to invent three wrong ways to describe your own career - it
// graded guessing, not preparation. Here the learner reads the question,
// thinks (or says the answer out loud), then reveals the coaching framework
// and self-assesses. No XP, no score: nothing here is objectively markable,
// and paying XP for clicking "reveal" would just be a participation trophy.

export default function BehavioralPrepPanel() {
  const { t } = useI18n();
  const [questions, setQuestions] = useState<BehavioralPrepQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/ib-behavioral", { cache: "no-store" });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch (error) {
      console.error("Error loading behavioral prep questions:", error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const q of questions) counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [questions]);

  const filtered = useMemo(
    () => (category === "all" ? questions : questions.filter((q) => q.category === category)),
    [questions, category]
  );

  // Changing the filter has to reset position - index 7 of the old list is a
  // different question (or out of range) in the new one.
  useEffect(() => {
    setActiveIdx(0);
    setRevealed(false);
  }, [category]);

  const q = filtered[activeIdx];

  function go(delta: number) {
    setActiveIdx((i) => Math.max(0, Math.min(filtered.length - 1, i + delta)));
    setRevealed(false);
  }

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center gap-3 text-stone-500 dark:text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-xs font-bold">{t.behavioralPrep.loading}</p>
      </div>
    );
  }

  if (failed || questions.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center gap-3">
        <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
          {t.behavioralPrep.loadError}
        </p>
        <button
          onClick={() => void load()}
          className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
        >
          {t.behavioralPrep.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 p-4 flex items-start gap-3">
        <MessageSquareQuote className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 leading-relaxed">
          {t.behavioralPrep.notePart1}
          <strong>{t.behavioralPrep.noteBold}</strong>
          {t.behavioralPrep.notePart2}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategory("all")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
            category === "all"
              ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-stone-300"
          }`}
        >
          {format(t.behavioralPrep.allCategories, { count: questions.length })}
        </button>
        {categories.map(([label, count]) => (
          <button
            key={label}
            onClick={() => setCategory(label)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
              category === label
                ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-stone-300"
            }`}
          >
            {label} · {count}
          </button>
        ))}
      </div>

      {q && (
        <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              {q.category}
            </span>
            <span className="text-xs font-bold text-stone-400 dark:text-stone-500 tabular-nums">
              {activeIdx + 1} / {filtered.length}
            </span>
          </div>

          <p className="font-bold text-lg leading-relaxed text-stone-900 dark:text-stone-100 select-text">
            {q.question}
          </p>

          {revealed ? (
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-4">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                {t.behavioralPrep.frameworkHeading}
              </p>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-line select-text">
                {q.framework}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-black uppercase tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
            >
              {t.behavioralPrep.revealFramework}
            </button>
          )}

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => go(-1)}
              disabled={activeIdx === 0}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {t.behavioralPrep.previous}
            </button>
            <button
              onClick={() => go(1)}
              disabled={activeIdx >= filtered.length - 1}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {t.behavioralPrep.next}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
