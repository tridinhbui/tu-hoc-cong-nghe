// Đo tell trong ngân hàng thi level bằng TỶ LỆ so với độ dài trung bình,
// không phải bằng "có phải dài nhất không".
//
// Chỉ số nhị phân (đáp án đúng có phải option dài nhất) đánh giá sai khi bốn
// lựa chọn nằm trong dải hẹp: với 62/62/62/63 ký tự thì luôn có một cái là
// max và một cái là min, nhưng chênh 1 ký tự không phải manh mối ai khai thác
// được. Tỷ lệ correct/mean mới phản ánh mức độ lệch thật - đây cũng là thước
// đo `avg ratio` mà scripts/audit-lesson-content.mjs dùng cho lesson quiz.
//
//   node scratch/lvl-ratio.mjs            # tất cả level
//   node scratch/lvl-ratio.mjs 6,7 show   # kèm chi tiết câu lệch >15%
import ts from "typescript";
import { readFileSync } from "fs";

const src = readFileSync("lib/level-exams.ts", "utf8");
const js = ts.transpileModule(
  src.replace(/^import .*$/gm, "").replace(/export /g, ""),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }
).outputText;
const mod = {};
new Function("exports", js + ";exports.E=LEVEL_EXAMS;")(mod);

const only = process.argv[2] ? process.argv[2].split(",").map(Number) : null;
const show = process.argv[3] === "show";

let totalQ = 0, totalRatio = 0, totalBad = 0;
for (const key of Object.keys(mod.E)) {
  if (only && !only.includes(Number(key))) continue;
  const config = mod.E[key];
  let sum = 0, bad = 0;
  config.questions.forEach((q, i) => {
    const lens = q.options.map((o) => o.length);
    const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
    const ratio = lens[q.correctIndex] / mean;
    sum += ratio;
    if (Math.abs(ratio - 1) > 0.15) {
      bad++;
      if (show) {
        const others = lens.filter((_, j) => j !== q.correctIndex).join(",");
        console.log(`  L${key} q${i + 1} ratio=${ratio.toFixed(2)} correct=${lens[q.correctIndex]} others=${others}`);
        console.log(`     "${q.options[q.correctIndex].slice(0, 74)}"`);
      }
    }
  });
  totalQ += config.questions.length;
  totalRatio += sum;
  totalBad += bad;
  console.log(
    `L${key}`.padEnd(4),
    String(config.questions.length).padStart(3) + "c",
    "| ratio TB " + (sum / config.questions.length).toFixed(2),
    "| lệch >15%: " + bad + "/" + config.questions.length
  );
}
console.log(
  "TỔNG", totalQ, "câu | ratio TB", (totalRatio / totalQ).toFixed(2),
  "| lệch rõ", totalBad, "(" + Math.round((totalBad / totalQ) * 100) + "%)"
);
