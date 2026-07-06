import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta, type LessonMeta } from "@/lib/lessons-loader";
import { computeLessonLocked } from "@/lib/lesson-lock-rule";

/**
 * Server-side mirror of DashboardClient's isLessonLocked(). The dashboard
 * only used this to decide whether to show a lock icon — app/bai-hoc/[slug]
 * rendered the full lesson to anyone who requested the URL regardless of
 * that UI state, so the lock was cosmetic only. This makes the same rule
 * enforceable on the page that actually serves the content.
 *
 * Rule (must stay in sync with components/DashboardClient.tsx#isLessonLocked):
 * a lesson is locked unless it's fundamental (open to everyone), the user
 * has an approved admin unlock grant, or its prerequisite (explicit
 * override, else the previous lesson id within the same track) is completed.
 */
export async function isLessonLockedForUser(lessonId: number, userId: string | null): Promise<boolean> {
  const allLessons = await getLessonsMeta();
  const sorted = allLessons.filter((l) => l.isVisible !== false).sort((a, b) => a.id - b.id);
  const lesson = sorted.find((l) => l.id === lessonId);

  if (!lesson) return false; // unknown id — let the caller's own notFound() handle it
  if (lesson.isFundamental) return false;
  if (!userId) return true; // not logged in and not a free/fundamental lesson

  const supabase = await createServerSupabaseClient();
  const [{ data: unlocks }, { data: progress }] = await Promise.all([
    supabase.from("user_lesson_unlocks").select("lesson_id").eq("user_id", userId),
    supabase.from("user_progress").select("lesson_id").eq("user_id", userId).eq("completed", true),
  ]);

  const unlockedIds = new Set((unlocks ?? []).map((r) => r.lesson_id as number));
  const completedIds = new Set((progress ?? []).map((r) => r.lesson_id as number));

  return computeLessonLocked(lesson, sorted, completedIds, unlockedIds);
}
