/**
 * Sát thương của World Boss - một nguồn duy nhất cho cả giao diện lẫn máy chủ.
 *
 * Vì sao cần file này: trước đó hai bên tính hai kiểu. Giao diện quay ngẫu
 * nhiên 5.000-7.000 mỗi câu đúng và khoe tổng khoảng 75.000-105.000; máy chủ
 * bỏ qua con số đó và tự tính `score * 1000`, tối đa 15.000. Người chơi được
 * báo một con số, thanh máu nhận một con số khác nhỏ hơn năm lần - và đó là
 * khi nó còn nhận được gì, chuyện mà nó chưa từng làm (xem route).
 *
 * Máy chủ PHẢI là bên tính: sát thương do trình duyệt gửi lên thì ai cũng sửa
 * được. Nhưng khi máy chủ đã tính, giao diện không được phép khoe một con số
 * khác - nên hằng số nằm ở đây và cả hai bên cùng đọc.
 */

/** Số câu trong một trận. */
export const BOSS_QUESTION_COUNT = 15;

/** Sát thương cho mỗi câu trả lời đúng. Cố định chứ không ngẫu nhiên: phần
 *  ngẫu nhiên cũ chỉ tồn tại ở giao diện và không bao giờ tới được máy chủ,
 *  nên nó chưa từng là ngẫu nhiên thật - chỉ là một con số đẹp rồi biến mất. */
export const DAMAGE_PER_CORRECT = 6000;

/** Tổng sát thương của một trận, tính từ số câu đúng.
 *
 *  Cắt ngưỡng ở hai đầu: điểm âm hoặc điểm vượt số câu đều là dữ liệu không
 *  đáng tin từ phía client, và ở đây chúng bị chặn chứ không được nhân lên. */
export function bossDamageFor(score: number): number {
  const clean = Math.max(0, Math.min(BOSS_QUESTION_COUNT, Math.floor(Number(score) || 0)));
  return clean * DAMAGE_PER_CORRECT;
}

/** Phần trăm máu còn lại, làm tròn về số nguyên và kẹp trong [0, 100]. */
export function bossHpPercent(currentHp: number, maxHp: number): number {
  if (!Number.isFinite(currentHp) || !Number.isFinite(maxHp) || maxHp <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((currentHp / maxHp) * 100)));
}
