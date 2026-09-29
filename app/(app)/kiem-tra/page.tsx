"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, ChevronLeft, RotateCcw, Trophy, X } from "lucide-react";
import { submitQuizSession, computeQuizXp, QUIZ_XP_PER_CORRECT, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/cloudflare-quiz-sessions";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import CoCoQuizSuggestion from "@/components/CoCoQuizSuggestion";
import CoCoSays from "@/components/CoCoSays";
import CoCoFeedback from "@/components/CoCoFeedback";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { useQuizKeys } from "@/lib/use-quiz-keys";
import { getCurrentUserId } from "@/lib/current-user";
import { Sys, StatusDot, panel, btnPrimary, btnSecondary, textLink } from "@/components/ui/system";

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

  /** XP mỗi câu đúng đọc từ bảng của lib/cloudflare-quiz-sessions, không viết
   *  cứng: con số trên màn hình phải là con số máy chủ sẽ cộng. */
  const xpPerQuestion = QUIZ_XP_PER_CORRECT[difficulty];
  const trackLabel = (id: QuizTrack) => (id === "personal" ? t.quizPage.trackPersonal : t.quizPage.trackProfessional);
  const difficultyLabel = (id: QuizDifficulty) =>
    id === "tat-ca" ? t.quizPage.diffAll : id === "de" ? t.quizPage.diffEasy : id === "trung-binh" ? t.quizPage.diffMedium : t.quizPage.diffHard;

  const q = questions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);
  const passNeed = Math.ceil(questions.length * PASS_RATIO);
  const answeredSoFar = activeQ + (submitted ? 1 : 0);
  const correctSoFar = results.slice(0, answeredSoFar).filter(Boolean).length;
  const wrongLessons = useMemo(
    () =>
      Array.from(new Set(questions.filter((_, i) => !results[i]).map((qq) => qq.lessonId))).map(
        (lessonId) => questions.find((qq) => qq.lessonId === lessonId)!
      ),
    [questions, results]
  );

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

  // 1-4 chọn, Enter kiểm tra rồi đi tiếp - cùng hook mà phòng thi vượt chặng
  // dùng. Gọi trước `return` để thứ tự hook không đổi.
  useQuizKeys({
    optionCount: q?.options.length ?? 0,
    enabled: stage === "ready" && !!q,
    onPick: choose,
    onEnter: () => (submitted ? next() : verify()),
  });

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

  const letter = (i: number) => String.fromCharCode(65 + i);

  return (
    // APP_MOBILE_HEADER_H: 3.5rem is AppNavbar's mobile header (h-14). It is
    // `sticky`, not `fixed`, so it occupies flow height above this page - a
    // plain h-dvh here would make the document 100dvh + 3.5rem and scroll,
    // which is exactly what pinning to one screen is meant to prevent. The
    // desktop sidebar is `fixed` and costs no height, hence lg:h-dvh.
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-surface">
      <div className="shrink-0 border-b border-stone-300 bg-surface-raised dark:border-stone-700 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex shrink-0 items-center justify-center w-8 h-8 rounded-sm border border-line-strong text-ink-muted transition-colors hover:border-stone-400 hover:text-ink dark:border-stone-700 dark:hover:border-stone-600"
              aria-label={t.quizPage.backAria}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <Sys className="text-ink-muted">{ROUTE_CODE}</Sys>
              <h1 className="text-lg font-black leading-tight text-ink-max tracking-tight">{t.quizPage.title}</h1>
            </div>
          </div>

          {/* Trạng thái hằng ngày đứng ở thanh đầu, thấy được cả khi đang ở
              giữa một phiên luyện - lúc đó cột DAILY SIGNAL không còn trên màn. */}
          <div className="flex shrink-0 items-center gap-2 text-xs font-bold">
            <Sys className="hidden sm:inline text-ink-faint">{t.revampQuiz.todayLabel}</Sys>
            {isNewsAnswered ? (
              <span className="inline-flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
                {t.revampQuiz.todaySignalDone}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-ink-body">
                <StatusDot />
                {t.revampQuiz.todaySignalPending}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {stage === "setup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
            {/* TRÁI: DAILY SIGNAL - thử thách công nghệ của hôm nay. */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className={`${panel} p-4 sm:p-5 h-full flex flex-col`}>
                <DailyNewsQuizWidget userId={userId || "guest"} variant="signal" />
              </div>
            </div>

            {/* PHẢI: TRAINING LAB - chọn mảng + độ khó rồi chạy một phiên. */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <div className={`${panel} p-4 sm:p-5 h-full flex flex-col gap-4`}>
                <div>
                  <Sys className="text-accent-strong">{t.revampQuiz.labName}</Sys>
                  <CoCoSays lines={t.coco.kiemTra} size={40} className="mt-2" />
                </div>

                {userId && (
                  <CoCoQuizSuggestion
                    userId={userId}
                    onSelect={(nextTrack, nextDifficulty) => {
                      setTrack(nextTrack);
                      setDifficulty(nextDifficulty);
                      void startQuiz(nextTrack, nextDifficulty);
                    }}
                  />
                )}

                {/* Mảng kiến thức: hai ô cạnh nhau, ô đang chọn có viền xanh
                    dày và dấu tích - quét bằng mắt là biết, không phải đọc. */}
                <div>
                  <Sys className="text-ink-muted">{t.revampQuiz.labAreaLabel}</Sys>
                  <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label={t.revampQuiz.labAreaLabel}>
                    {TRACK_IDS.map((id, i) => {
                      const desc = id === "personal" ? t.quizPage.trackPersonalDesc : t.quizPage.trackProfessionalDesc;
                      const on = track === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          onClick={() => setTrack(id)}
                          aria-checked={on}
                          className={`relative text-left px-3 py-2.5 transition-colors cursor-pointer ${
                            on
                              ? "border-2 border-brand-600 bg-brand-50/60 dark:border-brand-400 dark:bg-brand-950/30"
                              : "border-2 border-transparent bg-surface-raised hover:border-line-strong dark:bg-stone-900"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <Sys className={on ? "text-accent-strong" : "text-ink-faint"}>{letter(i)}</Sys>
                            {on && <Check className="h-3.5 w-3.5 text-accent-strong" aria-hidden />}
                          </div>
                          <p className={`mt-1 text-sm font-black leading-tight ${on ? "text-ink-max" : "text-ink-body"}`}>{trackLabel(id)}</p>
                          <p className="mt-0.5 text-[11px] leading-snug text-ink-muted">{desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Độ khó: một thanh bốn nấc liền nhau, nấc đang chọn tô đặc. */}
                <div>
                  <Sys className="text-ink-muted">{t.revampQuiz.labDifficultyLabel}</Sys>
                  <div
                    className="mt-1.5 grid grid-cols-4 border border-line-strong dark:border-stone-700"
                    role="radiogroup"
                    aria-label={t.revampQuiz.labDifficultyLabel}
                  >
                    {DIFFICULTY_IDS.map((id, i) => {
                      const on = difficulty === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          onClick={() => setDifficulty(id)}
                          aria-checked={on}
                          className={`py-2 text-xs font-bold transition-colors cursor-pointer ${i > 0 ? "border-l border-line-strong dark:border-stone-700" : ""} ${
                            on
                              ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-stone-950"
                              : "text-ink-muted hover:bg-surface-raised hover:text-ink dark:hover:bg-stone-800"
                          }`}
                        >
                          {difficultyLabel(id)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cấu hình phiên đọc lại thành một dòng, cùng phần thưởng. */}
                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line pt-3">
                    <p className="min-w-0 text-xs text-ink-muted">
                      <Sys className="mr-2 text-ink-faint">{t.revampQuiz.labSpecLabel}</Sys>
                      <span className="font-bold text-ink-max">{trackLabel(track)}</span>
                      <span aria-hidden className="mx-1.5 inline-block h-1 w-1 translate-y-[-2px] bg-stone-400 dark:bg-stone-600" />
                      <span className="font-bold text-ink-max">{difficultyLabel(difficulty)}</span>
                    </p>
                    <p className="font-mono text-xs tabular-nums">
                      <span className="font-bold text-warn-strong">{format(t.revampQuiz.labRewardXp, { xp: xpPerQuestion })}</span>
                      <span className="text-ink-muted"> {format(t.revampQuiz.labPassRule, { pct: Math.round(PASS_RATIO * 100) })}</span>
                    </p>
                  </div>
                  <button type="button" onClick={() => startSelectedQuiz(track, difficulty)} className={`${btnPrimary} w-full cursor-pointer`}>
                    <span>{t.revampQuiz.labStart}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thi vượt chặng từng nằm ngay đây. Nó đã có trang riêng
                (/thi-vuot-chang): đây là bàn tập, đó là phòng thi - đạt là cả
                chặng được tính hoàn thành. Dòng này ở lại đúng chỗ cũ để người
                đã quen không kết luận là tính năng đã bị gỡ. */}
            <div className="lg:col-span-12">
              <Link
                href="/thi-vuot-chang"
                className={`${panel} group flex items-center justify-between gap-3 px-4 py-3 text-ink transition-colors hover:border-line-firm`}
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
          <div className="mx-auto max-w-2xl space-y-4">
            {/* Dòng trạng thái phiên: cấu hình, vị trí câu, điểm và XP đang chạy. */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <Sys className="text-ink-muted">
                  {t.revampQuiz.runLabel}
                  <span aria-hidden className="mx-1.5 inline-block h-1 w-1 translate-y-[-2px] bg-stone-400 dark:bg-stone-600" />
                  {trackLabel(track)}
                  <span aria-hidden className="mx-1.5 inline-block h-1 w-1 translate-y-[-2px] bg-stone-400 dark:bg-stone-600" />
                  {difficultyLabel(difficulty)}
                </Sys>
                <span className="flex items-baseline gap-3 font-mono text-xs tabular-nums">
                  <span className="text-cyan-700 dark:text-cyan-400">{format(t.revampQuiz.runningScore, { correct: correctSoFar })}</span>
                  <span className="font-bold text-warn-strong">
                    {format(t.revampQuiz.runningXp, { xp: correctSoFar * xpPerQuestion })}
                  </span>
                </span>
              </div>

              {/* Một đoạn cho mỗi câu: cyan đúng, đỏ sai, xanh đang làm, xám chưa tới. */}
              <div className="mt-2 flex gap-1" aria-hidden>
                {questions.map((_, i) => {
                  const done = i < answeredSoFar;
                  const cls = done
                    ? results[i]
                      ? "bg-cyan-600 dark:bg-cyan-400"
                      : "bg-red-500 dark:bg-red-400"
                    : i === activeQ
                      ? "bg-brand-600 dark:bg-brand-500"
                      : "bg-surface-sunken";
                  return <span key={i} className={`h-1.5 flex-1 transition-colors ${cls}`} />;
                })}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold tabular-nums text-ink-max">
                  {format(t.quizPage.questionCounter, { current: activeQ + 1, total: questions.length })}
                </span>
                <span className="truncate max-w-[60%] text-ink-faint">{q.lessonTitle}</span>
              </div>
            </div>

            <p className="font-bold text-lg leading-7 select-text text-ink-max">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                let cls = "border-stone-300 bg-white text-ink hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600";
                let gutter = "text-ink-faint";
                if (submitted) {
                  if (isCorrectOpt) {
                    cls = "border-cyan-600 bg-cyan-50 text-ink-max font-semibold dark:border-cyan-400 dark:bg-cyan-950/40";
                    gutter = "text-cyan-700 dark:text-cyan-400";
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
                    className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-baseline text-left px-3 py-2.5 rounded-sm border transition-colors cursor-pointer text-sm leading-6 select-text ${cls}`}
                  >
                    <Sys className={gutter}>{letter(oi)}</Sys>
                    <span>{opt}</span>
                    <span className="self-center">
                      {submitted && isCorrectOpt && <Check className="h-4 w-4 text-cyan-700 dark:text-cyan-400" aria-hidden />}
                      {submitted && isSelected && !isCorrectOpt && <X className="h-4 w-4 text-danger" aria-hidden />}
                    </span>
                  </button>
                );
              })}
            </div>

            {!submitted && (
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className={selected === null ? "text-ink-muted" : "font-bold text-accent-strong"}>
                  {selected === null ? t.revampQuiz.stateUnanswered : format(t.revampQuiz.statePicked, { letter: letter(selected) })}
                </span>
                <span className="hidden sm:inline font-mono text-ink-faint">{t.revampQuiz.keysHint}</span>
              </div>
            )}

            {/* Phản hồi: Cơ Cơ nói một câu ngắn kèm XP của câu này, rồi LẬP
                LUẬN - đáp án đúng viết nguyên văn, sau đó "vì sao". Câu đúng
                cũng nhận đủ phần giải thích, không chỉ một dấu tích. */}
            {submitted && (
              <div className="space-y-3 border-t border-line pt-4">
                <CoCoFeedback
                  lines={results[activeQ] ? t.revampQuiz.feedbackCorrect : t.revampQuiz.feedbackWrong}
                  tone={results[activeQ] ? "correct" : "wrong"}
                  salt={activeQ}
                  trailing={
                    results[activeQ] ? (
                      <span className="font-mono text-xs font-bold tabular-nums text-warn-strong">
                        {format(t.revampQuiz.xpThisQuestion, { xp: xpPerQuestion })}
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold tabular-nums text-ink-faint">{t.revampQuiz.noXpThisQuestion}</span>
                    )
                  }
                />
                <div className="space-y-2.5 text-sm">
                  {!results[activeQ] && selected !== null && (
                    <p className="text-danger">
                      <span className="font-bold">{format(t.revampQuiz.yourPick, { letter: letter(selected) })}</span>
                      <span className="text-ink-muted"> - {q.options[selected]}</span>
                    </p>
                  )}
                  <div className="border-l-2 border-cyan-600 pl-3 dark:border-cyan-400">
                    <Sys className="text-cyan-700 dark:text-cyan-400">{format(t.revampQuiz.answerHead, { letter: letter(q.correct) })}</Sys>
                    <p className="mt-0.5 font-bold leading-6 text-ink-max">{q.options[q.correct]}</p>
                  </div>
                  <div className="pl-3.5">
                    <Sys className="text-ink-muted">{t.revampQuiz.whyHead}</Sys>
                    <p className="mt-0.5 max-w-[68ch] leading-7 text-ink-body">{q.explanation}</p>
                  </div>
                </div>
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
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Sys className="text-ink-muted">{t.revampQuiz.resultTitle}</Sys>
                <p className="mt-1 flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-medium tabular-nums leading-none text-ink-max">
                    {score}/{questions.length}
                  </span>
                  {passed ? (
                    <span className="inline-flex items-center gap-1 text-sm font-black text-cyan-700 dark:text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      {t.revampQuiz.resultPassed}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-ink-muted">
                      {format(t.revampQuiz.resultNotPassed, { need: passNeed, total: questions.length })}
                    </span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <Sys className="text-ink-muted">{t.quizPage.xpEarned}</Sys>
                <p className="mt-1 font-mono text-2xl font-bold tabular-nums leading-none text-warn-strong">
                  {xpAwarded === null ? "..." : format(t.miscUi.xpGain, { count: xpAwarded })}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {results.map((ok, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-sm border flex items-center justify-center ${
                    ok
                      ? "border-cyan-600 bg-cyan-50 text-cyan-800 dark:border-cyan-400 dark:bg-cyan-950/40 dark:text-cyan-200"
                      : "border-red-600 bg-red-50 text-red-800 dark:border-red-400 dark:bg-red-950/40 dark:text-red-200"
                  }`}
                >
                  {ok ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
                </div>
              ))}
            </div>

            <CoCoSays
              lines={passed ? t.revampQuiz.resultGood : t.revampQuiz.resultReview}
              vars={{ score, total: questions.length }}
              size={40}
            />

            {wrongLessons.length > 0 && (
              <div className="border-l-2 border-stone-300 pl-4 space-y-1.5 dark:border-stone-700">
                <Sys className="block mb-2 text-ink-muted">{t.quizPage.reviewWrongLessons}</Sys>
                {wrongLessons.map((lq) => (
                  <Link key={lq.lessonId} href={`/bai-hoc/${lq.lessonSlug}`} className={`${textLink} flex`}>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    {lq.lessonTitle}
                  </Link>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <Link href="/dashboard" className={btnSecondary}>
                {t.quizPage.backToDashboard}
              </Link>
              <button onClick={() => setStage("setup")} className={`${btnSecondary} cursor-pointer`}>
                {t.revampQuiz.changeConfig}
              </button>
              <button onClick={() => void startQuiz()} className={`${btnPrimary} cursor-pointer`}>
                <RotateCcw className="h-4 w-4" aria-hidden />
                {t.revampQuiz.retrySame}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
