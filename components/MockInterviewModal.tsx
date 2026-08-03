"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Timer, Mic, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ChallengeQuestion } from "@/app/api/knowledge-challenge/route";
import { submitQuizSession, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import { useIsClient } from "@/lib/use-is-client";

// A full mock interview run: 10 IB-question-bank questions spread across the
// bank's categories, on a clock, with no per-question feedback - you find out
// how you did at the end, the way a real screen works. The /kiem-tra "ib"
// drill stays what it is (5 random questions, instant feedback); this is the
// thing "Interview readiness" on the career profile actually weights
// (lib/career-competency.ts), and the one the weekly "làm 1 mock interview"
// mission counts.
//
// Recorded as a user_quiz_sessions row with track "mock-interview" through
// the same server-graded submit route as every other quiz, so the score can't
// be fabricated from devtools.

interface MockInterviewModalProps {
  onClose: () => void;
  /** Fired after the run has been recorded, so the career profile can refetch. */
  onFinished?: () => void;
  userId: string | null;
}

type LoadState = "loading" | "ready" | "empty" | "error" | "submitting" | "done";

/** Seconds per question. Roughly the length of a real "walk me through it"
 *  answer - enough to think, short enough to feel like an interview. */
const SECONDS_PER_QUESTION = 90;

function formatClock(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MockInterviewModal({ onClose, onFinished, userId }: MockInterviewModalProps) {
  const [state, setState] = useState<LoadState>("loading");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [result, setResult] = useState<{ score: number; total: number; xpEarned: number } | null>(null);
  const mounted = useIsClient();

  // Held in a ref as well so the interval callback can advance the question
  // without being re-created (and restarting the clock) on every tick.
  const activeQRef = useRef(0);
  activeQRef.current = activeQ;

  const load = useCallback(async () => {
    setState("loading");
    try {
      const res = await fetch("/api/knowledge-challenge?track=mock-interview&difficulty=tat-ca");
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      if (!data.questions?.length) {
        setState("empty");
        return;
      }
      setQuestions(data.questions as ChallengeQuestion[]);
      setPicks(new Array(data.questions.length).fill(null));
      setActiveQ(0);
      setSecondsLeft(SECONDS_PER_QUESTION);
      setState("ready");
    } catch (error) {
      console.error("Error loading mock interview:", error);
      setState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const total = questions.length;
  const answeredCount = picks.filter((p) => p !== null).length;

  const finish = useCallback(
    async (finalPicks: (number | null)[]) => {
      setState("submitting");
      // Unanswered questions are submitted as an out-of-range index rather
      // than skipped, so `total` stays the number of questions actually
      // asked - running out of time has to count against the score, not
      // quietly shrink the denominator.
      const answers: QuizAnswerSubmission[] = questions.map((q, i) => ({
        token: q.token,
        selected: finalPicks[i] ?? -1,
      }));
      try {
        const res = await submitQuizSession("mock-interview", "tat-ca", answers);
        setResult(res);
        if (userId) void recalculateUserStats(userId).catch(() => {});
        onFinished?.();
      } catch (error) {
        console.error("Error recording mock interview:", error);
        // The run still gets shown - only the persisted record failed.
        setResult({
          score: questions.filter((q, i) => finalPicks[i] === q.correct).length,
          total: questions.length,
          xpEarned: 0,
        });
        toast.error("Không lưu được kết quả phỏng vấn, nhưng bạn vẫn xem được phần chấm điểm.");
      }
      setState("done");
    },
    [questions, userId, onFinished]
  );

  const goNext = useCallback(
    (nextPicks?: (number | null)[]) => {
      const current = nextPicks ?? picks;
      if (activeQRef.current + 1 >= total) {
        void finish(current);
        return;
      }
      setActiveQ((i) => i + 1);
      setSecondsLeft(SECONDS_PER_QUESTION);
    },
    [picks, total, finish]
  );

  // The ticker only decrements - advancing is done by the effect below,
  // reacting to the clock hitting zero. Keeping the two apart matters: a
  // setState call inside another setState's updater would fire twice under
  // StrictMode and skip a question.
  useEffect(() => {
    if (state !== "ready") return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [state]);

  // Out of time on this question - move on, which is what makes this a
  // *timed* interview rather than a quiz with a decorative clock.
  useEffect(() => {
    if (state !== "ready" || secondsLeft > 0) return;
    goNext();
  }, [state, secondsLeft, goNext]);

  const q = questions[activeQ];

  const categoryLabel = useMemo(() => q?.lessonTitle?.split("·").pop()?.trim() ?? "Phỏng vấn", [q]);

  function choose(optionIndex: number) {
    setPicks((prev) => {
      const next = [...prev];
      next[activeQ] = optionIndex;
      return next;
    });
  }

  function handleNext() {
    const next = [...picks];
    goNext(next);
  }

  if (!mounted) return null;

  const body = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Mic className="w-4.5 h-4.5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 truncate">Mock Interview</h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                {state === "ready" ? `Câu ${activeQ + 1}/${total} · ${categoryLabel}` : "Phỏng vấn thử có tính giờ"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {state === "ready" && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black tabular-nums ${
                  secondsLeft <= 15
                    ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                {formatClock(secondsLeft)}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label="Đóng phỏng vấn thử"
              className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5">
          {state === "loading" && (
            <div className="py-16 flex flex-col items-center gap-3 text-stone-500 dark:text-stone-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-xs font-bold">Đang chuẩn bị bộ câu hỏi...</p>
            </div>
          )}

          {state === "empty" && (
            <p className="py-16 text-center text-sm font-bold text-stone-500 dark:text-stone-400">
              Chưa có câu hỏi phỏng vấn nào khả dụng.
            </p>
          )}

          {state === "error" && (
            <div className="py-16 flex flex-col items-center gap-3">
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400">Không tải được bộ câu hỏi.</p>
              <button
                onClick={() => void load()}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          )}

          {state === "submitting" && (
            <div className="py-16 flex flex-col items-center gap-3 text-stone-500 dark:text-stone-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-xs font-bold">Đang chấm điểm buổi phỏng vấn...</p>
            </div>
          )}

          {state === "ready" && q && (
            <>
              <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mb-5">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((activeQ + 1) / total) * 100}%` }}
                />
              </div>

              <p className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                {q.question}
              </p>

              <div className="mt-4 space-y-2">
                {q.options.map((option, oi) => {
                  const isPicked = picks[activeQ] === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(oi)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed transition-colors cursor-pointer ${
                        isPicked
                          ? "border-indigo-500 bg-indigo-500/10 text-stone-900 dark:text-stone-100 font-bold"
                          : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/40 text-stone-700 dark:text-stone-300 hover:border-indigo-300 dark:hover:border-indigo-800"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
                  Đã trả lời {answeredCount}/{total} · không có gợi ý giữa chừng
                </span>
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-black shadow-sm transition-colors cursor-pointer"
                >
                  {activeQ + 1 >= total ? "Nộp bài phỏng vấn" : "Câu tiếp theo →"}
                </button>
              </div>
            </>
          )}

          {state === "done" && result && (
            <div>
              <div className="text-center py-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Kết quả phỏng vấn thử
                </p>
                <p className="text-4xl font-black text-stone-900 dark:text-stone-100 mt-2 tabular-nums">
                  {result.score}/{result.total}
                </p>
                {result.xpEarned > 0 && (
                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1.5">
                    +{result.xpEarned} XP
                  </p>
                )}
              </div>

              <div className="mt-3 space-y-2.5 max-h-[45vh] overflow-y-auto pr-1">
                {questions.map((question, i) => {
                  const correct = picks[i] === question.correct;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40"
                    >
                      <div className="flex items-start gap-2">
                        {correct ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                          {question.question}
                        </p>
                      </div>
                      <p className="mt-2 text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        <strong className="text-stone-900 dark:text-stone-200">Cách trả lời tốt: </strong>
                        {question.explanation || question.options[question.correct]}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <button
                  onClick={() => void load()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-black cursor-pointer"
                >
                  Phỏng vấn lại
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-black cursor-pointer"
                >
                  Xong
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(body, document.body);
}
