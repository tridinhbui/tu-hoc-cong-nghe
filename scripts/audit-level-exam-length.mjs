// Đo mẹo "chọn phương án dài nhất" trong đề thi thăng cấp, cho cả hai ngôn ngữ.
//
// Vì sao cần riêng một công cụ: đề thi thăng cấp KHÔNG nằm trong phạm vi của
// scripts/audit-lesson-content.mjs - cái đó chỉ đọc lib/lessons-data. Suốt đời
// hai bộ kiểm này, 380 câu có chấm điểm ở đây chưa từng được đo mẹo độ dài lần
// nào, trong khi điểm của chúng quyết định việc thăng cấp.
//
// Chỉ độ dài mới đáng đo ở đây, và lý do rất cụ thể: getSampledExam() trong
// lib/level-exams.ts gọi shuffleArray() lên chính mảng options trước khi phát,
// nên vị trí không lộ gì cả - correctIndex: 0 ở cả 380 câu là hoàn toàn bình
// thường. Độ dài thì sống sót qua phép xáo.
//
// CHỈ IN, LUÔN THOÁT 0. Đây là bảng đọc trong lúc viết lại một lô, không phải
// cổng. Đặt cổng ở mức kho hiện đạt được thì vô nghĩa (53% ở phía tiếng Anh),
// còn đặt ở mức đúng thì nó đỏ ngay - xem README của lượt đo đầu tiên trong
// AGENTS.md về việc gác một con số mà kho chưa đạt.

import fs from "node:fs";

const FILES = [
  ["lib/level-exams.ts", "vi"],
  ["lib/level-exams-i18n/en.ts", "en"],
];

/** Trả về [{lv, longest, total}] - longest là số câu mà đáp án đúng là phương
 *  án DÀI NHẤT DUY NHẤT. Hoà thì không tính, vì hoà không cho người đoán lợi
 *  thế nào. */
function measure(file) {
  const src = fs.readFileSync(file, "utf8");
  const marks = [...src.matchAll(/(?:id: )?"?(l(\d+)_q\d+)"?:?/g)].map((m) => ({
    lv: Number(m[2]),
    at: m.index,
  }));
  const byLevel = new Map();
  for (let i = 0; i < marks.length; i++) {
    const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
    const block = src.slice(marks[i].at, end);
    const oStart = block.indexOf("options: [");
    const oEnd = block.indexOf("],", oStart);
    if (oStart < 0 || oEnd < 0) continue;
    const lens = [...block.slice(oStart, oEnd).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(
      (m) => m[1].length
    );
    if (lens.length < 4) continue;
    // Phần tử 0 là đáp án đúng: correctIndex là 0 ở mọi câu, và bản dịch giữ
    // đúng thứ tự vì options là positional (xem lib/level-exams-i18n/index.ts).
    const max = Math.max(...lens);
    const uniquelyLongest = lens[0] === max && lens.filter((l) => l === max).length === 1;
    const row = byLevel.get(marks[i].lv) ?? { longest: 0, total: 0 };
    row.total += 1;
    if (uniquelyLongest) row.longest += 1;
    byLevel.set(marks[i].lv, row);
  }
  return byLevel;
}

console.log("Mẹo \"chọn phương án dài nhất\" trong đề thi thăng cấp (may rủi 25%)\n");
for (const [file, tag] of FILES) {
  const byLevel = measure(file);
  let total = 0;
  let longest = 0;
  const parts = [];
  for (const lv of [...byLevel.keys()].sort((a, b) => a - b)) {
    const { longest: l, total: t } = byLevel.get(lv);
    total += t;
    longest += l;
    parts.push(`L${lv}:${Math.round((100 * l) / t)}%`);
  }
  const pct = total ? Math.round((100 * longest) / total) : 0;
  console.log(`${tag}  ${longest}/${total} = ${pct}%   (${file})`);
  console.log(`    ${parts.join("  ")}\n`);
}
console.log(
  "Sửa bằng cách viết DÀI phương án nhiễu, không cắt đáp án đúng - cắt đáp án\n" +
    "đúng chỉ đẩy nó vào giữa nhóm, tức đổi mách nước này lấy mách nước khác.\n" +
    "Và đừng dán cùng một cụm đuôi cho hàng loạt nhiễu: một lô nhiễu cùng kết\n" +
    "thúc bằng \"trong mọi trường hợp\" là một mách nước mới, tệ hơn cái cũ vì\n" +
    "nó tất định."
);
