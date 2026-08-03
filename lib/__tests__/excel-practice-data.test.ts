import { describe, expect, it } from "vitest";
import { EXCEL_PRACTICE_SETS, gradeSqlTask, type ExcelPracticeSet } from "../excel-practice-data";
import { runQuery } from "../mini-sql";
import { evaluateCell, formatValue, normalizeRef, valuesMatch, type Sheet } from "../mini-spreadsheet";

const gridSets = Object.entries(EXCEL_PRACTICE_SETS).filter(
  (entry): entry is [string, Extract<ExcelPracticeSet, { kind: "grid" }>] => entry[1].kind === "grid",
);

/** Lưới sau khi áp mọi lời giải tính đến nhiệm vụ thứ `upto`. */
function solvedThrough(set: Extract<ExcelPracticeSet, { kind: "grid" }>, upto: number): Sheet {
  const sheet: Sheet = { ...set.cells };
  for (let i = 0; i <= upto; i++) {
    const task = set.tasks[i];
    if (task.dataFix) sheet[normalizeRef(task.dataFix.ref)] = { value: task.dataFix.value };
    sheet[normalizeRef(task.target)] = { formula: task.solution };
  }
  return sheet;
}

describe("mọi lời giải mẫu thực sự cho ra đáp án", () => {
  for (const [key, set] of gridSets) {
    for (const [i, task] of set.tasks.entries()) {
      it(`${key} · ${task.target}`, () => {
        const value = evaluateCell(solvedThrough(set, i), task.target);
        expect(
          valuesMatch(value, task.expect),
          `${task.solution} ra ${formatValue(value)}, mong đợi ${task.expect}`,
        ).toBe(true);
      });
    }
  }
});

describe("lời giải mẫu tuân thủ chính ràng buộc của nhiệm vụ", () => {
  for (const [key, set] of gridSets) {
    for (const task of set.tasks) {
      it(`${key} · ${task.target}`, () => {
        const f = task.solution.toUpperCase().replace(/\s/g, "");
        for (const rule of task.mustUse ?? []) {
          expect(f, `thiếu ${rule.text}`).toContain(rule.text.toUpperCase().replace(/\s/g, ""));
        }
        for (const rule of task.mustAvoid ?? []) {
          expect(f, `chứa thứ bị cấm: ${rule.text}`).not.toContain(rule.text.toUpperCase().replace(/\s/g, ""));
        }
      });
    }
  }
});

describe("lưới dựng đúng", () => {
  it("ô đích để trống, trừ đúng những ô khai là prefilled", () => {
    for (const [key, set] of gridSets) {
      for (const task of set.tasks) {
        const ref = normalizeRef(task.target);
        if (task.prefilled) {
          // Bài viết-lại: ô phải thực sự có sẵn một công thức sai để sửa.
          expect(set.cells[ref]?.formula, `${key} · ${ref} khai prefilled nhưng trống`).toBeTruthy();
        } else {
          expect(set.cells[ref], `${key} · ${ref} đã có sẵn nội dung`).toBeUndefined();
        }
      }
    }
  });

  it("mọi ô đích nằm trong phạm vi cột và dòng được hiển thị", () => {
    for (const [key, set] of gridSets) {
      for (const task of set.tasks) {
        const m = /^([A-Z]+)(\d+)$/.exec(normalizeRef(task.target))!;
        expect(set.columns, `${key} · cột ${m[1]} không hiển thị`).toContain(m[1]);
        expect(Number(m[2]), `${key} · dòng ${m[2]} ngoài lưới`).toBeLessThanOrEqual(set.rows);
      }
    }
  });

  it("mọi ô có sẵn cũng nằm trong lưới - không có dữ liệu ẩn ngoài màn hình", () => {
    for (const [key, set] of gridSets) {
      for (const ref of Object.keys(set.cells)) {
        const m = /^([A-Z]+)(\d+)$/.exec(ref)!;
        expect(set.columns, `${key} · ${ref} nằm ở cột không hiển thị`).toContain(m[1]);
        expect(Number(m[2]), `${key} · ${ref} nằm dưới dòng cuối`).toBeLessThanOrEqual(set.rows);
      }
    }
  });

  it("không nhiệm vụ nào trỏ trùng ô với nhiệm vụ khác", () => {
    for (const [key, set] of gridSets) {
      const refs = set.tasks.map((t) => normalizeRef(t.target));
      expect(new Set(refs).size, `${key} có ô đích trùng`).toBe(refs.length);
    }
  });
});

describe("bài tập xếp bước", () => {
  it("Power Query có đủ bước và không bước nào trùng", () => {
    const set = EXCEL_PRACTICE_SETS["excel-power-query"];
    expect(set.kind).toBe("steps");
    if (set.kind !== "steps") return;
    expect(set.task.steps.length).toBeGreaterThanOrEqual(5);
    expect(new Set(set.task.steps).size).toBe(set.task.steps.length);
  });
});

describe("chất lượng nội dung", () => {
  it("mỗi nhiệm vụ có gợi ý và lời giải thích thật, không phải chỗ trống", () => {
    for (const [key, set] of gridSets) {
      for (const task of set.tasks) {
        expect(task.hint.length, `${key} · ${task.target}`).toBeGreaterThan(4);
        expect(task.explain.length, `${key} · ${task.target}`).toBeGreaterThan(80);
      }
    }
  });

  it("mọi ràng buộc mustUse/mustAvoid đều kèm lý do", () => {
    for (const [key, set] of gridSets) {
      for (const task of set.tasks) {
        for (const rule of [...(task.mustUse ?? []), ...(task.mustAvoid ?? [])]) {
          expect(rule.why.length, `${key} · ${task.target} · ${rule.text}`).toBeGreaterThan(20);
        }
      }
    }
  });
});

describe("bài tập SQL", () => {
  const set = EXCEL_PRACTICE_SETS["excel-sql"];

  it("mọi truy vấn mẫu chạy được và trả về ít nhất một dòng", () => {
    if (set.kind !== "sql") throw new Error("excel-sql phải là bộ SQL");
    for (const task of set.tasks) {
      const r = runQuery(set.db, task.solution);
      expect(r.rows.length, task.solution).toBeGreaterThan(0);
    }
  });

  it("chấm đúng: truy vấn mẫu đạt, truy vấn khác nội dung không đạt", () => {
    if (set.kind !== "sql") return;
    for (const task of set.tasks) {
      expect(gradeSqlTask(set.db, task, task.solution).ok, task.solution).toBe(true);
      expect(gradeSqlTask(set.db, task, "SELECT ma FROM danh_muc LIMIT 1").ok).toBe(false);
    }
  });

  it("truy vấn hỏng trả về thông báo lỗi chứ không làm sập widget", () => {
    if (set.kind !== "sql") return;
    const g = gradeSqlTask(set.db, set.tasks[0], "SELECT tu_dau FROM khong_co");
    expect(g.ok).toBe(false);
    expect(g.kind).toBe("error");
    expect(g.message.length).toBeGreaterThan(5);
  });

  it("bảng gia cố ý thiếu đúng một mã - đó là nội dung nhiệm vụ cuối", () => {
    if (set.kind !== "sql") return;
    const missing = runQuery(
      set.db,
      "SELECT d.ma FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma WHERE g.gia IS NULL",
    );
    expect(missing.rows.length).toBe(1);
  });
});
