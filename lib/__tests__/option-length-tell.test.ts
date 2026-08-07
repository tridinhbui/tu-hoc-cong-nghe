import { describe, expect, it } from "vitest";
import { findCorrectAnswerLengthTell } from "@/lib/option-length-tell";

/** Bộ dò này gác đường ghi của một kho quiz nằm trong cơ sở dữ liệu chứ không
 *  nằm trong repo, nên không có bộ kiểm nào chạy sau nó để bắt lỗi. Nó phải
 *  đúng ngay tại đây.
 *
 *  Nửa số bài dưới đây kiểm chuyện nó KHÔNG kêu. Đó là phần quan trọng hơn:
 *  một cổng kêu oan là một cổng người ta học cách bỏ qua, và cảnh báo này hiện
 *  ra ngay lúc ai đó đang gõ. */

const A = (n: number) => "x".repeat(n);

describe("kêu đúng lúc", () => {
  it("đáp án đúng dài vượt hẳn hai phương án còn lại", () => {
    // 90 so với trung bình 50 - đúng hình dạng đã làm hỏng 91% kho bài học.
    const tell = findCorrectAnswerLengthTell([A(90), A(30), A(30)], 0);
    expect(tell).toEqual({ index: 0, length: 90, mean: 50 });
  });

  it("kêu bất kể đáp án đúng nằm ở vị trí nào", () => {
    expect(findCorrectAnswerLengthTell([A(30), A(30), A(90)], 2)).not.toBeNull();
  });

  it("kêu với câu bốn phương án cũng như câu ba phương án", () => {
    expect(findCorrectAnswerLengthTell([A(20), A(20), A(20), A(80)], 3)).not.toBeNull();
  });

  it("đo sau khi cắt khoảng trắng thừa hai đầu", () => {
    expect(findCorrectAnswerLengthTell([`   ${A(90)}   `, A(30), A(30)], 0)).not.toBeNull();
  });
});

describe("im lặng khi không phải mách nước", () => {
  it("đáp án đúng dài nhất nhưng cả ba vẫn sát nhau", () => {
    // 52 so với trung bình 50,7 - dài nhất, nhưng không ai nhìn ra được điều đó.
    // Đây là trường hợp một bộ dò rộng tay sẽ kêu và làm hỏng chính nó.
    expect(findCorrectAnswerLengthTell([A(52), A(50), A(51)], 0)).toBeNull();
  });

  it("phương án dài nhất là một phương án nhiễu", () => {
    // Hình dạng bình thường của câu hỏi viết đúng luật 1 và luật 3.
    expect(findCorrectAnswerLengthTell([A(40), A(95), A(40)], 0)).toBeNull();
  });

  it("hai phương án dài bằng nhau thì không có mách nước nào", () => {
    // Không có phương án dài nhất DUY NHẤT để nhắm vào - cùng quy ước với kỳ
    // vọng có tính tới hoà trong các cổng z của repo.
    expect(findCorrectAnswerLengthTell([A(90), A(90), A(30)], 0)).toBeNull();
  });

  it("câu chưa gõ xong thì chưa nói gì", () => {
    // Người soạn đang gõ phương án đầu tiên: hai ô còn trống không phải lỗi.
    expect(findCorrectAnswerLengthTell([A(90), "", ""], 0)).toBeNull();
    expect(findCorrectAnswerLengthTell([A(90), "   ", A(30)], 0)).toBeNull();
  });

  it("chỉ số đáp án đúng không hợp lệ thì không đoán bừa", () => {
    for (const bad of [-1, 3, 1.5, Number.NaN]) {
      expect(findCorrectAnswerLengthTell([A(90), A(30), A(30)], bad)).toBeNull();
    }
  });

  it("dưới hai phương án thì không có gì để so", () => {
    expect(findCorrectAnswerLengthTell([A(90)], 0)).toBeNull();
    expect(findCorrectAnswerLengthTell([], 0)).toBeNull();
  });
});

describe("ranh giới của dải ±20%", () => {
  it("đúng bằng mép dải thì chưa kêu", () => {
    // Trung bình 50, mép trên 60. Đúng 60 là chưa vượt.
    expect(findCorrectAnswerLengthTell([A(60), A(45), A(45)], 0)).toBeNull();
  });

  it("vượt mép một ký tự thì kêu", () => {
    // Trung bình 50,33; mép trên 60,4. 61 vượt.
    expect(findCorrectAnswerLengthTell([A(61), A(45), A(45)], 0)).not.toBeNull();
  });
});
