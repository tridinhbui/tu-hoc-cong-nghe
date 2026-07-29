import fs from 'fs';
import path from 'path';

const lessonsFilePath = path.join(process.cwd(), 'lib', 'lessons.ts');
const fileContent = fs.readFileSync(lessonsFilePath, 'utf8');

// Dynamic import or regex match
const indexJsonPath = path.join(process.cwd(), 'lib', 'lessons-data', '_index.json');
let indexData = [];
if (fs.existsSync(indexJsonPath)) {
  indexData = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));
}

console.log(`Total lessons in index: ${indexData.length}`);

// Inspect lesson files in lib/lessons-data/
const dataDir = path.join(process.cwd(), 'lib', 'lessons-data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '_index.json');

let missingQuizCount = 0;
let thinTheoryCount = 0;
let totalChecked = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    totalChecked++;

    const hasQuiz = !!(lesson.practicePrompt && lesson.practicePrompt.question && lesson.practicePrompt.options && lesson.practicePrompt.options.length >= 3);
    const sectionCount = lesson.sections ? lesson.sections.length : 0;

    if (!hasQuiz) {
      missingQuizCount++;
      console.log(`[Missing Quiz] Lesson ID: ${lesson.id} | Slug: ${lesson.slug}`);
    }

    if (sectionCount < 3) {
      thinTheoryCount++;
      console.log(`[Thin Theory] Lesson ID: ${lesson.id} | Sections: ${sectionCount}`);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

console.log(`\n--- AUDIT SUMMARY ---`);
console.log(`Total Lessons Checked: ${totalChecked}`);
console.log(`Lessons missing/incomplete quiz: ${missingQuizCount}`);
console.log(`Lessons with thin theory (<3 sections): ${thinTheoryCount}`);
