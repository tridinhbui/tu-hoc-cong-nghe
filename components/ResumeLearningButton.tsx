"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";
import { getQuizAnswers } from "@/lib/progress";
import RecallCard from "@/components/RecallCard";
import type { RecallItem } from "@/lib/recall-schedule";

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
}

// Replaces the old plain "Tiếp tục học" banner with a Tài Tài chat bubble
// that actually summarizes where the learner is - which lesson, what it's
// about in one line, and how many minutes they've put in so far - instead
// of a generic label, plus a clear tap target to continue.
const COLLAPSED_KEY = "thtcdn_resume_card_collapsed";

export default function ResumeLearningButton({ activeTrack }: ResumeLearningButtonProps) {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem(COLLAPSED_KEY) === "1");
  }, []);

  function toggleCollapsed(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
      return next;
    });
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
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src="/tai-tai-avatar.jpg" alt="Tài Tài" width={32} height={32} className="w-full h-full object-cover" />
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
            <p className="font-bold text-lg">Chúc mừng{firstName ? `, ${firstName}` : ""}!</p>
            <p className="text-sm text-white/90">Bạn đã hoàn thành tất cả bài học</p>
          </div>
        </div>
      </div>
    );
  }

  const getEnergeticGreeting = () => {
    const nameStr = firstName ? ` ${firstName}` : "";
    if (completedCount === 0) {
      return `Chào${nameStr}! Sẵn sàng nâng cấp tư duy tài chính hôm nay chưa? Hãy bắt đầu bài đầu tiên để bứt phá giới hạn nhé! 🚀`;
    }
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
          className="group flex items-center gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-3 transition-all"
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-100 dark:border-emerald-900/50">
              <Image src="/tai-tai-avatar.jpg" alt="Tài Tài" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
          </div>
          <p className="flex-1 min-w-0 text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
            {nextLessonLabel}: {nextLessonShortTitle}
          </p>
          <span className="shrink-0 text-[11px] font-extrabold bg-emerald-600 group-hover:bg-emerald-500 text-white dark:bg-emerald-500 px-3 py-1.5 rounded-xl transition-all">
            ▶ Học
          </span>
          <button
            onClick={toggleCollapsed}
            aria-label="Mở rộng"
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <Link
        href={`/bai-hoc/${nextLesson.slug}`}
        onClick={() => trackFeatureClick("resume_learning_click", { label: nextLesson.slug })}
        className="group relative block h-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-[0_16px_36px_-16px_rgba(16,185,129,0.2)] flex flex-col justify-between"
      >
        <button
          onClick={toggleCollapsed}
          aria-label="Thu gọn"
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Avatar with energetic pulsing halo */}
          <div className="relative w-11 h-11 flex-shrink-0 mt-0.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-400/10 animate-ping [animation-duration:2.5s]" />
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
              <Image src="/tai-tai-avatar.jpg" alt="Tài Tài" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            {/* Header Labels */}
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-350 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                Tài Tài assistant
              </span>
              <span className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5 animate-pulse">
                🔥 +30 XP nếu học ngay
              </span>
            </div>

            {/* Tai Tai speech text - larger, bolder, energetic */}
            <p className="text-stone-850 dark:text-stone-100 text-sm sm:text-[15px] font-bold leading-relaxed">
              "{energeticGreeting}"
            </p>

            {/* Lesson Target Sub-Card inside the bubble */}
            <div className="mt-3.5 bg-stone-50/70 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/80 rounded-xl p-3 flex items-center justify-between gap-3 group-hover:border-emerald-300 dark:group-hover:border-emerald-800 transition-colors">
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider block mb-0.5">
                  Bài học tiếp theo
                </span>
                <p className="text-stone-900 dark:text-stone-50 text-xs sm:text-sm font-extrabold truncate">
                  {nextLessonLabel}: {nextLessonShortTitle}
                </p>
                <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold mt-0.5">
                  {totalMinutes > 0 ? `Đã học ${totalMinutes} phút` : "Chưa bắt đầu"}
                </p>
              </div>

              {/* CTA button inside the card */}
              <div className="flex items-center gap-1 text-[11px] font-extrabold bg-emerald-600 group-hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:group-hover:bg-emerald-400 px-3.5 py-2 rounded-xl transition-all shadow-sm shrink-0 active:scale-95">
                ▶ Tiếp tục học
              </div>
            </div>
          </div>
        </div>
      </Link>
      {todayRecallItems.length > 0 && (
        <div className="mt-2">
          <RecallCard items={todayRecallItems} title="Ôn tập" />
        </div>
      )}
    </div>
  );
}
