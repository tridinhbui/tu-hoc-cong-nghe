"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { getMyCareerGoal } from "@/lib/supabase-career-goals";
import { getCareerLessonProgress, type CareerLessonProgress } from "@/lib/career-lesson-progress";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";
import { CAREER_GOAL_KEY, CAREER_GOAL_STORAGE_EVENT } from "@/lib/career-goal-storage";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Dashboard-side half of "Đặt Mục tiêu Sự nghiệp" (set on /su-nghiep, see
// lib/supabase-career-goals.ts) - surfaces the pinned career and real
// progress toward it ("đã học X/Y bài liên quan"), computed from actual
// lesson completion via /api/career-lesson-progress, not a self-reported
// checklist. Renders nothing if no goal is set, so it doesn't take up
// sidebar space for users who haven't used this feature.
/** `compact` để widget nằm BÊN TRONG thẻ Bản đồ Cấp độ, cạnh góc yên tĩnh.
 *  Cùng lý do như DailyMotivationWidget: viền dày và padding rộng là ngôn ngữ
 *  của một thẻ đứng riêng, và một thẻ lồng trong thẻ khác mà to giọng hơn cái
 *  bọc nó thì đọc ra là hai thẻ chồng lên nhau. */
export default function CareerGoalWidget({ userId, compact = false }: { userId?: string; compact?: boolean }) {
  const { t } = useI18n();
  // Đọc thẳng localStorage thay vì chép vào state lúc mount. Widget này nằm
  // ở dashboard trong khi mục tiêu được đặt ở trang Sự nghiệp; trước đây nó
  // KHÔNG nghe kênh báo đổi nào, nên đổi mục tiêu xong quay lại dashboard vẫn
  // thấy mục tiêu cũ cho tới lần tải trang sau.
  const localGoal = useLocalStorageValue(CAREER_GOAL_KEY, CAREER_GOAL_STORAGE_EVENT);
  const [serverGoal, setServerGoal] = useState<string | null>(null);
  const [progress, setProgress] = useState<CareerLessonProgress | null>(null);
  const careerId = serverGoal ?? localGoal;

  // `loading` suy ra từ chỗ đã hỏi xong server cho ai, không phải một cờ tự
  // bật tự tắt.
  const [checkedFor, setCheckedFor] = useState<string | null>(null);
  const loading = checkedFor !== (userId ?? "");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      const dbId = userId ? await getMyCareerGoal(userId).catch(() => null) : null;
      if (cancelled) return;
      if (dbId) setServerGoal(dbId);

      const targetId = dbId || localGoal;
      if (targetId) {
        const career = FINANCE_CAREERS.find((c) => c.id === targetId);
        if (career) {
          const p = await getCareerLessonProgress(career.relatedLessonSlugs);
          if (!cancelled) setProgress(p);
        }
      }
      if (!cancelled) setCheckedFor(userId ?? "");
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [userId, localGoal]);

  if (loading || !careerId) return null;

  const career = FINANCE_CAREERS.find((c) => c.id === careerId);
  if (!career) return null;

  const total = progress?.total ?? career.relatedLessonSlugs.length;
  const completed = progress?.completed ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const nextLesson = progress?.lessons.find((l) => !l.completed);

  return (
    <div className={`bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 ${compact ? "rounded-2xl border p-3" : "rounded-xl border-2 p-4"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="w-4 h-4 text-indigo-500" />
        <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          {t.careerGoalWidget.title}
        </p>
      </div>
      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{career.title}</p>
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 mt-2 mb-1.5">
        <span>{format(t.careerGoalWidget.progress, { completed, total })}</span>
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
          {format(t.careerGoalWidget.continue, { title: nextLesson.title })}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        <Link
          href="/su-nghiep"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {t.careerGoalWidget.allDone}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
