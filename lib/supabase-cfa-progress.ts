import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { scheduleCfaModuleRecall } from "@/lib/supabase-cfa-features";
import { recalculateUserStats } from "@/lib/supabase-user";

export interface CfaModuleProgress {
  id: number;
  user_id: string;
  module_id: string;
  completed: boolean;
  quiz_score: number | null;
  quiz_total: number | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getCfaModuleProgress(userId: string, moduleId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle();

  if (error) throw handleSupabaseError(error);
  return (data as CfaModuleProgress) || null;
}

export async function markCfaModuleComplete(
  userId: string,
  moduleId: string,
  quizScore?: number,
  quizTotal?: number
) {
  const supabase = createClient();
  const { error } = await supabase.from("cfa_module_progress").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      completed: true,
      quiz_score: quizScore ?? null,
      quiz_total: quizTotal ?? null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" }
  );

  if (error) throw handleSupabaseError(error);

  await scheduleCfaModuleRecall(userId, moduleId, 1);
  void recalculateUserStats(userId).catch(() => {});
}
