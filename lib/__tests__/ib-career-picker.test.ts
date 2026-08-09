import { describe, expect, it } from "vitest";
import {
  PICKER_CATEGORY_ORDER,
  groupCoverageByCategory,
  withoutWholeBankCareers,
} from "@/lib/ib-career-picker";
import { getCareersCoveredByBank } from "@/lib/ib-question-careers";
import { IB_TECHNICAL_QUESTIONS } from "@/lib/ib-question-bank";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import type { CareerCoverage } from "@/lib/ib-question-careers";

const cov = (careerId: string, questionCount: number): CareerCoverage => ({
  careerId,
  questionCount,
  categories: [],
});

describe("nút lọc không lọc được gì thì bỏ", () => {
  it("bỏ nghề phủ trọn kho", () => {
    const out = withoutWholeBankCareers([cov("a", 100), cov("b", 40)], 100);
    expect(out.map((c) => c.careerId)).toEqual(["b"]);
  });

  it("giữ nghề chỉ phủ một phần, kể cả phần rất lớn", () => {
    expect(withoutWholeBankCareers([cov("a", 99)], 100).map((c) => c.careerId)).toEqual(["a"]);
  });

  it("tổng bằng 0 thì không bỏ gì - kho rỗng không phải lý do giấu nút", () => {
    expect(withoutWholeBankCareers([cov("a", 0)], 0)).toHaveLength(1);
  });

  it("trên dữ liệu THẬT, đúng Ngân hàng Đầu tư bị bỏ", () => {
    // Đây là phép đo đã dẫn tới thay đổi này: kho technical 276 câu, và
    // investment-banking cũng 276 - vì kho vốn là bộ câu hỏi IB.
    const all = getCareersCoveredByBank();
    const kept = withoutWholeBankCareers(all, IB_TECHNICAL_QUESTIONS.length);
    const dropped = all.filter((c) => !kept.includes(c)).map((c) => c.careerId);
    expect(dropped).toEqual(["investment-banking"]);
  });
});

describe("gom theo nhóm nghề", () => {
  it("giữ thứ tự nhóm đã khai báo", () => {
    const byCategory = new Map(FINANCE_CAREERS.map((c) => [c.category, c.id]));
    const sample = PICKER_CATEGORY_ORDER.map((cat) => cov(byCategory.get(cat)!, 10));
    // Đảo ngược đầu vào: thứ tự ra phải theo bảng khai báo, không theo đầu vào.
    const groups = groupCoverageByCategory([...sample].reverse());
    expect(groups.map((g) => g.category)).toEqual([...PICKER_CATEGORY_ORDER]);
  });

  it("giữ thứ tự nghề bên trong một nhóm", () => {
    // Thứ tự vào là thứ tự đã sắp theo số câu; gom nhóm không được xáo nó.
    const ids = FINANCE_CAREERS.filter((c) => c.category === "investment").slice(0, 3).map((c) => c.id);
    const groups = groupCoverageByCategory(ids.map((id, i) => cov(id, 100 - i)));
    expect(groups[0].careers.map((c) => c.careerId)).toEqual(ids);
  });

  it("nhóm rỗng không xuất hiện", () => {
    const one = FINANCE_CAREERS.find((c) => c.category === "accounting")!;
    const groups = groupCoverageByCategory([cov(one.id, 10)]);
    expect(groups).toHaveLength(1);
    expect(groups[0].category).toBe("accounting");
  });

  it("nghề không có trong FINANCE_CAREERS thì bị bỏ, không rơi vào nhóm bừa", () => {
    expect(groupCoverageByCategory([cov("khong-ton-tai", 10)])).toEqual([]);
  });

  it("trên dữ liệu THẬT, không nghề nào rơi ra ngoài", () => {
    // Gom nhóm không được làm mất nút nào: người dùng mất một vị trí khỏi bộ
    // chọn là mất một bộ đề, và không có gì báo.
    const kept = withoutWholeBankCareers(getCareersCoveredByBank(), IB_TECHNICAL_QUESTIONS.length);
    const grouped = groupCoverageByCategory(kept).flatMap((g) => g.careers);
    expect(grouped).toHaveLength(kept.length);
  });
});
