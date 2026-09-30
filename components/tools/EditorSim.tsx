"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Braces,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  CircleX,
  File as FileIcon,
  FileCode,
  FilePlus,
  FileText,
  Files,
  FolderPlus,
  GitBranch,
  Hash,
  Info,
  Moon,
  Pencil,
  Play,
  RotateCw,
  SaveAll,
  Search,
  Sun,
  Trash2,
  TriangleAlert,
  X,
  Ban,
  CaseSensitive,
} from "lucide-react";
import ToolShell, { embedMissions, type ToolEmbed } from "@/components/tools/ToolShell";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  allFolders,
  appendConsole,
  baseName,
  clearConsole,
  closeTab,
  createFile,
  createFolder,
  createInitialState,
  cursorPosition,
  deletePath,
  dirName,
  editFile,
  getFile,
  isDirty,
  isEditorState,
  joinPath,
  languageOf,
  markClick,
  offsetOfLine,
  relocalize,
  openFile,
  recordSearch,
  renamePath,
  resolvePath,
  saveAll,
  saveFile,
  searchFiles,
  startRun,
  buildTree,
  type EditorState,
  type Language,
  type OpError,
  type OpResult,
  type TreeNode,
} from "@/lib/tools/editor/engine";
import { buildSrcDoc, isShimMessage, missingFileMessage, notFoundMessage } from "@/lib/tools/editor/srcdoc";
import { validateProject, type Problem } from "@/lib/tools/editor/validate";
import { highlight, type TokenKind } from "@/lib/tools/editor/highlight";
import { EDITOR_MISSIONS, headingOf } from "@/lib/tools/editor/missions";
import { TOOL_STORAGE } from "@/lib/tools/progress";

const STORAGE_KEY = TOOL_STORAGE.editor;
const LINE_H = 20;
const PAD_Y = 8;

type ThemeMode = "auto" | "light" | "dark";

interface Box {
  editor: EditorState;
  done: string[];
}

interface Saved {
  editor: EditorState;
  done: string[];
  theme: ThemeMode;
}

function withDone(done: string[], editor: EditorState): string[] {
  const next = EDITOR_MISSIONS.filter((m) => done.includes(m.id) || m.check(editor)).map((m) => m.id);
  return next.length === done.length ? done : next;
}

// --------------------------------------------------------------------------
// Giao diện kiểu VS Code: một bảng màu tối (Dark Modern) và một bảng sáng
// (Light Modern). Viết thành hai bộ class riêng thay vì cặp `dark:` vì trình
// soạn có nút đổi giao diện của chính nó, độc lập với giao diện của app.

const DARK = {
  frame: "border-[#2b2b2b] bg-[#1f1f1f] text-[#cccccc]",
  titleBar: "bg-[#181818] border-[#2b2b2b] text-[#9d9d9d]",
  activity: "bg-[#181818] border-[#2b2b2b]",
  activityIcon: "text-[#868686] hover:text-[#d7d7d7]",
  activityActive: "text-[#d7d7d7] border-[#0078d4]",
  sidebar: "bg-[#181818] border-[#2b2b2b]",
  sidebarHeader: "text-[#cccccc]",
  row: "hover:bg-[#2a2d2e]",
  rowActive: "bg-[#37373d]",
  rowFocus: "outline-[#0078d4]",
  muted: "text-[#9d9d9d]",
  faint: "text-[#6e7681]",
  input: "bg-[#313131] border-[#3c3c3c] text-[#cccccc] placeholder:text-[#8b8b8b] focus:border-[#0078d4]",
  tabsBar: "bg-[#181818] border-[#2b2b2b]",
  tab: "bg-[#181818] text-[#9d9d9d] border-[#2b2b2b] hover:bg-[#1f1f1f]",
  tabActive: "bg-[#1f1f1f] text-[#ffffff] border-t-[#0078d4] border-[#2b2b2b]",
  editor: "bg-[#1f1f1f]",
  gutter: "text-[#6e7681]",
  gutterActive: "text-[#cccccc]",
  currentLine: "bg-[#ffffff0a] border-[#282828]",
  caret: "#aeafad",
  selection: "selection:bg-[#264f78]",
  panel: "bg-[#181818] border-[#2b2b2b]",
  panelTab: "text-[#9d9d9d] hover:text-[#cccccc]",
  panelTabActive: "text-[#e7e7e7] border-[#0078d4]",
  badge: "bg-[#616161] text-[#ffffff]",
  statusBar: "bg-[#007acc] text-[#ffffff]",
  statusItem: "hover:bg-[#ffffff1f]",
  errorRow: "bg-[#5a1d1d66] text-[#f48771] border-[#5a1d1d]",
  warnRow: "bg-[#332b0066] text-[#cca700] border-[#4d3f00]",
  logRow: "border-[#2b2b2b] text-[#cccccc]",
  error: "text-[#f14c4c]",
  warn: "text-[#cca700]",
  info: "text-[#3794ff]",
  mark: "bg-[#9e6a03aa] text-inherit",
  errorBox: "bg-[#5a1d1d] border-[#be1100] text-[#cccccc]",
  button: "bg-[#0078d4] text-[#ffffff] hover:bg-[#026ec1]",
  iconBtn: "text-[#cccccc] hover:bg-[#ffffff1a]",
  dirty: "bg-[#cccccc]",
  welcome: "text-[#6e7681]",
  kbd: "bg-[#ffffff14] border-[#ffffff1f] text-[#cccccc]",
};

type Palette = typeof DARK;

const LIGHT: Palette = {
  frame: "border-[#e5e5e5] bg-[#ffffff] text-[#3b3b3b]",
  titleBar: "bg-[#f8f8f8] border-[#e5e5e5] text-[#616161]",
  activity: "bg-[#f8f8f8] border-[#e5e5e5]",
  activityIcon: "text-[#7f7f7f] hover:text-[#1f1f1f]",
  activityActive: "text-[#1f1f1f] border-[#005fb8]",
  sidebar: "bg-[#f8f8f8] border-[#e5e5e5]",
  sidebarHeader: "text-[#3b3b3b]",
  row: "hover:bg-[#f2f2f2]",
  rowActive: "bg-[#e4e6f1]",
  rowFocus: "outline-[#005fb8]",
  muted: "text-[#616161]",
  faint: "text-[#8b8b8b]",
  input: "bg-[#ffffff] border-[#cecece] text-[#3b3b3b] placeholder:text-[#8b8b8b] focus:border-[#005fb8]",
  tabsBar: "bg-[#f8f8f8] border-[#e5e5e5]",
  tab: "bg-[#f8f8f8] text-[#616161] border-[#e5e5e5] hover:bg-[#ffffff]",
  tabActive: "bg-[#ffffff] text-[#3b3b3b] border-t-[#005fb8] border-[#e5e5e5]",
  editor: "bg-[#ffffff]",
  gutter: "text-[#6e7681]",
  gutterActive: "text-[#171184]",
  currentLine: "bg-[#0000000a] border-[#eeeeee]",
  caret: "#000000",
  selection: "selection:bg-[#add6ff]",
  panel: "bg-[#f8f8f8] border-[#e5e5e5]",
  panelTab: "text-[#616161] hover:text-[#3b3b3b]",
  panelTabActive: "text-[#3b3b3b] border-[#005fb8]",
  badge: "bg-[#cccccc] text-[#3b3b3b]",
  statusBar: "bg-[#005fb8] text-[#ffffff]",
  statusItem: "hover:bg-[#ffffff1f]",
  errorRow: "bg-[#fdecec] text-[#a1260d] border-[#f5c2c2]",
  warnRow: "bg-[#fff8e1] text-[#8a6d00] border-[#f0e0a8]",
  logRow: "border-[#eeeeee] text-[#3b3b3b]",
  error: "text-[#e51400]",
  warn: "text-[#bf8803]",
  info: "text-[#1a85ff]",
  mark: "bg-[#ffd33d99] text-inherit",
  errorBox: "bg-[#f2dede] border-[#be1100] text-[#3b3b3b]",
  button: "bg-[#005fb8] text-[#ffffff] hover:bg-[#0258a8]",
  iconBtn: "text-[#3b3b3b] hover:bg-[#0000000f]",
  dirty: "bg-[#3b3b3b]",
  welcome: "text-[#8b8b8b]",
  kbd: "bg-[#0000000a] border-[#0000001f] text-[#3b3b3b]",
};

const SYNTAX_DARK: Record<TokenKind, string> = {
  plain: "text-[#d4d4d4]",
  comment: "text-[#6a9955]",
  string: "text-[#ce9178]",
  keyword: "text-[#569cd6]",
  number: "text-[#b5cea8]",
  tag: "text-[#569cd6]",
  attr: "text-[#9cdcfe]",
  punct: "text-[#808080]",
  property: "text-[#9cdcfe]",
  selector: "text-[#d7ba7d]",
  function: "text-[#dcdcaa]",
  heading: "text-[#569cd6] font-bold",
};

const SYNTAX_LIGHT: Record<TokenKind, string> = {
  plain: "text-[#3b3b3b]",
  comment: "text-[#008000]",
  string: "text-[#a31515]",
  keyword: "text-[#0000ff]",
  number: "text-[#098658]",
  tag: "text-[#800000]",
  attr: "text-[#e50000]",
  punct: "text-[#800000]",
  property: "text-[#e50000]",
  selector: "text-[#800000]",
  function: "text-[#795e26]",
  heading: "text-[#0000ff] font-bold",
};

function subscribeDarkClass(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

function LangIcon({ lang, className }: { lang: Language; className?: string }) {
  const cls = `h-3.5 w-3.5 shrink-0 ${className ?? ""}`;
  switch (lang) {
    case "html":
      return <FileCode className={`${cls} text-[#e37933]`} />;
    case "css":
      return <Hash className={`${cls} text-[#519aba]`} />;
    case "javascript":
    case "json":
      return <Braces className={`${cls} text-[#cbcb41]`} />;
    case "markdown":
      return <Info className={`${cls} text-[#519aba]`} />;
    default:
      return <FileText className={`${cls} opacity-70`} />;
  }
}

// --------------------------------------------------------------------------

export default function EditorSim({ embed }: { embed?: ToolEmbed }) {
  const embedded = !!embed;
  const { t } = useI18n();
  const c = t.toolEditor;

  const [box, setBox] = useState<Box>(() => ({ editor: createInitialState(c.starter), done: [] }));
  const [loaded, setLoaded] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const appDark = useSyncExternalStore(
    subscribeDarkClass,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
  const dark = themeMode === "auto" ? appDark : themeMode === "dark";
  const P = dark ? DARK : LIGHT;
  const SYN = dark ? SYNTAX_DARK : SYNTAX_LIGHT;

  const [view, setView] = useState<"explorer" | "search">("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [creating, setCreating] = useState<{ kind: "file" | "folder"; parent: string } | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [opError, setOpError] = useState<OpError | null>(null);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [query, setQuery] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [panel, setPanel] = useState<"problems" | "console">("console");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [srcDoc, setSrcDoc] = useState("");
  const [runToken, setRunToken] = useState("");
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const [jumpTick, setJumpTick] = useState(0);

  const editor = box.editor;
  const active = editor.active ? getFile(editor, editor.active) : undefined;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const jumpRef = useRef<{ line: number; col: number } | null>(null);
  const runRef = useRef<{ token: string; runId: number; entry: string } | null>(null);
  const editorRef = useRef(editor);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Tab vừa mở luôn nằm trong tầm nhìn của thanh tab, như VS Code.
  useEffect(() => {
    const bar = tabsRef.current;
    if (!bar || !editor.active) return;
    const el = [...bar.querySelectorAll<HTMLElement>("[data-tab]")].find((n) => n.dataset.tab === editor.active);
    if (!el) return;
    if (el.offsetLeft < bar.scrollLeft) bar.scrollLeft = el.offsetLeft;
    else if (el.offsetLeft + el.offsetWidth > bar.scrollLeft + bar.clientWidth)
      bar.scrollLeft = el.offsetLeft + el.offsetWidth - bar.clientWidth;
  }, [editor.active, editor.openTabs]);

  const apply = useCallback((fn: (s: EditorState) => EditorState) => {
    setBox((b) => {
      const next = fn(b.editor);
      return next === b.editor ? b : { editor: next, done: withDone(b.done, next) };
    });
  }, []);

  // ---- lưu trữ --------------------------------------------------------------

  useEffect(() => {
    if (embedded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- bản nhúng bắt đầu từ dự án mẫu, không đọc tiến độ của /cong-cu
      setLoaded(true);
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Saved>;
        if (isEditorState(saved.editor)) {
          const ed = saved.editor;
          const done = Array.isArray(saved.done) ? saved.done.filter((d) => typeof d === "string") : [];
          setBox({ editor: ed, done: withDone(done, ed) });
        }
        if (saved.theme === "light" || saved.theme === "dark" || saved.theme === "auto") setThemeMode(saved.theme);
      }
    } catch {
      // localStorage bị chặn hoặc dữ liệu hỏng: bắt đầu từ dự án mẫu.
    }
    setLoaded(true);
  }, [embedded]);

  useEffect(() => {
    if (!loaded || embedded) return;
    try {
      const payload: Saved = { editor: box.editor, done: box.done, theme: themeMode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Không lưu được thì thôi - công cụ vẫn chạy trong phiên này.
    }
  }, [box, themeMode, loaded, embedded]);

  // Lần render đầu dùng ngôn ngữ mặc định; nếu người đọc dùng tiếng Anh thì
  // ngôn ngữ đổi ngay sau đó. Dự án mẫu chưa bị đụng tới thì đổi theo.
  useEffect(() => {
    if (!loaded) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- đồng bộ dự án mẫu với ngôn ngữ vừa đổi, chỉ khi người học chưa sửa gì
    setBox((b) => {
      const next = relocalize(b.editor, c.starter);
      return next === b.editor ? b : { ...b, editor: next };
    });
  }, [c.starter, loaded]);

  const reset = () => {
    setBox({ editor: createInitialState(c.starter), done: [] });
    setPreviewOpen(false);
    setSrcDoc("");
    runRef.current = null;
    setRunToken("");
    setQuery("");
    setCollapsed([]);
    setCreating(null);
    setRenaming(null);
    setOpError(null);
    setCursor({ line: 1, col: 1 });
  };

  // ---- chạy -----------------------------------------------------------------

  const run = useCallback(
    (entry = "index.html") => {
      const started = startRun(editorRef.current, entry);
      const runId = started.lastRun!.id;
      const token = `run-${runId}-${Math.random().toString(36).slice(2)}`;
      const built = buildSrcDoc(started.files, entry, token);
      let next = started;
      if (!getFile(started, entry)) {
        next = appendConsole(next, runId, { level: "error", source: "runtime", text: notFoundMessage(entry) });
      }
      for (const miss of built.missing) {
        next = appendConsole(next, runId, { level: "error", source: "runtime", text: missingFileMessage(miss) });
      }
      runRef.current = { token, runId, entry };
      apply(() => next);
      setSrcDoc(built.html);
      setRunToken(token);
      setPreviewOpen(true);
      setPanel("console");
    },
    [apply],
  );

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const cur = runRef.current;
      if (!cur || e.source !== iframeRef.current?.contentWindow || !isShimMessage(e.data, cur.token)) return;
      const msg = e.data;
      if (msg.type === "console") {
        apply((s) =>
          appendConsole(s, cur.runId, {
            level: msg.level ?? "log",
            source: msg.source ?? "console",
            text: String(msg.text ?? ""),
            file: msg.file,
            line: msg.line,
          }),
        );
      } else if (msg.type === "click") {
        apply((s) => markClick(s, cur.runId));
      } else if (msg.type === "navigate" && msg.href) {
        const target = resolvePath(cur.entry, msg.href);
        if (target === null) return;
        if (getFile(editorRef.current, target) && languageOf(target) === "html") run(target);
        else apply((s) => appendConsole(s, cur.runId, { level: "error", source: "runtime", text: notFoundMessage(target) }));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [apply, run]);

  // ---- điều hướng trong tệp ------------------------------------------------

  const charWidth = () => measureRef.current?.getBoundingClientRect().width || 7.8;

  const ensureVisible = useCallback((line: number, col: number) => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const top = PAD_Y + (line - 1) * LINE_H;
    if (top < sc.scrollTop) sc.scrollTop = top - PAD_Y;
    else if (top + LINE_H > sc.scrollTop + sc.clientHeight) sc.scrollTop = top + LINE_H - sc.clientHeight + PAD_Y;
    const gutterW = 56;
    const x = gutterW + 12 + (col - 1) * charWidth();
    if (x < sc.scrollLeft + gutterW + 12) sc.scrollLeft = Math.max(0, x - gutterW - 24);
    else if (x > sc.scrollLeft + sc.clientWidth - 24) sc.scrollLeft = x - sc.clientWidth + 48;
  }, []);

  const syncCursor = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = cursorPosition(ta.value, ta.selectionEnd);
    setCursor(pos);
    ensureVisible(pos.line, pos.col);
  };

  const openAt = (path: string, line?: number, col = 1) => {
    apply((s) => openFile(s, path));
    if (line) {
      jumpRef.current = { line, col };
      setCursor({ line, col });
      setJumpTick((n) => n + 1);
    } else {
      setCursor({ line: 1, col: 1 });
    }
  };

  useEffect(() => {
    const jump = jumpRef.current;
    const ta = textareaRef.current;
    if (!jump || !ta) return;
    jumpRef.current = null;
    const off = Math.min(ta.value.length, offsetOfLine(ta.value, jump.line) + jump.col - 1);
    ta.focus();
    ta.setSelectionRange(off, off);
    ensureVisible(jump.line, jump.col);
  }, [jumpTick, ensureVisible]);

  // ---- phím tắt -------------------------------------------------------------

  const onRootKeyDown = (e: React.KeyboardEvent) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (e.altKey) apply(saveAll);
      else if (editor.active) {
        const path = editor.active;
        apply((s) => saveFile(s, path));
      }
    } else if (mod && e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (mod && e.shiftKey && e.key.toLowerCase() === "f") {
      e.preventDefault();
      setView("search");
      setSidebarOpen(true);
    }
  };

  const onEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    if (!active) return;
    const { selectionStart: a, selectionEnd: b, value } = ta;
    let insert: string | null = null;
    if (e.key === "Tab" && !e.shiftKey && !e.metaKey && !e.ctrlKey) insert = "  ";
    else if (e.key === "Enter" && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const lineStart = value.lastIndexOf("\n", a - 1) + 1;
      const before = value.slice(lineStart, a);
      const indent = /^[ \t]*/.exec(before)?.[0] ?? "";
      // Sau "{", "(" hoặc một thẻ HTML vừa mở thì thụt thêm một bậc, như VS Code.
      const opensTag = /<[a-zA-Z][\w-]*[^>]*>\s*$/.test(before) && !/(<\/[^>]*>|\/>)\s*$/.test(before);
      const opens = /[{[(]\s*$/.test(before) || opensTag;
      insert = "\n" + indent + (opens ? "  " : "");
    }
    if (insert === null) return;
    e.preventDefault();
    const next = value.slice(0, a) + insert + value.slice(b);
    const path = active.path;
    apply((s) => editFile(s, path, next));
    const caret = a + insert.length;
    requestAnimationFrame(() => {
      ta.setSelectionRange(caret, caret);
      syncCursor();
    });
  };

  // ---- Explorer -------------------------------------------------------------

  const tree = useMemo(() => buildTree(editor), [editor]);
  const problems = useMemo(() => validateProject(editor.files), [editor.files]);
  const problemsByFile = useMemo(() => {
    const m = new Map<string, { errors: number; warnings: number }>();
    for (const p of problems) {
      const cur = m.get(p.path) ?? { errors: 0, warnings: 0 };
      if (p.severity === "error") cur.errors++;
      else cur.warnings++;
      m.set(p.path, cur);
    }
    return m;
  }, [problems]);
  const errorCount = problems.filter((p) => p.severity === "error").length;
  const warnCount = problems.length - errorCount;

  const startCreate = (kind: "file" | "folder") => {
    setView("explorer");
    setSidebarOpen(true);
    setRenaming(null);
    setCreating({ kind, parent: selectedFolder });
    setCollapsed((cs) => cs.filter((x) => x !== selectedFolder));
    setDraft("");
    setOpError(null);
  };

  const commitCreate = () => {
    if (!creating) return;
    if (!draft.trim()) {
      setCreating(null);
      setOpError(null);
      return;
    }
    const target = joinPath(creating.parent, draft);
    const res: OpResult =
      creating.kind === "file" ? createFile(editor, target) : createFolder(editor, target);
    if (res.error) {
      setOpError(res.error);
      return;
    }
    apply(() => res.state);
    if (creating.kind === "folder") setSelectedFolder(target.replace(/^\/+|\/+$/g, ""));
    else setCursor({ line: 1, col: 1 });
    setCreating(null);
    setOpError(null);
  };

  const startRename = (path: string) => {
    setCreating(null);
    setRenaming(path);
    setDraft(baseName(path));
    setOpError(null);
  };

  const commitRename = () => {
    if (!renaming) return;
    const target = joinPath(dirName(renaming), draft);
    const res = renamePath(editor, renaming, target);
    if (res.error) {
      setOpError(res.error);
      return;
    }
    apply(() => res.state);
    setRenaming(null);
    setOpError(null);
  };

  const remove = (path: string) => {
    if (!window.confirm(format(c.confirmDelete, { name: baseName(path) }))) return;
    const res = deletePath(editor, path);
    if (!res.error) apply(() => res.state);
    if (selectedFolder === path || selectedFolder.startsWith(`${path}/`)) setSelectedFolder("");
  };

  const toggleFolder = (path: string) => {
    setSelectedFolder(path);
    setCollapsed((cs) => (cs.includes(path) ? cs.filter((x) => x !== path) : [...cs, path]));
  };

  const nameInput = (onCommit: () => void, onCancel: () => void, placeholder: string, depth: number) => (
    <div style={{ paddingLeft: 8 + depth * 12 }} className="pr-2 py-0.5">
      <input
        autoFocus
        value={draft}
        placeholder={placeholder}
        onChange={(e) => {
          setDraft(e.target.value);
          setOpError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onCommit();
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        onBlur={() => (opError ? onCancel() : onCommit())}
        className={`w-full rounded-none border px-1.5 py-0.5 font-sans text-[13px] outline-none ${P.input}`}
        spellCheck={false}
      />
      {opError && <p className={`mt-0.5 border px-1.5 py-1 text-[11px] leading-snug ${P.errorBox}`}>{c.opErrors[opError]}</p>}
    </div>
  );

  const cancelCreate = () => {
    setCreating(null);
    setOpError(null);
  };
  const cancelRename = () => {
    setRenaming(null);
    setOpError(null);
  };

  const renderNodes = (nodes: TreeNode[], depth: number, parent: string): React.ReactNode => (
    <>
      {creating && creating.parent === parent && creating.kind === "folder" &&
        nameInput(commitCreate, cancelCreate, c.newFolderPlaceholder, depth)}
      {nodes.map((n) => {
        if (renaming === n.path) return <div key={n.path}>{nameInput(commitRename, cancelRename, n.name, depth)}</div>;
        const isFolder = n.kind === "folder";
        const open = isFolder && !collapsed.includes(n.path);
        const file = isFolder ? undefined : getFile(editor, n.path);
        const probs = problemsByFile.get(n.path);
        const isActive = !isFolder && editor.active === n.path;
        const tone = probs?.errors ? P.error : probs?.warnings ? P.warn : "";
        return (
          <div key={n.path}>
            <div
              role="treeitem"
              aria-selected={isActive}
              aria-expanded={isFolder ? open : undefined}
              tabIndex={0}
              onClick={() => (isFolder ? toggleFolder(n.path) : (openAt(n.path), setSelectedFolder(dirName(n.path))))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (isFolder) toggleFolder(n.path);
                  else openAt(n.path);
                } else if (e.key === "F2") {
                  e.preventDefault();
                  startRename(n.path);
                } else if (e.key === "Delete") {
                  e.preventDefault();
                  remove(n.path);
                }
              }}
              style={{ paddingLeft: 8 + depth * 12 }}
              className={`group flex h-[22px] cursor-pointer select-none items-center gap-1 pr-1.5 text-[13px] focus:outline focus:outline-1 focus:-outline-offset-1 ${P.rowFocus} ${isActive ? P.rowActive : P.row}`}
            >
              {isFolder ? (
                open ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <span className="w-3.5 shrink-0" />
              )}
              {!isFolder && <LangIcon lang={languageOf(n.path)} />}
              <span className={`min-w-0 flex-1 truncate ${tone}`}>{n.name}</span>
              <span className="hidden shrink-0 items-center gap-0.5 group-hover:flex group-focus-within:flex">
                <button
                  type="button"
                  title={c.rename}
                  aria-label={c.rename}
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(n.path);
                  }}
                  className={`rounded p-0.5 ${P.iconBtn}`}
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  title={c.delete}
                  aria-label={c.delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(n.path);
                  }}
                  className={`rounded p-0.5 ${P.iconBtn}`}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
              {probs && (
                <span className={`shrink-0 text-[11px] tabular-nums group-hover:hidden ${tone}`}>
                  {probs.errors + probs.warnings}
                </span>
              )}
              {file && isDirty(file) && <span className={`h-2 w-2 shrink-0 rounded-full group-hover:hidden ${P.dirty}`} title={c.unsaved} />}
            </div>
            {isFolder && open && renderNodes(n.children, depth + 1, n.path)}
          </div>
        );
      })}
      {creating && creating.parent === parent && creating.kind === "file" &&
        nameInput(commitCreate, cancelCreate, c.newFilePlaceholder, depth)}
    </>
  );

  // ---- Search ---------------------------------------------------------------

  const results = useMemo(() => searchFiles(editor.files, query, matchCase), [editor.files, query, matchCase]);
  const resultsByFile = useMemo(() => {
    const m = new Map<string, typeof results>();
    for (const r of results) m.set(r.path, [...(m.get(r.path) ?? []), r]);
    return m;
  }, [results]);

  const onQuery = (q: string) => {
    setQuery(q);
    const n = searchFiles(editor.files, q, matchCase).length;
    apply((s) => recordSearch(s, q, n));
  };

  // ---- dữ liệu hiển thị ------------------------------------------------------

  const content = active?.content ?? "";
  const lines = content.split("\n");
  const maxCols = lines.reduce((m, l) => Math.max(m, l.length), 0);
  const activePath = active?.path ?? null;
  // Tô màu lại mỗi lần render: tệp mẫu vài chục dòng, rẻ hơn công giữ memo.
  const tokens = activePath ? highlight(content, languageOf(activePath)) : [];
  const lang = active ? languageOf(active.path) : null;
  const run0 = editor.lastRun;
  const consoleErrors = run0?.console.filter((e) => e.level === "error").length ?? 0;

  const missions = embedMissions(EDITOR_MISSIONS, embed).map((m) => {
    const copy = c.missions[m.id as keyof typeof c.missions];
    const labels = copy.criteria as Record<string, string>;
    return {
      id: m.id,
      title: copy.title,
      hint: copy.hint,
      from: copy.from,
      brief: copy.brief,
      done: box.done.includes(m.id),
      criteria: m.criteria.map((cr) => ({ id: cr.id, label: labels[cr.id] ?? cr.id, met: cr.check(editor) })),
    };
  });
  // Mỗi lần chạy có lỗi đỏ là một "lỗi" với Cơ Cơ; id lần chạy đổi nên hai lần
  // chạy lỗi liền nhau vẫn là hai lần.
  const errorKey = run0 && consoleErrors > 0 ? run0.id : 0;

  const renderArtifact = () => {
    const r = t.revampTools.editor;
    const heading = headingOf(run0?.snapshot[run0.entry]);
    const logs = (run0?.console ?? []).slice(-4);
    return (
      <div className="space-y-2">
        <div>
          <p className="text-[11px] font-bold text-ink-muted">{r.page}</p>
          {run0 ? (
            <p className="font-mono text-[11px] text-ink">
              {run0.entry}
              {heading && <span className="block font-sans text-sm font-bold text-ink-max">{format(r.heading, { text: heading })}</span>}
            </p>
          ) : (
            <p className="text-[11px] text-ink-faint">{r.noHeading}</p>
          )}
        </div>
        {logs.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-ink-muted">{r.console}</p>
            <div className="rounded-md bg-stone-950 px-2.5 py-2 font-mono text-[11px] leading-relaxed">
              {logs.map((e, i) => (
                <p key={i} className={`break-all ${e.level === "error" ? "text-red-300" : e.level === "warn" ? "text-amber-300" : "text-stone-200"}`}>
                  {e.text}
                </p>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className="text-[11px] font-bold text-ink-muted">{r.files}</p>
          <ul className="font-mono text-[11px]">
            {editor.files.map((f) => (
              <li key={f.path} className="flex justify-between gap-2 text-ink">
                <span className="min-w-0 truncate">{f.path}</span>
                <span className={f.content !== f.saved ? "text-warn-ink" : "text-cyan-700 dark:text-cyan-400"}>
                  {f.content !== f.saved ? r.unsaved : r.saved}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const problemText = (p: Problem) => format(c.problemMessages[p.code], p.params);

  const activityBtn = (id: "explorer" | "search", Icon: typeof Files, label: string) => {
    const on = view === id && sidebarOpen;
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={on}
        onClick={() => {
          if (view === id) setSidebarOpen((o) => !o);
          else {
            setView(id);
            setSidebarOpen(true);
          }
        }}
        className={`flex h-11 w-11 items-center justify-center border-transparent md:h-12 md:w-12 md:border-l-2 ${on ? P.activityActive : P.activityIcon} ${on ? "max-md:border-b-2" : ""}`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </button>
    );
  };

  const project = c.projectName;

  return (
    <ToolShell
      tool="editor"
      missions={missions}
      onReset={reset}
      ready={loaded}
      errorKey={errorKey}
      renderArtifact={renderArtifact}
      embed={embed}
    >
      <div
        onKeyDown={onRootKeyDown}
        className={`flex flex-col overflow-hidden rounded-xl border font-sans shadow-sm ${P.frame} ${embedded ? "md:h-[460px]" : "md:h-[680px]"}`}
      >
        {/* Thanh tiêu đề */}
        <div className={`flex h-9 shrink-0 items-center gap-2 border-b px-3 text-xs ${P.titleBar}`}>
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="min-w-0 flex-1 truncate text-center">
            {format(c.windowTitle, { file: active ? baseName(active.path) : c.welcomeTitle, project })}
          </span>
          <button
            type="button"
            onClick={() => run()}
            title={c.runTitle}
            className={`inline-flex shrink-0 items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${P.button}`}
          >
            <Play className="h-3 w-3 fill-current" />
            {c.run}
          </button>
          <button
            type="button"
            onClick={() => setThemeMode(dark ? "light" : "dark")}
            title={dark ? c.theme.toLight : c.theme.toDark}
            aria-label={dark ? c.theme.toLight : c.theme.toDark}
            className={`rounded p-1 ${P.iconBtn}`}
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Activity bar */}
          <div className={`flex shrink-0 border-b md:flex-col md:border-b-0 md:border-r ${P.activity}`}>
            {activityBtn("explorer", Files, c.explorer)}
            {activityBtn("search", Search, c.searchView)}
          </div>

          {/* Side bar */}
          {sidebarOpen && (
            <div className={`flex max-h-64 shrink-0 flex-col border-b md:max-h-none md:w-60 md:border-b-0 md:border-r ${P.sidebar}`}>
              <div className={`flex h-9 shrink-0 items-center px-4 text-[11px] font-normal uppercase tracking-wider ${P.sidebarHeader}`}>
                {view === "explorer" ? c.explorer : c.searchView}
              </div>

              {view === "explorer" ? (
                <div className="flex min-h-0 flex-1 flex-col" role="tree">
                  <div className={`group flex h-[22px] shrink-0 items-center gap-1 pl-1 pr-1.5 text-[11px] font-bold uppercase ${P.sidebarHeader}`}>
                    <ChevronDown className="h-3.5 w-3.5" />
                    <button type="button" onClick={() => setSelectedFolder("")} className="min-w-0 flex-1 truncate text-left">
                      {project}
                    </button>
                    {(
                      [
                        [c.newFile, FilePlus, () => startCreate("file")],
                        [c.newFolder, FolderPlus, () => startCreate("folder")],
                        [c.saveAll, SaveAll, () => apply(saveAll)],
                        [c.collapseAll, ChevronsDownUp, () => setCollapsed(allFolders(editor))],
                      ] as const
                    ).map(([label, Icon, onClick]) => (
                      <button
                        key={label}
                        type="button"
                        title={label}
                        aria-label={label}
                        onClick={onClick}
                        className={`rounded p-0.5 ${P.iconBtn}`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto pb-2">{renderNodes(tree, 1, "")}</div>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col px-3 pb-2">
                  <div className={`flex items-center border ${P.input}`}>
                    <input
                      value={query}
                      onChange={(e) => onQuery(e.target.value)}
                      placeholder={c.searchPlaceholder}
                      aria-label={c.searchPlaceholder}
                      spellCheck={false}
                      className="min-w-0 flex-1 bg-transparent px-1.5 py-1 text-[13px] outline-none"
                    />
                    <button
                      type="button"
                      title={c.matchCase}
                      aria-label={c.matchCase}
                      aria-pressed={matchCase}
                      onClick={() => setMatchCase((v) => !v)}
                      className={`m-0.5 rounded p-0.5 ${matchCase ? "bg-[#0078d466] text-[#ffffff]" : P.iconBtn}`}
                    >
                      <CaseSensitive className="h-4 w-4" />
                    </button>
                  </div>
                  <p className={`mt-2 text-[11px] ${P.muted}`}>
                    {!query
                      ? c.searchHint
                      : results.length
                        ? format(c.searchSummary, { count: results.length, files: resultsByFile.size })
                        : c.searchNone}
                  </p>
                  <div className="mt-1 min-h-0 flex-1 overflow-y-auto">
                    {[...resultsByFile].map(([path, rs]) => (
                      <div key={path} className="mb-1">
                        <div className={`flex h-[22px] items-center gap-1 text-[13px] ${P.row}`}>
                          <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                          <LangIcon lang={languageOf(path)} />
                          <span className="truncate">{baseName(path)}</span>
                          <span className={`truncate text-[11px] ${P.faint}`}>{dirName(path)}</span>
                          <span className={`ml-auto rounded-full px-1.5 text-[10px] ${P.badge}`}>{rs.length}</span>
                        </div>
                        {rs.map((r, i) => {
                          const start = Math.max(0, r.column - 1 - 20);
                          const pre = r.text.slice(start, r.column - 1).trimStart();
                          const hit = r.text.slice(r.column - 1, r.column - 1 + r.length);
                          const post = r.text.slice(r.column - 1 + r.length);
                          return (
                            <button
                              key={`${r.line}:${r.column}:${i}`}
                              type="button"
                              onClick={() => openAt(r.path, r.line, r.column)}
                              className={`block w-full truncate py-0.5 pl-9 pr-1 text-left text-[12px] ${P.row}`}
                            >
                              {start > 0 && "…"}
                              {pre}
                              <mark className={`rounded-sm ${P.mark}`}>{hit}</mark>
                              {post}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Vùng soạn + xem trước + panel */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className={`grid min-h-0 flex-1 ${previewOpen ? "md:grid-cols-2" : "grid-cols-1"}`}>
              {/* Nhóm soạn thảo */}
              <div className={`flex min-h-[340px] min-w-0 flex-col md:min-h-0 ${P.editor}`}>
                <div className={`flex h-9 shrink-0 items-stretch border-b ${P.tabsBar}`}>
                  <div ref={tabsRef} className="relative flex min-w-0 flex-1 overflow-x-auto">
                    {editor.openTabs.map((path) => {
                      const f = getFile(editor, path);
                      const on = editor.active === path;
                      const dirty = f ? isDirty(f) : false;
                      return (
                        <div
                          key={path}
                          data-tab={path}
                          className={`group flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-t-2 pl-3 pr-1.5 text-[13px] ${on ? P.tabActive : `${P.tab} border-t-transparent`}`}
                          onClick={() => openAt(path)}
                          onAuxClick={(e) => e.button === 1 && apply((s) => closeTab(s, path))}
                          title={path}
                        >
                          <LangIcon lang={languageOf(path)} />
                          <span className={problemsByFile.get(path)?.errors ? P.error : ""}>{baseName(path)}</span>
                          <button
                            type="button"
                            aria-label={dirty ? `${c.unsaved} - ${c.closeTab}` : c.closeTab}
                            title={c.closeTab}
                            onClick={(e) => {
                              e.stopPropagation();
                              apply((s) => closeTab(s, path));
                            }}
                            className={`relative flex h-5 w-5 items-center justify-center rounded ${P.iconBtn}`}
                          >
                            {dirty ? (
                              <>
                                <span className={`h-2 w-2 rounded-full group-hover:hidden ${P.dirty}`} />
                                <X className="hidden h-3.5 w-3.5 group-hover:block" />
                              </>
                            ) : (
                              <X className={`h-3.5 w-3.5 ${on ? "" : "opacity-0 group-hover:opacity-100"}`} />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {active ? (
                  <>
                    <div className={`flex h-[22px] shrink-0 items-center gap-1 px-3 text-[12px] ${P.muted}`}>
                      <span>{project}</span>
                      {active.path.split("/").map((seg, i, arr) => (
                        <span key={`${seg}-${i}`} className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {i === arr.length - 1 && <LangIcon lang={languageOf(active.path)} />}
                          {seg}
                        </span>
                      ))}
                    </div>
                    <div ref={scrollerRef} className="relative min-h-0 flex-1 overflow-auto">
                      <div className="flex min-h-full" style={{ minWidth: "100%" }}>
                        {/* Gutter */}
                        <div
                          aria-hidden
                          className={`sticky left-0 z-10 w-14 shrink-0 select-none pr-3 text-right font-mono text-[13px] ${P.editor}`}
                          style={{ paddingTop: PAD_Y, paddingBottom: PAD_Y, lineHeight: `${LINE_H}px` }}
                        >
                          {lines.map((_, i) => (
                            <div key={i} className={i + 1 === cursor.line ? P.gutterActive : P.gutter}>
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        {/* Mã */}
                        <div
                          className="relative flex-1 pl-3"
                          style={{ minWidth: `calc(${maxCols + 4}ch + 12px)`, height: lines.length * LINE_H + PAD_Y * 2 + 40 }}
                        >
                          <div
                            aria-hidden
                            className={`pointer-events-none absolute left-0 right-0 border-y ${P.currentLine}`}
                            style={{ top: PAD_Y + (cursor.line - 1) * LINE_H, height: LINE_H }}
                          />
                          <pre
                            aria-hidden
                            className="pointer-events-none relative m-0 whitespace-pre font-mono text-[13px]"
                            style={{ paddingTop: PAD_Y, lineHeight: `${LINE_H}px`, tabSize: 2 }}
                          >
                            {tokens.map((tk, i) => (
                              <span key={i} className={SYN[tk.kind]}>
                                {tk.text}
                              </span>
                            ))}
                            {"\n"}
                          </pre>
                          <textarea
                            ref={textareaRef}
                            value={content}
                            aria-label={format(c.editorAria, { file: active.path })}
                            wrap="off"
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            onChange={(e) => {
                              const v = e.target.value;
                              const path = active.path;
                              apply((s) => editFile(s, path, v));
                              syncCursor();
                            }}
                            onKeyDown={onEditorKeyDown}
                            onKeyUp={syncCursor}
                            onClick={syncCursor}
                            onSelect={syncCursor}
                            className={`absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre border-0 bg-transparent pl-3 font-mono text-[13px] text-transparent outline-none ${P.selection}`}
                            style={{ paddingTop: PAD_Y, lineHeight: `${LINE_H}px`, tabSize: 2, caretColor: P.caret }}
                          />
                          <span ref={measureRef} aria-hidden className="invisible absolute font-mono text-[13px]">
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center ${P.welcome}`}>
                    <FileIcon className="h-16 w-16 opacity-30" strokeWidth={1} />
                    <p className="text-sm">{c.welcomeOpen}</p>
                    <dl className="grid grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 text-xs">
                      {(
                        [
                          [c.welcomeSave, [c.keys.mod, "S"]],
                          [c.welcomeRun, [c.keys.mod, c.keys.enter]],
                          [c.welcomeSearch, [c.keys.mod, c.keys.shift, "F"]],
                        ] as const
                      ).map(([label, keys]) => (
                        <div key={label} className="contents">
                          <dt className="text-right">{label}</dt>
                          <dd className="flex gap-1">
                            {keys.map((k) => (
                              <kbd key={k} className={`rounded border px-1.5 py-0.5 font-mono text-[11px] ${P.kbd}`}>
                                {k}
                              </kbd>
                            ))}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              {/* Xem trước */}
              {previewOpen && (
                <div className={`flex min-h-[300px] min-w-0 flex-col border-t md:min-h-0 md:border-l md:border-t-0 ${P.tabsBar}`}>
                  <div className={`flex h-9 shrink-0 items-center gap-2 border-b px-3 text-[13px] ${P.tabsBar}`}>
                    <span className="min-w-0 flex-1 truncate">
                      {c.preview} <span className={P.muted}>- {run0?.entry}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => run(runRef.current?.entry ?? "index.html")}
                      title={c.reload}
                      aria-label={c.reload}
                      className={`rounded p-1 ${P.iconBtn}`}
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewOpen(false)}
                      title={c.closePreview}
                      aria-label={c.closePreview}
                      className={`rounded p-1 ${P.iconBtn}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {srcDoc ? (
                    <iframe
                      key={runToken}
                      ref={iframeRef}
                      title={c.previewTitle}
                      sandbox="allow-scripts"
                      srcDoc={srcDoc}
                      className="min-h-0 w-full flex-1 bg-white"
                    />
                  ) : (
                    <p className={`p-4 text-sm ${P.muted}`}>{c.previewEmpty}</p>
                  )}
                </div>
              )}
            </div>

            {/* Panel dưới */}
            <div className={`flex h-44 shrink-0 flex-col border-t ${P.panel}`}>
              <div className="flex h-8 shrink-0 items-center gap-4 px-3">
                {(
                  [
                    ["problems", c.problems, problems.length],
                    ["console", c.console, consoleErrors],
                  ] as const
                ).map(([id, label, count]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPanel(id)}
                    className={`flex h-full items-center gap-1.5 border-b text-[11px] uppercase tracking-wide ${panel === id ? P.panelTabActive : `border-transparent ${P.panelTab}`}`}
                  >
                    {label}
                    {count > 0 && <span className={`rounded-full px-1.5 text-[10px] ${P.badge}`}>{count}</span>}
                  </button>
                ))}
                <span className="flex-1" />
                {panel === "console" && (
                  <button
                    type="button"
                    onClick={() => apply(clearConsole)}
                    title={c.clearConsole}
                    aria-label={c.clearConsole}
                    className={`rounded p-1 ${P.iconBtn}`}
                  >
                    <Ban className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto font-mono text-[12px]">
                {panel === "problems" ? (
                  problems.length === 0 ? (
                    <p className={`px-3 py-1 font-sans ${P.muted}`}>{c.noProblems}</p>
                  ) : (
                    problems.map((p, i) => (
                      <button
                        key={`${p.path}:${p.line}:${i}`}
                        type="button"
                        onClick={() => openAt(p.path, p.line)}
                        className={`flex w-full items-center gap-2 px-3 py-0.5 text-left font-sans text-[13px] ${P.row}`}
                      >
                        {p.severity === "error" ? (
                          <CircleX className={`h-3.5 w-3.5 shrink-0 ${P.error}`} />
                        ) : (
                          <TriangleAlert className={`h-3.5 w-3.5 shrink-0 ${P.warn}`} />
                        )}
                        <span className="min-w-0 flex-1 truncate">{problemText(p)}</span>
                        <span className={`shrink-0 text-[12px] ${P.faint}`}>
                          {p.path}:{p.line}
                        </span>
                      </button>
                    ))
                  )
                ) : !run0 ? (
                  <p className={`px-3 py-1 font-sans ${P.muted}`}>{c.consoleEmpty}</p>
                ) : run0.console.length === 0 ? (
                  <p className={`px-3 py-1 font-sans ${P.muted}`}>{c.consoleRunning}</p>
                ) : (
                  run0.console.map((e, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 border-b px-3 py-0.5 ${e.level === "error" ? P.errorRow : e.level === "warn" ? P.warnRow : P.logRow}`}
                    >
                      {e.level === "error" ? (
                        <CircleX className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      ) : e.level === "warn" ? (
                        <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      ) : e.level === "info" ? (
                        <Info className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${P.info}`} />
                      ) : (
                        <span className="w-3.5 shrink-0" />
                      )}
                      <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">{e.text}</span>
                      {e.file && (
                        <button
                          type="button"
                          onClick={() => openAt(e.file!, e.line)}
                          className={`shrink-0 underline decoration-dotted ${P.faint}`}
                        >
                          {e.file}
                          {e.line ? `:${e.line}` : ""}
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thanh trạng thái */}
        <div className={`flex h-[22px] shrink-0 items-center overflow-hidden text-[12px] ${P.statusBar}`}>
          <span className={`flex h-full items-center gap-1 px-2 ${P.statusItem}`}>
            <GitBranch className="h-3.5 w-3.5" />
            {c.status.branch}
          </span>
          <button
            type="button"
            onClick={() => setPanel("problems")}
            title={`${c.status.errors}: ${errorCount}, ${c.status.warnings}: ${warnCount}`}
            className={`flex h-full items-center gap-1 px-2 ${P.statusItem}`}
          >
            <CircleX className="h-3.5 w-3.5" />
            {errorCount}
            <TriangleAlert className="ml-1 h-3.5 w-3.5" />
            {warnCount}
          </button>
          <span className="flex-1" />
          {active && (
            <>
              <span className={`flex h-full items-center px-2 ${P.statusItem}`}>
                {format(c.status.position, { line: cursor.line, col: cursor.col })}
              </span>
              <span className={`hidden h-full items-center px-2 sm:flex ${P.statusItem}`}>{c.status.spaces}</span>
              <span className={`hidden h-full items-center px-2 sm:flex ${P.statusItem}`}>{c.status.encoding}</span>
              <span className={`hidden h-full items-center px-2 sm:flex ${P.statusItem}`}>{c.status.eol}</span>
              {lang && <span className={`flex h-full items-center px-2 ${P.statusItem}`}>{c.languages[lang]}</span>}
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
