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
          "Báo chính xác giá mới đối thủ vừa đổi sáng nay",
          "Cộng chính xác 300 dòng doanh số dán vào khung chat",
          "Nhắc lại điều khoản hợp đồng bạn ký tuần trước",
        ],
        correct: 0,
        explanation:
          "Viết nháp từ ý có sẵn là đúng sở trường: diễn đạt trôi chảy, bạn kiểm được bằng mắt. Giá đối thủ vừa đổi sáng nay là sự kiện mới, nó không biết nếu không tìm web. Cộng 300 dòng là việc của bảng tính. Hợp đồng tuần trước thì nó chưa từng thấy, trừ khi bạn đưa vào.",
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
      {
        "type": "chart",
        "title": "Để AI viết nháp email: tiết kiệm được bao nhiêu giờ",
        "caption": "Kéo hai thanh trượt cho khớp với việc của bạn. Giả định 22 ngày làm việc mỗi tháng. Phút tiết kiệm là phần còn lại SAU khi bạn đã đọc và sửa bản nháp - thời gian kiểm tra vẫn là của bạn.",
        "kind": "line",
        "xLabel": "Tháng",
        "yLabel": "Giờ tiết kiệm (cộng dồn)",
        "x": {
          "from": 1,
          "to": 12,
          "step": 1
        },
        "params": [
          {
            "id": "emails",
            "label": "Số email mỗi ngày",
            "min": 1,
            "max": 40,
            "step": 1,
            "value": 10,
            "unit": "email"
          },
          {
            "id": "saved",
            "label": "Phút tiết kiệm mỗi email",
            "min": 0,
            "max": 10,
            "step": 0.5,
            "value": 3,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Giờ tiết kiệm cộng dồn",
            "expr": "x * emails * saved * 22 / 60"
          }
        ]
      },
      { type: "heading", text: "Nó hoạt động thế nào - một câu là đủ" },
      {
        type: "paragraph",
        text: "AI tạo sinh dự đoán chữ tiếp theo hợp lý nhất, từng chữ một, dựa trên hàng tỷ trang nó đã đọc. Từ câu đó suy ra gần hết điểm mạnh và điểm yếu: viết trôi vì nó đã đọc rất nhiều văn bản; bịa vì một con số \"nghe hợp lý\" có xác suất cao dù nó chưa từng tồn tại.",
      },
      {
        "type": "flow",
        "title": "Một prompt đi đâu khi bạn bấm Gửi",
        "steps": [
          {
            "label": "Trình duyệt đóng gói",
            "detail": "Câu bạn gõ, cùng các tin nhắn trước đó trong cuộc trò chuyện, được gói lại và gửi qua Internet (đã mã hoá HTTPS) tới máy chủ của nhà cung cấp AI."
          },
          {
            "label": "Máy chủ nhận và kiểm tra",
            "detail": "Máy chủ xác nhận tài khoản của bạn, kiểm tra giới hạn sử dụng và quy định an toàn, rồi chuyển yêu cầu tới cụm máy có chạy mô hình."
          },
          {
            "label": "Cắt thành token",
            "detail": "Văn bản được cắt thành các mảnh nhỏ gọi là token - thường là một phần của từ. Mô hình không đọc chữ như người, nó làm việc với dãy token này."
          },
          {
            "label": "Mô hình đoán từng token",
            "detail": "Mô hình tính xem token nào nên đến tiếp theo, chọn một, nối vào, rồi lặp lại. Câu trả lời được viết từng mảnh một chứ không nghĩ xong cả đoạn rồi mới viết."
          },
          {
            "label": "Chữ chảy về màn hình",
            "detail": "Mỗi mảnh vừa sinh ra được gửi ngay về trình duyệt, nên bạn thấy chữ hiện dần. Bạn vẫn là người đọc lại và quyết định có dùng hay không."
          }
        ]
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
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết email xin lùi hạn giao hàng",
        "task": "Lô hàng cho khách Minh Phát trễ 3 ngày vì kho chưa nhận đủ vật tư. Lắp một prompt để AI viết nháp email báo khách.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết email cho khách.",
                "feedback": "AI không biết khách là ai, trễ việc gì - nó sẽ tự bịa."
              },
              {
                "text": "Tôi là nhân viên kinh doanh. Khách Minh Phát đặt 500 thùng giao ngày 12/10; kho thiếu vật tư nên giao trễ tới 15/10.",
                "good": true,
                "feedback": "Đủ người, việc, số lượng và ngày - AI chỉ việc viết quanh dữ kiện bạn đưa."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết email xin lỗi, báo ngày giao mới 15/10 và đề nghị giao trước 200 thùng ngày 12/10.",
                "good": true,
                "feedback": "Nói rõ email phải làm được gì, kể cả phương án bù cho khách."
              },
              {
                "text": "Viết gì đó để khách đừng giận.",
                "feedback": "Mục tiêu mơ hồ - AI dễ hứa những thứ công ty không làm được."
              }
            ]
          },
          {
            "id": "format",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết thật hay.",
                "feedback": "\"Hay\" không phải yêu cầu đo được - AI sẽ viết dài và văn hoa."
              },
              {
                "text": "Giọng lịch sự, ngắn gọn, dưới 120 chữ, xưng \"chúng tôi\" - \"Quý khách\".",
                "good": true,
                "feedback": "Giọng, độ dài và cách xưng hô rõ ràng - bản nháp dùng gần như ngay."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "format"
            ],
            "text": "Kính gửi Quý khách Minh Phát,\n\nChúng tôi thành thật xin lỗi: do kho chưa nhận đủ vật tư, đơn 500 thùng sẽ giao trễ tới ngày 15/10 thay vì 12/10. Để Quý khách không gián đoạn, chúng tôi đề nghị giao trước 200 thùng vào ngày 12/10, phần còn lại ngày 15/10.\n\nMong Quý khách thông cảm và phản hồi để chúng tôi sắp xếp.\n\nTrân trọng."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Kính gửi Quý khách Minh Phát,\n\nĐơn 500 thùng của Quý khách sẽ giao trễ tới 15/10. Chúng tôi rất lấy làm tiếc về sự bất tiện này và cam kết sẽ nỗ lực hết mình để phục vụ Quý khách tốt hơn trong tương lai...\n\n(Có đủ dữ kiện nhưng thiếu phương án bù cho khách, và giọng văn còn dài dòng.)"
          },
          {
            "text": "Kính gửi Quý khách hàng thân mến,\n\nNhân dịp này, chúng tôi xin gửi lời tri ân sâu sắc và xin thông báo đơn hàng của Quý khách sẽ được giao trong 7 ngày tới kèm ưu đãi giảm 20%...\n\n(AI không biết khách, đơn hay ngày thật - nên tự bịa \"7 ngày\" và \"giảm 20%\", những điều công ty chưa hề hứa.)"
          }
        ]
      },
      {
        type: "callout",
        label: "Rủi ro: ô chat không riêng tư",
        text: "Dán vào ô chat là gửi dữ liệu ra một hệ thống bên ngoài. Bảng lương, số CCCD, hợp đồng khách hàng, số liệu chưa công bố - không đưa vào công cụ công ty chưa duyệt, kể cả khi đã tắt lịch sử. Và người gửi email là bạn, nên người chịu trách nhiệm cho câu sai trong đó cũng là bạn.",
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát biên bản họp do AI tóm tắt",
        "task": "Bạn đưa AI bản ghi cuộc họp giao ban thứ Hai và nhờ tóm tắt. Bản ghi chỉ có: doanh số tháng 9 đạt khoảng 92% kế hoạch, chị Lan phụ trách báo cáo khách hàng, hạn nộp là thứ Sáu tuần này, chưa chốt ngân sách quảng cáo. Đánh dấu những đoạn AI tự thêm.",
        "segments": [
          {
            "text": "Cuộc họp giao ban thứ Hai điểm lại kết quả kinh doanh tháng 9."
          },
          {
            "text": "Doanh số tháng 9 đạt 92,4% kế hoạch, tăng 15% so với tháng 8.",
            "error": "Bản ghi chỉ nói \"khoảng 92%\" và không nhắc tháng 8 - \"92,4%\" và \"tăng 15%\" là số AI bịa cho nghe chính xác."
          },
          {
            "text": "Chị Lan phụ trách báo cáo khách hàng."
          },
          {
            "text": "Hạn nộp báo cáo là thứ Sáu, ngày 17/10.",
            "error": "Bản ghi chỉ nói \"thứ Sáu tuần này\"; AI tự điền ngày 17/10 - có thể sai ngày thật."
          },
          {
            "text": "Ngân sách quảng cáo quý 4 đã được duyệt ở mức 350 triệu đồng.",
            "error": "Bản ghi nói ngân sách CHƯA chốt. AI đảo ngược kết luận và bịa luôn con số."
          },
          {
            "text": "Nội dung ngân sách sẽ bàn tiếp ở buổi họp sau."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sếp cần bản tóm tắt báo cáo trong 30 phút",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "9 giờ sáng, sếp nhắn: \"Em tóm tắt báo cáo thị trường 40 trang này thành 1 trang, 9 rưỡi anh họp với ban giám đốc.\" Báo cáo có số liệu nội bộ chưa công bố.",
            "choices": [
              {
                "label": "Dán cả 40 trang vào một ứng dụng AI miễn phí trên điện thoại cho nhanh",
                "next": "bad_leak"
              },
              {
                "label": "Dùng công cụ AI công ty đã duyệt, dán báo cáo và nhờ tóm tắt",
                "next": "s2"
              }
            ]
          },
          "bad_leak": {
            "text": "Bản tóm tắt ra trong 1 phút. Nhưng số liệu chưa công bố vừa được gửi lên một dịch vụ bên ngoài mà công ty không kiểm soát. Tuần sau, phòng IT hỏi vì sao tài liệu mật xuất hiện trong nhật ký truy cập ứng dụng lạ.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về một trang gọn gàng, có câu: \"Thị phần công ty tăng từ 18% lên 23% trong năm.\" Còn 15 phút.",
            "choices": [
              {
                "label": "Gửi ngay cho sếp - trông đã rất chuyên nghiệp",
                "next": "bad_number"
              },
              {
                "label": "Mở báo cáo gốc, tìm các con số và tên trong bản tóm tắt để đối chiếu",
                "next": "s3"
              }
            ]
          },
          "bad_number": {
            "text": "Trong cuộc họp, giám đốc tài chính hỏi con số 23% lấy ở trang nào. Báo cáo gốc ghi 21%. Sếp phải xin lỗi trước ban giám đốc.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn thấy báo cáo gốc ghi thị phần 21%, không phải 23%. Các ý khác đều khớp.",
            "choices": [
              {
                "label": "Sửa thành 21%, ghi rõ trang nguồn cạnh mỗi con số, rồi gửi sếp",
                "next": "good"
              },
              {
                "label": "Xoá hết mọi con số cho an toàn rồi gửi",
                "next": "bad_vague"
              }
            ]
          },
          "bad_vague": {
            "text": "Bản tóm tắt không còn sai, nhưng cũng không còn gì để sếp dùng: ban giám đốc cần đúng các con số đó để ra quyết định.",
            "ending": "bad"
          },
          "good": {
            "text": "9 giờ 25, sếp nhận một trang gọn, số đã đối chiếu, có số trang nguồn. Khi giám đốc tài chính hỏi, sếp mở đúng trang 12 trong 5 giây.",
            "ending": "good"
          }
        }
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
  {
    id: 1816,
    slug: "tra-loi-email-hang-loat-giu-giong-cua-ban",
    title: "Chặng 25, Bài 7: Trả lời email hàng loạt mà vẫn giữ giọng của bạn",
    subtitle: "Một mẫu thư có chỗ trống, một danh sách đã kiểm - và mỗi người nhận vẫn đọc ra tên mình.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "✉️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng bạn phải gửi 40 email na ná nhau: nhắc thanh toán, xác nhận lịch, cảm ơn khách. Viết tay từng cái thì mất cả buổi chiều, còn nhờ AI viết một lèo thì rủi ro là nhầm tên, nhầm số tiền, hoặc giọng văn xa lạ khiến khách tưởng thư tự động. Cách làm đúng vừa nhanh vừa kiểm được từng thư.",
    openingQuestion:
      "Sáng thứ Hai bạn có 30 email nhắc khách thanh toán, cùng nội dung nhưng khác tên, số hoá đơn và số tiền. Cách làm nào an toàn nhất?",
    openingOptions: [
      "Viết một mẫu có chỗ trống, điền dữ liệu từ bảng rồi soát từng thư",
      "Dán cả 30 dòng vào AI và nhờ nó viết luôn 30 email hoàn chỉnh",
      "Nhờ AI viết một email chung rồi gửi cho cả 30 người như nhau",
      "Viết tay 30 email từ đầu, vì AI không thể giữ giọng của bạn",
    ],
    correctOption: 0,
    explanation:
      "Phần giống nhau (lời chào, lý do nhắc, cách thanh toán) viết một lần cho hay, phần khác nhau (tên, số hoá đơn, số tiền) là chỗ trống lấy thẳng từ bảng của bạn. Như vậy con số không đi qua đoạn AI đoán chữ nên không bị bịa. Dán 30 dòng cho AI viết cả loạt thì dễ lẫn tên và số tiền giữa các dòng. Gửi một email chung thì mất chỗ cá nhân. Viết tay hết thì bỏ phí phần AI làm tốt: viết mẫu và đổi cách nói.",
    diagram: [
      { label: "Viết một mẫu thư hay, có {chỗ trống}", arrow: true },
      { label: "AI tạo vài biến thể theo từng nhóm khách", arrow: true },
      { label: "Điền tên, số, ngày từ bảng gốc của bạn", arrow: true },
      { label: "Soát mẫu thư, gửi thử cho chính bạn rồi mới gửi loạt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kế toán công nợ có bảng 35 khách chậm thanh toán. Cô nhờ AI dựng mẫu thư có ba chỗ trống là tên, số hoá đơn và số tiền, rồi tự điền từ bảng Excel. Trước khi gửi, cô gửi thử ba thư cho chính mình và đối chiếu từng con số với bảng. Nhờ vậy cô bắt được một khách bị ghi nhầm số hoá đơn.",
    },
    quiz: [
      {
        question: "Vì sao nên để tên và số tiền là chỗ trống trong mẫu thư thay vì để AI tự viết?",
        options: [
          "Vì số liệu lấy từ bảng gốc thì không bị AI đoán sai",
          "Vì AI không viết được số nên phải chừa chỗ trống",
          "Vì chỗ trống làm thư ngắn hơn và khách đọc nhanh hơn nhiều",
          "Vì tên khách là thông tin mật nên AI luôn từ chối viết ra",
        ],
        correct: 0,
        explanation:
          "AI dự đoán chữ nghe hợp lý, nên con số nó tự viết có thể lệch mà vẫn trông đúng. Điền từ bảng gốc thì số đi thẳng từ nguồn tới thư. AI viết được chữ có số, nó chỉ không đáng tin ở chỗ đó; độ dài thư không đổi; và tên khách không bị AI từ chối chỉ vì là tên riêng.",
      },
      {
        question: "Cách nào giúp AI viết đúng giọng của bạn nhất?",
        options: [
          "Dán 2-3 email bạn đã viết ưng ý làm mẫu rồi nhờ viết theo",
          "Ghi 'viết giọng thân thiện, chuyên nghiệp, cuốn hút' vào yêu cầu",
          "Nhờ AI tự chọn giọng phù hợp nhất với từng khách hàng một",
          "Chọn công cụ AI đắt nhất vì nó tự học ra giọng của bạn ngay",
        ],
        correct: 0,
        explanation:
          "Ví dụ thật của chính bạn cho AI thấy độ dài câu, cách xưng hô, cách mở đầu và kết thư. Tính từ như 'thân thiện, chuyên nghiệp' ai hiểu cũng khác nhau nên ra giọng chung chung. AI tự chọn thì thành giọng trung bình của mọi người, và công cụ đắt hơn không biết bạn đã viết thế nào nếu bạn không đưa mẫu.",
      },
      {
        question: "Trước khi gửi 30 email đã điền xong, bước kiểm nào đáng làm nhất?",
        options: [
          "Gửi thử vài thư cho chính mình, đối chiếu tên và số với bảng",
          "Đọc kỹ đúng thư đầu tiên, vì 29 thư còn lại chắc chắn giống nó",
          "Nhờ AI đọc lại cả 30 thư và cho biết có sai sót nào không",
          "Gửi luôn, khách nào thấy sai sẽ tự phản hồi và mình sửa sau",
        ],
        correct: 0,
        explanation:
          "Lỗi nằm ở chỗ điền: nhầm dòng, lệch cột, thiếu dấu phẩy trong số tiền. Thư đầu đúng không bảo đảm thư thứ 17 đúng. Nhờ AI đọc lại thì nó không có bảng gốc để so, và để khách phát hiện thì lỗi số tiền đã ảnh hưởng tới uy tín và có thể cả dòng tiền.",
      },
      {
        question: "Một khách đang khiếu nại gay gắt. Nên xử lý email trả lời thế nào?",
        options: [
          "Viết riêng, có thể nhờ AI góp ý giọng văn nhưng bạn duyệt từng câu",
          "Dùng chung mẫu nhắc thanh toán cho đồng bộ với các khách còn lại",
          "Nhờ AI viết thật dài và trang trọng để khách thấy được coi trọng",
          "Để AI trả lời tự động, vì nó luôn bình tĩnh hơn người đang bực",
        ],
        correct: 0,
        explanation:
          "Trường hợp nhạy cảm cần đọc kỹ điều khách nói, mà mẫu hàng loạt thì không làm được việc đó. AI có thể giúp gọt câu chữ, nhưng cam kết trong thư là của bạn. Thư dài và trang trọng thường làm khách bực hơn, còn trả lời tự động một khiếu nại mà không ai đọc là cách nhanh nhất để mất khách.",
      },
      {
        question: "Danh sách khách và số tiền có nên dán thẳng vào công cụ AI chưa được công ty duyệt?",
        options: [
          "Không, dữ liệu khách hàng chỉ đưa vào công cụ đã được duyệt",
          "Có, vì email nào rồi cũng gửi cho chính các khách đó thôi",
          "Có, nếu đã bôi đen số điện thoại còn tên và số tiền thì để nguyên",
          "Không cần lo, vì công cụ AI nào cũng tự xoá dữ liệu sau khi trả lời",
        ],
        correct: 0,
        explanation:
          "Gửi email cho khách khác với gửi danh sách toàn bộ khách và công nợ cho một bên thứ ba. Chỉ che số điện thoại thì tên cộng số tiền vẫn là dữ liệu kinh doanh. Việc công cụ có xoá dữ liệu hay không tuỳ chính sách từng bản; bạn hỏi IT chứ không đoán. Cách gọn là đưa AI mẫu và dữ liệu giả để dựng mẫu thư.",
      },
    ],
    keyTakeaways: [
      "Phần giống nhau viết một lần thành mẫu; phần khác nhau là chỗ trống lấy từ bảng.",
      "Giọng của bạn nằm trong vài email bạn đã viết ưng ý - hãy đưa chúng làm mẫu.",
      "Con số và tên đi thẳng từ bảng gốc, không để AI viết.",
      "Gửi thử cho chính mình trước khi gửi loạt.",
      "Email nhạy cảm (khiếu nại, xin lỗi lớn) không đi hàng loạt.",
    ],
    practicePrompt: {
      question:
        "Anh Hùng cần gửi 25 email xác nhận lịch hẹn cho khách. Anh nhờ AI viết mẫu, điền tên và giờ từ bảng, rồi gửi luôn. Bước nào còn thiếu?",
      options: [
        "Gửi thử vài thư cho chính mình và đối chiếu tên, giờ với bảng",
        "Nhờ AI viết lại mẫu thêm một lần nữa cho chắc là hay nhất",
        "Thêm một đoạn giới thiệu công ty dài để thư trông trang trọng",
        "Gửi cho từng khách riêng lẻ trong nhiều ngày để khỏi trùng thư",
      ],
      correct: 0,
      explanation:
        "Mẫu và điền từ bảng là đúng, nhưng lỗi vẫn có thể nằm ở lúc điền, nên thiếu bước soát. Viết lại mẫu không tìm ra lỗi điền. Đoạn giới thiệu dài làm thư khó đọc, không làm nó đúng hơn. Rải thư ra nhiều ngày làm khách nhận lịch hẹn muộn mà không giảm nguy cơ sai.",
    },
    summary: {
      keyIdea: "Hàng loạt mà vẫn cá nhân: một mẫu hay, dữ liệu lấy từ bảng, và một bước soát.",
      formula: "Mẫu thư (AI giúp viết) + {chỗ trống} điền từ bảng gốc + gửi thử = thư đúng giọng, đúng số.",
      commonMistake: "Dán cả danh sách cho AI viết luôn từng thư, rồi tin rằng nó không nhầm dòng.",
      action: "Chọn một loại email bạn gửi lặp lại mỗi tuần và dựng mẫu có chỗ trống cho nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm 3 email cùng loại bạn đã gửi tuần này (nhắc việc, xác nhận, cảm ơn). Dán chúng làm mẫu giọng, nhờ AI dựng một mẫu thư có ba chỗ trống, rồi điền thử cho 2 người thật từ bảng của bạn. Đối chiếu từng tên và số với bảng, chưa cần gửi.",
      secondary: "Ghi lại giọng nào AI làm chưa giống bạn để lần sau đưa thêm ví dụ.",
    },
    sections: [
      {
        type: "lead",
        text: "Email hàng loạt là nơi AI tiết kiệm nhiều giờ nhất - và cũng là nơi một lỗi nhỏ bị nhân lên 30 lần. Bài này dạy cách dựng mẫu để vừa nhanh vừa kiểm được từng thư.",
      },
      {
        type: "feynman",
        title: "Email hàng loạt đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tấm thiệp mời in sẵn: chữ chung được in một lần cho đẹp, còn tên khách thì viết tay vào chỗ trống. AI giúp bạn làm tấm thiệp đó nhanh và hay hơn, còn tên và số vẫn do bạn viết vào.",
        columns: ["Thành phần", "Thiệp mời in sẵn", "Mẫu email hàng loạt"],
        rows: [
          ["Phần in một lần", "Lời mời, địa điểm, giờ", "Lời chào, lý do gửi, cách thanh toán"],
          ["Chỗ trống", "Tên khách viết tay", "Tên, số hoá đơn, số tiền lấy từ bảng"],
          ["Ai lo phần đẹp", "Người thiết kế", "AI viết và đổi cách nói"],
          ["Kiểm tra", "Đọc lại tên trước khi đưa khách", "Gửi thử cho mình, đối chiếu với bảng"],
        ],
        oneLiner: "Viết phần chung một lần cho thật tốt, phần riêng lấy từ bảng của bạn - AI giúp phần đầu, không đụng phần sau.",
      },
      { type: "heading", text: "Vấn đề: 30 thư giống nhau, 90 chỗ dễ nhầm" },
      {
        type: "paragraph",
        text: "Ba mươi email, mỗi email có tên, số hoá đơn và số tiền: đó là 90 chỗ có thể nhầm. Nhờ AI viết cả loạt từ một danh sách dán vào, nó có thể lẫn số tiền của khách này sang khách khác mà câu chữ vẫn trơn tru. Vì vậy ta tách việc: AI lo chữ, bảng của bạn lo số.",
      },
      {
        type: "flow",
        title: "Từ một mẫu tới 30 thư đã soát",
        steps: [
          { label: "Đưa AI vài email ưng ý của bạn", detail: "Dán 2-3 email bạn đã viết và thấy đúng giọng mình. AI nhìn thấy độ dài câu, cách xưng hô, cách mở và kết thư." },
          { label: "Nhờ AI dựng mẫu có chỗ trống", detail: "Yêu cầu ghi rõ: dùng {ten}, {so_hoa_don}, {so_tien} ở các chỗ thay đổi và không tự điền bất cứ giá trị nào." },
          { label: "Nhờ thêm biến thể nếu cần", detail: "Khách quá hạn 3 ngày cần giọng khác khách quá hạn 30 ngày. Xin 2-3 biến thể, bạn chọn biến thể cho từng nhóm." },
          { label: "Điền từ bảng gốc", detail: "Dùng chức năng ghép thư của bảng tính hoặc phần mềm email, hoặc tự điền. Số đi từ bảng, không đi qua AI." },
          { label: "Gửi thử và soát", detail: "Gửi 3 thư cho chính bạn, đối chiếu từng tên và số với bảng, xong mới gửi loạt." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng mẫu thư nhắc thanh toán",
        task: "Bạn có 30 khách chậm thanh toán từ 3 đến 10 ngày. Lắp prompt để AI dựng một mẫu thư có chỗ trống, đúng giọng bạn.",
        parts: [
          {
            id: "voice",
            label: "Giọng của bạn",
            options: [
              { text: "Viết giọng chuyên nghiệp và thân thiện.", feedback: "Hai tính từ ai đọc cũng hiểu khác nhau - AI ra một giọng trung bình, thư nghe như thư của mọi công ty." },
              { text: "Đây là 2 email tôi từng gửi: (dán). Viết theo đúng giọng này: ngắn, xưng em - anh/chị, không dùng từ 'kính mong'.", good: true, feedback: "Có ví dụ thật và luật cụ thể - AI bắt chước được độ dài và cách xưng hô." },
            ],
          },
          {
            id: "blank",
            label: "Chỗ thay đổi",
            options: [
              { text: "Tên khách là Minh Phát, hoá đơn 0245, số tiền 12.500.000 đồng.", feedback: "Đưa dữ liệu thật vào mẫu thì mẫu chỉ dùng được cho một khách, và số liệu đi qua AI." },
              { text: "Dùng {ten}, {so_hoa_don}, {so_tien}, {ngay_den_han} ở chỗ thay đổi; không tự điền giá trị nào.", good: true, feedback: "Chỗ trống rõ ràng - bạn điền từ bảng và AI không có cơ hội bịa số." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết đủ ý, càng chi tiết càng tốt.", feedback: "Không giới hạn thì AI thêm cả đoạn hứa ưu đãi, phí phạt hay hạn chót mà công ty chưa quyết." },
              { text: "Dưới 90 chữ, chỉ nhắc và hỏi ngày dự kiến thanh toán; không nhắc phí phạt hay ưu đãi.", good: true, feedback: "Độ dài và phạm vi rõ - AI không hứa thay công ty những điều chưa được duyệt." },
            ],
          },
        ],
        responses: [
          {
            requires: ["voice", "blank", "limit"],
            text: "Chào anh/chị {ten},\n\nEm nhắc nhẹ hoá đơn {so_hoa_don} với số tiền {so_tien}, đến hạn ngày {ngay_den_han}. Anh/chị cho em biết ngày dự kiến thanh toán để em ghi nhận nhé.\n\nCảm ơn anh/chị.",
          },
          {
            requires: ["voice"],
            text: "Chào {ten},\n\nEm nhắc hoá đơn {so_hoa_don}, số tiền {so_tien}. Nếu thanh toán trễ thêm, công ty có thể áp dụng phí phạt 2% mỗi tuần...\n\n(Giọng đúng nhưng AI tự thêm phí phạt mà công ty chưa hề quy định.)",
          },
          {
            text: "Kính gửi Quý khách Minh Phát,\n\nChúng tôi trân trọng nhắc Quý khách thanh toán hoá đơn 0245 với số tiền 12.500.000 đồng và rất mong nhận được sự hợp tác quý báu từ phía Quý khách...\n\n(Số liệu bị cố định cho một khách, giọng xa lạ và cứng nhắc.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Làm theo mẫu có chỗ trống",
          text: "Số và tên đi thẳng từ bảng gốc. Sửa mẫu một lần là cả loạt đổi theo. Bạn kiểm mẫu một lần rồi soát vài thư mẫu. Giọng thống nhất và đúng của bạn.",
        },
        right: {
          label: "Dán danh sách cho AI viết cả loạt",
          text: "Số đi qua đoạn AI đoán chữ nên có thể lẫn dòng. Mỗi thư là một văn bản riêng cần đọc lại từng cái. Dễ ra 30 thư với 30 giọng hơi khác nhau. Danh sách khách cũng bị đưa ra ngoài.",
        },
      },
      {
        type: "callout",
        label: "Không phải email nào cũng đi hàng loạt",
        text: "Khiếu nại, xin lỗi vì sự cố lớn, thông báo chấm dứt hợp tác: viết riêng, đọc kỹ điều người kia nói. AI có thể góp ý câu chữ, nhưng cam kết trong thư là của bạn. Điều gì liên quan tới phí phạt hay điều khoản, hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa vào mẫu.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai, 30 email nhắc thanh toán",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bảng 30 khách chậm thanh toán trong Excel và một tiếng trước khi phải gửi. Bạn đã có mẫu thư có chỗ trống AI dựng sẵn.",
            choices: [
              { label: "Dán cả bảng vào AI và bảo viết luôn 30 thư hoàn chỉnh", next: "bad_mix" },
              { label: "Dùng mẫu, ghép dữ liệu từ bảng Excel vào chỗ trống", next: "s2" },
            ],
          },
          bad_mix: {
            text: "Thư ra trơn tru. Nhưng ở dòng 17, AI lấy số tiền của khách bên cạnh. Một khách nhận thư đòi 48 triệu trong khi họ nợ 4,8 triệu và gọi điện phàn nàn với giám đốc.",
            ending: "bad",
          },
          s2: {
            text: "30 thư đã ghép xong. Còn 25 phút.",
            choices: [
              { label: "Gửi luôn vì dữ liệu đi thẳng từ bảng, chắc chắn đúng", next: "bad_blank" },
              { label: "Gửi thử 3 thư cho chính mình, đối chiếu tên và số với bảng", next: "s3" },
            ],
          },
          bad_blank: {
            text: "Cột 'số hoá đơn' trong bảng bị lệch một dòng từ tuần trước. Chín khách nhận thư ghi sai số hoá đơn và phải gọi lại hỏi, mất nửa ngày để giải thích.",
            ending: "bad",
          },
          s3: {
            text: "Thư thứ hai cho thấy số hoá đơn không khớp với bảng gốc. Bạn kiểm ra cột bị lệch một dòng.",
            choices: [
              { label: "Sửa cột trong bảng, ghép lại, gửi thử lần nữa rồi gửi loạt", next: "good" },
              { label: "Gửi loạt trước, rồi nhắn riêng từng khách bị sai để đính chính", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Chín khách đã nhận thư sai và phải đọc thêm thư đính chính; ấn tượng về sự cẩn thận của bạn giảm rõ rệt.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi loạt lúc 9 giờ 55. Không khách nào phải hỏi lại, và mẫu thư được lưu sẵn cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một loại email bạn gửi lặp lại và tìm 2-3 bản đã ưng ý.",
          "Bước 2 - Nhờ AI dựng mẫu có chỗ trống, cấm tự điền giá trị.",
          "Bước 3 - Điền từ bảng gốc, không qua AI.",
          "Bước 4 - Gửi thử cho chính mình và đối chiếu, rồi mới gửi loạt.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mẫu do AI giúp, số do bảng của bạn, soát do chính bạn.",
          "Bài sau: biến ghi chú lộn xộn thành bản đề xuất một trang.",
        ],
      },
    ],
  },
  {
    id: 1817,
    slug: "ghi-chu-thanh-de-xuat-mot-trang",
    title: "Chặng 25, Bài 8: Biến ghi chú lộn xộn thành bản đề xuất một trang",
    subtitle: "Dựng khung nhà trước, xây tường sau: dàn ý được duyệt rồi mới để AI viết nội dung.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có ba trang ghi chú họp, vài tin nhắn Zalo và một bảng số, và sếp cần một trang đề xuất trước 4 giờ chiều. Dán hết cho AI bảo viết luôn thì nhận về một văn bản trôi chảy nhưng có thể lệch ý bạn, còn phải sửa cả trang. Đi từng bước - dàn ý trước, nội dung sau - giúp bạn bắt lỗi khi còn rẻ.",
    openingQuestion:
      "Bạn dán một đống ghi chú họp vào AI và gõ: 'Viết bản đề xuất đi.' Nó trả về ba trang chữ đẹp nhưng lệch ý bạn. Lần sau nên đổi gì đầu tiên?",
    openingOptions: [
      "Bảo AI lập dàn ý trước, duyệt dàn ý rồi mới viết từng phần",
      "Xin AI viết lại ba trang đó, lần này 'thật hay và thuyết phục'",
      "Chuyển sang công cụ AI khác xem bản nào ưng ý hơn",
      "Xoá bớt ghi chú cho AI đỡ rối rồi bảo viết bản đề xuất ngắn hơn",
    ],
    correctOption: 0,
    explanation:
      "Lỗi lệch ý nằm ở chỗ AI phải tự quyết định cái gì quan trọng, và sai một quyết định là sai cả trang. Dàn ý chỉ vài dòng nên bạn sửa trong một phút: bỏ ý không cần, đổi thứ tự, thêm ý còn thiếu. Viết lại lần nữa với yêu cầu 'hay hơn' không sửa được lệch ý. Đổi công cụ vẫn cho AI tự quyết. Xoá ghi chú thì mất luôn chi tiết bạn cần đưa vào.",
    diagram: [
      { label: "Gom ghi chú thô và mục tiêu của bản đề xuất", arrow: true },
      { label: "AI lập dàn ý 4-5 dòng, bạn sửa và duyệt", arrow: true },
      { label: "AI viết từng phần theo dàn ý, chỉ dùng ghi chú của bạn", arrow: true },
      { label: "Bạn đối chiếu con số và cam kết với nguồn rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên hành chính cần đề xuất mua thêm 5 chiếc ghế công thái học cho phòng. Cô dán ghi chú (số ghế, báo giá hai nhà cung cấp, lý do đau lưng) và xin dàn ý trước. Cô bỏ một ý không cần, chuyển phần chi phí lên đầu vì sếp quan tâm chi phí nhất, rồi mới cho AI viết. Bản nháp ra đúng thứ tự sếp muốn đọc.",
    },
    quiz: [
      {
        question: "Vì sao nên xin dàn ý trước khi xin bản đề xuất đầy đủ?",
        options: [
          "Sửa dàn ý vài dòng rẻ hơn sửa cả trang đã viết sai hướng",
          "Vì AI chỉ viết được văn bản dài khi đã có dàn ý được duyệt",
          "Vì dàn ý ngắn nên ít khi chứa số liệu bị AI bịa ra như bản đầy đủ",
          "Vì sếp thường chỉ đọc dàn ý và không cần xem bản đầy đủ nữa",
        ],
        correct: 0,
        explanation:
          "Dàn ý là chỗ rẻ nhất để sửa hướng: bạn thấy ngay thiếu ý gì, thừa ý gì. AI viết được văn bản dài mà không cần dàn ý. Dàn ý vẫn có thể chứa số bịa nếu bạn không đưa số thật. Và sếp thường vẫn cần bản đầy đủ khi ra quyết định.",
      },
      {
        question: "Ghi chú của bạn ghi 'báo giá A: 4,2 triệu/ghế', không có báo giá B. Bản nháp AI viết thêm 'báo giá B: 3,8 triệu/ghế'. Đây là gì?",
        options: [
          "Số AI tự thêm cho đủ ý, cần xoá hoặc thay bằng số thật",
          "Số AI lấy từ giá thị trường nên có thể giữ lại",
          "Số AI suy ra từ báo giá A nên độ chính xác gần như chắc chắn",
          "Lỗi định dạng của công cụ, mở lại cuộc trò chuyện là hết",
        ],
        correct: 0,
        explanation:
          "Không có trong ghi chú của bạn thì đó là AI bịa để văn bản đầy đủ. AI không tra thị trường khi chưa bật tìm kiếm, và nếu có tra thì bạn vẫn phải mở nguồn. Suy từ giá A ra giá B là đoán, không phải tính. Mở lại cuộc trò chuyện cũng không làm số đó có thật.",
      },
      {
        question: "Câu nào trong yêu cầu giúp AI dùng đúng ghi chú của bạn, không thêm ý ngoài?",
        options: [
          "Chỉ dùng thông tin trong ghi chú; thiếu thì ghi [cần bổ sung]",
          "Hãy viết thật chi tiết, đầy đủ mọi khía cạnh cần cân nhắc",
          "Viết như một chuyên gia có nhiều năm kinh nghiệm trong ngành",
          "Nếu thiếu thông tin, hãy tự bổ sung cho hợp lý nhất có thể",
        ],
        correct: 0,
        explanation:
          "Giới hạn nguồn và chỉ cho AI chỗ đánh dấu khi thiếu giúp bạn thấy ngay chỗ hổng. Yêu cầu 'đầy đủ mọi khía cạnh' khuyến khích AI thêm ý. Vai 'chuyên gia' làm giọng chắc hơn nhưng không thêm sự thật. Còn bảo 'tự bổ sung' là mở cửa cho bịa.",
      },
      {
        question: "Sếp chỉ có 2 phút đọc. Cấu trúc nào của bản đề xuất một trang hợp lý nhất?",
        options: [
          "Đề xuất và chi phí nằm ngay đầu, lý do và phương án ở sau",
          "Kể bối cảnh và lịch sử vấn đề trước, phần đề xuất để cuối trang",
          "Liệt kê mọi phương án đã cân nhắc rồi mới nêu lựa chọn ở cuối",
          "Để AI tự chọn cấu trúc vì nó biết sếp nào cũng thích thứ tự nào",
        ],
        correct: 0,
        explanation:
          "Người ra quyết định cần biết 'xin gì, tốn bao nhiêu' trước rồi mới đọc lý do. Kể lịch sử trước làm họ đọc hết trang mới thấy điều mình cần. Liệt kê mọi phương án tốn diện tích trang. AI không biết sếp bạn thích gì; đó là thứ chỉ bạn biết.",
      },
      {
        question: "Sau khi AI viết xong bản đề xuất, việc nào không thể bỏ?",
        options: [
          "Đối chiếu từng con số, tên và cam kết với ghi chú và nguồn",
          "Nhờ AI tự chấm điểm bản đề xuất và sửa lần nữa cho tới khi 10/10",
          "Đọc lướt câu đầu mỗi đoạn để xem giọng văn có nhất quán không",
          "Gửi luôn cho sếp và xin sếp góp ý những chỗ cần sửa lại",
        ],
        correct: 0,
        explanation:
          "Sai ở số và cam kết là loại sai gây hậu quả, và chỉ người có nguồn mới kiểm được. AI tự chấm điểm bản của chính nó không có bảng gốc để so. Đọc câu đầu chỉ kiểm giọng văn. Gửi sếp mà chưa kiểm thì bạn đang nhờ sếp làm phần việc của mình.",
      },
    ],
    keyTakeaways: [
      "Dàn ý trước, nội dung sau: sửa hướng khi còn rẻ.",
      "Chỉ cho AI dùng ghi chú của bạn; thiếu thì đánh dấu [cần bổ sung].",
      "Bản một trang: đề xuất và chi phí lên đầu, lý do phía sau.",
      "Số và cam kết trong bản nháp phải đối chiếu với nguồn.",
      "Mọi thứ AI thêm mà không có trong ghi chú đều là nghi vấn.",
    ],
    practicePrompt: {
      question:
        "Chị Mai gom ghi chú họp và bảo AI: 'Viết bản đề xuất tăng ngân sách đào tạo.' Bản nháp có câu 'giúp giảm 30% nhân viên nghỉ việc'. Ghi chú không hề có số này. Chị nên làm gì?",
      options: [
        "Xoá câu đó hoặc thay bằng số thật có nguồn, rồi soát các số còn lại",
        "Giữ câu đó vì con số 30% nghe hợp lý với ngành nhân sự",
        "Nhờ AI cho biết nó lấy 30% từ đâu rồi tin theo lời giải thích",
        "Đổi thành 'giảm đáng kể' để khỏi phải dẫn nguồn cho con số",
      ],
      correct: 0,
      explanation:
        "Số không có trong ghi chú là số AI bịa cho nghe chắc chắn; nghe hợp lý không phải bằng chứng. Hỏi lại AI nguồn thì nó có thể bịa luôn nguồn. Đổi thành 'giảm đáng kể' vẫn là một khẳng định không có căn cứ, chỉ mờ hơn.",
    },
    summary: {
      keyIdea: "AI viết nội dung nhanh, nhưng hướng đi của bản đề xuất là quyết định của bạn - hãy chốt nó ở dàn ý.",
      formula: "Ghi chú thô → dàn ý được bạn duyệt → nội dung từng phần chỉ từ ghi chú → đối chiếu số và cam kết.",
      commonMistake: "Dán ghi chú và bảo 'viết đi', rồi mất nửa tiếng sửa một trang đi sai hướng.",
      action: "Lần tới cần viết đề xuất, xin dàn ý 5 dòng và sửa nó trước khi xin nội dung.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú của một việc bạn cần đề xuất (mua sắm, đổi quy trình, xin thêm người). Nhờ AI lập dàn ý 5 dòng, sửa nó theo thứ tự sếp muốn đọc, rồi cho viết từng phần chỉ dựa trên ghi chú. Đánh dấu mọi con số và cam kết AI thêm mà ghi chú không có.",
      secondary: "Đếm xem AI thêm bao nhiêu ý ngoài ghi chú - đó là số ý bạn cần duyệt lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Ghi chú rời rạc thành một trang đề xuất là việc AI làm rất nhanh - nếu bạn giữ quyền quyết định hướng đi. Bài này dạy cách chốt hướng ở dàn ý để không phải sửa cả trang.",
      },
      {
        type: "feynman",
        title: "Viết đề xuất bằng AI đơn giản hơn bạn nghĩ",
        intro: "Không ai xây nhà bằng cách đổ bê tông trước rồi mới hỏi phòng ngủ ở đâu. Người ta vẽ bản phác mặt bằng, chủ nhà xem và sửa, rồi mới xây tường. Dàn ý chính là bản phác đó.",
        columns: ["Thành phần", "Xây nhà", "Viết đề xuất bằng AI"],
        rows: [
          ["Bản phác", "Mặt bằng vẽ tay vài nét", "Dàn ý 4-5 dòng"],
          ["Ai duyệt", "Chủ nhà", "Bạn - người biết sếp cần đọc gì"],
          ["Xây tường", "Thợ xây theo bản vẽ đã duyệt", "AI viết từng phần theo dàn ý"],
          ["Nghiệm thu", "Đo lại kích thước thực tế", "Đối chiếu số và cam kết với nguồn"],
        ],
        oneLiner: "Duyệt bản phác khi còn rẻ: sửa một dòng dàn ý dễ hơn đập đi xây lại một trang.",
      },
      { type: "heading", text: "Vấn đề: bản nháp đẹp nhưng không phải điều bạn muốn nói" },
      {
        type: "paragraph",
        text: "Khi bạn dán ghi chú thô và bảo 'viết đề xuất', AI phải tự quyết định ý nào quan trọng, xếp thứ tự ra sao và chỗ nào còn thiếu thì lấp gì vào. Nó quyết rất trôi chảy, nên bạn khó thấy chỗ nó đã quyết khác bạn. Chia làm hai bước để bạn giữ quyết định quan trọng nhất: cái gì đứng đầu trang.",
      },
      {
        type: "flow",
        title: "Từ ghi chú thô tới một trang đề xuất",
        steps: [
          { label: "Nói mục tiêu và người đọc", detail: "Một câu: 'Đề xuất mua 5 ghế cho phòng, người đọc là giám đốc, chỉ có 2 phút.' AI cần biết ai đọc và họ quyết định gì." },
          { label: "Xin dàn ý, chưa xin nội dung", detail: "Yêu cầu 4-5 dòng: xin gì, tốn bao nhiêu, vì sao, rủi ro nếu không làm, bước tiếp theo. Bạn sửa thứ tự và bỏ ý không cần." },
          { label: "Cho viết từng phần", detail: "Mỗi phần chỉ dùng thông tin trong ghi chú; thiếu thì ghi [cần bổ sung] thay vì tự điền." },
          { label: "Đối chiếu số và cam kết", detail: "Mọi con số, ngày và lời hứa trong bản nháp phải khớp ghi chú hoặc nguồn của bạn. Cái nào không có nguồn thì xoá." },
          { label: "Đọc như sếp", detail: "Đọc một lần như người có 2 phút: câu đầu tiên đã nói xin gì chưa? Nếu chưa, sửa trước khi gửi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI dựng dàn ý đề xuất",
        task: "Bạn cần đề xuất mua 5 ghế công thái học cho phòng; ghi chú có báo giá 4,2 triệu/ghế của nhà cung cấp A và lý do nhân viên hay đau lưng. Lắp prompt để AI lập dàn ý.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu và người đọc",
            options: [
              { text: "Viết bản đề xuất cho hay.", feedback: "Không biết ai đọc, xin gì - AI đoán và thường dồn vào phần mở đầu chung chung." },
              { text: "Đề xuất mua 5 ghế cho phòng; người đọc là giám đốc, có 2 phút, cần biết chi phí trước.", good: true, feedback: "AI biết ai đọc, xin gì, họ cần gì trước - dàn ý sẽ đặt chi phí lên đầu." },
            ],
          },
          {
            id: "source",
            label: "Nguồn thông tin",
            options: [
              { text: "Tự bổ sung thêm số liệu cho thuyết phục.", feedback: "Đây là lệnh bịa: AI sẽ chèn số liệu nghe hợp lý mà ghi chú của bạn không có." },
              { text: "Chỉ dùng ghi chú dán bên dưới; thiếu gì ghi [cần bổ sung], không tự điền.", good: true, feedback: "Chỗ hổng hiện ra thành dấu [cần bổ sung] để bạn xử lý, thay vì bị lấp bằng số bịa." },
            ],
          },
          {
            id: "form",
            label: "Hình thức đầu ra",
            options: [
              { text: "Viết luôn cả bản đề xuất.", feedback: "Bỏ qua bước duyệt dàn ý - sai hướng là phải sửa cả trang." },
              { text: "Chỉ lập dàn ý 5 dòng, mỗi dòng dưới 12 chữ; chưa viết nội dung.", good: true, feedback: "Dàn ý ngắn để bạn sửa trong một phút trước khi tốn công viết nội dung." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "source", "form"],
            text: "1. Đề xuất: mua 5 ghế công thái học\n2. Chi phí: 4,2 triệu/ghế (nhà cung cấp A); báo giá B [cần bổ sung]\n3. Lý do: nhân viên hay đau lưng khi ngồi lâu\n4. Rủi ro nếu không làm: [cần bổ sung]\n5. Bước tiếp theo: xin duyệt trước cuối tháng",
          },
          {
            requires: ["goal"],
            text: "1. Đề xuất mua 5 ghế\n2. Chi phí: khoảng 21 triệu, thấp hơn 15% so với mặt bằng thị trường\n3. Lợi ích: tăng năng suất 20%\n\n(Dàn ý đúng hướng nhưng AI tự thêm '15%' và '20%' mà ghi chú không có.)",
          },
          {
            text: "Giới thiệu chung về tầm quan trọng của môi trường làm việc hiện đại. Lịch sử phát triển của ghế văn phòng. Xu hướng ngành nội thất... (Sau đó là bản đề xuất dài ba trang mà chi phí chỉ xuất hiện ở trang thứ hai.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dàn ý trước, nội dung sau",
          text: "Sai hướng bị bắt ngay ở 5 dòng. Bạn quyết thứ tự theo điều sếp cần đọc. Mỗi phần AI viết đều có neo là dòng dàn ý đã duyệt. Tổng thời gian thường ngắn hơn.",
        },
        right: {
          label: "Viết cả bản một lượt",
          text: "Sai hướng chỉ lộ ra sau khi đọc hết. AI tự quyết ý nào quan trọng. Sửa một ý kéo theo sửa nhiều đoạn quanh nó. Dễ mất nửa tiếng sửa lại một bản đi sai từ đầu.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản đề xuất AI vừa viết",
        task: "Ghi chú của bạn chỉ có: cần 5 ghế, báo giá A 4,2 triệu/ghế, nhân viên hay đau lưng, muốn mua trong quý này. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Phòng đề xuất mua 5 ghế công thái học trong quý này." },
          { text: "Tổng chi phí dự kiến là 21 triệu đồng theo báo giá của nhà cung cấp A." },
          { text: "Nhà cung cấp B chào giá 3,8 triệu/ghế nên có thể tiết kiệm 2 triệu.", error: "Ghi chú không có báo giá B. AI bịa cả giá lẫn khoản tiết kiệm để so sánh nghe hợp lý." },
          { text: "Nhiều nhân viên hay đau lưng khi ngồi làm việc lâu." },
          { text: "Theo khảo sát ngành, ghế công thái học giúp tăng năng suất 20%.", error: "Không có khảo sát nào trong ghi chú. Con số 20% và 'khảo sát ngành' là AI tự thêm, không có nguồn để kiểm." },
          { text: "Đề nghị giám đốc duyệt để phòng kịp mua trong quý này." },
        ],
      },
      {
        type: "callout",
        label: "Chỗ trống tốt hơn số bịa",
        text: "Một bản đề xuất có hai chỗ ghi [cần bổ sung] còn hơn một bản đầy đủ mà một con số là bịa. Dấu chỗ trống nói cho bạn biết cần đi hỏi gì; số bịa thì nằm im tới khi sếp hỏi nguồn. Việc gì liên quan tới hợp đồng hay thuế, hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa vào đề xuất.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết một câu: xin gì, ai đọc, họ có bao lâu.",
          "Bước 2 - Dán ghi chú và xin dàn ý 5 dòng; sửa thứ tự cho hợp người đọc.",
          "Bước 3 - Cho viết từng phần, chỉ dựa trên ghi chú.",
          "Bước 4 - Đối chiếu số, ngày, cam kết rồi mới gửi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chốt hướng ở dàn ý, để AI viết phần còn lại, và tự tay kiểm phần số.",
          "Bài sau: dịch và viết lại tài liệu tiếng Anh mà không sai nghĩa.",
        ],
      },
    ],
  },
  {
    id: 1818,
    slug: "dich-va-viet-lai-tai-lieu-tieng-anh",
    title: "Chặng 25, Bài 9: Dịch và viết lại tài liệu tiếng Anh cho đồng nghiệp mà không sai nghĩa",
    subtitle: "AI dịch trôi chảy rất nhanh - phần bạn giữ là thuật ngữ, con số và tên riêng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🌐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhà cung cấp gửi bản hướng dẫn tiếng Anh 8 trang, đồng nghiệp cần đọc trong chiều nay. AI dịch xong trong một phút, nhưng một chữ 'không' bị mất, một con số bị làm tròn hoặc một tên sản phẩm bị dịch nghĩa đen là đủ để cả phòng làm sai. Biết chỗ nào phải soát giúp bạn dịch nhanh mà vẫn đáng tin.",
    openingQuestion:
      "AI dịch xong bản hướng dẫn tiếng Anh sang tiếng Việt, đọc rất mượt. Bạn không giỏi tiếng Anh. Điều nào nên soát trước khi gửi đồng nghiệp?",
    openingOptions: [
      "Con số, đơn vị, tên riêng và các chữ phủ định như not hay never",
      "Độ mượt của câu văn, vì bản dịch tự nhiên thì chắc chắn đúng nghĩa",
      "Số lượng đoạn văn, vì AI hay bỏ sót nguyên đoạn khi dịch tài liệu dài",
      "Định dạng chữ đậm, chữ nghiêng, vì đó là lỗi AI hay mắc khi dịch",
    ],
    correctOption: 0,
    explanation:
      "Lỗi dịch nguy hiểm nhất là lỗi mà câu vẫn mượt: mất một chữ phủ định làm ngược nghĩa, 1,5 thành 15 khi bị đổi dấu phẩy, tên sản phẩm bị dịch nghĩa đen thành một từ thông thường. Câu mượt không chứng minh đúng nghĩa. Đếm đoạn và định dạng chỉ là chuyện hình thức, và AI ít khi bỏ cả đoạn khi tài liệu có thể chia nhỏ để dịch.",
    diagram: [
      { label: "Chia tài liệu thành từng phần nhỏ", arrow: true },
      { label: "Đưa AI bảng thuật ngữ và tên riêng giữ nguyên", arrow: true },
      { label: "AI dịch, bạn dịch ngược một đoạn để thử nghĩa", arrow: true },
      { label: "Soát số, đơn vị, phủ định, tên riêng rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên mua hàng nhận hướng dẫn bảo quản hàng bằng tiếng Anh có câu 'Do not stack more than 3 layers'. Bản dịch cẩu thả bỏ mất chữ 'not' sẽ khiến kho xếp chồng cao lên và làm hỏng hàng. Vì vậy bước soát các chữ phủ định và con số quan trọng hơn việc câu dịch có hay hay không.",
    },
    quiz: [
      {
        question: "Bản dịch nào của 'Do not stack more than 3 layers' nguy hiểm nhất khi bị AI dịch sai?",
        options: [
          "Bản bỏ mất chữ 'không', thành 'nên xếp chồng quá 3 lớp'",
          "Bản dịch 'lớp' thành 'tầng' nên câu có phần hơi khác cách nói quen",
          "Bản dịch 'xếp chồng' thành 'chất lên nhau' làm câu dài thêm vài chữ",
          "Bản dùng chữ 'ba' thay cho số 3 ở giữa câu hướng dẫn kho hàng",
        ],
        correct: 0,
        explanation:
          "Mất chữ phủ định đảo ngược ý và người đọc làm theo là hỏng hàng. 'Tầng' thay 'lớp', 'chất lên nhau' thay 'xếp chồng' chỉ đổi cách nói mà ý vẫn đúng, và 'ba' thay '3' không đổi số. Vì vậy soát phủ định quan trọng hơn soát chữ đẹp.",
      },
      {
        question: "Tài liệu có nhiều từ chuyên ngành, mỗi lần AI dịch một kiểu. Cách sửa gọn nhất là gì?",
        options: [
          "Đưa bảng thuật ngữ cố định và yêu cầu dùng đúng theo bảng",
          "Bảo AI dịch 'thật chuyên nghiệp và nhất quán' rồi tin nó tự nhớ",
          "Dịch từng câu riêng lẻ, AI khỏi bị câu trước ảnh hưởng",
          "Bỏ hết thuật ngữ, thay bằng từ thông dụng để ai cũng dễ hiểu",
        ],
        correct: 0,
        explanation:
          "Bảng thuật ngữ cho AI đúng một cách dịch cho mỗi từ. Chữ 'nhất quán' không nói dùng từ nào. Dịch từng câu riêng làm nó mất ngữ cảnh và càng dịch mỗi kiểu, còn thay bằng từ thông dụng thì đồng nghiệp không còn thấy thuật ngữ họ quen trong ngành.",
      },
      {
        question: "Cách nào kiểm nhanh nhất một bản dịch khi bạn không đọc thạo tiếng Anh?",
        options: [
          "Nhờ một phiên AI mới dịch ngược đoạn đó về tiếng Anh rồi so với gốc",
          "Đọc bản dịch xem có mượt không, vì dịch sai thì câu sẽ đọc vấp",
          "Hỏi chính AI vừa dịch 'có chính xác không' rồi tin nó",
          "Dịch lại đoạn đó lần nữa trong chính cuộc trò chuyện đó",
        ],
        correct: 0,
        explanation:
          "Dịch ngược trong phiên mới cho bạn một bản tiếng Anh để so với gốc: nếu nghĩa lệch, chỗ lệch lộ ra. Câu mượt không loại trừ lỗi. Hỏi lại AI vừa dịch thì nó dễ khẳng định luôn điều nó vừa viết, và dịch lại trong cùng cuộc trò chuyện thường lặp lại đúng cách hiểu cũ.",
      },
      {
        question: "Trong tài liệu có tên sản phẩm 'Smart Flow'. Nên dặn AI thế nào?",
        options: [
          "Giữ nguyên tên riêng và tên sản phẩm, không dịch nghĩa",
          "Dịch tất cả cho đồng nhất, kể cả tên, để tài liệu toàn tiếng Việt",
          "Để AI tự quyết định tên nào dịch và tên nào giữ theo ngữ cảnh",
          "Dịch tên sang tiếng Việt và ghi tên gốc trong ngoặc ở mọi lần xuất hiện",
        ],
        correct: 0,
        explanation:
          "Tên sản phẩm là nhãn để tìm và đặt hàng, dịch nghĩa thì đồng nghiệp tra không ra. Dịch hết cho đồng nhất làm mất nhãn đó. Để AI tự quyết dẫn tới chỗ dịch chỗ giữ. Ghi ngoặc mọi lần thì được nhưng làm tài liệu rối, nên chỉ ghi lần đầu nếu cần.",
      },
      {
        question: "Tài liệu là hợp đồng có điều khoản phạt. Bản dịch AI nên được dùng thế nào?",
        options: [
          "Chỉ để tham khảo nhanh; bản dùng ký kết phải qua pháp chế hoặc dịch giả",
          "Dùng làm bản chính vì AI dịch chính xác hơn người khi đã có bảng thuật ngữ",
          "Dùng làm bản chính nếu đã dịch ngược một lần và thấy nghĩa khớp với gốc",
          "Dùng làm bản chính vì cả hai bên đều đọc được nghĩa đại ý của điều khoản",
        ],
        correct: 0,
        explanation:
          "Điều khoản ràng buộc cần từng chữ chính xác và người chịu trách nhiệm pháp lý; đó là việc của pháp chế hoặc dịch giả. Bảng thuật ngữ và dịch ngược giảm lỗi nhưng không thay được người chịu trách nhiệm, và 'đại ý' không đủ cho điều khoản phạt.",
      },
    ],
    keyTakeaways: [
      "Câu dịch mượt không chứng minh đúng nghĩa.",
      "Soát bốn thứ: số, đơn vị, chữ phủ định, tên riêng.",
      "Đưa bảng thuật ngữ để AI dùng một cách dịch cho một từ.",
      "Dịch ngược một đoạn trong phiên mới để thử nghĩa.",
      "Tài liệu có tính ràng buộc pháp lý: hỏi pháp chế, không tự dùng bản AI.",
    ],
    practicePrompt: {
      question:
        "Chị Thu nhờ AI dịch email nhà cung cấp: 'Payment is due within 30 days; late fees will not apply before day 45.' Bản dịch ghi 'Thanh toán trong 30 ngày; phí trễ hạn áp dụng từ ngày 45'. Chị nên làm gì?",
      options: [
        "So lại với gốc: bản dịch mất chữ 'không', nên phải sửa thành không áp dụng trước ngày 45",
        "Giữ nguyên, vì ngày 30 và 45 đều đã khớp với bản gốc",
        "Nhờ AI làm cho câu dịch thêm mượt để khỏi thấy vấn đề nữa",
        "Gửi luôn, nếu ai thắc mắc thì hỏi lại nhà cung cấp sau",
      ],
      correct: 0,
      explanation:
        "Gốc nói phí trễ hạn không áp dụng trước ngày 45; bản dịch nói áp dụng từ ngày 45, gần giống nhưng đã đổi ý: nó mất phần cho phép trễ tới hết ngày 44 rõ ràng. Số khớp không đủ khi phủ định bị mất. Làm câu mượt hơn không sửa được nghĩa, và gửi rồi mới hỏi thì hậu quả đã tới đồng nghiệp.",
    },
    summary: {
      keyIdea: "AI dịch nhanh và mượt; bạn bảo đảm nghĩa bằng cách soát số, phủ định, thuật ngữ và tên riêng.",
      formula: "Chia nhỏ + bảng thuật ngữ + dịch ngược một đoạn + soát bốn thứ = bản dịch dùng được.",
      commonMistake: "Thấy bản dịch mượt là tin, rồi bỏ qua chữ 'not' bị mất.",
      action: "Lần tới nhận tài liệu tiếng Anh, lập bảng 10 thuật ngữ và tên riêng trước khi nhờ AI dịch.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một đoạn tiếng Anh ngắn (một email nhà cung cấp hoặc một trang hướng dẫn, đã che thông tin mật). Lập bảng 5-10 thuật ngữ và tên riêng, nhờ AI dịch theo bảng, rồi mở một phiên mới dịch ngược đoạn đó. Gạch chân mọi số, đơn vị, chữ phủ định và so với gốc.",
      secondary: "Ghi lại chỗ nào AI dịch lệch để lần sau đưa vào bảng thuật ngữ.",
    },
    sections: [
      {
        type: "lead",
        text: "Dịch là việc AI làm nhanh nhất và cũng dễ khiến bạn chủ quan nhất, vì lỗi dịch không làm câu vấp. Bài này dạy bốn chỗ cần soát và một cách thử nghĩa ngay cả khi bạn không giỏi tiếng Anh.",
      },
      {
        type: "feynman",
        title: "Dịch bằng AI đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ AI là một phiên dịch viên giỏi ngoại ngữ nhưng mới vào ngành của bạn. Chị dịch mượt, nhanh, nhưng chưa biết chữ 'lead time' trong kho nghĩa là gì, nên có thể chọn nghĩa thông thường thay vì nghĩa ngành. Bạn là người biết ngành nên duyệt.",
        columns: ["Thành phần", "Phiên dịch viên mới vào ngành", "AI dịch tài liệu"],
        rows: [
          ["Điểm mạnh", "Ngoại ngữ tốt, dịch nhanh", "Dịch trôi chảy, tự nhiên"],
          ["Điểm yếu", "Chưa rõ thuật ngữ riêng của công ty", "Chọn nghĩa thông dụng cho từ chuyên ngành"],
          ["Cách hỗ trợ", "Đưa bảng thuật ngữ trước khi dịch", "Đưa bảng thuật ngữ và tên riêng trong yêu cầu"],
          ["Cách duyệt", "Người trong ngành đọc lại", "Dịch ngược đoạn quan trọng và soát số, phủ định"],
        ],
        oneLiner: "AI dịch giỏi nhưng chưa biết ngành của bạn - đưa bảng thuật ngữ và soát những chỗ sai nghĩa mà câu vẫn mượt.",
      },
      { type: "heading", text: "Vấn đề: lỗi dịch không làm câu vấp" },
      {
        type: "paragraph",
        text: "Sai chính tả thì mắt thấy. Sai nghĩa thì không: 'do not' thành 'do', 1,5 thành 15, tên 'Smart Flow' thành 'dòng chảy thông minh'. Câu vẫn mượt, bạn đọc lướt và tin. Vì vậy phần soát phải tập trung vào bốn thứ mà lỗi dịch hay nằm ở đó.",
      },
      {
        type: "comparison",
        left: {
          label: "Bốn thứ luôn soát",
          text: "Con số và đơn vị (dấu phẩy, dấu chấm, kg hay lb). Chữ phủ định (not, never, unless, except). Tên riêng, tên sản phẩm, chức danh. Thuật ngữ ngành nghĩa khác từ thông dụng.",
        },
        right: {
          label: "Thứ ít cần lo hơn",
          text: "Lỗi chính tả. Ngữ pháp câu tiếng Việt. Độ dài câu. Những chỗ này AI làm tốt và nếu có lệch thì mắt thấy ngay.",
        },
      },
      {
        type: "flow",
        title: "Quy trình dịch một tài liệu 8 trang",
        steps: [
          { label: "Chia nhỏ tài liệu", detail: "Dịch từng phần 1-2 trang thay vì dán cả 8 trang, để AI giữ được chi tiết và bạn soát từng phần dễ hơn." },
          { label: "Lập bảng thuật ngữ và tên riêng", detail: "Liệt kê 5-10 từ: cách dịch mong muốn hoặc 'giữ nguyên'. Đưa bảng này ở đầu mỗi lần nhờ dịch." },
          { label: "Nhờ dịch kèm ghi chú chỗ chưa chắc", detail: "Yêu cầu AI đánh dấu chỗ nó không chắc nghĩa, thay vì đoán rồi viết như chắc chắn." },
          { label: "Dịch ngược để thử nghĩa", detail: "Mở một phiên mới, dán bản dịch tiếng Việt và nhờ dịch ngược về tiếng Anh. So với gốc: chỗ nào lệch nghĩa là chỗ cần xem lại." },
          { label: "Soát bốn thứ và gửi", detail: "Đối chiếu số, đơn vị, phủ định, tên riêng với gốc. Xong mới gửi đồng nghiệp." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản dịch hướng dẫn bảo quản",
        task: "Bản gốc tiếng Anh: 'Store below 25 degrees. Do not stack more than 3 layers. Product name: Smart Flow. Shelf life: 18 months.' Đánh dấu những đoạn bản dịch AI làm sai nghĩa.",
        segments: [
          { text: "Bảo quản dưới 25 độ." },
          { text: "Nên xếp chồng nhiều hơn 3 lớp để tiết kiệm diện tích.", error: "Gốc là 'Do not stack more than 3 layers' - không xếp quá 3 lớp. Bản dịch mất chữ 'not' nên đảo ngược ý." },
          { text: "Tên sản phẩm: Smart Flow." },
          { text: "Hạn sử dụng: 8 tháng.", error: "Gốc là 18 tháng. Bản dịch làm rơi chữ số 1 nên hạn sử dụng ngắn đi hơn một nửa." },
          { text: "Tránh để gần nguồn nhiệt.", error: "Câu này không có trong bản gốc. AI tự thêm cho đầy đủ - tài liệu thật của nhà cung cấp không nói vậy." },
        ],
      },
      {
        type: "scenario",
        title: "Bản hướng dẫn nhà cung cấp cần dịch trước 3 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Kho cần bản hướng dẫn bảo quản hàng mới của nhà cung cấp bằng tiếng Anh, 3 giờ chiều nhận hàng. Bạn không giỏi tiếng Anh và có công cụ AI công ty duyệt.",
            choices: [
              { label: "Dán cả tài liệu, nhận bản dịch mượt và gửi thẳng cho kho", next: "bad_send" },
              { label: "Lập bảng thuật ngữ, dịch từng phần, rồi soát", next: "s2" },
            ],
          },
          bad_send: {
            text: "Bản dịch mất chữ 'not' ở dòng xếp chồng. Kho xếp cao 5 lớp và cả lô hàng bị móp thùng.",
            ending: "bad",
          },
          s2: {
            text: "AI dịch xong ba phần. Bạn còn 40 phút và có hai cách kiểm.",
            choices: [
              { label: "Mở phiên mới dịch ngược các đoạn có số và phủ định, rồi so với gốc", next: "good" },
              { label: "Hỏi chính AI: 'Bản dịch này chính xác chứ?' và tin nếu nó trả lời có", next: "bad_ask" },
            ],
          },
          bad_ask: {
            text: "AI khẳng định bản dịch chính xác - vì với nó, bản dịch đó nghe hợp lý. Lỗi về hạn sử dụng vẫn nằm trong bản gửi kho.",
            ending: "bad",
          },
          good: {
            text: "Bản dịch ngược cho thấy một chỗ 'không xếp quá 3 lớp' quay về 'có thể xếp chồng'. Bạn sửa chỗ đó, soát lại các số, và gửi kho lúc 2 giờ 30.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Tài liệu ràng buộc thì khác",
        text: "Hợp đồng, điều khoản phạt, tài liệu tuân thủ: bản AI chỉ dùng để đọc nhanh. Bản dùng để ký hoặc làm căn cứ cần bộ phận pháp chế hoặc dịch giả có trách nhiệm xem. Và như mọi bài trong chặng này, đừng dán tài liệu mật vào công cụ công ty chưa duyệt.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chia tài liệu thành phần nhỏ và lập bảng thuật ngữ, tên riêng.",
          "Bước 2 - Nhờ dịch theo bảng, kèm đánh dấu chỗ chưa chắc.",
          "Bước 3 - Dịch ngược các đoạn có số và phủ định trong một phiên mới.",
          "Bước 4 - Soát số, đơn vị, phủ định, tên riêng; hợp đồng thì chuyển pháp chế.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dịch mượt chưa phải dịch đúng: soát số, phủ định, thuật ngữ và tên riêng.",
          "Bài sau: dùng AI để học nhanh một mảng việc mới khi mới vào công ty.",
        ],
      },
    ],
  },
  {
    id: 1819,
    slug: "hoc-nhanh-mang-viec-moi-bang-ai",
    title: "Chặng 25, Bài 10: Dùng AI để học nhanh một mảng việc mới khi mới vào công ty",
    subtitle: "Đừng hỏi AI 'giải thích giúp tôi' - hãy giải thích lại cho nó nghe và để nó bắt lỗi bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Tuần đầu ở công ty mới, ai cũng nói 'PO', 'đối soát', 'SLA' như thể bạn đã biết. Đọc giải thích của AI thì thấy hiểu, nhưng tới lúc làm mới thấy chưa hiểu gì. Cách học bằng AI hiệu quả là hỏi ngược và tự kiểm bằng ví dụ, để biết chỗ nào mình chưa nắm trước khi sếp giao việc thật.",
    openingQuestion:
      "Bạn mới vào phòng mua hàng và nghe mọi người nói 'đối soát công nợ'. Cách nào dùng AI để thật sự hiểu chứ không chỉ thấy quen?",
    openingOptions: [
      "Tự giải thích lại bằng lời mình cho AI nghe và nhờ nó chỉ chỗ sai",
      "Xin AI giải thích thật chi tiết rồi đọc lại đến khi thấy thuộc",
      "Nhờ AI viết một bản tóm tắt ngắn và lưu vào máy để mở lại khi cần",
      "Hỏi AI thật nhiều thuật ngữ cùng lúc để có danh sách đầy đủ ngay",
    ],
    correctOption: 0,
    explanation:
      "Đọc giải thích tạo cảm giác hiểu, nhưng cảm giác đó chưa phải là hiểu; chỉ khi bạn tự nói lại bằng lời mình, chỗ hổng mới lộ ra. Cho AI đóng vai người hướng dẫn: bạn giải thích, nó chỉ chỗ thiếu hoặc sai. Đọc lại nhiều lần chỉ tăng độ quen mắt. Tóm tắt lưu máy là tài liệu để tra chứ không phải học. Hỏi thật nhiều thuật ngữ một lúc thì nhớ ít và hiểu nông.",
    diagram: [
      { label: "Hỏi AI giải thích bằng ví dụ đời thường", arrow: true },
      { label: "Bạn nói lại bằng lời mình, nhờ AI chỉ chỗ sai", arrow: true },
      { label: "AI ra 3 tình huống nhỏ để bạn tự làm thử", arrow: true },
      { label: "Đối chiếu quy trình thật với đồng nghiệp hoặc tài liệu công ty" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn mới vào phòng kế toán nghe 'đối soát công nợ' và nhờ AI giải thích. Sau đó bạn tự nói lại: 'là so số khách nợ của mình với số khách ghi' rồi nhờ AI bắt lỗi. AI chỉ ra bạn đang thiếu bước xử lý chênh lệch. Cuối cùng bạn hỏi đồng nghiệp quy trình thật ở công ty vì mỗi nơi làm một kiểu.",
    },
    quiz: [
      {
        question: "Vì sao 'đọc xong thấy hiểu' chưa đủ để dùng được kiến thức trong công việc?",
        options: [
          "Vì cảm giác quen mắt dễ nhầm với hiểu, chỉ tự nói lại mới lộ chỗ hổng",
          "Vì AI giải thích thiếu nên luôn phải hỏi thêm vài lần",
          "Vì kiến thức đọc trên máy tính kém bền hơn sách giấy",
          "Vì đọc nhanh làm bạn quên ngay, đọc chậm lại gấp đôi thì sẽ nhớ được",
        ],
        correct: 0,
        explanation:
          "Đọc lại làm nội dung quen mắt và ta tưởng là hiểu. Chỉ khi phải tự diễn đạt hay áp dụng, chỗ hổng mới hiện ra. Số lần hỏi AI không quyết định mức hiểu; giấy hay máy không khác nhau ở điểm này; và đọc chậm gấp đôi vẫn là đọc thụ động.",
      },
      {
        question: "Yêu cầu nào giúp AI đóng vai người kiểm tra hiểu biết của bạn tốt nhất?",
        options: [
          "Đây là cách tôi hiểu: (nói lại). Chỉ ra chỗ sai hoặc thiếu, chưa đưa đáp án",
          "Hãy giải thích lại đầy đủ hơn để tôi đọc và ghi nhớ nội dung này",
          "Hãy cho tôi biết tôi đã hiểu đúng chưa, trả lời ngắn bằng có hoặc không",
          "Hãy tóm tắt lại cho tôi các ý chính trong hai câu để tôi dễ nhớ hơn",
        ],
        correct: 0,
        explanation:
          "Bạn nói lại bằng lời mình và xin chỉ chỗ sai, nên phải huy động kiến thức thay vì đọc. Xin giải thích thêm hay tóm tắt lại là thụ động. Trả lời có hoặc không không chỉ ra thiếu gì, và AI hay đồng ý với người hỏi nên câu 'có' thường không đáng tin.",
      },
      {
        question: "AI giải thích quy trình 'đối soát công nợ' rất mạch lạc. Vì sao vẫn phải hỏi đồng nghiệp?",
        options: [
          "Vì quy trình cụ thể của công ty bạn mà AI chưa từng thấy",
          "Vì AI luôn giải thích sai các thuật ngữ về kế toán và mua hàng",
          "Vì AI chỉ giải thích đúng cho công ty lớn",
          "Vì hỏi đồng nghiệp chỉ là phép lịch sự khi mới vào",
        ],
        correct: 0,
        explanation:
          "AI biết khái niệm chung nhưng không biết mẫu biểu, phần mềm, người duyệt hay hạn chót ở công ty bạn. Nó không luôn sai thuật ngữ, và quy mô công ty không phải lý do chính. Hỏi đồng nghiệp là bước kiểm nguồn, không chỉ là phép lịch sự.",
      },
      {
        question: "Sau khi hiểu khái niệm, cách nào kiểm tra hiệu quả nhất trước khi làm việc thật?",
        options: [
          "Nhờ AI ra 3 tình huống nhỏ có số liệu rồi tự làm, sau đó mới xem đáp án",
          "Đọc lại lời giải thích của AI thêm một lần nữa để chắc chắn đã nhớ",
          "Nhờ AI hỏi 3 câu có sẵn đáp án và xem ngay đáp án bên dưới câu hỏi",
          "Chép lời giải thích vào sổ tay và đọc lại vào cuối tuần nếu còn thời gian",
        ],
        correct: 0,
        explanation:
          "Tự giải tình huống rồi mới xem đáp án buộc bạn dùng kiến thức và cho thấy chỗ sai cụ thể. Đọc lại chỉ tăng độ quen mắt, xem đáp án ngay dưới câu hỏi làm bạn không phải nghĩ, còn chép sổ tay là lưu trữ chứ không phải kiểm tra.",
      },
      {
        question: "AI đưa ra một số 'chuẩn ngành' như 'công nợ quá hạn không nên vượt 5%'. Bạn nên xử lý thế nào?",
        options: [
          "Coi là một gợi ý cần kiểm, hỏi trưởng phòng ngưỡng thực tế của công ty",
          "Dùng luôn làm ngưỡng cảnh báo vì AI đã tổng hợp nhiều tài liệu",
          "Ghi vào báo cáo và ghi nguồn là 'theo AI' cho khỏi bị hỏi thêm",
          "Bỏ qua mọi con số AI đưa ra vì AI không bao giờ nói đúng số liệu",
        ],
        correct: 0,
        explanation:
          "'Chuẩn ngành' AI đưa có thể là số nghe hợp lý chứ không phải thống kê đã kiểm. Ngưỡng dùng trong công ty do công ty quy định. 'Theo AI' không phải nguồn. Bỏ qua mọi con số thì thái quá: bạn chỉ cần biết số nào cần kiểm bằng nguồn thật.",
      },
    ],
    keyTakeaways: [
      "Hiểu là tự nói lại và tự làm được, không phải đọc thấy quen.",
      "Giải thích cho AI nghe và nhờ nó chỉ chỗ sai, chưa cho đáp án.",
      "Xin tình huống nhỏ có số liệu, tự làm rồi mới xem đáp án.",
      "AI biết khái niệm chung, không biết quy trình riêng của công ty bạn.",
      "Con số 'chuẩn ngành' do AI đưa là gợi ý cần kiểm, không phải sự thật.",
    ],
    practicePrompt: {
      question:
        "Bạn mới vào phòng nhân sự và cần hiểu 'onboarding'. AI giải thích rất rõ, bạn đọc hai lần. Bước nào tiếp theo giúp bạn thật sự nắm được?",
      options: [
        "Tự tóm lại bằng lời mình cho AI và nhờ nó chỉ chỗ sai hoặc thiếu",
        "Đọc thêm lần thứ ba để chắc chắn không bỏ sót ý nào trong bản giải thích",
        "Hỏi AI thêm 10 thuật ngữ khác trong phòng nhân sự để có danh sách đầy đủ",
        "Lưu đoạn giải thích vào ghi chú cá nhân để tra lại khi cần dùng",
      ],
      correct: 0,
      explanation:
        "Tự nói lại là cách nhanh nhất để lộ chỗ chưa hiểu. Đọc lần ba chỉ tăng độ quen. Thêm 10 thuật ngữ làm loãng chú ý khi chưa nắm cái đầu tiên. Lưu ghi chú là tra cứu về sau, chưa phải bước học.",
    },
    summary: {
      keyIdea: "Học bằng AI hiệu quả khi bạn nói và làm, còn AI hỏi và chỉ lỗi - chứ không phải khi bạn đọc.",
      formula: "Giải thích bằng ví dụ + tự nói lại + tình huống tự làm + hỏi người trong công ty = học xong.",
      commonMistake: "Đọc lời giải thích thấy quen rồi tin là đã hiểu, và tin luôn số 'chuẩn ngành' AI đưa ra.",
      action: "Chọn một thuật ngữ bạn vừa nghe hôm nay và tự giải thích lại cho AI nghe.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thuật ngữ hoặc quy trình bạn nghe ở chỗ làm tuần này mà chưa rõ. Nhờ AI giải thích bằng ví dụ đời thường, rồi viết lại bằng lời mình 4-5 câu và nhờ AI chỉ chỗ sai. Sau đó ghi ra 2 câu hỏi để hỏi đồng nghiệp về cách công ty mình thực tế làm.",
      secondary: "Xin AI 3 tình huống nhỏ về chủ đề đó và tự làm trước khi xem đáp án.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi lần đổi việc hoặc đổi phòng, bạn phải học một mảng mới thật nhanh. AI là người kèm rất kiên nhẫn - nếu bạn dùng nó để bị hỏi, thay vì chỉ để nghe giảng.",
      },
      {
        type: "feynman",
        title: "Học nhanh bằng AI đơn giản hơn bạn nghĩ",
        intro: "Người học nghề giỏi không ngồi nghe sư phụ nói cả ngày. Họ làm thử, nói lại cho sư phụ nghe và để sư phụ sửa. AI có thể là sư phụ kiên nhẫn đó - chỉ có điều nó chưa biết cách làm riêng ở xưởng của bạn.",
        columns: ["Thành phần", "Học nghề với sư phụ", "Học một mảng mới bằng AI"],
        rows: [
          ["Nghe giảng", "Sư phụ giải thích cách làm", "AI giải thích bằng ví dụ đời thường"],
          ["Nói lại", "Bạn kể lại cho sư phụ", "Bạn nói lại bằng lời mình, AI chỉ chỗ sai"],
          ["Làm thử", "Làm một mẻ nhỏ", "Tự giải 3 tình huống nhỏ do AI ra"],
          ["Cách làm riêng của xưởng", "Sư phụ biết rõ", "AI không biết: hỏi đồng nghiệp hoặc tài liệu công ty"],
        ],
        oneLiner: "Học là nói lại và làm thử, AI kèm cặp giúp bạn - còn cách làm riêng của công ty thì phải hỏi người trong công ty.",
      },
      { type: "heading", text: "Vấn đề: hiểu trong lúc đọc, quên khi làm" },
      {
        type: "paragraph",
        text: "Khi nhờ AI giải thích, bạn đọc và gật gù: rất rõ. Hôm sau sếp giao một việc thật và bạn không biết bắt đầu từ đâu. Sự khác biệt là đọc thì thụ động, còn làm việc cần bạn tự nhớ ra và áp dụng. Vì vậy ta đổi vai: để AI hỏi, còn bạn trả lời.",
      },
      {
        type: "flow",
        title: "Năm bước học một mảng mới",
        steps: [
          { label: "Xin giải thích bằng ví dụ đời thường", detail: "Nói rõ bạn mới vào ngành: 'Giải thích đối soát công nợ cho người chưa từng làm kế toán, dùng ví dụ một cửa hàng tạp hoá.'" },
          { label: "Tự nói lại bằng lời mình", detail: "Viết 4-5 câu theo cách bạn hiểu, chưa xem lại lời giải thích. Đây là bước lộ chỗ hổng." },
          { label: "Nhờ AI chỉ chỗ sai hoặc thiếu", detail: "Dặn nó: chỉ ra chỗ sai và chỗ thiếu, chưa viết lại đáp án hoàn chỉnh, để bạn tự sửa." },
          { label: "Tự làm 3 tình huống nhỏ", detail: "Xin AI ra 3 tình huống có số liệu nhỏ. Tự giải trước, rồi xem đáp án và so." },
          { label: "Hỏi người trong công ty", detail: "Ghi 2 câu hỏi về cách công ty làm thật (mẫu biểu, hạn, người duyệt) và hỏi đồng nghiệp hoặc tìm trong tài liệu nội bộ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI kiểm hiểu biết về 'đối soát công nợ'",
        task: "Bạn vừa nghe khái niệm này và đã viết lại bằng lời mình. Lắp prompt để AI giúp bạn thấy chỗ chưa hiểu.",
        parts: [
          {
            id: "role",
            label: "Vai của AI",
            options: [
              { text: "Giải thích đối soát công nợ thật chi tiết cho tôi.", feedback: "Bạn lại thành người nghe - đọc xong thấy hiểu mà chưa biết mình sai chỗ nào." },
              { text: "Bạn là người hướng dẫn kiên nhẫn; tôi mới vào ngành, sẽ giải thích lại theo cách hiểu của tôi.", good: true, feedback: "AI đóng vai người chấm bài nói lại của bạn - đúng chỗ bạn cần được kiểm." },
            ],
          },
          {
            id: "action",
            label: "Việc AI cần làm",
            options: [
              { text: "Cho tôi biết tôi đã hiểu đúng chưa, trả lời có hoặc không.", feedback: "Câu có hoặc không không chỉ ra chỗ hổng, và AI hay dễ dãi với người hỏi." },
              { text: "Chỉ ra chỗ tôi nói sai hoặc thiếu; chưa đưa đáp án hoàn chỉnh, để tôi tự sửa.", good: true, feedback: "Bạn được chỉ đúng chỗ hổng nhưng vẫn phải tự sửa - đó mới là học." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn kiến thức",
            options: [
              { text: "Nếu cần, cứ theo quy trình chuẩn của mọi công ty.", feedback: "AI sẽ nói như mọi công ty đều làm một kiểu - bạn dễ áp dụng sai vào công ty của mình." },
              { text: "Nói rõ đâu là khái niệm chung, đâu là chỗ mỗi công ty làm khác nhau để tôi đi hỏi.", good: true, feedback: "Bạn nhận về danh sách câu hỏi cần hỏi đồng nghiệp thay vì tưởng quy trình chung là quy trình công ty." },
            ],
          },
        ],
        responses: [
          {
            requires: ["role", "action", "limit"],
            text: "Bạn nói đúng ý chính: so số hai bên. Nhưng còn thiếu: (1) chưa nói bước xử lý chênh lệch khi hai bên không khớp; (2) chưa nói đối soát theo kỳ nào. Đây là chỗ mỗi công ty làm khác nhau, bạn nên hỏi: công ty đối soát theo tháng hay theo quý, và ai duyệt chênh lệch?",
          },
          {
            requires: ["role"],
            text: "Bạn hiểu đúng rồi! Đối soát công nợ là so sánh số liệu công nợ hai bên. Quy trình chuẩn thường: đối soát cuối tháng, chênh lệch dưới 1% thì bỏ qua...\n\n(Trả lời quá dễ dãi và tự thêm ngưỡng '1%' không có căn cứ, không chỉ ra chỗ bạn thiếu.)",
          },
          {
            text: "Đối soát công nợ là quá trình đối chiếu số dư công nợ giữa hai bên nhằm bảo đảm tính chính xác của sổ sách kế toán. Quy trình gồm nhiều bước như thu thập chứng từ, đối chiếu, lập biên bản...\n\n(Giải thích dài như sách giáo khoa; bạn đọc thấy quen nhưng vẫn không biết mình hiểu sai chỗ nào.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Học chủ động với AI",
          text: "Bạn nói lại bằng lời mình và nhờ AI chỉ chỗ sai. Bạn tự giải tình huống rồi mới xem đáp án. Bạn biết chỗ nào cần hỏi đồng nghiệp. Sau 30 phút bạn làm được việc nhỏ.",
        },
        right: {
          label: "Đọc giải thích thụ động",
          text: "Bạn đọc, thấy hợp lý, gật đầu. Không biết chỗ nào chưa hiểu tới lúc làm thật. Dễ tưởng quy trình chung là quy trình công ty. Sau 30 phút bạn thấy quen nhưng chưa làm được.",
        },
      },
      {
        type: "callout",
        label: "AI không biết công ty của bạn",
        text: "AI biết khái niệm chung, không biết mẫu biểu, phần mềm, người duyệt hay hạn chót ở công ty bạn. Con số 'chuẩn ngành' nó đưa ra có thể chỉ là số nghe hợp lý. Việc gì liên quan tới quy định hay thuế, hỏi bộ phận pháp chế hoặc kế toán trưởng.",
      },
      {
        type: "scenario",
        title: "Tuần đầu ở phòng mua hàng",
        start: "s1",
        nodes: {
          s1: {
            text: "Trưởng phòng nhờ bạn kiểm 'đối soát công nợ' với nhà cung cấp X vào chiều mai. Bạn chưa từng làm. Còn buổi tối để học.",
            choices: [
              { label: "Nhờ AI giải thích chi tiết, đọc kỹ hai lần rồi đi làm", next: "bad_read" },
              { label: "Nhờ AI giải thích bằng ví dụ, rồi tự nói lại và nhờ nó chỉ chỗ sai", next: "s2" },
            ],
          },
          bad_read: {
            text: "Bạn thấy mình hiểu hết. Chiều hôm sau, khi số hai bên lệch nhau, bạn không biết bước tiếp theo và phải hỏi trưởng phòng ngay giữa buổi họp.",
            ending: "bad",
          },
          s2: {
            text: "AI chỉ ra bạn thiếu bước xử lý chênh lệch. Nó cũng nói mỗi công ty làm khác nhau.",
            choices: [
              { label: "Ghi hai câu hỏi và hỏi đồng nghiệp cách công ty mình xử lý chênh lệch", next: "good" },
              { label: "Theo luôn quy trình AI mô tả vì nó nghe rất chuyên nghiệp", next: "bad_ai" },
            ],
          },
          bad_ai: {
            text: "Bạn áp dụng ngưỡng bỏ qua chênh lệch mà AI nói là phổ biến. Công ty bạn không có quy định đó và trưởng phòng phải nhờ làm lại từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp cho bạn xem biểu mẫu thật và nói chênh lệch phải báo trưởng phòng. Chiều hôm sau bạn làm đúng và nhanh.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xin giải thích bằng ví dụ đời thường, nói rõ bạn mới vào ngành.",
          "Bước 2 - Tự nói lại bằng lời mình, chưa xem lại bản giải thích.",
          "Bước 3 - Nhờ AI chỉ chỗ sai hoặc thiếu, rồi tự sửa.",
          "Bước 4 - Tự giải 3 tình huống nhỏ, sau đó hỏi đồng nghiệp cách công ty làm thật.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hiểu là nói lại và làm được - để AI hỏi bạn, đừng chỉ nghe nó giảng.",
          "Khái niệm chung thì hỏi AI, cách làm riêng của công ty thì hỏi người trong công ty.",
        ],
      },
    ],
  },
];
