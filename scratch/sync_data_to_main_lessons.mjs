import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'lib', 'lessons-data');
const indexFile = path.join(dataDir, '_index.json');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '_index.json');

const allLessons = [];
const allMeta = [];

function normalizeDifficulty(diff) {
  if (diff === 'de' || diff === 'Dễ') return 'Dễ';
  if (diff === 'kho' || diff === 'Khó') return 'Khó';
  return 'Trung bình';
}

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    lesson.difficulty = normalizeDifficulty(lesson.difficulty);
    if (!lesson.duration) {
      lesson.duration = lesson.estimatedMinutes ? `${lesson.estimatedMinutes} phút` : "15 phút";
    }

    allLessons.push(lesson);

    allMeta.push({
      id: lesson.id,
      day: lesson.day,
      slug: lesson.slug,
      title: lesson.title,
      subtitle: lesson.subtitle || "",
      duration: lesson.duration,
      difficulty: lesson.difficulty,
      track: lesson.track,
    });
  } catch (err) {}
}

allLessons.sort((a, b) => a.id - b.id);
allMeta.sort((a, b) => a.id - b.id);

// Write _index.json
fs.writeFileSync(indexFile, JSON.stringify(allMeta, null, 2), 'utf8');

// Update lib/lessons.ts
const lessonsFilePath = path.join(process.cwd(), 'lib', 'lessons.ts');
const fileHeader = `import type { Lesson } from "./lesson-types";\n\nexport const lessons: Lesson[] = `;
const fileFooter = `;\n`;

fs.writeFileSync(lessonsFilePath, fileHeader + JSON.stringify(allLessons, null, 2) + fileFooter, 'utf8');

console.log(`Successfully synced ${allLessons.length} lessons to lib/lessons.ts and lib/lessons-data/_index.json!`);
