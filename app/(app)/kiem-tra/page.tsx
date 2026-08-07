"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BriefcaseBusiness, CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { submitQuizSession, computeQuizXp, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import TaiTaiQuizSuggestion from "@/components/TaiTaiQuizSuggestion";
import StageSkipExamPanel from "@/components/StageSkipExamPanel";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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

// Ids and their order only; the label and description come from the dictionary
// at render time, because module scope has no useI18n() to call.
const TRACK_IDS: QuizTrack[] = ["personal", "professional", "cfa", "frm"];
const DIFFICULTY_IDS: QuizDifficulty[] = ["tat-ca", "de", "trung-binh", "kho"];

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

export default function KiemTraPage() {
  const { t } = useI18n();
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
    // APP_MOBILE_HEADER_H: 3.5rem is AppNavbar's mobile header (h-14). It is
    // `sticky`, not `fixed`, so it occupies flow height above this page - a
    // plain h-dvh here would make the document 100dvh + 3.5rem and scroll,
    // which is exactly what pinning to one screen is meant to prevent. The
    // desktop sidebar is `fixed` and costs no height, hence lg:h-dvh.
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950">
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={t.quizPage.backAria}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">{t.quizPage.title}</h1>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                {t.quizPage.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{format(t.quizPage.xpPerQuestion, { xp: XP_PER_QUESTION })}</span>
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
                        <span>{t.quizPage.leftEyebrow}</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-black text-stone-900 dark:text-stone-100">
                        {t.quizPage.newsTitle}
                      </h3>
                    </div>
                    {isNewsAnswered ? (
                      <span className="shrink-0 text-xs font-extrabold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {t.quizPage.newsDone}
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs font-extrabold px-3 py-1.5 rounded-full bg-rose-500 text-white animate-pulse shadow-2xs flex items-center gap-1">
                        <span>{t.quizPage.newsPending}</span>
                        <span className="text-[10px] opacity-90">{t.quizPage.newsPendingNote}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-2.5 leading-snug">
                    {t.quizPage.newsBodyPart1}
                    <strong>{t.quizPage.newsXp}</strong>
                    {t.quizPage.newsBodyPart2}
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
                      <span>{t.quizPage.rightEyebrow}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-black text-stone-900 dark:text-stone-100">
                      {t.quizPage.builderTitle}
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
                    {t.quizPage.step1}
                  </label>
                  <div className="space-y-1.5">
                    {TRACK_IDS.map((id) => {
                      const label =
                        id === "personal"
                          ? t.quizPage.trackPersonal
                          : id === "professional"
                            ? t.quizPage.trackProfessional
                            : id === "cfa"
                              ? t.quizPage.trackCfa
                              : t.quizPage.trackFrm;
                      const desc =
                        id === "personal"
                          ? t.quizPage.trackPersonalDesc
                          : id === "professional"
                            ? t.quizPage.trackProfessionalDesc
                            : id === "cfa"
                              ? t.quizPage.trackCfaDesc
                              : t.quizPage.trackFrmDesc;
                      const selected = track === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setTrack(id)}
                          className={`w-full text-left rounded-2xl border-2 p-2.5 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                            selected
                              ? "border-emerald-500 bg-gradient-to-r from-emerald-50/90 to-teal-50/40 dark:from-emerald-950/60 dark:to-stone-900 ring-2 ring-emerald-400/30 text-stone-900 dark:text-stone-100 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-sm flex items-center gap-2">
                              <span>{label}</span>
                              {selected && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-white">
                                  {t.quizPage.selecting}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] mt-0.5 text-stone-500 dark:text-stone-400 leading-snug">{desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    {t.quizPage.step2}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {DIFFICULTY_IDS.map((id) => {
                      const label =
                        id === "tat-ca"
                          ? t.quizPage.diffAll
                          : id === "de"
                            ? t.quizPage.diffEasy
                            : id === "trung-binh"
                              ? t.quizPage.diffMedium
                              : t.quizPage.diffHard;
                      const selected = difficulty === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setDifficulty(id)}
                          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-extrabold transition-all cursor-pointer text-center ${
                            selected
                              ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* XP Reward hint */}
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/80 dark:bg-emerald-950/40 p-2.5 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    {t.quizPage.rewardPart1}
                    <strong>{format(t.quizPage.rewardXp, { xp: XP_PER_QUESTION })}</strong>
                    {t.quizPage.rewardPart2}
                  </p>
                </div>

                {/* Start Action Button */}
                <button
                  onClick={() => startSelectedQuiz(track, difficulty)}
                  className="w-full py-2.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.quizPage.start}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-12">
              <StageSkipExamPanel userId={userId} />
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
                    {t.quizPage.ibEyebrow}
                  </p>
                  <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">{t.quizPage.ibTitle}</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{t.quizPage.ibSub}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-black text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                {t.quizPage.ibOpen}
              </span>
            </Link>
          </div>
        )}

        {/* Quiz Execution Views (Center aligned max-w-2xl) */}
        {stage !== "setup" && (
          <div className="max-w-2xl mx-auto">
            {stage === "loading" && <p className="text-center text-stone-500 dark:text-stone-400 py-16">{t.quizPage.loadingQuestions}</p>}

            {stage === "error" && (
              <div className="text-center py-16 space-y-4">
                <p className="text-stone-500 dark:text-stone-400">{t.quizPage.loadFailed}</p>
                <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
                  {t.quizPage.backToTrack}
                </button>
              </div>
            )}

            {stage === "empty" && (
              <div className="text-center py-16 space-y-4">
                <p className="text-stone-500 dark:text-stone-400">{t.quizPage.noQuestions}</p>
                <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
                  {t.quizPage.backToTrack}
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
                  {format(t.quizPage.questionCounter, { current: activeQ + 1, total: questions.length })}
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
                <p className="font-bold mb-1">{results[activeQ] ? format(t.quizPage.correctWithXp, { xp: XP_PER_QUESTION }) : t.quizPage.explanation}</p>
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
                {t.quizPage.checkAnswer}
              </button>
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90">
                {allDone ? t.quizPage.seeResults : t.quizPage.nextQuestion}
              </button>
            )}
          </div>
        )}

        {stage === "done" && (
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t.quizPage.doneTitle}</h3>
              <p className="text-sm mt-1 text-stone-500 dark:text-stone-400">
                {format(t.quizPage.doneScore, { score, total: questions.length })}{passed ? t.quizPage.donePassed : ""}
              </p>
            </div>

            <div className="rounded-2xl border-2 p-5 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-emerald-700 dark:text-emerald-400">{t.quizPage.xpEarned}</p>
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
                  {t.quizPage.reviewWrongLessons}
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
                {t.quizPage.backToDashboard}
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900">
                {t.quizPage.newQuiz}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
