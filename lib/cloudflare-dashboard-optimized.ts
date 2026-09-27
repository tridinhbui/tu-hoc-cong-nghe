import { createClient } from "@/lib/cloudflare";
import { handleCloudflareError } from "@/lib/errors";
import type { UserProfile, UserStats } from "./cloudflare-user";
import type { MilestoneCompletion } from "./cloudflare-milestones";
import type { LessonManualFlag } from "./cloudflare-lesson-flags";
import type { LessonBookmark } from "./cloudflare-bookmarks";

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
 * Fetch dashboard summary details in a single grouped secure query.
 * Restricts user internally via auth.uid() in PostgreSQL.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const cloudflare = createClient();
  const { data, error } = await cloudflare.rpc("get_dashboard_summary");

  if (error) {
    throw handleCloudflareError(error);
  }

  return data as DashboardSummary;
}

/**
 * Fetch lesson progress and state in a single grouped secure query.
 * Restricts user internally via auth.uid() in PostgreSQL.
 */
export async function getLessonState(): Promise<LessonState> {
  const cloudflare = createClient();
  const { data, error } = await cloudflare.rpc("get_lesson_state");

  if (error) {
    throw handleCloudflareError(error);
  }

  return data as LessonState;
}
