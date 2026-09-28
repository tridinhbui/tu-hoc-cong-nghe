/**
 * Xáo trộn Fisher-Yates. Thay cho `sort(() => Math.random() - 0.5)`, một cách
 * xáo phổ biến nhưng KHÔNG cho phân phối đều: kết quả so sánh không nhất quán
 * nên thứ tự cuối phụ thuộc vào thuật toán sắp xếp của từng engine, và các vị
 * trí gần đầu mảng có xu hướng ở lại chỗ cũ.
 */
export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
