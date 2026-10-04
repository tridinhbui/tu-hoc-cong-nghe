import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck, Clock, Dices, MousePointerClick, SlidersHorizontal } from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { getDictionary, format } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { START_GUIDE_TRY_SLUGS } from "@/lib/start-guide";
import { IconTile, Sys, btnPrimary, btnSecondary, chipAccent, panel, panelFocus, textLink } from "@/components/ui/system";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getServerLocale()).startGuide;
  return { title: t.metaTitle };
}

/** Biểu tượng bốn bước, theo đúng thứ tự `steps` trong từ điển. */
const STEP_ICONS = [MousePointerClick, Dices, SlidersHorizontal, CalendarCheck];

/**
 * "Một bài học, chơi thế này" - nằm dưới /lo-trinh ("Bắt đầu từ đâu").
 *
 * Trang ngắn cho người sắp mở bài đầu tiên: bốn bước, ba bài để thử, và một
 * câu nói rõ chỗ nào để phàn nàn. Ba bài thử là ba bài đợt 1 đã được chọn ngẫu
 * nhiên để người ngoài ngành đọc (HUONG-DAN-NGUOI-DOC-MAU.md); thời lượng lấy
 * từ `totalMinutes` của bài chứ không viết cứng, vì con số đó đổi mỗi khi bài
 * được sửa.
 *
 * Không có nội dung nào ở đây phụ thuộc vào tiến độ người dùng, nên trang là
 * server component thuần: không effect, không trạng thái.
 */
export default async function StartGuidePage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale).startGuide;
  const metas = await getLessonsMeta(locale);
  const bySlug = new Map(metas.map((m) => [m.slug, m]));

  const tries = START_GUIDE_TRY_SLUGS.map((slug, i) => ({ slug, for: t.tries[i]?.for ?? "", meta: bySlug.get(slug) })).filter(
    (x): x is typeof x & { meta: NonNullable<typeof x.meta> } => Boolean(x.meta)
  );
  const minutes = tries.map((x) => x.meta.totalMinutes ?? 0).filter((m) => m > 0);
  const range = minutes.length ? (Math.min(...minutes) === Math.max(...minutes) ? `${minutes[0]}` : `${Math.min(...minutes)}-${Math.max(...minutes)}`) : "10-15";

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 pb-16 pt-5 sm:px-6 lg:px-8">
      <header>
        <Link href="/lo-trinh" className={`${textLink} text-sm`}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t.back}
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <Sys className="text-accent-strong">
            {/* i18n-ignore-start: mã định vị hệ thống, cùng họ với THCN://APP/DASHBOARD */}
            {"THCN://APP/HUONG-DAN"}
            {/* i18n-ignore-end */}
          </Sys>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <p className="eyebrow mt-3 text-ink-soft">{t.eyebrow}</p>
        <h1 className="mt-2 text-[2rem] font-black leading-[1.08] tracking-tight text-ink-max sm:text-5xl">{t.title}</h1>
        <p className="mt-3 max-w-[60ch] text-base leading-7 text-ink-soft">{t.sub}</p>
      </header>

      <CoCoSays lines={t.coco} size={44} />

      <section aria-labelledby="steps-title" className="space-y-3">
        <h2 id="steps-title" className="text-lg font-black tracking-tight text-ink-max">
          {t.stepsTitle}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {t.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? MousePointerClick;
            return (
              <li key={step.title} className={`${panel} flex flex-col gap-3 p-4 sm:p-5`}>
                <div className="flex items-center gap-3">
                  <IconTile className="h-11 w-11">
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </IconTile>
                  <div className="min-w-0">
                    <Sys className="text-ink-muted tabular-nums">{String(i + 1).padStart(2, "0")}</Sys>
                    <h3 className="text-base font-black leading-snug tracking-tight text-ink-max">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-6 text-ink-body">{step.body}</p>
                <p className="mt-auto text-[13px] font-bold text-accent-strong">{step.note}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="try-title" className="space-y-3">
        <div>
          <h2 id="try-title" className="text-lg font-black tracking-tight text-ink-max">
            {t.tryTitle}
          </h2>
          <p className="mt-0.5 text-sm text-ink-muted">{format(t.trySub, { minutes: range })}</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {tries.map(({ slug, for: forWho, meta }) => (
            <li key={slug} className={`${panelFocus} flex flex-col gap-3 p-4`}>
              <span className={`${chipAccent} self-start`}>
                <Clock className="h-3 w-3" aria-hidden />
                {format(t.tryMinutes, { count: meta.totalMinutes ?? 10 })}
              </span>
              <h3 className="text-base font-black leading-snug tracking-tight text-ink-max">{getLessonShortTitle({ title: meta.title })}</h3>
              <p className="text-sm leading-6 text-ink-soft">
                <span className="font-bold text-ink-body">{t.tryFor}</span> {forWho}
              </p>
              <Link href={`/bai-hoc/${slug}`} className={`${btnPrimary} mt-auto w-full`}>
                {t.tryOpen}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stuck-title" className={`${panel} space-y-3 p-4 sm:p-5`}>
        <h2 id="stuck-title" className="text-lg font-black tracking-tight text-ink-max">
          {t.stuckTitle}
        </h2>
        <p className="max-w-[68ch] text-sm leading-6 text-ink-body">{t.stuckBody}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-bold text-ink-soft">
          {t.promises.map((line) => (
            <li key={line} className="flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {line}
            </li>
          ))}
        </ul>
        <Link href="/lo-trinh" className={`${btnSecondary} self-start`}>
          {t.ctaPath}
        </Link>
      </section>
    </div>
  );
}
