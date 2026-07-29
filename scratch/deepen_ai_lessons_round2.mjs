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

const round2 = {
  1261: {
    minutes: 34,
    sections: [
      { type: "heading", text: "7. Case Mini: Một Analyst Dùng AI Trong Một Ngày Làm Việc" },
      { type: "paragraph", text: "Buổi sáng, analyst dùng AI tóm tắt 10 tin ngành và lọc 3 sự kiện có thể ảnh hưởng lợi nhuận. Trước trưa, analyst upload BCTC quý mới để trích OCF, nợ vay, phải thu và biến động tồn kho. Buổi chiều, analyst yêu cầu AI viết bản nháp investment memo, nhưng tự kiểm tra lại số liệu và viết phần kết luận cuối cùng. Điểm quan trọng: AI xử lý tốc độ và bản nháp; analyst chịu trách nhiệm logic, nguồn và quyết định." },
      { type: "heading", text: "8. Bài Tập Cuối Bài: Thiết Kế AI Workflow Cá Nhân" },
      { type: "paragraph", text: "Chọn một tác vụ bạn làm lặp lại: đọc tin, ghi chú họp, so sánh cổ phiếu, kiểm tra ngân sách, viết báo cáo. Viết workflow 4 bước gồm Input cần chuẩn bị, Prompt chính, Cách kiểm chứng output và Format lưu kết quả. Nếu workflow chưa có bước kiểm chứng, nó chưa đủ an toàn để dùng trong tài chính." },
    ],
    quiz: {
      question: "Trong workflow AI của analyst, phần nào vẫn phải do con người chịu trách nhiệm cuối cùng?",
      options: ["Logic phân tích, kiểm chứng nguồn và quyết định cuối cùng", "Tốc độ gõ chữ của AI", "Màu giao diện chatbot", "Số lượng emoji trong output"],
      correct: 0,
      explanation: "AI có thể tăng tốc đọc, trích xuất và viết nháp, nhưng trách nhiệm nghề nghiệp nằm ở người phân tích.",
    },
  },
  1262: {
    minutes: 35,
    sections: [
      { type: "heading", text: "7. Prompt Debugging: Khi AI Trả Lời Sai Thì Sửa Gì?" },
      { type: "paragraph", text: "Nếu AI trả lời chung chung, thường thiếu Context hoặc Output. Nếu AI bịa số, thiếu Constraint và Verification. Nếu AI phân tích lệch trọng tâm, Role hoặc Task chưa rõ. Nếu AI viết quá dài, Output chưa giới hạn độ dài. Prompt Engineering giỏi không phải viết một câu hoàn hảo ngay lần đầu, mà biết nhìn output xấu và sửa đúng phần bị thiếu." },
      { type: "heading", text: "8. Ma Trận Chất Lượng Prompt" },
      { type: "paragraph", text: "Chấm prompt theo 5 tiêu chí, mỗi tiêu chí 0-2 điểm: Role rõ chưa, Context đủ chưa, Task đo được chưa, Output dùng được chưa, Constraint/Verification có chưa. Prompt dưới 6 điểm chỉ nên dùng để brainstorm. Prompt 8-10 điểm mới đủ tốt cho công việc tài chính có số liệu." },
    ],
    quiz: {
      question: "Nếu AI trả lời nghe hay nhưng không có bằng chứng số liệu, phần nào của prompt thường bị thiếu?",
      options: ["Verification hoặc yêu cầu trích bằng chứng", "Tên chatbot", "Lời cảm ơn", "Cỡ chữ"],
      correct: 0,
      explanation: "Trong tài chính, output phải có bằng chứng. Verification buộc AI đưa nguồn, công thức hoặc dữ liệu hỗ trợ.",
    },
  },
  1263: {
    minutes: 36,
    sections: [
      { type: "heading", text: "7. DCF Không Phải Máy In Target Price" },
      { type: "paragraph", text: "Một lỗi phổ biến là dùng DCF để hợp thức hóa niềm tin có sẵn. Nếu thích cổ phiếu, người dùng vô thức chọn g cao, WACC thấp, biên lợi nhuận đẹp. Hãy bắt AI chạy 3 kịch bản: Bear, Base, Bull; mỗi kịch bản phải có giả định riêng và xác suất chủ quan. Kết quả tốt nhất không phải một con số, mà là vùng giá trị và điều kiện khiến vùng đó đúng." },
      { type: "heading", text: "8. Prompt Kiểm Tra Độ Hợp Lý Của Giả Định" },
      { type: "paragraph", text: "Dùng prompt: 'Hãy phản biện các giả định DCF này như một Investment Committee. Giả định nào quá lạc quan so với lịch sử công ty/ngành? Giả định nào cần bằng chứng? Nếu giảm tăng trưởng 2 điểm phần trăm và tăng WACC 1 điểm phần trăm, luận điểm đầu tư còn đứng vững không?'" },
    ],
    quiz: {
      question: "Vì sao nên chạy Bear/Base/Bull case khi dùng AI định giá DCF?",
      options: ["Để thấy vùng giá trị và điều kiện khiến từng kịch bản đúng", "Để luôn chọn kịch bản Bull", "Để bỏ qua rủi ro", "Để không cần WACC"],
      correct: 0,
      explanation: "DCF phụ thuộc mạnh vào giả định. Kịch bản giúp người học tư duy xác suất thay vì bám vào một target price duy nhất.",
    },
  },
  1264: {
    minutes: 35,
    sections: [
      { type: "heading", text: "7. Tạo Red Flag Memo Từ BCTC" },
      { type: "paragraph", text: "Sau khi AI trích số, yêu cầu viết Red Flag Memo gồm: phát hiện chính, bằng chứng trang nguồn, mức độ nghiêm trọng, câu hỏi cần hỏi ban lãnh đạo và dữ liệu cần kiểm tra thêm. Memo này không kết luận mua/bán ngay; nó giúp bạn biết cần đào sâu vào đâu trước khi xây thesis đầu tư." },
      { type: "heading", text: "8. Bài Tập: Soi Một Công Ty Có Lãi Nhưng Thiếu Tiền" },
      { type: "paragraph", text: "Lấy một BCTC thật và yêu cầu AI so sánh Net Income với OCF trong 3 năm. Nếu NI dương nhưng OCF yếu, hỏi tiếp: nguyên nhân đến từ phải thu, tồn kho, trả trước, hay khoản mục phi tiền mặt? Cuối cùng yêu cầu AI viết 3 câu hỏi dành cho CFO trong buổi gặp nhà đầu tư." },
    ],
    quiz: {
      question: "Red Flag Memo từ BCTC nên dùng để làm gì?",
      options: ["Xác định điểm cần đào sâu và câu hỏi cần kiểm chứng trước khi kết luận đầu tư", "Thay thế hoàn toàn kiểm toán", "Tự động khuyến nghị mua", "Trang trí báo cáo"],
      correct: 0,
      explanation: "Red Flag Memo là công cụ định hướng điều tra, không phải kết luận cuối cùng.",
    },
  },
  1265: {
    minutes: 33,
    sections: [
      { type: "heading", text: "7. Từ Biên Bản Họp Đến Management Quality Score" },
      { type: "paragraph", text: "Bạn có thể yêu cầu AI chấm điểm chất lượng ban lãnh đạo theo 5 tiêu chí: mục tiêu có đo được không, trả lời câu hỏi có thẳng không, cam kết có thời hạn không, rủi ro có được thừa nhận không, và lịch sử thực hiện lời hứa có nhất quán không. Điểm số không phải chân lý, nhưng là khung giúp bạn đọc ĐHĐCĐ có hệ thống hơn." },
      { type: "heading", text: "8. Prompt Theo Dõi Sau ĐHĐCĐ" },
      { type: "paragraph", text: "Sau khi có bảng cam kết, dùng prompt: 'Hãy biến các cam kết này thành dashboard theo dõi trong 4 quý tới. Với mỗi cam kết, ghi chỉ báo cần theo dõi, nguồn dữ liệu, ngưỡng cảnh báo và câu hỏi cần cập nhật sau mỗi BCTC quý.' Đây là cách nối ĐHĐCĐ với quy trình đầu tư dài hạn." },
    ],
    quiz: {
      question: "Management Quality Score từ tài liệu ĐHĐCĐ nên dựa vào yếu tố nào?",
      options: ["Mục tiêu đo được, câu trả lời thẳng, cam kết có thời hạn và lịch sử thực hiện", "Số lượng ảnh đẹp trong slide", "Độ dài bài phát biểu", "Cỡ hội trường"],
      correct: 0,
      explanation: "Chất lượng quản trị thể hiện qua sự minh bạch, khả năng thực thi và cách lãnh đạo đối diện câu hỏi khó.",
    },
  },
  1266: {
    minutes: 34,
    sections: [
      { type: "heading", text: "7. Tạo Watchlist Từ Sentiment" },
      { type: "paragraph", text: "Sentiment không nhất thiết dẫn đến hành động mua/bán ngay. Một cách dùng tốt hơn là tạo watchlist: cổ phiếu có sentiment xấu nhưng fundamental chưa đổi có thể là cơ hội theo dõi; cổ phiếu sentiment quá tốt nhưng định giá căng cần cảnh giác. AI nên giúp bạn phân loại tín hiệu thành Watch, Investigate, Avoid hoặc Act, kèm lý do." },
      { type: "heading", text: "8. Prompt Phát Hiện Narrative Đang Hình Thành" },
      { type: "paragraph", text: "Dán nhiều bài báo trong 2-4 tuần và hỏi: 'Narrative chính mà thị trường đang kể về ngành này là gì? Narrative đó dựa trên dữ liệu thật hay kỳ vọng? Điều gì có thể làm narrative đảo chiều? Cổ phiếu nào hưởng lợi nếu narrative đúng và cổ phiếu nào rủi ro nếu narrative sai?'" },
    ],
    quiz: {
      question: "Cách dùng sentiment thận trọng nhất là gì?",
      options: ["Biến sentiment thành watchlist và câu hỏi kiểm chứng, không mua/bán chỉ vì headline", "Mua ngay tin tích cực", "Bán ngay mọi tin tiêu cực", "Bỏ qua định giá"],
      correct: 0,
      explanation: "Sentiment là tín hiệu đầu vào. Nó cần được nối với fundamental, valuation và risk management.",
    },
  },
  1267: {
    minutes: 35,
    sections: [
      { type: "heading", text: "7. Bộ Test Cho Trợ Lý AI Riêng" },
      { type: "paragraph", text: "Trước khi tin Custom GPT, hãy test bằng 5 câu: hỏi một số liệu có trong tài liệu, hỏi một số liệu không có, yêu cầu so sánh hai doanh nghiệp, yêu cầu nêu rủi ro trái với thesis, và yêu cầu trích nguồn. Nếu trợ lý bịa dữ liệu ở câu 'không có', system instructions cần siết lại ngay." },
      { type: "heading", text: "8. Tách Trợ Lý Theo Nhiệm Vụ" },
      { type: "paragraph", text: "Không nên nhồi mọi việc vào một trợ lý. Có thể tách 3 assistant: Research Assistant đọc báo cáo và tin tức; Valuation Assistant kiểm tra mô hình và sensitivity; Writing Assistant đóng gói memo/slide. Tách vai trò giúp instruction ngắn hơn, output nhất quán hơn và dễ debug hơn." },
    ],
    quiz: {
      question: "Vì sao nên test Custom GPT bằng câu hỏi có dữ liệu không tồn tại trong tài liệu?",
      options: ["Để xem trợ lý có biết nói Không tìm thấy hay tự bịa", "Để làm khó cho vui", "Để tăng token", "Để bỏ qua nguồn"],
      correct: 0,
      explanation: "Khả năng từ chối bịa dữ liệu là tiêu chuẩn quan trọng của trợ lý tài chính đáng tin.",
    },
  },
  1268: {
    minutes: 35,
    sections: [
      { type: "heading", text: "6. Từ Báo Cáo AI Đến Bản Trình Sếp" },
      { type: "paragraph", text: "Bản AI viết thường quá đầy đủ nhưng chưa chắc phù hợp người đọc. Với sếp hoặc hội đồng đầu tư, hãy yêu cầu AI rút còn 5 câu: khuyến nghị, upside/downside, 2 bằng chứng mạnh nhất, rủi ro lớn nhất và quyết định cần phê duyệt. Sau đó mới mở rộng thành phụ lục nếu người đọc cần đào sâu." },
      { type: "heading", text: "7. Checklist Trước Khi Gửi Báo Cáo" },
      { type: "paragraph", text: "Trước khi gửi, kiểm tra: số liệu có nguồn chưa, đơn vị nhất quán chưa, khuyến nghị có điều kiện rõ chưa, rủi ro có đủ sắc bén chưa, valuation có sensitivity chưa, văn phong có giống bạn/công ty không. AI có thể viết bản nháp, nhưng báo cáo gửi đi phải mang trách nhiệm và tiêu chuẩn của bạn." },
    ],
    quiz: {
      question: "Trước khi gửi báo cáo do AI hỗ trợ viết, điều gì quan trọng nhất?",
      options: ["Kiểm tra nguồn số liệu, giả định, rủi ro và chỉnh lại văn phong theo tiêu chuẩn của mình", "Gửi ngay bản đầu tiên", "Xóa phần rủi ro", "Để AI tự chịu trách nhiệm"],
      correct: 0,
      explanation: "AI hỗ trợ soạn thảo, nhưng trách nhiệm nghề nghiệp vẫn thuộc về người gửi báo cáo.",
    },
  },
  1269: {
    minutes: 36,
    sections: [
      { type: "heading", text: "7. Audit Trail Cho Output AI" },
      { type: "paragraph", text: "Với công việc quan trọng, hãy lưu audit trail: prompt đã dùng, tài liệu đầu vào, output gốc, các chỉnh sửa thủ công và quyết định cuối cùng. Điều này giúp bạn giải thích lại quy trình nếu có tranh luận, đồng thời cải tiến prompt cho lần sau. Trong môi trường chuyên nghiệp, khả năng truy vết quan trọng không kém tốc độ." },
      { type: "heading", text: "8. Phân Loại Mức Độ Tin Cậy Của Kết Luận" },
      { type: "paragraph", text: "Yêu cầu AI gắn nhãn mỗi kết luận: High confidence nếu có số liệu và nguồn rõ; Medium nếu có dữ liệu nhưng còn cần giả định; Low nếu chủ yếu là suy luận. Sau đó chỉ đưa High/Medium vào báo cáo chính, còn Low chuyển thành mục 'cần kiểm tra thêm'." },
    ],
    quiz: {
      question: "Audit trail khi dùng AI trong tài chính gồm những gì?",
      options: ["Prompt, tài liệu đầu vào, output gốc, chỉnh sửa và quyết định cuối cùng", "Chỉ kết quả cuối", "Chỉ tên chatbot", "Chỉ ngày giờ mở máy"],
      correct: 0,
      explanation: "Audit trail giúp truy vết nguồn gốc phân tích và bảo vệ chất lượng quy trình.",
    },
  },
  1270: {
    minutes: 36,
    sections: [
      { type: "heading", text: "6. Prompt Library Theo Chuẩn SOP" },
      { type: "paragraph", text: "Hãy coi prompt library như SOP cá nhân. Mỗi prompt nên có owner, mục đích, phiên bản, ngày cập nhật, ví dụ input tốt, ví dụ output tốt và lỗi thường gặp. Khi làm trong team, prompt library giúp chuẩn hóa chất lượng phân tích giữa các thành viên, đặc biệt với task lặp lại như đọc BCTC, viết memo và chuẩn bị slide." },
      { type: "heading", text: "7. Bài Tập Tổng Kết Chặng 13" },
      { type: "paragraph", text: "Tạo một bộ 5 prompt hoàn chỉnh cho chính công việc của bạn: một prompt đọc tài liệu, một prompt trích số liệu, một prompt phân tích rủi ro, một prompt viết báo cáo và một prompt tự phản biện. Mỗi prompt phải có Constraint và Verification. Đây là sản phẩm đầu ra thực tế của toàn bộ chặng AI in Finance." },
    ],
    quiz: {
      question: "Sản phẩm đầu ra tốt nhất sau Chặng 13 là gì?",
      options: ["Một bộ prompt cá nhân có input, output, constraint, verification và checklist kiểm chứng", "Một danh sách chatbot yêu thích", "Một câu prompt duy nhất dùng cho mọi việc", "Không cần lưu gì"],
      correct: 0,
      explanation: "Mục tiêu của chặng là biến AI thành hệ thống làm việc lặp lại được, không chỉ học vài mẹo prompt.",
    },
  },
};

for (const lesson of lessons) {
  const enhancement = round2[lesson.id];
  if (!enhancement) continue;

  lesson.estimatedMinutes = enhancement.minutes;
  lesson.duration = `${enhancement.minutes} phút`;
  lesson.keyTakeaways = [
    ...(Array.isArray(lesson.keyTakeaways) ? lesson.keyTakeaways : []),
    "Bài học này cần được áp dụng thành workflow có kiểm chứng, không chỉ đọc như mẹo dùng AI.",
  ];

  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const closingIndex = sections.findIndex((section) => section.type === "closing");
  lesson.sections =
    closingIndex === -1
      ? [...sections, ...enhancement.sections]
      : [
          ...sections.slice(0, closingIndex),
          ...enhancement.sections,
          ...sections.slice(closingIndex),
        ];
  lesson.quiz = [...(Array.isArray(lesson.quiz) ? lesson.quiz : []), enhancement.quiz];
}

writeFileSync(
  lessonsPath,
  `import type { Lesson } from "./lesson-types";\n\nexport const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`,
);

console.log("Deepened AI lessons 1261-1270 round 2.");
