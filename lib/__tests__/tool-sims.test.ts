import { describe, expect, it } from "vitest";
import { TOOL_MISSION_COUNTS } from "@/components/tools/tool-registry";
import * as terminal from "@/lib/tools/terminal/missions";
import * as editor from "@/lib/tools/editor/missions";
import * as sql from "@/lib/tools/sql/missions";
import * as api from "@/lib/tools/api/missions";
import * as cloud from "@/lib/tools/cloud/missions";

/** Trang tổng /cong-cu hiện số nhiệm vụ từ tool-registry.ts để khỏi tải cả năm
 *  bộ máy mô phỏng. Con số gõ tay thì trôi ngay lần ai đó thêm nhiệm vụ - bộ
 *  kiểm này đếm lại từ danh sách thật. */
function missionArray(mod: Record<string, unknown>): unknown[] {
  const arr = Object.values(mod).find(
    (v) => Array.isArray(v) && v.length > 0 && typeof (v[0] as { id?: unknown }).id === "string"
  );
  return (arr as unknown[]) ?? [];
}

describe("số nhiệm vụ trên trang tổng khớp danh sách thật", () => {
  const mods = { terminal, editor, sql, api, cloud };
  for (const [id, mod] of Object.entries(mods)) {
    it(id, () => {
      expect(TOOL_MISSION_COUNTS[id as keyof typeof TOOL_MISSION_COUNTS]).toBe(missionArray(mod).length);
    });
  }
});
