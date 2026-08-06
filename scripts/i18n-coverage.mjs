#!/usr/bin/env node
// Language-agnostic i18n coverage check: finds display strings that are
// hard-coded instead of coming from the dictionary.
//
//   node scripts/i18n-coverage.mjs                 # summary by category
//   node scripts/i18n-coverage.mjs <path>          # every finding in one file
//   node scripts/i18n-coverage.mjs --json          # machine-readable
//
// WHY THIS EXISTS ALONGSIDE i18n-scan.mjs.
//
// i18n-scan.mjs asks "does this string look Vietnamese?" by testing for
// diacritics. That question cannot answer "is anything left", because plenty of
// Vietnamese display text carries no diacritics ("Xong", "Tham gia group
// Facebook") and plenty of hard-coded UI is already English ("Hot", "Game
// Kingdom RPG"). Both render untranslated to an English reader and both are
// invisible to a diacritic test. That scanner also had two opposite blind spots
// found by hand in one sitting: it counted strings inside comments (work that
// does not exist) and skipped JSX text wrapped across lines (work that does). A
// detector whose recall depends on source punctuation cannot support a claim of
// "nothing missed".
//
// So this check ignores the language and looks at the POSITION: a literal string
// sitting somewhere a user reads it. Those positions are enumerable, and a bare
// string in one of them is untranslated by construction.
//
// PARSED, NOT PATTERN-MATCHED. The first version of this file used a regex for
// JSX text (`>([^<>]+?)<`) and it was worthless: `>` and `<` appear throughout
// TypeScript in generics and comparisons, so it reported `useState<Theme>` and
// whole function bodies as display copy. Every "finding" in the three files that
// were actually finished was that bug. The TypeScript compiler is already a
// dependency, so this walks a real syntax tree instead - JsxText nodes and
// string-literal JSX attributes are exact, with no guessing about punctuation.

import { readFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const ROOTS = ["components", "app"];
const SKIP_DIRS = new Set(["node_modules", ".next", "lessons-data", "lessons-i18n"]);

/** JSX attributes whose string value is rendered or read out to the user. */
const DISPLAY_ATTRS = new Set([
  "title",
  "placeholder",
  "alt",
  "aria-label",
  "aria-description",
  "aria-placeholder",
  "label",
  "subtitle",
  "description",
  "heading",
  "caption",
  "emptyText",
  "confirmLabel",
  "cancelLabel",
  "bossName",
  "userName",
]);

/**
 * Object keys in module-scope data whose values are never copy: ids, routes,
 * assets, styling, and enum/discriminator fields. Everything NOT listed here is
 * reported, so a new copy-bearing field cannot hide by being unfamiliar.
 */
const NON_COPY_FIELDS = new Set([
  "id",
  "key",
  "slug",
  "value",
  "href",
  "url",
  "src",
  "image",
  "img",
  "icon",
  "emoji",
  "color",
  "accent",
  "bg",
  "className",
  "class",
  "style",
  "type",
  "kind",
  "variant",
  "category",
  "domain",
  "domain_type",
  "ticker",
  "symbol",
  "path",
  "route",
  "event",
  "eventName",
  "track",
  "locale",
  "format",
  "unit",
  "storageKey",
  "assetKey",
  "correct",
  "answer",
]);

/** Call expressions whose string arguments are shown to the user. */
const DISPLAY_CALLS = new Set([
  "toast",
  "toast.success",
  "toast.error",
  "toast.message",
  "toast.info",
  "toast.warning",
  "alert",
  "confirm",
]);

/**
 * Strings that sit in a display position but are not copy.
 *
 * Each entry is a shape rather than a specific value, so this cannot become a
 * place to bury real findings.
 */
function isNotCopy(text) {
  const t = text.trim();
  if (t.length < 2) return true;
  // No letters at all: "%", "→", "/1000", "72", "1.0x".
  if (!/[a-zà-ỹ]/i.test(t)) return true;
  // A single all-lowercase token: an identifier, a CSS value, an icon name.
  // Vietnamese words are excluded from this shortcut since "bài", "xong" are
  // real copy - but an undotted single token like "vi" is not worth reporting.
  if (!/\s/.test(t) && t === t.toLowerCase() && !/[à-ỹ]/i.test(t)) return true;

  // A single camelCase or snake_case token with no diacritics: a metric key, a
  // state value, a data field. These reach the jsx-expr rule through equality
  // checks like `item.name === "lessonsCompleted"`, which sit inside a JSX
  // expression but compare an identifier rather than render a word.
  if (!/\s/.test(t) && !/[à-ỹ]/i.test(t) && /^[a-z][A-Za-z0-9_]*$/.test(t)) return true;

  // Tailwind class lists. These reach the jsx-expr rule because component data
  // is often written as tuples of [label, value, className] and the className
  // is a sibling string literal in the same expression. Every token has to look
  // like a utility class - a hyphen, slash or colon, no capitals, no
  // diacritics - so a real sentence can never satisfy it.
  // Bare utility keywords carry no hyphen, slash or colon, so the shape test
  // below would reject a list like "absolute -top-1 left-1/2" on its first
  // token. Listed rather than inferred: the point is to name the exceptions, not
  // to loosen the test into something a sentence could satisfy.
  const BARE_UTILITIES = new Set([
    // "border" alone is the 1px default; it appears in almost every input class
    // string in this repo, and without it one bare token failed the shape test
    // and reported a whole Tailwind list as prose.
    "border",
    "absolute",
    "relative",
    "fixed",
    "sticky",
    "static",
    "flex",
    "grid",
    "block",
    "inline",
    "hidden",
    "contents",
    "truncate",
    "italic",
    "underline",
    "uppercase",
    "lowercase",
    "capitalize",
  ]);
  const tokens = t.split(/\s+/);
  if (
    tokens.length > 1 &&
    tokens.every(
      (tok) =>
        BARE_UTILITIES.has(tok) ||
        // `_` appears in arbitrary values, where Tailwind uses it for the space
        // a CSS value needs: shadow-[0_0_20px_rgba(16,185,129,0.3)]. Without it
        // that token fails the shape test and the whole class list reads as prose.
        (/^[a-z0-9[\]().,#%/:_-]+$/.test(tok) && /[-/:]/.test(tok))
    )
  ) {
    return true;
  }

  return false;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".tsx", ".ts"].includes(path.extname(full))) out.push(full);
  }
  return out;
}

/** Text spans a file marked out of scope, in the same syntax i18n-scan.mjs uses. */
function ignoredRanges(src) {
  const ranges = [];
  const re = /\/\*\s*i18n-ignore-start:[\s\S]*?i18n-ignore-end\s*\*\//g;
  for (const m of src.matchAll(re)) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}

function calleeName(expr) {
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) {
    const left = calleeName(expr.expression);
    return left ? `${left}.${expr.name.text}` : expr.name.text;
  }
  return "";
}

function findingsIn(src, fileName) {
  const source = ts.createSourceFile(
    fileName,
    src,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const skip = ignoredRanges(src);
  const isIgnored = (pos) => skip.some(([a, b]) => pos >= a && pos < b);

  const found = [];
  // Counted, not just skipped. An i18n-ignore block is a claim that a string is
  // not copy, and a claim nobody can see is indistinguishable from the work
  // being done - the total would simply drop. i18n-scan.mjs has always reported
  // this; this script only claimed to.
  let excluded = 0;
  const push = (kind, text, pos) => {
    const clean = String(text).replace(/\s+/g, " ").trim();
    if (isNotCopy(clean)) return;
    if (isIgnored(pos)) {
      excluded += 1;
      return;
    }
    found.push({ kind, text: clean, line: source.getLineAndCharacterOfPosition(pos).line + 1 });
  };

  const visit = (node) => {
    // Literal text between JSX tags. This is the exact node kind, so a
    // multi-line paragraph is one finding and a generic type argument is none.
    if (ts.isJsxText(node)) {
      if (node.text.trim()) push("jsx-text", node.text, node.getStart(source));
    }

    // <Foo title="..." /> and the string form <Foo label={"..."} />
    if (ts.isJsxAttribute(node) && node.name) {
      const attr = node.name.getText(source);
      if (DISPLAY_ATTRS.has(attr) && node.initializer) {
        const init = node.initializer;
        if (ts.isStringLiteral(init)) push(`attr:${attr}`, init.text, init.getStart(source));
        else if (
          ts.isJsxExpression(init) &&
          init.expression &&
          ts.isStringLiteral(init.expression)
        ) {
          push(`attr:${attr}`, init.expression.text, init.expression.getStart(source));
        }
      }
    }

    // toast.error("..."), alert("...")
    //
    // Template literals count too. This started as string literals only, and
    // components/FloatingStudyGroupChat.tsx showed why that is not enough: its
    // match toast was written as `Bạn vừa được ghép vào nhóm học mới:
    // ${topicLabel(...)}!` and was invisible, while the very same file's
    // plain-string toasts were all reported. Any toast that interpolates a value
    // - which is most of the interesting ones - would slip through.
    if (ts.isCallExpression(node) && DISPLAY_CALLS.has(calleeName(node.expression))) {
      for (const arg of node.arguments) {
        if (ts.isStringLiteral(arg)) push("call", arg.text, arg.getStart(source));
        else if (ts.isNoSubstitutionTemplateLiteral(arg)) {
          push("call", arg.text, arg.getStart(source));
        } else if (ts.isTemplateExpression(arg)) {
          // Report the literal chunks around the ${...} holes; the holes
          // themselves are values, not copy.
          const chunks = [arg.head.text, ...arg.templateSpans.map((sp) => sp.literal.text)];
          const text = chunks.join(" ").trim();
          if (text) push("call", text, arg.getStart(source));
        }
      }
    }

    // Strings inside a module-scope array or object literal.
    //
    // This is the blind spot AGENTS.md warned about, and it was found by hand
    // five separate times before being closed: KINGDOM_BUILDINGS, TONE_STYLE,
    // SKILL_TREE, ScrollytellingPinnedSection's PANELS, and four lib/*.ts data
    // modules all held Vietnamese prose that never appeared in this report,
    // because the strings sit in a `const` at the top of the file rather than in
    // a display position. A component reading such a table renders every one of
    // them, so they are exactly as user-facing as JSX text - and the closer the
    // total gets to zero, the more a floor that misses them reads as a lie.
    //
    // Scope is deliberately narrow: only a top-level `const`, only properties
    // whose name is not a known non-copy field, and every existing shape filter
    // still applies. That keeps ids, routes, Tailwind classes and enum values out.
    if (ts.isVariableStatement(node) && node.parent === source) {
      for (const decl of node.declarationList.declarations) {
        if (!decl.initializer) continue;
        const walkData = (n, field) => {
          // A module specifier is not copy. `const TABS = [{ Comp: dynamic(() =>
          // import("@/components/X")) }]` put an import path in a data table and
          // the first version of this rule reported it, which is the kind of
          // noise that teaches people to wrap real findings in i18n-ignore.
          if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) return;
          // Nor is anything inside a function body: a component or callback
          // living in a data table is code, and its own strings are already
          // covered by the JSX and call rules.
          if (ts.isArrowFunction(n) || ts.isFunctionExpression(n)) return;
          if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
            if (field && NON_COPY_FIELDS.has(field)) return;
            // A BARE array element - no property name to judge it by - has to
            // look like prose: whitespace or a diacritic. `const QUIZ_OPTION_TYPES
            // = ["Analytical", "Compliance", ...] as const` is a union type, never
            // rendered, and reporting it is the noise that gets a gate ignored.
            // Copy in a bare array is a sentence; an enum member is one word.
            if (!field && !/\s/.test(n.text) && !/[à-ỹ]/i.test(n.text)) return;
            push("data", n.text, n.getStart(source));
            return;
          }
          if (ts.isPropertyAssignment(n)) {
            const name = ts.isIdentifier(n.name) || ts.isStringLiteral(n.name) ? n.name.text : "";
            walkData(n.initializer, name);
            return;
          }
          n.forEachChild((c) => walkData(c, field));
        };
        walkData(decl.initializer, "");
      }
    }

    // String literals inside a {…} container in JSX children.
    //
    // The third blind spot found in this check - and the one that mattered most,
    // because components/JobSearchClient.tsx reported zero while still
    // rendering paragraphs of Vietnamese from ternaries like
    // `{step === 0 ? "Học hỏi quy trình…" : "Làm chủ nghiệp vụ…"}`. Those are
    // not JsxText and not attributes, so neither earlier rule saw them, yet
    // they are exactly as visible on screen as a text node.
    //
    // Scoped to expression containers that are CHILDREN of a JSX element, so a
    // className computed by a ternary (an attribute) does not flood the report.
    if (ts.isJsxExpression(node) && node.parent && !ts.isJsxAttribute(node.parent)) {
      const seen = new Set();
      // A literal being COMPARED is a data value, not copy: `x === "OVERVALUED"`
      // renders nothing. Detected by syntactic position rather than by shape,
      // because shape cannot separate them - "OVERVALUED" and "HOT" are both a
      // single all-caps token, and "HOT" is a badge the user reads.
      const isComparisonOperand = (n) => {
        const p = n.parent;
        if (!p) return false;
        if (ts.isCaseClause(p)) return true;
        if (ts.isBinaryExpression(p)) {
          const op = p.operatorToken.kind;
          return (
            op === ts.SyntaxKind.EqualsEqualsEqualsToken ||
            op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
            op === ts.SyntaxKind.EqualsEqualsToken ||
            op === ts.SyntaxKind.ExclamationEqualsToken
          );
        }
        return false;
      };

      const collect = (n) => {
        if (ts.isStringLiteral(n) && !seen.has(n) && !isComparisonOperand(n)) {
          seen.add(n);
          push("jsx-expr", n.text, n.getStart(source));
        }
        // Do not descend into nested JSX: its own text and attributes are
        // reported by the rules above, and recursing would double-count.
        if (!ts.isJsxElement(n) && !ts.isJsxSelfClosingElement(n) && !ts.isJsxFragment(n)) {
          ts.forEachChild(n, collect);
        }
      };
      if (node.expression) collect(node.expression);
    }

    ts.forEachChild(node, visit);
  };
  visit(source);
  return { found, excluded };
}

function categorize(file) {
  if (file.startsWith("app/bai-hoc/")) return "lesson content (hand-authored pages)";
  if (file.startsWith("app/api/")) return "api routes";
  if (file.startsWith("app/admin/")) return "admin screens";
  if (file.startsWith("components/games/")) return "games";
  return "learner-facing UI";
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const target = args.find((a) => !a.startsWith("--"));

if (target) {
  const abs = path.join(root, target);
  const { found: findings, excluded } = findingsIn(readFileSync(abs, "utf8"), abs);
  if (asJson) {
    console.log(JSON.stringify(findings, null, 2));
  } else {
    const note = excluded ? `, ${excluded} excluded by i18n-ignore` : "";
    console.log(`${target} - ${findings.length} hard-coded display string(s)${note}\n`);
    for (const f of findings) console.log(`  ${String(f.line).padStart(5)}  [${f.kind}] ${f.text}`);
  }
  process.exit(0);
}

const rows = [];
let totalExcluded = 0;
for (const dir of ROOTS) {
  for (const file of walk(path.join(root, dir))) {
    const rel = path.relative(root, file);
    const { found, excluded } = findingsIn(readFileSync(file, "utf8"), file);
    totalExcluded += excluded;
    if (found.length) rows.push({ file: rel, count: found.length, category: categorize(rel) });
  }
}
rows.sort((a, b) => b.count - a.count);

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

const total = rows.reduce((s, r) => s + r.count, 0);
console.log(`${total} hard-coded display strings in ${rows.length} files`);
if (totalExcluded) {
  console.log(`${totalExcluded} more excluded by i18n-ignore (each carries its reason)`);
}
console.log(`(parsed, language-agnostic: counts English and undotted Vietnamese too)\n`);

const byCategory = new Map();
for (const row of rows) {
  const prev = byCategory.get(row.category) ?? { count: 0, files: 0 };
  byCategory.set(row.category, { count: prev.count + row.count, files: prev.files + 1 });
}
console.log("By category:");
for (const [category, { count, files }] of [...byCategory].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${String(count).padStart(5)}  ${category}  (${files} files)`);
}

const learner = rows.filter((r) => r.category === "learner-facing UI");
console.log("\nHeaviest learner-facing UI:");
for (const { file, count } of learner.slice(0, 15)) {
  console.log(`  ${String(count).padStart(4)}  ${file}`);
}
console.log(`\nPer-file detail:  node scripts/i18n-coverage.mjs ${learner[0]?.file ?? "<path>"}`);
