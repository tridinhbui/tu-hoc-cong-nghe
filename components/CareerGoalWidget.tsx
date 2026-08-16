"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMyCareerGoal } from "@/lib/supabase-career-goals";
import { getCareerLessonProgress, type CareerLessonProgress } from "@/lib/career-lesson-progress";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";
import { CAREER_GOAL_KEY, CAREER_GOAL_STORAGE_EVENT } from "@/lib/career-goal-storage";
import { useI18n } from "@/lib/i18n/context";
import { mergeCareer } from "@/lib/finance-careers-i18n";
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
  const { t, locale } = useI18n();
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
    // `compact` = KHÔNG VỎ. Khối chung do DashboardClient dựng; ở đây chỉ còn
    // nội dung, nên hai thẻ cạnh nhau thôi là hai mặt phẳng cạnh nhau.
    //
    // Bỏ chàm/tím: thanh tiến độ từng tô gradient indigo→violet và cả ba liên
    // kết đều màu indigo, trong khi ngay bên cạnh là một thẻ cam và một banner
    // xanh lá. Ba họ màu ở cùng trọng lượng thì không màu nào còn nghĩa. Tiến
    // độ giờ dùng xanh lá - màu DUY NHẤT của tiến độ trong sản phẩm này.
    <div className={compact ? "" : "rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"}>
      <p className="eyebrow text-stone-400 dark:text-stone-500">
        {t.careerGoalWidget.title}
      </p>
      {/* Tên nghề và phần trăm trên CÙNG một hàng: hai con số của cùng một
          mục tiêu, không cần hai dòng và một khoảng cách 12px giữa chúng. */}
      <div className="mt-0.5 flex items-baseline justify-between gap-3">
        <p className="min-w-0 truncate text-[15px] font-semibold text-stone-900 dark:text-stone-100">
          {mergeCareer(career, locale).title}
        </p>
        <span className="shrink-0 text-xs tabular-nums text-stone-500 dark:text-stone-400">{percent}%</span>
      </div>

      {/* Ở 0% thì thanh tiến độ và dòng "0/14 bài" nói cùng một điều: chưa bắt
          đầu. Giữ cả hai là dành một thẻ cao cho một con số bằng không, đúng
          thứ làm mục tiêu nghề nghiệp trông như một ô trống trên dashboard.
          Nên khi chưa học bài nào, khối này rút còn một dòng và một lối đi. */}
      <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
        {format(t.careerGoalWidget.progress, { completed, total })}
      </p>
      <div className={`mt-1 h-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800 ${completed === 0 ? "hidden" : ""}`}>
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-500 dark:bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* CTA CHÍNH và duy nhất của cả khối. Trước đây nó là một liên kết chữ
          màu chàm, cùng trọng lượng với "Mở góc yên tĩnh" ở thẻ bên cạnh - hai
          lời mời ngang nhau, không cái nào là việc tiếp theo. */}
      {nextLesson ? (
        <Link
          href={`/bai-hoc/${nextLesson.slug}`}
          className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          {format(t.careerGoalWidget.continue, { title: nextLesson.title })}
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </Link>
      ) : (
        <Link
          href="/su-nghiep"
          className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-[13px] font-semibold text-stone-700 transition-colors hover:border-stone-400 dark:border-stone-700 dark:text-stone-300"
        >
          {t.careerGoalWidget.allDone}
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </Link>
      )}
    </div>
  );
}
