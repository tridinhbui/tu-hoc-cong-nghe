import type { Lesson } from "../lesson-types";

// Chặng 60, bài 11-15. Giáo trình: scripts/curriculum/stage-60.json.
// Bài dạy khái niệm bền (cách dặn bot, khi nào chuyển cho người, cách thử bot), không nêu nút bấm hay giá của công cụ nào.

type Q = Lesson["quiz"][number];
// Viết đáp án đúng đứng đầu; vị trí được xáo lại lúc build.
const q = (question: string, options: [string, string, string, string], explanation: string): Q => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S60_C_LESSONS: Lesson[] = [
  {
    id: 2610,
    slug: "dat-cau-bot-khong-biet-thi-noi-khong-biet",
    title: "Chặng 60, Bài 11: Dặn bot: không có trong tài liệu thì nói không biết",
    subtitle: "Khách hỏi món shop chưa từng bán. Một câu dặn đúng giúp bot nhận là không chắc thay vì đoán cho vui lòng khách.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🙋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bot được làm ra để trả lời, nên khi không biết nó vẫn cố trả lời cho trọn câu. Với shop nhỏ, một câu đoán sai về giá, về hạn đổi trả hay về món không bán còn tốn hơn một câu 'em chưa rõ, để em nhờ chủ shop'. Dặn bot nói không biết là lớp bảo vệ rẻ nhất bạn có.",
    openingQuestion:
      "Shop bánh của bạn chỉ bán bánh kem và bánh mì. Khách nhắn: 'Bên mình có bánh kem không đường cho người tiểu đường không?' Bot chưa được dặn gì về chuyện không biết. Nhiều khả năng nhất nó sẽ làm gì?",
    openingOptions: [
      "Trả lời trơn tru rằng có, vì nó muốn làm khách hài lòng",
      "Báo ngay rằng tài liệu của shop không có thông tin này",
      "Im lặng không trả lời, vì câu hỏi nằm ngoài danh mục bánh",
      "Chuyển câu hỏi cho chủ shop mà không cần ai dặn trước",
    ],
    correctOption: 0,
    explanation:
      "Bot ngôn ngữ sinh ra câu nghe hợp lý nhất, và một câu trả lời 'có, bên em có' nghe hợp lý hơn một câu từ chối. Nếu không được dặn, nó hiếm khi tự nhận là không biết; nó sẽ bịa một loại bánh hoặc một thành phần nghe thật. Nó cũng không tự im lặng hay tự chuyển cho chủ shop, vì những hành vi đó phải được bạn viết ra thành quy tắc. Chính vì vậy câu dặn 'không có trong tài liệu thì nói không biết' phải nằm trong chỉ dẫn gốc của bot.",
    diagram: [
      { label: "Khách hỏi một điều shop chưa từng ghi", arrow: true },
      { label: "Bot tìm trong tài liệu và không thấy", arrow: true },
      { label: "Có câu dặn: nhận là không chắc", arrow: true },
      { label: "Bot báo chưa rõ và mời khách chờ chủ shop" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán trà sữa nhỏ",
      description:
        "Một quán trà sữa cho bot trả lời tin nhắn nhưng không dặn gì về chuyện không biết. Khách hỏi quán có món không đường không, bot đáp 'có, bên em có đá xay không đường' dù quán chưa bán món đó. Khách đến nơi, không có, và đăng lại tin nhắn lên nhóm bạn bè. Chủ quán thêm một dòng vào chỉ dẫn: 'Chỉ trả lời theo thực đơn đính kèm; nếu không thấy thì nói em chưa rõ và hẹn chủ quán phản hồi.' Những câu tương tự sau đó được trả lời thật thà.",
    },
    quiz: [
      q(
        "Vì sao một bot chưa được dặn gì lại hay trả lời chắc chắn cả khi không biết?",
        [
          "Nó được tạo ra để sinh câu nghe hợp lý chứ không để kiểm chứng",
          "Nó cố tình nói dối khách để chốt đơn nhanh hơn cho chủ shop",
          "Nó đọc nhầm tài liệu nên lấy số liệu của một cửa hàng khác về",
          "Nó chỉ trả lời chắc chắn khi khách hỏi bằng câu ngắn dưới 10 chữ",
        ],
        "Bot dự đoán chữ tiếp theo nghe hợp lý, nên không có 'cảm giác thiếu thông tin' như người. Nó không cố ý nói dối, cũng không phụ thuộc độ dài câu hỏi. Đọc nhầm tài liệu là một lỗi khác, xảy ra khi tài liệu lẫn lộn, chứ không phải nguyên nhân của thói quen đoán.",
      ),
      q(
        "Câu dặn nào khiến bot dễ nhận là không biết nhất?",
        [
          "Chỉ dùng thông tin trong tài liệu; không thấy thì nói chưa rõ",
          "Hãy trả lời thật chính xác, tuyệt đối không được sai bất cứ điều gì",
          "Hãy luôn thân thiện, nhiệt tình và giúp khách tới cùng",
          "Nếu không chắc thì đoán điều gần đúng nhất rồi thêm chữ 'có thể'",
        ],
        "Câu tốt vạch rõ ranh giới nguồn (chỉ tài liệu) và hành động khi ra ngoài ranh giới (nói chưa rõ). 'Đừng sai' chỉ là mong muốn, không cho bot cách làm. 'Nhiệt tình giúp tới cùng' còn đẩy bot về phía bịa. Còn 'đoán rồi thêm có thể' vẫn để bot tự chế nội dung, chỉ phủ lớp lịch sự lên trên.",
      ),
      q(
        "Bot trả lời 'em chưa rõ, em nhờ chủ shop nhé' cho câu hỏi về món shop không bán. Đánh giá nào đúng?",
        [
          "Đó là kết quả tốt: bot biết dừng đúng chỗ",
          "Đó là lỗi, vì bot phải luôn đưa ra câu trả lời có nội dung cụ thể cho khách",
          "Đó là lỗi nhẹ, vì nên đoán gần đúng để khách đỡ thất vọng phải chờ",
          "Đó chỉ chấp nhận được nếu khách đã hỏi lại lần thứ hai về cùng món",
        ],
        "Với món ngoài danh mục, 'chưa rõ' là câu trả lời đúng. Tính hữu ích của bot đo bằng việc khách có được thông tin đúng, không phải bằng việc bot luôn có câu đáp. Đoán gần đúng là cách khiến khách đến cửa hàng rồi thất vọng nặng hơn nhiều, và không có quy tắc nào bắt hỏi hai lần mới được từ chối.",
      ),
      q(
        "Bạn thêm một câu dặn vào bot rồi thử ngay bằng câu hỏi nào để biết câu dặn có tác dụng?",
        [
          "Một câu hỏi về món shop chắc chắn không bán, xem bot có nhận không",
          "Câu hỏi về món bán chạy, xem bot có đúng giá không",
          "Một lời chào đơn giản, xem bot có xưng hô đúng giọng của shop không",
          "Câu hỏi y hệt câu đã có sẵn trong tài liệu, xem bot chép lại có chuẩn không",
        ],
        "Muốn biết bot có nói 'không biết' hay không thì phải đưa cho nó một câu mà đáp án đúng là 'không biết'. Ba câu còn lại đều có đáp án trong tài liệu hoặc không cần tài liệu, nên chúng thử được giọng nói và khả năng chép, chứ không thử được câu dặn mới.",
      ),
      q(
        "Chủ shop muốn khi bot không biết thì khách vẫn được giúp tiếp. Câu nào nên nằm trong lời dặn?",
        [
          "Nói chưa rõ, xin tên và số điện thoại để chủ shop gọi lại",
          "Nói chưa rõ rồi kết thúc cuộc trò chuyện để khỏi nói sai thêm",
          "Gợi ý khách hỏi cửa hàng khác bán món tương tự để khỏi mất thời gian",
          "Nói chưa rõ rồi chuyển sang giới thiệu sản phẩm bán chạy nhất của shop",
        ],
        "Nói không biết mà bỏ lửng thì khách mất đầu mối. Một lối ra cụ thể, như để lại liên hệ cho chủ shop gọi lại, vừa trung thực vừa giữ được khách. Kết thúc cuộc chat, gợi ý cửa hàng khác hay đổi sang bán hàng đều làm khách thấy bị gạt đi, và có cách còn đẩy khách sang đối thủ.",
      ),
    ],
    keyTakeaways: [
      "Bot không tự biết mình không biết: phải dặn rõ.",
      "Câu dặn tốt có hai vế: chỉ dùng tài liệu này, và không thấy thì nói chưa rõ.",
      "Nói không biết xong phải có lối ra: xin liên hệ cho chủ shop.",
      "Thử câu dặn bằng câu hỏi mà đáp án đúng là 'không biết'.",
    ],
    practicePrompt: {
      question:
        "Bot của shop hoa trả lời khách 'hoa hồng nhập từ Đà Lạt, hôm nay còn 40 bó' dù tài liệu chỉ có bảng giá và không có tồn kho. Sửa nào đúng hướng?",
      options: [
        "Dặn: tồn kho không có trong tài liệu, hỏi tồn kho thì nhờ chủ shop",
        "Dặn: hãy trả lời thật chính xác mọi con số mà khách hỏi tới",
        "Dặn: hãy nói ngắn hơn để bớt cơ hội nhầm lẫn trong câu trả lời",
        "Dặn: nếu khách hỏi số lượng thì cứ trả lời con số lớn để khách yên tâm",
      ],
      correct: 0,
      explanation:
        "Bot bịa vì câu hỏi nằm ngoài tài liệu. Cách sửa là nêu rõ loại thông tin nào không có trong tài liệu và bot phải làm gì. 'Chính xác hơn' và 'ngắn hơn' không cho bot dữ kiện mới, còn báo số lớn cho khách yên tâm là dặn bot bịa có chủ đích.",
    },
    summary: {
      keyIdea: "Bot nói không biết khi bạn dặn nó vạch ranh giới nguồn và viết sẵn câu thoát.",
      formula: "Chỉ dùng tài liệu này + không thấy thì nói chưa rõ + xin liên hệ để chủ shop trả lời.",
      commonMistake: "Dặn 'trả lời chính xác' và tin rằng bot sẽ tự biết dừng.",
      action: "Viết 1 câu dặn 'không biết thì nói không biết' rồi hỏi thử 3 món shop không bán.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bot thử của bạn (hoặc công cụ AI bạn đang dùng để thử). Dán tài liệu giá và chính sách của shop, thêm câu dặn 'chỉ dùng thông tin trong tài liệu; không thấy thì nói em chưa rõ và xin số điện thoại để chủ shop gọi lại'. Rồi hỏi 3 câu về thứ shop KHÔNG bán và ghi lại bot trả lời bịa hay nhận không biết.",
      secondary: "Ngày mai bạn sẽ được hỏi: trong 3 câu thử, bot nhận không biết mấy câu?",
    },
    sections: [
      {
        type: "lead",
        text: "Một khách nhắn hỏi món mà shop chưa từng bán. Bot trả lời 'có ạ, em gửi anh liền'. Nghe lịch sự, nhưng nó vừa hứa một thứ không tồn tại. Bài này dạy bạn viết đúng một câu dặn để bot chịu nói 'em chưa rõ'.",
      },
      {
        type: "feynman",
        title: "Bot nói không biết đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ một bạn nhân viên mới trả lời điện thoại. Bạn đưa bảng giá rồi quên dặn: 'khách hỏi gì ngoài bảng thì đừng tự nghĩ ra'. Bạn mới sợ nói 'không biết' nên bịa cho kịp.",
        columns: ["Thành phần", "Nhân viên mới trả lời điện thoại", "Bot của shop"],
        rows: [
          ["Tài liệu trong tay", "Bảng giá bạn vừa đưa", "Tài liệu giá và chính sách bạn cung cấp"],
          ["Khi gặp câu ngoài bảng", "Sợ mất điểm nên đoán", "Sinh câu nghe hợp lý nhất, nên dễ bịa"],
          ["Điều bạn cần dặn", "Không có trong bảng thì nói để em hỏi lại", "Không có trong tài liệu thì nói chưa rõ"],
          ["Lối thoát", "Ghi số khách, báo chủ shop gọi lại", "Xin liên hệ rồi báo chủ shop"],
        ],
        oneLiner: "Bot cũng như nhân viên mới: nó chỉ dám nói 'không biết' khi bạn cho phép và chỉ đường.",
      },
      { type: "heading", text: "Vì sao bot không tự nhận là không biết" },
      {
        type: "paragraph",
        text: "Bot ngôn ngữ dự đoán chữ tiếp theo nghe hợp lý nhất. Câu 'có ạ, bên em có' nghe trơn tru hơn câu 'em không rõ', nên nếu không có chỉ dẫn, nó nghiêng về câu trơn tru. Đó gọi là bịa (hallucination), và nó không liên quan tới việc bot 'thông minh' hay không.",
      },
      {
        type: "callout",
        label: "Nhớ một điều",
        text: "Bot không có cảm giác thiếu thông tin như người. Nó chỉ biết làm một việc là viết tiếp. 'Không biết' là hành vi bạn phải dạy, như dạy nhân viên mới.",
      },
      { type: "heading", text: "Ba phần của một câu dặn tốt" },
      {
        type: "list",
        items: [
          "Nguồn: 'Chỉ dùng thông tin trong tài liệu dưới đây.' Nhờ vậy bot hiểu chỗ nào là ngoài ranh giới.",
          "Hành động khi ngoài ranh giới: 'Nếu không thấy, nói em chưa rõ, không đoán.'",
          "Lối ra cho khách: 'Xin tên và số điện thoại để chủ shop gọi lại trong giờ làm việc.'",
        ],
      },
      {
        type: "flow",
        title: "Đường đi của một câu hỏi khi bot được dặn đúng",
        steps: [
          { label: "Khách hỏi", detail: "Khách nhắn một câu mà bạn chưa từng nghĩ tới, ví dụ món không đường hoặc giao sang tỉnh." },
          { label: "Bot tìm trong tài liệu", detail: "Bot chỉ được dùng tài liệu bạn đưa. Nó tìm đoạn có liên quan tới câu hỏi." },
          { label: "Không thấy đoạn nào", detail: "Theo câu dặn, đây là lúc dừng: bot không được ghép một đáp án từ những thứ na ná." },
          { label: "Bot nhận không chắc", detail: "Bot nói rõ là tài liệu của shop chưa có thông tin này, bằng giọng lịch sự đúng phong cách shop." },
          { label: "Khách có lối ra", detail: "Bot xin tên và số điện thoại hoặc hẹn giờ chủ shop phản hồi, để khách không bị bỏ lửng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bot chưa được dặn",
          text: "'Dạ có ạ, bên em có bánh không đường, anh ghé lấy nhé.' Nghe chuyên nghiệp nhưng là bịa. Khách tới cửa hàng mới phát hiện.",
        },
        right: {
          label: "Bot đã được dặn",
          text: "'Dạ em chưa thấy thông tin bánh không đường trong danh mục của shop. Anh để lại số điện thoại, chủ shop gọi anh trong giờ làm việc ạ.'",
        },
      },
      { type: "heading", text: "Thử: lắp một câu dặn cho bot shop bánh" },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dặn bot của tiệm bánh nhận là không biết",
        task: "Tài liệu của tiệm chỉ có bảng giá bánh kem và bánh mì. Khách hỏi về bánh không đường. Chọn từng phần của câu dặn và xem bot trả lời ra sao.",
        parts: [
          {
            id: "source",
            label: "Nguồn thông tin",
            options: [
              { text: "Hãy trả lời khách dựa trên hiểu biết chung về bánh.", feedback: "Bot sẽ lấy kiến thức chung về bánh và nói điều tiệm của bạn chưa chắc làm, nên khách được hẹn thứ không có." },
              { text: "Chỉ dùng thông tin trong bảng giá dưới đây, không dùng nguồn nào khác.", good: true, feedback: "Ranh giới nguồn rõ: bot biết thứ gì ngoài bảng giá là ngoài phạm vi." },
            ],
          },
          {
            id: "unknown",
            label: "Khi không thấy trong tài liệu",
            options: [
              { text: "Nếu không thấy thì nói em chưa rõ, không đoán.", good: true, feedback: "Câu này biến 'không biết' thành hành vi được phép, nên bot dừng thay vì bịa." },
              { text: "Nếu không thấy thì cố trả lời gần đúng nhất có thể.", feedback: "Bot sẽ ghép ra một câu nghe hợp lý, tức là bịa, vì bạn vừa bảo nó cố." },
            ],
          },
          {
            id: "exit",
            label: "Lối ra cho khách",
            options: [
              { text: "Xin tên và số điện thoại để chủ tiệm gọi lại.", good: true, feedback: "Khách không bị bỏ lửng: chủ tiệm có đầu mối để trả lời đúng." },
              { text: "Xin lỗi và kết thúc cuộc trò chuyện.", feedback: "Khách bị đóng cửa mà không có đường nào tiếp theo, dễ chuyển sang tiệm khác." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "unknown", "exit"],
            text: "Dạ em chưa thấy thông tin bánh không đường trong bảng giá của tiệm. Chị để lại tên và số điện thoại, chủ tiệm sẽ gọi lại cho chị trong giờ làm việc ạ.",
          },
          {
            requires: ["source", "unknown"],
            text: "Dạ em chưa thấy thông tin bánh không đường trong bảng giá của tiệm ạ.\n\n(Đúng là bot không bịa, nhưng khách bị bỏ lửng vì chưa có đường nào để hỏi tiếp.)",
          },
          {
            text: "Dạ có ạ, tiệm có bánh kem không đường dùng đường ăn kiêng, giá 380.000đ, chị đặt trước một ngày nhé.\n\n(Bot bịa cả loại bánh, cả giá và cả hạn đặt, vì nó bị dặn cố trả lời hoặc không bị giới hạn nguồn.)",
          },
        ],
      },
      { type: "heading", text: "Thử tiếp: soát các câu bot trả lời" },
      {
        type: "scenario",
        title: "Bot vừa được dặn, bạn thử lần đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa thêm câu dặn 'không thấy thì nói chưa rõ' cho bot của shop. Bạn hỏi thử: 'Bên mình có giao hàng sang Campuchia không?' Tài liệu không nhắc chuyện này. Bot trả lời: 'Dạ có ạ, phí ship khoảng 150.000đ.'",
            choices: [
              { label: "Kết luận câu dặn đã đủ, vì bot trả lời rất tự tin và lịch sự", next: "bad_trust" },
              { label: "Coi đây là bằng chứng câu dặn chưa tác dụng, xem lại nguồn và hành động khi không thấy", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Bạn bật bot cho khách. Vài ngày sau có khách đặt hàng gửi sang nước ngoài theo mức phí bot nói, và shop phải xin lỗi vì không giao được. Một câu thử đã báo trước lỗi này nhưng bạn bỏ qua.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thêm câu 'Chỉ dùng thông tin trong tài liệu; không thấy thì nói em chưa rõ và xin số điện thoại'. Bạn hỏi lại đúng câu đó. Lần này bot nói chưa rõ và xin số điện thoại. Bạn còn 2 câu thử.",
            choices: [
              { label: "Dừng ở đây vì đã có 1 câu đúng", next: "bad_one" },
              { label: "Hỏi thêm vài câu ngoài tài liệu khác (món lạ, khuyến mại chưa có) để chắc câu dặn chạy đều", next: "good" },
            ],
          },
          bad_one: {
            text: "Một câu đúng chưa chứng minh được gì. Hôm sau bot vẫn bịa về khuyến mại chưa có, vì câu dặn chưa được thử đủ dạng câu hỏi.",
            ending: "bad",
          },
          good: {
            text: "Bot nhận không biết ở cả 3 câu ngoài tài liệu và trả lời đúng ở 2 câu có trong tài liệu. Bạn ghi bộ 5 câu này lại để thử lại mỗi khi sửa câu dặn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bot chỉ nói không biết khi bạn dặn nó như vậy, kèm lối ra cho khách.",
          "Bài sau: khi nào bot phải dừng hẳn và gọi người thật.",
        ],
      },
    ],
  },
  {
    id: 2611,
    slug: "luc-nao-bot-phai-chuyen-cho-nguoi-that",
    title: "Chặng 60, Bài 12: Lúc nào bot phải chuyển cho người thật: khiếu nại, hoàn tiền, khách đang bực",
    subtitle: "Bạn liệt kê sáu tình huống ở shop mình và viết dấu hiệu để bot dừng lại, gọi bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một bot trả lời mệt mỏi là vô hại; một bot cố giữ khách đang giận là nguy hiểm. Những chỗ có tiền, có cảm xúc hoặc có rủi ro cho sức khoẻ và an toàn cần một người thật. Nếu bạn không viết sẵn dấu hiệu, bot sẽ tiếp tục trả lời tới khi chuyện đã hỏng.",
    openingQuestion:
      "Khách nhắn: 'Bánh giao hôm qua bị hỏng, con tôi đau bụng, tôi muốn hoàn tiền và nói chuyện với chủ shop.' Bot nên làm gì?",
    openingOptions: [
      "Dừng trả lời nội dung và chuyển ngay cho chủ shop",
      "Xin lỗi, hứa hoàn tiền toàn bộ và hẹn giao bánh mới miễn phí",
      "Hỏi thêm 5 câu về lô bánh để xác nhận trước khi có kết luận",
      "Gửi chính sách đổi trả của shop và nhắc khách đọc kỹ điều khoản",
    ],
    correctOption: 0,
    explanation:
      "Tin nhắn có ba dấu hiệu chuyển người: khiếu nại về sản phẩm, đòi hoàn tiền và có thể liên quan tới sức khoẻ. Bot không được hứa hoàn tiền vì đó là quyền của chủ shop, và không nên hỏi dồn một phụ huynh đang lo cho con. Gửi nguyên văn chính sách lúc này nghe như đẩy trách nhiệm cho khách. Cách đúng là nhận lỗi ngắn, báo chủ shop sẽ liên hệ ngay và chuyển toàn bộ cuộc trò chuyện.",
    diagram: [
      { label: "Bot nhận tin nhắn của khách", arrow: true },
      { label: "Tìm dấu hiệu: tiền, bực, an toàn, ngoài tài liệu", arrow: true },
      { label: "Có dấu hiệu: bot dừng, không cãi, không hứa", arrow: true },
      { label: "Chủ shop hoặc nhân viên tiếp nhận và xử lý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: shop mỹ phẩm online",
      description:
        "Một shop cho bot trả lời mọi tin nhắn. Có khách bị dị ứng sau khi dùng kem và nhắn 'mặt tôi sưng, tôi cần gặp người chịu trách nhiệm'. Bot đáp bằng câu hướng dẫn chung về cách dùng kem. Khách chụp màn hình đăng lên mạng. Sau đó chủ shop thêm danh sách dấu hiệu bắt buộc chuyển người: sức khoẻ, đòi hoàn tiền, doạ kiện, khách viết hoa hoặc nhắn liên tiếp ba lần.",
    },
    quiz: [
      q(
        "Tin nhắn nào cần bot dừng và chuyển cho người thật?",
        [
          "Tôi đã nhắn ba lần rồi mà không ai giải quyết, tôi sẽ báo cơ quan chức năng.",
          "Shop cho em hỏi bánh kem size nhỏ còn khuyến mại dịp này không?",
          "Cho mình xin địa chỉ cửa hàng gần Quận 7 và giờ mở cửa cuối tuần.",
          "Mình muốn đổi ngày nhận bánh từ thứ Bảy sang Chủ nhật, được không?",
        ],
        "Khách nhắc tới việc đã nhắn nhiều lần và doạ báo cơ quan chức năng: đó là khiếu nại gay gắt, chỉ người thật mới xử lý được. Ba câu còn lại là câu hỏi thông thường về khuyến mại, địa chỉ hoặc đổi ngày, bot có thể trả lời nếu tài liệu có thông tin.",
      ),
      q(
        "Vì sao hoàn tiền nên là việc bot không tự hứa?",
        [
          "Hoàn tiền là quyết định của chủ shop và dính tới tiền thật",
          "Vì bot không biết tính số tiền nên không hoàn được",
          "Vì bot chỉ được phép nói những câu có độ dài dưới hai dòng chat",
          "Vì khách hàng thường không muốn nhận tiền hoàn từ một chương trình máy",
        ],
        "Hoàn tiền là quyền của người chịu trách nhiệm cho shop: phụ thuộc lỗi do ai, hàng còn hay đã dùng, và chính sách lúc đó. Bot hứa thay là ràng buộc shop bằng một lời chưa ai duyệt. Lý do không nằm ở việc tính toán hay độ dài câu, và khách thường vẫn muốn được hoàn tiền.",
      ),
      q(
        "Khách viết toàn chữ hoa, dùng nhiều dấu chấm than và nhắn liên tiếp. Dấu hiệu này cho biết gì?",
        [
          "Khách đang bực, nên một câu trả lời máy móc sẽ làm họ bực thêm",
          "Khách gõ nhầm bàn phím nên bot hỏi lại từng chữ",
          "Khách chắc chắn đã mua hàng nên bot có thể bỏ qua bước xác nhận đơn",
          "Khách muốn mua thêm nên bot nên gợi ý ngay sản phẩm bán chạy khác",
        ],
        "Chữ hoa, dấu chấm than và nhắn dồn là dấu hiệu khách đang giận. Lúc này nội dung xin lỗi chuẩn mực của bot thường được đọc như 'đọc thuộc lòng', càng làm khách giận. Nên chuyển cho người. Đoán khách gõ nhầm, đã mua hay muốn mua thêm đều không có cơ sở từ kiểu nhắn đó.",
      ),
      q(
        "Bạn viết dấu hiệu chuyển người cho bot. Cách viết nào dùng được nhất?",
        [
          "Khi khách nhắc hoàn tiền, đổi trả sau 7 ngày, sức khoẻ hoặc dọa kiện thì dừng và chuyển",
          "Khi khách có vẻ không hài lòng thì hãy cân nhắc chuyển cho người phù hợp",
          "Khi gặp chuyện quan trọng thì hãy chuyển, còn lại bot tự xử lý theo ý mình",
          "Hãy chuyển cho người thật mỗi khi bot cảm thấy câu hỏi khó hoặc phức tạp",
        ],
        "Dấu hiệu tốt là thứ bot nhận ra bằng chữ trong tin nhắn: từ khoá cụ thể, con số, tình huống cụ thể. 'Có vẻ không hài lòng', 'chuyện quan trọng' hay 'câu khó' phụ thuộc phán đoán mà bot không ổn định, nên lúc chuyển lúc không.",
      ),
      q(
        "Khi chuyển cho người, bot nên nói gì với khách?",
        [
          "Em đã báo chủ shop, chủ shop sẽ liên hệ chị trong giờ làm việc ạ",
          "Em xin lỗi chị, em sẽ hoàn tiền ngay và gửi bánh mới miễn phí hôm nay ạ",
          "Em đã ghi nhận, nhưng chị hãy đọc lại chính sách đổi trả của shop giúp em",
          "Chị đừng lo, em giải quyết được hết ạ",
        ],
        "Khách cần biết hai điều: ai sẽ tiếp và khi nào. Lời hứa hoàn tiền là vượt quyền, đẩy khách đi đọc chính sách là đùn đẩy, còn nói 'em giải quyết được' là giữ khách lại ở chỗ bot không có thẩm quyền.",
      ),
    ],
    keyTakeaways: [
      "Bot dừng khi có tiền, cảm xúc mạnh, rủi ro sức khoẻ hoặc pháp lý, hoặc khi ngoài tài liệu.",
      "Viết dấu hiệu bằng chữ cụ thể trong tin nhắn, không bằng 'cảm thấy khó'.",
      "Khi chuyển, bot chỉ nói ai sẽ tiếp và khi nào, không hứa giải pháp.",
      "Liệt kê 6 tình huống của chính shop bạn, đừng dùng danh sách chung.",
    ],
    practicePrompt: {
      question:
        "Shop của bạn bán máy lọc nước. Khách nhắn: 'Máy chảy nước ra sàn, tôi muốn đổi máy khác.' Đâu là dấu hiệu nên viết vào danh sách chuyển người?",
      options: [
        "Khách đòi đổi sản phẩm vì sản phẩm hỏng gây thiệt hại",
        "Khách hỏi giá máy lọc nước công suất lớn hơn một bậc",
        "Khách hỏi bao lâu thì cần thay lõi lọc theo hướng dẫn",
        "Khách xin số hotline của shop để tiện liên hệ sau này",
      ],
      correct: 0,
      explanation:
        "Đổi máy vì hỏng và có thiệt hại là việc của người có quyền quyết định: cần kiểm tra lỗi, bảo hành và chi phí. Ba câu còn lại là thông tin có sẵn (giá, lịch thay lõi, hotline) nên bot trả lời được.",
    },
    summary: {
      keyIdea: "Bot cần danh sách dấu hiệu viết rõ về lúc nào phải dừng để gọi người.",
      formula: "Tiền + cảm xúc mạnh + sức khoẻ/pháp lý + ngoài tài liệu = chuyển cho người thật.",
      commonMistake: "Viết 'chuyển khi khó' rồi bot không biết thế nào là khó.",
      action: "Viết 6 tình huống ở shop mình và dấu hiệu chữ của từng tình huống.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lại 20 tin nhắn khách cũ của bạn. Chọn ra 6 tình huống mà bạn sẽ không muốn bot tự xử lý (hoàn tiền, khiếu nại, giao sai hàng, khách doạ đăng mạng, sức khoẻ, đơn lớn bất thường). Với mỗi tình huống ghi 2-3 từ hoặc cụm từ khách hay dùng khi gặp chuyện đó.",
      secondary: "Ngày mai bạn sẽ được hỏi: 6 tình huống đó là gì, và dấu hiệu chữ cho từng tình huống?",
    },
    sections: [
      {
        type: "lead",
        text: "Buổi sáng, một khách nhắn 'hàng hỏng, tôi muốn hoàn tiền'. Nếu bot trả lời bằng câu xin lỗi mẫu rồi gửi chính sách, khách sẽ hiểu rằng không ai đang lắng nghe. Bài này là về việc viết sẵn lúc nào bot phải dừng.",
      },
      {
        type: "feynman",
        title: "Chuyển cho người thật đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn thuê một bạn trực quầy mới. Bạn dặn: bán hàng và trả lời giá thì làm, nhưng khách đòi trả tiền, khách giận, khách nói bị đau thì gọi chị ngay.",
        columns: ["Thành phần", "Bạn trực quầy mới", "Bot của shop"],
        rows: [
          ["Việc được làm tự", "Báo giá, giờ mở cửa, cách đặt hàng", "Trả lời theo tài liệu giá và chính sách"],
          ["Việc phải gọi chị", "Hoàn tiền, khách giận, sức khoẻ", "Đúng các dấu hiệu bạn viết sẵn"],
          ["Cách nhận ra", "Nhìn mặt khách, nghe giọng nói", "Chỉ có chữ, nên dấu hiệu phải là chữ cụ thể"],
          ["Lời nói khi gọi chị", "Chị ơi, có khách cần gặp chị", "Em đã báo chủ shop, sẽ liên hệ chị sớm"],
        ],
        oneLiner: "Bot không nhìn được mặt khách, nên ranh giới 'gọi chị' phải được viết bằng chữ.",
      },
      { type: "heading", text: "Bốn nhóm việc bot không nên tự xử lý" },
      {
        type: "list",
        items: [
          "Tiền: hoàn tiền, đền bù, giảm giá ngoài bảng, đơn lớn bất thường.",
          "Cảm xúc: khách giận, khách viết hoa, khách nhắn dồn, khách nói sẽ đăng mạng.",
          "An toàn: sản phẩm gây đau, dị ứng, hỏng cháy, bất kỳ chuyện liên quan sức khoẻ.",
          "Ngoài tài liệu: câu hỏi mà bot đã nhận không biết hai lần liên tiếp.",
        ],
      },
      {
        type: "callout",
        label: "Lưu ý về pháp lý",
        text: "Nếu khách nói tới kiện cáo hoặc điều luật, bot không được tự giải thích quy định. Hãy ghi rõ trong dặn: dừng và chuyển cho chủ shop, còn lời đáp về pháp lý thì hỏi bộ phận pháp chế hoặc chuyên gia.",
      },
      {
        type: "flow",
        title: "Bot quyết định dừng như thế nào",
        steps: [
          { label: "Đọc tin nhắn", detail: "Bot quét câu khách vừa gửi, tìm cụm từ trong danh sách dấu hiệu bạn đã viết." },
          { label: "Gặp dấu hiệu", detail: "Ví dụ khách viết 'hoàn tiền', 'hỏng', 'đau', 'báo chí', hoặc nhắn lần thứ ba mà chưa ai giải quyết." },
          { label: "Bot ngừng trả lời nội dung", detail: "Bot không giải thích chính sách, không cãi, không hứa. Nó chỉ làm đúng một việc là báo có người sẽ tiếp." },
          { label: "Chuyển trọn cuộc trò chuyện", detail: "Người nhận được toàn bộ đoạn chat cùng tóm tắt, để không phải hỏi lại khách." },
          { label: "Người thật trả lời", detail: "Chủ shop hoặc nhân viên liên hệ trong giờ làm việc và quyết định hoàn tiền hay đổi hàng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dấu hiệu viết mơ hồ",
          text: "'Chuyển cho người khi câu hỏi khó hoặc khách có vẻ không vui.' Bot không biết thế nào là khó, nên lúc chuyển lúc không.",
        },
        right: {
          label: "Dấu hiệu viết bằng chữ cụ thể",
          text: "'Chuyển khi tin nhắn có: hoàn tiền, hỏng, đau bụng, dị ứng, báo công an, đăng mạng, hoặc khách nhắn lần thứ 3.' Bot so được từng cụm.",
        },
      },
      { type: "heading", text: "Thử: khách đang bực, bạn chọn thế nào" },
      {
        type: "scenario",
        title: "Khách nhắn giữa giờ cao điểm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đang bận giao hàng. Khách nhắn: 'SHOP LÀM ĂN KIỂU GÌ VẬY, HÀNG SAI MÀU, TÔI YÊU CẦU HOÀN TIỀN NGAY!!!' Bot chưa có dấu hiệu chuyển người nào.",
            choices: [
              { label: "Để bot tự xin lỗi và hứa hoàn tiền để khách nguôi", next: "s_bot" },
              { label: "Thêm các dấu hiệu 'hoàn tiền', 'viết hoa', 'nhắn dồn' vào danh sách và đặt bot báo bạn", next: "s2" },
            ],
          },
          s_bot: {
            text: "Bot trả lời: 'Dạ shop xin lỗi và sẽ hoàn tiền ngay cho anh.' Khách chụp màn hình gửi lại khi bạn hỏi thêm chi tiết. Chủ shop không thể rút lời đã hứa mà không bị mất uy tín.",
            ending: "bad",
          },
          s2: {
            text: "Lần sau, khách khác nhắn một câu tương tự. Bot trả lời ngắn: 'Em đã báo chủ shop, chủ shop sẽ liên hệ anh trong giờ làm việc ạ' rồi gửi bạn cả đoạn chat. Bạn thấy khách viết chữ hoa ở mọi câu.",
            choices: [
              { label: "Gọi khách, nghe hết, rồi quyết định hoàn tiền hoặc đổi hàng", next: "good" },
              { label: "Bảo bot tiếp tục trả lời cho đỡ mất công, xem khách có nguôi không", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Bot gửi liên tiếp 3 câu xin lỗi mẫu. Khách thấy mình đang bị một cái máy trả lời, giận hơn và đăng bài lên trang cá nhân. Bạn mất thêm nhiều thời gian xử lý hơn một cuộc gọi.",
            ending: "bad",
          },
          good: {
            text: "Bạn gọi sau đợt giao hàng, hỏi rõ sai màu nào và xin ảnh. Bạn đổi hàng đúng màu và khách nhắn cảm ơn. Bot chỉ làm đúng một việc: dừng và báo người thật.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bot chỉ tự xử lý việc nhỏ; việc có tiền, cảm xúc, an toàn thì gọi người.",
          "Bài sau: chuyển khách sang người mà không bắt họ kể lại từ đầu.",
        ],
      },
    ],
  },
  {
    id: 2612,
    slug: "noi-chuyen-chuyen-giao-khach-khong-phai-ke-lai-tu-dau",
    title: "Chặng 60, Bài 13: Chuyển khách sang người mà không bắt họ kể lại từ đầu",
    subtitle: "Bạn thiết kế tin nhắn tóm tắt gửi nhân viên nhận tiếp: tên món, vấn đề và điều khách đã thử.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách bực nhất không phải vì bot không biết, mà vì bị chuyển sang người rồi lại phải kể từ đầu. Một tin nhắn tóm tắt ba dòng là khác biệt giữa 'cảm ơn bạn đã xử lý nhanh' và 'sao lần nào cũng phải nói lại'.",
    openingQuestion:
      "Bot chuyển một khách sang bạn kèm đúng một câu: 'Khách cần hỗ trợ.' Bạn mở đoạn chat dài 40 tin. Điều gì sẽ xảy ra nhiều nhất?",
    openingOptions: [
      "Bạn hỏi lại khách từ đầu, và khách phải kể lại cả chuyện",
      "Bạn đọc hết 40 tin trong 10 giây rồi trả lời rất chính xác",
      "Khách hiểu rằng bot chưa đọc và thông cảm cho cả hai bên",
      "Bạn tự đoán vấn đề dựa trên tên khách rồi gọi điện luôn",
    ],
    correctOption: 0,
    explanation:
      "Một câu 'khách cần hỗ trợ' không nói món nào, lỗi gì, khách đã thử gì. Người nhận hoặc phải lội hết 40 tin hoặc phải hỏi lại, và khách thấy mình kể lần hai. Khách hiếm khi thông cảm khi thấy tin nhắn này lặp lại, và đoán vấn đề từ tên khách là đoán mò. Tóm tắt ba phần (món, vấn đề, đã thử) khiến người nhận vào việc ngay ở câu đầu.",
    diagram: [
      { label: "Bot nhận ra cần người thật", arrow: true },
      { label: "Bot viết tóm tắt: món, vấn đề, điều đã thử", arrow: true },
      { label: "Người nhận đọc 10 giây", arrow: true },
      { label: "Người nhận nói đúng vấn đề, không hỏi lại từ đầu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng đồ gia dụng online",
      description:
        "Một cửa hàng bán nồi chiên không dầu cho bot chuyển khách sang nhân viên kèm câu 'khách báo lỗi'. Nhân viên mở chat, hỏi 'chị cho em biết chị mua máy nào, lỗi thế nào ạ?', và khách trả lời 'tôi đã nói ở trên rồi'. Sau khi cửa hàng yêu cầu bot gửi kèm tóm tắt ba dòng, nhân viên mở đầu bằng 'em thấy chị mua nồi 5 lít, đèn báo nhấp nháy, chị đã thử cắm ổ khác. Em kiểm tra giúp chị ngay ạ'.",
    },
    quiz: [
      q(
        "Một bản tóm tắt chuyển giao tốt cho nhân viên nhận tiếp gồm những gì?",
        [
          "Tên món, vấn đề của khách và điều khách đã thử",
          "Toàn bộ 40 tin nhắn dán lại theo thứ tự thời gian, không cắt bớt",
          "Tên khách, giờ khách nhắn, và nhận xét của bot về tính cách khách",
          "Một câu ngắn báo khách đang bực kèm lời khuyên nên xin lỗi trước",
        ],
        "Nhân viên cần ba thứ để vào việc: khách nói về món nào, chuyện gì xảy ra, và khách đã thử cách gì để khỏi đề nghị lại. Dán cả đoạn chat vẫn bắt người nhận tự lọc, còn nhận xét tính cách hay lời khuyên là ý kiến của bot, không phải dữ kiện.",
      ),
      q(
        "Vì sao tin nhắn chuyển giao nên ghi 'khách đã thử cắm ổ khác' thay vì bỏ qua?",
        [
          "Để nhân viên không đề nghị lại cách khách đã làm",
          "Để chứng minh rằng khách có lỗi nếu máy thật sự hỏng",
          "Để đủ độ dài tối thiểu mà hệ thống yêu cầu cho một tin nhắn",
          "Vì bot bắt buộc phải kể lại mọi việc khách đã từng làm trong đời",
        ],
        "Điều khách đã thử cho nhân viên biết đã loại trừ nguyên nhân nào, nên bước tiếp theo là mới chứ không lặp lại. Nó không phải bằng chứng quy lỗi, không có độ dài tối thiểu nào, và bot chỉ cần ghi cách liên quan tới vấn đề này.",
      ),
      q(
        "Khách nói 'đèn báo nhấp nháy' nhưng bot tóm tắt thành 'máy hỏng'. Điều gì đã xảy ra?",
        [
          "Bot đã diễn giải, làm mất chi tiết quan trọng với người nhận",
          "Bot tóm tắt đúng vì hai cách nói cùng ý nghĩa",
          "Bot đã viết gọn hơn nên nhân viên sẽ đọc nhanh hơn và xử lý sớm hơn",
          "Bot đã chọn từ chuyên môn chuẩn, thay cho cách nói không chính xác của khách",
        ],
        "'Đèn nhấp nháy' là triệu chứng cụ thể nhân viên có thể tra; 'máy hỏng' là kết luận của bot, có thể sai và mất manh mối. Bản tóm tắt nên giữ nguyên chữ của khách ở những chỗ là dữ kiện, không thay bằng từ rộng hơn.",
      ),
      q(
        "Tin nhắn tóm tắt dài 400 chữ có vấn đề gì so với bản ba dòng?",
        [
          "Người nhận lại phải đọc lâu và có thể bỏ sót dữ kiện chính",
          "Bản dài luôn chính xác hơn nên chẳng có vấn đề gì cần nói",
          "Bản dài bị hệ thống từ chối vì vượt quá 140 ký tự cho mọi tin",
          "Bản dài chỉ có lỗi khi khách đọc được tin nhắn đó trên điện thoại",
        ],
        "Mục đích của tóm tắt là để người nhận nắm vấn đề trong khoảng 10 giây. Bản 400 chữ chuyển việc lọc sang người đọc, nên gần như không hơn gì dán cả đoạn chat. Không có giới hạn 140 ký tự nào ở đây, và khách không thấy bản tóm tắt nội bộ.",
      ),
      q(
        "Bot cần nói gì với khách khi chuyển giao để khách biết sẽ không phải kể lại?",
        [
          "Em đã ghi lại tình trạng của chị và chuyển cho chị Hà, chị Hà sẽ liên hệ ngay ạ",
          "Em sẽ chuyển cho nhân viên, chị chờ rồi kể lại cho nhân viên nghe cho rõ nhé",
          "Em chuyển chị qua bộ phận khác, chị vui lòng nhắn lại toàn bộ thông tin đơn hàng",
          "Em chuyển cho bộ phận chuyên trách, xin chị đợi trong vòng 24 đến 72 giờ làm việc",
        ],
        "Khách yên tâm khi biết ai sẽ tiếp và rằng thông tin đã được ghi lại. Bảo khách kể lại hoặc nhắn lại thông tin là đúng điều cần tránh, còn hẹn một khoảng thời gian rộng mà không có tên người nhận làm khách thấy bị chuyền tay vô định.",
      ),
    ],
    keyTakeaways: [
      "Khách ghét nhất là bị chuyển rồi phải kể lại từ đầu.",
      "Tóm tắt ba phần: tên món, vấn đề, điều đã thử.",
      "Giữ nguyên chữ của khách ở chỗ là dữ kiện; đừng thay bằng kết luận của bot.",
      "Ngắn: người nhận đọc xong trong khoảng 10 giây.",
    ],
    practicePrompt: {
      question:
        "Bot chuyển một khách kèm tóm tắt: 'Khách bực vì đơn chậm.' Nhân viên vẫn phải hỏi lại. Thiếu gì nhất?",
      options: [
        "Mã đơn, ngày hẹn giao, số ngày đã trễ và điều khách đã làm",
        "Mô tả thêm về giọng điệu và mức độ bực của khách qua từng tin",
        "Lời khuyên cho nhân viên về cách xin lỗi sao cho khách nguôi",
        "Toàn bộ tài liệu chính sách giao hàng để nhân viên đối chiếu",
      ],
      correct: 0,
      explanation:
        "Nhân viên cần dữ kiện xử lý được: đơn nào, hẹn khi nào, trễ bao lâu, khách đã làm gì. 'Khách bực' chỉ là cảm xúc. Mô tả giọng điệu, lời khuyên xin lỗi và cả tài liệu chính sách đều không giúp tra đơn.",
    },
    summary: {
      keyIdea: "Chuyển giao tốt là người nhận nói được đúng vấn đề ngay câu đầu tiên.",
      formula: "Món + vấn đề + điều đã thử, ba dòng, giữ chữ của khách.",
      commonMistake: "Chuyển kèm 'khách cần hỗ trợ' hoặc dán cả 40 tin.",
      action: "Viết mẫu tóm tắt 3 dòng cho bot và thử trên một đoạn chat thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đoạn chat khiếu nại thật của shop (che tên và số điện thoại khách). Nhờ công cụ AI tóm tắt theo mẫu ba dòng 'Món / Vấn đề / Khách đã thử'. Đọc lại đối chiếu với đoạn chat gốc, sửa chỗ nào AI tự thêm hoặc diễn giải sai, rồi lưu thành mẫu dặn cho bot.",
      secondary: "Ngày mai bạn sẽ được hỏi: bản tóm tắt AI viết sai hoặc thêm chỗ nào so với đoạn chat gốc?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn là nhân viên nhận lại một cuộc chat từ bot. Bạn mở ra thấy 40 tin và một dòng 'khách cần hỗ trợ'. Khách thì đang chờ. Bài này dạy bạn viết mẫu tóm tắt để lần nào chuyển giao cũng trôi chảy.",
      },
      {
        type: "feynman",
        title: "Chuyển giao đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhận tiếp quầy từ ca trước. Nếu ca trước chỉ nói 'có khách đang chờ', bạn phải hỏi lại từ đầu. Nếu họ để lại tờ giấy: 'chị Mai, đơn 123, nồi đèn nhấp nháy, đã thử ổ khác', bạn vào việc ngay.",
        columns: ["Thành phần", "Giao ca quầy", "Bot chuyển sang người"],
        rows: [
          ["Người giao", "Nhân viên ca trước", "Bot trả lời"],
          ["Tờ giấy giao ca", "Ghi tên khách, việc, đã làm gì", "Tin nhắn tóm tắt: món, vấn đề, đã thử"],
          ["Điều làm khách bực", "Phải nói lại từ đầu với người mới", "Phải kể lại khi người thật nhận chat"],
          ["Cách tránh", "Tờ giấy ngắn, đủ ý", "Mẫu tóm tắt ba dòng, cố định"],
        ],
        oneLiner: "Chuyển giao tốt là một tờ giấy giao ca ngắn, đủ ý, và khách không phải nói lại.",
      },
      { type: "heading", text: "Ba dòng tóm tắt" },
      {
        type: "list",
        items: [
          "Món: tên sản phẩm hoặc đơn hàng (kèm mã nếu có).",
          "Vấn đề: khách nói gì, giữ nguyên chữ của khách ở chỗ là triệu chứng.",
          "Đã thử: khách (hoặc bot) đã làm những gì, để người nhận không đề nghị lại.",
        ],
      },
      {
        type: "callout",
        label: "Giữ dữ kiện, bỏ kết luận",
        text: "Bot rất dễ thêm kết luận như 'máy hỏng' hay 'khách đòi bồi thường'. Nếu khách không nói, đó là đoán. Tóm tắt chỉ ghi điều khách đã nói hoặc làm, không ghi điều bot nghĩ.",
      },
      {
        type: "flow",
        title: "Từ bot sang người mà không mất thông tin",
        steps: [
          { label: "Bot nhận ra cần người", detail: "Khi gặp dấu hiệu chuyển người (bài trước), bot dừng trả lời nội dung." },
          { label: "Bot viết tóm tắt ba dòng", detail: "Bot điền mẫu: món, vấn đề, điều đã thử, dựa trên chính đoạn chat." },
          { label: "Gửi cho người nhận", detail: "Tóm tắt nằm ở đầu, đoạn chat đầy đủ đính kèm bên dưới để người nhận đối chiếu khi cần." },
          { label: "Người nhận đọc 10 giây", detail: "Người nhận nắm được vấn đề và không phải hỏi lại từ đầu." },
          { label: "Người nhận mở đầu đúng chỗ", detail: "Câu đầu tiên gửi khách đã chứa đúng chi tiết của khách, nên khách thấy mình được lắng nghe." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tóm tắt yếu",
          text: "'Khách cần hỗ trợ về đơn hàng, đang bực.' Người nhận phải mở 40 tin hoặc hỏi lại khách.",
        },
        right: {
          label: "Tóm tắt tốt",
          text: "'Món: nồi chiên 5 lít, đơn 123. Vấn đề: đèn báo nhấp nháy, không lên nhiệt. Đã thử: cắm ổ khác, vẫn vậy.'",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dặn bot viết tóm tắt chuyển giao",
        task: "Khách mua nồi chiên không dầu, đơn 123, đèn nhấp nháy và đã thử cắm ổ khác. Chọn từng phần của câu dặn để xem bản tóm tắt bot viết cho nhân viên.",
        parts: [
          {
            id: "format",
            label: "Mẫu tóm tắt",
            options: [
              { text: "Viết một đoạn tóm tắt thật đầy đủ về cuộc trò chuyện.", feedback: "Không có khung, bot viết đoạn dài kể lể, và mỗi lần một kiểu nên nhân viên khó quét." },
              { text: "Viết đúng 3 dòng: Món, Vấn đề, Khách đã thử.", good: true, feedback: "Khung cố định giúp nhân viên nhìn vào là biết chỗ nào chứa gì." },
            ],
          },
          {
            id: "facts",
            label: "Nguồn dữ kiện",
            options: [
              { text: "Chỉ ghi điều khách đã nói hoặc làm; không thêm nhận xét hay đoán nguyên nhân.", good: true, feedback: "Bot không được thêm kết luận, nên tóm tắt không chứa thứ khách chưa từng nói." },
              { text: "Ghi cả nhận định của bạn về nguyên nhân và mức độ nghiêm trọng.", feedback: "Bot sẽ thêm 'máy hỏng mạch', dù khách chưa hề nói, làm nhân viên đi sai hướng." },
            ],
          },
          {
            id: "length",
            label: "Độ dài",
            options: [
              { text: "Mỗi dòng không quá 20 chữ, giữ nguyên chữ khách dùng.", good: true, feedback: "Ngắn và giữ chữ gốc giúp nhân viên đọc trong 10 giây mà không mất chi tiết." },
              { text: "Không giới hạn độ dài để không bỏ sót chi tiết nào.", feedback: "Bản dài biến thành bản chép lại đoạn chat, người nhận lại phải tự lọc." },
            ],
          },
        ],
        responses: [
          {
            requires: ["format", "facts", "length"],
            text: "Món: nồi chiên không dầu 5 lít, đơn 123.\nVấn đề: đèn báo nhấp nháy, máy không lên nhiệt.\nKhách đã thử: cắm sang ổ điện khác, kết quả vẫn vậy.",
          },
          {
            requires: ["format", "facts"],
            text: "Món: nồi chiên không dầu 5 lít, đơn 123.\nVấn đề: đèn báo nhấp nháy, máy không lên nhiệt, khách đã nhắn nhiều lần về việc này và các lần trước trong tuần cũng không rõ kết quả.\nKhách đã thử: cắm sang ổ điện khác, kết quả vẫn vậy, và đã thử nhiều cách khác trước đó.\n\n(Đúng khung, nhưng dài và có chỗ mơ hồ vì bot không bị giới hạn độ dài.)",
          },
          {
            text: "Khách đang rất bực vì máy hỏng mạch điều khiển, có thể muốn đổi máy hoặc đòi bồi thường, cần xử lý gấp.\n\n(Bot không có khung và tự thêm kết luận 'hỏng mạch', 'đòi bồi thường' mà khách chưa từng nói.)",
          },
        ],
      },
      { type: "heading", text: "Thử: bạn là người nhận chuyển giao" },
      {
        type: "scenario",
        title: "Nhận chat khi khách đã chờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bot chuyển cho bạn một khách kèm tóm tắt: 'Món: nồi chiên 5 lít, đơn 123. Vấn đề: đèn nhấp nháy. Đã thử: cắm ổ khác.' Khách đã chờ 5 phút.",
            choices: [
              { label: "Mở đầu bằng 'Chị cho em hỏi chị mua món gì và bị lỗi gì ạ?'", next: "bad_ask" },
              { label: "Mở đầu bằng 'Em thấy chị mua nồi 5 lít, đèn nhấp nháy dù đã thử ổ khác. Em kiểm tra giúp chị ngay ạ'", next: "s2" },
            ],
          },
          bad_ask: {
            text: "Khách trả lời: 'Tôi đã nói ở trên rồi, đọc đi!' Sự chờ đợi 5 phút cộng với phải kể lại khiến khách bực hơn trước khi bạn kịp giúp gì.",
            ending: "bad",
          },
          s2: {
            text: "Khách dịu hơn: 'Ừ, đúng rồi.' Bạn đọc tiếp và thấy bản tóm tắt thiếu việc khách đã báo hôm qua qua kênh khác.",
            choices: [
              { label: "Kiểm tra đơn 123, đề nghị bước tiếp theo mới (gửi kỹ thuật viên hoặc đổi máy) thay vì lặp lại cách đã thử", next: "good" },
              { label: "Nhờ khách thử lại cách cắm ổ khác vì tóm tắt chỉ là của bot, cần kiểm lại cho chắc", next: "bad_repeat" },
            ],
          },
          bad_repeat: {
            text: "Khách phải làm lại đúng việc đã làm, thấy bị coi như chưa ai lắng nghe. Một bản tóm tắt tốt đã bị phí vì người nhận không tin nó.",
            ending: "bad",
          },
          good: {
            text: "Bạn đề nghị gửi kỹ thuật viên ghé nhà hoặc đổi máy ngay tuần này, và khách chọn đổi máy. Cuộc xử lý chưa đầy 3 phút vì không phải hỏi lại gì.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chuyển giao tốt là ba dòng: món, vấn đề, điều đã thử.",
          "Bài sau: bot lỡ hứa hoàn tiền thay chủ shop, tìm câu vượt quyền.",
        ],
      },
    ],
  },
  {
    id: 2613,
    slug: "bot-hua-hoan-tien-thay-chu-shop-tim-loi-trong-doan-chat",
    title: "Chặng 60, Bài 14: Bot lỡ hứa hoàn tiền thay chủ shop: tìm câu vượt quyền",
    subtitle: "Bạn đọc một đoạn chat, đánh dấu câu bot nói vượt quá điều được cho phép, rồi viết lại giới hạn cho nó.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bot không có ác ý, nhưng nó muốn làm khách hài lòng và dễ nói 'được ạ' với thứ nó không có quyền hứa. Một lời hứa hoàn tiền trong khung chat là bằng chứng khách giữ được. Biết đọc đoạn chat để tìm câu vượt quyền giúp bạn sửa câu dặn trước khi mất tiền.",
    openingQuestion:
      "Bot của shop nhắn khách: 'Em rất tiếc, em sẽ hoàn tiền ngay cho chị trong hôm nay.' Shop chưa hề cho bot quyền hoàn tiền. Vấn đề chính là gì?",
    openingOptions: [
      "Bot đã hứa một việc nó không có thẩm quyền quyết định",
      "Bot dùng từ xin lỗi quá nhiều so với mức cần thiết khi trả lời",
      "Bot trả lời quá nhanh nên khách không tin là thật",
      "Bot viết câu hơi dài so với các tin nhắn khác",
    ],
    correctOption: 0,
    explanation:
      "Hoàn tiền là quyết định của chủ shop. Khi bot viết 'sẽ hoàn tiền ngay', khách coi đó là cam kết của shop và có thể chụp màn hình làm bằng chứng. Xin lỗi nhiều, trả lời nhanh hay câu dài đều là chuyện giọng văn, không gây thiệt hại tiền bạc. Chỗ cần sửa là câu dặn: bot chỉ được ghi nhận và chuyển cho người, không được hứa kết quả.",
    diagram: [
      { label: "Đọc từng câu bot đã nói", arrow: true },
      { label: "Hỏi: câu này có trong quyền được phép không", arrow: true },
      { label: "Đánh dấu câu hứa, câu khẳng định không có nguồn", arrow: true },
      { label: "Viết lại giới hạn trong chỉ dẫn gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: shop giày online",
      description:
        "Một shop giày cho bot trả lời tin nhắn. Khách hỏi về đôi giày bị bong đế sau 2 tháng, bot đáp: 'Em xin lỗi chị, shop sẽ đổi đôi mới cho chị miễn phí ạ.' Chính sách thật của shop chỉ bảo hành 1 tháng. Chủ shop xem lại đoạn chat, đánh dấu câu hứa đổi mới là câu vượt quyền, rồi thêm vào chỉ dẫn: 'Không hứa đổi, hoàn, giảm giá. Chỉ ghi nhận và báo chủ shop.'",
    },
    quiz: [
      q(
        "Câu nào của bot vượt quá quyền được phép?",
        [
          "Em sẽ hoàn tiền cho chị trong hôm nay, chị yên tâm ạ.",
          "Em xin lỗi về sự bất tiện, em đã ghi nhận và báo chủ shop ạ.",
          "Theo bảng giá của shop, sản phẩm này hiện có giá 450.000đ ạ.",
          "Em chưa thấy thông tin này, em nhờ chủ shop phản hồi chị nhé.",
        ],
        "Câu hứa hoàn tiền là cam kết kết quả, thuộc quyền chủ shop. Ba câu còn lại xin lỗi, báo giá đúng bảng giá, hoặc nhận chưa rõ đều nằm trong phạm vi bot được phép: ghi nhận, đọc tài liệu, và chuyển người.",
      ),
      q(
        "Bot viết 'Shop bảo hành 2 năm cho mọi sản phẩm' nhưng tài liệu chỉ ghi 'bảo hành 1 tháng'. Đây là lỗi loại nào?",
        [
          "Khẳng định sai so với tài liệu, nên là chỗ bịa cần đánh dấu",
          "Lỗi chính tả nhỏ, không đáng kể",
          "Lỗi cách xưng hô, vì bot chưa gọi khách đúng theo tuổi của họ",
          "Không phải lỗi, vì bảo hành dài hơn thì khách luôn hài lòng hơn",
        ],
        "Bot nói điều ngược lại với tài liệu, đó là bịa và sẽ thành cam kết thực tế với khách. Nó không phải chuyện chính tả hay xưng hô, và bảo hành dài hơn mức có thật chính là thứ shop không muốn phải thực hiện.",
      ),
      q(
        "Muốn tìm câu vượt quyền trong đoạn chat, cách đọc nào hiệu quả nhất?",
        [
          "Với mỗi câu bot nói, hỏi: câu này có trong tài liệu hoặc quyền được dặn không",
          "Đọc lướt toàn đoạn một lần để xem tổng thể có tạo cảm giác ổn không",
          "Chỉ đọc câu cuối cùng của bot vì lỗi nghiêm trọng thường nằm ở cuối",
          "Đếm số câu bot xin lỗi, nếu nhiều hơn 3 câu thì coi như vượt quyền",
        ],
        "Kiểm tra từng câu theo hai nguồn là tài liệu và quyền được dặn sẽ bắt được cả lời hứa lẫn khẳng định sai. Đọc lướt dễ bỏ sót, câu vượt quyền có thể nằm giữa đoạn, và số lần xin lỗi chẳng đo được việc bot hứa gì.",
      ),
      q(
        "Sau khi tìm ra câu vượt quyền, cách sửa tốt nhất là gì?",
        [
          "Viết rõ vào chỉ dẫn: không hứa hoàn, đổi, giảm giá; chỉ ghi nhận và báo chủ shop",
          "Dặn bot 'không được nói sai nữa' và thử lại xem lần sau bot có nhớ không",
          "Xoá đoạn chat đó khỏi lịch sử để khách không còn bằng chứng về lời hứa",
          "Tắt bot hẳn và tự trả lời mọi tin nhắn, vì bot không thể tin được",
        ],
        "Lỗi bắt nguồn từ chỉ dẫn thiếu, nên cách sửa là giới hạn rõ điều bot không được hứa và điều nó được làm thay thế. 'Đừng sai' không có nội dung. Xoá lịch sử không xoá được ảnh chụp của khách, và tắt bot bỏ luôn phần bot làm tốt.",
      ),
      q(
        "Câu nào dưới đây là giới hạn rõ ràng để dặn bot?",
        [
          "Không hứa hoàn tiền, đổi hàng hay giảm giá; nếu khách đòi thì báo chủ shop sẽ liên hệ.",
          "Hãy cẩn thận khi nói về tiền và đừng làm gì có thể gây rắc rối cho shop.",
          "Hãy thận trọng với các lời hứa, chỉ hứa những thứ mà bạn thấy hợp lý.",
          "Luôn lịch sự và tránh các chủ đề nhạy cảm, đặc biệt là những chủ đề liên quan tới khiếu nại.",
        ],
        "Giới hạn tốt nêu đích danh điều bị cấm và hành động thay thế. 'Cẩn thận', 'thận trọng' hay 'tránh chủ đề nhạy cảm' không cho bot biết cụ thể phải làm hay tránh điều gì, nên mỗi lần bot hiểu một kiểu.",
      ),
    ],
    keyTakeaways: [
      "Mỗi câu bot nói phải có nguồn: tài liệu hoặc quyền được dặn.",
      "Hứa kết quả (hoàn, đổi, giảm) là việc của chủ shop, không phải của bot.",
      "Khẳng định trái tài liệu là bịa, đánh dấu như câu vượt quyền.",
      "Sửa ở chỉ dẫn: nêu đích danh điều cấm và điều được làm thay.",
    ],
    practicePrompt: {
      question:
        "Bot nói với khách: 'Chị cứ gửi lại hàng, shop sẽ hoàn đủ 100% kể cả phí ship nhé.' Chính sách chỉ hoàn tiền hàng, không hoàn ship. Câu này sai ở đâu?",
      options: [
        "Hứa hoàn cả phí ship, vượt chính sách và vượt quyền của bot",
        "Dùng chữ 'chị' mà không hỏi khách có muốn được gọi như vậy không",
        "Nhắc tới số 100% mà không nói rõ cách tính phần trăm đó cho khách hiểu",
        "Yêu cầu khách gửi lại hàng mà không hỏi khách có còn giữ hàng không",
      ],
      correct: 0,
      explanation:
        "Điểm sai là cam kết hoàn cả ship: chính sách chỉ hoàn tiền hàng, và bot càng không có quyền tự quyết. Xưng 'chị' là cách xưng hô thông thường, số 100% là hứa chứ không thiếu cách tính, và chuyện hỏi khách còn giữ hàng là chi tiết phụ.",
    },
    summary: {
      keyIdea: "Đọc từng câu bot, hỏi có nguồn không, rồi chốt giới hạn vào chỉ dẫn.",
      formula: "Mỗi câu bot nói = tài liệu hoặc quyền được dặn, nếu không là vượt quyền.",
      commonMistake: "Dặn bot 'đừng sai' thay vì nêu đích danh điều không được hứa.",
      action: "Đọc 10 đoạn chat của bot và đánh dấu mọi câu có chữ 'sẽ' hứa kết quả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 5 đoạn chat mà bot (hoặc công cụ AI bạn thử) đã trả lời khách. Đọc từng câu bot nói và gạch chân mọi câu hứa hoàn, đổi, giảm giá, thời hạn hoặc khẳng định về chính sách. Với mỗi câu gạch, ghi nó có trong tài liệu hay không.",
      secondary: "Ngày mai bạn sẽ được hỏi: bạn tìm được bao nhiêu câu vượt quyền, và bạn sửa câu dặn thế nào?",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, khách đưa bạn xem ảnh chụp màn hình: bot của shop ghi 'sẽ hoàn tiền ngay cho chị'. Bạn chưa từng cho phép điều đó. Bài này dạy bạn đọc đoạn chat như người kiểm bài để tìm những câu như vậy.",
      },
      {
        type: "feynman",
        title: "Câu vượt quyền đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung nhân viên trực quầy vừa nói với khách: 'Dạ shop sẽ hoàn tiền cho anh.' Nhưng chị chủ chưa nói vậy. Khách giữ lời đó như một lời hứa của cả tiệm, dù nhân viên không có quyền hứa.",
        columns: ["Thành phần", "Nhân viên trực quầy", "Bot của shop"],
        rows: [
          ["Quyền được phép", "Báo giá, ghi đơn, hướng dẫn cách đổi", "Đọc tài liệu, trả lời, ghi nhận, chuyển người"],
          ["Điều không được tự hứa", "Hoàn tiền, giảm giá, đổi ngoài chính sách", "Đúng những điều đó"],
          ["Vì sao dễ vượt", "Muốn khách vui ngay", "Muốn tạo câu nghe hợp lý, vui lòng khách"],
          ["Cách phát hiện", "Chị chủ nghe lại, đối chiếu với điều đã dặn", "Đọc đoạn chat, đối chiếu từng câu với tài liệu và quyền"],
        ],
        oneLiner: "Câu vượt quyền là lời hứa của người không có quyền hứa, dù là người hay bot.",
      },
      { type: "heading", text: "Ba loại câu hay vượt quyền" },
      {
        type: "list",
        items: [
          "Hứa kết quả: 'sẽ hoàn', 'sẽ đổi', 'sẽ giảm', 'chắc chắn được'.",
          "Nói trái tài liệu: bảo hành dài hơn thật, đổi trả nhiều ngày hơn thật.",
          "Thay chủ shop quyết định: 'shop đồng ý', 'shop cho phép ngoại lệ'.",
        ],
      },
      {
        type: "callout",
        label: "Về chính sách và pháp lý",
        text: "Nếu khách viện dẫn luật hay quyền lợi người tiêu dùng, bot không tự giải thích điều khoản. Hãy ghi trong chỉ dẫn là chuyển cho chủ shop; chuyện pháp lý thì hỏi bộ phận pháp chế hoặc chuyên gia.",
      },
      {
        type: "flow",
        title: "Quy trình soát một đoạn chat",
        steps: [
          { label: "Đọc từng câu bot", detail: "Đừng đọc lướt: lời hứa thường nằm giữa đoạn, bọc trong câu xin lỗi." },
          { label: "Hỏi về nguồn", detail: "Với mỗi câu có nội dung, hỏi: có trong tài liệu không, hoặc nằm trong quyền tôi đã cho bot không?" },
          { label: "Đánh dấu câu vượt quyền", detail: "Ghi lại câu, lý do, và loại: hứa kết quả, nói trái tài liệu, hay thay chủ shop quyết định." },
          { label: "Viết lại giới hạn", detail: "Trong chỉ dẫn gốc, nêu đích danh điều không được hứa và điều được làm thay." },
          { label: "Thử lại bằng câu hỏi cũ", detail: "Hỏi bot đúng tình huống đã lỗi để xem nó còn hứa không." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm câu vượt quyền trong đoạn chat của bot",
        task: "Tài liệu của shop giày: bảo hành 1 tháng, đổi size trong 7 ngày nếu chưa mang, không có hoàn tiền trừ khi chủ shop duyệt. Khách than đôi giày bong đế sau 2 tháng. Bấm vào các câu bot nói vượt quyền hoặc sai tài liệu.",
        segments: [
          { text: "Dạ em xin lỗi chị về sự bất tiện với đôi giày ạ." },
          {
            text: "Giày bong đế sau 2 tháng vẫn nằm trong bảo hành, shop sẽ đổi đôi mới miễn phí cho chị.",
            error: "Tài liệu chỉ bảo hành 1 tháng; bot nói sai thời hạn và còn hứa đổi mới, là quyền của chủ shop.",
          },
          { text: "Chị cho em xin mã đơn hàng để em ghi nhận giúp chị ạ." },
          {
            text: "Nếu chị muốn, shop cũng sẽ hoàn lại toàn bộ tiền cho chị trong hôm nay.",
            error: "Hoàn tiền chỉ khi chủ shop duyệt. Bot không được hứa, và càng không hứa thời hạn 'trong hôm nay'.",
          },
          {
            text: "Em đã báo chủ shop, chủ shop sẽ xem xét và liên hệ chị trong giờ làm việc ạ.",
          },
        ],
      },
      { type: "heading", text: "Sửa giới hạn cho bot" },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết lại giới hạn để bot không hứa thay chủ shop",
        task: "Bot vừa hứa hoàn tiền. Chọn các phần của câu dặn mới để xem bot trả lời lại tình huống bong đế sau 2 tháng.",
        parts: [
          {
            id: "forbid",
            label: "Điều cấm",
            options: [
              { text: "Không được hứa hoàn tiền, đổi mới, giảm giá hay ngoại lệ bảo hành.", good: true, feedback: "Nêu đích danh điều cấm, nên bot nhận ra đúng khoảnh khắc không được hứa." },
              { text: "Hãy thận trọng khi nói về tiền bạc.", feedback: "'Thận trọng' không cho bot biết dừng ở đâu, nên nó vẫn hứa theo cách nhẹ nhàng hơn." },
            ],
          },
          {
            id: "instead",
            label: "Thay vào đó",
            options: [
              { text: "Xin mã đơn, ghi nhận vấn đề và nói chủ shop sẽ liên hệ trong giờ làm việc.", good: true, feedback: "Bot có hành động thay thế cụ thể, khách vẫn được giúp mà không có lời hứa nào." },
              { text: "Xin lỗi khách thật nhiều để khách đỡ giận.", feedback: "Chỉ xin lỗi mà không có bước tiếp theo, khách thấy bị cho qua và tức hơn." },
            ],
          },
          {
            id: "policy",
            label: "Khi nói về chính sách",
            options: [
              { text: "Chỉ trích dẫn đúng thời hạn trong tài liệu; nếu khách ngoài thời hạn thì báo chủ shop.", good: true, feedback: "Bot không tự kéo dài thời hạn, nên không còn chuyện 2 tháng vẫn trong bảo hành." },
              { text: "Nếu khách hơi quá hạn thì cứ linh động cho khách vui lòng.", feedback: "'Linh động' là quyền của chủ shop, bot sẽ hiểu là được hứa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["forbid", "instead", "policy"],
            text: "Dạ em xin lỗi chị về đôi giày ạ. Theo chính sách, bảo hành của shop là 1 tháng nên trường hợp này em chưa thể xác nhận đổi. Em đã ghi nhận, chị cho em xin mã đơn để chủ shop xem xét và liên hệ chị trong giờ làm việc ạ.",
          },
          {
            requires: ["forbid", "instead"],
            text: "Dạ em xin lỗi chị. Em đã ghi nhận và chủ shop sẽ liên hệ chị trong giờ làm việc ạ.\n\n(Không hứa, nhưng bot chưa nêu thời hạn bảo hành trong tài liệu nên khách không biết vì sao chưa được đổi ngay.)",
          },
          {
            text: "Dạ em rất tiếc. Trường hợp này em linh động cho chị đổi đôi mới miễn phí nhé, chị yên tâm ạ.\n\n(Bot 'linh động' và hứa đổi mới vì giới hạn mơ hồ hoặc thiếu hành động thay thế.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bạn phát hiện lời hứa trong đoạn chat cũ",
        start: "s1",
        nodes: {
          s1: {
            text: "Kiểm đoạn chat sáng nay, bạn thấy bot hứa hoàn tiền cho một khách. Khách chưa nhắn lại. Chính sách của shop không cho hoàn trường hợp này.",
            choices: [
              { label: "Bỏ qua, hy vọng khách không nhớ", next: "bad_ignore" },
              { label: "Liên hệ khách sớm, nói rõ bot nhầm và đề xuất cách bạn thật sự làm được", next: "s2" },
            ],
          },
          bad_ignore: {
            text: "Hai ngày sau khách nhắn đòi hoàn tiền kèm ảnh chụp lời hứa của bot. Bây giờ bạn vừa phải xử lý đòi hỏi, vừa mất uy tín vì không báo trước.",
            ending: "bad",
          },
          s2: {
            text: "Khách hơi không vui nhưng chấp nhận vì bạn chủ động gọi và có đề xuất đổi quà tặng thay thế. Bạn cần ngăn lỗi lặp lại.",
            choices: [
              { label: "Thêm vào chỉ dẫn: không hứa hoàn, đổi, giảm; chỉ ghi nhận và báo chủ shop, rồi thử lại tình huống cũ", next: "good" },
              { label: "Chỉ sửa tay riêng đoạn chat này, không đổi chỉ dẫn", next: "bad_patch" },
            ],
          },
          bad_patch: {
            text: "Tuần sau bot hứa đổi hàng cho một khách khác theo đúng kiểu cũ vì nguyên nhân nằm ở chỉ dẫn, chưa hề được sửa.",
            ending: "bad",
          },
          good: {
            text: "Bạn thử lại đúng câu hỏi cũ: lần này bot chỉ ghi nhận và báo chủ shop. Bạn ghi tình huống này vào bộ câu thử của bot.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi câu bot nói cần có nguồn; lời hứa kết quả thuộc về chủ shop.",
          "Bài sau: bộ 25 câu hỏi khó để thử bot trước khi dùng thật.",
        ],
      },
    ],
  },
  {
    id: 2614,
    slug: "du-an-nho-bo-25-cau-hoi-kho-de-thu-bot-truoc-khi-dung",
    title: "Chặng 60, Bài 15: Dự án nhỏ: bộ 25 câu hỏi khó để thử bot trước khi dùng thật",
    subtitle: "Bạn viết câu hỏi lắt léo (hỏi vòng, hai ý, viết tắt, ngoài lề) và ghi kết quả mong muốn để chấm bot.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách thật không hỏi như trong sách. Họ hỏi tắt, hỏi hai ý cùng lúc, hỏi vòng vo hoặc hỏi ngoài lề. Nếu bạn chỉ thử bằng những câu đẹp, bot sẽ qua bài thử rồi gục ngay ngày đầu. Bộ 25 câu khó viết sẵn cho bạn một thước đo để chấm bot trước khi nó gặp khách.",
    openingQuestion:
      "Bạn thử bot bằng 5 câu đẹp, đúng như trong tài liệu, và cả 5 đều đúng. Nhận định nào hợp lý nhất?",
    openingOptions: [
      "Chưa đủ: các câu thử quá dễ nên chưa cho biết bot xử lý câu khó ra sao",
      "Bot đã sẵn sàng, vì năm trên năm là kết quả hoàn hảo cho một bài thử",
      "Bot dùng được một phần, chỉ cần thêm 5 câu đẹp nữa là chắc chắn hơn",
      "Bot cần thêm tài liệu trước, vì thử lúc này chưa đủ thông tin để đánh giá",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi đẹp, trùng chữ với tài liệu, là dạng bot dễ trả lời nhất. Chúng cho biết bot chép được chứ chưa cho biết bot xử lý khách thật, vốn hỏi tắt, hỏi hai ý, hỏi vòng. Thêm 5 câu đẹp nữa vẫn cùng một loại, nên không thêm thông tin gì mới. Chưa đủ tài liệu là chuyện khác, không liên quan tới độ khó của bài thử.",
    diagram: [
      { label: "Nhớ lại cách khách thật hỏi", arrow: true },
      { label: "Viết 25 câu theo 5 dạng khó", arrow: true },
      { label: "Ghi kết quả mong muốn cho từng câu", arrow: true },
      { label: "Chạy bot, chấm, sửa rồi chạy lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: tiệm hoa nhỏ",
      description:
        "Một tiệm hoa thử bot bằng những câu như 'giá bó hoa hồng 20 bông là bao nhiêu?' và bot đúng hết. Ngày đầu chạy thật, khách nhắn: 'hoa hồng đỏ vs trắng khác gì, giao q3 trong chiều nay đc ko, và có bó nào dưới 300k ko?' Bot chỉ trả lời nửa đầu và quên hai ý sau. Chủ tiệm sau đó viết bộ 25 câu khó, gồm cả câu viết tắt, hai ý và ngoài lề, rồi thử lại sau mỗi lần sửa câu dặn.",
    },
    quiz: [
      q(
        "Dạng câu hỏi nào đúng là 'hỏi hai ý cùng lúc'?",
        [
          "Hoa hồng đỏ khác trắng thế nào, và giao trong chiều nay được không?",
          "Cho mình hỏi giá hoa hồng đỏ đi, giá hoa hồng đỏ bao nhiêu vậy?",
          "Hoa hồng đỏ có giá thế nào theo bảng giá hiện tại của tiệm mình?",
          "Mình muốn mua hoa hồng đỏ, không biết tiệm có bán loại hoa này chưa?",
        ],
        "Câu đầu có hai câu hỏi khác nhau: sự khác biệt giữa hai loại hoa và khả năng giao trong chiều nay. Bot phải trả lời cả hai. Các câu còn lại chỉ xoay quanh một ý (giá hoặc việc có bán), chỉ khác cách diễn đạt.",
      ),
      q(
        "Khách nhắn 'giao q3 đc ko, còn bó dưới 300k ko?'. Bài thử này kiểm tra điều gì?",
        [
          "Khả năng hiểu viết tắt và trả lời đủ hai ý",
          "Khả năng bot đếm số chữ trong tin nhắn của khách hàng",
          "Khả năng bot chép lại nguyên văn câu hỏi của khách ở đầu câu đáp",
          "Khả năng bot dịch tin nhắn sang tiếng Anh rồi trả lời bằng tiếng Anh",
        ],
        "Khách thật viết tắt ('q3', 'đc', 'ko', '300k') và hỏi nhiều ý một lúc. Câu thử này kiểm tra bot hiểu viết tắt và không bỏ sót ý nào. Đếm chữ, chép lại câu hỏi hay dịch sang tiếng Anh đều không liên quan tới việc phục vụ khách.",
      ),
      q(
        "Vì sao mỗi câu thử cần ghi kết quả mong muốn trước khi chạy bot?",
        [
          "Để chấm bot theo thước đo có sẵn, thay vì tự thấy ổn khi đọc",
          "Để bot biết trước đáp án và trả lời giống hệt như đã ghi sẵn",
          "Để rút ngắn thời gian vì không cần đọc câu trả lời của bot sau đó",
          "Để hệ thống tự động ghi điểm mà người thử không cần tham gia chấm",
        ],
        "Nếu chỉ đọc câu trả lời rồi 'thấy ổn', bạn dễ bị trơn tru đánh lừa. Kết quả mong muốn ghi trước cho bạn thước đo cố định, và so được giữa các lần thử. Bot không được xem đáp án, bạn vẫn phải đọc, và người vẫn là bên chấm.",
      ),
      q(
        "Trong bộ 25 câu, phân bổ nào hợp lý nhất?",
        [
          "Mỗi dạng khó khoảng 5 câu: hai ý, viết tắt, hỏi vòng, ngoài lề, ngoài tài liệu",
          "20 câu đẹp đúng tài liệu và 5 câu khó, để đa số kết quả xanh cho đẹp",
          "25 câu hỏi về cùng một món bán chạy nhất vì đó là món khách hỏi nhiều nhất",
          "25 câu khác nhau về giá, để chắc chắn bot không bao giờ nhầm về giá",
        ],
        "Bộ thử cần phủ nhiều dạng khó. Năm dạng, mỗi dạng khoảng năm câu, cho biết bot yếu ở dạng nào. Phần lớn câu đẹp làm điểm cao giả tạo, còn dồn hết vào một món hay một loại câu hỏi bỏ sót những chỗ bot dễ gục khác.",
      ),
      q(
        "Bot trả lời sai 6 trong 25 câu. Bước tiếp theo hợp lý là gì?",
        [
          "Xem 6 câu sai thuộc dạng nào, sửa chỉ dẫn hoặc tài liệu, rồi chạy lại cả bộ 25 câu",
          "Bỏ 6 câu sai khỏi bộ thử để tỉ lệ đúng đạt 100% rồi cho bot chạy thật",
          "Chỉ chạy lại 6 câu sai, nếu đúng thì coi như đã sửa xong cho cả bot",
          "Chạy thêm 25 câu đẹp cho đủ 50 câu để tỉ lệ đúng tăng lên trên 80%",
        ],
        "Nhìn dạng của 6 câu sai giúp biết sửa ở đâu, và phải chạy lại cả bộ vì một thay đổi có thể làm hỏng câu đã đúng. Xoá câu sai hay thêm câu đẹp chỉ chỉnh con số. Chỉ chạy lại 6 câu sai bỏ lỡ hỏng hóc phát sinh ở các câu khác.",
      ),
    ],
    keyTakeaways: [
      "Khách thật hỏi tắt, hai ý, vòng vo, ngoài lề: bài thử phải giống vậy.",
      "Mỗi câu thử có kết quả mong muốn ghi trước khi chạy.",
      "Phủ khoảng 5 dạng khó, mỗi dạng chừng 5 câu.",
      "Sửa xong phải chạy lại cả bộ, không chỉ các câu đã sai.",
    ],
    practicePrompt: {
      question:
        "Bạn sửa câu dặn cho bot và chỉ chạy lại 3 câu từng sai, cả 3 đều đúng. Vì sao vẫn chưa đủ để kết luận?",
      options: [
        "Sửa một chỗ có thể làm hỏng câu khác, nên cần chạy lại cả bộ",
        "Ba câu là quá ít nên kết quả không thể dùng để đánh giá gì cả",
        "Bot sẽ nhớ đáp án của ba câu đó nên lần thử sau không còn đáng tin",
        "Chỉ có người mới được kết luận, bot thử lại bao nhiêu lần cũng vô nghĩa",
      ],
      correct: 0,
      explanation:
        "Câu dặn là một khối: sửa cho câu này có thể làm câu khác lệch đi. Chạy lại cả bộ mới thấy được. Ba câu không phải 'quá ít' theo nghĩa thống kê, bot không nhớ đáp án giữa các lần thử, và việc người chấm không làm bot thử lại vô nghĩa.",
    },
    summary: {
      keyIdea: "Bộ 25 câu khó là thước đo trước khi bot gặp khách thật.",
      formula: "5 dạng khó x 5 câu + kết quả mong muốn ghi trước + chạy lại cả bộ sau mỗi lần sửa.",
      commonMistake: "Thử bằng câu đẹp trùng chữ với tài liệu rồi tưởng bot đã sẵn sàng.",
      action: "Viết 25 câu khó từ tin nhắn thật, ghi kết quả mong muốn cho từng câu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở 20 tin nhắn thật của khách cũ. Từ đó viết 25 câu thử gồm: 5 câu hai ý, 5 câu viết tắt hoặc sai chính tả, 5 câu hỏi vòng, 5 câu ngoài lề (chuyện không liên quan tới shop), 5 câu mà đáp án đúng là 'không biết'. Với mỗi câu ghi một dòng 'kết quả mong muốn'. Lưu thành một bảng để dùng lại.",
      secondary: "Ngày mai bạn sẽ được hỏi: bạn đã viết đủ bao nhiêu câu và có dạng nào còn thiếu?",
    },
    sections: [
      {
        type: "lead",
        text: "Bot trả lời xuất sắc năm câu bạn thử, rồi ngày đầu tiên gặp khách thật thì bỏ sót nửa câu hỏi. Lý do: bạn thử bằng những câu bạn tự viết, còn khách thì không hỏi như bạn. Bài này là một dự án nhỏ để bạn viết bộ thước đo cho bot.",
      },
      {
        type: "feynman",
        title: "Bộ câu khó đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn tuyển nhân viên mới và cho một buổi thử việc. Nếu chỉ hỏi những câu trong sổ tay, ai cũng qua. Bạn chỉ biết họ làm được khi đưa họ khách đòi hai việc một lúc, khách nói tắt và khách hỏi chuyện lạ.",
        columns: ["Thành phần", "Buổi thử việc", "Bộ 25 câu thử bot"],
        rows: [
          ["Người thử", "Bạn và nhân viên mới", "Bạn và bot"],
          ["Câu thử tốt", "Tình huống khó lấy từ khách thật", "Câu hỏi lắt léo lấy từ tin nhắn khách thật"],
          ["Điều cần có trước", "Bạn biết đáp án đúng là gì", "Kết quả mong muốn ghi trước cho từng câu"],
          ["Sau khi sửa", "Thử lại cả tình huống, không chỉ chỗ sai", "Chạy lại cả bộ 25 câu"],
        ],
        oneLiner: "Bộ câu khó là buổi thử việc của bot, dựa trên cách khách thật hỏi.",
      },
      { type: "heading", text: "Năm dạng câu khó" },
      {
        type: "list",
        items: [
          "Hai ý: 'Hoa hồng đỏ khác trắng sao, giao chiều nay được không?'",
          "Viết tắt, sai chính tả: 'giao q3 đc ko, dưới 300k ko?'",
          "Hỏi vòng: 'Nếu mình đặt hôm nay mà người nhận đi vắng thì sao?'",
          "Ngoài lề: 'Hôm nay trời mưa quá, tiệm có mở không?' hoặc 'bạn là người hay máy?'",
          "Ngoài tài liệu: hỏi món hoặc dịch vụ shop không có, đáp án đúng là 'chưa rõ'.",
        ],
      },
      {
        type: "callout",
        label: "Ghi kết quả mong muốn trước",
        text: "Với mỗi câu, viết một dòng: bot phải nói gì hoặc làm gì. Ví dụ 'trả lời cả hai ý', 'nhận chưa rõ và xin liên hệ', 'chuyển cho chủ shop'. Nếu không ghi trước, bạn sẽ chấm theo cảm giác sau khi đã đọc câu trả lời trơn tru.",
      },
      {
        type: "flow",
        title: "Vòng thử bot trước khi dùng thật",
        steps: [
          { label: "Lấy tin nhắn khách thật", detail: "Mở 20 tin cũ, chép lại những câu khách hỏi lộn xộn, hỏi tắt, hỏi hai ý." },
          { label: "Viết 25 câu theo 5 dạng", detail: "Mỗi dạng chừng 5 câu, gồm cả câu mà đáp án đúng là không biết hoặc chuyển người." },
          { label: "Ghi kết quả mong muốn", detail: "Một dòng cho mỗi câu, viết trước khi chạy bot." },
          { label: "Chạy bot và chấm", detail: "Đánh dấu đúng, sai hoặc thiếu ý. Ghi lại dạng câu nào sai nhiều." },
          { label: "Sửa rồi chạy lại cả bộ", detail: "Sửa câu dặn hoặc tài liệu, rồi chạy lại toàn bộ 25 câu để chắc không có chỗ khác vừa hỏng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bộ thử toàn câu đẹp",
          text: "'Giá bó hoa hồng 20 bông là bao nhiêu?' Trùng chữ với bảng giá, bot đúng ngay, nhưng không cho biết bot xử lý khách thật ra sao.",
        },
        right: {
          label: "Bộ thử có câu khó",
          text: "'hoa hồng đỏ vs trắng khác j, giao q3 chiều nay đc ko, co bó nào dưới 300k ko?' Bot phải hiểu viết tắt và trả lời đủ ba ý.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dặn AI giúp bạn viết câu thử khó",
        task: "Bạn muốn nhờ AI viết thêm câu hỏi khó cho bot của tiệm hoa. Chọn từng phần của yêu cầu và xem AI viết ra gì.",
        parts: [
          {
            id: "source",
            label: "Nguồn để viết",
            options: [
              { text: "Dựa trên 5 tin nhắn thật của khách mà tôi dán vào đây (đã xoá tên và số điện thoại).", good: true, feedback: "AI bám vào cách khách thật hỏi, nên câu thử có giọng thật thay vì giọng sách vở." },
              { text: "Hãy nghĩ ra những câu hỏi thú vị về hoa.", feedback: "Không có mẫu khách thật, AI viết câu gọn gàng, đẹp đẽ và lệch xa cách khách hỏi." },
            ],
          },
          {
            id: "kinds",
            label: "Dạng câu",
            options: [
              { text: "Viết 10 câu: 3 hai ý, 3 viết tắt, 2 hỏi vòng, 2 ngoài tài liệu.", good: true, feedback: "Nêu rõ dạng và số lượng, nên AI phủ đủ dạng khó thay vì lặp một kiểu." },
              { text: "Viết thật nhiều câu hỏi khó.", feedback: "'Khó' mơ hồ, AI sẽ viết những câu dài và triết lý thay vì những câu khách thật hay hỏi." },
            ],
          },
          {
            id: "expected",
            label: "Kết quả mong muốn",
            options: [
              { text: "Sau mỗi câu, ghi một dòng bot cần làm: trả lời đủ ý, nhận chưa rõ hoặc chuyển người.", good: true, feedback: "Mỗi câu có sẵn thước đo, nên bạn chấm được ngay mà không phải suy nghĩ lại." },
              { text: "Chỉ liệt kê câu hỏi, tôi sẽ tự nghĩ đáp án sau.", feedback: "Không có kết quả mong muốn, bạn sẽ chấm theo cảm giác sau khi đọc câu trả lời trơn tru." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "kinds", "expected"],
            text: "1. (hai ý) 'Hoa hồng đỏ khác trắng sao, chiều nay giao được k?' -> Bot phải trả lời cả hai ý.\n2. (viết tắt) 'giao q3 đc ko, còn bó dưới 300k ko?' -> Bot hiểu viết tắt, trả lời giao được hay chưa rõ và giá theo bảng giá.\n3. (hỏi vòng) 'Nếu người nhận đi vắng thì hoa để ở đâu?' -> Nếu tài liệu không có: nhận chưa rõ và xin liên hệ.\n4. (ngoài tài liệu) 'Tiệm có bán cây cảnh không?' -> Nhận chưa rõ, không bịa.",
          },
          {
            requires: ["source", "kinds"],
            text: "1. 'Hoa hồng đỏ khác trắng sao, chiều nay giao được k?'\n2. 'giao q3 đc ko, còn bó dưới 300k ko?'\n3. 'Nếu người nhận đi vắng thì hoa để ở đâu?'\n\n(Đúng giọng khách thật, nhưng chưa có kết quả mong muốn để chấm bot.)",
          },
          {
            text: "1. Hoa hồng tượng trưng cho ý nghĩa gì trong văn hoá các nước phương Tây?\n2. Bạn nghĩ gì về xu hướng hoa khô trong những năm gần đây?\n\n(Câu hỏi sách vở, không giống khách thật và không kiểm tra được khả năng của bot với khách.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chấm bot bằng bộ câu khó",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn chạy 25 câu. Bot đúng 17 câu, sai hoặc thiếu ý ở 8 câu, chủ yếu ở dạng 'hai ý' và 'hỏi vòng'. Bạn đang định bật bot cho khách vì 17/25 nghe cũng khá.",
            choices: [
              { label: "Bật bot luôn vì hơn hai phần ba là đúng", next: "bad_early" },
              { label: "Xem 8 câu sai thuộc dạng nào, sửa chỉ dẫn (dặn bot liệt kê và trả lời từng ý) rồi chạy lại cả bộ", next: "s2" },
            ],
          },
          bad_early: {
            text: "Ngày đầu bot bỏ sót nửa số câu hai ý của khách. Một khách hỏi về giá và giờ giao chỉ nhận được giá, rồi mua nhầm khung giờ không giao được.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi sửa, bạn chạy lại cả bộ: bot đúng 22 câu. Nhưng hai câu ngoài tài liệu mà trước đó đúng nay lại bị bịa.",
            choices: [
              { label: "Bỏ qua hai câu đó vì tổng điểm đã tăng", next: "bad_ignore" },
              { label: "Xem câu dặn mới có làm bot bớt chịu nói không biết, sửa lại rồi chạy lại cả bộ lần nữa", next: "good" },
            ],
          },
          bad_ignore: {
            text: "Điểm tổng tăng nhưng bot bắt đầu bịa về sản phẩm không có. Hai câu tưởng nhỏ là dấu hiệu sửa xong chỗ này lại làm hỏng chỗ khác.",
            ending: "bad",
          },
          good: {
            text: "Chạy lại thấy bot đúng 24 trên 25 câu và vẫn nhận 'không biết' ở những câu ngoài tài liệu. Bạn lưu bảng 25 câu để thử lại mỗi khi đổi tài liệu hoặc chỉ dẫn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bộ câu khó cho bạn thước đo trước khi khách thật gặp bot.",
          "Bài sau: đo chất lượng và giữ bot luôn mới.",
        ],
      },
    ],
  },
];
