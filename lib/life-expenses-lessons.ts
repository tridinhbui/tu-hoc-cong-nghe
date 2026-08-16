import type { Lesson } from "./lesson-types";

// Chặng 18 của track cá nhân: những khoản chi lớn trong đời.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Mười bảy chặng trước dạy cách kiếm, giữ và đầu tư
// tiền. Nhưng thứ thật sự làm hỏng kế hoạch tài chính của phần lớn hộ gia đình
// Việt Nam không phải đầu tư sai - mà là vài khoản chi lớn đến theo lịch của
// đời người: mua xe, cưới hỏi, sinh con, học phí, chăm bố mẹ già. Chúng đều
// BIẾT TRƯỚC được, và chính vì biết trước nên chúng không đáng phải xử lý bằng
// một khoản vay gấp.
//
// GIỌNG CỦA CHẶNG. Không phán xét lựa chọn sống của ai. Một đám cưới lớn hay
// một chiếc xe tốt có thể hoàn toàn xứng đáng - chặng này chỉ đòi hỏi con số
// được nhìn thấy trước khi quyết định, thay vì hiện ra sau đó.
//
// Ids 370-377 nối tiếp Chặng 17 (360-367), chừa 368-369 làm chỗ chèn.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const LIFE_EXPENSES_LESSONS: Lesson[] = [
  {
    id: 370,
    slug: "khoan-chi-lon-biet-truoc",
    title: "Chặng 18, Bài 1: Khoản chi lớn nào cũng biết trước",
    subtitle: "Chúng không bất ngờ - chỉ là không ai đặt tên cho chúng cho tới lúc phải trả",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🗓️",
    track: "personal",
    whyItMatters:
      "Phần lớn khoản chi lớn trong đời đến theo một lịch khá dễ đoán, nhưng chúng vẫn thường được xử lý như tình huống khẩn cấp. Khác biệt giữa hai cách xử lý ấy - tích lũy dần hay vay gấp - có thể lên tới hàng chục phần trăm chi phí của cùng một việc.",
    openingQuestion: "Điều gì phân biệt một khoản chi lớn với một tình huống khẩn cấp thật?",
    openingOptions: [
      "Quy mô số tiền, vì khoản chi lớn luôn tốn kém hơn tình huống khẩn cấp",
      "Khả năng biết trước - khoản chi lớn thường có thể dự liệu trước nhiều năm",
      "Việc có được bảo hiểm chi trả hay không theo hợp đồng đã ký",
      "Trên thực tế, mức độ cấp bách phải xử lý ngay trong vòng vài ngày kể từ khi phát sinh",
    ],
    correctOption: 1,
    explanation:
      "Quỹ khẩn cấp tồn tại cho những việc bạn không lường trước: tai nạn, mất việc, hỏng hóc đột ngột. Cưới hỏi, sinh con, mua xe, học phí đại học của con - không việc nào trong số này bất ngờ. Chúng có thể dự liệu trước nhiều năm, và điều đó thay đổi hoàn toàn công cụ nên dùng: tích lũy dần vào một khoản riêng theo đúng mốc thời gian, thay vì phải vay gấp hoặc rút quỹ khẩn cấp. Chặng 12 đã có nguyên tắc này với tiền gửi kỳ hạn, và chương trình tiết kiệm theo mục tiêu ở Chặng 1 chính là công cụ dành cho nhóm này. Vấn đề không phải người ta không biết chúng sẽ tới, mà là chúng không được đặt tên và không được cho một dòng riêng trong kế hoạch cho tới lúc phải trả tiền.",
    diagram: [
      { label: "Liệt kê các khoản lớn sẽ tới", arrow: true },
      { label: "Gắn mỗi khoản với một mốc thời gian", arrow: true },
      { label: "Tích lũy dần vào khoản riêng theo mốc đó", arrow: true },
      { label: "Quỹ khẩn cấp giữ nguyên cho việc không lường trước" },
    ],
    realWorldExample: {
      company: "Cùng một đám cưới, hai cách trả tiền",
      description:
        "Hai cặp đôi cùng dự định cưới sau hai năm với ngân sách tương đương. Một cặp bắt đầu tích lũy ngay từ khi quyết định, chia đều theo tháng. Cặp kia để tới sát ngày rồi vay tiêu dùng cho phần thiếu. Cùng một đám cưới, nhưng cặp thứ hai trả thêm phần lãi vay trong nhiều tháng sau đó - và khoản nợ ấy đi cùng họ vào đúng giai đoạn có nhiều khoản chi mới nhất.",
    },
    quiz: [
      {
        question: "Vì sao không nên dùng quỹ khẩn cấp cho các khoản chi lớn đã biết trước?",
        options: [
          "Vì quỹ khẩn cấp dành cho việc không lường trước, và nó cần còn nguyên khi việc đó xảy ra",
          "Vì rút quỹ khẩn cấp sẽ bị ngân hàng tính phí phạt theo quy định",
          "Vì quỹ khẩn cấp không đủ lớn để chi trả cho bất kỳ khoản lớn nào",
          "Theo cách hiểu thường gặp, vì tiền trong quỹ khẩn cấp chỉ được dùng cho chi phí y tế của gia đình",
        ],
        correct: 0,
        explanation:
          "Dùng quỹ khẩn cấp cho một khoản đã biết trước nghĩa là khi việc thật sự bất ngờ xảy ra, bạn không còn lớp đệm nào. Và hai việc ấy hoàn toàn có thể rơi vào cùng một năm.",
      },
      {
        question: "Cách xử lý đúng với một khoản lớn dự kiến sau ba năm là gì?",
        options: [
          "Chia mục tiêu theo số tháng còn lại và tích lũy đều vào một khoản riêng",
          "Đầu tư số tiền hiện có vào cổ phiếu để có đủ nhanh hơn",
          "Chờ tới gần thời điểm rồi vay ngân hàng với lãi suất ưu đãi",
          "Giữ chung với quỹ khẩn cấp để đơn giản hóa việc quản lý tiền",
        ],
        correct: 0,
        explanation:
          "Ba năm là khung quá ngắn cho cổ phiếu - Chặng 13 đã nói khoản gắn với mốc cụ thể cần giá trị biết trước. Và giữ chung với quỹ khẩn cấp làm mờ ranh giới giữa hai loại tiền có mục đích khác nhau.",
      },
      {
        question: "Chi phí thật của việc để tới sát hạn mới lo là gì?",
        options: [
          "Lãi vay, và việc khoản nợ đó kéo dài vào giai đoạn có nhiều chi phí mới",
          "Phí phạt mà nhà cung cấp dịch vụ thu khi đặt gấp vào phút chót",
          "Thuế thu nhập cá nhân tăng lên khi rút một khoản tiền lớn",
          "Trong phần lớn trường hợp, mất cơ hội được hưởng các chương trình ưu đãi dành cho khách đặt sớm",
        ],
        correct: 0,
        explanation:
          "Đặt gấp đúng là đắt hơn ở một số dịch vụ, nhưng đó là khoản nhỏ. Chi phí lớn hơn nhiều là khoản vay - và nó thường tới đúng lúc đời sống vừa thêm nhiều khoản chi mới.",
      },
      {
        question: "Danh sách các khoản lớn nên được lập khi nào?",
        options: [
          "Ngay bây giờ, kể cả khi thời điểm phát sinh còn xa nhiều năm",
          "Khi khoản đầu tiên trong danh sách còn cách khoảng sáu tháng",
          "Sau khi đã hoàn thành mục tiêu tiết kiệm quỹ khẩn cấp đủ sáu tháng",
          "Chỉ khi thu nhập đã đủ cao để có thể tích lũy cho nhiều mục tiêu",
        ],
        correct: 0,
        explanation:
          "Lập danh sách sớm không đòi hỏi phải tích lũy ngay cho tất cả. Nó chỉ cho bạn biết những gì đang tới, và thời gian là biến quan trọng nhất - mỗi năm chờ thêm làm khoản phải để dành mỗi tháng tăng lên.",
      },
      {
        question: "Nếu một khoản lớn tới sớm hơn dự kiến thì sao?",
        options: [
          "Dùng phần đã tích lũy được và chỉ vay cho phần còn thiếu",
          "Hủy kế hoạch và dời lại tới khi tích lũy đủ toàn bộ số tiền",
          "Rút toàn bộ quỹ khẩn cấp vì đây là tình huống ngoài dự kiến",
          "Vay toàn bộ số tiền để giữ nguyên khoản đã tích lũy được",
        ],
        correct: 0,
        explanation:
          "Đây là lý do việc bắt đầu sớm có giá trị ngay cả khi chưa đủ: phần đã tích lũy trực tiếp làm nhỏ khoản phải vay, và khoản vay nhỏ hơn nghĩa là lãi ít hơn trong toàn bộ thời gian trả nợ.",
      },
    ],
    keyTakeaways: [
      "Khoản chi lớn khác tình huống khẩn cấp ở chỗ nó biết trước được",
      "Biết trước nghĩa là công cụ đúng là tích lũy dần, không phải vay gấp",
      "Quỹ khẩn cấp phải còn nguyên cho việc thật sự bất ngờ",
      "Bắt đầu sớm có giá trị ngay cả khi chưa đủ - nó làm nhỏ khoản phải vay",
    ],
    practicePrompt: {
      question:
        "Bạn dự định mua xe sau hai năm với ngân sách 500 triệu và hiện chưa để dành gì. Bước đầu tiên?",
      options: [
        "Chia 500 triệu cho 24 tháng để biết cần để dành bao nhiêu, rồi mở khoản riêng",
        "Về nguyên tắc, tìm hiểu các chương trình vay mua xe để chọn nơi có lãi suất thấp nhất",
        "Đầu tư khoản tiền hiện có để đạt mục tiêu nhanh hơn trong hai năm",
        "Chờ tới gần thời điểm mua rồi mới quyết định vay bao nhiêu",
      ],
      correct: 0,
      explanation:
        "Phép chia này làm hai việc: cho bạn con số cụ thể mỗi tháng, và cho biết mục tiêu có khả thi không. Nếu con số ấy vượt khả năng, bạn biết ngay từ bây giờ - còn kịp để dời mốc hoặc hạ ngân sách.",
    },
    summary: {
      keyIdea: "Khoản chi lớn không bất ngờ; điều bất ngờ chỉ là chúng chưa bao giờ được đặt tên trong kế hoạch",
      commonMistake: "Xử lý một việc biết trước nhiều năm bằng một khoản vay quyết định trong vài ngày",
      action: "Liệt kê mọi khoản chi lớn bạn dự kiến trong mười năm tới, kèm mốc thời gian.",
    },
    application: {
      title: "Danh sách mười năm",
      message:
        "Viết ra các khoản lớn có thể tới trong mười năm: xe, cưới, sinh con, học phí, sửa nhà, chăm bố mẹ. Với mỗi khoản, ghi năm dự kiến và số tiền ước tính.",
      secondary:
        "Chưa cần tích lũy cho tất cả ngay. Chỉ riêng việc nhìn thấy chúng cùng lúc đã đổi cách bạn quyết định những việc nhỏ hơn trong năm nay.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười bảy chặng trước nói về kiếm tiền, giữ tiền và đầu tư. Chặng này về thứ làm hỏng kế hoạch nhiều hơn cả: vài khoản chi lớn đến theo lịch của đời người, và gần như luôn được xử lý muộn hơn mức cần thiết.",
      },
      { type: "heading", text: "Biết trước là một tài sản" },
      {
        type: "paragraph",
        text: "Một tai nạn hay một đợt mất việc là việc bạn không chọn thời điểm. Một đám cưới, một chiếc xe, học phí đại học của con thì khác - bạn biết chúng đang tới, thường là biết trước nhiều năm. Thông tin ấy có giá trị thật, vì nó cho phép dùng một công cụ rẻ hơn hẳn: tích lũy dần thay vì vay gấp. Bỏ phí nó nghĩa là tự biến một việc có kế hoạch thành một tình huống phải xử lý.",
      },
      {
        type: "conceptTable",
        title: "Ba loại tiền cho ba loại việc",
        subtitle: "Trộn chúng với nhau là nguyên nhân phổ biến nhất khiến kế hoạch vỡ",
        concepts: [
          {
            vi: "Quỹ khẩn cấp",
            en: "Emergency fund",
            def: "Cho việc không lường trước. Phải rút được ngay và phải còn nguyên - dùng cho việc biết trước là làm hỏng chức năng của nó.",
          },
          {
            vi: "Quỹ mục tiêu",
            en: "Sinking fund",
            def: "Cho khoản lớn đã biết trước, gắn với một mốc. Tích lũy đều theo tháng, để ở nơi có giá trị biết trước vào đúng ngày cần.",
          },
          {
            vi: "Tiền đầu tư",
            en: "Investments",
            def: "Cho mục tiêu xa nhiều năm và không có mốc cứng. Đây là nơi duy nhất chấp nhận được biến động giá.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thời gian là biến bạn kiểm soát được nhiều nhất",
        text: "Với cùng một mục tiêu, mỗi năm bắt đầu sớm hơn làm khoản phải để dành mỗi tháng nhỏ đi rõ rệt. Đây là biến duy nhất trong bài toán này mà bạn quyết định được hoàn toàn - bạn không đổi được giá đám cưới hay giá xe, nhưng bạn đổi được thời điểm bắt đầu.",
      },
      {
        type: "closing",
        lines: [
          "Khoản chi lớn hiếm khi bất ngờ; điều bất ngờ là nó chưa bao giờ có một dòng riêng trong kế hoạch.",
          "Bài sau: chiếc xe, và vì sao giá mua là phần nhỏ nhất của câu chuyện.",
        ],
      },
    ],
  },
  {
    id: 371,
    slug: "chi-phi-so-huu-o-to",
    title: "Chặng 18, Bài 2: Mua xe - giá xe là phần nhỏ nhất",
    subtitle: "Chi phí sở hữu mỗi năm mới là con số quyết định bạn có nuôi nổi chiếc xe không",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🚗",
    track: "personal",
    whyItMatters:
      "Xe là khoản chi lớn được quyết định bằng ít thông tin nhất: người ta so giá xe và khoản trả góp hằng tháng, rồi phát hiện phần còn lại sau khi đã ký. Chi phí nuôi một chiếc xe mỗi năm thường lớn hơn nhiều so với hình dung ban đầu.",
    openingQuestion: "Khoản nào chiếm phần lớn nhất trong chi phí sở hữu một chiếc ô tô?",
    openingOptions: [
      "Xăng dầu, vì đây là khoản chi trực tiếp và đều đặn nhất mỗi tháng",
      "Khấu hao - phần giá trị chiếc xe mất đi theo thời gian",
      "Bảo dưỡng định kỳ và sửa chữa khi có hỏng hóc phát sinh",
      "Phí gửi xe hằng tháng và các loại phí đường bộ phải nộp",
    ],
    correctOption: 1,
    explanation:
      "Khấu hao là khoản lớn nhất và cũng là khoản duy nhất không có hóa đơn nào - nên hầu như không ai tính. Một chiếc xe mua hôm nay và bán lại sau năm năm mất đi một phần đáng kể giá trị, và phần mất ấy là chi phí thật của việc sở hữu, dù nó không bao giờ xuất hiện trong sao kê ngân hàng. Xăng dầu, bảo dưỡng, bảo hiểm, phí đường bộ và gửi xe đều là khoản thật và cộng lại không nhỏ, nhưng chúng thường thấp hơn khấu hao trong những năm đầu. Đó là lý do câu hỏi đúng không phải tôi có đủ tiền mua xe không, mà là tôi có nuôi nổi chiếc xe này mỗi năm không.",
    diagram: [
      { label: "Giá mua: khoản một lần", arrow: true },
      { label: "Khấu hao: lớn nhất, không có hóa đơn", arrow: true },
      { label: "Cộng xăng, bảo dưỡng, bảo hiểm, gửi xe", arrow: true },
      { label: "Tổng chia cho số năm là chi phí thật mỗi năm" },
    ],
    realWorldExample: {
      company: "Câu hỏi sai và câu hỏi đúng",
      description:
        "Người mua thường hỏi khoản trả góp mỗi tháng là bao nhiêu, và nếu con số đó nằm trong khả năng thì quyết định. Nhưng khoản trả góp chỉ là một phần: cộng thêm xăng, bảo dưỡng, bảo hiểm, phí đường bộ và chỗ gửi, chi phí thật mỗi tháng có thể cao hơn khoản trả góp đáng kể. Người tính đủ trước khi ký thường chọn một chiếc xe khác chiếc họ định chọn.",
    },
    quiz: [
      {
        question: "Vì sao khấu hao hay bị bỏ qua nhất?",
        options: [
          "Vì nó không có hóa đơn và chỉ hiện ra một lần duy nhất khi bạn bán xe",
          "Vì nó được nhà sản xuất chi trả trong thời gian còn bảo hành",
          "Vì nó chỉ áp dụng với xe cũ chứ xe mới thì giữ nguyên giá trị",
          "Trên thực tế, vì nó được tính vào giá bán ban đầu nên người mua không chịu thêm",
        ],
        correct: 0,
        explanation:
          "Chi phí không có hóa đơn thì không vào bảng chi tiêu, và không vào bảng thì không được ai cân nhắc. Nó chỉ hiện ra thành con số cụ thể vào đúng ngày bạn bán lại.",
      },
      {
        question: "Câu hỏi nào nên thay cho tôi có đủ tiền mua xe không?",
        options: [
          "Tôi có nuôi nổi chi phí sở hữu chiếc xe này mỗi năm không",
          "Chiếc xe này có giữ giá tốt hơn các mẫu cùng phân khúc không",
          "Tôi có được duyệt khoản vay trả góp cho chiếc xe này không",
          "Chiếc xe này có đủ tiện nghi cho nhu cầu của gia đình không",
        ],
        correct: 0,
        explanation:
          "Đủ tiền mua là câu hỏi về một thời điểm; nuôi nổi là câu hỏi về nhiều năm. Với một tài sản có chi phí vận hành đáng kể, câu thứ hai mới là câu quyết định.",
      },
      {
        question: "Vì sao xe cũ vài năm tuổi thường rẻ hơn về tổng chi phí sở hữu?",
        options: [
          "Vì phần khấu hao mạnh nhất đã do người chủ trước gánh",
          "Vì xe cũ được miễn phí đường bộ và bảo hiểm bắt buộc",
          "Vì xe cũ tiêu thụ nhiên liệu ít hơn xe mới cùng loại",
          "Vì xe cũ không cần bảo dưỡng định kỳ như xe còn bảo hành",
        ],
        correct: 0,
        explanation:
          "Tốc độ mất giá cao nhất rơi vào những năm đầu tiên. Đổi lại, xe cũ thường tốn hơn cho sửa chữa - nên đây là đánh đổi cần tính, không phải kết luận luôn đúng.",
      },
      {
        question:
          "Xe 800 triệu, sau 5 năm bán được 400 triệu. Khấu hao trung bình mỗi năm là bao nhiêu?",
        options: [
          "80 triệu (= 400 triệu chênh lệch chia cho 5 năm)",
          "160 triệu (= 800 triệu chia cho 5 năm sử dụng)",
          "40 triệu (= 400 triệu chia cho 10 năm tuổi thọ xe)",
          "400 triệu (= toàn bộ phần giá trị đã mất đi)",
        ],
        correct: 0,
        explanation:
          "80 triệu mỗi năm, tức khoảng 6,7 triệu mỗi tháng - trước khi tính bất kỳ khoản xăng, bảo dưỡng hay gửi xe nào. Con số này thường lớn hơn hẳn hình dung của người mua.",
      },
      {
        question: "Khi nào mua xe là quyết định tài chính hợp lý?",
        options: [
          "Khi bạn tính đủ chi phí mỗi năm và nó nằm trong khả năng mà không cắt vào mục tiêu khác",
          "Khi khoản trả góp hằng tháng thấp hơn mức bạn đang chi cho việc đi lại",
          "Khi ngân hàng phê duyệt khoản vay với lãi suất ưu đãi trong năm đầu",
          "Khi giá xe đang ở mức thấp nhất trong vài năm trở lại đây",
        ],
        correct: 0,
        explanation:
          "So khoản trả góp với chi phí đi lại hiện tại là so thiếu, vì nó bỏ qua toàn bộ chi phí vận hành mới phát sinh. Xe cũng mang lại giá trị không quy ra tiền được, và điều đó chính đáng - miễn là con số được nhìn thấy trước.",
      },
    ],
    keyTakeaways: [
      "Khấu hao thường là khoản lớn nhất, và nó là khoản duy nhất không có hóa đơn",
      "Câu hỏi đúng là nuôi nổi mỗi năm không, không phải đủ tiền mua không",
      "Xe cũ vài năm tuổi tránh được phần mất giá mạnh nhất, đổi lại tốn hơn cho sửa chữa",
      "Khoản trả góp chỉ là một phần của chi phí thật hằng tháng",
    ],
    practicePrompt: {
      question:
        "Bạn đang cân nhắc một chiếc xe và thấy khoản trả góp vừa khả năng. Việc cần làm trước khi ký?",
      options: [
        "Cộng đủ chi phí một năm gồm khấu hao ước tính, xăng, bảo dưỡng, bảo hiểm, gửi xe",
        "So khoản trả góp với số tiền bạn đang chi cho taxi và xe công nghệ",
        "Kiểm tra xem mẫu xe này có giữ giá tốt trên thị trường xe cũ không",
        "Theo kinh nghiệm phổ biến, thương lượng để được giảm giá hoặc tặng thêm gói bảo dưỡng miễn phí",
      ],
      correct: 0,
      explanation:
        "Ba việc còn lại đều hữu ích và đều là bước sau. Chỉ phép cộng đầu tiên trả lời được câu hỏi quyết định: chi phí thật mỗi tháng là bao nhiêu, và nó có cắt vào mục tiêu nào khác của bạn không.",
    },
    summary: {
      keyIdea: "Chi phí sở hữu mỗi năm mới là con số quyết định, và khấu hao thường là phần lớn nhất trong đó",
      commonMistake: "Quyết định dựa trên khoản trả góp hằng tháng, bỏ qua toàn bộ chi phí vận hành",
      action: "Tính tổng chi phí một năm của chiếc xe bạn đang cân nhắc, gồm cả khấu hao ước tính.",
    },
    application: {
      title: "Phép cộng một năm",
      message:
        "Ước tính giá bán lại sau năm năm để ra khấu hao mỗi năm. Cộng xăng, bảo dưỡng, bảo hiểm, phí đường bộ, chỗ gửi. Chia cho mười hai - đó là chi phí thật mỗi tháng.",
      secondary:
        "Đặt con số ấy cạnh khoản bạn đang chi cho việc đi lại hiện tại. Chênh lệch là phần bạn thật sự đang quyết định chi thêm.",
    },
    sections: [
      {
        type: "lead",
        text: "Xe là khoản chi lớn thứ hai của phần lớn hộ gia đình sau nhà, và là khoản được quyết định bằng ít thông tin nhất - thường chỉ bằng hai con số: giá xe và khoản trả góp.",
      },
      { type: "heading", text: "Khoản lớn nhất không có hóa đơn" },
      {
        type: "paragraph",
        text: "Khấu hao là phần giá trị chiếc xe mất đi theo thời gian. Nó không xuất hiện trong sao kê nào, không ai gửi hóa đơn, và nó chỉ hiện thành con số cụ thể vào đúng ngày bạn bán lại - lúc đó thì đã trả xong rồi. Với xe mới trong những năm đầu, khoản này thường lớn hơn toàn bộ xăng dầu và bảo dưỡng cộng lại.",
      },
      {
        type: "conceptTable",
        title: "Năm nhóm chi phí, chỉ nhóm đầu không có hóa đơn",
        subtitle: "Cộng đủ năm nhóm rồi chia cho mười hai mới ra chi phí thật mỗi tháng",
        concepts: [
          {
            vi: "Khấu hao",
            en: "Depreciation",
            def: "Giá mua trừ giá bán lại, chia cho số năm sử dụng. Thường là khoản lớn nhất và cũng là khoản duy nhất vô hình.",
          },
          {
            vi: "Nhiên liệu",
            en: "Fuel",
            def: "Khoản dễ thấy nhất nên hầu như luôn được tính. Phụ thuộc quãng đường thật chứ không phải mức công bố.",
          },
          {
            vi: "Bảo dưỡng và sửa chữa",
            en: "Maintenance",
            def: "Tăng dần theo tuổi xe. Đây là chỗ xe cũ lấy lại phần lợi thế về khấu hao.",
          },
          {
            vi: "Bảo hiểm và phí",
            en: "Insurance & fees",
            def: "Bảo hiểm, phí đường bộ, đăng kiểm. Cố định và dự tính được, nên dễ đưa vào bảng.",
          },
          {
            vi: "Chỗ gửi",
            en: "Parking",
            def: "Khoản mà người ở thành phố thường phát hiện sau khi đã mua. Ở một số nơi nó lớn ngang tiền xăng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chặng này không nói xe là quyết định sai",
        text: "Một chiếc xe mang lại thời gian, sự chủ động và những thứ không quy ra tiền được - và với nhiều gia đình, chúng hoàn toàn xứng đáng. Điều bài này đòi hỏi chỉ là con số được nhìn thấy TRƯỚC khi ký, thay vì hiện ra dần trong ba năm sau đó.",
      },
      {
        type: "closing",
        lines: [
          "Giá xe quyết định bạn mua được hay không; chi phí mỗi năm quyết định bạn giữ được hay không.",
          "Bài sau: đám cưới - nơi áp lực xã hội và ngân sách gặp nhau.",
        ],
      },
    ],
  },
  {
    id: 372,
    slug: "ngan-sach-cuoi-hoi",
    title: "Chặng 18, Bài 3: Cưới hỏi - ngân sách và áp lực",
    subtitle: "Chi phí trượt lên không phải vì một quyết định lớn, mà vì hai mươi quyết định nhỏ",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "💍",
    track: "personal",
    whyItMatters:
      "Đám cưới là khoản chi lớn đầu tiên của nhiều cặp đôi, và nó thường được quyết định trong trạng thái cảm xúc cao cùng áp lực từ nhiều phía. Đặt một ngân sách trước và biết trước cơ chế khiến nó trượt là cách giữ cho ngày vui không kéo theo một khoản nợ.",
    openingQuestion: "Vì sao ngân sách đám cưới thường vượt dự kiến?",
    openingOptions: [
      "Theo cách hiểu thường gặp, vì giá dịch vụ cưới thường tăng mạnh trong khoảng thời gian chuẩn bị",
      "Vì nhiều khoản nhỏ được thêm dần, mỗi khoản đều nhỏ so với tổng ngân sách",
      "Vì các nhà cung cấp thường báo giá thấp rồi tính thêm khi hoàn tất",
      "Vì số lượng khách mời luôn tăng gấp đôi so với danh sách ban đầu",
    ],
    correctOption: 1,
    explanation:
      "Cơ chế làm trượt ngân sách không phải một quyết định lớn mà là chuỗi quyết định nhỏ, mỗi lần chỉ thêm vài phần trăm. Nâng cấp hoa, thêm một hạng mục chụp ảnh, đổi sang thực đơn cao hơn một bậc - mỗi khoản đều nhỏ so với tổng nên rất khó từ chối, đặc biệt trong bối cảnh đây là dịp một lần. Nhưng hai mươi lần thêm vài phần trăm cộng lại thành một phần đáng kể. Giá dịch vụ tăng và khách mời thêm cũng có xảy ra, nhưng chúng là các khoản đơn lẻ và dễ nhận ra hơn nhiều. Cách phòng vệ hiệu quả là đặt ngân sách theo từng hạng mục ngay từ đầu, và ghi lại mỗi lần vượt - vì thứ vô hình là tổng, không phải từng khoản.",
    diagram: [
      { label: "Đặt ngân sách tổng và chia theo hạng mục", arrow: true },
      { label: "Mỗi nâng cấp nhỏ đều dễ chấp nhận riêng lẻ", arrow: true },
      { label: "Ghi lại từng lần vượt để thấy tổng", arrow: true },
      { label: "Quyết định trên tổng, không trên từng khoản" },
    ],
    realWorldExample: {
      company: "Hai mươi lần vài phần trăm",
      description:
        "Một cặp đôi đặt ngân sách và theo sát trong tháng đầu. Rồi từng hạng mục được nâng lên một bậc vì chênh lệch không đáng kể so với tổng: hoa, ảnh, thực đơn, xe, trang phục. Không lần nào là quyết định sai, và không lần nào đáng tranh cãi. Chỉ tới khi cộng hóa đơn cuối cùng thì con số mới hiện ra - và lúc đó mọi hợp đồng đã ký.",
    },
    quiz: [
      {
        question: "Cách hiệu quả nhất để ngân sách không trượt là gì?",
        options: [
          "Chia ngân sách theo hạng mục và ghi lại mỗi lần vượt so với dự kiến ban đầu",
          "Đặt một tổng ngân sách duy nhất và cố gắng không vượt qua nó",
          "Chọn gói dịch vụ trọn gói để mọi chi phí được cố định từ đầu",
          "Nhiều người vẫn cho rằng trả toàn bộ bằng tiền mặt để cảm nhận rõ hơn số tiền đang chi",
        ],
        correct: 0,
        explanation:
          "Một tổng duy nhất không giúp gì vì bạn không thấy mình đang ở đâu cho tới khi cộng lại ở cuối. Chia theo hạng mục biến mỗi lần vượt thành một con số cụ thể ngay tại thời điểm quyết định.",
      },
      {
        question: "Vì sao cụm dịp một lần trong đời lại nguy hiểm với ngân sách?",
        options: [
          "Vì nó khiến mọi khoản chi thêm trở nên có vẻ chính đáng và khó từ chối",
          "Trong phần lớn trường hợp, vì các nhà cung cấp tính phí cao hơn cho những sự kiện quan trọng",
          "Vì nó khiến người ta chọn dịch vụ ở phân khúc cao nhất thị trường",
          "Vì nó làm thời gian chuẩn bị bị rút ngắn nên phải quyết định gấp",
        ],
        correct: 0,
        explanation:
          "Đây là một khung nhìn chứ không phải một dịch vụ - nó không có giá, nhưng nó làm mọi lời từ chối trở nên khó nói. Nhận ra nó đang hoạt động là cách duy nhất giữ được ngân sách.",
      },
      {
        question: "Nên xử lý thế nào với áp lực từ gia đình hai bên về quy mô đám cưới?",
        options: [
          "Thống nhất trước ai chi khoản nào, vì người chi tiền nên là người quyết định",
          "Đáp ứng mọi mong muốn để giữ hòa khí giữa hai bên gia đình",
          "Vay thêm để tổ chức lớn hơn rồi trả dần sau khi cưới xong",
          "Giữ kín ngân sách thật với gia đình để tránh bị góp ý thêm",
        ],
        correct: 0,
        explanation:
          "Phần lớn căng thẳng đến từ việc không rõ ai quyết định cái gì. Gắn quyền quyết định với trách nhiệm chi trả làm mọi cuộc trao đổi trở nên cụ thể thay vì cảm tính.",
      },
      {
        question: "Tiền mừng cưới nên được tính vào ngân sách thế nào?",
        options: [
          "Không nên tính trước, vì nó không chắc chắn và thường thấp hơn kỳ vọng",
          "Tính đủ theo số khách mời để giảm phần phải chuẩn bị trước",
          "Trên thực tế, tính khoảng một nửa để có một con số thận trọng nhưng vẫn thực tế",
          "Tính đúng bằng chi phí tiệc vì hai khoản này thường bù trừ nhau",
        ],
        correct: 0,
        explanation:
          "Lập kế hoạch dựa trên một khoản thu chưa chắc chắn là cách phổ biến khiến các cặp đôi kết thúc với khoản nợ. Nếu nó về ít hơn dự tính, phần thiếu phải bù bằng vay - đúng lúc vừa có thêm nhiều khoản chi mới.",
      },
      {
        question: "Nguyên tắc nào giữ được cả ngày vui lẫn tình hình tài chính?",
        options: [
          "Quyết định quy mô dựa trên số tiền đã tích lũy, không dựa trên khả năng vay",
          "Chọn ngày cưới vào mùa thấp điểm để được giá dịch vụ tốt nhất",
          "Cắt giảm mọi hạng mục xuống mức tối thiểu có thể chấp nhận được",
          "Về nguyên tắc, tổ chức nhỏ trước rồi làm tiệc lớn sau khi tài chính ổn định hơn",
        ],
        correct: 0,
        explanation:
          "Cắt xuống tối thiểu không phải mục tiêu của bài này - một đám cưới lớn hoàn toàn chính đáng nếu được chuẩn bị. Điều quan trọng là quy mô xuất phát từ số tiền đã có, chứ không từ số tiền vay được.",
      },
    ],
    keyTakeaways: [
      "Ngân sách trượt vì nhiều quyết định nhỏ, không vì một quyết định lớn",
      "Chia theo hạng mục và ghi lại mỗi lần vượt - thứ vô hình là tổng",
      "Cụm dịp một lần trong đời là khung nhìn làm mọi lời từ chối khó nói",
      "Đừng tính trước tiền mừng; quy mô nên xuất phát từ tiền đã tích lũy",
    ],
    practicePrompt: {
      question:
        "Bạn đã đặt ngân sách và giờ đang cân nhắc nâng cấp hạng mục thứ năm, mỗi lần chỉ thêm vài phần trăm. Nên làm gì?",
      options: [
        "Cộng tất cả các lần nâng cấp lại và xem tổng đã vượt bao nhiêu",
        "Chấp nhận vì mỗi khoản đều nhỏ so với tổng ngân sách của đám cưới",
        "Từ chối mọi nâng cấp để giữ đúng ngân sách đã đặt ban đầu",
        "Bù bằng cách cắt một hạng mục khác xuống mức thấp nhất có thể",
      ],
      correct: 0,
      explanation:
        "Cộng lại là việc phá vỡ chính cơ chế làm trượt ngân sách - nó biến năm quyết định nhỏ thành một con số duy nhất để nhìn. Sau khi thấy con số ấy, bạn vẫn có thể chọn tiếp tục, và đó là một quyết định khác hẳn.",
    },
    summary: {
      keyIdea: "Ngân sách trượt qua nhiều bước nhỏ, nên phòng vệ phải là việc cộng lại thường xuyên",
      commonMistake: "Lập kế hoạch dựa trên tiền mừng dự kiến, và quyết định quy mô theo khả năng vay",
      action: "Chia ngân sách theo hạng mục và cộng lại tổng thực chi sau mỗi lần thay đổi.",
    },
    application: {
      title: "Một bảng và một cột thừa",
      message:
        "Lập bảng ngân sách theo hạng mục với hai cột: dự kiến và thực tế. Sau mỗi lần thay đổi, cộng cột thực tế. Con số tổng ấy là thứ duy nhất quan trọng.",
      secondary:
        "Thống nhất trước với gia đình hai bên ai chi khoản nào. Phần lớn căng thẳng về quy mô thực chất là căng thẳng về việc ai được quyết định.",
    },
    sections: [
      {
        type: "lead",
        text: "Với nhiều cặp đôi, đây là khoản chi lớn đầu tiên họ cùng quyết định - và nó diễn ra trong bối cảnh cảm xúc cao, áp lực nhiều phía, và một khung nhìn khiến mọi lời từ chối trở nên khó nói.",
      },
      { type: "heading", text: "Cơ chế làm ngân sách trượt" },
      {
        type: "paragraph",
        text: "Không ai quyết định vượt ngân sách. Người ta quyết định nâng hoa lên một bậc vì chênh lệch nhỏ, rồi thêm một hạng mục ảnh vì nó chỉ chiếm vài phần trăm, rồi đổi thực đơn vì khách sẽ nhớ. Mỗi quyết định đều hợp lý khi đứng riêng, và tất cả đều được so với TỔNG ngân sách - phép so ấy làm mọi khoản trông nhỏ. Chỉ khi cộng lại ở cuối thì tổng mới hiện ra, và lúc đó mọi hợp đồng đã ký.",
      },
      {
        type: "conceptTable",
        title: "Ba áp lực đặc thù của khoản chi này",
        subtitle: "Không áp lực nào có giá, nhưng cả ba đều đẩy con số lên",
        concepts: [
          {
            vi: "Dịp một lần trong đời",
            en: "Once in a lifetime",
            def: "Khung nhìn làm mọi khoản thêm trở nên chính đáng. Nhận ra nó đang hoạt động là cách duy nhất để vẫn quyết định được.",
          },
          {
            vi: "Kỳ vọng của gia đình",
            en: "Family expectations",
            def: "Xử lý bằng cách thống nhất trước ai chi khoản nào. Quyền quyết định nên đi cùng trách nhiệm chi trả.",
          },
          {
            vi: "So sánh với đám cưới khác",
            en: "Social comparison",
            def: "Bạn thấy kết quả của người khác mà không thấy cách họ trả tiền - kể cả khi đó là một khoản nợ còn đang trả.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng đưa tiền mừng vào phép tính",
        text: "Nó không chắc chắn về số lượng lẫn thời điểm, và lập kế hoạch dựa trên nó là cách phổ biến nhất khiến các cặp đôi bước vào hôn nhân cùng một khoản nợ. Cách an toàn là chuẩn bị đủ cho toàn bộ chi phí, rồi coi tiền mừng là phần thêm - nếu về nhiều thì đó là khoản khởi đầu cho quỹ chung.",
      },
      {
        type: "closing",
        lines: [
          "Chặng này không nói tiệc nhỏ tốt hơn tiệc lớn; nó chỉ nói con số nên được nhìn thấy trước.",
          "Bài sau: đứa con đầu lòng, và những khoản định kỳ mới đi kèm.",
        ],
      },
    ],
  },
  {
    id: 373,
    slug: "chi-phi-sinh-con-nam-dau",
    title: "Chặng 18, Bài 4: Sinh con - năm đầu và những khoản định kỳ mới",
    subtitle: "Khoản một lần thì ai cũng chuẩn bị; phần đổi đời sống là nhóm chi phí lặp lại",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "👶",
    track: "personal",
    whyItMatters:
      "Chi phí sinh nở được chuẩn bị khá kỹ vì nó có mốc rõ ràng. Thứ ít được tính là nhóm khoản định kỳ mới xuất hiện sau đó và kéo dài nhiều năm - cùng với việc thu nhập gia đình có thể giảm trong một giai đoạn.",
    openingQuestion: "Thay đổi tài chính lớn nhất khi có con đầu lòng thường là gì?",
    openingOptions: [
      "Theo cách hiểu thường gặp, chi phí sinh nở và các khoản chuẩn bị một lần trước khi bé chào đời",
      "Một nhóm chi phí định kỳ mới, cộng với khả năng thu nhập giảm một giai đoạn",
      "Chi phí y tế phát sinh đột xuất trong những tháng đầu sau sinh",
      "Nhu cầu chuyển sang một chỗ ở rộng hơn ngay trong năm đầu tiên",
    ],
    correctOption: 1,
    explanation:
      "Khoản một lần - sinh nở, đồ dùng ban đầu - có mốc rõ ràng nên hầu hết gia đình đều chuẩn bị. Thứ làm thay đổi bức tranh tài chính là nhóm định kỳ xuất hiện sau đó: sữa và đồ dùng, khám định kỳ và tiêm chủng, và về sau là chi phí gửi trẻ. Chúng không lớn từng khoản nhưng chúng lặp lại mỗi tháng trong nhiều năm. Đồng thời, một trong hai người có thể giảm giờ làm hoặc nghỉ một giai đoạn, nên thu nhập giảm đúng lúc chi tăng. Hai chuyển động ngược chiều này là lý do năm đầu tiên thường căng hơn nhiều so với dự tính dựa trên chi phí sinh nở.",
    diagram: [
      { label: "Khoản một lần: có mốc, dễ chuẩn bị", arrow: true },
      { label: "Nhóm định kỳ mới: lặp lại nhiều năm", arrow: true },
      { label: "Thu nhập có thể giảm cùng lúc", arrow: true },
      { label: "Hai chuyển động ngược chiều gặp nhau ở năm đầu" },
    ],
    realWorldExample: {
      company: "Chuẩn bị đúng thứ, thiếu thứ còn lại",
      description:
        "Một gia đình để dành kỹ cho chi phí sinh nở và mua sắm ban đầu, và phần đó diễn ra đúng kế hoạch. Điều họ không tính là ba tháng sau: chi tiêu hằng tháng cao hơn trước một khoản đều đặn, trong khi thu nhập giảm vì một người nghỉ chăm con. Khoản tích lũy chuẩn bị cho một sự kiện đã được dùng hết cho một sự kiện, còn giai đoạn kéo dài sau đó thì không có gì đỡ.",
    },
    quiz: [
      {
        question: "Vì sao nhóm chi phí định kỳ mới lại quan trọng hơn khoản một lần?",
        options: [
          "Vì chúng lặp lại mỗi tháng trong nhiều năm nên tổng lớn hơn nhiều",
          "Vì chúng không thể dự tính trước nên luôn gây bất ngờ cho gia đình",
          "Vì chúng phải thanh toán ngay không được trả góp như khoản một lần",
          "Vì chúng không được bảo hiểm y tế chi trả trong bất kỳ trường hợp nào",
        ],
        correct: 0,
        explanation:
          "Một khoản một lần dù lớn vẫn là một lần. Một khoản nhỏ hơn nhưng lặp lại hằng tháng trong ba năm cộng lại thường lớn hơn nhiều - và nó đòi hỏi một mức chi tiêu mới chứ không phải một lần rút tiền.",
      },
      {
        question: "Vì sao quỹ khẩn cấp nên được xem lại khi chuẩn bị có con?",
        options: [
          "Vì chi tiêu hằng tháng tăng lên nên mức đệm tính theo tháng cũng phải tăng theo",
          "Vì quỹ khẩn cấp được dùng để chi trả cho chi phí sinh nở",
          "Trong phần lớn trường hợp, vì ngân hàng yêu cầu tăng số dư tối thiểu khi có thêm thành viên",
          "Vì bảo hiểm y tế chỉ chi trả sau khi quỹ khẩn cấp đã dùng hết",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp được tính bằng số tháng chi tiêu. Khi chi tiêu hằng tháng tăng, cùng một số tiền trong quỹ đỡ được ít tháng hơn - nên nó cần lớn lên theo dù bạn không đụng tới nó.",
      },
      {
        question: "Khoản định kỳ nào thường lớn nhất trong vài năm đầu?",
        options: [
          "Chi phí gửi trẻ khi cả hai vợ chồng cùng đi làm trở lại",
          "Sữa và đồ dùng cho bé trong giai đoạn sơ sinh",
          "Khám định kỳ và tiêm chủng theo lịch của bé",
          "Theo kinh nghiệm phổ biến, quần áo và đồ chơi cần thay mới theo từng giai đoạn",
        ],
        correct: 0,
        explanation:
          "Ba khoản kia thật nhưng thường nhỏ hơn. Gửi trẻ là khoản lớn và nó xuất hiện đúng lúc gia đình vừa quay lại nhịp thu nhập bình thường, nên nó dễ bị bỏ qua khi lập kế hoạch từ trước.",
      },
      {
        question: "Nên chuẩn bị thế nào cho khả năng thu nhập giảm một giai đoạn?",
        options: [
          "Tích lũy trước một khoản đủ bù phần thu nhập thiếu trong giai đoạn đó",
          "Chờ tới khi thu nhập thật sự giảm rồi mới cắt giảm chi tiêu tương ứng",
          "Vay tiêu dùng để bù đắp trong vài tháng rồi trả lại sau khi đi làm",
          "Rút tiền từ các khoản đầu tư dài hạn đang có để bù phần thiếu",
        ],
        correct: 0,
        explanation:
          "Đây là khoản có thể dự tính khá chính xác: bạn biết ai nghỉ, nghỉ bao lâu, và thiếu bao nhiêu mỗi tháng. Một khoản biết trước rõ ràng như vậy thuộc nhóm tích lũy dần chứ không thuộc nhóm vay gấp.",
      },
      {
        question: "Việc nào nên làm sớm nhất khi biết sẽ có con?",
        options: [
          "Ước tính mức chi tiêu hằng tháng mới và bắt đầu sống thử với mức đó",
          "Mua sắm đầy đủ đồ dùng cho bé để tránh giá tăng vào phút chót",
          "Trên thực tế, đăng ký sẵn chỗ gửi trẻ cho giai đoạn sau khi hết thời gian nghỉ",
          "Tăng hạn mức thẻ tín dụng để có sẵn nguồn dự phòng khi cần",
        ],
        correct: 0,
        explanation:
          "Sống thử với mức chi mới trong vài tháng làm hai việc: nó tạo ra khoản tích lũy từ phần chênh lệch, và nó cho biết mức ấy có sống được không - trong khi vẫn còn thời gian để điều chỉnh.",
      },
    ],
    keyTakeaways: [
      "Khoản một lần dễ chuẩn bị; nhóm định kỳ mới mới là thứ đổi bức tranh tài chính",
      "Thu nhập có thể giảm đúng lúc chi tăng - hai chuyển động ngược chiều gặp nhau",
      "Quỹ khẩn cấp tính theo tháng chi tiêu, nên nó phải lớn lên khi chi tiêu tăng",
      "Sống thử với mức chi mới từ sớm vừa tạo tích lũy vừa kiểm chứng khả năng",
    ],
    practicePrompt: {
      question:
        "Vợ chồng bạn dự định có con sau một năm. Việc chuẩn bị tài chính hiệu quả nhất là gì?",
      options: [
        "Ước tính chi tiêu mới, sống theo mức đó ngay từ bây giờ và để dành phần chênh",
        "Tập trung tích lũy cho chi phí sinh nở vì đó là khoản lớn nhất",
        "Mua bảo hiểm sức khỏe có quyền lợi thai sản với mức cao nhất có thể",
        "Chờ tới khi có tin vui rồi mới bắt đầu lập kế hoạch tài chính chi tiết",
      ],
      correct: 0,
      explanation:
        "Cách này giải quyết cả hai vấn đề cùng lúc: phần chênh lệch trở thành khoản tích lũy cho giai đoạn thu nhập giảm, và bạn biết trước mức chi mới có sống được không. Bảo hiểm hữu ích nhưng nó chỉ xử lý một phần của khoản một lần.",
    },
    summary: {
      keyIdea: "Khoản một lần có mốc nên được chuẩn bị; nhóm định kỳ kéo dài mới là phần đổi đời sống",
      commonMistake: "Chuẩn bị đủ cho chi phí sinh nở rồi không có gì đỡ cho giai đoạn nhiều năm sau đó",
      action: "Ước tính mức chi tiêu hằng tháng mới và bắt đầu sống theo mức đó ngay từ bây giờ.",
    },
    application: {
      title: "Sống thử mức chi mới",
      message:
        "Ước tính chi tiêu tăng thêm mỗi tháng khi có con, chuyển đúng khoản đó vào một tài khoản riêng mỗi tháng ngay từ bây giờ. Bạn vừa tích lũy vừa biết mức mới có sống được không.",
      secondary:
        "Tính riêng phần thu nhập sẽ thiếu nếu một người nghỉ, nhân với số tháng dự kiến. Đó là khoản thứ hai cần chuẩn bị và nó thường lớn hơn chi phí sinh nở.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về một sự kiện có ngày cụ thể. Bài này về một sự kiện mở ra một giai đoạn - và đó là khác biệt quyết định cách chuẩn bị.",
      },
      { type: "heading", text: "Một sự kiện và một giai đoạn" },
      {
        type: "paragraph",
        text: "Chi phí sinh nở là một sự kiện: có ngày, có con số ước tính được, và chuẩn bị xong là xong. Những gì đến sau thì khác hẳn - đó là một mức chi tiêu mới, cao hơn mức cũ, kéo dài nhiều năm. Chuẩn bị cho một sự kiện bằng một khoản tích lũy là đúng; chuẩn bị cho một giai đoạn thì cần một điều chỉnh trong dòng tiền hằng tháng, và đó là việc khác.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm thay đổi, ba cách chuẩn bị khác nhau",
        subtitle: "Chỉ nhóm đầu được chuẩn bị bằng một khoản tích lũy",
        concepts: [
          {
            vi: "Khoản một lần",
            en: "One-off costs",
            def: "Sinh nở, đồ dùng ban đầu. Có mốc và ước tính được, nên thuộc nhóm quỹ mục tiêu ở bài đầu chặng.",
          },
          {
            vi: "Chi phí định kỳ mới",
            en: "New recurring costs",
            def: "Sữa, khám định kỳ, sau đó là gửi trẻ. Cần một mức chi tiêu mới trong ngân sách, không phải một lần rút tiền.",
          },
          {
            vi: "Thu nhập giảm",
            en: "Income dip",
            def: "Một người nghỉ hoặc giảm giờ làm. Dự tính khá chính xác được, nên nó là khoản tích lũy riêng - và thường lớn hơn chi phí sinh nở.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quỹ khẩn cấp phải lớn lên theo",
        text: "Quỹ khẩn cấp được đo bằng số tháng chi tiêu, không bằng số tiền tuyệt đối. Khi chi tiêu hằng tháng tăng, cùng một số dư trong quỹ đỡ được ít tháng hơn trước - nên nó cần được bổ sung dù bạn không tiêu vào nó đồng nào. Đây là điều chỉnh dễ bị bỏ quên nhất trong cả giai đoạn.",
      },
      {
        type: "closing",
        lines: [
          "Chuẩn bị cho một ngày thì dùng một khoản tích lũy; chuẩn bị cho nhiều năm thì phải đổi ngân sách.",
          "Bài sau: học phí - khoản có thời gian chuẩn bị dài nhất và hay bị hoãn nhất.",
        ],
      },
    ],
  },
  {
    id: 374,
    slug: "hoc-phi-cho-con",
    title: "Chặng 18, Bài 5: Học phí cho con",
    subtitle: "Khoản có nhiều thời gian chuẩn bị nhất, và cũng là khoản bị hoãn nhiều nhất",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    whyItMatters:
      "Học phí đại học của con là khoản duy nhất trong chặng này có tới mười tám năm để chuẩn bị. Chính vì xa nên nó liên tục bị đẩy lùi cho những mục tiêu gần hơn, và tới lúc cần thì thời gian - lợi thế lớn nhất - đã bị tiêu hết.",
    openingQuestion: "Vì sao học phí đại học của con lại hay bị chuẩn bị muộn?",
    openingOptions: [
      "Vì chi phí giáo dục thường tăng nhanh hơn dự báo của các gia đình",
      "Vì nó ở quá xa nên luôn thua các mục tiêu gần hơn khi phân bổ tiền",
      "Vì phụ huynh kỳ vọng con sẽ tự lo được một phần chi phí học tập",
      "Vì các chương trình học bổng khiến việc chuẩn bị trở nên khó tính toán",
    ],
    correctOption: 1,
    explanation:
      "Mọi mục tiêu đều cạnh tranh cùng một dòng tiền, và mục tiêu gần luôn thắng mục tiêu xa trong cuộc cạnh tranh ấy - mua xe năm sau cảm thấy cấp bách hơn học phí mười lăm năm nữa. Nghịch lý là khoản xa nhất lại là khoản được lợi nhiều nhất từ thời gian: bắt đầu sớm mười năm làm giảm khoản phải để dành mỗi tháng đi rất nhiều, vì cả phần tích lũy lẫn phần sinh lời đều có thêm thời gian. Chi phí giáo dục tăng và học bổng đúng là hai biến số thật, nhưng chúng làm phép tính khó hơn chứ không giải thích được vì sao việc chuẩn bị bị hoãn.",
    diagram: [
      { label: "Khoản xa nhất, nhiều thời gian nhất", arrow: true },
      { label: "Nhưng luôn thua mục tiêu gần khi chia tiền", arrow: true },
      { label: "Mỗi năm hoãn làm khoản mỗi tháng tăng lên", arrow: true },
      { label: "Một khoản nhỏ tự động từ sớm thắng mọi ý định lớn" },
    ],
    realWorldExample: {
      company: "Mười lăm năm và năm năm",
      description:
        "Cùng một mục tiêu học phí, một gia đình bắt đầu khi con vừa sinh và một gia đình bắt đầu khi con vào cấp ba. Gia đình thứ nhất chia mục tiêu cho một trăm tám mươi tháng và phần tích lũy còn có thời gian sinh lời; gia đình thứ hai chia cho sáu mươi tháng và gần như không có phần sinh lời nào. Khoản phải để dành mỗi tháng của hai bên chênh nhau rất xa, cho cùng một kết quả.",
    },
    quiz: [
      {
        question: "Vì sao bắt đầu sớm lại quan trọng đặc biệt với mục tiêu này?",
        options: [
          "Vì thời gian dài cho phép chia mục tiêu ra nhiều tháng hơn và có thêm phần sinh lời",
          "Vì các trường đại học ưu tiên xét tuyển học sinh có quỹ học tập từ sớm",
          "Theo cách hiểu thường gặp, vì chi phí giáo dục chỉ tăng mạnh trong năm năm trước khi con vào đại học",
          "Vì ngân hàng chỉ cho vay học phí nếu gia đình đã tích lũy đủ một phần",
        ],
        correct: 0,
        explanation:
          "Hai hiệu ứng cộng lại: nhiều tháng hơn để chia, và nhiều năm hơn để phần đã tích lũy sinh lời. Đây chính là điều Chặng 3 nói về sức mạnh của thời gian, áp vào một mục tiêu cụ thể.",
      },
      {
        question: "Khoản tiền dành cho học phí nên được để ở đâu khi con còn nhỏ?",
        options: [
          "Kênh có khả năng tăng trưởng, rồi chuyển dần sang nơi an toàn khi tới gần mốc",
          "Tiền gửi kỳ hạn ngắn ngay từ đầu để bảo đảm an toàn tuyệt đối",
          "Nhiều người vẫn cho rằng cổ phiếu cho tới sát ngày cần dùng để tối đa hóa phần tăng trưởng",
          "Vàng vì nó giữ được giá trị qua khoảng thời gian dài nhiều năm",
        ],
        correct: 0,
        explanation:
          "Mười tám năm là khung đủ dài cho tài sản có biến động, nhưng một năm trước khi cần thì không. Chuyển dần sang nơi an toàn khi tới gần mốc là cách giữ được cả tăng trưởng lẫn chắc chắn.",
      },
      {
        question: "Vì sao mục tiêu xa luôn thua mục tiêu gần khi phân bổ tiền?",
        options: [
          "Vì mục tiêu gần tạo cảm giác cấp bách, còn mục tiêu xa thì luôn hoãn được thêm một năm",
          "Trong phần lớn trường hợp, vì mục tiêu xa khó ước tính số tiền nên không lập được kế hoạch cụ thể",
          "Vì các sản phẩm tài chính dài hạn có mức lãi suất thấp hơn ngắn hạn",
          "Vì thu nhập của gia đình thường chỉ đủ cho các nhu cầu trước mắt",
        ],
        correct: 0,
        explanation:
          "Chặng 10 gọi đây là thiên kiến hiện tại, và mục tiêu học phí là ví dụ rõ nhất của nó. Cách phòng vệ hiệu quả không phải cố gắng nhiều hơn mà là tự động hóa - để khoản đó rời tài khoản trước khi bạn kịp cân nhắc.",
      },
      {
        question:
          "Mục tiêu 600 triệu sau 15 năm so với sau 5 năm, khoản để dành mỗi tháng khác nhau thế nào?",
        options: [
          "Khoảng 3,3 triệu so với 10 triệu, chưa tính phần sinh lời",
          "Khoảng 3,3 triệu so với 5 triệu, vì thời gian gấp ba lần",
          "Bằng nhau vì tổng mục tiêu không thay đổi giữa hai trường hợp",
          "Khoảng 10 triệu so với 3,3 triệu, vì để dành lâu thì tốn hơn",
        ],
        correct: 0,
        explanation:
          "600 chia 180 tháng ra 3,3 triệu; 600 chia 60 tháng ra 10 triệu. Khoảng cách gấp ba lần này còn chưa tính phần sinh lời, vốn cũng nghiêng hẳn về phía bắt đầu sớm.",
      },
      {
        question: "Nên xử lý thế nào nếu chưa đủ khả năng tích lũy cho toàn bộ mục tiêu?",
        options: [
          "Bắt đầu với khoản nhỏ tự động, vì phần đã có luôn làm nhỏ khoản phải vay sau này",
          "Chờ tới khi thu nhập tăng đủ để tích lũy cho toàn bộ mục tiêu",
          "Bỏ mục tiêu này và dự định vay toàn bộ học phí khi tới thời điểm",
          "Ưu tiên các mục tiêu gần trước rồi quay lại mục tiêu này sau",
        ],
        correct: 0,
        explanation:
          "Chờ đủ khả năng là cách chắc chắn để không bao giờ bắt đầu, vì luôn có mục tiêu gần hơn. Một khoản nhỏ chạy tự động trong mười lăm năm cho kết quả lớn hơn nhiều so với một ý định lớn chưa từng bắt đầu.",
    },
    ],
    keyTakeaways: [
      "Đây là khoản có nhiều thời gian chuẩn bị nhất và bị hoãn nhiều nhất",
      "Mục tiêu gần luôn thắng mục tiêu xa - phòng vệ là tự động hóa, không phải cố gắng",
      "Khung dài cho phép dùng kênh tăng trưởng, rồi chuyển dần sang an toàn khi tới gần",
      "Một khoản nhỏ tự động từ sớm thắng một ý định lớn chưa bắt đầu",
    ],
    practicePrompt: {
      question:
        "Con bạn vừa sinh và bạn muốn chuẩn bị cho học phí đại học. Việc hiệu quả nhất ngay bây giờ?",
      options: [
        "Mở một khoản riêng và đặt lệnh chuyển tự động một số tiền nhỏ mỗi tháng",
        "Ước tính chính xác học phí sau mười tám năm rồi mới quyết định số tiền",
        "Chờ tới khi thu nhập ổn định hơn để có thể tích lũy khoản lớn hơn",
        "Đầu tư một khoản lớn ngay từ đầu để tận dụng tối đa thời gian",
      ],
      correct: 0,
      explanation:
        "Ước tính chính xác cho một mốc mười tám năm là việc không làm được, và chờ để làm được nó là một cách hoãn. Con số ban đầu không quan trọng bằng việc dòng chảy được bắt đầu và tự động - bạn điều chỉnh nó theo thu nhập về sau.",
    },
    summary: {
      keyIdea: "Lợi thế lớn nhất của mục tiêu này là thời gian, và hoãn lại chính là tiêu vào lợi thế đó",
      commonMistake: "Chờ tới khi ước tính được chính xác hoặc tới khi thu nhập đủ - cả hai đều là cách hoãn",
      action: "Mở một khoản riêng cho học phí và đặt lệnh chuyển tự động, dù số tiền còn nhỏ.",
    },
    application: {
      title: "Bắt đầu bằng con số nhỏ, ngay tuần này",
      message:
        "Mở một khoản riêng và đặt lệnh chuyển tự động mỗi tháng, dù chỉ vài trăm nghìn. Việc quan trọng là dòng chảy được bắt đầu; số tiền điều chỉnh sau theo thu nhập.",
      secondary:
        "Đặt lịch xem lại mỗi năm một lần, cùng dịp với buổi rà soát tiền gửi ở Chặng 12. Mỗi lần thu nhập tăng, nâng khoản này lên một chút trước khi nó kịp hòa vào chi tiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là khoản duy nhất trong chặng có tới mười tám năm để chuẩn bị. Nghịch lý là chính vì xa nên nó bị hoãn nhiều nhất - và mỗi năm hoãn tiêu vào đúng lợi thế lớn nhất của nó.",
      },
      { type: "heading", text: "Mục tiêu xa luôn thua trong cuộc cạnh tranh dòng tiền" },
      {
        type: "paragraph",
        text: "Mọi mục tiêu đều rút từ cùng một nguồn thu nhập. Khi phải chọn, mục tiêu có mốc gần luôn thắng - sửa nhà năm sau, đổi xe năm kia - vì mục tiêu xa lúc nào cũng hoãn thêm được một năm mà không thấy hậu quả gì. Chặng 10 gọi đây là thiên kiến hiện tại, và học phí là ví dụ điển hình nhất: hậu quả của việc hoãn chỉ hiện ra sau nhiều năm, khi không còn thời gian để sửa.",
      },
      {
        type: "callout",
        label: "Tự động hóa thắng ý chí, và nó thắng dễ dàng",
        text: "Chặng 1 đã nói điều này về ngân sách, và nó đúng gấp đôi ở đây vì khoảng thời gian dài hơn nhiều. Một lệnh chuyển tự động thực hiện quyết định của bạn hôm nay hai trăm lần trong mười lăm năm tới, không cần bạn nhớ lại một lần nào. Còn một ý định tốt thì phải được nhắc lại mỗi tháng, và nó sẽ thua vào tháng đầu tiên có việc gấp.",
      },
      {
        type: "list",
        items: [
          "Mở khoản riêng, đặt lệnh tự động, bắt đầu bằng con số bạn chắc chắn duy trì được",
          "Khung dài cho phép dùng kênh có tăng trưởng, không phải để hết ở tiền gửi",
          "Chuyển dần sang nơi an toàn khi còn khoảng ba tới năm năm trước mốc",
          "Mỗi lần thu nhập tăng, nâng khoản này trước khi phần tăng kịp hòa vào chi tiêu",
        ],
      },
      {
        type: "closing",
        lines: [
          "Với mục tiêu này, ngày bắt đầu quan trọng hơn số tiền bắt đầu.",
          "Bài sau: khoản mà gần như không ai lập kế hoạch - chăm bố mẹ khi về già.",
        ],
      },
    ],
  },
  {
    id: 375,
    slug: "chi-phi-cham-bo-me-gia",
    title: "Chặng 18, Bài 6: Chăm bố mẹ khi về già",
    subtitle: "Khoản lớn nhất mà gần như không gia đình nào đưa vào kế hoạch trước",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🤝",
    track: "personal",
    whyItMatters:
      "Đây là khoản chi lớn duy nhất trong chặng mà việc nói về nó bị coi là không phải phép, nên nó gần như không bao giờ được bàn trước. Kết quả là nó rơi xuống vào lúc cấp bách nhất, thường chia không đều giữa các anh chị em, và tạo ra cả áp lực tài chính lẫn rạn nứt gia đình.",
    openingQuestion: "Vì sao chi phí chăm sóc bố mẹ già hiếm khi được lập kế hoạch trước?",
    openingOptions: [
      "Trên thực tế, vì nó không dự đoán được về thời điểm lẫn quy mô nên không lập kế hoạch được",
      "Vì việc bàn về nó bị coi là nhạy cảm, nên cuộc trao đổi bị hoãn cho tới lúc khẩn cấp",
      "Vì bảo hiểm y tế đã chi trả phần lớn nên gia đình không cần chuẩn bị thêm",
      "Vì trách nhiệm này thuộc về người con trưởng nên các con khác không cần tính",
    ],
    correctOption: 1,
    explanation:
      "Rào cản chính không phải kỹ thuật mà là văn hóa: nói về chi phí chăm sóc bố mẹ dễ bị hiểu là tính toán với cha mẹ, nên cuộc trao đổi bị đẩy lùi. Thực tế thời điểm đúng là khó đoán nhưng khả năng xảy ra thì gần như chắc chắn, và một số việc hoàn toàn chuẩn bị được: biết bố mẹ có những nguồn thu nào, có bảo hiểm gì, và anh chị em thống nhất trước cách chia sẻ. Bảo hiểm y tế đỡ được phần điều trị nhưng không đỡ phần chăm sóc dài ngày, vốn là phần tốn kém nhất. Còn việc mặc định dồn cho một người con là nguyên nhân phổ biến nhất của cả gánh nặng tài chính lẫn mâu thuẫn về sau.",
    diagram: [
      { label: "Khả năng xảy ra gần như chắc chắn", arrow: true },
      { label: "Nhưng cuộc trao đổi bị hoãn vì nhạy cảm", arrow: true },
      { label: "Nên nó rơi xuống lúc cấp bách nhất", arrow: true },
      { label: "Và thường dồn lên một người" },
    ],
    realWorldExample: {
      company: "Cuộc trò chuyện muộn ba năm",
      description:
        "Một gia đình có ba anh chị em chưa từng bàn về việc này. Khi bố mẹ cần chăm sóc thường xuyên, người con sống gần nhất mặc nhiên gánh phần lớn cả tiền lẫn thời gian, hai người còn lại đóng góp không đều và không rõ ràng. Sau hai năm, vấn đề tài chính đã thành vấn đề quan hệ. Cùng những con số ấy, nếu được bàn từ trước khi cần, sẽ chỉ là một bảng phân chia.",
    },
    quiz: [
      {
        question: "Phần nào của chi phí chăm sóc thường lớn nhất và ít được bảo hiểm nhất?",
        options: [
          "Chăm sóc dài ngày - người trợ giúp, sinh hoạt hằng ngày, và thời gian của con cái",
          "Chi phí điều trị nội trú trong các đợt nằm viện ngắn hạn",
          "Theo cách hiểu thường gặp, thuốc men theo đơn được kê định kỳ hằng tháng cho bệnh mạn tính",
          "Chi phí đi lại giữa nhà và cơ sở y tế trong quá trình điều trị",
        ],
        correct: 0,
        explanation:
          "Bảo hiểm y tế được thiết kế cho điều trị, không cho chăm sóc. Phần chăm sóc dài ngày vừa tốn kém nhất vừa kéo dài nhất, và nó gần như hoàn toàn do gia đình gánh.",
      },
      {
        question: "Vì sao thời gian của con cái nên được tính là một chi phí?",
        options: [
          "Vì nó thường đồng nghĩa với giảm giờ làm hoặc nghỉ việc, tức thu nhập giảm thật",
          "Vì luật quy định con cái được hưởng trợ cấp khi chăm sóc cha mẹ",
          "Vì thời gian chăm sóc phải được quy đổi để chia đều giữa anh chị em",
          "Vì cơ quan bảo hiểm yêu cầu kê khai thời gian chăm sóc để chi trả",
        ],
        correct: 0,
        explanation:
          "Đây là phần vô hình lớn nhất và cũng là phần chia không đều nhất. Người ở gần thường gánh toàn bộ nó trong khi các khoản tiền mặt thì được chia - và sự bất cân đối ấy là nguồn của phần lớn mâu thuẫn.",
      },
      {
        question: "Cuộc trao đổi với anh chị em nên diễn ra khi nào?",
        options: [
          "Trước khi cần, khi mọi người còn bình tĩnh và không ai đang chịu áp lực",
          "Ngay khi bố mẹ bắt đầu cần chăm sóc thường xuyên hằng ngày",
          "Sau khi đã thấy rõ chi phí thực tế trong vài tháng đầu tiên",
          "Trong phần lớn trường hợp, chỉ khi người đang gánh chính không còn khả năng tiếp tục nữa",
        ],
        correct: 0,
        explanation:
          "Ba thời điểm còn lại đều là lúc đã có người đang chịu thiệt, nên cuộc trao đổi bắt đầu từ một trạng thái căng thẳng. Bàn trước biến nó thành một kế hoạch thay vì một cuộc thương lượng về việc ai đã làm nhiều hơn ai.",
      },
      {
        question: "Nội dung nào quan trọng nhất trong cuộc trao đổi đó?",
        options: [
          "Bố mẹ có những nguồn thu và bảo hiểm nào, và phần còn thiếu sẽ chia ra sao",
          "Ai sẽ là người trực tiếp chăm sóc bố mẹ khi tình huống xảy ra",
          "Theo kinh nghiệm phổ biến, tài sản của bố mẹ sẽ được phân chia thế nào giữa các anh chị em",
          "Bố mẹ muốn được chăm sóc ở nhà hay tại cơ sở chuyên biệt",
        ],
        correct: 0,
        explanation:
          "Ba nội dung kia đều cần bàn, nhưng chúng chỉ trả lời được sau khi biết bức tranh tài chính. Bắt đầu từ nguồn lực sẵn có làm cuộc trao đổi cụ thể và ít cảm tính hơn nhiều.",
      },
      {
        question: "Việc chuẩn bị tài chính cho khoản này nên có dạng thế nào?",
        options: [
          "Một khoản dự phòng riêng, tách khỏi quỹ khẩn cấp của chính gia đình bạn",
          "Trên thực tế, tăng quỹ khẩn cấp lên gấp đôi để bao được cả tình huống này và điều đó là hoàn toàn bình thường",
          "Mua bảo hiểm nhân thọ cho bố mẹ với mức quyền lợi cao nhất",
          "Chờ tới khi tình huống xảy ra rồi vay ngân hàng để xử lý",
        ],
        correct: 0,
        explanation:
          "Gộp vào quỹ khẩn cấp làm mờ ranh giới giữa hai loại rủi ro có thể xảy ra cùng lúc. Một khoản riêng giữ cho quỹ khẩn cấp của gia đình bạn còn nguyên chức năng của nó.",
      },
    ],
    keyTakeaways: [
      "Rào cản là văn hóa chứ không phải kỹ thuật - nói về nó bị coi là nhạy cảm nên bị hoãn",
      "Phần tốn kém nhất là chăm sóc dài ngày, và bảo hiểm y tế không đỡ phần đó",
      "Thời gian của con cái là chi phí thật và là phần chia không đều nhất",
      "Bàn trước khi cần biến một cuộc thương lượng căng thẳng thành một kế hoạch",
    ],
    practicePrompt: {
      question:
        "Bạn muốn bàn với anh chị em về việc chuẩn bị cho bố mẹ nhưng ngại mở lời. Cách bắt đầu hợp lý nhất?",
      options: [
        "Bắt đầu từ việc tìm hiểu nguồn thu và bảo hiểm hiện có của bố mẹ, rồi chia sẻ thông tin đó",
        "Về nguyên tắc, đề xuất luôn một phương án chia chi phí cụ thể để mọi người cho ý kiến nên thường không ai bận tâm",
        "Chờ tới dịp họp mặt gia đình đông đủ để bàn một lần cho xong",
        "Nói riêng với từng người để tránh tranh luận khi có mặt đầy đủ",
      ],
      correct: 0,
      explanation:
        "Bắt đầu bằng thông tin thay vì bằng đề xuất chia tiền làm cuộc trao đổi bớt nhạy cảm hẳn - nó trở thành việc cùng tìm hiểu tình hình chứ không phải việc phân công trách nhiệm ngay từ câu đầu.",
    },
    summary: {
      keyIdea: "Khoản này gần như chắc chắn xảy ra, và thứ duy nhất bị hoãn được là cuộc trao đổi về nó",
      commonMistake: "Để tới lúc cấp bách mới bàn, khi đã có người đang gánh và mọi thứ thành cảm tính",
      action: "Tìm hiểu bố mẹ đang có những nguồn thu và bảo hiểm nào - bắt đầu bằng thông tin.",
    },
    application: {
      title: "Bắt đầu bằng thông tin, không bằng đề xuất",
      message:
        "Tìm hiểu bố mẹ có lương hưu, bảo hiểm y tế và các nguồn thu nào. Chia sẻ thông tin ấy với anh chị em như một việc cùng tìm hiểu, không phải một đề xuất phân chia.",
      secondary:
        "Sau khi có bức tranh chung, phần còn thiếu và cách chia sẻ sẽ là một cuộc trao đổi cụ thể hơn nhiều - và dễ hơn nhiều so với bắt đầu từ câu hỏi ai đóng bao nhiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là khoản chi lớn duy nhất trong chặng mà rào cản không nằm ở tiền. Nó nằm ở chỗ nói về nó bị coi là không phải phép - nên cuộc trao đổi bị hoãn cho tới khi không hoãn được nữa.",
      },
      { type: "heading", text: "Ba phần chi phí, chỉ một phần được bảo hiểm" },
      {
        type: "conceptTable",
        title: "Bảo hiểm y tế đỡ được phần nào",
        subtitle: "Phần lớn nhất lại là phần không có cơ chế nào đỡ",
        concepts: [
          {
            vi: "Điều trị",
            en: "Medical treatment",
            def: "Nằm viện, thuốc men, phẫu thuật. Đây là phần bảo hiểm y tế được thiết kế để chi trả, và nó thường làm khá tốt việc đó.",
          },
          {
            vi: "Chăm sóc dài ngày",
            en: "Long-term care",
            def: "Người trợ giúp, sinh hoạt hằng ngày, cơ sở chăm sóc. Tốn kém nhất, kéo dài nhất, và gần như hoàn toàn do gia đình gánh.",
          },
          {
            vi: "Thời gian của con cái",
            en: "Family caregiving",
            def: "Giảm giờ làm hoặc nghỉ việc để chăm sóc. Không có hóa đơn nào nhưng là thu nhập giảm thật, và chia không đều nhất.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Sự bất cân đối giữa ba phần này giải thích vì sao vấn đề tài chính hay chuyển thành vấn đề quan hệ. Các khoản có hóa đơn thì dễ chia; phần thời gian thì không ai tính, và nó luôn dồn về người ở gần nhất. Sau vài năm, người gánh phần vô hình ấy thường cảm thấy bất công mà không nói ra được, vì phần họ mất không có con số nào để chỉ vào.",
      },
      {
        type: "callout",
        label: "Bắt đầu bằng thông tin, không bằng đề xuất chia tiền",
        text: "Câu hỏi anh em mình đóng bao nhiêu mỗi tháng gần như chắc chắn tạo ra phòng thủ. Câu hỏi bố mẹ đang có những nguồn nào thì không - nó là việc cùng tìm hiểu. Sau khi bức tranh đã rõ, phần còn thiếu tự nó đặt ra câu hỏi tiếp theo, và lúc đó cuộc trao đổi đã có cơ sở cụ thể thay vì cảm tính.",
      },
      {
        type: "closing",
        lines: [
          "Thứ duy nhất hoãn được ở đây là cuộc trao đổi, còn khoản chi thì không.",
          "Bài cuối chặng: xếp tất cả lên một trục thời gian.",
        ],
      },
    ],
  },
  {
    id: 376,
    slug: "ban-do-cac-khoan-lon-trong-doi",
    title: "Chặng 18, Bài 7: Tổng kết - bản đồ các khoản lớn",
    subtitle: "Sáu bài trước là sáu khoản rời rạc; đặt chúng lên một trục thời gian thì bức tranh đổi hẳn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🗺️",
    track: "personal",
    whyItMatters:
      "Từng khoản riêng lẻ đều xử lý được. Vấn đề chỉ hiện ra khi chúng chồng lên nhau - và chúng chồng lên nhau nhiều hơn người ta tưởng, vì phần lớn rơi vào cùng một quãng mười năm của đời người.",
    openingQuestion: "Vì sao nên đặt tất cả các khoản chi lớn lên cùng một trục thời gian?",
    openingOptions: [
      "Để thấy những năm có nhiều khoản chồng lên nhau và xử lý trước khi tới đó",
      "Để biết tổng số tiền cần chuẩn bị cho toàn bộ cuộc đời của mình",
      "Để so sánh xem khoản nào tốn kém nhất và nên ưu tiên cắt giảm",
      "Để trình bày kế hoạch tài chính với ngân hàng khi cần vay vốn",
    ],
    correctOption: 0,
    explanation:
      "Từng khoản đứng riêng thì đều nằm trong khả năng của phần lớn gia đình. Điều làm kế hoạch vỡ là sự chồng lấn: cưới hỏi, mua nhà, sinh con thường rơi vào cùng một quãng vài năm; rồi học phí của con và chăm sóc bố mẹ có thể rơi vào cùng một thập kỷ khác. Nhìn từng khoản một thì không bao giờ thấy điều đó. Một trục thời gian cho thấy ngay những năm nặng nhất, và biết trước thì có nhiều cách xử lý rẻ tiền: dời một khoản đi một hai năm, bắt đầu tích lũy sớm hơn cho khoản trùng, hoặc giảm quy mô của một trong hai. Cả ba đều dễ hơn nhiều so với việc xoay tiền khi hai khoản đã cùng tới.",
    diagram: [
      { label: "Vẽ trục thời gian mười lăm năm tới", arrow: true },
      { label: "Đặt từng khoản lớn vào năm dự kiến", arrow: true },
      { label: "Tìm những năm có hai khoản trở lên", arrow: true },
      { label: "Dời, giãn hoặc bắt đầu sớm hơn cho năm đó" },
    ],
    realWorldExample: {
      company: "Ba khoản trong hai năm",
      description:
        "Một cặp đôi lên kế hoạch cưới, rồi mua nhà, rồi sinh con - mỗi việc đều được cân nhắc riêng và đều nằm trong khả năng. Nhưng cả ba rơi vào hai năm liên tiếp: khoản trả trước mua nhà đi ngay sau đám cưới, và đứa con đầu lòng tới khi khoản vay vừa bắt đầu chuyển sang lãi thả nổi. Không quyết định nào sai; chỉ là chúng chưa bao giờ được nhìn cùng lúc trên một trang giấy.",
    },
    quiz: [
      {
        question: "Điều gì thường làm kế hoạch vỡ, dù từng khoản đều nằm trong khả năng?",
        options: [
          "Sự chồng lấn - nhiều khoản lớn rơi vào cùng một quãng vài năm",
          "Việc ước tính sai chi phí của từng khoản riêng lẻ ngay từ đầu",
          "Lạm phát làm mọi khoản đắt hơn dự kiến khi tới thời điểm chi",
          "Thu nhập không tăng đúng như kỳ vọng trong nhiều năm liên tiếp",
        ],
        correct: 0,
        explanation:
          "Ba yếu tố kia đều có thật và đều làm mọi thứ khó hơn. Nhưng chúng ảnh hưởng đều lên mọi khoản, còn sự chồng lấn thì tạo ra những năm đột biến - và đó là chỗ kế hoạch đứt.",
      },
      {
        question: "Cách xử lý rẻ nhất khi thấy hai khoản lớn rơi vào cùng một năm là gì?",
        options: [
          "Dời một khoản đi một hai năm, hoặc bắt đầu tích lũy sớm hơn cho nó",
          "Vay cho khoản nhỏ hơn và dùng tiền tích lũy cho khoản lớn hơn",
          "Rút quỹ khẩn cấp cho một khoản rồi bù lại trong các năm sau",
          "Nhiều người vẫn cho rằng chấp nhận và xử lý khi tới thời điểm vì kế hoạch xa hay thay đổi",
        ],
        correct: 0,
        explanation:
          "Hai cách này gần như không tốn gì và chúng chỉ làm được khi biết trước. Đó chính là giá trị của việc vẽ trục thời gian: nó cho bạn quyền lựa chọn trong khi các phương án còn rẻ.",
      },
      {
        question: "Quãng nào của đời người thường có nhiều khoản lớn chồng lên nhau nhất?",
        options: [
          "Giai đoạn lập gia đình và có con nhỏ, khi cưới, nhà và sinh con gần nhau",
          "Trong phần lớn trường hợp, giai đoạn mới đi làm, khi thu nhập còn thấp và chi phí sinh hoạt cao",
          "Giai đoạn sắp nghỉ hưu, khi thu nhập bắt đầu giảm dần theo tuổi",
          "Giai đoạn sau khi con cái đã trưởng thành và ra ở riêng",
        ],
        correct: 0,
        explanation:
          "Đây cũng là giai đoạn thu nhập thường chưa đạt đỉnh, nên áp lực đến từ cả hai phía. Biết trước điều này là lý do chính đáng nhất để bắt đầu tích lũy từ giai đoạn trước đó.",
      },
      {
        question: "Nên xem lại bản đồ này bao lâu một lần?",
        options: [
          "Mỗi năm một lần, cùng dịp với buổi rà soát tài chính hằng năm",
          "Mỗi tháng để cập nhật sát với tình hình thu chi thực tế",
          "Chỉ khi có một khoản lớn sắp tới trong vòng sáu tháng",
          "Năm năm một lần vì các mốc lớn trong đời hiếm khi thay đổi",
        ],
        correct: 0,
        explanation:
          "Hằng tháng là quá dày cho những mốc đo bằng năm, và năm năm thì đủ lâu để một mốc dịch chuyển mà không ai nhận ra. Gộp vào buổi rà soát hằng năm của Chặng 12 là cách ít tốn công nhất.",
      },
      {
        question: "Nếu một năm có ba khoản lớn cùng tới và không dời được thì sao?",
        options: [
          "Bắt đầu tích lũy sớm hơn nhiều năm, và xác định trước khoản nào sẽ giảm quy mô",
          "Vay toàn bộ cho hai khoản và chỉ tích lũy cho khoản còn lại",
          "Trên thực tế, hoãn cả ba khoản lại cho tới khi tình hình tài chính tốt hơn trong hầu hết các gia đình",
          "Rút toàn bộ các khoản đầu tư dài hạn để xử lý năm đó",
        ],
        correct: 0,
        explanation:
          "Xác định trước khoản nào sẽ giảm quy mô là phần quan trọng nhất và cũng hay bị bỏ qua nhất. Quyết định ấy nếu để tới lúc cấp bách sẽ được đưa ra dưới áp lực, và thường là quyết định tệ hơn.",
      },
    ],
    keyTakeaways: [
      "Từng khoản đều xử lý được; sự chồng lấn mới là thứ làm kế hoạch vỡ",
      "Giai đoạn lập gia đình thường có nhiều khoản chồng nhau nhất, đúng lúc thu nhập chưa đạt đỉnh",
      "Biết trước cho bạn ba cách xử lý rẻ: dời, giãn, hoặc bắt đầu sớm hơn",
      "Xác định trước khoản nào sẽ giảm quy mô, thay vì quyết định điều đó dưới áp lực",
    ],
    practicePrompt: {
      question:
        "Bạn vẽ trục thời gian và thấy năm thứ tư có cả mua nhà lẫn sinh con. Việc nên làm ngay?",
      options: [
        "Bắt đầu tích lũy song song cho cả hai từ bây giờ, và xác định khoản nào có thể dời",
        "Theo cách hiểu thường gặp, ưu tiên mua nhà trước vì đó là khoản lớn hơn nhiều so với sinh con",
        "Vay cho khoản mua nhà và dùng toàn bộ tích lũy cho việc sinh con",
        "Chờ tới năm thứ ba rồi đánh giá lại tình hình tài chính khi đó",
      ],
      correct: 0,
      explanation:
        "Bạn còn ba năm - đó là toàn bộ giá trị của việc nhìn thấy sớm. Chờ tới năm thứ ba là tự nguyện từ bỏ lợi thế duy nhất mà bản đồ này vừa mang lại cho bạn.",
    },
    summary: {
      keyIdea: "Vấn đề không nằm ở từng khoản mà ở những năm chúng chồng lên nhau",
      commonMistake: "Lập kế hoạch cho từng khoản riêng lẻ và không bao giờ nhìn chúng cùng lúc",
      action: "Vẽ trục thời gian mười lăm năm và đánh dấu mọi khoản lớn bạn dự kiến.",
    },
    application: {
      title: "Một trang giấy, mười lăm năm",
      message:
        "Kẻ một trục thời gian mười lăm năm tới. Đặt mọi khoản lớn vào năm dự kiến kèm số tiền ước tính. Khoanh tròn những năm có từ hai khoản trở lên - đó là danh sách việc cần xử lý trước.",
      secondary:
        "Dán nó cạnh bảng ngân sách và xem lại mỗi năm một lần. Mốc thời gian sẽ dịch chuyển, và điều đó bình thường - miễn là bạn thấy chúng dịch chuyển.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáu bài trước là sáu khoản chi được nhìn riêng lẻ. Bài này không thêm khoản nào - nó chỉ đặt tất cả lên cùng một trang giấy, và đó thường là lúc bức tranh đổi hẳn.",
      },
      { type: "heading", text: "Vấn đề là sự chồng lấn, không phải từng khoản" },
      {
        type: "paragraph",
        text: "Một đám cưới nằm trong khả năng. Một khoản trả trước mua nhà cũng vậy. Một đứa con cũng vậy. Nhưng ba việc ấy thường rơi vào cùng một quãng vài năm, và đó là quãng thu nhập chưa đạt đỉnh. Nhìn từng khoản một thì không bao giờ thấy được điều này - mỗi lần cân nhắc, bạn chỉ so một khoản với thu nhập hiện tại, chứ không so tổng của những gì đang tới.",
      },
      {
        type: "callout",
        label: "Biết trước cho bạn ba phương án đều rẻ",
        text: "Dời một khoản đi một hai năm. Giãn thời gian tích lũy ra dài hơn. Hoặc quyết định từ bây giờ khoản nào sẽ nhỏ lại nếu cả hai cùng tới. Cả ba đều gần như không tốn gì và cả ba chỉ làm được khi còn thời gian. Khi hai khoản đã cùng ập đến, lựa chọn duy nhất còn lại thường là vay - và đó là phương án đắt nhất.",
      },
      {
        type: "list",
        items: [
          "Vẽ trục mười lăm năm và đặt mọi khoản lớn vào năm dự kiến",
          "Khoanh những năm có từ hai khoản trở lên - đó là danh sách ưu tiên",
          "Với mỗi năm nặng, chọn trước: dời khoản nào, giảm quy mô khoản nào",
          "Xem lại mỗi năm một lần cùng buổi rà soát tài chính hằng năm",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 18. Không khoản nào trong sáu bài trước là bất ngờ - chúng chỉ chưa từng được nhìn cùng lúc.",
          "Và mọi phương án rẻ trong bài này đều có chung một điều kiện: còn thời gian.",
        ],
      },
    ],
  },
];
