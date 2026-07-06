import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminLessonRow {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  track: string | null;
  is_fundamental: boolean;
  prerequisite_id: number | null;
  is_visible: boolean;
  completions: number;
}

export interface LessonsQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface LessonsResult {
  lessons: AdminLessonRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getLessonsAdmin(query: LessonsQuery = {}): Promise<LessonsResult> {
  const { search = "", page = 1, pageSize = 20 } = query;
  const supabase = createAdminClient();

  let q = supabase
    .from("lessons")
    .select("id, slug, title, subtitle, track, is_fundamental, prerequisite_id, is_visible", {
      count: "exact",
    });

  if (search.trim()) {
    q = q.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await q.order("id", { ascending: true }).range(from, to);

  if (error) {
    console.error("Error fetching admin lessons:", error);
    return { lessons: [], total: 0, page, pageSize, totalPages: 0 };
  }

  const lessonIds = (data ?? []).map((l) => l.id);
  const completionsByLesson = await getCompletionCounts(lessonIds);

  const lessons: AdminLessonRow[] = (data ?? []).map((l) => ({
    ...l,
    completions: completionsByLesson[l.id] ?? 0,
  }));

  const total = count ?? 0;
  return {
    lessons,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

async function getCompletionCounts(lessonIds: number[]): Promise<Record<number, number>> {
  if (lessonIds.length === 0) return {};
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .in("lesson_id", lessonIds)
    .eq("completed", true);

  if (error) {
    console.error("Error fetching completion counts:", error);
    return {};
  }

  const counts: Record<number, number> = {};
  for (const row of data ?? []) {
    counts[row.lesson_id] = (counts[row.lesson_id] ?? 0) + 1;
  }
  return counts;
}

export interface LessonUpdateFields {
  title?: string;
  subtitle?: string;
  prerequisite_id?: number | null;
  is_fundamental?: boolean;
  is_visible?: boolean;
}

export async function updateLessonAdmin(id: number, fields: LessonUpdateFields) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("lessons").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getLessonCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}
