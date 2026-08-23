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
    "id": 1711,
    "slug": "devrel-cong-viec-that-su-la-gi",
    "title": "DevRel, Bài 1: Quan hệ nhà phát triển làm gì - và vì sao đó không phải tiếp thị",
    "subtitle": "Ba nhóm người DevRel phục vụ, và thứ mà mỗi nhóm thực sự cần từ bạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📣",
    "interactiveType": "ethics-case",
    "whyItMatters": "Một đội quan hệ nhà phát triển bị đo bằng chỉ số tiếp thị sẽ làm việc của tiếp thị, và mất đúng thứ khiến nó tồn tại: lòng tin của kỹ sư bên ngoài.",
    "openingQuestion": "Điều gì phân biệt quan hệ nhà phát triển với tiếp thị sản phẩm?",
    "openingOptions": [
      "Nó phải nói được cả những chỗ sản phẩm không dùng được, và nói trước khi bị hỏi",
      "Nó nhắm tới đối tượng kỹ sư nên nội dung có tính kỹ thuật cao hơn",
      "Nó tập trung vào xây dựng cộng đồng thay vì thúc đẩy doanh số ngắn hạn",
      "Nó do người có nền tảng kỹ thuật thực hiện chứ không do người làm truyền thông"
    ],
    "correctOption": 0,
    "explanation": "Ba lựa chọn kia đều mô tả hình thức và đều đúng ở bề mặt. Điểm phân biệt thật nằm ở nghĩa vụ: một bài viết tiếp thị không cần nói ra giới hạn của sản phẩm, còn một bài viết cho kỹ sư mà giấu giới hạn sẽ bị phát hiện ngay lần đầu có người thử - và lần đó bạn mất nhiều hơn phần đã giành được.",
    "diagram": [
      {
        "label": "Ba nhóm: người đang cân nhắc, người đang dùng, người đang gặp sự cố",
        "arrow": true
      },
      {
        "label": "Mỗi nhóm cần một thứ khác nhau, và nhóm ba cần nhất",
        "arrow": true
      },
      {
        "label": "Nghĩa vụ riêng: nói giới hạn TRƯỚC khi bị hỏi",
        "arrow": true
      },
      {
        "label": "Đo bằng thứ kỹ sư làm được, không bằng lượt xem"
      }
    ],
    "realWorldExample": {
      "company": "Nhóm đang gặp sự cố",
      "description": "Nhóm ít được đầu tư nhất lại là nhóm quyết định nhiều nhất: người đang gặp sự cố lúc hai giờ sáng. Thứ họ cần không phải một bài giới thiệu mà là một trang nói rõ lỗi này nghĩa là gì và bước tiếp theo là gì."
    },
    "quiz": [
      {
        "question": "Vì sao giấu giới hạn của sản phẩm lại đắt hơn với đối tượng kỹ sư?",
        "options": [
          "Vì họ sẽ thử và phát hiện ra, và lần đó bạn mất nhiều hơn phần đã giành được",
          "Vì kỹ sư có xu hướng hoài nghi hơn so với người mua thông thường",
          "Vì thông tin sai lan nhanh trong các cộng đồng kỹ thuật trực tuyến",
          "Vì các giới hạn kỹ thuật thường được ghi trong tài liệu chính thức"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là yếu tố làm nó tệ thêm. Cơ chế gốc đơn giản hơn: đối tượng này KIỂM ĐƯỢC, và một lần bị bắt nói thiếu làm mọi thứ bạn nói sau đó phải được kiểm lại."
      },
      {
        "question": "Nhóm nào ít được đầu tư nhất mà lại quyết định nhiều nhất?",
        "options": [
          "Người đang gặp sự cố, vì trải nghiệm lúc đó quyết định họ có ở lại không",
          "Người đang cân nhắc, vì họ là nguồn tăng trưởng của sản phẩm",
          "Người đang dùng hằng ngày, vì họ tạo ra phần lớn khối lượng thực tế",
          "Người có ảnh hưởng trong cộng đồng, bởi vì họ lan toả thông tin tương đối nhanh nhất"
        ],
        "correct": 0,
        "explanation": "Phần lớn nội dung được làm cho nhóm đang cân nhắc vì nhóm đó dễ đo. Người đang gặp sự cố lúc hai giờ sáng thì không cần một bài giới thiệu - họ cần một trang nói rõ lỗi này nghĩa là gì và bước tiếp theo là gì."
      },
      {
        "question": "Chỉ số nào phù hợp để đo công việc này?",
        "options": [
          "Số kỹ sư đi tới được kết quả đầu tiên, và thời gian họ cần để tới đó",
          "Lượt xem bài viết và đồng thời số người theo dõi kênh cộng đồng của sản phẩm",
          "Số sự kiện đã tổ chức và số người tham dự mỗi sự kiện trong quý",
          "Số câu hỏi được trả lời trong các kênh hỗ trợ cộng đồng mỗi tháng"
        ],
        "correct": 0,
        "explanation": "Ba chỉ số kia đo hoạt động và đều tăng được bằng cách làm nhiều hơn mà không đổi kết quả. Chỉ số này đo thứ kỹ sư LÀM ĐƯỢC, nên nó chỉ cải thiện khi sản phẩm hoặc tài liệu thật sự tốt lên."
      },
      {
        "question": "Vì sao nghĩa vụ công bố thay đổi lại thuộc về đội này?",
        "options": [
          "Vì họ là kênh mà người dùng bên ngoài tin, nên im lặng ở đây bị đọc là che giấu",
          "Vì họ nắm được thông tin sớm nhất về các thay đổi sắp diễn ra",
          "Vì các quy định về minh bạch yêu cầu có một kênh công bố chính thức",
          "Vì họ có kỹ năng viết nội dung kỹ thuật rõ ràng cho người ngoài đọc"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối mô tả năng lực, không phải nghĩa vụ. Vế then chốt là niềm tin đã được xây: một kênh mà người ta tin thì im lặng ở đó cũng là một thông điệp, và nó là thông điệp xấu nhất."
      },
      {
        "question": "Điều gì xảy ra khi đội này bị đo bằng chỉ số tiếp thị?",
        "options": [
          "Họ làm việc của tiếp thị, và mất đúng thứ khiến vai trò này tồn tại",
          "Họ tập trung vào các kênh có lượng người xem lớn thay vì kênh chuyên sâu",
          "Họ giảm thời gian dành cho việc hỗ trợ kỹ thuật trực tiếp cho người dùng",
          "Họ phải báo cáo cho bộ phận tiếp thị thay vì bộ phận kỹ thuật"
        ],
        "correct": 0,
        "explanation": "Hai lựa chọn giữa là biểu hiện cụ thể của cùng một chuyện. Cách nói này gọn hơn và nó chỉ ra cái mất: lòng tin của kỹ sư bên ngoài là tài sản duy nhất mà vai trò này có, và nó không mua lại được bằng ngân sách."
      }
    ],
    "keyTakeaways": [
      "Điểm phân biệt là NGHĨA VỤ nói giới hạn trước khi bị hỏi, không phải hình thức.",
      "Đối tượng này KIỂM ĐƯỢC - một lần nói thiếu làm mọi thứ sau đó phải kiểm lại.",
      "Nhóm đang gặp sự cố ít được đầu tư nhất và quyết định nhiều nhất.",
      "Đo bằng thứ kỹ sư LÀM ĐƯỢC, không bằng lượt xem hay số lần công bố nội dung.",
      "Bị đo bằng chỉ số tiếp thị thì mất lòng tin - tài sản duy nhất của vai trò này."
    ],
    "practicePrompt": {
      "question": "Sản phẩm của bạn không làm được một việc mà người dùng hay hỏi. Nên làm gì?",
      "options": [
        "Viết ra rõ ràng là không làm được, và nêu cách người ta thường xoay xở",
        "Tránh nhắc tới việc đó và tập trung giới thiệu những gì sản phẩm làm tốt",
        "Nói rằng tính năng đó đang được cân nhắc cho các phiên bản trong tương lai",
        "Chuyển câu hỏi sang bộ phận sản phẩm để họ trả lời chính thức"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ ba là cách phổ biến nhất và nó là một lời hứa ngầm mà bạn không kiểm soát được. Nói thẳng là không làm được kèm cách xoay xở thì người ta ra quyết định được ngay - và họ nhớ rằng bạn nói thật."
    },
    "summary": {
      "keyIdea": "Điểm phân biệt với tiếp thị là nghĩa vụ nói giới hạn trước khi bị hỏi.",
      "formula": "Ba nhóm người + nói giới hạn trước + đo bằng thứ kỹ sư làm được.",
      "commonMistake": "Bị đo bằng lượt xem, nên làm việc của tiếp thị và mất lòng tin.",
      "action": "Viết một trang về một việc sản phẩm bạn KHÔNG làm được."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một việc mà sản phẩm của bạn không làm được và người dùng hay hỏi, rồi viết một trang nói thẳng điều đó kèm cách người ta thường xoay xở.",
      "secondary": "Trang đó thường được đọc và được cảm ơn nhiều hơn mọi bài giới thiệu - vì nó là thứ duy nhất giúp người đọc ra quyết định ngay lập tức."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một đội quan hệ nhà phát triển bị đo bằng chỉ số tiếp thị sẽ làm việc của tiếp thị, và mất đúng thứ khiến nó tồn tại: lòng tin của kỹ sư bên ngoài."
      },
      {
        "type": "heading",
        "text": "Ba nhóm người"
      },
      {
        "type": "list",
        "items": [
          "NGƯỜI ĐANG CÂN NHẮC: cần biết sản phẩm làm được gì và KHÔNG làm được gì. Nhóm dễ đo nhất, nên phần lớn nội dung được làm cho họ.",
          "NGƯỜI ĐANG DÙNG hằng ngày: cần tài liệu tra cứu nhanh và ví dụ chạy được.",
          "NGƯỜI ĐANG GẶP SỰ CỐ: ít được đầu tư nhất, quyết định nhiều nhất."
        ]
      },
      {
        "type": "callout",
        "label": "Nhóm thứ ba cần gì",
        "text": "Người đang gặp sự cố lúc hai giờ sáng không cần một bài giới thiệu. Họ cần một trang nói rõ lỗi này nghĩa là gì và bước tiếp theo là gì - và trải nghiệm lúc đó quyết định họ có ở lại hay không."
      },
      {
        "type": "heading",
        "text": "Nghĩa vụ riêng của vai trò này"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tiếp thị",
          "text": "Không cần nói ra giới hạn của sản phẩm. Người nghe hiếm khi kiểm được ngay."
        },
        "right": {
          "label": "Quan hệ nhà phát triển",
          "text": "Đối tượng KIỂM ĐƯỢC. Một lần bị bắt nói thiếu làm mọi thứ bạn nói sau đó phải được kiểm lại."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hệ quả cho việc đo: đếm số kỹ sư ĐI TỚI ĐƯỢC kết quả đầu tiên và thời gian họ cần, thay vì đếm lượt xem và số sự kiện.",
          "Ba chỉ số hoạt động kia đều tăng được bằng cách làm nhiều hơn mà không đổi kết quả gì; chỉ số kia chỉ cải thiện khi sản phẩm hoặc tài liệu thật sự tốt lên."
        ]
      }
    ]
  },

  {
    id: 1712,
    slug: "ir-cong-bo-thong-tin-va-thoi-diem",
    title: "DevRel, Bài 2: Trọng yếu và thời điểm - biết gì thì phải nói, và nói lúc nào",
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
          "Từ khi sự kiện phát sinh, không phải từ khi họp xong",
          "Từ khi cuộc họp kết thúc",
          "Từ khi bộ phận pháp chế hoàn tất rà soát nội dung công bố",
          "Từ phiên giao dịch đầu tiên sau khi xác nhận xong",
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
    practicePrompt: {
      question:
        "Sáng thứ ba, công ty biết một khách hàng chiếm 30% doanh thu vừa chấm dứt hợp đồng. Ban điều hành muốn chờ tới thứ sáu để có phương án ứng phó rồi công bố cùng lúc. Đúng hay sai?",
      options: [
        "Sai: đồng hồ chạy từ khi sự kiện phát sinh, không từ khi có phương án",
        "Đúng: công bố kèm phương án giúp thị trường phản ứng bình tĩnh hơn",
        "Đúng: chỉ phải công bố sau khi hội đồng quản trị đã họp và thông qua",
        "Sai: phải chờ tới hết quý rồi công bố trong báo cáo tài chính định kỳ",
      ],
      correct: 0,
      explanation:
        "Trọng yếu nghĩa là một nhà đầu tư hợp lý sẽ đổi quyết định, và mất 30% doanh thu chắc chắn đạt ngưỡng đó. Đồng hồ bắt đầu chạy từ lúc công ty BIẾT, không từ lúc công ty sẵn sàng - nếu không thì mọi tin xấu đều hoãn được vô hạn với lý do đang chuẩn bị phương án. Ba ngày im lặng cũng tạo ra rủi ro thứ hai: trong khoảng đó thông tin thường rò rỉ, giá biến động bất thường, và một số người giao dịch trên thông tin mà phần còn lại chưa có. Phương án ứng phó vẫn công bố được sau, như một bản cập nhật.",
    },
    keyTakeaways: [
      "Trọng yếu = nhà đầu tư hợp lý đổi quyết định. Không phụ thuộc tin tốt hay xấu.",
      "Đồng hồ chạy từ khi sự kiện phát sinh, không từ khi họp xong hay có phương án.",
      "Giá biến động bất thường mà không có tin là dấu hiệu rò rỉ, phải rà soát ngay.",
      "Im lặng không phải trung lập: khoảng trống bị lấp bằng tin đồn.",
    ],
    summary: {
      keyIdea: "Trọng yếu nghĩa là một nhà đầu tư hợp lý sẽ đổi quyết định - không phụ thuộc tin tốt hay xấu",
      commonMistake: "Đếm thời hạn từ lúc bộ phận công bố được báo, trong khi đồng hồ chạy từ khi sự kiện phát sinh.",
      action: "Rà lại quy trình nội bộ: từ lúc một sự kiện xảy ra tới lúc người chịu trách nhiệm công bố biết, mất mấy giờ.",
    },
    application: {
      title: "Đo độ trễ nội bộ của chính tổ chức",
      message: "Chọn ba sự kiện đã công bố trong năm, tìm ngày chúng thực sự phát sinh và ngày thông cáo ra. Khoảng cách đó là rủi ro công bố muộn của tổ chức, đo bằng dữ liệu chứ không bằng cảm giác.",
      secondary: "Rất ít án phạt đến từ việc nói sai; gần hết đến từ việc nói muộn.",
    },
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
        type: "heading",
        text: "Đồng hồ chạy từ lúc nào"
      },
      {
        type: "paragraph",
        text: "Đây là chỗ sai nhiều nhất, và nó không phải một sai lầm về đạo đức mà về cách đếm. Đồng hồ công bố chạy từ khi sự kiện PHÁT SINH, không phải từ khi bộ phận quan hệ nhà đầu tư được thông báo, và cũng không phải từ khi ban lãnh đạo họp xong để quyết định nói thế nào. Một hợp đồng lớn bị huỷ vào chiều thứ tư, kế toán biết thứ năm, ban điều hành họp thứ sáu, bộ phận công bố nhận tin thứ hai tuần sau - thời hạn đã trôi mất bốn ngày trước khi người chịu trách nhiệm công bố biết là có việc phải làm. Vì thế phần khó của công việc này nằm ở quy trình nội bộ, không nằm ở việc soạn thông cáo."
      },
      {
        type: "callout",
        label: "Không được đợi cho tới khi thông tin đầy đủ",
        text: "Một sự kiện trọng yếu mà chưa biết hết hậu quả vẫn phải công bố, kèm chính điều đó: đã xảy ra việc này, mức ảnh hưởng đang được đánh giá, sẽ cập nhật khi có thêm thông tin. Chờ cho tới khi có con số chính xác là lý do phổ biến nhất dẫn tới công bố muộn, và nó nghe rất có trách nhiệm - đó chính là điều làm nó nguy hiểm. Rất ít án phạt đến từ việc nói sai; gần hết đến từ việc nói muộn."
      },
      {
        type: "comparison",
        left: {
          label: "Khi giá chạy mà công ty chưa nói gì",
          text: "Biến động mạnh bất thường thường có nghĩa thông tin đã ra ngoài qua đường nào đó. Việc đầu tiên không phải soạn thông cáo phủ nhận mà là rà soát nội bộ xem có rò rỉ thật không - vì nếu có, im lặng đang kéo dài một giai đoạn mà một nhóm người giao dịch với lợi thế thông tin."
        },
        right: {
          label: "Vì sao im lặng cũng là một lời phát biểu",
          text: "Khi thị trường đang hỏi và công ty không nói gì, người ta điền vào chỗ trống bằng giả định xấu nhất. Không bình luận là một lựa chọn hợp lệ, nhưng nó có giá - và cái giá đó tăng theo từng ngày im lặng."
        }
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
    interactiveType: "ethics-case",
    slug: "ir-guidance-va-ky-vong-thi-truong",
    title: "DevRel, Bài 3: Lộ trình công bố - đưa ra con số rồi phải sống với nó",
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
      "Vì hụt kế hoạch làm thị trường hạ niềm tin vào mọi con số tương lai khác nữa",
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
          "Vì các quỹ chỉ số phải bán ra khi doanh nghiệp không đạt kế hoạch",
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
          "Cơ quan quản lý sẽ yêu cầu doanh nghiệp giải trình cơ sở lập kế hoạch",
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
          "Vì nhà đầu tư tổ chức chỉ chấp nhận kế hoạch trình bày dưới dạng khoảng",
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
    practicePrompt: {
      question:
        "Công ty đặt kế hoạch lợi nhuận 1.000 tỷ và báo cáo 990 tỷ - hụt 1%. Giá cổ phiếu giảm 14%. Cách giải thích hợp lý nhất là gì?",
      options: [
        "Thị trường định giá lại độ tin cậy của mọi con số tương lai",
        "Phản ứng quá mức, vì 1% chênh lệch là sai số bình thường",
        "Do nhà đầu tư đã dùng đòn bẩy nên bị bán giải chấp hàng loạt",
        "Vì 990 tỷ vẫn thấp hơn lợi nhuận cùng kỳ năm trước của công ty",
      ],
      correct: 0,
      explanation:
        "Mười tỷ đồng không đáng 14% giá trị doanh nghiệp - thứ bị định giá lại không phải quý này mà là mọi quý sau. Guidance là công ty tuyên bố mình nhìn thấy được tương lai gần của chính mình; hụt kế hoạch nghĩa là tuyên bố đó sai, nên mọi con số tương lai công ty đưa ra từ nay đều bị chiết khấu thêm một lớp bất định. Đó là lý do biết chắc sẽ hụt thì phải điều chỉnh SỚM và công khai: điều chỉnh sớm chỉ tốn một lần đau về con số, còn để tới ngày công bố mới lộ thì mất luôn phần độ tin cậy - thứ đắt hơn nhiều và mất nhiều năm mới lấy lại.",
    },
    keyTakeaways: [
      "Hụt kế hoạch bị phạt vì mất niềm tin vào dự báo tương lai, không vì con số chênh lệch.",
      "Thận trọng quá thì thị trường tự trừ hao và con số mất tác dụng.",
      "Đưa khoảng thay vì điểm: mức bất định tự nó là thông tin.",
      "Biết sẽ hụt thì điều chỉnh sớm; trao đổi riêng với vài chuyên viên phân tích là vi phạm.",
    ],
    summary: {
      keyIdea: "Hụt kế hoạch bị phạt vì mất niềm tin vào dự báo, không vì con số chênh lệch",
      commonMistake: "Đặt kế hoạch thật thận trọng để chắc chắn vượt - thị trường tự trừ hao và con số mất tác dụng.",
      action: "Đưa khoảng thay vì một điểm, và nói rõ giả định nào quyết định đầu nào của khoảng.",
    },
    application: {
      title: "So kế hoạch với kết quả trong ba năm",
      message: "Lấy guidance và kết quả thực tế của một doanh nghiệp trong ba năm gần nhất. Nếu năm nào cũng vượt nhẹ, đó không phải năng lực dự báo tốt mà là kế hoạch được đặt thấp có chủ ý.",
      secondary: "Biết sẽ hụt thì điều chỉnh sớm và công khai; nói riêng với vài chuyên viên phân tích là vi phạm.",
    },
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
    "id": 1714,
    "slug": "devrel-bo-tai-lieu-va-buoi-gap",
    "title": "DevRel, Bài 4: Bộ tài liệu và buổi gặp - trả lời câu hỏi khó mà không hứa quá",
    "subtitle": "Một câu trả lời mơ hồ trong buổi gặp sẽ được trích lại nguyên văn ba tháng sau.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📊",
    "interactiveType": "prompt-craft",
    "whyItMatters": "Trong một buổi gặp kỹ thuật, thứ gây thiệt hại lâu nhất không phải câu trả lời sai mà là câu trả lời nghe như một lời hứa.",
    "openingQuestion": "Có người hỏi khi nào tính năng X ra mắt, mà bạn không biết. Trả lời thế nào?",
    "openingOptions": [
      "Nói rõ là chưa có mốc, và nói điều kiện nào sẽ làm nó được ưu tiên",
      "Nói rằng tính năng đó đang trong lộ trình và sẽ có thông tin sau",
      "Đưa ra một mốc ước lượng để có thể người hỏi có cơ sở lập kế hoạch của họ",
      "Chuyển câu hỏi cho đội sản phẩm và hẹn trả lời trong thời gian tới"
    ],
    "correctOption": 0,
    "explanation": "Lựa chọn thứ hai nghe an toàn nhất và nó là câu nguy hiểm nhất: người nghe sẽ lập kế hoạch dựa trên nó, và ba tháng sau họ trích lại chính câu đó. Nói rõ chưa có mốc thì khó chịu trong ba giây, còn nói ĐIỀU KIỆN ưu tiên thì cho họ thứ dùng được ngay - họ biết cần làm gì để đẩy nó lên.",
    "diagram": [
      {
        "label": "Câu trả lời nghe như lời hứa gây thiệt hại lâu nhất",
        "arrow": true
      },
      {
        "label": "Chưa có mốc + ĐIỀU KIỆN ưu tiên = câu dùng được ngay",
        "arrow": true
      },
      {
        "label": "Bộ tài liệu: một trang cho mỗi nhóm câu hỏi, không một bộ chung",
        "arrow": true
      },
      {
        "label": "Và ghi lại mọi câu chưa trả lời được, kèm ngày trả lời"
      }
    ],
    "realWorldExample": {
      "company": "Danh sách câu chưa trả lời được",
      "description": "Sau mỗi buổi gặp, danh sách những câu bạn không trả lời được là sản phẩm giá trị nhất của buổi đó. Nó vừa là việc cần làm, vừa là dữ liệu về chỗ tài liệu đang thiếu - và nó chỉ tồn tại nếu có người ghi ngay tại chỗ."
    },
    "quiz": [
      {
        "question": "Vì sao câu đang trong lộ trình lại nguy hiểm?",
        "options": [
          "Vì người nghe lập kế hoạch dựa trên nó và trích lại nguyên văn về sau",
          "Vì nó không cung cấp thông tin gì hữu ích cho người đặt câu hỏi",
          "Vì nó có thể mâu thuẫn với thông tin từ bộ phận khác trong công ty",
          "Vì nó tạo cảm giác né tránh và làm giảm mức độ tin cậy của người nói"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai đúng và nó vô hại. Vấn đề là câu đó nghe như một cam kết mềm: người nghe không phân biệt được lộ trình nội bộ với một lời hứa, và họ không có lý do gì để phân biệt."
      },
      {
        "question": "Vì sao nói điều kiện ưu tiên lại hữu ích hơn một mốc thời gian?",
        "options": [
          "Vì nó cho người hỏi biết cần làm gì để đẩy tính năng đó lên",
          "Vì nó tránh được rủi ro pháp lý khi cam kết không được thực hiện",
          "Vì điều kiện dễ giải thích hơn so với một mốc thời gian cụ thể",
          "Vì nó cho phép đội linh hoạt điều chỉnh thứ tự công việc về sau"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là lợi ích cho PHÍA BẠN. Cái này là lợi ích cho người hỏi, và đó là lý do nó biến một câu từ chối thành một câu dùng được ngay."
      },
      {
        "question": "Bộ tài liệu cho buổi gặp nên được tổ chức thế nào?",
        "options": [
          "Một trang cho mỗi nhóm câu hỏi hay gặp, thay vì một bộ chung cho mọi buổi",
          "Một bộ đầy đủ bao quát mọi khía cạnh để dùng được cho mọi tình huống",
          "Một bản tóm tắt ngắn kèm các tài liệu chi tiết để tham chiếu khi cần",
          "Một bộ theo cấp độ, từ giới thiệu tổng quan tới chi tiết kỹ thuật sâu"
        ],
        "correct": 0,
        "explanation": "Ba cách kia đều tổ chức theo NỘI DUNG. Tổ chức theo CÂU HỎI thì lúc bị hỏi bạn tìm ra ngay, và mỗi trang cũng gửi lại được cho người hỏi mà không cần cắt gọt gì."
      },
      {
        "question": "Sản phẩm giá trị nhất của một buổi gặp là gì?",
        "options": [
          "Danh sách những câu bạn không trả lời được, ghi ngay tại chỗ",
          "Danh sách người tham dự và mối quan tâm của từng người",
          "Bản ghi nội dung buổi gặp để chia sẻ lại cho những người vắng mặt",
          "Các phản hồi về sản phẩm mà người tham dự đưa ra trong buổi"
        ],
        "correct": 0,
        "explanation": "Ba thứ kia đều hữu ích và đều được ghi. Danh sách câu chưa trả lời được thì vừa là việc cần làm vừa là dữ liệu về chỗ tài liệu đang thiếu - và nó biến mất nếu không ghi ngay tại chỗ."
      },
      {
        "question": "Khi bị hỏi một câu mà câu trả lời trung thực làm sản phẩm trông kém, nên làm gì?",
        "options": [
          "Trả lời thẳng, vì nhóm này sẽ tự kiểm được và mất niềm tin thì đắt hơn nhiều",
          "Trả lời chung chung rồi hẹn cung cấp thông tin chi tiết sau buổi gặp",
          "Nêu bối cảnh để câu trả lời được hiểu đúng thay vì trả lời trực tiếp",
          "Chuyển hướng sang những khía cạnh mà sản phẩm làm tốt hơn đối thủ"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba nghe hợp lý và nó rất dễ trượt thành né tránh - người nghe phân biệt được hai chuyện đó ngay. Với đối tượng kiểm được, trả lời thẳng là lựa chọn rẻ nhất tính theo tổng thời gian."
      }
    ],
    "keyTakeaways": [
      "Câu trả lời nghe như LỜI HỨA gây thiệt hại lâu hơn câu trả lời sai.",
      "Đang trong lộ trình là câu nguy hiểm nhất - người nghe không phân biệt được nó với cam kết.",
      "Nói ĐIỀU KIỆN ưu tiên: nó cho người hỏi biết cần làm gì để đẩy lên.",
      "Tổ chức tài liệu theo CÂU HỎI, không theo nội dung - lúc bị hỏi mới tìm ra ngay.",
      "Ghi ngay danh sách câu chưa trả lời được: vừa là việc cần làm vừa là chỗ tài liệu thiếu."
    ],
    "practicePrompt": {
      "question": "Bạn vừa xong một buổi gặp. Việc đầu tiên trong mười phút sau đó là gì?",
      "options": [
        "Ghi lại mọi câu chưa trả lời được, kèm ngày bạn sẽ quay lại trả lời",
        "Gửi lời cảm ơn và bộ tài liệu cho những người đã tham dự buổi gặp",
        "Tóm tắt các phản hồi về sản phẩm và chuyển cho đội sản phẩm xử lý",
        "Ghi lại thông tin liên hệ của những người quan tâm để có thể theo dõi tiếp"
      ],
      "correct": 0,
      "explanation": "Ba việc kia đều nên làm và đều làm được sau vài giờ. Danh sách câu chưa trả lời thì phai rất nhanh - sau một buổi chiều bạn chỉ còn nhớ hai trong năm câu, và ba câu mất đi thường là ba câu khó nhất."
    },
    "summary": {
      "keyIdea": "Một câu trả lời mơ hồ sẽ được trích lại nguyên văn ba tháng sau.",
      "formula": "Chưa có mốc + điều kiện ưu tiên; tài liệu theo câu hỏi; ghi câu chưa trả lời ngay.",
      "commonMistake": "Nói đang trong lộ trình - câu nghe an toàn nhất và là cam kết mềm.",
      "action": "Lập một trang tài liệu cho nhóm câu hỏi bạn hay bị hỏi nhất."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn nhóm câu hỏi mà bạn bị hỏi nhiều nhất và làm một trang riêng cho nó - viết theo câu hỏi, không theo chủ đề.",
      "secondary": "Trang đó vừa dùng được lúc đang bị hỏi, vừa gửi lại được cho người hỏi ngay sau buổi gặp mà không cần cắt gọt gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trong một buổi gặp kỹ thuật, thứ gây thiệt hại lâu nhất không phải câu trả lời sai mà là câu trả lời nghe như một lời hứa."
      },
      {
        "type": "heading",
        "text": "Câu nguy hiểm nhất"
      },
      {
        "type": "callout",
        "label": "Đang trong lộ trình",
        "text": "Nó nghe an toàn nhất và nó là một cam kết mềm. Người nghe không phân biệt được lộ trình nội bộ với một lời hứa - và họ không có lý do gì để phân biệt. Ba tháng sau, họ trích lại chính câu đó."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chưa có mốc",
          "text": "Khó chịu trong ba giây, và trung thực."
        },
        "right": {
          "label": "Chưa có mốc + điều kiện ưu tiên",
          "text": "Dùng được ngay: người hỏi biết cần làm gì để đẩy tính năng đó lên. Đây là lợi ích cho HỌ, không phải cho bạn."
        }
      },
      {
        "type": "heading",
        "text": "Tổ chức tài liệu theo câu hỏi"
      },
      {
        "type": "paragraph",
        "text": "Một trang cho mỗi nhóm câu hỏi hay gặp, thay vì một bộ chung tổ chức theo nội dung. Lúc bị hỏi bạn tìm ra ngay, và mỗi trang cũng gửi lại được cho người hỏi mà không cần cắt gọt."
      },
      {
        "type": "closing",
        "lines": [
          "Sản phẩm giá trị nhất của một buổi gặp là DANH SÁCH NHỮNG CÂU BẠN KHÔNG TRẢ LỜI ĐƯỢC - nó vừa là việc cần làm, vừa là dữ liệu về chỗ tài liệu đang thiếu.",
          "Ghi nó NGAY TẠI CHỖ. Sau một buổi chiều bạn chỉ còn nhớ hai trong năm câu, và ba câu mất đi thường là ba câu khó nhất."
        ]
      }
    ]
  },

  {
    id: 1715,
    slug: "ir-khung-hoang-va-tin-xau",
    title: "DevRel, Bài 5: Tin xấu và khủng hoảng - nói trước khi bị hỏi",
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
          "Con số cụ thể và mốc thời gian đã biết, kể cả khi chưa đủ",
          "Lời xin lỗi gửi tới cổ đông",
          "Cam kết sự việc sẽ không bao giờ lặp lại trong tương lai",
          "So sánh cho thấy doanh nghiệp cùng ngành cũng gặp vấn đề",
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
    practicePrompt: {
      question:
        "Phát hiện một sự cố trọng yếu lúc 8 giờ sáng, phạm vi thiệt hại chưa xác định xong. Việc đầu tiên phải làm là gì?",
      options: [
        "Khoá giao dịch nội bộ, trước cả khi bắt đầu soạn thông cáo",
        "Soạn ngay thông cáo và phát hành trong vòng một giờ đầu",
        "Chờ xác định xong phạm vi rồi mới thông báo cho ban điều hành",
        "Liên hệ trước với vài chuyên viên phân tích thân thiết để dò phản ứng",
      ],
      correct: 0,
      explanation:
        "Từ lúc một người trong công ty biết, mọi giao dịch cổ phiếu của người nội bộ đều diễn ra trên thông tin thị trường chưa có - và khoá giao dịch là việc làm được ngay trong vài phút, không cần biết phạm vi thiệt hại. Soạn thông cáo cần thời gian, xác định phạm vi cần nhiều thời gian hơn, nhưng cả hai việc đó không được diễn ra trong lúc cửa giao dịch còn mở. Sau đó mới tới nguyên tắc thứ hai: xác định phạm vi rồi công bố TRỌN VẸN một lần, vì công bố nhỏ giọt khiến mức bất định không bao giờ đóng lại và mỗi bản cập nhật lại là một cú sốc mới.",
    },
    keyTakeaways: [
      "Khoá giao dịch nội bộ ngay khi biết - trước cả khi soạn thông cáo.",
      "Xác định phạm vi rồi công bố trọn vẹn một lần; nhỏ giọt khiến mức bất định không đóng lại.",
      "Thông cáo tốt có con số và mốc thời gian, không có tính từ và cam kết tuyệt đối.",
      "Sau công bố, giữ nguyên câu chuyện và cập nhật đúng mốc đã hứa.",
    ],
    summary: {
      keyIdea: "Xác định phạm vi rồi công bố trọn vẹn một lần - nhỏ giọt khiến mức bất định không bao giờ đóng lại",
      commonMistake: "Công bố phần đã chắc chắn trước để trấn an, rồi mỗi tuần lộ thêm một phần. Mỗi lần lộ thêm là một lần niềm tin bị đặt lại từ đầu.",
      action: "Khi có sự cố, việc đầu tiên là khoá giao dịch nội bộ - trước cả khi bắt đầu soạn thông cáo.",
    },
    application: {
      title: "Viết thử một thông cáo tin xấu",
      message: "Chọn một sự cố giả định và viết thông cáo cho nó: chuyện gì xảy ra, phạm vi bằng con số, đang làm gì, và khi nào sẽ cập nhật tiếp. Rồi xoá mọi tính từ và đọc lại.",
      secondary: "Một thông cáo còn đứng vững sau khi xoá hết tính từ là một thông cáo có nội dung.",
    },
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
