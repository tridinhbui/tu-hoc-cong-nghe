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

export const TERMINAL_MISSIONS: TerminalMission[] = [
  {
    id: "pwd",
    check: (s) => s.log.some((e) => e.cmd === "pwd" && e.code === 0),
  },
  {
    id: "ls-project",
    check: (s) => s.log.some((e) => e.cmd === "ls" && e.code === 0 && e.cwd === PROJECT),
  },
  {
    id: "mkdir-notes",
    check: (s) => {
      const home = getDir(s.root, HOME);
      if (!home) return false;
      return findDirNamed(home, "ghi-chu").some((d) => Object.values(d.children).some((c) => c.type === "file"));
    },
  },
  {
    id: "echo-write",
    // tệp vừa ghi phải còn và có chữ - không tính "echo > tệp" rỗng
    check: (s) => s.log.some((e) => e.cmd === "echo" && e.redirect && e.code === 0) && hasNonEmptyUserFile(s),
  },
  {
    id: "grep-word",
    check: (s) => s.log.some((e) => e.cmd === "grep" && e.code === 0),
  },
  {
    id: "git-commit",
    check: (s) => Object.values(s.git).some((r) => Object.keys(r.commits).length > 0 && !!getNode(s.root, `${r.root}/.git`)),
  },
  {
    id: "git-branch",
    check: (s) =>
      Object.values(s.git).some(
        (r) => r.head !== "main" && r.head !== "master" && r.branches[r.head] != null && !!getNode(s.root, `${r.root}/.git`)
      ),
  },
  {
    id: "docker-nginx",
    check: (s) => {
      const c = s.docker.containers.find(
        (x) => x.status === "running" && x.image.split(":")[0] === "nginx" && x.ports.some((p) => p.host === 8080 && p.container === 80)
      );
      return !!c && s.log.some((e) => e.cmd === "docker ps" && e.code === 0 && e.seq > c.createdSeq);
    },
  },
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
