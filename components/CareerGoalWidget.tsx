"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { getMyCareerGoal } from "@/lib/supabase-career-goals";
import { getCareerLessonProgress, type CareerLessonProgress } from "@/lib/career-lesson-progress";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

// Dashboard-side half of "Đặt Mục tiêu Sự nghiệp" (set on /su-nghiep, see
// lib/supabase-career-goals.ts) - surfaces the pinned career and real
// progress toward it ("đã học X/Y bài liên quan"), computed from actual
// lesson completion via /api/career-lesson-progress, not a self-reported
// checklist. Renders nothing if no goal is set, so it doesn't take up
// sidebar space for users who haven't used this feature.
export default function CareerGoalWidget({ userId }: { userId?: string }) {
  const [careerId, setCareerId] = useState<string | null>(null);
  const [progress, setProgress] = useState<CareerLessonProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let localId: string | null = null;
    if (typeof window !== "undefined") {
      localId = localStorage.getItem("active_career_goal") || localStorage.getItem("thtcdn_career_goal") || localStorage.getItem("user_career_goal");
      if (localId) setCareerId(localId);
    }

    const loadData = async () => {
      const dbId = userId ? await getMyCareerGoal(userId).catch(() => null) : null;
      const targetId = dbId || localId;
      if (cancelled) return;

      if (targetId) {
        setCareerId(targetId);
        const career = FINANCE_CAREERS.find((c) => c.id === targetId);
        if (career) {
          const p = await getCareerLessonProgress(career.relatedLessonSlugs);
          if (!cancelled) setProgress(p);
        }
      }
      if (!cancelled) setLoading(false);
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading || !careerId) return null;

  const career = FINANCE_CAREERS.find((c) => c.id === careerId);
  if (!career) return null;

  const total = progress?.total ?? career.relatedLessonSlugs.length;
  const completed = progress?.completed ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const nextLesson = progress?.lessons.find((l) => !l.completed);

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="w-4 h-4 text-indigo-500" />
        <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Mục tiêu sự nghiệp
        </p>
      </div>
      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{career.title}</p>
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 mt-2 mb-1.5">
        <span>Đã học {completed}/{total} bài liên quan</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      {nextLesson ? (
        <Link
          href={`/bai-hoc/${nextLesson.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Học tiếp: {nextLesson.title}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        <Link
          href="/su-nghiep"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Đã học hết bài liên quan - xem lại mục tiêu
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
