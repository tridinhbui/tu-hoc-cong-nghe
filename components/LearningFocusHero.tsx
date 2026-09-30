"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { trackFeatureClick } from "@/lib/feature-events";

// Thẻ "Học tiếp" đầu /hoc-bai - thứ nổi nhất trang, và là thứ DUY NHẤT trên
// trang mang nút hành động chính.
//
// Nó nhận bài và chặng từ chính danh sách bài bên dưới (DashboardClient tính
// `currentLessonId` theo đúng thứ tự chặng/phần đang vẽ), chứ không tự hỏi máy
// chủ. ResumeLearningButton hỏi `getResumeLesson`, và hai cách xếp thứ tự ấy
// từng lệch nhau: thẻ trên ghi "Chặng 1 · Bài 1" một bài, danh sách ngay dưới
// đánh dấu một bài khác là "Đang học". Hai câu trả lời cho "học gì tiếp" trên
// cùng một màn hình là đúng cái cảm giác lạc đường mà trang này phải xoá.
//
// Thanh tiến độ chặng chia thành từng ô, mỗi bài một ô: "3/9" là con số, còn
// ba ô sáng trên chín ô là thứ thấy được quãng đường.

export interface LearningFocusHeroProps {
  stageKicker: string;
  stageHeadline: string;
  lessonTitle: string;
  lessonSubtitle: string | null;
  lessonNumber: string;
  lessonTime: string;
  href: string;
  slug: string;
  /** Trạng thái từng bài trong chặng, theo thứ tự hiển thị. */
  stageSegments: ("done" | "current" | "todo")[];
  courseDone: number;
  courseTotal: number;
  onJumpToStage: () => void;
}

export default function LearningFocusHero({
  stageKicker,
  stageHeadline,
  lessonTitle,
  lessonSubtitle,
  lessonNumber,
  lessonTime,
  href,
  slug,
  stageSegments,
  courseDone,
  courseTotal,
  onJumpToStage,
}: LearningFocusHeroProps) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const stageDone = stageSegments.filter((s) => s === "done").length;
  const coursePercent = courseTotal > 0 ? Math.round((courseDone / courseTotal) * 100) : 0;

  return (
    <section className="relative overflow-hidden rounded-card bg-brand-700 text-white dark:bg-brand-900">
      {/* Lưới chấm rất nhạt: đủ để tấm thẻ có chất "môi trường làm việc", không
          đủ để thành hoạ tiết người ta phải nhìn. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative p-5 sm:p-7">
        {/* Hàng 1: nhãn + tiến độ cả lộ trình */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-100">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            {r.focusKicker}
          </span>
          <span className="flex items-center gap-2.5 font-mono text-[11px] tabular-nums text-brand-100/80">
            <span>{format(r.focusCourseProgress, { done: courseDone, total: courseTotal })}</span>
            <span className="h-1 w-20 overflow-hidden rounded-full bg-white/15">
              <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${coursePercent}%` }} />
            </span>
            <span className="text-white">{coursePercent}%</span>
          </span>
        </div>

        {/* Chặng chứa bài: nối bài vào chặng của nó, bấm để cuộn tới chặng. */}
        <button
          type="button"
          onClick={onJumpToStage}
          title={r.focusJumpToStage}
          className="mt-5 flex max-w-full cursor-pointer items-baseline gap-2 text-left text-brand-100 transition-colors hover:text-white"
        >
          <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">{stageKicker}</span>
          <span className="truncate text-sm font-semibold">{stageHeadline}</span>
        </button>

        <h2 className="mt-1.5 text-2xl font-black leading-tight tracking-tight sm:text-[30px]">
          {lessonTitle}
        </h2>
        {lessonSubtitle && (
          <p className="mt-2 max-w-2xl text-[15px] leading-snug text-brand-50/85 line-clamp-2">{lessonSubtitle}</p>
        )}

        {/* Hàng cuối: tiến độ chặng theo ô + nút chính */}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1 sm:max-w-md">
            <div className="flex gap-1" aria-hidden>
              {stageSegments.map((s, i) => (
                <span
                  key={i}
                  className={`h-2 flex-1 rounded-[2px] ${
                    s === "done" ? "bg-cyan-300" : s === "current" ? "bg-white motion-safe:animate-pulse" : "bg-white/15"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[11px] tabular-nums text-brand-100/80">
              <span className="text-white">{format(r.focusStageProgress, { done: stageDone, total: stageSegments.length })}</span>
              <span>{format(r.focusLessonMeta, { n: lessonNumber, time: lessonTime })}</span>
            </p>
          </div>

          <Link
            href={href}
            onClick={() => trackFeatureClick("resume_learning_click", { label: slug })}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-control bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wide text-brand-800 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-[background-color,transform] hover:bg-brand-50 active:translate-y-px"
          >
            {r.focusCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
