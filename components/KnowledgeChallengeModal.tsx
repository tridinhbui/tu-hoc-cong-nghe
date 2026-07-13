"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { X, CheckCircle2 } from "lucide-react";
import type { ChallengeQuestion } from "@/app/api/knowledge-challenge/route";
import { recordChallengePass } from "@/lib/supabase-challenges";

interface KnowledgeChallengeModalProps {
  onClose: () => void;
  /** Gate mode: unlocks this specific lesson on a passing score instead of
   *  just being a free-standing review quiz. */
  gate?: { lessonId: number; lessonSlug: string; lessonTitle: string; userId: string };
  onPassed?: () => void;
}

type LoadState = "loading" | "empty" | "ready" | "error";

// Passing bar for gate mode - 60% keeps it a genuine check without requiring
// a perfect score on questions pulled from lessons studied a while ago.
const PASS_RATIO = 0.6;

export default function KnowledgeChallengeModal({ onClose, gate, onPassed }: KnowledgeChallengeModalProps) {
  const [state, setState] = useState<LoadState>("loading");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [passRecorded, setPassRecorded] = useState(false);

  const loadChallenge = useCallback(async () => {
    setState("loading");
    setActiveQ(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setPassRecorded(false);
    try {
      const res = await fetch("/api/knowledge-challenge");
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        setState("empty");
        return;
      }
      setQuestions(data.questions);
      setResults(new Array(data.questions.length).fill(false));
      setState("ready");
    } catch (error) {
      console.error("Error loading knowledge challenge:", error);
      setState("error");
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadChallenge);
  }, [loadChallenge]);

  const q = questions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);

  function choose(oi: number) {
    if (submitted) return;
    setSelected(oi);
  }

  function verify() {
    if (selected === null) return;
    const ok = selected === q.correct;
    setResults((r) => {
      const n = [...r];
      n[activeQ] = ok;
      return n;
    });
    setSubmitted(true);
  }

  function next() {
    if (activeQ === questions.length - 1) {
      if (gate && passed && !passRecorded) {
        setPassRecorded(true);
        recordChallengePass(gate.userId, gate.lessonId, score, questions.length).catch((error) => {
          console.error("Error recording challenge pass:", error);
        });
      }
      setActiveQ((i) => i + 1);
      return;
    }
    setActiveQ((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="font-extrabold text-stone-900 dark:text-stone-100">
              {gate ? "🔒 Vượt qua thử thách để mở khoá" : "🎯 Thử thách kiến thức"}
            </h2>
            {gate && (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Cần đúng tối thiểu {Math.ceil((questions.length || 5) * PASS_RATIO)}/{questions.length || 5} câu để mở "{gate.lessonTitle}"
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer" title="Đóng">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {state === "loading" && (
            <p className="text-center text-stone-500 dark:text-stone-400 py-8">Đang chuẩn bị câu hỏi...</p>
          )}

          {state === "error" && (
            <p className="text-center text-stone-500 dark:text-stone-400 py-8">
              Không thể tải thử thách lúc này. Vui lòng thử lại sau.
            </p>
          )}

          {state === "empty" && (
            <p className="text-center text-stone-500 dark:text-stone-400 py-8">
              Hãy hoàn thành thêm vài bài học để mở khoá thử thách ôn tập kiến thức nhé!
            </p>
          )}

          {state === "ready" && !allDone && q && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                  Câu {activeQ + 1} / {questions.length}
                </span>
                <span className="text-xs text-stone-400 dark:text-stone-500 truncate max-w-[60%]">
                  {q.lessonTitle}
                </span>
              </div>

              <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-relaxed">{q.question}</p>

              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isCorrectOpt = oi === q.correct;
                  let cls = "border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600";
                  if (submitted) {
                    if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400 font-semibold";
                    else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400 font-semibold";
                    else cls = "border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400";
                  } else if (isSelected) {
                    cls = "border-2 border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold";
                  }
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => choose(oi)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer text-sm ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`rounded-xl p-4 text-sm leading-relaxed border ${results[activeQ] ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"}`}>
                  <p className="font-bold mb-1">{results[activeQ] ? "Chính xác!" : "Giải thích:"}</p>
                  <p>{q.explanation}</p>
                </div>
              )}

              {!submitted ? (
                <button
                  disabled={selected === null}
                  onClick={verify}
                  className={`w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide text-white cursor-pointer flex items-center justify-center gap-2 ${selected !== null ? "bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90" : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"}`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Kiểm tra đáp án
                </button>
              ) : activeQ < questions.length - 1 ? (
                <button onClick={next} className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                  Câu tiếp theo →
                </button>
              ) : (
                <button onClick={next} className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                  Xem kết quả →
                </button>
              )}
            </div>
          )}

          {state === "ready" && allDone && (
            <div className="text-center space-y-4">
              <div className="text-5xl">{gate ? (passed ? "🔓" : "🔒") : score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">
                  {gate ? (passed ? "Đã mở khoá!" : "Chưa đạt yêu cầu") : "Hoàn thành thử thách!"}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{score}/{questions.length} câu đúng</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {results.map((ok, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full text-xs flex items-center justify-center text-white font-bold ${ok ? "bg-emerald-500" : "bg-rose-400"}`}>
                    {ok ? "✓" : "✗"}
                  </div>
                ))}
              </div>
              {questions.some((_, i) => !results[i]) && (
                <div className="text-left bg-stone-50 dark:bg-stone-800 rounded-xl p-4 space-y-1.5">
                  <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">Ôn lại các bài có câu sai</p>
                  {Array.from(new Set(questions.filter((_, i) => !results[i]).map((qq) => qq.lessonId))).map((lessonId) => {
                    const lq = questions.find((qq) => qq.lessonId === lessonId)!;
                    return (
                      <Link key={lessonId} href={`/bai-hoc/${lq.lessonSlug}`} className="block text-sm text-stone-700 dark:text-stone-300 hover:underline">
                        → {lq.lessonTitle}
                      </Link>
                    );
                  })}
                </div>
              )}
              {gate && passed ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={onClose} className="py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer">
                    Để sau
                  </button>
                  <button onClick={onPassed} className="py-3 rounded-xl text-white text-sm font-bold bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                    Vào bài học →
                  </button>
                </div>
              ) : gate && !passed ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={onClose} className="py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer">
                    Đóng
                  </button>
                  <button onClick={loadChallenge} className="py-3 rounded-xl text-white text-sm font-bold bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                    Thử lại
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={onClose} className="py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer">
                    Đóng
                  </button>
                  <button onClick={loadChallenge} className="py-3 rounded-xl text-white text-sm font-bold bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                    Thử thách mới
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
