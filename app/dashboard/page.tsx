import { redirect } from "next/navigation";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getLessonOverrides } from "@/lib/lesson-overrides";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import DashboardClient from "@/components/DashboardClient";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// Server Component: uses dynamic import to load lesson metadata only,
// preventing the entire 1.2MB lessons.ts from being bundled with the dashboard.
export default async function Dashboard() {
  const supabase = await createServerSupabaseClient();

  // Note: getSession() can return null immediately after OAuth callback completes,
  // before the session cookie is fully settled. Instead of redirecting to /login here,
  // let DashboardClient handle auth state (it uses INITIAL_SESSION which waits for
  // the browser to fully parse the auth cookie). Only redirect if truly unauthenticated
  // (e.g., accessing /dashboard directly with no session and no in-flight auth).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // getUser() is more reliable than getSession() - it checks the Authorization header
  // in addition to cookies. If user is null, the user is definitely not authenticated.
  if (!user) redirect("/login");

  const [lessonsMeta, overrides] = await Promise.all([
    getLessonsMeta(),
    getLessonOverrides(),
  ]);

  // Merge admin-controlled lock/visibility flags (from the `lessons` Supabase
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
