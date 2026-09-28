/**
 * Ghép các tệp của dự án thành một tài liệu HTML duy nhất cho <iframe srcDoc>.
 *
 * Khung xem trước chạy với sandbox="allow-scripts" và KHÔNG có
 * allow-same-origin, nên nó không đọc được tệp nào bên ngoài. Vì vậy mọi
 * <link rel="stylesheet" href="..."> và <script src="..."> trỏ tới tệp trong dự
 * án được thay bằng nội dung tệp đó, viết thẳng vào trang.
 *
 * Console của trang được chuyển ra ngoài bằng một đoạn "shim" chèn vào đầu
 * <head>: nó bọc console.log/info/warn/error, bắt lỗi runtime, và gửi mọi thứ về
 * trang cha bằng postMessage kèm một token của lần chạy - tin nhắn của lần chạy
 * cũ (hoặc của bất kỳ ai khác) bị bỏ qua.
 */
import { resolvePath, type EditorFile } from "./engine";

export interface ScriptRange {
  file: string;
  /** Dòng (tính từ 1) trong tài liệu ghép nơi nội dung tệp bắt đầu. */
  start: number;
  lines: number;
}

export interface SrcDocResult {
  html: string;
  /** Tệp được tham chiếu nhưng không có trong dự án - trình duyệt thật sẽ báo 404. */
  missing: string[];
  scripts: ScriptRange[];
}

export interface ShimMessage {
  __editorSim: string;
  type: "console" | "click" | "navigate";
  level?: "log" | "info" | "warn" | "error";
  source?: "console" | "runtime";
  text?: string;
  file?: string;
  line?: number;
  href?: string;
}

function escapeClosing(content: string, tag: "script" | "style"): string {
  // `</script>` bên trong nội dung sẽ đóng thẻ sớm; chèn "\" như các bundler làm.
  return content.replace(new RegExp(`</${tag}`, "gi"), `<\\/${tag}`);
}

function lineOf(text: string, index: number): number {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

/** Đoạn shim - PHẢI nằm trên một dòng: nó được chèn sau khi đã tính số dòng
 *  của từng script, nên không được làm lệch số dòng. */
export function buildShim(token: string, scripts: ScriptRange[]): string {
  const code = `(function(){
var T=${JSON.stringify(token)},M=${JSON.stringify(scripts)};
function post(m){m.__editorSim=T;try{parent.postMessage(m,"*")}catch(e){}}
function fmt(v){if(typeof v==="string")return v;if(v instanceof Error)return v.name+": "+v.message;if(typeof v==="function")return String(v);if(v===undefined)return "undefined";try{var s=JSON.stringify(v);return s===undefined?String(v):s}catch(e){return String(v)}}
function where(line){for(var i=0;i<M.length;i++){var r=M[i];if(line>=r.start&&line<r.start+r.lines)return{file:r.file,line:line-r.start+1}}return null}
["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){var a=[].slice.call(arguments);post({type:"console",level:k,source:"console",text:a.map(fmt).join(" ")});try{o.apply(console,a)}catch(e){}}});
window.addEventListener("error",function(e){var w=where(e.lineno||0);var n=e.error&&e.error.name?e.error.name+": ":"";var msg=String(e.message||"").replace(/^Uncaught /,"");if(n&&msg.indexOf(n)===0)n="";post({type:"console",level:"error",source:"runtime",text:"Uncaught "+n+msg,file:w?w.file:undefined,line:w?w.line:undefined})});
window.addEventListener("unhandledrejection",function(e){post({type:"console",level:"error",source:"runtime",text:"Uncaught (in promise) "+fmt(e.reason)})});
document.addEventListener("click",function(e){post({type:"click"});var t=e.target,a=t&&t.closest?t.closest("a[href]"):null;if(!a)return;var h=a.getAttribute("href")||"";if(/^(#|javascript:)/i.test(h))return;e.preventDefault();post({type:"navigate",href:h})},true);
})();`;
  const tag = `<script>${code.replace(/\n/g, "")}</script>`;
  return tag;
}

export function buildSrcDoc(files: EditorFile[], entry: string, token: string): SrcDocResult {
  const byPath = new Map(files.map((f) => [f.path, f.content]));
  const source = byPath.get(entry) ?? "";
  const missing: string[] = [];

  // 1. CSS: <link rel="stylesheet" href="x.css"> -> <style>...</style>
  let html = source.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/\brel\s*=\s*["']?stylesheet/i.test(tag)) return tag;
    const href = /\bhref\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (!href) return tag;
    const path = resolvePath(entry, href);
    if (path === null) return tag;
    const css = byPath.get(path);
    if (css === undefined) {
      missing.push(path);
      return "";
    }
    const inline = `<style data-file="${path}">\n${escapeClosing(css, "style")}\n</style>`;
    return inline;
  });

  // 2. JS: <script src="x.js"></script> -> <script>...</script>
  const inlined: { path: string; marker: string; lines: number }[] = [];
  html = html.replace(/<script\b([^>]*)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>\s*<\/script>/gi, (tag, pre, src, post) => {
    const path = resolvePath(entry, src);
    if (path === null) return tag;
    const js = byPath.get(path);
    if (js === undefined) {
      missing.push(path);
      return "";
    }
    const marker = `data-file="${path}#${inlined.length}"`;
    inlined.push({ path, marker, lines: js.split("\n").length });
    const attrs = `${pre}${post}`.replace(/\s+/g, " ").trim();
    const inline = `<script ${marker}${attrs ? ` ${attrs}` : ""}>\n${escapeClosing(js, "script")}\n</script>`;
    return inline;
  });

  // 3. Số dòng của từng script trong tài liệu ghép, trước khi chèn shim (shim
  //    nằm trên đúng một dòng có sẵn nên không làm lệch).
  const scripts: ScriptRange[] = inlined.map(({ path, marker, lines }) => {
    const at = html.indexOf(marker);
    return { file: path, start: lineOf(html, at) + 1, lines };
  });

  // 4. Chèn shim ngay sau <head>, hoặc sau <html>, hoặc ở đầu tài liệu.
  const shim = buildShim(token, scripts);
  const headMatch = /<head\b[^>]*>/i.exec(html) ?? /<html\b[^>]*>/i.exec(html);
  if (headMatch) {
    const at = headMatch.index + headMatch[0].length;
    html = html.slice(0, at) + shim + html.slice(at);
  } else {
    // Không có <head>: chèn vào đầu dòng đầu tiên, vẫn không thêm dòng mới.
    html = shim + html;
  }

  return { html, missing, scripts };
}

export function isShimMessage(data: unknown, token: string): data is ShimMessage {
  return !!data && typeof data === "object" && (data as ShimMessage).__editorSim === token;
}

/* i18n-ignore-start: simulated browser network errors, worded exactly as the real DevTools console prints them */
/** Dòng lỗi mà DevTools thật in ra khi <link>/<script> trỏ tới tệp không có. */
export function missingFileMessage(path: string): string {
  return `GET ${path} net::ERR_FILE_NOT_FOUND`;
}

/** Dòng lỗi khi bấm liên kết tới một trang không tồn tại. */
export function notFoundMessage(path: string): string {
  return `GET ${path} 404 (Not Found)`;
}
/* i18n-ignore-end */
