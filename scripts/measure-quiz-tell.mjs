// Đo mẹo độ dài của một nhóm bài: node scripts/measure-quiz-tell.mjs 1816 1817 ...
// In, cho từng bài và tổng, tỉ lệ câu mà đáp án đúng là phương án DUY NHẤT
// dài nhất / ngắn nhất. Chỉ in, luôn thoát 0. Chỉ số tổng thể của
// audit:lessons che mất một lô nhỏ lệch (lô 20 bài chặng 25-29 từng đứng ở
// "ngắn nhất" 56% trong khi audit vẫn xanh).
import { readFileSync } from "fs";
const dir = new URL("../lib/lessons-data/", import.meta.url);
const index = JSON.parse(readFileSync(new URL("_index.json", dir), "utf8"));
const ids = process.argv.slice(2).map(Number);
let T = 0, L = 0, S = 0;
for (const id of ids) {
  const slug = index.find((l) => l.id === id)?.slug;
  if (!slug) { console.log(id, "không có trong index"); continue; }
  const lesson = JSON.parse(readFileSync(new URL(`${slug}.json`, dir), "utf8"));
  let t = 0, l = 0, s = 0;
  for (const q of lesson.quiz) {
    const len = q.options.map((o) => o.length), c = len[q.correct];
    t++;
    if (c === Math.max(...len) && len.filter((x) => x === c).length === 1) l++;
    if (c === Math.min(...len) && len.filter((x) => x === c).length === 1) s++;
  }
  T += t; L += l; S += s;
  console.log(id, `${t} câu · dài nhất ${l} · ngắn nhất ${s}`);
}
console.log(`TỔNG ${T} câu · dài nhất ${((100 * L) / T).toFixed(0)}% · ngắn nhất ${((100 * S) / T).toFixed(0)}%  (đích: mỗi bên 20-30%)`);
