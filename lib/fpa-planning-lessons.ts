import type { Lesson } from "./lesson-types";

// Chặng "Lập kế hoạch tài chính vận hành" (ids 1511-1516, professional track).
//
// Chặng 11 và các bài FP&A rời rạc đã dạy ngân sách là gì, rolling forecast
// là gì, variance là gì - tức là các sản phẩm đầu ra của FP&A. Chặng này lo
// phần trước đó: con số trong ngân sách từ đâu mà có.
//
// Đó là phần chiếm gần hết thời gian thật của một người làm FP&A và gần như
// không xuất hiện trong tài liệu nhập môn: nối chỉ tiêu tài chính về yếu tố
// vận hành, lập kế hoạch nhân sự, dự báo thanh khoản ngắn hạn, dựng kịch bản,
// phân bổ chi phí giữa các phòng ban, và đóng sổ hằng tháng.

export const FPA_PLANNING_LESSONS: Lesson[] = [
  {
    id: 1511,
    interactiveType: "chart",
    slug: "lap-ke-hoach-theo-yeu-to-dan-dat",
    title: "Kế hoạch, Bài 1: Lập kế hoạch theo yếu tố dẫn dắt - thay vì cộng 10% vào số năm ngoái",
    subtitle: "Nối doanh thu và chi phí về các đại lượng vận hành, để khi kế hoạch trượt bạn biết trượt ở đâu",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎛️",
    track: "professional",
    whyItMatters:
      "Ngân sách lập bằng cách nhân số năm ngoái với một tỷ lệ tăng trưởng luôn ra được một con số, nhưng khi thực tế lệch kế hoạch thì không ai giải thích được vì sao. Kế hoạch theo yếu tố dẫn dắt đắt hơn về công sức và trả lại đúng thứ đó: khả năng chỉ ra chỗ trượt.",
    openingQuestion:
      "Vì sao lập ngân sách bằng cách nhân doanh thu năm ngoái với một tỷ lệ tăng trưởng lại là cách làm yếu?",
    openingOptions: [
      "Vì tỷ lệ tăng trưởng quá khứ không bao giờ lặp lại trong tương lai",
      "Vì con số đó không cho biết yếu tố nào gây lệch",
      "Vì cách này vi phạm chuẩn mực kế toán về lập báo cáo",
      "Vì nó luôn cho ra con số thấp hơn thực tế",
    ],
    correctOption: 1,
    explanation:
      "Cả hai cách đều ra một con số, và con số từ cách nhân tỷ lệ đôi khi còn gần thực tế hơn. Khác biệt nằm ở chỗ khác: khi doanh thu hụt 12%, kế hoạch dạng một cục chỉ nói rằng bạn hụt 12%. Kế hoạch tách thành số khách nhân giá trị đơn hàng bình quân nhân tần suất mua cho biết hụt vì ít khách hơn, hay vì khách mua ít hơn - và hai nguyên nhân đó dẫn tới hai hành động hoàn toàn khác nhau.",
    diagram: [
      { label: "Chọn 2-4 yếu tố vận hành thật", arrow: true },
      { label: "Nối chỉ tiêu tài chính về chúng", arrow: true },
      { label: "Giao mỗi yếu tố cho một người", arrow: true },
      { label: "Khi lệch: soi từng yếu tố" },
    ],
    realWorldExample: {
      company: "Chuỗi bán lẻ lập kế hoạch doanh thu",
      description:
        "Cách một cục: doanh thu năm nay 500 tỷ, kế hoạch năm sau 550 tỷ. Cách theo yếu tố: số cửa hàng nhân doanh thu bình quân mỗi cửa hàng mỗi tháng nhân 12, trong đó doanh thu mỗi cửa hàng lại tách thành lượt khách nhân tỷ lệ mua nhân giá trị hóa đơn bình quân. Cuối quý hai, doanh thu hụt kế hoạch 8%. Bản một cục chỉ nói con số. Bản theo yếu tố cho thấy lượt khách vượt kế hoạch nhưng giá trị hóa đơn giảm - vấn đề nằm ở cơ cấu hàng bán chứ không phải ở marketing, và ngân sách marketing suýt bị cắt nhầm.",
    },
    quiz: [
      {
        question: "Yếu tố dẫn dắt tốt cần có đặc điểm gì?",
        options: [
          "Có người trong tổ chức thực sự tác động được lên nó và chịu trách nhiệm về nó",
          "Được đo bằng đơn vị tiền tệ để có thể cộng thẳng vào các dòng của báo cáo tài chính",
          "Có dữ liệu lịch sử ít nhất năm năm để mô hình dự báo đủ tin cậy",
          "Do phòng tài chính tự tính ra mà không cần số liệu từ bộ phận vận hành",
        ],
        correct: 0,
        explanation:
          "Một yếu tố không ai tác động được thì chỉ là chỉ số quan sát, không phải cần gạt. Ngân sách xây trên đó vẫn đẹp trên giấy nhưng không dẫn tới hành động nào.",
      },
      {
        question: "Nên chọn bao nhiêu yếu tố dẫn dắt cho một dòng doanh thu?",
        options: [
          "Càng nhiều càng tốt, vì mỗi yếu tố được thêm vào đều làm cho mô hình chính xác hơn trước",
          "Hai đến bốn, đủ để tách nguyên nhân mà vẫn còn dò được khi số liệu lệch kế hoạch",
          "Đúng một, để tránh mọi rủi ro nhầm lẫn khi các yếu tố tác động lẫn nhau",
          "Bằng đúng số phòng ban tham gia vào quá trình tạo ra dòng doanh thu đó",
        ],
        correct: 1,
        explanation:
          "Mười yếu tố nghe chặt chẽ hơn nhưng lại không dò được: khi kết quả lệch, bạn có mười nghi phạm và không đủ dữ liệu để phân xử giữa chúng.",
      },
      {
        question: "Kế hoạch theo yếu tố dẫn dắt giúp gì cho phân tích variance?",
        options: [
          "Nó loại bỏ hoàn toàn chênh lệch giữa số thực tế và số kế hoạch đã lập từ đầu kỳ",
          "Nó tách chênh lệch tổng thành chênh lệch của từng yếu tố, nên chỉ ra được nguyên nhân",
          "Nó cho phép cập nhật lại kế hoạch mỗi tháng mà không phải xin phê duyệt lại từ đầu",
          "Nó làm cho báo cáo variance ngắn hơn vì chỉ còn một dòng tổng hợp duy nhất",
        ],
        correct: 1,
        explanation:
          "Đây chính là mối liên hệ với bài phân tích variance ở chặng Kỹ sư trưởng & Vận hành: variance chỉ hữu ích khi tách được ra thành phần, và tách được hay không là do cấu trúc kế hoạch quyết định từ đầu.",
      },
      {
        question: "Rủi ro lớn nhất khi chuyển sang lập kế hoạch theo yếu tố dẫn dắt là gì?",
        options: [
          "Mô hình trở nên phức tạp tới mức không ai ngoài người dựng nó hiểu và kiểm tra được",
          "Kết quả dự báo sẽ luôn lạc quan hơn hẳn so với cách lập kế hoạch truyền thống trước đây",
          "Phòng tài chính mất quyền kiểm soát ngân sách vào tay các bộ phận vận hành",
          "Số liệu vận hành thường không được kiểm toán nên không dùng trong kế hoạch được",
        ],
        correct: 0,
        explanation:
          "Một mô hình chỉ một người hiểu là một rủi ro vận hành. Giới hạn số yếu tố và ghi rõ định nghĩa từng yếu tố là cách giữ cho nó vẫn kiểm tra được bởi người khác.",
      },
    
    {
      "question": "Doanh thu tách thành số cửa hàng × lượt khách mỗi cửa hàng × giá trị đơn. Lượt khách giảm 5%, giá trị đơn tăng 4%, số cửa hàng giữ nguyên - doanh thu đổi bao nhiêu?",
      "options": [
        "Giảm 1,2% (= 0,95 × 1,04 − 1, nhân hai tỷ lệ)",
        "Giảm 1% (= 5% − 4%, trừ thẳng hai tỷ lệ)",
        "Giảm 9% (= 5% + 4%, cộng hai thay đổi lại)",
        "Tăng 1,2% (= 0,95 × 1,04 − 1, đảo dấu kết quả)"
      ],
      "correct": 0,
      "explanation": "Các yếu tố dẫn dắt nhân với nhau chứ không cộng, nên phần trăm cũng phải nhân: 0,95 × 1,04 = 0,988, tức giảm 1,2%. Đây cũng là chỗ cách lập kế hoạch này trả công: biết doanh thu hụt 1,2% là vì lượt khách chứ không phải vì giá, nên biết phải sửa cái gì."
    }
    ],
    keyTakeaways: [
      "Giá trị của kế hoạch theo yếu tố không nằm ở độ chính xác, mà ở khả năng chỉ ra chỗ trượt",
      "Yếu tố dẫn dắt phải có người tác động được và chịu trách nhiệm - nếu không, nó chỉ là chỉ số quan sát",
      "Hai đến bốn yếu tố mỗi dòng: nhiều hơn thì không dò được nữa",
      "Cấu trúc kế hoạch quyết định phân tích variance sau này tách được đến đâu",
    ],
    practicePrompt: {
      question:
        "Doanh thu quý hụt 8% so với kế hoạch. Kế hoạch được lập dạng một cục. Bạn có thể kết luận gì?",
      options: [
        "Bộ phận bán hàng đã không hoàn thành nhiệm vụ",
        "Chỉ biết là hụt 8% - không đủ dữ liệu để nói nguyên nhân nằm ở đâu",
        "Thị trường đang suy giảm",
        "Kế hoạch ban đầu đặt quá cao",
      ],
      correct: 1,
      explanation:
        "Ba lựa chọn còn lại đều là những kết luận rất hay được nói ra trong phòng họp, và không cái nào được số liệu chống đỡ. Đây là cái giá thật của kế hoạch một cục: nó buộc cuộc thảo luận chuyển từ dữ liệu sang phỏng đoán, và người nói to nhất thường thắng.",
    },
    summary: {
      keyIdea: "Kế hoạch tồn tại để khi lệch thì biết lệch ở đâu, không phải để đoán trúng con số",
      commonMistake: "Nhân số năm ngoái với một tỷ lệ rồi coi đó là ngân sách",
      action: "Lấy dòng doanh thu lớn nhất của bạn và tách nó thành tích của hai đến ba đại lượng vận hành đo được.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Với mỗi yếu tố bạn vừa tách ra, trả lời hai câu: ai trong tổ chức tác động được lên nó, và số liệu thực tế của nó lấy từ hệ thống nào. Yếu tố nào không trả lời được cả hai thì chưa dùng làm cần gạt kế hoạch được.",
      secondary: "Câu thứ hai hay bị bỏ qua, và nó là lý do nhiều mô hình đẹp không bao giờ đối chiếu được với thực tế.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng Kỹ sư trưởng & Vận hành đã dạy ngân sách, rolling forecast và phân tích variance - tức là các sản phẩm đầu ra của FP&A. Chặng này lo phần đứng trước: những con số trong ngân sách ấy từ đâu mà có.",
      },
      {
        type: "heading",
        text: "Hai cách lập cùng một dòng ngân sách",
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch một cục",
          text: "Doanh thu năm sau = doanh thu năm nay × 1,1. Nhanh, dễ được duyệt, và khi lệch thì chỉ nói được rằng đã lệch. Mọi cuộc thảo luận sau đó dựa vào phỏng đoán.",
        },
        right: {
          label: "Kế hoạch theo yếu tố",
          text: "Doanh thu = số khách × tần suất mua × giá trị đơn bình quân. Tốn công hơn, cần số liệu từ vận hành, và khi lệch thì chỉ thẳng vào yếu tố nào lệch.",
        },
      },
      {
        type: "conceptTable",
        title: "Ba câu hỏi sàng lọc một yếu tố dẫn dắt",
        subtitle: "Trượt câu nào cũng nghĩa là yếu tố đó chưa dùng được",
        concepts: [
          { vi: "Có tác động được không", en: "Controllable", def: "Phải có người trong tổ chức thay đổi được nó. Tỷ giá và lãi suất là biến số quan trọng nhưng không phải cần gạt kế hoạch." },
          { vi: "Có đo được không", en: "Measurable", def: "Phải có hệ thống nào đó ghi lại số thực tế, nếu không thì cuối kỳ không đối chiếu được và kế hoạch trở thành một lời hứa." },
          { vi: "Có ai chịu trách nhiệm không", en: "Owned", def: "Một yếu tố không thuộc về ai sẽ không ai theo dõi. Đây là điều kiện tổ chức, không phải điều kiện kỹ thuật." },
        ],
      },
      {
        type: "callout",
        label: "Đừng nhầm chi tiết với chính xác",
        text: "Một mô hình mười lăm yếu tố trông nghiêm túc hơn hẳn mô hình ba yếu tố, nhưng thêm yếu tố là thêm giả định, và mỗi giả định là một chỗ có thể sai. Quan trọng hơn: khi kết quả lệch, mười lăm nghi phạm thì không phân xử được. Giới hạn ở số yếu tố mà bạn thực sự có dữ liệu thực tế để đối chiếu từng cái.",
      },
      {
        type: "closing",
        lines: [
          "Ngân sách tốt không phải ngân sách đoán trúng, mà là ngân sách giải thích được vì sao đoán trượt.",
          "Bài sau đi vào dòng chi phí lớn nhất và khó đảo ngược nhất của phần lớn doanh nghiệp: con người.",
        ],
      },
    ],
  },
  {
    id: 1512,
    slug: "ke-hoach-nhan-su-cho-doi-ky-thuat",
    title: "Kế hoạch, Bài 2: Kế hoạch nhân sự - khoản cam kết lớn nhất và khó đảo ngược nhất",
    subtitle: "Vì sao phải lập theo từng vị trí và tháng vào làm, chứ không phải một con số cho cả năm",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "professional",
    whyItMatters:
      "Người là khoản lớn nhất trong gần như mọi kế hoạch kỹ thuật và cũng là khoản chậm nhất để điều chỉnh theo cả hai chiều. Lập nó bằng một con số tổng cho cả năm là cách chắc chắn để kế hoạch sai ngay từ quý đầu.",
    openingQuestion: "Vì sao kế hoạch nhân sự phải lập theo từng vị trí và tháng vào làm?",
    openingOptions: [
      "Vì một người vào tháng Ba và một người vào tháng Mười đóng góp rất khác nhau",
      "Vì cần biết chính xác chi phí lương để lập ngân sách cho từng quý trong năm",
      "Vì mỗi vị trí có mức lương khác nhau nên tổng chi phí phụ thuộc vào cơ cấu",
      "Vì việc tuyển dụng cần được phân bổ đều để bộ phận nhân sự xử lý kịp"
    ],
    correctOption: 0,
    explanation:
      "Một con số tổng cho cả năm ngầm giả định rằng năng lực có ngay từ đầu năm, và điều đó không bao giờ đúng. Từ lúc duyệt tới lúc có người ngồi vào chỗ thường mất vài tháng, và từ lúc đó tới lúc người ấy làm việc độc lập thì mất vài tháng nữa. Một vị trí được duyệt vào tháng Ba có thể đóng góp được nửa năm; cùng vị trí ấy duyệt vào tháng Mười thì đóng góp gần bằng không cho năm đó, dù chi phí vẫn phát sinh. Lập theo từng vị trí kèm tháng dự kiến vào làm là cách duy nhất để con số năng lực trong kế hoạch phản ánh thứ thật sự có.",
    diagram: [
      { label: "Duyệt vị trí", arrow: true },
      { label: "Tuyển: vài tháng, không do bạn kiểm soát", arrow: true },
      { label: "Vào làm rồi cần thêm vài tháng để tự chủ", arrow: true },
      { label: "Năng lực thật đến muộn hơn nhiều so với ngày duyệt" }
    ],
    realWorldExample: {
      company: "Sáu vị trí, một con số",
      description:
        "Một kế hoạch năm ghi tăng sáu người và chia đều năng lực cho bốn quý. Thực tế: hai vị trí tuyển được vào quý hai, ba vào quý ba, một không tuyển được. Cộng thêm thời gian để mỗi người tự làm được việc, năng lực thật của năm đó bằng khoảng một phần ba con số trong kế hoạch - và mọi cam kết về tiến độ đều dựa trên con số kia."
    },
    quiz: [
      {
        question: "Người mới cần bao lâu để đóng góp ở mức của người đang có?",
        options: [
          "Vài tháng, và trong khoảng đó họ còn lấy thời gian của người khác",
          "Khoảng một tháng nếu quy trình tiếp nhận được chuẩn bị tốt",
          "Phụ thuộc hoàn toàn vào kinh nghiệm trước đó của người được tuyển",
          "Khoảng hai tuần với những vị trí không đòi hỏi hiểu biết sâu về hệ thống"
        ],
        correct: 0,
        explanation:
          "Vế thứ hai là vế hay bị bỏ nhất: trong vài tháng đầu, một người mới không chỉ đóng góp ít mà còn tiêu thời gian của người kèm. Nghĩa là năng lực của đội giảm trước khi tăng, đúng hình dạng đường cong chữ J - và kế hoạch nào cũng vẽ nó thành một đường thẳng đi lên."
      },
      {
        question: "Vì sao kế hoạch nhân sự khó đảo ngược hơn các khoản khác?",
        options: [
          "Vì cắt giảm gây tổn hại kéo dài, còn dừng một dự án thì không",
          "Vì cam kết với người lao động ràng buộc pháp lý",
          "Vì chi phí tuyển và đào tạo không thu lại được",
          "Vì tuyển lại sau này tốn hơn giữ người"
        ],
        correct: 0,
        explanation:
          "Ba lý do kia đều là chi phí đo được. Điều làm nó khác hẳn mọi khoản khác là tổn hại lan ra ngoài phạm vi quyết định: những người ở lại đọc tín hiệu đó, và một số người giỏi nhất bắt đầu tìm chỗ khác - phần thiệt hại ấy không có trong bảng nào và thường lớn hơn khoản tiết kiệm được."
      },
      {
        question: "Kế hoạch nên xử lý thế nào với vị trí không tuyển được?",
        options: [
          "Coi là kịch bản bình thường và có phương án cho phần việc đó",
          "Kéo dài thời gian tuyển dụng và hạ bớt yêu cầu cho tới khi tuyển được",
          "Chuyển ngân sách của vị trí đó sang các hạng mục khác trong kế hoạch",
          "Ghi nhận là rủi ro và báo cáo lại khi tình hình chưa được cải thiện"
        ],
        correct: 0,
        explanation:
          "Với các vị trí khó, tỷ lệ tuyển được trong một quý thường thấp hơn nhiều so với giả định trong kế hoạch, nên đây là kịch bản thường gặp chứ không phải rủi ro hiếm. Kế hoạch không có phương án cho nó sẽ trượt vào đúng phần việc mà vị trí ấy được duyệt để làm."
      },
      {
        question: "Thêm người vào một dự án đang chậm có tác dụng gì?",
        options: [
          "Thường làm nó chậm thêm trong ngắn hạn vì người cũ phải dừng lại để kèm",
          "Giúp rút ngắn tiến độ nếu chia nhỏ được việc",
          "Không đổi đáng kể vì hai phần bù nhau",
          "Phụ thuộc giai đoạn và độ phức tạp còn lại"
        ],
        correct: 0,
        explanation:
          "Thời gian kèm được lấy từ chính những người đang làm phần khó nhất, nên năng lực hiệu dụng giảm ngay lập tức và chỉ hồi lại sau vài tháng. Với một dự án đang chậm thì vài tháng ấy thường dài hơn phần thời gian còn lại của chính dự án."
      },
      {
        question: "Con số nào nên xuất hiện trong kế hoạch bên cạnh số người?",
        options: [
          "Tháng dự kiến vào làm và tháng dự kiến làm việc độc lập được",
          "Mức lương dự kiến của từng vị trí để tính tổng chi phí cho cả năm",
          "Nguồn tuyển dụng dự kiến và thời gian trung bình để tuyển từng vị trí",
          "Tỷ lệ nghỉ việc dự kiến để tính số vị trí cần tuyển thay thế trong kỳ"
        ],
        correct: 0,
        explanation:
          "Hai con số này chuyển kế hoạch từ đếm đầu người sang đếm năng lực theo thời gian, và chúng là hai con số duy nhất mà mọi cam kết về tiến độ thật sự phụ thuộc vào. Ba phương án kia đều cần cho ngân sách và không cho biết bao giờ có người làm được việc."
      }
    ],
    practicePrompt: {
      question:
        "Kế hoạch năm của bạn ghi tăng bốn người. Cần bổ sung gì để nó dùng được cho cam kết tiến độ?",
      options: [
        "Tháng dự kiến vào làm của từng vị trí, và tháng họ tự chủ được",
        "Mức lương và tổng chi phí nhân sự tăng thêm trong từng quý của năm",
        "Mô tả công việc chi tiết của từng vị trí để bắt đầu quá trình tuyển dụng",
        "Thứ tự ưu tiên giữa bốn vị trí trong trường hợp ngân sách bị cắt giảm"
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều cần và đều phục vụ những câu hỏi khác. Với cam kết tiến độ, câu hỏi duy nhất là bao giờ có năng lực thật - và một con số bốn người không trả lời được nó, kể cả khi cả bốn đều được duyệt."
    },
    keyTakeaways: [
      "Một con số tổng cả năm ngầm giả định năng lực có ngay từ đầu năm",
      "Người mới làm năng lực đội giảm trước khi tăng, đúng hình chữ J",
      "Không tuyển được là kịch bản thường gặp, không phải rủi ro hiếm",
      "Tổn hại của việc cắt giảm lan ra ngoài phạm vi quyết định và không có trong bảng nào"
    ],
    summary: {
      keyIdea: "Kế hoạch nhân sự phải đếm năng lực theo thời gian, không đếm đầu người theo năm",
      commonMistake: "Cam kết tiến độ dựa trên số vị trí được duyệt, trong khi năng lực thật đến muộn hơn nhiều tháng",
      action: "Với mỗi vị trí, ghi tháng dự kiến vào làm và tháng dự kiến làm việc độc lập được."
    },
    application: {
      title: "Hai cột thay cho một con số",
      message:
        "Bảng nhân sự có một dòng cho mỗi vị trí, kèm tháng dự kiến vào làm và tháng tự chủ được. Tổng năng lực của năm tính từ hai cột đó, không từ số dòng.",
      secondary:
        "Thêm một dòng cho kịch bản không tuyển được vị trí khó nhất - đó là kịch bản thường gặp chứ không phải rủi ro hiếm."
    },
    sections: [
      {
        type: "lead",
        text: "Người là khoản lớn nhất trong gần như mọi kế hoạch kỹ thuật, và là khoản chậm nhất để điều chỉnh theo cả hai chiều."
      },
      { type: "heading", text: "Từ ngày duyệt tới ngày có năng lực" },
      {
        type: "paragraph",
        text: "Giữa lúc một vị trí được duyệt và lúc có người làm được việc độc lập có hai khoảng trễ chồng lên nhau: thời gian tuyển, phần lớn nằm ngoài tầm kiểm soát của bạn, và thời gian để người mới tự chủ. Cộng lại, một vị trí duyệt đầu năm thường chỉ đóng góp được nửa năm, và một vị trí duyệt vào quý cuối thì đóng góp gần bằng không cho năm đó."
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch đếm đầu người",
          text: "Tăng bốn người trong năm. Năng lực được chia đều bốn quý, và mọi cam kết tiến độ được xây trên con số đó."
        },
        right: {
          label: "Kế hoạch đếm năng lực",
          text: "Bốn dòng, mỗi dòng có tháng vào làm và tháng tự chủ. Tổng năng lực thật của năm thường bằng một phần ba tới một nửa con số bên trái."
        }
      },
      {
        type: "list",
        items: [
          "Một dòng cho mỗi vị trí, không phải một con số cho cả năm",
          "Ghi tháng dự kiến vào làm và tháng dự kiến tự chủ được",
          "Năng lực giảm trước khi tăng, vì người kèm phải dừng việc của họ",
          "Có sẵn phương án cho vị trí khó nhất không tuyển được"
        ]
      },
      {
        type: "callout",
        label: "Cắt giảm không đối xứng với tuyển thêm",
        text: "Tăng một người thì năng lực tăng sau vài tháng. Cắt một người thì năng lực giảm ngay, và phần thiệt hại lớn hơn nằm ở chỗ những người ở lại đọc tín hiệu đó - một số người giỏi nhất bắt đầu tìm chỗ khác trong vài tháng sau. Khoản ấy không xuất hiện trong bảng tính nào và thường vượt xa phần tiết kiệm được."
      },
      {
        type: "closing",
        lines: [
          "Kế hoạch nhân sự là nơi duy nhất mà một con số đúng vẫn dẫn tới một cam kết sai.",
          "Bài sau: công cụ dùng khi kế hoạch năm đã không còn khớp với thực tế."
        ]
      }
    ]
  },
  {
    "id": 1513,
    "slug": "lich-phat-hanh-13-tuan",
    "title": "Kế hoạch, Bài 3: Lịch phát hành 13 tuần - công cụ dùng khi kế hoạch quý đã lỗi thời",
    "subtitle": "Một quý là quá dài để lập kế hoạch chi tiết và quá ngắn để không lập gì cả.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📅",
    "whyItMatters": "Kế hoạch quý được lập một lần rồi treo trên tường, còn công việc thì đổi mỗi tuần - và khoảng cách giữa hai thứ đó lớn dần cho tới khi không ai nhìn kế hoạch nữa.",
    "openingQuestion": "Vì sao lịch mười ba tuần lại là công cụ khác với kế hoạch quý?",
    "openingOptions": [
      "Vì nó được cập nhật lại mỗi tuần và luôn nhìn về phía trước mười ba tuần",
      "Vì nó chi tiết hơn hẳn nên rốt cuộc phản ánh chính xác hơn khối lượng công việc thật",
      "Vì nó tính theo tuần nên khớp với chu kỳ làm việc của phần lớn đội",
      "Vì nó bao gồm cả những công việc không nằm trong kế hoạch quý ban đầu"
    ],
    "correctOption": 0,
    "explanation": "Kế hoạch quý là một ảnh chụp: lập một lần, rồi thực tế trôi khỏi nó. Lịch cuốn chiếu thì mỗi tuần bỏ tuần vừa qua và thêm một tuần mới ở cuối, nên nó luôn nhìn cùng một khoảng phía trước. Khác biệt không nằm ở mức chi tiết mà nằm ở việc nó được sửa lại liên tục.",
    "diagram": [
      {
        "label": "Cuốn chiếu: mỗi tuần bỏ tuần cũ, thêm một tuần ở cuối",
        "arrow": true
      },
      {
        "label": "Nên nó luôn nhìn cùng một khoảng phía trước",
        "arrow": true
      },
      {
        "label": "Ghi cả phần ĐÃ CAM KẾT và phần còn trống",
        "arrow": true
      },
      {
        "label": "Giá trị nằm ở buổi cập nhật hằng tuần, không ở bảng"
      }
    ],
    "realWorldExample": {
      "company": "Phần còn trống mới là phần đáng nhìn",
      "description": "Một lịch mười ba tuần kín đặc không phải dấu hiệu tốt - nó nghĩa là mọi việc phát sinh trong ba tháng tới đều sẽ đẩy một việc khác ra. Phần còn trống là năng lực dự phòng, và nó nên chiếm một tỷ lệ được quyết định có ý thức."
    },
    "quiz": [
      {
        "question": "Khác biệt cốt lõi giữa lịch cuốn chiếu và kế hoạch quý là gì?",
        "options": [
          "Lịch cuốn chiếu được sửa lại mỗi tuần, còn kế hoạch quý là một ảnh chụp",
          "Lịch cuốn chiếu chi tiết hơn ở những tuần gần và mờ dần về phía sau",
          "Lịch cuốn chiếu do đội tự lập còn kế hoạch quý do cấp trên phê duyệt",
          "Lịch cuốn chiếu chỉ ghi công việc kỹ thuật còn kế hoạch quý ghi cả mục tiêu"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai là một tính chất thường thấy và nó là hệ quả. Việc được sửa lại liên tục mới là thứ ngăn khoảng cách giữa kế hoạch và thực tế lớn dần tới mức không ai nhìn kế hoạch nữa."
      },
      {
        "question": "Vì sao một lịch kín đặc không phải dấu hiệu tốt?",
        "options": [
          "Vì mọi việc phát sinh sẽ đẩy một việc khác ra, và điều đó xảy ra hằng tuần",
          "Vì đội sẽ làm việc quá tải nên chất lượng công việc giảm xuống",
          "Vì không còn chỗ cho những cơ hội mới xuất hiện trong quý đó",
          "Vì việc lập kế hoạch quá chi tiết thường xuyên hoàn toàn không chính xác trong thực tế"
        ],
        "correct": 0,
        "explanation": "Phần còn trống không phải chỗ lãng phí mà là NĂNG LỰC DỰ PHÒNG, và nó nên chiếm một tỷ lệ được quyết định có ý thức chứ không phải phần còn sót lại sau khi xếp hết việc."
      },
      {
        "question": "Vì sao phải phân biệt phần đã cam kết với phần dự kiến?",
        "options": [
          "Vì người ngoài đội đọc cả hai như nhau nếu không được đánh dấu rõ",
          "Vì phần đã cam kết cần được ưu tiên hơn khi có xung đột nguồn lực",
          "Vì hai loại có mức độ chắc chắn khác nhau nên cần theo dõi riêng",
          "Vì phần dự kiến có thể thay đổi nên không nên đưa vào lịch chính thức"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba mô tả đúng sự khác biệt và không nói vì sao phải đánh dấu. Vấn đề nằm ở người đọc: một dòng trong lịch trông giống mọi dòng khác, và bên ngoài sẽ lập kế hoạch của họ dựa trên nó."
      },
      {
        "question": "Giá trị chính của công cụ này nằm ở đâu?",
        "options": [
          "Ở buổi cập nhật hằng tuần, nơi các xung đột lộ ra sớm hơn nhiều tuần",
          "Ở bảng lịch, vì nó cho mọi người cùng nhìn thấy bức tranh chung",
          "Ở khả năng dự báo được thời điểm hoàn thành của từng hạng mục",
          "Ở việc nó buộc đội phải ước lượng khối lượng công việc một cách nghiêm túc"
        ],
        "correct": 0,
        "explanation": "Bảng lịch là sản phẩm phụ. Buổi cập nhật là nơi một người nói ra rằng việc này cần đội kia hỗ trợ trong tuần thứ năm - và biết điều đó ở tuần thứ nhất khác hẳn biết nó ở tuần thứ năm."
      },
      {
        "question": "Điều gì xảy ra khi lịch không được cập nhật vài tuần?",
        "options": [
          "Nó trở thành kế hoạch quý, với đúng nhược điểm mà nó sinh ra để tránh",
          "Đội mất đi công cụ theo dõi tiến độ nên khó biết mình đang ở đâu",
          "Các bên liên quan không nắm được thay đổi nên kỳ vọng bị lệch",
          "Những xung đột về nguồn lực bị phát hiện muộn hơn so với bình thường"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hậu quả cụ thể. Cách nói này thì gọn hơn và hữu ích hơn khi cần thuyết phục ai đó giữ buổi cập nhật: không cập nhật thì bạn không có công cụ này, bạn chỉ có một bảng tính nhiều cột hơn."
      }
    ],
    "keyTakeaways": [
      "Cuốn chiếu: mỗi tuần bỏ tuần cũ, thêm một tuần mới - luôn nhìn cùng khoảng phía trước.",
      "Khác biệt nằm ở việc được SỬA LẠI liên tục, không ở mức chi tiết.",
      "Lịch kín đặc không phải dấu hiệu tốt - phần trống là NĂNG LỰC DỰ PHÒNG.",
      "Đánh dấu rõ phần ĐÃ CAM KẾT và phần dự kiến - người ngoài đọc cả hai như nhau.",
      "Giá trị nằm ở BUỔI CẬP NHẬT hằng tuần, không ở bảng lịch."
    ],
    "practicePrompt": {
      "question": "Lịch mười ba tuần của đội bạn kín 100%. Nên làm gì?",
      "options": [
        "Quyết định một tỷ lệ trống có ý thức và đẩy phần vượt ra ngoài mười ba tuần",
        "Giữ nguyên vì việc đã được cam kết thì không thể bỏ ra khỏi lịch",
        "Xin thêm người để có đủ năng lực cho toàn bộ khối lượng đã lên lịch",
        "Rút ngắn ước lượng của chính từng hạng mục để có thể tạo ra khoảng trống giữa chúng"
      ],
      "correct": 0,
      "explanation": "Lựa chọn cuối là cách tạo ra khoảng trống trên giấy mà không tạo ra năng lực thật, và nó làm mọi ước lượng sau này mất giá trị. Đẩy phần vượt ra ngoài thì khó chịu hơn và nó nói đúng sự thật về năng lực."
    },
    "summary": {
      "keyIdea": "Một quý quá dài để lập kế hoạch chi tiết và quá ngắn để không lập gì cả.",
      "formula": "Cuốn chiếu mỗi tuần + đánh dấu cam kết và dự kiến + giữ một tỷ lệ trống có ý thức.",
      "commonMistake": "Lập lịch kín đặc, nên mọi việc phát sinh đều đẩy một việc khác ra.",
      "action": "Xem lịch của đội bạn còn bao nhiêu phần trăm chỗ trống trong ba tháng tới."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Xem kế hoạch ba tháng tới của đội bạn còn bao nhiêu phần trăm chỗ trống, và hỏi con số đó có phải một quyết định hay chỉ là phần còn sót lại.",
      "secondary": "Nếu nó là phần còn sót lại, mọi việc phát sinh trong ba tháng tới sẽ đẩy một việc đã cam kết ra - và cuộc trò chuyện về việc nào bị đẩy sẽ diễn ra vào lúc gấp gáp nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Kế hoạch quý được lập một lần rồi treo trên tường, còn công việc thì đổi mỗi tuần - và khoảng cách giữa hai thứ đó lớn dần cho tới khi không ai nhìn kế hoạch nữa."
      },
      {
        "type": "heading",
        "text": "Cuốn chiếu là gì"
      },
      {
        "type": "callout",
        "label": "Luôn nhìn cùng một khoảng phía trước",
        "text": "Mỗi tuần bỏ tuần vừa qua và thêm một tuần mới ở cuối. Khác biệt với kế hoạch quý không nằm ở mức chi tiết mà nằm ở việc nó được SỬA LẠI liên tục - nên nó không bao giờ trôi quá xa khỏi thực tế."
      },
      {
        "type": "heading",
        "text": "Hai thứ phải ghi rõ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đã cam kết",
          "text": "Có người nhận, có ngày, và bên ngoài đang lập kế hoạch dựa trên nó."
        },
        "right": {
          "label": "Dự kiến",
          "text": "Còn có thể đổi. Nếu không đánh dấu, người ngoài đội đọc hai loại này như nhau - một dòng trong lịch trông giống mọi dòng khác."
        }
      },
      {
        "type": "heading",
        "text": "Phần trống là một quyết định"
      },
      {
        "type": "paragraph",
        "text": "Một lịch kín đặc nghĩa là mọi việc phát sinh trong ba tháng tới đều sẽ đẩy một việc khác ra - và việc phát sinh thì xảy ra hằng tuần. Phần còn trống là NĂNG LỰC DỰ PHÒNG, và nó nên chiếm một tỷ lệ được quyết định có ý thức chứ không phải phần còn sót lại."
      },
      {
        "type": "closing",
        "lines": [
          "Giá trị chính của công cụ này không nằm ở bảng lịch. Nó nằm ở BUỔI CẬP NHẬT hằng tuần, nơi một người nói ra rằng việc này cần đội kia hỗ trợ trong tuần thứ năm.",
          "Biết điều đó ở tuần thứ nhất khác hẳn biết nó ở tuần thứ năm - và nếu buổi cập nhật bị bỏ vài tuần thì bạn không còn công cụ này, bạn chỉ có một bảng tính nhiều cột hơn."
        ]
      }
    ]
  },
  {
    id: 1514,
    slug: "kich-ban-va-do-nhay-trong-ke-hoach",
    title: "Kế hoạch, Bài 4: Kịch bản và độ nhạy - vì sao một con số duy nhất là câu trả lời sai",
    subtitle: "Phân biệt độ nhạy với kịch bản, chọn biến nào để thử, và cách trình bày dải kết quả cho ban lãnh đạo",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎲",
    track: "professional",
    whyItMatters:
      "Mọi kế hoạch đều sai; câu hỏi hữu ích là sai bao nhiêu thì còn chịu được. Một bản kế hoạch đưa ra đúng một con số buộc người ra quyết định phải tin hoặc không tin, trong khi thứ họ thực sự cần biết là ngưỡng nào thì phải đổi hướng.",
    openingQuestion:
      "Phân tích độ nhạy và phân tích kịch bản khác nhau ở điểm nào?",
    openingOptions: [
      "Độ nhạy dùng cho ngắn hạn, kịch bản dùng cho dài hạn",
      "Độ nhạy đổi một biến, kịch bản đổi cả nhóm biến",
      "Độ nhạy dùng số liệu quá khứ, kịch bản dùng số liệu dự báo",
      "Hai khái niệm này là một, chỉ khác tên gọi",
    ],
    correctOption: 1,
    explanation:
      "Độ nhạy trả lời câu hỏi biến nào quan trọng nhất: giữ nguyên mọi thứ, đẩy một biến lên xuống, xem kết quả nhúc nhích bao nhiêu. Kịch bản trả lời câu hỏi khác hẳn: nếu suy thoái xảy ra thì chuyện gì xảy ra - và trong suy thoái, doanh thu giảm đi cùng với biên lợi nhuận giảm và công nợ thu chậm hơn. Đẩy riêng doanh thu xuống 20% mà giữ nguyên các biến kia là mô tả một thế giới không tồn tại.",
    diagram: [
      { label: "Độ nhạy: một biến, tìm biến quan trọng", arrow: true },
      { label: "Kịch bản: nhóm biến, kể một câu chuyện", arrow: true },
      { label: "Tìm ngưỡng đổi quyết định", arrow: true },
      { label: "Trình bày dải, không phải một điểm" },
    ],
    realWorldExample: {
      company: "Kế hoạch mở rộng chuỗi cửa hàng",
      description:
        "Kế hoạch mở 30 cửa hàng mới cho ra một con số lợi nhuận duy nhất, và cuộc họp biến thành tranh luận xem con số đó có tin được không. Bản làm lại trình bày ba kịch bản kèm điều kiện kích hoạt: ở kịch bản cơ sở, doanh thu bình quân mỗi cửa hàng đạt mức hiện tại; ở kịch bản thấp, doanh thu chỉ đạt 80% và thời gian hòa vốn kéo dài từ 14 lên 26 tháng. Điểm quyết định không phải con số lợi nhuận mà là phát hiện đi kèm: dưới mức 75%, việc mở rộng ngốn hết dòng tiền của các cửa hàng đang có. Cuộc họp chuyển từ tin hay không tin sang theo dõi chỉ số nào để biết mình đang ở kịch bản nào.",
    },
    quiz: [
      {
        question: "Vì sao trong một kịch bản phải thay đổi nhiều biến cùng lúc?",
        options: [
          "Vì thay đổi một biến duy nhất mô tả một tình huống không xảy ra trong thực tế",
          "Vì mô hình tài chính chỉ cho kết quả ổn định khi có tối thiểu ba biến thay đổi",
          "Vì thay đổi nhiều biến giúp kết quả cuối cùng ít biến động hơn so với chỉ đổi một biến",
          "Vì ban lãnh đạo thường yêu cầu xem tác động của toàn bộ các biến số trong mô hình",
        ],
        correct: 0,
        explanation:
          "Trong suy thoái, doanh thu không giảm một mình. Biên lợi nhuận co lại vì phải giảm giá, và khách hàng trả tiền chậm hơn - ba thứ này đi cùng nhau.",
      },
      {
        question: "Phân tích độ nhạy dùng để làm gì trước khi dựng kịch bản?",
        options: [
          "Để tìm ra vài biến có ảnh hưởng lớn nhất, rồi mới dựng kịch bản quanh chính chúng",
          "Để kiểm tra xem mô hình tài chính có đang chứa lỗi công thức ở bất kỳ ô nào hay không",
          "Để xác định giá trị chính xác nhất cho từng biến số trước khi đưa vào kế hoạch",
          "Để giảm số lượng biến trong mô hình xuống mức tối thiểu cần thiết cho tính toán",
        ],
        correct: 0,
        explanation:
          "Không có bước này thì kịch bản dễ được dựng quanh những biến dễ nghĩ ra thay vì những biến thực sự quyết định kết quả.",
      },
      {
        question: "Điểm ngưỡng trong phân tích kịch bản là gì?",
        options: [
          "Giá trị của một biến mà tại đó quyết định nên đổi từ phương án này sang phương án khác",
          "Giá trị lớn nhất mà một biến số có thể đạt tới trong toàn bộ dữ liệu lịch sử đã có",
          "Mức lợi nhuận tối thiểu mà ban lãnh đạo đặt ra làm mục tiêu cho kỳ kế hoạch tới",
          "Điểm mà tại đó hai kịch bản khác nhau cho ra cùng một kết quả tài chính giống hệt",
        ],
        correct: 0,
        explanation:
          "Đây là thứ hữu ích nhất một bản phân tích kịch bản mang lại. Nó biến câu hỏi kế hoạch có đúng không thành câu hỏi cụ thể hơn nhiều: chúng ta theo dõi chỉ số nào và tới mức nào thì đổi hướng.",
      },
      {
        question: "Vì sao không nên trình bày quá nhiều kịch bản cùng lúc?",
        options: [
          "Vì người ra quyết định mất khả năng so sánh và thường quay về chỉ nhìn kịch bản giữa",
          "Vì mỗi kịch bản được thêm vào làm tăng đáng kể thời gian tính toán của mô hình tài chính",
          "Vì các chuẩn mực trình bày báo cáo giới hạn số phương án được nêu trong một tài liệu",
          "Vì càng nhiều kịch bản thì xác suất kịch bản cơ sở xảy ra trong thực tế càng thấp đi",
        ],
        correct: 0,
        explanation:
          "Ba kịch bản là con số phổ biến vì vừa đủ để thấy dải kết quả mà vẫn nhớ được. Bảy kịch bản cho cảm giác kỹ lưỡng nhưng thực tế đưa cuộc thảo luận về đúng chỗ cũ.",
      },
    
    {
      "question": "Vì sao không nên trình bày quá nhiều kịch bản cùng lúc cho ban lãnh đạo?",
      "options": [
        "Vì quá nhiều lựa chọn làm loãng quyết định thay vì hỗ trợ nó",
        "Vì mỗi kịch bản đòi hỏi một mô hình riêng nên tốn thời gian dựng",
        "Vì các kịch bản có xác suất thấp sẽ không bao giờ xảy ra trong thực tế",
        "Vì phần mềm chỉ hiện được ba kịch bản"
      ],
      "correct": 0,
      "explanation": "Ba kịch bản buộc người nghe phải đối diện với dải kết quả và chuẩn bị hành động cho từng nhánh. Bảy kịch bản thì ai cũng chọn cái hợp với niềm tin sẵn có của mình, và cuộc họp quay về đúng nơi nó bắt đầu."
    }
    ],
    keyTakeaways: [
      "Độ nhạy đổi một biến để tìm biến quan trọng; kịch bản đổi cả nhóm theo một câu chuyện nhất quán",
      "Chạy độ nhạy trước để biết dựng kịch bản quanh biến nào",
      "Sản phẩm giá trị nhất là điểm ngưỡng: tới mức nào thì đổi quyết định",
      "Ba kịch bản là đủ - nhiều hơn thì người nghe quay về chỉ nhìn kịch bản giữa",
    ],
    practicePrompt: {
      question:
        "Ban lãnh đạo hỏi: kế hoạch này có đạt được không? Cách trả lời hữu ích nhất là gì?",
      options: [
        "Có, dựa trên các giả định hiện tại",
        "Đạt nếu tỷ lệ chuyển đổi giữ trên 3,2%; dưới thì hụt 15%",
        "Không thể trả lời chắc chắn vì tương lai không dự đoán được",
        "Có, với xác suất khoảng 70%",
      ],
      correct: 1,
      explanation:
        "Câu trả lời này chuyển cuộc thảo luận từ niềm tin sang một chỉ số theo dõi được và một hành động cụ thể gắn với ngưỡng. Con số xác suất 70% nghe có vẻ định lượng nhưng không nói được lấy từ đâu và cũng không dẫn tới việc gì phải làm.",
    },
    summary: {
      keyIdea: "Trình bày dải kết quả kèm ngưỡng đổi quyết định, thay vì một con số duy nhất",
      commonMistake: "Gọi là kịch bản nhưng chỉ đổi mỗi doanh thu, giữ nguyên biên lợi nhuận và công nợ",
      action: "Với kế hoạch hiện tại, tìm một biến mà khi nó xấu đi tới ngưỡng nào đó thì bạn sẽ khuyến nghị đổi hướng.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chạy độ nhạy trên năm biến đầu vào lớn nhất để tìm hai biến ảnh hưởng mạnh nhất tới kết quả. Sau đó dựng đúng ba kịch bản quanh hai biến đó, và với mỗi kịch bản ghi rõ dấu hiệu nào cho biết mình đang rơi vào kịch bản ấy.",
      secondary: "Phần dấu hiệu nhận biết quan trọng hơn bản thân con số: không có nó, kịch bản chỉ là một bài tập.",
    },
    sections: [
      {
        type: "lead",
        text: "Một bản kế hoạch đưa ra đúng một con số đặt người ra quyết định vào thế chỉ có thể tin hoặc không tin. Thứ họ cần lại là một câu hỏi khác: sai tới mức nào thì chúng ta phải làm khác đi.",
      },
      {
        type: "heading",
        text: "Hai công cụ, hai câu hỏi khác nhau",
      },
      {
        type: "conceptTable",
        title: "Độ nhạy, kịch bản và điểm ngưỡng",
        subtitle: "Ba thứ hay bị gọi lẫn tên nhau nhưng trả lời ba câu hỏi khác hẳn",
        concepts: [
          { vi: "Phân tích độ nhạy", en: "Sensitivity", def: "Đổi một biến, giữ nguyên phần còn lại. Trả lời: biến nào quan trọng nhất, kết quả nhạy với cái gì. Là bước sàng lọc trước." },
          { vi: "Phân tích kịch bản", en: "Scenario", def: "Đổi cả nhóm biến theo một câu chuyện nhất quán. Trả lời: nếu suy thoái xảy ra thì chuyện gì xảy ra với chúng ta." },
          { vi: "Điểm ngưỡng", en: "Break-point", def: "Giá trị mà tại đó quyết định phải đổi. Là sản phẩm hữu ích nhất, vì nó biến phân tích thành một chỉ số cần theo dõi." },
        ],
      },
      {
        type: "callout",
        label: "Kịch bản phải nhất quán bên trong",
        text: "Lỗi phổ biến nhất là gọi một bản là kịch bản xấu nhưng chỉ hạ mỗi doanh thu xuống 20%, giữ nguyên biên lợi nhuận, số ngày thu tiền và chi phí vốn. Trong thực tế những đại lượng đó đi cùng nhau: doanh thu giảm thường kéo theo phải giảm giá, khách trả chậm hơn, và ngân hàng khắt khe hơn. Một kịch bản chỉ hữu ích khi nó mô tả một thế giới có thể tồn tại.",
      },
      {
        type: "heading",
        text: "Vì sao doanh thu giảm 20% lại làm lợi nhuận giảm 80%"
      },
      {
        type: "paragraph",
        text: "Doanh thu 100, chi phí biến đổi 60, chi phí cố định 30, lợi nhuận 10. Kịch bản xấu hạ doanh thu xuống 80: chi phí biến đổi giảm theo còn 48, nhưng chi phí cố định vẫn là 30, nên lợi nhuận còn 2. Doanh thu giảm 20% và lợi nhuận giảm 80%. Đây là đòn bẩy hoạt động, và nó là lý do một bảng độ nhạy chỉ hiển thị phần trăm thay đổi doanh thu che mất phần quan trọng nhất - người đọc ngoại suy tuyến tính và kết luận sai về mức độ nguy hiểm."
      },
      {
        type: "callout",
        label: "Kịch bản phải nhất quán bên trong",
        text: "Lỗi phổ biến nhất là gọi một bản là kịch bản xấu nhưng chỉ hạ mỗi doanh thu 20% và giữ nguyên mọi giả định khác. Một kịch bản thật phải hỏi: nếu doanh thu giảm vì nhu cầu yếu, thì giá bán có giữ được không, kỳ thu tiền có dài ra không, hàng tồn có tăng không, và có phải hoãn tuyển không. Các biến này chuyển động cùng nhau vì chúng có chung nguyên nhân - và một kịch bản bỏ qua điều đó cho ra con số dễ chịu hơn thực tế đúng vào lúc cần sự thật nhất."
      },
      {
        type: "comparison",
        left: {
          label: "Độ nhạy - đổi một biến",
          text: "Giữ nguyên mọi thứ, đổi một giả định, xem kết quả dịch bao nhiêu. Mục đích là XẾP HẠNG: biến nào đáng dành thời gian ước lượng cho kỹ. Nếu đổi giả định về tỷ lệ rời bỏ khách hàng làm kết quả xoay 40% còn đổi giả định chi phí văn phòng chỉ làm xoay 1%, bạn biết mình nên tranh luận về cái nào."
        },
        right: {
          label: "Kịch bản - đổi cả cụm biến cùng lúc",
          text: "Dựng một câu chuyện nhất quán về thế giới rồi để mọi giả định dịch theo nó. Mục đích là CHUẨN BỊ: nếu điều này xảy ra, tiền mặt còn đủ mấy tháng, và ngưỡng nào thì phải hành động. Đầu ra hữu ích không phải một con số mà là một mốc kích hoạt."
        }
      },
      {
        type: "closing",
        lines: [
          "Không ai trách bạn vì kế hoạch trượt. Người ta trách vì không ai biết mình đang trượt cho tới lúc quá muộn.",
          "Bài sau đi vào nguồn tranh cãi nội bộ lớn nhất quanh mọi báo cáo quản trị: chi phí của ai.",
        ],
      },
    ],
  },
  {
    id: 1515,
    slug: "phan-bo-chi-phi-va-loi-nhuan-bo-phan",
    title: "Kế hoạch, Bài 5: Phân bổ chi phí - vì sao lợi nhuận từng bộ phận luôn gây tranh cãi",
    subtitle: "Chi phí trực tiếp, chi phí chung và tiêu thức phân bổ: khi con số quyết định ai bị cắt ngân sách",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Ngay khi doanh nghiệp bắt đầu đo lợi nhuận theo từng bộ phận hay từng dòng sản phẩm, phân bổ chi phí chung trở thành chủ đề chính trị nhất trong tài chính. Một tiêu thức phân bổ khác nhau có thể biến một dòng sản phẩm từ lãi thành lỗ mà không có gì trong hoạt động thực tế thay đổi.",
    openingQuestion:
      "Vì sao việc chọn tiêu thức phân bổ chi phí chung lại quan trọng đến vậy?",
    openingOptions: [
      "Vì nó ảnh hưởng tới tổng lợi nhuận của toàn doanh nghiệp",
      "Vì tiêu thức khác nhau cho kết quả khác nhau",
      "Vì chuẩn mực kế toán quy định bắt buộc một tiêu thức duy nhất",
      "Vì cơ quan thuế yêu cầu doanh nghiệp giải trình cách phân bổ",
    ],
    correctOption: 1,
    explanation:
      "Tổng lợi nhuận của doanh nghiệp hoàn toàn không đổi dù phân bổ thế nào - phân bổ chỉ chia lại một chiếc bánh có sẵn. Nhưng quyết định lại dựa trên con số từng bộ phận: bộ phận nào bị gán nhiều chi phí chung sẽ trông kém hiệu quả hơn, và trong đợt cắt giảm ngân sách nó là ứng viên đầu tiên. Đó là lý do một lựa chọn kỹ thuật tưởng như trung tính lại kéo theo hệ quả rất thật.",
    diagram: [
      { label: "Tách chi phí trực tiếp trước", arrow: true },
      { label: "Nhận diện chi phí chung còn lại", arrow: true },
      { label: "Chọn tiêu thức phản ánh mức sử dụng", arrow: true },
      { label: "Công khai tiêu thức cho mọi bộ phận" },
    ],
    realWorldExample: {
      company: "Ngân hàng phân bổ chi phí công nghệ",
      description:
        "Chi phí trung tâm dữ liệu và hệ thống lõi được phân bổ cho các khối kinh doanh. Nếu phân bổ theo doanh thu, khối bán lẻ có doanh thu lớn sẽ gánh phần lớn chi phí. Nếu phân bổ theo số lượng giao dịch xử lý, kết quả đảo ngược đáng kể vì khối bán lẻ tuy nhiều giao dịch nhưng mỗi giao dịch rất nhỏ, trong khi khối doanh nghiệp dùng nhiều tài nguyên hệ thống cho các giao dịch phức tạp. Cùng một khoản chi phí, hai tiêu thức, hai bức tranh hiệu quả hoàn toàn khác nhau - và hai kết luận khác nhau về khối nào nên được đầu tư thêm.",
    },
    quiz: [
      {
        question: "Chi phí trực tiếp khác chi phí chung ở điểm nào?",
        options: [
          "Chi phí trực tiếp truy được về một bộ phận cụ thể mà không cần dùng tiêu thức phân bổ nào",
          "Chi phí trực tiếp luôn có giá trị lớn hơn hẳn chi phí chung trong cơ cấu tổng chi phí của kỳ",
          "Chi phí trực tiếp được thanh toán bằng tiền mặt còn chi phí chung thì trả sau",
          "Chi phí trực tiếp thay đổi theo sản lượng còn chi phí chung thì luôn cố định",
        ],
        correct: 0,
        explanation:
          "Ranh giới này quyết định phần nào của báo cáo là sự thật và phần nào là kết quả của một lựa chọn. Lương nhân viên bán hàng của một khối là trực tiếp; lương phòng nhân sự là chung.",
      },
      {
        question: "Tiêu thức phân bổ tốt cần có đặc điểm gì?",
        options: [
          "Phản ánh được mức độ bộ phận đó thực sự sử dụng nguồn lực chung được phân bổ",
          "Dễ tính toán nhất trong số các tiêu thức mà hệ thống kế toán hiện có thể cung cấp",
          "Chia đều chi phí chung cho tất cả các bộ phận để bảo đảm tính công bằng",
          "Cho ra kết quả ổn định qua các kỳ để tiện so sánh giữa các năm với nhau",
        ],
        correct: 0,
        explanation:
          "Chia đều nghe công bằng nhưng thường sai nhất: một bộ phận ba người và một bộ phận ba trăm người không dùng phòng nhân sự như nhau.",
      },
      {
        question: "Vì sao nên báo cáo lợi nhuận bộ phận cả trước và sau phân bổ chi phí chung?",
        options: [
          "Vì con số trước phân bổ đo phần bộ phận kiểm soát được, con số sau đo đóng góp toàn phần",
          "Vì hai con số này được lập theo hai chuẩn mực kế toán khác nhau nên phải trình bày cả hai",
          "Vì con số sau phân bổ luôn chính xác hơn nên con số trước chỉ mang tính tham khảo",
          "Vì cơ quan thuế yêu cầu doanh nghiệp trình bày lợi nhuận theo cả hai cách tính toán",
        ],
        correct: 0,
        explanation:
          "Đánh giá người quản lý bộ phận nên dựa trên phần họ kiểm soát được. Quyết định có nên duy trì cả dòng sản phẩm hay không thì cần con số sau phân bổ.",
      },
      {
        question: "Rủi ro của việc phân bổ chi phí chung quá chi tiết là gì?",
        options: [
          "Công sức duy trì tăng nhanh trong khi kết quả hầu như không đổi cách ai ra quyết định",
          "Tổng chi phí được phân bổ sẽ vượt quá tổng chi phí chung thực tế của doanh nghiệp",
          "Các bộ phận sẽ không còn khả năng kiểm tra lại con số được phân bổ cho mình nữa",
          "Kết quả phân bổ sẽ luôn thiên lệch về phía các bộ phận có quy mô doanh thu lớn nhất",
        ],
        correct: 0,
        explanation:
          "Phân bổ chi tiết hơn chỉ đáng làm khi nó đổi được một quyết định nào đó. Nếu cả hai cách đều dẫn tới cùng kết luận, cách đơn giản hơn thắng.",
      },
    
    {
      "question": "Vì sao nên công khai tiêu thức phân bổ cho các bộ phận thay vì chỉ gửi con số cuối cùng?",
      "options": [
        "Vì phần lớn tranh cãi đến từ chỗ không ai biết con số được tính ra sao",
        "Vì chuẩn mực kế toán bắt buộc thuyết minh tiêu thức cho từng bộ phận",
        "Vì công khai tiêu thức sẽ làm tổng chi phí chung được phân bổ giảm xuống",
        "Vì mỗi bộ phận có quyền chọn tiêu thức có lợi nhất cho chính mình"
      ],
      "correct": 0,
      "explanation": "Người phụ trách một mảng phản đối con số phân bổ không phải vì con số to, mà vì họ không kiểm tra được nó đến từ đâu. Đưa tiêu thức ra thì tranh luận chuyển từ \"tôi không chịu\" sang \"số mét vuông này tính sai\" - loại tranh luận giải quyết được, và đôi khi phát hiện tiêu thức sai thật."
    }
    ],
    keyTakeaways: [
      "Phân bổ không đổi tổng lợi nhuận, nhưng đổi con số mà quyết định dựa vào",
      "Tách chi phí trực tiếp trước - đó là phần không phải bàn cãi",
      "Tiêu thức tốt phản ánh mức sử dụng thật, chia đều thường là lựa chọn tệ nhất",
      "Báo cáo cả trước và sau phân bổ: một để đánh giá người, một để quyết định về sản phẩm",
      "Công khai tiêu thức - phần lớn tranh cãi đến từ chỗ không ai biết con số được tính ra sao",
    ],
    practicePrompt: {
      question:
        "Một dòng sản phẩm có lãi trước phân bổ chi phí chung, nhưng lỗ sau phân bổ. Nên bỏ dòng sản phẩm này?",
      options: [
        "Nên bỏ, vì sau khi tính đủ chi phí thì nó đang lỗ",
        "Chưa kết luận được: phải xem chi phí chung đó có giảm đi thật không nếu bỏ dòng sản phẩm",
        "Nên giữ, vì trước phân bổ nó vẫn có lãi",
        "Nên tăng giá bán để bù phần chi phí chung được phân bổ",
      ],
      correct: 1,
      explanation:
        "Đây là cái bẫy kinh điển của phân bổ chi phí. Nếu bỏ dòng sản phẩm mà tiền thuê trụ sở và lương ban điều hành vẫn y nguyên, thì phần chi phí chung ấy chỉ chuyển sang các dòng còn lại - và doanh nghiệp vừa mất đi phần lãi trước phân bổ mà dòng này đang đóng góp. Câu hỏi đúng luôn là chi phí nào thực sự biến mất.",
    },
    summary: {
      keyIdea: "Phân bổ chia lại một chiếc bánh cố định, nhưng quyết định lại dựa trên các lát bánh đó",
      commonMistake: "Coi lợi nhuận sau phân bổ là sự thật khách quan thay vì kết quả của một lựa chọn tiêu thức",
      action: "Với báo cáo bộ phận hiện tại, ghi rõ mỗi khoản chi phí chung đang được phân bổ theo tiêu thức nào và vì sao.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy khoản chi phí chung lớn nhất và thử phân bổ nó theo hai tiêu thức khác nhau, chẳng hạn theo doanh thu và theo số nhân sự. So hai bảng kết quả: bộ phận nào đổi vị trí xếp hạng hiệu quả? Chênh lệch đó chính là mức độ mà kết luận của bạn phụ thuộc vào một lựa chọn kỹ thuật.",
      secondary: "Nếu cả hai cách cho cùng kết luận, bạn có thể yên tâm. Nếu không, tiêu thức cần được thảo luận công khai trước khi ai đó dùng con số để cắt ngân sách.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài này nằm ở chỗ giao giữa kỹ thuật và chính trị nội bộ. Phép tính thì đơn giản; cái khó là mọi lựa chọn trong đó đều có người được và người mất.",
      },
      {
        type: "heading",
        text: "Ba tầng của một báo cáo lợi nhuận bộ phận",
      },
      {
        type: "conceptTable",
        title: "Đọc báo cáo bộ phận theo tầng",
        subtitle: "Mỗi tầng trả lời một câu hỏi quản trị khác nhau",
        concepts: [
          { vi: "Doanh thu trừ chi phí trực tiếp", en: "Contribution", def: "Phần đóng góp của bộ phận. Không có lựa chọn chủ quan nào ở đây, nên đây là con số ít gây tranh cãi nhất." },
          { vi: "Trừ chi phí kiểm soát được", en: "Controllable profit", def: "Trừ tiếp các chi phí mà người quản lý bộ phận quyết định được. Đây là con số nên dùng để đánh giá chính người đó." },
          { vi: "Trừ chi phí chung phân bổ", en: "Full profit", def: "Trừ nốt phần chi phí chung theo tiêu thức đã chọn. Dùng cho quyết định về sản phẩm hoặc bộ phận, không dùng để đánh giá con người." },
        ],
      },
      {
        type: "callout",
        label: "Câu hỏi duy nhất đáng hỏi khi cân nhắc bỏ một bộ phận",
        text: "Không phải bộ phận này lãi hay lỗ sau phân bổ, mà là: nếu bỏ nó, những khoản chi phí nào thực sự biến mất khỏi doanh nghiệp. Tiền thuê trụ sở, lương ban điều hành và chi phí hệ thống lõi hầu như không giảm khi đóng một dòng sản phẩm - chúng chỉ được phân bổ lại cho phần còn lại. Nhiều quyết định đóng cửa bộ phận đã khiến lợi nhuận tổng giảm đi đúng vì lý do này.",
      },
      {
        type: "closing",
        lines: [
          "Con số sau phân bổ không phải sự thật khách quan, nó là kết quả của một lựa chọn nên được nói ra.",
          "Bài cuối chặng ghép mọi thứ lại thành nhịp làm việc hằng tháng của một người làm FP&A.",
        ],
      },
    ],
  },
  {
    "id": 1516,
    "slug": "nhip-thang-cua-doi-van-hanh",
    "title": "Kế hoạch, Bài 6: Nhịp tháng của đội vận hành - chốt số, giải thích và ngồi cùng đội sản phẩm",
    "subtitle": "Một bộ báo cáo tháng không ai đọc là bộ báo cáo trả lời câu hỏi mà không ai hỏi.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🗓️",
    "whyItMatters": "Nhịp tháng là chỗ duy nhất mà số liệu vận hành gặp quyết định sản phẩm, và phần lớn nó bị làm thành một nghi thức báo cáo.",
    "openingQuestion": "Phần nào của bộ báo cáo tháng tạo ra giá trị lớn nhất?",
    "openingOptions": [
      "Phần bình luận: giải thích vì sao con số đổi và điều đó nghĩa là gì",
      "Phần số liệu: bảng chỉ số đầy đủ của chính tháng so với chính tất cả các tháng trước",
      "Phần biểu đồ: trực quan hoá xu hướng để người đọc nắm nhanh",
      "Phần tóm tắt: các điểm chính được rút gọn ở đầu tài liệu"
    ],
    "correctOption": 0,
    "explanation": "Ba phần kia đều tự động hoá được, và tự động hoá được nghĩa là chúng không cần một buổi họp. Phần bình luận là phần duy nhất đòi một người đã nhìn cả số liệu lẫn những gì đã xảy ra trong tháng - và nó là phần đầu tiên bị cắt khi bận, chính vì nó tốn công nhất.",
    "diagram": [
      {
        "label": "Số liệu tự động hoá được; BÌNH LUẬN thì không",
        "arrow": true
      },
      {
        "label": "Bình luận là phần đầu tiên bị cắt khi bận, và là phần duy nhất đáng giữ",
        "arrow": true
      },
      {
        "label": "Chốt số rồi mới bình luận - đừng vừa chốt vừa giải thích",
        "arrow": true
      },
      {
        "label": "Và mỗi tháng phải kết bằng một quyết định, không bằng một bản trình bày"
      }
    ],
    "realWorldExample": {
      "company": "Kết bằng một quyết định",
      "description": "Một buổi rà soát tháng kết thúc bằng cái gật đầu là một buổi họp đã lãng phí một giờ của tám người. Kết bằng một quyết định - dừng cái gì, đổi ngưỡng nào, ai làm gì trước ngày nào - là thứ duy nhất biện minh được cho nhịp này."
    },
    "quiz": [
      {
        "question": "Vì sao phần bình luận hay bị cắt đầu tiên?",
        "options": [
          "Vì nó tốn công nhất và là phần duy nhất không tự động hoá được",
          "Vì nó mang tính chủ quan nên dễ gây tranh cãi trong buổi rà soát",
          "Vì người đọc thường chỉ nhìn số liệu và bỏ qua phần diễn giải",
          "Vì nó đòi hỏi người viết phải hiểu cả nghiệp vụ lẫn kỹ thuật"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối mô tả đúng yêu cầu và nó là lý do phần này KHÓ, không phải lý do nó bị cắt. Bị cắt là vì nó là thứ duy nhất còn lại sau khi mọi phần khác đã được máy làm - nên khi thiếu thời gian, nó là chỗ duy nhất có thể cắt."
      },
      {
        "question": "Vì sao nên chốt số trước rồi mới bình luận?",
        "options": [
          "Vì vừa chốt vừa giải thích thì con số dễ bị chỉnh cho khớp với câu chuyện",
          "Vì việc chốt số thật sự cần tập trung nên hoàn toàn không nên làm cùng lúc với việc khác",
          "Vì bình luận cần thời gian suy nghĩ nên phải tách khỏi việc chốt số",
          "Vì hai công việc này thường do hai người khác nhau thực hiện"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia là lý do về quy trình. Cái này là lý do về tính đúng đắn, và nó xảy ra một cách vô thức: khi đang có sẵn một câu chuyện trong đầu, một con số hơi lệch rất dễ được coi là lỗi đo và bị sửa lại."
      },
      {
        "question": "Một buổi rà soát tháng nên kết thúc bằng gì?",
        "options": [
          "Một quyết định cụ thể: dừng gì, đổi ngưỡng nào, ai làm gì trước ngày nào",
          "Một bản tóm tắt các điểm chính đã được thảo luận trong buổi",
          "Sự thống nhất của các bên về tình hình hiện tại của hệ thống",
          "Danh sách các vấn đề cần theo dõi trong tháng tiếp theo"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối nghe gần với một quyết định và nó không có người và không có ngày, nên nó không tạo ra việc gì. Một buổi kết thúc bằng cái gật đầu là một giờ của tám người đã bị tiêu."
      },
      {
        "question": "Vì sao đội vận hành nên ngồi cùng đội sản phẩm trong nhịp này?",
        "options": [
          "Vì phần lớn thứ làm số liệu đổi đến từ quyết định sản phẩm, không từ hạ tầng",
          "Vì hai đội cần thống nhất về mức độ ưu tiên của các công việc chung",
          "Vì đội sản phẩm cần hiểu các ràng buộc kỹ thuật khi lập kế hoạch",
          "Vì việc gặp nhau định kỳ giúp hai đội phối hợp tốt hơn trong tháng"
        ],
        "correct": 0,
        "explanation": "Ba lý do kia đều đúng và đều chung chung. Cái này chỉ ra vì sao nhịp này KHÔNG chạy được nếu thiếu họ: một tính năng mới ra mắt giải thích được phần lớn biến động, và không ai trong đội vận hành có thông tin đó."
      },
      {
        "question": "Dấu hiệu nào cho thấy bộ báo cáo tháng đang thành nghi thức?",
        "options": [
          "Nội dung gần như không đổi giữa các tháng ngoài phần con số",
          "Bộ báo cáo ngày càng dài thêm qua từng tháng vì được bổ sung liên tục",
          "Thời gian chuẩn bị bộ báo cáo chiếm phần lớn tuần đầu của tháng",
          "Ít người tham dự buổi rà soát so với số người được mời"
        ],
        "correct": 0,
        "explanation": "Ba dấu hiệu kia đều là triệu chứng và có nhiều nguyên nhân. Cái này chỉ thẳng vào bản chất: nếu chỉ có con số đổi mà phần diễn giải không đổi, thì phần diễn giải đang không đọc số liệu - nó chỉ đang lặp lại."
      }
    ],
    "keyTakeaways": [
      "Số liệu và biểu đồ tự động hoá được; BÌNH LUẬN thì không - và nó bị cắt đầu tiên.",
      "Chốt số TRƯỚC rồi mới bình luận, nếu không con số bị chỉnh cho khớp câu chuyện.",
      "Kết bằng một QUYẾT ĐỊNH có người và có ngày, không bằng một cái gật đầu.",
      "Đội sản phẩm phải có mặt: phần lớn biến động đến từ quyết định của họ.",
      "Nội dung không đổi giữa các tháng ngoài con số = phần diễn giải đang không đọc số liệu."
    ],
    "practicePrompt": {
      "question": "Bộ báo cáo tháng của bạn dài hai mươi trang. Cắt phần nào trước?",
      "options": [
        "Mọi bảng số mà không có dòng bình luận nào đi kèm",
        "Các biểu đồ trùng lặp thông tin với những biểu đồ khác",
        "Phần phụ lục chứa số liệu chi tiết mà ít người tra tới",
        "Các chỉ số ít thay đổi giữa các tháng nên không cần theo dõi hằng tháng"
      ],
      "correct": 0,
      "explanation": "Ba cách kia cắt theo mức trùng lặp hoặc mức quan tâm. Cách này cắt theo một tiêu chí rõ ràng hơn: một bảng số không có ai giải thích nghĩa là chưa ai đọc nó, và nó vào bộ báo cáo vì thói quen chứ không vì có người cần."
    },
    "summary": {
      "keyIdea": "Nhịp tháng là chỗ duy nhất số liệu vận hành gặp quyết định sản phẩm.",
      "formula": "Chốt số → bình luận → ngồi cùng đội sản phẩm → kết bằng một quyết định.",
      "commonMistake": "Cắt phần bình luận khi bận, giữ lại đúng phần máy đã làm hộ.",
      "action": "Đếm số bảng trong báo cáo tháng không có dòng bình luận nào."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở bộ báo cáo tháng gần nhất và đếm xem có bao nhiêu bảng số không có dòng bình luận nào đi kèm.",
      "secondary": "Mỗi bảng như vậy là một bảng chưa ai đọc. Cắt chúng đi thì bộ báo cáo ngắn lại và không mất thông tin nào - vì thông tin chỉ tồn tại khi có người đọc ra nó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhịp tháng là chỗ duy nhất mà số liệu vận hành gặp quyết định sản phẩm, và phần lớn nó bị làm thành một nghi thức báo cáo."
      },
      {
        "type": "heading",
        "text": "Phần duy nhất không tự động hoá được"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số liệu, biểu đồ, tóm tắt",
          "text": "Máy làm được. Và làm được nghĩa là chúng không cần một buổi họp."
        },
        "right": {
          "label": "Bình luận",
          "text": "Đòi một người đã nhìn cả số liệu lẫn những gì đã xảy ra trong tháng. Tốn công nhất, nên là phần đầu tiên bị cắt khi bận."
        }
      },
      {
        "type": "heading",
        "text": "Thứ tự quan trọng"
      },
      {
        "type": "callout",
        "label": "Chốt số trước, bình luận sau",
        "text": "Vừa chốt vừa giải thích thì con số bị chỉnh cho khớp với câu chuyện - và điều đó xảy ra một cách vô thức: khi đã có sẵn một câu chuyện trong đầu, một con số hơi lệch rất dễ được coi là lỗi đo."
      },
      {
        "type": "heading",
        "text": "Ai phải có mặt"
      },
      {
        "type": "paragraph",
        "text": "Đội sản phẩm. Phần lớn thứ làm số liệu đổi đến từ quyết định của họ - một tính năng mới ra mắt giải thích được phần lớn biến động, và không ai trong đội vận hành có thông tin đó."
      },
      {
        "type": "closing",
        "lines": [
          "Và mỗi tháng phải kết bằng một QUYẾT ĐỊNH: dừng cái gì, đổi ngưỡng nào, ai làm gì trước ngày nào.",
          "Một buổi kết thúc bằng cái gật đầu là một giờ của tám người đã bị tiêu, và nó là dấu hiệu rõ nhất cho thấy nhịp này đã thành nghi thức."
        ]
      }
    ]
  },
];
