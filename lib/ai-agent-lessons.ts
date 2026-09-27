import type { Lesson } from "./lesson-types";

// Chặng "AI Agent đơn giản hơn bạn nghĩ" (ids 1780-1783, personal track, Chặng 23).
//
// Bài "làm ra một cái chạy được" mà hành trình /hoc-theo-nhu-cau/ai-agent còn
// thiếu. Các bài nền (API, giao việc cho AI, chống bịa) đã có ở chặng 7 và
// chặng AI trong sản phẩm; chặng này ghép chúng thành một agent hoàn chỉnh.
//
// Cố ý không gắn với một thư viện hay nhà cung cấp mô hình nào: vòng lặp,
// mô tả công cụ và các chốt an toàn giống nhau ở mọi nơi, còn tên hàm thì đổi
// theo từng phiên bản SDK. Dải 1780-1789 còn trống sáu id.

export const AI_AGENT_LESSONS: Lesson[] = [
  {
    id: 1780,
    slug: "vong-lap-cua-mot-ai-agent",
    title: "Chặng 23, Bài 1: Vòng lặp của một AI Agent - chạy thử bằng giấy bút",
    subtitle: "Trước khi viết dòng mã nào, hãy đóng vai agent một lần.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Mọi agent, từ trợ lý đặt lịch tới công cụ viết mã, đều chạy cùng một vòng lặp. Hiểu vòng lặp đó bằng tay trước thì phần mã về sau chỉ là gõ lại thứ bạn đã hiểu - và khi agent làm sai, bạn biết nó sai ở bước nào.",
    openingQuestion:
      "Bạn hỏi agent: \"Ngày mai Đà Lạt có mưa không, nếu có thì nhắc tôi mang áo mưa.\" Agent làm gì ĐẦU TIÊN?",
    openingOptions: [
      "Quyết định cần tra thời tiết, và gọi công cụ tra thời tiết",
      "Trả lời ngay là có mưa, vì tháng này Đà Lạt thường mưa chiều",
      "Đặt lời nhắc mang áo mưa trước, rồi mới đi tra thời tiết",
      "Hỏi lại bạn muốn tra thời tiết ở trang web nào cho chắc chắn",
    ],
    correctOption: 0,
    explanation:
      "Agent không đoán - nó quyết định mình cần thông tin gì rồi dùng công cụ để lấy. Bước đầu là suy luận \"tôi cần biết thời tiết ngày mai\" và gọi công cụ tra thời tiết. Chỉ sau khi đọc kết quả nó mới quyết định có đặt lời nhắc hay không. Trả lời ngay theo thói quen là kiểu bịa mà agent tốt phải tránh; đặt nhắc trước khi biết là làm việc thừa và có thể sai.",
    diagram: [
      { label: "Quan sát: yêu cầu và kết quả mới nhất", arrow: true },
      { label: "Suy luận: bước tiếp theo là gì?", arrow: true },
      { label: "Hành động: gọi một công cụ", arrow: true },
      { label: "Lặp lại cho tới khi xong, rồi trả lời" },
    ],
    realWorldExample: {
      company: "Trợ lý lập trình trong trình soạn mã",
      description:
        "Khi bạn nhờ sửa một lỗi, trợ lý đọc tệp, chạy thử, thấy lỗi, sửa, chạy lại - mỗi lượt là một vòng quan sát, suy luận, hành động. Nó dừng khi bài kiểm thử qua, hoặc khi hết số bước cho phép.",
    },
    quiz: [
      {
        question: "Khác biệt cốt lõi giữa chatbot và agent là gì?",
        options: [
          "Agent tự gọi công cụ và lặp lại cho tới khi xong việc",
          "Agent dùng một mô hình ngôn ngữ thông minh hơn",
          "Agent trả lời bằng giọng nói thay vì bằng chữ",
          "Agent chạy trên máy bạn, chatbot chạy trên mạng",
        ],
        correct: 0,
        explanation:
          "Cùng một mô hình có thể làm chatbot hoặc agent - khác biệt nằm ở vòng lặp bao quanh nó. Chatbot trả lời một lần rồi dừng. Agent được phép gọi công cụ, đọc kết quả, rồi quyết định bước tiếp, lặp tới khi xong. Giọng nói hay nơi chạy là chuyện giao diện, không phải bản chất.",
      },
      {
        question: "Trong vòng lặp, bước \"quan sát\" nghĩa là gì?",
        options: [
          "Đọc yêu cầu và kết quả công cụ vừa trả về",
          "Lưu toàn bộ cuộc trò chuyện xuống ổ đĩa để dùng lại",
          "Theo dõi xem người dùng còn ngồi trước máy hay không",
          "Đọc lại mã nguồn của các công cụ để hiểu chúng chạy thế nào",
        ],
        correct: 0,
        explanation:
          "Quan sát là cập nhật những gì agent biết: yêu cầu ban đầu cộng với kết quả mới nhất từ công cụ. Không có bước này thì agent suy luận trên thông tin cũ - ví dụ đặt nhắc mang áo mưa trong khi công cụ vừa báo trời nắng. Lưu hội thoại là chuyện bộ nhớ, không phải bước quan sát.",
      },
      {
        question: "Vì sao agent cần một điều kiện dừng rõ ràng?",
        options: [
          "Để không lặp mãi và tốn chi phí khi bị kẹt ở một bước",
          "Vì mô hình ngôn ngữ chỉ chạy tối đa được năm phút",
          "Để người dùng biết trước agent sẽ gọi bao nhiêu công cụ trong một lượt",
          "Để agent trả lời nhanh hơn trong mọi trường hợp",
        ],
        correct: 0,
        explanation:
          "Mỗi vòng là một lần gọi mô hình và thường một lần gọi công cụ - đều tốn tiền và thời gian. Một agent kẹt (công cụ lỗi mãi, mục tiêu mơ hồ) sẽ lặp không ngừng nếu không có giới hạn. Điều kiện dừng thường là: đã xong việc, hoặc hết số bước tối đa, hoặc gặp lỗi không tự sửa được.",
      },
      {
        question: "Công cụ trả về \"ngày mai trời nắng\". Bước tiếp theo đúng là gì?",
        options: [
          "Không đặt nhắc, và trả lời rằng ngày mai không mưa",
          "Vẫn đặt nhắc mang áo mưa cho chắc, phòng khi đổi trời",
          "Gọi lại công cụ thêm vài lần xem kết quả có đổi",
          "Hỏi người dùng có tin kết quả của công cụ này không",
        ],
        correct: 0,
        explanation:
          "Agent đọc kết quả và làm theo đúng điều kiện trong yêu cầu: có mưa mới nhắc. Đặt nhắc \"cho chắc\" là làm điều người dùng không yêu cầu. Gọi lại nhiều lần một công cụ đáng tin chỉ tốn tiền; và hỏi người dùng có tin công cụ không là đẩy việc ngược về cho họ.",
      },
      {
        question: "Chạy thử agent bằng giấy bút trước khi viết mã giúp gì?",
        options: [
          "Thấy trước agent cần công cụ nào và sẽ dừng ở đâu",
          "Giúp mã chạy nhanh hơn khi đưa lên máy chủ",
          "Giúp tiết kiệm tiền thuê mô hình ngôn ngữ",
          "Không giúp gì, vì máy chạy nhanh hơn người",
        ],
        correct: 0,
        explanation:
          "Đóng vai agent một lần cho bạn danh sách công cụ cần có, thứ tự gọi, và những chỗ có thể kẹt - chính là bản thiết kế. Nó không làm mã nhanh hơn, nhưng làm bạn viết đúng ngay từ đầu thay vì phát hiện thiếu công cụ khi agent đã chạy.",
      },
    ],
    keyTakeaways: [
      "Agent = mô hình ngôn ngữ + công cụ + một vòng lặp.",
      "Vòng lặp: quan sát → suy luận → hành động → lặp lại.",
      "Agent không đoán; nó gọi công cụ để lấy thông tin.",
      "Luôn có điều kiện dừng: xong việc, hết số bước, hoặc lỗi.",
      "Đóng vai agent bằng giấy bút một lần là có bản thiết kế.",
    ],
    practicePrompt: {
      question: "Yêu cầu: \"Tìm quán phở gần tôi còn mở cửa và gửi địa chỉ qua tin nhắn.\" Agent cần tối thiểu những công cụ nào?",
      options: [
        "Lấy vị trí, tìm quán, xem giờ mở cửa, gửi tin nhắn",
        "Tìm quán phở, rồi gửi địa chỉ quán gần nhất qua tin nhắn luôn",
        "Lấy vị trí, tìm quán, đặt bàn trước, thanh toán, gửi tin",
        "Lấy vị trí, tìm quán, xem đánh giá, gọi điện hỏi quán, gửi tin",
      ],
      correct: 0,
      explanation:
        "Đi từng bước: cần biết bạn ở đâu, tìm quán gần đó, lọc quán còn mở, rồi gửi tin. Thiếu bước nào thì agent phải đoán. Đặt bàn và thanh toán là những việc người dùng không yêu cầu - và là loại hành động không được làm khi chưa hỏi.",
    },
    summary: {
      keyIdea: "Agent là một vòng lặp: quan sát, suy luận, gọi công cụ, lặp tới khi xong.",
      formula: "Quan sát → suy luận → hành động → (lặp) → dừng khi xong hoặc hết số bước.",
      commonMistake: "Nghĩ agent là một mô hình thông minh hơn, thay vì một mô hình có công cụ và vòng lặp.",
      action: "Chọn một việc bạn hay làm và viết ra từng bước agent sẽ phải làm, kèm công cụ cho mỗi bước.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một việc lặp lại hằng tuần của bạn. Viết ra từng vòng: agent quan sát gì, suy luận gì, gọi công cụ gì. Đánh dấu chỗ nó có thể kẹt.",
      secondary: "Danh sách công cụ bạn vừa viết ra chính là việc của bài sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này ghép những gì bạn đã học về API và cách giao việc cho AI thành một agent chạy được. Bài đầu không có mã - bạn sẽ đóng vai agent bằng giấy bút, vì đó là cách nhanh nhất để hiểu nó.",
      },
      {
        type: "feynman",
        title: "AI Agent đơn giản hơn bạn nghĩ",
        intro: "Chatbot chỉ biết trả lời. Agent thì tự đi làm việc. Hãy hình dung agent là một nhân viên mới bạn vừa tuyển.",
        columns: ["Thành phần", "Một nhân viên", "Một AI Agent"],
        rows: [
          ["Bộ não", "Suy nghĩ, quyết định làm gì tiếp", "Mô hình ngôn ngữ (LLM)"],
          ["Bản mô tả công việc", "Được giao nhiệm vụ gì, giới hạn ở đâu", "Câu lệnh hệ thống"],
          ["Đôi tay", "Máy tính, điện thoại để làm việc", "Công cụ: gọi API, tìm kiếm, gửi tin"],
          ["Cách làm việc", "Xem tình hình → nghĩ → làm → kiểm tra", "Quan sát → suy luận → hành động → lặp"],
        ],
        oneLiner: "Chatbot chỉ trả lời, còn Agent là một bộ não có tay chân để tự đi làm việc.",
      },
      { type: "heading", text: "Chạy thử một vòng bằng tay" },
      {
        type: "list",
        items: [
          "Vòng 1 - Quan sát: \"Ngày mai Đà Lạt có mưa không, có thì nhắc tôi.\" Suy luận: cần thời tiết. Hành động: gọi công cụ tra thời tiết.",
          "Vòng 2 - Quan sát: công cụ trả về \"mưa chiều\". Suy luận: có mưa nên cần nhắc. Hành động: gọi công cụ đặt lời nhắc.",
          "Vòng 3 - Quan sát: lời nhắc đã đặt. Suy luận: xong việc. Dừng và trả lời người dùng.",
        ],
      },
      {
        type: "paragraph",
        text: "Ba vòng, hai công cụ, một điều kiện dừng. Mọi agent phức tạp hơn cũng chỉ là nhiều vòng hơn và nhiều công cụ hơn - cấu trúc không đổi.",
      },
      {
        type: "callout",
        label: "Luôn có giới hạn số bước",
        text: "Một agent kẹt sẽ lặp mãi và tốn tiền mỗi vòng. Đặt số bước tối đa ngay từ đầu, ví dụ mười vòng, rồi dừng và báo lại nếu chưa xong.",
      },
      {
        type: "closing",
        lines: [
          "Agent không phải phép màu - nó là một vòng lặp có kỷ luật.",
          "Bài sau: mô tả công cụ sao cho agent dùng đúng.",
        ],
      },
    ],
  },
  {
    id: 1781,
    slug: "mo-ta-cong-cu-cho-agent",
    title: "Chặng 23, Bài 2: Mô tả công cụ cho agent - bảng hướng dẫn sử dụng",
    subtitle: "Agent chỉ dùng đúng công cụ khi bản mô tả nói rõ nó làm gì và cần gì.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧰",
    track: "personal",
    whyItMatters:
      "Agent không nhìn thấy mã của công cụ - nó chỉ đọc bản mô tả bạn viết. Phần lớn lỗi \"agent dùng sai công cụ\" thực ra là lỗi mô tả: tên mơ hồ, thiếu đơn vị, không nói khi nào nên dùng. Viết mô tả tốt là kỹ năng quan trọng nhất khi dựng agent.",
    openingQuestion:
      "Bản mô tả công cụ nào giúp agent dùng đúng nhất?",
    openingOptions: [
      "\"tra_thoi_tiet: Dự báo theo ngày cho một thành phố. Cần: thành phố, ngày (YYYY-MM-DD).\"",
      "\"weather: Lấy thời tiết ở bất kỳ đâu, vào bất kỳ lúc nào bạn cần.\"",
      "\"tool1: Công cụ rất mạnh, xử lý mọi yêu cầu về thời tiết, khí hậu.\"",
      "\"tra_thoi_tiet: Gọi tới API thời tiết của nhà cung cấp dữ liệu.\"",
    ],
    correctOption: 0,
    explanation:
      "Mô tả tốt trả lời ba câu: công cụ làm gì, cần đầu vào gì, đầu vào ở định dạng nào. \"Cần: thành phố, ngày (YYYY-MM-DD)\" cho agent biết chính xác phải điền gì. \"Lấy thời tiết\" không nói thời tiết lúc nào, ở đâu. \"Xử lý được mọi yêu cầu\" là lời quảng cáo, khiến agent gọi nó cho cả những việc nó không làm được. \"Gọi API thời tiết\" nói cách làm chứ không nói nó trả về gì.",
    diagram: [
      { label: "Tên: rõ việc, không chung chung", arrow: true },
      { label: "Mô tả: làm gì, khi nào nên dùng", arrow: true },
      { label: "Tham số: tên, kiểu, định dạng, bắt buộc hay không", arrow: true },
      { label: "Agent đọc mô tả để chọn và điền đúng" },
    ],
    realWorldExample: {
      company: "Một nhóm dựng trợ lý chăm sóc khách hàng",
      description:
        "Agent của họ liên tục hoàn tiền nhầm cho đơn chưa giao. Nguyên nhân: công cụ tên \"xu_ly_don\" với mô tả \"xử lý đơn hàng\". Tách thành \"tra_trang_thai_don\" và \"hoan_tien_don_da_giao\", mô tả rõ điều kiện, lỗi biến mất mà không phải sửa dòng mã nào của agent.",
    },
    quiz: [
      {
        question: "Agent quyết định gọi công cụ nào dựa trên đâu?",
        options: [
          "Tên và bản mô tả mà bạn viết cho công cụ",
          "Mã nguồn bên trong công cụ, mô hình đọc được nó",
          "Công cụ nào được thêm vào danh sách sớm nhất",
          "Công cụ nào chạy nhanh nhất trong những lần trước",
        ],
        correct: 0,
        explanation:
          "Mô hình ngôn ngữ không đọc mã của công cụ; nó chỉ thấy tên, mô tả và danh sách tham số bạn cung cấp. Vì vậy mô tả chính là giao diện duy nhất giữa agent và công cụ. Thứ tự trong danh sách hay tốc độ không phải thứ agent dựa vào để chọn.",
      },
      {
        question: "Vì sao nên ghi rõ định dạng tham số, như ngày dạng YYYY-MM-DD?",
        options: [
          "Để agent không điền \"mai\" hay \"27/9\" khiến công cụ lỗi",
          "Vì mô hình chỉ hiểu ngày viết theo chuẩn quốc tế",
          "Để bản mô tả trông chuyên nghiệp và đáng tin hơn với agent",
          "Để công cụ phía sau chạy nhanh hơn",
        ],
        correct: 0,
        explanation:
          "Không nói định dạng thì agent điền theo cách nó thấy tự nhiên - \"ngày mai\", \"27/9\" - và công cụ nhận vào một chuỗi nó không đọc được. Mô hình hiểu ngày tháng ở nhiều dạng; vấn đề là công cụ phía sau thì không. Ghi rõ định dạng là nói hộ cho công cụ.",
      },
      {
        question: "Một công cụ \"xu_ly_don\" làm cả tra cứu lẫn hoàn tiền. Nên sửa thế nào?",
        options: [
          "Tách thành hai công cụ, mỗi công cụ làm đúng một việc",
          "Thêm \"HÃY THẬT CẨN THẬN\" vào bản mô tả",
          "Đổi tên thành xu_ly_don_hang cho rõ hơn",
          "Bỏ công cụ đi, để agent tự hoàn tiền",
        ],
        correct: 0,
        explanation:
          "Một công cụ làm hai việc buộc agent đoán nó đang làm việc nào, và một việc trong đó (hoàn tiền) không thể rút lại. Tách ra thì việc tra cứu an toàn dùng thoải mái, còn việc hoàn tiền có mô tả và điều kiện riêng. Lời dặn \"cẩn thận\" không cho agent thông tin nào để cẩn thận.",
      },
      {
        question: "Mô tả nên nói gì ngoài việc công cụ làm gì?",
        options: [
          "Khi nào nên dùng, và khi nào không nên",
          "Công cụ viết bằng ngôn ngữ gì, chạy ở đâu",
          "Tên người đã viết ra công cụ và ngày viết",
          "Công cụ đã được gọi bao nhiêu lần tới nay",
        ],
        correct: 0,
        explanation:
          "\"Chỉ dùng khi đơn đã giao; với đơn chưa giao hãy dùng tra_trang_thai_don\" giúp agent chọn đúng giữa hai công cụ gần giống nhau. Ngôn ngữ lập trình, máy chủ, tác giả hay số lần dùng không giúp agent quyết định gì - chúng chỉ làm mô tả dài thêm.",
      },
      {
        question: "Công cụ bị lỗi thì nên trả gì về cho agent?",
        options: [
          "Một câu nói rõ lỗi gì và agent nên làm gì tiếp",
          "Không trả gì cả, để agent tự hiểu là có lỗi",
          "Toàn bộ nội dung lỗi kỹ thuật, dài bao nhiêu cũng được",
          "Một kết quả giả hợp lý để agent chạy tiếp",
        ],
        correct: 0,
        explanation:
          "Kết quả lỗi cũng là thứ agent quan sát ở vòng sau. \"Không tìm thấy thành phố 'Dalat', thử 'Đà Lạt'\" giúp nó tự sửa. Không trả gì thì nó đoán; hàng trăm dòng lỗi kỹ thuật thì làm nó rối; còn kết quả giả là dạy agent nói dối người dùng.",
      },
    ],
    keyTakeaways: [
      "Agent chọn công cụ dựa trên tên và mô tả, không đọc mã.",
      "Mô tả tốt: làm gì, khi nào dùng, cần tham số gì ở định dạng nào.",
      "Mỗi công cụ một việc, nhất là việc không rút lại được.",
      "Lỗi của công cụ phải nói rõ agent nên làm gì tiếp.",
      "Phần lớn lỗi \"agent dùng sai công cụ\" là lỗi mô tả.",
    ],
    practicePrompt: {
      question: "Bạn có công cụ gửi email. Tham số nào cần mô tả kỹ nhất?",
      options: [
        "Người nhận: là địa chỉ email, chỉ những người người dùng đã nêu",
        "Tiêu đề: vì nó quyết định email có được mở ra hay không",
        "Nội dung: vì email càng dài thì càng dễ sai chính tả",
        "Tệp đính kèm: vì tệp lớn có thể làm email bị trả về",
      ],
      correct: 0,
      explanation:
        "Gửi nhầm người là lỗi không rút lại được, nên người nhận cần mô tả chặt nhất: định dạng là địa chỉ email, và giới hạn chỉ những người được nêu trong yêu cầu. Tiêu đề có quan trọng với người đọc, nhưng sai tiêu đề thì sửa được bằng một email khác.",
    },
    summary: {
      keyIdea: "Bản mô tả là giao diện duy nhất giữa agent và công cụ.",
      formula: "Tên rõ việc + làm gì + khi nào dùng + tham số có định dạng.",
      commonMistake: "Một công cụ làm nhiều việc với mô tả mơ hồ như \"xử lý đơn\".",
      action: "Viết mô tả cho từng công cụ trong danh sách ở bài trước, theo đủ bốn phần.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy danh sách công cụ từ bài trước. Với mỗi công cụ viết: tên, một câu làm gì, một câu khi nào dùng, và từng tham số kèm định dạng.",
      secondary: "Đánh dấu công cụ nào làm việc không rút lại được - bài 4 sẽ đặt chốt cho chúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước bạn đã có danh sách công cụ. Bài này là cách viết bản mô tả cho chúng - thứ duy nhất agent đọc khi quyết định dùng công cụ nào.",
      },
      {
        type: "feynman",
        title: "Mô tả công cụ đơn giản hơn bạn nghĩ",
        intro: "Mô tả công cụ giống nhãn trên hộp đồ nghề của một người thợ mới: nhãn rõ thì lấy đúng dụng cụ, nhãn ghi \"đồ linh tinh\" thì lục mãi.",
        columns: ["Thành phần", "Hộp đồ nghề", "Công cụ của agent"],
        rows: [
          ["Tên", "\"Tua vít 4 cạnh\"", "tra_thoi_tiet, không phải tool1"],
          ["Công dụng", "Vặn vít 4 cạnh, không dùng để cạy", "Làm gì, và khi nào không nên dùng"],
          ["Kích cỡ", "Cỡ số 2", "Tham số và định dạng: ngày YYYY-MM-DD"],
          ["Cảnh báo", "Dao sắc - cầm đằng cán", "Việc không rút lại được: hoàn tiền, gửi email"],
        ],
        oneLiner: "Agent không nhìn vào trong công cụ - nó chỉ đọc cái nhãn bạn dán bên ngoài.",
      },
      { type: "heading", text: "Bốn phần của một bản mô tả" },
      {
        type: "list",
        items: [
          "Tên: động từ + đối tượng, ví dụ tra_thoi_tiet, gui_email.",
          "Công dụng: một câu nói nó trả về gì.",
          "Khi nào dùng: và khi nào nên dùng công cụ khác.",
          "Tham số: tên, kiểu dữ liệu, định dạng, bắt buộc hay không.",
        ],
      },
      {
        type: "paragraph",
        text: "Mô tả được gửi kèm mỗi lần gọi mô hình, dưới dạng dữ liệu có cấu trúc (thường là JSON). Bạn không cần thuộc cú pháp - mọi thư viện agent đều có mẫu. Thứ bạn phải tự viết là nội dung: rõ ràng, cụ thể, không quảng cáo.",
      },
      {
        type: "callout",
        label: "Lỗi cũng là một kết quả",
        text: "Khi công cụ hỏng, trả về một câu nói rõ lỗi gì và nên làm gì tiếp. Agent đọc nó ở vòng sau và thường tự sửa được.",
      },
      {
        type: "closing",
        lines: [
          "Viết mô tả là viết hướng dẫn cho một đồng nghiệp chỉ đọc chữ, không hỏi lại được.",
          "Bài sau: ghép vòng lặp và công cụ thành agent đầu tiên.",
        ],
      },
    ],
  },
  {
    id: 1782,
    slug: "dung-agent-dau-tien-tu-dau-den-cuoi",
    title: "Chặng 23, Bài 3: Dựng agent đầu tiên từ đầu đến cuối",
    subtitle: "Một câu lệnh hệ thống, hai công cụ, một vòng lặp - và nó chạy.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🛠️",
    track: "personal",
    whyItMatters:
      "Hai bài trước là từng mảnh. Bài này ghép chúng lại theo đúng thứ tự bạn sẽ gõ mã: câu lệnh hệ thống, danh sách công cụ, vòng lặp, điều kiện dừng. Nắm được bộ khung này thì đổi sang thư viện hay nhà cung cấp nào cũng chỉ là đổi tên hàm.",
    openingQuestion:
      "Trong vòng lặp của agent, mô hình trả về \"hãy gọi tra_thoi_tiet với Đà Lạt, 2026-09-28\". Mã của BẠN phải làm gì tiếp?",
    openingOptions: [
      "Chạy công cụ đó, rồi gửi kết quả lại cho mô hình",
      "Hiện nguyên câu đó cho người dùng xem và chờ họ trả lời",
      "Kết thúc vòng lặp, vì mô hình đã trả lời câu hỏi rồi",
      "Gọi lại mô hình với cùng câu hỏi để nó tự chạy công cụ",
    ],
    correctOption: 0,
    explanation:
      "Mô hình không tự chạy được công cụ - nó chỉ nói nó muốn gọi công cụ nào với tham số gì. Mã của bạn là người thực thi: chạy công cụ thật, lấy kết quả, và gửi kết quả đó vào lượt gọi mô hình tiếp theo. Đây là điểm người mới hay nhầm nhất: vòng lặp nằm trong mã của bạn, không nằm trong mô hình.",
    diagram: [
      { label: "Gửi: câu lệnh hệ thống + công cụ + lịch sử", arrow: true },
      { label: "Mô hình trả về: câu trả lời, HOẶC yêu cầu gọi công cụ", arrow: true },
      { label: "Nếu gọi công cụ: mã của bạn chạy nó, thêm kết quả vào lịch sử", arrow: true },
      { label: "Lặp lại cho tới khi có câu trả lời hoặc hết số bước" },
    ],
    realWorldExample: {
      company: "Một người tự dựng trợ lý lịch họp",
      description:
        "Bản đầu tiên của họ chỉ có hai công cụ: xem lịch trống và tạo cuộc họp. Vòng lặp hai mươi dòng mã, giới hạn năm bước. Đủ để nói \"đặt cho tôi 30 phút với Lan chiều thứ Năm\" và nhận về một cuộc họp thật - trước khi thêm bất cứ tính năng nào.",
    },
    quiz: [
      {
        question: "Ai thực sự chạy công cụ trong một agent?",
        options: [
          "Mã của bạn, sau khi mô hình yêu cầu",
          "Mô hình tự chạy trên máy chủ của nhà cung cấp",
          "Người dùng, bằng cách bấm nút mỗi lần",
          "Trình duyệt web của người đang dùng agent",
        ],
        correct: 0,
        explanation:
          "Mô hình chỉ trả về một yêu cầu có cấu trúc: tên công cụ và tham số. Chạy công cụ - gọi API thời tiết, ghi vào lịch - là việc của mã bạn viết. Điều này quan trọng vì nó nghĩa là bạn kiểm soát được mọi hành động: bạn có thể kiểm tra, chặn, hoặc hỏi người dùng trước khi chạy.",
      },
      {
        question: "Câu lệnh hệ thống của agent nên chứa gì?",
        options: [
          "Vai trò, mục tiêu, giới hạn và cách trả lời khi xong",
          "Toàn bộ mã nguồn của các công cụ agent dùng",
          "Khoá API để agent tự gọi dịch vụ ngoài",
          "Thật nhiều lời khen để mô hình làm tốt hơn",
        ],
        correct: 0,
        explanation:
          "Câu lệnh hệ thống là bản mô tả công việc: agent là ai, phục vụ việc gì, không được làm gì, và khi xong thì trả lời thế nào. Mã công cụ không cần - agent chỉ cần bản mô tả. Mật khẩu tuyệt đối không nằm trong câu lệnh; công cụ tự giữ thông tin đăng nhập ở phía mã của bạn.",
      },
      {
        question: "Vì sao phải gửi lại toàn bộ lịch sử mỗi vòng?",
        options: [
          "Vì mô hình không tự nhớ gì từ các lần gọi trước",
          "Vì nhà cung cấp chỉ tính tiền theo số lần gửi",
          "Vì lịch sử giúp mô hình chạy nhanh hơn ở vòng sau",
          "Không cần - chỉ gửi câu hỏi cuối cùng là đủ",
        ],
        correct: 0,
        explanation:
          "Mỗi lần gọi mô hình là độc lập - nó không nhớ gì từ lần trước. Muốn nó biết đã gọi công cụ nào và nhận kết quả gì, bạn phải gửi lại cả lịch sử. Hệ quả: lịch sử càng dài, mỗi vòng càng tốn - đó là lý do agent cần giới hạn số bước.",
      },
      {
        question: "Mô hình trả về câu trả lời thường, không yêu cầu công cụ nào. Nghĩa là gì?",
        options: [
          "Đã xong - dừng vòng lặp và đưa câu trả lời cho người dùng",
          "Mô hình bị lỗi, cần báo cho nhà cung cấp",
          "Cần gọi lại vài lần nữa cho chắc chắn",
          "Phải tự chọn một công cụ để gọi thử",
        ],
        correct: 0,
        explanation:
          "Đây là điều kiện dừng tự nhiên: mô hình đã có đủ thông tin và trả lời. Mã của bạn thoát vòng lặp và đưa câu trả lời cho người dùng. Gọi lại \"cho chắc\" chỉ tốn thêm tiền, còn tự chọn công cụ gọi thử là làm việc không ai yêu cầu.",
      },
      {
        question: "Agent đầu tiên nên có bao nhiêu công cụ?",
        options: [
          "Hai ba công cụ cho một việc cụ thể",
          "Hai mươi công cụ trở lên để làm được mọi việc",
          "Càng nhiều càng tốt, agent tự biết chọn",
          "Một công cụ duy nhất làm được mọi thứ",
        ],
        correct: 0,
        explanation:
          "Mỗi công cụ thêm vào là thêm một lựa chọn agent có thể chọn sai, và thêm một bản mô tả gửi kèm mỗi vòng. Bắt đầu với vài công cụ cho đúng một việc, chạy được, rồi mới mở rộng. Không có công cụ nào thì nó chỉ là một chatbot.",
      },
    ],
    keyTakeaways: [
      "Mô hình chỉ yêu cầu gọi công cụ; mã của bạn mới chạy nó.",
      "Câu lệnh hệ thống: vai trò, mục tiêu, giới hạn, cách trả lời.",
      "Gửi lại toàn bộ lịch sử mỗi vòng, vì mô hình không tự nhớ.",
      "Câu trả lời không kèm yêu cầu công cụ là tín hiệu dừng.",
      "Agent đầu tiên: hai ba công cụ cho một việc cụ thể.",
    ],
    practicePrompt: {
      question: "Sắp xếp đúng một vòng của agent:",
      options: [
        "Gửi lịch sử → mô hình yêu cầu công cụ → mã chạy nó → thêm kết quả",
        "Mã chạy công cụ → gửi lịch sử → mô hình trả lời người dùng",
        "Mô hình tự chạy công cụ → tự lưu kết quả → trả lời người dùng",
        "Người dùng chạy công cụ → dán kết quả → mô hình trả lời",
      ],
      correct: 0,
      explanation:
        "Mã gửi lịch sử, mô hình quyết định, mã thực thi, rồi kết quả quay vào lịch sử cho vòng sau. Mô hình không tự chạy hay tự lưu gì cả. Chạy công cụ trước khi hỏi mô hình thì không biết chạy công cụ nào; bắt người dùng tự chạy thì không còn là agent.",
    },
    summary: {
      keyIdea: "Vòng lặp nằm trong mã của bạn: gửi lịch sử, chạy công cụ mô hình yêu cầu, lặp lại.",
      formula: "Câu lệnh hệ thống + công cụ + lịch sử → mô hình → (chạy công cụ → thêm vào lịch sử) × n → trả lời.",
      commonMistake: "Nghĩ mô hình tự chạy công cụ, nên không kiểm soát được hành động nào.",
      action: "Viết câu lệnh hệ thống cho agent của bạn: vai trò, mục tiêu, giới hạn, cách trả lời.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Viết câu lệnh hệ thống năm dòng cho agent bạn đã thiết kế. Nếu biết lập trình, mở tài liệu công cụ (tool use) của nhà cung cấp mô hình bạn dùng và chạy ví dụ mẫu của họ với hai công cụ của bạn.",
      secondary: "Nếu chưa biết lập trình, chạy lại vòng lặp bằng giấy bút với câu lệnh hệ thống vừa viết.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có vòng lặp và bản mô tả công cụ. Bài này ghép chúng theo đúng thứ tự bạn sẽ gõ mã - không gắn với thư viện nào, vì bộ khung giống nhau ở mọi nơi.",
      },
      {
        type: "feynman",
        title: "Dựng agent đơn giản hơn bạn nghĩ",
        intro: "Mã của bạn giống người quản lý, còn mô hình là chuyên gia ngồi trong phòng kín. Chuyên gia chỉ viết giấy ra: \"hãy tra giúp tôi X\". Người quản lý đi làm, rồi mang kết quả vào.",
        columns: ["Thành phần", "Quản lý và chuyên gia", "Agent"],
        rows: [
          ["Giao việc", "Đưa chuyên gia hồ sơ và mô tả công việc", "Gửi câu lệnh hệ thống + lịch sử"],
          ["Chuyên gia viết giấy", "\"Tra giúp tôi thời tiết Đà Lạt\"", "Mô hình trả về yêu cầu gọi công cụ"],
          ["Quản lý đi làm", "Ra ngoài tra, mang kết quả vào", "Mã của bạn chạy công cụ, thêm kết quả"],
          ["Xong việc", "Chuyên gia viết câu trả lời cuối", "Mô hình trả lời, không yêu cầu gì thêm"],
        ],
        oneLiner: "Mô hình chỉ viết giấy yêu cầu; mã của bạn là người đi làm và mang kết quả về.",
      },
      { type: "heading", text: "Bộ khung năm bước" },
      {
        type: "list",
        items: [
          "Viết câu lệnh hệ thống: vai trò, mục tiêu, giới hạn, cách trả lời.",
          "Khai báo hai ba công cụ theo bốn phần ở bài trước.",
          "Vòng lặp: gửi lịch sử cho mô hình, đọc kết quả.",
          "Nếu mô hình yêu cầu công cụ: chạy nó, thêm kết quả vào lịch sử, quay lại bước 3.",
          "Nếu mô hình trả lời thường, hoặc hết số bước: dừng và trả lời người dùng.",
        ],
      },
      {
        type: "paragraph",
        text: "Toàn bộ agent đầu tiên thường chỉ vài chục dòng mã. Phần tốn công không nằm ở vòng lặp mà ở câu lệnh hệ thống và bản mô tả công cụ - đúng những thứ bạn đã viết bằng chữ ở hai bài trước.",
      },
      {
        type: "callout",
        label: "Không để mật khẩu trong câu lệnh",
        text: "Khoá API và mật khẩu nằm trong mã của công cụ, ở phía bạn. Mô hình không bao giờ cần thấy chúng.",
      },
      {
        type: "closing",
        lines: [
          "Agent chạy được đầu tiên thường nhỏ tới bất ngờ - và đó là điều tốt.",
          "Bài cuối: những chốt an toàn trước khi cho agent làm việc thật.",
        ],
      },
    ],
  },
  {
    id: 1783,
    slug: "chot-an-toan-cho-agent",
    title: "Chặng 23, Bài 4: Chốt an toàn trước khi cho agent làm việc thật",
    subtitle: "Việc không rút lại được thì phải có người duyệt.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Agent làm được việc thật - gửi email, xoá tệp, chuyển tiền - và nó sai với vẻ tự tin y như khi đúng. Một vài chốt an toàn đơn giản là khác biệt giữa một trợ lý hữu ích và một sự cố không rút lại được.",
    openingQuestion:
      "Agent của bạn có công cụ gửi email. Chốt an toàn quan trọng nhất là gì?",
    openingOptions: [
      "Hiện bản nháp, chờ người dùng bấm duyệt rồi mới gửi",
      "Dặn trong câu lệnh: \"tuyệt đối đừng gửi nhầm người\"",
      "Dùng mô hình đắt nhất, vì nó ít sai hơn",
      "Chỉ cho gửi trong giờ hành chính để có người trực xem",
    ],
    correctOption: 0,
    explanation:
      "Email đã gửi thì không thu hồi được, nên chốt phải nằm trước hành động và phải là một người thật. Lời dặn trong câu lệnh giúp giảm lỗi nhưng không chặn được lỗi - mô hình vẫn có thể hiểu sai người nhận. Mô hình tốt hơn sai ít hơn, không phải không sai. Giờ gửi thì không liên quan gì tới gửi đúng người.",
    diagram: [
      { label: "Phân loại công cụ: rút lại được hay không", arrow: true },
      { label: "Không rút lại được → người duyệt trước khi chạy", arrow: true },
      { label: "Giới hạn: số bước, số tiền, phạm vi", arrow: true },
      { label: "Nhật ký: ghi lại mọi lần gọi công cụ" },
    ],
    realWorldExample: {
      company: "Một công ty nhỏ thử agent dọn hộp thư",
      description:
        "Agent được giao \"lưu trữ email quảng cáo\" nhưng có quyền xoá vĩnh viễn. Một câu lệnh mơ hồ khiến nó xoá cả hoá đơn nhà cung cấp. Sau đó họ bỏ quyền xoá, chỉ cho chuyển vào thư mục, và mọi thao tác đều ghi nhật ký - agent vẫn làm đúng việc cũ mà không còn gây hại được.",
    },
    quiz: [
      {
        question: "Hành động nào của agent nhất định cần người duyệt trước?",
        options: [
          "Gửi tin nhắn, chuyển tiền, xoá dữ liệu",
          "Đọc lịch trống để gợi ý vài khung giờ họp",
          "Tra thời tiết và tìm kiếm thông tin trên mạng",
          "Đọc email để tóm tắt những việc cần làm hôm nay",
        ],
        correct: 0,
        explanation:
          "Tiêu chí là rút lại được hay không. Tra cứu, đọc lịch, tìm kiếm - sai thì làm lại, không ai bị ảnh hưởng. Tin nhắn đã gửi, tiền đã chuyển, dữ liệu đã xoá thì không làm lại được. Chốt duyệt nên đặt đúng ở nhóm sau, để agent vẫn nhanh ở nhóm trước.",
      },
      {
        question: "Vì sao dặn \"đừng làm sai\" trong câu lệnh là chưa đủ?",
        options: [
          "Vì mô hình vẫn có thể hiểu sai mà không biết mình sai",
          "Vì mô hình không đọc câu lệnh hệ thống",
          "Vì câu lệnh bị quên sau vòng đầu tiên",
          "Vì lời dặn làm agent chạy chậm hơn hẳn",
        ],
        correct: 0,
        explanation:
          "Lời dặn làm giảm lỗi, và nên có. Nhưng mô hình sai theo cách chính nó không nhận ra - nhầm người nhận vì hai tên giống nhau, hiểu \"dọn\" thành \"xoá\". Chốt an toàn thật phải nằm trong mã: chặn hành động, không chỉ khuyên mô hình đừng làm.",
      },
      {
        question: "Nguyên tắc \"quyền tối thiểu\" với agent nghĩa là gì?",
        options: [
          "Chỉ cấp đúng những quyền mà việc đó cần",
          "Cấp quyền quản trị để agent không bị lỗi thiếu quyền",
          "Chỉ cho agent chạy ít giờ nhất mỗi ngày",
          "Chỉ dùng mô hình nhỏ nhất để đỡ rủi ro",
        ],
        correct: 0,
        explanation:
          "Agent dọn hộp thư cần quyền chuyển thư vào thư mục, không cần quyền xoá vĩnh viễn. Quyền nào không cấp thì dù agent hiểu sai tới đâu cũng không dùng được. Cấp quyền quản trị \"cho tiện\" là biến mọi lỗi nhỏ thành lỗi lớn.",
      },
      {
        question: "Nhật ký gọi công cụ giúp gì?",
        options: [
          "Biết agent đã làm gì, để lần ra chỗ sai khi có sự cố",
          "Giúp mô hình tự học để không lặp lại lỗi cũ",
          "Giúp agent chạy nhanh hơn ở lần gọi sau",
          "Để tính chính xác tiền phải trả mỗi tháng",
        ],
        correct: 0,
        explanation:
          "Khi có sự cố, câu hỏi đầu tiên là \"agent đã gọi công cụ gì, với tham số gì, lúc nào\". Không có nhật ký thì không trả lời được. Mô hình không tự học từ nhật ký của bạn - nhật ký là để người đọc, để sửa mô tả công cụ và câu lệnh cho lần sau.",
      },
      {
        question: "Agent được giao \"mua vật tư văn phòng\". Giới hạn nào hợp lý nhất?",
        options: [
          "Hạn mức tiền mỗi đơn, vượt thì phải duyệt",
          "Cho mua thoải mái, cuối tháng agent tự viết báo cáo",
          "Không giới hạn gì, vì đã chọn được agent tốt",
          "Chỉ cho mua vào sáng thứ Hai hằng tuần mà thôi",
        ],
        correct: 0,
        explanation:
          "Hạn mức chặn lỗi trước khi nó thành thiệt hại: đơn nhỏ tự động, đơn lớn có người xem. Báo cáo cuối tháng chỉ cho bạn biết sau khi tiền đã chi - và báo cáo do chính agent viết thì có thể sai theo đúng cách nó đã mua sai. Giới hạn theo ngày trong tuần không chặn được số tiền.",
      },
    ],
    keyTakeaways: [
      "Chia công cụ theo tiêu chí: rút lại được hay không.",
      "Việc không rút lại được thì có người duyệt trước khi chạy.",
      "Chốt an toàn nằm trong mã, không chỉ trong lời dặn.",
      "Quyền tối thiểu: chỉ cấp đúng quyền việc đó cần.",
      "Ghi nhật ký mọi lần gọi công cụ.",
    ],
    practicePrompt: {
      question: "Agent của bạn có ba công cụ: tìm_sản_phẩm, thêm_vào_giỏ, thanh_toán. Đặt chốt duyệt ở đâu?",
      options: [
        "Chỉ ở thanh_toán, vì đó là việc không rút lại được",
        "Ở cả ba công cụ, cho an toàn tuyệt đối",
        "Không ở đâu, vì người dùng đã đồng ý từ đầu cuộc trò chuyện",
        "Ở thêm_vào_giỏ, vì đó là lúc khách chọn hàng",
      ],
      correct: 0,
      explanation:
        "Tìm sản phẩm và thêm vào giỏ đều sửa lại được, nên duyệt ở đó chỉ làm agent chậm và người dùng phiền. Thanh toán thì không rút lại được, nên đó là chỗ đặt chốt. Một lời đồng ý chung chung lúc đầu không thay được việc duyệt đúng đơn hàng, đúng số tiền.",
    },
    summary: {
      keyIdea: "Agent tự làm việc có thể rút lại; việc không rút lại được thì có người duyệt.",
      formula: "Phân loại công cụ → duyệt trước việc không rút lại được → quyền tối thiểu → hạn mức → nhật ký.",
      commonMistake: "Chỉ dặn \"hãy cẩn thận\" trong câu lệnh mà không chặn gì trong mã.",
      action: "Đánh dấu từng công cụ của agent bạn: rút lại được hay không, và thêm bước duyệt cho nhóm không.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy danh sách công cụ của agent bạn. Viết cạnh mỗi cái: rút lại được hay không, quyền tối thiểu cần là gì, có cần hạn mức không.",
      secondary: "Bạn vừa đi hết hành trình AI Agent: vòng lặp, công cụ, bộ khung, và chốt an toàn.",
    },
    sections: [
      {
        type: "lead",
        text: "Agent của bạn đã chạy. Trước khi cho nó làm việc thật - với email thật, tiền thật, dữ liệu thật - hãy đặt vài chốt an toàn. Chúng đơn giản, và chúng là thứ phân biệt một bản thử với một thứ dùng được.",
      },
      {
        type: "feynman",
        title: "An toàn cho agent đơn giản hơn bạn nghĩ",
        intro: "Giao việc cho agent giống giao việc cho nhân viên mới ngày đầu: cho làm ngay những việc sửa lại được, còn ký hợp đồng hay chi tiền thì phải qua bạn duyệt.",
        columns: ["Chốt", "Với nhân viên mới", "Với agent"],
        rows: [
          ["Duyệt trước", "Chi tiền phải có chữ ký", "Việc không rút lại được chờ người bấm duyệt"],
          ["Quyền tối thiểu", "Không đưa chìa khoá két", "Chỉ cấp đúng quyền việc đó cần"],
          ["Hạn mức", "Chi dưới 500 nghìn thì tự quyết", "Giới hạn số tiền, số bước, phạm vi"],
          ["Sổ ghi chép", "Ghi lại việc đã làm", "Nhật ký mọi lần gọi công cụ"],
        ],
        oneLiner: "Cho agent tự làm những việc sửa lại được; việc không rút lại được thì phải qua tay người.",
      },
      { type: "heading", text: "Chốt nằm trong mã, không nằm trong lời dặn" },
      {
        type: "comparison",
        left: {
          label: "Lời dặn trong câu lệnh",
          text: "\"Hãy cẩn thận khi gửi email.\" Giúp giảm lỗi, nhưng mô hình vẫn có thể hiểu sai mà không biết mình sai.",
        },
        right: {
          label: "Chốt trong mã",
          text: "Mã của bạn không chạy công cụ gửi email cho tới khi người dùng bấm duyệt bản nháp. Mô hình hiểu sai tới đâu cũng không gửi được.",
        },
      },
      {
        type: "paragraph",
        text: "Vì mã của bạn là người chạy công cụ (bài trước), bạn luôn có một điểm để chặn: ngay trước khi thực thi. Kiểm tra tên công cụ, nếu nằm trong nhóm không rút lại được thì dừng và hỏi người dùng.",
      },
      {
        type: "callout",
        label: "Bắt đầu hẹp, mở dần",
        text: "Phiên bản đầu chỉ cho agent đọc và đề xuất. Khi nhật ký cho thấy nó đề xuất đúng đều đặn, mới mở dần quyền hành động.",
      },
      {
        type: "closing",
        lines: [
          "Agent an toàn không phải agent không bao giờ sai - mà là agent sai thì không gây hại được.",
          "Bạn đã đi hết hành trình: từ vòng lặp bằng giấy bút tới một agent có chốt an toàn.",
        ],
      },
    ],
  },
];
