import type { LessonMeta } from "@/lib/lesson-types";
import { getLessonStage, getLessonsInStage, getLessonPositionInStage } from "@/lib/lesson-stages";

/**
 * Pure lock rule - no cookies/DB access, just the decision logic - so it can
 * be called identically from a Server Component (lib/lesson-locking.ts,
 * reads cookies via next/headers) and from proxy.ts (reads cookies via
 * NextRequest, a different API). Keeping the rule in one place is the whole
 * point: this must stay byte-for-byte in sync with
 * components/DashboardClient.tsx#isLessonLocked, which is the UI this rule
 * is meant to actually enforce.
 *
 * Tiered unlock logic:
 * - Stages 1-3: all lessons unlocked (no prerequisites)
 * - Stages 4+: first 7 lessons unlocked, rest require sequential completion
 * - Prerequisites: user must complete the lesson's prerequisiteId (if set) or the previous lesson
 */
export function computeLessonLocked(
  lesson: LessonMeta,
  sortedLessons: LessonMeta[],
  completedIds: ReadonlySet<number>,
  unlockedIds: ReadonlySet<number>
): boolean {
  // Free lessons are always unlocked
  if (lesson.isFundamental) {
    return false;
  }

  // Admins can unlock any lesson explicitly
  if (unlockedIds.has(lesson.id)) {
    return false;
  }

  const stage = getLessonStage(lesson);

  // Unknown stage or stage 0 (foundation) - unlock all
  if (stage === null || stage === 0) {
    return false;
  }

  // Stages 1-3: unlock all lessons (no tiered gating)
  if (stage <= 3) {
    return false;
  }

  // Stages 4+: first 7 lessons unlocked, rest require sequential completion
  const lessonsInStage = getLessonsInStage(lesson, sortedLessons).sort((a, b) => a.id - b.id);
  const lessonIndex = getLessonPositionInStage(lesson, sortedLessons);

  // First 7 lessons: always unlocked
  if (lessonIndex < 7) {
    return false;
  }

  // Beyond first 7: require completing the previous lesson
  if (lessonIndex >= 7) {
    const previousLesson = lessonsInStage[lessonIndex - 1];
    return !completedIds.has(previousLesson.id);
  }

  return false;
}
