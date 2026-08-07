import type { Lesson } from "./lesson-types";

// Ba lỗ hổng của chặng "Đọc 3 báo cáo tài chính" (bài 41-60), tìm ra bằng cách
// đếm chứ không bằng cách đọc lướt:
//
// 1. THUYẾT MINH. 43 bài trong kho có nhắc tới thuyết minh, nhưng không bài nào
//    dạy cách đọc nó - trong khi đó mới là nơi chứa chính sách kế toán, nợ ngoài
//    bảng, giao dịch bên liên quan và thuế hoãn lại. Người học xong chặng biết
//    đọc ba bảng số và không biết phần chữ dài gấp ba đó dùng để làm gì.
// 2. PHÂN TÍCH THEO TỶ TRỌNG. Không bài nào có "common-size" hay "tỷ trọng"
//    trong tiêu đề. Bài 80 dạy dùng tỷ số để so sánh doanh nghiệp, nhưng bước
//    chuẩn hoá báo cáo về cùng một mẫu số - việc phải làm TRƯỚC khi so - thì
//    không có ở đâu.
// 3. Ý KIẾN KIỂM TOÁN. Có tám bài nhắc tới nó trong tiêu đề, tất cả đều nằm ở
//    chuyên đề kiểm toán (1531-1535). Người đi theo lộ trình ngày-qua-ngày của
//    chặng 26-60 không gặp khái niệm "ý kiến ngoại trừ" ở bất kỳ đâu, dù nó là
//    dòng đầu tiên đáng đọc của một bộ báo cáo.
//
// Đặt ở file riêng thay vì nhét vào lib/lessons.ts: file kia đang là 60 nghìn
// dòng và có phiên khác làm việc trên đó cùng lúc.

export const READING_STATEMENTS_LESSONS: Lesson[] = [
  {
    id: 1690,
    slug: "doc-thuyet-minh-bao-cao-tai-chinh",
    title: "Đọc thuyết minh - phần dài nhất và ít người đọc nhất",
    subtitle: "Ba bảng số nói doanh nghiệp lãi bao nhiêu; thuyết minh nói con số đó được tạo ra thế nào",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "professional",
    whyItMatters:
      "Ba báo cáo chính chiếm khoảng ba trang; thuyết minh thường dài gấp mười. Gần như mọi thứ khiến một con số đáng ngờ đều nằm ở phần dài hơn đó, và nó được viết ra chính vì bảng số không đủ chỗ để nói.",
    openingQuestion:
      "Hai doanh nghiệp cùng ngành, cùng doanh thu 1.000 tỷ, cùng lợi nhuận 80 tỷ. Đọc ở đâu để biết hai con số 80 tỷ đó có so sánh được với nhau không?",
    openingOptions: [
      "Thuyết minh - chính sách kế toán quyết định con số",
      "Bảng cân đối, vì tổng tài sản phản ánh đúng quy mô thật của doanh nghiệp",
      "Lưu chuyển tiền tệ, vì dòng tiền không chịu ảnh hưởng của chính sách nào",
      "Không cần đọc thêm - hai doanh nghiệp cùng ngành thì cùng cách ghi nhận",
    ],
    correctOption: 0,
    explanation:
      "Hai doanh nghiệp cùng ngành vẫn có thể chọn phương pháp khấu hao khác nhau, thời điểm ghi nhận doanh thu khác nhau, cách tính giá trị hàng tồn kho khác nhau - và mọi lựa chọn đó đều hợp lệ. Chúng được công bố ở thuyết minh chứ không ở ba bảng số. Bảng cân đối và báo cáo lưu chuyển tiền tệ đều là kết quả của những lựa chọn ấy, nên đọc chúng mà không đọc chính sách kế toán là so hai con số chưa chắc cùng đơn vị đo. Đây cũng là lý do phân tích viên chuyên nghiệp đọc thuyết minh trước, rồi mới quay lại bảng số.",
    diagram: [
      { label: "Chính sách kế toán: cùng sự việc, con số nào?", arrow: true },
      { label: "Thuyết minh từng khoản mục: con số đó gồm những gì", arrow: true },
      { label: "Nợ tiềm tàng và cam kết: nghĩa vụ chưa lên bảng cân đối", arrow: true },
      { label: "Bên liên quan: doanh thu này bán cho ai" },
    ],
    realWorldExample: {
      company: "Doanh nghiệp bất động sản ghi nhận doanh thu bán căn hộ",
      description:
        "Ghi nhận khi bàn giao căn hộ hay ghi nhận dần theo tiến độ xây dựng là hai lựa chọn khác nhau, và chênh lệch có thể là cả nghìn tỷ doanh thu rơi vào năm này thay vì năm sau. Hai doanh nghiệp cạnh nhau có thể chọn khác nhau, và chỗ duy nhất nói rõ là mục chính sách kế toán trong thuyết minh.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba báo cáo chính trả lời câu hỏi 'bao nhiêu'. Thuyết minh trả lời câu hỏi 'bằng cách nào' - và với gần như mọi tranh cãi về chất lượng lợi nhuận, câu trả lời nằm ở câu hỏi thứ hai.",
      },
      { type: "heading", text: "Bốn chỗ đáng đọc trước tiên" },
      {
        type: "conceptTable",
        title: "Đọc theo thứ tự này, không đọc từ đầu tới cuối",
        subtitle: "Thuyết minh dài hàng chục trang; bốn mục dưới đây chiếm phần lớn giá trị",
        concepts: [
          {
            vi: "Chính sách kế toán",
            en: "Accounting policies",
            def: "Khấu hao đường thẳng hay nhanh, doanh thu ghi khi nào, hàng tồn kho tính theo phương pháp nào. Đọc mục này trước vì nó quyết định mọi con số phía sau. Doanh nghiệp đổi chính sách giữa chừng bắt buộc phải nêu, và đó luôn là điều đáng hỏi vì sao.",
          },
          {
            vi: "Nợ tiềm tàng và cam kết",
            en: "Contingent liabilities & commitments",
            def: "Bảo lãnh cho công ty liên kết, vụ kiện đang xử, cam kết thuê và mua hàng dài hạn. Đây là nghĩa vụ có thật nhưng chưa đủ điều kiện lên bảng cân đối, nên một doanh nghiệp nhìn có vẻ ít nợ vẫn có thể đang gánh rất nhiều.",
          },
          {
            vi: "Giao dịch bên liên quan",
            en: "Related party transactions",
            def: "Bán hàng cho công ty do chủ tịch sở hữu, vay từ cổ đông lớn, thuê nhà xưởng của người nhà. Không phải cứ có là xấu, nhưng doanh thu đến từ bên liên quan không cùng chất lượng với doanh thu bán cho thị trường - nó không chứng minh sản phẩm bán được.",
          },
          {
            vi: "Thuyết minh từng khoản mục lớn",
            en: "Line item breakdowns",
            def: "Dòng 'Chi phí khác 200 tỷ' trên báo cáo kết quả được tách ra ở đây. Một khoản mục lớn bất thường mà thuyết minh chỉ nói một câu chung chung là dấu hiệu cần hỏi thêm.",
          },
        ],
      },
      { type: "heading", text: "Cùng một chiếc máy, hai con số lợi nhuận" },
      {
        type: "paragraph",
        text: "Doanh nghiệp A và B cùng mua một dây chuyền 100 tỷ, đời 10 năm, không giá trị thanh lý. A khấu hao đường thẳng: 10 tỷ mỗi năm, đều đặn. B khấu hao theo số dư giảm dần kép: năm đầu (2/10) × 100 = 20 tỷ. Cùng một tài sản, cùng một năm, chênh lệch chi phí 10 tỷ - và nếu cả hai có lợi nhuận trước khấu hao 50 tỷ thì A báo lãi 40 tỷ còn B báo 30 tỷ. Không ai làm sai cả. Muốn so sánh, phải đọc chính sách khấu hao của từng bên rồi quy về cùng một phương pháp, và chính sách đó chỉ có ở thuyết minh.",
      },
      {
        type: "callout",
        label: "Dấu hiệu đáng dừng lại",
        text: "Thuyết minh đổi cách trình bày so với năm trước mà không giải thích; một khoản mục lớn được gộp vào 'khác'; chính sách kế toán thay đổi đúng năm doanh nghiệp cần đạt một chỉ tiêu nào đó; hoặc phần bên liên quan dài ra nhanh hơn doanh thu. Không dấu hiệu nào tự nó là bằng chứng sai phạm - chúng là những chỗ cần đọc kỹ hơn phần còn lại.",
      },
      {
        type: "list",
        items: [
          "Đọc chính sách kế toán TRƯỚC khi đọc bảng số, không phải ngược lại",
          "Nợ tiềm tàng là nghĩa vụ thật; bảng cân đối không có chỗ cho nó",
          "Doanh thu từ bên liên quan không chứng minh sản phẩm bán được ra thị trường",
          "Hai doanh nghiệp cùng ngành chỉ so được sau khi quy về cùng chính sách kế toán",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảng số là kết luận; thuyết minh là cách kết luận đó được rút ra.",
          "Bài tiếp theo: quy hai doanh nghiệp khác quy mô về cùng một thước để so sánh.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Vì sao đọc chính sách kế toán trong thuyết minh trước khi so sánh lợi nhuận hai doanh nghiệp cùng ngành?",
        options: [
          "Vì cùng một sự việc có thể được ghi nhận thành hai con số khác nhau một cách hoàn toàn hợp lệ",
          "Vì thuyết minh đã nêu sẵn con số điều chỉnh về cùng một cơ sở để so trực tiếp giữa hai doanh nghiệp",
          "Vì doanh nghiệp niêm yết buộc phải dùng cùng chính sách với đối thủ đầu ngành",
          "Vì chính sách kế toán quyết định thuế suất doanh nghiệp phải nộp trong năm",
        ],
        correct: 0,
        explanation:
          "Khấu hao đường thẳng hay nhanh, ghi nhận doanh thu khi bàn giao hay theo tiến độ - đều hợp lệ, và đều cho ra lợi nhuận khác nhau. Thuyết minh không tính sẵn số đã điều chỉnh, cũng không ràng buộc doanh nghiệp theo đối thủ; và thuế được xác định theo luật thuế chứ không theo chính sách kế toán. Việc quy hai bên về cùng một cơ sở là việc người đọc phải tự làm.",
      },
      {
        question: "Nợ tiềm tàng khác nợ trên bảng cân đối ở điểm nào?",
        options: [
          "Nó phụ thuộc một sự kiện tương lai chưa chắc xảy ra nên chưa đủ điều kiện ghi nhận",
          "Nó là nợ đã trả xong nhưng vẫn phải theo dõi thêm ba năm",
          "Nó là nợ ngắn hạn nên được tách riêng sang phần thuyết minh",
          "Nó là nợ lãi suất thả nổi nên chưa xác định được số tiền phải trả",
        ],
        correct: 0,
        explanation:
          "Bảo lãnh cho công ty liên kết chỉ thành nghĩa vụ nếu công ty đó không trả được; vụ kiện chỉ thành nghĩa vụ nếu doanh nghiệp thua. Chính tính chưa chắc chắn đó khiến khoản mục nằm ở thuyết minh thay vì bảng cân đối - không phải vì kỳ hạn ngắn hay vì lãi suất thả nổi, và càng không phải vì nó đã được thanh toán.",
      },
      {
        question:
          "Một doanh nghiệp có 60% doanh thu đến từ các công ty do chủ tịch sở hữu. Vì sao đây là điều đáng chú ý?",
        options: [
          "Vì doanh thu đó chưa chứng minh sản phẩm bán được cho thị trường bên ngoài",
          "Vì giao dịch với bên liên quan bị pháp luật cấm nên báo cáo đang vi phạm quy định",
          "Vì doanh thu từ bên liên quan luôn phải loại bỏ toàn bộ khi lập báo cáo hợp nhất",
          "Vì các khoản đó chắc chắn là ghi khống để làm đẹp sổ",
        ],
        correct: 0,
        explanation:
          "Giao dịch bên liên quan hợp pháp và phải công bố, không bị cấm. Vấn đề là chất lượng thông tin: giá bán có thể do hai bên tự thoả thuận, và nhu cầu có thể biến mất khi quan hệ sở hữu thay đổi. Nói nó chắc chắn là ghi khống thì đi quá xa; nói phải loại bỏ toàn bộ cũng sai - chỉ giao dịch nội bộ trong cùng tập đoàn hợp nhất mới bị loại trừ.",
      },
      {
        question:
          "Doanh nghiệp A khấu hao đường thẳng, B dùng số dư giảm dần kép, cùng một dây chuyền 100 tỷ đời 10 năm. Năm đầu, chi phí khấu hao chênh nhau bao nhiêu?",
        options: [
          "10 tỷ (A: 100/10 = 10 tỷ; B: (2/10) × 100 = 20 tỷ, chênh đúng một lần khấu hao năm)",
          "0 tỷ (= tổng khấu hao cả đời của hai phương pháp bằng nhau nên chi phí từng năm cũng phải bằng)",
          "20 tỷ (= 30 − 10, do dùng nhầm hệ số 3 lần đường thẳng thay vì hệ số 2)",
          "5 tỷ (= 15 − 10, do tính hệ số kép trên nửa nguyên giá)",
        ],
        correct: 0,
        explanation:
          "Đường thẳng: 100/10 = 10 tỷ. Số dư giảm dần kép năm đầu: (2/10) × 100 = 20 tỷ. Chênh 10 tỷ. Tổng khấu hao cả đời đúng là bằng nhau, nhưng đó chính là điểm mấu chốt - phương pháp chỉ đổi chỗ chi phí giữa các năm, nên so sánh lợi nhuận MỘT năm giữa hai doanh nghiệp khác phương pháp là so hai thứ khác nhau. Hệ số của phương pháp kép là 2, không phải 3.",
      },
      {
        question: "Đâu là dấu hiệu trong thuyết minh đáng đọc kỹ hơn phần còn lại?",
        options: [
          "Chính sách kế toán thay đổi đúng vào năm doanh nghiệp cần đạt một chỉ tiêu nào đó",
          "Thuyết minh dài hơn cả ba báo cáo chính cộng lại, cho thấy trình bày quá rườm rà",
          "Doanh nghiệp có nêu giao dịch với bên liên quan trong phần cuối thuyết minh",
          "Có mục nợ tiềm tàng, vì doanh nghiệp lành mạnh sẽ không phát sinh khoản này",
        ],
        correct: 0,
        explanation:
          "Đổi chính sách là hợp lệ nhưng phải giải thích, và thời điểm đổi trùng với lúc cần đạt chỉ tiêu là lý do để đọc kỹ. Thuyết minh dài hơn ba bảng số là chuyện bình thường ở mọi doanh nghiệp. Công bố bên liên quan và nêu nợ tiềm tàng đều là nghĩa vụ minh bạch - có chúng là đúng quy định, không có mới là điều lạ.",
      },
    ],
    practicePrompt: {
      question:
        "Thuyết minh nêu doanh nghiệp đang bảo lãnh khoản vay 900 tỷ cho một công ty liên kết, trong khi vốn chủ sở hữu của chính nó là 1.200 tỷ. Đọc thế nào cho đúng?",
      options: [
        "Một nghĩa vụ tiềm tàng bằng 75% vốn chủ, phải cân nhắc như rủi ro thật",
        "Chưa đáng lo vì khoản bảo lãnh không nằm trên bảng cân đối kế toán",
        "Đáng lo vừa phải vì công ty liên kết vẫn phải tự trả phần của mình trước",
        "Chỉ cần theo dõi nếu kiểm toán viên đã nêu nó thành ý kiến ngoại trừ",
      ],
      correct: 0,
      explanation:
        "Bảo lãnh là nghĩa vụ có điều kiện: nó chỉ thành nợ thật khi bên được bảo lãnh mất khả năng trả, nên nó không được ghi vào bảng cân đối và chỉ xuất hiện trong thuyết minh. Nhưng điều kiện đó là thứ vỡ ra đúng lúc xấu nhất, và 900 tỷ trên nền vốn chủ 1.200 tỷ nghĩa là một lần vỡ nợ của bên kia có thể xoá gần hết vốn chủ của bên này. Lập luận 'chưa nằm trên bảng cân đối nên chưa đáng lo' đảo ngược đúng mục đích của phần thuyết minh. Còn chờ kiểm toán viên nêu ngoại trừ thì quá muộn: ngoại trừ nói về việc kiểm toán viên có xác nhận được con số không, không nói về việc rủi ro lớn hay nhỏ.",
    },
    keyTakeaways: [
      "Ba bảng số nói 'bao nhiêu', thuyết minh nói 'bằng cách nào'",
      "Đọc chính sách kế toán trước, vì nó quyết định mọi con số phía sau",
      "Nợ tiềm tàng và cam kết là nghĩa vụ thật nằm ngoài bảng cân đối",
      "Doanh thu từ bên liên quan không cùng chất lượng với doanh thu thị trường",
    ],
    summary: {
      keyIdea: "Thuyết minh là nơi giải thích cách ba bảng số được tạo ra",
      commonMistake: "So sánh lợi nhuận hai doanh nghiệp mà không kiểm tra hai bên có cùng chính sách kế toán không.",
      action: "Mở báo cáo năm gần nhất của một doanh nghiệp bạn quan tâm và đọc riêng mục chính sách kế toán.",
    },
    application: {
      title: "Đọc thử một mục thuyết minh",
      message:
        "Chọn một doanh nghiệp niêm yết, tìm mục chính sách kế toán trong thuyết minh và ghi lại phương pháp khấu hao cùng thời điểm ghi nhận doanh thu. Sau đó làm y hệt với một đối thủ cùng ngành.",
      secondary: "Nếu hai bên khác nhau, bạn vừa tìm ra lý do lợi nhuận của họ không so trực tiếp được.",
    },
  },

  {
    id: 1691,
    slug: "phan-tich-bao-cao-theo-ty-trong",
    title: "Phân tích theo tỷ trọng - so doanh nghiệp nghìn tỷ với doanh nghiệp trăm tỷ",
    subtitle: "Quy mọi khoản mục về phần trăm của một gốc chung, trước khi so bất cứ thứ gì",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Không thể so trực tiếp một doanh nghiệp doanh thu 10.000 tỷ với một doanh nghiệp 500 tỷ - mọi con số của bên lớn đều lớn hơn. Phân tích theo tỷ trọng là bước chuẩn hoá phải làm trước, và cũng là cách nhanh nhất thấy cơ cấu chi phí đang trôi qua từng năm.",
    openingQuestion:
      "Doanh nghiệp A có chi phí bán hàng 200 tỷ, B có 40 tỷ. A tiêu tốn hơn cho việc bán hàng?",
    openingOptions: [
      "Chưa kết luận được - phải quy về phần trăm doanh thu",
      "Đúng, 200 tỷ lớn hơn 40 tỷ nên A tốn kém hơn",
      "Sai, doanh nghiệp lớn có lợi thế quy mô nên A hiệu quả hơn",
      "Đúng, chi phí tuyệt đối phản ánh mức đầu tư cho thị trường",
    ],
    correctOption: 0,
    explanation:
      "Nếu A có doanh thu 10.000 tỷ thì 200 tỷ là 2%; nếu B có doanh thu 500 tỷ thì 40 tỷ là 8%. Tính theo tỷ trọng, B mới là bên tiêu tốn hơn gấp bốn lần cho mỗi đồng doanh thu. Con số tuyệt đối chỉ nói quy mô, không nói hiệu quả. Lợi thế quy mô là một giả thuyết cần kiểm chứng bằng chính phép so tỷ trọng này, không phải một kết luận có sẵn.",
    diagram: [
      { label: "Chọn gốc: doanh thu cho báo cáo KQKD, tổng tài sản cho bảng CĐKT", arrow: true },
      { label: "Chia mọi khoản mục cho gốc đó", arrow: true },
      { label: "So giữa các doanh nghiệp, hoặc giữa các năm của cùng một doanh nghiệp" },
    ],
    interactiveType: "ratios",
    realWorldExample: {
      company: "So một chuỗi bán lẻ lớn với một chuỗi vùng",
      description:
        "Quy cả hai báo cáo về phần trăm doanh thu là cách duy nhất thấy được bên nào có biên gộp cao hơn, bên nào tiêu tốn hơn cho vận hành, và bên nào đang để chi phí quản lý phình ra - những điều mà bảng số tuyệt đối hoàn toàn che mất vì quy mô chênh nhau hai chữ số.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi khoản mục của một doanh nghiệp lớn đều lớn hơn của doanh nghiệp nhỏ. Đó là điều hiển nhiên tới mức vô dụng, và nó khiến hai bảng số đặt cạnh nhau không nói được gì cho tới khi cả hai được quy về cùng một mẫu số.",
      },
      { type: "heading", text: "Hai gốc, hai câu hỏi" },
      {
        type: "comparison",
        left: {
          label: "Báo cáo KQKD: gốc là doanh thu",
          text: "Mỗi dòng thành phần trăm doanh thu. Trả lời: trong 100 đồng bán được, bao nhiêu đồng thành giá vốn, bao nhiêu thành chi phí bán hàng, còn lại bao nhiêu là lợi nhuận.",
        },
        right: {
          label: "Bảng cân đối: gốc là tổng tài sản",
          text: "Mỗi dòng thành phần trăm tổng tài sản. Trả lời: doanh nghiệp giữ của cải dưới dạng gì, và phần nào trong đó là tiền của chủ nợ.",
        },
      },
      { type: "heading", text: "Cùng một bảng, đọc theo hai chiều" },
      {
        type: "paragraph",
        text: "Chiều thứ nhất là so NGANG các doanh nghiệp trong cùng một năm: biên gộp của ta 32% trong khi trung bình ngành 38% - chênh 6 điểm, và đó là câu hỏi cần trả lời. Chiều thứ hai là so DỌC chính doanh nghiệp qua các năm: chi phí quản lý đi từ 6% doanh thu lên 7% rồi 8,5% trong ba năm, trong khi doanh thu vẫn tăng. Con số tuyệt đối của chi phí quản lý tăng là bình thường khi doanh nghiệp lớn lên; tỷ trọng của nó tăng thì không - nó nghĩa là bộ máy phình nhanh hơn việc kinh doanh.",
      },
      {
        type: "callout",
        label: "Chỗ tỷ trọng đánh lừa",
        text: "Khi mẫu số biến động mạnh, tỷ trọng đổi mà tử số không hề đổi. Một doanh nghiệp có doanh thu sụt 30% sẽ thấy mọi khoản chi phí cố định nhảy vọt về tỷ trọng - không phải vì chi tiêu nhiều hơn mà vì bán được ít đi. Nên luôn đọc bảng tỷ trọng cạnh bảng số tuyệt đối, đừng thay thế bảng này bằng bảng kia.",
      },
      {
        type: "list",
        items: [
          "Gốc của báo cáo kết quả kinh doanh là doanh thu; gốc của bảng cân đối là tổng tài sản",
          "So ngang giữa các doanh nghiệp, so dọc giữa các năm - hai câu hỏi khác nhau",
          "Chi phí tăng về số tuyệt đối là bình thường; tăng về tỷ trọng thì cần giải thích",
          "Mẫu số biến động mạnh làm tỷ trọng nhảy mà tử số không đổi",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chuẩn hoá về cùng một mẫu số là việc phải làm trước khi so, không phải một kỹ thuật nâng cao.",
          "Bài tiếp theo: dòng đầu tiên đáng đọc của một bộ báo cáo - ý kiến của kiểm toán viên.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Doanh nghiệp A: doanh thu 10.000 tỷ, chi phí bán hàng 200 tỷ. Doanh nghiệp B: doanh thu 500 tỷ, chi phí bán hàng 40 tỷ. Bên nào tốn kém hơn cho việc bán hàng?",
        options: [
          "B - 40/500 = 8% doanh thu, so với 200/10.000 = 2% của A, tức gấp bốn lần",
          "A - 200 tỷ lớn gấp năm lần con số 40 tỷ mà doanh nghiệp B phải bỏ ra",
          "Bằng nhau, vì tỷ lệ chi phí bán hàng của cả hai đều nằm dưới mức 10% doanh thu",
          "Không so được, vì quy mô doanh thu hai bên quá chênh lệch",
        ],
        correct: 0,
        explanation:
          "200/10.000 = 2%; 40/500 = 8%. B tốn gấp bốn lần A cho mỗi đồng doanh thu. So số tuyệt đối cho kết luận ngược hẳn. Và quy mô chênh lệch chính là lý do phải chuẩn hoá, không phải lý do bỏ cuộc - đó là toàn bộ công dụng của phân tích theo tỷ trọng.",
      },
      {
        question: "Gốc chuẩn hoá của bảng cân đối kế toán là gì?",
        options: [
          "Tổng tài sản - mẫu số duy nhất bao trùm mọi dòng của bảng cân đối kế toán",
          "Doanh thu thuần của kỳ báo cáo, để mọi dòng quy về cùng một thước đo hoạt động",
          "Vốn chủ sở hữu, vì đây là phần giá trị thật sự thuộc về cổ đông",
          "Lợi nhuận sau thuế, vì đây là dòng thể hiện kết quả cả kỳ",
        ],
        correct: 0,
        explanation:
          "Bảng cân đối dùng tổng tài sản làm gốc, báo cáo kết quả kinh doanh dùng doanh thu. Lấy doanh thu làm gốc cho bảng cân đối là trộn một đại lượng thời kỳ với một đại lượng thời điểm. Vốn chủ sở hữu và lợi nhuận đều là một khoản mục nằm trong bảng, không phải tổng thể để chia.",
      },
      {
        question:
          "Chi phí quản lý của một doanh nghiệp đi từ 6% lên 8,5% doanh thu trong ba năm, trong khi doanh thu vẫn tăng. Điều này nói gì?",
        options: [
          "Bộ máy quản lý đang phình nhanh hơn chính việc kinh doanh của doanh nghiệp",
          "Doanh nghiệp đang đầu tư đúng hướng, vì chi phí quản lý tăng đi kèm năng lực vận hành tốt hơn",
          "Bình thường - mọi chi phí đều tăng khi doanh thu tăng",
          "Chưa kết luận được nếu thiếu con số tuyệt đối từng năm",
        ],
        correct: 0,
        explanation:
          "Chi phí quản lý tăng về số tuyệt đối khi doanh nghiệp lớn lên là bình thường - đó chính là lý do phải nhìn tỷ trọng. Tỷ trọng tăng nghĩa là nó tăng NHANH HƠN doanh thu, tức phần chi cho bộ máy đang ăn dần vào biên lợi nhuận. Con số tuyệt đối không thêm thông tin gì ở đây vì tỷ trọng đã tính từ chính nó.",
      },
      {
        question: "Khi nào phân tích theo tỷ trọng dễ dẫn tới kết luận sai?",
        options: [
          "Khi mẫu số biến động mạnh, làm tỷ trọng nhảy dù tử số không hề đổi",
          "Khi hai doanh nghiệp có quy mô doanh thu quá gần nhau nên phần trăm gần trùng",
          "Khi doanh nghiệp có nhiều mảng kinh doanh thuộc các ngành khác nhau",
          "Khi báo cáo được lập theo chuẩn mực IFRS thay vì chuẩn mực trong nước",
        ],
        correct: 0,
        explanation:
          "Doanh thu sụt 30% làm mọi chi phí cố định nhảy vọt về tỷ trọng dù doanh nghiệp không tiêu thêm đồng nào - đó là lý do phải đọc bảng tỷ trọng cạnh bảng số tuyệt đối. Quy mô gần nhau không gây sai lệch, phương pháp không giới hạn theo số mảng kinh doanh, và không chuẩn mực nào cấm trình bày phần trăm.",
      },
      {
        question: "So ngang và so dọc trong phân tích theo tỷ trọng khác nhau ở chỗ nào?",
        options: [
          "So ngang là giữa các doanh nghiệp trong một năm; so dọc là giữa các năm của một bên",
          "So ngang lấy gốc là doanh thu, còn so dọc bắt buộc lấy gốc là tổng tài sản kỳ đó",
          "So ngang áp dụng cho báo cáo KQKD, so dọc chỉ dùng cho bảng cân đối",
          "So ngang là việc của nhà đầu tư, so dọc là việc của kiểm toán viên",
        ],
        correct: 0,
        explanation:
          "Hai chiều trả lời hai câu hỏi khác nhau: ta đứng đâu so với đối thủ, và ta đang đi về đâu so với chính mình. Cả hai đều dùng chung một gốc chuẩn hoá tuỳ theo loại báo cáo, đều áp dụng cho cả hai báo cáo, và đều là công cụ của bất kỳ ai đọc báo cáo.",
      },
    ],
    practicePrompt: {
      question:
        "Năm nay tổng tài sản 4.000 tỷ với hàng tồn kho 900 tỷ; năm trước tổng tài sản 2.500 tỷ với hàng tồn kho 700 tỷ. Bảng tỷ trọng cho thấy điều gì?",
      options: [
        "Tỷ trọng tồn kho giảm từ 28% xuống 22,5%",
        "Tồn kho tăng 200 tỷ nên đang chiếm chỗ nhiều hơn",
        "Tỷ trọng tồn kho tăng từ 22,5% lên 28% năm nay",
        "Chưa kết luận được nếu chưa biết doanh thu hai năm",
      ],
      correct: 0,
      explanation:
        "700/2.500 = 28% và 900/4.000 = 22,5%, nên tồn kho tăng 200 tỷ về số tuyệt đối nhưng thu hẹp về tỷ trọng - tổng tài sản tăng nhanh hơn nó. Đó chính là loại kết luận mà bảng số tuyệt đối không nói ra và bảng tỷ trọng nói ra ngay. Đọc 'tăng 200 tỷ nên chiếm chỗ nhiều hơn' là bỏ qua đúng bước chuẩn hoá mà bài này dạy. Và doanh thu không cần thiết ở đây: gốc chuẩn hoá của bảng cân đối là tổng tài sản, doanh thu là gốc của báo cáo kết quả kinh doanh.",
    },
    keyTakeaways: [
      "Quy mọi khoản mục về phần trăm của một gốc chung trước khi so bất cứ thứ gì",
      "Báo cáo KQKD lấy gốc doanh thu; bảng cân đối lấy gốc tổng tài sản",
      "So ngang giữa doanh nghiệp, so dọc giữa các năm",
      "Đọc bảng tỷ trọng cạnh bảng số tuyệt đối, không thay thế",
    ],
    summary: {
      keyIdea: "Chuẩn hoá về cùng mẫu số là bước bắt buộc trước mọi phép so sánh",
      formula: "Tỷ trọng = Khoản mục / Gốc (doanh thu hoặc tổng tài sản)",
      commonMistake: "So chi phí tuyệt đối giữa hai doanh nghiệp khác quy mô rồi kết luận về hiệu quả.",
      action: "Lấy báo cáo kết quả kinh doanh ba năm gần nhất của một doanh nghiệp và quy mọi dòng về phần trăm doanh thu.",
    },
    application: {
      title: "Dựng bảng tỷ trọng ba năm",
      message:
        "Chọn một doanh nghiệp, lấy báo cáo kết quả kinh doanh ba năm gần nhất, chia mọi dòng cho doanh thu của chính năm đó. Nhìn cột nào đang trôi theo một hướng.",
      secondary: "Dòng nào trôi đều qua ba năm là dòng đáng tìm hiểu nguyên nhân, dù số tuyệt đối trông vẫn bình thường.",
    },
  },

  {
    id: 1692,
    slug: "y-kien-kiem-toan-doc-truoc-tien",
    title: "Ý kiến kiểm toán - dòng đáng đọc trước cả bảng số",
    subtitle: "Bốn loại ý kiến, và vì sao ba trong số đó là lý do dừng lại",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Kiểm toán viên đã đọc bộ báo cáo trước bạn và viết một trang nói họ tin nó tới mức nào. Trang đó nằm ngay đầu báo cáo, dài chưa tới hai phút đọc, và quyết định mọi phân tích phía sau có nghĩa hay không.",
    openingQuestion:
      "Báo cáo kiểm toán ghi 'ý kiến chấp nhận toàn phần'. Điều đó bảo đảm gì?",
    openingOptions: [
      "Báo cáo phản ánh trung thực trên các khía cạnh trọng yếu",
      "Doanh nghiệp có tình hình tài chính lành mạnh, kinh doanh hiệu quả",
      "Mọi con số trong báo cáo chính xác tuyệt đối tới từng đồng",
      "Không có gian lận nào trong kỳ báo cáo được kiểm toán",
    ],
    correctOption: 0,
    explanation:
      "Ý kiến chấp nhận toàn phần nói về chất lượng TRÌNH BÀY, không nói về sức khoẻ doanh nghiệp: một doanh nghiệp đang lỗ nặng và sắp phá sản vẫn có thể nhận ý kiến này nếu nó trình bày trung thực việc mình đang lỗ nặng. Kiểm toán cũng làm việc trên cơ sở trọng yếu và chọn mẫu, nên không bảo đảm từng đồng, và không phải là cuộc điều tra gian lận - phát hiện gian lận là mục tiêu phụ, không phải mục tiêu chính.",
    diagram: [
      { label: "Chấp nhận toàn phần: tin được, đọc tiếp bình thường", arrow: true },
      { label: "Ngoại trừ: tin được TRỪ một khoản mục cụ thể", arrow: true },
      { label: "Trái ngược: không phản ánh trung thực - dừng lại", arrow: true },
      { label: "Từ chối: không đủ cơ sở để có ý kiến - dừng lại" },
    ],
    realWorldExample: {
      company: "Đoạn 'nghi ngờ khả năng hoạt động liên tục'",
      description:
        "Đây không phải một loại ý kiến mà là một đoạn nhấn mạnh có thể đi kèm ý kiến chấp nhận toàn phần. Nó nói kiểm toán viên tin báo cáo được trình bày trung thực, đồng thời tin rằng doanh nghiệp có thể không tồn tại đủ mười hai tháng tới. Bỏ qua đoạn này là bỏ qua cảnh báo mạnh nhất mà một bộ báo cáo có thể phát ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước khi phân tích một con số nào, có một câu hỏi rẻ hơn mọi phép tính: người đã kiểm tra bộ báo cáo này nói gì về nó? Câu trả lời nằm ở trang đầu và mất chưa tới hai phút để đọc.",
      },
      { type: "heading", text: "Bốn loại ý kiến, xếp theo mức độ nghiêm trọng" },
      {
        type: "conceptTable",
        title: "Chỉ loại đầu tiên cho phép đọc tiếp như bình thường",
        subtitle: "Ba loại còn lại đều đổi cách bạn phải đối xử với mọi con số phía sau",
        concepts: [
          {
            vi: "Chấp nhận toàn phần",
            en: "Unqualified / Unmodified",
            def: "Báo cáo phản ánh trung thực và hợp lý trên các khía cạnh trọng yếu. Đây là kết quả bình thường, không phải lời khen - nó nói về cách trình bày, không nói doanh nghiệp làm ăn tốt.",
          },
          {
            vi: "Ngoại trừ",
            en: "Qualified",
            def: "Tin được, TRỪ một khoản mục cụ thể được nêu đích danh. Phần còn lại vẫn dùng được, nhưng khoản mục bị ngoại trừ phải tự đánh giá lại - và nếu nó lớn thì phần lớn phân tích của bạn dựa trên nó.",
          },
          {
            vi: "Trái ngược",
            en: "Adverse",
            def: "Kiểm toán viên kết luận báo cáo KHÔNG phản ánh trung thực. Rất hiếm gặp, vì doanh nghiệp thường sửa trước khi tới mức này. Gặp thì mọi con số trong đó không dùng để phân tích được.",
          },
          {
            vi: "Từ chối đưa ý kiến",
            en: "Disclaimer",
            def: "Kiểm toán viên không thu thập đủ bằng chứng nên không kết luận được gì. Thường vì bị hạn chế phạm vi kiểm tra - và bản thân việc bị hạn chế đã là thông tin.",
          },
        ],
      },
      { type: "heading", text: "Ngoại trừ không phải một cảnh báo chung chung" },
      {
        type: "paragraph",
        text: "Ý kiến ngoại trừ luôn nêu rõ khoản mục nào và vì sao. Ví dụ: kiểm toán viên không chứng kiến được kiểm kê hàng tồn kho đầu kỳ vì được bổ nhiệm sau ngày đó, nên không xác nhận được giá trị tồn kho 800 tỷ. Điều này nghĩa là mọi thứ dẫn xuất từ tồn kho - giá vốn, biên gộp, vòng quay, lợi nhuận - đều mang theo mức không chắc chắn ấy. Việc phải làm là đọc đoạn cơ sở của ý kiến ngoại trừ, xem khoản mục đó lớn cỡ nào so với tổng tài sản, rồi quyết định phân tích của mình còn đứng được không.",
      },
      {
        type: "callout",
        label: "Ba thứ ý kiến kiểm toán KHÔNG bảo đảm",
        text: "Không bảo đảm doanh nghiệp khoẻ mạnh: một doanh nghiệp lỗ triền miên vẫn nhận được ý kiến chấp nhận toàn phần nếu trình bày trung thực việc mình lỗ. Không bảo đảm từng con số chính xác tuyệt đối: kiểm toán làm việc trên cơ sở trọng yếu và chọn mẫu, nên sai sót nhỏ nằm ngoài phạm vi. Không phải cuộc điều tra gian lận: phát hiện gian lận là trách nhiệm nhưng không phải mục tiêu chính, và một gian lận có sự thông đồng của ban điều hành hoàn toàn có thể lọt qua.",
      },
      {
        type: "list",
        items: [
          "Đọc ý kiến kiểm toán trước, mất hai phút và quyết định mọi phân tích phía sau",
          "Chấp nhận toàn phần nói về cách trình bày, không nói doanh nghiệp làm ăn tốt",
          "Ngoại trừ luôn nêu đích danh khoản mục - tìm xem nó lớn cỡ nào",
          "Đoạn nghi ngờ hoạt động liên tục có thể đi kèm ý kiến chấp nhận toàn phần",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ý kiến kiểm toán không nói doanh nghiệp tốt hay xấu - nó nói bộ số này có đáng để bạn bỏ công phân tích không.",
          "Đọc xong ba bài này, bạn đã có đủ khung để quay lại case Apple/Vinamilk với con mắt khác.",
        ],
      },
    ],
    quiz: [
      {
        question: "Ý kiến chấp nhận toàn phần bảo đảm điều gì?",
        options: [
          "Báo cáo phản ánh trung thực và hợp lý trên các khía cạnh trọng yếu của nó",
          "Doanh nghiệp lành mạnh và đủ khả năng tiếp tục hoạt động bình thường",
          "Mọi con số đã được kiểm tra và chính xác tuyệt đối tới từng đồng",
          "Không tồn tại gian lận nào trong kỳ, vì kiểm toán viên đã rà soát toàn bộ giao dịch phát sinh",
        ],
        correct: 0,
        explanation:
          "Ý kiến này nói về chất lượng trình bày, không nói về sức khoẻ: doanh nghiệp lỗ nặng vẫn nhận được nếu trình bày trung thực việc mình lỗ. Kiểm toán làm trên cơ sở trọng yếu và chọn mẫu nên không phủ toàn bộ giao dịch, và phát hiện gian lận không phải mục tiêu chính của một cuộc kiểm toán báo cáo tài chính.",
      },
      {
        question:
          "Kiểm toán viên đưa ý kiến ngoại trừ vì không xác nhận được giá trị hàng tồn kho 800 tỷ. Việc cần làm là gì?",
        options: [
          "Xem khoản mục đó lớn cỡ nào so với tổng tài sản, rồi đánh giá lại phần phân tích phụ thuộc vào nó",
          "Bỏ toàn bộ báo cáo, vì một ý kiến không phải chấp nhận toàn phần khiến mọi số liệu mất giá trị",
          "Đọc bình thường, vì ngoại trừ chỉ là thủ tục hành chính giữa doanh nghiệp và công ty kiểm toán",
          "Chờ báo cáo soát xét giữa niên độ của kỳ kế tiếp, vì khi đó tồn kho sẽ được xác nhận đầy đủ",
        ],
        correct: 0,
        explanation:
          "Ngoại trừ có phạm vi giới hạn và nêu đích danh khoản mục, nên phần còn lại của báo cáo vẫn dùng được - bỏ hết là phản ứng quá mức. Nhưng nó không phải thủ tục hành chính: giá vốn, biên gộp và vòng quay đều dẫn xuất từ tồn kho nên đều mang theo mức không chắc chắn đó. Chờ kỳ sau không giải quyết được vấn đề của kỳ này.",
      },
      {
        question: "'Từ chối đưa ý kiến' khác 'ý kiến trái ngược' ở điểm nào?",
        options: [
          "Từ chối là không đủ bằng chứng để kết luận; trái ngược là đã kết luận rằng báo cáo sai",
          "Từ chối áp dụng cho doanh nghiệp chưa niêm yết, còn trái ngược chỉ dùng cho công ty đại chúng",
          "Từ chối là mức nhẹ hơn ngoại trừ, còn trái ngược là mức nặng nhất trong bốn loại ý kiến",
          "Từ chối do doanh nghiệp chủ động yêu cầu, còn trái ngược do kiểm toán viên tự quyết định đưa ra",
        ],
        correct: 0,
        explanation:
          "Hai loại này khác nhau ở chỗ có bằng chứng hay không: trái ngược nghĩa là kiểm toán viên đã xem đủ và kết luận báo cáo không trung thực; từ chối nghĩa là không xem đủ nên không kết luận được. Cả hai đều nghiêm trọng hơn ngoại trừ, không phụ thuộc doanh nghiệp niêm yết hay chưa, và doanh nghiệp không có quyền yêu cầu loại ý kiến nào.",
      },
      {
        question:
          "Báo cáo có ý kiến chấp nhận toàn phần kèm đoạn nhấn mạnh về nghi ngờ khả năng hoạt động liên tục. Đọc thế nào?",
        options: [
          "Trình bày trung thực, đồng thời có rủi ro doanh nghiệp không tồn tại đủ mười hai tháng tới",
          "Đây là mâu thuẫn trong báo cáo kiểm toán nên cần yêu cầu công ty kiểm toán giải thích lại",
          "Đoạn nhấn mạnh làm ý kiến tự động hạ xuống thành ngoại trừ theo chuẩn mực kiểm toán hiện hành",
          "Đoạn này chỉ mang tính thủ tục, xuất hiện ở hầu hết báo cáo và không mang thông tin đáng chú ý",
        ],
        correct: 0,
        explanation:
          "Hai điều này không mâu thuẫn: kiểm toán viên tin doanh nghiệp đã trình bày trung thực TÌNH TRẠNG XẤU của mình. Đoạn nhấn mạnh không đổi loại ý kiến, và nó không phải thủ tục thường lệ - nó chỉ xuất hiện khi có nghi ngờ thật, nên là cảnh báo mạnh nhất mà một bộ báo cáo phát ra.",
      },
      {
        question: "Vì sao nên đọc ý kiến kiểm toán trước khi phân tích các con số?",
        options: [
          "Vì nó quyết định bộ số này có đáng để bỏ công phân tích hay không",
          "Vì ý kiến kiểm toán có nêu sẵn các tỷ số tài chính quan trọng nhất đã được tính toán trước",
          "Vì đọc theo đúng thứ tự trang trong báo cáo là yêu cầu bắt buộc của chuẩn mực trình bày",
          "Vì kiểm toán viên xếp hạng doanh nghiệp theo thang điểm để nhà đầu tư so sánh nhanh",
        ],
        correct: 0,
        explanation:
          "Một ý kiến trái ngược hoặc từ chối khiến mọi phép tính phía sau mất cơ sở, nên hai phút đọc trước tiết kiệm được cả buổi phân tích. Báo cáo kiểm toán không tính tỷ số, không xếp hạng doanh nghiệp, và cũng không có quy định nào bắt đọc theo thứ tự trang.",
      },
    ],
    practicePrompt: {
      question:
        "Báo cáo có ý kiến ngoại trừ liên quan tới một khoản phải thu 12 tỷ. Tổng tài sản là 6.000 tỷ và lợi nhuận sau thuế 480 tỷ. Kết luận hợp lý là gì?",
      options: [
        "Khoản ngoại trừ nhỏ so với cả hai gốc, phân tích tiếp được",
        "Bỏ hẳn bộ số này, vì đã có ngoại trừ thì không còn tin được",
        "Trừ thẳng 12 tỷ khỏi lợi nhuận rồi mới bắt đầu phân tích",
        "Chờ báo cáo soát xét kỳ sau rồi mới đưa ra bất kỳ kết luận",
      ],
      correct: 0,
      explanation:
        "Ngoại trừ nêu đích danh khoản mục, nên việc phải làm là đo nó: 12 tỷ là 0,2% tổng tài sản và 2,5% lợi nhuận sau thuế. Ở cỡ đó, kể cả khi khoản phải thu mất trắng thì kết luận phân tích cũng không đổi, nên bộ số vẫn dùng được. Bỏ cả báo cáo là phản ứng quá tay và làm mất chính lợi thế của ý kiến ngoại trừ so với từ chối đưa ý kiến - nó khoanh vùng thiệt hại thay vì phủ nhận toàn bộ. Trừ thẳng 12 tỷ cũng sai: kiểm toán viên nói họ không xác nhận được, không nói khoản đó bằng không.",
    },
    keyTakeaways: [
      "Đọc ý kiến kiểm toán trước bảng số - hai phút quyết định mọi phân tích phía sau",
      "Chấp nhận toàn phần nói về cách trình bày, không nói doanh nghiệp khoẻ",
      "Ngoại trừ nêu đích danh khoản mục; đo xem nó lớn cỡ nào trước khi bỏ qua",
      "Nghi ngờ hoạt động liên tục là đoạn nhấn mạnh, không phải một loại ý kiến",
    ],
    summary: {
      keyIdea: "Ý kiến kiểm toán nói bộ số có đáng phân tích không, không nói doanh nghiệp tốt hay xấu",
      commonMistake: "Hiểu ý kiến chấp nhận toàn phần là chứng nhận doanh nghiệp lành mạnh.",
      action: "Mở báo cáo kiểm toán của một doanh nghiệp bất kỳ và tìm đúng đoạn ghi loại ý kiến.",
    },
    application: {
      title: "Tìm đoạn ý kiến trong hai phút",
      message:
        "Mở báo cáo tài chính đã kiểm toán của một doanh nghiệp niêm yết, tìm phần 'Ý kiến của kiểm toán viên' ở những trang đầu, và xác định nó thuộc loại nào trong bốn loại.",
      secondary: "Nếu có đoạn nhấn mạnh đi kèm, đọc luôn đoạn đó - nó thường quan trọng hơn chính loại ý kiến.",
    },
  },
];
