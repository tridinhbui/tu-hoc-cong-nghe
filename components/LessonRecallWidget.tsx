"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, CheckCircle, XCircle, HelpCircle, Sparkles, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { getLessonRecalls, processRecallAttempt, type LessonRecall } from "@/lib/supabase-recalls";
import { getLessonDetailsForRecall } from "@/app/actions/flashcard-actions";
import { recalculateUserStats } from "@/lib/supabase-user";

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

export default function LessonRecallWidget({ userId }: LessonRecallWidgetProps) {
  const [dueRecalls, setDueRecalls] = useState<DueRecallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  // Active review session state
  const [activeItem, setActiveItem] = useState<DueRecallItem | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
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
      toast.error("Không tìm thấy câu hỏi trắc nghiệm cho bài này.");
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
          toast.success("Tuyệt vời! Bạn đã vượt qua chu kỳ ôn tập và nhận +10 XP học thuật! 🔄🏆");
          void recalculateUserStats(userId).catch(() => {});
        } else {
          toast.info("Ôn tập hoàn tất. Một số câu chưa đúng, bài học sẽ hiển thị lại sớm hơn để bạn ôn luyện.");
        }
        
        // Remove item from due list
        setDueRecalls((prev) => prev.filter((r) => r.lessonId !== activeItem.lessonId));
      }
    } catch {
      toast.error("Không thể cập nhật tiến độ ôn tập.");
    } finally {
      setReviewFinished(true);
      setActiveItem(null);
    }
  };

  if (loading) return null;
  if (dueRecalls.length === 0 && !activeItem) return null;

  const hasWarning = dueRecalls.length > 0;

  return (
    <div className={`rounded-2xl border shadow-sm overflow-hidden relative transition-all ${
      hasWarning
        ? 'border-red-300 dark:border-red-800/70 bg-red-50 dark:bg-stone-900'
        : 'border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900'
    }`}>
      {hasWarning && <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.03] rounded-full blur-2xl pointer-events-none" />}

      {/* Collapsible Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center justify-between gap-2 p-4 cursor-pointer transition-all ${
          hasWarning
            ? 'hover:bg-red-100/60 dark:hover:bg-red-950/20'
            : 'hover:bg-stone-50/50 dark:hover:bg-stone-950/30'
        }`}
      >
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              hasWarning
                ? 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 animate-pulse'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 animate-spin-slow'
          }`}>
            {hasWarning ? <AlertCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
          </div>
          <div className="text-left min-w-0">
            <h3 className={`text-sm font-extrabold truncate ${
              hasWarning
                ? 'text-red-800 dark:text-red-200'
                : 'text-stone-900 dark:text-stone-100'
            }`}>
              CẦN ÔN LẠI GÌ {hasWarning && `(${dueRecalls.length})`}
            </h3>
            <p className={`text-[10px] mt-0.5 truncate ${
              hasWarning
                ? 'text-red-700 dark:text-red-300'
                : 'text-stone-500 dark:text-stone-400'
            }`}>
              {hasWarning ? 'Có bài học cần ôn tập ngay' : 'Các bài học đã đến chu kỳ ôn tập'}
            </p>
          </div>
        </div>
        {collapsed ? (
          <ChevronDown className={`w-5 h-5 shrink-0 ${hasWarning ? 'text-red-600 dark:text-red-400' : 'text-stone-400'}`} />
        ) : (
          <ChevronUp className={`w-5 h-5 shrink-0 ${hasWarning ? 'text-red-600 dark:text-red-400' : 'text-stone-400'}`} />
        )}
      </button>

      {/* Collapsible Content */}
      {!collapsed && (
      <div className="px-4 pb-4 space-y-4 border-t border-stone-200/50 dark:border-stone-800/50">
        {!activeItem ? (
          <div className="space-y-4 pt-4">

          <div className="space-y-2">
            {dueRecalls.slice(0, 3).map((item) => (
              <div
                key={item.lessonId}
                className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 truncate">
                    {item.lessonTitle}
                  </p>
                  <p className="text-[9px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Chu kỳ: Chặng {item.recallStage}/4
                  </p>
                </div>
                <button
                  onClick={() => startReview(item)}
                  className="px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className="w-3 h-3" /> Ôn ngay
                </button>
              </div>
            ))}
            {dueRecalls.length > 3 && (
              <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center font-bold">
                Còn {dueRecalls.length - 3} bài khác đang chờ ôn tập
              </p>
            )}
          </div>
        </div>
      ) : (
        // Active Quiz modal/card view inside widget
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 pb-2">
            <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 truncate max-w-[70%]">
              Ôn tập: {activeItem.lessonTitle}
            </span>
            <span className="text-[10px] font-extrabold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md shrink-0">
              Câu {currentQIndex + 1}/{questions.length}
            </span>
          </div>

          {questions[currentQIndex] && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                {questions[currentQIndex].question}
              </p>

              <div className="space-y-2">
                {questions[currentQIndex].options.map((opt: string, i: number) => {
                  let btnCls = "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:border-stone-300 dark:hover:border-stone-500";
                  if (answersChecked) {
                    if (i === questions[currentQIndex].correct) {
                      btnCls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold";
                    } else if (i === selectedOpt) {
                      btnCls = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200";
                    } else {
                      btnCls = "border-stone-100 dark:border-stone-800 opacity-60";
                    }
                  } else if (selectedOpt === i) {
                    btnCls = "border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white border-2 font-bold";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      disabled={answersChecked}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-2 cursor-pointer ${btnCls}`}
                    >
                      <span className="font-bold shrink-0">{["A", "B", "C", "D"][i]}.</span>
                      <span className="line-clamp-2">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!answersChecked ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOpt === null}
                  className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                >
                  Xác nhận
                </button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-3 rounded-xl text-[10px] leading-relaxed border ${
                    selectedOpt === questions[currentQIndex].correct
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50 border-rose-200 dark:bg-rose-950/50 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                  }`}>
                    <p className="font-bold mb-0.5">
                      {selectedOpt === questions[currentQIndex].correct ? "Đúng rồi! 🎉" : "Chưa đúng!"}
                    </p>
                    <p>{questions[currentQIndex].explanation}</p>
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {currentQIndex + 1 === questions.length ? "Hoàn tất" : "Câu tiếp theo"}
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
