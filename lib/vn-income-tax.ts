/**
 * Thuế thu nhập cá nhân từ tiền lương, hai biểu thuế.
 *
 * Vì sao tách ra: cả chặng Thuế xoay quanh một hiểu lầm duy nhất - "lên bậc
 * thuế thì bị đánh thuế cao hơn trên toàn bộ thu nhập". Widget nào dạy chuyện
 * đó mà tính sai thì củng cố đúng cái nó định sửa, nên phép tính phải kiểm
 * được bằng những ví dụ đã có sẵn trong bài học.
 *
 * Các mốc và thuế suất lấy đúng từ hai bài trong kho (Chặng Thuế bài 2 và bài
 * 5), không tự đặt: biểu cũ 7 bậc theo mốc 5-10-18-32-52-80 triệu, biểu 2026
 * 5 bậc theo mốc 10-30-60-100 triệu.
 */

export interface Bracket {
  /** Trần của bậc, tính trên thu nhập TÍNH THUẾ mỗi tháng (triệu đồng). */
  upTo: number;
  rate: number;
}

export interface TaxSchedule {
  label: string;
  brackets: Bracket[];
  /** Giảm trừ bản thân, triệu đồng/tháng. */
  selfDeduction: number;
  /** Giảm trừ mỗi người phụ thuộc, triệu đồng/tháng. */
  dependentDeduction: number;
}

/** Biểu 7 bậc áp dụng TRƯỚC kỳ tính thuế 2026.
 *
 *  Tên cũ của hằng số này là SCHEDULE_CURRENT và nhãn là "7 bậc (hiện hành)".
 *  Cả hai đã sai kể từ kỳ tính thuế 2026: giảm trừ gia cảnh lên 15,5 triệu cho
 *  bản thân và 6,2 triệu mỗi người phụ thuộc (NQ 110/2025/UBTVQH15), còn biểu
 *  thuế rút xuống 5 bậc (Điều 9 Luật 109/2025/QH15). Bài
 *  cai-cach-thue-tncn-2026-tu-7-bac-xuong-5-bac trong kho ghi rõ mốc đó.
 *
 *  Hậu quả không nằm ở con số mà ở CÁI NHÃN: widget mặc định mở ở biểu này và
 *  gọi nó là "hiện hành", nên người học tính lương net ra một con số không còn
 *  đúng, và được nói rằng nó đang đúng. Giữ biểu cũ lại để so sánh trước/sau là
 *  đúng - đó là nội dung của bài; gọi nó là hiện hành thì không. */
/* i18n-ignore-start: `label` của hai biểu thuế đã có lớp phủ
   (`t.taxSchedules`), khoá theo id biểu. Mọi thứ còn lại trong hai hằng số này
   là số: ngưỡng bậc và thuế suất. */
export const SCHEDULE_PRE_2026: TaxSchedule = {
  label: "7 bậc (trước 2026)",
  brackets: [
    { upTo: 5, rate: 0.05 },
    { upTo: 10, rate: 0.1 },
    { upTo: 18, rate: 0.15 },
    { upTo: 32, rate: 0.2 },
    { upTo: 52, rate: 0.25 },
    { upTo: 80, rate: 0.3 },
    { upTo: Infinity, rate: 0.35 },
  ],
  selfDeduction: 11,
  dependentDeduction: 4.4,
};

/** Biểu 5 bậc theo Luật 109/2025/QH15, áp dụng từ kỳ tính thuế 2026 - tức biểu
 *  ĐANG có hiệu lực. */
export const SCHEDULE_2026: TaxSchedule = {
  label: "5 bậc (hiện hành)",
  brackets: [
    { upTo: 10, rate: 0.05 },
    { upTo: 30, rate: 0.1 },
    { upTo: 60, rate: 0.2 },
    { upTo: 100, rate: 0.3 },
    { upTo: Infinity, rate: 0.35 },
  ],
  selfDeduction: 15.5,
  dependentDeduction: 6.2,
};

/** BHXH 8% + BHYT 1,5% + BHTN 1%. Mô hình dạy học: bỏ qua trần đóng bảo hiểm,
 *  nên với lương rất cao con số này cao hơn thực tế - widget nói rõ điều đó. */
export const INSURANCE_RATE = 0.105;

export interface Slice {
  rate: number;
  /** Phần thu nhập tính thuế rơi vào bậc này, triệu đồng. */
  amount: number;
  tax: number;
}

export interface TaxResult {
  insurance: number;
  deduction: number;
  taxableIncome: number;
  slices: Slice[];
  tax: number;
  netIncome: number;
  /** Thuế suất của đồng tiếp theo. */
  marginalRate: number;
  /** Thuế chia cho tổng thu nhập gộp. */
  effectiveRate: number;
}

/**
 * @param gross      lương gộp mỗi tháng, triệu đồng
 * @param dependents số người phụ thuộc
 */
export function computeTax(gross: number, dependents: number, schedule: TaxSchedule): TaxResult {
  const g = Math.max(0, gross);
  const insurance = g * INSURANCE_RATE;
  const deduction = schedule.selfDeduction + Math.max(0, dependents) * schedule.dependentDeduction;
  const taxableIncome = Math.max(0, g - insurance - deduction);

  const slices: Slice[] = [];
  let lower = 0;
  let tax = 0;
  let marginalRate = 0;
  for (const b of schedule.brackets) {
    if (taxableIncome <= lower) break;
    const amount = Math.min(taxableIncome, b.upTo) - lower;
    const sliceTax = amount * b.rate;
    slices.push({ rate: b.rate, amount, tax: sliceTax });
    tax += sliceTax;
    marginalRate = b.rate;
    lower = b.upTo;
  }

  return {
    insurance,
    deduction,
    taxableIncome,
    slices,
    tax,
    netIncome: g - insurance - tax,
    marginalRate,
    effectiveRate: g === 0 ? 0 : tax / g,
  };
}

/* i18n-ignore-end */
