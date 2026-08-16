"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Check, CheckCircle2, ChevronLeft } from "lucide-react";
import { submitQuizSession, computeQuizXp, type QuizTrack, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import TaiTaiQuizSuggestion from "@/components/TaiTaiQuizSuggestion";
import StageSkipExamPanel from "@/components/StageSkipExamPanel";
import DailyNewsQuizWidget from "@/components/DailyNewsQuizWidget";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";
import { getCurrentUserId } from "@/lib/current-user";

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
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col">
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 -ml-2 rounded-full text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200 transition-colors"
              aria-label={t.quizPage.backAria}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">{t.quizPage.title}</h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {t.quizPage.subtitle}
              </p>
            </div>
          </div>

          {/* Mức thưởng nói MỘT lần, ở dạng chữ. Trước đây nó là một viên thuốc
              viền xanh có icon ở đây, VÀ một hộp nền xanh nhắc lại y hệt ở cuối
              cột phải - cùng một câu, hai lần, hai kiểu trang trí. Phần thưởng
              là hệ quả của việc làm bài, không phải việc cần làm, nên nó đứng
              yên ở đây dưới dạng một dòng phụ. */}
          <p className="hidden sm:block text-xs tabular-nums text-stone-500 dark:text-stone-400">
            {format(t.quizPage.xpPerQuestion, { xp: XP_PER_QUESTION })}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {stage === "setup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch">
            {/* CỘT TRÁI - mặt làm bài. Việc chính của trang.
                Không còn nằm trong hộp: trước đây nó là một khối bo 3xl, viền
                hồng, nền chuyển sắc hồng-trắng-hổ phách, đổ bóng - và bên trong
                lại chứa thêm một hộp tin tức, rồi bốn hộp đáp án nữa. Ba tầng
                hộp lồng nhau cho một việc duy nhất là đọc và chọn.
                Nhãn "BÊN TRÁI •" cũng đã bỏ. Nó nói cho người đọc biết cột này
                nằm bên trái, thứ mà vị trí của nó đã nói rồi. */}
            <div className="lg:col-span-7 lg:pr-8 h-full flex flex-col">
              <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                    {t.quizPage.newsTitle}
                  </h2>
                  {/* Trạng thái là CHỮ, không phải viên thuốc đỏ nhấp nháy. Bản
                      cũ dùng `animate-pulse` cộng một chấm `animate-ping` cho
                      trạng thái "chưa làm" - hai hiệu ứng chuyển động để báo một
                      việc chưa làm, ngay cạnh chính việc đó. */}
                  {isNewsAnswered ? (
                    <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.quizPage.newsDone}
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs font-medium text-stone-500 dark:text-stone-400">
                      {t.quizPage.newsPending}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {t.quizPage.newsBodyPart1}
                  {format(t.quizPage.newsXp, { xp: QUEST_XP_REWARDS.daily_news_quiz })}
                  {t.quizPage.newsBodyPart2}
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-start pt-4">
                <DailyNewsQuizWidget userId={userId || "guest"} compact={false} />
              </div>
            </div>

            {/* CỘT PHẢI - bảng thiết lập. Phụ thuộc, nên hẹp hơn (5/12 so với
                7/12) và ngăn bằng một NÉT DỌC chứ không phải thành hộp thứ hai
                đặt cạnh hộp thứ nhất. Hai tấm thẻ nằm cạnh nhau thì trông ngang
                vai nhau, mà ở trang này chúng không ngang vai: một bên là việc
                cần làm, một bên là mấy công tắc để bắt đầu một việc khác. */}
            <div className="lg:col-span-5 h-full flex flex-col lg:border-l lg:border-stone-200 lg:pl-8 dark:lg:border-stone-800">
              <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
                <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {t.quizPage.builderTitle}
                </h2>
              </div>
              <div className="space-y-5 pt-4">

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
                  <label className="eyebrow block text-stone-400 dark:text-stone-500 mb-2">
                    {t.quizPage.step1}
                  </label>
                  <div className="divide-y divide-stone-200/80 border-y border-stone-200/80 dark:divide-stone-800 dark:border-stone-800">
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
                          // Hàng, không phải thẻ. Trạng thái đang chọn nói bằng
                          // MỘT dấu tích cộng chữ đậm lên - bản cũ nói bằng
                          // border-2 xanh, CỘNG nền chuyển sắc, CỘNG ring-2,
                          // CỘNG một viên thuốc chữ "ĐANG CHỌN": bốn tín hiệu
                          // cho một trạng thái nhị phân trong danh sách bốn mục.
                          className={`w-full text-left px-1 py-2.5 transition-colors cursor-pointer flex items-start gap-2.5 ${
                            selected
                              ? "text-stone-900 dark:text-stone-100"
                              : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                          }`}
                          aria-pressed={selected}
                        >
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 transition-opacity ${
                              selected ? "text-emerald-600 opacity-100 dark:text-emerald-500" : "opacity-0"
                            }`}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <div className={`text-sm ${selected ? "font-semibold" : "font-medium"}`}>{label}</div>
                            <p className="text-xs mt-0.5 text-stone-500 dark:text-stone-400 leading-snug">{desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="eyebrow block text-stone-400 dark:text-stone-500 mb-2">
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
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer text-center ${
                            selected
                              ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                              : "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Start Action Button */}
                <button
                  onClick={() => startSelectedQuiz(track, difficulty)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
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
              // Lối rẽ phụ, nên trông như một lối rẽ: một hàng dưới nét kẻ,
              // không phải tấm thẻ thứ ba có viền, đổ bóng và ô biểu tượng hổ
              // phách. Ô biểu tượng 36px có nền riêng, viền riêng và màu riêng
              // là ba quyết định thị giác cho một liên kết.
              className="lg:col-span-12 group mt-2 flex items-center justify-between gap-4 border-t border-stone-200 py-3.5 transition-colors dark:border-stone-800"
            >
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-4 w-4 shrink-0 text-stone-400 transition-colors group-hover:text-stone-600 dark:group-hover:text-stone-300" />
                <div>
                  <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.quizPage.ibTitle}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.quizPage.ibSub}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-stone-500 transition-all group-hover:translate-x-0.5 group-hover:text-stone-800 dark:text-stone-400 dark:group-hover:text-stone-200">
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
                {xpAwarded === null ? "..." : format(t.miscUi.xpGain, { count: xpAwarded })}
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
