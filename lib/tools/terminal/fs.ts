/** Hệ thống tệp trong bộ nhớ: phân giải đường dẫn, đọc, ghi, liệt kê. */
import type { DirNode, FileNode, FsNode } from "./types";

export const HOME = "/home/ban";
export const USER = "ban";
export const HOST = "may-hoc";

export function mkDir(mtime: number, mode = 0o755): DirNode {
  return { type: "dir", children: {}, mode, mtime };
}

export function mkFile(content: string, mtime: number, mode = 0o644): FileNode {
  return { type: "file", content, mode, mtime };
}

/** Chuẩn hoá một đường dẫn (tương đối hoặc tuyệt đối, có ~) thành tuyệt đối. */
export function resolvePath(cwd: string, p: string): string {
  let path = p;
  if (path === "~" || path.startsWith("~/")) path = HOME + path.slice(1);
  const parts = (path.startsWith("/") ? path : `${cwd}/${path}`).split("/");
  const out: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return "/" + out.join("/");
}

export function splitPath(abs: string): string[] {
  return abs.split("/").filter(Boolean);
}

export function parentOf(abs: string): string {
  const parts = splitPath(abs);
  parts.pop();
  return "/" + parts.join("/");
}

export function baseName(abs: string): string {
  const parts = splitPath(abs);
  return parts[parts.length - 1] ?? "/";
}

export function getNode(root: DirNode, abs: string): FsNode | null {
  let node: FsNode = root;
  for (const part of splitPath(abs)) {
    if (node.type !== "dir") return null;
    const next: FsNode | undefined = node.children[part];
    if (!next) return null;
    node = next;
  }
  return node;
}

/** Lỗi khi đi qua một thành phần không phải thư mục, để phân biệt
 *  "No such file or directory" với "Not a directory". */
export function lookupError(root: DirNode, abs: string): "ENOENT" | "ENOTDIR" | null {
  let node: FsNode = root;
  for (const part of splitPath(abs)) {
    if (node.type !== "dir") return "ENOTDIR";
    const next: FsNode | undefined = node.children[part];
    if (!next) return "ENOENT";
    node = next;
  }
  return null;
}

export function getDir(root: DirNode, abs: string): DirNode | null {
  const n = getNode(root, abs);
  return n && n.type === "dir" ? n : null;
}

/** Ghi (tạo hoặc đè) một tệp. Trả false nếu thư mục cha không tồn tại. */
export function writeFile(root: DirNode, abs: string, content: string, mtime: number): boolean {
  const dir = getDir(root, parentOf(abs));
  if (!dir) return false;
  const name = baseName(abs);
  const existing = dir.children[name];
  if (existing && existing.type === "dir") return false;
  if (existing) {
    existing.content = content;
    existing.mtime = mtime;
  } else {
    dir.children[name] = mkFile(content, mtime);
  }
  dir.mtime = mtime;
  return true;
}

export function removeNode(root: DirNode, abs: string): void {
  const dir = getDir(root, parentOf(abs));
  if (dir) delete dir.children[baseName(abs)];
}

/** Mọi tệp dưới một thư mục, đường dẫn tương đối, sắp theo tên. */
export function walkFiles(dir: DirNode, prefix = "", skip?: (rel: string) => boolean): string[] {
  const out: string[] = [];
  for (const name of Object.keys(dir.children).sort()) {
    const rel = prefix ? `${prefix}/${name}` : name;
    if (skip && skip(rel)) continue;
    const child = dir.children[name];
    if (child.type === "dir") out.push(...walkFiles(child, rel, skip));
    else out.push(rel);
  }
  return out;
}

/** Sắp tên như `ls` của GNU: bỏ qua dấu chấm đầu, không phân biệt hoa thường. */
export function lsSort(a: string, b: string): number {
  const ka = a.replace(/^\.+/, "").toLowerCase();
  const kb = b.replace(/^\.+/, "").toLowerCase();
  return ka < kb ? -1 : ka > kb ? 1 : a < b ? -1 : a > b ? 1 : 0;
}

/** "~/du-an" cho dấu nhắc lệnh. */
export function displayPath(abs: string): string {
  if (abs === HOME) return "~";
  if (abs.startsWith(HOME + "/")) return "~" + abs.slice(HOME.length);
  return abs;
}

export function modeString(node: FsNode): string {
  const bits = ["r", "w", "x"];
  let s = node.type === "dir" ? "d" : "-";
  for (let i = 8; i >= 0; i--) s += node.mode & (1 << i) ? bits[(8 - i) % 3] : "-";
  return s;
}

export function isExecutable(node: FsNode): boolean {
  return node.type === "file" && (node.mode & 0o111) !== 0;
}

/** Biểu thức glob kiểu shell (`*`, `?`) → RegExp khớp cả chuỗi. */
export function globToRegExp(glob: string): RegExp {
  const esc = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${esc}$`);
}

/** `mkdir -p`: tạo mọi thư mục còn thiếu. Trả null nếu vướng một tệp. */
export function ensureDir(root: DirNode, abs: string, mtime: number): DirNode | null {
  let node: DirNode = root;
  for (const part of splitPath(abs)) {
    const next: FsNode | undefined = node.children[part];
    if (!next) {
      const created = mkDir(mtime);
      node.children[part] = created;
      node.mtime = mtime;
      node = created;
    } else if (next.type === "dir") {
      node = next;
    } else {
      return null;
    }
  }
  return node;
}

/** Đường dẫn tương đối từ thư mục `from` tới `to` (cả hai tuyệt đối). */
export function relativePath(from: string, to: string): string {
  const a = splitPath(from);
  const b = splitPath(to);
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const up = a.slice(i).map(() => "..");
  const rel = [...up, ...b.slice(i)].join("/");
  return rel || ".";
}
