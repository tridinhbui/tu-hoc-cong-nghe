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

/** Bốn mô hình, cố ý xếp từ tệ nhất tới âm nhất, để thấy DẤU chứ không chỉ
 *  thấy độ lớn. */
export const SCENARIOS: CycleScenario[] = [
  {
    id: "xay-dung",
    label: "Nhà thầu xây dựng",
    inputs: { dso: 120, dio: 45, dpo: 60 },
    question: "Thu tiền sau 120 ngày, trả nhà cung cấp sau 60. Cần sẵn bao nhiêu ngày doanh thu?",
    why:
      "Chủ đầu tư nghiệm thu xong mới trả, và giữ lại một phần bảo hành. Vật tư thì phải mua trước.",
    punchline:
      "105 ngày doanh thu nằm ngoài két. Nhà thầu có lãi trên giấy vẫn phải đi vay để trả lương - và đó là lý do ngành này sống bằng vốn vay.",
  },
  {
    id: "san-xuat",
    label: "Nhà máy sản xuất",
    inputs: { dso: 45, dio: 60, dpo: 40 },
    question: "Hàng nằm kho 60 ngày. Rút kho xuống 30 thì tiền đổi bao nhiêu?",
    why: "Bán buôn cho đại lý nên có công nợ, và phải trữ nguyên liệu để chạy máy liên tục.",
    punchline:
      "Vòng quay 65 ngày. Rút kho từ 60 xuống 30 là kéo nó còn 35 - mỗi ngày rút khỏi kho trả về két đúng một ngày doanh thu. Giảm kho không phải việc của thủ kho, nó là quyết định tài chính.",
  },
  {
    id: "ban-le",
    label: "Chuỗi siêu thị",
    inputs: { dso: 2, dio: 25, dpo: 55 },
    question: "Khách trả tiền ngay, nhà cung cấp đợi 55 ngày. Vòng quay bằng bao nhiêu?",
    why: "Bán lẻ thu tiền mặt tại quầy, còn nhà cung cấp phải chịu công nợ để được lên kệ.",
    punchline:
      "ÂM 28 ngày. Siêu thị cầm tiền của khách gần một tháng trước khi phải trả nhà cung cấp - mở thêm cửa hàng TẠO ra tiền chứ không ngốn tiền.",
  },
  {
    id: "thue-bao",
    label: "Phần mềm thuê bao",
    inputs: { dso: 0, dio: 0, dpo: 30 },
    question: "Thu trước cả năm, không có kho. Vòng quay bằng bao nhiêu?",
    why: "Khách trả trước khi dùng, và sản phẩm là bản sao nên không có hàng tồn.",
    punchline:
      "ÂM 30 ngày, và đó là trước khi tính tiền thu trước cả năm. Tăng trưởng tự nuôi chính nó - lý do mô hình thuê bao được định giá cao hơn.",
  },
];

/** Vòng quay âm là điểm mạnh hay điểm yếu?
 *
 *  Tách thành hàm riêng vì đây chính là câu người học trả lời sai, và câu trả
 *  lời phải khớp với bài 178 trong kho bài học. */
export function verdict(ccc: number): "duoc-tai-tro" | "can-von" | "trung-tinh" {
  if (ccc < 0) return "duoc-tai-tro";
  if (ccc === 0) return "trung-tinh";
  return "can-von";
}
