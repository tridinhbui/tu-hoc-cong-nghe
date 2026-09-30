import type { Lesson } from "../lesson-types";

// Chặng 51, bài 1-5. Giáo trình: scripts/curriculum/stage-51.json.
// Bài dạy khái niệm bền (kích hoạt, hành động, dữ liệu qua từng bước), không gắn với nút bấm hay giá của công cụ nào.
export const S51_A_LESSONS: Lesson[] = [
  {
    id: 2420,
    slug: "email-hoa-don-tu-luu-vao-thu-muc",
    title: "Chặng 51, Bài 1: Email hoá đơn về hộp thư, ai lưu vào thư mục mỗi tháng?",
    subtitle: "Một câu 'khi có email như vậy thì lưu tệp vào thư mục' là đủ để bắt đầu, chưa cần công cụ nào.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng bạn lục hộp thư tìm hoá đơn nhà cung cấp, mở từng thư, tải từng tệp, kéo vào thư mục. Việc không khó nhưng lặp đi lặp lại và dễ sót. Bài này cho bạn cách nói việc đó thành một câu rõ ràng, là bước đầu tiên của mọi tự động hoá không cần code.",
    openingQuestion:
      "Cuối tháng bạn lục hộp thư để tìm 12 hoá đơn nhà cung cấp rồi lưu vào thư mục. Điều gì làm việc này hợp để tự động hoá?",
    openingOptions: [
      "Nó lặp lại đều đặn và bạn nói được quy tắc của nó thành lời",
      "Nó là việc rất khó, mỗi lần làm đều phải suy nghĩ thật nhiều",
      "Hộp thư của bạn đã quá đầy nên buộc phải đổi sang công cụ mới",
      "Sếp yêu cầu mọi việc văn phòng đều phải chạy bằng công cụ mới",
    ],
    correctOption: 0,
    explanation:
      "Việc hợp để tự động hoá là việc lặp lại và có quy tắc nói ra được: email từ nhà cung cấp này, có tệp đính kèm, thì lưu vào thư mục tháng này. Việc khó, cần phán đoán mỗi lần, lại là việc nên để người làm. Hộp thư đầy hay lệnh của sếp không phải lý do: nếu bạn không nói được quy tắc thì công cụ nào cũng không làm thay được.",
    diagram: [
      { label: "Email hoá đơn về hộp thư", arrow: true },
      { label: "Luồng nhận ra: đúng người gửi, có tệp đính kèm", arrow: true },
      { label: "Lưu tệp vào thư mục của tháng", arrow: true },
      { label: "Bạn mở thư mục và thấy đủ hoá đơn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một kế toán nhỏ ở công ty phân phối nhận khoảng 15 email hoá đơn mỗi tháng từ vài nhà cung cấp quen. Cuối tháng chị mất gần một buổi chiều mở từng thư, tải tệp, đổi tên và kéo vào thư mục. Khi chị viết ra một câu quy tắc 'thư từ nhà cung cấp quen, có tệp PDF, thì lưu vào thư mục tháng', việc lưu tệp tự chạy; chị chỉ còn đối chiếu số hoá đơn với bảng theo dõi. Số liệu trong tình huống này chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Câu nào là một 'kích hoạt' (điều xảy ra trước) rõ ràng cho việc lưu hoá đơn?",
        options: [
          "Khi có email mới từ địa chỉ nhà cung cấp quen và kèm tệp PDF",
          "Khi tôi thấy rảnh và nhớ ra là cần lưu hoá đơn",
          "Khi có bất kỳ email nào vừa về hộp thư của tôi",
          "Khi cuối tháng đến gần và hộp thư bắt đầu đầy lên",
        ],
        correct: 0,
        explanation:
          "Kích hoạt tốt nói rõ sự kiện kiểm tra được: email mới, từ ai, có gì kèm theo. 'Khi tôi nhớ ra' phụ thuộc trí nhớ của bạn nên không tự chạy được. 'Bất kỳ email nào' quá rộng, sẽ lưu cả thư rác và thư quảng cáo. 'Cuối tháng đến gần' mơ hồ, công cụ không biết thế nào là gần.",
      },
      {
        question: "Vì sao không nên đặt quy tắc 'mọi email có chữ hoá đơn thì lưu tệp'?",
        options: [
          "Thư quảng cáo hay thư mời thanh toán cũng có thể chứa chữ đó",
          "Công cụ tự động không đọc được chữ tiếng Việt có dấu trong tiêu đề thư",
          "Việc lưu tệp luôn cần người bấm xác nhận từng lần thì mới an toàn",
          "Chữ hoá đơn chỉ dùng được cho hoá đơn giấy chứ không cho hoá đơn điện tử",
        ],
        correct: 0,
        explanation:
          "Một từ khoá rộng sẽ bắt cả những thư không phải hoá đơn: quảng cáo, thư nhắc thanh toán, thư bạn bè gửi lại. Quy tắc nên gắn thêm người gửi hoặc loại tệp. Công cụ đọc được tiếng Việt, không cần người bấm từng lần, và chữ hoá đơn cũng xuất hiện ở hoá đơn điện tử.",
      },
      {
        question: "Bạn muốn biết luồng lưu hoá đơn có chạy đúng không. Cách kiểm nào hợp lý nhất?",
        options: [
          "Đếm số hoá đơn trong thư mục và so với số email thật",
          "Tin là đúng vì công cụ không hiện thông báo lỗi nào suốt cả tháng",
          "Mở một tệp duy nhất rồi coi như cả tháng đều đủ",
          "Hỏi nhà cung cấp xem họ có gửi đủ hoá đơn hay không",
        ],
        correct: 0,
        explanation:
          "So số tệp trong thư mục với số email hoá đơn thật là phép kiểm đơn giản và đo được. Không có thông báo lỗi chưa chắc là đủ, vì một thư bị bỏ sót thường không gây lỗi. Mở một tệp chỉ chứng minh tệp đó đúng. Nhà cung cấp không biết luồng của bạn lưu được bao nhiêu.",
      },
      {
        question: "Chuyện gì xảy ra nếu bạn bật luồng tự lưu mà không đặt tên tệp theo quy ước nào?",
        options: [
          "Tệp gom về đủ nhưng lẫn tên lộn xộn, tìm lại vẫn mất công",
          "Luồng tự dừng vì không biết đặt tên tệp",
          "Công cụ tự đặt tên theo ngày và nhà cung cấp dù bạn chưa dặn gì",
          "Các tệp bị xoá để khỏi tốn dung lượng",
        ],
        correct: 0,
        explanation:
          "Luồng chỉ làm đúng những gì bạn đặt: lưu tệp theo tên gốc người gửi đặt, nên bạn vẫn có một thư mục lộn xộn. Nó không tự dừng, không tự đặt tên hay suy ra quy ước của bạn, và càng không xoá tệp. Nên nghĩ trước tên tệp, ví dụ năm-tháng-nhà cung cấp.",
      },
      {
        question: "Trong ba việc dưới đây, việc nào nên tự động hoá đầu tiên?",
        options: [
          "Lưu tệp hoá đơn từ email vào thư mục, 15 lần mỗi tháng",
          "Duyệt và ký từng hoá đơn trước khi thanh toán cho nhà cung cấp",
          "Trả lời thư khiếu nại của khách bằng lời tự soạn sẵn cho nhanh",
          "Quyết định nhà cung cấp nào được gia hạn hợp đồng năm sau",
        ],
        correct: 0,
        explanation:
          "Lưu tệp là việc lặp, có quy tắc và sai thì ít hại, nên là điểm khởi đầu tốt. Ký duyệt thanh toán và gia hạn hợp đồng cần phán đoán và trách nhiệm của người. Thư khiếu nại cần đọc hiểu từng trường hợp, một câu soạn sẵn dễ làm khách giận thêm.",
      },
    ],
    keyTakeaways: [
      "Tự động hoá bắt đầu từ một câu: khi điều này xảy ra thì làm việc kia.",
      "Việc hợp là việc lặp lại và có quy tắc nói ra được thành lời.",
      "Quy tắc quá rộng bắt nhầm cả thư rác; hãy gắn thêm người gửi hoặc loại tệp.",
      "Luồng chỉ làm đúng điều bạn đặt: tên tệp lộn xộn vào thì lộn xộn ra.",
      "Kiểm bằng cách đếm: số tệp trong thư mục so với số email thật.",
    ],
    practicePrompt: {
      question:
        "Anh Nam nói: 'Khi có email từ nhà cung cấp A kèm tệp PDF thì lưu tệp vào thư mục Hoá đơn, tên theo năm-tháng-A.' Thiếu gì so với một câu quy tắc đầy đủ?",
      options: [
        "Không thiếu gì: có điều kiện, hành động, nơi lưu và quy ước tên",
        "Thiếu giờ chạy, vì mọi luồng đều phải đặt giờ cố định",
        "Thiếu tên người duyệt, vì luồng không chạy nếu chưa có người duyệt",
        "Thiếu thời hạn lưu, vì luồng cần biết khi nào xoá tệp cũ",
      ],
      correct: 0,
      explanation:
        "Câu của anh Nam có đủ bốn phần: sự kiện (email từ A kèm PDF), hành động (lưu tệp), nơi lưu (thư mục Hoá đơn) và quy ước tên. Luồng theo sự kiện không cần giờ cố định, không bắt buộc người duyệt, và việc xoá tệp cũ là một quyết định khác.",
    },
    summary: {
      keyIdea: "Nói được việc lặp của bạn thành một câu 'khi... thì...' là đã xong nửa đường tự động hoá.",
      formula: "Khi [sự kiện kiểm tra được] thì [một hành động] vào [nơi cụ thể].",
      commonMistake: "Đặt quy tắc quá rộng ('mọi email có chữ hoá đơn') rồi ngạc nhiên vì thư rác cũng bị lưu.",
      action: "Viết ra một câu 'khi... thì...' cho việc lưu hoá đơn của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở hộp thư, tìm 3 hoá đơn hay báo cáo gần nhất của cùng một nhà cung cấp. Ghi ra giấy: người gửi, tiêu đề thường gặp, loại tệp đính kèm và thư mục bạn hay lưu vào. Rồi viết đúng một câu 'Khi ... thì lưu ... vào ...'. Mai dashboard sẽ hỏi bạn câu đó.",
      secondary: "Nếu ba thư không giống nhau ở điểm nào, ghi lại điểm lệch đó: nó là chỗ quy tắc của bạn cần thêm điều kiện.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai cuối tháng, bạn mở hộp thư, gõ 'hoá đơn' vào ô tìm kiếm và thấy 40 kết quả lẫn lộn. Bài này không dạy công cụ nào, chỉ dạy bạn nói việc đó thành một câu đủ rõ để máy làm thay.",
      },
      {
        type: "feynman",
        title: "Tự động hoá đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dặn người gác cổng: 'Có bưu phẩm nào từ nhà cung cấp quen thì đặt lên kệ hoá đơn, đừng đặt lên kệ khác.' Người gác cổng không cần hiểu công ty bạn, chỉ cần nghe rõ hai điều: bưu phẩm thế nào, đặt ở đâu.",
        columns: ["Thành phần", "Người gác cổng", "Luồng tự động"],
        rows: [
          ["Điều xảy ra trước", "Có bưu phẩm tới cổng", "Có email mới về hộp thư"],
          ["Cách nhận ra", "Nhìn tên người gửi trên bì thư", "Đọc địa chỉ người gửi và tệp đính kèm"],
          ["Việc cần làm", "Đặt lên kệ hoá đơn", "Lưu tệp vào thư mục hoá đơn"],
          ["Khi dặn không rõ", "Đặt nhầm cả thư rác lên kệ", "Lưu cả thư quảng cáo có tệp đính kèm"],
        ],
        oneLiner: "Luồng tự động là người gác cổng nghe lời tuyệt đối: dặn rõ thì làm đúng, dặn mơ hồ thì làm sai đều đặn.",
      },
      { type: "heading", text: "Một việc lặp, một câu quy tắc" },
      {
        type: "paragraph",
        text: "Việc lưu hoá đơn gồm ba thứ: một điều xảy ra (email về), một cách nhận ra (đúng người gửi, có tệp), một việc làm (lưu vào thư mục). Trong ngôn ngữ tự động hoá, điều xảy ra trước gọi là kích hoạt (trigger), việc làm gọi là hành động (action). Hai từ này là tất cả những gì bạn cần nhớ hôm nay.",
      },
      {
        type: "flow",
        title: "Hoá đơn đi từ hộp thư vào thư mục",
        steps: [
          { label: "Email về hộp thư", detail: "Nhà cung cấp gửi thư kèm tệp PDF. Đây là sự kiện mở đầu, bạn không cần làm gì." },
          { label: "Kiểm điều kiện", detail: "Luồng xem người gửi có nằm trong danh sách nhà cung cấp quen không và thư có tệp đính kèm không. Thư quảng cáo dừng ở đây." },
          { label: "Đặt tên tệp", detail: "Tệp được đặt lại theo quy ước bạn chọn, ví dụ năm-tháng-tên nhà cung cấp, để sau này tìm lại dễ." },
          { label: "Lưu vào thư mục tháng", detail: "Tệp nằm vào đúng thư mục. Cuối tháng bạn chỉ việc mở thư mục và đếm." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Quy tắc rộng, dễ hỏng",
          text: "Mọi email có chữ 'hoá đơn' thì lưu tệp. Thư quảng cáo, thư nhắc nợ, thư bạn bè chuyển tiếp đều bị lưu lẫn vào thư mục.",
        },
        right: {
          label: "Quy tắc hẹp, chạy bền",
          text: "Email từ địa chỉ nhà cung cấp quen, có tệp PDF, thì lưu vào thư mục tháng với tên theo quy ước. Thư lạ không bị đụng tới.",
        },
      },
      { type: "heading", text: "Nhờ AI chỉnh câu quy tắc của bạn" },
      {
        type: "paragraph",
        text: "Bạn không cần viết câu quy tắc một mình. Đưa cho AI việc của bạn và nhờ nó hỏi lại những chỗ còn mơ hồ. AI giỏi phần viết và hỏi; còn quy tắc có đúng với hộp thư của bạn hay không thì chỉ bạn biết.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết câu quy tắc lưu hoá đơn",
        task: "Bạn nhận hoá đơn điện tử từ ba nhà cung cấp quen, mỗi nhà một tệp PDF mỗi tháng. Lắp một prompt để AI viết câu quy tắc 'khi... thì...'.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Tôi muốn tự động hoá việc của mình.", feedback: "AI không biết việc gì, thư nào, nên sẽ tự bịa ra một quy trình nghe hợp lý nhưng không phải của bạn." },
              { text: "Mỗi tháng tôi nhận hoá đơn PDF qua email từ ba nhà cung cấp quen và lưu thủ công vào thư mục Hoá đơn.", good: true, feedback: "Có ai gửi, gửi gì, bạn làm gì hiện nay: AI có đủ dữ kiện để viết đúng việc của bạn." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Viết một câu 'khi... thì...' gồm sự kiện, điều kiện, hành động và nơi lưu, rồi hỏi tôi nếu thiếu thông tin.", good: true, feedback: "Khuôn đầu ra rõ và cho phép AI hỏi lại thay vì đoán; bạn nhận được câu dùng được ngay." },
              { text: "Cho tôi ý tưởng hay về hoá đơn.", feedback: "Mục tiêu quá rộng. AI sẽ trả về danh sách mẹo chung chung, không phải câu quy tắc cho việc của bạn." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ dùng người gửi và loại tệp để nhận ra hoá đơn, không dùng từ khoá trong tiêu đề.", good: true, feedback: "Giới hạn này chặn đúng lỗi quy tắc rộng: thư quảng cáo có chữ 'hoá đơn' sẽ không lọt vào." },
              { text: "Càng nhiều điều kiện càng tốt.", feedback: "Quá nhiều điều kiện làm luồng bỏ sót hoá đơn thật khi tiêu đề đổi một chữ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "limit"],
            text: "Quy tắc đề xuất: Khi có email mới từ một trong ba địa chỉ nhà cung cấp quen và thư có tệp PDF đính kèm, thì lưu tệp vào thư mục Hoá đơn/Năm-Tháng với tên 'năm-tháng-tên nhà cung cấp'.\n\nCâu hỏi lại: nếu một nhà cung cấp gửi hai hoá đơn trong một tháng, bạn muốn tệp thứ hai đặt tên thế nào?",
          },
          {
            requires: ["context"],
            text: "Quy tắc đề xuất: Khi có email có chữ 'hoá đơn' trong tiêu đề, thì lưu mọi tệp đính kèm vào thư mục Hoá đơn.\n\n(Có đúng bối cảnh nhưng dựa vào từ khoá rộng, nên thư quảng cáo có chữ 'hoá đơn' cũng bị lưu.)",
          },
          {
            text: "Bạn có thể dùng công cụ tự động hoá để kết nối hộp thư với thư mục lưu trữ, tiết kiệm đến 80% thời gian xử lý hoá đơn.\n\n(Câu trả lời chung chung và có con số 80% AI tự bịa, không phải câu quy tắc cho việc của bạn.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bật luồng lưu hoá đơn cho tháng này",
        start: "start",
        nodes: {
          start: {
            text: "Bạn đã viết xong ý tưởng và sắp bật luồng lưu hoá đơn. Bạn đặt điều kiện nhận ra hoá đơn thế nào?",
            choices: [
              { label: "Email từ ba địa chỉ nhà cung cấp quen và có tệp PDF đính kèm", next: "narrow" },
              { label: "Mọi email có chữ 'hoá đơn' trong tiêu đề", next: "wide" },
            ],
          },
          narrow: {
            text: "Tuần đầu luồng lưu đúng 4 hoá đơn. Sang tuần sau nhà cung cấp B đổi địa chỉ gửi và không có hoá đơn nào về thư mục. Bạn làm gì?",
            choices: [
              { label: "Cuối tháng đếm số tệp so với số hoá đơn thật và thêm địa chỉ mới của B", next: "good" },
              { label: "Đợi tới cuối năm mới kiểm tra thư mục", next: "late" },
            ],
          },
          wide: {
            text: "Sau một tuần, thư mục Hoá đơn có thêm 9 tệp quảng cáo và 2 tệp hình chữ ký. Bạn làm gì?",
            choices: [
              { label: "Thu hẹp điều kiện về địa chỉ người gửi quen và loại tệp PDF", next: "good" },
              { label: "Để nguyên, mỗi cuối tháng ngồi lọc tệp thừa bằng tay", next: "manual" },
            ],
          },
          good: { text: "Bạn có thư mục gọn và một thói quen đếm cuối tháng. Luồng làm phần lặp, bạn giữ phần kiểm tra.", ending: "good" },
          late: { text: "Tới cuối năm bạn thấy thiếu hoá đơn của nhà cung cấp B cả mấy tháng, phải đi xin lại từng bản. Luồng không báo lỗi vì nó không thấy mình bỏ sót gì.", ending: "bad" },
          manual: { text: "Luồng vẫn chạy nhưng bạn vẫn phải lọc tay mỗi tháng, nên thời gian tiết kiệm gần như bằng không và thư mục luôn lẫn tệp lạ.", ending: "bad" },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Luồng tự động không biết hoá đơn là gì. Nó chỉ biết làm theo điều kiện bạn đặt, nên điều kiện là chỗ bạn nên bỏ thời gian suy nghĩ nhiều nhất.",
      },
      {
        type: "closing",
        lines: [
          "Một việc lặp, một câu 'khi... thì...'.",
          "Quy tắc hẹp chạy bền hơn quy tắc rộng.",
          "Cuối tháng vẫn đếm: máy làm việc lặp, bạn giữ việc kiểm.",
        ],
      },
    ],
  },
  {
    id: 2421,
    slug: "ke-viec-lap-lai-tuan-truoc-cua-ban",
    title: "Chặng 51, Bài 2: Kê ra năm việc bạn lặp lại tuần trước, việc nào đáng tự động",
    subtitle: "Chấm điểm từng việc theo số lần, số phút và mức hại nếu làm sai trước khi nghĩ tới công cụ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người mới học tự động hoá thường chọn việc thú vị thay vì việc đáng làm: tự động một việc làm một lần mỗi quý thì tốn giờ dựng hơn giờ tiết kiệm. Chấm điểm năm việc lặp của tuần trước giúp bạn chọn đúng việc đầu tiên bằng số đo thay vì cảm giác.",
    openingQuestion:
      "Tuần trước bạn lặp năm việc. Việc nào nên tự động hoá trước?",
    openingOptions: [
      "Việc làm nhiều lần mỗi tuần, mỗi lần tốn phút và sai thì ít hại",
      "Việc bạn ghét nhất dù một tháng chỉ làm đúng một lần",
      "Việc quan trọng nhất công ty, dù mỗi lần phải tự tay cân nhắc kỹ lưỡng",
      "Việc mà đồng nghiệp đang khoe là họ đã tự động hoá xong",
    ],
    correctOption: 0,
    explanation:
      "Ba thước đo chọn việc: làm bao nhiêu lần, mỗi lần mất bao nhiêu phút, và sai thì hại đến đâu. Việc một lần mỗi tháng tiết kiệm ít dù bạn ghét nó. Việc quan trọng cần phán đoán thì máy làm thay không đáng tin. Việc đồng nghiệp khoe có thể hợp với họ chứ chưa chắc hợp với tuần của bạn.",
    diagram: [
      { label: "Kê các việc lặp của tuần trước", arrow: true },
      { label: "Chấm: số lần, số phút, mức hại nếu sai", arrow: true },
      { label: "Chọn việc nhiều lần, ít hại", arrow: true },
      { label: "Tự động việc đó trước, đo lại sau hai tuần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trợ lý hành chính kê năm việc tuần trước: nhắc lịch họp (10 lần, 3 phút), gom báo cáo tuần (1 lần, 40 phút), lưu hoá đơn (15 lần, 2 phút), gửi bảng lương (1 lần, 30 phút) và trả lời câu hỏi quen của nhân viên (20 lần, 2 phút). Cô thấy lưu hoá đơn và nhắc lịch vừa nhiều lần vừa ít hại, nên bắt đầu ở đó; bảng lương dù tốn phút nhưng chỉ một lần và sai thì hại nặng, nên để người làm. Số liệu trong tình huống này chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Việc nào tiết kiệm nhiều phút nhất mỗi tuần nếu được tự động hoá?",
        options: [
          "Việc 20 lần mỗi tuần, mỗi lần 2 phút (= 40 phút)",
          "Việc 1 lần mỗi tuần, mỗi lần 30 phút (= 30 phút, chọn vì lần dài nhất)",
          "Việc 4 lần mỗi tuần, mỗi lần 5 phút (= 20 phút)",
          "Việc 10 lần mỗi tuần, mỗi lần 1 phút (= 10 phút)",
        ],
        correct: 0,
        explanation:
          "Tổng phút mỗi tuần là số lần nhân số phút mỗi lần: 40, 30, 20 và 10 phút. Một việc nhỏ nhưng lặp nhiều có thể vượt việc mỗi lần tốn lâu nhưng hiếm. Đừng chỉ nhìn số phút của một lần, cũng đừng chỉ nhìn số lần.",
      },
      {
        question: "Vì sao không nên tự động hoá việc gửi bảng lương hằng tháng làm việc đầu tiên?",
        options: [
          "Sai một lần là hại nặng cho người nhận nên cần người kiểm lại",
          "Bảng lương không bao giờ có thể gửi bằng email nên luồng không làm được",
          "Công cụ tự động hoá luôn từ chối mọi dữ liệu liên quan tới tiền lương",
          "Bảng lương chỉ làm một lần mỗi tháng nên luồng sẽ không chạy nổi",
        ],
        correct: 0,
        explanation:
          "Mức hại khi sai là một thước đo: lương sai gây mất niềm tin và khó sửa. Việc ít lặp và hại cao không phù hợp làm việc đầu tiên. Gửi email bảng lương thì làm được, còn dữ liệu nhạy cảm thì cần hỏi bộ phận IT hoặc kế toán trưởng trước; luồng cũng chạy được với việc làm một lần mỗi tháng.",
      },
      {
        question: "Một việc lặp 15 lần mỗi tuần, mỗi lần 2 phút. Dựng luồng mất 4 giờ (= 240 phút). Sau bao nhiêu tuần thì tiết kiệm bù được công dựng, nếu luồng bớt hết 2 phút mỗi lần?",
        options: [
          "8 tuần (= 240 ÷ 30)",
          "16 tuần (= 240 ÷ 15)",
          "4 tuần (= 240 ÷ 60)",
          "120 tuần (= 240 ÷ 2)",
        ],
        correct: 0,
        explanation:
          "Mỗi tuần tiết kiệm 15 lần nhân 2 phút là 30 phút. Công dựng 240 phút chia 30 là 8 tuần. 16 tuần là chia cho số lần chứ không phải phút tiết kiệm mỗi tuần, 4 tuần là chia cho số phút trong một giờ, còn 120 tuần là chia cho số phút của một lần. Số liệu ở đây chỉ để minh hoạ.",
      },
      {
        question: "Bạn ước tính mỗi lần làm tốn 10 phút nhưng chưa từng bấm giờ. Nên làm gì trước khi quyết định?",
        options: [
          "Bấm giờ vài lần làm thật rồi lấy số trung bình",
          "Giữ nguyên con số 10 phút vì bạn là người làm",
          "Nhân đôi lên 20 phút cho chắc vì nhớ thường thiếu",
          "Hỏi đồng nghiệp xem họ nghĩ việc này tốn bao lâu",
        ],
        correct: 0,
        explanation:
          "Ước tính bằng trí nhớ hay lệch: có người đoán quá cao, có người quá thấp. Bấm giờ vài lần làm thật cho số đáng tin hơn. Nhân đôi cho chắc chỉ thay một phỏng đoán bằng phỏng đoán khác, còn ý kiến đồng nghiệp là phỏng đoán của người khác về việc họ không làm.",
      },
      {
        question: "Việc nào sau đây vừa lặp nhiều vừa ít hại nếu sai, nên hợp làm việc đầu tiên?",
        options: [
          "Lưu tệp đính kèm email vào đúng thư mục theo nhà cung cấp",
          "Gửi thông báo chấm dứt hợp đồng cho nhân viên",
          "Chuyển tiền thanh toán cho nhà cung cấp mới",
          "Trả lời khách đang phàn nàn về một đơn hàng hỏng",
        ],
        correct: 0,
        explanation:
          "Lưu tệp là việc có quy tắc, làm đi làm lại, và nếu nhầm thì chỉ cần kéo tệp sang thư mục khác. Thông báo chấm dứt hợp đồng, chuyển tiền và xử lý khách đang phàn nàn đều hại nặng nếu sai hoặc cần phán đoán, nên người phải làm hoặc duyệt.",
      },
    ],
    keyTakeaways: [
      "Chọn việc tự động bằng ba số đo: số lần, số phút mỗi lần, mức hại nếu sai.",
      "Phút tiết kiệm mỗi tuần = số lần × phút mỗi lần bớt được.",
      "Việc ít lặp mà hại nặng thì để người làm.",
      "Bấm giờ vài lần làm thật thay vì đoán.",
      "Việc đầu tiên nên nhỏ, nhiều lần, ít hại.",
    ],
    practicePrompt: {
      question:
        "Chị Hà chấm điểm: việc A làm 1 lần mỗi tháng mất 60 phút, sai thì hại nặng. Việc B làm 12 lần mỗi tuần mất 3 phút, sai thì sửa dễ. Nên bắt đầu ở đâu?",
      options: [
        "Việc B, vì nhiều lần, tiết kiệm 36 phút mỗi tuần và ít hại",
        "Việc A, vì mỗi lần tốn 60 phút là lâu nhất",
        "Cả hai cùng lúc để chắc có kết quả sớm",
        "Không việc nào, vì việc nào cũng cần người làm",
      ],
      correct: 0,
      explanation:
        "Việc B tiết kiệm 12 nhân 3 là 36 phút mỗi tuần và sai thì sửa dễ, đúng việc đầu tiên. Việc A mỗi tuần chỉ tiết kiệm khoảng 15 phút (60 phút chia cho gần 4 tuần) và sai thì hại nặng. Làm cả hai một lúc khó biết luồng nào gây lỗi; và không làm gì thì bỏ lỡ việc đáng làm.",
    },
    summary: {
      keyIdea: "Đo trước rồi chọn: số lần, số phút, mức hại nếu sai.",
      formula: "Phút tiết kiệm mỗi tuần = số lần mỗi tuần × số phút bớt mỗi lần.",
      commonMistake: "Chọn việc mình ghét nhất thay vì việc nhiều lần và ít hại nhất.",
      action: "Kê năm việc lặp của tuần trước và chấm ba số đo cho từng việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch và hộp thư của tuần trước, kê ra năm việc bạn lặp lại. Với mỗi việc ghi ba số: số lần trong tuần, số phút mỗi lần (ước hoặc bấm giờ), và hại nếu sai (thấp, vừa, cao). Gạch chân một việc vừa nhiều lần vừa hại thấp. Mai dashboard sẽ hỏi bạn chọn việc nào.",
      secondary: "Nếu bạn phân vân giữa hai việc, chọn việc có số lần lớn hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, bạn nhìn lại lịch tuần vừa rồi và thấy mình làm đi làm lại những việc giống hệt nhau. Bài này cho bạn cách chấm điểm từng việc để biết việc nào đáng nhờ máy làm thay và việc nào nên giữ.",
      },
      {
        type: "feynman",
        title: "Chọn việc tự động hoá đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn thuê một người giúp việc theo giờ và chỉ có hai giờ mỗi tuần để dặn dò. Bạn sẽ dặn họ những việc nào? Chắc chắn là những việc lặp đi lặp lại, làm sai cũng chẳng sao, chứ không phải việc cần cân nhắc mỗi lần.",
        columns: ["Thước đo", "Thuê người giúp việc", "Chọn việc tự động"],
        rows: [
          ["Số lần", "Việc hằng ngày đáng dặn hơn việc hằng năm", "Việc làm nhiều lần mỗi tuần có lợi hơn"],
          ["Số phút", "Việc tốn thời gian mới đáng nhờ", "Mỗi lần tốn vài phút, nhân với số lần"],
          ["Nếu làm sai", "Giao việc sai cũng ít hại", "Chọn việc sai thì sửa dễ"],
          ["Việc cần phán đoán", "Bạn tự làm vì không dặn hết được", "Để người làm hoặc duyệt"],
        ],
        oneLiner: "Việc đáng nhờ máy là việc lặp nhiều, sai ít hại; việc cần phán đoán vẫn là việc của bạn.",
      },
      { type: "heading", text: "Ba con số cho mỗi việc" },
      {
        type: "paragraph",
        text: "Với mỗi việc lặp, ghi ba số: bao nhiêu lần một tuần, mấy phút mỗi lần, và sai thì hại thế nào. Hai số đầu nhân với nhau cho biết phút tiết kiệm mỗi tuần nếu luồng làm thay hoàn toàn. Số thứ ba quyết định bạn có dám giao cho máy hay không.",
      },
      {
        type: "chart",
        title: "Phút tiết kiệm mỗi tuần theo số lần lặp",
        caption: "Kéo hai thanh trượt theo việc của bạn. Số liệu minh hoạ: mặc định 10 phút mỗi lần và luồng bớt 80% thời gian; phần còn lại là thời gian bạn vẫn dành để kiểm tra.",
        kind: "line",
        xLabel: "Số lần lặp mỗi tuần",
        yLabel: "Phút tiết kiệm mỗi tuần",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "minutes", label: "Phút mỗi lần làm tay", min: 1, max: 60, step: 1, value: 10, unit: "phút" },
          { id: "saved", label: "Phần trăm thời gian bớt được", min: 10, max: 100, step: 5, value: 80, unit: "%" },
        ],
        series: [{ label: "Phút tiết kiệm mỗi tuần", expr: "x * minutes * saved / 100" }],
      },
      {
        type: "flow",
        title: "Từ danh sách việc lặp tới việc đầu tiên",
        steps: [
          { label: "Kê năm việc lặp", detail: "Mở lịch và hộp thư tuần trước, ghi ra những việc bạn làm giống hệt nhau từ hai lần trở lên." },
          { label: "Ghi ba số cho mỗi việc", detail: "Số lần trong tuần, số phút mỗi lần (bấm giờ thật nếu được), và mức hại nếu sai: thấp, vừa hoặc cao." },
          { label: "Loại việc hại cao", detail: "Việc sai thì hại nặng hoặc cần phán đoán được gạch khỏi danh sách tự động, không phải lúc này." },
          { label: "Chọn việc nhiều phút nhất", detail: "Trong các việc còn lại chọn việc có số lần nhân số phút lớn nhất làm việc đầu tiên." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Việc hợp để tự động",
          text: "Lưu tệp đính kèm, nhắc lịch họp, chép dòng từ biểu mẫu sang bảng. Nhiều lần mỗi tuần, có quy tắc, sai thì sửa dễ.",
        },
        right: {
          label: "Việc nên giữ cho người",
          text: "Chuyển tiền, gửi bảng lương, trả lời khách đang giận, thông báo nhân sự nhạy cảm. Hiếm khi lặp, cần phán đoán, sai thì hại nặng.",
        },
      },
      {
        type: "scenario",
        title: "Chọn việc đầu tiên để tự động hoá",
        start: "start",
        nodes: {
          start: {
            text: "Bạn có ba việc: (A) lưu tệp hoá đơn, 15 lần mỗi tuần, 2 phút mỗi lần; (B) gửi bảng lương, 1 lần mỗi tháng, 30 phút, sai thì hại nặng; (C) trả lời khách đang phàn nàn, 5 lần mỗi tuần, 10 phút mỗi lần. Chọn việc nào?",
            choices: [
              { label: "Việc A, lưu tệp hoá đơn", next: "a" },
              { label: "Việc B, gửi bảng lương", next: "b" },
              { label: "Việc C, trả lời khách phàn nàn", next: "c" },
            ],
          },
          a: {
            text: "Luồng chạy tốt nhưng bạn chưa đo gì. Hai tuần sau bạn làm gì?",
            choices: [
              { label: "Bấm giờ lại việc lưu tệp tay, so với tuần trước khi có luồng", next: "goodEnd" },
              { label: "Tự động hoá thêm ba việc khác cùng lúc vì thấy dễ", next: "rush" },
            ],
          },
          b: { text: "Luồng gửi nhầm một bảng lương cho người không đúng và bạn mất cả tuần giải quyết hậu quả. Việc ít lặp và hại nặng không hợp làm việc đầu tiên.", ending: "bad" },
          c: { text: "Luồng gửi câu trả lời soạn sẵn cho khách đang giận. Khách thấy mình bị đối xử như số thứ tự và giận thêm. Việc cần đọc hiểu từng trường hợp không hợp để máy làm một mình.", ending: "bad" },
          goodEnd: { text: "Bạn thấy tiết kiệm được khoảng 30 phút mỗi tuần và có con số thật để quyết định việc tiếp theo.", ending: "good" },
          rush: { text: "Ba luồng mới cùng lỗi một lúc và bạn không biết luồng nào gây ra. Làm từng việc một thì mới dễ biết cái gì hỏng.", ending: "bad" },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Số phút bạn ước tính hay lệch. Bấm giờ ba lần làm thật rồi lấy trung bình; con số đó đủ thuyết phục hơn cảm giác 'việc này mất nhiều thời gian lắm'.",
      },
      {
        type: "closing",
        lines: [
          "Số lần × số phút cho biết lợi; mức hại cho biết có dám giao không.",
          "Việc đầu tiên nên nhỏ, nhiều lần, sai thì sửa dễ.",
          "Đo trước, chọn sau, làm từng việc một.",
        ],
      },
    ],
  },
  {
    id: 2422,
    slug: "kich-hoat-la-cai-gi-xay-ra-truoc",
    title: "Chặng 51, Bài 3: Kích hoạt: điều gì phải xảy ra trước để việc kia tự chạy",
    subtitle: "Một đơn hàng mới về lúc nửa đêm: luồng nên chạy ngay hay đợi tới sáng?",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⚡",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chọn sai kích hoạt là lỗi đầu tiên của người mới: luồng chạy quá muộn, chạy quá nhiều hoặc không chạy. Phân biệt kích hoạt theo sự kiện và theo giờ giúp bạn chọn đúng loại cho từng việc.",
    openingQuestion:
      "Một đơn hàng mới về lúc 0 giờ 15 đêm. Bạn muốn khách nhận email xác nhận ngay. Nên chọn loại kích hoạt nào?",
    openingOptions: [
      "Kích hoạt theo sự kiện: khi có đơn mới thì luồng chạy",
      "Kích hoạt theo giờ: mỗi ngày 8 giờ sáng luồng quét đơn mới",
      "Kích hoạt theo người: chờ bạn thức dậy rồi bấm chạy luồng",
      "Kích hoạt theo số lượng: chờ đủ 100 đơn rồi mới chạy một lần",
    ],
    correctOption: 0,
    explanation:
      "Khi khách cần phản hồi ngay, kích hoạt theo sự kiện (có đơn mới) là hợp vì luồng chạy lúc đơn về, kể cả nửa đêm. Kích hoạt theo giờ làm khách chờ đến sáng. Bấm tay thì không còn là tự động, còn chờ đủ 100 đơn khiến đơn đầu tiên đợi rất lâu. Hãy hỏi: người liên quan có chịu đợi tới sáng không?",
    diagram: [
      { label: "Một sự việc xảy ra (đơn mới, email, biểu mẫu)", arrow: true },
      { label: "Kích hoạt nhận ra sự việc đó", arrow: true },
      { label: "Luồng chạy các hành động", arrow: true },
      { label: "Khách nhận kết quả ngay lúc cần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng nhỏ bán đồ thủ công nhận đơn cả ban đêm. Chủ tiệm lúc đầu đặt luồng 'gửi xác nhận' chạy một lần lúc 8 giờ sáng; khách đặt lúc nửa đêm phải đợi tám tiếng và nhiều người nhắn hỏi có đặt được không. Chủ tiệm đổi sang kích hoạt 'khi có đơn mới' thì khách nhận xác nhận trong vài phút, còn báo cáo tổng hợp đơn trong ngày vẫn giữ kích hoạt theo giờ 8 giờ sáng. Số liệu trong tình huống này chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Việc nào hợp nhất với kích hoạt theo giờ (chạy vào một giờ cố định)?",
        options: [
          "Gửi báo cáo tổng hợp đơn trong ngày lúc 8 giờ sáng hôm sau",
          "Gửi email xác nhận cho khách ngay khi họ vừa đặt hàng xong trên web",
          "Báo cho bạn biết ngay khi có khách điền biểu mẫu đăng ký tư vấn",
          "Lưu tệp đính kèm ngay khi email hoá đơn của nhà cung cấp về hộp thư",
        ],
        correct: 0,
        explanation:
          "Báo cáo tổng hợp chỉ cần một lần mỗi ngày nên hợp với giờ cố định. Ba việc còn lại đều cần phản hồi theo từng sự kiện: xác nhận đơn, báo khách điền biểu mẫu và lưu hoá đơn, nếu chờ tới giờ quét thì người liên quan phải đợi không cần thiết.",
      },
      {
        question: "Khách đặt hàng lúc nửa đêm nhưng luồng xác nhận chỉ chạy lúc 8 giờ sáng. Điều gì xảy ra?",
        options: [
          "Khách đợi tám tiếng mới nhận xác nhận",
          "Luồng chạy ngay lúc nửa đêm như mọi khi",
          "Xác nhận gửi hai lần, một lần mỗi giờ",
          "Đơn của khách tự động bị huỷ",
        ],
        correct: 0,
        explanation:
          "Kích hoạt theo giờ chỉ chạy đúng giờ đặt nên mọi thứ về trước đó phải đợi. Luồng không tự chạy sớm hơn, không tự gửi hai lần vì giờ đặt chỉ có một, và không liên quan tới việc huỷ đơn.",
      },
      {
        question: "Bạn kiểm tra hộp thư bằng cách cho luồng chạy mỗi 5 phút để xem có thư mới không, trong khi công cụ hỗ trợ kích hoạt 'khi có thư mới'. Lựa chọn nào tốt hơn?",
        options: [
          "Dùng kích hoạt 'khi có thư mới' vì chạy đúng lúc cần và ít lần chạy thừa",
          "Giữ chạy mỗi 5 phút vì chắc chắn hơn mọi cách khác",
          "Chạy mỗi giây cho nhanh vì nhanh nhất là tốt nhất",
          "Chạy một ngày một lần vì ít tốn tài nguyên nhất",
        ],
        correct: 0,
        explanation:
          "Khi công cụ có sự kiện sẵn thì dùng sự kiện: luồng chỉ chạy khi có thư, không quét vô ích. Quét mỗi 5 phút làm nhiều lần chạy rỗng và vẫn có độ trễ. Mỗi giây tốn lượt chạy rất nhiều mà không cần, còn một ngày một lần thì thư đến sớm phải chờ rất lâu.",
      },
      {
        question: "Kích hoạt 'khi có đơn mới' nghe rất hay. Bạn cần cẩn thận điều gì nhất?",
        options: [
          "Điều kiện đi kèm, vì mọi đơn kể cả đơn thử đều có thể kích hoạt luồng",
          "Kích hoạt này chỉ chạy được vào ban ngày, còn ban đêm thì luồng tự ngủ đông",
          "Kích hoạt này tự kiểm tra đơn có đúng hay không",
          "Kích hoạt này không bao giờ chạy hai lần cho một đơn",
        ],
        correct: 0,
        explanation:
          "Kích hoạt chỉ nói điều gì xảy ra, không phân biệt đơn thật hay đơn thử, nên cần điều kiện đi kèm. Nó chạy cả đêm, không tự kiểm đúng sai, và nhiều công cụ có thể chạy lại khi gặp lỗi nên bạn cần nghĩ cách tránh gửi trùng.",
      },
      {
        question: "Cách nào mô tả kích hoạt đúng nhất?",
        options: [
          "Điều xảy ra trước, làm cho luồng bắt đầu chạy",
          "Bước cuối cùng của luồng, gửi kết quả cho người dùng",
          "Công cụ kết nối hai ứng dụng với nhau",
          "Nút bấm để bạn tắt luồng khi gặp lỗi",
        ],
        correct: 0,
        explanation:
          "Kích hoạt (trigger) là sự kiện hoặc giờ làm luồng bắt đầu. Bước cuối là hành động. Công cụ kết nối là nền tảng chứa luồng chứ không phải kích hoạt, còn nút tắt là một thao tác quản lý luồng.",
      },
    ],
    keyTakeaways: [
      "Kích hoạt là điều xảy ra trước, làm luồng bắt đầu chạy.",
      "Kích hoạt theo sự kiện: phản hồi ngay khi sự việc về.",
      "Kích hoạt theo giờ: hợp cho báo cáo tổng hợp một lần mỗi ngày.",
      "Kích hoạt chỉ nói điều gì xảy ra, còn đúng hay sai thì cần điều kiện kiểm.",
      "Nhớ nghĩ tới chuyện một sự việc có thể làm luồng chạy hai lần.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn gửi tin nhắc khách ngày mai có lịch hẹn. Kích hoạt nào hợp?",
      options: [
        "Theo giờ: 5 giờ chiều mỗi ngày, lấy các lịch hẹn của ngày mai",
        "Theo sự kiện: khi có khách đặt lịch thì gửi nhắc ngay, dù lịch hẹn còn cách vài tuần",
        "Theo sự kiện: khi khách nhận được xác nhận lịch hẹn",
        "Theo giờ: chỉ gửi lúc nửa đêm khi khách đang ngủ",
      ],
      correct: 0,
      explanation:
        "Việc nhắc phụ thuộc vào thời điểm (ngày mai), nên hợp với kích hoạt theo giờ và chọn lịch hẹn của ngày sau. Gửi nhắc ngay lúc đặt thì quá sớm với lịch tuần sau. Kích hoạt lúc khách nhận xác nhận cũng là ngay sau khi đặt. Nửa đêm thì tin nhắn hiện lúc khách ngủ, dễ bị bỏ qua.",
    },
    summary: {
      keyIdea: "Chọn kích hoạt theo câu hỏi: việc này cần chạy khi sự việc về, hay chạy vào một giờ cố định?",
      formula: "Cần phản hồi ngay → theo sự kiện. Cần tổng hợp hoặc nhắc theo lịch → theo giờ.",
      commonMistake: "Đặt kích hoạt theo giờ cho việc cần phản hồi ngay, khiến khách đợi hàng giờ.",
      action: "Với việc bạn định tự động, ghi rõ kích hoạt là sự kiện hay giờ và vì sao.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy việc bạn chọn ở bài trước. Viết vào một dòng: 'Kích hoạt của tôi là ... (sự kiện hoặc giờ)', rồi trả lời hai câu: nếu sự việc xảy ra lúc nửa đêm hay cuối tuần thì người liên quan cần biết ngay hay đợi tới sáng? Một sự việc có thể xảy ra hai lần cho cùng một người không? Mai dashboard sẽ hỏi.",
      secondary: "Nếu câu trả lời là 'cần biết ngay', chọn sự kiện; nếu là 'đợi tới sáng cũng được', chọn giờ.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đơn hàng mới về lúc 0 giờ 15 đêm và bạn đang ngủ. Khách chờ một email xác nhận, bạn thì không muốn thức để gửi. Bài này dạy bạn trả lời câu hỏi đầu tiên của mọi luồng tự động: điều gì phải xảy ra để nó bắt đầu chạy.",
      },
      {
        type: "feynman",
        title: "Kích hoạt đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung hai cái chuông trong nhà: chuông cửa kêu khi có người bấm, còn đồng hồ báo thức reo vào giờ bạn đặt. Cả hai đều là 'điều xảy ra trước' để bạn làm việc, nhưng chúng dùng cho việc khác nhau.",
        columns: ["Loại", "Đồ vật quen thuộc", "Luồng tự động"],
        rows: [
          ["Theo sự kiện", "Chuông cửa kêu khi có người bấm", "Chạy khi có đơn mới, thư mới hoặc biểu mẫu mới"],
          ["Theo giờ", "Đồng hồ báo thức reo đúng giờ", "Chạy lúc 8 giờ sáng hằng ngày hoặc thứ Hai hằng tuần"],
          ["Hợp cho việc", "Mở cửa ngay khi có khách", "Báo cáo tổng hợp, nhắc theo lịch"],
          ["Dùng sai thì", "Báo thức đặt nhầm giờ, khách đứng ngoài cửa", "Luồng chạy muộn hoặc chạy hàng nghìn lần vô ích"],
        ],
        oneLiner: "Kích hoạt là cái chuông: theo sự kiện khi cần trả lời ngay, theo giờ khi cần tổng hợp hoặc nhắc.",
      },
      { type: "heading", text: "Hai loại kích hoạt và khi nào dùng loại nào" },
      {
        type: "paragraph",
        text: "Kích hoạt (trigger) là điều xảy ra trước, làm luồng bắt đầu. Có loại theo sự kiện, như có đơn mới, có thư mới, có người điền biểu mẫu. Có loại theo giờ, như mỗi sáng 8 giờ. Hỏi bản thân một câu: người liên quan cần biết ngay hay đợi tới giờ tổng hợp cũng được.",
      },
      {
        type: "flow",
        title: "Từ đơn hàng nửa đêm tới email xác nhận",
        steps: [
          { label: "Khách bấm đặt hàng", detail: "Đơn mới được ghi vào bảng đơn hàng lúc 0 giờ 15. Đây là sự kiện làm kích hoạt nhận ra có việc." },
          { label: "Kích hoạt nhận sự kiện", detail: "Luồng thấy dòng mới trong bảng đơn và bắt đầu chạy, không cần ai bấm." },
          { label: "Kiểm điều kiện", detail: "Luồng kiểm email khách có trống không và đơn có phải đơn thử của bạn không. Đơn thử dừng ở đây." },
          { label: "Gửi email xác nhận", detail: "Email có tên khách và mã đơn được gửi trong vài phút. Sáng ra bạn chỉ việc xem lại." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Theo sự kiện",
          text: "Chạy ngay khi sự việc về: xác nhận đơn, báo khách điền biểu mẫu, lưu hoá đơn. Cần nghĩ tới đơn thử và việc một sự việc có thể làm luồng chạy hai lần.",
        },
        right: {
          label: "Theo giờ",
          text: "Chạy vào giờ đã đặt: báo cáo tổng hợp, nhắc lịch hẹn ngày mai. Đơn giản nhưng mọi thứ về trước giờ đó đều phải đợi.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp tư vấn chọn kích hoạt cho cửa hàng",
        task: "AI được nhờ tư vấn kích hoạt cho luồng xác nhận đơn và luồng báo cáo ngày. Bản nháp có 2 câu sai hoặc hứa quá. Bấm vào câu đáng ngờ rồi nộp.",
        segments: [
          { text: "Luồng xác nhận đơn nên dùng kích hoạt theo sự kiện 'có đơn mới', vì khách cần thư ngay cả khi đặt lúc nửa đêm." },
          { text: "Luồng báo cáo tổng hợp đơn trong ngày hợp với kích hoạt theo giờ, chạy một lần lúc 8 giờ sáng hôm sau." },
          { text: "Nếu luồng xác nhận đặt chạy theo giờ 8 giờ sáng, khách đặt lúc nửa đêm vẫn nhận xác nhận ngay lập tức.", error: "Luồng theo giờ chỉ chạy đúng giờ đã đặt: khách đặt lúc nửa đêm phải đợi tới 8 giờ sáng. Câu này nói ngược lại." },
          { text: "Kích hoạt theo sự kiện luôn chạy đúng một lần cho mỗi đơn nên bạn không bao giờ phải lo gửi trùng.", error: "Không có bảo đảm đó. Nhiều công cụ có thể chạy lại khi lỗi hoặc khi dữ liệu bị sửa, nên cần có cách tránh gửi trùng, ví dụ đánh dấu đơn đã xác nhận." },
          { text: "Luồng xử lý đơn thứ 5 000 theo đúng quy tắc như đơn thứ nhất vì luồng không bị mệt." },
        ],
      },
      {
        type: "scenario",
        title: "Chọn kích hoạt cho thông báo khách đặt lịch",
        start: "start",
        nodes: {
          start: {
            text: "Khách đặt lịch hẹn qua biểu mẫu. Bạn muốn báo cho mình ngay khi có lịch và nhắc khách vào chiều hôm trước. Bạn chọn thế nào?",
            choices: [
              { label: "Báo bạn theo sự kiện 'có lịch mới'; nhắc khách theo giờ 5 giờ chiều hôm trước", next: "both" },
              { label: "Cả hai việc chạy theo giờ 8 giờ sáng hằng ngày", next: "onlyTime" },
            ],
          },
          both: {
            text: "Sáng hôm sau bạn thấy khách nhận hai email nhắc vì biểu mẫu bị gửi lại hai lần. Bạn làm gì?",
            choices: [
              { label: "Thêm cột 'đã nhắc' và chỉ nhắc khi cột này còn trống", next: "good" },
              { label: "Tắt luồng nhắc và bảo khách tự nhớ", next: "giveUp" },
            ],
          },
          onlyTime: {
            text: "Khách đặt lịch lúc 9 giờ tối phải đợi tới 8 giờ sáng mới thấy bạn biết, còn tin nhắc thì đến đúng lúc khách đã đi làm. Bạn thấy gì?",
            choices: [
              { label: "Tách việc báo bạn sang kích hoạt theo sự kiện", next: "good" },
              { label: "Cứ giữ vậy, khách rồi sẽ quen", next: "ignore" },
            ],
          },
          good: { text: "Bạn biết ngay có lịch mới, khách được nhắc đúng một lần vào chiều hôm trước. Mỗi việc dùng đúng loại kích hoạt của nó.", ending: "good" },
          giveUp: { text: "Bạn quay về nhắc tay, mất hết thời gian tiết kiệm chỉ vì một lỗi gửi trùng có cách sửa rất nhỏ.", ending: "bad" },
          ignore: { text: "Vài khách đặt buổi tối không được phản hồi kịp và chọn chỗ khác. Kích hoạt sai loại làm bạn mất khách mà luồng không hề báo lỗi.", ending: "bad" },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Hỏi một câu trước khi chọn kích hoạt: nếu việc này muộn tám tiếng thì có sao không? Nếu có, chọn theo sự kiện; nếu không, theo giờ là đủ.",
      },
      {
        type: "closing",
        lines: [
          "Kích hoạt là điều xảy ra trước để luồng bắt đầu chạy.",
          "Theo sự kiện khi cần phản hồi ngay, theo giờ khi cần tổng hợp hoặc nhắc.",
          "Luôn nghĩ tới đơn thử và khả năng luồng chạy hai lần.",
        ],
      },
    ],
  },
  {
    id: 2423,
    slug: "hanh-dong-nho-mot-buoc-mot-ket-qua",
    title: "Chặng 51, Bài 4: Hành động nhỏ: mỗi bước chỉ làm một việc và trả một kết quả",
    subtitle: "Tách 'nhận đơn rồi báo khách' thành từng bước đơn lẻ để bước nào hỏng thì sửa bước đó.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một luồng to làm năm việc trong một bước sẽ hỏng ở đâu đó mà bạn không biết chỗ nào. Tách thành bước nhỏ, mỗi bước một việc và một kết quả, giúp bạn sửa nhanh và dễ nhờ người khác hiểu luồng của mình.",
    openingQuestion:
      "Luồng 'nhận đơn rồi báo khách' bỗng không gửi được email. Cách thiết kế nào giúp bạn tìm ra chỗ hỏng nhanh nhất?",
    openingOptions: [
      "Mỗi bước làm một việc và trả một kết quả nhìn thấy được",
      "Gộp mọi việc vào một bước lớn để chỉ phải kiểm tra một chỗ",
      "Thêm thật nhiều điều kiện vào bước đầu để bước sau đỡ lỗi",
      "Đặt tên bước thật dài, ghi đủ mọi việc mà luồng sẽ làm sau đó",
    ],
    correctOption: 0,
    explanation:
      "Khi mỗi bước chỉ làm một việc và cho ra một kết quả nhìn thấy được (dòng mới trong bảng, email đã gửi), bạn nhìn vào bước nào không có kết quả là biết chỗ hỏng. Gộp tất cả vào một bước lớn thì hỏng mà không biết việc nào sai. Thêm điều kiện dồn vào bước đầu làm nó khó đọc, còn tên dài chỉ mô tả chứ không giúp tìm lỗi.",
    diagram: [
      { label: "Bước 1: nhận đơn, ghi vào bảng", arrow: true },
      { label: "Bước 2: lấy email khách từ dòng vừa ghi", arrow: true },
      { label: "Bước 3: gửi email xác nhận", arrow: true },
      { label: "Mỗi bước trả một kết quả để bạn kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chủ shop dựng luồng gộp trong một bước: lấy đơn, tính tổng, viết email, gửi, rồi ghi sổ. Một ngày luồng ngừng gửi email mà không báo lỗi cụ thể; chủ shop phải kiểm cả năm việc. Sau khi tách thành năm bước nhỏ, lần sau luồng hỏng, chị nhìn là thấy bước 'tính tổng' trả về ô trống vì một đơn thiếu giá. Chị chỉ sửa đúng bước đó. Số liệu trong tình huống này chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Điều nào mô tả đúng một hành động nhỏ?",
        options: [
          "Làm đúng một việc và cho ra một kết quả bạn nhìn thấy được",
          "Làm vài việc liên quan trong cùng một bước để luồng ngắn và gọn hơn",
          "Làm mọi việc một lượt rồi báo kết quả chung cuối cùng",
          "Làm việc ngầm không ai thấy để tránh làm rối người dùng",
        ],
        correct: 0,
        explanation:
          "Hành động nhỏ có hai tính chất: một việc, một kết quả. Gộp vài việc vào một bước làm khó biết việc nào sai. Báo chung cuối cùng che mất bước hỏng, và việc làm ngầm thì không có kết quả để kiểm.",
      },
      {
        question: "Bước 'gửi email' thất bại nhưng bước 'ghi dòng vào bảng' vẫn thành công. Điều này cho bạn biết gì?",
        options: [
          "Lỗi nằm ở khâu gửi email, còn đơn đã được ghi lại",
          "Toàn bộ luồng hỏng và cần dựng lại từ đầu",
          "Khách đã nhận được email nhưng chậm vài phút",
          "Bảng đơn hàng chắc chắn có lỗi dữ liệu",
        ],
        correct: 0,
        explanation:
          "Vì bước nhỏ có kết quả riêng, bạn biết phần nào đã xong: đơn ghi rồi, email chưa gửi. Bạn chỉ cần sửa khâu gửi. Không cần dựng lại cả luồng, khách không nhận được gì, và lỗi ở bước gửi chưa chứng minh bảng có lỗi dữ liệu.",
      },
      {
        question: "Một bước lấy tên khách, tính tổng tiền, viết email và gửi trong cùng một khối. Vấn đề chính là gì?",
        options: [
          "Khi hỏng bạn không biết trong bốn việc, việc nào sai",
          "Luồng chạy chậm hơn gấp bốn lần vì mỗi việc phải đợi việc trước xong",
          "Email sẽ tự động bị đưa vào thư rác",
          "Bốn việc không thể dùng chung một kích hoạt",
        ],
        correct: 0,
        explanation:
          "Gộp nhiều việc làm mất điểm kiểm: không có kết quả trung gian để nhìn. Tốc độ không liên quan trực tiếp, email vào thư rác do nội dung và người gửi chứ không do cách gộp bước, và nhiều việc hoàn toàn có thể dùng chung một kích hoạt.",
      },
      {
        question: "Bước 'lấy email khách' trả về ô trống. Bước sau là 'gửi email'. Điều gì hợp lý nhất?",
        options: [
          "Dừng hoặc báo bạn, vì gửi cho địa chỉ trống thì vô nghĩa",
          "Vẫn gửi vì bước gửi tự biết phải làm gì khi gặp địa chỉ bị trống",
          "Gửi vào địa chỉ của bạn để khỏi mất thư rồi tự chuyển tiếp cho khách",
          "Bỏ qua lỗi vì chỉ một khách bị ảnh hưởng, các khách khác vẫn ổn",
        ],
        correct: 0,
        explanation:
          "Bước sau phụ thuộc vào kết quả bước trước. Kết quả trống nghĩa là không có gì để gửi, nên dừng hoặc báo bạn biết. Gửi vào địa chỉ trống hay sang địa chỉ của bạn đều che lỗi, và bỏ qua thì khách đó không bao giờ được báo mà bạn cũng không biết.",
      },
      {
        question: "Bạn tách việc thành bước nhỏ, nhưng đặt tên bước là 'Bước 1', 'Bước 2', 'Bước 3'. Điều gì đáng lo?",
        options: [
          "Sáu tháng sau bạn không nhớ bước nào làm gì",
          "Công cụ sẽ không chạy luồng có tên chỉ gồm chữ và số đếm như vậy",
          "Các bước sẽ tự đổi thứ tự khi bạn mở luồng",
          "Luồng tự tắt nếu tên bước trùng số đếm",
        ],
        correct: 0,
        explanation:
          "Tên bước nên nói việc nó làm, ví dụ 'Ghi đơn vào bảng' hay 'Gửi email xác nhận'. Tên chỉ là số khiến bạn và đồng nghiệp phải mở từng bước để hiểu. Công cụ vẫn chạy với mọi tên, thứ tự do bạn quyết định, và không tự tắt vì tên.",
      },
    ],
    keyTakeaways: [
      "Mỗi bước chỉ làm một việc và trả một kết quả nhìn thấy được.",
      "Bước nhỏ giúp biết chỗ hỏng; sửa đúng bước đó thay vì dựng lại cả luồng.",
      "Kết quả của bước trước là đầu vào của bước sau; đầu vào trống thì nên dừng hoặc báo.",
      "Đặt tên bước theo việc nó làm.",
      "Tách bước cũng giúp đồng nghiệp đọc hiểu luồng của bạn.",
    ],
    practicePrompt: {
      question:
        "Luồng của bạn: nhận đơn, ghi bảng, gửi email xác nhận, báo Zalo nội bộ. Một hôm Zalo không nhận được tin, nhưng bảng và email vẫn ổn. Bạn sửa ở đâu?",
      options: [
        "Chỉ bước 'báo Zalo nội bộ', vì ba bước trước đã có kết quả đúng",
        "Bước nhận đơn, vì mọi lỗi đều bắt đầu từ bước đầu",
        "Cả bốn bước, vì không biết bước nào gây lỗi",
        "Bước gửi email, vì email và Zalo đều là tin nhắn",
      ],
      correct: 0,
      explanation:
        "Bảng và email có kết quả đúng nghĩa là ba bước đầu làm tốt. Chỉ còn bước cuối không có kết quả, nên sửa đúng chỗ đó. Bước đầu không liên quan khi dữ liệu đã ghi đủ, và email với Zalo là hai bước khác nhau, sửa email không làm Zalo chạy.",
    },
    summary: {
      keyIdea: "Một bước, một việc, một kết quả nhìn thấy được.",
      formula: "Bước nhỏ + tên rõ + kết quả kiểm được = luồng dễ sửa.",
      commonMistake: "Gộp năm việc vào một bước rồi không biết việc nào hỏng.",
      action: "Tách luồng của bạn thành ba đến năm bước và đặt tên theo việc từng bước làm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy việc bạn đã chọn và viết ra từng bước trên giấy: mỗi dòng một việc, kèm 'kết quả tôi nhìn thấy được' ở cuối dòng. Nếu một dòng có chữ 'và', tách nó làm hai. Đặt tên mỗi bước bằng một động từ và một danh từ, ví dụ 'Ghi đơn vào bảng'. Mai dashboard sẽ hỏi bạn có mấy bước.",
      secondary: "Hỏi ở mỗi bước: nếu bước này hỏng thì tôi sẽ nhìn thấy điều gì?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay khách nhắn: 'Tôi đặt hàng rồi mà chưa thấy email xác nhận.' Luồng của bạn làm năm việc liền nhau và bạn không biết việc nào vừa hỏng. Bài này dạy bạn thiết kế sao cho nhìn vào là biết.",
      },
      {
        type: "feynman",
        title: "Bước nhỏ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một dây chuyền làm bánh: một người nhào bột, một người đổ khuôn, một người nướng, một người gói. Nếu bánh ra cháy, bạn nhìn từng trạm là biết trạm nào sai. Nếu chỉ có một người làm hết năm việc, bánh cháy mà bạn không biết lỗi ở đâu.",
        columns: ["Thành phần", "Dây chuyền làm bánh", "Luồng tự động"],
        rows: [
          ["Mỗi trạm", "Một việc: nhào, đổ, nướng hoặc gói", "Một bước: ghi bảng, lấy email hoặc gửi thư"],
          ["Sản phẩm giao cho trạm sau", "Bột đã nhào, bánh đã đổ khuôn", "Dòng đã ghi, địa chỉ email đã lấy"],
          ["Khi có lỗi", "Nhìn trạm nào ra sản phẩm sai", "Nhìn bước nào kết quả sai hoặc trống"],
          ["Khi một người làm hết", "Bánh cháy, không biết do đâu", "Luồng hỏng, không biết bước nào"],
        ],
        oneLiner: "Luồng tốt là dây chuyền: mỗi trạm một việc, một sản phẩm để bạn nhìn thấy.",
      },
      { type: "heading", text: "Một bước, một việc, một kết quả" },
      {
        type: "paragraph",
        text: "Hành động (action) là một bước trong luồng, ví dụ 'ghi đơn vào bảng' hay 'gửi email'. Hành động nhỏ làm đúng một việc và cho ra một kết quả bạn thấy được, như một dòng mới trong bảng hay một email trong mục đã gửi. Kết quả đó cũng là đầu vào cho bước sau.",
      },
      {
        type: "flow",
        title: "Tách 'nhận đơn rồi báo khách' thành bước nhỏ",
        steps: [
          { label: "Ghi đơn vào bảng", detail: "Kết quả: một dòng mới với tên, email, món hàng và số tiền. Nếu không có dòng mới thì lỗi ở bước này." },
          { label: "Lấy email của khách", detail: "Kết quả: địa chỉ email lấy từ dòng vừa ghi. Nếu ô trống thì dừng và báo bạn, không đi tiếp." },
          { label: "Viết nội dung xác nhận", detail: "Kết quả: email có đúng tên khách và mã đơn. Nếu thấy chữ trống thì bước này lấy sai dữ liệu." },
          { label: "Gửi email", detail: "Kết quả: email nằm trong mục đã gửi. Đây là bước duy nhất liên quan đến người ngoài nên bạn kiểm kỹ nhất." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một bước làm tất cả",
          text: "Lấy đơn, tính tiền, viết thư và gửi trong cùng một khối. Khi hỏng bạn chỉ biết 'không gửi được' mà không biết việc nào sai.",
        },
        right: {
          label: "Nhiều bước nhỏ",
          text: "Mỗi bước một việc, tên nói rõ việc đó, kết quả nhìn thấy được. Khi hỏng bạn chỉ vào bước nào kết quả sai hoặc trống.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI tách việc thành các bước nhỏ",
        task: "Bạn có một việc: 'khi khách đặt hàng thì ghi vào bảng, báo khách bằng email và báo nhóm kho bằng tin nhắn'. Lắp một prompt để AI tách thành các bước nhỏ.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Giúp tôi làm việc đặt hàng.", feedback: "AI không biết việc gì, kết quả gì, nên sẽ kể chung về quy trình bán hàng." },
              { text: "Tôi bán đồ thủ công. Khi khách đặt hàng tôi ghi đơn vào bảng, gửi email xác nhận và báo nhóm kho bằng tin nhắn.", good: true, feedback: "Có người làm, việc hiện tại và ba hành động: AI biết chính xác việc cần tách." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc tách",
            options: [
              { text: "Mỗi bước chỉ làm một việc và ghi rõ kết quả tôi sẽ nhìn thấy sau bước đó.", good: true, feedback: "Quy tắc này buộc AI cho ra từng bước có kết quả kiểm được, đúng nguyên tắc hành động nhỏ." },
              { text: "Tách càng ít bước càng tốt cho gọn.", feedback: "Ít bước nghĩa là gộp việc lại, đúng điều bài này khuyên tránh." },
            ],
          },
          {
            id: "format",
            label: "Khuôn đầu ra",
            options: [
              { text: "Trả về bảng ba cột: tên bước, việc làm, kết quả nhìn thấy được.", good: true, feedback: "Bảng ba cột dán thẳng được vào tài liệu thiết kế và dễ đối chiếu với luồng thật." },
              { text: "Viết một đoạn văn dài kể lại toàn bộ quy trình.", feedback: "Đoạn văn trộn các bước lại với nhau, khó chỉ ra bước nào hỏng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "rule", "format"],
            text: "| Tên bước | Việc làm | Kết quả nhìn thấy được |\n| Ghi đơn vào bảng | Thêm một dòng với tên, email, món và số tiền | Dòng mới trong bảng đơn |\n| Gửi email xác nhận | Gửi thư có tên khách và mã đơn | Thư trong mục đã gửi |\n| Báo nhóm kho | Gửi tin có mã đơn và món hàng | Tin nhắn trong nhóm kho |",
          },
          {
            requires: ["context"],
            text: "Quy trình gồm ba phần: ghi đơn, báo khách và báo kho. Bạn nên kiểm tra từng phần cho chắc.\n\n(Có nhắc đủ ba việc nhưng chưa tách bước rõ ràng, không có kết quả để kiểm từng bước.)",
          },
          {
            text: "Để xử lý đơn hàng hiệu quả, hãy dùng hệ thống quản lý đơn tích hợp AI giúp tăng 300% năng suất và giảm lỗi gần như bằng không.\n\n(AI không biết việc của bạn nên trả lời quảng cáo chung chung, kèm con số 300% tự bịa.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sửa luồng báo khách khi email không tới",
        start: "start",
        nodes: {
          start: {
            text: "Luồng của bạn gồm bốn bước: ghi đơn, lấy email, viết thư, gửi thư. Hôm nay bước ghi đơn có kết quả đúng nhưng khách không nhận được thư. Bạn xem gì trước?",
            choices: [
              { label: "Xem kết quả bước 'lấy email' có phải ô trống không", next: "look" },
              { label: "Dựng lại toàn bộ luồng từ đầu cho chắc", next: "rebuild" },
            ],
          },
          look: {
            text: "Bạn thấy ô email của đơn này bị khách gõ thiếu dấu @, nên bước lấy email trả về một địa chỉ sai. Bạn sửa thế nào?",
            choices: [
              { label: "Thêm bước kiểm địa chỉ có dấu @; nếu sai thì báo bạn để hỏi lại khách", next: "good" },
              { label: "Bỏ bước gửi thư và tự gửi tay từ nay", next: "manual" },
            ],
          },
          rebuild: { text: "Bạn mất cả buổi chiều dựng lại, rồi lỗi y hệt xuất hiện vì nguyên nhân là dữ liệu khách nhập chứ không phải cách dựng. Không nhìn kết quả từng bước thì bạn sửa mù.", ending: "bad" },
          manual: { text: "Bạn gửi tay và mất hết lợi ích của luồng. Một lỗi nhỏ ở một bước có thể sửa tại bước đó thay vì bỏ cả việc tự động.", ending: "bad" },
          good: { text: "Luồng có thêm một bước kiểm nhỏ, lần sau địa chỉ sai sẽ được báo cho bạn thay vì biến mất không dấu vết.", ending: "good" },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Nếu tên một bước có chữ 'và', hãy tách nó làm hai. 'Lấy email và gửi thư' là hai việc, hai kết quả, hai chỗ có thể hỏng.",
      },
      {
        type: "closing",
        lines: [
          "Một bước, một việc, một kết quả nhìn thấy được.",
          "Bước hỏng là bước có kết quả sai hoặc trống; sửa đúng bước đó.",
          "Đặt tên bước theo việc nó làm để sáu tháng sau bạn vẫn đọc hiểu.",
        ],
      },
    ],
  },
  {
    id: 2424,
    slug: "mini-du-an-tu-dong-cam-on-khach-moi",
    title: "Chặng 51, Bài 5: Mini dự án: tự động gửi lời cảm ơn khi có khách điền biểu mẫu",
    subtitle: "Vẽ trọn một luồng ba bước từ biểu mẫu đến email cảm ơn và viết ra điều kiện để bạn tin nó chạy đúng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "💌",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước cho bạn từng mảnh: một câu quy tắc, việc đáng tự động, kích hoạt và hành động nhỏ. Bài này ghép chúng thành một luồng hoàn chỉnh trên giấy, kèm điều kiện để bạn tin luồng chạy đúng trước khi bật cho khách thật.",
    openingQuestion:
      "Khách điền biểu mẫu đăng ký tư vấn và bạn muốn gửi ngay email cảm ơn. Điều gì nên quyết định trước khi chọn công cụ?",
    openingOptions: [
      "Kích hoạt, các bước và kết quả bạn nhìn thấy ở mỗi bước",
      "Công cụ nào đang được nhiều người khen nhất trên mạng",
      "Email cảm ơn hay đến mức khách nào đọc cũng thấy xúc động",
      "Nên đặt giờ chạy lúc mấy giờ để khách khỏi thấy phiền",
    ],
    correctOption: 0,
    explanation:
      "Thiết kế đi trước công cụ: bạn cần biết điều gì làm luồng bắt đầu, các bước làm gì, và sẽ kiểm bằng cách nhìn cái gì. Công cụ chỉ là nơi ráp những thứ đó. Lời khen trên mạng không nói luồng của bạn cần gì, nội dung email là việc sau, và luồng theo biểu mẫu là theo sự kiện nên không cần đặt giờ.",
    diagram: [
      { label: "Khách điền biểu mẫu", arrow: true },
      { label: "Ghi thông tin khách vào bảng", arrow: true },
      { label: "Gửi email cảm ơn có tên khách", arrow: true },
      { label: "Bạn đối chiếu số biểu mẫu với số email đã gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người tư vấn tự do dùng biểu mẫu để khách đặt lịch trao đổi. Cô vẽ ra giấy trước: khi có biểu mẫu mới thì ghi khách vào bảng, rồi gửi email cảm ơn có tên khách và hẹn trả lời trong hai ngày làm việc. Cô chạy thử với ba dòng dữ liệu giả rồi mới bật. Sau hai tuần cô đếm: 12 biểu mẫu, 12 email cảm ơn, đủ. Số liệu trong tình huống này chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Luồng 'khách điền biểu mẫu thì gửi email cảm ơn' nên bắt đầu bằng kích hoạt nào?",
        options: [
          "Khi có biểu mẫu mới được gửi về",
          "Mỗi sáng 8 giờ quét xem có biểu mẫu nào chưa",
          "Khi bạn mở hộp thư lần đầu trong ngày",
          "Khi đủ 10 biểu mẫu mới được gom lại",
        ],
        correct: 0,
        explanation:
          "Khách điền xong muốn thấy cảm ơn sớm, nên theo sự kiện là hợp. Quét mỗi sáng làm khách đợi cả đêm. Đợi bạn mở hộp thư biến luồng thành phụ thuộc người, còn đợi đủ 10 biểu mẫu thì người điền đầu tiên có thể đợi nhiều ngày.",
      },
      {
        question: "Nội dung email cảm ơn cần lấy những thông tin nào từ biểu mẫu?",
        options: [
          "Tên và email của khách, vì cần gọi đúng tên và biết gửi tới đâu",
          "Chỉ số điện thoại của khách vì gọi nhanh hơn email",
          "Toàn bộ nội dung khách điền, cho chắc không thiếu thông tin",
          "Không cần lấy gì, email cảm ơn giống nhau cho mọi khách",
        ],
        correct: 0,
        explanation:
          "Email cần hai mẩu: tên để chào đúng và địa chỉ để gửi. Số điện thoại không giúp gửi email. Đưa toàn bộ nội dung khách điền vào thư có thể lộ thông tin không cần thiết, và thư không có tên khách đọc như thư hàng loạt.",
      },
      {
        question: "Vì sao chạy thử với vài dòng dữ liệu giả trước khi bật cho khách thật?",
        options: [
          "Để thấy luồng xử lý thế nào mà không ai bị gửi nhầm",
          "Để công cụ học thuộc dữ liệu của bạn và lần sau chạy nhanh hơn nhiều",
          "Vì luồng chỉ chạy đúng sau khi chạy thử ba lần",
          "Để khách biết đây là thư tự động",
        ],
        correct: 0,
        explanation:
          "Dữ liệu giả cho bạn thấy kết quả từng bước mà không gửi thư sai tới người thật. Công cụ không cần học thuộc, luồng không có quy tắc phải chạy thử đủ ba lần, và việc khách biết thư tự động hay không là chuyện nội dung thư chứ không phải chạy thử.",
      },
      {
        question: "Sau hai tuần bạn đếm: 20 biểu mẫu, 17 email cảm ơn đã gửi. Điều đầu tiên nên làm là gì?",
        options: [
          "Tìm 3 biểu mẫu không có email rồi xem ô nào bị trống hay sai",
          "Coi 85% là đủ tốt và không cần tìm tiếp",
          "Bật thêm một luồng thứ hai gửi lại cho cả 20 người",
          "Tắt luồng hẳn vì đã không đạt 100%",
        ],
        correct: 0,
        explanation:
          "Ba biểu mẫu chênh là manh mối cụ thể: có thể thiếu email, sai định dạng hoặc lỗi bước gửi. Coi 85% là đủ bỏ qua ba khách bị lờ. Gửi lại cho cả 20 người làm 17 người nhận trùng, còn tắt hẳn bỏ phí phần đã chạy đúng.",
      },
      {
        question: "Điều nào sau đây là điều kiện tốt để bạn tin luồng chạy đúng?",
        options: [
          "Số email cảm ơn đã gửi bằng số biểu mẫu nhận trong cùng kỳ",
          "Công cụ không hiện thông báo lỗi trong một tuần liền",
          "Có một khách trả lời 'cảm ơn' sau khi nhận thư nên coi như luồng ổn cả",
          "Bạn cảm thấy luồng chạy ổn vì chưa ai phàn nàn",
        ],
        correct: 0,
        explanation:
          "Đối chiếu số biểu mẫu với số email là phép kiểm đo được. Không có thông báo lỗi chưa chứng minh không bỏ sót, một khách trả lời chỉ nói về một thư, và cảm giác không phải bằng chứng vì khách không nhận thư thường im lặng.",
      },
    ],
    keyTakeaways: [
      "Thiết kế luồng trên giấy trước, chọn công cụ sau.",
      "Luồng nhỏ có ba phần: kích hoạt, các bước, cách kiểm.",
      "Chạy thử bằng dữ liệu giả để không ai bị gửi nhầm.",
      "Điều kiện tin luồng đúng phải đo được: số đầu vào bằng số đầu ra.",
      "Khi số không khớp, tìm đúng những dòng lệch thay vì làm lại tất cả.",
    ],
    practicePrompt: {
      question:
        "Bạn vẽ luồng: khi có biểu mẫu mới thì ghi vào bảng rồi gửi email cảm ơn. Thiếu phần nào so với một luồng hoàn chỉnh?",
      options: [
        "Cách kiểm: đối chiếu số biểu mẫu với số email đã gửi",
        "Một bước xoá biểu mẫu sau khi gửi thư",
        "Giờ chạy cố định vào mỗi sáng",
        "Tên công cụ sẽ dùng để dựng luồng",
      ],
      correct: 0,
      explanation:
        "Luồng đã có kích hoạt và các bước; thiếu cách kiểm để biết nó chạy đúng. Xoá biểu mẫu làm mất dữ liệu khách, giờ chạy cố định không cần với luồng theo sự kiện, và tên công cụ chọn sau khi thiết kế xong.",
    },
    summary: {
      keyIdea: "Một luồng nhỏ hoàn chỉnh gồm kích hoạt, vài bước nhỏ và một cách kiểm đo được.",
      formula: "Khi [biểu mẫu mới] thì [ghi bảng] rồi [gửi email]; kiểm: số biểu mẫu = số email.",
      commonMistake: "Bật luồng ngay cho khách thật mà chưa chạy thử bằng dữ liệu giả.",
      action: "Vẽ ra giấy luồng ba bước của bạn kèm một dòng 'tôi tin nó chạy đúng khi...'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Vẽ trên giấy luồng 'khách điền biểu mẫu thì cảm ơn' của bạn hoặc một luồng tương tự ở công việc: ghi kích hoạt, ba bước (mỗi bước một việc và một kết quả) và một câu 'Tôi tin nó chạy đúng khi...' dùng hai con số có thể đếm được. Soạn thêm ba dòng dữ liệu giả để thử. Mai dashboard sẽ hỏi bạn câu kiểm đó.",
      secondary: "Nếu bạn chưa có biểu mẫu thật, dùng bất kỳ việc nào bạn nhận theo dạng đơn: đặt lịch, xin báo giá, đăng ký sự kiện.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có một biểu mẫu đăng ký tư vấn, và mỗi khi có người điền, bạn mất vài phút viết thư cảm ơn thủ công. Bài này ráp bốn bài trước thành một luồng hoàn chỉnh trên giấy, trước khi bạn động vào bất kỳ công cụ nào.",
      },
      {
        type: "feynman",
        title: "Một luồng hoàn chỉnh đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung quầy lễ tân một phòng khám nhỏ: khách tới ghi tên vào sổ, lễ tân mỉm cười nói 'Cảm ơn chị, bác sĩ sẽ gọi trong hai ngày', cuối ngày đếm số khách trong sổ so với số phiếu hẹn đã phát. Đó chính là một luồng ba bước có kiểm.",
        columns: ["Thành phần", "Quầy lễ tân", "Luồng tự động"],
        rows: [
          ["Kích hoạt", "Khách bước vào quầy", "Có biểu mẫu mới được gửi về"],
          ["Bước 1", "Ghi tên vào sổ", "Ghi khách vào bảng"],
          ["Bước 2", "Nói lời cảm ơn và hẹn", "Gửi email cảm ơn có tên khách"],
          ["Kiểm tra cuối ngày", "Số tên trong sổ so với số phiếu hẹn", "Số biểu mẫu so với số email đã gửi"],
        ],
        oneLiner: "Luồng hoàn chỉnh là quầy lễ tân có sổ: nhận, ghi, cảm ơn, và cuối ngày đếm lại.",
      },
      { type: "heading", text: "Ba phần phải có trên giấy" },
      {
        type: "paragraph",
        text: "Một luồng nhỏ cần ba thứ trước khi dựng: kích hoạt (điều gì xảy ra trước), các bước nhỏ (mỗi bước một việc và một kết quả), và cách kiểm (hai con số bạn đếm được và so với nhau). Thiếu phần thứ ba, bạn chỉ có hy vọng chứ chưa có luồng.",
      },
      {
        type: "flow",
        title: "Luồng cảm ơn khách điền biểu mẫu",
        steps: [
          { label: "Khách điền biểu mẫu", detail: "Kích hoạt theo sự kiện: một biểu mẫu mới về. Bạn không cần làm gì." },
          { label: "Ghi khách vào bảng", detail: "Kết quả: một dòng mới có tên, email, ngày điền và cột 'đã cảm ơn' để trống." },
          { label: "Gửi email cảm ơn", detail: "Kết quả: thư có tên khách nằm trong mục đã gửi, và cột 'đã cảm ơn' được đánh dấu." },
          { label: "Bạn đối chiếu", detail: "Cuối tuần đếm số dòng trong bảng và số thư đã gửi. Hai số bằng nhau thì luồng đang đúng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bật ngay cho khách thật",
          text: "Dựng xong là bật. Một dòng thiếu email hay một ô lạ có thể làm luồng gửi nhầm hoặc bỏ sót, và bạn chỉ biết khi có khách nhắn hỏi.",
        },
        right: {
          label: "Chạy thử bằng dữ liệu giả",
          text: "Soạn ba dòng giả (một đúng, một thiếu email, một kỳ lạ) và xem từng bước cho ra gì. Sai thì sửa khi chưa ai nhận nhầm.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết câu kiểm 'tôi tin nó chạy đúng khi...'",
        task: "Luồng của bạn: biểu mẫu mới thì ghi bảng rồi gửi email cảm ơn. Lắp một prompt để AI đề xuất cách kiểm đo được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Tôi có một luồng tự động và muốn biết nó chạy ổn không.", feedback: "AI không biết luồng làm gì, nên sẽ trả về lời khuyên chung chung kiểu 'theo dõi thường xuyên'." },
              { text: "Luồng của tôi: khi có biểu mẫu mới thì ghi khách vào bảng rồi gửi email cảm ơn. Mỗi tuần khoảng 10 biểu mẫu.", good: true, feedback: "Có kích hoạt, hai bước và quy mô: AI đề xuất được phép đếm cụ thể." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Đề xuất hai con số tôi có thể đếm và so với nhau để biết luồng chạy đúng, và nêu việc cần làm khi chúng lệch nhau.", good: true, feedback: "Yêu cầu ra phép kiểm đo được và cả hành động khi lệch, nên bạn có quy trình chứ không chỉ con số." },
              { text: "Nói cho tôi nghe luồng này có tốt không.", feedback: "AI chưa thấy luồng chạy thật nên chỉ khen chung. Bạn cần phép đo chứ không cần lời nhận xét." },
            ],
          },
          {
            id: "format",
            label: "Khuôn đầu ra",
            options: [
              { text: "Trả lời bằng một câu dạng 'Tôi tin luồng chạy đúng khi số A bằng số B', rồi ba gạch đầu dòng ngắn.", good: true, feedback: "Khuôn này cho câu bạn chép thẳng vào ghi chú luồng và đọc lại sau sáu tháng." },
              { text: "Viết một bài phân tích dài về quản trị quy trình.", feedback: "Bài dài bọc quanh vài ý chung, làm bạn mất thời gian mà không có câu dùng được." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Tôi tin luồng chạy đúng khi số dòng mới trong bảng bằng số email cảm ơn đã gửi trong cùng tuần.\n\n- Mỗi cuối tuần đếm hai số và so với nhau.\n- Nếu lệch, tìm những dòng có cột 'đã cảm ơn' còn trống.\n- Kiểm ô email của các dòng đó: trống, thiếu dấu @ hay có khoảng trắng thừa.",
          },
          {
            requires: ["context"],
            text: "Bạn nên theo dõi luồng thường xuyên và xem có lỗi nào không. Nếu thấy vấn đề thì sửa.\n\n(Có đúng bối cảnh nhưng không đưa ra phép đếm cụ thể để bạn biết luồng đúng hay sai.)",
          },
          {
            text: "Luồng tự động thường đạt độ chính xác 99,9% nên bạn gần như không cần kiểm tra.\n\n(Con số 99,9% do AI tự bịa, không dựa trên luồng của bạn, và lời khuyên 'không cần kiểm tra' là chỗ nguy hiểm nhất.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bật luồng cảm ơn cho khách thật",
        start: "start",
        nodes: {
          start: {
            text: "Bạn đã vẽ xong luồng ba bước. Việc tiếp theo là gì?",
            choices: [
              { label: "Soạn ba dòng dữ liệu giả gửi thử về địa chỉ email của chính bạn", next: "test" },
              { label: "Bật luôn cho mọi khách vì luồng đơn giản", next: "live" },
            ],
          },
          test: {
            text: "Thử xong bạn thấy dòng giả thiếu email làm bước gửi báo lỗi. Bạn làm gì?",
            choices: [
              { label: "Thêm bước kiểm: ô email trống thì dừng và báo bạn", next: "good" },
              { label: "Bỏ dòng giả đó đi vì khách thật ít khi bỏ trống", next: "skip" },
            ],
          },
          live: { text: "Hôm sau một khách điền sai email và luồng gửi lời cảm ơn vào một địa chỉ của người lạ. Bạn cũng không biết vì chưa có cách đếm đối chiếu. Bật luồng cho khách thật mà chưa thử là mạo hiểm.", ending: "bad" },
          skip: { text: "Khi một khách thật bỏ trống email, luồng báo lỗi và chẳng ai hay. Bạn đã thấy lỗi trong lúc thử mà lại bỏ qua, nên chính bạn gây ra sự cố.", ending: "bad" },
          good: { text: "Luồng xử lý được cả dòng thiếu email và bạn có cách đếm đối chiếu. Giờ bạn mới bật cho khách thật và yên tâm hơn nhiều.", ending: "good" },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Phép kiểm tốt luôn là hai con số có thể đếm được và so với nhau. 'Tôi thấy ổn' không phải phép kiểm.",
      },
      {
        type: "closing",
        lines: [
          "Vẽ luồng trên giấy trước: kích hoạt, vài bước nhỏ, cách kiểm.",
          "Chạy thử bằng dữ liệu giả rồi mới bật cho khách thật.",
          "Tin luồng vì hai số khớp nhau, không phải vì không thấy lỗi.",
        ],
      },
    ],
  },
];
