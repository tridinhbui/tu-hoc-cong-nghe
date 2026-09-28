import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Glyph from "@/components/Glyph";
import { getDictionary, format } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { redirect } from "next/navigation";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { LEARNING_FLOWS } from "@/lib/learning-flows";
import { FLOWS_SYS, FlowsHeader, StatusPill, flowStats } from "@/components/learning-flows/shared";
import { SectionHead, Sys, panel, textLink } from "@/components/ui/system";

// Công khai, không cần đăng nhập: đây là cửa vào cho người CHƯA quyết định học,
// giống /bai-hoc. Đọc locale nên chạy động - nhưng layout gốc đã đọc cookie
// rồi, nên trang này không mất gì thêm (xem chú thích ở app/bai-hoc/[slug]).
export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getServerLocale()).learningFlows;
  return { title: t.metaTitle, description: t.metaDescription };
}

/** Có phiên hay không - hỏng (không D1, cookie lạ) thì coi như khách. */
async function isSignedIn() {
  try {
    const cloudflare = await createServerCloudflareClient();
    const {
      data: { user },
    } = await cloudflare.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

export default async function LearningFlowsPage() {
  // Người đã đăng nhập có đúng câu hỏi này ở đầu /lo-trinh ("Bắt đầu từ đâu"),
  // kèm tiến độ của họ và nhịp học. Hai trang cùng hỏi "bạn muốn làm gì?" là
  // hai chỗ phải đoán nên vào chỗ nào, nên họ được đưa thẳng về đó. Trang này
  // còn lại cho khách: /lo-trinh cần đăng nhập, còn trang chủ công khai cần một
  // chỗ để người chưa đăng ký xem mỗi hành trình gồm những gì.
  if (await isSignedIn()) redirect("/lo-trinh");

  const locale = await getServerLocale();
  const t = getDictionary(locale).learningFlows;
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));

  return (
    <div className="min-h-screen bg-[#fbfaf7] dark:bg-stone-950">
      <FlowsHeader t={t} />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mb-6 flex items-center gap-3">
          <Sys className="text-ink-muted">{FLOWS_SYS.root}</Sys>
          <span aria-hidden className="h-px flex-1 bg-surface-deep" />
        </div>
        <p className="eyebrow mb-3 text-ink-soft">{t.eyebrow}</p>
        <h1 className="mb-4 text-[2.2rem] font-black leading-[1.05] tracking-tight text-ink-max sm:text-5xl">{t.title}</h1>
        <p className="mb-10 max-w-2xl text-[15px] leading-7 text-ink-soft sm:text-base">{t.sub}</p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {LEARNING_FLOWS.map((flow) => {
            const copy = t.flows[flow.id];
            const stats = flowStats(flow, bySlug);
            return (
              <li key={flow.id}>
                <Link
                  href={`/hoc-theo-nhu-cau/${flow.id}`}
                  className={`${panel} group flex h-full flex-col p-5 transition-colors hover:border-brand-600 dark:hover:border-brand-400`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-stone-200 pb-3 dark:border-stone-800">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-stone-300 text-ink-soft transition-colors group-hover:border-brand-600 group-hover:text-accent-strong dark:border-stone-700">
                        <Glyph emoji={flow.emoji} className="h-5 w-5" />
                      </span>
                      <Sys className="truncate normal-case text-ink-faint">{FLOWS_SYS.flow(flow.id)}</Sys>
                    </span>
                    <StatusPill status={flow.status} t={t} />
                  </div>
                  <p className="text-sm font-semibold text-ink-muted">“{copy.need}”</p>
                  <h2 className="mt-1 text-xl font-black tracking-tight text-ink-max">{copy.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{copy.promise}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3 text-xs text-ink-muted dark:border-stone-800">
                    <span>
                      {format(t.stepCount, { count: flow.steps.length })} ·{" "}
                      {format(t.lessonCount, { count: stats.count, minutes: stats.minutes })}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 font-bold text-accent-strong">
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
            bằng "học". Bước "Mình làm được!" đứng trên nền mực vì mọi thứ trên
            trang này được sắp để đưa người đọc tới đúng bước đó sớm nhất. */}
        <section className="mt-14">
          <SectionHead code={FLOWS_SYS.journey} title={t.journeyTitle} sub={t.journeySub} />
          <ol className="mt-5 grid gap-px overflow-hidden rounded-md border border-stone-300 bg-stone-300 lg:grid-cols-7 dark:border-stone-700 dark:bg-stone-700">
            {t.journeySteps.map((step, i) => (
              <li
                key={step}
                className={`flex items-baseline gap-3 px-3.5 py-3 text-sm font-bold lg:flex-col lg:gap-1.5 ${
                  i === 3
                    ? "bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950"
                    : "bg-white text-ink-body dark:bg-stone-900"
                }`}
              >
                <Sys className={i === 3 ? "text-ink-faint" : "text-ink-faint"}>{FLOWS_SYS.id(i + 1)}</Sys>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-8">
          <Link href="/lo-trinh" className={textLink}>
            {t.allTracks}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </main>
    </div>
  );
}
