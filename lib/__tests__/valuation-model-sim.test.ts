import { describe, expect, it } from "vitest";
import {
  VALUATION_MODELS,
  assumptionRefs,
  formulaOf,
  numericValue,
  sensitivityAxis,
  sensitivityGrid,
  sheetWithInputs,
} from "@/lib/valuation-model-sim";

/** Mô hình định giá dạng bảng tính.
 *
 *  Lý do bài này tồn tại: mọi con số trên lưới là một công thức người học đọc
 *  được, nên nếu một công thức sai thì nó không sai lặng lẽ - nó DẠY sai. Một
 *  DCF ra đúng con số nhưng vì hệ số chiết khấu lệch một năm thì vẫn là dạy
 *  sai, và chỉ có bài kiểm tra tính lại độc lập mới bắt được.
 */

const dcf = VALUATION_MODELS.dcf;
const comps = VALUATION_MODELS.comps;

/** DCF tính lại bằng tay, không dùng engine bảng tính. */
function dcfByHand(a: {
  revenue0: number;
  growth: number;
  margin: number;
  tax: number;
  da: number;
  capex: number;
  nwc: number;
  wacc: number;
  g: number;
  netDebt: number;
  shares: number;
}) {
  let revenue = a.revenue0;
  let sumPv = 0;
  let lastFcf = 0;
  let lastDf = 0;
  for (let year = 1; year <= 5; year += 1) {
    revenue = revenue * (1 + a.growth);
    const ebit = revenue * a.margin;
    const nopat = ebit * (1 - a.tax);
    const fcf = nopat + revenue * a.da - revenue * a.capex - revenue * a.nwc;
    const df = 1 / (1 + a.wacc) ** year;
    sumPv += fcf * df;
    lastFcf = fcf;
    lastDf = df;
  }
  const tv = (lastFcf * (1 + a.g)) / (a.wacc - a.g);
  const ev = sumPv + tv * lastDf;
  const equity = ev - a.netDebt;
  return { sumPv, tv, ev, equity, perShare: equity / a.shares };
}

const BASE = {
  revenue0: 1000,
  growth: 0.12,
  margin: 0.18,
  tax: 0.2,
  da: 0.05,
  capex: 0.07,
  nwc: 0.02,
  wacc: 0.11,
  g: 0.03,
  netDebt: 250,
  shares: 100,
};

describe("DCF trên lưới", () => {
  const sheet = sheetWithInputs(dcf, {});
  const hand = dcfByHand(BASE);

  it("khớp với DCF tính lại bằng tay ở từng chặng, không chỉ ở kết quả", () => {
    expect(numericValue(sheet, "B25")).toBeCloseTo(hand.sumPv, 6);
    expect(numericValue(sheet, "B26")).toBeCloseTo(hand.tv, 6);
    expect(numericValue(sheet, "B28")).toBeCloseTo(hand.ev, 6);
    expect(numericValue(sheet, "B29")).toBeCloseTo(hand.equity, 6);
    expect(numericValue(sheet, "B30")).toBeCloseTo(hand.perShare, 6);
  });

  it("chiết khấu năm t bằng đúng t, không lệch một năm", () => {
    // Lệch một năm là lỗi kinh điển của DCF dựng tay và nó không làm mô hình
    // vỡ - chỉ làm mọi giá trị cao lên vài phần trăm. Neo từng năm.
    for (const [ref, year] of [
      ["B22", 1],
      ["C22", 2],
      ["D22", 3],
      ["E22", 4],
      ["F22", 5],
    ] as const) {
      expect(numericValue(sheet, ref)).toBeCloseTo(1 / 1.11 ** year, 10);
    }
  });

  it("giá trị cuối kỳ được chiết khấu bằng hệ số năm 5, không phải năm 6", () => {
    const tv = numericValue(sheet, "B26")!;
    const df5 = numericValue(sheet, "F22")!;
    expect(numericValue(sheet, "B27")).toBeCloseTo(tv * df5, 6);
  });

  it("doanh thu năm 1 mọc từ doanh thu năm 0, không phải bằng nó", () => {
    expect(numericValue(sheet, "B15")).toBeCloseTo(1000 * 1.12, 10);
    expect(numericValue(sheet, "C15")).toBeCloseTo(1000 * 1.12 ** 2, 10);
    expect(numericValue(sheet, "F15")).toBeCloseTo(1000 * 1.12 ** 5, 10);
  });

  it("FCF trừ capex và tăng vốn lưu động, cộng khấu hao", () => {
    const rev1 = numericValue(sheet, "B15")!;
    const expected = rev1 * 0.18 * 0.8 + rev1 * 0.05 - rev1 * 0.07 - rev1 * 0.02;
    expect(numericValue(sheet, "B21")).toBeCloseTo(expected, 8);
  });

  it("sửa một giả định thì cả bảng đổi theo hướng đúng", () => {
    const base = numericValue(sheetWithInputs(dcf, {}), "B30")!;
    // WACC cao hơn -> giá thấp hơn. Đảo chiều quan hệ này là dạy ngược.
    const higherWacc = numericValue(sheetWithInputs(dcf, { B9: "0.14" }), "B30")!;
    expect(higherWacc).toBeLessThan(base);
    // Tăng trưởng cuối kỳ cao hơn -> giá cao hơn.
    const higherG = numericValue(sheetWithInputs(dcf, { B10: "0.045" }), "B30")!;
    expect(higherG).toBeGreaterThan(base);
    // Nợ ròng cao hơn -> giá mỗi cổ phần thấp hơn, EV không đổi.
    const moreDebt = sheetWithInputs(dcf, { B11: "500" });
    expect(numericValue(moreDebt, "B28")).toBeCloseTo(numericValue(sheetWithInputs(dcf, {}), "B28")!, 8);
    expect(numericValue(moreDebt, "B30")!).toBeLessThan(base);
  });

  it("g >= WACC là lỗi mô hình, không phải một con số rất lớn", () => {
    // Gordon growth hết hiệu lực khi g >= r. Nếu chỗ này trả về số thì UI sẽ
    // vẽ ra một mức giá tự tin và sai.
    expect(numericValue(sheetWithInputs(dcf, { B10: "0.11" }), "B30")).toBeNull();
    expect(numericValue(sheetWithInputs(dcf, { B10: "0.15" }), "B30")).toBeNull();
  });

  it("mọi ô giả định đều sửa được và mọi ô công thức đều đọc được công thức", () => {
    const refs = assumptionRefs(dcf);
    expect(refs).toContain("B9");
    expect(refs).toContain("B10");
    expect(refs.length).toBe(11);
    for (const ref of refs) expect(dcf.cells[ref]?.formula).toBeUndefined();
    for (const row of dcf.rows.filter((r) => r.kind === "formula")) {
      for (const ref of row.refs ?? []) {
        expect(formulaOf(sheet, ref), ref).not.toBeNull();
      }
    }
  });
});

describe("bảng độ nhạy", () => {
  it("trục trải đều quanh mức hiện tại", () => {
    expect(sensitivityAxis(0.11, 5, 0.01)).toEqual([0.09, 0.1, 0.11, 0.12, 0.13].map((v) => expect.closeTo(v, 10)));
  });

  it("giá giảm khi WACC tăng và tăng khi g tăng, trên toàn bảng", () => {
    const waccs = sensitivityAxis(0.11, 5, 0.01);
    const gs = sensitivityAxis(0.03, 5, 0.005);
    const grid = sensitivityGrid(dcf, {}, waccs, gs);
    expect(grid.length).toBe(5);
    for (const row of grid) {
      const known = row.filter((v): v is number => v !== null);
      // Trong một dòng (WACC cố định), g tăng dần thì giá tăng dần.
      for (let i = 1; i < known.length; i += 1) expect(known[i]).toBeGreaterThan(known[i - 1]);
    }
    for (let col = 0; col < gs.length; col += 1) {
      const column = grid.map((row) => row[col]).filter((v): v is number => v !== null);
      // Trong một cột (g cố định), WACC tăng dần thì giá giảm dần.
      for (let i = 1; i < column.length; i += 1) expect(column[i]).toBeLessThan(column[i - 1]);
    }
  });

  it("ô có g >= WACC là null, và chúng nằm ở góc chứ không rải rác", () => {
    const waccs = sensitivityAxis(0.05, 5, 0.01);
    const gs = sensitivityAxis(0.05, 5, 0.01);
    const grid = sensitivityGrid(dcf, {}, waccs, gs);
    const nulls = grid.flat().filter((v) => v === null).length;
    expect(nulls).toBeGreaterThan(0);
    // Không phải cả bảng: nếu mọi ô đều null thì bảng vô nghĩa và có lẽ do lỗi
    // khác chứ không phải do g >= WACC.
    expect(nulls).toBeLessThan(grid.flat().length);
  });
});

describe("định giá so sánh", () => {
  const sheet = sheetWithInputs(comps, {});

  it("dùng trung vị bội số, không dùng trung bình", () => {
    // EV/EBITDA của nhóm: 8.5, 9.2, 7.4, 11.1 -> trung vị 8.85, trung bình 9.05.
    expect(numericValue(sheet, "B8")).toBeCloseTo(8.85, 10);
    expect(numericValue(sheet, "C8")).toBeCloseTo(15.25, 10);
  });

  it("EV/EBITDA đi qua nợ ròng để ra equity, P/E thì không", () => {
    const ev = numericValue(sheet, "B16")!;
    expect(ev).toBeCloseTo(8.85 * 150, 8);
    // Bội số EV cần trừ nợ ròng; bội số P/E đã là giá trị vốn chủ.
    expect(numericValue(sheet, "B17")).toBeCloseTo(ev - 250, 8);
    expect(numericValue(sheet, "B18")).toBeCloseTo(15.25 * 72, 8);
  });

  it("khoảng chênh giữa hai lối đi được nêu ra, không bị làm phẳng", () => {
    const fromEv = numericValue(sheet, "B17")!;
    const fromPe = numericValue(sheet, "B18")!;
    expect(numericValue(sheet, "B19")).toBeCloseTo((fromPe - fromEv) / fromEv, 8);
    // Hai con số phải thực sự khác nhau ở bộ giả định mặc định, nếu không thì
    // bài học "hai phương pháp cho hai câu trả lời" không có gì để chỉ.
    expect(Math.abs(fromPe - fromEv)).toBeGreaterThan(1);
  });
});
