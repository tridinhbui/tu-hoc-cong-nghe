import { describe, expect, it } from "vitest";
import {
  ExcelError,
  evaluateCell,
  expandRange,
  formatValue,
  indexToCol,
  isError,
  matchesCriterion,
  normalizeRef,
  valuesMatch,
  type Sheet,
} from "../mini-spreadsheet";

function sheetOf(cells: Record<string, number | string>): Sheet {
  const out: Sheet = {};
  for (const [k, v] of Object.entries(cells)) {
    out[k] = typeof v === "string" && v.startsWith("=") ? { formula: v } : { value: v };
  }
  return out;
}

const run = (cells: Record<string, number | string>, ref: string) => evaluateCell(sheetOf(cells), ref);

describe("địa chỉ ô", () => {
  it("bỏ dấu $ khi tra vào sheet", () => {
    expect(normalizeRef("$B$4")).toBe("B4");
    expect(normalizeRef("b4")).toBe("B4");
  });

  it("đổi qua lại giữa chỉ số và tên cột", () => {
    expect(indexToCol(1)).toBe("A");
    expect(indexToCol(26)).toBe("Z");
    expect(indexToCol(27)).toBe("AA");
  });

  it("mở vùng theo cột trước rồi tới dòng", () => {
    expect(expandRange("A1", "B2")).toEqual(["A1", "A2", "B1", "B2"]);
    expect(expandRange("B3", "B1")).toEqual(["B1", "B2", "B3"]);
  });
});

describe("số học và tham chiếu", () => {
  it("tính theo đúng thứ tự ưu tiên", () => {
    expect(run({ A1: "=2+3*4" }, "A1")).toBe(14);
    expect(run({ A1: "=(2+3)*4" }, "A1")).toBe(20);
    expect(run({ A1: "=2^3^2" }, "A1")).toBe(512);
  });

  it("cộng qua nhiều ô và cả vùng", () => {
    const s = { A1: 10, A2: 20, A3: 30, B1: "=SUM(A1:A3)", B2: "=A1+A3" };
    expect(run(s, "B1")).toBe(60);
    expect(run(s, "B2")).toBe(40);
  });

  it("dấu $ không đổi kết quả, chỉ đổi cách kéo công thức", () => {
    expect(run({ A1: 5, B1: "=$A$1*2" }, "B1")).toBe(10);
  });

  it("ô trống tính như 0 chứ không phải lỗi", () => {
    expect(run({ A1: "=B9+1" }, "A1")).toBe(1);
  });
});

describe("giá trị lỗi", () => {
  it("chia cho 0 ra #DIV/0!", () => {
    const v = run({ A1: 10, B1: 0, C1: "=A1/B1" }, "C1");
    expect(isError(v) && v.code).toBe("#DIV/0!");
  });

  it("lỗi lan sang mọi ô phụ thuộc", () => {
    const v = run({ A1: "=1/0", B1: "=A1+100", C1: "=SUM(B1:B1)" }, "C1");
    expect(isError(v) && v.code).toBe("#DIV/0!");
  });

  it("IFERROR chặn lỗi mà không tính nhánh hỏng hai lần", () => {
    expect(run({ A1: 10, B1: 0, C1: "=IFERROR(A1/B1, 0)" }, "C1")).toBe(0);
  });

  it("IFNA chỉ bắt #N/A, để #DIV/0! đi tiếp", () => {
    const v = run({ A1: "=IFNA(1/0, 0)" }, "A1");
    expect(isError(v) && v.code).toBe("#DIV/0!");
    expect(run({ A1: '=IFNA(MATCH("x", B1:B2, 0), -1)', B1: "a", B2: "b" }, "A1")).toBe(-1);
  });

  it("hàm chưa hỗ trợ báo tên rõ ràng thay vì im lặng ra 0", () => {
    const v = run({ A1: "=XIRR(A2:A3, B2:B3)" }, "A1");
    expect(isError(v) && v.code).toBe("#NAME?");
  });
});

describe("tham chiếu vòng", () => {
  it("phát hiện vòng lặp và kể ra chuỗi ô, thay vì treo", () => {
    const v = run({ A1: "=B1+1", B1: "=C1+1", C1: "=A1+1" }, "A1");
    expect(isError(v) && v.code).toBe("#CIRC!");
    expect(isError(v) && v.detail).toBe("A1 → B1 → C1 → A1");
  });

  it("bắt cả vòng lặp một ô tự trỏ vào chính nó", () => {
    const v = run({ A1: "=A1+1" }, "A1");
    expect(isError(v) && v.code).toBe("#CIRC!");
  });

  it("một ô dùng lại hai lần không phải vòng lặp", () => {
    expect(run({ A1: 5, B1: "=A1*2", C1: "=A1+B1" }, "C1")).toBe(15);
  });
});

describe("nhóm hàm tra cứu", () => {
  const book = {
    A1: "MÃ",
    A2: "FPT",
    A3: "HPG",
    A4: "VNM",
    B1: "GIÁ",
    B2: 120,
    B3: 27,
    B4: 68,
  };

  it("INDEX/MATCH lấy đúng dòng", () => {
    expect(run({ ...book, D1: '=INDEX(B2:B4, MATCH("HPG", A2:A4, 0))' }, "D1")).toBe(27);
  });

  it("MATCH không thấy khoá thì trả #N/A chứ không trả 0", () => {
    const v = run({ ...book, D1: '=MATCH("SSI", A2:A4, 0)' }, "D1");
    expect(isError(v) && v.code).toBe("#N/A");
  });

  it("XLOOKUP nhận giá trị thay thế ngay trong hàm", () => {
    expect(run({ ...book, D1: '=XLOOKUP("SSI", A2:A4, B2:B4, 0)' }, "D1")).toBe(0);
    expect(run({ ...book, D1: '=XLOOKUP("VNM", A2:A4, B2:B4, 0)' }, "D1")).toBe(68);
  });

  it("VLOOKUP giữ nguyên điểm yếu thật: số cột là giả định bị chôn", () => {
    expect(run({ ...book, D1: '=VLOOKUP("HPG", A2:B4, 2, 0)' }, "D1")).toBe(27);
    const v = run({ ...book, D1: '=VLOOKUP("HPG", A2:B4, 3, 0)' }, "D1");
    expect(isError(v) && v.code).toBe("#REF!");
  });

  it("khoảng trắng thừa làm hỏng khớp chính xác - đúng lỗi bài 2 mô tả", () => {
    const dirty = { ...book, A3: "HPG ", D1: '=MATCH("HPG", A2:A4, 0)' };
    const v = run(dirty, "D1");
    expect(isError(v) && v.code).toBe("#N/A");
    expect(run({ ...dirty, D1: '=MATCH("HPG", A2:A4, 0)', A3: "HPG" }, "D1")).toBe(2);
  });

  it("INDEX ra ngoài vùng trả #REF!", () => {
    const v = run({ ...book, D1: "=INDEX(B2:B4, 9)" }, "D1");
    expect(isError(v) && v.code).toBe("#REF!");
  });
});

describe("tổng hợp có điều kiện", () => {
  const data = {
    A1: "Hà Nội",
    A2: "TP.HCM",
    A3: "Hà Nội",
    A4: "Đà Nẵng",
    B1: "Q1",
    B2: "Q1",
    B3: "Q2",
    B4: "Q1",
    C1: 100,
    C2: 250,
    C3: 140,
    C4: 60,
  };

  it("SUMIF nhận vùng tổng ở tham số thứ ba", () => {
    expect(run({ ...data, E1: '=SUMIF(A1:A4, "Hà Nội", C1:C4)' }, "E1")).toBe(240);
  });

  it("SUMIFS nhận vùng tổng ở tham số ĐẦU - chỗ hay nhầm nhất", () => {
    expect(run({ ...data, E1: '=SUMIFS(C1:C4, A1:A4, "Hà Nội", B1:B4, "Q1")' }, "E1")).toBe(100);
  });

  it("SUMIFS thiếu vế điều kiện thì báo lỗi thay vì đoán", () => {
    const v = run({ ...data, E1: '=SUMIFS(C1:C4, A1:A4)' }, "E1");
    expect(isError(v) && v.code).toBe("#VALUE!");
  });

  it("COUNTIF đọc được điều kiện so sánh", () => {
    expect(run({ ...data, E1: '=COUNTIF(C1:C4, ">100")' }, "E1")).toBe(2);
  });

  it("điều kiện dạng chuỗi so khớp không phân biệt hoa thường", () => {
    expect(matchesCriterion("Hà Nội", "hà nội")).toBe(true);
    expect(matchesCriterion(120, ">=120")).toBe(true);
    expect(matchesCriterion("FPT", "<>FPT")).toBe(false);
  });
});

describe("logic và làm tròn", () => {
  it("IF chỉ tính nhánh được chọn", () => {
    expect(run({ A1: 1, B1: 0, C1: "=IF(A1>0, 10, A1/B1)" }, "C1")).toBe(10);
  });

  it("ROUND làm tròn cả số âm ra xa 0 như Excel", () => {
    expect(run({ A1: "=ROUND(2.345, 2)" }, "A1")).toBe(2.35);
    expect(run({ A1: "=ROUND(-2.5, 0)" }, "A1")).toBe(-3);
  });

  it("AND/OR đọc được cả vùng", () => {
    expect(run({ A1: 1, A2: 1, B1: "=AND(A1:A2)" }, "B1")).toBe(true);
    expect(run({ A1: 0, A2: 1, B1: "=AND(A1:A2)" }, "B1")).toBe(false);
  });

  it("nối chuỗi bằng &", () => {
    expect(run({ A1: "FPT", B1: 2025, C1: "=A1&\" \"&B1" }, "C1")).toBe("FPT 2025");
  });
});

describe("hiển thị và chấm bài", () => {
  it("số hiển thị theo định dạng Việt Nam", () => {
    expect(formatValue(1234567)).toBe("1.234.567");
    expect(formatValue(0.5, 2)).toBe("0,50");
  });

  it("ô lỗi hiển thị đúng mã lỗi", () => {
    expect(formatValue(new ExcelError("#N/A"))).toBe("#N/A");
  });

  it("chấm số có dung sai, chấm lỗi theo đúng mã", () => {
    expect(valuesMatch(2.3401, 2.34)).toBe(true);
    expect(valuesMatch(2.4, 2.34)).toBe(false);
    expect(valuesMatch(new ExcelError("#N/A"), new ExcelError("#N/A"))).toBe(true);
    expect(valuesMatch(0, new ExcelError("#N/A"))).toBe(false);
  });
});
