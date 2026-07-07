import type { LessonMeta } from "@/lib/lesson-types";

/**
 * Pure lock rule — no cookies/DB access, just the decision logic — so it can
 * be called identically from a Server Component (lib/lesson-locking.ts,
 * reads cookies via next/headers) and from proxy.ts (reads cookies via
 * NextRequest, a different API). Keeping the rule in one place is the whole
 * point: this must stay byte-for-byte in sync with
 * components/DashboardClient.tsx#isLessonLocked, which is the UI this rule
 * is meant to actually enforce.
 *
 * Product decision: every lesson is unlocked for everyone, no sequential
 * gating. Kept as a function (rather than deleting the call sites in
 * proxy.ts / lib/lesson-locking.ts / components/DashboardClient.tsx) so the
 * previous prerequisite logic can be restored later without re-plumbing
 * every caller.
 */
export function computeLessonLocked(
  _lesson: LessonMeta,
  _sortedLessons: LessonMeta[],
  _completedIds: ReadonlySet<number>,
  _unlockedIds: ReadonlySet<number>
): boolean {
  return false;
}
