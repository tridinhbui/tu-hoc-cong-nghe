/** Dữ liệu mẫu cho các nhiệm vụ nâng cao: kho Git dựng sẵn ở /srv, nhật ký ở
 *  /var/log/myapp, khoá SSH trong ~/.ssh, bảng tiến trình, dự án Docker.
 *
 *  Tất cả nằm NGOÀI ~/du-an và ngoài các thư mục mà nhiệm vụ cũ đọc, nên
 *  `ls`, `tree`, `git status` trong ~/du-an giữ nguyên kết quả cũ. */
/* i18n-ignore-start: nội dung các tệp và commit trên ổ đĩa mô phỏng - mã nguồn,
   nhật ký và lời nhắn commit viết bằng tiếng Anh như dự án thật */
import { HOME, ensureDir, getDir, mkDir, mkFile, writeFile } from "./fs";
import { SEED_PROCS } from "./extras";
import type { Commit, GitRepo, TermState, Tree } from "./types";
import { fakeHash } from "./util";

export const SEED_VERSION = 1;

export const LAB_ROOTS = {
  shop: "/srv/cua-hang",
  release: "/srv/phat-hanh",
  site: "/srv/trang-chu",
  blog: "/srv/blog",
  api: "/srv/api",
} as const;

export const LOG_DIR = "/var/log/myapp";
export const SSH_DIR = `${HOME}/.ssh`;

const DAY = 86_400_000;

// ---------------------------------------------------------------- kho Git

interface Step {
  message: string;
  /** Tệp đổi trong commit này; `null` là xoá. */
  files: Record<string, string | null>;
  parent?: string;
  /** Nhánh mà commit này được đặt lên. */
  branch?: string;
  ageDays: number;
}

function buildRepo(state: TermState, root: string, now: number, steps: Step[], head: string): GitRepo {
  const repo: GitRepo = { root, head, branches: {}, commits: {}, index: {}, lab: true };
  const byKey: Record<string, Commit> = {};
  let current: Commit | null = null;
  steps.forEach((st, i) => {
    const parent = st.parent ? byKey[st.parent] : current;
    const tree: Tree = { ...(parent?.tree ?? {}) };
    for (const [p, c] of Object.entries(st.files)) {
      if (c === null) delete tree[p];
      else tree[p] = c;
    }
    const time = now - st.ageDays * DAY;
    const id = fakeHash(JSON.stringify([root, i, st.message, tree]));
    const commit: Commit = {
      id,
      message: st.message,
      parents: parent ? [parent.id] : [],
      tree,
      time,
      author: "ban",
      email: "ban@may-hoc.local",
    };
    repo.commits[id] = commit;
    byKey[st.message] = commit;
    if (st.branch) repo.branches[st.branch] = id;
    current = commit;
  });
  const tip = repo.branches[head];
  const tree = (tip ? repo.commits[tip].tree : {}) as Tree;
  repo.index = { ...tree };
  const dir = ensureDir(state.root, root, now);
  if (dir) {
    dir.children[".git"] = mkDir(now);
    for (const [p, c] of Object.entries(tree)) {
      const parts = p.split("/");
      ensureDir(state.root, [root, ...parts.slice(0, -1)].join("/"), now);
      writeFile(state.root, `${root}/${p}`, c, now - 3 * DAY);
    }
  }
  state.git[root] = repo;
  return repo;
}

function seedGitLabs(state: TermState, now: number) {
  // 1. cửa hàng: một commit giữa chừng đã làm hỏng phí ship
  buildRepo(
    state,
    LAB_ROOTS.shop,
    now,
    [
      { message: "Add cart page", files: { "cart.txt": "Cart page v1\n", "ship.txt": "shipping-fee: 30000\n", "banner.txt": "Welcom to our shop\n" }, branch: "main", ageDays: 9 },
      { message: "Add discount code", files: { "price.txt": "price: 100000\ndiscount: 10%\n" }, branch: "main", ageDays: 7 },
      { message: "Change shipping fee rule", files: { "ship.txt": "shipping-fee: -30000\n" }, branch: "main", ageDays: 5 },
      { message: "Fix typo in banner", files: { "banner.txt": "Welcome to our shop\n" }, branch: "main", ageDays: 2 },
    ],
    "main"
  );

  // 2. phát hành: bản 1.0 nằm ở commit thứ ba, HEAD đã đi xa hơn
  buildRepo(
    state,
    LAB_ROOTS.release,
    now,
    [
      { message: "Initial project setup", files: { "app.txt": "version: 0.1.0\n" }, branch: "main", ageDays: 14 },
      { message: "Add login page", files: { "login.txt": "login form\n" }, branch: "main", ageDays: 10 },
      { message: "Release 1.0: freeze packaging", files: { "app.txt": "version: 1.0.0\n" }, branch: "main", ageDays: 6 },
      { message: "Start dark mode experiment", files: { "theme.txt": "dark mode (work in progress)\n" }, branch: "main", ageDays: 1 },
    ],
    "main"
  );

  // 3. trang chủ: hai nhánh cùng sửa dòng tiêu đề
  const html = (h1: string) => `<html>\n<body>\n<h1>${h1}</h1>\n<p>Welcome</p>\n</body>\n</html>\n`;
  buildRepo(
    state,
    LAB_ROOTS.site,
    now,
    [
      { message: "Add homepage", files: { "index.html": html("Learn every day") }, branch: "main", ageDays: 8 },
      { message: "Add about page", files: { "about.html": "<h1>About</h1>\n" }, branch: "main", ageDays: 7 },
      { message: "Retitle homepage", files: { "index.html": html("Learn technology every day") }, parent: "Add about page", branch: "sua-tieu-de", ageDays: 4 },
      { message: "Shorten homepage title", files: { "index.html": html("Study every day") }, parent: "Add about page", branch: "main", ageDays: 3 },
    ],
    "main"
  );

  // 4. blog: đồng nghiệp đã đẩy lên trước, còn máy này chưa biết
  const blog = buildRepo(
    state,
    LAB_ROOTS.blog,
    now,
    [
      { message: "Start blog", files: { "README.md": "# Blog\n" }, branch: "main", ageDays: 6 },
      { message: "Write first post", files: { "bai-1.md": "First post\n" }, branch: "main", ageDays: 5 },
      { message: "Update table of contents", files: { "toc.md": "- bai-1\n" }, branch: "main", ageDays: 1 },
      { message: "Colleague adds post 2", files: { "bai-2.md": "Second post\n", "toc.md": null }, parent: "Write first post", ageDays: 2 },
    ],
    "main"
  );
  const ids = Object.values(blog.commits);
  const shared = ids.find((c) => c.message === "Write first post") as Commit;
  const theirs = ids.find((c) => c.message === "Colleague adds post 2") as Commit;
  // bản của đồng nghiệp chỉ thêm bài 2, không đụng toc.md
  theirs.tree = { ...shared.tree, "bai-2.md": "Second post\n" };
  blog.remotes = {
    origin: {
      url: "git@github.com:ban/blog.git",
      branches: { main: theirs.id },
      tracking: { main: shared.id },
    },
  };
  blog.upstreams = { main: "origin/main" };
}

// ---------------------------------------------------------------- tệp & nhật ký

const APP_LOG: [string, string, string][] = [
  ["08:01:12", "INFO", "server_started port=3000"],
  ["08:03:40", "INFO", "order_created order=1040"],
  ["08:05:02", "WARN", "slow_query ms=1840"],
  ["08:09:17", "ERROR", "payment_timeout order=1041"],
  ["08:12:45", "INFO", "order_created order=1042"],
  ["08:14:02", "ERROR", "payment_timeout order=1042"],
  ["08:20:31", "INFO", "user_login user=an"],
  ["08:26:08", "ERROR", "db_connection_lost host=db1"],
  ["08:26:12", "INFO", "db_reconnected host=db1"],
  ["08:41:55", "WARN", "cache_miss key=cart:77"],
  ["08:55:20", "ERROR", "stock_negative sku=A12"],
  ["09:02:44", "ERROR", "payment_timeout order=1045"],
  ["09:10:09", "INFO", "order_created order=1046"],
  ["09:18:33", "ERROR", "email_bounce to=khach@vi-du.vn"],
  ["09:25:50", "ERROR", "payment_timeout order=1047"],
  ["09:31:02", "WARN", "slow_query ms=2210"],
  ["09:44:18", "ERROR", "db_connection_lost host=db1"],
  ["09:44:21", "INFO", "db_reconnected host=db1"],
  ["10:03:27", "ERROR", "payment_timeout order=1050"],
  ["10:12:00", "INFO", "user_login user=binh"],
  ["10:20:41", "ERROR", "stock_negative sku=B07"],
  ["10:31:15", "ERROR", "db_connection_lost host=db2"],
  ["10:40:00", "INFO", "order_created order=1052"],
];

export const APP_LOG_TEXT = APP_LOG.map(([t, lvl, msg]) => `2026-10-04 ${t} ${lvl} ${msg}`).join("\n") + "\n";

/** Tệp trong LOG_DIR: tuổi (ngày) quyết định tệp nào là "cũ hơn 14 ngày". */
export const LOG_FILES: { path: string; ageDays: number; content: string }[] = [
  { path: "app.log", ageDays: 0, content: APP_LOG_TEXT },
  { path: "error.log", ageDays: 0, content: "2026-10-04 10:31:16 [crit] upstream db2 unreachable\n" },
  { path: "access.log", ageDays: 1, content: '203.0.113.7 - - "GET / HTTP/1.1" 200\n' },
  { path: "app.log.1", ageDays: 3, content: "2026-10-01 23:59:59 INFO rotated\n" },
  { path: "app.log.2.gz", ageDays: 10, content: "(compressed)\n" },
  { path: "app.log.3.gz", ageDays: 20, content: "(compressed)\n" },
  { path: "app.log.4.gz", ageDays: 35, content: "(compressed)\n" },
  { path: "access.log.2.gz", ageDays: 50, content: "(compressed)\n" },
  { path: "archive/2026-06.gz", ageDays: 120, content: "(compressed)\n" },
];

function seedLogs(state: TermState, now: number) {
  const dir = ensureDir(state.root, LOG_DIR, now);
  if (!dir) return;
  for (const f of LOG_FILES) {
    const parts = f.path.split("/");
    const parent = ensureDir(state.root, [LOG_DIR, ...parts.slice(0, -1)].join("/"), now);
    if (!parent) continue;
    const mtime = now - f.ageDays * DAY - 3_600_000;
    parent.children[parts[parts.length - 1]] = mkFile(f.content, mtime);
    if (parent !== dir) parent.mtime = mtime;
  }
}

const PRIVATE_KEY = "-----BEGIN OPENSSH PRIVATE KEY-----\n(demo key - not a real secret)\n-----END OPENSSH PRIVATE KEY-----\n";

function seedSsh(state: TermState, now: number) {
  const home = getDir(state.root, HOME);
  if (!home) return;
  const ssh = mkDir(now);
  ssh.children["id_ed25519"] = mkFile(PRIVATE_KEY, now, 0o644);
  ssh.children["id_ed25519.pub"] = mkFile("ssh-ed25519 AAAA-demo-key ban@may-hoc\n", now, 0o644);
  ssh.children["known_hosts"] = mkFile("github.com ssh-ed25519 AAAA-demo-host\n", now, 0o644);
  home.children[".ssh"] = ssh;
}

// ---------------------------------------------------------------- dự án Docker

const PACKAGE_JSON = `{
  "name": "api",
  "version": "1.0.0",
  "scripts": { "start": "node server.js" },
  "dependencies": { "express": "^4.19.2" }
}
`;

const SERVER_JS = `const http = require("http");

http.createServer((req, res) => res.end("ok")).listen(3000);
`;

/** Dockerfile ban đầu: COPY . . đứng trước npm ci nên sửa một dòng mã cũng
 *  buộc cài lại toàn bộ thư viện. */
export const API_DOCKERFILE = `FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "server.js"]
`;

function seedApi(state: TermState, now: number) {
  const dir = ensureDir(state.root, LAB_ROOTS.api, now);
  if (!dir) return;
  dir.children["package.json"] = mkFile(PACKAGE_JSON, now);
  dir.children["package-lock.json"] = mkFile('{ "lockfileVersion": 3 }\n', now);
  dir.children["server.js"] = mkFile(SERVER_JS, now);
  dir.children["Dockerfile"] = mkFile(API_DOCKERFILE, now);
  dir.children[".dockerignore"] = mkFile("node_modules\n.git\n", now);
}
/* i18n-ignore-end */

/** Dựng toàn bộ dữ liệu mẫu nâng cao lên một trạng thái. */
export function seedExtras(state: TermState, now: number): void {
  seedGitLabs(state, now);
  seedLogs(state, now);
  seedSsh(state, now);
  seedApi(state, now);
  state.procs = SEED_PROCS.map((p) => ({ ...p }));
  state.seedVersion = SEED_VERSION;
}

/** Trạng thái lưu từ phiên bản cũ chưa có dữ liệu mẫu: bổ sung đúng một lần,
 *  không đụng tới thứ người học đã làm. */
export function migrateState(state: TermState, now: number): TermState {
  if ((state.seedVersion ?? 0) >= SEED_VERSION) return state;
  const next = structuredClone(state);
  seedExtras(next, now);
  return next;
}
