#!/usr/bin/env node
// Reports UI files that still contain hard-coded Vietnamese, so the migration
// to lib/i18n has a number to drive down instead of a vibe.
//
//   node scripts/i18n-scan.mjs            # ranked summary
//   node scripts/i18n-scan.mjs <path>     # every string in one file
//
// Only scans UI (components/, app/). lib/lessons-data is lesson *content*,
// which is deliberately Vietnamese-only - see lib/i18n/dictionaries/vi.ts.

import { readFileSync, statSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join, extname } from "node:path";

const VIETNAMESE =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

const ROOTS = ["components", "app"];
const SKIP_DIRS = new Set(["node_modules", ".next", "lessons-data"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".tsx", ".ts"].includes(extname(full))) out.push(full);
  }
  return out;
}

// Quoted literals and bare JSX text. Import paths and className values are the
// main false positives; those rarely contain Vietnamese diacritics, so the
// diacritic test filters them out on its own.
const PATTERNS = [/"([^"\n]{2,})"/g, /'([^'\n]{2,})'/g, />([^<>{}\n]{2,})</g];

function stringsIn(src) {
  const found = [];
  for (const re of PATTERNS) {
    for (const m of src.matchAll(re)) {
      const text = m[1].trim();
      if (text && VIETNAMESE.test(text)) found.push(text);
    }
  }
  return found;
}

const target = process.argv[2];

if (target) {
  const hits = stringsIn(readFileSync(target, "utf8"));
  console.log(`${target} - ${hits.length} chuỗi\n`);
  for (const h of [...new Set(hits)].sort()) console.log(`  ${h}`);
  process.exit(0);
}

const rows = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const count = stringsIn(readFileSync(file, "utf8")).length;
    if (count) rows.push({ file, count });
  }
}
rows.sort((a, b) => b.count - a.count);

const total = rows.reduce((s, r) => s + r.count, 0);
console.log(`Còn ${total} chuỗi tiếng Việt trong ${rows.length} file giao diện\n`);
console.log("Nặng nhất:");
for (const { file, count } of rows.slice(0, 20)) {
  console.log(`  ${String(count).padStart(4)}  ${file}`);
}
console.log(`\nChi tiết một file:  node scripts/i18n-scan.mjs ${rows[0]?.file ?? "<path>"}`);
