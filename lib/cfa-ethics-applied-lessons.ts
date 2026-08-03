import type { Lesson } from "./lesson-types";

// CFA Ethics, phần vận dụng (ids 1591-1602).
//
// Sau hai loạt trước, Ethics có 26 bài và ở 7.6% corpus tham chiếu so với
// trọng số 15-20% - vẫn là khoảng cách lớn nhất trong mười môn. Loạt này đóng
// khoảng một nửa phần còn lại.
//
// Phần đã có: Code of Ethics và bảy nhóm Standards ở mức tổng quan, các case
// tổng hợp, GIPS cơ bản, và chiều sâu của I(A), I(B), I(C), II(A) mosaic,
// II(B), III(B), III(D), IV(B), V(A), V(B), VII(B).
//
// Phần loạt này lấp: các Standard còn lại chưa được đào sâu - III(A), III(C),
// III(E), IV(A), IV(C), V(C), VI(A), VII(A) - cùng ba bài vận dụng mà đề cương
// nhắc tới nhưng chưa bài nào xử lý: bộ máy tuân thủ thật sự vận hành ra sao,
// đạo đức khi thuật toán ra quyết định, và GIPS ở mức kiểm chứng độc lập.

export const CFA_ETHICS_APPLIED_LESSONS: Lesson[] = [
  {
    id: 1591,
    slug: "cfa-ethics-standard-3a-long-trung-thanh-than-trong",
    title: "CFA Ethics 27: Standard III(A) - Khách hàng là ai, và soft dollar tiêu tiền của ai",
    subtitle: "Xác định đúng bên được phục vụ, và ranh giới của hoa hồng môi giới đổi lấy nghiên cứu",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🤲",
    whyItMatters:
      "Câu hỏi 'ai là khách hàng' nghe hiển nhiên cho tới khi bạn quản lý một quỹ hưu trí: người trả phí là công ty chủ quản, nhưng bên bạn có nghĩa vụ lại là người lao động. Trả lời sai câu này thì mọi quyết định sau đó đều lệch.",
    openingQuestion:
      "Bạn quản lý quỹ hưu trí cho một doanh nghiệp. Ban lãnh đạo doanh nghiệp yêu cầu tăng tỷ trọng cổ phiếu chính công ty họ. Nghĩa vụ của bạn thuộc về ai?",
    openingOptions: [
      "Ban lãnh đạo doanh nghiệp, vì họ là bên ký hợp đồng và trả phí",
      "Người thụ hưởng quỹ hưu trí - tức người lao động - chứ không phải bên ký hợp đồng",
      "Cả hai bên như nhau, nên cần tìm phương án dung hòa",
      "Cơ quan quản lý, vì quỹ hưu trí chịu giám sát đặc biệt",
    ],
    correctOption: 1,
    explanation:
      "Với quỹ hưu trí, bên ký hợp đồng và bên được phục vụ là hai chủ thể khác nhau, và Standard III(A) nói rõ nghĩa vụ thuộc về người thụ hưởng. Đây không phải chi tiết kỹ thuật: yêu cầu tăng tỷ trọng cổ phiếu công ty mẹ làm danh mục hưu trí tập trung rủi ro vào đúng nơi mà thu nhập của người lao động đã phụ thuộc vào - mất việc và mất lương hưu cùng một lúc. Nguyên tắc mở rộng ra mọi tình huống có bên trung gian: quản lý quỹ đầu tư thì khách hàng là chính quỹ và các nhà đầu tư của nó, không phải người giới thiệu bạn vào.",
    diagram: [
      { label: "Bên ký hợp đồng và bên được phục vụ có thể khác nhau", arrow: true },
      { label: "Nghĩa vụ thuộc về người thụ hưởng", arrow: true },
      { label: "Thận trọng: quyết định như người khôn ngoan làm với tiền của họ", arrow: true },
      { label: "Chăm sóc: phù hợp mục tiêu của chính người thụ hưởng" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Soft dollar - hoa hồng môi giới đổi lấy nghiên cứu",
      description:
        "Nhà quản lý danh mục trả hoa hồng giao dịch cho công ty môi giới, và một phần trong đó được đổi lấy báo cáo nghiên cứu. Tiền hoa hồng ấy là tiền của khách hàng, không phải của nhà quản lý - nên Standard III(A) đặt một ranh giới cụ thể: nghiên cứu mua bằng soft dollar phải phục vụ trực tiếp lợi ích của chính khách hàng đã trả hoa hồng đó. Mua phần mềm kế toán nội bộ hay trả tiền thuê văn phòng bằng soft dollar là dùng tiền khách cho chi phí của mình.",
    },
    quiz: [
      {
        question: "Với quỹ hưu trí, nghĩa vụ theo Standard III(A) thuộc về ai?",
        options: [
          "Người thụ hưởng quỹ, không phải bên ký hợp đồng",
          "Ban lãnh đạo doanh nghiệp vì họ là bên trả phí quản lý",
          "Cả hai bên với mức độ ưu tiên hoàn toàn ngang nhau",
          "Cơ quan quản lý giám sát hoạt động của quỹ hưu trí",
        ],
        correct: 0,
        explanation:
          "Bên trả tiền và bên được phục vụ tách nhau ở đây, và đó chính là tình huống Standard III(A) được viết để xử lý.",
      },
      {
        question: "Soft dollar được phép dùng vào việc gì?",
        options: [
          "Nghiên cứu phục vụ trực tiếp lợi ích của khách đã trả hoa hồng",
          "Chi phí vận hành chung của công ty quản lý quỹ đầu tư",
          "Phần mềm kế toán nội bộ dùng cho toàn bộ hoạt động công ty",
          "Chi phí marketing để thu hút thêm khách hàng mới cho quỹ",
        ],
        correct: 0,
        explanation:
          "Ranh giới nằm ở chỗ tiền của ai và phục vụ ai: hoa hồng là tiền khách, nên thứ mua bằng nó phải quay lại phục vụ chính họ.",
      },
      {
        question: "Chữ 'thận trọng' (prudence) trong Standard III(A) yêu cầu gì?",
        options: [
          "Ra quyết định như một người khôn ngoan làm với tài sản của họ",
          "Luôn chọn phương án đầu tư có mức rủi ro thấp nhất có thể",
          "Chỉ đầu tư vào các tài sản đã được xếp hạng tín nhiệm cao",
          "Tránh mọi khoản đầu tư có khả năng thua lỗ trong ngắn hạn",
        ],
        correct: 0,
        explanation:
          "Thận trọng không đồng nghĩa với né rủi ro. Một danh mục hưu trí toàn tiền gửi cũng có thể là thiếu thận trọng vì không theo kịp lạm phát.",
      },
      {
        question: "Vì sao tăng tỷ trọng cổ phiếu công ty mẹ trong quỹ hưu trí là vấn đề?",
        options: [
          "Vì người lao động mất việc và mất lương hưu cùng một lúc",
          "Vì cổ phiếu công ty mẹ luôn có thanh khoản thấp hơn thị trường",
          "Vì quy định cấm quỹ hưu trí nắm giữ cổ phiếu của bất kỳ ai",
          "Vì việc này làm tăng chi phí giao dịch của quỹ hưu trí",
        ],
        correct: 0,
        explanation:
          "Đây là rủi ro tập trung ở dạng nguy hiểm nhất: nguồn thu nhập và khoản tiết kiệm hưu trí cùng phụ thuộc vào một doanh nghiệp.",
      },
      {
        question: "Khi quản lý một quỹ đầu tư, ai là khách hàng theo Standard III(A)?",
        options: [
          "Chính quỹ và các nhà đầu tư của nó, theo điều lệ quỹ",
          "Người đã giới thiệu bạn vào vị trí quản lý quỹ đó",
          "Nhà đầu tư nắm tỷ trọng chứng chỉ quỹ lớn nhất",
          "Công ty mẹ sở hữu công ty quản lý quỹ đầu tư",
        ],
        correct: 0,
        explanation:
          "Mục tiêu đầu tư ghi trong điều lệ quỹ là thứ ràng buộc, không phải mong muốn của một nhà đầu tư lớn nào đó.",
      },
    ],
    keyTakeaways: [
      "Bên ký hợp đồng và bên được phục vụ có thể là hai chủ thể khác nhau",
      "Với quỹ hưu trí, nghĩa vụ thuộc về người thụ hưởng",
      "Thận trọng không phải né rủi ro - danh mục quá an toàn cũng có thể thiếu thận trọng",
      "Soft dollar là tiền khách, nên thứ mua bằng nó phải phục vụ chính họ",
      "Quản lý quỹ: khách hàng là quỹ theo điều lệ, không phải người giới thiệu",
    ],
    practicePrompt: {
      question:
        "Công ty môi giới đề nghị trả tiền thuê hệ thống dữ liệu thị trường cho công ty bạn, đổi lại bạn định tuyến thêm lệnh giao dịch của khách qua họ. Đánh giá?",
      options: [
        "Hợp lệ vì hệ thống dữ liệu phục vụ công việc phân tích đầu tư",
        "Phải kiểm tra hai điều: hệ thống đó có phục vụ trực tiếp khách đã trả hoa hồng không, và việc định tuyến có còn đạt thực thi tốt nhất cho khách không",
        "Hợp lệ nếu công ty bạn công bố thỏa thuận này trong báo cáo năm",
        "Vi phạm tuyệt đối vì mọi thỏa thuận soft dollar đều bị cấm",
      ],
      correct: 1,
      explanation:
        "Hai câu hỏi phải cùng trả lời được, và phần lớn người học chỉ nhớ câu đầu. Ngay cả khi hệ thống dữ liệu đúng là nghiên cứu phục vụ khách, việc đẩy lệnh sang một bên môi giới không cho giá thực thi tốt nhất vẫn là lấy tiền khách trả cho lợi ích của mình - chỉ là qua một đường khác.",
    },
  },
  {
    id: 1592,
    slug: "cfa-ethics-standard-3c-tinh-phu-hop",
    title: "CFA Ethics 28: Standard III(C) - Phù hợp với ai, và lệnh khách tự đặt thì sao",
    subtitle: "Xét ở cấp danh mục chứ không từng lệnh, và cách xử lý yêu cầu đi ngược IPS",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎚️",
    whyItMatters:
      "Đây là Standard bị áp dụng sai hướng nhiều nhất: người ta xét tính phù hợp của từng khoản đầu tư riêng lẻ, trong khi câu hỏi đúng là khoản đó ảnh hưởng thế nào tới toàn bộ danh mục.",
    openingQuestion:
      "Một khách hàng hưu trí, khẩu vị rủi ro thấp, yêu cầu bạn mua một cổ phiếu công nghệ biến động mạnh. Bạn nên làm gì?",
    openingOptions: [
      "Từ chối vì cổ phiếu đó không phù hợp với khẩu vị rủi ro của khách",
      "Xét xem khoản đó ảnh hưởng thế nào tới rủi ro của cả danh mục, giải thích lại với khách, và ghi nhận nếu đây là lệnh khách tự quyết",
      "Thực hiện ngay vì khách hàng có quyền quyết định tiền của họ",
      "Yêu cầu khách ký cam kết miễn trừ trách nhiệm rồi thực hiện",
    ],
    correctOption: 1,
    explanation:
      "Standard III(C) xét tính phù hợp ở cấp danh mục. Một cổ phiếu biến động mạnh chiếm 2% danh mục có thể hoàn toàn phù hợp; chiếm 40% thì không - và bản thân cổ phiếu đó không đổi. Với lệnh khách tự đặt đi ngược mục tiêu đã thống nhất, quy trình chuẩn là ba bước: giải thích tác động lên danh mục, ghi nhận rằng lệnh đến từ khách chứ không phải khuyến nghị của bạn, và nếu những lệnh như vậy lặp lại tới mức làm danh mục lệch hẳn khỏi IPS thì phải cập nhật IPS hoặc xem lại quan hệ. Chữ ký miễn trừ trách nhiệm không thay thế được bước nào trong ba bước đó.",
    diagram: [
      { label: "Xét ở cấp danh mục, không xét từng khoản riêng lẻ", arrow: true },
      { label: "Lệnh khách tự đặt: giải thích tác động trước", arrow: true },
      { label: "Ghi nhận rõ đây không phải khuyến nghị của bạn", arrow: true },
      { label: "Nếu lặp lại làm lệch IPS: cập nhật IPS hoặc xem lại quan hệ" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "IPS là công cụ, không phải thủ tục",
      description:
        "Bản tuyên bố chính sách đầu tư ghi mục tiêu, ràng buộc, khẩu vị rủi ro và chuẩn tham chiếu. Giá trị thật của nó không nằm ở lúc ký mà ở lúc thị trường biến động: nó là thứ được viết khi cả hai bên còn bình tĩnh, để tham chiếu vào lúc không ai còn bình tĩnh. Standard III(C) yêu cầu rà soát IPS định kỳ, vì hoàn cảnh khách thay đổi - nghỉ hưu, thừa kế, mất việc - và một IPS viết năm năm trước có thể đang mô tả một người không còn tồn tại.",
    },
    quiz: [
      {
        question: "Tính phù hợp theo Standard III(C) được xét ở cấp nào?",
        options: [
          "Cấp toàn danh mục, không phải từng khoản đầu tư riêng lẻ",
          "Cấp từng lệnh giao dịch trước khi được thực hiện",
          "Cấp nhóm khách hàng có cùng mức khẩu vị rủi ro",
          "Cấp sản phẩm, dựa trên phân loại rủi ro của nhà phát hành",
        ],
        correct: 0,
        explanation:
          "Cùng một cổ phiếu có thể phù hợp ở tỷ trọng 2% và không phù hợp ở 40% - bản thân nó không đổi, tác động lên danh mục thì đổi.",
      },
      {
        question: "Khách tự đặt lệnh đi ngược IPS thì bước đầu tiên là gì?",
        options: [
          "Giải thích tác động lên rủi ro cả danh mục",
          "Từ chối thực hiện vì lệnh không phù hợp với hồ sơ khách",
          "Yêu cầu khách ký cam kết miễn trừ trách nhiệm cho bạn",
          "Thực hiện ngay vì đó là quyền quyết định của khách hàng",
        ],
        correct: 0,
        explanation:
          "Khách có quyền quyết định, nhưng bạn có nghĩa vụ để họ quyết định trong hiểu biết - và đó là thứ chữ ký miễn trừ không thay được.",
      },
      {
        question: "Khi lệnh tự đặt lặp lại làm danh mục lệch hẳn khỏi IPS thì sao?",
        options: [
          "Cập nhật lại IPS cho khớp thực tế, hoặc xem lại quan hệ",
          "Tiếp tục thực hiện vì mỗi lệnh đã được ghi nhận đầy đủ",
          "Tự điều chỉnh các khoản khác để bù lại phần lệch đó",
          "Báo cáo khách hàng lên bộ phận tuân thủ của công ty",
        ],
        correct: 0,
        explanation:
          "Một IPS không còn mô tả danh mục thật thì đã mất tác dụng - giữ nó nguyên chỉ tạo cảm giác an toàn giả.",
      },
      {
        question: "Vì sao IPS cần được rà soát định kỳ?",
        options: [
          "Vì hoàn cảnh khách đổi: nghỉ hưu, thừa kế, mất việc",
          "Vì quy định buộc ký lại IPS mới sau mỗi mười hai tháng",
          "Vì chuẩn tham chiếu của thị trường thay đổi hằng năm",
          "Vì mức phí quản lý được điều chỉnh theo từng giai đoạn",
        ],
        correct: 0,
        explanation:
          "Một IPS viết năm năm trước có thể đang mô tả một người không còn tồn tại - và danh mục vẫn đang chạy theo mô tả đó.",
      },
      {
        question: "Giá trị lớn nhất của IPS nằm ở thời điểm nào?",
        options: [
          "Lúc thị trường biến động, khi không bên nào còn bình tĩnh",
          "Lúc ký kết, để xác lập trách nhiệm pháp lý giữa hai bên",
          "Lúc báo cáo kết quả định kỳ cho khách hàng mỗi quý",
          "Lúc chuyển giao khách hàng sang một nhà quản lý khác",
        ],
        correct: 0,
        explanation:
          "IPS là văn bản viết lúc bình tĩnh để tuân theo lúc hoảng loạn - đó là toàn bộ lý do nó tồn tại.",
      },
    ],
    keyTakeaways: [
      "Tính phù hợp xét ở cấp danh mục, không xét từng khoản riêng lẻ",
      "Lệnh khách tự đặt: giải thích tác động, ghi nhận nguồn gốc lệnh",
      "Chữ ký miễn trừ không thay thế được nghĩa vụ giải thích",
      "Lệch IPS kéo dài thì phải cập nhật IPS hoặc xem lại quan hệ",
      "IPS được viết lúc bình tĩnh để dùng lúc hoảng loạn",
    ],
    practicePrompt: {
      question:
        "Khách hàng 62 tuổi, IPS ghi mục tiêu bảo toàn vốn, yêu cầu dồn 30% danh mục vào một cổ phiếu đang tăng nóng. Xử lý thế nào?",
      options: [
        "Từ chối thẳng vì đi ngược mục tiêu bảo toàn vốn đã ghi",
        "Giải thích tác động lên rủi ro danh mục và khả năng đạt mục tiêu, ghi nhận đây là lệnh khách tự quyết, và nếu khách vẫn giữ ý định thì rà lại IPS xem mục tiêu đã đổi chưa",
        "Thực hiện vì khách hàng có toàn quyền với tiền của họ",
        "Thực hiện 30% nhưng tự giảm rủi ro các phần còn lại để bù",
      ],
      correct: 1,
      explanation:
        "Từ chối thẳng bỏ qua quyền tự quyết của khách; thực hiện ngay bỏ qua nghĩa vụ giải thích. Phương án bù rủi ro ở phần còn lại là tệ nhất vì nó âm thầm đổi cả danh mục mà khách không biết. Điểm mấu chốt ở cuối: nếu khách thật sự muốn mức rủi ro này thì có thể mục tiêu của họ đã đổi, và thứ cần cập nhật là IPS chứ không phải lách quanh nó.",
    },
  },
  {
    id: 1593,
    slug: "cfa-ethics-standard-3e-bao-mat-thong-tin",
    title: "CFA Ethics 29: Standard III(E) - Bảo mật thông tin khách và ba ngoại lệ",
    subtitle: "Nghĩa vụ kéo dài sau khi quan hệ chấm dứt, và khi nào được phép tiết lộ",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🔐",
    whyItMatters:
      "Đây là Standard ngắn nhưng có ba ngoại lệ mà nhớ nhầm sẽ dẫn tới hai loại sai ngược nhau: hoặc tiết lộ thứ không được phép, hoặc im lặng trong đúng tình huống nghĩa vụ đòi hỏi phải nói.",
    openingQuestion:
      "Một khách hàng cũ đã chấm dứt quan hệ hai năm trước. Bạn còn nghĩa vụ bảo mật thông tin của họ không?",
    openingOptions: [
      "Không, nghĩa vụ chấm dứt cùng lúc với hợp đồng dịch vụ",
      "Có, nghĩa vụ bảo mật kéo dài kể cả sau khi quan hệ đã chấm dứt",
      "Chỉ còn nghĩa vụ nếu hợp đồng có điều khoản bảo mật riêng",
      "Chỉ trong vòng một năm kể từ ngày chấm dứt quan hệ",
    ],
    correctOption: 1,
    explanation:
      "Nghĩa vụ bảo mật không có thời hạn và không phụ thuộc vào việc hợp đồng còn hiệu lực hay không. Lý do rất thực tế: thông tin tài chính riêng tư của một người không mất tính nhạy cảm chỉ vì họ đổi nhà tư vấn. Standard III(E) có đúng ba ngoại lệ. Thứ nhất, khi luật pháp yêu cầu tiết lộ. Thứ hai, khi thông tin liên quan tới hoạt động bất hợp pháp của chính khách hàng. Thứ ba, khi khách hàng cho phép. Ngoài ba trường hợp đó, mọi lý do khác - kể cả để đồng nghiệp phân tích tốt hơn, hay để cảnh báo một khách khác - đều không đủ.",
    diagram: [
      { label: "Mặc định: bảo mật, không thời hạn", arrow: true },
      { label: "Ngoại lệ 1: luật pháp yêu cầu", arrow: true },
      { label: "Ngoại lệ 2: khách hàng có hoạt động bất hợp pháp", arrow: true },
      { label: "Ngoại lệ 3: khách hàng cho phép" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ngoại lệ thứ hai chạy theo chiều nào",
      description:
        "Ngoại lệ về hoạt động bất hợp pháp chỉ áp dụng cho hành vi của chính khách hàng, không phải cho hành vi của người khác mà khách hàng tình cờ biết. Và nó cho phép tiết lộ với cơ quan có thẩm quyền chứ không cho phép chia sẻ rộng rãi. Đây là chỗ dễ đi quá: phát hiện dấu hiệu rửa tiền trong tài khoản khách thì báo cáo là đúng nghĩa vụ; kể lại cho một khách hàng khác để họ cảnh giác thì đã vượt khỏi ngoại lệ.",
    },
    quiz: [
      {
        question: "Nghĩa vụ bảo mật kéo dài tới khi nào?",
        options: [
          "Không có thời hạn, kể cả sau khi quan hệ đã chấm dứt",
          "Tới khi hợp đồng dịch vụ chính thức hết hiệu lực",
          "Trong vòng năm năm kể từ giao dịch cuối cùng",
          "Tới khi khách hàng chuyển sang nhà cung cấp dịch vụ khác",
        ],
        correct: 0,
        explanation:
          "Thông tin tài chính riêng tư không mất tính nhạy cảm chỉ vì người đó đổi nhà tư vấn.",
      },
      {
        question: "Trường hợp nào KHÔNG thuộc ba ngoại lệ của Standard III(E)?",
        options: [
          "Chia sẻ với đồng nghiệp để họ phân tích tốt hơn",
          "Tiết lộ khi cơ quan có thẩm quyền yêu cầu theo quy định",
          "Báo cáo khi phát hiện hoạt động bất hợp pháp của khách",
          "Cung cấp khi chính khách hàng đã đồng ý cho phép",
        ],
        correct: 0,
        explanation:
          "Mục đích tốt không tạo ra ngoại lệ. Đây là lý do danh sách ba ngoại lệ được liệt kê cụ thể thay vì mô tả bằng nguyên tắc chung.",
      },
      {
        question: "Ngoại lệ về hoạt động bất hợp pháp áp dụng cho hành vi của ai?",
        options: [
          "Của chính khách hàng, không phải của người khác mà khách biết",
          "Của bất kỳ ai mà khách hàng có quan hệ làm ăn thường xuyên",
          "Của nhân viên trong công ty quản lý tài sản của khách",
          "Của cơ quan quản lý khi họ vượt quá thẩm quyền được giao",
        ],
        correct: 0,
        explanation:
          "Phạm vi hẹp có chủ ý: mở rộng ra hành vi của bên thứ ba sẽ biến ngoại lệ này thành một lối thoát cho mọi trường hợp.",
      },
      {
        question: "Khi ngoại lệ áp dụng, được tiết lộ cho ai?",
        options: [
          "Cho cơ quan có thẩm quyền, không phải chia sẻ rộng rãi",
          "Cho mọi bên có lợi ích liên quan tới giao dịch đó",
          "Cho các khách hàng khác để họ chủ động phòng ngừa",
          "Cho bất kỳ ai, vì ngoại lệ đã gỡ bỏ nghĩa vụ bảo mật",
        ],
        correct: 0,
        explanation:
          "Ngoại lệ mở một cánh cửa hẹp cho một mục đích cụ thể, không gỡ bỏ toàn bộ nghĩa vụ.",
      },
      {
        question: "Vì sao Standard III(E) tồn tại dù chia sẻ thông tin có thể cải thiện phân tích?",
        options: [
          "Vì khách chia sẻ thông tin riêng tư dựa trên niềm tin",
          "Vì thông tin khách hàng luôn có giá trị thương mại bán được",
          "Vì luật bảo vệ dữ liệu cá nhân cấm mọi hình thức chia sẻ",
          "Vì phân tích dựa trên dữ liệu khách hàng luôn thiếu khách quan",
        ],
        correct: 0,
        explanation:
          "Nền tảng của toàn bộ quan hệ tư vấn là khách sẵn sàng nói thật - và họ chỉ nói thật khi tin rằng điều đó không đi đâu khác.",
      },
    ],
    keyTakeaways: [
      "Nghĩa vụ bảo mật không có thời hạn, kéo dài sau khi quan hệ chấm dứt",
      "Đúng ba ngoại lệ: luật yêu cầu, khách có hành vi bất hợp pháp, khách cho phép",
      "Mục đích tốt không tạo ra ngoại lệ thứ tư",
      "Ngoại lệ bất hợp pháp chỉ áp dụng cho hành vi của chính khách hàng",
      "Ngoại lệ cho phép báo cơ quan có thẩm quyền, không cho chia sẻ rộng",
    ],
    practicePrompt: {
      question:
        "Trong hồ sơ một khách hàng, bạn thấy dấu hiệu họ đang nhận tiền từ nguồn không giải thích được. Xử lý thế nào?",
      options: [
        "Giữ bảo mật tuyệt đối vì đó là thông tin khách hàng",
        "Báo cáo nội bộ theo quy trình chống rửa tiền và để bộ phận tuân thủ xử lý tiếp với cơ quan có thẩm quyền",
        "Hỏi thẳng khách rồi quyết định dựa trên câu trả lời của họ",
        "Chấm dứt quan hệ mà không nêu lý do với bất kỳ ai",
      ],
      correct: 1,
      explanation:
        "Đây đúng là trường hợp ngoại lệ thứ hai áp dụng, nên im lặng tuyệt đối là sai. Nhưng phạm vi vẫn hẹp: đi qua quy trình nội bộ và cơ quan có thẩm quyền, không tự điều tra và không nói với ai khác. Chấm dứt quan hệ mà không báo cáo là bỏ lại vấn đề cho tổ chức tiếp theo.",
    },
  },
  {
    id: 1594,
    slug: "cfa-ethics-standard-4a-trung-thanh-nha-tuyen-dung",
    title: "CFA Ethics 30: Standard IV(A) - Nghỉ việc thế nào cho đúng",
    subtitle: "Trước khi nghỉ, sau khi nghỉ, và ranh giới của việc mời khách hàng đi theo",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🚪",
    whyItMatters:
      "Chuyển việc là chuyện ai cũng làm, và đây là Standard duy nhất mà một quyết định nghề nghiệp bình thường có thể biến thành vi phạm chỉ vì thứ tự thời gian - làm sau khi nghỉ thì được, làm trước khi nghỉ thì không.",
    openingQuestion:
      "Bạn sắp nghỉ việc để mở công ty riêng. Trong tháng cuối còn làm, bạn được làm gì?",
    openingOptions: [
      "Chuẩn bị mọi thứ kể cả liên hệ trước với khách hàng hiện tại",
      "Chuẩn bị hành chính như thuê văn phòng, đăng ký doanh nghiệp - nhưng không dùng thời gian và nguồn lực công ty để cạnh tranh với chính họ",
      "Không được chuẩn bị gì cho tới ngày chính thức nghỉ",
      "Tùy chọn, miễn là năng suất công việc hiện tại không giảm",
    ],
    correctOption: 1,
    explanation:
      "Standard IV(A) không cấm bạn chuẩn bị nghỉ việc - điều đó sẽ vô lý. Nó cấm dùng nguồn lực của nhà tuyển dụng hiện tại để cạnh tranh với chính họ trong khi vẫn đang nhận lương của họ. Ranh giới rơi vào hành vi cụ thể: thuê văn phòng và đăng ký doanh nghiệp thì được, vì đó là chuẩn bị hành chính. Liên hệ khách hàng để mời họ chuyển theo, sao chép danh sách khách hàng, hay mang mô hình định giá của công ty đi thì không, vì cả ba đều lấy tài sản của nhà tuyển dụng dùng cho mục đích chống lại họ. Sau khi đã nghỉ, liên hệ khách hàng bằng thông tin công khai là hợp lệ - trừ khi có thỏa thuận không cạnh tranh ràng buộc riêng.",
    diagram: [
      { label: "Trước khi nghỉ: chuẩn bị hành chính được", arrow: true },
      { label: "Trước khi nghỉ: mời khách, sao chép dữ liệu thì không", arrow: true },
      { label: "Sau khi nghỉ: liên hệ bằng thông tin công khai được", arrow: true },
      { label: "Trừ khi có thỏa thuận không cạnh tranh riêng" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Kiến thức trong đầu và tài liệu trong máy",
      description:
        "Ranh giới thực tế mà tòa án và cơ quan kỷ luật hay dùng: kỹ năng và kiến thức chuyên môn bạn tích lũy được thuộc về bạn và đi theo bạn. Tài liệu, mô hình, danh sách khách hàng và dữ liệu do công ty tạo ra thì thuộc về công ty, kể cả khi chính tay bạn xây chúng trong giờ làm. Đây là lý do một nhà phân tích có thể dựng lại mô hình định giá tương tự ở công ty mới - dùng kiến thức của mình - nhưng không được mang file cũ theo.",
    },
    quiz: [
      {
        question: "Standard IV(A) cấm điều gì trong thời gian còn làm việc?",
        options: [
          "Dùng nguồn lực công ty để cạnh tranh với chính công ty đó",
          "Mọi hình thức chuẩn bị cho công việc tiếp theo của bạn",
          "Trao đổi với nhà tuyển dụng khác về cơ hội việc làm mới",
          "Tham gia các hoạt động nghề nghiệp ngoài giờ làm việc",
        ],
        correct: 0,
        explanation:
          "Cấm chuẩn bị nghỉ việc sẽ vô lý. Thứ bị cấm là lấy tài sản của bên đang trả lương để dùng chống lại họ.",
      },
      {
        question: "Hành vi nào được phép trước khi chính thức nghỉ việc?",
        options: [
          "Thuê văn phòng và đăng ký thành lập doanh nghiệp mới",
          "Liên hệ trước khách hàng để mời họ chuyển theo bạn",
          "Sao chép danh sách khách hàng để dùng ở nơi làm mới",
          "Mang bản sao mô hình định giá do bạn tự tay xây dựng",
        ],
        correct: 0,
        explanation:
          "Chuẩn bị hành chính không đụng tới tài sản hay khách hàng của nhà tuyển dụng, nên nó nằm ngoài phạm vi cấm.",
      },
      {
        question: "Sau khi đã nghỉ việc, liên hệ khách hàng cũ có được không?",
        options: [
          "Được, nếu dùng thông tin công khai và không có thỏa thuận cấm",
          "Không bao giờ được, vì khách hàng thuộc về công ty cũ",
          "Chỉ được sau khi công ty cũ đồng ý bằng văn bản",
          "Chỉ được với khách hàng đã chủ động liên hệ bạn trước",
        ],
        correct: 0,
        explanation:
          "Nghĩa vụ trung thành chấm dứt khi quan hệ lao động chấm dứt; thứ còn lại là các thỏa thuận riêng nếu có.",
      },
      {
        question: "Mô hình định giá bạn tự xây trong giờ làm thuộc về ai?",
        options: [
          "Công ty, dù chính tay bạn xây dựng nó",
          "Bạn, vì đó là sản phẩm trí tuệ của cá nhân bạn",
          "Cả hai bên đồng sở hữu theo tỷ lệ đóng góp",
          "Khách hàng đã trả phí cho các phân tích dùng mô hình đó",
        ],
        correct: 0,
        explanation:
          "Kiến thức để dựng lại mô hình thì thuộc về bạn; file cụ thể thì không. Đây là ranh giới thực tế được dùng phổ biến nhất.",
      },
      {
        question: "Làm thêm công việc thứ hai trong khi vẫn đang làm toàn thời gian thì sao?",
        options: [
          "Phải báo và được nhà tuyển dụng đồng ý trước khi nhận",
          "Được tự do làm miễn là ngoài giờ hành chính của công ty",
          "Bị cấm hoàn toàn theo Standard IV(A) hiện hành",
          "Chỉ cần báo nếu công việc đó thuộc cùng lĩnh vực tài chính",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ Standard IV(A) gặp IV(B): nhà tuyển dụng là bên đánh giá xung đột, nên họ phải được biết để đánh giá.",
      },
    ],
    keyTakeaways: [
      "Không cấm chuẩn bị nghỉ việc - cấm dùng nguồn lực công ty để cạnh tranh với họ",
      "Trước khi nghỉ: thuê văn phòng được, mời khách và sao chép dữ liệu thì không",
      "Sau khi nghỉ: liên hệ bằng thông tin công khai được, trừ khi có cam kết riêng",
      "Kiến thức trong đầu đi theo bạn; tài liệu trong máy thuộc về công ty",
      "Làm thêm công việc thứ hai phải được nhà tuyển dụng đồng ý trước",
    ],
    practicePrompt: {
      question:
        "Ngày cuối làm việc, bạn gửi email cho danh sách khách hàng thông báo mình chuyển sang công ty mới kèm thông tin liên hệ. Đánh giá?",
      options: [
        "Hợp lệ vì đây là ngày làm việc cuối cùng của bạn",
        "Vi phạm: bạn vẫn đang trong quan hệ lao động, và danh sách khách hàng là tài sản của công ty chứ không phải của bạn",
        "Hợp lệ nếu email chỉ thông báo mà không mời chào dịch vụ",
        "Chỉ vi phạm nếu có khách hàng thực sự chuyển theo bạn",
      ],
      correct: 1,
      explanation:
        "Hai vấn đề riêng biệt cùng lúc, và cả hai đều đủ. Ngày cuối vẫn là ngày trong quan hệ lao động. Và việc dùng danh sách khách hàng - tài sản công ty - để phục vụ mục đích của mình là vi phạm bất kể nội dung email viết gì. Phương án cuối sai vì lý do quen thuộc: nếu chỉ tính khi có hậu quả thì mọi hành vi không thành công đều vô can.",
    },
  },
  {
    id: 1595,
    slug: "cfa-ethics-standard-4c-trach-nhiem-giam-sat",
    title: "CFA Ethics 31: Standard IV(C) - 'Tôi không biết' không phải lý do miễn trừ",
    subtitle: "Các bước hợp lý mà người giám sát phải làm, và trách nhiệm khi hệ thống kiểm soát không tồn tại",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    whyItMatters:
      "Đây là Standard duy nhất buộc bạn chịu trách nhiệm cho hành vi của người khác, và nó áp dụng ngay khi bạn có một người cấp dưới đầu tiên - sớm hơn nhiều so với lúc phần lớn người ta nghĩ tới nó.",
    openingQuestion:
      "Một nhân viên dưới quyền bạn vi phạm quy định giao dịch. Bạn hoàn toàn không biết. Bạn có chịu trách nhiệm không?",
    openingOptions: [
      "Không, vì bạn không tham gia và không biết về hành vi đó",
      "Có thể có, nếu bạn đã không thiết lập hoặc không vận hành hệ thống kiểm soát hợp lý để phát hiện được",
      "Có, trong mọi trường hợp vì bạn là người giám sát",
      "Chỉ chịu trách nhiệm nếu bạn được hưởng lợi từ vi phạm đó",
    ],
    correctOption: 1,
    explanation:
      "Standard IV(C) không đòi hỏi người giám sát phải phát hiện mọi vi phạm - điều đó bất khả thi. Nó đòi hỏi các bước hợp lý: có quy trình kiểm soát bằng văn bản, phổ biến cho nhân viên, có cơ chế giám sát định kỳ, và xử lý khi phát hiện dấu hiệu. Nếu bốn thứ đó tồn tại và vận hành mà vi phạm vẫn lọt qua, người giám sát thường không bị quy trách nhiệm. Nếu chúng không tồn tại, câu 'tôi không biết' trở thành bằng chứng buộc tội chứ không phải lời bào chữa - vì chính việc không biết là hệ quả của việc không thiết lập cơ chế để biết.",
    diagram: [
      { label: "Có quy trình kiểm soát bằng văn bản", arrow: true },
      { label: "Phổ biến và đào tạo cho nhân viên", arrow: true },
      { label: "Giám sát định kỳ, không chỉ khi có sự cố", arrow: true },
      { label: "Xử lý ngay khi có dấu hiệu - và rà lại chính hệ thống" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Khi hệ thống kiểm soát không đủ mà bạn vẫn nhận vai trò giám sát",
      description:
        "Nếu công ty không có cơ chế kiểm soát đủ để bạn thực hiện được nghĩa vụ giám sát, Standard IV(C) yêu cầu bạn nêu vấn đề và đề nghị thiết lập. Nếu đề nghị bị từ chối, bạn phải cân nhắc từ chối nhận vai trò giám sát đó - vì nhận một vai trò mà bạn biết mình không thực hiện được là tự đặt mình vào thế vi phạm ngay từ đầu. Đây là một trong số ít chỗ chuẩn mực nói thẳng rằng từ chối nhiệm vụ là câu trả lời đúng.",
    },
    quiz: [
      {
        question: "Standard IV(C) yêu cầu người giám sát làm gì?",
        options: [
          "Thực hiện các bước hợp lý để phát hiện và ngăn ngừa vi phạm",
          "Phát hiện được mọi vi phạm xảy ra trong bộ phận mình quản lý",
          "Ký duyệt từng giao dịch của nhân viên trước khi thực hiện",
          "Báo cáo mọi hoạt động của cấp dưới lên bộ phận tuân thủ",
        ],
        correct: 0,
        explanation:
          "Chuẩn là các bước hợp lý, không phải kết quả tuyệt đối - nhưng nếu các bước đó không tồn tại thì không có gì để viện dẫn.",
      },
      {
        question: "Khi nào 'tôi không biết' trở thành bằng chứng buộc tội?",
        options: [
          "Khi việc không biết là hệ quả của việc không có cơ chế để biết",
          "Khi vi phạm gây thiệt hại tài chính cho khách hàng của công ty",
          "Khi người giám sát có quan hệ cá nhân với nhân viên vi phạm",
          "Khi vi phạm kéo dài quá sáu tháng trước khi bị phát hiện",
        ],
        correct: 0,
        explanation:
          "Đây là điểm cốt lõi: sự thiếu hiểu biết được tạo ra bởi chính việc không thiết lập giám sát thì không bảo vệ được ai.",
      },
      {
        question: "Nếu công ty không có hệ thống kiểm soát đủ thì người giám sát nên làm gì?",
        options: [
          "Nêu vấn đề, đề nghị thiết lập, và cân nhắc từ chối vai trò nếu bị từ chối",
          "Tự xây dựng hệ thống kiểm soát riêng bằng nguồn lực cá nhân",
          "Nhận vai trò và ghi nhận lại việc mình đã nêu vấn đề",
          "Báo cáo trực tiếp lên cơ quan quản lý bên ngoài công ty",
        ],
        correct: 0,
        explanation:
          "Nhận một vai trò mình biết là không thực hiện được chính là tự đặt mình vào thế vi phạm ngay từ ngày đầu.",
      },
      {
        question: "Standard IV(C) bắt đầu áp dụng từ khi nào?",
        options: [
          "Ngay khi bạn có người cấp dưới đầu tiên",
          "Khi bạn đạt tới cấp quản lý bộ phận trở lên",
          "Khi bạn được bổ nhiệm chính thức làm giám đốc tuân thủ",
          "Khi số nhân viên dưới quyền vượt một ngưỡng nhất định",
        ],
        correct: 0,
        explanation:
          "Sớm hơn phần lớn người ta nghĩ - và đó là lý do nhiều vi phạm dạng này đến từ người chưa từng coi mình là người giám sát.",
      },
      {
        question: "Phát hiện dấu hiệu vi phạm thì bước nào hay bị bỏ sót nhất?",
        options: [
          "Rà lại chính hệ thống kiểm soát đã để lọt vi phạm đó",
          "Xử lý kỷ luật đối với nhân viên đã thực hiện hành vi",
          "Báo cáo sự việc lên bộ phận tuân thủ của công ty",
          "Thông báo cho khách hàng bị ảnh hưởng bởi vi phạm",
        ],
        correct: 0,
        explanation:
          "Xử lý người vi phạm là phản xạ tự nhiên; hỏi vì sao hệ thống không bắt được thì không - nên vi phạm tiếp theo cùng dạng vẫn lọt.",
      },
    ],
    keyTakeaways: [
      "Chuẩn là các bước hợp lý, không phải phát hiện được mọi vi phạm",
      "Bốn bước: quy trình văn bản, phổ biến, giám sát định kỳ, xử lý khi có dấu hiệu",
      "Không biết vì không có cơ chế để biết thì đó là bằng chứng buộc tội",
      "Hệ thống không đủ: nêu vấn đề, và cân nhắc từ chối vai trò nếu bị từ chối",
      "Sau mỗi vi phạm phải rà lại hệ thống, không chỉ xử lý người vi phạm",
    ],
    practicePrompt: {
      question:
        "Bạn quản lý ba nhân viên. Công ty có quy chế giao dịch cá nhân nhưng chưa bao giờ ai kiểm tra việc tuân thủ. Bạn nên làm gì?",
      options: [
        "Không cần làm gì vì quy chế đã tồn tại bằng văn bản",
        "Thiết lập việc kiểm tra định kỳ - một quy chế không được giám sát thì chưa phải hệ thống kiểm soát",
        "Chờ tới khi có dấu hiệu vi phạm rồi mới kiểm tra",
        "Báo cáo lên cấp trên và coi như đã hoàn thành nghĩa vụ",
      ],
      correct: 1,
      explanation:
        "Có văn bản là điều kiện cần, không phải điều kiện đủ - và phương án đầu chính là hiểu nhầm phổ biến nhất về Standard này. Chờ có dấu hiệu là kiểm soát phát hiện chứ không phải kiểm soát phòng ngừa, mà nghĩa vụ ở đây là ngăn ngừa. Báo cáo lên trên không chuyển được trách nhiệm giám sát ba người đang dưới quyền bạn.",
    },
  },
  {
    id: 1596,
    slug: "cfa-ethics-standard-5c-luu-tru-ho-so",
    title: "CFA Ethics 32: Standard V(C) - Hồ sơ là thứ duy nhất còn lại khi bị hỏi lại",
    subtitle: "Lưu gì, lưu bao lâu, và vì sao hồ sơ thuộc về công ty chứ không theo bạn",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🗄️",
    whyItMatters:
      "Standard này trông như thủ tục hành chính cho tới lần đầu bạn phải giải thích một khuyến nghị đưa ra ba năm trước. Không có hồ sơ thì lập luận đúng và lời chối nghe giống hệt nhau.",
    openingQuestion:
      "Vì sao Standard V(C) yêu cầu lưu trữ hồ sơ phân tích, ngoài lý do tuân thủ quy định?",
    openingOptions: [
      "Để đồng nghiệp có thể tái sử dụng lại kết quả nghiên cứu",
      "Vì đó là bằng chứng duy nhất chứng minh khuyến nghị từng có cơ sở hợp lý theo Standard V(A)",
      "Để công ty tính được chi phí nghiên cứu phân bổ cho từng khách",
      "Vì cơ quan quản lý yêu cầu nộp hồ sơ định kỳ mỗi quý",
    ],
    correctOption: 1,
    explanation:
      "Standard V(A) yêu cầu mọi khuyến nghị phải có cơ sở hợp lý. Standard V(C) là thứ làm cho yêu cầu đó kiểm chứng được sau này. Khi một khoản đầu tư diễn biến xấu và khách hàng hoặc cơ quan quản lý hỏi lại, câu hỏi không phải 'bạn có đúng không' mà 'lúc đó bạn dựa vào đâu'. Hồ sơ - dữ liệu đã dùng, giả định đã đặt, các phương án đã cân nhắc và loại bỏ - là thứ trả lời được câu đó. Không có nó, một quy trình phân tích nghiêm túc và một quyết định tùy hứng để lại dấu vết giống hệt nhau: không dấu vết nào.",
    diagram: [
      { label: "V(A) đòi khuyến nghị phải có cơ sở hợp lý", arrow: true },
      { label: "V(C) làm cho yêu cầu đó kiểm chứng được sau này", arrow: true },
      { label: "Lưu: dữ liệu, giả định, phương án đã loại bỏ", arrow: true },
      { label: "Hồ sơ thuộc về công ty, không đi theo bạn khi nghỉ" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Thời hạn lưu trữ và bên sở hữu",
      description:
        "CFA Institute khuyến nghị lưu tối thiểu bảy năm khi luật địa phương không quy định mức dài hơn - và quy tắc chọn bên nghiêm ngặt hơn của Standard I(A) áp dụng ở đây. Điểm thứ hai quan trọng không kém: hồ sơ thuộc về nhà tuyển dụng. Chuyển việc thì không mang theo được, và đó là lý do nhà phân tích ở nơi làm mới phải dựng lại cơ sở phân tích cho các khuyến nghị của mình thay vì viện dẫn nghiên cứu cũ mà giờ họ không còn giữ.",
    },
    quiz: [
      {
        question: "Standard V(C) hỗ trợ trực tiếp cho Standard nào?",
        options: [
          "V(A) - Diligence and Reasonable Basis",
          "III(E) - Preservation of Confidentiality",
          "IV(A) - Loyalty to Employer",
          "VI(A) - Disclosure of Conflicts",
        ],
        correct: 0,
        explanation:
          "Một yêu cầu về cơ sở hợp lý mà không kiểm chứng được sau này thì chỉ là một tuyên bố. V(C) biến nó thành thứ chứng minh được.",
      },
      {
        question: "Nội dung nào cần được lưu trữ theo Standard V(C)?",
        options: [
          "Dữ liệu, giả định và các phương án đã cân nhắc rồi loại bỏ",
          "Chỉ bản báo cáo cuối cùng đã gửi cho khách hàng",
          "Chỉ các email trao đổi liên quan tới khuyến nghị đó",
          "Chỉ kết quả đầu tư thực tế sau khi khuyến nghị được thực hiện",
        ],
        correct: 0,
        explanation:
          "Phương án đã loại bỏ thường là phần giá trị nhất: nó cho thấy quyết định là kết quả của cân nhắc chứ không phải lựa chọn duy nhất nghĩ ra.",
      },
      {
        question: "Thời hạn lưu trữ tối thiểu được khuyến nghị là bao lâu?",
        options: [
          "Bảy năm, hoặc dài hơn nếu luật địa phương quy định vậy",
          "Ba năm kể từ ngày khuyến nghị được phát hành ra ngoài",
          "Tới khi khách hàng chấm dứt quan hệ với công ty",
          "Không có thời hạn cụ thể, tùy chính sách từng công ty",
        ],
        correct: 0,
        explanation:
          "Quy tắc chọn bên nghiêm ngặt hơn của Standard I(A) áp dụng ở đây, nên luật địa phương dài hơn thì theo luật.",
      },
      {
        question: "Hồ sơ nghiên cứu thuộc về ai?",
        options: [
          "Nhà tuyển dụng, nên không mang theo được khi chuyển việc",
          "Nhà phân tích đã tạo ra chúng bằng công sức của mình",
          "Khách hàng đã trả phí cho phân tích liên quan tới hồ sơ",
          "Cả nhà phân tích và công ty cùng sở hữu chung hồ sơ",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ V(C) gặp IV(A): quyền sở hữu tài liệu thuộc về công ty, kể cả tài liệu do chính bạn tạo ra trong giờ làm.",
      },
      {
        question: "Vì sao thiếu hồ sơ làm quy trình nghiêm túc và quyết định tùy hứng trông giống nhau?",
        options: [
          "Vì cả hai đều không để lại dấu vết nào để đối chiếu",
          "Vì kết quả đầu tư của hai cách làm thường tương tự nhau",
          "Vì cơ quan quản lý không phân biệt hai trường hợp này",
          "Vì khách hàng chỉ quan tâm tới kết quả cuối cùng",
        ],
        correct: 0,
        explanation:
          "Chính vì thế mà hồ sơ không phải thủ tục: nó là thứ duy nhất phân biệt được hai thứ vốn khác nhau hoàn toàn.",
      },
    ],
    keyTakeaways: [
      "V(C) là thứ làm cho yêu cầu về cơ sở hợp lý của V(A) kiểm chứng được",
      "Lưu cả phương án đã cân nhắc và loại bỏ, không chỉ báo cáo cuối",
      "Tối thiểu bảy năm, hoặc dài hơn nếu luật địa phương yêu cầu",
      "Hồ sơ thuộc về nhà tuyển dụng, không đi theo bạn khi chuyển việc",
      "Không có hồ sơ thì phân tích nghiêm túc và lời chối nghe giống hệt nhau",
    ],
    practicePrompt: {
      question:
        "Bạn chuyển sang công ty mới và muốn tiếp tục khuyến nghị một cổ phiếu đã theo dõi ở công ty cũ. Cần làm gì?",
      options: [
        "Viện dẫn nghiên cứu đã làm ở công ty cũ làm cơ sở",
        "Dựng lại cơ sở phân tích bằng dữ liệu và nguồn tiếp cận được ở nơi mới - hồ sơ cũ không còn thuộc về bạn",
        "Yêu cầu công ty cũ cung cấp bản sao hồ sơ nghiên cứu",
        "Đưa khuyến nghị và ghi chú rằng cơ sở nằm ở công ty trước",
      ],
      correct: 1,
      explanation:
        "Hai Standard cùng dẫn tới một kết luận. IV(A) nói hồ sơ thuộc về công ty cũ nên bạn không mang theo được. V(A) nói khuyến nghị phải có cơ sở hợp lý mà bạn chứng minh được - và một cơ sở nằm trong tủ hồ sơ bạn không còn quyền truy cập thì không đáp ứng được yêu cầu đó.",
    },
  },
  {
    id: 1597,
    slug: "cfa-ethics-standard-6a-cong-bo-xung-dot",
    title: "CFA Ethics 33: Standard VI(A) - Công bố cái gì, cho ai, và ở đâu",
    subtitle: "Chuẩn 'có thể hợp lý được kỳ vọng làm ảnh hưởng', và vì sao chân trang không tính là công bố",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📢",
    whyItMatters:
      "Standard VI(A) là nền của cả nhóm VI, và nó dùng một chuẩn rộng hơn phần lớn người học nghĩ: không phải xung đột nào đã ảnh hưởng thật, mà xung đột nào có thể hợp lý được kỳ vọng là sẽ ảnh hưởng.",
    openingQuestion:
      "Bạn nắm 200 cổ phiếu của một doanh nghiệp mà bạn sắp viết báo cáo phân tích. Số tiền rất nhỏ so với thu nhập của bạn. Có phải công bố không?",
    openingOptions: [
      "Không, vì giá trị quá nhỏ nên không thể ảnh hưởng tới phán đoán",
      "Có, vì chuẩn là xung đột có thể hợp lý được kỳ vọng làm ảnh hưởng - và người đọc là bên đánh giá điều đó, không phải bạn",
      "Chỉ cần công bố nếu giá trị vượt một tỷ lệ nhất định của tài sản",
      "Chỉ cần công bố nếu bạn có ý định bán trong thời gian tới",
    ],
    correctOption: 1,
    explanation:
      "Điểm mấu chốt là ai được quyền quyết định xung đột nào đáng kể. Standard VI(A) chuyển quyền đó sang người đọc: nghĩa vụ của bạn là cung cấp thông tin để họ tự đánh giá, không phải tự đánh giá thay họ rồi giữ im lặng. Lý do rất thực tế - người trong cuộc là bên đánh giá kém nhất về việc lợi ích của chính mình có làm lệch phán đoán hay không. Công bố cũng phải nổi bật và dễ hiểu: một dòng chữ nhỏ ở chân trang, hoặc một đoạn viết bằng ngôn ngữ pháp lý mà người đọc thường không hiểu, không đạt chuẩn 'công bố đầy đủ và có ý nghĩa'.",
    diagram: [
      { label: "Chuẩn: có thể hợp lý được kỳ vọng làm ảnh hưởng", arrow: true },
      { label: "Người đọc đánh giá mức đáng kể, không phải bạn", arrow: true },
      { label: "Công bố phải nổi bật và dễ hiểu", arrow: true },
      { label: "Chân trang bằng ngôn ngữ pháp lý không đạt chuẩn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Công bố cho nhà tuyển dụng và cho khách hàng là hai nghĩa vụ khác nhau",
      description:
        "Standard VI(A) yêu cầu công bố cho cả hai bên, và nội dung không giống nhau. Với nhà tuyển dụng: mọi thứ có thể ảnh hưởng tới tính độc lập và khách quan của bạn, để họ quản lý xung đột ở cấp tổ chức. Với khách hàng và khách hàng tiềm năng: mọi thứ có thể ảnh hưởng tới tính khách quan của khuyến nghị họ đang nhận. Một xung đột đã báo với công ty nhưng chưa nói với khách vẫn là chưa hoàn thành nghĩa vụ.",
    },
    quiz: [
      {
        question: "Chuẩn xác định xung đột phải công bố là gì?",
        options: [
          "Xung đột có thể hợp lý được kỳ vọng làm ảnh hưởng phán đoán",
          "Xung đột đã thực sự làm thay đổi kết luận của báo cáo",
          "Xung đột có giá trị tài chính vượt ngưỡng công ty quy định",
          "Xung đột mà cơ quan quản lý yêu cầu phải kê khai định kỳ",
        ],
        correct: 0,
        explanation:
          "Chuẩn này rộng có chủ ý: chờ tới khi chứng minh được phán đoán đã lệch thì gần như không bao giờ chứng minh được.",
      },
      {
        question: "Ai là bên đánh giá mức độ đáng kể của một xung đột?",
        options: [
          "Người đọc báo cáo, dựa trên thông tin bạn cung cấp",
          "Chính người phân tích, vì họ hiểu rõ tình huống nhất",
          "Bộ phận tuân thủ của công ty theo quy trình nội bộ",
          "Cơ quan quản lý khi tiến hành thanh tra định kỳ",
        ],
        correct: 0,
        explanation:
          "Người trong cuộc là bên đánh giá kém nhất về việc lợi ích của chính mình có làm lệch phán đoán hay không.",
      },
      {
        question: "Công bố ở chân trang bằng ngôn ngữ pháp lý có đạt chuẩn không?",
        options: [
          "Không, công bố phải nổi bật và dễ hiểu với người đọc",
          "Có, miễn là nội dung công bố đầy đủ và chính xác",
          "Có, nếu người đọc là nhà đầu tư chuyên nghiệp",
          "Không, trừ khi báo cáo có kèm bản tóm tắt riêng",
        ],
        correct: 0,
        explanation:
          "Công bố mà người đọc không nhận ra hoặc không hiểu thì chưa truyền đạt được gì - hình thức là một phần của nghĩa vụ.",
      },
      {
        question: "Công bố cho nhà tuyển dụng và cho khách hàng khác nhau thế nào?",
        options: [
          "Là hai nghĩa vụ riêng, hoàn thành cái này không thay cái kia",
          "Chỉ cần công bố cho nhà tuyển dụng, họ sẽ thông báo lại khách",
          "Chỉ cần công bố cho khách hàng vì họ là bên bị ảnh hưởng",
          "Hai nghĩa vụ giống nhau nên một lần công bố là đủ cả hai",
        ],
        correct: 0,
        explanation:
          "Nhà tuyển dụng cần biết để quản lý xung đột ở cấp tổ chức; khách hàng cần biết để tự đánh giá khuyến nghị họ nhận.",
      },
      {
        question: "Vì sao chuẩn 'có thể hợp lý được kỳ vọng' rộng hơn chuẩn 'đã ảnh hưởng'?",
        options: [
          "Vì gần như không bao giờ chứng minh được phán đoán đã lệch",
          "Vì cơ quan quản lý muốn thu thập nhiều dữ liệu công bố hơn",
          "Vì chuẩn hẹp hơn sẽ làm báo cáo phân tích dài quá mức",
          "Vì mọi xung đột lợi ích đều thực sự làm lệch phán đoán",
        ],
        correct: 0,
        explanation:
          "Một chuẩn chỉ kích hoạt khi chứng minh được ảnh hưởng thì trên thực tế gần như không bao giờ kích hoạt.",
      },
    ],
    keyTakeaways: [
      "Chuẩn là 'có thể hợp lý được kỳ vọng làm ảnh hưởng', không phải 'đã ảnh hưởng'",
      "Người đọc đánh giá mức đáng kể, không phải người có xung đột",
      "Công bố phải nổi bật và dễ hiểu - chân trang pháp lý không đạt",
      "Công bố cho nhà tuyển dụng và cho khách là hai nghĩa vụ riêng",
      "Tránh xung đột trước, công bố phần không tránh được",
    ],
    practicePrompt: {
      question:
        "Công ty bạn đang bảo lãnh phát hành cho doanh nghiệp X, và bạn được giao viết báo cáo phân tích về X. Xử lý thế nào?",
      options: [
        "Viết bình thường vì bạn cá nhân không có lợi ích trong thương vụ",
        "Công bố nổi bật quan hệ bảo lãnh phát hành trong chính báo cáo, và kiểm tra xem cơ chế tách bộ phận của công ty có cho phép bạn viết báo cáo này không",
        "Từ chối viết báo cáo vì xung đột không thể khắc phục",
        "Viết và gửi bản thảo cho doanh nghiệp X xem trước",
      ],
      correct: 1,
      explanation:
        "Xung đột ở đây là của tổ chức chứ không của cá nhân, và điều đó không làm nghĩa vụ nhẹ đi - phương án đầu nhầm đúng chỗ này. Hai việc phải làm cùng lúc: công bố cho người đọc biết, và kiểm tra cơ chế nội bộ vì nhiều công ty hạn chế phát hành báo cáo trong giai đoạn bảo lãnh. Gửi bản thảo cho chính đối tượng phân tích lại tạo thêm một vi phạm mới về tính độc lập.",
    },
  },
  {
    id: 1598,
    slug: "cfa-ethics-standard-7a-ky-thi-va-chuong-trinh",
    title: "CFA Ethics 34: Standard VII(A) - Bảo vệ chính kỳ thi mà bạn đang thi",
    subtitle: "Bảo mật đề, khai báo hồ sơ, và vì sao chia sẻ 'kinh nghiệm thi' có thể là vi phạm",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "📋",
    whyItMatters:
      "Đây là Standard mà candidate có nguy cơ vi phạm cao nhất và ý thức thấp nhất, vì hành vi vi phạm - kể lại đề thi cho bạn cùng ôn - trông giống hệt một hành động giúp đỡ bình thường.",
    openingQuestion:
      "Sau khi thi xong Level I, bạn nhắn cho nhóm bạn cùng ôn: 'Phần Ethics hỏi nhiều về Standard III, ôn kỹ phần đó nhé'. Đánh giá?",
    openingOptions: [
      "Hợp lệ vì bạn không nêu nội dung câu hỏi cụ thể nào",
      "Vi phạm: tiết lộ cấu trúc và trọng tâm đề thi cũng nằm trong phạm vi bảo mật đã cam kết",
      "Hợp lệ vì bạn đang giúp bạn bè học tập tốt hơn",
      "Chỉ vi phạm nếu bạn nhận tiền cho thông tin đó",
    ],
    correctOption: 1,
    explanation:
      "Cam kết bảo mật mà mọi candidate ký trước khi thi bao trùm nội dung đề, và nội dung đề không chỉ là câu chữ của từng câu hỏi. Thông tin về việc phần nào được hỏi nhiều, dạng câu hỏi ra sao, hay chủ đề nào không xuất hiện đều là thông tin về đề thi - và nó tạo lợi thế cho người nhận so với những thí sinh khác của cùng kỳ thi. Đây chính là điều Standard VII(A) bảo vệ: không phải quyền sở hữu của CFA Institute với đề thi, mà tính công bằng giữa các thí sinh và giá trị của một chứng chỉ mà mọi người đều phải đạt bằng cùng một cách.",
    diagram: [
      { label: "Bảo mật bao trùm cả cấu trúc và trọng tâm, không chỉ câu chữ", arrow: true },
      { label: "Khai báo hồ sơ đăng ký phải trung thực", arrow: true },
      { label: "Không gian lận dưới mọi hình thức trong phòng thi", arrow: true },
      { label: "Bảo vệ tính công bằng giữa thí sinh, không phải bản quyền đề" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Phạm vi trải dài trước, trong và sau kỳ thi",
      description:
        "Standard VII(A) áp dụng từ lúc đăng ký - khai gian kinh nghiệm làm việc hoặc trình độ học vấn trong hồ sơ là vi phạm ngay trước khi bạn ngồi vào phòng thi. Trong lúc thi thì rõ ràng. Sau khi thi, nghĩa vụ bảo mật vẫn còn nguyên và không có thời hạn. Nó cũng bao trùm việc tham gia các hoạt động khác của CFA Institute, chẳng hạn chấm bài hoặc xây dựng đề - người tham gia phải giữ bí mật quy trình.",
    },
    quiz: [
      {
        question: "Cam kết bảo mật đề thi bao trùm những gì?",
        options: [
          "Cả cấu trúc, trọng tâm và dạng câu hỏi, không chỉ câu chữ",
          "Chỉ nội dung nguyên văn của từng câu hỏi trong đề",
          "Chỉ các câu hỏi thuộc phần Ethics của kỳ thi",
          "Chỉ thông tin được đánh dấu mật trong tài liệu thi",
        ],
        correct: 0,
        explanation:
          "Thông tin về trọng tâm đề vẫn tạo lợi thế cho người nhận, và đó chính là thứ Standard này ngăn.",
      },
      {
        question: "Standard VII(A) bảo vệ điều gì là chính?",
        options: [
          "Tính công bằng giữa các thí sinh và giá trị của chứng chỉ",
          "Quyền sở hữu trí tuệ của CFA Institute đối với đề thi",
          "Doanh thu từ việc bán tài liệu ôn thi chính thức",
          "Uy tín cá nhân của những người tham gia xây dựng đề",
        ],
        correct: 0,
        explanation:
          "Một chứng chỉ chỉ có giá trị khi mọi người đạt được nó bằng cùng một cách - đó là thứ bị tổn hại khi đề bị rò rỉ.",
      },
      {
        question: "Standard VII(A) bắt đầu áp dụng từ thời điểm nào?",
        options: [
          "Từ lúc đăng ký dự thi, gồm cả tính trung thực của hồ sơ",
          "Từ lúc bước vào phòng thi trong ngày thi chính thức",
          "Từ lúc nhận kết quả thi và trở thành candidate hợp lệ",
          "Từ lúc hoàn thành cả ba cấp độ của chương trình",
        ],
        correct: 0,
        explanation:
          "Khai gian kinh nghiệm làm việc trong hồ sơ đăng ký là vi phạm ngay trước khi bạn ngồi vào phòng thi.",
      },
      {
        question: "Nghĩa vụ bảo mật đề thi kéo dài bao lâu sau kỳ thi?",
        options: [
          "Không có thời hạn, kể cả sau khi đã đỗ cấp độ đó",
          "Ba tháng cho tới khi kết quả được công bố chính thức",
          "Tới kỳ thi tiếp theo khi đề đã được thay mới hoàn toàn",
          "Một năm kể từ ngày dự thi cấp độ tương ứng",
        ],
        correct: 0,
        explanation:
          "Ngân hàng câu hỏi được tái sử dụng qua nhiều kỳ, nên một câu bị tiết lộ vẫn gây ảnh hưởng nhiều năm sau.",
      },
      {
        question: "Người tham gia chấm bài hoặc xây dựng đề chịu nghĩa vụ gì?",
        options: [
          "Giữ bí mật quy trình, cùng thuộc phạm vi Standard VII(A)",
          "Không chịu nghĩa vụ nào vì họ không phải thí sinh",
          "Chỉ chịu nghĩa vụ theo hợp đồng lao động với CFA Institute",
          "Được phép chia sẻ thông tin chung không nêu chi tiết cụ thể",
        ],
        correct: 0,
        explanation:
          "Phạm vi của Standard này bao trùm mọi hoạt động trong chương trình CFA, không chỉ vai trò thí sinh.",
      },
    ],
    keyTakeaways: [
      "Bảo mật bao trùm cấu trúc và trọng tâm đề, không chỉ câu chữ",
      "Áp dụng từ lúc đăng ký - hồ sơ khai gian đã là vi phạm",
      "Nghĩa vụ bảo mật không có thời hạn vì câu hỏi được tái sử dụng",
      "Bảo vệ tính công bằng giữa thí sinh, không phải bản quyền đề",
      "Phạm vi gồm cả người chấm bài và người xây dựng đề",
    ],
    practicePrompt: {
      question:
        "Bạn thấy một diễn đàn đăng lại nhiều câu hỏi giống đề thi bạn vừa làm. Bạn nên làm gì?",
      options: [
        "Bỏ qua vì bạn không phải người đăng những nội dung đó",
        "Báo cho CFA Institute, và tuyệt đối không xác nhận hay bình luận xem câu nào giống đề thật",
        "Bình luận cảnh báo mọi người rằng đây là nội dung vi phạm",
        "Lưu lại để tham khảo vì nội dung đã công khai trên mạng",
      ],
      correct: 1,
      explanation:
        "Vế thứ hai quan trọng ngang vế thứ nhất và hay bị bỏ qua: xác nhận câu nào đúng là đề thật chính là hành vi tiết lộ, dù bạn đang có ý tốt. Ngay cả một bình luận cảnh báo cũng có thể vô tình chỉ ra phần nào là thật. Việc nội dung đã nằm trên mạng không gỡ bỏ nghĩa vụ của bạn.",
    },
  },
  {
    id: 1599,
    slug: "cfa-ethics-gips-kiem-chung-va-composite",
    title: "CFA Ethics 35: GIPS ở mức vận hành - ai được tuyên bố tuân thủ và kiểm chứng là gì",
    subtitle: "Tuân thủ ở cấp công ty, quy tắc dựng composite, và khác biệt giữa xác minh và kiểm toán",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "✅",
    whyItMatters:
      "GIPS hay được học ở mức 'có một bộ chuẩn tự nguyện'. Nhưng điều quyết định trong thực tế là ba chi tiết vận hành: tuyên bố ở cấp nào, composite dựng theo quy tắc gì, và chữ 'đã được xác minh' thật ra xác nhận điều gì.",
    openingQuestion:
      "Một công ty quản lý quỹ tuyên bố 'quỹ cổ phiếu tăng trưởng của chúng tôi tuân thủ GIPS'. Vấn đề ở đâu?",
    openingOptions: [
      "Không có vấn đề nếu quỹ đó thực sự tuân thủ đầy đủ",
      "GIPS chỉ được tuyên bố ở cấp toàn công ty, không thể tuân thủ cho riêng một sản phẩm",
      "Vấn đề là chưa nêu rõ giai đoạn nào đã tuân thủ",
      "Vấn đề là chưa có bên thứ ba xác minh tuyên bố đó",
    ],
    correctOption: 1,
    explanation:
      "Đây là quy tắc nền của GIPS và nó tồn tại để chặn đúng hành vi trên. Nếu được tuyên bố cho từng sản phẩm, công ty sẽ chọn sản phẩm có kết quả đẹp để gắn nhãn tuân thủ và im lặng về phần còn lại - tức là dùng GIPS để làm chính điều GIPS sinh ra để ngăn. Tuân thủ ở cấp công ty nghĩa là mọi danh mục có quyền quyết định đầu tư đều phải được đưa vào ít nhất một composite, và mọi composite đều phải được trình bày khi có bên yêu cầu. Không có chỗ nào để giấu một chiến lược thất bại.",
    diagram: [
      { label: "Tuân thủ chỉ ở cấp toàn công ty", arrow: true },
      { label: "Mọi danh mục có quyền quyết định phải vào một composite", arrow: true },
      { label: "Composite gộp theo chiến lược, không theo kết quả", arrow: true },
      { label: "Không còn chỗ nào để giấu một chiến lược thất bại" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Xác minh (verification) không phải kiểm toán từng con số",
      description:
        "Xác minh GIPS là việc một bên độc lập kiểm tra hai điều ở cấp toàn công ty: quy trình dựng composite có tuân thủ chuẩn không, và quy trình tính toán trình bày hiệu suất có phù hợp không. Nó không xác nhận rằng con số hiệu suất của một composite cụ thể là chính xác - đó là phạm vi của kiểm tra hiệu suất riêng lẻ, một dịch vụ khác. Nhầm hai thứ này khiến người đọc tin rằng 'đã được xác minh' nghĩa là mọi con số đã được kiểm chứng, trong khi nó nói về quy trình.",
    },
    quiz: [
      {
        question: "GIPS được tuyên bố tuân thủ ở cấp nào?",
        options: [
          "Cấp toàn công ty, không phải cho từng sản phẩm riêng lẻ",
          "Cấp từng quỹ hoặc từng chiến lược đầu tư cụ thể",
          "Cấp từng composite mà công ty muốn công bố ra ngoài",
          "Cấp từng khu vực địa lý mà công ty có hoạt động",
        ],
        correct: 0,
        explanation:
          "Cho phép tuyên bố theo sản phẩm sẽ biến GIPS thành công cụ chọn lọc - đúng thứ nó ra đời để ngăn.",
      },
      {
        question: "Quy tắc nào bảo đảm không có chiến lược nào bị giấu?",
        options: [
          "Mọi danh mục có quyền quyết định phải vào composite",
          "Mọi composite phải có ít nhất năm năm lịch sử hoạt động",
          "Mọi công ty phải công bố toàn bộ danh sách khách hàng",
          "Mọi báo cáo hiệu suất phải được kiểm toán độc lập",
        ],
        correct: 0,
        explanation:
          "Không có danh mục nào được đứng ngoài, nên không có chiến lược thất bại nào biến mất khỏi bức tranh.",
      },
      {
        question: "Composite được gộp theo tiêu chí nào?",
        options: [
          "Theo chiến lược hoặc mục tiêu đầu tư, không theo kết quả",
          "Theo quy mô tài sản của từng tài khoản trong danh mục",
          "Theo mức phí mà khách hàng đang trả cho công ty",
          "Theo thời điểm tài khoản bắt đầu quan hệ với công ty",
        ],
        correct: 0,
        explanation:
          "Gộp theo kết quả sẽ tái tạo lại chính việc chọn lọc mà cấu trúc composite được thiết kế để triệt tiêu.",
      },
      {
        question: "Xác minh GIPS xác nhận điều gì?",
        options: [
          "Quy trình dựng composite và tính hiệu suất toàn công ty",
          "Độ chính xác của từng con số hiệu suất trong mỗi composite",
          "Rằng công ty đạt mức hiệu suất cao hơn trung bình ngành",
          "Rằng toàn bộ báo cáo tài chính của công ty đã được kiểm toán",
        ],
        correct: 0,
        explanation:
          "Kiểm tra hiệu suất từng composite là một dịch vụ riêng - nhầm hai thứ làm người đọc tin nhiều hơn thực tế.",
      },
      {
        question: "Vì sao tuân thủ GIPS không được áp dụng chọn lọc từng phần?",
        options: [
          "Vì chọn lọc phần có lợi là chính thứ GIPS ngăn",
          "Vì chi phí xác minh từng phần cao hơn xác minh toàn bộ",
          "Vì cơ quan quản lý yêu cầu tuân thủ toàn bộ hoặc không",
          "Vì các composite có mối liên hệ tính toán chặt chẽ với nhau",
        ],
        correct: 0,
        explanation:
          "Một bộ chuẩn về trình bày trung thực mà cho phép áp dụng chọn lọc thì tự mâu thuẫn với chính mục đích của nó.",
      },
    ],
    keyTakeaways: [
      "Tuân thủ GIPS chỉ tuyên bố được ở cấp toàn công ty",
      "Mọi danh mục có quyền quyết định phải nằm trong ít nhất một composite",
      "Composite gộp theo chiến lược, không theo kết quả",
      "Xác minh nói về quy trình, không xác nhận từng con số hiệu suất",
      "Không cho áp dụng chọn lọc, vì chọn lọc là chính thứ GIPS ngăn",
    ],
    practicePrompt: {
      question:
        "Một công ty ghi trong tài liệu chào bán: 'Hiệu suất đã được xác minh GIPS'. Bạn nên hiểu điều gì đã được xác nhận?",
      options: [
        "Mọi con số hiệu suất trong tài liệu đã được kiểm tra là chính xác",
        "Quy trình dựng composite và tính hiệu suất của công ty phù hợp chuẩn - không phải từng con số cụ thể đã được kiểm chứng",
        "Công ty đạt mức hiệu suất vượt trội so với các đối thủ",
        "Toàn bộ báo cáo tài chính của công ty đã qua kiểm toán",
      ],
      correct: 1,
      explanation:
        "Cách diễn đạt này rất phổ biến và nó khiến người đọc hiểu theo phương án đầu. Xác minh ở cấp công ty và cấp quy trình; muốn biết một composite cụ thể có được kiểm tra riêng hay không thì phải hỏi thêm, vì đó là dịch vụ tách biệt và không phải công ty nào cũng mua.",
    },
  },
  {
    id: 1600,
    slug: "cfa-ethics-bo-may-tuan-thu-thuc-te",
    title: "CFA Ethics 36: Bộ máy tuân thủ vận hành ra sao - bức tường, danh sách và đăng ký trước",
    subtitle: "Từ nguyên tắc trên giấy tới các cơ chế cụ thể chặn vi phạm trước khi nó xảy ra",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧱",
    whyItMatters:
      "Các Standard mô tả nghĩa vụ; bộ máy tuân thủ là thứ biến nghĩa vụ thành hành vi hằng ngày. Hiểu các cơ chế này giúp bạn nhận ra mình đang được bảo vệ ở đâu - và ở đâu thì không.",
    openingQuestion:
      "Danh sách hạn chế (restricted list) và danh sách theo dõi (watch list) khác nhau thế nào?",
    openingOptions: [
      "Hai tên gọi khác nhau của cùng một cơ chế kiểm soát",
      "Danh sách hạn chế được công bố nội bộ và cấm giao dịch; danh sách theo dõi là bí mật, chỉ dùng để giám sát mà không tiết lộ công ty đang làm việc với ai",
      "Danh sách hạn chế áp dụng cho nhân viên, danh sách theo dõi cho khách hàng",
      "Danh sách theo dõi cấm giao dịch, danh sách hạn chế chỉ cảnh báo",
    ],
    correctOption: 1,
    explanation:
      "Hai cơ chế này giải quyết hai vấn đề ngược nhau và đó là lý do cần cả hai. Danh sách hạn chế phải được phổ biến rộng để mọi người biết mà tránh - nhưng chính việc phổ biến đó tiết lộ rằng công ty đang có thương vụ với doanh nghiệp nào, một thông tin nhạy cảm. Danh sách theo dõi giải quyết bằng cách giữ bí mật ở bộ phận tuân thủ: không ai bị cấm gì, nhưng mọi giao dịch liên quan tới các mã trong danh sách đều bị giám sát chặt. Nhiều công ty dùng đồng thời cả hai, với danh sách theo dõi ở giai đoạn sớm và chuyển sang danh sách hạn chế khi thương vụ đã công khai.",
    diagram: [
      { label: "Bức tường thông tin: chặn dòng chảy giữa các bộ phận", arrow: true },
      { label: "Danh sách theo dõi: bí mật, giám sát không cấm", arrow: true },
      { label: "Danh sách hạn chế: công bố nội bộ, cấm giao dịch", arrow: true },
      { label: "Đăng ký trước: chặn giao dịch trước khi nó xảy ra" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao kiểm soát phòng ngừa mạnh hơn kiểm soát phát hiện",
      description:
        "Đăng ký trước giao dịch cá nhân là kiểm soát phòng ngừa: nó chặn một lệnh có vấn đề trước khi lệnh được đặt. Rà soát giao dịch cuối tháng là kiểm soát phát hiện: nó tìm ra vi phạm sau khi đã xảy ra. Cả hai đều cần, nhưng chỉ loại đầu ngăn được tổn hại. Đây là lý do phần lớn hệ thống tuân thủ hiện đại dồn nguồn lực vào các chốt chặn trước hành vi, và dùng rà soát sau chủ yếu để kiểm tra xem chính các chốt đó có hoạt động không.",
    },
    quiz: [
      {
        question: "Danh sách theo dõi khác danh sách hạn chế ở điểm nào?",
        options: [
          "Theo dõi thì bí mật và không cấm; hạn chế thì phổ biến và cấm",
          "Theo dõi cấm giao dịch còn hạn chế chỉ đưa ra cảnh báo",
          "Theo dõi áp dụng cho nhân viên, hạn chế áp dụng cho khách hàng",
          "Hai danh sách có nội dung giống nhau nhưng cập nhật khác nhịp",
        ],
        correct: 0,
        explanation:
          "Danh sách hạn chế phải phổ biến để có tác dụng, nhưng chính việc phổ biến lại tiết lộ thương vụ - danh sách theo dõi giải quyết đúng nghịch lý đó.",
      },
      {
        question: "Bức tường thông tin trong công ty chứng khoán nhằm mục đích gì?",
        options: [
          "Chặn thông tin nội bộ chảy từ bộ phận tư vấn sang bộ phận giao dịch",
          "Ngăn nhân viên các bộ phận trao đổi công việc với nhau",
          "Bảo vệ hệ thống công nghệ khỏi truy cập từ bên ngoài",
          "Giới hạn số lượng người được tiếp cận báo cáo phân tích",
        ],
        correct: 0,
        explanation:
          "Cùng một tổ chức vừa nắm thông tin trọng yếu chưa công bố vừa giao dịch trên thị trường - bức tường là thứ tách hai vai trò đó.",
      },
      {
        question: "Đăng ký trước giao dịch cá nhân thuộc loại kiểm soát nào?",
        options: [
          "Phòng ngừa - chặn lệnh có vấn đề trước khi được đặt",
          "Phát hiện - tìm ra vi phạm sau khi giao dịch hoàn tất",
          "Khắc phục - xử lý hậu quả sau khi vi phạm gây thiệt hại",
          "Bù đắp - thay thế cho một chốt kiểm soát khác đã hỏng",
        ],
        correct: 0,
        explanation:
          "Đây là điểm phân biệt quan trọng: chỉ kiểm soát phòng ngừa mới ngăn được tổn hại, phát hiện chỉ ghi nhận sau.",
      },
      {
        question: "Rà soát giao dịch định kỳ sau kỳ có tác dụng chính nào?",
        options: [
          "Kiểm tra xem các chốt kiểm soát trước có chạy không",
          "Thay thế cho việc đăng ký trước ở các công ty quy mô nhỏ",
          "Xác định mức thưởng cuối năm cho nhân viên tuân thủ tốt",
          "Đáp ứng yêu cầu nộp báo cáo định kỳ cho cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Phát hiện một vi phạm lọt lưới quan trọng, nhưng thông tin giá trị hơn là biết chốt nào đã không chặn được nó.",
      },
      {
        question: "Vì sao nhiều công ty dùng đồng thời cả hai loại danh sách?",
        options: [
          "Theo dõi lúc sớm, chuyển sang hạn chế khi công khai",
          "Vì quy định bắt buộc phải duy trì cả hai danh sách song song",
          "Vì hai danh sách áp dụng cho hai nhóm chứng khoán khác nhau",
          "Vì mỗi bộ phận trong công ty tự duy trì một danh sách riêng",
        ],
        correct: 0,
        explanation:
          "Nhu cầu bảo mật cao nhất ở giai đoạn đầu; khi thương vụ đã công khai thì lệnh cấm rõ ràng lại hiệu quả hơn.",
      },
    ],
    keyTakeaways: [
      "Bức tường thông tin tách bộ phận nắm tin nội bộ khỏi bộ phận giao dịch",
      "Danh sách theo dõi: bí mật, giám sát mà không cấm",
      "Danh sách hạn chế: phổ biến nội bộ và cấm giao dịch",
      "Đăng ký trước là kiểm soát phòng ngừa - loại duy nhất ngăn được tổn hại",
      "Rà soát sau chủ yếu để kiểm tra các chốt chặn trước có chạy không",
    ],
    practicePrompt: {
      question:
        "Bạn làm ở bộ phận phân tích và muốn mua cổ phiếu một doanh nghiệp. Mã đó không nằm trong danh sách hạn chế. Bạn được mua chưa?",
      options: [
        "Được, vì không nằm trong danh sách hạn chế nghĩa là không bị cấm",
        "Chưa - vẫn phải đăng ký trước theo quy trình, vì mã có thể đang nằm trong danh sách theo dõi mà bạn không được biết",
        "Được, nếu bạn không phải người viết báo cáo về doanh nghiệp đó",
        "Chưa, phải chờ hết kỳ báo cáo tài chính gần nhất của doanh nghiệp",
      ],
      correct: 1,
      explanation:
        "Đây chính là lý do danh sách theo dõi tồn tại và vì sao nó phải bí mật: bạn không thể tự kiểm tra được. Việc một mã không nằm trong danh sách hạn chế công khai không nói lên điều gì, và quy trình đăng ký trước là cách duy nhất để bộ phận tuân thủ đối chiếu với thông tin mà chỉ họ có.",
    },
  },
  {
    id: 1601,
    slug: "cfa-ethics-thuat-toan-va-ai-trong-dau-tu",
    title: "CFA Ethics 37: Khi thuật toán ra quyết định - trách nhiệm thuộc về ai",
    subtitle: "Cơ sở hợp lý cho một mô hình, thiên lệch trong dữ liệu, và nghĩa vụ giải thích cho khách hàng",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🤖",
    whyItMatters:
      "Các Standard được viết cho con người ra quyết định, và chúng vẫn áp dụng nguyên vẹn khi một mô hình ra quyết định thay - nhưng cách áp dụng thì phải nghĩ lại. Đây là phần đề cương đang mở rộng nhanh nhất.",
    openingQuestion:
      "Một mô hình học máy đưa ra khuyến nghị đầu tư mà bạn không giải thích được cơ chế bên trong. Standard V(A) áp dụng thế nào?",
    openingOptions: [
      "Không áp dụng vì quyết định do mô hình đưa ra, không phải bạn",
      "Vẫn áp dụng nguyên vẹn: bạn phải hiểu đủ về dữ liệu, giả định và giới hạn của mô hình để đánh giá được kết quả nó đưa ra",
      "Chỉ áp dụng nếu mô hình do chính công ty bạn xây dựng",
      "Áp dụng nhẹ hơn vì mô hình khách quan hơn con người",
    ],
    correctOption: 1,
    explanation:
      "Standard V(A) yêu cầu cơ sở hợp lý cho mọi khuyến nghị, và việc khuyến nghị đến từ một mô hình không tạo ra ngoại lệ nào. Điều thay đổi là nội dung của chữ 'hiểu đủ': với mô hình, nó nghĩa là biết dữ liệu huấn luyện đến từ đâu và có thiên lệch gì, biết mô hình được tối ưu cho mục tiêu nào, biết nó hoạt động kém trong điều kiện nào, và có cách phát hiện khi nó bắt đầu trôi khỏi điều kiện đã học. Không giải thích được từng trọng số bên trong là chấp nhận được; không biết mô hình sẽ hỏng ở đâu thì không.",
    diagram: [
      { label: "V(A) áp dụng nguyên vẹn cho khuyến nghị từ mô hình", arrow: true },
      { label: "Hiểu đủ: dữ liệu, mục tiêu tối ưu, điều kiện hỏng", arrow: true },
      { label: "Thiên lệch dữ liệu huấn luyện thành thiên lệch khuyến nghị", arrow: true },
      { label: "V(B): khách hàng phải biết mô hình đang tham gia quyết định" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Thiên lệch dữ liệu không tự biến mất vì mô hình là máy",
      description:
        "Một mô hình huấn luyện trên dữ liệu của một giai đoạn thị trường tăng sẽ học rằng rủi ro luôn được đền đáp, và nó sẽ tiếp tục nghĩ vậy cho tới khi gặp một giai đoạn khác. Điều nguy hiểm là mô hình phát biểu kết luận đó với vẻ chắc chắn của một phép tính, không phải với sự do dự của một phán đoán. Đây là lý do Standard V(A) áp dụng cho mô hình khắt khe hơn chứ không nhẹ hơn: đầu ra trông khách quan làm người dùng ít chất vấn hơn.",
    },
    quiz: [
      {
        question: "Khuyến nghị đến từ mô hình thì Standard V(A) áp dụng thế nào?",
        options: [
          "Nguyên vẹn - người đưa khuyến nghị vẫn phải có cơ sở hợp lý",
          "Không áp dụng vì quyết định không do con người đưa ra",
          "Áp dụng nhẹ hơn vì mô hình khách quan hơn con người",
          "Chỉ áp dụng nếu mô hình do chính công ty tự xây dựng",
        ],
        correct: 0,
        explanation:
          "Công cụ thay đổi, nghĩa vụ thì không. Thứ thay đổi là nội dung cụ thể của việc 'hiểu đủ'.",
      },
      {
        question: "'Hiểu đủ về mô hình' nghĩa là gì trong bối cảnh này?",
        options: [
          "Biết dữ liệu, mục tiêu tối ưu và lúc mô hình hỏng",
          "Giải thích được từng trọng số và tham số bên trong mô hình",
          "Tự xây dựng lại được mô hình đó từ đầu bằng công cụ riêng",
          "Có chứng chỉ chuyên môn về học máy và khoa học dữ liệu",
        ],
        correct: 0,
        explanation:
          "Không giải thích được từng trọng số là chấp nhận được; không biết mô hình sẽ hỏng ở đâu thì không.",
      },
      {
        question: "Vì sao thiên lệch trong dữ liệu huấn luyện đặc biệt nguy hiểm?",
        options: [
          "Vì mô hình phát biểu kết luận với vẻ chắc chắn của một phép tính",
          "Vì dữ liệu huấn luyện luôn bị xóa sau khi mô hình hoàn thành",
          "Vì thiên lệch làm mô hình chạy chậm hơn mức cần thiết",
          "Vì cơ quan quản lý cấm dùng dữ liệu lịch sử để huấn luyện",
        ],
        correct: 0,
        explanation:
          "Đầu ra trông khách quan làm người dùng ít chất vấn hơn - nên cùng một sai lệch gây hại nhiều hơn khi đến từ máy.",
      },
      {
        question: "Standard V(B) yêu cầu gì khi mô hình tham gia vào quyết định đầu tư?",
        options: [
          "Khách phải được biết mô hình tham gia và giới hạn",
          "Phải cung cấp mã nguồn của mô hình cho khách hàng xem xét",
          "Phải để khách hàng chọn giữa mô hình và phán đoán con người",
          "Không yêu cầu gì thêm vì quy trình là chuyện nội bộ công ty",
        ],
        correct: 0,
        explanation:
          "Đây là phần 'nêu rõ quy trình' của V(B): khách chọn bạn dựa trên một quy trình, nên quy trình đổi thì phải nói.",
      },
      {
        question: "Model drift trong bối cảnh Standard V(A) nghĩa là gì?",
        options: [
          "Quan hệ mô hình đã học trôi khỏi thực tế, không báo lỗi",
          "Mô hình chạy chậm dần khi khối lượng dữ liệu tăng lên",
          "Mô hình bị lỗi kỹ thuật và ngừng đưa ra kết quả",
          "Người dùng dần dần không còn tin vào kết quả mô hình",
        ],
        correct: 0,
        explanation:
          "Nguy hiểm nằm ở chỗ nó không báo lỗi - mô hình vẫn trả về con số bình thường trong khi cơ sở của nó đã mất hiệu lực.",
      },
    ],
    keyTakeaways: [
      "Standard V(A) áp dụng nguyên vẹn cho khuyến nghị từ mô hình",
      "Hiểu đủ = biết dữ liệu, mục tiêu tối ưu, và điều kiện mô hình hỏng",
      "Không giải thích được từng trọng số thì được; không biết nó hỏng ở đâu thì không",
      "Đầu ra trông khách quan làm người dùng ít chất vấn - nên rủi ro cao hơn",
      "V(B): khách phải biết mô hình tham gia quyết định và giới hạn của nó",
    ],
    practicePrompt: {
      question:
        "Mô hình phân bổ tài sản của công ty bạn hoạt động tốt suốt năm năm. Gần đây kết quả xấu đi nhưng chưa ai kiểm tra lại. Nghĩa vụ của bạn là gì?",
      options: [
        "Chờ thêm dữ liệu vì năm năm tốt là bằng chứng đủ mạnh",
        "Rà soát ngay xem điều kiện thị trường có còn khớp với dữ liệu huấn luyện không - và báo khách nếu quy trình cần thay đổi",
        "Ngừng dùng mô hình và quay lại phán đoán thủ công",
        "Chuyển trách nhiệm sang bộ phận xây dựng mô hình",
      ],
      correct: 1,
      explanation:
        "Năm năm tốt chính là thứ làm người ta chờ thêm, và đó là cái bẫy - một mô hình trôi khỏi điều kiện đã học vẫn trả về con số bình thường trong khi cơ sở của nó đã mất hiệu lực. Hai Standard cùng kích hoạt: V(A) đòi cơ sở hợp lý cho khuyến nghị bạn đang đưa hôm nay, và V(B) đòi báo khách nếu quy trình đầu tư thay đổi.",
    },
  },
  {
    id: 1602,
    slug: "cfa-ethics-van-dung-thi-truong-viet-nam",
    title: "CFA Ethics 38: Vận dụng vào thị trường Việt Nam - nơi Code khắt khe hơn luật",
    subtitle: "Quan hệ cá nhân, thông tin phòng họp, và những vùng mà quy định trong nước chưa phủ tới",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🇻🇳",
    whyItMatters:
      "Standard I(A) nói tuân theo bên nghiêm ngặt hơn giữa luật và Code. Với người hành nghề ở Việt Nam, chiều thường gặp là Code khắt khe hơn - và đó là chiều không có ai cưỡng chế ngoài chính bạn.",
    openingQuestion:
      "Một mối quan hệ cá nhân cho bạn biết doanh nghiệp X sắp công bố kết quả kinh doanh đột biến. Người đó không làm ở X mà nghe từ một người bạn làm ở đó. Bạn được giao dịch không?",
    openingOptions: [
      "Được, vì bạn nhận thông tin qua nhiều tầng nên không còn là nội bộ",
      "Không: thông tin vẫn là trọng yếu và chưa công bố, và chuỗi truyền tin bắt nguồn từ một người có nghĩa vụ bảo mật",
      "Được, nếu bạn không trả tiền để có thông tin đó",
      "Được, nếu bạn công bố nguồn tin trong báo cáo phân tích",
    ],
    correctOption: 1,
    explanation:
      "Số tầng trung gian không làm thông tin sạch đi. Hai điều kiện vẫn nguyên: thông tin trọng yếu, và chưa công bố rộng rãi. Điều kiện thứ ba - nguồn gốc từ một người vi phạm nghĩa vụ bảo mật - cũng còn nguyên, và việc bạn không biết cụ thể ai là người đầu tiên không gỡ bỏ được nó nếu hoàn cảnh cho thấy thông tin chỉ có thể đến từ bên trong. Ở thị trường mà quan hệ cá nhân đóng vai trò lớn trong luồng thông tin, đây là tình huống gặp thường xuyên hơn nhiều so với dạng giao dịch nội gián kinh điển - và cũng khó tự nhận ra hơn vì nó đến qua một cuộc trò chuyện bình thường.",
    diagram: [
      { label: "Trọng yếu + chưa công bố = không giao dịch", arrow: true },
      { label: "Số tầng trung gian không làm thông tin sạch đi", arrow: true },
      { label: "Luật trong nước lỏng hơn không gỡ nghĩa vụ theo Code", arrow: true },
      { label: "Chiều 'Code khắt khe hơn' không có ai cưỡng chế ngoài bạn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ba vùng mà Code thường đi trước quy định trong nước",
      description:
        "Thứ nhất, công bố xung đột lợi ích: nhiều quy định chỉ yêu cầu kê khai sở hữu vượt ngưỡng, trong khi Standard VI(A) yêu cầu công bố mọi thứ có thể hợp lý được kỳ vọng làm ảnh hưởng phán đoán. Thứ hai, tính phù hợp: quy định thường dừng ở việc phân loại nhà đầu tư, còn Standard III(C) đòi xét ở cấp danh mục cho từng người. Thứ ba, trình bày hiệu suất: GIPS là tự nguyện ở mọi nơi, nên toàn bộ khoảng cách giữa nó và mức tối thiểu theo quy định là vùng chỉ có đạo đức nghề nghiệp ràng buộc.",
    },
    quiz: [
      {
        question: "Thông tin trọng yếu đi qua nhiều tầng trung gian thì sao?",
        options: [
          "Vẫn trọng yếu và chưa công bố, không giao dịch được",
          "Trở thành thông tin công khai sau khi qua ba người trở lên",
          "Được phép dùng nếu bạn không biết ai là nguồn ban đầu",
          "Được phép dùng nếu bạn không trả tiền để có thông tin",
        ],
        correct: 0,
        explanation:
          "Hai điều kiện trọng yếu và chưa công bố không phụ thuộc vào đường đi của thông tin.",
      },
      {
        question: "Vì sao chiều 'Code khắt khe hơn luật' hay bị bỏ qua?",
        options: [
          "Vì không có cơ quan nào cưỡng chế ngoài chính người hành nghề",
          "Vì Code of Ethics không có hiệu lực ở ngoài lãnh thổ Hoa Kỳ",
          "Vì luật trong nước luôn được ưu tiên áp dụng trước",
          "Vì CFA Institute không xử lý vi phạm xảy ra ở nước ngoài",
        ],
        correct: 0,
        explanation:
          "Không có chế tài bên ngoài nghĩa là việc tuân thủ hoàn toàn phụ thuộc vào quyết định của chính người đó.",
      },
      {
        question: "Standard VI(A) đi xa hơn quy định kê khai sở hữu thông thường ở chỗ nào?",
        options: [
          "Yêu cầu công bố mọi thứ có thể ảnh hưởng phán đoán",
          "Yêu cầu kê khai với cơ quan quản lý thay vì với khách hàng",
          "Yêu cầu công bố toàn bộ danh mục cá nhân của người phân tích",
          "Yêu cầu công bố định kỳ hằng quý thay vì khi phát sinh",
        ],
        correct: 0,
        explanation:
          "Ngưỡng sở hữu là một con số; chuẩn của Standard VI(A) là ảnh hưởng tới phán đoán, và nó bao phủ rộng hơn nhiều.",
      },
      {
        question: "Vì sao dạng tin qua quan hệ cá nhân khó tự nhận ra hơn?",
        options: [
          "Vì nó đến qua một cuộc trò chuyện bình thường, không có dấu hiệu",
          "Vì thông tin qua quan hệ cá nhân thường không chính xác",
          "Vì luật hiện hành chưa có định nghĩa cho dạng thông tin này",
          "Vì người nghe không có cách nào kiểm chứng lại thông tin",
        ],
        correct: 0,
        explanation:
          "Giao dịch nội gián kinh điển có khung cảnh rõ ràng; một câu chuyện bên bàn ăn thì không - và đó là điều làm nó phổ biến hơn.",
      },
      {
        question: "GIPS ở Việt Nam có hiệu lực pháp lý bắt buộc không?",
        options: [
          "Không, nó tự nguyện ở mọi nơi",
          "Có, đã được nội luật hóa thành quy định bắt buộc",
          "Có, với các công ty quản lý quỹ có vốn nước ngoài",
          "Không, và cũng không có ý nghĩa gì với thị trường trong nước",
        ],
        correct: 0,
        explanation:
          "Tự nguyện không có nghĩa là không quan trọng - nhà đầu tư tổ chức lớn coi đó là điều kiện lọc, và đã tuyên bố thì phải tuân thủ đầy đủ.",
      },
    ],
    keyTakeaways: [
      "Số tầng trung gian không làm thông tin trọng yếu chưa công bố sạch đi",
      "Chiều 'Code khắt khe hơn luật' không có ai cưỡng chế ngoài chính bạn",
      "VI(A) rộng hơn quy định kê khai theo ngưỡng sở hữu",
      "III(C) đòi xét phù hợp ở cấp danh mục, không dừng ở phân loại nhà đầu tư",
      "GIPS tự nguyện, nên khoảng cách với mức tối thiểu theo luật là vùng của đạo đức",
    ],
    practicePrompt: {
      question:
        "Bạn nghe trong một bữa ăn rằng một doanh nghiệp niêm yết sắp có thay đổi lớn về ban lãnh đạo. Người nói là bạn của một thành viên hội đồng quản trị. Bạn nên làm gì?",
      options: [
        "Giao dịch bình thường vì bạn không phải người trong công ty",
        "Không giao dịch mã đó, và nếu công việc yêu cầu thì báo bộ phận tuân thủ để họ đưa vào danh sách theo dõi",
        "Xác minh lại thông tin rồi mới quyết định có giao dịch không",
        "Chia sẻ cho đồng nghiệp để cùng đánh giá mức độ tin cậy",
      ],
      correct: 1,
      explanation:
        "Phương án xác minh lại nghe hợp lý nhưng đi sai hướng: xác minh đúng chỉ làm bạn chắc chắn hơn rằng mình đang nắm thông tin trọng yếu chưa công bố. Chia sẻ tiếp là một vi phạm riêng. Cách xử lý duy nhất an toàn là không giao dịch và đưa vấn đề vào kênh tuân thủ - nơi có công cụ xử lý mà cá nhân bạn không có.",
    },
  },
];
