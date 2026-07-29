import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'lib', 'lessons-data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '_index.json');

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    // Fix sections if they contain legacy heading/content format
    if (Array.isArray(lesson.sections)) {
      const newSections = [];
      for (const sec of lesson.sections) {
        if (sec.heading && sec.content && !sec.type) {
          newSections.push({ type: "heading", text: sec.heading });
          newSections.push({ type: "paragraph", text: sec.content });
          modified = true;
        } else {
          newSections.push(sec);
        }
      }
      lesson.sections = newSections;
    }

    // Ensure required properties for Lesson interface
    if (!lesson.diagram) {
      lesson.diagram = [];
      modified = true;
    }

    if (!lesson.realWorldExample) {
      lesson.realWorldExample = {
        company: lesson.title,
        description: lesson.subtitle || lesson.title
      };
      modified = true;
    }

    if (!lesson.quiz) {
      if (lesson.practicePrompt) {
        lesson.quiz = [{
          question: lesson.practicePrompt.question,
          options: lesson.practicePrompt.options,
          correct: lesson.practicePrompt.correct,
          explanation: lesson.practicePrompt.explanation || "Đáp án chính xác được bảo chứng dựa trên nguyên lý tài chính."
        }];
      } else {
        lesson.quiz = [];
      }
      modified = true;
    }

    if (!lesson.keyTakeaways) {
      lesson.keyTakeaways = [
        lesson.summary?.keyIdea || lesson.subtitle || lesson.title,
        "Nắm vững nguyên lý tài chính để ứng dụng hiệu quả vào công việc và đầu tư."
      ];
      modified = true;
    }

    if (!lesson.emoji) {
      lesson.emoji = "📚";
      modified = true;
    }

    if (!lesson.openingQuestion) {
      lesson.openingQuestion = lesson.practicePrompt?.question || `Bạn hiểu gì về ${lesson.title}?`;
      lesson.openingOptions = lesson.practicePrompt?.options || ["Có am hiểu", "Mới tìm hiểu", "Chưa am hiểu"];
      lesson.correctOption = lesson.practicePrompt?.correct ?? 0;
      lesson.explanation = lesson.practicePrompt?.explanation || "Tìm hiểu chi tiết bài học để làm chủ kiến thức.";
      modified = true;
    }

    if (!lesson.duration) {
      lesson.duration = lesson.estimatedMinutes ? `${lesson.estimatedMinutes} phút` : "15 phút";
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
      fixedCount++;
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

console.log(`Successfully normalized ${fixedCount} lessons in lib/lessons-data/!`);
