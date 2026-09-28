/**
 * Bộ kiểm tra "Problems" đơn giản: chỉ bắt những lỗi hiển nhiên mà người mới
 * hay gặp - thẻ HTML quên đóng, ngoặc CSS/JS lệch, tệp được tham chiếu nhưng
 * không tồn tại, và vài lỗi chính tả kinh điển (`consle`, `docment`).
 *
 * Trả về MÃ lỗi kèm tham số chứ không trả câu chữ: câu hiển thị nằm trong từ
 * điển, để tiếng Việt và tiếng Anh cùng dùng một bộ kiểm.
 */
import { languageOf, resolvePath, type EditorFile } from "./engine";

export type ProblemCode =
  | "unclosedTag"
  | "unexpectedClose"
  | "missingFile"
  | "unbalancedOpen"
  | "unbalancedClose"
  | "typo";

export interface Problem {
  path: string;
  line: number;
  severity: "error" | "warning";
  code: ProblemCode;
  params: Record<string, string>;
}

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
]);

/** Các tên hay gõ nhầm và tên đúng của chúng. */
const TYPOS: [RegExp, string, string][] = [
  [/\bconsle\b/, "consle", "console"],
  [/\bconosle\b/, "conosle", "console"],
  [/\bdocment\b/, "docment", "document"],
  [/\bdocumnet\b/, "documnet", "document"],
  [/\baddEventListner\b/, "addEventListner", "addEventListener"],
  [/\bquerySelecter\b/, "querySelecter", "querySelector"],
  [/\bgetElementByID\b/, "getElementByID", "getElementById"],
  [/\bfuntion\b/, "funtion", "function"],
];

function lineAt(text: string, index: number): number {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

/** Thay nội dung chú thích/chuỗi bằng khoảng trắng cùng độ dài, giữ nguyên
 *  xuống dòng, để các bước sau đếm ngoặc mà không bị đánh lừa. */
function blankOut(text: string, pattern: RegExp): string {
  return text.replace(pattern, (m) => m.replace(/[^\n]/g, " "));
}

function checkHtml(file: EditorFile, all: Set<string>): Problem[] {
  const out: Problem[] = [];
  let text = blankOut(file.content, /<!--[\s\S]*?(-->|$)/g);
  // Nội dung trong <script>/<style> không phải HTML.
  text = text.replace(/(<(script|style)\b[^>]*>)([\s\S]*?)(<\/\2\s*>)/gi, (_m, open, _t, body, close) =>
    open + body.replace(/[^\n]/g, " ") + close,
  );

  const stack: { name: string; line: number }[] = [];
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(text))) {
    const [, closing, rawName, attrs] = m;
    const name = rawName.toLowerCase();
    const line = lineAt(text, m.index);
    if (!closing) {
      for (const am of attrs.matchAll(/\b(href|src)\s*=\s*["']([^"']+)["']/gi)) {
        const target = resolvePath(file.path, am[2]);
        if (target && !all.has(target)) {
          out.push({ path: file.path, line, severity: "warning", code: "missingFile", params: { file: am[2] } });
        }
      }
      if (VOID_TAGS.has(name) || attrs.trim().endsWith("/")) continue;
      stack.push({ name, line });
    } else {
      const idx = stack.map((s) => s.name).lastIndexOf(name);
      if (idx === -1) {
        out.push({ path: file.path, line, severity: "error", code: "unexpectedClose", params: { tag: name } });
        continue;
      }
      for (const open of stack.splice(idx).slice(1)) {
        out.push({ path: file.path, line: open.line, severity: "error", code: "unclosedTag", params: { tag: open.name } });
      }
    }
  }
  for (const open of stack) {
    out.push({ path: file.path, line: open.line, severity: "error", code: "unclosedTag", params: { tag: open.name } });
  }
  return out;
}

const PAIRS: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
const CLOSERS: Record<string, string> = { ")": "(", "]": "[", "}": "{" };

function checkBrackets(file: EditorFile, text: string, chars: string): Problem[] {
  const out: Problem[] = [];
  const stack: { ch: string; line: number }[] = [];
  let line = 1;
  for (const ch of text) {
    if (ch === "\n") line++;
    else if (PAIRS[ch] && chars.includes(ch)) stack.push({ ch, line });
    else if (CLOSERS[ch] && chars.includes(ch)) {
      if (stack.length && stack[stack.length - 1].ch === CLOSERS[ch]) stack.pop();
      else out.push({ path: file.path, line, severity: "error", code: "unbalancedClose", params: { char: ch } });
    }
  }
  for (const s of stack) {
    out.push({ path: file.path, line: s.line, severity: "error", code: "unbalancedOpen", params: { char: s.ch } });
  }
  return out;
}

function checkCss(file: EditorFile): Problem[] {
  const text = blankOut(file.content, /\/\*[\s\S]*?(\*\/|$)|"[^"\n]*"|'[^'\n]*'/g);
  return checkBrackets(file, text, "{}");
}

function checkJs(file: EditorFile): Problem[] {
  const text = blankOut(
    file.content,
    /\/\*[\s\S]*?(\*\/|$)|\/\/[^\n]*|`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g,
  );
  const out = checkBrackets(file, text, "()[]{}");
  text.split("\n").forEach((l, i) => {
    for (const [re, wrong, right] of TYPOS) {
      if (re.test(l)) out.push({ path: file.path, line: i + 1, severity: "warning", code: "typo", params: { wrong, right } });
    }
  });
  return out;
}

export function validateFile(file: EditorFile, allPaths: Set<string>): Problem[] {
  switch (languageOf(file.path)) {
    case "html":
      return checkHtml(file, allPaths);
    case "css":
      return checkCss(file);
    case "javascript":
      return checkJs(file);
    default:
      return [];
  }
}

export function validateProject(files: EditorFile[]): Problem[] {
  const all = new Set(files.map((f) => f.path));
  return files.flatMap((f) => validateFile(f, all)).sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line);
}
