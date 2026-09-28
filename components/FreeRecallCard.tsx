"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check } from "lucide-react";
import { trackFeatureClick } from "@/lib/feature-events";
import { getFreeRecallDone, saveFreeRecallDone } from "@/lib/progress";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary } from "@/components/ui/system";

// Free recall: write down everything you remember, unprompted, before being
// shown the answers. It is the single strongest retrieval-practice technique
// in the literature and the one this lesson page had no form of - every
// other check here (opening question, midpoint, sidebar quiz, recall MCQ)
// is multiple choice, which tests recognition rather than recall.
//
// Deliberately not graded by anything: the learner scores themselves against
// the key takeaways afterwards. Self-scoring costs nothing to run and the
// act of comparing is itself the second retrieval pass.

const RECALL_SECONDS = 60;

interface FreeRecallCardProps {
  lessonId: number;
  lessonSlug: string;
  takeaways: string[];
  // Rendered once the exercise is finished or skipped - the "Ghi nhớ nhanh"
  // block, which doubles as this exercise's answer key and so must not be
  // on screen while someone is still trying to recall.
  children: React.ReactNode;
}

type Phase = "idle" | "writing" | "scoring" | "done";

// localStorage read through useSyncExternalStore rather than an effect.
// The value differs between server (always false) and client (whatever a
// past visit stored), and this is exactly the mismatch useSyncExternalStore
// exists to resolve: React renders the server snapshot, then re-renders
// with the client one after hydration, with no flash and no setState in an
// effect. Nothing else writes this key while the component is mounted, so
// subscribe has nothing to listen to.
const noopSubscribe = () => () => {};

export default function FreeRecallCard({
  lessonId,
  lessonSlug,
  takeaways,
  children,
}: FreeRecallCardProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(RECALL_SECONDS);
  const [text, setText] = useState("");
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // A lesson already recalled in a past visit skips straight to the answers,
  // the same way MidpointInteractive restores its answered state - otherwise
  // re-reading a finished lesson hides its summary behind a timer again.
  const doneInPastVisit = useSyncExternalStore(
    noopSubscribe,
    () => getFreeRecallDone(lessonId),
    () => false,
  );

  const finishWriting = useCallback(() => {
    setPhase((current) => (current === "writing" ? "scoring" : current));
  }, []);

  useEffect(() => {
    if (phase !== "writing") return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          finishWriting();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [phase, finishWriting]);

  useEffect(() => {
    if (phase === "writing") textareaRef.current?.focus();
  }, [phase]);

  function start() {
    setPhase("writing");
    setSecondsLeft(RECALL_SECONDS);
    trackFeatureClick("lesson_free_recall_start", { label: lessonSlug });
  }

  function skip() {
    saveFreeRecallDone(lessonId);
    setPhase("done");
    trackFeatureClick("lesson_free_recall_skip", { label: lessonSlug });
  }

  function submitScore() {
    saveFreeRecallDone(lessonId);
    setPhase("done");
    // The count, never the text. `wordsWritten` is a coarse effort signal
    // that does not reconstruct anything the learner typed.
    trackFeatureClick("lesson_free_recall_done", {
      label: lessonSlug,
      recalled: ticked.size,
      total: takeaways.length,
      wordsWritten: text.trim() ? text.trim().split(/\s+/).length : 0,
    });
    setText("");
  }

  function toggleTicked(index: number) {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  // With one or no takeaways there is nothing to score against, so the
  // exercise would just be a timer standing between the reader and the
  // summary.
  if (phase === "done" || doneInPastVisit || takeaways.length < 2) return <>{children}</>;

  const progressPct = ((RECALL_SECONDS - secondsLeft) / RECALL_SECONDS) * 100;

  return (
    <div className="overflow-hidden rounded-md border border-line-strong">
      <div className="flex items-center gap-3 border-b border-stone-300 bg-[#f3f1ec] px-6 py-4 dark:border-stone-700 dark:bg-stone-950">
        <Brain className="w-5 h-5 text-ink-muted flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-lg font-black tracking-tight text-ink-max">{t.freeRecall.headerTitle}</p>
          <p className="mt-0.5 text-xs text-ink-soft">
            {t.freeRecall.headerSubtitle}
          </p>
        </div>
      </div>

      <div className="space-y-4 bg-white p-6 dark:bg-stone-900">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-ink-body leading-relaxed">
                {t.freeRecall.idleInstructions}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={start}
                  className={btnPrimary}
                >
                  {t.freeRecall.startButton}
                </button>
                <button
                  onClick={skip}
                  className="text-sm font-bold text-ink-muted hover:text-ink underline transition"
                >
                  {t.freeRecall.skipButton}
                </button>
              </div>
            </motion.div>
          )}

          {phase === "writing" && (
            <motion.div key="writing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold tabular-nums text-ink-soft">
                  {format(t.freeRecall.secondsLeft, { seconds: secondsLeft })}
                </span>
                <button
                  onClick={finishWriting}
                  className="text-xs font-bold text-ink-muted hover:text-ink underline"
                >
                  {t.freeRecall.finishEarly}
                </button>
              </div>
              <div className="h-1 overflow-hidden bg-surface-sunken">
                <div
                  className="h-full bg-brand-600 transition-all duration-1000 ease-linear dark:bg-brand-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder={t.freeRecall.textareaPlaceholder}
                aria-label={t.freeRecall.textareaAriaLabel}
                className="w-full resize-none rounded-sm border border-stone-300 bg-[#fbfaf7] p-4 leading-relaxed text-ink-heading focus:border-brand-600 focus:outline-hidden dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400"
              />
              <p className="text-xs text-ink-faint">
                {t.freeRecall.privacyNote}
              </p>
            </motion.div>
          )}

          {phase === "scoring" && (
            <motion.div key="scoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-ink-body leading-relaxed">
                {t.freeRecall.scoringIntro}
              </p>
              <div className="space-y-2">
                {takeaways.map((takeaway, i) => {
                  const isTicked = ticked.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleTicked(i)}
                      aria-pressed={isTicked}
                      className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-sm border transition-colors ${
                        isTicked
                          ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                          : "border-stone-300 bg-white hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-200"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-xs border flex items-center justify-center flex-shrink-0 ${
                          isTicked
                            ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500"
                            : "border-line-strong text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-ink-body text-base leading-relaxed">
                        {takeaway}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm font-bold tabular-nums text-ink-soft">
                  {format(t.freeRecall.recalledCount, { recalled: ticked.size, total: takeaways.length })}
                </p>
                <button
                  onClick={submitScore}
                  className={btnPrimary}
                >
                  {t.freeRecall.viewSummaryButton}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
