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

/** Kho từ xa mô phỏng: `branches` là thứ có thật trên máy chủ, `tracking` là
 *  ảnh chụp cục bộ (origin/main) - chỉ `git fetch` / `git pull` mới làm hai bên khớp. */
export interface GitRemote {
  url: string;
  branches: Record<string, string>;
  tracking: Record<string, string>;
}

/** Gộp nhánh đang dở vì xung đột: chờ người học sửa tay, `git add`, rồi commit. */
export interface MergeState {
  target: string;
  ours: string;
  theirs: string;
  /** Các tệp còn xung đột (chưa `git add`). */
  conflicts: string[];
  message: string;
}

export interface GitRepo {
  root: string;
  head: string;
  /** Tên nhánh → id commit. `null` là nhánh chưa có commit nào (unborn). */
  branches: Record<string, string | null>;
  commits: Record<string, Commit>;
  index: Tree;
  /** Thẻ phiên bản: tên → id commit. */
  tags?: Record<string, string>;
  /** Nhánh → "origin/main" mà nó theo dõi. */
  upstreams?: Record<string, string>;
  remotes?: Record<string, GitRemote>;
  merging?: MergeState;
  /** Kho mẫu dựng sẵn cho nhiệm vụ - không tính vào nhiệm vụ "tự tạo kho". */
  lab?: boolean;
}

export interface DockerImage {
  repo: string;
  tag: string;
  id: string;
  size: string;
  created: string;
  /** Có khi image do `docker build` tạo ra trên máy này. */
  built?: {
    context: string;
    /** Băm nội dung Dockerfile lúc build. */
    dockerfileKey: string;
    expose: number[];
    cmd: string;
  };
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
  env?: Record<string, string>;
  /** Volume có tên hoặc thư mục máy chủ gắn vào container (`-v nguồn:đích`). */
  mounts?: { source: string; target: string; named: boolean }[];
}

export interface DockerVolume {
  name: string;
  /** Số container từng gắn volume này - dữ liệu sống sót khi container bị xoá. */
  attachments: number;
  /** Volume đã chứa một cơ sở dữ liệu khởi tạo xong. */
  initialized: boolean;
}

export interface DockerState {
  images: DockerImage[];
  containers: DockerContainer[];
  counter: number;
  volumes?: DockerVolume[];
  /** Khoá các lớp build đã có - lần build sau gặp lại thì in CACHED. */
  buildCache?: string[];
}

/** Một tiến trình trong bảng `ps` của máy mô phỏng. */
export interface Proc {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  command: string;
  /** Tiến trình treo, lờ SIGTERM - chỉ `kill -9` mới dừng được. */
  ignoresTerm?: boolean;
}

/** Một dòng trong nhật ký lệnh đã chạy - nhiệm vụ đọc nhật ký này. */
export interface LogEntry {
  seq: number;
  cmd: string;
  cwd: string;
  code: number;
  redirect?: boolean;
  /** Đối số của lệnh (không gồm tên lệnh) - để nhiệm vụ phân biệt `ls` với `ls -l`. */
  args?: string[];
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
  /** Biến môi trường đã `export` - chương trình con nhìn thấy. */
  env?: Record<string, string>;
  /** Biến của riêng shell hiện tại (gán `A=1` không export). */
  vars?: Record<string, string>;
  procs?: Proc[];
  /** Phiên bản bộ dữ liệu mẫu đã dựng (thư mục lab, nhật ký, tiến trình). */
  seedVersion?: number;
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
