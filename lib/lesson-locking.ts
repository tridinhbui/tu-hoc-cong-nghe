import "server-only";

// Site-wide: lesson locking is disabled for everyone. This used to be a
// server-side mirror of DashboardClient's isLessonLocked() (see git history
// for the original body, which called computeLessonLocked in
// lib/lesson-lock-rule.ts - also short-circuited the same way) but had its
// own separate `if (!userId) return true` gate that produced a 307 redirect
// to /dashboard?locked=... whenever the server-side session check came back
// empty, bypassing the site-wide unlock entirely. To re-enable locking,
// restore the original body and delete computeLessonLocked's matching early
// return.
export async function isLessonLockedForUser(_lessonId: number, _userId: string | null): Promise<boolean> {
  return false;
}
