import type { Lesson } from "./lesson-types";

// Chặng "Xây sản phẩm cho người dùng Việt Nam" (ids 1451-1457).
//
// Kho đã dạy hạ tầng, độ trễ, bảo mật và dữ liệu cá nhân ở mức nguyên lý phổ
// quát. Người học thì đang dựng sản phẩm cho một thị trường cụ thể với những
// ràng buộc riêng: người dùng trả tiền bằng ví chứ không bằng thẻ, xác thực
// bằng căn cước gắn chip, dùng máy Android tầm trung trên mạng di động, và gõ
// một thứ tiếng có dấu mà phần lớn thư viện xử lý sai. Không bài nào chạm tới
// những thứ đó.
//
// Quy tắc viết: CƠ CHẾ là phần bền, CON SỐ là phần thay đổi. Hạn mức giao
// dịch, danh sách nhà cung cấp và tỷ lệ thiết bị đều đổi theo năm, nên bài chỉ
// nêu chúng khi cần minh hoạ một cơ chế, và luôn kèm cách tự tra lại.
//
// KHÔNG TRÙNG BA VÙNG ĐÃ CÓ: độ trễ và băng thông (nhánh Tối ưu), Nghị định 13
// về dữ liệu cá nhân (chặng Chuẩn mực & Dữ liệu), và hoá đơn đám mây (chặng
// 13). Chặng này đứng ở phía sản phẩm gặp người dùng, không ở phía hạ tầng.

export const VN_PRODUCT_LESSONS: Lesson[] = [
  {
    id: 1451,
    slug: "thanh-toan-cho-nguoi-dung-viet-nam",
    title: "Thị trường VN, Bài 1: Thanh toán - ví, thẻ nội địa và chuyển khoản nhanh",
    subtitle: "Ba đường tiền khác nhau, ba thời điểm tiền về khác nhau, và ba cách hỏng khác nhau",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "💳",
    track: "professional",
    whyItMatters:
      "Một sản phẩm thu tiền ở Việt Nam gần như luôn phải nối nhiều hơn một cổng, và mỗi cổng có một mô hình khác nhau về việc khi nào giao dịch được coi là xong. Hiểu sai điểm đó là nguồn của phần lớn lỗi đối soát.",
    openingQuestion: "Vì sao không nên coi phản hồi thành công từ cổng thanh toán là tiền đã về?",
    openingOptions: [
      "Vì phản hồi báo giao dịch được chấp nhận, còn tiền về theo một chu kỳ riêng",
      "Vì phản hồi có thể bị làm giả nếu không kiểm chữ ký",
      "Vì mạng lỗi có thể làm hai bên ghi khác nhau",
      "Vì người dùng có thể huỷ ngay sau khi thành công",
    ],
    correctOption: 0,
    explanation:
      "Ba khả năng kia đều có thật và đều xử lý được bằng kỹ thuật. Điều ở đây thì không phải lỗi mà là thiết kế của hệ thống thanh toán: phản hồi tức thời nói rằng giao dịch đã được chấp nhận, còn việc tiền thực sự chuyển sang tài khoản của bạn diễn ra theo một chu kỳ đối soát riêng, thường tính bằng ngày và khác nhau giữa các cổng. Sản phẩm nào coi hai thứ đó là một sẽ ghi nhận doanh thu sớm hơn thực tế, và chênh lệch chỉ lộ ra ở kỳ đối soát đầu tiên - lúc đã có hàng nghìn giao dịch để dò ngược.",
    diagram: [
      { label: "Người dùng xác nhận trên ví hoặc ngân hàng", arrow: true },
      { label: "Cổng phản hồi: giao dịch được chấp nhận", arrow: true },
      { label: "Chu kỳ đối soát: cổng gửi bảng kê", arrow: true },
      { label: "Tiền về tài khoản, sau khi trừ phí" },
    ],
    realWorldExample: {
      company: "Đối soát tháng đầu tiên",
      description:
        "Một đội ghi nhận doanh thu ngay khi nhận phản hồi thành công và mở khoá tính năng cho người dùng luôn. Cuối tháng, bảng kê từ cổng ít hơn con số của họ vài phần trăm: một số giao dịch bị hoàn, một số bị đánh dấu nghi ngờ và giữ lại, và phí thì trừ trên từng giao dịch chứ không trừ một lần. Không con số nào sai; chúng chỉ đang đo hai thứ khác nhau.",
    },
    quiz: [
      {
        question: "Vì sao mỗi giao dịch cần một mã tham chiếu do phía bạn sinh ra?",
        options: [
          "Để đối chiếu được bảng kê của cổng với dữ liệu của mình",
          "Để người dùng có thể tra cứu lại lịch sử giao dịch của họ khi cần hỗ trợ",
          "Để tránh trường hợp hai giao dịch khác nhau bị cổng gán trùng mã định danh",
          "Để phân biệt giao dịch giữa các cổng",
        ],
        correct: 0,
        explanation:
          "Bảng kê của cổng dùng mã của họ, dữ liệu của bạn dùng mã của bạn, và nối hai bên lại là toàn bộ công việc đối soát. Một mã tham chiếu do bạn sinh và gửi kèm mỗi giao dịch biến việc dò ngược hàng nghìn dòng thành một phép ghép đơn giản.",
      },
      {
        question: "Xử lý thế nào khi người dùng bấm thanh toán hai lần?",
        options: [
          "Dùng khoá chống trùng theo mã tham chiếu, không dựa vào giao diện",
          "Vô hiệu hoá nút thanh toán ngay sau lần bấm đầu tiên để tránh gửi trùng yêu cầu",
          "Kiểm tra thời gian giữa hai yêu cầu và bỏ qua yêu cầu thứ hai nếu quá gần nhau",
          "Đối chiếu số tiền và người dùng để tìm trùng",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều giảm khả năng xảy ra và không cách nào loại bỏ được nó, vì yêu cầu trùng có thể đến từ mạng chập chờn hoặc từ chính cổng gửi lại. Khoá theo mã tham chiếu ở phía máy chủ là chỗ duy nhất đảm bảo được rằng cùng một mã chỉ trừ tiền một lần.",
      },
      {
        question: "Phí giao dịch của các cổng ở Việt Nam khác nhau ở điểm nào đáng chú ý?",
        options: [
          "Có cổng tính theo tỷ lệ, có cổng tính cố định mỗi giao dịch",
          "Mức phí thay đổi theo tổng doanh số mà đơn vị bán hàng đạt được trong tháng",
          "Phí được trừ vào cuối kỳ đối soát chứ không trừ trên từng giao dịch riêng lẻ",
          "Cổng trong nước phí thấp hơn cổng ngoại",
        ],
        correct: 0,
        explanation:
          "Khác biệt về cấu trúc quan trọng hơn khác biệt về mức. Với giao dịch giá trị nhỏ, một khoản cố định vài nghìn đồng có thể ăn phần lớn biên lợi nhuận, trong khi tỷ lệ phần trăm thì không. Chọn cổng vì thế phụ thuộc vào phân bố giá trị giao dịch của chính sản phẩm bạn.",
      },
      {
        question: "Nên xử lý thế nào với giao dịch ở trạng thái chưa rõ kết quả?",
        options: [
          "Hỏi lại cổng theo mã tham chiếu, và không đoán từ phía mình",
          "Coi là thất bại và hoàn lại quyền lợi cho người dùng để tránh thiệt hại cho họ",
          "Coi là thành công và mở quyền lợi vì phần lớn giao dịch loại này sau đó đều thành công",
          "Chờ tới kỳ đối soát để biết kết quả chính xác rồi mới cập nhật trạng thái đơn hàng",
        ],
        correct: 0,
        explanation:
          "Mọi cổng đều có một cách để hỏi lại trạng thái của một giao dịch, và đó là nguồn thông tin duy nhất đúng. Đoán theo hướng nào cũng sai một phần: đoán thất bại thì mất tiền đã thu, đoán thành công thì mở quyền lợi cho giao dịch chưa trả tiền, và chờ tới đối soát thì người dùng đợi nhiều ngày.",
      },
      {
        question: "Vì sao nên nối nhiều hơn một cổng thanh toán?",
        options: [
          "Vì mỗi cổng phục vụ một nhóm người dùng khác nhau, và vì cổng cũng hỏng",
          "Vì có thể so sánh mức phí giữa các cổng và chọn cổng rẻ nhất cho từng giao dịch",
          "Vì mỗi cổng có giới hạn giao dịch cùng lúc",
          "Vì việc nối nhiều cổng giúp tăng độ tin cậy trong mắt người dùng khi thanh toán",
        ],
        correct: 0,
        explanation:
          "Hai lý do gộp lại, và cả hai đều đủ mạnh khi đứng riêng. Người quen dùng ví sẽ bỏ giỏ hàng nếu chỉ có thẻ, và ngược lại. Còn khi một cổng gặp sự cố thì không có cổng thứ hai nghĩa là doanh thu về không trong suốt thời gian đó, chứ không phải giảm.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn sắp nối cổng thanh toán đầu tiên cho một sản phẩm bán gói nhỏ. Việc nào quan trọng nhất phải làm đúng ngay từ đầu?",
      options: [
        "Sinh mã tham chiếu riêng và khoá chống trùng theo mã đó ở phía máy chủ",
        "Chọn cổng có mức phí thấp nhất để tối ưu biên lợi nhuận trên mỗi giao dịch bán ra",
        "Thiết kế giao diện thanh toán mượt để giảm tỷ lệ người dùng bỏ giữa chừng",
        "Chuẩn bị sẵn quy trình xử lý các yêu cầu hoàn tiền từ phía người dùng",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều sửa được về sau mà không mất dữ liệu. Mã tham chiếu và khoá chống trùng thì không: thiếu chúng, mọi giao dịch đã đi qua đều không đối soát ngược được, và số lần trừ tiền hai lần chỉ lộ ra qua khiếu nại của người dùng.",
    },
    keyTakeaways: [
      "Phản hồi thành công nói giao dịch được chấp nhận, không nói tiền đã về",
      "Mã tham chiếu do bạn sinh là thứ nối được bảng kê của cổng với dữ liệu của mình",
      "Cấu trúc phí quan trọng hơn mức phí khi giao dịch giá trị nhỏ",
      "Trạng thái chưa rõ thì hỏi lại cổng, đừng đoán theo hướng nào",
    ],
    summary: {
      keyIdea: "Giao dịch được chấp nhận và tiền về tài khoản là hai sự kiện cách nhau nhiều ngày",
      commonMistake: "Ghi nhận doanh thu theo phản hồi tức thời, rồi lệch với bảng kê ở kỳ đối soát đầu tiên",
      action: "Sinh mã tham chiếu riêng cho mỗi giao dịch và khoá chống trùng theo mã đó ngay từ phiên bản đầu.",
    },
    application: {
      title: "Ba thứ làm đúng trước khi mở bán",
      message:
        "Mã tham chiếu riêng cho mỗi giao dịch, khoá chống trùng ở máy chủ, và một đường hỏi lại trạng thái theo mã đó.",
      secondary:
        "Ghi lại cả trạng thái của cổng lẫn trạng thái của bạn thành hai trường riêng - gộp chúng vào một trường là cách đối soát trở thành bất khả thi.",
    },
    sections: [
      {
        type: "lead",
        text: "Người dùng Việt Nam trả tiền theo nhiều đường hơn hẳn so với giả định mặc định của phần lớn thư viện thanh toán, và mỗi đường có một mô hình riêng về lúc nào giao dịch được coi là xong.",
      },
      {
        type: "conceptTable",
        title: "Ba đường tiền và đặc điểm của từng đường",
        concepts: [
          {
            vi: "Ví điện tử",
            en: "E-wallet",
            def: "Người dùng xác nhận trong ứng dụng ví. Tỷ lệ hoàn tất cao, và bạn phụ thuộc vào việc ví đó đang chạy.",
          },
          {
            vi: "Thẻ nội địa",
            en: "Domestic card",
            def: "Đi qua chuyển mạch trong nước. Luồng khác thẻ quốc tế, nên đừng giả định cùng một mã lỗi.",
          },
          {
            vi: "Chuyển khoản nhanh",
            en: "Instant transfer",
            def: "Mã QR hoặc số tài khoản. Rẻ nhất, và đối soát khó nhất vì phải khớp theo nội dung chuyển khoản.",
          },
          {
            vi: "Thẻ quốc tế",
            en: "International card",
            def: "Phí cao hơn, tỷ lệ từ chối cao hơn với thẻ phát hành trong nước, nhưng cần cho người dùng ngoài nước.",
          },
        ],
      },
      {
        type: "heading",
        text: "Hai trạng thái, không phải một",
      },
      {
        type: "paragraph",
        text: "Sản phẩm cần lưu riêng hai thứ: cổng nói gì về giao dịch này, và bạn đã cấp quyền lợi cho người dùng chưa. Gộp chúng vào một trường nghe gọn hơn và làm việc đối soát trở thành bất khả thi, vì khi bảng kê lệch bạn không còn cách nào biết dòng nào lệch ở vế nào.",
      },
      {
        type: "callout",
        label: "Một cổng duy nhất nghĩa là doanh thu về không khi nó hỏng",
        text: "Cổng thanh toán cũng có sự cố, và trong thời gian đó sản phẩm của bạn không thu được đồng nào chứ không phải thu ít đi. Nối cổng thứ hai tốn công một lần và nó cũng giải quyết luôn vấn đề khác: nhóm người dùng quen một cách trả tiền sẽ bỏ giỏ hàng nếu chỉ có cách còn lại.",
      },
      {
        type: "closing",
        lines: [
          "Đối soát không phải việc của bộ phận kế toán; nó là hệ quả của những quyết định thiết kế ở tuần đầu tiên.",
          "Bài sau: biết người dùng là ai, và giới hạn của mọi cách xác thực.",
        ],
      },
    ],
  },
  {
    id: 1452,
    slug: "dinh-danh-va-xac-thuc-nguoi-dung-vn",
    title: "Thị trường VN, Bài 2: Định danh và xác thực - biết người dùng là ai tới mức nào",
    subtitle: "Mỗi mức xác thực đắt hơn mức trước một bậc, và phần lớn sản phẩm mua nhầm mức",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🪪",
    track: "professional",
    whyItMatters:
      "Xác thực yếu thì sản phẩm bị lạm dụng; xác thực chặt thì mất phần lớn người dùng ở bước đăng ký. Chọn đúng mức là một quyết định sản phẩm chứ không phải quyết định bảo mật, và nó hay được đưa ra bởi người không nhìn cả hai vế.",
    openingQuestion: "Mức xác thực nên được chọn dựa trên tiêu chí nào?",
    openingOptions: [
      "Thiệt hại lớn nhất mà một tài khoản giả có thể gây ra",
      "Yêu cầu của pháp luật đối với loại hình dịch vụ mà sản phẩm đang cung cấp",
      "Mức mà các sản phẩm cùng loại trên thị trường đang áp dụng cho người dùng của họ",
      "Khả năng kỹ thuật và ngân sách mà đội có thể dành cho phần xác thực người dùng",
    ],
    correctOption: 0,
    explanation:
      "Quy định pháp luật là sàn bắt buộc và nó chỉ nói mức tối thiểu cho vài loại dịch vụ. Trên sàn đó, câu hỏi đúng là một tài khoản giả làm được gì tệ nhất: với một ứng dụng ghi chú thì gần như không gì, với một sản phẩm có ví nội bộ thì là rút tiền của người khác. Hai trường hợp ấy cần hai mức khác hẳn nhau, và áp cùng một mức cho cả hai thì hoặc bạn đang chặn người dùng thật vô cớ, hoặc đang mở cửa cho lạm dụng. Nhìn sang đối thủ không trả lời được vì mô hình thiệt hại của họ có thể khác hẳn của bạn.",
    diagram: [
      { label: "Không xác thực: dùng ngay, lạm dụng dễ", arrow: true },
      { label: "Số điện thoại: chặn được phần lớn tài khoản rác", arrow: true },
      { label: "Căn cước và đối chiếu khuôn mặt: chặn gần hết", arrow: true },
      { label: "Mỗi bậc mất một phần người dùng thật" },
    ],
    realWorldExample: {
      company: "Bắt xác thực căn cước ở bước đăng ký",
      description:
        "Một sản phẩm cộng đồng bắt người dùng chụp căn cước ngay khi mở tài khoản, vì đội muốn ngăn tài khoản ảo. Tỷ lệ hoàn tất đăng ký rơi xuống dưới một phần ba. Sau khi chuyển sang xác thực số điện thoại lúc đăng ký và chỉ yêu cầu căn cước khi người dùng muốn rút tiền, cả hai con số đều tốt lên - số người dùng thật và số tài khoản bị chặn.",
    },
    quiz: [
      {
        question: "Vì sao nên xác thực theo từng bậc thay vì một lần lúc đăng ký?",
        options: [
          "Vì người dùng chấp nhận bước khó khi họ đã thấy giá trị của sản phẩm",
          "Vì chia nhỏ thì đỡ tải giờ cao điểm",
          "Vì các nhà cung cấp dịch vụ xác thực tính phí theo số lần gọi nên chia nhỏ sẽ rẻ hơn",
          "Vì quy định pháp luật yêu cầu xác thực ở những thời điểm cụ thể trong quá trình dùng",
        ],
        correct: 0,
        explanation:
          "Cùng một yêu cầu chụp căn cước cho hai kết quả hoàn toàn khác nhau tuỳ vào lúc nó xuất hiện. Ở màn hình đăng ký, nó đứng giữa người dùng và thứ họ chưa biết có đáng không. Ở bước rút tiền, nó đứng giữa họ và tiền của chính họ - và gần như ai cũng làm.",
      },
      {
        question: "Xác thực bằng số điện thoại có giới hạn gì?",
        options: [
          "Số dùng một lần mua được, nên nó chặn tài khoản rác chứ không chứng minh danh tính",
          "Tin nhắn xác thực có thể bị chậm hoặc không đến với một số nhà mạng nhất định",
          "Người dùng có thể đổi số điện thoại khiến tài khoản mất đường khôi phục về sau",
          "Chi phí gửi tin nhắn xác thực tăng nhanh khi số lượng người dùng tăng lên",
        ],
        correct: 0,
        explanation:
          "Ba vấn đề kia đều có thật và đều là chuyện vận hành. Giới hạn ở đây là chuyện bản chất: số điện thoại chứng minh người đăng ký kiểm soát được một số, không chứng minh họ là ai. Với mục tiêu chặn tài khoản hàng loạt thì nó đủ; với mục tiêu ràng buộc trách nhiệm thì không.",
      },
      {
        question: "Đối chiếu khuôn mặt với ảnh trên giấy tờ chủ yếu giải quyết vấn đề gì?",
        options: [
          "Người nộp giấy tờ có phải chủ của giấy tờ đó không",
          "Giấy tờ được nộp có phải là giấy tờ thật do cơ quan có thẩm quyền cấp hay không",
          "Thông tin trên giấy tờ có khớp với thông tin người dùng đã khai báo hay không",
          "Người dùng có đủ điều kiện về độ tuổi để sử dụng dịch vụ hay không",
        ],
        correct: 0,
        explanation:
          "Đọc được thông tin từ giấy tờ và kiểm tính hợp lệ của giấy tờ là hai bước khác, làm bằng cách khác. Bước đối chiếu khuôn mặt chỉ trả lời đúng một câu: người đang ngồi trước máy có phải người trong ảnh không - và đó là câu mà một bản chụp giấy tờ mượn được không trả lời nổi.",
      },
      {
        question: "Dữ liệu giấy tờ tuỳ thân sau khi xác thực xong nên xử lý thế nào?",
        options: [
          "Giữ kết quả xác thực và bỏ ảnh gốc, trừ khi có nghĩa vụ phải lưu",
          "Mã hoá và lưu trữ toàn bộ ảnh gốc để có căn cứ đối chiếu lại khi phát sinh tranh chấp",
          "Chuyển toàn bộ cho bên cung cấp dịch vụ xác thực lưu giữ thay vì lưu trên hệ thống mình",
          "Lưu trong thời gian tối đa mà quy định cho phép rồi mới thực hiện xoá bỏ dữ liệu",
        ],
        correct: 0,
        explanation:
          "Ảnh giấy tờ là loại dữ liệu tệ nhất khi bị rò rỉ và nó gần như không được dùng lại sau lần xác thực đầu. Giữ lại kết luận đã xác thực cùng thời điểm và mã tham chiếu thì đủ cho mọi mục đích vận hành, đồng thời loại bỏ hẳn thứ đáng bị lấy cắp nhất trong hệ thống.",
      },
      {
        question: "Sản phẩm không thu tiền và không có ví nội bộ thì nên xác thực tới đâu?",
        options: [
          "Đủ để chặn tạo tài khoản hàng loạt, không hơn",
          "Ở mức tối thiểu mà quy định pháp luật yêu cầu đối với loại dịch vụ đó",
          "Bằng mức của các sản phẩm cùng loại để không bị đánh giá là kém an toàn hơn",
          "Càng chặt càng tốt vì dữ liệu người dùng luôn có giá trị cần được bảo vệ",
        ],
        correct: 0,
        explanation:
          "Câu hỏi luôn là thiệt hại lớn nhất mà một tài khoản giả gây ra được. Khi câu trả lời là làm nhiễu cộng đồng và tốn hạ tầng, thì một lớp chặn tự động hoá là đủ, và mỗi bậc thêm vào chỉ mua được rất ít trong khi mất một phần người dùng thật.",
      },
    ],
    practicePrompt: {
      question:
        "Sản phẩm của bạn cho người dùng nạp tiền vào ví nội bộ và rút ra. Nên đặt các bước xác thực ở đâu?",
      options: [
        "Số điện thoại lúc đăng ký, căn cước và đối chiếu khuôn mặt trước lần rút đầu tiên",
        "Căn cước và khuôn mặt ngay lúc đăng ký",
        "Số điện thoại lúc đăng ký, căn cước khi số dư lớn",
        "Xác thực căn cước trước lần nạp tiền đầu",
      ],
      correct: 0,
      explanation:
        "Rút tiền là chỗ thiệt hại xảy ra, nên đó là chỗ đặt bậc xác thực đắt nhất. Đặt ở lúc nạp thì chặn nhầm chiều: tiền đi vào không gây thiệt hại cho ai, và một yêu cầu nặng ngay lúc đó làm mất chính những người dùng đang định trả tiền cho bạn.",
    },
    keyTakeaways: [
      "Mức xác thực chọn theo thiệt hại lớn nhất mà tài khoản giả gây ra được",
      "Cùng một yêu cầu ở màn hình đăng ký và ở bước rút tiền cho hai kết quả khác hẳn",
      "Số điện thoại chứng minh kiểm soát một số, không chứng minh danh tính",
      "Giữ kết quả xác thực, bỏ ảnh gốc - thứ đáng bị lấy cắp nhất thì đừng giữ",
    ],
    summary: {
      keyIdea: "Xác thực là quyết định sản phẩm về đánh đổi, không phải quyết định bảo mật về mức độ chặt",
      commonMistake: "Đặt bậc xác thực nặng nhất ở màn hình đăng ký, nơi người dùng chưa thấy giá trị gì",
      action: "Vẽ ra hành động gây thiệt hại lớn nhất trong sản phẩm, rồi đặt bậc xác thực đắt nhất ngay trước nó.",
    },
    application: {
      title: "Đặt bậc xác thực theo thiệt hại, không theo thời điểm đăng ký",
      message:
        "Liệt kê các hành động một tài khoản làm được, xếp theo thiệt hại nếu tài khoản đó là giả. Bậc xác thực nặng nhất đặt ngay trước hành động đầu bảng.",
      secondary:
        "Sau khi xác thực xong, xoá ảnh giấy tờ và chỉ giữ kết luận cùng thời điểm - trừ khi có nghĩa vụ pháp lý buộc lưu.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi cuộc thảo luận về xác thực đều trượt về câu hỏi chặt tới mức nào. Câu hỏi đó không trả lời được nếu chưa trả lời câu trước nó: một tài khoản giả trong sản phẩm này làm được gì tệ nhất.",
      },
      {
        type: "heading",
        text: "Bốn bậc, mỗi bậc mất một phần người dùng thật",
      },
      {
        type: "list",
        items: [
          "Không xác thực: dùng được ngay, và tạo hàng loạt cũng được ngay",
          "Số điện thoại: chặn phần lớn tài khoản tự động, không chứng minh danh tính",
          "Giấy tờ tuỳ thân: ràng buộc được trách nhiệm, và mượn được của người khác",
          "Đối chiếu khuôn mặt: khớp người ngồi trước máy với ảnh trên giấy tờ",
        ],
      },
      {
        type: "paragraph",
        text: "Bậc càng cao thì càng chặn được nhiều lạm dụng và cũng mất càng nhiều người dùng thật - phần lớn không phải vì họ ngại mà vì họ đang bận, đang ở chỗ thiếu sáng, hoặc không có giấy tờ trong tay lúc đó. Vì vậy điều quan trọng không phải chọn một bậc cho cả sản phẩm mà là đặt từng bậc đúng chỗ.",
      },
      {
        type: "callout",
        label: "Đặt bậc nặng ngay trước hành động gây thiệt hại",
        text: "Cùng một yêu cầu chụp căn cước cho hai kết quả trái ngược tuỳ vào lúc nó xuất hiện. Ở màn hình đăng ký, nó đứng giữa người dùng và thứ họ chưa biết có đáng không, nên phần lớn bỏ đi. Ở bước rút tiền, nó đứng giữa họ và tiền của chính họ, nên gần như ai cũng làm - cùng mức bảo vệ, khác hẳn về chi phí.",
      },
      {
        type: "closing",
        lines: [
          "Xác thực chặt không phải là an toàn hơn; nó chỉ là đắt hơn, và đắt ở phía người dùng thật.",
          "Bài sau: khi một mắt xích trong chuỗi thanh toán hỏng, chuyện gì xảy ra với phần còn lại.",
        ],
      },
    ],
  },
  {
    id: 1453,
    slug: "giai-phau-mot-su-co-thanh-toan",
    title: "Thị trường VN, Bài 3: Giải phẫu một sự cố dây chuyền",
    subtitle: "Một mắt xích hỏng, và mọi thứ dựng trên giả định nó luôn chạy cùng hỏng theo",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Sự cố ở một nhà cung cấp bên ngoài là loại sự cố mà đội không sửa được, nên phản ứng duy nhất có ích phải được chuẩn bị từ trước. Phần lớn đội chuẩn bị cho việc hệ thống của mình hỏng, và không chuẩn bị cho việc thứ mình gọi tới hỏng.",
    openingQuestion: "Khi cổng thanh toán ngừng phản hồi, thiệt hại lớn nhất thường đến từ đâu?",
    openingOptions: [
      "Từ những giao dịch treo ở trạng thái không rõ, chứ không từ giao dịch thất bại",
      "Từ doanh thu bị mất trong khoảng thời gian dịch vụ không hoạt động được",
      "Từ việc người dùng chuyển sang sử dụng sản phẩm của đối thủ trong lúc chờ đợi",
      "Từ chi phí nhân sự phải huy động ngoài giờ",
    ],
    correctOption: 0,
    explanation:
      "Một giao dịch thất bại rõ ràng thì dễ: báo người dùng, không trừ tiền, mời thử lại. Thứ tốn kém là nhóm treo ở giữa - đã gửi đi và không biết cổng đã nhận chưa, đã trừ tiền chưa. Với mỗi giao dịch loại đó, bạn không thể mở quyền lợi mà cũng không dám báo thất bại, vì cả hai hướng đều sai với một phần trong số chúng. Chúng phải được đối soát từng cái sau khi cổng hoạt động lại, và trong lúc chờ thì người dùng gọi tới. Doanh thu mất trong lúc gián đoạn có thật nhưng nó tự phục hồi khi dịch vụ trở lại; nhóm treo thì không tự giải quyết.",
    diagram: [
      { label: "Cổng ngừng phản hồi", arrow: true },
      { label: "Giao dịch mới thất bại rõ - xử lý được", arrow: true },
      { label: "Giao dịch đang dở treo ở trạng thái không rõ", arrow: true },
      { label: "Phải đối soát từng cái sau khi cổng trở lại" },
    ],
    realWorldExample: {
      company: "Bốn mươi phút và ba ngày",
      description:
        "Một cổng thanh toán gián đoạn bốn mươi phút vào buổi tối. Doanh thu mất trong bốn mươi phút ấy nhỏ và phục hồi ngay hôm sau. Thứ kéo dài ba ngày là hơn hai nghìn giao dịch treo: đội phải hỏi lại từng mã tham chiếu, đối chiếu với bảng kê, hoàn tiền cho nhóm bị trừ mà không được mở quyền lợi, và trả lời khiếu nại trong suốt thời gian đó.",
    },
    quiz: [
      {
        question: "Chuẩn bị nào giúp nhiều nhất cho một sự cố ở nhà cung cấp bên ngoài?",
        options: [
          "Một quy trình đối soát chạy được cho hàng nghìn giao dịch treo",
          "Cơ chế tự động chuyển sang cổng dự phòng ngay khi phát hiện cổng chính có vấn đề",
          "Hệ thống theo dõi phát hiện sớm bất thường",
          "Thoả thuận mức dịch vụ với nhà cung cấp kèm điều khoản bồi thường khi gián đoạn",
        ],
        correct: 0,
        explanation:
          "Ba thứ kia giảm được tần suất hoặc độ dài của sự cố và không thứ nào xử lý được phần đắt nhất là nhóm treo. Nhóm ấy vẫn hình thành kể cả khi bạn chuyển sang cổng dự phòng sau ba mươi giây, và nó phải được giải quyết từng cái - nên có sẵn công cụ làm việc đó là khác biệt giữa ba ngày và một buổi.",
      },
      {
        question: "Vì sao chuyển sang cổng dự phòng không giải quyết được nhóm treo?",
        options: [
          "Vì những giao dịch đã gửi đi vẫn nằm ở cổng cũ và chờ nó trả lời",
          "Vì cổng dự phòng dùng mã tham chiếu khác nên không đối chiếu được với cổng chính",
          "Vì chuyển đổi cần thời gian nên vẫn lọt",
          "Vì người dùng phải thực hiện lại giao dịch từ đầu trên cổng mới được chuyển sang",
        ],
        correct: 0,
        explanation:
          "Cổng dự phòng cứu được các giao dịch sắp tới, và các giao dịch đã đi rồi thì không rút lại được. Trạng thái của chúng nằm ở cổng cũ và chỉ cổng cũ mới trả lời được - nên khoảng treo luôn hình thành, và độ lớn của nó phụ thuộc vào lưu lượng chứ không vào tốc độ bạn phản ứng.",
      },
      {
        question: "Nên nói gì với người dùng trong lúc sự cố đang diễn ra?",
        options: [
          "Nói rõ giao dịch đang chờ xác nhận và đừng thử lại, kèm mốc thời gian phản hồi",
          "Báo hệ thống đang bảo trì, mời quay lại sau",
          "Giữ im lặng cho tới khi biết rõ nguyên nhân",
          "Xin lỗi và cam kết hoàn tiền toàn bộ",
        ],
        correct: 0,
        explanation:
          "Câu quan trọng nhất là đừng thử lại, vì mỗi lần thử lại sinh thêm một giao dịch treo và làm khối lượng đối soát phình lên. Cam kết hoàn tiền toàn bộ khi chưa biết ai bị trừ thì tạo ra một lời hứa bạn có thể không giữ đúng theo cách người ta hiểu.",
      },
      {
        question: "Sau khi cổng hoạt động lại, thứ tự xử lý nên thế nào?",
        options: [
          "Đối soát nhóm treo trước, rồi mới mở lại luồng giao dịch mới",
          "Mở lại luồng mới ngay cho kịp doanh thu",
          "Xử lý các khiếu nại đã nhận trước vì đó là nhóm người dùng đang bị ảnh hưởng nặng nhất",
          "Rà soát nguyên nhân sự cố để đảm bảo nó không tái diễn trước khi mở lại dịch vụ",
        ],
        correct: 0,
        explanation:
          "Mở luồng mới trước thì nhóm treo bị trộn với giao dịch mới và việc phân biệt trở nên khó hơn nhiều, nhất là khi cùng người dùng thử lại. Đối soát trước tốn thêm ít phút và giữ cho hai tập hợp tách bạch - đó là khác biệt lớn nhất về khối lượng công việc phía sau.",
      },
      {
        question: "Ghi nhật ký thế nào để đối soát được sau sự cố?",
        options: [
          "Ghi lại thời điểm gửi đi và mã tham chiếu, trước khi nhận được phản hồi",
          "Ghi toàn bộ yêu cầu và phản hồi với cổng",
          "Ghi giao dịch thất bại kèm mã lỗi của cổng",
          "Ghi thay đổi trạng thái theo trình tự",
        ],
        correct: 0,
        explanation:
          "Đây là điểm dễ bỏ sót nhất: nếu chỉ ghi khi có phản hồi thì đúng những giao dịch treo lại là những giao dịch không có dòng nhật ký nào. Ghi trước khi gửi đảm bảo mọi thứ đã đi ra ngoài đều để lại dấu vết, kể cả khi không có gì quay về.",
      },
    ],
    practicePrompt: {
      question:
        "Cổng thanh toán vừa ngừng phản hồi và bạn có khoảng một nghìn giao dịch trong năm phút qua. Việc đầu tiên nên làm là gì?",
      options: [
        "Chặn luồng giao dịch mới và báo người dùng đừng thử lại",
        "Chuyển ngay sang cổng dự phòng để người dùng vẫn thanh toán được bình thường",
        "Liên hệ nhà cung cấp để nắm tình hình và ước lượng thời gian khắc phục sự cố",
        "Rà soát nhật ký để xác định chính xác bao nhiêu giao dịch đang ở trạng thái treo",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều nên làm trong vài phút tiếp theo. Việc này phải làm trước vì nó là việc duy nhất ngăn khối lượng đối soát tiếp tục phình ra: mỗi phút để luồng chạy tiếp và mỗi lần người dùng thử lại đều cộng thêm vào nhóm treo, và nhóm đó mới là phần tốn ba ngày.",
    },
    keyTakeaways: [
      "Giao dịch thất bại rõ thì dễ; nhóm treo ở giữa mới là phần đắt",
      "Cổng dự phòng cứu giao dịch sắp tới, không cứu được giao dịch đã gửi",
      "Câu quan trọng nhất nói với người dùng là đừng thử lại",
      "Ghi nhật ký trước khi gửi, nếu không thì đúng nhóm treo lại không có dấu vết",
    ],
    summary: {
      keyIdea: "Sự cố ở nhà cung cấp không đo bằng thời gian gián đoạn mà bằng số giao dịch treo nó để lại",
      commonMistake: "Ưu tiên khôi phục luồng mới, khiến nhóm treo trộn với giao dịch mới và khó tách ra",
      action: "Chuẩn bị sẵn công cụ hỏi lại trạng thái hàng loạt theo mã tham chiếu, trước khi cần tới nó.",
    },
    application: {
      title: "Một kịch bản viết sẵn, đọc được lúc hoảng",
      message:
        "Bốn dòng: chặn luồng mới, báo người dùng đừng thử lại, hỏi lại trạng thái hàng loạt, rồi mới mở lại. Dán nó ở chỗ ai trực cũng thấy.",
      secondary:
        "Kiểm rằng nhật ký ghi mã tham chiếu trước khi gửi yêu cầu đi - đó là điều kiện để bước thứ ba chạy được.",
    },
    sections: [
      {
        type: "lead",
        text: "Sự cố ở một nhà cung cấp bên ngoài khác mọi sự cố khác ở một điểm: đội không sửa được nguyên nhân. Toàn bộ phần việc còn lại là hạn chế hậu quả, và phần đó phải được chuẩn bị trước.",
      },
      {
        type: "heading",
        text: "Ba nhóm giao dịch, ba số phận",
      },
      {
        type: "list",
        items: [
          "Thất bại rõ ràng: báo người dùng, không trừ tiền, mời thử lại sau",
          "Thành công rõ ràng: xử lý bình thường, không cần làm gì thêm",
          "Treo ở giữa: không biết cổng nhận chưa, không biết đã trừ tiền chưa",
          "Nhóm thứ ba là toàn bộ chi phí thật của sự cố",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đo sự cố bằng thời gian gián đoạn",
          text: "Bốn mươi phút, doanh thu mất một khoản nhỏ, hôm sau phục hồi. Con số này đúng và nó là con số nhỏ nhất trong toàn bộ câu chuyện.",
        },
        right: {
          label: "Đo bằng số giao dịch treo",
          text: "Hai nghìn giao dịch phải hỏi lại từng cái, hoàn tiền cho một phần, và trả lời khiếu nại trong ba ngày. Đây mới là quy mô thật.",
        },
      },
      {
        type: "callout",
        label: "Đừng thử lại là câu quan trọng nhất",
        text: "Mỗi lần một người dùng bấm thử lại trong lúc sự cố đang diễn ra, họ tạo thêm một giao dịch treo và có thể tự trừ tiền mình lần thứ hai. Một dòng thông báo rõ ràng ngay trên màn hình thanh toán làm khối lượng đối soát nhỏ đi nhiều lần, và nó là biện pháp rẻ nhất trong toàn bộ danh sách phản ứng.",
      },
      {
        type: "closing",
        lines: [
          "Thứ bạn chuẩn bị được cho một sự cố ngoài tầm kiểm soát không phải cách sửa, mà là cách dọn.",
          "Bài sau: những nghĩa vụ với người dùng mà sản phẩm phải làm được, không phải nên làm.",
        ],
      },
    ],
  },
  {
    id: 1454,
    slug: "nghia-vu-voi-nguoi-dung-va-khieu-nai",
    title: "Thị trường VN, Bài 4: Nghĩa vụ với người dùng - lớp bảo vệ đầu tiên",
    subtitle: "Điều khoản, đường khiếu nại và chính sách hoàn tiền là tính năng, không phải giấy tờ",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "professional",
    whyItMatters:
      "Ba thứ này thường được giao cho người ngoài đội kỹ thuật viết vào phút cuối, rồi đội kỹ thuật là người phải dựng ra thứ thực hiện được chúng. Viết trước thì chúng định hình thiết kế; viết sau thì chúng thành một danh sách việc phải chắp vá.",
    openingQuestion: "Vì sao chính sách hoàn tiền nên được quyết trước khi dựng luồng thanh toán?",
    openingOptions: [
      "Vì nó quyết định dữ liệu nào phải lưu và trạng thái nào phải có",
      "Vì đây là yêu cầu bắt buộc về mặt pháp lý trước khi được phép thu tiền của khách",
      "Vì người dùng thường đọc chính sách hoàn tiền trước khi quyết định mua sản phẩm",
      "Vì việc thay đổi chính sách sau khi đã công bố sẽ ảnh hưởng tới uy tín của sản phẩm",
    ],
    correctOption: 0,
    explanation:
      "Một chính sách hoàn tiền trong bảy ngày buộc hệ thống phải biết mỗi giao dịch xảy ra lúc nào, người dùng đã dùng tới đâu, và phần nào đã tiêu. Một chính sách hoàn theo tỷ lệ còn cần thêm dữ liệu về mức sử dụng. Nếu chính sách được viết sau khi luồng đã chạy, những dữ liệu ấy có thể chưa từng được lưu, và không có cách nào lấy lại cho các giao dịch đã qua. Đây là lý do một câu trong tài liệu chính sách có thể tốn nhiều tuần công - không phải vì nó khó thực hiện, mà vì nó đòi một thứ mà hệ thống đã bỏ lỡ cơ hội ghi lại.",
    diagram: [
      { label: "Quyết chính sách hoàn tiền và khiếu nại trước", arrow: true },
      { label: "Suy ra dữ liệu và trạng thái phải lưu", arrow: true },
      { label: "Dựng luồng thanh toán trên nền đó", arrow: true },
      { label: "Đảo thứ tự thì phải chắp vá, và mất dữ liệu cũ" },
    ],
    realWorldExample: {
      company: "Một câu trong điều khoản, ba tuần công",
      description:
        "Bộ phận pháp chế bổ sung một câu cho phép hoàn tiền theo tỷ lệ phần chưa dùng. Hệ thống lúc đó chỉ lưu thời điểm mua và trạng thái đang hoạt động, không lưu mức đã dùng. Đội mất ba tuần để bổ sung việc ghi nhận, và với toàn bộ người dùng cũ thì không có cách nào tính được tỷ lệ - nên họ phải hoàn toàn phần cho nhóm ấy.",
    },
    quiz: [
      {
        question: "Đường khiếu nại tối thiểu mà một sản phẩm cần có là gì?",
        options: [
          "Một kênh nhận được phản ánh và một cách tra lại giao dịch theo mã",
          "Một số điện thoại hỗ trợ hoạt động trong giờ hành chính các ngày làm việc trong tuần",
          "Một biểu mẫu trên trang web cho phép người dùng mô tả chi tiết vấn đề gặp phải",
          "Một địa chỉ thư điện tử công khai",
        ],
        correct: 0,
        explanation:
          "Kênh nhận thì cách nào cũng được và ba phương án kia đều là kênh. Vế thứ hai mới là vế hay thiếu: nhận được phản ánh mà không tra ngược được giao dịch theo mã thì mỗi khiếu nại thành một cuộc điều tra thủ công, và thời gian xử lý tăng theo số người dùng.",
      },
      {
        question: "Điều khoản dịch vụ nên được viết vào lúc nào trong quá trình làm sản phẩm?",
        options: [
          "Trước khi chốt thiết kế luồng chính, vì nó ràng buộc thiết kế",
          "Sau khi sản phẩm đã hoàn thiện để mô tả chính xác những gì sản phẩm thực sự làm",
          "Song song với việc phát triển và cập nhật dần theo các tính năng được bổ sung",
          "Trước khi phát hành, đủ sớm để pháp chế rà",
        ],
        correct: 0,
        explanation:
          "Viết sau để mô tả đúng thứ đã làm nghe hợp lý và nó bỏ mất chức năng chính của tài liệu này: nó nêu ra những nghĩa vụ mà hệ thống phải có khả năng thực hiện. Phát hiện một nghĩa vụ như vậy sau khi luồng đã chạy thường có nghĩa là dữ liệu cần thiết đã không được ghi.",
      },
      {
        question: "Người dùng muốn xoá tài khoản thì hệ thống cần làm được gì?",
        options: [
          "Xoá được trong ứng dụng, và biết dữ liệu nào buộc phải giữ lại",
          "Xoá toàn bộ dữ liệu liên quan tới người dùng đó khỏi mọi hệ thống đang lưu trữ",
          "Ngừng dùng dữ liệu của họ từ lúc yêu cầu",
          "Chuyển dữ liệu sang trạng thái lưu trữ và xoá hẳn sau một thời gian nhất định",
        ],
        correct: 0,
        explanation:
          "Xoá sạch mọi thứ nghe đúng và nó xung đột với các nghĩa vụ khác: hoá đơn và bản ghi giao dịch thường phải giữ theo quy định. Hệ thống cần phân biệt được hai nhóm dữ liệu ấy từ trước, vì tách chúng ra sau khi đã trộn chung là công việc rất lớn.",
      },
      {
        question: "Thay đổi điều khoản khi sản phẩm đã có người dùng nên xử lý ra sao?",
        options: [
          "Báo trước và ghi lại ai đã đồng ý với phiên bản nào",
          "Cập nhật tài liệu trên trang web và coi việc tiếp tục sử dụng là đã chấp nhận",
          "Yêu cầu toàn bộ người dùng đồng ý lại với phiên bản mới trước khi dùng tiếp",
          "Chỉ thông báo với những người dùng bị ảnh hưởng trực tiếp bởi phần thay đổi",
        ],
        correct: 0,
        explanation:
          "Vế ghi lại là vế kỹ thuật và nó hay bị bỏ qua. Khi có tranh chấp, câu hỏi luôn là người này đã đồng ý với điều khoản nào và vào lúc nào - và câu đó chỉ trả lời được nếu hệ thống đã lưu phiên bản cùng thời điểm chấp nhận cho từng người.",
      },
      {
        question: "Vì sao nên coi ba thứ này là tính năng chứ không phải giấy tờ?",
        options: [
          "Vì chúng đều cần dữ liệu, trạng thái và giao diện để thực hiện được",
          "Vì chúng ảnh hưởng trực tiếp tới trải nghiệm và mức độ hài lòng của người dùng",
          "Vì tuân thủ đúng là lợi thế cạnh tranh",
          "Vì bộ phận pháp chế không đủ hiểu biết kỹ thuật để viết chúng một cách chính xác",
        ],
        correct: 0,
        explanation:
          "Một chính sách không có dữ liệu để thực hiện thì chỉ là một câu văn, và câu văn đó vẫn ràng buộc bạn. Coi chúng là tính năng nghĩa là đưa chúng vào cùng cuộc thảo luận thiết kế với mọi tính năng khác, ở cùng thời điểm - đó là toàn bộ nội dung của bài này.",
      },
    ],
    practicePrompt: {
      question:
        "Sản phẩm sắp mở bán và điều khoản dịch vụ chưa được viết. Nên xử lý thế nào?",
      options: [
        "Viết trước phần nghĩa vụ, rồi kiểm hệ thống có đủ dữ liệu thực hiện không",
        "Dùng mẫu điều khoản của sản phẩm cùng loại",
        "Phát hành với điều khoản tối thiểu, bổ sung sau",
        "Nhờ pháp chế soạn đầy đủ trước khi mở bán",
      ],
      correct: 0,
      explanation:
        "Bộ phận pháp chế soạn ra một tài liệu đúng luật, và họ không biết hệ thống của bạn lưu được gì. Dùng mẫu của người khác còn nguy hiểm hơn vì nó chứa những nghĩa vụ hợp lý cho sản phẩm của họ. Việc phải làm là đối chiếu từng nghĩa vụ với dữ liệu bạn đang có.",
    },
    keyTakeaways: [
      "Chính sách hoàn tiền quyết định dữ liệu nào phải lưu ngay từ giao dịch đầu tiên",
      "Nhận được khiếu nại mà không tra ngược được theo mã thì mỗi vụ là một cuộc điều tra",
      "Xoá tài khoản cần phân biệt trước dữ liệu xoá được và dữ liệu buộc phải giữ",
      "Đổi điều khoản thì phải ghi lại ai đồng ý phiên bản nào, vào lúc nào",
    ],
    summary: {
      keyIdea: "Điều khoản, khiếu nại và hoàn tiền là tính năng cần dữ liệu, không phải giấy tờ đính kèm",
      commonMistake: "Viết chính sách sau khi luồng đã chạy, rồi phát hiện dữ liệu cần thiết chưa từng được lưu",
      action: "Trước khi chốt thiết kế, liệt kê từng nghĩa vụ và đối chiếu với dữ liệu hệ thống thật sự lưu được.",
    },
    application: {
      title: "Đối chiếu nghĩa vụ với dữ liệu",
      message:
        "Với mỗi câu trong điều khoản có chứa chữ sẽ hoặc được quyền, hỏi: hệ thống có dữ liệu để làm điều đó không. Dòng nào không có là việc phải làm.",
      secondary:
        "Lưu phiên bản điều khoản kèm thời điểm chấp nhận cho từng người dùng - trường đó rẻ lúc thêm và không lấy lại được sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Điều khoản dịch vụ, đường khiếu nại và chính sách hoàn tiền thường được xếp vào nhóm giấy tờ và giao cho người ngoài đội kỹ thuật viết. Đội kỹ thuật thì là người phải dựng ra thứ thực hiện được chúng.",
      },
      {
        type: "heading",
        text: "Mỗi câu là một yêu cầu về dữ liệu",
      },
      {
        type: "conceptTable",
        title: "Bốn nghĩa vụ và dữ liệu chúng đòi hỏi",
        concepts: [
          {
            vi: "Hoàn tiền trong N ngày",
            en: "Refund window",
            def: "Cần thời điểm giao dịch và trạng thái sử dụng. Hoàn theo tỷ lệ thì cần cả mức đã dùng.",
          },
          {
            vi: "Tra cứu khiếu nại",
            en: "Dispute lookup",
            def: "Cần mã tham chiếu nối được từ phản ánh của người dùng tới giao dịch trong hệ thống.",
          },
          {
            vi: "Xoá tài khoản",
            en: "Account deletion",
            def: "Cần phân biệt trước dữ liệu xoá được với dữ liệu buộc giữ theo quy định.",
          },
          {
            vi: "Đổi điều khoản",
            en: "Terms versioning",
            def: "Cần lưu phiên bản kèm thời điểm chấp nhận cho từng người dùng, ngay từ đầu.",
          },
        ],
      },
      {
        type: "callout",
        label: "Dữ liệu không ghi thì không lấy lại được",
        text: "Đây là điều làm thứ tự quan trọng tới vậy. Một tính năng thiếu thì thêm vào lúc nào cũng được. Một trường dữ liệu không được ghi thì mọi giao dịch đã đi qua đều thiếu nó vĩnh viễn, và cách xử lý duy nhất còn lại thường là chấp nhận thiệt cho toàn bộ nhóm người dùng cũ.",
      },
      {
        type: "closing",
        lines: [
          "Một chính sách không có dữ liệu để thực hiện vẫn ràng buộc bạn; nó chỉ không thực hiện được.",
          "Bài sau: các con số về thị trường Việt Nam nói gì và giấu gì.",
        ],
      },
    ],
  },
  {
    id: 1455,
    slug: "so-lieu-thi-truong-noi-gi-va-giau-gi",
    title: "Thị trường VN, Bài 5: Số liệu thị trường nói gì và giấu gì",
    subtitle: "Con số về người dùng internet Việt Nam gần như luôn đúng và gần như luôn bị dùng sai",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Quyết định hỗ trợ nền tảng nào, tối ưu cho thiết bị nào và đặt máy chủ ở đâu đều được biện minh bằng số liệu thị trường. Những con số ấy đo tổng dân số dùng internet, còn quyết định của bạn thì phụ thuộc vào tập người dùng của riêng bạn.",
    openingQuestion: "Số liệu thị phần hệ điều hành di động toàn quốc nên được dùng thế nào?",
    openingOptions: [
      "Làm mốc ban đầu, rồi thay bằng số liệu người dùng thật của sản phẩm",
      "Làm căn cứ chính để phân bổ nguồn lực",
      "Đối chiếu với số liệu của các thị trường tương đồng trong khu vực để kiểm chứng",
      "Chia theo nhóm thu nhập để ước lượng chính xác hơn cho phân khúc bạn nhắm tới",
    ],
    correctOption: 0,
    explanation:
      "Số liệu toàn quốc đo tổng dân số dùng internet, và tập người dùng của một sản phẩm cụ thể gần như không bao giờ giống tập đó. Một sản phẩm cho lập trình viên, một sản phẩm cho tiểu thương và một sản phẩm cho học sinh có ba phân bố thiết bị hoàn toàn khác nhau, dù cùng chạy trên một thị trường. Vì vậy con số toàn quốc chỉ hữu ích ở đúng một thời điểm: khi bạn chưa có người dùng nào. Từ ngày có vài trăm người dùng thật, số liệu của chính bạn tốt hơn hẳn, và nó thường khác con số toàn quốc theo cách làm đảo ngược quyết định.",
    diagram: [
      { label: "Chưa có người dùng: dùng số liệu toàn quốc làm mốc", arrow: true },
      { label: "Có vài trăm người dùng: số của mình đã tốt hơn", arrow: true },
      { label: "Đối chiếu hai bên: chỗ lệch là chỗ đáng chú ý", arrow: true },
      { label: "Quyết định theo tập của mình, không theo tổng dân số" },
    ],
    realWorldExample: {
      company: "Bảy phần trăm và bốn mươi phần trăm",
      description:
        "Một đội đọc số liệu thị phần thấy một hệ điều hành chiếm khoảng bảy phần trăm và quyết định không hỗ trợ. Sáu tháng sau, số liệu của chính họ cho thấy hệ điều hành đó chiếm khoảng bốn mươi phần trăm doanh thu, vì sản phẩm nhắm vào nhóm người dùng trả tiền. Con số bảy phần trăm không sai; nó chỉ đang đo một tập khác.",
    },
    quiz: [
      {
        question: "Vì sao tỷ lệ theo số người dùng và tỷ lệ theo doanh thu hay lệch nhau?",
        options: [
          "Vì các nhóm người dùng khác nhau có mức chi trả rất khác nhau",
          "Vì có tài khoản mà không hoạt động",
          "Vì việc thống kê doanh thu có độ trễ so với việc thống kê số lượng người dùng",
          "Vì một số người dùng sử dụng nhiều thiết bị nên bị đếm trùng trong thống kê",
        ],
        correct: 0,
        explanation:
          "Đây là dạng lệch lớn nhất và cũng dễ đoán nhất. Nhóm ít người hơn nhưng chi nhiều hơn có thể chiếm phần lớn doanh thu, nên hai bảng xếp hạng đảo ngược nhau. Quyết định phân bổ công sức nên nhìn bảng nào phụ thuộc vào việc bạn đang tối ưu cho tăng trưởng hay cho doanh thu.",
      },
      {
        question: "Báo cáo thị trường công bố hằng năm nên được đọc kèm gì?",
        options: [
          "Phương pháp thu thập và tập mẫu mà báo cáo đó dựa vào",
          "Các báo cáo cùng chủ đề của những đơn vị khác để đối chiếu chéo số liệu",
          "Số liệu của những năm trước để xác định xu hướng thay đổi theo thời gian",
          "Phần dự báo cho các năm tiếp theo để lập kế hoạch dài hạn cho sản phẩm",
        ],
        correct: 0,
        explanation:
          "Ba việc kia đều làm sau và đều dựa vào giả định rằng con số đo đúng thứ bạn cần. Phương pháp và tập mẫu quyết định giả định đó có đúng không - một khảo sát qua ứng dụng di động sẽ bỏ sót nhóm ít dùng ứng dụng, và đó thường là chính nhóm bạn đang muốn biết về.",
      },
      {
        question: "Sản phẩm mới hoàn toàn thì nên lấy mốc từ đâu?",
        options: [
          "Số liệu toàn quốc, kèm giả định viết ra rõ ràng để kiểm lại sau",
          "Số liệu của một sản phẩm tương tự đã có mặt trên thị trường trong cùng lĩnh vực",
          "Khảo sát nhỏ với nhóm người dùng mục tiêu trước khi bắt đầu phát triển sản phẩm",
          "Ước lượng theo kinh nghiệm của đội",
        ],
        correct: 0,
        explanation:
          "Không có nguồn nào tốt khi chưa có người dùng, nên chọn nguồn nào ít quan trọng hơn việc ghi rõ giả định. Một giả định được viết ra thì kiểm lại được sau ba tháng; một giả định nằm trong đầu thì nó lặng lẽ thành sự thật và không ai xem lại.",
      },
      {
        question: "Bao nhiêu người dùng thật thì số liệu của mình bắt đầu đáng tin hơn?",
        options: [
          "Vài trăm, đủ để phân bố hiện ra dù còn thô",
          "Vài nghìn, để đảm bảo mẫu đủ lớn cho các kết luận có ý nghĩa thống kê",
          "Khi tốc độ tăng trưởng đã ổn định và cấu trúc người dùng không còn biến động nhiều",
          "Khi số người dùng đạt tỷ lệ đủ lớn so với quy mô của toàn bộ thị trường mục tiêu",
        ],
        correct: 0,
        explanation:
          "Ngưỡng thấp hơn nhiều so với cảm giác, vì bạn không cần độ chính xác cao - bạn cần biết một nhóm chiếm khoảng năm phần trăm hay khoảng bốn mươi phần trăm. Chờ tới vài nghìn nghĩa là ra quyết định bằng số liệu của người khác trong suốt giai đoạn quan trọng nhất.",
      },
      {
        question: "Số liệu của mình lệch hẳn so với số liệu thị trường thì nên hiểu thế nào?",
        options: [
          "Là thông tin về tập người dùng của bạn, và thường là thông tin đáng giá nhất",
          "Là dấu hiệu cách thu thập của bạn có vấn đề",
          "Là do mẫu còn nhỏ, sẽ hội tụ về mức chung",
          "Là do sản phẩm chưa với tới đủ các nhóm",
        ],
        correct: 0,
        explanation:
          "Phản xạ đầu tiên thường là nghi ngờ số của mình, và đôi khi đúng. Nhưng độ lệch cũng chính là thứ mô tả sản phẩm của bạn khác thị trường chung ra sao - và với một sản phẩm nhắm vào một nhóm cụ thể thì lệch là điều nên xảy ra chứ không phải lỗi.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn cần quyết định có hỗ trợ một nền tảng chiếm khoảng mười phần trăm thị phần toàn quốc không. Cần thêm gì?",
      options: [
        "Tỷ lệ nền tảng đó trong số người dùng và trong doanh thu của chính bạn",
        "Xu hướng thị phần nền tảng đó vài năm qua",
        "Chi phí phát triển và duy trì nền tảng đó",
        "Cách sản phẩm cùng loại đang xử lý ra sao",
      ],
      correct: 0,
      explanation:
        "Chi phí phát triển là vế thứ hai của phép so và nó chỉ có nghĩa khi đã biết vế thứ nhất. Mười phần trăm toàn quốc có thể là ba phần trăm hoặc bốn mươi phần trăm trong tập của bạn, và hai con số ấy dẫn tới hai quyết định ngược nhau với cùng một mức chi phí.",
    },
    keyTakeaways: [
      "Số liệu toàn quốc đo tổng dân số; quyết định của bạn phụ thuộc tập của bạn",
      "Tỷ lệ theo người dùng và theo doanh thu thường đảo ngược nhau",
      "Vài trăm người dùng thật đã đủ để số của mình tốt hơn số thị trường",
      "Độ lệch so với thị trường chung là thông tin, không phải lỗi",
    ],
    summary: {
      keyIdea: "Số liệu thị trường đúng cho tổng dân số và hiếm khi đúng cho tập người dùng của bạn",
      commonMistake: "Loại bỏ một nền tảng vì thị phần toàn quốc thấp, trong khi nó chiếm phần lớn doanh thu của mình",
      action: "Từ vài trăm người dùng đầu tiên, thay số liệu thị trường bằng số liệu của chính sản phẩm.",
    },
    application: {
      title: "Hai bảng, không phải một",
      message:
        "Dựng hai bảng phân bố: theo số người dùng và theo doanh thu. Chỗ hai bảng xếp hạng khác nhau là chỗ quyết định của bạn phụ thuộc vào việc đang tối ưu cho cái gì.",
      secondary:
        "Ghi ra giả định bạn đang dùng khi chưa có dữ liệu, kèm ngày sẽ kiểm lại - giả định không viết ra thì lặng lẽ thành sự thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi năm có vài báo cáo về người dùng internet Việt Nam, và chúng là nguồn tham chiếu duy nhất cho một sản phẩm chưa ra mắt. Vấn đề bắt đầu khi chúng vẫn là nguồn tham chiếu sau khi sản phẩm đã có người dùng.",
      },
      {
        type: "heading",
        text: "Tổng dân số và tập của bạn",
      },
      {
        type: "paragraph",
        text: "Một sản phẩm cho lập trình viên, một sản phẩm cho tiểu thương và một sản phẩm cho học sinh có ba phân bố thiết bị khác hẳn nhau trên cùng một thị trường. Con số toàn quốc là trung bình của tất cả, nên nó không mô tả đúng bất kỳ nhóm nào trong ba nhóm ấy - và độ lệch càng lớn khi sản phẩm càng nhắm hẹp.",
      },
      {
        type: "formula",
        title: "Con số đáng dùng cho quyết định",
        equation: "Tỷ lệ trong tập của bạn × Giá trị trung bình mỗi người dùng nhóm đó",
        variables: [
          { symbol: "Tỷ lệ trong tập", name: "Không phải tỷ lệ toàn quốc", description: "Từ vài trăm người dùng thật, con số này đã đáng tin hơn báo cáo thị trường" },
          { symbol: "Giá trị mỗi người", name: "Doanh thu hoặc mức đóng góp", description: "Đây là vế làm hai bảng xếp hạng đảo ngược nhau" },
        ],
        example: {
          title: "Nền tảng chiếm 7% người dùng nhưng 40% doanh thu",
          calculation: "So sánh phải làm trên tích, không trên riêng tỷ lệ người dùng",
          result: "Quyết định đảo ngược so với khi chỉ nhìn thị phần",
          explanation: "Cùng một chi phí phát triển, hai cách đọc số liệu cho hai kết luận trái ngược - và chỉ một trong hai dùng đúng dữ liệu.",
        },
      },
      {
        type: "callout",
        label: "Giả định không viết ra thì thành sự thật",
        text: "Khi chưa có người dùng, mọi quyết định đều dựa trên giả định và điều đó không tránh được. Thứ tránh được là để chúng nằm trong đầu: một giả định được ghi ra kèm ngày kiểm lại sẽ được kiểm lại, còn một giả định không ghi thì sau sáu tháng không ai còn nhớ rằng nó từng là giả định.",
      },
      {
        type: "closing",
        lines: [
          "Số liệu thị trường trả lời câu hỏi của thị trường; sản phẩm của bạn cần câu trả lời cho câu hỏi của nó.",
          "Bài sau: thiết bị và mạng mà người dùng thật đang dùng để mở sản phẩm của bạn.",
        ],
      },
    ],
  },
  {
    id: 1456,
    slug: "thiet-bi-va-mang-cua-nguoi-dung-vn",
    title: "Thị trường VN, Bài 6: Thiết bị và mạng của người dùng thật",
    subtitle: "Sản phẩm chạy mượt trên máy của đội và giật trên máy của phần lớn người dùng",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📱",
    track: "professional",
    whyItMatters:
      "Đội phát triển làm việc trên máy mạnh và mạng tốt, còn phần lớn người dùng thì không. Khoảng cách ấy không hiện ra trong bất kỳ phép kiểm nào chạy trên máy của đội, nên nó chỉ lộ ra qua đánh giá và tỷ lệ rời bỏ.",
    openingQuestion: "Vì sao đội phát triển hay đánh giá sai hiệu năng sản phẩm của mình?",
    openingOptions: [
      "Vì họ thử trên máy mạnh, mạng tốt, và dữ liệu đã có sẵn trong bộ nhớ đệm",
      "Vì công cụ đo không phản ánh đúng thực tế",
      "Vì quen quá nên không thấy chỗ chậm nữa",
      "Vì họ chủ yếu làm với môi trường thử nghiệm",
    ],
    correctOption: 0,
    explanation:
      "Ba nguyên nhân kia đều có thật và đều mờ nhạt so với nguyên nhân này. Máy của một lập trình viên thường mạnh hơn nhiều lần máy phổ thông, mạng văn phòng ổn định hơn mạng di động ngoài đường, và sau nhiều lần chạy thì mọi thứ đã nằm trong bộ nhớ đệm. Ba yếu tố ấy cộng lại có thể tạo ra khoảng cách nhiều lần giữa thời gian mở màn hình đầu trên máy đội và trên máy người dùng - và không phép kiểm nào chạy trên máy đội bắt được nó, vì chúng cũng chạy trong cùng điều kiện ấy.",
    diagram: [
      { label: "Máy đội: mạnh, mạng ổn định, dữ liệu đã đệm sẵn", arrow: true },
      { label: "Máy người dùng: tầm trung, mạng di động, lần chạy đầu", arrow: true },
      { label: "Khoảng cách nhiều lần, không phép kiểm nào thấy", arrow: true },
      { label: "Lộ ra qua đánh giá và tỷ lệ rời bỏ" },
    ],
    realWorldExample: {
      company: "Một giây rưỡi và tám giây",
      description:
        "Một sản phẩm mở màn hình đầu trong khoảng một giây rưỡi trên máy của đội. Trên một máy Android tầm trung mua ngoài cửa hàng, cùng màn hình đó mất khoảng tám giây ở lần mở đầu tiên, phần lớn thời gian nằm ở việc tải và giải mã ảnh. Không ai trong đội từng thấy con số tám giây, vì không ai trong đội dùng máy đó.",
    },
    quiz: [
      {
        question: "Thiết bị nào nên dùng để kiểm hiệu năng?",
        options: [
          "Một máy tầm trung mua ngoài, không phải máy của thành viên trong đội",
          "Máy có cấu hình thấp nhất trong danh sách thiết bị được sản phẩm hỗ trợ chính thức",
          "Trình giả lập cấu hình thấp",
          "Máy phổ biến nhất trong số các thiết bị mà người dùng hiện tại đang sử dụng",
        ],
        correct: 0,
        explanation:
          "Trình giả lập chạy trên máy tính của bạn nên nó không mô phỏng được thứ quan trọng nhất là hiệu năng thật và mức tiêu pin. Máy cấu hình thấp nhất thì quá bi quan và dễ bị bỏ qua vì nghe không đại diện. Một máy tầm trung mua ngoài cửa hàng là mức mà phần lớn người dùng thật đang ở.",
      },
      {
        question: "Điều kiện mạng nào đáng kiểm nhất?",
        options: [
          "Mạng chậm và chập chờn, không phải mạng bị mất hẳn",
          "Mạng di động ở khu vực đông người sử dụng trong giờ cao điểm buổi tối",
          "Mạng công cộng đông thiết bị",
          "Chuyển đổi qua lại giữa mạng di động và mạng không dây khi đang dùng",
        ],
        correct: 0,
        explanation:
          "Mất mạng hẳn thì phần lớn sản phẩm xử lý đúng vì đó là trường hợp ai cũng nghĩ tới. Mạng chập chờn thì tệ hơn nhiều: yêu cầu đi ra và không quay về, giao diện đứng ở trạng thái đang tải mãi mãi, và người dùng bấm lại nhiều lần tạo ra trùng lặp ở phía máy chủ.",
      },
      {
        question: "Dung lượng dữ liệu di động ảnh hưởng tới thiết kế thế nào?",
        options: [
          "Ảnh và video tải tự động là khoản tốn dữ liệu lớn nhất và thường không cần thiết",
          "Cần giảm số lượng yêu cầu gửi tới máy chủ để tiết kiệm dữ liệu cho người dùng",
          "Nên cho phép người dùng chọn chất lượng nội dung phù hợp với gói cước của họ",
          "Cần nén dữ liệu truyền đi để giảm dung lượng mà người dùng phải tải về",
        ],
        correct: 0,
        explanation:
          "Ba giải pháp kia đều đúng và đều tác động lên phần nhỏ hơn. Với phần lớn sản phẩm, ảnh chiếm áp đảo trong tổng dữ liệu tải về, và một phần lớn trong số đó là ảnh người dùng chưa cuộn tới. Chỉ tải khi sắp hiển thị thường cắt được nhiều hơn mọi biện pháp nén cộng lại.",
      },
      {
        question: "Kích thước gói cài đặt của ứng dụng có ý nghĩa gì ở thị trường này?",
        options: [
          "Gói lớn làm giảm tỷ lệ cài, nhất là với người dùng đang dùng dữ liệu di động",
          "Gói lớn chiếm chỗ nên dễ bị gỡ đi",
          "Gói lớn khiến thời gian cài đặt kéo dài và làm người dùng có ấn tượng ban đầu không tốt",
          "Gói lớn cho thấy ứng dụng có nhiều tính năng nên thường được người dùng đánh giá cao hơn",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ mất người dùng sớm nhất và cũng ít được đo nhất, vì người bỏ giữa chừng lúc tải không xuất hiện trong bất kỳ số liệu nào của sản phẩm. Với người dùng đang dùng dữ liệu di động có hạn, một gói vài trăm megabyte là một quyết định chứ không phải một thao tác.",
      },
      {
        question: "Nên đo trải nghiệm thật của người dùng bằng cách nào?",
        options: [
          "Thu thập số liệu từ thiết bị thật của họ, phân theo nhóm thiết bị",
          "Chạy kiểm hiệu năng tự động nhiều cấu hình",
          "Khảo sát người dùng về mức độ hài lòng với tốc độ của sản phẩm",
          "Theo dõi tỷ lệ rời bỏ ở từng màn hình để phát hiện chỗ có vấn đề",
        ],
        correct: 0,
        explanation:
          "Phép kiểm tự động chạy trong điều kiện bạn dựng nên, nên nó không phát hiện được thứ nằm ngoài giả định của chính bạn. Số liệu từ thiết bị thật, chia theo nhóm máy, cho biết nhóm nào đang chịu trải nghiệm tệ - và đó thường là nhóm không ai trong đội có máy để thử.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn muốn biết sản phẩm thật sự chạy thế nào với người dùng Việt Nam. Việc rẻ nhất cho ra nhiều thông tin nhất là gì?",
      options: [
        "Mua một máy tầm trung, cài bản thật, và đi hết luồng chính trên mạng di động",
        "Thu thập số liệu từ thiết bị thật rồi phân tích",
        "Chạy các phép kiểm hiệu năng tự động với nhiều cấu hình giả lập khác nhau",
        "Khảo sát nhóm người dùng hiện tại về tốc độ và mức độ ổn định của sản phẩm",
      ],
      correct: 0,
      explanation:
        "Việc này mất một buổi và vài triệu đồng, và nó cho bạn thấy trực tiếp thứ mà phần lớn người dùng đang trải qua. Thu thập số liệu từ xa tốt hơn về lâu dài và nó cần vài tuần để có dữ liệu - còn một buổi chiều với máy thật thì cho câu trả lời ngay hôm nay.",
    },
    keyTakeaways: [
      "Máy mạnh, mạng ổn và bộ nhớ đệm cộng lại tạo khoảng cách nhiều lần",
      "Mạng chập chờn tệ hơn mất mạng hẳn, và ít được xử lý hơn nhiều",
      "Ảnh chưa cuộn tới thường là khoản tốn dữ liệu lớn nhất",
      "Người bỏ giữa chừng lúc tải không xuất hiện trong số liệu nào của sản phẩm",
    ],
    summary: {
      keyIdea: "Sản phẩm chạy trong điều kiện của đội, và người dùng sống trong một điều kiện khác hẳn",
      commonMistake: "Kết luận hiệu năng ổn dựa trên phép kiểm chạy trong cùng điều kiện đã tạo ra vấn đề",
      action: "Mua một máy tầm trung, cài bản thật, đi hết luồng chính trên mạng di động một lần mỗi quý.",
    },
    application: {
      title: "Một máy thật trong ngăn kéo",
      message:
        "Giữ một máy Android tầm trung dùng riêng cho việc thử. Trước mỗi lần phát hành, mở bản mới trên đó với mạng di động và đi hết luồng chính.",
      secondary:
        "Ghi lại thời gian mở màn hình đầu ở lần chạy đầu tiên - đó là con số người dùng mới gặp, và cũng là con số duy nhất họ dùng để quyết định ở lại hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi phép kiểm hiệu năng của một đội đều chạy trên máy của đội. Đó cũng chính là điều kiện đã tạo ra vấn đề, nên chúng không bao giờ phát hiện được nó.",
      },
      {
        type: "formula",
        title: "Ba yếu tố nhân lên với nhau",
        equation: "Thời gian trên máy đội × Hệ số phần cứng × Hệ số mạng × Hệ số lần chạy đầu",
        variables: [
          { symbol: "Hệ số phần cứng", name: "Máy phổ thông so với máy đội", description: "Lớn nhất ở các thao tác cần xử lý ảnh và dựng giao diện phức tạp" },
          { symbol: "Hệ số mạng", name: "Mạng di động so với mạng văn phòng", description: "Không chỉ chậm hơn mà còn không ổn định, nên biến động rất lớn" },
          { symbol: "Hệ số lần chạy đầu", name: "Chưa có gì trong bộ nhớ đệm", description: "Đúng lần chạy quyết định người dùng mới ở lại hay gỡ" },
        ],
        example: {
          title: "Một giây rưỡi trên máy đội",
          calculation: "Ba hệ số, mỗi cái vài lần, nhân với nhau",
          result: "Tám giây ở lần mở đầu tiên trên máy tầm trung",
          explanation: "Không con số nào trong ba hệ số ấy xuất hiện trong phép kiểm nào, vì mọi phép kiểm đều chạy ở phía trái của phép nhân.",
        },
      },
      {
        type: "heading",
        text: "Mạng chập chờn tệ hơn mất mạng",
      },
      {
        type: "paragraph",
        text: "Mất mạng hẳn là trường hợp mọi đội đều nghĩ tới và xử lý đúng: báo lỗi, mời thử lại. Mạng chập chờn thì yêu cầu đi ra và không quay về, giao diện đứng mãi ở trạng thái đang tải, và người dùng bấm lại nhiều lần - tạo ra trùng lặp ở phía máy chủ đúng như bài về thanh toán đã nói. Đây là điều kiện phổ biến ngoài đường và hiếm khi được kiểm.",
      },
      {
        type: "callout",
        label: "Người bỏ giữa chừng không có trong số liệu nào",
        text: "Người dùng thấy gói cài quá lớn và dừng lại, hoặc chờ tám giây rồi thoát ra, đều không để lại dấu vết nào trong sản phẩm của bạn - vì họ chưa từng vào được bên trong. Đây là lý do các chỉ số nội bộ có thể rất đẹp trong khi tăng trưởng thì không, và cũng là lý do một buổi chiều với máy thật đáng giá hơn nhiều tuần phân tích số liệu.",
      },
      {
        type: "closing",
        lines: [
          "Phép kiểm chạy trong điều kiện của bạn chỉ chứng minh được rằng nó chạy trong điều kiện của bạn.",
          "Bài sau: thứ tiếng mà người dùng gõ vào, và những chỗ phần mềm xử lý sai nó.",
        ],
      },
    ],
  },
  {
    id: 1457,
    slug: "tieng-viet-trong-san-pham",
    title: "Thị trường VN, Bài 7: Tiếng Việt trong sản phẩm",
    subtitle: "Dấu, sắp xếp, tìm kiếm và độ dài - bốn chỗ thư viện mặc định làm sai",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔤",
    track: "professional",
    whyItMatters:
      "Phần lớn thư viện xử lý chuỗi được viết với giả định về tiếng Anh, và chúng chạy mà không báo lỗi trên tiếng Việt - chỉ cho ra kết quả sai. Lỗi loại đó không xuất hiện trong bộ kiểm nào trừ khi có người nghĩ tới việc viết nó.",
    openingQuestion: "Vì sao hai chuỗi tiếng Việt trông giống hệt nhau có thể không bằng nhau?",
    openingOptions: [
      "Vì cùng một chữ có dấu biểu diễn được bằng nhiều dãy ký tự khác nhau",
      "Vì một chuỗi dùng bảng mã cũ, một dùng mới",
      "Vì có ký tự trắng ẩn nằm giữa các chữ",
      "Vì phông vẽ hai dãy khác nhau thành một hình",
    ],
    correctOption: 0,
    explanation:
      "Một chữ có dấu trong tiếng Việt biểu diễn được theo hai cách: một ký tự đã gộp sẵn cả chữ và dấu, hoặc chữ gốc kèm một hay hai ký tự dấu đứng riêng. Hai dãy ấy hiển thị giống hệt nhau và không bằng nhau khi so sánh từng byte. Hệ quả rất cụ thể: người dùng gõ tên trên máy tính rồi tìm lại trên điện thoại và không thấy, hoặc tạo được hai tài khoản trùng tên. Cách xử lý là chuẩn hoá về một dạng duy nhất ngay tại cửa vào của hệ thống, trước khi lưu và trước khi so sánh.",
    diagram: [
      { label: "Chuỗi vào từ nhiều nguồn, nhiều cách gõ", arrow: true },
      { label: "Chuẩn hoá về một dạng duy nhất tại cửa vào", arrow: true },
      { label: "Lưu và so sánh trên dạng đã chuẩn hoá", arrow: true },
      { label: "Bỏ bước này thì lỗi rải khắp hệ thống" },
    ],
    realWorldExample: {
      company: "Hai tài khoản cùng tên",
      description:
        "Một hệ thống kiểm tra trùng tên đăng nhập bằng phép so chuỗi trực tiếp. Hai người tạo được hai tài khoản với tên hiển thị giống hệt nhau, chỉ khác cách biểu diễn dấu. Lỗi này tồn tại hơn một năm và chỉ lộ ra khi bộ phận hỗ trợ không phân biệt được hai tài khoản trong một vụ tranh chấp.",
    },
    quiz: [
      {
        question: "Chuẩn hoá chuỗi nên đặt ở đâu trong hệ thống?",
        options: [
          "Ở cửa vào, trước khi lưu và trước mọi phép so sánh",
          "Ở tầng cơ sở dữ liệu để đảm bảo mọi dữ liệu được lưu đều ở dạng thống nhất",
          "Ở tầng giao diện khi hiển thị để người dùng luôn thấy kết quả nhất quán",
          "Ở mỗi chỗ có phép so sánh chuỗi",
        ],
        correct: 0,
        explanation:
          "Đặt ở mỗi chỗ so sánh nghe an toàn và nó đảm bảo sẽ có chỗ bị bỏ sót, vì số chỗ so sánh chuỗi tăng theo thời gian. Chuẩn hoá một lần ở cửa vào biến vấn đề thành một quy tắc kiểm được, và mọi thứ phía sau làm việc trên dữ liệu đã sạch.",
      },
      {
        question: "Sắp xếp danh sách tên tiếng Việt bằng thứ tự mặc định cho kết quả thế nào?",
        options: [
          "Sai thứ tự bảng chữ cái tiếng Việt vì chữ có dấu bị xếp sau",
          "Đúng nếu dữ liệu đã chuẩn hoá",
          "Sai với các tên có ký tự đặc biệt nhưng đúng với phần lớn các trường hợp",
          "Không xác định vì thứ tự phụ thuộc vào cấu hình của hệ quản trị dữ liệu",
        ],
        correct: 0,
        explanation:
          "Thứ tự mặc định sắp theo mã ký tự chứ không theo quy tắc của ngôn ngữ nào, nên toàn bộ chữ có dấu bị dồn xuống sau các chữ không dấu. Chuẩn hoá không sửa được điều này - nó là vấn đề khác và cần một quy tắc sắp xếp có nhận biết ngôn ngữ.",
      },
      {
        question: "Tìm kiếm nên xử lý dấu tiếng Việt thế nào?",
        options: [
          "Cho phép gõ không dấu vẫn tìm ra kết quả có dấu",
          "Yêu cầu người dùng gõ đúng dấu để đảm bảo kết quả trả về chính xác nhất",
          "Tự động thêm dấu vào từ khoá người dùng gõ dựa trên từ điển tiếng Việt",
          "Trả về cả kết quả có dấu và không dấu rồi để người dùng tự chọn",
        ],
        correct: 0,
        explanation:
          "Phần lớn người dùng gõ không dấu khi tìm kiếm, nhất là trên điện thoại, và họ mong tìm ra nội dung có dấu. Cách làm phổ biến là lưu thêm một bản không dấu để đối chiếu. Tự đoán dấu thì sai nhiều vì một chuỗi không dấu ứng với nhiều chuỗi có dấu khác nhau.",
      },
      {
        question: "Vì sao độ dài chuỗi tiếng Việt hay bị tính sai?",
        options: [
          "Vì một chữ có dấu có thể gồm nhiều ký tự nên đếm ký tự không ra số chữ",
          "Vì tiếng Việt dùng nhiều dấu cách hơn",
          "Vì ký tự tiếng Việt chiếm nhiều byte hơn",
          "Vì phông hiển thị chữ có dấu rộng hơn",
        ],
        correct: 0,
        explanation:
          "Vấn đề số byte thì ai cũng biết và xử lý được. Vấn đề ở đây tinh vi hơn: cùng một chữ có thể là một ký tự hoặc hai ba ký tự tuỳ cách biểu diễn, nên một giới hạn hai trăm ký tự cắt được số chữ khác nhau tuỳ vào việc người dùng gõ bằng gì. Đây cũng là lý do phần chuẩn hoá ở cửa vào giải quyết luôn cả chuyện này.",
      },
      {
        question: "Kiểm thử cho phần xử lý tiếng Việt nên có gì?",
        options: [
          "Trường hợp cùng một chữ ở hai cách biểu diễn khác nhau",
          "Danh sách đầy đủ các ký tự tiếng Việt để đảm bảo không ký tự nào bị xử lý sai",
          "Các tên người và địa danh phổ biến để kiểm tra với dữ liệu gần thực tế nhất",
          "Chuỗi dài vượt quá giới hạn để kiểm tra cách hệ thống xử lý khi bị cắt",
        ],
        correct: 0,
        explanation:
          "Ba loại kiểm thử kia đều dùng dữ liệu ở một cách biểu diễn duy nhất, nên chúng không bao giờ chạm tới lỗi phổ biến nhất. Một bài kiểm đưa vào hai dãy ký tự trông giống nhau và khẳng định hệ thống coi chúng là một thì bắt được đúng thứ đang gây lỗi trong thực tế.",
      },
    ],
    practicePrompt: {
      question:
        "Hệ thống của bạn đang lưu tên người dùng và cho phép tìm kiếm theo tên. Việc nào cần làm trước?",
      options: [
        "Chuẩn hoá chuỗi ở cửa vào và lưu thêm một bản không dấu để tìm kiếm",
        "Bổ sung quy tắc sắp xếp cho tiếng Việt",
        "Thêm kiểm thử cho tên có dấu nhiều dạng",
        "Rà soát các chỗ so sánh chuỗi hiện có",
      ],
      correct: 0,
      explanation:
        "Hai việc này giải quyết hai lỗi mà người dùng gặp hằng ngày là không tìm ra thứ mình đã nhập và tạo được bản ghi trùng. Ba việc kia đều nên làm và đều là bước sau: rà soát chỗ so sánh chỉ có nghĩa khi đã có một dạng chuẩn để so, và kiểm thử thì kiểm chính quy tắc bạn vừa đặt ra.",
    },
    keyTakeaways: [
      "Cùng một chữ có dấu biểu diễn được bằng nhiều dãy ký tự trông giống hệt nhau",
      "Chuẩn hoá một lần ở cửa vào, không phải ở mỗi chỗ so sánh",
      "Sắp xếp mặc định dồn toàn bộ chữ có dấu xuống sau",
      "Người dùng gõ không dấu và mong tìm ra nội dung có dấu",
    ],
    summary: {
      keyIdea: "Thư viện xử lý chuỗi chạy trơn tru trên tiếng Việt và cho ra kết quả sai, nên không có lỗi nào để thấy",
      commonMistake: "So sánh chuỗi trực tiếp, khiến hai bản ghi trông giống hệt nhau vẫn được coi là khác nhau",
      action: "Chuẩn hoá mọi chuỗi ở cửa vào, lưu thêm bản không dấu cho tìm kiếm, và viết kiểm thử cho hai cách biểu diễn.",
    },
    application: {
      title: "Một quy tắc ở cửa vào, một bài kiểm chứng minh nó",
      message:
        "Chuẩn hoá mọi chuỗi ngay khi nhận, trước khi lưu và trước khi so sánh. Viết một bài kiểm đưa vào hai dãy trông giống nhau và khẳng định hệ thống coi chúng là một.",
      secondary:
        "Lưu thêm một cột không dấu cho các trường được tìm kiếm - rẻ lúc thêm, và là thứ quyết định người dùng có tìm ra thứ họ cần không.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần lớn hàm xử lý chuỗi được viết với giả định về tiếng Anh. Trên tiếng Việt chúng vẫn chạy, vẫn không báo lỗi, và trả về kết quả sai - đó là loại lỗi khó thấy nhất.",
      },
      {
        type: "comparison",
        left: {
          label: "Điều bạn thấy",
          text: "Hai chuỗi hiển thị giống hệt nhau trên màn hình, cùng phông, cùng độ rộng, không có gì để nghi ngờ rằng chúng khác nhau.",
        },
        right: {
          label: "Điều máy thấy",
          text: "Hai dãy byte khác nhau: một dãy dùng ký tự đã gộp sẵn chữ và dấu, dãy kia dùng chữ gốc kèm ký tự dấu đứng riêng.",
        },
      },
      {
        type: "heading",
        text: "Bốn chỗ hỏng, một nguyên nhân chung",
      },
      {
        type: "paragraph",
        text: "So sánh cho ra khác nhau với hai chuỗi trông giống nhau. Đếm ký tự cho ra số khác nhau với cùng một câu. Sắp xếp dồn chữ có dấu xuống cuối. Tìm kiếm không ra vì người dùng gõ không dấu. Bốn triệu chứng, và ba trong bốn có chung một cách chữa là chuẩn hoá về một dạng duy nhất ngay tại cửa vào của hệ thống.",
      },
      {
        type: "callout",
        label: "Chuẩn hoá ở cửa vào, không phải ở mỗi chỗ so sánh",
        text: "Cám dỗ là gọi hàm chuẩn hoá tại mỗi chỗ có phép so sánh chuỗi. Số chỗ đó tăng theo thời gian và mỗi chỗ mới là một cơ hội quên. Chuẩn hoá một lần ngay khi dữ liệu vào hệ thống biến vấn đề thành một quy tắc kiểm được bằng một bài kiểm duy nhất, và mọi thứ phía sau làm việc trên dữ liệu đã sạch.",
      },
      {
        type: "closing",
        lines: [
          "Lỗi tệ nhất không phải lỗi làm chương trình dừng, mà là lỗi để chương trình chạy tiếp với kết quả sai.",
          "Chặng này khép lại ở đúng chỗ nó bắt đầu: sản phẩm gặp người dùng, và người dùng ở một nơi cụ thể.",
        ],
      },
    ],
  },
];
