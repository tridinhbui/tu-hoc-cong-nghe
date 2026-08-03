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
      "Vì khi thực tế lệch kế hoạch, con số đó không cho biết yếu tố nào gây ra chênh lệch",
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
          "Đây chính là mối liên hệ với bài phân tích variance ở chặng CFO & Vận hành: variance chỉ hữu ích khi tách được ra thành phần, và tách được hay không là do cấu trúc kế hoạch quyết định từ đầu.",
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
      "question": "Rủi ro lớn nhất khi chuyển sang lập kế hoạch theo yếu tố dẫn dắt là gì?",
      "options": [
        "Tách quá nhiều tầng làm mô hình cồng kềnh mà không thêm thông tin",
        "Các yếu tố dẫn dắt thay đổi theo mùa nên kế hoạch phải lập lại hằng quý",
        "Cách này đòi hỏi phần mềm chuyên dụng mà doanh nghiệp nhỏ không có",
        "Kết quả thường lệch xa hơn cách cũ"
      ],
      "correct": 0,
      "explanation": "Mục đích của việc tách là để chất vấn được từng vế. Tách tới tầng thứ năm thì không ai còn kiểm chứng nổi biến nào, và bạn quay lại đúng chỗ xuất phát - chỉ khác là mất thêm ba ngày dựng bảng."
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
        text: "Chặng CFO & Vận hành đã dạy ngân sách, rolling forecast và phân tích variance - tức là các sản phẩm đầu ra của FP&A. Chặng này lo phần đứng trước: những con số trong ngân sách ấy từ đâu mà có.",
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
    slug: "ke-hoach-nhan-su-va-chi-phi-luong",
    title: "Kế hoạch, Bài 2: Kế hoạch nhân sự - khoản chi lớn nhất và khó đảo ngược nhất",
    subtitle: "Vì sao chi phí lương phải lập theo từng vị trí và tháng tuyển, chứ không phải một con số cả năm",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "professional",
    whyItMatters:
      "Với phần lớn doanh nghiệp dịch vụ, chi phí nhân sự chiếm quá nửa tổng chi phí. Nó cũng là khoản khó đảo ngược nhất: cắt marketing có hiệu lực trong tháng, còn giảm nhân sự thì tốn chi phí, thời gian và uy tín. Sai ở đây đắt hơn hẳn sai ở các dòng khác.",
    openingQuestion:
      "Vì sao chi phí lương cả năm không nên lập bằng cách lấy số nhân sự cuối năm nhân lương bình quân?",
    openingOptions: [
      "Vì lương bình quân không phản ánh đúng cơ cấu thu nhập của từng vị trí",
      "Vì người tuyển giữa năm chỉ phát sinh chi phí cho phần thời gian còn lại, nên cách tính đó thổi phồng con số",
      "Vì chuẩn mực kế toán yêu cầu ghi nhận chi phí lương theo từng tháng",
      "Vì lương luôn tăng vào giữa năm",
    ],
    correctOption: 1,
    explanation:
      "Một vị trí tuyển vào tháng 10 chỉ tạo ra chi phí ba tháng trong năm đó, nhưng tạo ra chi phí mười hai tháng trong năm sau. Lấy đầu số cuối kỳ nhân lương bình quân sẽ vừa thổi phồng chi phí năm nay vừa che mất cú nhảy chi phí năm sau - và cú nhảy đó là thứ khiến ngân sách năm kế tiếp thủng ngay từ tháng đầu, dù không tuyển thêm ai.",
    diagram: [
      { label: "Liệt kê từng vị trí, không phải tổng số", arrow: true },
      { label: "Gắn tháng dự kiến vào làm", arrow: true },
      { label: "Cộng chi phí đi kèm ngoài lương", arrow: true },
      { label: "Tính hiệu ứng tràn sang năm sau" },
    ],
    realWorldExample: {
      company: "Công ty công nghệ và cú nhảy chi phí năm sau",
      description:
        "Một công ty tuyển 20 người trong năm, phần lớn vào quý bốn. Chi phí lương thực tế năm đó chỉ tăng khoảng 15% so với năm trước, ban lãnh đạo thấy hoàn toàn trong tầm kiểm soát. Sang năm kế tiếp, chi phí lương tăng thêm 30% mà không tuyển thêm một người nào - chỉ vì 20 người kia bắt đầu tính đủ mười hai tháng. Đây là hiệu ứng tràn, và nó không xuất hiện ở bất kỳ dòng nào trong báo cáo năm cũ.",
    },
    quiz: [
      {
        question: "Hiệu ứng tràn trong kế hoạch nhân sự là gì?",
        options: [
          "Chi phí của người tuyển giữa năm nay tính đủ mười hai tháng vào năm kế tiếp",
          "Chi phí phát sinh khi một nhân sự nghỉ việc và phải tuyển người thay thế vị trí đó",
          "Phần chi phí lương vượt quá ngân sách đã được duyệt từ đầu năm tài chính",
          "Khoản lương phải trả thêm khi nhân sự làm việc ngoài giờ hành chính quy định",
        ],
        correct: 0,
        explanation:
          "Đây là lý do ngân sách năm sau có thể thủng ngay cả khi đóng băng tuyển dụng hoàn toàn. Nó phải được tính ngay từ lúc lập kế hoạch năm nay, không phải phát hiện vào tháng 1 năm sau.",
      },
      {
        question: "Chi phí thật của một nhân sự gồm những gì ngoài lương gộp?",
        options: [
          "Bảo hiểm bắt buộc phần doanh nghiệp đóng, thưởng, thiết bị và chi phí tuyển dụng ban đầu",
          "Chỉ có bảo hiểm bắt buộc, vì các khoản còn lại được hạch toán vào chi phí quản lý chung",
          "Không có gì thêm nếu hợp đồng lao động đã ghi rõ tổng thu nhập của người lao động",
          "Chỉ có thưởng cuối năm, vì đó là khoản duy nhất không nằm trong lương hằng tháng",
        ],
        correct: 0,
        explanation:
          "Tổng chi phí thường cao hơn lương gộp khoảng 20 đến 30 phần trăm tùy ngành và địa bàn. Lập kế hoạch chỉ trên lương gộp là bỏ sót một phần đáng kể ngay từ đầu.",
      },
      {
        question: "Vì sao nên lập kế hoạch nhân sự theo từng vị trí thay vì theo tổng đầu người?",
        options: [
          "Vì tổng đầu người che mất chênh lệch lương giữa các vị trí và thời điểm bắt đầu của từng người",
          "Vì cơ quan quản lý lao động có yêu cầu doanh nghiệp phải đăng ký kế hoạch tuyển dụng chi tiết",
          "Vì phần mềm quản lý nhân sự hiện nay không hỗ trợ nhập liệu theo con số tổng hợp",
          "Vì cách này giúp giảm tổng chi phí nhân sự so với lập kế hoạch theo đầu người",
        ],
        correct: 0,
        explanation:
          "Mười kỹ sư và mười nhân viên hỗ trợ đều là mười đầu người, nhưng chênh lệch chi phí có thể gấp ba lần. Cùng một tổng đầu người còn cho ra chi phí rất khác nhau tùy tháng vào làm.",
      },
      {
        question: "Khi ngân sách bị cắt, vì sao cắt kế hoạch tuyển dụng lại được ưu tiên hơn giảm nhân sự hiện có?",
        options: [
          "Vì chi phí và tác động lên tổ chức của việc không tuyển thấp hơn hẳn so với cắt giảm",
          "Vì việc chưa tuyển thì chưa phát sinh chi phí nào nên không ảnh hưởng tới báo cáo",
          "Vì quy định pháp luật hiện hành không cho phép doanh nghiệp cắt giảm nhân sự đang làm",
          "Vì giảm nhân sự hiện có không tiết kiệm được chi phí trong năm tài chính đang chạy",
        ],
        correct: 0,
        explanation:
          "Không tuyển là quyết định có thể đảo ngược khi tình hình khá lên; cắt giảm thì không. Đó là lý do phần tuyển mới luôn nên được tách riêng và đánh dấu rõ trong ngân sách.",
      },
    
    {
      "question": "Vì sao lập kế hoạch nhân sự theo từng vị trí lại tốt hơn theo tổng đầu người?",
      "options": [
        "Vì thời điểm tuyển và mức lương từng vị trí quyết định chi phí thật",
        "Vì bộ phận nhân sự yêu cầu danh sách vị trí cụ thể để đăng tuyển",
        "Vì tổng đầu người không phản ánh được số nhân sự nghỉ việc trong năm",
        "Vì mỗi vị trí đóng bảo hiểm khác nhau"
      ],
      "correct": 0,
      "explanation": "Mười vị trí tuyển tháng Một khác hẳn mười vị trí tuyển tháng Mười về chi phí năm nay, và khác nữa về cú nhảy chi phí năm sau. Con số tổng làm phẳng cả hai điều đó, nên kế hoạch trông đúng cho tới khi ngân sách năm sau vỡ."
    }
    ],
    keyTakeaways: [
      "Lập theo từng vị trí kèm tháng vào làm, không phải theo tổng đầu người",
      "Hiệu ứng tràn: người tuyển quý bốn tạo cú nhảy chi phí năm sau dù không tuyển thêm ai",
      "Chi phí thật cao hơn lương gộp khoảng 20-30%: bảo hiểm, thưởng, thiết bị, tuyển dụng",
      "Tách riêng phần tuyển mới trong ngân sách - đó là phần đảo ngược được khi phải cắt",
    ],
    practicePrompt: {
      question:
        "Công ty đóng băng tuyển dụng hoàn toàn từ 1/1 năm sau. Chi phí lương năm sau so với năm nay sẽ thế nào?",
      options: [
        "Giữ nguyên, vì số nhân sự không đổi",
        "Vẫn tăng, do hiệu ứng tràn của những người tuyển trong năm nay cộng với tăng lương định kỳ",
        "Giảm, vì không còn chi phí tuyển dụng",
        "Không dự đoán được nếu chưa biết tỷ lệ nghỉ việc",
      ],
      correct: 1,
      explanation:
        "Đây là tình huống làm nhiều ban lãnh đạo bất ngờ. Đóng băng tuyển dụng chặn được phần tăng mới, nhưng không chạm tới hai nguồn tăng đã cam kết từ trước: phần tháng còn thiếu của người tuyển năm nay, và các đợt điều chỉnh lương theo chính sách. Tỷ lệ nghỉ việc có bù lại một phần, nhưng thường không đủ.",
    },
    summary: {
      keyIdea: "Chi phí nhân sự do thời điểm vào làm quyết định nhiều không kém số lượng người",
      commonMistake: "Lấy đầu người cuối kỳ nhân lương bình quân, bỏ qua tháng vào làm và hiệu ứng tràn",
      action: "Dựng bảng kế hoạch nhân sự có cột tháng dự kiến vào làm, rồi tính chi phí theo từng tháng thay vì cả năm.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy kế hoạch tuyển dụng năm nay và tính hai con số: chi phí phát sinh trong năm nay, và chi phí mười hai tháng đầy đủ của cùng nhóm người đó. Chênh lệch giữa hai con số chính là phần ngân sách năm sau đã bị cam kết trước khi năm sau bắt đầu.",
      secondary: "Trình bày con số thứ hai cho ban lãnh đạo cùng lúc với con số thứ nhất, đừng để nó xuất hiện lần đầu vào tháng 1.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong phần lớn doanh nghiệp dịch vụ, con người là dòng chi phí lớn nhất. Nó cũng là dòng có độ trễ dài nhất giữa lúc ra quyết định và lúc đảo ngược được quyết định đó.",
      },
      {
        type: "heading",
        text: "Vì sao tháng vào làm quan trọng ngang số lượng",
      },
      {
        type: "conceptTable",
        title: "Ba lớp chi phí của một kế hoạch nhân sự",
        subtitle: "Bỏ sót lớp nào cũng khiến ngân sách lệch theo hướng lạc quan",
        concepts: [
          { vi: "Chi phí trực tiếp", en: "Base cost", def: "Lương gộp nhân số tháng thực tế làm việc trong kỳ. Đây là lớp duy nhất mà phần lớn bản kế hoạch có." },
          { vi: "Chi phí đi kèm", en: "Loaded cost", def: "Bảo hiểm phần doanh nghiệp đóng, thưởng, thiết bị, chi phí tuyển. Thường cộng thêm 20-30% lên lương gộp." },
          { vi: "Hiệu ứng tràn", en: "Annualisation", def: "Phần tháng còn thiếu của người tuyển giữa kỳ, rơi hết vào năm sau. Không xuất hiện ở bất kỳ dòng nào của báo cáo năm nay." },
        ],
      },
      {
        type: "callout",
        label: "Tách phần đã cam kết khỏi phần còn lựa chọn được",
        text: "Một ngân sách nhân sự nên đọc được thành hai khối: chi phí của những người đã đang làm - phần gần như cố định trong ngắn hạn - và chi phí của các vị trí dự kiến tuyển, phần vẫn còn quyết định được. Khi ban lãnh đạo yêu cầu cắt giảm, ranh giới này là thứ đầu tiên họ cần thấy, và nếu ngân sách không tách sẵn thì cuộc thảo luận sẽ mất vài ngày chỉ để dựng lại nó.",
      },
      {
        type: "closing",
        lines: [
          "Số lượng người là câu hỏi dễ. Thời điểm là câu hỏi quyết định con số.",
          "Bài sau chuyển từ kế hoạch cả năm sang thứ cần khi thanh khoản căng: dự báo dòng tiền theo tuần.",
        ],
      },
    ],
  },
  {
    id: 1513,
    slug: "du-bao-dong-tien-13-tuan",
    title: "Kế hoạch, Bài 3: Dự báo dòng tiền 13 tuần - công cụ dùng khi tiền mặt trở thành ràng buộc",
    subtitle: "Vì sao một doanh nghiệp đang có lãi vẫn phải đếm tiền theo tuần, và bảng đó gồm những gì",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "📅",
    track: "professional",
    whyItMatters:
      "Doanh nghiệp không phá sản vì lỗ, mà vì hết tiền. Khi thanh khoản căng, báo cáo tháng đến quá muộn và ngân sách năm trở nên vô nghĩa. Bảng dòng tiền 13 tuần là công cụ tiêu chuẩn trong tình huống đó, và cũng là thứ ngân hàng hay quỹ đầu tư sẽ yêu cầu đầu tiên.",
    openingQuestion:
      "Vì sao dự báo dòng tiền ngắn hạn lại lập theo tuần chứ không theo tháng?",
    openingOptions: [
      "Vì chuẩn mực kế toán quy định kỳ báo cáo dòng tiền tối thiểu là một tuần",
      "Vì trong một tháng, tiền có thể chạm đáy vào giữa kỳ rồi hồi lại, và con số cuối tháng che mất điều đó",
      "Vì dữ liệu theo tuần chính xác hơn dữ liệu theo tháng",
      "Vì ngân hàng chỉ chấp nhận báo cáo theo tuần",
    ],
    correctOption: 1,
    explanation:
      "Một doanh nghiệp có thể kết thúc mọi tháng với số dư tiền dương mà vẫn mất khả năng thanh toán vào ngày 20, khi lương và tiền hàng rơi vào cùng một tuần còn tiền khách hàng chưa về. Bảng theo tháng làm phẳng chuyện đó thành một con số cuối kỳ đẹp. Con số 13 tuần tương ứng một quý - đủ dài để thấy vấn đề trước khi nó xảy ra, đủ ngắn để từng tuần vẫn dự báo được có căn cứ.",
    diagram: [
      { label: "Tiền đầu tuần", arrow: true },
      { label: "Thu: theo hóa đơn và hạn thanh toán thật", arrow: true },
      { label: "Chi: lương, nhà cung cấp, thuế, nợ vay", arrow: true },
      { label: "Tiền cuối tuần so với mức tối thiểu" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Nhà thầu xây dựng có lãi nhưng suýt mất thanh khoản",
      description:
        "Doanh nghiệp ghi nhận lợi nhuận dương cả bốn quý, nhưng khách hàng thanh toán theo tiến độ nghiệm thu, thường chậm 60 đến 90 ngày, trong khi lương công nhân và tiền vật tư phải trả hằng tuần. Nhìn theo tháng thì mọi tháng đều ổn. Nhìn theo tuần thì có bốn tuần trong quý mà số dư tiền xuống dưới mức tối thiểu cần để trả lương. Bảng 13 tuần cho thấy điều đó từ sáu tuần trước, đủ thời gian để đàm phán ứng trước với một khách hàng lớn thay vì phải vay nóng.",
    },
    quiz: [
      {
        question: "Vì sao bảng 13 tuần lập theo dòng tiền thực chứ không theo doanh thu ghi nhận?",
        options: [
          "Vì doanh thu ghi nhận theo nguyên tắc dồn tích có thể chưa thu được tiền về",
          "Vì doanh thu ghi nhận luôn thấp hơn số tiền thực tế mà doanh nghiệp nhận được",
          "Vì các chuẩn mực kế toán không cho phép dùng doanh thu trong tài liệu dự báo",
          "Vì số liệu doanh thu chỉ được chốt vào cuối tháng nên không kịp cho báo cáo tuần",
        ],
        correct: 0,
        explanation:
          "Đây chính là khoảng cách giữa lãi và tiền đã học ở phần kế toán, nhưng đặt vào tình huống mà khoảng cách đó quyết định doanh nghiệp còn tồn tại hay không.",
      },
      {
        question: "Nguồn dữ liệu đáng tin nhất cho phần thu trong bảng 13 tuần là gì?",
        options: [
          "Danh sách hóa đơn đã xuất kèm hạn thanh toán và thói quen trả tiền của từng khách",
          "Kế hoạch doanh thu năm đã được ban lãnh đạo phê duyệt từ đầu năm tài chính",
          "Doanh thu bình quân của cùng kỳ năm trước chia đều cho số tuần trong quý",
          "Dự báo của bộ phận bán hàng về những hợp đồng nhiều khả năng sẽ ký được trong quý tới",
        ],
        correct: 0,
        explanation:
          "Hóa đơn đã xuất là nghĩa vụ đã phát sinh, còn hợp đồng chưa ký chỉ là kỳ vọng. Thói quen trả tiền của từng khách quan trọng không kém hạn ghi trên hóa đơn.",
      },
      {
        question: "Mức tiền tối thiểu trong bảng dòng tiền có vai trò gì?",
        options: [
          "Là ngưỡng cảnh báo: chạm tới nó nghĩa là phải hành động chứ không chờ thêm",
          "Là số tiền doanh nghiệp bắt buộc phải duy trì theo quy định của ngân hàng cho vay",
          "Là số dư mục tiêu mà kế hoạch tài chính năm đặt ra cho thời điểm cuối kỳ",
          "Là mức tiền tối thiểu để được xếp hạng tín nhiệm ở nhóm an toàn",
        ],
        correct: 0,
        explanation:
          "Không có ngưỡng thì bảng chỉ là một dãy số. Có ngưỡng thì mỗi tuần chạm ngưỡng đều tự động sinh ra một việc phải làm, và đó là toàn bộ mục đích của công cụ này.",
      },
      {
        question: "Vì sao bảng 13 tuần phải cập nhật lại hằng tuần thay vì lập một lần cho cả quý?",
        options: [
          "Vì mỗi tuần trôi qua lại có thêm thông tin thật thay thế cho phần đang là giả định",
          "Vì bảng cũ sẽ tự động hết hiệu lực sau bảy ngày theo thông lệ báo cáo tài chính",
          "Vì các khoản chi cố định như lương thay đổi liên tục nên phải nhập lại mỗi tuần",
          "Vì ngân hàng yêu cầu nộp một bản cập nhật mới vào mỗi đầu tuần làm việc",
        ],
        correct: 0,
        explanation:
          "Tuần đầu tiên gần như đã biết chắc, tuần thứ mười ba gần như hoàn toàn là giả định. Cứ mỗi tuần trôi qua, một tuần giả định lại biến thành tuần đã biết, nên bảng luôn giữ được độ tin cậy đó.",
      },
    
    {
      "question": "Vì sao bảng dòng tiền 13 tuần phải cập nhật hằng tuần thay vì lập một lần cho cả quý?",
      "options": [
        "Vì mỗi tuần trôi qua lại có thông tin chắc chắn hơn về các tuần kế tiếp",
        "Vì số dư tiền mặt thực tế luôn khác với số dự báo ban đầu",
        "Vì ngân hàng yêu cầu doanh nghiệp nộp bảng cập nhật theo tuần",
        "Vì bảng cũ bỏ sót các khoản chi mới"
      ],
      "correct": 0,
      "explanation": "Tuần đầu tiên gần như là số chắc chắn, tuần thứ mười ba thì vẫn là ước tính. Cuốn bảng đi mỗi tuần nghĩa là phần chắc chắn luôn nằm ngay trước mặt - đúng lúc tiền mặt là ràng buộc, đó là khác biệt giữa xoay kịp và không kịp."
    }
    ],
    keyTakeaways: [
      "Doanh nghiệp phá sản vì hết tiền, không phải vì lỗ - hai chuyện khác nhau",
      "Theo tuần vì con số cuối tháng che mất đáy giữa kỳ",
      "Phần thu dựa trên hóa đơn đã xuất và thói quen trả tiền, không dựa trên kế hoạch doanh thu",
      "Phải có mức tiền tối thiểu, nếu không bảng chỉ là một dãy số không sinh ra hành động",
      "Cập nhật hằng tuần: mỗi tuần một phần giả định biến thành số đã biết",
    ],
    practicePrompt: {
      question:
        "Bảng 13 tuần cho thấy tuần thứ 7 số dư tiền xuống dưới mức tối thiểu. Hành động hợp lý nhất bây giờ là gì?",
      options: [
        "Chờ thêm vài tuần xem tình hình có tự cải thiện không",
        "Xử lý ngay: giãn một khoản chi lớn, đẩy nhanh thu từ vài khách lớn, hoặc thu xếp hạn mức tín dụng",
        "Cắt giảm nhân sự để giảm chi phí",
        "Ghi nhận và báo cáo trong cuộc họp tháng",
      ],
      correct: 1,
      explanation:
        "Toàn bộ giá trị của công cụ này nằm ở khoảng thời gian sáu tuần bạn vừa có được. Thu xếp hạn mức tín dụng cần vài tuần, đàm phán giãn nợ nhà cung cấp cũng vậy - làm sớm thì còn là đàm phán, làm muộn thì thành xin cứu. Cắt nhân sự vừa quá chậm để giải quyết vấn đề tuần thứ 7, vừa không đảo ngược được.",
    },
    summary: {
      keyIdea: "Khi thanh khoản căng, kỳ báo cáo phải rút ngắn lại cho khớp tốc độ vấn đề",
      commonMistake: "Yên tâm vì mọi tháng đều kết thúc với số dư dương, trong khi đáy nằm ở giữa tháng",
      action: "Dựng bảng 13 tuần với ba dòng thu và năm dòng chi lớn nhất, rồi đặt một mức tiền tối thiểu.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lập bảng cho quý tới: mỗi cột một tuần, dòng đầu là tiền đầu tuần, phần thu lấy từ danh sách hóa đơn đã xuất theo hạn thanh toán, phần chi gồm lương, nhà cung cấp, thuế và nợ vay. Đánh dấu mọi tuần mà số dư cuối tuần xuống dưới ngưỡng bạn đặt.",
      secondary: "Sau bốn tuần, so bản dự báo tuần đầu tiên với thực tế - sai số đó cho biết bảng của bạn đáng tin đến đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài này là nơi khoảng cách giữa lợi nhuận và dòng tiền - thứ đã học ở phần kế toán - trở thành câu hỏi sống còn thay vì một điểm lý thuyết.",
      },
      {
        type: "heading",
        text: "Vì sao đúng 13 tuần",
      },
      {
        type: "list",
        items: [
          "13 tuần tương ứng một quý, khớp với chu kỳ báo cáo và chu kỳ đàm phán với ngân hàng",
          "Đủ dài để thấy vấn đề trước khi nó xảy ra: sáu đến tám tuần là khoảng thời gian cần để thu xếp hạn mức tín dụng hoặc đàm phán giãn nợ",
          "Đủ ngắn để từng tuần vẫn dựa được trên hóa đơn và nghĩa vụ đã phát sinh, thay vì trên kỳ vọng",
          "Cập nhật hằng tuần nên luôn có 13 tuần phía trước, trong đó tuần gần nhất gần như chắc chắn",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ngân sách năm",
          text: "Trả lời câu hỏi năm nay chúng ta định làm gì và cần bao nhiêu nguồn lực. Lập theo tháng hoặc quý, dựa trên kế hoạch, và mất ý nghĩa rất nhanh khi thanh khoản căng.",
        },
        right: {
          label: "Bảng 13 tuần",
          text: "Trả lời câu hỏi tuần nào chúng ta thiếu tiền và thiếu bao nhiêu. Lập theo tuần, dựa trên nghĩa vụ đã phát sinh, và là công cụ duy nhất dùng được trong khủng hoảng thanh khoản.",
        },
      },
      {
        type: "callout",
        label: "Ai sẽ đòi xem bảng này",
        text: "Ngân hàng khi xem xét cấp hoặc gia hạn hạn mức, quỹ đầu tư khi doanh nghiệp gọi vốn trong tình thế khó, và đơn vị tư vấn tái cấu trúc ngay trong tuần đầu tiên vào việc. Ở cả ba trường hợp, việc doanh nghiệp đã có sẵn bảng này và cập nhật đều đặn nói lên nhiều điều về chất lượng quản trị, độc lập với những con số nằm trong đó.",
      },
      {
        type: "closing",
        lines: [
          "Lãi là một ý kiến kế toán, tiền trong tài khoản là một sự thật.",
          "Bài sau quay lại kế hoạch dài hạn, với câu hỏi: một con số duy nhất có đủ không.",
        ],
      },
    ],
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
      "Độ nhạy thay đổi một biến mỗi lần, kịch bản thay đổi cả nhóm biến cùng nhau theo một câu chuyện nhất quán",
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
        "Kế hoạch đạt được nếu tỷ lệ chuyển đổi giữ trên 3,2%; dưới mức đó thì hụt khoảng 15% và ta nên hoãn phần mở rộng",
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
      "Vì cùng một khoản chi phí chung, tiêu thức khác nhau có thể khiến một bộ phận từ lãi thành lỗ",
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
    interactiveType: "profit-calc",
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
      "question": "Vì sao nên báo cáo lợi nhuận bộ phận cả trước và sau khi phân bổ chi phí chung?",
      "options": [
        "Vì phần trước phân bổ mới đo được điều bộ phận thực sự kiểm soát",
        "Vì chuẩn mực kế toán yêu cầu trình bày hai mức lợi nhuận cho mỗi bộ phận",
        "Vì con số sau phân bổ luôn thấp hơn nên không dùng để so sánh được",
        "Vì hai con số dùng cho hai kỳ khác nhau"
      ],
      "correct": 0,
      "explanation": "Người phụ trách một mảng không quyết được tiền thuê trụ sở hay chi phí phòng pháp chế. Chấm họ trên con số đã gánh những khoản đó là chấm trên thứ họ không đổi được - còn bỏ hẳn phần phân bổ thì lại không ai thấy chi phí chung đang phình ra."
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
    id: 1516,
    slug: "bo-bao-cao-quan-tri-hang-thang",
    title: "Kế hoạch, Bài 6: Nhịp tháng của FP&A - đóng sổ, giải thích và ngồi cùng phòng ban",
    subtitle: "Bộ báo cáo quản trị gồm gì, viết phần bình luận thế nào, và vì sao phần lớn giá trị nằm ngoài bảng số",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "professional",
    whyItMatters:
      "Ngân sách lập một lần mỗi năm, còn nhịp tháng thì lặp lại mười hai lần. Chất lượng của một bộ phận FP&A thể hiện ở nhịp này nhiều hơn ở bản ngân sách, và đây cũng là phần công việc mà người mới vào nghề sẽ làm ngay từ tháng đầu tiên.",
    openingQuestion:
      "Phần nào của bộ báo cáo quản trị hằng tháng tạo ra nhiều giá trị nhất?",
    openingOptions: [
      "Bảng số liệu đầy đủ và chính xác đến từng đồng",
      "Phần bình luận giải thích vì sao số liệu lệch kế hoạch và điều đó nghĩa là gì",
      "Các biểu đồ trực quan hóa xu hướng",
      "Phần so sánh với cùng kỳ năm trước",
    ],
    correctOption: 1,
    explanation:
      "Bảng số ai cũng xuất được từ hệ thống, và với công cụ ngày nay việc đó ngày càng tự động. Thứ không tự động được là câu trả lời cho câu hỏi vì sao: doanh thu hụt vì mất một khách lớn hay vì cả thị trường chậm lại, và hai nguyên nhân đó dẫn tới hai hành động khác nhau. Một bộ báo cáo chỉ có số mà không có phần này đẩy toàn bộ việc diễn giải sang người đọc - những người có ít thời gian hơn và ít dữ liệu hơn bạn.",
    diagram: [
      { label: "Đóng sổ và chốt số", arrow: true },
      { label: "So thực tế với kế hoạch, tách nguyên nhân", arrow: true },
      { label: "Hỏi phòng ban để hiểu chuyện đằng sau số", arrow: true },
      { label: "Viết bình luận và cập nhật dự báo" },
    ],
    realWorldExample: {
      company: "Hai kiểu bình luận cho cùng một chênh lệch",
      description:
        "Kiểu thứ nhất: chi phí bán hàng vượt kế hoạch 12%, tương đương 3,2 tỷ đồng. Đây là mô tả lại con số mà người đọc vừa nhìn thấy. Kiểu thứ hai: chi phí bán hàng vượt 3,2 tỷ, trong đó 2,5 tỷ là do chương trình khuyến mãi tháng 9 được kéo dài thêm hai tuần theo quyết định ngày 8/9, phần còn lại là chi phí vận chuyển tăng theo giá xăng. Chương trình khuyến mãi đã mang về thêm 9 tỷ doanh thu, nên xét riêng thì có hiệu quả, nhưng phần vượt chi này chưa nằm trong dự báo quý bốn và cần được duyệt bổ sung. Kiểu thứ hai mất thêm hai cuộc gọi và tạo ra một quyết định.",
    },
    quiz: [
      {
        question: "Vì sao FP&A cần trao đổi trực tiếp với các phòng ban trước khi viết bình luận?",
        options: [
          "Vì nguyên nhân thật đằng sau một chênh lệch thường không nằm trong bất kỳ hệ thống số liệu nào",
          "Vì các phòng ban phải ký xác nhận vào số liệu trước khi bộ báo cáo được phát hành ra bên ngoài",
          "Vì hệ thống kế toán thường ghi nhận sai và cần phòng ban đối chiếu lại từng khoản mục",
          "Vì đây là yêu cầu bắt buộc trong quy trình kiểm soát nội bộ của phần lớn doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "Hệ thống ghi lại rằng chi phí tăng 3,2 tỷ. Chuyện một chương trình khuyến mãi được kéo dài theo quyết định miệng trong cuộc họp thì không hệ thống nào ghi.",
      },
      {
        question: "Bình luận variance tốt cần có gì ngoài con số chênh lệch?",
        options: [
          "Nguyên nhân cụ thể, đánh giá đây là chênh lệch một lần hay còn lặp lại, và việc cần làm tiếp",
          "So sánh với cùng kỳ của ít nhất ba năm trước để thấy được xu hướng dài hạn",
          "Danh sách đầy đủ tất cả các khoản mục có phát sinh chênh lệch dù lớn hay nhỏ trong kỳ báo cáo",
          "Tỷ lệ phần trăm chênh lệch tính trên cả số kế hoạch lẫn số thực tế của kỳ trước",
        ],
        correct: 0,
        explanation:
          "Phần phân biệt một lần hay lặp lại là quan trọng nhất và hay bị bỏ sót: nó quyết định dự báo các kỳ sau có phải sửa hay không.",
      },
      {
        question: "Vì sao nên đặt ngưỡng trọng yếu cho việc giải thích chênh lệch?",
        options: [
          "Để tập trung vào các khoản đủ lớn để đáng hành động, thay vì giải thích mọi dòng",
          "Vì chuẩn mực kế toán có quy định mức trọng yếu bắt buộc cho báo cáo quản trị nội bộ",
          "Để giảm số trang của bộ báo cáo xuống mức mà ban lãnh đạo yêu cầu tối đa",
          "Vì các khoản chênh lệch nhỏ thường là do lỗi hệ thống nên không cần giải thích",
        ],
        correct: 0,
        explanation:
          "Giải thích cả trăm dòng khiến ba dòng thực sự quan trọng chìm mất. Ngưỡng thường đặt theo cả giá trị tuyệt đối lẫn tỷ lệ, vì một khoản nhỏ lệch 80% cũng đáng chú ý.",
      },
      {
        question: "Sau khi phân tích tháng, dự báo các kỳ còn lại nên xử lý thế nào?",
        options: [
          "Cập nhật nếu nguyên nhân chênh lệch còn tiếp diễn, và giữ nguyên nếu đó là việc một lần",
          "Luôn giữ nguyên theo kế hoạch đã duyệt để bảo đảm tính nhất quán trong so sánh cả năm",
          "Luôn cập nhật lại toàn bộ theo số thực tế mới nhất của tháng vừa kết thúc",
          "Chỉ cập nhật vào cuối mỗi quý theo đúng lịch phê duyệt của ban lãnh đạo",
        ],
        correct: 0,
        explanation:
          "Đây chính là cơ chế của rolling forecast đã học ở chặng CFO & Vận hành, và cũng là chỗ phán đoán một lần hay lặp lại ở trên phát huy tác dụng.",
      },
    
    {
      "question": "Sau khi phân tích kết quả tháng, phần dự báo cho các kỳ còn lại nên xử lý thế nào?",
      "options": [
        "Cập nhật lại nếu nguyên nhân chênh lệch còn ảnh hưởng tới các kỳ sau",
        "Giữ nguyên để bảo toàn tính so sánh với kế hoạch đã được phê duyệt",
        "Điều chỉnh các kỳ còn lại để bù đúng phần đã hụt trong tháng vừa rồi",
        "Chỉ cập nhật một lần vào giữa năm theo lịch rà soát ngân sách"
      ],
      "correct": 0,
      "explanation": "Mất một khách hàng lớn không phải sự kiện của riêng tháng này. Câu hỏi phải trả lời sau mỗi lần đóng sổ là nguyên nhân đó có kéo dài không - còn việc điều chỉnh các kỳ sau để tổng năm vẫn khớp kế hoạch chỉ là dời vấn đề sang tháng Mười hai."
    }
    ],
    keyTakeaways: [
      "Bảng số ai cũng xuất được; phần bình luận vì sao mới là thứ không tự động hóa được",
      "Nguyên nhân thật thường không nằm trong hệ thống - phải hỏi phòng ban",
      "Bình luận tốt nêu nguyên nhân, phân biệt một lần hay lặp lại, và đề xuất việc cần làm",
      "Đặt ngưỡng trọng yếu để ba dòng quan trọng không chìm giữa cả trăm dòng",
      "Chênh lệch còn tiếp diễn thì phải sửa dự báo các kỳ sau",
    ],
    practicePrompt: {
      question:
        "Doanh thu tháng vượt kế hoạch 15% nhờ một hợp đồng lớn ký sớm hơn dự kiến một quý. Bình luận nên viết thế nào?",
      options: [
        "Doanh thu vượt kế hoạch 15%, kết quả tích cực",
        "Vượt 15% do hợp đồng X ký sớm hơn một quý; đây là dịch chuyển thời điểm, nên quý sau sẽ hụt tương ứng và dự báo cần điều chỉnh",
        "Doanh thu vượt kế hoạch, đề nghị nâng chỉ tiêu các quý còn lại",
        "Cần thêm thời gian để đánh giá xu hướng",
      ],
      correct: 1,
      explanation:
        "Đây là dạng chênh lệch nguy hiểm nhất vì nó trông như tin tốt. Doanh thu không hề tăng thêm, nó chỉ chuyển từ quý sau về quý này. Bình luận không chỉ ra điều đó sẽ dẫn tới việc nâng chỉ tiêu các quý còn lại - đúng lúc quý sau sắp hụt vì chính hợp đồng đã được ghi nhận sớm.",
    },
    summary: {
      keyIdea: "Giá trị của FP&A nằm ở phần giải thích và phần ngồi cùng phòng ban, không nằm ở bảng số",
      commonMistake: "Viết bình luận bằng cách diễn đạt lại con số mà người đọc vừa nhìn thấy",
      action: "Với mỗi chênh lệch vượt ngưỡng, viết đủ ba phần: vì sao, một lần hay lặp lại, và cần làm gì.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy báo cáo tháng gần nhất và viết lại phần bình luận cho ba khoản chênh lệch lớn nhất. Với mỗi khoản, gọi điện cho người phụ trách trước khi viết. So bản mới với bản cũ xem có thêm được thông tin gì mà hệ thống không có.",
      secondary: "Nếu cuộc gọi không mang lại thông tin nào mới, khả năng cao là bạn chưa hỏi đúng người.",
    },
    sections: [
      {
        type: "lead",
        text: "Ngân sách là sự kiện mỗi năm một lần. Nhịp tháng lặp lại mười hai lần, và đó là nơi một bộ phận FP&A thực sự được đánh giá.",
      },
      {
        type: "heading",
        text: "Bốn bước của một chu kỳ tháng",
      },
      {
        type: "list",
        items: [
          "Đóng sổ và chốt số: phối hợp với kế toán để có số cuối cùng, thường trong 3 đến 7 ngày làm việc đầu tháng",
          "So sánh và tách nguyên nhân: thực tế với kế hoạch và với dự báo gần nhất, tách chênh lệch theo yếu tố như bài đầu chặng đã dựng",
          "Hỏi phòng ban: phần chiếm nhiều thời gian nhất và tạo ra nhiều giá trị nhất, vì nguyên nhân thật không nằm trong hệ thống",
          "Viết bình luận và cập nhật dự báo: chốt lại thành tài liệu và sửa dự báo các kỳ còn lại nếu nguyên nhân còn tiếp diễn",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bình luận yếu",
          text: "Diễn đạt lại con số bằng lời: chi phí vượt 12%. Không nêu nguyên nhân, không phân biệt một lần hay lặp lại, không dẫn tới việc gì. Người đọc vẫn phải tự đi tìm hiểu.",
        },
        right: {
          label: "Bình luận mạnh",
          text: "Tách chênh lệch thành các nguyên nhân cụ thể có tên và có ngày, nói rõ phần nào sẽ lặp lại, và kết thúc bằng một đề xuất cần được quyết định.",
        },
      },
      {
        type: "callout",
        label: "Business partnering là phần nghề, không phải phần mềm",
        text: "Người làm FP&A giỏi được các phòng ban chủ động gọi trước khi ra quyết định, thay vì bị xem là bộ phận đi đòi số liệu và cắt ngân sách. Khác biệt đó không đến từ mô hình hay công cụ, mà từ việc có mặt đủ nhiều để hiểu hoạt động thật, và từ việc mang tới câu trả lời cho vấn đề của họ chứ không chỉ mang tới câu hỏi về chênh lệch.",
      },
      {
        type: "closing",
        lines: [
          "Bảng số là điều kiện cần. Việc ai đó thay đổi quyết định vì bảng số ấy mới là kết quả.",
          "Chặng này khép lại phần lập kế hoạch: từ dựng con số, tới thử nó chịu được gì, tới giải thích khi nó lệch.",
        ],
      },
    ],
  },
];
