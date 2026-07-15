"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw, Check, X, ArrowRight, PartyPopper } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";
import { getQuizMistakesReviewAction, type QuizMistakeReviewItem } from "./actions";
import { recordQuizMistake } from "@/lib/quiz-mistakes";

interface CardState {
  picked: number | null;
  resolved: boolean;
}

export default function OnTapCauSaiClient() {
  const { userId, checking } = useAuthGate();
  const [items, setItems] = useState<QuizMistakeReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardState, setCardState] = useState<Record<string, CardState>>({});

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getQuizMistakesReviewAction(userId)
      .then((data) => {
        setItems(data);
        setCardState(Object.fromEntries(data.map((it) => [key(it), { picked: null, resolved: false }])));
      })
      .catch((err) => console.error("Error loading quiz mistakes:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  function key(item: QuizMistakeReviewItem) {
    return `${item.lessonId}-${item.questionIndex}`;
  }

  function handlePick(item: QuizMistakeReviewItem, optionIndex: number) {
    const k = key(item);
    if (cardState[k]?.picked !== null) return;
    const correct = optionIndex === item.correct;
    setCardState((prev) => ({ ...prev, [k]: { picked: optionIndex, resolved: correct } }));
    void recordQuizMistake(item.lessonId, item.questionIndex, correct);
  }

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  const remaining = items.filter((it) => !cardState[key(it)]?.resolved);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            <RotateCcw className="w-3.5 h-3.5" /> Ôn tập
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Câu sai cần ôn</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 mb-6">
          Mọi câu quiz bạn từng làm sai, gom lại từ tất cả các bài học. Trả lời đúng ở đây là câu đó biến mất khỏi danh sách.
        </p>

        {loading ? (
          <p className="text-sm text-stone-400 dark:text-stone-500">Đang tải...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl">
            <PartyPopper className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-bold text-stone-900 dark:text-stone-100">Không có câu nào cần ôn cả!</p>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Bạn đang làm rất tốt - tiếp tục học nhé.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-3">
              Còn {remaining.length}/{items.length} câu
            </p>
            <div className="space-y-4">
              {items.map((item) => {
                const k = key(item);
                const state = cardState[k] ?? { picked: null, resolved: false };
                const answered = state.picked !== null;
                return (
                  <div
                    key={k}
                    className={`bg-white dark:bg-stone-900 rounded-2xl border-2 p-5 space-y-3 transition-opacity ${
                      state.resolved ? "border-emerald-200 dark:border-emerald-900 opacity-60" : "border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/bai-hoc/${item.lessonSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {item.lessonLabel}: {item.lessonTitle}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      {item.wrongCount > 1 && (
                        <span className="text-[11px] font-bold text-rose-500 dark:text-rose-400 flex-shrink-0">
                          Sai {item.wrongCount} lần
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-stone-900 dark:text-stone-100 leading-relaxed">{item.question}</p>

                    <div className="space-y-2">
                      {item.options.map((opt, oi) => {
                        const isCorrectOpt = oi === item.correct;
                        const chosen = state.picked === oi;
                        let cls = "border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600";
                        if (answered) {
                          if (isCorrectOpt) cls = "border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40";
                          else if (chosen) cls = "border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40";
                          else cls = "border-stone-200 dark:border-stone-800 opacity-60";
                        }
                        return (
                          <button
                            key={oi}
                            disabled={answered}
                            onClick={() => handlePick(item, oi)}
                            className={`w-full text-left text-sm rounded-xl border px-4 py-2.5 transition-colors flex items-start gap-2 disabled:cursor-default ${cls}`}
                          >
                            {answered && isCorrectOpt && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />}
                            {answered && chosen && !isCorrectOpt && <X className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />}
                            <span className="text-stone-700 dark:text-stone-300">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <p className={`text-xs leading-relaxed rounded-lg p-3 ${state.resolved ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300" : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300"}`}>
                        {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
