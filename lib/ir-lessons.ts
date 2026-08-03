import type { Lesson } from "./lesson-types";

// Chặng "Quan hệ cổ đông (IR)" (ids 1711-1715, professional track).
//
// Vì sao chặng này tồn tại: quét toàn bộ kho theo từng kỹ năng mà nghề "Chuyên
// viên Quan hệ Cổ đông" tự khai - soạn thông cáo, gặp nhà đầu tư, dựng bộ tài
// liệu, xử lý câu hỏi khó - cho ra đúng 0 bài. Kho có một bài về earnings call
// và guidance, và hết. Nghề này trước đó học ghép từ các bài tài chính doanh
// nghiệp chung, tức là học được phần "hiểu số" mà không học được phần chính:
// đứng trước người khác và chịu trách nhiệm về những con số đó.
//
// Chặng cố ý không dạy kỹ năng thuyết trình chung chung. Cái riêng của IR là
// mọi câu nói đều có hệ quả pháp lý và hệ quả định giá: nói sớm một câu là vi
// phạm công bố thông tin, nói muộn một câu là để tin đồn dẫn dắt giá, và nói
// một con số mà quý sau không đạt thì mất thứ khó lấy lại nhất trong nghề.

export const IR_LESSONS: Lesson[] = [
  {
    id: 1711,
    slug: "ir-cong-viec-that-su-la-gi",
    title: "IR, Bài 1: Quan hệ cổ đông làm gì - và vì sao đó không phải PR",
    subtitle: "Ba nhóm người IR phục vụ, thứ họ thực sự mua, và ranh giới giữa truyền thông doanh nghiệp với công bố thông tin",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📣",
    track: "professional",
    whyItMatters:
      "Người mới vào nghề IR thường nghĩ việc của mình là làm doanh nghiệp trông đẹp. Nghĩ vậy sẽ hỏng ngay quý đầu tiên có tin xấu, vì nhà đầu tư không mua câu chuyện đẹp - họ mua khả năng dự đoán được, và một công ty giấu tin xấu là công ty không dự đoán được.",
    openingQuestion: "Khác biệt cốt lõi giữa IR và PR là gì?",
    openingOptions: [
      "IR nói với người bỏ vốn và bị ràng buộc bởi quy định công bố thông tin",
      "IR chỉ làm việc với báo chí tài chính còn PR làm việc với báo chí phổ thông",
      "IR thuộc phòng tài chính còn PR thuộc phòng marketing của doanh nghiệp",
      "IR dùng số liệu còn PR dùng hình ảnh và câu chuyện thương hiệu để truyền tải",
    ],
    correctOption: 0,
    explanation:
      "Khác biệt không nằm ở phòng ban hay ở việc dùng số hay dùng chữ. Nó nằm ở người nghe và ở hậu quả: người nghe của IR đang quyết định bỏ tiền vào hoặc rút tiền ra, và mọi điều IR nói đều nằm dưới quy định công bố thông tin. Một câu PR nói sai thì mất uy tín thương hiệu; một câu IR nói sai thời điểm là công bố thông tin không đúng quy định, và nếu nói riêng cho một nhóm trước khi nói với thị trường thì đó là cung cấp thông tin không công bằng. Đó là lý do IR không được phép làm điều PR làm hằng ngày: chọn thời điểm đẹp nhất để kể một câu chuyện.",
    diagram: [
      { label: "Số liệu và kế hoạch từ nội bộ", arrow: true },
      { label: "IR chuyển thành thông điệp có thể kiểm chứng", arrow: true },
      { label: "Công bố ĐỒNG THỜI cho toàn thị trường", arrow: true },
      { label: "Nhà đầu tư định giá lại", arrow: true },
      { label: "Phản hồi thị trường quay ngược về ban điều hành" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Bộ phận IR của các công ty niêm yết trên HOSE",
      description:
        "Ở phần lớn công ty Việt Nam, IR nằm dưới giám đốc tài chính chứ không dưới phòng truyền thông - chính vì nội dung công việc là số liệu và nghĩa vụ công bố, không phải hình ảnh. Nơi nào để IR dưới marketing thường lộ ra ở chỗ báo cáo thường niên đọc như một tờ quảng cáo, và nhà đầu tư tổ chức sẽ hỏi thẳng những gì tờ đó tránh nói.",
    },
    quiz: [
      {
        question: "Người nghe chính của IR là ai?",
        options: [
          "Nhà đầu tư và chuyên viên phân tích",
          "Khách hàng và người tiêu dùng cuối",
          "Nhân viên và ứng viên tuyển dụng của công ty",
          "Cơ quan báo chí và các kênh truyền thông đại chúng",
        ],
        correct: 0,
        explanation:
          "IR nói với bên bỏ vốn. Báo chí là kênh, không phải đích - và thông tin tới báo chí trước khi tới thị trường là một vấn đề chứ không phải một thành tích.",
      },
      {
        question: "Vì sao IR không được chọn thời điểm đẹp để công bố tin xấu?",
        options: [
          "Vì quy định buộc công bố khi thông tin phát sinh, không khi thuận lợi",
          "Vì tin xấu công bố muộn sẽ bị báo chí phát hiện và đưa tin trước",
          "Vì ban điều hành thường muốn công bố sớm để giảm áp lực nội bộ",
          "Vì nhà đầu tư tổ chức luôn biết trước qua các kênh riêng của họ",
        ],
        correct: 0,
        explanation:
          "Thông tin trọng yếu phải được công bố trong thời hạn quy định kể từ khi phát sinh. Chọn thời điểm là đặc quyền của truyền thông thương hiệu, không phải của IR.",
      },
      {
        question: "Nhà đầu tư tổ chức đánh giá cao điều gì nhất ở một bộ phận IR?",
        options: [
          "Tính nhất quán - nói gì thì quý sau vẫn đo lại được bằng cùng thước đo",
          "Khả năng trình bày trực quan và bộ tài liệu được thiết kế đẹp",
          "Tốc độ phản hồi email và số buổi gặp gỡ tổ chức trong năm",
          "Quan hệ tốt với các công ty chứng khoán đang khuyến nghị mua cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Đổi thước đo giữa các kỳ là cách nhanh nhất để mất niềm tin, vì nó khiến người ngoài không so sánh được và ai cũng hiểu vì sao thước đo được đổi.",
      },
      {
        question: "Cung cấp thông tin trọng yếu riêng cho một quỹ lớn trước khi công bố là gì?",
        options: [
          "Vi phạm nguyên tắc công bằng thông tin",
          "Hoạt động chăm sóc nhà đầu tư lớn được chấp nhận trong ngành",
          "Rủi ro truyền thông cần cân nhắc nhưng không vi phạm quy định nào",
          "Hợp lệ nếu có cam kết bảo mật",
        ],
        correct: 0,
        explanation:
          "Đây là lỗi nặng nhất của nghề. Thông tin trọng yếu phải đến với mọi nhà đầu tư cùng lúc, bất kể quy mô tài khoản.",
      },
      {
        question: "Dấu hiệu nào cho thấy IR đang bị vận hành như PR?",
        options: [
          "Báo cáo thường niên không nhắc tới bất kỳ rủi ro cụ thể nào",
          "Công ty tổ chức nhiều buổi gặp gỡ nhà đầu tư hơn năm trước",
          "Bộ tài liệu được thiết kế lại theo thương hiệu mới",
          "Ban điều hành trả lời thay cho IR",
        ],
        correct: 0,
        explanation:
          "Một hồ sơ không có rủi ro nào là hồ sơ đang bán hàng. Nhà đầu tư chuyên nghiệp đọc phần rủi ro trước, và phần đó trống nghĩa là họ phải tự đi tìm.",
      },
    ],
    keyTakeaways: [
      "IR nói với người bỏ vốn, và mọi câu nói nằm dưới quy định công bố thông tin.",
      "Không được chọn thời điểm: thông tin trọng yếu công bố khi phát sinh, không khi thuận lợi.",
      "Nói riêng cho một nhóm trước thị trường là lỗi nặng nhất của nghề.",
      "Thứ nhà đầu tư mua là tính nhất quán và khả năng dự đoán, không phải câu chuyện đẹp.",
    ],
    sections: [
      {
        type: "lead",
        text: "Nghề này bị hiểu nhầm nhiều nhất ở đúng một chỗ: người ta tưởng việc của IR là làm công ty trông hấp dẫn. Việc của IR là làm công ty trở nên dự đoán được - và hai thứ đó thường xung đột nhau.",
      },
      { type: "heading", text: "Ba nhóm người nghe" },
      {
        type: "conceptTable",
        title: "IR nói với ai, và họ cần gì",
        concepts: [
          { vi: "Nhà đầu tư tổ chức", en: "Institutional investors", def: "Quỹ, công ty bảo hiểm. Cần mô hình dự báo được: họ dựng bảng tính về công ty bạn và cần các giả định của họ không bị phá vỡ mỗi quý." },
          { vi: "Chuyên viên phân tích", en: "Sell-side analysts", def: "Viết báo cáo cho người khác đọc. Nếu bạn không cấp đủ thông tin, họ vẫn viết - chỉ là viết bằng giả định của riêng họ." },
          { vi: "Nhà đầu tư cá nhân", en: "Retail investors", def: "Đọc bản tin và mạng xã hội. Nhóm này nhạy nhất với tin đồn, nên khoảng lặng của IR bị lấp bằng thứ khác." },
        ],
      },
      { type: "heading", text: "Ranh giới với truyền thông" },
      {
        type: "comparison",
        left: { label: "PR", text: "Chọn thời điểm, chọn góc kể, nhấn phần mạnh. Sai lầm gây thiệt hại về hình ảnh." },
        right: { label: "IR", text: "Công bố khi phát sinh, nói cả phần yếu, nói với mọi người cùng lúc. Sai lầm là vấn đề pháp lý và là mất niềm tin dài hạn." },
      },
      {
        type: "callout",
        label: "Câu thử một bộ phận IR",
        text: "Đọc phần rủi ro trong báo cáo thường niên. Nếu nó liệt kê những rủi ro chung chung mà công ty nào cũng có - biến động vĩ mô, cạnh tranh gay gắt - thì bộ phận đó đang viết cho xong. Phần rủi ro viết nghiêm túc luôn nêu được điều gì đó cụ thể mà chỉ công ty này gặp phải.",
      },
      {
        type: "closing",
        lines: [
          "Nhà đầu tư không phạt một công ty vì có quý xấu. Họ phạt một công ty vì quý xấu đến bất ngờ.",
          "Toàn bộ nghề IR nằm trong khoảng cách giữa hai điều đó.",
        ],
      },
    ],
  },

  {
    id: 1712,
    slug: "ir-cong-bo-thong-tin-va-thoi-diem",
    title: "IR, Bài 2: Trọng yếu và thời điểm - biết gì thì phải nói, và nói lúc nào",
    subtitle: "Cách nhận ra một thông tin là trọng yếu, thời hạn công bố, và vì sao im lặng cũng là một lựa chọn có hậu quả",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⏱️",
    track: "professional",
    whyItMatters:
      "Phần lớn án phạt trong lĩnh vực công bố thông tin không đến từ nói dối mà đến từ nói muộn. Phân biệt được cái gì trọng yếu và đếm đúng thời hạn là phần kỹ thuật của nghề IR, và là phần không thể ứng biến tại chỗ.",
    openingQuestion: "Thông tin nào sau đây gần như chắc chắn là trọng yếu và phải công bố?",
    openingOptions: [
      "Mất một khách hàng chiếm 30% doanh thu",
      "Thay đổi nhà cung cấp văn phòng phẩm cho toàn hệ thống chi nhánh",
      "Ra mắt nhận diện thương hiệu mới sau sáu tháng chuẩn bị",
      "Tuyển thêm 50 nhân sự cho bộ phận chăm sóc khách hàng ở miền Nam",
    ],
    correctOption: 0,
    explanation:
      "Thước đo của tính trọng yếu là: một nhà đầu tư hợp lý có đổi quyết định mua bán khi biết tin này không. Mất khách hàng chiếm 30% doanh thu chắc chắn đổi, vì nó đổi luôn dự báo doanh thu của mọi mô hình đang định giá công ty. Ba tin còn lại không - chúng có thể quan trọng với nội bộ nhưng không dịch chuyển giá trị. Chú ý là thước đo này không phụ thuộc vào việc tin tốt hay xấu, cũng không phụ thuộc vào việc công ty đã có phương án xử lý hay chưa. Đợi tới khi có phương án rồi mới công bố là cách vi phạm thời hạn phổ biến nhất, và lý do nghe rất hợp lý từ bên trong.",
    diagram: [
      { label: "Sự kiện phát sinh", arrow: true },
      { label: "Nhà đầu tư hợp lý có đổi quyết định không?", arrow: true },
      { label: "Có → trọng yếu → chạy đồng hồ công bố", arrow: true },
      { label: "Công bố theo thời hạn quy định, không đợi có phương án" },
    ],
    interactiveType: "ethics-case",
    realWorldExample: {
      company: "Quy định công bố thông tin trên thị trường chứng khoán Việt Nam",
      description:
        "Thông tư về công bố thông tin quy định thời hạn tính bằng giờ và ngày kể từ khi sự kiện phát sinh, cho từng nhóm sự kiện. Điều bộ phận IR hay bỏ sót không phải danh mục sự kiện - nó có sẵn - mà là mốc bắt đầu đếm: đồng hồ chạy từ lúc sự kiện xảy ra, không phải từ lúc ban điều hành họp xong.",
    },
    quiz: [
      {
        question: "Thước đo tính trọng yếu là gì?",
        options: [
          "Nhà đầu tư hợp lý có đổi quyết định mua bán khi biết tin không",
          "Lợi nhuận có thay đổi quá 10% không",
          "Ban điều hành có coi là quan trọng không",
          "Thông tin có trong danh mục báo cáo định kỳ không",
        ],
        correct: 0,
        explanation:
          "Ngưỡng phần trăm là công cụ hỗ trợ, không phải định nghĩa. Một sự kiện dưới ngưỡng vẫn có thể trọng yếu nếu nó đổi cách nhìn về tương lai công ty.",
      },
      {
        question: "Đồng hồ công bố bắt đầu chạy từ lúc nào?",
        options: [
          "Từ khi sự kiện phát sinh",
          "Từ khi họp xong",
          "Từ khi bộ phận pháp chế hoàn tất rà soát nội dung công bố",
          "Từ phiên giao dịch đầu tiên sau khi thông tin được xác nhận đầy đủ",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ vi phạm nhiều nhất, và luôn với một lý do nghe rất hợp lý từ bên trong: đợi có phương án rồi công bố cho trọn vẹn.",
      },
      {
        question: "Tin tốt bất thường có phải công bố không?",
        options: [
          "Có, tính trọng yếu không phân biệt tin tốt hay xấu",
          "Không, nghĩa vụ công bố chỉ áp dụng với thông tin bất lợi",
          "Chỉ khi muốn hỗ trợ giá",
          "Chỉ khi có yêu cầu từ sở giao dịch hoặc cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Một hợp đồng lớn bất ngờ cũng dịch chuyển giá trị, nên cũng phải công bố. Nghĩa vụ gắn với mức ảnh hưởng, không với dấu của ảnh hưởng.",
      },
      {
        question: "Giá cổ phiếu biến động mạnh bất thường mà công ty không có tin gì. IR nên làm gì?",
        options: [
          "Rà soát nội bộ xem có thông tin nào bị rò rỉ, và sẵn sàng trả lời sở giao dịch",
          "Ra thông cáo trấn an nhà đầu tư rằng hoạt động vẫn bình thường",
          "Không làm gì vì công ty không có nghĩa vụ giải thích biến động giá",
          "Mua cổ phiếu quỹ để phát tín hiệu rằng ban điều hành tin vào công ty",
        ],
        correct: 0,
        explanation:
          "Biến động bất thường thường là dấu hiệu có thông tin đã ra ngoài. Việc đầu tiên là tìm xem nó là gì, vì nếu có thì nghĩa vụ công bố đã phát sinh từ trước đó.",
      },
      {
        question: "Vì sao im lặng cũng là một lựa chọn có hậu quả?",
        options: [
          "Vì khoảng trống thông tin luôn bị lấp bằng suy đoán và tin đồn",
          "Vì cơ quan quản lý coi im lặng là che giấu",
          "Vì quỹ sẽ bán ra ngay",
          "Vì báo chí có quyền yêu cầu trả lời",
        ],
        correct: 0,
        explanation:
          "Thị trường không đợi. Không nói gì không có nghĩa là không có gì được nói - chỉ là người khác nói thay, bằng dữ liệu kém hơn.",
      },
    ],
    keyTakeaways: [
      "Trọng yếu = nhà đầu tư hợp lý đổi quyết định. Không phụ thuộc tin tốt hay xấu.",
      "Đồng hồ chạy từ khi sự kiện phát sinh, không từ khi họp xong hay có phương án.",
      "Giá biến động bất thường mà không có tin là dấu hiệu rò rỉ, phải rà soát ngay.",
      "Im lặng không phải trung lập: khoảng trống bị lấp bằng tin đồn.",
    ],
    sections: [
      {
        type: "lead",
        text: "Rất ít án phạt công bố thông tin đến từ việc nói sai. Gần hết đến từ việc nói muộn, và gần như lần nào lý do nội bộ cũng nghe hợp lý: đợi cho chắc, đợi có phương án, đợi qua kỳ nghỉ.",
      },
      { type: "heading", text: "Nhận ra tính trọng yếu" },
      {
        type: "paragraph",
        text: "Câu hỏi duy nhất là: một nhà đầu tư hợp lý biết tin này có đổi quyết định mua bán không. Ngưỡng phần trăm lợi nhuận hay doanh thu chỉ là công cụ hỗ trợ - có sự kiện rất nhỏ về con số nhưng đổi hẳn cách nhìn về tương lai, như việc mất giấy phép ở một thị trường đang là kỳ vọng tăng trưởng chính.",
      },
      { type: "heading", text: "Đếm đúng mốc bắt đầu" },
      {
        type: "list",
        items: [
          "Đồng hồ chạy từ khi sự kiện phát sinh, không từ khi bộ phận IR được thông báo.",
          "Không được đợi cho tới khi có phương án xử lý - phương án là nội dung công bố tiếp theo, không phải điều kiện của công bố đầu tiên.",
          "Không được đợi tới phiên giao dịch thuận lợi.",
          "Nếu chưa có đủ thông tin, công bố phần đã chắc chắn và nói rõ phần đang xác minh.",
        ],
      },
      {
        type: "callout",
        label: "Khi giá chạy mà công ty chưa nói gì",
        text: "Biến động mạnh bất thường thường có nghĩa là thông tin đã ra ngoài qua đường nào đó. Việc đầu tiên không phải là ra thông cáo trấn an, mà là rà soát xem thông tin gì đã rò rỉ - vì nếu có, nghĩa vụ công bố đã phát sinh từ trước khi giá chạy.",
      },
      {
        type: "closing",
        lines: [
          "Nghề này có hai đồng hồ: đồng hồ pháp lý và đồng hồ của tin đồn.",
          "Đồng hồ thứ hai luôn chạy nhanh hơn.",
        ],
      },
    ],
  },

  {
    id: 1713,
    slug: "ir-guidance-va-ky-vong-thi-truong",
    title: "IR, Bài 3: Guidance - đưa ra con số rồi phải sống với nó",
    subtitle: "Vì sao doanh nghiệp công bố kế hoạch, cái giá của việc hụt kế hoạch, và cách đặt khoảng thay vì đặt điểm",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Con số kế hoạch là lời hứa duy nhất của doanh nghiệp mà thị trường chấm điểm mỗi quý. Đặt cao thì mất niềm tin khi hụt, đặt thấp thì mất niềm tin theo kiểu khác - và cả hai đều rơi vào bộ phận IR trước khi rơi vào ai khác.",
    openingQuestion:
      "Công ty đặt kế hoạch lợi nhuận 500 tỷ, đạt 495 tỷ. Cổ phiếu giảm 8%. Vì sao?",
    openingOptions: [
      "Vì hụt kế hoạch làm thị trường hạ niềm tin vào mọi con số tương lai",
      "Vì 5 tỷ chênh lệch là số tiền lớn với quy mô của doanh nghiệp",
      "Vì nhà đầu tư luôn bán ra sau mỗi kỳ công bố kết quả kinh doanh",
      "Vì các công ty chứng khoán buộc phải hạ khuyến nghị khi kế hoạch không đạt",
    ],
    correctOption: 0,
    explanation:
      "Chênh 5 tỷ trên 500 tỷ là 1%, không đủ để đổi giá trị doanh nghiệp. Thứ đổi là độ tin cậy của mọi con số kế hoạch sau này. Nhà đầu tư dựng mô hình dựa trên giả định ban điều hành biết rõ công ty mình; hụt kế hoạch, dù chỉ 1%, là bằng chứng ngược lại - và nó buộc họ phải chiết khấu mọi dự báo tương lai, không chỉ quý này. Đó là lý do một công ty hụt 1% có thể mất nhiều giá trị hơn một công ty giảm lợi nhuận 15% nhưng đã báo trước từ quý trước.",
    diagram: [
      { label: "Công bố kế hoạch", arrow: true },
      { label: "Thị trường dựng mô hình quanh con số đó", arrow: true },
      { label: "Kết quả thật so với kế hoạch", arrow: true },
      { label: "Đạt → niềm tin tích luỹ · Hụt → chiết khấu mọi dự báo sau" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Kế hoạch trình Đại hội đồng cổ đông của doanh nghiệp niêm yết Việt Nam",
      description:
        "Khác với nhiều thị trường nơi guidance là tự nguyện, doanh nghiệp niêm yết Việt Nam trình kế hoạch kinh doanh cho ĐHĐCĐ thông qua - nên con số đó vừa là cam kết với cổ đông vừa là mốc thị trường chấm điểm. Nhiều công ty vì thế đặt kế hoạch thận trọng có chủ đích, và nhà đầu tư quen dần với việc đọc kế hoạch của từng doanh nghiệp kèm hệ số điều chỉnh riêng.",
    },
    quiz: [
      {
        question: "Vì sao hụt kế hoạch 1% có thể làm giá giảm mạnh?",
        options: [
          "Vì nó hạ độ tin cậy của mọi dự báo tương lai, không chỉ quý này",
          "Vì quy định buộc giải trình khi không đạt",
          "Vì quỹ chỉ số phải bán ra",
          "Vì phần chênh đó là lợi nhuận chất lượng nhất",
        ],
        correct: 0,
        explanation:
          "Thị trường không định giá 1% đó. Nó định giá lại xác suất những con số tiếp theo cũng sai - và xác suất ấy áp lên toàn bộ dòng tiền tương lai.",
      },
      {
        question: "Đặt kế hoạch quá thận trọng gây hậu quả gì?",
        options: [
          "Thị trường tự trừ hao, nên con số mất dần tác dụng dẫn dắt",
          "Cơ quan quản lý sẽ yêu cầu giải trình",
          "Cổ đông lớn sẽ phủ quyết kế hoạch",
          "Công ty phải điều chỉnh tăng giữa năm",
        ],
        correct: 0,
        explanation:
          "Nếu năm nào cũng vượt kế hoạch 40%, nhà đầu tư sẽ tự nhân hệ số và con số công bố không còn truyền tải được thông tin gì.",
      },
      {
        question: "Vì sao nên đưa khoảng thay vì một con số đơn?",
        options: [
          "Vì khoảng phản ánh đúng mức bất định thật của việc dự báo",
          "Vì khoảng giúp tránh giải trình",
          "Vì nhà đầu tư tổ chức chỉ chấp nhận khoảng",
          "Vì thông lệ quốc tế yêu cầu hai kịch bản",
        ],
        correct: 0,
        explanation:
          "Một con số đơn ngụ ý độ chính xác mà không ai có. Khoảng nói thật về mức bất định, và mức bất định đó tự nó là thông tin.",
      },
      {
        question: "Khi biết chắc sẽ hụt kế hoạch, IR nên làm gì?",
        options: [
          "Điều chỉnh kế hoạch và công bố ngay khi đủ căn cứ",
          "Đợi tới kỳ báo cáo chính thức",
          "Giữ nguyên kế hoạch và nhấn mạnh các chỉ số vận hành tích cực khác",
          "Trao đổi trước với các chuyên viên phân tích để họ hạ dự báo dần",
        ],
        correct: 0,
        explanation:
          "Điều chỉnh sớm là tin xấu; im lặng rồi hụt là tin xấu cộng với mất niềm tin. Riêng phương án cuối còn là cung cấp thông tin không công bằng.",
      },
      {
        question: "Điều gì làm thị trường tha thứ cho một quý xấu?",
        options: [
          "Đã được báo trước và nguyên nhân khớp với những gì công ty từng cảnh báo",
          "Mức giảm nhỏ hơn mức giảm bình quân của các doanh nghiệp cùng ngành",
          "Ban điều hành cam kết sẽ bù lại toàn bộ phần hụt trong quý kế tiếp",
          "Công ty đồng thời công bố kế hoạch mua cổ phiếu quỹ với quy mô lớn",
        ],
        correct: 0,
        explanation:
          "Nhà đầu tư chấp nhận công ty gặp khó khăn. Thứ họ không chấp nhận là phát hiện ban điều hành không nhìn thấy khó khăn đó đang tới.",
      },
    ],
    keyTakeaways: [
      "Hụt kế hoạch bị phạt vì mất niềm tin vào dự báo tương lai, không vì con số chênh lệch.",
      "Thận trọng quá thì thị trường tự trừ hao và con số mất tác dụng.",
      "Đưa khoảng thay vì điểm: mức bất định tự nó là thông tin.",
      "Biết sẽ hụt thì điều chỉnh sớm; trao đổi riêng với vài chuyên viên phân tích là vi phạm.",
    ],
    sections: [
      {
        type: "lead",
        text: "Guidance là lời hứa duy nhất doanh nghiệp đưa ra mà thị trường chấm điểm bốn lần một năm. Và giống mọi lời hứa, giá trị của nó không nằm ở lần hứa mà ở chuỗi lần giữ được.",
      },
      { type: "heading", text: "Vì sao hụt một chút lại đắt" },
      {
        type: "paragraph",
        text: "Nhà đầu tư dựng mô hình trên giả định ban điều hành hiểu công ty mình hơn người ngoài. Hụt kế hoạch là bằng chứng ngược lại, nên nó không chỉ sửa con số quý này mà buộc phải chiết khấu mọi con số tương lai. Một công ty hụt 1% có thể mất nhiều giá trị hơn một công ty giảm lợi nhuận 15% đã báo trước.",
      },
      {
        type: "comparison",
        left: { label: "Đặt cao", text: "Được giá trong ngắn hạn, và mất nhiều hơn thế vào ngày hụt. Chi phí trả sau nhưng trả bằng thứ khó mua lại." },
        right: { label: "Đặt thấp", text: "Vượt kế hoạch năm nào cũng đẹp, cho tới khi thị trường tự nhân hệ số và con số công bố không còn nói lên điều gì." },
      },
      { type: "heading", text: "Khi biết sẽ hụt" },
      {
        type: "list",
        items: [
          "Điều chỉnh và công bố ngay khi có đủ căn cứ - đừng đợi kỳ báo cáo.",
          "Nói nguyên nhân cụ thể, không nói 'điều kiện thị trường khó khăn'.",
          "Nói rõ phần nào là tạm thời, phần nào là thay đổi cấu trúc.",
          "Không bao giờ hé trước cho vài chuyên viên phân tích để họ hạ dự báo dần - đó là cung cấp thông tin không công bằng.",
        ],
      },
      {
        type: "callout",
        label: "Thứ thực sự được tha thứ",
        text: "Thị trường chấp nhận một quý xấu nếu nó đã được cảnh báo và nguyên nhân khớp với những gì công ty từng nói. Cái không được tha thứ là phát hiện ra ban điều hành đã không nhìn thấy nó đang tới - vì điều đó nói về mọi quý sau, chứ không riêng quý này.",
      },
      {
        type: "closing",
        lines: [
          "Một con số đưa ra là một con số phải sống chung với nó suốt bốn quý.",
          "Nên chỗ khó của guidance không phải lúc công bố, mà là mọi ngày sau đó.",
        ],
      },
    ],
  },

  {
    id: 1714,
    slug: "ir-bo-tai-lieu-va-buoi-gap-nha-dau-tu",
    title: "IR, Bài 4: Bộ tài liệu và buổi gặp - trả lời câu hỏi khó mà không hứa gì thêm",
    subtitle: "Cấu trúc một bộ tài liệu nhà đầu tư, chuẩn bị cho câu hỏi bất lợi, và ranh giới không được vượt trong phòng họp kín",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Buổi gặp nhà đầu tư là nơi duy nhất công ty phải trả lời câu hỏi mình không chọn. Chuẩn bị sai ở đây thì hoặc lộ thông tin chưa công bố, hoặc để lại ấn tượng đang né - và cả hai đều đắt hơn một buổi trình bày vụng về.",
    openingQuestion:
      "Trong buổi gặp riêng, một quỹ hỏi doanh thu tháng này so với cùng kỳ. Số đó chưa công bố. IR nên làm gì?",
    openingOptions: [
      "Từ chối và nói rõ vì sao",
      "Trả lời chung chung theo hướng tích cực mà không đưa con số cụ thể",
      "Đưa con số nhưng yêu cầu quỹ giữ kín cho tới ngày công bố chính thức",
      "Hẹn trả lời sau khi xin ý kiến giám đốc tài chính về mức độ nhạy cảm",
    ],
    correctOption: 0,
    explanation:
      "Từ chối là câu trả lời đúng, và nói rõ lý do làm nó thành một câu trả lời chuyên nghiệp chứ không phải một cú né: chúng tôi không bình luận về số liệu chưa công bố, và khi công bố thì mọi nhà đầu tư nhận cùng lúc. Phương án trả lời chung chung theo hướng tích cực nghe an toàn nhưng thực chất vẫn truyền tải thông tin trọng yếu - người nghe chuyên nghiệp đọc được rất nhiều từ giọng điệu và mức độ tự tin. Ràng buộc bảo mật không cứu được gì, vì vi phạm nằm ở chỗ thông tin đến với một người trước, không ở chỗ người đó có giữ kín hay không.",
    diagram: [
      { label: "Câu hỏi về thông tin chưa công bố", arrow: true },
      { label: "Từ chối + nêu nguyên tắc", arrow: true },
      { label: "Ghi lại câu hỏi", arrow: true },
      { label: "Nếu nhiều người cùng hỏi → đưa vào nội dung công bố kỳ tới" },
    ],
    interactiveType: "prompt-craft",
    realWorldExample: {
      company: "Buổi gặp nhà đầu tư của doanh nghiệp niêm yết",
      description:
        "Bộ tài liệu nhà đầu tư ở nhiều công ty Việt Nam vẫn là bản trình bày bán hàng: thành tích, tăng trưởng, kế hoạch mở rộng. Bộ tài liệu được nhà đầu tư tổ chức đánh giá cao thường có thêm phần ít gặp - những gì đã không diễn ra như dự kiến trong kỳ và công ty đã điều chỉnh thế nào.",
    },
    quiz: [
      {
        question: "Được hỏi số liệu chưa công bố trong buổi gặp riêng, cách xử lý đúng là gì?",
        options: [
          "Từ chối và nêu nguyên tắc công bằng thông tin",
          "Trả lời theo hướng chung chung, tránh đưa con số cụ thể",
          "Cung cấp kèm cam kết bảo mật",
          "Chuyển câu hỏi cho giám đốc tài chính trả lời trực tiếp",
        ],
        correct: 0,
        explanation:
          "Trả lời chung chung vẫn là truyền tải thông tin - người nghe chuyên nghiệp đọc được nhiều điều từ mức độ tự tin trong câu trả lời.",
      },
      {
        question: "Phần nào của bộ tài liệu nhà đầu tư tổ chức đọc kỹ nhất?",
        options: [
          "Phần nói về những gì đã không diễn ra như dự kiến",
          "Phần chiến lược và tầm nhìn",
          "Phần giới thiệu đội ngũ lãnh đạo và kinh nghiệm của từng thành viên",
          "Phần so sánh các chỉ số tăng trưởng với những doanh nghiệp cùng ngành",
        ],
        correct: 0,
        explanation:
          "Thành tích thì báo cáo tài chính đã nói. Cách công ty xử lý phần chệch kế hoạch mới cho biết ban điều hành có nhìn rõ hoạt động của mình không.",
      },
      {
        question: "Chuẩn bị cho một buổi gặp nên bắt đầu từ đâu?",
        options: [
          "Liệt kê những câu hỏi bất lợi nhất có thể bị hỏi",
          "Hoàn thiện bản trình bày và tập thuyết trình cho trôi chảy",
          "Rà soát lại toàn bộ số liệu tài chính của bốn quý gần nhất",
          "Tìm hiểu quỹ sắp gặp",
        ],
        correct: 0,
        explanation:
          "Phần trình bày do công ty kiểm soát nên hiếm khi hỏng. Phần hỏi đáp thì không, và đó là phần quyết định ấn tượng để lại.",
      },
      {
        question: "Nhiều nhà đầu tư khác nhau cùng hỏi một câu chưa được công bố. Điều đó nghĩa là gì?",
        options: [
          "Có một khoảng trống thông tin cần được đưa vào công bố kỳ tới",
          "Thông tin đó đã bị rò rỉ ra thị trường qua một kênh nào đó",
          "Các nhà đầu tư phối hợp gây sức ép",
          "Bộ tài liệu quá dài nên người đọc bỏ sót",
        ],
        correct: 0,
        explanation:
          "Câu hỏi lặp lại là dữ liệu quý nhất IR thu được. Nó chỉ ra chính xác chỗ thị trường đang phải tự đoán, và đó là chỗ nên chủ động lấp.",
      },
      {
        question: "Không biết câu trả lời thì nên làm gì?",
        options: [
          "Nói thẳng là chưa có thông tin và hẹn trả lời sau qua kênh công khai",
          "Đưa ra ước lượng của bản thân và nói rõ đó chỉ là ước lượng",
          "Chuyển hướng sang một chỉ số khác mà công ty đang làm tốt",
          "Trả lời theo số liệu của kỳ gần nhất đã được công bố chính thức",
        ],
        correct: 0,
        explanation:
          "Ước lượng nói trong phòng họp kín vẫn là thông tin ra riêng cho một nhóm. Hẹn trả lời qua kênh công khai giữ được cả tính công bằng lẫn quan hệ.",
      },
    ],
    keyTakeaways: [
      "Từ chối trả lời số chưa công bố, và nêu nguyên tắc - từ chối có lý do không phải là né tránh.",
      "Trả lời chung chung theo hướng tích cực vẫn là truyền tải thông tin.",
      "Chuẩn bị bắt đầu từ danh sách câu hỏi bất lợi, không từ bản trình bày.",
      "Câu hỏi lặp lại nhiều lần là bản đồ chỉ chỗ nên chủ động công bố.",
    ],
    sections: [
      {
        type: "lead",
        text: "Phần trình bày là phần công ty kiểm soát, nên nó hiếm khi hỏng. Buổi gặp nhà đầu tư được nhớ hay bị nhớ nằm ở nửa sau, nơi câu hỏi do người khác chọn.",
      },
      { type: "heading", text: "Bộ tài liệu nên có gì" },
      {
        type: "list",
        items: [
          "Mô hình kinh doanh nói bằng con số: doanh thu đến từ đâu, biên bao nhiêu, cái gì đang đổi.",
          "Kết quả kỳ này so với kế hoạch đã công bố - cả phần đạt lẫn phần không.",
          "Những gì đã không diễn ra như dự kiến, và công ty điều chỉnh thế nào.",
          "Rủi ro cụ thể của riêng doanh nghiệp này, không phải rủi ro ngành chung chung.",
          "Các chỉ số vận hành giữ nguyên định nghĩa qua các kỳ, để so sánh được.",
        ],
      },
      { type: "heading", text: "Ranh giới trong phòng họp kín" },
      {
        type: "callout",
        label: "Câu từ chối chuẩn",
        text: "\"Chúng tôi không bình luận về số liệu chưa công bố. Khi công bố, mọi nhà đầu tư sẽ nhận cùng một lúc.\" Câu này không làm mất lòng ai - một quỹ chuyên nghiệp hiểu ngay, và thực ra họ đang kiểm tra xem bạn có giữ ranh giới hay không, vì một công ty rò rỉ cho bạn hôm nay sẽ rò rỉ cho người khác vào ngày bạn ở phía bên kia.",
      },
      {
        type: "paragraph",
        text: "Ghi lại mọi câu hỏi được hỏi. Khi cùng một câu xuất hiện ở ba buổi gặp khác nhau, đó không còn là câu hỏi của ba nhà đầu tư - đó là một khoảng trống trong những gì công ty đang công bố, và lấp nó chủ động luôn rẻ hơn để thị trường tự đoán.",
      },
      {
        type: "closing",
        lines: [
          "Không ai mất điểm vì nói \"chúng tôi chưa công bố con số đó\".",
          "Người ta mất điểm vì trả lời một câu mà lẽ ra phải từ chối.",
        ],
      },
    ],
  },

  {
    id: 1715,
    slug: "ir-khung-hoang-va-tin-xau",
    title: "IR, Bài 5: Tin xấu và khủng hoảng - nói trước khi bị hỏi",
    subtitle: "Trình tự xử lý khi có sự cố, cách viết một thông cáo về tin xấu, và vì sao nhỏ giọt là cách tệ nhất",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚨",
    track: "professional",
    whyItMatters:
      "Mọi bộ phận IR đều làm tốt khi mọi thứ suôn sẻ. Giá trị của nghề này được chứng minh trong tuần có tin xấu, và những gì làm trong tuần đó quyết định công ty mất một quý hay mất niềm tin nhiều năm.",
    openingQuestion:
      "Phát hiện sai sót kế toán làm lợi nhuận ba quý trước bị ghi nhận cao hơn thực tế. Bước đầu tiên?",
    openingOptions: [
      "Xác định phạm vi sai sót rồi công bố toàn bộ một lần",
      "Công bố ngay phần đã biết và cập nhật dần khi rà soát thêm",
      "Điều chỉnh lặng lẽ trong báo cáo kỳ tới kèm thuyết minh giải thích",
      "Đợi ý kiến kiểm toán độc lập rồi công bố cùng báo cáo đã kiểm toán",
    ],
    correctOption: 0,
    explanation:
      "Cần một khoảng thời gian ngắn để biết sai sót lan tới đâu, rồi công bố trọn vẹn một lần. Đây là ngoại lệ hiếm hoi của nguyên tắc công bố càng sớm càng tốt, và lý do nằm ở cách thị trường phản ứng với tin nhỏ giọt: mỗi lần cập nhật thêm một phần sai sót, nhà đầu tư không cộng thêm phần mới mà đặt lại câu hỏi còn bao nhiêu chưa biết - nên ba lần công bố nhỏ gây thiệt hại lớn hơn hẳn một lần công bố đầy đủ cùng nội dung. Nhưng khoảng thời gian ấy phải tính bằng ngày, không phải bằng tuần, và trong lúc đó tuyệt đối không ai được giao dịch cổ phiếu.",
    diagram: [
      { label: "Phát hiện sự cố", arrow: true },
      { label: "Khoá giao dịch nội bộ ngay lập tức", arrow: true },
      { label: "Xác định phạm vi - tính bằng ngày, không bằng tuần", arrow: true },
      { label: "Công bố trọn vẹn một lần: cái gì, bao nhiêu, vì sao, sửa thế nào", arrow: true },
      { label: "Theo dõi và trả lời, không đổi câu chuyện" },
    ],
    interactiveType: "ethics-case",
    realWorldExample: {
      company: "Các đợt điều chỉnh hồi tố báo cáo tài chính trên thị trường Việt Nam",
      description:
        "Khi báo cáo sau kiểm toán chênh lệch lớn so với báo cáo tự lập, phản ứng của giá thường mạnh hơn nhiều so với mức chênh lệch con số. Nguyên nhân là nhà đầu tư đọc chênh lệch đó như một tín hiệu về chất lượng kiểm soát nội bộ - và một khi đã nghi ngờ chỗ đó thì mọi con số khác cũng bị chiết khấu theo.",
    },
    quiz: [
      {
        question: "Vì sao công bố nhỏ giọt gây thiệt hại lớn hơn công bố một lần?",
        options: [
          "Vì mỗi lần cập nhật khiến nhà đầu tư hỏi còn bao nhiêu chưa biết",
          "Vì quy định cấm công bố cùng một sự việc thành nhiều lần khác nhau",
          "Vì báo chí sẽ đưa tin nhiều lần và khuếch đại mức độ nghiêm trọng",
          "Vì chi phí công bố tăng theo số lần",
        ],
        correct: 0,
        explanation:
          "Thị trường không cộng dồn các phần tin xấu; nó định giá lại mức bất định. Nhỏ giọt làm mức bất định đó không bao giờ đóng lại.",
      },
      {
        question: "Việc đầu tiên phải làm khi phát hiện sự cố trọng yếu là gì?",
        options: [
          "Khoá giao dịch cổ phiếu của người nội bộ",
          "Soạn thông cáo báo chí để chủ động kiểm soát thông điệp",
          "Báo cho cổ đông lớn trước",
          "Rà soát lại toàn bộ quy trình kiểm soát nội bộ liên quan",
        ],
        correct: 0,
        explanation:
          "Từ giây phút biết tin, người nội bộ đang nắm thông tin chưa công bố. Một giao dịch trong khoảng này biến sự cố thành hai vụ việc.",
      },
      {
        question: "Một thông cáo về tin xấu nên có gì mà thông cáo kém thường thiếu?",
        options: [
          "Con số cụ thể và mốc thời gian đã biết",
          "Lời xin lỗi cổ đông",
          "Cam kết sự việc sẽ không bao giờ lặp lại trong tương lai",
          "So sánh cho thấy các doanh nghiệp cùng ngành cũng gặp vấn đề tương tự",
        ],
        correct: 0,
        explanation:
          "Thông cáo kém đầy tính từ và cam kết. Nhà đầu tư cần biết ảnh hưởng bao nhiêu, tới kỳ nào, và ai đang xử lý - phần còn lại là chữ.",
      },
      {
        question: "Vì sao không nên hứa 'sẽ không bao giờ lặp lại'?",
        options: [
          "Vì đó là lời hứa không kiểm soát được, và một lần tái diễn sẽ đắt gấp đôi",
          "Vì quy định không cho phép doanh nghiệp đưa ra cam kết về tương lai",
          "Vì nhà đầu tư sẽ yêu cầu công ty bồi thường nếu sự việc tái diễn",
          "Vì lời hứa này khiến kiểm toán viên phải mở rộng phạm vi soát xét",
        ],
        correct: 0,
        explanation:
          "Nói được cụ thể đã thay đổi kiểm soát nào thì tốt hơn hẳn một lời hứa tuyệt đối - lời hứa đó chỉ tạo thêm một chỗ để thất hứa.",
      },
      {
        question: "Sau khi công bố, điều quan trọng nhất trong những tuần tiếp theo là gì?",
        options: [
          "Giữ nguyên câu chuyện và cập nhật đúng những mốc đã hứa",
          "Đẩy truyền thông thành tích khác",
          "Hạn chế phát ngôn để tránh sự việc tiếp tục được nhắc lại trên báo",
          "Tổ chức gặp riêng từng cổ đông lớn để giải thích chi tiết bối cảnh",
        ],
        correct: 0,
        explanation:
          "Đổi câu chuyện giữa chừng gây thiệt hại lớn hơn chính tin xấu ban đầu, vì nó nói rằng phiên bản đầu tiên chưa đầy đủ.",
      },
    ],
    keyTakeaways: [
      "Khoá giao dịch nội bộ ngay khi biết - trước cả khi soạn thông cáo.",
      "Xác định phạm vi rồi công bố trọn vẹn một lần; nhỏ giọt khiến mức bất định không đóng lại.",
      "Thông cáo tốt có con số và mốc thời gian, không có tính từ và cam kết tuyệt đối.",
      "Sau công bố, giữ nguyên câu chuyện và cập nhật đúng mốc đã hứa.",
    ],
    sections: [
      {
        type: "lead",
        text: "Bộ phận IR nào cũng làm tốt trong quý thuận lợi. Nghề này được chứng minh trong tuần có tin xấu - và phần lớn thiệt hại trong tuần đó là do cách xử lý, không phải do bản thân tin.",
      },
      { type: "heading", text: "Trình tự" },
      {
        type: "list",
        items: [
          "Khoá giao dịch cổ phiếu của người nội bộ ngay lập tức. Đây là việc đầu tiên, trước cả khi biết sự việc lớn tới đâu.",
          "Xác định phạm vi: ảnh hưởng bao nhiêu, tới kỳ nào, còn chỗ nào chưa rà.",
          "Công bố trọn vẹn một lần, kèm mốc thời gian cho những gì chưa xong.",
          "Sau đó chỉ cập nhật theo đúng những mốc đã hứa - không thêm, không đổi.",
        ],
      },
      { type: "heading", text: "Vì sao nhỏ giọt là cách tệ nhất" },
      {
        type: "paragraph",
        text: "Thị trường không cộng dồn các mảnh tin xấu. Mỗi lần có thêm một mảnh, nhà đầu tư đặt lại câu hỏi còn bao nhiêu chưa biết - và câu hỏi đó không có đáy. Ba lần công bố nhỏ với cùng nội dung gây thiệt hại lớn hơn hẳn một lần công bố đầy đủ, vì sau lần công bố đầy đủ thì mức bất định đóng lại.",
      },
      {
        type: "comparison",
        left: { label: "Thông cáo kém", text: "Đầy tính từ, xin lỗi, cam kết không tái diễn. Không có con số, không có mốc thời gian, không nói ai đang xử lý." },
        right: { label: "Thông cáo tốt", text: "Ảnh hưởng bao nhiêu, thuộc kỳ nào, nguyên nhân là gì, kiểm soát nào đã đổi, và khi nào có thông tin tiếp theo." },
      },
      {
        type: "callout",
        label: "Câu không nên hứa",
        text: "\"Sự việc sẽ không bao giờ lặp lại\" là lời hứa không ai kiểm soát được, và nếu nó lặp lại thì lần thứ hai đắt gấp đôi vì đã có lời hứa đứng đó. Thay bằng điều nói được cụ thể: kiểm soát nào vừa được thêm vào, ai duyệt bước nào từ nay.",
      },
      {
        type: "closing",
        lines: [
          "Tin xấu mất giá trị một lần. Cách xử lý tin xấu mất giá trị nhiều lần.",
          "Và thứ mất trong lần thứ hai thì không mua lại bằng một quý tốt.",
        ],
      },
    ],
  },
];
