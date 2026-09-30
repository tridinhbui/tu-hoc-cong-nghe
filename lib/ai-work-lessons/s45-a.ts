import type { Lesson } from "../lesson-types";

// Chặng 45, bài 1-5. Giáo trình: scripts/curriculum/stage-45.json.
// Không nêu tính năng riêng của công cụ nào: chỉ dạy cách hỏi và cách kiểm nguồn.
export const S45_A_LESSONS: Lesson[] = [
  {
    id: 2300,
    slug: "hoi-de-tim-ra-viec-can-biet-that",
    title: "Chặng 45, Bài 1: Từ câu hỏi mơ hồ đến câu hỏi tìm được đáp án",
    subtitle: "Sếp nói 'tìm hiểu giúp anh' - bạn đổi nó thành ba câu hỏi có thể trả lời được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai sếp nhắn: 'Em tìm hiểu giúp anh thị trường máy pha cà phê nhé.' Bạn gõ đúng câu đó vào công cụ AI và nhận về hai trang chữ chung chung, câu nào cũng đúng mà chẳng câu nào dùng được. Vấn đề không nằm ở công cụ mà ở câu hỏi: câu mơ hồ chỉ nhận được câu trả lời mơ hồ. Bài này dạy cách đổi một nhờ vả lờ mờ thành vài câu hỏi cụ thể, mỗi câu có một đáp án bạn nhận ra khi thấy nó.",
    openingQuestion:
      "Sếp nhờ bạn 'tìm hiểu thị trường máy pha cà phê'. Việc đầu tiên nên làm trước khi gõ vào công cụ AI là gì?",
    openingOptions: [
      "Viết lại thành vài câu hỏi cụ thể mà mỗi câu có một đáp án rõ",
      "Gõ nguyên câu của sếp và đọc thật kỹ những gì AI trả về",
      "Xin AI liệt kê mọi thông tin có thể có về máy pha cà phê",
      "Nhờ AI viết báo cáo thị trường đầy đủ rồi nộp luôn cho sếp xem trước",
    ],
    correctOption: 0,
    explanation:
      "Câu của sếp là một mong muốn, chưa phải câu hỏi. Bạn cần biết sếp định làm gì với thông tin đó: nhập máy về bán, mua cho quán, hay so giá. Từ đó mới tách ra câu hỏi như 'loại máy nào dưới 15 triệu được dùng nhiều ở quán nhỏ'. Gõ nguyên câu sếp thì nhận về đoạn chung chung. Xin liệt kê mọi thứ chỉ ra một đống dữ kiện không liên quan. Nhờ viết cả báo cáo thì bạn không biết phần nào đã có nguồn, phần nào do AI suy ra.",
    diagram: [
      { label: "Nhờ vả mơ hồ của sếp", arrow: true },
      { label: "Hỏi lại: để làm gì, ai dùng, cần trước khi nào", arrow: true },
      { label: "Viết 3 câu hỏi cụ thể, mỗi câu một đáp án", arrow: true },
      { label: "Đưa từng câu cho công cụ, kiểm nguồn rồi ghép lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Thu ở bộ phận mua hàng được dặn 'tìm hiểu máy pha cà phê cho văn phòng'. Chị nhắn lại sếp hai câu hỏi: ngân sách bao nhiêu và văn phòng có mấy người uống. Nhờ đó chị đổi việc thành ba câu hỏi: loại máy nào hợp 20 người, chi phí vận hành mỗi tháng gồm những khoản nào, và ai bảo hành tại thành phố của chị. Mỗi câu chị kiểm được nguồn riêng, thay vì đọc một bài dài rồi không biết bắt đầu từ đâu.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào cho thấy một câu hỏi còn quá mơ hồ để đưa cho AI?",
        options: [
          "Bạn không hình dung được câu trả lời đúng trông như thế nào",
          "Câu hỏi có nhiều hơn mười chữ nên AI sẽ khó đọc và hiểu",
          "Câu hỏi có nhắc tới một con số, AI thường xử lý số rất kém và dễ sai",
          "Câu hỏi không có chữ 'xin hãy' nên AI sẽ bỏ qua yêu cầu",
        ],
        correct: 0,
        explanation:
          "Nếu bạn không nói được 'đáp án thì sẽ là một con số, một tên, hay một danh sách', bạn cũng không kiểm được câu trả lời. Độ dài câu hỏi không quyết định chất lượng, con số trong câu hỏi thường giúp thu hẹp đáp án, và AI không cần chữ lịch sự để làm việc.",
      },
      {
        question: "Câu nào trong các câu sau là câu hỏi có thể trả lời được?",
        options: [
          "Máy pha cà phê nào dưới 15 triệu hợp cho văn phòng 20 người?",
          "Thị trường máy pha cà phê sẽ ra sao trong những năm sắp tới?",
          "Hãy cho tôi biết mọi điều cần biết về máy pha cà phê hiện nay",
          "Máy pha cà phê là gì và có những ý nghĩa nào trong đời sống?",
        ],
        correct: 0,
        explanation:
          "Câu đầu có ngân sách, số người dùng và kết quả mong muốn là một danh sách máy. Câu về tương lai chỉ nhận được phỏng đoán, câu 'mọi điều' không có điểm dừng, còn câu 'ý nghĩa' là bài luận chứ không phải thứ bạn dùng để quyết định mua.",
      },
      {
        question: "Vì sao nên hỏi lại sếp 'để làm gì' trước khi tìm?",
        options: [
          "Mục đích quyết định thông tin nào đáng tìm và dừng ở đâu",
          "Để sếp thấy bạn chăm hỏi, vì AI không cần biết mục đích",
          "Vì AI sẽ từ chối trả lời nếu bạn không nêu mục đích trước",
          "Để chuyển việc tìm kiếm sang cho sếp tự làm cho nhanh hơn",
        ],
        correct: 0,
        explanation:
          "Cùng một chủ đề, người muốn mua cho văn phòng và người muốn nhập về bán cần thông tin hoàn toàn khác. AI không từ chối vì thiếu mục đích, nhưng bạn sẽ nhận câu trả lời lệch. Hỏi lại cũng không phải để đẩy việc đi, mà để bạn làm đúng việc.",
      },
      {
        question: "Bạn viết ba câu hỏi cho một việc. Cách kiểm nào cho biết bộ câu hỏi đã đủ?",
        options: [
          "Nếu cả ba có đáp án thì sếp có đủ thứ để ra quyết định",
          "Ba câu dài bằng nhau thì công cụ trả lời đều tay",
          "Mỗi câu hỏi đều chứa cụm từ 'thị trường' như sếp đã dùng",
          "Ba câu đều bắt đầu bằng chữ 'tại sao' để có lời giải thích",
        ],
        correct: 0,
        explanation:
          "Phép thử là đặt mình vào vị trí sếp: có ba đáp án này, anh ấy quyết được chưa. Độ dài đều nhau không liên quan gì tới việc đủ thông tin. Lặp lại chữ của sếp giữ nguyên sự mơ hồ, và 'tại sao' cả ba thì bỏ sót các câu cần con số hay tên cụ thể.",
      },
      {
        question: "Sếp chỉ trả lời 'cứ tìm đi, em thấy gì hay thì báo'. Bước hợp lý tiếp theo là gì?",
        options: [
          "Tự đặt giả định, ghi ra giấy và gửi sếp xác nhận trước khi tìm",
          "Tìm thật nhiều rồi gửi sếp toàn bộ để anh ấy tự chọn lấy phần cần",
          "Đợi sếp nghĩ ra mục đích rõ ràng hơn rồi mới bắt đầu làm việc",
          "Nhờ AI đoán giúp sếp đang cần gì rồi làm theo câu trả lời đó",
        ],
        correct: 0,
        explanation:
          "Ghi hai hoặc ba giả định (ngân sách, số người dùng, hạn) rồi nhờ sếp sửa là cách nhanh nhất để có mục đích mà không làm phiền. Gửi một đống thông tin biến việc của bạn thành việc của sếp, chờ đợi làm trễ hạn, còn AI không biết gì về kế hoạch của sếp nên chỉ đoán.",
      },
    ],
    keyTakeaways: [
      "Nhờ vả mơ hồ là mong muốn; câu hỏi tốt là câu bạn nhận ra đáp án khi thấy nó.",
      "Hỏi lại 'để làm gì, ai dùng, cần khi nào' trước khi gõ vào công cụ.",
      "Ba câu hỏi cụ thể tốt hơn một câu hỏi lớn.",
      "Chưa hỏi được sếp thì tự ghi giả định và nhờ xác nhận.",
    ],
    practicePrompt: {
      question:
        "Chị Mai được dặn 'tìm hiểu phần mềm chấm công'. Chị chưa biết công ty có bao nhiêu người. Bước nào nên làm trước?",
      options: [
        "Hỏi số nhân viên và ngân sách, rồi mới viết câu hỏi tìm kiếm",
        "Xin AI liệt kê mọi phần mềm chấm công có trên thị trường",
        "Chọn phần mềm phổ biến nhất rồi báo cáo đó là kết quả",
        "Chờ tới khi sếp hỏi lại hoặc nhắc thêm lần nữa rồi mới bắt đầu tìm hiểu",
      ],
      correct: 0,
      explanation:
        "Số người và ngân sách quyết định loại phần mềm nào đáng xét. Liệt kê mọi thứ cho một danh sách dài không chọn được, chọn cái phổ biến nhất là đoán thay cho tìm hiểu, còn chờ sếp hỏi thì lãng phí thời gian của cả hai.",
    },
    summary: {
      keyIdea: "Câu hỏi tốt là cách ngắn nhất tới câu trả lời dùng được.",
      formula: "Nhờ vả mơ hồ + hỏi lại mục đích = 3 câu hỏi, mỗi câu một đáp án nhận ra được.",
      commonMistake: "Gõ nguyên lời nhờ của sếp vào công cụ rồi ngạc nhiên vì câu trả lời chung chung.",
      action: "Lấy một việc 'tìm hiểu giúp' đang treo và viết lại thành ba câu hỏi cụ thể.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc 'tìm hiểu' thật mà ai đó giao cho bạn hoặc bạn tự đặt ra trong tuần này. Viết ra giấy: dùng để làm gì, ai đọc, cần khi nào. Rồi viết ba câu hỏi cụ thể, mỗi câu kèm một dòng 'đáp án sẽ trông như thế nào'. Chưa cần tìm, chỉ cần có ba câu.",
      secondary: "Gửi ba câu đó cho người giao việc và hỏi 'đủ chưa anh/chị'.",
    },
    sections: [
      {
        type: "lead",
        text: "Một lời nhờ như 'tìm hiểu giúp anh' nghe gọn, nhưng nó giấu cả nửa việc chưa ai nói ra. Bài này cho bạn cách moi nửa việc đó ra trước khi mở công cụ.",
      },
      {
        type: "feynman",
        title: "Đặt câu hỏi đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc hỏi đường. Hỏi 'chỗ này đi đâu được' thì người ta chỉ biết cười. Hỏi 'đi từ đây tới bến xe miền Đông thì rẽ đâu' thì có ngay câu trả lời. Công cụ AI giống người chỉ đường tốt bụng nhưng không biết bạn định tới đâu.",
        columns: ["Thành phần", "Hỏi đường", "Hỏi công cụ AI"],
        rows: [
          ["Điểm đến", "Bến xe miền Đông", "Việc bạn cần quyết định"],
          ["Điểm xuất phát", "Chỗ bạn đứng", "Những gì bạn đã biết, ngân sách, hạn"],
          ["Câu hỏi mơ hồ", "'Chỗ này đi đâu được?'", "'Tìm hiểu thị trường giúp tôi'"],
          ["Câu hỏi tốt", "'Từ đây tới bến xe thì rẽ đâu?'", "'Máy nào dưới 15 triệu hợp văn phòng 20 người?'"],
        ],
        oneLiner: "Nói rõ mình đang đứng đâu và muốn tới đâu - công cụ mới chỉ đường được.",
      },
      { type: "heading", text: "Lời nhờ mơ hồ giấu những gì" },
      {
        type: "paragraph",
        text: "Khi sếp nói 'tìm hiểu máy pha cà phê', trong đầu sếp có thể là mua một máy cho phòng họp, hoặc so sánh để nhập về bán. Sếp chưa nói ra vì với sếp điều đó hiển nhiên. Bạn có hai cách: đoán, hoặc hỏi lại. Đoán sai thì mất cả buổi chiều.",
      },
      {
        type: "flow",
        title: "Từ lời nhờ mơ hồ tới câu hỏi tìm được đáp án",
        steps: [
          { label: "Chép lại nguyên lời nhờ", detail: "Ghi đúng chữ của người giao việc, không diễn giải vội." },
          { label: "Hỏi lại ba điều", detail: "Để làm gì, ai sẽ dùng kết quả, cần trước khi nào. Ba điều đó đủ để thu hẹp việc." },
          { label: "Tách thành ba câu hỏi", detail: "Mỗi câu có một đáp án bạn hình dung được: một con số, một tên, hay một danh sách ngắn." },
          { label: "Gõ từng câu vào công cụ", detail: "Một câu một lần, để kiểm nguồn cho từng đáp án riêng." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu hỏi cho việc máy pha cà phê",
        task: "Sếp muốn mua một máy pha cà phê cho văn phòng 20 người, ngân sách dưới 15 triệu. Lắp câu hỏi để công cụ AI trả lời dùng được.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích",
            options: [
              { text: "Tìm hiểu thị trường máy pha cà phê giúp tôi.", feedback: "Không nói để làm gì nên AI viết đoạn tổng quan về lịch sử và xu hướng, không giúp chọn máy." },
              { text: "Tôi cần chọn một máy cho văn phòng 20 người, ngân sách dưới 15 triệu.", good: true, feedback: "Có người dùng và ngân sách nên AI biết loại máy nào đáng xét, loại nào bỏ." },
            ],
          },
          {
            id: "answer",
            label: "Dạng đáp án",
            options: [
              { text: "Cho tôi biết mọi điều đáng biết.", feedback: "Không có điểm dừng nên AI trả về bài dài, lẫn cả chuyện không liên quan." },
              { text: "Trả lời bằng bảng ba loại máy, mỗi loại ghi phù hợp cho bao nhiêu người.", good: true, feedback: "Đáp án có dạng rõ ràng nên bạn nhìn vào là biết đủ hay thiếu." },
            ],
          },
          {
            id: "honest",
            label: "Chỗ chưa biết",
            options: [
              { text: "Không cần nhắc, cứ trả lời cho đầy đủ.", feedback: "AI có xu hướng lấp chỗ thiếu bằng chi tiết nghe hợp lý, bạn khó biết chỗ nào là suy đoán." },
              { text: "Chỗ nào không chắc hoặc không có thông tin thì ghi 'chưa rõ'.", good: true, feedback: "Chỗ 'chưa rõ' chính là việc bạn cần đi hỏi tiếp, thay vì một chi tiết bịa nằm im." },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "answer", "honest"],
            text: "Bảng gợi ý cho văn phòng 20 người, dưới 15 triệu:\n1. Máy pha tự động nhỏ - phù hợp 10-15 người, cần vệ sinh hằng ngày.\n2. Máy dùng viên nén - phù hợp dưới 10 người, chi phí mỗi ly cao hơn.\n3. Máy pha lọc công suất lớn - phù hợp 20 người, ít chọn vị.\nChưa rõ: chi phí bảo hành tại thành phố của bạn.",
          },
          {
            requires: ["purpose"],
            text: "Với văn phòng 20 người, bạn có thể xét máy tự động, máy viên nén hoặc máy lọc. Máy X hiện bán giá 12,9 triệu và được nhiều văn phòng chọn.\n\n(Đầy đủ nhưng AI tự thêm tên máy và giá không nguồn, không đánh dấu chỗ chưa rõ.)",
          },
          {
            text: "Thị trường máy pha cà phê rất đa dạng, có nhiều dòng từ cơ bản tới cao cấp và ngày càng phổ biến trong đời sống hiện đại...\n\n(Đúng nhưng chung chung, không giúp chọn máy nào.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Hỏi sếp một lần, đỡ làm lại cả buổi",
        text: "Hỏi lại ba điều (để làm gì, ai dùng, cần khi nào) chỉ mất hai phút. Nếu sếp bận, hãy tự ghi giả định và gửi lại: 'em hiểu là mua cho 20 người, dưới 15 triệu, cần trước thứ Năm, đúng không ạ'. Sếp chỉ cần trả lời 'đúng' hoặc sửa một chữ.",
      },
      {
        type: "scenario",
        title: "Sếp nhờ tìm hiểu máy pha cà phê",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: 'Em tìm hiểu giúp anh thị trường máy pha cà phê nhé.' Bạn còn hai tiếng.",
            choices: [
              { label: "Gõ nguyên câu của sếp vào công cụ AI rồi gửi lại kết quả", next: "bad_raw" },
              { label: "Nhắn sếp hỏi ngân sách, số người dùng và hạn cần", next: "s2" },
            ],
          },
          bad_raw: {
            text: "Công cụ trả về hai trang tổng quan. Sếp đọc xong hỏi: 'Vậy mua cái nào?'. Bạn phải làm lại từ đầu và trễ hạn.",
            ending: "bad",
          },
          s2: {
            text: "Sếp trả lời: 20 người, dưới 15 triệu, cần trước thứ Năm. Bạn cần viết câu hỏi cho công cụ.",
            choices: [
              { label: "Viết ba câu hỏi cụ thể: loại máy nào hợp, chi phí mỗi tháng, bảo hành ở đâu", next: "good" },
              { label: "Xin AI liệt kê mọi máy pha cà phê dưới 15 triệu", next: "bad_list" },
            ],
          },
          bad_list: {
            text: "Bạn nhận một danh sách bốn mươi dòng, không biết chọn cái nào cho 20 người. Sếp hỏi lại và bạn lại phải lọc bằng tay.",
            ending: "bad",
          },
          good: {
            text: "Mỗi câu hỏi có một đáp án rõ. Bạn ghép ba đáp án thành nửa trang và gửi sếp trước giờ cơm trưa.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chép nguyên lời nhờ, chưa diễn giải.",
          "Bước 2 - Hỏi hoặc tự ghi: để làm gì, ai dùng, cần khi nào.",
          "Bước 3 - Viết ba câu hỏi, mỗi câu một đáp án hình dung được.",
          "Bước 4 - Đưa từng câu cho công cụ, mỗi lần một câu.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hỏi rõ thì nhận về rõ; hỏi mơ hồ thì nhận về chữ.",
          "Bài sau: công cụ tìm kiếm có AI tổng hợp câu trả lời bằng cách nào và vì sao phải mở nguồn.",
        ],
      },
    ],
  },
  {
    id: 2301,
    slug: "tim-kiem-co-ai-tra-loi-va-dan-nguon",
    title: "Chặng 45, Bài 2: Công cụ tìm kiếm có AI trả lời bằng cách nào",
    subtitle: "Câu trả lời gọn kèm vài liên kết trông rất chắc, nhưng chắc hay không là ở từng liên kết.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn cần một con số để chèn vào email gửi khách. Công cụ trả về một đoạn tổng hợp gọn gàng, cuối đoạn có mấy liên kết đánh số. Nhìn rất đáng tin, nên nhiều người chép luôn. Nhưng đoạn tổng hợp là chữ do AI viết lại, và liên kết chỉ có giá trị khi trang đó thật sự nói điều được gán cho nó. Bài này dạy bạn hiểu công cụ làm việc ra sao để biết chỗ nào cần mở ra xem.",
    openingQuestion:
      "Công cụ tìm kiếm có AI trả lời gọn kèm ba liên kết. Bạn cần con số để gửi khách. Nên làm gì với ba liên kết đó?",
    openingOptions: [
      "Mở từng liên kết để xem trang đó có thật sự nói như vậy không",
      "Coi có liên kết là đã được kiểm chứng và chép số vào email",
      "Đếm số liên kết; càng nhiều liên kết thì câu trả lời càng đúng",
      "Chỉ đọc đoạn tổng hợp vì liên kết chỉ để cho đẹp trang",
    ],
    correctOption: 0,
    explanation:
      "Công cụ thường tìm vài trang liên quan, rồi nhờ AI viết một đoạn tóm tắt dựa trên các trang đó. Khâu viết lại là chỗ AI có thể hiểu sai, bỏ sót điều kiện hoặc gán một ý cho trang không hề nói. Liên kết cho bạn cách kiểm, nhưng chỉ khi bạn bấm vào. Có liên kết không có nghĩa trang nói đúng như câu được gán. Số liên kết nhiều cũng không chứng minh gì, vì nhiều trang có thể chép lại cùng một nguồn.",
    diagram: [
      { label: "Bạn gõ câu hỏi", arrow: true },
      { label: "Công cụ tìm vài trang liên quan", arrow: true },
      { label: "AI đọc và viết lại thành một đoạn tóm tắt", arrow: true },
      { label: "Bạn mở trang được dẫn, tìm câu đúng ý rồi mới dùng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Đạt làm kinh doanh cần nói với khách rằng một loại bao bì giữ hàng được bao lâu. Công cụ tóm tắt 'giữ được 12 tháng' kèm hai liên kết. Anh mở liên kết thứ nhất thì trang chỉ nói 'trong điều kiện kho lạnh' và không nhắc số tháng. Anh hỏi lại nhà cung cấp và nhận số khác. Nếu chép luôn, email gửi khách đã mang một con số không ai bảo đảm.",
    },
    quiz: [
      {
        question: "Đoạn tóm tắt có kèm liên kết khác gì so với danh sách kết quả tìm kiếm thường?",
        options: [
          "Đoạn tóm tắt là chữ AI viết lại từ các trang, không phải chữ gốc",
          "Nó chỉ chứa những câu được chép nguyên văn từ trang web gốc, không hề diễn đạt lại",
          "Nó đã được một người thật kiểm tra từng câu trước khi hiện ra",
          "Nó luôn dùng trang mới nhất nên không bao giờ có số liệu cũ",
        ],
        correct: 0,
        explanation:
          "Danh sách kết quả thường cho bạn trang gốc. Đoạn tóm tắt là AI đọc rồi diễn đạt lại, nên có thể sai lệch. Không có người duyệt từng câu, nó không chép nguyên văn, và việc dùng trang mới nhất không được bảo đảm.",
      },
      {
        question: "Bạn mở liên kết và thấy trang có chủ đề đúng nhưng không có con số được nêu. Bạn nên coi con số đó thế nào?",
        options: [
          "Chưa có bằng chứng, cần tìm nguồn khác hoặc bỏ con số đó ra",
          "Vẫn dùng được vì trang đúng chủ đề thì số chắc cũng đúng",
          "Dùng được nếu có thêm một liên kết khác cùng chủ đề đó, dù trang ấy không có số",
          "Đúng, vì AI không bao giờ tự thêm con số vào câu trả lời",
        ],
        correct: 0,
        explanation:
          "Đúng chủ đề không có nghĩa có đúng con số. AI có thể thêm con số nghe hợp lý để câu trả lời trọn vẹn. Một liên kết thứ hai cùng chủ đề cũng phải chứa con số mới là bằng chứng.",
      },
      {
        question: "Vì sao ba liên kết cùng dẫn về ba trang khác nhau vẫn chưa chắc là ba nguồn độc lập?",
        options: [
          "Ba trang có thể cùng chép lại từ một nguồn gốc duy nhất",
          "Vì công cụ chỉ được phép dẫn tối đa ba liên kết mỗi lần nên bị cắt bớt",
          "Vì các trang web khác nhau thì không thể cùng nói một điều đúng được",
          "Vì liên kết từ công cụ tìm kiếm luôn dẫn tới cùng một trang gốc duy nhất",
        ],
        correct: 0,
        explanation:
          "Một tin hay một số liệu thường được nhiều trang chép lại, và ba bản sao không mạnh hơn một bản gốc. Không có quy định ba liên kết, các trang khác nhau có thể cùng đúng, và liên kết dẫn tới trang riêng biệt.",
      },
      {
        question: "Thời gian mở ba liên kết và tìm đúng câu được gán cho mỗi trang khoảng vài phút. Điều gì biện minh cho việc bỏ thời gian đó?",
        options: [
          "Số liệu gửi ra cho khách mang tên bạn, lỗi sẽ quay lại về bạn",
          "Không có gì, vì AI đã đọc thay bạn nên việc đó là thừa",
          "Nó chỉ đáng làm khi công cụ hiển thị cảnh báo màu đỏ",
          "Nó chỉ cần làm khi câu trả lời dài hơn mười dòng chữ trên màn hình",
        ],
        correct: 0,
        explanation:
          "Người gửi email chịu trách nhiệm về nội dung. AI đọc thay không có nghĩa là đọc đúng. Công cụ không phải lúc nào cũng cảnh báo, và độ dài câu trả lời không liên quan tới độ tin cậy.",
      },
      {
        question: "Trong ba liên kết, một trang mở ra báo lỗi 'không tìm thấy'. Nên xử lý thế nào?",
        options: [
          "Coi ý đó chưa có nguồn và tìm lại bằng cách khác trước khi dùng",
          "Bỏ qua trang đó, hai liên kết còn lại chắc đủ chứng minh mọi ý trong đoạn",
          "Đoán trang đó chắc nói đúng nên chỉ cần đổi sang liên kết khác cho tiện",
          "Yêu cầu AI xác nhận lại, nếu AI nói chắc chắn thì dùng luôn cho nhanh",
        ],
        correct: 0,
        explanation:
          "Một liên kết không mở được thì ý gắn với nó không kiểm được. Hai liên kết còn lại có thể chỉ chứng minh ý khác. Đoán là đi ngược mục đích của việc kiểm, và hỏi lại AI thì nó hay trả lời chắc chắn bất kể có nguồn hay không.",
      },
    ],
    keyTakeaways: [
      "Đoạn tóm tắt là chữ do AI viết lại, không phải chữ gốc của trang.",
      "Liên kết chỉ có giá trị khi bạn mở và thấy đúng câu đó.",
      "Nhiều liên kết chưa chắc là nhiều nguồn độc lập.",
      "Liên kết không mở được nghĩa là ý đó chưa có nguồn.",
    ],
    practicePrompt: {
      question:
        "Công cụ tóm tắt: 'Phí dịch vụ tăng 8% năm nay', kèm một liên kết. Bạn mở ra, trang nói phí tăng ở một số gói. Bước nào đúng?",
      options: [
        "Ghi 'tăng ở một số gói' và hỏi nhà cung cấp gói của mình",
        "Giữ nguyên 8% vì trang có nhắc phí tăng",
        "Làm tròn lên 10% cho an toàn rồi báo sếp",
        "Xoá câu đó đi và không nhắc gì tới phí",
      ],
      correct: 0,
      explanation:
        "Trang chỉ xác nhận một phần: có tăng, nhưng không phải mọi gói và không có con số 8%. Giữ 8% là dùng số không có nguồn, làm tròn lên 10% là bịa thêm, còn xoá hết thì mất thông tin có thật.",
    },
    summary: {
      keyIdea: "Đoạn tóm tắt là lời AI kể lại; liên kết là chỗ bạn kiểm xem nó kể đúng không.",
      formula: "Câu trả lời tổng hợp + mở từng nguồn tìm đúng câu = ý đã có bằng chứng.",
      commonMistake: "Thấy có liên kết đánh số rồi tin rằng câu nào cũng đã được kiểm.",
      action: "Lần tới công cụ trả lời kèm liên kết, mở ít nhất một liên kết và tìm đúng câu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một câu hỏi công việc cần một con số hoặc một dữ kiện. Hỏi công cụ AI có dẫn nguồn, rồi mở từng liên kết và ghi vào ba cột: 'ý AI nêu', 'trang có nói không', 'câu gốc'. Đánh dấu ý nào không tìm thấy trên trang.",
      secondary: "Ghi lại xem trong các ý đó có bao nhiêu ý khớp với trang được dẫn.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu trả lời có liên kết làm ta yên tâm vì trông giống bài có chú thích. Bài này cho bạn cái nhìn bên trong: liên kết đó nói lên điều gì và không nói lên điều gì.",
      },
      {
        type: "feynman",
        title: "Tìm kiếm có AI đơn giản hơn bạn nghĩ",
        intro: "Hãy hình dung một bạn thực tập sinh được nhờ tra cứu. Bạn ấy chạy ra thư viện, rút ba cuốn sách, đọc lướt rồi quay về kể lại cho bạn nghe, kèm tên ba cuốn. Bạn ấy kể trôi chảy, nhưng có thể hiểu sai một đoạn. Muốn chắc, bạn mở cuốn sách ra xem.",
        columns: ["Thành phần", "Thực tập sinh", "Công cụ tìm kiếm có AI"],
        rows: [
          ["Đi tìm", "Rút vài cuốn sách", "Tìm vài trang liên quan"],
          ["Kể lại", "Nói bằng lời của bạn ấy", "Viết đoạn tóm tắt bằng chữ của AI"],
          ["Tên sách", "Để bạn tự mở ra xem", "Liên kết đánh số ở cuối đoạn"],
          ["Có thể sai ở đâu", "Hiểu sai hoặc nhớ nhầm", "Bỏ điều kiện, gán ý cho trang không nói"],
        ],
        oneLiner: "Tóm tắt là lời kể lại, liên kết là cuốn sách - muốn chắc thì mở sách ra.",
      },
      { type: "heading", text: "Đoạn tóm tắt nằm ở đâu trong chuỗi" },
      {
        type: "paragraph",
        text: "Có hai khâu khác nhau: khâu tìm trang và khâu viết lại. Khâu tìm cho bạn trang thật. Khâu viết lại là AI diễn đạt, và đây là chỗ con số có thể bị đổi, điều kiện bị bỏ. Vì vậy sai sót thường nằm giữa trang gốc và câu bạn đọc.",
      },
      {
        type: "flow",
        title: "Một câu trả lời có dẫn nguồn đi qua những bước nào",
        steps: [
          { label: "Bạn gõ câu hỏi", detail: "Câu hỏi càng cụ thể thì trang tìm được càng sát." },
          { label: "Công cụ chọn vài trang", detail: "Đây là khâu tìm: các trang này có thật, dù không phải lúc nào cũng tốt." },
          { label: "AI viết lại thành đoạn gọn", detail: "Đây là khâu diễn đạt: AI có thể bỏ điều kiện hoặc thêm chi tiết nghe hợp lý." },
          { label: "Bạn mở liên kết kiểm lại", detail: "Tìm đúng câu được gán cho trang. Có thì ý có bằng chứng, không có thì coi như chưa kiểm được." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đoạn tóm tắt gửi khách",
        task: "Bạn hỏi công cụ về gói bảo hành của một máy lọc nước. Trang được dẫn chỉ nói: bảo hành 24 tháng cho bộ lọc chính, phụ kiện không nằm trong bảo hành, liên hệ trung tâm để đặt lịch. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Máy lọc nước được bảo hành 24 tháng cho bộ lọc chính." },
          { text: "Phụ kiện đi kèm không nằm trong chính sách bảo hành." },
          { text: "Khách được đổi máy mới miễn phí trong 30 ngày đầu nếu có lỗi.", error: "Trang không nhắc chính sách đổi máy hay mốc 30 ngày. AI tự thêm điều khoản nghe hợp lý, khách sẽ tin là được cam kết." },
          { text: "Khách liên hệ trung tâm bảo hành để đặt lịch kiểm tra." },
          { text: "Thời gian xử lý trung bình là 3 ngày làm việc.", error: "Trang không có con số này. AI bịa thời gian xử lý cho câu trả lời trông trọn vẹn." },
          { text: "Thông tin trên được lấy từ trang chính thức của nhà sản xuất.", error: "Liên kết chỉ dẫn tới một trang, AI không có cơ sở khẳng định trang đó là trang chính thức; cần bạn tự kiểm." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mở nguồn rồi mới dùng",
          text: "Bạn thấy đúng câu trên trang. Bạn biết điều kiện đi kèm. Khi khách hỏi lại, bạn chỉ được chỗ nói. Mất thêm vài phút nhưng không phải xin lỗi sau đó.",
        },
        right: {
          label: "Chép đoạn tóm tắt luôn",
          text: "Nhanh hơn ngay lúc đó. Nhưng một điều kiện bị bỏ hay một con số bịa đi thẳng vào email gửi khách. Khi khách hỏi nguồn, bạn không có gì để chỉ.",
        },
      },
      {
        type: "callout",
        label: "Liên kết không chứng minh gì cho tới khi bạn mở",
        text: "Hai lỗi hay gặp là: trang đúng chủ đề nhưng không có con số được nêu, và nhiều liên kết cùng dẫn về một nguồn gốc. Chính sách, giá, hạn mức hay điều khoản pháp lý thì hỏi nhà cung cấp hoặc bộ phận pháp chế, đừng dựa riêng vào đoạn tóm tắt.",
      },
      {
        type: "scenario",
        title: "Con số cho email gửi khách",
        start: "s1",
        nodes: {
          s1: {
            text: "Công cụ trả lời: 'Bao bì này giữ hàng được 12 tháng', kèm hai liên kết. Bạn cần gửi email cho khách trong 15 phút.",
            choices: [
              { label: "Chép '12 tháng' vào email vì có hai liên kết đi kèm", next: "bad_copy" },
              { label: "Mở liên kết đầu tiên và tìm câu có số 12 tháng", next: "s2" },
            ],
          },
          bad_copy: {
            text: "Khách hỏi lại điều kiện bảo quản. Trang gốc chỉ nói 12 tháng khi để kho lạnh, còn email bạn gửi không nhắc. Khách đặt hàng theo số đó và gặp vấn đề.",
            ending: "bad",
          },
          s2: {
            text: "Trang có câu '12 tháng trong điều kiện kho lạnh'. Liên kết thứ hai không có con số này.",
            choices: [
              { label: "Ghi '12 tháng khi bảo quản kho lạnh' và nêu nguồn cho khách", next: "good" },
              { label: "Bỏ điều kiện cho email gọn rồi ghi 12 tháng", next: "bad_trim" },
            ],
          },
          bad_trim: {
            text: "Email gọn hơn nhưng khách lưu hàng ở nhiệt độ thường. Hàng hỏng trước hạn và khách gọi lại cho bạn.",
            ending: "bad",
          },
          good: {
            text: "Email nêu đủ điều kiện. Khách hài lòng vì rõ ràng và bạn có câu gốc để trả lời nếu bị hỏi.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đọc đoạn tóm tắt như lời kể lại, chưa phải sự thật.",
          "Bước 2 - Mở từng liên kết, tìm đúng câu được gán.",
          "Bước 3 - Ý nào không thấy trên trang thì đánh dấu 'chưa kiểm được'.",
          "Bước 4 - Chỉ đưa vào email những ý đã thấy câu gốc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Liên kết là lối vào để kiểm, không phải con dấu bảo đảm.",
          "Bài sau: thói quen 30 giây - mở nguồn đầu tiên trước khi tin.",
        ],
      },
    ],
  },
  {
    id: 2302,
    slug: "bam-mo-nguon-dau-tien-truoc-khi-tin",
    title: "Chặng 45, Bài 3: Mở nguồn đầu tiên: thói quen 30 giây",
    subtitle: "Mỗi ý có kèm liên kết chỉ cần ba thao tác nhỏ để biết nó có đứng vững không.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn nhận một đoạn tóm tắt từ đồng nghiệp hoặc từ công cụ, cuối mỗi ý có một liên kết. Đọc hết các ý thì nhanh, nhưng kiểm hết thì nghe có vẻ lâu. Thực ra kiểm một ý chỉ cần ba thao tác: mở liên kết, tìm đúng câu được trích, ghi lại khớp hay không. Thói quen nhỏ này là hàng rào rẻ nhất giữa bạn và một báo cáo chứa số liệu không có thật.",
    openingQuestion:
      "Bạn nhận đoạn tóm tắt có năm ý, mỗi ý một liên kết. Bạn chỉ có 10 phút. Cách nào đáng tin nhất?",
    openingOptions: [
      "Kiểm ý quan trọng nhất trước: mở nguồn, tìm đúng câu, ghi lại",
      "Đọc lướt cả năm ý và tin ý nào nghe hợp lý nhất cho mình, bỏ các ý còn lại",
      "Bỏ qua liên kết vì đoạn tóm tắt đã được trình bày rất gọn",
      "Kiểm ngẫu nhiên một ý rồi coi cả năm ý đều đã được kiểm",
    ],
    correctOption: 0,
    explanation:
      "Thời gian hạn chế thì kiểm theo thứ tự quan trọng: ý nào mà nếu sai sẽ gây hậu quả nhất thì kiểm trước. Mỗi ý chỉ cần mở liên kết, tìm đúng câu, ghi lại khớp hay không. Đọc lướt và tin ý hợp lý là chọn theo cảm giác chứ không theo bằng chứng. Bỏ qua liên kết thì mất cách duy nhất để kiểm. Một ý đúng không chứng tỏ bốn ý còn lại đúng, vì mỗi ý có thể bị diễn đạt sai riêng.",
    diagram: [
      { label: "Chọn ý quan trọng nhất cần kiểm", arrow: true },
      { label: "Mở liên kết của ý đó", arrow: true },
      { label: "Tìm đúng câu được trích trên trang", arrow: true },
      { label: "Ghi lại: khớp, lệch hay không tìm thấy" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Hoa chuẩn bị bản tin nội bộ có sáu ý kèm liên kết. Chị kiểm theo thứ tự quan trọng và mất khoảng 40 giây cho mỗi ý. Ở ý thứ ba, trang nói 'dự kiến' còn bản tóm tắt viết 'đã chốt'. Chị sửa lại chữ trước khi gửi. Nếu không mở liên kết, bản tin đã thông báo một việc chưa quyết.",
    },
    quiz: [
      {
        question: "Khi chỉ kiểm được một ý trong năm ý, nên chọn ý nào?",
        options: [
          "Ý mà nếu sai thì hậu quả lớn nhất cho người nhận",
          "Ý dài nhất vì nó nhiều chữ nhất nên chứa nhiều sai sót",
          "Ý đầu tiên vì các ý sau hay lặp lại ý đó",
          "Ý có liên kết dài nhất vì nó có nhiều thông tin chi tiết",
        ],
        correct: 0,
        explanation:
          "Kiểm theo mức rủi ro vì thời gian có hạn. Độ dài ý hay độ dài liên kết không liên quan tới việc ý đó đúng hay sai, và ý đầu tiên không bảo đảm đại diện cho các ý sau.",
      },
      {
        question: "Một con số xuất hiện trong bản tóm tắt nhưng bạn tìm trên trang không thấy. Ghi chú đúng là gì?",
        options: [
          "Không tìm thấy trong nguồn, chưa dùng cho tới khi có nguồn khác",
          "Khớp vì trang cùng chủ đề và con số cũng có vẻ hợp lý",
          "Lệch nhẹ nên làm tròn cho giống con số trên trang",
          "Khớp, vì chắc con số nằm ở phần trang mình chưa kịp đọc",
        ],
        correct: 0,
        explanation:
          "Ba lựa chọn: khớp, lệch, không tìm thấy. Nếu bạn đã đọc kỹ mà không thấy thì đó là 'không tìm thấy' chứ không phải khớp hay lệch. Chắc có ở đâu đó là phỏng đoán, cần tìm kỹ hơn hoặc bỏ số ra.",
      },
      {
        question: "Bản tóm tắt viết 'đã chốt' còn trang gốc viết 'dự kiến'. Đây thuộc loại gì?",
        options: [
          "Lệch: cùng việc nhưng mức chắc chắn đã bị đổi",
          "Khớp: hai chữ có nghĩa gần nhau nên coi như giống",
          "Không tìm thấy: vì trang không có chữ 'đã chốt'",
          "Khớp: chỉ cần số liệu đúng còn chữ dùng thì không quan trọng",
        ],
        correct: 0,
        explanation:
          "Sự khác nhau giữa dự kiến và đã chốt quyết định người đọc có hành động hay không. Đây là lệch chứ không khớp. Nó cũng không phải không tìm thấy vì trang có nhắc tới việc đó.",
      },
      {
        question: "Kiểm một ý mất khoảng 40 giây. Sáu ý mất bao nhiêu và cách nhìn nào hợp lý?",
        options: [
          "Khoảng 4 phút, nhỏ so với hậu quả của một ý sai bị gửi đi",
          "Khoảng 2 phút (= 6 × 20 giây), vì ý sau nhanh hơn ý trước",
          "Khoảng 40 phút (= 6 × 40 × 10), quá lâu nên không đáng kiểm",
          "Khoảng 4 giờ, nên chỉ kiểm khi báo cáo dài hơn chục trang",
        ],
        correct: 0,
        explanation:
          "6 × 40 giây = 240 giây, tức 4 phút. Con số 2 phút đến từ việc tự giả định 20 giây. Con số 40 phút là nhân thừa 10, và 4 giờ là nhầm đơn vị giây với phút. Bốn phút so với hậu quả gửi sai là rất rẻ.",
      },
      {
        question: "Thói quen nào biến việc kiểm nguồn thành việc có thể lặp lại?",
        options: [
          "Ghi mỗi ý một dòng: khớp, lệch hay không tìm thấy, kèm câu gốc",
          "Đọc kỹ rồi nhớ trong đầu xem ý nào đáng ngờ để báo sau",
          "Gạch chân ý nào mình thấy nghe lạ tai theo cảm giác",
          "Chỉ ghi lại những ý đã đúng để bản ghi gọn hơn",
        ],
        correct: 0,
        explanation:
          "Ghi từng ý với kết quả và câu gốc cho bạn một bản ghi người khác xem lại được. Nhớ trong đầu dễ quên, cảm giác 'lạ tai' bỏ sót ý sai nghe rất hợp lý, còn chỉ ghi ý đúng thì mất luôn thông tin về ý chưa kiểm được.",
      },
    ],
    keyTakeaways: [
      "Mỗi ý chỉ cần ba thao tác: mở nguồn, tìm đúng câu, ghi khớp hay không.",
      "Kiểm theo thứ tự quan trọng khi thời gian có hạn.",
      "Có ba kết quả: khớp, lệch, không tìm thấy.",
      "Thay 'dự kiến' bằng 'đã chốt' là một loại lệch hay gặp.",
    ],
    practicePrompt: {
      question:
        "Bạn kiểm một ý: bản tóm tắt viết 'giảm 10% chi phí', trang gốc viết 'giảm tới 10% ở một số hạng mục'. Ghi gì?",
      options: [
        "Lệch: trang nói 'tới 10% ở một số hạng mục', chưa phải toàn bộ",
        "Khớp: cả hai chữ đều có con số 10% nên coi là giống nhau hoàn toàn",
        "Không tìm thấy: vì trang không có chữ 'giảm chi phí'",
        "Khớp: vì 'tới 10%' chính là 'giảm 10%' viết khác đi",
      ],
      correct: 0,
      explanation:
        "'Tới 10% ở một số hạng mục' là mức tối đa và chỉ cho một phần, khác với mức giảm 10% chung. Trùng con số không có nghĩa là khớp nghĩa. Trang có nhắc tới việc giảm nên cũng không phải không tìm thấy.",
    },
    summary: {
      keyIdea: "Ba thao tác, khoảng 30-40 giây mỗi ý, là hàng rào rẻ nhất trước khi tin.",
      formula: "Mở nguồn + tìm đúng câu + ghi khớp/lệch/không thấy = một ý đã kiểm.",
      commonMistake: "Kiểm một ý rồi coi cả bản tóm tắt đã được kiểm.",
      action: "Lần tới nhận bản tóm tắt có liên kết, kiểm ít nhất ý quan trọng nhất và ghi lại kết quả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bản tóm tắt có liên kết mà bạn đang định dùng (của đồng nghiệp hoặc của công cụ). Kiểm ba ý quan trọng nhất theo ba thao tác, ghi vào bảng ba cột: ý, kết quả (khớp, lệch, không thấy), câu gốc. Nếu có ý lệch thì sửa câu chữ trước khi dùng.",
      secondary: "Ghi lại tổng thời gian bạn mất để biết mỗi ý tốn bao lâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Kiểm nguồn nghe như việc nặng nề, nhưng thực ra là ba cú bấm. Bài này biến nó thành thói quen đủ nhỏ để bạn làm mà không thấy phiền.",
      },
      {
        type: "feynman",
        title: "Kiểm nguồn đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc kiểm hoá đơn trước khi thanh toán. Bạn không tính lại cả tháng, chỉ so dòng tiền lớn nhất với hợp đồng. Thấy khớp thì yên tâm, thấy lệch thì hỏi lại. Kiểm nguồn cũng vậy: chọn ý quan trọng nhất và đối chiếu với câu gốc.",
        columns: ["Thành phần", "Kiểm hoá đơn", "Kiểm nguồn AI"],
        rows: [
          ["Cái cần kiểm", "Dòng tiền lớn nhất", "Ý quan trọng nhất"],
          ["Đối chiếu với", "Hợp đồng", "Câu gốc trên trang"],
          ["Kết quả", "Khớp hoặc lệch", "Khớp, lệch hoặc không tìm thấy"],
          ["Khi lệch", "Hỏi lại người lập hoá đơn", "Sửa câu chữ hoặc bỏ ý đó"],
        ],
        oneLiner: "Chọn cái quan trọng nhất, đối chiếu với bản gốc, ghi lại kết quả.",
      },
      { type: "heading", text: "Ba thao tác cho mỗi ý" },
      {
        type: "paragraph",
        text: "Một: bấm mở liên kết của ý cần kiểm. Hai: tìm đúng câu được trích, dùng chức năng tìm chữ trên trang nếu trang dài. Ba: ghi một dòng, khớp, lệch hay không tìm thấy, kèm câu gốc. Ba thao tác này mất chừng nửa phút nếu trang mở ngay.",
      },
      {
        type: "chart",
        title: "Thời gian kiểm nguồn theo số ý cần kiểm",
        caption: "Số liệu minh hoạ. Kéo hai thanh trượt cho khớp với bạn: giây để mở nguồn và giây để tìm đúng câu. Thời gian thật phụ thuộc trang mở nhanh hay chậm và độ dài trang.",
        kind: "line",
        xLabel: "Số ý cần kiểm",
        yLabel: "Phút",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "open", label: "Giây để mở nguồn", min: 5, max: 60, step: 5, value: 10, unit: "giây" },
          { id: "find", label: "Giây để tìm đúng câu", min: 10, max: 120, step: 5, value: 30, unit: "giây" },
        ],
        series: [{ label: "Phút kiểm nguồn", expr: "x * (open + find) / 60" }],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp bạn kiểm nhanh hơn",
        task: "Bạn có bản tóm tắt năm ý kèm liên kết. Lắp yêu cầu để AI giúp chỉ ra chỗ cần kiểm, nhưng việc kiểm vẫn là của bạn.",
        parts: [
          {
            id: "ask",
            label: "Việc nhờ",
            options: [
              { text: "Kiểm giúp tôi xem năm ý này đúng hay sai.", feedback: "AI có thể trả lời chắc chắn mà chưa mở trang nào; bạn không biết kết luận dựa trên gì." },
              { text: "Với mỗi ý, trích nguyên văn câu trong nguồn làm căn cứ, kèm vị trí trong trang.", good: true, feedback: "Có câu trích để bạn đối chiếu tận mắt - và nếu không trích được thì đó là dấu hiệu đáng ngờ." },
            ],
          },
          {
            id: "gap",
            label: "Khi không có căn cứ",
            options: [
              { text: "Nếu không chắc thì cứ đưa ra câu trả lời có khả năng nhất.", feedback: "AI sẽ điền chỗ thiếu bằng chi tiết nghe hợp lý, đúng thứ bạn đang cố tránh." },
              { text: "Ý nào không tìm được câu trong nguồn thì ghi 'không tìm thấy', đừng suy đoán.", good: true, feedback: "Chỗ 'không tìm thấy' cho bạn danh sách ý cần tự kiểm hoặc bỏ." },
            ],
          },
          {
            id: "format",
            label: "Dạng trả lời",
            options: [
              { text: "Viết thành một đoạn văn xuôi cho dễ đọc.", feedback: "Đoạn văn trộn ý đã có căn cứ và ý không, khó nhìn ra ý nào yếu." },
              { text: "Trả lời bằng bảng ba cột: ý, câu trích trong nguồn, khớp hay không.", good: true, feedback: "Bảng cho bạn lướt nhanh và chọn đúng ý cần mở nguồn kiểm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["ask", "gap", "format"],
            text: "| Ý | Câu trích | Khớp? |\n| 1. Phí tăng ở một số gói | \"một số gói dịch vụ điều chỉnh giá\" (đoạn 2) | Khớp |\n| 2. Áp dụng từ quý sau | Không tìm thấy | Cần tự kiểm |\n| 3. Khách cũ được giữ giá | \"khách hiện hữu giữ mức cũ tới hết hợp đồng\" (đoạn 4) | Khớp |",
          },
          {
            requires: ["ask"],
            text: "Ý 1 đúng. Ý 2 có vẻ hợp lý dựa vào xu hướng chung. Ý 3 đúng.\n\n(Có trích dẫn nhưng ý 2 được AI lấp bằng suy đoán và không được đánh dấu.)",
          },
          {
            text: "Cả năm ý đều đúng và phù hợp với thông tin từ các nguồn.\n\n(Kết luận trơn tru nhưng không có căn cứ nào bạn đối chiếu được.)",
          },
        ],
      },
      {
        type: "callout",
        label: "AI giúp chỉ chỗ cần kiểm, không kiểm thay bạn",
        text: "Kể cả khi AI trích câu, bạn vẫn phải thấy câu đó trên trang. AI đôi khi trích một câu nghe rất giống thật nhưng không có trong nguồn. Với thông tin về pháp lý, tài chính hoặc sức khoẻ, hãy hỏi chuyên gia hoặc bộ phận phụ trách thay vì dựa vào bản tóm tắt.",
      },
      {
        type: "scenario",
        title: "Bản tóm tắt sáu ý, mười phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Đồng nghiệp gửi bản tóm tắt sáu ý kèm liên kết, bảo 'em xem rồi gửi sếp giúp chị'. Bạn có 10 phút.",
            choices: [
              { label: "Đọc lướt, thấy ổn rồi chuyển thẳng cho sếp", next: "bad_skim" },
              { label: "Chọn ba ý quan trọng nhất, mở nguồn và ghi khớp, lệch hay không thấy", next: "s2" },
            ],
          },
          bad_skim: {
            text: "Một ý ghi 'đã duyệt' trong khi nguồn ghi 'đề xuất'. Sếp thông báo lại cho cả phòng, rồi phải đính chính.",
            ending: "bad",
          },
          s2: {
            text: "Ý 2 khớp. Ý 4 trang ghi 'đề xuất' chứ không phải 'đã duyệt'. Ý 5 bạn không tìm thấy câu nào.",
            choices: [
              { label: "Sửa ý 4 thành 'đề xuất', đánh dấu ý 5 'chưa kiểm được' và báo lại đồng nghiệp", next: "good" },
              { label: "Xoá hai ý có vấn đề đi cho bản gọn", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Hai ý đó thật ra là thông tin sếp cần. Sếp hỏi sao thiếu, bạn không nhớ nguồn và phải kiểm lại từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhận bản có ghi rõ ý nào đã kiểm và ý nào chưa. Đồng nghiệp cảm ơn vì bạn bắt được lỗi 'đã duyệt'.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xếp các ý theo mức rủi ro nếu sai.",
          "Bước 2 - Mở nguồn, tìm đúng câu được trích.",
          "Bước 3 - Ghi khớp, lệch hoặc không tìm thấy, kèm câu gốc.",
          "Bước 4 - Sửa ý lệch, đánh dấu ý chưa kiểm được.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba thao tác, nửa phút mỗi ý, một hàng rào rất rẻ.",
          "Bài sau: nguồn dẫn nghe rất thật nhưng không hề tồn tại.",
        ],
      },
    ],
  },
  {
    id: 2303,
    slug: "ai-bia-ra-nguon-dan-nhan-biet-truoc",
    title: "Chặng 45, Bài 4: Nguồn dẫn nghe rất thật nhưng không tồn tại",
    subtitle: "Tên nghiên cứu, tên tác giả, số trang - AI có thể viết ra tất cả mà không có thứ nào có thật.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "👻",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đồng nghiệp dán vào báo cáo một dòng: tên nghiên cứu, tên tạp chí, năm xuất bản, rất đầy đủ. Đó là tên AI đưa. Bạn không tìm thấy nghiên cứu đó ở đâu cả. AI có thể viết ra một nguồn dẫn nghe rất thật vì nó giỏi ghép chữ theo khuôn mẫu, chứ không phải vì nó tra cứu được. Bài này cho bạn ba dấu hiệu nghi ngờ và cách tìm lại tên đó bên ngoài công cụ.",
    openingQuestion:
      "Đồng nghiệp dán vào báo cáo tên một nghiên cứu do AI đưa, có tên tạp chí và năm. Bạn nên làm gì trước?",
    openingOptions: [
      "Tìm tên nghiên cứu đó bên ngoài công cụ AI để xem nó có thật không",
      "Tin vì tên có đủ tạp chí, năm và tác giả nên chắc chắn có thật",
      "Hỏi lại chính AI đó 'nghiên cứu này có thật không' và tin câu trả lời",
      "Giữ nguyên trong báo cáo và đợi tới khi có người phản đối",
    ],
    correctOption: 0,
    explanation:
      "Tên có đủ tạp chí, năm, tác giả không chứng minh nó có thật, vì AI biết hình dạng của một nguồn dẫn và có thể tạo ra một cái vừa khuôn. Cách kiểm đáng tin là tìm bên ngoài công cụ: dán tên vào công cụ tìm kiếm thường, vào trang của tạp chí hoặc thư viện. Hỏi lại chính AI thường nhận về câu xác nhận tự tin, vì nó có xu hướng đồng ý với câu hỏi của bạn. Giữ nguyên rồi đợi phản đối là để lỗi đi trước người kiểm.",
    diagram: [
      { label: "Gặp một nguồn dẫn do AI đưa", arrow: true },
      { label: "Soi ba dấu hiệu: quá khớp, không link, không ai nhắc", arrow: true },
      { label: "Tìm tên đó bên ngoài công cụ AI", arrow: true },
      { label: "Không ra thì coi như không có: bỏ hoặc thay nguồn thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Long chuẩn bị bài thuyết trình và nhờ AI gợi ý nghiên cứu về làm việc từ xa. AI đưa năm tên, anh dán hết vào slide. Khi một khán giả hỏi 'cho em xin đường dẫn', anh tìm thì ba trong năm tên không ra kết quả nào. Nếu anh kiểm từ hôm trước bằng cách tìm từng tên, anh đã thay chúng bằng hai nguồn thật.",
    },
    quiz: [
      {
        question: "Vì sao AI có thể đưa ra tên nghiên cứu không có thật?",
        options: [
          "Nó ghép chữ theo khuôn mẫu của nguồn dẫn, không tra cứu thư viện",
          "Vì nó cố ý đánh lừa người dùng để trông như biết nhiều hơn",
          "Vì các nghiên cứu thật luôn bị xoá khỏi dữ liệu của AI",
          "Vì tên nghiên cứu luôn quá dài nên AI phải rút ngắn lại",
        ],
        correct: 0,
        explanation:
          "AI tạo chữ dựa trên khuôn mẫu đã thấy, nên một nguồn dẫn đúng hình dạng có thể được tạo ra mà không tồn tại. Nó không có ý định lừa, dữ liệu không bị xoá cố ý, và độ dài tên không phải nguyên nhân.",
      },
      {
        question: "Dấu hiệu nào khiến một nguồn dẫn đáng nghi?",
        options: [
          "Không có đường dẫn, tên quá khớp với điều bạn cần, tìm không ra",
          "Tên nghiên cứu viết bằng tiếng nước ngoài nên chắc chắn đó là nguồn giả mạo",
          "Nguồn có năm xuất bản trong quá khứ từ vài năm trước trở lên nên chắc hẳn đã lỗi thời",
          "Nguồn có nhiều tác giả cùng đứng tên trong một bài nghiên cứu thì là đáng ngờ",
        ],
        correct: 0,
        explanation:
          "Ba dấu hiệu hay đi cùng nhau: thiếu đường dẫn, nội dung khớp quá mức với điều bạn hỏi, và tìm ngoài công cụ không ra. Tiếng nước ngoài, năm cũ hay nhiều tác giả đều là đặc điểm của nguồn thật.",
      },
      {
        question: "Cách kiểm nào đáng tin nhất để biết một nghiên cứu có thật?",
        options: [
          "Tìm đúng tên trong công cụ tìm kiếm thường hoặc trang của tạp chí",
          "Hỏi lại AI và bắt nó trả lời 'chắc chắn' hay 'không chắc'",
          "Nhờ một công cụ AI khác xác nhận rằng nguồn đó có tồn tại thật hay không",
          "Xem tên có đủ định dạng gồm tên tạp chí, năm xuất bản và số trang hay không",
        ],
        correct: 0,
        explanation:
          "Kiểm phải đi ra ngoài công cụ đã đưa tên. Hỏi lại AI hoặc hỏi AI khác đều là dựa vào cùng một kiểu sinh chữ, còn một tên đúng định dạng vẫn có thể là bịa.",
      },
      {
        question: "Bạn tìm không ra tên nghiên cứu nhưng tìm thấy một bài cùng chủ đề. Nên làm gì?",
        options: [
          "Dùng bài thật tìm được, ghi tên bài đó, bỏ nguồn dẫn không tìm ra",
          "Giữ tên gốc và thêm cả bài tìm được để số nguồn trong báo cáo nhìn nhiều hơn",
          "Sửa tên gốc cho giống hệt bài tìm được để đỡ phải bỏ nguồn đã ghi",
          "Giữ tên gốc vì tìm không ra có thể chỉ do công cụ tìm kiếm còn kém",
        ],
        correct: 0,
        explanation:
          "Chỉ dẫn nguồn bạn đã mở và đọc. Giữ tên không tìm ra là mang nguồn không kiểm được vào báo cáo, sửa tên cho giống là tạo nguồn mới, và đổ cho công cụ tìm kém là cách tự trấn an thay vì kiểm lại bằng cách khác.",
      },
      {
        question: "Đồng nghiệp đã dán nguồn AI đưa vào báo cáo. Cách nói nào vừa đúng vừa giữ hoà khí?",
        options: [
          "Em tìm thử tên này chưa ra, anh/chị có link không, em kiểm cùng",
          "Nguồn này là giả, anh/chị nên thôi dùng AI cho báo cáo từ nay về sau",
          "Em không tin tất cả nguồn mà AI đưa nên em sẽ xoá hết mọi dòng dẫn nguồn",
          "Cứ để đó, đến khi có người hỏi thì mình nói là do AI đưa cho",
        ],
        correct: 0,
        explanation:
          "Nêu sự việc (chưa tìm ra) và mời kiểm cùng, không kết luận vội. Nói 'giả' khi chưa chắc là khẳng định quá, xoá hết gạt bỏ cả nguồn thật, còn để đó thì đẩy lỗi về sau.",
      },
    ],
    keyTakeaways: [
      "Nguồn dẫn đúng khuôn mẫu chưa chắc có thật: AI ghép chữ, không tra thư viện.",
      "Ba dấu hiệu: không có link, khớp quá mức, tìm ngoài công cụ không ra.",
      "Kiểm bằng cách tìm bên ngoài công cụ đã đưa tên.",
      "Không kiểm được thì không dẫn.",
    ],
    practicePrompt: {
      question:
        "AI đưa nguồn: 'Hiệp hội X, Khảo sát năng suất làm việc 2023, trang 14'. Bạn tìm tên hiệp hội thì có, nhưng không có khảo sát nào. Bước nào đúng?",
      options: [
        "Coi khảo sát là chưa tồn tại, bỏ ra hoặc hỏi hiệp hội trực tiếp",
        "Tin vì hiệp hội có thật nên khảo sát cũng chắc có thật",
        "Đổi năm khảo sát thành 2022 rồi tìm lại cho đúng",
        "Giữ nguyên và thêm chữ 'theo AI' nhỏ bên dưới để khỏi bị hỏi thêm",
      ],
      correct: 0,
      explanation:
        "Hiệp hội có thật chưa chứng minh khảo sát có thật; AI hay ghép một tên thật với một tài liệu không có. Đổi năm là chỉnh nguồn cho vừa ý, còn thêm 'theo AI' thì vẫn mang nguồn không kiểm được vào báo cáo.",
    },
    summary: {
      keyIdea: "Nguồn dẫn nghe thật chưa phải nguồn dẫn có thật; chỉ tìm được ngoài công cụ mới là bằng chứng.",
      formula: "Nguồn AI đưa + tìm ngoài công cụ ra kết quả = dùng được; không ra = bỏ.",
      commonMistake: "Hỏi lại chính AI xem nguồn có thật không rồi tin câu trả lời.",
      action: "Trước khi dùng nguồn AI đưa, tìm tên đó trong công cụ tìm kiếm thường.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ công cụ AI gợi ý ba tài liệu về một chủ đề bạn quen thuộc trong công việc. Với từng tài liệu, tìm tên ngoài công cụ AI và ghi 'tìm thấy', 'tìm thấy khác' hoặc 'không tìm thấy', kèm đường dẫn nếu có. Mang bảng này làm mẫu cho lần sau.",
      secondary: "Đếm xem trong ba nguồn có bao nhiêu nguồn tìm được thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Một nguồn dẫn bịa nguy hiểm vì nó trông chuyên nghiệp hơn sự thật. Bài này dạy bạn nhận ra nó trong vài phút.",
      },
      {
        type: "feynman",
        title: "Nguồn bịa đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới một người học thuộc hình dạng của số điện thoại: bắt đầu bằng 09, theo sau là tám chữ số. Bảo người đó 'cho tôi số điện thoại của tiệm bánh', họ đọc ra một dãy đúng khuôn mà chưa chắc gọi được. AI cũng học hình dạng của nguồn dẫn: tên, tạp chí, năm, số trang.",
        columns: ["Thành phần", "Số điện thoại bịa", "Nguồn dẫn bịa"],
        rows: [
          ["Đúng khuôn", "09 và tám chữ số", "Tên, tạp chí, năm, số trang"],
          ["Nghe thật vì", "Đúng hình dạng", "Đúng hình dạng và đúng chủ đề bạn hỏi"],
          ["Cách kiểm", "Gọi thử", "Tìm tên ngoài công cụ"],
          ["Kết quả khi bịa", "Không có ai nghe máy", "Không tìm ra trang nào"],
        ],
        oneLiner: "Đúng khuôn không có nghĩa có thật - muốn biết thì gọi thử số đó.",
      },
      { type: "heading", text: "Ba dấu hiệu nghi ngờ" },
      {
        type: "paragraph",
        text: "Dấu hiệu thứ nhất: không có đường dẫn hay mã nhận dạng để bấm vào. Dấu hiệu thứ hai: nguồn khớp quá mức với điều bạn cần, như thể được đặt làm riêng. Dấu hiệu thứ ba: bạn tìm đúng tên ở nơi khác và không ra kết quả. Một dấu hiệu chưa kết luận, ba dấu hiệu cùng lúc thì rất đáng ngờ.",
      },
      {
        type: "flow",
        title: "Kiểm một nguồn dẫn do AI đưa",
        steps: [
          { label: "Chép đúng tên nguồn", detail: "Chép nguyên tên và tác giả để tìm đúng chữ, dùng dấu ngoặc kép khi tìm." },
          { label: "Tìm ngoài công cụ AI", detail: "Dùng tìm kiếm thường hoặc trang của tạp chí hoặc thư viện; đừng hỏi lại cùng công cụ đã đưa tên." },
          { label: "Đọc kết quả", detail: "Có đúng tên, đúng tác giả, đúng năm không. Lệch một chỗ cũng cần ghi lại." },
          { label: "Quyết định", detail: "Tìm thấy thì mở và đọc phần liên quan; không thấy thì bỏ nguồn đó hoặc hỏi trực tiếp nơi được cho là xuất bản." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý tài liệu mà không bị bịa",
        task: "Bạn cần tài liệu về làm việc từ xa. Lắp yêu cầu sao cho AI không thể tự bịa nguồn.",
        parts: [
          {
            id: "ask",
            label: "Yêu cầu nguồn",
            options: [
              { text: "Cho tôi 5 nghiên cứu có tên và năm về làm việc từ xa.", feedback: "Bắt buộc phải có 5 cái thì AI sẽ lấp chỗ thiếu bằng tên nghe thật mà không tồn tại." },
              { text: "Gợi ý cách tìm tài liệu về chủ đề này; nếu nêu tên cụ thể thì ghi rõ bạn có chắc không.", good: true, feedback: "AI được phép nói 'không chắc', nên chỗ chưa rõ hiện ra thay vì bị lấp." },
            ],
          },
          {
            id: "link",
            label: "Đường dẫn",
            options: [
              { text: "Không cần đường dẫn, chỉ cần tên là đủ.", feedback: "Không có đường dẫn thì bạn mất cách kiểm nhanh nhất và AI không bị ràng buộc." },
              { text: "Chỉ nêu nguồn nếu bạn có đường dẫn hoặc mã nhận dạng để tôi mở; nếu không có thì nói không có.", good: true, feedback: "Có điều kiện kiểm được ngay, nguồn không có đường dẫn sẽ được gắn cờ." },
            ],
          },
          {
            id: "use",
            label: "Cách dùng kết quả",
            options: [
              { text: "Dán thẳng vào báo cáo vì AI đã đưa đủ thông tin.", feedback: "Đủ thông tin không có nghĩa có thật; nguồn chưa mở có thể không tồn tại." },
              { text: "Coi đây là danh sách cần tìm lại; chỉ dẫn những nguồn tôi đã mở và đọc.", good: true, feedback: "Danh sách của AI chỉ là đầu mối; bạn chỉ dẫn nguồn đã tự kiểm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["ask", "link", "use"],
            text: "Tôi không chắc về tên nghiên cứu cụ thể nào nên không muốn nêu tên bịa. Bạn có thể tìm bằng các cụm: 'làm việc từ xa năng suất khảo sát', tại trang của các tổ chức thống kê hoặc thư viện trường đại học. Nếu bạn tìm được tài liệu, tôi giúp tóm tắt phần bạn dán vào.",
          },
          {
            requires: ["use"],
            text: "1. Nguyễn Văn A (2021), Làm việc từ xa và năng suất, Tạp chí Kinh tế và Quản lý.\n2. Trần Thị B (2022), Khảo sát nhân viên văn phòng.\n\n(Nghe rất thật, không có đường dẫn, và bạn tìm không ra.)",
          },
          {
            text: "Đây là 5 nghiên cứu nổi bật về làm việc từ xa:\n1. 'Tác động của làm việc từ xa tới hiệu suất', Tạp chí Quản trị, 2020.\n2. ... (bốn dòng khác cùng dạng)\n\n(Đủ năm nguồn đúng khuôn, có thể không cái nào có thật.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Không kiểm được thì không dẫn",
        text: "Một báo cáo có hai nguồn thật tốt hơn báo cáo có năm nguồn mà ba cái là bịa. Nguồn dẫn về luật, y tế hoặc tài chính thì hỏi chuyên gia hoặc bộ phận pháp chế, đừng dựa vào tên AI đưa.",
      },
      {
        type: "scenario",
        title: "Tên nghiên cứu trong báo cáo của đồng nghiệp",
        start: "s1",
        nodes: {
          s1: {
            text: "Đồng nghiệp gửi báo cáo có dòng: 'Theo nghiên cứu Năng suất làm việc từ xa (Tạp chí Quản trị, 2020)'. Bạn thấy nó đáng nghi vì không có đường dẫn.",
            choices: [
              { label: "Để nguyên vì đồng nghiệp chắc đã kiểm rồi", next: "bad_trust" },
              { label: "Dán tên vào công cụ tìm kiếm thường và xem có ra không", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Sếp đọc báo cáo và hỏi xin nguồn. Không ai tìm ra. Cả phòng mất uy tín trong buổi họp.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm không ra kết quả nào có đúng tên và đúng tạp chí.",
            choices: [
              { label: "Nhắn đồng nghiệp: 'mình tìm chưa ra, bạn còn link không', rồi thay bằng nguồn thật", next: "good" },
              { label: "Hỏi lại AI 'nghiên cứu này có thật không' và tin câu trả lời 'có'", next: "bad_ask" },
            ],
          },
          bad_ask: {
            text: "AI trả lời rất tự tin là có. Bạn để nguyên và nguồn vẫn không ai tìm ra.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp xác nhận lấy tên từ AI. Hai bạn thay bằng một nguồn thật mà bạn đã mở đọc. Báo cáo gọn hơn nhưng vững hơn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Soi ba dấu hiệu: không link, khớp quá mức, tìm không ra.",
          "Bước 2 - Tìm đúng tên ngoài công cụ đã đưa.",
          "Bước 3 - Mở và đọc phần liên quan nếu tìm thấy.",
          "Bước 4 - Không tìm thấy thì bỏ hoặc thay bằng nguồn đã mở.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nguồn dẫn chỉ đáng tin khi bạn mở được và đọc được.",
          "Bài sau: dự án nhỏ trả lời một câu hỏi công việc bằng ba nguồn đã kiểm.",
        ],
      },
    ],
  },
  {
    id: 2304,
    slug: "du-an-nho-mot-cau-hoi-ba-nguon-da-kiem",
    title: "Chặng 45, Bài 5: Dự án nhỏ: trả lời một câu hỏi công việc bằng ba nguồn đã kiểm",
    subtitle: "Ghép cả phần đã học: một câu hỏi thật, ba nguồn đã mở, ba dòng kết luận kèm mức chắc chắn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã học cách hỏi cụ thể, cách đọc liên kết và cách nhận nguồn bịa. Bài này ghép chúng thành một việc nhỏ làm được trong một buổi: lấy một câu hỏi thật của tuần này, tìm bằng AI, kiểm ba nguồn và viết ba dòng kết luận. Điểm khác so với tìm kiếm thường là mỗi dòng kết luận phải nói rõ mức chắc chắn, để người đọc biết chỗ nào đứng vững và chỗ nào còn cần hỏi thêm.",
    openingQuestion:
      "Bạn đã tìm xong một câu hỏi công việc bằng AI và kiểm được ba nguồn. Cách trình bày kết luận nào đáng tin nhất?",
    openingOptions: [
      "Ba dòng kết luận, mỗi dòng kèm nguồn đã mở và mức chắc chắn",
      "Một đoạn văn trôi chảy không nhắc nguồn để người đọc dễ đọc",
      "Dán nguyên câu trả lời của AI kèm lời nhắn 'đã tham khảo'",
      "Một bảng mười dòng dữ kiện, không phân biệt dòng nào đã kiểm",
    ],
    correctOption: 0,
    explanation:
      "Người đọc cần biết ba điều: kết luận là gì, nó dựa vào nguồn nào, và bạn chắc tới đâu. Ba dòng với nguồn đã mở và mức chắc chắn cho họ đủ cả ba. Đoạn văn trôi chảy không nêu nguồn che mất chỗ yếu. Dán nguyên trả lời của AI đẩy việc kiểm cho người đọc. Một bảng dài không phân biệt đã kiểm hay chưa làm ý đã kiểm và ý chưa kiểm trông như nhau.",
    diagram: [
      { label: "Chọn một câu hỏi thật của tuần này", arrow: true },
      { label: "Hỏi AI, yêu cầu nguồn mở được", arrow: true },
      { label: "Mở ba nguồn, ghi khớp, lệch hay không thấy", arrow: true },
      { label: "Viết ba dòng kết luận kèm mức chắc chắn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Vy ở bộ phận nhân sự cần biết cách các công ty nhỏ thường tổ chức đào tạo nhân viên mới. Chị hỏi AI, mở ba nguồn và viết ba dòng. Dòng một chắc vì hai nguồn cùng nói; dòng hai chỉ có một nguồn nên chị ghi 'chắc vừa'; dòng ba chị không tìm thấy nguồn nên ghi 'chưa kiểm được, cần hỏi đồng nghiệp'. Sếp đọc một phút là biết chỗ nào dùng được ngay.",
    },
    quiz: [
      {
        question: "Mức chắc chắn trong mỗi dòng kết luận dùng để làm gì?",
        options: [
          "Cho người đọc biết dòng nào đứng vững và dòng nào cần hỏi thêm",
          "Làm cho bản kết luận trông chuyên nghiệp và dài hơn một chút",
          "Để người đọc không cần mở nguồn bạn đã dùng nữa",
          "Để chứng minh rằng AI đã tự động kiểm tra giúp bạn",
        ],
        correct: 0,
        explanation:
          "Mức chắc chắn là thông tin thật về bằng chứng: bao nhiêu nguồn, nguồn gốc hay chép lại. Nó không để trang trí, không thay cho nguồn, và không chứng minh AI đã kiểm điều gì.",
      },
      {
        question: "Một dòng kết luận chỉ có một nguồn duy nhất và bạn đã mở nguồn đó, khớp. Ghi mức chắc chắn nào là hợp lý?",
        options: [
          "Vừa: có một nguồn đã kiểm, chưa có nguồn thứ hai đối chiếu",
          "Rất cao, vì bạn đã tự tay mở và thấy nguồn đó khớp hẳn",
          "Thấp, vì một nguồn thì luôn luôn không đủ cho mọi trường hợp",
          "Rất cao, vì AI đã gợi ý nguồn đó nên nó nhất định đúng",
        ],
        correct: 0,
        explanation:
          "Một nguồn đã kiểm cho mức vừa: có bằng chứng nhưng chưa đối chiếu được. 'Rất cao' bỏ qua khả năng nguồn đó sai hoặc cũ, còn 'thấp' quá khắt khe với nguồn đã kiểm. Việc AI gợi ý nguồn không làm nguồn đúng hơn.",
      },
      {
        question: "Ba nguồn bạn mở thực ra cùng chép lại một bài gốc. Có bao nhiêu nguồn độc lập và ghi sao?",
        options: [
          "Một nguồn độc lập; ghi mức vừa và nêu rằng ba trang cùng gốc",
          "Ba nguồn độc lập; ghi mức cao vì có ba trang khác nhau",
          "Không nguồn nào độc lập; bỏ dòng kết luận đó ra khỏi bản",
          "Hai nguồn độc lập; ghi mức cao vì hai hơn một",
        ],
        correct: 0,
        explanation:
          "Ba bản sao của một bài gốc chỉ là một nguồn. Ba trang khác nhau chưa phải ba nguồn độc lập; bài gốc vẫn có thật nên không cần bỏ dòng đó, và con số 'hai' không có cơ sở.",
      },
      {
        question: "Bạn chỉ kiểm được hai trong ba dòng kết luận. Cách nào trung thực với người đọc?",
        options: [
          "Ghi dòng thứ ba là 'chưa kiểm được' và nói rõ cần hỏi ai",
          "Gộp dòng thứ ba vào hai dòng kia cho gọn và đủ ba ý",
          "Bỏ dòng thứ ba đi và nộp bản chỉ có hai dòng kết luận",
          "Giữ dòng thứ ba nguyên văn như AI viết vì nghe hợp lý",
        ],
        correct: 0,
        explanation:
          "Nói thẳng chỗ chưa kiểm được cho người đọc biết phải làm gì tiếp. Gộp làm mờ ranh giới giữa ý đã kiểm và chưa kiểm, bỏ đi làm mất thông tin người đọc có thể cần, còn giữ nguyên là đưa ý chưa kiểm vào như thể đã kiểm.",
      },
      {
        question: "Chọn câu hỏi nào là hợp lý cho một dự án nhỏ kiểu này?",
        options: [
          "Một câu hỏi thật tuần này mà kết quả sẽ được ai đó dùng",
          "Một câu hỏi rất rộng về tương lai của cả ngành mà mình đang làm việc",
          "Một câu hỏi bạn đã biết sẵn đáp án từ lâu để thử xem AI trả lời ra sao",
          "Một câu hỏi về luật thuế vì AI luôn trả lời chính xác điểm này cho bạn",
        ],
        correct: 0,
        explanation:
          "Câu hỏi có người dùng kết quả làm bạn kiểm kỹ hơn. Câu hỏi quá rộng không có đáp án kiểm được, câu đã biết sẵn không rèn thói quen kiểm, và luật thuế là loại việc cần hỏi chuyên gia chứ không dựa vào AI.",
      },
      {
        question: "Sau khi xong, thông tin nào đáng ghi lại để dùng cho lần sau?",
        options: [
          "Câu hỏi, nguồn đã mở, ý nào khớp hay lệch và mất bao lâu",
          "Chỉ câu trả lời cuối cùng của AI vì đó là phần đáng giá nhất",
          "Tên công cụ đã dùng và giờ bạn bắt đầu làm việc buổi sáng",
          "Không cần ghi gì vì mỗi lần tìm là một câu hỏi hoàn toàn mới",
        ],
        correct: 0,
        explanation:
          "Bản ghi này cho bạn và đồng nghiệp dùng lại: nguồn nào đã kiểm, ý nào từng lệch, mất bao lâu. Câu trả lời cuối không cho biết đã kiểm gì, tên công cụ và giờ làm không giúp lần sau, còn không ghi thì mỗi lần bạn bắt đầu lại từ đầu.",
      },
    ],
    keyTakeaways: [
      "Một câu hỏi thật, ba nguồn đã mở, ba dòng kết luận.",
      "Mỗi dòng ghi nguồn đã mở và mức chắc chắn.",
      "Ba trang cùng chép một gốc chỉ là một nguồn.",
      "Chỗ chưa kiểm được thì nói thẳng và nêu hỏi ai.",
    ],
    practicePrompt: {
      question:
        "Bạn có ba dòng kết luận. Dòng 1 có hai nguồn độc lập khớp, dòng 2 một nguồn khớp, dòng 3 không tìm thấy nguồn. Mức chắc chắn tương ứng là gì?",
      options: [
        "Dòng 1 cao, dòng 2 vừa, dòng 3 chưa kiểm được",
        "Cả ba dòng đều cao vì đã nhờ công cụ AI tìm",
        "Dòng 1 vừa, dòng 2 cao, dòng 3 thấp",
        "Dòng 1 và 2 cao, dòng 3 bỏ hẳn khỏi bản kết luận",
      ],
      correct: 0,
      explanation:
        "Mức chắc chắn đi theo bằng chứng đã kiểm: hai nguồn độc lập là cao, một nguồn là vừa, không có nguồn là chưa kiểm được. Việc dùng AI không nâng mức chắc chắn của dòng nào, và bỏ dòng 3 làm mất thông tin người đọc cần.",
    },
    summary: {
      keyIdea: "Kết luận tốt nói rõ nó dựa vào đâu và bạn chắc tới mức nào.",
      formula: "Câu hỏi thật + ba nguồn đã mở + ba dòng kết luận kèm mức chắc chắn = bản trả lời dùng được.",
      commonMistake: "Đưa kết luận trôi chảy mà không nói nguồn nào đã kiểm, nguồn nào chưa.",
      action: "Làm đúng dự án này với một câu hỏi thật trong tuần và nộp ba dòng cho người cần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một câu hỏi công việc thật của tuần này (việc có người cần câu trả lời). Hỏi công cụ AI có dẫn nguồn, mở ba nguồn và ghi khớp, lệch hay không thấy. Viết ba dòng kết luận, mỗi dòng kèm đường dẫn nguồn đã mở và một chữ: cao, vừa hoặc chưa kiểm được. Gửi cho người cần.",
      secondary: "Hỏi người nhận xem ba dòng có đủ để họ quyết định chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước dạy từng mảnh. Hôm nay bạn ghép chúng thành một việc nhỏ có thể làm và nộp được ngay trong tuần.",
      },
      {
        type: "feynman",
        title: "Trả lời có nguồn đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới một bác sĩ báo kết quả khám: 'Có thể bị A, dựa vào hai xét nghiệm. Còn một chỉ số chưa rõ, cần làm thêm.' Bác sĩ không nói 'chắc chắn' cho mọi thứ. Bản trả lời nghiên cứu của bạn cũng vậy: mỗi kết luận nói rõ dựa vào đâu và chắc tới đâu.",
        columns: ["Thành phần", "Báo kết quả khám", "Bản trả lời ba dòng"],
        rows: [
          ["Kết luận", "Có thể bị A", "Một dòng trả lời câu hỏi"],
          ["Bằng chứng", "Hai xét nghiệm", "Nguồn đã mở, có đường dẫn"],
          ["Mức chắc chắn", "Khá chắc, còn một chỉ số chưa rõ", "Cao, vừa hoặc chưa kiểm được"],
          ["Bước tiếp", "Làm thêm xét nghiệm", "Hỏi ai hoặc tìm thêm nguồn nào"],
        ],
        oneLiner: "Mỗi kết luận đi kèm bằng chứng và mức chắc chắn, không nói chắc hơn những gì mình kiểm được.",
      },
      { type: "heading", text: "Bốn bước của dự án" },
      {
        type: "paragraph",
        text: "Bước một: chọn câu hỏi thật và viết rõ đáp án sẽ trông thế nào. Bước hai: hỏi AI và đòi nguồn mở được. Bước ba: mở ba nguồn, ghi khớp, lệch hoặc không thấy. Bước bốn: viết ba dòng kết luận. Tổng cộng chừng hai mươi phút nếu câu hỏi đủ hẹp.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi tới ba dòng kết luận",
        steps: [
          { label: "Chọn câu hỏi thật", detail: "Câu hỏi có người đang chờ câu trả lời và có đáp án bạn hình dung được." },
          { label: "Hỏi AI, đòi nguồn mở được", detail: "Yêu cầu nêu đường dẫn, và nói rõ chỗ nào không chắc hoặc không tìm thấy." },
          { label: "Mở ba nguồn và ghi kết quả", detail: "Mỗi nguồn một dòng: khớp, lệch hay không thấy, kèm câu gốc. Nguồn cùng gốc chỉ tính một." },
          { label: "Viết ba dòng kết luận", detail: "Mỗi dòng: kết luận, nguồn, mức chắc chắn (cao, vừa, chưa kiểm được)." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản kết luận trước khi gửi",
        task: "Bạn nhờ AI soạn ba dòng kết luận từ ghi chú của mình. Ghi chú chỉ có: nguồn A nói công ty nhỏ thường kèm cặp nhân viên mới 2 tuần, nguồn B không nhắc thời gian, chưa có nguồn nào nói về chi phí. Đánh dấu câu AI tự thêm.",
        segments: [
          { text: "Nhiều công ty nhỏ kèm cặp nhân viên mới khoảng 2 tuần (nguồn A). Mức chắc chắn: vừa, một nguồn." },
          { text: "Nguồn B xác nhận có kèm cặp nhưng không nêu thời gian. Mức chắc chắn: vừa." },
          { text: "Chi phí đào tạo trung bình là 5 triệu đồng mỗi nhân viên. Mức chắc chắn: cao.", error: "Ghi chú không có nguồn nào về chi phí. Con số 5 triệu và mức 'cao' do AI tự thêm; đúng ra phải ghi 'chưa kiểm được'." },
          { text: "Cả hai nguồn đều là tài liệu chính thức của cơ quan nhà nước.", error: "Ghi chú không nói loại nguồn. AI gán cho nguồn một uy tín mà bạn chưa kiểm." },
          { text: "Chưa tìm thấy nguồn về chi phí, cần hỏi bộ phận kế toán trong công ty." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ba dòng có nguồn và mức chắc chắn",
          text: "Người đọc thấy ngay dòng nào dùng được, dòng nào cần hỏi thêm. Bạn lưu lại được bằng chứng. Nếu bị hỏi, bạn chỉ được vào nguồn.",
        },
        right: {
          label: "Một đoạn văn trôi chảy",
          text: "Đọc dễ hơn nhưng ý đã kiểm và ý chưa kiểm trộn vào nhau. Người đọc không biết chỗ nào yếu. Khi sai, không ai biết sai từ nguồn nào.",
        },
      },
      {
        type: "callout",
        label: "Nói thật về chỗ chưa biết",
        text: "Ghi 'chưa kiểm được, cần hỏi ai' không làm bản kết luận yếu đi; nó làm bản kết luận đáng tin. Với câu hỏi về luật, thuế hay sức khoẻ, hãy ghi rõ cần hỏi chuyên gia hoặc bộ phận pháp chế thay vì kết luận thay họ.",
      },
      {
        type: "scenario",
        title: "Nộp ba dòng cho sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi: 'Các công ty nhỏ thường kèm nhân viên mới thế nào?'. Bạn đã hỏi AI và mở được hai nguồn; dòng thứ ba chưa có nguồn.",
            choices: [
              { label: "Viết một đoạn trôi chảy, dòng thứ ba lấy nguyên câu của AI", next: "bad_smooth" },
              { label: "Viết ba dòng, ghi dòng thứ ba là 'chưa kiểm được'", next: "s2" },
            ],
          },
          bad_smooth: {
            text: "Sếp chuyển câu đó cho phòng khác. Câu đó không có nguồn nào và sau này bị hỏi lại, bạn không chỉ ra được nó từ đâu.",
            ending: "bad",
          },
          s2: {
            text: "Hai nguồn bạn mở cùng chép một bài gốc.",
            choices: [
              { label: "Ghi nguồn đó là một nguồn độc lập và mức chắc chắn 'vừa'", next: "good" },
              { label: "Ghi hai nguồn độc lập và mức chắc chắn 'cao'", next: "bad_count" },
            ],
          },
          bad_count: {
            text: "Sếp dùng mức 'cao' để quyết định. Khi đồng nghiệp chỉ ra hai nguồn cùng gốc, sếp mất niềm tin vào bản tóm tắt của bạn.",
            ending: "bad",
          },
          good: {
            text: "Sếp đọc ba dòng trong một phút, hiểu dòng nào dùng được ngay và cần hỏi ai cho dòng còn lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một câu hỏi thật có người chờ đáp án.",
          "Bước 2 - Hỏi AI và đòi nguồn mở được.",
          "Bước 3 - Mở ba nguồn, ghi khớp, lệch hoặc không thấy.",
          "Bước 4 - Viết ba dòng kết luận với nguồn và mức chắc chắn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba dòng, ba nguồn đã mở, một mức chắc chắn trung thực.",
          "Bài sau: phân biệt nguồn gốc với bài chép lại từ bài chép lại.",
        ],
      },
    ],
  },
];
