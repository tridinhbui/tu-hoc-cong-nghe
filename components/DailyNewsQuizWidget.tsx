"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Newspaper, HelpCircle, CheckCircle2, XCircle, Award, Flame } from "lucide-react";
import { claimQuestReward } from "@/lib/supabase-quests";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface DailyNewsQuizWidgetProps {
  userId: string;
  compact?: boolean;
}

interface NewsQuiz {
  day: number;
  newsTitle: string;
  newsBody: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function DailyNewsQuizWidget({ userId, compact = false }: DailyNewsQuizWidgetProps) {
  const { t } = useI18n();
  // NEWS_QUIZZES below is a hand-authored, fixed set of scenarios (not a live
  // news feed) sourced from the dictionary so it renders in the reader's
  // language - see t.newsQuiz.quizzes in
  // lib/i18n/dictionaries/sections/certificate-quests.ts.
  const NEWS_QUIZZES: NewsQuiz[] = useMemo(() => t.newsQuiz.quizzes, [t]);
  const [quiz, setQuiz] = useState<NewsQuiz | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  // On the dashboard sidebar this is now treated as a "today in finance"
  // block rather than an optional challenge, so it starts open by default.
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // "Unlimited" continuous practice mode: cycles through the same fixed
  // question pool (NEWS_QUIZZES is hand-authored, not a live feed - there's
  // no real news source wired up) without the once-a-day XP claim, so
  // someone can keep drilling past today's single question without it
  // looking like an exploit of the daily reward.
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceQuiz, setPracticeQuiz] = useState<NewsQuiz | null>(null);
  const [practiceSelectedOpt, setPracticeSelectedOpt] = useState<number | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);

  const todayKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const localAnsweredKey = `news_quiz_answered_${userId}_${todayKey}`;

  useEffect(() => {
    // Resolve quiz based on current day of the week
    const currentDay = new Date().getDay();
    const resolvedQuiz = NEWS_QUIZZES.find((q) => q.day === currentDay) || NEWS_QUIZZES[0];
    setQuiz(resolvedQuiz);

    // Check if already answered today
    if (typeof window !== "undefined") {
      const answered = window.localStorage.getItem(localAnsweredKey);
      if (answered) {
        setIsAnswered(true);
        setIsCorrect(answered === "correct");
        setSelectedOpt(Number(window.localStorage.getItem(`${localAnsweredKey}_opt`) ?? "-1"));
      }
    }
  }, [localAnsweredKey, NEWS_QUIZZES]);

  const handleSubmit = async () => {
    if (selectedOpt === null || !quiz) return;

    const correct = selectedOpt === quiz.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(localAnsweredKey, correct ? "correct" : "incorrect");
      window.localStorage.setItem(`${localAnsweredKey}_opt`, String(selectedOpt));
      
      // Dispatch custom event so AppNavbar warning badge disappears immediately
      window.dispatchEvent(new CustomEvent("thtcdn:daily-news-quiz-answered", { detail: { date: todayKey, userId } }));
    }

    if (correct) {
      // Reuses the same user_quest_completions table + claim flow already
      // proven for daily quests (unique(user_id, quest_type, day_key) stops
      // double claims, missing-table fallback to localStorage, and it calls
      // recalculateUserStats() itself) - previously this just called
      // recalculateUserStats() directly with nothing written anywhere for
      // "news quiz", so the total_xp formula had no term for it and the
      // "+15 XP" toast never actually added anything.
      try {
        // xpEarned (not the hardcoded 15) is what actually landed - the
        // weekly quest XP cap can clamp this lower, even to 0, once the
        // week's budget is spent. See the matching fix in
        // components/DailyQuestsWidget.tsx for the full story.
        const { claimed, xpEarned } = await claimQuestReward(userId, "daily_news_quiz", todayKey);
        if (claimed && xpEarned > 0) {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: t.newsQuiz.xpGainedLabel } }));
          }
          toast.success(format(t.newsQuiz.toastCorrectXp, { xp: xpEarned }));
        } else if (claimed) {
          toast.success(t.newsQuiz.toastCorrectCapped);
        } else {
          toast.success(t.newsQuiz.toastCorrectAlready);
        }
      } catch (err) {
        console.error("Error rewarding news quiz XP:", err);
        toast.success(t.newsQuiz.toastCorrectFallback);
      }
    } else {
      toast.error(t.newsQuiz.toastIncorrect);
    }
  };

  function startPractice() {
    setPracticeMode(true);
    setPracticeStreak(0);
    pickNextPracticeQuiz();
  }

  function pickNextPracticeQuiz() {
    const pool = NEWS_QUIZZES.filter((q) => q.day !== practiceQuiz?.day);
    const next = pool[Math.floor(Math.random() * pool.length)] ?? NEWS_QUIZZES[0];
    setPracticeQuiz(next);
    setPracticeSelectedOpt(null);
    setPracticeAnswered(false);
    setPracticeCorrect(false);
  }

  function submitPractice() {
    if (practiceSelectedOpt === null || !practiceQuiz) return;
    const correct = practiceSelectedOpt === practiceQuiz.correctIndex;
    setPracticeCorrect(correct);
    setPracticeAnswered(true);
    if (correct) setPracticeStreak((s) => s + 1);
    else setPracticeStreak(0);
  }

  if (!quiz) return null;

  const activeQuiz = practiceMode ? practiceQuiz : quiz;
  const activeSelectedOpt = practiceMode ? practiceSelectedOpt : selectedOpt;
  const activeIsAnswered = practiceMode ? practiceAnswered : isAnswered;
  const activeIsCorrect = practiceMode ? practiceCorrect : isCorrect;

  if (!activeQuiz) return null;

  return (
    <div className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm ${compact ? "rounded-2xl" : "rounded-3xl"}`}>
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center justify-between cursor-pointer text-left focus:outline-none ${
          collapsed ? "" : "border-b border-stone-100 dark:border-stone-800"
        } ${compact ? "px-4 py-3" : "px-6 py-4"}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 w-8 h-8">
            <Newspaper className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-base">
              {compact ? t.newsQuiz.titleCompact : t.newsQuiz.titleFull}
              {!activeIsAnswered && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </h3>
            {!compact && (
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">
                {t.newsQuiz.subtitle}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0">
          {collapsed ? t.newsQuiz.collapseOpen : t.newsQuiz.collapseClose}
        </span>
      </button>

      {/* Content */}
      {!collapsed && (
        <div className={compact ? "p-4 space-y-3" : "p-6 space-y-4"}>
          {/* News snippet box */}
          <div className={`bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 ${compact ? "rounded-xl p-3" : "rounded-2xl p-4"}`}>
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className="text-[9px] font-extrabold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-400 px-2 py-0.5 rounded uppercase">
                {practiceMode ? t.newsQuiz.badgePractice : t.newsQuiz.badgeToday}
              </span>
              {/* NEWS_QUIZZES (t.newsQuiz.quizzes) is a hand-authored, fixed
                  set of scenarios (not a live news feed) - flagging that
                  explicitly so the specific-looking numbers (CPI %, tỷ giá,
                  lãi suất...) never get mistaken for real reported news. */}
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500">
                {t.newsQuiz.simulatedNotice}
              </span>
            </div>
            <h4 className={`font-black text-stone-900 dark:text-stone-100 leading-snug ${compact ? "text-[11px]" : "text-xs"}`}>
              {activeQuiz.newsTitle}
            </h4>
            {!compact && (
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-2 leading-relaxed italic">
                "{activeQuiz.newsBody}"
              </p>
            )}
          </div>

          {/* Question and Options */}
          <div className={compact ? "space-y-2" : "space-y-3"}>
            <h4 className={`font-black text-stone-900 dark:text-stone-100 flex items-start gap-1.5 ${compact ? "text-[11px]" : "text-xs"}`}>
              <HelpCircle className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-0.5 shrink-0" />
              <span>{activeQuiz.question}</span>
            </h4>

            <div className={compact ? "grid gap-1.5" : "grid gap-2"}>
              {activeQuiz.options.map((opt, idx) => {
                const isSelected = activeSelectedOpt === idx;
                const showSuccess = activeIsAnswered && idx === activeQuiz.correctIndex;
                const showFailure = activeIsAnswered && isSelected && !activeIsCorrect;

                return (
                  <button
                    key={idx}
                    disabled={activeIsAnswered}
                    onClick={() => (practiceMode ? setPracticeSelectedOpt(idx) : setSelectedOpt(idx))}
                    className={`w-full text-left rounded-xl border leading-relaxed transition-all flex items-start gap-2.5 focus:outline-none ${
                      compact ? "p-2.5 text-[11px]" : "p-3.5 text-xs"
                    } ${
                      showSuccess
                        ? "border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 font-bold"
                        : showFailure
                        ? "border-rose-500 bg-rose-500/[0.04] dark:bg-rose-950/20 text-rose-900 dark:text-rose-400"
                        : isSelected
                        ? "border-sky-500 bg-sky-500/[0.02] text-sky-900 dark:text-sky-400 font-bold"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">
                      {showSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : showFailure ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${
                          isSelected ? "border-sky-500 text-sky-500" : "border-stone-300 dark:border-stone-700 text-stone-400"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit or Explanation block */}
          {!activeIsAnswered ? (
            <button
              onClick={practiceMode ? submitPractice : handleSubmit}
              disabled={activeSelectedOpt === null}
              className={`w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 dark:bg-stone-100 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 text-white dark:text-stone-900 disabled:text-stone-400 rounded-xl font-extrabold tracking-wider uppercase transition-colors cursor-pointer ${
                compact ? "py-2.5 text-[10px]" : "py-3 text-xs"
              }`}
            >
              {t.newsQuiz.submitAnswer}
            </button>
          ) : (
            <div className={`rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/60 dark:border-stone-800/80 animate-[fadeIn_0.35s_ease-out] ${compact ? "p-3" : "p-4.5"}`}>
              <h5 className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-stone-700 dark:text-stone-300 mb-2">
                <Award className={`w-4 h-4 ${activeIsCorrect ? "text-emerald-500" : "text-stone-400"}`} />
                <span>{activeIsCorrect ? t.newsQuiz.correctAnswerLabel : format(t.newsQuiz.wrongAnswerLabel, { letter: String.fromCharCode(65 + activeQuiz.correctIndex) })}</span>
              </h5>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {activeQuiz.explanation}
              </p>
            </div>
          )}

          {/* Unlimited practice mode toggle/continue */}
          {practiceMode ? (
            <div className="flex items-center gap-2">
              {practiceStreak > 1 && (
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                  <Flame className="w-3.5 h-3.5" />
                  {format(t.newsQuiz.streakLabel, { count: practiceStreak })}
                </span>
              )}
              {practiceAnswered && (
                <button
                  onClick={pickNextPracticeQuiz}
                  className={`flex-1 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-extrabold tracking-wider uppercase transition-colors cursor-pointer ${compact ? "py-2 text-[10px]" : "py-2.5 text-xs"}`}
                >
                  {t.newsQuiz.nextQuestion}
                </button>
              )}
              <button
                onClick={() => setPracticeMode(false)}
                className={`text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-bold shrink-0 ${compact ? "text-[10px]" : "text-xs"}`}
              >
                {t.newsQuiz.exitPractice}
              </button>
            </div>
          ) : (
            <button
              onClick={startPractice}
              className={`w-full border-2 border-dashed border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-400 rounded-xl font-bold hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors cursor-pointer ${compact ? "py-2 text-[10px]" : "py-2.5 text-xs"}`}
            >
              {t.newsQuiz.startPractice}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
