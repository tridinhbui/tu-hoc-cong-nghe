import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Glyph from "@/components/Glyph";
import { getDictionary } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { redirect } from "next/navigation";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { LEARNING_FLOWS } from "@/lib/learning-flows";
import { FLOWS_SYS, FlowsHeader, StatusPill, flowStats } from "@/components/learning-flows/shared";
import { CapabilityFacts, effortLabel } from "@/components/learning-flows/capability";
import { SectionHead, Sys, textLink } from "@/components/ui/system";

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
  const r = getDictionary(locale).revampGoals;
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));

  return (
    <div className="min-h-screen bg-page dark:bg-stone-950">
      <FlowsHeader t={t} />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mb-6 flex items-center gap-3">
          <Sys className="text-ink-muted">{FLOWS_SYS.root}</Sys>
          <span aria-hidden className="h-px flex-1 bg-surface-deep" />
        </div>
        <p className="eyebrow mb-3 text-ink-soft">{t.eyebrow}</p>
        <h1 className="mb-4 text-[2.2rem] font-black leading-[1.05] tracking-tight text-ink-max sm:text-5xl">{t.title}</h1>
        <p className="mb-10 max-w-2xl text-[15px] leading-7 text-ink-soft sm:text-base">{t.sub}</p>

        {/* Mỗi lối học là một NĂNG LỰC: tên việc, công sức thật (số bài ·
            giờ), kỹ năng có được và output cầm được ở cuối. Không khung thẻ
            riêng cho từng ô - các ô chung một lưới kẻ 1px, rê chuột thì thanh
            trái xanh hiện ra. */}
        <ul className="grid gap-px border-y border-line-strong bg-surface-deep sm:grid-cols-2">
          {LEARNING_FLOWS.map((flow) => {
            const copy = t.flows[flow.id];
            const cap = r.flows[flow.id];
            const stats = flowStats(flow, bySlug);
            return (
              <li key={flow.id} className="bg-page dark:bg-stone-950">
                <Link
                  href={`/hoc-theo-nhu-cau/${flow.id}`}
                  className="group relative flex h-full flex-col gap-3 px-5 py-5 transition-colors hover:bg-surface"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] bg-transparent transition-colors group-hover:bg-brand-600 dark:group-hover:bg-brand-500"
                  />
                  <div className="flex items-start gap-3">
                    <Glyph
                      emoji={flow.emoji}
                      className="mt-1 h-5 w-5 shrink-0 text-ink-soft transition-colors group-hover:text-accent-strong"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-black leading-snug tracking-tight text-ink-max">{copy.title}</h2>
                      <span className="mt-0.5 block font-mono text-[11px] tabular-nums text-ink-muted">
                        {effortLabel(r, locale, stats.count, stats.minutes)}
                      </span>
                    </div>
                    {flow.status !== "ready" ? <StatusPill status={flow.status} t={t} /> : null}
                  </div>
                  <CapabilityFacts r={r} skill={cap.skill} output={cap.output} className="flex-1 pl-8" />
                  <span className="inline-flex items-center gap-1 pl-8 text-sm font-bold text-accent-strong">
                    {r.start}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
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
          <ol className="mt-5 grid gap-px overflow-hidden rounded-md border border-line-strong bg-stone-300 lg:grid-cols-7 dark:border-stone-700 dark:bg-stone-700">
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
