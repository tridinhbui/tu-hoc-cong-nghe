"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft, CheckCircle2, Clock3, Target, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { submitQuizSession, computeQuizXp, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getIbCategoryCounts, IB_TECHNICAL_QUESTIONS, IB_BEHAVIORAL_QUESTIONS } from "@/lib/ib-question-bank";
import BehavioralPrepPanel from "@/components/BehavioralPrepPanel";

// Standalone "Technical Interview" drill - split out of /kiem-tra (which
// stays the general-purpose knowledge-check page) because the 400-question
// IB bank is its own product surface with its own audience (interview prep,
// not daily study habit) and deserves its own nav entry rather than living
// as a card buried in a track/difficulty picker built for lesson quizzes.
//
// Unlike the old embedded version, this page follows the site's normal
// light/dark theme (bg-white dark:bg-stone-900 etc.) instead of forcing a
// permanently-dark "trading terminal" look regardless of the user's theme.

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

const IB_DIFFICULTY_COPY: Record<QuizDifficulty, string> = {
  "tat-ca": "Full mixed drill",
  de: "Foundation screen",
  "trung-binh": "Analyst round",
  kho: "Pressure round",
};

const DIFFICULTIES: { id: QuizDifficulty; label: string }[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "de", label: "Dễ" },
  { id: "trung-binh", label: "Trung bình" },
  { id: "kho", label: "Khó" },
];

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

/** Technical is a scored MCQ drill; behavioral is un-scored prep. They can't
 *  share a flow because only one of them has right answers. */
type Mode = "technical" | "behavioral";

export default function TechnicalInterviewPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("technical");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("tat-ca");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("setup");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<QuizAnswerSubmission[]>([]);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);

  // Technical only - the behavioral sections are listed by BehavioralPrepPanel
  // under its own mode, since they're a different kind of practice.
  const categoryCounts = getIbCategoryCounts(IB_TECHNICAL_QUESTIONS);
  const totalQuestions = IB_TECHNICAL_QUESTIONS.length;
  const behavioralCount = IB_BEHAVIORAL_QUESTIONS.length;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, [supabase]);

  const startQuiz = useCallback(async (overrideDifficulty?: QuizDifficulty) => {
    const effectiveDifficulty = overrideDifficulty ?? difficulty;
    setStage("loading");
    setActiveQ(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setAnswers([]);
    setXpAwarded(null);
    try {
      const res = await fetch(`/api/knowledge-challenge?track=ib&difficulty=${effectiveDifficulty}`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      let pool: ChallengeQuestion[] = data.questions || [];
      if (selectedCategory) {
        pool = pool.filter((q) => q.lessonTitle.toLowerCase().includes(selectedCategory.toLowerCase()));
      }
      if (!pool || pool.length === 0) {
        setStage("empty");
        return;
      }
      setQuestions(pool);
      setResults(new Array(pool.length).fill(false));
      setStage("ready");
    } catch (error) {
      console.error("Error loading technical interview drill:", error);
      setStage("error");
    }
  }, [difficulty, selectedCategory]);

  const q = questions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);
  const progressPct = questions.length > 0 ? Math.round(((activeQ + (submitted ? 1 : 0)) / questions.length) * 100) : 0;

  async function finalizeQuiz() {
    if (!userId || recording || xpAwarded !== null) return;
    setRecording(true);
    try {
      const result = await submitQuizSession("ib", difficulty, answers);
      await recalculateUserStats(userId);
      setXpAwarded(result.xpEarned);
    } catch (error) {
      console.error("Error recording quiz session:", error);
      setXpAwarded(computeQuizXp(score, questions.length));
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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pb-16">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Về Dashboard"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
                <BriefcaseBusiness className="w-6 h-6 text-amber-500" />
                Technical Interview
              </h1>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                Luyện technical + behavioral như một vòng phỏng vấn analyst thật
              </p>
            </div>
          </div>
          {mode === "technical" && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
              <span>Thưởng +{XP_PER_QUESTION} XP / câu đúng</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mode switch. Hidden mid-drill so a half-finished scored run can't be
            abandoned by an accidental tab click. */}
        {(stage === "setup" || mode === "behavioral") && (
          <div className="mb-6 inline-flex p-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
            <button
              onClick={() => setMode("technical")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                mode === "technical"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Technical · {totalQuestions} câu
            </button>
            <button
              onClick={() => setMode("behavioral")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                mode === "behavioral"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Behavioral · {behavioralCount} câu
            </button>
          </div>
        )}

        {mode === "behavioral" && <BehavioralPrepPanel />}

        {mode === "technical" && stage === "setup" && (
          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    Investment Banking Interview Drill
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                    Luyện technical interview như một vòng analyst thật
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-stone-600 dark:text-stone-300">
                    Bộ {totalQuestions} IB Questions trải khắp {categoryCounts.length} section: Accounting, Valuation, DCF, M&A, LBO và behavioral logic. Mỗi lượt là một mini interview, có chấm điểm và giải thích ngay.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {[
                      { icon: Target, label: "Question bank", value: `${totalQuestions} câu` },
                      { icon: Clock3, label: "Mỗi lượt", value: "3-5 phút" },
                      { icon: Trophy, label: "Thưởng", value: "+XP" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-3 py-3">
                          <Icon className="h-4 w-4 text-amber-500" />
                          <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{item.label}</p>
                          <p className="mt-0.5 text-sm font-black text-stone-900 dark:text-stone-100">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* The actual section breakdown - what "400 IB Questions" is
                      really made of, so a learner can see coverage instead of
                      a single opaque number. */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                        Luyện theo từng chủ đề chuyên sâu
                      </p>
                      {selectedCategory && (
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          Xóa bộ lọc (Hiện tất cả)
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryCounts.map((c) => {
                        const isCatSelected = selectedCategory === c.label;
                        return (
                          <button
                            key={c.label}
                            type="button"
                            onClick={() => setSelectedCategory(isCatSelected ? null : c.label)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                              isCatSelected
                                ? "border-amber-500 bg-amber-400 text-stone-950 shadow-xs font-black"
                                : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700"
                            }`}
                          >
                            {c.label}
                            <span className={isCatSelected ? "text-stone-950 font-extrabold" : "text-stone-400 dark:text-stone-500"}>· {c.count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-5 sm:p-6 lg:p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Chọn vòng phỏng vấn</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {DIFFICULTIES.map((d) => {
                      const selected = difficulty === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDifficulty(d.id)}
                          className={`rounded-2xl border-2 px-3 py-3 text-left transition-all cursor-pointer ${
                            selected
                              ? "border-amber-400 bg-amber-400 text-stone-950 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700"
                          }`}
                        >
                          <span className="block text-xs font-black">{d.label}</span>
                          <span className={`mt-1 block text-[10px] font-bold ${selected ? "text-stone-800" : "text-stone-400 dark:text-stone-500"}`}>
                            {IB_DIFFICULTY_COPY[d.id]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => void startQuiz(difficulty)}
                    className="mt-4 w-full rounded-2xl bg-amber-400 hover:bg-amber-300 px-4 py-4 text-sm font-black uppercase tracking-wider text-stone-950 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Bắt đầu IB drill →
                  </button>
                  <p className="mt-3 text-[11px] font-semibold leading-relaxed text-stone-500 dark:text-stone-400">
                    Gợi ý: dùng "Trung bình" cho mock analyst round, dùng "Khó" khi muốn luyện áp lực trước interview.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {mode === "technical" && stage === "loading" && <p className="text-center text-stone-500 dark:text-stone-400 py-16">Đang chuẩn bị câu hỏi...</p>}

        {mode === "technical" && stage === "error" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Không thể tải bài kiểm tra lúc này. Vui lòng thử lại sau.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại
            </button>
          </div>
        )}

        {mode === "technical" && stage === "empty" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Chưa có câu hỏi nào cho độ khó này. Thử độ khó khác nhé.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại
            </button>
          </div>
        )}

        {mode === "technical" && stage === "ready" && q && (
          <div className="mx-auto max-w-4xl space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-6 shadow-sm">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  IB Interview Drill
                </span>
                <span className="text-xs truncate max-w-[60%] text-stone-500 dark:text-stone-400">{q.lessonTitle}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Câu hỏi</p>
                  <p className="text-sm font-black text-stone-900 dark:text-stone-100">{activeQ + 1}/{questions.length}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Đúng</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{score}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Round</p>
                  <p className="text-sm font-black text-amber-600 dark:text-amber-400">{IB_DIFFICULTY_COPY[difficulty]}</p>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-amber-400"
                  style={{ width: `${Math.max(6, progressPct)}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4 sm:p-5">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                Interviewer asks
              </p>
              <p className="font-bold text-lg leading-relaxed select-text text-stone-900 dark:text-stone-100">{q.question}</p>
            </div>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                let cls = "border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-amber-300 dark:hover:border-amber-800";
                if (submitted) {
                  if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400 font-semibold";
                  else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400 font-semibold";
                  else cls = "border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-400 dark:text-stone-500";
                } else if (isSelected) {
                  cls = "border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-stone-900 dark:text-amber-200 font-semibold";
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
                <p className="font-bold mb-1">{results[activeQ] ? `Good answer. +${XP_PER_QUESTION} XP` : "Giải thích:"}</p>
                <p>{q.explanation}</p>
              </div>
            )}

            {!submitted ? (
              <button
                disabled={selected === null}
                onClick={verify}
                className={`w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 ${
                  selected !== null
                    ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                    : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Chốt câu trả lời
              </button>
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90">
                {allDone ? "Xem kết quả →" : "Câu tiếp theo →"}
              </button>
            )}
          </div>
        )}

        {mode === "technical" && stage === "done" && (
          <div className="mx-auto max-w-3xl text-center space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 shadow-sm">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Hoàn thành IB interview drill!</h3>
              <p className="text-sm mt-1 text-stone-500 dark:text-stone-400">
                {score}/{questions.length} câu đúng {passed ? "· Đạt" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Interview readiness</p>
                <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">{Math.round((score / Math.max(1, questions.length)) * 100)}%</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Round</p>
                <p className="mt-1 text-sm font-black text-stone-900 dark:text-stone-100">{IB_DIFFICULTY_COPY[difficulty]}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Next action</p>
                <p className="mt-1 text-sm font-black text-emerald-600 dark:text-emerald-400">{passed ? "Lên độ khó" : "Ôn câu sai"}</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-amber-700 dark:text-amber-400">XP nhận được</p>
              <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400">
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
              <div className="text-left rounded-xl p-4 space-y-1.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                  Deal notes cần ôn lại
                </p>
                {Array.from(new Set(questions.filter((_, i) => !results[i]).map((qq) => qq.lessonId))).map((lessonId) => {
                  const lq = questions.find((qq) => qq.lessonId === lessonId)!;
                  return (
                    <p key={lessonId} className="block text-sm text-stone-700 dark:text-stone-300">
                      → {lq.lessonTitle}
                    </p>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/dashboard" className="py-3 rounded-xl border text-sm font-bold text-center border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800">
                Về Dashboard
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer bg-amber-400 text-stone-950">
                Drill mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
