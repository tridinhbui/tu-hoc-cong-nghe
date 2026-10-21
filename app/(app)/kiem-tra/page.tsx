"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, ChevronLeft, Cpu, FlaskConical, Layers, Play, RotateCcw, Shuffle, SignalHigh, SignalLow, SignalMedium, Trophy, X } from "lucide-react";
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
import { Sys, StatusDot, btnPrimary, btnSecondary, textLink, quizKey, quizOption, type QuizOptionState } from "@/components/ui/system";

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
/** Biểu tượng mỗi mảng / mỗi nấc độ khó - nhận ra bằng hình trước khi đọc chữ. */
const TRACK_ICON = { personal: Cpu, professional: Layers } as const;
const DIFFICULTY_ICON = { "tat-ca": Shuffle, de: SignalLow, "trung-binh": SignalMedium, kho: SignalHigh } as const;

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
  /** Nút chạy phiên, để bước 3 của Daily Signal ("luyện phần yếu") gọi tới:
   *  cuộn tới, lấy tiêu điểm, vòng xanh loang hai nhịp. */
  const launchRef = useRef<HTMLButtonElement>(null);
  const [launchCue, setLaunchCue] = useState(0);
  function cueTrainingLab() {
    const el = launchRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
    setLaunchCue((n) => n + 1);
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-8 lg:gap-y-5 items-stretch">
            {/* TRÁI: DAILY SIGNAL - việc chính của hôm nay. */}
            <div className="lg:col-span-6 h-full flex flex-col">
              <DailyNewsQuizWidget userId={userId || "guest"} variant="signal" onTrain={cueTrainingLab} />
            </div>

            {/* PHẢI: TRAINING LAB - bàn điều khiển riêng: một mặt nền xám nhạt,
                không viền; chọn mảng + độ khó rồi chạy một phiên. Đứng sau
                Daily Signal về thứ bậc, nhưng mọi thứ trong nó đều bấm được.
                Dính ở đầu vùng cuộn: đọc lời giải bên trái xong, nút chạy
                phiên vẫn ngay trong tầm mắt. */}
            <div className="lg:col-span-6 lg:self-start lg:sticky lg:top-0">
              <div id="training-lab" className="flex flex-col gap-4 rounded-card bg-surface-raised p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-control bg-surface-invert text-ink-invert">
                      <FlaskConical className="h-4 w-4" aria-hidden />
                    </span>
                    <Sys className="text-ink-max font-bold">{t.revampQuiz.labName}</Sys>
                  </div>
                  <span className="rounded-control bg-amber-100 px-2 py-1 font-mono text-xs font-bold tabular-nums text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {format(t.revampQuiz.labRewardXp, { xp: xpPerQuestion })}
                  </span>
                </div>

                <CoCoSays lines={t.coco.kiemTra} size={34} />

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

                {/* Mảng kiến thức: ô đang chọn nổi lên thành mặt trắng có vòng
                    xanh, biểu tượng tô đặc; ô kia chìm vào nền bàn điều khiển. */}
                <div>
                  <Sys className="text-ink-body">{t.revampQuiz.labAreaLabel}</Sys>
                  <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label={t.revampQuiz.labAreaLabel}>
                    {TRACK_IDS.map((id) => {
                      const desc = id === "personal" ? t.quizPage.trackPersonalDesc : t.quizPage.trackProfessionalDesc;
                      const on = track === id;
                      const Icon = TRACK_ICON[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          onClick={() => setTrack(id)}
                          aria-checked={on}
                          className={`group flex items-start gap-2.5 rounded-control px-3 py-2.5 text-left transition-[background-color,box-shadow,transform] duration-150 cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                            on ? "bg-surface ring-2 ring-accent" : "hover:bg-surface/70"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${
                              on ? "bg-brand-600 text-white dark:bg-brand-500" : "bg-surface-sunken text-ink-muted group-hover:text-accent-strong"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className={`text-sm font-black leading-tight ${on ? "text-ink-max" : "text-ink-body"}`}>{trackLabel(id)}</span>
                              {on && <Check className="h-3.5 w-3.5 shrink-0 text-accent-strong" aria-hidden />}
                            </span>
                            <span className={`mt-0.5 block text-[11.5px] leading-snug ${on ? "text-ink-body" : "text-ink-muted"}`}>{desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Độ khó: thanh bốn nấc, nấc đang chọn tô đặc xanh. */}
                <div>
                  <Sys className="text-ink-body">{t.revampQuiz.labDifficultyLabel}</Sys>
                  <div
                    className="mt-1.5 grid grid-cols-4 gap-1 rounded-control bg-surface-sunken/70 p-1"
                    role="radiogroup"
                    aria-label={t.revampQuiz.labDifficultyLabel}
                  >
                    {DIFFICULTY_IDS.map((id) => {
                      const on = difficulty === id;
                      const Icon = DIFFICULTY_ICON[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          onClick={() => setDifficulty(id)}
                          aria-checked={on}
                          className={`inline-flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold transition-colors cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                            on
                              ? "bg-brand-600 text-white dark:bg-brand-500"
                              : "text-ink-body hover:bg-surface hover:text-accent-strong"
                          }`}
                        >
                          <Icon className="hidden h-3.5 w-3.5 sm:block" aria-hidden />
                          {difficultyLabel(id)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chạy phiên: nút lớn mang theo cấu hình vừa chọn, như lệnh
                    khởi chạy - người học đọc lại lựa chọn ngay trên nút bấm. */}
                <div className="pt-1">
                  <button
                    key={launchCue}
                    ref={launchRef}
                    type="button"
                    onClick={() => startSelectedQuiz(track, difficulty)}
                    className={`group flex w-full items-center gap-3 rounded-card bg-brand-600 px-4 py-3 text-left text-white transition-[background-color,transform] duration-150 hover:bg-brand-700 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised dark:bg-brand-500 dark:hover:bg-brand-400 ${launchCue ? "thcn-ping" : ""}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-white/15 transition-colors group-hover:bg-white/25">
                      <Play className="h-4 w-4 fill-current" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-black uppercase tracking-wide">{t.revampQuiz.labStart}</span>
                      <span className="block truncate text-xs font-medium text-white/80">
                        {trackLabel(track)} · {difficultyLabel(difficulty)} · {format(t.revampQuiz.labPassRule, { pct: Math.round(PASS_RATIO * 100) })}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
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
                className="group flex items-center justify-between gap-3 border-t border-line-soft pt-4 text-ink-muted transition-colors hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-ink-faint" />
                  <span className="text-sm font-bold group-hover:text-accent-strong">{t.nav.stageSkipExam}</span>
                  <span className="hidden sm:inline text-xs font-medium text-ink-faint">{t.stageSkip.pageSubtitle}</span>
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent-strong" />
              </Link>
            </div>
          </div>
        )}

        {stage !== "setup" && (
          <div className="max-w-2xl mx-auto">
            {stage === "loading" && (
              <div className="py-16 space-y-3" role="status">
                <p className="flex items-center justify-center gap-2 text-sm font-bold text-accent-strong">
                  <FlaskConical className="h-4 w-4 motion-safe:animate-pulse" aria-hidden />
                  {t.quizPage.loadingQuestions}
                </p>
                <div className="mx-auto flex max-w-xs gap-1" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="h-1.5 flex-1 rounded-full bg-accent-soft motion-safe:animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
              </div>
            )}

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
                  return <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${cls}`} />;
                })}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold tabular-nums text-ink-max">
                  {format(t.quizPage.questionCounter, { current: activeQ + 1, total: questions.length })}
                </span>
                <span className="truncate max-w-[60%] text-ink-muted">{q.lessonTitle}</span>
              </div>
            </div>

            <p className="font-bold text-lg leading-7 select-text text-ink-max">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                const state: QuizOptionState = submitted
                  ? isCorrectOpt
                    ? "correct"
                    : isSelected
                      ? "wrong"
                      : "dim"
                  : isSelected
                    ? "selected"
                    : "idle";
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    aria-pressed={isSelected}
                    onClick={() => choose(oi)}
                    className={`${quizOption(state)} flex items-center gap-3 px-3 py-2.5 text-sm leading-6 select-text`}
                  >
                    <span className={quizKey(state)}>
                      {state === "correct" ? <Check className="h-4 w-4" aria-hidden /> : state === "wrong" ? <X className="h-4 w-4" aria-hidden /> : letter(oi)}
                    </span>
                    <span className={`flex-1 ${state === "selected" || state === "correct" ? "font-semibold" : ""}`}>{opt}</span>
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
              <button disabled={selected === null} onClick={verify} className={`${btnPrimary} w-full py-3 cursor-pointer disabled:!bg-surface-raised disabled:!text-ink-faint disabled:!opacity-100`}>
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
