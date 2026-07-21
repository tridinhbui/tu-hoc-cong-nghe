import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
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
 * Fetch dashboard summary details in a single grouped secure query.
 * Restricts user internally via auth.uid() in PostgreSQL.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_dashboard_summary");

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as DashboardSummary;
}

/**
 * Fetch lesson progress and state in a single grouped secure query.
 * Restricts user internally via auth.uid() in PostgreSQL.
 */
export async function getLessonState(): Promise<LessonState> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_lesson_state");

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonState;
}
