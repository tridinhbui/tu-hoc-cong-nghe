"use server";

import { getLessonsMeta } from "@/lib/lessons-loader";
import type { LessonMeta } from "@/lib/lesson-types";

// Strips Vietnamese diacritics so a learner typing "roe" or "lai kep" without
// dấu still matches "ROE" / "lãi kép" - most people type without accents on
// mobile, and 108+ lessons is too many to browse by scrolling the stage list
// to find one by name.
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase();
}

export interface LessonSearchResult {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  track?: "personal" | "professional" | "bonus";
}

export async function searchLessonsAction(query: string): Promise<LessonSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const needle = normalize(trimmed);
  const lessons = await getLessonsMeta();

  return lessons
    .filter((l) => l.isVisible !== false)
    .filter((l) => normalize(l.title).includes(needle) || normalize(l.subtitle).includes(needle))
    .slice(0, 8)
    .map((l): LessonSearchResult => ({ id: l.id, slug: l.slug, title: l.title, subtitle: l.subtitle, track: l.track }));
}
