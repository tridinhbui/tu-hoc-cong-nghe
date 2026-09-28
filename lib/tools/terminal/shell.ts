/** Bộ máy shell mô phỏng: tách lệnh (nháy, ~, $BIẾN, glob, |, >, >>, &&, ;),
 *  chạy các lệnh Linux cơ bản trên hệ thống tệp trong bộ nhớ, và gợi ý Tab.
 *
 *  Thuần TypeScript, không React: `runLine` nhận trạng thái cũ, trả trạng thái
 *  mới (clone sâu) cùng các dòng cần in. */
/* i18n-ignore-start: đầu ra của chính bash và coreutils (thông báo lỗi kiểu
   "No such file or directory", bảng ls -l) - người đi làm gặp đúng những dòng
   tiếng Anh này trên máy thật và cần nhận ra chúng */
import {
  HOME,
  HOST,
  USER,
  baseName,
  ensureDir,
  getDir,
  getNode,
  globToRegExp,
  isExecutable,
  lookupError,
  lsSort,
  modeString,
  parentOf,
  removeNode,
  resolvePath,
  walkFiles,
  writeFile,
  mkDir,
} from "./fs";
import { BIN_COMMANDS, BUILTIN_COMMANDS } from "./seed";
import { GIT_SUBCOMMANDS, branchNames, git } from "./git";
import { DOCKER_SUBCOMMANDS, curl, docker } from "./docker";
import type { CmdResult, Ctx, DirNode, FsNode, NoticeId, OutputLine, RunResult, Span, TermState } from "./types";
import { formatLsDate, formatUnixDate, splitLines } from "./util";

// ------------------------------------------------------------- tách lệnh

type Token = { kind: "word"; value: string; glob: boolean } | { kind: "op"; value: string };

interface SimpleCommand {
  args: string[];
  globs: boolean[];
  redirect?: { path: string; append: boolean };
  input?: string;
}

interface Pipeline {
  cmds: SimpleCommand[];
  /** Nối với pipeline trước bằng `&&` hay `;`. */
  join: "&&" | ";" | "||";
}

function envValue(state: TermState, name: string): string {
  const env: Record<string, string> = { HOME, USER, PWD: state.cwd, SHELL: "/bin/bash", HOSTNAME: HOST, OLDPWD: state.oldCwd };
  return env[name] ?? "";
}

function tokenize(state: TermState, line: string): Token[] | string {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    if (ch === " " || ch === "\t") {
      i++;
      continue;
    }
    if (ch === "#") break;
    const two = line.slice(i, i + 2);
    if (two === "&&" || two === ">>" || two === "||") {
      tokens.push({ kind: "op", value: two });
      i += 2;
      continue;
    }
    if (ch === "|" || ch === ">" || ch === ";" || ch === "<") {
      tokens.push({ kind: "op", value: ch });
      i++;
      continue;
    }
    let value = "";
    let glob = false;
    let first = true;
    while (i < line.length && !" \t|><;".includes(line[i]) && line.slice(i, i + 2) !== "&&") {
      const c = line[i];
      if (c === "'") {
        const end = line.indexOf("'", i + 1);
        if (end < 0) return "bash: unexpected EOF while looking for matching `''";
        value += line.slice(i + 1, end);
        i = end + 1;
      } else if (c === '"') {
        let j = i + 1;
        let chunk = "";
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\" && j + 1 < line.length && '"\\$'.includes(line[j + 1])) {
            chunk += line[j + 1];
            j += 2;
          } else if (line[j] === "$") {
            const m = /^\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?/.exec(line.slice(j));
            if (m) {
              chunk += envValue(state, m[1]);
              j += m[0].length;
            } else chunk += line[j++];
          } else chunk += line[j++];
        }
        if (j >= line.length) return 'bash: unexpected EOF while looking for matching `"\'';
        value += chunk;
        i = j + 1;
      } else if (c === "\\" && i + 1 < line.length) {
        value += line[i + 1];
        i += 2;
      } else if (c === "$") {
        const m = /^\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?/.exec(line.slice(i));
        if (m) {
          value += envValue(state, m[1]);
          i += m[0].length;
        } else value += line[i++];
      } else if (c === "~" && first && (i + 1 >= line.length || " \t/".includes(line[i + 1]))) {
        value += HOME;
        i++;
      } else {
        if (c === "*" || c === "?") glob = true;
        value += c;
        i++;
      }
      first = false;
    }
    tokens.push({ kind: "word", value, glob });
  }
  return tokens;
}

function parse(tokens: Token[]): Pipeline[] | string {
  const pipelines: Pipeline[] = [];
  let join: Pipeline["join"] = ";";
  let cmds: SimpleCommand[] = [];
  let cur: SimpleCommand = { args: [], globs: [] };
  const finishCmd = () => {
    if (!cur.args.length) return false;
    cmds.push(cur);
    cur = { args: [], globs: [] };
    return true;
  };
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.kind === "word") {
      cur.args.push(t.value);
      cur.globs.push(t.glob);
      continue;
    }
    if (t.value === ">" || t.value === ">>" || t.value === "<") {
      const target = tokens[i + 1];
      if (!target || target.kind !== "word") return `bash: syntax error near unexpected token \`${target ? target.value : "newline"}'`;
      if (t.value === "<") cur.input = target.value;
      else cur.redirect = { path: target.value, append: t.value === ">>" };
      i++;
      continue;
    }
    if (t.value === "|") {
      if (!finishCmd()) return "bash: syntax error near unexpected token `|'";
      continue;
    }
    // && || ;
    if (!finishCmd() && !cmds.length) return `bash: syntax error near unexpected token \`${t.value}'`;
    pipelines.push({ cmds, join });
    cmds = [];
    join = t.value as Pipeline["join"];
  }
  finishCmd();
  if (cmds.length) pipelines.push({ cmds, join });
  return pipelines;
}

/** Mở rộng `*.txt`, `src/*` như bash; không khớp gì thì giữ nguyên chữ. */
function expandGlob(state: TermState, word: string): string[] {
  const slash = word.lastIndexOf("/");
  const dirPart = slash >= 0 ? word.slice(0, slash + 1) : "";
  const pattern = word.slice(slash + 1);
  if (/[*?]/.test(dirPart)) return [word];
  const dir = getDir(state.root, resolvePath(state.cwd, dirPart || "."));
  if (!dir) return [word];
  const re = globToRegExp(pattern);
  const hits = Object.keys(dir.children)
    .filter((n) => re.test(n) && (pattern.startsWith(".") || !n.startsWith(".")))
    .sort(lsSort)
    .map((n) => dirPart + n);
  return hits.length ? hits : [word];
}

// ------------------------------------------------------------- tiện ích

const ok = (out: string[] = [], rich?: Span[][]): CmdResult => ({ out, err: [], code: 0, rich });
const fail = (err: string[] | string, code = 1, out: string[] = []): CmdResult => ({
  out,
  err: Array.isArray(err) ? err : [err],
  code,
});

interface Flags {
  flags: Set<string>;
  rest: string[];
}

function parseFlags(args: string[]): Flags {
  const flags = new Set<string>();
  const rest: string[] = [];
  let done = false;
  for (const a of args) {
    if (done || a === "-" || !a.startsWith("-")) rest.push(a);
    else if (a === "--") done = true;
    else if (a.startsWith("--")) flags.add(a);
    else for (const ch of a.slice(1)) flags.add(ch);
  }
  return { flags, rest };
}

function toContent(lines: string[]): string {
  return lines.length ? lines.join("\n") + "\n" : "";
}

function notFound(cmd: string, p: string, verb = "cannot access"): string {
  return `${cmd}: ${verb} '${p}': No such file or directory`;
}

function readInput(ctx: Ctx, cmd: string, files: string[], stdin: string | undefined): { text: string[]; errs: string[] } {
  const text: string[] = [];
  const errs: string[] = [];
  if (!files.length) {
    if (stdin !== undefined) text.push(stdin);
    return { text, errs };
  }
  for (const f of files) {
    const node = getNode(ctx.state.root, resolvePath(ctx.state.cwd, f));
    if (!node) errs.push(`${cmd}: ${f}: No such file or directory`);
    else if (node.type === "dir") errs.push(`${cmd}: ${f}: Is a directory`);
    else text.push(node.content);
  }
  return { text, errs };
}

// ------------------------------------------------------------- lệnh

function cmdCd(ctx: Ctx, args: string[]): CmdResult {
  const s = ctx.state;
  if (args.length > 1) return fail("bash: cd: too many arguments");
  const arg = args[0];
  const target = arg === undefined ? HOME : arg === "-" ? s.oldCwd : resolvePath(s.cwd, arg);
  const err = lookupError(s.root, target);
  if (err) return fail(`bash: cd: ${arg}: ${err === "ENOENT" ? "No such file or directory" : "Not a directory"}`);
  if (!getDir(s.root, target)) return fail(`bash: cd: ${arg}: Not a directory`);
  s.oldCwd = s.cwd;
  s.cwd = target;
  return ok(arg === "-" ? [target] : []);
}

function lsLong(name: string, node: FsNode, sizeW: number, classify: boolean): { text: string; spans: Span[] } {
  const size = node.type === "dir" ? 4096 : node.content.length;
  const links = node.type === "dir" ? 2 + Object.values(node.children).filter((c) => c.type === "dir").length : 1;
  const suffix = classify ? (node.type === "dir" ? "/" : isExecutable(node) ? "*" : "") : "";
  const head = `${modeString(node)} ${links} ${USER} ${USER} ${String(size).padStart(sizeW)} ${formatLsDate(node.mtime)} `;
  const color = node.type === "dir" ? "dir" : isExecutable(node) ? "exec" : undefined;
  return { text: head + name + suffix, spans: [{ t: head }, { t: name, c: color }, { t: suffix }] };
}

function cmdLs(ctx: Ctx, args: string[]): CmdResult {
  const { flags, rest } = parseFlags(args);
  const long = flags.has("l");
  const all = flags.has("a");
  const almost = flags.has("A");
  const classify = flags.has("F");
  const targets = rest.length ? rest : ["."];
  const out: string[] = [];
  const rich: Span[][] = [];
  const err: string[] = [];
  const files: [string, FsNode][] = [];
  const dirs: [string, DirNode][] = [];
  for (const t of targets) {
    const node = getNode(ctx.state.root, resolvePath(ctx.state.cwd, t));
    if (!node) err.push(notFound("ls", t));
    else if (node.type === "dir") dirs.push([t, node]);
    else files.push([t, node]);
  }
  const emit = (entries: [string, FsNode][]) => {
    if (long) {
      const w = Math.max(1, ...entries.map(([, n]) => String(n.type === "dir" ? 4096 : n.content.length).length));
      for (const [name, node] of entries) {
        const l = lsLong(name, node, w, classify);
        out.push(l.text);
        rich.push(l.spans);
      }
    } else {
      const spans: Span[] = [];
      entries.forEach(([name, node], i) => {
        const suffix = classify ? (node.type === "dir" ? "/" : isExecutable(node) ? "*" : "") : "";
        out.push(name + suffix);
        if (i) spans.push({ t: "  " });
        spans.push({ t: name, c: node.type === "dir" ? "dir" : isExecutable(node) ? "exec" : undefined });
        if (suffix) spans.push({ t: suffix });
      });
      if (spans.length) rich.push(spans);
    }
  };
  if (files.length) emit(files.sort((a, b) => lsSort(a[0], b[0])));
  const multi = targets.length > 1;
  dirs.forEach(([label, dir], i) => {
    if (multi) {
      if (files.length || i) {
        out.push("");
        rich.push([{ t: "" }]);
      }
      out.push(`${label}:`);
      rich.push([{ t: `${label}:` }]);
    }
    let entries: [string, FsNode][] = Object.entries(dir.children)
      .filter(([n]) => all || almost || !n.startsWith("."))
      .sort((a, b) => lsSort(a[0], b[0]));
    if (all) {
      const parent = getDir(ctx.state.root, parentOf(resolvePath(ctx.state.cwd, label))) ?? dir;
      entries = [[".", dir], ["..", parent], ...entries];
    }
    if (long) {
      const blocks = entries.reduce((s, [, n]) => s + (n.type === "dir" ? 4 : Math.ceil(n.content.length / 4096) * 4), 0);
      out.push(`total ${blocks}`);
      rich.push([{ t: `total ${blocks}` }]);
    }
    emit(entries);
  });
  return { out, err, code: err.length ? 2 : 0, rich };
}

function cmdMkdir(ctx: Ctx, args: string[]): CmdResult {
  const { flags, rest } = parseFlags(args);
  if (!rest.length) return fail(["mkdir: missing operand", "Try 'mkdir --help' for more information."]);
  const err: string[] = [];
  for (const p of rest) {
    const abs = resolvePath(ctx.state.cwd, p);
    const existing = getNode(ctx.state.root, abs);
    if (flags.has("p")) {
      if (!ensureDir(ctx.state.root, abs, ctx.now)) err.push(`mkdir: cannot create directory '${p}': Not a directory`);
      continue;
    }
    if (existing) {
      err.push(`mkdir: cannot create directory '${p}': File exists`);
      continue;
    }
    const parent = getDir(ctx.state.root, parentOf(abs));
    if (!parent) {
      err.push(`mkdir: cannot create directory '${p}': No such file or directory`);
      continue;
    }
    parent.children[baseName(abs)] = mkDir(ctx.now);
    parent.mtime = ctx.now;
  }
  return { out: [], err, code: err.length ? 1 : 0 };
}

function cmdTouch(ctx: Ctx, args: string[]): CmdResult {
  const { rest } = parseFlags(args);
  if (!rest.length) return fail(["touch: missing file operand", "Try 'touch --help' for more information."]);
  const err: string[] = [];
  for (const p of rest) {
    const abs = resolvePath(ctx.state.cwd, p);
    const node = getNode(ctx.state.root, abs);
    if (node) node.mtime = ctx.now;
    else if (!writeFile(ctx.state.root, abs, "", ctx.now)) err.push(`touch: cannot touch '${p}': No such file or directory`);
  }
  return { out: [], err, code: err.length ? 1 : 0 };
}

function cmdCat(ctx: Ctx, args: string[], stdin?: string): CmdResult {
  const { flags, rest } = parseFlags(args);
  const { text, errs } = readInput(ctx, "cat", rest, stdin);
  let lines = splitLines(text.join(""));
  if (flags.has("n")) lines = lines.map((l, i) => `${String(i + 1).padStart(6)}\t${l}`);
  return { out: lines, err: errs, code: errs.length ? 1 : 0 };
}

function cmdEcho(args: string[]): CmdResult {
  let noNewline = false;
  let escapes = false;
  let i = 0;
  while (i < args.length && /^-[neE]+$/.test(args[i])) {
    if (args[i].includes("n")) noNewline = true;
    if (args[i].includes("e")) escapes = true;
    i++;
  }
  let text = args.slice(i).join(" ");
  if (escapes) text = text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
  void noNewline;
  return ok(text.split("\n"));
}

function cmdRm(ctx: Ctx, args: string[]): CmdResult {
  const { flags, rest } = parseFlags(args);
  const recursive = flags.has("r") || flags.has("R") || flags.has("--recursive");
  const force = flags.has("f") || flags.has("--force");
  if (!rest.length) return force ? ok() : fail(["rm: missing operand", "Try 'rm --help' for more information."]);
  const err: string[] = [];
  for (const p of rest) {
    const abs = resolvePath(ctx.state.cwd, p);
    if (abs === "/" && recursive) {
      err.push("rm: it is dangerous to operate recursively on '/'", "rm: use --no-preserve-root to override this failsafe");
      continue;
    }
    if (baseName(p) === "." || baseName(p) === "..") {
      err.push(`rm: refusing to remove '.' or '..' directory: skipping '${p}'`);
      continue;
    }
    const node = getNode(ctx.state.root, abs);
    if (!node) {
      if (!force) err.push(`rm: cannot remove '${p}': No such file or directory`);
      continue;
    }
    if (node.type === "dir" && !recursive) {
      err.push(`rm: cannot remove '${p}': Is a directory`);
      continue;
    }
    removeNode(ctx.state.root, abs);
  }
  // Thư mục hiện tại vừa bị xoá: lùi về thư mục cha gần nhất còn tồn tại.
  while (!getDir(ctx.state.root, ctx.state.cwd)) ctx.state.cwd = parentOf(ctx.state.cwd);
  return { out: [], err, code: err.length ? 1 : 0 };
}

function copyOrMove(ctx: Ctx, args: string[], mode: "cp" | "mv"): CmdResult {
  const { flags, rest } = parseFlags(args);
  const recursive = flags.has("r") || flags.has("R") || flags.has("a");
  if (!rest.length) return fail([`${mode}: missing file operand`, `Try '${mode} --help' for more information.`]);
  if (rest.length === 1) return fail([`${mode}: missing destination file operand after '${rest[0]}'`, `Try '${mode} --help' for more information.`]);
  const dest = rest[rest.length - 1];
  const sources = rest.slice(0, -1);
  const destAbs = resolvePath(ctx.state.cwd, dest);
  const destNode = getNode(ctx.state.root, destAbs);
  const destIsDir = destNode?.type === "dir";
  if (sources.length > 1 && !destIsDir) return fail(`${mode}: target '${dest}' is not a directory`);
  const err: string[] = [];
  for (const src of sources) {
    const srcAbs = resolvePath(ctx.state.cwd, src);
    const node = getNode(ctx.state.root, srcAbs);
    if (!node) {
      err.push(`${mode}: cannot stat '${src}': No such file or directory`);
      continue;
    }
    if (node.type === "dir" && mode === "cp" && !recursive) {
      err.push(`cp: -r not specified; omitting directory '${src}'`);
      continue;
    }
    const target = destIsDir ? `${destAbs === "/" ? "" : destAbs}/${baseName(srcAbs)}` : destAbs;
    if (target === srcAbs) {
      err.push(mode === "cp" ? `cp: '${src}' and '${dest}' are the same file` : `mv: '${src}' and '${dest}' are the same file`);
      continue;
    }
    if (node.type === "dir" && (target + "/").startsWith(srcAbs + "/")) {
      err.push(mode === "cp" ? `cp: cannot copy a directory, '${src}', into itself, '${dest}'` : `mv: cannot move '${src}' to a subdirectory of itself, '${dest}/${baseName(srcAbs)}'`);
      continue;
    }
    const parent = getDir(ctx.state.root, parentOf(target));
    if (!parent) {
      err.push(`${mode}: cannot create regular file '${dest}': No such file or directory`);
      continue;
    }
    const existing = parent.children[baseName(target)];
    if (existing?.type === "dir" && node.type === "file") {
      err.push(`${mode}: cannot overwrite directory '${dest}' with non-directory`);
      continue;
    }
    const copy: FsNode = structuredClone(node);
    copy.mtime = mode === "cp" ? ctx.now : node.mtime;
    parent.children[baseName(target)] = copy;
    parent.mtime = ctx.now;
    if (mode === "mv") removeNode(ctx.state.root, srcAbs);
  }
  while (!getDir(ctx.state.root, ctx.state.cwd)) ctx.state.cwd = parentOf(ctx.state.cwd);
  return { out: [], err, code: err.length ? 1 : 0 };
}

function cmdHeadTail(ctx: Ctx, args: string[], stdin: string | undefined, which: "head" | "tail"): CmdResult {
  let n = 10;
  const files: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-n") {
      const v = Number(args[++i]);
      if (!Number.isFinite(v)) return fail(`${which}: invalid number of lines: '${args[i] ?? ""}'`);
      n = v;
    } else if (/^-n\d+$/.test(a)) n = Number(a.slice(2));
    else if (/^-\d+$/.test(a)) n = Number(a.slice(1));
    else files.push(a);
  }
  const pick = (lines: string[]) => (which === "head" ? lines.slice(0, n) : n ? lines.slice(-n) : []);
  if (!files.length) return ok(pick(splitLines(stdin ?? "")));
  const out: string[] = [];
  const err: string[] = [];
  files.forEach((f) => {
    const { text, errs } = readInput(ctx, which, [f], undefined);
    if (errs.length) {
      err.push(errs[0].replace(`${which}: ${f}:`, `${which}: cannot open '${f}' for reading:`));
      return;
    }
    if (files.length > 1) {
      if (out.length) out.push("");
      out.push(`==> ${f} <==`);
    }
    out.push(...pick(splitLines(text[0])));
  });
  return { out, err, code: err.length ? 1 : 0 };
}

function cmdWc(ctx: Ctx, args: string[], stdin?: string): CmdResult {
  const { flags, rest } = parseFlags(args);
  let which = ["l", "w", "c"].filter((f) => flags.has(f));
  if (!which.length) which = ["l", "w", "c"];
  const count = (s: string) => ({ l: (s.match(/\n/g) ?? []).length, w: s.split(/\s+/).filter(Boolean).length, c: s.length });
  const rows: { nums: number[]; label: string }[] = [];
  const err: string[] = [];
  if (!rest.length) {
    const c = count(stdin ?? "");
    rows.push({ nums: which.map((k) => c[k as "l"]), label: "" });
  } else {
    const total = { l: 0, w: 0, c: 0 };
    for (const f of rest) {
      const { text, errs } = readInput(ctx, "wc", [f], undefined);
      if (errs.length) {
        err.push(errs[0]);
        continue;
      }
      const c = count(text[0]);
      total.l += c.l;
      total.w += c.w;
      total.c += c.c;
      rows.push({ nums: which.map((k) => c[k as "l"]), label: f });
    }
    if (rest.length > 1) rows.push({ nums: which.map((k) => total[k as "l"]), label: "total" });
  }
  const single = which.length === 1 && rows.length === 1;
  const w = single ? 0 : Math.max(...rows.flatMap((r) => r.nums.map((x) => String(x).length)));
  const out = rows.map((r) => [...r.nums.map((x) => String(x).padStart(w)), r.label].filter((x) => x !== "").join(" "));
  return { out, err, code: err.length ? 1 : 0 };
}

function grepRegExp(pattern: string, ignoreCase: boolean, word: boolean): RegExp {
  // grep cơ bản (BRE): + ? | ( ) { } là chữ thường, chỉ . * ^ $ [ ] là ký tự đặc biệt
  let src = pattern.replace(/[+?|(){}]/g, "\\$&");
  if (word) src = `\\b${src}\\b`;
  try {
    return new RegExp(src, ignoreCase ? "gi" : "g");
  } catch {
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ignoreCase ? "gi" : "g");
  }
}

function highlight(line: string, re: RegExp): Span[] {
  const spans: Span[] = [];
  let last = 0;
  re.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (!m[0].length) {
      re.lastIndex++;
      continue;
    }
    if (m.index > last) spans.push({ t: line.slice(last, m.index) });
    spans.push({ t: m[0], c: "match" });
    last = m.index + m[0].length;
  }
  if (last < line.length) spans.push({ t: line.slice(last) });
  return spans;
}

function cmdGrep(ctx: Ctx, args: string[], stdin?: string): CmdResult {
  const { flags, rest } = parseFlags(args);
  const pattern = rest[0];
  if (pattern === undefined) return fail(["Usage: grep [OPTION]... PATTERNS [FILE]...", "Try 'grep --help' for more information."], 2);
  const recursive = flags.has("r") || flags.has("R");
  const re = grepRegExp(pattern, flags.has("i"), flags.has("w"));
  const test = (l: string) => {
    re.lastIndex = 0;
    return re.test(l) !== flags.has("v");
  };
  let targets = rest.slice(1);
  if (!targets.length && recursive) targets = ["."];
  const sources: { label: string; content: string }[] = [];
  const err: string[] = [];
  if (!targets.length) sources.push({ label: "(standard input)", content: stdin ?? "" });
  for (const t of targets) {
    const abs = resolvePath(ctx.state.cwd, t);
    const node = getNode(ctx.state.root, abs);
    if (!node) err.push(`grep: ${t}: No such file or directory`);
    else if (node.type === "dir") {
      if (!recursive) err.push(`grep: ${t}: Is a directory`);
      else
        for (const rel of walkFiles(node, "", (r) => r.split("/").pop() === ".git")) {
          const f = getNode(ctx.state.root, `${abs}/${rel}`);
          const label = t === "." ? rel : `${t.replace(/\/$/, "")}/${rel}`;
          if (f?.type === "file") sources.push({ label, content: f.content });
        }
    } else sources.push({ label: t, content: node.content });
  }
  const prefix = sources.length > 1 || recursive;
  const out: string[] = [];
  const rich: Span[][] = [];
  let matched = 0;
  for (const src of sources) {
    const lines = splitLines(src.content);
    const hits = lines.map((l, i) => [l, i] as const).filter(([l]) => test(l));
    matched += hits.length;
    if (flags.has("l")) {
      if (hits.length) {
        out.push(src.label);
        rich.push([{ t: src.label, c: "link" }]);
      }
      continue;
    }
    if (flags.has("c")) {
      const t = prefix ? `${src.label}:${hits.length}` : String(hits.length);
      out.push(t);
      rich.push([{ t }]);
      continue;
    }
    for (const [l, i] of hits) {
      const spans: Span[] = [];
      let text = "";
      if (prefix) {
        spans.push({ t: src.label, c: "link" }, { t: ":", c: "muted" });
        text += `${src.label}:`;
      }
      if (flags.has("n")) {
        spans.push({ t: String(i + 1), c: "green" }, { t: ":", c: "muted" });
        text += `${i + 1}:`;
      }
      spans.push(...(flags.has("v") ? [{ t: l }] : highlight(l, re)));
      out.push(text + l);
      rich.push(spans);
    }
  }
  return { out, err, code: err.length && !matched ? 2 : matched ? 0 : 1, rich };
}

function cmdFind(ctx: Ctx, args: string[]): CmdResult {
  let start = ".";
  let i = 0;
  if (args[0] && !args[0].startsWith("-")) {
    start = args[0];
    i = 1;
  }
  let name: RegExp | null = null;
  let type: "f" | "d" | null = null;
  for (; i < args.length; i++) {
    const a = args[i];
    if (a === "-name" || a === "-iname") {
      const v = args[++i];
      if (v === undefined) return fail(`find: missing argument to \`${a}'`);
      const re = globToRegExp(v);
      name = a === "-iname" ? new RegExp(re.source, "i") : re;
    } else if (a === "-type") {
      const v = args[++i];
      if (v !== "f" && v !== "d") return fail(`find: Unknown argument to -type: ${v ?? ""}`);
      type = v;
    } else return fail(`find: unknown predicate \`${a}'`);
  }
  const abs = resolvePath(ctx.state.cwd, start);
  const root = getNode(ctx.state.root, abs);
  if (!root) return fail(`find: '${start}': No such file or directory`);
  const out: string[] = [];
  const visit = (node: FsNode, path: string, nm: string) => {
    const typeOk = !type || (type === "d" ? node.type === "dir" : node.type === "file");
    if (typeOk && (!name || name.test(nm))) out.push(path);
    if (node.type === "dir")
      for (const child of Object.keys(node.children).sort()) visit(node.children[child], `${path.replace(/\/$/, "")}/${child}`, child);
  };
  visit(root, start, baseName(abs));
  return ok(out);
}

function cmdTree(ctx: Ctx, args: string[]): CmdResult {
  const { flags, rest } = parseFlags(args);
  const start = rest[0] ?? ".";
  const node = getNode(ctx.state.root, resolvePath(ctx.state.cwd, start));
  if (!node || node.type !== "dir") return ok([`${start}  [error opening dir]`, "", "0 directories, 0 files"]);
  const rich: Span[][] = [[{ t: start, c: "dir" }]];
  let dirs = 0;
  let files = 0;
  const walk = (dir: DirNode, prefix: string) => {
    const names = Object.keys(dir.children)
      .filter((n) => flags.has("a") || !n.startsWith("."))
      .sort(lsSort);
    names.forEach((n, i) => {
      const last = i === names.length - 1;
      const child = dir.children[n];
      rich.push([{ t: prefix + (last ? "└── " : "├── ") }, { t: n, c: child.type === "dir" ? "dir" : isExecutable(child) ? "exec" : undefined }]);
      if (child.type === "dir") {
        dirs++;
        walk(child, prefix + (last ? "    " : "│   "));
      } else files++;
    });
  };
  walk(node, "");
  rich.push([{ t: "" }], [{ t: `${dirs} director${dirs === 1 ? "y" : "ies"}, ${files} file${files === 1 ? "" : "s"}` }]);
  return ok(rich.map((r) => r.map((s) => s.t).join("")), rich);
}

function parseMode(spec: string, current: number): number | null {
  if (/^[0-7]{3,4}$/.test(spec)) return parseInt(spec, 8) & 0o777;
  let mode = current;
  for (const clause of spec.split(",")) {
    const m = /^([ugoa]*)([+\-=])([rwx]*)$/.exec(clause);
    if (!m) return null;
    const who = m[1] === "" || m[1].includes("a") ? "ugo" : m[1];
    let bits = 0;
    for (const w of who) {
      const shift = w === "u" ? 6 : w === "g" ? 3 : 0;
      for (const p of m[3]) bits |= (p === "r" ? 4 : p === "w" ? 2 : 1) << shift;
    }
    if (m[2] === "+") mode |= bits;
    else if (m[2] === "-") mode &= ~bits;
    else {
      let mask = 0;
      for (const w of who) mask |= 7 << (w === "u" ? 6 : w === "g" ? 3 : 0);
      mode = (mode & ~mask) | bits;
    }
  }
  return mode;
}

function cmdChmod(ctx: Ctx, args: string[]): CmdResult {
  const recursive = args.includes("-R");
  const rest = args.filter((a) => a !== "-R");
  if (rest.length < 2) {
    return fail([rest.length ? `chmod: missing operand after '${rest[0]}'` : "chmod: missing operand", "Try 'chmod --help' for more information."]);
  }
  const [spec, ...files] = rest;
  if (parseMode(spec, 0) === null) return fail([`chmod: invalid mode: '${spec}'`, "Try 'chmod --help' for more information."]);
  const err: string[] = [];
  const apply = (node: FsNode) => {
    node.mode = parseMode(spec, node.mode) ?? node.mode;
    if (recursive && node.type === "dir") Object.values(node.children).forEach(apply);
  };
  for (const f of files) {
    const node = getNode(ctx.state.root, resolvePath(ctx.state.cwd, f));
    if (!node) err.push(notFound("chmod", f));
    else apply(node);
  }
  return { out: [], err, code: err.length ? 1 : 0 };
}

function cmdWhich(args: string[]): CmdResult {
  const out = args.filter((a) => BIN_COMMANDS.includes(a)).map((a) => `/usr/bin/${a}`);
  return { out, err: [], code: out.length === args.length && args.length ? 0 : 1 };
}

const EDITORS = ["nano", "vim", "vi", "code", "emacs", "gedit"];

// ------------------------------------------------------------- chạy

interface ExecOut {
  lines: OutputLine[];
  notices: NoticeId[];
  clear: boolean;
  code: number;
}

function plain(text: string, err = false): OutputLine {
  return { spans: [{ t: text }], err };
}

function runScript(ctx: Ctx, content: string, depth: number): CmdResult & { lines?: OutputLine[] } {
  const lines: OutputLine[] = [];
  let code = 0;
  for (const l of splitLines(content)) {
    if (!l.trim() || l.trim().startsWith("#")) continue;
    const res = execLine(ctx, l, depth + 1);
    lines.push(...res.lines);
    code = res.code;
  }
  return { out: [], err: [], code, lines };
}

function execSimple(ctx: Ctx, argv: string[], stdin: string | undefined, depth: number): CmdResult & { lines?: OutputLine[] } {
  let args = argv;
  if (args[0] === "sudo") {
    args = args.slice(1);
    if (!args.length) return fail(["usage: sudo -h | -K | -k | -V", "usage: sudo [-u user] command"]);
  }
  if (args[0] === "ll") args = ["ls", "-alF", ...args.slice(1)];
  const [cmd, ...rest] = args;
  const s = ctx.state;
  if (cmd.includes("/") || cmd === "bash" || cmd === "sh") {
    const scriptPath = cmd.includes("/") ? cmd : rest[0];
    if (!scriptPath) return ok();
    const node = getNode(s.root, resolvePath(s.cwd, scriptPath));
    if (!node) return fail(`bash: ${scriptPath}: No such file or directory`, 127);
    if (node.type === "dir") return fail(`bash: ${scriptPath}: Is a directory`, 126);
    if (cmd.includes("/") && !isExecutable(node)) return fail(`bash: ${scriptPath}: Permission denied`, 126);
    if (depth > 3) return ok();
    return runScript(ctx, node.content, depth);
  }
  switch (cmd) {
    case "pwd":
      return ok([s.cwd]);
    case "cd":
      return cmdCd(ctx, rest);
    case "ls":
      return cmdLs(ctx, rest);
    case "mkdir":
      return cmdMkdir(ctx, rest);
    case "touch":
      return cmdTouch(ctx, rest);
    case "cat":
      return cmdCat(ctx, rest, stdin);
    case "echo":
      return cmdEcho(rest);
    case "rm":
      return cmdRm(ctx, rest);
    case "rmdir": {
      const err: string[] = [];
      for (const p of rest) {
        const abs = resolvePath(s.cwd, p);
        const d = getNode(s.root, abs);
        if (!d) err.push(`rmdir: failed to remove '${p}': No such file or directory`);
        else if (d.type !== "dir") err.push(`rmdir: failed to remove '${p}': Not a directory`);
        else if (Object.keys(d.children).length) err.push(`rmdir: failed to remove '${p}': Directory not empty`);
        else removeNode(s.root, abs);
      }
      return { out: [], err, code: err.length ? 1 : 0 };
    }
    case "cp":
      return copyOrMove(ctx, rest, "cp");
    case "mv":
      return copyOrMove(ctx, rest, "mv");
    case "head":
      return cmdHeadTail(ctx, rest, stdin, "head");
    case "tail":
      return cmdHeadTail(ctx, rest, stdin, "tail");
    case "wc":
      return cmdWc(ctx, rest, stdin);
    case "grep":
      return cmdGrep(ctx, rest, stdin);
    case "find":
      return cmdFind(ctx, rest);
    case "tree":
      return cmdTree(ctx, rest);
    case "whoami":
      return ok([USER]);
    case "hostname":
      return ok([HOST]);
    case "date":
      return ok([formatUnixDate(ctx.now)]);
    case "history":
      if (rest[0] === "-c") {
        s.history = [];
        return ok();
      }
      return ok(s.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`));
    case "clear":
      return { out: [], err: [], code: 0, clear: true };
    case "chmod":
      return cmdChmod(ctx, rest);
    case "which":
      return cmdWhich(rest);
    case "help":
    case "man":
      return { out: [], err: [], code: 0, notices: ["help"] };
    case "git":
      return git(ctx, rest);
    case "docker":
      return docker(ctx, rest);
    case "curl":
      return curl(ctx, rest);
    default:
      if (EDITORS.includes(cmd)) return { out: [], err: [], code: 1, notices: ["noEditor"] };
      return fail(`${cmd}: command not found`, 127);
  }
}

function logName(args: string[]): string {
  const a = args[0] === "sudo" ? args.slice(1) : args;
  if ((a[0] === "git" || a[0] === "docker") && a[1]) return `${a[0]} ${a[1]}`;
  return a[0] ?? "";
}

function execLine(ctx: Ctx, line: string, depth: number): ExecOut {
  const res: ExecOut = { lines: [], notices: [], clear: false, code: 0 };
  const tokens = tokenize(ctx.state, line);
  if (typeof tokens === "string") {
    res.lines.push(plain(tokens, true));
    res.code = 2;
    return res;
  }
  const pipelines = parse(tokens);
  if (typeof pipelines === "string") {
    res.lines.push(plain(pipelines, true));
    res.code = 2;
    return res;
  }
  for (const pl of pipelines) {
    if (pl.join === "&&" && res.code !== 0) continue;
    if (pl.join === "||" && res.code === 0) continue;
    let stdin: string | undefined;
    for (let ci = 0; ci < pl.cmds.length; ci++) {
      const sc = pl.cmds[ci];
      const last = ci === pl.cmds.length - 1;
      const args = sc.args.flatMap((a, i) => (sc.globs[i] ? expandGlob(ctx.state, a) : [a]));
      if (sc.input !== undefined) {
        const node = getNode(ctx.state.root, resolvePath(ctx.state.cwd, sc.input));
        if (!node || node.type !== "file") {
          res.lines.push(plain(`bash: ${sc.input}: ${node ? "Is a directory" : "No such file or directory"}`, true));
          res.code = 1;
          break;
        }
        stdin = node.content;
      }
      const cwdBefore = ctx.state.cwd;
      const r = execSimple(ctx, args, stdin, depth);
      let code = r.code;
      if (r.lines) res.lines.push(...r.lines);
      for (const e of r.err) res.lines.push(plain(e, r.code !== 0));
      if (r.notices) res.notices.push(...r.notices);
      if (r.clear) {
        res.clear = true;
        res.lines = [];
      }
      if (sc.redirect) {
        const abs = resolvePath(ctx.state.cwd, sc.redirect.path);
        const node = getNode(ctx.state.root, abs);
        if (node?.type === "dir") {
          res.lines.push(plain(`bash: ${sc.redirect.path}: Is a directory`, true));
          code = 1;
        } else {
          const prev = sc.redirect.append && node?.type === "file" ? node.content : "";
          if (!writeFile(ctx.state.root, abs, prev + toContent(r.out), ctx.now)) {
            res.lines.push(plain(`bash: ${sc.redirect.path}: No such file or directory`, true));
            code = 1;
          }
        }
        stdin = "";
      } else if (last) {
        if (r.rich) res.lines.push(...r.rich.map((spans) => ({ spans })));
        else res.lines.push(...r.out.map((t) => plain(t)));
      } else {
        stdin = toContent(r.out);
      }
      ctx.state.log.push({ seq: ctx.state.seq, cmd: logName(args), cwd: cwdBefore, code, redirect: !!sc.redirect || undefined });
      res.code = code;
    }
  }
  if (ctx.state.log.length > 300) ctx.state.log = ctx.state.log.slice(-300);
  return res;
}

/** Chạy một dòng lệnh. Không sửa `state` cũ; trả trạng thái mới. */
export function runLine(state: TermState, line: string, now: number): { state: TermState; result: RunResult } {
  const next: TermState = structuredClone(state);
  const trimmed = line.trim();
  if (!trimmed) return { state: next, result: { lines: [], notices: [], code: 0 } };
  if (next.history[next.history.length - 1] !== trimmed) next.history.push(trimmed);
  if (next.history.length > 500) next.history = next.history.slice(-500);
  next.seq++;
  const ctx: Ctx = { state: next, now };
  const out = execLine(ctx, trimmed, 0);
  return { state: next, result: { lines: out.lines, clear: out.clear || undefined, notices: [...new Set(out.notices)], code: out.code } };
}

// ------------------------------------------------------------- Tab

export interface Completion {
  line: string;
  options: string[];
}

function commonPrefix(words: string[]): string {
  if (!words.length) return "";
  let p = words[0];
  for (const w of words) while (!w.startsWith(p)) p = p.slice(0, -1);
  return p;
}

export function complete(state: TermState, line: string): Completion {
  const m = /(\S*)$/.exec(line);
  const partial = m ? m[1] : "";
  const before = line.slice(0, line.length - partial.length);
  const words = before.trim() ? before.trim().split(/\s+/) : [];
  if (words[0] === "sudo") words.shift();
  let candidates: { name: string; suffix: string }[] = [];
  const fromList = (list: string[]) => list.filter((n) => n.startsWith(partial)).map((n) => ({ name: n, suffix: " " }));

  if (!words.length && !partial.includes("/")) {
    candidates = fromList([...new Set([...BIN_COMMANDS, ...BUILTIN_COMMANDS])].sort());
  } else if (words[0] === "git" && words.length === 1) {
    candidates = fromList(GIT_SUBCOMMANDS);
  } else if (words[0] === "docker" && words.length === 1) {
    candidates = fromList(DOCKER_SUBCOMMANDS);
  } else if (words[0] === "git" && ["checkout", "switch", "merge", "branch"].includes(words[1] ?? "") && !partial.includes("/")) {
    candidates = fromList(branchNames(state));
  } else if (words[0] === "docker" && ["stop", "start", "restart", "rm", "logs"].includes(words[1] ?? "")) {
    candidates = fromList(state.docker.containers.map((c) => c.name));
  }
  if (!candidates.length) {
    const slash = partial.lastIndexOf("/");
    const dirPart = slash >= 0 ? partial.slice(0, slash + 1) : "";
    const prefix = partial.slice(slash + 1);
    const dirAbs = dirPart.startsWith("~") ? resolvePath(state.cwd, dirPart) : resolvePath(state.cwd, dirPart || ".");
    const dir = getDir(state.root, dirAbs);
    if (dir) {
      candidates = Object.keys(dir.children)
        .filter((n) => n.startsWith(prefix) && (prefix.startsWith(".") || !n.startsWith(".")))
        .sort(lsSort)
        .map((n) => ({ name: dirPart + n, suffix: dir.children[n].type === "dir" ? "/" : " " }));
    }
  }
  if (!candidates.length) return { line, options: [] };
  if (candidates.length === 1) return { line: before + candidates[0].name + candidates[0].suffix, options: [] };
  const common = commonPrefix(candidates.map((c) => c.name));
  if (common.length > partial.length) return { line: before + common, options: [] };
  return { line, options: candidates.map((c) => c.name.split("/").filter(Boolean).pop() + (c.suffix === "/" ? "/" : "")) };
}

/** Chữ terminal in ra khi nhấn Ctrl+C để bỏ dòng đang gõ. */
export const INTERRUPT_ECHO = "^C";

/** "ban@may-hoc" cho dấu nhắc lệnh. */
export const PROMPT_USER = `${USER}@${HOST}`;
/* i18n-ignore-end */
