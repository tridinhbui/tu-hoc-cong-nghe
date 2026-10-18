// Sàn chiều cao của một trang bài ở 390px: bỏ hết chữ giảng thì trang còn cao
// bao nhiêu. Đọc tệp do lesson-heights.mjs in ra (một dòng JSON rồi cây chiều
// cao khối). "Khối cố định" là những khối không phải chữ giảng: câu giữa bài
// (một vế của điều kiện hoàn thành), khối thực hành và khối hình ở mạch chính.
// node lesson-floor.mjs <thư-mục-trước> <thư-mục-sau>
import { readFileSync, readdirSync } from "node:fs";
const FIXED = /^(Dừng & Kiểm tra|BÀI TẬP|TÌNH HUỐNG|TỪNG BƯỚC|SOÁT BẢN NHÁP)/;
const read = (f) => {
  const [head, ...rows] = readFileSync(f, "utf8").trim().split("\n");
  const H = JSON.parse(head).H;
  const body = Math.max(...rows.filter((r) => /^ {2}\d/.test(r)).map((r) => parseInt(r)));
  const prose = rows.filter((r) => /^ {4}\d/.test(r) && !FIXED.test(r.trim().split(" ").slice(1).join(" "))).reduce((s, r) => s + parseInt(r), 0);
  return { H, body, prose };
};
const [before, after] = process.argv.slice(2);
const vh = 844;
console.log("| Bài | Màn hình trước → sau | `sections` (px) | Chữ giảng (px) | Khung ngoài `sections` (px) | Sàn khi bỏ hết chữ giảng |");
console.log("|---|---|---|---|---|---|");
for (const f of readdirSync(after).filter((x) => x.endsWith(".txt"))) {
  const a = read(`${before}/${f}`), b = read(`${after}/${f}`);
  console.log(`| \`${f.replace(/\.txt$/, "")}\` | ${(a.H / vh).toFixed(1)} → **${(b.H / vh).toFixed(1)}** | ${a.body} → ${b.body} | ${a.prose} → ${b.prose} | ${b.H - b.body} | ${((b.H - b.prose) / vh).toFixed(1)} |`);
}
