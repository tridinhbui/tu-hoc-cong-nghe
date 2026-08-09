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

import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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

/** Số thuần, không nhãn - nhãn hiển thị đến từ `assetsOf(t)`. Test và các nơi
 *  chỉ cần ret/vol dùng thẳng hằng số này. */
/* i18n-ignore-start: `label` ở đây KHÔNG hiện ra. PortfolioRiskPanel che hai hằng số này bằng
   `assetsOf(t)` ngay dòng đầu, nên chỗ dựng màn hình đọc nhãn từ
   t.districtContent.portfolioRisk; CivicScenes chỉ dùng `.vol`. Giữ nhãn ở
   đây để test và những nơi chỉ cần ret/vol đọc thẳng hằng số */
/* i18n-ignore-start: `label` ở đây là giá trị mặc định KHÔNG BAO GIỜ hiển thị.
   PortfolioRiskPanel đổ bóng hai hằng số này bằng assetsOf(t) ngay khi vào
   component, nên chữ người dùng thấy luôn đến từ t.districtContent.portfolioRisk.
   Giữ nhãn ở đây để test và các nơi chỉ cần ret/vol dùng thẳng được hằng số mà
   không phải dựng từ điển. */
/* i18n-ignore-start: `label` chỉ là bản dự phòng - nhãn hiển thị đến từ
   `assetsOf(t)` ngay dưới, đọc `t.districtContent.portfolioRisk`. Chú thích
   ngay trên hai hằng số này đã nói vậy từ trước. */
export const STOCKS: Asset = { label: "Cổ phiếu", ret: 0.12, vol: 0.2 };
export const BONDS: Asset = { label: "Trái phiếu", ret: 0.05, vol: 0.07 };
/* i18n-ignore-end */
/* i18n-ignore-end */
/* i18n-ignore-end */

/** STOCKS/BONDS kèm nhãn theo ngôn ngữ hiện tại của
 *  `t.districtContent.portfolioRisk`. */
export function assetsOf(t: Dictionary): { stocks: Asset; bonds: Asset } {
  const copy = t.districtContent.portfolioRisk;
  return {
    stocks: { ...STOCKS, label: copy.stocksLabel },
    bonds: { ...BONDS, label: copy.bondsLabel },
  };
}

export interface RhoCase {
  id: string;
  rho: number;
  label: string;
  /** Câu hỏi hỏi TRƯỚC khi cho xem đáp số. */
  question: string;
  meaning: string;
}

/** Phần CẤU TRÚC của bốn mức tương quan: id và ρ, cố ý đi từ "cho không nhiều
 *  nhất" tới "không cho gì". Chữ hiển thị sống trong district-content.ts. */
const RHO_DEFS: { id: string; rho: number }[] = [
  { id: "am", rho: -0.5 },
  { id: "khong", rho: 0 },
  { id: "cung-yeu", rho: 0.5 },
  { id: "khit", rho: 1 },
];

/** Chỉ id + ρ, dùng khi không cần chữ hiển thị. */
export const RHO_CASE_DEFS: { id: string; rho: number }[] = RHO_DEFS;

/** Bốn mức tương quan, kèm chữ hiển thị theo ngôn ngữ hiện tại của
 *  `t.districtContent.portfolioRisk.rhoCases`. */
export function rhoCasesOf(t: Dictionary): RhoCase[] {
  const copy = t.districtContent.portfolioRisk.rhoCases;
  return RHO_DEFS.map(({ id, rho }) => {
    const c = copy[id as keyof typeof copy];
    return { id, rho, label: c.label, question: c.question, meaning: c.meaning };
  });
}

/** Điều phải mang về, và nó phụ thuộc vào ρ chứ không phải vào tài sản. */
export function verdictFor(rho: number, t: Dictionary): string {
  const copy = t.districtContent.portfolioRisk;
  if (rho >= 1) return copy.verdictNoGain;
  return copy.verdictGain;
}
