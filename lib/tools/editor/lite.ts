/**
 * Bộ đọc HTML và CSS "vừa đủ" cho việc chấm nhiệm vụ.
 *
 * Không phải trình phân tích đầy đủ: chỉ dựng cây thẻ (kể cả thẻ bị bỏ quên
 * đóng), đọc thuộc tính, và tách quy tắc CSS kèm @media. Đủ để hỏi "có thẻ
 * <main> chứa <h1> không", "quy tắc nào đặt display: grid", "phần tử khớp bộ
 * chọn này có bao nhiêu con" - những câu mà nhiệm vụ cần, mà không phải kéo cả
 * một trình duyệt vào bộ kiểm.
 */

export interface HNode {
  tag: string;
  attrs: Record<string, string>;
  children: HNode[];
  /** Chữ nằm trực tiếp trong thẻ này (không tính thẻ con). */
  text: string;
  parent: HNode | null;
}

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style"]);

function newNode(tag: string, parent: HNode | null): HNode {
  return { tag, attrs: {}, children: [], text: "", parent };
}

function parseAttrs(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of src.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'<>=`]+))?/g)) {
    const raw = m[2];
    out[m[1].toLowerCase()] = raw === undefined ? "" : raw.replace(/^["']|["']$/g, "");
  }
  return out;
}

/** Dựng cây từ một chuỗi HTML. Gốc có tag "#root". Nội dung <script>/<style>
 *  nằm trong `text` của chính thẻ đó. */
export function parseHtml(source: string | undefined | null): HNode {
  const root = newNode("#root", null);
  if (!source) return root;
  const src = source.replace(/<!--[\s\S]*?(-->|$)/g, "").replace(/<!doctype[^>]*>/gi, "");
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+|<)/g;
  let cur = root;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[4] !== undefined) {
      cur.text += m[4];
      continue;
    }
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    if (closing) {
      let n: HNode | null = cur;
      while (n && n.tag !== tag) n = n.parent;
      if (n && n.parent) cur = n.parent;
      continue;
    }
    // <li> mở khi <li> trước chưa đóng thì đóng cái trước, như trình duyệt.
    if (tag === "li" && cur.tag === "li" && cur.parent) cur = cur.parent;
    const node = newNode(tag, cur);
    node.attrs = parseAttrs(m[3].replace(/\/\s*$/, ""));
    cur.children.push(node);
    if (VOID.has(tag) || /\/\s*$/.test(m[3])) continue;
    if (RAW.has(tag)) {
      const end = new RegExp(`</${tag}\\s*>`, "i");
      const rest = src.slice(re.lastIndex);
      const close = end.exec(rest);
      node.text = close ? rest.slice(0, close.index) : rest;
      re.lastIndex += close ? close.index + close[0].length : rest.length;
      continue;
    }
    cur = node;
  }
  return root;
}

export function walk(node: HNode, fn: (n: HNode) => void): void {
  for (const c of node.children) {
    fn(c);
    walk(c, fn);
  }
}

export function findAll(root: HNode, pred: (n: HNode) => boolean): HNode[] {
  const out: HNode[] = [];
  walk(root, (n) => {
    if (pred(n)) out.push(n);
  });
  return out;
}

export function byTag(root: HNode, ...tags: string[]): HNode[] {
  return findAll(root, (n) => tags.includes(n.tag));
}

export function textOf(node: HNode): string {
  const own = RAW.has(node.tag) ? "" : node.text;
  return (own + node.children.map(textOf).join(" ")).replace(/\s+/g, " ").trim();
}

export function hasAncestor(node: HNode, tag: string): boolean {
  for (let p = node.parent; p; p = p.parent) if (p.tag === tag) return true;
  return false;
}

/** Số thẻ con trực tiếp, không tính script/style/link/meta. */
export function elementChildren(node: HNode): HNode[] {
  return node.children.filter((c) => !["script", "style", "link", "meta", "title"].includes(c.tag));
}

export function classesOf(node: HNode): string[] {
  return (node.attrs.class ?? "").split(/\s+/).filter(Boolean);
}

function matchesCompound(node: HNode, compound: string): boolean {
  const c = compound.replace(/::?[\w-]+(\([^)]*\))?/g, "").trim();
  if (!c) return false;
  if (c === "*") return true;
  const tag = /^[a-zA-Z][\w-]*/.exec(c)?.[0];
  if (tag && node.tag !== tag.toLowerCase()) return false;
  for (const m of c.matchAll(/#([\w-]+)/g)) if (node.attrs.id !== m[1]) return false;
  for (const m of c.matchAll(/\.([\w-]+)/g)) if (!classesOf(node).includes(m[1])) return false;
  return !!tag || /[#.]/.test(c);
}

/** Phần tử khớp bộ chọn - chỉ xét khối cuối của mỗi bộ chọn trong danh sách
 *  (".a .b" được hiểu là ".b"). Đủ cho việc hỏi "quy tắc này có áp vào phần
 *  tử nào của trang không". */
export function selectNodes(root: HNode, selector: string): HNode[] {
  const last = selector
    .split(",")
    .map((s) => s.trim().split(/\s*[>+~]\s*|\s+/).filter(Boolean).pop() ?? "")
    .filter(Boolean);
  return findAll(root, (n) => last.some((c) => matchesCompound(n, c)));
}

// --------------------------------------------------------------------------
// CSS

export interface CssRule {
  selector: string;
  /** Điều kiện @media bao quanh ("(max-width: 600px)"), hoặc null. */
  media: string | null;
  decls: Record<string, string>;
}

function parseDecls(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of body.split(";")) {
    const i = part.indexOf(":");
    if (i === -1) continue;
    const name = part.slice(0, i).trim().toLowerCase();
    const value = part.slice(i + 1).replace(/!important/gi, "").trim();
    if (name && value) out[name] = value;
  }
  return out;
}

function collect(css: string, media: string | null, out: CssRule[]): void {
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    const head = css.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") depth--;
      j++;
    }
    const body = css.slice(open + 1, depth === 0 ? j - 1 : j);
    if (head.startsWith("@")) {
      if (/^@media/i.test(head)) collect(body, head.replace(/^@media/i, "").trim(), out);
    } else if (head) {
      out.push({ selector: head, media, decls: parseDecls(body) });
    }
    i = j;
  }
}

export function parseCss(css: string | undefined | null): CssRule[] {
  if (!css) return [];
  const out: CssRule[] = [];
  collect(css.replace(/\/\*[\s\S]*?(\*\/|$)/g, ""), null, out);
  return out;
}

/** Ghép chữ nhìn thấy được từ một chuỗi HTML đã dựng (bỏ script/style). */
export function visibleText(html: string | undefined | null): string {
  return textOf(parseHtml(html));
}
