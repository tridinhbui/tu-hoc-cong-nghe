import { createClient } from "@thtcdn/supabase-client";

// Types below mirror the actual Supabase schema (see SUPABASE_SCHEMA.md) -
// earlier versions of this file guessed at column names (track_id, category,
// duration_minutes, a "profiles" table, a "lesson_progress" table) that
// don't exist. Fixed to match the real lessons/user_profiles/user_progress
// tables.

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  stage_number: number;
  day_number: number;
  duration: string | null;
  difficulty: string | null;
  emoji: string | null;
  status: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  current_level: number;
  total_xp: number;
  lessons_completed: number;
  avg_quiz_score: number;
  current_stage: number;
  preferred_track: "personal" | "professional";
  dark_mode: boolean;
}

export interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  freezes_used?: number;
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

export interface Flashcard {
  id?: number;
  term: string;
  definition: string;
  interval: number;
  ease_factor: number;
  repetitions: number;
  next_review_at: string;
  created_at?: string;
}

async function getCurrentUserId(): Promise<{ id: string | null; error: string | null }> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { id: null, error: error?.message || "No user found" };
  }
  return { id: user.id, error: null };
}

export async function getTotalUserCount(): Promise<{ data: number | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_total_user_count");
    if (error) return { data: null, error: error.message };
    return { data: typeof data === "number" ? data : null, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function getTotalLessonCount(): Promise<{ data: number | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { count, error } = await supabase.from("lessons").select("*", { count: "exact", head: true });
    if (error) return { data: null, error: error.message };
    return { data: count, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function getLessons(): Promise<{ data: Lesson[] | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("id, slug, title, subtitle, stage_number, day_number, duration, difficulty, emoji, status")
      .order("day_number", { ascending: true });

    if (error) return { data: null, error: error.message };
    return { data: data || [], error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function getLessonBySlug(slug: string): Promise<{ data: Lesson | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("id, slug, title, subtitle, stage_number, day_number, duration, difficulty, emoji, status")
      .eq("slug", slug)
      .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function getUserProfile(): Promise<{ data: UserProfile | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single();
    if (error) return { data: null, error: error.message };

    return { data: data as UserProfile, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function updateUserProfile(
  updates: Partial<Pick<UserProfile, "full_name" | "bio" | "avatar_url" | "preferred_track" | "dark_mode">>
): Promise<{ data: UserProfile | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data: data as UserProfile, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function getUserStreak(): Promise<{ data: UserStreak | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle();
    if (error) return { data: null, error: error.message };
    return { data: data as UserStreak | null, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function markLessonComplete(
  lessonId: number,
  quizScore?: number
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { success: false, error: userError };

    const supabase = createClient();
    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
        quiz_score: quizScore ?? null,
      },
      { onConflict: "user_id,lesson_id" }
    );

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// ---- Notes ----

export async function getAllUserNotes(): Promise<{ data: LessonNote[] | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase
      .from("lesson_notes")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) return { data: null, error: error.message };
    return { data: data as LessonNote[], error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function createNote(
  lessonId: number,
  lessonSlug: string,
  content: string
): Promise<{ data: LessonNote | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase
      .from("lesson_notes")
      .insert([{ user_id: userId, lesson_id: lessonId, lesson_slug: lessonSlug, content }])
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data: data as LessonNote, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function deleteNote(noteId: number): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("lesson_notes").delete().eq("id", noteId);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// ---- Flashcards ----

// SM2 spaced-repetition scheduler, ported as-is from lib/supabase-flashcards.ts.
export function calculateSM2(quality: number, prevRepetitions: number, prevEaseFactor: number, prevInterval: number) {
  let repetitions = prevRepetitions;
  let easeFactor = prevEaseFactor;
  let interval = prevInterval;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.ceil(prevInterval * easeFactor);
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    nextReviewAt: nextReview.toISOString(),
  };
}

export async function getFlashcards(): Promise<{ data: Flashcard[] | null; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { data: null, error: userError };

    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_flashcards")
      .select("term, definition, interval, ease_factor, repetitions, next_review_at")
      .eq("user_id", userId);

    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as Flashcard[], error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function saveFlashcard(card: Flashcard): Promise<{ success: boolean; error: string | null }> {
  try {
    const { id: userId, error: userError } = await getCurrentUserId();
    if (!userId) return { success: false, error: userError };

    const supabase = createClient();
    const { error } = await supabase
      .from("user_flashcards")
      .upsert(
        {
          user_id: userId,
          term: card.term,
          definition: card.definition,
          interval: card.interval,
          ease_factor: card.ease_factor,
          repetitions: card.repetitions,
          next_review_at: card.next_review_at,
        },
        { onConflict: "user_id,term" }
      );

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
