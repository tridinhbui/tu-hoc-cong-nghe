import { describe, expect, it } from "vitest";
import { FRM_FORMULAS_DATA } from "@/lib/frm-formulas-data";
import { FRM_SUBJECTS } from "@/lib/frm-track";

/**
 * Sổ tay công thức CFA có một lỗi mà bộ test của chính nó không bắt được: dữ
 * liệu ghi subjectId "fixed-income"/"econ"/"alt" trong khi nút lọc gửi
 * "fixedIncome"/"economics"/"alternatives", nên ba nhóm công thức không nút
 * nào chọn ra được và bốn nút luôn cho kết quả rỗng - mà trang vẫn trông như
 * đang chạy. Test đó không thấy vì nó so dữ liệu với một danh sách môn tự khai
 * ngay trong file test.
 *
 * Ở đây đối chiếu thẳng với FRM_SUBJECTS - nguồn mà nút lọc dùng - nên hai bên
 * không thể trôi khỏi nhau.
 */

const SUBJECT_IDS = FRM_SUBJECTS.map((s) => s.id);

// Hai môn khung/thời sự này không bắt buộc dày như các môn tính toán.
const LIGHT_SUBJECTS = new Set(["operational-resilience", "current-issues"]);

describe("sổ tay công thức FRM", () => {
  it("không trùng id", () => {
    const ids = FRM_FORMULAS_DATA.map((f) => f.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it("mọi subjectId đều là một môn mà bộ lọc gửi đi được", () => {
    const unknown = FRM_FORMULAS_DATA.filter((f) => !SUBJECT_IDS.includes(f.subjectId)).map(
      (f) => `${f.id} -> ${f.subjectId}`,
    );
    expect(unknown, "subjectId không khớp id nào trong FRM_SUBJECTS").toEqual([]);
  });

  it("mọi môn đều có công thức, không môn nào lọc ra rỗng", () => {
    const counts = new Map<string, number>();
    for (const f of FRM_FORMULAS_DATA) counts.set(f.subjectId, (counts.get(f.subjectId) ?? 0) + 1);
    const missing = SUBJECT_IDS.filter((s) => !counts.has(s));
    expect(missing, "môn không có công thức nào").toEqual([]);
  });

  it("môn tính toán được phải đủ dày để đáng mở", () => {
    const counts = new Map<string, number>();
    for (const f of FRM_FORMULAS_DATA) counts.set(f.subjectId, (counts.get(f.subjectId) ?? 0) + 1);
    const thin = SUBJECT_IDS.filter((s) => !LIGHT_SUBJECTS.has(s) && (counts.get(s) ?? 0) < 3).map(
      (s) => `${s} (${counts.get(s) ?? 0})`,
    );
    expect(thin, "môn có quá ít công thức").toEqual([]);
  });

  it("mọi công thức đều có thứ để vẽ ra", () => {
    // FormulaBlock vẽ hoặc một equation, hoặc tử trên mẫu. Thiếu cả hai thì nó
    // hiện ra một tiêu đề và một khoảng trắng.
    const empty = FRM_FORMULAS_DATA.filter(
      (f) => !f.equation && !(f.numerator && f.denominator),
    ).map((f) => f.id);
    expect(empty).toEqual([]);
  });

  it("mọi ví dụ đều có kết quả và mọi biến đều có tên", () => {
    const brokenExample = FRM_FORMULAS_DATA.filter((f) => f.example && !f.example.result).map(
      (f) => f.id,
    );
    expect(brokenExample).toEqual([]);
    const brokenVar = FRM_FORMULAS_DATA.filter((f) =>
      f.variables?.some((v) => !v.symbol || !v.name),
    ).map((f) => f.id);
    expect(brokenVar).toEqual([]);
  });
});

/** Cùng bất biến đó, áp ngược lại cho sổ tay CFA để lỗi trên không tái diễn. */
describe("sổ tay công thức CFA dùng đúng id môn", () => {
  it("mọi subjectId khớp một id trong CFA_LEVEL_1_SUBJECTS", async () => {
    const { CFA_FORMULAS_DATA } = await import("@/lib/cfa-formulas-data");
    const { CFA_LEVEL_1_SUBJECTS } = await import("@/lib/cfa-track");
    const ids = CFA_LEVEL_1_SUBJECTS.map((s) => s.id);
    const unknown = [...new Set(CFA_FORMULAS_DATA.map((f) => f.subjectId))].filter(
      (s) => !ids.includes(s as (typeof ids)[number]),
    );
    expect(unknown, "công thức CFA không lọc ra được bằng bất kỳ nút nào").toEqual([]);
  });
});
