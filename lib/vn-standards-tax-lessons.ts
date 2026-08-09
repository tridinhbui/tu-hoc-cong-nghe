import type { Lesson } from "./lesson-types";

// Chặng "Chuẩn mực kế toán và thuế doanh nghiệp Việt Nam" (ids 1441-1445).
//
// Hai lỗ hổng của Track 2 mà bài kiểm tra tuyển dụng ở Việt Nam hỏi trực tiếp:
// (1) toàn bộ chặng kế toán dạy nguyên lý chung nhưng không nói VAS khác IFRS ở
// đâu, trong khi doanh nghiệp niêm yết đang trong lộ trình chuyển đổi; (2) app
// có tám bài thuế TNCN nhưng không bài nào về thuế doanh nghiệp - kể cả thuế
// hoãn lại, thứ xuất hiện ngay trên bảng cân đối mà người học vừa tập đọc.
//
// Quy tắc viết: các con số thuế suất và ngưỡng cụ thể thay đổi theo từng lần
// sửa luật, nên bài học tập trung vào cơ chế và cách tra cứu, chỉ nêu mức phổ
// thông làm mốc và nói rõ đó là mốc cần kiểm chứng lại tại thời điểm áp dụng.

export const VN_STANDARDS_TAX_LESSONS: Lesson[] = [
  {
    id: 1441,
    slug: "vas-vs-ifrs-khac-biet-nen-tang",
    title: "Chuẩn mực & Thuế, Bài 1: VAS và IFRS khác nhau ở đâu",
    subtitle: "Giá gốc và giá trị hợp lý: một khác biệt triết lý kéo theo hàng loạt khác biệt số liệu",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📗",
    track: "professional",
    whyItMatters:
      "Khi so sánh một doanh nghiệp Việt Nam với doanh nghiệp cùng ngành trong khu vực, phần lớn chênh lệch chỉ số không đến từ hoạt động kinh doanh mà đến từ chuẩn mực kế toán khác nhau. Không biết điều đó thì mọi so sánh định giá xuyên quốc gia đều sai.",
    openingQuestion:
      "Khác biệt triết lý lớn nhất giữa VAS và IFRS là gì?",
    openingOptions: [
      "VAS dùng đơn vị tiền tệ là đồng, còn IFRS bắt buộc quy đổi sang đô la Mỹ",
      "VAS thiên về giá gốc, IFRS dùng giá trị hợp lý",
      "VAS chỉ áp dụng cho doanh nghiệp nhà nước, IFRS cho doanh nghiệp tư nhân",
      "VAS không yêu cầu lập báo cáo lưu chuyển tiền tệ trong bộ báo cáo năm",
    ],
    correctOption: 1,
    explanation:
      "VAS được xây trên nguyên tắc giá gốc: tài sản ghi theo số tiền đã bỏ ra, ít khi được đánh giá lại. IFRS chấp nhận giá trị hợp lý cho nhiều nhóm tài sản, đồng thời đặt nặng bản chất kinh tế hơn hình thức pháp lý của giao dịch. Khác biệt triết lý này kéo theo hàng loạt khác biệt cụ thể về tài sản cố định, bất động sản đầu tư, công cụ tài chính, tổn thất tài sản và ghi nhận doanh thu - và làm cho các chỉ số như ROE, đòn bẩy hay biên lợi nhuận không so sánh trực tiếp được giữa hai hệ.",
    diagram: [
      { label: "VAS: giá gốc, hình thức pháp lý", arrow: true },
      { label: "IFRS: giá trị hợp lý, bản chất kinh tế", arrow: true },
      { label: "Khác biệt ở tài sản, doanh thu, tổn thất", arrow: true },
      { label: "Chỉ số tài chính không so trực tiếp được" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Doanh nghiệp bất động sản niêm yết",
      description:
        "Một doanh nghiệp nắm quỹ đất mua từ nhiều năm trước sẽ ghi nhận theo giá gốc dưới VAS, dù giá thị trường của khu đất đó đã tăng nhiều lần. Cùng doanh nghiệp ấy, nếu lập báo cáo theo IFRS và chọn mô hình giá trị hợp lý cho bất động sản đầu tư, tổng tài sản và vốn chủ sở hữu sẽ lớn hơn hẳn, kéo theo ROE thấp đi và đòn bẩy trông an toàn hơn - mà hoạt động kinh doanh không thay đổi một chút nào.",
    },
    quiz: [
      {
        question: "Dưới VAS, tài sản cố định sau ghi nhận ban đầu được xử lý thế nào?",
        options: [
          "Đánh giá lại theo giá thị trường vào cuối mỗi kỳ kế toán năm",
          "Giữ theo giá gốc trừ khấu hao lũy kế và tổn thất",
          "Ghi nhận theo giá trị thu hồi ước tính của bộ phận sử dụng tài sản",
          "Ghi theo giá trị hiện tại của dòng tiền mà tài sản đó tạo ra",
        ],
        correct: 1,
        explanation:
          "VAS giữ nguyên tắc giá gốc, chỉ cho đánh giá lại trong một số trường hợp đặc thù theo quy định. IFRS cho phép chọn mô hình đánh giá lại cho nhóm tài sản cố định, nên hai bên có thể ra hai con số tài sản rất khác nhau.",
      },
      {
        question: "Khái niệm tổn thất tài sản (impairment) theo IFRS khác VAS ở điểm nào?",
        options: [
          "IFRS có khung đánh giá tổn thất hệ thống cho nhiều loại tài sản",
          "VAS yêu cầu ghi giảm tài sản mỗi khi giá thị trường biến động trong kỳ",
          "IFRS cấm hoàn nhập mọi khoản tổn thất đã ghi trong các kỳ trước đó",
          "VAS bắt buộc kiểm tra tổn thất lợi thế thương mại vào cuối mỗi quý",
        ],
        correct: 0,
        explanation:
          "IFRS buộc doanh nghiệp định kỳ so giá trị ghi sổ với giá trị có thể thu hồi và ghi giảm khi cần. VAS xử lý vấn đề này rời rạc hơn qua các khoản dự phòng cụ thể, nên tài sản kém hiệu quả có thể nằm trên bảng cân đối lâu hơn.",
      },
      {
        question: "Vì sao khác biệt chuẩn mực làm sai lệch so sánh định giá giữa hai doanh nghiệp?",
        options: [
          "Vì bội số định giá được tính bằng đơn vị tiền tệ khác nhau giữa hai hệ",
          "Vì mẫu số của bội số như giá trị sổ sách hay lợi nhuận được đo khác nhau",
          "Vì IFRS yêu cầu công bố giá cổ phiếu mục tiêu còn VAS thì không",
          "Vì hai hệ chuẩn mực dùng hai loại lịch năm tài chính hoàn toàn khác nhau",
        ],
        correct: 1,
        explanation:
          "P/B, P/E hay EV/EBITDA đều lấy mẫu số từ báo cáo tài chính. Khi mẫu số được đo bằng hai thước khác nhau, bội số không còn so sánh được, kể cả khi hai doanh nghiệp giống hệt nhau về kinh tế.",
      },
      {
        question: "Nguyên tắc bản chất hơn hình thức có ý nghĩa gì trong thực tế?",
        options: [
          "Giao dịch được ghi nhận theo hợp đồng pháp lý đã ký giữa các bên",
          "Giao dịch được ghi nhận theo nội dung kinh tế thật, không theo vỏ hợp đồng",
          "Doanh nghiệp được chọn cách trình bày nào có lợi nhất cho chỉ số của mình",
          "Kiểm toán viên quyết định cách ghi nhận thay cho ban điều hành doanh nghiệp",
        ],
        correct: 1,
        explanation:
          "Ví dụ kinh điển là thuê tài sản: một hợp đồng mang tên thuê hoạt động nhưng thực chất chuyển gần hết rủi ro và lợi ích cho bên thuê thì phải ghi như một khoản mua bằng vốn vay, tức là hiện lên cả tài sản lẫn nợ trên bảng cân đối.",
      },
    
    {
      "question": "Vì sao khác biệt giữa hai hệ chuẩn mực lại ảnh hưởng tới việc so sánh bội số định giá?",
      "options": [
        "Vì cùng một doanh nghiệp có thể ra hai mức lợi nhuận và vốn chủ khác nhau",
        "Vì bội số định giá được tính theo công thức khác nhau ở mỗi hệ chuẩn mực",
        "Vì doanh nghiệp áp dụng IFRS luôn được thị trường trả bội số cao hơn",
        "Vì hai hệ chuẩn mực quy định kỳ báo cáo tài chính khác nhau trong năm"
      ],
      "correct": 0,
      "explanation": "Bội số là một phân số, và cả tử lẫn mẫu đều phụ thuộc chuẩn mực. Đánh giá lại tài sản, ghi nhận tổn thất, vốn hóa chi phí - mỗi khác biệt đều dịch chuyển lợi nhuận hoặc vốn chủ, nên hai con số P/E cạnh nhau có thể đang đo hai thứ khác nhau."
    }
    ],
    keyTakeaways: [
      "VAS thiên về giá gốc và hình thức pháp lý; IFRS thiên về giá trị hợp lý và bản chất kinh tế",
      "Khác biệt tập trung ở tài sản cố định, bất động sản đầu tư, công cụ tài chính, tổn thất tài sản và ghi nhận doanh thu",
      "Cùng một doanh nghiệp có thể cho ra ROE, đòn bẩy và biên lợi nhuận khác nhau dưới hai hệ chuẩn mực",
      "Trước khi so sánh chỉ số xuyên quốc gia, luôn hỏi báo cáo được lập theo chuẩn mực nào",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp Việt Nam A có ROE 18%, doanh nghiệp cùng ngành trong khu vực B có ROE 11%. Kết luận nào thận trọng nhất?",
      options: [
        "A hiệu quả hơn B rõ rệt và xứng đáng được định giá cao hơn hẳn",
        "Cần kiểm tra hai bên có cùng chuẩn mực không trước khi so ROE",
        "B đang gặp vấn đề về quản trị chi phí nên suất sinh lời thấp hơn nhiều",
        "Không so sánh được vì hai doanh nghiệp ở hai quốc gia khác nhau",
      ],
      correct: 1,
      explanation:
        "Nếu B lập báo cáo theo IFRS và đã đánh giá lại tài sản theo giá trị hợp lý, vốn chủ sở hữu của B lớn hơn một cách nhân tạo so với A, kéo ROE của B xuống. Chênh lệch 7 điểm phần trăm có thể phần lớn là chênh lệch chuẩn mực chứ không phải chênh lệch năng lực kinh doanh.",
    },
    summary: {
      keyIdea: "Chuẩn mực kế toán là cái thước; đổi thước thì con số đổi dù doanh nghiệp không đổi",
      commonMistake: "So sánh chỉ số giữa hai báo cáo lập theo hai chuẩn mực khác nhau mà không điều chỉnh",
      action: "Mở thuyết minh báo cáo tài chính của một doanh nghiệp niêm yết và tìm phần nêu cơ sở lập báo cáo.",
    },
    application: {
      title: "Câu hỏi đầu tiên khi cầm một báo cáo",
      message:
        "Báo cáo này lập theo chuẩn mực nào, và những khoản mục lớn nhất trên bảng cân đối đang được đo bằng giá gốc hay giá trị hợp lý? Trả lời được hai câu đó trước khi tính bất kỳ chỉ số nào.",
      secondary: "Phần cơ sở lập báo cáo trong thuyết minh luôn nằm ở những trang đầu tiên và thường bị bỏ qua nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học đọc ba báo cáo tài chính theo nguyên lý chung. Nhưng nguyên lý chung được hiện thực hóa bằng một bộ chuẩn mực cụ thể, và Việt Nam đang dùng một bộ chuẩn mực khác với phần lớn thế giới. Không nắm khác biệt đó thì mọi phép so sánh xuyên biên giới đều lệch.",
      },
      {
        type: "conceptTable",
        title: "Những chỗ hai hệ lệch nhau nhiều nhất",
        subtitle: "Đây là danh sách cần kiểm tra khi đọc báo cáo của doanh nghiệp Việt Nam",
        concepts: [
          { vi: "Tài sản cố định", en: "PP&E", def: "VAS giữ giá gốc trừ khấu hao. IFRS cho chọn mô hình đánh giá lại theo giá trị hợp lý, nên tổng tài sản và vốn chủ có thể chênh nhau rất lớn." },
          { vi: "Bất động sản đầu tư", en: "Investment property", def: "Chỗ lệch lớn nhất với doanh nghiệp bất động sản Việt Nam: quỹ đất giá gốc từ nhiều năm trước so với giá thị trường hiện tại." },
          { vi: "Công cụ tài chính", en: "Financial instruments", def: "IFRS có khung phân loại và đo lường chi tiết theo giá trị hợp lý; VAS xử lý hạn chế hơn, đặc biệt với các khoản đầu tư và phái sinh." },
          { vi: "Tổn thất tài sản", en: "Impairment", def: "IFRS bắt buộc rà soát định kỳ và ghi giảm khi giá trị thu hồi thấp hơn giá trị ghi sổ; VAS xử lý rời rạc qua các khoản dự phòng." },
          { vi: "Thuê tài sản", en: "Leases", def: "IFRS đưa gần như mọi hợp đồng thuê lên bảng cân đối thành tài sản quyền sử dụng và nợ thuê, làm đòn bẩy tăng rõ so với cách trình bày cũ." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ưu điểm của giá gốc",
          text: "Khách quan, kiểm chứng được bằng chứng từ, ít phụ thuộc ước tính chủ quan của ban điều hành.",
        },
        right: {
          label: "Ưu điểm của giá trị hợp lý",
          text: "Phản ánh sát thực tế kinh tế hiện tại, hữu ích hơn cho quyết định đầu tư - nhưng mở cửa cho ước tính chủ quan.",
        },
      },
      {
        type: "callout",
        label: "Không có hệ nào đúng tuyệt đối",
        text: "Giá gốc đáng tin nhưng có thể lỗi thời hàng chục năm. Giá trị hợp lý cập nhật nhưng phụ thuộc vào giả định định giá của chính doanh nghiệp. Việc của người phân tích không phải chọn phe, mà là biết con số mình đang cầm được tạo ra bằng cách nào.",
      },
      {
        type: "closing",
        lines: [
          "Chuẩn mực kế toán không phải chi tiết kỹ thuật - nó quyết định con số bạn dùng để định giá.",
          "Bài sau nói về lộ trình chuyển đổi sang IFRS và những gì sẽ thay đổi trên báo cáo khi điều đó xảy ra.",
        ],
      },
    ],
  },
  {
    id: 1442,
    slug: "lo-trinh-ifrs-tai-viet-nam",
    title: "Chuẩn mực & Thuế, Bài 2: Chuyển đổi sang IFRS - điều gì thay đổi trên báo cáo",
    subtitle: "Vì sao chuyển đổi chuẩn mực làm chỉ số nhảy mà doanh nghiệp không hề khác đi",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔄",
    track: "professional",
    whyItMatters:
      "Khi một doanh nghiệp công bố báo cáo theo IFRS lần đầu, các chỉ số của nó nhảy so với cùng kỳ. Người không hiểu chuyện gì đang xảy ra sẽ đọc đó như tin tốt hoặc tin xấu về kinh doanh, trong khi thực chất chỉ là đổi thước đo.",
    openingQuestion:
      "Khi doanh nghiệp lần đầu chuyển sang IFRS, điều gì thường xảy ra với số liệu so sánh của kỳ trước?",
    openingOptions: [
      "Số liệu kỳ trước được giữ nguyên như đã công bố để đảm bảo tính nhất quán",
      "Số liệu kỳ trước được trình bày lại theo IFRS để hai kỳ so sánh được",
      "Doanh nghiệp chỉ công bố kỳ hiện tại và bỏ hẳn cột số liệu so sánh",
      "Số liệu kỳ trước được nhân với một hệ số quy đổi do cơ quan quản lý ban hành",
    ],
    correctOption: 1,
    explanation:
      "Chuyển đổi chuẩn mực đòi hỏi trình bày lại kỳ so sánh trên cùng một cơ sở, kèm bảng đối chiếu giải thích từng khoản chênh lệch giữa hai hệ. Chính bảng đối chiếu này là tài liệu quý nhất cho người phân tích: nó nói cho bạn biết chính xác mỗi khác biệt chuẩn mực trị giá bao nhiêu tiền trên doanh nghiệp cụ thể đó.",
    diagram: [
      { label: "Báo cáo theo VAS", arrow: true },
      { label: "Bảng đối chiếu chuyển đổi", arrow: true },
      { label: "Báo cáo theo IFRS", arrow: true },
      { label: "Chỉ số thay đổi dù kinh doanh không đổi" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Doanh nghiệp niêm yết công bố song song hai bộ báo cáo",
      description:
        "Một số doanh nghiệp lớn tại Việt Nam đã công bố song song báo cáo theo VAS cho mục đích tuân thủ và theo IFRS cho nhà đầu tư nước ngoài. Nhà phân tích có hai bộ số liệu cho cùng một năm hoạt động là cơ hội học tập hiếm có: mọi chênh lệch giữa hai bộ đều thuần túy là chênh lệch chuẩn mực, không lẫn bất kỳ thay đổi kinh doanh nào.",
    },
    quiz: [
      {
        question: "Vì sao đòn bẩy tài chính thường tăng khi chuyển sang IFRS?",
        options: [
          "Vì doanh nghiệp phải vay thêm để trang trải chi phí chuyển đổi chuẩn mực",
          "Vì nghĩa vụ thuê tài sản được đưa lên bảng cân đối thành nợ phải trả",
          "Vì IFRS yêu cầu phân loại lại toàn bộ vốn chủ sở hữu thành nợ dài hạn",
          "Vì lãi vay được vốn hóa vào tài sản thay vì ghi nhận vào chi phí trong kỳ",
        ],
        correct: 1,
        explanation:
          "Trước đây nhiều hợp đồng thuê nằm ngoài bảng cân đối. IFRS đưa chúng lên thành tài sản quyền sử dụng và nợ thuê tương ứng, khiến tổng nợ tăng đáng kể với các doanh nghiệp thuê nhiều mặt bằng như bán lẻ và hàng không.",
      },
      {
        question: "Bảng đối chiếu chuyển đổi có giá trị gì với người phân tích?",
        options: [
          "Nó liệt kê danh sách kiểm toán viên đã tham gia quá trình chuyển đổi",
          "Nó bóc tách từng khác biệt chuẩn mực thành con số cụ thể",
          "Nó thay thế cho thuyết minh báo cáo tài chính trong năm chuyển đổi",
          "Nó cho biết doanh nghiệp sẽ đạt lợi nhuận bao nhiêu trong năm tiếp theo",
        ],
        correct: 1,
        explanation:
          "Đây là tài liệu hiếm hoi cho phép bạn định lượng chính xác ảnh hưởng của từng khác biệt chuẩn mực lên vốn chủ sở hữu và lợi nhuận của đúng doanh nghiệp đó, thay vì suy đoán chung chung.",
      },
      {
        question: "Chuyển đổi chuẩn mực có làm thay đổi dòng tiền thực của doanh nghiệp không?",
        options: [
          "Có, vì cách đo lường mới làm thay đổi số tiền thực thu và thực chi",
          "Không, dòng tiền thực không đổi; chỉ cách phân loại và trình bày thay đổi",
          "Có, vì doanh nghiệp phải nộp thêm thuế trên phần tài sản được đánh giá lại",
          "Không, và cũng không có khoản mục nào trên báo cáo lưu chuyển tiền tệ đổi chỗ",
        ],
        correct: 1,
        explanation:
          "Tiền vào và tiền ra không phụ thuộc vào chuẩn mực kế toán. Điều thay đổi là các khoản đó được xếp vào nhóm hoạt động, đầu tư hay tài chính - ví dụ tiền trả thuê có thể chuyển từ dòng hoạt động sang dòng tài chính, làm dòng tiền hoạt động trông đẹp lên.",
      },
      {
        question: "Cách đọc đúng khi một doanh nghiệp báo lợi nhuận tăng vọt trong năm chuyển đổi chuẩn mực là gì?",
        options: [
          "Coi đó là bằng chứng hoạt động kinh doanh đã cải thiện rõ rệt trong năm",
          "Tách phần tăng do đổi chuẩn mực ra khỏi phần tăng do kinh doanh",
          "Bỏ qua toàn bộ báo cáo năm đó vì số liệu không còn đáng tin cậy nữa",
          "So sánh trực tiếp với các doanh nghiệp chưa chuyển đổi để có góc nhìn khách quan",
        ],
        correct: 1,
        explanation:
          "Bảng đối chiếu cho phép làm đúng việc này. Phần tăng do đánh giá lại tài sản hay do thay đổi cách ghi nhận là khoản một lần, không lặp lại, nên không được đưa vào cơ sở dự phóng cho các năm sau.",
      },
    
    {
      "question": "Hai doanh nghiệp cùng ngành, một đã áp dụng IFRS còn một vẫn theo VAS. So sánh hệ số định giá của họ thế nào?",
      "options": [
        "Phải trình bày lại một bên theo cùng chuẩn trước khi đặt cạnh nhau",
        "So trực tiếp được vì cả hai đều phản ánh cùng một hoạt động kinh doanh",
        "Lấy trung bình hai hệ số để triệt tiêu khác biệt giữa hai chuẩn mực",
        "Chỉ so được các hệ số dựa trên dòng tiền, còn hệ số trên lợi nhuận thì không"
      ],
      "correct": 0,
      "explanation": "Nợ thuê nằm trên bảng cân đối của bên này mà không nằm trên bảng của bên kia, nên EV, EBITDA và tỷ lệ đòn bẩy của hai bên đang đo hai thứ khác nhau. Phương án cuối gần đúng nhưng vẫn sai: hoạt động kinh doanh giống nhau, còn cách ghi thì không - và chính cách ghi là thứ đi vào mọi hệ số."
    }
    ],
    keyTakeaways: [
      "Chuyển đổi chuẩn mực làm chỉ số nhảy mà hoạt động kinh doanh không đổi",
      "Đòn bẩy thường tăng vì nghĩa vụ thuê được đưa lên bảng cân đối",
      "Bảng đối chiếu chuyển đổi là tài liệu quý nhất: nó định lượng từng khác biệt chuẩn mực",
      "Dòng tiền thực không thay đổi, chỉ cách phân loại trên báo cáo thay đổi",
    ],
    practicePrompt: {
      question:
        "Một chuỗi bán lẻ thuê 300 mặt bằng chuyển sang IFRS. Chỉ số nào bị ảnh hưởng mạnh nhất?",
      options: [
        "Biên lợi nhuận gộp, vì giá vốn hàng bán được tính lại theo phương pháp mới",
        "Tỷ lệ nợ trên vốn chủ và EBITDA, do nợ thuê và chi phí thuê được xếp lại chỗ",
        "Vòng quay hàng tồn kho, vì hàng tồn được đánh giá lại theo giá trị hợp lý",
        "Số dư tiền mặt cuối kỳ, do tiền thuê được phân loại lại trên bảng cân đối",
      ],
      correct: 1,
      explanation:
        "Nợ thuê xuất hiện trên bảng cân đối làm đòn bẩy tăng vọt. Đồng thời chi phí thuê chuyển thành khấu hao cộng lãi vay, mà cả hai đều nằm dưới dòng EBITDA - nên EBITDA tăng lên đáng kể. Hệ quả: EV/EBITDA và tỷ lệ nợ trên EBITDA thay đổi cùng lúc theo hai hướng, và không so được với các năm trước nếu chưa trình bày lại.",
    },
    summary: {
      keyIdea: "Đổi chuẩn mực là đổi thước đo, không phải đổi doanh nghiệp",
      commonMistake: "Đọc phần tăng lợi nhuận do chuyển đổi chuẩn mực như tăng trưởng kinh doanh và đưa vào dự phóng",
      action: "Tìm một doanh nghiệp công bố song song hai bộ báo cáo và tự lập bảng so từng khoản mục lớn.",
    },
    application: {
      title: "Nguyên tắc so sánh qua năm chuyển đổi",
      message:
        "Chỉ so hai kỳ khi cả hai đã được trình bày trên cùng một cơ sở. Nếu chỉ có kỳ hiện tại theo chuẩn mực mới, hãy dùng bảng đối chiếu để quy kỳ trước về cùng cơ sở trước khi tính bất kỳ tốc độ tăng trưởng nào.",
      secondary: "Đây cũng là kỹ năng dùng lại được mỗi khi doanh nghiệp đổi chính sách kế toán hay tái cấu trúc mảng kinh doanh.",
    },
    sections: [
      {
        type: "lead",
        text: "Chuyển đổi chuẩn mực là một trong số ít sự kiện làm toàn bộ chỉ số của một doanh nghiệp thay đổi trong khi không có gì trong hoạt động thay đổi. Đó cũng là lúc dễ đọc sai nhất, vì con số mới trông giống hệt một tin tức về kinh doanh.",
      },
      {
        type: "heading",
        text: "Ba nhóm ảnh hưởng chính",
      },
      {
        type: "list",
        items: [
          "Bảng cân đối phình ra: tài sản quyền sử dụng và nợ thuê xuất hiện; một số tài sản được đánh giá lại theo giá trị hợp lý",
          "Kết quả kinh doanh đổi cấu trúc: chi phí thuê tách thành khấu hao và lãi vay, đẩy EBITDA lên mà không tạo thêm đồng tiền nào",
          "Vốn chủ sở hữu đầu kỳ bị điều chỉnh: các khác biệt tích lũy từ quá khứ được ghi thẳng vào lợi nhuận giữ lại tại ngày chuyển đổi",
        ],
      },
      {
        type: "callout",
        label: "Bẫy dự phóng",
        text: "Nếu bạn lấy EBITDA năm chuyển đổi làm cơ sở dự phóng mà so với bội số EV/EBITDA lịch sử được tính trên cơ sở cũ, bạn đang chia hai con số không cùng đơn vị. Kết quả định giá sẽ sai lệch theo hướng làm doanh nghiệp trông rẻ hơn thực tế.",
      },
      {
        type: "heading",
        text: "Một chuỗi bán lẻ, hai bộ chuẩn mực, cùng một cửa hàng",
      },
      {
        type: "paragraph",
        text: "Doanh nghiệp thuê 100 mặt bằng, tiền thuê 300 tỷ mỗi năm. Theo chuẩn cũ, toàn bộ 300 tỷ là chi phí hoạt động: EBITDA 700 tỷ, và hợp đồng thuê không xuất hiện trên bảng cân đối. Chuyển sang IFRS 16, quyền thuê thành tài sản và nghĩa vụ thuê thành nợ - giả sử hiện giá 1.200 tỷ. Khoản 300 tỷ tách thành khấu hao 240 tỷ và lãi vay 60 tỷ. EBITDA nhảy lên 1.000 tỷ vì cả hai khoản đó đều nằm DƯỚI dòng EBITDA, còn nợ tăng thêm 1.200 tỷ.",
      },
      {
        type: "conceptTable",
        title: "Cùng một doanh nghiệp, ba chỉ số đọc ra ba câu chuyện khác nhau",
        subtitle: "Không có đồng tiền nào đổi chỗ giữa hai cột",
        concepts: [
          {
            vi: "EBITDA",
            en: "700 tỷ → 1.000 tỷ",
            def: "Tăng 43% mà không bán thêm một món hàng. Ngành nào thuê nhiều mặt bằng - bán lẻ, hàng không, chuỗi F&B - thì cú nhảy này lớn nhất.",
          },
          {
            vi: "Nợ vay",
            en: "0 → 1.200 tỷ",
            def: "Tỷ lệ Nợ/EBITDA đi từ 0 lên 1,2 lần. Giao ước vay vốn viết theo chuẩn cũ có thể bị vi phạm ngay trong đêm chuyển đổi, nên hợp đồng tín dụng thường có điều khoản đóng băng định nghĩa tại thời điểm ký.",
          },
          {
            vi: "EV/EBITDA",
            en: "Mẫu số tăng, tử số cũng tăng",
            def: "EV cộng thêm nợ thuê nên tử số tăng 1.200 tỷ, mẫu số tăng 300 tỷ. Bội số mới không so được với bội số lịch sử, và cũng không so được với doanh nghiệp cùng ngành chưa chuyển đổi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cách đọc đúng khi hai kỳ khác chuẩn mực",
        text: "Báo cáo năm chuyển đổi luôn có thuyết minh đối chiếu: một bảng chỉ ra từng khoản mục theo chuẩn cũ, khoản điều chỉnh, và số theo chuẩn mới. Đó là chỗ duy nhất quy được hai kỳ về cùng một thước, và cũng là chỗ ít người đọc nhất trong cả báo cáo. Không có nó thì mọi phép tính tăng trưởng bắc qua ngày chuyển đổi đều là so hai đơn vị đo khác nhau.",
      },
      {
        type: "closing",
        lines: [
          "Mỗi lần thước đo đổi, việc đầu tiên là quy hai kỳ về cùng một thước.",
          "Ba bài tiếp theo chuyển sang phần còn thiếu hẳn của Track 2: thuế doanh nghiệp.",
        ],
      },
    ],
  },
  {
    id: 1443,
    slug: "thue-thu-nhap-doanh-nghiep-cach-tinh",
    title: "Chuẩn mực & Thuế, Bài 3: Thuế thu nhập doanh nghiệp - từ lợi nhuận kế toán đến số thuế phải nộp",
    subtitle: "Chi phí được trừ, chi phí không được trừ, chuyển lỗ và ưu đãi thuế",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🧾",
    track: "professional",
    whyItMatters:
      "Thuế suất hiệu dụng là một trong những dòng bạn phải dự phóng trong mọi mô hình tài chính, và nó gần như không bao giờ bằng thuế suất phổ thông. Không hiểu vì sao chênh, bạn sẽ dự phóng sai dòng cuối cùng của báo cáo kết quả kinh doanh.",
    openingQuestion:
      "Vì sao thuế suất hiệu dụng của một doanh nghiệp thường khác thuế suất phổ thông?",
    openingOptions: [
      "Vì cơ quan thuế áp mức riêng cho từng doanh nghiệp dựa trên quy mô doanh thu",
      "Vì thu nhập tính thuế khác lợi nhuận kế toán",
      "Vì doanh nghiệp được tự chọn mức thuế suất phù hợp với ngành nghề của mình",
      "Vì thuế suất phổ thông chỉ áp dụng cho doanh nghiệp có vốn đầu tư nước ngoài",
    ],
    correctOption: 1,
    explanation:
      "Có ba nguồn gây chênh lệch. Thứ nhất, một số chi phí đã ghi nhận trên sổ kế toán nhưng không được trừ khi tính thuế, làm thu nhập tính thuế cao hơn lợi nhuận kế toán. Thứ hai, doanh nghiệp có thể đang hưởng ưu đãi theo ngành nghề, địa bàn hoặc dự án đầu tư, kéo thuế suất xuống. Thứ ba, lỗ của các năm trước được chuyển sang bù trừ trong giới hạn thời gian cho phép, làm số thuế phải nộp năm nay thấp đi.",
    diagram: [
      { label: "Lợi nhuận kế toán trước thuế", arrow: true },
      { label: "Cộng chi phí không được trừ, trừ thu nhập miễn", arrow: true },
      { label: "Trừ lỗ được chuyển từ các năm trước", arrow: true },
      { label: "Thu nhập tính thuế × thuế suất áp dụng" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Doanh nghiệp sản xuất hưởng ưu đãi đầu tư",
      description:
        "Một nhà máy đặt tại địa bàn được khuyến khích đầu tư có thể được miễn thuế vài năm đầu rồi giảm một nửa trong nhiều năm tiếp theo. Trong giai đoạn đó, thuế suất hiệu dụng rất thấp và lợi nhuận sau thuế trông rất đẹp. Người dựng mô hình không đọc kỹ điều kiện ưu đãi sẽ kéo dài mức thuế thấp đó ra vô hạn trong dự phóng, và định giá cao hơn thực tế đáng kể - vì đến năm ưu đãi kết thúc, lợi nhuận sau thuế sẽ tụt xuống dù doanh thu vẫn tăng.",
    },
    quiz: [
      {
        question: "Chi phí không được trừ khi tính thuế nghĩa là gì?",
        options: [
          "Khoản chi không được ghi nhận trên sổ kế toán của doanh nghiệp",
          "Khoản chi có trên sổ kế toán nhưng bị loại khi tính thu nhập tính thuế",
          "Khoản chi phải được cơ quan thuế phê duyệt trước khi doanh nghiệp chi ra",
          "Khoản chi chỉ được trừ dần trong nhiều năm thay vì trừ hết trong một năm",
        ],
        correct: 1,
        explanation:
          "Các khoản chi không có hóa đơn chứng từ hợp lệ, chi vượt định mức quy định, hoặc khoản phạt vi phạm hành chính là những ví dụ điển hình. Chúng vẫn là chi phí thật làm giảm lợi nhuận kế toán, nhưng không làm giảm số thuế phải nộp.",
      },
      {
        question: "Chuyển lỗ hoạt động thế nào?",
        options: [
          "Lỗ của năm trước được bù trừ vào thu nhập tính thuế của các năm sau",
          "Lỗ được cơ quan thuế hoàn lại bằng tiền mặt ngay trong năm phát sinh lỗ",
          "Lỗ được chia đều cho các cổ đông theo tỷ lệ sở hữu để khấu trừ thuế cá nhân",
          "Lỗ được chuyển sang bù trừ vào các năm trước đó và xin hoàn thuế đã nộp",
        ],
        correct: 0,
        explanation:
          "Cơ chế chuyển lỗ về sau có giới hạn thời gian theo quy định. Với doanh nghiệp vừa qua giai đoạn lỗ lớn, đây là lý do thuế suất hiệu dụng của vài năm đầu có lãi rất thấp - và mô hình cần phản ánh việc phần lỗ lũy kế đó sẽ cạn.",
      },
      {
        question: "Thuế suất hiệu dụng được tính thế nào?",
        options: [
          "Chi phí thuế chia cho lợi nhuận kế toán trước thuế của cùng kỳ",
          "Số thuế đã nộp bằng tiền mặt chia cho tổng doanh thu thuần trong kỳ",
          "Thuế suất phổ thông nhân với tỷ lệ lợi nhuận trên vốn chủ sở hữu",
          "Chi phí thuế chia cho tổng tài sản bình quân của doanh nghiệp trong kỳ",
        ],
        correct: 0,
        explanation:
          "Đây là con số bạn thực sự dùng trong mô hình. So thuế suất hiệu dụng qua nhiều năm sẽ lộ ra doanh nghiệp đang hưởng ưu đãi, đang dùng lỗ lũy kế, hay có nhiều chi phí không được trừ.",
      },
      {
        question: "Vì sao phải đọc kỹ điều kiện và thời hạn ưu đãi thuế khi dự phóng?",
        options: [
          "Vì ưu đãi thuế phải được gia hạn lại vào đầu mỗi năm tài chính mới",
          "Vì ưu đãi có thời hạn, và lợi nhuận sau thuế sẽ tụt khi ưu đãi kết thúc",
          "Vì doanh nghiệp phải hoàn trả toàn bộ phần thuế được ưu đãi khi bán tài sản",
          "Vì ưu đãi thuế chỉ áp dụng cho phần doanh thu xuất khẩu ra thị trường nước ngoài",
        ],
        correct: 1,
        explanation:
          "Đây là lỗi dự phóng phổ biến với doanh nghiệp sản xuất và công nghệ. Mô hình giữ nguyên thuế suất hiệu dụng thấp đến vô hạn sẽ định giá cao hơn thực tế, đôi khi tới hàng chục phần trăm.",
      },
      {
        question: "Trong mô hình tài chính, nên dự phóng thuế thế nào cho hợp lý?",
        options: [
          "Luôn dùng đúng thuế suất phổ thông cho mọi năm dự phóng để đơn giản hóa",
          "Dùng thuế suất hiệu dụng hiện tại rồi cho hội tụ dần về mức phổ thông",
          "Lấy trung bình thuế suất hiệu dụng của toàn ngành trong năm gần nhất",
          "Giả định doanh nghiệp không phải nộp thuế cho đến khi hết lỗ lũy kế hoàn toàn",
        ],
        correct: 1,
        explanation:
          "Cách này phản ánh cả thực tế hiện tại lẫn việc các ưu đãi và lỗ lũy kế đều hữu hạn. Trong giá trị cuối cùng của mô hình định giá thì gần như luôn phải dùng mức thuế suất phổ thông.",
      },
    ],
    keyTakeaways: [
      "Thu nhập tính thuế khác lợi nhuận kế toán do chi phí không được trừ và thu nhập được miễn",
      "Ba nguồn làm thuế suất hiệu dụng lệch thuế suất phổ thông: chi phí không được trừ, ưu đãi, chuyển lỗ",
      "Ưu đãi thuế luôn có thời hạn - dự phóng phải cho thuế suất hội tụ dần về mức phổ thông",
      "Thuế suất hiệu dụng = chi phí thuế / lợi nhuận kế toán trước thuế, và nên đọc theo chuỗi nhiều năm",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp có thuế suất hiệu dụng 5% trong ba năm liên tiếp, thuế suất phổ thông là 20%. Điều cần làm tiếp theo là gì?",
      options: [
        "Dùng luôn mức 5% cho toàn bộ giai đoạn dự phóng vì đó là dữ liệu thực tế",
        "Tìm trong thuyết minh xem đây là ưu đãi hay lỗ lũy kế, và nó còn kéo dài bao lâu",
        "Kết luận doanh nghiệp đang có vấn đề trong việc kê khai và tuân thủ thuế",
        "Điều chỉnh ngay lợi nhuận về mức thuế 20% cho cả các năm quá khứ đã công bố",
      ],
      correct: 1,
      explanation:
        "Hai nguyên nhân dẫn tới hai dự phóng hoàn toàn khác nhau. Nếu là ưu đãi còn bảy năm, mô hình giữ mức thấp bảy năm rồi mới nâng. Nếu là lỗ lũy kế sắp cạn, thuế suất sẽ bật lên ngay năm sau. Thuyết minh thuế trong báo cáo tài chính luôn có phần đối chiếu giữa thuế theo suất phổ thông và chi phí thuế thực tế.",
    },
    summary: {
      keyIdea: "Thuế trong mô hình phải dựa trên thuế suất hiệu dụng có thời hạn, không phải một con số cố định",
      formula: "Thuế suất hiệu dụng = Chi phí thuế / Lợi nhuận kế toán trước thuế",
      commonMistake: "Kéo dài mức thuế suất ưu đãi ra vô hạn trong dự phóng",
      action: "Tính thuế suất hiệu dụng năm năm liên tiếp cho một doanh nghiệp và giải thích vì sao nó biến động.",
    },
    application: {
      title: "Đọc phần thuyết minh thuế",
      message:
        "Trong thuyết minh có bảng đối chiếu từ thuế theo suất phổ thông xuống chi phí thuế thực tế, liệt kê từng khoản điều chỉnh. Đây là nơi trả lời câu hỏi vì sao doanh nghiệp nộp ít hoặc nhiều hơn mức thông thường, và ưu đãi còn hiệu lực đến bao giờ.",
      secondary: "Các con số thuế suất và điều kiện ưu đãi thay đổi theo từng lần sửa luật - luôn kiểm chứng lại quy định tại thời điểm bạn đang phân tích.",
    },
    sections: [
      {
        type: "lead",
        text: "Track 2 dạy bạn đọc từ doanh thu xuống lợi nhuận trước thuế rất kỹ, rồi dừng lại đúng chỗ thú vị nhất. Dòng thuế không phải một phép nhân đơn giản, và nó là một trong những dòng dễ dự phóng sai nhất trong mô hình tài chính.",
      },
      {
        type: "formula",
        title: "Từ lợi nhuận kế toán sang thu nhập tính thuế",
        label: "Cầu nối giữa hai hệ thống ghi nhận khác nhau",
        equation:
          "Thu nhập tính thuế = Lợi nhuận kế toán trước thuế + Chi phí không được trừ − Thu nhập được miễn − Lỗ được chuyển",
        variables: [
          { symbol: "Chi phí không được trừ", name: "Khoản bị loại", description: "Chi không đủ chứng từ, chi vượt định mức, tiền phạt vi phạm hành chính" },
          { symbol: "Thu nhập được miễn", name: "Khoản không tính thuế", description: "Một số khoản thu nhập được quy định là không chịu thuế" },
          { symbol: "Lỗ được chuyển", name: "Lỗ các năm trước", description: "Bù trừ vào thu nhập của các năm sau, trong giới hạn thời gian quy định" },
        ],
        example: {
          title: "Ví dụ minh họa",
          calculation: "100 + 8 − 0 − 30 = 78, rồi nhân thuế suất 20%",
          result: "Thuế 15,6 trên lợi nhuận kế toán 100, tức thuế suất hiệu dụng 15,6%",
          explanation:
            "Chênh lệch so với mức 20% đến từ 30 đơn vị lỗ được chuyển, và nó sẽ biến mất khi lỗ lũy kế cạn. Mô hình phải phản ánh việc năm sau thuế suất hiệu dụng nhảy lên gần 20%.",
        },
      },
      {
        type: "callout",
        label: "Cảnh báo về số liệu cụ thể",
        text: "Thuế suất phổ thông, giới hạn thời gian chuyển lỗ, danh mục ngành nghề và địa bàn ưu đãi đều thay đổi qua các lần sửa luật. Bài học này dạy cơ chế; các con số cụ thể phải được kiểm chứng lại theo quy định có hiệu lực tại thời điểm bạn phân tích.",
      },
      {
          "type": "heading",
          "text": "Chuyển lỗ và vì sao nó ảnh hưởng tới định giá"
        },
        {
          "type": "paragraph",
          "text": "Khoản lỗ của một năm được phép trừ vào thu nhập tính thuế của các năm sau trong một khoảng thời gian giới hạn. Với doanh nghiệp vừa qua giai đoạn lỗ lớn, điều đó nghĩa là những năm lãi đầu tiên gần như không phải nộp thuế - và dòng tiền thật cao hơn hẳn con số mà một mô hình áp thuế suất phổ thông sẽ cho ra. Đây là lý do phần thuế trong mô hình định giá phải bám vào tình trạng cụ thể của doanh nghiệp chứ không lấy một tỷ lệ chung."
        },
      {
        type: "closing",
        lines: [
          "Dòng thuế là dòng cuối, nhưng dự phóng sai nó thì sai toàn bộ định giá.",
          "Bài sau nói về hai sắc thuế ảnh hưởng đến dòng tiền và giá bán chứ không đến lợi nhuận: thuế giá trị gia tăng và thuế nhà thầu.",
        ],
      },
    ],
  },
  {
    id: 1444,
    slug: "thue-gtgt-va-thue-nha-thau",
    title: "Chuẩn mực & Thuế, Bài 4: Thuế giá trị gia tăng và thuế nhà thầu - ảnh hưởng dòng tiền, không phải lợi nhuận",
    subtitle: "Vì sao doanh nghiệp thu hộ thuế lại có thể chết vì thuế đó",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💳",
    track: "professional",
    whyItMatters:
      "Thuế giá trị gia tăng không xuất hiện trên báo cáo kết quả kinh doanh, nên người mới đọc báo cáo hay bỏ qua. Nhưng nó chiếm chỗ trong vốn lưu động, và với doanh nghiệp xuất khẩu hay đầu tư lớn, số thuế chờ hoàn có thể lớn hơn cả lợi nhuận cả năm.",
    openingQuestion:
      "Vì sao thuế giá trị gia tăng không làm giảm lợi nhuận của doanh nghiệp?",
    openingOptions: [
      "Vì thuế suất của sắc thuế này quá thấp để ảnh hưởng tới lợi nhuận sau thuế",
      "Vì doanh nghiệp chỉ thu hộ từ người mua rồi nộp lại, chứ không phải là người chịu thuế",
      "Vì cơ quan thuế hoàn lại toàn bộ số thuế này vào cuối mỗi năm tài chính",
      "Vì khoản thuế này được ghi thẳng vào vốn chủ sở hữu chứ không qua kết quả kinh doanh",
    ],
    correctOption: 1,
    explanation:
      "Người tiêu dùng cuối cùng mới là người chịu thuế giá trị gia tăng. Doanh nghiệp thu từ khách hàng phần thuế đầu ra, được khấu trừ phần thuế đầu vào đã trả cho nhà cung cấp, và nộp phần chênh lệch. Vì vậy sắc thuế này đi qua bảng cân đối chứ không qua báo cáo kết quả kinh doanh. Nhưng nó rất thật về mặt dòng tiền: tiền thuế đầu vào bị giữ lại cho đến khi được khấu trừ hoặc hoàn, và khoảng thời gian đó là vốn bị chôn.",
    diagram: [
      { label: "Thuế đầu ra thu từ khách hàng", arrow: true },
      { label: "Trừ thuế đầu vào trả cho nhà cung cấp", arrow: true },
      { label: "Nộp phần chênh lệch cho ngân sách", arrow: true },
      { label: "Nếu đầu vào lớn hơn: chờ khấu trừ hoặc hoàn" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Doanh nghiệp xuất khẩu và doanh nghiệp đang xây nhà máy",
      description:
        "Doanh nghiệp xuất khẩu có thuế đầu ra rất thấp nhưng vẫn trả thuế đầu vào khi mua nguyên liệu trong nước, nên thường xuyên ở trạng thái chờ hoàn thuế. Tương tự, doanh nghiệp đang đầu tư xây nhà máy trả thuế đầu vào cho toàn bộ giá trị xây lắp và thiết bị trong khi chưa có doanh thu. Trong cả hai trường hợp, khoản thuế chờ hoàn nằm ở tài sản ngắn hạn và là tiền thật đang bị giữ ngoài hoạt động kinh doanh.",
    },
    quiz: [
      {
        question: "Thuế giá trị gia tăng đầu vào chưa được khấu trừ nằm ở đâu trên báo cáo?",
        options: [
          "Ở chi phí quản lý doanh nghiệp trong báo cáo kết quả kinh doanh",
          "Ở tài sản ngắn hạn, dưới dạng khoản phải thu hoặc thuế được khấu trừ",
          "Ở phần vốn chủ sở hữu, làm giảm lợi nhuận giữ lại của kỳ hiện tại",
          "Ở nợ dài hạn, vì doanh nghiệp có nghĩa vụ nộp lại cho ngân sách nhà nước",
        ],
        correct: 1,
        explanation:
          "Đây là một khoản phải thu từ ngân sách. Nó chiếm vốn lưu động thật sự, nên khi phân tích chu kỳ tiền mặt của doanh nghiệp xuất khẩu hoặc doanh nghiệp đang đầu tư lớn, phải nhìn cả khoản này chứ không chỉ hàng tồn kho và phải thu khách hàng.",
      },
      {
        question: "Thuế nhà thầu áp dụng trong tình huống nào?",
        options: [
          "Khi doanh nghiệp trong nước thuê nhà thầu xây dựng nội địa thi công công trình",
          "Khi doanh nghiệp trả tiền cho tổ chức nước ngoài có thu nhập phát sinh tại Việt Nam",
          "Khi doanh nghiệp trả lương cho người lao động là công dân nước ngoài",
          "Khi doanh nghiệp nhập khẩu hàng hóa qua cửa khẩu để bán lại trong nước",
        ],
        correct: 1,
        explanation:
          "Các khoản trả cho đối tác nước ngoài như phí bản quyền phần mềm, phí dịch vụ kỹ thuật, lãi vay nước ngoài thường thuộc diện này. Bên Việt Nam có nghĩa vụ khấu trừ và nộp thay, nên nó ảnh hưởng trực tiếp đến chi phí thật của hợp đồng.",
      },
      {
        question: "Vì sao thuế nhà thầu quan trọng khi đàm phán hợp đồng quốc tế?",
        options: [
          "Vì nó quyết định hợp đồng có được cơ quan quản lý phê duyệt hay không",
          "Vì nếu không thỏa thuận rõ bên nào chịu, chi phí thật có thể cao hơn giá ghi",
          "Vì nó thay thế cho thuế thu nhập doanh nghiệp của bên Việt Nam trong năm đó",
          "Vì nó chỉ áp dụng khi giá trị hợp đồng vượt một ngưỡng nhất định theo quy định",
        ],
        correct: 1,
        explanation:
          "Khi hợp đồng ghi rằng đối tác nước ngoài nhận đủ một số tiền ròng, bên Việt Nam phải quy đổi ngược lên để tính phần thuế nộp thay, làm tổng chi phí lớn hơn con số ghi trên hợp đồng. Đây là chi tiết thường bị bỏ sót khi lập dự toán.",
      },
      {
        question: "Với doanh nghiệp xuất khẩu, rủi ro dòng tiền liên quan đến thuế giá trị gia tăng là gì?",
        options: [
          "Phải nộp thuế đầu ra rất lớn ngay khi hàng rời cảng xuất khẩu",
          "Vốn bị chôn ở khoản thuế đầu vào chờ hoàn trong thời gian dài",
          "Thuế suất áp dụng cho hàng xuất khẩu cao hơn hàng bán trong nước",
          "Không được khấu trừ bất kỳ khoản thuế đầu vào nào cho hoạt động xuất khẩu",
        ],
        correct: 1,
        explanation:
          "Quy mô càng lớn thì khoản chờ hoàn càng lớn, nên nghịch lý là doanh nghiệp xuất khẩu tăng trưởng nhanh lại càng dễ căng thanh khoản. Khi đọc báo cáo, hãy so khoản thuế được khấu trừ với dòng tiền hoạt động để thấy mức độ vốn bị giữ.",
      },
    
    {
      "question": "Vì sao doanh nghiệp xuất khẩu có thể gặp áp lực dòng tiền từ thuế giá trị gia tăng dù được hưởng thuế suất 0%?",
      "options": [
        "Vì họ đã trả thuế đầu vào và phải chờ được hoàn lại",
        "Vì hàng xuất khẩu vẫn chịu thuế đầu ra ở mức thấp hơn thuế suất thông thường",
        "Vì thuế giá trị gia tăng đầu vào của hàng xuất khẩu không được khấu trừ",
        "Vì họ phải nộp trước phần thuế của cả năm rồi mới được quyết toán lại"
      ],
      "correct": 0,
      "explanation": "Thuế suất 0% không có nghĩa là không có dòng tiền: tiền thuế đầu vào đã trả cho nhà cung cấp và nằm lại đó cho tới khi hoàn thuế xong. Với doanh nghiệp xuất khẩu quy mô lớn, khoản chờ hoàn này có thể lớn ngang một khoản vay vốn lưu động."
    }
    ],
    keyTakeaways: [
      "Thuế giá trị gia tăng đi qua bảng cân đối, không qua báo cáo kết quả kinh doanh - nhưng chiếm vốn lưu động thật",
      "Doanh nghiệp xuất khẩu và doanh nghiệp đang đầu tư lớn thường xuyên có khoản thuế chờ hoàn rất lớn",
      "Thuế nhà thầu áp lên các khoản trả cho đối tác nước ngoài, và làm chi phí thật của hợp đồng cao hơn giá ghi",
      "Khi phân tích vốn lưu động, phải tính cả khoản thuế được khấu trừ chứ không chỉ tồn kho và phải thu",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp xuất khẩu báo lợi nhuận tăng 30% nhưng dòng tiền hoạt động âm. Khoản mục nào đáng nghi đầu tiên?",
      options: [
        "Chi phí khấu hao tăng do vừa đưa dây chuyền sản xuất mới vào vận hành",
        "Phải thu khách hàng và thuế giá trị gia tăng đầu vào chờ hoàn tăng theo doanh thu",
        "Chi phí lãi vay tăng vì doanh nghiệp vừa huy động thêm khoản vay dài hạn",
        "Chi phí bán hàng tăng do mở rộng thị trường sang các quốc gia mới trong năm",
      ],
      correct: 1,
      explanation:
        "Khấu hao và lãi vay không giải thích được dòng tiền hoạt động âm theo cách này. Với doanh nghiệp xuất khẩu tăng trưởng nhanh, hai khoản chiếm vốn lớn nhất thường là phải thu khách hàng và thuế đầu vào chờ hoàn - cả hai đều phình theo doanh thu và đều là tiền thật đang nằm ngoài doanh nghiệp.",
    },
    summary: {
      keyIdea: "Có những sắc thuế không chạm vào lợi nhuận nhưng quyết định thanh khoản",
      commonMistake: "Bỏ qua khoản thuế được khấu trừ khi tính nhu cầu vốn lưu động",
      action: "Mở bảng cân đối của một doanh nghiệp xuất khẩu và tìm dòng thuế được khấu trừ, so nó với lợi nhuận cả năm.",
    },
    application: {
      title: "Thêm một dòng vào bảng vốn lưu động",
      message:
        "Khi dựng bảng hỗ trợ vốn lưu động trong mô hình, đừng dừng ở tồn kho, phải thu và phải trả. Với doanh nghiệp xuất khẩu hoặc đang đầu tư lớn, hãy thêm dòng thuế được khấu trừ và gắn nó với doanh thu hoặc với chi đầu tư tương ứng.",
      secondary: "Thời gian hoàn thuế thực tế cũng là một giả định cần nêu rõ, vì nó ảnh hưởng trực tiếp tới nhu cầu vốn.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một loại thuế mà doanh nghiệp không phải người chịu, không thấy trên báo cáo kết quả kinh doanh, nhưng vẫn có thể khiến doanh nghiệp căng thanh khoản đến mức phải đi vay. Đó là thuế giá trị gia tăng, và cách nó vận hành đáng để hiểu kỹ.",
      },
      {
        type: "comparison",
        left: {
          label: "Thuế thu nhập doanh nghiệp",
          text: "Đánh trên lợi nhuận, hiện rõ trên báo cáo kết quả kinh doanh, làm giảm lợi nhuận sau thuế.",
        },
        right: {
          label: "Thuế giá trị gia tăng",
          text: "Thu hộ từ người mua, đi qua bảng cân đối, không giảm lợi nhuận nhưng chiếm vốn lưu động.",
        },
      },
      {
        type: "heading",
        text: "Thuế nhà thầu: chi phí ẩn trong hợp đồng quốc tế",
      },
      {
        type: "paragraph",
        text: "Khi doanh nghiệp Việt Nam trả tiền cho một tổ chức nước ngoài có thu nhập phát sinh tại Việt Nam - phí bản quyền phần mềm, phí dịch vụ kỹ thuật, lãi vay - bên Việt Nam thường có nghĩa vụ khấu trừ và nộp thay phần thuế tương ứng. Nếu hợp đồng cam kết đối tác nhận đủ số tiền ròng, phần thuế đó trở thành chi phí tăng thêm của bên Việt Nam. Đây là lý do một hợp đồng dịch vụ nước ngoài có thể đắt hơn đáng kể so với con số hai bên vừa bắt tay.",
      },
      {
        type: "callout",
        label: "Kiểm chứng quy định hiện hành",
        text: "Thuế suất, phương pháp tính và các trường hợp được miễn giảm của cả hai sắc thuế này đều thay đổi theo từng lần sửa đổi văn bản pháp luật, và các hiệp định tránh đánh thuế hai lần có thể làm thay đổi kết quả. Hãy dùng bài học này để biết phải hỏi gì, rồi tra quy định có hiệu lực tại thời điểm áp dụng.",
      },
      {
        type: "closing",
        lines: [
          "Không phải sắc thuế nào cũng hiện lên ở dòng lợi nhuận - nhưng sắc thuế nào cũng hiện lên ở dòng tiền.",
          "Bài cuối chặng nối thuế trở lại với kế toán: vì sao trên bảng cân đối lại có một khoản tên là thuế hoãn lại.",
        ],
      },
    ],
  },
  {
    id: 1445,
    slug: "thue-hoan-lai-deferred-tax",
    title: "Chuẩn mực & Thuế, Bài 5: Thuế hoãn lại - khoản mục khó hiểu nhất trên bảng cân đối",
    subtitle: "Chênh lệch tạm thời giữa kế toán và thuế, và vì sao nó nói cho bạn biết về tương lai",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⏱️",
    track: "professional",
    whyItMatters:
      "Thuế hoãn lại là khoản mục mà phần lớn người học bỏ qua vì khó, nhưng nó là cầu nối giữa hai bài trước và toàn bộ phần kế toán bạn đã học. Đọc được nó, bạn biết được số thuế doanh nghiệp sẽ phải nộp trong tương lai và cả mức độ tự tin của ban điều hành vào lợi nhuận sắp tới.",
    openingQuestion:
      "Thuế hoãn lại phát sinh từ đâu?",
    openingOptions: [
      "Từ việc doanh nghiệp xin gia hạn thời điểm nộp thuế với cơ quan quản lý",
      "Từ chênh lệch tạm thời giữa cách ghi nhận của kế toán và của cơ quan thuế",
      "Từ phần thuế mà doanh nghiệp đang tranh chấp và chưa nộp cho ngân sách",
      "Từ khoản thuế đã nộp thừa trong các năm trước và đang chờ được hoàn lại",
    ],
    correctOption: 1,
    explanation:
      "Kế toán và thuế nhìn cùng một giao dịch theo hai lịch trình khác nhau. Ví dụ điển hình là khấu hao: kế toán khấu hao đều trong mười năm, còn quy định thuế có thể cho khấu hao nhanh hơn. Tổng chi phí qua toàn bộ vòng đời tài sản là như nhau, chỉ khác thời điểm. Chênh lệch tạm thời đó tạo ra một khoản thuế sẽ phải nộp hoặc sẽ được giảm trong tương lai - và kế toán ghi nhận nó ngay hôm nay dưới dạng tài sản hoặc nợ thuế hoãn lại.",
    diagram: [
      { label: "Kế toán ghi nhận theo lịch A", arrow: true },
      { label: "Thuế ghi nhận theo lịch B", arrow: true },
      { label: "Chênh lệch tạm thời", arrow: true },
      { label: "Tài sản hoặc nợ thuế hoãn lại" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Doanh nghiệp vừa đầu tư lớn vào tài sản cố định",
      description:
        "Một doanh nghiệp vừa xây xong nhà máy sẽ thường có nợ thuế hoãn lại tăng mạnh, do quy định thuế cho khấu hao nhanh hơn so với cách kế toán trải đều. Trong vài năm đầu, doanh nghiệp nộp ít thuế hơn mức tương ứng với lợi nhuận kế toán, phần chênh được ghi thành nợ thuế hoãn lại. Ở các năm sau, chiều đảo ngược: chi phí khấu hao được trừ thuế đã hết trong khi kế toán vẫn còn khấu hao, nên số thuế phải nộp thực tế cao hơn.",
    },
    quiz: [
      {
        question: "Chênh lệch tạm thời khác chênh lệch vĩnh viễn ở điểm nào?",
        options: [
          "Chênh lệch tạm thời sẽ đảo ngược ở các kỳ sau, chênh lệch vĩnh viễn thì không",
          "Chênh lệch tạm thời chỉ xảy ra ở doanh nghiệp có vốn đầu tư nước ngoài",
          "Chênh lệch vĩnh viễn phát sinh từ khấu hao còn tạm thời từ tiền phạt hành chính",
          "Chênh lệch tạm thời được ghi nhận vào vốn chủ, vĩnh viễn ghi vào kết quả kinh doanh",
        ],
        correct: 0,
        explanation:
          "Chỉ chênh lệch tạm thời mới tạo ra thuế hoãn lại, vì nó sẽ tự triệt tiêu theo thời gian. Tiền phạt vi phạm hành chính là chênh lệch vĩnh viễn: nó không bao giờ được trừ thuế, nên không sinh ra khoản hoãn lại nào.",
      },
      {
        question: "Tài sản thuế hoãn lại thể hiện điều gì?",
        options: [
          "Khoản tiền doanh nghiệp đã nộp thừa và sẽ được ngân sách hoàn lại bằng tiền mặt",
          "Lợi ích thuế sẽ được hưởng trong tương lai, thường từ lỗ lũy kế hoặc dự phòng",
          "Giá trị của các tài sản được miễn thuế mà doanh nghiệp đang nắm giữ",
          "Số thuế mà doanh nghiệp dự kiến sẽ được giảm nhờ chính sách ưu đãi đầu tư",
        ],
        correct: 1,
        explanation:
          "Đó là một quyền lợi kinh tế trong tương lai. Nhưng nó chỉ có giá trị nếu doanh nghiệp thực sự có lãi trong tương lai để dùng nó - đó là điểm mấu chốt của câu hỏi tiếp theo.",
      },
      {
        question: "Vì sao việc doanh nghiệp ghi nhận tài sản thuế hoãn lại là một tín hiệu đáng chú ý?",
        options: [
          "Vì nó cho thấy doanh nghiệp đang gặp khó khăn trong việc kê khai thuế",
          "Vì ghi nhận nó đòi hỏi ban điều hành tin rằng sẽ có đủ lợi nhuận tương lai",
          "Vì nó bắt buộc doanh nghiệp phải công bố kế hoạch kinh doanh chi tiết cho năm sau",
          "Vì nó làm giảm vốn chủ sở hữu và ảnh hưởng tới khả năng chi trả cổ tức tiền mặt",
        ],
        correct: 1,
        explanation:
          "Chuẩn mực chỉ cho ghi nhận khi có khả năng chắc chắn sẽ có lợi nhuận chịu thuế để bù trừ. Vì vậy việc ghi nhận hay xóa bỏ một khoản tài sản thuế hoãn lại lớn là lời phát biểu gián tiếp của ban điều hành về triển vọng lợi nhuận - và việc xóa bỏ nó là tín hiệu tiêu cực mạnh.",
      },
      {
        question: "Nợ thuế hoãn lại lớn và tăng đều qua các năm nói lên điều gì?",
        options: [
          "Doanh nghiệp đang nợ tiền thuế của ngân sách và có rủi ro bị xử phạt chậm nộp",
          "Doanh nghiệp đang đầu tư mạnh và hưởng lợi về thời điểm nộp thuế",
          "Doanh nghiệp đang bị cơ quan thuế thanh tra và phải trích lập cho khoản truy thu",
          "Doanh nghiệp đang chuyển dần lợi nhuận sang các công ty con ở nước ngoài",
        ],
        correct: 1,
        explanation:
          "Đây không phải khoản nợ quá hạn với ngân sách mà là hệ quả của việc chi phí được trừ thuế đến sớm hơn chi phí kế toán. Với doanh nghiệp liên tục tái đầu tư, khoản này có thể duy trì hoặc tăng gần như vô hạn - trên thực tế nó hoạt động như một nguồn vốn không lãi suất.",
      },
    
    {
      "question": "Vì sao doanh nghiệp lỗ nhiều năm nhưng vẫn ghi nhận tài sản thuế hoãn lại lại là điều cần soi kỹ?",
      "options": [
        "Vì việc ghi nhận đó ngầm khẳng định họ tin sẽ có lãi đủ để dùng hết khoản lỗ",
        "Vì tài sản thuế hoãn lại chỉ được ghi nhận khi doanh nghiệp có lợi nhuận",
        "Vì khoản này làm tăng nghĩa vụ thuế phải nộp trong các kỳ báo cáo tiếp theo",
        "Vì cơ quan thuế có thể không chấp nhận việc chuyển lỗ sang các năm sau"
      ],
      "correct": 0,
      "explanation": "Ghi nhận tài sản thuế hoãn lại là một tuyên bố về tương lai: sẽ có lợi nhuận chịu thuế để bù trừ khoản lỗ này. Khi dự báo đó không thành, khoản mục phải xóa đi và cú xóa xuất hiện thẳng trong lợi nhuận của năm sau."
    }
    ],
    keyTakeaways: [
      "Chỉ chênh lệch tạm thời tạo ra thuế hoãn lại; chênh lệch vĩnh viễn thì không",
      "Tài sản thuế hoãn lại là lợi ích thuế tương lai, chỉ có giá trị nếu doanh nghiệp thực sự có lãi",
      "Việc ghi nhận hay xóa bỏ tài sản thuế hoãn lại lớn là tín hiệu về triển vọng lợi nhuận",
      "Nợ thuế hoãn lại ở doanh nghiệp liên tục đầu tư hoạt động gần như một nguồn vốn không lãi suất",
    ],
    practicePrompt: {
      question:
        "Một doanh nghiệp xóa bỏ phần lớn tài sản thuế hoãn lại đã ghi nhận trong năm nay. Nên hiểu thế nào?",
      options: [
        "Doanh nghiệp vừa được cơ quan thuế hoàn lại khoản tiền tương ứng bằng tiền mặt",
        "Ban điều hành không còn tin sẽ có đủ lợi nhuận tương lai để dùng lợi ích thuế đó",
        "Doanh nghiệp đã hoàn tất nghĩa vụ thuế cho toàn bộ các năm trước và không còn tồn đọng",
        "Đây là thủ tục kế toán định kỳ và không mang thông tin gì về triển vọng kinh doanh",
      ],
      correct: 1,
      explanation:
        "Đây là một trong những tín hiệu cảnh báo mạnh nhất mà báo cáo tài chính phát ra, và nó thường xuất hiện trước khi doanh nghiệp thừa nhận khó khăn bằng lời. Khoản xóa bỏ cũng làm lợi nhuận trong kỳ giảm mạnh dù không có đồng tiền nào chảy ra khỏi doanh nghiệp.",
    },
    summary: {
      keyIdea: "Thuế hoãn lại là chỗ kế toán và thuế gặp nhau, và là nơi ban điều hành để lộ kỳ vọng về tương lai",
      commonMistake: "Bỏ qua khoản này vì khó hiểu, và mất luôn tín hiệu cảnh báo sớm mà nó mang lại",
      action: "Tìm dòng thuế hoãn lại trên bảng cân đối của một doanh nghiệp sản xuất và đọc thuyết minh giải thích nguồn gốc của nó.",
    },
    application: {
      title: "Ba câu hỏi khi thấy thuế hoãn lại",
      message:
        "Khoản này đến từ chênh lệch nào - khấu hao, dự phòng hay lỗ lũy kế? Nó sẽ đảo ngược khi nào? Và nếu là tài sản thuế hoãn lại, doanh nghiệp có triển vọng lợi nhuận đủ để dùng nó không?",
      secondary: "Ba câu này biến một khoản mục khó hiểu thành một nguồn thông tin về tương lai của doanh nghiệp.",
    },
    sections: [
      {
        type: "lead",
        text: "Trên bảng cân đối của gần như mọi doanh nghiệp sản xuất có một dòng mà người học thường lướt qua vì không hiểu: thuế hoãn lại. Nó không khó vì phức tạp, mà khó vì trước đó không ai nói cho bạn biết kế toán và thuế là hai hệ thống ghi chép song song với hai lịch trình khác nhau.",
      },
      {
        type: "formula",
        title: "Nguồn gốc của thuế hoãn lại",
        label: "Chênh lệch tạm thời nhân thuế suất",
        equation: "Thuế hoãn lại = Chênh lệch tạm thời × Thuế suất dự kiến khi đảo ngược",
        variables: [
          { symbol: "Chênh lệch tạm thời", name: "Khác biệt về thời điểm", description: "Giá trị ghi sổ kế toán so với cơ sở tính thuế của cùng một khoản mục" },
          { symbol: "Thuế suất", name: "Mức áp dụng tương lai", description: "Thuế suất dự kiến có hiệu lực khi chênh lệch đảo ngược" },
        ],
        example: {
          title: "Ví dụ khấu hao",
          calculation: "Giá trị sổ sách 700, cơ sở tính thuế 500, chênh 200, thuế suất 20%",
          result: "Nợ thuế hoãn lại 40",
          explanation:
            "Doanh nghiệp đã được trừ thuế nhiều hơn phần chi phí kế toán, nên trong tương lai sẽ phải nộp thêm 40 khi chênh lệch này đảo ngược. Ghi nhận ngay hôm nay chính là để người đọc báo cáo biết trước điều đó.",
        },
      },
      {
        type: "comparison",
        left: {
          label: "Tài sản thuế hoãn lại",
          text: "Sẽ được giảm thuế trong tương lai. Thường từ lỗ lũy kế và dự phòng. Chỉ ghi nhận khi tin rằng sẽ có lãi để dùng.",
        },
        right: {
          label: "Nợ thuế hoãn lại",
          text: "Sẽ phải nộp thêm thuế trong tương lai. Thường từ khấu hao nhanh và đánh giá lại tài sản.",
        },
      },
      {
        type: "callout",
        label: "Vì sao đây là bài khép chặng",
        text: "Thuế hoãn lại chỉ tồn tại vì kế toán và thuế đo cùng một thứ theo hai cách. Đó chính là chủ đề xuyên suốt của cả chặng: mọi con số bạn đọc đều là kết quả của một bộ quy tắc đo lường cụ thể, và hiểu bộ quy tắc đó quan trọng ngang với hiểu doanh nghiệp.",
      },
      {
        type: "closing",
        lines: [
          "Khoản mục khó hiểu nhất trên bảng cân đối lại là khoản nói nhiều nhất về tương lai.",
          "Kết thúc chặng: bạn đã có đủ công cụ để đọc một báo cáo Việt Nam đúng với bối cảnh chuẩn mực và thuế của nó.",
        ],
      },
    ],
  },
  {
    id: 1446,
    slug: "chi-phi-duoc-tru-va-khong-duoc-tru",
    title: "Chuẩn mực & Thuế, Bài 6: Chi phí được trừ và không được trừ",
    subtitle: "Vì sao lợi nhuận kế toán và lợi nhuận tính thuế không bao giờ bằng nhau",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "professional",
    whyItMatters:
      "Đọc một báo cáo tài chính mà không biết vì sao thuế phải nộp không khớp với lợi nhuận nhân thuế suất là bỏ sót một trong những dòng dễ gây hiểu lầm nhất. Khoảng cách đó không phải lỗi kế toán - nó là hai hệ thống quy tắc khác nhau đo cùng một doanh nghiệp.",
    openingQuestion: "Vì sao lợi nhuận tính thuế thường khác lợi nhuận kế toán?",
    openingOptions: [
      "Vì kế toán và cơ quan thuế dùng hai kỳ báo cáo khác nhau trong năm",
      "Vì luật thuế loại một số chi phí kế toán ghi",
      "Vì doanh nghiệp được chọn con số nào có lợi hơn để kê khai",
      "Vì lợi nhuận kế toán luôn được làm tròn theo quy định công bố",
    ],
    correctOption: 1,
    explanation:
      "Kế toán đo hiệu quả kinh doanh và ghi nhận mọi chi phí thực sự phát sinh. Luật thuế đo cơ sở tính thuế và chỉ chấp nhận những chi phí đáp ứng điều kiện của nó - có hóa đơn chứng từ hợp lệ, phục vụ hoạt động sản xuất kinh doanh, và không vượt các mức khống chế. Chi phí bị loại không biến mất khỏi báo cáo tài chính; nó chỉ bị cộng ngược lại khi tính thu nhập chịu thuế. Đây là lý do thuế thực nộp gần như không bao giờ bằng lợi nhuận trước thuế nhân thuế suất.",
    diagram: [
      { label: "Lợi nhuận kế toán trước thuế", arrow: true },
      { label: "Cộng lại chi phí không được trừ", arrow: true },
      { label: "Trừ thu nhập được miễn", arrow: true },
      { label: "Thu nhập tính thuế × thuế suất" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Doanh nghiệp báo lãi nhưng nộp thuế cao bất thường",
      description:
        "Một doanh nghiệp báo lợi nhuận trước thuế 10 tỷ nhưng nộp thuế tương đương thuế suất trên 30%. Nguyên nhân thường không phải sai sót mà là các khoản bị loại: chi phí không có hóa đơn hợp lệ, khoản chi vượt mức khống chế, khoản phạt vi phạm hành chính, hoặc lãi vay vượt trần khống chế đối với giao dịch liên kết. Với người phân tích, tỷ lệ thuế hiệu dụng lệch xa thuế suất danh nghĩa là một tín hiệu đáng đào sâu chứ không phải chi tiết kỹ thuật.",
    },
    quiz: [
      {
        question: "Chi phí không có hóa đơn chứng từ hợp lệ được xử lý thế nào?",
        options: [
          "Vẫn ghi vào báo cáo tài chính nhưng bị loại khi tính thuế",
          "Bị xóa khỏi cả báo cáo tài chính lẫn tờ khai thuế",
          "Được chấp nhận nếu doanh nghiệp giải trình bằng văn bản",
          "Được trừ dần trong ba năm tiếp theo thay vì trừ ngay",
        ],
        correct: 0,
        explanation:
          "Hai hệ thống độc lập với nhau: kế toán ghi nhận thực tế phát sinh, thuế quyết định khoản nào được trừ. Chi phí bị loại làm tăng thu nhập tính thuế mà không làm đổi lợi nhuận kế toán đã công bố.",
      },
      {
        question: "Khoản phạt vi phạm hành chính được xử lý ra sao khi tính thuế?",
        options: [
          "Không được trừ, vì cho trừ sẽ làm nhà nước gánh một phần tiền phạt",
          "Được trừ toàn bộ vì đây là chi phí thực tế doanh nghiệp đã chi",
          "Được trừ một nửa theo nguyên tắc chia sẻ rủi ro với nhà nước",
          "Được trừ nếu doanh nghiệp đã nộp phạt đúng hạn quy định",
        ],
        correct: 0,
        explanation:
          "Logic ở đây là chính sách chứ không phải kế toán: mỗi đồng chi phí được trừ làm giảm thuế phải nộp, nên cho trừ tiền phạt đồng nghĩa nhà nước hoàn lại một phần khoản phạt vừa áp. Điều đó triệt tiêu tác dụng răn đe.",
      },
      {
        question: "Tỷ lệ thuế hiệu dụng của một doanh nghiệp là gì?",
        options: [
          "Thuế thực nộp chia cho lợi nhuận kế toán trước thuế",
          "Thuế suất danh nghĩa mà pháp luật quy định cho ngành đó",
          "Thuế thực nộp chia cho tổng doanh thu trong kỳ báo cáo",
          "Trung bình thuế suất của các quốc gia doanh nghiệp hoạt động",
        ],
        correct: 0,
        explanation:
          "Đây là con số cho biết doanh nghiệp thực sự trả bao nhiêu, thay vì con số luật quy định. Chênh lệch giữa hiệu dụng và danh nghĩa chính là tổng hợp của chi phí bị loại, thu nhập được miễn và các ưu đãi thuế đang hưởng.",
      },
      {
        question: "Lợi nhuận trước thuế 20 tỷ, chi phí bị loại 3 tỷ, thuế suất 20%. Thuế phải nộp là bao nhiêu?",
        options: [
          "4,6 tỷ (= (20 + 3) × 20%, cộng lại phần bị loại)",
          "4 tỷ (= 20 × 20%, tính trên lợi nhuận kế toán)",
          "3,4 tỷ (= (20 − 3) × 20%, trừ phần bị loại)",
          "0,6 tỷ (= 3 × 20%, chỉ tính trên phần bị loại)",
        ],
        correct: 0,
        explanation:
          "Chi phí bị loại được cộng ngược vào cơ sở tính thuế, không phải trừ ra. Thu nhập tính thuế là 23 tỷ, thuế 4,6 tỷ - và tỷ lệ thuế hiệu dụng là 23% chứ không phải 20%.",
      },
      {
        question: "Vì sao người phân tích nên chú ý khi tỷ lệ thuế hiệu dụng thay đổi mạnh giữa các năm?",
        options: [
          "Vì nó có thể phản ánh ưu đãi sắp hết hạn hoặc khoản bị loại lớn",
          "Vì thuế suất danh nghĩa được điều chỉnh lại hằng năm theo lạm phát",
          "Vì doanh nghiệp được phép chọn tỷ lệ thuế áp dụng cho từng năm",
          "Vì tỷ lệ thuế hiệu dụng quyết định mức cổ tức được phép chi trả",
        ],
        correct: 0,
        explanation:
          "Ưu đãi thuế có thời hạn, và năm hết ưu đãi thì lợi nhuận sau thuế tụt xuống dù kinh doanh không đổi. Dự báo lợi nhuận mà bỏ qua lịch trình ưu đãi là một trong những lỗi phổ biến khi định giá doanh nghiệp Việt Nam.",
      },
    ],
    keyTakeaways: [
      "Kế toán và thuế là hai hệ quy tắc độc lập đo cùng một doanh nghiệp, nên hai con số lợi nhuận khác nhau",
      "Chi phí bị loại được cộng ngược vào thu nhập tính thuế, không bị xóa khỏi báo cáo tài chính",
      "Tỷ lệ thuế hiệu dụng cho biết doanh nghiệp thực trả bao nhiêu, khác với thuế suất luật định",
      "Thuế hiệu dụng biến động mạnh thường là dấu hiệu ưu đãi thay đổi hoặc có khoản bị loại lớn",
    ],
    practicePrompt: {
      question:
        "Bạn dự báo lợi nhuận sau thuế của một doanh nghiệp đang hưởng ưu đãi thuế sắp hết hạn. Điều gì dễ bị bỏ sót nhất?",
      options: [
        "Doanh thu sẽ giảm ngay khi ưu đãi thuế kết thúc theo lộ trình",
        "Thuế hiệu dụng nhảy lên mức phổ thông, kéo lợi nhuận sau thuế xuống",
        "Doanh nghiệp phải hoàn lại toàn bộ phần thuế đã được ưu đãi trước đó",
        "Chi phí không được trừ sẽ tăng lên khi ưu đãi thuế chấm dứt",
      ],
      correct: 1,
      explanation:
        "Đây là một trong những cú hụt lợi nhuận dễ đoán trước nhất mà vẫn hay bị bỏ qua: hoạt động kinh doanh không đổi một chút nào, nhưng dòng thuế trong mô hình phải đổi. Lịch trình ưu đãi thường nằm trong thuyết minh báo cáo tài chính.",
    },
    summary: {
      keyIdea: "Lợi nhuận kế toán và thu nhập tính thuế trả lời hai câu hỏi khác nhau",
      formula: "Thu nhập tính thuế = Lợi nhuận kế toán + Chi phí không được trừ − Thu nhập được miễn",
      commonMistake: "Nhân lợi nhuận trước thuế với thuế suất để ước tính thuế phải nộp",
      action: "Tính tỷ lệ thuế hiệu dụng ba năm gần nhất của một doanh nghiệp niêm yết và tìm lời giải thích cho chênh lệch.",
    },
    application: {
      title: "Đọc dòng thuế cho đúng",
      message:
        "Tỷ lệ thuế hiệu dụng của doanh nghiệp này là bao nhiêu, và nó lệch bao xa so với thuế suất phổ thông? Chênh lệch đó đến từ ưu đãi hay từ chi phí bị loại? Ưu đãi còn hiệu lực tới bao giờ?",
      secondary: "Thuyết minh báo cáo tài chính thường có bảng đối chiếu giữa thuế theo thuế suất phổ thông và thuế thực tế.",
    },
    sections: [
      {
        type: "lead",
        text: "Có hai bộ sổ hợp pháp cho cùng một doanh nghiệp, và chúng không mâu thuẫn nhau. Một bộ trả lời câu hỏi doanh nghiệp làm ăn ra sao, bộ kia trả lời câu hỏi doanh nghiệp phải nộp bao nhiêu. Hiểu chỗ hai bộ tách nhau là hiểu được một dòng mà rất nhiều mô hình dự báo làm sai.",
      },
      {
        type: "conceptTable",
        title: "Bốn nhóm chi phí hay bị loại",
        subtitle: "Cơ chế thì bền, mức khống chế cụ thể thì thay đổi theo quy định từng thời kỳ",
        concepts: [
          { vi: "Thiếu chứng từ hợp lệ", en: "Insufficient documentation", def: "Khoản chi thật nhưng không có hóa đơn hoặc chứng từ đáp ứng yêu cầu. Đây là nhóm bị loại phổ biến nhất trong thực tế." },
          { vi: "Vượt mức khống chế", en: "Capped expenses", def: "Một số loại chi phí chỉ được trừ tới một ngưỡng nhất định; phần vượt bị loại. Ngưỡng do quy định từng thời kỳ ấn định." },
          { vi: "Khoản phạt", en: "Penalties", def: "Tiền phạt vi phạm hành chính không được trừ, vì cho trừ sẽ làm ngân sách gánh hộ một phần khoản phạt." },
          { vi: "Không phục vụ kinh doanh", en: "Non-business expenses", def: "Khoản chi mang tính cá nhân hoặc không liên quan tới hoạt động sản xuất kinh doanh của doanh nghiệp." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao đây là việc của người phân tích, không chỉ của kế toán",
        text: "Tỷ lệ thuế hiệu dụng là một trong những dòng dễ dự báo sai nhất trong mô hình tài chính. Một doanh nghiệp đang hưởng ưu đãi sẽ có lợi nhuận sau thuế đẹp hơn hẳn năng lực thật, và cú điều chỉnh khi ưu đãi hết hạn là một sự kiện đã biết trước ngày - chỉ cần đọc thuyết minh là thấy.",
      },
      {
          "type": "heading",
          "text": "Vì sao khoảng chênh giữa hai bộ sổ lại quan trọng với người phân tích"
        },
        {
          "type": "paragraph",
          "text": "Lợi nhuận kế toán và thu nhập tính thuế khác nhau vì hai bộ quy tắc phục vụ hai mục đích khác nhau, và phần chênh lệch đó hiện ra trên báo cáo dưới dạng thuế hoãn lại. Với người đọc báo cáo, đây là chỗ đáng soi: một doanh nghiệp có tỷ lệ thuế hiệu dụng thấp bất thường qua nhiều năm hoặc đang hưởng ưu đãi có thời hạn, hoặc đang có những khoản chênh lệch tạm thời sẽ đảo chiều - và cả hai đều làm dự phóng thuế của các năm sau sai nếu cứ lấy tỷ lệ hiện tại nhân ra."
        },
      {
        type: "closing",
        lines: [
          "Thuế không phải một tỷ lệ cố định nhân vào lợi nhuận; nó là kết quả của một bộ quy tắc riêng.",
          "Bài sau đi vào hai cơ chế định hình nghĩa vụ thuế của doanh nghiệp FDI tại Việt Nam: ưu đãi và chuyển giá.",
        ],
      },
    ],
  },
  {
    id: 1447,
    slug: "uu-dai-thue-va-chuyen-gia",
    title: "Chuẩn mực & Thuế, Bài 7: Ưu đãi thuế và giao dịch liên kết",
    subtitle: "Hai cơ chế định hình nghĩa vụ thuế của doanh nghiệp có vốn nước ngoài",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🌐",
    track: "professional",
    whyItMatters:
      "Việt Nam là nền kinh tế có tỷ trọng FDI rất lớn, nên hai chủ đề này quyết định lợi nhuận sau thuế của một phần đáng kể doanh nghiệp trong nước. Với người phân tích, chúng cũng là nơi lợi nhuận công bố dễ khác xa năng lực kinh doanh thật nhất.",
    openingQuestion: "Ưu đãi thuế ảnh hưởng thế nào tới việc định giá một doanh nghiệp?",
    openingOptions: [
      "Không ảnh hưởng vì ưu đãi chỉ là chính sách hành chính tạm thời",
      "Nâng lợi nhuận sau thuế trong thời gian ưu đãi, nên phải mô hình riêng",
      "Làm giảm giá trị doanh nghiệp vì phụ thuộc vào chính sách nhà nước",
      "Chỉ ảnh hưởng tới doanh nghiệp có vốn đầu tư nước ngoài",
    ],
    correctOption: 1,
    explanation:
      "Ưu đãi thuế có thời hạn: thường là một số năm miễn thuế, rồi một số năm giảm thuế, rồi về mức phổ thông. Lợi nhuận sau thuế trong giai đoạn ưu đãi không phản ánh năng lực dài hạn, và mô hình định giá nào lấy tỷ lệ thuế của năm hiện tại rồi kéo ra vô hạn sẽ thổi phồng giá trị doanh nghiệp một cách có hệ thống. Cách làm đúng là mô hình dòng thuế theo đúng lịch trình ưu đãi, rồi mới chiết khấu.",
    diagram: [
      { label: "Giai đoạn miễn thuế", arrow: true },
      { label: "Giai đoạn giảm thuế", arrow: true },
      { label: "Về thuế suất phổ thông", arrow: true },
      { label: "Lợi nhuận sau thuế bậc thang theo lịch trình" },
    ],
    realWorldExample: {
      company: "Doanh nghiệp FDI hết ưu đãi",
      description:
        "Một doanh nghiệp sản xuất FDI báo lợi nhuận sau thuế tăng đều nhiều năm, rồi đột ngột giảm mạnh dù doanh thu và biên gộp không đổi. Nguyên nhân nằm ở dòng thuế: giai đoạn miễn thuế kết thúc và doanh nghiệp bước sang giai đoạn giảm thuế, rồi vài năm sau về mức phổ thông. Với nhà đầu tư chỉ nhìn tăng trưởng lợi nhuận sau thuế trong quá khứ, cú giảm này trông như doanh nghiệp xấu đi - trong khi hoạt động kinh doanh không thay đổi gì.",
    },
    quiz: [
      {
        question: "Giao dịch liên kết là gì?",
        options: [
          "Giao dịch giữa các bên có quan hệ sở hữu hoặc kiểm soát lẫn nhau",
          "Giao dịch giữa doanh nghiệp và cơ quan quản lý thuế địa phương",
          "Giao dịch có giá trị vượt ngưỡng phải công bố thông tin ra thị trường",
          "Giao dịch được thực hiện thông qua một ngân hàng trung gian",
        ],
        correct: 0,
        explanation:
          "Công ty mẹ bán nguyên liệu cho công ty con, hoặc thu phí bản quyền từ chi nhánh là những ví dụ điển hình. Vấn đề không nằm ở việc giao dịch tồn tại mà ở chỗ giá của nó do hai bên cùng một chủ tự đặt ra.",
      },
      {
        question: "Nguyên tắc giá thị trường trong quản lý giao dịch liên kết yêu cầu gì?",
        options: [
          "Giá giữa các bên liên kết phải như giá giữa hai bên độc lập",
          "Mọi giao dịch liên kết phải được cơ quan thuế phê duyệt trước",
          "Doanh nghiệp phải chuyển toàn bộ lợi nhuận về công ty mẹ",
          "Giá giao dịch liên kết phải thấp hơn giá thị trường ít nhất 10%",
        ],
        correct: 0,
        explanation:
          "Đây là nguyên tắc arm's length, nền tảng của mọi quy định chuyển giá trên thế giới. Nó không cấm giao dịch nội bộ tập đoàn, chỉ yêu cầu định giá như thể hai bên không có quan hệ với nhau.",
      },
      {
        question: "Vì sao chuyển giá là mối quan tâm lớn với nền kinh tế nhiều FDI?",
        options: [
          "Vì giá nội bộ có thể dịch chuyển lợi nhuận sang nơi thuế suất thấp hơn",
          "Vì giao dịch liên kết luôn có giá cao hơn giao dịch thông thường",
          "Vì doanh nghiệp FDI không phải nộp thuế trong thời gian đầu hoạt động",
          "Vì chuyển giá làm giảm lượng ngoại tệ chảy vào nền kinh tế trong nước",
        ],
        correct: 0,
        explanation:
          "Nâng giá nguyên liệu nhập từ công ty mẹ hoặc tính phí bản quyền cao sẽ đẩy chi phí lên và lợi nhuận xuống ở nơi có thuế suất cao. Doanh nghiệp báo lỗ triền miên ở Việt Nam mà vẫn liên tục mở rộng nhà máy là hình ảnh quen thuộc của vấn đề này.",
      },
      {
        question: "Doanh nghiệp hưởng miễn thuế 4 năm rồi giảm 50% trong 9 năm. Mô hình định giá nên làm gì?",
        options: [
          "Mô hình dòng thuế theo đúng từng giai đoạn của lịch trình",
          "Dùng tỷ lệ thuế của năm hiện tại cho toàn bộ giai đoạn dự báo",
          "Bỏ qua ưu đãi vì nó không ảnh hưởng tới dòng tiền hoạt động",
          "Dùng thuế suất phổ thông cho mọi năm để tính toán thận trọng",
        ],
        correct: 0,
        explanation:
          "Dùng tỷ lệ thuế năm hiện tại kéo ra vô hạn sẽ thổi phồng giá trị; dùng thuế suất phổ thông cho mọi năm lại bỏ mất phần giá trị thật của ưu đãi. Cách đúng là mô hình đúng từng bậc thang, kể cả khi nó làm bảng tính phức tạp hơn.",
      },
      {
        question: "Hồ sơ xác định giá giao dịch liên kết phục vụ mục đích gì?",
        options: [
          "Chứng minh giá nội bộ phù hợp với giá giữa các bên độc lập",
          "Xin phê duyệt của cơ quan thuế trước khi thực hiện giao dịch",
          "Kê khai toàn bộ lợi nhuận chuyển về công ty mẹ trong kỳ",
          "Đăng ký mức ưu đãi thuế mà doanh nghiệp được hưởng",
        ],
        correct: 0,
        explanation:
          "Nghĩa vụ chứng minh thuộc về doanh nghiệp: phải có phân tích so sánh cho thấy giá nội bộ nằm trong khoảng giá thị trường. Thiếu hồ sơ, cơ quan thuế có quyền ấn định lại giá và truy thu.",
      },
    ],
    keyTakeaways: [
      "Ưu đãi thuế có lịch trình bậc thang, nên lợi nhuận sau thuế trong giai đoạn ưu đãi không phản ánh năng lực dài hạn",
      "Nguyên tắc giá thị trường yêu cầu định giá giao dịch nội bộ như giữa hai bên độc lập",
      "Giá nội bộ có thể dịch chuyển lợi nhuận qua biên giới, nên đây là trọng tâm quản lý ở nền kinh tế nhiều FDI",
      "Nghĩa vụ chứng minh giá hợp lý thuộc về doanh nghiệp, không phải cơ quan thuế",
    ],
    practicePrompt: {
      question:
        "Một doanh nghiệp FDI báo lỗ nhiều năm liên tiếp nhưng vẫn liên tục mở rộng công suất. Giả thuyết nào đáng kiểm tra trước?",
      options: [
        "Doanh nghiệp đang chấp nhận lỗ để giành thị phần dài hạn",
        "Cấu trúc giao dịch liên kết có thể đang dịch chuyển lợi nhuận ra ngoài",
        "Số liệu kế toán bị sai sót và cần được kiểm toán lại toàn bộ",
        "Doanh nghiệp sắp rút khỏi thị trường nên đang thanh lý tài sản",
      ],
      correct: 1,
      explanation:
        "Lỗ thật thì không ai rót thêm vốn mở rộng năm này qua năm khác. Mâu thuẫn giữa báo cáo lỗ và hành vi đầu tư là dấu hiệu kinh điển khiến cơ quan thuế và người phân tích cùng nhìn vào cấu trúc giao dịch nội bộ.",
    },
    summary: {
      keyIdea: "Nghĩa vụ thuế của doanh nghiệp FDI được định hình bởi lịch trình ưu đãi và cách định giá giao dịch nội bộ",
      commonMistake: "Kéo tỷ lệ thuế của năm hiện tại ra toàn bộ giai đoạn dự báo",
      action: "Tìm thuyết minh về ưu đãi thuế trong báo cáo của một doanh nghiệp FDI niêm yết và dựng lịch trình thuế theo từng năm.",
    },
    application: {
      title: "Khi phân tích một doanh nghiệp FDI",
      message:
        "Doanh nghiệp đang ở giai đoạn nào của lịch trình ưu đãi? Tỷ trọng giao dịch với các bên liên kết là bao nhiêu? Và biên lợi nhuận có bất thường so với doanh nghiệp cùng ngành không có quan hệ liên kết?",
      secondary: "Thuyết minh báo cáo tài chính bắt buộc công bố giao dịch với bên liên kết - đó là nơi bắt đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai cơ chế trong bài này đều không xuất hiện trên báo cáo kết quả kinh doanh dưới dạng một dòng riêng, nhưng cả hai đều có thể quyết định phần lớn lợi nhuận sau thuế của một doanh nghiệp. Bỏ qua chúng khi phân tích một nền kinh tế nhiều FDI là bỏ qua một nửa câu chuyện.",
      },
      {
        type: "comparison",
        left: {
          label: "Ưu đãi thuế",
          text: "Hoàn toàn hợp pháp và được thiết kế có chủ đích để thu hút đầu tư. Vấn đề với người phân tích không phải tính hợp pháp mà là tính tạm thời: nó có ngày hết hạn ghi sẵn trong hồ sơ.",
        },
        right: {
          label: "Chuyển giá",
          text: "Bản thân giao dịch nội bộ là bình thường trong mọi tập đoàn. Ranh giới nằm ở giá: định giá theo mức thị trường thì hợp lệ, định giá lệch đi để dịch chuyển lợi nhuận thì không.",
        },
      },
      {
        type: "callout",
        label: "Dấu hiệu đáng chú ý khi đọc báo cáo",
        text: "Biên lợi nhuận thấp bất thường so với doanh nghiệp cùng ngành, tỷ trọng giao dịch với bên liên kết rất cao, hoặc chuỗi năm lỗ đi kèm mở rộng đầu tư - từng dấu hiệu riêng lẻ có thể vô hại, nhưng ba dấu hiệu cùng xuất hiện thì đáng đọc kỹ phần thuyết minh về bên liên kết.",
      },
      {
          "type": "heading",
          "text": "Vì sao hai cơ chế này khó nhìn thấy từ báo cáo"
        },
        {
          "type": "paragraph",
          "text": "Ưu đãi thuế và giá giao dịch nội bộ đều không xuất hiện dưới dạng một dòng riêng trên báo cáo kết quả kinh doanh - chúng nằm ẩn trong tỷ lệ thuế hiệu dụng và trong biên lợi nhuận. Cách đọc thực dụng là so hai con số đó với các doanh nghiệp cùng ngành: tỷ lệ thuế thấp bất thường thường có nguyên nhân là ưu đãi có thời hạn, còn biên lợi nhuận thấp bất thường ở một doanh nghiệp có nhiều giao dịch với bên liên kết là chỗ cần đọc kỹ thuyết minh."
        },
      {
        type: "closing",
        lines: [
          "Lợi nhuận công bố là kết quả của cả hoạt động kinh doanh lẫn cấu trúc thuế đứng sau nó.",
          "Bài cuối chặng nói về nơi mọi thứ được kiểm chứng: quyết toán và thanh tra thuế.",
        ],
      },
    ],
  },
  {
    id: 1448,
    slug: "quyet-toan-va-thanh-tra-thue",
    title: "Chuẩn mực & Thuế, Bài 8: Quyết toán và thanh tra thuế",
    subtitle: "Điều gì xảy ra khi cơ quan thuế kiểm tra lại những gì đã kê khai",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Truy thu thuế là một khoản nợ tiềm tàng không nằm trên bảng cân đối cho tới khi nó thành hiện thực. Với người phân tích, biết cơ chế này giúp đọc được một dòng thuyết minh mà phần lớn người đọc lướt qua - và đôi khi nó lớn hơn cả lợi nhuận một năm.",
    openingQuestion: "Vì sao rủi ro thuế không xuất hiện đầy đủ trên bảng cân đối kế toán?",
    openingOptions: [
      "Vì nghĩa vụ chỉ được ghi nhận khi đã đủ điều kiện chắc chắn hơn hẳn",
      "Vì cơ quan thuế cấm doanh nghiệp công bố thông tin về thanh tra",
      "Vì thuế truy thu luôn được ghi thẳng vào vốn chủ sở hữu",
      "Vì rủi ro thuế chỉ áp dụng cho doanh nghiệp chưa niêm yết",
    ],
    correctOption: 0,
    explanation:
      "Chuẩn mực kế toán yêu cầu ghi nhận một khoản dự phòng khi nghĩa vụ có khả năng phát sinh và ước tính được đáng tin cậy. Rủi ro thuế thường chưa đạt cả hai điều kiện cho tới khi có kết luận thanh tra - nên nó nằm ở phần thuyết minh dưới dạng nợ tiềm tàng chứ không phải một con số trên bảng cân đối. Đây là lý do một doanh nghiệp có thể trông lành mạnh cho tới ngày công bố khoản truy thu.",
    diagram: [
      { label: "Doanh nghiệp kê khai và nộp thuế", arrow: true },
      { label: "Cơ quan thuế thanh tra trong thời hiệu", arrow: true },
      { label: "Ấn định lại số thuế nếu có sai lệch", arrow: true },
      { label: "Truy thu, tiền chậm nộp và phạt" },
    ],
    realWorldExample: {
      company: "Khoản truy thu bất ngờ",
      description:
        "Doanh nghiệp công bố kết luận thanh tra thuế với số truy thu cộng tiền chậm nộp và phạt lên tới hàng trăm tỷ, cho các năm tài chính đã khép sổ và đã công bố lợi nhuận từ lâu. Cổ phiếu phản ứng mạnh không chỉ vì số tiền mà vì thông tin mới: nếu cách kê khai bị bác cho những năm đã kiểm tra, thì cách kê khai của những năm chưa kiểm tra cũng đang bị đặt câu hỏi. Rủi ro vì thế lớn hơn con số vừa công bố.",
    },
    quiz: [
      {
        question: "Thời hiệu thanh tra thuế nghĩa là gì?",
        options: [
          "Khoảng thời gian cơ quan thuế còn quyền kiểm tra và ấn định",
          "Thời gian doanh nghiệp phải hoàn tất nộp thuế sau khi kê khai",
          "Thời hạn doanh nghiệp được khiếu nại kết luận thanh tra thuế",
          "Chu kỳ bắt buộc mà mọi doanh nghiệp phải được thanh tra một lần",
        ],
        correct: 0,
        explanation:
          "Khép sổ và công bố báo cáo không đồng nghĩa nghĩa vụ thuế đã chốt. Trong thời hiệu, những năm đã qua vẫn có thể được mở lại - nên rủi ro thuế tồn tại lâu hơn nhiều so với cảm nhận thông thường.",
      },
      {
        question: "Truy thu thuế thường gồm những cấu phần nào?",
        options: [
          "Số thuế còn thiếu, tiền chậm nộp và tiền phạt vi phạm",
          "Chỉ số thuế thiếu, các khoản khác được miễn",
          "Số thuế thiếu và phần lợi nhuận phải hoàn lại",
          "Số thuế thiếu nhân đôi theo nguyên tắc răn đe của luật thuế",
        ],
        correct: 0,
        explanation:
          "Ba cấu phần cộng lại thường lớn hơn nhiều so với con số thuế thiếu ban đầu, đặc biệt khi kỳ được kiểm tra đã cách đây vài năm - vì tiền chậm nộp tính theo ngày.",
      },
      {
        question: "Nợ tiềm tàng về thuế được trình bày ở đâu trên báo cáo tài chính?",
        options: [
          "Ở phần thuyết minh chứ không phải trên bảng cân đối",
          "Ở khoản mục nợ ngắn hạn trên bảng cân đối kế toán",
          "Ở báo cáo lưu chuyển tiền tệ phần hoạt động tài chính",
          "Không phải trình bày cho tới khi có kết luận chính thức",
        ],
        correct: 0,
        explanation:
          "Thuyết minh là nơi rủi ro chưa đủ điều kiện ghi nhận được nêu ra. Đây cũng là lý do đọc thuyết minh quan trọng không kém đọc các bảng số - phần rủi ro lớn nhất thường nằm ở đó.",
      },
      {
        question: "Vì sao kết luận thanh tra cho năm cũ lại ảnh hưởng tới định giá hiện tại?",
        options: [
          "Vì cách kê khai các năm chưa kiểm tra cũng có thể bị bác",
          "Vì doanh nghiệp phải lập lại toàn bộ báo cáo tài chính của các năm cũ",
          "Vì cơ quan thuế sẽ đình chỉ hoạt động doanh nghiệp cho tới khi nộp đủ",
          "Vì cổ đông được quyền yêu cầu hoàn lại cổ tức đã nhận các năm đó",
        ],
        correct: 0,
        explanation:
          "Thị trường phản ứng với thông tin chứ không chỉ với con số. Một cách xử lý thuế bị bác cho năm 2020 thường được áp dụng giống nhau ở các năm sau, nên khoản truy thu tiềm năng lớn hơn nhiều so với con số vừa công bố.",
      },
      {
        question: "Doanh nghiệp bị truy thu 50 tỷ cho ba năm cũ, lợi nhuận sau thuế năm gần nhất là 80 tỷ. Cách đọc hợp lý nhất?",
        options: [
          "Kiểm tra xem cách kê khai đó còn áp dụng cho năm nay không",
          "Coi đây là khoản một lần và bỏ qua khi định giá doanh nghiệp",
          "Kết luận doanh nghiệp gian lận và loại khỏi danh mục theo dõi",
          "Chờ tới khi doanh nghiệp nộp xong rồi mới đánh giá lại tình hình",
        ],
        correct: 0,
        explanation:
          "Câu hỏi quan trọng không phải 50 tỷ đã mất mà là cơ chế tạo ra nó đã dừng chưa. Nếu vẫn đang kê khai theo cách cũ thì đây là khoản chi phí định kỳ chưa được ghi nhận, không phải sự kiện một lần.",
      },
    ],
    keyTakeaways: [
      "Khép sổ không đồng nghĩa chốt nghĩa vụ thuế - trong thời hiệu, các năm cũ vẫn có thể được mở lại",
      "Truy thu gồm thuế thiếu, tiền chậm nộp và phạt, nên tổng thường lớn hơn nhiều số thuế ban đầu",
      "Rủi ro thuế nằm ở thuyết minh dưới dạng nợ tiềm tàng, không phải một dòng trên bảng cân đối",
      "Kết luận cho năm cũ là thông tin về các năm chưa kiểm tra, nên tác động vượt xa con số công bố",
    ],
    practicePrompt: {
      question:
        "Bạn đọc thuyết minh và thấy doanh nghiệp đang trong quá trình thanh tra thuế nhưng chưa có kết luận. Nên xử lý thế nào trong mô hình định giá?",
      options: [
        "Bỏ qua vì chưa có số liệu chính thức để đưa vào mô hình",
        "Dựng kịch bản với một khoản truy thu ước tính và xem định giá đổi bao nhiêu",
        "Giả định khoản truy thu bằng đúng lợi nhuận một năm để thận trọng tối đa",
        "Loại doanh nghiệp khỏi danh sách theo dõi cho tới khi có kết luận",
      ],
      correct: 1,
      explanation:
        "Không có con số chính thức không có nghĩa là không ước lượng được. Dựng kịch bản cho biết luận điểm đầu tư còn đứng vững tới mức truy thu nào - và đó là thứ hữu ích hơn nhiều so với việc chờ đợi hoặc bỏ qua.",
    },
    summary: {
      keyIdea: "Nghĩa vụ thuế chỉ thực sự chốt khi hết thời hiệu thanh tra, không phải khi khép sổ",
      commonMistake: "Coi khoản truy thu là sự kiện một lần mà không hỏi cơ chế tạo ra nó đã dừng chưa",
      action: "Tìm mục nợ tiềm tàng trong thuyết minh của một doanh nghiệp niêm yết và xem có nội dung thuế nào không.",
    },
    application: {
      title: "Đọc thuyết minh trước khi đọc bảng số",
      message:
        "Doanh nghiệp có đang bị thanh tra thuế không? Có khoản nợ tiềm tàng nào liên quan tới thuế không? Và nếu có khoản truy thu trong quá khứ, cách kê khai gây ra nó đã được thay đổi chưa?",
      secondary: "Nợ tiềm tàng thường nằm ở nhóm thuyết minh cuối, sau các bảng số chi tiết.",
    },
    sections: [
      {
        type: "lead",
        text: "Nộp tờ khai không phải điểm kết thúc của nghĩa vụ thuế mà là điểm bắt đầu của một khoảng thời gian trong đó cơ quan thuế còn quyền kiểm tra lại. Với người phân tích, khoảng thời gian đó là một vùng rủi ro không hiện lên ở bất kỳ con số nào trên bảng cân đối.",
      },
      {
        type: "conceptTable",
        title: "Ba lớp của một kết luận thanh tra",
        subtitle: "Cơ chế thì bền; mức tiền chậm nộp và khung phạt thay đổi theo quy định từng thời kỳ",
        concepts: [
          { vi: "Thuế truy thu", en: "Additional tax assessed", def: "Phần thuế cơ quan thuế cho rằng doanh nghiệp còn thiếu sau khi loại các khoản không được trừ hoặc ấn định lại giá giao dịch." },
          { vi: "Tiền chậm nộp", en: "Late payment interest", def: "Tính theo ngày kể từ hạn nộp gốc, nên kỳ được kiểm tra càng xa thì khoản này càng lớn - đôi khi vượt cả số thuế truy thu." },
          { vi: "Tiền phạt", en: "Penalty", def: "Áp dụng theo mức độ vi phạm, từ khai sai tới trốn thuế. Đây là phần phản ánh đánh giá của cơ quan thuế về tính chất của sai phạm." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao con số công bố thường không phải toàn bộ rủi ro",
        text: "Thanh tra thường chỉ kiểm tra một số kỳ nhất định. Nếu một cách xử lý bị bác cho những kỳ đó mà doanh nghiệp vẫn áp dụng cách tương tự cho các kỳ sau, thì khoản truy thu vừa công bố là một mẫu chứ không phải tổng. Câu hỏi đúng luôn là cơ chế đã dừng chưa, không phải con số là bao nhiêu.",
      },
      {
          "type": "heading",
          "text": "Vì sao hồ sơ quan trọng hơn lập luận"
        },
        {
          "type": "paragraph",
          "text": "Trong một cuộc thanh tra, phần lớn tranh luận không xoay quanh việc cách xử lý có đúng luật hay không mà xoay quanh việc doanh nghiệp có chứng minh được điều mình đã làm hay không. Hợp đồng, biên bản nghiệm thu, chứng từ thanh toán qua ngân hàng là thứ biến một khoản chi thành khoản được trừ. Đây cũng là lý do việc lưu hồ sơ phải làm ngay tại thời điểm phát sinh - dựng lại sau vài năm gần như luôn thiếu, và phần thiếu đó bị loại."
        },
      {
        type: "closing",
        lines: [
          "Rủi ro thuế là nợ tiềm tàng: không thấy trên bảng cân đối cho tới lúc nó thành thật.",
          "Khép lại chặng: chuẩn mực quyết định cách ghi nhận, luật thuế quyết định số phải nộp, và thanh tra quyết định điều đó có được giữ nguyên hay không.",
        ],
      },
    ],
  },
];
