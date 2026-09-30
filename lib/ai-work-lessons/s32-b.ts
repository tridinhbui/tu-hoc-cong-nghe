import type { Lesson } from "../lesson-types";

// Chặng 32, bài 6-10. Giáo trình: scripts/curriculum/stage-32.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và cách kiểm.
// Số liệu trong biểu đồ và tình huống là số liệu minh hoạ.

type QuizItem = Lesson["quiz"][number];
// options[0] là đáp án đúng; vị trí được cân lại lúc build.
const Q = (question: string, options: string[], explanation: string): QuizItem => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S32_B_LESSONS: Lesson[] = [
  {
    id: 2045,
    slug: "chuan-bi-cuoc-hop-co-muc-tieu-va-ket-qua",
    title: "Chặng 32, Bài 6: Chuẩn bị cuộc họp có mục tiêu và kết quả cần có",
    subtitle: "Họp không có đích giống đi taxi mà không nói địa chỉ: xe chạy, đồng hồ vẫn nhảy.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một cuộc họp tuần kéo dài một giờ với tám người là tám giờ công của công ty, và phần lớn thời gian đó không tạo ra quyết định nào. Chỉ cần viết ra mục tiêu, điều cần quyết định và danh sách người thật sự cần có mặt, bạn cắt được giờ họp và giữ được tiếng nói của mình. AI giúp phần viết nháp; phần chọn ai cần dự và cần quyết điều gì vẫn là việc của bạn.",
    openingQuestion:
      "Sáng thứ Hai, bạn được giao 'lo cuộc họp tuần' của nhóm 8 người, và cuộc họp tuần nào cũng vượt giờ. Việc đầu tiên nên làm trước khi gửi lời mời là gì?",
    openingOptions: [
      "Viết ra điều cần quyết sau họp và ai phải có mặt để quyết",
      "Đặt phòng họp lớn hơn để ai muốn dự thì cứ vào ngồi cho thoải mái",
      "Gửi lời mời sớm cho cả nhóm, chương trình cụ thể để tới lúc họp tính",
      "Kéo dài buổi họp thêm nửa tiếng để đủ thời gian nghe từng người nói",
    ],
    correctOption: 0,
    explanation:
      "Một cuộc họp kéo dài thường vì không ai biết điểm dừng: chưa có điều cần quyết thì buổi họp chỉ là buổi nói chuyện. Khi bạn viết ra 'sau họp phải quyết được X', ta biết ai cần ngồi đó (người quyết, người nắm dữ kiện) và khi nào xong thì dừng. Đặt phòng lớn hay kéo dài giờ chỉ làm chi phí tăng. Gửi lời mời mà chưa có chương trình thì người nhận không biết chuẩn bị gì nên tới họp tay không.",
    diagram: [
      { label: "Việc đang vướng cần một quyết định", arrow: true },
      { label: "Viết mục tiêu và điều cần quyết", arrow: true },
      { label: "Chọn người cần có mặt, bớt người chỉ cần biết kết quả", arrow: true },
      { label: "Gửi chương trình kèm mốc thời gian", arrow: true },
      { label: "Họp xong có quyết định ghi lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm vận hành 8 người",
      description:
        "Nhóm họp giao ban mỗi thứ Hai một giờ, cả 8 người ngồi từ đầu đến cuối dù mỗi người chỉ có việc liên quan tới 10 phút. Trưởng nhóm đổi cách làm: gửi trước chương trình có ba điều cần quyết, mỗi điều ghi tên người quyết. Ai không có tên trong điều nào thì nhận biên bản thay vì dự. Đây là tình huống minh hoạ, các con số không phải số liệu đo thật.",
    },
    quiz: [
      Q(
        "Trước khi gửi lời mời họp, bạn cần viết ra điều gì trước tiên?",
        [
          "Mục tiêu và quyết định cần có sau khi họp xong",
          "Danh sách những người sẽ ngồi trong phòng họp và chức danh",
          "Giờ bắt đầu và số ghế cần bố trí trong phòng",
          "Lời chào mở đầu do người chủ trì nói lúc vào",
        ],
        "Mục tiêu và điều cần quyết là gốc của cuộc họp: có nó mới biết mời ai và họp bao lâu. Danh sách người, giờ và phòng là hệ quả chứ không phải điểm xuất phát; lời chào mở đầu thì không quyết định cuộc họp có ích hay không.",
      ),
      Q(
        "Ai nên được bớt khỏi lời mời cuộc họp tuần?",
        [
          "Người chỉ cần đọc biên bản sau họp",
          "Người quyết chính, vì họ hay bận nên khó xếp lịch chung",
          "Người nắm số liệu, dù buổi họp sẽ hỏi thẳng về số liệu đó",
          "Người sẽ nhận việc, để họ khỏi hỏi lại vào lúc sau",
        ],
        "Người chỉ cần biết kết quả thì biên bản là đủ, họ đỡ mất một giờ. Người quyết và người nắm số liệu là hai vai không thay được, còn người nhận việc cần nghe trực tiếp để hiểu đúng điều được giao. Bớt nhầm người sẽ làm cuộc họp không quyết được gì.",
      ),
      Q(
        "Họp 8 người trong 1 giờ, giờ công trung bình 100 nghìn đồng (số minh hoạ). Chi phí giờ công là bao nhiêu?",
        [
          "800 nghìn đồng (= 8 người × 1 giờ × 100 nghìn)",
          "100 nghìn đồng (= 1 giờ × 100 nghìn, quên nhân số người dự)",
          "108 nghìn đồng (= 8 + 100, cộng thay vì nhân)",
          "80 nghìn đồng (= 8 × 10, sai đơn vị giờ công)",
        ],
        "Chi phí giờ công là số người nhân số giờ nhân đơn giá: 8 × 1 × 100 = 800 nghìn đồng. Quên nhân số người chỉ ra 100, cộng thay vì nhân ra 108, còn nhầm đơn vị đơn giá ra 80. Con số này chỉ minh hoạ, nhưng cho thấy cắt bớt người là tiết kiệm được tiền thật.",
      ),
      Q(
        "AI viết chương trình họp gồm mười mục, mỗi mục 5 phút, cho buổi họp 30 phút. Bạn nên làm gì?",
        [
          "Tính lại tổng thời gian và cắt mục không cần quyết",
          "Giữ nguyên mười mục vì AI đã cân đối thời gian sẵn cho buổi họp",
          "Chia đều 3 phút cho mỗi mục cho vừa 30 phút họp",
          "Đổi thành họp 50 phút để giữ đủ mười mục đã có",
        ],
        "Mười mục × 5 phút là 50 phút, hơn 30 phút đã định: AI không kiểm được phép cộng này. Cắt mục không cần quyết mới là sửa gốc. Chia đều 3 phút chỉ nén vội mọi mục, còn kéo dài giờ thì làm chi phí họp tăng.",
      ),
      Q(
        "Chương trình họp nào giúp người nhận chuẩn bị tốt nhất?",
        [
          "Mỗi mục ghi điều cần quyết, người nói, số phút và tài liệu cần đọc",
          "Một dòng chung: 'Họp tuần: cập nhật tình hình các việc trong tuần vừa rồi của nhóm'",
          "Danh sách tên mọi người dự họp, xếp theo thứ tự chữ cái",
          "Lời nhắn 'Mọi người chuẩn bị đầy đủ rồi tới họp nhé'",
        ],
        "Người nhận chỉ chuẩn bị được khi biết mình phải quyết gì, ai nói, bao lâu và cần đọc gì. Một dòng chung hay danh sách tên không cho họ điều nào để chuẩn bị, còn lời nhắn 'chuẩn bị đầy đủ' là câu ai cũng hiểu theo cách riêng.",
      ),
    ],
    keyTakeaways: [
      "Viết điều cần quyết trước khi mời ai, vì nó quyết định ai cần có mặt và họp bao lâu.",
      "Người chỉ cần biết kết quả nhận biên bản thay vì ngồi họp.",
      "Chi phí họp là số người × số giờ × đơn giá giờ công.",
      "AI viết nháp chương trình rất nhanh, nhưng phải tự cộng lại thời gian.",
      "Mỗi mục trong chương trình có điều cần quyết, người nói, số phút.",
    ],
    practicePrompt: {
      question:
        "Chị Hà chuẩn bị họp 30 phút để chốt ngày ra mắt sản phẩm. Chương trình nào tốt nhất?",
      options: [
        "Một mục: chốt ngày ra mắt; ghi người quyết, số liệu cần xem, 30 phút",
        "Năm mục cập nhật tiến độ chung, mỗi mục 10 phút, ngày ra mắt bàn nếu còn giờ",
        "Một dòng: 'Thảo luận kế hoạch sản phẩm' và mời cả phòng cho đủ ý kiến",
        "Mười mục nhỏ, mỗi mục 3 phút, ai có ý kiến gì thì nêu ngay vào lúc đó nhé",
      ],
      correct: 0,
      explanation:
        "Mục tiêu duy nhất là chốt ngày nên chương trình chỉ cần một mục có người quyết và dữ kiện. Năm mục cập nhật đẩy điều quan trọng ra cuối, dòng chung không cho ai chuẩn bị, còn mười mục 3 phút không đủ thời gian để bàn sâu mục nào.",
    },
    summary: {
      keyIdea: "Họp tốt bắt đầu bằng một câu: sau họp ta phải quyết được điều gì.",
      formula: "Điều cần quyết → người cần có mặt → chương trình có số phút → gửi trước.",
      commonMistake: "Mời cả nhóm cho 'công bằng', rồi nhận về một buổi họp không ai quyết được gì.",
      action: "Chọn cuộc họp sắp tới của bạn và viết ra điều cần quyết bằng một câu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy cuộc họp sắp tới của bạn (họp thật, kể cả họp tuần). Viết một câu: 'Sau họp phải quyết được ...'. Nhờ AI soạn chương trình nháp, rồi tự cộng số phút và gạch tên những người chỉ cần nhận biên bản. Gửi chương trình đã sửa cho cả nhóm.",
      secondary: "Ngày mai bạn sẽ được hỏi: chương trình có điều cần quyết chưa, và bạn đã bớt được ai?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, 9 giờ: cả nhóm ngồi vào bàn họp tuần, và như mọi tuần, chưa ai biết họp để làm gì ngoài 'cập nhật'. Bài này dạy cách chuẩn bị để buổi họp có đích, có người đúng và có chương trình đủ thời gian.",
      },
      {
        type: "feynman",
        title: "Chuẩn bị họp đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn gọi taxi. Bạn nói địa chỉ trước, tài xế mới chạy đúng đường; không nói thì xe chạy vòng vòng và đồng hồ vẫn nhảy. Cuộc họp cũng vậy: đồng hồ là giờ công của mọi người ngồi đó.",
        columns: ["Thành phần", "Đi taxi", "Cuộc họp"],
        rows: [
          ["Địa chỉ", "Nói điểm đến trước khi xe chạy", "Viết điều cần quyết trước khi gửi lời mời"],
          ["Người trên xe", "Chỉ ai cần đi mới lên xe", "Chỉ ai cần quyết hoặc cung cấp dữ kiện mới dự"],
          ["Đồng hồ", "Mỗi phút chạy là tiền", "Mỗi người × mỗi giờ là giờ công"],
          ["Đến nơi", "Xuống xe, hết chuyến", "Có quyết định ghi lại thì kết thúc"],
        ],
        oneLiner: "Họp có đích thì ngắn, họp không đích thì dài: nói địa chỉ trước khi xe chạy.",
      },
      { type: "heading", text: "Vấn đề: họp nào cũng quá giờ" },
      {
        type: "paragraph",
        text: "Bạn không kiểm soát được tính cách của cả phòng họp, nhưng kiểm soát được mấy dòng chữ gửi trước. Ba câu hỏi đủ dùng: sau họp ta phải quyết được điều gì, ai là người quyết hoặc cầm dữ kiện, và ai chỉ cần biết kết quả. Ba câu này AI không trả lời thay bạn được, vì nó không biết nhóm bạn đang vướng chỗ nào; nhưng nó viết nháp chương trình từ câu trả lời của bạn rất nhanh.",
      },
      {
        type: "chart",
        title: "Cuộc họp tốn bao nhiêu giờ công?",
        caption:
          "Số liệu minh hoạ: kéo giờ họp và đơn giá giờ công (nghìn đồng mỗi giờ) cho khớp công ty bạn. Đường trên tính cả nhóm dự họp; đường dưới giả sử bạn chỉ mời tối đa 5 người cần quyết. Đây là số ước tính, không phải số đo thật.",
        kind: "line",
        xLabel: "Số người được mời",
        yLabel: "Chi phí giờ công (nghìn đồng)",
        x: { from: 1, to: 15, step: 1 },
        params: [
          { id: "hours", label: "Số giờ họp", min: 0.5, max: 3, step: 0.5, value: 1, unit: "giờ" },
          { id: "rate", label: "Giờ công trung bình", min: 50, max: 300, step: 10, value: 100, unit: "nghìn/giờ" },
        ],
        series: [
          { label: "Mời cả nhóm", expr: "x * hours * rate" },
          { label: "Chỉ mời người cần quyết (tối đa 5)", expr: "min(x, 5) * hours * rate" },
        ],
      },
      { type: "heading", text: "Ba dòng làm nên chương trình họp" },
      {
        type: "list",
        items: [
          "Điều cần quyết: một câu, có động từ (chốt ngày ra mắt, chọn nhà cung cấp).",
          "Người quyết và người cầm dữ kiện: ghi tên, không ghi 'các bên liên quan'.",
          "Số phút cho mỗi mục và tài liệu cần đọc trước. Cộng lại phải bằng giờ họp.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chương trình mơ hồ",
          text: "'Họp tuần: cập nhật tình hình.' Không ai biết cần chuẩn bị gì, mỗi người nói một lượt, quyết định bị đẩy sang tuần sau.",
        },
        right: {
          label: "Chương trình có kết quả",
          text: "'Chốt ngày ra mắt: anh Nam (quyết), chị Hà (số liệu), 15 phút, đọc trước bảng tiến độ.' Cuộc họp có đích và có điểm dừng.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn chương trình họp 30 phút",
        task: "Bạn cần họp 30 phút để chốt ngày ra mắt sản phẩm mới. Lắp prompt để AI soạn nháp chương trình.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Soạn chương trình cho cuộc họp về sản phẩm mới.", feedback: "Không có điều cần quyết, AI sẽ liệt kê mục chung chung mà cuộc họp nào cũng có." },
              {
                text: "Cuộc họp 30 phút phải chốt được ngày ra mắt sản phẩm. Người quyết là anh Nam, số liệu do chị Hà giữ.",
                good: true,
                feedback: "Có điều cần quyết, thời lượng và người nắm quyền lẫn số liệu, nên chương trình sẽ xoay quanh đúng một quyết định.",
              },
            ],
          },
          {
            id: "people",
            label: "Người dự",
            options: [
              { text: "Mời cả nhóm 8 người cho công bằng.", feedback: "Sáu người còn lại tốn giờ mà không góp gì vào điều cần quyết; tổng giờ công tăng vô ích." },
              {
                text: "Chỉ mời anh Nam và chị Hà; sáu người còn lại nhận biên bản sau họp.",
                good: true,
                feedback: "Người quyết và người cầm dữ kiện có mặt, người khác vẫn được thông tin mà không mất giờ.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn chương trình",
            options: [
              { text: "Viết dài, đầy đủ và chuyên nghiệp.", feedback: "'Đầy đủ' không đo được; AI sẽ viết mười mục mà bạn không có thời gian họp hết." },
              {
                text: "Tối đa 3 mục, mỗi mục ghi điều cần quyết, người nói, số phút; tổng đúng 30 phút; nêu tài liệu cần đọc trước.",
                good: true,
                feedback: "Khuôn rõ ràng, có ràng buộc thời gian, nên bạn chỉ còn phải cộng lại và gửi đi.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "people", "format"],
            text: "Chương trình họp 30 phút - chốt ngày ra mắt\n\n1. Xem số liệu sẵn sàng (chị Hà, 10 phút) - đọc trước: bảng tiến độ\n2. Chọn ngày ra mắt trong hai phương án (anh Nam quyết, 15 phút)\n3. Ghi quyết định và việc theo sau (5 phút)\n\nNgười dự: anh Nam, chị Hà. Sáu người còn lại nhận biên bản.",
          },
          {
            requires: ["goal"],
            text: "Chương trình họp: chốt ngày ra mắt\n\n1. Cập nhật tình hình chung\n2. Thảo luận các phương án\n3. Ý kiến các bên\n4. Kế hoạch tiếp theo\n5. Hỏi đáp\n\n(Có mục tiêu nhưng chưa nêu người dự và số phút cho từng mục, nên dễ vượt giờ.)",
          },
          {
            text: "Chương trình họp sản phẩm mới\n\n1. Khai mạc và giới thiệu\n2. Báo cáo doanh số quý trước\n3. Chiến lược thương hiệu\n4. Ngân sách quảng cáo\n5. Đối thủ cạnh tranh\n6. Kế hoạch nhân sự\n\n(AI không biết điều cần quyết nên tự thêm sáu mục chung, cộng lại vượt xa 30 phút.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: AI không cộng lại thời gian giùm bạn",
        text: "AI hay viết mười mục 'mỗi mục 5 phút' cho buổi họp 30 phút mà không thấy tổng là 50 phút. Sau khi nhận nháp, hãy tự cộng lại số phút và cắt mục không dẫn tới quyết định nào.",
      },
      {
        type: "scenario",
        title: "Sếp bảo: 'Mời cả nhóm cho công bằng'",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu, bạn chuẩn bị họp thứ Hai để chốt ngày ra mắt. Sếp nhắn: 'Mời cả nhóm 8 người cho công bằng nhé'. Bạn chỉ thấy hai người cần quyết.",
            choices: [
              { label: "Mời cả 8 người theo lời sếp, không nói gì thêm", next: "bad_all" },
              { label: "Trả lời sếp: chương trình chỉ một mục chốt ngày, cần hai người; sáu người còn lại nhận biên bản. Hỏi sếp có đồng ý không", next: "s2" },
            ],
          },
          bad_all: {
            text: "Cuộc họp có 8 người, 3 người nói chuyện khác trong lúc chờ. Đến hết giờ vẫn chưa chốt được ngày, vì người quyết còn phải hỏi lại số liệu.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đồng ý nhưng hỏi: 'Nhỡ có người thắc mắc vì không được mời?' Bạn cần cách xử lý.",
            choices: [
              { label: "Gửi cho sáu người kia một tin ngắn: lý do họp, ai dự, và biên bản sẽ gửi trong ngày", next: "good" },
              { label: "Im lặng, ai hỏi thì tính sau", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Hai người thấy mình bị bỏ ngoài và nhắn cho sếp phàn nàn. Bạn mất nhiều thời gian giải thích hơn cả một buổi họp.",
            ending: "bad",
          },
          good: {
            text: "Sáu người hiểu vì sao mình không dự và biết khi nào nhận biên bản. Cuộc họp 30 phút chốt xong ngày ra mắt và kết thúc đúng giờ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Viết điều cần quyết trước, rồi mới mời người và đặt giờ.",
          "Bài sau: biên bản họp từ bản ghi chú rối.",
        ],
      },
    ],
  },
  {
    id: 2046,
    slug: "bien-ban-hop-tu-ban-ghi-chu-roi",
    title: "Chặng 32, Bài 7: Biên bản họp từ bản ghi chú rối",
    subtitle: "Ghi chú là nguyên liệu, biên bản là món đã nấu: quyết định, việc, người, hạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau họp, ghi chú viết vội có chữ tắt, câu dở dang và mấy dòng chỉ bạn hiểu. Nếu không ai biến nó thành biên bản, tuần sau cả nhóm nhớ mỗi người một kiểu. AI giúp sắp xếp nhanh, nhưng chỉ đúng khi bạn dặn nó không được thêm điều ghi chú không có.",
    openingQuestion:
      "Bạn vừa họp xong với ghi chú viết vội: 'giá - chờ A', 'demo t5?', 'B lo hợp đồng'. Dán ghi chú này cho AI, yêu cầu nào làm biên bản đáng tin nhất?",
    openingOptions: [
      "Lập bảng quyết định, việc, người, hạn; chỗ nào chưa rõ ghi 'chưa rõ'",
      "Viết biên bản thật chuyên nghiệp, đầy đủ và trọn vẹn cho cuộc họp",
      "Suy đoán giúp tôi hạn cho các việc, để biên bản trông hoàn chỉnh hơn",
      "Viết lại thành văn xuôi gọn, tôi sẽ tự tách việc ra sau nếu cần dùng",
    ],
    correctOption: 0,
    explanation:
      "Biên bản có ích khi mỗi việc có người và hạn, còn chỗ ghi chú chưa nói rõ phải được để trống hoặc ghi 'chưa rõ' để bạn hỏi lại. Nếu bảo AI 'suy đoán' hoặc 'viết đầy đủ', nó sẽ điền cho đẹp: 'demo t5?' thành 'demo thứ Năm ngày 17' mà chẳng ai từng nói. Văn xuôi thì che mất ai làm gì, hạn nào.",
    diagram: [
      { label: "Ghi chú gốc viết vội", arrow: true },
      { label: "Dán cho AI cùng khuôn: quyết định, việc, người, hạn", arrow: true },
      { label: "AI ghi 'chưa rõ' ở chỗ thiếu", arrow: true },
      { label: "Bạn đối chiếu với ghi chú, hỏi lại chỗ chưa rõ", arrow: true },
      { label: "Gửi biên bản cho người dự" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm dịch vụ khách hàng",
      description:
        "Sau họp, chị Mai gửi lại ghi chú nguyên xi trong nhóm chat. Ba ngày sau, hai người nhớ hai hạn khác nhau cho cùng một việc. Lần sau chị dùng khuôn bốn cột (quyết định, việc, người, hạn) và gửi trong ngày. Hết tranh cãi 'ai bảo thế', vì ai cũng nhìn cùng một bản. Đây là tình huống minh hoạ.",
    },
    quiz: [
      Q(
        "Một biên bản họp có ích tối thiểu phải có những cột nào?",
        [
          "Quyết định, việc cần làm, người nhận, hạn xong",
          "Ai nói gì, nói lúc mấy giờ, ai đồng ý",
          "Toàn văn lời phát biểu của từng người dự họp",
          "Tên các người dự và cảm nghĩ của người ghi",
        ],
        "Biên bản là để hành động sau họp, nên cần quyết định và việc có người, có hạn. Ai nói gì lúc mấy giờ hay toàn văn lời phát biểu là chép lại buổi họp chứ không giúp ai làm việc, còn cảm nghĩ của người ghi thì không thuộc biên bản.",
      ),
      Q(
        "Ghi chú chỉ có 'demo t5?'. AI viết 'Demo diễn ra thứ Năm, 17/10'. Vấn đề ở đâu?",
        [
          "Dấu hỏi nghĩa là chưa chốt; AI tự thêm ngày và biến thành chắc chắn",
          "Không có vấn đề, vì AI đã suy ra đúng từ 't5' nên tiết kiệm thời gian",
          "Chữ 'demo' là tiếng Anh nên AI chưa hiểu và phải hỏi lại người soạn",
          "Ghi chú thiếu năm nên AI không thể xác định ngày dù có suy đoán",
        ],
        "Dấu hỏi trong ghi chú nghĩa là chưa ai chốt. AI tự đổi thành 'thứ Năm, 17/10' - thêm cả ngày cụ thể chưa ai nói - nên người đọc tưởng đã có lịch. Vấn đề không nằm ở tiếng Anh hay thiếu năm mà ở chỗ nó biến điều chưa chắc thành điều chắc.",
      ),
      Q(
        "Bạn dặn AI thế nào để nó không tự bịa hạn cho các việc?",
        [
          "Ghi 'chưa rõ' ở chỗ ghi chú không nói; không suy đoán",
          "Viết thật đầy đủ để biên bản trông hoàn chỉnh cho sếp",
          "Tự điền hạn hợp lý cho từng việc dựa trên kinh nghiệm",
          "Dùng giọng trang trọng nhất có thể để tránh bị hỏi lại",
        ],
        "Cách chống bịa hiệu quả nhất là cho AI một lối đi khác: được ghi 'chưa rõ' thay vì phải điền. Nếu đòi 'đầy đủ' hay 'hợp lý', nó sẽ lấp chỗ trống bằng điều nghe được, còn giọng trang trọng không liên quan đến độ chính xác.",
      ),
      Q(
        "Sau khi AI lập biên bản, bước nào không nên bỏ?",
        [
          "Đối chiếu từng việc, tên và hạn với ghi chú gốc",
          "Chỉ đọc lướt phần đầu để chắc giọng văn ổn",
          "Hỏi lại AI 'biên bản đã đúng chưa' và tin câu trả lời",
          "Gửi luôn, ai sai thì sẽ nhắn lại sau khi đọc",
        ],
        "Đối chiếu với ghi chú gốc là cách duy nhất phát hiện AI thêm việc hoặc đổi hạn. Đọc lướt đầu bài bỏ sót phần bảng; hỏi lại chính AI thì nó có thể xác nhận luôn điều nó vừa viết; còn 'gửi rồi sửa sau' nghĩa là người đọc sẽ làm theo bản sai.",
      ),
      Q(
        "Ghi chú: 'B lo hợp đồng, hạn chưa chốt'. Dòng nào trong biên bản là đúng?",
        [
          "Việc: lo hợp đồng | Người: B | Hạn: chưa rõ",
          "Việc: lo hợp đồng | Người: B | Hạn: cuối tuần này",
          "Việc: xem lại hợp đồng | Người: cả nhóm | Hạn: chưa rõ",
          "Việc: soạn hợp đồng mới | Người: B | Hạn: chưa rõ",
        ],
        "Dòng đúng giữ nguyên việc, người và ghi hạn là chưa rõ. Dòng thứ hai bịa 'cuối tuần này', dòng thứ ba đổi việc và đổi người, dòng thứ tư đổi 'lo hợp đồng' thành 'soạn hợp đồng mới' - nghĩa khác hẳn dù chỉ đổi vài chữ.",
      ),
    ],
    keyTakeaways: [
      "Biên bản có ích khi mỗi việc có người và hạn.",
      "Cho AI khuôn bốn cột: quyết định, việc, người, hạn.",
      "Dặn AI ghi 'chưa rõ' thay vì suy đoán chỗ ghi chú thiếu.",
      "Dấu hỏi trong ghi chú nghĩa là chưa chốt, không được biến thành khẳng định.",
      "Đối chiếu với ghi chú gốc trước khi gửi, rồi gửi trong ngày.",
    ],
    practicePrompt: {
      question:
        "Ghi chú họp: 'giá - chờ A trả lời; B gửi hợp đồng thứ Sáu; demo tuần sau?'. Biên bản nào trung thực với ghi chú?",
      options: [
        "Giá: chờ A trả lời, chưa quyết. Hợp đồng: B gửi thứ Sáu. Demo: tuần sau, chưa chốt",
        "Giá đã chốt theo A. Hợp đồng: B gửi thứ Sáu. Demo: thứ Ba tuần sau, đã xác nhận xong",
        "Giá: chờ A, hạn trả lời thứ Tư. B gửi hợp đồng thứ Sáu. Demo: thứ Ba tuần sau",
        "Ba việc đã có người nhận và hạn rõ, cả nhóm có thể bắt đầu ngay từ hôm nay",
      ],
      correct: 0,
      explanation:
        "Chỉ bản đầu giữ đúng trạng thái: giá còn chờ, demo chưa chốt. Bản thứ hai biến điều chưa chốt thành đã chốt, bản thứ ba thêm hạn 'thứ Tư' và 'thứ Ba' chẳng ai nói, bản cuối khẳng định cả ba việc đã rõ trong khi ghi chú không nói vậy.",
    },
    summary: {
      keyIdea: "Biên bản là ghi chú đã sắp xếp, không phải ghi chú đã được làm đẹp.",
      formula: "Quyết định + việc + người + hạn; chỗ thiếu ghi 'chưa rõ'.",
      commonMistake: "Để AI điền chỗ trống cho đẹp rồi gửi luôn.",
      action: "Lấy ghi chú họp gần nhất, làm lại thành bảng bốn cột và đánh dấu mọi chỗ 'chưa rõ'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú của cuộc họp gần nhất (thật hoặc nhóm chat). Dán vào công cụ AI công ty cho phép, kèm khuôn bốn cột và dặn 'chỗ ghi chú không nói thì ghi chưa rõ'. Đối chiếu từng dòng với ghi chú gốc, sửa, rồi gửi cho người dự họp.",
      secondary: "Ngày mai bạn sẽ được hỏi: có bao nhiêu dòng 'chưa rõ', và bạn đã hỏi lại ai?",
    },
    sections: [
      {
        type: "lead",
        text: "Họp xong, bạn có nửa trang ghi chú toàn chữ tắt và ba câu bỏ dở. Sếp hỏi 'gửi biên bản chưa?'. Bài này dạy cách biến đống ghi chú đó thành bảng chỉ mất vài phút, mà không để AI thêm những điều chưa ai nói.",
      },
      {
        type: "feynman",
        title: "Biên bản họp đơn giản hơn bạn nghĩ",
        intro:
          "Sau bữa ăn, bạn không giữ cả bếp bừa bộn: nguyên liệu để đó, chỉ còn món ăn lên đĩa. Ghi chú họp là nguyên liệu bừa bộn, biên bản là món đã lên đĩa: ai cũng nhìn ra ngay phần mình.",
        columns: ["Thành phần", "Nấu ăn", "Biên bản họp"],
        rows: [
          ["Nguyên liệu", "Rau, thịt, gia vị lẫn lộn", "Ghi chú, chữ tắt, câu dở dang"],
          ["Công thức", "Công thức nói món gì, bao lâu", "Khuôn: quyết định, việc, người, hạn"],
          ["Đồ thiếu", "Không có thì báo thiếu, không lấy đồ khác", "Chưa rõ thì ghi 'chưa rõ'"],
          ["Nếm thử", "Nếm trước khi mang ra", "Đối chiếu ghi chú gốc trước khi gửi"],
        ],
        oneLiner: "Biên bản là món đã nấu từ ghi chú: chỗ thiếu thì báo thiếu, đừng thêm nguyên liệu lạ.",
      },
      { type: "heading", text: "Vấn đề: ghi chú chỉ bạn đọc được" },
      {
        type: "paragraph",
        text: "Ghi chú tốt cho trí nhớ của bạn; biên bản tốt cho người khác. Khác biệt là biên bản trả lời bốn câu: quyết gì, làm gì, ai làm, khi nào xong. AI sắp xếp bốn cột này rất nhanh, nhưng khi ghi chú thiếu, nó có xu hướng điền cho trọn vẹn. Một hạn 'nghe hợp lý' viết vào biên bản sẽ được cả nhóm xem là hạn thật.",
      },
      {
        type: "flow",
        title: "Từ ghi chú rối đến biên bản gửi đi",
        steps: [
          { label: "Đưa ghi chú gốc", detail: "Dán nguyên ghi chú, kể cả chữ tắt và dấu hỏi. Không tự sửa trước: dấu hỏi là thông tin cho biết việc chưa chốt." },
          { label: "Đưa khuôn", detail: "Nói rõ bốn cột: quyết định, việc, người, hạn. Có khuôn thì AI khỏi phải đoán bạn muốn dạng gì." },
          { label: "Dặn chỗ thiếu", detail: "Ghi 'chỗ nào ghi chú không nói thì ghi chưa rõ, không suy đoán'. Đây là dòng dặn quan trọng nhất." },
          { label: "Đối chiếu", detail: "Đọc từng dòng biên bản, tìm dòng tương ứng trong ghi chú gốc. Dòng nào không có nguồn thì xoá hoặc hỏi lại." },
          { label: "Gửi trong ngày", detail: "Biên bản gửi càng sớm càng ít tranh cãi 'ai bảo thế'. Kèm câu: 'Nếu có chỗ chưa đúng, nhắn tôi trước 5 giờ chiều'." },
        ],
      },
      {
        type: "list",
        items: [
          "Cột 'quyết định': câu nào có chữ 'chốt', 'đồng ý', 'chọn'; còn chỉ bàn thì không ghi là quyết.",
          "Cột 'việc': bắt đầu bằng động từ (gửi, xem lại, hỏi), một việc một dòng.",
          "Cột 'người' và 'hạn': đúng tên người trong ghi chú; hạn không có thì ghi 'chưa rõ'.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập biên bản từ ghi chú rối",
        task: "Ghi chú họp: 'giá - chờ A trả lời; B gửi hợp đồng thứ Sáu; demo tuần sau?; chị Hoa hỏi ngân sách - chưa có'. Lắp prompt để AI lập biên bản.",
        parts: [
          {
            id: "source",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Lập biên bản cho cuộc họp hôm qua.", feedback: "AI không có ghi chú nào để nhìn, nên sẽ bịa cả cuộc họp." },
              {
                text: "Dán nguyên bốn dòng ghi chú gốc, giữ cả dấu hỏi.",
                good: true,
                feedback: "AI làm việc trên dữ liệu thật, và dấu hỏi giữ được thông tin 'chưa chốt'.",
              },
            ],
          },
          {
            id: "shape",
            label: "Khuôn",
            options: [
              { text: "Tóm tắt thành vài đoạn văn cho dễ đọc.", feedback: "Văn xuôi làm mất cột người và hạn; sau họp không ai biết mình phải làm gì." },
              {
                text: "Lập bảng bốn cột: quyết định, việc, người, hạn.",
                good: true,
                feedback: "Khuôn ép mỗi việc có người và hạn, thiếu cột nào là thấy ngay.",
              },
            ],
          },
          {
            id: "gap",
            label: "Chỗ ghi chú thiếu",
            options: [
              { text: "Nếu thiếu thì tự điền giúp cho đầy đủ.", feedback: "Điền cho đủ là mở cửa cho AI bịa hạn và người nhận." },
              {
                text: "Chỗ nào ghi chú không nói thì ghi 'chưa rõ', không suy đoán.",
                good: true,
                feedback: "Cho AI một lối đi khác ngoài việc điền, nên chỗ thiếu hiện ra để bạn hỏi lại.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "shape", "gap"],
            text: "Biên bản họp\n\nQuyết định: chưa có quyết định nào được chốt.\n\nViệc | Người | Hạn\nTrả lời về giá | A | chưa rõ\nGửi hợp đồng | B | thứ Sáu\nHọp demo | chưa rõ | tuần sau, chưa chốt\nBổ sung ngân sách | chưa rõ | chưa rõ (chị Hoa hỏi, chưa có số)",
          },
          {
            requires: ["source", "shape"],
            text: "Biên bản họp\n\nQuyết định | Việc | Người | Hạn\nGiá đã thống nhất | Trả lời về giá | A | thứ Tư\nHợp đồng | Gửi hợp đồng | B | thứ Sáu\nDemo | Họp demo | cả nhóm | thứ Ba tuần sau\n\n(Có bảng đẹp, nhưng thêm hạn thứ Tư và thứ Ba, và ghi 'giá đã thống nhất' trong khi ghi chú nói còn chờ.)",
          },
          {
            text: "Cuộc họp diễn ra trong không khí thảo luận sôi nổi. Các bên đã thống nhất ngân sách 200 triệu đồng và giao hợp đồng cho phòng pháp chế xem xét trong tuần...\n\n(Không có dữ liệu thật nên AI bịa cả không khí họp, ngân sách và phòng ban.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Cảnh giác: chữ 'đã thống nhất'",
        text: "Hai cụm AI hay tự thêm là 'các bên đã thống nhất' và 'đã được xác nhận'. Nếu ghi chú của bạn không có chữ nào tương đương, hãy xoá cụm đó. Một quyết định chưa từng có mà nằm trong biên bản còn tệ hơn không có biên bản.",
      },
      {
        type: "scenario",
        title: "Sếp cần biên bản trong nửa tiếng",
        start: "s1",
        nodes: {
          s1: {
            text: "Họp xong lúc 4 giờ chiều; sếp muốn biên bản trước 5 giờ. Ghi chú của bạn có ba việc, nhưng một việc chỉ ghi 'B lo, hạn?'.",
            choices: [
              { label: "Dán ghi chú và nhờ AI 'viết biên bản đầy đủ', rồi gửi", next: "bad_send" },
              { label: "Dán ghi chú kèm khuôn bốn cột và dặn ghi 'chưa rõ' chỗ thiếu", next: "s2" },
            ],
          },
          bad_send: {
            text: "AI điền hạn 'thứ Sáu' cho việc của B. B đọc biên bản và làm theo hạn đó. Thực ra B nói hạn còn phụ thuộc khách. Việc bị hiểu nhầm hạn, và sếp hỏi vì sao trễ.",
            ending: "bad",
          },
          s2: {
            text: "Biên bản ra đúng bảng, với dòng 'B | lo việc | hạn: chưa rõ'. Còn 20 phút.",
            choices: [
              { label: "Nhắn B hỏi hạn thật, cập nhật biên bản rồi mới gửi", next: "good" },
              { label: "Gửi luôn với dòng 'chưa rõ' mà không hỏi lại ai", next: "bad_lazy" },
            ],
          },
          bad_lazy: {
            text: "Biên bản gửi đúng giờ nhưng dòng 'chưa rõ' nằm đó suốt tuần, không ai chịu trách nhiệm điền. Việc của B trễ mà không ai biết.",
            ending: "bad",
          },
          good: {
            text: "B trả lời hạn là thứ Tư. Bạn cập nhật rồi gửi lúc 4 giờ 40. Cả nhóm có cùng một bản và không ai tranh cãi ai làm gì.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Biên bản tốt là biên bản trung thực với ghi chú: chỗ chưa rõ thì ghi chưa rõ.",
          "Bài sau: tập bắt lỗi trong biên bản do AI tóm tắt.",
        ],
      },
    ],
  },
  {
    id: 2047,
    slug: "bat-loi-bien-ban-hop-ai-tom-tat",
    title: "Chặng 32, Bài 8: Bắt lỗi trong biên bản họp do AI tóm tắt",
    subtitle: "Thầy giáo chấm bài không đọc lại từ đầu: thầy so từng ý với đề bài gốc.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Biên bản AI tóm tắt đọc rất trôi, nên lỗi nằm trong đó khó thấy: một việc giao nhầm người, một hạn không ai nói, một quyết định chưa từng có. Nếu bạn gửi đi, người đọc làm theo. Học cách đối chiếu từng dòng với ghi chú gốc là kỹ năng nhỏ mà tránh được những hiểu lầm lớn giữa các phòng ban.",
    openingQuestion:
      "Biên bản AI viết: 'A sẽ gửi báo giá thứ Sáu'. Ghi chú gốc chỉ có 'báo giá - ai gửi?'. Điều gì đã xảy ra?",
    openingOptions: [
      "AI biến một câu hỏi chưa ai trả lời thành một việc đã giao cho A",
      "AI tóm tắt đúng, chỉ là ghi chú gốc viết quá vắn tắt nên cần bổ sung",
      "AI đã hiểu ý cuộc họp qua ngữ cảnh và điền đúng người, đúng hạn",
      "AI đổi cách diễn đạt nhưng nghĩa gốc vẫn giữ nguyên như ghi chú",
    ],
    correctOption: 0,
    explanation:
      "Ghi chú có dấu hỏi 'ai gửi?': việc chưa có người nhận. AI biến câu hỏi thành khẳng định, cụ thể là gắn cho A và thêm hạn thứ Sáu. Đây không phải diễn đạt lại, mà là thêm thông tin không có trong nguồn. Người đọc tin biên bản, A nhận việc chưa từng nhận, và không ai gửi báo giá vì mỗi người tưởng người khác lo.",
    diagram: [
      { label: "Biên bản do AI viết", arrow: true },
      { label: "Lấy từng dòng có tên, số, hạn", arrow: true },
      { label: "Tìm dòng tương ứng trong ghi chú gốc", arrow: true },
      { label: "Không thấy nguồn: đánh dấu, xoá hoặc hỏi lại", arrow: true },
      { label: "Chỉ gửi bản đã có nguồn cho mọi dòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kinh doanh",
      description:
        "Biên bản của phòng kinh doanh ghi 'chị Lan gửi báo giá thứ Sáu'. Thật ra trong cuộc họp chị Lan chỉ nói 'để em xem thử'. Thứ Sáu khách gọi hỏi báo giá, không ai gửi, và cả hai bên đều tin mình đúng. Sau đó phòng có một quy định nhỏ: mỗi tên và hạn trong biên bản phải khớp một dòng trong ghi chú gốc. Đây là tình huống minh hoạ.",
    },
    quiz: [
      Q(
        "Cách nhanh nhất để kiểm một biên bản do AI tóm tắt là gì?",
        [
          "So từng tên, số và hạn với ghi chú gốc",
          "Đọc lại toàn bộ biên bản xem có trôi chảy không",
          "Nhờ chính AI ấy đọc lại và báo lỗi nếu có",
          "Kiểm giọng văn xem có đủ trang trọng để gửi không",
        ],
        "Lỗi nguy hiểm nhất nằm ở tên, số và hạn: đó là chỗ AI dễ bịa mà vẫn nghe hợp lý. So từng thứ với ghi chú gốc là cách chắc chắn. Đọc cho trôi hay kiểm giọng văn không phát hiện nội dung bịa, còn nhờ chính AI kiểm thì nó có thể xác nhận luôn điều vừa viết.",
      ),
      Q(
        "Biên bản ghi 'Anh Nam duyệt ngân sách 150 triệu đồng'. Ghi chú chỉ ghi 'ngân sách - Nam xem?'. Nên làm gì?",
        [
          "Xoá con số và chuyển thành việc: Nam xem ngân sách, hạn chưa rõ",
          "Giữ nguyên vì Nam đứng tên nên chắc là đã duyệt xong",
          "Giữ nguyên con số vì AI thường đoán số khá sát thực tế",
          "Đổi 'duyệt' thành 'dự kiến duyệt' và vẫn giữ 150 triệu",
        ],
        "Ghi chú không có con số và chưa có việc duyệt: chỉ là câu hỏi 'Nam xem?'. Nên xoá số và ghi việc đúng bản chất. Giữ con số hay chỉ đổi từ 'duyệt' sang 'dự kiến' vẫn để con số bịa trong biên bản, và đứng tên Nam không có nghĩa là đã duyệt.",
      ),
      Q(
        "Loại lỗi nào AI hay mắc nhất khi tóm tắt biên bản họp?",
        [
          "Gắn người và hạn cho việc chưa ai nhận",
          "Viết sai chính tả tiếng Việt ở gần như mọi câu",
          "Bỏ hết các việc cần làm vì nghĩ chúng không quan trọng",
          "Dịch nhầm sang tiếng Anh dù ghi chú viết tiếng Việt",
        ],
        "AI ưa làm cho câu chuyện trọn vẹn: có việc thì phải có người, có hạn. Vì thế lỗi hay gặp là gắn người và hạn cho việc chưa ai nhận. Sai chính tả tràn lan hay dịch nhầm sang tiếng Anh thì hiếm và dễ thấy, còn bỏ hết việc thì bạn nhìn biên bản là biết ngay.",
      ),
      Q(
        "Biên bản có dòng mà bạn không tìm thấy trong ghi chú gốc. Nên làm gì?",
        [
          "Hỏi lại người dự họp; chưa xác nhận được thì xoá dòng",
          "Giữ lại vì có thể bạn quên ghi lúc họp",
          "Giữ lại vì dòng đó viết rất có lý và hợp bối cảnh",
          "Chỉ đổi lời cho nhẹ đi rồi gửi để tránh bị hỏi",
        ],
        "Dòng không có nguồn có thể là điều AI thêm vào. Nếu bạn tin là mình quên ghi, hãy hỏi người dự họp thay vì giữ. Viết có lý không phải bằng chứng đã xảy ra, và làm nhẹ lời chỉ che lỗi chứ không sửa.",
      ),
      Q(
        "Đọc biên bản từ dòng cuối lên dòng đầu giúp gì cho việc kiểm lỗi?",
        [
          "Mắt tách khỏi mạch chuyện trôi chảy và dừng ở từng dòng riêng",
          "Dòng cuối bao giờ cũng là dòng quan trọng nhất nên cần đọc trước",
          "AI viết các dòng cuối cẩn thận nhất nên ít lỗi cần kiểm",
          "Đọc ngược nhanh hơn xuôi vì bạn đã biết kết luận của biên bản",
        ],
        "Đọc xuôi dễ bị cuốn theo mạch chuyện và tự bỏ qua chỗ vô lý. Đọc từng dòng theo thứ tự ngược buộc bạn xét mỗi dòng như một khẳng định riêng và đối chiếu nguồn. Dòng cuối không đặc biệt quan trọng hay ít lỗi hơn, và đọc ngược cũng không nhanh hơn.",
      ),
    ],
    keyTakeaways: [
      "Lỗi hay gặp nhất: AI gắn người và hạn cho việc chưa ai nhận.",
      "Kiểm tên, số, hạn trước; giọng văn để sau.",
      "Mỗi dòng biên bản phải có dòng tương ứng trong ghi chú gốc.",
      "Dấu hỏi trong ghi chú là 'chưa chốt', không phải việc đã giao.",
      "Đọc ngược từng dòng giúp bạn thấy chỗ vô lý mà mạch chuyện che mất.",
    ],
    practicePrompt: {
      question:
        "Ghi chú: 'báo giá - ai gửi?'. Dòng biên bản nào đúng nhất?",
      options: [
        "Việc: gửi báo giá | Người: chưa rõ | Hạn: chưa rõ",
        "Việc: gửi báo giá | Người: A | Hạn: thứ Sáu",
        "Việc: gửi báo giá | Người: cả phòng | Hạn: trong tuần",
        "Việc: báo giá đã gửi | Người: A | Hạn: đã xong",
      ],
      correct: 0,
      explanation:
        "Ghi chú chỉ nói có việc gửi báo giá và chưa biết ai gửi, nên người và hạn phải là chưa rõ. Dòng thứ hai bịa người và hạn, dòng thứ ba biến 'chưa ai nhận' thành 'cả phòng' (nghĩa là không ai), dòng cuối tuyên bố việc đã xong.",
    },
    summary: {
      keyIdea: "Biên bản AI đọc trôi không có nghĩa là đúng: mỗi tên, số, hạn phải có nguồn.",
      formula: "Mỗi dòng biên bản → tìm dòng trong ghi chú gốc → có thì giữ, không thì hỏi hoặc xoá.",
      commonMistake: "Nhờ chính AI 'kiểm lại' rồi tin, thay vì tự đối chiếu với ghi chú.",
      action: "Lấy một biên bản AI viết, gạch chân mọi tên, số, hạn và tìm nguồn cho từng cái.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biên bản họp (AI tóm tắt hoặc bạn tự làm) và ghi chú gốc của nó. Kẻ ba cột: dòng biên bản, nguồn trong ghi chú, kết quả (khớp / không nguồn). Ghi lại có bao nhiêu dòng không có nguồn, rồi sửa hoặc hỏi lại người dự họp.",
      secondary: "Ngày mai bạn sẽ được hỏi: bao nhiêu dòng không có nguồn, và loại lỗi nào lặp lại nhiều nhất?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa nhận biên bản do AI tóm tắt, đọc trôi như sách. Đó chính là lý do phải cẩn thận: văn trôi che lỗi rất tốt. Bài này dạy cách đối chiếu để bắt những dòng AI tự thêm vào.",
      },
      {
        type: "feynman",
        title: "Bắt lỗi biên bản đơn giản hơn bạn nghĩ",
        intro:
          "Thầy giáo chấm bài không đọc bài từ đầu để xem 'có hay không'. Thầy đặt bài cạnh đề gốc và hỏi từng ý: ý này có trong đề không? Biên bản AI cũng là bài làm, ghi chú gốc là đề.",
        columns: ["Thành phần", "Chấm bài", "Kiểm biên bản"],
        rows: [
          ["Đề gốc", "Đề thi của thầy", "Ghi chú họp gốc của bạn"],
          ["Bài làm", "Bài học sinh viết", "Biên bản AI tóm tắt"],
          ["Cách chấm", "Từng ý đối chiếu với đề", "Từng tên, số, hạn tìm nguồn trong ghi chú"],
          ["Ý bịa", "Ý ngoài đề, viết rất tự tin", "Dòng không có nguồn dù nghe rất hợp lý"],
        ],
        oneLiner: "Chấm biên bản như chấm bài: đặt cạnh ghi chú gốc và hỏi từng ý 'nguồn ở đâu?'.",
      },
      { type: "heading", text: "Vấn đề: lỗi nằm trong chỗ nghe hợp lý" },
      {
        type: "paragraph",
        text: "AI không cố ý nói dối; nó làm cho bản tóm tắt trọn vẹn. Khi ghi chú có chỗ trống, nó điền bằng điều nghe hợp lý: một người, một hạn, một quyết định. Cách chống là kiểm theo đúng chỗ nó hay điền: tên người, con số, hạn, và chữ 'đã thống nhất'. Bốn loại này chỉ cần dò nguồn, không cần đọc lại cả biên bản.",
      },
      {
        type: "flow",
        title: "Bốn bước đối chiếu biên bản với ghi chú",
        steps: [
          { label: "Gạch chân", detail: "Gạch chân mọi tên người, con số, ngày, hạn và cụm 'đã thống nhất' trong biên bản. Đó là các chỗ có thể sai." },
          { label: "Tìm nguồn", detail: "Với mỗi chỗ gạch chân, tìm dòng tương ứng trong ghi chú gốc. Đánh dấu tích nếu thấy nghĩa khớp." },
          { label: "Xử lý chỗ không nguồn", detail: "Chỗ nào không thấy nguồn: hỏi người dự họp, nếu chưa xác nhận được thì xoá hoặc ghi 'chưa rõ'." },
          { label: "Gửi bản đã sạch", detail: "Chỉ gửi khi mọi tên, số, hạn đều có nguồn. Ghi chú gốc vẫn giữ lại để đối chiếu nếu ai hỏi." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ghi chú gốc",
          text: "'Báo giá - ai gửi? Demo tuần sau? Ngân sách chưa có. Chị Lan xem thử hợp đồng.'",
        },
        right: {
          label: "Biên bản AI tóm tắt (có lỗi)",
          text: "'A sẽ gửi báo giá thứ Sáu. Demo thứ Ba tuần sau. Ngân sách 150 triệu đã duyệt. Chị Lan chịu trách nhiệm hợp đồng.'",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Đối chiếu biên bản với ghi chú gốc",
        task: "Ghi chú gốc: 'báo giá - ai gửi?; demo tuần sau?; ngân sách chưa có; chị Lan xem thử hợp đồng; họp lại thứ Hai'. Bấm vào những dòng AI tự thêm rồi nộp.",
        segments: [
          { text: "Cuộc họp bàn ba việc: báo giá, demo, hợp đồng, và họp lại vào thứ Hai." },
          {
            text: "Anh A sẽ gửi báo giá cho khách vào thứ Sáu.",
            error: "Ghi chú chỉ hỏi 'ai gửi?' - chưa có người nhận. AI bịa cả người (A) lẫn hạn (thứ Sáu).",
          },
          {
            text: "Việc demo dự kiến vào tuần sau, ngày cụ thể chưa chốt.",
          },
          {
            text: "Ngân sách quảng cáo đã được duyệt ở mức 150 triệu đồng.",
            error: "Ghi chú nói ngân sách CHƯA có. AI đảo kết luận và bịa luôn con số 150 triệu.",
          },
          {
            text: "Chị Lan xem thử hợp đồng, hạn chưa rõ.",
          },
          {
            text: "Cả nhóm đã thống nhất phương án và sẽ triển khai ngay sau họp.",
            error: "Không dòng nào trong ghi chú nói đã thống nhất hay triển khai; đây là câu kết AI thêm cho trọn vẹn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Mẹo: đọc từ dưới lên",
        text: "Đọc biên bản từ dòng cuối lên dòng đầu. Khi không còn bị cuốn theo mạch chuyện, mỗi dòng trở thành một khẳng định riêng cần có nguồn, và câu kết kiểu 'cả nhóm đã thống nhất' lộ ra ngay.",
      },
      {
        type: "scenario",
        title: "Biên bản đã gửi và người nhận việc phản hồi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi biên bản AI viết mà chưa đối chiếu. Sáng hôm sau, anh A nhắn: 'Tôi chưa nhận việc gửi báo giá thứ Sáu nhé'. Khách đã được báo là sẽ nhận báo giá thứ Sáu.",
            choices: [
              { label: "Trả lời A: 'Biên bản do AI viết, lỗi của AI'", next: "bad_blame" },
              { label: "Nhận lỗi, mở ghi chú gốc, gửi cải chính và hỏi cả nhóm ai nhận báo giá", next: "s2" },
            ],
          },
          bad_blame: {
            text: "A và cả nhóm thấy bạn đổ lỗi cho công cụ. Người gửi biên bản là bạn, nên trách nhiệm cũng là của bạn. Lòng tin vào biên bản của bạn giảm rõ.",
            ending: "bad",
          },
          s2: {
            text: "Ghi chú gốc xác nhận: việc chưa có người. Bạn cần làm gì tiếp theo với biên bản và với khách?",
            choices: [
              { label: "Gửi biên bản sửa kèm lời cải chính ngắn, chốt ai gửi báo giá và báo khách hạn mới nếu cần", next: "good" },
              { label: "Âm thầm sửa file biên bản mà không báo ai", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Nhiều người đã đọc bản cũ và vẫn tin A gửi báo giá thứ Sáu. Không ai biết bản mới khác chỗ nào, và khách vẫn chờ.",
            ending: "bad",
          },
          good: {
            text: "Cả nhóm nhận biên bản sửa, thấy rõ chỗ thay đổi, và có người nhận báo giá. Bạn thêm bước đối chiếu vào quy trình từ tuần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Người gửi biên bản là bạn, nên người kiểm cũng là bạn.",
          "Bài sau: theo dõi việc sau họp để không rơi rụng.",
        ],
      },
    ],
  },
  {
    id: 2048,
    slug: "theo-doi-viec-sau-hop-khong-de-roi",
    title: "Chặng 32, Bài 9: Theo dõi việc sau họp để không rơi rụng",
    subtitle: "Nhắc việc giống tưới cây: vừa đủ, đúng lúc, và không làm cây sợ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔔",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Việc rơi rụng sau họp hiếm khi vì người ta lười; thường vì không ai theo dõi và người nhận tưởng việc ưu tiên thấp. Một tin nhắc lịch sự, đúng lúc và một nhịp kiểm ngắn mỗi tuần giữ được phần lớn các việc còn sống. AI soạn tin nhắc rất nhanh, nhưng lúc nào nhắc và nhắc ai vẫn là quyết định của bạn.",
    openingQuestion:
      "Ba việc từ cuộc họp tuần trước chưa ai làm, và hạn đã qua hai ngày. Bước đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Nhắn riêng từng người nhận việc, hỏi vướng gì và cần gì để xong",
      "Gửi cả nhóm một tin nhắc chung, nhắc mọi người nhớ tinh thần trách nhiệm",
      "Báo sếp ngay rằng ba người đã trễ hạn, để sếp nhắc nhở trực tiếp cho hiệu quả",
      "Chờ thêm một tuần xem người nhận việc có tự chủ động báo lại hay không",
    ],
    correctOption: 0,
    explanation:
      "Hỏi riêng người nhận việc, kèm câu 'vướng gì và cần gì', vừa nhắc vừa mở lối cho người ta nói khó khăn mà không bị xấu hổ trước nhóm. Tin nhắc chung dễ bị bỏ qua vì ai cũng nghĩ là nhắc người khác. Báo sếp ngay là leo thang trước khi hỏi. Chờ thêm một tuần chỉ làm việc trễ hơn và giảm sự chú ý của cả nhóm.",
    diagram: [
      { label: "Biên bản gửi, mỗi việc có người và hạn", arrow: true },
      { label: "Nhịp kiểm ngắn giữa chừng", arrow: true },
      { label: "Nhắn riêng: vướng gì, cần gì", arrow: true },
      { label: "Vướng thật thì gỡ hoặc đổi hạn", arrow: true },
      { label: "Việc xong hoặc được báo rõ lý do trễ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm marketing 6 người",
      description:
        "Sau mỗi buổi họp tuần, nhóm có 8-10 việc, nhưng đến cuối tuần chỉ khoảng một nửa xong vì không ai theo dõi. Chị trưởng nhóm thêm một nhịp kiểm 10 phút vào chiều thứ Tư: đọc lại danh sách việc, ai có vướng thì nói. Việc bị bỏ quên giảm rõ. Đây là tình huống minh hoạ, không phải số đo thật.",
    },
    quiz: [
      Q(
        "Nhịp kiểm việc sau họp nên đặt vào lúc nào?",
        [
          "Giữa hạn: vẫn còn thời gian để gỡ vướng",
          "Ngay sau khi hạn đã qua",
          "Chỉ khi có người báo việc bị trễ",
          "Tuần sau, khi có buổi họp tiếp theo",
        ],
        "Kiểm giữa chừng cho phép gỡ vướng khi việc còn cứu được. Kiểm sau hạn thì đã trễ, chờ người tự báo thì người ngại nói sẽ im lặng, còn đợi họp tuần sau thì nhịp kiểm cách xa đến mức việc đã quên.",
      ),
      Q(
        "Tin nhắc việc nào lịch sự và có ích nhất?",
        [
          "Chào chị, việc báo giá hạn thứ Sáu, chị đang vướng gì hoặc cần gì để kịp không ạ?",
          "Nhắc chị lần nữa, việc báo giá đã trễ, nhờ chị làm ngay giúp cho nhóm",
          "Cả nhóm ơi, đừng quên các việc đã giao trong buổi họp tuần trước nhé",
          "Chị làm việc báo giá chưa? Sếp đang hỏi và tôi sắp phải báo cáo đây",
        ],
        "Tin tốt nêu đúng việc, hạn và mở ra câu hỏi vướng gì, cần gì để người nhận nói khó khăn. Tin trách móc làm họ phòng thủ, tin chung chung không ai thấy mình bị nhắc, còn tin dùng sếp làm áp lực khiến quan hệ xấu đi.",
      ),
      Q(
        "Người nhận việc trả lời 'em đang chờ khách gửi file'. Bạn nên làm gì?",
        [
          "Hỏi khi nào file về, ghi vào danh sách và đặt mốc hỏi lại",
          "Ghi 'đang làm' vào danh sách và không hỏi thêm gì nữa",
          "Giục người nhận việc làm nhanh lên vì hạn chỉ còn hai ngày",
          "Báo sếp ngay rằng việc này sẽ trễ vì lỗi của khách hàng",
        ],
        "Chờ file bên ngoài là vướng thật; việc của bạn là ghi lại chờ gì, đến khi nào và hỏi lại theo mốc đó. Ghi 'đang làm' che mất việc đang kẹt. Giục người không làm file về nhanh hơn. Báo sếp ngay thì hơi sớm khi hạn còn hai ngày.",
      ),
      Q(
        "AI soạn tin nhắc việc ghi: 'anh đã hứa hoàn thành hôm nay'. Điều bạn cần kiểm là gì?",
        [
          "Anh đó có thật sự hứa hôm nay không, hay hạn là thứ Sáu",
          "Cách xưng hô 'anh' có trang trọng hơn 'bạn' hay không",
          "Tin nhắn có đủ dài để thể hiện sự chuyên nghiệp hay không",
          "Có nên thêm một biểu tượng vui để tin nhắn thân thiện hơn",
        ],
        "AI hay thêm lời hứa hoặc hạn mà biên bản không có. Kiểm điều có thật (hứa gì, hạn nào) quan trọng hơn kiểm xưng hô hay độ dài. Một lời 'anh đã hứa' sai sẽ làm người nhận thấy bị vu oan và mất thiện chí.",
      ),
      Q(
        "Sau ba lần nhắc mà việc vẫn im lặng, bạn nên làm gì?",
        [
          "Hỏi thẳng trực tiếp; nếu vẫn vướng thì nhờ người quyết ưu tiên",
          "Tự làm thay việc đó ngay trong tối nay và không nói lại chuyện này với ai trong nhóm",
          "Đăng tên người chưa làm lên nhóm chung cho họ thấy áp lực",
          "Xoá việc khỏi danh sách để nhóm khỏi bị áp lực chung",
        ],
        "Việc kẹt lặp lại thường cần người có thẩm quyền quyết ưu tiên, nên hỏi trực tiếp rồi mới đưa lên. Tự làm thay che mất vấn đề gốc, công khai tên gây xấu hổ, còn xoá việc thì để một cam kết biến mất mà không ai quyết.",
      ),
    ],
    keyTakeaways: [
      "Việc rơi rụng thường vì không ai theo dõi, không phải vì lười.",
      "Nhắc riêng, hỏi vướng gì và cần gì, thay vì nhắc chung.",
      "Đặt nhịp kiểm ngắn giữa chừng trước khi hạn qua.",
      "Vướng do bên ngoài thì ghi chờ gì và đặt mốc hỏi lại.",
      "Sau nhiều lần nhắc mà im lặng thì nhờ người quyết ưu tiên.",
    ],
    practicePrompt: {
      question:
        "Chị Thảo có việc 'gửi báo giá' hạn thứ Sáu. Thứ Tư bạn nhắn hỏi, chị trả lời: 'Em chưa bắt đầu, đang bận việc khác'. Phản ứng hợp lý là gì?",
      options: [
        "Hỏi việc khác là gì, nếu không dời được thì bàn đổi hạn hoặc người làm",
        "Trả lời 'không sao, chị cứ từ từ' để giữ quan hệ tốt",
        "Yêu cầu chị bỏ hẳn việc khác và làm ngay báo giá ngay trong hôm nay cho kịp hạn",
        "Báo ngay khách hàng rằng báo giá sẽ trễ mà chưa hỏi chị Thảo",
      ],
      correct: 0,
      explanation:
        "Chị bận việc khác là thông tin cần gỡ: nếu việc kia không dời được thì đổi hạn hoặc chia sẻ việc. Nói 'cứ từ từ' để hạn trôi qua, ép bỏ việc khác có thể phá việc quan trọng hơn, còn báo khách trước khi bàn với chị là hấp tấp.",
    },
    summary: {
      keyIdea: "Theo dõi việc là hỏi đúng lúc, đúng người, bằng câu mở đường chứ không phải câu trách móc.",
      formula: "Việc + người + hạn → nhịp kiểm giữa hạn → 'vướng gì, cần gì' → gỡ hoặc đổi.",
      commonMistake: "Chờ hạn qua rồi mới hỏi, hoặc nhắc chung cho cả nhóm.",
      action: "Chọn ba việc đang trôi và nhắn 'vướng gì, cần gì' cho từng người nhận.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy danh sách việc sau cuộc họp gần nhất. Chọn ba việc chưa xong hoặc chưa ai báo, nhờ AI soạn ba tin nhắn riêng có nêu việc, hạn và câu 'vướng gì, cần gì'. Đọc lại và sửa mọi lời hứa hoặc hạn AI tự thêm, rồi gửi.",
      secondary: "Ngày mai bạn sẽ được hỏi: ai đã trả lời, vướng gì, và bạn đã gỡ được điều nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Năm, bạn nhìn danh sách việc từ buổi họp tuần trước và thấy ba dòng vẫn trống. Không ai nhắn lại, không ai báo trễ. Bài này dạy một cách nhắc lịch sự và một nhịp kiểm ngắn để việc không tự biến mất.",
      },
      {
        type: "feynman",
        title: "Nhắc việc đơn giản hơn bạn nghĩ",
        intro:
          "Tưới cây thì đủ nước, đúng lúc: tưới quá nhiều làm úng, không tưới thì héo. Nhắc việc cũng vậy: nhắc quá dày làm người ta sợ, không nhắc thì việc héo trong im lặng.",
        columns: ["Thành phần", "Tưới cây", "Nhắc việc"],
        rows: [
          ["Đúng lúc", "Tưới khi đất còn ẩm, không chờ héo", "Kiểm giữa hạn, không chờ trễ"],
          ["Đúng liều", "Vừa đủ nước", "Một tin ngắn, một câu hỏi rõ"],
          ["Đúng cách", "Tưới vào gốc, không tưới lá", "Nhắn riêng người nhận, không nhắc chung"],
          ["Đọc dấu hiệu", "Lá vàng là cần chăm", "Im lặng hoặc trả lời mập mờ là cần hỏi thêm"],
        ],
        oneLiner: "Nhắc việc như tưới cây: đúng lúc, vừa đủ, vào gốc, không làm cây sợ.",
      },
      { type: "heading", text: "Vấn đề: cả nhóm nghĩ người khác sẽ nhắc" },
      {
        type: "paragraph",
        text: "Sau họp, người nhận việc tưởng bạn sẽ nhắc, còn bạn tưởng họ sẽ tự làm. Cả hai đều có lý và việc vẫn rơi. Cách gỡ là gán rõ vai: bạn là người theo dõi nhịp, họ là người làm việc. Một nhịp kiểm 10 phút giữa hạn và một tin nhắc riêng thường đủ.",
      },
      {
        type: "flow",
        title: "Nhịp theo dõi việc sau họp",
        steps: [
          { label: "Gửi biên bản có việc, người, hạn", detail: "Trong ngày họp. Đây là mốc để mọi người thấy việc và hạn của mình." },
          { label: "Kiểm giữa hạn", detail: "Khoảng giữa thời gian từ lúc giao đến hạn, xem danh sách 10 phút. Việc nào chưa có dấu hiệu tiến triển thì đánh dấu." },
          { label: "Nhắn riêng: vướng gì, cần gì", detail: "Gửi từng người nhận việc chưa có tiến triển, nêu việc và hạn, hỏi vướng gì và cần gì. Không nhắc chung cả nhóm." },
          { label: "Gỡ vướng hoặc đổi hạn", detail: "Vướng thật thì tìm người gỡ, hoặc đổi hạn và ghi lại. Đổi hạn công khai tốt hơn là lặng lẽ trễ." },
          { label: "Đóng việc", detail: "Việc xong thì đánh dấu xong; việc bỏ thì ghi lý do bỏ. Không để việc trôi mà không ai quyết." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhắc kiểu áp lực",
          text: "'Việc này trễ rồi, làm ngay giúp tôi. Sếp đang hỏi đấy.' Người nhận phòng thủ, bịa lý do hoặc im lặng.",
        },
        right: {
          label: "Nhắc kiểu mở đường",
          text: "'Việc báo giá hạn thứ Sáu, chị đang vướng gì hay cần tôi hỗ trợ gì để kịp không ạ?' Người nhận thấy được giúp và nói khó khăn thật.",
        },
      },
      {
        type: "scenario",
        title: "Ba việc từ tuần trước không ai làm",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Tư, ba việc sau họp vẫn chưa ai báo gì; hạn đều là thứ Sáu. Bạn cần nhắc mà không muốn làm căng.",
            choices: [
              { label: "Gửi cả nhóm: 'Mọi người nhớ hoàn thành việc đúng hạn nhé'", next: "bad_group" },
              { label: "Nhắn riêng từng người: nêu việc, hạn và hỏi 'vướng gì, cần gì'", next: "s2" },
            ],
          },
          bad_group: {
            text: "Không ai thấy tin nhắn này dành cho mình. Thứ Sáu ba việc vẫn trống, và bạn phải bắt đầu lại từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Hai người trả lời có ích: một người chờ file khách, một người quên. Người thứ ba vẫn im lặng đến chiều.",
            choices: [
              { label: "Nhắn lại người thứ ba sáng mai; nếu vẫn im thì gọi hoặc gặp trực tiếp hỏi vướng gì", next: "s3" },
              { label: "Báo sếp là người này không làm việc", next: "bad_boss" },
            ],
          },
          bad_boss: {
            text: "Sếp hỏi bạn đã trao đổi với người đó chưa; bạn chưa gọi. Người kia thấy bị báo cáo sau lưng và quan hệ xấu đi.",
            ending: "bad",
          },
          s3: {
            text: "Gọi trực tiếp, người thứ ba nói: 'Em không hiểu việc này cần làm gì, ngại hỏi'. Bạn giải thích lại chỉ trong năm phút.",
            choices: [
              { label: "Ghi lại việc đã rõ, đặt mốc kiểm thứ Năm và cập nhật danh sách", next: "good" },
              { label: "Nói 'lần sau hỏi sớm nhé' rồi không ghi gì thêm", next: "bad_close" },
            ],
          },
          bad_close: {
            text: "Không có mốc kiểm, người đó lại im. Đến thứ Sáu việc vẫn chưa xong, và nguyên nhân giống hệt lần trước.",
            ending: "bad",
          },
          good: {
            text: "Ba việc đều có tiến triển: một việc đổi hạn công khai, hai việc xong trước thứ Sáu. Danh sách việc có ghi trạng thái, không còn dòng nào trôi.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin nhắc việc riêng cho anh Bình",
        task: "Việc 'gửi báo giá cho khách Minh Phát' của anh Bình có hạn thứ Sáu; hôm nay thứ Tư và chưa có tin gì. Lắp prompt để AI soạn tin nhắc.",
        parts: [
          {
            id: "fact",
            label: "Dữ kiện",
            options: [
              { text: "Nhắc anh Bình làm việc của anh ấy.", feedback: "AI không biết việc gì, hạn nào; nó sẽ bịa hoặc viết chung chung." },
              {
                text: "Việc: gửi báo giá cho khách Minh Phát; hạn thứ Sáu; hôm nay thứ Tư; chưa có phản hồi.",
                good: true,
                feedback: "Đủ việc, hạn, hiện trạng: AI chỉ việc viết quanh dữ kiện thật.",
              },
            ],
          },
          {
            id: "tone",
            label: "Giọng",
            options: [
              { text: "Nhắc thật mạnh để anh ấy làm ngay.", feedback: "Giọng ép làm người nhận phòng thủ và ít nói khó khăn thật." },
              {
                text: "Lịch sự, ngắn dưới 60 chữ, không trách, xưng 'em' - 'anh'.",
                good: true,
                feedback: "Giọng và độ dài rõ; tin ngắn dễ được đọc và trả lời.",
              },
            ],
          },
          {
            id: "question",
            label: "Câu hỏi cuối",
            options: [
              { text: "Kết bằng 'Anh nhớ làm đúng hạn nhé'.", feedback: "Câu này là lời dặn, không mở cho anh Bình nói mình đang vướng gì." },
              {
                text: "Kết bằng câu hỏi: 'Anh đang vướng gì hoặc cần em hỗ trợ gì để kịp thứ Sáu không?'",
                good: true,
                feedback: "Một câu hỏi mở đường: nhắc và giúp cùng lúc.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["fact", "tone", "question"],
            text: "Chào anh Bình, em nhắn về việc gửi báo giá cho khách Minh Phát, hạn thứ Sáu. Anh đang vướng gì hoặc cần em hỗ trợ gì để kịp không ạ?",
          },
          {
            requires: ["fact"],
            text: "Anh Bình ơi, việc báo giá Minh Phát sắp tới hạn rồi. Anh hứa hôm qua sẽ gửi sớm, mong anh làm đúng hạn giúp em nhé!\n\n(Đủ dữ kiện nhưng có câu 'anh hứa hôm qua' bịa thêm, và không hỏi anh vướng gì.)",
          },
          {
            text: "Kính gửi anh Bình, nhân dịp cuối tuần, em xin phép nhắc anh về các nhiệm vụ quan trọng của tuần, đồng thời chúc anh làm việc hiệu quả...\n\n(Không có dữ kiện nên AI viết chung chung, không nói việc nào, hạn nào.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Kiểm lời hứa AI tự thêm",
        text: "Tin nhắc AI soạn hay chèn 'anh đã hứa' hoặc 'như đã thống nhất'. Nếu biên bản không ghi lời hứa đó, hãy xoá. Nhắc người ta điều họ chưa từng nói là cách nhanh nhất để mất thiện chí.",
      },
      {
        type: "closing",
        lines: [
          "Nhắc riêng, đúng lúc, bằng một câu hỏi mở đường.",
          "Bài sau: gói họp tuần dùng lại được, từ chương trình đến biên bản mẫu.",
        ],
      },
    ],
  },
  {
    id: 2049,
    slug: "mini-project-goi-hop-tuan-dau-cuoi",
    title: "Chặng 32, Bài 10: Mini project: gói họp tuần, từ chương trình đến biên bản mẫu",
    subtitle: "Một bộ khuôn làm một lần, dùng mỗi thứ Hai: chương trình, biên bản và tin nhắc.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: mục tiêu họp, biên bản, bắt lỗi, nhắc việc. Nếu mỗi tuần bạn phải nghĩ lại từ đầu thì sẽ bỏ. Bài này gom lại thành một gói ba khuôn dùng lại được, để cuộc họp tuần sau mất ít công hơn tuần này và vẫn đúng.",
    openingQuestion:
      "Bạn muốn có bộ khuôn họp tuần dùng lại được. Cách dựng nào bền nhất?",
    openingOptions: [
      "Ba khuôn ngắn (chương trình, biên bản, tin nhắc) có ô điền và dòng dặn 'chưa rõ'",
      "Một văn bản dài giải thích mọi quy tắc họp, để ai cũng đọc kỹ trước mỗi buổi họp định kỳ",
      "Một prompt dài nhờ AI làm mọi thứ, từ chương trình đến biên bản trong một lần",
      "Chép nguyên biên bản tuần trước, đổi ngày và sửa vài dòng cho hợp tuần này",
    ],
    correctOption: 0,
    explanation:
      "Khuôn ngắn có ô điền dễ dùng lại và dễ thấy thiếu chỗ nào; dòng dặn 'chưa rõ' giữ AI khỏi bịa. Văn bản quy tắc dài thì không ai đọc mỗi tuần. Một prompt làm tất cả dồn ba việc khác nhau vào một chỗ nên không kiểm được từng bước. Chép biên bản cũ dễ để sót nguyên xi việc tuần trước làm người đọc hiểu nhầm.",
    diagram: [
      { label: "Khuôn 1: chương trình có điều cần quyết", arrow: true },
      { label: "Họp và ghi chú", arrow: true },
      { label: "Khuôn 2: biên bản bốn cột, chỗ thiếu ghi chưa rõ", arrow: true },
      { label: "Đối chiếu với ghi chú gốc", arrow: true },
      { label: "Khuôn 3: tin nhắc riêng giữa hạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm hỗ trợ khách hàng",
      description:
        "Trưởng nhóm gom ba khuôn vào một tài liệu một trang: chương trình, biên bản, tin nhắc. Mỗi thứ Hai chị điền điều cần quyết vào khuôn đầu, sau họp dán ghi chú vào khuôn hai, và giữa tuần dùng khuôn ba. Thời gian chuẩn bị mỗi tuần giảm rõ, nhưng phần đối chiếu với ghi chú gốc vẫn do chị làm. Đây là tình huống minh hoạ.",
    },
    quiz: [
      Q(
        "Điều gì làm một khuôn họp tuần dùng lại được lâu dài?",
        [
          "Ngắn, có ô điền, và có dòng dặn ghi 'chưa rõ' chỗ thiếu",
          "Dài, đầy đủ mọi trường hợp có thể xảy ra để không ai phải hỏi lại điều gì nữa",
          "Có thật nhiều màu sắc và biểu tượng để dễ nhìn",
          "Viết bằng giọng trang trọng như văn bản hành chính",
        ],
        "Khuôn dùng lâu phải đủ ngắn để tuần nào cũng điền, có ô rõ để thấy thiếu chỗ nào, và có dòng chống bịa. Khuôn dài đầy đủ mọi trường hợp thì không ai điền, còn màu sắc hay giọng trang trọng chỉ là trang trí.",
      ),
      Q(
        "Vì sao nên tách chương trình, biên bản và tin nhắc thành ba khuôn riêng?",
        [
          "Mỗi khuôn có một việc và một cách kiểm khác nhau",
          "Để ba khuôn trông giống ba tài liệu độc lập cho chuyên nghiệp",
          "Vì AI chỉ xử lý được một loại văn bản mỗi cuộc trò chuyện",
          "Để bạn dùng cả ba mỗi lần họp dù việc không cần đến",
        ],
        "Chương trình kiểm bằng cộng số phút, biên bản kiểm bằng ghi chú gốc, tin nhắc kiểm bằng lời hứa có thật hay không: ba cách kiểm khác nhau. AI không bị giới hạn một loại văn bản, và không cần dùng đủ cả ba khi buổi họp không đòi hỏi.",
      ),
      Q(
        "Khuôn biên bản đúng chuẩn cần có những cột nào?",
        [
          "Quyết định, việc, người, hạn",
          "Ai nói, giờ nói, ai đồng ý",
          "Tên người dự, chức danh, phòng ban",
          "Mục tiêu, kết quả mong muốn, cảm nghĩ",
        ],
        "Bốn cột quyết định, việc, người, hạn là thứ người sau họp cần để hành động. Bảng ai nói gì chép lại buổi họp, danh sách người dự chỉ cho biết ai có mặt, còn cột mục tiêu và cảm nghĩ thuộc về chương trình hay cảm nhận riêng.",
      ),
      Q(
        "Tuần sau bạn dùng lại khuôn nhưng ghi chú họp có ít chỗ chưa rõ. Điều gì đúng?",
        [
          "Vẫn đối chiếu với ghi chú gốc, vì AI có thể thêm điều không có",
          "Khỏi cần đối chiếu vì ghi chú rõ thì AI không bịa nữa",
          "Chỉ cần đối chiếu tuần đầu tiên, các tuần sau tin AI được",
          "Nhờ AI tự kiểm mình là đủ vì nó đã có khuôn của bạn",
        ],
        "Khuôn giảm chứ không loại bỏ rủi ro AI thêm người hoặc hạn. Ghi chú rõ giúp, nhưng đối chiếu vẫn cần mỗi lần; tin AI sau vài tuần đúng là chỗ lỗi đầu tiên lọt qua. Nhờ AI tự kiểm không phải nguồn độc lập.",
      ),
      Q(
        "Tin nhắc việc mẫu nên có những phần cố định nào?",
        [
          "Việc, hạn, câu hỏi 'vướng gì, cần gì' và ô tên người nhận",
          "Lời chào dài, lý do nhắc, lời hứa của người nhận từ trước và lời xin lỗi",
          "Tên sếp, mức độ khẩn cấp và lời cảnh báo nếu trễ hạn",
          "Toàn bộ nội dung biên bản để người nhận đọc lại từ đầu",
        ],
        "Tin nhắc ngắn cần việc, hạn và câu hỏi mở đường cùng ô để điền tên người. Lời hứa từ trước là điều dễ bịa, nhắc tên sếp và cảnh báo tạo áp lực sai chỗ, còn gửi cả biên bản thì người nhận không thấy phần của mình.",
      ),
    ],
    keyTakeaways: [
      "Gom ba khuôn ngắn: chương trình, biên bản, tin nhắc.",
      "Mỗi khuôn có ô điền và dòng dặn ghi 'chưa rõ' chỗ thiếu.",
      "Ba khuôn kiểm theo ba cách khác nhau, nên tách riêng.",
      "AI điền khuôn rất nhanh, còn đối chiếu với ghi chú gốc là việc của bạn.",
      "Làm một lần, dùng mỗi tuần; sửa khuôn khi thấy nó bịa hoặc bỏ sót.",
    ],
    practicePrompt: {
      question:
        "Sau ba tuần, bạn thấy khuôn biên bản luôn có một dòng 'Quyết định' do AI tự viết mà ghi chú không có. Sửa khuôn thế nào?",
      options: [
        "Thêm dòng dặn: chỉ ghi quyết định nếu ghi chú có chữ chốt; không thì ghi 'chưa có quyết định'",
        "Bỏ hẳn cột quyết định, chỉ để việc, người, hạn cho đỡ sai",
        "Đổi tên cột thành 'Kết luận' cho AI không tự thêm nữa",
        "Không sửa gì, chỉ nhờ AI viết lại biên bản mỗi khi thấy dòng thừa",
      ],
      correct: 0,
      explanation:
        "Lỗi lặp lại thì sửa gốc trong khuôn: quy định khi nào mới được ghi quyết định. Bỏ cột làm mất thông tin có ích, đổi tên cột không ngăn AI điền, còn chỉ nhờ viết lại lần sau thì lỗi vẫn quay lại mỗi tuần.",
    },
    summary: {
      keyIdea: "Gói họp tuần là ba khuôn ngắn, mỗi khuôn có ô điền và một dòng chống bịa.",
      formula: "Chương trình (điều cần quyết) → biên bản (bốn cột, chưa rõ) → tin nhắc (việc, hạn, vướng gì).",
      commonMistake: "Dựng một khuôn quá dài rồi bỏ sau hai tuần vì không ai điền.",
      action: "Lưu ba khuôn ngắn ở nơi bạn mở được trong 10 giây vào sáng thứ Hai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dựng ba khuôn cho cuộc họp thật của bạn: (1) chương trình có ô điều cần quyết, người, số phút; (2) biên bản bốn cột với dòng dặn 'chưa rõ'; (3) tin nhắc có ô việc, hạn, câu 'vướng gì, cần gì'. Thử điền khuôn 1 cho cuộc họp sắp tới và lưu cả ba nơi dễ mở.",
      secondary: "Ngày mai bạn sẽ được hỏi: ba khuôn đã lưu ở đâu, và khuôn nào bạn đã thử điền.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, bạn nghĩ đến buổi họp tuần sau và thấy mình sắp làm lại từ đầu: chương trình, biên bản, tin nhắc. Bài này gom năm bài học trước thành một gói ba khuôn để tuần nào bạn cũng chỉ việc điền.",
      },
      {
        type: "feynman",
        title: "Gói họp tuần đơn giản hơn bạn nghĩ",
        intro:
          "Đầu bếp quán phở không nghĩ lại công thức mỗi sáng: có sẵn nồi nước dùng, tô, bàn chuẩn bị. Họ chỉ việc nấu. Gói họp tuần là bộ dụng cụ đó cho cuộc họp: chuẩn bị một lần, dùng mỗi tuần.",
        columns: ["Thành phần", "Quán phở", "Gói họp tuần"],
        rows: [
          ["Công thức", "Công thức nước dùng cố định", "Ba khuôn có ô điền"],
          ["Nguyên liệu mỗi ngày", "Thịt, bánh phở mới", "Điều cần quyết, ghi chú họp của tuần"],
          ["Nếm thử", "Nếm nước dùng trước khi bán", "Đối chiếu biên bản với ghi chú gốc"],
          ["Cải tiến", "Chỉnh gia vị khi khách phàn nàn", "Sửa dòng dặn khi AI lặp lại một lỗi"],
        ],
        oneLiner: "Có sẵn khuôn thì mỗi tuần chỉ điền, không phải nghĩ lại từ đầu; nhưng vẫn phải nếm trước khi mang ra.",
      },
      { type: "heading", text: "Vấn đề: mỗi tuần làm lại từ đầu" },
      {
        type: "paragraph",
        text: "Ai cũng biết họp cần chương trình và biên bản; điều hiếm là có sẵn khuôn để tuần nào cũng làm được trong vài phút. Ba khuôn dưới đây đều ngắn và có ô điền. Ba khuôn này dùng được cho bất kỳ công cụ AI nào công ty bạn cho phép, vì chúng chỉ là chữ.",
      },
      {
        type: "list",
        items: [
          "Khuôn 1, chương trình: điều cần quyết, người quyết, người cầm dữ kiện, số phút mỗi mục, tài liệu đọc trước.",
          "Khuôn 2, biên bản: bảng bốn cột quyết định, việc, người, hạn; dòng dặn 'chỗ nào ghi chú không nói thì ghi chưa rõ'.",
          "Khuôn 3, tin nhắc: việc, hạn, câu 'vướng gì hoặc cần gì', ô tên người nhận; không có lời hứa bịa.",
        ],
      },
      {
        type: "flow",
        title: "Một tuần với gói họp",
        steps: [
          { label: "Thứ Hai trước họp: điền khuôn 1", detail: "Viết điều cần quyết, chọn người, cộng số phút. Nhờ AI nháp rồi tự kiểm tổng thời gian." },
          { label: "Trong họp: ghi chú như thường", detail: "Ghi chú vội cũng được: giữ nguyên dấu hỏi và chữ 'chưa chốt'. Không cần viết đẹp." },
          { label: "Ngay sau họp: điền khuôn 2", detail: "Dán ghi chú gốc vào khuôn biên bản. Đối chiếu từng tên, số, hạn với ghi chú gốc." },
          { label: "Gửi biên bản trong ngày", detail: "Kèm câu mời chỉnh nếu có chỗ chưa đúng trước một giờ nhất định." },
          { label: "Giữa tuần: dùng khuôn 3", detail: "Nhắn riêng người có việc chưa có tiến triển, bằng khuôn tin nhắc." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khuôn biên bản dùng lại",
        task: "Bạn muốn một khuôn biên bản họp tuần, dán ghi chú vào là ra bảng. Lắp prompt để AI dựng khuôn.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích",
            options: [
              { text: "Làm cho tôi một mẫu biên bản đẹp.", feedback: "'Đẹp' không đo được; AI sẽ làm mẫu nhiều phần trang trí mà thiếu cột người và hạn." },
              {
                text: "Dựng khuôn biên bản họp tuần: mỗi tuần tôi dán ghi chú vào, AI trả về bảng. Nhóm 8 người, họp 30 phút.",
                good: true,
                feedback: "Nói rõ khuôn dùng thế nào, cho ai, nên AI hiểu bối cảnh sử dụng.",
              },
            ],
          },
          {
            id: "columns",
            label: "Cột của bảng",
            options: [
              { text: "Tự chọn cột nào phù hợp nhất với cuộc họp.", feedback: "AI có thể thêm cột 'ý kiến từng người' làm biên bản dài mà thiếu cột hạn." },
              {
                text: "Bốn cột: quyết định, việc, người nhận, hạn xong.",
                good: true,
                feedback: "Đủ những gì người sau họp cần để hành động.",
              },
            ],
          },
          {
            id: "guard",
            label: "Dòng chống bịa",
            options: [
              { text: "Không cần dặn thêm gì; AI sẽ tự biết.", feedback: "Không có dòng dặn, chỗ thiếu sẽ bị AI điền cho trọn vẹn." },
              {
                text: "Chỗ nào ghi chú không nói rõ thì ghi 'chưa rõ'; không suy đoán người hay hạn; không ghi 'đã thống nhất' nếu ghi chú không có.",
                good: true,
                feedback: "Cho AI lối đi khác ngoài việc điền, và nêu đúng ba chỗ hay bịa nhất.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "columns", "guard"],
            text: "Khuôn biên bản họp tuần\n\nHướng dẫn dùng: dán ghi chú họp vào dưới đây, tôi sẽ trả về bảng.\n\nQuyết định | Việc | Người nhận | Hạn xong\n(1 dòng mỗi việc)\n\nQuy tắc: chỗ ghi chú không nói rõ thì ghi 'chưa rõ'; không suy đoán người hay hạn; chỉ ghi 'đã thống nhất' khi ghi chú có chữ tương ứng.",
          },
          {
            requires: ["purpose", "columns"],
            text: "Khuôn biên bản họp tuần\n\nQuyết định | Việc | Người nhận | Hạn xong\n\n(Đúng bốn cột, nhưng thiếu dòng chống bịa: lần dán ghi chú thiếu, AI vẫn sẽ điền người và hạn cho đủ bảng.)",
          },
          {
            text: "MẪU BIÊN BẢN HỌP\n\nI. Thời gian, địa điểm\nII. Thành phần tham dự\nIII. Nội dung thảo luận\nIV. Ý kiến các bên\nV. Kết luận\nVI. Ký tên\n\n(Mẫu hành chính dài, không có cột người và hạn, không dùng lại được cho họp tuần.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Khuôn không thay việc đối chiếu",
        text: "Có khuôn tốt không có nghĩa AI hết bịa. Khuôn giảm số lần nó bịa và làm chỗ bịa dễ thấy hơn. Mỗi tuần bạn vẫn đối chiếu biên bản với ghi chú gốc trước khi gửi, vì người chịu trách nhiệm cho biên bản là bạn.",
      },
      {
        type: "scenario",
        title: "Bạn dựng gói họp cho nhóm mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn được giao lo họp tuần cho một nhóm mới 6 người. Bạn có 20 phút chiều thứ Sáu để chuẩn bị gói cho tuần sau.",
            choices: [
              { label: "Viết một tài liệu 5 trang mô tả mọi quy tắc họp rồi gửi cả nhóm đọc", next: "bad_long" },
              { label: "Dựng ba khuôn ngắn (chương trình, biên bản, tin nhắc), điền thử khuôn 1 cho buổi họp thứ Hai", next: "s2" },
            ],
          },
          bad_long: {
            text: "Không ai đọc hết 5 trang. Thứ Hai họp vẫn không có chương trình và bạn phải nhắc lại từng quy tắc bằng miệng.",
            ending: "bad",
          },
          s2: {
            text: "Sau họp, AI điền khuôn 2 từ ghi chú của bạn. Bảng đẹp và có đủ bốn cột. Một dòng ghi 'Hạn: thứ Sáu' cho việc của chị Lan; ghi chú của bạn không có hạn đó.",
            choices: [
              { label: "Đối chiếu với ghi chú gốc, đổi hạn thành 'chưa rõ', hỏi chị Lan rồi cập nhật", next: "good" },
              { label: "Gửi luôn vì bảng đã đủ cột và trông rất chỉn chu", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Chị Lan hiểu hạn là thứ Sáu và làm vội một việc mà thật ra còn chờ thông tin. Chất lượng kém, và cả nhóm bắt đầu nghi ngờ biên bản.",
            ending: "bad",
          },
          good: {
            text: "Chị Lan trả lời hạn thật là thứ Tư tuần sau. Biên bản được cập nhật và gửi trong ngày. Nhóm quen với nhịp: khuôn, ghi chú, đối chiếu, gửi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba khuôn ngắn, một dòng chống bịa, và một bước đối chiếu bạn không bỏ.",
          "Chặng tiếp theo: theo dõi tiến độ và rủi ro.",
        ],
      },
    ],
  },
];
