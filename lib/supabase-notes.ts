import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

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
    throw handleSupabaseError(error);
  }

  return data as LessonNote[];
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
    throw handleSupabaseError(error);
  }

  return data as LessonNote[];
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
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonNote;
}

/**
 * Update an existing note
 */
export async function updateNote(noteId: number, content: string): Promise<LessonNote> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_notes")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", noteId)
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as LessonNote;
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
    throw handleSupabaseError(error);
  }
}
