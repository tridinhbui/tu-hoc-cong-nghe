import { redirect } from "next/navigation";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import CareerLearningPathClient from "@/components/CareerLearningPathClient";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// A deliberately smaller sibling to /su-nghiep (JobSearchClient - the full
// career-exploration hub with daily-life sim, skills radar, career-path
// timeline, compare tool, job search...). That page is a lot to land on
// just to answer "which lessons should I study for this career" - this page
// answers only that one question, styled like the personal/professional
// track lesson lists on the dashboard, using each career's own emoji/colors
// (lib/finance-careers.ts) instead of the generic stage theme. /su-nghiep
// stays linked from here for anyone who wants the full profile.
export default async function CareerLearningPathPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [lessonsMeta, { data: progressRows }] = await Promise.all([
    getLessonsMeta(),
    supabase.from("user_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
  ]);

  const lessonsBySlug = Object.fromEntries(lessonsMeta.map((l) => [l.slug, l]));
  const lessonsById = Object.fromEntries(lessonsMeta.map((l) => [l.id, l]));
  const completedLessonIds = (progressRows ?? []).map((r) => r.lesson_id as number);

  return (
    <CareerLearningPathClient
      lessonsBySlug={lessonsBySlug}
      lessonsById={lessonsById}
      completedLessonIds={completedLessonIds}
    />
  );
}
