import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import type {
  Lesson,
  Difficulty,
  QuizQuestion,
  LessonSectionBlock,
  LessonMeta,
  NextLessonMeta,
  LessonTranslation,
  LocalizedLesson,
} from "./lesson-types";
import { applyLessonOverrides } from "./lesson-quiz-overrides.js";
import { balanceLessonQuizzes } from "./lesson-quiz-balance.js";
import { lessonBelongsToTrack } from "./track-stages";
import { DEFAULT_LOCALE, type Locale } from "./i18n/locales";
import { mergeLessonTranslation } from "./lesson-translations.js";

/**
 * Dynamic lesson loader for code splitting.
 * This prevents the entire 1.2MB lessons.ts from being bundled with every page.
 *
 * Client components must import their types from lib/lesson-types.ts
 * directly, not re-exported from here - re-exporting them from this file
 * (which also holds the dynamic import("./lessons") below) previously
 * caused the bundler to pull the entire lessons array into a client chunk
 * anyway, even though the import was `import type`. The `server-only`
 * import above makes that regress loudly (a build error) instead of
 * silently shipping ~1.3MB of extra JS again.
 *
 * lib/lessons.ts itself has grown to ~2MB of source. Dynamic-importing that
 * whole module just to read one lesson (or the metadata list) meant every
 * cold server instance paid a multi-hundred-ms parse cost on the very first
 * request it served - felt like the page "wouldn't load" on a slow
 * connection. scripts/generate-lesson-data.mjs pre-splits it into one JSON
 * file per lesson plus a small `_index.json` under lib/lessons-data/, which
 * the hot paths below (single lesson, metadata list, next/prev) read
 * directly instead. loadLessons() still dynamic-imports the full module as
 * a fallback for anything not covered by the generated data, and for the
 * one genuinely bulk caller (the admin lesson-sync route).
 */

// Cache for loaded lessons to avoid repeated imports
let lessonsCache: Lesson[] | null = null;
let indexCache: LessonMeta[] | null = null;

const lessonsDataDir = path.join(process.cwd(), "lib", "lessons-data");

// Translations live outside lib/lessons-data because the generator wipes that
// directory on every run (see the unlinkSync loop in
// scripts/generate-lesson-data.mjs). Hand-authored English content in there
// would be deleted by the next `npm run build`.
const translationsDir = path.join(process.cwd(), "lib", "lessons-i18n");

/** Per-locale translation cache. A miss is cached as `null` too: for the 705
 *  untranslated lessons the fallback path is the common one, and without
 *  negative caching every request re-attempts a read that is known to ENOENT. */
const translationCache = new Map<string, LessonTranslation | null>();

async function loadTranslation(
  slug: string,
  locale: Locale
): Promise<LessonTranslation | null> {
  if (locale === DEFAULT_LOCALE) return null;
  const key = `${locale}/${slug}`;
  const cached = translationCache.get(key);
  if (cached !== undefined) return cached;

  let translation: LessonTranslation | null = null;
  try {
    const raw = await readFile(path.join(translationsDir, locale, `${slug}.json`), "utf8");
    translation = JSON.parse(raw) as LessonTranslation;
  } catch {
    translation = null; // not translated yet - the reader gets Vietnamese
  }
  translationCache.set(key, translation);
  return translation;
}

/**
 * Translated titles/subtitles for the listing pages, keyed by slug.
 *
 * The dashboard renders hundreds of cards from `_index.json` alone and never
 * opens a lesson body, so it cannot pay 715 per-file reads to find out which
 * titles have English versions. scripts/build-translation-index.mjs walks the
 * translation files once at build time and writes a slim per-locale index in
 * the same shape, holding only the fields a card actually shows.
 */
type TranslationIndexEntry = { title?: string; subtitle?: string; duration?: string };
const translationIndexCache = new Map<Locale, Map<string, TranslationIndexEntry>>();

async function loadTranslationIndex(
  locale: Locale
): Promise<Map<string, TranslationIndexEntry>> {
  if (locale === DEFAULT_LOCALE) return new Map();
  const cached = translationIndexCache.get(locale);
  if (cached) return cached;

  let entries: Map<string, TranslationIndexEntry>;
  try {
    const raw = await readFile(path.join(translationsDir, locale, "_index.json"), "utf8");
    entries = new Map(Object.entries(JSON.parse(raw) as Record<string, TranslationIndexEntry>));
  } catch {
    // No translations built for this locale yet. An empty map means every
    // listing falls back to Vietnamese, which is the intended behaviour, not
    // an error worth failing a render over.
    entries = new Map();
  }
  translationIndexCache.set(locale, entries);
  return entries;
}

/** Overlay translated card text onto a slim metadata row. */
function localizeMeta(meta: LessonMeta, index: Map<string, TranslationIndexEntry>): LessonMeta {
  const patch = index.get(meta.slug);
  if (!patch) return meta;
  return {
    ...meta,
    title: patch.title?.trim() ? patch.title : meta.title,
    subtitle: patch.subtitle?.trim() ? patch.subtitle : meta.subtitle,
    duration: patch.duration?.trim() ? patch.duration : meta.duration,
  };
}

/**
 * Load all lessons (cached after first load)
 * Use this sparingly - prefer getLessonBySlug or getLessonsMeta when possible
 */
export async function loadLessons(): Promise<Lesson[]> {
  if (lessonsCache) {
    return lessonsCache;
  }

  const { lessons } = await import("./lessons");
  // Mirror the generator's order exactly - overrides first, then balance.
  // This path previously applied overrides and stopped, so whenever the
  // generated data was missing it silently served the authored answer
  // positions, which is the very skew lib/lesson-quiz-balance.js exists to
  // remove.
  lessonsCache = balanceLessonQuizzes(applyLessonOverrides(lessons)) as Lesson[];
  return lessonsCache;
}

async function loadIndex(): Promise<LessonMeta[] | null> {
  if (indexCache) return indexCache;
  try {
    const raw = await readFile(path.join(lessonsDataDir, "_index.json"), "utf8");
    indexCache = JSON.parse(raw) as LessonMeta[];
    return indexCache;
  } catch {
    return null; // generated data missing/stale - callers fall back to loadLessons()
  }
}

// NOTE: ADVANCED_MASTERCLASS_LESSONS is deliberately NOT imported here.
// lib/lessons.ts already spreads it into `lessons` (see its first entry), so
// the generated data covers those five lessons like any other. The
// short-circuits that used to sit in the three functions below - checking
// that array first and returning its objects directly - predated that merge
// and had since become actively harmful:
//
//   - getLessonsMeta() concatenated them onto the generated index, so the
//     dashboard received five entries with duplicate ids AND slugs.
//   - getLessonBySlug()/getLessonById() returned the RAW authored objects,
//     bypassing the whole generator pipeline: applyLessonOverrides, the
//     day-prefix strip, the computed reading/checkpoint fields, and -
//     worst - balanceLessonQuizzes. All five shipped with every correct
//     answer at index 1, the exact position tell the balancer exists to
//     remove (see AGENTS.md).

/**
 * Get a single lesson by slug with minimal bundle impact
 * Only loads the lessons module when called
 */
export async function getLessonBySlug(
  slug: string,
  // Defaults to Vietnamese so every existing caller keeps its current
  // behaviour; only callers that have actually resolved the reader's locale
  // (via getServerLocale) opt into a translation.
  locale: Locale = DEFAULT_LOCALE
): Promise<LocalizedLesson | undefined> {
  const source = await getSourceLessonBySlug(slug);
  if (!source) return undefined;
  return mergeLessonTranslation(source, await loadTranslation(slug, locale), locale);
}

/** The Vietnamese lesson exactly as generated - no translation applied. */
async function getSourceLessonBySlug(slug: string): Promise<Lesson | undefined> {
  try {
    const raw = await readFile(path.join(lessonsDataDir, `${slug}.json`), "utf8");
    // Served as-is. scripts/generate-lesson-data.mjs already ran
    // applyLessonOverrides over this content and THEN balanced the answer
    // positions, in that order. Re-applying the overrides here replayed the
    // authored `correct` indices on top of the balanced ones and undid the
    // balancing entirely: 211 of 576 lessons were being served with every
    // correct answer at index 0, against 11 in the generated data. Answering
    // "A" to everything scored 100% on those, which feeds avg_quiz_score,
    // the unlock gate, XP and the /su-nghiep competency percentages.
    return JSON.parse(raw) as Lesson;
  } catch {
    const lessons = await loadLessons();
    return lessons.find((l) => l && l.slug === slug);
  }
}

/**
 * Get lesson by ID with minimal bundle impact - resolves id -> slug via the
 * cheap generated index, then reuses getLessonBySlug's fast per-file read.
 */
export async function getLessonById(
  id: number,
  locale: Locale = DEFAULT_LOCALE
): Promise<LocalizedLesson | undefined> {
  const index = await loadIndex();
  const slug = index?.find((l) => l.id === id)?.slug;
  if (slug) {
    const lesson = await getLessonBySlug(slug, locale);
    if (lesson) return lesson;
  }
  const lessons = await loadLessons();
  const source = lessons.find((l) => l.id === id);
  if (!source) return undefined;
  return mergeLessonTranslation(source, await loadTranslation(source.slug, locale), locale);
}

/**
 * Get lesson metadata only (stripped down version for dashboard)
 * This is the most efficient way to load lesson data for listings
 */
export async function getLessonsMeta(locale: Locale = DEFAULT_LOCALE): Promise<LessonMeta[]> {
  const index = await loadIndex();
  if (index) {
    if (locale === DEFAULT_LOCALE) return index;
    const translations = await loadTranslationIndex(locale);
    // No translations for this locale: return the cached array by reference
    // rather than mapping 715 rows into a fresh one on every request.
    if (translations.size === 0) return index;
    return index.map((meta) => localizeMeta(meta, translations));
  }

  const lessons = await loadLessons();
  return lessons.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    subtitle: l.subtitle,
    duration: l.duration,
    totalMinutes: l.totalMinutes,
    difficulty: l.difficulty,
    track: l.track,
    isFundamental: l.isFundamental,
  }));
}

/**
 * Get lessons by track with metadata only
 */
export async function getLessonsByTrack(
  track: "personal" | "professional" | "bonus",
  locale: Locale = DEFAULT_LOCALE
): Promise<LessonMeta[]> {
  const index = (await loadIndex()) ?? (await loadLessons());
  const translations = await loadTranslationIndex(locale);

  // "bonus" is the one track that only ever exists as an explicit field -
  // case-study lessons sit outside the day-numbered curriculum by
  // definition, so there is no stage range to derive them from. The other
  // two go through the shared rule, because most lessons carry no `track`
  // field at all and deriving from the stage ranges is how the dashboard,
  // the profile page and the kiem-tra suggestion all resolve it.
  const belongs = (lesson: { id: number; track?: "personal" | "professional" | "bonus" }) =>
    track === "bonus" ? lesson.track === "bonus" : lessonBelongsToTrack(lesson, track);

  return index.filter(belongs).map((l) =>
    localizeMeta(
      {
        id: l.id,
        slug: l.slug,
        title: l.title,
        subtitle: l.subtitle,
        duration: l.duration,
        totalMinutes: l.totalMinutes,
        difficulty: l.difficulty,
        track: l.track,
      },
      translations
    )
  );
}

/**
 * Get next lesson by ID
 */
export async function getNextLesson(
  currentId: number,
  locale: Locale = DEFAULT_LOCALE
): Promise<NextLessonMeta | undefined> {
  const index = await loadIndex();
  const translations = await loadTranslationIndex(locale);
  const titleOf = (slug: string, title: string) => {
    const patch = translations.get(slug);
    return patch?.title?.trim() ? patch.title : title;
  };

  if (index) {
    const next = index.find((l) => l.id === currentId + 1);
    return next
      ? { id: next.id, slug: next.slug, title: titleOf(next.slug, next.title) }
      : undefined;
  }

  const lessons = await loadLessons();
  const next = lessons.find((l) => l.id === currentId + 1);
  if (!next) return undefined;

  return {
    id: next.id,
    slug: next.slug,
    title: titleOf(next.slug, next.title),
  };
}

/**
 * Get previous lesson by ID
 */
export async function getPreviousLesson(
  currentId: number,
  locale: Locale = DEFAULT_LOCALE
): Promise<NextLessonMeta | undefined> {
  const index = await loadIndex();
  const translations = await loadTranslationIndex(locale);
  const titleOf = (slug: string, title: string) => {
    const patch = translations.get(slug);
    return patch?.title?.trim() ? patch.title : title;
  };

  if (index) {
    const prev = index.find((l) => l.id === currentId - 1);
    return prev
      ? { id: prev.id, slug: prev.slug, title: titleOf(prev.slug, prev.title) }
      : undefined;
  }

  const lessons = await loadLessons();
  const prev = lessons.find((l) => l.id === currentId - 1);
  if (!prev) return undefined;

  return {
    id: prev.id,
    slug: prev.slug,
    title: titleOf(prev.slug, prev.title),
  };
}

// Re-export for existing server-side importers (Server Components/Actions
// that already do `import type { LessonMeta } from "@/lib/lessons-loader"`)
// - the canonical declarations now live in lib/lesson-types.ts.
export type { LessonMeta, NextLessonMeta };
export type { LocalizedLesson };
