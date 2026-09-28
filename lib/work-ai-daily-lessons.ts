import type { Lesson } from "./lesson-types";

// Chặng "Dùng AI mỗi ngày ở chỗ làm" (ids 1810-1815, personal track, Chặng 25).
//
// Viết cho dân văn phòng không biết code: kế toán, nhân sự, sales, CSKH, vận
// hành. Cơ chế (dự đoán chữ tiếp theo), chống bịa và thư viện câu lệnh đã có ở
// chặng "AI trong sản phẩm" (id 1261-1280) nhưng viết cho lập trình viên; chặng
// này nói cùng những ý đó bằng việc văn phòng: email, biên bản họp, báo cáo.
//
// Cố ý không ghi đường dẫn nút bấm hay giá tiền của ChatGPT / Claude / Gemini /
// Copilot: giao diện và bảng giá đổi liên tục, còn cách giao việc thì không.

export const WORK_AI_DAILY_LESSONS: Lesson[] = [
  {
    id: 1810,
    slug: "ai-tao-sinh-lam-duoc-gi-o-van-phong",
    title: "Chặng 25, Bài 1: AI tạo sinh làm được gì với việc văn phòng - và không làm được gì",
    subtitle: "Một thực tập sinh đọc cả thư viện: viết rất nhanh, nhưng không biết thì vẫn nói.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🤖",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Phần lớn thất vọng với AI đến từ giao sai việc: nhờ nó cộng số, hỏi nó tin tuần này, bắt nó đưa nguồn. Biết nó giỏi gì và kém gì từ đầu thì bạn tiết kiệm được hàng giờ mỗi tuần mà không phải trả giá bằng một con số sai trong báo cáo gửi sếp.",
    openingQuestion:
      "Bạn dán bảng doanh thu 12 tháng vào ChatGPT: \"Tính tổng cả năm rồi viết email báo cáo sếp.\" Phần nào trong kết quả đáng kiểm lại nhất?",
    openingOptions: [
      "Con số tổng cả năm mà nó tự cộng trong khung chat",
      "Giọng văn email, vì AI hay viết quá trang trọng với sếp",
      "Tiêu đề email, vì AI hay đặt tiêu đề dài và chung chung",
      "Lời chào cuối thư, vì AI không biết tên sếp",
    ],
    correctOption: 0,
    explanation:
      "AI tạo sinh không cộng như máy tính - nó dự đoán chữ tiếp theo nghe hợp lý nhất. Một tổng doanh thu \"nghe hợp lý\" vẫn có thể lệch vài chục triệu, và nó được viết ra với cùng một giọng tự tin như phần đúng. Giọng văn, tiêu đề hay lời chào thì bạn nhìn là thấy và sửa trong vài giây; con số sai thì nằm im trong email cho tới khi sếp đối chiếu. Hãy để Excel hoặc Google Sheets tính, còn AI viết phần chữ quanh con số đó.",
    diagram: [
      { label: "Bạn gửi yêu cầu và dữ liệu", arrow: true },
      { label: "AI dự đoán chữ tiếp theo, từng chữ một", arrow: true },
      { label: "Kết quả: chữ trôi chảy, có thể lẫn chỗ sai", arrow: true },
      { label: "Bạn kiểm số, nguồn, tên trước khi dùng" },
    ],
    realWorldExample: {
      company: "Samsung (2023)",
      description:
        "Năm 2023, nhân viên Samsung dán mã nguồn nội bộ và nội dung cuộc họp vào ChatGPT để nhờ sửa lỗi và tóm tắt. Công ty sau đó hạn chế dùng AI tạo sinh trên thiết bị công ty. Bài học không phải \"đừng dùng AI\", mà là: AI giỏi tóm tắt, nhưng thứ bạn dán vào là một lần gửi dữ liệu ra ngoài công ty.",
    },
    quiz: [
      {
        question: "AI tạo sinh như ChatGPT tạo ra câu trả lời bằng cách nào?",
        options: [
          "Dự đoán chữ tiếp theo hợp lý nhất, từng chữ một",
          "Tra trong kho câu trả lời đúng đã được soạn sẵn",
          "Tìm trên Google rồi chép lại đoạn khớp câu hỏi nhất",
          "Hiểu câu hỏi như người rồi suy ra đáp án chính xác",
        ],
        correct: 0,
        explanation:
          "Mô hình ngôn ngữ sinh ra chữ tiếp theo có xác suất cao nhất dựa trên những gì nó đã đọc. Vì vậy nó viết rất trôi, nhưng \"nghe hợp lý\" không đồng nghĩa với \"đúng\". Nó không có kho đáp án soạn sẵn, và chỉ tìm web khi công cụ bật chế độ tìm kiếm.",
      },
      {
        question: "Việc nào AI tạo sinh làm tốt nhất trong ngày của một nhân viên kinh doanh?",
        options: [
          "Viết nháp email chào hàng từ vài ý gạch đầu dòng",
          "Báo chính xác giá cổ phiếu của đối thủ sáng nay",
          "Cộng chính xác 300 dòng doanh số dán vào khung chat",
          "Nhắc lại điều khoản hợp đồng bạn ký tuần trước",
        ],
        correct: 0,
        explanation:
          "Viết nháp từ ý có sẵn là đúng sở trường: diễn đạt trôi chảy, bạn kiểm được bằng mắt. Giá cổ phiếu sáng nay là sự kiện mới, nó không biết nếu không tìm web. Cộng 300 dòng là việc của bảng tính. Hợp đồng tuần trước thì nó chưa từng thấy, trừ khi bạn đưa vào.",
      },
      {
        question: "Vì sao AI có thể trả lời sai về một quy định mới ban hành tháng trước?",
        options: [
          "Dữ liệu nó học dừng ở một thời điểm trước đó",
          "Vì AI không được phép đọc văn bản pháp luật Việt Nam",
          "Vì quy định viết bằng tiếng Việt nên nó đọc không hiểu",
          "Vì nó chỉ trả lời đúng khi bạn dùng gói trả phí cao nhất",
        ],
        correct: 0,
        explanation:
          "Mỗi mô hình học từ dữ liệu tới một ngày nhất định. Quy định ra sau ngày đó thì nó không biết, nhưng vẫn có thể trả lời tự tin dựa trên quy định cũ. Bật chế độ tìm kiếm web giúp phần nào, nhưng với văn bản pháp luật bạn vẫn phải mở văn bản gốc.",
      },
      {
        question: "Bạn hỏi nguồn cho một con số, AI đưa tên bài báo và đường dẫn. Nên làm gì?",
        options: [
          "Mở đường dẫn, tìm đúng con số đó trong bài",
          "Dùng luôn, vì có đường dẫn nghĩa là nó đã tra thật",
          "Hỏi lại AI \"nguồn này có thật không\" rồi tin theo",
          "Bỏ đường dẫn, chỉ giữ con số cho báo cáo gọn hơn",
        ],
        correct: 0,
        explanation:
          "Khi không tìm web, AI có thể tạo ra tên bài và đường dẫn trông rất thật - đó cũng chỉ là chữ nghe hợp lý. Hỏi lại chính nó không phải kiểm chứng, vì nó có thể xác nhận luôn điều nó vừa bịa. Chỉ khi mở nguồn và thấy con số trong đó bạn mới biết.",
      },
      {
        question: "Dữ liệu nào KHÔNG nên dán vào bản AI miễn phí dùng tài khoản cá nhân?",
        options: [
          "Bảng lương có họ tên và số tài khoản nhân viên",
          "Một đoạn thông cáo báo chí công ty đã đăng công khai",
          "Dàn ý bài thuyết trình về xu hướng ngành bán lẻ",
          "Email mời họp chỉ ghi giờ, phòng và chủ đề chung",
        ],
        correct: 0,
        explanation:
          "Dán vào ô chat là gửi dữ liệu ra một hệ thống bên ngoài công ty. Dữ liệu cá nhân như lương, số tài khoản thì không đưa vào công cụ công ty chưa duyệt, kể cả khi đã tắt lịch sử. Thông tin công khai hay dàn ý chung thì rủi ro thấp.",
      },
    ],
    keyTakeaways: [
      "AI tạo sinh dự đoán chữ tiếp theo - nó viết trôi, không phải luôn đúng.",
      "Giỏi: viết nháp, tóm tắt, đổi định dạng, động não ý tưởng.",
      "Kém: tính toán chính xác, sự kiện mới, trích dẫn nguồn.",
      "Số liệu để bảng tính tính; AI viết phần chữ quanh con số.",
      "Dán vào ô chat là gửi dữ liệu ra ngoài công ty.",
    ],
    practicePrompt: {
      question:
        "Chị Lan (nhân sự) cần: (1) viết lại thông báo nghỉ lễ cho thân thiện hơn, (2) tính thuế thu nhập cá nhân cho 40 nhân viên. Phân việc hợp lý là gì?",
      options: [
        "AI viết lại thông báo; thuế tính bằng Excel hoặc phần mềm lương",
        "AI làm cả hai việc, rồi chị Lan đọc lướt lại một lần là đủ",
        "AI tính thuế cho nhanh; thông báo tự viết để có tình người",
        "Không giao AI việc nào vì AI hay bịa, tự làm cả hai cho chắc",
      ],
      correct: 0,
      explanation:
        "Viết lại thông báo là việc chữ, kết quả kiểm được bằng mắt trong một phút. Tính thuế là việc số cần chính xác tuyệt đối và dính dữ liệu lương - đúng loại việc AI kém và không nên nhận. Bỏ AI hoàn toàn thì phí phần nó làm tốt.",
    },
    summary: {
      keyIdea: "AI là người viết nhanh, không phải người tính đúng hay người biết tin mới.",
      formula: "Việc chữ → giao AI rồi đọc lại. Việc số, sự kiện mới, nguồn → kiểm bằng công cụ khác.",
      commonMistake: "Tin một con số hay một trích dẫn vì nó được viết ra rất tự tin.",
      action: "Liệt kê 5 việc tuần này và đánh dấu việc nào là việc chữ, việc nào là việc số.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một email bạn định viết hôm nay. Ghi 3-4 ý gạch đầu dòng, nhờ ChatGPT, Claude, Gemini hoặc Copilot viết nháp. Đọc lại và đánh dấu mọi con số, tên, ngày tháng trong nháp - từng cái một, đối chiếu với nguồn của bạn.",
      secondary: "Để ý xem bạn phải sửa bao nhiêu chỗ và sửa loại gì - đó là bản đồ điểm yếu của AI với việc của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này dành cho người không viết code nhưng mỗi ngày viết email, đọc biên bản, làm báo cáo. Bài đầu trả lời câu quan trọng nhất: giao cho AI việc gì thì lời, việc gì thì lỗ.",
      },
      {
        type: "feynman",
        title: "AI tạo sinh là một thực tập sinh đặc biệt",
        intro: "Hình dung công ty bạn vừa nhận một thực tập sinh đã đọc gần hết thư viện tới năm ngoái, viết nhanh như gió - nhưng có một tật: không biết thì vẫn trả lời rất tự tin.",
        columns: ["Thành phần", "Thực tập sinh đọc cả thư viện", "AI tạo sinh"],
        rows: [
          ["Kiến thức", "Đọc rất nhiều sách, nhưng chỉ tới năm ngoái", "Dữ liệu huấn luyện có ngày dừng"],
          ["Điểm mạnh", "Viết nhanh, diễn đạt trôi, gợi nhiều ý", "Viết nháp, tóm tắt, đổi định dạng, động não"],
          ["Điểm yếu", "Không biết thì đoán, và đoán rất tự tin", "Bịa số liệu, nguồn, tên văn bản (hallucination)"],
          ["Cách giao việc", "Dặn rõ, đưa tài liệu, kiểm bài trước khi gửi sếp", "Prompt rõ ràng, kèm dữ liệu, người kiểm trước khi dùng"],
        ],
        oneLiner: "AI là thực tập sinh viết giỏi nhưng hay bịa khi không biết: giao việc chữ, và luôn kiểm phần số.",
      },
      { type: "heading", text: "Vấn đề: ba giờ mỗi sáng cho việc chữ" },
      {
        type: "paragraph",
        text: "Một trưởng nhóm kinh doanh mất khoảng ba giờ mỗi sáng thứ Hai: trả lời email tồn, viết lại báo cáo tuần cho gọn, soạn tin nhắn nhắc khách thanh toán. Phần lớn là việc chữ có khuôn - đúng loại việc AI tạo sinh (generative AI) làm nhanh nhất.",
      },
      { type: "heading", text: "Nó hoạt động thế nào - một câu là đủ" },
      {
        type: "paragraph",
        text: "AI tạo sinh dự đoán chữ tiếp theo hợp lý nhất, từng chữ một, dựa trên hàng tỷ trang nó đã đọc. Từ câu đó suy ra gần hết điểm mạnh và điểm yếu: viết trôi vì nó đã đọc rất nhiều văn bản; bịa vì một con số \"nghe hợp lý\" có xác suất cao dù nó chưa từng tồn tại.",
      },
      {
        type: "comparison",
        left: {
          label: "Giao được, rồi đọc lại",
          text: "Viết nháp email, thông báo, bài đăng. Tóm tắt tài liệu bạn đưa vào. Đổi định dạng: gạch đầu dòng thành bảng, văn nói thành văn viết. Động não: 10 tiêu đề, 5 cách mở lời, các câu hỏi khách có thể hỏi.",
        },
        right: {
          label: "Không tin nếu chưa kiểm",
          text: "Tính toán chính xác (tổng, thuế, lãi). Sự kiện mới: giá hôm nay, quy định tháng trước. Trích dẫn: tên bài báo, số hiệu văn bản, đường dẫn, lời ai đó từng nói. Thông tin nội bộ nó chưa từng được thấy.",
        },
      },
      { type: "heading", text: "Công cụ: chọn cái công ty cho phép" },
      {
        type: "paragraph",
        text: "ChatGPT, Claude, Gemini và Microsoft Copilot đều làm tốt những việc ở cột trái. Khác biệt lớn nhất với dân văn phòng thường không phải chất lượng mà là: công ty đã duyệt công cụ nào, và dùng bản doanh nghiệp hay bản cá nhân. Bản doanh nghiệp thường có cam kết không dùng dữ liệu của bạn để huấn luyện - hỏi bộ phận IT trước khi dán tài liệu nội bộ.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Việc chữ có khuôn: giao AI viết nháp, bạn sửa.",
          "Bước 2 - Việc cần số đúng: để Excel hoặc Google Sheets tính, AI chỉ viết lời quanh con số.",
          "Bước 3 - Việc cần tin mới hoặc nguồn: bật chế độ tìm kiếm web và mở từng nguồn (bài 4 và 5).",
          "Bước 4 - Trước khi gửi: đọc lại mọi con số, tên người, ngày tháng.",
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: ô chat không riêng tư",
        text: "Dán vào ô chat là gửi dữ liệu ra một hệ thống bên ngoài. Bảng lương, số CCCD, hợp đồng khách hàng, số liệu chưa công bố - không đưa vào công cụ công ty chưa duyệt, kể cả khi đã tắt lịch sử. Và người gửi email là bạn, nên người chịu trách nhiệm cho câu sai trong đó cũng là bạn.",
      },
      {
        type: "closing",
        lines: [
          "AI viết nhanh; bạn kiểm số, tên và nguồn.",
          "Bài sau: viết yêu cầu sao cho bản nháp đầu tiên đã dùng được.",
        ],
      },
    ],
  },
  {
    id: 1811,
    slug: "viet-yeu-cau-cho-ai-prompt",
    title: "Chặng 25, Bài 2: Viết yêu cầu cho AI - sáu phần của một prompt tốt",
    subtitle: "AI không đọc được suy nghĩ của bạn. Nó chỉ đọc được những gì bạn gõ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "✍️",
    track: "personal",
    whyItMatters:
      "Phần lớn câu trả lời vô dụng đến từ yêu cầu thiếu thông tin, không phải từ giới hạn của AI. Thêm hai phút viết bối cảnh và định dạng thường tiết kiệm được ba lượt sửa đi sửa lại.",
    openingQuestion:
      "Bạn gõ \"Viết email xin lỗi khách\" và nhận về một lá thư chung chung, dùng được cho bất kỳ ai. Prompt đang thiếu gì nhất?",
    openingOptions: [
      "Bối cảnh: khách là ai, lỗi gì, công ty bù đắp ra sao",
      "Một lời khen AI ở đầu để nó cố gắng viết hay hơn nữa",
      "Chữ \"KHẨN CẤP\" viết hoa để AI ưu tiên trả lời kỹ hơn",
      "Lời dặn \"hãy viết thật chuyên nghiệp và hay nhất có thể\"",
    ],
    correctOption: 0,
    explanation:
      "AI không biết khách là ai, giao hàng trễ hay giao nhầm, và công ty định bù gì - nên nó viết một lá thư đúng cho mọi trường hợp, tức là không đúng hẳn cho trường hợp nào. Lời khen, chữ viết hoa hay \"viết thật hay\" không cho nó thêm thông tin nào để viết sát hơn. Bối cảnh cụ thể mới làm lá thư thành thư của bạn: tên khách, đơn hàng, lỗi gì, bạn sẽ làm gì tiếp theo.",
    diagram: [
      { label: "Vai trò: AI đóng vai ai", arrow: true },
      { label: "Bối cảnh: chuyện gì đang xảy ra", arrow: true },
      { label: "Nhiệm vụ: cần làm gì, cho ai đọc", arrow: true },
      { label: "Định dạng, ví dụ mẫu, giới hạn", arrow: true },
      { label: "Bản nháp đầu tiên dùng được" },
    ],
    realWorldExample: {
      company: "Phòng chăm sóc khách hàng 6 người (tình huống)",
      description:
        "Mỗi người tự gõ \"viết thư xin lỗi khách\" và sửa tay 10-15 phút mỗi thư. Trưởng nhóm viết lại một prompt đủ sáu phần, có một lá thư cũ được khách khen làm mẫu. Thời gian sửa mỗi thư còn khoảng 3 phút, và thư của cả phòng bắt đầu cùng một giọng.",
    },
    quiz: [
      {
        question: "Trong prompt, phần \"định dạng đầu ra\" là gì?",
        options: [
          "Hình dạng kết quả: bảng mấy cột, bao nhiêu chữ, giọng gì",
          "Định dạng file bạn tải lên, ví dụ Word hay PDF",
          "Phông chữ và cỡ chữ AI sẽ dùng khi trả lời bạn",
          "Ngôn ngữ lập trình mà AI dùng để tạo câu trả lời",
        ],
        correct: 0,
        explanation:
          "Định dạng đầu ra là bạn mô tả trước kết quả trông ra sao: \"bảng 4 cột\", \"dưới 150 chữ\", \"3 gạch đầu dòng\", \"giọng thân thiện, xưng em\". Không nói thì AI tự chọn, thường là văn dài nhiều đoạn. Định dạng file tải lên là chuyện khác hẳn.",
      },
      {
        question: "Vì sao đưa một ví dụ mẫu vào prompt lại hiệu quả?",
        options: [
          "AI bắt chước giọng và cấu trúc tốt hơn là theo mô tả",
          "Vì AI sẽ chép nguyên văn ví dụ, bạn đỡ phải viết mới",
          "Vì có ví dụ thì AI không bao giờ bịa thông tin nữa",
          "Vì có ví dụ mẫu thì câu trả lời được tạo nhanh hơn",
        ],
        correct: 0,
        explanation:
          "Mô tả \"giọng thân thiện nhưng chuyên nghiệp\" mỗi người hiểu một kiểu; một lá thư mẫu thì không. AI bắt chước rất giỏi, nên ví dụ là cách nhanh nhất để nói \"viết giống thế này\". Nó không làm AI hết bịa, và nên dặn \"đừng chép nguyên nội dung mẫu\".",
      },
      {
        question: "Giới hạn nào trong prompt thật sự hữu ích?",
        options: [
          "\"Không hứa hoàn tiền; chỉ nói sẽ kiểm tra trong 24 giờ\"",
          "\"Hãy viết thật hay, không được có một lỗi nào cả\"",
          "\"Đừng bịa\" - và không nói gì thêm về dữ liệu nào",
          "\"Viết ngắn thôi\" - mà không nói ngắn là bao nhiêu",
        ],
        correct: 0,
        explanation:
          "Giới hạn tốt là cụ thể và kiểm được: điều gì không được nói, độ dài bao nhiêu, dùng dữ liệu nào. \"Không hứa hoàn tiền\" chặn đúng một rủi ro thật. \"Viết hay\", \"đừng bịa\", \"ngắn thôi\" không cho AI biết ranh giới nằm ở đâu.",
      },
      {
        question: "Kết quả lần đầu chưa đúng ý. Cách làm tốt là gì?",
        options: [
          "Chỉ rõ chỗ chưa ổn và nhờ sửa ngay trong cuộc chat đó",
          "Mở cuộc chat mới, gõ lại y hệt câu cũ tới khi ra ý muốn",
          "Chuyển sang một công cụ AI khác vì công cụ này quá kém",
          "Tự sửa tay toàn bộ, vì AI không tiếp thu góp ý được",
        ],
        correct: 0,
        explanation:
          "AI nhớ những gì đã nói trong cùng cuộc trò chuyện, nên góp ý cụ thể (\"đoạn 2 dài quá, bỏ câu hứa giao hàng\") thường cho bản tốt hơn sau một lượt. Gõ lại y hệt chỉ là tung xúc xắc lại. Khi đã ra bản tốt, sửa prompt gốc để lần sau khỏi phải góp ý.",
      },
      {
        question: "Gán vai trò (\"Bạn là trưởng phòng CSKH 10 năm kinh nghiệm\") giúp gì?",
        options: [
          "Định hướng giọng văn và góc nhìn của câu trả lời",
          "Làm AI thật sự có mười năm kinh nghiệm chăm sóc khách",
          "Bảo đảm mọi thông tin trả về đều chính xác tuyệt đối",
          "Thay được bối cảnh, nên không cần viết bối cảnh nữa",
        ],
        correct: 0,
        explanation:
          "Vai trò giúp AI chọn giọng và góc nhìn - trưởng phòng CSKH sẽ viết khác nhân viên pháp chế. Nhưng vai trò không thêm kiến thức, không làm thông tin đúng hơn, và không thay được bối cảnh: AI vẫn không biết khách của bạn là ai.",
      },
    ],
    keyTakeaways: [
      "Sáu phần: vai trò, bối cảnh, nhiệm vụ, định dạng đầu ra, ví dụ mẫu, giới hạn.",
      "Bối cảnh cụ thể quan trọng hơn mọi lời khen hay chữ viết hoa.",
      "Một ví dụ mẫu nói rõ hơn mười câu mô tả giọng văn.",
      "Giới hạn tốt là cụ thể và kiểm được.",
      "Góp ý trong cùng cuộc chat, rồi sửa prompt gốc cho lần sau.",
    ],
    practicePrompt: {
      question:
        "Prompt: \"Bạn là chuyên viên nhân sự. Viết thông báo lịch nghỉ Tết.\" Thêm gì để kết quả dùng được ngay?",
      options: [
        "Ngày nghỉ, ai được nghỉ, độ dài, giọng, và một thông báo cũ làm mẫu",
        "Câu \"hãy cố gắng hết sức, đây là việc rất quan trọng với tôi\"",
        "Nhờ AI tự chọn ngày nghỉ Tết hợp lý nhất cho công ty năm nay",
        "Thêm vai trò: \"bạn đồng thời là giám đốc và kế toán trưởng\"",
      ],
      correct: 0,
      explanation:
        "Prompt đã có vai trò và nhiệm vụ nhưng thiếu bối cảnh (ngày nghỉ, đối tượng), định dạng (độ dài, giọng) và ví dụ mẫu. Ngày nghỉ là quyết định của công ty, không phải việc để AI đoán. Thêm vai trò không thêm thông tin nào.",
    },
    summary: {
      keyIdea: "AI chỉ biết những gì bạn gõ; thiếu bối cảnh thì nó viết cho tất cả mọi người.",
      formula: "Vai trò + bối cảnh + nhiệm vụ + định dạng đầu ra + ví dụ mẫu + giới hạn.",
      commonMistake: "Gõ một câu ngắn rồi sửa tay mười phút, thay vì viết prompt đủ ý trong hai phút.",
      action: "Viết lại prompt bạn dùng nhiều nhất theo sáu phần và so kết quả với bản cũ.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Lấy một việc chữ bạn làm hằng tuần. Gõ prompt kiểu cũ một lần, lưu kết quả. Rồi viết lại theo sáu phần, dán một bản cũ bạn ưng làm mẫu, và so hai kết quả cạnh nhau.",
      secondary: "Giữ lại prompt tốt hơn - bài 6 sẽ biến nó thành mẫu cho cả phòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn giao việc cho một đồng nghiệp mới thế nào thì giao cho AI như thế: nói rõ chuyện gì, cho ai, trông ra sao, và điều gì không được làm.",
      },
      { type: "heading", text: "Vấn đề: mười phút sửa một lá thư \"gần đúng\"" },
      {
        type: "paragraph",
        text: "Một nhân viên CSKH gõ \"viết email xin lỗi khách\" và nhận về lá thư lịch sự nhưng chung chung: không tên khách, không số đơn, hứa hẹn những điều công ty chưa quyết. Sửa mất mười phút - lâu hơn tự viết. Lỗi không nằm ở AI, mà ở chỗ nó phải đoán quá nhiều.",
      },
      { type: "heading", text: "Sáu phần của một prompt (câu lệnh cho AI)" },
      {
        type: "conceptTable",
        title: "Viết đủ sáu phần, bỏ bớt khi việc đơn giản",
        concepts: [
          { vi: "Vai trò", en: "Role", def: "AI đóng vai ai: chuyên viên nhân sự, trưởng nhóm CSKH. Quyết định giọng và góc nhìn." },
          { vi: "Bối cảnh", en: "Context", def: "Chuyện gì đang xảy ra, người đọc là ai, dữ liệu liên quan. Phần quan trọng nhất." },
          { vi: "Nhiệm vụ", en: "Task", def: "Một động từ rõ ràng: viết, tóm tắt, so sánh, liệt kê, sửa." },
          { vi: "Định dạng đầu ra", en: "Output format", def: "Bảng mấy cột, bao nhiêu chữ, gạch đầu dòng hay đoạn văn, xưng hô thế nào." },
          { vi: "Ví dụ mẫu", en: "Example", def: "Một bản bạn ưng để AI bắt chước giọng và cấu trúc." },
          { vi: "Giới hạn", en: "Constraints", def: "Điều không được nói, không được hứa, dữ liệu nào được dùng." },
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Prompt mơ hồ: AI phải đoán gần hết",
        code: `Viết email xin lỗi khách.`,
      },
      {
        type: "code",
        language: "text",
        caption: "Prompt đủ sáu phần: bản nháp đầu đã gần dùng được",
        code: `Vai trò: Bạn là trưởng nhóm chăm sóc khách hàng của một cửa hàng nội thất online.

Bối cảnh: Khách hàng chị Hoa đặt bàn làm việc (đơn DH-2291), hẹn giao ngày 12,
nhưng giao trễ 4 ngày vì kho nhập hàng chậm. Chị đã nhắn phàn nàn hai lần.
Công ty đã duyệt tặng chị mã giảm 10% cho đơn sau.

Nhiệm vụ: Viết email xin lỗi chị Hoa.

Định dạng: Dưới 150 chữ. Xưng "chúng tôi", gọi "chị Hoa". Giọng chân thành,
không văn mẫu. Có tiêu đề email.

Ví dụ mẫu (chỉ bắt chước giọng, không chép nội dung):
"""
Chào anh Nam, chúng tôi rất tiếc vì chiếc ghế của anh đến muộn...
"""

Giới hạn: Không hứa hoàn tiền. Không đổ lỗi cho đơn vị vận chuyển.
Không bịa thêm lý do ngoài lý do đã nêu ở trên.`,
      },
      {
        type: "paragraph",
        text: "Công cụ nào cũng được: ChatGPT, Claude, Gemini hay Copilot đều đọc prompt theo cùng một cách. Nếu công ty dùng Microsoft 365, Copilot trong Outlook có lợi thế là đã ở ngay trong hộp thư - nhưng prompt tốt vẫn là prompt đủ sáu phần.",
      },
      {
        type: "list",
        items: [
          "Viết bối cảnh trước, như đang kể cho đồng nghiệp mới.",
          "Nói định dạng bằng con số: \"dưới 150 chữ\", \"3 gạch đầu dòng\".",
          "Dán một bản cũ bạn ưng làm mẫu, dặn \"chỉ bắt chước giọng\".",
          "Góp ý cụ thể trong cùng cuộc chat nếu lần đầu chưa đúng.",
          "Khi đã ra bản tốt, sửa prompt gốc để lần sau không phải góp ý lại.",
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: bối cảnh cũng là dữ liệu",
        text: "Bối cảnh càng chi tiết, kết quả càng tốt - và bạn càng dễ dán nhầm thứ không được dán. Thay tên thật bằng \"khách A\", bỏ số điện thoại và địa chỉ nếu công cụ chưa được công ty duyệt. AI không cần số điện thoại của chị Hoa để viết một lá thư xin lỗi hay.",
      },
      {
        type: "closing",
        lines: [
          "Hai phút viết bối cảnh tiết kiệm mười phút sửa thư.",
          "Bài sau: dùng AI tóm tắt tài liệu dài và biên bản họp mà không mất ý.",
        ],
      },
    ],
  },
  {
    id: 1812,
    slug: "tom-tat-tai-lieu-va-bien-ban-hop",
    title: "Chặng 25, Bài 3: Tóm tắt tài liệu dài và biên bản họp mà không mất ý",
    subtitle: "Một bản tóm tắt trôi chảy vẫn có thể đánh rơi đúng câu quan trọng nhất.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    whyItMatters:
      "Tóm tắt là việc AI làm nhanh nhất và bị tin nhất - vì bản tóm tắt nào đọc cũng hợp lý. Nhưng cuộc họp tồn tại để ra quyết định và giao việc; một bản tóm tắt mất người phụ trách hay tự thêm hạn chót sẽ làm hỏng đúng thứ cuộc họp sinh ra.",
    openingQuestion:
      "Bạn dán biên bản cuộc họp 90 phút vào AI và chỉ gõ \"tóm tắt\". Rủi ro lớn nhất là gì?",
    openingOptions: [
      "Mất việc cần làm và người phụ trách, dù đoạn văn đọc rất trôi",
      "AI viết bản tóm tắt còn dài hơn cả biên bản cuộc họp gốc",
      "AI từ chối tóm tắt vì biên bản họp là tài liệu nội bộ",
      "Bản tóm tắt tự chuyển sang tiếng Anh thay vì tiếng Việt",
    ],
    correctOption: 0,
    explanation:
      "Chỉ gõ \"tóm tắt\" thì AI tự chọn thế nào là quan trọng - thường là các chủ đề được nói nhiều nhất, không phải các quyết định và việc cần làm. Kết quả là một đoạn văn trôi chảy kiểu \"cuộc họp đã thảo luận về ngân sách quý 4\" nhưng không còn ai làm gì, hạn khi nào. Các rủi ro còn lại hiếm gặp và thấy ngay khi đọc; mất việc cần làm thì chỉ phát hiện khi hạn đã qua.",
    diagram: [
      { label: "Dán tài liệu, nói rõ khung cần điền", arrow: true },
      { label: "Quyết định - việc cần làm - người phụ trách - hạn", arrow: true },
      { label: "Hỏi ngược: câu gốc của từng ý ở đâu?", arrow: true },
      { label: "Người chủ trì duyệt rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Phòng vận hành một chuỗi cửa hàng (tình huống)",
      description:
        "Trưởng phòng dùng AI tóm tắt họp giao ban tuần và gửi thẳng cho các cửa hàng. Một tuần, bản tóm tắt ghi \"cửa hàng Quận 7 kiểm kho trước thứ Sáu\" - trong khi cuộc họp chỉ nói \"Quận 7 sẽ xem xét kiểm kho\". Cửa hàng đóng cửa sớm để kiểm kho. Từ đó mọi bản tóm tắt phải qua bước hỏi ngược và người chủ trì duyệt.",
    },
    quiz: [
      {
        question: "Khung tóm tắt biên bản họp hữu ích nhất có những cột nào?",
        options: [
          "Quyết định, việc cần làm, người phụ trách, hạn chót",
          "Giờ họp, phòng họp, số người dự, ai chủ trì buổi họp",
          "Ai nói nhiều nhất, ai im lặng, ai tới muộn bao lâu",
          "Tóm tắt từng phút họp theo đúng thứ tự thời gian",
        ],
        correct: 0,
        explanation:
          "Người đọc biên bản muốn biết đã chốt gì và ai phải làm gì trước khi nào. Bốn cột đó biến một đoạn văn thành danh sách kiểm được. Giờ, phòng, số người là phần hành chính; tóm từng phút chỉ là biên bản gốc viết ngắn lại.",
      },
      {
        question: "Độ dài ngữ cảnh (context window) của AI là gì?",
        options: [
          "Lượng chữ tối đa AI xem được trong một lần làm việc",
          "Số tài liệu tối đa bạn được lưu trong tài khoản của mình",
          "Thời gian tối đa một cuộc trò chuyện được mở",
          "Số câu hỏi tối đa bạn được hỏi AI trong mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Mỗi mô hình chỉ xem được một lượng chữ nhất định cùng lúc, gồm cả tài liệu bạn dán lẫn cuộc trò chuyện trước đó. Tài liệu dài hơn thì bị cắt, hoặc được đọc lướt - và phần giữa tài liệu thường là phần dễ bị bỏ sót nhất.",
      },
      {
        question: "Tài liệu 200 trang, AI tóm lướt và bỏ sót nhiều phần. Cách xử lý hợp lý?",
        options: [
          "Chia theo chương, tóm từng phần rồi tóm gộp lại",
          "Dán hết một lần và dặn AI \"đọc thật kỹ từng chữ\"",
          "Chỉ dán 10 trang đầu vì ý chính luôn nằm ở phần đầu",
          "Chụp màn hình thành ảnh để AI đọc được nhiều hơn",
        ],
        correct: 0,
        explanation:
          "Chia nhỏ để mỗi lần AI chỉ xử lý một lượng vừa sức, rồi tóm gộp các bản tóm tắt. Lời dặn \"đọc kỹ\" không nới được giới hạn. Ý chính không phải lúc nào cũng ở đầu - điều khoản phạt thường nằm ở cuối hợp đồng.",
      },
      {
        question: "\"Hỏi ngược\" để kiểm một bản tóm tắt nghĩa là gì?",
        options: [
          "Nhờ AI chỉ câu gốc cho từng ý, rồi tự mở ra đối chiếu",
          "Hỏi AI \"bạn chắc chắn chưa?\" và tin nếu nó nói chắc",
          "Nhờ AI tóm tắt lại chính bản tóm tắt cho ngắn hơn nữa",
          "Đọc bản tóm tắt từ dưới lên để dễ thấy lỗi chính tả",
        ],
        correct: 0,
        explanation:
          "Yêu cầu \"với mỗi ý, trích nguyên văn câu trong biên bản làm căn cứ\" rồi tìm câu đó trong tài liệu gốc. Ý nào không có câu gốc là ý AI tự thêm. Hỏi \"chắc chưa\" thì AI thường trả lời chắc, vì câu đó cũng chỉ là chữ nghe hợp lý.",
      },
      {
        question: "Trước khi gửi bản tóm tắt họp cho cả nhóm, bước nào không được bỏ?",
        options: [
          "Người chủ trì đọc lại, sửa tên và hạn cho đúng",
          "Nhờ AI thêm lời cảm ơn mọi người đã tới họp đông đủ",
          "Gửi ngay cho kịp; ai thấy sai thì tự trả lời email",
          "Chuyển sang PDF để không ai sửa được nội dung nữa",
        ],
        correct: 0,
        explanation:
          "Bản tóm tắt họp là văn bản giao việc: sai tên người thì việc không ai làm, sai hạn thì làm hỏng lịch cả nhóm. Người chủ trì là người biết chắc đã chốt gì, nên đó là người duyệt. \"Ai thấy sai thì báo\" nghĩa là không ai chịu trách nhiệm.",
      },
    ],
    keyTakeaways: [
      "Đừng chỉ gõ \"tóm tắt\" - đưa khung: quyết định, việc, người phụ trách, hạn.",
      "Tài liệu dài vượt độ dài ngữ cảnh thì chia nhỏ, tóm từng phần rồi gộp.",
      "Hỏi ngược: mỗi ý phải có câu gốc làm căn cứ.",
      "Ý không có câu gốc là ý AI tự thêm.",
      "Người chủ trì duyệt trước khi gửi bản tóm tắt.",
    ],
    practicePrompt: {
      question:
        "Bản tóm tắt ghi: \"Anh Minh gửi báo giá trước thứ Sáu.\" Biên bản gốc chỉ có câu \"Minh sẽ xem lại báo giá.\" Chuyện gì đã xảy ra?",
      options: [
        "AI tự thêm hạn chót không có trong biên bản",
        "AI tóm đúng, vì \"xem lại\" và \"gửi\" gần như là một",
        "Biên bản gốc ghi thiếu, nên sửa theo bản của AI",
        "AI đọc sót một trang, dán lại cả biên bản là xong",
      ],
      correct: 0,
      explanation:
        "\"Xem lại\" thành \"gửi\", và \"trước thứ Sáu\" xuất hiện từ hư không - AI viết ra câu giao việc nghe hợp lý nhất, chứ không phải câu có trong biên bản. Đây đúng là lỗi mà bước hỏi ngược bắt được. Biên bản gốc là căn cứ, không sửa gốc theo bản tóm tắt.",
    },
    summary: {
      keyIdea: "Tóm tắt tốt là điền đúng một khung, không phải viết một đoạn văn hay.",
      formula: "Khung (quyết định - việc - người - hạn) + chia nhỏ khi dài + hỏi ngược + người duyệt.",
      commonMistake: "Gửi thẳng bản tóm tắt vì nó đọc rất trôi, không đối chiếu với tài liệu gốc.",
      action: "Lấy biên bản cuộc họp gần nhất, tóm theo khung bốn cột và hỏi ngược từng dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biên bản họp gần đây (đã bỏ thông tin nhạy cảm). Dùng prompt khung bốn cột ở trên, rồi yêu cầu trích câu gốc cho từng dòng. Đếm xem có bao nhiêu dòng không tìm được câu gốc.",
      secondary: "Nếu con số đó lớn hơn 0, bạn vừa thấy vì sao bước hỏi ngược không được bỏ.",
    },
    sections: [
      {
        type: "lead",
        text: "Đọc một hợp đồng 40 trang hay một biên bản họp 90 phút mất cả buổi. AI làm trong một phút - với điều kiện bạn nói rõ cần giữ lại cái gì, và kiểm lại cái nó giữ.",
      },
      { type: "heading", text: "Vấn đề: bản tóm tắt nghe hay nhưng không ai biết phải làm gì" },
      {
        type: "paragraph",
        text: "Sau mỗi cuộc họp giao ban, một thư ký mất khoảng 45 phút gõ lại biên bản. Nhờ AI chỉ còn 2 phút, nhưng bản tóm tắt kiểu \"cuộc họp thảo luận nhiều vấn đề về ngân sách\" thì không ai hành động được. Thứ cần giữ là quyết định và việc cần làm, không phải chủ đề.",
      },
      { type: "heading", text: "Cách làm: đưa khung trước, rồi mới đưa tài liệu" },
      {
        type: "code",
        language: "text",
        caption: "Prompt tóm tắt biên bản họp theo khung",
        code: `Dưới đây là biên bản cuộc họp. Hãy tóm tắt thành đúng hai phần:

1. QUYẾT ĐỊNH ĐÃ CHỐT: gạch đầu dòng, mỗi dòng một quyết định.
2. VIỆC CẦN LÀM: bảng 4 cột
   | Việc | Người phụ trách | Hạn | Câu gốc trong biên bản |

Quy tắc:
- Chỉ ghi điều có trong biên bản. Không suy ra thêm.
- Nếu biên bản không nói ai phụ trách hoặc hạn khi nào, ghi "CHƯA RÕ".
- Cột "Câu gốc" chép nguyên văn câu làm căn cứ.
- Ý nào còn đang bàn, chưa chốt: đưa vào mục "CÒN MỞ", không đưa vào quyết định.

Biên bản:
"""
[dán biên bản ở đây]
"""`,
      },
      {
        type: "paragraph",
        text: "Chữ \"CHƯA RÕ\" là phần quan trọng nhất của prompt này. Không có nó, AI sẽ tự điền một cái tên và một cái hạn nghe hợp lý - vì một bảng đầy đủ trông đẹp hơn một bảng có ô trống.",
      },
      { type: "heading", text: "Tài liệu dài: độ dài ngữ cảnh có hạn" },
      {
        type: "paragraph",
        text: "Mỗi mô hình chỉ xem được một lượng chữ nhất định mỗi lần, gọi là độ dài ngữ cảnh (context window). Tài liệu vượt giới hạn thì bị cắt; tài liệu gần giới hạn thì hay bị đọc lướt, phần giữa dễ rơi nhất. Với hợp đồng, báo cáo dài: chia theo chương, tóm từng chương theo cùng một khung, rồi tóm gộp.",
      },
      {
        type: "list",
        items: [
          "ChatGPT, Claude, Gemini, Copilot: dán hoặc tải tài liệu lên, dùng prompt khung ở trên.",
          "NotebookLM: tải nhiều tài liệu vào một sổ, hỏi đáp trên chính các tài liệu đó, câu trả lời kèm chỗ trích trong tài liệu - tiện cho bước hỏi ngược.",
          "Công cụ ghi chép họp tích hợp trong Teams, Zoom, Google Meet: tiện, nhưng vẫn cần khung và người duyệt như trên.",
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: tóm sai là giao sai việc",
        text: "Hai kiểu lỗi hay gặp nhất: bỏ sót một việc cần làm, và tự thêm một hạn chót hay người phụ trách không có trong cuộc họp. Cả hai đều đọc rất tự nhiên. Người chủ trì cuộc họp luôn là người duyệt cuối trước khi bản tóm tắt được gửi đi. Biên bản họp hội đồng quản trị, kỷ luật nhân sự: chỉ dùng công cụ công ty đã duyệt.",
      },
      {
        type: "closing",
        lines: [
          "Khung trước, tài liệu sau, hỏi ngược cuối cùng.",
          "Bài sau là dự án: dựng một trợ lý nghiên cứu trích nguồn mà bạn kiểm được từng dòng.",
        ],
      },
    ],
  },
  {
    id: 1813,
    slug: "du-an-tro-ly-nghien-cuu-bang-ai",
    title: "Chặng 25, Bài 4: Dự án - dựng trợ lý nghiên cứu bằng AI",
    subtitle: "Từ một câu hỏi của sếp tới một bảng khẳng định có nguồn, kiểm được từng dòng.",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    whyItMatters:
      "Tìm hiểu đối thủ, thị trường, một quy định mới - việc từng tốn cả ngày đọc web nay AI làm trong vài phút. Nhưng báo cáo nghiên cứu chỉ có giá trị khi từng khẳng định truy được về nguồn. Dự án này cho bạn một quy trình làm lại được mỗi tuần.",
    openingQuestion:
      "Sếp nhờ bạn tìm hiểu \"ba đối thủ chính đang định giá gói dịch vụ thế nào\". Giao cho AI cách nào đúng?",
    openingOptions: [
      "Bật chế độ tìm kiếm web và bắt trích nguồn cho từng khẳng định",
      "Hỏi chat thường không tìm web, vì nó đã đọc rất nhiều trang rồi",
      "Nhờ AI viết luôn báo cáo năm trang để kịp gửi sếp trong hôm nay",
      "Dán tên ba đối thủ và nhờ AI ước giá dựa trên quy mô của họ",
    ],
    correctOption: 0,
    explanation:
      "Giá gói dịch vụ là thông tin thay đổi thường xuyên - chat thường không tìm web chỉ biết tới ngày dữ liệu của nó dừng, và có thể đưa ra một bảng giá nghe rất thật. Chế độ tìm kiếm web cho AI đọc trang hiện tại, còn yêu cầu trích nguồn cho bạn cách kiểm từng con số. Viết ngay báo cáo năm trang là nhận về năm trang chưa kiểm; ước giá theo quy mô là nhờ AI đoán.",
    diagram: [
      { label: "1. Câu hỏi nghiên cứu hẹp, đo được", arrow: true },
      { label: "2. AI tìm web, trích nguồn từng ý", arrow: true },
      { label: "3. Bảng: khẳng định - nguồn - đã kiểm chưa", arrow: true },
      { label: "4. Bạn mở từng nguồn, đánh dấu", arrow: true },
      { label: "5. Chỉ gửi dòng đã kiểm, ghi rõ dòng chưa" },
    ],
    realWorldExample: {
      company: "Nhóm marketing 3 người của một công ty phần mềm (tình huống)",
      description:
        "Mỗi quý, nhóm mất khoảng hai ngày tổng hợp giá và tính năng của đối thủ. Với quy trình trợ lý nghiên cứu, AI làm bản nháp bảng trong 15 phút, người trong nhóm mất thêm khoảng một giờ mở và kiểm từng nguồn. Lần đầu làm, 4 trong 20 dòng bị loại vì nguồn không chứa con số AI ghi.",
    },
    quiz: [
      {
        question: "Câu hỏi nghiên cứu nào tốt nhất để giao cho AI?",
        options: [
          "Giá gói cơ bản của X, Y, Z năm nay là bao nhiêu?",
          "Thị trường phần mềm kế toán hiện nay thế nào?",
          "Hãy nghiên cứu mọi thứ về đối thủ của chúng tôi",
          "Đối thủ nào mạnh nhất và chúng tôi nên làm gì bây giờ?",
        ],
        correct: 0,
        explanation:
          "Câu hỏi tốt hẹp và có đáp án kiểm được: ai, cái gì, khi nào. \"Thị trường thế nào\" hay \"mọi thứ về đối thủ\" cho ra một bài văn chung chung không kiểm được dòng nào. \"Nên làm gì\" là quyết định của bạn, dựa trên dữ liệu đã kiểm.",
      },
      {
        question: "AI đưa một khẳng định kèm nguồn. Khi nào dòng đó được đánh dấu \"đã kiểm\"?",
        options: [
          "Khi bạn mở nguồn và thấy chính khẳng định đó",
          "Khi đường dẫn mở được và trang thuộc một tờ báo lớn",
          "Khi hai công cụ AI khác nhau cho ra cùng một con số",
          "Khi AI ghi rõ tên tác giả và ngày đăng của bài viết",
        ],
        correct: 0,
        explanation:
          "Đường dẫn mở được chưa đủ - AI có thể trích đúng trang nhưng sai con số, hoặc lấy số từ một đoạn nói về chuyện khác. Hai AI cùng sai là chuyện có thật, vì chúng học từ nguồn giống nhau. Chỉ khi bạn tìm thấy khẳng định trong nguồn thì dòng đó mới được đánh dấu.",
      },
      {
        question: "Chế độ nghiên cứu sâu (deep research) khác chat thường ở chỗ nào?",
        options: [
          "Nó tự tìm, đọc nhiều trang rồi viết báo cáo có nguồn",
          "Nó dùng dữ liệu nội bộ công ty bạn mà không cần tải lên",
          "Nó bảo đảm mọi nguồn trích dẫn đều đã được người kiểm",
          "Nó trả lời ngay lập tức, nhanh hơn hẳn chat thông thường",
        ],
        correct: 0,
        explanation:
          "Nghiên cứu sâu chạy nhiều vòng tìm kiếm và đọc trong vài phút tới vài chục phút, rồi viết báo cáo kèm trích dẫn. Nó chậm hơn chat thường, không tự đọc dữ liệu nội bộ, và không ai kiểm nguồn hộ bạn - báo cáo có nguồn vẫn có thể trích sai nguồn.",
      },
      {
        question: "Nguồn AI trích là một blog không rõ tác giả, nhắc lại số của một báo cáo khác. Nên làm gì?",
        options: [
          "Lần tới báo cáo gốc và trích số từ chính báo cáo đó",
          "Giữ nguyên, vì đã có nguồn là đủ để đưa vào bảng",
          "Xoá luôn khẳng định, vì số lấy từ blog thì chắc chắn là sai",
          "Hỏi AI blog đó có uy tín không rồi làm theo nó",
        ],
        correct: 0,
        explanation:
          "Blog nhắc lại số liệu là nguồn thứ cấp: có thể chép sai, làm tròn, hoặc lấy từ năm cũ. Lần tới báo cáo gốc mới biết con số đúng và thuộc năm nào. Xoá ngay thì có thể mất một số liệu đúng; hỏi AI về uy tín thì lại là tin AI.",
      },
      {
        question: "Bảng \"khẳng định - nguồn - đã kiểm chưa\" có tác dụng gì?",
        options: [
          "Cho người đọc thấy ngay dòng nào đã kiểm, dòng nào chưa",
          "Làm báo cáo dài hơn và trông công phu hơn khi nộp sếp",
          "Thay được bước mở nguồn, vì bảng đã ghi đủ đường dẫn",
          "Giúp AI nhớ nguồn để lần sau ở cuộc chat khác dùng lại",
        ],
        correct: 0,
        explanation:
          "Bảng biến một bài văn khó kiểm thành từng dòng kiểm được, và cột \"đã kiểm chưa\" nói thật với người đọc bạn chắc tới đâu. Nó không thay được việc mở nguồn - chính cột đó chỉ được điền sau khi bạn mở.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi nghiên cứu hẹp, có đáp án kiểm được.",
      "Bật tìm kiếm web hoặc nghiên cứu sâu; bắt trích nguồn cho từng khẳng định.",
      "\"Đã kiểm\" nghĩa là bạn thấy khẳng định trong nguồn, không phải đường dẫn mở được.",
      "Lần tới nguồn gốc, không dừng ở trang nhắc lại.",
      "Gửi dòng đã kiểm, ghi rõ dòng chưa xác nhận.",
    ],
    practicePrompt: {
      question:
        "Bảng của bạn có 12 dòng: 9 đã kiểm, 2 nguồn không mở được, 1 nguồn mở được nhưng không có con số đó. Gửi sếp thế nào?",
      options: [
        "Gửi 9 dòng đã kiểm, ghi rõ 3 dòng chưa xác nhận được",
        "Gửi đủ 12 dòng, vì 9 dòng đúng thì 3 dòng kia chắc cũng đúng",
        "Bỏ cả bảng và làm lại từ đầu bằng một công cụ AI khác",
        "Nhờ AI sửa 3 dòng kia cho khớp với các nguồn mở được",
      ],
      correct: 0,
      explanation:
        "Chín dòng đã kiểm là kết quả thật, ba dòng còn lại là câu hỏi mở - nói rõ như vậy là trung thực và hữu ích cho sếp. Dòng đúng không làm dòng khác đúng theo. Nhờ AI sửa cho khớp là bảo nó viết lại khẳng định theo nguồn, không phải kiểm chứng.",
    },
    summary: {
      keyIdea: "Trợ lý nghiên cứu cho bạn bản nháp có nguồn; bạn biến nó thành bảng đã kiểm.",
      formula: "Câu hỏi hẹp → tìm web + trích nguồn → bảng khẳng định - nguồn - đã kiểm → chỉ gửi dòng đã kiểm.",
      commonMistake: "Đánh dấu \"đã kiểm\" vì đường dẫn mở được, không đọc xem nguồn có nói đúng điều đó không.",
      action: "Chạy quy trình năm bước cho một câu hỏi thật của công việc tuần này.",
    },
    application: {
      title: "Dự án: 30 phút cho một bảng nghiên cứu",
      message:
        "Chọn một câu hỏi thật (giá đối thủ, một quy định mới, số liệu ngành). Chạy prompt trợ lý nghiên cứu ở trên, rồi mở từng nguồn và điền cột \"đã kiểm\". Xong là khi mỗi dòng có một trong ba trạng thái và bạn biết lý do.",
      secondary: "Lưu prompt lại - bài 6 sẽ đưa nó vào thư viện của cả phòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là dự án đầu của chặng. Cuối bài bạn có một quy trình năm bước và một prompt dùng lại được để biến mọi câu hỏi \"tìm hiểu giúp anh\" thành một bảng có nguồn, kiểm được từng dòng.",
      },
      { type: "heading", text: "Vấn đề: một ngày đọc web cho một trang báo cáo" },
      {
        type: "paragraph",
        text: "Sếp hỏi \"đối thủ đang định giá thế nào?\". Cách cũ: mở hai chục tab, chép số vào Excel, mất gần một ngày. Cách vội: hỏi chat thường và nhận về một bảng giá trông rất thật - có thể là giá năm ngoái, có thể là giá không tồn tại.",
      },
      { type: "heading", text: "Công nghệ giải nó thế nào" },
      {
        type: "paragraph",
        text: "Các công cụ AI giờ có chế độ tìm kiếm web: thay vì chỉ dựa vào dữ liệu đã học, AI tìm trang hiện tại, đọc, rồi viết câu trả lời kèm đường dẫn. Chế độ nghiên cứu sâu (deep research) đi xa hơn: tự chạy nhiều vòng tìm và đọc trong vài phút, rồi viết một báo cáo có trích dẫn. AI làm phần tìm và đọc; bạn làm phần kiểm.",
      },
      {
        type: "list",
        items: [
          "ChatGPT, Claude, Gemini: chế độ tìm kiếm web và chế độ nghiên cứu sâu (tên gọi đổi theo từng thời điểm).",
          "Perplexity: công cụ trả lời bằng tìm kiếm, luôn kèm nguồn đánh số - tiện cho câu hỏi nhanh.",
          "Microsoft Copilot: có tìm web; bản doanh nghiệp còn tìm được trong tài liệu công ty nếu được cấu hình.",
          "Excel hoặc Google Sheets: nơi đặt bảng tổng hợp cuối cùng.",
        ],
      },
      { type: "heading", text: "Dựng thế nào: năm bước" },
      {
        type: "list",
        items: [
          "Bước 1 - Viết câu hỏi hẹp: ai, cái gì, thời điểm nào. \"Giá gói cơ bản của X, Y, Z công bố năm nay\" thay cho \"tìm hiểu đối thủ\".",
          "Bước 2 - Bật tìm kiếm web hoặc nghiên cứu sâu, dán prompt mẫu bên dưới.",
          "Bước 3 - Nhận bảng khẳng định - nguồn - trích nguyên văn. Chép sang Google Sheets hoặc Excel, thêm cột \"Đã kiểm\".",
          "Bước 4 - Mở từng nguồn. Tìm câu trích nguyên văn (Ctrl+F). Thấy đúng: \"Đã kiểm\". Không mở được: \"Nguồn lỗi\". Mở được nhưng không có: \"Không khớp\".",
          "Bước 5 - Gửi báo cáo chỉ dựa trên dòng \"Đã kiểm\", kèm một dòng nói rõ bao nhiêu khẳng định chưa xác nhận được.",
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Prompt trợ lý nghiên cứu (dùng với chế độ tìm kiếm web hoặc nghiên cứu sâu)",
        code: `Vai trò: Bạn là trợ lý nghiên cứu. Nhiệm vụ của bạn là tìm và trích nguồn,
không phải đưa ra ý kiến.

Câu hỏi nghiên cứu:
Giá niêm yết gói cơ bản của [Đối thủ A], [Đối thủ B], [Đối thủ C]
tại Việt Nam, theo thông tin công bố trong năm nay.

Yêu cầu:
1. Tìm trên web. Ưu tiên trang chính thức của từng công ty, rồi tới báo chí.
   Không dùng diễn đàn hay trang tổng hợp không rõ tác giả.
2. Trả về một bảng với các cột:
   | Khẳng định | Nguồn (tên trang + đường dẫn) | Trích nguyên văn từ nguồn | Ngày của nguồn |
3. Mỗi dòng chỉ một khẳng định. Cột "Trích nguyên văn" phải chép đúng câu
   trong trang, không diễn đạt lại.
4. Nếu không tìm được nguồn cho một ý, ghi "KHÔNG TÌM THẤY NGUỒN".
   Không ước đoán, không suy ra từ quy mô công ty.
5. Nếu hai nguồn mâu thuẫn, ghi cả hai thành hai dòng.
6. Cuối cùng, liệt kê riêng những điều bạn KHÔNG chắc chắn.`,
      },
      {
        type: "callout",
        label: "Xong là khi",
        text: "Bảng có ít nhất 8 dòng; mỗi dòng có một trong ba trạng thái Đã kiểm / Nguồn lỗi / Không khớp; mọi dòng Đã kiểm là do chính bạn mở nguồn và thấy câu trích; và báo cáo gửi đi chỉ dựa trên dòng Đã kiểm.",
      },
      {
        type: "callout",
        label: "Rủi ro: có nguồn chưa chắc đúng nguồn",
        text: "Đường dẫn thật mà nội dung không khớp là lỗi hay gặp nhất của chế độ tìm kiếm - AI tổng hợp sai từ trang nó đã đọc. Và đừng dán tài liệu nội bộ vào câu hỏi nghiên cứu trên công cụ chưa được duyệt: câu hỏi của bạn đôi khi đã tiết lộ kế hoạch của công ty.",
      },
      {
        type: "closing",
        lines: [
          "AI tìm và đọc; bạn mở và kiểm.",
          "Bài sau: nhận diện AI bịa trông ra sao, và năm cách bắt nó.",
        ],
      },
    ],
  },
  {
    id: 1814,
    slug: "kiem-chung-dau-ra-ai-bia",
    title: "Chặng 25, Bài 5: Kiểm chứng - khi AI bịa trông như thật",
    subtitle: "Câu bịa không có dấu hiệu gì đặc biệt. Nó tự tin y như câu đúng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧐",
    track: "personal",
    whyItMatters:
      "Một câu sai trong email nội bộ thì sửa được. Một con số bịa trong báo cáo thuế, một điều luật không tồn tại trong thư gửi khách, một trích dẫn giả trong tài liệu nộp cơ quan - thì người ký là bạn. Biết AI bịa trông ra sao là kỹ năng rẻ nhất để tránh những sai lầm đắt nhất.",
    openingQuestion:
      "AI viết cho bạn: \"Theo Điều 45 của nghị định về hoá đơn điện tử, doanh nghiệp phải...\" - có số điều, có tên văn bản. Nên xử lý thế nào?",
    openingOptions: [
      "Tra văn bản gốc trên nguồn chính thức, đọc đúng điều đó",
      "Dùng luôn, vì có số điều cụ thể thì khó mà bịa ra được",
      "Hỏi lại AI một lần nữa, nếu nó trả lời giống thì dùng",
      "Bỏ số điều đi, chỉ giữ nội dung cho đỡ phải kiểm tra",
    ],
    correctOption: 0,
    explanation:
      "Số điều, tên văn bản, năm ban hành là những chi tiết AI tạo ra rất dễ - chúng chỉ là chữ nghe hợp lý. Chi tiết cụ thể làm câu trông đáng tin hơn, không làm nó đúng hơn. Hỏi lại thường cho câu trả lời giống hệt, vì cùng một xác suất sinh ra cùng một câu. Bỏ số điều thì câu sai vẫn nằm đó, chỉ khó bắt hơn. Chỉ văn bản gốc trên cổng thông tin chính thức mới trả lời được điều 45 nói gì.",
    diagram: [
      { label: "AI viết: số liệu, trích dẫn, tên văn bản", arrow: true },
      { label: "Tìm nguồn gốc: văn bản, báo cáo, trang chính thức", arrow: true },
      { label: "Thấy đúng câu đó trong nguồn?", arrow: true },
      { label: "Có: dùng. Không: bỏ hoặc thay nguồn thật" },
    ],
    realWorldExample: {
      company: "Vụ Mata kiện Avianca (Mỹ, 2023)",
      description:
        "Năm 2023, luật sư của nguyên đơn trong vụ kiện hãng hàng không Avianca ở New York nộp cho toà một bản lập luận trích nhiều bản án do ChatGPT đưa ra. Các bản án đó không tồn tại - có tên vụ, số hiệu, cả đoạn trích trông rất thật. Toà đã xử phạt các luật sư. Họ có hỏi lại ChatGPT xem các vụ đó có thật không, và nó xác nhận là có.",
    },
    quiz: [
      {
        question: "Hiện tượng AI bịa (hallucination) là gì?",
        options: [
          "AI viết ra thông tin sai với giọng rất tự tin",
          "AI từ chối trả lời vì câu hỏi vi phạm chính sách",
          "AI trả lời chậm vì máy chủ đang có quá nhiều người",
          "AI trả lời bằng ngôn ngữ khác ngôn ngữ bạn đã hỏi",
        ],
        correct: 0,
        explanation:
          "Hallucination là khi AI sinh ra thông tin không có thật - số liệu, nguồn, sự kiện - và trình bày y như thông tin đúng. Nó không đi kèm dấu hiệu cảnh báo nào, nên không thể bắt bằng cách đọc giọng văn. Từ chối hay trả lời chậm là chuyện khác.",
      },
      {
        question: "Loại đầu ra nào dễ bị bịa nhất?",
        options: [
          "Con số cụ thể, trích dẫn, tên văn bản, đường dẫn",
          "Lời chào mở đầu và câu kết lịch sự của một email",
          "Dàn ý ba phần cho một bài thuyết trình nội bộ",
          "Bản viết lại một đoạn văn cho câu chữ ngắn gọn hơn",
        ],
        correct: 0,
        explanation:
          "Chi tiết cụ thể là nơi \"nghe hợp lý\" và \"đúng\" tách xa nhau nhất: một con số 37,2% nghe hợp lý chẳng kém 42,8%. Lời chào, dàn ý, viết lại đoạn văn thì không có sự thật nào để bịa - bạn đánh giá được bằng mắt.",
      },
      {
        question: "Cách bắt bịa nào hiệu quả nhất với một con số thống kê?",
        options: [
          "Tìm con số đó trong báo cáo gốc của tổ chức công bố",
          "Hỏi AI \"số này có đúng không?\" và tin nếu nó xác nhận",
          "Xem con số có khớp với cảm nhận của mình hay không",
          "Nhờ AI làm tròn con số đi cho bớt sai lệch chi tiết",
        ],
        correct: 0,
        explanation:
          "Con số thống kê chỉ có một nơi xác nhận được: báo cáo gốc của tổ chức đã công bố nó. AI xác nhận lại điều nó vừa bịa là chuyện thường gặp - chính vụ Mata kiện Avianca là như vậy. Cảm nhận thì chỉ bắt được con số sai lố.",
      },
      {
        question: "Khi nào TUYỆT ĐỐI không dùng đầu ra AI chưa kiểm?",
        options: [
          "Khi nó đi vào hợp đồng, hồ sơ thuế hay thư gửi khách",
          "Khi bạn dùng nó để động não ý tưởng cho họp nội bộ",
          "Khi bạn nhờ nó sửa chính tả email gửi cho đồng nghiệp",
          "Khi bạn nhờ nó gợi ý tiêu đề cho một bài đăng nội bộ",
        ],
        correct: 0,
        explanation:
          "Ranh giới là hậu quả: văn bản có giá trị pháp lý, tài chính, hoặc đi ra ngoài công ty mang tên công ty. Ở đó một câu sai có thể thành trách nhiệm pháp lý. Động não, sửa chính tả, gợi ý tiêu đề thì bạn tự đánh giá được ngay.",
      },
      {
        question: "Vì sao dặn AI \"không biết thì nói không biết\" vẫn chưa đủ?",
        options: [
          "Nó giảm bịa nhưng không loại bỏ, nên vẫn phải kiểm",
          "Vì sau câu dặn đó AI sẽ từ chối trả lời mọi câu hỏi",
          "Vì câu dặn đó khiến AI chuyển sang trả lời tiếng Anh",
          "Vì AI không đọc những câu dặn đặt ở cuối prompt",
        ],
        correct: 0,
        explanation:
          "Câu dặn đó hữu ích và nên dùng - AI sẽ nói \"không chắc\" thường hơn. Nhưng AI không biết chắc khi nào mình đang bịa, nên câu dặn không bắt được hết. Nó là lớp đầu tiên, không phải lớp duy nhất.",
      },
    ],
    keyTakeaways: [
      "AI bịa với cùng giọng tự tin như khi nói đúng.",
      "Dễ bịa nhất: con số, trích dẫn, tên văn bản, đường dẫn, tên người.",
      "Hỏi lại chính AI không phải là kiểm chứng.",
      "Chỉ nguồn gốc xác nhận được một chi tiết cụ thể.",
      "Hợp đồng, thuế, thư gửi khách: không dùng đầu ra chưa kiểm.",
    ],
    practicePrompt: {
      question:
        "Báo cáo AI viết có câu: \"Một khảo sát năm 2024 của một hãng tư vấn lớn cho thấy 67% doanh nghiệp...\". Bạn tìm không ra khảo sát nào như vậy. Làm gì?",
      options: [
        "Bỏ câu đó, hoặc thay bằng số liệu có nguồn thật",
        "Giữ lại nhưng viết \"theo một khảo sát\" cho an toàn",
        "Giữ nguyên, vì các hãng lớn chắc có khảo sát kiểu này",
        "Làm tròn thành \"khoảng 70%\" để bớt cụ thể hơn",
      ],
      correct: 0,
      explanation:
        "Không tìm ra nguồn thì con số đó chưa phải thông tin - nó là chữ nghe hợp lý. Viết mơ hồ đi hay làm tròn không làm nó đúng lên, chỉ làm người đọc khó bắt lỗi hơn. Hoặc bỏ, hoặc thay bằng một số liệu bạn đã mở được nguồn.",
    },
    summary: {
      keyIdea: "Bịa không có dấu hiệu; chỉ có nguồn gốc mới phân biệt được câu bịa và câu đúng.",
      formula: "Chi tiết cụ thể → tìm nguồn gốc → thấy đúng câu đó thì dùng, không thấy thì bỏ.",
      commonMistake: "Hỏi lại chính AI \"có thật không\" và coi câu xác nhận của nó là kiểm chứng.",
      action: "Lấy một văn bản AI viết gần đây và đánh dấu mọi chi tiết cụ thể, rồi kiểm từng cái.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Hỏi AI (chế độ chat thường, không tìm web) một câu về ngành của bạn và yêu cầu kèm 3 số liệu có nguồn. Kiểm cả 3 bằng năm cách ở trên. Ghi lại: bao nhiêu số tìm được nguồn gốc, bao nhiêu không.",
      secondary: "Làm lại với chế độ tìm kiếm web và so kết quả - đó là lý do bài 4 bắt bật tìm web.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài này không dạy bạn nghi ngờ mọi thứ AI viết - việc đó mất hết lợi ích của AI. Nó dạy bạn biết chỗ nào cần kiểm, kiểm bằng cách nào, và khi nào tuyệt đối không được bỏ qua.",
      },
      { type: "heading", text: "Vấn đề: câu bịa không có dấu hiệu gì" },
      {
        type: "paragraph",
        text: "Một chuyên viên pháp chế nhờ AI soạn thư trả lời khách về điều khoản bảo hành, kèm căn cứ pháp lý. Thư có số điều, tên văn bản, năm ban hành - trông rất chuyên nghiệp. Một trong ba căn cứ không tồn tại. Nếu không mở văn bản gốc, không cách nào nhận ra, vì câu bịa được viết cùng giọng với hai câu đúng.",
      },
      { type: "heading", text: "AI bịa (hallucination) trông thế nào" },
      {
        type: "conceptTable",
        title: "Bốn kiểu bịa hay gặp ở văn phòng",
        concepts: [
          { vi: "Số liệu", en: "Statistics", def: "Tỷ lệ phần trăm, quy mô thị trường, \"theo khảo sát\" - cụ thể tới số lẻ nhưng không có nguồn gốc." },
          { vi: "Trích dẫn", en: "Quotes and citations", def: "Lời một người nổi tiếng, tên bài báo, tên tác giả, đường dẫn trông thật mà không mở ra được hoặc nói chuyện khác." },
          { vi: "Tên văn bản pháp lý", en: "Legal references", def: "Số hiệu nghị định, thông tư, số điều - có thể không tồn tại, đã hết hiệu lực, hoặc nói điều khác." },
          { vi: "Tài liệu không tồn tại", en: "Fabricated sources", def: "Báo cáo, bản án, nghiên cứu có đủ tên, năm, tác giả - nhưng chưa từng được công bố." },
        ],
      },
      { type: "heading", text: "Năm cách bắt" },
      {
        type: "list",
        items: [
          "Mở nguồn và tìm đúng câu: Ctrl+F câu trích hoặc con số trong trang. Đường dẫn mở được chưa đủ.",
          "Tra văn bản pháp lý trên cổng thông tin chính thức: đọc đúng điều được trích, xem còn hiệu lực không.",
          "Tính lại con số bằng Excel hoặc Google Sheets: tổng, tỷ lệ, tăng trưởng - đừng tin phép tính trong khung chat.",
          "Bắt AI tách hai loại: \"đánh dấu [CHẮC] cho điều có trong tài liệu tôi đưa, [ĐOÁN] cho điều bạn suy ra\" - rồi kiểm hết mọi dòng [ĐOÁN].",
          "So với dữ liệu nội bộ hoặc hỏi người trong nghề: số doanh thu so với sổ sách, điều khoản so với phòng pháp chế.",
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Đoạn thêm vào cuối mọi prompt có dính số liệu hay căn cứ",
        code: `Quy tắc về độ chắc chắn:
- Với mỗi số liệu, trích dẫn hoặc tên văn bản, ghi nguồn cụ thể.
- Nếu không có nguồn, ghi [CHƯA CÓ NGUỒN] ngay sau câu đó.
- Nếu bạn không biết, nói "tôi không biết". Không ước đoán thành số cụ thể.`,
      },
      {
        type: "paragraph",
        text: "Đoạn trên làm AI bịa ít hơn và làm chỗ nghi ngờ dễ thấy hơn - nhưng không làm việc kiểm thành thừa. AI không biết chắc khi nào mình đang bịa, nên không tự đánh dấu hết được.",
      },
      {
        type: "comparison",
        left: {
          label: "Dùng được sau khi đọc lại",
          text: "Động não ý tưởng, dàn ý, viết lại câu, sửa chính tả, email nội bộ không có số liệu. Sai thì bạn thấy ngay, hậu quả nhỏ.",
        },
        right: {
          label: "Tuyệt đối không dùng khi chưa kiểm",
          text: "Hợp đồng, hồ sơ thuế, báo cáo tài chính, thư gửi khách hoặc cơ quan nhà nước, tài liệu có căn cứ pháp lý, số liệu đưa lên mạng xã hội công ty. Người ký là người chịu trách nhiệm.",
        },
      },
      {
        type: "callout",
        label: "Rủi ro: hỏi lại chính AI không phải kiểm chứng",
        text: "Trong vụ Mata kiện Avianca, luật sư đã hỏi ChatGPT các bản án có thật không, và nó trả lời có. Một hệ thống sinh ra câu bịa cũng sinh ra được câu xác nhận nó. Kiểm chứng luôn là đi tới một nguồn nằm ngoài AI.",
      },
      {
        type: "closing",
        lines: [
          "Chi tiết càng cụ thể càng phải có nguồn.",
          "Bài sau: gom những prompt đã chạy tốt thành thư viện cho cả phòng.",
        ],
      },
    ],
  },
  {
    id: 1815,
    slug: "thu-vien-prompt-cho-ca-phong",
    title: "Chặng 25, Bài 6: Thư viện prompt cho cả phòng",
    subtitle: "Prompt tốt nhất của một người thành mẫu dùng chung của cả phòng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📚",
    track: "personal",
    whyItMatters:
      "Trong mỗi phòng thường có một người dùng AI giỏi hơn hẳn phần còn lại - và kỹ năng đó nằm trong lịch sử chat của riêng họ. Một thư viện prompt có tên, có người phụ trách, có phiên bản biến kỹ năng cá nhân thành quy trình của cả phòng, và cho bạn biết sửa ở đâu khi mẫu bắt đầu cho ra kết quả sai.",
    openingQuestion:
      "Cả phòng CSKH mỗi người tự viết prompt trả lời khiếu nại, và chất lượng thư rất khác nhau. Cách sửa gọn nhất là gì?",
    openingOptions: [
      "Lưu prompt tốt nhất thành mẫu chung có chỗ điền thông tin",
      "Cấm dùng AI để thư của mọi người giống nhau hoàn toàn",
      "Để mỗi người tự học viết prompt, ai viết hay thì được khen",
      "Mua gói AI đắt nhất cho cả phòng để thư tự động hay hơn",
    ],
    correctOption: 0,
    explanation:
      "Chất lượng khác nhau vì mỗi người viết một prompt khác nhau, không phải vì công cụ. Lấy prompt đã cho ra thư tốt nhất, thay phần riêng của từng ca (tên khách, số đơn, lỗi gì) bằng chỗ trống để điền, và cả phòng dùng chung. Cấm AI thì mất thời gian đã tiết kiệm được; để mỗi người tự học thì vẫn mỗi người một kiểu; gói đắt hơn với prompt cũ vẫn cho ra thư cũ.",
    diagram: [
      { label: "Prompt đã chạy tốt nhiều lần", arrow: true },
      { label: "Thay phần riêng bằng {biến}", arrow: true },
      { label: "Ghi tên, mục đích, người phụ trách, phiên bản", arrow: true },
      { label: "Cả phòng dùng; lỗi thì báo người phụ trách sửa" },
    ],
    realWorldExample: {
      company: "Air Canada (2024)",
      description:
        "Năm 2024, một toà giải quyết tranh chấp ở Canada buộc Air Canada bồi thường cho một khách hàng vì chatbot trên trang web của hãng trả lời sai về chính sách giá vé cho người có tang. Hãng lập luận chatbot tự chịu trách nhiệm cho câu trả lời của nó, và toà bác lập luận đó. Mẫu prompt dùng chung cũng vậy: thư gửi đi mang tên công ty, nên mẫu cần người phụ trách và ranh giới rõ về những gì không được hứa.",
    },
    quiz: [
      {
        question: "\"Biến\" trong một mẫu prompt là gì?",
        options: [
          "Chỗ trống như {ten_khach} để người dùng điền mỗi lần",
          "Một con số AI tự tính ra và đổi sau mỗi lần chạy",
          "Phần của prompt mà AI được phép tự sửa theo ý nó",
          "Tên phiên bản công cụ AI mà mẫu này được viết cho",
        ],
        correct: 0,
        explanation:
          "Biến là phần thay đổi giữa các lần dùng - tên khách, số đơn, ngày - được đánh dấu rõ, ví dụ trong ngoặc nhọn. Phần còn lại (vai trò, định dạng, giới hạn) giữ nguyên, nên mọi người dùng mẫu đều nhận kết quả cùng chất lượng.",
      },
      {
        question: "Một mẫu trong thư viện nên ghi kèm những gì?",
        options: [
          "Tên, mục đích, người phụ trách, phiên bản, ví dụ đầu ra",
          "Chỉ nội dung prompt, vì ghi thêm thông tin chỉ làm rối thư viện",
          "Mật khẩu tài khoản AI dùng chung để ai cũng đăng nhập",
          "Danh sách người đã dùng mẫu và số lần mỗi người dùng",
        ],
        correct: 0,
        explanation:
          "Tên và mục đích để người khác tìm đúng mẫu; người phụ trách để biết báo lỗi cho ai; phiên bản để biết mình đang dùng bản nào; ví dụ đầu ra để biết kết quả tốt trông ra sao. Mật khẩu thì không bao giờ nằm trong một tài liệu dùng chung.",
      },
      {
        question: "Vì sao cần ghi phiên bản (v1, v2) cho mỗi mẫu?",
        options: [
          "Để biết ai sửa gì, và quay lại bản cũ nếu bản mới kém",
          "Vì công cụ AI chỉ nhận những prompt có ghi số phiên bản",
          "Để mẫu mới nhất luôn được hiện lên đầu danh sách mẫu",
          "Vì mỗi phiên bản được AI xử lý với độ chính xác khác nhau",
        ],
        correct: 0,
        explanation:
          "Sửa một câu trong mẫu có thể làm kết quả tốt lên ở trường hợp này và tệ đi ở trường hợp khác. Có phiên bản và ghi chú thay đổi thì khi thư bắt đầu sai, bạn biết thay đổi nào gây ra và quay lại bản trước được.",
      },
      {
        question: "Tính năng dự án, GPT tuỳ chỉnh hay Gem giúp gì cho thư viện prompt?",
        options: [
          "Gắn sẵn hướng dẫn và tài liệu nền cho một việc lặp lại",
          "Tự kiểm chứng mọi đầu ra nên không cần người duyệt nữa",
          "Cho phép dán dữ liệu khách hàng vì đã ở trong không gian riêng",
          "Thay hẳn thư viện, nên không cần ghi tên và phiên bản nữa",
        ],
        correct: 0,
        explanation:
          "Các tính năng này cho bạn lưu một bộ hướng dẫn cố định (và tài liệu tham khảo) để mỗi lần dùng chỉ cần điền phần thay đổi. Chúng không kiểm chứng đầu ra, không đổi quy định về dữ liệu nhạy cảm, và hướng dẫn bên trong vẫn cần người phụ trách và phiên bản.",
      },
      {
        question: "Mẫu \"trả lời khiếu nại\" bắt đầu cho ra thư hứa bồi thường. Nên làm gì trước tiên?",
        options: [
          "Tạm dừng mẫu, báo người phụ trách sửa thành bản mới",
          "Để mỗi người tự sửa bản riêng cho kịp việc hôm nay",
          "Xoá mẫu khỏi thư viện và quay về viết tay mãi mãi",
          "Giữ nguyên, vì AI tự hứa thì công ty không phải chịu",
        ],
        correct: 0,
        explanation:
          "Một mẫu dùng chung sai thì sai hàng loạt, nên việc đầu tiên là ngừng dùng và báo đúng người. Mỗi người tự sửa thì thư viện vỡ thành nhiều bản. Và như vụ Air Canada, thư gửi đi mang tên công ty - AI hứa thì công ty chịu.",
      },
    ],
    keyTakeaways: [
      "Chỉ đưa vào thư viện prompt đã chạy tốt nhiều lần.",
      "Phần thay đổi thành {biến}; phần còn lại giữ nguyên.",
      "Mỗi mẫu có tên, mục đích, người phụ trách, phiên bản, ví dụ đầu ra.",
      "Dự án, GPT tuỳ chỉnh, Gem: nơi gắn sẵn hướng dẫn, không phải người kiểm.",
      "Mẫu sai thì dừng và báo người phụ trách, không mỗi người tự sửa.",
    ],
    practicePrompt: {
      question:
        "Bạn có prompt: \"Viết email nhắc anh Tuấn thanh toán hoá đơn số 1024, đã quá hạn 15 ngày.\" Biến nó thành mẫu thế nào?",
      options: [
        "Thay tên, số hoá đơn, số ngày quá hạn bằng {biến}",
        "Giữ nguyên, ai dùng thì tự nhớ sửa tên anh Tuấn",
        "Biến cả câu thành {noi_dung} để mẫu linh hoạt nhất",
        "Thay \"email\" bằng {loai_van_ban}, giữ tên và số hoá đơn",
      ],
      correct: 0,
      explanation:
        "Biến là đúng những phần đổi giữa các lần dùng: tên khách, số hoá đơn, số ngày. Giữ nguyên tên thì sớm muộn có người gửi nhầm cho khách khác. Biến cả câu thành một chỗ trống thì mẫu không còn gì để dùng lại.",
    },
    summary: {
      keyIdea: "Thư viện prompt biến kỹ năng của một người thành quy trình của cả phòng.",
      formula: "Prompt đã chạy tốt + {biến} + tên, mục đích, người phụ trách, phiên bản, ví dụ đầu ra.",
      commonMistake: "Lưu mọi prompt từng thử, không ai phụ trách, không phiên bản - thành bãi rác không ai dám dùng.",
      action: "Chọn 3 prompt bạn dùng nhiều nhất và viết chúng thành mẫu theo khuôn bên trên.",
    },
    application: {
      title: "Dự án: thư viện 3 mẫu trong 30 phút",
      message:
        "Tạo một Google Sheets hoặc trang Word dùng chung với các cột: Tên, Dùng cho việc gì, Người phụ trách, Phiên bản, Prompt, Ví dụ đầu ra, Ghi chú thay đổi. Điền 3 mẫu từ các bài trước. Xong là khi một đồng nghiệp chưa từng thấy mẫu dùng được nó mà không phải hỏi bạn.",
      secondary: "Nếu công ty có bản doanh nghiệp của ChatGPT, Claude, Gemini hay Copilot, thử gắn một mẫu vào dự án hoặc trợ lý tuỳ chỉnh dùng chung.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài cuối của chặng gom những gì bạn đã làm - prompt sáu phần, prompt tóm tắt theo khung, prompt trợ lý nghiên cứu, đoạn quy tắc chống bịa - thành một thư viện mà cả phòng dùng được.",
      },
      { type: "heading", text: "Vấn đề: kỹ năng nằm trong lịch sử chat của một người" },
      {
        type: "paragraph",
        text: "Trong phòng CSKH 8 người, một người viết thư phản hồi khiếu nại mất 3 phút với AI, người khác mất 15 phút và vẫn phải sửa nhiều. Khác biệt không ở công cụ mà ở prompt - và prompt tốt thì nằm trong lịch sử chat của riêng người viết nó. Người đó nghỉ phép, cả phòng chậm lại.",
      },
      { type: "heading", text: "Cách giải: biến prompt thành mẫu có biến" },
      {
        type: "paragraph",
        text: "Lấy một prompt đã cho kết quả tốt nhiều lần. Tìm những phần thay đổi giữa các lần dùng - tên khách, số đơn, lỗi gì - và thay bằng biến (variable) đặt trong ngoặc nhọn. Phần còn lại là khuôn cố định: vai trò, định dạng, giới hạn. Ai điền biến cũng nhận kết quả cùng chất lượng.",
      },
      {
        type: "code",
        language: "text",
        caption: "Một mẫu hoàn chỉnh trong thư viện",
        code: `TÊN: Trả lời khiếu nại giao hàng trễ
DÙNG CHO: Nhân viên CSKH, khi khách phàn nàn đơn giao trễ hạn
NGƯỜI PHỤ TRÁCH: Trưởng nhóm CSKH
PHIÊN BẢN: v3 - thêm giới hạn "không hứa ngày giao mới nếu kho chưa xác nhận"

--- PROMPT ---
Vai trò: Bạn là nhân viên chăm sóc khách hàng của {ten_cong_ty}.

Bối cảnh: Khách {ten_khach} đặt {san_pham} (đơn {ma_don}), hẹn giao
{ngay_hen}, đã trễ {so_ngay_tre} ngày. Lý do: {ly_do}.
Công ty đã duyệt cho khách: {bu_dap}.

Nhiệm vụ: Viết email xin lỗi.

Định dạng: Dưới 150 chữ, có tiêu đề. Xưng "chúng tôi".

Giới hạn:
- Không hứa hoàn tiền hay bồi thường ngoài phần {bu_dap}.
- Không hứa ngày giao mới nếu {ngay_giao_moi} để trống.
- Không bịa lý do ngoài {ly_do}.
--- HẾT PROMPT ---

VÍ DỤ ĐẦU RA TỐT: [dán một email đã gửi và được khách phản hồi tốt]`,
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn: chỉ đưa vào prompt đã cho kết quả tốt ít nhất vài lần, với vài người khác nhau.",
          "Bước 2 - Tách biến: mọi thứ đổi giữa các lần dùng thành {ten_bien}, đặt tên dễ hiểu.",
          "Bước 3 - Ghi thông tin: tên, dùng cho việc gì, người phụ trách, phiên bản, ví dụ đầu ra tốt.",
          "Bước 4 - Đặt ở một chỗ: một Google Sheets, trang Word hay trang wiki dùng chung - một chỗ duy nhất.",
          "Bước 5 - Quy tắc sửa: ai thấy mẫu cho kết quả sai thì báo người phụ trách; người phụ trách sửa, tăng phiên bản, ghi thay đổi.",
        ],
      },
      { type: "heading", text: "Công cụ: dự án, GPT tuỳ chỉnh, Gem" },
      {
        type: "paragraph",
        text: "Các công cụ AI đều có cách lưu sẵn hướng dẫn cho một việc lặp lại: dự án (Projects) trong ChatGPT và Claude, GPT tuỳ chỉnh trong ChatGPT, Gem trong Gemini, trợ lý tuỳ chỉnh trong Copilot. Về khái niệm, chúng giống nhau: một bộ hướng dẫn cố định cộng tài liệu tham khảo, mỗi lần dùng chỉ cần gõ phần thay đổi. Chúng là nơi chứa mẫu tiện hơn - không thay được tên, người phụ trách và phiên bản.",
      },
      {
        type: "callout",
        label: "Rủi ro: mẫu sai là sai hàng loạt",
        text: "Một người viết prompt sai thì sai một thư. Một mẫu dùng chung sai thì cả phòng gửi thư sai cùng lúc. Vì vậy mẫu nào gửi ra ngoài công ty phải có người phụ trách thật, giới hạn rõ về điều không được hứa, và người dùng vẫn đọc lại trước khi gửi. Tài liệu tham khảo gắn vào dự án hay GPT dùng chung ai trong nhóm cũng xem được - đừng gắn dữ liệu khách hàng.",
      },
      {
        type: "closing",
        lines: [
          "Prompt tốt của một người, thành quy trình của cả phòng.",
          "Hết chặng 25: bạn đã có thói quen giao việc đúng, kiểm đúng chỗ, và một thư viện để dùng lại mỗi ngày.",
        ],
      },
    ],
  },
];
