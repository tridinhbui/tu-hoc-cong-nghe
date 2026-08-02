import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - highlights are a non-critical UX nicety, so a missing
// table on the read path should not crash the lesson page's initial load.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export type HighlightKind = "important" | "ai_flag";

export interface LessonHighlight {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  quote: string;
  kind: HighlightKind;
  created_at: string;
}

export async function getLessonHighlights(userId: string, lessonId: number): Promise<LessonHighlight[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return data as LessonHighlight[];
}

/**
 * Every highlight the learner has made, newest first, for the notebook page.
 * Only `important` ones - `ai_flag` is a report about the content, not
 * something the learner wants to revise.
 */
export async function getAllUserHighlights(userId: string): Promise<LessonHighlight[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("kind", "important")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return data as LessonHighlight[];
}

export async function createHighlight(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  quote: string,
  kind: HighlightKind
): Promise<LessonHighlight> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_highlights")
    .insert([
      {
        user_id: userId,
        lesson_id: lessonId,
        lesson_slug: lessonSlug,
        quote: quote.trim().slice(0, 1000),
        kind,
      },
    ])
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonHighlight;
}

export async function deleteHighlight(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("lesson_highlights").delete().eq("id", id);

  if (error) {
    throw handleSupabaseError(error);
  }
}
