import { notFound } from "next/navigation";
import { lessons, getLessonBySlug } from "@/lib/lessons";
import LessonPageClient from "@/components/LessonPageClient";

// Server Component: looks up only the one lesson this request needs and
// serializes just that (plus a tiny next-lesson pointer) to the client,
// instead of shipping the entire ~300-lesson dataset to every visitor.
export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const next = lessons.find((l) => l.id === lesson.id + 1);
  const nextLesson = next ? { id: next.id, slug: next.slug, title: next.title } : undefined;

  return <LessonPageClient lesson={lesson} nextLesson={nextLesson} />;
}
