/**
 * Tô màu cho khối mã trong bài học.
 *
 * HTML, CSS, JavaScript và JSON dùng lại bộ tô của trình soạn mã ở
 * /cong-cu/editor. Python, SQL và Bash chưa có ở đó nên viết ở đây, cùng một
 * điều kiện: ghép mọi `text` của token lại luôn ra đúng mã gốc, để lớp tô màu
 * nằm khít dưới <textarea> của bài tập.
 */
import { highlight as highlightEditor, type Token, type TokenKind } from "@/lib/tools/editor/highlight";
import type { CodeLanguage } from "@/lib/lesson-types";

export type { Token, TokenKind };

type Rule = [RegExp, TokenKind | ((m: string) => TokenKind)];

function scan(src: string, rules: Rule[]): Token[] {
  const out: Token[] = [];
  const push = (kind: TokenKind, text: string) => {
    const last = out[out.length - 1];
    if (last && last.kind === kind) last.text += text;
    else out.push({ kind, text });
  };
  let i = 0;
  outer: while (i < src.length) {
    for (const [re, kind] of rules) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (m && m.index === i && m[0].length > 0) {
        push(typeof kind === "function" ? kind(m[0]) : kind, m[0]);
        i += m[0].length;
        continue outer;
      }
    }
    push("plain", src[i]);
    i++;
  }
  return out;
}

const PY_KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue",
  "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in",
  "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

function highlightPython(src: string): Token[] {
  return scan(src, [
    [/#[^\n]*/y, "comment"],
    [/[rbfRBF]{0,2}("""[\s\S]*?("""|$)|'''[\s\S]*?('''|$))/y, "string"],
    [/[rbfRBF]{0,2}("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)/y, "string"],
    [/\b\d+(\.\d+)?\b/y, "number"],
    [/[A-Za-z_]\w*(?=\s*\()/y, (w) => (PY_KEYWORDS.has(w) ? "keyword" : "function")],
    [/[A-Za-z_]\w*/y, (w) => (PY_KEYWORDS.has(w) ? "keyword" : "plain")],
    [/[{}()[\],.:=<>+\-*/%!&|@]/y, "punct"],
  ]);
}

const SQL_KEYWORDS = new Set(
  (
    "select from where and or not in is null as join left right inner outer full on group by order having " +
    "limit offset insert into values update set delete create table drop alter index primary key foreign " +
    "references distinct count sum avg min max case when then else end like between union all asc desc with"
  ).split(" "),
);

function highlightSql(src: string): Token[] {
  return scan(src, [
    [/--[^\n]*/y, "comment"],
    [/'(?:''|[^'])*'?/y, "string"],
    [/\b\d+(\.\d+)?\b/y, "number"],
    [/[A-Za-z_]\w*/y, (w) => (SQL_KEYWORDS.has(w.toLowerCase()) ? "keyword" : "plain")],
    [/[(),;.=<>*+\-/]/y, "punct"],
  ]);
}

function highlightBash(src: string): Token[] {
  return scan(src, [
    [/#[^\n]*/y, "comment"],
    [/"(?:\\.|[^"\\])*"?|'[^']*'?/y, "string"],
    [/\$\{?[A-Za-z_]\w*\}?/y, "attr"],
    // Từ đầu tiên của mỗi dòng là tên lệnh.
    [/(?<=^|\n)[ \t]*[A-Za-z_][\w.-]*/y, "function"],
    [/\s--?[A-Za-z][\w-]*/y, "keyword"],
    [/[|&;<>()]/y, "punct"],
  ]);
}

export function highlightCode(src: string, language: CodeLanguage): Token[] {
  switch (language) {
    case "python":
      return highlightPython(src);
    case "sql":
      return highlightSql(src);
    case "bash":
      return highlightBash(src);
    case "html":
    case "css":
    case "javascript":
    case "json":
      return highlightEditor(src, language);
    default:
      return src ? [{ kind: "plain", text: src }] : [];
  }
}

/** Màu theo nền tối cố định: khối mã luôn tối ở cả hai chế độ sáng/tối, giống
 *  mọi tài liệu kỹ thuật người học sẽ gặp ngoài đời. */
export const SYNTAX_CLASS: Record<TokenKind, string> = {
  plain: "text-[#d4d4d4]",
  comment: "text-[#6a9955]",
  string: "text-[#ce9178]",
  keyword: "text-[#569cd6]",
  number: "text-[#b5cea8]",
  tag: "text-[#569cd6]",
  attr: "text-[#9cdcfe]",
  punct: "text-[#a0a0a0]",
  property: "text-[#9cdcfe]",
  selector: "text-[#d7ba7d]",
  function: "text-[#dcdcaa]",
  heading: "text-[#569cd6] font-bold",
};
