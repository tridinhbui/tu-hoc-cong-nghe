import type { Lesson } from "../lesson-types";

// Chặng 55, bài 11-15. Giáo trình: scripts/curriculum/stage-55.json.
// Không nêu tính năng hay giao diện của công cụ cụ thể nào: chỉ dạy cách thiết
// kế bước dự phòng, thông báo và kế hoạch xử lý lỗi, áp dụng cho mọi công cụ.

const mk = (question: string, correct: string, wrongs: string[], explanation: string) => ({
  question,
  options: [correct, ...wrongs],
  correct: 0,
  explanation,
});

export const S55_C_LESSONS: Lesson[] = [
  {
    id: 2510,
    slug: "khi-ai-tra-loi-sai-hay-bo-trong",
    title: "Chặng 55, Bài 11: Khi AI trả lời sai hoặc bỏ trống: bước dự phòng là gì",
    subtitle: "Máy soát vé không đoán vé hỏng: nó mở lối bên cạnh cho nhân viên.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛟",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quy trình nhờ AI phân loại yêu cầu của khách chạy rất ổn cho tới sáng thứ Hai, khi một yêu cầu trả về ô trống và một yêu cầu khác nhận nhãn lạ mà chưa ai từng đặt. Nếu không có quy định trước, quy trình hoặc dừng im lặng, hoặc đoán bừa rồi gửi đi. Một bước dự phòng viết sẵn biến cả hai tình huống thành một việc bình thường: chuyển cho người.",
    openingQuestion:
      "Quy trình nhờ AI gắn nhãn yêu cầu của khách. Sáng nay một yêu cầu nhận về ô trống. Bạn nên quy định sẵn điều gì?",
    openingOptions: [
      "Ô trống hoặc nhãn lạ thì chuyển sang hàng người xem, không đoán",
      "Ô trống thì tự gắn nhãn 'Khác' để quy trình chạy tiếp không bị dừng",
      "Ô trống thì chạy lại AI cho tới khi có kết quả rồi dùng bản đầu tiên",
      "Ô trống hiếm khi xảy ra nên chưa cần quy định gì, cứ chờ gặp rồi tính",
    ],
    correctOption: 0,
    explanation:
      "Một ô trống hay nhãn lạ là dấu hiệu AI không chắc hoặc hỏng, và lúc đó đoán là lúc dễ gây hại nhất. Chuyển cho người biến lỗi thành một việc có người nhận. Gắn 'Khác' thì yêu cầu nằm lẫn trong đống không ai đọc. Chạy lại tới khi ra chữ là ép AI nói điều gì đó, kể cả khi nó bịa. Còn chờ gặp rồi tính nghĩa là lần đầu gặp lỗi sẽ không ai biết mình phải làm gì.",
    diagram: [
      { label: "AI trả về một nhãn cho yêu cầu của khách", arrow: true },
      { label: "Kiểm: có trống không, có nằm trong danh sách nhãn cho phép không", arrow: true },
      { label: "Hợp lệ: đi tiếp theo quy trình; không hợp lệ: sang hàng người xem kèm lý do" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm chăm sóc khách hàng nhỏ dùng AI gắn nhãn 'hoàn tiền', 'giao chậm', 'hỏi thông tin'. Họ thêm một luật: nhãn rỗng hoặc ngoài ba nhãn đó thì yêu cầu rơi vào một hàng riêng tên 'Cần người xem' kèm câu 'AI không chắc'. Mỗi sáng một người dọn hàng này trước khi làm việc khác. Vài yêu cầu khó nhất không bao giờ bị gửi nhầm đi nữa.",
    },
    quiz: [
      mk(
        "AI trả về nhãn 'Khiếu nại nghiêm trọng', nhãn không có trong danh sách bạn đặt. Quy trình nên làm gì?",
        "Coi là nhãn lạ và chuyển sang hàng người xem",
        [
          "Chấp nhận nhãn vì AI có thể đã nhìn ra loại mới mà bạn bỏ sót, rồi chuyển theo nhãn đó",
          "Tự đổi sang nhãn gần nghĩa nhất trong danh sách rồi cho quy trình chạy tiếp như thường",
          "Xoá yêu cầu khỏi quy trình vì nhãn sai cho thấy nội dung yêu cầu không hợp lệ",
        ],
        "Nhãn ngoài danh sách nghĩa là AI không bám theo khung bạn đặt, nên người phải xem. Chấp nhận nhãn lạ làm quy trình rẽ vào nhánh chưa ai thiết kế, tự đổi sang nhãn gần nghĩa là đoán thay AI, còn xoá yêu cầu là làm mất một khách thật.",
      ),
      mk(
        "Vì sao không nên gắn nhãn mặc định 'Khác' cho mọi kết quả rỗng?",
        "Vì yêu cầu chìm trong hàng 'Khác', không ai được giao và không ai bị nhắc",
        [
          "Vì nhãn 'Khác' không có trong danh sách chuẩn của công cụ AI",
          "Vì nhãn mặc định làm AI học sai nên nó trả ô trống nhiều hơn",
          "Vì khách thấy nhãn 'Khác' và sẽ nghĩ công ty không quan tâm",
        ],
        "'Khác' là chỗ yêu cầu nằm im: không ai được giao, không ai bị nhắc. AI không 'học' từ nhãn mặc định trong quy trình này, khách thường không thấy nhãn nội bộ, và việc công cụ có báo lỗi hay không tuỳ cách bạn dựng chứ không phải lý do chọn.",
      ),
      mk(
        "Bạn kiểm thử quy trình bằng ba ví dụ hỏng. Bộ ba nào đáng thử nhất?",
        "Một ô trống, một nhãn lạ, một yêu cầu viết dở dang và khó hiểu",
        [
          "Ba yêu cầu điển hình nhất trong tuần, làm việc nhiều nhất",
          "Ba yêu cầu dài nhất, vì yêu cầu càng dài thì AI càng dễ trả về kết quả hỏng hơn các yêu cầu còn lại",
          "Ba yêu cầu giống hệt nhau, để xem quy trình có trả về cùng một kết quả mỗi lần chạy lại hay không",
        ],
        "Ví dụ hỏng phải đại diện cho các kiểu hỏng: trống, lạ, thiếu thông tin. Ba yêu cầu điển hình chỉ chứng minh lúc bình thường; yêu cầu dài chưa chắc làm AI hỏng; ba bản giống nhau chỉ thử một kiểu và quy trình vẫn có thể sập ở kiểu khác.",
      ),
      mk(
        "Yêu cầu sang hàng người xem nên đi kèm điều gì để người nhận xử lý nhanh?",
        "Nội dung gốc của khách, kết quả AI trả về và dòng ghi lý do bị chuyển",
        [
          "Chỉ nội dung gốc của khách, để người xem không bị nhãn AI làm lệch",
          "Chỉ nhãn AI trả về, vì người xem tin vào nhãn và chỉ sửa chỗ khác",
          "Một bản tóm tắt do AI viết lại, vì người xem không có thời gian đọc",
        ],
        "Người xem cần biết AI thấy gì và vì sao nó bị dừng. Bỏ nhãn đi thì mất manh mối, chỉ có nhãn thì không thấy nội dung, còn đưa bản tóm tắt của AI vào đúng ca AI đã trục trặc là thêm một lớp có thể sai nữa.",
      ),
      mk(
        "Nhóm bạn có 20 yêu cầu mỗi ngày và khoảng 3 yêu cầu rơi vào hàng người xem. Một người dọn 2 phút mỗi yêu cầu. Thời gian dọn mỗi ngày là bao nhiêu?",
        "6 phút (= 3 yêu cầu × 2 phút)",
        [
          "40 phút (= 20 yêu cầu × 2 phút, tính cả những yêu cầu đã được AI xử lý xong)",
          "23 phút (= 20 + 3 yêu cầu, rồi tính thêm mỗi yêu cầu một phút xem lại cho chắc chắn)",
          "5 phút (= 3 + 2, cộng số yêu cầu với số phút thay vì nhân hai số này với nhau)",
        ],
        "Chỉ những yêu cầu rơi vào hàng người xem mới cần dọn, nên 3 × 2 = 6 phút. Nhân 20 với 2 tính cả yêu cầu đã xong; cộng thay vì nhân cho ra 5 hoặc 23, đều sai phép tính. Con số này minh hoạ: lượng thật phụ thuộc quy trình của bạn.",
      ),
    ],
    keyTakeaways: [
      "Quy định trước: kết quả rỗng hoặc lạ thì chuyển cho người, không đoán.",
      "Dự phòng phải có người nhận và có hạn, không chỉ có một nhãn 'Khác'.",
      "Kiểm thử bằng ví dụ hỏng: trống, lạ, dở dang.",
      "Mỗi ca chuyển kèm nội dung gốc, kết quả AI và lý do.",
      "Dọn hàng người xem đều đặn, vì hàng không ai dọn là lỗi im lặng.",
    ],
    practicePrompt: {
      question:
        "Chị Hà cho AI gắn nhãn đơn xin nghỉ phép. Một đơn nhận nhãn 'Nghỉ ốm hoặc nghỉ cưới'. Nên làm gì?",
      options: [
        "Coi là nhãn lạ và chuyển cho người kiểm tra đơn",
        "Chọn nhãn đầu tiên trong hai nhãn vì AI đã gợi ý như vậy",
        "Hỏi AI lại đến khi nó chỉ trả về đúng một nhãn rồi dùng ngay",
        "Bỏ đơn đó qua một bên vì nhãn lạ nghĩa là đơn viết không rõ ràng",
      ],
      correct: 0,
      explanation:
        "Hai nhãn cùng lúc nghĩa là AI không phân biệt nổi, đúng lúc cần người xem. Chọn nhãn đầu là đoán, hỏi lại liên tục là ép AI chọn đại, còn bỏ đơn qua một bên làm một nhân viên không được duyệt phép mà không ai biết.",
    },
    summary: {
      keyIdea: "Kết quả hỏng là chuyện chắc chắn sẽ xảy ra, nên đường đi cho nó phải được vẽ trước.",
      formula: "Kiểm kết quả AI + luật: rỗng hoặc lạ thì sang người xem + người nhận có hạn = lỗi trở thành việc thường.",
      commonMistake: "Để nhãn mặc định 'Khác' làm bãi chứa, rồi tin rằng quy trình đang chạy tốt.",
      action: "Viết một câu: nếu kết quả của AI ở bước này rỗng hoặc lạ thì ai nhận và trong bao lâu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bước trong công việc của bạn mà AI có thể trả lời rỗng hoặc lạ (gắn nhãn, tóm tắt, trích số). Viết ba ví dụ hỏng thật, rồi viết bên cạnh mỗi ví dụ: ai nhận và nhận kèm gì. Hôm sau bạn sẽ được hỏi bạn đã ghi ba ví dụ ấy chưa.",
      secondary: "Gửi bản nháp cho một đồng nghiệp đọc thử và hỏi họ có hiểu phải làm gì không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, quy trình gắn nhãn yêu cầu trả về một ô trống và một nhãn chưa ai đặt. Nếu chưa ai quy định điều gì xảy ra, yêu cầu của khách sẽ nằm im. Bài này dạy bạn viết trước bước dự phòng để lỗi trở thành việc thường ngày.",
      },
      {
        type: "feynman",
        title: "Bước dự phòng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cổng soát vé ở rạp chiếu phim. Vé đọc được thì cổng mở, vé rách hoặc lạ thì cổng không đoán, nó bật đèn và nhân viên ở lối bên cạnh ra xem. Bước dự phòng của quy trình chính là lối bên cạnh đó.",
        columns: ["Thành phần", "Cổng soát vé", "Quy trình có AI"],
        rows: [
          ["Đầu vào", "Vé của khán giả", "Yêu cầu của khách"],
          ["Máy đọc", "Máy quét mã", "AI gắn nhãn"],
          ["Khi đọc được", "Cổng mở", "Quy trình đi tiếp"],
          ["Khi không đọc được", "Nhân viên ở lối bên cạnh", "Hàng người xem, có tên người nhận"],
        ],
        oneLiner: "Khi máy không chắc, đừng để máy đoán: mở lối bên cạnh cho người.",
      },
      { type: "heading", text: "Hai kiểu hỏng: trống và lạ" },
      {
        type: "paragraph",
        text: "Kết quả trống là AI không trả gì, ví dụ vì yêu cầu quá ngắn hoặc kết nối trục trặc. Kết quả lạ là AI trả về một thứ nằm ngoài khung bạn đặt, như một nhãn chưa từng có. Hai kiểu này khác nguồn nhưng cách chữa giống nhau: nhận ra, và chuyển cho người.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát các kết quả AI vừa trả về",
        task: "Quy trình chỉ cho phép ba nhãn: 'hoàn tiền', 'giao chậm', 'hỏi thông tin'. Dưới đây là kết quả AI trả về cho một lô yêu cầu. Đánh dấu những dòng quy trình KHÔNG được tự đi tiếp.",
        segments: [
          { text: "Yêu cầu 1: 'Đơn tuần trước chưa tới' - nhãn: giao chậm." },
          {
            text: "Yêu cầu 2: 'Cho tôi lấy lại tiền đơn 318' - nhãn: (để trống).",
            error: "Kết quả rỗng: AI không trả gì. Quy trình phải chuyển sang hàng người xem thay vì tự điền nhãn.",
          },
          { text: "Yêu cầu 3: 'Gói này có dùng được cho máy cũ không' - nhãn: hỏi thông tin." },
          {
            text: "Yêu cầu 4: 'Tôi muốn nói chuyện với quản lý' - nhãn: khiếu nại nghiêm trọng.",
            error: "Nhãn lạ: không nằm trong ba nhãn cho phép. Quy trình không được tự rẽ theo nhãn đó mà phải chuyển cho người.",
          },
          {
            text: "Yêu cầu 5: 'Hàng tới trễ, tôi muốn trả lại' - nhãn: giao chậm, hoàn tiền.",
            error: "AI gộp hai nhãn. Hai nhãn cùng lúc nghĩa là nó không phân biệt được, nên cần người xem.",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ kết quả AI tới bước dự phòng",
        steps: [
          { label: "AI trả về một kết quả", detail: "Một nhãn, một bản tóm tắt hoặc một con số, tuỳ bước bạn giao." },
          { label: "Kiểm có trống không", detail: "Ô trống hoặc chỉ có dấu câu là kết quả rỗng. Đây là kiểm đơn giản nhất và bắt được nhiều lỗi nhất." },
          { label: "Kiểm có nằm trong khung không", detail: "So kết quả với danh sách cho phép. Nhãn ngoài danh sách, hoặc hai nhãn cùng lúc, là kết quả lạ." },
          { label: "Sang hàng người xem kèm lý do", detail: "Gửi nội dung gốc, kết quả của AI và dòng 'vì sao bị chuyển'. Người xem không phải đoán từ đầu." },
          { label: "Người xem quyết định và ghi lại", detail: "Họ gắn nhãn đúng và ghi kiểu lỗi để bạn biết bước nào hay hỏng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Có bước dự phòng",
          text: "Kết quả rỗng hoặc lạ có người nhận tên cụ thể. Quy trình không phải đoán. Bạn đếm được lỗi mỗi tuần.",
        },
        right: {
          label: "Không có bước dự phòng",
          text: "Yêu cầu hoặc dừng im lặng, hoặc đi tiếp với nhãn đoán. Không ai biết có bao nhiêu ca hỏng cho tới khi khách gọi lại.",
        },
      },
      {
        type: "callout",
        label: "Đừng chọn 'chạy lại cho tới khi có kết quả'",
        text: "Chạy lại một lần vì mạng chậm thì hợp lý, sẽ nói ở bài sau. Nhưng chạy lại liên tục tới khi AI trả ra gì đó chỉ ép nó nói, kể cả khi nó không biết. Kết quả lạ nên sang người xem.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai, một yêu cầu nhãn lạ",
        start: "s1",
        nodes: {
          s1: {
            text: "Quy trình gắn nhãn chạy xong 20 yêu cầu. Yêu cầu số 7 nhận nhãn 'khiếu nại nghiêm trọng', không có trong danh sách. Quy trình chưa có bước dự phòng.",
            choices: [
              { label: "Để quy trình chuyển yêu cầu theo nhãn lạ vì AI chắc đã hiểu đúng", next: "bad_trust" },
              { label: "Dừng yêu cầu số 7 lại và chuyển vào hàng người xem kèm nội dung gốc", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Nhãn lạ không khớp với nhánh nào nên yêu cầu rơi vào khoảng trống. Ba ngày sau khách gọi hỏi vì sao không ai trả lời.",
            ending: "bad",
          },
          s2: {
            text: "Người xem đọc và thấy khách đang bực vì một đơn giao sai. Bạn cần ghi lại ca này.",
            choices: [
              { label: "Gắn nhãn đúng, xử lý, rồi ghi 'nhãn lạ' vào danh sách lỗi của tuần", next: "good" },
              { label: "Xử lý xong là xong, không ghi gì vì chỉ có một ca", next: "bad_log" },
            ],
          },
          bad_log: {
            text: "Hai tuần sau lại có nhãn lạ tương tự nhưng không ai nhớ lần trước đã xử lý thế nào, và không ai thấy rằng bước này đang hay hỏng.",
            ending: "bad",
          },
          good: {
            text: "Cuối tuần bạn thấy nhãn lạ xuất hiện 4 lần, đều về khách bực tức. Bạn thêm nhãn 'khách bực' vào danh sách có kiểm soát.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê các kết quả hợp lệ của bước AI trong quy trình của bạn.",
          "Bước 2 - Viết luật: rỗng, lạ hoặc hai nhãn cùng lúc thì chuyển cho người.",
          "Bước 3 - Đặt tên người nhận và hạn xử lý cho hàng người xem.",
          "Bước 4 - Thử với ba ví dụ hỏng rồi ghi kết quả.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kết quả hỏng chắc chắn sẽ tới, nên lối bên cạnh phải có sẵn.",
          "Bài sau: khi quy trình dừng giữa chừng, làm sao biết và ai nhận thông báo.",
        ],
      },
    ],
  },
  {
    id: 2511,
    slug: "quy-trinh-dung-giua-chung-ai-biet",
    title: "Chặng 55, Bài 12: Quy trình dừng giữa chừng: làm sao biết và ai nhận thông báo",
    subtitle: "Chuông báo cháy chỉ có ích khi nó kêu ở chỗ có người nghe.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔔",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một yêu cầu của khách nằm im ba ngày vì quy trình dừng ở bước giữa, và thông báo lỗi chỉ gửi tới hộp thư của người đã nghỉ việc. Khách chờ, đồng nghiệp tưởng người khác lo. Quy trình dừng thì không tránh hết được; điều bạn chọn được là dừng xong có ai biết ngay hay không.",
    openingQuestion:
      "Quy trình xử lý yêu cầu của bạn dừng ở bước giữa lúc nửa đêm. Điều nào quyết định yêu cầu đó nằm im bao lâu?",
    openingOptions: [
      "Có thông báo lỗi gửi tới đúng người chịu trách nhiệm, đúng lúc hay không",
      "Công cụ AI có đủ thông minh để tự sửa lỗi và chạy tiếp hay không",
      "Yêu cầu đó quan trọng tới đâu trong mắt người gửi nó cho công ty",
      "Quy trình đã chạy ổn bao nhiêu tuần trước đó trước khi nó bị dừng",
    ],
    correctOption: 0,
    explanation:
      "Thời gian nằm im gần như bằng thời gian từ lúc dừng tới lúc có người biết. Thông báo đúng người, đúng lúc rút khoảng đó xuống còn vài giờ. AI không tự sửa được những lỗi ngoài khung của nó, độ quan trọng của yêu cầu không làm ai biết sớm hơn, và quy trình từng chạy ổn nhiều tuần không ngăn được lỗi lần sau: thường lỗi xảy ra đúng lúc người ta yên tâm nhất.",
    diagram: [
      { label: "Quy trình dừng ở một bước giữa", arrow: true },
      { label: "Thông báo gửi tới người phụ trách, có tên yêu cầu và bước bị kẹt", arrow: true },
      { label: "Người nhận xử lý hoặc chuyển cho người dự phòng khi quá hạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một văn phòng dùng quy trình tự động để chuyển yêu cầu mua hàng cho trưởng phòng duyệt. Khi bước gửi dừng, thông báo chỉ hiện trong một bảng theo dõi mà không ai mở. Một yêu cầu nằm ba ngày. Sau đó họ đổi sang thông báo gửi thẳng cho người phụ trách kèm tên yêu cầu, và nhắc người thay thế nếu sau hai giờ chưa ai bấm nhận.",
    },
    quiz: [
      mk(
        "Thông báo lỗi nên gửi cho ai để yêu cầu không nằm im?",
        "Một người có tên và một người thay thế",
        [
          "Cả nhóm 30 người qua một kênh chung để chắc chắn có người thấy ngay khi lỗi xảy ra",
          "Người xây dựng quy trình, vì chỉ họ mới biết vì sao nó dừng và sửa được",
          "Khách hàng có yêu cầu bị kẹt, để họ biết mà chủ động liên lạc lại với công ty",
        ],
        "Một người có tên thì có trách nhiệm, một người thay thế thì có đường lùi. Kênh chung cho 30 người dễ thành 'ai đó sẽ lo', người xây quy trình có thể đang nghỉ, và báo cho khách trước khi có câu trả lời là cách làm khách lo hơn.",
      ),
      mk(
        "Một thông báo lỗi tốt cho người nhận biết được điều gì ngay khi đọc?",
        "Yêu cầu nào bị kẹt, kẹt ở bước nào, từ lúc nào và nên làm gì tiếp",
        [
          "Chỉ dòng 'Quy trình đã dừng vì có lỗi', để người nhận tự kiểm tra",
          "Toàn bộ bản ghi kỹ thuật của lần chạy, để tự tìm nguyên nhân",
          "Một biểu tượng cảnh báo màu đỏ vì màu sắc dễ gây chú ý hơn chữ",
        ],
        "Người nhận cần đủ thông tin để hành động mà không phải mở thêm gì: cái gì, ở đâu, từ bao giờ, làm gì. Dòng chung chung buộc họ đi tìm, bản ghi kỹ thuật dài làm họ chìm, còn biểu tượng không nói được yêu cầu nào đang kẹt.",
      ),
      mk(
        "Mỗi ngày có 2 yêu cầu bị kẹt và không ai thấy. Sau 3 ngày có bao nhiêu yêu cầu đang nằm im?",
        "6 yêu cầu (= 2 yêu cầu mỗi ngày × 3 ngày)",
        [
          "2 yêu cầu (= số bị kẹt trong riêng một ngày, bỏ qua những yêu cầu của hai ngày trước)",
          "5 yêu cầu (= 2 + 3, cộng số yêu cầu mỗi ngày với số ngày thay vì nhân chúng)",
          "9 yêu cầu (= 3 ngày × 3 bước, nhầm số bước trong quy trình thành số yêu cầu)",
        ],
        "Yêu cầu kẹt cộng dồn theo ngày nếu không ai xử lý: 2 × 3 = 6. Chỉ tính một ngày bỏ quên phần tích luỹ, cộng thay vì nhân cho 5, và số bước trong quy trình không liên quan tới số yêu cầu. Số liệu này chỉ để minh hoạ phép tính.",
      ),
      mk(
        "Sau hai giờ người nhận chưa bấm 'đã nhận'. Quy trình nên làm gì?",
        "Nhắc lại và báo cho người thay thế đã ghi sẵn",
        [
          "Đánh dấu yêu cầu là đã xử lý xong để bảng theo dõi trông gọn gàng hơn cho mọi người",
          "Chỉ chờ thêm và hy vọng họ sẽ xử lý",
          "Tự chạy lại toàn bộ quy trình từ đầu, hy vọng lần này nó đi qua được bước đang bị kẹt",
        ],
        "Thông báo mà không có hạn chỉ là lời nhắn. Nhắc và báo người thay thế giữ yêu cầu còn có người lo. Đánh dấu 'xong' là che lỗi, chờ thêm là quay lại tình trạng nằm im, còn chạy lại toàn bộ có thể tạo yêu cầu trùng.",
      ),
      mk(
        "Cách nào tốt nhất để biết thông báo lỗi có thật sự tới được người nhận?",
        "Chủ động gây một lỗi thử và xem ai nhận, sau bao lâu",
        [
          "Kiểm tra địa chỉ nhận trong phần cài đặt một lần rồi tin là nó sẽ luôn chạy đúng",
          "Hỏi nhóm xem có ai từng nhận thông báo nào không, rồi cho rằng không hỏi lại là ổn",
          "Chờ tới lần có lỗi thật mới biết",
        ],
        "Gây lỗi thử cho bạn bằng chứng thật về người nhận và độ trễ. Xem cài đặt không chứng minh thư tới nơi, câu hỏi chung chung cho câu trả lời mơ hồ, còn chờ lỗi thật nghĩa là dùng một yêu cầu của khách làm phép thử.",
      ),
    ],
    keyTakeaways: [
      "Thời gian yêu cầu nằm im gần bằng thời gian từ lúc dừng tới lúc có người biết.",
      "Thông báo có tên người nhận và người thay thế, không gửi vào kênh chung.",
      "Nội dung thông báo: yêu cầu nào, bước nào, từ lúc nào, nên làm gì.",
      "Thông báo có hạn: hết giờ chưa ai nhận thì báo người thay thế.",
      "Thử bằng lỗi giả để biết thông báo có tới nơi không.",
    ],
    practicePrompt: {
      question:
        "Quy trình gửi báo giá tự động dừng. Thông báo lỗi gửi vào một nhóm chat 40 người. Điều gì đáng lo nhất?",
      options: [
        "Mỗi người đều nghĩ người khác sẽ lo nên không ai nhận",
        "Nhóm 40 người làm thông báo hiển thị chậm hơn vài giây",
        "Thông báo trong nhóm chat không thể chứa tên yêu cầu",
        "Người đọc nhóm chat sẽ bị nhiễu do có quá nhiều chữ",
      ],
      correct: 0,
      explanation:
        "Khi trách nhiệm thuộc về cả nhóm thì thường không thuộc về ai. Độ trễ vài giây không quan trọng bằng chuyện không ai nhận việc. Nhóm chat hoàn toàn có thể chứa tên yêu cầu, và nhiễu chỉ là hệ quả phụ của một nguyên nhân chính là thiếu người chịu trách nhiệm.",
    },
    summary: {
      keyIdea: "Quy trình dừng là chuyện thường; yêu cầu nằm im là chuyện có thể tránh.",
      formula: "Thông báo có tên người nhận + nội dung đủ hành động + hạn và người thay thế = yêu cầu không nằm im.",
      commonMistake: "Gửi thông báo vào kênh chung hoặc vào hộp thư của một người rồi yên tâm là 'có báo rồi'.",
      action: "Viết tên người nhận thông báo lỗi và người thay thế cho một quy trình của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quy trình có nhiều bước trong công việc của bạn. Viết thông báo lỗi mẫu gồm: yêu cầu nào, bước nào, từ lúc nào, làm gì tiếp, rồi ghi tên người nhận và người thay thế. Hôm sau bạn sẽ được hỏi bạn đã chọn ai làm người thay thế chưa.",
      secondary: "Đưa thông báo mẫu cho người nhận và hỏi họ có đủ thông tin để hành động ngay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Một yêu cầu nằm im ba ngày không phải vì ai lười, mà vì không ai biết nó đã dừng. Bài này dạy bạn thiết kế thông báo lỗi tới đúng người, đúng lúc.",
      },
      {
        type: "feynman",
        title: "Thông báo lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chuông báo cháy của tòa nhà. Chuông chỉ có ích nếu nó kêu ở nơi có người nghe, người nghe biết phải chạy ra đâu, và có người kiểm tra khi chuông kêu mà chưa ai ra. Thông báo lỗi của quy trình cũng cần đúng ba thứ đó.",
        columns: ["Thành phần", "Chuông báo cháy", "Thông báo lỗi của quy trình"],
        rows: [
          ["Kêu ở đâu", "Hành lang có người", "Kênh người phụ trách thật sự đọc"],
          ["Nói gì", "Tầng nào đang có khói", "Yêu cầu nào đang kẹt ở bước nào"],
          ["Ai phản ứng", "Bảo vệ tầng đó", "Người có tên và người thay thế"],
          ["Nếu không ai ra", "Bảo vệ tòa nhà đi kiểm tra", "Nhắc lại và báo người thay thế"],
        ],
        oneLiner: "Thông báo tốt là thông báo có người nghe, biết làm gì, và có người lo khi không ai nghe.",
      },
      { type: "heading", text: "Vì sao yêu cầu nằm im" },
      {
        type: "paragraph",
        text: "Quy trình dừng thường không kêu gì cả. Nó chỉ không chạy tiếp. Nếu nơi báo lỗi là một bảng không ai mở, hay hộp thư của người đã đổi việc, yêu cầu sẽ nằm im cho tới khi khách gọi. Ta không thể tránh hết lỗi, nhưng có thể rút khoảng thời gian từ lúc dừng tới lúc có người biết.",
      },
      {
        type: "chart",
        title: "Yêu cầu bị kẹt tích luỹ theo số ngày chờ",
        caption: "Số liệu minh hoạ, không phải số đo thật. Kéo thanh trượt để so hai cách: không có thông báo và có thông báo tới người nhận.",
        kind: "line",
        xLabel: "Số ngày kể từ lúc quy trình bắt đầu dừng",
        yLabel: "Số yêu cầu đang nằm im",
        x: { from: 0, to: 7, step: 1 },
        params: [
          { id: "a", label: "Yêu cầu bị kẹt mỗi ngày", min: 1, max: 5, step: 1, value: 2, unit: "yêu cầu" },
          { id: "d", label: "Số ngày tới khi có người xử lý", min: 1, max: 4, step: 1, value: 1, unit: "ngày" },
        ],
        series: [
          { label: "Không có thông báo", expr: "a*x" },
          { label: "Có thông báo tới đúng người", expr: "min(a*x, a*d)" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Thiết kế thông báo lỗi",
        task: "Quy trình chuyển yêu cầu cho trưởng phòng duyệt vừa dừng. Lắp thông báo lỗi để yêu cầu không nằm im.",
        parts: [
          {
            id: "to",
            label: "Gửi cho ai",
            options: [
              { text: "Gửi vào nhóm chung cả phòng để ai rảnh thì xử lý.", feedback: "Không ai có trách nhiệm cụ thể: mỗi người nghĩ người khác sẽ lo." },
              { text: "Gửi cho chị Mai (người phụ trách) và anh Nam (người thay thế).", good: true, feedback: "Có tên người chịu trách nhiệm và đường lùi nếu chị Mai vắng." },
            ],
          },
          {
            id: "what",
            label: "Nội dung",
            options: [
              { text: "Quy trình đã dừng, vui lòng kiểm tra.", feedback: "Người nhận không biết yêu cầu nào, bước nào, nên phải đi tìm từ đầu." },
              { text: "Yêu cầu mua hàng số 214 kẹt ở bước gửi duyệt từ 9 giờ sáng; việc cần làm: gửi tay cho trưởng phòng.", good: true, feedback: "Đủ yêu cầu, bước, thời điểm và việc cần làm - người nhận hành động ngay." },
            ],
          },
          {
            id: "deadline",
            label: "Hạn phản hồi",
            options: [
              { text: "Không đặt hạn, người nhận xử lý khi có thể.", feedback: "Không hạn thì thông báo chỉ là lời nhắn; yêu cầu vẫn có thể nằm im nhiều ngày." },
              { text: "Sau 2 giờ chưa bấm nhận thì nhắc lại và báo người thay thế.", good: true, feedback: "Có hạn và có đường leo thang, nên yêu cầu không phụ thuộc vào một người." },
            ],
          },
        ],
        responses: [
          {
            requires: ["to", "what", "deadline"],
            text: "Gửi: chị Mai, cc anh Nam.\nYêu cầu mua hàng số 214 kẹt ở bước gửi duyệt từ 9:00. Việc cần làm: gửi tay cho trưởng phòng. Nếu sau 11:00 chưa bấm nhận, hệ thống nhắc lại và báo anh Nam.",
          },
          {
            requires: ["to"],
            text: "Gửi: chị Mai, cc anh Nam.\nQuy trình đã dừng, vui lòng kiểm tra.\n\n(Đúng người nhưng không biết yêu cầu nào, bước nào, và không có hạn.)",
          },
          {
            text: "Gửi: nhóm chung cả phòng.\nQuy trình đã dừng, vui lòng kiểm tra.\n\n(Ai cũng thấy, không ai nhận; yêu cầu nằm im tới khi khách gọi.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thử bằng lỗi giả",
        text: "Đừng chờ lỗi thật. Tạo một yêu cầu thử cố tình làm quy trình dừng, rồi xem ai nhận thông báo và sau bao lâu. Đây là cách duy nhất để biết thông báo có tới nơi hay chỉ nằm trên giấy.",
      },
      {
        type: "scenario",
        title: "Yêu cầu nằm im ba ngày",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu, một khách hỏi vì sao yêu cầu đổi hàng gửi từ thứ Ba chưa có trả lời. Bạn mở quy trình và thấy nó dừng ở bước gửi duyệt từ hôm thứ Ba.",
            choices: [
              { label: "Bấm chạy lại và xin lỗi khách, coi như xong", next: "bad_rerun" },
              { label: "Xử lý yêu cầu cho khách trước, rồi tìm xem thông báo lỗi đã đi đâu", next: "s2" },
            ],
          },
          bad_rerun: {
            text: "Quy trình chạy tiếp, nhưng không ai biết vì sao nó dừng. Tuần sau một yêu cầu khác lại kẹt đúng chỗ đó.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy thông báo lỗi đã gửi vào hộp thư của anh Tín, người đã chuyển phòng hai tháng trước.",
            choices: [
              { label: "Đổi người nhận thành người phụ trách hiện tại kèm người thay thế", next: "s3" },
              { label: "Nhắn anh Tín nhớ xem hộp thư cũ của mình", next: "bad_old" },
            ],
          },
          bad_old: {
            text: "Anh Tín không còn phụ trách nên không để ý. Thông báo tuần sau lại rơi vào hộp thư của anh.",
            ending: "bad",
          },
          s3: {
            text: "Bạn đặt thêm hạn: hai giờ không ai nhận thì báo người thay thế. Còn việc kiểm tra lại.",
            choices: [
              { label: "Tạo một lỗi thử và xem thông báo tới ai, sau bao lâu", next: "good" },
              { label: "Tin là đã đúng và không thử nữa", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Tên người thay thế bị gõ sai một chữ nên thông báo không tới được họ. Lần tới quy trình dừng, yêu cầu lại nằm im.",
            ending: "bad",
          },
          good: {
            text: "Thông báo thử tới chị Mai sau 2 phút, và tới người thay thế đúng hạn. Bạn ghi cách thử vào tài liệu quy trình.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi tên một người nhận và một người thay thế cho quy trình.",
          "Bước 2 - Viết thông báo mẫu có yêu cầu, bước, thời điểm, việc cần làm.",
          "Bước 3 - Đặt hạn và người được báo khi hết hạn.",
          "Bước 4 - Gây một lỗi thử để xem thông báo có tới nơi không.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Quy trình dừng là chuyện thường, yêu cầu nằm im là chuyện tránh được.",
          "Bài sau: thử lại tự động hay chuyển cho người, chọn theo loại lỗi.",
        ],
      },
    ],
  },
  {
    id: 2512,
    slug: "thu-lai-mot-lan-hay-tu-tay-lam",
    title: "Chặng 55, Bài 13: Thử lại tự động hay chuyển cho người: chọn theo loại lỗi",
    subtitle: "Cửa kẹt vì gió thì đẩy lại; cửa khoá thì đẩy một trăm lần cũng vậy.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quy trình báo lỗi 'không gửi được' và bạn có hai phản xạ: bấm chạy lại, hoặc gọi người tới xem. Cả hai đều đúng ở một số lỗi và phí công ở những lỗi khác. Mạng chậm thì thử lại là xong; thiếu số hoá đơn thì thử một nghìn lần vẫn thiếu, thậm chí còn tạo ra yêu cầu trùng. Phân loại lỗi trước giúp chọn đúng cách.",
    openingQuestion:
      "Quy trình báo: 'Không gửi được báo giá cho khách.' Bạn chưa biết nguyên nhân. Bước đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Đọc thông báo để phân loại: lỗi tạm thời hay lỗi thiếu nội dung",
      "Bấm chạy lại liên tục cho tới khi nó gửi được thì thôi",
      "Gọi ngay người phụ trách, vì lỗi nào cũng cần người xử lý mới xong hẳn",
      "Xoá yêu cầu và nhập lại từ đầu cho chắc chắn không còn lỗi",
    ],
    correctOption: 0,
    explanation:
      "Lỗi tạm thời (mạng chậm, dịch vụ bận) thường tự hết nếu thử lại sau ít phút, còn lỗi nội dung (thiếu thông tin, sai định dạng) cần người bổ sung. Biết loại nào mới chọn được cách xử lý. Chạy lại liên tục với lỗi nội dung chỉ tạo thêm bản trùng, gọi người cho mọi lỗi làm họ quá tải, và xoá rồi nhập lại làm mất dấu vết để tìm nguyên nhân.",
    diagram: [
      { label: "Đọc thông báo lỗi và phân loại", arrow: true },
      { label: "Lỗi tạm thời: thử lại tự động một hai lần, cách nhau vài phút", arrow: true },
      { label: "Lỗi nội dung hoặc thử lại vẫn hỏng: chuyển cho người kèm lý do" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm vận hành có quy trình tự gửi phiếu xác nhận đơn cho khách. Họ quy định lỗi 'hết thời gian chờ' được thử lại hai lần cách nhau năm phút, còn lỗi 'thiếu địa chỉ email' chuyển thẳng cho người nhập liệu. Sau khi tách hai loại, số phiếu bị gửi trùng giảm hẳn, vì quy trình không còn gửi lại những phiếu vốn thiếu email.",
    },
    quiz: [
      mk(
        "Lỗi 'hết thời gian chờ' vì mạng chậm nên xử lý thế nào?",
        "Thử lại một hai lần cách nhau vài phút rồi mới chuyển người",
        [
          "Chuyển cho người ngay lần lỗi đầu vì mọi lỗi cần người xem",
          "Thử lại mỗi giây cho tới khi thành công để khách khỏi đợi",
          "Bỏ qua yêu cầu vì mạng chậm nghĩa là khách không quan trọng",
        ],
        "Lỗi tạm thời thường hết sau một lúc, nên thử lại có giới hạn là hợp lý. Chuyển người ngay làm họ quá tải, thử mỗi giây có thể làm dịch vụ bận thêm và tạo bản trùng, còn bỏ qua là làm mất yêu cầu của một khách thật.",
      ),
      mk(
        "Lỗi 'thiếu số hoá đơn trong yêu cầu' nên xử lý thế nào?",
        "Chuyển cho người bổ sung",
        [
          "Thử lại tự động ba lần, vì lần sau có thể hệ thống sẽ tự điền được số còn thiếu",
          "Để AI tự nghĩ ra một số hoá đơn hợp lý cho yêu cầu rồi cho quy trình chạy tiếp",
          "Đợi tới ngày mai rồi chạy lại toàn bộ, vì hệ thống đôi khi cập nhật dữ liệu qua đêm",
        ],
        "Thiếu thông tin là lỗi nội dung: thử lại bao nhiêu lần cũng thiếu. Nhờ AI nghĩ ra số là bịa dữ liệu, còn đợi qua đêm không làm số xuất hiện trừ khi có người nhập.",
      ),
      mk(
        "Vì sao phải giới hạn số lần thử lại?",
        "Vì thử lại vô hạn có thể tạo yêu cầu trùng và che lỗi thật",
        [
          "Vì mỗi lần thử lại làm công cụ AI tính thêm một khoản phí",
          "Vì sau ba lần thử công cụ tự khoá tài khoản cả ngày",
          "Vì lần thử đầu luôn đúng, các lần sau chỉ lặp lại nó",
        ],
        "Thử lại không giới hạn có thể gửi cùng một thứ nhiều lần và khiến lỗi thật bị chìm trong vô số lần thử. Chuyện phí tuỳ công cụ và bạn không nên đoán, tài khoản không tự khoá theo quy tắc chung nào, và lần thử đầu không 'luôn đúng'.",
      ),
      mk(
        "Một quy trình thử lại hai lần rồi vẫn hỏng. Bước tiếp theo hợp lý là gì?",
        "Chuyển cho người kèm ghi chú đã thử lại hai lần",
        [
          "Thử lại thêm mười lần nữa, vì biết đâu lần thứ ba mươi dịch vụ sẽ hồi phục hoàn toàn",
          "Đổi sang một công cụ khác chạy cùng bước đó và không nói với ai về việc vừa đổi",
          "Đánh dấu yêu cầu là 'đã gửi'",
        ],
        "Hai lần hỏng cho thấy không còn là lỗi thoáng qua, nên người cần vào. Ghi chú 'đã thử hai lần' giúp họ không lặp lại. Thử thêm nhiều lần chỉ kéo dài thời gian, đổi công cụ âm thầm tạo thêm bất định, còn đánh dấu 'đã gửi' là khai sai trạng thái.",
      ),
      mk(
        "Bước AI trả về kết quả khác nhau mỗi lần chạy lại cùng một yêu cầu. Điều này nói gì?",
        "AI có thể cho ra kết quả khác nhau nên chỉ thử lại khi lỗi là do kỹ thuật",
        [
          "Quy trình hỏng hoàn toàn và phải dừng lại cho tới khi có người sửa",
          "Kết quả lần sau luôn chính xác hơn, nên thử lại cải thiện chất lượng",
          "Hai kết quả khác nhau bù trừ nhau, nên có thể lấy trung bình",
        ],
        "AI có thể trả về kết quả khác nhau cho cùng đầu vào, nên 'chạy lại cho tới khi vừa ý' không phải kiểm soát chất lượng; chỉ nên thử lại khi lỗi là kỹ thuật, không phải khi kết quả chưa ưng. Quy trình không hỏng chỉ vì kết quả khác, lần sau không tự tốt hơn, và không thể lấy trung bình của hai câu trả lời.",
      ),
    ],
    keyTakeaways: [
      "Phân loại lỗi trước: tạm thời (mạng, bận) hay nội dung (thiếu, sai).",
      "Lỗi tạm thời: thử lại có giới hạn, cách nhau vài phút.",
      "Lỗi nội dung: chuyển cho người, vì thử lại không làm thông tin xuất hiện.",
      "Thử lại xong vẫn hỏng thì chuyển người kèm ghi chú đã thử mấy lần.",
      "Đừng dùng 'chạy lại' để tìm kết quả ưng ý của AI.",
    ],
    practicePrompt: {
      question:
        "Phiếu xác nhận đơn không gửi được với lỗi 'địa chỉ email không hợp lệ'. Nên làm gì?",
      options: [
        "Chuyển cho người nhập liệu sửa email rồi mới gửi lại",
        "Thử lại ba lần vì có thể dịch vụ gửi thư đang bận hoặc mạng chậm",
        "Nhờ AI đoán địa chỉ email đúng từ tên khách hàng",
        "Gửi sang email của chính người quản lý cho chắc",
      ],
      correct: 0,
      explanation:
        "Email không hợp lệ là lỗi nội dung: chỉ người có dữ liệu thật mới sửa được. Thử lại không làm email đúng, đoán địa chỉ từ tên có thể gửi nhầm cho người lạ, và gửi sang email người khác làm lộ thông tin khách.",
    },
    summary: {
      keyIdea: "Mỗi loại lỗi có cách xử lý riêng: lỗi thoáng qua thì thử lại, lỗi nội dung thì tới người.",
      formula: "Đọc lỗi + phân loại + thử lại có giới hạn hoặc chuyển người = không vừa phí công vừa gửi trùng.",
      commonMistake: "Bấm chạy lại cho mọi lỗi, rồi ngạc nhiên khi khách nhận cùng một thư năm lần.",
      action: "Liệt kê ba lỗi bạn hay gặp và ghi bên cạnh mỗi lỗi: thử lại hay chuyển người.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại ba lần một công việc tự động hoặc một công cụ báo lỗi với bạn tuần này. Xếp mỗi lỗi vào 'tạm thời' hoặc 'nội dung', và ghi cách bạn sẽ xử lý lần sau. Hôm sau bạn sẽ được hỏi bạn đã xếp đủ ba lỗi chưa.",
      secondary: "Ghi thêm số lần thử lại tối đa bạn thấy hợp lý cho lỗi tạm thời.",
    },
    sections: [
      {
        type: "lead",
        text: "Một quy trình báo lỗi và bạn có hai phản xạ: bấm chạy lại hoặc gọi người. Mỗi phản xạ hợp lý với một loại lỗi và phí công với loại kia. Bài này dạy bạn phân loại trước khi chọn.",
      },
      {
        type: "feynman",
        title: "Thử lại hay chuyển người đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một cánh cửa không mở. Nếu nó kẹt vì gió thì đẩy lại một hai lần là được. Nếu nó bị khoá thì đẩy một trăm lần vẫn vậy, bạn phải tìm người có chìa. Lỗi tạm thời giống cửa kẹt, lỗi nội dung giống cửa khoá.",
        columns: ["Thành phần", "Cánh cửa", "Quy trình có AI"],
        rows: [
          ["Kẹt tạm thời", "Gió làm cửa kẹt", "Mạng chậm, dịch vụ đang bận"],
          ["Cách xử lý", "Đẩy lại một hai lần", "Thử lại có giới hạn, cách vài phút"],
          ["Khoá hẳn", "Cửa bị khoá", "Thiếu thông tin, sai định dạng"],
          ["Cách xử lý", "Tìm người giữ chìa", "Chuyển cho người có dữ liệu"],
        ],
        oneLiner: "Đẩy lại khi cửa kẹt, tìm người khi cửa khoá - và phải nhìn xem cửa kiểu nào trước.",
      },
      { type: "heading", text: "Hai loại lỗi, hai cách xử lý" },
      {
        type: "paragraph",
        text: "Lỗi tạm thời đến từ bên ngoài nội dung của bạn: đường truyền chậm, dịch vụ quá tải. Nội dung vẫn đúng, chờ một lúc là xong. Lỗi nội dung đến từ chính dữ liệu: thiếu số hoá đơn, email sai, tệp quá lớn. Chờ bao lâu cũng không đổi. Thông báo lỗi thường cho bạn biết đang ở loại nào.",
      },
      {
        type: "flow",
        title: "Quyết định thử lại hay chuyển người",
        steps: [
          { label: "Đọc thông báo lỗi", detail: "Tìm từ gợi ý loại lỗi: 'hết thời gian', 'bận' thường là tạm thời; 'thiếu', 'không hợp lệ' thường là nội dung." },
          { label: "Phân loại", detail: "Hỏi: nếu tôi chờ năm phút mà không đổi gì, lỗi có hết không? Có thì tạm thời, không thì nội dung." },
          { label: "Lỗi tạm thời: thử lại có giới hạn", detail: "Thử một hai lần, cách nhau vài phút, không chạy liên tục." },
          { label: "Lỗi nội dung hoặc thử lại vẫn hỏng: chuyển người", detail: "Gửi kèm lỗi, yêu cầu gốc và ghi chú 'đã thử mấy lần'." },
          { label: "Ghi lại loại lỗi", detail: "Cuối tuần đếm xem loại nào nhiều hơn để biết nên sửa dữ liệu hay sửa đường truyền." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI phân loại thông báo lỗi",
        task: "Bạn dán một thông báo lỗi vào AI để nó gợi ý: thử lại hay chuyển người. Lắp prompt cho đúng.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Đây là lỗi, hãy cho biết làm gì.", feedback: "AI không biết quy trình của bạn có những bước nào nên trả lời chung chung." },
              { text: "Quy trình gửi phiếu xác nhận đơn cho khách. Có hai cách xử lý: thử lại tự động hoặc chuyển cho người nhập liệu.", good: true, feedback: "AI biết hai lựa chọn thật của bạn nên trả lời đúng khung đó." },
            ],
          },
          {
            id: "rule",
            label: "Luật phân loại",
            options: [
              { text: "Hãy chọn cách xử lý hợp lý nhất theo phán đoán của bạn.", feedback: "Phán đoán của AI có thể đổi mỗi lần, nên cùng loại lỗi có lúc thử lại, có lúc chuyển người." },
              { text: "Lỗi liên quan mạng hoặc hết thời gian chờ: thử lại. Lỗi liên quan thiếu hoặc sai dữ liệu: chuyển người.", good: true, feedback: "Luật cụ thể giúp câu trả lời nhất quán giữa các lần." },
            ],
          },
          {
            id: "unsure",
            label: "Khi không chắc",
            options: [
              { text: "Nếu không chắc, cứ chọn thử lại cho nhanh.", feedback: "Lỗi nội dung bị thử lại, tạo bản trùng và mất thời gian." },
              { text: "Nếu không chắc, trả lời 'chuyển người' và nói lý do; không tự đoán.", good: true, feedback: "Phía an toàn là chuyển người, đúng tinh thần của bước dự phòng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "rule", "unsure"],
            text: "Thông báo: 'Địa chỉ email không hợp lệ'.\nPhân loại: lỗi dữ liệu.\nXử lý: chuyển cho người nhập liệu; thử lại sẽ không làm email đúng.",
          },
          {
            requires: ["context"],
            text: "Thông báo: 'Địa chỉ email không hợp lệ'.\nCó thể thử lại vài lần xem sao, hoặc nhờ người xem.\n\n(Đúng khung nhưng chưa dứt khoát, lần sau có thể đổi ý.)",
          },
          {
            text: "Bạn có thể thử kiểm tra kết nối mạng, cập nhật phần mềm hoặc khởi động lại máy.\n\n(Trả lời chung chung vì không biết quy trình của bạn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lỗi tạm thời",
          text: "Mạng chậm, dịch vụ bận. Nội dung đúng. Thử lại một hai lần cách vài phút, thường xong. Quá số lần thì chuyển người.",
        },
        right: {
          label: "Lỗi nội dung",
          text: "Thiếu số, email sai, tệp sai dạng. Thử lại không đổi được gì và có thể gửi trùng. Chuyển người có dữ liệu.",
        },
      },
      {
        type: "scenario",
        title: "Hai lỗi trong một buổi sáng",
        start: "s1",
        nodes: {
          s1: {
            text: "Quy trình gửi 10 phiếu xác nhận. Phiếu 4 báo 'hết thời gian chờ', phiếu 8 báo 'thiếu email khách'.",
            choices: [
              { label: "Bấm chạy lại cả hai phiếu liên tục cho tới khi gửi được", next: "bad_both" },
              { label: "Thử lại phiếu 4 một lần sau vài phút, chuyển phiếu 8 cho người nhập liệu", next: "s2" },
            ],
          },
          bad_both: {
            text: "Phiếu 4 gửi trùng ba lần vì mỗi lần bấm đều đi qua. Phiếu 8 vẫn không có email. Khách nhận ba thư giống nhau và bạn nhận hai cuộc gọi.",
            ending: "bad",
          },
          s2: {
            text: "Phiếu 4 gửi được sau lần thử lại. Phiếu 8 được người nhập liệu bổ sung email. Còn một điều cần quyết.",
            choices: [
              { label: "Ghi lại hai loại lỗi và cách xử lý vào quy tắc của quy trình", next: "good" },
              { label: "Bỏ qua, vì hôm nay đã xong", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Tuần sau người mới vào nhóm gặp đúng hai lỗi ấy và lại bấm chạy lại liên tục.",
            ending: "bad",
          },
          good: {
            text: "Quy tắc được dán cạnh quy trình. Người mới đọc và xử lý đúng ngay lần đầu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đọc thông báo lỗi và hỏi: chờ năm phút thì lỗi có hết không.",
          "Bước 2 - Tạm thời: thử lại một hai lần cách vài phút.",
          "Bước 3 - Nội dung, hoặc thử lại vẫn hỏng: chuyển người kèm ghi chú.",
          "Bước 4 - Ghi loại lỗi vào nhật ký để cuối tuần đếm.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Phân loại lỗi trước, rồi mới chọn bấm lại hay gọi người.",
          "Bài sau: thứ không dán vào công cụ AI trong quy trình.",
        ],
      },
    ],
  },
  {
    id: 2513,
    slug: "du-lieu-nhay-cam-khong-dua-cho-ai",
    title: "Chặng 55, Bài 14: Thứ không dán vào công cụ AI trong quy trình",
    subtitle: "Gửi thư nhờ người ngoài xem giúp thì che số thẻ trước; dữ liệu đưa AI cũng vậy.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi quy trình chạy hằng ngày, bạn không còn nhìn từng dòng dữ liệu đi qua. Một cột số căn cước hay số tài khoản nằm sẵn trong bảng là đủ để nó đi theo vào công cụ AI mà không ai quyết định điều đó. Rà trước một lần, che hoặc bỏ cột không cần, rẻ hơn nhiều so với thu hồi dữ liệu đã gửi đi.",
    openingQuestion:
      "Bảng khách hàng của bạn có cột tên, số điện thoại, số căn cước và ghi chú. Bạn muốn AI phân loại ghi chú. Nên làm gì trước khi đưa vào?",
    openingOptions: [
      "Chỉ đưa cột ghi chú, cột định danh giữ lại hoặc thay bằng mã số",
      "Đưa cả bảng vào để AI hiểu đầy đủ ngữ cảnh của từng khách hàng đó",
      "Đưa cả bảng, nhưng dặn AI trong câu lệnh là 'không được lưu lại'",
      "Đưa cả bảng vì AI chỉ đọc ghi chú còn các cột khác thì tự bỏ qua",
    ],
    correctOption: 0,
    explanation:
      "Việc cần làm chỉ dùng cột ghi chú, nên những cột còn lại không có lý do để rời khỏi bảng. Thay tên bằng mã số vẫn cho phép bạn ghép kết quả về đúng khách sau đó. Đưa cả bảng vì 'ngữ cảnh' là mở dữ liệu không cần thiết, một câu dặn trong prompt không phải là cam kết về cách công cụ xử lý dữ liệu, và AI đọc mọi thứ bạn đưa chứ không tự bỏ qua cột nào. Quy định cụ thể của công ty bạn nằm ở bộ phận bảo mật.",
    diagram: [
      { label: "Liệt kê các cột dữ liệu trong bước dùng AI", arrow: true },
      { label: "Với mỗi cột hỏi: việc này có thật sự cần cột đó không", arrow: true },
      { label: "Che, thay bằng mã hoặc bỏ cột; hỏi bộ phận bảo mật về quy định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự muốn AI tóm tắt phản hồi trong phiếu khảo sát nhân viên. Bảng gốc có họ tên, mã nhân viên, lương và cột phản hồi. Cô chỉ đưa cột phản hồi, thêm cột số thứ tự để ghép lại. Khi có tình huống không chắc, cô hỏi bộ phận bảo mật của công ty xem loại dữ liệu nào được đưa vào công cụ nào trước khi làm.",
    },
    quiz: [
      mk(
        "Cột nào nên bỏ hoặc che đầu tiên trước khi đưa bảng khách vào AI để phân loại ghi chú?",
        "Những cột định danh như số căn cước và số tài khoản",
        [
          "Cột ghi chú, vì đó là cột dài nhất và có nhiều chữ nhất trong toàn bộ bảng khách",
          "Cột ngày tạo, vì AI không đọc được ngày tháng và sẽ trả về những kết quả sai",
          "Không cột nào, AI tự bỏ phần thừa",
        ],
        "Cột cần cho việc (ghi chú) thì giữ, còn số căn cước và số tài khoản không phục vụ việc phân loại nên bỏ. AI đọc được ngày tháng bình thường, và không có cơ chế tự bỏ qua cột bạn đã đưa vào.",
      ),
      mk(
        "Bạn thay tên khách bằng mã 'K001', 'K002' trước khi đưa vào AI. Lợi ích chính là gì?",
        "Kết quả vẫn ghép được về đúng khách mà AI không thấy tên thật",
        [
          "Mã ngắn hơn tên nên AI xử lý nhanh và chính xác hơn",
          "Mã số được mọi công cụ AI coi là dữ liệu công khai",
          "Khách nhận thư có mã số và thấy công ty chuyên nghiệp",
        ],
        "Mã giữ được liên hệ với khách ở phía bạn mà phía AI chỉ thấy số. Độ dài tên không quyết định độ chính xác, mã vẫn thuộc dữ liệu của công ty nên cần kiểm quy định, và khách không liên quan tới bước này.",
      ),
      mk(
        "Bạn dặn AI 'không được lưu dữ liệu này' ngay trong câu lệnh. Điều đó có đủ không?",
        "Không, cách công cụ xử lý dữ liệu do quy định của nó và của công ty",
        [
          "Đủ, vì AI luôn làm đúng mọi điều được dặn trong câu lệnh, kể cả về chuyện lưu trữ",
          "Đủ nếu bạn viết hoa câu đó",
          "Đủ nếu bạn lặp lại câu dặn ở cả đầu và cuối của mỗi lần đưa dữ liệu vào",
        ],
        "Câu dặn trong prompt điều chỉnh cách AI trả lời, không thay đổi cách công cụ lưu hay dùng dữ liệu; đó là việc của cài đặt và chính sách. Viết hoa hay lặp lại không đổi được điều đó. Bạn hỏi bộ phận bảo mật để biết công cụ nào được dùng cho loại dữ liệu nào.",
      ),
      mk(
        "Ai là người trả lời câu hỏi 'loại dữ liệu này có được đưa vào công cụ AI này không'?",
        "Bộ phận bảo mật hoặc người phụ trách quy định dữ liệu của công ty",
        [
          "Chính công cụ AI, vì nó sẽ tự từ chối nếu dữ liệu bạn đưa vào là dữ liệu nhạy cảm",
          "Đồng nghiệp ngồi cạnh, vì họ đã dùng công cụ lâu hơn và chắc chắn biết rõ quy định",
          "Bạn tự quyết theo hiểu biết của mình",
        ],
        "Quy định thuộc về công ty và bộ phận chịu trách nhiệm về nó. Công cụ không tự biết dữ liệu nào là nhạy cảm với công ty bạn, đồng nghiệp có thể nhớ sai hoặc chưa biết, và tự quyết một mình dễ bỏ sót quy định bạn chưa từng nghe.",
      ),
      mk(
        "Bảng 200 dòng có 6 cột, trong đó 3 cột không cần cho việc phân loại. Sau khi bỏ 3 cột đó, còn bao nhiêu ô dữ liệu đưa vào AI?",
        "600 ô (= 200 dòng × 3 cột còn lại)",
        [
          "1.200 ô (= 200 dòng × 6 cột, tính cả những cột đã bỏ khỏi bảng đưa vào)",
          "597 ô (= 600 − 3, trừ số cột thay vì nhân số dòng với số cột còn lại)",
          "400 ô (= 200 × 2, nhầm số cột còn lại thành 2 thay vì 3)",
        ],
        "Sau khi bỏ, bảng còn 6 − 3 = 3 cột, nên 200 × 3 = 600 ô. Giữ 6 cột thì 1.200 ô; trừ cột khỏi tổng ô hoặc đếm sai cột còn lại cho 597 hoặc 400. Đây là số liệu minh hoạ phép tính.",
      ),
    ],
    keyTakeaways: [
      "Mỗi cột đưa cho AI cần một lý do: việc này có thật sự cần nó không.",
      "Cột định danh (căn cước, tài khoản, địa chỉ) thường bỏ hoặc thay bằng mã.",
      "Dùng mã số để ghép kết quả về đúng người mà AI không thấy tên.",
      "Câu dặn trong prompt không thay cho quy định của công ty.",
      "Hỏi bộ phận bảo mật: dữ liệu nào, công cụ nào được dùng.",
    ],
    practicePrompt: {
      question:
        "Anh Sơn muốn nhờ AI tóm tắt các email khiếu nại. Email có tên khách, số điện thoại và số hợp đồng. Bước nào hợp lý nhất?",
      options: [
        "Che tên, số điện thoại, số hợp đồng rồi mới đưa nội dung vào",
        "Đưa nguyên email vào, vì AI chỉ tóm tắt và không dùng thông tin khách",
        "Đưa nguyên email nhưng xoá chúng khỏi cuộc trò chuyện ngay sau đó",
        "Gõ lại nội dung bằng tay từng chữ để tránh dữ liệu đi qua công cụ",
      ],
      correct: 0,
      explanation:
        "Nội dung khiếu nại là thứ cần tóm tắt, còn thông tin định danh thì không. Đưa nguyên email là đưa luôn dữ liệu khách, xoá sau không cho biết dữ liệu đã đi tới đâu, còn gõ lại bằng tay vẫn đưa cùng chữ vào công cụ nên không giải quyết gì.",
    },
    summary: {
      keyIdea: "Chỉ đưa cho AI đúng phần dữ liệu việc cần, và hỏi người chịu trách nhiệm về phần còn lại.",
      formula: "Liệt kê cột + hỏi 'có cần không' + che hoặc thay mã + hỏi bộ phận bảo mật = dữ liệu không đi xa hơn cần thiết.",
      commonMistake: "Đưa cả bảng 'cho đủ ngữ cảnh' rồi tin rằng câu dặn 'đừng lưu' là đủ an toàn.",
      action: "Rà một bảng bạn hay đưa cho AI và gạch những cột việc đó không cần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quy trình hoặc bảng bạn đã từng đưa hoặc định đưa vào công cụ AI. Liệt kê các cột, đánh dấu cột nào cần, cột nào che, cột nào bỏ, rồi ghi một câu hỏi gửi bộ phận bảo mật. Hôm sau bạn sẽ được hỏi bạn đã gạch những cột nào.",
      secondary: "Nếu công ty chưa có quy định rõ, ghi lại câu trả lời bạn nhận được để lần sau không hỏi lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi quy trình chạy mỗi ngày, bạn không còn nhìn từng dòng dữ liệu đi qua. Bài này dạy bạn rà một lần, sớm, để biết cột nào phải che hoặc bỏ trước khi đưa vào AI.",
      },
      {
        type: "feynman",
        title: "Che dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc nhờ một người bạn xem giúp bản hợp đồng. Bạn thường che số tài khoản và số căn cước trước khi chụp gửi, vì người ấy chỉ cần đọc nội dung. Đưa dữ liệu cho AI cũng vậy: chỉ đưa phần việc thật sự cần.",
        columns: ["Thành phần", "Nhờ bạn xem hợp đồng", "Đưa dữ liệu cho AI"],
        rows: [
          ["Phần cần xem", "Nội dung điều khoản", "Cột ghi chú cần phân loại"],
          ["Phần che đi", "Số tài khoản, số căn cước", "Cột định danh không cần cho việc"],
          ["Cách giữ liên hệ", "Bạn nhớ bản gốc ở đâu", "Mã số thay cho tên"],
          ["Hỏi ai cho chắc", "Người hiểu quy định nơi bạn làm", "Bộ phận bảo mật của công ty"],
        ],
        oneLiner: "Đưa đúng phần việc cần, che phần còn lại, và hỏi người chịu trách nhiệm về quy định.",
      },
      { type: "heading", text: "Vì sao cột thừa đi theo vào AI" },
      {
        type: "paragraph",
        text: "Dữ liệu không đi theo vì ai quyết định đưa. Nó đi theo vì nằm sẵn trong bảng và bảng được đưa cả vào. Quy trình chạy hằng ngày thì lỗi nhỏ này lặp lại hằng ngày. Bước rà cột dưới đây nhanh, chỉ làm một lần khi dựng quy trình.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Rà bảng trước khi đưa vào AI",
        task: "Việc của quy trình: nhờ AI tóm tắt và phân loại ghi chú của khách. Dưới đây là các cột trong bảng định đưa vào. Đánh dấu những cột phải che hoặc bỏ.",
        segments: [
          { text: "Cột 'Ghi chú của khách': nội dung phản hồi cần phân loại." },
          {
            text: "Cột 'Số căn cước': dãy số định danh của khách.",
            error: "Việc phân loại ghi chú không cần số căn cước. Đây là dữ liệu định danh nhạy cảm, phải bỏ khỏi bảng đưa vào.",
          },
          { text: "Cột 'Mã khách' (K001, K002...): mã nội bộ không có ý nghĩa ngoài công ty." },
          {
            text: "Cột 'Số tài khoản ngân hàng': dùng để hoàn tiền.",
            error: "Không phục vụ việc phân loại ghi chú và là dữ liệu tài chính nhạy cảm; bỏ khỏi bảng đưa cho AI.",
          },
          {
            text: "Cột 'Họ tên đầy đủ': tên thật của khách.",
            error: "Việc không cần tên thật. Thay bằng mã khách để vẫn ghép được kết quả mà AI không thấy tên.",
          },
        ],
      },
      {
        type: "flow",
        title: "Rà một bảng trước khi đưa cho AI",
        steps: [
          { label: "Viết một câu: AI làm gì với bảng này", detail: "Ví dụ 'phân loại ghi chú thành ba nhóm'. Câu này là thước đo cột nào cần." },
          { label: "Liệt kê tất cả các cột", detail: "Kể cả cột ẩn hoặc cột ít ai nhìn tới; chính chúng hay đi theo mà không ai để ý." },
          { label: "Hỏi từng cột: việc này cần nó không", detail: "Không cần thì bỏ. Cần nhưng là định danh thì thay bằng mã hoặc che đi." },
          { label: "Giữ bảng ghép ở phía bạn", detail: "Bảng ghép mã với tên thật nằm ở nơi của công ty, không đưa cho AI." },
          { label: "Hỏi bộ phận bảo mật", detail: "Hỏi dữ liệu loại nào được dùng với công cụ nào. Ghi lại câu trả lời." },
        ],
      },
      {
        type: "callout",
        label: "Quy định của công ty đứng trước",
        text: "Mỗi công ty có quy định riêng về dữ liệu nào được đưa vào công cụ nào, nên bài này không thay cho quy định đó. Khi chưa chắc, hỏi bộ phận bảo mật hoặc pháp chế, đừng đoán và đừng hỏi chính công cụ AI.",
      },
      {
        type: "scenario",
        title: "Bảng khách hàng và hạn chót",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp cần phân loại 200 ghi chú của khách trong chiều nay. Bảng của bạn có cả số căn cước và số tài khoản. Bạn còn một tiếng.",
            choices: [
              { label: "Đưa luôn cả bảng vào AI cho nhanh, vì hạn chót gấp", next: "bad_all" },
              { label: "Tạo bảng mới chỉ có mã khách và cột ghi chú", next: "s2" },
            ],
          },
          bad_all: {
            text: "Việc xong nhanh. Sau đó bộ phận bảo mật hỏi vì sao một bảng có số căn cước khách được đưa vào một công cụ chưa được duyệt. Bạn không có câu trả lời.",
            ending: "bad",
          },
          s2: {
            text: "Bảng mới có 200 dòng hai cột. Bạn chưa chắc công cụ mình định dùng đã được duyệt cho loại dữ liệu này.",
            choices: [
              { label: "Nhắn hỏi bộ phận bảo mật, trong lúc chờ làm thử với 5 dòng giả", next: "good" },
              { label: "Cứ dùng vì đã bỏ hết cột nhạy cảm rồi", next: "bad_assume" },
            ],
          },
          bad_assume: {
            text: "Ghi chú của khách vẫn có thể chứa tên và số điện thoại do khách tự gõ vào. Nếu công cụ chưa được duyệt, bạn đã vi phạm quy định mà không hay.",
            ending: "bad",
          },
          good: {
            text: "Bộ phận bảo mật trả lời chiều đó: dùng được công cụ đã duyệt, nhớ soát ghi chú có tên riêng. Bạn làm xong trước hạn và ghi lại câu trả lời.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết một câu: AI làm gì với bảng này.",
          "Bước 2 - Gạch cột không cần; thay cột định danh bằng mã.",
          "Bước 3 - Soát cột văn bản tự do xem khách có gõ tên hay số vào không.",
          "Bước 4 - Hỏi bộ phận bảo mật và ghi lại câu trả lời.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chỉ đưa cho AI phần việc cần, và hỏi người chịu trách nhiệm về phần còn lại.",
          "Bài sau: dự án nhỏ, kế hoạch xử lý lỗi một trang cho quy trình của bạn.",
        ],
      },
    ],
  },
  {
    id: 2514,
    slug: "du-an-nho-ke-hoach-xu-ly-loi-mot-trang",
    title: "Chặng 55, Bài 15: Dự án nhỏ: kế hoạch xử lý lỗi một trang cho quy trình của bạn",
    subtitle: "Diễn tập chữa cháy trên giấy, khi chưa có khói.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: bước dự phòng, thông báo, thử lại hay chuyển người, dữ liệu nhạy cảm. Một quy trình thật cần cả bốn trên cùng một tờ giấy mà đồng nghiệp đọc được lúc bạn vắng. Kế hoạch một trang không đẹp, nhưng nó biến 'để tôi nhớ lại xem' thành 'mở tờ giấy ra'.",
    openingQuestion:
      "Bạn sắp nghỉ phép một tuần và nhờ đồng nghiệp trông quy trình có AI. Thứ gì giúp họ xử lý lỗi tốt nhất?",
    openingOptions: [
      "Một trang ghi sẵn từng tình huống hỏng và người làm gì ở mỗi tình huống",
      "Một buổi giải thích miệng thật dài về cách quy trình hoạt động bên trong",
      "Số điện thoại của bạn để họ gọi bất cứ khi nào quy trình có vấn đề",
      "Quyền truy cập vào cài đặt quy trình để họ tự chỉnh sửa khi cần thiết",
    ],
    correctOption: 0,
    explanation:
      "Một trang viết sẵn biến phán đoán dưới áp lực thành việc làm theo: thấy tình huống này thì ai làm gì. Giải thích miệng thì người nghe quên, và bạn không phải lúc nào cũng nghe máy khi đi nghỉ. Quyền chỉnh sửa mà không biết nên chỉnh gì có thể làm quy trình hỏng nặng hơn, nên bạn cần cả hướng dẫn chứ không chỉ quyền.",
    diagram: [
      { label: "Liệt kê 5 tình huống hỏng có thể xảy ra", arrow: true },
      { label: "Mỗi tình huống: dấu hiệu, người làm, việc làm, hạn xử lý", arrow: true },
      { label: "Diễn tập bằng giấy với một đồng nghiệp, sửa chỗ họ vấp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm hành chính có quy trình AI tóm tắt và gửi bản tin nội bộ mỗi sáng. Trưởng nhóm viết một trang với năm tình huống: bản tin rỗng, tóm tắt nhắc tên người không thuộc nhóm, quy trình không chạy, nguồn tin đổi dạng, và thông báo không tới ai. Cô đưa cho một đồng nghiệp đọc thử, hỏi 'nếu gặp tình huống ba thì làm gì' và sửa ba chỗ chưa rõ trước khi đi nghỉ.",
    },
    quiz: [
      mk(
        "Mỗi tình huống trong kế hoạch một trang cần ghi tối thiểu những gì?",
        "Dấu hiệu nhận ra, người làm, việc làm và hạn xử lý",
        [
          "Nguyên nhân kỹ thuật chi tiết của từng lỗi và lịch sử các lần lỗi từ trước tới nay",
          "Tên người thiết kế quy trình",
          "Số tiền thiệt hại dự kiến của mỗi tình huống và tên công cụ gây lỗi",
        ],
        "Người đọc trong lúc hỏng cần nhận ra, biết ai làm, làm gì và làm trước khi nào. Nguyên nhân kỹ thuật và lịch sử làm trang dài và khó đọc, tên người thiết kế không giúp xử lý, còn số tiền thiệt hại chỉ là ước đoán không dẫn tới hành động.",
      ),
      mk(
        "Vì sao cần diễn tập bằng giấy với một đồng nghiệp?",
        "Để tìm chỗ người khác đọc không hiểu trước khi lỗi thật xảy ra",
        [
          "Vì đồng nghiệp sẽ sửa được chính quy trình trong lúc họ đọc kế hoạch giúp bạn",
          "Vì diễn tập làm AI học được cách xử lý",
          "Vì kế hoạch chỉ có hiệu lực pháp lý khi có chữ ký xác nhận của hai người trở lên",
        ],
        "Người viết luôn thấy kế hoạch của mình rõ; chỉ người khác mới cho thấy chỗ mơ hồ. Diễn tập trên giấy không sửa quy trình, không huấn luyện AI, và kế hoạch nội bộ không cần chữ ký để có tác dụng thực tế.",
      ),
      mk(
        "Trong năm tình huống, bạn liệt kê 'quy trình không chạy vào sáng thứ Hai'. Người làm nên ghi thế nào?",
        "Một người có tên, kèm người thay thế nếu họ vắng",
        [
          "Cả nhóm cùng xử lý, để ai thấy trước thì làm ngay mà không phải chờ ai chỉ định",
          "Người xây quy trình, vì chỉ họ hiểu bên trong nó hoạt động ra sao và sửa được",
          "Ai cũng được, miễn là ghi tên người xử lý",
        ],
        "Tên cụ thể tạo trách nhiệm và người thay thế bảo vệ khi họ vắng. 'Cả nhóm' và 'ai cũng được' thường thành không ai, còn giao hết cho người xây quy trình là phụ thuộc vào một người có thể đang nghỉ.",
      ),
      mk(
        "Một trang giấy nên dài bao nhiêu và viết cho ai đọc?",
        "Một trang, viết cho người chưa từng dùng quy trình",
        [
          "Khoảng mười trang đầy đủ, viết cho người có nhiều kinh nghiệm về quy trình ấy",
          "Một trang, viết cho chính bạn",
          "Càng dài càng tốt, vì kế hoạch thiếu chi tiết sẽ khiến người đọc nhầm lẫn khi cần",
        ],
        "Người đọc thật thường là đồng nghiệp lần đầu gặp lỗi, nên trang phải đủ ngắn để đọc lúc vội và đủ rõ để người mới làm theo. Mười trang không ai đọc lúc đang có lỗi, viết cho mình thì bỏ sót điều bạn tưởng là hiển nhiên, và dài không có nghĩa là rõ.",
      ),
      mk(
        "Kế hoạch có 5 tình huống. Diễn tập mất 3 phút mỗi tình huống. Cả buổi diễn tập mất bao nhiêu phút?",
        "15 phút (= 5 tình huống × 3 phút)",
        [
          "8 phút (= 5 + 3, cộng số tình huống với số phút thay vì nhân chúng với nhau)",
          "3 phút (= thời gian của một tình huống, quên nhân với số tình huống)",
          "20 phút (= 5 × 4, nhầm số phút diễn tập mỗi tình huống thành 4 phút)",
        ],
        "Mỗi tình huống 3 phút và có 5 tình huống nên 5 × 3 = 15 phút. Cộng thay vì nhân cho 8, quên nhân cho 3, đếm sai số phút cho 20. Đây là số liệu minh hoạ phép tính.",
      ),
    ],
    keyTakeaways: [
      "Kế hoạch một trang: 5 tình huống hỏng, mỗi tình huống có dấu hiệu, người, việc, hạn.",
      "Ghi tên một người và một người thay thế, không ghi 'cả nhóm'.",
      "Viết cho đồng nghiệp lần đầu gặp lỗi, không viết cho mình.",
      "Diễn tập bằng giấy với một người khác để tìm chỗ mơ hồ.",
      "Giữ kế hoạch ở nơi mọi người mở được, và xem lại khi quy trình đổi.",
    ],
    practicePrompt: {
      question:
        "Chị Yến viết kế hoạch xử lý lỗi, đưa cho đồng nghiệp đọc, họ hỏi 'tình huống thứ hai thì tôi gọi ai?'. Điều này cho thấy gì?",
      options: [
        "Kế hoạch đang thiếu tên người ở tình huống thứ hai",
        "Đồng nghiệp đọc không kỹ nên cần một buổi tập huấn dài",
        "Quy trình có quá nhiều tình huống nên nên bỏ bớt vài cái",
        "Đồng nghiệp nên tự quyết gọi ai theo kinh nghiệm riêng",
      ],
      correct: 0,
      explanation:
        "Câu hỏi của người đọc chính là chỗ kế hoạch còn mơ hồ: phải sửa kế hoạch chứ không phải trách người đọc. Bỏ tình huống không giải quyết chuyện thiếu tên, và để họ tự quyết là quay lại tình trạng không có kế hoạch.",
    },
    summary: {
      keyIdea: "Kế hoạch xử lý lỗi một trang là cách để người khác xử lý đúng lúc bạn vắng.",
      formula: "5 tình huống + (dấu hiệu, người, việc, hạn) + diễn tập với một đồng nghiệp = quy trình không phụ thuộc vào trí nhớ của bạn.",
      commonMistake: "Viết kế hoạch chỉ cho chính mình đọc rồi tin là người khác cũng hiểu.",
      action: "Viết năm tình huống hỏng của một quy trình, rồi hẹn đồng nghiệp diễn tập 15 phút.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quy trình bạn đang chạy với AI. Viết năm tình huống hỏng, mỗi tình huống một dòng gồm dấu hiệu, người làm, việc làm, hạn. Sau đó nhờ một đồng nghiệp đọc và hỏi 'chỗ nào bạn không biết làm gì?'. Hôm sau bạn sẽ được hỏi bạn đã viết đủ năm tình huống chưa.",
      secondary: "Ghi lại ba chỗ đồng nghiệp hỏi và sửa ngay vào tờ giấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học bốn mảnh: bước dự phòng, thông báo, thử lại hay chuyển người, dữ liệu nhạy cảm. Bài này ghép chúng lại thành một trang mà đồng nghiệp đọc được lúc bạn vắng.",
      },
      {
        type: "feynman",
        title: "Kế hoạch xử lý lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ hướng dẫn thoát hiểm dán trong thang máy. Nó chỉ có vài dòng, viết cho người chưa từng gặp sự cố, nói rõ thấy dấu hiệu gì thì làm gì. Kế hoạch xử lý lỗi của quy trình cũng là một tờ như vậy.",
        columns: ["Thành phần", "Tờ thoát hiểm", "Kế hoạch xử lý lỗi"],
        rows: [
          ["Dấu hiệu", "Nghe chuông báo", "Quy trình dừng hoặc trả kết quả lạ"],
          ["Người làm", "Theo chỉ dẫn, gọi bảo vệ", "Người có tên và người thay thế"],
          ["Việc làm", "Đi cầu thang bộ", "Chuyển cho người, thử lại, hoặc dừng quy trình"],
          ["Người đọc", "Ai cũng đọc được", "Đồng nghiệp lần đầu gặp lỗi"],
        ],
        oneLiner: "Một tờ ngắn cho người chưa từng gặp lỗi, nói rõ thấy gì thì ai làm gì.",
      },
      { type: "heading", text: "Năm tình huống và bốn cột" },
      {
        type: "paragraph",
        text: "Bạn chưa cần liệt kê mọi cách hỏng. Chọn năm tình huống có khả năng cao nhất hoặc hậu quả nặng nhất. Mỗi tình huống có bốn cột: dấu hiệu nhận ra, người làm, việc làm, hạn xử lý. Chúng khớp với bốn bài trước: kết quả rỗng hoặc lạ, thông báo, thử lại hoặc chuyển người, dữ liệu nhạy cảm.",
      },
      {
        type: "flow",
        title: "Từ một quy trình tới một trang kế hoạch",
        steps: [
          { label: "Vẽ lại quy trình trong một dòng", detail: "Ví dụ: nhận yêu cầu, AI gắn nhãn, người duyệt, gửi khách." },
          { label: "Chọn 5 tình huống hỏng", detail: "Gồm: kết quả rỗng, nhãn lạ, quy trình dừng, lỗi gửi, và dữ liệu nhạy cảm bị đưa nhầm." },
          { label: "Điền bốn cột cho từng tình huống", detail: "Dấu hiệu, người làm (kèm người thay thế), việc làm, hạn xử lý." },
          { label: "Diễn tập bằng giấy", detail: "Đưa cho một đồng nghiệp, đọc từng tình huống và hỏi họ sẽ làm gì. Ghi chỗ họ vấp." },
          { label: "Sửa và dán ở nơi mọi người mở được", detail: "Xem lại khi quy trình đổi hoặc có người mới vào nhóm." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Có kế hoạch một trang",
          text: "Đồng nghiệp biết thấy gì thì làm gì, gọi ai. Lỗi được xử lý trong giờ. Bạn nghỉ phép mà không bị gọi.",
        },
        right: {
          label: "Chỉ có trí nhớ của bạn",
          text: "Mọi tình huống hỏng đều phải hỏi bạn. Bạn vắng thì lỗi nằm im. Mỗi người xử lý theo một kiểu khác nhau.",
        },
      },
      {
        type: "callout",
        label: "Kế hoạch này không thay cho quy định của công ty",
        text: "Những việc liên quan dữ liệu nhạy cảm, hợp đồng hay thuế cần theo quy định của công ty. Khi chưa chắc, ghi trong kế hoạch 'hỏi bộ phận bảo mật' hoặc 'hỏi bộ phận pháp chế' thay vì tự phán đoán.",
      },
      {
        type: "scenario",
        title: "Diễn tập kế hoạch với đồng nghiệp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã viết xong kế hoạch năm tình huống. Bạn đưa cho anh Khoa, đồng nghiệp sẽ trông quy trình tuần tới.",
            choices: [
              { label: "Gửi tệp qua email và nhắn 'có gì gọi tôi nhé'", next: "bad_send" },
              { label: "Ngồi 15 phút, đọc từng tình huống và hỏi anh Khoa sẽ làm gì", next: "s2" },
            ],
          },
          bad_send: {
            text: "Anh Khoa không mở tệp. Thứ Tư quy trình dừng, anh không biết làm gì và gọi bạn đang đi biển, máy không có sóng.",
            ending: "bad",
          },
          s2: {
            text: "Ở tình huống ba, anh Khoa hỏi: 'Nhãn lạ thì chuyển cho ai, chị Mai hay chị Lan?'. Kế hoạch ghi 'chuyển cho người phụ trách' mà không ghi tên.",
            choices: [
              { label: "Sửa ngay thành tên cụ thể kèm người thay thế", next: "s3" },
              { label: "Giải thích miệng cho anh Khoa và để kế hoạch như cũ", next: "bad_oral" },
            ],
          },
          bad_oral: {
            text: "Tuần sau người mới vào nhóm đọc kế hoạch và hỏi lại đúng câu đó. Không còn ai nhớ câu trả lời.",
            ending: "bad",
          },
          s3: {
            text: "Bạn sửa tình huống ba và hỏi tiếp anh Khoa tình huống bốn. Còn cần quyết nơi đặt kế hoạch.",
            choices: [
              { label: "Dán bản cuối ở thư mục chung, ghi ngày cập nhật và hẹn xem lại khi quy trình đổi", next: "good" },
              { label: "Giữ tệp trong máy của bạn vì đó là tài liệu của bạn", next: "bad_local" },
            ],
          },
          bad_local: {
            text: "Khi bạn nghỉ, không ai mở được tệp. Kế hoạch tồn tại nhưng không ai dùng được.",
            ending: "bad",
          },
          good: {
            text: "Bạn đi nghỉ. Thứ Tư quy trình dừng, anh Khoa mở trang, làm đúng theo tình huống hai và nhắn bạn một dòng khi đã xong.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Vẽ quy trình trong một dòng và chọn năm tình huống hỏng.",
          "Bước 2 - Điền dấu hiệu, người làm, việc làm, hạn cho từng tình huống.",
          "Bước 3 - Diễn tập 15 phút với một đồng nghiệp và sửa chỗ họ vấp.",
          "Bước 4 - Đặt bản cuối ở nơi chung, ghi ngày và hẹn xem lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang, năm tình huống, bốn cột: đủ để quy trình sống được khi bạn vắng.",
          "Bài sau: đo xem quy trình có AI thật sự tiết kiệm được bao nhiêu thời gian.",
        ],
      },
    ],
  },
];
