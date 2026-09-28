/**
 * Nhiệm vụ của trình soạn mã mô phỏng - đúng chuỗi việc tuần đầu của một
 * người mới làm web: mở tệp, sửa, chạy xem, tìm, sửa lỗi theo console, thêm
 * trang, và lưu.
 *
 * Mỗi kiểm tra đọc trạng thái của bộ máy. Những nhiệm vụ về "kết quả chạy" đọc
 * `lastRun.snapshot` - bản chụp lúc bấm Chạy - chứ không đọc tệp đang gõ dở:
 * sửa mà chưa chạy thì chưa thấy trang đổi, và nhiệm vụ cũng không nên tính.
 * Tên và gợi ý nằm trong từ điển (toolEditor.missions.<id>).
 */
import { dirtyFiles, getFile, type EditorState } from "./engine";

export interface EditorMission {
  id: string;
  check: (state: EditorState) => boolean;
}

export function headingOf(html: string | undefined): string | null {
  if (!html) return null;
  const m = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  return m ? m[1].replace(/<[^>]*>/g, "").trim() : null;
}

/** Có quy tắc CSS nào cho body/html đặt màu nền không. */
export function hasBodyBackground(css: string | undefined): boolean {
  if (!css) return false;
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of clean.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const selector = m[1].trim().toLowerCase();
    if (!selector.split(",").some((s) => /^(body|html|:root)$/.test(s.trim()))) continue;
    if (/(^|[;\s])background(-color)?\s*:\s*[^;\s][^;]*/i.test(m[2])) return true;
  }
  return false;
}

export function linksTo(html: string | undefined, target: string): boolean {
  if (!html) return false;
  const esc = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<a\\b[^>]*\\bhref\\s*=\\s*["'](\\./)?${esc}["']`, "i").test(html);
}

export const EDITOR_MISSIONS: EditorMission[] = [
  {
    id: "open-index",
    check: (s) => s.everOpened.includes("index.html"),
  },
  {
    id: "change-heading",
    check: (s) => {
      const h = headingOf(s.lastRun?.snapshot["index.html"]);
      return !!h && h !== s.starterHeading.trim();
    },
  },
  {
    id: "css-background",
    check: (s) => hasBodyBackground(s.lastRun?.snapshot["style.css"]),
  },
  {
    id: "search-todo",
    check: (s) => !!s.lastSearch && s.lastSearch.matches > 0 && s.lastSearch.query.trim().toLowerCase() === "todo",
  },
  {
    id: "fix-bug",
    check: (s) => {
      const run = s.lastRun;
      if (!run || run.entry !== "index.html") return false;
      const script = run.snapshot["script.js"];
      if (script === undefined || /\bconsle\b/.test(script)) return false;
      return !run.console.some((e) => e.level === "error") && run.console.some((e) => e.level === "log");
    },
  },
  {
    id: "button-log",
    check: (s) => {
      const run = s.lastRun;
      if (!run) return false;
      const html = run.snapshot[run.entry];
      return !!html && /<button\b/i.test(html) && run.console.some((e) => e.level === "log" && e.source === "console" && e.afterClick);
    },
  },
  {
    id: "about-page",
    check: (s) => {
      const about = getFile(s, "about.html");
      return !!about && about.content.trim().length > 0 && linksTo(getFile(s, "index.html")?.content, "about.html");
    },
  },
  {
    id: "save-all",
    check: (s) => !!getFile(s, "about.html") && s.saveCount > 0 && dirtyFiles(s).length === 0,
  },
];

export const EDITOR_MISSION_IDS = EDITOR_MISSIONS.map((m) => m.id);
