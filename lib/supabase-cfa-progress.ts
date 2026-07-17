import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { scheduleCfaModuleRecall } from "@/lib/supabase-cfa-features";

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

// CFA modules live in the separate Book/Reading/Module tables, not
// lib/lessons-data, so their ids share no guaranteed disjoint range with
// lesson_id in user_progress - kept in a dedicated table instead.
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

  // Same "completing a lesson enters the spaced-repetition queue" behavior
  // as markLessonComplete -> scheduleLessonRecall for personal-finance lessons.
  await scheduleCfaModuleRecall(userId, moduleId, 1);
}
