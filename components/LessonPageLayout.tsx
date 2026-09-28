"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, X, ArrowLeft, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
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
import { markLessonComplete as markLessonCompleteCloudflare } from "@/lib/cloudflare-progress";
import { getLessonProgress } from "@/lib/cloudflare-progress";
import { queueOfflineCompletion, removeOfflineCompletion } from "@/lib/offline-sync";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { updateStreak, MAX_STREAK_FREEZES } from "@/lib/cloudflare-streak";
import { maybeAwardTechCardDrop } from "@/lib/tech-cards";
import { getReadingProgress, updateReadingProgress } from "@/lib/cloudflare-reading";
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
import { XP_PER_LESSON } from "@/lib/levels";
import { btnPrimary, btnSecondary, Sys, StatusDot } from "@/components/ui/system";

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

/* i18n-ignore-start: định danh máy trên khung soạn thảo của bài - tên tệp và
   đường dẫn, cùng một chuỗi ở mọi ngôn ngữ, như trên trang giới thiệu
   (components/home/HomePage.tsx, hằng SYS). */
const SYS = {
  path: (slug: string) => `THCN://LESSON/${slug.toUpperCase()}`,
  file: (slug: string) => `${slug}.md`,
  quiz: "quiz.ts",
  notes: "notes.md",
  xp: (n: number) => `+${n} XP`,
  letters: ["A", "B", "C", "D", "E", "F"],
};
/* i18n-ignore-end */

// A set of older hand-written pages still declare their pre-resync lesson id
// inline, while the dashboard and Cloudflare `lessons` table use the canonical
// ids from lib/lessons-data/_index.json. Persisting with the stale inline id
// makes the quiz look complete locally but invisible on the dashboard.
const CANONICAL_LESSON_IDS_BY_SLUG: Record<string, number> = {
  "tai-nguyen-tinh-toan-khan-hiem": 1005,
  "mot-lan-toi-uu-lon": 1001,
  "slo-cam-ket-do-tin-cay": 1017,
  "phan-loai-rui-ro-ky-thuat": 1029,
  "doi-co-20-phan-tram-nang-luc-du": 1023,
  "chia-chi-phi-dich-vu-dung-chung": 1011,
  "so-lieu-giua-ky-va-thay-doi-an": 1012,
  "ty-le-no-ky-thuat": 1014,
  "chi-phi-moi-request-co-hop-ly": 1006,
  "nhieu-dich-vu-nho-hay-mot-dich-vu-lon": 1032,
  "chi-phi-co-dinh-va-theo-luong-dung": 1010,
  "sau-khi-ra-mat-co-nen-cong-bo-slo": 1020,
  "dong-tai-nguyen-san-pham-tang-nhanh": 1015,
  "doc-dong-tai-nguyen-he-thong-lon": 1007,
  "wealth-management": 1031,
};

export default function LessonPageLayout({ lesson, quiz, children }: Props) {
  const { t } = useI18n();
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
  // Admin-set video URL lives in its own table (see lib/cloudflare-lesson-videos.ts)
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
      // Cloudflare says this lesson is already completed, short-circuit every
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
          // when a lesson hasn't been synced into the Cloudflare mirror table
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
  // synced here so completeLessonInCloudflare persists the right quiz score.
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
        const result = await completeLessonInCloudflare(finalResults);
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
  async function completeLessonInCloudflare(finalResults: boolean[]): Promise<"saved" | "failed" | "guest"> {
    // Don't trust the `userId` state here - it's only set once the mount
    // effect's getCurrentUser() round trip resolves, and a fast
    // reader can finish the quiz before that happens. Falling back to
    // state left this silently no-op-ing: the quiz still showed as done
    // locally (markLessonComplete above writes to localStorage regardless),
    // but nothing was ever saved to Cloudflare, so the dashboard's "next
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
      await markLessonCompleteCloudflare(uid, persistedLessonId, finalScore, durationMin * 60);
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
          window.dispatchEvent(new CustomEvent("thtcdn:tech-card-dropped", { detail: cardDrop.card }));
        }
      }
    } catch (error) {
      console.error("Error updating stats/streak after completion (lesson still saved):", error);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: XP_PER_LESSON, label: t.miscUi.lessonPageLayout.lessonCompletedLabel } }));
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

  const slug = lesson.slug || "";
  // Nhãn nhỏ kiểu bảng hệ thống: chữ hoa sans (không phải mono - đây là chữ
  // tiếng Việt đã dịch), giống các nhãn "VÍ DỤ", "QUIZ" trong HeroEditor.
  const label = "text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted";
  const shell = "overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900";
  const titleBar = "flex h-9 items-stretch justify-between border-b border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950";

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-ink antialiased dark:bg-stone-950">
      {/* Thước đọc cố định bên trái - chỉ từ 2xl, vì dưới mức đó cột bài
          học căn giữa nằm quá sát mép và thước đè lên chữ. */}
      <div className="fixed left-4 top-1/2 z-10 hidden -translate-y-1/2 2xl:block">
        <ReadingProgress progress={readPct} onMilestone={handleMilestone} />
      </div>

      {/* Thanh trên cùng */}
      <header className="sticky top-0 z-50 border-b border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
        {/* Tiến độ cuộn: 2px, xanh vì nó là dữ liệu sống. */}
        <div className="h-0.5 w-full bg-surface-sunken">
          <div className="h-full bg-brand-600 transition-[width] duration-150 dark:bg-brand-500" style={{ width: `${readPct}%` }} />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              href="/hoc-bai"
              aria-label={t.lessonLayout.backAria}
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border border-stone-300 text-sm font-bold text-ink-body transition-colors hover:border-stone-950 hover:text-ink-max dark:border-stone-700 dark:hover:border-stone-200 sm:w-auto sm:px-3"
            >
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">{t.lessonLayout.back}</span>
            </Link>
            <div className="min-w-0">
              {slug && <Sys className="hidden truncate text-ink-faint sm:block">{SYS.path(slug)}</Sys>}
              <p className="line-clamp-1 text-base font-black leading-tight tracking-tight text-ink-max sm:text-[17px]">{lesson.title}</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
            <FontSizeControl scale={fontScale} onChange={setFontScale} />
            <ReadingModeControl mode={readingMode} onChange={setReadingMode} />

            <div data-tour="lesson-bookmark">
              <BookmarkButton lessonId={persistedLessonId} lessonSlug={slug} lessonTitle={lesson.title} />
            </div>

            <ManualLessonFlagButton lessonId={persistedLessonId} lessonSlug={slug} lessonTitle={lesson.title} />

            <LessonStatsHover />

            {/* Trạng thái đọc: câu tiếng Việt, nên đi bằng sans. */}
            <span className="hidden text-xs font-semibold text-ink-soft sm:inline">
              {readPct < 100
                ? readPct === 0
                  ? format(t.lessonLayout.readMinutes, { minutes: readingMin })
                  : format(t.lessonLayout.readProgress, { percent: readPct, minutes: remainMin })
                : t.lessonLayout.readDone}
            </span>

            {quiz.length > 0 && (
              <div className="hidden items-center gap-2 sm:flex">
                <div className="h-1 w-20 bg-surface-sunken">
                  <div className="h-full bg-brand-600 transition-[width] duration-500 dark:bg-brand-500" style={{ width: `${pct}%` }} />
                </div>
                <Sys className="tabular-nums text-ink-muted">
                  {submittedCount}/{quiz.length}
                </Sys>
              </div>
            )}
            <Sys className="rounded-sm border border-stone-300 px-2 py-1 text-ink-body dark:border-stone-700">{lessonLabel}</Sys>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
        <div className="flex flex-col items-start gap-6 sm:gap-8 xl:flex-row lg:gap-10">
          {/* ── TRÁI: bài đọc ───────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            <TextHighlightMenu
              containerRef={articleRef}
              lessonId={persistedLessonId}
              lessonSlug={slug}
              onCreated={(h) => setHighlights((prev) => [...prev, h])}
            />

            <article ref={articleRef} className="min-w-0 flex-1 space-y-8 pb-20 lg:pb-0">
              {/* Đầu bài: một cửa sổ soạn thảo, đúng khuôn HeroEditor ở trang
                  giới thiệu - tab tệp, thân bài, thanh trạng thái. Các tab
                  quiz.ts / notes.md là liên kết thật tới cột bên phải. */}
              <div className={shell}>
                <div className={titleBar}>
                  <div className="flex min-w-0">
                    <span className="relative flex min-w-0 items-center border-r border-stone-300 bg-white px-3.5 dark:border-stone-700 dark:bg-stone-900">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-brand-600 dark:bg-brand-500" />
                      <Sys className="truncate normal-case text-ink">{slug ? SYS.file(slug) : lessonLabel}</Sys>
                    </span>
                    {quiz.length > 0 && (
                      <a href="#lesson-quiz" className="hidden items-center border-r border-stone-300 px-3.5 hover:bg-white dark:border-stone-700 dark:hover:bg-stone-900 sm:flex">
                        <Sys className="normal-case text-ink-muted">{SYS.quiz}</Sys>
                      </a>
                    )}
                    <a href="#lesson-notes" className="hidden items-center border-r border-stone-300 px-3.5 hover:bg-white dark:border-stone-700 dark:hover:bg-stone-900 md:flex">
                      <Sys className="normal-case text-ink-muted">{SYS.notes}</Sys>
                    </a>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 px-3">
                    <Sys className="hidden text-ink-muted xs:inline">{lessonLabel}</Sys>
                    <Sys className="text-accent-strong">{SYS.xp(XP_PER_LESSON)}</Sys>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusDot tone={readPct > 0 ? "brand" : "muted"} />
                    <span className="text-[11px] font-semibold text-ink-muted">{lesson.difficulty}</span>
                  </div>
                  <h1 className="mt-3 text-[1.9rem] font-black leading-[1.1] tracking-tight text-ink-max sm:text-[2.6rem]">
                    {lesson.title}
                  </h1>
                  <p className="mt-4 max-w-[68ch] text-lg leading-8 text-ink-body">{lesson.subtitle}</p>

                  <div className="mt-6 grid grid-cols-3 border-y border-stone-200 text-sm dark:border-stone-800">
                    {[
                      format(t.lessonLayout.durationRead, { duration: lesson.duration }),
                      format(t.lessonLayout.quizCount, { count: quiz.length }),
                      readPct === 0
                        ? t.lessonLayout.notStarted
                        : readPct >= 100
                          ? t.lessonLayout.readDone
                          : format(t.lessonLayout.readPercent, { percent: readPct }),
                    ].map((value, i) => (
                      <div key={i} className={`min-w-0 py-2.5 ${i > 0 ? "border-l border-stone-200 pl-3 dark:border-stone-800" : ""}`}>
                        <p className={`truncate font-semibold ${i === 2 && readPct > 0 ? "text-accent-strong" : "text-ink-max"}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div data-tour="lesson-progress" className="mt-4 h-1 bg-surface-sunken">
                    <div className="h-full bg-brand-600 transition-[width] duration-150 dark:bg-brand-500" style={{ width: `${readPct}%` }} />
                  </div>
                  {readPct > 0 && readPct < 100 && (
                    <p className="mt-2 text-sm text-ink-soft">
                      {t.lessonLayout.remainingPart1}
                      <strong className="font-semibold text-ink-max">{format(t.lessonLayout.remainingMinutes, { minutes: remainMin })}</strong>
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
                      <div
                        className={`mt-6 border-l-2 pl-4 ${
                          allDoneNow ? "border-brand-600 dark:border-brand-400" : "border-stone-950 dark:border-stone-300"
                        }`}
                      >
                        <p className={`${label} ${allDoneNow ? "text-accent-strong" : ""}`}>{t.lessonLayout.checklistTitle}</p>
                        <ul className="mt-2 space-y-1.5">
                          {checklistItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-2.5">
                              <span
                                aria-hidden
                                className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-xs border ${
                                  item.done
                                    ? "border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-stone-950"
                                    : "border-line-firm"
                                }`}
                              >
                                {item.done && <Check className="h-3 w-3" strokeWidth={3} />}
                              </span>
                              <span
                                className={`text-sm font-semibold sm:text-[15px] ${
                                  item.done ? "text-ink-muted line-through decoration-stone-400" : "text-ink-body"
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

              {/* Ôn cách quãng - khái niệm từ ~5 và ~12 bài trước, trước khi
                  vào nội dung mới. */}
              {recallItems.length > 0 && <RecallCard items={recallItems} />}

              <div data-tour="lesson-tai-tai">
                <StageTipsBanner lessonId={persistedLessonId} lessonTitle={lesson.title} />
              </div>

              {/* Video bài giảng */}
              <div className={shell}>
                <div className="flex h-9 items-center justify-between gap-3 border-b border-stone-300 bg-[#f3f1ec] px-3 dark:border-stone-700 dark:bg-stone-950">
                  <span className={label}>{t.lessonLayout.videoTitle}</span>
                  <span className="text-[11px] font-semibold text-ink-muted">{t.lessonLayout.videoBadge}</span>
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
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={embedSrc}
                        title={lesson.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
                      <p className="text-sm leading-6 text-ink-body">{t.lessonLayout.videoNote}</p>
                      <a
                        href={`https://www.youtube.com/results?search_query=T%E1%BB%B1+h%E1%BB%8Dc+t%C3%A0i+ch%C3%ADnh+${encodeURIComponent(lesson.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btnSecondary} shrink-0`}
                      >
                        <span>{t.lessonLayout.videoCta}</span>
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
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
                className={`space-y-8 text-lg leading-8 text-ink-body ${readingMode === "sepia" ? "reading-sepia" : ""}`}
                style={{ zoom: fontScale }}
              >
                <LessonCompletionContext.Provider value={{ registerMidpoint, markMidpointDone }}>
                  {children}
                </LessonCompletionContext.Provider>
              </div>

              <div className="mt-12 border-t border-stone-300 pt-8 dark:border-stone-700">
                <LessonFeedbackInline lessonId={persistedLessonId} userId={userId} />
              </div>

              <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800 lg:hidden">
                <p className="text-center text-sm font-semibold text-ink-muted">{t.lessonLayout.scrollForQuiz}</p>
              </div>

              {/* Bottom-of-article sentinel for IntersectionObserver-based
                  scroll completion - see the effect above. Must be the very
                  last thing in the article. */}
              <div ref={bottomSentinelRef} className="h-px" aria-hidden="true" />
            </article>
          </div>

          {/* ── PHẢI: mục lục (XL+) - chỉ giữ chỗ khi thật sự có mục lục,
              nếu không cột trống 256px bóp hẹp cả bài lẫn quiz trên laptop. */}
          {hasToc && (
            <div className="hidden w-64 flex-shrink-0 xl:block">
              <LessonTableOfContents sections={lesson.sections} />
            </div>
          )}

          {/* ── PHẢI: cột quiz ──────────────────────────────────────────
              max-h + overflow-y-auto để cột sticky tự cuộn khi cao hơn màn
              hình. Mọi breakpoint ở đây phải là `xl`, khớp `xl:flex-row` của
              cha: giữa 1024 và 1279px cột này vẫn xếp dưới bài đọc. */}
          <aside
            id="lesson-quiz"
            data-tour="lesson-quiz"
            className="w-full flex-shrink-0 scroll-mt-24 space-y-4 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:w-[440px] xl:overflow-y-auto"
          >
            <div id="lesson-notes" className="scroll-mt-24">
              <LessonNotes lessonId={persistedLessonId} lessonSlug={slug} />
            </div>

            <LessonHighlightsList
              highlights={highlights}
              onDeleted={(id) => setHighlights((prev) => prev.filter((h) => h.id !== id))}
            />

            {/* Cửa sổ quiz: thanh tiêu đề là nút thu gọn dải tiến độ. */}
            <div className={shell}>
              <button
                onClick={() => setQuizCollapsed(!quizCollapsed)}
                aria-expanded={!quizCollapsed}
                className="flex h-9 w-full items-center justify-between border-b border-stone-300 bg-[#f3f1ec] px-3 transition-colors hover:bg-[#ece9e2] dark:border-stone-700 dark:bg-stone-950 dark:hover:bg-stone-900"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Sys className="normal-case text-ink">{SYS.quiz}</Sys>
                  <span className={label}>{t.lessonLayout.quickCheck}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Sys className="tabular-nums text-ink-muted">
                    {submittedCount}/{quiz.length}
                  </Sys>
                  {quizCollapsed ? <ChevronDown className="h-4 w-4 text-ink-muted" /> : <ChevronUp className="h-4 w-4 text-ink-muted" />}
                </span>
              </button>

              {!quizCollapsed && (
                <div className="flex gap-1 border-b border-stone-200 px-4 py-3 dark:border-stone-800">
                  {quiz.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => viewQuestion(i)}
                      title={submitted[i] ? t.lessonLayout.reviewQuestion : undefined}
                      className={`h-1.5 flex-1 cursor-pointer rounded-[1px] transition-colors ${
                        submitted[i]
                          ? results[i]
                            ? "bg-brand-600 dark:bg-brand-500"
                            : "bg-red-500"
                          : i === activeQ
                            ? "bg-stone-950 dark:bg-stone-100"
                            : "bg-surface-sunken"
                      }`}
                    />
                  ))}
                </div>
              )}

              {!finished || reviewMode ? (
                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className={label}>{format(t.lessonLayout.questionCounter, { current: activeQ + 1, total: quiz.length })}</span>
                      {qSubmitted && (
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-[11px] font-bold ${
                            qCorrect
                              ? "border-brand-600 text-accent-strong dark:border-brand-400"
                              : "border-red-500 text-danger"
                          }`}
                        >
                          {qCorrect ? t.lessonLayout.answerRight : t.lessonLayout.answerWrong}
                        </span>
                      )}
                    </div>
                    <p className="select-text text-lg font-bold leading-7 text-ink-max">{q.question}</p>
                  </div>

                  {/* Phương án: hàng vuông viền 1px, rãnh chữ cái mono bên
                      trái - cùng khuôn với phần trả lời trong HeroEditor. */}
                  <ul className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = qSelected === oi;
                      const isCorrectOpt = oi === q.correct;
                      let cls =
                        "border-stone-300 bg-white text-ink hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300";
                      let gutter = "text-ink-faint";
                      if (qSubmitted) {
                        if (isCorrectOpt) {
                          cls = "border-brand-600 bg-brand-50 font-semibold text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-100";
                          gutter = "text-accent-strong";
                        } else if (isSelected) {
                          cls = "border-red-500 bg-red-50 font-semibold text-red-900 dark:border-red-500/70 dark:bg-red-950/40 dark:text-red-200";
                          gutter = "text-red-600 dark:text-red-400";
                        } else {
                          cls = "border-stone-200 bg-white text-ink-muted dark:border-stone-800 dark:bg-stone-900";
                        }
                      } else if (isSelected) {
                        cls = "border-brand-600 bg-brand-50 font-semibold text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-100";
                        gutter = "text-accent-strong";
                      }
                      return (
                        <li key={oi}>
                          <button
                            disabled={qSubmitted}
                            onClick={() => choose(activeQ, oi)}
                            aria-pressed={isSelected}
                            className={`flex w-full cursor-pointer select-text items-start gap-3 rounded-sm border px-3 py-2.5 text-left text-[15px] leading-6 transition-colors disabled:cursor-default ${cls}`}
                          >
                            <Sys className={`mt-[3px] w-4 flex-shrink-0 select-none text-[11px] ${gutter}`}>{SYS.letters[oi]}</Sys>
                            <span className="flex-1 select-text">{opt}</span>
                            {qSubmitted && isCorrectOpt && <Check aria-hidden className="mt-1 h-4 w-4 flex-shrink-0 text-accent-strong" />}
                            {qSubmitted && isSelected && !isCorrectOpt && <X aria-hidden className="mt-1 h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {qSubmitted && (
                    <div
                      className={`border-l-2 pl-4 text-sm leading-7 text-ink-body ${
                        qCorrect ? "border-brand-600 dark:border-brand-400" : "border-red-500"
                      }`}
                    >
                      <p className={`mb-1 font-bold ${qCorrect ? "text-accent-strong" : "text-danger"}`}>
                        {qCorrect ? t.lessonLayout.exactly : t.lessonLayout.explanation}
                      </p>
                      {/* Đặt lựa chọn sai của người học cạnh đáp án đúng trước
                          khi giải thích - gọi tên đúng ngộ nhận họ vừa lộ ra. */}
                      {!qCorrect && qSelected !== null && (
                        <p className="mb-2 border-b border-stone-200 pb-2 dark:border-stone-800">
                          <span className="font-semibold text-ink-max">{t.lessonLayout.youChose}</span> &quot;{q.options[qSelected]}&quot;
                          <br />
                          <span className="font-semibold text-ink-max">{t.lessonLayout.correctIs}</span> &quot;{q.options[q.correct]}&quot;
                        </p>
                      )}
                      <p>{q.explanation}</p>
                    </div>
                  )}

                  {/* Dính đáy vùng cuộn của cột quiz, để nút hành động luôn
                      trong tầm tay ngay sau khi chọn - không phải lăn xuống
                      bấm rồi lăn lên đọc phản hồi. Nền đặc + viền trên thay
                      cho lớp mờ dần cũ. */}
                  <div className="sticky bottom-0 -mx-5 -mb-5 border-t border-stone-200 bg-white px-5 pb-5 pt-3 dark:border-stone-800 dark:bg-stone-900 sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6">
                    {!qSubmitted ? (
                      <button disabled={qSelected === null} onClick={() => verify(activeQ)} className={`${btnPrimary} w-full`}>
                        {t.lessonLayout.check}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        {!qCorrect && (
                          <button onClick={() => retry(activeQ)} className={`${btnSecondary} flex-1`}>
                            {t.lessonLayout.tryAgain}
                          </button>
                        )}
                        {reviewMode && finished ? (
                          <button onClick={() => setReviewMode(false)} className={`${btnPrimary} flex-1`}>
                            {t.lessonLayout.backToResults}
                          </button>
                        ) : activeQ < quiz.length - 1 ? (
                          <button onClick={() => setActiveQ(activeQ + 1)} className={`${btnPrimary} flex-1`}>
                            {t.lessonLayout.nextQuestion}
                          </button>
                        ) : (
                          !reviewMode &&
                          allDone && (
                            <button onClick={() => setFinished(true)} className={`${btnPrimary} flex-1`}>
                              {t.lessonLayout.seeResults}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Thẻ hoàn thành */
                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusDot tone={score === quiz.length ? "brand" : "muted"} />
                      <span className={label}>{t.lessonLayout.quickCheck}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-ink-max">{t.lessonLayout.doneTitle}</h3>
                    <p className={`mt-1 text-sm font-semibold ${score === quiz.length ? "text-accent-strong" : "text-ink-soft"}`}>
                      {format(t.lessonLayout.doneScore, { score, total: quiz.length })}
                    </p>
                    {/* Hai con số, và nói rõ con số nào được ghi lại.
                        Chỉ hiện khi chúng khác nhau: người làm đúng hết ngay lần
                        đầu không cần đọc một dòng giải thích về việc thử lại. */}
                    {firstScore !== score && (
                      <p className="mt-3 border-l-2 border-stone-950 pl-3 text-xs leading-6 text-ink-muted dark:border-stone-200">
                        <strong className="font-semibold text-ink-body">
                          {format(t.lessonLayout.firstAttemptScore, { score: firstScore, total: quiz.length })}
                        </strong>{" "}
                        {t.lessonLayout.firstAttemptNote}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {results.map((ok, i) => (
                      <button
                        key={i}
                        onClick={() => (ok ? viewQuestion(i) : retry(i))}
                        title={ok ? t.lessonLayout.reviewQuestion : t.lessonLayout.retryQuestion}
                        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                          ok
                            ? "border-brand-600 bg-brand-50 text-accent-strong hover:bg-brand-100 dark:border-brand-400 dark:bg-brand-950/40"
                            : "border-red-500 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                      >
                        {ok ? <Check aria-hidden className="h-4 w-4" /> : <X aria-hidden className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>

                  <WisdomCardFlip score={score} total={quiz.length} />

                  {results.some((r) => !r) && authState !== "guest" && (
                    <Link href="/on-tap-cau-sai" className={`${btnSecondary} w-full`}>
                      {t.lessonLayout.reviewMistakes}
                    </Link>
                  )}

                  {/* Khách đọc bài xem thử: mọi nút bên dưới đều dẫn vào vùng
                      phải đăng nhập, nên chúng sẽ bật ngược về /login - đúng cú
                      cụt mà việc mở bài xem thử sinh ra để tránh. Thay bằng một
                      lời mời nói thẳng thứ họ sẽ mất nếu bỏ đi: bài vừa đọc.
                      Bài kế tiếp chỉ hiện khi nó cũng là bài xem thử. */}
                  {authState === "guest" ? (
                    <div className="space-y-3 border-l-2 border-brand-600 pl-4 dark:border-brand-400">
                      <p className="text-sm font-black text-ink-max">{t.lessonLayout.guestSaveTitle}</p>
                      <p className="text-sm leading-6 text-ink-soft">{t.lessonLayout.guestSaveBody}</p>
                      <Link
                        href={`/login?mode=signup&next=${encodeURIComponent(`/bai-hoc/${lesson.slug ?? ""}`)}`}
                        className={`${btnPrimary} w-full`}
                      >
                        {t.lessonLayout.guestSaveCta}
                      </Link>
                      {lesson.nextSlug && isPreviewLessonSlug(lesson.nextSlug) && (
                        <Link href={`/bai-hoc/${lesson.nextSlug}`} className={`${btnSecondary} w-full`}>
                          {t.lessonLayout.nextLesson}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard" className={btnSecondary}>
                          {t.lessonLayout.dashboard}
                        </Link>
                        {lesson.nextSlug ? (
                          <Link href={`/bai-hoc/${lesson.nextSlug}`} className={btnPrimary}>
                            {t.lessonLayout.nextLesson}
                          </Link>
                        ) : (
                          <span aria-disabled className={`${btnSecondary} cursor-not-allowed opacity-50`}>
                            {t.lessonLayout.comingSoon}
                          </span>
                        )}
                      </div>
                      <ShareCompletionButton
                        lessonSlug={slug}
                        lessonTitle={lesson.title}
                        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                      />
                    </>
                  )}
                  <button
                    onClick={restartQuiz}
                    className="w-full cursor-pointer text-center text-xs font-bold text-ink-muted transition-colors hover:text-ink-max"
                  >
                    {t.lessonLayout.restart}
                  </button>
                </div>
              )}

              {/* Danh sách câu: số mono, câu đang mở là mực, đúng xanh, sai đỏ. */}
              {(!finished || reviewMode) && quiz.length > 1 && (
                <div className="border-t border-stone-200 p-4 dark:border-stone-800">
                  <div className={`${label} mb-2.5`}>{t.lessonLayout.questionList}</div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {quiz.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => viewQuestion(i)}
                        aria-current={i === activeQ ? "true" : undefined}
                        className={`h-9 cursor-pointer rounded-sm border font-mono text-[13px] font-medium tabular-nums transition-colors ${
                          i === activeQ
                            ? "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950"
                            : submitted[i]
                              ? results[i]
                                ? "border-brand-600 bg-brand-50 text-accent-strong dark:border-brand-400 dark:bg-brand-950/40"
                                : "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                              : "border-stone-200 text-ink-muted hover:border-stone-950 dark:border-stone-800 dark:hover:border-stone-300"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
