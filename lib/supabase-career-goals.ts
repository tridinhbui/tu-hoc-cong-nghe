import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

/** The career id (matches FinanceCareer.id in lib/finance-careers.ts) the
 *  user has pinned as their target career, or null if none set. */
export async function getMyCareerGoal(userId: string): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_career_goals")
    .select("career_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  return data?.career_id ?? null;
}

export async function setCareerGoal(userId: string, careerId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_career_goals")
    .upsert({ user_id: userId, career_id: careerId, set_at: new Date().toISOString() });

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
}

export async function clearCareerGoal(userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("user_career_goals").delete().eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) return;
    throw handleSupabaseError(error);
  }
}
