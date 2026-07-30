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

// Drafts of unsaved note text, kept in localStorage. A note only existed in the
// textarea until "Thêm" was pressed, so navigating away, collapsing the panel,
// or a failed save lost whatever had been typed.
const DRAFT_KEY_PREFIX = "thtcdn_note_draft_";

function draftKey(userId: string, lessonId: number, noteId: number | null): string {
  return `${DRAFT_KEY_PREFIX}${userId}_${lessonId}_${noteId ?? "new"}`;
}

export function saveNoteDraft(userId: string, lessonId: number, noteId: number | null, content: string) {
  if (typeof window === "undefined" || !userId) return;
  try {
    if (content.trim()) {
      window.localStorage.setItem(draftKey(userId, lessonId, noteId), content);
    } else {
      window.localStorage.removeItem(draftKey(userId, lessonId, noteId));
    }
  } catch {
    // Quota or private-mode failure - a lost draft is not worth breaking typing.
  }
}

export function readNoteDraft(userId: string, lessonId: number, noteId: number | null): string | null {
  if (typeof window === "undefined" || !userId) return null;
  try {
    return window.localStorage.getItem(draftKey(userId, lessonId, noteId));
  } catch {
    return null;
  }
}

export function clearNoteDraft(userId: string, lessonId: number, noteId: number | null) {
  if (typeof window === "undefined" || !userId) return;
  try {
    window.localStorage.removeItem(draftKey(userId, lessonId, noteId));
  } catch {
    // ignore
  }
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

/** Notes fetched per page. Previously every note was loaded in one query. */
export const NOTES_PAGE_SIZE = 50;

/**
 * A page of the user's notes, newest-edited first. Paginated because this used
 * to `select("*")` with no limit - a learner with hundreds of notes downloaded
 * all of them on every visit to the notes page and to their profile.
 */
export async function getAllUserNotes(
  userId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<LessonNote[]> {
  const limit = options.limit ?? NOTES_PAGE_SIZE;
  const offset = options.offset ?? 0;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    if (isMissingTableError(error)) return [];
    console.warn("Notice loading all user notes:", error.message);
    return [];
  }

  return (data ?? []) as LessonNote[];
}

/**
 * Total note count without downloading the rows - for callers that only want
 * the number (e.g. the profile page's "N Note" stat, which used to fetch every
 * note just to read .length off the array).
 */
export async function countUserNotes(userId: string): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("lesson_notes")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    if (!isMissingTableError(error)) {
      console.warn("Notice counting user notes:", error.message);
    }
    return 0;
  }

  return count ?? 0;
}

/**
 * Full-text-ish search across ALL of the user's notes (not just the loaded
 * page), so searching is not limited by pagination. `lessonIds` lets the caller
 * also match notes belonging to lessons whose *title* matched the query - the
 * title lives in lesson metadata, not in this table, so only the caller can
 * resolve it.
 */
export async function searchUserNotes(
  userId: string,
  query: string,
  lessonIds: number[] = [],
  limit: number = 100
): Promise<LessonNote[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Escape PostgREST's pattern/filter metacharacters so a query containing
  // % _ , ( ) is searched literally instead of altering the filter itself.
  const escaped = trimmed.replace(/[%_,()\\]/g, (char) => `\\${char}`);

  const supabase = createClient();
  let request = supabase.from("lesson_notes").select("*").eq("user_id", userId);

  request =
    lessonIds.length > 0
      ? request.or(`content.ilike.%${escaped}%,lesson_id.in.(${lessonIds.join(",")})`)
      : request.ilike("content", `%${escaped}%`);

  const { data, error } = await request.order("updated_at", { ascending: false }).limit(limit);

  if (error) {
    if (isMissingTableError(error)) return [];
    console.warn("Notice searching user notes:", error.message);
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

  // This used to return a synthetic note (with `id: Date.now()`) whenever the
  // insert failed, so the caller showed "Đã lưu ghi chú" and rendered a note
  // that had never been saved - the learner lost the note on the next reload,
  // having been told it succeeded. A study note is exactly the kind of content
  // you cannot silently drop, so failures now propagate and the caller keeps
  // the text for a retry.
  throw handleSupabaseError(
    error ?? { code: "NO_ROW_RETURNED", message: "Ghi chú không được lưu (không có dòng nào trả về)." }
  );
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
    .maybeSingle();

  if (data) {
    return data as LessonNote;
  }

  // Same failure mode as createNote: the old fallback returned a stub with
  // `lesson_id: 0` and an empty slug, which callers wrote straight into their
  // list - so a failed edit both lost the change and detached the note from
  // its lesson in the UI. No row back also means RLS matched nothing (e.g. the
  // note was deleted in another tab), which is a real failure, not a success.
  throw handleSupabaseError(
    error ?? { code: "NO_ROW_RETURNED", message: "Không tìm thấy ghi chú để cập nhật." }
  );
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

  // Previously swallowed: the note vanished from the list but survived in the
  // database, so it reappeared on the next load with no explanation.
  if (error) {
    throw handleSupabaseError(error);
  }
}
