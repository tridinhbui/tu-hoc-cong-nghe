import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { format } from "@/lib/i18n";
import type { ProjectStep } from "@/lib/vibecode-project";
import { Frame, Sys } from "@/components/ui/system";
import { cleanLessonTitle } from "./shared";

export interface ProjectPanelCopy {
  title: string;
  sub: string;
  progress: string;
  step: string;
  done: string;
  rule: string;
  signIn: string;
}

/**
 * Bảng tiến độ của dự án quán cà phê. Server component: dữ liệu (các bước và
 * lần qua bài tập) được trang cha đọc sẵn, nên không cần thêm lượt gọi mạng
 * phía trình duyệt. Mỗi bước dẫn thẳng tới bài chứa bài tập của nó.
 */
export default function VibecodeProjectPanel({ steps, signedIn, copy }: { steps: ProjectStep[]; signedIn: boolean; copy: ProjectPanelCopy }) {
  if (steps.length === 0) return null;
  const done = steps.filter((s) => s.done).length;
  return (
    <section aria-labelledby="vibecode-project-title" className="mb-12">
      <h2 id="vibecode-project-title" className="text-xl font-black tracking-tight text-ink-max sm:text-2xl">
        {copy.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">{copy.sub}</p>
      <p className="mt-3 font-mono text-xs tabular-nums text-ink-muted" data-testid="vibecode-project-progress">
        {signedIn ? format(copy.progress, { done, total: steps.length }) : copy.signIn}
      </p>
      <div className="mt-3 h-1.5 max-w-md overflow-hidden rounded-full bg-surface-deep" aria-hidden>
        <div className="h-full bg-brand-600 dark:bg-brand-500" style={{ width: `${signedIn ? Math.round((done / steps.length) * 100) : 0}%` }} />
      </div>
      <Frame title="~/project/steps" className="mt-4">
        <ol className="divide-y divide-stone-200 dark:divide-stone-800">
          {steps.map((s, i) => (
            <li key={s.lessonId}>
              <Link href={`/bai-hoc/${s.slug}?hanh-trinh=vibecode`} className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-page dark:hover:bg-stone-800/60">
                <span className="flex w-6 shrink-0 justify-center">
                  {s.done ? <CheckCircle2 className="h-4 w-4 text-accent-strong" aria-label={copy.done} /> : <Circle className="h-4 w-4 text-ink-faint" aria-hidden />}
                </span>
                <span className="min-w-0 flex-1">
                  <Sys className="text-ink-faint">{format(copy.step, { n: i + 1 })}</Sys>
                  <span className="block font-bold leading-snug text-ink-max group-hover:text-accent-strong">{cleanLessonTitle(s.title)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Frame>
      <p className="mt-3 max-w-2xl text-xs leading-5 text-ink-muted">{copy.rule}</p>
    </section>
  );
}
