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
    slug: "phan-phoi-xac-suat-trong-tai-chinh",
    title: "Định lượng, Bài 1: Phân phối xác suất trong tài chính - và vì sao đuôi luôn dày hơn bạn nghĩ",
    subtitle: "Phân phối chuẩn, phân phối loga chuẩn, độ lệch và độ nhọn: bốn con số mô tả một chuỗi lợi suất",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🎲",
    track: "professional",
    whyItMatters:
      "Gần như mọi mô hình rủi ro bạn sẽ gặp - VaR, Black-Scholes, tối ưu danh mục - đều bắt đầu bằng một giả định về phân phối lợi suất. Nếu giả định đó sai, mọi con số phía sau đều sai theo một cách có hệ thống, và luôn sai theo hướng đánh giá thấp rủi ro.",
    openingQuestion:
      "Vì sao giả định lợi suất cổ phiếu tuân theo phân phối chuẩn lại nguy hiểm trong quản trị rủi ro?",
    openingOptions: [
      "Vì phân phối chuẩn khó tính toán trên máy tính",
      "Vì lợi suất thực tế có đuôi dày hơn chuẩn",
      "Vì phân phối chuẩn chỉ áp dụng cho trái phiếu",
      "Vì phân phối chuẩn luôn cho kết quả bi quan quá mức",
    ],
    correctOption: 1,
    explanation:
      "Theo phân phối chuẩn, một biến động 5 độ lệch chuẩn xảy ra khoảng một lần trong vài triệu ngày giao dịch, tức hầu như không bao giờ. Trên thị trường thật, các cú như vậy xuất hiện vài lần trong một đời người đầu tư. Hiện tượng này gọi là đuôi dày, và hệ quả trực tiếp là mọi mô hình rủi ro dựa trên phân phối chuẩn đều đánh giá thấp một cách có hệ thống xác suất của thảm họa - đúng vào lúc bạn cần nó chính xác nhất.",
    diagram: [
      { label: "Chuỗi giá", arrow: true },
      { label: "Chuyển thành lợi suất loga", arrow: true },
      { label: "Mô tả bằng 4 mô men: trung bình, độ lệch chuẩn, độ lệch, độ nhọn", arrow: true },
      { label: "Kiểm tra giả định trước khi mô hình hóa" },
    ],
    realWorldExample: {
      company: "Ngày 19/10/1987",
      description:
        "Chỉ số Dow Jones giảm hơn 22% trong một phiên. Theo mô hình phân phối chuẩn dựa trên biến động khi đó, xác suất của một sự kiện như vậy nhỏ tới mức nó không được kỳ vọng xảy ra dù thị trường có tồn tại lâu hơn tuổi của vũ trụ. Nó vẫn xảy ra. Đó là bằng chứng thực nghiệm mạnh nhất cho thấy phân phối chuẩn không mô tả đúng đuôi của thị trường tài chính.",
    },
    quiz: [
      {
        question: "Vì sao giá cổ phiếu thường được mô hình hóa bằng phân phối loga chuẩn thay vì phân phối chuẩn?",
        options: [
          "Vì loga chuẩn tính toán nhanh hơn trên máy",
          "Vì giá không thể âm và tăng trưởng mang tính nhân",
          "Vì chuẩn mực yêu cầu trình bày theo thang loga",
          "Vì loga chuẩn có phương sai bằng 0",
        ],
        correct: 1,
        explanation:
          "Nếu lợi suất loga tuân theo phân phối chuẩn thì giá tuân theo phân phối loga chuẩn. Điều này khớp với hai đặc điểm thực tế: giá luôn dương và tăng trưởng mang tính nhân, không cộng.",
      },
      {
        question: "Độ lệch (skewness) âm của chuỗi lợi suất nghĩa là gì?",
        options: [
          "Lợi suất trung bình của cả giai đoạn quan sát là một số âm",
          "Đuôi trái dài hơn: cú giảm cực đoan lớn hơn cú tăng cực đoan",
          "Phương sai của chuỗi lợi suất mang giá trị âm trong giai đoạn đó",
          "Dữ liệu bị lỗi, vì độ lệch của một chuỗi lợi suất không thể âm",
        ],
        correct: 1,
        explanation:
          "Chỉ số cổ phiếu thường có độ lệch âm. Điều này quan trọng vì độ lệch chuẩn đối xử với tăng và giảm như nhau, nên nó che giấu đúng loại rủi ro mà nhà đầu tư sợ nhất.",
      },
      {
        question: "Độ nhọn vượt trội (excess kurtosis) dương phản ánh điều gì?",
        options: [
          "Đuôi dày hơn phân phối chuẩn: cực đoan xảy ra thường xuyên hơn",
          "Trung bình của phân phối cao hơn trung bình của phân phối chuẩn tương ứng",
          "Chuỗi dữ liệu có xu hướng tăng rõ rệt trong suốt giai đoạn quan sát",
          "Phương sai của chuỗi bằng 0, nghĩa là lợi suất hầu như không dao động",
        ],
        correct: 0,
        explanation:
          "Phân phối chuẩn có độ nhọn bằng 3, nên độ nhọn vượt trội được tính bằng độ nhọn trừ 3. Hầu hết chuỗi lợi suất tài sản tài chính có độ nhọn vượt trội dương rõ rệt, đặc biệt ở tần suất ngày.",
      },
      {
        question: "Vì sao độ lệch chuẩn một mình là thước đo rủi ro không đầy đủ?",
        options: [
          "Vì nó đòi hỏi quá nhiều dữ liệu lịch sử mới ước lượng được chính xác",
          "Vì nó coi biến động tăng và giảm như nhau, nên bỏ sót rủi ro đuôi",
          "Vì nó luôn cho kết quả cao hơn mức rủi ro mà nhà đầu tư thực sự chịu",
          "Vì nó chỉ áp dụng được cho danh mục có trên một trăm mã cổ phiếu",
        ],
        correct: 1,
        explanation:
          "Một danh mục bán quyền chọn có thể có độ lệch chuẩn rất thấp trong nhiều năm rồi mất một nửa giá trị trong một tuần. Độ lệch chuẩn hoàn toàn không thấy được rủi ro dạng này; cần thêm độ lệch, độ nhọn và các thước đo đuôi.",
      },
      {
        question: "Trong tài chính, vì sao thường dùng lợi suất loga thay vì lợi suất số học?",
        options: [
          "Vì lợi suất loga luôn lớn hơn nên trông đẹp hơn",
          "Vì lợi suất loga cộng được qua nhiều kỳ liên tiếp",
          "Vì sở giao dịch chỉ công bố theo thang loga",
          "Vì lấy loga loại bỏ được rủi ro đuôi",
        ],
        correct: 1,
        explanation:
          "Lợi suất loga của nhiều kỳ liên tiếp cộng lại thành lợi suất loga của cả giai đoạn, trong khi lợi suất số học thì phải nhân. Tính chất cộng này khiến toàn bộ bộ máy thống kê dựa trên phân phối chuẩn trở nên áp dụng được.",
      },
    ],
    keyTakeaways: [
      "Bốn mô men mô tả một chuỗi lợi suất: trung bình, độ lệch chuẩn, độ lệch, độ nhọn - dừng ở hai mô men đầu là bỏ sót rủi ro đuôi",
      "Giá được mô hình hóa bằng phân phối loga chuẩn vì giá không âm và tăng trưởng mang tính nhân",
      "Lợi suất thị trường thật có đuôi dày và độ lệch âm, khác rõ so với phân phối chuẩn",
      "Mọi mô hình rủi ro giả định phân phối chuẩn đều đánh giá thấp xác suất thảm họa một cách có hệ thống",
    ],
    practicePrompt: {
      question:
        "Một quỹ khoe rằng trong 5 năm chỉ có 3 tháng lỗ và độ lệch chuẩn rất thấp. Bạn nên hỏi thêm điều gì?",
      options: [
        "Quỹ có bao nhiêu nhân sự",
        "Lợi suất có lệch âm và đuôi dày không",
        "Quỹ có đăng ký hoạt động hợp pháp không",
        "Phí quản lý là bao nhiêu",
      ],
      correct: 1,
      explanation:
        "Chuỗi lợi nhuận quá đều là tín hiệu cảnh báo, không phải điểm cộng. Các chiến lược bán biến động, cho vay ký quỹ hay arbitrage tín dụng đều tạo ra hình dạng lợi suất này: hàng chục tháng lãi nhỏ đều đặn, rồi một tháng xóa sạch. Độ lệch chuẩn thấp đang che giấu chứ không phản ánh rủi ro.",
    },
    summary: {
      keyIdea: "Trung bình và độ lệch chuẩn chỉ mô tả nửa câu chuyện; rủi ro thật nằm ở đuôi",
      formula: "Lợi suất loga = ln(P_t / P_t−1)",
      commonMistake: "Dùng phân phối chuẩn cho mọi thứ vì nó tiện, rồi ngạc nhiên khi sự kiện không thể xảy ra lại xảy ra",
      action: "Lấy dữ liệu lợi suất ngày của VN-Index một năm, tính bốn mô men và so đuôi thực tế với dự đoán của phân phối chuẩn.",
    },
    application: {
      title: "Kiểm tra giả định trước khi tin mô hình",
      message:
        "Trước khi dùng bất kỳ con số rủi ro nào người khác đưa, hãy hỏi mô hình giả định phân phối gì. Nếu câu trả lời là phân phối chuẩn, hãy tự động coi ước lượng rủi ro đuôi là quá lạc quan và hỏi tiếp: kết quả sẽ ra sao trong kịch bản xấu nhất từng xảy ra trong lịch sử.",
      secondary: "Cách kiểm tra rẻ nhất: đếm số lần lợi suất vượt 3 độ lệch chuẩn trong dữ liệu thật, rồi so với con số phân phối chuẩn dự báo.",
    },
    sections: [
      {
        type: "lead",
        text: "Thống kê trong tài chính không bắt đầu bằng công thức mà bằng một câu hỏi khiêm tốn: chuỗi số này có hình dạng thế nào. Trả lời sai câu đó thì mọi thứ tinh vi xây phía trên chỉ làm sai lầm trông đáng tin hơn.",
      },
      {
        type: "heading",
        text: "Bốn con số mô tả một chuỗi lợi suất",
      },
      {
        type: "conceptTable",
        title: "Bốn mô men",
        subtitle: "Mỗi mô men trả lời một câu hỏi khác nhau về cùng một chuỗi dữ liệu",
        concepts: [
          { vi: "Trung bình", en: "Mean", def: "Lợi suất kỳ vọng. Cần rất nhiều dữ liệu để ước lượng chính xác, nên gần như luôn là con số đáng ngờ nhất trong mọi mô hình." },
          { vi: "Độ lệch chuẩn", en: "Standard deviation", def: "Mức phân tán quanh trung bình. Ước lượng ổn định hơn trung bình nhiều, nhưng đối xử với tăng và giảm như nhau." },
          { vi: "Độ lệch", en: "Skewness", def: "Phân phối nghiêng về phía nào. Âm nghĩa là đuôi trái dài hơn - đặc trưng của chỉ số cổ phiếu và của các chiến lược bán rủi ro." },
          { vi: "Độ nhọn", en: "Kurtosis", def: "Đuôi dày cỡ nào. Vượt trội dương nghĩa là sự kiện cực đoan xảy ra thường xuyên hơn phân phối chuẩn dự báo." },
        ],
      },
      {
        type: "formula",
        title: "Vì sao dùng lợi suất loga",
        label: "Tính cộng qua thời gian",
        equation: "r_t = ln(P_t / P_t−1)",
        variables: [
          { symbol: "P_t", name: "Giá tại thời điểm t", description: "Đã điều chỉnh cổ tức và chia tách" },
          { symbol: "r_t", name: "Lợi suất loga kỳ t", description: "Cộng dồn được: lợi suất cả năm bằng tổng lợi suất từng ngày" },
        ],
        example: {
          title: "Kiểm chứng nhanh",
          calculation: "Giá 100 lên 110 rồi về 100: lợi suất loga = ln(1,1) + ln(0,909) = 0,0953 − 0,0953",
          result: "Tổng bằng 0, đúng như thực tế",
          explanation:
            "Với lợi suất số học, ta có +10% rồi −9,09%, cộng lại ra +0,91% - một con số vô nghĩa. Đây là lý do phân tích nhiều kỳ luôn dùng lợi suất loga.",
        },
      },
      {
        type: "callout",
        label: "Sự thật khó chịu",
        text: "Trung bình là tham số khó ước lượng nhất. Để phân biệt một tài sản có lợi suất kỳ vọng 8% với một tài sản 10%, với mức biến động điển hình của cổ phiếu, bạn cần hàng chục năm dữ liệu. Đó là lý do mọi mô hình tối ưu danh mục đều rất nhạy với đầu vào lợi suất kỳ vọng - và cũng là lý do chúng thường thất bại ngoài mẫu.",
      },
      {
        type: "closing",
        lines: [
          "Trước khi tính, hãy nhìn hình dạng của dữ liệu.",
          "Bài sau trả lời câu hỏi tiếp theo: với một mẫu hữu hạn, ta được phép tự tin đến đâu về con số vừa tính.",
        ],
      },
    ],
  },
  {
    id: 1422,
    slug: "mau-sai-so-chuan-va-khoang-tin-cay",
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
    slug: "kiem-dinh-gia-thuyet-trong-tai-chinh",
    title: "Định lượng, Bài 3: Kiểm định giả thuyết - và cái bẫy p-hacking trong backtest",
    subtitle: "Giả thuyết không, giá trị p, sai lầm loại I và II, và vì sao thử 100 chiến lược luôn tìm ra một cái đẹp",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🔬",
    track: "professional",
    whyItMatters:
      "Kiểm định giả thuyết là ngôn ngữ chuẩn để nói câu này khác không một cách đáng tin. Nhưng trong tài chính nó bị lạm dụng nghiêm trọng: mọi backtest đều là kết quả của việc thử nhiều lần, và giá trị p không hề tính đến số lần bạn đã thử.",
    openingQuestion:
      "Bạn thử 100 chiến lược giao dịch ngẫu nhiên, hoàn toàn vô giá trị. Ở mức ý nghĩa 5%, kỳ vọng có bao nhiêu chiến lược trông có ý nghĩa thống kê?",
    openingOptions: [
      "Không có cái nào, vì chúng vô giá trị",
      "Khoảng 5 chiến lược",
      "Khoảng 50 chiến lược",
      "Tất cả 100",
    ],
    correctOption: 1,
    explanation:
      "Mức ý nghĩa 5% có nghĩa là chấp nhận sai lầm loại I với xác suất 5% cho mỗi lần kiểm định. Thử 100 lần trên dữ liệu ngẫu nhiên thì kỳ vọng có khoảng 5 kết quả trông đẹp thuần túy do may mắn. Đây là gốc rễ của vấn đề trong toàn ngành backtest: người ta thử hàng nghìn biến thể, chỉ công bố cái tốt nhất, rồi trình bày giá trị p của nó như thể đó là lần thử duy nhất.",
    diagram: [
      { label: "Giả thuyết không: không có hiệu ứng", arrow: true },
      { label: "Tính thống kê kiểm định từ dữ liệu", arrow: true },
      { label: "So với ngưỡng, ra giá trị p", arrow: true },
      { label: "Hỏi tiếp: đã thử bao nhiêu lần trước khi ra kết quả này" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Khủng hoảng nhân rộng trong tài chính học thuật",
      description:
        "Nhiều nghiên cứu rà soát lại hàng trăm yếu tố sinh lợi đã được công bố trên các tạp chí hàng đầu và phát hiện phần lớn không còn hiệu quả sau khi bài báo được xuất bản. Một phần do thị trường đã hấp thụ thông tin, nhưng phần lớn hơn là do các yếu tố đó chưa bao giờ tồn tại thật - chúng là sản phẩm của việc dò tìm trên cùng một tập dữ liệu lịch sử hữu hạn bởi hàng nghìn nhà nghiên cứu.",
    },
    quiz: [
      {
        question: "Giá trị p đúng nghĩa là gì?",
        options: [
          "Xác suất để giả thuyết không là đúng, tính trên dữ liệu vừa quan sát được",
          "Xác suất quan sát kết quả cực đoan đến vậy nếu giả thuyết không đúng",
          "Xác suất chiến lược tiếp tục sinh lời trong giai đoạn sắp tới",
          "Tỷ lệ số quan sát nằm ngoài khoảng tin cậy đã tính ở bước trước đó",
        ],
        correct: 1,
        explanation:
          "Đây là định nghĩa hay bị hiểu sai nhất trong thống kê. Giá trị p không phải xác suất giả thuyết đúng hay sai; nó là xác suất của dữ liệu với điều kiện giả thuyết không đúng. Hai điều này khác nhau về bản chất.",
      },
      {
        question: "Sai lầm loại I và loại II khác nhau thế nào?",
        options: [
          "Loại I bác bỏ giả thuyết đúng; loại II giữ lại giả thuyết sai",
          "Loại I là lỗi trong khâu tính toán, còn loại II là lỗi trong khâu thu thập dữ liệu",
          "Loại I chỉ xảy ra với mẫu nhỏ, còn loại II chỉ xảy ra với mẫu lớn",
          "Không có khác biệt thực tế, cả hai đều dẫn tới cùng một kết luận sai",
        ],
        correct: 0,
        explanation:
          "Loại I là báo động giả: kết luận có hiệu ứng khi không có. Loại II là bỏ sót: có hiệu ứng thật mà không phát hiện được. Hạ ngưỡng ý nghĩa làm giảm loại I nhưng làm tăng loại II - luôn là một sự đánh đổi.",
      },
      {
        question: "Vì sao ý nghĩa thống kê không đồng nghĩa với ý nghĩa kinh tế?",
        options: [
          "Vì các phép kiểm định thống kê không tính đến đơn vị tiền tệ của dữ liệu",
          "Vì với mẫu đủ lớn, hiệu ứng cực nhỏ vẫn đạt ý nghĩa thống kê",
          "Vì người làm thống kê thường không hiểu cơ chế vận hành của thị trường",
          "Vì ý nghĩa kinh tế của một hiệu ứng luôn lớn hơn ý nghĩa thống kê của nó",
        ],
        correct: 1,
        explanation:
          "Một chiến lược tạo lợi suất vượt trội 0,05%/tháng có thể có giá trị p rất nhỏ với dữ liệu 50 năm, nhưng sau chi phí giao dịch thì không còn gì. Ngược lại, một hiệu ứng lớn nhưng chỉ quan sát trên 20 điểm dữ liệu có thể rất đáng chú ý dù chưa đạt ngưỡng thống kê.",
      },
      {
        question: "Cách phòng vệ tốt nhất trước p-hacking là gì?",
        options: [
          "Nâng mức ý nghĩa lên 10% để giảm khả năng bỏ sót hiệu ứng thật",
          "Đặt giả thuyết trước, giữ dữ liệu ngoài mẫu, và đếm số lần đã thử",
          "Đưa thêm nhiều biến giải thích vào để mô hình bao quát hơn thực tế",
          "Chỉ dùng dữ liệu của giai đoạn gần nhất vì nó phản ánh thị trường hiện tại",
        ],
        correct: 1,
        explanation:
          "Kiểm chứng ngoài mẫu là hàng rào mạnh nhất: nếu hiệu ứng là thật, nó phải tồn tại trên dữ liệu mà bạn chưa từng dùng để tìm kiếm. Nếu biến mất, gần như chắc chắn bạn chỉ khớp với nhiễu.",
      },
      {
        question: "Một chiến lược có tỷ số Sharpe 1,5 trong backtest 5 năm. Nhận định nào đúng?",
        options: [
          "Chiến lược chắc chắn có giá trị, vì tỷ số Sharpe trên 1 đã là rất tốt",
          "Cần biết đã thử bao nhiêu biến thể và kết quả ngoài mẫu ra sao",
          "Tỷ số Sharpe 1,5 luôn đạt ý nghĩa thống kê với năm năm dữ liệu",
          "Nên tăng đòn bẩy để khuếch đại lợi suất của một chiến lược tốt như vậy",
        ],
        correct: 1,
        explanation:
          "Sharpe của backtest gần như luôn là con số tốt nhất trong nhiều lần thử, nên nó là ước lượng chệch lên trên một cách có hệ thống. Sharpe thực tế sau khi triển khai thường thấp hơn đáng kể - hiện tượng được gọi là suy giảm ngoài mẫu.",
      },
    ],
    keyTakeaways: [
      "Giá trị p là xác suất của dữ liệu khi giả thuyết không đúng, không phải xác suất giả thuyết đúng",
      "Sai lầm loại I là báo động giả, loại II là bỏ sót; giảm cái này luôn làm tăng cái kia",
      "Thử nhiều lần thì kết quả đẹp xuất hiện ngẫu nhiên - giá trị p không hề biết bạn đã thử bao nhiêu lần",
      "Ý nghĩa thống kê khác ý nghĩa kinh tế: luôn hỏi hiệu ứng còn lại bao nhiêu sau chi phí giao dịch",
    ],
    practicePrompt: {
      question:
        "Một nhà cung cấp tín hiệu trình bày backtest với p nhỏ hơn 0,01 và nói kết quả rất khó xảy ra do ngẫu nhiên. Câu hỏi sắc bén nhất bạn nên đặt là gì?",
      options: [
        "Phần mềm nào được dùng để chạy backtest",
        "Đã thử bao nhiêu tổ hợp trước khi chọn",
        "Dữ liệu lấy từ nguồn nào",
        "Chi phí đăng ký dịch vụ là bao nhiêu",
      ],
      correct: 1,
      explanation:
        "Giá trị p chỉ có nghĩa cho một kiểm định được xác định trước. Nếu đây là kết quả tốt nhất trong 500 lần thử, mức ý nghĩa hiệu dụng phải được điều chỉnh mạnh, và p nhỏ hơn 0,01 lúc đó không còn ấn tượng chút nào.",
    },
    summary: {
      keyIdea: "Giá trị p không biết bạn đã thử bao nhiêu lần - còn bạn thì biết",
      formula: "t = (ước lượng − giá trị giả thuyết) / sai số chuẩn",
      commonMistake: "Trình bày kết quả tốt nhất trong nhiều lần thử như thể đó là lần thử duy nhất",
      action: "Với mỗi backtest bạn tự chạy, ghi lại số biến thể đã thử và luôn giữ lại 30% dữ liệu cuối để kiểm chứng.",
    },
    application: {
      title: "Quy tắc trung thực với chính mình",
      message:
        "Trước khi nhìn dữ liệu, hãy viết ra giả thuyết và tiêu chí đánh giá. Sau khi tìm ra kết quả, hãy kiểm chứng trên phần dữ liệu chưa từng chạm tới. Nếu hiệu ứng biến mất ngoài mẫu, hãy chấp nhận rằng nó chưa bao giờ tồn tại.",
      secondary: "Quy tắc thô của giới định lượng: chia đôi tỷ số Sharpe trong backtest để có kỳ vọng thực tế.",
    },
    sections: [
      {
        type: "lead",
        text: "Kiểm định giả thuyết được thiết kế cho thế giới nơi nhà nghiên cứu đặt câu hỏi trước rồi mới thu thập dữ liệu. Tài chính vận hành ngược lại: dữ liệu đã có sẵn hàng chục năm, và hàng nghìn người cùng dò tìm trên đúng tập dữ liệu đó. Hiểu sự lệch pha này quan trọng hơn thuộc lòng bất kỳ công thức nào trong bài.",
      },
      {
        type: "heading",
        text: "Bốn bước của một kiểm định",
      },
      {
        type: "list",
        items: [
          "Bước 1: phát biểu giả thuyết không (thường là không có hiệu ứng) và giả thuyết đối",
          "Bước 2: chọn mức ý nghĩa trước khi nhìn kết quả, thường là 5%",
          "Bước 3: tính thống kê kiểm định, phổ biến nhất là tỷ số t bằng ước lượng chia sai số chuẩn",
          "Bước 4: so với ngưỡng và kết luận - đồng thời ghi lại đây là lần thử thứ mấy",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Sai lầm loại I",
          text: "Kết luận chiến lược có giá trị trong khi nó vô dụng. Hậu quả: mất tiền thật vì tin vào nhiễu.",
        },
        right: {
          label: "Sai lầm loại II",
          text: "Bỏ qua một chiến lược thực sự tốt vì dữ liệu chưa đủ mạnh. Hậu quả: mất cơ hội, nhưng không mất vốn.",
        },
      },
      {
        type: "callout",
        label: "Vì sao đây là vấn đề nghiêm trọng nhất trong đầu tư định lượng",
        text: "Trong y học, thử nghiệm lâm sàng buộc phải đăng ký giả thuyết trước khi thu thập dữ liệu, chính là để chặn việc dò tìm. Trong tài chính không có cơ chế nào tương đương. Vì vậy trách nhiệm hoàn toàn nằm ở người phân tích: giữ dữ liệu ngoài mẫu, đếm số lần thử, và hoài nghi kết quả đẹp của chính mình.",
      },
      {
        type: "closing",
        lines: [
          "Con số ấn tượng nhất trong một backtest thường là con số kém tin cậy nhất, chính vì nó được chọn ra do ấn tượng.",
          "Ba bài tiếp theo chuyển sang công cụ giải thích quan hệ giữa các biến: hồi quy.",
        ],
      },
    ],
  },
  {
    id: 1424,
    slug: "hoi-quy-tuyen-tinh-don-va-beta",
    title: "Định lượng, Bài 4: Hồi quy tuyến tính đơn - beta thực sự đến từ đâu",
    subtitle: "Hệ số góc, R bình phương, phần dư và cách đọc một bảng kết quả hồi quy",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Beta trong CAPM, sai số theo dõi của quỹ, độ nhạy của cổ phiếu với giá dầu - tất cả đều là hệ số hồi quy. Biết đọc một bảng kết quả hồi quy là kỹ năng tối thiểu để không bị thuyết phục bởi một con số vô nghĩa.",
    openingQuestion:
      "Trong hồi quy lợi suất cổ phiếu theo lợi suất thị trường, hệ số góc chính là gì?",
    openingOptions: [
      "Alpha của cổ phiếu",
      "Beta của cổ phiếu",
      "R bình phương",
      "Sai số chuẩn của phần dư",
    ],
    correctOption: 1,
    explanation:
      "Hệ số góc của đường hồi quy lợi suất cổ phiếu theo lợi suất thị trường chính là beta - đo mức nhạy cảm của cổ phiếu với biến động chung của thị trường. Hệ số chặn là alpha, phần lợi suất không giải thích được bởi thị trường. R bình phương cho biết bao nhiêu phần trăm biến động của cổ phiếu được thị trường giải thích, và với một cổ phiếu đơn lẻ con số này thường chỉ khoảng 20 đến 40%.",
    diagram: [
      { label: "Biến độc lập X: lợi suất thị trường", arrow: true },
      { label: "Ước lượng đường thẳng khớp nhất", arrow: true },
      { label: "Hệ số góc = beta, hệ số chặn = alpha", arrow: true },
      { label: "Phần dư = những gì mô hình không giải thích được" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Beta công bố trên các trang dữ liệu",
      description:
        "Hai trang dữ liệu tài chính có thể công bố beta khác nhau đáng kể cho cùng một cổ phiếu, vì họ dùng khoảng thời gian khác nhau (2 năm hay 5 năm), tần suất khác nhau (tuần hay tháng) và chỉ số tham chiếu khác nhau. Beta không phải một hằng số vật lý mà là kết quả của một lựa chọn phương pháp - luôn hỏi con số đó được ước lượng thế nào trước khi đưa vào mô hình định giá.",
    },
    quiz: [
      {
        question: "R bình phương đo lường điều gì?",
        options: [
          "Mức độ chính xác của mô hình khi dự báo trên dữ liệu của tương lai",
          "Tỷ lệ phương sai biến phụ thuộc được giải thích trong mẫu",
          "Xác suất để mô hình hồi quy vừa ước lượng là mô hình đúng về bản chất",
          "Sai số chuẩn của hệ số góc, quy đổi về thang từ 0 đến 1 cho dễ so sánh",
        ],
        correct: 1,
        explanation:
          "R bình phương là thước đo mức độ khớp trong mẫu, không phải thước đo khả năng dự báo. Một mô hình có R bình phương cao vẫn có thể dự báo tệ ngoài mẫu, đặc biệt nếu nó bị khớp quá mức.",
      },
      {
        question: "Vì sao phải nhìn sai số chuẩn của hệ số chứ không chỉ nhìn giá trị hệ số?",
        options: [
          "Vì sai số chuẩn cho biết hệ số có thực sự khác 0 hay không",
          "Vì sai số chuẩn quyết định dấu của hệ số là dương hay âm khi diễn giải",
          "Vì sai số chuẩn có thể dùng thay cho R bình phương khi đánh giá mức khớp",
          "Vì phần mềm thống kê bắt buộc phải báo cáo đồng thời cả hai chỉ số này",
        ],
        correct: 0,
        explanation:
          "Một hệ số luôn có giá trị ước lượng nào đó, kể cả khi quan hệ thật không tồn tại. Tỷ số t bằng hệ số chia sai số chuẩn mới cho biết ta có nên tin vào nó hay không.",
      },
      {
        question: "Phần dư của hồi quy đại diện cho điều gì trong bối cảnh CAPM?",
        options: [
          "Rủi ro hệ thống, tức phần biến động chung của toàn bộ thị trường",
          "Rủi ro riêng của doanh nghiệp, phần có thể đa dạng hóa được",
          "Chi phí vốn chủ sở hữu mà nhà đầu tư đòi hỏi khi nắm giữ cổ phiếu",
          "Sai số đo lường phát sinh từ dữ liệu giá do sở giao dịch công bố",
        ],
        correct: 1,
        explanation:
          "Đây là cầu nối giữa thống kê và lý thuyết danh mục: phần biến động giải thích được bởi thị trường là rủi ro hệ thống, phần dư là rủi ro riêng có thể triệt tiêu bằng đa dạng hóa - và vì vậy không được thị trường trả thêm lợi suất.",
      },
      {
        question: "Tương quan mạnh giữa hai biến có chứng minh quan hệ nhân quả không?",
        options: [
          "Có, miễn là R bình phương của mô hình vượt ngưỡng 0,8",
          "Không - có thể do trùng hợp, do biến thứ ba, hoặc do nhân quả ngược",
          "Có, miễn là giá trị p của hệ số nhỏ hơn ngưỡng 0,01 thông thường",
          "Có, miễn là chuỗi dữ liệu đủ dài để loại trừ khả năng ngẫu nhiên",
        ],
        correct: 1,
        explanation:
          "Không có mức R bình phương hay giá trị p nào biến tương quan thành nhân quả. Trong tài chính, biến thứ ba bị bỏ sót thường là chu kỳ kinh tế - nó khiến rất nhiều cặp biến trông như có quan hệ với nhau.",
      },
    
    {
      "question": "Beta ước lượng từ hồi quy có sai số chuẩn lớn. Điều đó nghĩa là gì trong thực tế?",
      "options": [
        "Con số beta đó không đáng tin để đưa thẳng vào tính chi phí vốn chủ",
        "Cổ phiếu đó có mức biến động cao hơn so với thị trường chung",
        "Mô hình hồi quy đã bỏ sót một biến giải thích quan trọng nào đó",
        "Cần kéo dài thời gian ước lượng cho tới khi hệ số beta bằng một"
      ],
      "correct": 0,
      "explanation": "Beta chỉ là một ước lượng, và ước lượng thì có khoảng tin cậy. Beta 1,2 với sai số chuẩn 0,4 nghĩa là giá trị thật có thể nằm đâu đó giữa 0,4 và 2 - đưa nguyên con số đó vào CAPM là chuyển sự bất định ấy thẳng vào định giá mà không ai nhìn thấy."
    }
    ],
    keyTakeaways: [
      "Beta là hệ số góc của hồi quy lợi suất cổ phiếu theo lợi suất thị trường; alpha là hệ số chặn",
      "Luôn đọc hệ số cùng sai số chuẩn của nó - hệ số không kèm sai số là con số nửa vời",
      "R bình phương đo mức khớp trong mẫu, không đo khả năng dự báo",
      "Beta phụ thuộc vào lựa chọn giai đoạn, tần suất và chỉ số tham chiếu - nó là một ước lượng, không phải hằng số",
    ],
    practicePrompt: {
      question:
        "Hồi quy cho beta = 1,4 với sai số chuẩn 0,6 và R bình phương 0,18. Nên kết luận thế nào?",
      options: [
        "Cổ phiếu rõ ràng biến động mạnh hơn thị trường 40%",
        "Beta ước lượng thiếu chính xác: khoảng tin cậy quá rộng",
        "R bình phương thấp chứng tỏ hồi quy sai phương pháp",
        "Cần thay biến phụ thuộc bằng giá thay vì lợi suất",
      ],
      correct: 1,
      explanation:
        "Khoảng tin cậy xấp xỉ 1,4 cộng trừ 1,96 nhân 0,6. Với khoảng rộng như vậy, việc đưa beta 1,4 vào công thức CAPM để ra một chi phí vốn chính xác đến từng số thập phân là ảo tưởng chính xác. R bình phương 0,18 là bình thường với cổ phiếu đơn lẻ, không phải dấu hiệu sai phương pháp.",
    },
    summary: {
      keyIdea: "Hồi quy cho bạn một con số kèm mức độ không chắc chắn - phải đọc cả hai",
      formula: "R_i = alpha + beta × R_m + e",
      commonMistake: "Đưa beta ước lượng vào CAPM như thể nó chính xác tuyệt đối",
      action: "Chạy hồi quy beta cho một cổ phiếu bằng dữ liệu 3 năm và 5 năm rồi so hai kết quả với nhau.",
    },
    application: {
      title: "Bốn con số cần đọc trong mọi bảng hồi quy",
      message:
        "Hệ số (độ lớn của quan hệ), sai số chuẩn (mức tin cậy), R bình phương (mức giải thích), và số quan sát. Thiếu bất kỳ con số nào trong bốn cái này thì bảng kết quả chưa đủ để kết luận.",
      secondary: "Thêm một bước nữa nếu có thể: vẽ đồ thị phần dư để phát hiện quan hệ phi tuyến bị bỏ sót.",
    },
    sections: [
      {
        type: "lead",
        text: "Hồi quy là công cụ được dùng nhiều nhất trong tài chính ứng dụng, và cũng là công cụ mà người ta dễ dùng sai nhất - vì phần mềm luôn cho ra một kết quả, dù dữ liệu có phù hợp hay không.",
      },
      {
        type: "formula",
        title: "Mô hình thị trường",
        label: "Nền tảng thống kê của CAPM",
        equation: "R_i = alpha + beta × R_m + e",
        variables: [
          { symbol: "R_i", name: "Lợi suất cổ phiếu", description: "Biến phụ thuộc" },
          { symbol: "R_m", name: "Lợi suất thị trường", description: "Biến độc lập" },
          { symbol: "beta", name: "Hệ số góc", description: "Độ nhạy với thị trường - rủi ro hệ thống" },
          { symbol: "alpha", name: "Hệ số chặn", description: "Lợi suất vượt trội không giải thích được bởi thị trường" },
          { symbol: "e", name: "Phần dư", description: "Rủi ro riêng, có thể đa dạng hóa" },
        ],
        example: {
          title: "Đọc kết quả bằng lời",
          calculation: "beta = 1,2 nghĩa là thị trường tăng 1% thì cổ phiếu kỳ vọng tăng 1,2%",
          result: "Nhưng chỉ là kỳ vọng trung bình, không phải quy luật",
          explanation:
            "Với R bình phương 0,3, có tới 70% biến động của cổ phiếu không liên quan gì đến thị trường. Beta mô tả xu hướng trung bình chứ không dự báo được một ngày cụ thể.",
        },
      },
      {
        type: "callout",
        label: "Ảo tưởng chính xác",
        text: "Sai lầm nghề nghiệp phổ biến nhất là lấy beta ước lượng có sai số lớn, đưa vào CAPM, ra chi phí vốn 11,37%, rồi dùng nó chiết khấu dòng tiền 10 năm và báo cáo giá mục tiêu chính xác đến từng đồng. Toàn bộ độ chính xác đó là giả tạo. Cách trung thực hơn: chạy định giá với beta ở hai đầu khoảng tin cậy và trình bày một vùng giá trị.",
      },
      {
          "type": "heading",
          "text": "Đọc kết quả hồi quy cho đúng"
        },
        {
          "type": "paragraph",
          "text": "Ba con số cần nhìn cùng nhau và mỗi con số trả lời một câu khác. Hệ số góc cho biết mức nhạy - beta. Sai số chuẩn của nó cho biết ước lượng đó chắc chắn tới đâu, và đây là phần bị bỏ qua nhiều nhất. R bình phương cho biết bao nhiêu phần biến động được thị trường giải thích, phần còn lại là rủi ro riêng của doanh nghiệp. Một beta 1,2 với sai số chuẩn 0,4 nghĩa là giá trị thật có thể nằm đâu đó rất rộng, và đưa thẳng nó vào CAPM là chuyển toàn bộ sự bất định đó vào định giá mà không ai nhìn thấy."
        },
      {
        type: "closing",
        lines: [
          "Một hệ số hồi quy luôn tồn tại; câu hỏi là nó có đáng tin không.",
          "Bài sau mở rộng sang nhiều biến giải thích - nơi các cạm bẫy nhân lên nhanh chóng.",
        ],
      },
    ],
  },
  {
    id: 1425,
    slug: "hoi-quy-da-bien-va-cac-bay-thuong-gap",
    title: "Định lượng, Bài 5: Hồi quy đa biến và những cái bẫy - đa cộng tuyến, khớp quá mức, biến bị bỏ sót",
    subtitle: "Thêm biến luôn làm mô hình đẹp hơn trong mẫu và thường tệ hơn ngoài mẫu",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🕸️",
    track: "professional",
    whyItMatters:
      "Các mô hình đa nhân tố, mô hình chấm điểm tín dụng và mọi công cụ dự báo trong tài chính đều là hồi quy đa biến. Không biết các cạm bẫy của nó thì bạn sẽ tin vào những mô hình khớp lịch sử hoàn hảo và thất bại ngay lần đầu gặp dữ liệu mới.",
    openingQuestion:
      "Vì sao thêm biến giải thích vào mô hình hầu như luôn làm tăng R bình phương?",
    openingOptions: [
      "Vì biến mới luôn chứa thông tin hữu ích",
      "Vì thêm biến không bao giờ làm khớp kém đi cả",
      "Vì phần mềm tự động loại bỏ biến vô dụng",
      "Vì R bình phương không phụ thuộc vào số biến",
    ],
    correctOption: 1,
    explanation:
      "Đây là tính chất toán học chứ không phải bằng chứng về chất lượng: mô hình luôn có thể gán hệ số 0 cho biến vô dụng, nên mức khớp không thể giảm. Trên dữ liệu hữu hạn nó gần như luôn tăng nhẹ, kể cả với biến ngẫu nhiên. Đó là lý do phải dùng R bình phương hiệu chỉnh, và quan trọng hơn nhiều, phải kiểm chứng ngoài mẫu.",
    diagram: [
      { label: "Thêm biến giải thích", arrow: true },
      { label: "R bình phương trong mẫu luôn tăng", arrow: true },
      { label: "Nhưng phương sai ước lượng cũng tăng", arrow: true },
      { label: "Kết quả: khớp quá mức, dự báo ngoài mẫu tệ đi" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Mô hình rủi ro trước 2008",
      description:
        "Nhiều mô hình định giá chứng khoán bảo đảm bằng thế chấp trước khủng hoảng 2008 được ước lượng trên dữ liệu giai đoạn giá nhà chỉ tăng. Biến quan trọng nhất - khả năng giá nhà giảm đồng loạt trên toàn quốc - không có trong mẫu nên không có trong mô hình. Mô hình khớp lịch sử gần như hoàn hảo và sai hoàn toàn về tương lai, vì lịch sử được dùng để huấn luyện chưa từng chứa kịch bản đó.",
    },
    quiz: [
      {
        question: "Đa cộng tuyến gây ra hậu quả gì?",
        options: [
          "Làm R bình phương của mô hình giảm mạnh so với hồi quy đơn biến",
          "Làm sai số chuẩn phình to, khiến từng hệ số riêng lẻ mất ý nghĩa",
          "Làm mô hình không chạy được và phần mềm sẽ báo lỗi ma trận suy biến",
          "Làm phần dư của mọi quan sát đều bằng 0 nên không kiểm định được nữa",
        ],
        correct: 1,
        explanation:
          "Khi hai biến giải thích tương quan cao, mô hình không thể tách được đóng góp của từng biến. Dấu hiệu điển hình: mô hình tổng thể có ý nghĩa nhưng không hệ số riêng lẻ nào có ý nghĩa, và hệ số đổi dấu khi thêm bớt một biến.",
      },
      {
        question: "Vấn đề biến bị bỏ sót gây ra điều gì?",
        options: [
          "Làm hệ số bị chệch nếu biến bỏ sót tương quan với biến đã đưa vào",
          "Chỉ làm giảm R bình phương chứ không ảnh hưởng gì tới độ chính xác của hệ số",
          "Làm tăng số quan sát tối thiểu cần có để mô hình đạt ý nghĩa thống kê",
          "Không gây hậu quả gì nếu cỡ mẫu đủ lớn để định lý giới hạn trung tâm áp dụng",
        ],
        correct: 0,
        explanation:
          "Đây là dạng sai lệch nguy hiểm nhất vì nó không tự bộc lộ trong bất kỳ chỉ số chẩn đoán nào. Mô hình vẫn trông khỏe mạnh, chỉ có điều hệ số đang thu nhận cả ảnh hưởng của biến bị thiếu.",
      },
      {
        question: "Khớp quá mức (overfitting) biểu hiện thế nào?",
        options: [
          "Khớp rất tốt trong mẫu nhưng dự báo tệ trên dữ liệu mới",
          "Mô hình cho R bình phương thấp trên cả tập huấn luyện lẫn tập kiểm tra",
          "Mô hình chỉ hoạt động được khi có đúng một biến giải thích duy nhất",
          "Mô hình chạy quá chậm vì phải ước lượng quá nhiều tham số cùng lúc",
        ],
        correct: 0,
        explanation:
          "Với đủ số biến, bạn có thể khớp hoàn hảo bất kỳ tập dữ liệu nào - kể cả dữ liệu ngẫu nhiên hoàn toàn. Khoảng cách giữa hiệu suất trong mẫu và ngoài mẫu chính là thước đo mức độ khớp quá mức.",
      },
      {
        question: "Tự tương quan của phần dư trong dữ liệu chuỗi thời gian gây hậu quả gì?",
        options: [
          "Làm các hệ số ước lượng bị chệch một cách nghiêm trọng và có hệ thống",
          "Làm sai số chuẩn bị hạ thấp, khiến kết quả trông đáng tin hơn thực chất",
          "Làm R bình phương của mô hình rơi về 0 dù quan hệ thật vẫn tồn tại",
          "Không gây hậu quả nào đáng kể với dữ liệu tài chính theo chuỗi thời gian",
        ],
        correct: 1,
        explanation:
          "Đây là cạm bẫy rất phổ biến với dữ liệu tài chính theo thời gian. Hệ số vẫn không chệch, nhưng bạn sẽ tự tin hơn mức đáng có. Cách xử lý thông thường là dùng sai số chuẩn vững như Newey-West.",
      },
      {
        question: "Nguyên tắc thực dụng nào giúp tránh khớp quá mức nhất?",
        options: [
          "Đưa vào càng nhiều biến càng tốt để chắc chắn không bỏ sót thông tin nào",
          "Giữ mô hình đơn giản, ưu tiên biến có lý do kinh tế, kiểm chứng ngoài mẫu",
          "Chỉ dùng dữ liệu của năm gần nhất vì nó phản ánh đúng thị trường hiện tại",
          "Nâng mức ý nghĩa lên 20% để giữ lại nhiều biến giải thích hơn trong mô hình",
        ],
        correct: 1,
        explanation:
          "Câu hỏi lọc tốt nhất trước khi đưa một biến vào mô hình: tôi có giải thích được bằng lời vì sao biến này ảnh hưởng đến kết quả không. Nếu không, khả năng cao đó chỉ là tương quan tình cờ trong mẫu.",
      },
    ],
    keyTakeaways: [
      "Thêm biến luôn tăng R bình phương trong mẫu - hãy dùng R bình phương hiệu chỉnh và kiểm chứng ngoài mẫu",
      "Đa cộng tuyến làm hệ số riêng lẻ mất ý nghĩa dù mô hình tổng thể vẫn hoạt động",
      "Biến bị bỏ sót gây chệch mà không có chỉ số chẩn đoán nào phát hiện được",
      "Mọi biến đưa vào mô hình phải có lý do kinh tế giải thích được bằng lời trước khi có bằng chứng thống kê",
    ],
    practicePrompt: {
      question:
        "Một mô hình dự báo lợi nhuận doanh nghiệp có 15 biến giải thích, R bình phương 0,92, xây trên 40 quan sát quý. Vấn đề lớn nhất là gì?",
      options: [
        "R bình phương chưa đủ cao",
        "Số biến quá lớn so với số quan sát, R² là ảo",
        "Nên chuyển sang dữ liệu tháng để có thêm quan sát",
        "Không có vấn đề gì nếu mọi hệ số đều có ý nghĩa",
      ],
      correct: 1,
      explanation:
        "Quy tắc thô là cần ít nhất 10 đến 20 quan sát cho mỗi biến giải thích. Với 40 quan sát, mô hình không nên có quá hai đến bốn biến. Chuyển sang dữ liệu tháng không giải quyết được vì các quan sát tháng có tự tương quan mạnh, nên số quan sát độc lập thực tế không tăng tương ứng.",
    },
    summary: {
      keyIdea: "Mô hình phức tạp hơn luôn khớp lịch sử tốt hơn và thường dự báo tương lai tệ hơn",
      formula: "R² hiệu chỉnh phạt theo số biến; luôn so hiệu suất trong mẫu với ngoài mẫu",
      commonMistake: "Chọn mô hình dựa trên R bình phương thay vì dựa trên hiệu suất ngoài mẫu",
      action: "Lấy một mô hình bạn tin tưởng, cắt 30% dữ liệu cuối ra, ước lượng lại trên 70% và kiểm tra sai số dự báo.",
    },
    application: {
      title: "Bộ lọc trước khi thêm bất kỳ biến nào",
      message:
        "Ba câu hỏi: Có lý do kinh tế nào giải thích quan hệ này không? Biến này có tương quan cao với biến đã có trong mô hình không? Và sau khi thêm nó, hiệu suất ngoài mẫu có cải thiện không? Chỉ ba câu trả lời có mới biện minh cho việc thêm biến.",
      secondary: "Trong thực tế, mô hình ba biến có lý do kinh tế rõ ràng gần như luôn bền hơn mô hình mười lăm biến được chọn bằng thuật toán.",
    },
    sections: [
      {
        type: "lead",
        text: "Hồi quy đa biến hấp dẫn vì nó cho phép nói câu giữ nguyên các yếu tố khác. Nhưng trong tài chính, các yếu tố khác gần như không bao giờ độc lập với nhau, và đó là nơi mọi rắc rối bắt đầu.",
      },
      {
        type: "conceptTable",
        title: "Bốn cạm bẫy phải kiểm tra",
        subtitle: "Mỗi cái phá hỏng mô hình theo một cách khác nhau",
        concepts: [
          { vi: "Đa cộng tuyến", en: "Multicollinearity", def: "Các biến giải thích tương quan cao với nhau. Hệ số riêng lẻ mất ý nghĩa và đổi dấu thất thường, dù dự báo tổng thể có thể vẫn ổn." },
          { vi: "Biến bị bỏ sót", en: "Omitted variable bias", def: "Một yếu tố quan trọng không có trong mô hình nhưng tương quan với biến đã đưa vào, khiến hệ số bị chệch. Nguy hiểm nhất vì không chẩn đoán được." },
          { vi: "Khớp quá mức", en: "Overfitting", def: "Mô hình học cả nhiễu trong mẫu. Biểu hiện: rất tốt trong mẫu, rất tệ ngoài mẫu. Càng nhiều biến trên mỗi quan sát càng nghiêm trọng." },
          { vi: "Tự tương quan", en: "Autocorrelation", def: "Phần dư ở các kỳ liên tiếp liên quan với nhau. Không làm chệch hệ số nhưng làm sai số chuẩn bị hạ thấp, tạo cảm giác tin cậy giả." },
        ],
      },
      {
        type: "heading",
        text: "Vì sao đơn giản lại thắng",
      },
      {
        type: "paragraph",
        text: "Mỗi biến thêm vào tiêu tốn một bậc tự do và mang theo sai số ước lượng riêng. Với dữ liệu tài chính vốn nhiễu và giới hạn về độ dài, chi phí này thường lớn hơn lợi ích thông tin. Đây là lý do các mô hình bền nhất trong thực tế - mô hình ba nhân tố, chấm điểm tín dụng dạng rút gọn - đều rất đơn giản so với thứ mà thuật toán tự động sẽ chọn.",
      },
      {
        type: "callout",
        label: "Quy tắc vàng",
        text: "Lý thuyết kinh tế phải đến trước dữ liệu. Nếu bạn không giải thích được bằng một câu vì sao biến này ảnh hưởng đến kết quả, đừng đưa nó vào mô hình - dù giá trị p có đẹp đến đâu.",
      },
      {
        type: "closing",
        lines: [
          "Mục tiêu của mô hình không phải giải thích quá khứ mà là hữu ích với tương lai.",
          "Bài cuối chặng xử lý loại dữ liệu đặc thù nhất của tài chính: chuỗi thời gian.",
        ],
      },
    ],
  },
  {
    id: 1426,
    slug: "chuoi-thoi-gian-va-kiem-chung-ngoai-mau",
    title: "Định lượng, Bài 6: Chuỗi thời gian và kiểm chứng ngoài mẫu - vì sao backtest luôn đẹp hơn thực tế",
    subtitle: "Tính dừng, tự hồi quy, cụm biến động và các thiên lệch âm thầm phá hỏng mọi backtest",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⏳",
    track: "professional",
    whyItMatters:
      "Dữ liệu tài chính gần như luôn là chuỗi thời gian, và chuỗi thời gian vi phạm hầu hết giả định của thống kê cơ bản. Đây cũng là bài khép lại chặng: nó biến toàn bộ lý thuyết phía trước thành một quy trình kiểm chứng mà bạn có thể áp dụng cho mọi mô hình, của mình hay của người khác.",
    openingQuestion:
      "Vì sao không nên chạy hồi quy trực tiếp trên chuỗi giá cổ phiếu mà nên dùng chuỗi lợi suất?",
    openingOptions: [
      "Vì chuỗi giá thường có quá nhiều điểm dữ liệu để phần mềm xử lý cùng lúc được hết",
      "Vì chuỗi giá không dừng, dẫn tới hồi quy giả tạo giữa hai chuỗi không liên quan",
      "Vì chuỗi giá luôn có giá trị âm",
      "Vì phần mềm không xử lý được chuỗi giá",
    ],
    correctOption: 1,
    explanation:
      "Hai chuỗi không dừng bất kỳ, chẳng hạn giá một cổ phiếu Việt Nam và số lượng ô tô bán ra ở Na Uy, đều có xu hướng tăng theo thời gian nên hồi quy giữa chúng sẽ cho R bình phương cao và hệ số có ý nghĩa thống kê - dù chúng chẳng liên quan gì. Đây gọi là hồi quy giả tạo. Lấy sai phân hoặc chuyển sang lợi suất giúp chuỗi trở nên dừng và loại bỏ phần lớn vấn đề này.",
    diagram: [
      { label: "Chuỗi giá: không dừng", arrow: true },
      { label: "Lấy lợi suất: gần dừng", arrow: true },
      { label: "Kiểm tra tự tương quan và cụm biến động", arrow: true },
      { label: "Kiểm chứng ngoài mẫu theo trình tự thời gian" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Vì sao chiến lược thắng trong backtest lại thua khi triển khai",
      description:
        "Một khảo sát quen thuộc trong ngành: các chiến lược định lượng khi đưa vào vận hành thật thường chỉ đạt khoảng một nửa tỷ số Sharpe của backtest. Nguyên nhân xếp theo mức độ phổ biến là thiên lệch sống sót trong dữ liệu, dùng thông tin chưa có tại thời điểm ra quyết định, bỏ qua chi phí giao dịch và tác động giá, và cuối cùng là dò tìm quá nhiều biến thể trên cùng tập dữ liệu.",
    },
    quiz: [
      {
        question: "Tính dừng của một chuỗi thời gian nghĩa là gì?",
        options: [
          "Chuỗi giữ nguyên giá trị qua các kỳ",
          "Trung bình và phương sai của chuỗi ổn định theo thời gian",
          "Chuỗi có xu hướng tăng đều đặn và không đảo chiều trong dài hạn",
          "Chuỗi không có quan sát nào bị thiếu trong toàn bộ giai đoạn khảo sát",
        ],
        correct: 1,
        explanation:
          "Tính dừng là điều kiện để suy diễn thống kê có nghĩa. Chuỗi giá không dừng, chuỗi lợi suất thì xấp xỉ dừng về trung bình nhưng phương sai vẫn thay đổi theo thời gian.",
      },
      {
        question: "Cụm biến động (volatility clustering) là hiện tượng gì?",
        options: [
          "Nhiều cổ phiếu khác nhau cùng biến động mạnh trong một phiên giao dịch",
          "Ngày biến động mạnh có xu hướng đi liền nhau thành từng cụm",
          "Độ biến động luôn tăng lên vào giai đoạn cuối năm rồi giảm trở lại",
          "Biến động của mọi tài sản hội tụ về 0",
        ],
        correct: 1,
        explanation:
          "Đây là đặc điểm được ghi nhận nhất quán nhất của dữ liệu tài chính và là lý do các mô hình họ GARCH tồn tại. Nó cũng lý giải vì sao độ biến động dự báo được ở mức nào đó, trong khi hướng giá thì không.",
      },
      {
        question: "Thiên lệch sống sót trong dữ liệu backtest là gì?",
        options: [
          "Dữ liệu chỉ còn công ty tồn tại đến hôm nay, đã mất công ty phá sản",
          "Dữ liệu chỉ gồm công ty mới niêm yết",
          "Dữ liệu bị thiếu ngẫu nhiên một số phiên do lỗi của nhà cung cấp dữ liệu",
          "Dữ liệu giá chưa được điều chỉnh cho cổ tức và các đợt chia tách cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Bộ dữ liệu chỉ chứa công ty còn sống hôm nay sẽ khiến mọi chiến lược trông tốt hơn thực tế, vì các khoản đầu tư tệ nhất - những công ty đã biến mất - đã bị loại khỏi mẫu ngay từ đầu.",
      },
      {
        question: "Thiên lệch nhìn trước (look-ahead bias) là gì?",
        options: [
          "Dùng thông tin chưa được công bố tại thời điểm ra quyết định",
          "Dự báo quá xa vào tương lai so với độ dài dữ liệu lịch sử đang có",
          "Dùng dữ liệu ở tần suất quá cao so với chu kỳ giao dịch của chiến lược",
          "Bỏ qua chi phí giao dịch và trượt giá khi tính lợi suất của chiến lược",
        ],
        correct: 0,
        explanation:
          "Đây là lỗi tinh vi và rất phổ biến. Báo cáo tài chính năm thường công bố hai đến ba tháng sau ngày kết thúc năm; dùng nó ở ngày 31/12 nghĩa là chiến lược của bạn đang biết trước tương lai.",
      },
      {
        question: "Cách kiểm chứng ngoài mẫu đúng cho chuỗi thời gian là gì?",
        options: [
          "Chia ngẫu nhiên toàn bộ quan sát thành tập huấn luyện và tập kiểm tra",
          "Chia theo trình tự thời gian: huấn luyện trước, kiểm tra ở giai đoạn sau",
          "Dùng toàn bộ dữ liệu cho cả bước ước lượng lẫn bước kiểm chứng kết quả",
          "Chỉ kiểm tra trên giai đoạn thị trường tăng để đánh giá tiềm năng sinh lời",
        ],
        correct: 1,
        explanation:
          "Chia ngẫu nhiên sẽ để dữ liệu tương lai lọt vào tập huấn luyện, tạo ra thiên lệch nhìn trước tinh vi. Với chuỗi thời gian, ranh giới giữa hai tập luôn phải là một mốc thời gian.",
      },
    ],
    keyTakeaways: [
      "Chuỗi giá không dừng - hồi quy trực tiếp trên giá tạo ra quan hệ giả tạo; hãy dùng lợi suất",
      "Lợi suất tài chính có cụm biến động: biến động dự báo được phần nào, còn hướng giá thì không",
      "Bốn thiên lệch phá hỏng backtest: sống sót, nhìn trước, bỏ qua chi phí giao dịch, và dò tìm quá nhiều",
      "Kiểm chứng ngoài mẫu phải chia theo thời gian, không bao giờ chia ngẫu nhiên",
    ],
    practicePrompt: {
      question:
        "Bạn nhận một backtest có Sharpe 2,0 trên giai đoạn 2015 đến 2024. Ba câu hỏi kiểm tra nào cần đặt trước tiên?",
      options: [
        "Dùng phần mềm gì, máy tính cấu hình ra sao, và ai viết mã",
        "Hủy niêm yết, nhìn trước, và chi phí giao dịch",
        "Chiến lược có tên gọi hấp dẫn không và đã được ai đầu tư chưa",
        "Kết quả năm gần nhất có tốt không",
      ],
      correct: 1,
      explanation:
        "Ba câu này lần lượt kiểm tra thiên lệch sống sót, thiên lệch nhìn trước và chi phí thực hiện - ba nguyên nhân giải thích phần lớn khoảng cách giữa backtest và thực tế. Câu hỏi thứ tư nên là: đã thử bao nhiêu biến thể trước khi chọn ra cái này.",
    },
    summary: {
      keyIdea: "Backtest không phải bằng chứng; nó là giả thuyết cần được kiểm chứng ngoài mẫu",
      formula: "Kiểm tra tính dừng trước, rồi mới hồi quy; chia tập theo thời gian, không theo ngẫu nhiên",
      commonMistake: "Tin vào một backtest đẹp mà không hỏi dữ liệu được xây thế nào",
      action: "Viết ra danh sách bốn thiên lệch và dán nó cạnh màn hình khi đánh giá bất kỳ chiến lược nào.",
    },
    application: {
      title: "Quy trình kiểm chứng bảy bước",
      message:
        "Kiểm tra tính dừng; chuyển sang lợi suất; kiểm tra tự tương quan và cụm biến động; xác định giả thuyết trước; chia tập theo thời gian; trừ chi phí giao dịch thực tế; và cuối cùng ghi lại số biến thể đã thử. Bảy bước này bảo vệ bạn khỏi phần lớn sai lầm định lượng trong nghề.",
      secondary: "Nếu một kết quả chỉ sống sót khi bỏ qua một trong bảy bước trên, nó không phải kết quả.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước giả định các quan sát độc lập với nhau. Dữ liệu tài chính không như vậy: hôm nay phụ thuộc vào hôm qua, biến động đến theo cụm, và chính cấu trúc của thị trường cũng thay đổi qua các thập kỷ. Bài này xử lý phần đó, và khép lại chặng bằng một quy trình kiểm chứng dùng được ngay.",
      },
      {
        type: "heading",
        text: "Ba đặc điểm của chuỗi thời gian tài chính",
      },
      {
        type: "list",
        items: [
          "Không dừng ở mức giá: giá có xu hướng, nên hồi quy giá theo giá tạo ra quan hệ giả tạo với R bình phương rất cao",
          "Tự tương quan yếu ở lợi suất nhưng mạnh ở bình phương lợi suất: hướng giá gần như không dự báo được, còn độ biến động thì có",
          "Cấu trúc thay đổi theo thời gian: quan hệ ước lượng trên giai đoạn lãi suất giảm liên tục có thể không còn đúng khi lãi suất đổi chiều",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Backtest",
          text: "Biết trước toàn bộ lịch sử. Không có trượt giá, không có tác động giá, không có áp lực tâm lý, và được chọn ra từ nhiều lần thử.",
        },
        right: {
          label: "Thực tế",
          text: "Ra quyết định với thông tin có tại thời điểm đó. Có chi phí, có trượt giá, và không có cơ hội chạy lại từ đầu khi kết quả xấu.",
        },
      },
      {
        type: "callout",
        label: "Bốn thiên lệch phải loại bỏ",
        text: "Thiên lệch sống sót (dữ liệu chỉ còn công ty sống sót), thiên lệch nhìn trước (dùng thông tin chưa được công bố ở thời điểm đó), bỏ qua chi phí thực hiện, và dò tìm quá nhiều biến thể. Bốn thứ này giải thích gần như toàn bộ khoảng cách giữa kết quả trên giấy và kết quả thật.",
      },
      {
        type: "closing",
        lines: [
          "Thống kê trong tài chính không phải công cụ để chứng minh mình đúng, mà là kỷ luật để phát hiện mình sai sớm hơn.",
          "Kết thúc chặng: bạn đã có đủ công cụ để đọc, phản biện và tự kiểm chứng bất kỳ con số định lượng nào người khác đưa cho mình.",
        ],
      },
    ],
  },
];
