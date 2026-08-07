"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Map } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";
import { getQuizAnswers } from "@/lib/progress";
import RecallCard from "@/components/RecallCard";
import type { RecallItem } from "@/lib/recall-schedule";
import type { StageTopicId, TopicAdviceId } from "@/lib/stage-topics";
import { useLocalStorageValue, writeLocalStorageValue } from "@/lib/use-local-storage-value";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface ResumeLearningButtonProps {
  activeTrack: "personal" | "professional";
}

interface Greeting {
  nextLesson: { id: number; slug: string; title: string; subtitle: string; duration: string } | null;
  nextLessonCriteria: { readPercent: number; quizTotal: number } | null;
  todayRecallItems: RecallItem[];
  completedCount: number;
  totalMinutes: number;
  firstName: string | null;
  trackProgress: { completed: number; total: number; percent: number };
  topicGapSummary: { topicId: StageTopicId; count: number }[];
  criticalMistake: {
    lessonId: number;
    lessonSlug: string;
    lessonTitle: string;
    topicId: StageTopicId;
    wrongCount: number;
    explanation: string | null;
    adviceId: TopicAdviceId;
  } | null;
  stageReviewInsight: {
    lessonId: number;
    lessonSlug: string;
    lessonTitle: string;
    stageLabel: string;
  } | null;
}

// Replaces the old plain "Tiếp tục học" banner with a Tài Tài chat bubble
// that actually summarizes where the learner is - which lesson, what it's
// about in one line, and how many minutes they've put in so far - instead
// of a generic label, plus a clear tap target to continue.
const COLLAPSED_KEY = "thtcdn_resume_card_collapsed";
/** Kênh báo khi người dùng thu gọn hoặc mở lại thẻ, trong cùng tab. */
const COLLAPSED_CHANGED_EVENT = "thtcdn:resume-card-collapsed";

export default function ResumeLearningButton({ activeTrack }: ResumeLearningButtonProps) {
  const { t } = useI18n();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);
  // Trạng thái thu gọn thẻ đọc thẳng từ localStorage. Bản cũ luôn mở ra ở
  // lần render đầu rồi mới thu lại trong effect, nên người đã thu gọn thẻ vẫn
  // thấy nó bung ra một nhịp ở mỗi lần vào dashboard.
  const collapsed = useLocalStorageValue(COLLAPSED_KEY, COLLAPSED_CHANGED_EVENT) === "1";

  function toggleCollapsed(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    writeLocalStorageValue(COLLAPSED_KEY, collapsed ? "0" : "1", COLLAPSED_CHANGED_EVENT);
  }

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const result = await getDashboardGreetingAction(user.id, activeTrack);
          setGreeting(result);
        }
      } catch (error) {
        console.error("Error fetching dashboard greeting:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
  }, [activeTrack]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 flex items-center gap-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          <span className="absolute -inset-0.5 rounded-full border border-emerald-400/60 border-t-transparent animate-spin" />
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
            <TaiTaiAvatar size={32} />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-stone-200 dark:bg-stone-800 rounded-full w-2/5 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite]" />
          <div className="h-3.5 bg-stone-200 dark:bg-stone-800 rounded-full w-4/5 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite]" style={{ animationDelay: "120ms" }} />
        </div>
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  const nextLesson = greeting?.nextLesson ?? null;
  const completedCount = greeting?.completedCount ?? 0;
  const totalMinutes = greeting?.totalMinutes ?? 0;
  const firstName = greeting?.firstName ?? null;
  const trackProgress = greeting?.trackProgress ?? null;
  const nextLessonLabel = nextLesson ? getLessonDisplayLabel({ id: nextLesson.id, title: nextLesson.title, track: undefined }) : null;
  const nextLessonShortTitle = nextLesson ? getLessonShortTitle({ title: nextLesson.title }) : null;
  const topicGapSummary = greeting?.topicGapSummary ?? [];
  const criticalMistake = greeting?.criticalMistake ?? null;
  const stageReviewInsight = greeting?.stageReviewInsight ?? null;

  // What's left to finish the in-progress lesson, computed from the DB read
  // percent (server) plus quiz-answers already saved locally (localStorage -
  // only known client-side, see lib/progress.ts). Midpoint criterion isn't
  // included here: it only applies to a subset of standalone case-study
  // pages and isn't derivable from lesson content, so it's left off rather
  // than guessed.
  const criteria = greeting?.nextLessonCriteria;
  const missingCriteria: string[] = [];
  if (nextLesson && criteria) {
    if (criteria.readPercent < 95) missingCriteria.push("đọc hết bài");
    if (criteria.quizTotal > 0) {
      const answers = getQuizAnswers(nextLesson.id);
      const submittedCount = answers?.submitted.filter(Boolean).length ?? 0;
      if (submittedCount < criteria.quizTotal) {
        missingCriteria.push(`${criteria.quizTotal - submittedCount} câu Kiểm tra nhanh`);
      }
    }
  }

  if (!nextLesson) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">{format(t.resume.congrats, { name: firstName ? `, ${firstName}` : "" })}</p>
            <p className="text-sm text-white/90">{t.resume.allDone}</p>
          </div>
        </div>
      </div>
    );
  }

  const getEnergeticGreeting = () => {
    const nameStr = firstName ? ` ${firstName}` : "";
    const messages = [
      `Chào${nameStr}! Sách đã mở, kiến thức đã sẵn sàng. Cùng chinh phục bài tiếp theo để nhận XP nào! 🔥`,
      `Tuyệt vời${nameStr}! Bạn đã hoàn thành ${completedCount} bài học. Cùng duy trì đà tiến bộ này ngay nhé! 🌟`,
      `Chào${nameStr}! Hôm nay mục tiêu là lên cấp tiếp theo. Học ngay bài học dưới đây thôi nào! 🏆`,
      `Năng lượng lên nào${nameStr}! Thêm một bài học là thêm một phần kiến thức thực chiến vững chắc! 💪`
    ];
    return messages[completedCount % messages.length];
  };

  const energeticGreeting = getEnergeticGreeting();
  const todayRecallItems = greeting?.todayRecallItems ?? [];

  if (collapsed) {
    return (
      <div className="flex flex-col h-full justify-between">
        <Link
          href={`/bai-hoc/${nextLesson.slug}`}
          onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
          className="group flex items-center gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl px-3 py-2.5 transition-all"
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-100 dark:border-emerald-900/50 bg-stone-100 dark:bg-stone-800">
              <TaiTaiAvatar size={32} />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400 dark:text-stone-500">
              {nextLessonLabel}
            </p>
            <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
              {nextLessonShortTitle}
            </p>
          </div>
          <span className="shrink-0 text-[11px] font-extrabold bg-emerald-600 group-hover:bg-emerald-500 text-white dark:bg-emerald-500 px-2.5 py-1.5 rounded-xl transition-all">
            {t.resume.study}
          </span>
          <button
            onClick={toggleCollapsed}
            aria-label={t.resume.expandAria}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </Link>
      </div>
    );
  }

  // Người mới hoàn toàn (0 bài đã học): thay giọng "chào mừng quay lại"
  // bằng hướng dẫn 3 bước cụ thể - chọn lộ trình, học bài đầu tiên (siêu
  // ngắn để tạo momentum), rồi chỉ thẳng vào bảng xếp hạng/streak để tạo
  // động lực quay lại. Đây là nhóm dễ bỏ cuộc nhất nên cần lối đi rõ ràng
  // hơn là chỉ một CTA "học ngay".
  if (completedCount === 0) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5">
          <button
            onClick={toggleCollapsed}
            aria-label={t.resume.collapseAria}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            <div className="relative w-11 h-11 flex-shrink-0 mt-0.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-400/10 animate-ping [animation-duration:2.5s]" />
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-100 dark:border-emerald-900/50 shadow-sm bg-stone-100 dark:bg-stone-800">
                <TaiTaiAvatar size={44} />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                {t.resume.quickGuideTitle}
              </span>
              <p className="mt-1.5 text-stone-800 dark:text-stone-100 text-sm sm:text-[15px] font-bold leading-relaxed">
                {format(t.resume.quickGuideIntro, { name: firstName ? ` ${firstName}` : "" })}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <a
              href="#lo-trinh"
              onClick={() => trackFeatureClick("beginner_cta_click", { label: "step1_chon_lo_trinh" })}
              className="group flex items-center gap-3 bg-stone-50/70 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/80 hover:border-emerald-300 dark:hover:border-emerald-800 rounded-xl p-3 transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[11px] font-extrabold flex items-center justify-center">1</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-50">{t.resume.step1Title}</p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mt-0.5">{t.resume.step1Body}</p>
              </div>
              <Map className="w-4 h-4 text-stone-400 group-hover:text-emerald-500 shrink-0" />
            </a>

            <Link
              href={`/bai-hoc/${nextLesson.slug}`}
              onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
              className="group flex items-center gap-3 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl p-3 transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold flex items-center justify-center">2</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-50 truncate">{format(t.resume.step2Title, { lesson: nextLessonShortTitle ?? "" })}</p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mt-0.5">{format(t.resume.step2Body, { duration: nextLesson.duration })}</p>
              </div>
              <span className="shrink-0 text-[11px] font-extrabold bg-emerald-600 group-hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl transition-all">{t.resume.study}</span>
            </Link>

            <Link
              href="/analytics?tab=leaderboard"
              onClick={() => trackFeatureClick("beginner_cta_click", { label: "step3_bang_xep_hang" })}
              className="group flex items-center gap-3 bg-stone-50/70 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/80 hover:border-amber-300 dark:hover:border-amber-800 rounded-xl p-3 transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[11px] font-extrabold flex items-center justify-center">3</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-50">{t.resume.step3Title}</p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mt-0.5">{t.resume.step3Body}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <Link
        href={`/bai-hoc/${nextLesson.slug}`}
        onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
        className="group relative block h-full bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 rounded-3xl p-5 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        <button
          onClick={toggleCollapsed}
          aria-label={t.resume.collapseAria}
          className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 sm:gap-4 relative z-10">
          {/* Avatar with soft energetic halo */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 mt-0.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-400/10 animate-ping [animation-duration:2.5s]" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-stone-200 dark:border-stone-700 shadow-sm bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <TaiTaiAvatar size={44} />
            </div>
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900 shadow-2xs" />
          </div>

          <div className="flex-1 min-w-0 pr-5 sm:pr-8">
            {/* Header Labels */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[10px] font-black text-stone-600 dark:text-stone-300 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2.5 py-0.5 rounded-lg shadow-2xs">
                {t.resume.heroBanner}
              </span>
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs">
                {t.resume.xpIfNow}
              </span>
            </div>

            {/* Tai Tai speech text */}
            <p className="text-stone-900 dark:text-stone-50 text-sm sm:text-[15px] font-extrabold leading-relaxed">
              "{energeticGreeting}"
            </p>

            {/* Live Track Progress Bar */}
            {trackProgress && (
              <div className="mt-3.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  <span>{format(t.resume.trackProgress, { done: trackProgress.completed, total: trackProgress.total })}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{trackProgress.percent}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, trackProgress.percent)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Lesson Target Sub-Card inside the hero banner */}
            <div className="mt-3.5 bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 group-hover:border-stone-300 dark:group-hover:border-stone-700 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-all duration-300">
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-0.5">
                  {t.resume.continuingLesson}
                </span>
                <p className="text-stone-950 dark:text-white text-xs sm:text-sm font-extrabold truncate">
                  {nextLessonLabel}: {nextLessonShortTitle}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold mt-0.5">
                  {totalMinutes > 0 ? format(t.resume.minutesStudied, { minutes: totalMinutes }) : t.resume.readyToStart}
                </p>
              </div>

              {/* Eye-Catching Clean Hero CTA button */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm border border-emerald-500/20 w-full sm:w-auto text-center shrink-0 active:scale-95">
                {t.resume.continueNow}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {(stageReviewInsight || criticalMistake || topicGapSummary.length > 0) && (
        <div className="mt-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="relative w-9 h-9 flex-shrink-0 mt-0.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-emerald-100 dark:border-emerald-900/50 bg-stone-100 dark:bg-stone-800">
                <TaiTaiAvatar size={36} />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="text-[9px] font-extrabold text-sky-700 dark:text-sky-300 uppercase tracking-widest bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">
                  {t.resume.feedbackTitle}
                </span>
                {stageReviewInsight && (
                  <span className="text-[9px] font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                    {t.resume.reviewOnTime}
                  </span>
                )}
              </div>

              {stageReviewInsight && (
                <div className="rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/20 p-3 mb-3">
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                    {format(t.resume.coachReminder, {
                      message: format(t.resume.stageReviewMessage, { stage: stageReviewInsight.stageLabel }),
                    })}
                  </p>
                  <Link
                    href={`/bai-hoc/${stageReviewInsight.lessonSlug}`}
                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-extrabold text-amber-800 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200"
                  >
                    {format(t.resume.openStage, { stage: stageReviewInsight.stageLabel, lesson: getLessonShortTitle({ title: stageReviewInsight.lessonTitle }) })} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {topicGapSummary.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-2">
                    {t.resume.gapsLeaning}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topicGapSummary.map((item) => (
                      <span
                        key={item.topicId}
                        className="inline-flex items-center gap-1 rounded-full border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 px-2.5 py-1 text-[10px] font-extrabold text-rose-700 dark:text-rose-300"
                      >
                        {t.topics[item.topicId]}
                        <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.5 text-[9px]">{item.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {criticalMistake && (
                <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-950/40 p-3">
                  <p className="text-[11px] font-extrabold text-stone-900 dark:text-stone-100">
                    {format(t.resume.stumblingMost, { topic: t.topics[criticalMistake.topicId] })}
                  </p>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {format(t.resume.wrongCount, { count: criticalMistake.wrongCount, lesson: getLessonShortTitle({ title: criticalMistake.lessonTitle }) })}
                  </p>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                    {criticalMistake.explanation ?? t.resume.explanationFallback}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mt-2 leading-relaxed">
                    {format(t.resume.coachSuggestion, { action: t.topicAdvice[criticalMistake.adviceId] })}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link
                      href={`/bai-hoc/${criticalMistake.lessonSlug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    >
                      {t.resume.reviewThisLesson} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/ghi-chu"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-extrabold rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
                    >
                      {t.resume.makeFlashcard}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {todayRecallItems.length > 0 && (
        <div className="mt-2">
          <RecallCard items={todayRecallItems} title={t.resume.recallTitle} />
        </div>
      )}
    </div>
  );
}
