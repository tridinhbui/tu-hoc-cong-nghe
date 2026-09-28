import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, ArrowRight, Info } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { format, getDictionary } from "@/lib/i18n";
import { loadCertProgress } from "@/lib/cert-progress";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getServerLocale());
  return { title: t.certTracks.shared.metaTitle };
}

/**
 * /chung-chi - chọn chứng chỉ. Mỗi thẻ nói đủ ba điều người học cần để chọn:
 * mức (nền tảng hay trung cấp), đề thi trông thế nào (số câu, thời gian, điểm
 * đạt), và mình đã học được bao nhiêu phần của nó rồi - vì bài của các chứng
 * chỉ chồng lên nhau, người đã học AWS nền tảng mở Security+ ra sẽ thấy mình
 * không bắt đầu từ số 0.
 */
export default async function ChungChiPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const s = t.certTracks.shared;
  const { certs } = await loadCertProgress(locale);

  return (
    <div className="min-h-full bg-surface font-sans text-ink">
      <div className="relative overflow-hidden border-b border-line bg-brand-900 text-white">
        <Image
          src="/images/dashboard/mountains_panorama_banner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        {/* Ảnh núi sáng màu: không có lớp phủ thì dòng phụ trắng chìm vào trời. */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/70 to-brand-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-brand-200 uppercase">
            <Award className="h-3.5 w-3.5" />
            {s.hubEyebrow}
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{s.hubTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-100/90">{s.hubSubtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {certs.map(({ cert, domains, distinctLessonCount, distinctCompleted }) => {
            const pct = distinctLessonCount > 0 ? Math.round((distinctCompleted / distinctLessonCount) * 100) : 0;
            const copy = t.certTracks.certs[cert.id];
            return (
              <Link
                key={cert.id}
                href={`/chung-chi/${cert.id}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:bg-stone-900"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[11px] font-black text-brand-800 dark:bg-brand-950/60 dark:text-brand-300">
                    {cert.examCode}
                  </span>
                  <span className="text-[11px] font-bold text-ink-muted">
                    {cert.level === "associate" ? s.levelAssociate : s.levelFoundational}
                  </span>
                </div>
                <h2 className="mt-3 text-base font-black leading-snug text-ink-max">{cert.name}</h2>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted">{copy.tagline}</p>
                <p className="mt-3 font-mono text-[11px] font-bold text-ink-faint">
                  {format(s.examFacts, { questions: cert.questions, minutes: cert.minutes, score: cert.passingScore })}
                </p>
                <div className="mt-4 space-y-1.5 border-t border-line pt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-ink-muted">
                    <span>{format(s.domainsCount, { count: domains.length })}</span>
                    <span className="font-mono">
                      {format(s.lessonsProgress, { done: distinctCompleted, total: distinctLessonCount })}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                    <div className="h-full rounded-full bg-brand-600 dark:bg-brand-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-accent group-hover:gap-2.5 transition-all">
                  {s.openTrack}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="flex items-start gap-2 rounded-2xl border border-line bg-white p-4 text-xs leading-relaxed text-ink-muted dark:bg-stone-900">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          {s.hubNote}
        </p>
      </div>
    </div>
  );
}
