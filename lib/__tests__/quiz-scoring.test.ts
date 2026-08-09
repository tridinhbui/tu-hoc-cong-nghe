import { describe, it, expect } from "vitest";
import { firstAttemptResults, firstAttemptScore } from "../quiz-scoring";

describe("chấm điểm trên lần trả lời đầu", () => {
  it("bỏ qua kết quả sau khi thử lại", () => {
    // Sai câu 0 và 2, thử lại tới khi đúng hết: hiện tại 5/5, ghi nhận 3/5.
    const results = [true, true, true, true, true];
    const first = [false, true, false, true, true];
    expect(firstAttemptScore(results, first)).toBe(3);
  });

  it("người làm đúng hết ngay lần đầu không bị trừ gì", () => {
    const results = [true, true, true];
    expect(firstAttemptScore(results, [true, true, true])).toBe(3);
  });

  it("câu chưa có bản ghi lần đầu rơi về kết quả hiện tại", () => {
    // Bản ghi cũ trong localStorage, hoặc bài đã hoàn thành ở máy khác.
    const results = [true, false, true];
    expect(firstAttemptScore(results, [null, undefined, null])).toBe(2);
  });

  it("phân biệt được null với false", () => {
    // Đây là chỗ dễ hỏng nhất: `firstResults[i] || r` sẽ biến một câu SAI ở
    // lần đầu thành "chưa có bản ghi" rồi lấy kết quả sau thử lại - tức là
    // đúng cái lỗ hổng vừa bịt, quay lại qua một toán tử.
    expect(firstAttemptResults([true], [false])).toEqual([false]);
    expect(firstAttemptResults([true], [null])).toEqual([true]);
  });

  it("giữ nguyên độ dài mảng để chỉ số câu không lệch", () => {
    const results = [true, false, true, false];
    expect(firstAttemptResults(results, [false, null, null, true])).toHaveLength(4);
  });

  it("quiz rỗng cho 0 chứ không phải NaN", () => {
    expect(firstAttemptScore([], [])).toBe(0);
  });
});
