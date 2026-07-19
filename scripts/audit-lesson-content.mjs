// Content QA audit: scans every generated lesson JSON (lib/lessons-data/*.json)
// against the minimum-quality bar from the content-upgrade plan and prints a
// report of which lessons fail which check, grouped by track so personal/
// professional lessons (the main learning path) can be prioritized over bonus.
//
// Run with: node scripts/audit-lesson-content.mjs
// Re-run after lib/lessons.ts changes + `node scripts/generate-lesson-data.mjs`.

import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "lib/lessons-data");

const MIN_QUIZ_COUNT = 2;
const MIN_EXPLANATION_LEN = 150;

function isPersonalOrProfessionalTrack(lesson) {
  // Mirrors lib/track-stages.ts's day ranges: personal = 1-20, 201-288;
  // professional = 21-200, 1036. Anything else (including explicit
  // track: "bonus") is treated as bonus for prioritization purposes.
  const id = lesson.id;
  if ((id >= 1 && id <= 20) || (id >= 201 && id <= 288)) return "personal";
  if ((id >= 21 && id <= 200) || id === 1036) return "professional";
  return "bonus";
}

function auditLesson(lesson) {
  const issues = [];
  if ((lesson.quiz ?? []).length < MIN_QUIZ_COUNT) {
    issues.push(`quiz count ${lesson.quiz?.length ?? 0} < ${MIN_QUIZ_COUNT}`);
  }
  if ((lesson.explanation ?? "").length < MIN_EXPLANATION_LEN) {
    issues.push(`explanation length ${lesson.explanation?.length ?? 0} < ${MIN_EXPLANATION_LEN}`);
  }
  const hasDiagram = (lesson.diagram ?? []).length > 0;
  const hasInteractive = lesson.interactiveType && lesson.interactiveType !== "none";
  if (!hasDiagram && !hasInteractive) {
    issues.push("no diagram and no interactiveType");
  }
  if (!lesson.openingQuestion || (lesson.openingOptions ?? []).length === 0) {
    issues.push("missing openingQuestion/openingOptions");
  }
  return issues;
}

const files = readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "_index.json");

const results = { personal: [], professional: [], bonus: [] };

for (const file of files) {
  const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  const issues = auditLesson(lesson);
  if (issues.length === 0) continue;
  const track = isPersonalOrProfessionalTrack(lesson);
  results[track].push({ id: lesson.id, slug: lesson.slug, title: lesson.title, issues });
}

for (const track of ["personal", "professional", "bonus"]) {
  const rows = results[track].sort((a, b) => a.id - b.id);
  console.log(`\n=== ${track.toUpperCase()} (${rows.length} lessons failing) ===`);
  for (const row of rows) {
    console.log(`  [${row.id}] ${row.slug} - ${row.issues.join("; ")}`);
  }
}

const total = results.personal.length + results.professional.length + results.bonus.length;
console.log(`\nTotal lessons checked: ${files.length}`);
console.log(`Total failing at least one check: ${total}`);
