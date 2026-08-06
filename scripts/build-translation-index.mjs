// Builds the per-locale slim index that lib/lessons-loader.ts overlays onto
// lib/lessons-data/_index.json when a reader is not on the source language.
//
//   node scripts/build-translation-index.mjs
//
// WHY THIS EXISTS. The dashboard, the track pages and the lock-check listings
// all render from _index.json alone - they never open a lesson body, which is
// the whole point of that file (see lib/lessons-loader.ts). An English reader
// still needs English card titles, and finding them by opening 715 translation
// files per request would undo that optimization. So the titles are collected
// once here into one small file per locale.
//
// It also reports translation drift: a translation whose array lengths no
// longer match its Vietnamese lesson. That is a warning, not a failure -
// lib/lesson-translations.ts degrades the affected field to Vietnamese, so the
// page still renders, and a routine edit to one Vietnamese lesson must not be
// able to break the build for every translation at once.

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "lib/lessons-data");
const translationsRoot = path.join(root, "lib/lessons-i18n");

// Kept in step with lib/i18n/locales.ts by hand rather than imported: that
// file is TypeScript and this script runs under plain node with no build step.
// The source language has nothing to index.
const TARGET_LOCALES = ["en"];

/**
 * Slugs that have a hand-authored page of their own under app/bai-hoc/<slug>/.
 *
 * These cannot be translated through this mechanism, and a translation file for
 * one is inert rather than wrong. Next resolves the specific route ahead of the
 * dynamic app/bai-hoc/[slug] one, and those bespoke pages are "use client"
 * components with their lesson content written inline - they never call
 * getLessonBySlug, so nothing ever reads the translation. It would sit in the
 * repo looking done and change nothing on the page.
 *
 * Failing the build is the point: a silently ignored translation is the same
 * defect as the shadowed `sections` overrides described in AGENTS.md, where 35
 * lessons' edited content was being discarded with every check still green.
 *
 * Detected rather than listed, so a page added later is caught without anyone
 * remembering this file exists.
 */
const handAuthoredDir = path.join(root, "app/bai-hoc");
const HAND_AUTHORED_SLUGS = new Set(
  existsSync(handAuthoredDir)
    ? readdirSync(handAuthoredDir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && !e.name.startsWith("["))
        .map((e) => e.name)
    : []
);

// The directories and the index files are created even when there is nothing
// to put in them. proxy.ts imports lib/lessons-i18n/<locale>/_index.json to
// decide which lesson URLs to rewrite, and a bare `import` of a missing file is
// a build error - so "no translations yet" has to be representable as an empty
// index rather than as an absent file.
mkdirSync(translationsRoot, { recursive: true });

/** Same rule as lib/lesson-translations.ts#findTranslationDrift, duplicated
 *  because that file is TypeScript. Kept to the array-length checks only; the
 *  per-block type check lives in the TS version where the union is available. */
function drift(lesson, translation) {
  const problems = [];
  const pairs = [
    ["openingOptions", translation.openingOptions?.length, lesson.openingOptions?.length ?? 0],
    ["diagram", translation.diagram?.length, lesson.diagram?.length ?? 0],
    ["quiz", translation.quiz?.length, lesson.quiz?.length ?? 0],
    ["keyTakeaways", translation.keyTakeaways?.length, lesson.keyTakeaways?.length ?? 0],
    ["sections", translation.sections?.length, lesson.sections?.length ?? 0],
  ];
  for (const [field, got, want] of pairs) {
    if (got !== undefined && got !== want) problems.push(`${field}: ${got} vs ${want}`);
  }
  (translation.quiz ?? []).forEach((patch, i) => {
    const want = lesson.quiz?.[i]?.options?.length;
    const got = patch?.options?.length;
    if (got !== undefined && want !== undefined && got !== want) {
      problems.push(`quiz[${i}].options: ${got} vs ${want}`);
    }
  });
  (translation.sections ?? []).forEach((patch, i) => {
    const want = lesson.sections?.[i]?.type;
    if (patch?.type && want && patch.type !== want) {
      problems.push(`sections[${i}]: "${patch.type}" vs "${want}"`);
    }
  });
  return problems;
}

let exitCode = 0;

for (const locale of TARGET_LOCALES) {
  const dir = path.join(translationsRoot, locale);
  mkdirSync(dir, { recursive: true });

  const files = readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "_index.json");
  const index = {};
  const drifted = [];
  const orphaned = [];

  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    const translation = JSON.parse(readFileSync(path.join(dir, file), "utf8"));

    if (translation.slug !== slug) {
      // The loader keys on the filename and then refuses a patch whose `slug`
      // disagrees, so this would silently serve Vietnamese forever.
      orphaned.push(`${slug}: file name does not match its "slug" field ("${translation.slug}")`);
      exitCode = 1;
      continue;
    }

    // Checked BEFORE the lessons-data lookup, not after. All 17 hand-authored
    // pages today have no lessons-data entry at all, so an "is there a lesson
    // file" check placed first swallows every one of them and reports the
    // useless "no such lesson in lib/lessons-data/" - sending whoever wrote the
    // translation off to look for a missing data file instead of telling them
    // the page holds its content inline. In that order this branch was
    // unreachable code that read as if it were doing something.
    if (HAND_AUTHORED_SLUGS.has(slug)) {
      orphaned.push(
        `${slug}: has a hand-authored page at app/bai-hoc/${slug}/, which Next serves ` +
          `instead of the data-driven route. That page holds its content inline and never ` +
          `calls getLessonBySlug, so this translation would never be read by anything. ` +
          `Translate that page's own strings instead.`
      );
      exitCode = 1;
      continue;
    }

    const lessonPath = path.join(dataDir, `${slug}.json`);
    if (!existsSync(lessonPath)) {
      orphaned.push(
        `${slug}: no such lesson in lib/lessons-data/. Check the slug spelling, and ` +
          `re-run scripts/generate-lesson-data.mjs if the lesson is new.`
      );
      exitCode = 1;
      continue;
    }

    const problems = drift(JSON.parse(readFileSync(lessonPath, "utf8")), translation);
    if (problems.length) drifted.push(`${slug}: ${problems.join("; ")}`);

    // Only what a listing card renders. Anything else here would grow a file
    // that is read on every dashboard request.
    index[slug] = {
      ...(translation.title ? { title: translation.title } : {}),
      ...(translation.subtitle ? { subtitle: translation.subtitle } : {}),
      ...(translation.duration ? { duration: translation.duration } : {}),
    };
  }

  writeFileSync(path.join(dir, "_index.json"), `${JSON.stringify(index, null, 2)}\n`);
  console.log(`${locale}: indexed ${Object.keys(index).length} translated lesson(s).`);

  if (drifted.length) {
    console.log(
      `\n  ${drifted.length} translation(s) out of step with their lesson. The mismatched\n` +
        `  field falls back to Vietnamese; re-translate it against the current\n` +
        `  lib/lessons-data/<slug>.json:\n` +
        drifted.map((d) => `    ${d}`).join("\n")
    );
  }

  if (orphaned.length) {
    console.error(
      `\n  ${orphaned.length} translation file(s) cannot be served at all:\n` +
        orphaned.map((o) => `    ${o}`).join("\n")
    );
  }
}

process.exit(exitCode);
