import type { Lesson } from "./lesson-types";

// Chặng "Private markets: cấu trúc và hiệu suất quỹ PE/VC" (ids 1471-1474).
//
// App đã có bài về private equity là gì, venture capital là gì, cap table và
// mô hình LBO - tức là phía giao dịch. Phía còn thiếu là phía quỹ: tiền của
// ai, nhà quản lý quỹ được trả thế nào, và vì sao hiệu suất của quỹ đóng
// không đo được bằng những thước đo dùng cho quỹ mở. Đây cũng là phần bị hỏi
// nhiều nhất khi phỏng vấn vị trí tại quỹ đầu tư.

export const PRIVATE_MARKETS_LESSONS: Lesson[] = [
  {
    id: 1471,
    slug: "cau-truc-quy-pe-vc-gp-lp",
    title: "Private markets, Bài 1: Cấu trúc quỹ PE/VC - GP, LP và vòng đời mười năm",
    subtitle: "Cam kết vốn, gọi vốn theo đợt, thời kỳ đầu tư và vì sao quỹ đóng phải có ngày kết thúc",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🏗️",
    track: "professional",
    whyItMatters:
      "Mọi hành vi của một quỹ đầu tư tư nhân - từ việc vì sao họ vội xuống tiền vào cuối thời kỳ đầu tư đến việc vì sao họ ép bán một công ty đang tốt - đều bắt nguồn từ cấu trúc quỹ. Hiểu cấu trúc là hiểu động cơ của người ngồi đối diện bàn đàm phán.",
    openingQuestion:
      "Cam kết vốn của nhà đầu tư vào một quỹ đầu tư tư nhân hoạt động thế nào?",
    openingOptions: [
      "Nhà đầu tư chuyển toàn bộ số tiền cam kết ngay khi quỹ hoàn tất huy động",
      "Nhà đầu tư cam kết một hạn mức, và chỉ chuyển tiền khi quỹ gọi vốn theo từng thương vụ",
      "Nhà đầu tư mua chứng chỉ quỹ trên sàn và có thể bán lại bất cứ lúc nào",
      "Nhà đầu tư góp vốn theo lịch cố định hằng quý trong suốt vòng đời của quỹ",
    ],
    correctOption: 1,
    explanation:
      "Đây là khác biệt cấu trúc quan trọng nhất so với quỹ mở. Nhà đầu tư cam kết một số tiền, nhưng tiền chỉ chuyển đi khi nhà quản lý quỹ tìm được thương vụ và phát lệnh gọi vốn. Vì tiền chưa nộp vẫn phải sẵn sàng, nhà đầu tư phải giữ thanh khoản cho phần cam kết chưa gọi - và việc quản lý phần cam kết chưa giải ngân này là một bài toán riêng của các tổ chức đầu tư lớn.",
    diagram: [
      { label: "LP cam kết một hạn mức vốn", arrow: true },
      { label: "GP tìm thương vụ và gọi vốn theo đợt", arrow: true },
      { label: "Thời kỳ đầu tư rồi thời kỳ nắm giữ", arrow: true },
      { label: "Thoái vốn và phân phối tiền về cho LP" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Áp lực giải ngân cuối thời kỳ đầu tư",
      description:
        "Một quỹ có thời kỳ đầu tư khoảng năm năm. Nếu đến năm thứ tư mà phần lớn vốn cam kết chưa được giải ngân, nhà quản lý quỹ đứng trước lựa chọn khó chịu: hoặc trả lại phần cam kết chưa dùng và mất phí quản lý tương ứng, hoặc chấp nhận những thương vụ mà họ sẽ không xét đến trong năm đầu tiên. Đây là lý do các quỹ huy động cùng một thời điểm thường có chất lượng thương vụ giảm dần về cuối chu kỳ, và là một trong những giải thích được kiểm chứng cho hiện tượng quỹ của các năm đỉnh huy động thường có hiệu suất kém.",
    },
    quiz: [
      {
        question: "Vai trò của nhà quản lý quỹ và nhà đầu tư góp vốn khác nhau thế nào?",
        options: [
          "Nhà quản lý ra quyết định đầu tư; nhà đầu tư góp vốn và không tham gia điều hành",
          "Cả hai cùng biểu quyết cho từng thương vụ mà quỹ dự định thực hiện trong kỳ",
          "Nhà đầu tư chọn danh mục còn nhà quản lý chỉ thực hiện các giao dịch mua bán",
          "Nhà quản lý chịu trách nhiệm vô hạn còn nhà đầu tư bảo lãnh cho các khoản vay của quỹ",
        ],
        correct: 0,
        explanation:
          "Sự tách bạch này là điều kiện để nhà đầu tư giữ được trách nhiệm hữu hạn. Đổi lại, họ gần như không có quyền can thiệp vào từng quyết định đầu tư, và đó là lý do việc thẩm định nhà quản lý quỹ quan trọng hơn việc thẩm định từng thương vụ.",
      },
      {
        question: "Vì sao quỹ đầu tư tư nhân có ngày kết thúc xác định?",
        options: [
          "Vì quy định pháp luật giới hạn thời gian tồn tại của mọi loại hình quỹ đầu tư",
          "Vì nhà đầu tư cần biết khi nào được nhận lại vốn, do không bán lại phần vốn dễ dàng",
          "Vì sau thời hạn đó nhà quản lý quỹ phải chuyển sang mô hình quỹ mở theo thông lệ",
          "Vì thuế đối với lợi nhuận đầu tư tăng lên nếu quỹ hoạt động quá thời hạn quy định",
        ],
        correct: 1,
        explanation:
          "Không có thị trường thứ cấp thuận tiện cho phần vốn góp, nên cơ chế bảo vệ nhà đầu tư là một ngày kết thúc buộc quỹ phải bán hết tài sản và trả tiền. Chính ràng buộc này tạo ra áp lực thoái vốn có thể không trùng với thời điểm tốt nhất về mặt kinh doanh.",
      },
      {
        question: "Phần cam kết chưa được gọi vốn tạo ra vấn đề gì cho nhà đầu tư?",
        options: [
          "Phải giữ thanh khoản sẵn sàng, làm giảm lợi suất trên tổng vốn phân bổ",
          "Phải trả phí phạt cho quỹ nếu chưa được gọi vốn trong vòng một năm đầu tiên",
          "Phần cam kết chưa gọi bị tính lãi vay theo lãi suất thị trường tại thời điểm gọi vốn",
          "Nhà đầu tư mất quyền tham gia các quỹ tiếp theo do cùng nhà quản lý huy động",
        ],
        correct: 0,
        explanation:
          "Tiền chờ gọi vốn thường được giữ ở tài sản thanh khoản lợi suất thấp. Đây là chi phí ẩn ít được nhắc tới khi so hiệu suất quỹ đầu tư tư nhân với thị trường niêm yết, vì hiệu suất quỹ chỉ tính trên phần vốn đã giải ngân.",
      },
      {
        question: "Vì sao thẩm định nhà quản lý quỹ quan trọng hơn thẩm định một thương vụ cụ thể?",
        options: [
          "Vì nhà đầu tư cam kết vốn trước khi biết quỹ sẽ đầu tư vào doanh nghiệp nào",
          "Vì thương vụ đầu tiên luôn quyết định phần lớn hiệu suất của cả vòng đời quỹ",
          "Vì các thương vụ đều được kiểm toán độc lập trước khi quỹ ra quyết định giải ngân",
          "Vì nhà đầu tư có quyền rút vốn khỏi từng thương vụ mà họ không đồng thuận",
        ],
        correct: 0,
        explanation:
          "Cam kết vốn là một quyết định mù: bạn giao tiền cho một đội ngũ với một chiến lược, chứ không mua một danh mục cụ thể. Vì vậy phần thẩm định tập trung vào lịch sử hiệu suất, tính nhất quán của đội ngũ và mức độ khớp giữa chiến lược đã tuyên bố với các thương vụ đã làm.",
      },
    
    {
      "question": "Vì sao thẩm định nhà quản lý quỹ lại quan trọng hơn thẩm định một thương vụ cụ thể?",
      "options": [
        "Vì nhà đầu tư cam kết vốn trước khi biết quỹ sẽ mua những gì",
        "Vì nhà đầu tư có quyền phủ quyết từng thương vụ trong suốt vòng đời quỹ",
        "Vì các thương vụ đầu tiên thường quyết định toàn bộ hiệu suất của quỹ",
        "Vì nhà quản lý quỹ chịu trách nhiệm pháp lý"
      ],
      "correct": 0,
      "explanation": "Bạn ký cam kết mười năm cho một danh mục chưa tồn tại. Thứ duy nhất thẩm định được tại thời điểm đó là con người: cách họ tìm thương vụ, cách họ xử lý khoản đầu tư hỏng, và mức độ nhất quán giữa chiến lược đã nói với những gì họ thực sự làm ở quỹ trước."
    }
    ],
    keyTakeaways: [
      "Nhà đầu tư cam kết hạn mức vốn, tiền chỉ chuyển khi quỹ gọi vốn theo từng thương vụ",
      "Quỹ có vòng đời xác định và ngày kết thúc, tạo ra áp lực thoái vốn theo lịch chứ không theo cơ hội",
      "Thời kỳ đầu tư có hạn tạo áp lực giải ngân, làm chất lượng thương vụ giảm dần về cuối kỳ",
      "Cam kết vốn là quyết định mù - thẩm định đội ngũ quan trọng hơn thẩm định một thương vụ",
    ],
    practicePrompt: {
      question:
        "Một quỹ ở năm thứ tư của thời kỳ đầu tư năm năm và mới giải ngân 40% vốn cam kết. Rủi ro chính với nhà đầu tư là gì?",
      options: [
        "Quỹ sẽ trả lại toàn bộ phần vốn chưa dùng và nhà đầu tư mất cơ hội sinh lời",
        "Áp lực giải ngân khiến quỹ hạ tiêu chuẩn thẩm định để kịp dùng hết vốn cam kết",
        "Phí quản lý sẽ tăng lên để bù cho phần vốn chưa được đưa vào hoạt động đầu tư",
        "Quỹ buộc phải gia hạn thời kỳ đầu tư và kéo dài vòng đời thêm nhiều năm nữa",
      ],
      correct: 1,
      explanation:
        "Động cơ ở đây rất rõ: phí quản lý thường tính trên vốn đã giải ngân sau thời kỳ đầu tư, còn phần thưởng lớn chỉ đến từ các thương vụ thực sự làm. Không giải ngân đồng nghĩa với việc không có gì để kiếm lời. Đây là lúc nhà đầu tư nên soi kỹ các thương vụ mới nhất của quỹ so với những thương vụ đầu tiên.",
    },
    summary: {
      keyIdea: "Cấu trúc quỹ quyết định hành vi của nhà quản lý quỹ nhiều hơn quan điểm đầu tư của họ",
      commonMistake: "Đánh giá quỹ như đánh giá một danh mục cổ phiếu, bỏ qua vòng đời và áp lực giải ngân",
      action: "Tìm tài liệu giới thiệu của một quỹ và xác định thời kỳ đầu tư, vòng đời và cơ chế gọi vốn.",
    },
    application: {
      title: "Đọc động cơ trước khi đọc luận điểm",
      message:
        "Khi ngồi đối diện một quỹ trong thương vụ, hãy hỏi: quỹ này đang ở năm thứ mấy của vòng đời? Nếu họ đang cuối thời kỳ đầu tư, họ cần xuống tiền hơn bạn cần vốn. Nếu quỹ sắp đến ngày kết thúc, họ cần bán hơn bạn cần mua.",
      secondary: "Vị thế đàm phán trong private markets phụ thuộc vào lịch của quỹ nhiều hơn người ta thừa nhận.",
    },
    sections: [
      {
        type: "lead",
        text: "Track 2 đã dạy private equity là gì và mô hình LBO hoạt động ra sao - tức là phía thương vụ. Nhưng người quyết định thương vụ đó lại vận hành trong một cấu trúc có luật chơi riêng, và cấu trúc ấy giải thích gần hết những hành vi trông có vẻ khó hiểu của họ.",
      },
      {
        type: "conceptTable",
        title: "Vòng đời một quỹ đóng",
        subtitle: "Bốn giai đoạn, mỗi giai đoạn tạo ra một loại động cơ khác nhau",
        concepts: [
          { vi: "Huy động vốn", en: "Fundraising", def: "Nhà quản lý thuyết phục các tổ chức cam kết vốn dựa trên hiệu suất quá khứ và chiến lược tuyên bố. Chưa có đồng nào được chuyển đi." },
          { vi: "Thời kỳ đầu tư", en: "Investment period", def: "Vài năm đầu, quỹ tìm thương vụ và gọi vốn theo từng đợt. Càng về cuối kỳ, áp lực giải ngân càng lớn." },
          { vi: "Thời kỳ nắm giữ", en: "Holding period", def: "Cải thiện hoạt động doanh nghiệp, bổ sung vốn cho các khoản đầu tư hiện có, chuẩn bị phương án thoái." },
          { vi: "Thoái vốn", en: "Harvest / exit", def: "Bán doanh nghiệp và phân phối tiền về cho nhà đầu tư trước ngày kết thúc quỹ. Lịch này có thể không trùng với thời điểm bán tốt nhất." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao đây là kiến thức thực dụng",
        text: "Nếu bạn làm ở doanh nghiệp đang gọi vốn, hoặc làm tư vấn cho một thương vụ, hoặc phỏng vấn vào chính một quỹ, câu hỏi đầu tiên cần trả lời là quỹ đối diện đang ở giai đoạn nào của vòng đời. Nó cho biết họ có thời gian không, họ cần gì, và họ sẵn sàng nhượng bộ ở đâu.",
      },
      {
        type: "closing",
        lines: [
          "Cấu trúc tạo ra động cơ, và động cơ tạo ra hành vi trên bàn đàm phán.",
          "Bài sau đi vào phần tiền: nhà quản lý quỹ được trả như thế nào, và cơ chế đó khuyến khích điều gì.",
        ],
      },
    ],
  },
  {
    id: 1472,
    slug: "phi-quan-ly-carry-va-waterfall",
    title: "Private markets, Bài 2: Phí quản lý, carry và waterfall - nhà quản lý quỹ được trả thế nào",
    subtitle: "Ngưỡng lợi nhuận tối thiểu, cơ chế bắt kịp và thứ tự phân phối tiền",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "💧",
    track: "professional",
    whyItMatters:
      "Cơ chế trả thưởng quyết định hành vi. Hiểu waterfall giúp bạn biết vì sao một nhà quản lý quỹ sẵn sàng dùng đòn bẩy cao, vì sao họ giữ một khoản đầu tư thất bại lâu hơn cần thiết, và vì sao hai quỹ cùng lợi suất gộp lại trả về cho nhà đầu tư số tiền khác nhau.",
    openingQuestion:
      "Ngưỡng lợi nhuận tối thiểu trong hợp đồng quỹ có tác dụng gì?",
    openingOptions: [
      "Đảm bảo nhà đầu tư nhận đủ một mức lợi suất trước khi nhà quản lý được chia lãi",
      "Giới hạn mức lỗ tối đa mà nhà đầu tư phải chịu trong toàn bộ vòng đời quỹ",
      "Xác định mức lãi suất mà quỹ được phép vay để tài trợ cho các thương vụ",
      "Quy định mức lợi suất tối thiểu mà quỹ cam kết trả cho nhà đầu tư bằng văn bản",
    ],
    correctOption: 0,
    explanation:
      "Đây là cơ chế bảo vệ nhà đầu tư: nhà quản lý chỉ được chia phần lợi nhuận sau khi nhà đầu tư đã nhận lại toàn bộ vốn góp cộng một mức lợi suất tối thiểu. Lưu ý nó không phải một cam kết - nếu quỹ không đạt mức đó thì đơn giản là nhà quản lý không được chia lãi, chứ nhà đầu tư không được ai bù. Nhầm ngưỡng lợi nhuận tối thiểu với một khoản bảo đảm là hiểu lầm phổ biến nhất về cấu trúc phí của quỹ.",
    diagram: [
      { label: "Hoàn trả vốn góp cho nhà đầu tư", arrow: true },
      { label: "Trả đủ mức lợi suất tối thiểu", arrow: true },
      { label: "Cơ chế bắt kịp cho nhà quản lý", arrow: true },
      { label: "Phần còn lại chia theo tỷ lệ đã thỏa thuận" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Cấu trúc phí thông lệ của ngành",
      description:
        "Thông lệ lâu năm của ngành là phí quản lý khoảng 2% mỗi năm cộng 20% phần lợi nhuận vượt ngưỡng tối thiểu quanh mức 8%. Con số cụ thể đã dịch chuyển theo tương quan sức mạnh giữa quỹ và nhà đầu tư: các quỹ lớn có lịch sử tốt vẫn giữ được mức truyền thống, trong khi quỹ mới thường phải nhượng bộ. Điểm quan trọng với người phân tích không phải mức phí, mà là cơ sở tính phí và thứ tự phân phối - hai chi tiết đó ảnh hưởng tới tiền về tay nhà đầu tư nhiều hơn cả con số phần trăm.",
    },
    quiz: [
      {
        question: "Phí quản lý thường được tính trên cơ sở nào trong thời kỳ đầu tư?",
        options: [
          "Trên tổng vốn cam kết, kể cả phần chưa được gọi và chưa đầu tư",
          "Trên giá trị thị trường của danh mục tại thời điểm cuối mỗi quý",
          "Trên phần lợi nhuận đã thực hiện từ các thương vụ đã thoái vốn thành công",
          "Trên số tiền mặt mà quỹ đang giữ chờ giải ngân vào các thương vụ mới",
        ],
        correct: 0,
        explanation:
          "Đây là chi tiết có ảnh hưởng lớn tới lợi suất ròng. Tính trên vốn cam kết nghĩa là nhà đầu tư trả phí cho cả phần tiền chưa được đưa vào làm việc, và sau thời kỳ đầu tư cơ sở tính phí thường chuyển sang vốn đã giải ngân còn lại.",
      },
      {
        question: "Cơ chế bắt kịp trong waterfall hoạt động thế nào?",
        options: [
          "Sau khi nhà đầu tư nhận đủ ngưỡng tối thiểu, nhà quản lý nhận phần lớn dòng tiền tiếp theo",
          "Nhà đầu tư được ưu tiên nhận toàn bộ lợi nhuận cho tới khi đạt gấp đôi vốn góp",
          "Nhà quản lý phải hoàn trả phần thưởng đã nhận nếu các thương vụ sau bị lỗ",
          "Quỹ tạm dừng phân phối cho tới khi toàn bộ danh mục được thoái vốn hoàn tất",
        ],
        correct: 0,
        explanation:
          "Mục đích của cơ chế này là đưa tỷ lệ chia về đúng mức thỏa thuận trên toàn bộ lợi nhuận, chứ không chỉ trên phần vượt ngưỡng. Nó khiến vùng lợi suất ngay trên ngưỡng tối thiểu trở thành vùng nhà quản lý được hưởng gần như toàn bộ dòng tiền tăng thêm.",
      },
      {
        question: "Điều khoản hoàn trả phần thưởng đã nhận bảo vệ nhà đầu tư khỏi rủi ro gì?",
        options: [
          "Rủi ro nhà quản lý được chia lãi từ thương vụ sớm rồi các thương vụ sau thua lỗ",
          "Rủi ro quỹ không huy động đủ vốn cam kết như kế hoạch ban đầu đã công bố",
          "Rủi ro nhà quản lý rời quỹ trước khi kết thúc vòng đời đầu tư của quỹ",
          "Rủi ro giá trị danh mục giảm do biến động chung của thị trường tài chính",
        ],
        correct: 0,
        explanation:
          "Không có điều khoản này, nhà quản lý có động cơ bán sớm thương vụ tốt nhất để chốt phần thưởng, rồi để các khoản còn lại tự xoay xở. Cơ chế phân phối theo toàn bộ vòng đời quỹ thay vì theo từng thương vụ cũng nhằm giải quyết đúng vấn đề này.",
      },
      {
        question: "Vì sao cấu trúc phần thưởng khuyến khích dùng đòn bẩy cao?",
        options: [
          "Vì đòn bẩy làm giảm phí quản lý mà nhà đầu tư phải trả trong thời kỳ nắm giữ",
          "Vì phần thưởng có dạng quyền chọn: hưởng phần trên, không chia phần lỗ vượt vốn",
          "Vì các khoản vay được tính vào vốn cam kết nên làm tăng cơ sở tính phí quản lý",
          "Vì lãi vay được trừ khỏi lợi nhuận trước khi tính ngưỡng lợi suất tối thiểu",
        ],
        correct: 1,
        explanation:
          "Đây là bất đối xứng cốt lõi của mọi cơ chế chia lãi hiệu suất. Phần thưởng của nhà quản lý giống một quyền chọn mua trên hiệu suất của quỹ, mà giá trị quyền chọn thì tăng theo độ biến động. Đối trọng thực tế là danh tiếng và khả năng huy động quỹ tiếp theo, chứ không nằm trong công thức tính thưởng.",
      },
      {
        question: "Vì sao hai quỹ cùng lợi suất gộp có thể trả về cho nhà đầu tư số tiền khác nhau?",
        options: [
          "Vì cơ sở tính phí, thứ tự phân phối và cơ chế bắt kịp khác nhau giữa hai quỹ",
          "Vì mức thuế áp dụng cho từng quỹ phụ thuộc vào quốc gia đăng ký thành lập",
          "Vì thời điểm thoái vốn khác nhau dẫn tới tỷ giá quy đổi khác nhau khi phân phối",
          "Vì quy mô quỹ khác nhau nên chi phí vận hành trên mỗi đồng vốn cũng khác nhau",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa lợi suất gộp và lợi suất ròng có thể rất lớn, và nó nằm ở các chi tiết hợp đồng chứ không ở kỹ năng đầu tư. Đây là lý do nhà đầu tư tổ chức luôn so sánh bằng lợi suất ròng đã trừ toàn bộ phí.",
      },
    ],
    keyTakeaways: [
      "Ngưỡng lợi suất tối thiểu là điều kiện để nhà quản lý được chia lãi, không phải một cam kết bảo đảm",
      "Cơ sở tính phí quản lý - trên vốn cam kết hay vốn đã giải ngân - ảnh hưởng lớn tới lợi suất ròng",
      "Cơ chế bắt kịp đưa tỷ lệ chia về mức thỏa thuận trên toàn bộ lợi nhuận, không chỉ phần vượt ngưỡng",
      "Phần thưởng có dạng quyền chọn nên khuyến khích rủi ro; điều khoản hoàn trả và phân phối theo cả vòng đời quỹ là đối trọng",
    ],
    practicePrompt: {
      question:
        "Quỹ có ngưỡng lợi suất tối thiểu 8% và tỷ lệ chia lãi 20%. Quỹ đạt lợi suất gộp 8,5%. Nhà quản lý nhận được gì?",
      options: [
        "Không nhận gì vì lợi suất chưa vượt xa mức ngưỡng tối thiểu đã thỏa thuận",
        "Nhận 20% của phần 0,5% vượt ngưỡng, tức một khoản rất nhỏ so với quy mô quỹ",
        "Tùy cơ chế bắt kịp: nếu có, phần lớn của 0,5% đó thuộc về nhà quản lý",
        "Nhận 20% của toàn bộ 8,5% lợi suất vì quỹ đã vượt qua ngưỡng tối thiểu",
      ],
      correct: 2,
      explanation:
        "Đây chính là lý do phải đọc kỹ điều khoản bắt kịp. Không có nó, nhà quản lý chỉ nhận 20% của phần vượt ngưỡng. Có nó, phần dòng tiền ngay trên ngưỡng gần như toàn bộ chảy về nhà quản lý cho tới khi tỷ lệ chia trên tổng lợi nhuận đạt đúng 20%. Cùng một mức lợi suất gộp, hai cấu trúc cho ra hai kết quả rất khác nhau cho nhà đầu tư.",
    },
    summary: {
      keyIdea: "Cơ chế phân phối tiền quyết định hành vi, và nó nằm ở các chi tiết chứ không ở con số phần trăm",
      commonMistake: "Coi ngưỡng lợi suất tối thiểu như một mức lợi nhuận được bảo đảm",
      action: "Vẽ lại waterfall của một quỹ thành bốn tầng và tính thử phần chia ở ba mức lợi suất khác nhau.",
    },
    application: {
      title: "Bốn câu hỏi về cấu trúc phí",
      message:
        "Phí quản lý tính trên cơ sở nào và thay đổi thế nào sau thời kỳ đầu tư? Ngưỡng lợi suất tối thiểu là bao nhiêu và tính lũy kế hay không? Có cơ chế bắt kịp không và ở tỷ lệ nào? Và phân phối theo từng thương vụ hay theo toàn bộ vòng đời quỹ?",
      secondary: "Bốn câu này quyết định khoảng cách giữa lợi suất gộp mà quỹ quảng cáo và lợi suất ròng bạn thực nhận.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong tài chính, muốn dự đoán hành vi của ai đó thì hãy nhìn cách họ được trả tiền. Cơ chế phân phối lợi nhuận của một quỹ đầu tư tư nhân là một trong những ví dụ rõ nhất của nguyên tắc này, và nó phức tạp hơn con số hai phần trăm cộng hai mươi phần trăm mà ai cũng nghe qua.",
      },
      {
        type: "heading",
        text: "Bốn tầng của waterfall",
      },
      {
        type: "list",
        items: [
          "Tầng 1 - hoàn vốn: nhà đầu tư nhận lại toàn bộ số vốn đã góp, bao gồm cả phần đã trả phí",
          "Tầng 2 - lợi suất tối thiểu: nhà đầu tư nhận thêm cho tới khi đạt mức lợi suất thỏa thuận",
          "Tầng 3 - bắt kịp: nhà quản lý nhận phần lớn dòng tiền tiếp theo để tỷ lệ chia trên tổng lợi nhuận về đúng mức đã thỏa thuận",
          "Tầng 4 - chia phần còn lại: mọi dòng tiền sau đó chia theo tỷ lệ đã định giữa hai bên",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Phân phối theo toàn bộ quỹ",
          text: "Nhà quản lý chỉ được chia lãi sau khi toàn bộ vốn và lợi suất tối thiểu của cả quỹ đã trả xong. An toàn hơn cho nhà đầu tư.",
        },
        right: {
          label: "Phân phối theo từng thương vụ",
          text: "Chia lãi ngay khi từng thương vụ thoái vốn có lãi. Cần điều khoản hoàn trả để xử lý trường hợp các thương vụ sau thua lỗ.",
        },
      },
      {
        type: "callout",
        label: "Bất đối xứng không thể xóa bỏ",
        text: "Nhà quản lý hưởng phần trên của kết quả nhưng không chia phần lỗ vượt quá số vốn họ tự góp vào quỹ. Cấu trúc đó, giống mọi cơ chế thưởng theo hiệu suất, khuyến khích chấp nhận rủi ro cao hơn mức nhà đầu tư mong muốn. Các điều khoản hợp đồng chỉ làm giảm chứ không loại bỏ được vấn đề này - phần đối trọng thật nằm ở việc nhà quản lý còn muốn huy động quỹ tiếp theo hay không.",
      },
      {
        type: "closing",
        lines: [
          "Đọc waterfall là đọc động cơ, và động cơ dự báo hành vi tốt hơn mọi bản cam kết.",
          "Bài sau chuyển sang câu hỏi khó nhất của private markets: đo hiệu suất bằng cách nào cho trung thực.",
        ],
      },
    ],
  },
  {
    id: 1473,
    slug: "do-hieu-suat-quy-irr-moic-dpi-tvpi",
    title: "Private markets, Bài 3: Đo hiệu suất quỹ - IRR, MOIC, DPI, TVPI và đường cong J",
    subtitle: "Vì sao IRR có thể đánh lừa, và bộ chỉ số nào mới cho biết tiền đã thực sự về tay",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "📈",
    track: "professional",
    whyItMatters:
      "Quỹ đầu tư tư nhân quảng cáo bằng IRR, nhưng IRR là thước đo dễ bị tác động nhất trong toàn bộ tài chính. Biết đọc bộ bốn chỉ số cùng lúc là cách duy nhất phân biệt hiệu suất thật với hiệu suất được trình bày khéo.",
    openingQuestion:
      "Vì sao IRR của một quỹ có thể bị đẩy lên mà không cần tạo thêm giá trị nào?",
    openingOptions: [
      "Vì IRR rất nhạy với thời điểm dòng tiền, nên rút ngắn thời gian nắm giữ là đủ",
      "Vì IRR được tính trên vốn cam kết chứ không trên vốn thực tế đã giải ngân",
      "Vì IRR không tính đến phí quản lý và phần chia lãi của nhà quản lý quỹ",
      "Vì IRR chỉ đo phần lợi nhuận đã thực hiện chứ không đo phần chưa thoái vốn",
    ],
    correctOption: 0,
    explanation:
      "IRR đo lợi suất theo thời gian, nên một thương vụ nhân đôi vốn trong một năm cho IRR 100%, còn nhân ba trong sáu năm chỉ khoảng 20% - dù thương vụ thứ hai tạo ra nhiều tiền hơn. Vì vậy quỹ có thể cải thiện IRR bằng cách bán sớm các thương vụ tốt, hoặc dùng khoản vay ngắn hạn để trì hoãn việc gọi vốn từ nhà đầu tư, khiến đồng hồ IRR bắt đầu chạy muộn hơn. Cả hai cách đều không tạo thêm một đồng lợi nhuận nào cho nhà đầu tư.",
    diagram: [
      { label: "IRR: lợi suất theo thời gian", arrow: true },
      { label: "MOIC: số lần nhân vốn", arrow: true },
      { label: "DPI: tiền đã thực về tay", arrow: true },
      { label: "TVPI: tổng giá trị gồm cả phần chưa thoái" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Đường cong J trong những năm đầu của quỹ",
      description:
        "Nhà đầu tư lần đầu tham gia quỹ đầu tư tư nhân thường hoảng khi thấy báo cáo năm thứ hai cho lợi suất âm. Đó là hiện tượng bình thường: phí quản lý được thu ngay từ đầu trong khi các khoản đầu tư chưa kịp tăng giá trị và chưa có thương vụ nào thoái vốn. Đường hiệu suất vì thế đi xuống trước rồi mới đi lên, tạo hình chữ J. Đánh giá một quỹ ở năm thứ hai gần như vô nghĩa, và mọi so sánh xếp hạng quỹ non tuổi đều nên bị hoài nghi.",
    },
    quiz: [
      {
        question: "MOIC đo lường điều gì?",
        options: [
          "Tổng giá trị nhận được chia cho tổng vốn đã bỏ ra, không tính yếu tố thời gian",
          "Lợi suất bình quân mỗi năm của khoản đầu tư trong suốt thời gian nắm giữ",
          "Phần lợi nhuận đã thực hiện chia cho phần lợi nhuận còn nằm trên giấy",
          "Giá trị danh mục hiện tại chia cho giá trị danh mục tại thời điểm đầu tư ban đầu",
        ],
        correct: 0,
        explanation:
          "MOIC trả lời câu hỏi đơn giản là một đồng bỏ ra thu về mấy đồng. Nó bỏ qua thời gian, nên phải đọc cùng IRR: MOIC cao với IRR thấp nghĩa là tiền bị giam rất lâu.",
      },
      {
        question: "DPI khác TVPI ở điểm nào?",
        options: [
          "DPI chỉ tính tiền đã phân phối thật; TVPI cộng thêm giá trị danh mục còn lại",
          "DPI tính theo giá trị sổ sách còn TVPI tính theo giá trị thị trường hiện tại",
          "DPI áp dụng cho quỹ đã kết thúc còn TVPI cho quỹ vẫn đang trong thời kỳ đầu tư",
          "DPI đã trừ phí quản lý và phần chia lãi còn TVPI là con số trước phí",
        ],
        correct: 0,
        explanation:
          "DPI là thước đo trung thực nhất vì nó chỉ đếm tiền đã thực sự về tài khoản nhà đầu tư. Phần chênh giữa TVPI và DPI là giá trị do chính nhà quản lý quỹ tự ước tính cho các khoản chưa bán - và đó là phần cần hoài nghi.",
      },
      {
        question: "Vì sao phần giá trị chưa thoái vốn cần được nhìn với sự hoài nghi?",
        options: [
          "Vì giá trị đó do nhà quản lý quỹ tự định giá, chính người được trả thưởng theo nó",
          "Vì các khoản chưa thoái vốn luôn có giá trị thấp hơn mức được ghi nhận trên báo cáo",
          "Vì quy định không cho phép quỹ ghi nhận giá trị của khoản đầu tư chưa thoái vốn",
          "Vì giá trị đó chưa được kiểm toán độc lập cho tới khi quỹ kết thúc vòng đời",
        ],
        correct: 0,
        explanation:
          "Đây là xung đột lợi ích có cấu trúc, không phải cáo buộc về đạo đức. Vì không có giá thị trường, việc định giá dựa trên bội số của các doanh nghiệp tương đương và các giả định do chính quỹ chọn. Nhà đầu tư tổ chức vì vậy ưu tiên DPI khi đánh giá các quỹ đã hoạt động đủ lâu.",
      },
      {
        question: "Đường cong J mô tả hiện tượng gì?",
        options: [
          "Hiệu suất âm trong những năm đầu do phí thu trước và chưa có thương vụ thoái vốn",
          "Xu hướng giá trị danh mục tăng nhanh rồi chững lại vào cuối vòng đời của quỹ",
          "Mối quan hệ giữa quy mô quỹ và hiệu suất bình quân của các quỹ trong ngành",
          "Sự chênh lệch giữa lợi suất gộp và lợi suất ròng qua các năm hoạt động của quỹ",
        ],
        correct: 0,
        explanation:
          "Hiểu đường cong J giúp bạn không hoảng khi thấy báo cáo âm ở năm thứ hai, và quan trọng hơn, không bị thuyết phục bởi bảng xếp hạng các quỹ non tuổi - vị trí trên bảng đó chủ yếu phản ánh quỹ đã đi được bao xa trên đường cong chứ không phải kỹ năng.",
      },
      {
        question: "Cách so sánh hiệu suất quỹ đầu tư tư nhân với thị trường niêm yết công bằng nhất là gì?",
        options: [
          "So IRR của quỹ với lợi suất bình quân của chỉ số chứng khoán trong cùng giai đoạn",
          "Mô phỏng đúng dòng tiền của quỹ nếu số tiền đó được đầu tư vào chỉ số niêm yết",
          "So MOIC của quỹ với mức tăng của chỉ số chứng khoán trong cùng số năm nắm giữ",
          "So DPI của quỹ với tỷ suất cổ tức bình quân của các doanh nghiệp niêm yết",
        ],
        correct: 1,
        explanation:
          "Phương pháp này giải quyết đúng vấn đề của IRR: nó lấy chính lịch gọi vốn và phân phối của quỹ rồi hỏi nếu cùng dòng tiền ấy được rót vào chỉ số thì kết quả ra sao. So sánh trực tiếp IRR với lợi suất chỉ số là so hai thước đo khác bản chất.",
      },
    ],
    keyTakeaways: [
      "IRR rất nhạy với thời điểm dòng tiền và có thể được cải thiện mà không tạo thêm giá trị",
      "MOIC đo số lần nhân vốn và bỏ qua thời gian - phải đọc cùng IRR",
      "DPI là thước đo trung thực nhất vì chỉ đếm tiền đã thực về tài khoản nhà đầu tư",
      "Phần chênh giữa TVPI và DPI là giá trị do chính nhà quản lý tự ước tính - cần hoài nghi",
    ],
    practicePrompt: {
      question:
        "Quỹ A: IRR 28%, DPI 0,4, TVPI 1,9, đang ở năm thứ bảy. Nhận định nào hợp lý nhất?",
      options: [
        "Quỹ đang có hiệu suất xuất sắc, thể hiện rõ qua mức IRR cao hơn hẳn thị trường",
        "Phần lớn giá trị vẫn nằm trên giấy, cần xem cơ sở định giá các khoản chưa thoái",
        "Quỹ đã trả về cho nhà đầu tư gần gấp đôi vốn góp tính đến thời điểm hiện tại",
        "Không đánh giá được vì thiếu thông tin về ngưỡng lợi suất tối thiểu của quỹ",
      ],
      correct: 1,
      explanation:
        "Ở năm thứ bảy, DPI chỉ 0,4 nghĩa là nhà đầu tư mới nhận lại 40% vốn góp bằng tiền thật, trong khi TVPI 1,9 cho thấy phần lớn con số đẹp đến từ định giá các khoản chưa bán. IRR 28% được tính một phần trên chính những định giá đó. Câu hỏi tiếp theo phải là: các khoản còn lại được định giá bằng bội số nào, và quỹ còn bao nhiêu thời gian để bán chúng.",
    },
    summary: {
      keyIdea: "Đọc bốn chỉ số cùng lúc; đọc riêng IRR là cách chắc chắn nhất để bị dẫn dắt",
      formula: "DPI = Tiền đã phân phối / Vốn đã góp; TVPI = (Đã phân phối + Giá trị còn lại) / Vốn đã góp",
      commonMistake: "Xếp hạng các quỹ non tuổi bằng IRR, trong khi đó chủ yếu phản ánh vị trí trên đường cong J",
      action: "Với một quỹ bất kỳ, tính tỷ lệ DPI trên TVPI để biết bao nhiêu phần trăm hiệu suất là tiền thật.",
    },
    application: {
      title: "Bộ ba câu hỏi khi đọc báo cáo quỹ",
      message:
        "Bao nhiêu phần trăm hiệu suất đã thành tiền thật, tức tỷ lệ DPI trên TVPI? Quỹ đang ở năm thứ mấy của vòng đời? Và các khoản chưa thoái được định giá bằng phương pháp nào, do ai thực hiện?",
      secondary: "Ba câu này biến một trang báo cáo hiệu suất đầy con số đẹp thành một bức tranh đọc được.",
    },
    sections: [
      {
        type: "lead",
        text: "Đo hiệu suất của một quỹ đóng khó hơn hẳn quỹ mở, vì bạn không kiểm soát thời điểm tiền vào tiền ra, và phần lớn tài sản không có giá thị trường. Ngành đã phát triển một bộ chỉ số riêng cho tình huống này, và mỗi chỉ số chỉ trả lời được một phần câu hỏi.",
      },
      {
        type: "conceptTable",
        title: "Bốn chỉ số, bốn câu hỏi khác nhau",
        subtitle: "Không chỉ số nào đủ một mình",
        concepts: [
          { vi: "Tỷ suất hoàn vốn nội bộ", en: "IRR", def: "Lợi suất theo thời gian. Nhạy với thời điểm dòng tiền, nên có thể được cải thiện bằng cách bán sớm hoặc trì hoãn gọi vốn." },
          { vi: "Bội số vốn đầu tư", en: "MOIC", def: "Một đồng bỏ ra thu về mấy đồng. Không tính thời gian, nên MOIC cao mà IRR thấp nghĩa là tiền bị giam lâu." },
          { vi: "Tiền đã phân phối trên vốn góp", en: "DPI", def: "Chỉ đếm tiền đã thực sự về tài khoản. Thước đo trung thực nhất, và cũng là thước đo tăng chậm nhất." },
          { vi: "Tổng giá trị trên vốn góp", en: "TVPI", def: "DPI cộng phần giá trị danh mục chưa thoái vốn. Phần cộng thêm này do chính nhà quản lý ước tính." },
        ],
      },
      {
        type: "heading",
        text: "Ba cách IRR bị làm đẹp một cách hợp lệ",
      },
      {
        type: "list",
        items: [
          "Bán sớm thương vụ tốt nhất: rút ngắn thời gian làm IRR tăng vọt dù tổng tiền thu về ít hơn nếu giữ lâu hơn",
          "Dùng khoản vay ngắn hạn thay cho gọi vốn: đồng hồ IRR chỉ bắt đầu chạy khi nhà đầu tư thực sự chuyển tiền",
          "Định giá lạc quan các khoản chưa thoái: phần giá trị chưa thực hiện vẫn được đưa vào phép tính IRR",
        ],
      },
      {
        type: "callout",
        label: "Vì sao DPI là bạn của bạn",
        text: "Trong ba cách trên, không cách nào làm tăng được DPI, vì DPI chỉ đếm tiền đã chuyển về tài khoản nhà đầu tư. Đó là lý do các nhà đầu tư tổ chức có kinh nghiệm hỏi về DPI trước, và chỉ nghe IRR sau.",
      },
      {
        type: "closing",
        lines: [
          "Con số đẹp nhất trên bảng hiệu suất thường là con số phụ thuộc nhiều nhất vào giả định.",
          "Bài cuối chặng nói về khâu quyết định mọi chỉ số ở trên: thoái vốn.",
        ],
      },
    ],
  },
  {
    id: 1474,
    slug: "thoai-von-va-thi-truong-thu-cap",
    title: "Private markets, Bài 4: Thoái vốn và thị trường thứ cấp - khi nào tiền mới thành tiền",
    subtitle: "Bốn cửa thoái vốn, áp lực thời hạn quỹ và vai trò của thị trường mua bán phần vốn góp",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚪",
    track: "professional",
    whyItMatters:
      "Toàn bộ lợi nhuận của một khoản đầu tư tư nhân chỉ tồn tại trên giấy cho tới khi thoái vốn thành công. Hiểu các cửa thoái vốn và điều kiện để chúng mở ra là phần khác biệt giữa một luận điểm đầu tư hoàn chỉnh và một luận điểm dừng ở nửa đường.",
    openingQuestion:
      "Vì sao kế hoạch thoái vốn phải được nêu ngay trong luận điểm đầu tư ban đầu?",
    openingOptions: [
      "Vì quy định yêu cầu quỹ công bố kế hoạch thoái vốn trước khi giải ngân",
      "Vì lợi nhuận chỉ thành hiện thực khi bán được, và không phải lúc nào cũng có người mua",
      "Vì giá bán trong tương lai đã được xác định ngay tại thời điểm ký hợp đồng đầu tư",
      "Vì thời điểm thoái vốn quyết định mức thuế mà quỹ phải nộp trên phần lợi nhuận",
    ],
    correctOption: 1,
    explanation:
      "Một khoản đầu tư tư nhân không có thị trường sẵn để bán bất cứ lúc nào. Cửa thoái vốn có thể đóng lại vì lý do hoàn toàn ngoài tầm kiểm soát của doanh nghiệp: thị trường chứng khoán xấu đi làm kênh niêm yết đóng, lãi suất tăng làm các quỹ khác không vay được để mua lại, hoặc ngành trở nên kém hấp dẫn với người mua chiến lược. Vì vậy nhà đầu tư chuyên nghiệp luôn hỏi ai sẽ là người mua tiếp theo trước khi ký, chứ không sau đó.",
    diagram: [
      { label: "Bán cho nhà đầu tư chiến lược", arrow: true },
      { label: "Bán cho quỹ đầu tư khác", arrow: true },
      { label: "Niêm yết ra công chúng", arrow: true },
      { label: "Bán phần vốn góp trên thị trường thứ cấp" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Khi cửa niêm yết đóng lại",
      description:
        "Trong những giai đoạn thị trường chứng khoán suy giảm, kênh niêm yết gần như đóng hoàn toàn, còn lãi suất cao khiến các quỹ mua lại bằng đòn bẩy không tính được bài toán. Hệ quả dây chuyền: các quỹ không thoái được vốn nên không phân phối tiền về cho nhà đầu tư, nhà đầu tư không có tiền để cam kết vào quỹ mới, và việc huy động vốn của cả ngành chậm lại. Đây là lý do thị trường mua bán phần vốn góp thứ cấp phát triển mạnh trong những giai đoạn như vậy.",
    },
    quiz: [
      {
        question: "Vì sao bán cho nhà đầu tư chiến lược thường đạt giá cao hơn bán cho quỹ khác?",
        options: [
          "Vì nhà đầu tư chiến lược trả được phần giá trị cộng hưởng với hoạt động sẵn có",
          "Vì các quỹ đầu tư bị giới hạn mức giá tối đa được phép trả theo điều lệ quỹ",
          "Vì nhà đầu tư chiến lược luôn thanh toán bằng tiền mặt còn quỹ thì dùng đòn bẩy",
          "Vì giao dịch với nhà đầu tư chiến lược không phải qua thủ tục thẩm định chi tiết",
        ],
        correct: 0,
        explanation:
          "Người mua chiến lược có thể cắt giảm chi phí trùng lặp, mở rộng kênh phân phối hoặc bổ sung sản phẩm - những giá trị mà một quỹ tài chính thuần túy không tạo ra được. Đổi lại, thương vụ với người mua chiến lược thường mất thời gian hơn vì các vấn đề cạnh tranh và tích hợp.",
      },
      {
        question: "Thị trường thứ cấp trong private markets giao dịch cái gì?",
        options: [
          "Phần vốn góp của nhà đầu tư trong quỹ, hoặc danh mục tài sản của cả một quỹ",
          "Cổ phiếu của các doanh nghiệp mà quỹ đầu tư đã niêm yết ra công chúng",
          "Các khoản vay mà quỹ sử dụng để tài trợ cho những thương vụ mua lại doanh nghiệp",
          "Hợp đồng quyền chọn mua phần vốn góp trong các quỹ đang trong giai đoạn huy động",
        ],
        correct: 0,
        explanation:
          "Thị trường này cho nhà đầu tư một lối thoát thanh khoản trước khi quỹ kết thúc, thường phải chấp nhận chiết khấu. Nó cũng cho phép nhà quản lý quỹ tái cấu trúc các tài sản chưa bán được khi vòng đời quỹ sắp hết.",
      },
      {
        question: "Quỹ tiếp nối được lập ra để làm gì?",
        options: [
          "Chuyển một hoặc vài tài sản sang quỹ mới để có thêm thời gian nắm giữ",
          "Huy động thêm vốn cho các thương vụ mới khi quỹ hiện tại đã giải ngân hết",
          "Tách các khoản đầu tư thua lỗ ra khỏi danh mục để cải thiện hiệu suất báo cáo",
          "Chuyển quyền quản lý quỹ sang một đội ngũ khác khi nhà quản lý cũ nghỉ việc",
        ],
        correct: 0,
        explanation:
          "Cơ chế này giải quyết vấn đề tài sản tốt nhưng chưa đến thời điểm bán lý tưởng trong khi quỹ sắp hết hạn. Nó cũng tạo xung đột lợi ích rõ ràng: nhà quản lý vừa là bên bán vừa là bên mua, nên việc định giá độc lập và quyền lựa chọn của nhà đầu tư cũ trở nên rất quan trọng.",
      },
      {
        question: "Rủi ro lớn nhất khi luận điểm đầu tư phụ thuộc vào việc niêm yết ra công chúng là gì?",
        options: [
          "Cửa niêm yết đóng mở theo chu kỳ thị trường, hoàn toàn ngoài tầm kiểm soát doanh nghiệp",
          "Quy trình niêm yết đòi hỏi doanh nghiệp phải chuyển đổi toàn bộ sang chuẩn mực quốc tế",
          "Cổ đông hiện hữu bị hạn chế bán ra trong một khoảng thời gian sau khi niêm yết",
          "Chi phí tư vấn và bảo lãnh phát hành làm giảm đáng kể phần thu về của quỹ",
        ],
        correct: 0,
        explanation:
          "Các phương án còn lại đều là chi phí hoặc ràng buộc dự đoán được. Việc cửa niêm yết đóng thì không: nó phụ thuộc vào tâm lý thị trường tại đúng thời điểm quỹ cần bán, và thường đóng lại đúng lúc mọi quỹ khác cũng cần bán.",
      },
    
    {
      "question": "Rủi ro lớn nhất khi luận điểm đầu tư phụ thuộc vào việc doanh nghiệp sẽ niêm yết là gì?",
      "options": [
        "Cửa niêm yết có thể đóng vì lý do hoàn toàn ngoài doanh nghiệp",
        "Doanh nghiệp có thể không đáp ứng được điều kiện niêm yết về vốn điều lệ",
        "Cổ đông hiện hữu sẽ bị pha loãng tỷ lệ sở hữu khi phát hành ra công chúng",
        "Chi phí tư vấn cho việc niêm yết rất lớn"
      ],
      "correct": 0,
      "explanation": "Doanh nghiệp có thể làm mọi thứ đúng và vẫn không niêm yết được vì thị trường xấu đúng vào năm quỹ cần thoái vốn. Đây là lý do một luận điểm chỉ có một cửa ra là luận điểm mong manh - và là lý do quỹ tiếp nối ra đời."
    }
    ],
    keyTakeaways: [
      "Lợi nhuận private markets chỉ có thật khi thoái vốn xong - luận điểm đầu tư phải nêu rõ ai là người mua tiếp theo",
      "Bốn cửa thoái vốn: nhà đầu tư chiến lược, quỹ khác, niêm yết, và bán phần vốn góp thứ cấp",
      "Cửa thoái vốn đóng mở theo chu kỳ thị trường, thường đóng đúng lúc nhiều quỹ cùng cần bán",
      "Quỹ tiếp nối giải quyết vấn đề thời hạn nhưng tạo xung đột lợi ích cần được xử lý minh bạch",
    ],
    practicePrompt: {
      question:
        "Một quỹ còn hai năm nữa là kết thúc và vẫn nắm ba doanh nghiệp chưa bán được. Điều này ảnh hưởng thế nào tới vị thế đàm phán của họ?",
      options: [
        "Không ảnh hưởng vì quỹ luôn có thể gia hạn thời gian hoạt động thêm nhiều năm",
        "Vị thế yếu đi rõ rệt: người mua biết quỹ buộc phải bán trong khung thời gian đó",
        "Vị thế mạnh lên vì quỹ có thể từ chối mọi lời chào giá thấp hơn định giá sổ sách",
        "Chỉ ảnh hưởng tới mức phí quản lý mà nhà đầu tư phải trả trong hai năm còn lại",
      ],
      correct: 1,
      explanation:
        "Đây là thông tin công khai với bất kỳ ai theo dõi ngành, và người mua chuyên nghiệp luôn tính đến nó. Gia hạn quỹ là có thể nhưng phải xin ý kiến nhà đầu tư và bản thân việc đó đã là tín hiệu xấu. Bài học chung: bên nào có ràng buộc thời gian cứng hơn thì bên đó ở thế yếu hơn trên bàn đàm phán.",
    },
    summary: {
      keyIdea: "Không có kế hoạch thoái vốn thì không có luận điểm đầu tư, chỉ có một khoản tiền bị giam",
      commonMistake: "Xây luận điểm dựa trên việc niêm yết trong tương lai mà không có phương án thay thế",
      action: "Với một thương vụ bất kỳ, viết ra ba người mua tiềm năng cụ thể và điều kiện để mỗi bên xuống tiền.",
    },
    application: {
      title: "Câu hỏi kết thúc mọi luận điểm đầu tư tư nhân",
      message:
        "Ai sẽ mua lại khoản này, vì lý do gì, ở mức giá nào, và trong điều kiện thị trường như thế nào? Nếu không trả lời được bằng những cái tên và con số cụ thể, luận điểm mới xong một nửa.",
      secondary: "Đây cũng chính là câu hỏi mà hội đồng đầu tư của bất kỳ quỹ nào cũng sẽ hỏi bạn đầu tiên.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong đầu tư niêm yết, bán là việc dễ nhất - luôn có người mua ở một mức giá nào đó. Trong private markets, bán là việc khó nhất và là việc quyết định toàn bộ kết quả. Ba bài trước nói về cấu trúc, phí và cách đo hiệu suất; bài này nói về khâu biến tất cả những thứ đó thành tiền thật.",
      },
      {
        type: "conceptTable",
        title: "Bốn cửa thoái vốn",
        subtitle: "Mỗi cửa mở ra trong một điều kiện thị trường khác nhau",
        concepts: [
          { vi: "Bán cho bên chiến lược", en: "Trade sale", def: "Doanh nghiệp cùng ngành mua lại. Thường trả giá cao nhất nhờ giá trị cộng hưởng, nhưng quy trình dài và có thể vướng vấn đề cạnh tranh." },
          { vi: "Bán cho quỹ khác", en: "Sponsor-to-sponsor", def: "Một quỹ khác mua lại, thường bằng đòn bẩy. Phụ thuộc mạnh vào mặt bằng lãi suất và khẩu vị của thị trường tín dụng." },
          { vi: "Niêm yết", en: "IPO", def: "Định giá thường tốt và tạo hiệu ứng danh tiếng, nhưng cửa này đóng mở theo chu kỳ và quỹ chỉ thoái được dần sau thời gian hạn chế chuyển nhượng." },
          { vi: "Thị trường thứ cấp", en: "Secondaries", def: "Bán phần vốn góp trong quỹ hoặc cả danh mục cho bên khác, thường có chiết khấu. Là van xả thanh khoản khi ba cửa trên đều hẹp." },
        ],
      },
      {
        type: "callout",
        label: "Tương quan xấu nhất trong ngành",
        text: "Các cửa thoái vốn có xu hướng hẹp lại cùng một lúc, và đúng vào lúc nhiều quỹ cùng cần bán. Đây là dạng rủi ro tương quan giống hệt bài học về tài sản bảo đảm mất giá đúng lúc bên vay lâm nguy - và nó cũng là lý do khoản bù thanh khoản trong private markets tồn tại.",
      },
      {
        type: "closing",
        lines: [
          "Kết thúc chặng: bạn đã đi hết vòng từ cấu trúc quỹ, cơ chế trả thưởng, đo hiệu suất tới thoái vốn.",
          "Điểm chung của cả bốn bài: trong private markets, thanh khoản không phải mặc định mà là thứ phải được lên kế hoạch từ đầu.",
        ],
      },
    ],
  },
];
