/** Nhiệm vụ của Terminal, xếp từ dễ tới khó - đúng những việc tuần đầu đi làm
 *  cần: biết mình đang ở đâu, đi lại và xem tệp, tạo và ghi tệp, tìm chữ,
 *  commit với Git, làm việc trên nhánh, chạy một container.
 *
 *  Tên và gợi ý nằm trong từ điển (t.toolTerminal.missions[id]). */
import { HOME, getDir, getNode } from "./fs";
import type { DirNode, TermState } from "./types";

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

const liveRepos = (s: TermState) => Object.values(s.git).filter((r) => !!getNode(s.root, `${r.root}/.git`));
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
];

/** Có ít nhất một tệp do người học tạo (không có trong dự án mẫu) chứa chữ. */
function hasNonEmptyUserFile(s: TermState): boolean {
  const SEEDED = new Set(["README.md", "index.html", "app.js", "style.css", ".gitignore", "notes.txt", ".bashrc"]);
  const walk = (dir: DirNode): boolean =>
    Object.entries(dir.children).some(([n, c]) =>
      c.type === "dir" ? n !== ".git" && walk(c) : !SEEDED.has(n) && c.content.trim().length > 0
    );
  const home = getDir(s.root, HOME);
  const tmp = getDir(s.root, "/tmp");
  return (!!home && walk(home)) || (!!tmp && walk(tmp));
}

export function completedMissionIds(state: TermState): string[] {
  return TERMINAL_MISSIONS.filter((m) => m.check(state)).map((m) => m.id);
}
