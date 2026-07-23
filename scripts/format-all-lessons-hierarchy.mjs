import { readFileSync, writeFileSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "lib/lessons-data");

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
  "Chi phí cơ hội",
  "Tài sản",
  "Tiêu sản",
  "Dòng tiền",
  "Lợi nhuận",
];

function formatTextString(str) {
  if (!str || typeof str !== "string") return str;
  let res = str;

  // Add bolding to unformatted key labels like "Định nghĩa:" -> "**Định nghĩa:**"
  LABELS.forEach((label) => {
    const pattern = new RegExp(`(?<!\\*\\*)(?<![a-zA-Z0-9À-ỹ])(${label}):`, "g");
    res = res.replace(pattern, `**${label}:**`);
  });

  return res;
}

function processLesson(lesson) {
  let changed = false;

  // Process sections
  if (Array.isArray(lesson.sections)) {
    lesson.sections = lesson.sections.map((block) => {
      if (block.type === "paragraph" || block.type === "lead" || block.type === "callout") {
        const formatted = formatTextString(block.text);
        if (formatted !== block.text) {
          changed = true;
          return { ...block, text: formatted };
        }
      } else if (block.type === "list" && Array.isArray(block.items)) {
        const formattedItems = block.items.map((item) => formatTextString(item));
        if (JSON.stringify(formattedItems) !== JSON.stringify(block.items)) {
          changed = true;
          return { ...block, items: formattedItems };
        }
      }
      return block;
    });
  }

  // Process quiz explanations
  if (Array.isArray(lesson.quiz)) {
    lesson.quiz = lesson.quiz.map((q) => {
      if (q.explanation) {
        const formatted = formatTextString(q.explanation);
        if (formatted !== q.explanation) {
          changed = true;
          return { ...q, explanation: formatted };
        }
      }
      return q;
    });
  }

  // Process summary
  if (lesson.summary) {
    if (lesson.summary.keyIdea) {
      const formatted = formatTextString(lesson.summary.keyIdea);
      if (formatted !== lesson.summary.keyIdea) {
        changed = true;
        lesson.summary.keyIdea = formatted;
      }
    }
    if (lesson.summary.formula) {
      const formatted = formatTextString(lesson.summary.formula);
      if (formatted !== lesson.summary.formula) {
        changed = true;
        lesson.summary.formula = formatted;
      }
    }
  }

  return { lesson, changed };
}

const files = readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "_index.json");
let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const raw = readFileSync(filePath, "utf8");
  const lesson = JSON.parse(raw);
  const { lesson: updated, changed } = processLesson(lesson);

  if (changed) {
    writeFileSync(filePath, JSON.stringify(updated, null, 2));
    updatedCount++;
  }
}

console.log(`✨ Scanned ${files.length} lesson files. Formatted & enhanced ${updatedCount} lesson JSON files with bold labels!`);
