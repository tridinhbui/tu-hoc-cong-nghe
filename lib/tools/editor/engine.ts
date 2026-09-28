/**
 * Bộ máy thuần của trình soạn mã mô phỏng (/cong-cu/editor).
 *
 * Không có React ở đây: mọi thao tác nhận một EditorState và trả về một
 * EditorState mới, nên test chạy thẳng trên Node và component chỉ việc gọi.
 *
 * Mô hình tệp đơn giản như một thư mục dự án thật: mỗi tệp có đường dẫn tương
 * đối ("index.html", "pages/about.html"), nội dung đang sửa và nội dung đã lưu.
 * "Chưa lưu" (chấm tròn trên tab) chỉ là hai chuỗi đó khác nhau.
 */

export type Language = "html" | "css" | "javascript" | "markdown" | "json" | "plaintext";

export interface EditorFile {
  path: string;
  content: string;
  /** Nội dung lần lưu gần nhất. Khác `content` nghĩa là tệp chưa lưu. */
  saved: string;
}

export type ConsoleLevel = "log" | "info" | "warn" | "error";

export interface ConsoleEntry {
  level: ConsoleLevel;
  text: string;
  /** "runtime" = lỗi trình duyệt tự báo (exception, không tải được tệp);
   *  "console" = do chính mã gọi console.* */
  source: "console" | "runtime";
  /** Dòng này xuất hiện sau khi người học bấm vào trang xem trước. */
  afterClick: boolean;
  file?: string;
  line?: number;
}

export interface RunRecord {
  id: number;
  /** Tệp HTML đang được hiển thị trong khung xem trước. */
  entry: string;
  /** Bản chụp mọi tệp lúc bấm Chạy - nhiệm vụ đọc cái đã chạy, không phải cái
   *  đang gõ dở. */
  snapshot: Record<string, string>;
  console: ConsoleEntry[];
  clicked: boolean;
}

export interface SearchRecord {
  query: string;
  matches: number;
}

export interface StarterCopy {
  /** Tiêu đề <title> của trang mẫu. */
  title: string;
  /** Nội dung <h1> ban đầu - nhiệm vụ "đổi tiêu đề" so với chuỗi này. */
  heading: string;
  paragraph: string;
  /** Chú thích đầu script.js. */
  scriptComment: string;
  /** Dòng TODO trong script.js. */
  scriptTodo: string;
  /** Toàn bộ README.md. */
  readme: string;
}

export interface EditorState {
  files: EditorFile[];
  /** Thư mục rỗng vẫn phải hiện trong cây, nên được giữ riêng. */
  folders: string[];
  openTabs: string[];
  active: string | null;
  everOpened: string[];
  lastRun: RunRecord | null;
  runCount: number;
  lastSearch: SearchRecord | null;
  saveCount: number;
  starterHeading: string;
}

export type OpError = "empty" | "invalid" | "exists" | "notFound";

export interface OpResult {
  state: EditorState;
  error?: OpError;
}

// --------------------------------------------------------------------------
// Dự án mẫu

export function starterFiles(copy: StarterCopy): EditorFile[] {
  const index = [
    "<!DOCTYPE html>",
    '<html lang="vi">',
    "<head>",
    '  <meta charset="UTF-8">',
    `  <title>${copy.title}</title>`,
    '  <link rel="stylesheet" href="style.css">',
    "</head>",
    "<body>",
    `  <h1>${copy.heading}</h1>`,
    `  <p>${copy.paragraph}</p>`,
    "",
    '  <script src="script.js"></script>',
    "</body>",
    "</html>",
    "",
  ].join("\n");

  const style = [
    "body {",
    "  font-family: system-ui, sans-serif;",
    "  max-width: 640px;",
    "  margin: 40px auto;",
    "  padding: 0 16px;",
    "  color: #1f2937;",
    "}",
    "",
    "h1 {",
    "  color: #2961b8;",
    "}",
    "",
  ].join("\n");

  // Lỗi cố ý: `consle` thay vì `console` - ném ReferenceError khi chạy.
  const script = [
    `// ${copy.scriptComment}`,
    'const title = document.querySelector("h1");',
    "",
    'consle.log("Page loaded:", title.textContent);',
    "",
    `// TODO: ${copy.scriptTodo}`,
    "",
  ].join("\n");

  const make = (path: string, content: string): EditorFile => ({ path, content, saved: content });
  const files = [
    make("index.html", index),
    make("style.css", style),
    make("script.js", script),
    make("README.md", copy.readme),
  ];
  return files;
}

/** Tệp mở sẵn lúc bắt đầu - như VS Code mở README của một dự án vừa clone. */
const FIRST_OPEN = "README.md";

export function createInitialState(copy: StarterCopy): EditorState {
  return {
    files: starterFiles(copy),
    folders: [],
    openTabs: [FIRST_OPEN],
    active: FIRST_OPEN,
    everOpened: [FIRST_OPEN],
    lastRun: null,
    runCount: 0,
    lastSearch: null,
    saveCount: 0,
    starterHeading: copy.heading,
  };
}

/** Dự án còn nguyên như lúc tạo: chưa sửa, chưa lưu, chưa chạy, chưa tìm.
 *  Chỉ lúc đó mới được thay dự án mẫu sang ngôn ngữ khác mà không mất gì. */
export function isPristine(state: EditorState): boolean {
  const starterPaths = ["README.md", "index.html", "script.js", "style.css"];
  const paths = state.files.map((f) => f.path).sort();
  return (
    state.runCount === 0 &&
    state.saveCount === 0 &&
    state.lastSearch === null &&
    state.folders.length === 0 &&
    paths.length === starterPaths.length &&
    paths.every((p, i) => p === starterPaths[i]) &&
    state.files.every((f) => f.content === f.saved)
  );
}

/** Thay nội dung dự án mẫu sang bản của ngôn ngữ khác, giữ tab đang mở. */
export function relocalize(state: EditorState, copy: StarterCopy): EditorState {
  if (!isPristine(state) || state.starterHeading === copy.heading) return state;
  return { ...state, files: starterFiles(copy), starterHeading: copy.heading };
}

// --------------------------------------------------------------------------
// Tiện ích đường dẫn

export function languageOf(path: string): Language {
  const ext = path.slice(path.lastIndexOf(".") + 1).toLowerCase();
  if (ext === "html" || ext === "htm") return "html";
  if (ext === "css") return "css";
  if (ext === "js" || ext === "mjs") return "javascript";
  if (ext === "md") return "markdown";
  if (ext === "json") return "json";
  return "plaintext";
}

export function baseName(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

export function dirName(path: string): string {
  const i = path.lastIndexOf("/");
  return i === -1 ? "" : path.slice(0, i);
}

export function joinPath(dir: string, name: string): string {
  return dir ? `${dir}/${name}` : name;
}

/** Chuẩn hoá tên người học gõ: bỏ "/" thừa, từ chối "..", ký tự lạ. */
export function normalizePath(raw: string): { path?: string; error?: OpError } {
  const trimmed = raw.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/");
  if (!trimmed) return { error: "empty" };
  const parts = trimmed.split("/");
  for (const p of parts) {
    if (!p || p === "." || p === ".." || /[<>:"|?*]/.test(p)) return { error: "invalid" };
  }
  return { path: parts.join("/") };
}

/** Giải một href/src tương đối so với thư mục của tệp HTML chứa nó. */
export function resolvePath(fromFile: string, ref: string): string | null {
  if (/^([a-z]+:|\/\/|#)/i.test(ref)) return null;
  const clean = ref.split(/[?#]/)[0];
  if (!clean) return null;
  const stack = clean.startsWith("/") ? [] : dirName(fromFile).split("/").filter(Boolean);
  for (const part of clean.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return stack.join("/");
}

export function getFile(state: EditorState, path: string): EditorFile | undefined {
  return state.files.find((f) => f.path === path);
}

export function isDirty(file: EditorFile): boolean {
  return file.content !== file.saved;
}

export function dirtyFiles(state: EditorState): EditorFile[] {
  return state.files.filter(isDirty);
}

/** Mọi thư mục đang tồn tại: khai báo riêng + suy ra từ đường dẫn tệp. */
export function allFolders(state: EditorState): string[] {
  const set = new Set(state.folders);
  for (const f of state.files) {
    let d = dirName(f.path);
    while (d) {
      set.add(d);
      d = dirName(d);
    }
  }
  return [...set].sort();
}

function pathExists(state: EditorState, path: string): boolean {
  return state.files.some((f) => f.path === path) || allFolders(state).includes(path);
}

// --------------------------------------------------------------------------
// Cây thư mục

export interface TreeNode {
  name: string;
  path: string;
  kind: "folder" | "file";
  children: TreeNode[];
}

/** Thư mục trước, tệp sau, mỗi nhóm theo bảng chữ cái - như Explorer thật. */
export function buildTree(state: EditorState): TreeNode[] {
  const root: TreeNode = { name: "", path: "", kind: "folder", children: [] };
  const folderNode = (path: string): TreeNode => {
    if (!path) return root;
    const parent = folderNode(dirName(path));
    let node = parent.children.find((c) => c.kind === "folder" && c.path === path);
    if (!node) {
      node = { name: baseName(path), path, kind: "folder", children: [] };
      parent.children.push(node);
    }
    return node;
  };
  for (const d of allFolders(state)) folderNode(d);
  for (const f of state.files) {
    folderNode(dirName(f.path)).children.push({ name: baseName(f.path), path: f.path, kind: "file", children: [] });
  }
  const sort = (n: TreeNode) => {
    n.children.sort((a, b) =>
      a.kind !== b.kind ? (a.kind === "folder" ? -1 : 1) : a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );
    n.children.forEach(sort);
  };
  sort(root);
  return root.children;
}

// --------------------------------------------------------------------------
// Thao tác

export function openFile(state: EditorState, path: string): EditorState {
  if (!getFile(state, path)) return state;
  return {
    ...state,
    openTabs: state.openTabs.includes(path) ? state.openTabs : [...state.openTabs, path],
    active: path,
    everOpened: state.everOpened.includes(path) ? state.everOpened : [...state.everOpened, path],
  };
}

export function closeTab(state: EditorState, path: string): EditorState {
  const i = state.openTabs.indexOf(path);
  if (i === -1) return state;
  const openTabs = state.openTabs.filter((p) => p !== path);
  let active = state.active;
  if (active === path) active = openTabs[Math.min(i, openTabs.length - 1)] ?? null;
  return { ...state, openTabs, active };
}

export function editFile(state: EditorState, path: string, content: string): EditorState {
  return { ...state, files: state.files.map((f) => (f.path === path ? { ...f, content } : f)) };
}

export function saveFile(state: EditorState, path: string): EditorState {
  const file = getFile(state, path);
  if (!file) return state;
  return {
    ...state,
    files: state.files.map((f) => (f.path === path ? { ...f, saved: f.content } : f)),
    saveCount: state.saveCount + 1,
  };
}

export function saveAll(state: EditorState): EditorState {
  return {
    ...state,
    files: state.files.map((f) => ({ ...f, saved: f.content })),
    saveCount: state.saveCount + 1,
  };
}

export function createFile(state: EditorState, rawPath: string, content = ""): OpResult {
  const { path, error } = normalizePath(rawPath);
  if (!path) return { state, error };
  if (pathExists(state, path)) return { state, error: "exists" };
  // Tệp mới tạo ra đĩa ngay, rỗng - giống VS Code: không có chấm "chưa lưu".
  const next: EditorState = { ...state, files: [...state.files, { path, content, saved: content }] };
  return { state: openFile(next, path) };
}

export function createFolder(state: EditorState, rawPath: string): OpResult {
  const { path, error } = normalizePath(rawPath);
  if (!path) return { state, error };
  if (pathExists(state, path)) return { state, error: "exists" };
  return { state: { ...state, folders: [...state.folders, path] } };
}

function remap(p: string, from: string, to: string): string {
  if (p === from) return to;
  if (p.startsWith(`${from}/`)) return to + p.slice(from.length);
  return p;
}

/** Đổi tên tệp hoặc thư mục (kéo theo mọi thứ bên trong). */
export function renamePath(state: EditorState, from: string, rawTo: string): OpResult {
  if (!pathExists(state, from)) return { state, error: "notFound" };
  const { path: to, error } = normalizePath(rawTo);
  if (!to) return { state, error };
  if (to === from) return { state };
  if (pathExists(state, to)) return { state, error: "exists" };
  if (to.startsWith(`${from}/`)) return { state, error: "invalid" };
  const m = (p: string) => remap(p, from, to);
  return {
    state: {
      ...state,
      files: state.files.map((f) => ({ ...f, path: m(f.path) })),
      folders: state.folders.map(m),
      openTabs: state.openTabs.map(m),
      active: state.active ? m(state.active) : null,
      everOpened: state.everOpened.map(m),
    },
  };
}

export function deletePath(state: EditorState, path: string): OpResult {
  if (!pathExists(state, path)) return { state, error: "notFound" };
  const gone = (p: string) => p === path || p.startsWith(`${path}/`);
  let next: EditorState = {
    ...state,
    files: state.files.filter((f) => !gone(f.path)),
    folders: state.folders.filter((d) => !gone(d)),
  };
  for (const tab of state.openTabs.filter(gone)) next = closeTab(next, tab);
  return { state: next };
}

// --------------------------------------------------------------------------
// Chạy và console

export function startRun(state: EditorState, entry = "index.html"): EditorState {
  const id = state.runCount + 1;
  const snapshot: Record<string, string> = {};
  for (const f of state.files) snapshot[f.path] = f.content;
  return {
    ...state,
    runCount: id,
    lastRun: { id, entry, snapshot, console: [], clicked: false },
  };
}

export function appendConsole(
  state: EditorState,
  runId: number,
  entry: Omit<ConsoleEntry, "afterClick">,
): EditorState {
  const run = state.lastRun;
  if (!run || run.id !== runId) return state;
  // Giới hạn để một vòng lặp console.log vô tận không làm treo trang.
  const kept = run.console.length >= 500 ? run.console.slice(-499) : run.console;
  return {
    ...state,
    lastRun: { ...run, console: [...kept, { ...entry, afterClick: run.clicked }] },
  };
}

export function markClick(state: EditorState, runId: number): EditorState {
  const run = state.lastRun;
  if (!run || run.id !== runId || run.clicked) return state;
  return { ...state, lastRun: { ...run, clicked: true } };
}

export function clearConsole(state: EditorState): EditorState {
  if (!state.lastRun) return state;
  return { ...state, lastRun: { ...state.lastRun, console: [] } };
}

// --------------------------------------------------------------------------
// Tìm kiếm

export interface SearchMatch {
  path: string;
  line: number;
  column: number;
  text: string;
  length: number;
}

export function searchFiles(files: EditorFile[], query: string, caseSensitive = false): SearchMatch[] {
  if (!query) return [];
  const needle = caseSensitive ? query : query.toLowerCase();
  const out: SearchMatch[] = [];
  for (const f of files) {
    f.content.split("\n").forEach((line, i) => {
      const hay = caseSensitive ? line : line.toLowerCase();
      let from = 0;
      for (;;) {
        const at = hay.indexOf(needle, from);
        if (at === -1) break;
        out.push({ path: f.path, line: i + 1, column: at + 1, text: line, length: query.length });
        from = at + Math.max(needle.length, 1);
      }
    });
  }
  return out;
}

export function recordSearch(state: EditorState, query: string, matches: number): EditorState {
  if (!query.trim()) return state;
  return { ...state, lastSearch: { query, matches } };
}

// --------------------------------------------------------------------------
// Con trỏ

/** Vị trí ký tự → dòng/cột tính từ 1, như thanh trạng thái hiển thị. */
export function cursorPosition(content: string, offset: number): { line: number; col: number } {
  const before = content.slice(0, Math.max(0, offset));
  const lines = before.split("\n");
  return { line: lines.length, col: lines[lines.length - 1].length + 1 };
}

export function offsetOfLine(content: string, line: number): number {
  const lines = content.split("\n");
  let off = 0;
  for (let i = 0; i < Math.min(line - 1, lines.length); i++) off += lines[i].length + 1;
  return off;
}

// --------------------------------------------------------------------------
// Lưu trữ

export function isEditorState(v: unknown): v is EditorState {
  if (!v || typeof v !== "object") return false;
  const s = v as Partial<EditorState>;
  return (
    Array.isArray(s.files) &&
    s.files.every((f) => f && typeof f.path === "string" && typeof f.content === "string" && typeof f.saved === "string") &&
    Array.isArray(s.folders) &&
    Array.isArray(s.openTabs) &&
    Array.isArray(s.everOpened) &&
    typeof s.runCount === "number" &&
    typeof s.saveCount === "number" &&
    typeof s.starterHeading === "string"
  );
}
