"use client";

import { useState, useEffect, useCallback } from "react";
import { errorMessage } from "@/lib/errors";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, X, ArrowRight, RefreshCw, Trophy, Loader2, XCircle, Lightbulb } from "lucide-react";
import Glyph from "@/components/Glyph";
import { toast } from "sonner";
import { LEVEL_EXAMS } from "@/lib/level-exams";
import {
  fetchLevelExam,
  submitLevelExam,
  type ServedExam,
  type LevelExamResult,
} from "@/lib/cloudflare-level-exams";
import { LEVELS } from "@/lib/levels";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys, btnPrimary, btnSecondary } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  level: (n: number) => `LVL ${String(n).padStart(2, "0")}`,
  qid: (n: number) => String(n).padStart(2, "0"),
};
/* i18n-ignore-end */

interface RigorousLevelExamModalProps {
  levelToTest: number;
  userId: string;
  isRecertificationRetake?: boolean;
  onClose: () => void;
  onExamPassed: (level: number) => void;
}

export default function RigorousLevelExamModal({
  levelToTest,
  userId,
  isRecertificationRetake = false,
  onClose,
  onExamPassed,
}: RigorousLevelExamModalProps) {
  const { t } = useI18n();
  const mounted = useIsClient();
  // Only for chrome that must render before the exam arrives (title, pass
  // threshold). The questions themselves come from the server - the browser is
  // never sent the answers, so it cannot grade or shortcut the exam.
  const fallbackConfig = LEVEL_EXAMS[levelToTest] || LEVEL_EXAMS[2];
  const levelMeta = LEVELS.find((l) => l.level === levelToTest) || LEVELS[1];

  const [exam, setExam] = useState<ServedExam | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(fallbackConfig.timeLimitSeconds);
  const [result, setResult] = useState<LevelExamResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submitted = result !== null;
  const questions = exam?.questions ?? [];
  const minPassPercentage = exam?.minPassPercentage ?? fallbackConfig.minPassPercentage;
  const examTitle = exam?.title ?? fallbackConfig.title;

  // Bumped by retryExam to re-run the fetch below for a fresh attempt.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchLevelExam(levelToTest)
      .then((served) => {
        if (cancelled) return;
        setExam(served);
        setTimeLeft(served.timeLimitSeconds);
        setLoadError(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : t.levelExam.loadFailed);
      });
    return () => {
      cancelled = true;
    };
  }, [levelToTest, reloadKey]);

  /** Fresh attempt: new questions, new tokens, cleared answers. */
  const retryExam = useCallback(() => {
    setLoadError(null);
    setExam(null);
    setAnswers({});
    setResult(null);
    setReloadKey((key) => key + 1);
  }, []);

  const handleSubmitExam = useCallback(
    async (auto = false) => {
      if (submitted || submitting || !exam) return;

      // Auto-submit on timeout still sends every slot: the server expects one
      // answer per question and scores an unanswered slot as wrong.
      const payload = exam.questions.map((question, idx) => ({
        token: question.token,
        selected: answers[idx] ?? -1,
      }));

      setSubmitting(true);
      try {
        const graded = await submitLevelExam(exam.level, payload);
        setResult(graded);

        if (graded.passed) {
          onExamPassed(levelToTest);
          toast.success(format(t.levelExam.passedToast, { level: levelToTest, percent: graded.percent }));
        } else if (graded.expired) {
          toast.error(t.levelExam.timedOutToast);
        } else {
          toast.error(format(t.levelExam.failedToast, { percent: graded.percent, required: graded.minPassPercentage }));
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t.levelExam.submitError);
        if (auto) setTimeLeft(0);
      } finally {
        setSubmitting(false);
      }
    },
    [answers, exam, levelToTest, onExamPassed, submitted, submitting]
  );

  // Countdown Timer
  useEffect(() => {
    if (submitted || !exam) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          void handleSubmitExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, exam, handleSubmitExam]);

  function handleSelectOption(qIdx: number, optionIdx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  }

  const correctCount = result?.correct ?? 0;
  const scorePercentage = result?.percent ?? 0;
  const passed = result?.passed ?? false;

  function formatTime(secs: number) {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-950/60 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="border-b border-stone-300 bg-surface-raised px-6 py-4 dark:border-stone-700 dark:bg-stone-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-sm border border-line-strong bg-white text-ink-body p-2 dark:border-stone-700 dark:bg-stone-900"><Glyph emoji={levelMeta.emoji || fallbackConfig.badgeEmoji || "🏆"} className="w-7 h-7" /></span>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-ink-muted" aria-hidden />
                <span className="eyebrow text-ink-soft">{isRecertificationRetake ? t.levelExam.titleRetake : t.levelExam.title}</span>
                <Sys className="text-ink-muted">{SYS.level(levelToTest)}</Sys>
              </div>
              <h2 className="text-lg font-black tracking-tight text-ink-max mt-1">
                {examTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-sm p-2 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Strip */}
        <div className="border-b border-line-strong px-6 py-2.5 flex items-center justify-between text-xs font-bold text-ink-body shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-ink-muted" aria-hidden />
            <span>
              {format(t.levelExam.passRequirement, { percent: minPassPercentage })}
              {questions.length > 0 &&
                format(t.levelExam.passRequirementCount, {
                  correct: Math.ceil((minPassPercentage / 100) * questions.length),
                  total: questions.length,
                })}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 font-mono tabular-nums px-3 py-1 rounded-sm border ${timeLeft < 60 ? "border-rose-400 bg-rose-50 text-rose-700 font-black dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400" : "bg-white dark:bg-stone-900 text-ink border-line-strong"}`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions & Result Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loadError ? (
            <div className="py-12 text-center space-y-4">
              <p className="text-sm font-bold text-alert">{loadError}</p>
              <button
                onClick={retryExam}
                className={`${btnPrimary} cursor-pointer text-xs`}
              >
                <RefreshCw className="w-4 h-4" />
                {t.levelExam.reloadExam}
              </button>
            </div>
          ) : !exam ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-ink-muted" />
              <p className="text-xs font-semibold text-ink-muted">{t.levelExam.loading}</p>
            </div>
          ) : !submitted ? (
            questions.map((q, qIdx) => (
              <div
                key={q.id || qIdx}
                className="p-5 rounded-md border border-line-strong space-y-3"
              >
                <p className="text-sm font-black text-ink-max flex items-start gap-2.5">
                  <Sys className="shrink-0 pt-[3px] text-ink-muted">{SYS.qid(qIdx + 1)}</Sys>
                  <span className="leading-snug">{q.question}</span>
                </p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[qIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "bg-white dark:bg-stone-900 text-ink-max border-brand-600 ring-1 ring-brand-600 dark:border-brand-400 dark:ring-brand-400"
                            : "bg-white dark:bg-stone-900 text-ink-body border-stone-300 hover:border-stone-500 dark:border-stone-700 dark:hover:border-stone-500"
                        }`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-accent-strong ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            /* Result View with Detailed Explanations */
            <div className="space-y-6 py-2">
              <div className="text-center space-y-3">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-sm border ${
                    passed
                      ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300"
                      : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                  }`}>
                  {passed ? <Trophy className="w-10 h-10" strokeWidth={1.75} aria-hidden /> : <XCircle className="w-10 h-10" strokeWidth={1.75} aria-hidden />}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-ink-max">
                  {passed ? t.levelExam.resultPassed : t.levelExam.resultFailed}
                </h3>
                <p className="text-sm text-ink-soft">
                  {t.levelExam.resultPart1}<span className="font-black tabular-nums text-ink-max text-lg">{format(t.levelExam.resultScore, { correct: correctCount, total: result?.total ?? questions.length })}{format(t.levelExam.resultPart2, { percent: scorePercentage })}</span>{format(t.levelExam.resultRequired, { percent: result?.minPassPercentage ?? minPassPercentage })}
                </p>

                {result?.expired && (
                  <p className="text-xs font-bold text-warn-strong">
                    {t.levelExam.timedOutNote}
                  </p>
                )}

                {passed ? (
                  <div className="p-4 rounded-md bg-brand-50/60 dark:bg-brand-950/30 border border-brand-300 dark:border-brand-900 text-xs text-ink-body space-y-3 font-medium text-left">
                    <div>
                      <p className="font-black text-sm text-accent-ink">{format(t.levelExam.promotedTitle, { level: levelToTest, name: t.levelTitles[levelToTest] ?? levelMeta.name })}</p>
                      <p className="mt-0.5">{t.levelExam.promotedBody}</p>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const { createManualPost } = await import("@/lib/cloudflare-community");
                          await createManualPost(
                            userId,
                            format(t.levelExam.shareText, {
                              level: levelToTest,
                              name: levelMeta.name,
                              percent: scorePercentage,
                            }),
                            undefined,
                            {
                              type: "level_up_achievement",
                              level: levelToTest,
                              level_name: levelMeta.name,
                              score: scorePercentage,
                              emoji: levelMeta.emoji,
                            }
                          );
                          toast.success(t.levelExam.sharedToast);
                        } catch (err: unknown) {
                          toast.error(errorMessage(err, t.levelExam.shareError));
                        }
                      }}
                      className={`${btnPrimary} w-full cursor-pointer text-xs`}
                    >
                      <span>{t.levelExam.shareCta}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-alert-line text-xs text-alert-deep space-y-1 font-medium text-left">
                    <p className="font-black text-sm text-alert-ink">{t.levelExam.reviewTitle}</p>
                    <p>{t.levelExam.reviewBody}</p>
                  </div>
                )}
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4 pt-4 border-t border-line-strong">
                <h4 className="eyebrow text-ink-soft">
                  {t.levelExam.answerAnalysis}
                </h4>
                {questions.map((q, qIdx) => {
                  const userAns = answers[qIdx];
                  // Correctness and the correct index come from the server's
                  // grading response - the exam itself never carried them.
                  const entry = result?.review[qIdx];
                  const isCorrect = entry?.correct ?? false;
                  const correctIndex = entry?.correctIndex ?? null;
                  const explanation = result?.explanations[q.id] ?? "";
                  return (
                    <div
                      key={q.id || qIdx}
                      className={`p-4 rounded-md border text-xs space-y-2 ${
                        isCorrect
                          ? "bg-brand-50/50 dark:bg-brand-950/20 border-brand-200 dark:border-brand-900/60"
                          : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 font-bold">
                        <p className="text-ink-max">
                          {format(t.levelExam.questionLine, { index: qIdx + 1, question: q.question })}
                        </p>
                        <span className={`shrink-0 px-2 py-0.5 rounded-sm font-black text-[10px] ${isCorrect ? "bg-brand-600 text-white" : "bg-rose-600 text-white"}`}>
                          {isCorrect ? t.levelExam.markCorrect : t.levelExam.markWrong}
                        </span>
                      </div>

                      <div className="space-y-1 text-ink-body pt-1">
                        <p>
                          {t.levelExam.youChose}<span className={`font-extrabold ${isCorrect ? "text-accent-strong" : "text-alert"}`}>{userAns !== undefined ? q.options[userAns] : t.levelExam.notChosen}</span>
                        </p>
                        {!isCorrect && correctIndex !== null && (
                          <p>
                            {t.levelExam.correctAnswer}<span className="font-extrabold text-accent-strong">{q.options[correctIndex]}</span>
                          </p>
                        )}
                      </div>

                      {explanation && (
                        <div className="mt-2 p-2.5 rounded-sm bg-white dark:bg-stone-900 border border-line text-[11px] text-ink-soft italic">
                          <Lightbulb className="inline w-3.5 h-3.5 -mt-0.5 text-ink-muted not-italic" aria-hidden /> <strong>{t.levelExam.explanationLabel}</strong> {explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="border-t border-stone-300 px-6 py-4 bg-surface-raised dark:border-stone-700 dark:bg-stone-950 flex items-center justify-between shrink-0">
          {!submitted ? (
            <>
              <p className="text-xs text-ink-muted font-semibold">
                {format(t.levelExam.answered, { done: Object.keys(answers).length, total: questions.length })}
              </p>
              <button
                onClick={() => void handleSubmitExam()}
                disabled={!exam || submitting || Object.keys(answers).length < questions.length}
                className={`${btnPrimary} cursor-pointer text-xs`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.levelExam.grading}</span>
                  </>
                ) : (
                  <>
                    <span>{t.levelExam.submit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="w-full flex justify-end gap-3">
              {!passed && (
                <button
                  onClick={retryExam}
                  className={`${btnSecondary} cursor-pointer text-xs`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.levelExam.retakeNow}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className={`${btnPrimary} cursor-pointer text-xs`}
              >
                {t.levelExam.finish}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
