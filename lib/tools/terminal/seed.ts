/** Trạng thái ban đầu: máy Linux nhỏ với thư mục nhà /home/ban và một dự án
 *  web mẫu ở ~/du-an để người học đi lại, đọc, sửa, commit. */
import { HOME, mkDir, mkFile } from "./fs";
import type { DirNode, TermState } from "./types";

/** Các lệnh có tệp thực thi trong /usr/bin - `which` và Tab đọc danh sách này. */
export const BIN_COMMANDS = [
  "ls", "cat", "echo", "pwd", "mkdir", "touch", "rm", "cp", "mv", "head", "tail",
  "wc", "grep", "find", "tree", "whoami", "hostname", "date", "clear", "chmod",
  "which", "git", "docker", "curl", "sudo",
];

/** Lệnh dựng sẵn của bash, không có tệp trong /usr/bin. */
export const BUILTIN_COMMANDS = ["cd", "help", "history"];

/* i18n-ignore-start: nội dung các tệp trên ổ đĩa mô phỏng - mã nguồn và README
   của dự án viết bằng tiếng Anh như dự án thật, không phải chữ giao diện */
const README = `# Todo App

A tiny to-do list web app used for practice.

## Run locally

Open index.html in a browser.

## TODO

- Add a dark mode
- Save tasks to localStorage
`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
  <link rel="stylesheet" href="src/style.css">
</head>
<body>
  <h1>My tasks</h1>
  <ul id="list"></ul>
  <script src="src/app.js"></script>
</body>
</html>
`;

const APP_JS = `const tasks = ["Learn the terminal", "Make a first commit"];

// TODO: let the user add new tasks
function render() {
  const list = document.getElementById("list");
  list.innerHTML = tasks.map((t) => "<li>" + t + "</li>").join("");
}

render();
`;

const STYLE_CSS = `body {
  font-family: system-ui, sans-serif;
  max-width: 480px;
  margin: 40px auto;
}
`;

const BASHRC = `# ~/.bashrc: executed by bash for non-login shells.
alias ll='ls -alF'
export EDITOR=nano
`;

const NOTES = `Meeting notes
- Deploy on Friday
- Ask about the API key
`;
/* i18n-ignore-end */

export function createInitialState(now: number): TermState {
  const root: DirNode = mkDir(now);
  const home = mkDir(now);
  const ban = mkDir(now);
  const project = mkDir(now);
  const src = mkDir(now);
  const usr = mkDir(now);
  const bin = mkDir(now);
  const etc = mkDir(now);

  src.children["app.js"] = mkFile(APP_JS, now);
  src.children["style.css"] = mkFile(STYLE_CSS, now);
  project.children["README.md"] = mkFile(README, now);
  project.children["index.html"] = mkFile(INDEX_HTML, now);
  project.children["src"] = src;
  project.children[".gitignore"] = mkFile("node_modules/\n*.log\n", now);
  ban.children["du-an"] = project;
  ban.children["notes.txt"] = mkFile(NOTES, now);
  ban.children[".bashrc"] = mkFile(BASHRC, now);
  home.children["ban"] = ban;
  for (const cmd of BIN_COMMANDS) bin.children[cmd] = mkFile("", now, 0o755);
  usr.children["bin"] = bin;
  etc.children["hostname"] = mkFile("may-hoc\n", now);
  root.children["home"] = home;
  root.children["usr"] = usr;
  root.children["etc"] = etc;
  root.children["tmp"] = mkDir(now, 0o777);

  return {
    version: 1,
    root,
    cwd: HOME,
    oldCwd: HOME,
    history: [],
    log: [],
    seq: 0,
    git: {},
    gitUser: { name: "ban", email: "ban@may-hoc.local" },
    docker: { images: [], containers: [], counter: 0 },
  };
}
