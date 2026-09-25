import type { UserProfile, UserStats } from "./supabase-user";
import type { MilestoneCompletion } from "./supabase-milestones";
import type { LessonManualFlag } from "./supabase-lesson-flags";
import type { LessonBookmark } from "./supabase-bookmarks";

export interface DashboardSummary {
  profile: UserProfile | null;
  stats: UserStats | null;
  has_completed_onboarding: boolean;
  passed_milestones: MilestoneCompletion[];
  challenge_passed_ids: number[];
}

export interface LessonState {
  completed_lessons: number[];
  unlocked_lesson_ids: number[];
  user_lesson_flags: number[];
  bookmarks: LessonBookmark[];
}

/**
 * Fetch dashboard summary details in a single grouped call.
 * Server route (app/api/dashboard-summary) restricts the user via the
 * session cookie - the client never picks who it's asking for.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const res = await fetch("/api/dashboard-summary");
  if (!res.ok) throw new Error(`get_dashboard_summary failed: ${res.status}`);
  return (await res.json()) as DashboardSummary;
}

/**
 * Fetch lesson progress and state in a single grouped call.
 * Server route (app/api/lesson-state) restricts the user via the session
 * cookie - the client never picks who it's asking for.
 */
export async function getLessonState(): Promise<LessonState> {
  const res = await fetch("/api/lesson-state");
  if (!res.ok) throw new Error(`get_lesson_state failed: ${res.status}`);
  return (await res.json()) as LessonState;
}
