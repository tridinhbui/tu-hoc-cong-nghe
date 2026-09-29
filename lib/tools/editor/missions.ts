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
  /** Tiêu chí đạt, từ yếu tới mạnh; tiêu chí cuối chính là `check`. Tiêu chí
   *  đầu thường đọc TỆP ĐANG SỬA, tiêu chí cuối đọc bản chụp lúc bấm Chạy -
   *  nên người học thấy "đã sửa" tích trước, "đã chạy" tích sau. */
  criteria: { id: string; check: (state: EditorState) => boolean }[];
}

function m(id: string, criteria: EditorMission["criteria"]): EditorMission {
  return { id, check: criteria[criteria.length - 1].check, criteria };
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
  m("open-index", [{ id: "opened", check: (s) => s.everOpened.includes("index.html") }]),
  m("change-heading", [
    {
      id: "edited",
      check: (s) => {
        const h = headingOf(getFile(s, "index.html")?.content);
        return !!h && h !== s.starterHeading.trim();
      },
    },
    {
      id: "ran",
      check: (s) => {
        const h = headingOf(s.lastRun?.snapshot["index.html"]);
        return !!h && h !== s.starterHeading.trim();
      },
    },
  ]),
  m("css-background", [
    { id: "edited", check: (s) => hasBodyBackground(getFile(s, "style.css")?.content) },
    { id: "ran", check: (s) => hasBodyBackground(s.lastRun?.snapshot["style.css"]) },
  ]),
  m("search-todo", [
    {
      id: "found",
      check: (s) => !!s.lastSearch && s.lastSearch.matches > 0 && s.lastSearch.query.trim().toLowerCase() === "todo",
    },
  ]),
  m("fix-bug", [
    {
      id: "fixed",
      check: (s) => {
        const script = getFile(s, "script.js")?.content;
        return script !== undefined && !/\bconsle\b/.test(script);
      },
    },
    {
      id: "clean",
      check: (s) => {
        const run = s.lastRun;
        if (!run || run.entry !== "index.html") return false;
        const script = run.snapshot["script.js"];
        if (script === undefined || /\bconsle\b/.test(script)) return false;
        return !run.console.some((e) => e.level === "error") && run.console.some((e) => e.level === "log");
      },
    },
  ]),
  m("button-log", [
    { id: "button", check: (s) => /<button\b/i.test(getFile(s, "index.html")?.content ?? "") },
    {
      id: "logged",
      check: (s) => {
        const run = s.lastRun;
        if (!run) return false;
        const html = run.snapshot[run.entry];
        return (
          !!html && /<button\b/i.test(html) && run.console.some((e) => e.level === "log" && e.source === "console" && e.afterClick)
        );
      },
    },
  ]),
  m("about-page", [
    { id: "file", check: (s) => !!getFile(s, "about.html") && getFile(s, "about.html")!.content.trim().length > 0 },
    {
      id: "link",
      check: (s) => {
        const about = getFile(s, "about.html");
        return !!about && about.content.trim().length > 0 && linksTo(getFile(s, "index.html")?.content, "about.html");
      },
    },
  ]),
  m("save-all", [
    { id: "saved", check: (s) => s.saveCount > 0 && dirtyFiles(s).length === 0 },
    { id: "about", check: (s) => !!getFile(s, "about.html") && s.saveCount > 0 && dirtyFiles(s).length === 0 },
  ]),
];

export const EDITOR_MISSION_IDS = EDITOR_MISSIONS.map((m) => m.id);
