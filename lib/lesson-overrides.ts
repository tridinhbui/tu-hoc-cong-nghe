import "server-only";
import { getDb } from "@/lib/d1/server";

export interface LessonOverride {
  id: number;
  is_fundamental: boolean;
  prerequisite_id: number | null;
  is_visible: boolean;
}

/**
 * Reads the admin-controlled lock/visibility flags for every lesson from D1
 * (`lessons` table). Falls back to an empty map (nothing overridden) if the
 * query fails, so the dashboard degrades to "no overrides" rather than
 * breaking.
 */
export async function getLessonOverrides(): Promise<Map<number, LessonOverride>> {
  try {
    const db = getDb();
    const { results } = await db
      .prepare(`select id, is_fundamental, prerequisite_id, is_visible from lessons`)
      .all<{ id: number; is_fundamental: number; prerequisite_id: number | null; is_visible: number }>();

    return new Map(
      (results ?? []).map((row) => [
        row.id,
        {
          id: row.id,
          is_fundamental: Boolean(row.is_fundamental),
          prerequisite_id: row.prerequisite_id,
          is_visible: Boolean(row.is_visible),
        },
      ])
    );
  } catch {
    return new Map();
  }
}

/** Lesson ids a specific user has been granted early access to via admin approval. */
export async function getUserLessonUnlocks(userId: string): Promise<Set<number>> {
  try {
    const db = getDb();
    const { results } = await db
      .prepare(`select lesson_id from user_lesson_unlocks where user_id = ?`)
      .bind(userId)
      .all<{ lesson_id: number }>();
    return new Set((results ?? []).map((row) => row.lesson_id));
  } catch {
    return new Set();
  }
}
