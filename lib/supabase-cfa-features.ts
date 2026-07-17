import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

// ---------------------------------------------------------------------------
// Bookmarks
// ---------------------------------------------------------------------------

export interface CfaModuleBookmark {
  id: number;
  user_id: string;
  module_id: string;
  module_title: string;
  created_at: string;
}

export async function isCfaModuleBookmarked(userId: string, moduleId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle();

  if (error && isMissingTableError(error)) return false;
  if (error) throw handleSupabaseError(error);
  return !!data;
}

export async function toggleCfaModuleBookmark(
  userId: string,
  moduleId: string,
  moduleTitle: string
): Promise<boolean> {
  const supabase = createClient();
  const already = await isCfaModuleBookmarked(userId, moduleId);

  if (already) {
    const { error } = await supabase
      .from("cfa_module_bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("module_id", moduleId);
    if (error) throw handleSupabaseError(error);
    return false;
  }

  const { error } = await supabase
    .from("cfa_module_bookmarks")
    .insert([{ user_id: userId, module_id: moduleId, module_title: moduleTitle }]);
  if (error) throw handleSupabaseError(error);
  return true;
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export interface CfaModuleNote {
  id: number;
  user_id: string;
  module_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export async function getCfaModuleNotes(userId: string, moduleId: string): Promise<CfaModuleNote[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return data as CfaModuleNote[];
}

export async function createCfaModuleNote(
  userId: string,
  moduleId: string,
  content: string
): Promise<CfaModuleNote> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_notes")
    .insert([{ user_id: userId, module_id: moduleId, content }])
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data as CfaModuleNote;
}

export async function updateCfaModuleNote(id: number, content: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("cfa_module_notes")
    .update({ content })
    .eq("id", id);
  if (error) throw handleSupabaseError(error);
}

export async function deleteCfaModuleNote(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("cfa_module_notes").delete().eq("id", id);
  if (error) throw handleSupabaseError(error);
}

// ---------------------------------------------------------------------------
// Highlights
// ---------------------------------------------------------------------------

export interface CfaModuleHighlight {
  id: number;
  user_id: string;
  module_id: string;
  quote: string;
  created_at: string;
}

export async function getCfaModuleHighlights(userId: string, moduleId: string): Promise<CfaModuleHighlight[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }
  return data as CfaModuleHighlight[];
}

export async function createCfaModuleHighlight(
  userId: string,
  moduleId: string,
  quote: string
): Promise<CfaModuleHighlight> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cfa_module_highlights")
    .insert([{ user_id: userId, module_id: moduleId, quote: quote.trim().slice(0, 1000) }])
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data as CfaModuleHighlight;
}

export async function deleteCfaModuleHighlight(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("cfa_module_highlights").delete().eq("id", id);
  if (error) throw handleSupabaseError(error);
}

// ---------------------------------------------------------------------------
// Spaced-repetition recall scheduling (same day-offset scheme as
// lib/supabase-recalls.ts's scheduleLessonRecall)
// ---------------------------------------------------------------------------

export async function scheduleCfaModuleRecall(
  userId: string,
  moduleId: string,
  stage: number = 1
): Promise<void> {
  const supabase = createClient();
  const days = stage === 2 ? 3 : stage === 3 ? 7 : stage === 4 ? 30 : 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + days);

  const { error } = await supabase.from("cfa_module_recalls").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      recall_stage: stage,
      next_recall_at: nextDate.toISOString(),
    },
    { onConflict: "user_id,module_id" }
  );

  if (error && !isMissingTableError(error)) {
    console.error("Error scheduling CFA module recall:", error);
  }
}
