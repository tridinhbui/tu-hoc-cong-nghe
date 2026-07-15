import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getLessonBySlug, getNextLesson } from "@/lib/lessons-loader";
import { isLessonLockedForUser } from "@/lib/lesson-locking";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import LessonPageClient from "@/components/LessonPageClient";

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

  // The dashboard only used lock state to decide whether to show a lock
  // icon - this page rendered the full lesson to anyone who requested the
  // URL directly, bypassing that entirely. Check here too, since this is
  // the component that actually serves the content.
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const locked = await isLessonLockedForUser(lesson.id, user?.id ?? null);
  if (locked) {
    redirect(`/dashboard?locked=${encodeURIComponent(lesson.slug)}`);
  }

  const nextLesson = await getNextLesson(lesson.id);

  return <LessonPageClient lesson={lesson} nextLesson={nextLesson} />;
}
