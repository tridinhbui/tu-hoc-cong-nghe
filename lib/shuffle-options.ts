/** Xáo thứ tự phương án của một câu hỏi, trả về vị trí mới của đáp án đúng.
 *
 *  Sửa một lỗi đã đo: kho câu hỏi "thử thách mỗi ngày" để đáp án đúng ở ô
 *  đầu phần lớn các câu, nên bấm A mà không đọc là đúng. Xáo lúc chạy thay vì
 *  soạn lại chỉ số bằng tay, để câu viết thêm sau này cũng được xáo.
 *
 *  `random` nhận qua tham số để bộ kiểm chạy được với nguồn tất định. */
export interface OptionShuffleResult<T> {
  options: T[];
  correctIndex: number;
}

export function shuffleOptionOrder<T>(
  options: readonly T[],
  correctIndex: number,
  random: () => number = Math.random
): OptionShuffleResult<T> {
  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    options: order.map((i) => options[i]),
    correctIndex: order.indexOf(correctIndex),
  };
}
