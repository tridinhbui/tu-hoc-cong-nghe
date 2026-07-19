import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonBySlug, getNextLesson, getLessonsMeta } from "@/lib/lessons-loader";
import LessonPageClient from "@/components/LessonPageClient";

// Statically generated at build time (see generateStaticParams below), not
// force-dynamic: this page used to also check per-user lesson lock state
// via createServerSupabaseClient()/isLessonLockedForUser() and could
// redirect locked-out visitors, which required dynamic rendering (a cached
// static response could otherwise serve one visitor's redirect to another).
// lib/lesson-locking.ts's isLessonLockedForUser() is now a permanent no-op
// (site-wide lesson locking is disabled - see that file's comment), so that
// check was dead code doing a real Supabase auth call on every single
// request for no behavioral effect. Removing it lets this - the most-
// visited route in the app, and the one every lesson-share/link-preview bot
// hits - be served from the CDN instead of invoking a Vercel Function per
// request. If lesson locking is ever re-enabled, this page needs to go back
// to dynamic rendering with the lock check restored.
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
  const lesson = await getLessonBySlug(slug);
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
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  const nextLesson = await getNextLesson(lesson.id);

  return <LessonPageClient lesson={lesson} nextLesson={nextLesson} />;
}
