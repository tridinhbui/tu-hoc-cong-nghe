"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase";
import { getLessonDisplayLabel, getLessonShortTitle } from "@/lib/lesson-labels";

interface ResumeLearningButtonProps {
  activeTrack: "personal" | "professional";
}

interface Greeting {
  nextLesson: { id: number; slug: string; title: string; subtitle: string; duration: string } | null;
  completedCount: number;
  totalMinutes: number;
}

// Replaces the old plain "Tiếp tục học" banner with a Tài Tài chat bubble
// that actually summarizes where the learner is - which lesson, what it's
// about in one line, and how many minutes they've put in so far - instead
// of a generic label, plus a clear tap target to continue.
export default function ResumeLearningButton({ activeTrack }: ResumeLearningButtonProps) {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="relative w-11 h-11 flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          <span className="absolute -inset-1 rounded-full border-2 border-emerald-400/60 border-t-transparent animate-spin" />
          <div className="relative w-11 h-11 rounded-full overflow-hidden">
            <Image src="/tai-tai-avatar.png" alt="Tài Tài" width={44} height={44} className="w-full h-full object-cover" />
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
  const nextLessonLabel = nextLesson ? getLessonDisplayLabel({ id: nextLesson.id, title: nextLesson.title, track: undefined }) : null;
  const nextLessonShortTitle = nextLesson ? getLessonShortTitle({ title: nextLesson.title }) : null;

  if (!nextLesson) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">Chúc mừng!</p>
            <p className="text-sm text-white/90">Bạn đã hoàn thành tất cả bài học</p>
          </div>
        </div>
      </div>
    );
  }

  const greetingText =
    completedCount === 0
      ? `Xin chào! Bạn chưa học được bài nào cả - cùng bắt đầu với ${nextLessonLabel}: ${nextLessonShortTitle} nhé!`
      : totalMinutes > 0
        ? `Xin chào! Bạn đang học ${nextLessonLabel}: ${nextLessonShortTitle} - ${nextLesson.subtitle} Bạn đã học được khoảng ${totalMinutes} phút rồi, tiếp tục nhé!`
        : `Xin chào! Bạn đang học ${nextLessonLabel}: ${nextLessonShortTitle} - ${nextLesson.subtitle} Bạn đã có tiến độ rồi, tiếp tục nhé!`;

  return (
    <Link
      href={`/bai-hoc/${nextLesson.slug}`}
      className="group block bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-5 transition-all hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-emerald-100 dark:ring-emerald-950">
          <Image src="/tai-tai-avatar.png" alt="Tài Tài" width={44} height={44} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Tài Tài
          </p>
          <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed font-medium">
            {greetingText}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">
            Lưu ý: bài chuyển <span className="font-semibold text-emerald-600 dark:text-emerald-400">xanh lá</span> và được cộng XP khi bạn làm xong hết quiz của bài (bài không có quiz thì đọc hết là tính). Nếu bạn chỉ bấm &quot;Tự đánh dấu&quot; vì tự biết mình đã học rồi, bài sẽ chuyển <span className="font-semibold text-sky-600 dark:text-sky-400">xanh dương</span> để ghi nhớ tiến độ, nhưng sẽ không được cộng XP.
          </p>
        </div>
        <div className="flex-shrink-0 self-center flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold px-4 py-2.5 rounded-xl group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 transition-colors">
          {completedCount === 0 ? "Bắt đầu" : "Tiếp tục"}
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
