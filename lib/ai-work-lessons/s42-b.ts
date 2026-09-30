import type { Lesson } from "../lesson-types";

// Chặng 42, bài 6-10. Giáo trình: scripts/curriculum/stage-42.json.
// Không nêu tính năng riêng của công cụ nào (tên nút, gói, phiên bản): các bài chỉ
// dạy khái niệm bền (giới hạn ngữ cảnh, bộ nhớ) và cách kiểm trong chính công cụ bạn dùng.
export const S42_B_LESSONS: Lesson[] = [
  {
    id: 2245,
    slug: "cua-so-ngu-canh-la-mot-cai-ban",
    title: "Chặng 42, Bài 6: Cửa sổ ngữ cảnh: chiếc bàn có hạn",
    subtitle: "Bàn làm việc chỉ rộng có hạn: đặt thêm giấy lên thì tờ dưới cùng rơi xuống đất.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🪟",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dán cả tập báo cáo dài vào AI rồi hỏi về phần đầu, nó trả lời như chưa từng đọc. Hiểu rằng công cụ chỉ xem được một lượng chữ có hạn trong một lần giúp bạn chia việc đúng cách, thay vì đổ lỗi cho công cụ hay dán thêm cho tới khi mọi thứ lẫn lộn.",
    openingQuestion:
      "Bạn dán sáu báo cáo tháng liền nhau vào một cuộc trò chuyện rồi hỏi: tháng 1 khác tháng 6 ở đâu? Câu trả lời chỉ nói về các tháng cuối. Nguyên nhân dễ xảy ra nhất là gì?",
    openingOptions: [
      "Lượng chữ dán vào vượt phần công cụ xem được cùng lúc, nên phần đầu bị bỏ sót",
      "Công cụ không thích các báo cáo cũ nên cố tình bỏ qua",
      "Báo cáo tháng 1 viết bằng font chữ mà AI không đọc được",
      "Bạn hỏi bằng tiếng Việt nên AI chỉ đọc nửa sau của văn bản",
    ],
    correctOption: 0,
    explanation:
      "Mỗi công cụ AI chỉ xem được một lượng chữ nhất định trong một lần trả lời, gọi là cửa sổ ngữ cảnh. Dán quá nhiều thì phần đầu bị cắt hoặc bị chú ý ít hơn, và công cụ vẫn trả lời trôi chảy trên phần còn lại nên bạn khó nhận ra. Nó không có cảm xúc để bỏ qua báo cáo cũ, font chữ không phải lý do vì văn bản được chuyển thành chữ thuần, và ngôn ngữ hỏi không làm nó chỉ đọc nửa sau.",
    diagram: [
      { label: "Bạn dán tài liệu dài vào cuộc trò chuyện", arrow: true },
      { label: "Công cụ chỉ xem được một phần trong một lần", arrow: true },
      { label: "Phần ngoài tầm xem bị bỏ sót, câu trả lời vẫn trôi chảy", arrow: true },
      { label: "Bạn chia nhỏ việc và kiểm phần đầu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kế toán tổng hợp báo cáo quý",
      description:
        "Một kế toán dán cả sáu báo cáo tháng vào một cuộc trò chuyện rồi nhờ so sánh tháng 1 với tháng 6. Bản so sánh chỉ nhắc tới các tháng cuối. Chị chuyển sang cách khác: nhờ tóm tắt từng báo cáo thành 10 dòng, rồi dán sáu bản tóm tắt để so sánh và mở lại báo cáo gốc đối chiếu vài con số. Đây là tình huống minh hoạ, không phải số liệu của một công ty có thật.",
    },
    quiz: [
      {
        question: "Cửa sổ ngữ cảnh của một công cụ AI là gì?",
        options: [
          "Lượng chữ tối đa nó xem được cùng lúc khi soạn một câu trả lời",
          "Kích thước của khung chat hiện trên màn hình bạn",
          "Số câu hỏi tối đa bạn được gửi trong một ngày",
          "Khoảng thời gian nó nhớ bạn giữa các buổi khác nhau",
        ],
        correct: 0,
        explanation:
          "Cửa sổ ngữ cảnh là phần chữ công cụ nhìn được trong một lần trả lời, gồm cả câu hỏi, tài liệu dán vào và các tin nhắn trước. Nó không phải kích thước khung chat, không phải hạn mức số câu hỏi mỗi ngày, và cũng không phải thời gian nhớ giữa các buổi - đó là chuyện khác.",
      },
      {
        question: "Bạn dán 8 báo cáo rồi hỏi về báo cáo đầu, câu trả lời sai lệch. Việc nên làm trước tiên?",
        options: [
          "Chia nhỏ rồi tóm tắt từng báo cáo riêng",
          "Dán thêm 8 báo cáo nữa để nó có nhiều thông tin hơn",
          "Hỏi lại đúng câu đó nhiều lần cho tới khi trả lời đúng",
          "Kết luận rằng AI luôn sai với mọi tài liệu dài, không dùng nữa",
        ],
        correct: 0,
        explanation:
          "Chia việc thành các phần vừa tầm là cách gỡ đúng nguyên nhân. Dán thêm chỉ làm bàn đầy hơn. Hỏi lặp lại vẫn trên cùng một đống tài liệu nên phần đầu vẫn bị bỏ sót. Kết luận AI luôn sai cũng quá tay: nó xử lý tốt tài liệu vừa tầm.",
      },
      {
        question: "Vì sao câu trả lời khi tài liệu quá dài vẫn nghe rất trôi chảy?",
        options: [
          "Nó viết mượt trên phần đã xem, không báo phần bỏ",
          "Nó đã đọc hết và cân nhắc kỹ từng dòng trước khi trả lời",
          "Nó tự gạch bỏ mọi câu sai trước khi hiển thị cho bạn",
          "Nó luôn cảnh báo bạn khi tài liệu dài vượt quá sức chứa",
        ],
        correct: 0,
        explanation:
          "Công cụ được thiết kế để viết chữ nghe hợp lý, nên phần thiếu không làm câu văn vấp. Nó không đọc hết rồi cân nhắc từng dòng, không tự gạch câu sai, và không phải lúc nào cũng cảnh báo khi tài liệu vượt tầm - vì vậy bạn phải tự kiểm phần đầu tài liệu.",
      },
      {
        question: "Cách nào kiểm nhanh nhất xem công cụ có còn nhớ phần đầu tài liệu bạn dán không?",
        options: [
          "Hỏi một chi tiết cụ thể ở phần đầu rồi đối chiếu với bản gốc",
          "Hỏi nó có nhớ phần đầu không, nó đáp có thì yên tâm dùng tiếp",
          "Đếm số trang đã dán, dưới 100 trang là chắc chắn còn nhớ",
          "Nhìn độ dài câu trả lời: càng dài thì càng nhớ hết",
        ],
        correct: 0,
        explanation:
          "Hỏi một chi tiết cụ thể (một con số, một tên) rồi mở bản gốc đối chiếu là phép thử thật. Hỏi nó có nhớ không thì nó có thể đáp có cho êm. Con số 100 trang là ngưỡng bịa: giới hạn khác nhau theo công cụ và thay đổi theo thời gian. Câu trả lời dài không chứng minh gì.",
      },
      {
        question: "Việc nào hợp nhất khi cần tổng hợp một tập tài liệu rất dài bằng AI?",
        options: [
          "Tóm tắt từng phần thành ghi chú ngắn, rồi tổng hợp các ghi chú",
          "Dán tất cả một lượt, vì công cụ nào cũng đọc được hết mọi thứ bạn đưa vào",
          "Chỉ dán phần cuối, vì phần cuối luôn quan trọng nhất",
          "Nhờ nó nhớ tất cả rồi hỏi lại vào ngày hôm sau",
        ],
        correct: 0,
        explanation:
          "Tóm tắt theo phần rồi tổng hợp giữ mọi phần trong tầm nhìn. Dán một lượt có thể vượt cửa sổ ngữ cảnh. Chỉ dán phần cuối bỏ mất dữ kiện đầu, mà báo cáo thường có kết luận quan trọng ở đầu. Nhờ nó nhớ tới hôm sau không hiệu quả nếu công cụ không có bộ nhớ giữa các cuộc.",
      },
    ],
    keyTakeaways: [
      "Công cụ AI chỉ xem được một lượng chữ có hạn trong một lần trả lời.",
      "Phần vượt tầm bị bỏ sót nhưng câu trả lời vẫn trôi chảy, nên phải tự kiểm.",
      "Chia tài liệu dài thành phần vừa tầm, tóm tắt từng phần rồi mới tổng hợp.",
      "Kiểm bằng một chi tiết cụ thể ở phần đầu, đối chiếu với bản gốc.",
    ],
    practicePrompt: {
      question:
        "Chị Hà có 5 hợp đồng nhà cung cấp, mỗi hợp đồng nhiều trang, muốn liệt kê hạn thanh toán của từng hợp đồng. Cách làm hợp lý?",
      options: [
        "Hỏi từng hợp đồng riêng, ghi kết quả vào bảng, đối chiếu vài dòng với bản gốc",
        "Dán cả năm rồi hỏi một câu, tin bảng kết quả",
        "Chỉ dán hợp đồng cuối, vì hạn thanh toán nằm ở cuối",
        "Nhờ AI nhớ hợp đồng, hôm sau hỏi lại từng hạn",
      ],
      correct: 0,
      explanation:
        "Từng hợp đồng một nằm gọn trong tầm nhìn, và bảng kết quả kiểm được bằng cách mở bản gốc. Dán cả năm dễ sót hợp đồng đầu. Đoán hạn thanh toán nằm ở cuối là suy diễn. Nhờ nhớ tới hôm sau phụ thuộc vào tính năng bộ nhớ mà bạn chưa kiểm tra.",
    },
    summary: {
      keyIdea: "AI có một chiếc bàn có hạn: đặt quá nhiều giấy thì tờ dưới cùng rơi xuống mà không báo.",
      formula: "Tài liệu dài → chia phần → tóm tắt từng phần → tổng hợp bản tóm tắt → kiểm chi tiết ở phần đầu.",
      commonMistake: "Dán tất cả một lượt rồi tin câu trả lời chỉ vì nó viết trôi chảy.",
      action: "Thử với một tài liệu dài của bạn: hỏi một chi tiết ở phần đầu và đối chiếu với bản gốc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu dài của bạn (báo cáo, hợp đồng, biên bản gộp) không chứa thông tin nhạy cảm. Chia thành 3 phần, nhờ AI tóm tắt mỗi phần thành 8 dòng, rồi dán 3 bản tóm tắt và hỏi một câu tổng hợp. Sau đó mở tài liệu gốc kiểm 2 chi tiết ở phần đầu.",
      secondary: "Ghi lại: chi tiết nào ở phần đầu còn đúng, chi tiết nào đã sai hoặc mất.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn dán cả tập báo cáo tháng vào AI, hỏi một câu về tháng đầu tiên, và nhận về câu trả lời chỉ nói chuyện tháng cuối. Bài này giải thích vì sao, bằng hình ảnh một chiếc bàn làm việc.",
      },
      {
        type: "feynman",
        title: "Cửa sổ ngữ cảnh đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn ngồi ở một chiếc bàn nhỏ để soạn báo cáo. Bạn chỉ nhìn được những tờ giấy đang nằm trên mặt bàn, còn tờ nào rơi xuống đất thì bạn không thấy.",
        columns: ["Thành phần", "Chiếc bàn làm việc", "Công cụ AI"],
        rows: [
          ["Mặt bàn", "Chỉ đặt được số giấy có hạn", "Cửa sổ ngữ cảnh: lượng chữ xem được cùng lúc"],
          ["Đặt thêm giấy", "Tờ dưới cùng bị đẩy rơi", "Dán thêm thì phần đầu bị bỏ sót"],
          ["Người ngồi bàn", "Vẫn làm việc bình thường với giấy còn lại", "Vẫn viết trôi chảy trên phần còn thấy"],
          ["Cách xử lý", "Gom giấy thành tập tóm tắt rồi đặt lên bàn", "Chia nhỏ, tóm tắt từng phần rồi tổng hợp"],
        ],
        oneLiner: "Công cụ AI chỉ đọc được những gì nằm trên bàn của nó: muốn nó đọc nhiều, hãy đặt lên bàn bản tóm tắt chứ đừng đổ cả kho giấy.",
      },
      { type: "heading", text: "Khoảnh khắc thấy phần đầu bị quên" },
      {
        type: "paragraph",
        text: "Bạn có thể nhận ra dấu hiệu dễ nhất: hỏi về chi tiết ở phần đầu, công cụ trả lời chung chung hoặc bịa. Thuật ngữ mới duy nhất ở đây là cửa sổ ngữ cảnh: phần chữ công cụ xem được trong một lần trả lời, gồm cả tài liệu bạn dán và các tin nhắn trước đó.",
      },
      {
        type: "chart",
        title: "Dán càng nhiều, phần được xem càng ít",
        caption: "Số liệu minh hoạ: giả sử bàn chứa được số trang bạn kéo ở thanh trượt. Giới hạn thật thay đổi theo công cụ và theo thời gian. Biểu đồ chỉ cho thấy dạng đường cong: vượt tầm thì tỷ lệ phần được xem giảm dần.",
        kind: "line",
        xLabel: "Số trang dán vào",
        yLabel: "Phần được xem (%)",
        x: { from: 10, to: 200, step: 10 },
        params: [
          { id: "cap", label: "Bàn chứa được (trang)", min: 20, max: 150, step: 5, value: 60, unit: "trang" },
        ],
        series: [{ label: "Phần được xem", expr: "min(100, cap / x * 100)" }],
      },
      {
        type: "paragraph",
        text: "Kéo thanh trượt để thấy: dán ít hơn sức chứa thì công cụ xem đủ cả 100%; dán vượt thì tỷ lệ tụt dần. Phần bị bỏ sót thường là đoạn đầu, đúng chỗ bạn hay đặt kết luận hoặc điều khoản quan trọng.",
      },
      { type: "heading", text: "Cách chia việc cho vừa tầm" },
      {
        type: "list",
        items: [
          "Bước 1 - Chia tài liệu thành các phần vừa tầm, ví dụ mỗi báo cáo một phần.",
          "Bước 2 - Nhờ AI tóm tắt từng phần thành ghi chú ngắn, nêu rõ cần giữ số liệu nào.",
          "Bước 3 - Dán các ghi chú ngắn vào một chỗ và hỏi câu tổng hợp.",
          "Bước 4 - Chọn 2 chi tiết, mở bản gốc đối chiếu.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dán tất cả một lượt",
          text: "Nhanh lúc đầu. Phần đầu dễ bị bỏ sót, câu trả lời vẫn trôi chảy nên khó nhận ra lỗi, và bạn không biết chi tiết nào đã bị bỏ.",
        },
        right: {
          label: "Chia phần rồi tổng hợp",
          text: "Mất thêm vài phút. Mỗi phần nằm trọn trong tầm nhìn, bản ghi ngắn giúp bạn tự đọc lại được, và kiểm chi tiết dễ hơn.",
        },
      },
      {
        type: "callout",
        label: "Cẩn thận",
        text: "Dữ liệu nhạy cảm như hợp đồng khách hàng hay bảng lương chỉ dán vào công cụ công ty đã duyệt. Chia nhỏ tài liệu không làm nó bớt nhạy cảm.",
      },
      {
        type: "scenario",
        title: "Tập báo cáo dài và câu hỏi về tháng đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã dán 6 báo cáo tháng rồi hỏi tháng 1 khác tháng 6 ở đâu. Câu trả lời chỉ bàn về ba tháng cuối. Bạn định làm gì?",
            choices: [
              { label: "Dán thêm 3 báo cáo của năm trước để nó có nhiều thông tin hơn", next: "bad_more" },
              { label: "Mở cuộc mới, nhờ tóm tắt từng báo cáo thành 10 dòng rồi dán 6 bản tóm tắt", next: "s2" },
            ],
          },
          bad_more: {
            text: "Bàn đã đầy mà bạn lại đặt thêm giấy. Bản so sánh mới còn lẫn cả số năm trước, và tháng 1 vẫn không được nhắc tới. Bạn mất thêm nửa buổi.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về một bản so sánh nêu doanh thu tháng 1 tăng chậm hơn tháng 6. Bạn còn 20 phút trước buổi họp.",
            choices: [
              { label: "Nhờ chính AI kiểm lại xem bản so sánh có đúng không", next: "bad_self" },
              { label: "Mở báo cáo tháng 1 và tháng 6 gốc, đối chiếu hai con số chính", next: "good" },
            ],
          },
          bad_self: {
            text: "AI xác nhận bản của nó đúng, vì nó chỉ nhìn lại chính bản tóm tắt. Trong họp, sếp hỏi số tháng 1 lấy ở đâu và bạn không mở được nguồn.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy một số bị sai khoảng làm tròn, sửa lại và ghi số trang nguồn cạnh mỗi con số. Trong họp, bạn mở đúng trang khi được hỏi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bàn có hạn: chia tài liệu, tóm tắt từng phần, rồi kiểm phần đầu.",
          "Bài sau: khi một cuộc trò chuyện kéo dài hàng giờ, khi nào nên mở cuộc mới.",
        ],
      },
    ],
  },
  {
    id: 2246,
    slug: "cuoc-tro-chuyen-dai-va-viec-bi-quen",
    title: "Chặng 42, Bài 7: Cuộc trò chuyện quá dài thì nên mở cuộc mới khi nào",
    subtitle: "Cuộc họp kéo dài nhiều giờ thì người ghi biên bản cũng bắt đầu lẫn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau nhiều giờ trò chuyện, công cụ bắt đầu lặp lại, quên điều đã chốt hoặc lẫn ý cũ với ý mới. Biết dấu hiệu và cách chuyển sang cuộc mới bằng một bản tóm tắt giúp bạn giữ được công sức đã bỏ ra mà không phải kể lại từ đầu.",
    openingQuestion:
      "Bạn trò chuyện với AI ba tiếng để lên kế hoạch hội thảo. Chiều muộn nó đề xuất lại phương án bạn đã bác từ sáng. Đây là dấu hiệu gì?",
    openingOptions: [
      "Cuộc trò chuyện đã quá dài, ý cũ bị lẫn hoặc mất, nên cần chốt lại và mở cuộc mới",
      "AI đang cố ý thử lòng kiên nhẫn của bạn",
      "Kế hoạch hội thảo quá tốt nên AI muốn nhắc lại",
      "Máy tính của bạn chạy chậm nên chữ bị lặp",
    ],
    correctOption: 0,
    explanation:
      "Cuộc trò chuyện dài kéo theo nhiều chữ, và phần cũ có thể bị bỏ sót hoặc lu mờ nên công cụ đề xuất lại điều bạn đã bác. Cách xử lý là nhờ nó tóm tắt điều đã chốt, đọc và sửa bản tóm tắt, rồi mở cuộc mới với bản đó. Công cụ không thử lòng kiên nhẫn của ai, chuyện nhắc lại không liên quan chất lượng kế hoạch, và tốc độ máy tính không làm chữ bị lặp.",
    diagram: [
      { label: "Nhận dấu hiệu: lặp lại, quên điều đã chốt", arrow: true },
      { label: "Nhờ AI tóm tắt điều đã chốt và điều còn mở", arrow: true },
      { label: "Bạn đọc và sửa bản tóm tắt", arrow: true },
      { label: "Mở cuộc mới, dán bản tóm tắt và làm tiếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: trợ lý tổ chức sự kiện",
      description:
        "Một trợ lý sự kiện lên kế hoạch hội thảo 20 người suốt buổi sáng trong một cuộc trò chuyện. Đến chiều công cụ nhắc lại ngân sách đã bị thay đổi từ trước. Chị nhờ nó tóm tắt điều đã chốt, tự sửa hai chỗ sai, mở cuộc mới và dán bản tóm tắt. Đây là tình huống minh hoạ, các số liệu chỉ để dễ hình dung.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào cho thấy nên mở cuộc trò chuyện mới?",
        options: [
          "Công cụ lặp lại ý cũ và quên điều bạn đã chốt trước đó",
          "Câu trả lời của công cụ hơi ngắn hơn lúc đầu",
          "Bạn vừa đổi từ dùng máy tính sang điện thoại",
          "Công cụ đã trả lời được hơn 10 câu liên tiếp",
        ],
        correct: 0,
        explanation:
          "Lặp ý và quên điều đã chốt là dấu hiệu cuộc trò chuyện đã quá dài. Câu ngắn hơn có thể chỉ do bạn hỏi ngắn. Đổi thiết bị không ảnh hưởng nội dung. Con số 10 câu là ngưỡng bịa: có cuộc trò chuyện dài vẫn ổn nếu việc đơn giản.",
      },
      {
        question: "Trước khi mở cuộc mới, nên làm gì để không mất điều đã chốt?",
        options: [
          "Nhờ tóm tắt điều đã chốt và còn mở, đọc kỹ rồi sửa",
          "Copy nguyên toàn bộ cuộc trò chuyện dán sang cuộc mới",
          "Không làm gì, vì cuộc mới tự nhớ cuộc cũ",
          "Xoá cuộc cũ ngay để khỏi bị lẫn",
        ],
        correct: 0,
        explanation:
          "Bản tóm tắt do bạn kiểm là thứ ngắn gọn, có thể đưa qua cuộc mới. Copy toàn bộ mang theo luôn sự lẫn lộn và vẫn dài. Cuộc mới thường không tự biết cuộc cũ. Xoá cuộc cũ trước khi có bản tóm tắt là mất luôn dữ kiện.",
      },
      {
        question: "Vì sao phải đọc lại bản tóm tắt do AI viết trước khi dùng?",
        options: [
          "Bản tóm tắt có thể chép sai hoặc lẫn ý cũ",
          "AI luôn cố ý tóm tắt sai để bạn phải hỏi thêm nhiều lần",
          "Tóm tắt lúc nào cũng dài hơn văn bản gốc nên cần cắt bớt",
          "Đọc lại giúp công cụ ghi nhớ lâu hơn ở các cuộc sau",
        ],
        correct: 0,
        explanation:
          "Tóm tắt từ một cuộc trò chuyện đã lẫn có thể mang theo con số cũ hoặc phương án đã bỏ, nên bạn là người xác nhận. AI không tóm tắt sai có chủ ý. Tóm tắt thường ngắn hơn bản gốc. Việc bạn đọc lại không làm công cụ nhớ lâu hơn - lợi ích thuộc về bạn.",
      },
      {
        question: "Nội dung nào cần có trong bản tóm tắt để chuyển sang cuộc mới?",
        options: [
          "Điều đã chốt, điều còn mở và việc tiếp theo cần làm",
          "Toàn bộ những lời khen chê qua lại giữa bạn và AI trong buổi",
          "Chỉ tên cuộc trò chuyện và ngày bắt đầu",
          "Các phương án đã bị bác, viết đầy đủ chi tiết",
        ],
        correct: 0,
        explanation:
          "Điều đã chốt, điều còn mở và bước tiếp theo đủ để làm tiếp. Lời khen chê là thừa. Tên và ngày không giúp làm việc. Ghi đầy đủ phương án đã bác dễ khiến công cụ lại đề xuất chúng, nên chỉ ghi ngắn để tránh.",
      },
      {
        question: "Sau khi dán bản tóm tắt vào cuộc mới, việc nên làm ngay?",
        options: [
          "Hỏi lại một điều đã chốt để xem công cụ hiểu đúng chưa",
          "Yêu cầu nó quên hết bản tóm tắt để bắt đầu lại từ trang trắng",
          "Chuyển thẳng sang việc mới mà không kiểm gì",
          "Dán thêm cả cuộc trò chuyện cũ vào cho chắc",
        ],
        correct: 0,
        explanation:
          "Một câu hỏi kiểm nhanh giúp phát hiện công cụ hiểu sai bản tóm tắt ngay từ đầu. Bảo nó quên thì mất mục đích mang tóm tắt sang. Bỏ qua kiểm là lặp lại rủi ro cũ. Dán cả cuộc cũ đưa lại chính vấn đề độ dài.",
      },
    ],
    keyTakeaways: [
      "Lặp ý, quên điều đã chốt, lẫn ý cũ và mới là dấu hiệu cuộc trò chuyện quá dài.",
      "Nhờ AI tóm tắt điều đã chốt, điều còn mở và việc tiếp theo.",
      "Bạn đọc và sửa bản tóm tắt trước khi mang sang cuộc mới.",
      "Kiểm bằng một câu hỏi về điều đã chốt ngay ở cuộc mới.",
    ],
    practicePrompt: {
      question:
        "Anh Bình trò chuyện 4 giờ để soạn kế hoạch quý; công cụ bắt đầu đưa số liệu đã sửa từ sáng. Bước hợp lý nhất?",
      options: [
        "Nhờ tóm tắt điều đã chốt, sửa lại bản đó, mở cuộc mới và dán vào",
        "Tiếp tục hỏi thêm vì cuộc trò chuyện dài chứng tỏ công cụ hiểu mình",
        "Xoá sạch cuộc trò chuyện rồi gõ lại từ trí nhớ",
        "Yêu cầu công cụ nhớ kỹ hơn bằng cách viết chữ in hoa",
      ],
      correct: 0,
      explanation:
        "Tóm tắt, sửa và chuyển sang cuộc mới giữ lại công sức mà bỏ được sự lẫn lộn. Cuộc trò chuyện dài không chứng tỏ công cụ hiểu mình hơn. Xoá và gõ lại từ trí nhớ dễ sót. Chữ in hoa không làm công cụ nhớ tốt hơn.",
    },
    summary: {
      keyIdea: "Cuộc trò chuyện càng dài càng dễ lẫn: chốt lại bằng một bản tóm tắt rồi mở cuộc mới.",
      formula: "Nhận dấu hiệu → tóm tắt → bạn sửa → cuộc mới + tóm tắt → kiểm một điều đã chốt.",
      commonMistake: "Tin bản tóm tắt của AI mà không đọc lại, mang luôn số cũ sang cuộc mới.",
      action: "Lần tới cuộc trò chuyện của bạn dài hơn nửa buổi, thử làm đủ năm bước trên.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một cuộc trò chuyện dài về công việc của bạn (nếu chưa có, hãy dùng một việc thật như kế hoạch tuần). Nhờ AI tóm tắt điều đã chốt, điều còn mở, việc tiếp theo. Sửa bản đó, mở cuộc mới, dán vào và hỏi lại một điều đã chốt để kiểm.",
      secondary: "Ghi lại có bao nhiêu chỗ trong bản tóm tắt bạn phải sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, sau ba tiếng lên kế hoạch với AI, nó bỗng đề xuất lại phương án bạn đã bác từ sáng. Bài này dạy bạn nhận ra lúc đó và chuyển sang cuộc mới mà không mất công sức.",
      },
      {
        type: "feynman",
        title: "Cuộc trò chuyện dài đơn giản hơn bạn nghĩ",
        intro: "Hình dung một cuộc họp kéo dài cả ngày với người ghi biên bản. Đến chiều người đó bắt đầu lẫn: ghi lại điều đã bác, nhầm số. Cách chữa không phải bắt họ cố gắng hơn, mà là chốt biên bản rồi bắt đầu buổi mới.",
        columns: ["Thành phần", "Cuộc họp cả ngày", "Cuộc trò chuyện với AI"],
        rows: [
          ["Càng lâu", "Người ghi càng mệt và lẫn", "Càng dài, ý cũ càng dễ bị bỏ hoặc lu mờ"],
          ["Dấu hiệu", "Ghi lại điều đã bác", "Đề xuất lại phương án đã bác"],
          ["Cách chữa", "Chốt biên bản, họp buổi mới", "Tóm tắt, mở cuộc mới"],
          ["Ai kiểm", "Chủ trì đọc lại biên bản", "Bạn đọc và sửa bản tóm tắt"],
        ],
        oneLiner: "Đừng cố kéo dài một cuộc trò chuyện đã lẫn: chốt biên bản, rồi mở buổi mới.",
      },
      { type: "heading", text: "Dấu hiệu cuộc trò chuyện đã quá dài" },
      {
        type: "list",
        items: [
          "Công cụ lặp lại đúng ý nó đã nói.",
          "Nó đề xuất lại điều bạn đã bác hoặc quên điều bạn đã chốt.",
          "Con số cũ và con số đã sửa cùng xuất hiện.",
          "Câu trả lời chung chung hơn dù bạn hỏi rất cụ thể.",
        ],
      },
      {
        type: "paragraph",
        text: "Chỉ cần một hai dấu hiệu là đủ để dừng và chốt lại. Chờ tới lúc lộn xộn hẳn thì bản tóm tắt cũng bị lẫn theo.",
      },
      {
        type: "flow",
        title: "Từ cuộc dài sang cuộc mới",
        steps: [
          { label: "Nhận dấu hiệu", detail: "Bạn thấy công cụ lặp ý hoặc quên điều đã chốt, và dừng lại thay vì hỏi tiếp." },
          { label: "Nhờ tóm tắt", detail: "Yêu cầu nó liệt kê điều đã chốt, điều còn mở và việc tiếp theo, mỗi mục vài dòng." },
          { label: "Bạn đọc và sửa", detail: "Đối chiếu với trí nhớ và tài liệu của bạn: xoá số cũ, thêm điều nó bỏ sót." },
          { label: "Mở cuộc mới", detail: "Dán bản tóm tắt đã sửa và nói rõ bạn muốn làm tiếp việc gì." },
          { label: "Kiểm một điều", detail: "Hỏi lại một điều đã chốt để chắc công cụ hiểu đúng." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt sau ba tiếng lên kế hoạch",
        task: "Trong cuộc trò chuyện dài bạn đã chốt: hội thảo 20 người, tổ chức thứ Năm, ngân sách đã giảm từ 15 xuống 12 triệu (số minh hoạ), địa điểm chưa chốt. Bạn nhờ AI tóm tắt và nhận bản dưới đây. Bấm vào những đoạn bạn thấy sai.",
        segments: [
          { text: "Hội thảo dành cho 20 người." },
          { text: "Hội thảo diễn ra vào thứ Năm." },
          {
            text: "Ngân sách là 15 triệu đồng.",
            error: "Ngân sách đã được giảm xuống 12 triệu; AI lấy lại số cũ ở đầu cuộc - dấu hiệu bị lẫn.",
          },
          {
            text: "Địa điểm đã chốt tại một khách sạn trung tâm.",
            error: "Địa điểm chưa hề được chốt; AI tự thêm để bản tóm tắt nghe trọn vẹn.",
          },
          { text: "Việc tiếp theo: chọn địa điểm và báo lại." },
        ],
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Bản tóm tắt là do bạn duyệt. Nếu bạn không đọc lại, một con số cũ sẽ đi theo bạn qua cuộc mới và sai tiếp ở đó.",
      },
      {
        type: "scenario",
        title: "Hai giờ chiều, công cụ bắt đầu lẫn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã trò chuyện gần ba tiếng để soạn kế hoạch tuần tới. Công cụ vừa đưa ra một mốc ngày mà bạn đã đổi từ sáng. Bạn làm gì?",
            choices: [
              { label: "Sửa nhanh câu đó và hỏi tiếp, vì mới lẫn một chỗ", next: "bad_keep" },
              { label: "Nhờ tóm tắt điều đã chốt, sửa rồi mở cuộc mới", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Đến cuối buổi, kế hoạch có hai mốc ngày trái nhau và một hạng mục bị quên. Bạn phải đọc lại cả cuộc trò chuyện dài để tìm lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Bản tóm tắt liệt kê 6 điều đã chốt. Bạn thấy điều thứ 4 nhắc mốc ngày cũ.",
            choices: [
              { label: "Dán nguyên bản tóm tắt sang cuộc mới vì trông đã gọn", next: "bad_paste" },
              { label: "Sửa mốc ngày, thêm một hạng mục nó bỏ sót, rồi dán sang", next: "good" },
            ],
          },
          bad_paste: {
            text: "Cuộc mới bắt đầu với mốc ngày cũ, và công cụ lập kế hoạch dựa trên đó. Bạn chỉ phát hiện khi sếp hỏi vì sao lịch lệch.",
            ending: "bad",
          },
          good: {
            text: "Cuộc mới bắt đầu với thông tin đúng. Bạn hỏi lại mốc ngày, công cụ trả lời đúng, và kế hoạch hoàn thành trong 20 phút.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Thấy lẫn thì chốt lại: tóm tắt, tự sửa, rồi mở cuộc mới.",
          "Bài sau: công cụ nhớ gì về bạn giữa các cuộc trò chuyện.",
        ],
      },
    ],
  },
  {
    id: 2247,
    slug: "bo-nho-cua-cong-cu-nho-gi-ve-ban",
    title: "Chặng 42, Bài 8: Bộ nhớ của công cụ: nó nhớ gì về bạn",
    subtitle: "Như một cuốn sổ tay của người phục vụ quen: bạn có quyền xem và xoá dòng nào không muốn ghi.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧠",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn bất ngờ khi công cụ nhắc lại một chuyện cũ mà bạn quên đã kể. Biết công cụ có thể lưu điều gì, xem và xoá ở đâu, và điều gì không nên đưa vào ngay từ đầu giúp bạn giữ quyền kiểm soát thông tin của mình.",
    openingQuestion:
      "Bạn nhờ AI soạn thư xin nghỉ, và nó nhắc tới chuyện gia đình bạn kể cách đây vài tuần mà bạn không nhớ đã kể. Điều gì hợp lý nhất bạn nên làm?",
    openingOptions: [
      "Kiểm trong công cụ của mình xem nó đang lưu gì, xoá điều nhạy cảm và cân nhắc điều đưa vào",
      "Coi như chuyện nhỏ, vì công cụ nhớ gì cũng vô hại",
      "Xoá tài khoản ngay, vì chắc chắn mọi công cụ đều nghe lén",
      "Nhắn cho AI yêu cầu quên, rồi tin là nó đã quên hoàn toàn",
    ],
    correctOption: 0,
    explanation:
      "Một số công cụ có tính năng bộ nhớ, lưu lại vài thông tin về bạn giữa các cuộc trò chuyện. Nếu công cụ của bạn có, bạn nên xem nó đang lưu gì, xoá thứ nhạy cảm và tự quyết điều nên kể. Coi mọi thứ vô hại là chủ quan, xoá tài khoản vì cho rằng công cụ nghe lén là kết luận không có căn cứ, còn bảo AI quên trong khung chat chưa chắc xoá gì trong phần lưu trữ.",
    diagram: [
      { label: "Bạn kể điều gì đó trong một cuộc trò chuyện", arrow: true },
      { label: "Công cụ có thể lưu thành ghi nhớ (tuỳ công cụ)", arrow: true },
      { label: "Cuộc trò chuyện sau có thể dùng lại ghi nhớ đó", arrow: true },
      { label: "Bạn xem, sửa, xoá ghi nhớ và chọn điều để kể" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên nhân sự dùng công cụ AI cá nhân",
      description:
        "Một nhân viên nhân sự nhờ AI soạn thư và vô tình kể mức lương mục tiêu của mình khi bàn chuyện đổi việc. Vài tuần sau công cụ nhắc lại chi tiết đó trong một cuộc trò chuyện khác. Chị vào phần quản lý bộ nhớ của công cụ đang dùng để xem, xoá dòng đó và từ đó chỉ kể điều thật cần. Đây là tình huống minh hoạ, không nói về công cụ cụ thể nào.",
    },
    quiz: [
      {
        question: "Bộ nhớ của công cụ AI, nếu có, thường là gì?",
        options: [
          "Vài điều về bạn được lưu để dùng lại ở các cuộc trò chuyện sau",
          "Bản sao mọi cuộc trò chuyện của mọi người dùng trên toàn hệ thống",
          "Bộ nhớ RAM của máy tính bạn đang dùng",
          "Danh sách các câu hỏi bạn không được phép hỏi",
        ],
        correct: 0,
        explanation:
          "Bộ nhớ ở đây là các ghi nhớ về bạn (sở thích, cách trình bày) mà một số công cụ giữ giữa các cuộc trò chuyện. Nó không phải bản sao dữ liệu của mọi người, không phải RAM của máy, và không phải danh sách câu cấm.",
      },
      {
        question: "Muốn biết công cụ của mình đang nhớ điều gì về mình, cách đáng tin nhất?",
        options: [
          "Xem phần quản lý ghi nhớ trong chính công cụ",
          "Hỏi thẳng trong khung chat rồi tin toàn bộ câu trả lời nhận được",
          "Đoán qua giọng văn của câu trả lời, vì giọng văn phản ánh điều đã lưu",
          "Hỏi bạn bè xem công cụ của họ nhớ gì rồi suy ra công cụ của mình",
        ],
        correct: 0,
        explanation:
          "Xem chính phần quản lý của công cụ cho biết cái đã được lưu. Hỏi trong khung chat chỉ cho câu trả lời do công cụ sinh ra, có thể thiếu hoặc bịa. Đoán qua giọng văn không có căn cứ, và công cụ của bạn bè lưu điều của họ chứ không phải của bạn.",
      },
      {
        question: "Điều nào KHÔNG nên kể cho công cụ AI ngay từ đầu?",
        options: [
          "Số căn cước, mật khẩu, tình trạng sức khoẻ và chuyện riêng của người khác",
          "Bạn làm nghề gì và thích câu trả lời ngắn",
          "Ngành bạn làm và các khái niệm chung bạn hay dùng",
          "Giọng văn bạn muốn khi viết email công việc",
        ],
        correct: 0,
        explanation:
          "Thông tin định danh, mật khẩu, sức khoẻ và chuyện riêng của người khác không nên đưa vào vì một khi đã kể, bạn khó biết nó được giữ ở đâu. Nghề nghiệp, ngành và giọng văn là thông tin thấp rủi ro và giúp câu trả lời đúng ý.",
      },
      {
        question: "Bạn nhờ công cụ xoá một điều nó đã ghi nhớ. Làm sao chắc chắn hơn?",
        options: [
          "Xoá ở phần quản lý ghi nhớ và kiểm lại danh sách",
          "Nhắn nó quên rồi coi như xong",
          "Chờ vài hôm, vì ghi nhớ thường tự biến mất sau một thời gian",
          "Đăng xuất rồi đăng nhập lại",
        ],
        correct: 0,
        explanation:
          "Xoá đúng chỗ rồi kiểm lại danh sách là cách có bằng chứng. Nhắn nó quên chỉ là một câu nói trong khung chat. Chờ vài hôm không đảm bảo gì. Đăng xuất rồi đăng nhập lại không xoá dữ liệu đã lưu.",
      },
      {
        question: "Dùng công cụ AI của công ty, việc đầu tiên cần làm về bộ nhớ và dữ liệu?",
        options: [
          "Hỏi bộ phận CNTT quy định của công ty về việc lưu và dùng dữ liệu",
          "Cứ dùng như tài khoản cá nhân, vì công cụ giống nhau",
          "Kể thật nhiều về công việc để công cụ hiểu mình hơn",
          "Chờ tới khi có sự cố rồi mới hỏi",
        ],
        correct: 0,
        explanation:
          "Quy định về lưu và dùng dữ liệu của công ty khác với tài khoản cá nhân, và chỉ bộ phận CNTT hoặc pháp chế trả lời chắc. Công cụ giống nhau về tên không có nghĩa cùng chính sách. Kể thật nhiều làm tăng rủi ro. Hỏi sau sự cố là quá muộn.",
      },
    ],
    keyTakeaways: [
      "Một số công cụ có bộ nhớ: lưu vài điều về bạn giữa các cuộc trò chuyện (tuỳ công cụ).",
      "Xem và xoá ghi nhớ ở chính phần quản lý của công cụ, không tin lời nói trong khung chat.",
      "Không kể thông tin nhạy cảm hoặc chuyện riêng của người khác ngay từ đầu.",
      "Công cụ công ty có quy định riêng: hỏi bộ phận CNTT hoặc pháp chế.",
    ],
    practicePrompt: {
      question:
        "Chị Mai thấy công cụ nhắc lại nơi làm cũ của mình khi soạn CV. Chị muốn giữ quyền kiểm soát. Cách hợp lý nhất?",
      options: [
        "Xem phần ghi nhớ trong công cụ, giữ điều hữu ích, xoá điều không muốn lưu",
        "Yêu cầu công cụ không bao giờ nhắc lại nữa rồi yên tâm",
        "Ngừng dùng mọi công cụ AI vì chắc chắn không an toàn",
        "Kể thêm thông tin để công cụ nhớ đúng hơn",
      ],
      correct: 0,
      explanation:
        "Xem và chọn lọc trong phần quản lý cho bạn quyền quyết định thật. Chỉ dặn miệng không đảm bảo. Ngừng dùng hoàn toàn bỏ phí lợi ích khi rủi ro quản lý được. Kể thêm chỉ làm lượng thông tin lưu nhiều hơn.",
    },
    summary: {
      keyIdea: "Bộ nhớ như cuốn sổ tay của người phục vụ quen: bạn có quyền xem và xoá dòng nào không muốn ghi.",
      formula: "Kể ít điều nhạy cảm → xem ghi nhớ trong công cụ → giữ điều hữu ích → xoá điều còn lại.",
      commonMistake: "Bảo AI quên trong khung chat rồi tin rằng nó đã xoá.",
      action: "Tìm xem công cụ bạn dùng có phần quản lý ghi nhớ không, và đọc từng dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở công cụ AI bạn dùng nhiều nhất và tìm phần quản lý ghi nhớ hoặc dữ liệu cá nhân (nếu có). Liệt kê 3 điều nó đang lưu về bạn, đánh dấu điều nào giữ, điều nào xoá. Nếu công cụ không có phần này, ghi lại một điều bạn quyết định không kể cho nó nữa.",
      secondary: "Nếu là công cụ công ty, nhắn hỏi bộ phận CNTT về quy định lưu dữ liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI soạn thư và nó nhắc tới một chuyện bạn quên đã kể vài tuần trước. Bài này giúp bạn hiểu công cụ có thể nhớ gì, và cách bạn giữ quyền kiểm soát.",
      },
      {
        type: "feynman",
        title: "Bộ nhớ đơn giản hơn bạn nghĩ",
        intro: "Hình dung một người phục vụ quen ở quán cà phê có cuốn sổ tay nhỏ, ghi lại khách thích uống gì. Lần sau họ pha đúng ý mà khách không phải nói lại.",
        columns: ["Thành phần", "Cuốn sổ của người phục vụ", "Bộ nhớ của công cụ"],
        rows: [
          ["Ghi lại", "Vài điều về khách quen", "Vài điều về bạn (nếu công cụ có tính năng này)"],
          ["Lợi ích", "Khách khỏi nói lại mỗi lần", "Bạn khỏi giới thiệu lại mình"],
          ["Rủi ro", "Ghi nhầm hoặc ghi điều không nên", "Lưu điều nhạy cảm hoặc điều đã lỗi thời"],
          ["Quyền của bạn", "Xin xem sổ, gạch dòng không muốn", "Xem, sửa, xoá ghi nhớ"],
        ],
        oneLiner: "Bộ nhớ là cuốn sổ tay về bạn: tiện khi ghi đúng, và bạn luôn có quyền xin xem rồi gạch dòng.",
      },
      { type: "heading", text: "Hai loại nhớ hay bị lẫn" },
      {
        type: "paragraph",
        text: "Loại thứ nhất là nhớ trong một cuộc trò chuyện: công cụ nhìn lại những gì đã nói ở cuộc đó (bài 6 và 7). Loại thứ hai là ghi nhớ giữa các cuộc: một số công cụ lưu vài điều về bạn để dùng lần sau. Không phải công cụ nào cũng có loại thứ hai, và cách hoạt động khác nhau, nên bài này không nêu tên nút nào: hãy tìm trong chính công cụ của bạn.",
      },
      {
        type: "flow",
        title: "Một điều bạn kể có thể đi đâu",
        steps: [
          { label: "Bạn kể trong cuộc trò chuyện", detail: "Ví dụ bạn nói bạn làm kế toán và thích câu trả lời ngắn." },
          { label: "Công cụ có thể ghi nhớ", detail: "Tuỳ công cụ và cài đặt, một vài điều được lưu thành ghi nhớ về bạn." },
          { label: "Lần sau nó dùng lại", detail: "Ở cuộc trò chuyện khác, câu trả lời có thể phản ánh điều đã lưu mà bạn không nhắc lại." },
          { label: "Bạn xem và quyết định", detail: "Bạn xem danh sách ghi nhớ trong công cụ, giữ điều hữu ích, xoá điều không muốn lưu." },
        ],
      },
      {
        type: "list",
        items: [
          "Nên để nó nhớ: nghề nghiệp chung, giọng văn bạn thích, độ dài câu trả lời.",
          "Nên cân nhắc kỹ: tên công ty, tên khách hàng, dự án đang làm.",
          "Không nên kể: số căn cước, mật khẩu, tình trạng sức khoẻ, chuyện riêng của người khác.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kể ít, nhớ ít",
          text: "Ít rủi ro rò rỉ và ít chuyện bất ngờ. Bạn phải giới thiệu lại mình mỗi lần, nhưng có thể dán sẵn vài dòng giới thiệu (bài sau).",
        },
        right: {
          label: "Kể nhiều, nhớ nhiều",
          text: "Câu trả lời sát ý hơn ngay từ đầu. Rủi ro lưu điều nhạy cảm, lưu điều đã cũ và bạn quên mình đã kể gì.",
        },
      },
      {
        type: "callout",
        label: "Cần kiểm tra",
        text: "Cách công cụ lưu, xoá và dùng dữ liệu do nhà cung cấp quy định và có thể đổi. Bài này chưa đối chiếu tài liệu chính thức của từng công cụ, nên hãy đọc chính sách hiện tại của công cụ bạn dùng, và với công cụ công ty thì hỏi bộ phận CNTT hoặc pháp chế.",
      },
      {
        type: "scenario",
        title: "Công cụ nhắc chuyện cũ mà bạn quên đã kể",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ AI soạn email xin nghỉ, và nó viết: như bạn từng nói, gia đình đang có việc cần bạn. Bạn không nhớ đã kể điều đó.",
            choices: [
              { label: "Gửi email luôn, vì nó viết đúng ý", next: "bad_send" },
              { label: "Dừng lại, xem trong công cụ nó đang lưu gì về bạn", next: "s2" },
            ],
          },
          bad_send: {
            text: "Email gửi cho sếp có chi tiết riêng tư mà bạn chưa định chia sẻ. Bạn mất một buổi giải thích và thấy không thoải mái.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm thấy danh sách ghi nhớ, trong đó có chi tiết về gia đình và cả chuyện bạn đang tìm việc mới.",
            choices: [
              { label: "Xoá hết mọi thứ cho nhanh, kể cả nghề nghiệp và giọng văn thích", next: "bad_all" },
              { label: "Xoá chi tiết riêng tư, giữ nghề nghiệp và giọng văn, rồi kiểm lại danh sách", next: "good" },
            ],
          },
          bad_all: {
            text: "An toàn hơn, nhưng lần sau bạn phải giới thiệu lại mình từ đầu, và bạn không rút ra được cách kể ít mà vẫn sát ý.",
            ending: "bad",
          },
          good: {
            text: "Danh sách chỉ còn nghề nghiệp và giọng văn. Lần sau công cụ vẫn trả lời sát ý, còn chuyện riêng thì bạn tự quyết định khi nào nên kể.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Xem sổ tay của công cụ, giữ điều hữu ích, gạch điều không muốn.",
          "Bài sau: tự viết vài dòng giới thiệu về bạn để câu trả lời đúng giọng.",
        ],
      },
    ],
  },
  {
    id: 2248,
    slug: "ghi-chu-ve-ban-de-tra-loi-dung-giong",
    title: "Chặng 42, Bài 9: Viết vài dòng giới thiệu về bạn để câu trả lời đúng giọng",
    subtitle: "Lần nào cũng phải nói lại mình làm nghề gì thì thật mệt: năm dòng ngắn là đủ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi lần mở công cụ mới bạn lại phải giải thích nghề của mình và giọng văn bạn thích. Năm dòng giới thiệu soạn sẵn tiết kiệm phần lặp đó, và khi viết đúng - không có thông tin nhạy cảm - còn giữ được an toàn.",
    openingQuestion:
      "Bạn định soạn vài dòng giới thiệu để dán vào đầu mỗi cuộc trò chuyện. Nội dung nào hợp lý nhất để đưa vào?",
    openingOptions: [
      "Nghề, việc hằng ngày, giọng văn bạn thích và độ dài câu trả lời mong muốn",
      "Họ tên đầy đủ, số căn cước và địa chỉ nhà để công cụ nhận ra bạn",
      "Mọi việc bạn từng làm ở các công ty cũ, càng chi tiết càng tốt",
      "Mật khẩu email công việc để công cụ tự gửi thư thay bạn",
    ],
    correctOption: 0,
    explanation:
      "Thông tin đủ để công cụ trả lời đúng giọng là nghề, việc hằng ngày, giọng văn và độ dài mong muốn: ngắn, hữu ích và không nhạy cảm. Họ tên đầy đủ kèm số căn cước và địa chỉ nhà là thông tin định danh không cần thiết. Kể mọi thứ ở công ty cũ làm đoạn giới thiệu quá dài và có thể lộ thông tin nội bộ. Mật khẩu thì tuyệt đối không đưa vào bất kỳ công cụ nào.",
    diagram: [
      { label: "Chọn 5 điều đủ để trả lời đúng giọng", arrow: true },
      { label: "Bỏ mọi thông tin nhạy cảm", arrow: true },
      { label: "Dán hoặc lưu ở chỗ công cụ cho phép", arrow: true },
      { label: "Thử với một việc thật và điều chỉnh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên chăm sóc khách hàng",
      description:
        "Một nhân viên chăm sóc khách hàng mỗi lần nhờ AI viết thư đều phải gõ lại: mình làm ở phòng CSKH, khách thường là cá nhân, cần giọng lịch sự ngắn gọn. Chị soạn năm dòng giới thiệu, dán vào đầu mỗi cuộc trò chuyện, và số lần phải sửa giọng văn giảm rõ rệt. Đây là tình huống minh hoạ, không có số liệu thật.",
    },
    quiz: [
      {
        question: "Mục đích chính của vài dòng giới thiệu về bạn khi dùng AI là gì?",
        options: [
          "Cho câu trả lời đúng nghề, đúng giọng, khỏi nói lại",
          "Để công cụ nhớ tên bạn và tự động đăng nhập giúp mỗi lần mở",
          "Để công cụ trả lời nhanh hơn nhờ phải đọc ít chữ hơn nhiều",
          "Để chứng minh với công cụ rằng bạn là người thật, không phải máy",
        ],
        correct: 0,
        explanation:
          "Mục đích là tiết kiệm phần giải thích lặp lại và cho câu trả lời sát ý. Nó không giúp đăng nhập, không làm công cụ chạy nhanh hơn một cách đáng kể, và không dùng để chứng minh bạn là người thật.",
      },
      {
        question: "Đoạn nào phù hợp nhất để đưa vào phần giới thiệu?",
        options: [
          "Tôi làm kế toán, cần câu trả lời ngắn, dùng văn phong lịch sự",
          "Tôi làm ở công ty X, lương 30 triệu, số căn cước là 0123",
          "Tôi ghét sếp cũ và muốn công cụ hiểu chuyện đó",
          "Tôi là người rất quan trọng nên hãy trả lời thật hay",
        ],
        correct: 0,
        explanation:
          "Nghề, độ dài và giọng văn là đủ và không nhạy cảm. Lương và số căn cước là thông tin nhạy cảm. Than phiền về sếp cũ không giúp công việc và có thể để lại điều bạn không muốn lưu. Lời tự khen không cho công cụ thông tin gì để trả lời tốt hơn.",
      },
      {
        question: "Vì sao nên giữ phần giới thiệu ngắn, khoảng 5 dòng?",
        options: [
          "Ngắn thì dễ đọc lại, dễ cập nhật và ít lộ thông tin thừa",
          "Vì công cụ chỉ đọc được đúng 5 dòng đầu, phần sau bị bỏ qua hoàn toàn",
          "Vì nhiều dòng hơn sẽ bị tính thêm phí",
          "Vì càng ngắn công cụ càng nghe lời",
        ],
        correct: 0,
        explanation:
          "Ngắn giúp bạn đọc lại và sửa nhanh, đồng thời hạn chế lộ thông tin không cần. Công cụ không bị giới hạn đúng 5 dòng. Chuyện phí phụ thuộc gói và không liên quan độ dài này. Ngắn không làm công cụ nghe lời hơn.",
      },
      {
        question: "Phần giới thiệu của bạn đã lỗi thời (bạn chuyển việc). Nên làm gì?",
        options: [
          "Sửa lại cho đúng, và xoá bản cũ nếu có chỗ lưu",
          "Để nguyên, vì công cụ sẽ tự đoán bạn đã đổi việc",
          "Thêm một đoạn mới ở dưới, giữ cả bản cũ",
          "Không dùng phần giới thiệu nữa, vĩnh viễn",
        ],
        correct: 0,
        explanation:
          "Bản giới thiệu cần khớp với công việc hiện tại; sửa và xoá bản cũ tránh mâu thuẫn. Công cụ không tự đoán bạn đã đổi việc. Giữ cả bản cũ khiến hai thông tin trái nhau cùng tồn tại. Bỏ hẳn là mất lợi ích chỉ vì một lần lỗi thời.",
      },
      {
        question: "Bạn nên kiểm xem phần giới thiệu có hiệu quả bằng cách nào?",
        options: [
          "Bản tóm tắt gọn giữ điều đã chốt, tránh lẫn ý cũ của cuộc dài",
          "Vì công cụ tự động xoá cuộc trò chuyện sau đúng một ngày, nên phải tóm tắt",
          "Vì cuộc trò chuyện dài luôn bị công cụ từ chối",
          "Vì tóm tắt giúp công cụ trả lời nhanh gấp đôi",
        ],
        correct: 0,
        explanation:
          "Thử với việc thật là phép kiểm rõ ràng nhất. Hỏi công cụ thích bản nào là hỏi một thứ nó không có sở thích thật. Con số 100 chữ là ngưỡng bịa, vì tốt hay không tuỳ nội dung. Chờ công cụ tự sửa là không thể.",
      },
      {
        question: "Bạn muốn công cụ luôn trả lời ngắn. Cách nào vừa hiệu quả vừa an toàn?",
        options: [
          "Ghi một dòng về độ dài mong muốn vào phần giới thiệu",
          "Kể thêm thật nhiều chuyện riêng để nó hiểu tính cách của bạn",
          "Viết in hoa NHỚ MÃI MÃI ở đầu mỗi tin nhắn gửi cho công cụ",
          "Chờ vài tuần cho công cụ tự đoán ra thói quen",
        ],
        correct: 0,
        explanation:
          "Một dòng nêu độ dài mong muốn là chỉ dẫn rõ ràng và không nhạy cảm. Kể chuyện riêng thêm rủi ro mà không nói được điều bạn cần. Chữ in hoa không làm công cụ nhớ tốt hơn. Chờ công cụ tự đoán thì không chắc, và bạn vẫn phải sửa mỗi bản nháp.",
      },
    ],
    keyTakeaways: [
      "Năm dòng giới thiệu: nghề, việc hằng ngày, giọng văn, độ dài, điều cần tránh.",
      "Không đưa thông tin nhạy cảm: định danh, mật khẩu, lương, chuyện riêng của người khác.",
      "Thử với một việc thật rồi chỉnh.",
      "Cập nhật khi công việc đổi, xoá bản cũ.",
    ],
    practicePrompt: {
      question:
        "Anh Nam là trưởng nhóm bán hàng, muốn công cụ luôn trả lời ngắn và lịch sự. Bản giới thiệu nào phù hợp nhất?",
      options: [
        "Tôi làm trưởng nhóm bán hàng, viết email cho khách doanh nghiệp, cần giọng lịch sự và ngắn",
        "Tôi là Nam, số điện thoại 09xx, lương tháng 40 triệu, hãy nhớ kỹ tôi",
        "Hãy trả lời như một chuyên gia hàng đầu thế giới",
        "Tôi làm nhiều việc, hãy luôn trả lời thật dài và chi tiết",
      ],
      correct: 0,
      explanation:
        "Bản đúng nêu nghề, đối tượng và giọng văn, không có thông tin nhạy cảm. Số điện thoại và lương là dữ liệu cá nhân không cần đưa. Câu chuyên gia hàng đầu không cho thông tin gì. Yêu cầu luôn dài lại trái với mong muốn trả lời ngắn.",
    },
    summary: {
      keyIdea: "Năm dòng giới thiệu đúng chỗ đỡ cho bạn nói đi nói lại, và không phải kể thứ gì nhạy cảm.",
      formula: "Nghề + việc hằng ngày + giọng văn + độ dài + điều cần tránh, và không có gì nhạy cảm.",
      commonMistake: "Nhồi vào phần giới thiệu cả thông tin cá nhân với hy vọng công cụ hiểu mình hơn.",
      action: "Soạn 5 dòng giới thiệu, thử với một việc thật hôm nay.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết 5 dòng giới thiệu về công việc của bạn: nghề, việc hằng ngày, đối tượng bạn viết cho, giọng văn, độ dài câu trả lời mong muốn. Đọc lại và gạch mọi thứ nhạy cảm. Dán vào đầu một cuộc trò chuyện mới và nhờ viết một email thật; ghi lại 2 chỗ cần chỉnh.",
      secondary: "Lưu 5 dòng đó vào ghi chú của bạn để lần sau dán lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nào bạn cũng mở công cụ và gõ lại: tôi làm kế toán, hãy trả lời ngắn thôi. Bài này dạy bạn soạn năm dòng để khỏi lặp lại điều đó, và giữ được an toàn.",
      },
      {
        type: "feynman",
        title: "Vài dòng giới thiệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn gọi một người thợ đến sửa nhà lần đầu. Nếu bạn đưa một tờ giấy ghi ba điều cần biết, họ làm đúng ngay; nếu không, họ hỏi từng câu một.",
        columns: ["Thành phần", "Tờ giấy đưa thợ", "Vài dòng giới thiệu cho AI"],
        rows: [
          ["Nội dung", "Việc cần làm, chỗ cần sửa, điều cần tránh", "Nghề, việc, giọng văn, độ dài, điều cần tránh"],
          ["Độ dài", "Đủ một tờ nhỏ", "Khoảng năm dòng"],
          ["Không ghi", "Mật khẩu két sắt", "Số căn cước, mật khẩu, chuyện riêng của người khác"],
          ["Sau đó", "Thợ làm, bạn kiểm", "Công cụ trả lời, bạn kiểm và chỉnh"],
        ],
        oneLiner: "Vài dòng giới thiệu là tờ giấy ba điều đưa thợ: ngắn, đủ để làm đúng, và không có gì bạn không muốn thợ biết.",
      },
      { type: "heading", text: "Năm dòng gồm những gì" },
      {
        type: "list",
        items: [
          "Dòng 1 - Nghề và việc hằng ngày, ví dụ kế toán, làm báo cáo và trả lời email.",
          "Dòng 2 - Bạn viết cho ai, ví dụ khách hàng doanh nghiệp hoặc đồng nghiệp.",
          "Dòng 3 - Giọng văn bạn thích: lịch sự, thân thiện, trang trọng.",
          "Dòng 4 - Độ dài mong muốn: ngắn, dưới 120 chữ, có gạch đầu dòng.",
          "Dòng 5 - Điều cần tránh, ví dụ không hứa điều công ty chưa cho phép.",
        ],
      },
      {
        type: "paragraph",
        text: "Đừng đưa thông tin nhạy cảm vào: số căn cước, mật khẩu, lương, tên khách hàng thật khi chưa được phép. Công cụ có thể lưu điều bạn kể (bài 8), và bạn nên coi bản giới thiệu như một tờ giấy ai cũng có thể đọc.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn phần giới thiệu để công cụ viết email đúng giọng",
        task: "Bạn làm chăm sóc khách hàng và muốn công cụ viết thư trả lời khiếu nại đúng giọng. Lắp phần giới thiệu từ ba mảnh dưới đây rồi xem câu trả lời.",
        parts: [
          {
            id: "role",
            label: "Nghề và việc",
            options: [
              { text: "Tôi làm việc văn phòng.", feedback: "Quá chung: công cụ không biết bạn viết cho ai nên viết thư kiểu chung chung." },
              { text: "Tôi làm chăm sóc khách hàng, trả lời khiếu nại của khách cá nhân qua email.", good: true, feedback: "Nói rõ nghề và đối tượng nên thư đúng bối cảnh." },
            ],
          },
          {
            id: "tone",
            label: "Giọng và độ dài",
            options: [
              { text: "Hãy viết thật hay và chuyên nghiệp.", feedback: "Hay và chuyên nghiệp không đo được, công cụ viết dài và văn hoa." },
              { text: "Giọng lịch sự, ấm áp, dưới 100 chữ, xưng chúng tôi - Quý khách.", good: true, feedback: "Giọng, độ dài và cách xưng hô rõ nên bản nháp dùng gần như ngay." },
            ],
          },
          {
            id: "safe",
            label: "Điều cần tránh",
            options: [
              { text: "Tôi tên Lan, số điện thoại 09xx, lương tháng 20 triệu, nhớ giúp tôi.", feedback: "Đưa thông tin cá nhân nhạy cảm không cần thiết, và khó biết nó được lưu ở đâu." },
              { text: "Không hứa hoàn tiền hay thời hạn; chỗ chưa chắc thì viết cần kiểm tra thêm.", good: true, feedback: "Ghi điều cần tránh giúp công cụ không tự bịa cam kết công ty chưa hứa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["role", "tone", "safe"],
            text: "Kính gửi Quý khách,\n\nChúng tôi rất tiếc vì sự bất tiện Quý khách gặp phải và xin ghi nhận phản hồi này. Bộ phận chăm sóc khách hàng sẽ kiểm tra đơn hàng và phản hồi thời hạn xử lý sau khi xác minh.\n\nTrân trọng.\n\n(Đúng giọng, ngắn, không hứa điều chưa chắc.)",
          },
          {
            requires: ["role", "tone"],
            text: "Kính gửi Quý khách,\n\nChúng tôi xin lỗi về sự cố. Chúng tôi cam kết hoàn tiền trong 3 ngày làm việc.\n\n(Giọng đúng nhưng công cụ tự thêm cam kết hoàn tiền 3 ngày mà công ty chưa hề hứa.)",
          },
          {
            text: "Kính gửi bạn thân mến,\n\nChúng tôi vô cùng xin lỗi vì mọi điều! Chúng tôi sẽ tặng bạn ưu đãi 30% cho lần mua sau và luôn nỗ lực không ngừng để phục vụ bạn tốt hơn nữa...\n\n(Thiếu bối cảnh nên công cụ viết dài, văn hoa và tự bịa ưu đãi 30%.)",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ năm dòng giới thiệu tới câu trả lời đúng giọng",
        steps: [
          { label: "Chọn năm điều", detail: "Nghề, đối tượng, giọng văn, độ dài, điều cần tránh: chỉ những gì công cụ cần để làm đúng." },
          { label: "Gạch điều nhạy cảm", detail: "Đọc lại từng dòng và bỏ số căn cước, mật khẩu, lương, tên khách thật khi chưa được phép." },
          { label: "Dán vào đầu cuộc trò chuyện", detail: "Dán vào đầu cuộc trò chuyện, hoặc lưu ở nơi công cụ cho phép nếu có." },
          { label: "Thử một việc thật rồi chỉnh", detail: "Nhờ viết một email thật, xem giọng và độ dài đã đúng ý chưa, sửa dòng nào lệch." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giới thiệu vừa đủ",
          text: "Nghề, đối tượng, giọng, độ dài, điều cần tránh. Ít khi phải sửa giọng, và không có gì nhạy cảm để lo.",
        },
        right: {
          label: "Giới thiệu quá tay",
          text: "Đầy đủ họ tên, lương, chuyện riêng, hay dặn những điều mâu thuẫn. Công cụ vẫn có thể làm sai, và bạn thêm rủi ro dữ liệu.",
        },
      },
      {
        type: "callout",
        label: "Cần kiểm tra",
        text: "Nhiều công cụ có phần cài đặt để lưu sẵn thông tin giới thiệu, nhưng tên gọi và cách dùng thay đổi theo từng công cụ và từng thời điểm. Bài này chưa đối chiếu tài liệu chính thức nên không hướng dẫn nút bấm: hãy đọc trợ giúp của công cụ bạn dùng, hoặc đơn giản là dán năm dòng vào đầu cuộc trò chuyện.",
      },
      {
        type: "scenario",
        title: "Nên đưa gì vào phần giới thiệu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn soạn phần giới thiệu để dán vào công cụ AI công ty. Bạn muốn nó hiểu rõ khách hàng của mình.",
            choices: [
              { label: "Dán danh sách 20 khách hàng lớn kèm hợp đồng cho công cụ hiểu rõ", next: "bad_data" },
              { label: "Nêu loại khách hàng chung, ví dụ khách doanh nghiệp vừa và nhỏ", next: "s2" },
            ],
          },
          bad_data: {
            text: "Bạn vừa đưa dữ liệu khách hàng vào công cụ mà chưa hỏi quy định của công ty. Bộ phận CNTT sau đó yêu cầu bạn giải trình.",
            ending: "bad",
          },
          s2: {
            text: "Phần giới thiệu gọn, không nhạy cảm. Bạn thử nhờ viết một email và giọng văn hơi trang trọng hơn ý bạn.",
            choices: [
              { label: "Bỏ luôn phần giới thiệu vì thấy không hiệu quả", next: "bad_quit" },
              { label: "Sửa dòng giọng văn thành thân thiện, ngắn, rồi thử lại", next: "good" },
            ],
          },
          bad_quit: {
            text: "Bạn quay lại gõ lại nghề và giọng văn mỗi lần, và vẫn phải sửa giọng sau mỗi bản nháp.",
            ending: "bad",
          },
          good: {
            text: "Sau một lần chỉnh, bản nháp đầu tiên đã đúng giọng. Bạn lưu năm dòng để dùng lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm dòng đủ ý, không nhạy cảm, và thử bằng việc thật.",
          "Bài sau: giữ mạch một dự án nhỏ chạy suốt cả tuần.",
        ],
      },
    ],
  },
  {
    id: 2249,
    slug: "du-an-nho-bo-nho-va-cuoc-tro-chuyen-cua-tuan",
    title: "Chặng 42, Bài 10: Dự án nhỏ: một cuộc trò chuyện chạy xuyên cả tuần",
    subtitle: "Như một cuốn sổ giao ca: cuối ngày ghi lại, sáng mai đọc là làm tiếp.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều việc kéo dài cả tuần, như soạn kế hoạch hay báo cáo. Nếu mỗi ngày bạn bắt đầu lại từ đầu thì mất thời gian, còn nếu để một cuộc trò chuyện kéo dài thì dễ lẫn. Bản tóm tắt cuối ngày là cách giữ mạch nhẹ nhất.",
    openingQuestion:
      "Bạn làm một báo cáo suốt năm ngày với AI. Cách nào giữ mạch việc tốt nhất mà không để cuộc trò chuyện quá dài?",
    openingOptions: [
      "Cuối mỗi ngày nhờ tóm tắt, bạn sửa, rồi dán bản tóm tắt vào cuộc mới hôm sau",
      "Giữ một cuộc trò chuyện duy nhất cả tuần và tin rằng nó nhớ hết",
      "Mỗi sáng bắt đầu lại từ đầu, kể lại toàn bộ cho công cụ",
      "Dặn công cụ nhớ giúp và không lưu gì ở đâu khác",
    ],
    correctOption: 0,
    explanation:
      "Bản tóm tắt cuối ngày giữ điều đã chốt, gọn đủ để dán vào cuộc mới, và bạn kiểm được. Một cuộc trò chuyện duy nhất cả tuần dễ quá dài và lẫn ý cũ (bài 7). Bắt đầu lại từ đầu mỗi sáng mất thời gian và dễ sót ý. Chỉ dặn công cụ nhớ mà không tự lưu gì thì phụ thuộc vào một tính năng bạn chưa kiểm tra.",
    diagram: [
      { label: "Làm việc trong ngày với công cụ", arrow: true },
      { label: "Cuối ngày nhờ tóm tắt và bạn sửa", arrow: true },
      { label: "Lưu bản tóm tắt vào ghi chú của bạn", arrow: true },
      { label: "Sáng hôm sau mở cuộc mới, dán bản tóm tắt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: chuyên viên lập kế hoạch nội bộ",
      description:
        "Một chuyên viên soạn kế hoạch đào tạo trong năm ngày. Mỗi chiều chị nhờ AI tóm tắt điều đã chốt, sửa hai ba dòng, lưu vào ghi chú, sáng hôm sau dán vào cuộc mới. Thứ Sáu chị không phải đọc lại cả tuần trò chuyện để nộp bản cuối. Đây là tình huống minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      {
        question: "Vì sao nên tóm tắt cuối ngày thay vì giữ một cuộc trò chuyện suốt tuần?",
        options: [
          "Điều đã chốt, điều còn mở, việc tiếp theo và các con số chính",
          "Chép lại toàn bộ các câu hỏi bạn đã đặt trong ngày để không sót câu nào",
          "Chỉ tiêu đề của cuộc trò chuyện",
          "Các phương án bạn đã bác, ghi chi tiết đầy đủ",
        ],
        correct: 0,
        explanation:
          "Bản tóm tắt là phần cô đọng do bạn duyệt, mang được sang cuộc mới. Cuộc trò chuyện không bị tự xoá sau một ngày. Cuộc dài không bị từ chối mà chỉ dễ lẫn hơn. Tốc độ gấp đôi là con số bịa.",
      },
      {
        question: "Bản tóm tắt cuối ngày nên có những gì?",
        options: [
          "Trong ghi chú hoặc tệp của bạn, ngoài công cụ",
          "Chỉ trong lịch sử của cuộc trò chuyện cũ, vì công cụ lưu sẵn",
          "Chỉ trong đầu bạn vì hai ba ngày thì ai cũng nhớ được",
          "Gửi lại cho công cụ trong một tin nhắn để nó giữ giúp",
        ],
        correct: 0,
        explanation:
          "Đủ bốn mục đó là bạn có thể làm tiếp ngay. Chép lại toàn bộ câu hỏi thì dài và ít giá trị. Chỉ có tiêu đề thì không giữ được nội dung. Ghi chi tiết các phương án đã bác dễ khiến công cụ đề xuất lại chúng.",
      },
      {
        question: "Bản tóm tắt nên lưu ở đâu để chắc chắn không mất?",
        options: [
          "Nêu rõ việc hôm nay cần làm, rồi hỏi lại một điều đã chốt để kiểm",
          "Yêu cầu công cụ tự đoán việc hôm nay từ bản tóm tắt rồi làm theo luôn",
          "Xoá bản tóm tắt để công cụ bắt đầu sạch",
          "Dán thêm toàn bộ cuộc trò chuyện hôm qua",
        ],
        correct: 0,
        explanation:
          "Lưu ở chỗ của bạn thì bạn kiểm soát và dùng lại được với công cụ nào. Lịch sử cuộc cũ có thể khó tìm hoặc không còn. Trí nhớ cá nhân dễ sót sau vài ngày. Gửi cho công cụ giữ giúp là phụ thuộc vào tính năng chưa chắc có.",
      },
      {
        question: "Sáng hôm sau, sau khi dán bản tóm tắt, bước tiếp theo hợp lý?",
        options: [
          "Nêu rõ việc hôm nay cần làm, rồi hỏi lại một điều đã chốt để kiểm",
          "Yêu cầu công cụ tự đoán việc hôm nay",
          "Xoá bản tóm tắt để công cụ bắt đầu sạch",
          "Dán thêm toàn bộ cuộc trò chuyện hôm qua",
        ],
        correct: 0,
        explanation:
          "Nói rõ việc hôm nay và kiểm một điều đã chốt bảo đảm mạch việc đúng. Để công cụ tự đoán việc dễ đi lệch. Xoá bản tóm tắt là bỏ mất mạch. Dán toàn bộ hôm qua đưa lại vấn đề độ dài.",
      },
      {
        question: "Cuối tuần, cách đánh giá xem bản tóm tắt hàng ngày có giúp không?",
        options: [
          "Xem có ít phải kể lại và ít bị lẫn số cũ hơn so với những tuần trước không",
          "Đếm số bản tóm tắt: càng nhiều thì càng hiệu quả",
          "Hỏi công cụ xem nó có thấy mình làm việc tốt không",
          "Không cần đánh giá, cứ tin là tốt",
        ],
        correct: 0,
        explanation:
          "So với những tuần trước bằng việc thực: bạn phải kể lại bao nhiêu và số cũ có xuất hiện không. Đếm số bản tóm tắt chỉ đo số lần làm, không đo hiệu quả. Công cụ không đánh giá công việc giúp bạn một cách đáng tin. Không đánh giá là mất cơ hội cải thiện.",
      },
    ],
    keyTakeaways: [
      "Cuối mỗi ngày nhờ AI tóm tắt: điều đã chốt, điều còn mở, việc tiếp theo, con số chính.",
      "Bạn đọc và sửa bản tóm tắt trước khi lưu.",
      "Lưu ở ghi chú của bạn, mỗi sáng dán vào cuộc mới.",
      "Đánh giá cuối tuần bằng việc thật: ít lẫn hơn không.",
    ],
    practicePrompt: {
      question:
        "Chị Thu làm kế hoạch tuyển dụng trong 5 ngày. Đến chiều thứ Ba, công cụ trong cuộc trò chuyện chung bắt đầu quên điều đã chốt hôm thứ Hai. Cách xử lý phù hợp?",
      options: [
        "Nhờ tóm tắt, sửa, lưu vào ghi chú, rồi mở cuộc mới với bản đó",
        "Tiếp tục cuộc trò chuyện chung và nhắc lại từng điều bị quên, đỡ tốn công",
        "Xoá hết và làm lại kế hoạch từ đầu vào thứ Tư",
        "Tin rằng công cụ sẽ tự nhớ lại vào ngày hôm sau",
      ],
      correct: 0,
      explanation:
        "Tóm tắt, sửa, lưu và mở cuộc mới giữ được điều đã chốt và bỏ sự lẫn. Nhắc lại từng điều trong cuộc đã dài vẫn dễ sót. Xoá hết là bỏ công sức hai ngày. Công cụ không tự nhớ lại theo cách bạn mong.",
    },
    summary: {
      keyIdea: "Dự án cả tuần cần một cuốn sổ giao ca: tóm tắt cuối ngày, dán vào cuộc mới mỗi sáng.",
      formula: "Làm việc → tóm tắt cuối ngày → bạn sửa → lưu → dán vào cuộc mới hôm sau → kiểm một điều.",
      commonMistake: "Để một cuộc trò chuyện chạy cả tuần rồi tin nó nhớ hết.",
      action: "Chọn một việc kéo dài vài ngày và bắt đầu bản tóm tắt cuối ngày hôm nay.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn sẽ làm trong ít nhất 3 ngày tới. Cuối buổi hôm nay nhờ AI tóm tắt điều đã chốt, điều còn mở, việc tiếp theo. Sửa bản đó và lưu vào ghi chú của bạn. Sáng mai mở cuộc mới, dán bản tóm tắt, hỏi lại một điều đã chốt.",
      secondary: "Ghi lại xem mất bao nhiêu phút so với việc kể lại từ đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu bạn phải nộp một kế hoạch mà cả tuần chỉ làm được từng mảng nhỏ. Nếu mỗi sáng bạn kể lại từ đầu thì mất thời gian, còn để một cuộc trò chuyện chạy cả tuần thì dễ lẫn. Bài này thử cách thứ ba.",
      },
      {
        type: "feynman",
        title: "Cuộc trò chuyện cả tuần đơn giản hơn bạn nghĩ",
        intro: "Hình dung một xưởng làm việc theo ca: cuối ca, người làm ghi vào sổ giao ca điều đã xong và điều còn dở, ca sau đọc sổ là làm tiếp mà không cần hỏi lại.",
        columns: ["Thành phần", "Sổ giao ca", "Bản tóm tắt cuối ngày"],
        rows: [
          ["Ghi gì", "Việc đã xong, việc dở, lưu ý", "Điều đã chốt, điều còn mở, việc tiếp theo"],
          ["Ai đọc", "Ca sau", "Cuộc trò chuyện mới hôm sau"],
          ["Ai kiểm", "Trưởng ca duyệt sổ", "Bạn đọc và sửa trước khi lưu"],
          ["Lợi ích", "Không ai làm lại việc cũ", "Không phải kể lại, ít lẫn ý cũ"],
        ],
        oneLiner: "Bản tóm tắt cuối ngày là sổ giao ca: ngắn, có người duyệt, và ca sau đọc xong là làm được ngay.",
      },
      { type: "heading", text: "Vòng lặp mỗi ngày" },
      {
        type: "flow",
        title: "Một ngày trong dự án cả tuần",
        steps: [
          { label: "Sáng: dán bản tóm tắt hôm qua", detail: "Mở cuộc mới, dán bản tóm tắt đã lưu, nêu rõ việc hôm nay." },
          { label: "Trong ngày: làm việc bình thường", detail: "Hỏi, sửa, chốt từng phần. Nếu thấy công cụ lẫn thì tóm tắt sớm hơn." },
          { label: "Cuối ngày: nhờ tóm tắt", detail: "Yêu cầu liệt kê điều đã chốt, điều còn mở, việc tiếp theo và con số chính." },
          { label: "Bạn đọc, sửa, lưu", detail: "Đối chiếu với tài liệu của bạn, sửa chỗ sai rồi lưu vào ghi chú của chính bạn." },
        ],
      },
      {
        type: "paragraph",
        text: "Điểm mấu chốt: bản tóm tắt lưu ở nơi bạn kiểm soát, chứ không nằm trong ký ức của công cụ. Như vậy dù công cụ có bộ nhớ hay không, bạn vẫn giữ được mạch việc, và dùng được với công cụ khác nếu cần.",
      },
      {
        type: "list",
        items: [
          "Mỗi bản tóm tắt gọn, khoảng một trang là cùng.",
          "Ghi rõ con số chính và nguồn của chúng, để hôm sau kiểm được.",
          "Ghi điều còn mở để công cụ không tưởng là đã xong.",
          "Không ghi thông tin nhạy cảm vào bản tóm tắt.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một cuộc trò chuyện cả tuần",
          text: "Tiện lúc đầu. Sau vài ngày dễ lặp ý, lẫn số cũ, và bạn không biết công cụ còn giữ gì.",
        },
        right: {
          label: "Tóm tắt cuối ngày, cuộc mới mỗi sáng",
          text: "Mất vài phút mỗi chiều. Bạn giữ được điều đã chốt, ít lẫn, và bản tóm tắt là tài sản của bạn.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Hiệu quả thực tế tuỳ việc và tuỳ công cụ. Hãy tự đo: cuối tuần so xem bạn có phải kể lại ít hơn và ít gặp số cũ hơn tuần trước không.",
      },
      {
        type: "scenario",
        title: "Thứ Tư của dự án kế hoạch đào tạo",
        start: "s1",
        nodes: {
          s1: {
            text: "Hôm nay là thứ Tư. Hôm qua bạn đã chốt ngân sách và lịch đào tạo, nhưng chưa tóm tắt. Sáng nay bạn mở công cụ để làm tiếp.",
            choices: [
              { label: "Hỏi tiếp trong cuộc trò chuyện hôm qua, vì mới hai ngày", next: "s2" },
              { label: "Nhờ tóm tắt cuộc hôm qua, sửa, rồi mở cuộc mới với bản đó", next: "s3" },
            ],
          },
          s2: {
            text: "Công cụ đưa ra một mốc ngày khác với điều bạn đã chốt. Bạn để ý thì kịp, nhưng không chắc còn chỗ nào khác lẫn.",
            choices: [
              { label: "Bỏ qua và làm tiếp cho kịp tiến độ", next: "bad_skip" },
              { label: "Dừng lại, tóm tắt, sửa rồi mở cuộc mới", next: "s3" },
            ],
          },
          bad_skip: {
            text: "Đến thứ Sáu, bản kế hoạch có hai mốc ngày trái nhau. Bạn mất buổi chiều để dò lại cả tuần.",
            ending: "bad",
          },
          s3: {
            text: "Bản tóm tắt liệt kê ngân sách, lịch và điều còn mở. Bạn thấy nó ghi thiếu một hạng mục bạn đã chốt.",
            choices: [
              { label: "Thêm hạng mục đó vào, lưu vào ghi chú, dán sang cuộc mới", next: "good" },
              { label: "Dán nguyên bản, mong công cụ tự bổ sung", next: "bad_paste" },
            ],
          },
          bad_paste: {
            text: "Cuộc mới lên kế hoạch không có hạng mục đó, và bạn chỉ nhận ra vào thứ Sáu khi rà lại.",
            ending: "bad",
          },
          good: {
            text: "Bản tóm tắt đầy đủ được lưu ở ghi chú của bạn. Cuối tuần bạn nộp đúng hạn và không phải đọc lại cả tuần trò chuyện.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Sổ giao ca mỗi chiều: tóm tắt, tự sửa, lưu ở chỗ của bạn.",
          "Bài sau của chặng: đặt các công cụ cạnh nhau để chọn cái hợp việc.",
        ],
      },
    ],
  },
];
