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
      "VAS thiên về nguyên tắc giá gốc, IFRS cho phép và yêu cầu giá trị hợp lý ở nhiều khoản mục",
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
        "Tỷ lệ nợ trên vốn chủ và EBITDA, do nợ thuê và chi phí thuê được xếp lại",
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
      "Vì thu nhập tính thuế khác lợi nhuận kế toán, và có ưu đãi cùng khoản chuyển lỗ",
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
      "Vì doanh nghiệp chỉ thu hộ từ người mua và nộp lại, không phải người chịu thuế",
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
      "Từ chênh lệch tạm thời giữa cách ghi nhận của kế toán và của thuế",
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
];
