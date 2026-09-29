import { describe, expect, it } from "vitest";
import { runQuery } from "@/lib/mini-sql";
import { SAMPLE_DB } from "@/lib/tools/sql/sample-db";
import { TERMINAL_MISSIONS } from "@/lib/tools/terminal/missions";
import { EDITOR_MISSIONS } from "@/lib/tools/editor/missions";
import { SQL_MISSIONS } from "@/lib/tools/sql/missions";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import { CLOUD_MISSIONS } from "@/lib/tools/cloud/missions";
import { parseDoneIds } from "@/lib/tools/progress";
import { toolTerminalEn, toolTerminalVi } from "@/lib/i18n/dictionaries/sections/tool-terminal";
import { toolEditorEn, toolEditorVi } from "@/lib/i18n/dictionaries/sections/tool-editor";
import { toolSqlEn, toolSqlVi } from "@/lib/i18n/dictionaries/sections/tool-sql";
import { toolApiEn, toolApiVi } from "@/lib/i18n/dictionaries/sections/tool-api";
import { toolCloudEn, toolCloudVi } from "@/lib/i18n/dictionaries/sections/tool-cloud";

/** Mỗi nhiệm vụ là một ticket: người yêu cầu, đề bài, và tiêu chí đạt được
 *  CHẤM BẰNG BỘ MÁY. Bộ kiểm này giữ hai điều không được lệch:
 *  - tiêu chí cuối của mỗi nhiệm vụ là chính hàm `check` (đủ tiêu chí ⇔ qua);
 *  - mọi tiêu chí có nhãn ở cả vi và en. */
type Copy = Record<string, { title: string; hint: string; from: string; brief: string; criteria: Record<string, string> }>;
type Mission = { id: string; check: unknown; criteria: { id: string; check: unknown }[] };

const TOOLS: [string, Mission[], Copy, Copy, string[]][] = [
  ["terminal", TERMINAL_MISSIONS, toolTerminalVi.toolTerminal.missions, toolTerminalEn.toolTerminal.missions, []],
  ["editor", EDITOR_MISSIONS, toolEditorVi.toolEditor.missions, toolEditorEn.toolEditor.missions, []],
  // "runs" và "rows" là tiêu chí chung của SQL, nhãn nằm ở revampTools.sql.
  ["sql", SQL_MISSIONS, toolSqlVi.toolSql.missions, toolSqlEn.toolSql.missions, ["runs", "rows"]],
  ["api", API_MISSIONS, toolApiVi.toolApi.missions as Copy, toolApiEn.toolApi.missions as Copy, []],
  ["cloud", CLOUD_MISSIONS, toolCloudVi.toolCloud.missions, toolCloudEn.toolCloud.missions, []],
];

describe("ticket của từng nhiệm vụ", () => {
  for (const [tool, missions, vi, en, shared] of TOOLS) {
    it(`${tool}: tiêu chí cuối chính là check`, () => {
      for (const m of missions) {
        expect(m.criteria.length, m.id).toBeGreaterThan(0);
        expect(m.criteria[m.criteria.length - 1].check, m.id).toBe(m.check);
        expect(new Set(m.criteria.map((c) => c.id)).size, m.id).toBe(m.criteria.length);
      }
    });

    it(`${tool}: người yêu cầu, đề bài và nhãn tiêu chí có ở vi và en`, () => {
      for (const m of missions) {
        for (const dict of [vi, en]) {
          const copy = dict[m.id];
          expect(copy?.from, m.id).toBeTruthy();
          expect(copy?.brief, m.id).toBeTruthy();
          for (const c of m.criteria) {
            if (shared.includes(c.id)) continue;
            expect(copy.criteria[c.id], `${m.id}.${c.id}`).toBeTruthy();
          }
        }
        expect(Object.keys(vi[m.id].criteria).sort()).toEqual(Object.keys(en[m.id].criteria).sort());
      }
    });
  }
});

describe("tiêu chí SQL đọc kết quả thật", () => {
  it("câu tham chiếu đạt mọi tiêu chí", () => {
    for (const m of SQL_MISSIONS) {
      const state = { result: runQuery(SAMPLE_DB, m.reference) };
      expect(m.criteria.map((c) => c.check(state)), m.id).toEqual(m.criteria.map(() => true));
    }
  });

  it("CEO hỏi top 10: LEFT JOIN kéo thêm khách chưa mua thì trượt tiêu chí số dòng", () => {
    const m = SQL_MISSIONS.find((x) => x.id === "revenue-per-customer")!;
    expect(m.expectedRowCount()).toBe(10);
    const state = {
      result: runQuery(
        SAMPLE_DB,
        "SELECT c.name, SUM(oi.quantity * p.price) AS revenue FROM customers c LEFT JOIN orders o ON o.customer_id = c.id LEFT JOIN order_items oi ON oi.order_id = o.id LEFT JOIN products p ON p.id = oi.product_id GROUP BY c.name ORDER BY revenue DESC",
      ),
    };
    const met = Object.fromEntries(m.criteria.map((c) => [c.id, c.check(state)]));
    expect(met).toEqual({ runs: true, rows: false, match: false });
  });

  it("chạy lỗi thì không tiêu chí nào đạt", () => {
    for (const m of SQL_MISSIONS) expect(m.criteria.some((c) => c.check({ result: null }))).toBe(false);
  });
});

describe("đọc tiến độ đã lưu cho trang tổng", () => {
  it("mảng id trần, hoặc trường done của trạng thái", () => {
    expect(parseDoneIds(JSON.stringify(["a", "b", "a"]))).toEqual(["a", "b"]);
    expect(parseDoneIds(JSON.stringify({ done: ["x", 3, "y"], api: {} }), "done")).toEqual(["x", "y"]);
  });

  it("dữ liệu hỏng hoặc trống thì về 0", () => {
    expect(parseDoneIds(null)).toEqual([]);
    expect(parseDoneIds("{không phải json")).toEqual([]);
    expect(parseDoneIds(JSON.stringify({ khac: 1 }), "done")).toEqual([]);
    expect(parseDoneIds(JSON.stringify(null), "done")).toEqual([]);
  });
});
