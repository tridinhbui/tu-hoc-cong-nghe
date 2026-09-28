/**
 * Tô màu cú pháp tối giản cho HTML, CSS, JavaScript và Markdown.
 *
 * Không phải parser: chỉ đủ để trang trông giống một trình soạn mã thật và để
 * người mới nhìn ra đâu là thẻ, đâu là chuỗi, đâu là chú thích. Ghép tất cả
 * `text` của các token lại luôn ra đúng nội dung gốc - đó là điều kiện để lớp
 * tô màu nằm khít dưới <textarea>.
 */
import type { Language } from "./engine";

export type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "tag"
  | "attr"
  | "punct"
  | "property"
  | "selector"
  | "function"
  | "heading";

export interface Token {
  kind: TokenKind;
  text: string;
}

const JS_KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while", "do",
  "break", "continue", "new", "class", "extends", "import", "export", "from", "default", "async",
  "await", "try", "catch", "finally", "throw", "typeof", "instanceof", "in", "of", "this",
  "null", "undefined", "true", "false", "switch", "case",
]);

function push(out: Token[], kind: TokenKind, text: string) {
  if (!text) return;
  const last = out[out.length - 1];
  if (last && last.kind === kind) last.text += text;
  else out.push({ kind, text });
}

function scan(src: string, rules: [RegExp, TokenKind | ((m: string) => TokenKind)][]): Token[] {
  const out: Token[] = [];
  let i = 0;
  outer: while (i < src.length) {
    for (const [re, kind] of rules) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (m && m.index === i && m[0].length > 0) {
        push(out, typeof kind === "function" ? kind(m[0]) : kind, m[0]);
        i += m[0].length;
        continue outer;
      }
    }
    push(out, "plain", src[i]);
    i++;
  }
  return out;
}

function highlightJs(src: string): Token[] {
  return scan(src, [
    [/\/\/[^\n]*/y, "comment"],
    [/\/\*[\s\S]*?(\*\/|$)/y, "comment"],
    [/`(?:\\[\s\S]|[^`\\])*`?/y, "string"],
    [/"(?:\\.|[^"\\\n])*"?/y, "string"],
    [/'(?:\\.|[^'\\\n])*'?/y, "string"],
    [/\b\d+(\.\d+)?\b/y, "number"],
    [/[A-Za-z_$][\w$]*(?=\s*\()/y, (w) => (JS_KEYWORDS.has(w) ? "keyword" : "function")],
    [/[A-Za-z_$][\w$]*/y, (w) => (JS_KEYWORDS.has(w) ? "keyword" : "plain")],
    [/[{}()[\];,.=<>+\-*/!&|?:]/y, "punct"],
  ]);
}

function highlightCss(src: string): Token[] {
  const out: Token[] = [];
  let depth = 0;
  let inValue = false;
  const tokens = scan(src, [
    [/\/\*[\s\S]*?(\*\/|$)/y, "comment"],
    [/"[^"\n]*"?|'[^'\n]*'?/y, "string"],
    [/[{}:;]/y, "punct"],
    [/#[0-9a-fA-F]{3,8}\b/y, "number"],
    [/-?\d+(\.\d+)?(px|em|rem|%|vh|vw|s|ms|deg)?/y, "number"],
    [/[^\s{}:;"'/]+/y, "plain"],
  ]);
  for (const t of tokens) {
    if (t.kind === "punct") {
      if (t.text === "{") depth++;
      if (t.text === "}") depth = Math.max(0, depth - 1);
      inValue = t.text === ":" && depth > 0 ? true : t.text === ";" || t.text === "{" || t.text === "}" ? false : inValue;
      push(out, "punct", t.text);
    } else if (t.kind === "plain" && t.text.trim()) {
      push(out, depth === 0 ? "selector" : inValue ? "string" : "property", t.text);
    } else {
      push(out, t.kind, t.text);
    }
  }
  return out;
}

function highlightHtml(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    if (src.startsWith("<!--", i)) {
      const end = src.indexOf("-->", i + 4);
      const stop = end === -1 ? src.length : end + 3;
      push(out, "comment", src.slice(i, stop));
      i = stop;
      continue;
    }
    const tag = /^<\/?[A-Za-z!][\w-]*/.exec(src.slice(i, i + 64));
    if (tag) {
      push(out, "punct", tag[0].startsWith("</") ? "</" : "<");
      push(out, "tag", tag[0].replace(/^<\/?/, ""));
      i += tag[0].length;
      const tagName = tag[0].replace(/^<\/?/, "").toLowerCase();
      // Thuộc tính cho tới ">".
      while (i < src.length && src[i] !== ">") {
        const rest = src.slice(i);
        const str = /^("[^"]*"?|'[^']*'?)/.exec(rest);
        const attr = /^[A-Za-z_:][\w:.-]*/.exec(rest);
        if (str) {
          push(out, "string", str[0]);
          i += str[0].length;
        } else if (attr) {
          push(out, "attr", attr[0]);
          i += attr[0].length;
        } else if (rest[0] === "<") {
          break;
        } else {
          push(out, rest[0] === "=" || rest[0] === "/" ? "punct" : "plain", rest[0]);
          i++;
        }
      }
      if (src[i] === ">") {
        push(out, "punct", ">");
        i++;
        const closing = tag[0].startsWith("</");
        if (!closing && (tagName === "script" || tagName === "style")) {
          const end = src.toLowerCase().indexOf(`</${tagName}`, i);
          const stop = end === -1 ? src.length : end;
          const inner = src.slice(i, stop);
          for (const t of tagName === "script" ? highlightJs(inner) : highlightCss(inner)) push(out, t.kind, t.text);
          i = stop;
        }
      }
      continue;
    }
    const next = src.indexOf("<", i + 1);
    const stop = next === -1 ? src.length : next;
    push(out, "plain", src.slice(i, stop));
    i = stop;
  }
  return out;
}

function highlightMarkdown(src: string): Token[] {
  const out: Token[] = [];
  src.split(/(\n)/).forEach((line) => {
    if (/^#{1,6}\s/.test(line)) push(out, "heading", line);
    else if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      const m = /^(\s*(?:[-*]|\d+\.)\s)/.exec(line)!;
      push(out, "keyword", m[1]);
      for (const t of inlineMd(line.slice(m[1].length))) push(out, t.kind, t.text);
    } else for (const t of inlineMd(line)) push(out, t.kind, t.text);
  });
  return out;
}

function inlineMd(line: string): Token[] {
  return scan(line, [
    [/`[^`]*`?/y, "string"],
    [/\*\*[^*]+\*\*/y, "attr"],
    [/[^`*]+/y, "plain"],
  ]);
}

export function highlight(src: string, lang: Language): Token[] {
  switch (lang) {
    case "html":
      return highlightHtml(src);
    case "css":
      return highlightCss(src);
    case "javascript":
    case "json":
      return highlightJs(src);
    case "markdown":
      return highlightMarkdown(src);
    default:
      return src ? [{ kind: "plain", text: src }] : [];
  }
}
