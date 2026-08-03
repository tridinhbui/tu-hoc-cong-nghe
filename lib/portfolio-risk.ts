/** Rủi ro của danh mục hai tài sản, ở dạng số thuần.
 *
 *  Hiểu sai mà file này sinh ra để sửa: "trộn một tài sản rủi ro 20% với một
 *  tài sản rủi ro 10% thì được danh mục rủi ro 15%". Sai, và sai theo một
 *  hướng cụ thể - danh mục thật RỦI RO THẤP HƠN trung bình đó, trừ đúng một
 *  trường hợp tương quan bằng 1.
 *
 *  Phần chênh lệch ấy không đến từ việc chọn đúng tài sản. Nó đến từ việc hai
 *  tài sản không cùng xuống một lúc, và nó là thứ duy nhất trong tài chính
 *  được cho không.
 *
 *  Lợi nhuận thì ngược lại: lợi nhuận kỳ vọng của danh mục ĐÚNG BẰNG trung
 *  bình có trọng số. Chính sự bất đối xứng đó - lợi nhuận cộng thẳng, rủi ro
 *  thì không - là toàn bộ bài học.
 *
 *  Không vẽ gì ở đây, giống lib/cash-cycle.ts và lib/three-statement-model.ts:
 *  đây là chỗ duy nhất có thể sai về tài chính nên là chỗ duy nhất có test. */

export interface Asset {
  label: string;
  /** Lợi nhuận kỳ vọng, dạng thập phân (0,12 là 12%). */
  ret: number;
  /** Độ lệch chuẩn, dạng thập phân. */
  vol: number;
}

export interface Mix {
  /** Tỉ trọng tài sản thứ nhất, 0 tới 1. */
  w: number;
  /** Hệ số tương quan, −1 tới 1. */
  rho: number;
}

export interface MixResult {
  /** Lợi nhuận kỳ vọng - đúng bằng trung bình có trọng số, luôn luôn. */
  ret: number;
  /** Độ lệch chuẩn thật của danh mục. */
  vol: number;
  /** Trung bình có trọng số của hai độ lệch chuẩn - con số người học TƯỞNG
   *  là đáp án. Giữ lại để bày cạnh số thật. */
  naiveVol: number;
  /** naiveVol − vol. Dương nghĩa là đa dạng hoá vừa cho không chỗ đó. */
  diversificationGain: number;
}

/** Phương sai danh mục hai tài sản:
 *    σp² = w²σ1² + (1−w)²σ2² + 2·w·(1−w)·ρ·σ1·σ2
 *
 *  Vế thứ ba là chỗ tương quan đi vào. Khi ρ = 1 nó vừa đủ để cả biểu thức
 *  thành bình phương của trung bình có trọng số, và lợi ích đa dạng hoá biến
 *  mất - đó là lý do bài test dưới kiểm riêng trường hợp đó. */
export function mix(a: Asset, b: Asset, { w, rho }: Mix): MixResult {
  const variance =
    w * w * a.vol * a.vol +
    (1 - w) * (1 - w) * b.vol * b.vol +
    2 * w * (1 - w) * rho * a.vol * b.vol;
  const vol = Math.sqrt(Math.max(0, variance));
  const naiveVol = w * a.vol + (1 - w) * b.vol;
  return {
    ret: w * a.ret + (1 - w) * b.ret,
    vol,
    naiveVol,
    diversificationGain: naiveVol - vol,
  };
}

/** Tỉ trọng cho danh mục ít dao động nhất (minimum variance).
 *
 *  Có công thức đóng, không phải dò: đạo hàm phương sai theo w rồi cho bằng 0.
 *  Kẹp vào [0, 1] vì phần dưới 0 nghĩa là bán khống, và một căn phòng dạy
 *  người mới không nên lặng lẽ đề xuất bán khống. */
export function minVarianceWeight(a: Asset, b: Asset, rho: number): number {
  const cov = rho * a.vol * b.vol;
  const denom = a.vol * a.vol + b.vol * b.vol - 2 * cov;
  if (denom === 0) return 0.5;
  return Math.min(1, Math.max(0, (b.vol * b.vol - cov) / denom));
}

export const STOCKS: Asset = { label: "Cổ phiếu", ret: 0.12, vol: 0.2 };
export const BONDS: Asset = { label: "Trái phiếu", ret: 0.05, vol: 0.07 };

export interface RhoCase {
  id: string;
  rho: number;
  label: string;
  /** Câu hỏi hỏi TRƯỚC khi cho xem đáp số. */
  question: string;
  meaning: string;
}

/** Bốn mức tương quan, cố ý đi từ "cho không nhiều nhất" tới "không cho gì". */
export const RHO_CASES: RhoCase[] = [
  {
    id: "am",
    rho: -0.5,
    label: "Ngược chiều (−0,5)",
    question: "Hai tài sản thường đi ngược nhau. Danh mục 50/50 dao động bao nhiêu?",
    meaning:
      "Cái này xuống thì cái kia thường lên. Đây là điều người ta mong đợi ở trái phiếu khi cổ phiếu sập, và là lý do danh mục 60/40 tồn tại.",
  },
  {
    id: "khong",
    rho: 0,
    label: "Không liên quan (0)",
    question: "Hai tài sản không liên quan gì nhau. Rủi ro có xuống dưới trung bình không?",
    meaning:
      "Không cái nào nói gì về cái kia. Ngay cả ở đây - không cần chúng đi ngược nhau - rủi ro vẫn xuống dưới trung bình.",
  },
  {
    id: "cung-yeu",
    rho: 0.5,
    label: "Cùng chiều vừa (0,5)",
    question: "Hai tài sản thường cùng lên cùng xuống. Còn được lợi gì không?",
    meaning:
      "Cùng chiều nhưng chưa khít. Lợi ích nhỏ lại nhưng chưa mất - đây mới là mức thường gặp thật ngoài đời.",
  },
  {
    id: "khit",
    rho: 1,
    label: "Khít hoàn toàn (1)",
    question: "Hai tài sản đi khít nhau từng nhịp. Đa dạng hoá còn cho gì?",
    meaning:
      "Đi khít nhau từng nhịp thì thực ra chỉ là một tài sản mang hai cái tên. Đây là trường hợp DUY NHẤT đa dạng hoá không cho gì cả.",
  },
];

/** Điều phải mang về, và nó phụ thuộc vào ρ chứ không phải vào tài sản. */
export function verdictFor(rho: number): string {
  if (rho >= 1)
    return "Đa dạng hoá không cho gì: hai tài sản khít nhau thì trộn kiểu gì rủi ro cũng đúng bằng trung bình.";
  return "Rủi ro nằm DƯỚI trung bình có trọng số, còn lợi nhuận thì đúng bằng trung bình. Chênh lệch đó là thứ duy nhất trong tài chính được cho không.";
}
