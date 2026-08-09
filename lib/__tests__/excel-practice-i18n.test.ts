import { describe, expect, it } from "vitest";
import { VIETNAMESE_DIACRITICS } from "./vietnamese-diacritics";
import { EXCEL_PRACTICE_SETS } from "@/lib/excel-practice-data";
import { excelPracticeEn } from "@/lib/excel-practice-data-i18n/en";
import { mergeExcelPracticeSet, NOT_COPY_CELLS } from "@/lib/excel-practice-data-i18n";

/** Cổng ĐỦ-100% cho bản dịch bài tập Excel.
 *
 *  Bộ kiểm này là điều kiện để thư mục được đặt tên `excel-practice-data-i18n`
 *  khớp quy ước mà `scripts/i18n-coverage.mjs` dùng để tách 180 chuỗi của tệp
 *  gốc ra khỏi tổng. Chú thích của chính script đó ghi rõ: chỉ đặt tên khớp SAU
 *  KHI có cổng bắt buộc đủ 100%, vì nếu không thì việc tách ra là một lời khẳng
 *  định "đã xong" trong khi chưa xong - và đó là cách giấu việc chưa làm sau một
 *  con số trông đẹp hơn.
 *
 *  Nên cổng này phải đỏ khi ai đó THÊM một bộ bài tập, một nhiệm vụ, hay một ô
 *  chữ mới mà không dịch. Đó là toàn bộ lý do nó tồn tại. */

const VN = VIETNAMESE_DIACRITICS;
describe("mọi bộ bài tập đều có bản tiếng Anh", () => {
  it("không thiếu bộ nào", () => {
    const missing = Object.keys(EXCEL_PRACTICE_SETS).filter((key) => !excelPracticeEn[key]);
    expect(missing).toEqual([]);
  });

  it("không có bản dịch mồ côi", () => {
    // Đổi tên một khoá ở tệp gốc thì bản dịch cũ vẫn nằm đây và không ai gọi
    // tới; nó chỉ trông như đã dịch.
    const orphans = Object.keys(excelPracticeEn).filter((key) => !(key in EXCEL_PRACTICE_SETS));
    expect(orphans).toEqual([]);
  });

  it("mỗi bộ có title và intro", () => {
    for (const key of Object.keys(EXCEL_PRACTICE_SETS)) {
      expect(excelPracticeEn[key].title, key).toBeTruthy();
      expect(excelPracticeEn[key].intro, key).toBeTruthy();
    }
  });
});

describe("mọi nhiệm vụ đều dịch đủ trường", () => {
  for (const [key, set] of Object.entries(EXCEL_PRACTICE_SETS)) {
    const patch = excelPracticeEn[key];
    const sourceTasks = set.kind === "steps" ? [set.task] : set.tasks;
    const patchTasks = set.kind === "steps" ? [patch.task] : patch.tasks;

    it(`${key}: số nhiệm vụ khớp`, () => {
      // Mảng theo VỊ TRÍ. Lệch độ dài thì mergeTask bỏ nguyên mảng và giữ tiếng
      // Việt - an toàn, nhưng nghĩa là bản dịch âm thầm không có tác dụng.
      expect(patchTasks?.length).toBe(sourceTasks.length);
    });

    sourceTasks.forEach((task, i) => {
      it(`${key}[${i}]: prompt, hint, explain, và mọi mảng con`, () => {
        const p = patchTasks?.[i];
        expect(p, "thiếu bản dịch cho nhiệm vụ này").toBeTruthy();
        expect(p!.prompt, "prompt").toBeTruthy();
        expect(p!.explain, "explain").toBeTruthy();
        if ("hint" in task && task.hint) expect(p!.hint, "hint").toBeTruthy();
        if ("mustUse" in task && task.mustUse)
          expect(p!.mustUseWhy?.length, "mustUseWhy").toBe(task.mustUse.length);
        if ("mustAvoid" in task && task.mustAvoid)
          expect(p!.mustAvoidWhy?.length, "mustAvoidWhy").toBe(task.mustAvoid.length);
        if ("steps" in task && task.steps)
          expect(p!.steps?.length, "steps").toBe(task.steps.length);
      });
    });
  }
});

describe("mọi ô chữ trên lưới đều dịch, trừ những ô có tên trong NOT_COPY_CELLS", () => {
  for (const [key, set] of Object.entries(EXCEL_PRACTICE_SETS)) {
    if (set.kind !== "grid") continue;
    it(key, () => {
      const exempt = NOT_COPY_CELLS[key] ?? new Set<string>();
      const cells = excelPracticeEn[key].cells ?? {};
      const untranslated = Object.entries(set.cells)
        .filter(([ref, cell]) => "value" in cell && typeof cell.value === "string")
        .filter(([ref]) => !exempt.has(ref) && !cells[ref])
        .map(([ref, cell]) => `${ref}=${(cell as { value: string }).value}`);
      expect(untranslated).toEqual([]);
    });
  }
});

describe("những thứ KHÔNG được dịch thì vẫn nguyên", () => {
  it('ô "HPG " giữ đúng khoảng trắng ở cuối sau khi hợp nhất', () => {
    // Cả nhiệm vụ 2 của bộ excel-lookup tồn tại để học viên tìm ra khoảng trắng
    // này. Dịch hay cắt gọn ô đó là xoá mất bài học, và không phép kiểm nào
    // khác thấy - lưới vẫn hiện ra bình thường.
    const merged = mergeExcelPracticeSet("excel-lookup", EXCEL_PRACTICE_SETS["excel-lookup"], "en");
    const cell = (merged as Extract<typeof merged, { kind: "grid" }>).cells.A3;
    expect(cell).toEqual({ value: "HPG " });
  });

  it("mọi mã chứng khoán giữ nguyên qua bản tiếng Anh", () => {
    const merged = mergeExcelPracticeSet("excel-lookup", EXCEL_PRACTICE_SETS["excel-lookup"], "en");
    const cells = (merged as Extract<typeof merged, { kind: "grid" }>).cells;
    for (const [ref, ticker] of [
      ["A2", "FPT"],
      ["A4", "VNM"],
      ["E5", "GAS"],
    ] as const) {
      expect(cells[ref], ref).toEqual({ value: ticker });
    }
  });

  it("công thức mẫu và ô số đi qua nguyên vẹn", () => {
    for (const key of Object.keys(EXCEL_PRACTICE_SETS)) {
      const source = EXCEL_PRACTICE_SETS[key];
      const merged = mergeExcelPracticeSet(key, source, "en");
      const tasks = merged.kind === "steps" ? [merged.task] : merged.tasks;
      const srcTasks = source.kind === "steps" ? [source.task] : source.tasks;
      tasks.forEach((task, i) => {
        expect((task as { solution?: string }).solution, `${key}[${i}]`).toBe(
          (srcTasks[i] as { solution?: string }).solution
        );
      });
      if (merged.kind === "grid" && source.kind === "grid") {
        for (const [ref, cell] of Object.entries(source.cells)) {
          if ("formula" in cell || typeof (cell as { value?: unknown }).value === "number") {
            expect(merged.cells[ref], `${key}.${ref}`).toEqual(cell);
          }
        }
      }
    }
  });

  it("tên bảng và tên cột SQL không bị dịch trong phần gợi ý", () => {
    // `danh_muc`, `gia`, `so_luong`, `nganh`, `ma` là định danh trong `db` của
    // tệp gốc và bộ chấm chạy truy vấn THẬT. Dịch chúng là đưa cho học viên một
    // câu truy vấn không chạy được.
    const hints = (excelPracticeEn["excel-sql"].tasks ?? []).map((t) => t.hint ?? "").join(" ");
    expect(hints).toContain("danh_muc");
    expect(hints).toContain("so_luong");
    expect(hints).toContain("nganh");
  });
});

describe("bản tiếng Anh thật sự là tiếng Anh", () => {
  it("không còn chuỗi nào mang dấu tiếng Việt", () => {
    // tsc chỉ chứng minh khoá TỒN TẠI, không chứng minh nó đã được dịch. Dán
    // nguyên bản tiếng Việt vào đây thì biên dịch vẫn qua.
    const offenders: string[] = [];
    const walk = (node: unknown, path: string) => {
      if (typeof node === "string") {
        if (VN.test(node)) offenders.push(`${path}: ${node.slice(0, 60)}`);
        return;
      }
      if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (node && typeof node === "object")
        for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
    };
    walk(excelPracticeEn, "en");
    expect(offenders).toEqual([]);
  });

  it("locale vi không bị áp bản dịch", () => {
    for (const key of Object.keys(EXCEL_PRACTICE_SETS)) {
      expect(mergeExcelPracticeSet(key, EXCEL_PRACTICE_SETS[key], "vi")).toBe(
        EXCEL_PRACTICE_SETS[key]
      );
    }
  });
});
