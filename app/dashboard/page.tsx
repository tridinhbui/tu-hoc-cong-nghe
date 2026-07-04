import { lessons } from "@/lib/lessons";
import DashboardClient from "@/components/DashboardClient";

// Auth-gated and reads Supabase env vars at render time — never prerender statically.
export const dynamic = "force-dynamic";

// Server Component: strips each lesson down to the handful of fields the
// dashboard listing needs before it ever reaches the client bundle, instead
// of shipping every lesson's full sections/quiz content to every visitor.
export default function Dashboard() {
  const lessonsMeta = lessons.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    subtitle: l.subtitle,
    duration: l.duration,
    difficulty: l.difficulty,
    track: l.track,
  }));

  return <DashboardClient lessonsMeta={lessonsMeta} />;
}
