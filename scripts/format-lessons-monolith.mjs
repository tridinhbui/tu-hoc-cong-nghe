import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const filePath = path.join(root, "lib/lessons.ts");

const LABELS = [
  "Định nghĩa",
  "Ví dụ",
  "Công thức",
  "Bản chất",
  "Lưu ý",
  "Kịch bản",
  "Ứng dụng",
  "Lợi ích",
  "Rủi ro",
  "Ý nghĩa",
];

let content = readFileSync(filePath, "utf8");
let matchCount = 0;

LABELS.forEach((label) => {
  const pattern = new RegExp(`(?<!\\*\\*)(?<![a-zA-Z0-9À-ỹ])(${label}):`, "g");
  const count = (content.match(pattern) || []).length;
  if (count > 0) {
    matchCount += count;
    content = content.replace(pattern, `**${label}:**`);
  }
});

if (matchCount > 0) {
  writeFileSync(filePath, content);
  console.log(`✨ Replaced ${matchCount} unformatted label occurrences in lib/lessons.ts!`);
} else {
  console.log("No unformatted labels found in lib/lessons.ts.");
}
