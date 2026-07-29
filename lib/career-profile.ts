import { createClient } from "@/lib/supabase";
import type { CompetencyScore, SkillDomainId } from "@/lib/career-competency";
import type { SkillGapResult } from "@/lib/career-skill-gap";
import type { WeeklyCareerMissionState } from "@/lib/weekly-career-mission";

// Client-side surface for the /su-nghiep career profile: one typed wrapper
// around GET /api/career-profile (which does all the aggregation), plus the
// two writes the panel needs. Kept out of the pure scoring libs so those
// stay importable from tests and from the server route without dragging in
// a Supabase client.

export interface CvBullet {
  id: number;
  career_id: string;
  content: string;
  created_at: string;
}

export interface CareerProfileResponse {
  competencies: CompetencyScore[];
  coverage: Record<SkillDomainId, { done: number; total: number; percent: number }>;
  targetId: string | null;
  savedGoal: string | null;
  skillGap: SkillGapResult | null;
  missions: WeeklyCareerMissionState;
  cvBullets: CvBullet[];
  totalLessonsCompleted: number;
}

export async function fetchCareerProfile(targetId?: string | null): Promise<CareerProfileResponse> {
  const query = targetId ? `?target=${encodeURIComponent(targetId)}` : "";
  const res = await fetch(`/api/career-profile${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Không tải được hồ sơ năng lực nghề nghiệp");
  return res.json();
}

export async function claimCareerMission(
  missionId: string
): Promise<{ claimed: boolean; xpEarned: number; coinEarned: number }> {
  const res = await fetch("/api/career-profile/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ missionId }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error ?? "Không nhận được thưởng nhiệm vụ");
  return body;
}

export const CV_BULLET_MIN_LENGTH = 10;
export const CV_BULLET_MAX_LENGTH = 500;

/** Insert goes straight through RLS rather than an API route - the row is
 *  the user's own free text and mints no XP by itself (the weekly mission
 *  payout counts rows server-side at claim time). */
export async function addCvBullet(userId: string, careerId: string, content: string): Promise<CvBullet> {
  const trimmed = content.trim();
  if (trimmed.length < CV_BULLET_MIN_LENGTH) {
    throw new Error(`Bullet cần ít nhất ${CV_BULLET_MIN_LENGTH} ký tự`);
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_cv_bullets")
    .insert([{ user_id: userId, career_id: careerId, content: trimmed.slice(0, CV_BULLET_MAX_LENGTH) }])
    .select("id, career_id, content, created_at")
    .single();

  if (error) throw new Error(error.message);
  return data as CvBullet;
}

export async function deleteCvBullet(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("user_cv_bullets").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** Weekly career-mission XP, summed from the payout ledger for
 *  recalculateUserStats. Returns 0 (not an error) when the table isn't
 *  migrated yet, same as every other optional XP source. */
export async function getTotalCareerMissionXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_career_mission_claims")
    .select("xp_earned")
    .eq("user_id", userId);

  if (error) return 0;
  return (data ?? []).reduce((sum, row) => sum + (Number(row.xp_earned) || 0), 0);
}
