import type { Lesson } from "./lesson-types";

// Chặng 19 của track cá nhân: y tế, bảo hiểm và rủi ro con người.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Track có vài bài bảo hiểm rải rác (283, 1353,
// 1761-1763) nhưng không bài nào nói về rủi ro Y TẾ như một bài toán tài chính:
// BHYT chi trả tới đâu, phần còn lại ai gánh, và vì sao một đợt bệnh nặng là
// nguyên nhân phá sản hộ gia đình phổ biến hơn mọi khoản đầu tư sai cộng lại.
//
// KHÔNG ĐIỀN interactiveType. Trường này tùy chọn, và widget-topic-match đã bắt
// nó sai chủ đề ở năm chặng liên tiếp trước đó.
//
// Ids 380-385 nối tiếp Chặng 18 (370-376).

export const HEALTH_RISK_LESSONS: Lesson[] = [
  {
    id: 380,
    slug: "rui-ro-y-te-la-rui-ro-tai-chinh",
    title: "Chặng 19, Bài 1: Rủi ro y tế là một bài toán tài chính",
    subtitle: "Nó tấn công đồng thời hai phía: chi phí tăng vọt và thu nhập dừng lại",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🏥",
    track: "personal",
    whyItMatters:
      "Một đợt bệnh nặng làm hỏng tài chính hộ gia đình nhanh hơn mọi khoản đầu tư sai, và nó làm điều đó theo cách ít ai chuẩn bị: không chỉ phát sinh chi phí lớn, mà còn cắt đứt nguồn thu trong đúng giai đoạn cần tiền nhất.",
    openingQuestion: "Vì sao rủi ro y tế nguy hiểm hơn phần lớn rủi ro tài chính khác?",
    openingOptions: [
      "Vì chi phí điều trị ở Việt Nam cao hơn so với thu nhập trung bình của người dân",
      "Vì nó vừa làm chi phí tăng vọt vừa làm thu nhập dừng lại trong cùng một giai đoạn",
      "Vì bảo hiểm y tế không chi trả cho phần lớn các loại bệnh thường gặp",
      "Vì thời điểm xảy ra hoàn toàn ngẫu nhiên nên không thể chuẩn bị trước gì",
    ],
    correctOption: 1,
    explanation:
      "Phần lớn rủi ro tài chính chỉ tấn công một phía. Mất việc làm giảm thu nhập nhưng không tạo ra chi phí mới lớn; một khoản đầu tư sai làm mất tiền nhưng không ảnh hưởng tới lương. Bệnh nặng làm cả hai cùng lúc: viện phí và thuốc men phát sinh trong khi người bệnh - và thường cả một người thân đi chăm - không đi làm được. Đây là lý do quỹ khẩn cấp tính theo tháng chi tiêu có thể không đủ cho tình huống này, vì nó được thiết kế cho trường hợp chi tiêu giữ nguyên mà thu nhập dừng, chứ không phải trường hợp chi tiêu tăng gấp nhiều lần. Bảo hiểm y tế có chi trả và chi trả đáng kể, nhưng nó không xử lý vế thu nhập.",
    diagram: [
      { label: "Chi phí điều trị tăng vọt", arrow: true },
      { label: "Thu nhập của người bệnh dừng lại", arrow: true },
      { label: "Thường thêm một người nghỉ để chăm", arrow: true },
      { label: "Hai vế cùng lúc - quỹ khẩn cấp thường không đủ" },
    ],
    realWorldExample: {
      company: "Hai vế cùng lúc",
      description:
        "Một gia đình có quỹ khẩn cấp đủ sáu tháng chi tiêu, tính theo mức chi bình thường. Khi một người mắc bệnh cần điều trị dài, chi tiêu hằng tháng tăng lên nhiều lần vì viện phí và thuốc ngoài danh mục, đồng thời hai nguồn thu nhập rút xuống còn một. Quỹ ấy - đúng theo mọi hướng dẫn - cạn trong chưa tới hai tháng.",
    },
    quiz: [
      {
        question: "Vì sao quỹ khẩn cấp thông thường có thể không đủ cho rủi ro y tế?",
        options: [
          "Vì nó giả định chi tiêu giữ nguyên, còn ở đây chi tiêu tăng nhiều lần",
          "Vì tiền trong quỹ khẩn cấp không được dùng cho mục đích y tế",
          "Vì bệnh viện yêu cầu thanh toán trước bằng tiền mặt, với số lượng vượt hạn mức rút thẻ",
          "Vì quỹ khẩn cấp thường được để ở nơi không rút ra ngay được",
        ],
        correct: 0,
        explanation:
          "Công thức sáu tháng chi tiêu được xây cho tình huống mất thu nhập. Rủi ro y tế phá vỡ chính giả định của công thức đó, nên nó cần một lớp bảo vệ riêng chứ không chỉ một quỹ lớn hơn.",
      },
      {
        question: "Vế nào của rủi ro y tế mà bảo hiểm y tế KHÔNG xử lý?",
        options: [
          "Phần thu nhập bị mất khi người bệnh và người chăm không đi làm được",
          "Chi phí thuốc men trong danh mục được chi trả theo quy định",
          "Chi phí giường bệnh và các dịch vụ kỹ thuật trong quá trình điều trị",
          "Chi phí xét nghiệm và chẩn đoán trước khi bắt đầu phác đồ điều trị",
        ],
        correct: 0,
        explanation:
          "Bảo hiểm y tế được thiết kế để chi trả chi phí điều trị, và nó làm việc đó. Vế thu nhập nằm ngoài phạm vi của nó hoàn toàn - đó là khoảng trống mà mỗi gia đình phải tự lấp.",
      },
      {
        question: "Vì sao một người thân nghỉ chăm cũng là chi phí đáng kể?",
        options: [
          "Vì nó làm mất thêm một nguồn thu nhập, thường trong nhiều tuần hoặc nhiều tháng",
          "Vì bệnh viện thu phí đối với người nhà ở lại chăm sóc người bệnh",
          "Vì người chăm cần được đào tạo chuyên môn trước khi hỗ trợ, và khóa đào tạo đó tốn phí",
          "Vì thời gian nghỉ chăm không được tính vào ngày phép hưởng lương",
        ],
        correct: 0,
        explanation:
          "Với hộ gia đình có hai nguồn thu, một đợt điều trị dài có thể xóa cả hai cùng lúc. Đây là phần vô hình và cũng là phần khiến tình huống xấu đi nhanh hơn mọi dự tính.",
      },
      {
        question: "Cách chuẩn bị hợp lý nhất cho rủi ro này là gì?",
        options: [
          "Kết hợp bảo hiểm y tế cho vế chi phí và một khoản dự phòng cho vế thu nhập",
          "Tăng quỹ khẩn cấp lên gấp ba lần mức sáu tháng chi tiêu, coi đó là lớp bảo vệ duy nhất",
          "Đầu tư nhiều hơn để có tài sản bán ra khi tình huống xảy ra",
          "Chờ tới khi có dấu hiệu sức khỏe bất thường rồi mới mua bảo hiểm",
        ],
        correct: 0,
        explanation:
          "Vì rủi ro có hai vế, phòng vệ cũng cần hai lớp. Bán tài sản khi đang cần tiền gấp là bán ở thời điểm tệ nhất, còn mua bảo hiểm sau khi có dấu hiệu thì thường đã muộn.",
      },
      {
        question: "Điều gì làm rủi ro y tế khác rủi ro mất việc?",
        options: [
          "Mất việc chỉ dừng thu nhập; bệnh nặng dừng thu nhập và tạo thêm chi phí lớn",
          "Mất việc có trợ cấp thất nghiệp, còn bệnh nặng thì không có khoản hỗ trợ nào từ nhà nước",
          "Mất việc luôn kéo dài lâu hơn so với một đợt điều trị bệnh nặng",
          "Mất việc có thể dự đoán trước còn bệnh tật thì hoàn toàn ngẫu nhiên",
        ],
        correct: 0,
        explanation:
          "Đây là điểm mấu chốt của cả bài. Cùng một khoản dự phòng đỡ được một tình huống mà không đỡ được tình huống kia, vì tình huống thứ hai tấn công từ hai hướng.",
      },
    ],
    keyTakeaways: [
      "Rủi ro y tế tấn công hai phía cùng lúc: chi phí tăng và thu nhập dừng",
      "Quỹ khẩn cấp tính theo tháng chi tiêu giả định chi tiêu giữ nguyên - giả định đó bị phá vỡ",
      "Bảo hiểm y tế xử lý vế chi phí, không xử lý vế thu nhập",
      "Người thân nghỉ chăm là phần vô hình làm tình huống xấu đi nhanh hơn dự tính",
    ],
    practicePrompt: {
      question:
        "Gia đình bạn có quỹ khẩn cấp đủ sáu tháng chi tiêu. Còn thiếu gì cho rủi ro y tế?",
      options: [
        "Một lớp bảo hiểm cho vế chi phí, vì quỹ đó chỉ được tính cho vế thu nhập",
        "Không thiếu gì, vì sáu tháng là mức khuyến nghị chuẩn cho mọi tình huống",
        "Cần tăng quỹ lên mười hai tháng để bao được cả trường hợp xấu nhất",
        "Cần chuyển quỹ sang nơi có lãi suất cao hơn để nó lớn nhanh hơn",
      ],
      correct: 0,
      explanation:
        "Tăng quỹ lên mười hai tháng có ích nhưng nó chỉ nhân đôi một lớp bảo vệ được thiết kế cho vế còn lại. Hai vế khác nhau cần hai công cụ khác nhau, và một trong hai rẻ hơn nhiều khi mua trước.",
    },
    summary: {
      keyIdea: "Đây là rủi ro duy nhất tấn công đồng thời cả chi phí lẫn thu nhập",
      commonMistake: "Tin rằng quỹ khẩn cấp sáu tháng đã bao được tình huống này",
      action: "Kiểm xem gia đình bạn có lớp bảo vệ nào cho vế chi phí ngoài BHYT không.",
    },
    application: {
      title: "Kiểm hai vế riêng biệt",
      message:
        "Với vế chi phí: bạn có BHYT không, và có lớp nào khác không. Với vế thu nhập: nếu người có thu nhập chính nghỉ ba tháng, gia đình sống bằng gì.",
      secondary:
        "Hai câu này thường cho hai câu trả lời rất khác nhau, và câu thứ hai là câu ít người từng đặt ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười tám chặng trước bàn về tiền: kiếm, giữ, đầu tư, chi. Chặng này bàn về thứ có thể xóa toàn bộ những gì đã xây, và nó làm điều đó theo một cách mà các công cụ trước không đỡ được.",
      },
      { type: "heading", text: "Vì sao hai vế lại khác một vế rất nhiều" },
      {
        type: "paragraph",
        text: "Quỹ khẩn cấp được tính bằng số tháng chi tiêu, và phép tính ấy giả định một điều: khi có chuyện, chi tiêu vẫn xấp xỉ như cũ còn thu nhập thì dừng. Giả định đó đúng với mất việc. Với một đợt điều trị dài, chi tiêu không giữ nguyên mà tăng lên nhiều lần, trong khi thu nhập có thể mất cả hai nguồn nếu một người thân phải nghỉ chăm. Cùng một quỹ, hai tình huống, hai kết quả rất khác nhau.",
      },
      {
        type: "conceptTable",
        title: "Hai vế, hai công cụ",
        subtitle: "Dùng một công cụ cho cả hai là chỗ phần lớn gia đình bị hụt",
        concepts: [
          {
            vi: "Vế chi phí",
            en: "Cost side",
            def: "Viện phí, thuốc, dịch vụ. Công cụ là bảo hiểm - BHYT làm nền, và các lớp bổ sung tùy điều kiện.",
          },
          {
            vi: "Vế thu nhập",
            en: "Income side",
            def: "Người bệnh và người chăm không đi làm được. Không bảo hiểm y tế nào đỡ phần này; nó cần một khoản dự phòng riêng.",
          },
          {
            vi: "Phần vô hình",
            en: "Hidden costs",
            def: "Đi lại, ăn ở khi điều trị xa nhà, thuê người hỗ trợ. Không lớn từng khoản nhưng kéo dài suốt đợt điều trị.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bảo hiểm là thứ chỉ mua được khi chưa cần",
        text: "Đây là đặc điểm quyết định cách lập kế hoạch: khi đã có dấu hiệu sức khỏe thì các lựa chọn thu hẹp lại rất nhanh, và những gì mua được thường loại trừ đúng điều bạn đang lo. Nghĩa là quyết định về lớp bảo vệ này phải được đưa ra trong lúc bạn thấy nó ít cần thiết nhất.",
      },
      {
        type: "closing",
        lines: [
          "Đây là rủi ro duy nhất trong cả track có thể xóa thành quả của mười tám chặng trước trong vài tháng.",
          "Bài sau: bảo hiểm y tế chi trả tới đâu, và phần còn lại là bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 381,
    slug: "bhyt-chi-tra-toi-dau",
    title: "Chặng 19, Bài 2: BHYT chi trả tới đâu",
    subtitle: "Một nền rất đáng có, và biết ranh giới của nó là điều kiện để lấp phần còn lại",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🪪",
    track: "personal",
    whyItMatters:
      "Bảo hiểm y tế là lớp bảo vệ rẻ nhất và rộng nhất mà phần lớn người Việt có. Nhưng nó có những ranh giới cụ thể, và không biết ranh giới ở đâu dẫn tới hai sai lầm ngược nhau: hoặc tưởng đã được bao trọn, hoặc tưởng nó vô dụng.",
    openingQuestion: "Điều gì quyết định mức BHYT chi trả cho một lần khám chữa bệnh?",
    openingOptions: [
      "Mức đóng bảo hiểm hằng tháng của người tham gia trong năm gần nhất",
      "Nhóm đối tượng tham gia, việc có đúng tuyến hay không, và dịch vụ có trong danh mục không",
      "Tổng thu nhập của hộ gia đình theo kê khai với cơ quan thuế",
      "Số năm người tham gia đã đóng bảo hiểm y tế liên tục không gián đoạn",
    ],
    correctOption: 1,
    explanation:
      "Ba yếu tố quyết định con số cuối cùng. Nhóm đối tượng tham gia quyết định tỷ lệ chi trả cơ bản. Việc khám đúng tuyến hay vượt tuyến làm thay đổi tỷ lệ ấy đáng kể - và đây là chỗ nhiều người mất tiền vì không biết trước. Và quan trọng nhất, chỉ những thuốc, vật tư và dịch vụ nằm trong danh mục mới được chi trả; phần ngoài danh mục do người bệnh tự trả toàn bộ, không phụ thuộc tỷ lệ nào. Số năm tham gia liên tục có ý nghĩa với một số quyền lợi nhất định, nhưng nó không phải yếu tố quyết định mức chi trả của một lần khám. Ba yếu tố này đều tra được trước khi cần, và biết chúng là cách duy nhất ước lượng được phần bạn phải tự gánh.",
    diagram: [
      { label: "Nhóm đối tượng: quyết định tỷ lệ cơ bản", arrow: true },
      { label: "Đúng tuyến hay vượt tuyến: đổi tỷ lệ đó", arrow: true },
      { label: "Trong hay ngoài danh mục: quyết định có được trả không", arrow: true },
      { label: "Phần ngoài danh mục do bạn gánh toàn bộ" },
    ],
    realWorldExample: {
      company: "Hai người cùng một bệnh, hai hóa đơn khác nhau",
      description:
        "Hai người cùng phác đồ điều trị. Người thứ nhất khám đúng tuyến và dùng thuốc trong danh mục; phần tự trả nhỏ. Người thứ hai vượt tuyến và có một phần thuốc ngoài danh mục; phần tự trả lớn hơn nhiều lần. Cả hai đều có thẻ, cả hai đều dùng đúng quyền lợi của mình - chỉ là một người biết ba yếu tố trên trước khi bắt đầu điều trị.",
    },
    quiz: [
      {
        question: "Chi phí ngoài danh mục được xử lý thế nào?",
        options: [
          "Người bệnh tự trả toàn bộ, không áp dụng tỷ lệ chi trả nào",
          "Vẫn được chi trả nhưng ở mức thấp hơn so với thuốc trong danh mục",
          "Được chi trả nếu bác sĩ điều trị xác nhận là cần thiết cho phác đồ",
          "Được cơ quan bảo hiểm xem xét hoàn lại sau khi kết thúc điều trị",
        ],
        correct: 0,
        explanation:
          "Đây là ranh giới cứng nhất và cũng là chỗ tạo ra các hóa đơn bất ngờ. Một phác đồ có thể phần lớn nằm trong danh mục nhưng vài hạng mục ngoài danh mục đã đủ tạo ra khoản tự trả lớn.",
      },
      {
        question: "Vì sao nên biết quy định về tuyến trước khi cần?",
        options: [
          "Vì đi đúng tuyến hay vượt tuyến làm thay đổi tỷ lệ chi trả đáng kể",
          "Vì bệnh viện tuyến trên từ chối tiếp nhận bệnh nhân không đúng tuyến",
          "Vì thẻ bảo hiểm chỉ có hiệu lực tại một cơ sở y tế duy nhất",
          "Vì thủ tục chuyển tuyến phải hoàn tất trước khi phát sinh bệnh",
        ],
        correct: 0,
        explanation:
          "Trong tình huống cấp cứu thì quy định khác, nhưng phần lớn lần khám chữa bệnh không phải cấp cứu. Với những lần đó, biết trước quy định là biết trước phần mình phải trả.",
      },
      {
        question: "Sai lầm nào phổ biến khi đánh giá BHYT?",
        options: [
          "Coi nó là bao trọn mọi chi phí, hoặc coi nó là không đáng có - cả hai đều sai",
          "Cho rằng mức đóng càng cao thì tỷ lệ chi trả càng lớn tương ứng",
          "Nghĩ rằng chỉ người có bệnh nền mới cần tham gia bảo hiểm y tế",
          "Tin rằng bảo hiểm y tế và bảo hiểm nhân thọ có thể thay thế cho nhau",
        ],
        correct: 0,
        explanation:
          "Hai thái cực dẫn tới hai hành vi đều tệ: một bên không chuẩn bị gì thêm, một bên không tham gia. Sự thật nằm ở giữa và nó cụ thể - biết ranh giới thì lấp được phần còn lại.",
      },
      {
        question: "Việc nào nên làm khi còn khỏe mạnh?",
        options: [
          "Tra tỷ lệ chi trả theo nhóm của mình và biết cơ sở đăng ký khám ban đầu ở đâu",
          "Đăng ký tại bệnh viện tuyến cao nhất có thể để được hưởng dịch vụ tốt",
          "Chuyển sang nhóm đối tượng có tỷ lệ chi trả cao hơn nếu đủ điều kiện",
          "Tích lũy số năm tham gia liên tục để nâng mức quyền lợi được hưởng",
        ],
        correct: 0,
        explanation:
          "Hai thông tin này mất vài phút để tra và chúng quyết định phần lớn con số bạn phải trả khi có việc. Chúng cũng là hai thông tin gần như không ai biết cho tới lúc cần.",
      },
      {
        question: "Vai trò đúng của BHYT trong kế hoạch tài chính là gì?",
        options: [
          "Lớp nền cho vế chi phí, cần được bổ sung chứ không phải được thay thế",
          "Giải pháp đầy đủ cho rủi ro y tế nếu tham gia liên tục nhiều năm",
          "Lớp dự phòng cuối cùng, chỉ dùng khi các nguồn khác đã cạn",
          "Khoản chi bắt buộc không mang lại giá trị tài chính đáng kể nào",
        ],
        correct: 0,
        explanation:
          "Nền tốt không có nghĩa là đủ, và không đủ không có nghĩa là vô ích. Cách nhìn đúng là xây tiếp lên trên nó, sau khi đã biết chính xác nó đỡ tới đâu.",
      },
    ],
    keyTakeaways: [
      "Ba yếu tố quyết định: nhóm đối tượng, đúng tuyến hay không, trong hay ngoài danh mục",
      "Phần ngoài danh mục do người bệnh tự trả toàn bộ - đây là ranh giới cứng nhất",
      "Hai sai lầm ngược nhau đều tệ: tưởng bao trọn, hoặc tưởng vô dụng",
      "Tra tỷ lệ chi trả và cơ sở đăng ký ban đầu là việc của vài phút, làm lúc còn khỏe",
    ],
    practicePrompt: {
      question:
        "Bạn muốn biết gia đình mình sẽ tự trả bao nhiêu nếu có đợt điều trị lớn. Bắt đầu từ đâu?",
      options: [
        "Tra nhóm đối tượng, tỷ lệ chi trả và cơ sở đăng ký ban đầu của từng người",
        "Hỏi người quen từng điều trị bệnh tương tự về số tiền họ đã phải trả",
        "Ước tính bằng cách lấy tổng chi phí điều trị trừ đi mức chi trả trung bình",
        "Chờ tới khi có việc rồi hỏi trực tiếp bộ phận tài chính của bệnh viện",
      ],
      correct: 0,
      explanation:
        "Con số của người khác không áp được vì ba yếu tố quyết định đều khác nhau theo từng người. Bắt đầu từ thông tin của chính gia đình bạn là cách duy nhất ra được một ước lượng dùng được.",
    },
    summary: {
      keyIdea: "BHYT là nền tốt với ranh giới cụ thể - biết ranh giới là điều kiện để lấp phần còn lại",
      commonMistake: "Không biết mình thuộc nhóm nào và đăng ký ở đâu, cho tới lúc cần dùng",
      action: "Tra nhóm đối tượng và cơ sở đăng ký khám ban đầu của từng người trong nhà.",
    },
    application: {
      title: "Ba thông tin cho mỗi người trong nhà",
      message:
        "Nhóm đối tượng tham gia, tỷ lệ chi trả tương ứng, và cơ sở đăng ký khám ban đầu. Ghi lại cho từng thành viên - đây là thông tin bạn cần lúc không có thời gian đi tra.",
      secondary:
        "Kiểm luôn thẻ của người lớn tuổi trong nhà còn hiệu lực không. Đây là nhóm dùng tới nhiều nhất và cũng là nhóm hay để thẻ hết hạn mà không biết.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước chia rủi ro y tế thành hai vế. Bài này về công cụ chính cho vế thứ nhất - và về việc nó dừng lại ở đâu, vì chính chỗ dừng ấy quyết định bạn cần chuẩn bị thêm bao nhiêu.",
      },
      { type: "heading", text: "Ba yếu tố quyết định con số cuối cùng" },
      {
        type: "list",
        items: [
          "Nhóm đối tượng tham gia - quyết định tỷ lệ chi trả cơ bản của bạn",
          "Đúng tuyến hay vượt tuyến - làm thay đổi tỷ lệ ấy, và đây là chỗ hay mất tiền vì không biết trước",
          "Trong hay ngoài danh mục - quyết định khoản đó có được chi trả hay không",
          "Cả ba đều tra được trước khi cần, và cả ba đều gần như không ai tra",
        ],
      },
      {
        type: "paragraph",
        text: "Yếu tố thứ ba là ranh giới cứng nhất và cũng gây bất ngờ nhiều nhất. Tỷ lệ chi trả chỉ áp cho phần nằm trong danh mục; những gì ngoài danh mục thì người bệnh trả toàn bộ, bất kể tỷ lệ của bạn là bao nhiêu. Một phác đồ có thể phần lớn được bảo hiểm nhưng vài hạng mục ngoài danh mục đã đủ tạo ra khoản tự trả đáng kể.",
      },
      {
        type: "callout",
        label: "Đừng để hai thái cực thay cho việc tra thông tin",
        text: "Người tin rằng bảo hiểm y tế bao trọn thì không chuẩn bị gì thêm và bị hụt khi có việc. Người tin rằng nó vô dụng thì bỏ qua lớp bảo vệ rẻ nhất mình có. Cả hai đều là kết luận thay cho việc bỏ ra mười lăm phút tra ba yếu tố cụ thể của chính mình.",
      },
      {
        type: "closing",
        lines: [
          "Một cái nền tốt vẫn cần biết nó cao tới đâu thì mới xây tiếp lên được.",
          "Bài sau: các lớp bổ sung, và cách chọn giữa chúng.",
        ],
      },
    ],
  },
  {
    id: 382,
    slug: "chon-lop-bao-hiem-bo-sung",
    title: "Chặng 19, Bài 3: Chọn lớp bảo hiểm bổ sung",
    subtitle: "Mua để không phá sản, không phải để được hoàn lại từng hóa đơn nhỏ",
    duration: "7 phút",
    difficulty: "Khó",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Bảo hiểm là sản phẩm dễ mua sai nhất trong tài chính cá nhân, vì người bán được trả hoa hồng theo phí và người mua thì so sánh bằng những tiêu chí không quyết định. Một nguyên tắc duy nhất loại được phần lớn lựa chọn không phù hợp.",
    openingQuestion: "Bảo hiểm nên được mua để phòng loại rủi ro nào?",
    openingOptions: [
      "Rủi ro xảy ra thường xuyên, để được hoàn lại nhiều lần trong năm",
      "Rủi ro ít xảy ra nhưng nếu xảy ra thì bạn không tự gánh nổi",
      "Rủi ro có mức thiệt hại vừa phải, để phí đóng không quá cao",
      "Mọi loại rủi ro, miễn là mức phí nằm trong khả năng chi trả",
    ],
    correctOption: 1,
    explanation:
      "Đây là nguyên tắc gốc của mọi loại bảo hiểm và nó loại bỏ phần lớn lựa chọn sai chỉ trong một câu. Rủi ro xảy ra thường xuyên với thiệt hại nhỏ thì tự gánh rẻ hơn, vì phí bảo hiểm phải bao gồm cả khoản chi trả dự kiến lẫn chi phí vận hành và lợi nhuận của công ty - nghĩa là về dài hạn, người mua trả nhiều hơn số nhận lại. Bảo hiểm chỉ có giá trị khi nó chuyển đi một rủi ro mà bạn không thể tự gánh: một đợt điều trị lớn có thể xóa nhiều năm tích lũy, và đó chính là loại rủi ro đáng trả phí để chuyển đi. Mua bảo hiểm cho mọi thứ nghe an toàn nhưng nó là cách trả phí quản lý cho những khoản lẽ ra nên nằm trong ngân sách thông thường.",
    diagram: [
      { label: "Rủi ro nhỏ, hay xảy ra: tự gánh rẻ hơn", arrow: true },
      { label: "Rủi ro lớn, hiếm xảy ra: chuyển đi bằng bảo hiểm", arrow: true },
      { label: "Phí luôn cao hơn khoản chi trả kỳ vọng", arrow: true },
      { label: "Nên chỉ đáng mua cho thứ bạn không tự gánh nổi" },
    ],
    realWorldExample: {
      company: "Hai hợp đồng cùng mức phí",
      description:
        "Một hợp đồng hoàn lại nhiều khoản khám nhỏ với hạn mức tổng khiêm tốn. Một hợp đồng gần như không trả gì cho khám thường nhưng có hạn mức lớn cho điều trị nội trú dài ngày. Cùng mức phí, và hợp đồng thứ nhất cho cảm giác đáng tiền hơn vì bạn nhận được tiền vài lần mỗi năm. Nhưng chỉ hợp đồng thứ hai xử lý được tình huống có thể xóa sạch tài chính gia đình.",
    },
    quiz: [
      {
        question: "Vì sao phí bảo hiểm luôn cao hơn khoản chi trả kỳ vọng?",
        options: [
          "Vì phí phải bao gồm cả chi phí vận hành và lợi nhuận của công ty bảo hiểm",
          "Vì công ty bảo hiểm phải trích lập dự phòng theo quy định, và phần đó tính hết vào phí",
          "Vì người mua bảo hiểm thường có rủi ro cao hơn mức trung bình dân số",
          "Vì phí được tính theo lạm phát dự kiến của nhiều năm trong tương lai",
        ],
        correct: 0,
        explanation:
          "Đây là lý do bảo hiểm không phải một khoản đầu tư và không nên được đánh giá bằng việc nhận lại bao nhiêu. Bạn trả một khoản chắc chắn để tránh một khoản không chắc chắn nhưng có thể rất lớn.",
      },
      {
        question: "Tiêu chí nào quan trọng nhất khi so hai hợp đồng?",
        options: [
          "Hạn mức chi trả cho tình huống xấu nhất, và danh sách các trường hợp loại trừ",
          "Số lượng quyền lợi được liệt kê trong bảng tóm tắt sản phẩm",
          "Uy tín và quy mô của công ty bảo hiểm trên thị trường, đo bằng số hợp đồng đã bán ra",
          "Mức phí đóng hằng năm so với thu nhập của gia đình bạn",
        ],
        correct: 0,
        explanation:
          "Số lượng quyền lợi dài không có nghĩa là bảo vệ tốt - nhiều quyền lợi nhỏ có hạn mức thấp. Hai con số quyết định là hạn mức khi tình huống xấu xảy ra, và những gì hợp đồng không trả.",
      },
      {
        question: "Danh sách loại trừ nên được đọc thế nào?",
        options: [
          "Đọc kỹ trước khi ký, vì nó định nghĩa những gì bạn KHÔNG được bảo vệ",
          "Bỏ qua vì đó là điều khoản tiêu chuẩn, giống hệt nhau ở mọi công ty bảo hiểm trên thị trường",
          "Đọc sau khi ký vì lúc đó mới có bản hợp đồng đầy đủ trong tay",
          "Chỉ cần hỏi tư vấn viên tóm tắt các điểm chính là đủ",
        ],
        correct: 0,
        explanation:
          "Phần này quyết định giá trị thật của hợp đồng nhiều hơn danh sách quyền lợi. Nó cũng là phần ít được nhắc tới nhất trong buổi tư vấn, vì lý do dễ hiểu.",
      },
      {
        question: "Vì sao mua bảo hiểm cho mọi rủi ro nhỏ lại kém hiệu quả?",
        options: [
          "Vì bạn trả thêm phần chi phí vận hành cho những khoản lẽ ra nằm trong ngân sách",
          "Vì công ty bảo hiểm sẽ từ chối chi trả nếu số lần yêu cầu bồi thường vượt mức cho phép",
          "Vì các hợp đồng nhỏ không được pháp luật bảo vệ như hợp đồng lớn",
          "Vì phí của nhiều hợp đồng nhỏ luôn cao hơn một hợp đồng lớn duy nhất",
        ],
        correct: 0,
        explanation:
          "Với khoản bạn tự gánh được, việc chuyển nó qua một bên trung gian chỉ thêm một lớp chi phí. Ngân sách và quỹ khẩn cấp là công cụ đúng cho nhóm rủi ro nhỏ và hay xảy ra.",
      },
      {
        question: "Thứ tự ưu tiên hợp lý khi ngân sách bảo hiểm có hạn là gì?",
        options: [
          "Bảo vệ trước những rủi ro có thể xóa sạch tài chính, rồi mới tới các rủi ro nhỏ hơn",
          "Chia đều ngân sách cho nhiều loại bảo hiểm để phân tán rủi ro tối đa",
          "Ưu tiên loại có mức phí thấp nhất, để với cùng ngân sách thì bảo vệ được nhiều tình huống nhất",
          "Ưu tiên loại có nhiều người quen đang tham gia vì đó là lựa chọn phổ biến",
        ],
        correct: 0,
        explanation:
          "Ngân sách chia đều nghe công bằng nhưng nó để hở đúng chỗ nguy hiểm nhất. Nguyên tắc gốc của bài này áp cho cả việc phân bổ ngân sách, không chỉ cho việc chọn sản phẩm.",
      },
    ],
    keyTakeaways: [
      "Mua bảo hiểm cho rủi ro ít xảy ra nhưng bạn không tự gánh nổi",
      "Phí luôn cao hơn khoản chi trả kỳ vọng - nên nó không phải khoản đầu tư",
      "Hai con số quyết định: hạn mức khi tình huống xấu, và danh sách loại trừ",
      "Rủi ro nhỏ hay xảy ra thuộc về ngân sách, không thuộc về bảo hiểm",
    ],
    practicePrompt: {
      question:
        "Tư vấn viên giới thiệu hợp đồng có hai mươi quyền lợi, hoàn tiền cả khám thường. Nên đánh giá thế nào?",
      options: [
        "Hỏi hạn mức cho tình huống nặng nhất và đọc danh sách loại trừ trước",
        "Đánh giá cao vì nhiều quyền lợi nghĩa là được bảo vệ rộng hơn",
        "So mức phí với các hợp đồng khác có cùng số lượng quyền lợi",
        "Chọn nếu tổng số tiền hoàn lại dự kiến mỗi năm vượt mức phí đóng",
      ],
      correct: 0,
      explanation:
        "Nếu tổng hoàn lại dự kiến vượt phí thì công ty đã lỗ - điều đó không xảy ra, nên phép tính ấy chắc chắn dựa trên giả định sai. Hai câu hỏi đầu tiên mới trả lời được hợp đồng này có làm đúng việc của bảo hiểm hay không.",
    },
    summary: {
      keyIdea: "Bảo hiểm đáng mua cho thứ bạn không tự gánh nổi, không cho thứ hay xảy ra mà nhỏ",
      commonMistake: "So sánh hợp đồng bằng số lượng quyền lợi thay vì bằng hạn mức và danh sách loại trừ",
      action: "Với mọi hợp đồng đang cân nhắc, đọc danh sách loại trừ trước khi đọc danh sách quyền lợi.",
    },
    application: {
      title: "Đọc ngược thứ tự",
      message:
        "Mở hợp đồng và đọc phần loại trừ trước, rồi mới đọc quyền lợi. Thứ tự này cho bạn bức tranh thật nhanh hơn nhiều so với thứ tự mà tài liệu bán hàng dẫn dắt.",
      secondary:
        "Sau đó hỏi đúng một câu: nếu tình huống xấu nhất xảy ra, hợp đồng này trả tối đa bao nhiêu. Con số ấy là giá trị thật của hợp đồng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước cho thấy BHYT dừng lại ở đâu. Bài này về việc xây tiếp lên trên - và về một nguyên tắc loại bỏ phần lớn sản phẩm không phù hợp chỉ trong một câu.",
      },
      { type: "heading", text: "Nguyên tắc gốc" },
      {
        type: "paragraph",
        text: "Bảo hiểm là việc trả một khoản chắc chắn và nhỏ để tránh một khoản không chắc chắn nhưng có thể rất lớn. Phép trao đổi ấy chỉ có lợi khi khoản không chắc chắn thật sự vượt khả năng gánh của bạn. Với rủi ro nhỏ và hay xảy ra, bạn đang trả thêm chi phí vận hành và lợi nhuận của công ty bảo hiểm cho một khoản mà ngân sách gia đình xử lý được - đó là chuyển giao không cần thiết.",
      },
      {
        type: "conceptTable",
        title: "Bốn loại rủi ro, chỉ một loại thuộc về bảo hiểm",
        subtitle: "Phân loại theo hai trục: khả năng xảy ra và mức thiệt hại",
        concepts: [
          {
            vi: "Hay xảy ra, thiệt hại nhỏ",
            en: "Frequent & small",
            def: "Khám thường, thuốc thông thường. Thuộc về ngân sách hằng tháng. Mua bảo hiểm cho nhóm này là trả thêm phí trung gian.",
          },
          {
            vi: "Hiếm xảy ra, thiệt hại nhỏ",
            en: "Rare & small",
            def: "Quỹ khẩn cấp xử lý được. Không đáng mua bảo hiểm và cũng không đáng lo nhiều.",
          },
          {
            vi: "Hiếm xảy ra, thiệt hại lớn",
            en: "Rare & severe",
            def: "Đây là nhóm duy nhất bảo hiểm làm đúng việc của nó: điều trị dài ngày, bệnh nặng, tai nạn nghiêm trọng.",
          },
          {
            vi: "Hay xảy ra, thiệt hại lớn",
            en: "Frequent & severe",
            def: "Thường không bảo hiểm được, hoặc phí rất cao. Nếu gặp nhóm này thì phải xử lý bằng cách giảm chính rủi ro đó.",
          },
        ],
      },
      {
        type: "callout",
        label: "Phần loại trừ quan trọng hơn phần quyền lợi",
        text: "Danh sách quyền lợi được thiết kế để đọc; danh sách loại trừ được thiết kế để có mặt. Nhưng chính phần thứ hai định nghĩa những gì bạn không được bảo vệ, và nó thường chứa đúng những tình huống mà người mua đang lo nhất. Đọc ngược thứ tự - loại trừ trước, quyền lợi sau - cho bạn bức tranh thật nhanh hơn hẳn.",
      },
      {
        type: "closing",
        lines: [
          "Bảo hiểm tốt là bảo hiểm bạn hy vọng không bao giờ phải dùng tới.",
          "Bài sau: khoảng trống mà không hợp đồng y tế nào lấp - vế thu nhập.",
        ],
      },
    ],
  },
  {
    id: 383,
    slug: "bao-ve-ve-thu-nhap",
    title: "Chặng 19, Bài 4: Bảo vệ vế thu nhập",
    subtitle: "Tài sản lớn nhất của phần lớn gia đình không phải nhà, mà là khả năng đi làm",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "💪",
    track: "personal",
    whyItMatters:
      "Người ta mua bảo hiểm cho xe và cho nhà, nhưng hiếm ai nghĩ tới việc bảo vệ thứ tạo ra tiền để mua cả hai. Với một người ba mươi tuổi, tổng thu nhập còn lại của cả đời làm việc thường lớn hơn nhiều so với mọi tài sản đang có.",
    openingQuestion: "Với một người ba mươi tuổi đi làm, tài sản có giá trị lớn nhất thường là gì?",
    openingOptions: [
      "Căn nhà đang ở hoặc bất động sản đang sở hữu nếu đã mua được",
      "Khả năng lao động - tổng thu nhập còn lại của những năm làm việc phía trước",
      "Danh mục đầu tư và các khoản tiết kiệm đã tích lũy được tới hiện tại",
      "Các khoản bảo hiểm và quyền lợi hưu trí đã tham gia từ khi đi làm",
    ],
    correctOption: 1,
    explanation:
      "Một người ba mươi tuổi còn khoảng ba mươi năm làm việc phía trước. Nhân thu nhập hằng năm với con số đó, tổng thường vượt xa giá trị căn nhà và toàn bộ khoản tích lũy hiện có. Nhưng đây là tài sản duy nhất mà gần như không ai nghĩ tới việc bảo vệ - trong khi chiếc xe rẻ hơn nhiều lần thì được mua bảo hiểm không do dự. Nguyên nhân một phần vì tài sản này vô hình: nó không có giấy tờ, không có giá niêm yết, và nó tạo ra tiền đều đặn tới mức người ta coi đó là mặc định. Nhận ra nó là một tài sản có giá trị đo được là bước đầu tiên để nghĩ tới việc bảo vệ nó.",
    diagram: [
      { label: "Thu nhập năm nhân số năm còn làm việc", arrow: true },
      { label: "Con số đó thường lớn hơn mọi tài sản đang có", arrow: true },
      { label: "Nhưng nó vô hình nên không ai nghĩ tới bảo vệ", arrow: true },
      { label: "Trong khi xe và nhà thì được bảo hiểm ngay" },
    ],
    realWorldExample: {
      company: "Phép nhân ít ai làm",
      description:
        "Một người ba mươi tuổi thu nhập ba trăm triệu mỗi năm, còn ba mươi năm làm việc. Chưa tính tăng lương, tổng thu nhập còn lại là chín tỷ - lớn hơn hẳn căn nhà hai tỷ mà họ đang trả góp và được mua bảo hiểm đầy đủ. Nếu khả năng lao động ấy mất đi, không tài sản nào trong nhà bù được, và khoản vay mua nhà vẫn còn nguyên đó.",
    },
    quiz: [
      {
        question: "Vì sao khả năng lao động ít khi được coi là tài sản?",
        options: [
          "Vì nó vô hình, không có giấy tờ và tạo ra tiền đều tới mức bị coi là mặc định",
          "Vì giá trị của nó thay đổi liên tục nên không định giá được",
          "Vì pháp luật không công nhận đây là một loại tài sản có thể sở hữu, chuyển nhượng hay thừa kế",
          "Vì nó không thể chuyển nhượng hay bán lại cho người khác",
        ],
        correct: 0,
        explanation:
          "Chúng ta bảo vệ những gì nhìn thấy được. Một tài sản không có hình dạng, không có sổ đỏ và vẫn hoạt động mỗi tháng thì rất khó được nhìn như một thứ có thể mất đi.",
      },
      {
        question: "Điều gì xảy ra với các nghĩa vụ tài chính khi khả năng lao động mất đi?",
        options: [
          "Chúng vẫn còn nguyên - khoản vay và chi phí sinh hoạt không giảm theo thu nhập",
          "Ngân hàng sẽ giãn nợ hoặc xóa nợ theo quy định về trường hợp bất khả kháng do bệnh tật",
          "Bảo hiểm y tế chi trả cả phần trả nợ trong thời gian người vay điều trị",
          "Các khoản chi tiêu tự giảm xuống vì người bệnh không còn sinh hoạt bình thường",
        ],
        correct: 0,
        explanation:
          "Đây là điểm khiến tình huống xấu đi nhanh: vế thu nhập biến mất trong khi mọi nghĩa vụ được thiết lập dựa trên vế đó vẫn tiếp tục. Khoản vay mua nhà là ví dụ rõ nhất.",
      },
      {
        question: "Ai cần bảo vệ vế thu nhập nhiều nhất?",
        options: [
          "Người có người phụ thuộc và có nghĩa vụ nợ dài hạn gắn với thu nhập của mình",
          "Người có thu nhập cao nhất trong nhóm bạn bè và đồng nghiệp",
          "Người trẻ mới đi làm, vì họ còn nhiều năm làm việc phía trước nên mất mát sẽ lớn nhất",
          "Người sắp nghỉ hưu vì khả năng lao động của họ đang giảm dần",
        ],
        correct: 0,
        explanation:
          "Người sắp nghỉ hưu ít cần nhất vì phần thu nhập còn lại đã nhỏ và tích lũy đã lớn. Yếu tố quyết định là có ai đang phụ thuộc vào dòng thu nhập ấy hay không.",
      },
      {
        question: "Quỹ khẩn cấp có thay thế được lớp bảo vệ này không?",
        options: [
          "Không - quỹ khẩn cấp bao được vài tháng, còn mất khả năng lao động là nhiều năm",
          "Có, nếu quỹ khẩn cấp được duy trì ở mức mười hai tháng chi tiêu",
          "Có, vì quỹ khẩn cấp được thiết kế cho đúng loại tình huống này",
          "Không, vì quỹ khẩn cấp chỉ dùng được cho chi phí y tế chứ không cho chi tiêu sinh hoạt",
        ],
        correct: 0,
        explanation:
          "Hai công cụ này xử lý hai khoảng thời gian rất khác nhau. Quỹ khẩn cấp là lớp đệm ngắn hạn; mất khả năng lao động là một thay đổi có thể kéo dài phần còn lại của cuộc đời làm việc.",
      },
      {
        question: "Bước đầu tiên hợp lý để đánh giá nhu cầu này là gì?",
        options: [
          "Tính tổng thu nhập còn lại và xem ai đang phụ thuộc vào dòng thu nhập đó",
          "So sánh phí của các sản phẩm bảo hiểm đang có trên thị trường",
          "Kiểm tra xem công ty nơi bạn làm việc có chế độ hỗ trợ nào cho trường hợp này không",
          "Tăng mức đóng bảo hiểm xã hội lên mức cao nhất được phép",
        ],
        correct: 0,
        explanation:
          "Ba việc kia đều là bước sau và chúng chỉ có ý nghĩa khi đã biết quy mô nhu cầu. Phép nhân đơn giản ở bước đầu thường là thứ khiến người ta lần đầu nhìn thấy vấn đề.",
      },
    ],
    keyTakeaways: [
      "Với người còn nhiều năm làm việc, khả năng lao động thường là tài sản lớn nhất",
      "Nó vô hình nên ít ai nghĩ tới bảo vệ, trong khi xe và nhà thì được bảo hiểm ngay",
      "Nghĩa vụ nợ và chi phí sinh hoạt không giảm theo khi thu nhập mất đi",
      "Quỹ khẩn cấp bao vài tháng; mất khả năng lao động có thể kéo dài nhiều năm",
    ],
    practicePrompt: {
      question:
        "Bạn ba mươi lăm tuổi, có con nhỏ và khoản vay mua nhà hai mươi năm. Việc nên làm là gì?",
      options: [
        "Tính tổng thu nhập còn lại, đối chiếu với nghĩa vụ nợ và nhu cầu của người phụ thuộc",
        "Tăng khoản trả nợ hằng tháng để rút ngắn thời gian còn nợ xuống",
        "Chuyển sang công việc ổn định hơn để giảm rủi ro mất thu nhập",
        "Tăng quỹ khẩn cấp lên mức mười hai tháng chi tiêu của gia đình",
      ],
      correct: 0,
      explanation:
        "Ba phương án còn lại đều hợp lý về mặt tài chính nhưng không phương án nào xử lý đúng rủi ro đang bàn. Chúng chỉ có ý nghĩa sau khi bạn biết quy mô của khoảng trống - và phép tính đầu tiên cho bạn con số đó.",
    },
    summary: {
      keyIdea: "Khả năng lao động là tài sản lớn nhất và cũng là tài sản ít được bảo vệ nhất",
      commonMistake: "Mua bảo hiểm cho xe và nhà nhưng không cho thứ tạo ra tiền để có cả hai",
      action: "Nhân thu nhập năm với số năm làm việc còn lại và đặt con số đó cạnh tài sản hiện có.",
    },
    application: {
      title: "Một phép nhân",
      message:
        "Thu nhập một năm nhân với số năm bạn dự định còn đi làm. Đặt con số ấy cạnh giá trị nhà, xe và các khoản tích lũy. Với phần lớn người dưới bốn mươi, kết quả gây bất ngờ.",
      secondary:
        "Rồi hỏi: nếu dòng thu nhập ấy dừng lại năm nay, ai đang phụ thuộc vào nó và họ sống bằng gì. Câu trả lời quyết định bạn cần lớp bảo vệ nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài đầu chặng chia rủi ro y tế thành hai vế. Hai bài vừa rồi nói về vế chi phí. Bài này về vế còn lại - vế mà không hợp đồng y tế nào chạm tới.",
      },
      { type: "heading", text: "Tài sản không ai định giá" },
      {
        type: "paragraph",
        text: "Chúng ta mua bảo hiểm cho chiếc xe vài trăm triệu và cho căn nhà vài tỷ, nhưng gần như không ai nghĩ tới thứ tạo ra tiền để mua cả hai. Với một người ba mươi tuổi, tổng thu nhập của những năm làm việc còn lại thường vượt xa mọi tài sản đang sở hữu. Nó vô hình vì không có giấy tờ, và nó hoạt động đều tới mức bị coi là mặc định - đúng hai lý do khiến một tài sản không được bảo vệ.",
      },
      {
        type: "callout",
        label: "Nghĩa vụ không biến mất cùng thu nhập",
        text: "Đây là chỗ tình huống xấu đi nhanh nhất. Khoản vay mua nhà được duyệt dựa trên thu nhập, tiền học của con được lên kế hoạch dựa trên thu nhập, và mức sống của cả gia đình được xây trên đó. Khi vế thu nhập biến mất, toàn bộ những thứ dựng trên nó vẫn còn nguyên - và chúng đòi được trả đúng hạn.",
      },
      {
        type: "list",
        items: [
          "Tính tổng thu nhập còn lại: thu nhập năm nhân số năm dự định làm việc",
          "Liệt kê ai đang phụ thuộc vào dòng thu nhập ấy và trong bao lâu",
          "Liệt kê các nghĩa vụ dài hạn gắn với nó - khoản vay, học phí, chi phí gia đình",
          "Khoảng trống giữa hai danh sách trên là quy mô lớp bảo vệ bạn cần",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chúng ta bảo vệ những gì nhìn thấy được, và thứ giá trị nhất thì thường không nhìn thấy.",
          "Bài cuối chặng: gộp cả hai vế thành một danh sách kiểm cho gia đình.",
        ],
      },
    ],
  },
  {
    id: 384,
    slug: "danh-sach-kiem-suc-khoe-tai-chinh",
    title: "Chặng 19, Bài 5: Tổng kết - danh sách kiểm cho gia đình",
    subtitle: "Bốn bài trước là hai vế và ba công cụ; bài này biến chúng thành việc làm được trong một buổi",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    whyItMatters:
      "Rủi ro y tế là chủ đề mà người ta hiểu xong rồi không làm gì, vì mỗi việc đều có vẻ cần nhiều thời gian tìm hiểu. Thực tế phần lớn khoảng trống lộ ra chỉ sau vài câu hỏi, và vài câu ấy làm được trong một buổi tối.",
    openingQuestion: "Việc nào cho biết nhiều nhất về mức độ chuẩn bị của gia đình bạn?",
    openingOptions: [
      "So sánh các sản phẩm bảo hiểm đang có trên thị trường hiện nay",
      "Trả lời hai câu: vế chi phí ai gánh, và nếu thu nhập chính dừng thì sống bằng gì",
      "Tính tổng số tiền đã chi cho bảo hiểm trong năm năm gần nhất",
      "Kiểm tra tình trạng sức khỏe của từng thành viên qua khám tổng quát",
    ],
    correctOption: 1,
    explanation:
      "Hai câu hỏi này bao trọn cả hai vế mà chặng đã bàn, và chúng không đòi hỏi kiến thức sản phẩm nào. Câu thứ nhất kiểm tra lớp bảo vệ cho vế chi phí: có BHYT không, còn hiệu lực không, và có lớp nào khác không. Câu thứ hai kiểm vế thu nhập, và nó thường là câu chưa ai trong gia đình từng đặt ra. So sánh sản phẩm là việc của bước sau, sau khi đã biết mình thiếu gì - làm trước thì bạn đang chọn giải pháp cho một vấn đề chưa xác định. Khám tổng quát tốt cho sức khỏe nhưng nó không trả lời câu hỏi tài chính nào.",
    diagram: [
      { label: "Câu 1: vế chi phí có ai gánh không", arrow: true },
      { label: "Câu 2: thu nhập chính dừng thì sống bằng gì", arrow: true },
      { label: "Hai câu lộ ra toàn bộ khoảng trống", arrow: true },
      { label: "Chọn sản phẩm là việc sau, không phải việc trước" },
    ],
    realWorldExample: {
      company: "Một buổi tối và bốn phát hiện",
      description:
        "Một gia đình ngồi xuống trả lời hai câu hỏi trên. Kết quả: thẻ BHYT của người lớn tuổi đã hết hạn ba tháng trước mà không ai biết; không ai nhớ cơ sở đăng ký khám ban đầu của mình ở đâu; quỹ khẩn cấp được tính theo mức chi tiêu của ba năm trước; và câu hỏi thứ hai chưa từng được đặt ra. Không phát hiện nào cần kiến thức chuyên môn, và cả bốn đều xử lý được trong tuần đó.",
    },
    quiz: [
      {
        question: "Vì sao nên trả lời hai câu hỏi trước khi so sánh sản phẩm bảo hiểm?",
        options: [
          "Vì chọn sản phẩm khi chưa biết mình thiếu gì là chọn giải pháp cho vấn đề chưa xác định",
          "Vì các sản phẩm bảo hiểm thay đổi liên tục nên so sánh sớm sẽ lỗi thời",
          "Vì tư vấn viên chỉ báo giá chính xác khi biết rõ nhu cầu của khách hàng",
          "Vì quy định yêu cầu người mua phải hoàn thành bản đánh giá nhu cầu trước khi ký hợp đồng",
        ],
        correct: 0,
        explanation:
          "Đây là lý do buổi tư vấn thường dẫn tới một sản phẩm chứ không dẫn tới một đánh giá. Biết khoảng trống trước thì bạn vào cuộc trao đổi với câu hỏi của mình, không phải câu hỏi của người bán.",
      },
      {
        question: "Việc nào trong danh sách kiểm thường phát hiện vấn đề nhanh nhất?",
        options: [
          "Kiểm hiệu lực thẻ BHYT của người lớn tuổi trong nhà",
          "So sánh mức phí bảo hiểm của gia đình với mức trung bình",
          "Đánh giá lại danh mục đầu tư dài hạn của cả gia đình",
          "Xem lại các hợp đồng bảo hiểm đã ký từ nhiều năm trước",
        ],
        correct: 0,
        explanation:
          "Đây là nhóm dùng tới bảo hiểm y tế nhiều nhất và cũng là nhóm hay để thẻ hết hạn nhất. Việc kiểm mất vài phút và nó xử lý được ngay.",
      },
      {
        question: "Quỹ khẩn cấp nên được xem lại theo tiêu chí nào?",
        options: [
          "Theo mức chi tiêu hiện tại, vì nó được tính bằng số tháng chứ không bằng số tiền",
          "Theo mức lạm phát công bố của năm gần nhất",
          "Theo tổng thu nhập của gia đình trong mười hai tháng gần nhất, cộng cả các khoản thưởng",
          "Theo số tiền đã tích lũy được so với mục tiêu ban đầu đặt ra",
        ],
        correct: 0,
        explanation:
          "Chi tiêu tăng theo thời gian, đặc biệt sau khi có con hoặc chuyển chỗ ở. Cùng một số dư đỡ được ít tháng hơn qua từng năm, nên nó cần được xem lại chứ không phải chỉ được duy trì.",
      },
      {
        question: "Nội dung nào nên được chia sẻ với cả gia đình?",
        options: [
          "Thông tin bảo hiểm nằm ở đâu và liên hệ ai khi có việc khẩn cấp",
          "Chi tiết thu nhập và tài sản của từng thành viên, kèm số dư mọi tài khoản đang có",
          "Kết quả so sánh giữa các sản phẩm bảo hiểm đã tìm hiểu",
          "Kế hoạch đầu tư dài hạn và tỷ trọng của từng loại tài sản",
        ],
        correct: 0,
        explanation:
          "Một hợp đồng tốt mà không ai biết nó ở đâu thì gần như vô dụng trong tình huống khẩn cấp - lúc đó người cần dùng thông tin thường không phải người đã mua nó.",
      },
      {
        question: "Nên lặp lại buổi rà soát này bao lâu một lần?",
        options: [
          "Mỗi năm một lần, và thêm một lần khi có thay đổi lớn trong gia đình",
          "Mỗi quý một lần để bám sát tình hình sức khỏe của tất cả các thành viên trong nhà",
          "Năm năm một lần vì các thông tin này ít khi thay đổi",
          "Chỉ khi có người trong nhà gặp vấn đề sức khỏe nghiêm trọng",
        ],
        correct: 0,
        explanation:
          "Sinh con, chuyển việc, mua nhà đều làm thay đổi cả nhu cầu bảo vệ lẫn mức quỹ khẩn cấp cần thiết. Gộp vào buổi rà soát tài chính hằng năm của Chặng 12 là cách ít tốn công nhất.",
      },
    ],
    keyTakeaways: [
      "Hai câu hỏi bao trọn cả hai vế và không đòi hỏi kiến thức sản phẩm nào",
      "So sánh sản phẩm là việc sau khi biết khoảng trống, không phải việc trước",
      "Thẻ BHYT hết hạn ở người lớn tuổi là phát hiện nhanh nhất và hay gặp nhất",
      "Hợp đồng mà không ai biết ở đâu thì gần như vô dụng lúc cần",
    ],
    practicePrompt: {
      question:
        "Bạn muốn bắt đầu chuẩn bị cho rủi ro y tế nhưng thấy chủ đề quá rộng. Nên làm gì trước?",
      options: [
        "Trả lời hai câu hỏi của bài này cho gia đình mình trong một buổi tối",
        "Đặt lịch gặp một tư vấn viên bảo hiểm để được hướng dẫn đầy đủ",
        "Đọc kỹ các quy định về bảo hiểm y tế hiện hành trước khi quyết định",
        "Khám tổng quát cho cả nhà để biết tình trạng sức khỏe hiện tại",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều tốn nhiều thời gian hơn và không việc nào cho biết bạn đang thiếu gì. Hai câu hỏi làm được trong một buổi và chúng thường lộ ra vài việc xử lý được ngay trong tuần đó.",
    },
    summary: {
      keyIdea: "Hai câu hỏi đơn giản lộ ra phần lớn khoảng trống, và chúng làm được trong một buổi tối",
      commonMistake: "Bắt đầu bằng việc so sánh sản phẩm, tức chọn giải pháp trước khi biết vấn đề",
      action: "Ngồi xuống một buổi tối và trả lời hai câu hỏi cho gia đình bạn.",
    },
    application: {
      title: "Một buổi tối, hai câu hỏi",
      message:
        "Vế chi phí: mọi người có BHYT không, còn hiệu lực không, đăng ký ở đâu, có lớp nào khác không. Vế thu nhập: nếu người có thu nhập chính nghỉ sáu tháng, gia đình sống bằng gì.",
      secondary:
        "Ghi lại nơi để giấy tờ bảo hiểm và số điện thoại cần gọi, rồi cho cả nhà biết. Việc này mất năm phút và nó quyết định các lớp bảo vệ có dùng được hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước là hai vế và ba công cụ. Bài này gộp chúng thành thứ làm được ngay - vì rủi ro y tế là chủ đề mà người ta hiểu xong rồi thường không làm gì cả.",
      },
      { type: "heading", text: "Hai câu hỏi thay cho cả chặng" },
      {
        type: "list",
        items: [
          "Vế chi phí: cả nhà có BHYT không, thẻ còn hiệu lực không, đăng ký ở đâu, có lớp bổ sung nào không",
          "Vế thu nhập: nếu người có thu nhập chính nghỉ sáu tháng, gia đình sống bằng gì",
          "Quỹ khẩn cấp có còn đúng bằng số tháng chi tiêu HIỆN TẠI không",
          "Giấy tờ bảo hiểm để ở đâu, và ai trong nhà biết điều đó",
        ],
      },
      {
        type: "paragraph",
        text: "Không câu nào trong bốn câu này đòi hỏi kiến thức về sản phẩm bảo hiểm, và cả bốn đều trả lời được trong một buổi tối. Điều chúng làm là biến một chủ đề rộng thành vài việc cụ thể - và trong phần lớn gia đình, ít nhất một câu sẽ lộ ra thứ xử lý được ngay trong tuần đó.",
      },
      {
        type: "callout",
        label: "Câu hỏi thứ tư quan trọng hơn vẻ ngoài của nó",
        text: "Trong tình huống khẩn cấp, người cần dùng thông tin bảo hiểm thường không phải người đã mua nó - người đó có thể đang nằm viện. Một hợp đồng tốt mà cả nhà không biết nó ở đâu, không biết gọi số nào, thì trong đúng thời điểm cần nhất nó gần như không tồn tại.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 19. Rủi ro duy nhất có thể xóa thành quả của mọi chặng trước cũng là rủi ro rẻ nhất để chuẩn bị.",
          "Điều kiện duy nhất là chuẩn bị lúc chưa cần - vì lúc cần thì không mua được nữa.",
        ],
      },
    ],
  },
];
