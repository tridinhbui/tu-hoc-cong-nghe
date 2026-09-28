/** Danh sách lệnh cho `help` và bảng tra nhanh. Chỉ giữ phần là MÃ (lệnh gõ
 *  y hệt ở mọi ngôn ngữ); lời giải thích nằm trong từ điển, khoá theo `id`. */

export interface CommandRef {
  id: string;
  /** Lệnh đúng như gõ - là mã, không dịch. */
  code: string;
}

export interface CommandGroup {
  id: "files" | "text" | "git" | "docker";
  items: CommandRef[];
}

/* i18n-ignore-start: cú pháp lệnh shell là mã (chỗ trống theo quy ước man page:
   <file>, <dir>), gõ giống hệt nhau ở mọi ngôn ngữ; phần giải thích của từng lệnh lấy từ từ điển theo id */
export const HELP_GROUPS: CommandGroup[] = [
  {
    id: "files",
    items: [
      { id: "pwd", code: "pwd" },
      { id: "ls", code: "ls [-l] [-a] [dir]" },
      { id: "cd", code: "cd <dir> | cd .. | cd ~" },
      { id: "mkdir", code: "mkdir [-p] <name>" },
      { id: "touch", code: "touch <file>" },
      { id: "cp", code: "cp [-r] <src> <dest>" },
      { id: "mv", code: "mv <src> <dest>" },
      { id: "rm", code: "rm [-r] <file>" },
      { id: "tree", code: "tree" },
      { id: "find", code: "find . -name '*.js'" },
      { id: "chmod", code: "chmod +x <file> | chmod 644 <file>" },
    ],
  },
  {
    id: "text",
    items: [
      { id: "cat", code: "cat <file>" },
      { id: "echo", code: "echo \"text\" > file | >> file" },
      { id: "head", code: "head -n 5 <file>" },
      { id: "tail", code: "tail -n 5 <file>" },
      { id: "wc", code: "wc -l <file>" },
      { id: "grep", code: "grep [-i] [-n] [-r] <word> <file>" },
      { id: "pipe", code: "cat file | grep word" },
      { id: "history", code: "history" },
      { id: "which", code: "which <command>" },
      { id: "whoami", code: "whoami | date | clear" },
    ],
  },
  {
    id: "git",
    items: [
      { id: "gitInit", code: "git init" },
      { id: "gitStatus", code: "git status" },
      { id: "gitAdd", code: "git add <file> | git add ." },
      { id: "gitCommit", code: "git commit -m \"message\"" },
      { id: "gitLog", code: "git log [--oneline]" },
      { id: "gitDiff", code: "git diff [--staged]" },
      { id: "gitBranch", code: "git branch [name]" },
      { id: "gitSwitch", code: "git switch -c <name> | git checkout <name>" },
      { id: "gitMerge", code: "git merge <branch>" },
    ],
  },
  {
    id: "docker",
    items: [
      { id: "dockerPull", code: "docker pull nginx" },
      { id: "dockerImages", code: "docker images" },
      { id: "dockerRun", code: "docker run -d -p 8080:80 --name web nginx" },
      { id: "dockerPs", code: "docker ps [-a]" },
      { id: "dockerLogs", code: "docker logs <name>" },
      { id: "dockerStop", code: "docker stop <name>" },
      { id: "dockerRm", code: "docker rm <name>" },
      { id: "curl", code: "curl localhost:8080" },
    ],
  },
];
/* i18n-ignore-end */
