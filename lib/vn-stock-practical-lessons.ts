import type { Lesson } from "./lesson-types";

// Chặng 14 của track cá nhân: chứng khoán Việt Nam trong thực tế.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Chặng 4 đã có 20 bài về cổ phiếu, ETF và quỹ -
// nhưng toàn bộ là khái niệm: cổ phiếu là gì, P/E ra sao, vì sao nên đa dạng
// hóa. Không bài nào nói người học phải làm gì để MUA được một cổ phiếu ở Việt
// Nam: mở tài khoản ở đâu, lệnh khớp lúc nào, tiền về sau bao lâu, mất bao
// nhiêu phí và thuế. Người học xong Chặng 4 hiểu thị trường nhưng vẫn không
// đặt nổi lệnh đầu tiên.
//
// Ids 330-339 nối tiếp Chặng 13 (320-327), chừa 328-329 làm chỗ chèn.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const VN_STOCK_PRACTICAL_LESSONS: Lesson[] = [
  {
    id: 330,
    slug: "mo-tai-khoan-chung-khoan",
    title: "Chặng 14, Bài 1: Mở tài khoản chứng khoán",
    subtitle: "Chọn công ty chứng khoán theo cái gì, và tiền của bạn nằm ở đâu",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🪪",
    track: "personal",
    whyItMatters:
      "Đây là rào cản đầu tiên và cũng là chỗ dễ chọn sai nhất, vì phần lớn người mới chọn công ty chứng khoán theo quảng cáo hoặc theo lời giới thiệu chứ không theo tiêu chí nào. Vài tiêu chí đơn giản loại được phần lớn rủi ro không cần thiết.",
    openingQuestion: "Tiền chưa dùng để mua cổ phiếu trong tài khoản chứng khoán nằm ở đâu?",
    openingOptions: [
      "Trong két của công ty chứng khoán và được kiểm đếm định kỳ hằng tháng",
      "Ở tài khoản ngân hàng đứng tên bạn hoặc tài khoản tổng được quản lý tách bạch",
      "Được công ty chứng khoán tự động đem đi đầu tư để sinh lời thêm cho khách hàng",
      "Nằm trong quỹ dự phòng chung của toàn thị trường do sở giao dịch quản lý",
    ],
    correctOption: 1,
    explanation:
      "Tiền của nhà đầu tư phải được quản lý tách bạch khỏi tiền của chính công ty chứng khoán - đây là nguyên tắc nền tảng và cũng là thứ đáng kiểm tra đầu tiên khi chọn nơi mở tài khoản. Nhiều công ty cho phép mở tài khoản tiền gửi đứng tên chính bạn tại ngân hàng liên kết, đó là mức tách bạch rõ ràng nhất. Công ty chứng khoán không được tự ý dùng tiền của bạn để đầu tư. Hiểu điều này quan trọng vì nó phân biệt rủi ro thật với rủi ro tưởng tượng: rủi ro lớn của bạn nằm ở giá cổ phiếu bạn mua, không nằm ở chỗ công ty chứng khoán giữ tiền hộ.",
    diagram: [
      { label: "Mở tài khoản tại công ty chứng khoán", arrow: true },
      { label: "Tiền nằm ở tài khoản được tách bạch", arrow: true },
      { label: "Cổ phiếu lưu ký tập trung, không do công ty giữ", arrow: true },
      { label: "Rủi ro chính là giá cổ phiếu, không phải nơi giữ hộ" },
    ],
    realWorldExample: {
      company: "Chọn theo quảng cáo và chọn theo tiêu chí",
      description:
        "Một người mở tài khoản ở nơi đang tặng nhiều ưu đãi nhất, rồi phát hiện ứng dụng hay lỗi vào phiên đông và phí giao dịch cao hơn mặt bằng. Một người khác dành ba mươi phút so bốn tiêu chí - phí, chất lượng ứng dụng, tách bạch tiền, và chất lượng hỗ trợ - rồi mở ở nơi khác. Sau một năm giao dịch, khác biệt về phí thôi đã lớn hơn toàn bộ giá trị ưu đãi ban đầu.",
    },
    quiz: [
      {
        question: "Cổ phiếu bạn mua được lưu ở đâu?",
        options: [
          "Lưu ký tập trung, ghi nhận quyền sở hữu đứng tên chính bạn",
          "Trong kho chứng chỉ vật lý của công ty chứng khoán nơi bạn mở tài khoản",
          "Trong tài khoản chung của công ty chứng khoán và được phân bổ khi bán",
          "Tại doanh nghiệp phát hành, dưới dạng sổ cổ đông do doanh nghiệp tự giữ",
        ],
        correct: 0,
        explanation:
          "Cổ phiếu ngày nay không tồn tại dưới dạng tờ giấy trong kho ai đó. Quyền sở hữu được ghi nhận tập trung và đứng tên bạn, nên nếu công ty chứng khoán gặp vấn đề thì số cổ phiếu ấy vẫn là của bạn.",
      },
      {
        question: "Tiêu chí nào đáng cân nhắc nhất khi chọn công ty chứng khoán?",
        options: [
          "Biểu phí giao dịch, chất lượng ứng dụng và mức độ tách bạch tiền của khách",
          "Số lượng chi nhánh mà công ty đó có trên toàn quốc hiện nay",
          "Giá trị các chương trình khuyến mãi dành cho khách hàng mở mới",
          "Số năm mà công ty đó đã hoạt động trên thị trường chứng khoán Việt Nam",
        ],
        correct: 0,
        explanation:
          "Khuyến mãi là khoản một lần còn phí là khoản lặp lại ở mọi giao dịch trong nhiều năm. Với người giao dịch đều đặn, chênh lệch phí vượt qua giá trị ưu đãi ban đầu rất nhanh.",
      },
      {
        question: "Vì sao chất lượng ứng dụng lại là tiêu chí thật chứ không phải chuyện phụ?",
        options: [
          "Vì lệnh không vào được đúng lúc thị trường biến động là một khoản lỗ có thật",
          "Vì ứng dụng đẹp giúp nhà đầu tư ra quyết định mua bán chính xác hơn",
          "Vì công ty chứng khoán tính phí cao hơn cho các lệnh đặt qua điện thoại",
          "Vì ứng dụng quyết định luôn mức giá khớp lệnh mà bạn nhận được trên thị trường",
        ],
        correct: 0,
        explanation:
          "Ứng dụng không quyết định giá khớp - giá do thị trường quyết định. Nhưng phiên biến động mạnh cũng là phiên nhiều người cùng vào, và một ứng dụng nghẽn đúng lúc đó khiến bạn không thực hiện được điều mình đã quyết định.",
      },
      {
        question: "Nếu công ty chứng khoán gặp vấn đề nghiêm trọng thì tài sản của bạn ra sao?",
        options: [
          "Cổ phiếu vẫn đứng tên bạn ở hệ thống lưu ký tập trung nên không mất đi",
          "Toàn bộ cổ phiếu và tiền được chia đều cho các chủ nợ của công ty đó",
          "Cổ phiếu bị phong tỏa vĩnh viễn cho tới khi công ty phục hồi hoạt động",
          "Nhà nước sẽ mua lại toàn bộ cổ phiếu của khách hàng theo giá thị trường",
        ],
        correct: 0,
        explanation:
          "Đây chính là lý do cơ chế lưu ký tập trung và tách bạch tài sản tồn tại. Nó không xóa được rủi ro giá cổ phiếu, nhưng nó tách rủi ro của bạn khỏi rủi ro kinh doanh của bên trung gian.",
      },
      {
        question: "Việc nên làm ngay sau khi mở tài khoản là gì?",
        options: [
          "Đọc biểu phí và thử đặt một lệnh nhỏ để làm quen với quy trình",
          "Nạp toàn bộ số tiền dự định đầu tư để sẵn sàng mua khi có cơ hội",
          "Đăng ký dịch vụ vay ký quỹ để tăng sức mua ngay từ những lệnh đầu",
          "Cài đặt cảnh báo giá cho càng nhiều mã cổ phiếu càng tốt",
        ],
        correct: 0,
        explanation:
          "Lệnh đầu tiên nên là lệnh nhỏ để học quy trình chứ không phải để kiếm lời. Đăng ký vay ký quỹ ngay từ đầu là bắt đầu bằng công cụ rủi ro nhất, và bài về margin sẽ nói vì sao.",
      },
    ],
    keyTakeaways: [
      "Tiền và cổ phiếu của bạn được quản lý tách bạch khỏi tài sản của công ty chứng khoán",
      "Cổ phiếu lưu ký tập trung và đứng tên bạn, không nằm trong kho của ai",
      "Chọn theo phí, chất lượng ứng dụng và mức tách bạch - không theo khuyến mãi",
      "Lệnh đầu tiên nên nhỏ và nhằm mục đích học quy trình",
    ],
    practicePrompt: {
      question:
        "Hai công ty chứng khoán: một nơi phí 0,15% và ứng dụng ổn định, một nơi phí 0,3% kèm ưu đãi tiền mặt khi mở mới. Nên chọn thế nào?",
      options: [
        "Ước lượng giá trị giao dịch một năm rồi so phần chênh phí với giá trị ưu đãi",
        "Chọn nơi có ưu đãi vì đó là khoản tiền nhận được ngay lập tức",
        "Chọn nơi phí thấp vì phí luôn là yếu tố quan trọng nhất trong mọi trường hợp",
        "Mở cả hai tài khoản rồi dùng song song để tận dụng ưu đãi của cả hai nơi",
      ],
      correct: 0,
      explanation:
        "Không có câu trả lời cố định vì nó phụ thuộc bạn giao dịch nhiều hay ít. Với người mua rồi giữ vài năm, ưu đãi có thể lớn hơn phần chênh phí; với người giao dịch thường xuyên thì ngược lại - và phép tính này mất chưa tới năm phút.",
    },
    summary: {
      keyIdea: "Tài sản của bạn được tách bạch khỏi công ty chứng khoán - rủi ro thật nằm ở giá cổ phiếu",
      commonMistake: "Chọn nơi mở tài khoản theo khuyến mãi, rồi trả phần chênh phí trong nhiều năm",
      action: "So biểu phí của ba công ty chứng khoán và ước lượng chi phí một năm theo mức giao dịch của bạn.",
    },
    application: {
      title: "Bốn tiêu chí, ba mươi phút",
      message:
        "So ba công ty theo: biểu phí giao dịch, đánh giá ứng dụng, cách quản lý tiền của khách, và cách liên hệ hỗ trợ khi có sự cố. Ghi thành bảng rồi chọn.",
      secondary:
        "Đổi công ty chứng khoán về sau là việc làm được nhưng phiền, nên ba mươi phút lúc này tiết kiệm được nhiều hơn vẻ ngoài của nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng 4 đã dạy cổ phiếu là gì và vì sao nên đa dạng hóa. Chặng này bắt đầu từ chỗ Chặng 4 dừng lại: làm thế nào để thật sự mua được một cổ phiếu ở Việt Nam.",
      },
      { type: "heading", text: "Tiền và cổ phiếu của bạn nằm ở đâu" },
      {
        type: "paragraph",
        text: "Công ty chứng khoán là bên trung gian đưa lệnh của bạn ra thị trường, không phải bên giữ tài sản theo nghĩa sở hữu. Tiền của khách phải được quản lý tách bạch khỏi tiền của chính công ty, và cổ phiếu thì được ghi nhận ở hệ thống lưu ký tập trung dưới tên bạn. Hệ quả thực dụng là rủi ro của bạn nằm ở giá cổ phiếu đã mua chứ không nằm ở chỗ ai đang giữ hộ.",
      },
      {
        type: "conceptTable",
        title: "Bốn tiêu chí chọn nơi mở tài khoản",
        subtitle: "Xếp theo mức ảnh hưởng tới kết quả dài hạn",
        concepts: [
          {
            vi: "Biểu phí",
            en: "Fees",
            def: "Lặp lại ở mọi giao dịch trong nhiều năm. Với người giao dịch đều đặn, đây là yếu tố có tác động tích lũy lớn nhất.",
          },
          {
            vi: "Chất lượng ứng dụng",
            en: "Platform",
            def: "Phiên biến động mạnh cũng là phiên nhiều người cùng vào. Ứng dụng nghẽn đúng lúc đó là một khoản lỗ không hiện trên biểu phí nào.",
          },
          {
            vi: "Tách bạch tiền",
            en: "Client money",
            def: "Tài khoản tiền đứng tên chính bạn tại ngân hàng liên kết là mức rõ ràng nhất. Đáng hỏi trước khi ký.",
          },
          {
            vi: "Hỗ trợ khi có sự cố",
            en: "Support",
            def: "Ít khi cần, nhưng lúc cần thì thường gấp: lệnh treo, tiền chưa về, tài khoản không đăng nhập được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng bắt đầu bằng vay ký quỹ",
        text: "Nhiều nơi mời chào dịch vụ vay ký quỹ ngay khi mở tài khoản vì đó là nguồn thu tốt của họ. Với người chưa đặt lệnh lần nào, đó là bắt đầu bằng công cụ rủi ro nhất trong toàn bộ thị trường - và bài về margin ở cuối chặng sẽ cho thấy vì sao nó có thể xóa sạch tài khoản mà không cần cổ phiếu về không.",
      },
      {
        type: "closing",
        lines: [
          "Mở tài khoản là việc của một buổi chiều; chọn đúng nơi là việc của ba mươi phút trước buổi chiều đó.",
          "Bài sau: lệnh của bạn được khớp lúc nào, và vì sao có những phiên chỉ khớp một lần duy nhất.",
        ],
      },
    ],
  },
  {
    id: 331,
    slug: "phien-giao-dich-va-loai-lenh",
    title: "Chặng 14, Bài 2: Phiên giao dịch và các loại lệnh",
    subtitle: "Cùng một lệnh đặt ở hai thời điểm khác nhau cho hai kết quả khác nhau",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⏱️",
    track: "personal",
    whyItMatters:
      "Người mới thường đặt lệnh mà không biết nó sẽ khớp thế nào, rồi ngạc nhiên khi lệnh treo cả ngày hoặc khớp ở mức giá không mong đợi. Cơ chế khớp lệnh không phức tạp, và biết nó giúp tránh phần lớn những bất ngờ tốn kém.",
    openingQuestion: "Lệnh giới hạn khác lệnh thị trường ở điểm nào?",
    openingOptions: [
      "Lệnh giới hạn đặt mức giá tối đa bạn chấp nhận, lệnh thị trường khớp ở giá tốt nhất đang có",
      "Lệnh giới hạn chỉ đặt được trong phiên sáng còn lệnh thị trường thì cả ngày",
      "Lệnh giới hạn bắt buộc phải mua tối thiểu một nghìn cổ phiếu, còn lệnh thị trường thì không có ràng buộc đó",
      "Lệnh giới hạn tính phí thấp hơn vì nó không cần khớp ngay lập tức",
    ],
    correctOption: 0,
    explanation:
      "Lệnh giới hạn cho bạn quyền kiểm soát giá nhưng không đảm bảo khớp - nếu thị trường không xuống tới mức bạn đặt thì lệnh treo tới hết phiên. Lệnh thị trường đảm bảo khớp nhưng không đảm bảo giá: nó lấy mức tốt nhất đang có, và trong phiên thanh khoản mỏng mức đó có thể xa hơn bạn tưởng. Đây là đánh đổi cơ bản và không có lựa chọn nào luôn đúng. Với người đầu tư dài hạn mua từng khoản nhỏ, lệnh giới hạn ở vùng giá hợp lý thường an toàn hơn, vì rủi ro không khớp hôm nay nhẹ hơn nhiều so với rủi ro khớp ở một mức giá bất lợi.",
    diagram: [
      { label: "Lệnh giới hạn: kiểm soát giá, không chắc khớp", arrow: true },
      { label: "Lệnh thị trường: chắc khớp, không kiểm soát giá", arrow: true },
      { label: "Thanh khoản mỏng làm lệnh thị trường nguy hiểm hơn", arrow: true },
      { label: "Người mua dài hạn thường hợp với lệnh giới hạn" },
    ],
    realWorldExample: {
      company: "Một lệnh thị trường trên mã ít thanh khoản",
      description:
        "Một người muốn mua nhanh một mã nhỏ và đặt lệnh thị trường. Trên sổ lệnh, khối lượng chào bán ở vùng giá gần nhất rất mỏng, nên lệnh của người này ăn hết mức đó rồi khớp tiếp ở các mức cao hơn. Giá khớp trung bình cao hơn đáng kể so với con số đang hiển thị lúc bấm - không ai làm gì sai, đó đúng là cách lệnh thị trường vận hành.",
    },
    quiz: [
      {
        question: "Rủi ro của lệnh thị trường trên mã thanh khoản mỏng là gì?",
        options: [
          "Lệnh ăn qua nhiều mức giá nên giá khớp trung bình xa mức đang hiển thị",
          "Lệnh bị hủy tự động nếu khối lượng chào bán không đủ để khớp toàn bộ",
          "Lệnh phải chờ tới phiên đóng cửa mới được khớp theo giá bình quân ngày",
          "Lệnh bị tính phí cao hơn do phải khớp với nhiều bên bán khác nhau",
        ],
        correct: 0,
        explanation:
          "Giá hiển thị chỉ là mức tốt nhất hiện có kèm một khối lượng nhất định. Khi lệnh của bạn lớn hơn khối lượng đó, phần còn lại tự động khớp ở các mức kém thuận lợi hơn.",
      },
      {
        question: "Vì sao phiên khớp lệnh định kỳ chỉ cho ra một mức giá duy nhất?",
        options: [
          "Vì hệ thống gom toàn bộ lệnh trong phiên rồi tìm mức giá khớp được nhiều nhất",
          "Vì chỉ lệnh đặt sớm nhất trong phiên đó mới được ưu tiên khớp lệnh",
          "Vì sở giao dịch ấn định trước mức giá mở cửa và đóng cửa cho từng mã",
          "Vì trong phiên đó chỉ có đúng một bên mua và một bên bán được phép tham gia khớp",
        ],
        correct: 0,
        explanation:
          "Khác với khớp lệnh liên tục - nơi mỗi cặp lệnh gặp nhau tạo ra một giao dịch - phiên định kỳ tính một lần cho toàn bộ lệnh đã đặt. Nên trong phiên đó, đặt sớm hay muộn không quyết định giá bạn nhận được.",
      },
      {
        question: "Biên độ dao động giá trong ngày có tác dụng gì?",
        options: [
          "Giới hạn mức tăng giảm tối đa của một mã trong một phiên giao dịch",
          "Bảo đảm nhà đầu tư không bao giờ lỗ quá tỷ lệ đó trên khoản đã mua",
          "Quy định số lượng cổ phiếu tối đa được giao dịch trong mỗi phiên",
          "Ấn định mức giá mà doanh nghiệp phải mua lại cổ phiếu của mình",
        ],
        correct: 0,
        explanation:
          "Biên độ chỉ giới hạn mức đổi trong MỘT phiên, không giới hạn tổng mức lỗ. Một mã có thể giảm kịch biên độ nhiều phiên liên tiếp, và khi đó biên độ còn khiến việc bán ra khó hơn vì không ai muốn mua.",
      },
      {
        question: "Người đầu tư dài hạn nên ưu tiên loại lệnh nào?",
        options: [
          "Lệnh giới hạn ở vùng giá hợp lý, vì không khớp hôm nay ít tai hại hơn khớp giá xấu",
          "Lệnh thị trường để chắc chắn mua được và không bỏ lỡ cơ hội nào",
          "Lệnh giới hạn đặt thật xa giá hiện tại để chờ những phiên giảm sâu",
          "Luân phiên giữa hai loại lệnh để trung bình hóa mức giá mua vào của mình theo thời gian",
        ],
        correct: 0,
        explanation:
          "Đặt giới hạn quá xa giá hiện tại thì gần như chắc chắn không bao giờ khớp, và bạn đứng ngoài thị trường trong khi vẫn nghĩ mình đang chờ cơ hội. Vùng giá hợp lý nghĩa là gần mức đang giao dịch, không phải một mức trong mơ.",
      },
      {
        question: "Vì sao không nên đặt lệnh vào phút cuối của phiên đóng cửa?",
        options: [
          "Vì lệnh có thể không kịp vào hệ thống, và giá phiên định kỳ khó dự đoán",
          "Vì lệnh đặt cuối phiên bị tính phí cao hơn so với lệnh đặt trong ngày",
          "Vì công ty chứng khoán không nhận lệnh trong mười lăm phút cuối cùng",
          "Vì giá đóng cửa luôn bất lợi hơn hẳn giá trung bình của cả phiên giao dịch",
        ],
        correct: 0,
        explanation:
          "Giá đóng cửa không hệ thống bất lợi hơn hay có lợi hơn - nó chỉ khó dự đoán, vì nó là kết quả của toàn bộ lệnh gom lại và có thể lệch khá xa mức đang khớp trước đó vài phút.",
      },
    ],
    keyTakeaways: [
      "Lệnh giới hạn kiểm soát giá nhưng không chắc khớp; lệnh thị trường ngược lại",
      "Trên mã thanh khoản mỏng, lệnh thị trường có thể khớp xa mức đang hiển thị",
      "Phiên khớp lệnh định kỳ gom mọi lệnh và cho ra một mức giá duy nhất",
      "Biên độ giới hạn mức đổi trong một phiên, không giới hạn tổng mức lỗ",
    ],
    practicePrompt: {
      question:
        "Bạn muốn mua một mã đang giao dịch quanh 25.000 đồng và không vội. Cách đặt lệnh hợp lý nhất?",
      options: [
        "Lệnh giới hạn quanh vùng giá hiện tại và chấp nhận có thể không khớp hôm nay",
        "Lệnh thị trường để mua được ngay, vì chênh lệch vài trăm đồng là không đáng kể",
        "Lệnh giới hạn ở 18.000 đồng và chờ tới khi thị trường giảm mạnh",
        "Chia thành mười lệnh nhỏ đặt rải rác trong ngày để trung bình hóa giá",
      ],
      correct: 0,
      explanation:
        "Đặt ở 18.000 khi giá đang 25.000 là đứng ngoài thị trường chứ không phải chờ cơ hội. Chia thành mười lệnh nhỏ trong cùng một ngày thì nhân phí lên mười lần để đổi lấy mức trung bình gần như không khác gì.",
    },
    summary: {
      keyIdea: "Lệnh giới hạn đổi tính chắc chắn khớp lấy quyền kiểm soát giá; lệnh thị trường đổi ngược lại",
      commonMistake: "Dùng lệnh thị trường trên mã thanh khoản mỏng rồi ngạc nhiên vì giá khớp",
      action: "Trước khi đặt lệnh, xem khối lượng chào bán ở vùng giá gần nhất để biết lệnh của bạn có ăn qua nhiều mức không.",
    },
    application: {
      title: "Đọc sổ lệnh trước khi bấm",
      message:
        "Mở bảng giá của mã bạn định mua, nhìn khối lượng chào bán ở ba mức giá gần nhất. Nếu lệnh của bạn lớn hơn khối lượng ở mức đầu tiên, lệnh thị trường sẽ khớp ở giá cao hơn mức hiển thị.",
      secondary:
        "Với các mã thanh khoản lớn, khác biệt này thường không đáng kể. Nó chỉ trở nên quan trọng ở những mã ít người giao dịch.",
    },
    sections: [
      {
        type: "lead",
        text: "Bấm mua là việc của một giây, nhưng chuyện xảy ra sau cú bấm ấy quyết định bạn trả bao nhiêu. Bài này nói về cơ chế đó.",
      },
      { type: "heading", text: "Hai loại lệnh, hai thứ được đảm bảo" },
      {
        type: "paragraph",
        text: "Lệnh giới hạn nói với thị trường rằng bạn chấp nhận mua tối đa ở một mức giá. Nếu không ai bán ở mức đó, lệnh treo và bạn không mua được - nhưng bạn cũng không bao giờ trả nhiều hơn mức mình đã định. Lệnh thị trường nói ngược lại: mua bằng mọi giá đang có. Nó luôn khớp, và giá khớp phụ thuộc vào khối lượng đang chào bán chứ không phụ thuộc vào con số bạn thấy trên màn hình.",
      },
      {
        type: "conceptTable",
        title: "Ba trạng thái của một phiên giao dịch",
        subtitle: "Lệnh của bạn được xử lý khác nhau ở mỗi trạng thái",
        concepts: [
          {
            vi: "Khớp lệnh định kỳ mở cửa",
            en: "Opening auction",
            def: "Gom toàn bộ lệnh rồi tính một mức giá khớp được nhiều nhất. Đặt sớm hay muộn trong phiên này không đổi giá bạn nhận.",
          },
          {
            vi: "Khớp lệnh liên tục",
            en: "Continuous trading",
            def: "Mỗi cặp lệnh mua bán gặp nhau tạo ra một giao dịch ngay. Đây là phần lớn thời gian của phiên và cũng là nơi giá thay đổi liên tục.",
          },
          {
            vi: "Khớp lệnh định kỳ đóng cửa",
            en: "Closing auction",
            def: "Cơ chế như mở cửa, và kết quả là giá đóng cửa của ngày. Mức này có thể lệch khá xa giá đang khớp trước đó vài phút.",
          },
        ],
      },
      {
        type: "callout",
        label: "Biên độ không phải một tấm lưới an toàn",
        text: "Biên độ giới hạn mức tăng giảm trong MỘT phiên, nên nhiều người hiểu nhầm rằng nó chặn được mức lỗ. Một mã có thể giảm kịch biên độ nhiều phiên liên tiếp, và ở những phiên đó gần như không có bên mua - nghĩa là đúng lúc bạn muốn thoát ra nhất thì lại là lúc khó thoát nhất.",
      },
      {
        type: "closing",
        lines: [
          "Chọn loại lệnh là chọn xem bạn muốn được đảm bảo điều gì, vì không thể được đảm bảo cả hai.",
          "Bài sau: lệnh đã khớp rồi, nhưng tiền và cổ phiếu về tài khoản lúc nào.",
        ],
      },
    ],
  },
  {
    id: 332,
    slug: "chu-ky-thanh-toan-t-cong",
    title: "Chặng 14, Bài 3: Chu kỳ thanh toán - tiền và cổ phiếu về khi nào",
    subtitle: "Khớp lệnh không phải là xong; quyền sở hữu chuyển giao sau đó vài ngày làm việc",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📅",
    track: "personal",
    whyItMatters:
      "Người mới thường tưởng bán xong là có tiền ngay và mua xong là bán lại được ngay. Cả hai đều sai, và hiểu sai chu kỳ thanh toán dẫn tới những kế hoạch dùng tiền bị vỡ vào đúng ngày cần tiền.",
    openingQuestion: "Bạn bán cổ phiếu hôm nay. Khi nào tiền sẵn sàng để rút về tài khoản ngân hàng?",
    openingOptions: [
      "Ngay lập tức sau khi lệnh bán được khớp trên hệ thống giao dịch",
      "Sau một khoảng vài ngày làm việc theo chu kỳ thanh toán của thị trường",
      "Vào cuối tháng khi công ty chứng khoán đối chiếu toàn bộ giao dịch",
      "Sau khi doanh nghiệp phát hành xác nhận xong việc chuyển nhượng cổ phiếu",
    ],
    correctOption: 1,
    explanation:
      "Khớp lệnh và thanh toán là hai việc tách rời. Khớp lệnh xác định ai mua của ai với giá nào; thanh toán là lúc tiền và quyền sở hữu thật sự đổi chỗ, và nó diễn ra sau đó vài ngày làm việc theo chu kỳ chuẩn của thị trường. Hệ quả rất thực tế với người lập kế hoạch: nếu bạn cần tiền vào một ngày cụ thể, phải bán trước ngày đó đủ số ngày làm việc, và cuối tuần cùng ngày lễ không tính. Doanh nghiệp phát hành không tham gia vào quá trình này - việc chuyển quyền sở hữu do hệ thống lưu ký xử lý, nên chờ doanh nghiệp xác nhận là hiểu sai cơ chế.",
    diagram: [
      { label: "Ngày T: lệnh khớp trên sàn", arrow: true },
      { label: "Vài ngày làm việc sau: thanh toán", arrow: true },
      { label: "Cuối tuần và ngày lễ không tính vào", arrow: true },
      { label: "Cần tiền ngày nào thì phải bán trước ngày đó" },
    ],
    realWorldExample: {
      company: "Bán vào thứ Năm trước một kỳ nghỉ dài",
      description:
        "Một người cần tiền vào đầu tuần sau nên bán cổ phiếu vào chiều thứ Năm, nghĩ rằng vài ngày là đủ. Nhưng chu kỳ thanh toán đếm theo ngày làm việc, và tuần đó có kỳ nghỉ lễ - nên tiền về muộn hơn dự tính vài ngày. Khoản chi đã hẹn phải hoãn lại, không phải vì thiếu tiền mà vì đếm nhầm loại ngày.",
    },
    quiz: [
      {
        question: "Chu kỳ thanh toán đếm theo loại ngày nào?",
        options: [
          "Ngày làm việc, nên cuối tuần và ngày lễ không được tính vào",
          "Ngày dương lịch liên tiếp kể từ thời điểm lệnh được khớp",
          "Ngày có giao dịch của riêng mã cổ phiếu mà bạn đã mua bán",
          "Ngày ngân hàng làm việc, không phụ thuộc vào lịch của sàn chứng khoán",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ dễ tính nhầm nhất khi lập kế hoạch. Một giao dịch cuối tuần trước kỳ nghỉ lễ có thể mất gấp đôi số ngày dương lịch so với một giao dịch đầu tuần bình thường.",
      },
      {
        question: "Vì sao thị trường cần chu kỳ thanh toán thay vì chuyển giao tức thì?",
        options: [
          "Vì hệ thống cần thời gian đối chiếu và bù trừ toàn bộ giao dịch giữa các bên",
          "Vì công ty chứng khoán muốn giữ tiền của khách thêm vài ngày nữa để sinh lãi",
          "Vì luật quy định nhà đầu tư phải có thời gian suy nghĩ lại về giao dịch",
          "Vì doanh nghiệp phát hành cần thời gian cập nhật lại danh sách cổ đông",
        ],
        correct: 0,
        explanation:
          "Mỗi phiên có hàng trăm nghìn giao dịch đan chéo nhau, và bù trừ tập trung giúp giảm số lần chuyển tiền thực tế xuống rất nhiều. Đó là lý do kỹ thuật, không phải một khoảng chờ tùy tiện.",
      },
      {
        question: "Bạn mua cổ phiếu hôm nay thì bán lại được khi nào?",
        options: [
          "Sau khi cổ phiếu về tài khoản theo chu kỳ thanh toán",
          "Ngay trong phiên hôm nay nếu giá tăng đủ để có lãi",
          "Sau đúng một tháng kể từ ngày lệnh mua được khớp",
          "Bất cứ lúc nào vì quyền sở hữu chuyển ngay khi khớp lệnh",
        ],
        correct: 0,
        explanation:
          "Bạn chỉ bán được thứ đã thật sự nằm trong tài khoản. Đây cũng là lý do việc mua đi bán lại trong ngày không phải chuyện nhà đầu tư cá nhân thông thường làm được với cùng một lô cổ phiếu.",
      },
      {
        question: "Cần tiền vào một ngày cụ thể thì nên bán khi nào?",
        options: [
          "Trước ngày đó đủ số ngày làm việc của chu kỳ, cộng thêm khoảng đệm",
          "Đúng vào ngày cần tiền để giữ cổ phiếu càng lâu càng tốt",
          "Trước một ngày là đủ vì tiền bán chứng khoán về rất nhanh",
          "Bất cứ lúc nào trong tháng đó vì thanh toán được gộp vào cuối tháng",
        ],
        correct: 0,
        explanation:
          "Khoảng đệm quan trọng vì lịch nghỉ lễ và các sự cố nhỏ đều có thể làm chậm. Với một khoản chi đã hẹn ngày, vài ngày đệm rẻ hơn nhiều so với việc phải hoãn.",
      },
      {
        question: "Trong thời gian chờ thanh toán, cổ phiếu bạn vừa mua có rủi ro gì?",
        options: [
          "Giá vẫn biến động bình thường dù bạn chưa bán lại được",
          "Giao dịch có thể bị hủy nếu bên bán đổi ý trước ngày thanh toán",
          "Cổ phiếu không được tính cổ tức nếu chốt quyền rơi vào thời gian này",
          "Bạn phải trả lãi cho công ty chứng khoán trong những ngày chờ đó",
        ],
        correct: 0,
        explanation:
          "Bạn đã chịu rủi ro giá kể từ lúc khớp lệnh, chỉ là chưa bán lại được. Đó là điểm bất đối xứng đáng biết: rủi ro đến ngay, còn quyền hành động thì đến sau.",
      },
    ],
    keyTakeaways: [
      "Khớp lệnh và thanh toán là hai việc tách rời, cách nhau vài ngày làm việc",
      "Chu kỳ đếm theo NGÀY LÀM VIỆC - cuối tuần và ngày lễ không tính",
      "Chỉ bán được cổ phiếu đã thật sự về tài khoản",
      "Rủi ro giá đến ngay từ lúc khớp, còn quyền bán lại thì đến sau",
    ],
    practicePrompt: {
      question:
        "Bạn phải nộp một khoản tiền vào thứ Hai tuần sau và định bán cổ phiếu để lấy tiền. Nên làm gì?",
      options: [
        "Bán từ đầu tuần này, chừa khoảng đệm cho cuối tuần và sự cố phát sinh",
        "Bán vào thứ Sáu tuần này vì như vậy chỉ cách có một ngày nghỉ",
        "Bán vào sáng thứ Hai đó rồi nộp tiền vào buổi chiều cùng ngày",
        "Không bán mà đi vay ngắn hạn rồi trả lại sau khi tiền chứng khoán về",
      ],
      correct: 0,
      explanation:
        "Bán thứ Sáu là chắc chắn không kịp vì cuối tuần không tính vào chu kỳ. Vay ngắn hạn để bù khoảng chờ là trả lãi cho một vấn đề chỉ cần lập kế hoạch sớm hơn vài ngày là hết.",
    },
    summary: {
      keyIdea: "Khớp lệnh là thỏa thuận; thanh toán mới là lúc tiền và cổ phiếu đổi chỗ",
      commonMistake: "Đếm chu kỳ theo ngày dương lịch và quên cuối tuần cùng ngày lễ",
      action: "Với mọi khoản chi đã hẹn ngày, đếm ngược theo ngày làm việc rồi cộng thêm đệm.",
    },
    application: {
      title: "Đếm ngược từ ngày cần tiền",
      message:
        "Lấy ngày bạn cần tiền, đếm ngược đủ số ngày làm việc của chu kỳ thanh toán, rồi lùi thêm vài ngày đệm. Đó là hạn chót để đặt lệnh bán.",
      secondary:
        "Kiểm lịch nghỉ lễ trong khoảng đó. Đây là nguyên nhân phổ biến nhất khiến kế hoạch bị lệch vài ngày.",
    },
    sections: [
      {
        type: "lead",
        text: "Trên màn hình, lệnh khớp là một dòng chữ hiện lên trong tích tắc. Nhưng việc tiền và cổ phiếu thật sự đổi chủ diễn ra sau đó, và khoảng cách giữa hai thời điểm ấy làm hỏng nhiều kế hoạch.",
      },
      { type: "heading", text: "Hai việc tách rời" },
      {
        type: "paragraph",
        text: "Khớp lệnh xác định thỏa thuận: ai mua của ai, bao nhiêu, giá nào. Thanh toán là lúc thỏa thuận ấy được thực hiện - tiền rời tài khoản người mua và cổ phiếu rời tài khoản người bán. Mỗi phiên có hàng trăm nghìn giao dịch đan chéo, nên hệ thống bù trừ tập trung rồi mới chuyển giao, và quá trình đó cần vài ngày làm việc.",
      },
      {
        type: "callout",
        label: "Rủi ro đến trước, quyền hành động đến sau",
        text: "Ngay khi lệnh mua khớp, bạn đã chịu toàn bộ biến động giá của số cổ phiếu đó - nếu nó giảm trong hai ngày chờ, khoản lỗ là của bạn. Nhưng bạn chưa bán lại được vì cổ phiếu chưa về. Đây là điểm bất đối xứng ít được nói tới và nó là một lý do nữa để không mua bằng tiền sẽ cần dùng gấp.",
      },
      {
        type: "list",
        items: [
          "Đếm theo ngày làm việc, không đếm theo ngày dương lịch",
          "Kiểm lịch nghỉ lễ trước khi lập kế hoạch dùng tiền từ việc bán cổ phiếu",
          "Chỉ bán được cổ phiếu đã về tài khoản, nên không có chuyện mua bán liên tục cùng một lô",
          "Với khoản chi đã hẹn ngày, luôn chừa vài ngày đệm ngoài chu kỳ chuẩn",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thị trường vận hành theo lịch của nó, không theo lịch của bạn - nên kế hoạch phải đếm theo lịch ấy.",
          "Bài sau: mỗi lần mua bán bạn mất bao nhiêu cho phí và thuế.",
        ],
      },
    ],
  },
  {
    id: 333,
    slug: "phi-va-thue-giao-dich-chung-khoan",
    title: "Chặng 14, Bài 4: Phí giao dịch và thuế bán cổ phiếu",
    subtitle: "Thuế thu trên giá trị bán, không thu trên lãi - nên bán lỗ vẫn phải nộp",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧮",
    track: "personal",
    whyItMatters:
      "Chi phí giao dịch quyết định một chiến lược có khả thi hay không. Với người mua rồi giữ, chúng gần như không đáng kể; với người mua bán thường xuyên, chúng có thể nuốt hết phần lãi trước khi bạn kịp nhận ra.",
    openingQuestion: "Thuế thu nhập cá nhân khi bán cổ phiếu ở Việt Nam được tính thế nào?",
    openingOptions: [
      "Theo tỷ lệ trên tổng giá trị bán, thu cả khi giao dịch đó bị lỗ",
      "Theo tỷ lệ trên phần lãi, và không phải nộp gì nếu giao dịch bị lỗ",
      "Theo biểu lũy tiến giống như thuế thu nhập từ tiền lương hằng tháng",
      "Chỉ phải nộp khi tổng lãi trong năm vượt qua một ngưỡng nhất định",
    ],
    correctOption: 0,
    explanation:
      "Đây là điểm khiến rất nhiều người bất ngờ: thuế được tính trên giá trị bán chứ không trên phần lãi, nên bán lỗ vẫn phải nộp. Cách tính này đơn giản cho cơ quan thuế và cho công ty chứng khoán - khoản thuế được khấu trừ ngay khi giao dịch hoàn tất, bạn không phải tự kê khai. Nhưng nó có một hệ quả quan trọng với chiến lược: mỗi lần bán đều phát sinh chi phí bất kể kết quả, nên mua đi bán lại nhiều lần tạo ra một dòng chi phí chạy đều đặn trong khi phần lãi thì không chắc chắn. Đó là lý do chi phí giao dịch ảnh hưởng tới người giao dịch thường xuyên mạnh hơn nhiều so với người mua và giữ.",
    diagram: [
      { label: "Mua: trả phí giao dịch", arrow: true },
      { label: "Bán: trả phí giao dịch cộng thuế trên giá trị bán", arrow: true },
      { label: "Thuế thu cả khi lỗ", arrow: true },
      { label: "Nên số LẦN giao dịch quyết định tổng chi phí" },
    ],
    interactiveType: "fee-drag",
    realWorldExample: {
      company: "Hai chiến lược, cùng một danh mục",
      description:
        "Hai người cùng mua một rổ cổ phiếu đầu năm. Người thứ nhất giữ nguyên cả năm: trả phí đúng một lần lúc mua. Người thứ hai mua bán trung bình mỗi tháng một vòng: mười hai lần phí mua, mười hai lần phí bán, cộng mười hai lần thuế trên giá trị bán. Cuối năm, ngay cả khi cả hai đoán đúng xu hướng như nhau, người thứ hai vẫn về sau vì phần chi phí chạy đều đặn suốt mười hai tháng.",
    },
    quiz: [
      {
        question: "Vì sao thuế tính trên giá trị bán lại quan trọng với người giao dịch nhiều?",
        options: [
          "Vì mỗi lần bán đều phát sinh thuế bất kể lãi hay lỗ, nên chi phí tỷ lệ với số lần",
          "Vì thuế suất tăng dần theo số lần giao dịch trong cùng một năm",
          "Vì người giao dịch nhiều phải tự kê khai thuế thay vì được khấu trừ tự động tại nguồn",
          "Vì thuế chỉ áp dụng cho các giao dịch có giá trị vượt một ngưỡng nhất định",
        ],
        correct: 0,
        explanation:
          "Thuế suất không đổi theo số lần giao dịch, nhưng tổng số tiền thuế thì tỷ lệ thuận với tổng giá trị bán ra trong năm. Mua bán mười hai vòng nghĩa là mười hai lần đóng thuế trên cùng một khoản vốn.",
      },
      {
        question: "Chi phí giao dịch ảnh hưởng tới ai nhiều nhất?",
        options: [
          "Người mua bán thường xuyên, vì chi phí tính theo lần chứ không theo thời gian nắm giữ",
          "Người giữ cổ phiếu lâu năm, vì các khoản chi phí tích lũy dần theo mỗi năm nắm giữ thêm",
          "Người có danh mục lớn, vì phí tính theo tỷ lệ phần trăm trên giá trị",
          "Người đầu tư vào cổ phiếu nhỏ, vì các mã này có mức phí riêng cao hơn",
        ],
        correct: 0,
        explanation:
          "Đây là cùng cấu trúc với chênh lệch mua-bán của vàng ở chặng trước: chi phí theo LẦN chứ không theo thời gian. Danh mục lớn trả nhiều tiền hơn về số tuyệt đối nhưng tỷ lệ thì như nhau.",
      },
      {
        question:
          "Bán một lô cổ phiếu trị giá 100 triệu với thuế suất 0,1% thì nộp bao nhiêu thuế?",
        options: [
          "100 nghìn đồng (= 100 triệu × 0,1%)",
          "1 triệu đồng (= 100 triệu × 1%, nhầm một bậc thập phân)",
          "Không phải nộp nếu giao dịch đó bị lỗ so với giá mua ban đầu",
          "10 nghìn đồng (= 100 triệu × 0,01%, nhầm hai bậc thập phân)",
        ],
        correct: 0,
        explanation:
          "Con số tuyệt đối cho một lần bán không lớn, và đó là lý do người ta bỏ qua nó. Vấn đề chỉ hiện ra khi nhân với số lần bán trong năm, cộng thêm phí giao dịch của cả hai chiều mua và bán.",
      },
      {
        question: "Vì sao bạn không phải tự kê khai khoản thuế này?",
        options: [
          "Vì công ty chứng khoán khấu trừ ngay tại thời điểm giao dịch hoàn tất",
          "Vì khoản thuế này được miễn kê khai với nhà đầu tư cá nhân trong nước",
          "Vì sở giao dịch chứng khoán nộp thay cho toàn bộ nhà đầu tư mỗi quý",
          "Vì thuế chỉ được tính một lần vào cuối năm khi quyết toán thu nhập",
        ],
        correct: 0,
        explanation:
          "Cách tính trên giá trị bán khiến việc khấu trừ tự động trở nên khả thi - không cần biết giá vốn của bạn là bao nhiêu. Đó cũng chính là lý do cách tính này được chọn dù nó không công bằng với người bán lỗ.",
      },
      {
        question: "Kết luận thực dụng từ cấu trúc chi phí này là gì?",
        options: [
          "Số lần giao dịch nên là một quyết định có cân nhắc, không phải phản xạ theo tin tức",
          "Nên tránh hoàn toàn việc bán cổ phiếu để không bao giờ phải nộp thuế",
          "Nên gom nhiều lệnh nhỏ thành một lệnh lớn để được hưởng mức phí ưu đãi",
          "Nên chọn công ty chứng khoán miễn phí giao dịch để loại bỏ hoàn toàn mọi khoản chi phí",
        ],
        correct: 0,
        explanation:
          "Không bán bao giờ thì cũng không thực hiện được kế hoạch nào. Còn miễn phí giao dịch chỉ bỏ được một trong ba khoản - thuế trên giá trị bán vẫn còn nguyên vì đó không phải phí của công ty chứng khoán.",
      },
    ],
    keyTakeaways: [
      "Thuế bán cổ phiếu tính trên GIÁ TRỊ BÁN, nên bán lỗ vẫn phải nộp",
      "Khoản thuế được khấu trừ tự động, bạn không phải tự kê khai",
      "Chi phí tính theo LẦN giao dịch, không theo thời gian nắm giữ",
      "Miễn phí giao dịch không xóa được thuế - đó là hai khoản khác nhau",
    ],
    practicePrompt: {
      question:
        "Bạn định mua bán theo tin tức, trung bình hai vòng mỗi tháng. Điều cần tính trước là gì?",
      options: [
        "Tổng phí và thuế của hai mươi bốn vòng trong năm so với mức lãi bạn kỳ vọng",
        "Mã cổ phiếu nào có biên độ dao động lớn nhất để tối đa hóa lợi nhuận",
        "Công ty chứng khoán nào có ứng dụng đặt lệnh nhanh nhất thị trường",
        "Thời điểm nào trong ngày thường cho mức giá thuận lợi nhất để vào lệnh mua",
      ],
      correct: 0,
      explanation:
        "Hai mươi bốn vòng nghĩa là hai mươi bốn lần phí mua, hai mươi bốn lần phí bán và hai mươi bốn lần thuế. Đó là một ngưỡng cụ thể mà chiến lược phải vượt qua trước khi tạo ra đồng lãi đầu tiên.",
    },
    summary: {
      keyIdea: "Thuế thu trên giá trị bán chứ không trên lãi, nên mỗi lần bán đều tốn tiền bất kể kết quả",
      commonMistake: "Coi phí và thuế là số nhỏ, và không nhân chúng với số lần giao dịch trong năm",
      action: "Tính tổng phí và thuế cho số vòng giao dịch bạn dự định trong một năm.",
    },
    application: {
      title: "Ngưỡng phải vượt",
      message:
        "Cộng phí mua, phí bán và thuế cho một vòng giao dịch, rồi nhân với số vòng bạn dự định trong năm. Đó là mức lãi tối thiểu chiến lược của bạn phải tạo ra để hòa vốn.",
      secondary:
        "Đặt con số ấy cạnh mức lãi mà một danh mục mua và giữ có thể mang lại. Phép so sánh này thường quyết định chiến lược nào hợp lý hơn với bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba khoản nhỏ - phí mua, phí bán, thuế - mỗi khoản đều dưới một phần trăm. Chúng chỉ trở nên quan trọng khi bạn nhân chúng với số lần giao dịch, và đó chính là chỗ nhiều chiến lược sụp đổ.",
      },
      { type: "heading", text: "Thuế trên giá trị bán, không trên lãi" },
      {
        type: "paragraph",
        text: "Cách tính này khác hẳn trực giác về thuế thu nhập. Bạn không nộp thuế trên phần lãi mà nộp trên tổng giá trị đã bán ra, nghĩa là một giao dịch lỗ vẫn phát sinh thuế. Lý do là kỹ thuật: cơ quan thuế và công ty chứng khoán không cần biết giá vốn của bạn, nên khoản thuế khấu trừ được ngay tại chỗ mà không cần bạn kê khai gì.",
      },
      {
        type: "conceptTable",
        title: "Ba khoản chi phí của một vòng giao dịch",
        subtitle: "Hai khoản trả cho công ty chứng khoán, một khoản nộp ngân sách",
        concepts: [
          {
            vi: "Phí mua",
            en: "Buy commission",
            def: "Tỷ lệ trên giá trị lệnh, khác nhau giữa các công ty chứng khoán. Đây là khoản thương lượng được khi giá trị giao dịch lớn.",
          },
          {
            vi: "Phí bán",
            en: "Sell commission",
            def: "Cùng cơ chế với phí mua. Nghĩa là một vòng mua rồi bán đã trả phí hai lần chứ không phải một.",
          },
          {
            vi: "Thuế trên giá trị bán",
            en: "Transfer tax",
            def: "Chỉ phát sinh ở chiều bán, tính trên giá trị bán chứ không trên lãi. Không phụ thuộc vào công ty chứng khoán nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cùng cấu trúc với chênh lệch mua-bán của vàng",
        text: "Chặng 13 đã gặp đúng dạng chi phí này: tính theo LẦN chứ không theo thời gian nắm giữ. Hệ quả giống nhau ở cả hai nơi - chiến lược mua đều đặn nhiều lần bị phạt nặng hơn chiến lược mua rồi giữ, và người ta thường chỉ phát hiện sau khi đã giao dịch cả năm.",
      },
      {
        type: "closing",
        lines: [
          "Ba khoản dưới một phần trăm, nhân với hai mươi bốn lần, thành một con số không còn nhỏ.",
          "Bài sau: VN-Index tăng không có nghĩa danh mục của bạn tăng - vì sao.",
        ],
      },
    ],
  },
  {
    id: 334,
    slug: "vn-index-va-vn30",
    title: "Chặng 14, Bài 5: VN-Index và VN30 nói lên điều gì",
    subtitle: "Chỉ số tăng mà danh mục bạn giảm là chuyện bình thường, và đây là lý do",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "VN-Index là con số được nhắc tới hằng ngày và được dùng làm thước đo thị trường tốt hay xấu. Nhưng cách nó được tính khiến nó có thể tăng trong khi phần lớn cổ phiếu giảm - và không biết điều đó dẫn tới những kết luận sai về danh mục của chính mình.",
    openingQuestion: "Vì sao VN-Index có thể tăng trong khi đa số cổ phiếu trên sàn giảm giá?",
    openingOptions: [
      "Vì chỉ số tính theo vốn hóa nên vài mã lớn nhất chi phối phần lớn biến động",
      "Vì chỉ số chỉ tính những mã tăng giá và bỏ qua những mã giảm trong phiên",
      "Vì chỉ số được làm mượt để phản ánh xu hướng dài hạn thay vì biến động ngày",
      "Vì chỉ số tính trung bình cộng giá của tất cả cổ phiếu đang niêm yết",
    ],
    correctOption: 0,
    explanation:
      "VN-Index tính theo vốn hóa, nghĩa là mã có giá trị thị trường lớn hơn có trọng số lớn hơn. Vài mã lớn nhất có thể chiếm một phần đáng kể toàn bộ chỉ số, nên khi chúng tăng mạnh, chỉ số tăng ngay cả khi hàng trăm mã nhỏ đồng loạt giảm. Đây không phải lỗi thiết kế - chỉ số đo giá trị của toàn thị trường chứ không đo số lượng mã tăng giảm. Nhưng nó có nghĩa là VN-Index không phải thước đo tốt cho danh mục của một cá nhân, vì danh mục cá nhân hiếm khi có cùng cơ cấu trọng số ấy. Muốn biết thị trường rộng đang thế nào, cần nhìn thêm số mã tăng so với số mã giảm.",
    diagram: [
      { label: "VN-Index tính theo vốn hóa", arrow: true },
      { label: "Vài mã lớn chi phối phần lớn biến động", arrow: true },
      { label: "Chỉ số tăng dù nhiều mã nhỏ giảm", arrow: true },
      { label: "Nên nó không đo được danh mục của bạn" },
    ],
    realWorldExample: {
      company: "Một phiên xanh mà tài khoản đỏ",
      description:
        "Một phiên VN-Index tăng gần một phần trăm và bản tin gọi đó là phiên tích cực. Nhưng số mã giảm nhiều hơn số mã tăng, và phần lớn mức tăng của chỉ số đến từ vài mã vốn hóa lớn nhất. Nhà đầu tư nắm các mã vừa và nhỏ mở tài khoản ra thấy màu đỏ, và bối rối vì bản tin nói ngược lại - trong khi cả hai đều mô tả đúng thứ mà mình đo.",
    },
    quiz: [
      {
        question: "VN30 khác VN-Index ở điểm nào?",
        options: [
          "VN30 chỉ gồm ba mươi mã được chọn theo vốn hóa và thanh khoản",
          "VN30 tính trung bình cộng giá của ba mươi mã có thị giá cao nhất",
          "VN30 chỉ tính các mã thuộc nhóm ngành tài chính và ngân hàng",
          "VN30 được cập nhật mỗi tháng còn VN-Index cập nhật theo từng phiên",
        ],
        correct: 0,
        explanation:
          "VN30 là một rổ chọn lọc, và tiêu chí chọn gồm cả vốn hóa lẫn thanh khoản. Vì thế nó đại diện cho nhóm cổ phiếu lớn và dễ giao dịch, chứ không đại diện cho toàn thị trường.",
      },
      {
        question: "Cách nào biết được thị trường rộng đang tăng hay giảm?",
        options: [
          "Xem số mã tăng giá so với số mã giảm giá trong phiên",
          "Xem mức thay đổi của VN-Index so với phiên liền trước",
          "Xem tổng giá trị giao dịch của toàn sàn trong phiên đó",
          "Xem mức thay đổi của mã có vốn hóa lớn nhất thị trường",
        ],
        correct: 0,
        explanation:
          "Đây là chỉ báo độ rộng, và nó trả lời đúng câu hỏi mà chỉ số không trả lời được. Giá trị giao dịch cho biết mức độ sôi động chứ không cho biết chiều đi.",
      },
      {
        question: "Vì sao VN-Index không phải thước đo tốt cho danh mục cá nhân?",
        options: [
          "Vì danh mục cá nhân hiếm khi có cùng cơ cấu trọng số với chỉ số",
          "Vì chỉ số không tính tới phí giao dịch mà nhà đầu tư phải trả",
          "Vì chỉ số chỉ phản ánh biến động trong phiên chứ không phản ánh dài hạn",
          "Vì chỉ số bị ảnh hưởng bởi các mã mới niêm yết trong từng năm",
        ],
        correct: 0,
        explanation:
          "So sánh chỉ có ý nghĩa khi hai bên đo cùng một thứ. Một danh mục năm mã vừa và nhỏ không có lý do gì phải đi cùng chiều với một chỉ số bị chi phối bởi vài mã lớn nhất.",
      },
      {
        question: "Với người mới, cách dùng chỉ số hợp lý nhất là gì?",
        options: [
          "Xem như bối cảnh chung của thị trường, không xem như thước đo danh mục",
          "Dùng làm tín hiệu mua bán: chỉ số tăng thì mua, chỉ số giảm thì bán",
          "So sánh trực tiếp mức tăng của danh mục với mức tăng của chỉ số mỗi ngày",
          "Bỏ qua hoàn toàn vì chỉ số không có giá trị thông tin nào với cá nhân",
        ],
        correct: 0,
        explanation:
          "Dùng chỉ số làm tín hiệu mua bán là mua khi mọi người đã mua và bán khi mọi người đã bán. Còn bỏ qua hoàn toàn thì mất một thông tin có ích về bối cảnh, chỉ là đừng dùng nó để chấm điểm danh mục của mình.",
      },
      {
        question: "Nếu muốn đầu tư theo đúng một chỉ số thì cách đơn giản nhất là gì?",
        options: [
          "Mua một quỹ mô phỏng chỉ số đó thay vì tự mua từng mã thành phần",
          "Mua đều mỗi mã trong rổ chỉ số với số tiền bằng nhau",
          "Mua mã có vốn hóa lớn nhất vì nó chi phối phần lớn biến động chỉ số",
          "Mua ba mươi mã của VN30 rồi giữ nguyên không điều chỉnh gì thêm",
        ],
        correct: 0,
        explanation:
          "Mua đều mỗi mã không tái tạo được chỉ số vì chỉ số tính theo vốn hóa chứ không đều nhau. Và rổ chỉ số được rà soát định kỳ, nên tự mua rồi giữ nguyên sẽ lệch dần theo thời gian.",
      },
    ],
    keyTakeaways: [
      "VN-Index tính theo vốn hóa nên vài mã lớn chi phối phần lớn biến động",
      "Chỉ số tăng trong khi đa số mã giảm là chuyện hoàn toàn bình thường",
      "Muốn biết thị trường rộng thì xem số mã tăng so với số mã giảm",
      "Chỉ số là bối cảnh, không phải thước đo cho danh mục của cá nhân",
    ],
    practicePrompt: {
      question:
        "Danh mục của bạn giảm 2% trong phiên VN-Index tăng 1%. Kết luận đúng là gì?",
      options: [
        "Danh mục của bạn có cơ cấu khác chỉ số, nên hai con số không so trực tiếp được",
        "Bạn đã chọn sai cổ phiếu, vì danh mục lẽ ra nên đi cùng chiều với thị trường",
        "Chỉ số đang bị làm giá nên nó không phản ánh đúng tình hình thật",
        "Nên bán hết và mua các mã trong rổ VN30 để danh mục bám sát chỉ số",
      ],
      correct: 0,
      explanation:
        "Một phiên không nói lên điều gì về chất lượng lựa chọn. Điều nó nói lên là danh mục của bạn không cùng cơ cấu với chỉ số, và đó là chuyện bình thường với gần như mọi nhà đầu tư cá nhân.",
    },
    summary: {
      keyIdea: "Chỉ số tính theo vốn hóa nên nó đo giá trị thị trường, không đo số mã tăng giảm",
      commonMistake: "Dùng VN-Index để chấm điểm danh mục cá nhân có cơ cấu hoàn toàn khác",
      action: "Khi đọc tin thị trường, tìm thêm số mã tăng so với số mã giảm bên cạnh mức thay đổi chỉ số.",
    },
    application: {
      title: "Hai con số thay vì một",
      message:
        "Lần tới khi xem bản tin thị trường, ghi cả hai: mức thay đổi của chỉ số, và số mã tăng so với số mã giảm. Có phiên hai con số này kể hai câu chuyện khác nhau.",
      secondary:
        "Nếu chúng thường xuyên lệch nhau, đó là dấu hiệu thị trường đang phân hóa - và khi đó việc chọn mã quan trọng hơn hẳn so với việc đoán chiều của chỉ số.",
    },
    sections: [
      {
        type: "lead",
        text: "VN-Index xuất hiện trong mọi bản tin tài chính và được hiểu như nhiệt kế của thị trường. Nó đúng là một nhiệt kế, chỉ là nó đo một thứ hẹp hơn nhiều người tưởng.",
      },
      { type: "heading", text: "Vốn hóa quyết định trọng số" },
      {
        type: "paragraph",
        text: "Chỉ số không cộng giá của các mã rồi chia đều. Nó cân theo giá trị thị trường, nên một mã lớn có thể có trọng số gấp hàng trăm lần một mã nhỏ. Khi vài mã lớn nhất cùng tăng, chỉ số tăng - bất kể hàng trăm mã còn lại đi hướng nào. Điều này không sai: chỉ số được thiết kế để đo giá trị của toàn thị trường, và giá trị ấy nằm phần lớn ở các doanh nghiệp lớn.",
      },
      {
        type: "conceptTable",
        title: "Ba con số, ba câu hỏi khác nhau",
        subtitle: "Bản tin thường chỉ đưa con số đầu tiên",
        concepts: [
          {
            vi: "Mức thay đổi chỉ số",
            en: "Index change",
            def: "Trả lời: giá trị toàn thị trường đổi bao nhiêu. Bị chi phối bởi các mã vốn hóa lớn nhất.",
          },
          {
            vi: "Số mã tăng so với giảm",
            en: "Breadth",
            def: "Trả lời: phần lớn cổ phiếu đang đi hướng nào. Đây là con số gần với trải nghiệm của nhà đầu tư cá nhân hơn.",
          },
          {
            vi: "Giá trị giao dịch",
            en: "Turnover",
            def: "Trả lời: thị trường sôi động tới đâu. Nó không cho biết chiều đi, chỉ cho biết mức độ tham gia.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng dùng chỉ số để chấm điểm chính mình",
        text: "So sánh chỉ có ý nghĩa khi hai bên cùng đo một thứ. Nếu danh mục của bạn gồm năm mã vừa và nhỏ, nó không có lý do gì phải đi cùng chiều với một chỉ số mà vài mã lớn nhất chiếm phần lớn trọng số. Muốn có thước đo đúng, hãy so với một quỹ chỉ số mà bạn thật sự có thể mua, hoặc so với chính mục tiêu của bạn.",
      },
      {
        type: "closing",
        lines: [
          "Chỉ số trả lời rất tốt câu hỏi mà nó được thiết kế để trả lời, và không trả lời câu hỏi nào khác.",
          "Bài sau: cách mua cả một rổ cổ phiếu bằng một lệnh duy nhất.",
        ],
      },
    ],
  },
  {
    id: 335,
    slug: "chung-chi-quy-va-etf-noi",
    title: "Chặng 14, Bài 6: Chứng chỉ quỹ mở và ETF trong nước",
    subtitle: "Mua cả một rổ bằng một lệnh, và hai cách mua rổ ấy khác nhau ở đâu",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧺",
    track: "personal",
    whyItMatters:
      "Chặng 4 đã giải thích vì sao đa dạng hóa quan trọng, nhưng tự mua hai mươi mã đòi hỏi vốn lớn và rất nhiều lệnh. Quỹ giải quyết đúng vấn đề đó, và ở Việt Nam có hai dạng vận hành khác nhau đủ để chọn nhầm gây phiền.",
    openingQuestion: "Quỹ mở và ETF khác nhau cơ bản ở điểm nào?",
    openingOptions: [
      "ETF mua bán trên sàn như cổ phiếu, quỹ mở giao dịch trực tiếp với công ty quản lý quỹ",
      "ETF chỉ dành cho nhà đầu tư tổ chức còn quỹ mở dành cho cá nhân",
      "ETF chỉ đầu tư vào trái phiếu còn quỹ mở thì chỉ đầu tư vào cổ phiếu niêm yết",
      "ETF được bảo đảm vốn gốc còn quỹ mở thì nhà đầu tư tự chịu rủi ro",
    ],
    correctOption: 0,
    explanation:
      "ETF được niêm yết nên bạn mua bán nó trong phiên giống hệt một cổ phiếu, với giá thay đổi liên tục. Quỹ mở không niêm yết: bạn đặt lệnh mua hoặc bán với công ty quản lý quỹ, và giá là giá trị tài sản ròng được tính theo kỳ - thường không phải mọi ngày. Khác biệt này quyết định trải nghiệm: ETF linh hoạt hơn và thấy giá ngay, quỹ mở chậm hơn nhưng thường phù hợp với việc đầu tư định kỳ tự động. Không có loại nào được bảo đảm vốn gốc, và cả hai đều mở cho nhà đầu tư cá nhân.",
    diagram: [
      { label: "Một lệnh mua cả rổ nhiều mã", arrow: true },
      { label: "ETF: mua bán trên sàn, giá liên tục", arrow: true },
      { label: "Quỹ mở: giao dịch với công ty quản lý theo kỳ", arrow: true },
      { label: "Chọn theo cách bạn định mua, không theo loại nào tốt hơn" },
    ],
    realWorldExample: {
      company: "Hai mươi mã bằng một lệnh",
      description:
        "Muốn tự nắm một rổ hai mươi cổ phiếu theo tỷ trọng vốn hóa, một cá nhân cần đủ vốn để mua lô tối thiểu của từng mã, cộng hai mươi lần phí giao dịch, và phải tự tái cân bằng khi rổ thay đổi. Một quỹ mô phỏng chỉ số làm toàn bộ việc đó trong một lệnh duy nhất, đổi lại thu một khoản phí quản lý theo năm.",
    },
    quiz: [
      {
        question: "Phí quản lý quỹ được tính thế nào?",
        options: [
          "Theo tỷ lệ phần trăm trên tài sản mỗi năm, trừ dần vào giá trị chứng chỉ quỹ",
          "Một lần duy nhất khi bạn mua chứng chỉ quỹ lần đầu tiên",
          "Chỉ thu khi quỹ có lãi trong năm đó, còn những năm lỗ thì được miễn hoàn toàn",
          "Theo số lần bạn mua bán chứng chỉ quỹ trong mỗi năm tài chính",
        ],
        correct: 0,
        explanation:
          "Đây là chi phí theo THỜI GIAN, ngược với phí giao dịch cổ phiếu vốn tính theo lần. Nghĩa là giữ càng lâu trả càng nhiều, và chênh lệch nửa điểm phần trăm mỗi năm cộng dồn rất đáng kể sau mười năm.",
      },
      {
        question: "Vì sao quỹ mô phỏng chỉ số thường có phí thấp hơn quỹ chủ động?",
        options: [
          "Vì nó chỉ bám theo rổ chỉ số nên không cần đội ngũ phân tích chọn từng mã",
          "Vì nó được nhà nước trợ giá để khuyến khích nhà đầu tư cá nhân tham gia",
          "Vì nó chỉ đầu tư vào các mã lớn nên chi phí giao dịch của quỹ gần như bằng không",
          "Vì nó không phải trả phí lưu ký cho số cổ phiếu mà quỹ đang nắm giữ",
        ],
        correct: 0,
        explanation:
          "Chi phí lớn nhất của một quỹ chủ động là con người và nghiên cứu. Quỹ chỉ số thay phần đó bằng một quy tắc, nên cấu trúc chi phí thấp hơn hẳn - và Chặng 4 đã nói phần chênh lệch phí ấy ảnh hưởng thế nào tới kết quả dài hạn.",
      },
      {
        question: "Ai hợp với quỹ mở hơn ETF?",
        options: [
          "Người muốn đầu tư một khoản cố định đều đặn hằng tháng một cách tự động",
          "Người muốn mua bán trong phiên khi giá biến động mạnh",
          "Người cần bán gấp ngay trong ngày để lấy tiền mặt xử lý một việc đột xuất",
          "Người muốn thấy giá thay đổi liên tục để canh điểm mua tốt nhất",
        ],
        correct: 0,
        explanation:
          "Ba phương án còn lại đều đòi hỏi tính linh hoạt trong phiên, mà đó chính là thế mạnh của ETF. Quỹ mở bù lại bằng khả năng thiết lập một lệnh định kỳ chạy tự động mà không cần bạn thao tác mỗi tháng.",
      },
      {
        question: "Chênh lệch phí quản lý 1%/năm trên 200 triệu là bao nhiêu tiền mỗi năm?",
        options: [
          "2 triệu đồng (= 200 triệu × 1%)",
          "200 nghìn đồng (= 200 triệu × 0,1%, nhầm một bậc)",
          "20 triệu đồng (= 200 triệu × 10%, nhầm một bậc theo hướng ngược lại)",
          "Không xác định được vì phí phụ thuộc vào kết quả đầu tư của quỹ",
        ],
        correct: 0,
        explanation:
          "Hai triệu mỗi năm nghe không lớn, nhưng nó lặp lại mọi năm và được trừ trên toàn bộ tài sản kể cả năm quỹ lỗ. Sau mười năm, phần chênh lệch cộng dồn vượt xa con số của một năm đơn lẻ.",
      },
      {
        question: "Rủi ro nào KHÔNG được quỹ loại bỏ?",
        options: [
          "Rủi ro thị trường chung giảm, vì quỹ vẫn nắm cổ phiếu của thị trường đó",
          "Rủi ro một doanh nghiệp trong rổ phá sản và mất toàn bộ giá trị",
          "Rủi ro chọn nhầm đúng một mã cổ phiếu duy nhất để dồn toàn bộ vốn vào đó",
          "Rủi ro phải bán gấp một mã ít thanh khoản với giá bất lợi",
        ],
        correct: 0,
        explanation:
          "Đa dạng hóa xử lý được rủi ro riêng của từng doanh nghiệp, nhưng không xử lý được rủi ro chung của cả thị trường. Khi toàn thị trường giảm, một rổ hai mươi mã vẫn giảm - chỉ là ít có khả năng mất trắng như một mã đơn lẻ.",
      },
    ],
    keyTakeaways: [
      "ETF mua bán trên sàn như cổ phiếu; quỹ mở giao dịch với công ty quản lý theo kỳ",
      "Phí quản lý tính theo THỜI GIAN nắm giữ, ngược với phí giao dịch tính theo lần",
      "Quỹ chỉ số rẻ hơn quỹ chủ động vì nó thay đội ngũ phân tích bằng một quy tắc",
      "Quỹ xử lý được rủi ro riêng của từng doanh nghiệp, không xử lý được rủi ro thị trường chung",
    ],
    practicePrompt: {
      question:
        "Bạn muốn đầu tư 3 triệu mỗi tháng vào một rổ cổ phiếu và không muốn thao tác nhiều. Lựa chọn hợp lý nhất?",
      options: [
        "Quỹ mở với lệnh mua định kỳ tự động, ưu tiên loại có phí quản lý thấp",
        "Tự mua ba tới bốn mã mỗi tháng để kiểm soát hoàn toàn danh mục",
        "ETF mua thủ công vào một ngày cố định mỗi tháng trong phiên giao dịch",
        "Gom tiền sáu tháng rồi mua một lần để tiết kiệm phí giao dịch",
      ],
      correct: 0,
      explanation:
        "Với 3 triệu mỗi tháng, tự mua ba tới bốn mã sẽ vướng lô tối thiểu và trả phí nhiều lần. Gom sáu tháng thì giảm được phí nhưng đánh mất chính lợi ích của việc mua đều đặn là trung bình hóa giá.",
    },
    summary: {
      keyIdea: "Quỹ bán cho bạn sự đa dạng hóa và công tái cân bằng, đổi lại thu phí theo năm",
      commonMistake: "So sánh các quỹ bằng kết quả năm ngoái thay vì bằng phí quản lý và cách vận hành",
      action: "So phí quản lý của vài quỹ cùng loại và nhân chênh lệch với số năm bạn định nắm giữ.",
    },
    application: {
      title: "So ba con số trước khi chọn quỹ",
      message:
        "Với mỗi quỹ đang cân nhắc, ghi: phí quản lý theo năm, quỹ mô phỏng chỉ số hay chủ động, và cách mua bán. Ba con số đó quyết định nhiều hơn kết quả của năm vừa rồi.",
      secondary:
        "Nhân chênh lệch phí với số năm bạn định giữ. Với thời gian nắm giữ dài, đây thường là biến duy nhất bạn kiểm soát được chắc chắn.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng 4 nói vì sao không nên bỏ tất cả vào một rổ. Bài này nói cách mua cả một rổ bằng một lệnh, và hai dạng rổ ấy vận hành khác nhau thế nào.",
      },
      { type: "heading", text: "Cùng bán một thứ, khác cách giao hàng" },
      {
        type: "paragraph",
        text: "Cả quỹ mở lẫn ETF đều bán cho bạn một phần của rổ nhiều cổ phiếu, cộng với công tái cân bằng khi rổ thay đổi. Khác biệt nằm ở cách bạn ra vào. ETF niêm yết trên sàn nên bạn mua bán trong phiên với giá thay đổi liên tục; quỹ mở thì đặt lệnh với công ty quản lý và khớp theo giá trị tài sản ròng của kỳ. Không dạng nào tốt hơn - chúng hợp với hai thói quen đầu tư khác nhau.",
      },
      {
        type: "conceptTable",
        title: "Chọn theo cách bạn định mua",
        subtitle: "Câu hỏi không phải loại nào tốt hơn mà là loại nào hợp với nhịp của bạn",
        concepts: [
          {
            vi: "Đầu tư định kỳ tự động",
            en: "Regular investing",
            def: "Quỹ mở hợp hơn: đặt một lệnh định kỳ rồi không phải thao tác nữa. Không cần canh giá vì bạn không định canh.",
          },
          {
            vi: "Chủ động chọn thời điểm",
            en: "Timing control",
            def: "ETF hợp hơn: thấy giá liên tục, mua bán trong phiên như cổ phiếu, và biết chính xác mức giá khớp.",
          },
          {
            vi: "Phí quản lý",
            en: "Management fee",
            def: "Áp cho cả hai, tính theo năm trên tài sản. Đây là biến quan trọng nhất khi thời gian nắm giữ dài.",
          },
        ],
      },
      {
        type: "callout",
        label: "Hai loại chi phí ngược chiều nhau",
        text: "Phí giao dịch cổ phiếu tính theo LẦN, nên nó phạt người mua bán nhiều. Phí quản lý quỹ tính theo THỜI GIAN, nên nó phạt người giữ lâu. Hệ quả: với người mua và giữ mười năm, chênh lệch phí quản lý giữa hai quỹ quan trọng hơn nhiều so với phí giao dịch của lần mua đầu tiên.",
      },
      {
        type: "closing",
        lines: [
          "Quỹ không bán cho bạn lợi nhuận, nó bán sự đa dạng hóa và công việc tái cân bằng.",
          "Bài sau: cổ tức về tài khoản, và vì sao giá cổ phiếu giảm đúng bằng khoản đó.",
        ],
      },
    ],
  },
  {
    id: 336,
    slug: "co-tuc-va-ngay-chot-quyen",
    title: "Chặng 14, Bài 7: Cổ tức và ngày chốt quyền",
    subtitle: "Mua trước ngày chốt quyền để nhận cổ tức không phải là tiền miễn phí",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "💸",
    track: "personal",
    whyItMatters:
      "Chiến lược mua trước ngày chốt quyền để hưởng cổ tức nghe rất hợp lý và được nhiều người mới áp dụng. Nó bỏ qua một điều chỉnh kỹ thuật xảy ra tự động, và hiểu điều chỉnh ấy tránh được một trong những ngộ nhận phổ biến nhất của thị trường.",
    openingQuestion: "Vào ngày giao dịch không hưởng quyền, giá tham chiếu của cổ phiếu thay đổi thế nào?",
    openingOptions: [
      "Bị điều chỉnh giảm tương ứng với giá trị cổ tức sắp chi trả",
      "Giữ nguyên vì cổ tức là khoản doanh nghiệp trả thêm cho cổ đông",
      "Được điều chỉnh tăng vì cổ phiếu sắp mang lại thu nhập cho người nắm giữ",
      "Không thay đổi cho tới khi cổ tức thật sự về tài khoản nhà đầu tư",
    ],
    correctOption: 0,
    explanation:
      "Cổ tức là tiền lấy ra từ chính doanh nghiệp, nên sau khi chia, doanh nghiệp còn ít tiền hơn đúng bằng khoản đã chia - và giá cổ phiếu phản ánh điều đó bằng một điều chỉnh kỹ thuật vào ngày giao dịch không hưởng quyền. Người mua ngay trước ngày ấy nhận được cổ tức nhưng đồng thời nắm một cổ phiếu có giá tham chiếu thấp hơn, nên về mặt giá trị họ không được thêm gì. Đó là lý do không có chiến lược mua trước chốt quyền nào tạo ra lợi nhuận từ chính khoản cổ tức. Cổ tức vẫn có ý nghĩa - nó là dòng tiền thật và là tín hiệu về sức khỏe doanh nghiệp - nhưng nó không phải khoản thưởng thêm cho việc canh đúng ngày.",
    diagram: [
      { label: "Doanh nghiệp chia tiền cho cổ đông", arrow: true },
      { label: "Doanh nghiệp còn ít tiền hơn đúng khoản đó", arrow: true },
      { label: "Giá tham chiếu điều chỉnh giảm tương ứng", arrow: true },
      { label: "Nên canh ngày chốt quyền không tạo ra lợi nhuận" },
    ],
    realWorldExample: {
      company: "Chiếc bánh và lát cắt",
      description:
        "Một doanh nghiệp có tiền mặt và tài sản trị giá X, và toàn bộ cổ đông sở hữu X đó. Khi doanh nghiệp chia cổ tức tiền mặt, một phần của X rời khỏi doanh nghiệp và về tài khoản cổ đông. Cổ đông không giàu thêm - họ chỉ chuyển một phần tài sản từ dạng cổ phiếu sang dạng tiền mặt, và giá cổ phiếu điều chỉnh để phản ánh đúng chuyện đó.",
    },
    quiz: [
      {
        question: "Vì sao mua ngay trước ngày chốt quyền không tạo ra lợi nhuận?",
        options: [
          "Vì giá tham chiếu bị điều chỉnh giảm tương ứng với khoản cổ tức nhận được",
          "Vì cổ tức chỉ được trả cho cổ đông đã nắm giữ trên sáu tháng liên tục",
          "Vì nhà đầu tư sẽ phải trả lại khoản cổ tức nếu bán cổ phiếu trong cùng năm đó",
          "Vì doanh nghiệp thường lùi ngày chi trả để tránh nhà đầu tư ngắn hạn",
        ],
        correct: 0,
        explanation:
          "Điều chỉnh giá là cơ chế tự động của sàn, không phải quy định về thời gian nắm giữ. Nó đảm bảo không ai được lợi chỉ nhờ có mặt vào đúng một ngày.",
      },
      {
        question: "Cổ tức bằng cổ phiếu khác cổ tức tiền mặt ở điểm nào?",
        options: [
          "Cổ đông nhận thêm cổ phiếu nhưng tỷ lệ sở hữu và tổng giá trị không đổi",
          "Cổ tức bằng cổ phiếu làm tăng giá trị khoản đầu tư vì có thêm số lượng",
          "Cổ tức bằng cổ phiếu được doanh nghiệp mua lại theo giá thị trường sau đó",
          "Cổ tức bằng cổ phiếu chỉ dành cho cổ đông lớn nắm trên một tỷ lệ nhất định",
        ],
        correct: 0,
        explanation:
          "Chia cổ tức bằng cổ phiếu giống việc cắt cùng chiếc bánh thành nhiều lát hơn: bạn có nhiều lát hơn nhưng mỗi lát nhỏ đi tương ứng. Giá cổ phiếu cũng được điều chỉnh giảm theo tỷ lệ đó.",
      },
      {
        question: "Vậy cổ tức có ý nghĩa gì với nhà đầu tư?",
        options: [
          "Nó là dòng tiền thật và là tín hiệu về khả năng tạo tiền của doanh nghiệp",
          "Nó là khoản lợi nhuận thêm ngoài phần tăng giá của cổ phiếu",
          "Nó bảo đảm nhà đầu tư sẽ không bị lỗ ngay cả khi giá cổ phiếu giảm trong năm",
          "Nó là phần thưởng dành riêng cho những cổ đông nắm giữ dài hạn",
        ],
        correct: 0,
        explanation:
          "Doanh nghiệp chỉ chia được tiền mà nó thật sự có, nên một lịch sử chi trả đều đặn nói lên điều gì đó về chất lượng dòng tiền. Đó là giá trị thông tin, khác hẳn với việc coi cổ tức là lợi nhuận thêm.",
      },
      {
        question: "Nhà đầu tư dài hạn nên nhìn cổ tức thế nào?",
        options: [
          "Như một phần của tổng lợi nhuận, cùng với phần thay đổi giá cổ phiếu",
          "Như nguồn thu duy nhất đáng tin cậy, vì giá cổ phiếu thì luôn biến động",
          "Như một yếu tố phụ không cần đưa vào tính toán hiệu quả đầu tư",
          "Như dấu hiệu doanh nghiệp không còn cơ hội đầu tư nào tốt hơn",
        ],
        correct: 0,
        explanation:
          "Tổng lợi nhuận gồm cả hai phần, và bỏ qua phần nào cũng cho ra bức tranh sai. Việc chia cổ tức đôi khi đúng là tín hiệu doanh nghiệp thiếu cơ hội tái đầu tư, nhưng nói nó luôn như vậy thì quá đà.",
      },
      {
        question: "Điều gì cần lưu ý về chu kỳ thanh toán khi muốn nhận cổ tức?",
        options: [
          "Phải mua đủ sớm để cổ phiếu về tài khoản trước ngày chốt danh sách",
          "Phải giữ cổ phiếu ít nhất tới ngày cổ tức thật sự về tài khoản",
          "Phải đăng ký nhận cổ tức với công ty chứng khoán trước ngày chốt danh sách",
          "Phải bán cổ phiếu sau ngày chốt quyền để hưởng trọn khoản cổ tức",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ bài về chu kỳ thanh toán gặp bài này. Mua đúng ngày cuối cùng có thể không kịp vì quyền sở hữu chưa chuyển giao xong, và không có thủ tục đăng ký nào cần làm thêm.",
      },
    ],
    keyTakeaways: [
      "Giá tham chiếu điều chỉnh giảm tương ứng vào ngày giao dịch không hưởng quyền",
      "Mua trước ngày chốt quyền không tạo ra lợi nhuận từ chính khoản cổ tức",
      "Cổ tức bằng cổ phiếu chia nhỏ cùng một giá trị thành nhiều phần hơn",
      "Cổ tức có giá trị như dòng tiền thật và như tín hiệu, không như khoản thưởng thêm",
    ],
    practicePrompt: {
      question:
        "Một người khuyên bạn mua cổ phiếu X vì tuần sau nó chốt quyền trả cổ tức cao. Nên nghĩ gì?",
      options: [
        "Khoản cổ tức đã phản ánh vào giá, nên lý do mua phải là chính doanh nghiệp đó",
        "Đây là cơ hội tốt vì cổ tức cao nghĩa là khoản lợi nhuận chắc chắn nhận được",
        "Nên mua và bán ngay sau ngày chốt quyền để chốt lời khoản cổ tức",
        "Nên chờ tới sau ngày chốt quyền để mua được giá thấp hơn hẳn",
      ],
      correct: 0,
      explanation:
        "Cả hai phương án canh ngày đều dựa trên cùng một ngộ nhận, chỉ khác chiều. Giá điều chỉnh làm cả hai chiến lược trở nên vô nghĩa, nên câu hỏi duy nhất còn lại là doanh nghiệp ấy có đáng sở hữu hay không.",
    },
    summary: {
      keyIdea: "Cổ tức chuyển giá trị từ dạng cổ phiếu sang dạng tiền mặt, không tạo thêm giá trị",
      commonMistake: "Canh mua trước ngày chốt quyền như một cách kiếm lợi nhuận ngắn hạn",
      action: "Khi đánh giá một cổ phiếu, cộng cổ tức và thay đổi giá lại thành tổng lợi nhuận.",
    },
    application: {
      title: "Tính tổng lợi nhuận, không tính riêng cổ tức",
      message:
        "Với mỗi khoản đầu tư đã có, cộng phần thay đổi giá và toàn bộ cổ tức đã nhận. Con số đó mới là kết quả thật - tính riêng một vế luôn cho ra bức tranh lệch.",
      secondary:
        "Nếu một cổ phiếu trả cổ tức đều nhưng giá giảm liên tục nhiều năm, tổng lợi nhuận có thể âm dù tiền cổ tức vẫn về đều đặn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cổ tức là khoản tiền thật về tài khoản, nên rất khó tin rằng nó không phải lợi nhuận thêm. Bài này giải thích vì sao, và vì sao điều đó không làm cổ tức mất giá trị.",
      },
      { type: "heading", text: "Tiền đến từ đâu" },
      {
        type: "paragraph",
        text: "Cổ tức không phải quà tặng từ bên ngoài - nó là tiền của chính doanh nghiệp, mà doanh nghiệp thì thuộc về cổ đông. Khi một phần tiền ấy được chia ra, doanh nghiệp còn ít tài sản hơn đúng bằng khoản đã chia, và giá cổ phiếu phản ánh điều đó qua một điều chỉnh kỹ thuật vào ngày giao dịch không hưởng quyền. Bạn không giàu thêm; bạn chỉ đổi một phần tài sản từ dạng cổ phiếu sang dạng tiền mặt.",
      },
      {
        type: "callout",
        label: "Điều đó không làm cổ tức trở nên vô nghĩa",
        text: "Doanh nghiệp chỉ chia được tiền nó thật sự có, nên một lịch sử chi trả đều đặn qua nhiều năm là bằng chứng khó ngụy tạo về chất lượng dòng tiền. Cổ tức cũng cho bạn tiền mặt để tái phân bổ mà không phải bán cổ phiếu. Điều duy nhất nó không làm là tạo ra lợi nhuận cho người canh đúng ngày.",
      },
      {
        type: "list",
        items: [
          "Giá tham chiếu điều chỉnh vào ngày giao dịch không hưởng quyền, tự động và không có ngoại lệ",
          "Cổ tức bằng cổ phiếu chia nhỏ cùng một giá trị, tỷ lệ sở hữu của bạn không đổi",
          "Muốn nhận cổ tức thì cổ phiếu phải về tài khoản trước ngày chốt danh sách",
          "Đánh giá một khoản đầu tư bằng tổng lợi nhuận: thay đổi giá cộng cổ tức đã nhận",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chuyển tiền từ túi trái sang túi phải không làm ai giàu thêm, kể cả khi giao dịch ấy diễn ra trên sàn.",
          "Bài sau: công cụ có thể xóa sạch tài khoản mà không cần cổ phiếu về không.",
        ],
      },
    ],
  },
  {
    id: 337,
    slug: "margin-vay-tien-mua-co-phieu",
    title: "Chặng 14, Bài 8: Margin - vay tiền mua cổ phiếu",
    subtitle: "Đòn bẩy nhân đôi cả lãi lẫn lỗ, nhưng phần lỗ có thể buộc bạn bán ở đúng đáy",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "⚠️",
    track: "personal",
    whyItMatters:
      "Margin được chào mời như một cách tăng sức mua, và cơ chế của nó thì được giải thích rất sơ sài. Điều khiến nó nguy hiểm không phải chuyện nhân đôi khoản lỗ - mà là nó có thể tước mất quyền chờ đợi của bạn đúng vào lúc chờ đợi là điều đúng nên làm.",
    openingQuestion: "Điều gì khiến margin nguy hiểm hơn việc chỉ đơn giản là lỗ nhiều hơn?",
    openingOptions: [
      "Khi tài sản giảm dưới ngưỡng, bạn bị buộc bán ra bất kể bạn muốn chờ hay không",
      "Lãi vay margin cao hơn hẳn so với mọi hình thức vay tiêu dùng khác",
      "Cổ phiếu mua bằng margin không được nhận cổ tức trong thời gian còn nợ",
      "Công ty chứng khoán có quyền chọn thời điểm bán mà không cần báo trước",
    ],
    correctOption: 0,
    explanation:
      "Chín chặng trước đều dựa vào một điều: khi thị trường giảm, người có tài sản dài hạn có thể chờ. Margin xóa bỏ đúng quyền đó. Khi giá giảm tới mức tỷ lệ tài sản trên khoản vay xuống dưới ngưỡng, bạn phải nộp thêm tiền hoặc tài sản bị bán bớt - và điều này xảy ra khi thị trường đang giảm, tức khi giá đang thấp nhất. Bạn bị buộc hiện thực hóa khoản lỗ ở đúng thời điểm tệ nhất, và không có cách nào chờ tới lúc thị trường hồi phục. Lãi vay là chi phí có thật nhưng nó không phải điều làm margin khác về bản chất; việc mất quyền chờ mới là điều đó.",
    diagram: [
      { label: "Vay để mua nhiều cổ phiếu hơn", arrow: true },
      { label: "Giá giảm, tỷ lệ tài sản trên nợ tụt xuống", arrow: true },
      { label: "Phải nộp thêm tiền hoặc bị bán bớt", arrow: true },
      { label: "Bán ra ở đúng lúc giá thấp nhất" },
    ],
    realWorldExample: {
      company: "Hai người cùng một cổ phiếu, một đợt giảm",
      description:
        "Cả hai mua cùng một mã, và mã đó giảm mạnh rồi hồi phục sau vài tháng. Người mua bằng tiền của mình chờ qua đợt giảm và về bờ. Người dùng margin bị yêu cầu bổ sung ngay giữa đợt giảm, không xoay kịp tiền, và phần cổ phiếu bị bán ra ở vùng giá thấp. Cổ phiếu sau đó hồi phục - nhưng người thứ hai không còn nắm nó nữa. Cả hai đều đúng về doanh nghiệp; chỉ một người còn ở lại để chứng kiến điều đó.",
    },
    quiz: [
      {
        question: "Điều gì kích hoạt yêu cầu bổ sung tài sản?",
        options: [
          "Giá trị tài sản đảm bảo giảm khiến tỷ lệ so với khoản vay xuống dưới ngưỡng",
          "Khoản vay đến hạn trả theo lịch đã thỏa thuận từ khi giải ngân",
          "Nhà đầu tư thực hiện thêm giao dịch mua mới trong cùng tài khoản",
          "Doanh nghiệp phát hành công bố kết quả kinh doanh thấp hơn dự báo",
        ],
        correct: 0,
        explanation:
          "Nó phụ thuộc vào giá thị trường chứ không vào lịch trả nợ. Nghĩa là thời điểm nó xảy ra nằm ngoài tầm kiểm soát của bạn, và nó luôn rơi vào lúc thị trường đang xấu.",
      },
      {
        question:
          "Bạn có 100 triệu, vay thêm 100 triệu để mua 200 triệu cổ phiếu. Cổ phiếu giảm 25% thì vốn của bạn còn bao nhiêu?",
        options: [
          "50 triệu (= 150 triệu tài sản còn lại trừ 100 triệu nợ)",
          "75 triệu (= 100 triệu vốn ban đầu giảm 25% giống cổ phiếu)",
          "150 triệu (= giá trị danh mục sau khi giảm, chưa trừ khoản vay)",
          "100 triệu (= vốn ban đầu, vì khoản lỗ tính vào phần tiền đã vay)",
        ],
        correct: 0,
        explanation:
          "Cổ phiếu giảm 25% nhưng vốn của bạn giảm 50% - đó chính là đòn bẩy. Khoản nợ không giảm theo giá cổ phiếu, nên toàn bộ mức giảm dồn vào phần vốn của bạn.",
      },
      {
        question: "Vì sao yêu cầu bổ sung thường xuất hiện vào thời điểm tệ nhất?",
        options: [
          "Vì nó kích hoạt khi giá giảm, tức đúng lúc bán ra là bất lợi nhất",
          "Vì công ty chứng khoán chọn thời điểm thị trường yếu để thu hồi vốn",
          "Vì nhà đầu tư thường hết tiền mặt vào các tháng cuối năm tài chính",
          "Vì quy định yêu cầu rà soát tài khoản vay vào cuối mỗi quý một lần",
        ],
        correct: 0,
        explanation:
          "Không có ai chọn thời điểm cả - cơ chế tự động gắn với giá. Nhưng chính vì nó gắn với giá, nó chắc chắn kích hoạt khi giá thấp, và đó là định nghĩa của thời điểm tệ nhất để bán.",
      },
      {
        question: "Margin ảnh hưởng thế nào tới khả năng chờ đợi của nhà đầu tư?",
        options: [
          "Nó xóa bỏ khả năng chờ, vốn là lợi thế lớn nhất của nhà đầu tư cá nhân",
          "Nó không ảnh hưởng vì nhà đầu tư vẫn tự quyết định thời điểm bán ra",
          "Nó tăng khả năng chờ vì bạn có thêm vốn để mua trung bình giá xuống",
          "Nó chỉ ảnh hưởng khi khoản vay vượt quá một nửa giá trị danh mục",
        ],
        correct: 0,
        explanation:
          "Nhà đầu tư cá nhân không bị áp lực báo cáo theo quý và không phải giải trình với ai - nên họ có thể chờ lâu hơn hầu hết tổ chức. Margin đổi chính lợi thế ấy lấy sức mua ngắn hạn.",
      },
      {
        question: "Khi nào margin có thể hợp lý?",
        options: [
          "Rất hiếm với nhà đầu tư cá nhân; nếu dùng thì phải có sẵn tiền để bổ sung",
          "Khi bạn tin chắc về một cổ phiếu và muốn tối đa hóa lợi nhuận từ nó",
          "Khi thị trường đang trong xu hướng tăng rõ ràng và ổn định nhiều tháng",
          "Khi lãi suất vay margin thấp hơn tỷ suất cổ tức của cổ phiếu định mua",
        ],
        correct: 0,
        explanation:
          "Tin chắc là cảm giác, và thị trường không có nghĩa vụ đồng ý với bạn trong ngắn hạn. Xu hướng tăng ổn định cũng không ngăn được một đợt giảm mạnh vài phiên - và chỉ cần vài phiên là đủ để kích hoạt yêu cầu bổ sung.",
      },
    ],
    keyTakeaways: [
      "Đòn bẩy nhân cả lãi lẫn lỗ trên phần vốn của bạn, không phải trên giá cổ phiếu",
      "Yêu cầu bổ sung gắn với GIÁ nên nó luôn kích hoạt khi thị trường đang xấu",
      "Điều nguy hiểm nhất là mất quyền chờ đợi, không phải mức lỗ lớn hơn",
      "Khả năng chờ là lợi thế lớn nhất của nhà đầu tư cá nhân - margin đổi nó lấy sức mua",
    ],
    practicePrompt: {
      question:
        "Công ty chứng khoán mời bạn dùng margin với lãi suất ưu đãi ba tháng đầu. Nên nghĩ gì?",
      options: [
        "Lãi suất không phải rủi ro chính; rủi ro là bị buộc bán khi giá giảm",
        "Ưu đãi ba tháng là cơ hội tốt để thử nghiệm đòn bẩy với chi phí thấp",
        "Nên dùng nếu bạn tự tin sẽ bán ra trước khi hết thời gian ưu đãi",
        "Nên dùng với tỷ lệ nhỏ vì rủi ro tỷ lệ thuận với số tiền đã vay",
      ],
      correct: 0,
      explanation:
        "Chương trình ưu đãi hướng sự chú ý vào chi phí, mà chi phí là phần dễ tính và ít nguy hiểm nhất. Kế hoạch bán ra trước một mốc thời gian giả định thị trường sẽ hợp tác đúng lịch của bạn - điều nó không có nghĩa vụ làm.",
    },
    summary: {
      keyIdea: "Margin không chỉ nhân khoản lỗ, nó tước mất quyền chờ đợi đúng lúc bạn cần nó nhất",
      commonMistake: "Đánh giá margin qua lãi suất vay thay vì qua cơ chế buộc bán khi giá giảm",
      action: "Nếu đang dùng margin, tính xem giá phải giảm bao nhiêu thì bạn bị yêu cầu bổ sung.",
    },
    application: {
      title: "Tính ngưỡng của chính bạn",
      message:
        "Nếu bạn đang dùng hoặc định dùng margin, hỏi công ty chứng khoán mức giá nào sẽ kích hoạt yêu cầu bổ sung, và bạn có sẵn khoản tiền đó không. Nếu câu trả lời thứ hai là không, tỷ lệ vay đang quá cao.",
      secondary:
        "Với phần lớn nhà đầu tư cá nhân, câu trả lời đơn giản hơn: không dùng. Chín chặng trước không có chặng nào cần tới đòn bẩy để đạt mục tiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Margin là công cụ được chào mời nhiều nhất và giải thích ít nhất. Cơ chế của nó không phức tạp, nhưng hệ quả thì khác hẳn những gì lời chào mời gợi ra.",
      },
      { type: "heading", text: "Đòn bẩy nhân lên phần vốn của bạn" },
      {
        type: "paragraph",
        text: "Vay một khoản bằng đúng vốn tự có nghĩa là mỗi phần trăm biến động của cổ phiếu tác động gấp đôi lên phần vốn của bạn. Cổ phiếu tăng 25% thì vốn của bạn tăng 50%; cổ phiếu giảm 25% thì vốn giảm 50%. Khoản nợ không co giãn theo giá, nên toàn bộ biến động dồn vào phần thuộc về bạn. Đây là phép tính ai cũng làm được, và nó vẫn chưa phải phần nguy hiểm nhất.",
      },
      {
        type: "conceptTable",
        title: "Ba hệ quả, xếp theo mức nguy hiểm",
        subtitle: "Phần lớn lời chào mời chỉ nói về hàng đầu tiên",
        concepts: [
          {
            vi: "Lãi vay",
            en: "Interest cost",
            def: "Chi phí có thật nhưng tính được trước và biết chắc. Đây là phần ít nguy hiểm nhất, và cũng là phần được nói tới nhiều nhất.",
          },
          {
            vi: "Lỗ được nhân lên",
            en: "Amplified loss",
            def: "Tính được bằng một phép nhân đơn giản. Nguy hiểm hơn lãi vay, nhưng vẫn nằm trong tầm dự liệu nếu bạn chịu tính.",
          },
          {
            vi: "Bị buộc bán",
            en: "Forced liquidation",
            def: "Nguy hiểm nhất vì nó xảy ra ngoài ý muốn và luôn ở vùng giá thấp. Nó biến một khoản lỗ tạm thời thành khoản lỗ vĩnh viễn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lợi thế lớn nhất của bạn là thời gian, và margin bán nó đi",
        text: "Nhà đầu tư cá nhân không phải báo cáo kết quả theo quý, không có khách hàng rút vốn, không ai bắt giải trình một khoản lỗ tạm thời. Nghĩa là bạn có thể chờ lâu hơn gần như mọi tổ chức trên thị trường - và chờ được là điều kiện để phần lớn chiến lược dài hạn hoạt động. Margin đổi chính lợi thế đó lấy sức mua trong hôm nay.",
      },
      {
        type: "closing",
        lines: [
          "Công cụ nguy hiểm nhất trên thị trường không phải công cụ khiến bạn lỗ nhiều nhất, mà là công cụ chọn hộ bạn thời điểm bán.",
          "Bài cuối chặng: gộp tám bài thành một kế hoạch cho lệnh đầu tiên.",
        ],
      },
    ],
  },
  {
    id: 338,
    slug: "doc-bang-gia-dien-tu",
    title: "Chặng 14, Bài 9: Đọc bảng giá điện tử",
    subtitle: "Màn hình đầy số và màu, nhưng chỉ vài cột thật sự cần cho một quyết định",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🖥️",
    track: "personal",
    whyItMatters:
      "Bảng giá là thứ đầu tiên người mới nhìn thấy và cũng là thứ dễ gây choáng nhất. Phần lớn thông tin trên đó không cần cho một quyết định đầu tư dài hạn, và biết cột nào đáng nhìn giúp bạn không bị cuốn vào dòng số liệu thay đổi từng giây.",
    openingQuestion: "Cột nào trên bảng giá quan trọng nhất khi bạn định đặt một lệnh mua?",
    openingOptions: [
      "Giá và khối lượng đang chào bán ở các mức gần nhất",
      "Mức thay đổi phần trăm so với giá tham chiếu đầu phiên",
      "Tổng khối lượng đã khớp của mã đó tính từ đầu phiên",
      "Giá cao nhất và thấp nhất mà mã đó đã đạt trong phiên",
    ],
    correctOption: 0,
    explanation:
      "Bên chào bán cho bạn biết bạn sẽ mua được ở mức nào và với khối lượng bao nhiêu - đó chính là thông tin quyết định lệnh của bạn khớp ra sao, như bài về loại lệnh đã nói. Mức thay đổi phần trăm cho biết tâm lý phiên nhưng không nói gì về việc lệnh của bạn sẽ khớp thế nào. Tổng khối lượng khớp là thước đo thanh khoản hữu ích khi chọn mã nhưng không quyết định lệnh cụ thể. Giá cao nhất thấp nhất trong phiên là thông tin đã xảy ra rồi. Với người đầu tư dài hạn, phần lớn bảng giá là tiếng ồn và chỉ vài cột thật sự cần.",
    diagram: [
      { label: "Bên chào mua và chào bán: lệnh sẽ khớp thế nào", arrow: true },
      { label: "Tổng khối lượng khớp: mã này có thanh khoản không", arrow: true },
      { label: "Giá tham chiếu và biên độ: khung dao động của phiên", arrow: true },
      { label: "Phần còn lại phần lớn là tiếng ồn với người dài hạn" },
    ],
    realWorldExample: {
      company: "Nhìn màn hình cả ngày và nhìn ba cột",
      description:
        "Một người mở bảng giá từ sáng tới chiều, theo dõi từng nhịp tăng giảm và ra quyết định theo cảm giác của phiên. Một người khác mở bảng giá vài phút trước khi đặt lệnh, xem đúng ba thứ - giá đang chào bán, khối lượng ở các mức gần nhất, và tổng khối lượng khớp - rồi đóng lại. Người thứ hai bỏ lỡ mọi biến động trong ngày, và đó chính là điều họ muốn.",
    },
    quiz: [
      {
        question: "Tổng khối lượng khớp trong phiên nói lên điều gì?",
        options: [
          "Mức độ thanh khoản của mã, tức bạn dễ hay khó mua bán khối lượng lớn",
          "Xu hướng giá của mã đó trong các phiên giao dịch tiếp theo",
          "Số lượng nhà đầu tư đang nắm giữ cổ phiếu của doanh nghiệp đó",
          "Mức độ hấp dẫn của doanh nghiệp so với các doanh nghiệp cùng ngành",
        ],
        correct: 0,
        explanation:
          "Khối lượng là thước đo mức độ dễ ra vào, và nó quan trọng nhất khi bạn định mua một khoản lớn hoặc khi cần bán mà không muốn tự đẩy giá xuống.",
      },
      {
        question: "Vì sao ba mức giá chào bán gần nhất lại đáng xem trước khi đặt lệnh?",
        options: [
          "Vì chúng cho biết lệnh của bạn sẽ khớp ở đâu nếu vượt quá khối lượng mức đầu",
          "Vì chúng dự báo mức giá mà cổ phiếu sẽ đạt tới trong phiên tiếp theo",
          "Vì công ty chứng khoán tính phí khác nhau cho từng mức giá khớp lệnh",
          "Vì chỉ ba mức đó mới được phép khớp trong phiên giao dịch liên tục",
        ],
        correct: 0,
        explanation:
          "Đây là ứng dụng trực tiếp của bài về lệnh thị trường. Khối lượng ở mức tốt nhất thường nhỏ hơn người ta tưởng, và phần lệnh vượt quá nó sẽ khớp ở các mức kém hơn.",
      },
      {
        question: "Với nhà đầu tư dài hạn, phần lớn thông tin trên bảng giá có vai trò gì?",
        options: [
          "Ít vai trò, vì nó mô tả biến động trong ngày chứ không mô tả doanh nghiệp",
          "Vai trò quyết định, vì mọi quyết định đầu tư đều dựa trên giá thị trường",
          "Vai trò cảnh báo sớm, vì biến động ngày thường báo trước xu hướng dài hạn",
          "Vai trò xác nhận, vì nó cho biết các nhà đầu tư khác đang nghĩ gì về mã đó",
        ],
        correct: 0,
        explanation:
          "Quyết định dài hạn dựa trên doanh nghiệp và trên giá so với giá trị, không dựa trên nhịp tăng giảm của một phiên. Nhìn bảng giá cả ngày chủ yếu làm tăng số lần bạn muốn hành động.",
      },
      {
        question: "Màu xanh và đỏ trên bảng giá thể hiện điều gì?",
        options: [
          "Giá hiện tại đang cao hơn hay thấp hơn giá tham chiếu của phiên",
          "Doanh nghiệp đang có lãi hay đang lỗ trong kỳ báo cáo gần nhất",
          "Khối lượng mua đang lớn hơn hay nhỏ hơn khối lượng bán trong phiên",
          "Mã đó đang được khuyến nghị mua hay khuyến nghị bán bởi công ty chứng khoán",
        ],
        correct: 0,
        explanation:
          "Màu chỉ so với giá tham chiếu đầu phiên, một mốc hoàn toàn kỹ thuật. Một mã màu xanh vẫn có thể đang thấp hơn nhiều so với giá của tháng trước.",
      },
      {
        question: "Thói quen nào lành mạnh nhất với bảng giá?",
        options: [
          "Mở khi cần đặt lệnh hoặc rà soát định kỳ, không mở suốt phiên",
          "Mở suốt phiên để nắm bắt mọi cơ hội xuất hiện trong ngày",
          "Chỉ mở vào cuối phiên để xem giá đóng cửa của các mã đang nắm",
          "Không bao giờ mở và chỉ dựa vào báo cáo tài chính của doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "Không bao giờ mở thì không đặt được lệnh và không rà soát được danh mục. Vấn đề không phải bảng giá mà là tần suất: nhìn liên tục làm tăng số quyết định, và mỗi quyết định đều tốn phí.",
      },
    ],
    keyTakeaways: [
      "Bên chào mua bán quyết định lệnh của bạn khớp thế nào - đó là cột đáng xem nhất",
      "Tổng khối lượng khớp đo thanh khoản, quan trọng khi mua bán khối lượng lớn",
      "Màu xanh đỏ chỉ so với giá tham chiếu đầu phiên, một mốc kỹ thuật",
      "Với người dài hạn, tần suất nhìn bảng giá quan trọng hơn kỹ năng đọc nó",
    ],
    practicePrompt: {
      question:
        "Bạn định mua 10.000 cổ phiếu nhưng khối lượng chào bán ở mức giá tốt nhất chỉ có 2.000. Nên làm gì?",
      options: [
        "Đặt lệnh giới hạn và chấp nhận khớp dần, hoặc chia lệnh theo các mức giá",
        "Đặt lệnh thị trường cho toàn bộ 10.000 để mua xong trong một lần",
        "Hủy ý định mua vì thanh khoản mã này quá thấp để tham gia",
        "Chờ tới phiên đóng cửa vì khối lượng thường tăng mạnh vào cuối phiên",
      ],
      correct: 0,
      explanation:
        "Lệnh thị trường cho toàn bộ sẽ ăn qua nhiều mức và đẩy giá khớp trung bình lên cao. Đây chính là tình huống mà bài về loại lệnh mô tả, và bảng giá cho bạn thấy nó trước khi bấm.",
    },
    summary: {
      keyIdea: "Chỉ vài cột trên bảng giá thật sự cần cho một quyết định; phần còn lại là tiếng ồn",
      commonMistake: "Mở bảng giá suốt phiên, khiến số quyết định tăng lên trong khi thông tin thì không",
      action: "Xác định ba cột bạn thật sự dùng, và chỉ mở bảng giá khi có việc cụ thể.",
    },
    application: {
      title: "Ba cột và một thói quen",
      message:
        "Trước lệnh tiếp theo, chỉ xem: khối lượng chào bán ở ba mức gần nhất, tổng khối lượng khớp, và giá tham chiếu. Đặt lệnh xong thì đóng bảng giá lại.",
      secondary:
        "Nếu thấy khó đóng lại, đó là dấu hiệu bảng giá đang phục vụ nhu cầu theo dõi chứ không phục vụ quyết định nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng giá điện tử hiển thị hàng nghìn con số cập nhật liên tục. Với người giao dịch chuyên nghiệp, gần như mọi con số đều có ích. Với người đầu tư dài hạn, chỉ vài cột là đủ.",
      },
      { type: "heading", text: "Ba nhóm thông tin" },
      {
        type: "conceptTable",
        title: "Cột nào trả lời câu hỏi nào",
        subtitle: "Ghép đúng câu hỏi với cột giúp bỏ qua phần còn lại",
        concepts: [
          {
            vi: "Bên chào mua và chào bán",
            en: "Order book",
            def: "Trả lời: lệnh của tôi sẽ khớp ở mức nào. Đây là cột duy nhất ảnh hưởng trực tiếp tới giá bạn trả.",
          },
          {
            vi: "Tổng khối lượng khớp",
            en: "Volume",
            def: "Trả lời: mã này có dễ mua bán không. Quan trọng khi khoản của bạn lớn so với thanh khoản thường ngày.",
          },
          {
            vi: "Giá tham chiếu, trần, sàn",
            en: "Reference & limits",
            def: "Trả lời: phiên hôm nay dao động trong khung nào. Màu xanh đỏ chỉ so với giá tham chiếu, một mốc kỹ thuật.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Mọi cột còn lại - giá cao nhất thấp nhất trong phiên, khối lượng theo từng nhóm nhà đầu tư, các chỉ báo kỹ thuật kèm theo - đều mô tả những gì đã xảy ra trong ngày. Chúng thú vị, và chúng không đổi được câu trả lời cho câu hỏi doanh nghiệp này có đáng sở hữu trong năm năm tới hay không.",
      },
      {
        type: "callout",
        label: "Vấn đề không phải đọc bảng giá, mà là tần suất mở nó",
        text: "Mỗi lần nhìn thấy giá đổi là một lần não gợi ý hành động. Với cấu trúc chi phí đã nói ở bài 4 - phí hai chiều cộng thuế trên giá trị bán - mỗi hành động thừa đều tốn tiền thật. Nhà đầu tư dài hạn nhìn bảng giá ít hơn không phải vì lười mà vì đó là cách bảo vệ chính chiến lược của họ.",
      },
      {
        type: "closing",
        lines: [
          "Bảng giá được thiết kế cho người giao dịch liên tục; bạn không có nghĩa vụ dùng nó theo cách đó.",
          "Bài cuối chặng: gộp chín bài thành một kế hoạch cho lệnh đầu tiên.",
        ],
      },
    ],
  },
  {
    id: 339,
    slug: "ke-hoach-dau-tu-dau-tien",
    title: "Chặng 14, Bài 10: Tổng kết - kế hoạch cho lệnh đầu tiên",
    subtitle: "Chín bài trước là cơ chế; bài này là thứ tự việc cần làm trước khi bấm mua",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    whyItMatters:
      "Biết cơ chế không đủ để bắt đầu, vì bắt đầu đòi hỏi một thứ tự. Phần lớn người mới đi thẳng từ mở tài khoản tới mua mã ai đó vừa nhắc tới, bỏ qua toàn bộ phần quyết định khoản tiền này là gì và chiến lược nào hợp với mình.",
    openingQuestion: "Việc nào nên làm TRƯỚC khi chọn mã cổ phiếu đầu tiên?",
    openingOptions: [
      "Xác định khoản tiền này là tiền dài hạn và bạn chịu được mức giảm bao nhiêu",
      "Tìm mã đang được nhiều người quan tâm nhất để không bỏ lỡ xu hướng",
      "Đọc báo cáo phân tích của vài công ty chứng khoán về các mã tiềm năng",
      "Học các chỉ báo kỹ thuật để xác định điểm mua vào thuận lợi nhất",
    ],
    correctOption: 0,
    explanation:
      "Cả ba phương án còn lại đều là việc chọn mã, và chúng chỉ có nghĩa sau khi đã trả lời hai câu trước đó. Khoản tiền này có phải tiền dài hạn không - vì cổ phiếu có thể giảm sâu và ở dưới lâu, nên tiền cần dùng trong hai năm không thuộc về đây. Và bạn chịu được mức giảm bao nhiêu mà không bán - vì câu trả lời quyết định tỷ trọng cổ phiếu trong danh mục, chứ không quyết định mã nào. Người bỏ qua hai câu này thường phát hiện câu trả lời thật của mình vào giữa một đợt giảm, và phát hiện theo cách đắt nhất.",
    diagram: [
      { label: "Tiền này có phải tiền dài hạn không", arrow: true },
      { label: "Chịu được mức giảm bao nhiêu mà không bán", arrow: true },
      { label: "Chọn cách tham gia: quỹ hay từng mã", arrow: true },
      { label: "Giờ mới tới chọn mã và đặt lệnh" },
    ],
    realWorldExample: {
      company: "Lệnh đầu tiên của hai người",
      description:
        "Người thứ nhất mua mã mà đồng nghiệp vừa nhắc, bằng khoản tiền đang để dành sửa nhà cuối năm. Ba tháng sau thị trường giảm, và người này phải bán lỗ vì tới hạn sửa nhà. Người thứ hai xác định đây là tiền chưa dùng tới trong nhiều năm, chọn một quỹ chỉ số, đặt lệnh nhỏ đầu tiên để làm quen quy trình. Cả hai đều đã bắt đầu; chỉ một người còn ở lại sau đợt giảm đầu tiên.",
    },
    quiz: [
      {
        question: "Vì sao câu hỏi về khung thời gian phải đến trước câu hỏi chọn mã?",
        options: [
          "Vì cổ phiếu có thể giảm sâu và ở dưới lâu, nên tiền cần dùng sớm không thuộc về đây",
          "Vì mã cổ phiếu tốt chỉ dành cho nhà đầu tư có kế hoạch trên năm năm",
          "Vì công ty chứng khoán yêu cầu khai báo thời gian đầu tư dự kiến ngay khi mở tài khoản",
          "Vì thuế suất giảm dần theo thời gian nắm giữ cổ phiếu của nhà đầu tư",
        ],
        correct: 0,
        explanation:
          "Đây là ràng buộc mạnh nhất và nó loại bỏ luôn nhiều trường hợp. Không mã nào đủ tốt để bù cho việc bạn buộc phải bán vào đúng đợt giảm vì cần tiền.",
      },
      {
        question: "Với người mới hoàn toàn, cách tham gia nào thường hợp lý hơn?",
        options: [
          "Quỹ mô phỏng chỉ số, vì nó đa dạng hóa sẵn và không đòi hỏi kỹ năng chọn mã",
          "Chọn ba tới năm mã bluechip để vừa học cách phân tích vừa đầu tư thật",
          "Mã có thanh khoản cao nhất thị trường vì dễ mua bán khi cần",
          "Chia đều tiền cho mười mã khác nhau để phân tán rủi ro tối đa",
        ],
        correct: 0,
        explanation:
          "Chia đều cho mười mã với số vốn nhỏ sẽ vướng lô tối thiểu và trả phí mười lần. Chọn mã là kỹ năng cần thời gian xây, và không có lý do gì phải học nó bằng toàn bộ số vốn ngay từ đầu.",
      },
      {
        question: "Lệnh đầu tiên nên có quy mô thế nào?",
        options: [
          "Nhỏ, đủ để học quy trình mà kết quả không ảnh hưởng tới tài chính của bạn",
          "Bằng toàn bộ số vốn dự định để không bỏ lỡ mức giá hiện tại",
          "Bằng khoảng một nửa số vốn, giữ nửa còn lại để mua khi giá giảm",
          "Đủ lớn để phần lãi bù được phí giao dịch của cả hai chiều mua và bán",
        ],
        correct: 0,
        explanation:
          "Lệnh đầu tiên có mục đích học chứ không có mục đích kiếm lời: xem tiền bị trừ thế nào, cổ phiếu về khi nào, giao diện báo gì. Giữ một nửa để chờ giá giảm là một dạng dự đoán thị trường trá hình.",
      },
      {
        question: "Điều gì nên được viết ra trước khi mua?",
        options: [
          "Lý do mua và điều kiện khiến bạn sẽ bán, để đọc lại khi thị trường biến động",
          "Mức giá mục tiêu chính xác mà bạn dự đoán cổ phiếu sẽ đạt tới",
          "Danh sách các mã dự phòng để chuyển sang nếu mã đầu tiên không tăng giá",
          "Lịch trình mua bán cụ thể theo từng tuần cho cả năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Trí nhớ về lý do mua bị chính biến động giá viết lại - giá giảm thì lý do cũ tự nhiên trông yếu đi. Một ghi chép ngắn viết lúc đầu óc bình tĩnh là thứ duy nhất chống lại điều đó.",
      },
      {
        question: "Sai lầm phổ biến nhất ở lệnh đầu tiên là gì?",
        options: [
          "Dùng tiền sẽ cần tới trong thời gian ngắn để mua tài sản dài hạn",
          "Chọn quỹ chỉ số thay vì tự chọn mã nên bỏ lỡ cơ hội học hỏi",
          "Đặt lệnh quá nhỏ nên phí giao dịch chiếm tỷ trọng lớn trong khoản đầu tư",
          "Không dùng đòn bẩy nên bỏ lỡ phần lợi nhuận mà vốn vay có thể mang lại",
        ],
        correct: 0,
        explanation:
          "Đây là sai lầm duy nhất trong danh sách có thể buộc bạn hiện thực hóa khoản lỗ. Ba phương án còn lại chỉ làm kết quả kém tối ưu chứ không ép bạn phải bán vào lúc tệ nhất.",
      },
    ],
    keyTakeaways: [
      "Hai câu hỏi đầu tiên là về khoản tiền và về bản thân bạn, không phải về mã nào",
      "Tiền cần dùng trong vài năm không thuộc về thị trường cổ phiếu",
      "Lệnh đầu tiên nên nhỏ và nhằm học quy trình chứ không nhằm kiếm lời",
      "Viết ra lý do mua trước khi mua - biến động giá sẽ viết lại trí nhớ của bạn",
    ],
    practicePrompt: {
      question:
        "Bạn có 50 triệu chưa dùng tới trong năm năm và muốn bắt đầu. Bước đầu tiên hợp lý nhất?",
      options: [
        "Chọn một quỹ chỉ số, đặt lệnh nhỏ để làm quen, rồi tăng dần theo kế hoạch",
        "Chia 50 triệu cho năm mã bluechip để bắt đầu ngay với một danh mục đa dạng",
        "Mua toàn bộ vào một quỹ để tối đa hóa thời gian số tiền ở trong thị trường",
        "Chờ tới khi thị trường giảm mạnh rồi mới giải ngân toàn bộ một lần",
      ],
      correct: 0,
      explanation:
        "Chờ thị trường giảm là dự đoán thời điểm, và nó thường kết thúc bằng việc đứng ngoài nhiều năm. Mua toàn bộ ngay thì đúng về mặt lý thuyết nhưng bỏ qua giá trị của việc học quy trình bằng một khoản nhỏ trước.",
    },
    summary: {
      keyIdea: "Thứ tự đúng: khoản tiền này là gì, bạn chịu được gì, cách tham gia nào, rồi mới tới mã nào",
      commonMistake: "Đi thẳng từ mở tài khoản tới mua mã ai đó vừa nhắc, bằng khoản tiền sắp phải dùng",
      action: "Trước lệnh đầu tiên, viết ra khung thời gian của khoản tiền và mức giảm bạn chịu được.",
    },
    application: {
      title: "Một trang giấy trước lệnh đầu tiên",
      message:
        "Viết bốn dòng: khoản tiền này chưa dùng tới trong bao lâu, tôi chịu được mức giảm bao nhiêu phần trăm mà không bán, tôi tham gia qua quỹ hay từng mã, và vì sao tôi chọn cái đó.",
      secondary:
        "Giữ tờ giấy ấy. Lần đầu thị trường giảm mạnh, nó là thứ duy nhất còn nhớ được bạn đã nghĩ gì lúc đầu óc bình tĩnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước giải thích cơ chế: mở tài khoản, đặt lệnh, thanh toán, phí thuế, chỉ số, quỹ, cổ tức, margin, bảng giá. Bài này sắp chúng thành thứ tự để bạn thật sự bắt đầu được.",
      },
      { type: "heading", text: "Hai câu hỏi không liên quan gì tới thị trường" },
      {
        type: "paragraph",
        text: "Khoản tiền này chưa dùng tới trong bao lâu, và bạn chịu được mức giảm bao nhiêu mà không bán. Cả hai đều nói về bạn chứ không nói về cổ phiếu nào, và cả hai đều phải trả lời trước. Câu thứ nhất quyết định bạn có nên tham gia thị trường cổ phiếu không; câu thứ hai quyết định tỷ trọng. Người bỏ qua chúng vẫn mua được, chỉ là họ sẽ tìm ra câu trả lời thật của mình vào giữa một đợt giảm.",
      },
      {
        type: "list",
        items: [
          "Bước 1: xác nhận đây là tiền chưa dùng tới trong nhiều năm",
          "Bước 2: xác định mức giảm bạn chịu được, và từ đó ra tỷ trọng cổ phiếu",
          "Bước 3: chọn cách tham gia - quỹ chỉ số là điểm khởi đầu hợp lý với phần lớn người mới",
          "Bước 4: đặt lệnh nhỏ đầu tiên để học quy trình, rồi tăng dần theo kế hoạch",
        ],
      },
      {
        type: "callout",
        label: "Viết ra lý do trước khi mua",
        text: "Khi giá giảm ba mươi phần trăm, lý do bạn từng thấy thuyết phục sẽ tự nhiên trông yếu đi - đó là cách trí nhớ hoạt động dưới áp lực, và Chặng 10 về tâm lý đã mô tả cơ chế ấy. Một ghi chép ngắn viết lúc bình tĩnh là thứ duy nhất còn giữ được điều bạn đã nghĩ, và nó giúp phân biệt hai trường hợp rất khác nhau: luận điểm đã sai, hay chỉ là giá đang giảm.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 14. Bạn đã có đủ để đặt lệnh đầu tiên mà không phải hỏi ai.",
          "Và điều quan trọng nhất trong cả chặng lại không nằm ở thị trường: khoản tiền này là tiền gì.",
        ],
      },
    ],
  },
];
