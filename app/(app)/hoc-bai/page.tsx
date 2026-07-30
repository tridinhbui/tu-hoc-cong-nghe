import { getLessonsMeta } from "@/lib/lessons-loader";
import { getLessonOverrides } from "@/lib/lesson-overrides";
import DashboardClient from "@/components/DashboardClient";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// The dedicated "Học bài" route: the learning path on its own page, so the
// lesson list has one obvious home instead of being buried in the dashboard
// alongside the level map, rewards and social widgets. Renders the same
// DashboardClient in its "lessons" view - see that component's `view` prop.
//
// Deliberately mirrors app/(app)/dashboard/page.tsx: same lesson metadata
// load and the same admin-override merge, since both views list lessons and
// must agree on which ones are locked or hidden.
export default async function HocBai() {
  const [lessonsMeta, overrides] = await Promise.all([
    getLessonsMeta(),
    getLessonOverrides(),
  ]);

  const merged = lessonsMeta.map((lesson) => {
    const override = overrides.get(lesson.id);
    return {
      ...lesson,
      isFundamental: override?.is_fundamental ?? lesson.isFundamental ?? false,
      prerequisiteId: override?.prerequisite_id ?? null,
      isVisible: override?.is_visible ?? true,
    };
  });

  return <DashboardClient lessonsMeta={merged} view="lessons" />;
}
