/** Vòng quay tiền mặt, ở dạng số thuần.
 *
 *  Đây là chỗ người mới hiểu sai theo một kiểu rất cụ thể: họ đọc "vòng quay
 *  tiền càng ngắn càng tốt" rồi dừng ở đó. Cái bị bỏ mất là DẤU. Vòng quay có
 *  thể ÂM, và khi nó âm thì khách hàng đang tài trợ cho doanh nghiệp - đó là
 *  toàn bộ mô hình của siêu thị, hàng không giá rẻ và mọi thứ thu tiền trước.
 *
 *  Một bài học trong repo này (bài 178) đã nói vốn lưu động âm là ĐIỂM MẠNH
 *  của bán lẻ và thuê bao. File này phải nhất quán với điều đó, nên các kịch
 *  bản dưới có cả trường hợp âm và nó được gọi là tốt.
 *
 *  Không vẽ gì ở đây. Đây là chỗ duy nhất có thể sai về tài chính, nên nó phải
 *  kiểm được bằng test mà không cần dựng một khung hình 3D nào - đúng cách
 *  lib/three-statement-model.ts làm. */

import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

export interface CycleInputs {
  /** Số ngày trung bình để thu tiền khách (Days Sales Outstanding). */
  dso: number;
  /** Số ngày hàng nằm trong kho (Days Inventory Outstanding). */
  dio: number;
  /** Số ngày trung bình mới trả tiền nhà cung cấp (Days Payables Outstanding). */
  dpo: number;
}

export interface CycleResult {
  /** DSO + DIO − DPO. Âm nghĩa là tiền về trước khi phải chi ra. */
  ccc: number;
  /** Vòng quay hoạt động: từ lúc nhập hàng tới lúc thu được tiền. */
  operatingCycle: number;
  /** Bao nhiêu ngày doanh thu bị kẹt trong vòng quay. Âm là được tài trợ. */
  daysFunded: number;
  /** Số tiền phải có sẵn để nuôi vòng quay, theo doanh thu ngày. */
  workingCapitalNeed: number;
}

/** Doanh thu một ngày, dùng để đổi "ngày" thành "tiền".
 *
 *  Ngày là con số người ta nhớ, nhưng tiền mới là thứ làm doanh nghiệp chết.
 *  Căn phòng bày cả hai cạnh nhau vì đó chính là bước nhảy người học thiếu. */
export function cycle(input: CycleInputs, revenuePerDay = 100): CycleResult {
  const operatingCycle = input.dso + input.dio;
  const ccc = operatingCycle - input.dpo;
  return {
    ccc,
    operatingCycle,
    daysFunded: ccc,
    workingCapitalNeed: ccc * revenuePerDay,
  };
}

export interface CycleScenario {
  id: string;
  /** Tên doanh nghiệp, không tên thật - đây là mô hình, không phải số liệu. */
  label: string;
  inputs: CycleInputs;
  /** Câu hỏi hỏi TRƯỚC khi cho xem đáp số. */
  question: string;
  /** Vì sao mô hình này có vòng quay như vậy. */
  why: string;
  /** Điều phải mang về - thứ khác với "ngắn thì tốt". */
  punchline: string;
}

/** Phần CẤU TRÚC của bốn mô hình: id và các ngày (dso/dio/dpo), cố ý xếp từ tệ
 *  nhất tới âm nhất để thấy DẤU chứ không chỉ thấy độ lớn. Chữ hiển thị
 *  (label/question/why/punchline) sống trong district-content.ts, xem
 *  `scenariosOf`. */
const SCENARIO_INPUTS: { id: string; inputs: CycleInputs }[] = [
  { id: "xay-dung", inputs: { dso: 120, dio: 45, dpo: 60 } },
  { id: "san-xuat", inputs: { dso: 45, dio: 60, dpo: 40 } },
  { id: "ban-le", inputs: { dso: 2, dio: 25, dpo: 55 } },
  { id: "thue-bao", inputs: { dso: 0, dio: 0, dpo: 30 } },
];

/** Chỉ id, dùng khi không cần chữ hiển thị. */
export const SCENARIO_IDS: string[] = SCENARIO_INPUTS.map((s) => s.id);

export function inputsFor(id: string): CycleInputs | undefined {
  return SCENARIO_INPUTS.find((s) => s.id === id)?.inputs;
}

/** Bốn mô hình, kèm chữ hiển thị theo ngôn ngữ hiện tại của
 *  `t.districtContent.cashCycle.scenarios`. */
export function scenariosOf(t: Dictionary): CycleScenario[] {
  const copy = t.districtContent.cashCycle.scenarios;
  return SCENARIO_INPUTS.map(({ id, inputs }) => {
    const c = copy[id as keyof typeof copy];
    return { id, inputs, label: c.label, question: c.question, why: c.why, punchline: c.punchline };
  });
}

/** Vòng quay âm là điểm mạnh hay điểm yếu?
 *
 *  Tách thành hàm riêng vì đây chính là câu người học trả lời sai, và câu trả
 *  lời phải khớp với bài 178 trong kho bài học. */
export function verdict(ccc: number): "duoc-tai-tro" | "can-von" | "trung-tinh" {
  if (ccc < 0) return "duoc-tai-tro";
  if (ccc === 0) return "trung-tinh";
  return "can-von";
}
