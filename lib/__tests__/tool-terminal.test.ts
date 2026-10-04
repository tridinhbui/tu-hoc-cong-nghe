import { describe, it, expect } from "vitest";
import { createInitialState } from "../tools/terminal/seed";
import { complete, runLine } from "../tools/terminal/shell";
import { getNode } from "../tools/terminal/fs";
import { TERMINAL_MISSIONS, completedMissionIds } from "../tools/terminal/missions";
import { HELP_GROUPS } from "../tools/terminal/reference";
import type { TermState } from "../tools/terminal/types";
import { toolTerminalVi, toolTerminalEn } from "../i18n/dictionaries/sections/tool-terminal";

const NOW = Date.UTC(2026, 8, 27, 3, 0, 0);

function sh(state: TermState, ...lines: string[]) {
  let s = state;
  let text = "";
  let code = 0;
  let notices: string[] = [];
  lines.forEach((line, i) => {
    const r = runLine(s, line, NOW + i * 1000);
    s = r.state;
    text = r.result.lines.map((l) => l.spans.map((x) => x.t).join("")).join("\n");
    code = r.result.code;
    notices = r.result.notices;
  });
  return { s, text, code, notices };
}

const fresh = () => createInitialState(NOW);

describe("terminal shell", () => {
  it("starts in /home/ban and navigates", () => {
    expect(sh(fresh(), "pwd").text).toBe("/home/ban");
    const r = sh(fresh(), "cd du-an/src", "pwd");
    expect(r.text).toBe("/home/ban/du-an/src");
    expect(sh(r.s, "cd ..", "pwd").text).toBe("/home/ban/du-an");
    expect(sh(r.s, "cd", "pwd").text).toBe("/home/ban");
    expect(sh(r.s, "cd /tmp", "cd ~/du-an", "pwd").text).toBe("/home/ban/du-an");
  });

  it("prints realistic errors", () => {
    expect(sh(fresh(), "cd nope").text).toBe("bash: cd: nope: No such file or directory");
    expect(sh(fresh(), "cd notes.txt").text).toBe("bash: cd: notes.txt: Not a directory");
    const r = sh(fresh(), "foo");
    expect(r.text).toBe("foo: command not found");
    expect(r.code).toBe(127);
    expect(sh(fresh(), "cat missing.txt").text).toBe("cat: missing.txt: No such file or directory");
    expect(sh(fresh(), "cat du-an").text).toBe("cat: du-an: Is a directory");
    expect(sh(fresh(), "mkdir du-an").text).toBe("mkdir: cannot create directory 'du-an': File exists");
    expect(sh(fresh(), "rm du-an").text).toBe("rm: cannot remove 'du-an': Is a directory");
    expect(sh(fresh(), "ls nope").text).toBe("ls: cannot access 'nope': No such file or directory");
  });

  it("lists files with ls, -a and -l", () => {
    const r = sh(fresh(), "cd du-an", "ls");
    expect(r.text).toBe("index.html  README.md  src");
    expect(sh(r.s, "ls -a").text).toContain(".gitignore");
    const long = sh(r.s, "ls -l").text.split("\n");
    expect(long[0]).toMatch(/^total \d+$/);
    expect(long.find((l) => l.endsWith(" src"))).toMatch(/^drwxr-xr-x 2 ban ban 4096 /);
  });

  it("mkdir -p, touch, echo > and >>, cat, cp, mv, rm -r", () => {
    let r = sh(fresh(), "mkdir -p a/b/c", "touch a/b/c/x.txt", "echo hello > a/f.txt", "echo world >> a/f.txt", "cat a/f.txt");
    expect(r.text).toBe("hello\nworld");
    r = sh(r.s, "cp a/f.txt a/g.txt", "mv a/g.txt a/b/h.txt", "ls a/b");
    expect(r.text).toBe("c  h.txt");
    expect(sh(r.s, "cp a z").text).toBe("cp: -r not specified; omitting directory 'a'");
    r = sh(r.s, "rm -r a", "ls a");
    expect(r.text).toBe("ls: cannot access 'a': No such file or directory");
    expect(sh(fresh(), "mkdir x/y").text).toBe("mkdir: cannot create directory 'x/y': No such file or directory");
  });

  it("head, tail, wc -l, pipes, grep flags, find, tree", () => {
    const base = sh(fresh(), "cd du-an").s;
    expect(sh(base, "head -n 1 README.md").text).toBe("# Todo App");
    expect(sh(base, "tail -n 1 README.md").text).toBe("- Save tasks to localStorage");
    expect(sh(base, "wc -l README.md").text).toBe("12 README.md");
    expect(sh(base, "cat README.md | wc -l").text).toBe("12");
    expect(sh(base, "grep -n TODO src/app.js").text).toBe("3:// TODO: let the user add new tasks");
    expect(sh(base, "grep -i todo README.md").text).toBe("# Todo App\n## TODO");
    const rec = sh(base, "grep -rn TODO .");
    expect(rec.text).toContain("src/app.js:3:");
    expect(rec.code).toBe(0);
    expect(sh(base, "grep zzz README.md").code).toBe(1);
    expect(sh(base, "cat src/app.js | grep -c tasks").text).toBe("3");
    expect(sh(base, "find . -name '*.js'").text).toBe("./src/app.js");
    expect(sh(base, "find . -type d").text).toBe(".\n./src");
    const tree = sh(base, "tree").text;
    expect(tree).toContain("└── src");
    expect(tree).toContain("1 directory, 4 files");
  });

  it("expands globs and ~, and honours quotes", () => {
    const base = sh(fresh(), "cd du-an").s;
    expect(sh(base, "ls src/*.js").text).toBe("src/app.js");
    expect(sh(base, 'echo "a   b"').text).toBe("a   b");
    expect(sh(base, "echo ~").text).toBe("/home/ban");
    expect(sh(base, "echo 'unterminated").code).toBe(2);
  });

  it("chmod updates ls -l and gates ./script execution", () => {
    let r = sh(fresh(), "echo 'echo hi from script' > run.sh", "./run.sh");
    expect(r.text).toBe("bash: ./run.sh: Permission denied");
    r = sh(r.s, "chmod +x run.sh", "ls -l run.sh");
    expect(r.text).toMatch(/^-rwxr-xr-x /);
    expect(sh(r.s, "./run.sh").text).toBe("hi from script");
    expect(sh(r.s, "chmod 600 run.sh", "ls -l run.sh").text).toMatch(/^-rw------- /);
    expect(sh(r.s, "chmod abc run.sh").text).toContain("chmod: invalid mode");
  });

  it("whoami, which, history, clear, help", () => {
    expect(sh(fresh(), "whoami").text).toBe("ban");
    expect(sh(fresh(), "which git").text).toBe("/usr/bin/git");
    expect(sh(fresh(), "which cd").code).toBe(1);
    expect(sh(fresh(), "pwd", "ls", "history").text).toBe("    1  pwd\n    2  ls\n    3  history");
    const r = runLine(fresh(), "clear", NOW);
    expect(r.result.clear).toBe(true);
    expect(sh(fresh(), "help").notices).toEqual(["help"]);
    expect(sh(fresh(), "nano x").notices).toEqual(["noEditor"]);
  });

  it("tab-completes files, dirs, commands and branches", () => {
    const s = fresh();
    expect(complete(s, "cd du").line).toBe("cd du-an/");
    expect(complete(s, "cat du-an/src/ap").line).toBe("cat du-an/src/app.js ");
    expect(complete(s, "whoa").line).toBe("whoami ");
    const amb = complete(sh(s, "cd du-an/src").s, "cat ");
    expect(amb.options).toEqual(["app.js", "style.css"]);
    expect(complete(s, "git sta").line).toBe("git status ");
  });
});

describe("terminal git", () => {
  const repo = () => sh(fresh(), "cd du-an", "git init").s;

  it("init, status, add, commit, log", () => {
    let r = sh(fresh(), "cd du-an", "git status");
    expect(r.text).toBe("fatal: not a git repository (or any of the parent directories): .git");
    r = sh(fresh(), "cd du-an", "git init");
    expect(r.text).toBe("Initialized empty Git repository in /home/ban/du-an/.git/");
    r = sh(r.s, "git status");
    expect(r.text).toContain("No commits yet");
    expect(r.text).toContain("Untracked files:");
    expect(r.text).toContain("\tsrc/");
    r = sh(r.s, "git add .", "git status");
    expect(r.text).toContain("new file:   README.md");
    r = sh(r.s, 'git commit -m "First commit"');
    expect(r.text).toMatch(/^\[main \(root-commit\) [0-9a-f]{7}\] First commit\n 5 files changed, \d+ insertions\(\+\)/);
    expect(sh(r.s, "git status").text).toBe("On branch main\nnothing to commit, working tree clean");
    expect(sh(r.s, "git log --oneline").text).toMatch(/^[0-9a-f]{7} \(HEAD -> main\) First commit$/);
    expect(sh(r.s, "git log").text).toContain("Author: ban <ban@may-hoc.local>");
  });

  it("commit without -m explains instead of opening an editor", () => {
    const r = sh(repo(), "git add .", "git commit");
    expect(r.code).toBe(1);
    expect(r.notices).toEqual(["noEditor"]);
  });

  it("diff shows changed lines, --staged after add", () => {
    let r = sh(repo(), "git add .", "git commit -m init", "echo '# Changed' > README.md", "git diff");
    expect(r.text).toContain("diff --git a/README.md b/README.md");
    expect(r.text).toContain("-# Todo App");
    expect(r.text).toContain("+# Changed");
    r = sh(r.s, "git status");
    expect(r.text).toContain("modified:   README.md");
    r = sh(r.s, "git add README.md", "git diff");
    expect(r.text).toBe("");
    expect(sh(r.s, "git diff --staged").text).toContain("+# Changed");
  });

  it("branches, switching, fast-forward and three-way merges", () => {
    let r = sh(repo(), "git add .", "git commit -m init", "git switch -c feature");
    expect(r.text).toBe("Switched to a new branch 'feature'");
    r = sh(r.s, "echo 'body{}' > src/extra.css", "git add .", "git commit -m 'add css'", "git branch");
    expect(r.text).toBe("* feature\n  main");
    r = sh(r.s, "git checkout main", "ls src");
    expect(r.text).toBe("app.js  style.css");
    r = sh(r.s, "git merge feature");
    expect(r.text).toContain("Fast-forward");
    expect(getNode(r.s.root, "/home/ban/du-an/src/extra.css")).not.toBeNull();

    // ba chiều: hai nhánh sửa hai tệp khác nhau
    r = sh(r.s, "git checkout -b docs", "echo more >> README.md", "git commit -am 'docs'", "git switch main", "echo x >> index.html", "git commit -am 'html'", "git merge docs");
    expect(r.text).toContain("Merge made by the 'ort' strategy.");
    expect(sh(r.s, "git log --oneline -1").text).toContain("Merge branch 'docs'");
    expect(sh(r.s, "cat README.md").text).toContain("more");
  });

  it("refuses to checkout over uncommitted conflicting changes", () => {
    const r = sh(repo(), "git add .", "git commit -m init", "git branch other", "git switch other", "echo a > README.md", "git commit -am a", "git switch main", "echo b > README.md", "git switch other");
    expect(r.text).toContain("error: Your local changes to the following files would be overwritten by switch:");
    expect(r.code).toBe(1);
  });

  it("reports conflicts and marks the file for hand resolution", () => {
    const r = sh(repo(), "git add .", "git commit -m init", "git switch -c x", "echo x > README.md", "git commit -am x", "git switch main", "echo m > README.md", "git commit -am m", "git merge x");
    expect(r.text).toContain("CONFLICT (content): Merge conflict in README.md");
    expect(r.notices).toEqual(["mergeConflict"]);
    expect(sh(r.s, "cat README.md").text).toBe("<<<<<<< HEAD\nm\n=======\nx\n>>>>>>> x");
  });

  it("errors on unknown subcommands and bad branches", () => {
    expect(sh(repo(), "git frobnicate").text).toBe("git: 'frobnicate' is not a git command. See 'git --help'.");
    expect(sh(repo(), "git checkout nope").text).toBe("error: pathspec 'nope' did not match any file(s) known to git");
    expect(sh(repo(), "git log").text).toBe("fatal: your current branch 'main' does not have any commits yet");
  });
});

describe("terminal docker", () => {
  it("pull, images, run, ps, logs, stop, rm", () => {
    let r = sh(fresh(), "docker --version");
    expect(r.text).toBe("Docker version 27.3.1, build ce12230");
    r = sh(r.s, "docker pull nginx");
    expect(r.text).toContain("Status: Downloaded newer image for nginx:latest");
    expect(sh(r.s, "docker images").text).toMatch(/REPOSITORY\s+TAG\s+IMAGE ID/);
    r = sh(r.s, "docker run -d -p 8080:80 --name web nginx");
    expect(r.text).toMatch(/^[0-9a-f]{64}$/);
    r = sh(r.s, "docker ps");
    expect(r.text).toContain("0.0.0.0:8080->80/tcp");
    expect(r.text).toContain(" web");
    expect(sh(r.s, "docker logs web").text).toContain("start worker processes");
    expect(sh(r.s, "curl localhost:8080").text).toContain("Welcome to nginx!");
    expect(sh(r.s, "docker run -d -p 8080:80 nginx").text).toContain("port is already allocated");
    expect(sh(r.s, "docker run -d --name web nginx").text).toContain('The container name "/web" is already in use');
    expect(sh(r.s, "docker rm web").text).toContain("container is running");
    r = sh(r.s, "docker stop web", "docker ps");
    expect(r.text.split("\n")).toHaveLength(1);
    expect(sh(r.s, "docker ps -a").text).toContain("Exited (0)");
    r = sh(r.s, "docker rm web", "docker ps -a");
    expect(r.text.split("\n")).toHaveLength(1);
  });

  it("pulls implicitly on run and rejects unknown images", () => {
    const r = sh(fresh(), "docker run hello-world");
    expect(r.text).toContain("Unable to find image 'hello-world:latest' locally");
    expect(r.text).toContain("Hello from Docker!");
    expect(sh(fresh(), "docker run nosuchimage").text).toContain("pull access denied for nosuchimage");
    expect(sh(fresh(), "docker logs ghost").text).toBe("Error response from daemon: No such container: ghost");
  });
});

describe("terminal missions", () => {
  it("every mission has vi and en copy", () => {
    for (const m of TERMINAL_MISSIONS) {
      const vi = toolTerminalVi.toolTerminal.missions[m.id as keyof typeof toolTerminalVi.toolTerminal.missions];
      const en = toolTerminalEn.toolTerminal.missions[m.id as keyof typeof toolTerminalEn.toolTerminal.missions];
      expect(vi?.title && vi.hint, m.id).toBeTruthy();
      expect(en?.title && en.hint, m.id).toBeTruthy();
    }
    expect(Object.keys(toolTerminalVi.toolTerminal.missions).sort()).toEqual(TERMINAL_MISSIONS.map((m) => m.id).sort());
    expect(TERMINAL_MISSIONS.length).toBeGreaterThanOrEqual(6);
  });

  it("every help/cheat-sheet entry has vi and en copy", () => {
    for (const g of HELP_GROUPS) {
      expect(toolTerminalVi.toolTerminal.groups[g.id]).toBeTruthy();
      for (const it of g.items) {
        expect(toolTerminalVi.toolTerminal.commands[it.id as keyof typeof toolTerminalVi.toolTerminal.commands], it.id).toBeTruthy();
        expect(toolTerminalEn.toolTerminal.commands[it.id as keyof typeof toolTerminalEn.toolTerminal.commands], it.id).toBeTruthy();
      }
    }
  });

  it("a fresh machine has no mission done", () => {
    expect(completedMissionIds(fresh())).toEqual([]);
  });

  it("a scripted session completes every mission, in order", () => {
    const steps: [string, string[]][] = [
      ["pwd", ["pwd"]],
      ["ls-project", ["cd du-an", "ls -la"]],
      ["mkdir-notes", ["mkdir ghi-chu", "touch ghi-chu/hom-nay.txt"]],
      ["echo-write", ['echo "Hoc terminal" > ghi-chu/hom-nay.txt']],
      ["grep-word", ["grep -rn TODO ."]],
      ["git-commit", ["git init", "git add .", 'git commit -m "Commit dau tien"']],
      ["git-branch", ["git switch -c tinh-nang-moi"]],
      ["docker-nginx", ["docker run -d -p 8080:80 --name web nginx", "docker ps"]],
    ];
    let s = fresh();
    const done: string[] = [];
    for (const [id, lines] of steps) {
      expect(completedMissionIds(s), `${id} before`).not.toContain(id);
      s = sh(s, ...lines).s;
      done.push(id);
      expect(completedMissionIds(s), id).toEqual(expect.arrayContaining(done));
    }
    // 8 nhiệm vụ gốc; các nhiệm vụ mở rộng có bộ kiểm thử riêng (tool-terminal-missions.test.ts)
    expect(completedMissionIds(s)).toEqual(expect.arrayContaining(steps.map(([id]) => id)));
  });

  it("does not count near misses", () => {
    // ls ở thư mục nhà, echo không ghi tệp, grep không khớp, nginx sai cổng
    const s = sh(fresh(), "ls", "echo hi", "grep zzz notes.txt", "docker run -d -p 9090:80 nginx", "docker ps").s;
    expect(completedMissionIds(s)).toEqual([]);
    // chạy nginx nhưng chưa xem docker ps
    const s2 = sh(fresh(), "docker run -d -p 8080:80 nginx").s;
    expect(completedMissionIds(s2)).not.toContain("docker-nginx");
  });
});
