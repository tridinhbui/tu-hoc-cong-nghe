"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, CheckCircle, XCircle, HelpCircle, Sparkles, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { btnPrimary } from "@/components/ui/system";
import { getLessonRecalls, processRecallAttempt, type LessonRecall } from "@/lib/cloudflare-recalls";
import { getLessonDetailsForRecall } from "@/app/actions/flashcard-actions";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface LessonRecallWidgetProps {
  userId: string;
}

interface DueRecallItem {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  recallStage: number;
  nextRecallAt: string;
}

/** Câu hỏi trong phiên ôn, ghép từ quiz của bài học. */
interface RecallQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export default function LessonRecallWidget({ userId }: LessonRecallWidgetProps) {
  const { t } = useI18n();
  const [dueRecalls, setDueRecalls] = useState<DueRecallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  // Active review session state
  const [activeItem, setActiveItem] = useState<DueRecallItem | null>(null);
  const [questions, setQuestions] = useState<RecallQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewFinished, setReviewFinished] = useState(false);

  useEffect(() => {
    const loadRecalls = async () => {
      try {
        const recalls = await getLessonRecalls(userId);
        const now = new Date();
        const due = recalls.filter((r) => new Date(r.next_recall_at) <= now);
        
        const resolved: DueRecallItem[] = [];
        for (const item of due) {
          const detail = await getLessonDetailsForRecall(item.lesson_id);
          if (detail) {
            resolved.push({
              lessonId: item.lesson_id,
              lessonTitle: detail.title,
              lessonSlug: detail.slug,
              recallStage: item.recall_stage,
              nextRecallAt: item.next_recall_at,
            });
          }
        }
        setDueRecalls(resolved);
      } catch (err) {
        console.error("Error loading recalls:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadRecalls();
  }, [userId]);

  const startReview = async (item: DueRecallItem) => {
    const detail = await getLessonDetailsForRecall(item.lessonId);
    if (!detail || !detail.quiz || detail.quiz.length === 0) {
      toast.error(t.recallWidget.noQuizFound);
      return;
    }
    
    // Pick 3 random questions or all if less than 3
    const shuffled = [...detail.quiz].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
    setActiveItem(item);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setAnswersChecked(false);
    setCorrectCount(0);
    setReviewFinished(false);
  };

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
      void finishReview();
    }
  };

  const finishReview = async () => {
    if (!activeItem) return;
    const allCorrect = correctCount === questions.length;
    
    try {
      const ok = await processRecallAttempt(userId, activeItem.lessonId, allCorrect);
      if (ok) {
        if (allCorrect) {
          toast.success(t.recallWidget.passedToast);
          void recalculateUserStats(userId).catch(() => {});
        } else {
          toast.info(t.recallWidget.partialToast);
        }
        
        // Remove item from due list
        setDueRecalls((prev) => prev.filter((r) => r.lessonId !== activeItem.lessonId));
      }
    } catch {
      toast.error(t.recallWidget.updateFailed);
    } finally {
      setReviewFinished(true);
      setActiveItem(null);
    }
  };

  if (loading) return null;
  if (dueRecalls.length === 0 && !activeItem) return null;

  const hasWarning = dueRecalls.length > 0;

  return (
    <div className={`rounded-md border overflow-hidden relative bg-white dark:bg-stone-900 ${
      hasWarning
        ? 'border-warn-line'
        : 'border-line'
    }`}>

      {/* Collapsible Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between gap-2 p-4 cursor-pointer transition-colors hover:bg-surface-raised dark:hover:bg-stone-950"
      >
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-sm bg-surface flex items-center justify-center shrink-0 ${
              hasWarning ? 'text-warn' : 'text-ink-body'
          }`}>
            {hasWarning ? <AlertCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
          </div>
          <div className="text-left min-w-0">
            <h3 className="text-sm font-black tracking-tight truncate text-ink-max">
              {t.recallWidget.heading}
              {hasWarning && format(t.recallWidget.headingCount, { count: dueRecalls.length })}
            </h3>
            <p className={`text-[11px] mt-0.5 truncate ${
              hasWarning
                ? 'text-warn-strong'
                : 'text-ink-muted'
            }`}>
              {hasWarning ? t.recallWidget.warningSubtitle : t.recallWidget.normalSubtitle}
            </p>
          </div>
        </div>
        {collapsed ? (
          <ChevronDown className="w-5 h-5 shrink-0 text-stone-400" />
        ) : (
          <ChevronUp className="w-5 h-5 shrink-0 text-stone-400" />
        )}
      </button>

      {/* Collapsible Content */}
      {!collapsed && (
      <div className="px-4 pb-4 space-y-4 border-t border-line">
        {!activeItem ? (
          <div className="space-y-4 pt-4">

          <div className="divide-y divide-line">
            {dueRecalls.slice(0, 3).map((item) => (
              <div
                key={item.lessonId}
                className="flex items-center justify-between gap-3 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-ink-max truncate">
                    {item.lessonTitle}
                  </p>
                  <p className="text-[10px] text-ink-muted mt-0.5">
                    {format(t.recallWidget.stageLine, { stage: item.recallStage })}
                  </p>
                </div>
                <button
                  onClick={() => startReview(item)}
                  className={`${btnPrimary} shrink-0 cursor-pointer !px-3 !py-1.5 !text-[11px] !gap-1`}
                >
                  <RefreshCw className="w-3 h-3" /> {t.recallWidget.reviewNow}
                </button>
              </div>
            ))}
          </div>
            {dueRecalls.length > 3 && (
              <p className="text-[11px] text-ink-faint text-center font-semibold">
                {format(t.recallWidget.moreWaiting, { count: dueRecalls.length - 3 })}
              </p>
            )}
        </div>
      ) : (
        // Active Quiz modal/card view inside widget
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-xs font-bold text-ink-max truncate max-w-[70%]">
              {format(t.recallWidget.reviewingLesson, { title: activeItem.lessonTitle })}
            </span>
            <span className="font-mono text-[10.5px] font-medium tabular-nums text-ink-faint shrink-0">
              {format(t.recallWidget.questionCounter, { index: currentQIndex + 1, total: questions.length })}
            </span>
          </div>

          {questions[currentQIndex] && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-ink leading-relaxed">
                {questions[currentQIndex].question}
              </p>

              <div className="space-y-2">
                {questions[currentQIndex].options.map((opt: string, i: number) => {
                  let btnCls = "border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 text-ink-heading hover:border-line-firm";
                  if (answersChecked) {
                    if (i === questions[currentQIndex].correct) {
                      btnCls = "border-brand-600 bg-brand-50 dark:border-brand-500 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 font-bold";
                    } else if (i === selectedOpt) {
                      btnCls = "border-red-500 bg-red-50 dark:bg-red-950/40 text-alert-ink";
                    } else {
                      btnCls = "border-line opacity-60";
                    }
                  } else if (selectedOpt === i) {
                    btnCls = "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40 text-ink-max font-bold";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      disabled={answersChecked}
                      className={`w-full text-left p-3 rounded-sm border text-xs transition-colors flex items-center gap-2 cursor-pointer ${btnCls}`}
                    >
                      <span className="font-mono font-medium shrink-0">{["A", "B", "C", "D"][i]}.</span>
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
                  {t.recallWidget.confirm}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-3 rounded-sm text-[11px] leading-relaxed border ${
                    selectedOpt === questions[currentQIndex].correct
                      ? "bg-brand-50 border-brand-300 dark:bg-brand-950/40 dark:border-brand-800 text-brand-900 dark:text-brand-200"
                      : "bg-red-50 border-red-300 dark:bg-red-950/40 dark:border-red-800 text-alert-ink"
                  }`}>
                    <p className="font-bold mb-0.5">
                      {selectedOpt === questions[currentQIndex].correct ? t.recallWidget.correct : t.recallWidget.wrong}
                    </p>
                    <p>{questions[currentQIndex].explanation}</p>
                  </div>
                  <button
                    onClick={nextQuestion}
                    className={`${btnPrimary} w-full cursor-pointer`}
                  >
                    {currentQIndex + 1 === questions.length ? t.recallWidget.finish : t.recallWidget.nextQuestion}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        )}
      </div>
      )}
    </div>
  );
}
