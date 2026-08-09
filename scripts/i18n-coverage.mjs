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

import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// `lib` was missing here until it was measured, and the omission was the whole
// reason this number looked nearly finished while the app still rendered
// Vietnamese on every screen. The `data` rule below exists to catch copy sitting
// in a module-scope `const` rather than in a display position - and that is
// exactly the kind of file that lives in `lib`, not in `components`. The
// project-wide run reported 501 strings; `lib` alone holds 3,226 the run had
// never once counted. Passing a path explicitly always worked, which is why the
// gap survived: every time someone checked a specific file the tool was right.
const ROOTS = ["components", "app", "lib"];
const SKIP_DIRS = new Set(["node_modules", ".next", "lessons-data", "__tests__"]);

/** Mọi thư mục lớp phủ dịch, khớp theo MẪU chứ không theo danh sách tên.
 *
 *  `lessons-i18n` từng được liệt kê thẳng trong SKIP_DIRS, và điều đó đúng cho
 *  tới khi có bộ thứ hai. `finance-careers-i18n/en.ts` ra đời và bị đếm là
 *  1.195 chuỗi "chưa dịch" - đứng thứ hai toàn kho - trong khi nó CHÍNH LÀ bản
 *  dịch. Tổng số đi từ 5.951 lên 6.985 sau một lượt dịch xong 44 nghề.
 *
 *  Một thước đo tăng lên khi người ta làm đúng việc thì tệ hơn là không có
 *  thước đo: nó dạy người đọc rằng con số không có nghĩa. Và lỗi này sẽ lặp
 *  lại ở mọi bộ sau (`cfa-glossary-i18n`, và cái kế tiếp), nên chữa bằng cách
 *  thêm tên thứ ba vào danh sách là chữa nhầm chỗ.
 *
 *  Quy ước đặt tên `<gì đó>-i18n/` giờ là hợp đồng: thư mục nào tên như vậy
 *  thì nội dung bên trong là bản dịch, không phải chuỗi cần dịch. */
const IS_TRANSLATION_DIR = (name) => name.endsWith("-i18n");

// Two shapes under `lib` that a dictionary cannot fix, separated so the headline
// stays a number someone can drive to zero.
//
// This is NOT a suppression list. Both groups are reported, on their own lines,
// with the pipeline that owns them named - because a count that quietly drops
// work is indistinguishable from work that got done.

/** The dictionary itself. Reporting `vi.ts` as hard-coded is a category error:
 *  those literals are the translation, not a failure to translate. */
const IS_DICTIONARY = (rel) => rel.startsWith("lib/i18n/dictionaries/");

/** Teaching and question content. Translated one lesson at a time into
 *  `lib/lessons-i18n/<locale>/`, audited by `npm run audit:lessons:en`, and
 *  tracked as "N of 723 lessons" - a different unit of work from a dictionary
 *  key, on a different pipeline, so mixing it into the same total buries the
 *  part that a UI translation pass can actually finish. `lessons.ts` alone is
 *  31,167 strings; left in, it is the only number anyone would ever see. */
const IS_LESSON_CONTENT = (rel) =>
  /^lib\/(lessons|.*-lessons|ib-question-bank|ib-question-overrides|cfa-item-sets|level-exams|career-question-bank|recall-schedule)\.ts$/.test(
    rel
  );

/** Tệp dữ liệu đã có lớp phủ dịch riêng, phát hiện bằng cách nhìn xem có thư
 *  mục `<tên>-i18n/` nằm cạnh nó không - không phải bằng một danh sách viết tay.
 *
 *  VÌ SAO CẦN. `lib/finance-careers.ts` là 1.239 chuỗi tiếng Việt, và sau khi
 *  dịch xong đủ 44/44 nghề sang `lib/finance-careers-i18n/` thì nó VẪN bị đếm
 *  đủ 1.239 - đứng đầu bảng "nặng nhất". Con số ấy nói rằng chưa ai động vào,
 *  trong khi việc đã xong và có cổng giữ.
 *
 *  Đây cùng một lỗi phân loại với việc đếm `vi.ts` là chuỗi chưa dịch: những
 *  literal đó là NGUỒN của một quy trình dịch, không phải chỗ hỏng. Nên chúng
 *  được tách ra và in riêng kèm tên quy trình sở hữu, đúng cách nội dung bài
 *  học đang được xử lý - báo cáo, chứ không giấu đi.
 *
 *  Cặp tệp/thư mục nhận ra nhau qua tên: `lib/x.ts` với `lib/x-i18n/`. Quy ước
 *  ấy giờ là hợp đồng, và IS_TRANSLATION_DIR ở trên dựa vào đúng nó.
 *
 *  TÁCH RA LÀ MỘT LỜI KHẲNG ĐỊNH ĐÃ XONG, nên chỉ đặt tên thư mục theo tệp
 *  SAU KHI cổng đi kèm bắt buộc đủ 100%. `lib/finance-careers.ts` đủ điều kiện:
 *  44/44 nghề, và career-translations.test.ts đỏ nếu thêm nghề mà quên dịch.
 *
 *  `lib/cfa-glossary-terms.ts` thì KHÔNG, và nó vẫn nằm trong tổng - đúng, vì
 *  mới dịch 10/118. Nhưng hôm nay nó thoát khỏi luật này vì lý do sai: thư mục
 *  của nó tên `cfa-glossary-i18n` chứ không phải `cfa-glossary-terms-i18n`, do
 *  nó phục vụ CẢ `frm-glossary-terms.ts`. Đừng đổi tên thư mục cho "khớp quy
 *  ước" trước khi cổng đủ-100% có mặt: làm thế là giấu 108 thuật ngữ chưa dịch
 *  sau một dòng chữ nói rằng chúng đã xong. */
const HAS_OVERLAY = (rel) => {
  const m = /^lib\/([^/]+)\.ts$/.exec(rel);
  return m ? existsSync(path.join(root, "lib", `${m[1]}-i18n`)) : false;
};

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
  // Spreadsheet-model plumbing: a cell address, the key a label is looked up
  // by, and the axis a sensitivity table pivots on. lib/valuation-model-sim.ts
  // holds ~100 of these and every one of them was reported as prose.
  "labelKey",
  // A spreadsheet formula is not prose in any language: "=MEDIAN(B4:B7)" reads
  // the same to every reader, and translating a function name would break it.
  "formula",
  "ref",
  "refs",
  "outputRef",
  "rowRef",
  "colRef",
  "columns",
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

  // A single ALL-CAPS token with no diacritics: một từ viết tắt, không phải câu
  // chữ. "CFA" và "FRM" là tên chứng chỉ - dịch chúng là gọi tên một bằng cấp
  // không tồn tại, đúng lý do certPages.frmTitle nằm trong
  // INTENTIONALLY_UNTRANSLATED của dictionary-parity.
  if (!/\s/.test(t) && !/[à-ỹ]/i.test(t) && /^[A-Z][A-Z0-9&.]*$/.test(t)) return true;

  // Một hashtag: "#CashFlow", "#QuyTac503020". Không phải câu chữ mà là thứ có
  // chức năng - AGENTS.md ghi rằng getPostCategory phân loại bài viết bằng cách
  // tìm đúng hashtag trong nội dung đã lưu và so bằng ===, nên dịch nó là làm
  // mất phân loại của mọi bài viết cũ.
  if (/^#[\p{L}\p{N}_]+$/u.test(t)) return true;

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
    // "shadow", "rounded", "grow" và "shrink" cũng là utility trần. Chúng lọt
    // qua vì rule Tailwind đòi MỌI token có gạch/gạch chéo/hai chấm, nên một
    // chuỗi class trả về từ hàm - "… text-white font-black shadow" trong
    // components/Leaderboard.tsx - bị báo là câu văn chỉ vì token cuối.
    "shadow",
    "rounded",
    "grow",
    "shrink",
    "isolate",
    "invisible",
    "collapse",
    "italic",
    "underline",
    "uppercase",
    "lowercase",
    "capitalize",
  ]);
  // CSS values built with a template literal. These only became reachable once
  // the jsx-expr rule started reporting template literals: a transform string
  // like `translate(-50%, -50%) rotateY(${angle}deg)` is assigned to a const
  // inside a map callback, which sits inside a JSX expression container.
  //
  // Named rather than inferred, same reason as BARE_UTILITIES below: a shape
  // test loose enough to catch "any CSS-looking value" is loose enough to
  // swallow a sentence. A function name followed by "(" cannot be UI copy.
  if (
    /\b(translate[XYZ]?|translate3d|rotate[XYZ]?|scale[XY]?|skew[XY]?|perspective|matrix3?d?|calc|var|url|blur|brightness|saturate|drop-shadow|(linear|radial|conic)-gradient|rgba?|hsla?|cubic-bezier)\s*\(/.test(
      t
    )
  ) {
    return true;
  }

  // Một con số kèm MÃ TIỀN TỆ: "240M USD", "45M USD". Đây là số liệu, và nó chỉ
  // lộ ra khi rule returned-data đọc tới bảng dữ liệu demo trong
  // components/GoldmanSachsWidget.tsx.
  //
  // CHỈ mã tiền tệ, KHÔNG gồm "tỷ"/"triệu"/"nghìn". Bản đầu của rule này gộp cả
  // hai và che mất 13 chuỗi trong các trang bài học - "100 tỷ", "600 triệu".
  // Khác nhau ở chỗ: USD đọc giống nhau ở mọi ngôn ngữ, còn "tỷ" sang tiếng Anh
  // phải thành "bn". Đơn vị tiếng Việt là chữ cần dịch, mã tiền tệ thì không.
  if (/^[\d.,]+\s*[KMB]?\s*(USD|VND|EUR|JPY|GBP|CNY)$/i.test(t)) return true;

  // Giá trị CSS không có lời gọi hàm: `${n}vmax ${n}vmax` cho maskSize trong
  // components/WarmLamps.tsx. Rule CSS ở trên đòi một tên hàm kèm "(", nên
  // chuỗi chỉ gồm đơn vị lọt qua. Mọi token phải là một đơn vị CSS - một câu
  // văn không thể thoả.
  const CSS_UNITS = new Set([
    "vmax", "vmin", "vh", "vw", "px", "rem", "em", "ch", "ex", "pt", "cm", "mm",
    "in", "deg", "rad", "turn", "fr", "s", "ms", "auto", "none", "cover", "contain",
  ]);
  if (t.split(/\s+/).every((tok) => CSS_UNITS.has(tok.replace(/[\d.,%-]/g, "")) || /^[\d.,%-]+$/.test(tok))) {
    return true;
  }

  // Khung định dạng không còn chữ nào để dịch sau khi bỏ dấu câu:
  // `${i}.  ${name}  —  ${xp} XP` trong components/lobby/RoomFixtures.tsx ghép
  // lại thành ". — XP". "XP" là đơn vị giữ nguyên ở mọi ngôn ngữ, phần còn lại
  // là dấu câu, nên ở đây không có việc gì để làm. Kiểm bằng cách bỏ token chỉ
  // gồm dấu câu rồi áp lại đúng các phép thử một-token ở trên.
  const worded = t.split(/\s+/).filter((tok) => /[a-zà-ỹ]/i.test(tok));
  if (
    worded.length > 0 &&
    worded.every((tok) => !/[à-ỹ]/i.test(tok) && /^[A-Z][A-Z0-9&.]*$/.test(tok))
  ) {
    return true;
  }

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
    if (SKIP_DIRS.has(entry) || IS_TRANSLATION_DIR(entry)) continue;
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

/**
 * Copy reachable from `node` through wrappers that don't change whether the
 * string is displayed.
 *
 * The three rules below all used to match only when the copy was the DIRECT
 * child node - a bare string literal. Wrapping it in a ternary was enough to
 * make it invisible, and that is not an exotic shape: it is how every
 * two-state label in this repo is written. components/StudyGroupsClient.tsx
 * reported 0 while holding 33 hard-coded strings, 15 of them
 * `toast.error(error instanceof Error ? error.message : "...")`.
 *
 * Recurses through CONDITIONALS and `||`/`??` only - never into a nested call.
 * `format(t.x, { name: "abc" })` passed to a toast should not report "abc":
 * that is an interpolated value, and the copy it goes into is already in the
 * dictionary. Narrow on purpose; a noisy gate is a gate people learn to ignore.
 */
function collectDisplayStrings(node, out) {
  if (!node) return;
  if (ts.isParenthesizedExpression(node)) return collectDisplayStrings(node.expression, out);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    out.push({ text: node.text, pos: node.getStart() });
    return;
  }
  if (ts.isTemplateExpression(node)) {
    // The literal chunks around the ${...} holes; the holes are values.
    const chunks = [node.head.text, ...node.templateSpans.map((sp) => sp.literal.text)];
    const text = chunks.join(" ").trim();
    if (text) out.push({ text, pos: node.getStart() });
    return;
  }
  if (ts.isConditionalExpression(node)) {
    collectDisplayStrings(node.whenTrue, out);
    collectDisplayStrings(node.whenFalse, out);
    return;
  }
  if (ts.isBinaryExpression(node)) {
    const op = node.operatorToken.kind;
    if (
      op === ts.SyntaxKind.BarBarToken ||
      op === ts.SyntaxKind.QuestionQuestionToken ||
      op === ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      collectDisplayStrings(node.left, out);
      collectDisplayStrings(node.right, out);
    }
  }
}

function calleeName(expr) {
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) {
    const left = calleeName(expr.expression);
    return left ? `${left}.${expr.name.text}` : expr.name.text;
  }
  return "";
}

/**
 * Walks a data literal reporting copy-bearing strings.
 *
 * Tách ra khỏi rule module-scope để dùng lại cho object literal ĐƯỢC TRẢ VỀ từ
 * một hàm. components/CfaMockExamClient.tsx là ví dụ: nó gói cả cấu hình màn
 * hình vào useMemo(() => ({ title: "Thi thử CFA Level I", backLabel: "Về trang
 * CFA", ... })), nên không chuỗi nào nằm ở module scope và file báo 0 - trong
 * khi "Số ca", "Thời gian mỗi ca" và hai đoạn giải thích đều hiện trên màn hình.
 *
 * AGENTS.md đã đoán đúng chỗ này: "display strings that pass through a local
 * variable inside a component body".
 */
function walkDataFactory(source, push, kind = "data") {
  const walkData = (n, field) => {
    // A module specifier is not copy. `const TABS = [{ Comp: dynamic(() =>
    // import("@/components/X")) }]` put an import path in a data table and the
    // first version of this rule reported it, which is the kind of noise that
    // teaches people to wrap real findings in i18n-ignore.
    if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) return;
    // Nor is anything inside a function body: a component or callback living in
    // a data table is code, and its own strings are already covered by the JSX
    // and call rules.
    if (ts.isArrowFunction(n) || ts.isFunctionExpression(n)) return;
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      // Chuỗi dùng làm KHOÁ TRA: t.difficulty["Dễ"]. Bảng difficulty được keyed
      // BẰNG chính giá trị tiếng Việt, vì `difficulty` là union tiếng Việt dùng
      // làm giá trị khắp app - AGENTS.md ghi "The keys are data, not copy", và
      // dictionary-parity miễn trừ cả section đó vì đúng lý do này. Chuỗi ở vị
      // trí obj["..."] là khoá, không phải chữ hiện ra.
      if (n.parent && ts.isElementAccessExpression(n.parent) && n.parent.argumentExpression === n) return;
      if (field && NON_COPY_FIELDS.has(field)) return;
      // A BARE array element - no property name to judge it by - has to look
      // like prose: whitespace or a diacritic. `const QUIZ_OPTION_TYPES =
      // ["Analytical", "Compliance", ...] as const` is a union type, never
      // rendered, and reporting it is the noise that gets a gate ignored.
      if (!field && !/\s/.test(n.text) && !/[à-ỹ]/i.test(n.text)) return;
      push(kind, n.text, n.getStart(source));
      return;
    }
    if (ts.isPropertyAssignment(n)) {
      const name = ts.isIdentifier(n.name) || ts.isStringLiteral(n.name) ? n.name.text : "";
      walkData(n.initializer, name);
      return;
    }
    n.forEachChild((c) => walkData(c, field));
  };
  return walkData;
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
        else if (ts.isJsxExpression(init) && init.expression) {
          // Was string-literal-only, so `title={cond ? "A" : "B"}` and
          // aria-label={`... ${n} ...`} both read as zero findings. Scoped to
          // DISPLAY_ATTRS, so a className computed by a ternary stays out.
          const hits = [];
          collectDisplayStrings(init.expression, hits);
          for (const hit of hits) push(`attr:${attr}`, hit.text, hit.pos);
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
        // Literals AND the ternaries they hide in. The single commonest shape
        // in this repo is toast.error(error instanceof Error ? error.message :
        // "câu dự phòng") - the fallback only shows when the thrown thing is
        // not an Error, so nobody ever sees it and nothing ever reported it.
        const hits = [];
        collectDisplayStrings(arg, hits);
        for (const hit of hits) push("call", hit.text, hit.pos);
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
        const walkData = walkDataFactory(source, push);
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
      // <style>{`@keyframes shimmer { … }`}</style>. A stylesheet is never copy,
      // and it only became reachable once this rule started reporting template
      // literals. Excluded by the TAG it sits in rather than by looking like
      // CSS: a shape test for "looks like a stylesheet" is guesswork, while
      // "child of <style>" is exact.
      const parentTag =
        ts.isJsxElement(node.parent) && ts.isIdentifier(node.parent.openingElement.tagName)
          ? node.parent.openingElement.tagName.text
          : "";
      if (parentTag === "style" || parentTag === "script") {
        ts.forEachChild(node, visit);
        return;
      }
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
        // Template literals rendered as a child. This walker already descended
        // INTO ternaries - it just never pushed anything but a plain string
        // literal, so {cond ? t.x : `${n}/3 tuần streak`} reported nothing while
        // the sibling branch was already translated. That badge is what started
        // this whole thread.
        if ((ts.isTemplateExpression(n) || ts.isNoSubstitutionTemplateLiteral(n)) && !seen.has(n)) {
          seen.add(n);
          const text = ts.isNoSubstitutionTemplateLiteral(n)
            ? n.text
            : [n.head.text, ...n.templateSpans.map((sp) => sp.literal.text)].join(" ").trim();
          if (text) push("jsx-expr", text, n.getStart(source));
        }
        // Do not descend into nested JSX: its own text and attributes are
        // reported by the rules above, and recursing would double-count.
        if (!ts.isJsxElement(n) && !ts.isJsxSelfClosingElement(n) && !ts.isJsxFragment(n)) {
          ts.forEachChild(n, collect);
        }
      };
      if (node.expression) collect(node.expression);
    }

    // Thân arrow function dạng gọn trả thẳng một object literal:
    // useMemo(() => ({ … })). Không có ReturnStatement nào để bắt, nên phải
    // nhận riêng - và đây chính là hình dạng của CfaMockExamClient.
    if (
      ts.isArrowFunction(node) &&
      node.body &&
      (ts.isObjectLiteralExpression(node.body) || ts.isParenthesizedExpression(node.body))
    ) {
      const inner = ts.isParenthesizedExpression(node.body) ? node.body.expression : node.body;
      if (ts.isObjectLiteralExpression(inner) || ts.isArrayLiteralExpression(inner)) {
        walkDataFactory(source, push, "returned-data")(inner, "");
      }
    }

    // Thân arrow gọn trả về CHUỖI, không phải object:
    // `labelFormatter={(label) => `Tuần bắt đầu ${label}`}`. Rule returned-text
    // ở dưới chỉ nhận ReturnStatement, và rule ngay trên chỉ nhận object/array -
    // nên hình dạng này lọt qua cả hai. Tìm ra khi đối chiếu bằng tay chỗ
    // components/LearningAnalytics.tsx báo "bài" và "phút" mà bỏ dòng ngay
    // sau chúng.
    if (ts.isArrowFunction(node) && node.body && !ts.isBlock(node.body)) {
      const hits = [];
      collectDisplayStrings(node.body, hits);
      for (const hit of hits) {
        const words = hit.text.trim().split(/\s+/);
        if (words.length > 1 || /[à-ỹ]/i.test(hit.text)) push("returned-text", hit.text, hit.pos);
      }
    }

    // Chữ vẽ lên canvas. ctx.fillText("1 người đang học", …) hiện trên biển tên
    // trong phòng 3D, nhưng không rule nào ở trên coi nó là vị trí hiển thị -
    // nó không phải JSX, không phải thuộc tính, không phải toast. Đối số đầu của
    // fillText/strokeText LUÔN là chữ người dùng đọc, nên đây là vị trí hiển thị
    // chính xác nhất trong cả file này.
    if (ts.isCallExpression(node)) {
      const callee = calleeName(node.expression);
      if (/\.(fillText|strokeText)$/.test(callee) && node.arguments.length > 0) {
        const hits = [];
        collectDisplayStrings(node.arguments[0], hits);
        for (const hit of hits) push("canvas", hit.text, hit.pos);
      }
    }

    // Câu văn trả về từ một hàm.
    //
    // components/LessonPageClient.tsx có mười bảy ví von dạy học ở đúng hình
    // dạng này - `return "con gà đẻ trứng vàng: mỗi ngày nó đẻ ra…"` - và chúng
    // render mỗi ngày. band() trong TopicMasteryWidget cũng vậy: nó trả
    // "Vững"/"Đang đi"/"Mới bắt đầu" từ thân hàm, và file đó báo 0 chuỗi cả
    // trước lẫn sau khi tôi dịch nó. Literal trong thân hàm là khoảng mù lớn
    // nhất còn lại của script này.
    //
    // HẸP CÓ CHỦ ĐÍCH, vì `return "..."` cũng trả về id, enum, mã lỗi:
    //   - chỉ ReturnStatement, không phải mọi literal trong thân hàm
    //   - phải QUA isNotCopy như mọi rule khác, nên "personal", "high",
    //     "PGRST116" bị loại sẵn
    //   - và phải TRÔNG NHƯ CÂU: từ hai chữ trở lên, hoặc một từ có dấu tiếng
    //     Việt. Một token không dấu trả về từ hàm gần như luôn là giá trị.
    // KHÔNG bắt: throw new Error("...") - lỗi ném ra là chữ cho người sửa code,
    // không phải cho người học; và arr.push("...") - `push` dùng cho mọi thứ,
    // gán nghĩa hiển thị cho nó sẽ báo oan hàng loạt.
    if (ts.isReturnStatement(node) && node.expression) {
      // Object/array literal trả về từ hàm: chạy đúng bộ lọc của rule `data`.
      // useMemo(() => ({ title: "...", backLabel: "..." })) là một bảng dữ liệu
      // hiển thị, chỉ khác chỗ đứng.
      if (ts.isObjectLiteralExpression(node.expression) || ts.isArrayLiteralExpression(node.expression)) {
        walkDataFactory(source, push, "returned-data")(node.expression, "");
      }
      const hits = [];
      collectDisplayStrings(node.expression, hits);
      for (const hit of hits) {
        const words = hit.text.trim().split(/\s+/);
        const sentenceLike = words.length > 1 || /[à-ỹ]/i.test(hit.text);
        if (sentenceLike) push("returned-text", hit.text, hit.pos);
      }
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
  // Dữ liệu dùng chung: cấp độ, chặng, nhiệm vụ, thẻ chủ đề... Không nằm ở vị
  // trí hiển thị nào cả - chúng là `const` ở đầu tệp, được component đọc rồi
  // vẽ ra. Tách riêng vì cách sửa cũng khác: một khoá từ điển cho mỗi phần tử
  // dữ liệu, chứ không phải thay chuỗi ngay tại chỗ.
  if (file.startsWith("lib/")) return "shared data (lib/)";
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
/** Counted, named and printed - just not mixed into the driveable total. */
const otherPipeline = { lessonContent: 0, lessonFiles: 0, overlay: 0, overlayFiles: 0 };
for (const dir of ROOTS) {
  for (const file of walk(path.join(root, dir))) {
    const rel = path.relative(root, file);
    if (IS_DICTIONARY(rel)) continue;
    const { found, excluded } = findingsIn(readFileSync(file, "utf8"), file);
    totalExcluded += excluded;
    if (!found.length) continue;
    if (IS_LESSON_CONTENT(rel)) {
      otherPipeline.lessonContent += found.length;
      otherPipeline.lessonFiles += 1;
      continue;
    }
    if (HAS_OVERLAY(rel)) {
      otherPipeline.overlay += found.length;
      otherPipeline.overlayFiles += 1;
      continue;
    }
    rows.push({ file: rel, count: found.length, category: categorize(rel) });
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
console.log(`(parsed, language-agnostic: counts English and undotted Vietnamese too)`);
if (otherPipeline.lessonContent) {
  console.log(
    `${otherPipeline.lessonContent} more in ${otherPipeline.lessonFiles} lesson/question-bank files - ` +
      `translated per lesson into lib/lessons-i18n/<locale>/, audited by npm run audit:lessons:en`
  );
}
if (otherPipeline.overlay) {
  console.log(
    `${otherPipeline.overlay} more in ${otherPipeline.overlayFiles} data file(s) with a translation ` +
      `overlay in lib/<name>-i18n/ - completeness gated by the matching test in lib/__tests__/`
  );
}
console.log();

const byCategory = new Map();
for (const row of rows) {
  const prev = byCategory.get(row.category) ?? { count: 0, files: 0 };
  byCategory.set(row.category, { count: prev.count + row.count, files: prev.files + 1 });
}
console.log("By category:");
for (const [category, { count, files }] of [...byCategory].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${String(count).padStart(5)}  ${category}  (${files} files)`);
}

// Ranked across every category rather than within one. The old version listed
// only `learner-facing UI`, and once `lib` came into scope that category emptied
// out - the section printed a blank list under a heading while 5,712 strings sat
// one line above it.
console.log("\nHeaviest files:");
for (const { file, count } of rows.slice(0, 15)) {
  console.log(`  ${String(count).padStart(4)}  ${file}`);
}
console.log(`\nPer-file detail:  node scripts/i18n-coverage.mjs ${rows[0]?.file ?? "<path>"}`);
