import type { Lesson, Difficulty, QuizQuestion, LessonSectionBlock } from "./lessons";

/**
 * Dynamic lesson loader for code splitting
 * This prevents the entire 1.2MB lessons.ts from being bundled with every page
 */

// Re-export types for components that only need type definitions
export type { Lesson, Difficulty, QuizQuestion, LessonSectionBlock };

// Cache for loaded lessons to avoid repeated imports
let lessonsCache: Lesson[] | null = null;

/**
 * Load all lessons (cached after first load)
 * Use this sparingly - prefer getLessonBySlug or getLessonsMeta when possible
 */
export async function loadLessons(): Promise<Lesson[]> {
  if (lessonsCache) {
    return lessonsCache;
  }

  const { lessons } = await import("./lessons");
  lessonsCache = lessons;
  return lessons;
}

/**
 * Get a single lesson by slug with minimal bundle impact
 * Only loads the lessons module when called
 */
export async function getLessonBySlug(slug: string): Promise<Lesson | undefined> {
  const lessons = await loadLessons();
  return lessons.find((l) => l.slug === slug);
}

/**
 * Get lesson by ID with minimal bundle impact
 */
export async function getLessonById(id: number): Promise<Lesson | undefined> {
  const lessons = await loadLessons();
  return lessons.find((l) => l.id === id);
}

/**
 * Get lesson metadata only (stripped down version for dashboard)
 * This is the most efficient way to load lesson data for listings
 */
export async function getLessonsMeta(): Promise<LessonMeta[]> {
  const lessons = await loadLessons();
  return lessons.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    subtitle: l.subtitle,
    duration: l.duration,
    difficulty: l.difficulty,
    track: l.track,
    isFundamental: l.isFundamental,
  }));
}

/**
 * Get lessons by track with metadata only
 */
export async function getLessonsByTrack(track: "personal" | "professional" | "bonus"): Promise<LessonMeta[]> {
  const lessons = await loadLessons();
  return lessons
    .filter((l) => l.track === track)
    .map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      subtitle: l.subtitle,
      duration: l.duration,
      difficulty: l.difficulty,
      track: l.track,
    }));
}

/**
 * Get next lesson by ID
 */
export async function getNextLesson(currentId: number): Promise<NextLessonMeta | undefined> {
  const lessons = await loadLessons();
  const next = lessons.find((l) => l.id === currentId + 1);
  if (!next) return undefined;

  return {
    id: next.id,
    slug: next.slug,
    title: next.title,
  };
}

/**
 * Get previous lesson by ID
 */
export async function getPreviousLesson(currentId: number): Promise<NextLessonMeta | undefined> {
  const lessons = await loadLessons();
  const prev = lessons.find((l) => l.id === currentId - 1);
  if (!prev) return undefined;

  return {
    id: prev.id,
    slug: prev.slug,
    title: prev.title,
  };
}

// Type definitions
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  track?: "personal" | "professional" | "bonus";
  isFundamental?: boolean;
  prerequisiteId?: number | null;
  isVisible?: boolean;
}

export interface NextLessonMeta {
  id: number;
  slug: string;
  title: string;
}
