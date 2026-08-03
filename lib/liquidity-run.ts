/**
 * Số ngày một tổ chức còn trả được tiền ra, cho widget rủi ro thanh khoản.
 *
 * Tách khỏi component để kiểm được, vì cái đáng kiểm ở đây không phải một con
 * số cụ thể mà là các quan hệ: căng thẳng tăng thì ngày sống sót phải giảm,
 * đệm dày hơn thì phải tăng, và haircut phải thực sự ăn vào lượng tiền huy
 * động được. Sai một trong ba thì widget vẫn chạy mượt và dạy ngược.
 */

/**
 * @param buffer      tiền mặt sẵn có
 * @param pledgeable  tài sản có thể đem cầm cố
 * @param dailyOutflow tiền phải trả ra mỗi ngày
 * @param baseHaircut haircut lúc thị trường bình thường, %
 * @param stress      mức căng thẳng, 0 = bình thường
 * @returns số ngày trụ được, tối đa 60
 */
export function survivalDays(
  buffer: number,
  pledgeable: number,
  dailyOutflow: number,
  baseHaircut: number,
  stress: number
): number {
  if (dailyOutflow <= 0) return 999;
  let cash = buffer;
  let assets = pledgeable;
  for (let day = 1; day <= 60; day++) {
    let need = dailyOutflow;
    const take = Math.min(cash, need);
    cash -= take;
    need -= take;
    if (need > 0) {
      // Haircut giãn theo mức căng thẳng VÀ theo số ngày đã trôi: căng thẳng
      // kéo dài thì bên cho vay siết thêm, không giữ nguyên điều kiện ngày đầu.
      const h = Math.min(0.95, (baseHaircut / 100) * (1 + (stress / 100) * (1 + day / 20)));
      const raised = assets * (1 - h);
      if (raised < need) return day;
      // Cầm cố đúng lượng tài sản cần để ra đủ tiền.
      assets -= need / (1 - h);
      need = 0;
    }
  }
  return 60;
}
