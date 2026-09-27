import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary, format } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { LEARNING_FLOWS } from "@/lib/learning-flows";
import { FlowsHeader, StatusPill, flowStats } from "@/components/learning-flows/shared";

// Công khai, không cần đăng nhập: đây là cửa vào cho người CHƯA quyết định học,
// giống /bai-hoc. Đọc locale nên chạy động - nhưng layout gốc đã đọc cookie
// rồi, nên trang này không mất gì thêm (xem chú thích ở app/bai-hoc/[slug]).
export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getServerLocale()).learningFlows;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function LearningFlowsPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).learningFlows;
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));

  return (
    <div className="min-h-screen bg-[#fbfaf7] dark:bg-stone-950">
      <FlowsHeader t={t} />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <p className="eyebrow mb-3 flex items-center gap-3 text-ink-muted">
          <span aria-hidden className="h-px w-8 bg-emerald-600 dark:bg-emerald-500" />
          {t.eyebrow}
        </p>
        <h1 className="mb-3 text-[2.2rem] font-black leading-[1.05] tracking-tight text-ink-max sm:text-5xl">{t.title}</h1>
        <p className="mb-10 max-w-2xl text-[15px] leading-7 text-ink-body sm:text-lg">{t.sub}</p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {LEARNING_FLOWS.map((flow) => {
            const copy = t.flows[flow.id];
            const stats = flowStats(flow, bySlug);
            return (
              <li key={flow.id}>
                <Link
                  href={`/hoc-theo-nhu-cau/${flow.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition-colors hover:border-emerald-600 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-500"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="text-4xl" aria-hidden>{flow.emoji}</span>
                    <StatusPill status={flow.status} t={t} />
                  </div>
                  <p className="text-sm font-semibold text-ink-muted">“{copy.need}”</p>
                  <h2 className="mt-1 text-xl font-black text-ink-max">{copy.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-body">{copy.promise}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3 text-xs text-ink-muted dark:border-stone-800">
                    <span>
                      {format(t.stepCount, { count: flow.steps.length })} ·{" "}
                      {format(t.lessonCount, { count: stats.count, minutes: stats.minutes })}
                    </span>
                    <span className="inline-flex items-center gap-1 font-black text-accent-strong">
                      {t.openFlow}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Nhịp người học đàn - lý do trang này bắt đầu bằng "thử" chứ không
            bằng "học". Bước "Mình làm được!" được tô nổi vì mọi thứ trên trang
            này được sắp để đưa người đọc tới đúng bước đó sớm nhất. */}
        <section className="mt-14 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-xl font-black text-ink-max sm:text-2xl">{t.journeyTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-body sm:text-base">{t.journeySub}</p>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {t.journeySteps.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                    i === 3
                      ? "bg-amber-400 text-amber-950"
                      : "bg-stone-100 text-ink-body dark:bg-stone-800"
                  }`}
                >
                  {step}
                </span>
                {i < t.journeySteps.length - 1 ? <span aria-hidden className="text-ink-muted">→</span> : null}
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-8 text-sm text-ink-muted">
          <Link href="/lo-trinh" className="font-bold text-accent-strong underline-offset-4 hover:underline">
            {t.allTracks} →
          </Link>
        </p>
      </main>
    </div>
  );
}
