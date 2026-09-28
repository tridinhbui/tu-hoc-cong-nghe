import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { format, getDictionary } from "@/lib/i18n";
import { getCertTrack } from "@/lib/cert-tracks";
import { loadCertProgress } from "@/lib/cert-progress";
import CertTrackView from "@/components/CertTrackView";
import CertPageHeader from "@/components/CertPageHeader";

// Đọc tiến độ của người đang xem - không dựng tĩnh.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ certId: string }> }): Promise<Metadata> {
  const { certId } = await params;
  const cert = getCertTrack(certId);
  const t = getDictionary(await getServerLocale());
  return { title: cert ? `${cert.name} (${cert.examCode})` : t.certTracks.shared.metaTitle };
}

export default async function CertTrackPage({ params }: { params: Promise<{ certId: string }> }) {
  const { certId } = await params;
  const cert = getCertTrack(certId);
  if (!cert) notFound();

  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const s = t.certTracks.shared;
  const { certs, completedLessonIds, xp, streak } = await loadCertProgress(locale);
  const progress = certs.find((c) => c.cert.id === cert.id)!;
  const pct = progress.distinctLessonCount > 0 ? Math.round((progress.distinctCompleted / progress.distinctLessonCount) * 100) : 0;

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-surface font-sans lg:h-dvh">
      <CertPageHeader
        completedPct={pct}
        eyebrow={`${s.hubEyebrow} · ${cert.examCode}`}
        title={cert.name}
        subtitle={s.pageSubtitle}
        streakLine={format(s.streakLine, { n: streak })}
        xp={xp}
      />

      <div className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col px-4 pt-3 pb-6 sm:px-6">
        <Link
          href="/chung-chi"
          className="mb-3 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-ink-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {s.backToHub}
        </Link>
        <CertTrackView
          cert={cert}
          domains={progress.domains}
          completedLessonIds={completedLessonIds}
          distinctLessonCount={progress.distinctLessonCount}
        />
      </div>
    </div>
  );
}
