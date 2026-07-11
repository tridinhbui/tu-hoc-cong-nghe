import { getLessonsMeta } from "@/lib/lessons-loader";
import NotesOverviewClient from "@/components/NotesOverviewClient";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// Server Component: only pulls id/slug/title out of lesson metadata, so the
// full lesson bodies never need to reach this page's client bundle.
export default async function GhiChuPage() {
  const lessonsMeta = await getLessonsMeta();
  const lessonsById = Object.fromEntries(
    lessonsMeta.map((l) => [l.id, { slug: l.slug, title: l.title }])
  );

  return <NotesOverviewClient lessonsById={lessonsById} />;
}
