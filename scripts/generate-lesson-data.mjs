// One-off/regeneratable build step: splits the ~2MB lib/lessons.ts monolith
// into one small JSON file per lesson (lib/lessons-data/<slug>.json) plus a
// lightweight index (lib/lessons-data/_index.json). lib/lessons-loader.ts
// reads these directly for the hot paths (single lesson page, dashboard
// metadata, next/prev lookup) instead of dynamic-importing and parsing the
// entire lessons.ts module on every request.
//
// Run with: node scripts/generate-lesson-data.mjs
// Re-run this any time lib/lessons.ts changes.

import ts from "typescript";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { createRequire } from "module";
import { applyLessonOverrides } from "../lib/lesson-quiz-overrides.js";
import { balanceLessonQuizzes, assertBalancePreservedAnswers } from "../lib/lesson-quiz-balance.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nodeRequire = createRequire(import.meta.url);

function resolveTsPath(p) {
  if (existsSync(p)) return p;
  if (existsSync(p + ".ts")) return p + ".ts";
  if (existsSync(p + ".tsx")) return p + ".tsx";
  return p;
}

// Cache of already-executed local TS modules, keyed by resolved absolute
// path, so a file imported from multiple places is only transpiled/run once.
const localModuleCache = new Map();

// Transpiles and executes a local .ts module the same hand-rolled way as
// lib/lessons.ts itself (no real TS/Node loader in this script - just
// ts.transpileModule + `new Function`). Any *relative* import it in turn
// pulls in (e.g. lib/lessons.ts importing lib/advanced-masterclass-lessons.ts)
// is resolved the same way, recursively - only bare specifiers (npm
// packages, Node builtins) fall through to a real `require`. This keeps
// adding a new local lesson-data file a one-line `import` in lessons.ts,
// with no matching change needed here.
function loadLocalModule(rawPath) {
  const resolved = resolveTsPath(rawPath);
  if (localModuleCache.has(resolved)) return localModuleCache.get(resolved);

  const src = readFileSync(resolved, "utf8");
  const stripped = src
    .split(/\r?\n/)
    .filter((line) => !line.includes('from "./lesson-types"') && line !== 'import "server-only";')
    .join("\n");

  let { outputText } = ts.transpileModule(stripped, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  outputText = outputText.replace("exports. = exports.lessons = void 0;", "exports.lessons = void 0;");

  const moduleObj = { exports: {} };
  const dir = path.dirname(resolved);
  const requireShim = (spec) =>
    spec.startsWith(".") ? loadLocalModule(path.join(dir, spec)) : nodeRequire(spec);

  new Function("exports", "module", "require", outputText)(moduleObj.exports, moduleObj, requireShim);
  localModuleCache.set(resolved, moduleObj.exports);
  return moduleObj.exports;
}

const { lessons: rawLessons } = loadLocalModule(path.join(root, "lib/lessons.ts"));
const cleanedLessons = applyLessonOverrides(rawLessons)
  .filter(Boolean)
  .map((lesson) => {
    if (!lesson || !Array.isArray(lesson.quiz)) return lesson;

    const validQuiz = [];
    const straySections = [];
    for (const item of lesson.quiz) {
      if (item && typeof item === "object" && Array.isArray(item.options)) {
        validQuiz.push(item);
      } else if (item && typeof item === "object" && typeof item.type === "string") {
        straySections.push(item);
      }
    }

    if (straySections.length === 0) return lesson;

    return {
      ...lesson,
      quiz: validQuiz,
      sections: [...(Array.isArray(lesson.sections) ? lesson.sections : []), ...straySections],
    };
  });

// Last step before writing: spread the correct answers evenly across option
// slots (see lib/lesson-quiz-balance.js for why). The assertion is the point -
// it fails the build if the reorder ever detached `correct` from the answer
// the author actually wrote.
const lessons = balanceLessonQuizzes(cleanedLessons);
assertBalancePreservedAnswers(cleanedLessons, lessons);

if (!Array.isArray(lessons) || lessons.length === 0) {
  throw new Error(`Expected a non-empty lessons array, got: ${typeof lessons}`);
}

const outDir = path.join(root, "lib/lessons-data");
mkdirSync(outDir, { recursive: true });
for (const existing of readdirSync(outDir)) {
  unlinkSync(path.join(outDir, existing));
}

const index = lessons.map((l) => ({
  id: l.id,
  slug: l.slug,
  title: l.title,
  subtitle: l.subtitle,
  duration: l.duration,
  difficulty: l.difficulty,
  track: l.track,
  isFundamental: l.isFundamental,
}));

writeFileSync(path.join(outDir, "_index.json"), JSON.stringify(index));

for (const lesson of lessons) {
  writeFileSync(path.join(outDir, `${lesson.slug}.json`), JSON.stringify(lesson));
}

console.log(`Generated ${lessons.length} lesson files + index in lib/lessons-data/`);
