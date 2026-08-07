import { evaluateCell, isError, type CellValue, type Sheet } from "@/lib/mini-spreadsheet";

/** Mô hình định giá dạng bảng tính - "Excel" thật, không phải máy tính có slider.
 *
 *  Khác biệt với components/tools/ValuationDCFCalculator.tsx: ở đó học viên kéo
 *  slider và đọc kết quả, nên không bao giờ thấy DCF được LẮP RA từ cái gì. Ở
 *  đây từng dòng là một ô có công thức xem được: doanh thu nhân với tỷ lệ tăng,
 *  EBIT nhân biên, hệ số chiết khấu là 1/(1+WACC)^năm. Sửa một giả định thì cả
 *  bảng tính lại, giống hệt lúc bấm Enter trong Excel.
 *
 *  Khác biệt với components/ExcelPractice.tsx: ở đó có đáp án và có chấm điểm.
 *  Ở đây không có đáp án đúng - đây là mô hình để chơi với nó.
 *
 *  KHÔNG ĐẶT CHỮ HIỂN THỊ TRONG FILE NÀY. Nhãn dòng nằm ở
 *  `t.valuationSim.*`, tra theo `labelKey`. Một bảng dữ liệu ở module scope
 *  chứa tiếng Việt là điểm mù mà scripts/i18n-coverage.mjs vừa phải mở rộng để
 *  nhìn thấy; đừng tạo thêm cái nữa.
 */

export type RowKind = "section" | "assumption" | "formula" | "spacer";

export type ModelRow = {
  /** Khoá tra nhãn trong `t.valuationSim.rows`. */
  labelKey: string;
  kind: RowKind;
  /** Ô của dòng, theo thứ tự cột. Dòng `section`/`spacer` không có ô nào. */
  refs?: string[];
  /** Đơn vị để hiển thị: phần trăm, số tiền, hệ số, hay số năm. */
  unit?: "percent" | "money" | "multiple" | "plain";
  /** Dòng kết quả cuối - tô đậm trong UI. */
  emphasis?: boolean;
};

export type ValuationModel = {
  id: string;
  /** Cột hiển thị trên lưới, gồm cả cột nhãn A. */
  columns: string[];
  rows: ModelRow[];
  /** Sheet gốc: chỉ số và công thức. */
  cells: Sheet;
  /** Ô kết quả chính, dùng cho bảng độ nhạy và cho dòng tóm tắt. */
  outputRef: string;
  /** Hai giả định mà bảng độ nhạy xoay quanh. */
  sensitivity?: { rowRef: string; colRef: string; steps: number; step: number };
};

/* ------------------------------------------------------------------ *
 * DCF năm năm, có cầu nối EV -> equity -> giá mỗi cổ phần
 * ------------------------------------------------------------------ */

const DCF_YEARS = 5;

function dcfCells(): Sheet {
  const cells: Sheet = {
    // Giả định. Đơn vị: tiền tệ tuỳ người dùng đọc là tỷ hay triệu - mô hình
    // không nhân chia gì với đơn vị nên nó nhất quán ở mọi thang.
    B2: { value: 1000 },
    B3: { value: 0.12 },
    B4: { value: 0.18 },
    B5: { value: 0.2 },
    B6: { value: 0.05 },
    B7: { value: 0.07 },
    B8: { value: 0.02 },
    B9: { value: 0.11 },
    B10: { value: 0.03 },
    B11: { value: 250 },
    B12: { value: 100 },
  };

  const col = ["B", "C", "D", "E", "F"];
  for (let i = 0; i < DCF_YEARS; i += 1) {
    const c = col[i];
    const prev = i === 0 ? "$B$2" : `${col[i - 1]}15`;
    cells[`${c}14`] = { value: i + 1 };
    // Năm 1 mọc từ doanh thu năm 0; các năm sau mọc từ năm trước. Cùng một
    // công thức, khác cái nó trỏ vào - đó là điều cần thấy.
    cells[`${c}15`] = { formula: `=${prev}*(1+$B$3)` };
    cells[`${c}16`] = { formula: `=${c}15*$B$4` };
    cells[`${c}17`] = { formula: `=${c}16*(1-$B$5)` };
    cells[`${c}18`] = { formula: `=${c}15*$B$6` };
    cells[`${c}19`] = { formula: `=${c}15*$B$7` };
    cells[`${c}20`] = { formula: `=${c}15*$B$8` };
    cells[`${c}21`] = { formula: `=${c}17+${c}18-${c}19-${c}20` };
    // Hệ số chiết khấu viết hẳn ra thay vì gọi NPV(): số mũ chính là bài học,
    // và một hàm NPV() sẽ ẩn đúng chỗ cần nhìn.
    cells[`${c}22`] = { formula: `=1/(1+$B$9)^${c}14` };
    cells[`${c}23`] = { formula: `=${c}21*${c}22` };
  }

  cells.B25 = { formula: "=SUM(B23:F23)" };
  // Chốt g < WACC ngay trong công thức. Nếu không có IF này thì g > WACC cho ra
  // một MẪU SỐ ÂM, tức một giá trị cuối kỳ âm và một mức giá mỗi cổ phần âm -
  // một con số trông tự tin và hoàn toàn vô nghĩa. Chỉ đúng lúc g = WACC mới tự
  // ra #DIV/0!, nên nửa vùng nguy hiểm sẽ lặng lẽ trả về số nếu để nguyên.
  // Gordon growth chỉ có nghĩa khi g < r; ngoài đó là mô hình hết hiệu lực, và
  // #N/A nói đúng điều đó.
  cells.B26 = { formula: "=IF($B$10>=$B$9, NA(), F21*(1+$B$10)/($B$9-$B$10))" };
  cells.B27 = { formula: "=B26*F22" };
  cells.B28 = { formula: "=B25+B27" };
  cells.B29 = { formula: "=B28-$B$11" };
  cells.B30 = { formula: "=B29/$B$12" };
  return cells;
}

const DCF_MODEL: ValuationModel = {
  id: "dcf",
  columns: ["A", "B", "C", "D", "E", "F"],
  outputRef: "B30",
  sensitivity: { rowRef: "B9", colRef: "B10", steps: 5, step: 0.01 },
  rows: [
    { labelKey: "assumptionsHeader", kind: "section" },
    { labelKey: "revenueBase", kind: "assumption", refs: ["B2"], unit: "money" },
    { labelKey: "revenueGrowth", kind: "assumption", refs: ["B3"], unit: "percent" },
    { labelKey: "ebitMargin", kind: "assumption", refs: ["B4"], unit: "percent" },
    { labelKey: "taxRate", kind: "assumption", refs: ["B5"], unit: "percent" },
    { labelKey: "daPercent", kind: "assumption", refs: ["B6"], unit: "percent" },
    { labelKey: "capexPercent", kind: "assumption", refs: ["B7"], unit: "percent" },
    { labelKey: "nwcPercent", kind: "assumption", refs: ["B8"], unit: "percent" },
    { labelKey: "wacc", kind: "assumption", refs: ["B9"], unit: "percent" },
    { labelKey: "terminalGrowth", kind: "assumption", refs: ["B10"], unit: "percent" },
    { labelKey: "netDebt", kind: "assumption", refs: ["B11"], unit: "money" },
    { labelKey: "shares", kind: "assumption", refs: ["B12"], unit: "plain" },
    { labelKey: "spacer1", kind: "spacer" },
    { labelKey: "projectionHeader", kind: "section" },
    { labelKey: "year", kind: "formula", refs: ["B14", "C14", "D14", "E14", "F14"], unit: "plain" },
    { labelKey: "revenue", kind: "formula", refs: ["B15", "C15", "D15", "E15", "F15"], unit: "money" },
    { labelKey: "ebit", kind: "formula", refs: ["B16", "C16", "D16", "E16", "F16"], unit: "money" },
    { labelKey: "nopat", kind: "formula", refs: ["B17", "C17", "D17", "E17", "F17"], unit: "money" },
    { labelKey: "depreciation", kind: "formula", refs: ["B18", "C18", "D18", "E18", "F18"], unit: "money" },
    { labelKey: "capex", kind: "formula", refs: ["B19", "C19", "D19", "E19", "F19"], unit: "money" },
    { labelKey: "nwcChange", kind: "formula", refs: ["B20", "C20", "D20", "E20", "F20"], unit: "money" },
    { labelKey: "fcf", kind: "formula", refs: ["B21", "C21", "D21", "E21", "F21"], unit: "money", emphasis: true },
    { labelKey: "discountFactor", kind: "formula", refs: ["B22", "C22", "D22", "E22", "F22"], unit: "multiple" },
    { labelKey: "pvFcf", kind: "formula", refs: ["B23", "C23", "D23", "E23", "F23"], unit: "money" },
    { labelKey: "spacer2", kind: "spacer" },
    { labelKey: "valuationHeader", kind: "section" },
    { labelKey: "sumPvFcf", kind: "formula", refs: ["B25"], unit: "money" },
    { labelKey: "terminalValue", kind: "formula", refs: ["B26"], unit: "money" },
    { labelKey: "pvTerminalValue", kind: "formula", refs: ["B27"], unit: "money" },
    { labelKey: "enterpriseValue", kind: "formula", refs: ["B28"], unit: "money", emphasis: true },
    { labelKey: "equityValue", kind: "formula", refs: ["B29"], unit: "money", emphasis: true },
    { labelKey: "valuePerShare", kind: "formula", refs: ["B30"], unit: "money", emphasis: true },
  ],
  cells: dcfCells(),
};

/* ------------------------------------------------------------------ *
 * Định giá so sánh: trung vị bội số của nhóm ngang hàng
 * ------------------------------------------------------------------ */

const COMPS_MODEL: ValuationModel = {
  id: "comps",
  columns: ["A", "B", "C", "D"],
  outputRef: "B18",
  rows: [
    { labelKey: "peersHeader", kind: "section" },
    { labelKey: "peerColumns", kind: "formula", refs: [], unit: "plain" },
    { labelKey: "peer1", kind: "assumption", refs: ["B4", "C4", "D4"], unit: "plain" },
    { labelKey: "peer2", kind: "assumption", refs: ["B5", "C5", "D5"], unit: "plain" },
    { labelKey: "peer3", kind: "assumption", refs: ["B6", "C6", "D6"], unit: "plain" },
    { labelKey: "peer4", kind: "assumption", refs: ["B7", "C7", "D7"], unit: "plain" },
    { labelKey: "peerMedian", kind: "formula", refs: ["B8", "C8"], unit: "multiple", emphasis: true },
    { labelKey: "spacer1", kind: "spacer" },
    { labelKey: "targetHeader", kind: "section" },
    { labelKey: "targetEbitda", kind: "assumption", refs: ["B11"], unit: "money" },
    { labelKey: "targetEarnings", kind: "assumption", refs: ["B12"], unit: "money" },
    { labelKey: "targetNetDebt", kind: "assumption", refs: ["B13"], unit: "money" },
    { labelKey: "spacer2", kind: "spacer" },
    { labelKey: "impliedHeader", kind: "section" },
    { labelKey: "impliedEv", kind: "formula", refs: ["B16"], unit: "money" },
    { labelKey: "impliedEquityFromEv", kind: "formula", refs: ["B17"], unit: "money", emphasis: true },
    { labelKey: "impliedEquityFromPe", kind: "formula", refs: ["B18"], unit: "money", emphasis: true },
    { labelKey: "impliedGap", kind: "formula", refs: ["B19"], unit: "percent" },
  ],
  cells: {
    // Bội số của bốn công ty ngang hàng: EV/EBITDA, P/E, và EBITDA để người
    // học thấy quy mô. Cột D là dữ liệu tham chiếu, không vào công thức.
    B4: { value: 8.5 },
    C4: { value: 14 },
    D4: { value: 120 },
    B5: { value: 9.2 },
    C5: { value: 16.5 },
    D5: { value: 210 },
    B6: { value: 7.4 },
    C6: { value: 12.8 },
    D6: { value: 95 },
    B7: { value: 11.1 },
    C7: { value: 19.2 },
    D7: { value: 340 },
    // Trung vị, không phải trung bình: một công ty ngang hàng bị định giá quá
    // cao sẽ kéo trung bình đi, và MEDIAN là điều nhà phân tích thực sự dùng.
    B8: { formula: "=MEDIAN(B4:B7)" },
    C8: { formula: "=MEDIAN(C4:C7)" },
    B11: { value: 150 },
    B12: { value: 72 },
    B13: { value: 250 },
    B16: { formula: "=B8*$B$11" },
    B17: { formula: "=B16-$B$13" },
    B18: { formula: "=C8*$B$12" },
    // Hai lối đi ra hai con số khác nhau, và khoảng cách đó chính là bài học.
    B19: { formula: "=(B18-B17)/B17" },
  },
};

export const VALUATION_MODELS: Record<string, ValuationModel> = {
  dcf: DCF_MODEL,
  comps: COMPS_MODEL,
};

export type ValuationModelId = keyof typeof VALUATION_MODELS;

/* ------------------------------------------------------------------ *
 * Tính toán
 * ------------------------------------------------------------------ */

/** Sheet của mô hình sau khi áp các giả định người dùng sửa.
 *
 *  Giá trị rỗng thì trả về ô gốc chứ không xoá: xoá một giả định làm mọi công
 *  thức phụ thuộc thành 0 một cách âm thầm, và một mô hình không có WACC thì
 *  chia cho 0 chứ không phải "chưa nhập".
 */
export function sheetWithInputs(model: ValuationModel, inputs: Record<string, string>): Sheet {
  const out: Sheet = { ...model.cells };
  for (const [ref, raw] of Object.entries(inputs)) {
    const text = raw.trim();
    if (text === "") continue;
    if (text.startsWith("=")) {
      out[ref] = { formula: text };
      continue;
    }
    const num = Number(text.replace(/\s|,/g, ""));
    out[ref] = Number.isNaN(num) ? { value: text } : { value: num };
  }
  return out;
}

/** Giá trị một ô, hoặc null nếu ô lỗi. Dùng cho mọi chỗ hiển thị số. */
export function numericValue(sheet: Sheet, ref: string): number | null {
  const v: CellValue = evaluateCell(sheet, ref);
  if (isError(v) || typeof v !== "number" || !Number.isFinite(v)) return null;
  return v;
}

/** Dãy giá trị quanh mức hiện tại, dùng cho hai trục của bảng độ nhạy. */
export function sensitivityAxis(centre: number, steps: number, step: number): number[] {
  const half = Math.floor(steps / 2);
  const out: number[] = [];
  for (let i = -half; i <= half; i += 1) out.push(centre + i * step);
  return out;
}

/** Bảng độ nhạy hai chiều - "data table" của Excel.
 *
 *  Đây là thứ máy tính có slider không làm được: nó cho thấy kết quả nhạy với
 *  giả định NÀO. Với DCF thì mức chênh giữa góc trên-trái và góc dưới-phải
 *  thường lớn hơn cả giá trị trung tâm, và đó là điều đáng dạy nhất về DCF.
 *
 *  Ô nào lỗi thì trả null - hay gặp nhất là khi g >= WACC, lúc Gordon growth
 *  chia cho số âm hoặc cho 0. Null ở đó là ĐÚNG: nó không phải giá trị lớn, nó
 *  là mô hình hết hiệu lực.
 */
export function sensitivityGrid(
  model: ValuationModel,
  inputs: Record<string, string>,
  rowValues: number[],
  colValues: number[]
): (number | null)[][] {
  const s = model.sensitivity;
  if (!s) return [];
  return rowValues.map((rowValue) =>
    colValues.map((colValue) => {
      const sheet = sheetWithInputs(model, {
        ...inputs,
        [s.rowRef]: String(rowValue),
        [s.colRef]: String(colValue),
      });
      return numericValue(sheet, model.outputRef);
    })
  );
}

/** Công thức thô của một ô, để UI hiện ra khi chọn ô đó. */
export function formulaOf(sheet: Sheet, ref: string): string | null {
  const cell = sheet[ref];
  if (!cell) return null;
  if (cell.formula) return cell.formula;
  return cell.value === undefined ? null : String(cell.value);
}

/** Mọi ô người dùng được sửa, theo thứ tự xuất hiện trên lưới. */
export function assumptionRefs(model: ValuationModel): string[] {
  return model.rows
    .filter((r) => r.kind === "assumption")
    .flatMap((r) => r.refs ?? []);
}
