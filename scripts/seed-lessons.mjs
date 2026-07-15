import ts from "typescript";
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { applyLessonOverrides } from "../lib/lesson-quiz-overrides.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let supabaseUrl = "";
let supabaseKey = "";

try {
  const envFile = readFileSync(path.join(root, ".env.local"), "utf8");
  supabaseUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/)?.[1]?.trim() || "";
  supabaseKey = envFile.match(/SUPABASE_SERVICE_ROLE_KEY\s*=\s*(.*)/)?.[1]?.trim() || "";
} catch (e) {
  console.error("Error reading .env.local:", e.message);
  process.exit(1);
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.log("Please make sure your .env.local has your OWN credentials:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=...");
  console.log("SUPABASE_SERVICE_ROLE_KEY=...");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Reading lessons from lib/lessons.ts...");
const source = readFileSync(path.join(root, "lib/lessons.ts"), "utf8");
const stripped = source
  .replace(/^import "server-only";\n/m, "")
  .replace(/^import type \{ Lesson \} from ".\/lesson-types";\n/m, "")
  .replace(/^export type \{[^}]*\} from ".\/lesson-types";\n/m, "");

const { outputText } = ts.transpileModule(stripped, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

const moduleObj = { exports: {} };
new Function("exports", "module", outputText)(moduleObj.exports, moduleObj);
const lessons = applyLessonOverrides(moduleObj.exports.lessons);

console.log(`Loaded ${lessons.length} lessons from code. Syncing to Database...`);

const lessonData = lessons.map((lesson) => ({
  id: lesson.id,
  slug: lesson.slug,
  title: lesson.title,
  subtitle: lesson.subtitle,
  duration: lesson.duration,
  difficulty: lesson.difficulty,
  emoji: lesson.emoji,
  opening_question: lesson.openingQuestion,
  opening_options: lesson.openingOptions,
  correct_option: lesson.correctOption,
  explanation: lesson.explanation,
  key_takeaways: lesson.keyTakeaways,
  track: lesson.track || "professional",
  status: "published",
  stage_number: Math.ceil(lesson.id / 20),
  day_number: lesson.id,
}));

const chunkSize = 50;
for (let i = 0; i < lessonData.length; i += chunkSize) {
  const chunk = lessonData.slice(i, i + chunkSize);
  const { error } = await supabase.from("lessons").upsert(chunk, { onConflict: "id" });
  if (error) {
    console.error(`\nError syncing chunk ${i} to ${i + chunk.length}:`, error);
    process.exit(1);
  }
  process.stdout.write(`Synced lessons ${i + 1} to ${Math.min(i + chunkSize, lessonData.length)}...\r`);
}

console.log("\nDatabase seed completed successfully!");
