"use client";

import { useState, useEffect, useCallback } from "react";
import { errorMessage } from "@/lib/errors";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, Sparkles, X, ArrowRight, RefreshCw, Trophy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { LEVEL_EXAMS } from "@/lib/level-exams";
import {
  fetchLevelExam,
  submitLevelExam,
  type ServedExam,
  type LevelExamResult,
} from "@/lib/supabase-level-exams";
import { LEVELS } from "@/lib/levels";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-stone-900 shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="border-b border-stone-200 dark:border-stone-800 bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{levelMeta.emoji || fallbackConfig.badgeEmoji || "🏆"}</span>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-black uppercase text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{isRecertificationRetake ? t.levelExam.titleRetake : t.levelExam.title}</span>
              </div>
              <h2 className="text-lg font-black tracking-tight text-white mt-1">
                {examTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Strip */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 px-6 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>
              {format(t.levelExam.passRequirement, { percent: minPassPercentage })}
              {questions.length > 0 &&
                format(t.levelExam.passRequirementCount, {
                  correct: Math.ceil((minPassPercentage / 100) * questions.length),
                  total: questions.length,
                })}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 font-mono px-3 py-1 rounded-full border shadow-xs ${timeLeft < 60 ? "bg-rose-500 text-white border-rose-400 animate-pulse font-black" : "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-700"}`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions & Result Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loadError ? (
            <div className="py-12 text-center space-y-4">
              <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{loadError}</p>
              <button
                onClick={retryExam}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs hover:bg-emerald-400 cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t.levelExam.reloadExam}
              </button>
            </div>
          ) : !exam ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">{t.levelExam.loading}</p>
            </div>
          ) : !submitted ? (
            questions.map((q, qIdx) => (
              <div
                key={q.id || qIdx}
                className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-3"
              >
                <p className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-stone-950 mt-0.5">
                    {qIdx + 1}
                  </span>
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
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-black"
                            : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-stone-800"
                        }`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-stone-950 ml-2" />}
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
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-4xl shadow-xl">
                  {passed ? "🏆" : "❌"}
                </div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  {passed ? t.levelExam.resultPassed : t.levelExam.resultFailed}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {t.levelExam.resultPart1}<span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">{format(t.levelExam.resultScore, { correct: correctCount, total: result?.total ?? questions.length })}{format(t.levelExam.resultPart2, { percent: scorePercentage })}</span>{format(t.levelExam.resultRequired, { percent: result?.minPassPercentage ?? minPassPercentage })}
                </p>

                {result?.expired && (
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    {t.levelExam.timedOutNote}
                  </p>
                )}

                {passed ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-3 font-medium text-left">
                    <div>
                      <p className="font-black text-sm text-emerald-900 dark:text-emerald-200">{format(t.levelExam.promotedTitle, { level: levelToTest, name: levelMeta.name })}</p>
                      <p className="mt-0.5">{t.levelExam.promotedBody}</p>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const { createManualPost } = await import("@/lib/supabase-community");
                          await createManualPost(
                            userId,
                            `🏆 Tôi vừa xuất sắc vượt qua Bài Thi Thăng Cấp Khắt Khe - Cấp độ ${levelToTest}: ${levelMeta.name} với điểm số ${scorePercentage}%! 🔥 #ThanhTuu #LevelUp`,
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
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{t.levelExam.shareCta}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 space-y-1 font-medium text-left">
                    <p className="font-black text-sm text-rose-900 dark:text-rose-200">{t.levelExam.reviewTitle}</p>
                    <p>{t.levelExam.reviewBody}</p>
                  </div>
                )}
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
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
                      className={`p-4 rounded-2xl border text-xs space-y-2 ${
                        isCorrect
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60"
                          : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 font-bold">
                        <p className="text-stone-900 dark:text-stone-100">
                          {format(t.levelExam.questionLine, { index: qIdx + 1, question: q.question })}
                        </p>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full font-black text-[10px] ${isCorrect ? "bg-emerald-500 text-stone-950" : "bg-rose-500 text-white"}`}>
                          {isCorrect ? t.levelExam.markCorrect : t.levelExam.markWrong}
                        </span>
                      </div>

                      <div className="space-y-1 text-stone-700 dark:text-stone-300 pt-1">
                        <p>
                          {t.levelExam.youChose}<span className={`font-extrabold ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{userAns !== undefined ? q.options[userAns] : t.levelExam.notChosen}</span>
                        </p>
                        {!isCorrect && correctIndex !== null && (
                          <p>
                            {t.levelExam.correctAnswer}<span className="font-extrabold text-emerald-700 dark:text-emerald-400">{q.options[correctIndex]}</span>
                          </p>
                        )}
                      </div>

                      {explanation && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400 italic">
                          💡 <strong>{t.levelExam.explanationLabel}</strong> {explanation}
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
        <div className="border-t border-stone-200 dark:border-stone-800 px-6 py-4 bg-stone-50 dark:bg-stone-950 flex items-center justify-between shrink-0">
          {!submitted ? (
            <>
              <p className="text-xs text-stone-500 font-semibold">
                {format(t.levelExam.answered, { done: Object.keys(answers).length, total: questions.length })}
              </p>
              <button
                onClick={() => void handleSubmitExam()}
                disabled={!exam || submitting || Object.keys(answers).length < questions.length}
                className="button-premium bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-6 py-2.5 rounded-xl font-black text-xs transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-md"
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
                  className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold text-xs hover:bg-stone-300 dark:hover:bg-stone-700 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.levelExam.retakeNow}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-md"
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
