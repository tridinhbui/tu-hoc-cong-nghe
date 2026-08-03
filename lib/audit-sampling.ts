/**
 * Toán của việc chọn mẫu trong kiểm toán và kiểm soát nội bộ.
 *
 * Tách khỏi component vì đây là chỗ trực giác sai một cách có hệ thống: kiểm
 * 25 hồ sơ không thấy lỗi nào KHÔNG có nghĩa là không có lỗi, và cũng không
 * có nghĩa là tỷ lệ lỗi thấp. Nó chỉ có nghĩa là tỷ lệ lỗi khó vượt quá một
 * ngưỡng - và ngưỡng đó cao hơn nhiều so với cảm giác của phần lớn người mới.
 *
 * Con số cụ thể kiểm được bằng những kết quả đã biết, nên chúng nằm ở đây chứ
 * không nằm trong JSX.
 */

/** Xác suất mẫu n bắt được ÍT NHẤT một lỗi, khi tỷ lệ lỗi thật là p.
 *
 *  1 − (1−p)^n. Đây là công thức nói vì sao mẫu nhỏ bỏ sót lỗi hiếm: với tỷ lệ
 *  lỗi 2%, mẫu 25 chỉ bắt được khoảng 40% số lần. */
export function detectionProbability(sampleSize: number, errorRate: number): number {
  if (sampleSize <= 0) return 0;
  const p = Math.min(1, Math.max(0, errorRate));
  return 1 - Math.pow(1 - p, sampleSize);
}

/**
 * Cận trên của tỷ lệ lỗi khi kiểm n mẫu và KHÔNG thấy lỗi nào, ở mức tin cậy
 * cho trước.
 *
 * Nghiệm của (1−p)^n = 1 − confidence, tức p = 1 − (1−confidence)^(1/n). Ở mức
 * 95% nó xấp xỉ 3/n - "quy tắc số ba" mà kiểm toán viên dùng để nhẩm.
 */
export function zeroErrorUpperBound(sampleSize: number, confidence = 0.95): number {
  if (sampleSize <= 0) return 1;
  return 1 - Math.pow(1 - confidence, 1 / sampleSize);
}

/**
 * Cỡ mẫu nhỏ nhất để, nếu không thấy lỗi nào, kết luận được tỷ lệ lỗi dưới
 * `tolerable` ở mức tin cậy cho trước.
 */
export function requiredSampleSize(tolerable: number, confidence = 0.95): number {
  const p = Math.min(0.999, Math.max(0.0001, tolerable));
  return Math.ceil(Math.log(1 - confidence) / Math.log(1 - p));
}

/**
 * Rủi ro còn lại sau khi đã có kiểm soát và đã kiểm mẫu.
 *
 * Ba tầng nhân nhau - đó là ý nghĩa của "ba tuyến phòng vệ": mỗi tuyến không
 * cần hoàn hảo, nhưng tích của những xác suất lọt qua mới là con số cuối cùng.
 * Ngược lại, ba tuyến cùng yếu thì tích của chúng vẫn lớn một cách đáng ngạc
 * nhiên - 50% × 50% × 50% vẫn còn 12,5% lọt lưới.
 */
export function residualRisk(
  inherentRate: number,
  controlEffectiveness: number,
  detectionRate: number
): number {
  const miss = (x: number) => 1 - Math.min(1, Math.max(0, x));
  return Math.min(1, Math.max(0, inherentRate)) * miss(controlEffectiveness) * miss(detectionRate);
}
