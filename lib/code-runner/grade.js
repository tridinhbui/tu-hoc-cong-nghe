// Chấm bài tập viết mã theo ĐẦU RA, không theo câu lệnh.
//
// Cùng triết lý với SQL Console (lib/tools/sql): có nhiều cách viết đúng, và
// người mới bị đánh trượt vì dùng `for` thay cho `while` sẽ học được bài học
// sai - rằng lập trình là đoán đúng câu chữ người ra đề nghĩ trong đầu.
//
// Chuẩn hoá đúng hai thứ không ai nhìn thấy được trên màn hình: khoảng trắng
// cuối dòng và dòng trống ở cuối. Không bỏ qua hoa/thường, không bỏ khoảng
// trắng giữa dòng - "Tong: 5" và "Tong:5" là hai đầu ra khác nhau, và phân biệt
// được chúng là một phần của việc học.
//
// Plain .js vì cùng lý do với lib/lesson-reading.js: scripts/verify-exercises.mjs
// chạy bằng node trần và phải chấm bằng ĐÚNG hàm mà giao diện dùng. Hai bản
// chuẩn hoá lệch nhau là một bài tập bộ kiểm cho qua mà người học không qua.

/** @param {string} text */
export function normalizeOutput(text) {
  return String(text)
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

/**
 * @typedef {{ pass: boolean; line?: number; expectedLine?: string; actualLine?: string }} GradeResult
 * `line` là dòng đầu tiên khác nhau, đếm từ 1. `actualLine` undefined nghĩa là
 * đầu ra của người học thiếu hẳn dòng này.
 */

/**
 * @param {string} actual
 * @param {string} expected
 * @returns {GradeResult}
 */
export function gradeOutput(actual, expected) {
  const a = normalizeOutput(actual);
  const e = normalizeOutput(expected);
  if (a === e) return { pass: true };

  const aLines = a === "" ? [] : a.split("\n");
  const eLines = e === "" ? [] : e.split("\n");
  const n = Math.max(aLines.length, eLines.length);
  for (let i = 0; i < n; i++) {
    if (aLines[i] !== eLines[i]) {
      return { pass: false, line: i + 1, expectedLine: eLines[i] ?? "", actualLine: aLines[i] };
    }
  }
  return { pass: false };
}
