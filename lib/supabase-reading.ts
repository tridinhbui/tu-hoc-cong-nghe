import { createClient } from "@/lib/supabase";

export interface ReadingProgressRow {
  id: number;
  user_id: string;
  lesson_id: number;
  scroll_percent: number;
  max_percent_reached: number;
  milestone_25: boolean;
  milestone_50: boolean;
  milestone_75: boolean;
  milestone_100: boolean;
  last_read_at: string;
}

// PGRST116 = no rows found (expected, not an error)
// PGRST205 = table not found in schema cache (migration not run yet on this Supabase project)
function isBenignError(error: { code?: string } | null) {
  return error?.code === "PGRST116" || error?.code === "PGRST205";
}

export async function getReadingProgress(userId: string, lessonId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error && !isBenignError(error)) {
    console.error("Error fetching reading progress:", error);
  }

  return (data as ReadingProgressRow) || null;
}

export async function getAllReadingProgress(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    if (!isBenignError(error)) {
      console.error("Error fetching all reading progress:", error);
    }
    return [];
  }

  return data as ReadingProgressRow[];
}

export async function updateReadingProgress(
  userId: string,
  lessonId: number,
  scrollPercent: number
) {
  const supabase = createClient();

  const existing = await getReadingProgress(userId, lessonId);
  const maxReached = Math.max(existing?.max_percent_reached || 0, scrollPercent);

  const { data, error } = await supabase
    .from("reading_progress")
    .upsert(
      [
        {
          user_id: userId,
          lesson_id: lessonId,
          scroll_percent: scrollPercent,
          max_percent_reached: maxReached,
          milestone_25: maxReached >= 25,
          milestone_50: maxReached >= 50,
          milestone_75: maxReached >= 75,
          milestone_100: maxReached >= 100,
          last_read_at: new Date().toISOString(),
        },
      ],
      { onConflict: "user_id,lesson_id" }
    )
    .select()
    .single();

  if (error) {
    if (!isBenignError(error)) {
      console.error("Error updating reading progress:", error);
    }
    return null;
  }

  return data as ReadingProgressRow;
}
