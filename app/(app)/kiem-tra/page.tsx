"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { ChallengeQuestion } from "@/app/api/knowledge-challenge/route";
import { submitQuizSession, computeQuizXp, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import TaiTaiQuizSuggestion from "@/components/TaiTaiQuizSuggestion";

const TRACKS: { id: QuizTrack; label: string; desc: string }[] = [
  { id: "personal", label: "Tài chính cá nhân", desc: "Tư duy tiền bạc, đầu tư, danh mục, hưu trí" },
  { id: "professional", label: "Tài chính chuyên ngành", desc: "Kế toán, định giá, trái phiếu, phái sinh" },
  { id: "cfa", label: "Tài chính chứng chỉ", desc: "CFA Level I - 10 môn thi chính thức" },
];

const DIFFICULTIES: { id: QuizDifficulty; label: string }[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "de", label: "Dễ" },
  { id: "trung-binh", label: "Trung bình" },
  { id: "kho", label: "Khó" },
];

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

export default function KiemTraPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [track, setTrack] = useState<QuizTrack>("personal");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("tat-ca");
  const [stage, setStage] = useState<Stage>("setup");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<QuizAnswerSubmission[]>([]);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, [supabase]);

  // Accepts explicit overrides so callers (like TaiTai's suggestion card,
  // which sets track/difficulty and starts the quiz in the same click) don't
  // race the setTrack/setDifficulty state updates - relying on the `track`/
  // `difficulty` closures here would still read the PREVIOUS render's values.
  const startQuiz = useCallback(async (overrideTrack?: QuizTrack, overrideDifficulty?: QuizDifficulty) => {
    const effectiveTrack = overrideTrack ?? track;
    const effectiveDifficulty = overrideDifficulty ?? difficulty;
    setStage("loading");
    setActiveQ(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setAnswers([]);
    setXpAwarded(null);
    try {
      const res = await fetch(`/api/knowledge-challenge?track=${effectiveTrack}&difficulty=${effectiveDifficulty}`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        setStage("empty");
        return;
      }
      setQuestions(data.questions);
      setResults(new Array(data.questions.length).fill(false));
      setStage("ready");
    } catch (error) {
      console.error("Error loading kiểm tra:", error);
      setStage("error");
    }
  }, [track, difficulty]);

  const q = questions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);

  async function finalizeQuiz() {
    if (!userId || recording || xpAwarded !== null) return;
    setRecording(true);
    try {
      // Server re-derives score/XP from the signed tokens collected below -
      // it never trusts the client's own `score` tally for what gets
      // written to the database (see lib/quiz-tokens.ts).
      const result = await submitQuizSession(track, difficulty, answers);
      await recalculateUserStats(userId);
      setXpAwarded(result.xpEarned);
    } catch (error) {
      console.error("Error recording quiz session:", error);
      setXpAwarded(computeQuizXp(score, questions.length)); // optimistic fallback so the UI still shows a reward - nothing is persisted if this branch runs
    } finally {
      setRecording(false);
    }
  }

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
    setAnswers((a) => [...a, { token: q.token, selected }]);
    setSubmitted(true);
  }

  function next() {
    if (activeQ === questions.length - 1) {
      setStage("done");
      void finalizeQuiz();
      return;
    }
    setActiveQ((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Về Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Kiểm tra kiến thức</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Tự chọn track và độ khó, ôn lại bất cứ lúc nào</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {stage === "setup" && (
          <div className="space-y-6">
            {userId && (
              <TaiTaiQuizSuggestion
                userId={userId}
                onSelect={(t, d) => {
                  setTrack(t);
                  setDifficulty(d);
                  void startQuiz(t, d);
                }}
              />
            )}

            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Mỗi câu đúng được thưởng <strong>{XP_PER_QUESTION} XP</strong> - hoàn thành bài kiểm tra là XP được cộng ngay vào tài khoản của bạn.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">Chọn phần</p>
              <div className="space-y-2">
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrack(t.id)}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all cursor-pointer ${
                      track === t.id
                        ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600"
                    }`}
                  >
                    <div className="font-bold text-sm">{t.label}</div>
                    <div className={`text-xs mt-0.5 ${track === t.id ? "text-stone-300 dark:text-stone-600" : "text-stone-500 dark:text-stone-400"}`}>
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">Độ khó</p>
              <div className="grid grid-cols-4 gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`rounded-xl border-2 px-2 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      difficulty === d.id
                        ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-600"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => void startQuiz()}
              className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer"
            >
              Bắt đầu kiểm tra →
            </button>
          </div>
        )}

        {stage === "loading" && <p className="text-center text-stone-500 dark:text-stone-400 py-16">Đang chuẩn bị câu hỏi...</p>}

        {stage === "error" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Không thể tải bài kiểm tra lúc này. Vui lòng thử lại sau.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại chọn track
            </button>
          </div>
        )}

        {stage === "empty" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Chưa có câu hỏi nào cho lựa chọn này. Thử track hoặc độ khó khác nhé.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại chọn track
            </button>
          </div>
        )}

        {stage === "ready" && q && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                Câu {activeQ + 1} / {questions.length}
              </span>
              <span className="text-xs text-stone-400 dark:text-stone-500 truncate max-w-[60%]">{q.lessonTitle}</span>
            </div>

            <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-relaxed select-text">{q.question}</p>

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
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer text-sm select-text ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`rounded-xl p-4 text-sm leading-relaxed border ${results[activeQ] ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"}`}>
                <p className="font-bold mb-1">{results[activeQ] ? `Chính xác! +${XP_PER_QUESTION} XP` : "Giải thích:"}</p>
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
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                {allDone ? "Xem kết quả →" : "Câu tiếp theo →"}
              </button>
            )}
          </div>
        )}

        {stage === "done" && (
          <div className="text-center space-y-5">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">Hoàn thành bài kiểm tra!</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{score}/{questions.length} câu đúng {passed ? "· Đạt" : ""}</p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-5">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">XP nhận được</p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {xpAwarded === null ? "..." : `+${xpAwarded} XP`}
              </p>
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

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/dashboard" className="py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 text-center">
                Về Dashboard
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-white text-sm font-bold bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer">
                Kiểm tra mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
