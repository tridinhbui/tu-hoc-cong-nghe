import { notFound } from "next/navigation";
import { getLessonBySlug, getNextLesson } from "@/lib/lessons-loader";
import LessonPageClient from "@/components/LessonPageClient";

// Server Component: uses dynamic import to load only the requested lesson,
// preventing the entire 1.2MB lessons.ts from being bundled with every lesson page.
export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  const nextLesson = await getNextLesson(lesson.id);

  return <LessonPageClient lesson={lesson} nextLesson={nextLesson} />;
}
