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
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { applyLessonOverrides } from "../lib/lesson-quiz-overrides.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = readFileSync(path.join(root, "lib/lessons.ts"), "utf8");

// Strip the two lines that only matter to the TS module system (server-only
// guard + type re-exports) - we only need the runtime `lessons` array here.
const stripped = source
  .split(/\r?\n/)
  .filter((line) => !line.includes('from "./lesson-types"') && line !== 'import "server-only";')
  .join("\n");

let { outputText } = ts.transpileModule(stripped, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

outputText = outputText.replace("exports. = exports.lessons = void 0;", "exports.lessons = void 0;");

const moduleObj = { exports: {} };
new Function("exports", "module", outputText)(moduleObj.exports, moduleObj);
const lessons = applyLessonOverrides(moduleObj.exports.lessons);

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
