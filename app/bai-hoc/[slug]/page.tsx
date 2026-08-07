import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonBySlug, getNextLesson, getLessonsMeta } from "@/lib/lessons-loader";
import { getServerLocale } from "@/lib/i18n/server";
import LessonPageClient from "@/components/LessonPageClient";

// THIS ROUTE IS SERVER-RENDERED ON DEMAND, not served from the CDN.
//
// The comment that used to sit here said the opposite, at length: that removing
// the per-user lock check had let this - the most-visited route in the app, and
// the one every lesson-share/link-preview bot hits - be served from the CDN
// instead of invoking a function per request. That was true when it was
// written. It stopped being true when app/layout.tsx started calling
// getServerLocale() (which calls `cookies()`) to seed the i18n provider: a root
// layout that reads a cookie makes every route beneath it dynamic. `next build`
// reports this route as `ƒ`, not `○`.
//
// `generateStaticParams` below survived that change and still looks like it is
// doing something, which is how the stale claim went unnoticed. It is harmless
// but it is not producing static pages.
//
// The practical consequence, and the reason this is written out rather than
// deleted: reading request state in this page costs nothing extra, because the
// cost was already paid in the layout. An earlier version of the lesson
// translation work built a whole parallel /en route plus a proxy rewrite
// specifically to avoid making this page dynamic - machinery that bought
// nothing, since it already was. If someone restores static rendering here (by
// getting the locale to the provider without `cookies()`), the getServerLocale()
// call below has to go with it.
export async function generateStaticParams() {
  const lessons = await getLessonsMeta();
  return lessons.map((l) => ({ slug: l.slug }));
}

// Without this, every lesson page fell back to the root layout's generic
// site-wide title/description - so sharing a just-completed lesson to
// Facebook (ShareCompletionButton) produced a link preview card that just
// said "Tự học Tài chính Mỗi Ngày" for every single lesson, not which one.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug, await getServerLocale());
  if (!lesson) return {};

  const title = `${lesson.title} | Tự học Tài chính Mỗi Ngày`;
  const description = lesson.subtitle || lesson.whyItMatters || undefined;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

// Server Component: uses dynamic import to load only the requested lesson,
// preventing the entire 1.2MB lessons.ts from being bundled with every lesson page.
export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // A lesson with no translation for this locale comes back as Vietnamese with
  // `translated: false`, which is what LessonTranslationBadge renders from. It
  // is never withheld: hiding untranslated lessons from an English reader would
  // punch holes in the day-numbered path and break the unlock gate and the
  // /su-nghiep competency percentages, both of which count lessons.
  const locale = await getServerLocale();
  const lesson = await getLessonBySlug(slug, locale);
  if (!lesson) notFound();

  const nextLesson = await getNextLesson(lesson.id, locale);

  return <LessonPageClient lesson={lesson} nextLesson={nextLesson} />;
}
