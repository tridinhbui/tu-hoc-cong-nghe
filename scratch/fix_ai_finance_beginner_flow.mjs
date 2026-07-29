import ts from "typescript";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const lessonsPath = path.join(root, "lib/lessons.ts");
const source = readFileSync(lessonsPath, "utf8");

const stripped = source
  .split(/\r?\n/)
  .filter((line) => !line.startsWith("import type"))
  .join("\n");

const { outputText } = ts.transpileModule(stripped, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

const moduleObj = { exports: {} };
new Function("exports", "module", outputText)(moduleObj.exports, moduleObj);
const lessons = moduleObj.exports.lessons;

function insertBeforeFirstNumberedHeading(lesson, blocks) {
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const index = sections.findIndex((section) => section.type === "heading" && /^1\./.test(section.text));
  const insertAt = index === -1 ? sections.length : index;
  lesson.sections = [...sections.slice(0, insertAt), ...blocks, ...sections.slice(insertAt)];
}

function insertBeforeClosing(lesson, blocks) {
  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const index = sections.findIndex((section) => section.type === "closing");
  const insertAt = index === -1 ? sections.length : index;
  lesson.sections = [...sections.slice(0, insertAt), ...blocks, ...sections.slice(insertAt)];
}

const lesson1261 = lessons.find((lesson) => lesson.id === 1261);
if (lesson1261) {
  lesson1261.title = "AI trong Tài chính cho người mới: Dùng ChatGPT/Claude để đọc báo cáo, phân tích và viết memo";
  lesson1261.subtitle = "Bắt đầu từ việc rất thực tế: đọc tin, tóm tắt BCTC, tìm rủi ro và viết bản nháp báo cáo mà không cần biết code";
  lesson1261.openingQuestion = "Bạn có một BCTC dài 60 trang, 5 bài báo thị trường và sếp cần bản tóm tắt trong 15 phút. AI nên giúp bạn phần nào trước tiên?";
  lesson1261.openingOptions = [
    "Đọc nhanh tài liệu, tóm tắt ý chính, gom số liệu và liệt kê câu hỏi cần kiểm chứng",
    "Tự quyết định mua/bán cổ phiếu thay bạn",
    "Bảo đảm mọi con số trong tài liệu luôn đúng",
    "Thay thế hoàn toàn việc học tài chính cơ bản",
  ];
  lesson1261.correctOption = 0;
  lesson1261.explanation = "AI nên được dùng như trợ lý tăng tốc: đọc, lọc, tóm tắt và viết nháp. Người học vẫn phải kiểm chứng số liệu, hiểu logic và chịu trách nhiệm quyết định.";
  if (lesson1261.practicePrompt) {
    lesson1261.practicePrompt.question = lesson1261.openingQuestion;
    lesson1261.practicePrompt.options = lesson1261.openingOptions;
    lesson1261.practicePrompt.correct = 0;
    lesson1261.practicePrompt.explanation = lesson1261.explanation;
  }
  if (Array.isArray(lesson1261.quiz) && lesson1261.quiz[0]) {
    lesson1261.quiz[0].question = lesson1261.openingQuestion;
    lesson1261.quiz[0].options = lesson1261.openingOptions;
    lesson1261.quiz[0].correct = 0;
    lesson1261.quiz[0].explanation = lesson1261.explanation;
  }
  lesson1261.realWorldExample = {
    company: "Tình huống người mới đi làm phân tích",
    description: "Bạn cần biến nhiều tài liệu dài thành bản tóm tắt có số liệu, rủi ro và câu hỏi kiểm chứng trong thời gian ngắn.",
  };
  insertBeforeFirstNumberedHeading(lesson1261, [
    { type: "heading", text: "AI Làm Được Gì Và Không Làm Được Gì?" },
    {
      type: "comparison",
      left: {
        label: "AI làm tốt",
        text: "Đọc nhanh tài liệu dài, tóm tắt ý chính, trích bảng số liệu, gợi ý câu hỏi, viết bản nháp memo hoặc slide. Nói dễ hiểu: AI giúp bạn đi từ 'quá nhiều thông tin' thành 'bản nháp có cấu trúc'.",
      },
      right: {
        label: "AI không thay bạn",
        text: "AI không tự bảo đảm số liệu đúng, không hiểu khẩu vị rủi ro của bạn nếu bạn không nói rõ, không chịu trách nhiệm khuyến nghị đầu tư, và có thể bịa nếu thiếu nguồn.",
      },
    },
    {
      type: "callout",
      label: "Luật 3 bước cho người mới",
      text: "Bước 1: Giao việc nhỏ và rõ. Bước 2: Bắt AI chỉ nguồn hoặc nói 'Không tìm thấy'. Bước 3: Bạn tự kiểm tra 3 con số quan trọng nhất trước khi dùng kết quả.",
    },
  ]);
}

const lesson1262 = lessons.find((lesson) => lesson.id === 1262);
if (lesson1262) {
  lesson1262.title = "Prompt cơ bản cho dân tài chính: Khung R-C-T-O dễ nhớ";
  lesson1262.subtitle = "Cách giao việc cho AI bằng 4 câu hỏi: AI là ai, có dữ liệu gì, cần làm gì, trả lời kiểu nào";
  insertBeforeClosing(lesson1262, [
    { type: "heading", text: "Template Điền Chỗ Trống Cho Người Mới" },
    {
      type: "paragraph",
      text: "Copy mẫu này và thay phần trong ngoặc vuông:\n[Role] Bạn là [vai trò: chuyên viên phân tích / kiểm toán viên / cán bộ tín dụng].\n[Context] Tôi có [tài liệu hoặc số liệu].\n[Task] Hãy giúp tôi [việc cụ thể cần làm].\n[Output] Trả lời dưới dạng [bảng / 3 gạch đầu dòng / checklist].\n[An toàn] Nếu thiếu dữ liệu, hãy ghi 'Không tìm thấy dữ liệu' và đừng tự đoán.",
    },
    {
      type: "callout",
      label: "Ví dụ siêu ngắn",
      text: "Bạn là chuyên viên phân tích. Tôi có doanh thu, lợi nhuận và OCF 3 năm. Hãy nhận xét chất lượng lợi nhuận. Trả lời bằng bảng gồm Nhận xét, Bằng chứng, Rủi ro.",
    },
  ]);
}

const lesson1263 = lessons.find((lesson) => lesson.id === 1263);
if (lesson1263) {
  lesson1263.title = "Prompt nâng cao: Cho AI tính từng bước qua ví dụ định giá DCF";
  lesson1263.subtitle = "Bài này là ví dụ nâng cao: chưa cần giỏi DCF ngay, chỉ cần hiểu cách bắt AI trình bày giả định, công thức và bước kiểm tra";
  const lead = lesson1263.sections?.find((section) => section.type === "lead");
  if (lead) {
    lead.text = "Bài này dùng DCF như một ví dụ nâng cao để học cách bắt AI tính toán từng bước. Nếu bạn mới học định giá, chưa cần thuộc hết công thức ngay; mục tiêu chính là biết cách yêu cầu AI tách giả định, công thức, kết quả và phần cần kiểm tra.";
  }
  insertBeforeFirstNumberedHeading(lesson1263, [
    {
      type: "callout",
      label: "Đừng sợ DCF",
      text: "Nếu thấy FCF, WACC, Terminal Value hơi lạ, hãy hiểu đơn giản thế này: doanh nghiệp tạo tiền trong tương lai; tiền tương lai phải quy về hiện tại; AI giúp tính nhanh nhưng bạn phải kiểm tra giả định.",
    },
    {
      type: "callout",
      label: "Mục tiêu của bài",
      text: "Không phải biến bạn thành chuyên gia định giá ngay. Mục tiêu là học thói quen: đừng xin AI một đáp án cuối; hãy bắt AI cho thấy từng bước đi đến đáp án.",
    },
  ]);
}

const lesson1270 = lessons.find((lesson) => lesson.id === 1270);
if (lesson1270) {
  lesson1270.title = "Project cuối chặng: Xây bộ Prompt Library AI in Finance dùng hằng ngày";
  lesson1270.subtitle = "Tổng kết Chặng 13 bằng một project thực tế: 5 prompt mẫu để đọc tài liệu, trích số, tìm rủi ro, viết memo và tự kiểm chứng";
  insertBeforeClosing(lesson1270, [
    { type: "heading", text: "Project Cuối Chặng: Làm Một Mini Workflow Hoàn Chỉnh" },
    {
      type: "paragraph",
      text: "Chọn một tài liệu thật: một bài báo tài chính, một BCTC quý, hoặc một biên bản ĐHĐCĐ. Làm đủ 5 bước: 1. Tóm tắt tài liệu. 2. Trích 5 con số quan trọng. 3. Tìm 3 rủi ro. 4. Viết memo 1 trang. 5. Tự fact-check lại nguồn và con số. Nếu hoàn thành project này, bạn đã biết dùng AI như một workflow tài chính chứ không chỉ copy vài câu prompt.",
    },
    {
      type: "callout",
      label: "Bộ 5 prompt tối thiểu sau chặng",
      text: "Prompt đọc tài liệu, prompt trích số liệu, prompt tìm rủi ro, prompt viết memo, prompt phản biện/fact-check. Mỗi prompt phải có: dữ liệu đầu vào, nhiệm vụ, định dạng đầu ra, quy tắc không bịa số.",
    },
  ]);
}

for (const lesson of lessons) {
  if (lesson.id >= 1261 && lesson.id <= 1270) {
    lesson.keyTakeaways = Array.from(new Set([
      ...(Array.isArray(lesson.keyTakeaways) ? lesson.keyTakeaways : []),
      "Người mới chỉ nên tăng độ khó sau khi đã biết giao việc rõ, kiểm tra nguồn và hiểu kết quả bằng lời của mình.",
    ]));
  }
}

writeFileSync(
  lessonsPath,
  `import type { Lesson } from "./lesson-types";\n\nexport const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`,
);

console.log("Fixed beginner flow for AI in Finance lessons.");
