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

const enhancements = {
  1261: {
    estimatedMinutes: 25,
    duration: "25 phút",
    summary: {
      keyIdea: "AI thế hệ mới tạo ra đòn bẩy nghề nghiệp cho dân tài chính: người không biết code vẫn có thể đọc tài liệu dài, bóc số liệu, kiểm tra rủi ro và viết báo cáo nếu biết giao việc đúng cách.",
      commonMistake: "Xem AI như công cụ trả lời nhanh thay vì một quy trình làm việc có đầu vào, kiểm tra, phản biện và đầu ra rõ ràng.",
      action: "Chọn một việc đang lặp lại mỗi tuần (đọc tin, tóm tắt BCTC, viết email, chuẩn bị slide) và thiết kế một workflow AI 3 bước cho việc đó.",
    },
    extraSections: [
      { type: "heading", text: "4. Bản Đồ Năng Lực AI Cho Dân Tài Chính" },
      { type: "paragraph", text: "Hãy chia năng lực AI thành 4 tầng. Tầng 1 là đọc hiểu văn bản: tóm tắt báo cáo, biên bản họp, tin tức. Tầng 2 là trích xuất dữ liệu: lấy số từ bảng, chuẩn hóa đơn vị, gom thành bảng. Tầng 3 là phân tích: so sánh tỷ suất, tìm bất thường, giải thích nguyên nhân. Tầng 4 là đóng gói đầu ra: viết memo, báo cáo đầu tư, email gửi sếp hoặc dàn ý slide. Người mới nên bắt đầu từ tầng 1-2 rồi mới giao bài toán định giá phức tạp." },
      { type: "heading", text: "5. Workflow 30 Phút Mẫu: Từ Tin Tức Đến Khuyến Nghị" },
      { type: "paragraph", text: "Bước 1: Dán 3-5 nguồn tin và yêu cầu AI tóm tắt sự kiện, tác động tài chính, bên hưởng lợi/bị thiệt. Bước 2: Yêu cầu AI phân loại tác động ngắn hạn và dài hạn, đồng thời ghi rõ giả định chưa kiểm chứng. Bước 3: Yêu cầu AI viết memo 1 trang gồm kết luận, luận điểm, rủi ro và câu hỏi cần kiểm tra thêm. Cách làm này biến AI thành trợ lý phân tích, còn quyết định cuối cùng vẫn nằm ở bạn." },
      { type: "heading", text: "6. Quy Tắc An Toàn Khi Dùng AI Trong Tài Chính" },
      { type: "paragraph", text: "Không nhập dữ liệu nhạy cảm của khách hàng hoặc thông tin nội bộ chưa công bố vào công cụ AI công khai. Không dùng kết quả AI như khuyến nghị đầu tư tự động. Không để AI tự bịa nguồn, tự thêm số liệu hoặc tự suy đoán chính sách kế toán. Với mọi output có con số, luôn yêu cầu nguồn, trang, kỳ kế toán và công thức tính." },
    ],
    extraQuiz: [
      {
        question: "Khi mới dùng AI trong tài chính, nên bắt đầu từ nhóm tác vụ nào để giảm rủi ro sai số?",
        options: ["Tóm tắt, trích xuất và chuẩn hóa thông tin trước khi giao bài toán định giá phức tạp", "Để AI tự giao dịch cổ phiếu ngay lập tức", "Yêu cầu AI dự đoán chính xác giá ngày mai", "Chỉ hỏi các câu vui không liên quan công việc"],
        correct: 0,
        explanation: "Các tác vụ đọc hiểu và trích xuất dễ kiểm tra hơn. Khi đã quen quy trình kiểm chứng, bạn mới nên giao các bài toán có nhiều giả định như DCF hay khuyến nghị đầu tư.",
      },
      {
        question: "Điều nào là nguyên tắc bảo mật quan trọng khi dùng AI công khai?",
        options: ["Không nhập dữ liệu khách hàng, thông tin nội bộ hoặc tài liệu mật chưa được phép chia sẻ", "Càng dán nhiều dữ liệu mật càng tốt", "Luôn để AI tự nhớ mọi thông tin cá nhân", "Bỏ qua chính sách dữ liệu của công ty"],
        correct: 0,
        explanation: "AI tạo đòn bẩy rất mạnh, nhưng dữ liệu tài chính thường nhạy cảm. Bảo mật và quyền chia sẻ dữ liệu phải đi trước năng suất.",
      },
    ],
  },
  1262: {
    estimatedMinutes: 26,
    duration: "26 phút",
    summary: {
      keyIdea: "R-C-T-O là khung giao việc: nói rõ AI đang đóng vai ai, đang dùng dữ liệu nào, cần làm nhiệm vụ gì và phải trả kết quả theo định dạng nào.",
      commonMistake: "Viết prompt dài nhưng thiếu dữ liệu, thiếu tiêu chí quyết định hoặc không nói rõ format, khiến output nhìn hay nhưng khó dùng.",
      action: "Viết lại 3 câu prompt bạn hay dùng thành R-C-T-O, thêm tiêu chí kiểm chứng và yêu cầu AI nêu giả định.",
    },
    extraSections: [
      { type: "heading", text: "4. Thêm 2 Thành Phần Nâng Cấp: Constraint & Verification" },
      { type: "paragraph", text: "R-C-T-O là nền. Khi làm tài chính, hãy thêm Constraint (ràng buộc) và Verification (kiểm chứng). Constraint là các giới hạn như 'chỉ dùng số liệu trong file', 'không đưa khuyến nghị nếu thiếu EPS', 'đơn vị tỷ đồng'. Verification là yêu cầu AI chỉ ra nguồn, công thức và điểm chưa chắc chắn. Prompt tốt không chỉ tạo câu trả lời hay; nó tạo câu trả lời có thể kiểm toán." },
      { type: "heading", text: "5. Prompt R-C-T-O Cho 3 Vai Trò Tài Chính" },
      { type: "paragraph", text: "Equity Analyst: Role là chuyên viên phân tích cổ phiếu, Context là BCTC và giá thị trường, Task là đánh giá luận điểm đầu tư, Output là memo Mua/Nắm giữ/Bán. Credit Officer: Role là cán bộ tín dụng, Context là thu nhập, nợ, tài sản đảm bảo, Task là đánh giá khả năng trả nợ, Output là bảng rủi ro và đề xuất hạn mức. FP&A: Role là finance business partner, Context là actual vs budget, Task là phân tích variance, Output là top 5 nguyên nhân và hành động." },
      { type: "heading", text: "6. Mẫu Prompt Chuẩn Có Thể Dùng Ngay" },
      { type: "paragraph", text: "[Role] Bạn là Senior Equity Analyst thận trọng.\n[Context] Dữ liệu gồm doanh thu, lợi nhuận sau thuế, OCF, nợ vay và P/E của doanh nghiệp trong 3 năm.\n[Task] Đánh giá chất lượng tăng trưởng, chất lượng lợi nhuận và rủi ro bảng cân đối.\n[Constraint] Chỉ dùng số liệu được cung cấp; nếu thiếu dữ liệu hãy ghi 'Chưa đủ dữ liệu'.\n[Output] Trả lời bằng bảng 4 cột: Hạng mục, Nhận xét, Bằng chứng số liệu, Mức độ rủi ro." },
    ],
    extraQuiz: [
      {
        question: "Vì sao nên thêm phần Constraint vào prompt tài chính?",
        options: ["Để giới hạn nguồn dữ liệu, đơn vị, phạm vi kết luận và giảm nguy cơ AI suy đoán quá đà", "Để prompt trông dài hơn nhưng không có tác dụng", "Để AI không cần trả lời theo dữ liệu", "Để bắt AI luôn khuyến nghị mua"],
        correct: 0,
        explanation: "Constraint giúp AI biết ranh giới của bài toán. Trong tài chính, ranh giới dữ liệu và giả định quan trọng không kém kết quả.",
      },
      {
        question: "Prompt nào có Output tốt nhất?",
        options: ["Xuất bảng gồm Hạng mục, Bằng chứng số liệu, Nhận xét, Rủi ro", "Viết sao cũng được", "Trả lời thật dài", "Chỉ nói tốt hay xấu"],
        correct: 0,
        explanation: "Output dạng bảng có cột bằng chứng giúp người học kiểm tra và tái sử dụng kết quả dễ hơn.",
      },
    ],
  },
  1263: {
    estimatedMinutes: 28,
    duration: "28 phút",
    summary: {
      keyIdea: "AI có thể hỗ trợ DCF tốt nhất khi bạn bắt nó tách giả định, công thức, từng bước tính và bảng nhạy cảm, thay vì chỉ xin một con số target price.",
      commonMistake: "Dùng câu 'hãy nghĩ từng bước' nhưng không yêu cầu kiểm tra công thức, đơn vị và điều kiện Terminal Growth < WACC.",
      action: "Dùng prompt DCF trong bài để chạy một ví dụ, sau đó tự kiểm tra 3 điểm: đơn vị, công thức Terminal Value và sensitivity table.",
    },
    extraSections: [
      { type: "heading", text: "4. Checklist DCF Trước Khi Tin Kết Quả AI" },
      { type: "paragraph", text: "Hãy kiểm tra 5 điểm: FCF đang là FCFF hay FCFE; WACC có cùng loại dòng tiền hay không; tốc độ tăng trưởng dài hạn g có nhỏ hơn WACC không; số năm dự báo có hợp lý với chu kỳ doanh nghiệp không; Enterprise Value đã trừ nợ ròng để ra Equity Value chưa. Nếu một trong 5 điểm này sai, target price có thể đẹp nhưng vô nghĩa." },
      { type: "heading", text: "5. Prompt Sensitivity Table 2 Chiều" },
      { type: "paragraph", text: "Sau khi AI tính case base, hãy yêu cầu: 'Tạo bảng sensitivity 2 chiều với WACC ở hàng ngang gồm 9.5%, 10.0%, 10.5%, 11.0%, 11.5% và terminal growth ở cột dọc gồm 2.0%, 2.5%, 3.0%, 3.5%. Với mỗi ô, tính Enterprise Value và ghi chú vùng định giá nhạy cảm nhất.' Bảng này giúp bạn thấy định giá thay đổi mạnh đến đâu khi giả định hơi lệch." },
      { type: "heading", text: "6. Cách Bắt AI Tự Soát Lỗi Toán" },
      { type: "paragraph", text: "Thêm đoạn: 'Sau khi tính xong, hãy kiểm tra lại bằng cách tính ngược: lấy Enterprise Value trừ Present Value giai đoạn dự báo để suy ra Present Value Terminal Value; đối chiếu với công thức TV = FCF năm cuối x (1+g)/(WACC-g). Nếu phát hiện mâu thuẫn, hãy sửa bảng trước khi kết luận.' Đây là cách biến AI thành người vừa làm vừa tự review." },
    ],
    extraQuiz: [
      {
        question: "Điều kiện nào bắt buộc trong công thức Gordon Growth Terminal Value?",
        options: ["Terminal growth g phải nhỏ hơn WACC", "g luôn lớn hơn WACC", "WACC bằng 0", "Không cần quan tâm WACC"],
        correct: 0,
        explanation: "Nếu g >= WACC, mẫu số WACC - g bằng 0 hoặc âm, khiến Terminal Value phi lý.",
      },
      {
        question: "Bảng sensitivity DCF giúp ích gì?",
        options: ["Cho thấy định giá nhạy thế nào với WACC và tăng trưởng dài hạn", "Đảm bảo cổ phiếu chắc chắn tăng", "Loại bỏ nhu cầu đọc BCTC", "Làm kết quả luôn chính xác tuyệt đối"],
        correct: 0,
        explanation: "DCF rất nhạy với giả định. Sensitivity table giúp bạn không bị mắc kẹt vào một con số duy nhất.",
      },
    ],
  },
  1264: {
    estimatedMinutes: 27,
    duration: "27 phút",
    summary: {
      keyIdea: "AI đọc BCTC tốt nhất khi được giao nhiệm vụ như kiểm toán viên: trích số, đối chiếu kỳ, tìm bất thường và gắn từng kết luận với trang nguồn.",
      commonMistake: "Upload PDF rồi hỏi 'công ty này tốt không' thay vì yêu cầu AI bóc từng rủi ro cụ thể và chỉ rõ bằng chứng.",
      action: "Chọn một BCTC thật và chạy checklist 7 điểm: OCF vs NI, phải thu, tồn kho, nợ vay, bên liên quan, cam kết ngoài bảng và ý kiến kiểm toán.",
    },
    extraSections: [
      { type: "heading", text: "4. Checklist 7 Rủi Ro Cần Quét Trong BCTC" },
      { type: "paragraph", text: "1. Lợi nhuận tăng nhưng OCF âm. 2. Phải thu tăng nhanh hơn doanh thu. 3. Tồn kho tăng nhanh hơn giá vốn. 4. Nợ vay ngắn hạn lớn hơn tiền mặt và dòng tiền. 5. Giao dịch bên liên quan thiếu minh bạch. 6. Cam kết bảo lãnh, thuê tài sản hoặc nghĩa vụ ngoài bảng cân đối. 7. Ý kiến kiểm toán ngoại trừ, nhấn mạnh hoặc thay đổi chính sách kế toán." },
      { type: "heading", text: "5. Prompt Trích Xuất Bảng Số Liệu Có Nguồn" },
      { type: "paragraph", text: "[Role] Bạn là kiểm toán viên cao cấp.\n[Task] Trích các số: Doanh thu, LNST, OCF, tiền mặt, phải thu, tồn kho, nợ vay ngắn hạn, nợ vay dài hạn trong 3 năm gần nhất.\n[Output] Xuất bảng gồm Chỉ tiêu, Năm, Giá trị, Đơn vị, Trang nguồn, Nhận xét thay đổi.\n[Rule] Nếu không tìm thấy chỉ tiêu, ghi 'Không tìm thấy' thay vì tự suy đoán." },
      { type: "heading", text: "6. Cách Đọc Phần Thuyết Minh Bằng AI" },
      { type: "paragraph", text: "Phần thuyết minh thường quan trọng hơn bảng chính vì nó giải thích chất lượng con số: tuổi nợ phải thu, chi tiết vay, tài sản thế chấp, giao dịch bên liên quan, chính sách ghi nhận doanh thu. Hãy yêu cầu AI không tóm tắt chung chung mà phải liệt kê 'điểm bất thường - bằng chứng - câu hỏi cần hỏi ban lãnh đạo'." },
    ],
    extraQuiz: [
      {
        question: "Dấu hiệu nào là cảnh báo chất lượng lợi nhuận?",
        options: ["Lợi nhuận sau thuế dương nhưng dòng tiền kinh doanh âm kéo dài", "Doanh thu và OCF cùng tăng ổn định", "Nợ vay giảm và tiền mặt tăng", "Kiểm toán chấp nhận toàn phần không nhấn mạnh"],
        correct: 0,
        explanation: "Lợi nhuận kế toán có thể dương do ghi nhận doanh thu hoặc khoản phải thu, nhưng OCF âm cho thấy tiền thật chưa về.",
      },
      {
        question: "Khi AI không tìm thấy số liệu trong PDF, câu trả lời an toàn nhất là gì?",
        options: ["Ghi rõ Không tìm thấy dữ liệu và không tự bịa", "Ước lượng đại một con số", "Lấy số từ công ty khác", "Bỏ qua nguồn trang"],
        correct: 0,
        explanation: "Trong tài chính, thiếu dữ liệu phải được nói rõ. Tự bịa số là lỗi nghiêm trọng.",
      },
    ],
  },
  1265: {
    estimatedMinutes: 25,
    duration: "25 phút",
    summary: {
      keyIdea: "AI giúp biến tài liệu ĐHĐCĐ dài thành bản intelligence brief: mục tiêu năm tới, vốn đầu tư, cổ tức, câu hỏi khó và cam kết cụ thể của lãnh đạo.",
      commonMistake: "Chỉ tóm tắt nghị quyết mà bỏ qua phần Q&A, trong khi nhiều tín hiệu thật nằm ở cách ban lãnh đạo trả lời câu hỏi khó.",
      action: "Dùng prompt trong bài để tóm tắt một biên bản ĐHĐCĐ, sau đó tạo danh sách 5 cam kết cần theo dõi trong các quý sau.",
    },
    extraSections: [
      { type: "heading", text: "4. 6 Thông Tin Cần Bóc Từ ĐHĐCĐ" },
      { type: "paragraph", text: "1. Kế hoạch doanh thu và lợi nhuận năm tới. 2. Tỷ lệ cổ tức tiền mặt/cổ phiếu. 3. Capex và dự án tăng trưởng. 4. Kế hoạch phát hành, vay nợ hoặc M&A. 5. Rủi ro lãnh đạo thừa nhận hoặc né tránh. 6. Câu hỏi cổ đông khó nhất và chất lượng câu trả lời. Đây là bộ thông tin giúp bạn đánh giá liệu management có thực tế hay chỉ đang kể câu chuyện đẹp." },
      { type: "heading", text: "5. Prompt Tạo Bảng Cam Kết Theo Dõi" },
      { type: "paragraph", text: "Yêu cầu AI xuất bảng gồm: Cam kết của lãnh đạo, Con số mục tiêu, Thời hạn, Điều kiện để hoàn thành, Rủi ro thất bại, Cách kiểm tra ở quý sau. Ví dụ: nếu lãnh đạo nói 'dự án mới đóng góp 500 tỷ doanh thu từ Q4', quý sau bạn kiểm tra doanh thu theo mảng, tiến độ capex và tồn kho." },
      { type: "heading", text: "6. Cách Tóm Tắt Cuộc Họp Ghi Âm 4 Tiếng" },
      { type: "paragraph", text: "Nếu có transcript, hãy chia theo phần: khai mạc, báo cáo HĐQT, báo cáo ban điều hành, tờ trình, Q&A. Với mỗi phần, yêu cầu AI trích ý chính và câu nói nguyên văn quan trọng. Không nên yêu cầu tóm tắt cả 4 tiếng một lần vì dễ mất chi tiết; hãy tóm tắt theo chương rồi tổng hợp cuối cùng." },
    ],
    extraQuiz: [
      {
        question: "Vì sao phần Q&A ĐHĐCĐ rất quan trọng với nhà đầu tư?",
        options: ["Vì thể hiện câu hỏi khó của cổ đông và cách lãnh đạo phản ứng trước rủi ro thật", "Vì luôn không có thông tin gì", "Vì chỉ để trang trí biên bản", "Vì thay thế hoàn toàn BCTC"],
        correct: 0,
        explanation: "Q&A thường hé lộ vấn đề thị trường quan tâm nhất: dự án chậm, dòng tiền, nợ vay, cổ tức hoặc minh bạch quản trị.",
      },
      {
        question: "Bảng cam kết theo dõi sau ĐHĐCĐ nên có cột nào?",
        options: ["Cam kết, con số mục tiêu, thời hạn, rủi ro và cách kiểm tra ở kỳ sau", "Chỉ tên công ty", "Chỉ logo và màu sắc", "Chỉ lời khen lãnh đạo"],
        correct: 0,
        explanation: "Biến lời nói thành checklist theo dõi giúp bạn kiểm tra ban lãnh đạo có thực hiện đúng cam kết hay không.",
      },
    ],
  },
  1266: {
    estimatedMinutes: 26,
    duration: "26 phút",
    summary: {
      keyIdea: "News sentiment có ích khi nó tách cảm xúc thị trường khỏi tác động kinh tế thật: tin tốt cho giá ngắn hạn chưa chắc tốt cho giá trị dài hạn.",
      commonMistake: "Chỉ hỏi AI tin tích cực hay tiêu cực mà không phân loại nguồn tin, thời hạn tác động và mức độ đã phản ánh vào giá.",
      action: "Dán 5 tin cùng ngành, yêu cầu AI chấm sentiment, phân loại short-term/long-term và nêu câu hỏi cần kiểm chứng bằng số liệu.",
    },
    extraSections: [
      { type: "heading", text: "4. Phân Biệt Sentiment, Catalyst Và Fundamental" },
      { type: "paragraph", text: "Sentiment là cảm xúc hiện tại của thị trường. Catalyst là sự kiện có thể làm thị trường định giá lại, ví dụ ký hợp đồng lớn hoặc thay đổi lãi suất. Fundamental là sức khỏe kinh tế thật của doanh nghiệp. Một tin có thể sentiment rất tốt nhưng fundamental yếu nếu chỉ là kỳ vọng chưa có doanh thu. Prompt tốt phải bắt AI phân loại 3 lớp này." },
      { type: "heading", text: "5. Mẫu Bảng Chấm Điểm Tin Tức" },
      { type: "paragraph", text: "Yêu cầu AI xuất bảng gồm: Nguồn tin, Sự kiện chính, Sentiment -10 đến +10, Tác động doanh thu/lợi nhuận/nợ vay, Thời hạn tác động, Độ tin cậy nguồn, Câu hỏi cần kiểm chứng. Nhờ vậy bạn tránh việc thấy headline tích cực rồi mua đuổi mà chưa biết tác động tài chính thật là bao nhiêu." },
      { type: "heading", text: "6. Quy Tắc Không Đuổi Theo Headline" },
      { type: "paragraph", text: "Nếu sentiment rất tích cực nhưng chưa có con số hợp đồng, biên lợi nhuận, thời gian ghi nhận hoặc xác nhận từ doanh nghiệp, hãy coi đó là tín hiệu theo dõi chứ chưa phải luận điểm đầu tư. Tin tức chỉ là đầu vào; quyết định cần kết hợp định giá, vị thế dòng tiền và quản trị rủi ro." },
    ],
    extraQuiz: [
      {
        question: "Một tin tức có sentiment tích cực nhưng chưa có số liệu doanh thu/lợi nhuận nên được xử lý thế nào?",
        options: ["Xem là tín hiệu theo dõi và yêu cầu kiểm chứng thêm tác động tài chính", "Mua ngay bất kể giá", "Kết luận chắc chắn lợi nhuận tăng", "Bỏ qua mọi rủi ro"],
        correct: 0,
        explanation: "Sentiment tích cực chỉ cho thấy thị trường có thể hưng phấn; nó chưa chứng minh giá trị doanh nghiệp tăng.",
      },
      {
        question: "Cột nào nên có trong bảng chấm điểm sentiment?",
        options: ["Nguồn tin, điểm sentiment, thời hạn tác động, độ tin cậy và câu hỏi kiểm chứng", "Chỉ điểm số", "Chỉ tiêu đề bài báo", "Chỉ tên người viết"],
        correct: 0,
        explanation: "Một điểm sentiment không đủ. Cần biết nguồn, thời hạn và bằng chứng để tránh ra quyết định cảm tính.",
      },
    ],
  },
  1267: {
    estimatedMinutes: 27,
    duration: "27 phút",
    summary: {
      keyIdea: "Custom GPT/Claude Project mạnh nhất khi bạn biến nó thành một hệ thống đầu tư có quy tắc: knowledge base, khẩu vị rủi ro, checklist phản biện và định dạng output cố định.",
      commonMistake: "Tải thật nhiều PDF lên nhưng không viết system instructions rõ ràng, khiến trợ lý riêng trả lời lan man như chatbot thường.",
      action: "Viết system instructions 10 dòng cho trợ lý AI cá nhân: phạm vi, tiêu chí lọc cổ phiếu, điều cấm, format báo cáo và quy tắc trích nguồn.",
    },
    extraSections: [
      { type: "heading", text: "4. Cấu Trúc Một Trợ Lý AI Tài Chính Cá Nhân" },
      { type: "paragraph", text: "Một trợ lý tốt cần 4 lớp: Knowledge Base gồm báo cáo ngành, BCTC, quy trình nội bộ; Investment Policy gồm tiêu chí P/E, ROE, nợ vay, thanh khoản; Response Template gồm format output cố định; Guardrails gồm điều không được làm như bịa số, đưa khuyến nghị khi thiếu dữ liệu hoặc bỏ qua rủi ro." },
      { type: "heading", text: "5. System Instructions Mẫu" },
      { type: "paragraph", text: "Bạn là trợ lý phân tích cổ phiếu thận trọng cho nhà đầu tư dài hạn tại Việt Nam. Chỉ sử dụng dữ liệu trong tài liệu được cung cấp hoặc dữ liệu người dùng nhập. Ưu tiên doanh nghiệp ROE > 15%, nợ/vốn chủ sở hữu < 1.0, OCF dương và định giá không quá cao. Mỗi kết luận phải có bằng chứng. Nếu thiếu dữ liệu, ghi 'Chưa đủ dữ liệu'. Luôn đưa phần rủi ro và câu hỏi cần kiểm chứng trước khi khuyến nghị." },
      { type: "heading", text: "6. Cách Bảo Trì Knowledge Base" },
      { type: "paragraph", text: "Đặt quy tắc cập nhật: báo cáo ngành mỗi quý, BCTC mỗi kỳ công bố, thesis đầu tư sau mỗi sự kiện lớn. Xóa tài liệu cũ nếu nó gây nhiễu hoặc ghi rõ kỳ áp dụng. Một trợ lý AI riêng chỉ tốt khi kho tri thức sạch, có ngày tháng và không lẫn tài liệu lỗi thời với tài liệu mới." },
    ],
    extraQuiz: [
      {
        question: "Vì sao Custom GPT cần system instructions rõ ràng?",
        options: ["Để trợ lý luôn tuân theo khẩu vị rủi ro, nguồn dữ liệu và format phân tích cố định", "Để trả lời dài hơn nhưng kém chính xác", "Để bỏ qua mọi rủi ro", "Để tự động biết mọi dữ liệu mật"],
        correct: 0,
        explanation: "System instructions là bộ luật vận hành. Không có nó, trợ lý riêng dễ trả lời chung chung như chatbot mặc định.",
      },
      {
        question: "Knowledge Base nên được bảo trì thế nào?",
        options: ["Cập nhật theo kỳ, ghi rõ ngày tháng và loại bỏ tài liệu lỗi thời gây nhiễu", "Tải mọi file tìm được lên không cần phân loại", "Không bao giờ cập nhật", "Chỉ dùng tài liệu cũ nhất"],
        correct: 0,
        explanation: "AI phụ thuộc vào dữ liệu nền. Tài liệu cũ hoặc lẫn lộn có thể làm kết luận sai.",
      },
    ],
  },
  1268: {
    estimatedMinutes: 27,
    duration: "27 phút",
    summary: {
      keyIdea: "AI viết báo cáo tốt khi được cấp cấu trúc investment memo rõ ràng: thesis, evidence, valuation, risks, recommendation và slide storyline.",
      commonMistake: "Yêu cầu AI viết báo cáo đẹp nhưng không cung cấp số liệu, tiêu chí khuyến nghị hoặc audience, khiến bài đọc trôi chảy nhưng thiếu chất phân tích.",
      action: "Dùng template trong bài để tạo one-pager cho một cổ phiếu, sau đó yêu cầu AI tự phản biện 5 câu hỏi hội đồng đầu tư có thể hỏi.",
    },
    extraSections: [
      { type: "heading", text: "3. Cấu Trúc One-Pager Chuẩn Cho Equity Research" },
      { type: "paragraph", text: "Một one-pager tốt nên có 6 phần: Recommendation (Mua/Nắm giữ/Bán), Target Price và upside/downside, 3 luận điểm đầu tư, bảng chỉ số tài chính chính, định giá so sánh/DCF, rủi ro và catalyst. AI có thể viết nhanh, nhưng bạn phải ép nó gắn mỗi luận điểm với bằng chứng số liệu thay vì câu văn marketing." },
      { type: "heading", text: "4. Prompt Tự Phản Biện Báo Cáo" },
      { type: "paragraph", text: "Sau khi AI viết báo cáo, hỏi tiếp: 'Hãy đóng vai Investment Committee khó tính. Chỉ ra 5 điểm yếu nhất trong báo cáo trên, dữ liệu nào còn thiếu, giả định nào quá lạc quan, và câu hỏi nào analyst phải trả lời trước khi khuyến nghị được duyệt.' Bước phản biện này thường giá trị hơn bản nháp đầu tiên." },
      { type: "heading", text: "5. Chuyển Thành Slide Storyline" },
      { type: "paragraph", text: "Slide không nên bê nguyên báo cáo. Hãy chuyển thành câu chuyện 5 trang: 1. Kết luận đầu tư. 2. Vì sao cơ hội xuất hiện. 3. Bằng chứng tài chính. 4. Định giá và kịch bản. 5. Rủi ro và quyết định cần phê duyệt. Mỗi slide chỉ nên có một thông điệp chính và một biểu đồ/bảng hỗ trợ." },
    ],
    extraQuiz: [
      {
        question: "Sau khi AI viết xong báo cáo đầu tư, bước nào giúp nâng chất lượng mạnh nhất?",
        options: ["Yêu cầu AI đóng vai hội đồng đầu tư và phản biện giả định, dữ liệu thiếu, rủi ro", "Đổi màu chữ", "Xóa hết phần rủi ro", "Chỉ thêm lời khen doanh nghiệp"],
        correct: 0,
        explanation: "Bản nháp đầu thường trơn tru nhưng có thể thiên lệch. Phản biện giúp tìm lỗ hổng trước khi trình bày thật.",
      },
      {
        question: "Slide thuyết trình từ báo cáo nên được thiết kế theo nguyên tắc nào?",
        options: ["Mỗi slide một thông điệp chính, có bảng/biểu đồ hỗ trợ", "Nhồi toàn bộ báo cáo vào từng slide", "Không cần kết luận đầu tư", "Chỉ dùng chữ thật nhỏ"],
        correct: 0,
        explanation: "Slide là công cụ thuyết phục, không phải bản sao của báo cáo văn bản.",
      },
    ],
  },
  1269: {
    estimatedMinutes: 28,
    duration: "28 phút",
    summary: {
      keyIdea: "Chống hallucination không phải một câu thần chú đơn lẻ mà là quy trình: giới hạn nguồn, trích dẫn, đối soát, kiểm toán công thức và ghi rõ phần chưa chắc chắn.",
      commonMistake: "Chỉ yêu cầu AI 'đừng bịa' nhưng vẫn cho phép nó tự suy luận số liệu không có trong tài liệu.",
      action: "Thêm khối Source-Locked Prompt vào mọi prompt tài chính quan trọng và yêu cầu output có cột nguồn trang/dòng.",
    },
    extraSections: [
      { type: "heading", text: "4. Source-Locked Prompt Mẫu" },
      { type: "paragraph", text: "Chỉ sử dụng thông tin trong tài liệu đính kèm và dữ liệu tôi nhập trong prompt này. Không sử dụng kiến thức ngoài nếu không được yêu cầu. Với mỗi con số, ghi nguồn theo format [Tài liệu, Trang, Dòng/Bảng]. Nếu không tìm thấy, ghi 'Không tìm thấy trong tài liệu'. Nếu phải suy luận, tách riêng mục 'Suy luận' và ghi mức độ tin cậy Thấp/Trung bình/Cao." },
      { type: "heading", text: "5. 5 Dạng Hallucination Tài Chính Phổ Biến" },
      { type: "paragraph", text: "1. Bịa số liệu doanh thu/lợi nhuận. 2. Nhầm đơn vị triệu, tỷ, USD, VND. 3. Lấy số năm khác nhưng nói là năm hiện tại. 4. Tự thêm sự kiện doanh nghiệp chưa công bố. 5. Dùng công thức đúng nhưng áp sai mẫu số hoặc sai loại dòng tiền. Mỗi dạng lỗi này đều có thể dẫn tới quyết định đầu tư sai." },
      { type: "heading", text: "6. Quy Trình Review Output AI" },
      { type: "paragraph", text: "Bước 1: Kiểm tra 5 con số quan trọng nhất với tài liệu gốc. Bước 2: Kiểm tra đơn vị và kỳ kế toán. Bước 3: Kiểm tra công thức. Bước 4: Tìm kết luận nào không có bằng chứng. Bước 5: Yêu cầu AI viết lại phần kết luận với mức độ tự tin và dữ liệu còn thiếu. Đây là quy trình tối thiểu trước khi gửi output cho sếp hoặc khách hàng." },
    ],
    extraQuiz: [
      {
        question: "Source-Locked Prompt nghĩa là gì?",
        options: ["Buộc AI chỉ dùng nguồn được cung cấp và ghi rõ nguồn cho từng con số", "Cho AI tự tìm và tự bịa nguồn", "Không cần tài liệu", "Chỉ hỏi cảm tính"],
        correct: 0,
        explanation: "Khóa nguồn giúp giảm hallucination, nhất là khi làm việc với BCTC, hợp đồng hoặc báo cáo phân tích.",
      },
      {
        question: "Một dạng hallucination tài chính phổ biến là gì?",
        options: ["Nhầm đơn vị triệu, tỷ, USD hoặc VND", "Trả lời có bảng rõ ràng", "Ghi Không tìm thấy dữ liệu", "Yêu cầu người dùng cung cấp thêm nguồn"],
        correct: 0,
        explanation: "Nhầm đơn vị có thể làm kết quả sai hàng nghìn lần, nên phải kiểm tra rất kỹ.",
      },
    ],
  },
  1270: {
    estimatedMinutes: 30,
    duration: "30 phút",
    summary: {
      keyIdea: "Prompt Library không chỉ là danh sách câu lệnh; đó là hệ thống vận hành cá nhân gồm template, biến đầu vào, checklist kiểm chứng và phiên bản cải tiến theo thời gian.",
      commonMistake: "Lưu nhiều prompt rời rạc nhưng không phân loại theo tác vụ, không có biến cần thay và không ghi prompt nào dùng hiệu quả.",
      action: "Tạo thư viện 5 nhóm prompt: BCTC, định giá, tin tức, tín dụng, báo cáo/slide; mỗi prompt có mục input, output, checklist kiểm chứng.",
    },
    extraSections: [
      { type: "heading", text: "3. Cách Thiết Kế Prompt Library Cá Nhân" },
      { type: "paragraph", text: "Mỗi prompt nên có 5 phần: Tên tác vụ, Khi nào dùng, Input cần chuẩn bị, Prompt mẫu, Checklist kiểm chứng output. Ví dụ với prompt đọc BCTC, input là file PDF và kỳ báo cáo; output là bảng rủi ro; checklist là nguồn trang, đơn vị, OCF vs NI, nợ vay và giao dịch bên liên quan." },
      { type: "heading", text: "4. 20 Prompt Nên Có Trong Thư Viện" },
      { type: "paragraph", text: "Nhóm BCTC: trích số liệu, phân tích OCF vs NI, tìm rủi ro thuyết minh, so sánh 3 năm. Nhóm định giá: P/E nhanh, DCF, sensitivity, so sánh peer. Nhóm tin tức: sentiment, catalyst, tác động ngắn/dài hạn. Nhóm tín dụng: debt service, tài sản đảm bảo, rủi ro ngành. Nhóm báo cáo: one-pager, slide outline, email cho sếp, phản biện investment committee." },
      { type: "heading", text: "5. Cách Cải Tiến Prompt Theo Phiên Bản" },
      { type: "paragraph", text: "Đặt version cho prompt như v1, v2, v3. Sau mỗi lần dùng, ghi lỗi output: thiếu nguồn, trả lời dài, quên đơn vị, chưa đủ rủi ro. Sau đó sửa prompt bằng cách thêm constraint hoặc output format. Một prompt tốt thường không sinh ra trong lần đầu; nó được mài qua nhiều lần dùng thật." },
    ],
    extraQuiz: [
      {
        question: "Một prompt trong thư viện cá nhân nên có gì ngoài câu lệnh chính?",
        options: ["Input cần chuẩn bị, output mong muốn và checklist kiểm chứng", "Chỉ tên thật dài", "Chỉ màu sắc trang trí", "Không cần phân loại"],
        correct: 0,
        explanation: "Prompt có checklist giúp bạn dùng lặp lại ổn định và giảm lỗi khi bận.",
      },
      {
        question: "Vì sao nên version prompt theo v1, v2, v3?",
        options: ["Để cải tiến dựa trên lỗi output thực tế sau mỗi lần dùng", "Để làm thư viện phức tạp vô ích", "Để xóa prompt tốt", "Để không cần kiểm chứng nữa"],
        correct: 0,
        explanation: "Prompt library là hệ thống sống. Versioning giúp bạn biến kinh nghiệm sử dụng thành quy trình tốt hơn.",
      },
    ],
  },
};

for (const lesson of lessons) {
  const enhancement = enhancements[lesson.id];
  if (!enhancement) continue;

  lesson.estimatedMinutes = enhancement.estimatedMinutes;
  lesson.duration = enhancement.duration;
  lesson.summary = enhancement.summary;
  lesson.application = {
    ...lesson.application,
    message: enhancement.summary.action,
  };
  lesson.keyTakeaways = [
    enhancement.summary.keyIdea,
    enhancement.summary.commonMistake,
    enhancement.summary.action,
  ];

  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  const closingIndex = sections.findIndex((section) => section.type === "closing");
  lesson.sections =
    closingIndex === -1
      ? [...sections, ...enhancement.extraSections]
      : [
          ...sections.slice(0, closingIndex),
          ...enhancement.extraSections,
          ...sections.slice(closingIndex),
        ];

  lesson.quiz = [...(Array.isArray(lesson.quiz) ? lesson.quiz : []), ...enhancement.extraQuiz];
}

writeFileSync(
  lessonsPath,
  `import type { Lesson } from "./lesson-types";\n\nexport const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`,
);

console.log("Enhanced AI lessons 1261-1270.");
