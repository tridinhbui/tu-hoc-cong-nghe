import { getLessonsMeta } from "@/lib/lessons-loader";
import { getLessonOverrides } from "@/lib/lesson-overrides";
import DashboardClient from "@/components/DashboardClient";

// Auth-gated and reads D1 at render time - never prerender statically.
export const dynamic = "force-dynamic";

// Server Component: uses dynamic import to load lesson metadata only,
// preventing the entire 1.2MB lessons.ts from being bundled with the dashboard.
export default async function Dashboard() {
  // Don't check auth on the server side here - let DashboardClient handle auth
  // state on the client side, which properly waits for the browser to settle
  // auth cookies after the OAuth flow. This prevents the "redirect to login
  // then back to dashboard" flashing bug.

  const [lessonsMeta, overrides] = await Promise.all([
    getLessonsMeta(),
    getLessonOverrides(),
  ]);

  // Merge admin-controlled lock/visibility flags (from the `lessons` D1
  // table) onto the static lesson metadata. Falls back to the static
  // defaults (isFundamental from lib/lessons.ts, no prerequisite override,
  // always visible) when a lesson has no override row yet.
  const merged = lessonsMeta.map((lesson) => {
    const override = overrides.get(lesson.id);
    return {
      ...lesson,
      isFundamental: override?.is_fundamental ?? lesson.isFundamental ?? false,
      prerequisiteId: override?.prerequisite_id ?? null,
      isVisible: override?.is_visible ?? true,
    };
  });

  return <DashboardClient lessonsMeta={merged} />;
}
