// Pure type declarations only - NO runtime code, NO import of ./lessons or
// ./lessons-loader, and it must stay that way.
//
// Why this file exists: lib/lessons.ts holds every lesson's full content
// (~7000+ lines) and lib/lessons-loader.ts dynamic-import()s it to keep that
// content server-only. Client components only ever need the *types*
// (Lesson, Difficulty, LessonMeta, ...), but when they imported those types
// from lessons-loader.ts directly, the bundler ended up pulling the entire
// lessons array into a client-shipped chunk anyway (~1.3MB, verified via a
// production build) despite the import being `import type` - likely because
// the bundler's module-graph analysis processes the whole file, dynamic
// import() included, before type-only imports are erased.
//
// Keeping types in a file that has zero possible path to the heavy data
// closes that off structurally instead of relying on the bundler eliding
// things correctly. Client components must import from here, not from
// lessons-loader.ts or lessons.ts.

export type Difficulty = "Dễ" | "Trung bình" | "Khó";

export interface LessonPracticePrompt {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface DiagramNode {
  label: string;
  arrow?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

// Rich, hand-written content blocks for a lesson's article body.
// Rendered by components/LessonSections.tsx in the same visual style as the
// original Day 1-20 hand-written pages (section headings, hover concept
// tables, comparison boxes, etc).
export type LessonSectionBlock =
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; label: string; text: string }
  | { type: "comparison"; left: { label: string; text: string }; right: { label: string; text: string } }
  | { type: "conceptTable"; title: string; subtitle?: string; concepts: { vi: string; en: string; def: string }[] }
  | {
      type: "formula";
      title?: string;
      label?: string;
      numerator?: string;
      denominator?: string;
      multiplier?: string;
      equation?: string;
      variables?: { symbol: string; name: string; description?: string }[];
      example?: { title?: string; calculation: string; result: string; explanation?: string };
    }
  | { type: "closing"; lines: string[] };

export interface Lesson {
  id: number;
  day?: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  estimatedMinutes?: number;
  // All three computed at build time by scripts/generate-lesson-data.mjs
  // from the body's estimated reading time (see lib/lesson-reading.js) -
  // absent on lessons that bypass that generator, e.g.
  // ADVANCED_MASTERCLASS_LESSONS.
  //
  // readingMinutes covers the article body only (what the "còn X phút"
  // progress label counts down); totalMinutes adds the opening question and
  // quiz, and is what to show before someone opens the lesson.
  readingMinutes?: number;
  totalMinutes?: number;
  // Index of the section block the mid-article "Dừng & Kiểm tra" check is
  // rendered after; -1 when the lesson is too short to interrupt.
  checkpointIndex?: number;
  difficulty: Difficulty;
  emoji: string;
  openingQuestion: string;
  openingOptions: string[];
  correctOption: number;
  explanation: string;
  // Shown at the very top of the lesson, before the opening question - one
  // or two sentences on why this specific lesson matters and what it lets
  // the learner actually do afterward. Optional so older lessons keep
  // working; the renderer falls back to `subtitle` when absent.
  whyItMatters?: string;
  // Path under /public to a hand-crafted visual summary (infographic) shown
  // near the end of the lesson as a one-glance recap. Optional - most
  // lessons rely on the diagram/keyTakeaways blocks instead.
  summaryImage?: string;
  diagram: DiagramNode[];
  interactiveType?:
    | "interest-rate"
    | "supply-demand"
    | "profit-calc"
    | "roe"
    | "bond"
    | "money-vs-asset"
    | "cash-flow-simulator"
    | "inflation-calculator"
    | "process"
    | "budget"
    | "chart"
    | "risk"
    | "payoff"
    | "multiples"
    | "prospect"
    | "accretion"
    | "ethics-case"
    | "fee-drag"
    | "ratios"
    | "tail-risk"
    | "excel-shortcuts"
    | "excel-lookup"
    | "excel-three-statement"
    | "excel-audit"
    | "excel-power-query"
    | "excel-sql"
    | "prompt-craft"
    | "ai-verify"
    | "esg-score"
    | "sampling"
    | "regression"
    | "tax-brackets"
    | "journal-entry";
  realWorldExample: {
    company: string;
    description: string;
  };
  quiz: QuizQuestion[];
  keyTakeaways: string[];
  practicePrompt?: LessonPracticePrompt;
  summary?: {
    keyIdea: string;
    formula?: string;
    commonMistake?: string;
    action?: string;
  };
  application?: {
    title?: string;
    message: string;
    secondary?: string;
  };
  track?: "professional" | "personal" | "bonus"; // "bonus" = case-study lessons not part of the day-numbered curriculum
  sections?: LessonSectionBlock[]; // rich hand-written body; falls back to `explanation`/`diagram` when absent
  isFundamental?: boolean; // free lesson, unlocked for all users
  videoUrl?: string; // optional YouTube video URL or embedded video URL for this lesson
}

/**
 * Translated lesson content, merged onto the canonical Vietnamese lesson by
 * lib/lesson-translations.js.
 *
 * WHY A PATCH RATHER THAN A FULL LESSON COPY. A translation file holds only
 * human-readable strings. Everything structural - `id`, `day`, `slug`,
 * `resolvedTrack`, `checkpointIndex`, `isFundamental`, `interactiveType`, and
 * above all every `correct`/`correctOption` index - is read from the
 * Vietnamese lesson and is not overridable. A full mirror would let those
 * drift silently: an English copy carrying its own `correct: 2` would keep
 * grading against a stale answer position for as long as nobody diffed 715
 * pairs of files by hand.
 *
 * That matters more here than it looks. scripts/generate-lesson-data.mjs runs
 * `balanceLessonQuizzes` over the corpus, which REORDERS each question's
 * options to strip the positional tell documented in AGENTS.md. So the option
 * order in lib/lessons-data/<slug>.json is not the order authored in
 * lib/lessons.ts. Translations are therefore made from the *generated*
 * Vietnamese file, and `options` is positional: element i of the English array
 * must translate element i of the Vietnamese one. Get that wrong and the
 * lesson marks a correct answer wrong.
 *
 * `difficulty` is deliberately absent. It is a Vietnamese string union used as
 * a *value* throughout the app - as a lookup key, in comparisons, and in the
 * generated index - so translating it would break those call sites. The UI
 * renders it through the i18n dictionary instead.
 */
export interface LessonTranslation {
  /** Must equal the slug of the lesson being translated, and the translation
   *  file's own name. The loader refuses a patch that disagrees. */
  slug: string;
  title?: string;
  subtitle?: string;
  /** Free text like "6 phút" -> "6 min". Not parsed anywhere; `totalMinutes`
   *  is the numeric field and stays canonical. */
  duration?: string;
  whyItMatters?: string;
  openingQuestion?: string;
  openingOptions?: string[];
  explanation?: string;
  diagram?: { label?: string }[];
  realWorldExample?: { company?: string; description?: string };
  quiz?: { question?: string; options?: string[]; explanation?: string }[];
  keyTakeaways?: string[];
  practicePrompt?: { question?: string; options?: string[]; explanation?: string };
  summary?: { keyIdea?: string; formula?: string; commonMistake?: string; action?: string };
  application?: { title?: string; message?: string; secondary?: string };
  sections?: TranslatedSectionBlock[];
}

/**
 * A section block's translatable fields, positional against the Vietnamese
 * `sections` array. `type` is repeated as a checksum: a translation whose
 * block types no longer line up has gone stale, and the merge drops it rather
 * than rendering an English heading where a formula should be.
 *
 * A `conceptTable`'s `vi` term is deliberately not translatable: the table is
 * already bilingual by design - the Vietnamese term is the thing being taught,
 * so it stays visible in the English lesson.
 *
 * `en` is a different case, and the first cut of this type got it wrong by
 * grouping the two together. That reasoning only holds while `en` really is
 * the English term. It is not, in 112 of the corpus's concepts: a good number
 * of tables repurpose the column as a verdict or a category and fill it with
 * Vietnamese - `en: "Vi phạm ngay lúc chép"` in
 * `cfa-ethics-case-chuyen-viec-va-khach-hang`, `en: "An toàn thanh khoản"` in
 * `nvidia-cash-securities`. LessonSections renders `en` as a chip beside the
 * term, so an English reader saw a Vietnamese term captioned in Vietnamese,
 * and no patch could reach it. Optional for the same reason the formula fields
 * are: omit it and a real English term passes through untouched, supply it and
 * a repurposed column gets translated.
 *
 * A `formula`'s `equation`, `numerator`, `denominator`, `multiplier` and its
 * example's `calculation`/`result` ARE translatable, and every one of them is
 * optional. The first cut of this type left them out on the reasoning that a
 * formula is notation rather than prose. That is true of some
 * ("FV = PV × (1 + r)^n") and false of a great many others - the corpus is
 * full of equations written as words, like "NOI = potential rental revenue −
 * vacancy and bad debt − operating expenses". Excluding them stranded
 * Vietnamese sentences in the middle of an English lesson. Being optional is
 * what keeps both cases right: omit the field and real notation passes through
 * untouched, supply it and a worded equation gets translated.
 */
export type TranslatedSectionBlock =
  | { type: "lead"; text?: string }
  | { type: "heading"; text?: string }
  | { type: "paragraph"; text?: string }
  | { type: "list"; items?: string[] }
  | { type: "callout"; label?: string; text?: string }
  | {
      type: "comparison";
      left?: { label?: string; text?: string };
      right?: { label?: string; text?: string };
    }
  | {
      type: "conceptTable";
      title?: string;
      subtitle?: string;
      concepts?: { en?: string; def?: string }[];
    }
  | {
      type: "formula";
      title?: string;
      label?: string;
      equation?: string;
      numerator?: string;
      denominator?: string;
      multiplier?: string;
      // `symbol` is translatable because it is what the equation refers to: a
      // worded equation has worded symbols, and translating one without the
      // other leaves the variable list keyed to terms no longer in the formula.
      variables?: { symbol?: string; name?: string; description?: string }[];
      example?: { title?: string; calculation?: string; result?: string; explanation?: string };
    }
  | { type: "closing"; lines?: string[] };

/** A lesson plus the provenance of the text it carries. */
export interface LocalizedLesson extends Lesson {
  /** The locale the reader asked for. */
  locale: string;
  /** False when `locale` is not the source language and no usable translation
   *  exists, so the reader is seeing Vietnamese. Drives the "Vietnamese only"
   *  badge - the alternative, hiding untranslated lessons, would punch holes
   *  in the day-numbered path and break the unlock gate and the /su-nghiep
   *  competency percentages. */
  translated: boolean;
}

// Slim projection of Lesson - just enough to render dashboard/lock-check
// listings, so the full lesson bodies (sections/quiz/etc) never need to
// reach a client bundle.
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  // Computed whole-lesson estimate from the generated index; absent for
  // lessons that bypass the generator (ADVANCED_MASTERCLASS_LESSONS), whose
  // callers fall back to the hand-authored `duration` string.
  totalMinutes?: number;
  difficulty: Difficulty;
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
