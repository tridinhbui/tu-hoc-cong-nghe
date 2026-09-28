import type { Lesson } from "./lesson-types";

// Chặng "Quan hệ nhà phát triển (DevRel)" (ids 1711-1715, professional track).
// Ba slug ir-* là di sản của phiên bản cũ; slug giữ nguyên để không gãy tiến độ.
//
// Cái riêng của DevRel so với truyền thông chung là đối tượng KIỂM ĐƯỢC: mỗi
// câu nói về sự cố, về lộ trình hay về giới hạn của sản phẩm đều bị người dùng
// đối chiếu với thứ họ thấy trong hệ thống của chính họ. Nói muộn một câu là để
// tin đồn dẫn dắt, và hứa một mốc mà lần phát hành sau không giữ được thì mất
// thứ khó lấy lại nhất trong nghề.

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
    subtitle: "Cách nhận ra một sự cố hay thay đổi là trọng yếu, thời hạn công bố, và vì sao im lặng cũng là một lựa chọn có hậu quả",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⏱️",
    track: "professional",
    whyItMatters:
      "Phần lớn thiệt hại khi công bố sự cố không đến từ nói sai mà đến từ nói muộn. Phân biệt được cái gì trọng yếu và đếm đúng thời hạn là phần kỹ thuật của nghề DevRel, và là phần không thể ứng biến tại chỗ.",
    openingQuestion: "Thông tin nào sau đây gần như chắc chắn là trọng yếu và phải báo cho nhà phát triển đang dùng API?",
    openingOptions: [
      "Dữ liệu của một số tài khoản đã bị đọc trái phép qua API",
      "Thay đổi nhà cung cấp dịch vụ email nội bộ cho toàn bộ nhân viên công ty",
      "Ra mắt nhận diện thương hiệu mới sau sáu tháng chuẩn bị",
      "Tuyển thêm 50 nhân sự cho bộ phận chăm sóc khách hàng ở miền Nam",
    ],
    correctOption: 0,
    explanation:
      "Thước đo của tính trọng yếu là: một nhà phát triển đang tích hợp sản phẩm của bạn có phải đổi việc họ đang làm khi biết tin này không - đổi khoá, rà dữ liệu, hoãn triển khai, hay cân nhắc chuyển nhà cung cấp. Dữ liệu tài khoản bị đọc trái phép chắc chắn đổi, vì nó buộc họ kiểm tra ngay dữ liệu của chính khách hàng họ. Ba tin còn lại không - chúng có thể quan trọng với nội bộ nhưng không đổi dòng code nào ở phía người dùng. Chú ý là thước đo này không phụ thuộc vào việc tin tốt hay xấu, cũng không phụ thuộc vào việc đội đã có bản vá hay chưa. Đợi tới khi có bản vá rồi mới công bố là cách trễ hạn phổ biến nhất, và lý do nghe rất hợp lý từ bên trong.",
    diagram: [
      { label: "Sự kiện phát sinh", arrow: true },
      { label: "Người đang tích hợp có phải đổi việc họ làm không?", arrow: true },
      { label: "Có → trọng yếu → chạy đồng hồ công bố", arrow: true },
      { label: "Công bố trong thời hạn, không đợi có bản vá" },
    ],
    interactiveType: "ethics-case",
    realWorldExample: {
      company: "Quy định thông báo sự cố lộ lọt dữ liệu cá nhân",
      description:
        "GDPR ở châu Âu và Nghị định 13/2023 ở Việt Nam đều đặt thời hạn 72 giờ để thông báo sự cố lộ lọt dữ liệu cá nhân. Điều các đội hay bỏ sót không phải định nghĩa sự cố - nó có sẵn - mà là mốc bắt đầu đếm: đồng hồ chạy từ lúc tổ chức biết sự cố, không phải từ lúc lãnh đạo họp xong về nó.",
    },
    quiz: [
      {
        question: "Thước đo tính trọng yếu là gì?",
        options: [
          "Người đang tích hợp có phải đổi việc họ đang làm khi biết tin không",
          "Sự cố có kéo dài quá 10 phút không",
          "Ban lãnh đạo có coi là quan trọng không",
          "Thay đổi có nằm trong mục ghi chú phát hành không",
        ],
        correct: 0,
        explanation:
          "Ngưỡng thời lượng hay số tài khoản bị ảnh hưởng là công cụ hỗ trợ, không phải định nghĩa. Một thay đổi rất nhỏ vẫn có thể trọng yếu nếu nó làm vỡ code của người khác, như đổi kiểu một trường trong phản hồi từ số sang chuỗi.",
      },
      {
        question: "Đồng hồ công bố bắt đầu chạy từ lúc nào?",
        options: [
          "Từ khi sự kiện phát sinh, không phải từ khi họp xong",
          "Từ khi cuộc họp kết thúc",
          "Từ khi bộ phận pháp chế hoàn tất rà soát nội dung công bố",
          "Từ khi bản vá đầu tiên được triển khai lên môi trường thật",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ trễ hạn nhiều nhất, và luôn với một lý do nghe rất hợp lý từ bên trong: đợi có bản vá rồi công bố cho trọn vẹn.",
      },
      {
        question: "Một thay đổi có lợi cho người dùng, như nâng giới hạn gọi API lên gấp đôi, có phải thông báo không?",
        options: [
          "Có, tính trọng yếu không phân biệt tin tốt hay xấu",
          "Không, nghĩa vụ công bố chỉ áp dụng với thay đổi bất lợi",
          "Chỉ khi muốn dùng nó để quảng bá sản phẩm",
          "Chỉ khi có khách hàng lớn yêu cầu thông báo bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Nâng giới hạn gọi API cũng khiến người ta thiết kế lại hệ thống của họ - bỏ bớt hàng đợi, bỏ bớt bộ đệm - nên cũng phải công bố. Nghĩa vụ gắn với mức ảnh hưởng, không với dấu của ảnh hưởng.",
      },
      {
        question: "Phiếu hỗ trợ và bài than phiền tăng vọt bất thường mà đội chưa công bố gì. DevRel nên làm gì?",
        options: [
          "Rà soát nội bộ xem sự cố hay thay đổi nào đang gây ra, và sẵn sàng trả lời công khai",
          "Đăng thông báo trấn an rằng hệ thống vẫn đang hoạt động bình thường",
          "Không làm gì vì đội vận hành chưa đưa ra kết luận chính thức nào",
          "Tặng thêm hạn mức miễn phí để giữ chân những người than phiền nhiều nhất",
        ],
        correct: 0,
        explanation:
          "Tín hiệu bất thường từ bên ngoài thường có nghĩa là sự cố đã xảy ra và người dùng thấy trước bạn. Việc đầu tiên là tìm xem nó là gì, vì nếu có thì nghĩa vụ công bố đã phát sinh từ trước đó.",
      },
      {
        question: "Vì sao im lặng cũng là một lựa chọn có hậu quả?",
        options: [
          "Vì khoảng trống thông tin luôn bị lấp bằng suy đoán và tin đồn",
          "Vì cơ quan quản lý coi im lặng là che giấu",
          "Vì khách hàng sẽ huỷ ngay",
          "Vì báo chí có quyền yêu cầu trả lời",
        ],
        correct: 0,
        explanation:
          "Người dùng không đợi. Không nói gì không có nghĩa là không có gì được nói - chỉ là người khác nói thay, bằng dữ liệu kém hơn.",
      },
    ],
    practicePrompt: {
      question:
        "Sáng thứ ba, đội phát hiện bản triển khai tuần trước làm webhook gửi trùng sự kiện cho mọi khách tích hợp. Lãnh đạo muốn chờ tới thứ sáu có bản vá rồi thông báo cùng lúc. Đúng hay sai?",
      options: [
        "Sai: đồng hồ chạy từ khi sự kiện phát sinh, không từ khi có bản vá",
        "Đúng: công bố kèm bản vá giúp người dùng phản ứng bình tĩnh hơn",
        "Đúng: chỉ phải công bố sau khi lãnh đạo đã họp và duyệt nội dung",
        "Sai: phải chờ tới cuối tháng rồi đưa vào ghi chú phát hành định kỳ",
      ],
      correct: 0,
      explanation:
        "Trọng yếu nghĩa là người đang tích hợp phải đổi việc họ làm, và webhook gửi trùng chắc chắn đạt ngưỡng đó: mỗi sự kiện trùng có thể là một đơn hàng bị xử lý hai lần ở phía họ. Đồng hồ bắt đầu chạy từ lúc đội BIẾT, không từ lúc đội sẵn sàng - nếu không thì mọi tin xấu đều hoãn được vô hạn với lý do đang chuẩn bị bản vá. Ba ngày im lặng còn tạo ra rủi ro thứ hai: trong khoảng đó người dùng tự phát hiện, tin lan trên diễn đàn, và mỗi ngày họ lại ghi thêm một lượt dữ liệu trùng mà lẽ ra đã chặn được bằng một dòng kiểm tra ở phía họ. Bản vá vẫn công bố được sau, như một bản cập nhật.",
    },
    keyTakeaways: [
      "Trọng yếu = người đang tích hợp phải đổi việc họ làm. Không phụ thuộc tin tốt hay xấu.",
      "Đồng hồ chạy từ khi sự kiện phát sinh, không từ khi họp xong hay có bản vá.",
      "Phiếu hỗ trợ tăng vọt mà chưa có thông báo là dấu hiệu sự cố, phải rà soát ngay.",
      "Im lặng không phải trung lập: khoảng trống bị lấp bằng tin đồn.",
    ],
    summary: {
      keyIdea: "Trọng yếu nghĩa là người đang tích hợp phải đổi việc họ làm - không phụ thuộc tin tốt hay xấu",
      commonMistake: "Đếm thời hạn từ lúc người phụ trách công bố được báo, trong khi đồng hồ chạy từ khi sự kiện phát sinh.",
      action: "Rà lại quy trình nội bộ: từ lúc một sự cố xảy ra tới lúc người chịu trách nhiệm công bố biết, mất mấy giờ.",
    },
    application: {
      title: "Đo độ trễ nội bộ của chính tổ chức",
      message: "Chọn ba sự cố đã công bố trong năm, tìm thời điểm chúng thực sự bắt đầu và thời điểm thông báo được đăng. Khoảng cách đó là rủi ro công bố muộn của tổ chức, đo bằng dữ liệu chứ không bằng cảm giác.",
      secondary: "Rất ít thiệt hại đến từ việc nói sai; gần hết đến từ việc nói muộn.",
    },
    sections: [
      {
        type: "lead",
        text: "Rất ít thiệt hại khi công bố sự cố đến từ việc nói sai. Gần hết đến từ việc nói muộn, và gần như lần nào lý do nội bộ cũng nghe hợp lý: đợi cho chắc, đợi có bản vá, đợi qua kỳ nghỉ.",
      },
      { type: "heading", text: "Nhận ra tính trọng yếu" },
      {
        type: "paragraph",
        text: "Câu hỏi duy nhất là: một nhà phát triển đang tích hợp biết tin này có phải đổi việc họ đang làm không. Ngưỡng thời lượng sự cố hay số tài khoản bị ảnh hưởng chỉ là công cụ hỗ trợ - có thay đổi rất nhỏ về con số nhưng làm vỡ code của người khác, như đổi kiểu một trường trong phản hồi từ số sang chuỗi.",
      },
      { type: "heading", text: "Đếm đúng mốc bắt đầu" },
      {
        type: "list",
        items: [
          "Đồng hồ chạy từ khi sự kiện phát sinh, không từ khi đội DevRel được thông báo.",
          "Không được đợi cho tới khi có bản vá - bản vá là nội dung công bố tiếp theo, không phải điều kiện của công bố đầu tiên.",
          "Không được đợi tới lúc ít người trực tuyến.",
          "Nếu chưa có đủ thông tin, công bố phần đã chắc chắn và nói rõ phần đang xác minh.",
        ],
      },
      {
        type: "callout",
        label: "Khi người dùng lên tiếng mà đội chưa nói gì",
        text: "Phiếu hỗ trợ và bài than phiền tăng vọt bất thường thường có nghĩa là người dùng đã thấy sự cố trước bạn. Việc đầu tiên không phải là đăng thông báo trấn an, mà là rà soát xem chuyện gì đang xảy ra - vì nếu có, nghĩa vụ công bố đã phát sinh từ trước khi họ lên tiếng.",
      },
      {
        type: "heading",
        text: "Đồng hồ chạy từ lúc nào"
      },
      {
        type: "paragraph",
        text: "Đây là chỗ sai nhiều nhất, và nó không phải một sai lầm về đạo đức mà về cách đếm. Đồng hồ công bố chạy từ khi sự kiện PHÁT SINH, không phải từ khi đội quan hệ nhà phát triển được thông báo, và cũng không phải từ khi lãnh đạo họp xong để quyết định nói thế nào. Một bản triển khai làm hỏng webhook vào chiều thứ tư, đội trực biết thứ năm, lãnh đạo kỹ thuật họp thứ sáu, người phụ trách công bố nhận tin thứ hai tuần sau - thời hạn đã trôi mất bốn ngày trước khi người chịu trách nhiệm công bố biết là có việc phải làm. Vì thế phần khó của công việc này nằm ở quy trình nội bộ, không nằm ở việc soạn thông báo."
      },
      {
        type: "callout",
        label: "Không được đợi cho tới khi thông tin đầy đủ",
        text: "Một sự kiện trọng yếu mà chưa biết hết hậu quả vẫn phải công bố, kèm chính điều đó: đã xảy ra việc này, mức ảnh hưởng đang được đánh giá, sẽ cập nhật khi có thêm thông tin. Chờ cho tới khi có con số chính xác là lý do phổ biến nhất dẫn tới công bố muộn, và nó nghe rất có trách nhiệm - đó chính là điều làm nó nguy hiểm. Rất ít thiệt hại đến từ việc nói sai; gần hết đến từ việc nói muộn."
      },
      {
        type: "comparison",
        left: {
          label: "Khi người dùng lên tiếng mà đội chưa nói gì",
          text: "Phiếu hỗ trợ tăng vọt bất thường thường có nghĩa sự cố đã xảy ra và người dùng thấy trước bạn. Việc đầu tiên không phải soạn thông báo phủ nhận mà là rà soát nội bộ xem có sự cố thật không - vì nếu có, im lặng đang kéo dài một giai đoạn mà người dùng tiếp tục ghi dữ liệu hỏng vào hệ thống của họ."
        },
        right: {
          label: "Vì sao im lặng cũng là một lời phát biểu",
          text: "Khi cộng đồng đang hỏi và đội không nói gì, người ta điền vào chỗ trống bằng giả định xấu nhất. Không bình luận là một lựa chọn hợp lệ, nhưng nó có giá - và cái giá đó tăng theo từng ngày im lặng."
        }
      },
      {
        type: "closing",
        lines: [
          "Nghề này có hai đồng hồ: đồng hồ của thời hạn công bố và đồng hồ của tin đồn.",
          "Đồng hồ thứ hai luôn chạy nhanh hơn.",
        ],
      },
    ],
  },

  {
    id: 1713,
    interactiveType: "ethics-case",
    slug: "lo-trinh-cong-bo-va-moc-thoi-gian",
    title: "DevRel, Bài 3: Lộ trình công bố - đưa ra một mốc rồi phải sống với nó",
    subtitle: "Vì sao đội sản phẩm công bố lộ trình, cái giá của việc trễ hẹn, và cách đặt khoảng thay vì đặt điểm",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Mốc ra mắt công khai là lời hứa duy nhất của đội sản phẩm mà cộng đồng nhà phát triển chấm điểm ở mỗi lần phát hành. Đặt sớm thì mất niềm tin khi trễ, đặt quá xa thì mất niềm tin theo kiểu khác - và cả hai đều rơi vào đội DevRel trước khi rơi vào ai khác.",
    openingQuestion:
      "Đội hứa phát hành SDK mới ngày 1/10, ra mắt thật ngày 3/10. Diễn đàn đầy bình luận thất vọng. Vì sao?",
    openingOptions: [
      "Vì trễ hẹn làm người dùng hạ niềm tin vào mọi mốc mà đội hứa sau này",
      "Vì hai ngày chậm trễ là quá dài với một bản phát hành SDK",
      "Vì người dùng luôn phàn nàn sau mỗi lần có bản phát hành mới",
      "Vì các trang tin công nghệ buộc phải đưa tin xấu khi trễ mốc",
    ],
    correctOption: 0,
    explanation:
      "Hai ngày trên một lộ trình ba tháng là chưa tới 3%, không đủ để làm hỏng kế hoạch của ai. Thứ đổi là độ tin cậy của mọi mốc sau này. Người dùng lập kế hoạch của chính họ trên giả định đội sản phẩm biết rõ tiến độ của mình; trễ hẹn, dù chỉ hai ngày, là bằng chứng ngược lại - và nó buộc họ cộng thêm biên an toàn vào mọi mốc tương lai, không chỉ lần này. Đó là lý do một đội trễ hai ngày có thể mất nhiều niềm tin hơn một đội lùi hẳn một quý nhưng đã báo trước từ sớm.",
    diagram: [
      { label: "Công bố mốc ra mắt", arrow: true },
      { label: "Người dùng lập kế hoạch quanh mốc đó", arrow: true },
      { label: "Ngày phát hành thật so với mốc đã hứa", arrow: true },
      { label: "Đúng hẹn → niềm tin tích luỹ · Trễ → cộng biên an toàn vào mọi mốc sau" },
    ],
    realWorldExample: {
      company: "Lịch phát hành theo thời gian của các dự án mã nguồn mở lớn",
      description:
        "Nhiều dự án lớn như Ubuntu hay Kubernetes phát hành theo lịch cố định: đến ngày thì phát hành những gì đã sẵn sàng, tính năng chưa xong thì chờ đợt sau. Mốc ngày trở thành lời hứa giữ được, còn phạm vi tính năng là thứ co giãn - và người dùng học được cách đọc hai thứ đó với hai mức tin cậy khác nhau.",
    },
    quiz: [
      {
        question: "Vì sao trễ hẹn hai ngày có thể làm mất nhiều niềm tin?",
        options: [
          "Vì nó hạ độ tin cậy của mọi mốc tương lai, không chỉ lần này",
          "Vì hợp đồng buộc phải bồi thường khi trễ",
          "Vì các đối tác tích hợp phải huỷ toàn bộ kế hoạch ra mắt của họ",
          "Vì phần bị trễ là tính năng quan trọng nhất",
        ],
        correct: 0,
        explanation:
          "Người dùng không bận tâm tới hai ngày đó. Họ đánh giá lại xác suất những mốc tiếp theo cũng sai - và xác suất ấy áp lên mọi kế hoạch họ dựng quanh sản phẩm của bạn.",
      },
      {
        question: "Đặt mốc quá thận trọng gây hậu quả gì?",
        options: [
          "Người dùng tự trừ hao, nên mốc công bố mất dần tác dụng",
          "Bộ phận kinh doanh sẽ yêu cầu đội giải trình lại cơ sở của từng mốc",
          "Đối tác lớn sẽ phản đối lộ trình",
          "Đội phải công bố lại giữa chừng",
        ],
        correct: 0,
        explanation:
          "Nếu lần nào cũng ra mắt sớm hơn mốc hai tháng, người dùng sẽ tự trừ hao và mốc công bố không còn truyền tải được thông tin gì.",
      },
      {
        question: "Vì sao nên đưa khoảng thay vì một ngày cụ thể?",
        options: [
          "Vì khoảng phản ánh đúng mức bất định thật của việc ước lượng",
          "Vì khoảng giúp tránh phải giải trình",
          "Vì khách hàng doanh nghiệp chỉ chấp nhận lộ trình trình bày dạng khoảng",
          "Vì quy trình Agile yêu cầu hai kịch bản",
        ],
        correct: 0,
        explanation:
          "Một ngày cụ thể ngụ ý độ chính xác mà không ai có. Khoảng nói thật về mức bất định, và mức bất định đó tự nó là thông tin.",
      },
      {
        question: "Khi biết chắc sẽ trễ hẹn, DevRel nên làm gì?",
        options: [
          "Điều chỉnh mốc và công bố ngay khi đủ căn cứ",
          "Đợi tới đúng ngày đã hứa rồi mới báo",
          "Giữ nguyên mốc và nhấn mạnh các tính năng khác đã xong đúng hạn",
          "Báo riêng trước cho vài khách hàng lớn để họ lùi kế hoạch dần",
        ],
        correct: 0,
        explanation:
          "Điều chỉnh sớm là tin xấu; im lặng rồi trễ là tin xấu cộng với mất niềm tin. Riêng phương án cuối còn là cung cấp thông tin không công bằng cho phần cộng đồng còn lại.",
      },
      {
        question: "Điều gì làm cộng đồng tha thứ cho một lần trễ hẹn?",
        options: [
          "Đã được báo trước và nguyên nhân khớp với những gì đội từng cảnh báo",
          "Mức trễ ngắn hơn mức trễ bình quân của các sản phẩm cùng loại",
          "Đội cam kết sẽ bù lại toàn bộ phần trễ trong đợt phát hành kế tiếp",
          "Đội đồng thời công bố một loạt tính năng mới với quy mô lớn",
        ],
        correct: 0,
        explanation:
          "Người dùng chấp nhận đội gặp khó khăn. Thứ họ không chấp nhận là phát hiện đội không nhìn thấy khó khăn đó đang tới.",
      },
    ],
    practicePrompt: {
      question:
        "Đội hứa ra mắt API tìm kiếm mới trong quý 3, phát hành vào ngày cuối quý và cắt mất hai tính năng. Lượt đăng ký dùng thử giảm mạnh suốt quý sau. Cách giải thích hợp lý nhất là gì?",
      options: [
        "Người dùng đánh giá lại độ tin cậy của mọi mốc tương lai",
        "Phản ứng quá mức, vì cắt hai tính năng là chuyện bình thường",
        "Do đối thủ vừa hạ giá nên người dùng chuyển sang dùng thử bên kia",
        "Vì bản phát hành vẫn thiếu tính năng so với phiên bản trước đó",
      ],
      correct: 0,
      explanation:
        "Hai tính năng bị cắt không đáng để mất cả một quý đăng ký - thứ bị đánh giá lại không phải bản phát hành này mà là mọi bản sau. Lộ trình là đội tuyên bố mình nhìn thấy được tương lai gần của chính sản phẩm; phát hành thiếu vào phút chót nghĩa là tuyên bố đó sai, nên mọi mốc đội đưa ra từ nay đều bị cộng thêm một lớp bất định. Đó là lý do biết chắc sẽ trễ hay phải cắt thì phải điều chỉnh SỚM và công khai: điều chỉnh sớm chỉ tốn một lần đau về tiến độ, còn để tới ngày phát hành mới lộ thì mất luôn phần độ tin cậy - thứ đắt hơn nhiều và mất nhiều năm mới lấy lại.",
    },
    keyTakeaways: [
      "Trễ hẹn bị phạt vì mất niềm tin vào các mốc tương lai, không vì số ngày chậm.",
      "Thận trọng quá thì người dùng tự trừ hao và mốc mất tác dụng.",
      "Đưa khoảng thay vì điểm: mức bất định tự nó là thông tin.",
      "Biết sẽ trễ thì điều chỉnh sớm; báo riêng cho vài khách hàng lớn là không công bằng.",
    ],
    summary: {
      keyIdea: "Trễ hẹn bị phạt vì mất niềm tin vào lộ trình, không vì số ngày chậm",
      commonMistake: "Đặt mốc thật xa để chắc chắn kịp - người dùng tự trừ hao và mốc mất tác dụng.",
      action: "Đưa khoảng thay vì một điểm, và nói rõ giả định nào quyết định đầu nào của khoảng.",
    },
    application: {
      title: "So mốc đã hứa với ngày phát hành trong ba năm",
      message: "Lấy lộ trình công khai và ngày phát hành thật của một sản phẩm bạn dùng trong ba năm gần nhất. Nếu lần nào cũng ra sớm hơn mốc một chút, đó không phải năng lực ước lượng tốt mà là mốc được đặt xa có chủ ý.",
      secondary: "Biết sẽ trễ thì điều chỉnh sớm và công khai; báo riêng cho vài khách hàng lớn là không công bằng.",
    },
    sections: [
      {
        type: "lead",
        text: "Lộ trình công khai là lời hứa duy nhất đội sản phẩm đưa ra mà cộng đồng chấm điểm ở mỗi lần phát hành. Và giống mọi lời hứa, giá trị của nó không nằm ở lần hứa mà ở chuỗi lần giữ được.",
      },
      { type: "heading", text: "Vì sao trễ một chút lại đắt" },
      {
        type: "paragraph",
        text: "Người dùng lập kế hoạch trên giả định đội sản phẩm hiểu tiến độ của mình hơn người ngoài. Trễ hẹn là bằng chứng ngược lại, nên nó không chỉ sửa mốc lần này mà buộc họ cộng biên an toàn vào mọi mốc tương lai. Một đội trễ hai ngày có thể mất nhiều niềm tin hơn một đội lùi hẳn một quý đã báo trước.",
      },
      {
        type: "comparison",
        left: { label: "Đặt sớm", text: "Được chú ý trong ngắn hạn, và mất nhiều hơn thế vào ngày trễ. Chi phí trả sau nhưng trả bằng thứ khó mua lại." },
        right: { label: "Đặt xa", text: "Ra mắt sớm hơn hẹn lần nào cũng đẹp, cho tới khi người dùng tự trừ hao và mốc công bố không còn nói lên điều gì." },
      },
      { type: "heading", text: "Khi biết sẽ trễ" },
      {
        type: "list",
        items: [
          "Điều chỉnh và công bố ngay khi có đủ căn cứ - đừng đợi tới ngày đã hứa.",
          "Nói nguyên nhân cụ thể, không nói 'gặp một số khó khăn kỹ thuật'.",
          "Nói rõ phần nào là tạm thời, phần nào là thay đổi phạm vi.",
          "Không bao giờ báo riêng trước cho vài khách hàng lớn để họ lùi kế hoạch dần - phần cộng đồng còn lại sẽ biết, và họ nhớ.",
        ],
      },
      {
        type: "callout",
        label: "Thứ thực sự được tha thứ",
        text: "Cộng đồng chấp nhận một lần trễ nếu nó đã được cảnh báo và nguyên nhân khớp với những gì đội từng nói. Cái không được tha thứ là phát hiện ra đội đã không nhìn thấy nó đang tới - vì điều đó nói về mọi lần phát hành sau, chứ không riêng lần này.",
      },
      {
        type: "closing",
        lines: [
          "Một mốc đưa ra là một mốc phải sống chung với nó cho tới ngày phát hành.",
          "Nên chỗ khó của lộ trình không phải lúc công bố, mà là mọi ngày sau đó.",
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
    subtitle: "Trình tự xử lý khi có sự cố, cách viết một thông báo về tin xấu, và vì sao nhỏ giọt là cách tệ nhất",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚨",
    track: "professional",
    whyItMatters:
      "Mọi đội DevRel đều làm tốt khi mọi thứ suôn sẻ. Giá trị của nghề này được chứng minh trong tuần có sự cố, và những gì làm trong tuần đó quyết định sản phẩm mất một tuần hay mất niềm tin nhiều năm.",
    openingQuestion:
      "Phát hiện một lỗi phân quyền đã để lộ dữ liệu của một số tài khoản qua API suốt ba tuần. Nên công bố theo cách nào?",
    openingOptions: [
      "Xác định phạm vi rồi công bố toàn bộ một lần",
      "Công bố ngay phần đã biết và cập nhật dần khi rà soát thêm",
      "Vá lặng lẽ trong bản phát hành kế tiếp kèm một dòng ghi chú kỹ thuật",
      "Đợi đơn vị kiểm thử bảo mật độc lập xác nhận rồi công bố cùng báo cáo",
    ],
    correctOption: 0,
    explanation:
      "Cần một khoảng thời gian ngắn để biết lỗi lan tới đâu - bao nhiêu tài khoản, loại dữ liệu nào, từ ngày nào - rồi công bố trọn vẹn một lần. Đây là ngoại lệ hiếm hoi của nguyên tắc công bố càng sớm càng tốt, và lý do nằm ở cách người dùng phản ứng với tin nhỏ giọt: mỗi lần cập nhật thêm một phần, họ không cộng thêm phần mới mà đặt lại câu hỏi còn bao nhiêu chưa biết - nên ba lần công bố nhỏ gây thiệt hại lớn hơn hẳn một lần công bố đầy đủ cùng nội dung. Nhưng khoảng thời gian ấy phải tính bằng giờ hoặc vài ngày, không phải bằng tuần - với dữ liệu cá nhân còn bị chặn bởi thời hạn 72 giờ của luật - và trước tất cả, lỗ hổng phải được chặn lại.",
    diagram: [
      { label: "Phát hiện sự cố", arrow: true },
      { label: "Chặn lỗ hổng và thu hồi khoá bị lộ ngay lập tức", arrow: true },
      { label: "Xác định phạm vi - tính bằng giờ, không bằng tuần", arrow: true },
      { label: "Công bố trọn vẹn một lần: cái gì, bao nhiêu, vì sao, sửa thế nào", arrow: true },
      { label: "Theo dõi và trả lời, không đổi câu chuyện" },
    ],
    interactiveType: "ethics-case",
    realWorldExample: {
      company: "Các bản phân tích sau sự cố được công bố công khai",
      description:
        "Khi một nhà cung cấp dịch vụ đám mây công bố bản phân tích sau sự cố mà phạm vi lớn hơn nhiều so với thông báo ban đầu, phản ứng của người dùng thường mạnh hơn nhiều so với mức chênh lệch con số. Nguyên nhân là họ đọc chênh lệch đó như một tín hiệu về khả năng giám sát của chính nhà cung cấp - và một khi đã nghi ngờ chỗ đó thì mọi con số khác trên trang trạng thái cũng bị nghi ngờ theo.",
    },
    quiz: [
      {
        question: "Vì sao công bố nhỏ giọt gây thiệt hại lớn hơn công bố một lần?",
        options: [
          "Vì mỗi lần cập nhật khiến người dùng hỏi còn bao nhiêu chưa biết",
          "Vì quy định cấm công bố cùng một sự việc thành nhiều lần khác nhau",
          "Vì báo chí sẽ đưa tin nhiều lần và khuếch đại mức độ nghiêm trọng",
          "Vì chi phí gửi email tăng theo số lần",
        ],
        correct: 0,
        explanation:
          "Người dùng không cộng dồn các phần tin xấu; họ đánh giá lại mức bất định. Nhỏ giọt làm mức bất định đó không bao giờ đóng lại.",
      },
      {
        question: "Việc đầu tiên phải làm khi phát hiện sự cố bảo mật trọng yếu là gì?",
        options: [
          "Chặn lỗ hổng và thu hồi các khoá bị lộ",
          "Soạn thông cáo báo chí để chủ động kiểm soát thông điệp",
          "Báo cho khách hàng lớn trước",
          "Rà soát lại toàn bộ quy trình kiểm thử bảo mật liên quan",
        ],
        correct: 0,
        explanation:
          "Từ giây phút biết tin, lỗ hổng vẫn đang mở và có thể vẫn đang bị khai thác. Mỗi phút để ngỏ trong lúc soạn thông báo biến một sự cố thành hai.",
      },
      {
        question: "Một thông báo về tin xấu nên có gì mà thông báo kém thường thiếu?",
        options: [
          "Con số cụ thể và mốc thời gian đã biết, kể cả khi chưa đủ",
          "Lời xin lỗi gửi tới người dùng",
          "Cam kết sự việc sẽ không bao giờ lặp lại trong tương lai",
          "So sánh cho thấy sản phẩm cùng loại cũng gặp vấn đề",
        ],
        correct: 0,
        explanation:
          "Thông báo kém đầy tính từ và cam kết. Người dùng cần biết ảnh hưởng bao nhiêu tài khoản, trong khoảng thời gian nào, và ai đang xử lý - phần còn lại là chữ.",
      },
      {
        question: "Vì sao không nên hứa 'sẽ không bao giờ lặp lại'?",
        options: [
          "Vì đó là lời hứa không kiểm soát được, và một lần tái diễn sẽ đắt gấp đôi",
          "Vì quy định không cho phép doanh nghiệp đưa ra cam kết về tương lai",
          "Vì người dùng sẽ yêu cầu công ty bồi thường nếu sự việc tái diễn",
          "Vì lời hứa này khiến đơn vị kiểm thử phải mở rộng phạm vi rà soát",
        ],
        correct: 0,
        explanation:
          "Nói được cụ thể đã thay đổi kiểm soát nào thì tốt hơn hẳn một lời hứa tuyệt đối - lời hứa đó chỉ tạo thêm một chỗ để thất hứa.",
      },
      {
        question: "Sau khi công bố, điều quan trọng nhất trong những tuần tiếp theo là gì?",
        options: [
          "Giữ nguyên câu chuyện và cập nhật đúng những mốc đã hứa",
          "Đẩy truyền thông tính năng mới",
          "Hạn chế phát ngôn để tránh sự việc tiếp tục được nhắc lại trên mạng",
          "Tổ chức gặp riêng từng khách hàng lớn để giải thích chi tiết bối cảnh",
        ],
        correct: 0,
        explanation:
          "Đổi câu chuyện giữa chừng gây thiệt hại lớn hơn chính tin xấu ban đầu, vì nó nói rằng phiên bản đầu tiên chưa đầy đủ.",
      },
    ],
    practicePrompt: {
      question:
        "Phát hiện một sự cố bảo mật trọng yếu lúc 8 giờ sáng, phạm vi thiệt hại chưa xác định xong. Việc đầu tiên phải làm là gì?",
      options: [
        "Chặn lỗ hổng và thu hồi khoá bị lộ, trước cả khi soạn thông báo",
        "Soạn ngay thông báo và đăng lên trang trạng thái trong giờ đầu",
        "Chờ xác định xong phạm vi rồi mới báo cho lãnh đạo kỹ thuật",
        "Liên hệ trước với vài khách hàng thân thiết để dò phản ứng của họ",
      ],
      correct: 0,
      explanation:
        "Từ lúc một người trong công ty biết, mỗi phút lỗ hổng còn mở là thêm một phút dữ liệu có thể tiếp tục bị lấy ra - và chặn lỗ hổng, thu hồi khoá bị lộ là việc làm được trong vài phút, không cần biết phạm vi thiệt hại. Soạn thông báo cần thời gian, xác định phạm vi cần nhiều thời gian hơn, nhưng cả hai việc đó không được diễn ra trong lúc cửa vẫn mở. Sau đó mới tới nguyên tắc thứ hai: xác định phạm vi rồi công bố TRỌN VẸN một lần, vì công bố nhỏ giọt khiến mức bất định không bao giờ đóng lại và mỗi bản cập nhật lại là một cú sốc mới.",
    },
    keyTakeaways: [
      "Chặn lỗ hổng và thu hồi khoá bị lộ ngay khi biết - trước cả khi soạn thông báo.",
      "Xác định phạm vi rồi công bố trọn vẹn một lần; nhỏ giọt khiến mức bất định không đóng lại.",
      "Thông báo tốt có con số và mốc thời gian, không có tính từ và cam kết tuyệt đối.",
      "Sau công bố, giữ nguyên câu chuyện và cập nhật đúng mốc đã hứa.",
    ],
    summary: {
      keyIdea: "Xác định phạm vi rồi công bố trọn vẹn một lần - nhỏ giọt khiến mức bất định không bao giờ đóng lại",
      commonMistake: "Công bố phần đã chắc chắn trước để trấn an, rồi mỗi tuần lộ thêm một phần. Mỗi lần lộ thêm là một lần niềm tin bị đặt lại từ đầu.",
      action: "Khi có sự cố, việc đầu tiên là chặn lỗ hổng và thu hồi khoá bị lộ - trước cả khi bắt đầu soạn thông báo.",
    },
    application: {
      title: "Viết thử một thông báo sự cố",
      message: "Chọn một sự cố giả định và viết thông báo cho nó: chuyện gì xảy ra, phạm vi bằng con số, đang làm gì, và khi nào sẽ cập nhật tiếp. Rồi xoá mọi tính từ và đọc lại.",
      secondary: "Một thông báo còn đứng vững sau khi xoá hết tính từ là một thông báo có nội dung.",
    },
    sections: [
      {
        type: "lead",
        text: "Đội DevRel nào cũng làm tốt trong quý thuận lợi. Nghề này được chứng minh trong tuần có sự cố - và phần lớn thiệt hại trong tuần đó là do cách xử lý, không phải do bản thân sự cố.",
      },
      { type: "heading", text: "Trình tự" },
      {
        type: "list",
        items: [
          "Chặn lỗ hổng, thu hồi khoá và phiên đăng nhập bị lộ ngay lập tức. Đây là việc đầu tiên, trước cả khi biết sự việc lớn tới đâu.",
          "Xác định phạm vi: bao nhiêu tài khoản, dữ liệu gì, từ ngày nào, còn chỗ nào chưa rà.",
          "Công bố trọn vẹn một lần, kèm mốc thời gian cho những gì chưa xong.",
          "Sau đó chỉ cập nhật theo đúng những mốc đã hứa - không thêm, không đổi.",
        ],
      },
      { type: "heading", text: "Vì sao nhỏ giọt là cách tệ nhất" },
      {
        type: "paragraph",
        text: "Người dùng không cộng dồn các mảnh tin xấu. Mỗi lần có thêm một mảnh, họ đặt lại câu hỏi còn bao nhiêu chưa biết - và câu hỏi đó không có đáy. Ba lần công bố nhỏ với cùng nội dung gây thiệt hại lớn hơn hẳn một lần công bố đầy đủ, vì sau lần công bố đầy đủ thì mức bất định đóng lại.",
      },
      {
        type: "comparison",
        left: { label: "Thông báo kém", text: "Đầy tính từ, xin lỗi, cam kết không tái diễn. Không có con số, không có mốc thời gian, không nói ai đang xử lý." },
        right: { label: "Thông báo tốt", text: "Ảnh hưởng bao nhiêu tài khoản, trong khoảng thời gian nào, nguyên nhân là gì, kiểm soát nào đã đổi, và khi nào có thông tin tiếp theo." },
      },
      {
        type: "callout",
        label: "Câu không nên hứa",
        text: "\"Sự việc sẽ không bao giờ lặp lại\" là lời hứa không ai kiểm soát được, và nếu nó lặp lại thì lần thứ hai đắt gấp đôi vì đã có lời hứa đứng đó. Thay bằng điều nói được cụ thể: kiểm soát nào vừa được thêm vào, ai duyệt bước nào từ nay.",
      },
      {
        type: "closing",
        lines: [
          "Sự cố làm mất niềm tin một lần. Cách xử lý sự cố làm mất niềm tin nhiều lần.",
          "Và thứ mất trong lần thứ hai thì không mua lại bằng một quý suôn sẻ.",
        ],
      },
    ],
  },
];
