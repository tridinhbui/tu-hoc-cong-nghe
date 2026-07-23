import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - notes are a non-critical UX nicety, so a missing table on
// the read path should not crash every lesson page's initial load.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface LessonNote {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get notes for a specific lesson
 */
export async function getLessonNotes(userId: string, lessonId: number): Promise<LessonNote[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    console.warn("Notice loading lesson_notes:", error.message);
    return [];
  }

  return (data ?? []) as LessonNote[];
}

/**
 * Get all notes for a user
 */
export async function getAllUserNotes(userId: string): Promise<LessonNote[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    console.warn("Notice loading all user notes:", error.message);
    return [];
  }

  return (data ?? []) as LessonNote[];
}

/**
 * Create a new note for a lesson
 */
export async function createNote(
  userId: string,
  lessonId: number,
  lessonSlug: string,
  content: string
): Promise<LessonNote> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("lesson_notes")
    .insert([
      {
        user_id: userId,
        lesson_id: lessonId,
        lesson_slug: lessonSlug,
        content,
      },
    ])
    .select()
    .maybeSingle();

  if (data) {
    return data as LessonNote;
  }

  if (error) {
    console.warn("Warning creating note in Supabase:", error.message);
  }

  return {
    id: Date.now(),
    user_id: userId,
    lesson_id: lessonId,
    lesson_slug: lessonSlug,
    content,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Update an existing note
 */
export async function updateNote(noteId: number, content: string): Promise<LessonNote> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("lesson_notes")
    .update({ content, updated_at: now })
    .eq("id", noteId)
    .select()
    .maybeSingle();

  if (data) {
    return data as LessonNote;
  }

  if (error) {
    console.warn("Warning updating note in Supabase:", error.message);
  }

  return {
    id: noteId,
    user_id: "",
    lesson_id: 0,
    lesson_slug: "",
    content,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("lesson_notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.warn("Warning deleting note in Supabase:", error.message);
  }
}
