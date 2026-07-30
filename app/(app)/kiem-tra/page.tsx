"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BriefcaseBusiness, CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { submitQuizSession, computeQuizXp, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import TaiTaiQuizSuggestion from "@/components/TaiTaiQuizSuggestion";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";

interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
}

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

  const [isNewsAnswered, setIsNewsAnswered] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, [supabase]);

  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const key = userId ? `news_quiz_answered_${userId}_${todayKey}` : `news_quiz_answered_guest_${todayKey}`;
    const checkAnswered = () => {
      setIsNewsAnswered(typeof window !== "undefined" && Boolean(localStorage.getItem(key)));
    };
    checkAnswered();
    window.addEventListener("thtcdn:daily-news-quiz-answered", checkAnswered);
    return () => window.removeEventListener("thtcdn:daily-news-quiz-answered", checkAnswered);
  }, [userId]);

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
  const progressPct = questions.length > 0 ? Math.round(((activeQ + (submitted ? 1 : 0)) / questions.length) * 100) : 0;

  function startSelectedQuiz(nextTrack: QuizTrack, nextDifficulty: QuizDifficulty = difficulty) {
    setTrack(nextTrack);
    setDifficulty(nextDifficulty);
    void startQuiz(nextTrack, nextDifficulty);
  }

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
    <div className="h-dvh overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950">
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Về Dashboard"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Kiểm tra kiến thức</h1>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                Thử thách tin tức vĩ mô hôm nay & tạo bài kiểm tra tự chọn
              </p>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Thưởng +{XP_PER_QUESTION} XP / câu đúng</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {stage === "setup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
            {/* 📰 LEFT COLUMN: Daily Financial News Quiz */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className="rounded-3xl border border-rose-200/90 dark:border-rose-900/60 bg-gradient-to-b from-rose-50/80 via-white to-amber-50/40 dark:from-rose-950/40 dark:via-stone-900 dark:to-stone-950 p-3.5 sm:p-4 shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 pb-2 border-b border-rose-100 dark:border-rose-900/40">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>Bên Trái • Tin tức tài chính hôm nay</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-black text-stone-900 dark:text-stone-100">
                        Thử Thách Bài Kiểm Tra Tin Tức Hằng Ngày
                      </h3>
                    </div>
                    {isNewsAnswered ? (
                      <span className="shrink-0 text-xs font-extrabold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Đã hoàn thành (Menu sạch warning)
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs font-extrabold px-3 py-1.5 rounded-full bg-rose-500 text-white animate-pulse shadow-2xs flex items-center gap-1">
                        <span>⚠️ Chưa làm</span>
                        <span className="text-[10px] opacity-90">(Menu có cảnh báo)</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-2.5 leading-snug">
                    Trả lời chính xác tình huống tin tức vĩ mô hôm nay để nhận <strong>+15 XP</strong> và giải tỏa biểu tượng cảnh báo 🔴 trên Navbar.
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <DailyNewsQuizWidget userId={userId || "guest"} compact={false} />
                </div>
              </div>
            </div>

            {/* 🎯 RIGHT COLUMN: Enhanced Test Creation Form */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-3.5 sm:p-4 shadow-md space-y-3 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Bên Phải • Tạo bài kiểm tra tự chọn</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-black text-stone-900 dark:text-stone-100">
                      Tùy Chỉnh & Bắt Đầu Kiểm Tra
                    </h3>
                  </div>
                </div>

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

                {/* Track Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    1. Chọn phần kiến thức
                  </label>
                  <div className="space-y-1.5">
                    {TRACKS.map((t) => {
                      const selected = track === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTrack(t.id)}
                          className={`w-full text-left rounded-2xl border-2 p-2.5 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                            selected
                              ? "border-emerald-500 bg-gradient-to-r from-emerald-50/90 to-teal-50/40 dark:from-emerald-950/60 dark:to-stone-900 ring-2 ring-emerald-400/30 text-stone-900 dark:text-stone-100 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-sm flex items-center gap-2">
                              <span>{t.label}</span>
                              {selected && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-white">
                                  Đang chọn
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] mt-0.5 text-stone-500 dark:text-stone-400 leading-snug">{t.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    2. Chọn độ khó
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {DIFFICULTIES.map((d) => {
                      const selected = difficulty === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDifficulty(d.id)}
                          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-extrabold transition-all cursor-pointer text-center ${
                            selected
                              ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40"
                          }`}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* XP Reward hint */}
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/80 dark:bg-emerald-950/40 p-2.5 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Mỗi câu đúng thưởng <strong>+{XP_PER_QUESTION} XP</strong> cộng ngay vào tài khoản!
                  </p>
                </div>

                {/* Start Action Button */}
                <button
                  onClick={() => startSelectedQuiz(track, difficulty)}
                  className="w-full py-2.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🚀 Bắt Đầu Kiểm Tra Ngay</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <Link
              href="/phong-van-ky-thuat"
              className="lg:col-span-12 group rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-300 dark:hover:border-amber-800 transition-colors overflow-hidden shadow-sm flex items-center justify-between gap-4 p-3 sm:p-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                    Investment Banking Interview Drill
                  </p>
                  <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">Technical Interview</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">400 IB Questions · Accounting, Valuation, DCF, M&A, LBO, behavioral</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-black text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                Mở →
              </span>
            </Link>
          </div>
        )}

        {/* Quiz Execution Views (Center aligned max-w-2xl) */}
        {stage !== "setup" && (
          <div className="max-w-2xl mx-auto">
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
          </div>
        )}

        {stage === "ready" && q && (
          <div className="mx-auto max-w-2xl space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  Câu {activeQ + 1} / {questions.length}
                </span>
                <span className="text-xs truncate max-w-[60%] text-stone-400 dark:text-stone-500">{q.lessonTitle}</span>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-emerald-500"
                  style={{ width: `${Math.max(6, progressPct)}%` }}
                />
              </div>
            </div>

            <p className="font-bold text-lg leading-relaxed select-text text-stone-900 dark:text-stone-100">{q.question}</p>

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
                className={`w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 ${
                  selected !== null
                    ? "bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white hover:opacity-90"
                    : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Kiểm tra đáp án
              </button>
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90">
                {allDone ? "Xem kết quả →" : "Câu tiếp theo →"}
              </button>
            )}
          </div>
        )}

        {stage === "done" && (
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Hoàn thành bài kiểm tra!</h3>
              <p className="text-sm mt-1 text-stone-500 dark:text-stone-400">
                {score}/{questions.length} câu đúng {passed ? "· Đạt" : ""}
              </p>
            </div>

            <div className="rounded-2xl border-2 p-5 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-emerald-700 dark:text-emerald-400">XP nhận được</p>
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
              <div className="text-left rounded-xl p-4 space-y-1.5 bg-stone-50 dark:bg-stone-800">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                  Ôn lại các bài có câu sai
                </p>
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
              <Link href="/dashboard" className="py-3 rounded-xl border text-sm font-bold text-center border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800">
                Về Dashboard
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900">
                Kiểm tra mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
