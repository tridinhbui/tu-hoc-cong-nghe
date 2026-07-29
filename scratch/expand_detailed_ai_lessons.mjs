import fs from 'fs';
import path from 'path';

const expandedLessons = [
  {
    id: 1261,
    day: 1261,
    slug: "tong-quan-ai-in-finance-khong-can-code",
    title: "Nhập môn AI in Finance Không Cần Code: Bức Tranh Tổng Quan 2026",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 16,
    subtitle: "Khám phá cách người không chuyên lập trình làm chủ AI (ChatGPT, Claude, DeepSeek) để xử lý 80% công việc tài chính",
    practicePrompt: {
      question: "Lợi ích lớn nhất của chuyên viên tài chính Không Chuyên Tech (Non-Tech) khi ứng dụng các trợ lý AI thế hệ mới (ChatGPT / Claude / DeepSeek) là gì?",
      options: [
        "Không cần học lập trình Python/R phức tạp vẫn có thể tự động hóa đọc tài liệu, phân tích số liệu và lập báo cáo tài chính bằng ngôn ngữ tự nhiên",
        "Có thể nghỉ làm hoàn toàn để AI tự kiếm tiền thay",
        "Chỉ áp dụng được cho công việc thiết kế đồ họa",
        "Giúp giá cổ phiếu của công ty luôn luôn tăng gấp đôi"
      ],
      correct: 0,
      explanation: "Nhờ sự trỗi dậy của các Large Language Models (LLMs), dân tài chính không chuyên IT chỉ cần nói chuyện và ra lệnh bằng tiếng Việt/tiếng Anh thông thường (Prompting) là có thể bắt AI xử lý các bài toán tài chính phức tạp thay mình."
    },
    summary: {
      keyIdea: "AI thế hệ mới biến mọi chuyên viên tài chính thành một 'Siêu nhân công nghệ' mà không cần viết 1 dòng code nào - chìa khóa nằm ở tư duy ra lệnh (Prompt Engineering).",
      commonMistake: "Nghĩ rằng phải là dân lập trình hay khoa học dữ liệu thì mới ứng dụng được AI vào công việc tài chính ngân hàng.",
      action: "Cài đặt và trải nghiệm ngay các công cụ AI phổ biến như ChatGPT, Claude 3.5 Sonnet hoặc DeepSeek R1 cho công việc hàng ngày."
    },
    application: {
      title: "Ứng dụng thực tế cho Dân Tài chính Non-Tech",
      message: "Thử giao cho AI nhiệm vụ tóm tắt 1 bài báo phân tích thị trường dài 3 trang và yêu cầu xuất ra 3 ý chính dạng gạch đầu dòng.",
      secondary: "Làm chủ tư duy ứng dụng AI giúp bạn tiết kiệm 2-3 giờ làm việc thủ công mỗi ngày."
    },
    sections: [
      {
        type: "lead",
        text: "Kỷ nguyên AI hiện đại mở ra cơ hội bình đẳng chưa từng có: Bạn không cần bằng CNTT hay biết viết code Python vẫn có thể bắt AI làm việc như một trợ lý tài chính cao cấp."
      },
      {
        type: "heading",
        text: "1. Sự Khác Biệt Giữa AI Cổ Điển & Generative AI (LLMs)"
      },
      {
        type: "paragraph",
        text: "Trước năm 2023, ứng dụng AI vào tài chính là 'đặc quyền' của các kỹ sư lập trình Quant. Bạn phải viết hàng trăm dòng code Python, xử lý ma trận toán học phức tạp. Nhưng từ năm 2026, các mô hình Generative AI (ChatGPT, Claude 3.5 Sonnet, DeepSeek R1) cho phép bạn giao tiếp trực tiếp bằng tiếng Việt hoặc tiếng Anh tự nhiên."
      },
      {
        type: "heading",
        text: "2. 5 Nhóm Tác Vụ AI Làm Thay Bạn Hàng Ngày"
      },
      {
        type: "paragraph",
        text: "• Trích xuất dữ liệu BCTC: Tải file PDF 50 trang vào AI, yêu cầu lọc nhanh bảng Cân đối kế toán.\n• Phân tích rủi ro kế toán: Tự động soi mục Thuyết minh để tìm nợ xấu và các khoản nợ tiềm tàng.\n• Định giá cổ phiếu tự động: Nhập giả định P/E, WACC để AI chạy mô hình định giá từng bước.\n• Phân tích tâm lý thị trường: Quét tin tức Bloomberg, VnExpress để chấm điểm lạc quan/bi quan.\n• Viết báo cáo khuyến nghị: Xuất bản báo cáo 1 trang (One-pager) và dàn ý Slide thuyết trình."
      },
      {
        type: "heading",
        text: "3. Mẫu Prompt Nhập Môn 'Copy-Paste Dùng Ngay'"
      },
      {
        type: "paragraph",
        text: "Dán câu lệnh sau vào ChatGPT hoặc Claude để dùng ngay:\n'Bạn là chuyên viên phân tích tài chính cao cấp. Hãy đọc bài viết sau [Dán link/văn bản] và cho tôi biết: (1) 3 điểm sáng tài chính; (2) 2 rủi ro cần theo dõi; (3) Tác động tới giá cổ phiếu ngắn hạn dưới dạng 3 gạch đầu dòng ngắn gọn.'"
      },
      {
        type: "closing",
        lines: [
          "AI không thay thế bạn, nhưng người biết ra lệnh cho AI sẽ thay thế người không biết dùng AI.",
          "Chìa khóa thành công duy nhất của dân Non-Tech là kỹ năng Prompt Engineering (Kỹ thuật ra lệnh cho AI)."
        ]
      }
    ]
  },
  {
    id: 1262,
    day: 1262,
    slug: "ky-thuat-prompt-engineering-can-ban-danh-cho-dan-tai-chinh",
    title: "Kỹ thuật Prompt Engineering Căn Bản: Khung R-C-T-O Thần Thánh",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 16,
    subtitle: "Làm chủ công thức câu lệnh 4 thành phần để AI đưa ra câu trả lời chuẩn xác 100% cho bài toán tài chính",
    practicePrompt: {
      question: "Công thức ra lệnh Prompt R-C-T-O dành cho dân tài chính bao gồm 4 thành phần cốt lõi nào?",
      options: [
        "Role (Vai trò AI) - Context (Ngữ cảnh dữ liệu) - Task (Nhiệm vụ cụ thể) - Output (Định dạng đầu ra)",
        "Read - Write - Calculate - Delete",
        "Run - Code - Test - Optimize",
        "Risk - Capital - Tax - Opportunity"
      ],
      correct: 0,
      explanation: "Khung R-C-T-O: Role (Bắt AI đóng vai chuyên gia) + Context (Cung cấp số liệu BCTC/ngữ cảnh) + Task (Nhiệm vụ tính toán/đánh giá) + Output (Yêu cầu bảng biểu/gạch đầu dòng) giúp AI hiểu chính xác 100% ý định."
    },
    summary: {
      keyIdea: "Một câu lệnh Prompt sơ sài sẽ cho ra kết quả chung chung. Cung cấp đủ Vai trò, Ngữ cảnh và Định dạng sẽ giúp AI trả lời chuẩn xác như chuyên gia.",
      commonMistake: "Nhập câu lệnh quá ngắn như 'Hãy phân tích cổ phiếu FPT' khiến AI đưa ra câu trả lời lý thuyết sáo rỗng.",
      action: "Áp dụng ngay công thức R-C-T-O vào câu hỏi tiếp theo bạn đặt cho ChatGPT hoặc Claude."
    },
    application: {
      title: "Ứng dụng Công thức R-C-T-O Thực Tế",
      message: "Ví dụ Prompt chuẩn: 'Bạn là Giám đốc Tài chính (Role). Dựa trên số liệu OCF=100 tỷ, Ni=120 tỷ năm 2025 (Context). Hãy đánh giá chất lượng dòng tiền (Task). Xuất ra dưới dạng 3 nhận xét ngắn (Output).'",
      secondary: "Nắm chắc khung R-C-T-O là nền tảng để bạn làm chủ mọi công cụ AI hiện tại và tương lai."
    },
    sections: [
      {
        type: "lead",
        text: "Prompt Engineering không phải là lập trình máy tính - đó là nghệ thuật giao tiếp và đặt câu hỏi thông minh để điều khiển trí tuệ nhân tạo."
      },
      {
        type: "heading",
        text: "1. Chi Tiết 4 Thành Phần Của Khung R-C-T-O"
      },
      {
        type: "paragraph",
        text: "• Role (Vai trò): Định hình tư duy cho AI. Ví dụ: 'Bạn là Trưởng phòng Thẩm định Tín dụng Ngân hàng'.\n• Context (Ngữ cảnh): Dữ liệu BCTC, số liệu lợi nhuận, hoàn cảnh vĩ mô.\n• Task (Nhiệm vụ): Yêu cầu hành động rõ ràng như 'Tính tỷ lệ nợ/vốn' hoặc 'Đánh giá khả năng trả nợ'.\n• Output (Định dạng): Quy định định dạng trả về: Bảng Excel, 3 gạch đầu dòng, hoặc báo cáo 1 trang."
      },
      {
        type: "heading",
        text: "2. So Sánh Prompt Dở vs Prompt Chuẩn R-C-T-O"
      },
      {
        type: "paragraph",
        text: "• Prompt dở: 'Cổ phiếu VNM có mua được không?' ➔ AI trả lời lý thuyết chung chung 500 từ.\n• Prompt chuẩn R-C-T-O: '[Role]: Giám đốc Quỹ. [Context]: VNM doanh thu 60.000 tỷ, cổ tức 8%/năm. [Task]: Đánh giá xem VNM có phù hợp cho danh mục phòng thủ không. [Output]: Trả lời Ngắn/Dài hạn dưới dạng 2 bảng so sánh.' ➔ AI trả lời sắc bén như chuyên gia."
      },
      {
        type: "heading",
        text: "3. Kỹ Thuật Giao Bài Tập Theo Từng Nấc (Step-by-Step Instruction)"
      },
      {
        type: "paragraph",
        text: "Thay vì dồn 10 câu hỏi vào 1 Prompt làm AI bị rối, hãy chia nhỏ quy trình làm việc thành các bước nối tiếp: Bước 1 lọc số liệu ➔ Bước 2 tính chỉ số ➔ Bước 3 đưa ra kết luận."
      },
      {
        type: "closing",
        lines: [
          "Prompt càng chi tiết và rõ ràng, kết quả AI trả về càng sắc bén và hữu ích.",
          "Hãy coi AI như một người thực tập sinh tài năng nhưng cần được giao nhiệm vụ rõ ràng."
        ]
      }
    ]
  },
  {
    id: 1263,
    day: 1263,
    slug: "prompt-nang-cao-cot-dinh-gia-co-phieu-tu-dong",
    title: "Prompt Nâng Cao: Chain-of-Thought (CoT) & Tự Động Định Giá Cổ Phiếu",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 17,
    subtitle: "Ép AI suy luận từng bước toán học để tự chạy mô hình định giá DCF & P/E mà không lo tính sai",
    practicePrompt: {
      question: "Kỹ thuật Prompt 'Chain-of-Thought' (Chuỗi suy luận) giúp giải quyết triệt để rủi ro tính toán sai của AI như thế nào?",
      options: [
        "Bắt AI giải thích chi tiết từng bước tính toán (Step-by-Step) trước khi đưa ra kết quả cuối cùng, giúp phát hiện và tự sửa lỗi logic toán học",
        "Ép AI phải trả lời thật nhanh trong 1 giây",
        "Tự động nhân đôi mọi con số định giá cổ phiếu",
        "Bắt AI copy lại toàn bộ sách giáo khoa"
      ],
      correct: 0,
      explanation: "Khi thêm câu thần chú 'Hãy suy luận và tính toán chi tiết từng bước một (Let's think step by step)', AI sẽ kích hoạt cơ chế Chain-of-Thought, giúp phép tính định giá DCF/PE chính xác và dễ kiểm tra."
    },
    summary: {
      keyIdea: "Kỹ thuật Chain-of-Thought biến AI từ một công cụ đoán chữ thành một máy tính tài chính có tư duy logic theo từng bước.",
      commonMistake: "Yêu cầu AI đưa ra ngay con số định giá hợp lý mà không bắt giải thích các giả định WACC, tốc độ tăng trưởng g.",
      action: "Sử dụng mẫu Prompt định giá DCF từng bước được cung cấp trong bài học để kiểm tra định giá cho cổ phiếu bạn đang quan tâm."
    },
    application: {
      title: "Ứng dụng Thực Hành Định Giá Cổ Phiếu",
      message: "Thử nhập số liệu FCF = 500 tỷ, WACC = 10%, g = 3% vào Prompt Chain-of-Thought và kiểm tra lại công thức định giá tự động của AI.",
      secondary: "Kỹ thuật Chain-of-Thought giúp bạn hoàn toàn làm chủ các con số định giá mà không sợ bị mô hình AI 'qua mặt'."
    },
    sections: [
      {
        type: "lead",
        text: "Điểm yếu lớn nhất của AI khi làm toán là nhảy ngay đến kết quả mà bỏ qua các bước trung gian. Kỹ thuật Chain-of-Thought ra đời để khắc phục triệt để điều này."
      },
      {
        type: "heading",
        text: "1. Câu Thần Chú 'Chain-of-Thought'"
      },
      {
        type: "paragraph",
        text: "Khi dán số liệu BCTC vào AI, luôn thêm câu thần chú: 'Hãy suy luận và tính toán từng bước một (Let's think step-by-step). Hãy trình bày phép tính trung gian trước khi đưa ra đáp số cuối cùng'."
      },
      {
        type: "heading",
        text: "2. Mẫu Prompt Định Giá Cổ Phiếu DCF Thực Chiến"
      },
      {
        type: "paragraph",
        text: "[Role]: Chuyên viên Định giá Quỹ.\n[Context]: Cổ phiếu FPT có FCF_2025 = 4.500 tỷ. Tăng trưởng FCF 3 năm tới là 12%/năm. WACC = 10.5%, g = 3%.\n[Task]: Áp dụng mô hình chiết khấu dòng tiền DCF. Hãy suy luận từng bước (Step-by-Step):\n• Bước 1: Tính FCF từ năm 2026 đến 2028 và chiết khấu về hiện tại.\n• Bước 2: Tính Giá trị còn lại Terminal Value.\n• Bước 3: Tổng hợp Enterprise Value.\n[Output]: Xuất ra bảng kết quả từng bước rõ ràng."
      },
      {
        type: "heading",
        text: "3. Thẩm Định Giả Định (Sensitivity Analysis)"
      },
      {
        type: "paragraph",
        text: "Sau khi AI định giá xong, bạn chỉ cần ra lệnh tiếp: 'Hãy chạy cho tôi bảng phân tích độ nhạy (Sensitivity Table) nếu WACC thay đổi từ 9.5% đến 11.5% và g thay đổi từ 2.5% đến 3.5%'. AI sẽ vẽ bảng 2 chiều ngay lập tức!"
      },
      {
        type: "closing",
        lines: [
          "Chain-of-Thought là chìa khóa để xử lý các bài toán tài chính tính toán phức tạp bằng AI.",
          "Luôn dành 1 phút để kiểm tra lại các giả định đầu vào của mô hình."
        ]
      }
    ]
  },
  {
    id: 1264,
    day: 1264,
    slug: "doc-boc-tach-bctc-trong-30-giay-voi-ai",
    title: "Đọc & Bóc Tách Báo Cáo Tài Chính (PDF 10-K, BCTC) Trong 30 Giây Với AI",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 16,
    subtitle: "Tuyệt chiêu Upload file PDF BCTC lên ChatGPT/Claude để tự động lọc 5 rủi ro kế toán & điểm bất thường",
    practicePrompt: {
      question: "Khi Upload file PDF Báo cáo tài chính quý 50 trang vào AI, Prompt nào giúp bạn phát hiện nhanh nhất các rủi ro kế toán ẩn giấu?",
      options: [
        "Quét toàn bộ Thuyết minh BCTC và liệt kê 5 điểm thay đổi bất thường nhất về các khoản phải thu, nợ vay và chính sách ghi nhận doanh thu",
        "Hãy đọc cho tôi nghe toàn bộ 50 trang từ đầu đến cuối",
        "Tự động xóa bỏ phần nợ phải trả trên bảng cân đối",
        "Tóm tắt BCTC thành 1 từ duy nhất"
      ],
      correct: 0,
      explanation: "Prompt tập trung vào mục Thuyết minh (Notes) và yêu cầu lọc 'Top 5 biến động bất thường' giúp AI bỏ qua các con số tiêu chuẩn và xoáy thẳng vào rủi ro kế toán quan trọng nhất."
    },
    summary: {
      keyIdea: "AI giúp dân tài chính Non-Tech bỏ qua công đoạn đọc lướt 50 trang PDF thủ công, đi thẳng vào các thuyết minh rủi ro trọng yếu.",
      commonMistake: "Tải file PDF quét (Scan) chất lượng quá mờ khiến AI bị đọc sai chữ số.",
      action: "Sử dụng tính năng Attach File của Claude 3.5 Sonnet hoặc ChatGPT Plus để đọc thử BCTC mới nhất của doanh nghiệp bạn đầu tư."
    },
    application: {
      title: "Ứng dụng trong Thẩm định BCTC & Đầu tư",
      message: "Thực hành upload BCTC và dùng Prompt: 'Lọc cho tôi toàn bộ các khoản nợ vay đến hạn trả trong 12 tháng tới và so sánh với lượng tiền mặt hiện có.'",
      secondary: "Kỹ năng này giúp bạn tiết kiệm 90% thời gian đọc báo cáo tài chính mỗi mùa ra BCTC."
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi mùa BCTC ra đời, hàng nghìn trang báo cáo tài chính phát hành khiến các nhà phân tích quá tải. AI chính là kính lọc thông tin siêu tốc cho bạn."
      },
      {
        type: "heading",
        text: "1. 3 Bước Upload & Đọc File BCTC PDF"
      },
      {
        type: "paragraph",
        text: "• Bước 1: Tải file BCTC kiểm toán PDF từ Vietstock / Cafef.\n• Bước 2: Bấm biểu tượng đính kèm (Paperclip) trên ChatGPT hoặc Claude 3.5 Sonnet.\n• Bước 3: Dán Prompt chuyên dụng lọc thông tin."
      },
      {
        type: "heading",
        text: "2. Mẫu Prompt 'Soi' Rủi Ro Kế Toán Ẩn Giấu"
      },
      {
        type: "paragraph",
        text: "[Role]: Kiểm toán viên cao cấp.\n[Context]: File BCTC đính kèm.\n[Task]: Đọc kỹ phần Thuyết minh BCTC và trả lời 3 câu hỏi:\n1. Các khoản Phải thu ngắn hạn có tăng bất thường so với Doanh thu không?\n2. Nợ vay ngắn hạn đến hạn trả trong 12 tháng tới là bao nhiêu? Tiền mặt hiện có đủ trả không?\n3. Có giao dịch nào đáng chú ý với các Bên liên quan không?\n[Output]: Xuất kết quả dưới dạng 3 mục màu đỏ nếu có rủi ro."
      },
      {
        type: "heading",
        text: "3. Tuyệt Chiêu Đối Chiếu Lợi Nhuận vs Dòng Tiền (OCF)"
      },
      {
        type: "paragraph",
        text: "Ra lệnh tiếp cho AI: 'Tính tỷ lệ Dòng tiền hoạt động kinh doanh (OCF) trên Lợi nhuận sau thuế (NI) trong 3 năm qua. Nếu OCF/NI < 0.8, hãy đưa ra lời cảnh báo về chất lượng lợi nhuận'."
      },
      {
        type: "closing",
        lines: [
          "Bóc tách BCTC tự động giúp bạn đi trước thị trường trong việc phát hiện cơ hội và rủi ro.",
          "Luôn đối chiếu lại số liệu AI trích xuất với trang BCTC gốc khi ra quyết định lớn."
        ]
      }
    ]
  },
  {
    id: 1265,
    day: 1265,
    slug: "tom-tat-bien-ban-dhdcd-trong-1-phut",
    title: "Tóm Tắt Biên Bản ĐHĐCĐ & Tài Liệu Cuộc Họp 4 Tiếng Trong 1 Phút",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 15,
    subtitle: "Rút gọn văn bản họp ĐHĐCĐ, ghi âm cuộc họp thành 5 thông điệp lãnh đạo & kế hoạch chia cổ tức",
    practicePrompt: {
      question: "Để trích xuất được những thông tin 'đắt giá' nhất từ tài liệu ĐHĐCĐ kéo dài hàng chục trang, bạn nên yêu cầu AI tập trung vào yếu tố nào?",
      options: [
        "Kế hoạch doanh thu/lợi nhuận năm tới, tỷ lệ chia cổ tức, kế hoạch tăng vốn M&A và các câu hỏi gắt gao nhất từ phía cổ đông",
        "Liệt kê danh sách tất cả cổ đông tham dự cuộc họp",
        "Đếm xem từ 'cảm ơn' xuất hiện bao nhiêu lần trong tài liệu",
        "Bỏ qua toàn bộ phần trả lời của Ban Giám đốc"
      ],
      correct: 0,
      explanation: "Các thông tin nhạy cảm và quan trọng nhất của ĐHĐCĐ luôn nằm ở phần Kế hoạch kinh doanh, Cổ tức, M&A và phần Q&A trực tiếp giữa Ban lãnh đạo với Cổ đông."
    },
    summary: {
      keyIdea: "AI giúp chuyển đổi hàng giờ nghe ghi âm hoặc đọc biên bản ĐHĐCĐ thành bản tóm tắt chiến lược gọn gàng trong 1 trang màn hình.",
      commonMistake: "Tóm tắt quá chung chung do không quy định các mục tiêu thông tin cần trích xuất cụ thể trong Prompt.",
      action: "Sử dụng AI để tóm tắt Nghị quyết ĐHĐCĐ gần nhất của một doanh nghiệp niêm yết bạn đang theo dõi."
    },
    application: {
      title: "Ứng dụng trong Phân Tích Doanh Nghiệp",
      message: "Dùng Prompt: 'Trích xuất 3 thách thức lớn nhất mà Ban lãnh đạo FPT chia sẻ trong phiên thảo luận với cổ đông.'",
      secondary: "Nắm bắt thần tốc thông điệp từ ban lãnh đạo giúp bạn đánh giá chuẩn xác tầm nhìn và tính minh bạch của doanh nghiệp."
    },
    sections: [
      {
        type: "lead",
        text: "Các kỳ Đại hội đồng cổ đông (ĐHĐCĐ) chứa đựng lượng thông tin vô giá về định hướng tương lai, nhưng rất ít người có đủ thời gian theo dõi trọn vẹn."
      },
      {
        type: "heading",
        text: "1. 4 Trụ Cột Thông Tin Cần Rút Gọn Từ ĐHĐCĐ"
      },
      {
        type: "paragraph",
        text: "• Kế hoạch Kinh doanh: Target Doanh thu & Lợi nhuận sau thuế năm mới.\n• Chính sách Cổ tức: Tỷ lệ cổ tức tiền mặt vs cổ tức cổ phiếu, thời gian chi trả.\n• Hoạt động M&A & Dự án mới: Mở rộng nhà máy, phát hành thêm cổ phiếu.\n• Phiên Q&A Thảo luận: Những câu hỏi hóc húa của quỹ đầu tư và câu trả lời của Chủ tịch."
      },
      {
        type: "heading",
        text: "2. Mẫu Prompt Bóc Tách Biên Bản ĐHĐCĐ Super Fast"
      },
      {
        type: "paragraph",
        text: "[Role]: Chuyên viên Phân tích Đầu tư Quỹ.\n[Context]: Biên bản / Tài liệu ĐHĐCĐ đính kèm.\n[Task]: Đọc và tóm tắt thành 4 phần:\n1. Kế hoạch Lợi nhuận năm tới (So sánh % với năm trước).\n2. Tỷ lệ cổ tức tiền mặt.\n3. 3 Dự án động lực tăng trưởng mới.\n4. Tóm tắt 2 câu hỏi cổ đông quan trọng nhất và phần trả lời của Ban lãnh đạo.\n[Output]: Xuất ra dạng bảng tóm tắt 1 trang màn hình."
      },
      {
        type: "closing",
        lines: [
          "Tóm tắt thông minh giúp bạn nắm trọn tinh hoa cuộc họp ĐHĐCĐ chỉ sau 1 phút.",
          "Thông tin từ phần Q&A thường phản ánh thực chất sức khỏe doanh nghiệp hơn các con số kế hoạch."
        ]
      }
    ]
  },
  {
    id: 1266,
    day: 1266,
    slug: "bot-phan-tich-cam-xuc-tin-tuc-co-phieu",
    title: "Xây Dựng Bot Phân Tích Cảm Xúc Tin Tức & Tâm Lý Thị Trường",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 16,
    subtitle: "Dùng Prompt phân tích bài báo VnExpress, Vietstock, Bloomberg để xếp loại chỉ số Sentiment Lạc quan/Bi quan",
    practicePrompt: {
      question: "Chỉ số Cảm xúc Tin tức (News Sentiment Score) từ -10 đến +10 do AI phân tích giúp nhà đầu tư cá nhân có lợi thế gì?",
      options: [
        "Đo lường định lượng mức độ lạc quan/bi quan của truyền thông đối với một cổ phiếu, giúp nhận biết tâm lý đám đông để tránh đu đỉnh/bắt đáy vội vàng",
        "Thay thế hoàn toàn bảng giá chứng khoán",
        "Đảm bảo mua cổ phiếu nào cũng tăng trần 5 phiên",
        "Tự động hủy các lệnh đặt sai trên sàn"
      ],
      correct: 0,
      explanation: "Sentiment Score định lượng tâm lý tin tức thị trường, giúp nhà đầu tư nhận diện khi nào truyền thông đang quá hưng phấn (rủi ro tạo đỉnh) hoặc quá hoảng loạn (cơ hội mua giá rẻ)."
    },
    summary: {
      keyIdea: "Biến các bài báo chữ viết thành con số Sentiment cụ thể giúp bạn theo dõi tâm lý thị trường một cách khách quan, không bị cảm xúc chi phối.",
      commonMistake: "Đọc tin tức một cách cảm tính mà không phân loại được đâu là tin tác động ngắn hạn và đâu là xu hướng dài hạn.",
      action: "Thử copy 3 bài báo mới nhất về ngành Ngân hàng dán vào AI và yêu cầu chấm điểm Sentiment từ -100 đến +100."
    },
    application: {
      title: "Ứng dụng trong Giao Dịch & Quản Lý Tâm Lý",
      message: "Tạo thói quen chạy Prompt chấm điểm Sentiment cho toàn bộ tin tức liên quan đến danh mục cổ phiếu bạn đang nắm giữ mỗi cuối tuần.",
      secondary: "Quản trị được tâm lý tin tức là bạn đã chiến thắng 50% cuộc chơi trên thị trường chứng khoán."
    },
    sections: [
      {
        type: "lead",
        text: "Thị trường chứng khoán là thị trường của tâm lý. Ai đo lường được cảm xúc đám đông trước, người đó nắm chắc phần thắng."
      },
      {
        type: "heading",
        text: "1. Định Lượng Tâm Lý Tin Tức (News Sentiment)"
      },
      {
        type: "paragraph",
        text: "Khi dán 5 bài báo mới nhất về 1 cổ phiếu vào AI, bạn có thể yêu cầu AI quy đổi toàn bộ nội dung thành một con số Sentiment Index từ -10 (Cực kỳ Bi quan) đến +10 (Cực kỳ Lạc quan)."
      },
      {
        type: "heading",
        text: "2. Mẫu Prompt Chấm Điểm Sentiment Cổ Phiếu"
      },
      {
        type: "paragraph",
        text: "[Role]: Chuyên viên Quant Sentiment.\n[Context]: Các đoạn văn bài báo sau [Dán nội dung tin tức].\n[Task]: Đọc và đánh giá sắc thái tin tức:\n1. Chấm điểm Sentiment từ -10 đến +10.\n2. Liệt kê 2 yếu tố tác động Tích cực và 2 yếu tố Tiêu cực.\n3. Đánh giá xem đây là tin tức tác động Ngắn hạn (1-2 tuần) hay Dài hạn (> 6 tháng).\n[Output]: Trả lời dưới dạng Bảng tóm tắt."
      },
      {
        type: "closing",
        lines: [
          "Định lượng tâm lý tin tức giúp bạn giữ cái đầu lạnh trước mọi cơn sóng truyền thông.",
          "Kết hợp chỉ số Sentiment với định giá cơ bản để có quyết định đầu tư sáng suốt nhất."
        ]
      }
    ]
  },
  {
    id: 1267,
    day: 1267,
    slug: "custom-gpt-claude-project-tro-ly-tai-chinh-ca-nhan",
    title: "Thiết Kế Custom GPT / Claude Project Làm Trợ Lý Tài Chính Cá Nhân",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 16,
    subtitle: "Tự tay tạo 'Trợ lý ảo Tài chính' không cần code: Nạp tri thức báo cáo ngành, khẩu vị rủi ro và quy tắc đầu tư",
    practicePrompt: {
      question: "Tính năng Custom GPTs (hoặc Claude Projects) mang lại lợi ích đặc biệt nào cho người dùng tài chính Non-Tech?",
      options: [
        "Cho phép tạo một trợ lý AI riêng biệt, được nạp sẵn toàn bộ tài liệu báo cáo ngành, quy tắc đầu tư cá nhân và luôn nhớ khẩu vị rủi ro mà không cần nhắc lại",
        "Giúp bạn tự động rút tiền từ ngân hàng về nhà",
        "Thay thế hoàn toàn chiếc điện thoại thông minh",
        "Tự động thanh toán các khoản nợ thẻ tín dụng"
      ],
      correct: 0,
      explanation: "Custom GPTs / Claude Projects cho phép bạn 'huấn luyện' một trợ lý chuyên biệt: dán sẵn các file PDF báo cáo phân tích, khẩu vị đầu tư cá nhân, mỗi lần mở lên hỏi là AI nhớ ngay ngữ cảnh riêng của bạn."
    },
    summary: {
      keyIdea: "Tự tạo một Trợ lý AI tài chính cá nhân hóa 100% theo phong cách đầu tư và mục tiêu tài chính của chính bạn mà không cần biết lập trình.",
      commonMistake: "Dùng AI phiên bản chung mà không cài đặt hướng dẫn hệ thống (System Instructions) riêng cho phong cách đầu tư của mình.",
      action: "Tạo thử 1 Claude Project hoặc Custom GPT với tên 'Trợ lý Phân tích Cổ phiếu' và tải lên 2 file báo cáo ngành bạn yêu thích."
    },
    application: {
      title: "Ứng dụng Làm Trợ Lý Riêng Hàng Ngày",
      message: "Mỗi khi có ý tưởng đầu tư mới, chỉ cần chat với Trợ lý AI riêng của bạn để nó phản biện và chấm điểm dựa trên đúng quy tắc rủi ro bạn đã cài sẵn.",
      secondary: "Sở hữu Trợ lý AI riêng giúp bạn duy trì kỷ luật đầu tư và nhất quán trong mọi quyết định."
    },
    sections: [
      {
        type: "lead",
        text: "Hãy tưởng tượng bạn có riêng một chuyên viên phân tích tài chính làm việc 24/7, thuộc lòng mọi quy tắc và khẩu vị rủi ro của bạn."
      },
      {
        type: "heading",
        text: "1. 3 Bước Tạo Trợ Lý AI Riêng Trên Claude / ChatGPT"
      },
      {
        type: "paragraph",
        text: "• Bước 1: Vào mục Create GPT (trên ChatGPT) hoặc New Project (trên Claude).\n• Bước 2: Viết câu lệnh System Instructions quy định tính cách & quy tắc đầu tư.\n• Bước 3: Tải lên các file PDF báo cáo phân tích ngành, BCTC quý làm Kho tri thức (Knowledge Base)."
      },
      {
        type: "heading",
        text: "2. Mẫu System Instructions Quy Tắc Đầu Tư"
      },
      {
        type: "paragraph",
        text: "'Bạn là Trợ lý Phân tích Cổ phiếu của tôi. Bộ quy tắc lọc cổ phiếu của tôi gồm:\n1. Chỉ xem xét cổ phiếu có P/E < 15, ROE > 15% và Tỷ lệ nợ/Vốn CSH < 1.0.\n2. Luôn cảnh báo rủi ro đầu tiên trước khi nói về cơ hội lợi nhuận.\n3. Trả lời bằng phong cách ngắn gọn, súc tích, dùng bảng biểu khi tính toán con số.'"
      },
      {
        type: "closing",
        lines: [
          "Custom AI Assistant là tài sản trí tuệ riêng biệt nâng tầm năng lực đầu tư của bạn.",
          "Cập nhật thường xuyên tài liệu tri thức mới để Trợ lý AI ngày càng thông minh hơn."
        ]
      }
    ]
  },
  {
    id: 1268,
    day: 1268,
    slug: "tu-dong-hoa-viet-bao-cao-dau-tu-slide-thuyet-minh",
    title: "Tự Động Hóa Viết Báo Cáo Phân Tích Đầu Tư & Slide Thuyết Minh Với AI",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 15,
    subtitle: "Prompt đóng vai Equity Research Analyst lập báo cáo khuyến nghị Mua/Bán & cấu trúc bài thuyết trình chuyên nghiệp",
    practicePrompt: {
      question: "Để AI xuất ra một bản Báo cáo Phân tích Đầu tư chuyên nghiệp đạt chuẩn các quỹ Phố Wall, cấu trúc Prompt cần những mục nào?",
      options: [
        "Đóng vai Senior Equity Analyst, yêu cầu phân tích theo cấu trúc: Luận điểm đầu tư (Investment Thesis) - Vị thế ngành - Sức khỏe tài chính - Định giá & Khuyến nghị Mua/Bán",
        "Viết ngắn gọn 1 câu: 'Cổ phiếu này tốt hay xấu?'",
        "Bỏ qua phần định giá chỉ tập trung viết lời khen",
        "Yêu cầu AI bịa ra các giải thưởng của doanh nghiệp"
      ],
      correct: 0,
      explanation: "Báo cáo phân tích đầu tư chuẩn mực cần có Luận điểm đầu tư rõ ràng, phân tích định lượng tài chính, định giá và Khuyến nghị Mua/Bán/Theo dõi kèm mức giá mục tiêu cụ thể."
    },
    summary: {
      keyIdea: "AI hỗ trợ chuyển đổi toàn bộ dữ liệu phân tích thô thành bài báo cáo khuyến nghị đầu tư chỉn chu và Slide thuyết trình sắc nét.",
      commonMistake: "Bê nguyên văn báo cáo AI viết mà không rà soát lại văn phong và kiểm tra tính hợp lý của các luận điểm.",
      action: "Dùng Prompt mẫu trong bài học để tạo thử bài báo cáo phân tích 1 trang (One-pager) cho cổ phiếu bạn đang nghiên cứu."
    },
    application: {
      title: "Ứng dụng trong Công Việc & Đầu Tư Thật",
      message: "Tự tin lập báo cáo phân tích chất lượng cao để trình bày trước hội đồng đầu tư hoặc chia sẻ với khách hàng cá nhân.",
      secondary: "Kỹ năng đóng gói thông tin bằng AI giúp nâng tầm hình ảnh chuyên nghiệp của bạn trong mắt đối tác."
    },
    sections: [
      {
        type: "lead",
        text: "Viết báo cáo và làm Slide là công đoạn ngốn nhiều thời gian nhất của dân tài chính. AI sẽ giúp bạn làm xong việc này chỉ trong 10 phút."
      },
      {
        type: "heading",
        text: "1. Mẫu Prompt Lập Báo Cáo Phân Tích Cổ Phiếu 1 Trang (One-Pager)"
      },
      {
        type: "paragraph",
        text: "[Role]: Senior Equity Research Analyst.\n[Context]: Số liệu BCTC & Giá cổ phiếu FPT hiện tại 130.000đ.\n[Task]: Viết báo cáo khuyến nghị đầu tư gồm 4 phần:\n1. Luận điểm đầu tư chính (Investment Thesis - 3 ý).\n2. Phân tích sức khỏe tài chính & lợi thế cạnh tranh Moat.\n3. Định giá P/E & DCF (Mức giá mục tiêu target price).\n4. Khuyến nghị Mua / Nắm giữ / Bán kèm vùng giá giải ngân.\n[Output]: Trình bày chỉn chu chuẩn mẫu quỹ đầu tư."
      },
      {
        type: "heading",
        text: "2. Chuyển Đổi Báo Cáo Thành Dàn Ý Slide Thuyết Trình"
      },
      {
        type: "paragraph",
        text: "Ra lệnh tiếp: 'Hãy chuyển toàn bộ bài báo cáo trên thành dàn ý 5 Slide thuyết trình Powerpoint. Mỗi Slide ghi rõ: Tiêu đề, 3 Bullet points nội dung chính và Gợi ý hình ảnh/biểu đồ minh họa'."
      },
      {
        type: "closing",
        lines: [
          "Tự động hóa trình bày giúp bạn dành trọn tâm trí cho tư duy chiến lược và ra quyết định.",
          "Luôn làm chủ nội dung báo cáo và sẵn sàng bảo vệ các luận điểm trước câu hỏi phản biện."
        ]
      }
    ]
  },
  {
    id: 1269,
    day: 1269,
    slug: "kiem-tra-xac-thuc-phong-tranh-ao-giac-ai-hallucination",
    title: "Kiểm Tra Xác Thực (Fact-Checking) & Tránh 'Ảo Giác AI' (Hallucination)",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 16,
    subtitle: "Tuyệt chiêu soi lỗi AI bịa số liệu tài chính, bắt AI trích dẫn nguồn trang/dòng cụ thể và quy trình thẩm định 3 bước",
    practicePrompt: {
      question: "Hiện tượng 'Ảo giác AI' (AI Hallucination) trong tài chính là gì và nguyên tắc số 1 để phòng tránh là gì?",
      options: [
        "Là hiện tượng AI tự bịa ra con số tài chính hoặc sự kiện không có thật nhưng trả lời rất tự tin; Nguyên tắc số 1 là luôn bắt AI trích dẫn số trang/nguồn và đối soát lại",
        "Là hiện tượng AI làm máy tính bị giật lag",
        "Là khi AI từ chối trả lời câu hỏi của người dùng",
        "Là hiện tượng giá cổ phiếu biến động bất ngờ trên bảng điện"
      ],
      correct: 0,
      explanation: "AI Hallucination là nguy cơ lớn nhất khi dùng AI tài chính. Luôn bắt AI chỉ rõ 'Con số này nằm ở trang bao nhiêu trong BCTC?' và quy tắc thẩm định 3 bước giúp bạn không bao giờ bị dính bẫy tin giả."
    },
    summary: {
      keyIdea: "Tin tưởng AI nhưng luôn phải kiểm chứng (Trust, but Verify) - đây là khẩu hiệu nằm lòng của mọi chuyên viên tài chính chuyên nghiệp.",
      commonMistake: "Bê nguyên con số doanh thu, lợi nhuận do AI tính ra mà không kiểm tra lại với Báo cáo tài chính đã kiểm toán.",
      action: "Áp dụng ngay câu lệnh phòng chống ảo giác: 'Chỉ dùng số liệu có trong file đính kèm, nếu không có hãy ghi rõ Không tìm thấy'."
    },
    application: {
      title: "Ứng dụng Kiểm Soát Rủi Ro Thông Tin",
      message: "Luôn thêm dòng lệnh chống bịa số vào cuối mọi Prompt: 'Nếu không chắc chắn 100%, hãy cảnh báo tôi thay vì tự suy đoán con số.'",
      secondary: "Sự cẩn trọng và kỷ luật kiểm chứng là phẩm chất tách biệt nhà phân tích giỏi với phần còn lại."
    },
    sections: [
      {
        type: "lead",
        text: "AI rất thông minh nhưng đôi khi trả lời bịa đặt một cách cực kỳ thuyết phục. Làm chủ kỹ năng Fact-checking là lá chắn an toàn nhất cho bạn."
      },
      {
        type: "heading",
        text: "1. Bản Chất Của Ảo Giác AI (AI Hallucination)"
      },
      {
        type: "paragraph",
        text: "AI hoạt động theo cơ chế dự báo từ tiếp theo dựa trên xác suất, không phải phần mềm tra cứu cơ sở dữ liệu cứng. Nếu bị thiếu dữ liệu, AI có xu hướng 'tự sáng tác' con số cho hợp logic."
      },
      {
        type: "heading",
        text: "2. Câu Thần Chú Phòng Chống AI Bịa Số"
      },
      {
        type: "paragraph",
        text: "Luôn dán câu lệnh bảo vệ này vào cuối Prompt:\n'LƯU Ý AN TOÀN: Bạn chỉ được sử dụng các con số có trong tài liệu đính kèm. Nếu không tìm thấy thông tin, hãy ghi rõ 'Không có dữ liệu trong tài liệu' chứ KHÔNG ĐƯỢC TỰ BỊA CON SỐ. Với mỗi con số đưa ra, hãy trích dẫn vị trí [Trang X, Dòng Y]'."
      },
      {
        type: "heading",
        text: "3. Quy Trình Thẩm Định 3 Bước (Trust, but Verify)"
      },
      {
        type: "paragraph",
        text: "1. Đối soát con số trọng yếu (Doanh thu, Nợ vay) với BCTC gốc.\n2. Hỏi chéo 2 AI khác nhau (ChatGPT vs Claude 3.5).\n3. Kiểm tra logic toán học của kết quả cuối cùng."
      },
      {
        type: "closing",
        lines: [
          "Bảo vệ uy tín nghề nghiệp bằng quy trình thẩm định dữ liệu cẩn trọng.",
          "Chất lượng quyết định đầu tư phụ thuộc vào tính chính xác của dữ liệu đầu vào."
        ]
      }
    ]
  },
  {
    id: 1270,
    day: 1270,
    slug: "bo-thu-vien-prompt-mau-thuc-chien-cho-dan-tai-chinh",
    title: "Bộ Thư Viện Prompt Mẫu Thực Chiến Cho Dân Ngân Hàng & Đầu Tư",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 17,
    subtitle: "Tổng hợp 20+ Prompts 'Copy-Paste Dùng Ngay' cho Chứng khoán, Ngân hàng, BĐS, Kế toán & Quản lý tài sản",
    practicePrompt: {
      question: "Cách tốt nhất để lưu trữ và biến Thư viện Prompt mẫu (Prompt Library) thành vũ khí tăng năng suất làm việc hàng ngày của bạn là gì?",
      options: [
        "Lưu bộ Prompts vào ứng dụng Ghi chú (Notion/Notes), phân loại theo tác vụ (Đọc BCTC, Phân tích tin, Định giá) để chỉ cần Copy-Paste thay thông tin là xong",
        "Học thuộc lòng từng chữ của tất cả 20 câu Prompt",
        "Viết câu lệnh ra giấy nháp rồi ném đi",
        "Chỉ mở ra xem một lần rồi không bao giờ dùng lại"
      ],
      correct: 0,
      explanation: "Tạo một Prompt Library cá nhân lưu trong Notion hoặc Notes giúp bạn tiết kiệm 95% thời gian viết câu lệnh, chỉ cần thay tên cổ phiếu/số liệu là có ngay kết quả chuyên nghiệp."
    },
    summary: {
      keyIdea: "Sở hữu bộ Thư viện Prompt mẫu thực chiến giống như việc bạn mang theo một hộp công cụ vạn năng cho mọi tình huống công việc tài chính.",
      commonMistake: "Viết lại câu lệnh từ đầu mỗi lần làm việc thay vì sử dụng các khung Prompt mẫu đã chuẩn hóa sẵn.",
      action: "Tải và lưu trữ ngay Bộ 20 Prompts Thực chiến được tổng hợp sẵn trong bài học này vào ứng dụng ghi chú của bạn."
    },
    application: {
      title: "Hành Trang Tương Lai Kỷ Nguyên AI",
      message: "Chúc mừng bạn đã hoàn thành trọn vẹn Lộ trình AI in Finance dành cho người Non-Tech! Hãy tự tin áp dụng bộ công cụ này để bứt phá sự nghiệp ngay hôm nay.",
      secondary: "Hành trình làm chủ AI là hành trình học tập liên tục - hãy giữ vững sự tò mò và tinh thần chủ động ứng dụng công nghệ mới!"
    },
    sections: [
      {
        type: "lead",
        text: "Bài học cuối cùng tổng hợp trọn bộ 20+ Prompts thực chiến 'Copy-Paste là Dùng Ngay' được thiết kế riêng cho dân tài chính ngân hàng Việt Nam."
      },
      {
        type: "heading",
        text: "1. Thư Viện Prompt Phân Tích Cổ Phiếu & Đầu Tư"
      },
      {
        type: "paragraph",
        text: "• Prompt So Sánh 2 Cổ Phiếu Cùng Ngành: '[Role]: CIO. [Task]: So sánh FPT vs CMG về ROE, P/E, Tốc độ tăng trưởng. Xuất bảng so sánh và đưa ra kết luận.'\n• Prompt Lọc Động Lực Tăng Trưởng: 'Lọc 3 Catalyst ngắn hạn có thể giúp cổ phiếu bứt phá trong quý 3/2026.'\n• Prompt Định Giá Nhanh P/E: 'Tính P/E dự phóng dựa trên kế hoạch lợi nhuận mới công bố và so sánh với P/E trung bình 5 năm của cổ phiếu.'"
      },
      {
        type: "heading",
        text: "2. Thư Viện Prompt Cho Ngân Hàng, Kế Toán & Quản Lý Tài Sản"
      },
      {
        type: "paragraph",
        text: "• Prompt Thẩm Định Hồ Sơ Vay: '[Role]: Bank Credit Officer. Phân tích khả năng trả nợ của khách hàng cá nhân có thu nhập 50 triệu/tháng và nợ vay 2 tỷ.'\n• Prompt Soát Lỗi Báo Cáo Quản Trị: 'So sánh bảng chi phí thực tế vs Ngân sách dự toán, chỉ ra 3 khoản mục vượt chi lớn nhất.'\n• Prompt Lập Kế Hoạch Tài Chính Cá Nhân: 'Thiết kế danh mục đầu tư tích sản 10 triệu/tháng cho mục tiêu mua nhà sau 5 năm.'"
      },
      {
        type: "closing",
        lines: [
          "Chúc mừng bạn đã chính thức làm chủ bộ kỹ năng Prompt Engineering trong tài chính!",
          "Hãy biến AI thành người đồng hành đắc lực nâng tầm vị thế sự nghiệp của bạn trong kỷ nguyên số!"
        ]
      }
    ]
  }
];

const lessonsFilePath = path.join(process.cwd(), 'lib', 'lessons.ts');
let fileContent = fs.readFileSync(lessonsFilePath, 'utf8');

const idx1261 = fileContent.indexOf('"id": 1261');
let targetStartIndex = idx1261;
if (idx1261 !== -1) {
  targetStartIndex = fileContent.lastIndexOf('{', idx1261);
}

const targetClosing = '] as Lesson[];';
const lastIdx = fileContent.lastIndexOf(targetClosing);

if (targetStartIndex === -1 || lastIdx === -1) {
  console.error('Could not find slice target in lib/lessons.ts');
  process.exit(1);
}

const formattedLessonsStr = expandedLessons.map(l => '  ' + JSON.stringify(l, null, 2)).join(',\n');
const newContent = fileContent.slice(0, targetStartIndex) + formattedLessonsStr + '\n' + fileContent.slice(lastIdx);

fs.writeFileSync(lessonsFilePath, newContent, 'utf8');
console.log('Successfully expanded detailed masterclass content for lessons 1261-1270 in lib/lessons.ts!');
