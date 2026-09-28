/** Kiểu dữ liệu của bộ máy mô phỏng Terminal (/cong-cu/terminal).
 *
 *  Toàn bộ trạng thái là object thuần - không Map, không class - để lưu thẳng
 *  vào localStorage và clone bằng structuredClone. */

export interface FileNode {
  type: "file";
  content: string;
  mode: number;
  mtime: number;
}

export interface DirNode {
  type: "dir";
  children: Record<string, FsNode>;
  mode: number;
  mtime: number;
}

export type FsNode = FileNode | DirNode;

/** Ảnh chụp các tệp được theo dõi: đường dẫn tương đối gốc repo → nội dung. */
export type Tree = Record<string, string>;

export interface Commit {
  id: string;
  message: string;
  parents: string[];
  tree: Tree;
  time: number;
  author: string;
  email: string;
}

export interface GitRepo {
  root: string;
  head: string;
  /** Tên nhánh → id commit. `null` là nhánh chưa có commit nào (unborn). */
  branches: Record<string, string | null>;
  commits: Record<string, Commit>;
  index: Tree;
}

export interface DockerImage {
  repo: string;
  tag: string;
  id: string;
  size: string;
  created: string;
}

export interface PortMap {
  host: number;
  container: number;
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  command: string;
  status: "running" | "exited";
  exitCode: number;
  ports: PortMap[];
  created: number;
  createdSeq: number;
  logs: string[];
}

export interface DockerState {
  images: DockerImage[];
  containers: DockerContainer[];
  counter: number;
}

/** Một dòng trong nhật ký lệnh đã chạy - nhiệm vụ đọc nhật ký này. */
export interface LogEntry {
  seq: number;
  cmd: string;
  cwd: string;
  code: number;
  redirect?: boolean;
}

export interface TermState {
  version: 1;
  root: DirNode;
  cwd: string;
  oldCwd: string;
  history: string[];
  log: LogEntry[];
  seq: number;
  git: Record<string, GitRepo>;
  gitUser: { name: string; email: string };
  docker: DockerState;
}

/** Một đoạn chữ có màu, dùng khi kết quả hiện thẳng ra màn hình. */
export type SpanColor = "dir" | "exec" | "green" | "red" | "yellow" | "match" | "bold" | "muted" | "link";
export interface Span {
  t: string;
  c?: SpanColor;
}

/** Thông báo hướng dẫn cho người học - bộ máy chỉ trả id, lời lấy từ từ điển. */
export type NoticeId = "help" | "noEditor" | "mergeConflict" | "foreground";

export interface OutputLine {
  spans: Span[];
  err?: boolean;
}

export interface RunResult {
  lines: OutputLine[];
  clear?: boolean;
  notices: NoticeId[];
  code: number;
}

/** Kết quả một lệnh đơn trong pipeline. */
export interface CmdResult {
  out: string[];
  err: string[];
  code: number;
  /** Bản có màu của `out`, chỉ dùng khi lệnh đứng cuối và không chuyển hướng. */
  rich?: Span[][];
  clear?: boolean;
  notices?: NoticeId[];
}

/** Ngữ cảnh chạy một lệnh: trạng thái (đã clone, được phép sửa) và giờ hiện tại. */
export interface Ctx {
  state: TermState;
  now: number;
}
