import type { Lesson } from "./lesson-types";

// Chặng 16 của track cá nhân: an toàn thông tin và phòng tấn công phi kỹ thuật.
//
// NGUYÊN TẮC VIẾT. Không dạy nhận diện theo DẤU HIỆU BỀ MẶT (sai chính tả, số
// lạ, logo mờ) - những thứ đó thay đổi liên tục và tạo cảm giác an toàn giả.
// Dạy nhận diện theo CẤU TRÚC: kịch bản nào cũng cần bạn hành động gấp, một
// mình, và qua một kênh do kẻ tấn công chọn. Cấu trúc thì không đổi được vì nó
// là điều kiện để cuộc tấn công hoạt động.
//
// Chặng này từng là "phòng lừa đảo tài chính" của bản cũ (mạo danh ngân hàng,
// việc nhẹ lương cao, sàn đầu tư giả). Viết lại toàn bộ theo hướng công nghệ:
// thứ bị nhắm tới là tài khoản, mã xác thực, thiết bị và quyền truy cập.
// Mỗi bài tự mang khối thực hành (scenario) và khối hình ảnh (feynman, flow),
// nên không còn mục nào cho chặng này trong lib/lesson-block-additions.
//
// Ids 350-357 nối tiếp Chặng 15 (340-347), chừa 348-349 làm chỗ chèn.

export const FRAUD_SAFETY_LESSONS: Lesson[] = [
  {
    id: 350,
    slug: "vi-sao-ai-cung-co-the-bi-lua",
    title: "Chặng 16, Bài 1: Vì sao ai cũng có thể bị lừa",
    subtitle: "Kẻ tấn công hiếm khi phá được mật khẩu - họ thuyết phục bạn tự mở cửa, bằng trạng thái chứ không bằng kỹ thuật",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧠",
    track: "personal",
    whyItMatters:
      "Phần lớn tài khoản bị chiếm không phải vì ai đó bẻ được mã hóa, mà vì chính chủ tài khoản đọc mã xác thực, bấm duyệt một lần đăng nhập hay cài một thứ được nhờ cài. Niềm tin mình đủ tỉnh táo để không mắc là điều kiện khiến người ta không chuẩn bị gì - trong khi kịch bản nhắm vào trạng thái, và trạng thái ấy có thể xảy ra với bất kỳ ai.",
    openingQuestion: "Kẻ tấn công muốn vào email công việc của bạn. Cách nào thường rẻ và hiệu quả nhất với họ?",
    openingOptions: [
      "Dò thử hàng triệu mật khẩu cho tới khi trúng đúng mật khẩu của bạn",
      "Thuyết phục chính bạn đọc mã xác thực hoặc bấm duyệt một lần đăng nhập",
      "Tìm một lỗ hổng trong máy chủ email của công ty để vào thẳng hộp thư",
      "Nghe lén và giải mã đường truyền khi bạn dùng wifi ở quán cà phê",
    ],
    correctOption: 1,
    explanation:
      "Phá kỹ thuật thì tốn kém và chậm: mật khẩu dài dò không nổi, máy chủ lớn được vá liên tục, đường truyền đã được mã hóa. Thuyết phục một con người thì rẻ hơn nhiều - một tin nhắn, một cuộc gọi, một trang đăng nhập dựng trong mười phút. Cách này gọi là tấn công phi kỹ thuật (social engineering), và nó hoạt động bằng cách tạo ra một trạng thái: sợ vì bị báo tài khoản sắp khóa, gấp vì sếp cần ngay, nể vì yêu cầu đến từ bộ phận kỹ thuật. Trong trạng thái ấy, phần suy xét cẩn thận bị lấn át - đó là cơ chế sinh học, không phải khiếm khuyết cá nhân. Vì vậy phòng vệ tốt nhất không phải nhớ nhiều thủ đoạn, mà là có sẵn một quy tắc chạy được cả khi bạn đang hoảng.",
    diagram: [
      { label: "Tạo trạng thái: sợ, gấp, nể quyền", arrow: true },
      { label: "Khả năng suy xét giảm xuống", arrow: true },
      { label: "Yêu cầu đọc mã, bấm duyệt, cài đặt - ngay và một mình", arrow: true },
      { label: "Quy tắc định sẵn là thứ duy nhất còn hoạt động" },
    ],
    realWorldExample: {
      company: "Cùng một người, hai thời điểm",
      description:
        "Một nhân viên văn phòng đọc bài cảnh báo về cuộc gọi giả bộ phận IT và thấy nó lộ liễu tới mức khó tin có ai mắc. Ba tháng sau, đúng chiều hạn chót nộp báo cáo, người đó nhận cuộc gọi tự xưng IT nói tài khoản công việc đang bị đăng nhập lạ, cần đọc mã vừa gửi về điện thoại để khóa lại. Kiến thức vẫn nằm đó, nhưng nó không được gọi ra - vì trạng thái lúc ấy đã khác, và mã được đọc trong mười giây.",
    },
    quiz: [
      {
        question: "Vì sao kiến thức về các thủ đoạn tấn công là chưa đủ để phòng vệ?",
        options: [
          "Vì phần mềm diệt virus đã tự chặn hết những thủ đoạn mà người dùng từng biết",
          "Vì thủ đoạn được báo chí mô tả thường đã lỗi thời từ nhiều năm trước",
          "Vì kịch bản đổi liên tục, còn trạng thái chúng tạo ra thì luôn giống nhau",
          "Vì kẻ tấn công chỉ nhắm vào người chưa từng đọc cảnh báo bảo mật nào",
        ],
        correct: 2,
        explanation:
          "Ghi nhớ một danh sách thủ đoạn là cuộc chạy đua không thắng được, vì bên kia chỉ cần đổi chi tiết. Nhận ra cấu trúc chung - gấp, một mình, qua kênh họ chọn - thì không phụ thuộc vào việc kịch bản mới có gì.",
      },
      {
        question: "Thứ mà kẻ tấn công phi kỹ thuật thường muốn bạn làm nhất là gì?",
        options: [
          "Gửi cho họ toàn bộ danh bạ điện thoại để họ bán cho bên quảng cáo",
          "Tự tay đọc mã, bấm duyệt, cài đặt hoặc gửi tệp cho họ",
          "Trả lời tin nhắn để họ xác nhận số điện thoại của bạn còn dùng",
          "Mở camera trước để họ ghi lại khuôn mặt bạn rồi giả mạo về sau",
        ],
        correct: 1,
        explanation:
          "Mọi biện pháp kỹ thuật - mật khẩu mạnh, xác thực hai lớp - đều chặn người đứng ngoài. Thứ chúng không chặn được là chính chủ tài khoản tự tay mở cửa, nên đó là thứ mọi kịch bản nhắm tới.",
      },
      {
        question: "Vì sao kịch bản tấn công thường dặn bạn đừng báo cho ai, kể cả bộ phận IT?",
        options: [
          "Vì quy trình bảo mật chỉ cho phép chủ tài khoản tự xử lý sự cố của mình",
          "Vì báo IT sẽ làm hệ thống tự khóa tài khoản và họ mất quyền truy cập",
          "Vì thêm người thì mã xác thực sẽ hết hạn trước khi kịp đọc cho họ",
          "Vì người thứ hai không ở trong trạng thái đó sẽ nhận ra vấn đề ngay",
        ],
        correct: 3,
        explanation:
          "Trạng thái là thứ không lây sang người khác. Đồng nghiệp hay người thân nghe cùng câu chuyện mà không mang nỗi sợ đi kèm sẽ thấy ngay chỗ vô lý - IT thật không bao giờ cần mã của bạn.",
      },
      {
        question: "Vì sao niềm tin \"tôi đủ tỉnh táo để không mắc\" lại nguy hiểm?",
        options: [
          "Vì kẻ tấn công thường chọn mục tiêu là người tự tin nhất trong mỗi công ty",
          "Vì người tin vậy không chuẩn bị quy tắc nào cho lúc mình không tỉnh táo",
          "Vì người tự tin thường đặt mật khẩu ngắn hơn hẳn người hay lo lắng",
          "Vì sự tự tin khiến người ta bỏ qua cảnh báo của phần mềm bảo mật",
        ],
        correct: 1,
        explanation:
          "Đây là điểm quan trọng nhất của bài. Phòng vệ hiệu quả không dựa vào việc bạn luôn tỉnh táo, mà dựa vào quy tắc vẫn chạy được khi bạn đang hoảng - và người tin mình không bao giờ hoảng thì không dựng những quy tắc đó.",
      },
      {
        question: "Cách phòng vệ hiệu quả nhất trước tấn công phi kỹ thuật có dạng nào?",
        options: [
          "Một quy tắc ngắn chạy được cả khi bạn đang hoảng",
          "Một danh sách đầy đủ các thủ đoạn đã được ghi nhận gần đây",
          "Một ứng dụng tự động chặn mọi cuộc gọi và tin nhắn từ số lạ",
          "Thói quen soi kỹ lỗi chính tả và logo trong mọi email nhận được",
        ],
        correct: 0,
        explanation:
          "Quy tắc phải đủ đơn giản để chạy được trong trạng thái xấu nhất. Ví dụ: không đọc mã cho ai, và mọi yêu cầu gấp đều phải chờ để tự liên hệ lại qua kênh mình đã biết - một câu, không cần nhớ thủ đoạn nào.",
      },
    ],
    keyTakeaways: [
      "Tài khoản hiếm khi bị phá từ ngoài - nó thường được chính chủ mở từ bên trong",
      "Ba trạng thái quen thuộc: sợ hãi, gấp gáp, nể quyền",
      "Thứ họ xin là một hành động: đọc mã, bấm duyệt, cài đặt, chia sẻ tệp",
      "Phòng vệ tốt là quy tắc chạy được khi bạn đang hoảng, không phải trí nhớ về thủ đoạn",
    ],
    practicePrompt: {
      question:
        "Một cuộc gọi tự xưng bộ phận IT nói tài khoản công việc của bạn đang bị đăng nhập lạ và giục bạn đọc mã vừa nhận để chặn lại. Việc đầu tiên nên làm là gì?",
      options: [
        "Hỏi tên và mã nhân viên của họ để kiểm tra rồi mới đọc mã",
        "Đọc mã ngay vì càng chậm thì kẻ lạ càng có thêm thời gian xâm nhập",
        "Yêu cầu họ gửi email xác nhận rồi làm theo hướng dẫn trong thư đó",
        "Cúp máy, rồi tự liên hệ IT qua kênh nội bộ bạn đã biết",
      ],
      correct: 3,
      explanation:
        "Hỏi thêm là ở lại trong cuộc trò chuyện mà bên kia đang dẫn dắt, và họ luôn có sẵn câu trả lời; email xác nhận thì cũng do họ gửi. Cúp máy phá vỡ trạng thái, còn tự liên hệ qua kênh nội bộ loại bỏ toàn bộ khả năng mạo danh.",
    },
    summary: {
      keyIdea: "Tấn công phi kỹ thuật nhắm vào trạng thái chứ không vào kiến thức - nên ai cũng có thể mắc",
      commonMistake: "Tin rằng hiểu biết là đủ, rồi không chuẩn bị quy tắc nào cho lúc mình không tỉnh táo",
      action: "Chọn một quy tắc cho mọi yêu cầu gấp về mã, mật khẩu hay cài đặt, và nói cho cả nhà hoặc cả nhóm biết.",
    },
    application: {
      title: "Một câu cho cả nhà",
      message:
        "Thống nhất trong gia đình hoặc nhóm làm việc một quy tắc: mọi yêu cầu gấp đọc mã, bấm duyệt, cài đặt hay gửi tệp - dù đến từ ai - đều phải dừng lại và tự liên hệ lại qua kênh mình đã biết. Không có ngoại lệ cho sếp, IT hay nền tảng.",
      secondary:
        "Quy tắc chỉ có tác dụng nếu nó được thống nhất TRƯỚC. Giữa lúc hoảng thì không ai nghĩ ra được quy tắc nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần lớn người đọc bài này sẽ nghĩ mình không thuộc nhóm dễ bị lừa. Đó là phản ứng bình thường, và nó cũng chính là lý do bài này cần thiết - vì cửa vào tài khoản của bạn hiếm khi bị phá, nó thường được mở từ bên trong.",
      },
      {
        type: "feynman",
        title: "Tấn công phi kỹ thuật giống kẻ trộm xin chìa khóa",
        intro: "Kẻ trộm khéo không phá ổ khóa - họ mặc đồng phục thợ sửa ống nước rồi gõ cửa đúng lúc bạn đang vội. Trên mạng cũng vậy: thay vì bẻ mật khẩu, họ xin bạn đưa mã.",
        columns: ["Thành phần", "Ngoài đời", "Trên mạng"],
        rows: [
          ["Tạo gấp gáp", "\"Nhanh lên, nước đang tràn!\"", "\"Tài khoản sẽ bị khóa sau 30 phút\""],
          ["Giả người có quyền", "Người lạ mặc đồng phục thợ điện", "Tin nhắn giả bộ phận IT, giả sếp, giả đội hỗ trợ nền tảng"],
          ["Thứ họ xin", "Chìa khóa nhà", "Mã xác thực, mật khẩu, một lần bấm Duyệt"],
          ["Gọi lại kiểm tra", "Gọi công ty điện hỏi có cử thợ không", "Tự liên hệ IT hoặc tự mở ứng dụng, không theo hướng dẫn trong tin"],
        ],
        oneLiner: "Tấn công nhắm vào lúc bạn vội chứ không nhắm vào kiến thức - nên hãy dừng lại và tự kiểm tra qua kênh của mình.",
      },
      { type: "heading", text: "Cửa thường được mở từ bên trong" },
      {
        type: "paragraph",
        text: "Nếu tấn công chỉ khai thác sự thiếu hiểu biết, thì kỹ sư phần mềm sẽ miễn nhiễm - và thực tế không như vậy. Cơ chế thật nằm ở chỗ khác: kịch bản tạo ra một trạng thái, và trong trạng thái đó khả năng suy xét bị lấn át bởi nhu cầu phản ứng nhanh. Mật khẩu mạnh và xác thực hai lớp chặn được kẻ đứng ngoài, nhưng không chặn được chính chủ tài khoản tự tay đọc mã hay bấm duyệt.",
      },
      {
        type: "conceptTable",
        title: "Ba trạng thái, cùng một mục đích",
        subtitle: "Chi tiết kịch bản đổi liên tục, ba trạng thái này thì không",
        concepts: [
          {
            vi: "Sợ hãi",
            en: "Fear",
            def: "Tài khoản sắp bị khóa, có đăng nhập lạ, dữ liệu sắp bị xóa. Mục đích là làm bạn muốn xử lý ngay, theo đúng hướng dẫn họ đưa.",
          },
          {
            vi: "Gấp gáp",
            en: "Urgency",
            def: "Sếp cần tệp trước cuộc họp, hạn chót trong một giờ, mã chỉ còn hiệu lực 60 giây. Mục đích là xóa khoảng thời gian bạn cần để kiểm chứng.",
          },
          {
            vi: "Nể quyền",
            en: "Authority",
            def: "Tự xưng bộ phận IT, ban giám đốc, đội hỗ trợ của nền tảng. Mục đích là làm việc hỏi lại trở nên có vẻ thiếu tôn trọng hoặc sai quy trình.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Mã xác thực một lần vừa gửi về điện thoại hoặc email của bạn",
          "Một lần bấm Duyệt trên thông báo đăng nhập mà bạn không tự khởi tạo",
          "Cài một ứng dụng, tiện ích trình duyệt hay phần mềm điều khiển từ xa",
          "Mở, tải hoặc chia sẻ một tệp - hoặc cấp quyền vào thư mục trên đám mây",
        ],
      },
      {
        type: "callout",
        label: "Vì sao họ luôn muốn bạn không nói với ai",
        text: "Câu đừng báo IT kẻo hệ thống khóa luôn tài khoản, hay việc này cần giữ kín, xuất hiện trong gần như mọi kịch bản. Lý do rất đơn giản: trạng thái không lây. Người thứ hai nghe cùng câu chuyện mà không mang nỗi sợ sẽ thấy ngay chỗ vô lý - IT thật không bao giờ cần mã của bạn. Yêu cầu giữ kín tự nó đã là dấu hiệu mạnh nhất.",
      },
      {
        type: "flow",
        title: "Một cuộc tấn công phi kỹ thuật đi qua những bước nào",
        steps: [
          { label: "Tiếp cận", detail: "Qua một kênh do họ chọn: tin nhắn, cuộc gọi, email, bình luận. Kênh đó là sân nhà của họ, không phải của bạn." },
          { label: "Tạo trạng thái", detail: "Sợ, gấp hoặc nể quyền: tài khoản sắp khóa, sếp đang cần, IT đang xử lý sự cố." },
          { label: "Cô lập", detail: "Đừng cúp máy, đừng báo ai, việc này cần giữ kín. Mục đích là không để người thứ hai kịp nhìn vào." },
          { label: "Xin một hành động", detail: "Đọc mã, bấm Duyệt, cài một ứng dụng, mở một tệp, đăng nhập qua một đường dẫn." },
          { label: "Thu hoạch", detail: "Dùng quyền vừa có để vào tài khoản, đổi email khôi phục, rồi nhắn tiếp cho danh bạ của bạn." },
        ],
      },
      {
        type: "scenario",
        title: "Cuộc gọi lúc 16 giờ 50",
        start: "start",
        nodes: {
          start: {
            text: "Chiều thứ Sáu, sắp hết giờ làm. Một số lạ gọi, tự xưng bộ phận IT, nói hệ thống phát hiện tài khoản công việc của bạn đang bị đăng nhập từ nước ngoài. Điện thoại vừa nhận một tin nhắn chứa mã 6 số.",
            choices: [
              { label: "Đọc mã cho họ để chặn kẻ lạ cho nhanh", next: "readCode" },
              { label: "Hỏi tên và mã nhân viên của người gọi", next: "ask" },
              { label: "Nói sẽ tự liên hệ IT, rồi cúp máy", next: "good" },
            ],
          },
          ask: {
            text: "Người gọi trả lời trôi chảy, còn đọc đúng tên trưởng phòng của bạn. Giọng bắt đầu gấp: \"Mỗi phút trôi qua là thêm dữ liệu bị sao chép đấy.\"",
            choices: [
              { label: "Thấy đúng tên trưởng phòng nên đọc mã", next: "trusted" },
              { label: "Vẫn cúp máy và nhắn IT qua kênh nội bộ", next: "good" },
            ],
          },
          readCode: {
            text: "Mã bạn đọc chính là mã đăng nhập mà họ vừa yêu cầu - không có kẻ lạ nào khác ngoài người đang gọi. Vài phút sau, email khôi phục của tài khoản đã bị đổi.",
            ending: "bad",
          },
          trusted: {
            text: "Tên trưởng phòng có sẵn trên trang mạng nghề nghiệp của công ty; trả lời trôi chảy không chứng minh gì. Hỏi thêm là ở lại trong cuộc trò chuyện do họ dẫn dắt, và họ luôn có sẵn câu trả lời.",
            ending: "bad",
          },
          good: {
            text: "IT thật xác nhận không ai gọi bạn, và mã kia thuộc về một lần đăng nhập đang chờ. Mật khẩu được đổi ngay, không mất gì. Bạn không cần biết thủ đoạn - chỉ cần một quy tắc: không đọc mã cho ai, và tự liên hệ qua kênh của mình.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Không ai miễn nhiễm, nên phòng vệ phải là thứ hoạt động được cả khi bạn đang hoảng.",
          "Bài sau: email và tin nhắn giả mạo (phishing) - cửa vào phổ biến nhất của mọi kịch bản.",
        ],
      },
    ],
  },
  {
    id: 351,
    slug: "email-va-tin-nhan-gia-mao",
    title: "Chặng 16, Bài 2: Email và tin nhắn giả mạo (phishing)",
    subtitle: "Mọi thứ trong thư đều sao chép được, trừ tên miền thật - nên đó là chỗ duy nhất đáng đọc",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎣",
    track: "personal",
    whyItMatters:
      "Phần lớn các vụ mất tài khoản bắt đầu bằng một email hay tin nhắn có đường liên kết. Logo, màu sắc, cách xưng hô và chữ ký đều sao chép được trong vài phút, nên soi bề mặt không đủ. Thứ duy nhất không sao chép được là tên miền thật, và thói quen tự mở ứng dụng thay vì bấm vào liên kết loại bỏ cả nhóm kịch bản này.",
    openingQuestion: "Email báo tài khoản của bạn sắp bị khóa, logo và chữ ký giống hệt dịch vụ thật. Bạn nên kiểm tra điều gì trước tiên?",
    openingOptions: [
      "Thư có lỗi chính tả không, vì thư giả thường viết ẩu",
      "Logo và màu sắc có đúng bản mới nhất của dịch vụ không",
      "Tên miền thật trong địa chỉ người gửi và trong đường liên kết",
      "Tên hiển thị người gửi có đúng tên dịch vụ hay không",
    ],
    correctOption: 2,
    explanation:
      "Thư giả mạo có cùng một cấu trúc với mọi kịch bản của bài trước: nó cần bạn hành động gấp, qua đúng đường liên kết do người gửi chọn. Bề mặt thì đổi liên tục và làm giống được hoàn toàn: tên hiển thị là ô chữ người gửi tự điền, logo chỉ là một tấm ảnh, còn lỗi chính tả đã biến mất từ khi công cụ viết tự động phổ biến. Tên miền thì khác - chỉ chủ tên miền mới gửi thư hay dựng trang từ nó được, nên kẻ gian chỉ có thể làm một tên miền trông na ná. Đọc tên miền là kiểm tra nhanh nhất; tự mở ứng dụng hoặc tự gõ địa chỉ quen thay vì bấm liên kết là cách chắc nhất, vì nó đưa bạn ra khỏi kênh do họ chọn.",
    diagram: [
      { label: "Thư đến qua kênh do người gửi chọn", arrow: true },
      { label: "Đọc tên miền thật, bỏ qua tên hiển thị", arrow: true },
      { label: "Không bấm liên kết nằm trong thư", arrow: true },
      { label: "Tự mở ứng dụng hoặc gõ địa chỉ quen" },
    ],
    realWorldExample: {
      company: "Hai chữ cái đứng thay một chữ",
      description:
        "Một thư báo đăng nhập lạ gửi từ địa chỉ có đuôi rnicrosoft.com. Ở cỡ chữ của điện thoại, hai chữ r và n đứng sát nhau trông gần như chữ m, nên người đọc lướt thấy đúng tên quen. Thư không có lỗi chính tả nào, nút bấm đúng màu, chân thư đúng địa chỉ công ty. Thứ duy nhất sai là hai ký tự trong tên miền - và đó là thứ duy nhất kẻ gian không thể làm cho đúng.",
    },
    quiz: [
      {
        question: "Trong địa chỉ https://taikhoan.google.com.xac-minh.net/login, tên miền thật là gì?",
        options: [
          "google.com - vì nó đứng ngay sau phần taikhoan ở đầu",
          "taikhoan.google.com - vì đây là phần đọc thấy đầu tiên của địa chỉ",
          "login - vì trang mở ra do phần đường dẫn ở cuối địa chỉ quyết định",
          "xac-minh.net - khúc cuối cùng đứng ngay trước dấu / đầu tiên",
        ],
        correct: 3,
        explanation:
          "Tên miền đọc từ phải sang trái, dừng ở dấu / đầu tiên sau https://. Mọi thứ đứng trước xac-minh.net chỉ là tên con, do chủ xac-minh.net tự đặt tùy ý - kể cả chữ google.com. Phần sau dấu / là đường dẫn bên trong trang đó, không đổi được chủ của trang.",
      },
      {
        question: "Tên hiển thị của người gửi là \"Bộ phận Bảo mật Google\". Điều đó chứng minh gì?",
        options: [
          "Thư là thật, vì hệ thống thư tự chặn những tên trùng với thương hiệu lớn",
          "Không chứng minh gì - tên hiển thị do người gửi tự điền tùy ý",
          "Thư là thật nếu nó không bị đưa vào thư mục thư rác của hộp thư",
          "Thư là thật nếu đi kèm logo và chữ ký đúng mẫu của Google",
        ],
        correct: 1,
        explanation:
          "Tên hiển thị là một ô chữ tự do, giống dòng chữ viết tay ở góc phong bì. Bộ lọc thư rác bắt được nhiều thư giả nhưng không phải tất cả, nên một thư lọt vào hộp chính không vì thế mà thành thật. Chỉ phần sau dấu @ của địa chỉ gửi mới cho biết thư đi ra từ đâu.",
      },
      {
        question: "Trên điện thoại, cách xem địa chỉ thật của một liên kết trước khi mở là gì?",
        options: [
          "Nhấn giữ liên kết để hiện địa chỉ đầy đủ mà không mở trang",
          "Bấm mở thử rồi xem thanh địa chỉ, lạ thì đóng ngay",
          "Đọc dòng chữ gạch chân, vì đó chính là địa chỉ sẽ được mở",
          "Tin liên kết nếu nó bắt đầu bằng https và có ổ khóa",
        ],
        correct: 0,
        explanation:
          "Chữ hiển thị của một liên kết và địa chỉ nó trỏ tới là hai thứ riêng, người soạn thư đặt mỗi thứ một kiểu được. Nhấn giữ trên điện thoại, hoặc rê chuột trên máy tính, cho xem địa chỉ thật. Mở thử không vô hại: trang có thể đã kịp ghi nhận bạn bấm, hoặc đẩy một tệp tải về.",
      },
      {
        question: "Tin nhắn báo giao hàng thất bại kèm một liên kết rút gọn dạng bit.ly. Xử lý thế nào?",
        options: [
          "Mở được, vì dịch vụ rút gọn tự quét và chặn trang độc",
          "Mở được nếu tin ghi đúng tên và địa chỉ nhận hàng của bạn",
          "Không mở - tự vào ứng dụng của hãng vận chuyển để tra mã đơn",
          "Chỉ mở trên máy tính, vì trình duyệt máy tính an toàn hơn",
        ],
        correct: 2,
        explanation:
          "Liên kết rút gọn giấu tên miền thật, nên quy tắc đọc tên miền không áp dụng được - và đó là lý do kẻ gian dùng nó. Tên và địa chỉ của bạn có thể lấy từ dữ liệu rò rỉ, nên không chứng minh tin là thật. Tra đơn trong ứng dụng của hãng là kênh do bạn chọn: nếu có đơn kẹt thật, nó sẽ hiện ở đó.",
      },
      {
        question: "Vì sao chính tả chuẩn và giọng văn chuyên nghiệp không còn là dấu hiệu đáng tin?",
        options: [
          "Vì dịch vụ thật cũng thường sai chính tả trong thư gửi khách hàng",
          "Vì thư thật luôn viết bằng tiếng Anh, thư tiếng Việt mới đáng ngờ",
          "Vì thư lừa nay gửi từ máy chủ của dịch vụ thật",
          "Công cụ viết tự động giúp ai cũng soạn được thư trơn tru",
        ],
        correct: 3,
        explanation:
          "Dạy nhận diện bằng lỗi chính tả từng có ích và nay gây hại, vì nó tạo cảm giác an toàn giả trước một thư viết chuẩn. Đó là lý do bài này dạy theo cấu trúc - gấp, qua liên kết do họ chọn - thay vì theo dấu hiệu bề mặt, thứ đổi theo công cụ mà kẻ gian dùng.",
      },
    ],
    keyTakeaways: [
      "Tên hiển thị, logo, chữ ký và chính tả đều làm giống được - đừng dùng chúng để phán xét",
      "Tên miền thật là khúc cuối ngay trước dấu / đầu tiên, đọc từ phải sang trái",
      "Nhấn giữ hoặc rê chuột để xem địa chỉ thật; liên kết rút gọn thì không mở",
      "Cách chắc nhất: bỏ qua liên kết, tự mở ứng dụng hoặc tự gõ địa chỉ quen",
    ],
    practicePrompt: {
      question:
        "Tin nhắn hiện trong cùng luồng với các tin thật của nhà mạng, báo gói cước sắp hết hạn và kèm liên kết gia hạn trong hôm nay. Bạn làm gì?",
      options: [
        "Bấm liên kết vì tin nằm cùng luồng với những tin thật của nhà mạng",
        "Nhắn trả lời vào chính số đó để hỏi lại tin có phải thật hay không",
        "Mở liên kết nhưng chỉ xem, không nhập mật khẩu hay mã nào",
        "Bỏ qua liên kết, tự mở ứng dụng của nhà mạng để xem gói cước",
      ],
      correct: 3,
      explanation:
        "Tên người gửi của tin nhắn cũng giả được, nên một tin giả có thể nằm ngay dưới các tin thật của cùng tên đó - vị trí trong luồng không chứng minh gì. Nhắn lại thì câu trả lời đến từ chính người gửi. Mở để xem vẫn là bước vào trang của họ. Ứng dụng của nhà mạng là kênh bạn chọn, và gói cước sắp hết hạn thật thì sẽ hiện ở đó.",
    },
    summary: {
      keyIdea: "Mọi thứ trong thư đều mượn được, trừ tên miền thật và quyết định tự mở ứng dụng",
      commonMistake: "Tin một thư vì nó viết chuẩn, đúng logo, hoặc nằm cùng luồng với tin thật",
      action: "Nhấn giữ một liên kết trong hộp thư hôm nay và đọc tên miền thật của nó.",
    },
    application: {
      title: "Đọc một tên miền",
      message:
        "Mở hộp thư, chọn một email quảng cáo bất kỳ, rồi nhấn giữ (hoặc rê chuột lên) nút bấm trong thư. Đọc địa chỉ hiện ra từ phải sang trái và tìm khúc cuối ngay trước dấu / đầu tiên. Làm một lần với thư thật thì lần sau gặp thư giả, động tác ấy đã thành phản xạ.",
      secondary:
        "Lưu dấu trang cho ba dịch vụ bạn hay đăng nhập nhất - email, mạng xã hội, công việc - để không bao giờ phải vào chúng qua liên kết trong thư.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói mọi kịch bản nhắm vào trạng thái. Email và tin nhắn giả mạo là cách tạo trạng thái đó ở quy mô lớn nhất: một người soạn, hàng nghìn người nhận. Bài này không dạy soi lỗi chính tả - nó dạy nhìn vào đúng một chỗ không giả được.",
      },
      {
        type: "feynman",
        title: "Tên miền giống địa chỉ đăng ký, tên hiển thị giống chữ trên phong bì",
        intro:
          "Ai cũng có thể viết \"Ủy ban phường\" lên góc một phong bì, in thêm con dấu màu đỏ cho giống. Thứ họ không làm được là gửi thư đi từ đúng trụ sở ủy ban. Một email cũng vậy: phần lớn những gì bạn nhìn thấy là chữ người gửi tự viết.",
        columns: ["Ngoài đời", "Trong email, tin nhắn", "Giả được không"],
        rows: [
          ["Chữ viết ở góc phong bì", "Tên hiển thị của người gửi", "Có - ai cũng tự điền được"],
          ["Con dấu in trên giấy", "Logo, màu sắc, chữ ký cuối thư", "Có - sao chép trong vài phút"],
          ["Biển số nhà nhìn từ xa", "Tên miền na ná (rn thay m, 0 thay o)", "Gần được - nên phải đọc chậm"],
          ["Địa chỉ trụ sở thật", "Tên miền đứng ngay trước dấu / đầu tiên", "Không - chỉ chủ tên miền dùng được"],
        ],
        oneLiner: "Mọi thứ trong thư đều tự viết được, trừ tên miền thật - nên đó là chỗ duy nhất đáng đọc.",
      },
      { type: "heading", text: "Đọc tên miền từ phải sang trái" },
      {
        type: "paragraph",
        text: "Người đọc địa chỉ từ trái sang phải, và kẻ gian lợi dụng đúng thói quen đó: họ đặt tên dịch vụ thật ở đầu địa chỉ, nơi mắt nhìn tới trước. Nhưng máy tính đọc tên miền từ phải sang trái. Khúc quyết định trang thuộc về ai là khúc cuối, ngay trước dấu / đầu tiên - mọi thứ đứng trước nó chỉ là tên con do chủ trang tự đặt.",
      },
      {
        type: "flow",
        title: "Tìm tên miền thật trong một địa chỉ",
        steps: [
          { label: "Lấy địa chỉ thật, không lấy chữ hiển thị", detail: "Nhấn giữ liên kết trên điện thoại, hoặc rê chuột trên máy tính. Ví dụ: https://taikhoan.google.com.xac-minh.net/dang-nhap" },
          { label: "Bỏ https:// và mọi thứ từ dấu / đầu tiên trở đi", detail: "Còn lại: taikhoan.google.com.xac-minh.net. Phần /dang-nhap phía sau chỉ là trang con bên trong, không đổi được chủ." },
          { label: "Đọc khúc cuối", detail: "Khúc cuối là xac-minh.net. Với đuôi quốc gia như .com.vn thì lấy ba khúc cuối thay vì hai." },
          { label: "So với tên miền bạn đã biết", detail: "Google dùng google.com, không phải xac-minh.net. Chữ google.com đứng trước chỉ là tên con, nên trang này không thuộc Google." },
        ],
      },
      { type: "heading", text: "Bốn kiểu tên miền nhái thường gặp" },
      {
        type: "list",
        items: [
          "Chữ trông giống nhau: rn thay m, số 0 thay chữ o, chữ l thay chữ I hoa",
          "Thêm một từ nghe hợp lý: tên dịch vụ cộng thêm -security, -support, -verify",
          "Đổi đuôi: .co thay .com, .net thay .vn, hoặc một đuôi lạ ít người để ý",
          "Đặt tên thật làm tên con: google.com.xac-minh.net thuộc về xac-minh.net",
        ],
      },
      {
        type: "conceptTable",
        title: "Bốn thứ trong thư trông như bằng chứng",
        subtitle: "Mỗi thứ đều do người gửi tự soạn",
        concepts: [
          {
            vi: "Tên hiển thị",
            en: "Display name",
            def: "Ô chữ tự do. Tên công ty, tên phòng ban hay tên người quen đều điền được, không cần sở hữu gì.",
          },
          {
            vi: "Chữ của liên kết",
            en: "Link text",
            def: "Dòng chữ gạch chân có thể ghi một địa chỉ và trỏ tới địa chỉ khác. Chỉ nhấn giữ hoặc rê chuột mới cho xem đích thật.",
          },
          {
            vi: "Liên kết rút gọn",
            en: "Shortened link",
            def: "Giấu hẳn tên miền thật. Dịch vụ thật không có lý do dùng nó trong thư về tài khoản của bạn, nên gặp là không mở.",
          },
          {
            vi: "Hạn chót trong thư",
            en: "Urgency",
            def: "\"Trong 30 phút\", \"trong hôm nay\". Hạn chót tồn tại để bạn không kịp đọc tên miền - đúng trạng thái gấp gáp của bài trước.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Thư báo đăng nhập lạ lúc 8 giờ tối",
        start: "start",
        nodes: {
          start: {
            text: "Email tiêu đề \"Phát hiện đăng nhập lạ từ Hà Nội - xác minh trong 30 phút nếu không tài khoản sẽ bị khóa\". Tên người gửi: Microsoft Account Team. Cuối thư là một nút xanh \"Xác minh ngay\".",
            choices: [
              { label: "Bấm Xác minh ngay cho kịp 30 phút", next: "clicked" },
              { label: "Nhấn giữ nút để xem địa chỉ thật", next: "inspect" },
              { label: "Trả lời thư, hỏi xem có đúng là Microsoft không", next: "reply" },
            ],
          },
          inspect: {
            text: "Địa chỉ hiện ra: https://account.microsoft.com.security-check.co/verify. Có chữ microsoft.com ở đầu.",
            choices: [
              { label: "Thấy microsoft.com nên yên tâm bấm vào", next: "clicked" },
              { label: "Đọc khúc cuối: security-check.co - đóng thư, tự mở trang tài khoản", next: "good" },
            ],
          },
          clicked: {
            text: "Trang mở ra giống hệt trang đăng nhập Microsoft, ô email đã điền sẵn địa chỉ của bạn.",
            choices: [
              { label: "Gõ mật khẩu vì trang trông chuẩn", next: "bad" },
              { label: "Dừng lại, đọc thanh địa chỉ trước khi gõ gì", next: "addressbar" },
            ],
          },
          addressbar: {
            text: "Thanh địa chỉ ghi account.microsoft.com.security-check.co. Ô email điền sẵn chỉ chứng tỏ họ biết địa chỉ họ vừa gửi thư tới.",
            choices: [
              { label: "Đóng tab, tự gõ account.microsoft.com để xem hoạt động đăng nhập", next: "good" },
              { label: "Vẫn đăng nhập vì có chữ microsoft trong địa chỉ", next: "bad" },
            ],
          },
          reply: {
            text: "Câu trả lời đến sau một phút, khẳng định thư là thật và nhắc bạn chỉ còn 20 phút. Người trả lời chính là người đã gửi thư - hỏi lại trong kênh do họ chọn không kiểm chứng được gì.",
            ending: "bad",
          },
          bad: {
            text: "Mật khẩu vừa đi tới máy chủ của người gửi thư. Trang giống hệt chỉ chứng minh họ biết sao chép giao diện. Bài 5 của chặng sẽ nói vì sao kể cả mã xác thực cũng không cứu được tình huống này.",
            ending: "bad",
          },
          good: {
            text: "Trang hoạt động đăng nhập thật không ghi nhận gì bất thường. Bạn kiểm tra qua kênh do mình chọn, nên kết quả đáng tin - và bạn không cần biết thư kia thật hay giả mới hành động đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Kiểm tra bằng kênh bạn chọn, không bằng kênh trong thư",
        text: "Đọc tên miền cần mắt tỉnh, mà kịch bản được dựng để bạn không tỉnh. Quy tắc chắc hơn không cần đọc gì cả: thư báo chuyện gì về tài khoản thì tự mở ứng dụng, hoặc tự gõ địa chỉ quen, rồi xem chuyện đó ở đó. Nếu là thật, nó sẽ hiện ra; nếu không hiện, bạn vừa tránh được một trang giả mà không cần nhận ra nó.",
      },
      {
        type: "closing",
        lines: [
          "Mọi thứ trong thư đều mượn được, trừ tên miền thật - và trừ quyết định tự mở ứng dụng thay vì bấm vào liên kết.",
          "Bài sau: khi lời nhắn đến từ chính tài khoản của người quen.",
        ],
      },
    ],
  },
  {
    id: 352,
    slug: "nguoi-quen-bi-chiem-tai-khoan",
    title: "Chặng 16, Bài 3: Khi lời nhắn đến từ chính người quen",
    subtitle: "Tài khoản bị chiếm, giọng nói và khuôn mặt giả được - nên xác minh phải đi qua kênh khác",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "personal",
    whyItMatters:
      "Quy tắc chỉ tin người quen từng là lời khuyên hợp lý, và nó đã hết hiệu lực. Khi tài khoản chat của đồng nghiệp có thể bị chiếm, còn giọng nói lẫn hình ảnh đều tạo giả được, danh tính người gửi không còn là bằng chứng - nhưng phản xạ làm theo người quen thì vẫn nguyên. Và mỗi tài khoản bị chiếm lại được dùng để chiếm tiếp danh bạ của nó.",
    openingQuestion:
      "Một đồng nghiệp nhắn qua ứng dụng chat: \"Mình lỡ để số bạn làm số khôi phục, bạn gửi giúp mình cái mã vừa nhận nhé.\" Nên làm gì?",
    openingOptions: [
      "Gửi mã vì tin đến từ đúng tài khoản đồng nghiệp",
      "Nhắn lại hỏi vài chuyện ở công ty mà chỉ hai người mới biết câu trả lời",
      "Chụp màn hình mã rồi gửi đi thay vì gõ lại, để còn lưu bằng chứng",
      "Không gửi mã, gọi điện thường tới số đã lưu của họ để hỏi",
    ],
    correctOption: 3,
    explanation:
      "Mã gửi về điện thoại của bạn là mã của tài khoản CỦA BẠN - câu chuyện lỡ để số bạn làm số khôi phục tồn tại để bạn tự tay giao nó đi. Điểm mấu chốt thứ hai: xác minh phải đi qua một KÊNH KHÁC với kênh đang nhận yêu cầu. Nếu tài khoản chat đã bị chiếm, mọi câu hỏi bạn nhắn trong chính ứng dụng đó đều đến tay kẻ chiếm - và họ đọc được toàn bộ lịch sử trò chuyện để trả lời những câu riêng tư. Gọi điện thường tới số đã lưu từ trước là một kênh độc lập, do bạn chủ động mở, nên nó cắt được vấn đề.",
    diagram: [
      { label: "Yêu cầu đến qua một kênh", arrow: true },
      { label: "Kênh đó có thể đã bị chiếm", arrow: true },
      { label: "Xác minh phải qua kênh KHÁC", arrow: true },
      { label: "Gọi số đã lưu từ trước, không nhắn lại" },
    ],
    realWorldExample: {
      company: "Vì sao câu hỏi riêng tư không còn tác dụng",
      description:
        "Một người nhận tin từ tài khoản chat của bạn cũ, nhờ bấm đường dẫn để bình chọn cho một cuộc thi. Thấy lạ, người đó hỏi lại một kỷ niệm thời đại học - và nhận câu trả lời chính xác, vì nó nằm ngay trong lịch sử trò chuyện cũ. Đường dẫn dẫn tới trang đăng nhập giả của chính ứng dụng chat; nửa giờ sau, tài khoản của người này lại gửi đúng tin nhắn ấy cho toàn bộ danh bạ.",
    },
    quiz: [
      {
        question: "Vì sao hỏi câu riêng tư ngay trong ứng dụng chat không xác minh được người gửi?",
        options: [
          "Vì ứng dụng chat tự động chặn các câu hỏi mang tính cá nhân giữa hai người",
          "Vì kẻ chiếm tài khoản đọc được cả lịch sử trò chuyện để trả lời",
          "Vì người thật cũng hay quên nên trả lời sai chẳng nói lên gì",
          "Vì câu hỏi riêng tư chỉ dùng được khi gọi video chứ không dùng qua chữ",
        ],
        correct: 1,
        explanation:
          "Câu trả lời đúng cho câu hỏi riêng tư không chứng minh được gì, vì những chi tiết đó thường nằm sẵn trong chính cuộc trò chuyện mà kẻ chiếm đang đọc. Xác minh phải bước ra khỏi kênh đó.",
      },
      {
        question:
          "Một đồng nghiệp gọi video, đúng mặt đúng giọng, nhờ bạn bấm Duyệt một yêu cầu đăng nhập vừa hiện trên máy bạn. Vì sao chưa nên bấm?",
        options: [
          "Vì cuộc gọi video luôn bị ghi lại và có thể bị dùng để chống bạn",
          "Vì yêu cầu đăng nhập chỉ nên duyệt sau giờ làm khi mạng ít người",
          "Vì mặt và giọng đều tạo giả được, và yêu cầu đó là để vào tài khoản của bạn",
          "Vì đồng nghiệp thật sẽ luôn gửi email xác nhận trước khi gọi video cho bạn",
        ],
        correct: 2,
        explanation:
          "Thông báo đăng nhập hiện trên máy bạn là lời xin vào tài khoản của chính bạn - không có lý do hợp lệ nào để người khác cần bạn bấm Duyệt. Và hình ảnh, giọng nói trong một cuộc gọi ngắn đều có thể được tạo giả từ video cũ trên mạng.",
      },
      {
        question: "Yêu cầu nào từ tài khoản người quen nên khiến bạn dừng lại ngay, dù lời lẽ rất tự nhiên?",
        options: [
          "Tin nhắn có lỗi chính tả và cách xưng hô khác hẳn thường ngày",
          "Người đó đột nhiên nhắn vào giờ mà bình thường họ không online",
          "Ảnh đại diện của tài khoản đó vừa được thay trong vài ngày gần đây",
          "Gửi mã vừa nhận, mở một tệp, đăng nhập qua đường dẫn, bấm Duyệt",
        ],
        correct: 3,
        explanation:
          "Ba dấu hiệu bề mặt kia có thể có hoặc không, và kẻ chiếm sửa được dễ dàng sau khi đọc vài tin nhắn cũ. Còn bốn yêu cầu này là thứ họ buộc phải xin, vì đó là cách duy nhất để đi tiếp - nên chúng không che được.",
      },
      {
        question: "Vì sao một tài khoản bị chiếm thường dẫn tới thêm nhiều tài khoản bị chiếm?",
        options: [
          "Vì kẻ chiếm dùng lòng tin của danh bạ để xin mã và gửi đường dẫn tiếp",
          "Vì virus từ tài khoản đó tự lây sang mọi điện thoại có trong danh bạ",
          "Vì nền tảng gộp chung mật khẩu của những người hay nhắn tin với nhau",
          "Vì mọi người trong cùng nhóm chat dùng chung một máy chủ xác thực",
        ],
        correct: 0,
        explanation:
          "Tài khoản bị chiếm có giá trị nhất ở danh bạ của nó: mỗi người trong đó tin người gửi. Kẻ chiếm chỉ cần lặp lại cùng một tin nhắn, và mỗi người làm theo lại mở thêm một danh bạ mới.",
      },
      {
        question: "Quy tắc chung rút ra từ bài này là gì?",
        options: [
          "Chỉ làm theo yêu cầu kỹ thuật của người thân trong nhà, không của đồng nghiệp",
          "Đặt một mật khẩu chung với đồng nghiệp để nhắn cho nhau khi cần xác minh",
          "Tránh dùng ứng dụng chat cho mọi trao đổi có liên quan tới công việc",
          "Xác minh qua kênh khác, do chính bạn chủ động mở",
        ],
        correct: 3,
        explanation:
          "Quy tắc này không phụ thuộc vào công nghệ giả mạo tiến bộ tới đâu, nên nó không lỗi thời. Mật khẩu chung thì có ích nhưng nó vẫn nằm trong kênh có thể bị đọc nếu lịch sử trò chuyện bị lộ.",
      },
    ],
    keyTakeaways: [
      "Danh tính người gửi không còn là bằng chứng - tài khoản chiếm được, giọng và mặt giả được",
      "Xác minh phải qua KÊNH KHÁC, do bạn chủ động khởi tạo",
      "Câu hỏi riêng tư trong cùng ứng dụng vô hiệu vì lịch sử trò chuyện nằm sẵn ở đó",
      "Bốn yêu cầu đáng dừng lại: gửi mã, mở tệp, đăng nhập qua đường dẫn, bấm Duyệt",
    ],
    practicePrompt: {
      question:
        "Trưởng nhóm nhắn từ tài khoản chat quen: \"Anh đang họp, em mở giúp tệp hợp đồng này rồi đăng nhập email công ty để xem nhé, gấp.\" Bạn làm gì?",
      options: [
        "Mở tệp ngay vì tin nhắn đến từ đúng tài khoản của trưởng nhóm",
        "Gọi số đã lưu của anh ấy hoặc hỏi trực tiếp trước khi mở tệp",
        "Nhắn lại hỏi tên dự án đang làm để chắc chắn đúng là anh ấy",
        "Mở tệp trên điện thoại thay vì máy tính công ty cho an toàn hơn",
      ],
      correct: 1,
      explanation:
        "Hỏi tên dự án là cố xác minh bên trong chính kênh đang đáng ngờ, và mở trên điện thoại không làm trang đăng nhập giả bớt giả. Chủ động gọi qua số đã lưu là kênh độc lập duy nhất; nếu đúng là trưởng nhóm thì chậm vài phút không gây hại gì.",
    },
    summary: {
      keyIdea: "Xác minh phải đi qua kênh khác với kênh nhận yêu cầu - đó là quy tắc không lỗi thời",
      commonMistake: "Kiểm tra danh tính bằng câu hỏi riêng tư ngay trong ứng dụng đã bị chiếm",
      action: "Lưu số điện thoại của người thân và đồng nghiệp gần nhất, và luôn gọi lại bằng số đã lưu.",
    },
    application: {
      title: "Thống nhất trước với gia đình và nhóm",
      message:
        "Nói với người thân và đồng nghiệp: mọi yêu cầu gửi mã, mở tệp, đăng nhập hay bấm Duyệt, dù nhắn tin hay gọi video, đều sẽ được gọi lại xác minh bằng số đã lưu. Thống nhất trước thì lúc đó không ai thấy bị nghi ngờ.",
      secondary:
        "Với người lớn tuổi trong nhà, chỉ cần một câu: ai xin mã hay nhờ bấm gì trên điện thoại thì gọi cho con trước, kể cả khi trông giống người quen.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về tin nhắn giả mạo từ người lạ và tổ chức. Bài này khó hơn: lời nhờ đến từ đúng tài khoản, đúng khuôn mặt, đúng giọng nói của người bạn quen thật.",
      },
      {
        type: "feynman",
        title: "Tài khoản quen giống chiếc chìa khóa đúng",
        intro: "Chìa khóa đúng không có nghĩa là người cầm nó đúng: ai nhặt được chìa của hàng xóm cũng mở được cửa nhà họ. Tài khoản quen cũng vậy - nó chứng minh tài khoản, không chứng minh người đang gõ.",
        columns: ["Thành phần", "Ngoài đời", "Trên mạng"],
        rows: [
          ["Thứ trông như bằng chứng", "Người cầm đúng chìa khóa nhà hàng xóm", "Tin nhắn từ đúng tài khoản chat của đồng nghiệp"],
          ["Thứ giả được", "Giọng nói qua bộ đàm", "Giọng nói và khuôn mặt trong cuộc gọi video"],
          ["Xác minh sai cách", "Hỏi chính người cầm chìa xem họ là ai", "Hỏi câu riêng tư trong cùng ứng dụng chat"],
          ["Xác minh đúng cách", "Gọi điện cho hàng xóm", "Gọi số đã lưu từ trước hoặc hỏi trực tiếp"],
        ],
        oneLiner: "Tài khoản quen chỉ chứng minh tài khoản, không chứng minh người - nên xác minh qua kênh do bạn tự mở.",
      },
      { type: "heading", text: "Danh tính không còn là bằng chứng" },
      {
        type: "paragraph",
        text: "Tài khoản chat và mạng xã hội bị chiếm là chuyện xảy ra hằng ngày, và khi đó mọi tin nhắn gửi đi đều mang danh chủ tài khoản thật. Công nghệ tạo giả hình ảnh và giọng nói cũng đã tới mức một cuộc gọi ngắn không còn đủ để phân biệt. Nghĩa là câu hỏi có đúng là người đó không đã thôi trả lời được bằng những gì bạn thấy và nghe.",
      },
      {
        type: "conceptTable",
        title: "Bốn yêu cầu đáng dừng lại",
        subtitle: "Lời lẽ đổi theo từng người, bốn yêu cầu này thì không",
        concepts: [
          {
            vi: "Gửi mã",
            en: "Code request",
            def: "Gửi giúp mình mã vừa nhận. Mã về máy bạn là mã của tài khoản bạn - gửi đi là giao tài khoản.",
          },
          {
            vi: "Mở tệp",
            en: "Attachment",
            def: "Xem giúp tệp này. Tệp có thể chứa mã độc, hoặc mở ra một trang đòi đăng nhập lại.",
          },
          {
            vi: "Đăng nhập qua đường dẫn",
            en: "Login link",
            def: "Đăng nhập vào đây để bình chọn, để xem ảnh. Trang đó thu mật khẩu và mã của bạn.",
          },
          {
            vi: "Bấm Duyệt",
            en: "Approve",
            def: "Bấm Duyệt giúp anh. Thông báo đăng nhập trên máy bạn là lời xin vào tài khoản của chính bạn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc thay thế: đổi kênh, và bạn là bên khởi tạo",
        text: "Thay vì cố phân biệt thật giả trong kênh đang nhận yêu cầu, hãy bước hẳn sang một kênh khác mà bạn chủ động mở: gọi vào số đã lưu trong danh bạ từ trước, hỏi trực tiếp, hoặc nhắn qua một ứng dụng khác. Quy tắc này không phụ thuộc vào việc công nghệ giả mạo tiến bộ tới đâu, nên nó không có hạn sử dụng.",
      },
      {
        type: "flow",
        title: "Một tài khoản bị chiếm lan sang danh bạ thế nào",
        steps: [
          { label: "Chiếm tài khoản đầu tiên", detail: "Qua một trang đăng nhập giả, một mã bị đọc, hay một mật khẩu dùng lại đã lộ ở nơi khác." },
          { label: "Đọc lịch sử trò chuyện", detail: "Học cách xưng hô, tên dự án, chuyện riêng - đủ để trả lời mọi câu hỏi kiểm tra." },
          { label: "Nhắn danh bạ bằng giọng quen", detail: "Cùng một tin nhắn, gửi cho hàng trăm người tin chủ tài khoản." },
          { label: "Xin một hành động", detail: "Gửi mã, mở tệp, đăng nhập qua đường dẫn, bấm Duyệt." },
          { label: "Chiếm tài khoản tiếp theo", detail: "Mỗi người làm theo mở thêm một danh bạ mới, và vòng lặp bắt đầu lại." },
        ],
      },
      {
        type: "scenario",
        title: "Cuộc gọi video từ trưởng phòng",
        start: "start",
        nodes: {
          start: {
            text: "Tối muộn, trưởng phòng gọi video qua ứng dụng chat. Hình hơi giật nhưng đúng mặt, đúng giọng: \"Anh đang ở sân bay, không vào được hệ thống. Em bấm Duyệt cái thông báo đăng nhập vừa hiện trên máy em giúp anh nhé.\"",
            choices: [
              { label: "Bấm Duyệt vì đã thấy mặt và nghe giọng", next: "approved" },
              { label: "Hỏi một chuyện chỉ hai người biết", next: "ask" },
              { label: "Nói sẽ gọi lại, rồi gọi số đã lưu của anh ấy", next: "good" },
            ],
          },
          ask: {
            text: "Người trong video trả lời đúng tên dự án hai người đang làm, rồi giục: \"Máy bay sắp cất cánh rồi em.\"",
            choices: [
              { label: "Thấy trả lời đúng nên bấm Duyệt", next: "fooled" },
              { label: "Vẫn cúp máy và gọi số đã lưu", next: "good" },
            ],
          },
          approved: {
            text: "Thông báo đó là lời xin vào tài khoản của CHÍNH BẠN, không phải của trưởng phòng. Bấm Duyệt là mở cửa cho người đang gọi - và hình ảnh, giọng nói đều đã được tạo giả từ video cũ trên mạng.",
            ending: "bad",
          },
          fooled: {
            text: "Tên dự án nằm sẵn trong lịch sử chat mà kẻ chiếm tài khoản đã đọc. Xác minh bên trong chính cuộc gọi đáng ngờ không kiểm chứng được gì.",
            ending: "bad",
          },
          good: {
            text: "Trưởng phòng thật đang ở nhà, máy để im lặng; sáng hôm sau anh xác nhận chưa từng gọi. Bạn bấm Từ chối trên thông báo và báo IT đổi mật khẩu. Chậm vài phút với người thật không gây hại gì.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Không xác minh bên trong chính ứng dụng hay cuộc gọi đang đáng ngờ",
          "Gọi lại bằng số đã lưu trong danh bạ, không dùng số hay đường dẫn vừa nhận được",
          "Mã về máy bạn là của tài khoản bạn - không có lý do hợp lệ nào để gửi cho người khác",
          "Thông báo đăng nhập mà bạn không tự khởi tạo thì bấm Từ chối, không bấm Duyệt hộ ai",
        ],
      },
      {
        type: "closing",
        lines: [
          "Khi mọi thứ nhìn thấy và nghe thấy đều giả được, thứ còn lại đáng tin là kênh do chính bạn mở.",
          "Bài sau: ứng dụng giả và tệp đính kèm độc hại - khi thứ bạn cài hay mở chính là cửa vào.",
        ],
      },
    ],
  },
  {
    id: 353,
    slug: "ung-dung-gia-va-tep-dinh-kem-doc-hai",
    title: "Chặng 16, Bài 4: Ứng dụng giả và tệp đính kèm độc hại",
    subtitle: "Mọi biến thể đều cần một bước: chính bạn cài hoặc bật một thứ gì đó lên máy",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "personal",
    whyItMatters:
      "Một tin nhắn giả chỉ lấy được những gì bạn gõ vào nó. Một ứng dụng độc hại được cấp đủ quyền thì đọc được mọi thứ trên máy, kể cả mã xác thực gửi về sau này, mà không cần lừa thêm lần nào. Vì vậy bước cài đặt và bước cấp quyền là chỗ đáng chặn nhất - và cũng là chỗ dễ chặn nhất, vì nó luôn cần chính tay bạn.",
    openingQuestion: "Người tự xưng nhân viên hỗ trợ gửi một tệp .apk và nói phải cài để \"hoàn tất cập nhật hồ sơ\". Điều gì đáng ngờ nhất?",
    openingOptions: [
      "Tệp có dung lượng nhỏ hơn nhiều so với ứng dụng thật của dịch vụ",
      "Biểu tượng của tệp hơi khác so với biểu tượng ứng dụng chính thức",
      "Người gửi dùng tài khoản cá nhân thay vì tài khoản có dấu xác minh",
      "Bị yêu cầu cài ứng dụng từ một tệp gửi riêng, ngoài kho",
    ],
    correctOption: 3,
    explanation:
      "Câu hỏi đúng không phải là tệp này trông thật hay giả, mà là vì sao một quy trình hợp pháp lại cần bạn cài phần mềm từ một tệp gửi qua tin nhắn. Không có lý do nào cả: dịch vụ thật phát hành ứng dụng qua kho chính thức, nơi có một lớp kiểm duyệt đứng giữa bạn và nhà phát triển. Cài tệp .apk là tự tay bỏ lớp đó đi. Dung lượng và biểu tượng làm giống được dễ dàng, còn dấu xác minh có thể thuộc về một tài khoản đã bị chiếm. Cấu trúc thì không đổi: lời đề nghị \"cài cái này để tiếp tục\" chính là bước kịch bản cần bạn làm, nên gặp nó là đủ để dừng.",
    diagram: [
      { label: "Lời đề nghị cài thứ gì đó để tiếp tục", arrow: true },
      { label: "Chỉ cài từ kho chính thức, tự tìm", arrow: true },
      { label: "Từ chối quyền Trợ năng, SMS, hiển thị đè", arrow: true },
      { label: "Không bật macro trong tệp đính kèm" },
    ],
    realWorldExample: {
      company: "Ứng dụng \"dịch vụ công\" cài từ đường liên kết",
      description:
        "Một kịch bản được cảnh báo nhiều lần ở Việt Nam: người gọi tự xưng cán bộ, hướng dẫn tải một ứng dụng mang tên và biểu tượng giống ứng dụng dịch vụ công, cài từ đường liên kết chứ không từ kho. Ứng dụng xin quyền Trợ năng \"để hỗ trợ người dùng\". Khi được cấp, nó nhìn và bấm được mọi thứ trên màn hình, đọc được tin nhắn chứa mã xác thực, và kẻ gian điều khiển chiếc máy từ xa trong lúc nạn nhân tưởng điện thoại chỉ đang chạy chậm.",
    },
    quiz: [
      {
        question: "Một ứng dụng đèn pin xin quyền Trợ năng (Accessibility). Điều đó có nghĩa gì?",
        options: [
          "Nó cần quyền này để chỉnh độ sáng cho phù hợp với người khiếm thị",
          "Quyền này vô hại vì hệ điều hành chỉ cho dùng trong chính ứng dụng đó",
          "Nó xin quyền đọc màn hình và bấm thay bạn trong mọi ứng dụng",
          "Quyền này chỉ dùng để hiện thông báo, nên cấp cũng không sao",
        ],
        correct: 2,
        explanation:
          "Trợ năng được thiết kế cho phần mềm đọc màn hình của người khiếm thị, nên nó phải thấy và thao tác được mọi ứng dụng - đó là bản chất của quyền, không phải lỗi. Đèn pin không cần nhìn vào ứng dụng nào khác. Một quyền vượt xa chức năng ứng dụng tự nhận là tín hiệu rõ nhất để từ chối.",
      },
      {
        question: "Vì sao quyền đọc tin nhắn SMS nguy hiểm khi ứng dụng không cần tới nó?",
        options: [
          "Vì ứng dụng sẽ dùng quyền đó để tự gửi tin nhắn trừ tiền cước",
          "Vì nhà mạng sẽ khóa sim khi phát hiện ứng dụng lạ đọc tin nhắn",
          "Vì mã xác thực gửi qua SMS cũng nằm trong đó",
          "Vì SMS không được mã hóa nên sẽ bị lộ ra mạng ngoài ngay",
        ],
        correct: 2,
        explanation:
          "Quyền đọc SMS là quyền đọc mọi mã xác thực gửi về số của bạn, nên một ứng dụng có quyền đó vô hiệu hóa luôn lớp xác thực thứ hai. Gửi tin nhắn là một quyền khác, và nhà mạng không theo dõi ứng dụng nào trên máy bạn. Bài 6 của chặng sẽ quay lại việc rà quyền này.",
      },
      {
        question: "Tệp Word đính kèm hiện dòng \"Bấm Enable Content để xem nội dung\". Nên hiểu thế nào?",
        options: [
          "Bước bình thường, vì tài liệu được soạn trên phiên bản Word mới hơn",
          "Lời đề nghị chạy macro - đoạn mã có thể cài phần mềm độc lên máy",
          "An toàn nếu máy đã có phần mềm diệt virus đang chạy nền",
          "An toàn vì tệp Word chỉ chứa chữ và hình, không chứa mã chạy được",
        ],
        correct: 1,
        explanation:
          "Word chặn macro theo mặc định chính vì macro là mã chạy được với quyền của bạn. Tài liệu giả thường để trang trắng hoặc làm mờ nội dung, rồi in dòng chữ nhắc bấm Enable Content - tức là nhờ bạn tắt hộ lớp chặn đó. Phiên bản Word không bao giờ cần bạn bật macro mới đọc được chữ.",
      },
      {
        question: "Kho ứng dụng chính thức có hai ứng dụng cùng tên, cùng biểu tượng. Cách chọn đúng là gì?",
        options: [
          "Chọn ứng dụng có nhiều đánh giá năm sao hơn trong tuần gần đây",
          "Chọn ứng dụng nào cũng được, vì kho đã kiểm duyệt kỹ cả hai",
          "Chọn ứng dụng nặng hơn, vì bản giả thường được làm rất sơ sài",
          "Xem tên nhà phát triển, hoặc mở kho từ trang web chính thức của dịch vụ",
        ],
        correct: 3,
        explanation:
          "Kho chính thức giảm rủi ro rất nhiều nhưng không về không - ứng dụng nhái vẫn lọt qua kiểm duyệt một thời gian trước khi bị gỡ, và đánh giá năm sao mua được. Tên nhà phát triển phải khớp với công ty thật, và cách chắc nhất là đi từ trang web chính thức của dịch vụ tới đúng trang ứng dụng trong kho.",
      },
      {
        question: "Vì sao bật cập nhật hệ điều hành cũng là một cách phòng tấn công?",
        options: [
          "Vì bản cập nhật tự gỡ mọi ứng dụng cài từ ngoài kho chính thức",
          "Vì bản mới chặn hết các tệp đính kèm tải về từ hộp thư",
          "Vì cập nhật đổi lại mật khẩu máy, nên kẻ gian mất quyền vào",
          "Bản cập nhật vá lỗ hổng mà mã độc dùng để chiếm máy",
        ],
        correct: 3,
        explanation:
          "Mã độc không phải lúc nào cũng cần bạn cấp quyền: nhiều loại khai thác lỗ hổng đã được công bố để tự nâng quyền. Bản vá bịt đúng những lỗ đó, và máy chạy bản cũ là máy để ngỏ các lỗ mà cả thế giới đã biết. Cập nhật không gỡ ứng dụng hay đổi mật khẩu của bạn.",
      },
    ],
    keyTakeaways: [
      "\"Cài cái này để tiếp tục\" là bước kịch bản cần - gặp nó là đủ để dừng",
      "Chỉ cài từ kho chính thức, và tự tìm ứng dụng từ trang web của dịch vụ",
      "Trợ năng, đọc SMS, hiển thị đè, quản trị thiết bị: bốn quyền cần dừng lại hỏi",
      "Không bấm Enable Content trong tệp đính kèm; bật cập nhật tự động cho máy",
    ],
    practicePrompt: {
      question:
        "Đang làm thủ tục trên một trang web, bạn bị yêu cầu tải \"trình hỗ trợ bảo mật\" để tiếp tục, kèm hướng dẫn bật quyền Trợ năng. Bạn làm gì?",
      options: [
        "Cài nhưng từ chối quyền Trợ năng, chỉ cho phép quyền thông báo",
        "Dừng lại - \"cài cái này để tiếp tục\" chính là bước kịch bản cần bạn làm",
        "Cài, làm xong thủ tục rồi gỡ ngay để không để lại gì trên máy",
        "Quét tệp bằng phần mềm diệt virus, nếu sạch thì cài theo hướng dẫn",
      ],
      correct: 1,
      explanation:
        "Từ chối một quyền vẫn để lại trên máy một ứng dụng mà nguồn của nó đã đáng ngờ, và nó sẽ xin lại quyền đó bằng những lời nhắc khác. Gỡ sau khi làm xong là quá muộn, vì việc cần làm đã xong trong lúc ứng dụng chạy. Phần mềm diệt virus không nhận ra một ứng dụng mới viết hôm qua. Thủ tục thật không cần bạn cài phần mềm từ trang web để tiếp tục.",
    },
    summary: {
      keyIdea: "Ứng dụng độc và tệp độc đều cần chính tay bạn cài hoặc bật - chặn ở đúng bước đó",
      commonMistake: "Cấp quyền theo phản xạ bấm Cho phép để ứng dụng chạy tiếp",
      action: "Mở phần quyền Trợ năng trên điện thoại hôm nay và xem ứng dụng nào đang có nó.",
    },
    application: {
      title: "Xem ai đang có chìa khóa",
      message:
        "Vào Cài đặt, tìm mục Trợ năng (Accessibility) và xem danh sách ứng dụng đang được bật. Ứng dụng nào bạn không nhận ra, hoặc không có lý do cần nhìn toàn bộ màn hình, thì tắt và cân nhắc gỡ hẳn. Làm tương tự với quyền đọc SMS.",
      secondary:
        "Kiểm tra máy đã bật cập nhật tự động chưa, và với điện thoại Android, kiểm tra tùy chọn cài ứng dụng từ nguồn không xác định đang tắt.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước là những kịch bản thuyết phục bạn tự gõ thông tin vào. Bài này là bước tiếp theo của cùng cấu trúc: thuyết phục bạn tự cài một thứ lên máy. Một khi đã cài và được cấp quyền, nó không cần thuyết phục ai nữa.",
      },
      {
        type: "feynman",
        title: "Cấp quyền cho ứng dụng giống đưa chìa khóa cho thợ",
        intro:
          "Bạn gọi thợ tới sửa bóng đèn. Đưa chìa khóa cổng là hợp lý. Đưa luôn chùm chìa khóa cả nhà, cho thợ đọc thư trong hộp thư, hay để thợ treo một tấm rèm trước cửa sổ thì không ai làm - nhưng trên điện thoại, nhiều người làm đúng như vậy chỉ bằng vài lần bấm Cho phép.",
        columns: ["Ngoài đời", "Trên điện thoại", "Người đó làm được gì"],
        rows: [
          ["Đưa chìa khóa cổng cho thợ sửa đèn", "Ứng dụng quét mã xin quyền máy ảnh", "Đúng việc đã nói, không hơn"],
          ["Đưa cả chùm chìa khóa nhà", "Ứng dụng xin quyền Trợ năng", "Nhìn và bấm mọi thứ trên màn hình"],
          ["Cho thợ đọc thư trong hộp thư", "Ứng dụng xin quyền đọc SMS", "Đọc cả mã xác thực gửi về"],
          ["Để thợ treo tấm rèm vẽ cửa sổ giả", "Quyền hiển thị đè lên ứng dụng khác", "Vẽ ô đăng nhập giả lên trên ứng dụng thật"],
        ],
        oneLiner: "Một câu cho mọi quyền: ứng dụng này có cần đúng quyền đó để làm việc nó nói không?",
      },
      { type: "heading", text: "Cài ngoài kho là bỏ qua người gác cổng" },
      {
        type: "paragraph",
        text: "Kho ứng dụng chính thức không hoàn hảo, nhưng nó đứng giữa bạn và người viết phần mềm: rà mã, gỡ ứng dụng bị báo cáo, và thu hồi được ứng dụng đã cài. Tệp .apk gửi qua tin nhắn hay tải từ trang web đi vòng qua tất cả những thứ đó. Vì vậy điện thoại phải hỏi bạn có cho phép cài từ nguồn không xác định không - và kịch bản luôn có sẵn một câu giải thích vì sao lần này bạn nên bấm Cho phép.",
      },
      {
        type: "flow",
        title: "Một ứng dụng giả chiếm máy qua từng bước bạn bấm",
        steps: [
          { label: "Lời đề nghị cài để tiếp tục", detail: "Qua tin nhắn, cuộc gọi hay một trang web: thủ tục chỉ hoàn tất được khi bạn cài ứng dụng này. Đây là bước duy nhất kẻ gian không tự làm được." },
          { label: "Bật cài từ nguồn không xác định", detail: "Điện thoại cảnh báo và hỏi lại. Người hướng dẫn nói cảnh báo này là bình thường với ứng dụng nội bộ." },
          { label: "Cấp quyền Trợ năng và đọc SMS", detail: "Ứng dụng giải thích là để hỗ trợ người dùng. Từ lúc này nó nhìn được màn hình và đọc được mọi tin nhắn đến." },
          { label: "Hiển thị đè và đọc mã", detail: "Khi bạn mở một ứng dụng khác, nó vẽ ô đăng nhập giả lên trên. Mã xác thực gửi về được đọc trước khi bạn kịp thấy." },
          { label: "Chiếm tài khoản mà không cần lừa thêm", detail: "Kẻ gian điều khiển máy từ xa. Không còn cuộc gọi nào để bạn nghi ngờ - mọi việc diễn ra trên chính điện thoại của bạn." },
        ],
      },
      {
        type: "conceptTable",
        title: "Bốn quyền cần dừng lại hỏi",
        subtitle: "Mỗi quyền đều có lý do chính đáng ở vài ứng dụng, và vô lý ở phần còn lại",
        concepts: [
          {
            vi: "Trợ năng",
            en: "Accessibility",
            def: "Nhìn và thao tác được mọi ứng dụng. Chỉ phần mềm hỗ trợ người khuyết tật và vài công cụ tự động hóa cần tới nó.",
          },
          {
            vi: "Đọc tin nhắn SMS",
            en: "SMS access",
            def: "Đọc mọi mã xác thực gửi về số của bạn. Ứng dụng nhắn tin mặc định cần; gần như mọi ứng dụng khác thì không.",
          },
          {
            vi: "Hiển thị trên ứng dụng khác",
            en: "Overlay",
            def: "Vẽ một lớp lên trên ứng dụng đang mở, nên giả được ô đăng nhập ngay trên ứng dụng thật.",
          },
          {
            vi: "Quản trị thiết bị",
            en: "Device admin",
            def: "Khiến ứng dụng khó gỡ và khóa được máy. Một ứng dụng xin quyền này để \"bảo vệ\" bạn là lý do để gỡ nó.",
          },
        ],
      },
      { type: "heading", text: "Tệp đính kèm: chữ không chạy, macro thì chạy" },
      {
        type: "paragraph",
        text: "Một tài liệu chỉ có chữ và hình thì mở ra không làm gì máy của bạn. Macro là đoạn mã nhúng trong tài liệu văn phòng, chạy được với quyền của bạn - và vì thế Word, Excel chặn nó theo mặc định. Tài liệu độc hại không thể tự tắt lớp chặn ấy, nên nó nhờ bạn: để trống nội dung, rồi ghi một dòng hướng dẫn bấm Enable Content. Đuôi .docm, .xlsm cũng cho biết tệp có chứa macro trước khi bạn mở.",
      },
      {
        type: "scenario",
        title: "Tệp báo giá trong hộp thư công việc",
        start: "start",
        nodes: {
          start: {
            text: "Email từ một địa chỉ bạn chưa thấy bao giờ, kèm tệp Bao_gia_thang10.docm. Thư viết trơn tru, nhắc bạn xem trước 5 giờ chiều để kịp chốt.",
            choices: [
              { label: "Mở tệp xem ngay cho kịp giờ", next: "opened" },
              { label: "Đọc đuôi tệp và địa chỉ người gửi trước", next: "inspect" },
            ],
          },
          inspect: {
            text: "Đuôi .docm nghĩa là tài liệu có chứa macro. Tên miền người gửi không thuộc công ty nào bạn từng làm việc.",
            choices: [
              { label: "Không mở, chuyển thư cho bộ phận IT rồi xóa", next: "good" },
              { label: "Vẫn mở thử vì có thể là khách hàng mới", next: "opened" },
            ],
          },
          opened: {
            text: "Tài liệu hiện một trang trắng với dòng chữ: \"Nội dung được bảo vệ. Bấm Enable Content để xem.\"",
            choices: [
              { label: "Bấm Enable Content", next: "bad" },
              { label: "Đóng tệp, gọi công ty đó bằng số tra trên trang chính thức", next: "verify" },
            ],
          },
          verify: {
            text: "Công ty kia trả lời họ không gửi báo giá nào, và không có nhân viên nào tên như trong thư.",
            choices: [
              { label: "Báo bộ phận IT và xóa thư", next: "good" },
              { label: "Mở lại tệp xem cho chắc rồi mới xóa", next: "bad" },
            ],
          },
          bad: {
            text: "Macro vừa chạy với quyền của bạn và tải thêm một chương trình về máy. Chỉ cần một cú bấm - từ lúc này mọi lớp bảo vệ còn lại đều phải làm việc khó hơn nhiều.",
            ending: "bad",
          },
          good: {
            text: "Tệp không bao giờ được chạy. Bộ phận IT chặn tên miền đó cho cả công ty, nên đồng nghiệp nhận cùng thư cũng được bảo vệ nhờ một lần báo của bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Cập nhật là lớp bảo vệ bạn không cần nghĩ tới",
        text: "Không phải mã độc nào cũng cần bạn bấm Cho phép: một số khai thác lỗ hổng đã được công bố để tự lấy quyền. Bản vá bịt đúng những lỗ đó. Bật cập nhật tự động cho hệ điều hành và trình duyệt là việc làm một lần, và nó che cho bạn cả những lúc bạn không tỉnh táo.",
      },
      {
        type: "closing",
        lines: [
          "Ứng dụng độc và tệp độc đều cần chính tay bạn mở cửa - nên câu \"cài cái này để tiếp tục\" là câu đáng từ chối nhất.",
          "Bài sau: trang đăng nhập giả, và vì sao cả mã OTP cũng có thể bị lấy ngay trong lúc bạn gõ.",
        ],
      },
    ],
  },
  {
    id: 354,
    slug: "trang-dang-nhap-gia-va-ma-otp",
    title: "Chặng 16, Bài 5: Trang đăng nhập giả và mã OTP",
    subtitle: "Trang giả không cần đoán mã của bạn - nó chỉ cần chuyển tiếp mã đó đi trong vài giây",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔑",
    track: "personal",
    whyItMatters:
      "Nhiều người nghĩ đã bật mã OTP là an toàn tuyệt đối, nên khi gặp một trang đăng nhập giả, họ bớt cảnh giác đúng lúc cần cảnh giác nhất. Mã OTP chặn được kẻ chỉ có mật khẩu của bạn, nhưng không chặn được một trang giả đang chuyển tiếp mã sang trang thật ngay lúc bạn gõ. Hiểu điều đó cho biết khi nào cần dừng tay, và vì sao passkey mạnh hơn.",
    openingQuestion: "Bạn đã bật mã OTP. Nếu lỡ nhập mật khẩu và mã OTP vào một trang đăng nhập giả, chuyện gì xảy ra?",
    openingOptions: [
      "Không sao, vì mã OTP hết hạn sau 30 giây nên kẻ gian không kịp dùng",
      "Kẻ gian dùng ngay mã đó trong vài giây để đăng nhập vào trang thật",
      "Không sao, vì mã OTP chỉ dùng được trên đúng điện thoại đã nhận nó",
      "Kẻ gian chỉ có mật khẩu, vì trang giả không đọc được ô nhập mã OTP",
    ],
    correctOption: 1,
    explanation:
      "Trang giả hiện đại không lưu mật khẩu rồi để dành - nó đứng giữa bạn và trang thật, chuyển mọi thứ bạn gõ sang trang thật ngay tức khắc. Bạn gõ mật khẩu, nó gõ hộ vào trang thật; trang thật gửi OTP, bạn gõ mã, nó lại gõ hộ. Ba mươi giây là quá thừa. Thứ kẻ gian giữ được ở cuối là phiên đăng nhập, nên đổi mật khẩu sau đó cũng không tự đẩy họ ra. Mã OTP không biết nó đang được gõ vào trang nào; passkey và khóa bảo mật thì biết, vì chúng gắn với tên miền thật và từ chối trả lời một tên miền khác.",
    diagram: [
      { label: "Trang giả nhận mật khẩu và mã OTP", arrow: true },
      { label: "Chuyển tiếp ngay sang trang thật", arrow: true },
      { label: "Kẻ gian giữ phiên đăng nhập", arrow: true },
      { label: "Passkey từ chối vì sai tên miền" },
    ],
    realWorldExample: {
      company: "Một chiến dịch nhắm vào hơn 10.000 tổ chức",
      description:
        "Năm 2022, Microsoft công bố một chiến dịch giả mạo trang đăng nhập nhắm vào hơn 10.000 tổ chức. Nạn nhân đều đã bật xác thực hai lớp, và lớp đó vẫn bị vượt qua: trang giả đứng giữa, chuyển tiếp mật khẩu và mã sang trang thật, rồi giữ lấy phiên đăng nhập. Bộ công cụ để dựng loại trang này được chia sẻ công khai, nên kỹ thuật này không còn dành riêng cho nhóm tấn công tinh vi nào.",
    },
    quiz: [
      {
        question: "Vì sao trang giả vượt qua được mã OTP dù mã chỉ có hiệu lực 30 giây?",
        options: [
          "Vì nó đoán được mã nhờ biết thuật toán sinh mã của ứng dụng xác thực",
          "Nó chuyển mã sang trang thật ngay lúc bạn gõ",
          "Vì mã OTP thực ra vẫn còn dùng được thêm vài phút sau khi hết hạn",
          "Vì nó đã cài phần mềm đọc tin nhắn lên điện thoại của bạn từ trước",
        ],
        correct: 1,
        explanation:
          "Trang giả không cần mã sống lâu, chỉ cần nó sống đủ một giây. Nó đứng giữa và gõ hộ mọi thứ bạn nhập vào trang thật. Mã được sinh ngẫu nhiên từ một khóa bí mật nên không đoán được, và trang giả không cần chạm vào điện thoại của bạn - bạn tự đọc mã cho nó.",
      },
      {
        question: "Người tự xưng bộ phận hỗ trợ đề nghị bạn đọc mã OTP vừa nhận để \"hủy yêu cầu đổi mật khẩu\". Bạn làm gì?",
        options: [
          "Đọc được, vì mã chỉ dùng để hủy yêu cầu đang chờ",
          "Đọc được nếu họ biết đúng email và số điện thoại đăng ký của bạn",
          "Không đọc - mã đó chính là thứ cho phép đổi mật khẩu",
          "Chỉ đọc nửa đầu của mã để họ xác minh, giữ lại nửa sau cho an toàn",
        ],
        correct: 2,
        explanation:
          "Mã gửi về máy bạn là để chứng minh chính bạn đang thực hiện thao tác vừa được yêu cầu - ở đây là đổi mật khẩu do kẻ gian khởi động. Không có mã nào dùng để hủy. Email và số điện thoại của bạn lấy được từ dữ liệu rò rỉ. Một mã OTP không bao giờ được đọc cho ai, kể cả một nửa.",
      },
      {
        question: "Passkey chống được trang đăng nhập giả nhờ đâu?",
        options: [
          "Nó dài hơn mật khẩu nên kẻ gian không kịp sao chép",
          "Nó đi qua SMS đã mã hóa nên trang giả không đọc được",
          "Nó cần quét vân tay, bước mà trang giả không giả được",
          "Nó gắn với tên miền thật, nên không trả lời một tên miền khác",
        ],
        correct: 3,
        explanation:
          "Khi tạo passkey, điện thoại ghi nhớ nó thuộc về đúng tên miền nào. Trang giả có tên miền khác, nên điện thoại không đưa ra passkey nào cả - không có gì để bạn lỡ tay gửi đi. Vân tay chỉ mở khóa passkey trên máy bạn, không phải lý do nó chống được trang giả. Passkey không đi qua SMS.",
      },
      {
        question: "Trình quản lý mật khẩu không tự điền trên một trang trông giống hệt trang quen. Nên hiểu thế nào?",
        options: [
          "Tên miền khác tên miền đã lưu - dừng lại và đọc thanh địa chỉ",
          "Trình quản lý đang lỗi, nên mở kho mật khẩu và chép tay sang ô nhập",
          "Trang đã đổi giao diện, cần sửa lại mục đã lưu cho khớp với trang mới",
          "Trình duyệt chặn tự điền vì kết nối của trang chưa có ổ khóa",
        ],
        correct: 0,
        explanation:
          "Trình quản lý mật khẩu điền theo tên miền, không theo giao diện, nên nó không bị đánh lừa bởi một trang giống hệt. Khi nó im lặng ở một trang lẽ ra phải quen, đó là tín hiệu đáng tin nhất bạn có. Chép tay mật khẩu sang là tự tay bỏ qua chính tín hiệu đó.",
      },
      {
        question: "Biểu tượng ổ khóa và https trên thanh địa chỉ chứng minh điều gì?",
        options: [
          "Trang đã được cơ quan chứng thực kiểm tra là trang thật của dịch vụ",
          "Trang an toàn để nhập mật khẩu, nhưng chưa an toàn để nhập mã OTP",
          "Kết nối được mã hóa - tới bất kỳ ai sở hữu tên miền đó",
          "Trang thuộc về một doanh nghiệp đã đăng ký kinh doanh hợp lệ",
        ],
        correct: 2,
        explanation:
          "Chứng chỉ https cấp miễn phí và tự động cho bất kỳ ai sở hữu một tên miền, kể cả tên miền nhái. Ổ khóa nghĩa là không ai nghe lén được đường truyền giữa bạn và trang - nó không nói gì về việc trang đó là ai. Tên miền mới trả lời câu hỏi ấy.",
      },
    ],
    keyTakeaways: [
      "Trang giả chuyển tiếp mật khẩu và mã OTP sang trang thật ngay lúc bạn gõ",
      "Không bao giờ đọc mã OTP cho ai - không có mã nào dùng để \"hủy\" một yêu cầu",
      "Passkey và khóa bảo mật gắn với tên miền thật, nên trang giả không lấy được gì",
      "Trình quản lý mật khẩu im lặng ở trang quen là tín hiệu để dừng, không phải lỗi",
    ],
    practicePrompt: {
      question:
        "Bạn bấm liên kết trong email, trang đăng nhập hiện ra giống hệt, trình quản lý mật khẩu không gợi ý gì, và trang đòi thêm mã OTP. Bước đúng là gì?",
      options: [
        "Chép mật khẩu từ trình quản lý rồi nhập tay, sau đó nhập mã OTP",
        "Nhập mật khẩu nhưng bỏ qua bước OTP để giới hạn mức thiệt hại",
        "Nhập cả hai, rồi đổi mật khẩu ngay sau đó để chắc chắn an toàn",
        "Đóng trang, tự gõ địa chỉ quen và đăng nhập ở đó nếu cần",
      ],
      correct: 3,
      explanation:
        "Trình quản lý im lặng đã trả lời câu hỏi trang này là ai, nên mọi phương án còn lại đều là gửi thứ gì đó cho kẻ gian. Bỏ qua OTP vẫn làm lộ mật khẩu. Đổi mật khẩu sau khi đã đưa cả mã không đẩy được kẻ gian ra, vì họ đang giữ phiên đăng nhập - muốn vậy phải đăng xuất mọi thiết bị từ trang thật.",
    },
    summary: {
      keyIdea: "Mã OTP không biết nó đang được gõ vào trang nào; passkey và trình quản lý mật khẩu thì biết",
      commonMistake: "Tưởng đã bật OTP thì nhập nhầm vào trang giả cũng không sao vì mã hết hạn nhanh",
      action: "Bật passkey cho tài khoản email chính nếu dịch vụ đã hỗ trợ.",
    },
    application: {
      title: "Một passkey cho tài khoản quan trọng nhất",
      message:
        "Vào phần bảo mật của tài khoản email chính và tìm mục passkey (có nơi gọi là khóa truy cập). Nếu đã có, tạo một passkey trên điện thoại của bạn. Từ đó, đăng nhập bằng vân tay hoặc khuôn mặt, và không trang giả nào lấy được thứ để chuyển tiếp.",
      secondary:
        "Nếu chưa dùng trình quản lý mật khẩu, bài sau sẽ nói vì sao nó vừa là kho mật khẩu, vừa là người đọc tên miền hộ bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài 2 dạy đọc tên miền trước khi bấm. Bài này nói chuyện gì xảy ra khi bạn đã bấm và đang đứng trước một trang đăng nhập giống hệt - và vì sao mã OTP, lớp bảo vệ nhiều người tin nhất, không cứu được ở đúng chỗ này.",
      },
      {
        type: "feynman",
        title: "Mã OTP giống mật mã cửa đọc qua điện thoại, passkey giống chìa khóa chỉ vừa một ổ",
        intro:
          "Một người đứng ở cửa nhà bạn và gọi cho bạn: \"Cửa đang hỏi mật mã, đọc cho tôi.\" Mật mã đúng, cửa mở - cửa không biết ai đang đứng trước nó. Một chiếc chìa khóa thì khác: nó chỉ vừa đúng ổ khóa nhà bạn, cắm vào ổ khác thì không xoay được, dù người cầm có khéo tới đâu.",
        columns: ["Ngoài đời", "Khi đăng nhập", "Trang giả lấy được không"],
        rows: [
          ["Đọc mật mã cửa qua điện thoại", "Gõ mã OTP từ tin nhắn vào trang", "Được - nó chuyển mã đi ngay lúc bạn gõ"],
          ["Bấm nút mở cửa từ xa khi chuông reo", "Bấm Duyệt trên thông báo đăng nhập", "Được - nếu bạn duyệt đúng lúc nó đăng nhập"],
          ["Người giữ chìa nhìn kỹ số nhà", "Trình quản lý mật khẩu không điền", "Thường không - trừ khi bạn chép tay sang"],
          ["Chìa khóa chỉ vừa một ổ", "Passkey hoặc khóa bảo mật", "Không - tên miền sai thì không có gì để gửi"],
        ],
        oneLiner: "Mã OTP không biết nó được gõ vào đâu; passkey thì biết, và đó là toàn bộ sự khác biệt.",
      },
      { type: "heading", text: "Trang giả đứng giữa, không đứng thay" },
      {
        type: "paragraph",
        text: "Trang giả kiểu cũ là một bản sao tĩnh: nó lưu mật khẩu bạn gõ để dùng sau, và mã OTP đã chặn được kiểu này. Kiểu mới thì đứng giữa bạn và trang thật. Mọi thứ trang thật hiển thị được chuyển cho bạn, mọi thứ bạn gõ được chuyển cho trang thật - nên nó trông giống hệt, vì nó chính là trang thật nhìn qua một tấm kính của người khác.",
      },
      {
        type: "flow",
        title: "Mật khẩu và mã OTP đi qua trang giả trong vài giây",
        steps: [
          { label: "Bạn mở liên kết trong thư", detail: "Tên miền là một bản nhái. Trang giả lập tức mở trang đăng nhập thật ở phía bên kia và chuyển giao diện về cho bạn." },
          { label: "Bạn gõ mật khẩu", detail: "Trang giả gõ hộ đúng mật khẩu đó vào trang thật. Trang thật thấy mật khẩu đúng và gửi mã OTP về máy bạn." },
          { label: "Bạn gõ mã OTP", detail: "Mã đúng, còn hạn, đi sang trang thật trong chưa tới một giây. Không có gì phải đoán." },
          { label: "Trang thật trả về phiên đăng nhập", detail: "Đó là thứ giữ bạn đăng nhập mà không phải gõ lại. Trang giả giữ lấy nó, rồi chuyển bạn tới trang thật như không có gì xảy ra." },
          { label: "Kẻ gian dùng phiên đăng nhập", detail: "Đổi mật khẩu sau đó không tự đẩy họ ra. Phải đăng xuất mọi thiết bị từ trang thật - bài 7 của chặng nói thứ tự việc cần làm." },
        ],
      },
      {
        type: "conceptTable",
        title: "Bốn kiểu lớp thứ hai trước một trang giả",
        subtitle: "Cả bốn đều tốt hơn chỉ có mật khẩu; chỉ một kiểu chống được trang giả đứng giữa",
        concepts: [
          {
            vi: "Mã qua SMS",
            en: "SMS OTP",
            def: "Bị chuyển tiếp được, và còn có thể bị lấy qua đổi sim hay ứng dụng đọc tin nhắn. Vẫn hơn hẳn không có gì.",
          },
          {
            vi: "Ứng dụng xác thực",
            en: "Authenticator app",
            def: "Không lộ qua sim hay tin nhắn, nhưng mã vẫn là chữ số bạn tự gõ vào - nên trang giả vẫn chuyển tiếp được.",
          },
          {
            vi: "Bấm Duyệt trên thông báo",
            en: "Push approval",
            def: "Tiện, nhưng duyệt một thông báo bạn không tự gây ra là mở cửa cho người khác. Loại có hiện số để khớp thì khó lừa hơn.",
          },
          {
            vi: "Passkey, khóa bảo mật",
            en: "Passkey / security key",
            def: "Gắn với tên miền thật. Trang giả có tên miền khác nên không nhận được gì để chuyển tiếp.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tài liệu được chia sẻ với bạn",
        start: "start",
        nodes: {
          start: {
            text: "Email mang tên một đồng nghiệp: \"Mình gửi bạn bản kế hoạch quý, xem giúp trước cuộc họp 2 giờ nhé.\" Nút \"Mở tài liệu\" dẫn tới một trang đăng nhập tài khoản công việc.",
            choices: [
              { label: "Đăng nhập luôn vì sắp tới giờ họp", next: "typed" },
              { label: "Nhìn thanh địa chỉ trước khi gõ", next: "look" },
            ],
          },
          look: {
            text: "Thanh địa chỉ ghi office365-docs-share.com. Trình quản lý mật khẩu không gợi ý mục nào cho trang này.",
            choices: [
              { label: "Đóng tab, mở ứng dụng làm việc thật để tìm tài liệu", next: "good" },
              { label: "Chép mật khẩu từ trình quản lý rồi dán vào", next: "typed" },
            ],
          },
          typed: {
            text: "Bạn đã nhập mật khẩu. Trang hỏi tiếp mã từ ứng dụng xác thực, kèm đồng hồ đếm ngược 30 giây.",
            choices: [
              { label: "Nhập mã - OTP chỉ sống 30 giây, lộ cũng không sao", next: "bad" },
              { label: "Dừng lại, đổi mật khẩu ngay trong ứng dụng thật", next: "stopped" },
            ],
          },
          stopped: {
            text: "Mật khẩu đã lộ nhưng lớp thứ hai thì chưa. Đổi mật khẩu từ ứng dụng thật ngay lúc này khiến thứ kẻ gian vừa lấy được trở nên vô dụng. Bạn báo bộ phận IT để họ cảnh báo những người khác nhận cùng thư.",
            ending: "good",
          },
          bad: {
            text: "Mã được chuyển sang trang thật trong chưa tới một giây, và kẻ gian giữ phiên đăng nhập của bạn. Đổi mật khẩu bây giờ không tự đẩy họ ra - phải đăng xuất mọi thiết bị từ trang thật và báo bộ phận IT ngay.",
            ending: "bad",
          },
          good: {
            text: "Tài liệu thật không có trong ứng dụng, và đồng nghiệp xác nhận qua cuộc gọi là họ không gửi gì. Bạn không gõ một ký tự nào vào trang giả - và trình quản lý mật khẩu đã chỉ ra điều đó trước cả mắt bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Trình quản lý mật khẩu đọc tên miền không biết mệt",
        text: "Bạn có thể quên đọc thanh địa chỉ lúc vội; trình quản lý mật khẩu thì không, vì nó chỉ điền ở đúng tên miền đã lưu. Khi nó im lặng ở một trang lẽ ra phải quen, đừng mở kho mật khẩu ra chép tay - sự im lặng đó chính là câu trả lời.",
      },
      {
        type: "closing",
        lines: [
          "Mã OTP chặn người chỉ có mật khẩu của bạn; nó không chặn được bạn tự gõ mã vào trang giả - passkey thì chặn được.",
          "Bài sau: bảo mật tài khoản ở mức tối thiểu, bốn việc làm một lần rồi thôi.",
        ],
      },
    ],
  },
  {
    id: 355,
    slug: "bao-mat-tai-khoan-toi-thieu",
    title: "Chặng 16, Bài 6: Bảo mật tài khoản ở mức tối thiểu",
    subtitle: "Vài việc làm một lần chặn được phần lớn cách người khác vào được tài khoản quan trọng của bạn",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    whyItMatters:
      "Các bài trước nói về việc bạn bị thuyết phục tự mở cửa. Bài này nói về cách còn lại: người khác vào được email, tài khoản công việc hay kho lưu trữ đám mây của bạn mà không cần thuyết phục ai - bằng một mật khẩu lộ ở nơi khác, hay một số điện thoại bị chiếm. Cách này chặn được bằng vài thao tác làm một lần rồi thôi.",
    openingQuestion: "Bạn chỉ có một buổi tối để tăng bảo mật. Tài khoản nào nên được làm trước tiên?",
    openingOptions: [
      "Tài khoản mạng xã hội, vì đó là nơi nhiều người nhìn thấy bạn nhất",
      "Kho ảnh trên đám mây, vì đó là nơi chứa nhiều dữ liệu riêng tư nhất",
      "Email chính, vì nó đặt lại được mật khẩu của mọi nơi khác",
      "Tài khoản công việc, vì công ty thiệt hại nhất",
    ],
    correctOption: 2,
    explanation:
      "Email là chìa khóa vạn năng: ai kiểm soát nó thì bấm quên mật khẩu ở mạng xã hội, kho đám mây, tài khoản công việc và nhận liên kết đặt lại ngay trong hộp thư. Nghĩa là mọi tài khoản khác chỉ mạnh bằng email gắn với chúng, bất kể mật khẩu của chúng phức tạp tới đâu. Vì vậy thứ tự đúng là: mật khẩu riêng cho email, bật xác thực hai lớp cho email bằng ứng dụng xác thực hoặc khóa truy cập (passkey) thay vì tin nhắn SMS, rồi mới tới các tài khoản còn lại. Tài khoản công việc thường đã có bộ phận IT lo phần lớn; email cá nhân thì không ai lo ngoài bạn.",
    diagram: [
      { label: "Trình quản lý mật khẩu, mỗi nơi một mật khẩu", arrow: true },
      { label: "Xác thực hai lớp cho email trước tiên", arrow: true },
      { label: "Khóa đổi sim tại nhà mạng", arrow: true },
      { label: "Rà quyền ứng dụng và phiên đăng nhập" },
    ],
    realWorldExample: {
      company: "Một mật khẩu dùng lại ở năm nơi",
      description:
        "Một diễn đàn nhỏ mà bạn đăng ký từ thời sinh viên bị lộ dữ liệu người dùng. Bản thân diễn đàn không có gì quan trọng - nhưng mật khẩu bạn dùng ở đó cũng là mật khẩu email cá nhân, và các công cụ dò tự động thử ngay cặp email và mật khẩu ấy trên hàng trăm dịch vụ khác. Email mở ra kho ảnh đám mây, rồi mạng xã hội, rồi tài khoản công việc gắn với nó. Một mắt xích yếu ở nơi không quan trọng mở ra toàn bộ phần còn lại.",
    },
    quiz: [
      {
        question: "Vì sao dùng lại một mật khẩu ở nhiều nơi là rủi ro lớn?",
        options: [
          "Vì hệ thống sẽ tự khóa tài khoản khi phát hiện mật khẩu trùng với nơi khác",
          "Vì mật khẩu dùng nhiều nơi sẽ hết hạn nhanh hơn",
          "Vì nhà cung cấp dịch vụ nhìn thấy được mật khẩu dùng chung giữa các trang",
          "Vì một dịch vụ bị lộ dữ liệu là đủ để mở các tài khoản còn lại",
        ],
        correct: 3,
        explanation:
          "Điểm yếu không nằm ở nơi quan trọng nhất mà nằm ở nơi yếu nhất bạn từng đăng ký. Công cụ dò tự động thử cặp email và mật khẩu bị lộ trên mọi dịch vụ lớn trong vài phút.",
      },
      {
        question: "Trình quản lý mật khẩu giải quyết vấn đề gì?",
        options: [
          "Cho phép mỗi nơi một mật khẩu dài mà bạn không phải nhớ",
          "Tự đổi mật khẩu mỗi tháng nên không cần xác thực hai lớp nữa",
          "Giấu mật khẩu khỏi chính bạn nên có ai gọi hỏi cũng không đọc được",
          "Thay email khôi phục nên mất email cũng không sao",
        ],
        correct: 0,
        explanation:
          "Lý do người ta dùng lại mật khẩu là vì không nhớ nổi hai mươi mật khẩu khác nhau. Trình quản lý gỡ đúng nút thắt đó: bạn nhớ một mật khẩu chính, phần còn lại do nó tạo và điền. Nó không thay xác thực hai lớp.",
      },
      {
        question: "Vì sao xác thực hai lớp bằng ứng dụng hoặc passkey tốt hơn mã gửi qua SMS?",
        options: [
          "Vì tin nhắn SMS bị tính theo từng mã nên dễ bị nhà mạng chặn lại giữa chừng",
          "Vì mã SMS đi theo số điện thoại, mà số điện thoại có thể bị chiếm qua đổi sim",
          "Vì ứng dụng xác thực tự đổi mật khẩu chính của bạn sau mỗi lần đăng nhập",
          "Vì mã SMS chỉ có bốn chữ số còn mã trong ứng dụng luôn dài mười hai chữ số",
        ],
        correct: 1,
        explanation:
          "Ai làm lại được sim số của bạn thì nhận luôn mã SMS. Mã trong ứng dụng nằm trên chính điện thoại của bạn, còn passkey gắn với đúng trang thật nên trang đăng nhập giả không dùng được. SMS vẫn tốt hơn không có lớp thứ hai nào.",
      },
      {
        question: "Khóa đổi sim tại nhà mạng có tác dụng gì?",
        options: [
          "Ngăn các cuộc gọi giả mạo từ số lạ gọi tới máy của bạn vào ban đêm",
          "Ngăn ứng dụng trên máy đọc tin nhắn chứa mã xác thực",
          "Ngăn người khác làm lại sim số của bạn để nhận mã thay bạn",
          "Ngăn số của bạn bị dùng để đăng ký tài khoản mạng xã hội mới",
        ],
        correct: 2,
        explanation:
          "Nếu mã xác thực gửi về số điện thoại và ai đó làm lại được sim số đó, họ nhận mã thay bạn - lớp bảo vệ thứ hai biến mất. Đây là lỗ hổng ít người biết và bịt được bằng một lần liên hệ nhà mạng.",
      },
      {
        question:
          "Trong cài đặt bảo mật của email, bạn thấy một phiên đăng nhập ở thành phố khác và một ứng dụng lạ có quyền đọc thư. Nên làm gì?",
        options: [
          "Đăng xuất phiên đó, thu hồi quyền ứng dụng, rồi đổi mật khẩu",
          "Để nguyên vì đó có thể là máy chủ của nhà cung cấp email đặt ở nơi khác",
          "Chỉ đổi mật khẩu, vì đổi mật khẩu sẽ tự đá văng mọi phiên và ứng dụng",
          "Gỡ ứng dụng lạ khỏi điện thoại, vì quyền đọc thư nằm trong máy chứ không ở tài khoản",
        ],
        correct: 0,
        explanation:
          "Quyền cấp cho ứng dụng bên thứ ba nằm ở tài khoản, không ở điện thoại, và với nhiều dịch vụ nó vẫn sống sau khi bạn đổi mật khẩu. Phải thu hồi tận gốc trong mục bảo mật của tài khoản.",
      },
    ],
    keyTakeaways: [
      "Email là chìa khóa của mọi tài khoản khác, nên nó cần lớp bảo vệ mạnh nhất",
      "Trình quản lý mật khẩu cho phép mỗi nơi một mật khẩu riêng mà không phải nhớ",
      "Xác thực hai lớp: ưu tiên ứng dụng hoặc passkey, và không bao giờ đưa mã cho ai",
      "Khóa đổi sim và rà phiên đăng nhập, quyền ứng dụng bịt những cửa ít người để ý",
    ],
    practicePrompt: {
      question:
        "Bạn dùng cùng một mật khẩu cho email cá nhân, kho ảnh đám mây và vài diễn đàn cũ. Nên bắt đầu sửa từ đâu?",
      options: [
        "Đổi mật khẩu kho ảnh trước vì đó là nơi chứa dữ liệu riêng tư nhiều nhất",
        "Xóa tài khoản ở các diễn đàn cũ trước vì đó là nơi dễ lộ dữ liệu nhất",
        "Đổi toàn bộ mật khẩu cùng lúc trong một buổi, không cần theo thứ tự nào",
        "Đổi mật khẩu email và bật xác thực hai lớp cho nó trước tiên",
      ],
      correct: 3,
      explanation:
        "Email đứng trước vì nó là chìa khóa của mọi thứ còn lại - đổi mật khẩu kho ảnh trước mà email vẫn dùng mật khẩu đã lộ thì kẻ tấn công chỉ cần bấm quên mật khẩu. Thứ tự quan trọng hơn tốc độ ở đây.",
    },
    summary: {
      keyIdea: "Vài việc làm một lần chặn được phần lớn cách người khác vào được tài khoản của bạn",
      commonMistake: "Đặt mật khẩu phức tạp cho từng tài khoản nhưng để email dùng chung mật khẩu với nơi khác",
      action: "Đổi mật khẩu email sang một mật khẩu riêng do trình quản lý tạo và bật xác thực hai lớp cho nó ngay hôm nay.",
    },
    application: {
      title: "Năm việc, một buổi tối",
      message:
        "Cài một trình quản lý mật khẩu. Đổi mật khẩu email sang mật khẩu riêng và bật xác thực hai lớp bằng ứng dụng hoặc passkey. Liên hệ nhà mạng đăng ký khóa đổi sim. Rà phiên đăng nhập và ứng dụng có quyền vào email, mạng xã hội, kho đám mây.",
      secondary:
        "Những việc này làm một lần rồi thôi, và chúng chặn được phần lớn con đường mà người khác dùng để vào tài khoản của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Các bài trước nói về việc bạn bị thuyết phục tự mở cửa. Bài này nói về con đường còn lại: có người vào được tài khoản của bạn mà không cần thuyết phục ai cả.",
      },
      {
        type: "feynman",
        title: "Bảo mật tài khoản giống khóa cửa nhà",
        intro: "Không ai dùng một chìa cho cả cửa nhà, cửa xe và két tủ, rồi treo chìa ấy ở quán cà phê. Nhưng dùng một mật khẩu cho mười nơi thì đúng là như vậy.",
        columns: ["Thành phần", "Ngoài đời", "Trên mạng"],
        rows: [
          ["Mỗi cửa một chìa", "Chìa nhà, chìa xe, chìa tủ riêng", "Mỗi dịch vụ một mật khẩu, lưu trong trình quản lý"],
          ["Chìa khóa chủ", "Chìa mở được tủ đựng mọi chìa khác", "Email - đặt lại được mật khẩu mọi nơi"],
          ["Lớp thứ hai", "Khóa hai lớp, chuông báo động", "Xác thực hai lớp bằng ứng dụng hoặc passkey"],
          ["Đếm lại ai đang có chìa", "Thu lại chìa đã đưa thợ sửa nhà", "Rà phiên đăng nhập và ứng dụng có quyền truy cập"],
        ],
        oneLiner: "Khóa chặt nhất chiếc chìa khóa chủ là email, mỗi cửa một chìa riêng, và thỉnh thoảng đếm lại ai đang cầm chìa.",
      },
      { type: "heading", text: "Email là chìa khóa của mọi thứ" },
      {
        type: "paragraph",
        text: "Phần lớn người bảo vệ tài khoản công việc hay mạng xã hội cẩn thận hơn hẳn email cá nhân, trong khi email mới là nơi có quyền lực lớn nhất: ai kiểm soát nó thì bấm quên mật khẩu ở mọi dịch vụ khác và nhận liên kết đặt lại. Nghĩa là lớp bảo vệ của bạn chỉ mạnh bằng lớp bảo vệ của email, bất kể bạn đặt mật khẩu ở nơi khác phức tạp tới đâu.",
      },
      {
        type: "conceptTable",
        title: "Năm việc, xếp theo hiệu quả trên công sức",
        subtitle: "Tất cả đều làm một lần rồi thôi",
        concepts: [
          {
            vi: "Xác thực hai lớp",
            en: "Two-factor",
            def: "Hiệu quả cao nhất. Ưu tiên ứng dụng xác thực hoặc khóa truy cập (passkey); SMS vẫn hơn không có. Điều kiện: không bao giờ đưa mã hay bấm Duyệt hộ ai.",
          },
          {
            vi: "Trình quản lý mật khẩu",
            en: "Password manager",
            def: "Mỗi nơi một mật khẩu dài, bạn chỉ nhớ một mật khẩu chính. Một dịch vụ bị lộ không còn mở được nơi khác.",
          },
          {
            vi: "Khóa đổi sim",
            en: "SIM lock",
            def: "Ngăn người khác làm lại sim số của bạn để nhận mã thay. Ít người biết, và bịt được bằng một lần liên hệ nhà mạng.",
          },
          {
            vi: "Rà phiên đăng nhập",
            en: "Active sessions",
            def: "Mục bảo mật của email và mạng xã hội liệt kê các thiết bị đang đăng nhập. Thiết bị nào không nhận ra thì đăng xuất.",
          },
          {
            vi: "Rà quyền ứng dụng",
            en: "App access",
            def: "Ứng dụng bên thứ ba có quyền đọc thư hay đọc tin nhắn là có quyền đọc mã xác thực. Không cần chức năng đó thì thu hồi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Xác thực hai lớp chỉ mạnh bằng việc bạn không đưa mã đi",
        text: "Đây là lý do bài này nằm sau các bài về kịch bản tấn công chứ không nằm trước. Mọi biện pháp kỹ thuật đều có thể bị vô hiệu hóa bằng cách thuyết phục chính chủ tài khoản tự tay mở cửa - và đó chính xác là việc mà các bài trước mô tả.",
      },
      {
        type: "flow",
        title: "Một buổi tối, theo đúng thứ tự",
        steps: [
          { label: "Cài trình quản lý mật khẩu", detail: "Chọn một mật khẩu chính dài, dễ nhớ với bạn và không dùng ở đâu khác." },
          { label: "Email trước tiên", detail: "Đổi mật khẩu email sang một mật khẩu riêng do trình quản lý tạo." },
          { label: "Bật xác thực hai lớp", detail: "Cho email trước, bằng ứng dụng xác thực hoặc passkey; lưu mã dự phòng ở nơi an toàn." },
          { label: "Khóa đổi sim", detail: "Liên hệ nhà mạng để yêu cầu xác minh trực tiếp trước mọi lần làm lại sim." },
          { label: "Rà phiên và quyền ứng dụng", detail: "Đăng xuất thiết bị lạ, thu hồi ứng dụng không còn dùng ở email, mạng xã hội, kho đám mây." },
          { label: "Lần lượt các tài khoản còn lại", detail: "Tài khoản công việc, kho đám mây, mạng xã hội - mỗi nơi một mật khẩu mới khi bạn đăng nhập lần tới." },
        ],
      },
      {
        type: "scenario",
        title: "Mật khẩu của bạn nằm trong một vụ lộ dữ liệu",
        start: "start",
        nodes: {
          start: {
            text: "Trình duyệt báo: mật khẩu bạn dùng cho một diễn đàn cũ đã xuất hiện trong một vụ lộ dữ liệu. Bạn chợt nhớ đó cũng là mật khẩu email cá nhân.",
            choices: [
              { label: "Đổi mật khẩu diễn đàn cũ là xong", next: "forumOnly" },
              { label: "Đổi mật khẩu email ngay lập tức", next: "email" },
            ],
          },
          email: {
            text: "Email đã có mật khẩu riêng do trình quản lý tạo. Trong mục bảo mật, bạn thấy một phiên đăng nhập lạ từ tuần trước, và xác thực hai lớp đang tắt.",
            choices: [
              { label: "Đăng xuất mọi phiên, bật xác thực hai lớp bằng ứng dụng", next: "good" },
              { label: "Đổi mật khẩu rồi là đủ, để mai tính tiếp", next: "halfDone" },
            ],
          },
          forumOnly: {
            text: "Diễn đàn không phải nơi đáng lo. Cặp email và mật khẩu đó đang được thử tự động trên hàng trăm dịch vụ, còn email - chìa khóa của mọi thứ - vẫn dùng đúng mật khẩu đã lộ.",
            ending: "bad",
          },
          halfDone: {
            text: "Với nhiều dịch vụ, phiên đăng nhập lạ vẫn còn hiệu lực sau khi đổi mật khẩu. Không đăng xuất và không bật lớp thứ hai là để cửa hé cho chính người đã vào từ tuần trước.",
            ending: "bad",
          },
          good: {
            text: "Phiên lạ bị đá ra, lớp thứ hai đã bật, mật khẩu cũ giờ vô dụng. Sau đó bạn lần lượt đổi các tài khoản từng dùng chung mật khẩu - email đi trước, vì nó đặt lại được mọi thứ khác.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Khóa cửa là việc của một buổi tối; nhớ không mở cửa cho người lạ là việc của mọi ngày.",
          "Bài sau: khi tài khoản đã bị chiếm thì giờ đầu tiên làm gì, và theo thứ tự nào.",
        ],
      },
    ],
  },
  {
    id: 356,
    slug: "khi-tai-khoan-bi-chiem",
    title: "Chặng 16, Bài 7: Khi tài khoản đã bị chiếm - giờ đầu tiên làm gì",
    subtitle: "Thứ tự quan trọng hơn tốc độ: giành lại email trước, đóng hết cửa sau, rồi mới tới mọi thứ khác",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🆘",
    track: "personal",
    whyItMatters:
      "Không ai muốn đọc bài này trước khi cần tới nó, và đó chính là vấn đề: khi cần thì người ta đang hoảng và xấu hổ, hai trạng thái làm chậm mọi hành động hoặc đẩy người ta làm sai thứ tự. Kẻ chiếm tài khoản cũng đang chạy đua - đổi email khôi phục, tạo quy tắc chuyển tiếp thư, nhắn cho danh bạ. Biết trước thứ tự việc cần làm là cách duy nhất chạy nhanh hơn họ.",
    openingQuestion:
      "Bạn nhận ra tài khoản mạng xã hội của mình đang tự nhắn tin lung tung cho bạn bè. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Kiểm tra và giành lại email gắn với tài khoản đó, từ một thiết bị sạch",
      "Đổi ngay mật khẩu mạng xã hội trên chính chiếc điện thoại đang dùng",
      "Đăng bài cảnh báo lên trang cá nhân để bạn bè biết mà đừng tin",
      "Tìm một dịch vụ khôi phục tài khoản trên mạng để nhờ lấy lại giúp",
    ],
    correctOption: 0,
    explanation:
      "Email đứng đầu vì nó là nơi nhận liên kết đặt lại mật khẩu: nếu kẻ chiếm đã vào được email, bạn đổi mật khẩu mạng xã hội xong thì họ chỉ cần bấm quên mật khẩu là lấy lại. Thiết bị sạch quan trọng vì nếu tài khoản bị chiếm do phần mềm độc hại trên máy, mật khẩu mới gõ trên chính máy đó cũng bị ghi lại. Đăng cảnh báo là việc cần, nhưng làm sau khi đã giành lại quyền - đăng từ tài khoản đang bị chiếm thì kẻ chiếm xóa được ngay. Còn dịch vụ khôi phục tài khoản trên mạng là một kịch bản riêng nhắm vào người đang hoảng: chúng đòi mật khẩu, mã xác thực hoặc quyền điều khiển máy, và không có quyền gì với nền tảng.",
    diagram: [
      { label: "Giành lại email từ thiết bị sạch", arrow: true },
      { label: "Đổi mật khẩu, đăng xuất mọi phiên", arrow: true },
      { label: "Thu hồi ứng dụng, xóa quy tắc chuyển tiếp lạ", arrow: true },
      { label: "Báo danh bạ, giữ bằng chứng, báo nền tảng hoặc IT" },
    ],
    realWorldExample: {
      company: "Quy tắc chuyển tiếp mà không ai nhìn thấy",
      description:
        "Một người phát hiện email bị đăng nhập lạ, đổi mật khẩu ngay và yên tâm vì không thấy gì bất thường nữa. Hai tháng sau, một dịch vụ đám mây của người này bị đặt lại mật khẩu mà không hề có thư nào trong hộp thư. Trước khi bị đá ra, kẻ chiếm đã tạo một quy tắc tự động chuyển tiếp mọi thư có chữ mật khẩu và xác minh sang một địa chỉ ngoài rồi xóa bản gốc - và đổi mật khẩu không xóa quy tắc đó. Đổi mật khẩu là đúng nhưng chưa đủ; danh sách kiểm tra mới là thứ khóa hết các cửa.",
    },
    quiz: [
      {
        question: "Vì sao phải giành lại email trước, rồi mới tới các tài khoản khác?",
        options: [
          "Vì email là tài khoản dễ đổi mật khẩu nhất nên làm trước cho quen tay",
          "Vì nền tảng mạng xã hội chỉ nhận báo cáo gửi tới từ địa chỉ email",
          "Vì ai giữ email thì đặt lại được mật khẩu các tài khoản còn lại",
          "Vì kẻ chiếm thường chỉ quan tâm tới thư trong hộp thư đến",
        ],
        correct: 2,
        explanation:
          "Đổi mật khẩu mọi tài khoản khác trong khi email vẫn trong tay kẻ chiếm thì họ chỉ cần bấm quên mật khẩu là lấy lại hết. Email là cửa chính, phải đóng trước.",
      },
      {
        question: "Vì sao nên đổi mật khẩu từ một thiết bị khác, không phải chiếc máy nghi bị nhiễm?",
        options: [
          "Vì nền tảng chặn đổi mật khẩu trên thiết bị đã từng đăng nhập trước đó",
          "Vì đổi mật khẩu trên máy cũ sẽ xóa mất toàn bộ dữ liệu đã lưu trong máy",
          "Vì thiết bị mới có địa chỉ mạng khác nên kẻ chiếm không theo dõi được",
          "Vì phần mềm độc hại trên máy đó ghi lại cả mật khẩu mới",
        ],
        correct: 3,
        explanation:
          "Nếu tài khoản bị chiếm vì phần mềm ghi phím hay tiện ích độc hại, đổi mật khẩu trên chính máy đó là gõ mật khẩu mới thẳng vào tay kẻ chiếm. Máy đó cần được làm sạch riêng, sau.",
      },
      {
        question: "Đã đổi mật khẩu email. Vì sao vẫn phải đăng xuất mọi phiên và thu hồi quyền ứng dụng?",
        options: [
          "Vì phiên và quyền cấp cho ứng dụng có thể vẫn chạy sau khi đổi mật khẩu",
          "Vì đăng xuất mọi phiên là bước bắt buộc để nền tảng cho đổi mật khẩu",
          "Vì ứng dụng bên thứ ba lưu mật khẩu cũ và sẽ tự đổi ngược lại về nó",
          "Vì nếu không đăng xuất thì mật khẩu mới chỉ có hiệu lực sau 24 giờ",
        ],
        correct: 0,
        explanation:
          "Một phiên đã đăng nhập và một ứng dụng đã được cấp quyền dùng thẻ truy cập riêng, không dùng lại mật khẩu - nên với nhiều dịch vụ, đổi mật khẩu không tự cắt chúng. Phải cắt tận tay trong mục bảo mật.",
      },
      {
        question:
          "Một tài khoản lạ nhắn: \"Bên mình chuyên khôi phục tài khoản bị hack, gửi mình mật khẩu và mã xác thực là xong trong 1 giờ.\" Đây là gì?",
        options: [
          "Dịch vụ hợp lệ, vì nền tảng lớn có thuê đối tác ngoài để xử lý khôi phục",
          "Lần tấn công thứ hai, nhắm vào người đang hoảng muốn lấy lại tài khoản",
          "Dịch vụ đáng thử nếu có nhiều đánh giá tốt và nhận xét từ người dùng",
          "Cách nhanh nhất khi nền tảng chậm, miễn là đổi mật khẩu ngay sau đó",
        ],
        correct: 1,
        explanation:
          "Chỉ nhà cung cấp dịch vụ mới khôi phục được tài khoản, qua quy trình chính thức của họ. Người lạ xin mật khẩu và mã là đang làm đúng việc của kẻ chiếm lần đầu - nhắm vào người dễ tổn thương nhất vì đang rất muốn tin còn cách cứu.",
      },
      {
        question: "Vì sao nên giữ lại bằng chứng thay vì xóa ngay các tin nhắn và thư lạ?",
        options: [
          "Để gửi cho kẻ chiếm, cho họ biết bạn đã có đủ bằng chứng mà dừng lại",
          "Vì xóa tin lạ sẽ báo cho kẻ chiếm biết bạn đã phát hiện",
          "Để nền tảng hoặc IT lần ra kẻ chiếm đã vào lúc nào và làm gì",
          "Vì nền tảng chỉ cho khôi phục khi có ảnh chụp đủ mọi tin nhắn đã gửi",
        ],
        correct: 2,
        explanation:
          "Ảnh chụp phiên đăng nhập, quy tắc thư, tin nhắn lạ cho người xử lý biết phạm vi: tài khoản nào khác bị đụng tới, dữ liệu nào đã bị chuyển đi. Liên lạc với kẻ chiếm thì không bao giờ giúp được gì.",
      },
    ],
    keyTakeaways: [
      "Giành lại email trước, từ một thiết bị sạch - email đặt lại được mọi thứ khác",
      "Đổi mật khẩu chưa đủ: đăng xuất mọi phiên, thu hồi ứng dụng và thẻ truy cập",
      "Kiểm tra cửa sau: quy tắc chuyển tiếp thư, email và số điện thoại khôi phục",
      "Dịch vụ khôi phục tài khoản trên mạng là lần tấn công thứ hai",
    ],
    practicePrompt: {
      question:
        "Bạn đã giành lại email và đổi mật khẩu. Trong cài đặt, bạn thấy email khôi phục đã bị đổi sang một địa chỉ lạ. Việc nào làm tiếp?",
      options: [
        "Để nguyên vì mật khẩu đã đổi, email khôi phục chỉ dùng khi quên mật khẩu",
        "Gửi thư tới địa chỉ lạ đó để hỏi họ là ai và yêu cầu họ dừng lại",
        "Xóa luôn email khôi phục để không ai dùng được đường đó nữa",
        "Đổi email khôi phục về địa chỉ của bạn và rà luôn số điện thoại khôi phục",
      ],
      correct: 3,
      explanation:
        "Email khôi phục lạ là chìa khóa dự phòng kẻ chiếm để lại: chỉ cần bấm quên mật khẩu là họ vào lại. Xóa trắng thì chính bạn mất đường khôi phục; phải đặt về địa chỉ và số của bạn.",
    },
    summary: {
      keyIdea: "Giành lại email trước, đóng mọi cửa sau, rồi mới báo cho người khác",
      commonMistake: "Đổi mật khẩu rồi yên tâm, trong khi phiên đăng nhập, ứng dụng và quy tắc chuyển tiếp của kẻ chiếm vẫn còn",
      action: "Lưu danh sách bảy bước của bài này vào ghi chú trên điện thoại ngay hôm nay, khi bạn còn bình tĩnh.",
    },
    application: {
      title: "Viết sẵn danh sách khi còn bình tĩnh",
      message:
        "Ghi vào điện thoại: giành lại email từ máy sạch, đăng xuất mọi phiên, thu hồi ứng dụng, kiểm tra quy tắc chuyển tiếp và thông tin khôi phục, đổi mật khẩu các tài khoản khác, báo danh bạ qua kênh khác, giữ bằng chứng và báo nền tảng hoặc IT.",
      secondary:
        "Nếu là tài khoản công việc, bước đầu tiên là báo IT - họ có công cụ cắt phiên và rà nhật ký mà bạn không có, và mỗi phút chậm là thêm dữ liệu công ty bị lộ.",
    },
    sections: [
      {
        type: "lead",
        text: "Không ai muốn đọc bài này trước khi cần tới nó. Hãy đọc ngay hôm nay, vì lúc cần thì bạn sẽ không đủ bình tĩnh để tự nghĩ ra thứ tự.",
      },
      {
        type: "feynman",
        title: "Bị chiếm tài khoản giống bị mất chìa khóa nhà",
        intro: "Mất chìa khóa nhà thì không ai ngồi lau sàn trước: thay ổ khóa chính, kiểm tra cửa sổ và cửa sau, rồi mới báo hàng xóm. Tài khoản cũng có thứ tự như vậy.",
        columns: ["Thành phần", "Ngoài đời", "Trên mạng"],
        rows: [
          ["Ổ khóa chính", "Thay ổ khóa cửa trước", "Giành lại email, đổi mật khẩu từ máy sạch"],
          ["Người còn trong nhà", "Kiểm tra xem có ai còn ở trong không", "Đăng xuất mọi phiên đăng nhập"],
          ["Chìa phụ đã đưa đi", "Thu lại chìa đã gửi người khác", "Thu hồi quyền ứng dụng và thẻ truy cập"],
          ["Cửa sau", "Kiểm tra cửa sổ, cửa sau bị mở", "Quy tắc chuyển tiếp thư, email và số khôi phục"],
        ],
        oneLiner: "Giành lại email trước, đuổi mọi người ra, đóng hết cửa sau - rồi mới báo cho người khác.",
      },
      { type: "heading", text: "Kẻ chiếm cũng đang chạy đua" },
      {
        type: "paragraph",
        text: "Việc đầu tiên kẻ chiếm làm khi vào được không phải đọc thư, mà là ở lại cho lâu: đổi email và số khôi phục, tạo quy tắc chuyển tiếp, cấp quyền cho một ứng dụng của họ. Mỗi thứ là một cửa sau mà đổi mật khẩu không đóng được. Vì vậy giờ đầu tiên không phải là đổi mật khẩu thật nhanh, mà là đi hết một danh sách theo đúng thứ tự.",
      },
      {
        type: "flow",
        title: "Giờ đầu tiên, theo đúng thứ tự",
        steps: [
          { label: "Giành lại email", detail: "Từ một thiết bị bạn tin là sạch, đăng nhập email và đổi mật khẩu. Nếu đã bị khóa ngoài, dùng quy trình khôi phục chính thức của nhà cung cấp." },
          { label: "Đăng xuất mọi phiên", detail: "Trong mục bảo mật, chọn đăng xuất khỏi mọi thiết bị khác. Một phiên còn sống là một người còn ở trong nhà." },
          { label: "Thu hồi quyền truy cập", detail: "Gỡ ứng dụng bên thứ ba, tiện ích, mật khẩu ứng dụng và thẻ truy cập mà bạn không nhận ra." },
          { label: "Đóng cửa sau", detail: "Rà quy tắc chuyển tiếp và bộ lọc thư, email và số điện thoại khôi phục. Đặt lại về của bạn, rồi bật xác thực hai lớp." },
          { label: "Lần lượt các tài khoản khác", detail: "Đổi mật khẩu các tài khoản gắn với email đó hoặc từng dùng chung mật khẩu, quan trọng nhất trước." },
          { label: "Báo danh bạ qua kênh khác", detail: "Nhắn bạn bè, đồng nghiệp rằng tin nhắn từ bạn trong thời gian qua là giả - qua một kênh không bị chiếm." },
          { label: "Giữ bằng chứng và báo cáo", detail: "Chụp phiên lạ, quy tắc thư, tin nhắn lạ trước khi xóa. Báo nền tảng; nếu là tài khoản công việc thì báo IT ngay từ phút đầu." },
        ],
      },
      {
        type: "callout",
        label: "Cửa sau mà đổi mật khẩu không đóng",
        text: "Quy tắc chuyển tiếp thư, email khôi phục bị đổi, một ứng dụng được cấp quyền đọc thư, một phiên còn đăng nhập trên máy của họ. Không cái nào cần mật khẩu của bạn để tiếp tục hoạt động. Đó là lý do người đổi mật khẩu xong rồi yên tâm thường bị chiếm lại vài tuần sau, theo đúng con đường cũ.",
      },
      {
        type: "scenario",
        title: "Thông báo đổi mật khẩu lúc nửa đêm",
        start: "start",
        nodes: {
          start: {
            text: "11 giờ đêm, bạn nhận thông báo mật khẩu email vừa được thay đổi - bạn không hề đổi. Đăng nhập thử trên điện thoại thì báo sai mật khẩu.",
            choices: [
              { label: "Dùng quy trình khôi phục chính thức trên máy tính khác", next: "recovered" },
              { label: "Lên mạng tìm dịch vụ lấy lại email bị hack", next: "fakeHelp" },
            ],
          },
          recovered: {
            text: "Bạn lấy lại được quyền nhờ số điện thoại khôi phục vẫn còn đúng, và đặt mật khẩu mới. Hộp thư trông bình thường, không thấy gì lạ.",
            choices: [
              { label: "Thấy ổn rồi, đi ngủ, mai tính tiếp", next: "halfDone" },
              { label: "Đăng xuất mọi phiên, rà quy tắc chuyển tiếp và ứng dụng", next: "good" },
            ],
          },
          fakeHelp: {
            text: "Một người tự xưng chuyên gia trả lời trong năm phút, xin mật khẩu các tài khoản khác và mã xác thực để xác minh chủ sở hữu. Đây là lần tấn công thứ hai: không ai ngoài nhà cung cấp email có quyền khôi phục tài khoản đó.",
            ending: "bad",
          },
          halfDone: {
            text: "Kẻ chiếm vẫn còn một phiên trên máy của họ và một quy tắc chuyển tiếp mọi thư chứa chữ xác minh ra ngoài. Sáng hôm sau, mã đặt lại mật khẩu kho ảnh đám mây của bạn đã đến tay họ trước.",
            ending: "bad",
          },
          good: {
            text: "Bạn tìm thấy một quy tắc chuyển tiếp lạ và một ứng dụng sao lưu thư chưa từng cài - xóa cả hai, bật xác thực hai lớp, rồi nhắn bạn bè qua kênh khác. Cửa chính và cửa sau đều đã đóng.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Kịch bản thứ hai nhắm vào chính người vừa bị chiếm",
        text: "Sau khi ai đó kể chuyện bị hack lên mạng, thường xuất hiện ngay những lời đề nghị giúp lấy lại tài khoản. Đây là một mô hình riêng nhắm vào người đang hoảng - nhóm dễ tổn thương nhất vì họ đang rất muốn tin còn cách. Không ai ngoài nhà cung cấp dịch vụ khôi phục được tài khoản, và mọi lời đề nghị xin mật khẩu hay mã đều là vòng thứ hai.",
      },
      {
        type: "closing",
        lines: [
          "Xấu hổ là thứ làm chậm nhất trong giờ đầu tiên - và bị chiếm tài khoản không phải lỗi của sự ngây thơ.",
          "Bài sau: gom cả chặng thành vài quy tắc cho cả nhà.",
        ],
      },
    ],
  },
  {
    id: 357,
    slug: "quy-tac-an-toan-cho-ca-nha",
    title: "Chặng 16, Bài 8: Tổng kết - quy tắc an toàn số cho cả nhà",
    subtitle: "Bảy bài trước là kiến thức của bạn; bài này biến nó thành vài câu bảo vệ được cả người không đọc",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🏠",
    track: "personal",
    whyItMatters:
      "Người dễ bị nhắm tới nhất thường là người ít đọc những nội dung này nhất - bố mẹ, ông bà, con nhỏ mới có điện thoại, đồng nghiệp ít dùng công nghệ. Và một tài khoản yếu trong nhà là cửa vào cho tất cả: điện thoại của mẹ nhận mã khôi phục email của bạn, máy của con đăng nhập chung kho ảnh gia đình. Kiến thức của bạn chỉ bảo vệ được họ nếu nó được rút gọn thành vài câu nhớ được lúc đang hoảng.",
    openingQuestion: "Điều gì làm một quy tắc an toàn số thật sự có tác dụng với cả nhà?",
    openingOptions: [
      "Nó liệt kê đủ mọi thủ đoạn đang lưu hành để không bỏ sót trường hợp nào",
      "Nó do người rành công nghệ nhất nhà đặt ra và mọi người buộc phải theo",
      "Nó đi kèm phần mềm giám sát cài trên máy của từng người trong nhà",
      "Nó đủ ngắn để nhớ và dùng được ngay cả khi đang hoảng",
    ],
    correctOption: 3,
    explanation:
      "Quy tắc an toàn được dùng vào đúng lúc tệ nhất - khi người ta đang sợ, đang vội, đang bị hối thúc - nên nó phải đủ ngắn để tự bật ra mà không cần nghĩ. Một danh sách thủ đoạn dài thì không ai nhớ nổi giữa cuộc gọi, và thủ đoạn mới xuất hiện mỗi tuần. Quy tắc bị áp đặt mà không giải thích thì người ta làm theo lúc bình thường và bỏ qua đúng lúc bị thuyết phục rằng lần này khác. Phần mềm giám sát có chỗ dùng với trẻ nhỏ, nhưng không thay được một câu mà chính người đó nhớ: không đọc mã cho ai, và tự gọi lại qua kênh của mình.",
    diagram: [
      { label: "Không đọc mã, không bấm Duyệt hộ ai", arrow: true },
      { label: "Xác minh qua kênh do mình tự mở", arrow: true },
      { label: "Không cài gì, không mở gì từ đường dẫn được gửi tới", arrow: true },
      { label: "Có chuyện thì báo ngay, không ai trách" },
    ],
    realWorldExample: {
      company: "Ba câu dán cạnh chỗ để điện thoại",
      description:
        "Một gia đình viết ba câu lên tờ giấy dán cạnh chỗ bà hay để điện thoại: không đọc mã cho ai, kể cả người xưng là con cháu; ai nhờ cài ứng dụng thì gọi cho con trước; tin nhắn nào giục gấp thì đặt máy xuống mười phút. Vài tháng sau, bà nhận cuộc gọi tự xưng nhân viên nhà mạng, nói sim sắp bị khóa và cần đọc mã để nâng cấp. Bà không nhớ bài nào về đổi sim - bà chỉ nhớ câu đầu tiên trên tờ giấy, và gọi cho con.",
    },
    quiz: [
      {
        question: "Vì sao nên ưu tiên giúp người ít dùng công nghệ nhất trong nhà trước?",
        options: [
          "Vì kẻ tấn công chỉ nhắm vào người lớn tuổi, không nhắm người trẻ",
          "Vì họ ít được cảnh báo nhất, và tài khoản của họ nối với tài khoản cả nhà",
          "Vì thiết bị đời cũ của người lớn tuổi tự động dễ nhiễm virus hơn máy mới",
          "Vì người ít dùng công nghệ lưu nhiều dữ liệu quan trọng hơn",
        ],
        correct: 1,
        explanation:
          "Người trẻ cũng bị nhắm, nhưng họ thường có thêm một lớp hiểu biết. Người ít dùng công nghệ thì không, và số điện thoại hay email của họ thường là thông tin khôi phục cho tài khoản của người khác trong nhà.",
      },
      {
        question: "Quy tắc nào bao quát được nhiều kịch bản nhất trong cả chặng?",
        options: [
          "Không nghe máy từ số lạ và không trả lời tin nhắn của người không quen",
          "Không đọc mã, không bấm Duyệt hộ ai, dù người đó là ai",
          "Chỉ tin tin nhắn có tích xanh xác minh và logo đúng của tổ chức",
          "Cài phần mềm diệt virus lên mọi điện thoại trong nhà",
        ],
        correct: 1,
        explanation:
          "Gần như mọi kịch bản trong chặng - IT giả, người quen bị chiếm, trang đăng nhập giả - đều kết thúc ở cùng một bước: xin mã hoặc xin bấm Duyệt. Chặn bước đó là chặn cả chuỗi, còn tích xanh và số quen thì đều giả được.",
      },
      {
        question: "Vì sao nên thống nhất quy tắc với cả nhà TRƯỚC khi có chuyện?",
        options: [
          "Vì quy tắc chỉ có hiệu lực với mọi người khi đã được ghi thành văn bản",
          "Để kẻ tấn công biết nhà bạn có quy tắc mà chuyển sang nhắm nhà khác",
          "Vì nền tảng yêu cầu khai báo quy tắc gia đình khi đăng ký tài khoản con",
          "Để lúc hoảng có sẵn câu trả lời, và gọi lại hỏi không bị coi là nghi ngờ",
        ],
        correct: 3,
        explanation:
          "Giữa lúc hoảng không ai nghĩ ra được quy tắc. Và khi cả nhà đã biết mọi yêu cầu đều sẽ được gọi lại hỏi, việc gọi lại không còn mang nghĩa là mình nghi ngờ người thân.",
      },
      {
        question: "Trong nhà, nên bật xác thực hai lớp ở đâu trước tiên?",
        options: [
          "Email chính của từng người, vì nó mở được mọi tài khoản khác",
          "Tài khoản trò chơi của con, vì trẻ em là người hay bị lừa nhất",
          "Mạng xã hội của bố mẹ, vì có nhiều người thân theo dõi nhất",
          "Tài khoản xem phim dùng chung, vì cả nhà cùng đăng nhập vào đó",
        ],
        correct: 0,
        explanation:
          "Bài 6 đã cho thấy email là chìa khóa vạn năng. Bật lớp thứ hai cho email của từng người là một việc nhỏ, nhưng nó bảo vệ gián tiếp mọi tài khoản khác gắn với email đó.",
      },
      {
        question:
          "Bà nhận cuộc gọi tự xưng nhân viên nhà mạng, giục đọc mã để giữ số. Câu nào bà cần nhớ nhất?",
        options: [
          "Hỏi tên và mã nhân viên của người gọi rồi mới đọc mã cho họ",
          "Đọc mã nhưng cố ý đọc sai một số để thử phản ứng của họ",
          "Không đọc mã cho ai, cúp máy và gọi cho người trong nhà",
          "Yêu cầu họ gửi tin nhắn từ tổng đài để đối chiếu rồi mới đọc",
        ],
        correct: 2,
        explanation:
          "Tên và mã nhân viên bịa được, tin nhắn tổng đài giả được, và đọc sai một số vẫn là ở lại trong cuộc gọi do họ dẫn dắt. Câu duy nhất không cần phân biệt thật giả là không đọc mã cho ai rồi gọi người nhà.",
      },
    ],
    keyTakeaways: [
      "Quy tắc tốt là quy tắc đủ ngắn để nhớ được lúc đang hoảng",
      "Bắt đầu từ người ít phòng bị nhất - tài khoản của họ nối với tài khoản cả nhà",
      "Năm câu bao quát cả chặng: mã, kênh của mình, không cài từ đường dẫn, email có hai lớp, biết gọi ai",
      "Có chuyện thì báo ngay, không ai trách - câu này phải được nói trước",
    ],
    practicePrompt: {
      question: "Bạn chỉ có một buổi để giúp bố mẹ an toàn hơn trên mạng. Nên làm việc nào trước?",
      options: [
        "Cài phần mềm diệt virus lên điện thoại rồi để nó tự xử lý mọi mối nguy",
        "Bật xác thực hai lớp cho email của bố mẹ và dặn câu không đọc mã cho ai",
        "Kể đầy đủ mọi thủ đoạn đang có trên báo cho bố mẹ cùng nghe một lượt",
        "Đổi hết mật khẩu của bố mẹ thành một mật khẩu dài mà chỉ bạn biết",
      ],
      correct: 1,
      explanation:
        "Một lớp kỹ thuật cho tài khoản quan trọng nhất cộng một câu dặn bao quát nhất là tổ hợp hiệu quả nhất trên công sức. Đổi mật khẩu mà bố mẹ không biết thì chính họ bị khóa ngoài, và lần sau sẽ nhờ người khác - có khi là người lạ - giúp mở.",
    },
    summary: {
      keyIdea: "Vài câu cả nhà cùng nhớ bảo vệ tốt hơn mọi kiến thức chỉ một người biết",
      commonMistake: "Tự mình biết nhiều thủ đoạn nhưng không rút gọn thành câu nào cho người ít dùng công nghệ trong nhà",
      action: "Chọn người ít phòng bị nhất trong nhà, bật xác thực hai lớp cho email của họ và nói với họ năm câu trong tuần này.",
    },
    application: {
      title: "Năm câu cho cả nhà",
      message:
        "Không đọc mã, không bấm Duyệt hộ ai. Yêu cầu gấp thì dừng lại và tự gọi qua số đã lưu. Không cài ứng dụng, không mở tệp, không đăng nhập từ đường dẫn được gửi tới. Email của mỗi người có mật khẩu riêng và xác thực hai lớp. Có chuyện thì báo ngay, không ai trách.",
      secondary:
        "Với nhóm làm việc, thêm một câu: không ai, kể cả sếp hay IT, xin mã hay nhờ duyệt đăng nhập qua tin nhắn - và số IT được dán sẵn ở chỗ ai cũng thấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước là kiến thức của bạn. Bài này chỉ làm một việc: biến nó thành vài câu mà người không đọc bài nào vẫn dùng được.",
      },
      {
        type: "feynman",
        title: "An toàn số cho cả nhà giống nội quy ra vào khu nhà",
        intro: "Một khu nhà an toàn không phải vì mọi cư dân hiểu hết các kiểu trộm, mà vì ai cũng nhớ vài câu nội quy: không mở cổng cho người lạ, có gì thì gọi bảo vệ.",
        columns: ["Thành phần", "Ngoài đời", "Trên mạng"],
        rows: [
          ["Không đưa chìa", "Không đưa chìa khóa cho người lạ, kể cả mặc đồng phục", "Không đọc mã, không bấm Duyệt hộ ai"],
          ["Gọi lại kiểm tra", "Gọi chủ nhà trước khi mở cửa cho thợ", "Tự liên hệ qua số đã lưu hoặc kênh nội bộ"],
          ["Không nhận đồ lạ", "Không nhận gói hàng không rõ người gửi", "Không cài, không mở, không đăng nhập từ đường dẫn được gửi tới"],
          ["Biết gọi ai", "Số bảo vệ dán ở cửa", "Một người trong nhà để hỏi, số IT dán sẵn"],
        ],
        oneLiner: "Vài câu cả nhà cùng nhớ bảo vệ tốt hơn mọi kiến thức chỉ một người biết.",
      },
      { type: "heading", text: "Rút cả chặng thành năm câu" },
      {
        type: "list",
        items: [
          "Không đọc mã, không bấm Duyệt hộ bất kỳ ai - kể cả người xưng là IT, nhà mạng hay người thân",
          "Yêu cầu gấp thì dừng lại và tự liên hệ qua kênh mình đã lưu, không qua kênh vừa nhận",
          "Không cài ứng dụng, không mở tệp, không đăng nhập từ đường dẫn được gửi tới - tự mở ứng dụng hoặc tự gõ địa chỉ",
          "Email chính của mỗi người: mật khẩu riêng trong trình quản lý, bật xác thực hai lớp",
          "Có chuyện thì báo ngay cho người trong nhà hoặc IT - không ai trách",
        ],
      },
      {
        type: "conceptTable",
        title: "Mỗi người cần một điều khác nhau",
        subtitle: "Cùng năm câu, nhưng nhấn vào chỗ người đó dễ hở nhất",
        concepts: [
          {
            vi: "Người lớn tuổi",
            en: "Older relatives",
            def: "Một câu duy nhất: không đọc mã cho ai, ai nhờ cài gì thì gọi cho con. Bật sẵn xác thực hai lớp và khóa đổi sim giúp họ.",
          },
          {
            vi: "Trẻ em",
            en: "Children",
            def: "Không đăng nhập ở trang lạ để nhận quà trong trò chơi. Tài khoản gắn với email của bố mẹ để còn khôi phục được.",
          },
          {
            vi: "Đồng nghiệp",
            en: "Team",
            def: "Quy ước rằng không ai, kể cả sếp, xin mã hay nhờ duyệt đăng nhập qua tin nhắn. Số IT dán sẵn, và báo sự cố không bị phạt.",
          },
        ],
      },
      {
        type: "callout",
        label: "Câu thứ năm quan trọng ngang câu thứ nhất",
        text: "Nếu lỡ có chuyện thì báo ngay, sẽ không ai trách. Bài trước cho thấy giờ đầu tiên quyết định kẻ chiếm ở lại được bao lâu, và lý do phổ biến nhất khiến người ta chậm báo là sợ bị mắng. Nói trước câu này - lúc chưa có chuyện - làm được nhiều hơn mọi lời cảnh báo về thủ đoạn.",
      },
      {
        type: "flow",
        title: "Một buổi cuối tuần cho cả nhà",
        steps: [
          { label: "Chọn người ít phòng bị nhất", detail: "Thường là ông bà, bố mẹ hoặc con nhỏ mới có điện thoại - bắt đầu từ đó, không bắt đầu từ chính bạn." },
          { label: "Khóa email của họ", detail: "Mật khẩu riêng, xác thực hai lớp, số và email khôi phục là của chính họ hoặc của bạn." },
          { label: "Lưu sẵn số cần gọi", detail: "Số của bạn, của người thân gần nhất, của IT nếu là máy công việc - đặt lên đầu danh bạ." },
          { label: "Nói năm câu và dán lên", detail: "Viết ra giấy, dán cạnh chỗ để điện thoại hoặc màn hình. Đọc cùng nhau một lần." },
          { label: "Nói câu thứ năm thật rõ", detail: "Có chuyện thì báo ngay, không ai trách. Câu này phải được nói khi chưa có chuyện." },
        ],
      },
      {
        type: "scenario",
        title: "Tin nhắn trong nhóm chat gia đình",
        start: "start",
        nodes: {
          start: {
            text: "Nhóm chat gia đình nhận tin từ tài khoản của em họ: \"Mọi người bình chọn giúp em cuộc thi ảnh nhé, bấm đường dẫn rồi đăng nhập bằng tài khoản chat là được.\" Mẹ bạn hỏi trong nhóm: \"Có bấm được không con?\"",
            choices: [
              { label: "Bảo mẹ cứ bấm, em họ thì tin được", next: "momClicked" },
              { label: "Bảo mẹ khoan bấm, rồi tự gọi cho em họ", next: "called" },
            ],
          },
          called: {
            text: "Em họ bắt máy, ngạc nhiên: tài khoản của em bị chiếm từ sáng, em không gửi gì cả. Trong nhóm, bố bạn vừa nhắn: \"Bố đăng nhập rồi, nó hỏi mã gì đó.\"",
            choices: [
              { label: "Nhắn bố đừng nhập mã, rồi giúp bố đổi mật khẩu ngay", next: "good" },
              { label: "Để mai rảnh rồi xem giúp bố", next: "dadLater" },
            ],
          },
          momClicked: {
            text: "Đường dẫn là trang đăng nhập giả của chính ứng dụng chat. Tài khoản của mẹ bị chiếm, rồi tiếp tục gửi đúng tin nhắn ấy cho toàn bộ danh bạ của mẹ - những người tin mẹ hơn tin em họ.",
            ending: "bad",
          },
          dadLater: {
            text: "Mật khẩu bố nhập vào trang giả đã đủ để họ thử đăng nhập. Tới sáng, tài khoản của bố đã đổi số khôi phục, và bạn bè của bố bắt đầu nhận tin nhờ bình chọn giúp.",
            ending: "bad",
          },
          good: {
            text: "Bố chưa gửi mã đi. Bạn giúp bố đổi mật khẩu, đăng xuất phiên lạ, rồi nhắn riêng cho cả nhà: tin của em họ là giả. Thứ giữ được cả nhà là hai câu đã nói từ trước: hỏi lại qua kênh khác, và có chuyện thì báo ngay.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 16. Điều đáng giá nhất không phải bạn nhớ được bao nhiêu thủ đoạn, mà là cả nhà bạn nhớ được một câu.",
          "Và câu ấy chỉ có tác dụng nếu được nói ra trước khi cần tới nó.",
        ],
      },
    ],
  },
];
