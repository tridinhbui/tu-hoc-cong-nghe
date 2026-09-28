/** Git mô phỏng trên hệ thống tệp trong bộ nhớ: init, status, add, commit,
 *  log, branch, checkout/switch, merge (fast-forward và ba chiều không xung
 *  đột), diff, restore, config. Kết quả in ra bắt chước git 2.4x thật. */
/* i18n-ignore-start: đây là đầu ra của chính công cụ git (thông báo lỗi,
   gợi ý, bảng trạng thái) - người đi làm đọc nó bằng tiếng Anh đúng như vậy,
   và từ khoá trong đó là thứ họ phải nhận ra khi gặp ở máy thật */
import {
  ensureDir,
  getDir,
  getNode,
  globToRegExp,
  relativePath,
  removeNode,
  resolvePath,
  splitPath,
  walkFiles,
  writeFile,
  mkDir,
} from "./fs";
import type { CmdResult, Commit, Ctx, DirNode, GitRepo, Span, TermState, Tree } from "./types";
import { diffLines, fakeHash, formatGitDate, splitLines } from "./util";

const ok = (out: string[] = [], rich?: Span[][]): CmdResult => ({ out, err: [], code: 0, rich });
const fail = (err: string[] | string, code = 1, out: string[] = []): CmdResult => ({
  out,
  err: Array.isArray(err) ? err : [err],
  code,
});

const NOT_A_REPO = "fatal: not a git repository (or any of the parent directories): .git";

/** Kho Git chứa `cwd`. Kho mà thư mục .git đã bị xoá thì bị gỡ khỏi trạng
 *  thái (`prune`), trừ khi gọi chỉ để đọc - như thanh trạng thái của giao diện. */
export function findRepo(state: TermState, cwd: string, prune = true): GitRepo | null {
  let path = cwd;
  for (;;) {
    const repo = state.git[path];
    if (repo) {
      if (getDir(state.root, (path === "/" ? "" : path) + "/.git")) return repo;
      if (prune) delete state.git[path];
    }
    if (path === "/") return null;
    path = "/" + splitPath(path).slice(0, -1).join("/");
  }
}

function ignorePatterns(state: TermState, repo: GitRepo): RegExp[] {
  const node = getNode(state.root, repo.root + "/.gitignore");
  if (!node || node.type !== "file") return [];
  return splitLines(node.content)
    .map((l) => l.trim().replace(/\/$/, ""))
    .filter((l) => l && !l.startsWith("#"))
    .map(globToRegExp);
}

function workTree(state: TermState, repo: GitRepo): Tree {
  const dir = getDir(state.root, repo.root);
  if (!dir) return {};
  const pats = ignorePatterns(state, repo);
  const skip = (rel: string) => {
    if (rel === ".git") return true;
    const last = rel.split("/").pop() ?? rel;
    return pats.some((p) => p.test(last));
  };
  const tree: Tree = {};
  for (const rel of walkFiles(dir, "", skip)) {
    const node = getNode(state.root, `${repo.root}/${rel}`);
    if (node && node.type === "file") tree[rel] = node.content;
  }
  return tree;
}

function headId(repo: GitRepo): string | null {
  return repo.branches[repo.head] ?? null;
}

function treeOf(repo: GitRepo, id: string | null): Tree {
  return id ? repo.commits[id]?.tree ?? {} : {};
}

const short = (id: string) => id.slice(0, 7);

function ancestors(repo: GitRepo, id: string | null): Set<string> {
  const seen = new Set<string>();
  const stack = id ? [id] : [];
  while (stack.length) {
    const c = stack.pop() as string;
    if (seen.has(c)) continue;
    seen.add(c);
    for (const p of repo.commits[c]?.parents ?? []) stack.push(p);
  }
  return seen;
}

function mergeBase(repo: GitRepo, a: string, b: string): string | null {
  const anc = ancestors(repo, a);
  const queue = [b];
  const seen = new Set<string>();
  while (queue.length) {
    const c = queue.shift() as string;
    if (seen.has(c)) continue;
    seen.add(c);
    if (anc.has(c)) return c;
    queue.push(...(repo.commits[c]?.parents ?? []));
  }
  return null;
}

function sameTree(a: Tree, b: Tree): boolean {
  const ka = Object.keys(a);
  if (ka.length !== Object.keys(b).length) return false;
  return ka.every((k) => b[k] === a[k]);
}

function changedPaths(a: Tree, b: Tree): string[] {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].filter((k) => a[k] !== b[k]).sort();
}

/** Đường dẫn trong repo hiển thị tương đối với thư mục hiện tại, như git thật. */
function show(ctx: Ctx, repo: GitRepo, rel: string): string {
  return relativePath(ctx.state.cwd, `${repo.root}/${rel}`);
}

interface StatusInfo {
  staged: { path: string; kind: string }[];
  unstaged: { path: string; kind: string }[];
  untracked: string[];
}

function statusInfo(state: TermState, repo: GitRepo): StatusInfo {
  const head = treeOf(repo, headId(repo));
  const wt = workTree(state, repo);
  const staged = changedPaths(head, repo.index).map((p) => ({
    path: p,
    kind: head[p] === undefined ? "new file" : repo.index[p] === undefined ? "deleted" : "modified",
  }));
  const unstaged = Object.keys(repo.index)
    .sort()
    .filter((p) => wt[p] !== repo.index[p])
    .map((p) => ({ path: p, kind: wt[p] === undefined ? "deleted" : "modified" }));
  const tracked = Object.keys(repo.index);
  const untracked = new Set<string>();
  for (const p of Object.keys(wt).sort()) {
    if (repo.index[p] !== undefined) continue;
    const parts = p.split("/");
    let shown = p;
    for (let i = 1; i < parts.length; i++) {
      const prefix = parts.slice(0, i).join("/");
      if (!tracked.some((t) => t.startsWith(prefix + "/"))) {
        shown = prefix + "/";
        break;
      }
    }
    untracked.add(shown);
  }
  return { staged, unstaged, untracked: [...untracked] };
}

function statusOutput(ctx: Ctx, repo: GitRepo): { out: string[]; rich: Span[][] } {
  const info = statusInfo(ctx.state, repo);
  const rich: Span[][] = [];
  const line = (t: string, c?: Span["c"]) => rich.push([{ t, c }]);
  line(`On branch ${repo.head}`);
  if (!headId(repo)) {
    line("");
    line("No commits yet");
  }
  if (info.staged.length) {
    line("");
    line("Changes to be committed:");
    line(headId(repo) ? '  (use "git restore --staged <file>..." to unstage)' : '  (use "git rm --cached <file>..." to unstage)');
    for (const s of info.staged) line(`\t${(s.kind + ":").padEnd(12)}${show(ctx, repo, s.path)}`, "green");
  }
  if (info.unstaged.length) {
    line("");
    line("Changes not staged for commit:");
    line('  (use "git add <file>..." to update what will be committed)');
    line('  (use "git restore <file>..." to discard changes in working directory)');
    for (const s of info.unstaged) line(`\t${(s.kind + ":").padEnd(12)}${show(ctx, repo, s.path)}`, "red");
  }
  if (info.untracked.length) {
    line("");
    line("Untracked files:");
    line('  (use "git add <file>..." to include in what will be committed)');
    for (const u of info.untracked) {
      const rel = show(ctx, repo, u.replace(/\/$/, ""));
      line(`\t${rel}${u.endsWith("/") ? "/" : ""}`, "red");
    }
  }
  const anySection = info.staged.length || info.unstaged.length || info.untracked.length;
  if (anySection || !headId(repo)) line("");
  if (!anySection) {
    line(headId(repo) ? "nothing to commit, working tree clean" : 'nothing to commit (create/copy files and use "git add" to track)');
  } else if (!info.staged.length && info.unstaged.length) {
    line('no changes added to commit (use "git add" and/or "git commit -a")');
  } else if (!info.staged.length && info.untracked.length) {
    line('nothing added to commit but untracked files present (use "git add" to track)');
  } else {
    rich.pop();
  }
  return { out: rich.map((r) => r.map((s) => s.t).join("")), rich };
}

/** Dòng " README.md | 3 ++-" và dòng tổng kết số tệp/số dòng. */
function diffStat(from: Tree, to: Tree): { lines: string[]; files: number; ins: number; del: number } {
  const paths = changedPaths(from, to);
  let ins = 0;
  let del = 0;
  const rows: [string, number, number][] = [];
  for (const p of paths) {
    const ops = diffLines(splitLines(from[p] ?? ""), splitLines(to[p] ?? ""));
    const a = ops.filter((o) => o.op === "+").length;
    const d = ops.filter((o) => o.op === "-").length;
    ins += a;
    del += d;
    rows.push([p, a, d]);
  }
  const w = Math.max(0, ...rows.map((r) => r[0].length));
  const lines = rows.map(([p, a, d]) => ` ${p.padEnd(w)} | ${a + d} ${"+".repeat(Math.min(a, 30))}${"-".repeat(Math.min(d, 30))}`);
  return { lines, files: paths.length, ins, del };
}

function summaryLine(files: number, ins: number, del: number): string {
  let s = ` ${files} file${files === 1 ? "" : "s"} changed`;
  if (ins || !del) s += `, ${ins} insertion${ins === 1 ? "" : "s"}(+)`;
  if (del) s += `, ${del} deletion${del === 1 ? "" : "s"}(-)`;
  return s;
}

/** Đưa cây làm việc từ `from` sang `to`, giữ nguyên các tệp nằm trong `keep`. */
function applyTree(ctx: Ctx, repo: GitRepo, from: Tree, to: Tree, keep: string[] = []): void {
  const root = ctx.state.root;
  for (const p of changedPaths(from, to)) {
    if (keep.includes(p)) continue;
    const abs = `${repo.root}/${p}`;
    if (to[p] === undefined) {
      removeNode(root, abs);
      // git xoá luôn thư mục vừa trở nên rỗng
      let dir = abs.split("/").slice(0, -1).join("/");
      while (dir.length > repo.root.length) {
        const d = getDir(root, dir);
        if (!d || Object.keys(d.children).length) break;
        removeNode(root, dir);
        dir = dir.split("/").slice(0, -1).join("/");
      }
    } else {
      ensureDir(root, abs.split("/").slice(0, -1).join("/"), ctx.now);
      writeFile(root, abs, to[p], ctx.now);
    }
  }
}

function makeCommit(ctx: Ctx, repo: GitRepo, message: string, parents: string[], tree: Tree): Commit {
  const { name, email } = ctx.state.gitUser;
  const id = fakeHash(JSON.stringify([tree, parents, message, ctx.now, ctx.state.seq, name]));
  const commit: Commit = { id, message, parents, tree: { ...tree }, time: ctx.now, author: name, email };
  repo.commits[id] = commit;
  return commit;
}

/** Chuyển nhánh, kiểm tra thay đổi chưa commit có bị ghi đè không. */
function switchTo(ctx: Ctx, repo: GitRepo, branch: string, verb: string): CmdResult | null {
  const fromId = headId(repo);
  const toId = repo.branches[branch] ?? null;
  const from = treeOf(repo, fromId);
  const to = treeOf(repo, toId);
  if (fromId !== toId) {
    const info = statusInfo(ctx.state, repo);
    const dirty = [...new Set([...info.staged.map((s) => s.path), ...info.unstaged.map((s) => s.path)])];
    const blocked = dirty.filter((p) => from[p] !== to[p]);
    if (blocked.length) {
      return fail([
        `error: Your local changes to the following files would be overwritten by ${verb}:`,
        ...blocked.map((p) => `\t${show(ctx, repo, p)}`),
        "Please commit your changes or stash them before you switch branches.",
        "Aborting",
      ]);
    }
    const wt = workTree(ctx.state, repo);
    const clobbered = Object.keys(to).filter((p) => from[p] === undefined && repo.index[p] === undefined && wt[p] !== undefined && wt[p] !== to[p]);
    if (clobbered.length) {
      return fail([
        `error: The following untracked working tree files would be overwritten by ${verb}:`,
        ...clobbered.map((p) => `\t${show(ctx, repo, p)}`),
        "Please move or remove them before you switch branches.",
        "Aborting",
      ]);
    }
    applyTree(ctx, repo, from, to, dirty);
    const oldIndex = repo.index;
    repo.index = { ...to };
    for (const p of dirty) {
      if (oldIndex[p] === undefined) delete repo.index[p];
      else repo.index[p] = oldIndex[p];
    }
  }
  repo.head = branch;
  return null;
}

function relInRepo(ctx: Ctx, repo: GitRepo, arg: string): string | null {
  const abs = resolvePath(ctx.state.cwd, arg);
  if (abs === repo.root) return "";
  if (!abs.startsWith(repo.root + "/")) return null;
  return abs.slice(repo.root.length + 1);
}

const under = (p: string, rel: string) => rel === "" || p === rel || p.startsWith(rel + "/");

// ---------------------------------------------------------------- lệnh con

function gitInit(ctx: Ctx, args: string[]): CmdResult {
  const target = resolvePath(ctx.state.cwd, args.find((a) => !a.startsWith("-")) ?? ".");
  const dir = ensureDir(ctx.state.root, target, ctx.now);
  if (!dir) return fail(`fatal: cannot mkdir ${target}: Not a directory`, 128);
  const shown = `${target === "/" ? "" : target}/.git/`;
  if (ctx.state.git[target] && dir.children[".git"]) return ok([`Reinitialized existing Git repository in ${shown}`]);
  const gitDir: DirNode = mkDir(ctx.now);
  gitDir.children["HEAD"] = { type: "file", content: "ref: refs/heads/main\n", mode: 0o644, mtime: ctx.now };
  gitDir.children["config"] = { type: "file", content: "[core]\n\trepositoryformatversion = 0\n", mode: 0o644, mtime: ctx.now };
  gitDir.children["objects"] = mkDir(ctx.now);
  gitDir.children["refs"] = mkDir(ctx.now);
  dir.children[".git"] = gitDir;
  ctx.state.git[target] = { root: target, head: "main", branches: { main: null }, commits: {}, index: {} };
  return ok([`Initialized empty Git repository in ${shown}`]);
}

function gitAdd(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const specs = args.filter((a) => !a.startsWith("-"));
  if (args.includes("-A") || args.includes("--all")) specs.push(relativePath(ctx.state.cwd, repo.root));
  if (!specs.length) return fail(["Nothing specified, nothing added.", "hint: Maybe you wanted to say 'git add .'?"], 0);
  const wt = workTree(ctx.state, repo);
  for (const spec of specs) {
    const rel = relInRepo(ctx, repo, spec);
    if (rel === null) return fail(`fatal: ${spec}: '${spec}' is outside repository at '${repo.root}'`, 128);
    const inWt = Object.keys(wt).filter((p) => under(p, rel));
    const gone = Object.keys(repo.index).filter((p) => under(p, rel) && wt[p] === undefined);
    if (!inWt.length && !gone.length) {
      if (getDir(ctx.state.root, resolvePath(ctx.state.cwd, spec))) continue;
      return fail(`fatal: pathspec '${spec}' did not match any files`, 128);
    }
    for (const p of inWt) repo.index[p] = wt[p];
    for (const p of gone) delete repo.index[p];
  }
  return ok();
}

function gitCommit(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const messages: string[] = [];
  let all = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--message") messages.push(args[++i] ?? "");
    else if (a === "--all") all = true;
    else if (/^-[a-zA-Z]+$/.test(a)) {
      if (a.includes("a")) all = true;
      if (a.includes("m")) {
        const v = args[++i];
        if (v === undefined) return fail("error: switch `m' requires a value", 129);
        messages.push(v);
      }
    }
  }
  if (all) {
    const wt = workTree(ctx.state, repo);
    for (const p of Object.keys(repo.index)) {
      if (wt[p] === undefined) delete repo.index[p];
      else repo.index[p] = wt[p];
    }
  }
  const parentId = headId(repo);
  const head = treeOf(repo, parentId);
  if (sameTree(head, repo.index) && parentId) {
    const st = statusOutput(ctx, repo);
    return { out: st.out, err: [], code: 1, rich: st.rich };
  }
  if (!parentId && !Object.keys(repo.index).length) {
    const st = statusOutput(ctx, repo);
    return { out: st.out, err: [], code: 1, rich: st.rich };
  }
  if (!messages.length || !messages.join("").trim()) {
    return { out: [], err: ["Aborting commit due to empty commit message."], code: 1, notices: ["noEditor"] };
  }
  const commit = makeCommit(ctx, repo, messages.join("\n\n"), parentId ? [parentId] : [], repo.index);
  repo.branches[repo.head] = commit.id;
  const stat = diffStat(head, commit.tree);
  const out = [
    `[${repo.head}${parentId ? "" : " (root-commit)"} ${short(commit.id)}] ${messages[0]}`,
    summaryLine(stat.files, stat.ins, stat.del),
  ];
  for (const p of changedPaths(head, commit.tree)) {
    if (head[p] === undefined) out.push(` create mode 100644 ${p}`);
    else if (commit.tree[p] === undefined) out.push(` delete mode 100644 ${p}`);
  }
  return ok(out);
}

function decorations(repo: GitRepo, id: string): string {
  const names: string[] = [];
  if (headId(repo) === id) names.push(`HEAD -> ${repo.head}`);
  for (const [b, c] of Object.entries(repo.branches)) if (c === id && b !== repo.head) names.push(b);
  return names.length ? ` (${names.join(", ")})` : "";
}

function gitLog(repo: GitRepo, args: string[]): CmdResult {
  let id = headId(repo);
  if (!id) return fail(`fatal: your current branch '${repo.head}' does not have any commits yet`, 128);
  const oneline = args.includes("--oneline");
  let limit = Infinity;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-n") limit = Number(args[++i]) || limit;
    else if (/^-\d+$/.test(args[i])) limit = Number(args[i].slice(1));
  }
  const rich: Span[][] = [];
  let count = 0;
  while (id && count < limit) {
    const c: Commit = repo.commits[id];
    const deco = decorations(repo, c.id);
    if (oneline) {
      rich.push([{ t: short(c.id), c: "yellow" }, { t: deco, c: "link" }, { t: ` ${c.message.split("\n")[0]}` }]);
    } else {
      if (count) rich.push([{ t: "" }]);
      rich.push([{ t: `commit ${c.id}`, c: "yellow" }, { t: deco, c: "link" }]);
      if (c.parents.length > 1) rich.push([{ t: `Merge: ${c.parents.map(short).join(" ")}` }]);
      rich.push([{ t: `Author: ${c.author} <${c.email}>` }]);
      rich.push([{ t: `Date:   ${formatGitDate(c.time)}` }]);
      rich.push([{ t: "" }]);
      for (const l of c.message.split("\n")) rich.push([{ t: `    ${l}` }]);
    }
    id = c.parents[0] ?? null;
    count++;
  }
  return ok(rich.map((r) => r.map((s) => s.t).join("")), rich);
}

function gitBranch(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const del = args.find((a) => a === "-d" || a === "-D" || a === "--delete");
  const names = args.filter((a) => !a.startsWith("-"));
  if (del) {
    if (!names.length) return fail("fatal: branch name required", 128);
    const out: string[] = [];
    for (const n of names) {
      if (!(n in repo.branches) || repo.branches[n] === null) return fail(`error: branch '${n}' not found`);
      if (n === repo.head) return fail(`error: cannot delete branch '${n}' used by worktree at '${repo.root}'`);
      out.push(`Deleted branch ${n} (was ${short(repo.branches[n] as string)}).`);
      delete repo.branches[n];
    }
    return ok(out);
  }
  if (names.length) {
    const n = names[0];
    const id = headId(repo);
    if (!id) return fail(`fatal: not a valid object name: '${repo.head}'`, 128);
    if (!/^[A-Za-z0-9._/-]+$/.test(n) || n.startsWith("-")) return fail(`fatal: '${n}' is not a valid branch name`, 128);
    if (repo.branches[n]) return fail(`fatal: a branch named '${n}' already exists`, 128);
    repo.branches[n] = id;
    return ok();
  }
  const rich: Span[][] = Object.keys(repo.branches)
    .filter((b) => repo.branches[b] !== null)
    .sort()
    .map((b) => (b === repo.head ? [{ t: `* ${b}`, c: "green" }] : [{ t: `  ${b}` }]));
  void ctx;
  return ok(rich.map((r) => r[0].t), rich);
}

function restorePaths(ctx: Ctx, repo: GitRepo, specs: string[], staged: boolean): CmdResult {
  const head = treeOf(repo, headId(repo));
  let count = 0;
  for (const spec of specs) {
    const rel = relInRepo(ctx, repo, spec);
    const src = staged ? head : repo.index;
    const hits = rel === null ? [] : [...new Set([...Object.keys(src), ...Object.keys(repo.index)])].filter((p) => under(p, rel));
    if (!hits.length) return fail(`error: pathspec '${spec}' did not match any file(s) known to git`);
    for (const p of hits) {
      count++;
      if (staged) {
        if (head[p] === undefined) delete repo.index[p];
        else repo.index[p] = head[p];
      } else if (repo.index[p] !== undefined) {
        const abs = `${repo.root}/${p}`;
        ensureDir(ctx.state.root, abs.split("/").slice(0, -1).join("/"), ctx.now);
        writeFile(ctx.state.root, abs, repo.index[p], ctx.now);
      }
    }
  }
  return staged ? ok() : ok([`Updated ${count} path${count === 1 ? "" : "s"} from the index`]);
}

function gitCheckout(ctx: Ctx, repo: GitRepo, args: string[], cmd: "checkout" | "switch"): CmdResult {
  const createFlag = cmd === "checkout" ? ["-b", "-B"] : ["-c", "-C", "--create"];
  const ci = args.findIndex((a) => createFlag.includes(a));
  if (ci >= 0) {
    const name = args[ci + 1];
    if (!name) return fail(`error: switch \`${args[ci].replace(/^-+/, "")}' requires a value`, 129);
    if (!/^[A-Za-z0-9._/-]+$/.test(name)) return fail(`fatal: '${name}' is not a valid branch name`, 128);
    if (repo.branches[name] !== undefined && repo.branches[name] !== null) return fail(`fatal: a branch named '${name}' already exists`, 128);
    const id = headId(repo);
    if (repo.branches[repo.head] === null && repo.head !== name) delete repo.branches[repo.head];
    repo.branches[name] = id;
    repo.head = name;
    return { out: [], err: [`Switched to a new branch '${name}'`], code: 0 };
  }
  const dashDash = args.indexOf("--");
  if (dashDash >= 0) return restorePaths(ctx, repo, args.slice(dashDash + 1), false);
  const target = args.find((a) => !a.startsWith("-"));
  if (!target) return cmd === "switch" ? fail("fatal: missing branch or commit argument", 128) : ok();
  if (repo.branches[target] !== undefined && (repo.branches[target] !== null || target === repo.head)) {
    if (target === repo.head) return { out: [], err: [`Already on '${target}'`], code: 0 };
    const blocked = switchTo(ctx, repo, target, cmd === "checkout" ? "checkout" : "switch");
    if (blocked) return blocked;
    return { out: [], err: [`Switched to branch '${target}'`], code: 0 };
  }
  if (cmd === "switch") return fail(`fatal: invalid reference: ${target}`, 128);
  const rel = relInRepo(ctx, repo, target);
  if (rel !== null && Object.keys(repo.index).some((p) => under(p, rel))) return restorePaths(ctx, repo, [target], false);
  return fail(`error: pathspec '${target}' did not match any file(s) known to git`);
}

function gitMerge(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const target = args.find((a) => !a.startsWith("-"));
  if (!target) return fail("fatal: No remote for the current branch.", 128);
  const theirs = repo.branches[target];
  if (!theirs) return fail([`merge: ${target} - not something we can merge`]);
  const ours = headId(repo);
  if (!ours) {
    applyTree(ctx, repo, {}, treeOf(repo, theirs));
    repo.branches[repo.head] = theirs;
    repo.index = { ...treeOf(repo, theirs) };
    return ok();
  }
  const info = statusInfo(ctx.state, repo);
  if (info.staged.length || info.unstaged.length) {
    return fail([
      "error: Your local changes to the following files would be overwritten by merge:",
      ...[...info.staged, ...info.unstaged].map((s) => `\t${show(ctx, repo, s.path)}`),
      "Please commit your changes or stash them before you merge.",
      "Aborting",
    ]);
  }
  if (ours === theirs || ancestors(repo, ours).has(theirs)) return ok(["Already up to date."]);
  const oursTree = treeOf(repo, ours);
  const theirsTree = treeOf(repo, theirs);
  if (ancestors(repo, theirs).has(ours)) {
    applyTree(ctx, repo, oursTree, theirsTree);
    repo.branches[repo.head] = theirs;
    repo.index = { ...theirsTree };
    const stat = diffStat(oursTree, theirsTree);
    return ok([`Updating ${short(ours)}..${short(theirs)}`, "Fast-forward", ...stat.lines, summaryLine(stat.files, stat.ins, stat.del)]);
  }
  const base = treeOf(repo, mergeBase(repo, ours, theirs));
  const merged: Tree = {};
  const conflicts: string[] = [];
  const keys = new Set([...Object.keys(base), ...Object.keys(oursTree), ...Object.keys(theirsTree)]);
  for (const p of [...keys].sort()) {
    const b = base[p];
    const o = oursTree[p];
    const t = theirsTree[p];
    let v: string | undefined;
    if (o === t) v = o;
    else if (o === b) v = t;
    else if (t === b) v = o;
    else {
      conflicts.push(p);
      v = o;
    }
    if (v !== undefined) merged[p] = v;
  }
  if (conflicts.length) {
    return {
      out: [
        ...conflicts.map((p) => `Auto-merging ${p}`),
        ...conflicts.map((p) => `CONFLICT (content): Merge conflict in ${p}`),
      ],
      err: ["Automatic merge failed; fix conflicts and then commit the result."],
      code: 1,
      notices: ["mergeConflict"],
    };
  }
  applyTree(ctx, repo, oursTree, merged);
  const commit = makeCommit(ctx, repo, `Merge branch '${target}'`, [ours, theirs], merged);
  repo.branches[repo.head] = commit.id;
  repo.index = { ...merged };
  const stat = diffStat(oursTree, merged);
  return ok(["Merge made by the 'ort' strategy.", ...stat.lines, summaryLine(stat.files, stat.ins, stat.del)]);
}

function gitDiff(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const staged = args.includes("--staged") || args.includes("--cached");
  const from = staged ? treeOf(repo, headId(repo)) : repo.index;
  let to: Tree;
  if (staged) to = repo.index;
  else {
    const wt = workTree(ctx.state, repo);
    to = {};
    for (const p of Object.keys(repo.index)) if (wt[p] !== undefined) to[p] = wt[p];
  }
  const specs = args.filter((a) => !a.startsWith("-")).map((s) => relInRepo(ctx, repo, s));
  const rich: Span[][] = [];
  for (const p of changedPaths(from, to)) {
    if (specs.length && !specs.some((r) => r !== null && under(p, r))) continue;
    const a = from[p];
    const b = to[p];
    const oldLines = splitLines(a ?? "");
    const newLines = splitLines(b ?? "");
    rich.push([{ t: `diff --git a/${p} b/${p}`, c: "bold" }]);
    if (a === undefined) rich.push([{ t: "new file mode 100644", c: "bold" }]);
    if (b === undefined) rich.push([{ t: "deleted file mode 100644", c: "bold" }]);
    const ha = a === undefined ? "0000000" : fakeHash(a, 7);
    const hb = b === undefined ? "0000000" : fakeHash(b, 7);
    rich.push([{ t: `index ${ha}..${hb}${a !== undefined && b !== undefined ? " 100644" : ""}`, c: "bold" }]);
    rich.push([{ t: a === undefined ? "--- /dev/null" : `--- a/${p}`, c: "bold" }]);
    rich.push([{ t: b === undefined ? "+++ /dev/null" : `+++ b/${p}`, c: "bold" }]);
    const range = (n: number) => (n === 0 ? "0,0" : n === 1 ? "1" : `1,${n}`);
    rich.push([{ t: `@@ -${range(oldLines.length)} +${range(newLines.length)} @@`, c: "link" }]);
    for (const op of diffLines(oldLines, newLines)) {
      rich.push([{ t: `${op.op}${op.line}`, c: op.op === "+" ? "green" : op.op === "-" ? "red" : undefined }]);
    }
  }
  return ok(rich.map((r) => r[0].t), rich);
}

function gitConfig(ctx: Ctx, args: string[]): CmdResult {
  const rest = args.filter((a) => a !== "--global" && a !== "--local");
  if (rest[0] === "--list" || rest[0] === "-l") {
    return ok([`user.name=${ctx.state.gitUser.name}`, `user.email=${ctx.state.gitUser.email}`, "init.defaultbranch=main"]);
  }
  const [key, value] = rest;
  if (!key) return fail("usage: git config [<options>]", 129);
  if (key !== "user.name" && key !== "user.email") {
    if (value === undefined) return { out: [], err: [], code: 1 };
    return ok();
  }
  const field = key === "user.name" ? "name" : "email";
  if (value === undefined) return ok([ctx.state.gitUser[field]]);
  ctx.state.gitUser[field] = value;
  return ok();
}

const GIT_USAGE = [
  "usage: git [--version] [--help] <command> [<args>]",
  "",
  "These are common Git commands used in various situations:",
  "",
  "start a working area",
  "   init       Create an empty Git repository or reinitialize an existing one",
  "",
  "work on the current change",
  "   add        Add file contents to the index",
  "   restore    Restore working tree files",
  "",
  "examine the history and state",
  "   diff       Show changes between commits, commit and working tree, etc",
  "   log        Show commit logs",
  "   status     Show the working tree status",
  "",
  "grow, mark and tweak your common history",
  "   branch     List, create, or delete branches",
  "   commit     Record changes to the repository",
  "   merge      Join two or more development histories together",
  "   switch     Switch branches",
];

export const GIT_SUBCOMMANDS = [
  "init", "status", "add", "commit", "log", "branch", "checkout", "switch", "merge",
  "diff", "restore", "config", "push", "pull", "remote",
];

export function git(ctx: Ctx, args: string[]): CmdResult {
  const [sub, ...rest] = args;
  if (!sub || sub === "help" || sub === "--help") return ok(GIT_USAGE);
  if (sub === "--version" || sub === "version") return ok(["git version 2.43.0"]);
  if (sub === "config") return gitConfig(ctx, rest);
  if (sub === "init") return gitInit(ctx, rest);
  if (!GIT_SUBCOMMANDS.includes(sub)) return fail(`git: '${sub}' is not a git command. See 'git --help'.`);
  const repo = findRepo(ctx.state, ctx.state.cwd);
  if (!repo) return fail(NOT_A_REPO, 128);
  switch (sub) {
    case "status": {
      const st = statusOutput(ctx, repo);
      return ok(st.out, st.rich);
    }
    case "add":
      return gitAdd(ctx, repo, rest);
    case "commit":
      return gitCommit(ctx, repo, rest);
    case "log":
      return gitLog(repo, rest);
    case "branch":
      return gitBranch(ctx, repo, rest);
    case "checkout":
      return gitCheckout(ctx, repo, rest, "checkout");
    case "switch":
      return gitCheckout(ctx, repo, rest, "switch");
    case "merge":
      return gitMerge(ctx, repo, rest);
    case "diff":
      return gitDiff(ctx, repo, rest);
    case "restore": {
      const specs = rest.filter((a) => !a.startsWith("-"));
      if (!specs.length) return fail("fatal: you must specify path(s) to restore", 128);
      return restorePaths(ctx, repo, specs, rest.includes("--staged") || rest.includes("-S"));
    }
    case "remote":
      return ok();
    case "push":
      return fail([
        "fatal: No configured push destination.",
        "Either specify the URL from the command-line or configure a remote repository using",
        "",
        "    git remote add <name> <url>",
      ], 128);
    case "pull":
      return fail([
        "There is no tracking information for the current branch.",
        "Please specify which branch you want to merge with.",
      ]);
    default:
      return fail(`git: '${sub}' is not a git command. See 'git --help'.`);
  }
}

/** Tên nhánh cho Tab sau `git checkout` / `switch` / `merge` / `branch -d`. */
export function branchNames(state: TermState): string[] {
  const repo = findRepo(state, state.cwd);
  if (!repo) return [];
  return Object.keys(repo.branches).filter((b) => repo.branches[b] !== null);
}
/* i18n-ignore-end */
