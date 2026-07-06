import type { LessonMeta } from "@/lib/lesson-types";

/**
 * Pure lock rule — no cookies/DB access, just the decision logic — so it can
 * be called identically from a Server Component (lib/lesson-locking.ts,
 * reads cookies via next/headers) and from proxy.ts (reads cookies via
 * NextRequest, a different API). Keeping the rule in one place is the whole
 * point: this must stay byte-for-byte in sync with
 * components/DashboardClient.tsx#isLessonLocked, which is the UI this rule
 * is meant to actually enforce.
 */
export function computeLessonLocked(
  lesson: LessonMeta,
  sortedLessons: LessonMeta[],
  completedIds: ReadonlySet<number>,
  unlockedIds: ReadonlySet<number>
): boolean {
  if (lesson.isFundamental) return false;
  if (unlockedIds.has(lesson.id)) return false;

  const prerequisiteId = lesson.prerequisiteId ?? lesson.id - 1;
  if (prerequisiteId == null) return false;

  const prereq = sortedLessons.find((l) => l.id === prerequisiteId);
  if (!prereq) return false;

  // Implicit sequential prerequisites (id - 1) only apply within the same
  // track — otherwise Day 201 (personal) would be locked behind Day 200
  // (professional finale). Explicit admin overrides still apply anywhere.
  if (lesson.prerequisiteId == null && (prereq.track ?? null) !== (lesson.track ?? null)) return false;

  return !completedIds.has(prereq.id);
}
