import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { getUserBadges } from "@/lib/supabase-badges";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface JourneyMilestone {
  type: "signup" | "lesson_milestone" | "badge";
  date: string; // ISO
  title: string;
  description: string;
  emoji: string;
}

export interface JourneyStats {
  currentStreak: number;
  longestStreak: number;
  totalLessons: number;
}

const LESSON_MILESTONE_THRESHOLDS = [1, 10, 25, 50, 100, 150, 200, 250, 300];

/**
 * Builds a dated timeline purely from records that actually carry a real
 * timestamp - signup date, each lesson-count milestone (date of the Nth
 * completed lesson), and badges (earned_at). Deliberately does NOT invent a
 * date for level-ups or "longest streak" - neither is tracked with a
 * when-it-happened timestamp anywhere in the schema (current_level/
 * total_xp/longest_streak are all overwritten in place, not logged as
 * events), so those are surfaced as plain stats instead (see
 * getJourneyStats) rather than fabricated timeline entries.
 */
export async function getMyJourney(userId: string): Promise<JourneyMilestone[]> {
  const supabase = createClient();
  const milestones: JourneyMilestone[] = [];

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("created_at")
    .eq("id", userId)
    .maybeSingle();

  if (profile?.created_at) {
    milestones.push({
      type: "signup",
      date: profile.created_at,
      title: "Bắt đầu hành trình",
      description: "Ngày bạn tạo tài khoản Tự Học Tài Chính",
      emoji: "🚀",
    });
  }

  const { data: progressRows, error: progressError } = await supabase
    .from("user_progress")
    .select("completed_at")
    .eq("user_id", userId)
    .eq("completed", true)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: true });

  if (progressError && !isMissingTableError(progressError)) {
    throw handleSupabaseError(progressError);
  }

  const completedDates = (progressRows ?? []).map((r) => r.completed_at as string);
  for (const threshold of LESSON_MILESTONE_THRESHOLDS) {
    if (completedDates.length >= threshold) {
      milestones.push({
        type: "lesson_milestone",
        date: completedDates[threshold - 1],
        title: `Hoàn thành ${threshold} bài học`,
        description: threshold === 1 ? "Bài học đầu tiên của bạn!" : `Cột mốc ${threshold} bài học`,
        emoji: threshold >= 100 ? "🏆" : threshold >= 25 ? "⭐" : "📚",
      });
    }
  }

  try {
    const badges = await getUserBadges(userId);
    for (const badge of badges) {
      milestones.push({
        type: "badge",
        date: badge.earned_at,
        title: `Huy hiệu: ${badge.badge_name}`,
        description: badge.badge_description,
        emoji: badge.badge_icon || "🎖️",
      });
    }
  } catch (err) {
    console.error("Error loading badges for journey:", err);
  }

  return milestones.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getJourneyStats(userId: string): Promise<JourneyStats> {
  const supabase = createClient();
  const [{ data: streak }, { count }] = await Promise.all([
    supabase.from("user_streaks").select("current_streak, longest_streak").eq("user_id", userId).maybeSingle(),
    supabase
      .from("user_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("completed", true),
  ]);

  return {
    currentStreak: streak?.current_streak ?? 0,
    longestStreak: streak?.longest_streak ?? 0,
    totalLessons: count ?? 0,
  };
}
