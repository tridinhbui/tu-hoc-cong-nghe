/**
 * Định giá trái phiếu trả lãi cố định hàng năm.
 *
 * Tách khỏi components/InteractiveBond.tsx vì con số này đã sai một lần và
 * không ai biết: widget tính `mệnh giá × coupon ÷ lãi suất` - công thức của
 * trái phiếu VĨNH VIỄN - cho một trái phiếu ghi rõ đáo hạn 10 năm, ra 83,3
 * triệu thay vì 92,6. Nó sống được vì nằm trong một component chỉ in ra kết
 * quả, không có gì kiểm và không có gì để đối chiếu.
 *
 * Ở đây thì kiểm được: một trái phiếu có coupon bằng đúng lãi suất thị trường
 * phải có giá bằng mệnh giá, và đó là bài kiểm mà công thức vĩnh viễn cũng qua
 * được - nên bộ kiểm còn phải soát cả mức nhạy cảm theo kỳ hạn, thứ mà công
 * thức kia không hề có.
 */

export interface BondPricing {
  /** Tiền lãi nhận mỗi năm, cùng đơn vị với mệnh giá. */
  coupon: number;
  /** (1 + r)^n. */
  discountFactor: number;
  /** [1 − (1 + r)^−n] ÷ r - hệ số quy đổi một chuỗi khoản đều về hiện tại. */
  annuityFactor: number;
  /** Giá trị hiện tại của toàn bộ các khoản lãi. */
  pvCoupons: number;
  /** Giá trị hiện tại của mệnh giá nhận lại lúc đáo hạn. */
  pvFace: number;
  /** Tổng hai phần trên - giá trái phiếu. */
  price: number;
}

/**
 * @param faceValue   mệnh giá
 * @param couponRate  lãi coupon, tính bằng phần trăm mỗi năm (5 nghĩa là 5%)
 * @param marketRate  lãi suất thị trường, phần trăm mỗi năm
 * @param years       số năm còn lại tới đáo hạn
 */
export function priceBond(
  faceValue: number,
  couponRate: number,
  marketRate: number,
  years: number
): BondPricing {
  const coupon = (faceValue * couponRate) / 100;
  const r = marketRate / 100;
  const discountFactor = Math.pow(1 + r, years);

  // r = 0 làm mẫu số bằng 0. Không xảy ra với thanh trượt hiện tại (1%–12%),
  // nhưng một hằng số bị sửa là đủ để cả widget hiện NaN, và giới hạn khi r → 0
  // có nghĩa rõ ràng: không chiết khấu gì cả, nên hệ số annuity đúng bằng n.
  const annuityFactor = r === 0 ? years : (1 - 1 / discountFactor) / r;

  const pvCoupons = coupon * annuityFactor;
  const pvFace = faceValue / discountFactor;

  return {
    coupon,
    discountFactor,
    annuityFactor,
    pvCoupons,
    pvFace,
    price: pvCoupons + pvFace,
  };
}
