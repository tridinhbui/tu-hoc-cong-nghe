"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { markLessonComplete, saveQuizAnswers, getQuizAnswers, clearQuizAnswers } from "@/lib/progress";
import FloatingContact from "@/components/FloatingChatbot";
import StageTipsBanner from "@/components/StageTipsBanner";
import ReadingProgress from "@/components/ReadingProgress";
import BookmarkButton from "@/components/BookmarkButton";
import ManualLessonFlagButton from "@/components/ManualLessonFlagButton";
import LessonStatsHover from "@/components/LessonStatsHover";
import LessonNotes from "@/components/LessonNotes";
import { createClient } from "@/lib/supabase";
import { markLessonComplete as markLessonCompleteSupabase } from "@/lib/supabase-progress";
import { getLessonProgress } from "@/lib/supabase-progress";
import { recalculateUserStats } from "@/lib/supabase-user";
import { updateStreak } from "@/lib/supabase-streak";
import { getReadingProgress, updateReadingProgress } from "@/lib/supabase-reading";
import { RECALL_SCHEDULE } from "@/lib/recall-schedule";
import RecallCard from "@/components/RecallCard";
import LessonTour from "@/components/LessonTour";
import FontSizeControl, { loadFontScale } from "@/components/FontSizeControl";
import LessonFeedbackInline from "@/components/LessonFeedbackInline";
import { getLessonDisplayLabel } from "@/lib/lesson-labels";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LessonMeta {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  emoji: string;
  day: number;
  label?: string;
  recallDay?: number;
  accent: string;
  slug?: string;
  nextSlug?: string;
  nextTitle?: string;
}

interface Props {
  lesson: LessonMeta;
  quiz: QuizQuestion[];
  children: React.ReactNode;
}

const ACCENTS: Record<string, { bg: string; text: string; border: string; badge: string; bar: string; btn: string }> = {
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/40",  text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-900", badge: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400", bar: "bg-emerald-500", btn: "bg-emerald-600 hover:bg-emerald-700" },
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/40",     text: "text-blue-700 dark:text-blue-400",    border: "border-blue-200 dark:border-blue-900",    badge: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400",    bar: "bg-blue-500",    btn: "bg-blue-600 hover:bg-blue-700" },
  violet:  { bg: "bg-violet-50 dark:bg-violet-950/40",   text: "text-violet-700 dark:text-violet-400",  border: "border-violet-200 dark:border-violet-900",  badge: "bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400", bar: "bg-violet-500",  btn: "bg-violet-600 hover:bg-violet-700" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-950/40",   text: "text-orange-700 dark:text-orange-400",  border: "border-orange-200 dark:border-orange-900",  badge: "bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400", bar: "bg-orange-500",  btn: "bg-orange-600 hover:bg-orange-700" },
  teal:    { bg: "bg-teal-50 dark:bg-teal-950/40",     text: "text-teal-700 dark:text-teal-400",    border: "border-teal-200 dark:border-teal-900",    badge: "bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400",    bar: "bg-teal-500",    btn: "bg-teal-600 hover:bg-teal-700" },
  cyan:    { bg: "bg-cyan-50 dark:bg-cyan-950/40",     text: "text-cyan-700 dark:text-cyan-400",    border: "border-cyan-200 dark:border-cyan-900",    badge: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400",    bar: "bg-cyan-500",    btn: "bg-cyan-600 hover:bg-cyan-700" },
  rose:    { bg: "bg-rose-50 dark:bg-rose-950/40",     text: "text-rose-700 dark:text-rose-400",    border: "border-rose-200 dark:border-rose-900",    badge: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400",    bar: "bg-rose-500",    btn: "bg-rose-600 hover:bg-rose-700" },
  indigo:  { bg: "bg-indigo-50 dark:bg-indigo-950/40",   text: "text-indigo-700 dark:text-indigo-400",  border: "border-indigo-200 dark:border-indigo-900",  badge: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400", bar: "bg-indigo-500",  btn: "bg-indigo-600 hover:bg-indigo-700" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/40",    text: "text-amber-700 dark:text-amber-400",   border: "border-amber-200 dark:border-amber-900",   badge: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400",  bar: "bg-amber-500",   btn: "bg-amber-600 hover:bg-amber-700" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-950/40",   text: "text-purple-700 dark:text-purple-400",  border: "border-purple-200 dark:border-purple-900",  badge: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400", bar: "bg-purple-500",  btn: "bg-purple-600 hover:bg-purple-700" },
  stone:   { bg: "bg-stone-100 dark:bg-stone-900",   text: "text-stone-600 dark:text-stone-400",   border: "border-stone-200 dark:border-stone-800",   badge: "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400",  bar: "bg-stone-500",   btn: "bg-stone-700 hover:bg-stone-800" },
};

// A set of older hand-written pages still declare their pre-resync lesson id
// inline, while the dashboard and Supabase `lessons` table use the canonical
// ids from lib/lessons-data/_index.json. Persisting with the stale inline id
// makes the quiz look complete locally but invisible on the dashboard.
const CANONICAL_LESSON_IDS_BY_SLUG: Record<string, number> = {
  "bds-business-model": 1028,
  "bitcoin-crypto": 1025,
  "cap-rate": 1009,
  "commodity": 261,
  "commodity-phan-2": 1005,
  "discontinued-operations": 1001,
  "disney-pixar-ma": 1021,
  "dividend": 1017,
  "dupont-analysis": 1016,
  "enterprise-value": 1008,
  "fcf-deep-dive": 1035,
  "finance-as-math": 1033,
  "financial-risk": 1029,
  "fpt-cfo-cash": 1023,
  "hoc-tai-chinh-hanh-trinh": 1030,
  "income-affiliates-jv": 1011,
  "interim-comprehensive-income": 1012,
  "inventory-turnover": 1019,
  "maple-leaf-leverage": 1014,
  "market-fair-value": 1006,
  "modern-portfolio-theory": 1032,
  "nvidia-cash-securities": 1022,
  "oil-gas-business-model": 1024,
  "on-tap-wacc": 1002,
  "operating-leverage": 1010,
  "post-ipo-dividend": 1020,
  "pvgas-bad-debt": 1026,
  "retail-store-analysis": 1027,
  "roic": 1003,
  "roic-phan-2": 1004,
  "samsung-ai-finance": 1034,
  "tesla-cash-flow": 1015,
  "transfer-pricing": 1013,
  "vingroup-cash-flow": 1007,
  "walmart-earnings": 1018,
  "wealth-management": 1031,
};

export default function LessonPageLayout({ lesson, quiz, children }: Props) {
  const c = ACCENTS[lesson.accent] ?? ACCENTS.indigo;
  const persistedLessonId = lesson.slug ? CANONICAL_LESSON_IDS_BY_SLUG[lesson.slug] ?? lesson.id : lesson.id;

  const [selected, setSelected]   = useState<(number | null)[]>(new Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [results, setResults]     = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [activeQ, setActiveQ]     = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [readPct, setReadPct]     = useState(0);
  const [userId, setUserId]       = useState<string | null>(null);
  const [fontScale, setFontScale] = useState(() => (typeof window === "undefined" ? 1.125 : loadFontScale()));
  const articleRef = useRef<HTMLElement>(null);
  const maxReachedRef = useRef(0);
  const savedMilestonesRef = useRef<Set<number>>(new Set());
  const zeroQuizCompletedRef = useRef(false);

  const durationMin = parseInt(lesson.duration) || 5;
  const lessonLabel = lesson.label ?? getLessonDisplayLabel({ id: lesson.id, title: lesson.title, track: undefined });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);

      const existing = await getReadingProgress(user.id, persistedLessonId);
      if (existing) {
        maxReachedRef.current = existing.max_percent_reached;
        if (existing.milestone_25) savedMilestonesRef.current.add(25);
        if (existing.milestone_50) savedMilestonesRef.current.add(50);
        if (existing.milestone_75) savedMilestonesRef.current.add(75);
        if (existing.milestone_100) savedMilestonesRef.current.add(100);
      }

      // If this lesson was already completed in a previous visit, the quiz's
      // per-question state (submitted/results) only lives in this component's
      // local state, so it starts empty on every fresh mount. Without this,
      // the "next lesson" completion card - and its unlock button - stays
      // hidden until the user redoes the whole quiz. Restore it so revisiting
      // a finished lesson shows it right away.
      if (quiz.length > 0) {
        // Prefer the exact per-question record saved locally (which option
        // was picked for each question) - this is what lets someone
        // revisiting a lesson see precisely which question they got wrong,
        // not just how many.
        const saved = getQuizAnswers(persistedLessonId);
        if (saved && saved.submitted.length === quiz.length) {
          setSelected(saved.selected);
          setSubmitted(saved.submitted);
          setResults(saved.results);
        } else {
          try {
            const progress = await getLessonProgress(user.id, persistedLessonId);
            if (progress?.completed) {
              // No per-question record available (e.g. different device/browser) -
              // fall back to a guess from the aggregate score so the completion
              // card at least renders instead of forcing a redo.
              const quizScore = Math.min(progress.quiz_score ?? quiz.length, quiz.length);
              setSubmitted(new Array(quiz.length).fill(true));
              setResults(quiz.map((_, i) => i < quizScore));
            }
          } catch (error) {
            console.error("Error fetching lesson progress:", error);
          }
        }
      } else {
        try {
          const progress = await getLessonProgress(user.id, persistedLessonId);
          zeroQuizCompletedRef.current = !!progress?.completed;
        } catch (error) {
          console.error("Error fetching zero-quiz lesson progress:", error);
        }
      }
    });
  }, [persistedLessonId, quiz.length]);

  useEffect(() => {
    let saveTimer: ReturnType<typeof setTimeout> | null = null;

    function onScroll() {
      // Tied to actual page scroll position (not the article's bounding box),
      // so it reads exactly 0% at the very top and 100% at the very bottom - // scrolling back up always brings it back down instead of resting on a
      // non-zero floor.
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const totalScroll = docH - winH;
      const pct = totalScroll > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / totalScroll) * 100))) : 100;
      setReadPct(pct);

      // Only fully visible while actively scrolling; fades to a faint sliver
      // when idle so it doesn't sit there as a permanent visual distraction.
      // Note: isScrolling state is no longer used for opacity control - ReadingProgress
      // component handles its own brightness based on proximity to milestones.

      if (pct > maxReachedRef.current) {
        maxReachedRef.current = pct;
      }

      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        if (!userId) return;
        try {
          await updateReadingProgress(userId, persistedLessonId, maxReachedRef.current);
        } catch (error) {
          // Reading progress is a passive nicety (resume-scroll position,
          // milestone toasts) - never worth crashing the page over, e.g.
          // when a lesson hasn't been synced into the Supabase mirror table
          // yet and the FK constraint on lesson_id rejects the row.
          console.error("Error saving reading progress:", error);
        }
      }, 800);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (saveTimer) clearTimeout(saveTimer);
    };
  }, [userId, persistedLessonId]);

  const handleMilestone = async (milestone: number) => {
    if (!userId || savedMilestonesRef.current.has(milestone)) return;
    savedMilestonesRef.current.add(milestone);
  };

  const remainMin = Math.max(0, Math.ceil(durationMin * (1 - readPct / 100)));
  const submittedCount = submitted.filter(Boolean).length;
  const score = results.filter(Boolean).length;
  const allDone = submittedCount === quiz.length;
  const pct = quiz.length > 0 ? Math.round((submittedCount / quiz.length) * 100) : 0;

  function choose(qi: number, oi: number) {
    if (submitted[qi]) return;
    setSelected((s) => { const n = [...s]; n[qi] = oi; return n; });
  }

  function verify(qi: number) {
    const sel = selected[qi];
    if (sel === null || submitted[qi]) return;
    const ok = sel === quiz[qi].correct;
    const newResults = [...results]; newResults[qi] = ok;
    const newSubmitted = [...submitted]; newSubmitted[qi] = true;
    setResults(newResults);
    setSubmitted(newSubmitted);
    // Persist the exact per-question outcome (not just an aggregate score)
    // so revisiting this lesson later shows precisely which question was
    // wrong and what was picked, instead of guessing from the total score.
    saveQuizAnswers(persistedLessonId, { selected, submitted: newSubmitted, results: newResults });
    if (newSubmitted.every(Boolean)) {
      // Learners can jump between questions via the progress dots, so the
      // lesson is complete when every question has been submitted, not only
      // when the last-index question happens to be the one just answered.
      setReviewMode(false);
      markLessonComplete(persistedLessonId, durationMin);
      completeLessonInSupabase(newResults);
    }
    // No auto-advance here - it used to jump to the next question 600ms
    // after answering, which didn't give people time to read the
    // explanation before it vanished. The "Câu tiếp theo" button below lets
    // them move on whenever they're ready instead.
  }

  // Re-opens a wrong answer for another attempt instead of leaving it
  // permanently locked. Resetting `submitted[qi]` also flips `allDone` back
  // to false when retried from the completion card, which is what swaps the
  // view back to the question editor for it.
  function retry(qi: number) {
    if (results[qi]) return;
    const newSelected = [...selected]; newSelected[qi] = null;
    const newSubmitted = [...submitted]; newSubmitted[qi] = false;
    setSelected(newSelected);
    setSubmitted(newSubmitted);
    setActiveQ(qi);
    setReviewMode(false);
    saveQuizAnswers(persistedLessonId, { selected: newSelected, submitted: newSubmitted, results });
  }

  // Opens an already-answered question (right or wrong) read-only, without
  // resetting it - `allDone` alone used to gate the question view, so once
  // every question was submitted there was no way back to look at any of
  // them, correct or not.
  function viewQuestion(qi: number) {
    setActiveQ(qi);
    setReviewMode(true);
  }

  // Resets every question back to unanswered, for someone who wants a full
  // redo rather than fixing just the ones they got wrong.
  function restartQuiz() {
    const freshSelected = new Array(quiz.length).fill(null);
    const freshSubmitted = new Array(quiz.length).fill(false);
    const freshResults = new Array(quiz.length).fill(false);
    setSelected(freshSelected);
    setSubmitted(freshSubmitted);
    setResults(freshResults);
    setActiveQ(0);
    setReviewMode(false);
    clearQuizAnswers(persistedLessonId);
  }

  async function completeLessonInSupabase(finalResults: boolean[]) {
    // Don't trust the `userId` state here - it's only set once the mount
    // effect's supabase.auth.getUser() round trip resolves, and a fast
    // reader can finish the quiz before that happens. Falling back to
    // state left this silently no-op-ing: the quiz still showed as done
    // locally (markLessonComplete above writes to localStorage regardless),
    // but nothing was ever saved to Supabase, so the dashboard's "next
    // lesson" greeting kept saying the lesson was never started. Resolve
    // the current user directly instead of relying on state timing.
    let uid = userId;
    if (!uid) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      uid = user.id;
      setUserId(uid);
    }

    const finalScore =
      quiz.length > 0
        ? Math.round((finalResults.filter(Boolean).length / quiz.length) * 100)
        : 100;

    try {
      await markLessonCompleteSupabase(uid, persistedLessonId, finalScore, durationMin * 60);
      // user_stats (XP/level) is only ever written by recalculateUserStats,
      // which nothing else calls - without this the dashboard keeps
      // showing 0 XP/level even once progress is saving correctly.
      await recalculateUserStats(uid);
      await updateStreak(uid);
      toast.success("Đã lưu tiến độ bài học!");
    } catch (error) {
      console.error("Error saving lesson progress:", error);
      toast.error("Không thể lưu tiến độ. Vui lòng thử lại.");
      return;
    }

  }

  useEffect(() => {
    if (quiz.length > 0 || readPct < 100 || zeroQuizCompletedRef.current) return;

    zeroQuizCompletedRef.current = true;
    markLessonComplete(persistedLessonId, durationMin);
    void completeLessonInSupabase([]);
    // completeLessonInSupabase is defined in-component and stable enough for
    // this one-way zero-quiz completion flow; including it here would make
    // the effect re-fire on every render due to function identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMin, persistedLessonId, quiz.length, readPct]);

  const q = quiz[activeQ];
  const qSubmitted = submitted[activeQ];
  const qCorrect   = results[activeQ];
  const qSelected  = selected[activeQ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 font-sans antialiased text-[#1A1A1E] dark:text-stone-100">
      {/* Reading Progress Bar (Fixed Left, race track style) - bright near milestones, dim otherwise.
          Only shown from 2xl up: below that the centered max-w-7xl article's left edge sits too
          close to the viewport edge, and the fixed bar ends up overlapping lesson text. */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 hidden 2xl:block">
        <ReadingProgress progress={readPct} onMilestone={handleMilestone} />
      </div>

      {/* Sticky header */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-50">
        {/* Scroll progress bar: full width, 4px, sits at very top of header */}
        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800">
          <div
            className={`h-full ${c.bar} transition-all duration-150`}
            style={{ width: `${readPct}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link
              href="/dashboard"
              aria-label="Về Dashboard"
              className="w-11 h-11 rounded-full border-2 border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600 bg-white dark:bg-stone-900 transition-all text-xl font-bold"
            >
              ←
            </Link>
            <div>
              <p className="font-extrabold text-stone-900 dark:text-stone-100 text-lg leading-tight line-clamp-1">{lesson.title}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 hidden sm:block font-semibold">{lessonLabel}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end">
            {/* Reading font-size control */}
            <FontSizeControl scale={fontScale} onChange={setFontScale} />

            {/* Bookmark button */}
            <div data-tour="lesson-bookmark">
              <BookmarkButton
                lessonId={persistedLessonId}
                lessonSlug={lesson.slug || ""}
                lessonTitle={lesson.title}
              />
            </div>

            <ManualLessonFlagButton
              lessonId={persistedLessonId}
              lessonSlug={lesson.slug || ""}
              lessonTitle={lesson.title}
            />

            {/* Quick stats peek */}
            <LessonStatsHover />

            {/* Reading progress badge */}
            <div className="hidden sm:flex items-center gap-2 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-full px-3 py-1.5">
              <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden flex-shrink-0 relative">
                <div
                  className={`absolute bottom-0 left-0 right-0 ${c.bar} transition-all duration-150`}
                  style={{ height: `${readPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                {readPct < 100
                  ? readPct === 0
                    ? `~${durationMin} phút đọc`
                    : `${readPct}% · còn ~${remainMin} phút`
                  : "Đọc xong!"}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="h-2 w-28 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{submittedCount}/{quiz.length}</span>
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${c.badge}`}>
              {lessonLabel}
            </span>
          </div>
        </div>
      </header>

      {/* 2-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Article ─────────────────────────────────────── */}
          <article ref={articleRef} className="flex-1 min-w-0 space-y-8 pb-20 lg:pb-0">
            {/* Hero */}
            <div className={`rounded-2xl ${c.bg} border-2 ${c.border} p-8 sm:p-10`}>
              <div className={`text-sm font-extrabold uppercase tracking-widest ${c.text} mb-3`}>
                {lessonLabel} · {lesson.difficulty}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-stone-100 leading-tight mb-4">
                {lesson.title}
              </h1>
              <p className="text-stone-700 dark:text-stone-300 text-lg sm:text-xl leading-relaxed">{lesson.subtitle}</p>
              <div className="mt-7 pt-5 border-t-2 border-stone-300 dark:border-stone-700 space-y-4">
                <div className="flex items-center gap-4 text-base text-stone-700 dark:text-stone-300 font-semibold">
                  <span>{lesson.duration} đọc</span>
                  <span>·</span>
                  <span>{quiz.length} câu quiz</span>
                  <span>·</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {readPct === 0
                      ? "Chưa bắt đầu"
                      : readPct >= 100
                      ? "Đọc xong!"
                      : `Đã đọc ${readPct}%`}
                  </span>
                </div>
                {/* Reading progress bar inside hero */}
                <div data-tour="lesson-progress" className="h-2.5 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.bar} rounded-full transition-all duration-150`}
                    style={{ width: `${readPct}%` }}
                  />
                </div>
                {readPct > 0 && readPct < 100 && (
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-semibold">
                    Còn khoảng <strong className="text-stone-900 dark:text-stone-100">~{remainMin} phút</strong> để đọc xong
                  </p>
                )}
              </div>
            </div>

            {/* Spaced-repetition recall - surfaces concepts from ~5 and ~12
                lessons back before introducing new material, so review is
                distributed across the course instead of only happening once
                at the end of a chặng. */}
            {lesson.recallDay && RECALL_SCHEDULE[lesson.recallDay]?.length > 0 && <RecallCard items={RECALL_SCHEDULE[lesson.recallDay]} />}

            {/* Tài Tài auto-tip */}
            <div data-tour="lesson-tai-tai">
              <StageTipsBanner lessonId={persistedLessonId} lessonTitle={lesson.title} />
            </div>

            {/* Content - `zoom` (not fontSize) so the reading-size control
                rescales every lesson page uniformly regardless of the
                explicit Tailwind text-sm/lg/xl classes each hand-written
                lesson sets on its own child elements. */}
            <div
              className="space-y-8 text-stone-800 dark:text-stone-300 leading-relaxed text-lg sm:text-xl font-medium"
              style={{ zoom: fontScale }}
            >
              {children}
            </div>

            {/* Feedback form at the bottom */}
            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
              <LessonFeedbackInline lessonId={persistedLessonId} userId={userId} />
            </div>

            {/* Mobile quiz prompt */}
            <div className="lg:hidden mt-8 border-t border-stone-200 dark:border-stone-800 pt-6">
              <p className="text-base text-stone-500 dark:text-stone-400 text-center">Cuộn xuống để làm quiz →</p>
            </div>
          </article>

          {/* ── RIGHT: Quiz sidebar ────────────────────────────────── */}
          {/* max-h + overflow-y-auto so the sticky column scrolls internally
              once its content (notes + quiz + explanation + mini nav) is
              taller than the viewport - without this, anything past the
              fold (e.g. the "Câu tiếp theo" button) was stuck off-screen
              with no way to reach it, since a sticky element doesn't scroll
              on its own past its container's height. */}
          <aside data-tour="lesson-quiz" className="w-full lg:w-[440px] flex-shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto space-y-4">
            {/* Lesson Notes */}
            <LessonNotes lessonId={persistedLessonId} lessonSlug={lesson.slug || ""} />
            
            {/* Quiz progress */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-wide">Kiểm tra nhanh</span>
                <span className="text-base font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">{submittedCount}/{quiz.length}</span>
              </div>
              <div className="flex gap-2">
                {quiz.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => viewQuestion(i)}
                    title={submitted[i] ? "Xem lại câu này" : undefined}
                    className={`flex-1 h-3 rounded-full transition-all cursor-pointer ${
                      submitted[i]
                        ? results[i] ? "bg-emerald-500" : "bg-rose-500"
                        : i === activeQ ? `${c.bar}` : "bg-stone-300 dark:bg-stone-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active question */}
            {!allDone || reviewMode ? (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-stone-700 dark:text-stone-300 uppercase tracking-wider bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                      Câu {activeQ + 1} / {quiz.length}
                    </span>
                    {qSubmitted && (
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${qCorrect ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400"}`}>
                        {qCorrect ? "✓ Đúng rồi!" : "✗ Chưa đúng"}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-relaxed">{q.question}</p>
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, oi) => {
                    const isSelected = qSelected === oi;
                    const isCorrectOpt = oi === q.correct;
                    let cls = "border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800";
                    if (qSubmitted) {
                      if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400 font-semibold";
                      else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400 font-semibold";
                      else cls = "border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400";
                    } else if (isSelected) {
                      // Fixed high-contrast style, independent of the lesson's decorative
                      // accent color - the "stone" accent (most common) was nearly
                      // identical to the unselected style, leaving no visible confirmation
                      // that a tap registered before the user hits "Kiểm tra".
                      cls = "border-2 border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold";
                    }
                    return (
                      <button
                        key={oi}
                        disabled={qSubmitted}
                        onClick={() => choose(activeQ, oi)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-4 cursor-pointer font-medium text-base ${cls}`}
                      >
                        <span className="w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center flex-shrink-0 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-300">
                          {["A", "B", "C", "D"][oi]}
                        </span>
                        <span className="flex-1 text-base leading-snug">{opt}</span>
                        {qSubmitted && isCorrectOpt && <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">✓</span>}
                        {qSubmitted && isSelected && !isCorrectOpt && <span className="text-rose-600 dark:text-rose-400 font-bold text-xl">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {qSubmitted && (
                  <div className={`rounded-xl p-4 text-sm leading-relaxed border ${qCorrect ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"}`}>
                    <p className="font-bold mb-1.5">{qCorrect ? "Chính xác!" : "Giải thích:"}</p>
                    {/* Contrast the learner's own wrong pick against the correct
                        one before explaining - naming the exact misconception
                        they just revealed, not just restating the right answer. */}
                    {!qCorrect && qSelected !== null && (
                      <p className="mb-2 pb-2 border-b border-rose-200 dark:border-rose-900">
                        <span className="font-semibold">Bạn chọn:</span> "{q.options[qSelected]}"
                        <br />
                        <span className="font-semibold">Đáp án đúng:</span> "{q.options[q.correct]}"
                      </p>
                    )}
                    <p>{q.explanation}</p>
                  </div>
                )}

                {!qSubmitted ? (
                  <button
                    disabled={qSelected === null}
                    onClick={() => verify(activeQ)}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all cursor-pointer ${
                      qSelected !== null ? `${c.btn}` : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    Kiểm tra →
                  </button>
                ) : (
                  <div className="flex gap-3">
                    {!qCorrect && (
                      <button
                        onClick={() => retry(activeQ)}
                        className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border-2 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                      >
                        Thử lại →
                      </button>
                    )}
                    {reviewMode && allDone ? (
                      <button
                        onClick={() => setReviewMode(false)}
                        className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer`}
                      >
                        ← Quay lại kết quả
                      </button>
                    ) : (
                      activeQ < quiz.length - 1 && (
                        <button
                          onClick={() => setActiveQ(activeQ + 1)}
                          className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer`}
                        >
                          Câu tiếp theo →
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Completion card */
              <div className={`rounded-2xl border p-7 text-center space-y-4 ${score === quiz.length ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900" : "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900"}`}>
                <div className="text-5xl">{score === quiz.length ? "★" : score >= quiz.length * 0.7 ? "+" : "↑"}</div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">Hoàn thành!</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{score}/{quiz.length} câu đúng</p>
                </div>
                <div className="flex gap-2 justify-center">
                  {results.map((ok, i) => (
                    <button
                      key={i}
                      onClick={() => (ok ? viewQuestion(i) : retry(i))}
                      title={ok ? "Xem lại câu này" : "Thử lại câu này"}
                      className={`w-9 h-9 rounded-full text-sm flex items-center justify-center text-white font-bold cursor-pointer ${ok ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-400 hover:bg-rose-500"}`}
                    >
                      {ok ? "✓" : "✗"}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link href="/dashboard" className="py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold text-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                    Dashboard
                  </Link>
                  {lesson.nextSlug ? (
                    <Link href={`/bai-hoc/${lesson.nextSlug}`} className={`py-3.5 rounded-xl text-white text-sm font-bold text-center ${c.btn} transition-colors`}>
                      Bài tiếp →
                    </Link>
                  ) : (
                    <div className="py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-sm font-bold text-center">Sắp ra mắt</div>
                  )}
                </div>
                <button
                  onClick={restartQuiz}
                  className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wide transition-colors cursor-pointer"
                >
                  ↺ Làm lại từ đầu
                </button>
              </div>
            )}

            {/* Mini nav between questions */}
            {(!allDone || reviewMode) && quiz.length > 1 && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wide mb-3">Các câu hỏi</div>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => viewQuestion(i)}
                      className={`h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        i === activeQ
                          ? `${c.bar} text-white`
                          : submitted[i]
                          ? results[i] ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <FloatingContact />
      <LessonTour userId={userId} />
    </div>
  );
}
