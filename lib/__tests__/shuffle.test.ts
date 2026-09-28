import { describe, expect, it } from "vitest";
import { shuffle } from "../shuffle";

/** Nguồn ngẫu nhiên ghim sẵn: trả lần lượt các số đã cho, rồi lặp lại. */
function seq(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length];
}

describe("xáo trộn", () => {
  it("giữ nguyên tập phần tử", () => {
    const input = [1, 2, 3, 4, 5];
    expect([...shuffle(input, seq(0.1, 0.9, 0.5, 0.3))].sort()).toEqual(input);
  });

  it("không sửa mảng gốc", () => {
    const input = [1, 2, 3];
    shuffle(input, seq(0.5));
    expect(input).toEqual([1, 2, 3]);
  });

  it("phân phối đều - thứ khác hẳn sort(() => Math.random() - 0.5)", () => {
    // Với 3 phần tử, mỗi vị trí phải nhận mỗi phần tử ở khoảng 1/3 số lần.
    // Cách xáo bằng sort cho phân phối lệch rõ rệt ở phép kiểm này.
    const counts = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    let seed = 12345;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const N = 6000;
    for (let i = 0; i < N; i++) {
      const out = shuffle([0, 1, 2], rand);
      out.forEach((value, pos) => counts[pos][value]++);
    }
    for (const row of counts) {
      for (const c of row) {
        expect(Math.abs(c / N - 1 / 3)).toBeLessThan(0.05);
      }
    }
  });
});
