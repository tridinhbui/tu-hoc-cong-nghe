import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'lib', 'lessons-data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '_index.json');

const missingQuizLessons = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const hasQuiz = !!(lesson.practicePrompt && lesson.practicePrompt.question && lesson.practicePrompt.options && lesson.practicePrompt.options.length >= 3);
    if (!hasQuiz) {
      missingQuizLessons.push({
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        subtitle: lesson.subtitle,
      });
    }
  } catch (err) {}
}

missingQuizLessons.sort((a, b) => a.id - b.id);

console.log(JSON.stringify(missingQuizLessons, null, 2));
