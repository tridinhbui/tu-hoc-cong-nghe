import type { Lesson } from "./lesson-types";

// Chặng "Dự án hạ tầng dài hạn" (ids 1731-1735, professional track).
//
// Vì sao chặng này tồn tại: kho đã có phía QUYẾT ĐỊNH của một dự án nền tảng
// ("Đánh giá một dự án nền tảng nội bộ" - NPV, IRR, thời gian hoàn vốn) và
// phía SẢN PHẨM ("Nền tảng nội bộ: sản phẩm mà khách hàng là đồng nghiệp" -
// tỷ lệ dùng, đường thoát, mô hình hàng đợi). Không bài nào nói về quãng giữa:
// chạy một dự án hạ tầng kéo nhiều quý, từ lúc được duyệt tới lúc nó trả lại
// giá trị. Phần lớn dự án loại này chết ở chính quãng đó.
//
// Điểm khác biệt lớn nhất so với các chặng kỹ thuật khác: ở đây điều kiện tiên
// quyết không phải một mục phụ lục, nó là biến số đầu tiên. Một dự án chưa có
// quyền truy cập vào hệ thống nguồn thì không chạy được dòng nào, bất kể đội
// giỏi tới đâu và kiến trúc tốt tới đâu.
//
// KHÔNG KHAI interactiveType. Bản cũ của chặng này gắn "process", "ratios" và
// "risk" - lần lượt vẽ ba báo cáo tài chính nối nhau, bảng cân đối kế toán, và
// đánh đổi rủi ro với lợi nhuận đầu tư. Không widget nào trong số đó minh hoạ
// được nội dung ở đây, và giữ chúng lại chỉ để số bài có widget không giảm là
// đổi một con số lấy ba minh hoạ sai chỗ.

export const INFRA_PROJECT_LESSONS: Lesson[] = [
  {
    id: 1731,
    slug: "dieu-kien-tien-quyet-truoc-khi-khoi-cong",
    title: "Dự án hạ tầng, Bài 1: Điều kiện tiên quyết - vì sao tiến độ bắt đầu từ quyền truy cập",
    subtitle: "Dự án dừng nhiều tháng thường không vì thiếu người, mà vì vướng một thứ xin từ đầu đã xong",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔑",
    track: "professional",
    whyItMatters:
      "Kế hoạch một dự án hạ tầng gần như luôn bắt đầu bằng kiến trúc và ước lượng công. Thứ làm nó đứng yên thì hiếm khi là hai phần ấy, và những thứ ấy đều biết trước được ở tuần đầu tiên nếu có người đi hỏi.",
    openingQuestion: "Nguyên nhân phổ biến nhất khiến một dự án hạ tầng đứng yên nhiều tháng là gì?",
    openingOptions: [
      "Thiếu một quyền truy cập hoặc một cái gật đầu từ đội khác",
      "Ước lượng công ban đầu quá lạc quan so với khối lượng thực tế phải làm",
      "Kiến trúc được chọn không phù hợp nên phải thiết kế lại từ giữa chừng",
      "Nhân sự bị điều sang dự án ưu tiên hơn",
    ],
    correctOption: 0,
    explanation:
      "Ba nguyên nhân kia đều làm dự án chậm và đều nằm trong tầm nhìn của đội, nên chúng được phát hiện sớm và xử lý được. Thứ làm dự án đứng hẳn thường nằm ngoài tầm ấy: một quyền đọc vào hệ thống nguồn phải qua bộ phận khác duyệt, một khoảng thời gian bảo trì phải xin từ đội vận hành, một cái gật đầu về pháp lý dữ liệu. Mỗi thứ đều nhỏ và không thứ nào là công việc kỹ thuật, nên chúng không xuất hiện trong bản kế hoạch. Trong lúc chờ, đội vẫn tiêu ngân sách và người vẫn bị giữ chỗ, nên một dự án đứng yên vẫn đắt gần bằng một dự án đang chạy.",
    diagram: [
      { label: "Quyền truy cập vào hệ thống nguồn", arrow: true },
      { label: "Cái gật đầu của đội đang sở hữu dữ liệu", arrow: true },
      { label: "Khoảng bảo trì được cấp → mới đổi được gì", arrow: true },
      { label: "Nghiệm thu và bàn giao cho đội vận hành" },
    ],
    realWorldExample: {
      company: "Ba tháng chờ một quyền đọc",
      description:
        "Một đội bắt đầu dự án chuyển dữ liệu và dựng xong phần lớn đường ống trong sáu tuần. Sau đó họ chờ ba tháng để có quyền đọc vào hệ thống nguồn, vì việc cấp quyền cần một quy trình mà chưa ai hỏi thời hạn. Trong ba tháng ấy dự án không tiến thêm dòng nào và vẫn chiếm bốn người trong kế hoạch nhân sự của quý.",
    },
    quiz: [
      {
        question: "Điều kiện tiên quyết nên được xử lý vào lúc nào?",
        options: [
          "Tuần đầu tiên, song song với việc thiết kế chứ không sau nó",
          "Sau khi chốt kiến trúc, để biết xin gì",
          "Khi đội bắt đầu cần tới chúng để tránh xin sớm rồi lại phải xin lại",
          "Trong giai đoạn lập kế hoạch chi tiết cùng với việc ước lượng khối lượng",
        ],
        correct: 0,
        explanation:
          "Thời gian chờ của những thứ này không phụ thuộc vào việc bạn đã sẵn sàng hay chưa, nên bắt đầu sớm là cách duy nhất rút ngắn nó. Chờ tới lúc chốt kiến trúc nghe hợp lý và nó đẩy toàn bộ thời gian chờ ra sau, đúng vào lúc đội đã sẵn sàng làm và không làm được gì.",
      },
      {
        question: "Vì sao một dự án đứng yên vẫn tốn gần như dự án đang chạy?",
        options: [
          "Vì người vẫn bị giữ chỗ và ngân sách vẫn được tính cho quý đó",
          "Vì phải duy trì hạ tầng đã dựng trong giai đoạn chờ đợi để không phải dựng lại",
          "Vì chờ lâu thì chi phí tăng theo lạm phát",
          "Vì đội phải liên tục cập nhật lại kế hoạch mỗi khi có thay đổi về thời hạn",
        ],
        correct: 0,
        explanation:
          "Đây là khoản chi phí không hiện ra ở đâu vì không có hoá đơn nào cho nó. Bốn người bị giữ chỗ trong ba tháng là một khoản thật, và nó lớn hơn phần lớn các khoản mà cùng dự án ấy đang cẩn thận tiết kiệm ở chỗ khác.",
      },
      {
        question: "Cách hỏi nào cho ra thông tin dùng được về một điều kiện tiên quyết?",
        options: [
          "Hỏi mất bao lâu và ai duyệt, không chỉ hỏi có được không",
          "Hỏi rõ những giấy tờ và thông tin cần chuẩn bị để nộp hồ sơ xin cấp quyền",
          "Hỏi xem đã có đội nào trong công ty được cấp quyền tương tự trước đây chưa",
          "Hỏi bộ phận phụ trách xem có cách nào rút ngắn quy trình trong trường hợp gấp",
        ],
        correct: 0,
        explanation:
          "Câu có được không gần như luôn nhận được câu trả lời là được, và câu trả lời đó không lập kế hoạch được. Thời hạn và người duyệt là hai thứ đưa được vào lịch, và chúng cũng là hai thứ cho bạn biết nên bắt đầu xin từ tuần nào.",
      },
      {
        question: "Nên làm gì với phần việc phụ thuộc vào một điều kiện chưa có?",
        options: [
          "Dựng phần đó trên dữ liệu giả và nối vào sau",
          "Chuyển sang làm các phần khác của dự án cho tới khi điều kiện được đáp ứng",
          "Tạm dừng phần đó và ghi nhận là rủi ro trong báo cáo tiến độ hằng tuần",
          "Ước lượng lại tiến độ chung của dự án theo thời hạn dự kiến của điều kiện đó",
        ],
        correct: 0,
        explanation:
          "Chuyển sang phần khác giữ cho đội bận nhưng nó đẩy toàn bộ rủi ro về cuối: tới lúc có quyền thật thì mới biết dữ liệu thật khác giả định ở đâu. Dựng trên dữ liệu giả cho phép phát hiện phần lớn vấn đề thiết kế trước, và phần nối vào sau thường nhỏ hơn nhiều so với dự đoán.",
      },
      {
        question: "Ai nên chịu trách nhiệm theo đuổi các điều kiện tiên quyết?",
        options: [
          "Một người có tên cụ thể, không phải cả đội",
          "Người quản lý dự án vì đây là phần việc phối hợp chứ không phải việc kỹ thuật",
          "Người phụ trách phần kỹ thuật liên quan trực tiếp tới điều kiện đó",
          "Luân phiên giữa các thành viên để mọi người đều nắm được tình hình chung",
        ],
        correct: 0,
        explanation:
          "Việc này gồm nhiều lần nhắc lại và chờ đợi, tức là loại việc dễ rơi vào khoảng trống giữa mọi người nhất. Ai làm thì ít quan trọng hơn việc có đúng một cái tên - vì thứ giết những việc như thế này không phải sự lười mà là giả định rằng ai đó đang lo.",
      },
    ],
    practicePrompt: {
      question:
        "Dự án của bạn được duyệt hôm nay và cần đọc dữ liệu từ hệ thống của đội khác. Việc đầu tiên nên làm là gì?",
      options: [
        "Hỏi quy trình cấp quyền mất bao lâu và ai duyệt, rồi bắt đầu ngay",
        "Chốt kiến trúc trước để biết cần quyền gì",
        "Trao đổi với đội sở hữu hệ thống về khối lượng dữ liệu và tần suất truy cập",
        "Lên kế hoạch chi tiết cho cả dự án để có cơ sở ước lượng thời gian hoàn thành",
      ],
      correct: 0,
      explanation:
        "Thời gian chờ chạy độc lập với tiến độ của bạn, nên mỗi ngày chậm bắt đầu là một ngày cộng thẳng vào cuối dự án. Ba việc kia đều nên làm và đều làm được song song, còn việc này thì không đuổi kịp được nếu bắt đầu muộn.",
    },
    keyTakeaways: [
      "Thứ làm dự án đứng hẳn thường không phải việc kỹ thuật, nên nó vắng mặt trong kế hoạch",
      "Thời gian chờ chạy độc lập với tiến độ của bạn; bắt đầu sớm là cách duy nhất rút ngắn",
      "Hỏi mất bao lâu và ai duyệt, không hỏi có được không",
      "Một dự án đứng yên vẫn tốn gần bằng dự án đang chạy",
    ],
    summary: {
      keyIdea: "Điều kiện tiên quyết là biến số đầu tiên của một dự án hạ tầng, không phải mục phụ lục",
      commonMistake: "Chốt kiến trúc rồi mới đi xin quyền, đẩy toàn bộ thời gian chờ ra sau",
      action: "Tuần đầu tiên, liệt kê mọi thứ cần người ngoài đội gật đầu, kèm thời hạn và tên người duyệt.",
    },
    application: {
      title: "Một bảng ba cột, tuần đầu tiên",
      message:
        "Thứ cần xin, ai duyệt, mất bao lâu. Gán mỗi dòng cho một cái tên cụ thể. Bắt đầu theo đuổi ngay hôm được duyệt dự án.",
      secondary:
        "Dòng nào không điền được cột thời hạn là dòng rủi ro lớn nhất của cả dự án.",
    },
    sections: [
      {
        type: "lead",
        text: "Bản kế hoạch của một dự án hạ tầng thường mở đầu bằng kiến trúc và ước lượng công. Thứ làm nó đứng yên nhiều tháng hiếm khi nằm trong hai phần đó.",
      },
      {
        type: "heading",
        text: "Việc không phải kỹ thuật thì vắng mặt trong kế hoạch kỹ thuật",
      },
      {
        type: "conceptTable",
        title: "Bốn nhóm điều kiện tiên quyết hay bị bỏ sót",
        concepts: [
          {
            vi: "Quyền truy cập",
            en: "Access",
            def: "Đọc vào hệ thống nguồn, vào môi trường thật. Thường qua một quy trình duyệt mà đội không kiểm soát.",
          },
          {
            vi: "Cái gật đầu của chủ sở hữu",
            en: "Owner sign-off",
            def: "Đội đang giữ dữ liệu hoặc hệ thống phải đồng ý. Họ có ưu tiên riêng và bạn không nằm trong đó.",
          },
          {
            vi: "Khoảng được phép đổi",
            en: "Change window",
            def: "Nhiều hệ thống chỉ cho đổi trong khung giờ nhất định, xin trước nhiều tuần.",
          },
          {
            vi: "Pháp lý và tuân thủ",
            en: "Compliance",
            def: "Dữ liệu cá nhân, dữ liệu qua biên giới. Thời hạn dài nhất và ít khả năng rút ngắn nhất.",
          },
        ],
      },
      {
        type: "heading",
        text: "Đứng yên không rẻ hơn đang chạy",
      },
      {
        type: "paragraph",
        text: "Trong lúc chờ, người vẫn bị giữ chỗ trong kế hoạch nhân sự và ngân sách vẫn được tính cho quý đó. Không có hoá đơn nào cho khoảng thời gian ấy, nên nó không xuất hiện ở bất kỳ báo cáo chi phí nào - và vì thế nó thường lớn hơn nhiều so với những khoản mà cùng dự án ấy đang cẩn thận tiết kiệm ở chỗ khác.",
      },
      {
        type: "callout",
        label: "Một cái tên, không phải cả đội",
        text: "Theo đuổi một điều kiện tiên quyết gồm nhiều lần nhắc lại, nhiều khoảng chờ, và không lần nào là công việc thú vị. Đó chính là hình dạng của loại việc rơi vào khoảng trống giữa mọi người. Gán cho một cái tên cụ thể là biện pháp rẻ nhất, và nó xử lý được nguyên nhân thật: không phải ai lười, mà là mọi người đều tưởng ai đó đang lo.",
      },
      {
        type: "closing",
        lines: [
          "Tiến độ của một dự án hạ tầng bắt đầu tính từ lúc bạn đi hỏi, không phải từ lúc bạn bắt đầu viết mã.",
          "Bài sau: dự án đã chạy rồi thì chi phí và giá trị của nó xuất hiện theo hai nhịp rất khác nhau.",
        ],
      },
    ],
  },
  {
    id: 1732,
    slug: "duong-cong-chu-j-cua-du-an-ha-tang",
    title: "Dự án hạ tầng, Bài 2: Đường cong chữ J - chi phí ra trước, giá trị vào sau",
    subtitle: "Giai đoạn tệ nhất nằm ở giữa, và đó cũng là lúc dự án hay bị cắt nhất",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Mọi dự án hạ tầng đều xấu đi trước khi tốt lên, và điều đó được biết trước. Không nói ra hình dạng ấy từ đầu là lý do phổ biến nhất khiến một dự án đúng bị dừng ở đúng điểm thấp nhất của nó.",
    openingQuestion: "Vì sao một dự án hạ tầng thường bị cắt ở khoảng giữa?",
    openingOptions: [
      "Vì đó là lúc chi phí đã bỏ ra nhiều nhất mà giá trị chưa xuất hiện",
      "Vì vấn đề khó nhất lộ ra ở giai đoạn giữa",
      "Vì đội mệt và hết hào hứng ban đầu",
      "Vì ưu tiên công ty đổi sau vài quý",
    ],
    correctOption: 0,
    explanation:
      "Một dự án hạ tầng đi theo hình chữ J: chi phí bắt đầu từ ngày đầu tiên, còn giá trị chỉ xuất hiện sau khi đủ phần được dựng xong để có người dùng nó. Khoảng giữa vì thế là điểm mà đường cong xuống thấp nhất - đã tiêu nhiều, chưa thu gì, và cũng chưa có gì để đem đi cho thấy. Nếu ai nhìn vào đúng lúc đó mà không biết hình dạng này thì kết luận hợp lý nhất họ rút ra là dự án đang thất bại. Ba nguyên nhân kia đều có thật và đều làm tình hình tệ thêm, nhưng chúng không giải thích được vì sao thời điểm bị cắt lại tập trung ở giữa chứ không rải đều.",
    diagram: [
      { label: "Giai đoạn đầu: tiêu, chưa ai thấy gì", arrow: true },
      { label: "Giai đoạn giữa: đáy chữ J, dễ bị cắt nhất", arrow: true },
      { label: "Đội đầu tiên chuyển sang dùng: giá trị bắt đầu", arrow: true },
      { label: "Mỗi đội chuyển tiếp sau đó gần như không tốn thêm" },
    ],
    realWorldExample: {
      company: "Bị cắt ở tháng thứ bảy",
      description:
        "Một dự án chuẩn hoá hạ tầng triển khai được duyệt cho mười hai tháng. Ở tháng thứ bảy, một đợt rà soát chi phí nhìn vào và thấy: đã tiêu quá nửa ngân sách, chưa đội nào dùng, không có chỉ số nào cải thiện. Dự án bị dừng. Sáu tháng sau, ba đội tự dựng ba phiên bản riêng của cùng thứ đó, và tổng công bỏ ra lớn hơn phần còn lại của dự án cũ.",
    },
    quiz: [
      {
        question: "Cách nào giảm được độ sâu của đáy chữ J?",
        options: [
          "Đưa một đội thật lên dùng sớm, dù chỉ với phần nhỏ",
          "Chia dự án thành nhiều giai đoạn ngắn hơn để dễ theo dõi và báo cáo tiến độ",
          "Giảm quy mô đội trong giai đoạn đầu để chi phí tích luỹ chậm hơn theo thời gian",
          "Tăng cường truyền thông nội bộ về tiến độ để mọi người thấy được công việc đang chạy",
        ],
        correct: 0,
        explanation:
          "Đáy sâu vì hai vế cùng lúc: đã tiêu nhiều và chưa thu gì. Ba cách kia chỉ tác động lên vế thứ nhất hoặc lên cảm nhận. Một đội thật đang dùng thứ gì đó, dù nhỏ, chuyển đường cong sang vế thứ hai - và nó cũng cho bạn phản hồi thật thay vì giả định.",
      },
      {
        question: "Vì sao đội thứ hai chuyển sang dùng thường rẻ hơn đội thứ nhất rất nhiều?",
        options: [
          "Vì phần lớn công đã nằm ở việc dựng, không ở mỗi lần thêm người dùng",
          "Vì đội sau học được từ đội trước",
          "Vì vấn đề đã xử lý hết ở lần đầu",
          "Vì tài liệu đã hoàn thiện sau lần đầu",
        ],
        correct: 0,
        explanation:
          "Đây chính là điều làm hạ tầng đáng đầu tư và cũng là điều khiến nó khó bảo vệ ở giữa chừng: toàn bộ chi phí dồn về trước, còn lợi ích thì cộng dồn về sau theo số đội dùng. Cắt ở giữa nghĩa là trả toàn bộ phần đắt và không nhận phần rẻ.",
      },
      {
        question: "Nên trình bày điều gì với người duyệt ngân sách ngay từ đầu?",
        options: [
          "Hình dạng chữ J, kèm mốc thời gian dự kiến chạm đáy",
          "Tổng chi phí dự kiến và lợi ích định lượng được sau khi dự án hoàn thành",
          "Kế hoạch chi tiết theo từng giai đoạn với các mốc bàn giao cụ thể trong từng quý",
          "Các rủi ro chính của dự án cùng với phương án xử lý cho từng rủi ro đã xác định",
        ],
        correct: 0,
        explanation:
          "Ba thứ kia đều nằm trong mọi đề xuất và không thứ nào ngăn được việc bị cắt ở tháng thứ bảy. Nói trước hình dạng chữ J biến một giai đoạn trông như thất bại thành một giai đoạn đã được dự báo, và đó là khác biệt duy nhất khi có người nhìn vào đúng lúc đó.",
      },
      {
        question: "Chỉ số nào nên theo dõi trong giai đoạn chưa có ai dùng?",
        options: [
          "Khoảng cách còn lại tới đội đầu tiên chuyển sang dùng được",
          "Tỷ lệ phần trăm khối lượng công việc đã hoàn thành so với kế hoạch ban đầu",
          "Số lượng thành phần đã dựng xong và đã qua kiểm thử trong hệ thống mới",
          "Mức tiêu ngân sách so với dự trù",
        ],
        correct: 0,
        explanation:
          "Ba chỉ số kia đo phần đã làm và đều tăng đều đặn kể cả khi dự án đang đi sai hướng. Khoảng cách tới người dùng đầu tiên là chỉ số duy nhất trả lời câu hỏi mà người duyệt ngân sách thật sự đang hỏi, và nó cũng buộc đội ưu tiên đúng thứ.",
      },
      {
        question: "Dự án bị cắt ở giữa thì chi phí thật của quyết định đó là gì?",
        options: [
          "Toàn bộ phần đã tiêu, cộng với việc các đội tự làm lại theo cách riêng",
          "Phần ngân sách đã sử dụng cho tới thời điểm dừng dự án lại giữa chừng",
          "Thời gian của đội đã bỏ ra và không thể chuyển sang các dự án khác được",
          "Cơ hội cải thiện hiệu suất mà công ty đã bỏ lỡ trong khoảng thời gian đó",
        ],
        correct: 0,
        explanation:
          "Nhu cầu tạo ra dự án không biến mất khi dự án bị dừng. Mỗi đội sẽ tự giải quyết theo cách riêng, và tổng công của những cách riêng ấy thường lớn hơn phần còn lại của dự án đã bị cắt - chỉ là nó không nằm trong dòng ngân sách nào nên không ai cộng nó lại.",
      },
    ],
    practicePrompt: {
      question:
        "Dự án của bạn đang ở tháng thứ năm trên mười hai và chưa đội nào dùng. Nên làm gì trước?",
      options: [
        "Tìm phần nhỏ nhất đưa được một đội thật lên dùng trong vài tuần tới",
        "Chuẩn bị báo cáo tiến độ chi tiết để cho thấy khối lượng công việc đã hoàn thành",
        "Xin gia hạn vì tiến độ đang chậm hơn kế hoạch",
        "Tập trung hoàn thiện các thành phần còn lại để rút ngắn thời gian tới ngày bàn giao",
      ],
      correct: 0,
      explanation:
        "Tháng thứ năm là gần đáy chữ J, tức là gần điểm dễ bị cắt nhất. Một đội thật đang dùng thứ gì đó đổi hẳn câu chuyện khi có người nhìn vào, và nó rẻ hơn nhiều so với việc chờ tới lúc mọi thành phần xong - vốn là lúc bạn có thể không còn dự án nữa.",
    },
    keyTakeaways: [
      "Chi phí bắt đầu từ ngày đầu; giá trị chỉ bắt đầu khi có người dùng",
      "Đáy chữ J trùng đúng với điểm dễ bị cắt nhất",
      "Đội thứ hai rẻ hơn đội thứ nhất rất nhiều - đó là lý do hạ tầng đáng làm",
      "Cắt ở giữa nghĩa là trả toàn bộ phần đắt và không nhận phần rẻ",
    ],
    summary: {
      keyIdea: "Dự án hạ tầng xấu đi trước khi tốt lên, và điểm xấu nhất trùng với điểm dễ bị cắt nhất",
      commonMistake: "Không nói trước hình dạng chữ J, để người nhìn vào tháng thứ bảy tự kết luận là thất bại",
      action: "Trình bày đường cong và mốc chạm đáy ngay từ đề xuất, rồi rút ngắn khoảng cách tới người dùng đầu tiên.",
    },
    application: {
      title: "Một đội thật, càng sớm càng tốt",
      message:
        "Tìm phần nhỏ nhất của dự án mà một đội thật dùng được, và đưa nó lên trước mọi thành phần khác. Đó là cách duy nhất làm đáy chữ J nông đi.",
      secondary:
        "Theo dõi khoảng cách tới người dùng đầu tiên thay vì phần trăm khối lượng đã xong - chỉ số thứ hai tăng đều cả khi đi sai hướng.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi dự án hạ tầng đều đi qua một giai đoạn mà nhìn từ ngoài vào nó giống hệt một dự án thất bại. Giai đoạn đó được biết trước, và gần như không bao giờ được nói ra trong đề xuất.",
      },
      {
        type: "heading",
        text: "Hai vế lệch nhịp",
      },
      {
        type: "list",
        items: [
          "Chi phí bắt đầu từ ngày đầu tiên và chạy đều đặn",
          "Giá trị bằng không cho tới khi có đội đầu tiên chuyển sang dùng",
          "Từ đội thứ hai trở đi, mỗi đội thêm vào gần như không tốn thêm gì",
          "Nên đường cong xuống trước, rồi mới lên - và điểm thấp nhất nằm ở giữa",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhìn ở tháng thứ bảy, không biết hình dạng",
          text: "Đã tiêu quá nửa ngân sách, chưa đội nào dùng, không chỉ số nào cải thiện. Kết luận hợp lý nhất là dự án đang thất bại và nên dừng.",
        },
        right: {
          label: "Nhìn ở tháng thứ bảy, đã biết hình dạng",
          text: "Đang ở đáy đúng như dự báo từ đề xuất, và câu hỏi đặt ra là còn bao xa tới đội đầu tiên - một câu hỏi trả lời được.",
        },
      },
      {
        type: "formula",
        title: "Giá trị tích luỹ của một hạ tầng",
        equation: "Số đội đã chuyển × Giá trị mỗi đội − Chi phí dựng − Chi phí nuôi × Số quý",
        variables: [
          { symbol: "Số đội đã chuyển", name: "Đội đang thật sự dùng", description: "Không tính đội đã được thông báo hoặc đã đồng ý về nguyên tắc" },
          { symbol: "Giá trị mỗi đội", name: "Giờ tiết kiệm ròng", description: "Sau khi trừ công mà chính đội đó bỏ ra để chuyển sang" },
          { symbol: "Chi phí dựng", name: "Toàn bộ phần trả trước", description: "Dồn hết về đầu, và không phụ thuộc vào số đội sẽ dùng" },
        ],
        example: {
          title: "Vì sao cắt ở giữa là lựa chọn đắt nhất",
          calculation: "Chi phí dựng đã trả gần hết, số đội đã chuyển vẫn bằng không",
          result: "Trả toàn bộ phần đắt, nhận phần rẻ bằng không",
          explanation: "Cộng thêm việc các đội sau đó tự làm lại theo cách riêng, tổng chi thường vượt phần còn lại của chính dự án đã cắt.",
        },
      },
      {
        type: "callout",
        label: "Nói trước hình dạng là biện pháp phòng vệ rẻ nhất",
        text: "Một giai đoạn trông như thất bại mà đã được dự báo từ đầu thì đọc ra thành đúng kế hoạch. Cùng giai đoạn ấy không được báo trước thì đọc ra thành mất kiểm soát. Khác biệt nằm ở một biểu đồ trong trang thứ hai của đề xuất, và nó quyết định dự án có sống qua đợt rà soát chi phí giữa kỳ hay không.",
      },
      {
        type: "closing",
        lines: [
          "Dự án hạ tầng không chết vì làm sai; chúng chết vì bị nhìn vào đúng lúc trông tệ nhất.",
          "Bài sau: ba nguồn lực nuôi một dự án dài, và cái nào cạn trước.",
        ],
      },
    ],
  },
  {
    id: 1733,
    slug: "ba-nguon-luc-cua-mot-du-an-dai",
    title: "Dự án hạ tầng, Bài 3: Ba nguồn lực - người của đội, người mượn, và thời gian của người dùng",
    subtitle: "Nguồn cạn trước không phải ngân sách, mà là sự chú ý của các đội khác",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧩",
    track: "professional",
    whyItMatters:
      "Kế hoạch nguồn lực của một dự án hạ tầng thường chỉ đếm người trong đội. Hai nguồn còn lại không nằm trong bảng nào, không ai cấp chính thức, và chúng mới là thứ quyết định dự án về đích được hay không.",
    openingQuestion: "Nguồn lực nào của một dự án hạ tầng hay cạn trước nhất?",
    openingOptions: [
      "Sự chú ý của các đội khác mà dự án cần họ hợp tác",
      "Ngân sách được cấp cho dự án trong khoảng thời gian đã được phê duyệt",
      "Số người trong đội thực hiện, vì họ thường bị điều sang việc gấp hơn",
      "Thời gian còn lại so với thời hạn đã cam kết với ban lãnh đạo công ty",
    ],
    correctOption: 0,
    explanation:
      "Ngân sách và nhân sự đều được cấp chính thức, được theo dõi, và khi cạn thì có người báo. Nguồn thứ ba thì không: một dự án hạ tầng cần các đội khác đọc tài liệu, thử bản mới, đổi cách họ đang làm, và không giờ nào trong số đó nằm trong kế hoạch của chính họ. Mỗi lần bạn quay lại xin thêm một chút chú ý, phần còn lại ít đi, và không ai đo phần đã dùng. Đây là lý do một dự án kỹ thuật tốt vẫn có thể dừng ở bước cuối: phần dựng đã xong, còn phần thuyết phục thì đã tiêu hết vốn từ những lần trước.",
    diagram: [
      { label: "Người trong đội: đếm được, được cấp chính thức", arrow: true },
      { label: "Người mượn từ đội khác: có giới hạn ngầm", arrow: true },
      { label: "Sự chú ý của đội sẽ dùng: không ai đo, cạn nhanh nhất", arrow: true },
      { label: "Tiêu nguồn thứ ba vào đúng chỗ đáng tiêu" },
    ],
    realWorldExample: {
      company: "Bản thử thứ tư",
      description:
        "Một đội hạ tầng mời các đội khác thử ba bản chưa hoàn chỉnh trong sáu tháng, mỗi lần đều có vài lỗi và không lần nào giải quyết được vấn đề của họ. Tới bản thứ tư, bản thật sự dùng được, thì không đội nào đăng ký thử nữa. Phần kỹ thuật đã sẵn sàng; phần vốn chú ý thì đã tiêu hết vào ba lần trước.",
    },
    quiz: [
      {
        question: "Vì sao mượn người từ đội khác thường đắt hơn con số giờ được ghi?",
        options: [
          "Vì người mượn phải chia sự tập trung giữa hai nơi và mất công vào việc",
          "Vì đội cho mượn hay cử người ít kinh nghiệm",
          "Vì thời gian mượn thường bị cắt giảm giữa chừng khi đội gốc có việc gấp phát sinh",
          "Vì cần thêm thời gian phối hợp giữa hai đội về quy trình và cách làm việc chung",
        ],
        correct: 0,
        explanation:
          "Nửa ngày mỗi tuần từ một người đang giữ việc ở nơi khác cho ra ít hơn nhiều so với nửa ngày của người toàn tâm. Với việc cần hiểu ngữ cảnh sâu, con số thật có thể chỉ bằng một phần ba. Đây là lý do mượn hai người nửa thời gian gần như luôn kém hơn mượn một người toàn thời gian.",
      },
      {
        question: "Nên tiêu vốn chú ý của các đội khác vào lúc nào?",
        options: [
          "Khi bạn đã có thứ giải quyết được một vấn đề thật của họ",
          "Càng sớm càng tốt để nhận được phản hồi và điều chỉnh hướng phát triển kịp thời",
          "Đều đặn trong suốt dự án để duy trì sự quan tâm và tránh bị lãng quên",
          "Ở các mốc lớn khi có thành phần xong",
        ],
        correct: 0,
        explanation:
          "Phản hồi sớm đúng là có giá trị, nhưng nó không miễn phí và cái giá được trả bằng đúng nguồn lực khan hiếm nhất. Một lần mời thử mà không giải quyết được gì cho họ là một lần rút vốn không mua được gì, và số lần rút thì hữu hạn.",
      },
      {
        question: "Đội đang dùng hệ thống cũ phải bỏ ra gì khi chuyển sang hệ thống mới?",
        options: [
          "Thời gian của chính họ, và họ không nhận được gì trong lúc chuyển",
          "Rủi ro gián đoạn khi đang chuyển đổi",
          "Công đào tạo lại cả đội về cách mới",
          "Khả năng quay lại hệ thống cũ nếu cần",
        ],
        correct: 0,
        explanation:
          "Đây là điều kiện quyết định và nó hay bị bỏ qua trong kế hoạch của đội hạ tầng: chi phí chuyển đổi rơi vào đội dùng, còn lợi ích thì đến sau và một phần thuộc về công ty chứ không thuộc về họ. Không nhìn ra sự lệch đó thì mọi lời mời chuyển sang đều nghe như xin xỏ.",
      },
      {
        question: "Cách nào giảm được chi phí chuyển đổi cho đội dùng?",
        options: [
          "Đội hạ tầng làm hộ phần chuyển đổi cho một hai đội đầu tiên",
          "Viết tài liệu hướng dẫn thật chi tiết cho từng bước của quá trình chuyển đổi",
          "Cho hai hệ thống chạy song song một thời gian",
          "Tổ chức các buổi đào tạo trực tiếp cho từng đội trước khi họ bắt đầu chuyển",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều làm việc chuyển đổi dễ hơn và vẫn để chi phí ở phía đội dùng. Làm hộ thì chuyển hẳn chi phí sang phía bạn - đắt cho một hai đội đầu, và nó mua được thứ không mua được bằng cách nào khác là những đội tiếp theo nhìn thấy một ví dụ đã chạy.",
      },
      {
        question: "Dấu hiệu nào cho thấy vốn chú ý đang cạn?",
        options: [
          "Lời mời thử nhận được ít phản hồi hơn hẳn so với những lần trước",
          "Các đội hỏi nhiều hơn về lợi ích cụ thể",
          "Thời gian từ lúc mời tới lúc thử dài ra",
          "Các đội xin lùi chuyển đổi sang quý sau",
        ],
        correct: 0,
        explanation:
          "Ba dấu hiệu kia đều xuất hiện muộn hơn và đều có thể do nguyên nhân khác. Sự im lặng thì đến sớm và nó khó bị hiểu nhầm - nó nói rằng lời mời của bạn đã trượt xuống dưới ngưỡng đáng đọc, và ngưỡng đó không tự tăng lại.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn cần ba đội chuyển sang hạ tầng mới trong quý tới. Nên bắt đầu thế nào?",
      options: [
        "Chọn một đội, làm hộ phần chuyển đổi cho họ, rồi dùng đó làm ví dụ",
        "Gửi tài liệu và lịch chuyển đổi cho cả ba đội để họ chủ động sắp xếp thời gian",
        "Trình bày với quản lý cấp trên để có chỉ đạo yêu cầu các đội thực hiện chuyển đổi",
        "Tổ chức một buổi giới thiệu cho cả ba đội",
      ],
      correct: 0,
      explanation:
        "Chỉ đạo từ trên đưa được đội lên hệ thống mới và không đưa được sự tự nguyện, nên các đội sau sẽ chuyển ở mức tối thiểu. Một đội đã chuyển xong và nói được là mất bao lâu, được gì thì thuyết phục hơn mọi buổi giới thiệu - và nó tiêu đúng một lần vốn chú ý thay vì ba lần.",
    },
    keyTakeaways: [
      "Ngân sách và nhân sự được cấp chính thức; vốn chú ý thì không ai đo",
      "Mượn hai người nửa thời gian gần như luôn kém hơn một người toàn thời gian",
      "Chi phí chuyển đổi rơi vào đội dùng, lợi ích đến sau và một phần không thuộc về họ",
      "Sự im lặng là dấu hiệu sớm nhất cho thấy vốn chú ý đã cạn",
    ],
    summary: {
      keyIdea: "Nguồn lực cạn trước của một dự án hạ tầng là sự chú ý của các đội khác, thứ không có trong bảng nào",
      commonMistake: "Tiêu vốn chú ý vào những lần mời thử bản chưa giải quyết được vấn đề nào của họ",
      action: "Chỉ mời thử khi đã có thứ giải quyết được một vấn đề thật, và làm hộ phần chuyển đổi cho đội đầu tiên.",
    },
    application: {
      title: "Đếm cả ba nguồn, không chỉ nguồn đếm được",
      message:
        "Ghi ra: bao nhiêu người trong đội, bao nhiêu giờ mượn từ đội khác, và bạn còn bao nhiêu lần đáng gõ cửa các đội sẽ dùng.",
      secondary:
        "Con số thứ ba không có đơn vị và vẫn hữu hạn - hãy quyết trước sẽ tiêu nó vào những lần nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng nguồn lực của một dự án hạ tầng thường có một dòng: số người trong đội. Hai nguồn còn lại quyết định dự án về đích được hay không, và cả hai đều không có dòng nào.",
      },
      {
        type: "heading",
        text: "Ba nguồn, ba cách cạn",
      },
      {
        type: "conceptTable",
        title: "Ba nguồn lực và đặc điểm của từng nguồn",
        concepts: [
          {
            vi: "Người trong đội",
            en: "Core team",
            def: "Được cấp chính thức, đếm được, và khi thiếu thì có người báo. Nguồn dễ quản lý nhất.",
          },
          {
            vi: "Người mượn",
            en: "Borrowed time",
            def: "Nửa ngày mỗi tuần của người đang giữ việc khác cho ra ít hơn nhiều so với con số ghi trên giấy.",
          },
          {
            vi: "Sự chú ý của đội sẽ dùng",
            en: "Attention budget",
            def: "Hữu hạn, không ai cấp, không ai đo. Cạn nhanh nhất và không tự đầy lại.",
          },
          {
            vi: "Thời gian của người dùng",
            en: "Migration cost",
            def: "Chi phí chuyển đổi rơi vào họ; lợi ích đến sau và một phần thuộc về công ty chứ không về họ.",
          },
        ],
      },
      {
        type: "heading",
        text: "Vốn chú ý tiêu được bao nhiêu lần",
      },
      {
        type: "paragraph",
        text: "Mỗi lần bạn mời một đội đọc tài liệu, thử bản mới, hoặc dự một buổi giới thiệu, bạn rút một phần từ một tài khoản không ai theo dõi. Nếu lần rút ấy không giải quyết được vấn đề nào của họ thì nó không mua được gì, và số dư vẫn giảm. Đây là lý do một dự án có phần kỹ thuật hoàn chỉnh vẫn có thể không có ai dùng: vốn đã tiêu hết trước khi có thứ đáng để tiêu vào.",
      },
      {
        type: "callout",
        label: "Làm hộ đội đầu tiên",
        text: "Đắt, và nó là khoản đắt đáng chi nhất trong cả dự án. Một đội đã chuyển xong nói được mất bao lâu và được gì; điều đó thuyết phục hơn mọi tài liệu, và nó chuyển chi phí chuyển đổi từ phía người dùng sang phía bạn - đúng phía đang có động lực để trả.",
      },
      {
        type: "closing",
        lines: [
          "Ngân sách cạn thì có người báo; vốn chú ý cạn thì chỉ có sự im lặng.",
          "Bài sau: dự án đã có người dùng thì đo giá trị của nó bằng gì cho đúng.",
        ],
      },
    ],
  },
  {
    id: 1734,
    slug: "do-gia-tri-rong-cua-ha-tang",
    title: "Dự án hạ tầng, Bài 4: Giá trị ròng - vì sao số người dùng không phải thước đo",
    subtitle: "Giờ tiết kiệm được trừ đi giờ phải bỏ ra, và vế thứ hai hay bị bỏ quên",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Đội hạ tầng nào cũng cần chứng minh giá trị của mình, và thước đo dễ lấy nhất là số đội đang dùng. Con số đó tăng đều kể cả khi hạ tầng đang làm cho mọi người chậm đi, nên nó không trả lời được câu hỏi nào đáng hỏi.",
    openingQuestion: "Thước đo nào phản ánh đúng giá trị một hạ tầng nội bộ tạo ra?",
    openingOptions: [
      "Giờ tiết kiệm được cho các đội, trừ đi giờ họ phải bỏ ra vì nó",
      "Số đội đang dùng trên tổng số đội",
      "Độ ổn định, đo bằng số sự cố mỗi quý",
      "Khối lượng đội hạ tầng làm được trong kỳ",
    ],
    correctOption: 0,
    explanation:
      "Ba thước đo kia đều tăng theo thời gian gần như bất kể chất lượng, nên chúng không phân biệt được một hạ tầng tốt với một hạ tầng bắt buộc phải dùng. Thước đo đúng là hiệu của hai vế: phần giờ mà các đội tiết kiệm được nhờ không phải tự làm, trừ đi phần giờ họ phải bỏ ra để học, để chuyển sang, để chờ khi nó hỏng, và để đi đường vòng khi nó không làm được thứ họ cần. Vế thứ hai hiếm khi xuất hiện trong báo cáo nào, và nó là lý do một hạ tầng có tỷ lệ dùng cao vẫn có thể mang giá trị ròng âm.",
    diagram: [
      { label: "Giờ tiết kiệm: không phải tự dựng, không phải tự nuôi", arrow: true },
      { label: "Trừ giờ học và giờ chuyển sang", arrow: true },
      { label: "Trừ giờ chờ khi hỏng và giờ đi đường vòng", arrow: true },
      { label: "Phần còn lại mới là giá trị ròng" },
    ],
    realWorldExample: {
      company: "Tỷ lệ dùng chín mươi phần trăm",
      description:
        "Một nền tảng triển khai nội bộ đạt tỷ lệ dùng gần như tuyệt đối và được báo cáo là thành công. Hỏi các đội thì mỗi đội mất trung bình bốn giờ mỗi tuần để đi vòng qua những chỗ nó không làm được, cộng với thời gian chờ mỗi lần nó hỏng. Tỷ lệ dùng cao vì không có lựa chọn khác, chứ không vì nó tốt - và hai điều đó cho ra cùng một con số.",
    },
    quiz: [
      {
        question: "Vì sao tỷ lệ sử dụng cao không chứng minh được giá trị?",
        options: [
          "Vì nó không phân biệt được đội dùng vì tốt với đội dùng vì bắt buộc",
          "Vì nó đo số đội, không đo mức dùng thật",
          "Vì đội đăng ký rồi vẫn dùng hệ cũ",
          "Vì tỷ lệ tăng chậm, không kịp phản ánh",
        ],
        correct: 0,
        explanation:
          "Đây là điểm mù cốt lõi của mọi chỉ số dạng đếm đầu người. Một hạ tầng bắt buộc và một hạ tầng được yêu thích cho ra cùng một con số, trong khi chúng ở hai đầu đối lập về giá trị thật - và cái thứ nhất còn đang làm chậm cả công ty.",
      },
      {
        question: "Khoản chi phí nào của người dùng hay bị bỏ quên nhất?",
        options: [
          "Giờ đi đường vòng khi hạ tầng không làm được thứ họ cần",
          "Thời gian học cách dùng hạ tầng mới",
          "Công sức chuyển đổi từ hệ thống cũ sang hệ thống mới ở giai đoạn đầu",
          "Thời gian chờ đợi mỗi khi hạ tầng gặp sự cố hoặc bảo trì định kỳ",
        ],
        correct: 0,
        explanation:
          "Ba khoản kia đều nhìn thấy được và thường được tính vào kế hoạch. Giờ đi đường vòng thì rải rác, mỗi lần một ít, và không ai báo cáo - nên nó không xuất hiện ở đâu dù cộng lại thường lớn nhất. Nó cũng là khoản duy nhất tăng theo thời gian nếu hạ tầng không được mở rộng.",
      },
      {
        question: "Cách nào lấy được con số về chi phí phía người dùng?",
        options: [
          "Hỏi vài đội mỗi tuần mất bao nhiêu giờ vì hạ tầng này",
          "Phân tích nhật ký hệ thống để tìm các thao tác bất thường của người dùng",
          "Theo dõi số lượng yêu cầu hỗ trợ mà đội hạ tầng nhận được mỗi tháng",
          "Đo thời gian trung bình mỗi tác vụ",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đo được thứ đi qua hệ thống, và phần lớn chi phí đi đường vòng thì không đi qua hệ thống - đó chính là nghĩa của việc đi đường vòng. Câu hỏi trực tiếp là cách duy nhất chạm tới nó, và nó cũng cho bạn biết nên sửa gì trước.",
      },
      {
        question: "Giá trị ròng âm mà tỷ lệ dùng cao thì nên xử lý ra sao?",
        options: [
          "Mở đường thoát cho các trường hợp hạ tầng không phục vụ tốt",
          "Cải thiện hiệu năng để giảm thời gian chờ",
          "Thêm tính năng để phủ nhiều trường hợp",
          "Tăng đào tạo cho người dùng",
        ],
        correct: 0,
        explanation:
          "Bổ sung tính năng để phủ mọi trường hợp là cuộc đua không có đích và nó làm hạ tầng nặng dần cho tất cả. Đường thoát thừa nhận rằng một số trường hợp không đáng phục vụ, và nó chuyển ngay phần chi phí đi đường vòng thành số không cho những đội đó.",
      },
      {
        question: "Nên báo cáo giá trị của hạ tầng theo cách nào?",
        options: [
          "Một con số ròng, kèm cả vế chi phí phía người dùng",
          "Danh sách các tính năng đã triển khai cùng với mức độ hoàn thành của từng phần",
          "Số đội đã chuyển sang sử dụng và lộ trình chuyển đổi của các đội còn lại",
          "Các chỉ số kỹ thuật về hiệu năng và độ sẵn sàng của hạ tầng trong kỳ",
        ],
        correct: 0,
        explanation:
          "Báo cáo chỉ có vế lợi ích thì đúng nhưng không đầy đủ, và người đọc tinh ý sẽ nhận ra điều đó trước bạn. Đưa cả vế chi phí vào làm con số nhỏ đi và làm báo cáo đáng tin lên - đồng thời nó đặt đúng câu hỏi cho quý sau là giảm vế nào.",
      },
    ],
    practicePrompt: {
      question:
        "Hạ tầng của bạn có tám trên mười đội dùng. Cần con số gì để biết nó có đáng không?",
      options: [
        "Mỗi đội tiết kiệm bao nhiêu giờ, và mất bao nhiêu giờ vì nó",
        "Tỷ lệ sử dụng của hai đội còn lại và lý do họ chưa chuyển sang dùng",
        "Số sự cố và thời gian gián đoạn của hạ tầng trong khoảng thời gian vừa qua",
        "Chi phí vận hành so với để đội tự dựng",
      ],
      correct: 0,
      explanation:
        "Tám trên mười là một con số dễ báo cáo và nó không nói được hạ tầng đang giúp hay đang cản. Hai con số kia trả lời trực tiếp, lấy được bằng vài cuộc trò chuyện, và chúng cũng chỉ ra chỗ đáng sửa trước - thứ mà tỷ lệ sử dụng không bao giờ chỉ ra.",
    },
    keyTakeaways: [
      "Chỉ số đếm đầu người không phân biệt được hạ tầng tốt với hạ tầng bắt buộc",
      "Giờ đi đường vòng là khoản lớn nhất và không đi qua hệ thống nên không ai đo",
      "Đường thoát rẻ hơn cuộc đua phủ mọi trường hợp",
      "Báo cáo có cả vế chi phí thì con số nhỏ đi và độ tin cậy tăng lên",
    ],
    summary: {
      keyIdea: "Giá trị của hạ tầng là một hiệu số, và vế trừ hầu như không bao giờ được đo",
      commonMistake: "Báo cáo tỷ lệ sử dụng, con số tăng đều kể cả khi hạ tầng đang làm mọi người chậm đi",
      action: "Hỏi vài đội mỗi tuần họ mất bao nhiêu giờ vì hạ tầng này, rồi trừ vào phần tiết kiệm.",
    },
    application: {
      title: "Hai câu hỏi, vài cuộc trò chuyện",
      message:
        "Với ba đội đang dùng: nếu không có hạ tầng này, mỗi tuần các bạn mất thêm bao nhiêu giờ - và hiện tại mỗi tuần mất bao nhiêu giờ vì nó.",
      secondary:
        "Hiệu của hai con số đó là thứ đáng đưa vào báo cáo, kể cả khi nó nhỏ hơn con số bạn đang báo cáo.",
    },
    sections: [
      {
        type: "lead",
        text: "Đội hạ tầng nào cũng phải chứng minh mình đáng tồn tại, và thước đo dễ lấy nhất cũng là thước đo nói ít nhất.",
      },
      {
        type: "heading",
        text: "Một hiệu số, không phải một tổng",
      },
      {
        type: "formula",
        title: "Giá trị ròng mỗi quý",
        equation: "Σ(Giờ tiết kiệm mỗi đội) − Σ(Giờ học + Giờ chuyển + Giờ chờ + Giờ đi đường vòng)",
        variables: [
          { symbol: "Giờ tiết kiệm", name: "Phần không phải tự làm", description: "Hỏi trực tiếp: nếu không có nó thì mỗi tuần mất thêm bao nhiêu" },
          { symbol: "Giờ chuyển", name: "Chi phí một lần", description: "Rơi vào đội dùng, và nên tính vào quý mà nó xảy ra" },
          { symbol: "Giờ đi đường vòng", name: "Phần hạ tầng không làm được", description: "Rải rác, không đi qua hệ thống, nên không công cụ nào đo được" },
        ],
        example: {
          title: "Tám đội, mỗi đội tiết kiệm 6 giờ và mất 4 giờ mỗi tuần",
          calculation: "8 × (6 − 4) mỗi tuần",
          result: "16 giờ ròng, không phải 48 giờ",
          explanation: "Cùng dữ liệu ấy nếu chỉ báo vế lợi ích sẽ ra 48 giờ, gấp ba lần con số thật - và không sai câu nào.",
        },
      },
      {
        type: "heading",
        text: "Vì sao tỷ lệ dùng cao có thể là tin xấu",
      },
      {
        type: "paragraph",
        text: "Một hạ tầng bắt buộc phải dùng và một hạ tầng được yêu thích cho ra cùng một tỷ lệ. Ở trường hợp thứ nhất, tỷ lệ càng cao thì tổng giờ đi đường vòng của cả công ty càng lớn, tức là con số đang được báo cáo như thành công lại đang đo mức độ thiệt hại. Không chỉ số đếm đầu người nào tách được hai trường hợp ấy ra.",
      },
      {
        type: "callout",
        label: "Đường thoát rẻ hơn việc phủ mọi trường hợp",
        text: "Khi phát hiện các đội đang mất giờ đi đường vòng, phản ứng tự nhiên là thêm tính năng cho tới khi phủ hết. Cuộc đua đó không có đích và mỗi tính năng thêm vào làm hạ tầng nặng hơn cho tất cả. Thừa nhận rằng một số trường hợp không đáng phục vụ và mở đường thoát cho chúng đưa chi phí ấy về không ngay lập tức.",
      },
      {
        type: "closing",
        lines: [
          "Một báo cáo chỉ có vế cộng thì đúng từng câu và sai ở kết luận.",
          "Bài sau: ba rủi ro của một dự án dài, và vì sao chúng không cộng mà nhân với nhau.",
        ],
      },
    ],
  },
  {
    id: 1735,
    slug: "ba-rui-ro-cong-don-cua-du-an-dai",
    title: "Dự án hạ tầng, Bài 5: Ba rủi ro và cách chúng nhân với nhau",
    subtitle: "Mỗi rủi ro riêng đều chịu được; điều làm dự án chết là chúng kích hoạt lẫn nhau",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⛓️",
    track: "professional",
    whyItMatters:
      "Bảng rủi ro của một dự án dài thường liệt kê từng mục riêng với xác suất và mức ảnh hưởng riêng. Cách trình bày đó bỏ sót đúng thứ giết dự án: các rủi ro ở đây có quan hệ nhân quả với nhau, nên chúng không đến lẻ.",
    openingQuestion: "Vì sao bảng rủi ro liệt kê từng mục riêng lại đánh giá thấp rủi ro thật?",
    openingOptions: [
      "Vì rủi ro này xảy ra thì làm rủi ro kia dễ xảy ra hơn",
      "Vì xác suất từng rủi ro bị ước thấp",
      "Vì bảng rủi ro chỉ liệt kê những rủi ro đã biết chứ không phủ được rủi ro mới",
      "Vì mức ảnh hưởng của mỗi rủi ro khó lượng hoá nên thường bị đánh giá chủ quan",
    ],
    correctOption: 0,
    explanation:
      "Ba lý do kia đều đúng và đều là vấn đề của từng ô trong bảng. Vấn đề ở đây nằm ở chính cấu trúc bảng: nó giả định các dòng độc lập với nhau. Trong một dự án hạ tầng dài thì chúng không độc lập chút nào - chậm tiến độ làm chi phí tăng, chi phí tăng làm đợt rà soát ngân sách tới sớm hơn, và một đợt rà soát ở đúng đáy chữ J làm nguy cơ bị cắt tăng vọt. Ba sự kiện mà mỗi cái nhìn riêng đều chịu được, nhưng khi chúng nối vào nhau thì xác suất của chuỗi không phải tích của ba số nhỏ mà lớn hơn nhiều.",
    diagram: [
      { label: "Chậm tiến độ: một đội mượn bị rút về", arrow: true },
      { label: "→ chi phí tăng, thời gian kéo dài", arrow: true },
      { label: "→ đợt rà soát ngân sách tới đúng đáy chữ J", arrow: true },
      { label: "→ dự án bị cắt, dù không khâu nào làm sai" },
    ],
    realWorldExample: {
      company: "Ba việc nhỏ và một dự án chết",
      description:
        "Một đội mượn bị rút về vì đội gốc có sự cố. Dự án chậm sáu tuần. Sáu tuần đó đẩy mốc có người dùng đầu tiên qua khỏi kỳ rà soát quý. Kỳ rà soát nhìn vào và thấy một dự án đã tiêu bảy mươi phần trăm ngân sách với số người dùng bằng không. Không sự kiện nào trong ba sự kiện ấy là thảm hoạ, và kết cục thì là.",
    },
    quiz: [
      {
        question: "Ba rủi ro chính của một dự án hạ tầng dài là gì?",
        options: [
          "Mất nguồn lực, trượt mốc có người dùng, và mất sự ủng hộ",
          "Sai kiến trúc, thiếu năng lực kỹ thuật, và công nghệ được chọn không phù hợp",
          "Vượt ngân sách, chậm tiến độ, kém chất lượng",
          "Thay đổi yêu cầu, phụ thuộc bên thứ ba, và biến động nhân sự trong đội",
        ],
        correct: 0,
        explanation:
          "Ba nhóm kia là cách phân loại chung cho mọi dự án. Ba nhóm ở đây đặc thù cho hạ tầng vì chúng nối vào nhau theo một chiều cụ thể: mất nguồn lực đẩy mốc người dùng lùi lại, và mốc người dùng lùi lại là thứ trực tiếp làm mất sự ủng hộ.",
      },
      {
        question: "Mắt xích nào đáng chặn nhất trong chuỗi ba rủi ro?",
        options: [
          "Mốc có người dùng đầu tiên, vì nó nằm giữa hai mắt xích kia",
          "Mất nguồn lực, mắt xích đầu của chuỗi",
          "Mất sự ủng hộ, vì đó là mắt xích cuối cùng dẫn tới việc dự án bị dừng",
          "Cả ba như nhau vì chuỗi chỉ đứt khi chặn được bất kỳ mắt xích nào",
        ],
        correct: 0,
        explanation:
          "Mắt xích đầu nằm ngoài tầm kiểm soát của bạn và mắt xích cuối thì đã muộn. Mốc người dùng đầu tiên là mắt xích duy nhất bạn tác động trực tiếp được, và bảo vệ nó cắt chuỗi ở đúng chỗ - đó cũng là lý do nó nên là thứ được ưu tiên trước mọi thành phần khác.",
      },
      {
        question: "Nên xử lý thế nào khi biết trước một đợt rà soát ngân sách sắp tới?",
        options: [
          "Dồn sức đưa một đội lên dùng trước ngày đó, dù phạm vi rất hẹp",
          "Chuẩn bị tài liệu giải trình chi tiết về tiến độ và các khó khăn đã gặp phải",
          "Xin hoãn đợt rà soát sang kỳ sau",
          "Trình bày lại lộ trình với các mốc cụ thể để cho thấy dự án vẫn đang đúng hướng",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều là lời giải thích, và một lời giải thích ở đáy chữ J phải cạnh tranh với một biểu đồ chi phí rất thuyết phục. Một đội thật đang dùng thứ gì đó đổi hẳn loại câu hỏi được đặt ra, từ có nên tiếp tục không thành mở rộng nhanh tới đâu.",
      },
      {
        question: "Vì sao dự án dài chịu rủi ro cao hơn dự án ngắn cùng khối lượng?",
        options: [
          "Vì nó phải sống qua nhiều lần thay đổi ưu tiên và nhiều kỳ rà soát hơn",
          "Vì khối lượng lớn hơn thì lắm vấn đề hơn",
          "Vì kéo dài thì đội mất tập trung dần",
          "Vì công nghệ ban đầu có thể lỗi thời",
        ],
        correct: 0,
        explanation:
          "Đây là rủi ro của chính độ dài, độc lập với nội dung. Mỗi quý là một cơ hội để ưu tiên của công ty đổi, người bảo trợ chuyển việc, hoặc ngân sách bị siết. Chia một dự án mười hai tháng thành ba đoạn có kết quả dùng được không giảm khối lượng, nhưng nó giảm hẳn số lần dự án phải sống sót.",
      },
      {
        question: "Người bảo trợ dự án chuyển sang vị trí khác thì nên làm gì?",
        options: [
          "Tìm người bảo trợ mới ngay, trước khi cần tới họ",
          "Tiếp tục theo kế hoạch và báo cáo tiến độ cho người thay thế khi có",
          "Đề nghị người bảo trợ cũ bàn giao lại toàn bộ bối cảnh của dự án cho người mới",
          "Đẩy nhanh tiến độ để hoàn thành dự án trước khi có thay đổi về mặt tổ chức",
        ],
        correct: 0,
        explanation:
          "Một dự án hạ tầng không có người bảo trợ thì không bị dừng ngay - nó chỉ không được bảo vệ ở kỳ rà soát tiếp theo, và lúc đó thì đi tìm đã muộn. Bàn giao bối cảnh là việc nên làm và nó không tạo ra sự ủng hộ; ủng hộ đến từ việc người mới thấy dự án giải quyết vấn đề của chính họ.",
      },
    ],
    practicePrompt: {
      question:
        "Dự án mười hai tháng của bạn vừa mất một người mượn và sẽ chậm sáu tuần. Ưu tiên xử lý gì?",
      options: [
        "Kiểm xem sáu tuần đó có đẩy mốc người dùng đầu tiên qua kỳ rà soát không",
        "Tìm người thay thế càng sớm càng tốt để bù lại phần tiến độ đã bị chậm",
        "Cập nhật lại kế hoạch và thông báo cho các bên liên quan về mốc thời gian mới",
        "Cắt giảm phạm vi ở những phần ít quan trọng để giữ nguyên thời hạn ban đầu",
      ],
      correct: 0,
      explanation:
        "Sáu tuần chậm tự nó không nguy hiểm; nguy hiểm nằm ở việc nó rơi vào đâu. Nếu mốc người dùng vẫn nằm trước kỳ rà soát thì đây là một sự cố bình thường, còn nếu nó vượt qua thì bạn vừa nối xong mắt xích thứ hai của chuỗi và cần xử lý ngay hôm nay chứ không phải xử lý phần chậm.",
    },
    keyTakeaways: [
      "Bảng rủi ro theo dòng giả định các dòng độc lập; ở đây chúng nối vào nhau",
      "Mốc người dùng đầu tiên là mắt xích duy nhất bạn tác động trực tiếp được",
      "Độ dài tự nó là một rủi ro, độc lập với nội dung dự án",
      "Không có người bảo trợ thì dự án không chết ngay, nó chỉ không được bảo vệ",
    ],
    summary: {
      keyIdea: "Ba rủi ro của một dự án dài nối thành chuỗi, nên chúng không đến lẻ và không cộng lại",
      commonMistake: "Xử lý phần chậm sáu tuần mà không kiểm xem sáu tuần đó rơi vào trước hay sau kỳ rà soát",
      action: "Vẽ chuỗi ba mắt xích cho dự án của bạn, rồi bảo vệ mắt xích giữa: mốc có người dùng đầu tiên.",
    },
    application: {
      title: "Một chuỗi, không phải một bảng",
      message:
        "Thay bảng rủi ro theo dòng bằng một chuỗi: mất nguồn lực → trượt mốc người dùng → mất sự ủng hộ. Đánh dấu mắt xích bạn tác động được.",
      secondary:
        "Mỗi lần có sự cố, hỏi nó nối vào mắt xích nào - đó là câu hỏi quyết định mức độ khẩn cấp, không phải độ lớn của chính sự cố.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng rủi ro của một dự án dài liệt kê từng dòng với xác suất và mức ảnh hưởng riêng. Cách trình bày đó đúng với phần lớn dự án, và nó bỏ sót đúng cơ chế giết một dự án hạ tầng.",
      },
      {
        type: "heading",
        text: "Ba mắt xích, một chiều",
      },
      {
        type: "list",
        items: [
          "Mất nguồn lực: một người mượn bị rút, một đội hợp tác bận việc khác",
          "Trượt mốc có người dùng đầu tiên: hệ quả trực tiếp của mắt xích trên",
          "Mất sự ủng hộ: kỳ rà soát nhìn vào đúng lúc chưa có ai dùng",
          "Chiều đi luôn là như vậy, nên chặn ở giữa rẻ hơn chặn ở hai đầu",
        ],
      },
      {
        type: "paragraph",
        text: "Điều đáng chú ý là không mắt xích nào trong ba mắt xích ấy là một thảm hoạ khi đứng riêng. Một người bị rút về là chuyện xảy ra mọi lúc. Chậm sáu tuần trong một dự án mười hai tháng là bình thường. Một kỳ rà soát ngân sách là lịch cố định. Ba thứ bình thường nối vào nhau cho ra một kết cục mà không ai chọn.",
      },
      {
        type: "comparison",
        left: {
          label: "Đọc theo bảng",
          text: "Mất một người mượn: ảnh hưởng trung bình, xử lý bằng cách tìm người thay. Việc chậm sáu tuần được ghi vào mục tiến độ và theo dõi riêng.",
        },
        right: {
          label: "Đọc theo chuỗi",
          text: "Mất một người mượn đẩy mốc người dùng qua kỳ rà soát. Việc cần làm không phải tìm người thay, mà là kéo mốc ấy về trước ngày rà soát bằng mọi cách.",
        },
      },
      {
        type: "callout",
        label: "Độ dài tự nó là một rủi ro",
        text: "Một dự án mười hai tháng phải sống qua bốn kỳ rà soát, ít nhất một đợt đổi ưu tiên, và khả năng người bảo trợ chuyển việc. Chia nó thành ba đoạn mà mỗi đoạn kết thúc bằng thứ có người dùng không làm giảm khối lượng công một chút nào, nhưng nó giảm hẳn số lần dự án phải chứng minh mình đáng sống.",
      },
      {
        type: "closing",
        lines: [
          "Rủi ro của một dự án dài không nằm ở từng sự kiện mà ở thứ tự chúng nối vào nhau.",
          "Chặng này không nói cách xây một hạ tầng tốt; nó nói cách để hạ tầng bạn đang xây còn sống tới lúc có người dùng.",
        ],
      },
    ],
  },
];
