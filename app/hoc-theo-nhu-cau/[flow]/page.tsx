import AppShell from "@/components/AppShell";
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
import { FLOWS_SYS, FlowsHeader, StatusPill, cleanLessonTitle, flowStats } from "@/components/learning-flows/shared";
import { Frame, SectionHead, Sys, btnPrimary, panel, textLink } from "@/components/ui/system";
import { CapabilityFacts, effortLabel } from "@/components/learning-flows/capability";
import CoCoSays from "@/components/CoCoSays";

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
  const r = getDictionary(locale).revampGoals;
  const cap = r.flows[flow.id];
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));
  const stats = flowStats(flow, bySlug);
  const firstWin = bySlug.get(flow.firstWinSlug);
  const note = flow.status === "partial" ? t.partialNote : flow.status === "soon" ? t.soonNote : null;

  // Trang công khai: khách chưa đăng nhập vẫn xem được, nên đọc tiến độ là
  // việc làm thêm khi có phiên, và hỏng thì bỏ qua chứ không làm hỏng trang.
  const completed = new Set<string>();
  let signedIn = false;
  try {
    const cloudflare = await createServerCloudflareClient();
    const {
      data: { user },
    } = await cloudflare.auth.getUser();
    if (user) {
      signedIn = true;
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

  // Người đã đăng nhập tới đây từ /lo-trinh (trong app), nên trang phải giữ
  // thanh điều hướng của app - thiếu nó thì họ không còn đường nào về ngoài
  // nút Back. Khách vẫn thấy đầu trang công khai (logo + "Vào học"). Vỏ app
  // chép đúng app/(app)/layout.tsx; route này không nằm trong nhóm (app) vì
  // nó phải mở được khi chưa đăng nhập.
  const Shell = signedIn ? AppShellFrame : PublicShell;

  return (
    <Shell t={t} code={FLOWS_SYS.flow(flow.id)}>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
        {/* Về đúng nơi người đọc chọn hành trình: /lo-trinh nếu đã đăng nhập
            (/hoc-theo-nhu-cau chuyển họ về đó), danh sách công khai nếu là khách. */}
        <Link
          href={signedIn ? "/lo-trinh" : "/hoc-theo-nhu-cau"}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink-muted transition-colors hover:text-ink-max"
        >
          <ArrowLeft className="h-4 w-4" />
          {signedIn ? t.backToStart : t.backToAll}
        </Link>

        {/* ── Mở đầu: câu nhu cầu bằng lời của người học ── */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line-strong text-ink-soft dark:border-stone-700">
              <Glyph emoji={flow.emoji} className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <StatusPill status={flow.status} t={t} />
            <span aria-hidden className="h-px flex-1 bg-surface-deep" />
          </div>
          <p className="text-base font-semibold text-ink-muted">“{copy.need}”</p>
          <h1 className="mt-1 text-[2.1rem] font-black leading-[1.08] tracking-tight text-ink-max sm:text-5xl">{copy.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-soft sm:text-base">{copy.promise}</p>
          <p className="mt-3 font-mono text-xs tabular-nums text-ink-muted">
            {format(t.stepCount, { count: flow.steps.length })} · {effortLabel(r, locale, stats.count, stats.minutes)}
          </p>
          <CapabilityFacts r={r} skill={cap.skill} output={cap.output} className="mt-4 max-w-xl" />
          {note ? (
            <p className="mt-4 max-w-2xl rounded-sm border border-line-strong bg-surface-raised px-4 py-3 text-sm leading-6 text-ink-body dark:border-stone-700 dark:bg-stone-900">
              {note}
            </p>
          ) : null}
        </div>

        {/* ── Thứ đầu tiên bạn làm ra: Cơ Cơ nói đúng việc cụ thể trong bài mở
            đầu (phần "Làm ngay hôm nay" của nó), rồi một nút duy nhất - cú bấm
            đầu tiên của cả trang. Thanh trái xanh thay cho dải nền mực: xanh
            là hành động, và đây là hành động. ── */}
        {firstWin ? (
          <section className="mb-12 border-l-[3px] border-brand-600 pl-4 sm:pl-5 dark:border-brand-400">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{r.firstBuildLabel}</p>
            <CoCoSays lines={[cap.firstBuild]} className="mt-2 max-w-2xl" />
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">{t.firstWinSub}</p>
            <Link href={`/bai-hoc/${flow.firstWinSlug}?hanh-trinh=${flow.id}`} className={`${btnPrimary} mt-3`}>
              <PlayCircle className="h-4 w-4" />
              {format(r.firstLessonCta, { minutes: minutesOf(flow.firstWinSlug) })}
            </Link>
          </section>
        ) : null}

        {/* ── Các chặng ── */}
        <ol className="space-y-14">
          {flow.steps.map((step, i) => {
            const stepCopy = (copy.steps as Record<string, FeynmanCopy & { title: string }>)[step.id];
            if (!stepCopy) return null;
            return (
              <li key={step.id}>
                <SectionHead
                  code={FLOWS_SYS.stepCode(flow.id, i + 1)}
                  eyebrow={format(t.stepLabel, { n: i + 1 })}
                  title={stepCopy.title}
                  className="mb-5"
                />

                <FeynmanCard badge={t.feynmanBadge} hint={t.feynmanHint} oneLinerLabel={t.oneLinerLabel} copy={stepCopy}>
                  {step.demo === "web-house" ? <WebHouseDemo /> : null}
                </FeynmanCard>

                <Frame
                  title={FLOWS_SYS.stepPath(flow.id, step.id)}
                  metaText={t.lessonsHeading}
                  className="mt-6"
                >
                  <ul className="divide-y divide-stone-200 dark:divide-stone-800">
                    {step.lessonSlugs.map((slug, j) => {
                      const meta = bySlug.get(slug);
                      if (!meta) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/bai-hoc/${slug}?hanh-trinh=${flow.id}`}
                            className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-page dark:hover:bg-stone-800/60"
                          >
                            <span className="flex w-6 shrink-0 justify-center">
                              {completed.has(slug) ? (
                                <CheckCircle2 className="h-4 w-4 text-accent-strong" aria-hidden />
                              ) : (
                                <Sys className="text-ink-faint">{FLOWS_SYS.id(j + 1)}</Sys>
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-bold leading-snug text-ink-max group-hover:text-accent-strong">
                                {cleanLessonTitle(meta.title)}
                              </span>
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
                </Frame>
              </li>
            );
          })}
        </ol>

        {/* ── Hai hướng đi tiếp ── */}
        <section className="mt-16">
          <SectionHead code={FLOWS_SYS.branches} title={t.branchesTitle} sub={t.branchesSub} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Hammer, title: t.deepenTitle, body: t.deepenBody, slug: flow.branches.deepenSlug },
              { icon: Mic2, title: t.buildTitle, body: t.buildBody, slug: flow.branches.buildSlug },
            ].map(({ icon: Icon, title, body, slug }) => {
              const meta = bySlug.get(slug);
              return (
                <div key={title} className={`${panel} flex flex-col p-5`}>
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line-strong text-ink-soft dark:border-stone-700">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-lg font-black tracking-tight text-ink-max">{title}</p>
                  <p className="mt-1 flex-1 text-sm leading-6 text-ink-soft">{body}</p>
                  {meta ? (
                    <Link href={`/bai-hoc/${slug}?hanh-trinh=${flow.id}`} className={`${textLink} mt-4`}>
                      {t.branchCta}: {cleanLessonTitle(meta.title)}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Shell>
  );
}

function AppShellFrame({ children }: { t: unknown; code: string; children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

function PublicShell({ t, code, children }: { t: Parameters<typeof FlowsHeader>[0]["t"]; code: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page dark:bg-stone-950">
      <FlowsHeader t={t} code={code} />
      {children}
    </div>
  );
}
