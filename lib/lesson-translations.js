// Merges a translation patch onto a canonical Vietnamese lesson.
//
// Plain JS on purpose, following lib/lesson-quiz-overrides.js and
// lib/lesson-quiz-balance.js: this module has to be importable both from the
// app (lib/lessons-loader.ts) and from a plain-node script
// (scripts/audit-lesson-content.mjs, which measures option lengths on the
// English corpus). A TypeScript version would have forced the audit to
// reimplement the merge, and a second copy of "which fields are translatable
// and what happens on a length mismatch" is exactly the kind of drift AGENTS.md
// keeps having to document after the fact.
//
// The types live in lib/lesson-types.ts (LessonTranslation,
// TranslatedSectionBlock, LocalizedLesson), which is the designated pure-type
// file. Read the doc comment on LessonTranslation there first - it explains why
// this is a patch and not a full lesson copy, and why `correct` is never taken
// from a translation.

/**
 * Prefer the translation, fall back to the source. Empty and whitespace-only
 * strings count as missing: a blank field in a translation file is an
 * omission, not an instruction to render nothing.
 *
 * @template T
 * @param {T | undefined | null} translated
 * @param {T} source
 * @returns {T}
 */
function pick(translated, source) {
  if (translated === undefined || translated === null) return source;
  if (typeof translated === "string" && translated.trim() === "") return source;
  return translated;
}

/**
 * Merge a positional string array element by element.
 *
 * A length mismatch returns the source untouched rather than merging what it
 * can. The `options` array is the dangerous case: three English options and
 * one Vietnamese leftover still *renders*, and if the translator dropped an
 * element then everything after it has shifted, so `correct` now points at a
 * different answer than the one it was keyed to. Refusing the whole array
 * keeps the question gradeable, and the drift report names it.
 *
 * @param {string[] | undefined} translated
 * @param {string[] | undefined} source
 * @returns {string[] | undefined}
 */
function mergeArray(translated, source) {
  if (!source) return source;
  if (!translated || translated.length !== source.length) return source;
  return source.map((text, i) => pick(translated[i], text));
}

function mergeQuiz(translated, source) {
  if (!source) return source;
  if (!translated || translated.length !== source.length) return source;
  return source.map((question, i) => {
    const patch = translated[i];
    if (!patch) return question;
    return {
      // `correct` deliberately comes from the spread and is never patched.
      ...question,
      question: pick(patch.question, question.question),
      options: mergeArray(patch.options, question.options),
      explanation: pick(patch.explanation, question.explanation),
    };
  });
}

function mergePractice(translated, source) {
  if (!source || !translated) return source;
  return {
    ...source,
    question: pick(translated.question, source.question),
    options: mergeArray(translated.options, source.options),
    explanation: pick(translated.explanation, source.explanation),
  };
}

function mergeSection(patch, source) {
  // A type mismatch means the lesson body was restructured after the
  // translation was written. Render the Vietnamese block rather than guess.
  if (!patch || patch.type !== source.type) return source;

  switch (source.type) {
    case "lead":
    case "heading":
    case "paragraph":
      return { ...source, text: pick(patch.text, source.text) };

    case "list":
      return { ...source, items: mergeArray(patch.items, source.items) };

    case "callout":
      return {
        ...source,
        label: pick(patch.label, source.label),
        text: pick(patch.text, source.text),
      };

    case "comparison":
      return {
        ...source,
        left: {
          ...source.left,
          label: pick(patch.left?.label, source.left.label),
          text: pick(patch.left?.text, source.left.text),
        },
        right: {
          ...source.right,
          label: pick(patch.right?.label, source.right.label),
          text: pick(patch.right?.text, source.right.text),
        },
      };

    case "conceptTable": {
      const concepts =
        patch.concepts && patch.concepts.length === source.concepts.length
          ? source.concepts.map((c, i) => ({
              ...c,
              // `vi` is never patched - see the conceptTable note in
              // lib/lesson-types.ts. `en` is, because a good part of the corpus
              // fills that column with Vietnamese rather than an English term.
              en: pick(patch.concepts[i]?.en, c.en),
              def: pick(patch.concepts[i]?.def, c.def),
            }))
          : source.concepts;
      return {
        ...source,
        title: pick(patch.title, source.title),
        subtitle: pick(patch.subtitle, source.subtitle),
        concepts,
      };
    }

    case "formula": {
      const variables =
        source.variables && patch.variables && patch.variables.length === source.variables.length
          ? source.variables.map((v, i) => ({
              ...v,
              symbol: pick(patch.variables[i]?.symbol, v.symbol),
              name: pick(patch.variables[i]?.name, v.name),
              description: pick(patch.variables[i]?.description, v.description),
            }))
          : source.variables;
      return {
        ...source,
        title: pick(patch.title, source.title),
        label: pick(patch.label, source.label),
        // Optional on purpose: real notation is left alone by omitting these,
        // while an equation written as words gets translated by supplying them.
        // See the LessonTranslation doc in lib/lesson-types.ts.
        equation: pick(patch.equation, source.equation),
        numerator: pick(patch.numerator, source.numerator),
        denominator: pick(patch.denominator, source.denominator),
        multiplier: pick(patch.multiplier, source.multiplier),
        variables,
        example: source.example
          ? {
              ...source.example,
              title: pick(patch.example?.title, source.example.title),
              calculation: pick(patch.example?.calculation, source.example.calculation),
              result: pick(patch.example?.result, source.example.result),
              explanation: pick(patch.example?.explanation, source.example.explanation),
            }
          : source.example,
      };
    }

    case "closing":
      return { ...source, lines: mergeArray(patch.lines, source.lines) };

    default:
      return source;
  }
}

/**
 * Apply a translation patch to a lesson.
 *
 * `translated` in the result is true when a patch was applied at all, not a
 * claim that every field in it was filled. A patch covering the body but not
 * yet the quiz is a normal intermediate state, and the badge should stop
 * telling an English reader "Vietnamese only" as soon as the lesson actually
 * reads as English.
 *
 * @param {import("./lesson-types").Lesson} lesson
 * @param {import("./lesson-types").LessonTranslation | null | undefined} translation
 * @param {string} locale
 * @returns {import("./lesson-types").LocalizedLesson}
 */
export function mergeLessonTranslation(lesson, translation, locale) {
  if (!translation || translation.slug !== lesson.slug) {
    return { ...lesson, locale, translated: false };
  }

  return {
    ...lesson,
    title: pick(translation.title, lesson.title),
    subtitle: pick(translation.subtitle, lesson.subtitle),
    duration: pick(translation.duration, lesson.duration),
    whyItMatters: pick(translation.whyItMatters, lesson.whyItMatters),
    openingQuestion: pick(translation.openingQuestion, lesson.openingQuestion),
    openingOptions: mergeArray(translation.openingOptions, lesson.openingOptions),
    explanation: pick(translation.explanation, lesson.explanation),
    diagram:
      translation.diagram && lesson.diagram && translation.diagram.length === lesson.diagram.length
        ? lesson.diagram.map((node, i) => ({
            ...node,
            label: pick(translation.diagram[i]?.label, node.label),
          }))
        : lesson.diagram,
    realWorldExample: lesson.realWorldExample
      ? {
          ...lesson.realWorldExample,
          company: pick(translation.realWorldExample?.company, lesson.realWorldExample.company),
          description: pick(
            translation.realWorldExample?.description,
            lesson.realWorldExample.description
          ),
        }
      : lesson.realWorldExample,
    quiz: mergeQuiz(translation.quiz, lesson.quiz),
    keyTakeaways: mergeArray(translation.keyTakeaways, lesson.keyTakeaways),
    practicePrompt: mergePractice(translation.practicePrompt, lesson.practicePrompt),
    summary: lesson.summary
      ? {
          ...lesson.summary,
          keyIdea: pick(translation.summary?.keyIdea, lesson.summary.keyIdea),
          formula: pick(translation.summary?.formula, lesson.summary.formula),
          commonMistake: pick(translation.summary?.commonMistake, lesson.summary.commonMistake),
          action: pick(translation.summary?.action, lesson.summary.action),
        }
      : lesson.summary,
    application: lesson.application
      ? {
          ...lesson.application,
          title: pick(translation.application?.title, lesson.application.title),
          message: pick(translation.application?.message, lesson.application.message),
          secondary: pick(translation.application?.secondary, lesson.application.secondary),
        }
      : lesson.application,
    sections:
      lesson.sections && translation.sections?.length === lesson.sections.length
        ? lesson.sections.map((block, i) => mergeSection(translation.sections[i], block))
        : lesson.sections,
    locale,
    translated: true,
  };
}

/**
 * Every way a translation can have fallen out of step with its lesson.
 *
 * Reported rather than thrown: a stale translation degrades to Vietnamese for
 * the affected field, which is still a readable page. Making it a build
 * failure would mean a routine edit to one Vietnamese lesson breaks the build
 * for every translation at once.
 *
 * @param {import("./lesson-types").Lesson} lesson
 * @param {import("./lesson-types").LessonTranslation} translation
 * @returns {string[]}
 */
export function findTranslationDrift(lesson, translation) {
  const drift = [];
  if (translation.slug !== lesson.slug) {
    drift.push(`slug mismatch: translation says "${translation.slug}"`);
  }

  const pairs = [
    ["openingOptions", translation.openingOptions?.length, lesson.openingOptions?.length ?? 0],
    ["diagram", translation.diagram?.length, lesson.diagram?.length ?? 0],
    ["quiz", translation.quiz?.length, lesson.quiz?.length ?? 0],
    ["keyTakeaways", translation.keyTakeaways?.length, lesson.keyTakeaways?.length ?? 0],
    ["sections", translation.sections?.length, lesson.sections?.length ?? 0],
    [
      "practicePrompt.options",
      translation.practicePrompt?.options?.length,
      lesson.practicePrompt?.options?.length ?? 0,
    ],
  ];
  for (const [field, got, want] of pairs) {
    if (got !== undefined && got !== want) {
      drift.push(`${field}: ${got} entries, lesson has ${want}`);
    }
  }

  (translation.quiz ?? []).forEach((patch, i) => {
    const source = lesson.quiz?.[i];
    if (!source || !patch?.options) return;
    if (patch.options.length !== source.options.length) {
      drift.push(
        `quiz[${i}].options: ${patch.options.length}, lesson has ${source.options.length}`
      );
    }
  });

  (translation.sections ?? []).forEach((patch, i) => {
    const source = lesson.sections?.[i];
    if (!source || !patch) return;
    if (patch.type !== source.type) {
      drift.push(`sections[${i}]: translation is "${patch.type}", lesson is "${source.type}"`);
    }
  });

  return drift;
}
