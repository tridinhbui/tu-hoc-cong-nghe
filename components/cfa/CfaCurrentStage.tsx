"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { XP_PER_LESSON } from "@/lib/levels";

export type CfaStageSummary = {
  id: string;
  name: string;
  total: number;
  completed: number;
  nextLessonSlug: string | null;
  nextLessonTitle: string | null;
};

/**
 * Hero của /cfa: MỘT chặng, và một nút.
 *
 * Trang này trả lời đúng một câu khi mở ra - "giờ tôi học gì" - và trước đây
 * câu ấy nằm sau mười môn xếp thành bảng. Người đọc phải tự dò môn nào còn dở,
 * tự tìm bài kế tiếp trong đó, rồi mới bấm được. Ba bước cho một câu hỏi.
 *
 * "Chặng hiện tại" là môn ĐẦU TIÊN chưa xong theo thứ tự giáo trình, không
 * phải môn học gần nhất. Thứ tự CFA_LEVEL_1_SUBJECTS là thứ tự sư phạm; nhảy
 * theo lần truy cập cuối sẽ đưa người học tới chỗ họ bỏ dở vì thấy khó, chứ
 * không phải chỗ họ nên tới.
 *
 * XP là con số THẬT: XP_PER_LESSON, cùng hằng số mọi bài học khác dùng. Không
 * bịa một phần thưởng riêng cho trang này, vì hai chỗ hứa hai mức XP khác nhau
 * cho cùng một việc là chỗ hỏng khó lần nhất.
 */
export default function CfaCurrentStage({ stages }: { stages: CfaStageSummary[] }) {
  const { t } = useI18n();
  const c = t.finalTwo.cfaPage;

  const current = stages.find((s) => s.completed < s.total) ?? null;

  // Xong hết: không dựng một hero rỗng với thanh 100% và nút không đi đâu.
  if (!current || !current.nextLessonSlug) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
        <div className="flex items-center gap-2.5">
          <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-base font-black text-stone-900 dark:text-stone-100">{c.stageAllDone}</p>
        </div>
      </section>
    );
  }

  const pct = current.total > 0 ? Math.round((current.completed / current.total) * 100) : 0;
  const left = current.total - current.completed;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
        {c.stageEyebrow}
      </p>
      <h2 className="mt-1 text-xl font-black leading-tight text-stone-900 sm:text-2xl dark:text-stone-100">
        {current.name}
      </h2>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-sm font-bold text-stone-600 dark:text-stone-400">
          {format(c.stageProgress, { done: current.completed, total: current.total })}
        </p>
        <p className="shrink-0 text-sm font-black tabular-nums text-stone-900 dark:text-stone-100">{pct}%</p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={current.total}
        aria-valuenow={current.completed}
        aria-label={format(c.stageProgress, { done: current.completed, total: current.total })}
        className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
      >
        <div
          className="h-full rounded-full bg-stone-900 transition-all duration-500 dark:bg-stone-100"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Mốc kế tiếp là HẾT MÔN NÀY - mốc duy nhất có thật ở đây. Không bịa một
          chuỗi huy hiệu trung gian mà hệ thống không cấp. */}
      <p className="mt-2 text-xs font-medium text-stone-500 dark:text-stone-400">
        {format(c.stageMilestone, { count: left })}
      </p>

      {/* CTA: thứ nổi nhất trang, và nó đi thẳng tới BÀI cụ thể chứ không tới
          danh sách môn. Một nút "Học tiếp" dẫn tới một danh sách là bắt người
          đọc chọn lại đúng thứ nút vừa hứa sẽ chọn hộ. */}
      <Link
        href={`/bai-hoc/${current.nextLessonSlug}`}
        className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-stone-900 px-4 py-3 transition-opacity hover:opacity-90 dark:bg-stone-100"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
            {c.stageCta}
          </span>
          <span className="mt-0.5 block truncate text-sm font-bold text-white dark:text-stone-900">
            {current.nextLessonTitle}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-xs font-black text-emerald-400 dark:text-emerald-600">+{XP_PER_LESSON} XP</span>
          <ArrowRight className="h-4 w-4 text-white dark:text-stone-900" />
        </span>
      </Link>
    </section>
  );
}
