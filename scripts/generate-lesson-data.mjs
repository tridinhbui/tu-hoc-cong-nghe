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
import { stripLessonDayPrefixes, assertDayPrefixStripPreservedTitles } from "../lib/lesson-day-prefix.js";
import { estimateReadingMinutes, estimateLessonMinutes, findCheckpointIndex } from "../lib/lesson-reading.js";

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
  // `@/...` là BÍ DANH TypeScript trỏ về gốc kho, không phải một gói npm - nên
  // nó phải được nạp như tệp cục bộ, y hệt specifier tương đối.
  //
  // Thiếu nhánh này thì `npm run build` chết ở bước sinh dữ liệu bài học với
  // "Cannot find module '@/lib/track-totals'", vì `nodeRequire` đi tìm một gói
  // tên `@/lib/track-totals` trong node_modules. Đã xảy ra thật, ngay khi
  // lib/track-stages.ts đổi từ hằng số gõ tay sang import số giờ từ
  // lib/track-totals.ts. Chú thích phía trên nói bare specifier là "gói npm và
  // builtin" - đúng lúc nó được viết, và bí danh đã phá vỡ giả định đó.
  const requireShim = (spec) => {
    // JSON không đi qua transpiler: `ts.transpileModule` nhận nó như mã nguồn
    // và trả về một module rỗng, nên bên gọi thấy `undefined` rồi vỡ ở lần
    // đọc thuộc tính đầu tiên - "Cannot read properties of undefined". Đọc và
    // parse thẳng.
    //
    // Có một vòng lặp phụ thuộc đáng biết ở đây: tệp JSON duy nhất đi qua
    // nhánh này là `lib/lessons-data/_track-totals.json`, và chính script này
    // sinh ra nó. Chạy trên một cây chưa từng build sẽ không có tệp - nên nếu
    // sau này ai gặp lỗi thiếu tệp ở đây, cách sửa là cho `lib/track-totals.ts`
    // chịu được tệp rỗng, chứ không phải bỏ nhánh này đi.
    const asLocal = spec.startsWith(".")
      ? path.join(dir, spec)
      : spec.startsWith("@/")
        ? path.join(root, spec.slice(2))
        : null;
    if (asLocal === null) return nodeRequire(spec);
    if (asLocal.endsWith(".json")) {
      // `import totals from "....json"` được biên dịch sang CommonJS thành
      // `require(...).default`, nên trả thẳng object đã parse sẽ cho ra
      // `undefined`. Gắn cả `default` lẫn các khoá ở cấp một để cả hai kiểu
      // import cùng chạy.
      // Vòng lặp phụ thuộc nói ở trên đã xảy ra thật: xoá bớt bài học làm một
      // lượt chạy dọn sạch outDir rồi hỏng giữa chừng, và từ đó mọi lượt sau
      // đều chết ở đây vì `_track-totals.json` không còn. Một cây checkout sạch
      // cũng vậy. Thiếu tệp thì nạp bằng object rỗng: giá trị đúng được chính
      // script này ghi đè ở cuối lượt chạy, nên nó chỉ cần đủ để đi qua bước
      // nạp module chứ không cần đúng.
      if (!existsSync(asLocal)) return { default: {} };
      const parsed = JSON.parse(readFileSync(asLocal, "utf8"));
      return { ...parsed, default: parsed };
    }
    return loadLocalModule(asLocal);
  };

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
const balancedLessons = balanceLessonQuizzes(cleanedLessons);
assertBalancePreservedAnswers(cleanedLessons, balancedLessons);

// Move the legacy "Tự học Tài chính Day N:" out of titles and into `day`
// (see lib/lesson-day-prefix.js) - the number is still needed to key
// RECALL_SCHEDULE, it just has no business being displayed as part of a title.
const strippedLessons = stripLessonDayPrefixes(balancedLessons);
assertDayPrefixStripPreservedTitles(balancedLessons, strippedLessons);

// Derive both word-count numbers here rather than per request: `duration` is
// a hand-written string ("10 phút") that drifts from the body it describes,
// and the checkpoint position has to agree with the reading estimate because
// both come from the same word count.
// Which track a lesson actually belongs to, resolved once here instead of
// re-derived by every consumer. Only 257 of 570 lessons carry an explicit
// `track`; the rest are decided by which stage's day range covers their id,
// exactly as the dashboard decides it (lib/track-stages.ts).
//
// Written as a separate field rather than filled into `track`, because
// lib/lesson-labels.ts branches on `track === "bonus"` being present-or-absent
// and would change behaviour if the blanks were filled in.
const { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } = loadLocalModule(
  path.join(root, "lib/track-stages.ts")
);

function resolveTrack(lesson) {
  if (lesson.track) return lesson.track;
  if (TRACK_PERSONAL.stages.some((stage) => isLessonInRange(lesson.id, stage))) return "personal";
  if (TRACK_PROFESSIONAL.stages.some((stage) => isLessonInRange(lesson.id, stage))) return "professional";
  return "bonus";
}

const lessons = strippedLessons.map((lesson) => ({
  ...lesson,
  resolvedTrack: resolveTrack(lesson),
  readingMinutes: estimateReadingMinutes(lesson),
  totalMinutes: estimateLessonMinutes(lesson),
  checkpointIndex: findCheckpointIndex(lesson.sections),
}));

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
  // Whole-lesson time estimate, shown on dashboard cards so the time cost
  // is visible before someone commits to opening a lesson.
  totalMinutes: l.totalMinutes,
  difficulty: l.difficulty,
  track: l.track,
  resolvedTrack: l.resolvedTrack,
  isFundamental: l.isFundamental,
  // Carried into the slim index because lib/lesson-labels.ts reads it to key
  // RECALL_SCHEDULE, and the dashboard only ever loads the index.
  day: l.day,
}));

writeFileSync(path.join(outDir, "_index.json"), JSON.stringify(index));

/* ── Tổng số bài và tổng thời lượng, theo chặng ──────────────────────────
 *
 * VÌ SAO SINH RA CHỨ KHÔNG GÕ TAY. `estimatedHours` của ba chặng trước đây là
 * hằng số viết trong lib/tracks.ts và lib/track-stages.ts, và cả ba đều đã
 * lệch khỏi thực tế: cá nhân khai 10 giờ trong khi 220 bài của nó cộng lại là
 * 21,9 giờ; chuyên nghiệp khai 18 trong khi thật là 48,8; bonus khai 27 trong
 * khi thật là 12,3 - tức là khai VỐNG hơn gấp đôi.
 *
 * Không phải ai nói dối: con số được gõ một lần lúc chặng còn vài chục bài,
 * rồi kho bài đi tiếp còn con số thì đứng yên. Đây đúng là lỗi mà chú thích
 * đầu components/CfaTrackView.tsx đã ghi cho banner flashcard ("500+ thuật
 * ngữ" khi bộ thẻ có 75), chỉ khác chỗ xảy ra.
 *
 * Đọc từ nguồn thì nó không lệch được nữa. File này nhỏ (ba dòng số) nên nhập
 * thẳng vào bundle phía trình duyệt cũng không tốn gì - khác với _index.json
 * 814 mục.
 *
 * `totalMinutes` là thời lượng CẢ BÀI (đọc + tương tác + quiz), cùng trường mà
 * thẻ bài học trên dashboard đang hiện. Bài thiếu trường này được đếm riêng để
 * con số giờ không lặng lẽ hụt đi. */
const trackTotals = {};
let lessonsWithoutMinutes = 0;
for (const l of lessons) {
  if (l.isVisible === false) continue;
  const track = l.resolvedTrack ?? l.track ?? "unknown";
  const entry = (trackTotals[track] ??= { lessons: 0, minutes: 0, missingMinutes: 0 });
  entry.lessons++;
  if (typeof l.totalMinutes === "number") entry.minutes += l.totalMinutes;
  else {
    entry.missingMinutes++;
    lessonsWithoutMinutes++;
  }
}

/* Lớp ánh xạ CFA đã được gỡ cùng lib/cfa-track.ts: nó gom bài của ba chặng
 * trên theo mười môn CFA, và cả mười môn lẫn hai route /cfa, /frm đều không
 * còn. Khoá `cfa` vẫn được ghi ra với số 0 chứ không bỏ hẳn, vì
 * lib/track-totals.ts khai nó trong `TrackTotalsId` và `trackHours("cfa")` vẫn
 * gọi được - trả 0 giờ thì đúng, còn thiếu khoá thì đọc ra `undefined`. */
const minutesById = new Map(
  lessons.filter((l) => l.isVisible !== false).map((l) => [l.id, l.totalMinutes ?? 0])
);
const cfaLessons = 0;
const cfaMinutes = 0;

writeFileSync(
  path.join(outDir, "_track-totals.json"),
  JSON.stringify({
    tracks: {
      ...trackTotals,
      cfa: { lessons: cfaLessons, minutes: cfaMinutes, missingMinutes: 0 },
    },
    // Tổng KHÔNG cộng cfa vào: những bài ấy đã nằm trong ba chặng trên rồi.
    totalLessons: Object.values(trackTotals).reduce((n, e) => n + e.lessons, 0),
    totalMinutes: Object.values(trackTotals).reduce((n, e) => n + e.minutes, 0),
  })
);

if (lessonsWithoutMinutes > 0) {
  console.warn(
    `⚠ ${lessonsWithoutMinutes} bài không có totalMinutes - số giờ của chặng chứa chúng đang thấp hơn thực tế.`
  );
}

for (const lesson of lessons) {
  writeFileSync(path.join(outDir, `${lesson.slug}.json`), JSON.stringify(lesson));
}

console.log(`Generated ${lessons.length} lesson files + index in lib/lessons-data/`);
