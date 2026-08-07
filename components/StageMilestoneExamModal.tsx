"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Trophy, Sparkles, X, ChevronRight } from "lucide-react";
import { savePassedMilestone } from "@/lib/supabase-milestones";
import { getLessonDetailsForRecall } from "@/app/actions/flashcard-actions";
import { recalculateUserStats } from "@/lib/supabase-user";
import { earnChest } from "@/lib/chests";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-stone-100 dark:border-stone-800/80">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {format(t.stageExam.badgeLabel, { stageLabel })}
            </span>
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-1">{stageName}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-stone-500">{t.stageExam.preparing}</p>
            </div>
          ) : examFinished ? (
            <div className="text-center py-8 space-y-6">
              {correctCount / questions.length >= 0.8 ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/40 rounded-3xl text-amber-500 flex items-center justify-center mx-auto shadow-inner animate-[bounce_1s_infinite]">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-extrabold text-stone-900 dark:text-stone-50">{t.stageExam.passedTitle}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
                    {t.stageExam.passedBodyPart1} <strong>{correctCount}/{questions.length}</strong> {t.stageExam.passedBodyPart2} <strong>{t.stageExam.xpAmountLabel}</strong> {t.stageExam.passedBodyPart3}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-stone-50 dark:bg-stone-950 rounded-3xl text-stone-400 flex items-center justify-center mx-auto shadow-inner">
                    <XCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-extrabold text-stone-900 dark:text-stone-50">{t.stageExam.failedTitle}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
                    {t.stageExam.failedBodyPart1} <strong>{correctCount}/{questions.length}</strong> {format(t.stageExam.failedBodyPart2, { percent: Math.round((correctCount / questions.length) * 100) })} <strong>{format(t.stageExam.minPercentLabel, { total: questions.length })}</strong> {t.stageExam.failedBodyPart3}
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest cursor-pointer active:scale-95 transition-all shadow-md"
              >
                {t.stageExam.closeWindow}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest bg-stone-50 dark:bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-100 dark:border-stone-800">
                <span>{format(t.stageExam.questionCounter, { current: currentQIndex + 1, total: questions.length })}</span>
                <span>{t.stageExam.minCorrectRequired}</span>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">{format(t.stageExam.fromLesson, { lessonTitle: questions[currentQIndex].lessonTitle })}</p>
                <p className="text-sm font-bold text-stone-800 dark:text-stone-200 leading-relaxed">
                  {questions[currentQIndex].question}
                </p>
              </div>

              <div className="space-y-2.5">
                {questions[currentQIndex].options.map((opt: string, i: number) => {
                  let btnCls = "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700";
                  if (answersChecked) {
                    if (i === questions[currentQIndex].correct) {
                      btnCls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-bold";
                    } else if (i === selectedOpt) {
                      btnCls = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400";
                    } else {
                      btnCls = "border-stone-100 dark:border-stone-800 opacity-60";
                    }
                  } else if (selectedOpt === i) {
                    btnCls = "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 font-bold";
                  }

                  return (
                    <button
                      key={i}
                      disabled={answersChecked}
                      onClick={() => handleOptionSelect(i)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${btnCls}`}
                    >
                      <span className="w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center border bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
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
                  className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {t.stageExam.confirmAnswer}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed border ${
                    selectedOpt === questions[currentQIndex].correct
                      ? "bg-emerald-50/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400"
                      : "bg-rose-50/20 border-rose-100 dark:border-rose-900/30 text-rose-800 dark:text-rose-400"
                  }`}>
                    <p className="font-bold mb-1">
                      {selectedOpt === questions[currentQIndex].correct ? t.stageExam.correctFeedback : t.stageExam.incorrectFeedback}
                    </p>
                    <p>{questions[currentQIndex].explanation}</p>
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md hover:scale-[1.01] active:scale-[0.99]"
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
