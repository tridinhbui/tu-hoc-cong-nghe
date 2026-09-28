/** Số nhiệm vụ của từng công cụ, hiện trên thẻ ở trang tổng /cong-cu.
 *
 *  Mỗi công cụ khai danh sách nhiệm vụ của chính nó trong lib/tools/<id>/;
 *  tệp này chỉ đếm lại để trang tổng không phải tải cả năm bộ máy mô phỏng.
 *  lib/__tests__/tool-sims.test.ts giữ con số ở đây khớp với danh sách thật. */
export type ToolId = "terminal" | "editor" | "sql" | "api" | "cloud";

export const TOOL_MISSION_COUNTS: Record<ToolId, number> = {
  terminal: 8,
  editor: 8,
  sql: 8,
  api: 8,
  cloud: 8,
};
