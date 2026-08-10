// Đọc bảng "đáp án đúng nằm ở đâu trong bốn độ dài" cho kho bài học tiếng Anh.
//
//   node scripts/en-middle-bias.mjs                 # tổng theo track
//   node scripts/en-middle-bias.mjs <slug> [<slug>] # từng câu của từng bài
//
// VÌ SAO CÓ TỆP NÀY. audit-lesson-content.mjs đã gác cả ba chiều, nhưng nó in
// z-score cho cả kho - đủ để biết có lệch, không đủ để biết SỬA CÂU NÀO. Đây là
// bản đọc theo bài lúc đang viết lại một lô, không phải cổng: nó luôn thoát 0.
//
// "Ở GIỮA" nghĩa là đáp án đúng không phải phương án dài nhất duy nhất, cũng
// không phải ngắn nhất duy nhất. Loại được hai đầu rồi đoán giữa hai cái còn
// lại là đã hơn may rủi, nên chiều này cũng là một mách nước.
import fs from "fs";

const dataDir = "lib/lessons-data";
const enDir = "lib/lessons-i18n/en";
const index = JSON.parse(fs.readFileSync(`${dataDir}/_index.json`, "utf8"));
const lessons = Array.isArray(index) ? index : index.lessons ?? [];
const trackOf = Object.fromEntries(lessons.map((l) => [l.slug, l.resolvedTrack ?? l.track]));

const args = process.argv.slice(2);

/** @returns {"longest"|"shortest"|"middle"|null} */
function place(options, correct) {
  if (!options || correct == null || !options[correct]) return null;
  const lengths = options.map((s) => s.length);
  const max = Math.max(...lengths);
  const min = Math.min(...lengths);
  const isUnique = (v) => lengths.filter((x) => x === v).length === 1;
  if (lengths[correct] === max && isUnique(max)) return "longest";
  if (lengths[correct] === min && isUnique(min)) return "shortest";
  return "middle";
}

const files = fs
  .readdirSync(enDir)
  .filter((f) => f.endsWith(".json") && f !== "_index.json")
  .filter((f) => (args.length ? args.includes(f.replace(/\.json$/, "")) : true));

const tally = {};
for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  const source = `${dataDir}/${file}`;
  if (!fs.existsSync(source)) continue;
  const vi = JSON.parse(fs.readFileSync(source, "utf8"));
  const en = JSON.parse(fs.readFileSync(`${enDir}/${file}`, "utf8"));
  if (!vi.quiz || !en.quiz || vi.quiz.length !== en.quiz.length) continue;

  const track = trackOf[slug] ?? "?";
  tally[track] ??= { longest: 0, shortest: 0, middle: 0 };

  vi.quiz.forEach((question, i) => {
    const options = en.quiz[i]?.options;
    if (!options || options.length !== question.options.length) return;
    const where = place(options, question.correct);
    if (!where) return;
    tally[track][where] += 1;
    if (!args.length) return;

    const lengths = options.map((s) => s.length);
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const band = lengths.every((x) => x >= mean * 0.8 && x <= mean * 1.2);
    console.log(
      `${slug} q${i}  ${where.padEnd(8)} [${lengths.join(", ")}] correct=${question.correct}` +
        (band ? "" : "  ±20% BAND BROKEN")
    );
    if (where === "middle") {
      const longest = lengths.indexOf(Math.max(...lengths));
      console.log(
        `    rút ngắn nhiễu #${longest} xuống dưới ${lengths[question.correct]} ký tự thì đáp án đúng thành dài nhất:`
      );
      console.log(`    [${longest}] ${options[longest]}`);
    }
  });
}

console.log();
for (const [track, t] of Object.entries(tally)) {
  const total = t.longest + t.shortest + t.middle;
  if (!total) continue;
  const pct = (n) => `${((100 * n) / total).toFixed(1)}%`;
  console.log(
    `${track.padEnd(14)} ${String(total).padStart(5)} câu  ·  dài nhất ${pct(t.longest)}  ·  ngắn nhất ${pct(t.shortest)}  ·  ở giữa ${pct(t.middle)}`
  );
}
console.log("\nMức ngẫu nhiên xấp xỉ 25% / 25% / 50% (kỳ vọng thật phụ thuộc số câu có độ dài trùng nhau).");
