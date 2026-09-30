import type { Lesson } from "../lesson-types";

// Chặng 51, bài 16-20. Giáo trình: scripts/curriculum/stage-51.json.
// Các bài này dạy khái niệm bền (tần suất, kiểm duyệt, quyền truy cập, ghi chú luồng) và không nêu
// tính năng, nút bấm, giá hay phiên bản của công cụ cụ thể nào, nên không cần đối chiếu tài liệu chính thức.
export const S51_D_LESSONS: Lesson[] = [
  {
    id: 2435,
    slug: "gioi-han-so-lan-chay-va-chi-phi-an",
    title: "Chặng 51, Bài 16: Giới hạn số lần chạy và chi phí ẩn của một luồng chạy mỗi phút",
    subtitle: "Mỗi lần chạy nhẹ tênh, nhưng nhân với số phút trong một tháng thì thành con số lớn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dựng xong luồng kiểm tra đơn hàng mới và đặt nó chạy mỗi phút cho kịp. Cuối tháng công cụ báo đã dùng hết hạn mức, luồng bị tạm dừng đúng lúc khách đặt nhiều nhất. Biết ước lượng số lần chạy từ trước giúp bạn chọn nhịp vừa đủ thay vì nhanh nhất có thể.",
    openingQuestion:
      "Bạn đặt một luồng kiểm tra hộp thư đơn hàng chạy mỗi phút, cả ngày, cả tháng. Khách chỉ cần được xác nhận trong vòng nửa tiếng. Điều gì hợp lý nhất?",
    openingOptions: [
      "Nới nhịp kiểm ra 15 phút, vì khách vẫn được xác nhận kịp hạn nửa tiếng",
      "Giữ mỗi phút, vì luồng càng chạy nhiều thì càng an toàn cho khách hàng của mình",
      "Đổi sang mỗi giây để chắc chắn không sót một đơn hàng nào cả",
      "Giữ nguyên và chờ công cụ báo lỗi hạn mức rồi mới tính tiếp",
    ],
    correctOption: 0,
    explanation:
      "Hạn chót nửa tiếng nghĩa là kiểm mỗi 15 phút vẫn xác nhận kịp, mà chỉ chạy khoảng 2.880 lần mỗi tháng thay vì 43.200 lần. Chạy mỗi phút không làm luồng an toàn hơn, nó chỉ tiêu nhiều lượt chạy hơn. Đổi sang mỗi giây chỉ làm con số lớn thêm gấp nhiều lần mà khách không nhận ra khác biệt. Chờ tới khi hết hạn mức thì luồng dừng đúng lúc bạn cần nó nhất, nên phải tính trước.",
    diagram: [
      { label: "Khách cần phản hồi trong bao lâu?", arrow: true },
      { label: "Chọn khoảng cách giữa các lần kiểm", arrow: true },
      { label: "Nhân ra số lượt chạy mỗi tháng", arrow: true },
      { label: "So với hạn mức rồi chỉnh nhịp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một cửa hàng nhỏ đặt luồng kiểm đơn mỗi phút vì sợ trễ. Sau một tuần, chủ cửa hàng nhận ra đơn chỉ cần xác nhận trong vòng 30 phút. Chị chuyển sang kiểm mỗi 15 phút, đơn vẫn được xác nhận đúng hẹn mà số lượt chạy trong tháng giảm xuống còn khoảng một phần mười lăm.",
    },
    quiz: [
      {
        question: "Một luồng kiểm tra mỗi phút, chạy cả ngày, một tháng 30 ngày chạy bao nhiêu lần?",
        options: [
          "43.200 lần (= 60 × 24 × 30)",
          "1.440 lần (= 60 × 24, chỉ tính một ngày)",
          "720 lần (= 24 × 30, tính theo giờ)",
          "2.592.000 lần (= 43.200 × 60, nhân thừa)",
        ],
        correct: 0,
        explanation:
          "Một giờ có 60 lần kiểm, một ngày 24 giờ, một tháng 30 ngày nên 60 × 24 × 30 = 43.200. Con số 1.440 mới là một ngày, 720 là khi kiểm mỗi giờ chứ không phải mỗi phút, còn 2.592.000 là nhân thêm 60 một cách thừa thãi.",
      },
      {
        question: "Vì sao chi phí ẩn của luồng chạy thường xuyên lại lớn dù mỗi lần chạy rất nhẹ?",
        options: [
          "Số lần chạy nhân theo tần suất, nên tổng mới là con số đáng nhìn",
          "Mỗi lần chạy sẽ nặng dần lên theo thời gian luồng được dùng",
          "Công cụ luôn tính phí theo số chữ của từng email được gửi đi",
          "Chi phí chỉ phát sinh khi luồng lỗi và phải tự chạy lại nhiều lần",
        ],
        correct: 0,
        explanation:
          "Một lần chạy nhỏ nhân với hàng chục nghìn lần vẫn thành số lớn. Luồng không nặng dần theo thời gian, cách tính phí tuỳ từng công cụ chứ không mặc định theo số chữ, và luồng chạy đều cũng đã tiêu lượt dù không hề lỗi.",
      },
      {
        question: "Khách chấp nhận được chậm 15 phút. Nhịp kiểm nào hợp lý cho luồng báo đơn mới?",
        options: [
          "Mỗi 10 đến 15 phút, vì chờ thêm vẫn kịp mà tốn ít lượt",
          "Mỗi 30 giây, vì nhanh hơn thì luôn có lợi hơn cho khách",
          "Mỗi ngày một lần lúc sáng sớm để đỡ tốn lượt chạy nhất",
          "Mỗi phút, vì đó là nhịp nhỏ nhất mà mọi công cụ cho phép",
        ],
        correct: 0,
        explanation:
          "Nhịp phải nhỏ hơn thời gian khách chịu chờ nhưng không cần nhỏ hơn nữa. Mỗi 30 giây và mỗi phút tốn lượt vô ích, còn mỗi ngày một lần thì đơn đến sáng có thể đợi cả ngày, vượt xa 15 phút khách chấp nhận.",
      },
      {
        question: "Hạn mức minh hoạ là 10.000 lượt mỗi tháng. Luồng kiểm mỗi 5 phút, chạy cả ngày 30 ngày dùng bao nhiêu?",
        options: [
          "Khoảng 8.640 lượt (= 12 × 24 × 30), sát hạn mức",
          "Khoảng 720 lượt (= 24 × 30, nhầm 5 phút thành 1 giờ)",
          "Khoảng 86.400 lượt (= 8.640 × 10, nhân thừa)",
          "Khoảng 1.440 lượt (= 48 × 30, nhầm thành mỗi 30 phút)",
        ],
        correct: 0,
        explanation:
          "Kiểm mỗi 5 phút là 12 lần mỗi giờ; nhân 24 giờ rồi 30 ngày ra 8.640, còn dưới 10.000 nhưng sát. Chọn 720 là đã coi nhịp là mỗi giờ, 1.440 là coi nhịp là 30 phút, còn 86.400 thì nhân thừa một hệ số 10.",
      },
      {
        question: "Khi nào đáng đổi từ 'kiểm theo giờ' sang 'chạy khi có sự kiện'?",
        options: [
          "Khi việc cần phản ứng nhanh và phần lớn lần kiểm đều trống",
          "Khi muốn luồng trông hiện đại hơn trước mặt đồng nghiệp",
          "Khi màn hình thiết kế có thêm nhiều ô lựa chọn mới để thử",
          "Khi luồng chưa từng lỗi, vì lúc đó đổi cách chạy sẽ không rủi ro",
        ],
        correct: 0,
        explanation:
          "Kiểm theo giờ tốn lượt cho những lần không có gì mới, còn chạy khi có sự kiện chỉ chạy lúc có việc thật. Lý do thẩm mỹ hay số ô lựa chọn không phải căn cứ, và luồng chưa lỗi không có nghĩa là đổi sẽ không rủi ro.",
      },
    ],
    keyTakeaways: [
      "Số lượt chạy mỗi tháng = số lần kiểm mỗi giờ × số giờ chạy × số ngày.",
      "Chọn nhịp theo thời gian khách chịu chờ, không theo nhịp nhanh nhất có thể.",
      "Luồng chạy cả đêm và cuối tuần vẫn tiêu lượt dù không có ai làm việc.",
      "Nếu được, chạy khi có sự kiện thay cho kiểm đi kiểm lại.",
      "Hỏi người quản lý công cụ về hạn mức trước khi bật luồng chạy dày.",
    ],
    practicePrompt: {
      question:
        "Chị Hoa đặt luồng kiểm bảng đăng ký mỗi 10 phút, chạy cả ngày. Chị cần biết số lượt chạy trong 30 ngày. Phép tính nào đúng?",
      options: [
        "6 lần mỗi giờ × 24 giờ × 30 ngày = 4.320 lượt",
        "10 lần mỗi giờ × 24 giờ × 30 ngày = 7.200 lượt, nhầm phút thành lần",
        "24 giờ × 30 ngày = 720 lượt, quên mất đổi phút ra giờ",
        "6 lần mỗi giờ × 24 giờ = 144 lượt, dừng ở phép tính một ngày",
      ],
      correct: 0,
      explanation:
        "Mỗi 10 phút nghĩa là 60 ÷ 10 = 6 lần mỗi giờ. Nhân tiếp 24 giờ và 30 ngày ra 4.320. Các đáp án còn lại là nhầm con số 10 thành số lần mỗi giờ, bỏ mất nhịp, hoặc chỉ tính một ngày.",
    },
    summary: {
      keyIdea: "Mỗi lần chạy rẻ, nhưng số lần chạy mới quyết định hạn mức và chi phí.",
      formula: "Lượt chạy mỗi tháng = (60 ÷ phút giữa các lần) × giờ chạy mỗi ngày × số ngày.",
      commonMistake: "Chọn nhịp nhanh nhất cho chắc, rồi tới cuối tháng mới biết hạn mức đã cạn.",
      action: "Chọn một việc bạn định tự động, hỏi khách chịu chờ bao lâu rồi chọn nhịp theo câu trả lời đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lặp bạn định để chạy theo giờ, ví dụ kiểm hộp thư hay bảng đăng ký của chính bạn. Viết ra người nhận việc chịu chờ tối đa bao lâu, chọn nhịp kiểm, rồi nhân ra số lượt chạy trong 30 ngày trên giấy. Ghi kết quả và hạn mức bạn nghĩ công cụ của mình có.",
      secondary: "Hỏi người quản lý công cụ của công ty về hạn mức thật và ghi lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn mở công cụ tự động và thấy nó báo gần hết hạn mức tháng, dù bạn chỉ có ba luồng nhỏ. Thủ phạm thường là một luồng kiểm đi kiểm lại mỗi phút. Bài này dạy cách ước lượng trước để chọn nhịp vừa đủ.",
      },
      {
        type: "feynman",
        title: "Giới hạn số lần chạy đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc ra hộp thư trước nhà xem có thư không. Ra mỗi phút thì quá sức, ra mỗi ngày một lần thì thư để lâu. Luồng tự động cũng vậy: mỗi lần kiểm là một chuyến ra hộp thư, và công cụ đếm từng chuyến.",
        columns: ["Thành phần", "Ra hộp thư", "Luồng chạy theo giờ"],
        rows: [
          ["Một lần kiểm", "Một chuyến ra cổng", "Một lượt chạy"],
          ["Chọn nhịp", "Bao lâu bạn cần có thư", "Khách chịu chờ bao lâu"],
          ["Chuyến trống", "Ra mà không có thư", "Lượt chạy không có việc mới"],
          ["Cách bớt chuyến", "Chuông báo khi có người gửi thư", "Chạy khi có sự kiện"],
        ],
        oneLiner: "Mỗi lần kiểm là một lượt bị đếm, nên nhịp kiểm phải theo nhu cầu chứ không theo nỗi lo.",
      },
      { type: "heading", text: "Một phép nhân dễ quên" },
      {
        type: "paragraph",
        text: "Kiểm mỗi phút nghe nhỏ: một phút là một cái chớp mắt. Nhưng một giờ có 60 phút, một ngày có 24 giờ, một tháng 30 ngày, và bạn đã có 43.200 lượt chạy. Hầu hết số lượt đó là lượt trống vì không có đơn mới. Bạn đang trả cho những lần đi ra hộp thư mà không có thư.",
      },
      {
        type: "chart",
        title: "Số lượt chạy mỗi tháng theo khoảng cách giữa các lần kiểm",
        caption:
          "Số liệu minh hoạ, không phải số đo thật: hãy kéo thanh trượt cho khớp với luồng của bạn. Đường nằm ngang là hạn mức giả định để bạn thấy nhịp nào vượt.",
        kind: "line",
        xLabel: "Phút giữa hai lần kiểm",
        yLabel: "Lượt chạy mỗi tháng",
        x: { from: 1, to: 30, step: 1 },
        params: [
          { id: "hours", label: "Giờ chạy mỗi ngày", min: 8, max: 24, step: 1, value: 24, unit: "giờ" },
          { id: "days", label: "Số ngày chạy mỗi tháng", min: 20, max: 31, step: 1, value: 30, unit: "ngày" },
          { id: "limit", label: "Hạn mức giả định", min: 1000, max: 20000, step: 1000, value: 10000, unit: "lượt" },
        ],
        series: [
          { label: "Lượt chạy mỗi tháng", expr: "hours * 60 * days / x" },
          { label: "Hạn mức giả định", expr: "limit" },
        ],
      },
      {
        type: "callout",
        label: "Chạy cả đêm cũng bị đếm",
        text: "Luồng kiểm không biết bạn đã tan làm. Nếu việc chỉ có ý nghĩa trong giờ làm, hãy giới hạn khung giờ chạy hoặc dùng cách chạy khi có sự kiện. Bớt 16 giờ mỗi ngày là bớt hai phần ba số lượt.",
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm theo nhịp",
          text: "Luồng tự đi xem có gì mới, đều đặn. Đơn giản để dựng, nhưng tốn lượt cho cả những lần trống, và nhịp càng dày càng tốn.",
        },
        right: {
          label: "Chạy khi có sự kiện",
          text: "Luồng chỉ chạy khi có đơn mới tới. Gần như không có lượt trống, nhưng cần nguồn gửi tín hiệu, không phải nguồn nào cũng làm được.",
        },
      },
      {
        type: "scenario",
        title: "Luồng kiểm mỗi phút của cửa hàng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đặt luồng báo đơn mới chạy mỗi phút từ tuần trước. Hôm nay công cụ nhắc rằng bạn đã dùng hơn nửa hạn mức tháng chỉ sau một tuần. Khách chấp nhận chờ tối đa 30 phút.",
            choices: [
              { label: "Bỏ qua cảnh báo, vì luồng chưa lỗi lần nào", next: "bad_ignore" },
              { label: "Ngồi tính lại số lượt chạy rồi chọn nhịp theo thời gian khách chịu chờ", next: "s2" },
            ],
          },
          bad_ignore: {
            text: "Giữa tháng hạn mức cạn, luồng bị tạm dừng. Một đợt đơn về cuối tuần không được báo và sáng thứ Hai khách gọi hỏi vì sao chưa thấy xác nhận.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tính ra nhịp 15 phút sẽ chỉ tốn khoảng một phần mười lăm số lượt hiện tại. Bạn cũng thấy luồng vẫn chạy cả đêm dù cửa hàng đóng cửa.",
            choices: [
              { label: "Đổi nhịp sang 15 phút và giới hạn khung giờ chạy trong giờ bán hàng", next: "good" },
              { label: "Đổi nhịp sang mỗi giây cho chắc vì đã có hạn mức dư", next: "bad_fast" },
            ],
          },
          bad_fast: {
            text: "Mỗi giây nghĩa là hàng triệu lượt, hạn mức hết trong vài giờ và luồng dừng ngay đầu ngày bán hàng.",
            ending: "bad",
          },
          good: {
            text: "Luồng vẫn báo đơn trong vòng 15 phút, số lượt chạy cả tháng còn rất xa hạn mức, và bạn ghi phép tính vào ghi chú để lần sau dùng lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Hỏi người nhận việc chịu chờ bao lâu.",
          "Bước 2 - Chọn nhịp nhỏ hơn thời gian đó một chút.",
          "Bước 3 - Nhân ra số lượt chạy trong 30 ngày và so với hạn mức.",
          "Bước 4 - Giới hạn khung giờ chạy, hoặc chuyển sang chạy khi có sự kiện nếu được.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nhịp theo nhu cầu, không theo nỗi lo.",
          "Bài sau: luồng gửi nhầm người và cách chặn trước khi nó xảy ra.",
        ],
      },
    ],
  },
  {
    id: 2436,
    slug: "luong-gui-nham-nguoi-va-cach-chan-truoc",
    title: "Chặng 51, Bài 17: Luồng gửi nhầm người: cách chặn trước khi nó xảy ra",
    subtitle: "Một email nội bộ suýt đến khách hàng, và ba lớp chặn đơn giản hơn cả việc xin lỗi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Luồng tự động gửi nhanh hơn bạn đọc lại. Một lần chọn sai cột người nhận là bản nháp nội bộ tới tay khách. Thêm vài lớp chặn trước khi bật luồng rẻ hơn rất nhiều so với một bức thư xin lỗi gửi cho cả danh sách.",
    openingQuestion:
      "Luồng của bạn gửi bản tin nội bộ mỗi thứ Sáu lấy người nhận từ một bảng chung. Hôm nay có người thêm vài khách vào cùng bảng. Cách nào chặn rủi ro tốt nhất?",
    openingOptions: [
      "Dùng một danh sách nhận cố định do bạn duyệt, tách riêng khỏi bảng chung",
      "Dặn mọi người trong nhóm không được sửa bảng chung khi luồng đang chạy",
      "Kiểm tra bảng bằng mắt vào mỗi sáng thứ Sáu trước khi luồng chạy lúc chiều",
      "Yên tâm vì khách thường sẽ tự báo lại khi nhận nhầm thư nội bộ",
    ],
    correctOption: 0,
    explanation:
      "Danh sách nhận cố định làm người nhận không phụ thuộc vào việc ai vừa sửa bảng, nên lỗi của người khác không thể biến thành thư gửi nhầm. Dặn dò thì dễ quên, nhất là khi ai đó cần thêm dòng gấp. Nhìn bảng bằng mắt lúc sáng không bắt được thay đổi xảy ra sau đó trong ngày. Còn chờ khách báo lại là lúc thư đã đi, không thu hồi được.",
    diagram: [
      { label: "Danh sách nhận cố định do bạn duyệt", arrow: true },
      { label: "Bước duyệt trước khi gửi ra ngoài", arrow: true },
      { label: "Chạy thử gửi cho chính bạn", arrow: true },
      { label: "Bật luồng thật và xem nhật ký đầu tiên" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý văn phòng dựng luồng gửi lịch họp nội bộ, lấy người nhận từ cột B của bảng dùng chung. Một đồng nghiệp dán thêm vài email khách vào cột B để ghi nhớ. Lịch họp nội bộ có kèm ghi chú nhận xét về khách hôm sau đã tới hộp thư của chính những khách đó. Chị chuyển sang danh sách nhận riêng, cố định, và thêm một bước duyệt cho mọi thư gửi ra ngoài công ty.",
    },
    quiz: [
      {
        question: "Vì sao danh sách nhận nên tách riêng khỏi bảng mà nhiều người cùng sửa?",
        options: [
          "Vì người khác sửa bảng sẽ không làm đổi người nhận của luồng",
          "Vì bảng chung làm luồng chạy chậm đi rõ rệt mỗi lần chạy",
          "Vì công cụ tự động chỉ đọc được bảng có đúng một người sửa",
          "Vì danh sách riêng giúp email tới hộp thư chính thay vì thư rác",
        ],
        correct: 0,
        explanation:
          "Khi người nhận nằm trong nơi chỉ bạn sửa, thay đổi của người khác không làm đổi người nhận. Tốc độ luồng không liên quan tới số người sửa bảng, công cụ đọc bảng nhiều người sửa như thường, và việc vào hộp thư chính hay thư rác phụ thuộc vào cấu hình gửi chứ không phải danh sách.",
      },
      {
        question: "Bước duyệt trước khi gửi ra ngoài công ty nên đặt ở đâu?",
        options: [
          "Trước bước gửi, để một người xem thư rồi mới cho đi",
          "Sau bước gửi, để người duyệt kiểm lại những thư đã đi",
          "Chỉ đặt ở lần chạy đầu tiên, sau đó luồng tự gửi được",
          "Không cần, vì người nhận là người mình đã chọn sẵn từ trước",
        ],
        correct: 0,
        explanation:
          "Duyệt phải nằm trước bước gửi, vì thư đã đi thì không kéo lại được. Duyệt sau chỉ là kiểm tra hậu quả. Duyệt một lần đầu không bắt được lỗi do dữ liệu đổi về sau, và người nhận chọn sẵn vẫn có thể sai khi dữ liệu nguồn thay đổi.",
      },
      {
        question: "Cách chạy thử nào an toàn nhất trước khi bật luồng gửi email thật?",
        options: [
          "Đặt người nhận là chính bạn rồi chạy với vài dòng dữ liệu giả",
          "Chạy với dữ liệu thật nhưng chỉ chọn một khách quen thân để gửi",
          "Bật luồng thật vào đêm khuya khi ít người đang mở hộp thư",
          "Chạy ngay với danh sách thật và xoá thư ở hộp thư đã gửi nếu sai",
        ],
        correct: 0,
        explanation:
          "Gửi cho chính bạn thì mọi lỗi dừng lại ở hộp thư của bạn. Khách quen vẫn là người thật nhận thư thật, đêm khuya không làm thư biến mất, và xoá thư ở hộp thư đã gửi không rút được thư khỏi hộp thư của người nhận.",
      },
      {
        question: "Luồng gửi một email duy nhất tới 200 người thì nên thêm giới hạn nào?",
        options: [
          "Một ngưỡng số người nhận tối đa, vượt ngưỡng thì luồng dừng chờ duyệt",
          "Giảm số người nhận xuống còn 200 để thư trông nhỏ gọn hơn",
          "Bật luồng ở nhịp nhanh hơn để thư đi hết nhanh hơn trước khi ai kịp sửa",
          "Thêm lời nhắn cuối thư rằng nếu nhận nhầm xin hãy bỏ qua thư này",
        ],
        correct: 0,
        explanation:
          "Ngưỡng số người nhận biến một lỗi kiểu 'gửi cho cả bảng' thành một lần dừng chờ duyệt. Tự giảm số người không liên quan tới rủi ro gửi nhầm, đi nhanh hơn chỉ làm lỗi lan nhanh hơn, và lời nhắn cuối thư không thu lại nội dung nhạy cảm đã lộ.",
      },
      {
        question: "Thư có nội dung nhạy cảm của khách (ví dụ khiếu nại) nên được xử lý thế nào trong luồng?",
        options: [
          "Không đưa vào luồng hàng loạt, và nếu có thì chỉ nhận bản nháp chờ duyệt",
          "Cho luồng gửi tự động, vì thư nào cũng qua một bước viết mẫu từ trước",
          "Gửi cho cả nhóm cho nhanh rồi nhờ mọi người xoá nếu không liên quan",
          "Dùng riêng một luồng mỗi ngày chạy một lần vào cuối giờ làm việc",
        ],
        correct: 0,
        explanation:
          "Thư nhạy cảm cần người đọc trước khi gửi, nên luồng chỉ nên soạn bản nháp. Việc có mẫu từ trước không làm nội dung từng thư an toàn, nhờ người xoá không lấy lại được thông tin đã tới, và chạy vào cuối giờ chỉ đổi thời điểm chứ không đổi rủi ro.",
      },
    ],
    keyTakeaways: [
      "Người nhận nằm ở nơi chỉ bạn sửa, không nằm ở bảng nhiều người chạm vào.",
      "Duyệt phải đứng trước bước gửi, vì thư đi rồi không kéo lại được.",
      "Chạy thử bằng người nhận là chính bạn và dữ liệu giả.",
      "Đặt ngưỡng số người nhận tối đa để lỗi lớn tự dừng lại.",
      "Thư nhạy cảm không đi hàng loạt; luồng chỉ soạn bản nháp.",
    ],
    practicePrompt: {
      question:
        "Anh Nam có luồng gửi báo giá tự động cho khách lấy từ cột C. Sáng nay đồng nghiệp thêm một khách mới vào cột C. Biện pháp nào đủ để chặn gửi nhầm?",
      options: [
        "Một bước duyệt trước khi gửi và danh sách người nhận cố định do anh duyệt",
        "Chỉ một bước duyệt sau khi thư đã được gửi, để xem nhật ký hôm sau rồi nhắn xin lỗi nếu có sai",
        "Nhắn cả nhóm đừng sửa cột C, vì mọi người đều đọc tin nhắn cẩn thận",
        "Thêm dòng cảnh báo cuối báo giá để khách tự biết thư nào là của mình",
      ],
      correct: 0,
      explanation:
        "Danh sách cố định làm lỗi ở cột C không đi thẳng vào thư, còn bước duyệt bắt thêm lỗi trước khi gửi. Duyệt sau thì thư đã đi. Nhắn tin dặn dò dễ bị quên, và dòng cảnh báo cuối thư không chặn được việc báo giá tới nhầm khách.",
    },
    summary: {
      keyIdea: "Chặn gửi nhầm bằng thiết kế luồng, không bằng lời nhắc nhở.",
      formula: "Danh sách nhận cố định + duyệt trước khi gửi + chạy thử gửi cho chính mình = luồng khó gửi nhầm.",
      commonMistake: "Xin lỗi sau khi thư đã đi thay vì chặn trước bước gửi.",
      action: "Mở một luồng gửi thư bạn đang dùng và kiểm xem người nhận đang lấy từ đâu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một luồng hoặc một việc gửi thư lặp lại của bạn. Viết ra người nhận đang lấy từ đâu và ai có thể sửa nơi đó. Soạn một danh sách nhận riêng cho nó và ghi thêm điều kiện để thư dừng chờ duyệt, ví dụ hơn 20 người hoặc có người ngoài công ty.",
      secondary: "Gửi thử một thư cho chính bạn rồi đối chiếu người nhận với danh sách.",
    },
    sections: [
      {
        type: "lead",
        text: "Luồng tự động không hỏi lại bạn 'có chắc không?'. Nếu cột người nhận lẫn một địa chỉ khách, thư đi trước khi bạn kịp thấy. Bài này dạy ba lớp chặn đặt ngay khi thiết kế luồng.",
      },
      {
        type: "feynman",
        title: "Chặn gửi nhầm đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới người gác cổng ở toà nhà. Anh có danh sách khách được phép vào, hỏi tên người lạ, và với khách đặc biệt thì gọi lên hỏi trước khi mở cổng. Luồng của bạn cũng cần một người gác như vậy trước khi thư đi.",
        columns: ["Thành phần", "Người gác cổng", "Luồng gửi thư"],
        rows: [
          ["Danh sách được vào", "Sổ khách do chủ nhà duyệt", "Danh sách người nhận cố định"],
          ["Gọi lên hỏi", "Gọi chủ nhà trước khi mở cổng", "Bước duyệt trước khi gửi"],
          ["Tập dượt", "Chủ nhà thử bấm chuông cổng", "Chạy thử gửi cho chính bạn"],
          ["Đông bất thường", "Nhiều người cùng đến thì hỏi lại", "Ngưỡng số người nhận tối đa"],
        ],
        oneLiner: "Đặt người gác trước bước gửi: danh sách cố định, bước duyệt và chạy thử.",
      },
      { type: "heading", text: "Lỗi nằm ở chỗ lấy người nhận" },
      {
        type: "paragraph",
        text: "Phần lớn thư gửi nhầm không do luồng hỏng. Luồng làm đúng việc được giao: lấy cột B, gửi cho từng dòng. Sai ở chỗ cột B đã thay đổi mà không ai báo. Vì vậy lớp chặn đầu tiên là cho người nhận một nơi ở riêng mà chỉ bạn sửa.",
      },
      {
        type: "flow",
        title: "Ba lớp chặn trước khi thư đi",
        steps: [
          { label: "Danh sách nhận cố định", detail: "Người nhận nằm ở nơi chỉ bạn sửa. Người khác sửa bảng chung cũng không đổi được người nhận." },
          { label: "Duyệt trước khi gửi ra ngoài", detail: "Thư có người ngoài công ty hoặc vượt ngưỡng số người nhận thì dừng chờ một người xem rồi mới cho đi." },
          { label: "Chạy thử với dữ liệu giả", detail: "Đặt người nhận là chính bạn, chạy vài dòng giả, xem thư ra thế nào trước khi bật thật." },
          { label: "Xem nhật ký lần chạy đầu", detail: "Sau khi bật thật, xem ngay nhật ký của lần chạy đầu tiên để thấy số thư đã đi và tới ai." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát mô tả luồng mà AI vừa viết",
        task: "Ghi chú của bạn chỉ có: gửi bản tin cho 12 người trong nhóm nội bộ, danh sách ở cột B, chị Lan duyệt trước khi gửi, chạy mỗi thứ Sáu. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Luồng gửi bản tin cho 12 người trong nhóm nội bộ vào mỗi thứ Sáu." },
          { text: "Danh sách người nhận lấy từ cột B của bảng." },
          { text: "Luồng cũng gửi bản sao cho toàn bộ khách hàng ở cột D để họ cập nhật luôn.", error: "Ghi chú không hề nói gì về cột D hay khách hàng. AI tự thêm một nhóm người nhận ngoài công ty, đúng kiểu gửi nhầm mà ta đang muốn tránh." },
          { text: "Chị Lan duyệt bản tin trước khi gửi." },
          { text: "Công cụ tự động chặn mọi địa chỉ ngoài công ty nên không thể gửi nhầm.", error: "Ghi chú không có phần chặn này. AI bịa một biện pháp an toàn để đoạn văn nghe yên tâm; nếu tin vào nó bạn sẽ bỏ qua bước duyệt thật." },
          { text: "Nếu số người nhận vượt 12, luồng dừng lại và báo cho chị Lan.", error: "Ngưỡng 12 người và việc dừng lại báo chị Lan không có trong ghi chú. Đó là ý hay nhưng là AI tự thêm, bạn phải quyết rồi mới được ghi." },
        ],
      },
      {
        type: "callout",
        label: "Một biện pháp AI bịa ra còn nguy hơn không có",
        text: "Một câu như 'công cụ chặn mọi địa chỉ ngoài công ty' nghe rất yên tâm, và chính vì thế người đọc thôi kiểm. Chỉ ghi vào mô tả luồng những biện pháp bạn đã tự dựng và thử.",
      },
      {
        type: "comparison",
        left: {
          label: "Có ba lớp chặn",
          text: "Sai một lớp thì còn lớp khác. Lỗi người khác sửa bảng không thể thành thư gửi nhầm. Chậm hơn một chút khi dựng, nhưng mỗi lần chạy yên tâm.",
        },
        right: {
          label: "Chỉ tin vào luồng chạy đúng",
          text: "Nhanh lúc dựng, nhưng mọi sai sót của dữ liệu đi thẳng ra ngoài. Khi có lỗi bạn là người phát hiện sau cùng, khi thư đã tới tay người nhận.",
        },
      },
      {
        type: "scenario",
        title: "Thư tuần này đi tới ai?",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu, luồng gửi bản tin sắp chạy. Bạn để ý có thêm bốn địa chỉ lạ trong cột người nhận của bảng chung, trông giống email khách hàng.",
            choices: [
              { label: "Để luồng chạy vì bản tin chỉ là tin tức chung, chắc không sao", next: "bad_run" },
              { label: "Tạm dừng luồng và chuyển sang danh sách nhận cố định do bạn duyệt", next: "s2" },
            ],
          },
          bad_run: {
            text: "Bản tin nội bộ có đoạn bàn về giá với một khách. Bốn khách đọc được, một người gọi cho giám đốc, và bạn phải viết thư xin lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đã có danh sách 12 người cố định. Bây giờ bạn cần quyết thêm cách xử lý khi sau này có người ngoài công ty vào danh sách.",
            choices: [
              { label: "Thêm bước duyệt và ngưỡng số người nhận; vượt ngưỡng thì dừng chờ duyệt", next: "good" },
              { label: "Không thêm gì vì danh sách đã cố định nên chắc chắn an toàn mãi mãi", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Ba tháng sau có người xin thêm đối tác vào danh sách và bạn đồng ý. Không có bước duyệt, bản tin nội bộ đi thẳng tới họ trước khi ai kịp nghĩ tới chuyện bảo mật.",
            ending: "bad",
          },
          good: {
            text: "Lần tới khi ai đó muốn thêm người ngoài, luồng dừng lại chờ bạn xem. Bạn chỉ cần một phút để quyết, và không thư nào đi nhầm.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi ra người nhận lấy từ đâu và ai sửa được nơi đó.",
          "Bước 2 - Chuyển sang danh sách nhận cố định chỉ bạn sửa.",
          "Bước 3 - Thêm bước duyệt và ngưỡng số người nhận tối đa.",
          "Bước 4 - Chạy thử gửi cho chính bạn, rồi xem nhật ký lần chạy thật đầu tiên.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thư đi rồi không kéo lại được, nên lớp chặn luôn đứng trước bước gửi.",
          "Bài sau: dữ liệu nào không bao giờ dán vào luồng, và thay bằng gì.",
        ],
      },
    ],
  },
  {
    id: 2437,
    slug: "khong-de-mat-khau-the-to-truoc-cong-cu",
    title: "Chặng 51, Bài 18: Không đưa mật khẩu và thẻ vào công cụ tự động: thay bằng gì",
    subtitle: "Mật khẩu, số thẻ và giấy tờ không nằm trong luồng; quyền truy cập đúng mới là thứ bạn xin.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi dựng luồng, cách nhanh nhất để nó chạy là dán mật khẩu hoặc số thẻ vào một ô. Cách nhanh đó để lại thông tin nhạy cảm ở nhiều nơi bạn không kiểm soát nổi. Bạn sẽ học phân loại dữ liệu nào tuyệt đối không dán, và cách xin đúng quyền truy cập thay vì chia sẻ chìa khoá.",
    openingQuestion:
      "Luồng của bạn cần đọc một bảng tính của phòng kế toán. Đồng nghiệp đề nghị đưa luôn mật khẩu tài khoản của chị để bạn dán vào công cụ. Bạn nên làm gì?",
    openingOptions: [
      "Nhờ phòng kế toán hoặc IT cấp quyền xem riêng cho luồng, không dùng mật khẩu của ai",
      "Dán mật khẩu của chị vào công cụ vì chị đã đồng ý và việc chỉ làm một lần",
      "Lưu mật khẩu trong một ô văn bản của luồng để lần sau đỡ phải hỏi lại",
      "Dùng tài khoản của chính bạn nhưng đổi mật khẩu sang dạng dễ nhớ hơn",
    ],
    correctOption: 0,
    explanation:
      "Quyền xem riêng gắn với luồng, thu hồi được bất cứ lúc nào, và không ai phải tiết lộ mật khẩu. Mật khẩu của chị dán vào công cụ khiến mọi người có quyền sửa luồng đều có thể dùng tài khoản của chị, dù chị đã đồng ý. Lưu mật khẩu trong ô văn bản thì nó nằm lại ở nơi ai cũng nhìn được. Đổi mật khẩu sang dạng dễ nhớ làm tài khoản yếu đi và không giải quyết chuyện quyền truy cập.",
    diagram: [
      { label: "Phân loại dữ liệu: loại nào tuyệt đối không dán", arrow: true },
      { label: "Xin quyền truy cập riêng cho luồng", arrow: true },
      { label: "Chỉ xin quyền đủ dùng cho việc cần làm", arrow: true },
      { label: "Ghi lại ai cấp, cấp gì và thu hồi khi nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự cần luồng đọc danh sách nghỉ phép. Thay vì dùng mật khẩu của trưởng phòng, chị nhờ IT cấp một quyền chỉ đọc cho đúng một bảng. Khi chị chuyển sang phòng khác, IT thu hồi quyền trong một thao tác mà tài khoản của trưởng phòng không hề bị ảnh hưởng.",
    },
    quiz: [
      {
        question: "Loại dữ liệu nào tuyệt đối không nên dán vào ô nhập của công cụ tự động?",
        options: [
          "Mật khẩu, số thẻ thanh toán và số giấy tờ tuỳ thân",
          "Tên khách và số hoá đơn đã được công ty cho phép dùng",
          "Mẫu thư có các chỗ trống thay cho tên và số tiền",
          "Tiêu đề và ngày đã được công bố rộng rãi trên trang của công ty",
        ],
        correct: 0,
        explanation:
          "Mật khẩu, số thẻ và giấy tờ tuỳ thân cho phép người có nó hành động thay bạn hoặc thay người khác. Dữ liệu công ty cho phép dùng, mẫu thư có chỗ trống và thông tin đã công bố đều có thể đi vào luồng theo quy định của công ty.",
      },
      {
        question: "Luồng cần đọc một bảng của đồng nghiệp. Cách nào đúng?",
        options: [
          "Nhờ chủ bảng chia sẻ quyền xem cho tài khoản dùng cho luồng",
          "Xin mật khẩu của chủ bảng rồi ghi nhớ trong luồng cho tiện",
          "Sao chép toàn bộ bảng sang nơi của mình rồi bỏ qua việc xin quyền",
          "Nhờ đồng nghiệp đăng nhập giúp mỗi lần luồng cần chạy",
        ],
        correct: 0,
        explanation:
          "Chia sẻ quyền xem là cách chủ bảng vẫn kiểm soát và thu hồi được. Mật khẩu ghi nhớ trong luồng thì ai sửa luồng đều dùng được. Sao chép bảng ra ngoài tạo thêm một bản dữ liệu không ai quản. Đăng nhập giúp mỗi lần thì luồng không còn tự chạy.",
      },
      {
        question: "Nguyên tắc 'chỉ xin quyền đủ dùng' nghĩa là gì?",
        options: [
          "Luồng chỉ cần đọc thì xin quyền đọc, không xin quyền sửa hay xoá",
          "Luồng nên xin quyền cao nhất để khỏi phải xin lại khi có thay đổi",
          "Luồng chia sẻ chung một tài khoản với cả nhóm để ít quyền phải quản",
          "Luồng xin quyền cho mọi bảng trong thư mục, phòng khi cần dùng thêm",
        ],
        correct: 0,
        explanation:
          "Quyền hẹp nghĩa là nếu luồng hỏng hoặc bị lạm dụng thì thiệt hại cũng hẹp. Xin quyền cao nhất, chia chung tài khoản hay xin cả thư mục đều mở rộng chỗ có thể sai, và khiến việc thu hồi phức tạp hơn nhiều.",
      },
      {
        question: "Bạn lỡ dán mật khẩu vào một luồng rồi mới nhận ra. Việc đầu tiên nên làm?",
        options: [
          "Đổi mật khẩu đó ngay rồi báo IT hoặc người phụ trách",
          "Xoá ô chứa mật khẩu rồi coi như chưa có chuyện gì xảy ra",
          "Đợi đến cuối tuần rồi đổi để không làm gián đoạn công việc",
          "Nhờ AI kiểm xem luồng có bị lộ mật khẩu hay không",
        ],
        correct: 0,
        explanation:
          "Một mật khẩu đã lộ coi như không còn là bí mật, nên đổi ngay và báo người phụ trách. Xoá ô văn bản không xoá được các bản lưu hay nhật ký. Chờ tới cuối tuần để lại thời gian cho người khác dùng nó, và AI không có cách kiểm chỗ nào mật khẩu đã đi qua.",
      },
      {
        question: "Công cụ thanh toán cần thẻ của công ty. Thay vì đưa số thẻ vào luồng, nên làm gì?",
        options: [
          "Nhờ kế toán trưởng hoặc IT thiết lập kết nối do họ quản lý",
          "Chụp ảnh thẻ gửi vào ô mô tả để luồng tự đọc khi cần dùng",
          "Dùng thẻ cá nhân của bạn cho nhanh rồi xin hoàn lại sau",
          "Chia số thẻ thành hai phần và dán ở hai bước khác nhau",
        ],
        correct: 0,
        explanation:
          "Thẻ thuộc về công ty nên người quản lý thẻ mới được quyết việc nối nó. Ảnh thẻ trong ô mô tả vẫn là số thẻ, dùng thẻ cá nhân đẩy rủi ro sang bạn và vi phạm quy trình chi tiêu, còn cắt đôi số thẻ chỉ làm rắc rối hơn mà vẫn để lộ.",
      },
    ],
    keyTakeaways: [
      "Mật khẩu, số thẻ, số giấy tờ tuỳ thân không bao giờ nằm trong ô nhập của luồng.",
      "Xin quyền truy cập riêng cho luồng, không mượn tài khoản của người khác.",
      "Chỉ xin quyền đủ dùng: chỉ đọc nếu luồng chỉ cần đọc.",
      "Lỡ dán mật khẩu thì đổi ngay và báo người phụ trách.",
      "Ghi lại ai cấp quyền, cấp gì, và khi nào thu hồi.",
    ],
    practicePrompt: {
      question:
        "Chị Mai cần luồng ghi dữ liệu vào một bảng của phòng bán hàng. Chị chỉ cần thêm dòng mới, không cần xem hay xoá dòng cũ. Quyền nào phù hợp?",
      options: [
        "Xin quyền chỉ thêm dòng vào đúng bảng đó",
        "Xin quyền quản trị cả thư mục của phòng để sau này khỏi xin lại",
        "Xin mật khẩu trưởng phòng để luồng làm được mọi việc trưởng phòng làm",
        "Xin quyền xoá dòng cho những lúc cần dọn dữ liệu trùng",
      ],
      correct: 0,
      explanation:
        "Việc luồng cần làm chỉ là thêm dòng, nên quyền hẹp nhất đủ dùng là thêm dòng vào đúng bảng. Quản trị cả thư mục, mật khẩu trưởng phòng và quyền xoá đều rộng hơn nhiều so với việc cần làm.",
    },
    summary: {
      keyIdea: "Bạn không xin chìa khoá của người khác; bạn xin một cánh cửa nhỏ làm riêng cho luồng.",
      formula: "Đúng người cấp + đúng phạm vi hẹp + ghi lại và thu hồi được = luồng an toàn.",
      commonMistake: "Dán mật khẩu của đồng nghiệp vào luồng vì 'chỉ một lần thôi' rồi quên không gỡ.",
      action: "Liệt kê những thứ luồng của bạn đang dùng để truy cập và kiểm xem có mật khẩu nào nằm trong ô nhập không.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một luồng hoặc ý tưởng luồng của bạn. Viết ra nó cần đọc hoặc ghi ở những đâu, và với mỗi nơi, quyền nhỏ nhất cần có là gì. Soạn một tin nhắn ngắn gửi người quản lý nơi đó (IT hoặc chủ dữ liệu) để xin đúng quyền ấy, không đề cập tới mật khẩu của ai.",
      secondary: "Kiểm nhanh xem có ô nhập nào trong luồng hiện tại đang chứa mật khẩu hay số thẻ không.",
    },
    sections: [
      {
        type: "lead",
        text: "Luồng chạy chỉ khi nó vào được nơi cần vào. Cám dỗ lớn nhất là đưa luôn mật khẩu cho nhanh. Bài này dạy bạn phân biệt cái gì không bao giờ dán, và xin gì thay vào đó.",
      },
      {
        type: "feynman",
        title: "Quyền truy cập đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới chìa khoá nhà. Bạn không đưa chìa khoá chính cho người giúp việc, bạn đưa một thẻ chỉ mở được cửa bếp vào giờ làm. Luồng tự động cũng cần thẻ riêng như vậy: hẹp, ghi lại được, và thu hồi được.",
        columns: ["Thành phần", "Chìa khoá nhà", "Luồng tự động"],
        rows: [
          ["Chìa khoá chính", "Mở được mọi cửa", "Mật khẩu của một người"],
          ["Thẻ riêng", "Chỉ mở cửa bếp", "Quyền riêng cho luồng, đúng một bảng"],
          ["Ai cấp", "Chủ nhà", "Chủ dữ liệu hoặc IT"],
          ["Khi hết việc", "Thu lại thẻ", "Thu hồi quyền"],
        ],
        oneLiner: "Đừng xin chìa khoá chính; xin một tấm thẻ chỉ mở đúng cánh cửa luồng cần.",
      },
      { type: "heading", text: "Bốn loại dữ liệu không bao giờ dán vào luồng" },
      {
        type: "list",
        items: [
          "Mật khẩu và mã xác thực của bất kỳ ai, kể cả của chính bạn.",
          "Số thẻ thanh toán, số tài khoản ngân hàng.",
          "Số giấy tờ tuỳ thân và ảnh chụp giấy tờ.",
          "Khoá kết nối hay mã truy cập của hệ thống công ty, trừ khi IT bảo bạn dùng và chỉ dùng theo cách họ chỉ.",
        ],
      },
      {
        type: "paragraph",
        text: "Lý do không nằm ở chuyện công cụ tự động tệ. Lý do là luồng được nhiều người xem, sao chép và lưu lịch sử. Một mật khẩu dán vào đó sẽ đi theo luồng tới bất cứ nơi nào luồng đi.",
      },
      {
        type: "flow",
        title: "Xin quyền thay vì đưa mật khẩu",
        steps: [
          { label: "Ghi ra luồng cần đọc hay ghi ở đâu", detail: "Liệt kê từng nơi: bảng nào, thư mục nào, hộp thư nào. Càng cụ thể càng dễ xin." },
          { label: "Với mỗi nơi, chọn quyền nhỏ nhất", detail: "Chỉ đọc, chỉ thêm dòng, chỉ gửi từ một hòm thư. Không xin quyền sửa hay xoá nếu không dùng." },
          { label: "Gửi đề nghị cho người quản lý nơi đó", detail: "Người quản lý là chủ dữ liệu hoặc IT. Nói rõ luồng làm gì, ai dùng, và khi nào xong việc." },
          { label: "Ghi lại và hẹn ngày thu hồi", detail: "Ghi ai cấp, cấp gì, ngày cấp và ngày rà lại. Hết việc thì nhờ thu hồi." },
        ],
      },
      {
        type: "callout",
        label: "Nói 'đồng ý' không làm mật khẩu an toàn",
        text: "Đồng nghiệp đồng ý cho bạn dùng mật khẩu của họ vẫn không biến việc đó thành hợp lệ. Mọi thao tác luồng làm sẽ mang tên họ, và nếu có sự cố, họ là người phải giải thích. Hỏi IT hoặc người quản lý cách làm đúng.",
      },
      {
        type: "scenario",
        title: "Luồng cần đọc bảng của phòng kế toán",
        start: "s1",
        nodes: {
          s1: {
            text: "Luồng báo cáo tuần của bạn cần đọc một bảng của phòng kế toán. Chị trưởng phòng bận, nhắn: 'Mật khẩu của chị đây, em dán vào cho nhanh.'",
            choices: [
              { label: "Dán mật khẩu vào luồng vì chị đã chủ động đưa", next: "bad_paste" },
              { label: "Cảm ơn chị và nhờ chị hoặc IT cấp một quyền xem riêng cho luồng", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Mật khẩu nằm lại trong luồng. Một tháng sau luồng được chia sẻ cho cả nhóm, và hai người không liên quan vào được tài khoản của chị. Chị phải đổi mật khẩu và trả lời câu hỏi của IT.",
            ending: "bad",
          },
          s2: {
            text: "IT hỏi luồng cần đọc hay cần sửa bảng, và đọc những phần nào.",
            choices: [
              { label: "Xin quyền xem đúng bảng cần dùng, không xin quyền sửa", next: "good" },
              { label: "Xin quyền sửa toàn bộ thư mục kế toán cho chắc", next: "bad_wide" },
            ],
          },
          bad_wide: {
            text: "IT từ chối vì quyền rộng quá mức, và đề nghị của bạn bị trả lại. Luồng chậm hơn một tuần trong khi bạn chờ làm lại đề nghị.",
            ending: "bad",
          },
          good: {
            text: "IT cấp quyền xem cho đúng bảng. Không ai phải đưa mật khẩu, và khi báo cáo tuần không còn cần, IT thu hồi quyền trong một thao tác.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Xin quyền riêng, hẹp",
          text: "Mất vài ngày chờ duyệt, nhưng thu hồi được, không ảnh hưởng người khác, và người quản lý biết luồng của bạn dùng gì.",
        },
        right: {
          label: "Dán mật khẩu cho nhanh",
          text: "Chạy được ngay hôm nay, nhưng mật khẩu nằm lại trong luồng và theo luồng đến mọi người xem. Một lần sự cố là cả tài khoản bị lộ.",
        },
      },
      {
        type: "closing",
        lines: [
          "Đừng xin chìa khoá chính; xin một tấm thẻ hẹp, ghi lại và thu hồi được.",
          "Bài sau: khi công cụ đổi cách hoạt động và luồng của bạn hỏng.",
        ],
      },
    ],
  },
  {
    id: 2438,
    slug: "khi-cong-cu-doi-cach-hoat-dong-luong-hong",
    title: "Chặng 51, Bài 19: Khi công cụ đổi cách hoạt động, luồng của bạn hỏng: ghi chú để sửa nhanh",
    subtitle: "Một trang 'luồng này làm gì' giúp bất kỳ ai, kể cả bạn sáu tháng sau, sửa được luồng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai luồng báo lỗi dù bạn không đụng vào gì. Công cụ vừa đổi cách hoạt động ở đâu đó. Nếu chỉ bạn nhớ luồng làm gì và bạn đang nghỉ phép, không ai sửa được. Một trang ghi chú ngắn biến một luồng bí ẩn thành thứ ai cũng sửa được trong vài chục phút.",
    openingQuestion:
      "Luồng của bạn hỏng sau khi công cụ thông báo cập nhật. Bạn đang đi công tác, đồng nghiệp phải sửa thay nhưng không biết luồng làm gì. Điều gì đáng lẽ đã có sẵn?",
    openingOptions: [
      "Một trang ghi chú ngắn nêu luồng làm gì, lấy dữ liệu ở đâu, ai phụ trách",
      "Một bản sao chép toàn bộ luồng cất trong thư mục riêng của bạn",
      "Số điện thoại của bạn để đồng nghiệp gọi ngay khi có sự cố",
      "Một đoạn video quay cảnh bạn dựng luồng từ lần đầu tiên",
    ],
    correctOption: 0,
    explanation:
      "Trang ghi chú cho người sửa biết luồng bắt đầu khi nào, dữ liệu đi đâu và ai quyết khi cần đổi. Bản sao luồng giúp khôi phục nhưng không nói vì sao luồng làm vậy. Số điện thoại phụ thuộc vào việc bạn bắt máy được. Video dài ít ai xem lại, khó tìm đúng đoạn cần và nhanh lỗi thời khi luồng đổi.",
    diagram: [
      { label: "Luồng làm gì và để ai, để việc gì", arrow: true },
      { label: "Kích hoạt, các bước, dữ liệu đi qua", arrow: true },
      { label: "Khi lỗi thì xem ở đâu và ai quyết", arrow: true },
      { label: "Ngày kiểm lại gần nhất và người kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên hành chính có luồng nhắc hạn hợp đồng hằng tuần. Sau khi chị chuyển phòng, luồng báo lỗi và không ai hiểu nó lấy hạn từ đâu. Đồng nghiệp mất hai ngày đoán. Ở công ty khác, một luồng tương tự có trang ghi chú một trang, và người thay thế tìm ra bước hỏng trong chưa đầy một giờ.",
    },
    quiz: [
      {
        question: "Trang ghi chú cho một luồng tự động nên có mục nào đầu tiên?",
        options: [
          "Luồng làm gì, cho ai, và bắt đầu khi nào",
          "Danh sách mọi nút bấm trong màn hình thiết kế luồng",
          "Tên các công cụ khác cùng loại để so sánh giá cả",
          "Lời hứa rằng luồng sẽ không bao giờ hỏng trong năm nay",
        ],
        correct: 0,
        explanation:
          "Người sửa cần biết mục đích và lúc khởi động trước tiên. Danh sách nút bấm lỗi thời rất nhanh khi công cụ đổi. So sánh giá không giúp sửa luồng, và lời hứa không hỏng là điều không ai bảo đảm được.",
      },
      {
        question: "Vì sao ghi 'ngày kiểm lại gần nhất' trong trang ghi chú lại hữu ích?",
        options: [
          "Vì người đọc biết thông tin có thể đã cũ bao lâu rồi",
          "Vì công cụ tự động gia hạn luồng mỗi lần bạn đổi ngày đó",
          "Vì ngày ghi trên trang quyết định luồng chạy vào lúc nào",
          "Vì ngày kiểm càng gần nhất thì luồng càng ít khi bị lỗi",
        ],
        correct: 0,
        explanation:
          "Ngày kiểm cho biết bao lâu rồi chưa ai đối chiếu ghi chú với luồng thật. Công cụ không gia hạn luồng theo ngày ghi chú, ngày đó không điều khiển lúc chạy, và kiểm gần đây không ngăn được công cụ đổi cách hoạt động sau đó.",
      },
      {
        question: "Công cụ tự động thông báo có thay đổi. Việc đúng nhất để kiểm luồng của bạn còn chạy không?",
        options: [
          "Đọc thông báo thay đổi trên trang chính thức rồi chạy thử luồng bằng dữ liệu giả",
          "Tin lời đồn trong nhóm chat rồi tắt luồng đi để phòng xa",
          "Chờ tới khi khách than phiền thì mới chạy kiểm tra luồng",
          "Sao chép luồng sang công cụ khác ngay hôm đó mà chưa đọc gì",
        ],
        correct: 0,
        explanation:
          "Tài liệu chính thức cho biết thay đổi gì, còn chạy thử bằng dữ liệu giả cho biết luồng có bị ảnh hưởng hay không, cả hai đều không làm ai bị gửi nhầm. Tin đồn có thể sai, chờ khách phản ánh là để lỗi tới người thật, và chuyển sang công cụ khác chưa đọc gì là tốn công mà vẫn không hiểu vấn đề.",
      },
      {
        question: "Trong trang ghi chú, mục 'khi lỗi thì làm gì' nên viết thế nào?",
        options: [
          "Xem nhật ký ở đâu, ai quyết dừng luồng, và báo cho ai",
          "Một câu chung chung rằng hãy sửa luồng thật nhanh khi lỗi",
          "Chỉ ghi tên người tạo luồng và để họ xử lý mọi lỗi sau này",
          "Để trống, vì mọi lỗi đều hiện ra rõ trong chính công cụ",
        ],
        correct: 0,
        explanation:
          "Người xử lý cần ba thứ: xem nhật ký ở đâu, ai có quyền dừng, ai cần được báo. Câu chung chung không chỉ ra việc gì, chỉ ghi tên người tạo thì không giúp được khi họ vắng mặt, và để trống thì lỗi lần sau lại thành điều bí ẩn.",
      },
      {
        question: "Ghi chú có nên chứa mật khẩu hay khoá truy cập của luồng không?",
        options: [
          "Không, chỉ ghi quyền nào được cấp và ai cấp, còn mật khẩu thì không",
          "Có, để người sửa có thể đăng nhập ngay khi cần",
          "Có, nhưng viết ngược từng chữ để khỏi bị đọc ra ngay",
          "Có, vì ghi chú chỉ những người trong nhóm mới mở được",
        ],
        correct: 0,
        explanation:
          "Ghi chú được chia sẻ nhiều nơi nên không nơi nào an toàn để chứa mật khẩu. Viết ngược chỉ là che mắt, không phải bảo mật. Nhóm có thể đổi người, và quyền truy cập đã có quy trình xin riêng như bài trước.",
      },
    ],
    keyTakeaways: [
      "Trang ghi chú một trang: luồng làm gì, kích hoạt, các bước, dữ liệu, người phụ trách.",
      "Ghi khi lỗi thì xem nhật ký ở đâu, ai quyết dừng, báo cho ai.",
      "Ghi ngày kiểm lại gần nhất để người đọc biết ghi chú cũ tới đâu.",
      "Khi công cụ thông báo thay đổi, đọc tài liệu chính thức rồi chạy thử bằng dữ liệu giả.",
      "Không ghi mật khẩu hay khoá truy cập vào trang ghi chú.",
    ],
    practicePrompt: {
      question:
        "Anh Bình có luồng nhắc lịch họp mỗi sáng thứ Hai. Anh sắp nghỉ phép hai tuần. Anh nên để lại gì để đồng nghiệp sửa được nếu luồng hỏng?",
      options: [
        "Một trang ghi chú nêu luồng làm gì, lấy lịch ở đâu, lỗi thì xem ở đâu",
        "Một tin nhắn rằng luồng đang chạy ổn và chắc không có gì xảy ra trong hai tuần anh vắng mặt",
        "Mật khẩu tài khoản của anh để đồng nghiệp tự mở và xem luồng",
        "Một bản chụp màn hình luồng, không cần thêm lời giải thích nào",
      ],
      correct: 0,
      explanation:
        "Trang ghi chú cho đồng nghiệp đủ thông tin để hiểu và sửa. Tin nhắn 'chạy ổn' không giúp gì khi luồng hỏng, mật khẩu của anh là điều không được đưa, và ảnh chụp màn hình không cho biết luồng để làm gì hay lỗi thì xem ở đâu.",
    },
    summary: {
      keyIdea: "Công cụ sẽ đổi; một trang ghi chú là thứ làm cho việc sửa luồng nhanh thay vì đoán mò.",
      formula: "Luồng làm gì + kích hoạt, bước, dữ liệu + khi lỗi thì làm gì + ngày kiểm = luồng ai cũng sửa được.",
      commonMistake: "Nghĩ rằng mình sẽ nhớ luồng làm gì, rồi sáu tháng sau chính mình cũng không hiểu.",
      action: "Viết một trang ghi chú cho luồng bạn đang dùng hoặc định dùng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một luồng (hoặc thiết kế luồng ở bài trước). Viết một trang ghi chú gồm: luồng làm gì, kích hoạt khi nào, ba bước chính, dữ liệu lấy từ đâu, khi lỗi thì xem nhật ký ở đâu và báo ai, ngày kiểm gần nhất. Nhờ một đồng nghiệp đọc và nói họ có hiểu đủ để sửa không.",
      secondary: "Ghi thêm một dòng: nếu công cụ thông báo thay đổi, bạn sẽ đọc ở trang chính thức nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Công cụ tự động đổi cách hoạt động mà không xin phép bạn. Luồng hôm qua chạy, hôm nay báo lỗi. Điều cứu bạn không phải phép màu mà là một trang giấy viết từ trước: luồng này làm gì và sửa ở đâu.",
      },
      {
        type: "feynman",
        title: "Ghi chú luồng đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới công thức nấu ăn dán trên cửa tủ lạnh. Người lạ vào bếp vẫn nấu được món của bạn vì công thức ghi rõ nguyên liệu, các bước và lúc nào món chín. Trang ghi chú luồng cũng là công thức đó.",
        columns: ["Thành phần", "Công thức dán tủ lạnh", "Trang ghi chú luồng"],
        rows: [
          ["Món gì", "Tên món và cho mấy người ăn", "Luồng làm gì, cho ai"],
          ["Nguyên liệu", "Danh sách nguyên liệu", "Dữ liệu lấy từ đâu"],
          ["Các bước", "Bước 1, 2, 3", "Kích hoạt, điều kiện, hành động"],
          ["Khi hỏng", "Nếu nước cạn thì thêm nước", "Nhật ký ở đâu, ai quyết dừng, báo ai"],
        ],
        oneLiner: "Ghi lại luồng như một công thức: ai đọc cũng làm lại hoặc sửa được.",
      },
      { type: "heading", text: "Vì sao luồng hỏng dù bạn không đụng vào" },
      {
        type: "paragraph",
        text: "Luồng của bạn dựa vào những thứ bạn không sở hữu: công cụ, biểu mẫu, bảng, tài khoản. Một thứ trong đó đổi cách hoạt động là luồng có thể hỏng. Bạn không ngăn được điều đó, nhưng chuẩn bị được để sửa nhanh.",
      },
      {
        type: "flow",
        title: "Từ thông báo thay đổi tới luồng chạy lại",
        steps: [
          { label: "Đọc thông báo chính thức", detail: "Đọc trên trang hoặc thư thông báo của chính công cụ để biết cái gì đổi. Không dựa vào lời đồn." },
          { label: "Mở trang ghi chú của luồng", detail: "Xem luồng dùng phần nào của công cụ, rồi đối chiếu với phần vừa đổi." },
          { label: "Chạy thử bằng dữ liệu giả", detail: "Đặt người nhận là bạn, dùng dòng dữ liệu giả, xem bước nào thất bại trong nhật ký." },
          { label: "Sửa và cập nhật ghi chú", detail: "Sửa bước hỏng, chạy thử lại, rồi ghi ngày kiểm mới và điều đã đổi vào trang ghi chú." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn trang ghi chú cho luồng",
        task: "Bạn có luồng gửi email nhắc hạn hợp đồng mỗi thứ Hai. Lắp prompt để AI soạn trang ghi chú một trang cho người khác sửa.",
        parts: [
          {
            id: "what",
            label: "Thông tin bạn đưa",
            options: [
              { text: "Viết giúp tôi ghi chú cho luồng nhắc hợp đồng.", feedback: "AI không biết luồng làm gì nên tự bịa các bước và nguồn dữ liệu, ghi chú nghe hợp lý nhưng sai." },
              { text: "Đây là mô tả của tôi: kích hoạt thứ Hai 8 giờ, đọc cột Hạn của bảng Hợp đồng, gửi email cho người phụ trách. (kèm ghi chú thật của bạn)", good: true, feedback: "Có dữ kiện thật, AI chỉ phải sắp xếp chứ không phải đoán luồng làm gì." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thật đầy đủ và chi tiết.", feedback: "Không có khuôn dạng nên ra một bài dài, người sửa lúc gấp không tìm ra chỗ cần xem." },
              { text: "Một trang với các mục: luồng làm gì, kích hoạt, bước, dữ liệu, khi lỗi thì làm gì, ngày kiểm gần nhất.", good: true, feedback: "Khuôn dạng cố định giúp người sửa tìm đúng mục trong vài giây." },
            ],
          },
          {
            id: "gap",
            label: "Chỗ chưa biết",
            options: [
              { text: "Nếu chỗ nào chưa rõ, cứ điền cho hợp lý để trang ghi chú trông đầy đủ.", feedback: "AI sẽ điền hợp lý thay vì đúng, và người sửa tin vào những thứ không có thật." },
              { text: "Chỗ nào tôi chưa cung cấp, ghi [cần bổ sung] và không tự điền.", good: true, feedback: "Chỗ trống đánh dấu nói cho bạn biết cần đi hỏi ai; chữ bịa thì nằm im tới khi có sự cố." },
            ],
          },
        ],
        responses: [
          {
            requires: ["what", "format", "gap"],
            text: "Luồng làm gì: mỗi thứ Hai lúc 8 giờ gửi email nhắc người phụ trách hợp đồng có hạn sắp tới.\nKích hoạt: theo giờ, thứ Hai 8:00.\nDữ liệu: cột Hạn của bảng Hợp đồng.\nBước: đọc bảng, lọc hợp đồng gần hạn, gửi email.\nKhi lỗi thì làm gì: [cần bổ sung - xem nhật ký ở đâu, báo cho ai].\nNgày kiểm gần nhất: [cần bổ sung].",
          },
          {
            requires: ["what"],
            text: "Luồng làm gì: nhắc hợp đồng mỗi thứ Hai.\nBước 1: đọc bảng. Bước 2: gửi email.\nKhi lỗi thì làm gì: gọi cho quản trị viên hệ thống theo số có trong danh bạ công ty.\n\n(Nội dung đúng nhưng không có khuôn dạng, và AI tự bịa người quản trị và số điện thoại mà bạn chưa hề nhắc tới.)",
          },
          {
            text: "Luồng nhắc hợp đồng là một luồng tự động quan trọng, chạy mỗi ngày lúc nửa đêm, đọc dữ liệu từ hệ thống quản lý hợp đồng và tự động gia hạn nếu cần...\n\n(Dài, không có khuôn dạng, và AI bịa cả giờ chạy lẫn việc tự gia hạn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Ghi chú cũ còn tệ hơn không có ghi chú",
        text: "Một trang ghi chú nói luồng lấy dữ liệu từ bảng A trong khi nó đã chuyển sang bảng B sẽ dẫn người sửa đi sai hướng. Mỗi khi sửa luồng, cập nhật ghi chú và đổi ngày kiểm gần nhất.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai, luồng báo lỗi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đang nghỉ phép. Đồng nghiệp nhắn: luồng nhắc hợp đồng báo lỗi sau khi công cụ có cập nhật. Chị chưa hề đụng vào luồng này bao giờ.",
            choices: [
              { label: "Nhắn chị cứ thử tắt luồng rồi dựng lại từ đầu cho nhanh", next: "bad_rebuild" },
              { label: "Gửi chị trang ghi chú và nhờ đọc thông báo thay đổi chính thức của công cụ", next: "s2" },
            ],
          },
          bad_rebuild: {
            text: "Chị dựng lại luồng mà không biết nguồn dữ liệu, chọn nhầm bảng cũ và khách hàng nhận lời nhắc hạn đã qua. Phải mất cả buổi mới phát hiện ra.",
            ending: "bad",
          },
          s2: {
            text: "Trang ghi chú chỉ ra luồng đọc cột Hạn của bảng Hợp đồng và gửi email. Chị đối chiếu với thông báo thay đổi.",
            choices: [
              { label: "Chạy thử với dòng dữ liệu giả, xem bước nào thất bại trong nhật ký rồi mới sửa", next: "good" },
              { label: "Sửa ngay một bước theo phỏng đoán rồi bật luồng thật luôn", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Phỏng đoán sai bước hỏng, luồng gửi email tới cả danh sách với ngày sai. Bạn phải quay lại từ xa để gửi đính chính.",
            ending: "bad",
          },
          good: {
            text: "Nhật ký cho thấy bước đọc bảng bị đổi tên cột. Chị sửa đúng chỗ đó, thử lại bằng dữ liệu giả, rồi cập nhật ngày kiểm gần nhất vào trang ghi chú.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết một trang: luồng làm gì, cho ai, kích hoạt khi nào.",
          "Bước 2 - Ghi các bước và dữ liệu lấy từ đâu.",
          "Bước 3 - Ghi khi lỗi thì xem nhật ký ở đâu, ai quyết dừng, báo ai.",
          "Bước 4 - Ghi ngày kiểm gần nhất; cập nhật mỗi khi sửa luồng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Công cụ sẽ đổi; trang ghi chú giúp việc sửa thành việc một giờ thay vì hai ngày.",
          "Bài sau: tổng kết, thiết kế và ghi lại luồng tự động đầu tiên của bạn.",
        ],
      },
    ],
  },
  {
    id: 2439,
    slug: "capstone-luong-tu-dong-dau-tien-cua-ban",
    title: "Chặng 51, Bài 20: Tổng kết: thiết kế, thử và ghi lại luồng tự động đầu tiên của bạn",
    subtitle: "Một việc lặp thật, ba mảnh kích hoạt - điều kiện - hành động, một lần thử và một trang hướng dẫn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau mười chín bài bạn đã biết từng mảnh. Bài cuối ghép chúng lại: chọn một việc thật, vẽ luồng, thử bằng dữ liệu giả và viết hướng dẫn một trang. Làm xong bạn có thứ dùng được, không chỉ là hiểu biết.",
    openingQuestion:
      "Bạn sắp dựng luồng tự động đầu tiên cho một việc lặp hằng tuần. Thứ tự nào hợp lý nhất?",
    openingOptions: [
      "Chọn việc, vẽ kích hoạt - điều kiện - hành động, thử bằng dữ liệu giả, rồi mới bật",
      "Dựng luôn trong công cụ, bật ngay, và sửa dần khi có lỗi xảy ra",
      "Bật trước cho khách thật rồi vừa chạy vừa viết hướng dẫn sau",
      "Dựng cả năm việc cùng lúc để công cụ tự chọn cái nào chạy tốt nhất",
    ],
    correctOption: 0,
    explanation:
      "Vẽ trước trên giấy làm bạn thấy thiếu nhánh hay thiếu dữ liệu khi sửa còn rất rẻ, và chạy thử bằng dữ liệu giả đảm bảo chưa ai bị gửi nhầm. Dựng và bật ngay biến khách hàng thành người thử nghiệm. Viết hướng dẫn sau khi bật thường không bao giờ được viết. Dựng năm việc cùng lúc làm bạn không kiểm nổi việc nào cho cẩn thận.",
    diagram: [
      { label: "Chọn một việc lặp thật, nhỏ và ít rủi ro", arrow: true },
      { label: "Vẽ kích hoạt, điều kiện, hành động", arrow: true },
      { label: "Thử bằng dữ liệu giả: đúng, thiếu, lạ", arrow: true },
      { label: "Viết hướng dẫn một trang rồi bật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên bán hàng chọn việc gửi lời cảm ơn cho khách điền biểu mẫu. Chị vẽ luồng ba bước trên giấy, chạy thử bằng ba dòng giả (một đầy đủ, một thiếu email, một tên có dấu lạ), viết trang hướng dẫn rồi mới bật. Tuần đầu chị xem nhật ký, thấy luồng chạy đúng và giữ lại trang hướng dẫn cho đồng nghiệp.",
    },
    quiz: [
      {
        question: "Nên chọn việc lặp nào làm luồng tự động đầu tiên?",
        options: [
          "Việc lặp thường xuyên, các bước rõ và ít rủi ro nếu sai",
          "Việc phức tạp nhất vì học được nhiều nhất từ nó",
          "Việc liên quan tới thanh toán vì có giá trị lớn nhất",
          "Việc mà bạn chưa chắc các bước nhưng hy vọng công cụ tự lo",
        ],
        correct: 0,
        explanation:
          "Việc lặp rõ ràng và ít rủi ro cho bạn chỗ thử mà không ai chịu thiệt. Việc phức tạp và việc thanh toán là bước sau khi bạn đã quen, còn việc bạn chưa rõ các bước thì luồng không thể làm rõ thay bạn.",
      },
      {
        question: "Bộ dữ liệu giả tối thiểu để thử luồng gồm những dòng nào?",
        options: [
          "Một dòng đầy đủ, một dòng thiếu thông tin và một dòng kỳ lạ",
          "Ba dòng đầy đủ giống nhau để chắc chắn luồng chạy ổn",
          "Một dòng thật của khách quen để thấy kết quả thật",
          "Mười dòng thật lấy ngẫu nhiên từ danh sách khách của năm ngoái",
        ],
        correct: 0,
        explanation:
          "Dòng đầy đủ thử đường đi bình thường, dòng thiếu thử cách luồng xử lý chỗ trống, dòng kỳ lạ thử định dạng bất ngờ. Ba dòng giống nhau thử một lần ba lần, còn dữ liệu thật đẩy rủi ro lên người thật.",
      },
      {
        question: "Bạn muốn biết luồng có thể tin cậy sau tuần đầu. Điều kiện nào hợp lý nhất?",
        options: [
          "Nhật ký tuần đầu không có lần thất bại nào chưa được giải thích",
          "Không ai phàn nàn trong tuần đầu tiên nên coi như ổn",
          "Luồng đã chạy ít nhất một lần, dù không xem kết quả ra sao",
          "Công cụ hiện màu xanh ở màn hình chính suốt cả tuần",
        ],
        correct: 0,
        explanation:
          "Nhật ký cho thấy từng lần chạy, kể cả những lần lặng lẽ sai. Không ai phàn nàn có thể là vì chưa ai nhận ra, một lần chạy không phải bằng chứng, và màu xanh chỉ cho biết luồng chạy chứ không cho biết kết quả có đúng.",
      },
      {
        question: "Trang hướng dẫn một trang của luồng nên dành cho ai?",
        options: [
          "Một người chưa từng thấy luồng nhưng phải sửa nó",
          "Chính bạn, vì bạn là người duy nhất dùng luồng này",
          "Đội ngũ của công cụ, để họ hỗ trợ nếu có lỗi",
          "Khách hàng, để họ hiểu luồng gửi thư cho mình thế nào",
        ],
        correct: 0,
        explanation:
          "Người đọc hướng dẫn thường là người lạ với luồng, có khi là chính bạn sau nhiều tháng. Bạn hiện tại biết sẵn mọi thứ, đội ngũ công cụ không biết việc của bạn, còn khách hàng không cần biết cách luồng làm việc bên trong.",
      },
      {
        question: "Luồng thử xong và chạy ổn. Trước khi bật cho khách thật, bạn nên làm gì?",
        options: [
          "Kiểm lại danh sách người nhận, người duyệt và ngưỡng dừng",
          "Nhân đôi nhịp chạy để thấy kết quả nhanh hơn",
          "Xoá hết dữ liệu giả để luồng sạch sẽ hơn khi bật",
          "Bật luôn vì bước thử đã bảo đảm mọi thứ tuyệt đối",
        ],
        correct: 0,
        explanation:
          "Thử bằng dữ liệu giả chưa kiểm được danh sách người nhận thật, người duyệt và ngưỡng dừng. Nhân đôi nhịp chỉ tốn thêm lượt chạy. Xoá dữ liệu giả không làm luồng an toàn hơn, và không có bước thử nào bảo đảm tuyệt đối.",
      },
    ],
    keyTakeaways: [
      "Chọn việc lặp nhỏ, rõ các bước, ít rủi ro nếu sai.",
      "Vẽ kích hoạt - điều kiện - hành động trước khi chạm vào công cụ.",
      "Thử bằng dữ liệu giả gồm ba dòng: đúng, thiếu, lạ.",
      "Xem nhật ký tuần đầu; một luồng chạy lặng lẽ vẫn có thể sai.",
      "Viết một trang hướng dẫn cho người chưa từng thấy luồng.",
    ],
    practicePrompt: {
      question:
        "Chị Lan vẽ luồng gửi lời cảm ơn cho khách điền biểu mẫu và thử bằng ba dòng giả đều đầy đủ thông tin. Chị còn thiếu điều gì?",
      options: [
        "Một dòng thiếu thông tin và một dòng kỳ lạ để thử những trường hợp khó",
        "Thêm bảy dòng đầy đủ nữa để số dòng thử đạt mười dòng",
        "Một dòng thật của khách quen để xem kết quả trông ra sao",
        "Không thiếu gì vì luồng đã chạy đúng với cả ba dòng",
      ],
      correct: 0,
      explanation:
        "Ba dòng đầy đủ chỉ thử một loại tình huống. Lỗi hay nằm ở dữ liệu thiếu hoặc lạ. Thêm dòng đầy đủ không thêm loại kiểm tra nào, dòng thật gửi thư tới người thật, và kết luận không thiếu gì bỏ qua các trường hợp khó.",
    },
    summary: {
      keyIdea: "Luồng tốt là luồng bạn vẽ, thử và ghi lại trước khi bật, không phải luồng dựng nhanh nhất.",
      formula: "Việc lặp rõ ràng + kích hoạt, điều kiện, hành động + dữ liệu giả đúng, thiếu, lạ + trang hướng dẫn = luồng đáng tin.",
      commonMistake: "Bật luồng trước rồi mới nghĩ tới chuyện thử và ghi lại.",
      action: "Dựng luồng đầu tiên theo bốn bước trong bài này, chọn việc nhỏ nhất bạn lặp lại mỗi tuần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn lặp lại mỗi tuần. Vẽ trên giấy ba ô: kích hoạt, điều kiện, hành động. Soạn ba dòng dữ liệu giả (đúng, thiếu, lạ) và viết trước kết quả mong đợi cho từng dòng. Viết năm dòng hướng dẫn cho một người chưa từng thấy việc này.",
      secondary: "Hẹn một ngày trong tuần sau để xem nhật ký đầu tiên và ghi lại điều bạn thấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã biết kích hoạt, hành động, dữ liệu, điều kiện, lần chạy thử, nhật ký, giới hạn, quyền truy cập và ghi chú. Bài cuối ghép lại thành một luồng thật của bạn, từ giấy tới trang hướng dẫn.",
      },
      {
        type: "feynman",
        title: "Luồng tự động đầu tiên đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc bạn dặn một người mới thay mình một buổi: khi nào bắt đầu, làm bước nào, gặp trường hợp lạ thì làm gì, rồi tập dượt một lần trước khi dặn thật. Luồng tự động là lời dặn đó, viết cho máy.",
        columns: ["Thành phần", "Dặn người thay thế", "Luồng của bạn"],
        rows: [
          ["Khi nào bắt đầu", "Khi có khách tới quầy", "Kích hoạt"],
          ["Trường hợp khác nhau", "Nếu khách cần hoá đơn thì...", "Điều kiện"],
          ["Việc cần làm", "Ghi tên, in phiếu", "Hành động"],
          ["Tập dượt", "Thử trước với một khách giả", "Chạy thử bằng dữ liệu giả"],
        ],
        oneLiner: "Luồng đầu tiên là một lời dặn viết rõ: khi nào, nếu gì, làm gì, và đã tập dượt.",
      },
      { type: "heading", text: "Bốn việc, theo thứ tự" },
      {
        type: "flow",
        title: "Từ việc lặp tới luồng đáng tin",
        steps: [
          { label: "Chọn một việc lặp thật", detail: "Nhỏ, các bước rõ, sai thì ít thiệt hại. Ví dụ cảm ơn khách điền biểu mẫu, hoặc nhắc lịch nội bộ." },
          { label: "Vẽ kích hoạt, điều kiện, hành động", detail: "Trên giấy: điều gì xảy ra trước, nếu gì thì đi nhánh nào, làm gì ở cuối. Có một nhánh 'còn lại' cho trường hợp không ai nghĩ tới." },
          { label: "Thử bằng dữ liệu giả", detail: "Ba dòng: một đúng, một thiếu, một lạ. Viết trước kết quả mong đợi rồi so với kết quả thật." },
          { label: "Viết hướng dẫn một trang", detail: "Luồng làm gì, kích hoạt, các bước, dữ liệu, xem nhật ký ở đâu, báo ai khi lỗi, ngày kiểm gần nhất." },
        ],
      },
      {
        type: "callout",
        label: "Nhỏ trước, rồi mới lớn",
        text: "Luồng đầu tiên nên chỉ có ba mảnh và một người nhận là chính bạn. Khi nó chạy đúng ba tuần, bạn mới thêm người nhận, nhánh và việc mới.",
      },
      {
        type: "comparison",
        left: {
          label: "Vẽ, thử, ghi, rồi bật",
          text: "Mất thêm khoảng một buổi chiều. Bù lại bạn biết luồng làm gì, đã thấy nó xử lý dữ liệu thiếu và lạ, và người khác sửa được khi bạn vắng.",
        },
        right: {
          label: "Bật ngay cho nhanh",
          text: "Có kết quả trong vài phút, nhưng lỗi đầu tiên sẽ tới tay người thật. Không ai biết luồng làm gì khi nó hỏng, kể cả chính bạn.",
        },
      },
      {
        type: "scenario",
        title: "Luồng cảm ơn khách điền biểu mẫu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn chọn việc gửi email cảm ơn khi có khách điền biểu mẫu liên hệ. Công cụ đã sẵn sàng. Bạn đã ghi ra ba mảnh: kích hoạt là có dòng mới trong bảng biểu mẫu, điều kiện là có email, hành động là gửi thư.",
            choices: [
              { label: "Bật luôn cho khách thật, nếu có lỗi thì sửa sau", next: "bad_live" },
              { label: "Soạn ba dòng dữ liệu giả và chạy thử gửi cho chính bạn", next: "s2" },
            ],
          },
          bad_live: {
            text: "Một khách bỏ trống email nên luồng báo lỗi, và một khách khác có tên viết hoa toàn bộ nhận thư chào 'NGUYỄN VĂN AN thân mến'. Bạn sửa lại và xin lỗi từng người.",
            ending: "bad",
          },
          s2: {
            text: "Dòng đầy đủ chạy đúng. Dòng thiếu email làm luồng dừng với thông báo lỗi. Dòng có tên kỳ lạ cho ra thư chào khó đọc.",
            choices: [
              { label: "Thêm nhánh cho dòng thiếu email (báo cho bạn), chỉnh cách ghép tên, thử lại ba dòng", next: "s3" },
              { label: "Bỏ qua hai dòng lỗi vì chắc hiếm khi xảy ra với khách thật", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Hai tuần sau một khách bỏ trống email, luồng báo lỗi và không ai biết, nên khách không nhận được lời cảm ơn và nghĩ rằng biểu mẫu không gửi được.",
            ending: "bad",
          },
          s3: {
            text: "Cả ba dòng cho kết quả đúng mong đợi. Giờ bạn cần quyết thêm về việc ghi lại.",
            choices: [
              { label: "Viết trang hướng dẫn một trang, hẹn ngày xem nhật ký rồi mới bật", next: "good" },
              { label: "Bật luồng và hứa với bản thân sẽ viết hướng dẫn khi rảnh", next: "bad_doc" },
            ],
          },
          bad_doc: {
            text: "Ba tháng sau luồng hỏng khi biểu mẫu đổi. Bạn đã quên luồng dùng cột nào, còn đồng nghiệp không biết gì. Mất cả ngày dò lại.",
            ending: "bad",
          },
          good: {
            text: "Bạn bật luồng, xem nhật ký đúng ngày hẹn và thấy mọi lần chạy đều đúng. Đồng nghiệp đọc trang hướng dẫn và nói họ sửa được nếu cần.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một việc lặp nhỏ, rõ và ít rủi ro.",
          "Bước 2 - Vẽ kích hoạt, điều kiện (có nhánh còn lại), hành động.",
          "Bước 3 - Thử ba dòng giả: đúng, thiếu, lạ; viết trước kết quả mong đợi.",
          "Bước 4 - Viết trang hướng dẫn, hẹn ngày xem nhật ký rồi bật.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bạn vừa đi hết một vòng: chọn, vẽ, thử, ghi, bật và xem.",
          "Bài sau: mở sang chặng tiếp theo của giáo trình.",
        ],
      },
    ],
  },
];
