/** Git mô phỏng trên hệ thống tệp trong bộ nhớ: init, status, add, commit,
 *  log, show, branch, checkout/switch, merge (fast-forward, ba chiều, và xung
 *  đột có dấu <<<<<<< để tự sửa), diff, restore, reset, revert, tag, stash, rm,
 *  remote / fetch / pull [--rebase] / push, config. Kết quả in ra bắt chước
 *  git 2.4x thật. */
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
import type { CmdResult, Commit, Ctx, DirNode, GitRepo, MergeState, Span, TermState, Tree } from "./types";
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
    .filter((p) => wt[p] !== repo.index[p] && !repo.merging?.conflicts.includes(p))
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

/** "origin/main" → id commit theo dõi cục bộ, hoặc null. */
function trackingId(repo: GitRepo, ref: string): string | null {
  const [remote, ...rest] = ref.split("/");
  return repo.remotes?.[remote]?.tracking[rest.join("/")] ?? null;
}

function upstreamInfo(repo: GitRepo): string[] | null {
  const ref = repo.upstreams?.[repo.head];
  const mine = headId(repo);
  const theirs = ref ? trackingId(repo, ref) : null;
  if (!ref || !mine || !theirs) return null;
  const am = ancestors(repo, mine);
  const at = ancestors(repo, theirs);
  const ahead = [...am].filter((c) => !at.has(c)).length;
  const behind = [...at].filter((c) => !am.has(c)).length;
  const n = (k: number) => `${k} commit${k === 1 ? "" : "s"}`;
  if (!ahead && !behind) return [`Your branch is up to date with '${ref}'.`];
  if (ahead && !behind) return [`Your branch is ahead of '${ref}' by ${n(ahead)}.`, '  (use "git push" to publish your local commits)'];
  if (!ahead) return [`Your branch is behind '${ref}' by ${n(behind)}, and can be fast-forwarded.`, '  (use "git pull" to update your local branch)'];
  return [
    `Your branch and '${ref}' have diverged,`,
    `and have ${ahead} and ${behind} different commit${behind === 1 ? "" : "s"} each, respectively.`,
    '  (use "git pull" if you want to integrate the remote branch with yours)',
  ];
}

function statusOutput(ctx: Ctx, repo: GitRepo): { out: string[]; rich: Span[][] } {
  const info = statusInfo(ctx.state, repo);
  const rich: Span[][] = [];
  const line = (t: string, c?: Span["c"]) => rich.push([{ t, c }]);
  line(`On branch ${repo.head}`);
  const up = upstreamInfo(repo);
  if (up) {
    for (const l of up) line(l);
  }
  if (!headId(repo)) {
    line("");
    line("No commits yet");
  }
  const unmerged = repo.merging?.conflicts ?? [];
  if (repo.merging) {
    line("");
    if (unmerged.length) {
      line("You have unmerged paths.");
      line('  (fix conflicts and run "git commit")');
      line('  (use "git merge --abort" to abort the merge)');
    } else {
      line("All conflicts fixed but you are still merging.");
      line('  (use "git commit" to conclude merge)');
    }
  }
  if (unmerged.length) {
    line("");
    line("Unmerged paths:");
    line('  (use "git add <file>..." to mark resolution)');
    for (const p of unmerged) line(`\t${"both modified:".padEnd(17)}${show(ctx, repo, p)}`, "red");
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
  const anySection = info.staged.length || info.unstaged.length || info.untracked.length || unmerged.length;
  if (anySection || !headId(repo) || (up && !repo.merging)) line("");
  if (!anySection && repo.merging) {
    // chỉ còn chờ commit gộp: không có dòng tổng kết
  } else if (!anySection) {
    line(headId(repo) ? "nothing to commit, working tree clean" : 'nothing to commit (create/copy files and use "git add" to track)');
  } else if (!info.staged.length && (info.unstaged.length || unmerged.length)) {
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
    if (repo.merging) repo.merging.conflicts = repo.merging.conflicts.filter((c) => !under(c, rel));
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
  if (all && !repo.merging) {
    const wt = workTree(ctx.state, repo);
    for (const p of Object.keys(repo.index)) {
      if (wt[p] === undefined) delete repo.index[p];
      else repo.index[p] = wt[p];
    }
  }
  if (repo.merging) {
    const m = repo.merging;
    if (m.conflicts.length) {
      return fail([
        ...m.conflicts.map((p) => `U\t${p}`),
        "error: Committing is not possible because you have unmerged files.",
        "hint: Fix them up in the work tree, and then use 'git add/rm <file>'",
        "hint: as appropriate to mark resolution and make a commit.",
        "fatal: Exiting because of an unresolved conflict.",
      ], 128);
    }
    const text = messages.join("\n\n").trim() || m.message;
    const before = treeOf(repo, m.ours);
    const mc = makeCommit(ctx, repo, text, [m.ours, m.theirs], repo.index);
    repo.branches[repo.head] = mc.id;
    delete repo.merging;
    void before;
    return ok([`[${repo.head} ${short(mc.id)}] ${text.split("\n")[0]}`]);
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
  for (const [t, c] of Object.entries(repo.tags ?? {})) if (c === id) names.push(`tag: ${t}`);
  for (const [r, rem] of Object.entries(repo.remotes ?? {})) for (const [b, c] of Object.entries(rem.tracking)) if (c === id) names.push(`${r}/${b}`);
  for (const [b, c] of Object.entries(repo.branches)) if (c === id && b !== repo.head) names.push(b);
  return names.length ? ` (${names.join(", ")})` : "";
}

/** Mọi commit đi tới được từ `start`, mới nhất trước (như git log mặc định). */
function historyFrom(repo: GitRepo, start: string): Commit[] {
  const seen = new Set<string>([start]);
  const queue: Commit[] = [repo.commits[start]];
  const out: Commit[] = [];
  while (queue.length) {
    queue.sort((x, y) => y.time - x.time);
    const c = queue.shift() as Commit;
    out.push(c);
    for (const p of c.parents) {
      if (!seen.has(p) && repo.commits[p]) {
        seen.add(p);
        queue.push(repo.commits[p]);
      }
    }
  }
  return out;
}

function gitLog(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const dd = args.indexOf("--");
  const paths = dd >= 0 ? args.slice(dd + 1) : [];
  const front = dd >= 0 ? args.slice(0, dd) : args;
  let limit = Infinity;
  let revSpec: string | undefined;
  for (let i = 0; i < front.length; i++) {
    if (front[i] === "-n") limit = Number(front[++i]) || limit;
    else if (/^-\d+$/.test(front[i])) limit = Number(front[i].slice(1));
    else if (!front[i].startsWith("-") && revSpec === undefined) revSpec = front[i];
  }
  let id = revSpec ? resolveRev(repo, revSpec) : headId(repo);
  if (revSpec && !id) {
    if (paths.length === 0 && relInRepo(ctx, repo, revSpec) !== null && getNode(ctx.state.root, resolvePath(ctx.state.cwd, revSpec))) {
      paths.push(revSpec);
      id = headId(repo);
    } else return fail([`fatal: ambiguous argument '${revSpec}': unknown revision or path not in the working tree.`, "Use '--' to separate paths from revisions, like this:", "'git <command> [<revision>...] -- [<file>...]'"], 128);
  }
  if (!id) return fail(`fatal: your current branch '${repo.head}' does not have any commits yet`, 128);
  const oneline = front.includes("--oneline");
  const rels = paths.map((p) => relInRepo(ctx, repo, p)).filter((r): r is string => r !== null);
  let commits = historyFrom(repo, id);
  if (rels.length) {
    commits = commits.filter((c) => {
      const before = treeOf(repo, c.parents[0] ?? null);
      return changedPaths(before, c.tree).some((p) => rels.some((r) => under(p, r)));
    });
  }
  const rich: Span[][] = [];
  commits.slice(0, limit).forEach((c, count) => {
    const deco = decorations(repo, c.id);
    if (oneline) {
      rich.push([{ t: short(c.id), c: "yellow" }, { t: deco, c: "link" }, { t: ` ${c.message.split("\n")[0]}` }]);
      return;
    }
    if (count) rich.push([{ t: "" }]);
    rich.push([{ t: `commit ${c.id}`, c: "yellow" }, { t: deco, c: "link" }]);
    if (c.parents.length > 1) rich.push([{ t: `Merge: ${c.parents.map(short).join(" ")}` }]);
    rich.push([{ t: `Author: ${c.author} <${c.email}>` }]);
    rich.push([{ t: `Date:   ${formatGitDate(c.time)}` }]);
    rich.push([{ t: "" }]);
    for (const l of c.message.split("\n")) rich.push([{ t: `    ${l}` }]);
  });
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

// ------------------------------------------------ gộp ba chiều theo từng dòng

interface Hunk {
  start: number;
  end: number;
  repl: string[];
}

/** Các đoạn `other` đã đổi so với `base`: thay base[start..end) bằng repl. */
function hunksOf(base: string[], other: string[]): Hunk[] {
  const out: Hunk[] = [];
  let i = 0;
  let cur: Hunk | null = null;
  for (const op of diffLines(base, other)) {
    if (op.op === " ") {
      if (cur) out.push(cur);
      cur = null;
      i++;
      continue;
    }
    if (!cur) cur = { start: i, end: i, repl: [] };
    if (op.op === "-") {
      cur.end++;
      i++;
    } else cur.repl.push(op.line);
  }
  if (cur) out.push(cur);
  return out;
}

function applyHunks(base: string[], hunks: Hunk[], s: number, e: number): string[] {
  const out: string[] = [];
  let p = s;
  for (const h of hunks) {
    out.push(...base.slice(p, h.start), ...h.repl);
    p = h.end;
  }
  out.push(...base.slice(p, e));
  return out;
}

/** Gộp ba chiều như `git merge-file`: đoạn chỉ một bên sửa thì lấy luôn, hai
 *  bên sửa cùng chỗ khác nhau thì để dấu xung đột. */
function merge3(baseText: string, oursText: string, theirsText: string, label: string): { text: string; conflict: boolean } {
  const base = splitLines(baseText);
  const ho = hunksOf(base, splitLines(oursText));
  const ht = hunksOf(base, splitLines(theirsText));
  const out: string[] = [];
  let conflict = false;
  let i = 0;
  let a = 0;
  let b = 0;
  while (a < ho.length || b < ht.length) {
    const first = b >= ht.length || (a < ho.length && ho[a].start <= ht[b].start) ? ho[a] : ht[b];
    const s = first.start;
    let e = first.end;
    const co: Hunk[] = [];
    const ct: Hunk[] = [];
    for (let grew = true; grew; ) {
      grew = false;
      const joins = (h: Hunk) => h.start < e || h.start === s || (h.start === e && s === e);
      if (a < ho.length && joins(ho[a])) {
        e = Math.max(e, ho[a].end);
        co.push(ho[a++]);
        grew = true;
      }
      if (b < ht.length && joins(ht[b])) {
        e = Math.max(e, ht[b].end);
        ct.push(ht[b++]);
        grew = true;
      }
    }
    out.push(...base.slice(i, s));
    const mine = applyHunks(base, co, s, e);
    const theirs = applyHunks(base, ct, s, e);
    if (!co.length) out.push(...theirs);
    else if (!ct.length || mine.join("\n") === theirs.join("\n")) out.push(...mine);
    else {
      conflict = true;
      out.push("<<<<<<< HEAD", ...mine, "=======", ...theirs, `>>>>>>> ${label}`);
    }
    i = e;
  }
  out.push(...base.slice(i));
  return { text: out.length ? out.join("\n") + "\n" : "", conflict };
}

/** Gộp commit `theirs` vào nhánh đang đứng. `label` là tên hiện trong dấu xung đột. */
function mergeIn(ctx: Ctx, repo: GitRepo, theirs: string, label: string, message: string): CmdResult {
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
  const marked: Tree = {};
  const notes: string[] = [];
  const keys = new Set([...Object.keys(base), ...Object.keys(oursTree), ...Object.keys(theirsTree)]);
  for (const p of [...keys].sort()) {
    const b = base[p];
    const o = oursTree[p];
    const t = theirsTree[p];
    let v: string | undefined;
    if (o === t) v = o;
    else if (o === b) v = t;
    else if (t === b) v = o;
    else if (o !== undefined && t !== undefined) {
      const m = merge3(b ?? "", o, t, label);
      v = m.text;
      if (m.conflict) {
        conflicts.push(p);
        marked[p] = m.text;
        v = o;
      }
    } else {
      conflicts.push(p);
      v = o ?? t;
      notes.push(`CONFLICT (modify/delete): ${p} deleted in ${o === undefined ? "HEAD" : label} and modified in ${o === undefined ? label : "HEAD"}.  Version ${o === undefined ? label : "HEAD"} of ${p} left in tree.`);
    }
    if (v !== undefined) merged[p] = v;
  }
  if (conflicts.length) {
    // cây làm việc nhận bản đã gộp được, riêng tệp xung đột mang dấu để tự sửa
    applyTree(ctx, repo, oursTree, merged);
    for (const [p, text] of Object.entries(marked)) writeFile(ctx.state.root, `${repo.root}/${p}`, text, ctx.now);
    repo.index = { ...merged };
    const state: MergeState = { target: label, ours, theirs, conflicts: [...conflicts], message };
    repo.merging = state;
    return {
      out: [...Object.keys(marked).flatMap((p) => [`Auto-merging ${p}`, `CONFLICT (content): Merge conflict in ${p}`]), ...notes, "Automatic merge failed; fix conflicts and then commit the result."],
      err: [],
      code: 1,
      notices: ["mergeConflict"],
    };
  }
  applyTree(ctx, repo, oursTree, merged);
  const commit = makeCommit(ctx, repo, message, [ours, theirs], merged);
  repo.branches[repo.head] = commit.id;
  repo.index = { ...merged };
  const stat = diffStat(oursTree, merged);
  return ok(["Merge made by the 'ort' strategy.", ...stat.lines, summaryLine(stat.files, stat.ins, stat.del)]);
}

function gitMerge(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  if (args.includes("--abort")) {
    const m = repo.merging;
    if (!m) return fail("fatal: There is no merge to abort (MERGE_HEAD missing).", 128);
    const oursTree = treeOf(repo, m.ours);
    for (const p of Object.keys(repo.index)) if (oursTree[p] === undefined) removeNode(ctx.state.root, `${repo.root}/${p}`);
    for (const [p, text] of Object.entries(oursTree)) {
      ensureDir(ctx.state.root, `${repo.root}/${p}`.split("/").slice(0, -1).join("/"), ctx.now);
      writeFile(ctx.state.root, `${repo.root}/${p}`, text, ctx.now);
    }
    repo.index = { ...oursTree };
    delete repo.merging;
    return ok();
  }
  if (repo.merging) {
    return fail(["error: Merging is not possible because you have unmerged files.", "hint: Fix them up in the work tree, and then use 'git add/rm <file>'", "hint: as appropriate to mark resolution and make a commit.", "fatal: Exiting because of an unresolved conflict."], 128);
  }
  const target = args.find((a) => !a.startsWith("-"));
  if (!target) return fail("fatal: No remote for the current branch.", 128);
  const theirs = repo.branches[target];
  if (!theirs) return fail([`merge: ${target} - not something we can merge`]);
  return mergeIn(ctx, repo, theirs, target, `Merge branch '${target}'`);
}

/** Khối "diff --git" cho từng tệp khác nhau giữa hai cây. */
function treeDiff(from: Tree, to: Tree, only?: (p: string) => boolean): Span[][] {
  const rich: Span[][] = [];
  for (const p of changedPaths(from, to)) {
    if (only && !only(p)) continue;
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
  return rich;
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
  const rich = treeDiff(from, to, (p) => !specs.length || specs.some((r) => r !== null && under(p, r)));
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

// ------------------------------------------------ tham chiếu, thẻ, hoàn tác

/** "HEAD", "HEAD~2", "main", "v1.0.0", "origin/main", "3f2a1c9" → id commit. */
function resolveRev(repo: GitRepo, spec: string): string | null {
  const m = /^(.*?)((?:[~^]\d*)*)$/.exec(spec);
  const name = m ? m[1] : spec;
  let id: string | null = null;
  if (name === "HEAD" || name === "@") id = headId(repo);
  else if (repo.branches[name]) id = repo.branches[name];
  else if (repo.tags?.[name]) id = repo.tags[name];
  else if (name.includes("/") && trackingId(repo, name)) id = trackingId(repo, name);
  else if (/^[0-9a-f]{4,40}$/.test(name)) {
    const hits = Object.keys(repo.commits).filter((c) => c.startsWith(name));
    if (hits.length === 1) id = hits[0];
  }
  if (!id) return null;
  for (const step of (m ? m[2] : "").match(/[~^]\d*/g) ?? []) {
    const n = step.length > 1 ? Number(step.slice(1)) : 1;
    for (let i = 0; i < n && id; i++) id = repo.commits[id]?.parents[0] ?? null;
    if (!id) return null;
  }
  return id;
}

function badRevision(spec: string): CmdResult {
  return fail([`fatal: ambiguous argument '${spec}': unknown revision or path not in the working tree.`, "Use '--' to separate paths from revisions, like this:", "'git <command> [<revision>...] -- [<file>...]'"], 128);
}

function gitTag(repo: GitRepo, args: string[]): CmdResult {
  repo.tags ??= {};
  const del = args.includes("-d") || args.includes("--delete");
  const names: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-m" || a === "-F") i++;
    else if (!a.startsWith("-")) names.push(a);
  }
  if (del) {
    const out: string[] = [];
    for (const n of names) {
      const id = repo.tags[n];
      if (!id) return fail(`error: tag '${n}' not found.`);
      out.push(`Deleted tag '${n}' (was ${short(id)})`);
      delete repo.tags[n];
    }
    return ok(out);
  }
  if (!names.length) return ok(Object.keys(repo.tags).sort());
  const [name, rev] = names;
  if (!/^[A-Za-z0-9._/-]+$/.test(name) || name.startsWith("-")) return fail(`fatal: '${name}' is not a valid tag name.`, 128);
  if (repo.tags[name]) return fail(`fatal: tag '${name}' already exists`, 128);
  const id = rev ? resolveRev(repo, rev) : headId(repo);
  if (!id) return fail(rev ? `fatal: Failed to resolve '${rev}' as a valid ref.` : "fatal: Failed to resolve 'HEAD' as a valid ref.", 128);
  repo.tags[name] = id;
  return ok();
}

function gitShow(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const spec = args.find((a) => !a.startsWith("-"));
  const id = spec ? resolveRev(repo, spec) : headId(repo);
  if (!id) return spec ? badRevision(spec) : fail("fatal: your current branch 'main' does not have any commits yet", 128);
  const c = repo.commits[id];
  const rich: Span[][] = [[{ t: `commit ${c.id}`, c: "yellow" }, { t: decorations(repo, c.id), c: "link" }]];
  if (c.parents.length > 1) rich.push([{ t: `Merge: ${c.parents.map(short).join(" ")}` }]);
  rich.push([{ t: `Author: ${c.author} <${c.email}>` }], [{ t: `Date:   ${formatGitDate(c.time)}` }], [{ t: "" }]);
  for (const l of c.message.split("\n")) rich.push([{ t: `    ${l}` }]);
  const stat = args.includes("--stat");
  const before = treeOf(repo, c.parents[0] ?? null);
  if (stat) {
    const d = diffStat(before, c.tree);
    rich.push([{ t: "" }], ...d.lines.map((l) => [{ t: l }]), [{ t: summaryLine(d.files, d.ins, d.del) }]);
  } else if (c.parents.length < 2) {
    rich.push([{ t: "" }], ...treeDiff(before, c.tree));
  }
  void ctx;
  return ok(rich.map((r) => r.map((x) => x.t).join("")), rich);
}

function dirtyPaths(ctx: Ctx, repo: GitRepo): string[] {
  const info = statusInfo(ctx.state, repo);
  return [...new Set([...info.staged.map((x) => x.path), ...info.unstaged.map((x) => x.path)])];
}

function gitRevert(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const spec = args.find((a) => !a.startsWith("-"));
  if (!spec) return fail("fatal: revert: no commit specified", 128);
  const id = resolveRev(repo, spec);
  if (!id) return badRevision(spec);
  const target = repo.commits[id];
  if (target.parents.length > 1) return fail(`error: commit ${id} is a merge but no -m option was given.`, 129);
  const cur = headId(repo);
  if (!cur) return fail("fatal: your current branch does not have any commits yet", 128);
  const before = treeOf(repo, target.parents[0] ?? null);
  const touched = changedPaths(before, target.tree);
  const dirty = dirtyPaths(ctx, repo).filter((p) => touched.includes(p));
  if (dirty.length) {
    return fail(["error: Your local changes to the following files would be overwritten by revert:", ...dirty.map((p) => `\t${show(ctx, repo, p)}`), "hint: Commit your changes or stash them to proceed.", "fatal: revert failed"], 128);
  }
  const now = { ...treeOf(repo, cur) };
  const clash = touched.filter((p) => now[p] !== target.tree[p]);
  if (clash.length) {
    return fail([
      ...clash.flatMap((p) => [`Auto-merging ${p}`, `CONFLICT (content): Merge conflict in ${p}`]),
      `error: could not revert ${short(id)}... ${target.message.split("\n")[0]}`,
      "hint: A later commit changed the same lines. The simulator leaves everything unchanged;",
      "hint: revert the later commit first, or undo by editing the file and committing.",
    ]);
  }
  const next: Tree = { ...now };
  for (const p of touched) {
    if (before[p] === undefined) delete next[p];
    else next[p] = before[p];
  }
  applyTree(ctx, repo, now, next);
  const subject = target.message.split("\n")[0];
  const commit = makeCommit(ctx, repo, `Revert "${subject}"\n\nThis reverts commit ${id}.`, [cur], next);
  repo.branches[repo.head] = commit.id;
  repo.index = { ...next };
  const stat = diffStat(now, next);
  return ok([`[${repo.head} ${short(commit.id)}] Revert "${subject}"`, ` Date: ${formatGitDate(ctx.now)}`, summaryLine(stat.files, stat.ins, stat.del)]);
}

function gitReset(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const mode = args.includes("--hard") ? "hard" : args.includes("--soft") ? "soft" : "mixed";
  const rest = args.filter((a) => !a.startsWith("-"));
  const cur = headId(repo);
  // `git reset <tệp>`: bỏ tệp khỏi vùng chờ
  if (rest.length && !resolveRev(repo, rest[0]) && !args.includes("--hard") && !args.includes("--soft")) {
    const res = restorePaths(ctx, repo, rest, true);
    return res.code ? res : ok();
  }
  const id = rest.length ? resolveRev(repo, rest[0]) : cur;
  if (!id) return rest.length ? badRevision(rest[0]) : fail("fatal: Failed to resolve 'HEAD' as a valid ref.", 128);
  const target = treeOf(repo, id);
  const out: string[] = [];
  if (mode !== "soft") {
    const before = { ...repo.index };
    repo.index = { ...target };
    if (mode === "hard") {
      const wt = workTree(ctx.state, repo);
      for (const p of Object.keys(before)) if (target[p] === undefined) removeNode(ctx.state.root, `${repo.root}/${p}`);
      for (const [p, text] of Object.entries(target)) {
        if (wt[p] === text) continue;
        ensureDir(ctx.state.root, `${repo.root}/${p}`.split("/").slice(0, -1).join("/"), ctx.now);
        writeFile(ctx.state.root, `${repo.root}/${p}`, text, ctx.now);
      }
      delete repo.merging;
      out.push(`HEAD is now at ${short(id)} ${repo.commits[id].message.split("\n")[0]}`);
    } else {
      const wt = workTree(ctx.state, repo);
      const left = Object.keys(target).filter((p) => wt[p] !== target[p]);
      const gone = Object.keys(before).filter((p) => target[p] === undefined && wt[p] !== undefined);
      if (left.length || gone.length) out.push("Unstaged changes after reset:", ...left.map((p) => `${wt[p] === undefined ? "D" : "M"}\t${p}`));
    }
  }
  repo.branches[repo.head] = id;
  return ok(out);
}

interface StashEntry {
  message: string;
  branch: string;
  base: string | null;
  tree: Tree;
}

function stashList(repo: GitRepo): StashEntry[] {
  const r = repo as GitRepo & { stash?: StashEntry[] };
  r.stash ??= [];
  return r.stash;
}

function gitStash(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const list = stashList(repo);
  const sub = args[0] && !args[0].startsWith("-") ? args[0] : "push";
  const rest = sub === "push" && args[0] === "push" ? args.slice(1) : args;
  if (sub === "list") return ok(list.map((e, i) => `stash@{${i}}: ${e.message}`));
  if (sub === "pop" || sub === "apply") {
    const e = list[0];
    if (!e) return fail("No stash entries found.");
    const wt = workTree(ctx.state, repo);
    const head = treeOf(repo, headId(repo));
    const clash = Object.keys(e.tree).filter((p) => wt[p] !== undefined && wt[p] !== head[p] && wt[p] !== e.tree[p]);
    if (clash.length) {
      return fail(["error: Your local changes to the following files would be overwritten by merge:", ...clash.map((p) => `\t${show(ctx, repo, p)}`), "Please commit your changes or stash them before you merge.", "Aborting"]);
    }
    for (const [p, text] of Object.entries(e.tree)) {
      ensureDir(ctx.state.root, `${repo.root}/${p}`.split("/").slice(0, -1).join("/"), ctx.now);
      writeFile(ctx.state.root, `${repo.root}/${p}`, text, ctx.now);
    }
    for (const p of Object.keys(head)) if (e.tree[p] === undefined && wt[p] === head[p] && e.base && repo.commits[e.base]?.tree[p] === undefined) removeNode(ctx.state.root, `${repo.root}/${p}`);
    if (sub === "pop") list.shift();
    const st = statusOutput(ctx, repo);
    return ok([...st.out, ...(sub === "pop" ? [`Dropped refs/stash@{0} (${fakeHash(e.message + ctx.now, 40)})`] : [])], undefined);
  }
  if (sub === "drop") {
    if (!list.length) return fail("No stash entries found.");
    list.shift();
    return ok([`Dropped refs/stash@{0} (${fakeHash("drop" + ctx.now, 40)})`]);
  }
  if (sub === "clear") {
    list.length = 0;
    return ok();
  }
  if (sub !== "push") return fail(`error: unknown subcommand: ${sub}`, 129);
  const cur = headId(repo);
  if (!cur) return fail("You do not have the initial commit yet", 1);
  const dirty = dirtyPaths(ctx, repo);
  if (!dirty.length) return ok(["No local changes to save"]);
  const wt = workTree(ctx.state, repo);
  const tree: Tree = {};
  for (const p of dirty) if (wt[p] !== undefined) tree[p] = wt[p];
  let message = `WIP on ${repo.head}: ${short(cur)} ${repo.commits[cur].message.split("\n")[0]}`;
  const mi = rest.findIndex((a) => a === "-m" || a === "--message");
  if (mi >= 0 && rest[mi + 1]) message = `On ${repo.head}: ${rest[mi + 1]}`;
  list.unshift({ message, branch: repo.head, base: cur, tree });
  // đưa cây làm việc và vùng chờ về đúng HEAD
  const head = treeOf(repo, cur);
  for (const p of dirty) {
    if (head[p] === undefined) removeNode(ctx.state.root, `${repo.root}/${p}`);
    else writeFile(ctx.state.root, `${repo.root}/${p}`, head[p], ctx.now);
  }
  repo.index = { ...head };
  return ok([`Saved working directory and index state ${message}`]);
}

function gitRm(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const cached = args.includes("--cached");
  const force = args.includes("-f") || args.includes("--force");
  const recursive = args.includes("-r");
  const specs = args.filter((a) => !a.startsWith("-"));
  if (!specs.length) return fail(["usage: git rm [<options>] [--] <file>...", ""], 129);
  const out: string[] = [];
  const head = treeOf(repo, headId(repo));
  for (const spec of specs) {
    const rel = relInRepo(ctx, repo, spec);
    const hits = rel === null ? [] : Object.keys(repo.index).filter((p) => under(p, rel));
    if (!hits.length) return fail(`fatal: pathspec '${spec}' did not match any files`, 128);
    if (hits.length > 1 && !recursive && hits[0] !== rel) return fail(`fatal: not removing '${spec}' recursively without -r`, 128);
    const wt = workTree(ctx.state, repo);
    if (!cached && !force) {
      const mod = hits.filter((p) => wt[p] !== undefined && wt[p] !== repo.index[p]);
      if (mod.length) return fail([`error: the following file has local modifications:`, `    ${show(ctx, repo, mod[0])}`, "(use --cached to keep the file, or -f to force removal)"]);
    }
    for (const p of hits) {
      delete repo.index[p];
      if (!cached) removeNode(ctx.state.root, `${repo.root}/${p}`);
      out.push(`rm '${show(ctx, repo, p)}'`);
    }
  }
  void head;
  return ok(out);
}

// ------------------------------------------------ kho từ xa

function remoteLabel(url: string): string {
  return url.replace(/^git@/, "").replace(/^ssh:\/\/git@/, "");
}

function gitRemote(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  repo.remotes ??= {};
  const [sub, name, url] = args.filter((a) => a !== "-v" || args.length === 1);
  if (!args.length) return ok(Object.keys(repo.remotes));
  if (args[0] === "-v" || args[0] === "--verbose") {
    return ok(Object.entries(repo.remotes).flatMap(([n, r]) => [`${n}\t${r.url} (fetch)`, `${n}\t${r.url} (push)`]));
  }
  if (sub === "add") {
    if (!name || !url) return fail("usage: git remote add [<options>] <name> <url>", 129);
    if (repo.remotes[name]) return fail(`error: remote ${name} already exists.`, 3);
    repo.remotes[name] = { url, branches: {}, tracking: {} };
    return ok();
  }
  if (sub === "remove" || sub === "rm") {
    if (!name || !repo.remotes[name]) return fail(`error: No such remote: '${name ?? ""}'`, 2);
    delete repo.remotes[name];
    for (const [b, ref] of Object.entries(repo.upstreams ?? {})) if (ref.startsWith(name + "/")) delete (repo.upstreams as Record<string, string>)[b];
    return ok();
  }
  if (sub === "get-url") {
    if (!name || !repo.remotes[name]) return fail(`error: No such remote '${name ?? ""}'`, 2);
    return ok([repo.remotes[name].url]);
  }
  void ctx;
  return fail(`error: Unknown subcommand: ${sub}`, 129);
}

function upstreamOf(repo: GitRepo): { remote: string; branch: string } | null {
  const ref = repo.upstreams?.[repo.head];
  if (!ref) return null;
  const [remote, ...rest] = ref.split("/");
  return { remote, branch: rest.join("/") };
}

function fetchRemote(repo: GitRepo, name: string): string[] {
  const rem = repo.remotes?.[name];
  if (!rem) return [];
  const lines: string[] = [];
  for (const [b, id] of Object.entries(rem.branches)) {
    const old = rem.tracking[b];
    if (old === id) continue;
    const w = Math.max(10, b.length);
    if (!old) lines.push(` * [new branch]      ${b.padEnd(w)} -> ${name}/${b}`);
    else lines.push(`   ${short(old)}..${short(id)}  ${b.padEnd(w)} -> ${name}/${b}`);
    rem.tracking[b] = id;
  }
  return lines.length ? [`From ${remoteLabel(rem.url)}`, ...lines] : [];
}

function gitFetch(repo: GitRepo, args: string[]): CmdResult {
  const names = Object.keys(repo.remotes ?? {});
  const name = args.find((a) => !a.startsWith("-")) ?? upstreamOf(repo)?.remote ?? names[0];
  if (!name || !repo.remotes?.[name]) {
    return fail(name ? [`fatal: '${name}' does not appear to be a git repository`, "fatal: Could not read from remote repository.", "", "Please make sure you have the correct access rights", "and the repository exists."] : ["fatal: No remote repository specified.  Please, specify either a URL or a", "remote name from which new revisions should be fetched."], 128);
  }
  return ok(fetchRemote(repo, name));
}

/** Đặt các commit cục bộ chưa đẩy lên trên `upstream` (pull --rebase). */
function rebaseOnto(ctx: Ctx, repo: GitRepo, upstream: string): CmdResult {
  const cur = headId(repo);
  if (!cur) return fail("fatal: cannot rebase: you have no commits", 128);
  const dirty = dirtyPaths(ctx, repo);
  if (dirty.length) return fail(["error: cannot pull with rebase: You have unstaged changes.", "error: Please commit or stash them."], 1);
  if (cur === upstream || ancestors(repo, cur).has(upstream)) return ok(["Current branch " + repo.head + " is up to date."]);
  const known = ancestors(repo, upstream);
  const mine: Commit[] = [];
  for (let id: string | null = cur; id && !known.has(id); ) {
    const c: Commit = repo.commits[id];
    if (c.parents.length > 1) return fail("error: the simulator cannot rebase merge commits; use git pull without --rebase");
    mine.unshift(c);
    id = c.parents[0] ?? null;
  }
  if (ancestors(repo, upstream).has(cur)) {
    applyTree(ctx, repo, treeOf(repo, cur), treeOf(repo, upstream));
    repo.branches[repo.head] = upstream;
    repo.index = { ...treeOf(repo, upstream) };
    return ok(["Successfully rebased and updated refs/heads/" + repo.head + "."]);
  }
  let base = upstream;
  let tree = { ...treeOf(repo, upstream) };
  for (const c of mine) {
    const parentTree = treeOf(repo, c.parents[0] ?? null);
    const next: Tree = { ...tree };
    for (const p of changedPaths(parentTree, c.tree)) {
      const b = parentTree[p];
      const o = tree[p];
      const t = c.tree[p];
      let v: string | undefined;
      if (o === b) v = t;
      else if (o === t) v = o;
      else if (o !== undefined && t !== undefined) {
        const m = merge3(b ?? "", o, t, short(c.id));
        if (m.conflict) {
          return fail([`Auto-merging ${p}`, `CONFLICT (content): Merge conflict in ${p}`, `error: could not apply ${short(c.id)}... ${c.message.split("\n")[0]}`, "hint: The simulator does not pause a rebase; your branch is unchanged. Try git pull (merge) instead."]);
        }
        v = m.text;
      } else {
        return fail([`CONFLICT (modify/delete): ${p}`, `error: could not apply ${short(c.id)}... ${c.message.split("\n")[0]}`, "hint: The simulator does not pause a rebase; your branch is unchanged. Try git pull (merge) instead."]);
      }
      if (v === undefined) delete next[p];
      else next[p] = v;
    }
    const nc = makeCommit(ctx, repo, c.message, [base], next);
    base = nc.id;
    tree = next;
  }
  applyTree(ctx, repo, treeOf(repo, cur), tree);
  repo.branches[repo.head] = base;
  repo.index = { ...tree };
  return ok([`Successfully rebased and updated refs/heads/${repo.head}.`]);
}

function gitPull(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const up = upstreamOf(repo);
  const positional = args.filter((a) => !a.startsWith("-"));
  const remoteName = positional[0] ?? up?.remote;
  const branch = positional[1] ?? up?.branch ?? repo.head;
  if (!remoteName || !repo.remotes?.[remoteName]) {
    if (!Object.keys(repo.remotes ?? {}).length || !positional.length) {
      return fail(["There is no tracking information for the current branch.", "Please specify which branch you want to merge with.", "See git-pull(1) for details.", "", "    git pull <remote> <branch>"]);
    }
    return fail([`fatal: '${remoteName}' does not appear to be a git repository`, "fatal: Could not read from remote repository."], 128);
  }
  const rem = repo.remotes[remoteName];
  const fetched = fetchRemote(repo, remoteName);
  const theirs = rem.tracking[branch];
  if (!theirs) return fail([`fatal: couldn't find remote ref ${branch}`], 128);
  const out = [...fetched];
  const res = args.includes("--rebase") || args.includes("-r")
    ? rebaseOnto(ctx, repo, theirs)
    : mergeIn(ctx, repo, theirs, `${remoteName}/${branch}`, `Merge branch '${branch}' of ${remoteLabel(rem.url)}`);
  return { ...res, out: [...out, ...res.out] };
}

function gitPush(ctx: Ctx, repo: GitRepo, args: string[]): CmdResult {
  const force = args.includes("-f") || args.includes("--force") || args.some((a) => a.startsWith("--force-with-lease"));
  const setUp = args.includes("-u") || args.includes("--set-upstream");
  const positional = args.filter((a) => !a.startsWith("-"));
  const up = upstreamOf(repo);
  const noRemote = !repo.remotes || !Object.keys(repo.remotes).length;
  if (noRemote && !positional.length) {
    return fail(["fatal: No configured push destination.", "Either specify the URL from the command-line or configure a remote repository using", "", "    git remote add <name> <url>", "", "and then push using the remote name", "", "    git push <name>"], 128);
  }
  const remoteName = positional[0] ?? up?.remote;
  if (!remoteName) {
    return fail([`fatal: The current branch ${repo.head} has no upstream branch.`, "To push the current branch and set the remote as upstream, use", "", `    git push --set-upstream origin ${repo.head}`, ""], 128);
  }
  const rem = repo.remotes?.[remoteName];
  if (!rem) return fail([`fatal: '${remoteName}' does not appear to be a git repository`, "fatal: Could not read from remote repository.", "", "Please make sure you have the correct access rights", "and the repository exists."], 128);
  const spec = positional[1] ?? repo.head;
  const [srcName, dstName = srcName] = spec.split(":");
  const local = repo.branches[srcName];
  if (!local) return fail([`error: src refspec ${srcName} does not match any`, `error: failed to push some refs to '${remoteLabel(rem.url)}'`]);
  const remoteTip = rem.branches[dstName];
  const to = `To ${remoteLabel(rem.url)}`;
  const out: string[] = [];
  if (remoteTip === local) {
    out.push("Everything up-to-date");
  } else if (!remoteTip) {
    out.push(to, ` * [new branch]      ${srcName} -> ${dstName}`);
  } else if (ancestors(repo, local).has(remoteTip)) {
    out.push(to, `   ${short(remoteTip)}..${short(local)}  ${srcName} -> ${dstName}`);
  } else if (force) {
    out.push(to, ` + ${short(remoteTip)}...${short(local)} ${srcName} -> ${dstName} (forced update)`);
  } else {
    const fetchFirst = rem.tracking[dstName] !== remoteTip;
    return fail([
      to,
      ` ! [rejected]        ${srcName} -> ${dstName} (${fetchFirst ? "fetch first" : "non-fast-forward"})`,
      `error: failed to push some refs to '${remoteLabel(rem.url)}'`,
      ...(fetchFirst
        ? ["hint: Updates were rejected because the remote contains work that you do not", "hint: have locally. This is usually caused by another repository pushing to", "hint: the same ref. If you want to integrate the remote changes, use", "hint: 'git pull' before pushing again."]
        : ["hint: Updates were rejected because the tip of your current branch is behind", "hint: its remote counterpart. If you want to integrate the remote changes,", "hint: use 'git pull' before pushing again."]),
      "hint: See the 'Note about fast-forwards' in 'git push --help' for details.",
    ]);
  }
  rem.branches[dstName] = local;
  rem.tracking[dstName] = local;
  if (setUp) {
    repo.upstreams ??= {};
    repo.upstreams[srcName] = `${remoteName}/${dstName}`;
    out.push(`branch '${srcName}' set up to track '${remoteName}/${dstName}'.`);
  }
  void ctx;
  return ok(out);
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
  "diff", "restore", "config", "push", "pull", "remote", "fetch", "tag", "show", "revert", "reset", "stash", "rm",
];

/** Danh sách cho Tab. Thiếu `stash` có chủ đích: `git sta<Tab>` vẫn điền thẳng `status`
 *  như từ trước tới giờ (đúng ra git sẽ liệt kê cả hai). */
export const GIT_TAB_SUBCOMMANDS = GIT_SUBCOMMANDS.filter((c) => c !== "stash");

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
      return gitLog(ctx, repo, rest);
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
      return gitRemote(ctx, repo, rest);
    case "fetch":
      return gitFetch(repo, rest);
    case "push":
      return gitPush(ctx, repo, rest);
    case "pull":
      return gitPull(ctx, repo, rest);
    case "tag":
      return gitTag(repo, rest);
    case "show":
      return gitShow(ctx, repo, rest);
    case "revert":
      return gitRevert(ctx, repo, rest);
    case "reset":
      return gitReset(ctx, repo, rest);
    case "stash":
      return gitStash(ctx, repo, rest);
    case "rm":
      return gitRm(ctx, repo, rest);
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
