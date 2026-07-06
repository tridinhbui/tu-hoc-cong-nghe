// Pure type declarations only — NO runtime code, NO import of ./lessons or
// ./lessons-loader, and it must stay that way.
//
// Why this file exists: lib/lessons.ts holds every lesson's full content
// (~7000+ lines) and lib/lessons-loader.ts dynamic-import()s it to keep that
// content server-only. Client components only ever need the *types*
// (Lesson, Difficulty, LessonMeta, ...), but when they imported those types
// from lessons-loader.ts directly, the bundler ended up pulling the entire
// lessons array into a client-shipped chunk anyway (~1.3MB, verified via a
// production build) despite the import being `import type` — likely because
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
  explanation: string;
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
  | { type: "closing"; lines: string[] };

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: Difficulty;
  emoji: string;
  openingQuestion: string;
  openingOptions: string[];
  correctOption: number;
  explanation: string;
  // Shown at the very top of the lesson, before the opening question — one
  // or two sentences on why this specific lesson matters and what it lets
  // the learner actually do afterward. Optional so older lessons keep
  // working; the renderer falls back to `subtitle` when absent.
  whyItMatters?: string;
  diagram: DiagramNode[];
  interactiveType?:
    | "interest-rate"
    | "supply-demand"
    | "profit-calc"
    | "roe"
    | "bond"
    | "money-vs-asset"
    | "cash-flow-simulator"
    | "inflation-calculator";
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
}

// Slim projection of Lesson — just enough to render dashboard/lock-check
// listings, so the full lesson bodies (sections/quiz/etc) never need to
// reach a client bundle.
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
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
