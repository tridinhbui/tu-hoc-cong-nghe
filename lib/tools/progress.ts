/**
 * Tiến độ nhiệm vụ của năm công cụ, đọc từ localStorage.
 *
 * Mỗi công cụ tự lưu danh sách nhiệm vụ đã xong trong trình duyệt (không có
 * bảng D1 nào cho việc này), mỗi công cụ một hình dạng riêng: SQL và Terminal
 * lưu thẳng một mảng id, còn Editor, API, Cloud lưu cả trạng thái kèm trường
 * `done`. Trang tổng /cong-cu đọc lại ở đây để hiện "đã xong / tổng" trên từng
 * thẻ mà không phải tải năm bộ máy mô phỏng.
 *
 * Khoá lưu được khai MỘT lần ở đây và các công cụ nhập lại, để đổi khoá ở một
 * chỗ không làm trang tổng âm thầm đọc về 0.
 */
import type { ToolId } from "@/components/tools/tool-registry";

/* i18n-ignore-start: localStorage keys, never displayed */
export const TOOL_STORAGE = {
  terminalState: "thtcdn:tool-terminal:state",
  terminalDone: "thtcdn:tool-terminal:done",
  editor: "thtcdn:tool-editor:state",
  sqlPrefix: "thtcdn:tool-sql:",
  api: "thtcdn:tool-api:state",
  cloud: "thtcdn:tool-cloud:state",
} as const;

/** Nơi mỗi công cụ cất danh sách id đã xong: khoá, và có nằm trong trường `done` không. */
const DONE_SOURCE: Record<ToolId, { key: string; field?: "done" }> = {
  terminal: { key: TOOL_STORAGE.terminalDone },
  editor: { key: TOOL_STORAGE.editor, field: "done" },
  sql: { key: `${TOOL_STORAGE.sqlPrefix}done` },
  api: { key: TOOL_STORAGE.api, field: "done" },
  cloud: { key: TOOL_STORAGE.cloud, field: "done" },
};
/* i18n-ignore-end */

/** Id nhiệm vụ đã xong của một công cụ, đọc từ chuỗi JSON đã lưu. Dữ liệu hỏng → []. */
export function parseDoneIds(raw: string | null, field?: "done"): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    const arr = field ? (parsed as Record<string, unknown> | null)?.[field] : parsed;
    return Array.isArray(arr) ? [...new Set(arr.filter((x): x is string => typeof x === "string"))] : [];
  } catch {
    return [];
  }
}

/** Số nhiệm vụ đã xong của từng công cụ. Bộ nhớ bị chặn → mọi công cụ về 0. */
export function readToolProgress(): Record<ToolId, number> {
  const out = { terminal: 0, editor: 0, sql: 0, api: 0, cloud: 0 } as Record<ToolId, number>;
  for (const id of Object.keys(DONE_SOURCE) as ToolId[]) {
    const { key, field } = DONE_SOURCE[id];
    try {
      out[id] = parseDoneIds(window.localStorage.getItem(key), field).length;
    } catch {
      out[id] = 0;
    }
  }
  return out;
}
