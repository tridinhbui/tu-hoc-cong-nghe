"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Trophy, Sparkles, X, ChevronRight } from "lucide-react";
import { savePassedMilestone } from "@/lib/cloudflare-milestones";
import { getLessonDetailsForRecall } from "@/app/actions/flashcard-actions";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { earnChest } from "@/lib/chests";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary, btnSecondary, panel } from "@/components/ui/system";

interface StageMilestoneExamModalProps {
  userId: string;
  trackId: string;
  stageLabel: string;
  stageName: string;
  lessonIds: number[];
  onClose: () => void;
  onSuccess: () => void;
}

/** Câu hỏi gộp từ nhiều bài của một chặng, kèm tên bài để hiện nguồn. */
interface MilestoneQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  lessonTitle: string;
}

export default function StageMilestoneExamModal({
  userId,
  trackId,
  stageLabel,
  stageName,
  lessonIds,
  onClose,
  onSuccess,
}: StageMilestoneExamModalProps) {
  const mounted = useIsClient();
  const { t } = useI18n();
  const [questions, setQuestions] = useState<MilestoneQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [examFinished, setExamFinished] = useState(false);

  useEffect(() => {
    const buildQuestionPool = async () => {
      try {
        const pool: MilestoneQuestion[] = [];
        for (const id of lessonIds) {
          const detail = await getLessonDetailsForRecall(id);
          if (detail && detail.quiz && detail.quiz.length > 0) {
            detail.quiz.forEach((q) => {
              pool.push({
                ...q,
                lessonTitle: detail.title,
              });
            });
          }
        }
        
        if (pool.length === 0) {
          toast.error(t.stageExam.noQuestionsFound);
          onClose();
          return;
        }

        // Shuffle and pick up to 15 questions
        const shuffled = pool.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 15));
      } catch (error) {
        console.error("Error building milestone quiz pool:", error);
      } finally {
        setLoading(false);
      }
    };

    void buildQuestionPool();
  }, [lessonIds, onClose, t]);

  const handleOptionSelect = (index: number) => {
    if (answersChecked) return;
    setSelectedOpt(index);
  };

  const checkAnswer = () => {
    if (selectedOpt === null || answersChecked) return;
    setAnswersChecked(true);
    const q = questions[currentQIndex];
    if (selectedOpt === q.correct) {
      setCorrectCount((c) => c + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((idx) => idx + 1);
      setSelectedOpt(null);
      setAnswersChecked(false);
    } else {
      void finishExam();
    }
  };

  const finishExam = async () => {
    const finalScoreRatio = correctCount / questions.length;
    const passed = finalScoreRatio >= 0.8; // At least 80%

    if (passed) {
      const { ok, errorMessage } = await savePassedMilestone(userId, trackId, stageLabel, finalScoreRatio);
      if (ok) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: 50, label: t.stageExam.xpGainedLabel } }));
        }
        toast.success(format(t.stageExam.passToast, { stageLabel }));
        await earnChest(userId, "milestone_exam");
        toast.info(t.stageExam.chestToast);
        window.dispatchEvent(new Event("thtcdn_chests_updated"));
        void recalculateUserStats(userId).catch(() => {});
        onSuccess();
      } else {
        toast.error(format(t.stageExam.saveFailedToast, { errorSuffix: errorMessage ? ` (${errorMessage})` : "" }));
      }
    } else {
      toast.error(format(t.stageExam.failToast, { correct: correctCount, total: questions.length }));
    }
    setExamFinished(true);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-stone-950/60 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className={`${panel} w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line-strong bg-surface-raised dark:bg-stone-950">
          <div>
            <span className="eyebrow text-ink-soft">
              {format(t.stageExam.badgeLabel, { stageLabel })}
            </span>
            <h3 className="text-sm font-extrabold text-ink mt-1">{stageName}</h3>
          </div>
          <button onClick={onClose} aria-label={t.stageExam.closeWindow} className="p-1.5 hover:bg-surface-raised rounded-sm text-ink-faint hover:text-ink transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-brand-600 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-ink-muted">{t.stageExam.preparing}</p>
            </div>
          ) : examFinished ? (
            <div className="text-center py-8 space-y-6">
              {correctCount / questions.length >= 0.8 ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-sm border border-brand-600 bg-accent-soft text-accent flex items-center justify-center mx-auto dark:border-brand-400">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-extrabold text-ink">{t.stageExam.passedTitle}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
                    {t.stageExam.passedBodyPart1} <strong>{correctCount}/{questions.length}</strong> {t.stageExam.passedBodyPart2} <strong>{t.stageExam.xpAmountLabel}</strong> {t.stageExam.passedBodyPart3}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-sm border border-line-strong text-ink-faint flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-extrabold text-ink">{t.stageExam.failedTitle}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
                    {t.stageExam.failedBodyPart1} <strong>{correctCount}/{questions.length}</strong> {format(t.stageExam.failedBodyPart2, { percent: Math.round((correctCount / questions.length) * 100) })} <strong>{format(t.stageExam.minPercentLabel, { total: questions.length })}</strong> {t.stageExam.failedBodyPart3}
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className={`${btnSecondary} w-full cursor-pointer`}
              >
                {t.stageExam.closeWindow}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex justify-between items-center gap-3 text-[11px] font-bold text-ink-muted border-b border-line-strong pb-2">
                <span>{format(t.stageExam.questionCounter, { current: currentQIndex + 1, total: questions.length })}</span>
                <span>{t.stageExam.minCorrectRequired}</span>
              </div>

              <div className="space-y-1">
                <p className="eyebrow text-ink-faint">{format(t.stageExam.fromLesson, { lessonTitle: questions[currentQIndex].lessonTitle })}</p>
                <p className="text-sm font-bold text-ink-heading leading-relaxed">
                  {questions[currentQIndex].question}
                </p>
              </div>

              <div className="space-y-2.5">
                {questions[currentQIndex].options.map((opt: string, i: number) => {
                  let btnCls = "border-line-strong bg-white dark:bg-stone-900 text-ink-body hover:border-stone-950 dark:hover:border-stone-300";
                  if (answersChecked) {
                    if (i === questions[currentQIndex].correct) {
                      btnCls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
                    } else if (i === selectedOpt) {
                      btnCls = "border-red-600 dark:border-red-400 bg-danger-soft text-ink-max";
                    } else {
                      btnCls = "border-line text-ink-faint";
                    }
                  } else if (selectedOpt === i) {
                    btnCls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
                  }

                  return (
                    <button
                      key={i}
                      disabled={answersChecked}
                      onClick={() => handleOptionSelect(i)}
                      className={`w-full text-left p-3.5 rounded-sm border text-xs sm:text-sm transition-colors flex items-center gap-3 cursor-pointer ${btnCls}`}
                    >
                      <span className="w-5 h-5 shrink-0 rounded-xs font-mono text-[10px] font-medium flex items-center justify-center border border-current/40 text-ink-muted">
                        {["A", "B", "C", "D"][i]}
                      </span>
                      <span className="line-clamp-2">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!answersChecked ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOpt === null}
                  className={`${btnPrimary} w-full cursor-pointer`}
                >
                  {t.stageExam.confirmAnswer}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-sm text-xs leading-relaxed border border-l-2 text-ink-body ${
                    selectedOpt === questions[currentQIndex].correct
                      ? "bg-accent-soft border-accent-line border-l-brand-600 dark:border-l-brand-400"
                      : "bg-danger-soft border-danger-line border-l-red-600 dark:border-l-red-400"
                  }`}>
                    <p className={`font-bold mb-1 ${selectedOpt === questions[currentQIndex].correct ? "text-accent-strong" : "text-danger"}`}>
                      {selectedOpt === questions[currentQIndex].correct ? t.stageExam.correctFeedback : t.stageExam.incorrectFeedback}
                    </p>
                    <p>{questions[currentQIndex].explanation}</p>
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className={`${btnPrimary} w-full cursor-pointer`}
                  >
                    {currentQIndex + 1 === questions.length ? t.stageExam.finishExam : t.stageExam.nextQuestion} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
