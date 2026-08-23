import type { Lesson } from "./lesson-types";

// Chặng "Phương pháp định lượng" (ids 1421-1426, professional track).
//
// Lý do tồn tại: mục Quantitative Methods trên trang CFA hiện chỉ trỏ ngược
// về các bài giá trị thời gian của tiền. Đó là một nửa môn học. Nửa còn lại -
// phân phối xác suất, suy diễn thống kê, hồi quy, chuỗi thời gian - chưa có
// bài nào, dù nó là nền của beta, của backtest, của mọi câu "số này có ý
// nghĩa thống kê không". Sáu bài dưới đây dạy phần đó theo hướng đọc và
// phản biện kết quả người khác đưa cho mình, chứ không theo hướng chứng minh
// định lý - vì đó mới là việc người làm nghề thực sự phải làm hằng ngày.

export const QUANT_METHODS_LESSONS: Lesson[] = [
  {
    id: 1421,
    slug: "phan-phoi-va-duoi-day-trong-so-lieu",
    title: "Định lượng, Bài 1: Phân phối và đuôi dày - vì sao số liệu vận hành không đối xứng",
    subtitle: "Trung bình cộng độ lệch chuẩn là bộ đôi đúng cho một hình dạng mà dữ liệu của bạn hiếm khi có",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "professional",
    whyItMatters:
      "Mọi bảng điều khiển đều mặc định hiển thị trung bình, và mọi cảnh báo đều mặc định đặt ở vài lần độ lệch chuẩn. Cả hai giả định một hình dạng phân phối mà phần lớn số liệu vận hành không có, nên chúng bỏ sót đúng nhóm đáng chú ý.",
    openingQuestion: "Vì sao trung bình và độ lệch chuẩn hay mô tả sai số liệu vận hành?",
    openingOptions: [
      "Vì phần lớn số liệu đó lệch phải và có đuôi dài, không đối xứng",
      "Vì số lượng quan sát thường quá ít để hai đại lượng này có ý nghĩa thống kê",
      "Vì dữ liệu vận hành thường chứa nhiều giá trị bất thường cần được loại bỏ trước",
      "Vì các đại lượng này thay đổi liên tục nên giá trị đo được nhanh chóng lỗi thời",
    ],
    correctOption: 0,
    explanation:
      "Trung bình và độ lệch chuẩn mô tả đầy đủ một phân phối đối xứng hình chuông và gần như không mô tả gì về một phân phối lệch. Số liệu vận hành hầu hết đều lệch: kích thước tệp người dùng tải lên, số bản ghi mỗi tài khoản, thời gian chạy một công việc nền, số lần thử lại. Chúng có sàn ở không, không có trần rõ ràng, và một phần nhỏ quan sát lớn hơn phần còn lại nhiều bậc. Với hình dạng đó, trung bình nằm ở một chỗ mà rất ít quan sát thật rơi vào, và cộng thêm hai lần độ lệch chuẩn cũng không chạm tới nhóm gây ra vấn đề. Ba lý do kia đều có thật và đều xử lý được; hình dạng phân phối thì không xử lý được bằng cách thu thập thêm dữ liệu.",
    diagram: [
      { label: "Sàn ở không, không có trần rõ ràng", arrow: true },
      { label: "Phần lớn quan sát nhỏ, một số ít lớn hơn nhiều bậc", arrow: true },
      { label: "Trung bình rơi vào chỗ ít quan sát thật", arrow: true },
      { label: "Phải đọc bằng phân vị, không bằng trung bình" },
    ],
    interactiveType: "tail-risk",
    realWorldExample: {
      company: "Trung bình tám bản ghi",
      description:
        "Một đội thấy mỗi tài khoản có trung bình khoảng tám bản ghi và thiết kế giao diện cùng truy vấn theo con số đó. Thực tế phần lớn tài khoản có một tới hai bản ghi, và vài chục tài khoản có hàng chục nghìn. Trung bình tám không mô tả tài khoản nào cả, và chính nhóm hàng chục nghìn mới là nhóm làm màn hình danh sách sập.",
    },
    quiz: [
      {
        question: "Đại lượng nào mô tả số liệu lệch phải tốt hơn trung bình?",
        options: [
          "Trung vị kèm vài phân vị cao",
          "Trung bình sau khi đã loại bỏ các giá trị bất thường ở hai đầu của phân phối",
          "Độ lệch chuẩn vì nó cho biết mức độ phân tán của dữ liệu quanh giá trị trung tâm",
          "Giá trị lớn nhất và nhỏ nhất để biết được khoảng biến thiên của toàn bộ dữ liệu",
        ],
        correct: 0,
        explanation:
          "Trung vị nói phần lớn quan sát nằm quanh đâu, và các phân vị cao nói cái đuôi lớn tới mức nào. Hai thứ ấy cùng nhau mô tả được hình dạng lệch, còn loại bỏ giá trị bất thường thì chính là vứt đi nhóm mà bạn cần biết nhất.",
      },
      {
        question: "Vì sao đặt ngưỡng cảnh báo ở trung bình cộng hai lần độ lệch chuẩn lại hỏng với dữ liệu lệch?",
        options: [
          "Vì ngưỡng đó vẫn nằm dưới nhóm gây ra vấn đề, nên báo động liên tục",
          "Vì độ lệch chuẩn của dữ liệu lệch thường rất lớn nên ngưỡng bị đẩy lên quá cao",
          "Vì trung bình biến động nên ngưỡng không ổn định",
          "Vì cần ít nhất ba lần độ lệch chuẩn mới phủ được phần lớn các quan sát bình thường",
        ],
        correct: 0,
        explanation:
          "Quy tắc hai lần độ lệch chuẩn phủ khoảng chín mươi lăm phần trăm quan sát chỉ khi phân phối là hình chuông. Với phân phối lệch, phần trên ngưỡng đó nhiều hơn hẳn, nên cảnh báo kêu suốt và người ta tắt nó đi - kết cục tệ hơn cả không có cảnh báo.",
      },
      {
        question: "Dữ liệu có hai đỉnh rõ rệt thường có nghĩa là gì?",
        options: [
          "Bạn đang gộp hai nhóm khác nhau vào cùng một phép đo",
          "Có hai loại sự cố khác nhau cùng ảnh hưởng tới chỉ số này trong kỳ đo",
          "Dữ liệu bị nhiễu và cần được làm mượt trước khi phân tích để thấy xu hướng",
          "Hệ thống có hai chế độ hoạt động khác nhau tuỳ theo tải ở từng thời điểm",
        ],
        correct: 0,
        explanation:
          "Hai đỉnh gần như luôn là dấu hiệu của việc trộn: yêu cầu có trong bộ nhớ đệm và không có, người dùng mới và cũ, hai đường mã khác nhau. Tách ra rồi đo riêng cho hai phân phối đơn giản hơn nhiều, và mọi con số tổng hợp trên dữ liệu trộn đều không mô tả nhóm nào.",
      },
      {
        question: "Vì sao nhiều đại lượng vận hành có phân phối lệch phải?",
        options: [
          "Vì chúng có sàn ở không mà không có trần tương ứng ở phía trên",
          "Vì sự cố hiếm tạo ra giá trị lớn bất thường",
          "Vì cách thu thập bỏ sót giá trị nhỏ",
          "Vì người dùng hành xử rất khác nhau",
        ],
        correct: 0,
        explanation:
          "Đây là ràng buộc cấu trúc chứ không phải hiện tượng: thời gian chạy không âm được, kích thước tệp không âm được, số lần thử lại không âm được. Bên trái bị chặn cứng còn bên phải thì mở, nên hình dạng lệch phải là mặc định chứ không phải ngoại lệ cần giải thích.",
      },
      {
        question: "Muốn biết dữ liệu của mình có hình dạng gì thì làm cách nào rẻ nhất?",
        options: [
          "Vẽ biểu đồ tần suất một lần, thay vì đọc các con số tổng hợp",
          "Tính hệ số bất đối xứng và độ nhọn để xác định phân phối lệch tới mức nào",
          "So sánh giá trị trung bình với trung vị để biết mức độ lệch của phân phối",
          "Kiểm định thống kê để xác định dữ liệu có tuân theo phân phối chuẩn hay không",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều cho ra một con số về hình dạng, và một con số thì không cho thấy hai đỉnh, không cho thấy một cụm giá trị bằng đúng ngưỡng thời gian chờ, không cho thấy khoảng trống ở giữa. Một biểu đồ tần suất mất năm phút và cho thấy tất cả những thứ đó cùng lúc.",
      },
    ],
    practicePrompt: {
      question:
        "Bảng điều khiển của bạn hiển thị trung bình thời gian xử lý công việc nền. Nên đổi thành gì?",
      options: [
        "Trung vị kèm phân vị 95 và 99, và một biểu đồ tần suất xem một lần",
        "Trung bình kèm độ lệch chuẩn để thấy mức phân tán",
        "Giá trị lớn nhất trong mỗi khoảng thời gian để phát hiện các trường hợp xấu nhất",
        "Trung bình được tính trên một cửa sổ trượt để giảm ảnh hưởng của biến động ngắn hạn",
      ],
      correct: 0,
      explanation:
        "Trung vị nói phần lớn công việc mất bao lâu, phân vị cao nói nhóm chậm nhất tệ tới đâu, và biểu đồ tần suất cho thấy hình dạng mà không con số tổng hợp nào cho thấy. Giá trị lớn nhất thì quá nhạy với một quan sát duy nhất, còn cửa sổ trượt chỉ làm mượt một đại lượng vốn đã mô tả sai.",
    },
    keyTakeaways: [
      "Trung bình và độ lệch chuẩn mô tả đầy đủ đúng một hình dạng, và dữ liệu vận hành hiếm khi có nó",
      "Sàn ở không mà không có trần làm phân phối lệch phải trở thành mặc định",
      "Hai đỉnh gần như luôn có nghĩa là đang gộp hai nhóm khác nhau",
      "Một biểu đồ tần suất cho thấy nhiều hơn mọi con số tổng hợp cộng lại",
    ],
    summary: {
      keyIdea: "Số liệu vận hành lệch phải theo cấu trúc, nên bộ đôi trung bình và độ lệch chuẩn mô tả sai nó",
      commonMistake: "Đặt ngưỡng cảnh báo ở trung bình cộng hai lần độ lệch chuẩn, rồi tắt cảnh báo vì nó kêu suốt",
      action: "Vẽ biểu đồ tần suất của ba chỉ số bạn hay dùng nhất, một lần, rồi quyết định đọc chúng bằng gì.",
    },
    application: {
      title: "Năm phút vẽ, đổi cách đọc mãi mãi",
      message:
        "Với mỗi chỉ số quan trọng, vẽ biểu đồ tần suất một lần. Nếu nó lệch hoặc có hai đỉnh, thay trung bình bằng trung vị kèm phân vị cao.",
      secondary:
        "Hai đỉnh là tín hiệu tách nhóm: tìm biến phân loại nào chia được chúng ra rồi đo riêng từng nhóm.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng điều khiển nào cũng bắt đầu bằng trung bình, và cảnh báo nào cũng bắt đầu bằng độ lệch chuẩn. Cả hai lựa chọn mặc định ấy giả định một hình dạng phân phối cụ thể.",
      },
      {
        type: "heading",
        text: "Lệch phải là mặc định, không phải ngoại lệ",
      },
      {
        type: "paragraph",
        text: "Thời gian chạy, kích thước tệp, số bản ghi, số lần thử lại - tất cả đều bị chặn cứng ở không phía dưới và mở phía trên. Ràng buộc ấy đủ để tạo ra hình dạng lệch mà không cần bất kỳ hiện tượng bất thường nào. Vì vậy khi một chỉ số vận hành trông đối xứng, đó mới là điều đáng dừng lại xem xét.",
      },
      {
        type: "callout",
        label: "Loại bỏ giá trị bất thường là vứt đi nhóm cần biết nhất",
        text: "Với dữ liệu lệch, những quan sát lớn không phải nhiễu - chúng là nhóm tài khoản có hàng chục nghìn bản ghi, nhóm tệp nặng gấp trăm lần, nhóm công việc chạy lâu nhất. Đó chính là nhóm làm hệ thống sập, và mọi quy trình làm sạch dữ liệu tự động đều cắt đúng nhóm đó đầu tiên.",
      },
      {
        type: "closing",
        lines: [
          "Con số tổng hợp nào cũng giả định một hình dạng; biết hình dạng thật rồi mới chọn được con số.",
          "Bài sau: có số liệu rồi thì làm sao biết một khác biệt là thật hay là ngẫu nhiên.",
        ],
      },
    ],
  },
  {
    id: 1422,
    slug: "mau-sai-so-chuan-va-khoang-tin-cay",
    interactiveType: "sampling",
    title: "Định lượng, Bài 2: Mẫu, sai số chuẩn và khoảng tin cậy - con số của bạn chính xác đến đâu",
    subtitle: "Vì sao mọi ước lượng đều phải đi kèm một khoảng, và vì sao 36 tháng dữ liệu là quá ít",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📏",
    track: "professional",
    whyItMatters:
      "Mọi con số trong tài chính đều là ước lượng từ một mẫu: beta, lợi suất kỳ vọng, tương quan, alpha của quỹ. Nếu không biết sai số chuẩn của ước lượng đó, bạn sẽ ra quyết định dựa trên nhiễu và tưởng đó là tín hiệu.",
    openingQuestion:
      "Sai số chuẩn của trung bình mẫu giảm theo tốc độ nào khi tăng cỡ mẫu?",
    openingOptions: [
      "Tỷ lệ nghịch với cỡ mẫu n",
      "Tỷ lệ nghịch với căn bậc hai của cỡ mẫu",
      "Tỷ lệ nghịch với bình phương của cỡ mẫu n",
      "Không phụ thuộc vào cỡ mẫu",
    ],
    correctOption: 1,
    explanation:
      "Sai số chuẩn bằng độ lệch chuẩn chia cho căn bậc hai của n. Hệ quả rất thực dụng và cũng khá tàn nhẫn: muốn giảm một nửa sai số, bạn cần gấp bốn lần dữ liệu. Đây là lý do đánh giá kỹ năng của một nhà quản lý quỹ dựa trên ba năm hiệu suất là gần như vô vọng - khoảng tin cậy quanh alpha của họ rộng đến mức bao trùm cả kỹ năng lẫn may mắn.",
    diagram: [
      { label: "Tổng thể không quan sát được", arrow: true },
      { label: "Mẫu hữu hạn", arrow: true },
      { label: "Ước lượng điểm + sai số chuẩn", arrow: true },
      { label: "Khoảng tin cậy - phạm vi hợp lý của sự thật" },
    ],
    realWorldExample: {
      company: "Đánh giá quỹ đầu tư",
      description:
        "Một quỹ có alpha 2%/năm với sai số theo dõi 6%/năm. Sai số chuẩn của ước lượng alpha sau ba năm là 6% chia căn bậc hai của 3, tức khoảng 3,5%. Khoảng tin cậy 95% do đó trải từ khoảng −5% đến +9%. Nói cách khác, ba năm dữ liệu không phân biệt nổi một nhà quản lý giỏi với một người may mắn. Cần khoảng 36 năm để alpha 2% đạt ý nghĩa thống kê ở mức thông thường.",
    },
    quiz: [
      {
        question: "Định lý giới hạn trung tâm nói gì?",
        options: [
          "Mọi chuỗi dữ liệu tài chính đều tuân theo phân phối chuẩn nếu đủ dài",
          "Trung bình của mẫu đủ lớn có phân phối xấp xỉ chuẩn",
          "Lợi suất của mọi tài sản đều hội tụ về 0 khi thời gian đủ dài",
          "Cỡ mẫu càng lớn thì phương sai của tổng thể gốc càng nhỏ đi",
        ],
        correct: 1,
        explanation:
          "Đây là lý do thống kê suy diễn hoạt động được ngay cả với dữ liệu tài chính có đuôi dày. Nhưng lưu ý: định lý áp dụng cho trung bình mẫu, không phải cho từng quan sát riêng lẻ - nên nó không cứu được các mô hình rủi ro đuôi.",
      },
      {
        question: "Khoảng tin cậy 95% nghĩa là gì?",
        options: [
          "Có đúng 95% xác suất rằng tham số thật đang nằm trong khoảng vừa tính",
          "Lặp lại quy trình nhiều lần thì 95% số khoảng sẽ chứa tham số thật",
          "Đúng 95% số quan sát trong mẫu nằm lọt vào bên trong khoảng này",
          "Kết quả ước lượng đạt độ chính xác 95% so với giá trị thật của tham số",
        ],
        correct: 1,
        explanation:
          "Đây là một phân biệt tinh tế nhưng quan trọng: tham số thật là một con số cố định, còn khoảng mới là thứ ngẫu nhiên vì nó phụ thuộc vào mẫu bạn rút được. Cách diễn đạt thứ nhất là cách hiểu Bayes, đòi hỏi thêm giả định về phân phối tiên nghiệm.",
      },
      {
        question: "Muốn giảm sai số chuẩn xuống còn một nửa, cần bao nhiêu dữ liệu?",
        options: [
          "Gấp đôi, vì sai số chuẩn tỷ lệ nghịch trực tiếp với cỡ mẫu",
          "Gấp bốn lần, vì sai số chuẩn tỷ lệ nghịch với căn bậc hai của cỡ mẫu",
          "Gấp tám lần, vì sai số giảm theo căn bậc ba của cỡ mẫu",
          "Không thể giảm được, vì sai số chuẩn không phụ thuộc vào cỡ mẫu",
        ],
        correct: 1,
        explanation:
          "Vì sai số chuẩn tỷ lệ nghịch với căn bậc hai của n. Đây là ràng buộc cứng, và là lý do các bài kiểm định trên dữ liệu tài chính hiếm khi cho kết luận mạnh như người ta mong muốn.",
      },
      {
        question: "Tăng tần suất dữ liệu từ tháng lên ngày có giúp ước lượng lợi suất kỳ vọng chính xác hơn không?",
        options: [
          "Có, vì số quan sát tăng hơn hai mươi lần so với dữ liệu theo tháng",
          "Không - độ chính xác phụ thuộc độ dài giai đoạn, không phải tần suất",
          "Có, và sai số chuẩn giảm theo đúng tỷ lệ tuyến tính với số quan sát",
          "Không, vì dữ liệu theo ngày chỉ chứa nhiễu và không mang thông tin nào",
        ],
        correct: 1,
        explanation:
          "Đây là một kết quả gây ngạc nhiên: chia nhỏ tần suất giúp ước lượng phương sai tốt hơn nhưng gần như không giúp gì cho ước lượng trung bình. Muốn biết lợi suất kỳ vọng chính xác hơn, bạn chỉ có một cách là chờ thêm nhiều năm.",
      },
    
    {
      "question": "Vì sao ba năm hiệu suất gần như không đủ để kết luận một nhà quản lý quỹ có kỹ năng?",
      "options": [
        "Vì sai số chuẩn quá lớn nên may mắn và kỹ năng không tách được",
        "Vì hiệu suất ba năm chưa đi qua đủ một chu kỳ kinh tế trọn vẹn",
        "Vì quỹ có thể thay đổi chiến lược đầu tư trong khoảng thời gian đó",
        "Vì lợi suất của ba năm gần nhất chịu ảnh hưởng của chi phí quản lý"
      ],
      "correct": 0,
      "explanation": "Với độ biến động thường thấy của thị trường cổ phiếu, cần vài chục năm dữ liệu mới phân biệt được mức vượt trội vài phần trăm với nhiễu ngẫu nhiên. Đây là một trong những kết quả khó chịu nhất của thống kê áp vào đầu tư - và bị bỏ qua nhiều nhất."
    }
    ],
    keyTakeaways: [
      "Sai số chuẩn = độ lệch chuẩn / căn bậc hai của n; muốn chính xác gấp đôi cần dữ liệu gấp bốn",
      "Mọi ước lượng phải đi kèm khoảng tin cậy, nếu không nó chỉ là một con số không có ngữ cảnh",
      "Ba năm hiệu suất không đủ để kết luận về kỹ năng của nhà quản lý quỹ",
      "Tăng tần suất dữ liệu cải thiện ước lượng độ biến động nhưng gần như không cải thiện ước lượng lợi suất kỳ vọng",
    ],
    practicePrompt: {
      question:
        "Một chiến lược cho lợi suất vượt trội trung bình 4%/năm, độ lệch chuẩn 20%/năm, dựa trên 10 năm dữ liệu. Kết luận nào đúng?",
      options: [
        "Chiến lược chắc chắn tạo alpha vì trung bình dương",
        "Sai số chuẩn 6,3% lớn hơn mức 4% quan sát được",
        "Cần thêm dữ liệu tần suất ngày là đủ để kết luận",
        "Chiến lược thất bại vì độ lệch chuẩn quá cao",
      ],
      correct: 1,
      explanation:
        "Tỷ số t xấp xỉ 4 chia 6,3, tức khoảng 0,63 - xa mức có ý nghĩa thống kê. Đây chính xác là tình huống mà rất nhiều bài giới thiệu chiến lược đầu tư rơi vào: một con số trung bình đẹp, được trình bày như bằng chứng, nhưng không hề vượt qua nổi mức nhiễu.",
    },
    summary: {
      keyIdea: "Một ước lượng không kèm sai số chuẩn thì chưa phải là thông tin",
      formula: "SE = s / √n; Khoảng tin cậy 95% ≈ ước lượng ± 1,96 × SE",
      commonMistake: "Đánh giá kỹ năng đầu tư dựa trên vài năm dữ liệu, nơi nhiễu lớn hơn tín hiệu nhiều lần",
      action: "Với bất kỳ con số hiệu suất nào bạn đọc được, hãy tính nhanh sai số chuẩn trước khi tin vào nó.",
    },
    application: {
      title: "Phản xạ nghề nghiệp",
      message:
        "Khi ai đó đưa bạn một con số - beta 1,2, alpha 3%, tương quan 0,4 - câu hỏi đầu tiên luôn là: tính trên bao nhiêu quan sát, và sai số chuẩn bao nhiêu. Nếu người trình bày không trả lời được, con số đó chưa đủ điều kiện để ra quyết định.",
      secondary: "Quy tắc thô: cần khoảng 30 năm dữ liệu để một mức alpha 2%/năm đạt ý nghĩa thống kê thông thường.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong tài chính, bạn không bao giờ quan sát được sự thật. Bạn chỉ có một mẫu - vài trăm quan sát rút ra từ một quá trình vẫn đang tiếp diễn và còn thay đổi theo thời gian. Toàn bộ thống kê suy diễn tồn tại để trả lời một câu: từ mẫu này, tôi được phép tự tin đến đâu.",
      },
      {
        type: "formula",
        title: "Sai số chuẩn của trung bình",
        label: "Thước đo mức độ không chắc chắn của chính ước lượng",
        equation: "SE = s / √n",
        variables: [
          { symbol: "s", name: "Độ lệch chuẩn mẫu", description: "Mức phân tán của dữ liệu" },
          { symbol: "n", name: "Số quan sát", description: "Với dữ liệu tài chính, thường là số năm chứ không phải số ngày khi ước lượng trung bình" },
        ],
        example: {
          title: "Vì sao căn bậc hai lại quan trọng đến vậy",
          calculation: "n = 100 → SE = s/10;  n = 400 → SE = s/20",
          result: "Gấp bốn dữ liệu chỉ để chính xác gấp đôi",
          explanation:
            "Quy luật này giải thích vì sao ngành đầu tư khó chứng minh bất cứ điều gì bằng dữ liệu: chi phí để tăng độ tin cậy tăng theo cấp số nhân, còn thị trường thì lại thay đổi bản chất theo thời gian.",
        },
      },
      {
        type: "heading",
        text: "Nghịch lý của việc lấy mẫu dày hơn",
      },
      {
        type: "paragraph",
        text: "Trực giác nói rằng dùng dữ liệu ngày thay vì dữ liệu tháng sẽ cho ước lượng tốt hơn vì có nhiều quan sát hơn. Điều đó đúng với phương sai nhưng sai với trung bình. Lý do: khi chia nhỏ kỳ, lợi suất trung bình mỗi kỳ nhỏ đi đúng bằng tỷ lệ mà độ nhiễu giảm, nên tỷ số tín hiệu trên nhiễu không đổi. Muốn biết chắc hơn về lợi suất kỳ vọng, chỉ có một cách duy nhất là quan sát trong nhiều năm hơn.",
      },
      {
        type: "callout",
        label: "Hệ quả với ngành quỹ",
        text: "Nếu ba năm hiệu suất không phân biệt được kỹ năng với may mắn, thì việc rót vốn theo bảng xếp hạng ba năm là hành động dựa trên nhiễu. Đây là một trong những phát hiện thực nghiệm vững chắc nhất và cũng bị phớt lờ nhiều nhất trong ngành quản lý tài sản.",
      },
      {
        type: "closing",
        lines: [
          "Một con số không kèm khoảng tin cậy là một ý kiến được trang điểm.",
          "Bài sau chính thức hóa việc này thành một quy trình: kiểm định giả thuyết.",
        ],
      },
    ],
  },
  {
    id: 1423,
    slug: "kiem-dinh-gia-thuyet-va-p-hacking",
    title: "Định lượng, Bài 3: Kiểm định giả thuyết và cái bẫy thử nhiều lần",
    subtitle: "Thử đủ nhiều cách chia dữ liệu thì luôn tìm được một kết quả có ý nghĩa",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Câu hỏi khác biệt này có thật không xuất hiện trong mọi buổi họp về số liệu, và công cụ trả lời nó bị dùng sai theo một cách rất đều đặn. Kết quả là các quyết định được biện minh bằng những phát hiện không lặp lại được.",
    openingQuestion: "Vì sao thử nhiều cách chia dữ liệu rồi báo cáo cách cho kết quả đẹp lại sai?",
    openingOptions: [
      "Vì mỗi lần thử thêm đều làm tăng khả năng gặp một khác biệt do ngẫu nhiên",
      "Vì các cách chia khác nhau cho ra những nhóm không so sánh được với nhau",
      "Vì kích thước mẫu của từng nhóm nhỏ đi khiến kết quả kém tin cậy hơn",
      "Vì việc chọn cách chia sau khi nhìn dữ liệu làm mất tính khách quan của phân tích",
    ],
    correctOption: 0,
    explanation:
      "Ngưỡng ý nghĩa thông thường chấp nhận khoảng năm phần trăm khả năng kết luận có khác biệt trong khi thật ra không có. Con số ấy đúng cho một phép kiểm. Thử hai mươi cách chia độc lập thì khả năng ít nhất một cách cho kết quả có ý nghĩa lên tới khoảng sáu mươi tư phần trăm ngay cả khi không có khác biệt nào tồn tại. Điều nguy hiểm là quá trình này hiếm khi có chủ ý: người ta chia theo nền tảng, không thấy gì, chia theo khu vực, không thấy gì, chia theo nhóm người dùng mới, và thấy - rồi báo cáo phát hiện cuối cùng như thể nó là phép kiểm duy nhất được chạy.",
    diagram: [
      { label: "Một phép kiểm: khoảng 5% khả năng dương tính giả", arrow: true },
      { label: "Hai mươi phép kiểm: khoảng 64% ít nhất một cái dương tính giả", arrow: true },
      { label: "Báo cáo cái cuối cùng như phép kiểm duy nhất", arrow: true },
      { label: "Phát hiện không lặp lại được ở lần đo sau" },
    ],
    interactiveType: "sampling",
    realWorldExample: {
      company: "Nhóm người dùng mới trên một nền tảng",
      description:
        "Một đội so sánh hai phiên bản giao diện, không thấy khác biệt tổng thể, rồi lần lượt chia theo nền tảng, theo khu vực, theo thâm niên tài khoản. Ở lần chia thứ chín, nhóm người dùng mới trên một nền tảng cho khác biệt rõ. Phiên bản mới được triển khai cho nhóm đó, và ba tháng sau không chỉ số nào cải thiện.",
    },
    quiz: [
      {
        question: "Cách nào giữ cho việc chia nhóm không thành thử nhiều lần?",
        options: [
          "Ghi trước các cách chia định phân tích, trước khi nhìn kết quả",
          "Giới hạn số lượng cách chia nhóm được phép thực hiện trong mỗi lần phân tích",
          "Chỉ chia theo những tiêu chí có cơ sở lý thuyết rõ ràng để giải thích được kết quả",
          "Điều chỉnh ngưỡng ý nghĩa xuống thấp hơn khi thực hiện nhiều phép kiểm cùng lúc",
        ],
        correct: 0,
        explanation:
          "Điều chỉnh ngưỡng là cách xử lý đúng và nó đòi bạn biết mình đã chạy bao nhiêu phép kiểm - con số mà không ai đếm khi việc chia nhóm diễn ra dần dần. Ghi trước biến số đó thành một con số biết được, và nó cũng biến phần khám phá thêm thành thứ được gọi đúng tên.",
      },
      {
        question: "Phát hiện tìm được sau khi đã nhìn dữ liệu nên được xử lý thế nào?",
        options: [
          "Coi là giả thuyết cần kiểm lại trên dữ liệu mới, không phải kết luận",
          "Báo cáo kèm ghi chú rằng nó được tìm ra trong quá trình phân tích khám phá",
          "Kiểm tra lại bằng một phương pháp thống kê khác để xác nhận tính đúng đắn",
          "Chấp nhận nếu mức ý nghĩa đủ cao và cỡ mẫu của nhóm đó đủ lớn",
        ],
        correct: 0,
        explanation:
          "Không phương pháp nào chạy trên chính tập dữ liệu đã sinh ra giả thuyết mà cứu được nó, vì vấn đề nằm ở việc giả thuyết được chọn sau khi nhìn. Chỉ có dữ liệu mới - kỳ đo sau, nhóm người dùng khác - mới trả lời được, và đó cũng là phép thử rẻ.",
      },
      {
        question: "Không bác bỏ được giả thuyết không có khác biệt nghĩa là gì?",
        options: [
          "Chưa đủ bằng chứng cho khác biệt, không phải đã chứng minh là không có",
          "Hai phiên bản có hiệu quả tương đương nhau nên chọn phiên bản nào cũng được",
          "Cần tăng cỡ mẫu và chạy lại phép kiểm để có kết luận rõ ràng hơn",
          "Khác biệt nếu có thì nhỏ tới mức không đáng để đưa vào quyết định",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ hiểu sai phổ biến nhất và nó dẫn tới kết luận ngược. Một phép kiểm với cỡ mẫu nhỏ không bác bỏ được gần như mọi thứ, kể cả những khác biệt lớn thật sự tồn tại - nên kết quả không có ý nghĩa thống kê thường nói về cỡ mẫu nhiều hơn về thực tế.",
      },
      {
        question: "Khác biệt có ý nghĩa thống kê và khác biệt đáng quan tâm khác nhau ra sao?",
        options: [
          "Cỡ mẫu đủ lớn thì mọi khác biệt đều có ý nghĩa, kể cả khác biệt vô nghĩa về thực tế",
          "Ý nghĩa thống kê đo độ tin cậy còn mức đáng quan tâm đo độ lớn của khác biệt",
          "Khác biệt đáng quan tâm phải vượt ngưỡng ý nghĩa với mức tin cậy cao hơn hẳn",
          "Hai khái niệm này tương đương nhau khi phép kiểm được thực hiện đúng cách",
        ],
        correct: 0,
        explanation:
          "Với vài triệu quan sát, một khác biệt phần nghìn giây cũng cho ra kết quả có ý nghĩa thống kê rất cao và chẳng ai để ý được. Vì vậy báo cáo luôn cần độ lớn của khác biệt bên cạnh mức ý nghĩa - con số thứ hai một mình không nói được nên làm gì.",
      },
      {
        question: "Vì sao nên quyết trước ngưỡng khác biệt đáng để hành động?",
        options: [
          "Vì sau khi thấy kết quả, mọi con số đều dễ được biện minh là đủ lớn",
          "Vì cần ngưỡng đó để tính cỡ mẫu cần thiết",
          "Vì các bên cần biết trước tiêu chí đánh giá",
          "Vì so với ngưỡng thì báo cáo rõ ràng hơn",
        ],
        correct: 0,
        explanation:
          "Ba lý do kia đều là lợi ích về quy trình. Lý do thật là về tâm lý: một khác biệt hai phần trăm nghe nhỏ khi bàn trước và nghe đủ lớn khi nó là kết quả của ba tháng công sức. Con số ghi trước là thứ duy nhất không bị dịch chuyển theo kết quả.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn so hai phiên bản, tổng thể không khác nhau, nhưng một nhóm nhỏ cho kết quả rõ. Nên làm gì?",
      options: [
        "Coi đó là giả thuyết và kiểm lại trên dữ liệu của kỳ sau",
        "Triển khai phiên bản mới cho riêng nhóm đó vì kết quả với họ là rõ ràng",
        "Tăng cỡ mẫu của nhóm đó và chạy lại phép kiểm để khẳng định kết quả",
        "Tìm lời giải thích hợp lý cho vì sao nhóm đó phản ứng khác các nhóm khác",
      ],
      correct: 0,
      explanation:
        "Tìm lời giải thích hợp lý là bước nguy hiểm nhất, vì với bất kỳ nhóm nào cũng luôn tìm được một lời giải thích nghe xuôi tai - và có lời giải thích thì phát hiện được đối xử như đã xác nhận. Kiểm lại trên dữ liệu mới mất một kỳ đo và trả lời dứt khoát.",
    },
    keyTakeaways: [
      "Hai mươi phép kiểm độc lập cho khoảng 64% khả năng có ít nhất một dương tính giả",
      "Việc thử nhiều lần hiếm khi có chủ ý; nó diễn ra dần qua từng lần chia nhóm",
      "Không bác bỏ được thường nói về cỡ mẫu nhiều hơn về thực tế",
      "Với mẫu đủ lớn, mọi khác biệt đều có ý nghĩa thống kê, kể cả khác biệt vô nghĩa",
    ],
    summary: {
      keyIdea: "Ngưỡng ý nghĩa đúng cho một phép kiểm, và số phép kiểm thật sự chạy thì không ai đếm",
      commonMistake: "Chia nhóm dần cho tới khi thấy kết quả, rồi báo cáo nó như phép kiểm duy nhất",
      action: "Ghi trước các cách chia nhóm và ngưỡng khác biệt đáng hành động, trước khi nhìn kết quả.",
    },
    application: {
      title: "Ghi trước hai thứ",
      message:
        "Trước mỗi lần đo: các cách chia nhóm định phân tích, và mức khác biệt tối thiểu đáng để hành động. Hai dòng, viết trước khi có số liệu.",
      secondary:
        "Mọi phát hiện ngoài danh sách đó là giả thuyết, và nó cần một kỳ đo mới để thành kết luận.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi khác biệt này có thật không được hỏi trong mọi buổi họp về số liệu. Công cụ trả lời nó chính xác đúng một lần mỗi lần dùng, và nó gần như luôn được dùng nhiều lần.",
      },
      {
        type: "heading",
        text: "Thử nhiều lần diễn ra mà không ai định làm vậy",
      },
      {
        type: "paragraph",
        text: "Không ai ngồi xuống với ý định chạy hai mươi phép kiểm rồi chọn cái đẹp nhất. Chuyện xảy ra là: nhìn tổng thể, không thấy gì, thử chia theo nền tảng, không thấy gì, thử theo khu vực, thử theo thâm niên. Mỗi bước đều hợp lý và không ai đếm tổng. Đến khi một cách chia cho kết quả rõ, nó được báo cáo như thể đó là phép kiểm duy nhất đã chạy.",
      },
      {
        type: "callout",
        label: "Lời giải thích hợp lý là bước nguy hiểm nhất",
        text: "Sau khi tìm được một nhóm có khác biệt, việc tiếp theo luôn là tìm lý do. Với bất kỳ nhóm nào cũng luôn có một lời giải thích nghe xuôi tai, và một khi có lời giải thích thì phát hiện ngẫu nhiên được đối xử như đã được xác nhận. Đây là chỗ một sai lệch thống kê biến thành một niềm tin của cả đội.",
      },
      {
        type: "closing",
        lines: [
          "Ngưỡng ý nghĩa bảo vệ bạn khỏi một phép kiểm; không có gì bảo vệ bạn khỏi phép kiểm thứ hai mươi.",
          "Bài sau: một biến giải thích được bao nhiêu phần của biến kia.",
        ],
      },
    ],
  },
  {
    "id": 1424,
    "slug": "hoi-quy-tuyen-tinh-don-do-do-nhay-cua-do-tre",
    "title": "Định lượng, Bài 4: Hồi quy tuyến tính đơn - đo độ nhạy của độ trễ theo tải",
    "subtitle": "Một đường thẳng khớp qua đám mây điểm cho bạn một con số, và con số đó chỉ đúng trong khoảng dữ liệu bạn có.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📉",
    "interactiveType": "regression",
    "whyItMatters": "Hệ số dốc của một đường hồi quy là cách rẻ nhất để nói tải tăng một đơn vị thì độ trễ tăng bao nhiêu - và cũng là cách dễ bị dùng ngoài phạm vi nhất.",
    "openingQuestion": "Hồi quy độ trễ theo tải cho hệ số dốc 0,4 mili giây trên mỗi yêu cầu mỗi giây. Dùng được thế nào?",
    "openingOptions": [
      "Ước lượng độ trễ khi tải đổi, trong khoảng tải mà dữ liệu đã bao phủ",
      "Ước lượng độ trễ ở mọi mức tải, kể cả mức chưa từng xuất hiện trong dữ liệu",
      "Kết luận rằng tải là nguyên nhân làm độ trễ tăng lên trong hệ thống",
      "So sánh mức độ nhạy của hệ thống này với các hệ thống khác cùng loại"
    ],
    "correctOption": 0,
    "explanation": "Hai giới hạn cần nhớ cùng lúc. Ngoài khoảng dữ liệu thì đường thẳng không còn đáng tin, vì quan hệ giữa tải và độ trễ bị bẻ cong ở gần bão hoà. Và hệ số dốc không chứng minh nhân quả - nó chỉ nói hai đại lượng đi cùng nhau, còn một yếu tố thứ ba có thể đang đẩy cả hai.",
    "diagram": [
      {
        "label": "Hệ số dốc = tải tăng một đơn vị thì độ trễ tăng bao nhiêu",
        "arrow": true
      },
      {
        "label": "Chỉ đúng TRONG khoảng dữ liệu đã bao phủ",
        "arrow": true
      },
      {
        "label": "Và nó không chứng minh nhân quả - có thể có yếu tố thứ ba",
        "arrow": true
      },
      {
        "label": "Luôn vẽ đám mây điểm ra trước khi tin vào con số"
      }
    ],
    "realWorldExample": {
      "company": "Vẽ ra trước khi tin",
      "description": "Bốn tập dữ liệu có thể cho cùng hệ số dốc, cùng hệ số tương quan, mà nhìn hoàn toàn khác nhau: một tập tuyến tính, một tập cong, một tập có một điểm ngoại lai kéo cả đường. Con số một mình không phân biệt được ba trường hợp đó."
    },
    "quiz": [
      {
        "question": "Vì sao không nên dùng đường hồi quy ngoài khoảng dữ liệu đã có?",
        "options": [
          "Vì quan hệ giữa tải và độ trễ bị bẻ cong ở gần mức bão hoà",
          "Vì sai số của ước lượng tăng lên khi đi xa khỏi giá trị trung bình",
          "Vì dữ liệu ở mức tải cao thường ít nên ước lượng kém tin cậy hơn",
          "Vì các yếu tố khác có thể thay đổi ở mức tải mà chưa từng quan sát được"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều đúng về mặt thống kê và đều mô tả sự thiếu chính xác. Cái này thì mô tả một sai lầm về HÌNH DẠNG: đường thẳng không chỉ kém chính xác ở đó mà là mô hình sai hẳn."
      },
      {
        "question": "Vì sao phải vẽ đám mây điểm ra thay vì chỉ nhìn con số?",
        "options": [
          "Vì nhiều tập dữ liệu rất khác nhau vẫn cho ra cùng hệ số dốc và cùng tương quan",
          "Vì biểu đồ sẽ giúp phát hiện các giá trị bị thiếu trong tập dữ liệu",
          "Vì cần kiểm tra xem số lượng điểm dữ liệu có đủ nhiều hay không",
          "Vì biểu đồ dễ trình bày cho người không quen với thống kê hơn"
        ],
        "correct": 0,
        "explanation": "Một tập tuyến tính, một tập cong, và một tập có một điểm ngoại lai kéo cả đường có thể cho cùng bộ số. Con số một mình không phân biệt được ba trường hợp cần ba hành động khác nhau."
      },
      {
        "question": "Hệ số tương quan cao nói lên điều gì?",
        "options": [
          "Hai đại lượng đi cùng nhau, không nói cái nào gây ra cái nào",
          "Một đại lượng có thể dùng để dự báo đại lượng kia một cách đáng tin",
          "Quan hệ giữa hai đại lượng là tuyến tính trong toàn bộ khoảng giá trị",
          "Không có yếu tố thứ ba nào ảnh hưởng tới cả hai đại lượng cùng lúc"
        ],
        "correct": 0,
        "explanation": "Một bản phát hành làm cả tải tăng lẫn độ trễ tăng vì hai lý do khác nhau sẽ cho tương quan rất cao mà không có quan hệ nhân quả nào giữa hai đại lượng đó."
      },
      {
        "question": "Vì sao một điểm ngoại lai có thể làm sai lệch cả đường hồi quy?",
        "options": [
          "Vì phương pháp khớp đường phạt sai số theo bình phương nên điểm xa có trọng số lớn",
          "Vì điểm ngoại lai thường nằm ở rìa khoảng dữ liệu nên ảnh hưởng tới độ dốc",
          "Vì số lượng điểm dữ liệu thường không đủ lớn để làm loãng ảnh hưởng của nó",
          "Vì các thuật toán khớp đường không có cơ chế phát hiện giá trị bất thường"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai mô tả một điều kiện làm ảnh hưởng nặng thêm. Nguyên nhân gốc nằm trong chính công thức: một điểm lệch gấp mười lần đóng góp sai số gấp một trăm lần, nên nó kéo đường về phía mình."
      },
      {
        "question": "Nên làm gì khi thấy một điểm ngoại lai trong dữ liệu hiệu năng?",
        "options": [
          "Tìm hiểu nó là gì trước khi quyết định giữ hay bỏ khỏi phép tính",
          "Bỏ nó ra khỏi tập dữ liệu vì nó không đại diện cho hành vi bình thường",
          "Giữ nó lại bởi vì mọi phần dữ liệu quan sát được đều là dữ liệu hợp lệ",
          "Dùng phương pháp khớp đường tương đối ít nhạy với giá trị bất thường hơn"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là quyết định đưa ra trước khi biết điểm đó là gì. Nó có thể là lỗi đo, hoặc có thể là lần duy nhất hệ thống chạm tới mức tải mà bạn đang cần dự báo - và hai trường hợp cho hai hành động ngược nhau."
      }
    ],
    "keyTakeaways": [
      "Hệ số dốc chỉ đúng TRONG khoảng dữ liệu đã bao phủ - ngoài đó là mô hình sai hẳn.",
      "Nhiều tập dữ liệu rất khác nhau cho cùng bộ số - luôn VẼ RA trước khi tin.",
      "Tương quan cao nói hai đại lượng đi cùng nhau, không nói cái nào gây ra cái nào.",
      "Sai số bình phương làm một điểm lệch gấp mười có trọng số gấp một trăm.",
      "Điểm ngoại lai: tìm hiểu nó là gì TRƯỚC khi quyết định giữ hay bỏ."
    ],
    "practicePrompt": {
      "question": "Hồi quy trên dữ liệu tải 100-500 cho dốc 0,4ms. Dự báo độ trễ ở tải 2000?",
      "options": [
        "Không dự báo được từ mô hình này - phải đo ở gần mức tải đó",
        "Khoảng 800ms, tính theo hệ số dốc nhân với mức tải cần dự báo",
        "Cao hơn 800ms một chút, có tính thêm phần sai số của ước lượng",
        "Được, nếu kiểm tra thấy hệ số tương quan trên dữ liệu hiện có đủ cao"
      ],
      "correct": 0,
      "explanation": "Lựa chọn cuối là cái bẫy: tương quan cao đo mức khớp TRONG khoảng dữ liệu và nó không nói gì về hành vi ngoài khoảng đó. Ở tải 2000 hệ thống có thể đã qua điểm gãy, nơi quan hệ tuyến tính không còn tồn tại."
    },
    "summary": {
      "keyIdea": "Một đường thẳng cho bạn một con số, và con số đó chỉ đúng trong khoảng dữ liệu bạn có.",
      "formula": "Vẽ đám mây điểm → khớp đường → đọc dốc → chỉ dùng trong khoảng đã bao phủ.",
      "commonMistake": "Ngoại suy ra ngoài khoảng dữ liệu, nơi quan hệ đã bị bẻ cong.",
      "action": "Vẽ đám mây điểm cho một cặp chỉ số bạn đang giả định là tuyến tính."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một cặp chỉ số mà bạn đang ngầm giả định quan hệ tuyến tính - ví dụ tải và độ trễ - rồi vẽ đám mây điểm của chúng.",
      "secondary": "Nhìn hình dạng trước khi tính bất kỳ con số nào. Nếu nó cong lên ở phía phải, mọi phép ngoại suy tuyến tính bạn đang dùng đều đang lạc quan hơn thực tế."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hệ số dốc của một đường hồi quy là cách rẻ nhất để nói tải tăng một đơn vị thì độ trễ tăng bao nhiêu - và cũng là cách dễ bị dùng ngoài phạm vi nhất."
      },
      {
        "type": "heading",
        "text": "Hai giới hạn phải nhớ cùng lúc"
      },
      {
        "type": "list",
        "items": [
          "PHẠM VI: chỉ đúng trong khoảng dữ liệu đã bao phủ. Ngoài đó, quan hệ bị bẻ cong ở gần bão hoà nên đường thẳng không kém chính xác mà là mô hình SAI HẲN.",
          "NHÂN QUẢ: hệ số dốc không chứng minh cái nào gây ra cái nào. Một bản phát hành làm cả tải tăng lẫn độ trễ tăng vì hai lý do khác nhau vẫn cho tương quan rất cao."
        ]
      },
      {
        "type": "heading",
        "text": "Vẽ ra trước khi tin"
      },
      {
        "type": "callout",
        "label": "Cùng bộ số, ba hình khác hẳn",
        "text": "Một tập tuyến tính, một tập cong, và một tập có một điểm ngoại lai kéo cả đường có thể cho cùng hệ số dốc và cùng hệ số tương quan. Con số một mình không phân biệt được ba trường hợp cần ba hành động khác nhau."
      },
      {
        "type": "heading",
        "text": "Vì sao một điểm lại kéo được cả đường"
      },
      {
        "type": "paragraph",
        "text": "Phương pháp khớp đường phạt sai số theo BÌNH PHƯƠNG, nên một điểm lệch gấp mười lần đóng góp sai số gấp một trăm lần và đường bị kéo về phía nó. Đây là tính chất nằm trong công thức, không phải khuyết điểm của công cụ."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bỏ ngay điểm ngoại lai",
          "text": "Có thể bạn vừa xoá lần duy nhất hệ thống chạm tới mức tải mà bạn đang cần dự báo."
        },
        "right": {
          "label": "Giữ nguyên vì đó là dữ liệu thật",
          "text": "Có thể bạn vừa để một lỗi đo quyết định hệ số dốc cho mọi kết luận sau đó."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Cả hai phản xạ đều là quyết định đưa ra TRƯỚC khi biết điểm đó là gì.",
          "Việc đúng là đi tìm hiểu nó - thường mất mười phút và nó quyết định cả hình dạng mô hình bạn sắp dùng."
        ]
      }
    ]
  },
  {
    id: 1425,
    slug: "hoi-quy-da-bien-va-cac-bay-thuong-gap",
    title: "Định lượng, Bài 5: Hồi quy đa biến và ba cái bẫy",
    subtitle: "Thêm biến thì mô hình luôn đẹp lên, và ba thứ hỏng cùng lúc",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🕸️",
    track: "professional",
    interactiveType: "regression",
    whyItMatters:
      "Thêm một biến vào mô hình không bao giờ làm hệ số xác định giảm, nên chỉ số dễ nhìn nhất luôn thưởng cho việc thêm biến. Ba cái bẫy đi kèm thì không hiện ra ở chỉ số nào, và chúng làm mô hình vô dụng theo ba cách khác nhau.",
    openingQuestion: "Vì sao thêm biến vào mô hình gần như luôn làm hệ số xác định tăng?",
    openingOptions: [
      "Vì mô hình luôn tìm được cách dùng biến mới để khớp thêm một phần nhiễu",
      "Vì mỗi biến thêm vào đều mang theo thông tin mới về biến phụ thuộc",
      "Vì số bậc tự do tăng lên giúp mô hình mô tả dữ liệu linh hoạt hơn",
      "Vì thuật toán ước lượng ưu tiên các mô hình có nhiều biến giải thích hơn",
    ],
    correctOption: 0,
    explanation:
      "Ngay cả một biến hoàn toàn ngẫu nhiên cũng làm hệ số xác định tăng nhẹ, vì trong một tập dữ liệu hữu hạn luôn có một chút nhiễu mà biến đó tình cờ khớp được. Đó là lý do chỉ số này không dùng để so hai mô hình có số biến khác nhau, và cũng là lý do việc thêm biến cho cảm giác cải thiện ở mọi bước. Hệ quả thực tế: một mô hình mười lăm biến trên hai trăm quan sát trông tốt hơn mô hình ba biến ở mọi chỉ số nội bộ, và tệ hơn hẳn trên dữ liệu mới.",
    diagram: [
      { label: "Thêm biến: hệ số xác định luôn tăng", arrow: true },
      { label: "Kể cả khi biến đó hoàn toàn ngẫu nhiên", arrow: true },
      { label: "Ba bẫy mở ra và không hiện ở chỉ số nào", arrow: true },
      { label: "Chỉ dữ liệu ngoài mẫu phân biệt được" },
    ],
    realWorldExample: {
      company: "Mười lăm biến, hai trăm quan sát",
      description:
        "Một mô hình dự báo tải được xây với mười lăm biến giải thích trên hai trăm quan sát lịch sử, giải thích được hơn chín mươi phần trăm biến động. Đưa vào chạy thật thì sai lệch lớn ngay tháng đầu. Mô hình đã học thuộc hai trăm quan sát ấy, gồm cả phần nhiễu của chúng, và phần nhiễu thì không lặp lại.",
    },
    quiz: [
      {
        question: "Đa cộng tuyến gây ra vấn đề gì?",
        options: [
          "Hệ số của từng biến trở nên không ổn định dù mô hình vẫn dự báo tốt",
          "Mô hình mất hẳn khả năng dự báo vì các biến trùng lặp thông tin của nhau",
          "Hệ số xác định giảm vì thông tin trùng lặp",
          "Thuật toán không hội tụ nên không ra kết quả",
        ],
        correct: 0,
        explanation:
          "Đây là phân biệt quan trọng: dự báo vẫn ổn, còn việc đọc từng hệ số thì không. Khi hai biến gần như trùng nhau, mô hình có vô số cách chia phần đóng góp giữa chúng và nó chọn một cách gần như tuỳ ý - nên hệ số có thể đổi dấu chỉ vì bạn thêm vài quan sát.",
      },
      {
        question: "Biến bị bỏ sót ảnh hưởng tới mô hình thế nào?",
        options: [
          "Hệ số của các biến còn lại hút phần ảnh hưởng của biến bị thiếu",
          "Mô hình giải thích được ít hơn hẳn nên chỉ số của nó cũng thấp hơn",
          "Dự báo lệch một khoảng cố định",
          "Phần dư tăng và không còn ngẫu nhiên",
        ],
        correct: 0,
        explanation:
          "Đây là cái bẫy nguy hiểm nhất trong ba cái, vì nó không làm mô hình trông tệ đi chút nào. Nếu biến bị bỏ sót có liên hệ với một biến đang có trong mô hình, hệ số của biến đang có sẽ phóng đại và bạn đọc ra một ảnh hưởng lớn hơn thực tế - không chỉ số nào cảnh báo điều đó.",
      },
      {
        question: "Cách nào phát hiện khớp quá mức đáng tin nhất?",
        options: [
          "Đo trên phần dữ liệu chưa từng được dùng để xây mô hình",
          "So sánh hệ số xác định đã điều chỉnh giữa các mô hình có số biến khác nhau",
          "Kiểm số biến có quá lớn so với số quan sát",
          "Xem các hệ số có ý nghĩa thống kê và có dấu phù hợp với kỳ vọng không",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều là dấu hiệu gián tiếp và đều tính trên chính tập dữ liệu đã dùng để xây mô hình. Phần dữ liệu giữ riêng ra là phép thử duy nhất trả lời đúng câu hỏi mà bạn đang hỏi: mô hình này hoạt động thế nào với dữ liệu nó chưa từng thấy.",
      },
      {
        question: "Hệ số của một biến đổi dấu khi thêm biến khác vào nghĩa là gì?",
        options: [
          "Hai biến có liên hệ với nhau, và cần quyết định đọc mô hình nào",
          "Mô hình mới đúng hơn, hệ số cũ là sai lệch",
          "Có lỗi trong dữ liệu hoặc khi ước lượng",
          "Biến vừa thêm không nên có trong mô hình",
        ],
        correct: 0,
        explanation:
          "Hiện tượng này bình thường và nó nói rằng phần ảnh hưởng đang được chia lại giữa các biến có liên hệ. Không mô hình nào trong hai mô hình sai; chúng trả lời hai câu hỏi khác nhau, và bạn phải nói rõ đang hỏi câu nào - giữ các biến kia cố định hay không.",
      },
      {
        question: "Số biến nên có trong mô hình phụ thuộc chủ yếu vào điều gì?",
        options: [
          "Số quan sát có được, vì mỗi biến ăn một phần khả năng khái quát hoá",
          "Số yếu tố mà bạn tin là có ảnh hưởng thật tới biến cần giải thích",
          "Mức cải thiện của hệ số xác định khi thêm từng biến vào mô hình",
          "Yêu cầu về độ chính xác của dự báo mà bài toán đặt ra ban đầu",
        ],
        correct: 0,
        explanation:
          "Với hai trăm quan sát, ba biến là hợp lý và mười lăm biến thì mô hình bắt đầu học thuộc dữ liệu. Đây là ràng buộc cứng không phụ thuộc vào việc bạn tin các biến ấy quan trọng tới đâu, và nó là ràng buộc hay bị bỏ qua nhất vì thêm biến thì luôn thấy chỉ số đẹp lên.",
      },
    ],
    practicePrompt: {
      question:
        "Mô hình của bạn có mười biến trên ba trăm quan sát và giải thích được 88% biến động. Nên làm gì trước khi dùng?",
      options: [
        "Đo lại trên phần dữ liệu giữ riêng chưa từng dùng để xây mô hình",
        "Kiểm đa cộng tuyến để bỏ biến trùng",
        "Rà ý nghĩa từng hệ số và bỏ biến không đạt",
        "So với mô hình ít biến hơn bằng chỉ số đã điều chỉnh",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều chạy trên chính tập dữ liệu đã sinh ra con số 88%, nên chúng không trả lời được câu hỏi thật là mô hình có hoạt động với dữ liệu mới không. Giữ riêng một phần dữ liệu tốn ít công hơn cả ba việc kia và trả lời dứt khoát.",
    },
    keyTakeaways: [
      "Thêm biến ngẫu nhiên cũng làm hệ số xác định tăng, nên chỉ số đó không so được hai mô hình khác số biến",
      "Đa cộng tuyến làm hệ số không ổn định trong khi dự báo vẫn ổn",
      "Biến bị bỏ sót là bẫy nguy hiểm nhất vì nó không làm mô hình trông tệ đi",
      "Số quan sát đặt ra một trần cứng cho số biến, bất kể bạn tin chúng quan trọng tới đâu",
    ],
    summary: {
      keyIdea: "Chỉ số dễ nhìn nhất luôn thưởng cho việc thêm biến, còn ba cái bẫy đi kèm thì không hiện ở đâu",
      commonMistake: "Đánh giá mô hình bằng các chỉ số tính trên chính tập dữ liệu đã dùng để xây nó",
      action: "Giữ riêng một phần dữ liệu từ đầu, và chỉ chạm vào nó một lần khi mô hình đã xong.",
    },
    application: {
      title: "Tách dữ liệu trước khi bắt đầu",
      message:
        "Cắt một phần dữ liệu ra trước khi xây mô hình và đừng nhìn nó. Mọi chỉ số tính trên phần còn lại đều lạc quan, kể cả những chỉ số đã điều chỉnh.",
      secondary:
        "Với mỗi hệ số bạn định đọc thành ý nghĩa, kiểm xem nó có đổi khi thêm bớt một biến khác không - nếu có thì đừng đọc nó một mình.",
    },
    sections: [
      {
        type: "lead",
        text: "Thêm một biến vào mô hình không bao giờ làm hệ số xác định giảm. Đó là một tính chất toán học, và nó có nghĩa là chỉ số dễ nhìn nhất luôn thưởng cho hành động dễ làm nhất.",
      },
      {
        type: "heading",
        text: "Ba cái bẫy, ba kiểu hỏng khác nhau",
      },
      {
        type: "list",
        items: [
          "Khớp quá mức: mô hình học thuộc cả nhiễu, đẹp trong mẫu và tệ ngoài mẫu",
          "Đa cộng tuyến: dự báo vẫn ổn, còn từng hệ số thì không đọc được",
          "Biến bị bỏ sót: hệ số các biến còn lại hút phần ảnh hưởng của biến thiếu",
          "Chỉ cái thứ nhất bị bắt bởi dữ liệu ngoài mẫu; hai cái kia phải tự nghĩ ra",
        ],
      },
      {
        type: "callout",
        label: "Biến bị bỏ sót không làm mô hình trông tệ đi",
        text: "Khớp quá mức lộ ra ngay khi bạn đo trên dữ liệu mới, và đa cộng tuyến lộ ra khi hệ số nhảy lung tung. Biến bị bỏ sót thì không để lại dấu vết nào: mô hình vẫn khớp tốt, hệ số vẫn ổn định, và con số bạn đọc ra vẫn sai. Cách duy nhất phát hiện là hỏi thứ gì có thể ảnh hưởng tới cả hai vế mà mình chưa đưa vào.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình nhiều biến luôn đẹp hơn trên dữ liệu cũ; đó chính là vấn đề, không phải bằng chứng.",
          "Bài sau: dữ liệu có thứ tự thời gian phá vỡ mọi giả định ở trên.",
        ],
      },
    ],
  },
  {
    id: 1426,
    slug: "chuoi-thoi-gian-va-kiem-chung-ngoai-mau",
    title: "Định lượng, Bài 6: Chuỗi thời gian và kiểm chứng ngoài mẫu",
    subtitle: "Dữ liệu có thứ tự phá vỡ mọi giả định của năm bài trước, và nó phá theo hướng làm bạn tự tin hơn",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⏳",
    track: "professional",
    interactiveType: "regression",
    whyItMatters:
      "Phần lớn số liệu vận hành đều có thứ tự thời gian, và mọi công cụ thống kê thông thường giả định các quan sát độc lập. Khoảng cách giữa hai điều đó là lý do các mô hình dự báo tải, dự báo chi phí và dự báo tăng trưởng luôn đẹp trên dữ liệu cũ.",
    openingQuestion: "Vì sao chia dữ liệu ngẫu nhiên thành tập huấn luyện và tập kiểm là sai với chuỗi thời gian?",
    openingOptions: [
      "Vì mô hình được thấy dữ liệu tương lai khi học, điều không xảy ra lúc chạy thật",
      "Vì các quan sát gần nhau về thời gian có giá trị tương tự nên bị chia không đều",
      "Vì tập kiểm ngẫu nhiên không phản ánh đúng phân phối của dữ liệu trong thực tế",
      "Vì thứ tự thời gian là một biến quan trọng bị mất đi khi chia ngẫu nhiên",
    ],
    correctOption: 0,
    explanation:
      "Chia ngẫu nhiên đặt một số quan sát của tháng Sáu vào tập huấn luyện và một số quan sát của tháng Năm vào tập kiểm. Mô hình vì thế học được cả những gì xảy ra sau thời điểm mà nó sẽ phải dự báo, và nó dùng thông tin ấy để nội suy giữa hai điểm đã biết - một việc dễ hơn nhiều so với ngoại suy về phía trước. Kết quả là điểm số trên tập kiểm cao hơn hẳn kết quả thật, và sai lệch này lớn tới mức nó thường quyết định việc mô hình được đưa vào chạy hay không. Cách chia đúng là cắt theo thời gian: huấn luyện trên phần trước, kiểm trên phần sau, đúng như lúc chạy thật.",
    diagram: [
      { label: "Chia ngẫu nhiên: mô hình thấy cả dữ liệu tương lai", arrow: true },
      { label: "Bài toán thành nội suy, dễ hơn nhiều", arrow: true },
      { label: "Điểm số cao hơn hẳn thực tế", arrow: true },
      { label: "Cắt theo thời gian mới mô phỏng đúng lúc chạy thật" },
    ],
    realWorldExample: {
      company: "Chín mươi phần trăm rồi bốn mươi",
      description:
        "Một mô hình dự báo tải đạt độ chính xác rất cao trên tập kiểm được chia ngẫu nhiên, và được duyệt đưa vào vận hành. Trong tháng đầu chạy thật, sai lệch lớn gấp nhiều lần. Chia lại theo thời gian trên chính dữ liệu cũ cho ra con số gần đúng với thực tế - phép kiểm đúng đã có sẵn từ đầu, chỉ là nó cho một con số khó chấp nhận hơn.",
    },
    quiz: [
      {
        question: "Rò rỉ thông tin tương lai còn xảy ra ở chỗ nào ngoài cách chia dữ liệu?",
        options: [
          "Ở các biến được tính trên toàn bộ dữ liệu, như trung bình hay giá trị chuẩn hoá",
          "Ở việc chọn siêu tham số của mô hình dựa trên kết quả của tập kiểm",
          "Ở các biến có độ trễ không được tính đúng theo thời điểm dữ liệu thật sự sẵn có",
          "Ở việc dữ liệu lịch sử được sửa lại sau khi đã ghi nhận lần đầu",
        ],
        correct: 0,
        explanation:
          "Ba nguồn kia đều có thật và đều được nhắc tới nhiều. Nguồn này thì lặng lẽ nhất: chuẩn hoá một biến bằng trung bình và độ lệch chuẩn tính trên toàn bộ dữ liệu đã đưa thông tin của tương lai vào từng quan sát của quá khứ, và bước ấy thường nằm trong phần tiền xử lý mà không ai coi là một phần của mô hình.",
      },
      {
        question: "Kiểm chứng theo cửa sổ trượt về phía trước có ưu điểm gì?",
        options: [
          "Nó cho nhiều lần kiểm, mỗi lần mô phỏng đúng tình huống lúc chạy thật",
          "Nó dùng được toàn bộ dữ liệu để huấn luyện",
          "Nó giảm ảnh hưởng của giai đoạn bất thường",
          "Nó cho so nhiều mô hình trên cùng tập kiểm",
        ],
        correct: 0,
        explanation:
          "Một lần cắt theo thời gian cho đúng một phép kiểm, và kết quả của nó phụ thuộc nhiều vào việc điểm cắt rơi vào giai đoạn nào. Trượt cửa sổ về phía trước cho một chuỗi kết quả, và độ biến động giữa chúng tự nó đã là thông tin về việc mô hình ổn định tới đâu.",
      },
      {
        question: "Vì sao chuỗi thời gian vi phạm giả định độc lập của các phép kiểm thông thường?",
        options: [
          "Vì giá trị hôm nay thường liên quan tới giá trị hôm qua",
          "Vì các quan sát được thu thập theo một trình tự cố định chứ không ngẫu nhiên",
          "Vì phân phối đổi theo thời gian",
          "Vì số lượng quan sát bị giới hạn bởi khoảng thời gian đã thu thập được",
        ],
        correct: 0,
        explanation:
          "Tự tương quan là vi phạm cốt lõi, và hệ quả của nó rất cụ thể: số quan sát hiệu dụng nhỏ hơn nhiều so với số dòng dữ liệu. Một chuỗi một nghìn điểm đo mỗi phút có thể chỉ mang lượng thông tin tương đương vài chục quan sát độc lập, nên mọi khoảng tin cậy tính theo cách thông thường đều hẹp hơn thực tế.",
      },
      {
        question: "Xu hướng và tính mùa vụ nên được xử lý thế nào trước khi mô hình hoá?",
        options: [
          "Tách chúng ra và mô hình hoá riêng, vì phần còn lại mới là thứ cần dự báo",
          "Đưa chúng vào mô hình dưới dạng các biến giải thích để mô hình tự học",
          "Loại bỏ chúng khỏi dữ liệu vì chúng làm nhiễu quan hệ giữa các biến",
          "Giữ nguyên vì các mô hình chuỗi thời gian hiện đại xử lý được chúng tự động",
        ],
        correct: 0,
        explanation:
          "Xu hướng và mùa vụ thường chiếm phần lớn biến động, nên một mô hình chỉ học được hai thứ đó đã trông rất chính xác trong khi nó không dự báo được điều gì hữu ích. Tách ra rồi xem phần dư còn lại có dự báo được không là cách duy nhất biết mô hình có thêm giá trị gì không.",
      },
      {
        question: "Mô hình chạy tốt sáu tháng rồi xấu đi thì nguyên nhân thường là gì?",
        options: [
          "Quan hệ trong dữ liệu đã đổi, và mô hình vẫn giữ quan hệ cũ",
          "Chất lượng dữ liệu đầu vào giảm sút do các thay đổi trong hệ thống thu thập",
          "Mô hình cần được huấn luyện lại định kỳ với dữ liệu mới để duy trì độ chính xác",
          "Có sự cố kỹ thuật trong quá trình vận hành khiến mô hình hoạt động không đúng",
        ],
        correct: 0,
        explanation:
          "Huấn luyện lại là cách xử lý chứ không phải nguyên nhân. Nguyên nhân là hệ thống đã đổi: kiến trúc mới, nhóm người dùng mới, một tính năng thay đổi hành vi. Vì vậy mọi mô hình chạy trong sản xuất cần một chỉ số theo dõi chính độ chính xác của nó, chứ không chỉ theo dõi đầu ra.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn có mô hình dự báo tải đạt độ chính xác rất cao trên tập kiểm. Nên kiểm gì trước khi tin?",
      options: [
        "Tập kiểm được chia theo thời gian hay ngẫu nhiên, và các biến chuẩn hoá bằng gì",
        "Mô hình có bị khớp quá mức không bằng cách so số biến với số quan sát có được",
        "Độ chính xác có ổn định không khi thử với các tham số khác nhau của mô hình",
        "Các biến đầu vào có sẵn sàng tại thời điểm cần dự báo trong môi trường thật không",
      ],
      correct: 0,
      explanation:
        "Hai câu này bắt hai nguồn rò rỉ phổ biến nhất, và chúng giải thích phần lớn khoảng cách giữa điểm số trên giấy với kết quả thật. Phương án bốn cũng là một nguồn rò rỉ đáng kiểm, nhưng nó hiếm hơn nhiều so với hai nguồn kia.",
    },
    keyTakeaways: [
      "Chia ngẫu nhiên biến ngoại suy thành nội suy, và điểm số cao hơn hẳn thực tế",
      "Chuẩn hoá trên toàn bộ dữ liệu là rò rỉ tương lai lặng lẽ nhất",
      "Tự tương quan làm số quan sát hiệu dụng nhỏ hơn số dòng dữ liệu rất nhiều",
      "Mô hình chỉ học được xu hướng và mùa vụ trông rất chính xác mà không dự báo được gì",
    ],
    summary: {
      keyIdea: "Dữ liệu có thứ tự phá vỡ giả định độc lập, và nó phá theo hướng làm mọi con số đẹp lên",
      commonMistake: "Chia ngẫu nhiên tập kiểm, rồi ngạc nhiên khi mô hình chạy thật kém hơn nhiều lần",
      action: "Cắt tập kiểm theo thời gian, và kiểm mọi bước tiền xử lý xem có dùng dữ liệu tương lai không.",
    },
    application: {
      title: "Cắt theo thời gian, và soi phần tiền xử lý",
      message:
        "Tập kiểm luôn là phần sau của trục thời gian. Mọi giá trị trung bình, độ lệch chuẩn hay ngưỡng dùng để chuẩn hoá phải tính chỉ trên phần huấn luyện.",
      secondary:
        "Với mô hình đang chạy thật, thêm một chỉ số theo dõi độ chính xác của chính nó - quan hệ trong dữ liệu sẽ đổi, và không có gì báo cho bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước đều giả định các quan sát độc lập với nhau. Phần lớn số liệu vận hành thì có thứ tự thời gian, và giả định ấy sai theo một hướng rất cụ thể: nó làm mọi con số đẹp lên.",
      },
      {
        type: "heading",
        text: "Rò rỉ tương lai, hai đường vào",
      },
      {
        type: "paragraph",
        text: "Đường thứ nhất là cách chia dữ liệu: chia ngẫu nhiên thì mô hình học được cả những gì xảy ra sau thời điểm nó phải dự báo, và bài toán biến từ ngoại suy thành nội suy. Đường thứ hai lặng lẽ hơn: chuẩn hoá một biến bằng trung bình tính trên toàn bộ dữ liệu đã đưa thông tin của tương lai vào từng quan sát quá khứ, và bước ấy thường nằm trong phần tiền xử lý mà không ai coi là một phần của mô hình.",
      },
      {
        type: "callout",
        label: "Xu hướng và mùa vụ có thể là toàn bộ độ chính xác",
        text: "Một mô hình học được rằng tải tăng dần và cao hơn vào giờ hành chính sẽ trông rất chính xác, vì hai thứ đó chiếm phần lớn biến động. Nó cũng không nói được gì mà một quy tắc hai dòng không nói được. Tách xu hướng và mùa vụ ra rồi hỏi phần dư còn lại có dự báo được không là cách duy nhất biết mô hình có thêm giá trị gì.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình nào cũng đẹp trên dữ liệu cũ; câu hỏi duy nhất là bạn đã kiểm nó đúng cách chưa.",
          "Chặng này khép lại ở một chỗ: mọi con số đều đến kèm một cách kiểm, và cách kiểm mới là phần khó.",
        ],
      },
    ],
  },
];
