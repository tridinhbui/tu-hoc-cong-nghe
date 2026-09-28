"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, Dumbbell, PartyPopper, Sparkles, Trophy } from "lucide-react";
import { submitQuizSession, computeQuizXp, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/cloudflare-quiz-sessions";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import TaiTaiQuizSuggestion from "@/components/TaiTaiQuizSuggestion";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";
import { getCurrentUserId } from "@/lib/current-user";
import { SectionHead, Sys, StatusDot, StatTable, panel, tabClass, btnPrimary, btnSecondary, textLink } from "@/components/ui/system";

/** Mã định vị mono ở đầu trang: chính đường dẫn của route, không phải nhãn dịch. */
const ROUTE_CODE = "THCN://APP/KIEM-TRA";

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
const TRACK_IDS: QuizTrack[] = ["personal", "professional"];
const DIFFICULTY_IDS: QuizDifficulty[] = ["tat-ca", "de", "trung-binh", "kho"];

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

export default function KiemTraPage() {
  const { t } = useI18n();
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
    void getCurrentUserId().then(setUserId);
  }, []);

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
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-surface">
      <div className="shrink-0 border-b border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex shrink-0 items-center justify-center w-8 h-8 rounded-sm border border-stone-300 text-ink-muted transition-colors hover:border-stone-950 hover:text-ink dark:border-stone-700 dark:hover:border-stone-300"
              aria-label={t.quizPage.backAria}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <Sys className="text-ink-muted">{ROUTE_CODE}</Sys>
              <h1 className="text-lg font-black leading-tight text-ink-max tracking-tight">{t.quizPage.title}</h1>
              <p className="hidden sm:block truncate text-xs font-semibold text-ink-muted mt-0.5">
                {t.quizPage.subtitle}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-accent-strong">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{format(t.quizPage.xpPerQuestion, { xp: XP_PER_QUESTION })}</span>
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {stage === "setup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className={`${panel} p-3.5 sm:p-4 h-full flex flex-col justify-between`}>
                <div>
                  <SectionHead eyebrow={t.quizPage.leftEyebrow} title={t.quizPage.newsTitle} size="sm" />
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold">
                    {isNewsAnswered ? (
                      <span className="inline-flex items-center gap-1.5 text-accent-strong">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.quizPage.newsDone}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-ink-body">
                        <StatusDot />
                        <span>{t.quizPage.newsPending}</span>
                        <span className="font-medium text-ink-muted">{t.quizPage.newsPendingNote}</span>
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 mb-2.5 max-w-[68ch] border-l-2 border-stone-950 pl-4 text-xs leading-6 text-ink-soft dark:border-stone-200">
                    {t.quizPage.newsBodyPart1}
                    <strong className="font-mono tabular-nums text-ink-max">{format(t.quizPage.newsXp, { xp: QUEST_XP_REWARDS.daily_news_quiz })}</strong>
                    {t.quizPage.newsBodyPart2}
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <DailyNewsQuizWidget userId={userId || "guest"} compact={false} />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Enhanced Test Creation Form */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className={`${panel} p-3.5 sm:p-4 space-y-3 h-full flex flex-col justify-between`}>
                <SectionHead eyebrow={t.quizPage.rightEyebrow} title={t.quizPage.builderTitle} size="sm" />

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
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted mb-1.5">
                    {t.quizPage.step1}
                  </label>
                  <div className="space-y-1.5">
                    {TRACK_IDS.map((id, i) => {
                      const label = id === "personal" ? t.quizPage.trackPersonal : t.quizPage.trackProfessional;
                      const desc =
                        id === "personal" ? t.quizPage.trackPersonalDesc : t.quizPage.trackProfessionalDesc;
                      const selected = track === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setTrack(id)}
                          aria-pressed={selected}
                          className={`w-full text-left rounded-sm border px-3 py-2.5 transition-colors cursor-pointer flex items-start gap-3 ${
                            selected
                              ? "border-brand-600 bg-brand-50 text-ink dark:border-brand-400 dark:bg-brand-950/40"
                              : "border-stone-300 bg-white text-ink-body hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300"
                          }`}
                        >
                          <Sys className={`pt-0.5 ${selected ? "text-accent-strong" : "text-ink-faint"}`}>{String.fromCharCode(65 + i)}</Sys>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-sm flex items-center gap-2">
                              <span>{label}</span>
                              {selected && (
                                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-accent-strong">
                                  {t.quizPage.selecting}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] mt-0.5 text-ink-muted leading-snug">{desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted mb-1.5">
                    {t.quizPage.step2}
                  </label>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line">
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
                          aria-pressed={selected}
                          className={`${tabClass(selected)} cursor-pointer`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* XP Reward hint */}
                <p className="border-l-2 border-stone-950 pl-4 text-xs font-semibold leading-6 text-ink-body dark:border-stone-200">
                  {t.quizPage.rewardPart1}
                  <strong className="font-mono tabular-nums text-accent-strong">{format(t.quizPage.rewardXp, { xp: XP_PER_QUESTION })}</strong>
                  {t.quizPage.rewardPart2}
                </p>

                {/* Start Action Button */}
                <button onClick={() => startSelectedQuiz(track, difficulty)} className={`${btnPrimary} w-full cursor-pointer`}>
                  <span>{t.quizPage.start}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thi vượt chặng từng nằm ngay đây. Nó đã có trang riêng
                (/thi-vuot-chang): đây là bàn tập, đó là phòng thi - đạt là cả
                chặng được tính hoàn thành. Dòng này ở lại đúng chỗ cũ để người
                đã quen không kết luận là tính năng đã bị gỡ. */}
            <div className="lg:col-span-12">
              <Link
                href="/thi-vuot-chang"
                className={`${panel} group flex items-center justify-between gap-3 px-4 py-3 text-ink transition-colors hover:border-stone-950 dark:hover:border-stone-300`}
              >
                <span className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-ink-muted" />
                  <span className="text-sm font-black group-hover:text-accent-strong">{t.nav.stageSkipExam}</span>
                  <span className="hidden sm:inline text-xs font-medium text-ink-muted">{t.stageSkip.pageSubtitle}</span>
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 text-accent-strong" />
              </Link>
            </div>

          </div>
        )}

        {/* Quiz Execution Views (Center aligned max-w-2xl) */}
        {stage !== "setup" && (
          <div className="max-w-2xl mx-auto">
            {stage === "loading" && <p className="text-center text-ink-muted py-16">{t.quizPage.loadingQuestions}</p>}

            {stage === "error" && (
              <div className="text-center py-16 space-y-4">
                <p className="text-ink-muted">{t.quizPage.loadFailed}</p>
                <button onClick={() => setStage("setup")} className={`${textLink} cursor-pointer`}>
                  {t.quizPage.backToTrack}
                </button>
              </div>
            )}

            {stage === "empty" && (
              <div className="text-center py-16 space-y-4">
                <p className="text-ink-muted">{t.quizPage.noQuestions}</p>
                <button onClick={() => setStage("setup")} className={`${textLink} cursor-pointer`}>
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
                <span className="text-xs font-bold tabular-nums text-ink-muted">
                  {format(t.quizPage.questionCounter, { current: activeQ + 1, total: questions.length })}
                </span>
                <span className="text-xs truncate max-w-[60%] text-ink-faint">{q.lessonTitle}</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden bg-surface-sunken">
                <div
                  className="h-full transition-all duration-500 bg-brand-600 dark:bg-brand-500"
                  style={{ width: `${Math.max(6, progressPct)}%` }}
                />
              </div>
            </div>

            <p className="font-bold text-lg leading-7 select-text text-ink-max">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                let cls = "border-stone-300 bg-white text-ink hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300";
                let gutter = "text-ink-faint";
                if (submitted) {
                  if (isCorrectOpt) {
                    cls = "border-brand-600 bg-brand-50 text-brand-800 font-semibold dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200";
                    gutter = "text-accent-strong";
                  } else if (isSelected) {
                    cls = "border-red-600 bg-red-50 text-red-800 font-semibold dark:border-red-400 dark:bg-red-950/40 dark:text-red-200";
                    gutter = "text-danger";
                  } else cls = "border-stone-200 bg-white text-ink-muted dark:border-stone-800 dark:bg-stone-900";
                } else if (isSelected) {
                  cls = "border-brand-600 bg-brand-50 text-ink-max font-semibold dark:border-brand-400 dark:bg-brand-950/40";
                  gutter = "text-accent-strong";
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => choose(oi)}
                    className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)] items-baseline text-left px-3 py-2.5 rounded-sm border transition-colors cursor-pointer text-sm leading-6 select-text ${cls}`}
                  >
                    <Sys className={gutter}>{String.fromCharCode(65 + oi)}</Sys>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`border-l-2 pl-4 text-sm leading-7 ${results[activeQ] ? "border-brand-600 text-ink-body dark:border-brand-400" : "border-red-600 text-ink-body dark:border-red-400"}`}>
                <p className={`font-bold mb-1 ${results[activeQ] ? "text-accent-strong" : "text-danger"}`}>
                  {results[activeQ] ? format(t.quizPage.correctWithXp, { xp: XP_PER_QUESTION }) : t.quizPage.explanation}
                </p>
                <p className="max-w-[68ch]">{q.explanation}</p>
              </div>
            )}

            {!submitted ? (
              <button disabled={selected === null} onClick={verify} className={`${btnPrimary} w-full py-3 cursor-pointer`}>
                <CheckCircle2 className="w-4 h-4" />
                {t.quizPage.checkAnswer}
              </button>
            ) : (
              <button onClick={next} className={`${btnPrimary} w-full py-3 cursor-pointer`}>
                {allDone ? t.quizPage.seeResults : t.quizPage.nextQuestion}
              </button>
            )}
          </div>
        )}

        {stage === "done" && (
          <div className="mx-auto max-w-2xl space-y-5">
            <div className="flex items-start gap-4">
              <span className="rounded-sm border border-stone-300 p-2.5 text-ink-body dark:border-stone-700">
                {score === questions.length ? (
                  <Trophy aria-hidden className="h-7 w-7" strokeWidth={1.5} />
                ) : score >= questions.length * 0.7 ? (
                  <PartyPopper aria-hidden className="h-7 w-7" strokeWidth={1.5} />
                ) : (
                  <Dumbbell aria-hidden className="h-7 w-7" strokeWidth={1.5} />
                )}
              </span>
              <div>
                <h3 className="font-black tracking-tight text-xl text-ink-max">{t.quizPage.doneTitle}</h3>
                <p className="text-sm mt-1 tabular-nums text-ink-muted">
                  {format(t.quizPage.doneScore, { score, total: questions.length })}
                  {passed ? <span className="font-bold text-accent-strong">{t.quizPage.donePassed}</span> : ""}
                </p>
              </div>
            </div>

            <div className={`${panel} px-4 py-2`}>
              <StatTable
                rows={[
                  {
                    label: t.quizPage.xpEarned,
                    value: (
                      <span className="text-accent-strong">
                        {xpAwarded === null ? "..." : format(t.miscUi.xpGain, { count: xpAwarded })}
                      </span>
                    ),
                  },
                ]}
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {results.map((ok, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-sm border font-mono text-xs flex items-center justify-center font-bold ${
                    ok
                      ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                      : "border-red-600 bg-red-50 text-red-800 dark:border-red-400 dark:bg-red-950/40 dark:text-red-200"
                  }`}
                >
                  {ok ? "✓" : "✗"}
                </div>
              ))}
            </div>

            {questions.some((_, i) => !results[i]) && (
              <div className="border-l-2 border-stone-950 pl-4 space-y-1.5 dark:border-stone-200">
                <p className="text-[11px] font-bold text-ink-muted uppercase tracking-[0.08em] mb-2">
                  {t.quizPage.reviewWrongLessons}
                </p>
                {Array.from(new Set(questions.filter((_, i) => !results[i]).map((qq) => qq.lessonId))).map((lessonId) => {
                  const lq = questions.find((qq) => qq.lessonId === lessonId)!;
                  return (
                    <Link key={lessonId} href={`/bai-hoc/${lq.lessonSlug}`} className={`${textLink} flex`}>
                      → {lq.lessonTitle}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/dashboard" className={btnSecondary}>
                {t.quizPage.backToDashboard}
              </Link>
              <button onClick={() => setStage("setup")} className={`${btnPrimary} cursor-pointer`}>
                {t.quizPage.newQuiz}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
