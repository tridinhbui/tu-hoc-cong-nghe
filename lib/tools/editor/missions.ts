/**
 * Nhiệm vụ của trình soạn mã mô phỏng - đúng chuỗi việc tuần đầu của một
 * người mới làm web: mở tệp, sửa, chạy xem, tìm, sửa lỗi theo console, thêm
 * trang, và lưu.
 *
 * Mỗi kiểm tra đọc trạng thái của bộ máy. Những nhiệm vụ về "kết quả chạy" đọc
 * `lastRun.snapshot` - bản chụp lúc bấm Chạy - chứ không đọc tệp đang gõ dở:
 * sửa mà chưa chạy thì chưa thấy trang đổi, và nhiệm vụ cũng không nên tính.
 * Tên và gợi ý nằm trong từ điển (toolEditor.missions.<id>).
 */
import { dirtyFiles, getFile, resolvePath, type EditorState, type RunRecord } from "./engine";
import {
  byTag,
  elementChildren,
  findAll,
  hasAncestor,
  parseCss,
  parseHtml,
  selectNodes,
  textOf,
  visibleText,
  type CssRule,
  type HNode,
} from "./lite";
import { MOCK_API_ORIGIN, MOCK_PRODUCTS } from "./srcdoc";

export interface EditorMission {
  id: string;
  check: (state: EditorState) => boolean;
  /** Tiêu chí đạt, từ yếu tới mạnh; tiêu chí cuối chính là `check`. Tiêu chí
   *  đầu thường đọc TỆP ĐANG SỬA, tiêu chí cuối đọc bản chụp lúc bấm Chạy -
   *  nên người học thấy "đã sửa" tích trước, "đã chạy" tích sau. */
  criteria: { id: string; check: (state: EditorState) => boolean }[];
}

function m(id: string, criteria: EditorMission["criteria"]): EditorMission {
  return { id, check: criteria[criteria.length - 1].check, criteria };
}

export function headingOf(html: string | undefined): string | null {
  if (!html) return null;
  const m = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  return m ? m[1].replace(/<[^>]*>/g, "").trim() : null;
}

/** Có quy tắc CSS nào cho body/html đặt màu nền không. */
export function hasBodyBackground(css: string | undefined): boolean {
  if (!css) return false;
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of clean.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const selector = m[1].trim().toLowerCase();
    if (!selector.split(",").some((s) => /^(body|html|:root)$/.test(s.trim()))) continue;
    if (/(^|[;\s])background(-color)?\s*:\s*[^;\s][^;]*/i.test(m[2])) return true;
  }
  return false;
}

export function linksTo(html: string | undefined, target: string): boolean {
  if (!html) return false;
  const esc = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<a\\b[^>]*\\bhref\\s*=\\s*["'](\\./)?${esc}["']`, "i").test(html);
}

// --------------------------------------------------------------------------
// Bộ đọc cho các nhiệm vụ về bố cục, ngữ nghĩa, biểu mẫu và DOM.
// Mỗi hàm nhận NỘI DUNG (không nhận state) để cùng một phép đo dùng được cho tệp
// đang sửa lẫn bản chụp lúc bấm Chạy.

const runOf = (s: EditorState): RunRecord | null => s.lastRun;
const entryHtml = (run: RunRecord | null): string | undefined => (run ? run.snapshot[run.entry] : undefined);
const runErrors = (run: RunRecord) => run.console.filter((e) => e.level === "error");
const isFlex = (v: string | undefined) => /^(inline-)?flex$/.test((v ?? "").trim());

export function hasFlexCentering(css: string | undefined, html: string | undefined): boolean {
  const root = parseHtml(html);
  return parseCss(css).some(
    (r) =>
      r.media === null &&
      isFlex(r.decls.display) &&
      r.decls["justify-content"] === "center" &&
      r.decls["align-items"] === "center" &&
      selectNodes(root, r.selector).some((n) => elementChildren(n).length > 0),
  );
}

export function hasViewportMeta(html: string | undefined): boolean {
  return byTag(parseHtml(html), "meta").some(
    (n) => (n.attrs.name ?? "").toLowerCase() === "viewport" && /width\s*=\s*device-width/i.test(n.attrs.content ?? ""),
  );
}

export function hasResponsiveRule(css: string | undefined, html: string | undefined): boolean {
  const root = parseHtml(html);
  return parseCss(css).some(
    (r) =>
      !!r.media &&
      /\b(max|min)-width\s*:\s*\d+(\.\d+)?(px|em|rem)/i.test(r.media) &&
      Object.keys(r.decls).length > 0 &&
      selectNodes(root, r.selector).length > 0,
  );
}

function mainWithHeading(root: HNode): boolean {
  return byTag(root, "main").some((m) => findAll(m, (n) => n.tag === "h1").length > 0);
}

export function semanticLandmarks(html: string | undefined): { main: boolean; all: boolean } {
  const root = parseHtml(html);
  const main = mainWithHeading(root);
  const outside = (tag: string) =>
    byTag(root, tag).some((n) => !hasAncestor(n, "main") && (textOf(n).length > 0 || n.children.length > 0));
  return { main, all: main && outside("header") && outside("footer") };
}

export function imgFacts(html: string | undefined, exists: (path: string) => boolean) {
  const imgs = byTag(parseHtml(html), "img").filter((n) => {
    const src = (n.attrs.src ?? "").trim();
    if (!src) return false;
    const local = resolvePath("index.html", src);
    return local === null || exists(local);
  });
  const withAlt = imgs.filter((n) => (n.attrs.alt ?? "").trim().length > 0);
  const tuned = withAlt.filter(
    (n) => (n.attrs.loading ?? "").toLowerCase() === "lazy" && /^\d+/.test(n.attrs.width ?? "") && /^\d+/.test(n.attrs.height ?? ""),
  );
  return { img: imgs.length > 0, alt: withAlt.length > 0, tuned: tuned.length > 0 };
}

const NON_TEXT_INPUT = new Set(["hidden", "submit", "button", "reset", "image"]);

function visibleInputs(form: HNode): HNode[] {
  return findAll(form, (n) => n.tag === "input" || n.tag === "textarea" || n.tag === "select").filter(
    (n) => !NON_TEXT_INPUT.has((n.attrs.type ?? "text").toLowerCase()),
  );
}

function isLabelled(input: HNode, root: HNode): boolean {
  for (let p = input.parent; p; p = p.parent) if (p.tag === "label" && textOf(p).length > 0) return true;
  const id = input.attrs.id;
  return !!id && byTag(root, "label").some((l) => l.attrs.for === id && textOf(l).length > 0);
}

function hasSubmitControl(form: HNode): boolean {
  return findAll(
    form,
    (n) =>
      (n.tag === "button" && ["", "submit"].includes((n.attrs.type ?? "").toLowerCase())) ||
      (n.tag === "input" && (n.attrs.type ?? "").toLowerCase() === "submit"),
  ).length > 0;
}

export function formFacts(html: string | undefined) {
  const root = parseHtml(html);
  const forms = byTag(root, "form");
  const withInput = forms.filter((f) => visibleInputs(f).length > 0);
  const labelled = withInput.filter((f) => visibleInputs(f).every((i) => isLabelled(i, root)));
  const submit = withInput.filter(hasSubmitControl);
  return {
    form: withInput.length > 0,
    label: labelled.length > 0,
    submit: submit.length > 0,
    all: labelled.some((f) => hasSubmitControl(f)),
  };
}

function columnCount(value: string | undefined): number {
  if (!value) return 0;
  const rep = /repeat\(\s*(\d+|auto-fit|auto-fill)\s*,/i.exec(value);
  if (rep) return /^\d+$/.test(rep[1]) ? Number(rep[1]) : 2;
  return (value.match(/[^\s(]+(\([^)]*\))?/g) ?? []).length;
}

export function gridFacts(css: string | undefined, html: string | undefined) {
  const root = parseHtml(html);
  const grids: CssRule[] = parseCss(css).filter(
    (r) => r.media === null && /^(inline-)?grid$/.test((r.decls.display ?? "").trim()) && columnCount(r.decls["grid-template-columns"]) >= 2,
  );
  const gapped = grids.filter((r) => !!(r.decls.gap || r.decls["column-gap"] || r.decls["grid-gap"] || r.decls["grid-column-gap"]));
  const carded = gapped.filter((r) => selectNodes(root, r.selector).some((n) => elementChildren(n).length >= 3));
  return { grid: grids.length > 0, gap: gapped.length > 0, cards: carded.length > 0 };
}

const liCount = (html: string | null | undefined) => byTag(parseHtml(html), "li").length;
const listAndButton = (html: string | undefined) => {
  const root = parseHtml(html);
  return byTag(root, "button").length > 0 && byTag(root, "ul", "ol").length > 0;
};

const ADD_DOM = /createElement|insertAdjacentHTML|\.append\(|appendChild|\.prepend\(|innerHTML/;
const SELECTED_LIS = (html: string | null | undefined) =>
  byTag(parseHtml(html), "li").map((li) => `${li.attrs.class ?? ""}|${li.attrs["aria-pressed"] ?? ""}|${textOf(li)}`);

export function usesDelegation(js: string | undefined): boolean {
  if (!js) return false;
  const code = js.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const count = (code.match(/\.addEventListener\s*\(/g) ?? []).length;
  if (count !== 1) return false;
  // Nghe từng phần tử một trong vòng lặp thì chưa phải ủy quyền sự kiện.
  if (/\.(forEach|map)\s*\([^}]{0,80}?addEventListener|\b(for|while)\s*\([^)]*\)\s*\{?[^}]{0,60}?addEventListener/.test(code)) return false;
  return /\.target\b|\.closest\s*\(/.test(code);
}

const STATUS_IDS = new Set(["error", "errors", "message", "msg", "status", "form-error", "form-message", "result"]);
const statusNode = (root: HNode): HNode | undefined =>
  findAll(root, (n) => STATUS_IDS.has((n.attrs.id ?? "").toLowerCase()) || n.attrs.role === "alert" || "aria-live" in n.attrs)[0];

export function handlesSubmit(js: string | undefined): boolean {
  return !!js && /addEventListener\s*\(\s*["']submit["']|\.onsubmit\s*=/.test(js) && /preventDefault\s*\(/.test(js);
}

export function deferredInHead(html: string | undefined): boolean {
  const root = parseHtml(html);
  const scripts = byTag(root, "script").filter((n) => n.attrs.src);
  if (scripts.length === 0) return false;
  if (scripts.some((n) => hasAncestor(n, "body"))) return false;
  return scripts.every((n) => hasAncestor(n, "head") && ("defer" in n.attrs || (n.attrs.type ?? "").toLowerCase() === "module"));
}

export function linkedInFolders(html: string | undefined, paths: string[]): boolean {
  const root = parseHtml(html);
  const known = new Set(paths);
  const css = byTag(root, "link").filter((n) => /stylesheet/i.test(n.attrs.rel ?? "") && n.attrs.href);
  const js = byTag(root, "script").filter((n) => n.attrs.src);
  const ok = (ref: string, ext: string) => {
    const p = resolvePath("index.html", ref);
    return !!p && p.includes("/") && p.endsWith(ext) && known.has(p);
  };
  return css.length > 0 && js.length > 0 && css.every((n) => ok(n.attrs.href, ".css")) && js.every((n) => ok(n.attrs.src, ".js"));
}

const NOT_FOUND = /ERR_FILE_NOT_FOUND|\b404\b/;

const hasText = (html: string | null | undefined, value: string) =>
  new RegExp(`>[^<]*${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^<]*<`).test(
    (html ?? "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<input\b[^>]*>/gi, ""),
  );

export const EDITOR_MISSIONS: EditorMission[] = [
  m("open-index", [{ id: "opened", check: (s) => s.everOpened.includes("index.html") }]),
  m("change-heading", [
    {
      id: "edited",
      check: (s) => {
        const h = headingOf(getFile(s, "index.html")?.content);
        return !!h && h !== s.starterHeading.trim();
      },
    },
    {
      id: "ran",
      check: (s) => {
        const h = headingOf(s.lastRun?.snapshot["index.html"]);
        return !!h && h !== s.starterHeading.trim();
      },
    },
  ]),
  m("css-background", [
    { id: "edited", check: (s) => hasBodyBackground(getFile(s, "style.css")?.content) },
    { id: "ran", check: (s) => hasBodyBackground(s.lastRun?.snapshot["style.css"]) },
  ]),
  m("search-todo", [
    {
      id: "found",
      check: (s) => !!s.lastSearch && s.lastSearch.matches > 0 && s.lastSearch.query.trim().toLowerCase() === "todo",
    },
  ]),
  m("fix-bug", [
    {
      id: "fixed",
      check: (s) => {
        const script = getFile(s, "script.js")?.content;
        return script !== undefined && !/\bconsle\b/.test(script);
      },
    },
    {
      id: "clean",
      check: (s) => {
        const run = s.lastRun;
        if (!run || run.entry !== "index.html") return false;
        const script = run.snapshot["script.js"];
        if (script === undefined || /\bconsle\b/.test(script)) return false;
        return !run.console.some((e) => e.level === "error") && run.console.some((e) => e.level === "log");
      },
    },
  ]),
  m("button-log", [
    { id: "button", check: (s) => /<button\b/i.test(getFile(s, "index.html")?.content ?? "") },
    {
      id: "logged",
      check: (s) => {
        const run = s.lastRun;
        if (!run) return false;
        const html = run.snapshot[run.entry];
        return (
          !!html && /<button\b/i.test(html) && run.console.some((e) => e.level === "log" && e.source === "console" && e.afterClick)
        );
      },
    },
  ]),
  m("about-page", [
    { id: "file", check: (s) => !!getFile(s, "about.html") && getFile(s, "about.html")!.content.trim().length > 0 },
    {
      id: "link",
      check: (s) => {
        const about = getFile(s, "about.html");
        return !!about && about.content.trim().length > 0 && linksTo(getFile(s, "index.html")?.content, "about.html");
      },
    },
  ]),
  m("save-all", [
    { id: "saved", check: (s) => s.saveCount > 0 && dirtyFiles(s).length === 0 },
    { id: "about", check: (s) => !!getFile(s, "about.html") && s.saveCount > 0 && dirtyFiles(s).length === 0 },
  ]),
  m("flex-center", [
    { id: "flex", check: (s) => parseCss(getFile(s, "style.css")?.content).some((r) => isFlex(r.decls.display)) },
    { id: "centered", check: (s) => hasFlexCentering(getFile(s, "style.css")?.content, getFile(s, "index.html")?.content) },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        return !!run && hasFlexCentering(run.snapshot["style.css"], entryHtml(run));
      },
    },
  ]),
  m("viewport-media", [
    { id: "viewport", check: (s) => hasViewportMeta(getFile(s, "index.html")?.content) },
    { id: "query", check: (s) => hasResponsiveRule(getFile(s, "style.css")?.content, getFile(s, "index.html")?.content) },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        const html = entryHtml(run);
        return !!run && hasViewportMeta(html) && hasResponsiveRule(run.snapshot["style.css"], html);
      },
    },
  ]),
  m("semantic-tags", [
    { id: "main", check: (s) => semanticLandmarks(getFile(s, "index.html")?.content).main },
    { id: "landmarks", check: (s) => semanticLandmarks(getFile(s, "index.html")?.content).all },
    { id: "ran", check: (s) => semanticLandmarks(entryHtml(runOf(s))).all },
  ]),
  m("img-alt-lazy", [
    { id: "img", check: (s) => imgFacts(getFile(s, "index.html")?.content, (p) => !!getFile(s, p)).img },
    { id: "alt", check: (s) => imgFacts(getFile(s, "index.html")?.content, (p) => !!getFile(s, p)).alt },
    { id: "lazy", check: (s) => imgFacts(getFile(s, "index.html")?.content, (p) => !!getFile(s, p)).tuned },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        if (!run) return false;
        const facts = imgFacts(entryHtml(run), (p) => p in run.snapshot);
        return facts.tuned && !run.console.some((e) => e.level === "error" && NOT_FOUND.test(e.text));
      },
    },
  ]),
  m("labeled-form", [
    { id: "form", check: (s) => formFacts(getFile(s, "index.html")?.content).form },
    { id: "label", check: (s) => formFacts(getFile(s, "index.html")?.content).label },
    { id: "submit", check: (s) => formFacts(getFile(s, "index.html")?.content).submit },
    { id: "ran", check: (s) => formFacts(entryHtml(runOf(s))).all },
  ]),
  m("css-grid-cards", [
    { id: "grid", check: (s) => gridFacts(getFile(s, "style.css")?.content, getFile(s, "index.html")?.content).grid },
    { id: "gap", check: (s) => gridFacts(getFile(s, "style.css")?.content, getFile(s, "index.html")?.content).gap },
    { id: "cards", check: (s) => gridFacts(getFile(s, "style.css")?.content, getFile(s, "index.html")?.content).cards },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        return !!run && gridFacts(run.snapshot["style.css"], entryHtml(run)).cards;
      },
    },
  ]),
  m("dom-add-item", [
    { id: "markup", check: (s) => listAndButton(getFile(s, "index.html")?.content) },
    {
      id: "script",
      check: (s) => {
        const js = getFile(s, "script.js")?.content ?? "";
        return /addEventListener\s*\(\s*["']click["']|\.onclick\s*=/.test(js) && ADD_DOM.test(js);
      },
    },
    {
      id: "added",
      check: (s) => {
        const run = runOf(s);
        const dom = run?.dom;
        return (
          !!run && !!dom?.first && !!dom.afterClick && listAndButton(entryHtml(run)) && liCount(dom.afterClick) > liCount(dom.first)
        );
      },
    },
  ]),
  m("event-delegation", [
    {
      id: "list",
      check: (s) => byTag(parseHtml(getFile(s, "index.html")?.content), "ul", "ol").some((l) => byTag(l, "li").length >= 3),
    },
    { id: "single", check: (s) => usesDelegation(getFile(s, "script.js")?.content) },
    {
      id: "works",
      check: (s) => {
        const run = runOf(s);
        const dom = run?.dom;
        if (!run || !dom?.first || !dom.afterClick) return false;
        if (!usesDelegation(run.snapshot["script.js"])) return false;
        if (!byTag(parseHtml(entryHtml(run)), "ul", "ol").some((l) => byTag(l, "li").length >= 3)) return false;
        const before = SELECTED_LIS(dom.first);
        const after = SELECTED_LIS(dom.afterClick);
        return before.length >= 3 && (after.length !== before.length || after.some((v, i) => v !== before[i]));
      },
    },
  ]),
  m("form-validate", [
    {
      id: "form",
      check: (s) => {
        const html = getFile(s, "index.html")?.content;
        return formFacts(html).submit && !!statusNode(parseHtml(html));
      },
    },
    { id: "handler", check: (s) => handlesSubmit(getFile(s, "script.js")?.content) },
    {
      id: "shows",
      check: (s) => {
        const run = runOf(s);
        const dom = run?.dom;
        if (!run || !dom?.first || !dom.afterClick) return false;
        if (!handlesSubmit(run.snapshot["script.js"]) || !formFacts(entryHtml(run)).submit) return false;
        const before = statusNode(parseHtml(dom.first));
        const after = statusNode(parseHtml(dom.afterClick));
        return !!before && !!after && textOf(before) === "" && textOf(after).length > 0;
      },
    },
  ]),
  m("defer-script", [
    { id: "head", check: (s) => deferredInHead(getFile(s, "index.html")?.content) },
    { id: "fixed", check: (s) => !/\bconsle\b/.test(getFile(s, "script.js")?.content ?? "x consle") },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        if (!run || run.entry !== "index.html") return false;
        const js = run.snapshot["script.js"];
        if (!deferredInHead(entryHtml(run)) || js === undefined || /\bconsle\b/.test(js)) return false;
        return runErrors(run).length === 0 && run.console.some((e) => e.level === "log" && e.source === "console");
      },
    },
  ]),
  m("move-files", [
    {
      id: "moved",
      check: (s) => {
        const css = s.files.filter((f) => f.path.endsWith(".css") && f.path.includes("/") && f.content.includes("{"));
        const js = s.files.filter((f) => f.path.endsWith(".js") && f.path.includes("/") && f.content.trim().length > 20);
        return !getFile(s, "style.css") && !getFile(s, "script.js") && css.length > 0 && js.length > 0;
      },
    },
    { id: "linked", check: (s) => linkedInFolders(getFile(s, "index.html")?.content, s.files.map((f) => f.path)) },
    {
      id: "ran",
      check: (s) => {
        const run = runOf(s);
        if (!run || run.entry !== "index.html") return false;
        const paths = Object.keys(run.snapshot);
        if (!linkedInFolders(entryHtml(run), paths) || paths.includes("style.css") || paths.includes("script.js")) return false;
        if (run.console.some((e) => NOT_FOUND.test(e.text))) return false;
        // Script chạy (dù ra log hay ra lỗi của chính nó) thì console có dòng không phải "thiếu tệp".
        return run.console.length > 0;
      },
    },
  ]),
  m("local-storage", [
    {
      id: "markup",
      check: (s) => {
        const root = parseHtml(getFile(s, "index.html")?.content);
        return byTag(root, "input").length > 0 && byTag(root, "button").length > 0;
      },
    },
    {
      id: "code",
      check: (s) => {
        const js = getFile(s, "script.js")?.content ?? "";
        return /localStorage\.setItem\s*\(/.test(js) && /localStorage\.getItem\s*\(/.test(js);
      },
    },
    { id: "saved", check: (s) => Object.values(s.storage ?? {}).some((v) => v.trim().length > 0) },
    {
      id: "restored",
      check: (s) => {
        const run = runOf(s);
        const first = run?.dom?.first;
        if (!run || !first) return false;
        const seed = Object.values(run.storageSeed ?? {}).filter((v) => v.trim().length >= 2);
        const sources = [entryHtml(run) ?? "", run.snapshot["script.js"] ?? ""].join("\n");
        // Chữ phải đến từ localStorage, không phải gõ sẵn vào mã.
        return seed.some((v) => !sources.includes(v) && hasText(first, v));
      },
    },
  ]),
  m("fetch-error", [
    {
      id: "call",
      check: (s) => {
        const js = getFile(s, "script.js")?.content ?? "";
        return /fetch\s*\(/.test(js) && js.includes(`${MOCK_API_ORIGIN}/products`);
      },
    },
    {
      id: "list",
      check: (s) => {
        const run = runOf(s);
        if (!run?.dom?.last) return false;
        const text = visibleText(run.dom.last);
        const sources = [entryHtml(run) ?? "", run.snapshot["script.js"] ?? ""].join("\n");
        return MOCK_PRODUCTS.every((p) => text.includes(p.name) && !sources.includes(p.name));
      },
    },
    {
      id: "status",
      check: (s) => {
        const run = runOf(s);
        const js = run?.snapshot["script.js"] ?? "";
        if (!run?.dom?.last) return false;
        const node = findAll(parseHtml(run.dom.last), (n) => n.attrs.id === "notice")[0];
        return !!node && textOf(node).length > 0 && /\.ok\b|\.status\b/.test(js) && js.includes("/orders");
      },
    },
    {
      id: "clean",
      check: (s) => {
        const run = runOf(s);
        if (!run?.dom?.last) return false;
        const js = run.snapshot["script.js"] ?? "";
        const text = visibleText(run.dom.last);
        const sources = [entryHtml(run) ?? "", js].join("\n");
        const node = findAll(parseHtml(run.dom.last), (n) => n.attrs.id === "notice")[0];
        return (
          js.includes(`${MOCK_API_ORIGIN}/products`) &&
          js.includes("/orders") &&
          /\.ok\b|\.status\b/.test(js) &&
          MOCK_PRODUCTS.every((p) => text.includes(p.name) && !sources.includes(p.name)) &&
          !!node &&
          textOf(node).length > 0 &&
          runErrors(run).length === 0
        );
      },
    },
  ]),
];

export const EDITOR_MISSION_IDS = EDITOR_MISSIONS.map((m) => m.id);
