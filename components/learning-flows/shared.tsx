import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { Sys, StatusDot, btnPrimary } from "@/components/ui/system";
import type { Dictionary } from "@/lib/i18n";
import type { LessonMeta } from "@/lib/lesson-types";
import { flowLessonSlugs, type FlowStatus, type LearningFlow } from "@/lib/learning-flows";

type FlowsCopy = Dictionary["learningFlows"];

export { cleanLessonTitle } from "@/components/learning-flows/lesson-title";

export function flowStats(flow: LearningFlow, bySlug: Map<string, LessonMeta>) {
  const metas = flowLessonSlugs(flow)
    .map((s) => bySlug.get(s))
    .filter((m): m is LessonMeta => !!m);
  const minutes = metas.reduce((sum, m) => sum + (m.totalMinutes ?? (parseInt(m.duration, 10) || 0)), 0);
  return { count: metas.length, minutes };
}

/* i18n-ignore-start: định danh hệ thống (đường dẫn kiểu THCN://) - cùng một
   chuỗi ở mọi ngôn ngữ, như tên tệp hay đường dẫn, không phải chữ để dịch. */
export const FLOWS_SYS = {
  root: "THCN://FLOWS",
  flow: (id: string) => `THCN://FLOWS/${id.toUpperCase()}`,
  stepCode: (flowId: string, n: number) => `THCN://FLOWS/${flowId.toUpperCase()}/${String(n).padStart(2, "0")}`,
  stepPath: (flowId: string, stepId: string) => `~/${flowId}/${stepId}`,
  branches: "THCN://FLOWS/NEXT",
  journey: "THCN://FLOWS/RHYTHM",
  id: (n: number) => String(n).padStart(2, "0"),
};
/* i18n-ignore-end */

/**
 * Nhãn trạng thái của một hành trình: ô vuông trạng thái + chữ, viền 1px, bo
 * 2px. Không còn viên thuốc tô nền xanh/xanh trời: "sẵn sàng" là dữ liệu sống
 * nên được chấm xanh, hai trạng thái kia chấm xám và phân biệt bằng chữ.
 */
export function StatusPill({ status, t }: { status: FlowStatus; t: FlowsCopy }) {
  const label = status === "ready" ? t.statusReady : status === "partial" ? t.statusPartial : t.statusSoon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-stone-300 px-1.5 py-0.5 text-[11px] font-bold text-ink-soft dark:border-stone-700">
      <StatusDot tone={status === "ready" ? "brand" : "muted"} />
      {label}
    </span>
  );
}

/** Thanh điều hướng - cùng khuôn với thanh trên cùng của trang chủ. */
export function FlowsHeader({ t, code = FLOWS_SYS.root }: { t: FlowsCopy; code?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-300 bg-[#fbfaf7] dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Logo size={26} />
            <span className="truncate text-[13px] font-black uppercase tracking-[0.04em] text-ink-heading sm:text-[15px] sm:tracking-[0.12em]">
              {t.brand}
            </span>
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-surface-deep md:block" />
          <Sys className="hidden text-ink-muted md:inline">{code}</Sys>
        </div>
        <Link href="/dashboard" className={`${btnPrimary} shrink-0`}>
          {t.navLearn}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
