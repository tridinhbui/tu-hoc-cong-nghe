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

const friendly = {
  1261: {
    simple: "Nói đơn giản: AI giống một trợ lý rất nhanh. Bạn đưa tài liệu và giao việc rõ ràng; AI đọc, tóm tắt, gom số và viết nháp. Nhưng bạn vẫn là người kiểm tra xem nó có hiểu đúng không.",
    glossary: "Generative AI: AI tạo câu trả lời mới từ dữ liệu và câu lệnh. Prompt: câu giao việc cho AI. Workflow: chuỗi bước làm việc lặp lại được, ví dụ đọc tin -> tóm tắt -> kiểm chứng -> viết memo.",
    beginnerAction: "Nếu mới bắt đầu, đừng upload ngay BCTC 100 trang. Hãy thử với một bài báo tài chính ngắn: yêu cầu AI tóm tắt 3 ý chính, 2 rủi ro và 1 câu hỏi bạn cần tìm thêm.",
  },
  1262: {
    simple: "Nói đơn giản: R-C-T-O là cách giao việc cho AI như giao việc cho một thực tập sinh. Nói AI đóng vai ai, đang có dữ liệu gì, cần làm việc gì và trả kết quả ra sao.",
    glossary: "Role: vai trò AI cần nhập vai. Context: bối cảnh và số liệu. Task: việc cần làm. Output: hình thức câu trả lời, ví dụ bảng, checklist hoặc 3 gạch đầu dòng.",
    beginnerAction: "Công thức dễ nhớ: 'Bạn là ai? Bạn biết gì? Bạn cần làm gì? Trả lời kiểu nào?' Chỉ cần đủ 4 câu này, prompt đã tốt hơn rất nhiều.",
  },
  1263: {
    simple: "Nói đơn giản: DCF là cách ước tính giá trị doanh nghiệp bằng tiền nó có thể tạo ra trong tương lai. AI giúp tính nhanh, nhưng giả định sai thì kết quả vẫn sai.",
    glossary: "FCF: dòng tiền tự do, tiền còn lại sau khi doanh nghiệp vận hành và đầu tư cần thiết. WACC: chi phí vốn, giống mức lợi nhuận tối thiểu nhà đầu tư đòi hỏi. Terminal Value: giá trị phần rất xa trong tương lai.",
    beginnerAction: "Người mới chỉ cần nhớ 3 câu hỏi: doanh nghiệp tạo bao nhiêu tiền, tiền đó tăng nhanh cỡ nào, và mình chiết khấu với mức rủi ro bao nhiêu.",
  },
  1264: {
    simple: "Nói đơn giản: BCTC giống hồ sơ sức khỏe của doanh nghiệp. AI giúp đọc nhanh hồ sơ đó, nhưng bạn phải bắt nó chỉ rõ số nằm ở trang nào và vì sao số đó đáng chú ý.",
    glossary: "BCTC: báo cáo tài chính. OCF: dòng tiền từ hoạt động kinh doanh, tức tiền thật tạo ra từ việc kinh doanh chính. Thuyết minh: phần giải thích chi tiết đằng sau các con số.",
    beginnerAction: "Bắt đầu bằng 3 chỉ tiêu dễ hiểu: lợi nhuận có dương không, dòng tiền kinh doanh có dương không, nợ vay có tăng nhanh không.",
  },
  1265: {
    simple: "Nói đơn giản: ĐHĐCĐ là nơi ban lãnh đạo nói kế hoạch năm tới và trả lời cổ đông. AI giúp bạn lọc ra lời hứa nào có con số, có thời hạn và cần theo dõi.",
    glossary: "ĐHĐCĐ: Đại hội đồng cổ đông. Q&A: phần hỏi đáp. Cam kết lãnh đạo: lời hứa hoặc mục tiêu mà ban lãnh đạo đưa ra, ví dụ lợi nhuận, cổ tức, dự án mới.",
    beginnerAction: "Sau khi đọc biên bản họp, hãy ghi lại 5 lời hứa quan trọng nhất và đặt lịch kiểm tra chúng ở BCTC quý sau.",
  },
  1266: {
    simple: "Nói đơn giản: Sentiment là tâm trạng của thị trường qua tin tức. Tin nghe rất vui chưa chắc làm doanh nghiệp kiếm thêm tiền, nên phải tách cảm xúc khỏi tác động tài chính thật.",
    glossary: "Sentiment: sắc thái tích cực/tiêu cực của tin tức. Catalyst: sự kiện có thể làm giá cổ phiếu thay đổi. Fundamental: sức khỏe thật của doanh nghiệp như doanh thu, lợi nhuận, nợ và dòng tiền.",
    beginnerAction: "Khi đọc tin tốt, hãy hỏi: tin này làm doanh thu tăng, chi phí giảm hay chỉ làm mọi người hào hứng tạm thời?",
  },
  1267: {
    simple: "Nói đơn giản: Custom GPT hoặc Claude Project là chatbot riêng được bạn dạy luật chơi. Nó chỉ hữu ích khi bạn nói rõ nó được dùng dữ liệu nào, được phép làm gì và không được bịa gì.",
    glossary: "Knowledge Base: kho tài liệu bạn tải lên. System Instructions: luật vận hành của trợ lý. Guardrails: hàng rào an toàn, ví dụ 'không bịa số' hoặc 'luôn nêu rủi ro'.",
    beginnerAction: "Tạo trợ lý nhỏ trước: chỉ chuyên tóm tắt báo cáo ngành. Khi nó làm tốt và biết nói 'không tìm thấy dữ liệu', hãy mở rộng sang phân tích cổ phiếu.",
  },
  1268: {
    simple: "Nói đơn giản: AI có thể viết bản nháp báo cáo rất nhanh, nhưng bản nháp chưa phải báo cáo cuối. Bạn phải kiểm tra số, chỉnh luận điểm và thêm rủi ro trước khi gửi.",
    glossary: "One-pager: báo cáo 1 trang. Investment thesis: lý do chính để đầu tư hoặc không đầu tư. Target price: giá mục tiêu ước tính, không phải lời hứa chắc chắn.",
    beginnerAction: "Báo cáo dễ đọc nên trả lời 4 câu: nên làm gì, vì sao, rủi ro gì, cần kiểm tra thêm điều gì.",
  },
  1269: {
    simple: "Nói đơn giản: Hallucination là lúc AI bịa nhưng nói rất tự tin. Cách phòng tránh là khóa nguồn, bắt trích trang và yêu cầu AI nói 'không tìm thấy' khi thiếu dữ liệu.",
    glossary: "Hallucination: AI tạo thông tin sai hoặc không có thật. Source-locked: chỉ được dùng nguồn bạn đưa. Audit trail: dấu vết quy trình gồm prompt, tài liệu, output và chỉnh sửa.",
    beginnerAction: "Mỗi khi AI đưa ra một con số, hãy hỏi ngay: số này lấy từ trang nào, bảng nào, kỳ nào và đơn vị gì?",
  },
  1270: {
    simple: "Nói đơn giản: Prompt Library là sổ tay câu lệnh dùng lại. Nó giúp bạn không phải nghĩ từ đầu mỗi lần đọc BCTC, phân tích tin hay viết báo cáo.",
    glossary: "Template: mẫu có chỗ trống để thay thông tin. Version: phiên bản prompt sau mỗi lần cải tiến. SOP: quy trình chuẩn để người khác cũng làm ra kết quả tương tự.",
    beginnerAction: "Bắt đầu với 5 prompt thôi: tóm tắt tin, đọc BCTC, tìm rủi ro, viết báo cáo ngắn và tự phản biện.",
  },
};

for (const lesson of lessons) {
  const item = friendly[lesson.id];
  if (!item) continue;

  lesson.summary = {
    ...lesson.summary,
    keyIdea: item.simple,
  };

  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const alreadyFriendly = sections.some((section) => section.type === "heading" && section.text === "Nói Đơn Giản Trước Khi Đi Sâu");
  if (!alreadyFriendly) {
    const insertAt = Math.min(1, sections.length);
    lesson.sections = [
      ...sections.slice(0, insertAt),
      { type: "heading", text: "Nói Đơn Giản Trước Khi Đi Sâu" },
      { type: "paragraph", text: item.simple },
      { type: "callout", label: "Từ khóa dễ hiểu", text: item.glossary },
      { type: "callout", label: "Bắt đầu trong 5 phút", text: item.beginnerAction },
      ...sections.slice(insertAt),
    ];
  }

  lesson.quiz = [
    ...(Array.isArray(lesson.quiz) ? lesson.quiz : []),
    {
      question: "Nếu bạn là người mới học bài này, cách bắt đầu an toàn nhất là gì?",
      options: [
        item.beginnerAction,
        "Dùng AI để ra quyết định đầu tư ngay mà không kiểm tra",
        "Bỏ qua nguồn dữ liệu vì AI thường nói tự tin",
        "Chỉ học thuộc thuật ngữ mà không thực hành",
      ],
      correct: 0,
      explanation: "Người mới nên bắt đầu bằng tác vụ nhỏ, dễ kiểm tra và có nguồn rõ ràng. Sau đó mới tăng độ khó.",
    },
  ];
}

writeFileSync(
  lessonsPath,
  `import type { Lesson } from "./lesson-types";\n\nexport const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`,
);

console.log("Made AI lessons friendlier for beginners.");
