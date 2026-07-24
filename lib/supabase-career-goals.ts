import { createClient } from "@/lib/supabase";

function getLocalGoal(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("active_career_goal") || localStorage.getItem("thtcdn_career_goal") || null;
}

function setLocalGoal(careerId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("active_career_goal", careerId);
  localStorage.setItem("thtcdn_career_goal", careerId);
}

function clearLocalGoal() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("active_career_goal");
  localStorage.removeItem("thtcdn_career_goal");
}

/** The career id (matches FinanceCareer.id in lib/finance-careers.ts) the
 *  user has pinned as their target career, or null if none set. */
export async function getMyCareerGoal(userId: string): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_career_goals")
      .select("career_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data?.career_id) {
      setLocalGoal(data.career_id);
      return data.career_id;
    }
  } catch {
    // Ignore network or missing table errors
  }
  return getLocalGoal();
}

export async function setCareerGoal(userId: string, careerId: string): Promise<void> {
  setLocalGoal(careerId);
  try {
    const supabase = createClient();
    await supabase
      .from("user_career_goals")
      .upsert({ user_id: userId, career_id: careerId, set_at: new Date().toISOString() });
  } catch {
    // Ignore network or missing table errors - local goal is already saved
  }
}

export async function clearCareerGoal(userId: string): Promise<void> {
  clearLocalGoal();
  try {
    const supabase = createClient();
    await supabase.from("user_career_goals").delete().eq("user_id", userId);
  } catch {
    // Ignore network or missing table errors
  }
}
