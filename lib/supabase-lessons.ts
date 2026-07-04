import { createClient } from "@/lib/supabase";

export interface DBLesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  stage_number: number;
  day_number: number;
  duration: string | null;
  difficulty: string | null;
  emoji: string | null;
  opening_question: string | null;
  opening_options: string[] | null;
  correct_option: number | null;
  explanation: string | null;
  key_takeaways: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// Lấy tất cả bài học
export async function getAllLessons() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("status", "published")
    .order("day_number", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  return data as DBLesson[];
}

// Lấy bài học theo ID
export async function getLessonById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }

  return data as DBLesson;
}

// Lấy bài học theo slug
export async function getLessonBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }

  return data as DBLesson;
}

// Lấy bài học theo stage
export async function getLessonsByStage(stageNumber: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("stage_number", stageNumber)
    .eq("status", "published")
    .order("day_number", { ascending: true });

  if (error) {
    console.error("Error fetching lessons by stage:", error);
    return [];
  }

  return data as DBLesson[];
}

// Thêm bài học (admin only)
export async function addLesson(lesson: Omit<DBLesson, "created_at" | "updated_at">) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert([lesson])
    .select()
    .single();

  if (error) {
    console.error("Error adding lesson:", error);
    return null;
  }

  return data as DBLesson;
}

// Cập nhật bài học (admin only)
export async function updateLesson(id: number, updates: Partial<DBLesson>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating lesson:", error);
    return null;
  }

  return data as DBLesson;
}

// Xóa bài học (admin only)
export async function deleteLesson(id: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting lesson:", error);
    return false;
  }

  return true;
}
