import type { Lesson } from "./lesson-types";

// Bốn bài nâng Market Risk từ 11 lên 15 - môn 20% Part II, mật độ 0,55 bài
// trên mỗi điểm trọng số trước khi bổ sung.
//
// Tránh chồng lấn: 1551 ba cách tính VaR, 1552 backtesting, 1553 Expected
// Shortfall, 1554 EWMA/GARCH, 1555 copula và phụ thuộc đuôi, 1556 stress test,
// 1289 duration/convexity, 1413 Greeks, 1414 biến động hàm ý, 1635 EVT.
//
// ids 1660-1663, professional track.

export const FRM_MARKET_RISK_DEPTH_LESSONS: Lesson[] = [
  {
    id: 1660,
    slug: "frm-frtb-so-giao-dich",
    title: "Rủi ro TT, Bài 7: FRTB - vẽ lại ranh giới giữa sổ giao dịch và sổ ngân hàng",
    subtitle: "Vì sao Basel phải viết lại toàn bộ khung vốn rủi ro thị trường sau 2008",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📕",
    track: "professional",
    whyItMatters:
      "FRTB là thay đổi lớn nhất của khung vốn rủi ro thị trường trong hai thập kỷ, và nó xuất hiện dày trong đề FRM Part II. Quan trọng hơn, lý do nó ra đời giải thích chính xác những gì đã hỏng năm 2008 - nên hiểu FRTB là hiểu vì sao khung cũ thất bại.",
    openingQuestion:
      "Trước FRTB, vấn đề lớn nhất của ranh giới giữa sổ giao dịch và sổ ngân hàng là gì?",
    openingOptions: [
      "Ranh giới quá chặt khiến ngân hàng không phân loại được sản phẩm mới",
      "Ngân hàng chuyển được vị thế qua lại để hưởng mức vốn thấp hơn",
      "Ranh giới chỉ áp dụng cho ngân hàng có quy mô quốc tế",
      "Hai sổ dùng chung một phương pháp tính vốn nên không phân biệt được",
    ],
    correctOption: 1,
    explanation:
      "Hai sổ có cách tính vốn rất khác nhau, nên nếu ranh giới do ngân hàng tự xác định thì nó trở thành một lựa chọn tối ưu hoá: chuyển vị thế sang bên nào đang rẻ hơn. Trong khủng hoảng, nhiều tổ chức chuyển tài sản kém thanh khoản từ sổ giao dịch sang sổ ngân hàng để thoát khỏi việc phải ghi nhận theo giá thị trường. FRTB vì thế siết ranh giới lại: quy định rõ cái gì thuộc sổ nào, và chuyển qua lại phải được phê duyệt cùng với việc không được giảm vốn nhờ chuyển.",
    diagram: [
      { label: "Ranh giới hai sổ được quy định chặt, chuyển đổi phải xin phép", arrow: true },
      { label: "Thước đo chuyển từ VaR 99% sang Expected Shortfall 97,5%", arrow: true },
      { label: "Chân trời thanh khoản khác nhau theo từng nhóm nhân tố rủi ro", arrow: true },
      { label: "IMA phải qua P&L attribution test ở từng bàn, trượt thì về SA", arrow: false },
    ],
    realWorldExample: {
      company: "Khủng hoảng 2008 và giới hạn của khung cũ",
      description:
        "Khung cũ tính vốn bằng VaR 10 ngày với giả định ngầm rằng mọi vị thế đều thoát được trong mười ngày. Năm 2008 nhiều thị trường đơn giản là không có người mua ở bất kỳ giá nào trong nhiều tuần. FRTB trả lời bằng chân trời thanh khoản phân theo nhóm nhân tố - từ 10 ngày cho tỷ giá lớn tới 120 ngày cho các nhân tố tín dụng kém thanh khoản.",
    },
    quiz: [
      {
        question: "Vì sao FRTB thay VaR 99% bằng Expected Shortfall 97,5%?",
        options: [
          "Vì ES đo được cả phần đuôi vượt ngưỡng, còn VaR im lặng ở đó",
          "Vì ES luôn cho ra con số vốn thấp hơn nên dễ tuân thủ hơn",
          "Vì VaR không tính được cho danh mục có sản phẩm phái sinh",
          "Vì mức 97,5% dễ kiểm định hậu nghiệm hơn mức 99% rất nhiều",
        ],
        correct: 0,
        explanation:
          "VaR chỉ nói ngưỡng, không nói gì về mức lỗ khi đã vượt ngưỡng - đúng vùng quyết định một tổ chức sống hay chết. ES lấy trung bình phần đuôi nên nắm được cả hình dạng vùng đó, và nó cũng là thước đo nhất quán trong khi VaR có thể vi phạm tính cộng dưới.",
      },
      {
        question: "Chân trời thanh khoản trong FRTB nghĩa là gì?",
        options: [
          "Thời gian giả định để thoát một nhân tố, khác nhau theo nhóm",
          "Thời gian tối đa ngân hàng được giữ một vị thế trong sổ giao dịch",
          "Khoảng thời gian dữ liệu lịch sử tối thiểu dùng để hiệu chỉnh mô hình",
          "Số ngày ngân hàng phải báo cáo vị thế cho cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Khung cũ giả định mười ngày cho mọi thứ. FRTB chia theo nhóm nhân tố, từ 10 ngày cho tỷ giá thanh khoản cao tới 120 ngày cho nhân tố tín dụng khó bán - vì bài học 2008 là thanh khoản biến mất không đều nhau giữa các thị trường.",
      },
      {
        question: "P&L attribution test kiểm tra điều gì?",
        options: [
          "Mức khớp giữa lãi lỗ mô hình dự báo và lãi lỗ thực tế",
          "Mức chính xác của việc phân bổ lợi nhuận giữa các bàn giao dịch",
          "Số lần lỗ thực tế vượt ngưỡng VaR trong 250 ngày gần nhất",
          "Tỷ lệ giao dịch được định giá bằng dữ liệu thị trường quan sát được",
        ],
        correct: 0,
        explanation:
          "Nếu mô hình rủi ro của một bàn không giải thích được biến động lãi lỗ thật của chính bàn đó thì nó đang bỏ sót nhân tố nào đó. Bài kiểm tra chạy ở cấp bàn chứ không cấp toàn ngân hàng, và bàn trượt sẽ bị đẩy về phương pháp chuẩn hoá với mức vốn cao hơn.",
      },
      {
        question: "Nhân tố rủi ro không quan sát được (NMRF) bị xử lý thế nào trong FRTB?",
        options: [
          "Tính vốn riêng bằng kịch bản căng thẳng, không gộp vào ES",
          "Loại hoàn toàn khỏi tính toán vì không có dữ liệu đáng tin cậy",
          "Gộp vào ES với trọng số giảm một nửa so với nhân tố thường",
          "Chuyển sang sổ ngân hàng để tránh phải tính vốn thị trường",
        ],
        correct: 0,
        explanation:
          "Nhân tố thiếu dữ liệu giao dịch thật không đủ tin cậy để đưa vào mô hình, nhưng bỏ qua thì rủi ro biến mất khỏi sổ sách. FRTB tách chúng ra và tính vốn bằng kịch bản riêng - thường đắt hơn, tạo động cơ để ngân hàng chỉ giữ những sản phẩm mà mình có dữ liệu thật.",
      },
      {
        question: "Scenario: Một bàn giao dịch trượt P&L attribution test hai quý liên tiếp. Hệ quả là gì?",
        options: [
          "Bàn đó phải về phương pháp chuẩn hoá, thường tốn vốn hơn",
          "Toàn bộ ngân hàng mất quyền dùng mô hình nội bộ ngay lập tức",
          "Bàn đó phải đóng vị thế và ngừng giao dịch cho tới khi khắc phục",
          "Không có hệ quả nào ngoài việc phải giải trình với cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Hệ quả nằm ở cấp bàn chứ không lan ra toàn ngân hàng, và nó là kinh tế chứ không phải cấm đoán: bàn bị đẩy về phương pháp chuẩn hoá, vốn tăng lên. Chính chênh lệch vốn đó là thứ tạo động cơ giữ mô hình cho chuẩn, thay vì một lệnh cấm.",
      },
    ],
    practicePrompt: {
      question:
        "Một bàn giao dịch trượt P&L attribution test hai quý liên tiếp. Theo FRTB thì điều gì xảy ra với bàn đó?",
      options: [
        "Về phương pháp chuẩn hoá, với mức vốn cao hơn đáng kể",
        "Bị đóng cho tới khi mô hình nội bộ được hiệu chỉnh lại xong",
        "Không gì cả, vì bài kiểm tra này chỉ mang tính tham khảo",
        "Toàn ngân hàng mất quyền dùng mô hình nội bộ ở mọi bàn",
      ],
      correct: 0,
      explanation:
        "P&L attribution test so lãi lỗ mô hình rủi ro dự báo với lãi lỗ thật mà hệ thống hạch toán ghi nhận. Lệch quá nhiều nghĩa là mô hình đang mô tả một danh mục khác với danh mục bàn đó thực sự nắm, nên con số rủi ro nó cho ra không dùng được. Hệ quả là bàn đó mất quyền dùng mô hình nội bộ và chuyển sang phương pháp chuẩn hoá, thường tốn vốn hơn hẳn - đó là phần răn đe. Điều đáng chú ý là bài kiểm tra chạy ở CẤP BÀN chứ không cấp ngân hàng: trước FRTB, một mô hình tổng thể có thể qua kiểm định trong khi vài bàn bên trong nó sai hoàn toàn.",
    },
    keyTakeaways: [
      "FRTB siết ranh giới hai sổ vì trước đó ngân hàng chuyển vị thế qua lại để chọn mức vốn rẻ hơn",
      "Thước đo chuyển từ VaR 99% sang Expected Shortfall 97,5% để nắm được phần đuôi",
      "Chân trời thanh khoản chia theo nhóm nhân tố, từ 10 tới 120 ngày, thay cho giả định 10 ngày cho tất cả",
      "P&L attribution test chạy ở cấp bàn; trượt thì bàn đó về phương pháp chuẩn hoá với vốn cao hơn",
    ],
    summary: {
      keyIdea:
        "FRTB là bản trả lời cho từng thứ đã hỏng năm 2008: ranh giới bị lợi dụng, thước đo mù ở phần đuôi, giả định thanh khoản đồng nhất, và mô hình nội bộ không ai kiểm chứng được ở cấp bàn.",
    },
    application: {
      message:
        "Khi đọc thuyết minh vốn rủi ro thị trường của một ngân hàng, tìm xem bao nhiêu bàn đang dùng mô hình nội bộ và bao nhiêu đã rơi về chuẩn hoá. Tỷ lệ đó nói về chất lượng mô hình rõ hơn mọi mô tả bằng lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau 2008, Basel không vá khung vốn rủi ro thị trường mà viết lại. Mỗi thay đổi lớn trong FRTB đều trỏ thẳng vào một thứ đã hỏng - đọc nó như một danh sách nguyên nhân là cách hiểu nhanh nhất.",
      },
      { type: "heading", text: "Ranh giới từng là một lựa chọn" },
      {
        type: "paragraph",
        text: "Sổ giao dịch ghi theo giá thị trường và tính vốn theo rủi ro thị trường; sổ ngân hàng thì không. Khi ngân hàng tự quyết vị thế nằm ở đâu, ranh giới trở thành công cụ tối ưu hoá - và trong khủng hoảng, nhiều tài sản kém thanh khoản đã đi từ sổ giao dịch sang sổ ngân hàng để tránh phải ghi nhận khoản lỗ. FRTB quy định rõ cái gì thuộc bên nào và không cho phép việc chuyển đổi làm giảm vốn.",
      },
      { type: "heading", text: "Thanh khoản không biến mất đều nhau" },
      {
        type: "paragraph",
        text: "Giả định cũ là mười ngày để thoát mọi vị thế. Thực tế 2008 cho thấy tỷ giá của các đồng tiền lớn vẫn giao dịch được trong khi một số thị trường tín dụng không có giá nào suốt nhiều tuần. FRTB thay giả định đồng nhất bằng chân trời thanh khoản theo nhóm nhân tố, dài tới 120 ngày cho những chỗ khó bán nhất.",
      },
      { type: "heading", text: "Mô hình nội bộ phải chứng minh được ở cấp bàn" },
      {
        type: "paragraph",
        text: "Trước đây phê duyệt mô hình nội bộ ở cấp toàn ngân hàng, nên một mô hình yếu ở một bàn có thể ẩn sau kết quả tốt của những bàn khác. FRTB đưa việc kiểm chứng xuống từng bàn: nếu mô hình rủi ro không giải thích được biến động lãi lỗ thật của chính bàn đó, bàn đó mất quyền dùng mô hình nội bộ.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Hệ quả của việc trượt bài kiểm tra là kinh tế chứ không phải cấm đoán: vốn đắt lên. Chênh lệch vốn là thứ tạo động cơ, và nó bền hơn bất kỳ lệnh cấm nào.",
      },
    ],
  },
  {
    id: 1661,
    slug: "frm-key-rate-duration-rui-ro-duong-cong",
    title: "Rủi ro TT, Bài 8: Key rate duration - khi đường cong không dịch song song",
    subtitle: "Một danh mục có duration bằng 0 vẫn có thể lỗ nặng khi đường cong xoay",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📈",
    track: "professional",
    whyItMatters:
      "Duration giả định toàn bộ đường cong dịch lên xuống cùng một lượng. Đường cong thật hiếm khi làm vậy - nó xoay, nó gãy, đầu ngắn và đầu dài đi ngược nhau. Phòng hộ theo duration mà bỏ qua điều đó tạo cảm giác an toàn trong khi rủi ro chỉ đổi hình dạng chứ không mất đi.",
    openingQuestion:
      "Một danh mục mua trái phiếu 2 năm và bán khống trái phiếu 10 năm, tổng duration đúng bằng 0. Rủi ro lớn nhất còn lại là gì?",
    openingOptions: [
      "Không còn rủi ro lãi suất nào vì duration đã bằng 0",
      "Rủi ro đường cong đổi hình dạng, khi đầu ngắn và đầu dài dịch chuyển khác nhau",
      "Rủi ro tín dụng của tổ chức phát hành hai trái phiếu",
      "Rủi ro thanh khoản khi cần đóng vị thế bán khống",
    ],
    correctOption: 1,
    explanation:
      "Duration bằng 0 chỉ nói rằng danh mục miễn nhiễm với dịch chuyển song song. Nếu lãi suất 2 năm tăng 50 điểm trong khi lãi suất 10 năm chỉ tăng 10 điểm - một cú làm phẳng đường cong rất thường gặp - thì hai vế không còn bù nhau và danh mục lỗ. Đây chính là loại rủi ro mà key rate duration được tạo ra để đo: thay vì một con số duy nhất, nó cho biết danh mục nhạy thế nào với từng điểm riêng trên đường cong.",
    diagram: [
      { label: "Duration: giả định cả đường cong dịch cùng một lượng", arrow: true },
      { label: "Thực tế: đường cong dốc lên, phẳng đi, hoặc gãy ở giữa", arrow: true },
      { label: "Key rate duration: đo độ nhạy với từng kỳ hạn chốt riêng", arrow: true },
      { label: "Tổng các key rate duration xấp xỉ bằng duration hiệu dụng", arrow: false },
    ],
    realWorldExample: {
      company: "Danh mục phòng hộ theo duration của một quỹ trái phiếu",
      description:
        "Cách phòng hộ phổ biến là bù duration bằng hợp đồng tương lai trái phiếu, thường neo vào một điểm duy nhất trên đường cong. Khi đường cong xoay, phần phòng hộ dịch theo điểm neo còn danh mục dịch theo phân bố kỳ hạn thật của nó - và khoản lỗ xuất hiện đúng ở chỗ mà báo cáo duration nói rằng rủi ro bằng 0.",
    },
    quiz: [
      {
        question: "Key rate duration đo điều gì mà duration thường không đo được?",
        options: [
          "Độ nhạy của giá với từng điểm kỳ hạn riêng trên đường cong",
          "Độ nhạy của giá với thay đổi trong chênh lệch tín dụng",
          "Mức lồi của quan hệ giữa giá trái phiếu và lợi suất",
          "Tác động của việc tái đầu tư coupon theo lãi suất mới",
        ],
        correct: 0,
        explanation:
          "Duration gộp mọi kỳ hạn thành một con số và ngầm giả định chúng dịch cùng nhau. Key rate duration tách ra thành nhiều con số, mỗi con số cho một điểm chốt - nhờ đó nhìn thấy được danh mục đang nhạy ở đầu ngắn hay đầu dài của đường cong.",
      },
      {
        question: "Scenario: Danh mục có key rate duration +4 ở điểm 2 năm và −4 ở điểm 10 năm. Đường cong phẳng đi, lãi suất 2 năm tăng 40bp còn 10 năm không đổi. Điều gì xảy ra?",
        options: [
          "Danh mục lỗ khoảng 1,6% vì chỉ vế 2 năm bị tác động",
          "Danh mục hoà vốn vì tổng key rate duration bằng 0",
          "Danh mục lãi khoảng 1,6% nhờ vị thế bán khống 10 năm",
          "Không tính được nếu chưa biết convexity của hai vế",
        ],
        correct: 0,
        explanation:
          "Tác động tính riêng cho từng điểm: −4 × 0,40% = −1,6% từ vế 2 năm, và 0 từ vế 10 năm vì lãi suất đó không đổi. Tổng key rate duration bằng 0 chỉ bảo vệ được khi cả hai điểm cùng dịch một lượng, mà đó đúng là điều vừa không xảy ra.",
      },
      {
        question: "Ba dạng dịch chuyển chính của đường cong lợi suất là gì?",
        options: [
          "Dịch song song, thay đổi độ dốc, và thay đổi độ cong",
          "Dịch lên, dịch xuống, và giữ nguyên trong biên độ hẹp",
          "Dịch theo lạm phát, theo tăng trưởng, và theo chính sách tiền tệ",
          "Dịch ngắn hạn, dịch trung hạn, và dịch dài hạn theo kỳ hạn",
        ],
        correct: 0,
        explanation:
          "Phân tích thành phần chính trên dữ liệu đường cong thường cho ra ba thành phần giải thích phần lớn biến động: mức, độ dốc và độ cong. Duration chỉ nắm được thành phần thứ nhất, nên hai thành phần còn lại là phần rủi ro mà một con số duration không nhìn thấy.",
      },
      {
        question: "Vì sao tổng các key rate duration lại xấp xỉ bằng duration hiệu dụng?",
        options: [
          "Vì tất cả các điểm chốt cùng dịch một lượng chính là dịch song song",
          "Vì key rate duration được chuẩn hoá để tổng luôn bằng duration",
          "Vì duration hiệu dụng được tính bằng trung bình các key rate duration",
          "Vì cả hai đều bỏ qua tác động của convexity lên giá trái phiếu",
        ],
        correct: 0,
        explanation:
          "Cộng tất cả các key rate duration lại chính là mô phỏng trường hợp mọi điểm chốt dịch cùng một lượng - đúng định nghĩa của dịch chuyển song song, và đó là thứ duration đo. Mối quan hệ này là một cách kiểm tra nhanh xem bộ key rate duration có được tính đúng hay không.",
      },
      {
        question: "Phòng hộ bằng một hợp đồng tương lai trái phiếu duy nhất có hạn chế gì?",
        options: [
          "Nó chỉ trung hoà dịch song song, không trung hoà xoay đường cong",
          "Nó không áp dụng được cho danh mục có nhiều loại trái phiếu khác nhau",
          "Nó đòi hỏi ký quỹ ban đầu lớn hơn so với dùng hoán đổi lãi suất",
          "Nó chỉ hiệu quả khi danh mục có duration nhỏ hơn 5 năm",
        ],
        correct: 0,
        explanation:
          "Một công cụ neo vào một điểm trên đường cong chỉ bù được rủi ro tại điểm đó. Danh mục trải trên nhiều kỳ hạn cần nhiều công cụ ở nhiều điểm khác nhau - và phần chênh còn lại chính là basis risk của chính phép phòng hộ.",
      },
    ],
    practicePrompt: {
      question:
        "Danh mục có duration hiệu dụng bằng 0, nhưng key rate duration là +6 ở điểm 2 năm và −6 ở điểm 10 năm. Đường cong dốc lên thêm 30 điểm cơ bản ở đầu 10 năm. Điều gì xảy ra?",
      options: [
        "Danh mục lỗ, vì duration 0 chỉ miễn nhiễm với dịch song song",
        "Danh mục hoà vốn, vì duration bằng 0 nghĩa là không có rủi ro",
        "Danh mục lãi, vì vị thế âm ở đầu dài hưởng lợi khi lãi suất tăng",
        "Không xác định được nếu chưa biết convexity của danh mục",
      ],
      correct: 0,
      explanation:
        "Duration hiệu dụng bằng 0 nói đúng một điều: nếu toàn bộ đường cong dịch lên hay xuống cùng một mức thì danh mục không đổi giá trị. Nó không nói gì về trường hợp đường cong XOAY, và đây chính là trường hợp đó - đầu 10 năm tăng 30 điểm trong khi đầu 2 năm đứng yên. Vị thế −6 ở điểm 10 năm nghĩa là mỗi điểm cơ bản tăng ở đó làm danh mục mất tiền, và không có gì bù lại vì đầu 2 năm không nhúc nhích. Đây là rủi ro hình dạng, và duration - dù bằng 0 hay bằng bao nhiêu - mù hoàn toàn với nó.",
    },
    keyTakeaways: [
      "Duration giả định đường cong dịch song song; đường cong thật còn xoay và gãy",
      "Key rate duration đo độ nhạy với từng điểm kỳ hạn riêng, nên nhìn thấy rủi ro hình dạng",
      "Ba thành phần chính của biến động đường cong: mức, độ dốc, độ cong - duration chỉ nắm được thành phần đầu",
      "Tổng các key rate duration xấp xỉ duration hiệu dụng, vì cộng chúng lại chính là mô phỏng dịch song song",
    ],
    summary: {
      keyIdea:
        "Duration bằng 0 không phải là không có rủi ro lãi suất, nó chỉ là không có rủi ro với đúng một loại dịch chuyển. Key rate duration cho thấy phần còn lại.",
    },
    application: {
      message:
        "Khi thấy một báo cáo nói danh mục đã trung hoà duration, hỏi trung hoà ở những điểm kỳ hạn nào. Câu trả lời một điểm duy nhất nghĩa là rủi ro hình dạng đường cong vẫn còn nguyên.",
    },
    sections: [
      {
        type: "lead",
        text: "Một danh mục có duration bằng 0 nghe như đã miễn nhiễm với lãi suất. Nó chỉ miễn nhiễm với đúng một kịch bản - kịch bản mà thị trường hiếm khi thực hiện.",
      },
      { type: "heading", text: "Đường cong không đi thang máy" },
      {
        type: "paragraph",
        text: "Duration đo phản ứng của giá khi toàn bộ đường cong lợi suất dịch lên hoặc xuống cùng một lượng. Trong thực tế, ngân hàng trung ương nâng lãi suất ngắn hạn thì đầu ngắn nhảy trong khi đầu dài có thể đứng yên hoặc thậm chí giảm nếu thị trường tin rằng tăng trưởng sẽ chậm lại. Đó là một cú làm phẳng, và duration không nhìn thấy nó.",
      },
      { type: "heading", text: "Tách một con số thành nhiều con số" },
      {
        type: "paragraph",
        text: "Key rate duration chọn một tập điểm chốt - thường 2, 5, 10, 30 năm - rồi đo riêng phản ứng của danh mục khi chỉ một điểm dịch còn các điểm khác giữ nguyên. Kết quả là một vector thay vì một số, và nó nói được thứ mà một con số không nói: rủi ro đang tập trung ở đầu nào của đường cong.",
      },
      { type: "heading", text: "Mối quan hệ dùng để kiểm tra" },
      {
        type: "paragraph",
        text: "Cộng tất cả key rate duration lại thì được xấp xỉ duration hiệu dụng, vì mọi điểm cùng dịch một lượng chính là định nghĩa của dịch song song. Đây là phép kiểm tra nhanh: nếu tổng lệch xa duration đã tính theo cách khác, một trong hai phép tính có vấn đề.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Phòng hộ bằng một công cụ neo vào một điểm chỉ bù được rủi ro tại điểm đó. Danh mục trải nhiều kỳ hạn cần nhiều công cụ, và phần chênh còn lại là basis risk của chính phép phòng hộ.",
      },
      {
        type: "heading",
        text: "Hai danh mục cùng duration 5, hai kết cục khác nhau"
      },
      {
        type: "paragraph",
        text: "Danh mục A đặt toàn bộ vào trái phiếu 5 năm, duration 5. Danh mục B là barbell: 62,5% vào trái phiếu 2 năm và 37,5% vào trái phiếu 10 năm, cũng cho duration 2 × 0,625 + 10 × 0,375 = 5. Một con số duration duy nhất nói rằng chúng giống nhau. Nếu cả đường cong dịch song song lên 100 điểm cơ bản thì đúng là giống nhau: cả hai mất khoảng 5%."
      },
      {
        type: "callout",
        label: "Nhưng đường cong hiếm khi dịch song song",
        text: "Giả sử đường cong dốc lên: lãi suất 2 năm không đổi, 5 năm tăng 50 điểm cơ bản, 10 năm tăng 100 điểm. Danh mục A mất 5 × 0,50% = 2,5%. Danh mục B mất 0,375 × 10 × 1% = 3,75% - phần 2 năm không mất gì vì lãi suất ở đó đứng yên. Cùng duration, chênh nhau 1,25 điểm phần trăm. Duration tổng không nhìn thấy khác biệt này vì nó gộp mọi kỳ hạn vào một con số."
      },
      {
        type: "paragraph",
        text: "Key rate duration tách con số đó ra theo từng điểm kỳ hạn. Danh mục A có KRD 5 năm bằng 5 và bằng 0 ở mọi điểm khác. Danh mục B có KRD 2 năm bằng 1,25 và KRD 10 năm bằng 3,75. Tổng của các KRD luôn bằng duration tổng - 1,25 + 3,75 = 5 - nên không có thông tin nào bị mất, chỉ có thông tin được tách ra. Và chính vì tổng bằng nhau mà một con số tổng duy nhất che được hoàn toàn hai hồ sơ rủi ro rất khác nhau."
      },
    ],
  },
  {
    id: 1662,
    slug: "frm-anh-xa-vi-the-vao-nhan-to-rui-ro",
    title: "Rủi ro TT, Bài 9: Ánh xạ vị thế vào nhân tố rủi ro",
    subtitle: "Không ai mô hình hoá từng trái phiếu một - và lựa chọn gộp thế nào quyết định con số VaR",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🗂️",
    track: "professional",
    whyItMatters:
      "Trước khi tính được VaR, phải quy hàng nghìn vị thế về một tập nhân tố rủi ro quản lý được. Bước này ít được nói tới nhưng ảnh hưởng tới kết quả mạnh hơn phần lớn lựa chọn kỹ thuật phía sau, vì mọi rủi ro bị gộp mất trong lúc ánh xạ sẽ không bao giờ xuất hiện lại ở đầu ra.",
    openingQuestion:
      "Vì sao không tính VaR trực tiếp trên từng công cụ riêng lẻ trong danh mục?",
    openingOptions: [
      "Vì ma trận hiệp phương sai phình theo bình phương số công cụ",
      "Vì cơ quan quản lý yêu cầu gộp về nhóm nhân tố chuẩn hoá",
      "Vì từng công cụ riêng lẻ không có đủ biến động để tính được VaR",
      "Vì VaR chỉ định nghĩa được ở cấp danh mục chứ không ở cấp công cụ",
    ],
    correctOption: 0,
    explanation:
      "Với n công cụ, ma trận hiệp phương sai cần khoảng n(n+1)/2 tham số. Một nghìn trái phiếu là hơn nửa triệu tham số, và phần lớn các cặp không có đủ lịch sử giao dịch chung để ước lượng đáng tin. Ánh xạ quy các công cụ về một tập nhân tố nhỏ hơn nhiều - vài chục điểm trên đường cong, vài chỉ số cổ phiếu, vài cặp tỷ giá - đủ để ước lượng vững mà vẫn giữ được phần rủi ro quan trọng.",
    diagram: [
      { label: "Hàng nghìn vị thế riêng lẻ trong danh mục", arrow: true },
      { label: "Ánh xạ về tập nhân tố rủi ro chung, số lượng nhỏ hơn nhiều", arrow: true },
      { label: "Ước lượng ma trận hiệp phương sai trên tập nhân tố đó", arrow: true },
      { label: "Rủi ro riêng bị gộp mất phải được xử lý riêng, không được lờ đi", arrow: false },
    ],
    realWorldExample: {
      company: "Ánh xạ dòng tiền của một danh mục trái phiếu",
      description:
        "Cách phổ biến là chẻ mỗi trái phiếu thành các dòng tiền rồi phân bổ mỗi dòng vào hai điểm chốt gần nhất trên đường cong, giữ nguyên giá trị hiện tại và giữ nguyên rủi ro thị trường. Một trái phiếu 7 năm vì thế biến thành một phần ở điểm 5 năm và một phần ở điểm 10 năm - và mọi phân tích sau đó nhìn nó đúng như vậy.",
    },
    quiz: [
      {
        question: "Nguyên tắc chính khi phân bổ một dòng tiền vào hai điểm chốt lân cận là gì?",
        options: [
          "Giữ nguyên giá trị hiện tại và giữ nguyên mức rủi ro thị trường",
          "Chia đều giá trị cho hai điểm chốt gần nhất trên đường cong",
          "Dồn toàn bộ vào điểm chốt có kỳ hạn gần với dòng tiền hơn",
          "Phân bổ theo tỷ trọng thanh khoản của hai điểm chốt đó",
        ],
        correct: 0,
        explanation:
          "Ánh xạ chỉ hợp lệ nếu nó không tạo ra hay làm mất giá trị và không thay đổi mức độ rủi ro. Chia đều hoặc dồn về điểm gần hơn đều vi phạm ít nhất một trong hai điều kiện, và sai lệch đó đi thẳng vào con số VaR cuối cùng.",
      },
      {
        question: "Scenario: Một danh mục có 1.000 công cụ. Ma trận hiệp phương sai đầy đủ cần khoảng bao nhiêu tham số?",
        options: [
          "Khoảng 500.500 (= 1.000 × 1.001 ÷ 2 tham số)",
          "Đúng 1.000, mỗi công cụ một tham số phương sai",
          "Khoảng 2.000, gồm phương sai và trung bình mỗi công cụ",
          "Khoảng 1.000.000 (= 1.000², đếm cả hai chiều ma trận)",
        ],
        correct: 0,
        explanation:
          "Ma trận đối xứng nên chỉ cần nửa trên cộng đường chéo: n(n+1)/2 = 1.000 × 1.001 ÷ 2 ≈ 500.500. Đó là lý do ánh xạ không phải một tuỳ chọn cho gọn mà là điều kiện để bài toán ước lượng được.",
      },
      {
        question: "Rủi ro nào bị mất khi ánh xạ một trái phiếu doanh nghiệp về đường cong chính phủ?",
        options: [
          "Rủi ro chênh lệch tín dụng riêng của tổ chức phát hành đó",
          "Rủi ro lãi suất ở đầu dài của đường cong lợi suất",
          "Rủi ro tái đầu tư các khoản coupon trong tương lai",
          "Rủi ro thanh khoản của toàn bộ thị trường trái phiếu",
        ],
        correct: 0,
        explanation:
          "Ánh xạ về đường cong chính phủ giữ được rủi ro lãi suất nhưng bỏ mất phần chênh lệch tín dụng - đúng phần biến động mạnh nhất trong khủng hoảng. Cách xử lý là thêm nhân tố chênh lệch theo nhóm xếp hạng và ngành, không phải lờ nó đi.",
      },
      {
        question: "Vì sao ánh xạ càng thô thì VaR càng có xu hướng bị ước lượng thấp?",
        options: [
          "Vì gộp vào một nhân tố là ngầm giả định tương quan hoàn hảo",
          "Vì tập nhân tố nhỏ hơn luôn có độ biến động thấp hơn tập lớn",
          "Vì phép ánh xạ luôn làm giảm giá trị hiện tại của danh mục",
          "Vì dữ liệu lịch sử của nhân tố tổng hợp thường ngắn hơn",
        ],
        correct: 0,
        explanation:
          "Khi hai vị thế khác nhau bị quy về cùng một nhân tố, mô hình coi chúng dịch chuyển y hệt nhau - nên phần rủi ro riêng làm chúng lệch nhau biến mất, và các vị thế ngược chiều trông như bù nhau hoàn hảo. Đó là lý do phần rủi ro riêng bị gộp mất phải được cộng lại một cách tường minh.",
      },
      {
        question: "Đánh đổi cốt lõi khi chọn số lượng nhân tố rủi ro là gì?",
        options: [
          "Nhiều nhân tố giữ được nhiều rủi ro nhưng ước lượng kém vững hơn",
          "Nhiều nhân tố luôn cho kết quả chính xác hơn nhưng tốn thời gian tính",
          "Ít nhân tố làm VaR cao hơn nhưng dễ giải thích cho lãnh đạo hơn",
          "Số nhân tố không ảnh hưởng tới kết quả, chỉ ảnh hưởng tới tốc độ",
        ],
        correct: 0,
        explanation:
          "Thêm nhân tố nghĩa là giữ được nhiều chi tiết rủi ro hơn, nhưng cũng nghĩa là phải ước lượng nhiều tham số hơn từ cùng một lượng dữ liệu - và ước lượng nhiễu có thể làm hại nhiều hơn phần chi tiết vừa giữ được. Đây là đánh đổi giữa sai lệch và phương sai, quen thuộc trong mọi bài toán mô hình.",
      },
    ],
    practicePrompt: {
      question:
        "Danh mục trái phiếu doanh nghiệp được ánh xạ toàn bộ về đường cong lợi suất chính phủ. VaR tính ra thấp hơn hẳn mức tổn thất thực tế trong đợt căng thẳng. Vì sao?",
      options: [
        "Chênh lệch tín dụng bị gộp mất và không được cộng lại tường minh",
        "Đường cong chính phủ biến động mạnh hơn đường cong doanh nghiệp",
        "Số nhân tố rủi ro quá nhiều nên ma trận hiệp phương sai kém ổn định",
        "Ánh xạ về đường cong chính phủ luôn làm VaR bị ước lượng quá cao",
      ],
      correct: 0,
      explanation:
        "Ánh xạ về đường cong chính phủ giữ lại rủi ro lãi suất và bỏ mất rủi ro chênh lệch tín dụng - phần chính xác là phần bung ra trong căng thẳng, khi lãi suất chính phủ có thể giảm còn chênh lệch tín dụng thì giãn mạnh. Ánh xạ càng thô thì VaR càng bị ước lượng thấp, vì gộp nhiều vị thế vào cùng một nhân tố ngầm giả định chúng tương quan hoàn hảo và triệt tiêu mất phần rủi ro riêng. Cách xử lý không phải bỏ ánh xạ - không có nó thì 1.000 công cụ cần khoảng nửa triệu tham số hiệp phương sai - mà là cộng lại phần rủi ro riêng một cách tường minh.",
    },
    keyTakeaways: [
      "Ánh xạ là điều kiện để bài toán ước lượng được: n công cụ cần n(n+1)/2 tham số hiệp phương sai",
      "Phân bổ dòng tiền phải giữ nguyên giá trị hiện tại và giữ nguyên mức rủi ro thị trường",
      "Ánh xạ thô làm VaR bị ước lượng thấp, vì nó ngầm giả định các vị thế cùng nhân tố tương quan hoàn hảo",
      "Rủi ro riêng bị gộp mất phải được cộng lại tường minh, không được coi như đã biến mất",
    ],
    summary: {
      keyIdea:
        "Ánh xạ là bước quyết định con số VaR nhiều hơn phần lớn lựa chọn kỹ thuật phía sau, vì rủi ro nào bị gộp mất ở đây thì không bao giờ xuất hiện ở đầu ra.",
    },
    application: {
      message:
        "Khi xem một mô hình VaR, hỏi trái phiếu doanh nghiệp được ánh xạ về đâu. Nếu chỉ về đường cong chính phủ mà không có nhân tố chênh lệch tín dụng, mô hình đang mù đúng phần biến động mạnh nhất trong khủng hoảng.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước mọi công thức VaR có một bước ít ai nói tới: quy hàng nghìn vị thế về một tập nhân tố đủ nhỏ để ước lượng. Lựa chọn ở bước này quyết định con số cuối nhiều hơn cả cách tính.",
      },
      { type: "heading", text: "Vì sao không thể giữ nguyên từng công cụ" },
      {
        type: "paragraph",
        text: "Ma trận hiệp phương sai cho n công cụ cần khoảng n(n+1)/2 tham số. Một nghìn công cụ là hơn nửa triệu con số phải ước lượng, và phần lớn các cặp không có đủ lịch sử giao dịch chung. Kết quả sẽ là một ma trận đầy nhiễu, và nhiễu ở đầu vào thì không có phép tính nào phía sau chữa được.",
      },
      { type: "heading", text: "Hai điều kiện của một phép ánh xạ hợp lệ" },
      {
        type: "paragraph",
        text: "Chẻ một trái phiếu thành các dòng tiền rồi phân bổ vào các điểm chốt lân cận chỉ đúng nếu giữ nguyên hai thứ: giá trị hiện tại và mức rủi ro thị trường. Vi phạm điều thứ nhất là tự tạo ra hoặc làm bốc hơi tiền; vi phạm điều thứ hai là thay đổi chính thứ mình đang đo.",
      },
      { type: "heading", text: "Rủi ro biến mất trong lúc gộp" },
      {
        type: "paragraph",
        text: "Khi hai trái phiếu doanh nghiệp khác nhau cùng được ánh xạ về một điểm trên đường cong chính phủ, mô hình coi chúng là một. Phần làm chúng khác nhau - chênh lệch tín dụng riêng - biến mất, và đó đúng là phần biến động mạnh nhất khi thị trường căng. Phần này phải được đưa lại vào bằng nhân tố riêng chứ không được coi như đã xử lý xong.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Ánh xạ càng thô thì VaR càng thấp, vì gộp là ngầm giả định tương quan hoàn hảo và các vị thế ngược chiều trông như bù nhau trọn vẹn.",
      },
      {
        type: "heading",
        text: "Vì sao bắt buộc phải gộp"
      },
      {
        type: "paragraph",
        text: "Ma trận hiệp phương sai cho n công cụ cần n(n+1)/2 tham số. Với một nghìn công cụ, đó là 500.500 con số phải ước lượng - và ước lượng từ vài trăm ngày dữ liệu. Ma trận thu được gần như chắc chắn không khả nghịch và chứa đầy tương quan giả. Rút về 20 nhân tố rủi ro thì chỉ còn 210 tham số, ước lượng được từ chính bộ dữ liệu đó. Bước ánh xạ không phải một thủ thuật tính toán cho nhanh, nó là điều kiện để bài toán có lời giải."
      },
      {
        type: "callout",
        label: "Hai điều kiện của một phép chẻ hợp lệ",
        text: "Chẻ một trái phiếu 7 năm về hai điểm chốt 5 năm và 10 năm phải giữ nguyên hai đại lượng: giá trị hiện tại và độ nhạy lãi suất. Nếu trái phiếu có duration 6,5 thì trọng số w vào điểm 5 năm giải từ 5w + 10(1 − w) = 6,5, cho w = 0,7 - tức 70% giá trị về chốt 5 năm và 30% về chốt 10 năm. Bỏ điều kiện thứ hai và chỉ chia theo giá trị hiện tại thì VaR sai ngay ở bước đầu, trước khi bất kỳ công thức thống kê nào được áp vào."
      },
      {
        type: "paragraph",
        text: "Điều đáng nhớ nhất là hướng của sai số. Ánh xạ càng thô thì VaR càng THẤP, chứ không phải sai theo hai hướng ngẫu nhiên. Khi hai trái phiếu doanh nghiệp khác nhau cùng được quy về một điểm trên đường cong chính phủ, mô hình ngầm giả định chúng biến động hoàn toàn giống nhau - nên hai vị thế ngược chiều trông như bù nhau trọn vẹn, và phần rủi ro cơ sở giữa chúng biến mất khỏi con số. Đó là lý do chọn tập nhân tố là một quyết định rủi ro, không phải một quyết định kỹ thuật."
      },
    ],
  },
  {
    id: 1663,
    slug: "frm-phan-ra-rui-ro-giua-cac-ban",
    title: "Rủi ro TT, Bài 10: Phân rã rủi ro - vì sao tổng VaR các bàn lớn hơn VaR toàn ngân hàng",
    subtitle: "Marginal, incremental và component VaR - ba câu hỏi khác nhau, ba con số khác nhau",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🧮",
    track: "professional",
    whyItMatters:
      "Khi phải phân bổ vốn hoặc đặt hạn mức cho từng bàn, con số VaR toàn ngân hàng không chia được. Chọn sai cách phân rã sẽ tính phí quá tay cho mọi bàn và trừng phạt đúng những bàn đang mang lại lợi ích đa dạng hoá lớn nhất.",
    openingQuestion:
      "Cộng VaR riêng của từng bàn giao dịch lại thường lớn hơn VaR của toàn ngân hàng. Vì sao?",
    openingOptions: [
      "Vì mỗi bàn tính VaR ở mức tin cậy khác nhau nên không cộng được",
      "Vì phần chênh chính là lợi ích đa dạng hoá giữa các bàn",
      "Vì VaR toàn ngân hàng bỏ sót một số vị thế nhỏ của các bàn",
      "Vì các bàn dùng chân trời thời gian khác nhau khi tính VaR",
    ],
    correctOption: 1,
    explanation:
      "Các bàn không cùng lỗ vào một ngày. Khi bàn trái phiếu lỗ thì bàn tỷ giá có thể lãi, nên tổng danh mục dao động ít hơn tổng dao động của từng phần. Phần chênh giữa tổng VaR riêng lẻ và VaR toàn ngân hàng chính là lợi ích đa dạng hoá đó. Vấn đề thực tế là phần lợi ích này phải được chia lại cho các bàn - nếu tính hạn mức và phí vốn theo VaR riêng lẻ thì mọi bàn đều bị tính quá tay, và tổng phí thu được vượt xa rủi ro thật của ngân hàng.",
    diagram: [
      { label: "Tổng VaR riêng lẻ của các bàn", arrow: true },
      { label: "Trừ đi lợi ích đa dạng hoá giữa các bàn", arrow: true },
      { label: "Bằng VaR của toàn ngân hàng", arrow: true },
      { label: "Component VaR chia phần này lại và cộng đúng bằng tổng thể", arrow: false },
    ],
    interactiveType: "tail-risk",
    realWorldExample: {
      company: "Phân bổ hạn mức giữa các bàn giao dịch",
      description:
        "Một bàn có vị thế ngược chiều với phần còn lại của ngân hàng có thể có VaR riêng lẻ rất lớn mà component VaR gần bằng 0, thậm chí âm. Đo bằng VaR riêng lẻ sẽ ép bàn đó thu hẹp vị thế, và ngân hàng mất đúng thứ đang làm giảm rủi ro tổng thể của mình.",
    },
    quiz: [
      {
        question: "Component VaR khác VaR riêng lẻ ở điểm cốt lõi nào?",
        options: [
          "Component VaR cộng lại đúng bằng VaR toàn danh mục",
          "Component VaR luôn lớn hơn VaR riêng lẻ của cùng một bàn",
          "Component VaR chỉ tính được cho danh mục có ít hơn mười vị thế",
          "Component VaR dùng mức tin cậy cao hơn VaR riêng lẻ",
        ],
        correct: 0,
        explanation:
          "Đây chính là tính chất khiến component VaR dùng được để phân bổ: các phần cộng lại vừa khít tổng thể, nên không có phần rủi ro nào bị tính hai lần hay bỏ sót. VaR riêng lẻ cộng lại thì vượt tổng thể đúng bằng lợi ích đa dạng hoá.",
      },
      {
        question: "Marginal VaR trả lời câu hỏi nào?",
        options: [
          "Thêm một đơn vị vị thế thì VaR danh mục đổi bao nhiêu",
          "Bỏ hẳn vị thế này ra thì VaR danh mục giảm bao nhiêu",
          "Vị thế này đóng góp bao nhiêu phần trăm vào tổng VaR",
          "VaR của riêng vị thế này khi đứng độc lập là bao nhiêu",
        ],
        correct: 0,
        explanation:
          "Marginal VaR là đạo hàm của VaR theo tỷ trọng vị thế - tác động của một thay đổi nhỏ. Câu hỏi bỏ hẳn vị thế ra thuộc về incremental VaR, và với vị thế lớn thì hai con số khác nhau đáng kể vì quan hệ không tuyến tính.",
      },
      {
        question: "Scenario: Một bàn có VaR riêng lẻ 80 tỷ nhưng component VaR chỉ 10 tỷ. Điều đó nói lên gì?",
        options: [
          "Vị thế bàn đó phần lớn bù trừ với phần còn lại của ngân hàng",
          "Bàn đó đang tính VaR sai vì hai con số phải bằng nhau",
          "Bàn đó đóng góp rủi ro lớn nhất trong toàn bộ ngân hàng",
          "Bàn đó có vị thế quá nhỏ để ảnh hưởng tới tổng thể",
        ],
        correct: 0,
        explanation:
          "Bàn dao động mạnh khi đứng riêng nhưng dao động ngược chiều với phần còn lại, nên đóng góp vào rủi ro tổng thể rất nhỏ. Áp hạn mức theo con số 80 tỷ sẽ ép bàn này thu hẹp và làm rủi ro toàn ngân hàng tăng lên chứ không giảm.",
      },
      {
        question: "Vì sao dùng VaR riêng lẻ để tính phí vốn cho từng bàn lại sai?",
        options: [
          "Vì tổng phí thu được sẽ vượt xa mức rủi ro thật của ngân hàng",
          "Vì VaR riêng lẻ không tính được cho bàn mới thành lập",
          "Vì cơ quan quản lý cấm dùng VaR riêng lẻ cho mục đích nội bộ",
          "Vì VaR riêng lẻ luôn thấp hơn mức rủi ro thực của từng bàn",
        ],
        correct: 0,
        explanation:
          "Tổng VaR riêng lẻ lớn hơn VaR toàn ngân hàng, nên thu phí theo đó là thu cho một lượng rủi ro không tồn tại. Nó cũng trừng phạt nặng nhất đúng những bàn mang lại lợi ích đa dạng hoá lớn nhất - tức là tạo động cơ ngược hoàn toàn.",
      },
      {
        question: "Incremental VaR khác marginal VaR ở chỗ nào?",
        options: [
          "Incremental đo việc bỏ hẳn vị thế, marginal đo thay đổi nhỏ",
          "Incremental chỉ áp dụng cho vị thế mới, marginal cho vị thế đã có",
          "Incremental tính theo giá trị tuyệt đối, marginal tính theo phần trăm",
          "Incremental dùng mô phỏng lịch sử, marginal dùng phương pháp tham số",
        ],
        correct: 0,
        explanation:
          "Marginal là đạo hàm, phù hợp cho quyết định điều chỉnh nhỏ. Incremental so hai trạng thái có và không có vị thế, phù hợp cho quyết định nhận hay từ chối cả thương vụ. Với vị thế lớn, ngoại suy từ marginal sẽ sai vì quan hệ không tuyến tính.",
      },
    ],
    practicePrompt: {
      question:
        "VaR toàn ngân hàng là 300 tỷ. Tổng VaR riêng lẻ của sáu bàn cộng lại là 480 tỷ. Nếu tính phí vốn cho từng bàn theo VaR riêng lẻ thì hệ quả là gì?",
      options: [
        "Bàn giảm rủi ro tổng thể bị phạt nặng nhất, dù nó giúp cả nhóm",
        "Phí vốn phân bổ công bằng vì mỗi bàn trả đúng rủi ro của mình",
        "Tổng phí vốn khớp đúng 300 tỷ, chỉ khác cách chia giữa các bàn",
        "Không đo được, vì lợi ích đa dạng hoá không quy về tiền được",
      ],
      correct: 0,
      explanation:
        "Chênh lệch 180 tỷ giữa 480 và 300 chính là lợi ích đa dạng hoá, và tính phí theo VaR riêng lẻ nghĩa là chia một hoá đơn 480 tỷ cho một rủi ro thật 300 tỷ - phần dôi bị đổ lên đầu ai đó. Người chịu nặng nhất là bàn có VaR riêng lẻ lớn nhưng tương quan âm với phần còn lại, tức đúng bàn đang KÉO GIẢM rủi ro toàn hàng. Hạn mức và phí vốn khi đó chống lại chính việc đa dạng hoá. Component VaR sinh ra để chữa điều này: nó cộng lại vừa khít 300 tỷ, nên mỗi bàn trả đúng phần nó đóng góp vào tổng thể chứ không phải phần nó gây ra khi đứng một mình.",
    },
    keyTakeaways: [
      "Tổng VaR riêng lẻ vượt VaR toàn ngân hàng đúng bằng lợi ích đa dạng hoá giữa các bàn",
      "Component VaR cộng lại vừa khít tổng thể, nên nó là thước đo dùng được để phân bổ vốn và hạn mức",
      "Marginal VaR đo thay đổi nhỏ; incremental VaR đo việc bỏ hẳn vị thế - hai câu hỏi khác nhau",
      "Tính phí vốn theo VaR riêng lẻ trừng phạt nặng nhất đúng những bàn đang giảm rủi ro tổng thể",
    ],
    summary: {
      keyIdea:
        "VaR toàn ngân hàng không chia được bằng phép chia. Cách chia đúng phải cộng lại vừa khít tổng thể, nếu không thì hạn mức và phí vốn sẽ chống lại chính việc đa dạng hoá.",
    },
    application: {
      message:
        "Khi thấy hạn mức rủi ro được đặt theo VaR riêng lẻ của từng bàn, hỏi tổng các hạn mức đó so với VaR toàn ngân hàng là bao nhiêu. Chênh lệch chính là phần rủi ro đang bị tính hai lần.",
    },
    sections: [
      {
        type: "lead",
        text: "Cộng VaR của từng bàn lại luôn ra một con số lớn hơn VaR của cả ngân hàng. Đó không phải lỗi tính toán, và cách xử lý phần chênh đó quyết định hạn mức được đặt đúng hay sai.",
      },
      { type: "heading", text: "Phần chênh có tên: đa dạng hoá" },
      {
        type: "paragraph",
        text: "Các bàn không cùng lỗ vào một ngày. Bàn trái phiếu lỗ khi lãi suất tăng, bàn tỷ giá lãi hay lỗ vì lý do khác. Tổng dao động của danh mục vì thế nhỏ hơn tổng dao động từng phần, và khoảng cách ấy chính là lợi ích đa dạng hoá mà ngân hàng có được nhờ hoạt động ở nhiều thị trường.",
      },
      { type: "heading", text: "Ba câu hỏi, ba con số" },
      {
        type: "paragraph",
        text: "VaR riêng lẻ hỏi bàn này rủi ro bao nhiêu nếu đứng một mình. Marginal VaR hỏi thêm một chút vị thế thì tổng đổi bao nhiêu. Incremental VaR hỏi bỏ hẳn bàn này ra thì tổng giảm bao nhiêu. Ba câu hỏi khác nhau nên ba con số khác nhau, và nhầm lẫn giữa chúng là nguồn tranh cãi thường trực khi phân bổ hạn mức.",
      },
      { type: "heading", text: "Thước đo duy nhất cộng lại vừa khít" },
      {
        type: "paragraph",
        text: "Component VaR được xây để có đúng một tính chất: cộng tất cả các thành phần lại thì bằng VaR toàn danh mục. Nhờ đó nó dùng được để chia vốn và chia hạn mức mà không tính hai lần phần nào. Một bàn có vị thế ngược chiều với phần còn lại có thể có component VaR gần bằng 0 dù VaR riêng lẻ rất lớn.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Đặt hạn mức theo VaR riêng lẻ ép chặt nhất đúng những bàn đang làm giảm rủi ro tổng thể - động cơ ngược hoàn toàn với thứ ngân hàng muốn.",
      },
      {
        type: "heading",
        text: "Vì sao tổng lớn hơn, tính bằng số"
      },
      {
        type: "paragraph",
        text: "Hai bàn giao dịch, mỗi bàn có VaR 100. Nếu lợi nhuận của chúng tương quan hoàn toàn - hệ số 1 - thì VaR gộp đúng bằng 200 và không có lợi ích đa dạng hoá nào. Với hệ số tương quan 0,5, VaR gộp là căn bậc hai của (100² + 100² + 2 × 0,5 × 100 × 100), tức 173,2. Với tương quan bằng 0, con số là 141,4. Khoảng cách giữa 200 và VaR gộp thật chính là lợi ích đa dạng hoá: 26,8 ở trường hợp giữa, 58,6 ở trường hợp cuối."
      },
      {
        type: "callout",
        label: "Con số 26,8 đó thuộc về ai",
        text: "Đây mới là câu hỏi khó, và nó không có câu trả lời hiển nhiên. Không bàn nào tự mình tạo ra lợi ích đó - nó sinh ra từ QUAN HỆ giữa hai bàn. Nếu phân bổ đều thì một bàn có vị thế phòng hộ tự nhiên cho bàn kia không được ghi nhận gì thêm. Nếu phân bổ theo VaR biên - mức VaR tổng giảm đi khi bỏ hẳn một bàn ra - thì tổng các phần được phân bổ thường không bằng tổng cần chia, nên vẫn phải điều chỉnh. Đây là lý do việc phân rã rủi ro là một bài toán quản trị chứ không phải một phép chia."
      },
      {
        type: "comparison",
        left: {
          label: "Hạn mức đặt theo VaR độc lập từng bàn",
          text: "Đơn giản và dễ giải thích, nhưng nó thưởng cho việc mỗi bàn tự giảm rủi ro của mình mà không quan tâm tới danh mục tổng. Một bàn mở vị thế phòng hộ cho bàn khác sẽ thấy VaR riêng của mình tăng lên, dù rủi ro toàn ngân hàng giảm - động cơ ngược hoàn toàn."
        },
        right: {
          label: "Hạn mức đặt theo đóng góp vào VaR tổng",
          text: "Khó tính và khó giải thích hơn, nhưng nó đo đúng thứ ngân hàng quan tâm. Một vị thế làm giảm VaR tổng sẽ có đóng góp âm, và người quản lý bàn đó được ghi nhận vì điều đúng đắn họ vừa làm."
        }
      },
    ],
  },
];
