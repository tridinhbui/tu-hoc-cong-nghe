/** Nhiệm vụ của Terminal, xếp từ dễ tới khó - đúng những việc tuần đầu đi làm
 *  cần: biết mình đang ở đâu, đi lại và xem tệp, tạo và ghi tệp, tìm chữ,
 *  commit với Git, làm việc trên nhánh, chạy một container; rồi tới quyền tệp,
 *  biến môi trường, đọc nhật ký bằng đường ống, tiến trình, DNS, hoàn tác và gắn
 *  thẻ trong Git, gộp xung đột, kho từ xa, volume và build image với Docker.
 *
 *  Tên và gợi ý nằm trong từ điển (t.toolTerminal.missions[id]). */
import { HOME, getDir, getNode } from "./fs";
import { depsLayerStable, dockerfileKey } from "./docker";
import { APP_LOG_TEXT, LAB_ROOTS, LOG_DIR, LOG_FILES, SSH_DIR } from "./labs";
import type { Commit, DirNode, GitRepo, LogEntry, TermState } from "./types";

export interface TerminalMission {
  id: string;
  check: (state: TermState) => boolean;
  /** Tiêu chí đạt, từ yếu tới mạnh; tiêu chí cuối chính là `check`, nên
   *  "đủ mọi tiêu chí" và "qua nhiệm vụ" không lệch nhau. */
  criteria: { id: string; check: (state: TermState) => boolean }[];
}

const PROJECT = `${HOME}/du-an`;

function findDirNamed(dir: DirNode, name: string): DirNode[] {
  const out: DirNode[] = [];
  for (const [n, child] of Object.entries(dir.children)) {
    if (child.type !== "dir") continue;
    if (n === name) out.push(child);
    out.push(...findDirNamed(child, name));
  }
  return out;
}

function notesDirs(s: TermState): DirNode[] {
  const home = getDir(s.root, HOME);
  return home ? findDirNamed(home, "ghi-chu") : [];
}

/** Kho do người học tự tạo - không tính các kho mẫu dựng sẵn ở /srv. */
const liveRepos = (s: TermState) => Object.values(s.git).filter((r) => !r.lab && !!getNode(s.root, `${r.root}/.git`));
const isMain = (b: string) => b === "main" || b === "master";

function nginxOn8080(s: TermState) {
  return s.docker.containers.find(
    (x) => x.status === "running" && x.image.split(":")[0] === "nginx" && x.ports.some((p) => p.host === 8080 && p.container === 80)
  );
}

function m(id: string, criteria: TerminalMission["criteria"]): TerminalMission {
  return { id, check: criteria[criteria.length - 1].check, criteria };
}

export const TERMINAL_MISSIONS: TerminalMission[] = [
  m("pwd", [{ id: "printed", check: (s) => s.log.some((e) => e.cmd === "pwd" && e.code === 0) }]),
  m("ls-project", [
    { id: "inside", check: (s) => s.cwd === PROJECT || s.log.some((e) => e.cwd === PROJECT) },
    { id: "listed", check: (s) => s.log.some((e) => e.cmd === "ls" && e.code === 0 && e.cwd === PROJECT) },
  ]),
  m("mkdir-notes", [
    { id: "dir", check: (s) => notesDirs(s).length > 0 },
    { id: "file", check: (s) => notesDirs(s).some((d) => Object.values(d.children).some((c) => c.type === "file")) },
  ]),
  m("echo-write", [
    { id: "redirect", check: (s) => s.log.some((e) => e.cmd === "echo" && e.redirect && e.code === 0) },
    // tệp vừa ghi phải còn và có chữ - không tính "echo > tệp" rỗng
    {
      id: "content",
      check: (s) => s.log.some((e) => e.cmd === "echo" && e.redirect && e.code === 0) && hasNonEmptyUserFile(s),
    },
  ]),
  m("grep-word", [
    { id: "ran", check: (s) => s.log.some((e) => e.cmd === "grep") },
    { id: "found", check: (s) => s.log.some((e) => e.cmd === "grep" && e.code === 0) },
  ]),
  m("git-commit", [
    { id: "repo", check: (s) => liveRepos(s).length > 0 },
    { id: "commit", check: (s) => liveRepos(s).some((r) => Object.keys(r.commits).length > 0) },
  ]),
  m("git-branch", [
    { id: "branch", check: (s) => liveRepos(s).some((r) => Object.keys(r.branches).some((b) => !isMain(b))) },
    { id: "head", check: (s) => liveRepos(s).some((r) => !isMain(r.head) && r.branches[r.head] != null) },
  ]),
  m("docker-nginx", [
    { id: "running", check: (s) => !!nginxOn8080(s) },
    {
      id: "ps",
      check: (s) => {
        const c = nginxOn8080(s);
        return !!c && s.log.some((e) => e.cmd === "docker ps" && e.code === 0 && e.seq > c.createdSeq);
      },
    },
  ]),

  // ---- nâng cao: quyền tệp, môi trường, đường ống, tiến trình, mạng
  m("chmod-exec", [
    { id: "script", check: (s) => userFiles(s).some((f) => f.name.endsWith(".sh") && f.content.trim().length > 0) },
    { id: "exec", check: (s) => userFiles(s).some((f) => f.name.endsWith(".sh") && f.content.trim().length > 0 && (f.mode & 0o100) !== 0) },
    {
      id: "ran",
      check: (s) =>
        userFiles(s).some((f) => f.name.endsWith(".sh") && f.content.trim().length > 0 && (f.mode & 0o100) !== 0) &&
        s.log.some((e) => e.cmd.includes("/") && e.cmd.endsWith(".sh") && e.code === 0),
    },
  ]),
  m("chmod-key", [
    { id: "key", check: (s) => modeOf(s, `${SSH_DIR}/id_ed25519`) === 0o600 },
    { id: "dir", check: (s) => modeOf(s, `${SSH_DIR}/id_ed25519`) === 0o600 && modeOf(s, SSH_DIR) === 0o700 },
  ]),
  m("env-export", [
    { id: "env", check: (s) => s.env?.APP_ENV === "production" },
    { id: "port", check: (s) => s.env?.APP_ENV === "production" && s.env?.PORT === "8080" },
    {
      id: "checked",
      check: (s) => s.env?.APP_ENV === "production" && s.env?.PORT === "8080" && s.log.some((e) => (e.cmd === "env" || e.cmd === "printenv") && e.code === 0),
    },
  ]),
  m("log-errors", [
    { id: "grep", check: (s) => s.log.some((e) => e.cmd === "grep" && e.code === 0) },
    { id: "redirect", check: (s) => s.log.some((e) => e.cmd === "grep" && e.code === 0) && s.log.some((e) => e.redirect && e.code === 0) },
    { id: "file", check: (s) => userFiles(s).some((f) => sameLines(f.content, ERROR_LINES)) },
  ]),
  m("dns-lookup", [
    { id: "lookup", check: lookedUpDomain },
    { id: "file", check: (s) => lookedUpDomain(s) && userFiles(s).some((f) => f.content.includes("203.0.113.10")) },
  ]),
  m("docker-logs", [
    { id: "running", check: (s) => !!nginxOn(s, 8081) },
    { id: "request", check: (s) => !!nginxOn(s, 8081) && (nginxOn(s, 8081)?.logs.some((l) => /"GET \S+ HTTP/.test(l)) ?? false) },
    {
      id: "logs",
      check: (s) => {
        const c = nginxOn(s, 8081);
        if (!c || !c.logs.some((l) => /"GET \S+ HTTP/.test(l))) return false;
        const lastCurl = lastIndex(s.log, (e) => e.cmd === "curl" && e.code === 0);
        return lastCurl >= 0 && s.log.some((e, i) => i > lastCurl && e.cmd === "docker logs" && e.code === 0);
      },
    },
  ]),
  m("log-rank", [
    { id: "tools", check: (s) => s.log.some((e) => e.cmd === "sort" && e.code === 0) && s.log.some((e) => e.cmd === "uniq" && e.code === 0) },
    { id: "counts", check: (s) => userFiles(s).some((f) => sameSet(normLines(f.content), RANKING)) },
    { id: "ranked", check: (s) => userFiles(s).some((f) => normLines(f.content).join("\n") === RANKING.join("\n")) },
  ]),
  m("find-old-logs", [
    { id: "looked", check: (s) => s.log.some((e) => (e.cmd === "find" || e.cmd === "ls") && (e.cwd.startsWith(LOG_DIR) || (e.args ?? []).some((a) => a.includes("myapp")))) },
    { id: "removed", check: (s) => OLD_LOGS.some((p) => !getNode(s.root, `${LOG_DIR}/${p}`)) },
    {
      id: "kept",
      check: (s) => OLD_LOGS.every((p) => !getNode(s.root, `${LOG_DIR}/${p}`)) && FRESH_LOGS.every((p) => !!getNode(s.root, `${LOG_DIR}/${p}`)),
    },
  ]),
  m("ps-kill", [
    { id: "looked", check: (s) => s.log.some((e) => e.cmd === "ps" && e.code === 0) },
    { id: "node", check: (s) => !!s.procs && !s.procs.some((p) => p.pid === 4121) },
    {
      id: "both",
      check: (s) =>
        !!s.procs &&
        !s.procs.some((p) => p.pid === 4121 || p.pid === 6120) &&
        s.procs.some((p) => p.pid === 903) &&
        s.procs.some((p) => p.pid === 412),
    },
  ]),
  // ---- Git: lịch sử, thẻ, xung đột, kho từ xa
  m("git-revert", [
    { id: "looked", check: (s) => s.log.some((e) => (e.cmd === "git log" || e.cmd === "git show") && e.cwd.startsWith(LAB_ROOTS.shop) && e.code === 0) },
    { id: "undone", check: (s) => shipFixed(s) },
    {
      id: "kept",
      check: (s) => {
        const r = s.git[LAB_ROOTS.shop];
        if (!r || !shipFixed(s)) return false;
        const head = headCommit(r);
        const originals = Object.values(r.commits).filter((c) => SHOP_MESSAGES.includes(c.message));
        return (
          r.head === "main" &&
          !!head &&
          !SHOP_MESSAGES.includes(head.message) &&
          head.tree["banner.txt"] === "Welcome to our shop\n" &&
          originals.length === SHOP_MESSAGES.length &&
          originals.every((c) => reachable(r, head.id).has(c.id))
        );
      },
    },
  ]),
  m("git-tag", [
    { id: "any", check: (s) => Object.keys(s.git[LAB_ROOTS.release]?.tags ?? {}).length > 0 },
    { id: "named", check: (s) => !!s.git[LAB_ROOTS.release]?.tags?.["v1.0.0"] },
    {
      id: "right",
      check: (s) => {
        const r = s.git[LAB_ROOTS.release];
        const target = r && Object.values(r.commits).find((c) => c.message === "Release 1.0: freeze packaging");
        return !!r && !!target && r.tags?.["v1.0.0"] === target.id;
      },
    },
  ]),
  m("docker-volume", [
    { id: "volume", check: (s) => (s.docker.volumes ?? []).some((v) => v.attachments > 0) },
    { id: "running", check: (s) => !!pgWithVolume(s) },
    {
      id: "survived",
      check: (s) => {
        const c = pgWithVolume(s);
        if (!c) return false;
        const src = c.mounts?.find((m) => m.named && m.target === "/var/lib/postgresql/data")?.source;
        const vol = (s.docker.volumes ?? []).find((v) => v.name === src);
        const users = s.docker.containers.filter((x) => x.mounts?.some((m) => m.named && m.source === src)).length;
        return !!vol && vol.initialized && vol.attachments >= 2 && users === 1;
      },
    },
  ]),
  m("docker-build", [
    { id: "built", check: (s) => s.docker.images.some((im) => im.built?.context === LAB_ROOTS.api) },
    { id: "cache", check: (s) => apiCacheFriendly(s) },
    {
      id: "tagged",
      check: (s) => {
        const df = getNode(s.root, `${LAB_ROOTS.api}/Dockerfile`);
        const im = s.docker.images.find((i) => i.repo === "api" && i.tag === "1.0");
        return !!im?.built && df?.type === "file" && im.built.context === LAB_ROOTS.api && im.built.dockerfileKey === dockerfileKey(df.content) && apiCacheFriendly(s);
      },
    },
  ]),
  m("git-conflict", [
    {
      id: "tried",
      check: (s) => {
        const r = s.git[LAB_ROOTS.site];
        return !!r && (!!r.merging || hasMergeCommit(r) || s.log.some((e) => e.cmd === "git merge" && e.code === 1 && e.cwd.startsWith(LAB_ROOTS.site)));
      },
    },
    {
      id: "fixed",
      check: (s) => {
        const r = s.git[LAB_ROOTS.site];
        if (!r || siteHasMarkers(s)) return false;
        return hasMergeCommit(r) || (!!r.merging && r.merging.conflicts.length === 0);
      },
    },
    {
      id: "merged",
      check: (s) => {
        const r = s.git[LAB_ROOTS.site];
        const head = r && headCommit(r);
        const other = r?.branches["sua-tieu-de"];
        const page = getNode(s.root, `${LAB_ROOTS.site}/index.html`);
        return (
          !!r && !!head && !!other && r.head === "main" && !r.merging && head.parents.length === 2 && head.parents.includes(other) &&
          !siteHasMarkers(s) && page?.type === "file" && page.content.includes("<h1>") && head.tree["index.html"] === page.content
        );
      },
    },
  ]),
  m("git-push-rejected", [
    { id: "fetched", check: (s) => !!blogRemote(s) && blogRemote(s)?.tracking.main === blogRemote(s)?.branches.main },
    { id: "integrated", check: (s) => blogSynced(s) },
    {
      id: "pushed",
      check: (s) => {
        const r = s.git[LAB_ROOTS.blog];
        const remote = blogRemote(s);
        const head = r && headCommit(r);
        if (!r || !remote || !head || !blogSynced(s)) return false;
        return remote.branches.main === head.id && head.tree["toc.md"] === "- bai-1\n" && head.tree["bai-2.md"] === "Second post\n";
      },
    },
  ]),
  m("env-secret", [
    { id: "env", check: (s) => /^[A-Z_]+=\S+/m.test(fileText(s, `${PROJECT}/.env`)) },
    { id: "ignore", check: (s) => fileText(s, `${PROJECT}/.env`) !== "" && /^\/?\.env$/m.test(fileText(s, `${PROJECT}/.gitignore`)) },
    {
      id: "safe",
      check: (s) => {
        const r = s.git[PROJECT];
        if (!r || !getNode(s.root, `${PROJECT}/.git`) || !getNode(s.root, `${PROJECT}/.env`)) return false;
        const commits = Object.values(r.commits);
        const head = headCommit(r);
        return (
          /^[A-Z_]+=\S+/m.test(fileText(s, `${PROJECT}/.env`)) &&
          /^\/?\.env$/m.test(fileText(s, `${PROJECT}/.gitignore`)) &&
          !!head && Object.keys(head.tree).length > 0 && commits.every((c) => !(".env" in c.tree))
        );
      },
    },
  ]),
];


interface UserFile {
  name: string;
  path: string;
  content: string;
  mode: number;
}

/** Tệp do người học tạo trong thư mục nhà và /tmp (bỏ .git và các tệp mẫu). */
function userFiles(s: TermState): UserFile[] {
  const out: UserFile[] = [];
  const walk = (dir: DirNode, path: string) => {
    for (const [n, c] of Object.entries(dir.children)) {
      if (c.type === "dir") {
        if (n !== ".git" && n !== ".ssh") walk(c, `${path}/${n}`);
      } else if (!SEEDED.has(n)) out.push({ name: n, path: `${path}/${n}`, content: c.content, mode: c.mode });
    }
  };
  const home = getDir(s.root, HOME);
  const tmp = getDir(s.root, "/tmp");
  if (home) walk(home, HOME);
  if (tmp) walk(tmp, "/tmp");
  return out;
}

const SEEDED = new Set(["README.md", "index.html", "app.js", "style.css", ".gitignore", "notes.txt", ".bashrc", "id_ed25519", "id_ed25519.pub", "known_hosts"]);

function modeOf(s: TermState, path: string): number | null {
  const n = getNode(s.root, path);
  return n ? n.mode & 0o777 : null;
}

function fileText(s: TermState, path: string): string {
  const n = getNode(s.root, path);
  return n && n.type === "file" ? n.content : "";
}

const normLines = (text: string) =>
  text.split("\n").map((l) => l.trim().replace(/\s+/g, " ")).filter(Boolean);
const sameSet = (a: string[], b: string[]) => a.length === b.length && [...a].sort().join("\n") === [...b].sort().join("\n");
const sameLines = (text: string, expected: string[]) => {
  const got = text.split("\n").filter((l) => l.length > 0);
  return got.length === expected.length && got.every((l, i) => l === expected[i]);
};
const lastIndex = <T,>(arr: T[], pred: (x: T) => boolean) => {
  for (let i = arr.length - 1; i >= 0; i--) if (pred(arr[i])) return i;
  return -1;
};

/** Các dòng ERROR trong app.log gốc, theo thứ tự. */
const ERROR_LINES = APP_LOG_TEXT.split("\n").filter((l) => l.includes(" ERROR "));

/** Kết quả đúng của `grep ERROR | cut -d' ' -f4 | sort | uniq -c | sort -rn`. */
const RANKING = (() => {
  const counts = new Map<string, number>();
  for (const l of ERROR_LINES) {
    const type = l.split(" ")[3];
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} ${k}`);
})();

const OLD_LOGS = LOG_FILES.filter((f) => f.ageDays > 14).map((f) => f.path);
const FRESH_LOGS = LOG_FILES.filter((f) => f.ageDays <= 14).map((f) => f.path);

function lookedUpDomain(s: TermState): boolean {
  return s.log.some((e: LogEntry) => ["dig", "nslookup", "host"].includes(e.cmd) && e.code === 0 && (e.args ?? []).some((a) => a.includes("vi-du.vn")));
}

function nginxOn(s: TermState, port: number) {
  return s.docker.containers.find((x) => x.status === "running" && x.image.split(":")[0] === "nginx" && x.ports.some((p) => p.host === port && p.container === 80));
}

function pgWithVolume(s: TermState) {
  return s.docker.containers.find(
    (c) => c.status === "running" && c.image.split(":")[0] === "postgres" && c.mounts?.some((m) => m.named && m.target === "/var/lib/postgresql/data")
  );
}

const headCommit = (r: GitRepo): Commit | null => {
  const id = r.branches[r.head];
  return id ? r.commits[id] ?? null : null;
};

function reachable(r: GitRepo, id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const c = stack.pop() as string;
    if (seen.has(c)) continue;
    seen.add(c);
    stack.push(...(r.commits[c]?.parents ?? []));
  }
  return seen;
}

/* i18n-ignore-start: lời nhắn commit trong kho mẫu - dữ liệu để so khớp, không hiện trên giao diện */
const SHOP_MESSAGES = ["Add cart page", "Add discount code", "Change shipping fee rule", "Fix typo in banner"];
/* i18n-ignore-end */

function shipFixed(s: TermState): boolean {
  const r = s.git[LAB_ROOTS.shop];
  const head = r && headCommit(r);
  return !!head && head.tree["ship.txt"] === "shipping-fee: 30000\n" && fileText(s, `${LAB_ROOTS.shop}/ship.txt`) === "shipping-fee: 30000\n";
}

function apiCacheFriendly(s: TermState): boolean {
  const dir = getDir(s.root, LAB_ROOTS.api);
  const df = getNode(s.root, `${LAB_ROOTS.api}/Dockerfile`);
  return !!dir && df?.type === "file" && depsLayerStable(dir, df.content);
}

const hasMergeCommit = (r: GitRepo) => Object.values(r.commits).some((c) => c.parents.length === 2);

function siteHasMarkers(s: TermState): boolean {
  return /^(<{7}|={7}|>{7})/m.test(fileText(s, `${LAB_ROOTS.site}/index.html`));
}

const blogRemote = (s: TermState) => s.git[LAB_ROOTS.blog]?.remotes?.origin;

/** Máy này đã có commit của đồng nghiệp trong lịch sử của nhánh main. */
function blogSynced(s: TermState): boolean {
  const r = s.git[LAB_ROOTS.blog];
  const head = r && headCommit(r);
  const theirs = r && Object.values(r.commits).find((c) => c.message === "Colleague adds post 2");
  return !!r && !!head && !!theirs && reachable(r, head.id).has(theirs.id);
}

/** Có ít nhất một tệp do người học tạo (không có trong dự án mẫu) chứa chữ. */
function hasNonEmptyUserFile(s: TermState): boolean {
  const walk = (dir: DirNode): boolean =>
    Object.entries(dir.children).some(([n, c]) =>
      c.type === "dir" ? n !== ".git" && n !== ".ssh" && walk(c) : !SEEDED.has(n) && c.content.trim().length > 0
    );
  const home = getDir(s.root, HOME);
  const tmp = getDir(s.root, "/tmp");
  return (!!home && walk(home)) || (!!tmp && walk(tmp));
}

export function completedMissionIds(state: TermState): string[] {
  return TERMINAL_MISSIONS.filter((m) => m.check(state)).map((m) => m.id);
}
