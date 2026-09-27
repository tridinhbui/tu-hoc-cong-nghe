import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Hammer, Mic2, PlayCircle } from "lucide-react";
import Glyph from "@/components/Glyph";
import { getDictionary, format } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { LEARNING_FLOWS, getLearningFlow } from "@/lib/learning-flows";
import FeynmanCard, { type FeynmanCopy } from "@/components/learning-flows/FeynmanCard";
import WebHouseDemo from "@/components/learning-flows/WebHouseDemo";
import { FlowsHeader, StatusPill, cleanLessonTitle, flowStats } from "@/components/learning-flows/shared";

export function generateStaticParams() {
  return LEARNING_FLOWS.map((f) => ({ flow: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ flow: string }> }): Promise<Metadata> {
  const { flow: id } = await params;
  const flow = getLearningFlow(id);
  if (!flow) return {};
  const t = getDictionary(await getServerLocale()).learningFlows;
  const copy = t.flows[flow.id];
  return { title: `${copy.title} | ${t.brand}`, description: copy.promise };
}

/**
 * Một hành trình: chiến thắng đầu tiên → các chặng (thẻ Feynman + bài học
 * kỹ hơn) → hai hướng đi tiếp.
 *
 * Thứ tự này là nhịp người học đàn trong lib/learning-flows.ts: "thử ngay"
 * đứng TRƯỚC chặng 1, không phải sau nó, vì cảm giác "mình làm được" phải tới
 * trước khi người non-tech gặp chữ "biến", "hàm", "API" đầu tiên.
 */
export default async function LearningFlowPage({ params }: { params: Promise<{ flow: string }> }) {
  const { flow: id } = await params;
  const flow = getLearningFlow(id);
  if (!flow) notFound();

  const locale = await getServerLocale();
  const t = getDictionary(locale).learningFlows;
  const copy = t.flows[flow.id];
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));
  const stats = flowStats(flow, bySlug);
  const firstWin = bySlug.get(flow.firstWinSlug);
  const note = flow.status === "partial" ? t.partialNote : flow.status === "soon" ? t.soonNote : null;

  // Trang công khai: khách chưa đăng nhập vẫn xem được, nên đọc tiến độ là
  // việc làm thêm khi có phiên, và hỏng thì bỏ qua chứ không làm hỏng trang.
  const completed = new Set<string>();
  try {
    const cloudflare = await createServerCloudflareClient();
    const {
      data: { user },
    } = await cloudflare.auth.getUser();
    if (user) {
      const { data } = await cloudflare.from("user_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true);
      const ids = new Set((data ?? []).map((r) => r.lesson_id as number));
      for (const m of metas) if (ids.has(m.id)) completed.add(m.slug);
    }
  } catch {
    // Không có phiên hoặc không có D1 - hiện trang như với khách.
  }

  const minutesOf = (slug: string) => {
    const m = bySlug.get(slug);
    return m ? m.totalMinutes ?? (parseInt(m.duration, 10) || 0) : 0;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] dark:bg-stone-950">
      <FlowsHeader t={t} />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
        <Link
          href="/hoc-theo-nhu-cau"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink-muted transition-colors hover:text-ink-max"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToAll}
        </Link>

        {/* ── Mở đầu: câu nhu cầu bằng lời của người học ── */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-2xl bg-accent-soft p-3 text-accent"><Glyph emoji={flow.emoji} className="h-9 w-9" strokeWidth={1.5} /></span>
            <StatusPill status={flow.status} t={t} />
          </div>
          <p className="text-base font-semibold text-ink-muted">“{copy.need}”</p>
          <h1 className="mt-1 text-[2.1rem] font-black leading-[1.08] tracking-tight text-ink-max sm:text-5xl">{copy.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-body sm:text-lg">{copy.promise}</p>
          <p className="mt-3 text-sm text-ink-muted">
            {format(t.stepCount, { count: flow.steps.length })} ·{" "}
            {format(t.lessonCount, { count: stats.count, minutes: stats.minutes })}
          </p>
          {note ? (
            <p className="mt-4 max-w-2xl rounded-xl border border-sky-300/60 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
              {note}
            </p>
          ) : null}
        </div>

        {/* ── Chiến thắng đầu tiên ── */}
        {firstWin ? (
          <section className="mb-12 flex flex-col gap-4 rounded-2xl bg-stone-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:bg-stone-100 dark:text-stone-950">
            <div>
              <p className="text-lg font-black">{t.firstWinTitle}</p>
              <p className="mt-1 max-w-xl text-sm leading-6 opacity-80">{t.firstWinSub}</p>
            </div>
            <Link
              href={`/bai-hoc/${flow.firstWinSlug}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-3 text-sm font-black text-amber-950 transition-colors hover:bg-amber-300"
            >
              <PlayCircle className="h-4 w-4" />
              {t.firstWinCta} · {format(t.minutes, { minutes: minutesOf(flow.firstWinSlug) })}
            </Link>
          </section>
        ) : null}

        {/* ── Các chặng ── */}
        <ol className="space-y-12">
          {flow.steps.map((step, i) => {
            const stepCopy = (copy.steps as Record<string, FeynmanCopy & { title: string }>)[step.id];
            if (!stepCopy) return null;
            return (
              <li key={step.id}>
                <p className="eyebrow mb-2 text-accent-strong">{format(t.stepLabel, { n: i + 1 })}</p>
                <h2 className="mb-5 text-2xl font-black leading-tight tracking-tight text-ink-max sm:text-3xl">{stepCopy.title}</h2>

                <FeynmanCard badge={t.feynmanBadge} hint={t.feynmanHint} oneLinerLabel={t.oneLinerLabel} copy={stepCopy}>
                  {step.demo === "web-house" ? <WebHouseDemo /> : null}
                </FeynmanCard>

                <p className="mb-3 mt-6 text-sm font-black uppercase tracking-wide text-ink-muted">{t.lessonsHeading}</p>
                <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
                  {step.lessonSlugs.map((slug, j) => {
                    const meta = bySlug.get(slug);
                    if (!meta) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/bai-hoc/${slug}`}
                          className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/60"
                        >
                          {completed.has(slug) ? (
                            <CheckCircle2 className="h-7 w-7 shrink-0 text-accent" aria-hidden />
                          ) : (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-black tabular-nums text-ink-muted dark:bg-stone-800">
                              {j + 1}
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block font-bold leading-snug text-ink-max">{cleanLessonTitle(meta.title)}</span>
                            <span className="block text-xs text-ink-muted">
                              {format(t.minutes, { minutes: minutesOf(slug) })} · {getDictionary(locale).difficulty[meta.difficulty]}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>

        {/* ── Hai hướng đi tiếp ── */}
        <section className="mt-16">
          <h2 className="text-2xl font-black tracking-tight text-ink-max sm:text-3xl">{t.branchesTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-body sm:text-base">{t.branchesSub}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Hammer, title: t.deepenTitle, body: t.deepenBody, slug: flow.branches.deepenSlug },
              { icon: Mic2, title: t.buildTitle, body: t.buildBody, slug: flow.branches.buildSlug },
            ].map(({ icon: Icon, title, body, slug }) => {
              const meta = bySlug.get(slug);
              return (
                <div key={title} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                  <Icon className="mb-3 h-6 w-6 text-accent-strong" aria-hidden />
                  <p className="text-lg font-black text-ink-max">{title}</p>
                  <p className="mt-1 flex-1 text-sm leading-6 text-ink-body">{body}</p>
                  {meta ? (
                    <Link
                      href={`/bai-hoc/${slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-accent-strong underline-offset-4 hover:underline"
                    >
                      {t.branchCta}: {cleanLessonTitle(meta.title)}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
