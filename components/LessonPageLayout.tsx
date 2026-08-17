"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, Circle, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { markLessonComplete, saveQuizAnswers, getQuizAnswers, clearQuizAnswers } from "@/lib/progress";
import { firstAttemptResults, firstAttemptScore } from "@/lib/quiz-scoring";
import FloatingContact from "@/components/FloatingChatbot";
import StageTipsBanner from "@/components/StageTipsBanner";
import ReadingProgress from "@/components/ReadingProgress";
import BookmarkButton from "@/components/BookmarkButton";
import ManualLessonFlagButton from "@/components/ManualLessonFlagButton";
import LessonStatsHover from "@/components/LessonStatsHover";
import LessonNotes from "@/components/LessonNotes";
import TextHighlightMenu from "@/components/TextHighlightMenu";
import LessonHighlightsList from "@/components/LessonHighlightsList";
import { getLessonHighlights, type LessonHighlight } from "@/lib/lesson-highlights";
import { useLessonHighlightPaint } from "@/lib/hooks/useLessonHighlightPaint";
import { LessonCompletionContext } from "@/lib/lesson-completion-context";
import { isPreviewLessonSlug } from "@/lib/preview-lessons";
import { markLessonComplete as markLessonCompleteSupabase } from "@/lib/supabase-progress";
import { getLessonProgress } from "@/lib/supabase-progress";
import { queueOfflineCompletion, removeOfflineCompletion } from "@/lib/offline-sync";
import { recalculateUserStats } from "@/lib/supabase-user";
import { updateStreak, MAX_STREAK_FREEZES } from "@/lib/supabase-streak";
import { maybeAwardTechCardDrop } from "@/lib/tech-cards";
import { getReadingProgress, updateReadingProgress } from "@/lib/supabase-reading";
import { recordQuizMistake } from "@/lib/quiz-mistakes";
import { getRecallItemsAction } from "@/lib/recall-actions";
import type { RecallItem } from "@/lib/recall-schedule";
import RecallCard from "@/components/RecallCard";
import LessonTour from "@/components/LessonTour";
import FontSizeControl, { loadFontScale } from "@/components/FontSizeControl";
import ReadingModeControl, { loadReadingMode, type ReadingMode } from "@/components/ReadingModeControl";
import { setTheme } from "@/lib/theme";
import LessonFeedbackInline from "@/components/LessonFeedbackInline";
import LessonTableOfContents from "@/components/LessonTableOfContents";
import { getLessonDisplayLabel } from "@/lib/lesson-labels";
import ShareCompletionButton from "@/components/ShareCompletionButton";
import WisdomCardFlip from "@/components/WisdomCardFlip";
import type { QuizQuestion } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";

export type { QuizQuestion };

export interface LessonMeta {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  // Body-only reading estimate (lib/lesson-reading.js). Drives the "còn ~X
  // phút" countdown, which tracks scrolling the article - so it must exclude
  // the quiz, unlike the `totalMinutes` shown on dashboard cards.
  readingMinutes?: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  emoji: string;
  day: number;
  // Cần cho nhãn hiển thị: bài case không thuộc chặng nào nên chỉ trường này
  // phân biệt được chúng, và getLessonDisplayLabel không có cách nào khác.
  track?: "personal" | "professional" | "bonus";
  label?: string;
  recallDay?: number;
  accent: string;
  slug?: string;
  nextSlug?: string;
  nextTitle?: string;
  sections?: import("@/lib/lesson-types").LessonSectionBlock[];
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
  const { t } = useI18n();
  const c = ACCENTS[lesson.accent] ?? ACCENTS.indigo;
  const persistedLessonId = lesson.slug ? CANONICAL_LESSON_IDS_BY_SLUG[lesson.slug] ?? lesson.id : lesson.id;

  const [selected, setSelected]   = useState<(number | null)[]>(new Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [results, setResults]     = useState<boolean[]>(new Array(quiz.length).fill(false));
  // Kết quả lần trả lời ĐẦU TIÊN của từng câu - xem QuizAnswers.firstResults.
  // `results` là trạng thái sau khi thử lại; đây là thứ được chấm.
  //
  // Ghi một lần rồi không đổi nữa, kể cả khi người học bấm "Làm lại từ đầu":
  // xoá nó đi là mở lại đúng lối tắt vừa bịt. Nó cũng được lưu xuống
  // localStorage cùng các câu trả lời, nên tải lại trang giữa chừng cũng
  // không rửa được điểm.
  const [firstResults, setFirstResults] = useState<(boolean | null)[]>(new Array(quiz.length).fill(null));
  const [activeQ, setActiveQ]     = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  // True only once the learner explicitly moves past the last question's
  // explanation (via "Xem kết quả →"). Deriving the completion-card switch
  // straight from `allDone` (all questions submitted) instead flips it the
  // instant the last question is verified, hiding that question's own
  // explanation before it ever renders - same bug class as the modal's
  // `allDone` further down in this file used to have.
  const [finished, setFinished] = useState(false);
  const [readPct, setReadPct]     = useState(0);
  const [userId, setUserId]       = useState<string | null>(null);
  // Ba trạng thái chứ không phải `!userId`: lúc mới mount thì vòng
  // getUser() chưa trả lời, và khách chưa đăng nhập trông y hệt người đã đăng
  // nhập trong khoảnh khắc đó. Phân biệt được "chưa biết" với "biết là khách"
  // là điều kiện để không nháy tấm thẻ mời đăng ký vào mặt người đang có
  // phiên, và để không đi lưu tiến độ cho người không có chỗ nào để lưu.
  const [authState, setAuthState] = useState<"unknown" | "guest" | "member">("unknown");
  const [recallItems, setRecallItems] = useState<RecallItem[]>([]);
  const [highlights, setHighlights] = useState<LessonHighlight[]>([]);
  // Admin-set video URL lives in its own table (see lib/supabase-lesson-videos.ts)
  // rather than the static lesson data, so it's fetched separately here instead
  // of adding a DB round-trip to the shared getLessonBySlug hot path.
  const [adminVideoUrl, setAdminVideoUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/lessons/${lesson.id}/video`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.videoUrl) setAdminVideoUrl(data.videoUrl);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [lesson.id]);
  const [fontScale, setFontScale] = useState(() => (typeof window === "undefined" ? 1.125 : loadFontScale()));
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => (typeof window === "undefined" ? "light" : loadReadingMode()));
  // Keeps the underlying light/dark theme in sync with a previously-chosen
  // reading mode on every load, in case it drifted (e.g. the site theme was
  // changed from Settings since the last visit) - "sepia" needs a light
  // base to look right, "dark" should actually be dark.
  useEffect(() => {
    if (readingMode === "dark") {
      setTheme("dark");
    }
  }, [readingMode]);
  const [quizCollapsed, setQuizCollapsed] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  // Paints the saved quotes back onto the lesson body, so a highlight shows
  // where the learner made it rather than only in the list underneath.
  useLessonHighlightPaint(articleRef, highlights);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const maxReachedRef = useRef(0);
  const savedMilestonesRef = useRef<Set<number>>(new Set());
  const zeroQuizCompletedRef = useRef(false);
  // A lesson only counts as done once BOTH the quiz is fully answered AND
  // the article has been scrolled to the very end - finishing the quiz
  // early (it's not necessarily the last thing on the page) used to mark
  // the lesson complete regardless of how much was actually read.
  const quizAllSubmittedRef = useRef(false);
  const quizFinalResultsRef = useRef<boolean[]>([]);
  const quizCompletionFiredRef = useRef(false);
  // Set by MidpointInteractive (the "Dừng & Kiểm tra" check embedded
  // mid-article) via LessonCompletionContext if this lesson has one - only
  // lessons with a midpoint question require it before completing.
  const hasMidpointRef = useRef(false);
  const midpointDoneRef = useRef(false);
  // Refs above are the source of truth tryFireCompletion reads synchronously
  // (avoids stale-closure issues); these state mirrors exist purely so the
  // completion checklist UI re-renders when they change.
  const [hasMidpoint, setHasMidpoint] = useState(false);
  const [midpointDone, setMidpointDone] = useState(false);

  // Kept parsed from the hand-authored `duration` string on purpose: this
  // number is written into the user's recorded study time on completion, and
  // swapping it for the (shorter, more accurate) computed estimate would
  // make new completions incomparable to every completion already recorded.
  const durationMin = parseInt(lesson.duration) || 5;
  // What the reader is actually shown. Falls back to durationMin for lessons
  // that bypass the generator and so have no computed estimate.
  const readingMin = lesson.readingMinutes ?? durationMin;
  const lessonLabel = lesson.label ?? getLessonDisplayLabel({ id: lesson.id, title: lesson.title, track: lesson.track }, t.lessonLabel);

  useEffect(() => {
    if (!lesson.recallDay) return;
    let cancelled = false;
    getRecallItemsAction(lesson.recallDay).then((items) => {
      if (!cancelled) setRecallItems(items);
    });
    return () => {
      cancelled = true;
    };
  }, [lesson.recallDay]);

  useEffect(() => {
    getCurrentUser().then(async (user) => {
      if (!user) {
        // Bài xem thử (lib/preview-lessons.ts) dựng được mà không cần phiên.
        // Mọi thứ bên dưới đều là đọc/ghi tiến độ của một tài khoản, nên
        // chúng bị bỏ qua - phần đọc bài vẫn chạy đủ.
        setAuthState("guest");
        return;
      }
      setAuthState("member");
      setUserId(user.id);

      getLessonHighlights(user.id, persistedLessonId)
        .then(setHighlights)
        .catch((error) => console.error("Error loading highlights:", error));

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
      //
      // Just as important: restoring the *visual* state above isn't enough
      // on its own - tryFireCompletion() gates on quizAllSubmittedRef/
      // midpointDoneRef, refs that only ever got set inside verify()/
      // markMidpointDone() during THIS session. A learner who fully
      // finished a lesson (quiz + midpoint + scroll) in a past visit, then
      // left and came back, had those refs reset to false on the fresh
      // mount with no way to become true again short of redoing everything
      // - even though the lesson is already marked done in `user_progress`.
      // That's the "did everything right, still not counted" bug: whenever
      // Supabase says this lesson is already completed, short-circuit every
      // gate to done immediately instead of re-deriving it from local state.
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
          // Bản ghi cũ (lưu trước khi có firstResults) không có trường này.
          // Khi đó lấy `results` làm lần đầu: với một bài đã làm xong từ
          // trước thì đó là dữ liệu tốt nhất còn lại, và nó không tệ hơn
          // hành vi cũ - vốn chấm thẳng trên `results`.
          if (saved.firstResults?.length === quiz.length) {
            setFirstResults(saved.firstResults);
          } else {
            setFirstResults(saved.results.map((r, i) => (saved.submitted[i] ? r : null)));
          }
          if (saved.submitted.every(Boolean)) {
            quizAllSubmittedRef.current = true;
            quizFinalResultsRef.current = saved.results;
          }
        }
        try {
          const progress = await getLessonProgress(user.id, persistedLessonId);
          if (progress?.completed) {
            if (!saved || saved.submitted.length !== quiz.length) {
              // No per-question record available (e.g. different device/browser) -
              // fall back to a guess from the aggregate score so the completion
              // card at least renders instead of forcing a redo.
              const quizScore = Math.min(progress.quiz_score ?? quiz.length, quiz.length);
              setSubmitted(new Array(quiz.length).fill(true));
              setResults(quiz.map((_, i) => i < quizScore));
            }
            quizCompletionFiredRef.current = true;
            quizAllSubmittedRef.current = true;
            midpointDoneRef.current = true;
            setMidpointDone(true);
            maxReachedRef.current = 100;
            setReadPct(100);
          }
        } catch (error) {
          console.error("Error fetching lesson progress:", error);
        }
      } else {
        try {
          const progress = await getLessonProgress(user.id, persistedLessonId);
          zeroQuizCompletedRef.current = !!progress?.completed;
          if (progress?.completed) {
            quizCompletionFiredRef.current = true;
            maxReachedRef.current = 100;
            setReadPct(100);
          }
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
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScroll = docH - winH;
      const pct = totalScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / totalScroll) * 100))) : 100;

      // Check if scrolled to bottom (with larger buffer for better detection)
      const isAtBottom = scrollTop + winH >= docH - 10;

      if (isAtBottom) {
        setReadPct(100);
        maxReachedRef.current = 100;
      } else {
        setReadPct(pct);
        if (pct > maxReachedRef.current) {
          maxReachedRef.current = pct;
        }
      }

      // Try to complete when reaching bottom or 100%
      if (maxReachedRef.current >= 100) {
        tryFireCompletion();
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

  // Robust "reached the very end" detection via IntersectionObserver on a
  // sentinel at the bottom of the article, instead of relying solely on the
  // scroll handler's docH-winH percentage math above. That calculation is
  // fragile to layout shifts that happen without a scroll event - notably
  // the reading-size control below applies `zoom` to the whole article,
  // which changes document.documentElement.scrollHeight the instant the
  // font scale changes, silently moving the "100%" goalpost. An
  // IntersectionObserver re-evaluates on any layout change, not just
  // 'scroll' events, so it can't be fooled by that the same way.
  useEffect(() => {
    const el = bottomSentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (maxReachedRef.current < 100) {
          maxReachedRef.current = 100;
          setReadPct(100);
        }
        tryFireCompletion();
      },
      // Generous bottom rootMargin so "reached the end" registers a bit
      // before the very last pixel is on screen - guards against readers
      // who stop scrolling once the last paragraph is visible but not
      // pinned to the exact bottom, and against sub-pixel/zoom rounding
      // that could otherwise leave the scroll-% math stuck at 98-99.
      { threshold: 0, rootMargin: "0px 0px 400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync readPct with maxReachedRef to ensure checklist updates
  useEffect(() => {
    if (maxReachedRef.current >= 100 && readPct < 100) {
      setReadPct(100);
    }
  }, [readPct]);

  const handleMilestone = async (milestone: number) => {
    if (!userId || savedMilestonesRef.current.has(milestone)) return;
    savedMilestonesRef.current.add(milestone);

    // When reaching 100% milestone, force update checklist immediately
    if (milestone === 100) {
      setReadPct(100);
      maxReachedRef.current = 100;
      tryFireCompletion();
    }
  };

  const remainMin = Math.max(0, Math.ceil(readingMin * (1 - readPct / 100)));
  const submittedCount = submitted.filter(Boolean).length;
  const score = results.filter(Boolean).length;
  // Điểm được ghi vào user_progress - cùng một hàm mà chỗ lưu dùng, xem
  // lib/quiz-scoring.ts.
  const firstScore = firstAttemptScore(results, firstResults);
  const allDone = submittedCount === quiz.length;
  const pct = quiz.length > 0 ? Math.round((submittedCount / quiz.length) * 100) : 0;

  // Single source of truth for "is this lesson complete", computed from the
  // EXACT SAME state the completion checklist renders from (readPct,
  // submittedCount, midpointDone) - not the separate refs tryFireCompletion
  // reads. Previously completion was fired only from scattered event
  // handlers (quiz submit, scroll, midpoint button), so if the last
  // criterion flipped without one of those specific events re-running, the
  // learner would see all three checkmarks green yet the lesson never
  // registered as done. Driving it off this derived value guarantees: if
  // the user sees every box checked, completion fires. The refs are still
  // synced here so completeLessonInSupabase persists the right quiz score.
  const quizCriterionMet = quiz.length === 0 || submittedCount === quiz.length;
  // KHÔNG có `|| quizCriterionMet` ở đây, dù nó từng có.
  //
  // Với nhánh đó, làm xong quiz là tự thoả mãn luôn tiêu chí "đã đọc hết bài",
  // nên ba ô trong checklist thực chất chỉ còn hai - và ô tự tick hộ lại đúng
  // là ô nói với người học rằng họ đã đọc. Comment ngay phía trên (và bản thân
  // checklist) nói rõ điều kiện là CẢ HAI.
  //
  // Bài ngắn không cuộn được vẫn hoàn thành bình thường: hàm onScroll đặt
  // pct = 100 khi `totalScroll <= 0`, và IntersectionObserver ở cuối bài bắn
  // ngay khi mốc cuối lọt vào khung nhìn. Nhánh này chỉ chặn đúng trường hợp
  // nhảy thẳng xuống quiz mà chưa từng đi qua thân bài.
  const scrolledFully = readPct >= 90 || maxReachedRef.current >= 90;
  const midpointCriterionMet = !hasMidpoint || midpointDone;
  const allCriteriaMet = scrolledFully && quizCriterionMet && midpointCriterionMet;

  // Mirrors LessonTableOfContents' own "at least 3 headings" gate - computed
  // here too so the wrapper column that reserves its layout space can skip
  // rendering entirely when there's nothing to show, instead of reserving
  // 256px of dead space on every lesson without a real TOC.
  const hasToc = (lesson.sections?.filter((s) => s.type === "heading").length ?? 0) >= 3;

  useEffect(() => {
    if (!allCriteriaMet) return;
    if (quizCompletionFiredRef.current || zeroQuizCompletedRef.current) return;

    quizCompletionFiredRef.current = true;
    zeroQuizCompletedRef.current = true;
    quizAllSubmittedRef.current = true;
    quizFinalResultsRef.current = results;
    maxReachedRef.current = 100;
    midpointDoneRef.current = true;

    markLessonComplete(persistedLessonId, durationMin);

    let cancelled = false;
    const RETRY_DELAYS_MS = [1500, 4000, 8000];
    async function attemptSave() {
      // Chấm trên lần trả lời ĐẦU, không phải trạng thái sau khi thử lại.
      const finalResults = quiz.length > 0 ? firstAttemptResults(results, firstResults) : [];
      for (let attempt = 0; ; attempt++) {
        if (cancelled) return;
        const result = await completeLessonInSupabase(finalResults);
        // Khách xem thử: không có gì để lưu, và thử lại bốn lần cũng không làm
        // xuất hiện một tài khoản. Tấm thẻ mời đăng ký ở cuối bài là câu trả
        // lời cho trường hợp này, không phải một cái toast báo lỗi.
        if (result === "guest" || result === "saved" || cancelled) return;
        if (attempt >= RETRY_DELAYS_MS.length) {
          quizCompletionFiredRef.current = false;
          zeroQuizCompletedRef.current = false;
          toast.error(t.lessonLayout.saveFailed);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
      }
    }
    void attemptSave();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCriteriaMet]);

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
    // Chỉ ghi lần đầu. `??=` ở đây là toàn bộ khác biệt giữa một điểm số đo
    // được và một điểm số ai cũng đạt 100.
    const newFirst = [...firstResults];
    if (newFirst[qi] === null || newFirst[qi] === undefined) newFirst[qi] = ok;
    setResults(newResults);
    setSubmitted(newSubmitted);
    setFirstResults(newFirst);

    void recordQuizMistake(persistedLessonId, qi, ok, quiz[qi].question);
    saveQuizAnswers(persistedLessonId, {
      selected,
      submitted: newSubmitted,
      results: newResults,
      firstResults: newFirst,
    });
    if (newSubmitted.every(Boolean)) {
      setReviewMode(false);
      quizAllSubmittedRef.current = true;
      quizFinalResultsRef.current = newResults;
      // Không đặt readPct = 100 ở đây nữa. Nộp câu cuối không chứng minh được
      // người học đã đọc thân bài; đây là vế thứ hai của cùng một chỗ tự tick
      // hộ đã gỡ ở `scrolledFully`, và để lại một mình nó thì cũng đủ để tiêu
      // chí đọc bài không còn nghĩa gì.

      const stillNeedsMidpoint = hasMidpoint && !midpointDone;
      if (stillNeedsMidpoint) {
        toast.info(t.lessonLayout.quizDoneMidpointLeft);
      }
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
    setFinished(false);
    saveQuizAnswers(persistedLessonId, {
      selected: newSelected,
      submitted: newSubmitted,
      results,
      firstResults,
    });
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
  //
  // `firstResults` KHÔNG được xoá ở đây, và đó là chủ ý: nút này để học lại,
  // không phải để xoá dấu vết. Vì thế cũng không gọi clearQuizAnswers nữa mà
  // ghi đè bằng một bản ghi rỗng còn giữ lần trả lời đầu - xoá cả khoá đi thì
  // tải lại trang là bảng điểm sạch trơn.
  function restartQuiz() {
    const freshSelected = new Array(quiz.length).fill(null);
    const freshSubmitted = new Array(quiz.length).fill(false);
    const freshResults = new Array(quiz.length).fill(false);
    setSelected(freshSelected);
    setSubmitted(freshSubmitted);
    setResults(freshResults);
    setActiveQ(0);
    setReviewMode(false);
    setFinished(false);
    if (firstResults.some((r) => r !== null && r !== undefined)) {
      saveQuizAnswers(persistedLessonId, {
        selected: freshSelected,
        submitted: freshSubmitted,
        results: freshResults,
        firstResults,
      });
    } else {
      clearQuizAnswers(persistedLessonId);
    }
  }

  // Returns whether the completion (user_progress row - the ONLY thing the
  // dashboard reads to show a lesson as "Xong") was successfully persisted.
  // Callers use this to reset the fired-guard and retry on failure instead
  // of leaving a lesson permanently unsaved for the session.
  async function completeLessonInSupabase(finalResults: boolean[]): Promise<"saved" | "failed" | "guest"> {
    // Don't trust the `userId` state here - it's only set once the mount
    // effect's getCurrentUser() round trip resolves, and a fast
    // reader can finish the quiz before that happens. Falling back to
    // state left this silently no-op-ing: the quiz still showed as done
    // locally (markLessonComplete above writes to localStorage regardless),
    // but nothing was ever saved to Supabase, so the dashboard's "next
    // lesson" greeting kept saying the lesson was never started. Resolve
    // the current user directly instead of relying on state timing.
    let uid = userId;
    if (!uid) {
      const user = await getCurrentUser();
      // "Không có phiên" KHÁC "ghi hỏng", và trước đây cả hai cùng trả false.
      // Với bài xem thử thì khách đọc hết là chuyện bình thường, nhưng phía
      // gọi lại hiểu false là ghi hỏng: nó thử lại bốn lần trong 13,5 giây rồi
      // báo "Lưu thất bại" - đúng lúc người ta vừa đọc xong bài đầu tiên.
      if (!user) {
        setAuthState("guest");
        return "guest";
      }
      uid = user.id;
      setUserId(uid);
      setAuthState("member");
    }

    const finalScore =
      quiz.length > 0
        ? Math.round((finalResults.filter(Boolean).length / quiz.length) * 100)
        : 100;

    // The critical write: this row is what makes the lesson show as
    // completed everywhere. If it fails, report failure so the caller can
    // retry - nothing else matters if this didn't land.
    try {
      await markLessonCompleteSupabase(uid, persistedLessonId, finalScore, durationMin * 60);
      removeOfflineCompletion(uid, persistedLessonId);

      // Track weekly quests progress
      if (typeof window !== "undefined") {
        const weeklyLessonsKey = `thtcdn_weekly_completed_lessons_${uid}`;
        const raw = window.localStorage.getItem(weeklyLessonsKey) ?? "[]";
        try {
          const completedList = JSON.parse(raw);
          completedList.push({ lessonId: persistedLessonId, timestamp: Date.now() });
          window.localStorage.setItem(weeklyLessonsKey, JSON.stringify(completedList));
        } catch (e) {
          window.localStorage.setItem(weeklyLessonsKey, JSON.stringify([{ lessonId: persistedLessonId, timestamp: Date.now() }]));
        }

        // Track perfect quizzes streak (100% score)
        const weeklyPerfectKey = `thtcdn_weekly_perfect_quizzes_${uid}`;
        let perfectStreak = Number(window.localStorage.getItem(weeklyPerfectKey) ?? "0");
        if (finalScore === 100) {
          perfectStreak += 1;
        } else {
          perfectStreak = 0; // reset on any score less than 100%
        }
        window.localStorage.setItem(weeklyPerfectKey, String(perfectStreak));
        
        window.dispatchEvent(new Event("thtcdn_weekly_quests_updated"));
      }
    } catch (error) {
      console.error("Error saving lesson completion, queued for offline sync:", error);
      queueOfflineCompletion(uid, persistedLessonId, finalScore, durationMin * 60);
      return "failed";
    }

    // XP/level and streak are enrichment on top of the completion that's
    // already safely saved above - a failure here must NOT report the
    // lesson as unsaved (it's saved) or block anything. Recompute best-effort.
    try {
      await recalculateUserStats(uid);
      const streakResult = await updateStreak(uid);
      if (streakResult.freezeUsedThisUpdate) {
        const remaining = MAX_STREAK_FREEZES - (streakResult.freezes_used ?? 0);
        toast.info(format(t.miscUi.lessonPageLayout.streakFreezeUsed, { streak: streakResult.current_streak, remaining }));
      }
      const cardDrop = await maybeAwardTechCardDrop(uid, finalScore);
      if (cardDrop.dropped && cardDrop.card) {
        toast.success(format(t.miscUi.lessonPageLayout.cardDropped, { ticker: cardDrop.card.ticker, name: cardDrop.card.name }));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("thtcdn:finance-card-dropped", { detail: cardDrop.card }));
        }
      }
    } catch (error) {
      console.error("Error updating stats/streak after completion (lesson still saved):", error);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: 10, label: t.miscUi.lessonPageLayout.lessonCompletedLabel } }));
    }
    toast.success(t.lessonLayout.saved);
    return "saved";
  }

  // Pure predicate: are all applicable completion criteria met right now?
  // Does NOT save anything - the single `allCriteriaMet` useEffect above is
  // the ONE place that persists completion (with retry-on-failure).
  // Consolidating every completion write into that one effect is deliberate:
  // the reported "checklist all green but lesson never saved / resets on
  // revisit" bug came from several independent code paths (this function,
  // the scroll handler, the midpoint button, a separate zero-quiz effect)
  // each firing - or failing to fire - completion out of sync with each
  // other and with the checklist the user actually sees. Now there is one
  // source of truth (allCriteriaMet) and one writer.
  function tryFireCompletion(): boolean {
    return allCriteriaMet;
  }

  // Exposed to descendants (via LessonCompletionContext) so
  // MidpointInteractive - the "Dừng & Kiểm tra" check embedded mid-article -
  // can tell this layout it exists and has been answered. Only flips state;
  // the completion effect reacts to midpointDone / hasMidpoint changing.
  function registerMidpoint() {
    hasMidpointRef.current = true;
    setHasMidpoint(true);
  }
  function markMidpointDone() {
    midpointDoneRef.current = true;
    setMidpointDone(true);
  }

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
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/hoc-bai"
              aria-label={t.lessonLayout.backAria}
              className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap w-9 h-9 sm:w-auto sm:px-4 sm:py-2 justify-center rounded-full sm:rounded-lg border-2 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-900 dark:hover:text-stone-100 bg-white dark:bg-stone-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{t.lessonLayout.back}</span>
            </Link>
            <div className="min-w-0">
              <p className="font-extrabold text-stone-900 dark:text-stone-100 text-base sm:text-lg leading-tight line-clamp-1">{lesson.title}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 hidden sm:block font-semibold">{lessonLabel}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end">
            {/* Reading font-size control */}
            <FontSizeControl scale={fontScale} onChange={setFontScale} />

            {/* Kindle-style reading theme: sáng / dịu nhẹ (sepia) / tối */}
            <ReadingModeControl mode={readingMode} onChange={setReadingMode} />

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
                    ? format(t.lessonLayout.readMinutes, { minutes: readingMin })
                    : format(t.lessonLayout.readProgress, { percent: readPct, minutes: remainMin })
                  : t.lessonLayout.readDone}
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Article ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <TextHighlightMenu
            containerRef={articleRef}
            lessonId={persistedLessonId}
            lessonSlug={lesson.slug || ""}
            onCreated={(h) => setHighlights((prev) => [...prev, h])}
          />

          <article ref={articleRef} className="flex-1 min-w-0 space-y-8 pb-20 lg:pb-0">
            {/* Hero */}
            <div className={`rounded-2xl ${c.bg} border-2 ${c.border} p-8 sm:p-10`}>
              <div className={`text-sm font-extrabold uppercase tracking-widest ${c.text} mb-3`}>
                {lessonLabel} · {lesson.difficulty}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-white leading-tight mb-4">
                {lesson.title}
              </h1>
              <p className="text-stone-700 dark:text-stone-100 text-lg sm:text-xl leading-relaxed">{lesson.subtitle}</p>
              <div className="mt-7 pt-5 border-t-2 border-stone-300 dark:border-stone-700 space-y-4">
                <div className="flex items-center gap-4 text-base text-stone-700 dark:text-stone-100 font-semibold">
                  <span>{format(t.lessonLayout.durationRead, { duration: lesson.duration })}</span>
                  <span>·</span>
                  <span>{format(t.lessonLayout.quizCount, { count: quiz.length })}</span>
                  <span>·</span>
                  <span className="font-bold text-stone-900 dark:text-white">
                    {readPct === 0
                      ? t.lessonLayout.notStarted
                      : readPct >= 100
                        ? t.lessonLayout.readDone
                        : format(t.lessonLayout.readPercent, { percent: readPct })}
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
                  <p className="text-sm text-stone-700 dark:text-stone-100 font-semibold">
                    {t.lessonLayout.remainingPart1}
                    <strong className="text-stone-900 dark:text-white">{format(t.lessonLayout.remainingMinutes, { minutes: remainMin })}</strong>
                    {t.lessonLayout.remainingPart2}
                  </p>
                )}
                {(() => {
                  // Dùng chung đúng `scrolledFully` mà điều kiện hoàn thành
                  // dùng, thay vì một biến cùng tên che nó với ngưỡng 95 và
                  // chỉ đọc readPct. Hai chỗ lệch nhau theo hai hướng: từ 90
                  // tới 95 thì bài đã lưu xong mà ô vẫn chưa tick, còn cuộn
                  // ngược lên thì ô tự bỏ tick dù bài đã hoàn thành - vì
                  // readPct là vị trí hiện tại, maxReachedRef mới là chỗ xa
                  // nhất đã tới. Đây đúng là họ lỗi "checklist nói một đằng,
                  // dữ liệu lưu một nẻo" mà comment ở trên nói đã dẹp.
                  const sidebarQuizDone = quiz.length > 0 && submittedCount === quiz.length;
                  const checklistItems: { label: string; done: boolean }[] = [
                    { label: t.lessonLayout.checkReadAll, done: scrolledFully },
                  ];
                  if (hasMidpoint) {
                    checklistItems.push({ label: t.lessonLayout.checkMidpoint, done: midpointDone });
                  }
                  if (quiz.length > 0) {
                    checklistItems.push({
                      label: format(t.lessonLayout.checkQuiz, { done: submittedCount, total: quiz.length }),
                      done: sidebarQuizDone,
                    });
                  }
                  const allDoneNow = checklistItems.every((it) => it.done);

                  return (
                    <div className={`rounded-xl border-2 ${allDoneNow ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : c.border} ${allDoneNow ? "" : c.bg} px-4 py-3.5 space-y-2.5`}>
                      <p className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${allDoneNow ? "text-emerald-700 dark:text-emerald-400" : c.text}`}>
                        <span>{allDoneNow ? "✅" : "⚠️"}</span>
                        {t.lessonLayout.checklistTitle}
                      </p>
                      <ul className="space-y-1.5">
                        {checklistItems.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            {item.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-stone-400 dark:text-stone-600 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm sm:text-base font-bold ${
                                item.done ? "text-emerald-700 dark:text-emerald-400 line-through decoration-2" : c.text
                              }`}
                            >
                              {item.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Spaced-repetition recall - surfaces concepts from ~5 and ~12
                lessons back before introducing new material, so review is
                distributed across the course instead of only happening once
                at the end of a chặng. */}
            {recallItems.length > 0 && <RecallCard items={recallItems} />}

            {/* Tài Tài auto-tip */}
            <div data-tour="lesson-tai-tai">
              <StageTipsBanner lessonId={persistedLessonId} lessonTitle={lesson.title} />
            </div>

            {/* 📺 Lesson Video Player / Curated Video Section */}
            <div className="my-6 rounded-2xl overflow-hidden border-2 border-stone-900 dark:border-stone-700 bg-stone-900 text-white p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold text-xs">▶️</span>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{t.lessonLayout.videoTitle}</h3>
                </div>
                <span className="text-[10px] font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded">{t.lessonLayout.videoBadge}</span>
              </div>

              {(() => {
                const vUrl = adminVideoUrl ?? (lesson as { videoUrl?: string }).videoUrl;
                // Admins may enter a full watch URL, a youtu.be link, or just
                // the bare video ID (see app/admin/videos placeholder text) -
                // normalize all of those to a real embeddable URL instead of
                // only handling the one "youtube.com/watch?v=" shape.
                const embedSrc = (() => {
                  if (!vUrl) return "";
                  if (vUrl.includes("/embed/")) return vUrl;
                  const watchMatch = vUrl.match(/[?&]v=([^&]+)/);
                  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
                  const pathMatch = vUrl.match(/youtu\.be\/([^?&/]+)/);
                  if (pathMatch) return `https://www.youtube.com/embed/${pathMatch[1]}`;
                  if (/^[\w-]{6,}$/.test(vUrl)) return `https://www.youtube.com/embed/${vUrl}`;
                  return vUrl;
                })();
                return vUrl ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-stone-800 bg-black">
                    <iframe
                      src={embedSrc}
                      title={lesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <p className="text-stone-300">
                      {t.lessonLayout.videoNote}
                    </p>
                    <a
                      href={`https://www.youtube.com/results?search_query=T%E1%BB%B1+h%E1%BB%8Dc+t%C3%A0i+ch%C3%ADnh+${encodeURIComponent(lesson.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.lessonLayout.videoCta}</span>
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* Content - `zoom` (not fontSize) so the reading-size control
                rescales every lesson page uniformly regardless of the
                explicit Tailwind text-sm/lg/xl classes each hand-written
                lesson sets on its own child elements. */}
            <div
              className={`space-y-8 text-stone-800 dark:text-stone-200 leading-relaxed text-lg sm:text-xl font-medium ${readingMode === "sepia" ? "reading-sepia" : ""}`}
              style={{ zoom: fontScale }}
            >
              <LessonCompletionContext.Provider value={{ registerMidpoint, markMidpointDone }}>
                {children}
              </LessonCompletionContext.Provider>
            </div>

            {/* Feedback form at the bottom */}
            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
              <LessonFeedbackInline lessonId={persistedLessonId} userId={userId} />
            </div>

            {/* Mobile quiz prompt */}
            <div className="lg:hidden mt-8 border-t border-stone-200 dark:border-stone-800 pt-6">
              <p className="text-base text-stone-500 dark:text-stone-400 text-center">{t.lessonLayout.scrollForQuiz}</p>
            </div>

            {/* Bottom-of-article sentinel for IntersectionObserver-based
                scroll completion - see the effect above. Must be the very
                last thing in the article. */}
            <div ref={bottomSentinelRef} className="h-px" aria-hidden="true" />
          </article>
          </div>

          {/* ── RIGHT: Table of Contents (XL+) ─────────────────────────── */}
          {/* Most lessons are quiz/explanation-based (no `sections`), or
              have fewer than 3 headings - LessonTableOfContents renders
              null for those, but this wrapper used to render unconditionally
              regardless, reserving 256px + gap of dead flex space between
              the article and quiz sidebar on every lesson without a real
              TOC. That's what squeezed both columns narrow with a large
              blank gap between them on laptop-width screens (reported:
              "phần các bài học trên laptop screen bị co lại"). Only
              reserving the space when there's an actual TOC to show fixes it. */}
          {hasToc && (
            <div className="hidden xl:block w-64 flex-shrink-0">
              <LessonTableOfContents sections={lesson.sections} />
            </div>
          )}

          {/* ── RIGHT: Quiz sidebar ────────────────────────────────── */}
          {/* max-h + overflow-y-auto so the sticky column scrolls internally
              once its content (notes + quiz + explanation + mini nav) is
              taller than the viewport - without this, anything past the
              fold (e.g. the "Câu tiếp theo" button) was stuck off-screen
              with no way to reach it, since a sticky element doesn't scroll
              on its own past its container's height.

              Every breakpoint here must be `xl`, matching the parent's
              `xl:flex-row`. They used to be `lg`, which meant that between
              1024px and 1279px the sidebar was still stacked *below* the
              article in a column, yet already sticky and clipped to viewport
              height - so it simply scrolled away instead of following, and a
              440px column sat oddly in a full-width stack. Sticky positioning
              only means anything once this is actually a side column. */}
          <aside data-tour="lesson-quiz" className="w-full xl:w-[440px] flex-shrink-0 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto space-y-4">
            {/* Lesson Notes */}
            <LessonNotes lessonId={persistedLessonId} lessonSlug={lesson.slug || ""} />

            {/* Saved text highlights / AI-content flags for this lesson */}
            <LessonHighlightsList
              highlights={highlights}
              onDeleted={(id) => setHighlights((prev) => prev.filter((h) => h.id !== id))}
            />

            {/* Quiz progress - collapsible */}
            <div className="bg-white/95 dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 overflow-hidden">
              <button
                onClick={() => setQuizCollapsed(!quizCollapsed)}
                className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-wide">{t.lessonLayout.quickCheck}</span>
                  <span className="text-base font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">{submittedCount}/{quiz.length}</span>
                </div>
                {quizCollapsed ? <ChevronDown className="w-5 h-5 text-stone-500 dark:text-stone-400" /> : <ChevronUp className="w-5 h-5 text-stone-500 dark:text-stone-400" />}
              </button>
              {!quizCollapsed && (
                <div className="p-6 pt-0">
              <div className="flex gap-2">
                {quiz.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => viewQuestion(i)}
                    title={submitted[i] ? t.lessonLayout.reviewQuestion : undefined}
                    className={`flex-1 h-3 rounded-full transition-all cursor-pointer ${
                      submitted[i]
                        ? results[i] ? "bg-emerald-500" : "bg-rose-500"
                        : i === activeQ ? `${c.bar}` : "bg-stone-300 dark:bg-stone-700"
                    }`}
                  />
                ))}
              </div>
                </div>
              )}
            </div>

            {/* Active question */}
            {!finished || reviewMode ? (
              <div className="bg-white/95 dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-stone-700 dark:text-stone-300 uppercase tracking-wider bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                      {format(t.lessonLayout.questionCounter, { current: activeQ + 1, total: quiz.length })}
                    </span>
                    {qSubmitted && (
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${qCorrect ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400"}`}>
                        {qCorrect ? t.lessonLayout.answerRight : t.lessonLayout.answerWrong}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-relaxed select-text">{q.question}</p>
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, oi) => {
                    const isSelected = qSelected === oi;
                    const isCorrectOpt = oi === q.correct;
                    let cls = "border-2 border-stone-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800";
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
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-4 cursor-pointer font-medium text-base select-text ${cls}`}
                      >
                        <span className="w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center flex-shrink-0 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-300 select-none">
                          {["A", "B", "C", "D"][oi]}
                        </span>
                        <span className="flex-1 text-base leading-snug select-text">{opt}</span>
                        {qSubmitted && isCorrectOpt && <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">✓</span>}
                        {qSubmitted && isSelected && !isCorrectOpt && <span className="text-rose-600 dark:text-rose-400 font-bold text-xl">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {qSubmitted && (
                  <div className={`rounded-xl p-4 text-sm leading-relaxed border ${qCorrect ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"}`}>
                    <p className="font-bold mb-1.5">{qCorrect ? t.lessonLayout.exactly : t.lessonLayout.explanation}</p>
                    {/* Contrast the learner's own wrong pick against the correct
                        one before explaining - naming the exact misconception
                        they just revealed, not just restating the right answer. */}
                    {!qCorrect && qSelected !== null && (
                      <p className="mb-2 pb-2 border-b border-rose-200 dark:border-rose-900">
                        <span className="font-semibold">{t.lessonLayout.youChose}</span> "{q.options[qSelected]}"
                        <br />
                        <span className="font-semibold">{t.lessonLayout.correctIs}</span> "{q.options[q.correct]}"
                      </p>
                    )}
                    <p>{q.explanation}</p>
                  </div>
                )}

                {/* Sticky to the bottom of the quiz sidebar's own scroll
                    container (see the `aside`'s xl:overflow-y-auto above) so
                    the action button is always in reach right after picking
                    an option, instead of requiring a scroll down to find it
                    and then back up to see the feedback - the exact
                    complaint from user feedback ("chọn đáp án phải lăn
                    xuống để click xác nhận... rồi lại lăn lên"). The
                    negative margin+matching padding cancels out the parent
                    card's own padding so this reaches the card's true edges
                    while staying flush against them, not floating with a
                    gap. */}
                <div className="sticky bottom-0 -mx-8 -mb-8 px-8 pb-6 pt-3 bg-gradient-to-t from-white dark:from-stone-900 from-70% to-transparent">
                  {!qSubmitted ? (
                    <button
                      disabled={qSelected === null}
                      onClick={() => verify(activeQ)}
                      className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all cursor-pointer shadow-lg ${
                        qSelected !== null ? `${c.btn}` : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed shadow-none"
                      }`}
                    >
                      {t.lessonLayout.check}
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      {!qCorrect && (
                        <button
                          onClick={() => retry(activeQ)}
                          className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-lg"
                        >
                          {t.lessonLayout.tryAgain}
                        </button>
                      )}
                      {reviewMode && finished ? (
                        <button
                          onClick={() => setReviewMode(false)}
                          className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer shadow-lg`}
                        >
                          {t.lessonLayout.backToResults}
                        </button>
                      ) : activeQ < quiz.length - 1 ? (
                        <button
                          onClick={() => setActiveQ(activeQ + 1)}
                          className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer shadow-lg`}
                        >
                          {t.lessonLayout.nextQuestion}
                        </button>
                      ) : (
                        !reviewMode && allDone && (
                          <button
                            onClick={() => setFinished(true)}
                            className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer shadow-lg`}
                          >
                            {t.lessonLayout.seeResults}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Completion card */
              <div className={`rounded-2xl border p-7 text-center space-y-4 ${score === quiz.length ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900" : "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900"}`}>
                <div className="text-5xl">{score === quiz.length ? "★" : score >= quiz.length * 0.7 ? "+" : "↑"}</div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">{t.lessonLayout.doneTitle}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{format(t.lessonLayout.doneScore, { score, total: quiz.length })}</p>
                  {/* Hai con số, và nói rõ con số nào được ghi lại.
                      Chỉ hiện khi chúng khác nhau: người làm đúng hết ngay lần
                      đầu không cần đọc một dòng giải thích về việc thử lại. */}
                  {firstScore !== score && (
                    <p className="text-stone-500 dark:text-stone-400 text-xs mt-2 leading-relaxed">
                      <strong className="text-stone-700 dark:text-stone-200">
                        {format(t.lessonLayout.firstAttemptScore, { score: firstScore, total: quiz.length })}
                      </strong>{" "}
                      {t.lessonLayout.firstAttemptNote}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 justify-center">
                  {results.map((ok, i) => (
                    <button
                      key={i}
                      onClick={() => (ok ? viewQuestion(i) : retry(i))}
                      title={ok ? t.lessonLayout.reviewQuestion : t.lessonLayout.retryQuestion}
                      className={`w-9 h-9 rounded-full text-sm flex items-center justify-center text-white font-bold cursor-pointer ${ok ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-400 hover:bg-rose-500"}`}
                    >
                      {ok ? "✓" : "✗"}
                    </button>
                  ))}
                </div>
                <WisdomCardFlip score={score} total={quiz.length} />
                {results.some((r) => !r) && authState !== "guest" && (
                  <Link
                    href="/on-tap-cau-sai"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-black transition-colors cursor-pointer shadow-sm"
                  >
                    {t.lessonLayout.reviewMistakes}
                  </Link>
                )}
                {/* Khách đọc bài xem thử: mọi nút bên dưới đều dẫn vào vùng
                    phải đăng nhập, nên chúng sẽ bật ngược về /login - đúng cú
                    cụt mà việc mở bài xem thử sinh ra để tránh. Thay bằng một
                    lời mời nói thẳng thứ họ sẽ mất nếu bỏ đi: bài vừa đọc.
                    Bài kế tiếp chỉ hiện khi nó cũng là bài xem thử. */}
                {authState === "guest" ? (
                  <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-4 space-y-2.5">
                    <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">
                      {t.lessonLayout.guestSaveTitle}
                    </p>
                    <p className="text-xs font-medium leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.lessonLayout.guestSaveBody}
                    </p>
                    <Link
                      href={`/login?mode=signup&next=${encodeURIComponent(`/bai-hoc/${lesson.slug ?? ""}`)}`}
                      className={`w-full inline-flex items-center justify-center py-3.5 rounded-xl text-white text-sm font-black text-center ${c.btn} transition-colors`}
                    >
                      {t.lessonLayout.guestSaveCta}
                    </Link>
                    {lesson.nextSlug && isPreviewLessonSlug(lesson.nextSlug) && (
                      <Link
                        href={`/bai-hoc/${lesson.nextSlug}`}
                        className="w-full inline-flex items-center justify-center py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold text-center hover:bg-white dark:hover:bg-stone-800 transition-colors"
                      >
                        {t.lessonLayout.nextLesson}
                      </Link>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <Link href="/dashboard" className="py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold text-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                        {t.lessonLayout.dashboard}
                      </Link>
                      {lesson.nextSlug ? (
                        <Link href={`/bai-hoc/${lesson.nextSlug}`} className={`py-3.5 rounded-xl text-white text-sm font-bold text-center ${c.btn} transition-colors`}>
                          {t.lessonLayout.nextLesson}
                        </Link>
                      ) : (
                        <div className="py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-sm font-bold text-center">{t.lessonLayout.comingSoon}</div>
                      )}
                    </div>
                    <ShareCompletionButton
                      lessonSlug={lesson.slug || ""}
                      lessonTitle={lesson.title}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold transition-colors cursor-pointer hover:brightness-110"
                    />
                  </>
                )}
                <button
                  onClick={restartQuiz}
                  className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wide transition-colors cursor-pointer"
                >
                  {t.lessonLayout.restart}
                </button>
              </div>
            )}

            {/* Mini nav between questions */}
            {(!finished || reviewMode) && quiz.length > 1 && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wide mb-3">{t.lessonLayout.questionList}</div>
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
      {/* Chỉ cho KHÁCH. Nút này ngồi ở `bottom-6 right-6` cỡ 64px, z-50 -
          đúng ô của nút ba gạch (ConnectMenu, 56px, cũng z-50), nên nút ba
          gạch lọt hẳn vào trong nó và chỉ thừa ra một viền chừng 8px ở cạnh
          trên và cạnh trái. Bấm trúng viền đó là mở nhầm form liên hệ, trên
          mọi trang bài học.

          Không xoá hẳn, vì đây KHÔNG phải bản sao của "Góp ý": form này ghi
          vào bảng `contact_messages` và có hộp thư quản trị riêng
          (lib/admin/messages.ts), còn "Góp ý" là hội thoại hai chiều có trả
          lời (lib/admin/chat.ts). Và GlobalChatWrapper trả về null khi chưa
          đăng nhập, nên với khách thì đây là kênh phản hồi DUY NHẤT trên
          trang bài học - xoá đi là mất nó.

          `authState === "guest"` chứ không phải `!userId`: lúc mới mount thì
          vòng getUser() chưa trả lời, và `!userId` lúc đó đúng với cả người
          đã đăng nhập, nên nút sẽ nháy lên rồi biến mất ở mỗi lần vào bài. */}
      {authState === "guest" && <FloatingContact />}
      <LessonTour userId={userId} />
    </div>
  );
}
