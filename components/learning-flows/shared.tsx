import Link from "next/link";
import Logo from "@/components/Logo";
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

export function StatusPill({ status, t }: { status: FlowStatus; t: FlowsCopy }) {
  const map = {
    ready: { label: t.statusReady, cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" },
    partial: { label: t.statusPartial, cls: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300" },
    soon: { label: t.statusSoon, cls: "bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200" },
  } as const;
  const { label, cls } = map[status];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide ${cls}`}>{label}</span>;
}

export function FlowsHeader({ t }: { t: FlowsCopy }) {
  return (
    <header className="border-b border-stone-200/80 dark:border-stone-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-black text-ink-max">
          <Logo size={28} />
          <span className="text-sm sm:text-base">{t.brand}</span>
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {t.navLearn}
        </Link>
      </div>
    </header>
  );
}
