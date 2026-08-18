import type { Lesson } from "./lesson-types";

// Chặng 12 của track cá nhân: ngân hàng, tiết kiệm và tiền gửi.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Track cá nhân dạy rất kỹ cổ phiếu (20 bài), trái
// phiếu (20 bài) và danh mục (22 bài), nhưng nơi mà gần như 100% người học
// Việt Nam thật sự để tiền - sổ tiết kiệm ngân hàng - thì không có bài nào.
// Kết quả là người học biết tính duration của trái phiếu nhưng không biết vì
// sao rút sổ trước hạn lại mất gần hết lãi, hay bảo hiểm tiền gửi bảo vệ tới
// đâu.
//
// Ids 310-319 nối tiếp Chặng 11 (300-309) trong dải 299-800 vốn trống.
// Id là VỊ TRÍ trong lộ trình chứ không phải số tự tăng - xem chú thích đầu
// lib/income-growth-lessons.ts để biết bảy nơi phải cập nhật cùng lúc.

export const PERSONAL_BANKING_LESSONS: Lesson[] = [
  {
    id: 310,
    slug: "gui-tiet-kiem-hoat-dong-the-nao",
    title: "Chặng 12, Bài 1: Tiến trình - chương trình đang chạy là gì",
    subtitle: "Mã nằm trên đĩa là tệp; mã đang chạy là tiến trình, và hai thứ đó khác nhau",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⚙️",
    track: "personal",
    whyItMatters:
      "Gần như mọi sự cố bạn sẽ gặp trên máy chủ đều quy về một câu hỏi: cái gì đang chạy, và nó đang ăn tài nguyên nào. Không phân biệt được tệp với tiến trình thì mọi lệnh chẩn đoán sau này chỉ là gõ theo trí nhớ.",
    openingQuestion: "Chạy cùng một chương trình hai lần thì hệ điều hành thấy gì?",
    openingOptions: [
      "Hai tiến trình riêng, mỗi cái có định danh và vùng nhớ riêng",
      "Một tiến trình duy nhất phục vụ cả hai lần chạy để tiết kiệm bộ nhớ",
      "Hai tệp thực thi được nhân bản ra trên đĩa rồi chạy độc lập với nhau",
      "Một tiến trình chính và một tiến trình phụ luôn phải chờ tiến trình chính",
    ],
    correctOption: 0,
    explanation:
      "Tệp thực thi nằm im trên đĩa cho tới khi được nạp vào bộ nhớ; lúc đó hệ điều hành tạo ra một tiến trình với định danh riêng, vùng nhớ riêng và bảng tệp đang mở riêng. Chạy lần thứ hai tạo tiến trình thứ hai, hoàn toàn độc lập - chúng chỉ tình cờ sinh ra từ cùng một tệp. Đây là lý do đóng cửa sổ terminal không nhất thiết dừng chương trình, và là lý do bạn có thể chạy hai phiên bản cùng lúc mà chúng không giẫm lên nhau. Nó cũng giải thích vì sao sửa tệp trên đĩa không đổi hành vi của tiến trình đang chạy: tiến trình đã cầm bản sao trong bộ nhớ từ lúc khởi động.",
    diagram: [
      { label: "Tệp thực thi nằm im trên đĩa", arrow: true },
      { label: "Nạp vào bộ nhớ thành một tiến trình", arrow: true },
      { label: "Mỗi tiến trình có PID và vùng nhớ riêng", arrow: true },
      { label: "Sửa tệp không đổi tiến trình đang chạy" },
    ],
    realWorldExample: {
      company: "Sửa mã rồi mà lỗi vẫn còn",
      description:
        "Một người mới sửa xong tệp cấu hình, tải lại trang, và lỗi cũ vẫn nguyên. Không phải sửa sai - tiến trình đã đọc cấu hình lúc khởi động và đang giữ bản cũ trong bộ nhớ. Khởi động lại tiến trình là xong. Đây là câu hỏi đầu tiên đáng hỏi mỗi khi một thay đổi có vẻ không có tác dụng.",
    },
    quiz: [
      {
        question: "PID dùng để làm gì?",
        options: [
          "Định danh một tiến trình để hệ điều hành và bạn nhắc tới đúng nó",
          "Đánh dấu thứ tự ưu tiên mà bộ lập lịch dùng khi chia thời gian CPU",
          "Ghi lại vị trí của tệp thực thi tương ứng trên ổ đĩa của máy",
          "Đếm số lần một chương trình đã được khởi động kể từ lúc bật máy",
        ],
        correct: 0,
        explanation:
          "PID chỉ là số định danh, được cấp khi tiến trình sinh ra và thu hồi khi nó kết thúc. Nó không nói gì về độ ưu tiên, cũng không gắn với vị trí tệp - hai tiến trình từ cùng một tệp có hai PID khác nhau.",
      },
      {
        question: "Vì sao sửa tệp cấu hình xong mà hành vi chưa đổi?",
        options: [
          "Vì tiến trình đã đọc cấu hình lúc khởi động và giữ bản cũ trong bộ nhớ",
          "Vì hệ điều hành lưu tệp vào bộ nhớ đệm và chỉ ghi xuống đĩa sau vài phút",
          "Vì tệp cấu hình phải được biên dịch lại trước khi chương trình đọc được",
          "Vì thay đổi chỉ có hiệu lực với những tiến trình được tạo ra sau đó một giờ",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả trực tiếp của việc tệp và tiến trình là hai thứ. Muốn tiến trình thấy cấu hình mới thì phải khởi động lại nó, hoặc chương trình phải tự hỗ trợ nạp lại - và phần lớn không tự hỗ trợ.",
      },
      {
        question: "Tiến trình nền khác tiến trình tiền cảnh ở điểm nào?",
        options: [
          "Tiến trình nền không giữ terminal nên bạn gõ lệnh khác được ngay",
          "Tiến trình nền được ưu tiên CPU cao hơn để chạy xong sớm hơn",
          "Tiến trình nền không ghi được gì ra tệp nhật ký của hệ thống",
          "Tiến trình nền tự dừng lại khi bạn đăng xuất khỏi phiên làm việc",
        ],
        correct: 0,
        explanation:
          "Khác biệt nằm ở chỗ ai đang giữ terminal, không ở quyền hạn hay ưu tiên. Còn chuyện dừng khi đăng xuất thì tuỳ cách khởi động: chạy nền thường vẫn chết theo phiên, nên mới cần công cụ giữ tiến trình sống độc lập.",
      },
      {
        question: "Lệnh xem tiến trình cho biết điều gì hữu ích nhất khi máy chậm?",
        options: [
          "Tiến trình nào đang chiếm nhiều CPU hoặc bộ nhớ nhất lúc này",
          "Tiến trình nào được khởi động sớm nhất kể từ lần bật máy gần nhất",
          "Tổng số tiến trình đang tồn tại trên máy tại thời điểm hiện tại",
          "Danh sách tệp thực thi có trong thư mục hệ thống của máy chủ",
        ],
        correct: 0,
        explanation:
          "Đúng nguyên tắc của Chặng 3: đo trước, đoán sau. Danh sách xếp theo mức tiêu thụ trả lời ngay câu hỏi ai đang ăn tài nguyên, và nó thường khác hẳn cái tên mà mọi người đang nghi.",
      },
      {
        question: "Kết thúc một tiến trình bằng tín hiệu nghĩa là gì?",
        options: [
          "Hệ điều hành gửi cho nó một thông điệp, và nó có thể dọn dẹp trước khi thoát",
          "Hệ điều hành xoá ngay tiến trình khỏi bộ nhớ mà không báo trước điều gì cho nó",
          "Tệp thực thi tương ứng bị đánh dấu không cho chạy lại lần nữa",
          "Toàn bộ tiến trình con của nó được chuyển sang chạy ở chế độ nền",
        ],
        correct: 0,
        explanation:
          "Tín hiệu dừng thông thường cho tiến trình cơ hội đóng tệp, ghi nốt nhật ký rồi thoát gọn. Có một tín hiệu buộc dừng ngay không cho dọn dẹp, và đó là lý do nó chỉ nên dùng khi cách nhẹ nhàng đã thất bại.",
      },
    ],
    keyTakeaways: [
      "Tệp nằm trên đĩa, tiến trình chạy trong bộ nhớ - hai thứ khác nhau",
      "Mỗi lần chạy tạo một tiến trình riêng với PID và vùng nhớ riêng",
      "Sửa tệp không đổi hành vi của tiến trình đang chạy, phải khởi động lại",
      "Máy chậm thì câu hỏi đầu tiên là tiến trình nào đang ăn tài nguyên",
    ],
    practicePrompt: {
      question:
        "Bạn sửa cấu hình rồi tải lại trang, nhưng hành vi cũ vẫn còn. Việc kiểm tra đầu tiên là gì?",
      options: [
        "Tiến trình đã được khởi động lại sau khi bạn sửa tệp hay chưa",
        "Tệp cấu hình đã được lưu xuống đĩa đúng định dạng hay chưa",
        "Trình duyệt có đang giữ bản cũ của trang trong bộ nhớ đệm không",
        "Quyền truy cập của tệp cấu hình có cho phép chương trình đọc không",
      ],
      correct: 0,
      explanation:
        "Ba khả năng kia đều có thật và đáng kiểm, nhưng chúng đứng sau. Nguyên nhân phổ biến nhất là tiến trình vẫn giữ cấu hình cũ trong bộ nhớ từ lúc khởi động - và cách kiểm nhanh nhất là khởi động lại rồi thử lại.",
    },
    summary: {
      keyIdea: "Chương trình trên đĩa và chương trình đang chạy là hai thực thể khác nhau",
      commonMistake: "Sửa tệp rồi kỳ vọng tiến trình đang chạy đổi theo ngay lập tức",
      action: "Mở lệnh xem tiến trình trên máy bạn, tìm PID của một chương trình bạn vừa mở.",
    },
    application: {
      title: "Ba câu hỏi khi có sự cố",
      message:
        "Cái gì đang chạy, nó ăn bao nhiêu tài nguyên, và nó khởi động từ lúc nào. Ba câu này trả lời được bằng đúng một lệnh xem tiến trình, và chúng loại được phần lớn giả thuyết sai ngay từ phút đầu.",
      secondary:
        "Chưa trả lời được ba câu đó thì mọi thay đổi tiếp theo đều là đoán, đúng cảnh báo của Chặng 3.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này đi vào phần bên dưới mọi thứ bạn đã dựng: hệ điều hành và mạng. Bài đầu tiên bắt đầu từ đơn vị nhỏ nhất mà bạn sẽ nhắc tới hằng ngày - một tiến trình.",
      },
      { type: "heading", text: "Tệp thì nằm im, tiến trình thì sống" },
      {
        type: "paragraph",
        text: "Một tệp thực thi chỉ là dãy byte trên đĩa. Khi bạn chạy nó, hệ điều hành cấp cho nó vùng nhớ, một định danh, một bảng tệp đang mở, rồi giao CPU cho nó theo lượt. Từ lúc đó, thứ đang chạy là một thực thể riêng - và nó không còn liên hệ gì với tệp gốc nữa cho tới lần khởi động sau.",
      },
      {
        type: "conceptTable",
        title: "Ba thứ mỗi tiến trình mang theo",
        subtitle: "Ba thứ này giải thích gần hết những chuyện lạ bạn sẽ gặp",
        concepts: [
          {
            vi: "Định danh tiến trình",
            en: "PID",
            def: "Số do hệ điều hành cấp lúc sinh ra, thu hồi lúc kết thúc. Hai lần chạy cùng một tệp cho hai PID khác nhau.",
          },
          {
            vi: "Vùng nhớ riêng",
            en: "Address space",
            def: "Mỗi tiến trình thấy bộ nhớ như của riêng mình. Đó là lý do một tiến trình sập không kéo theo tiến trình khác.",
          },
          {
            vi: "Bảng tệp đang mở",
            en: "File descriptors",
            def: "Danh sách tệp và kết nối mà tiến trình đang giữ. Xoá một tệp đang mở thì dung lượng chưa được giải phóng cho tới khi tiến trình đóng nó.",
          },
        ],
      },
      {
        type: "callout",
        label: "Khởi động lại là câu trả lời hợp lệ",
        text: "Câu đùa tắt đi bật lại che mất một sự thật kỹ thuật: rất nhiều trạng thái chỉ tồn tại trong bộ nhớ của tiến trình, nên khởi động lại đúng là cách hợp lệ để đưa nó về trạng thái đã biết. Điều đáng tránh không phải là khởi động lại, mà là khởi động lại xong không hỏi vì sao nó cần.",
      },
      {
        type: "closing",
        lines: [
          "Phân biệt được thứ nằm im với thứ đang chạy là bước đầu của mọi việc chẩn đoán.",
          "Bài sau: tệp, thư mục và quyền - ai được đọc, ai được ghi, và vì sao điều đó chặn được sự cố.",
        ],
      },
    ],
  },
  {
    id: 311,
    slug: "lai-suat-thuc-sau-lam-phat",
    title: "Chặng 12, Bài 2: Tập tin, thư mục và quyền truy cập",
    subtitle: "Ba nhóm, ba quyền, và một con số ba chữ số nói hết",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    whyItMatters:
      "Lỗi permission denied là lỗi bạn sẽ gặp nhiều nhất trong tuần đầu chạm vào máy chủ, và cũng là lỗi dễ chữa bằng cách sai nhất: cấp quyền cho tất cả cho xong. Hiểu ba nhóm và ba quyền mất mười phút, và tránh được lớp sự cố bảo mật phổ biến nhất.",
    openingQuestion: "Quyền của một tệp trên Linux được mô tả theo mấy nhóm?",
    openingOptions: [
      "Ba nhóm: chủ sở hữu, nhóm của tệp, và mọi người còn lại",
      "Hai nhóm: người tạo ra tệp và tất cả những người dùng khác",
      "Bốn nhóm: quản trị, chủ sở hữu, nhóm làm việc và khách vãng lai",
      "Một danh sách liệt kê từng người dùng kèm quyền riêng cho từng người",
    ],
    correctOption: 0,
    explanation:
      "Mô hình quyền cổ điển của Linux gọn tới mức đọc được bằng chín ký tự: ba nhóm nhân ba quyền. Ba nhóm là chủ sở hữu, nhóm của tệp, và những người còn lại. Ba quyền là đọc, ghi, thực thi. Con số ba chữ số quen thuộc chính là ba nhóm ấy viết dưới dạng nhị phân - mỗi chữ số là tổng của đọc bằng bốn, ghi bằng hai, thực thi bằng một. Với thư mục, ba quyền đó mang nghĩa hơi khác và đây là chỗ hay nhầm nhất: quyền thực thi trên thư mục nghĩa là được đi vào, còn quyền đọc chỉ là được liệt kê tên bên trong.",
    diagram: [
      { label: "Ba nhóm: chủ sở hữu, nhóm, còn lại", arrow: true },
      { label: "Ba quyền: đọc 4, ghi 2, thực thi 1", arrow: true },
      { label: "Cộng lại thành một chữ số cho mỗi nhóm", arrow: true },
      { label: "Với thư mục: thực thi nghĩa là đi vào được" },
    ],
    realWorldExample: {
      company: "Bản vá tệ nhất cho lỗi phổ biến nhất",
      description:
        "Một dịch vụ báo không đọc được tệp cấu hình, và cách chữa được chia sẻ nhiều nhất trên mạng là mở quyền cho tất cả. Nó chạy được ngay, và nó cũng vừa cho mọi tiến trình trên máy quyền ghi đè tệp đó. Cách đúng mất thêm một phút: đổi chủ sở hữu tệp sang đúng người dùng đang chạy dịch vụ, rồi giữ nguyên quyền hẹp.",
    },
    quiz: [
      {
        question: "Quyền thực thi trên một THƯ MỤC nghĩa là gì?",
        options: [
          "Được đi vào thư mục đó để truy cập tệp bên trong",
          "Được chạy mọi tệp thực thi nằm trong thư mục đó mà không cần quyền riêng",
          "Được tạo thêm tệp mới bên trong thư mục đó",
          "Được xem danh sách tên các tệp có trong thư mục",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ nhầm phổ biến nhất. Với thư mục, đọc là liệt kê được tên, còn thực thi là đi xuyên qua được. Có đọc mà không có thực thi thì bạn thấy tên tệp nhưng không mở được cái nào - một trạng thái trông rất khó hiểu cho tới khi biết quy tắc này.",
      },
      {
        question: "Con số 644 mô tả điều gì?",
        options: [
          "Chủ sở hữu đọc ghi, nhóm và người khác chỉ đọc",
          "Chủ sở hữu toàn quyền, nhóm đọc ghi, người khác không có quyền nào",
          "Cả ba nhóm đều đọc ghi được nhưng không ai thực thi được",
          "Chủ sở hữu chỉ đọc, còn nhóm và người khác đọc ghi thực thi",
        ],
        correct: 0,
        explanation:
          "Sáu là bốn cộng hai, tức đọc cộng ghi. Bốn là chỉ đọc. Đây là quyền mặc định hợp lý cho một tệp dữ liệu thường: người sở hữu sửa được, còn lại chỉ xem. Tệp thực thi mới cần thêm số một.",
      },
      {
        question: "Vì sao mở quyền cho tất cả là cách chữa tồi?",
        options: [
          "Vì mọi tiến trình trên máy đều ghi đè được tệp đó từ lúc ấy",
          "Vì hệ điều hành sẽ tự đặt lại quyền về mặc định sau một khoảng thời gian",
          "Vì tệp sẽ không còn sao lưu được bằng các công cụ thông thường nữa",
          "Vì quyền rộng làm chậm thao tác đọc ghi trên tệp đó một cách rõ rệt",
        ],
        correct: 0,
        explanation:
          "Nó chạy được vì đã bỏ mọi ràng buộc, chứ không phải vì đã sửa đúng nguyên nhân. Cách đúng là tìm xem tiến trình chạy dưới người dùng nào rồi cấp quyền cho đúng người dùng đó - hẹp nhất mà vẫn đủ việc.",
      },
      {
        question: "Chủ sở hữu và nhóm của một tệp quyết định điều gì?",
        options: [
          "Bộ quyền nào trong ba bộ sẽ áp dụng cho người đang truy cập",
          "Thứ tự mà hệ điều hành lưu tệp đó xuống ổ đĩa của máy chủ khi ghi",
          "Mức độ ưu tiên khi nhiều tiến trình cùng muốn ghi vào tệp",
          "Việc tệp có được đưa vào bản sao lưu định kỳ hay không",
        ],
        correct: 0,
        explanation:
          "Hệ điều hành kiểm theo thứ tự: bạn là chủ sở hữu thì áp bộ đầu; không phải nhưng thuộc nhóm thì áp bộ hai; còn lại thì áp bộ ba. Chỉ một bộ được áp dụng, nên chủ sở hữu bị hạn chế hơn người ngoài là chuyện có thật và hoàn toàn hợp lệ.",
      },
      {
        question: "Nguyên tắc nên theo khi cấp quyền là gì?",
        options: [
          "Hẹp nhất mà vẫn đủ để dịch vụ chạy được đúng việc của nó",
          "Rộng sẵn để tránh phải sửa lại khi thêm tính năng về sau",
          "Giống hệt quyền của thư mục cha để cả cây nhất quán với nhau",
          "Luôn cấp quyền thực thi để tệp có thể chạy khi cần dùng tới",
        ],
        correct: 0,
        explanation:
          "Đặc quyền tối thiểu là nguyên tắc mà mọi phần bảo mật còn lại dựa lên. Rộng sẵn cho tương lai nghe tiện, nhưng tương lai đó thường không tới, còn quyền rộng thì ở lại - và không ai nhớ để thu hẹp.",
      },
    ],
    keyTakeaways: [
      "Ba nhóm nhân ba quyền, đọc bằng 4, ghi bằng 2, thực thi bằng 1",
      "Với thư mục, thực thi là đi vào được, còn đọc chỉ là liệt kê tên",
      "Chỉ MỘT bộ quyền được áp dụng, theo thứ tự chủ sở hữu, nhóm, còn lại",
      "Chữa lỗi quyền bằng cách mở cho tất cả là bỏ ràng buộc, không phải sửa nguyên nhân",
    ],
    practicePrompt: {
      question:
        "Dịch vụ báo không đọc được tệp cấu hình. Việc nên làm là gì?",
      options: [
        "Xem dịch vụ chạy dưới người dùng nào, rồi cấp quyền cho đúng người dùng đó",
        "Mở quyền đọc cho tất cả mọi người để chắc chắn dịch vụ đọc được tệp đó",
        "Chuyển tệp cấu hình sang thư mục gốc của hệ thống cho dễ truy cập",
        "Chạy dịch vụ dưới quyền quản trị để nó đọc được mọi tệp trên máy",
      ],
      correct: 0,
      explanation:
        "Ba cách kia đều làm lỗi biến mất và đều nới quyền rộng hơn mức cần. Cách đầu tốn thêm một lệnh để biết tiến trình chạy dưới người dùng nào, rồi cấp đúng chừng ấy quyền - và đó là khác biệt giữa sửa nguyên nhân với che triệu chứng.",
    },
    summary: {
      keyIdea: "Quyền Linux là ba nhóm nhân ba quyền, và chỉ một nhóm được áp dụng cho mỗi lượt truy cập",
      commonMistake: "Chữa lỗi quyền bằng cách mở rộng cho tất cả thay vì cấp đúng cho người dùng của dịch vụ",
      action: "Xem quyền của một tệp trên máy bạn và đọc thành lời chín ký tự đó nói gì.",
    },
    application: {
      title: "Đọc chín ký tự thành câu",
      message:
        "Với mỗi tệp quan trọng trên máy chủ, đọc quyền của nó thành một câu: ai sửa được, ai chỉ xem được, ai không chạm được. Nếu câu trả lời cho vế cuối là không có ai, thì quyền đang rộng hơn mức cần.",
      secondary:
        "Cùng nguyên tắc đặc quyền tối thiểu mà bạn sẽ gặp lại ở bài tường lửa và bài SSH.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về thứ đang chạy. Bài này nói về thứ nó đọc và ghi, và về quy tắc quyết định nó có được phép hay không.",
      },
      { type: "heading", text: "Chín ký tự nói hết" },
      {
        type: "paragraph",
        text: "Ba nhóm - chủ sở hữu, nhóm, còn lại - nhân với ba quyền - đọc, ghi, thực thi. Hệ điều hành kiểm theo thứ tự và chỉ áp đúng một bộ. Con số ba chữ số quen thuộc là cách viết gọn của chín ký tự đó, với đọc bằng bốn, ghi bằng hai, thực thi bằng một, cộng lại cho mỗi nhóm.",
      },
      {
        type: "conceptTable",
        title: "Ba quyền, hai nghĩa khác nhau",
        subtitle: "Cùng một chữ, nghĩa khác nhau giữa tệp và thư mục",
        concepts: [
          {
            vi: "Đọc",
            en: "Read",
            def: "Với tệp: xem nội dung. Với thư mục: liệt kê được tên bên trong, nhưng chưa chắc mở được cái nào.",
          },
          {
            vi: "Ghi",
            en: "Write",
            def: "Với tệp: sửa nội dung. Với thư mục: tạo, đổi tên và xoá tệp bên trong - kể cả tệp bạn không sở hữu.",
          },
          {
            vi: "Thực thi",
            en: "Execute",
            def: "Với tệp: chạy được. Với thư mục: đi xuyên qua được. Đây là chỗ gây nhầm nhiều nhất trong ba dòng này.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quyền ghi trên thư mục mạnh hơn bạn tưởng",
        text: "Xoá một tệp không cần quyền ghi trên chính tệp đó - nó cần quyền ghi trên THƯ MỤC chứa nó, vì xoá là sửa danh sách của thư mục. Đây là lý do một thư mục mở quyền ghi rộng nguy hiểm hơn nhiều so với một tệp mở quyền ghi rộng, và là chi tiết mà rất nhiều người chỉ phát hiện sau khi mất dữ liệu.",
      },
      {
        type: "closing",
        lines: [
          "Đặc quyền tối thiểu không phải khẩu hiệu bảo mật, nó là cách đọc chín ký tự này cho đúng.",
          "Bài sau: cổng và dịch vụ đang lắng nghe - máy chủ của bạn đang mở những cửa nào.",
        ],
      },
    ],
  },
  {
    id: 312,
    slug: "rut-tiet-kiem-truoc-han",
    title: "Chặng 12, Bài 3: Cổng và dịch vụ đang lắng nghe",
    subtitle: "Một máy chủ có 65.535 cửa, và bạn nên biết chính xác cửa nào đang mở",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🚪",
    track: "personal",
    whyItMatters:
      "Câu hỏi vì sao gọi vào không được và câu hỏi vì sao máy này bị chiếm đều quy về cùng một thứ: cổng nào đang mở và ai mở nó. Đây là phần bạn sẽ dùng mỗi lần triển khai, và cũng là phần lộ ra nhiều nhất khi bị rà quét.",
    openingQuestion: "Cổng trong mạng máy tính dùng để làm gì?",
    openingOptions: [
      "Phân biệt nhiều dịch vụ cùng chạy trên một địa chỉ IP",
      "Giới hạn tốc độ tối đa mà một dịch vụ được phép truyền dữ liệu",
      "Mã hoá dữ liệu trước khi nó rời khỏi máy chủ để đi ra Internet",
      "Đánh số thứ tự các gói tin để bên nhận ghép lại đúng thứ tự ban đầu",
    ],
    correctOption: 0,
    explanation:
      "Địa chỉ IP đưa gói tin tới đúng máy, còn cổng đưa nó tới đúng chương trình trên máy đó. Nhờ vậy một máy chủ chạy được đồng thời web ở cổng 443, cơ sở dữ liệu ở 5432 và SSH ở 22 mà không lẫn nhau. Cổng là một số mười sáu bit, nên có 65.535 cổng, và một tiến trình muốn nhận kết nối phải chủ động lắng nghe trên một cổng cụ thể. Điểm quan trọng với người vận hành: mỗi cổng đang lắng nghe là một lối vào, nên danh sách cổng mở chính là danh sách bề mặt tấn công của máy đó - và nó phải ngắn hơn bạn nghĩ.",
    diagram: [
      { label: "IP đưa gói tin tới đúng máy", arrow: true },
      { label: "Cổng đưa nó tới đúng tiến trình", arrow: true },
      { label: "Tiến trình phải chủ động lắng nghe", arrow: true },
      { label: "Mỗi cổng mở là một lối vào" },
    ],
    realWorldExample: {
      company: "Cơ sở dữ liệu mở ra Internet",
      description:
        "Một đội dựng máy chủ, cài cơ sở dữ liệu, để mặc định lắng nghe trên mọi giao diện mạng và quên đặt mật khẩu mạnh. Vài giờ sau có người rà quét trúng cổng đó. Không có lỗ hổng phần mềm nào bị khai thác - dịch vụ chỉ làm đúng việc nó được cấu hình để làm, là lắng nghe cho tất cả.",
    },
    quiz: [
      {
        question: "Lắng nghe trên 127.0.0.1 khác với lắng nghe trên 0.0.0.0 thế nào?",
        options: [
          "127.0.0.1 chỉ nhận kết nối từ chính máy đó, 0.0.0.0 nhận từ mọi giao diện",
          "127.0.0.1 nhanh hơn vì bỏ qua hẳn bước kiểm tra địa chỉ nguồn của gói tin",
          "0.0.0.0 chỉ dùng được cho các dịch vụ đã bật mã hoá bằng chứng chỉ",
          "Hai cách giống nhau, chỉ khác cách viết trong tệp cấu hình dịch vụ",
        ],
        correct: 0,
        explanation:
          "Đây là dòng cấu hình một chữ số quyết định dịch vụ của bạn có ra Internet hay không. Cơ sở dữ liệu và dịch vụ nội bộ gần như luôn nên nghe ở 127.0.0.1, rồi cho ứng dụng gọi qua đó - còn ra ngoài thì đi qua một lớp trung gian có kiểm soát.",
      },
      {
        question: "Vì sao nên biết danh sách cổng đang lắng nghe trên máy chủ?",
        options: [
          "Vì đó chính là danh sách lối vào mà người ngoài có thể thử",
          "Vì hệ điều hành giới hạn tổng số cổng được mở cùng lúc trên một máy",
          "Vì mỗi cổng đang mở chiếm một lượng bộ nhớ đáng kể của hệ thống",
          "Vì thứ tự mở cổng quyết định dịch vụ nào được ưu tiên băng thông",
        ],
        correct: 0,
        explanation:
          "Bề mặt tấn công là một khái niệm rất cụ thể ở đây: nó là danh sách bạn in ra bằng một lệnh. Mỗi dòng trong danh sách đó cần trả lời được hai câu - dịch vụ nào, và có thật sự cần cho người ngoài gọi vào không.",
      },
      {
        question: "Cổng 22, 80 và 443 thường tương ứng với gì?",
        options: [
          "SSH, HTTP và HTTPS",
          "HTTP, HTTPS và cơ sở dữ liệu",
          "SSH, cơ sở dữ liệu và bộ nhớ đệm",
          "HTTPS, SSH và dịch vụ gửi thư điện tử",
        ],
        correct: 0,
        explanation:
          "Đây là quy ước, không phải ràng buộc - bạn chạy web ở cổng 8080 hoàn toàn được. Nhưng quy ước có ích thật: người rà quét cũng biết chúng, nên đổi SSH sang cổng lạ giảm được nhiễu từ rà quét tự động, dù không thay được cho một cấu hình chặt.",
      },
      {
        question: "Kết nối bị từ chối và kết nối bị treo khác nhau ở đâu?",
        options: [
          "Từ chối nghĩa là tới được máy nhưng không ai nghe, treo thường là bị chặn",
          "Từ chối nghĩa là sai mật khẩu, còn treo nghĩa là sai địa chỉ IP",
          "Từ chối chỉ xảy ra với TCP, còn treo thì chỉ xảy ra với giao thức UDP",
          "Hai trạng thái này giống nhau, chỉ khác cách hệ điều hành hiển thị",
        ],
        correct: 0,
        explanation:
          "Phân biệt này tiết kiệm rất nhiều thời gian chẩn đoán. Bị từ chối là gói tin đã tới nơi và máy trả lời rằng không có ai lắng nghe. Bị treo cho tới khi hết giờ chờ thường nghĩa là có thứ gì đó nuốt gói tin trong im lặng - và tường lửa là nghi phạm đầu tiên.",
      },
      {
        question: "Nguyên tắc tốt khi mở cổng cho một dịch vụ mới là gì?",
        options: [
          "Chỉ mở cho đúng nguồn cần gọi tới, không mở cho toàn bộ Internet",
          "Mở rộng sẵn từ trước để tránh phải sửa lại khi có thêm máy chủ gọi vào",
          "Dùng cổng có số càng lớn càng tốt vì ít bị rà quét tự động hơn",
          "Mở kèm luôn một cổng dự phòng để chuyển sang khi cổng chính lỗi",
        ],
        correct: 0,
        explanation:
          "Vẫn là đặc quyền tối thiểu của bài trước, chuyển sang mạng. Đổi cổng sang số lạ chỉ giảm nhiễu chứ không phải biện pháp bảo vệ, vì một lần rà quét đầy đủ vẫn tìm ra - còn giới hạn nguồn được gọi thì chặn thật.",
      },
    ],
    keyTakeaways: [
      "IP đưa gói tin tới máy, cổng đưa nó tới đúng tiến trình trên máy đó",
      "Nghe ở 127.0.0.1 là chỉ trong máy; nghe ở 0.0.0.0 là ra cả Internet",
      "Danh sách cổng đang lắng nghe chính là bề mặt tấn công của máy chủ",
      "Bị từ chối là tới nơi mà không ai nghe; bị treo thường là đang bị chặn",
    ],
    practicePrompt: {
      question:
        "Bạn cài một cơ sở dữ liệu trên máy chủ để ứng dụng trên cùng máy dùng. Nên cấu hình nó lắng nghe ở đâu?",
      options: [
        "Ở 127.0.0.1, vì chỉ có tiến trình trên chính máy đó cần gọi tới",
        "Ở 0.0.0.0, để sau này thêm máy chủ ứng dụng thứ hai thì đỡ phải sửa",
        "Ở địa chỉ IP công khai của máy, kèm một mật khẩu thật dài và phức tạp",
        "Ở một cổng ngẫu nhiên trên 40000, vì người rà quét ít khi quét tới đó",
      ],
      correct: 0,
      explanation:
        "Nhu cầu hiện tại là trong cùng một máy, nên lối vào từ ngoài không cần tồn tại. Ba cách kia đều mở dịch vụ ra Internet rồi bù bằng mật khẩu hoặc bằng chỗ nấp - cả hai đều là lớp phòng thủ mỏng hơn nhiều so với việc đơn giản là không mở.",
    },
    summary: {
      keyIdea: "Cổng là cửa vào tiến trình, và danh sách cửa đang mở là bề mặt tấn công của máy chủ",
      commonMistake: "Để dịch vụ nội bộ lắng nghe trên mọi giao diện rồi bù bằng mật khẩu",
      action: "Liệt kê cổng đang lắng nghe trên một máy bạn quản, và giải thích được từng dòng.",
    },
    application: {
      title: "Danh sách cửa của bạn",
      message:
        "Với mỗi cổng đang lắng nghe, trả lời hai câu: dịch vụ nào đứng sau, và ai ở ngoài thật sự cần gọi vào. Dòng nào không trả lời được câu thứ hai thì nên đóng, hoặc chuyển về chỉ nghe trong máy.",
      secondary:
        "Danh sách này ngắn đi là bề mặt tấn công nhỏ đi - đo được bằng số dòng, không phải bằng cảm giác.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước ở trong máy. Từ bài này trở đi là phần nối máy đó với thế giới, và cổng là khái niệm đầu tiên phải nắm.",
      },
      { type: "heading", text: "Địa chỉ đưa tới máy, cổng đưa tới chương trình" },
      {
        type: "paragraph",
        text: "Một gói tin mang theo hai thứ để tới được đích: địa chỉ IP và số cổng. Địa chỉ chọn máy, cổng chọn tiến trình đang lắng nghe trên máy đó. Nhờ tách hai tầng như vậy mà một máy chủ phục vụ được nhiều dịch vụ cùng lúc, mỗi dịch vụ một cổng, không cần nhiều địa chỉ.",
      },
      {
        type: "conceptTable",
        title: "Ba trạng thái bạn sẽ gặp khi gọi vào một cổng",
        subtitle: "Ba trạng thái, ba nguyên nhân rất khác nhau",
        concepts: [
          {
            vi: "Kết nối được",
            en: "Open",
            def: "Có tiến trình đang lắng nghe và đường đi thông. Đây là trạng thái duy nhất mà dịch vụ của bạn hoạt động.",
          },
          {
            vi: "Bị từ chối",
            en: "Refused",
            def: "Gói tin tới được máy nhưng không có ai nghe ở cổng đó. Thường là dịch vụ chưa chạy, hoặc đang nghe ở địa chỉ khác.",
          },
          {
            vi: "Treo tới hết giờ",
            en: "Timeout",
            def: "Không có hồi đáp nào cả. Thường là tường lửa hoặc nhóm bảo mật mạng đang lặng lẽ vứt gói tin đi - bài sau nói kỹ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Một dòng cấu hình quyết định dịch vụ có ra Internet không",
        text: "Rất nhiều sự cố lộ dữ liệu không phải do lỗ hổng phần mềm, mà do một dịch vụ nội bộ được cấu hình nghe trên mọi giao diện. Nó chạy đúng như được bảo, và cái sai nằm ở chỗ nó được bảo sai. Trước khi thêm bất kỳ lớp bảo vệ nào, hãy hỏi dịch vụ này có cần nghe ra ngoài không - câu trả lời thường là không.",
      },
      {
        type: "closing",
        lines: [
          "Bề mặt tấn công nghe trừu tượng cho tới khi bạn in nó ra thành một danh sách cổng.",
          "Bài sau: tường lửa, và vì sao mặc định đúng luôn là chặn hết rồi mở từng cái.",
        ],
      },
    ],
  },
  {
    id: 313,
    slug: "bac-thang-tien-gui",
    title: "Chặng 12, Bài 4: Tường lửa - mặc định là chặn",
    subtitle: "Chặn hết rồi mở từng cái, chứ không phải mở hết rồi chặn dần",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧱",
    track: "personal",
    whyItMatters:
      "Hai cách cấu hình tường lửa nghe như nhau nhưng cho hai kết quả ngược nhau khi bạn quên một dòng. Chọn đúng mặc định ngay từ đầu là quyết định rẻ nhất trong toàn bộ phần bảo mật hạ tầng, và cũng là thứ khó sửa nhất khi đã chạy lâu.",
    openingQuestion: "Mặc định nào an toàn hơn cho một tường lửa?",
    openingOptions: [
      "Chặn hết, rồi mở đúng những gì cần - quên một dòng thì mất kết nối",
      "Cho hết, rồi chặn những gì nguy hiểm - quên một dòng thì vẫn chạy tốt",
      "Cho hết với cổng dưới 1024 và chặn hết với cổng còn lại phía trên",
      "Tuỳ theo môi trường: máy chủ thì cho hết, máy cá nhân thì chặn hết",
    ],
    correctOption: 0,
    explanation:
      "Khác biệt nằm ở chuyện gì xảy ra khi bạn quên. Với mặc định chặn, một dòng thiếu làm dịch vụ không kết nối được - bạn phát hiện trong vài phút, lúc đang triển khai, và sửa ngay. Với mặc định cho, một dòng thiếu để lại một cổng mở mà không ai biết, và thứ phát hiện ra nó thường không phải bạn. Nguyên tắc chung: chọn mặc định sao cho sai sót gây phiền toái nhìn thấy được, chứ không gây rủi ro im lặng. Đây cũng chính là đặc quyền tối thiểu của hai bài trước, lần này áp cho luồng mạng thay vì cho tệp.",
    diagram: [
      { label: "Mặc định chặn: quên → mất kết nối", arrow: true },
      { label: "Mặc định cho: quên → cổng mở âm thầm", arrow: true },
      { label: "Lỗi nhìn thấy được rẻ hơn lỗi im lặng", arrow: true },
      { label: "Nên chặn hết rồi mở từng cái" },
    ],
    realWorldExample: {
      company: "Hai đội, hai mặc định",
      description:
        "Đội A chặn hết rồi mở dần; trong tuần đầu họ gặp bốn lần dịch vụ không gọi được nhau, mỗi lần sửa mất năm phút. Đội B cho hết rồi chặn dần; tuần đầu của họ trôi qua êm ả, và ba tháng sau có người rà quét tìm ra một cổng quản trị chưa ai nhớ đã mở. Tổng thời gian đội A mất là hai mươi phút.",
    },
    quiz: [
      {
        question: "Vì sao mặc định chặn lại an toàn hơn?",
        options: [
          "Vì thiếu sót biểu hiện thành lỗi kết nối thấy ngay, không phải lỗ hổng im lặng",
          "Vì tường lửa xử lý luật chặn nhanh hơn luật cho phép nên máy chủ nhẹ hơn hẳn",
          "Vì luật chặn được ưu tiên áp dụng trước mọi luật cho phép trong bảng",
          "Vì mặc định chặn tự động ghi nhật ký còn mặc định cho thì không ghi",
        ],
        correct: 0,
        explanation:
          "Đây là cách chọn mặc định cho mọi hệ thống, không riêng tường lửa: đặt sao cho sai sót ngã về phía an toàn. Lỗi kết nối gây khó chịu nhưng lộ ra ngay; một cổng mở quên đóng thì im lặng cho tới lúc có người khác tìm thấy.",
      },
      {
        question: "Luật tường lửa thường nên giới hạn theo cái gì ngoài cổng?",
        options: [
          "Địa chỉ nguồn được phép gọi tới cổng đó",
          "Dung lượng tối đa mỗi gói tin được phép mang theo",
          "Thời điểm trong ngày mà cổng đó được phép hoạt động",
          "Số lượng kết nối mà mỗi tiến trình được mở cùng lúc",
        ],
        correct: 0,
        explanation:
          "Mở cổng cơ sở dữ liệu cho cả Internet và mở nó cho đúng dải địa chỉ của máy chủ ứng dụng là hai mức rủi ro rất khác nhau, dù cùng là mở một cổng. Giới hạn nguồn thường là dòng có giá trị nhất trong cả bảng luật.",
      },
      {
        question: "Vì sao gói tin bị tường lửa vứt đi lại gây treo thay vì báo lỗi?",
        options: [
          "Vì tường lửa không gửi phản hồi nào, nên bên gọi phải chờ hết giờ",
          "Vì tường lửa giữ gói tin lại rồi chuyển tiếp sau khi đã kiểm tra xong",
          "Vì giao thức TCP quy định mọi gói tin bị chặn đều phải thử lại ba lần",
          "Vì tường lửa gửi lại một gói tin báo lỗi nhưng bên gọi không hiểu nó",
        ],
        correct: 0,
        explanation:
          "Vứt im lặng là lựa chọn có chủ đích: nó không cho người rà quét biết ở đây có máy. Đổi lại, chính bạn cũng mất manh mối khi chẩn đoán - và đó là lý do phân biệt treo với bị từ chối ở bài trước lại tiết kiệm thời gian đến vậy.",
      },
      {
        question: "Nhóm bảo mật mạng của nhà cung cấp đám mây khác tường lửa trên máy thế nào?",
        options: [
          "Nó lọc trước khi gói tin tới máy, nên máy không hề thấy lưu lượng bị chặn",
          "Nó chỉ lọc được lưu lượng đi ra chứ không lọc được lưu lượng đi vào máy",
          "Nó thay thế hoàn toàn tường lửa trên máy nên không cần cấu hình thêm",
          "Nó chỉ áp dụng cho các máy chủ nằm trong cùng một vùng địa lý",
        ],
        correct: 0,
        explanation:
          "Hai lớp này chồng lên nhau chứ không thay thế nhau, và đó là điều tốt. Hệ quả thực tế khi chẩn đoán: gói tin bị chặn ở tầng đám mây thì trên máy bạn không thấy gì cả, kể cả trong nhật ký tường lửa - nên phải kiểm cả hai chỗ.",
      },
      {
        question: "Sau khi thêm một luật tường lửa, việc nên làm ngay là gì?",
        options: [
          "Thử kết nối thật từ đúng nguồn được phép và từ một nguồn không được phép",
          "Khởi động lại máy chủ để chắc chắn luật mới được nạp vào nhân hệ điều hành",
          "Xoá các luật cũ không dùng để bảng luật ngắn lại và chạy nhanh hơn",
          "Ghi lại luật vào tài liệu vận hành rồi chuyển sang công việc tiếp theo",
        ],
        correct: 0,
        explanation:
          "Thử cả hai chiều mới là phép thử thật: chiều thứ nhất chứng minh dịch vụ chạy được, chiều thứ hai chứng minh luật thực sự chặn. Bỏ chiều thứ hai là chỗ mà những luật viết sai vẫn trông như đang bảo vệ.",
      },
    ],
    keyTakeaways: [
      "Chọn mặc định sao cho sai sót gây lỗi thấy được, không gây rủi ro im lặng",
      "Giới hạn theo địa chỉ nguồn thường có giá trị hơn việc chọn số cổng",
      "Tường lửa vứt gói tin im lặng nên biểu hiện là treo, không phải báo lỗi",
      "Tường lửa trên máy và nhóm bảo mật đám mây là hai lớp chồng nhau, phải kiểm cả hai",
    ],
    practicePrompt: {
      question:
        "Bạn mở cổng cơ sở dữ liệu cho máy chủ ứng dụng gọi vào. Luật nên viết thế nào?",
      options: [
        "Cho phép đúng cổng đó, chỉ từ địa chỉ của máy chủ ứng dụng",
        "Cho phép đúng cổng đó từ mọi địa chỉ, rồi đặt mật khẩu thật mạnh",
        "Cho phép toàn bộ lưu lượng giữa hai máy để tránh thiếu cổng nào đó",
        "Cho phép cổng đó từ dải địa chỉ của cả nhà cung cấp đám mây đang dùng",
      ],
      correct: 0,
      explanation:
        "Hai chiều hẹp nhất cùng lúc: đúng một cổng, đúng một nguồn. Phương án cuối nghe hẹp nhưng dải của nhà cung cấp gồm cả máy của mọi khách hàng khác - một cách mở rộng mà rất nhiều người tưởng là đang thu hẹp.",
    },
    summary: {
      keyIdea: "Mặc định chặn biến thiếu sót thành lỗi thấy ngay thay vì lỗ hổng im lặng",
      commonMistake: "Mở cổng cho mọi địa chỉ rồi bù bằng mật khẩu mạnh ở tầng ứng dụng",
      action: "Với mỗi luật đang có, kiểm xem nó giới hạn nguồn hay đang mở cho tất cả.",
    },
    application: {
      title: "Đọc bảng luật thành câu",
      message:
        "Mỗi dòng luật nên đọc được thành: cho phép ai, gọi vào cổng nào, để làm gì. Dòng nào có vế đầu là tất cả mọi người thì cần một lý do viết ra được, chứ không phải một thói quen.",
      secondary:
        "Và sau mỗi lần sửa, thử cả hai chiều - từ nguồn được phép và từ nguồn không được phép.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước kết thúc ở danh sách cổng đang mở. Bài này nói về thứ quyết định ai được đi qua những cổng đó, và về một lựa chọn mặc định quan trọng hơn mọi luật cụ thể.",
      },
      { type: "heading", text: "Hai mặc định, hai kiểu sai sót" },
      {
        type: "paragraph",
        text: "Bảng luật tường lửa nào cũng phải trả lời câu hỏi: gói tin không khớp luật nào thì làm gì. Chọn cho qua thì hệ thống dễ chạy và sai sót ẩn đi. Chọn chặn thì bạn sẽ gặp vài lần mất kết nối trong lúc triển khai, và mỗi lần đều lộ ra ngay điều bạn quên. Cùng một lượng sai sót, hai kiểu hậu quả.",
      },
      {
        type: "conceptTable",
        title: "Ba tầng lọc mà một gói tin đi qua",
        subtitle: "Chẩn đoán sai chỗ thì sửa mãi không xong",
        concepts: [
          {
            vi: "Nhóm bảo mật đám mây",
            en: "Security group",
            def: "Lọc trước khi tới máy. Bị chặn ở đây thì máy chủ không thấy gì cả, kể cả trong nhật ký của chính nó.",
          },
          {
            vi: "Tường lửa trên máy",
            en: "Host firewall",
            def: "Lọc ngay trên máy chủ. Ghi nhật ký được, nên đây là chỗ đầu tiên xem khi kết nối bị treo mà tầng trên đã mở.",
          },
          {
            vi: "Địa chỉ dịch vụ lắng nghe",
            en: "Bind address",
            def: "Không phải tường lửa, nhưng chặn thật: dịch vụ nghe ở 127.0.0.1 thì mở cổng bao nhiêu cũng vô ích.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ba chỗ cùng chặn, một triệu chứng giống nhau",
        text: "Kết nối treo có thể do nhóm bảo mật, do tường lửa trên máy, hoặc do dịch vụ chỉ nghe trong máy. Ba nguyên nhân, cùng một biểu hiện. Thứ tự kiểm rẻ nhất là đi ngược từ trong ra: dịch vụ có nghe đúng địa chỉ không, tường lửa trên máy có mở không, rồi mới tới tầng đám mây.",
      },
      {
        type: "closing",
        lines: [
          "Mặc định tốt là mặc định biến sai sót của bạn thành thứ bạn nhìn thấy được.",
          "Bài sau: SSH, và vì sao khoá lại thay thế được mật khẩu.",
        ],
      },
    ],
  },
  {
    id: 314,
    slug: "chung-chi-tien-gui-vs-so-tiet-kiem",
    title: "Chặng 12, Bài 5: Chứng chỉ tiền gửi và sổ tiết kiệm khác nhau ở đâu",
    subtitle: "Lãi cao hơn vì bạn cam kết chặt hơn, không phải vì nó là sản phẩm tốt hơn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    whyItMatters:
      "Chứng chỉ tiền gửi thường được chào với mức lãi cao hơn sổ tiết kiệm cùng kỳ hạn, và người gửi dễ coi đó là lựa chọn hiển nhiên tốt hơn. Phần chênh lệch ấy là giá của một ràng buộc cụ thể, và biết ràng buộc đó là gì mới quyết định được nó có hợp với bạn không.",
    openingQuestion: "Vì sao chứng chỉ tiền gửi thường có lãi suất cao hơn sổ tiết kiệm cùng kỳ hạn?",
    openingOptions: [
      "Vì nó thường không cho rút trước hạn, nên ngân hàng có nguồn vốn chắc chắn hơn",
      "Vì nó được bảo hiểm tiền gửi bảo vệ ở mức cao hơn nhiều so với sổ tiết kiệm thường",
      "Vì nó chỉ dành cho khách hàng ưu tiên có số dư lớn tại ngân hàng đó",
      "Vì lãi của nó được trả trước ngay tại thời điểm mua thay vì khi đáo hạn",
    ],
    correctOption: 0,
    explanation:
      "Sổ tiết kiệm cho phép rút trước hạn, chỉ là bạn mất lãi. Nhiều loại chứng chỉ tiền gửi thì không cho rút trước hạn ở bất kỳ mức nào - muốn lấy tiền sớm thì phải chuyển nhượng cho người khác, và việc đó phụ thuộc có tìm được người mua hay không. Ràng buộc chặt hơn ấy cho ngân hàng nguồn vốn chắc chắn hơn, nên họ trả thêm. Về bảo hiểm tiền gửi thì hai loại được đối xử như nhau. Nói cách khác, phần lãi cao hơn không miễn phí - bạn trả bằng tính thanh khoản, và đó là thứ chỉ đáng đổi khi bạn chắc chắn không cần khoản tiền ấy.",
    diagram: [
      { label: "Sổ tiết kiệm: rút được, mất lãi", arrow: true },
      { label: "Chứng chỉ tiền gửi: thường không rút được", arrow: true },
      { label: "Ràng buộc chặt hơn đổi lấy lãi cao hơn", arrow: true },
      { label: "Chỉ hợp khi chắc chắn không cần dùng tới" },
    ],
    realWorldExample: {
      company: "Nửa điểm phần trăm và một cánh cửa khóa",
      description:
        "Một ngân hàng chào chứng chỉ tiền gửi 24 tháng ở 6,8% trong khi sổ tiết kiệm cùng kỳ hạn là 6,3%. Trên 500 triệu, chênh lệch là 2,5 triệu mỗi năm. Người mua chứng chỉ nhận thêm khoản đó, đổi lại nếu cần tiền ở tháng thứ mười thì không có cách nào tất toán - lựa chọn duy nhất là tìm người nhận chuyển nhượng, thường với giá thấp hơn.",
    },
    quiz: [
      {
        question: "Điểm khác biệt cốt lõi giữa hai sản phẩm là gì?",
        options: [
          "Khả năng lấy tiền ra trước hạn",
          "Mức bảo hiểm tiền gửi được áp dụng cho từng loại",
          "Việc lãi được trả theo tháng hay trả một lần khi đáo hạn",
          "Số tiền tối thiểu mà ngân hàng yêu cầu để mở sản phẩm",
        ],
        correct: 0,
        explanation:
          "Số tiền tối thiểu và cách trả lãi đúng là có khác nhau tùy đợt phát hành, nhưng đó là chi tiết. Thứ tạo ra chênh lệch lãi suất và quyết định sản phẩm nào hợp với bạn là tính thanh khoản.",
      },
      {
        question: "Bảo hiểm tiền gửi đối xử với hai sản phẩm này thế nào?",
        options: [
          "Như nhau, vì cả hai đều là tiền gửi của cá nhân tại tổ chức tham gia bảo hiểm",
          "Chứng chỉ tiền gửi được bảo vệ ở mức cao gấp đôi so với sổ tiết kiệm thông thường",
          "Chỉ sổ tiết kiệm được bảo vệ, chứng chỉ tiền gửi thì không thuộc phạm vi",
          "Cả hai đều không được bảo vệ nếu kỳ hạn dài hơn hai mươi bốn tháng",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận khiến người ta chọn sai lý do. Phần lãi cao hơn của chứng chỉ tiền gửi đến từ ràng buộc thanh khoản, không đến từ mức độ an toàn khác biệt nào.",
      },
      {
        question: "Muốn lấy tiền từ chứng chỉ tiền gửi trước hạn thì làm thế nào?",
        options: [
          "Chuyển nhượng cho người khác, và giá phụ thuộc vào việc có tìm được người mua",
          "Tất toán tại ngân hàng và nhận lãi suất không kỳ hạn như sổ tiết kiệm",
          "Yêu cầu ngân hàng mua lại theo đúng mệnh giá đã ghi trên chứng chỉ",
          "Dùng chứng chỉ đó làm tài sản thế chấp bắt buộc theo quy định của từng ngân hàng",
        ],
        correct: 0,
        explanation:
          "Một số ngân hàng có nhận cầm cố chứng chỉ để cho vay, nhưng đó là đi vay chứ không phải lấy tiền của mình ra. Chuyển nhượng là đường chính, và nó không đảm bảo về thời gian lẫn giá.",
      },
      {
        question:
          "Chênh lệch 0,5%/năm trên 400 triệu trong 2 năm tương đương bao nhiêu tiền?",
        options: [
          "Khoảng 4 triệu (= 400 triệu × 0,5% × 2 năm)",
          "Khoảng 2 triệu (= 400 triệu × 0,5%, tính cho một năm)",
          "Khoảng 40 triệu (= 400 triệu × 0,5% × 2, nhân nhầm bậc)",
          "Khoảng 400 nghìn (= 400 triệu × 0,5% chia cho bốn kỳ)",
        ],
        correct: 0,
        explanation:
          "Bốn triệu là con số thật đang được đem ra đổi lấy việc khóa tiền hai năm. Đặt cạnh câu hỏi bạn có chắc không cần 400 triệu trong hai năm không thì quyết định trở nên rõ ràng hơn nhiều.",
      },
      {
        question: "Chứng chỉ tiền gửi hợp lý nhất với ai?",
        options: [
          "Người có khoản tiền chắc chắn không dùng tới và đã có quỹ khẩn cấp riêng",
          "Người muốn có nơi cất tiền linh hoạt để rút ra bất cứ khi nào cần",
          "Người mới bắt đầu tiết kiệm và muốn tối đa hóa lãi ngay từ khoản đầu tiên",
          "Người đang cần một khoản dự phòng cho các chi phí y tế phát sinh",
        ],
        correct: 0,
        explanation:
          "Điều kiện tiên quyết là quỹ khẩn cấp đã nằm ở nơi rút được ngay. Khi đó khoản dư còn lại mới có thể chấp nhận bị khóa để đổi lấy phần lãi cao hơn.",
      },
    ],
    keyTakeaways: [
      "Chênh lệch lãi suất là giá của tính thanh khoản, không phải dấu hiệu sản phẩm tốt hơn",
      "Chứng chỉ tiền gửi thường không cho rút trước hạn - đường ra là chuyển nhượng",
      "Bảo hiểm tiền gửi áp dụng như nhau cho cả hai loại",
      "Chỉ hợp lý khi quỹ khẩn cấp đã nằm ở nơi khác và bạn chắc chắn không cần khoản này",
    ],
    practicePrompt: {
      question:
        "Bạn có 300 triệu, chưa có quỹ khẩn cấp, và được chào chứng chỉ tiền gửi 24 tháng lãi cao hơn 0,6%. Nên làm gì?",
      options: [
        "Tách quỹ khẩn cấp ra trước, phần còn lại mới cân nhắc chứng chỉ tiền gửi",
        "Mua chứng chỉ toàn bộ 300 triệu vì mức chênh lệch lãi suất là đáng kể",
        "Bỏ qua chứng chỉ vì sản phẩm không cho rút trước hạn luôn quá rủi ro",
        "Mua chứng chỉ rồi vay cầm cố chính nó nếu có việc cần tiền gấp",
      ],
      correct: 0,
      explanation:
        "Vay cầm cố để lấy lại tiền của chính mình là trả lãi vay cao hơn phần lãi gửi nhận được - một vòng lỗ. Thứ tự đúng luôn là quỹ khẩn cấp trước, tối ưu lãi suất sau.",
    },
    summary: {
      keyIdea: "Lãi cao hơn của chứng chỉ tiền gửi là tiền trả cho việc bạn từ bỏ quyền rút sớm",
      commonMistake: "Chọn theo mức lãi mà không hỏi lấy tiền ra bằng cách nào nếu có việc",
      action: "Trước khi mua chứng chỉ tiền gửi, kiểm xem quỹ khẩn cấp của bạn đã đủ và nằm ở nơi rút được ngay chưa.",
    },
    application: {
      title: "Hai câu hỏi trước khi ký",
      message:
        "Nếu cần tiền ở tháng thứ mười thì tôi lấy ra bằng cách nào, và tôi đã có quỹ khẩn cấp ở nơi khác chưa? Nếu câu đầu không có lời đáp rõ ràng, phần lãi cao hơn không bù được.",
      secondary:
        "Quy phần chênh lệch lãi suất ra tiền tuyệt đối cho cả kỳ hạn. Con số đó thường nhỏ hơn cảm giác mà mấy phần mười điểm phần trăm tạo ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi nhân viên ngân hàng chào một sản phẩm lãi cao hơn sổ tiết kiệm, câu hỏi đúng không phải cao hơn bao nhiêu mà là cao hơn để đổi lấy cái gì.",
      },
      { type: "heading", text: "Cùng là gửi tiền, khác ở một quyền" },
      {
        type: "paragraph",
        text: "Sổ tiết kiệm luôn cho bạn quyền lấy tiền ra - bài trước đã nói cái giá của quyền đó là gần hết tiền lãi, nhưng quyền vẫn tồn tại. Nhiều loại chứng chỉ tiền gửi bỏ hẳn quyền ấy: trước ngày đáo hạn, ngân hàng không tất toán ở bất kỳ mức lãi nào. Đường ra duy nhất là chuyển nhượng cho người khác, và nó phụ thuộc vào việc có ai muốn mua.",
      },
      {
        type: "conceptTable",
        title: "Đặt cạnh nhau",
        subtitle: "Khác biệt nằm gọn ở hàng đầu tiên",
        concepts: [
          {
            vi: "Lấy tiền trước hạn",
            en: "Early access",
            def: "Sổ tiết kiệm: được, mất lãi. Chứng chỉ tiền gửi: thường không, phải chuyển nhượng cho người khác.",
          },
          {
            vi: "Lãi suất",
            en: "Rate",
            def: "Chứng chỉ thường cao hơn vài phần mười tới nửa điểm phần trăm cho cùng kỳ hạn. Đó là giá của hàng trên.",
          },
          {
            vi: "Bảo hiểm tiền gửi",
            en: "Deposit insurance",
            def: "Như nhau. Đây là chỗ hay bị hiểu nhầm thành lý do chọn, trong khi nó không phân biệt hai sản phẩm.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quy phần chênh lệch ra tiền trước khi quyết định",
        text: "Nửa điểm phần trăm nghe như một khác biệt lớn, nhưng trên 200 triệu trong một năm nó là một triệu đồng. Đặt con số tuyệt đối ấy cạnh câu hỏi bạn có chắc chắn không cần khoản này trong hai năm không, và phần lớn trường hợp câu trả lời tự hiện ra.",
      },
      {
        type: "closing",
        lines: [
          "Sản phẩm trả cao hơn luôn lấy đi một thứ; việc của bạn là biết nó lấy gì.",
          "Bài sau: nếu ngân hàng gặp chuyện thì tiền của bạn được bảo vệ tới đâu.",
        ],
      },
    ],
  },
  {
    id: 315,
    slug: "bao-hiem-tien-gui-viet-nam",
    title: "Chặng 12, Bài 6: Bảo hiểm tiền gửi bảo vệ bạn tới đâu",
    subtitle: "Hạn mức tính trên mỗi người tại mỗi ngân hàng, và đó là chi tiết quyết định cách chia tiền",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Phần lớn người gửi tiền coi ngân hàng là an toàn tuyệt đối và không bao giờ hỏi tới hạn mức bảo vệ. Với số dư nhỏ thì điều đó không gây hậu quả gì, nhưng khi khoản tiết kiệm lớn dần, cách chia tiền giữa các ngân hàng trở thành một quyết định có thật.",
    openingQuestion: "Bảo hiểm tiền gửi ở Việt Nam chi trả theo nguyên tắc nào?",
    openingOptions: [
      "Theo từng cuốn sổ tiết kiệm, mỗi sổ được bảo vệ một hạn mức riêng biệt",
      "Theo mỗi người gửi tại mỗi tổ chức tham gia bảo hiểm tiền gửi",
      "Theo tổng số tiền một người gửi trên toàn bộ hệ thống ngân hàng",
      "Theo tỷ lệ phần trăm cố định trên số dư, không có mức trần tuyệt đối",
    ],
    correctOption: 1,
    explanation:
      "Hạn mức được tính cho mỗi người gửi tại mỗi tổ chức tham gia bảo hiểm tiền gửi, bao gồm cả gốc lẫn lãi. Chi tiết này quan trọng theo hai hướng. Mở nhiều sổ tại cùng một ngân hàng không làm tăng mức bảo vệ - chúng được cộng gộp lại thành một số dư duy nhất. Ngược lại, chia tiền sang một ngân hàng khác thì hạn mức được tính lại từ đầu ở nơi đó. Vì vậy khi khoản tiết kiệm vượt hạn mức, cách xử lý không phải mở thêm sổ mà là mở thêm quan hệ ở tổ chức khác.",
    diagram: [
      { label: "Cộng gộp mọi khoản gửi của bạn tại một ngân hàng", arrow: true },
      { label: "So tổng đó với hạn mức bảo hiểm", arrow: true },
      { label: "Phần vượt hạn mức không được bảo vệ", arrow: true },
      { label: "Chia sang ngân hàng khác để có hạn mức mới" },
    ],
    realWorldExample: {
      company: "Bốn cuốn sổ, một hạn mức",
      description:
        "Một người có bốn sổ tiết kiệm tại cùng một ngân hàng, mỗi sổ 200 triệu, và yên tâm rằng chia nhỏ như vậy là đã phân tán rủi ro. Thực tế cả bốn sổ được cộng gộp thành 800 triệu của một người gửi tại một tổ chức, và phần vượt hạn mức không được bảo hiểm chi trả. Chia nhỏ theo sổ giúp tránh phá sổ khi cần tiền, nhưng không tạo thêm lớp bảo vệ nào.",
    },
    quiz: [
      {
        question: "Mở nhiều sổ tại cùng một ngân hàng có làm tăng mức bảo vệ không?",
        options: [
          "Không, mọi khoản gửi của một người tại một tổ chức được cộng gộp lại",
          "Có, mỗi sổ tiết kiệm được tính là một khoản gửi độc lập với hạn mức riêng",
          "Có, nhưng chỉ khi các sổ có kỳ hạn khác nhau và mở ở các chi nhánh khác nhau",
          "Không, trừ khi các sổ được đứng tên cùng với một người đồng sở hữu khác",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận phổ biến vì việc chia sổ đúng là có ích cho chuyện khác - tránh phải phá cả khoản khi cần một phần. Nhưng về bảo hiểm tiền gửi, bốn sổ tại một ngân hàng vẫn là một người gửi tại một tổ chức.",
      },
      {
        question: "Hạn mức bảo hiểm tiền gửi bao gồm những gì?",
        options: [
          "Cả tiền gốc và tiền lãi phát sinh tính tới thời điểm chi trả",
          "Chỉ tiền gốc, phần lãi đã phát sinh không nằm trong phạm vi bảo vệ",
          "Chỉ phần lãi, vì tiền gốc đã được ngân hàng bảo đảm bằng tài sản riêng",
          "Cả gốc và lãi nhưng chỉ với các khoản gửi có kỳ hạn dưới mười hai tháng",
        ],
        correct: 0,
        explanation:
          "Vì lãi cũng được tính vào, một khoản gửi ban đầu nằm sát hạn mức có thể vượt qua nó sau vài kỳ tái tục mà chủ sổ không để ý.",
      },
      {
        question: "Cách xử lý đúng khi khoản tiết kiệm vượt hạn mức bảo hiểm là gì?",
        options: [
          "Chia phần vượt sang một ngân hàng khác để có hạn mức được tính lại từ đầu",
          "Chia thành nhiều sổ nhỏ hơn tại chính ngân hàng đang gửi hiện tại",
          "Chuyển sang chứng chỉ tiền gửi vì sản phẩm này có mức bảo vệ cao hơn",
          "Yêu cầu ngân hàng cấp văn bản cam kết hoàn trả toàn bộ số dư khi có sự cố",
        ],
        correct: 0,
        explanation:
          "Hạn mức gắn với cặp người gửi và tổ chức, nên biến duy nhất bạn thay đổi được là số tổ chức. Chia sổ hay đổi sản phẩm đều không chạm tới ràng buộc đó.",
      },
      {
        question: "Vì sao hạn mức bảo hiểm ít quan trọng với phần lớn người gửi?",
        options: [
          "Vì số dư tiết kiệm của đa số vẫn nằm dưới hạn mức nên được bảo vệ trọn vẹn",
          "Vì ngân hàng ở Việt Nam chưa từng gặp bất kỳ vấn đề nào về thanh khoản",
          "Vì nhà nước cam kết chi trả toàn bộ số dư cho mọi người gửi khi có sự cố",
          "Vì người gửi luôn được ưu tiên nhận tiền trước tất cả các chủ nợ khác",
        ],
        correct: 0,
        explanation:
          "Với số dư dưới hạn mức thì đây là chuyện không cần bận tâm. Nó chỉ trở thành quyết định thật khi khoản tiết kiệm lớn dần - và thời điểm ấy thường tới mà không ai để ý.",
      },
      {
        question: "Nhược điểm của việc chia tiền sang nhiều ngân hàng là gì?",
        options: [
          "Phải theo dõi nhiều nơi và có thể phải chấp nhận mức lãi thấp hơn ở vài chỗ",
          "Bảo hiểm tiền gửi giảm mức chi trả khi một người gửi ở quá nhiều tổ chức",
          "Ngân hàng thu phí duy trì quan hệ đối với khách hàng có số dư phân tán",
          "Số tiền gửi ở ngân hàng thứ hai trở đi không được tính lãi trong kỳ đầu",
        ],
        correct: 0,
        explanation:
          "Cái giá hoàn toàn nằm ở công sức và ở chỗ ngân hàng trả lãi cao nhất không phải lúc nào cũng còn chỗ trống trong hạn mức của bạn. Đó là đánh đổi giữa tiện lợi và mức độ an toàn.",
      },
    ],
    keyTakeaways: [
      "Hạn mức tính cho mỗi người gửi tại mỗi tổ chức, và bao gồm cả gốc lẫn lãi",
      "Nhiều sổ tại cùng một ngân hàng được cộng gộp - chia sổ không tăng mức bảo vệ",
      "Muốn tăng phần được bảo vệ thì phải tăng số tổ chức, không phải số sổ",
      "Với số dư dưới hạn mức thì đây không phải chuyện đáng bận tâm",
    ],
    practicePrompt: {
      question:
        "Khoản tiết kiệm của bạn đã vượt hạn mức bảo hiểm tại một ngân hàng. Bước hợp lý nhất là gì?",
      options: [
        "Chuyển phần vượt sang ngân hàng khác, cân nhắc cả mức lãi lẫn độ thuận tiện",
        "Tách thành nhiều sổ nhỏ tại chính ngân hàng đó cho an toàn hơn",
        "Rút toàn bộ phần vượt hạn mức ra giữ bằng tiền mặt tại nhà để tránh rủi ro",
        "Chuyển toàn bộ sang chứng chỉ tiền gửi của cùng ngân hàng đó",
      ],
      correct: 0,
      explanation:
        "Giữ tiền mặt ở nhà đổi một rủi ro nhỏ lấy một rủi ro lớn hơn hẳn: mất cắp, hỏa hoạn, và chắc chắn mất sức mua vì không có lãi nào. Chia sang tổ chức khác là cách duy nhất thật sự mở rộng phần được bảo vệ.",
    },
    summary: {
      keyIdea: "Hạn mức gắn với cặp người gửi và tổ chức - muốn được bảo vệ nhiều hơn thì tăng số tổ chức",
      commonMistake: "Chia thành nhiều sổ tại cùng một ngân hàng và tưởng như vậy là đã phân tán rủi ro",
      action: "Cộng toàn bộ số dư của bạn tại từng ngân hàng và so với hạn mức bảo hiểm hiện hành.",
    },
    application: {
      title: "Cộng theo ngân hàng, không theo sổ",
      message:
        "Liệt kê mọi khoản tiền gửi của bạn, nhóm theo ngân hàng rồi cộng lại. So từng tổng với hạn mức bảo hiểm tiền gửi hiện hành - đó mới là con số đang được bảo vệ.",
      secondary:
        "Nhớ tính cả phần lãi sẽ phát sinh. Một khoản gửi sát hạn mức hôm nay có thể vượt qua nó sau vài kỳ tái tục.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi nếu ngân hàng gặp chuyện thì sao nghe xa vời, và với phần lớn số dư thì đúng là xa vời. Nhưng nó trở thành câu hỏi thật khi khoản tiết kiệm lớn dần, và thời điểm ấy tới mà không có tín hiệu nào báo trước.",
      },
      { type: "heading", text: "Hạn mức gắn với cái gì" },
      {
        type: "paragraph",
        text: "Bảo hiểm tiền gửi chi trả theo mỗi người gửi tại mỗi tổ chức tham gia, tính cả gốc lẫn lãi. Hai hệ quả đi kèm. Thứ nhất, mọi khoản của bạn tại một ngân hàng - dù nằm ở bao nhiêu cuốn sổ, bao nhiêu chi nhánh - đều được cộng gộp thành một số dư. Thứ hai, cùng số tiền ấy đặt ở hai ngân hàng thì được tính hai hạn mức riêng biệt.",
      },
      {
        type: "callout",
        label: "Chia sổ và chia ngân hàng giải quyết hai bài toán khác nhau",
        text: "Bài trước khuyên chia thành nhiều sổ, và lời khuyên đó vẫn đúng - nhưng nó giải bài toán thanh khoản, tức tránh phải phá cả khoản khi chỉ cần một phần. Bảo hiểm tiền gửi là bài toán khác, và biến của nó là số tổ chức chứ không phải số sổ. Nhiều người làm đúng việc thứ nhất rồi tưởng đã làm luôn việc thứ hai.",
      },
      {
        type: "list",
        items: [
          "Cộng số dư theo từng ngân hàng, không theo từng sổ",
          "Tính cả phần lãi sẽ phát sinh cho tới ngày đáo hạn",
          "Phần vượt hạn mức là phần bạn đang tự chịu rủi ro - có thể chấp nhận, nhưng nên biết",
          "Chia sang tổ chức khác đổi lấy công theo dõi và đôi khi mức lãi thấp hơn một chút",
        ],
      },
      {
        type: "closing",
        lines: [
          "Với số dư nhỏ thì đây là chuyện không cần nghĩ tới; vấn đề là không ai báo cho bạn biết lúc nó thôi nhỏ.",
          "Bài sau: những khoản phí nhỏ trong tài khoản, và vì sao chúng cộng lại không nhỏ.",
        ],
      },
    ],
  },
  {
    id: 316,
    slug: "phi-ngan-hang-va-cach-khong-mat-oan",
    title: "Chặng 12, Bài 7: Phí ngân hàng - những khoản nhỏ cộng lại không nhỏ",
    subtitle: "Vài chục nghìn mỗi tháng là chuyện vặt; cùng khoản đó trong mười năm thì không",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Phí ngân hàng được thiết kế để không gây chú ý: mỗi khoản đủ nhỏ để không đáng gọi điện hỏi, và chúng bị trừ tự động nên không ai phải quyết định gì. Đó cũng chính là lý do chúng chạy nhiều năm liền mà chủ tài khoản không biết mình đang trả cho cái gì.",
    openingQuestion: "Vì sao phí ngân hàng thường bị bỏ qua dù người ta vẫn theo dõi chi tiêu?",
    openingOptions: [
      "Vì chúng bị trừ tự động và mỗi khoản đủ nhỏ để không lọt vào tầm chú ý",
      "Vì ngân hàng không có nghĩa vụ thông báo các khoản phí đã thu mỗi tháng",
      "Vì phí chỉ hiện trong sao kê giấy mà phần lớn khách hàng không đăng ký nhận",
      "Vì các khoản phí luôn được hoàn lại vào cuối năm nếu khách không khiếu nại",
    ],
    correctOption: 0,
    explanation:
      "Cơ chế khiến phí trở nên vô hình không phải sự che giấu - biểu phí được công bố và giao dịch đều hiện trong ứng dụng. Vấn đề là chúng không đòi hỏi quyết định nào: không có lúc nào bạn phải bấm đồng ý, không có hóa đơn nào để đối chiếu. Một khoản mười lăm nghìn mỗi tháng nằm dưới ngưỡng đáng bận tâm của gần như tất cả mọi người, và nó cứ chạy như vậy trong nhiều năm. Đây là cùng cơ chế với các khoản đăng ký dịch vụ mà bài Chặng 1 đã nói: chi phí thấp cộng với việc không phải quyết định lại bằng một khoản chi vĩnh viễn.",
    diagram: [
      { label: "Phí nhỏ, bị trừ tự động", arrow: true },
      { label: "Không có lúc nào phải quyết định lại", arrow: true },
      { label: "Chạy liên tục nhiều năm", arrow: true },
      { label: "Rà soát một lần, tiết kiệm nhiều năm" },
    ],
    realWorldExample: {
      company: "Ba khoản phí, mười năm",
      description:
        "Một tài khoản trả phí quản lý 11 nghìn, phí thông báo biến động số dư 11 nghìn và phí duy trì thẻ khoảng 8 nghìn mỗi tháng - tổng 30 nghìn, tức 360 nghìn một năm. Nghe không đáng kể. Nhưng nhiều ngân hàng đã miễn phần lớn các khoản này cho tài khoản mở mới hoặc khi đăng ký gói phù hợp, nên phần lớn số tiền ấy là khoản trả cho việc chưa từng rà soát lại.",
    },
    quiz: [
      {
        question: "Khoản phí nào thường xuất hiện mà chủ tài khoản ít để ý nhất?",
        options: [
          "Phí quản lý tài khoản và phí thông báo biến động số dư hằng tháng",
          "Phí chuyển khoản liên ngân hàng cho mỗi giao dịch phát sinh",
          "Phí phát hành thẻ khi mở tài khoản lần đầu tại ngân hàng",
          "Phí đổi mã PIN thẻ tại cây rút tiền tự động của ngân hàng khác",
        ],
        correct: 0,
        explanation:
          "Phí giao dịch gắn với một hành động cụ thể nên người ta nhìn thấy nó. Phí định kỳ thì không gắn với hành động nào - nó tự chạy, và vì thế nó là loại kéo dài lâu nhất.",
      },
      {
        question: "Cách rà soát phí hiệu quả nhất là gì?",
        options: [
          "Lọc sao kê mười hai tháng gần nhất theo các giao dịch do ngân hàng tự trừ",
          "Gọi tổng đài hỏi xem tài khoản của bạn đang chịu những loại phí nào",
          "So sánh biểu phí công bố của vài ngân hàng lớn để biết mặt bằng chung",
          "Kiểm tra số dư ở đầu tháng và ở cuối tháng để tìm ra phần chênh lệch bất thường",
        ],
        correct: 0,
        explanation:
          "Biểu phí cho biết mức có thể bị thu, sao kê cho biết mức thật sự đã bị thu - và hai thứ đó khác nhau vì nhiều khoản được miễn theo gói. Chỉ sao kê của chính bạn mới trả lời được câu hỏi bạn đang trả cái gì.",
      },
      {
        question: "30 nghìn phí mỗi tháng tương đương bao nhiêu trong mười năm?",
        options: [
          "Khoảng 3,6 triệu (= 30 nghìn × 12 tháng × 10 năm)",
          "Khoảng 360 nghìn (= 30 nghìn × 12 tháng, tính cho một năm)",
          "Khoảng 300 nghìn (= 30 nghìn × 10 năm, quên nhân số tháng)",
          "Khoảng 36 triệu (= 30 nghìn × 120 tháng, nhân sai một bậc)",
        ],
        correct: 0,
        explanation:
          "3,6 triệu chưa tính phần lãi mà số tiền đó lẽ ra sinh ra được. Con số không lớn tới mức đổi đời, nhưng nó là khoản gần như không cần đánh đổi gì để lấy lại.",
      },
      {
        question: "Vì sao nên kiểm tra phí sau khi ngân hàng thay đổi chính sách?",
        options: [
          "Vì gói miễn phí bạn đang hưởng có thể đổi điều kiện mà không cần bạn đồng ý",
          "Vì mọi thay đổi biểu phí đều phải được từng khách hàng ký xác nhận lại",
          "Vì ngân hàng sẽ tự động hoàn lại các khoản phí đã thu trong kỳ chuyển đổi",
          "Vì khách hàng có quyền yêu cầu giữ nguyên biểu phí cũ trong ba năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Điều kiện miễn phí thường gắn với số dư tối thiểu hoặc số giao dịch trong tháng, và cả hai đều có thể thay đổi. Bạn vẫn dùng tài khoản như cũ nhưng thôi đủ điều kiện, và khoản phí lặng lẽ quay lại.",
      },
      {
        question: "Khoản phí nào đáng giữ dù có thể bỏ?",
        options: [
          "Phí cho dịch vụ bạn thật sự dùng và sẽ chủ động trả tiền nếu được hỏi",
          "Phí duy trì mọi loại thẻ để giữ quan hệ tín dụng tốt với ngân hàng",
          "Phí quản lý tài khoản vì bỏ nó sẽ khiến tài khoản bị đóng tự động",
          "Phí thông báo biến động số dư, vì đây vốn là khoản bắt buộc theo quy định",
        ],
        correct: 0,
        explanation:
          "Phép thử đơn giản là nếu hôm nay ngân hàng hỏi bạn có muốn mua dịch vụ này với giá đó không, bạn có gật đầu không. Thông báo biến động số dư nhiều người sẽ gật vì nó giúp phát hiện giao dịch lạ; những khoản khác thì thường không.",
      },
    ],
    keyTakeaways: [
      "Phí vô hình vì nó không đòi hỏi quyết định nào, không phải vì nó bị che giấu",
      "Sao kê cho biết bạn đang trả gì; biểu phí chỉ cho biết bạn có thể bị thu gì",
      "Điều kiện miễn phí có thể đổi mà bạn không nhận ra vì cách dùng không đổi",
      "Giữ lại khoản phí cho dịch vụ bạn sẽ chủ động trả tiền nếu được hỏi lại",
    ],
    practicePrompt: {
      question:
        "Bạn phát hiện mình đang trả ba khoản phí định kỳ. Bước tiếp theo hợp lý nhất là gì?",
      options: [
        "Với từng khoản, hỏi xem có gói miễn phí nào phù hợp với cách bạn đang dùng không",
        "Đóng tài khoản hiện tại và mở tài khoản mới ở ngân hàng đang miễn phí",
        "Chấp nhận vì ba khoản đó cộng lại vẫn là con số nhỏ so với thu nhập hằng tháng của bạn",
        "Chuyển toàn bộ số dư sang ví điện tử để không phải chịu phí ngân hàng nữa",
      ],
      correct: 0,
      explanation:
        "Đóng và mở lại tài khoản kéo theo việc cập nhật thông tin nhận lương, các khoản thanh toán tự động và nhiều thứ khác - chi phí chuyển đổi thường lớn hơn khoản phí. Đổi gói tại chính ngân hàng đang dùng thường giải quyết được phần lớn mà không phải động tới thứ gì.",
    },
    summary: {
      keyIdea: "Phí ngân hàng kéo dài vì nó không bao giờ buộc bạn phải quyết định lại",
      commonMistake: "Bỏ qua vì mỗi khoản nhỏ, và không bao giờ cộng chúng lại theo năm",
      action: "Lọc sao kê mười hai tháng gần nhất, tìm mọi khoản do ngân hàng tự trừ và cộng lại.",
    },
    application: {
      title: "Một lần rà soát cho nhiều năm",
      message:
        "Mở sao kê mười hai tháng, tìm các giao dịch có nội dung phí hoặc do hệ thống tự trừ. Cộng lại theo năm rồi hỏi từng khoản: nếu được hỏi hôm nay, tôi có mua nó không?",
      secondary:
        "Việc này mất khoảng hai mươi phút và thường chỉ cần làm một lần, nhưng nó chặn được một dòng chi chạy nhiều năm.",
    },
    sections: [
      {
        type: "lead",
        text: "Không khoản phí nào trong bài này đủ lớn để đáng viết một bài riêng. Điều đáng viết là cơ chế khiến chúng tồn tại lâu tới vậy.",
      },
      { type: "heading", text: "Vì sao chúng sống lâu" },
      {
        type: "paragraph",
        text: "Một khoản chi chỉ bị xem xét lại khi có gì đó buộc bạn phải quyết định. Tiền nhà đòi bạn ký lại hợp đồng mỗi năm; gói cước điện thoại thỉnh thoảng hết hạn. Phí ngân hàng thì không có mốc nào như thế - nó được trừ tự động, không gửi hóa đơn, và mỗi lần trừ đều nhỏ hơn ngưỡng khiến người ta dừng lại để hỏi. Cơ chế ấy không có gì mờ ám, nhưng hệ quả của nó là một dòng chi chạy nhiều năm mà chưa bao giờ được duyệt lại.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm phí, xử lý khác nhau",
        subtitle: "Nhóm giữa là nơi có nhiều tiền nhất",
        concepts: [
          {
            vi: "Phí theo giao dịch",
            en: "Transaction fees",
            def: "Chuyển khoản, rút tiền ngoài hệ thống. Gắn với một hành động nên dễ thấy, và thường giảm được bằng cách đổi cách giao dịch.",
          },
          {
            vi: "Phí định kỳ",
            en: "Recurring fees",
            def: "Quản lý tài khoản, thông báo số dư, duy trì thẻ. Chạy tự động nên sống lâu nhất - đây là nhóm đáng rà soát trước.",
          },
          {
            vi: "Phí do sơ suất",
            en: "Penalty fees",
            def: "Chậm trả thẻ tín dụng, số dư dưới mức tối thiểu. Tránh được hoàn toàn bằng nhắc lịch, và mức phí thường cao hơn hai nhóm trên nhiều.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng đổi ngân hàng chỉ vì phí",
        text: "Chi phí chuyển đổi thật sự không nằm ở thủ tục mở tài khoản mà ở mọi thứ đang trỏ tới tài khoản cũ: nơi nhận lương, các khoản thanh toán tự động, thông tin đã khai ở nhiều nơi. Trong phần lớn trường hợp, đổi sang gói tài khoản khác tại chính ngân hàng đang dùng giải quyết được vấn đề với chi phí gần bằng không.",
      },
      {
        type: "closing",
        lines: [
          "Đây là loại tiền hiếm hoi lấy lại được mà không phải đánh đổi gì cả.",
          "Bài sau: ngân hàng số và ví điện tử - tiện tới đâu và rủi ro nằm ở chỗ nào.",
        ],
      },
    ],
  },
  {
    id: 317,
    slug: "ngan-hang-so-va-vi-dien-tu",
    title: "Chặng 12, Bài 8: Ngân hàng số và ví điện tử",
    subtitle: "Tiện lợi đổi lấy điều gì, và số dư trong ví có được bảo vệ như tiền gửi không",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📱",
    track: "personal",
    whyItMatters:
      "Ví điện tử và ngân hàng số đã thay thế phần lớn giao dịch tiền mặt hằng ngày, và người dùng thường coi số dư trong ví giống hệt tiền trong ngân hàng. Hai thứ đó khác nhau ở vài điểm quan trọng, và sự khác biệt chỉ lộ ra đúng vào lúc có chuyện.",
    openingQuestion: "Số dư trong ví điện tử khác tiền gửi ngân hàng ở điểm nào quan trọng nhất?",
    openingOptions: [
      "Ví điện tử không trả lãi và không phải là tiền gửi được bảo hiểm tiền gửi bảo vệ",
      "Ví điện tử bị giới hạn số tiền tối đa được nạp vào trong mỗi ngày sử dụng của người dùng",
      "Ví điện tử thu phí cho mọi giao dịch chuyển tiền giữa những người dùng",
      "Ví điện tử chỉ dùng được để thanh toán chứ không rút được ra tiền mặt",
    ],
    correctOption: 0,
    explanation:
      "Ví điện tử là dịch vụ trung gian thanh toán, không phải tổ chức nhận tiền gửi. Tiền của người dùng được giữ ở tài khoản đảm bảo tại ngân hàng, nên nó không biến mất, nhưng cơ chế bảo vệ không giống bảo hiểm tiền gửi và số dư không sinh lãi. Hạn mức giao dịch và phí đúng là có tồn tại nhưng khác nhau tùy nhà cung cấp và không phải điểm phân biệt cốt lõi. Kết luận thực dụng: ví điện tử là công cụ thanh toán rất tốt, và giữ số dư lớn trong đó là dùng sai mục đích - phần tiền nhàn rỗi thuộc về nơi vừa sinh lãi vừa được bảo hiểm tiền gửi bảo vệ.",
    diagram: [
      { label: "Ví điện tử: công cụ thanh toán", arrow: true },
      { label: "Không sinh lãi, không phải tiền gửi", arrow: true },
      { label: "Giữ số dư vừa đủ chi tiêu ngắn hạn", arrow: true },
      { label: "Phần nhàn rỗi để ở tiền gửi ngân hàng" },
    ],
    realWorldExample: {
      company: "Tiện tới mức quên rằng nó không sinh lãi",
      description:
        "Một người giữ thói quen để khoảng 30 triệu trong ví điện tử cho tiện thanh toán hằng ngày. Số tiền đó không sinh đồng lãi nào; cùng khoản ấy trong sổ tiết kiệm 6% cho khoảng 1,8 triệu mỗi năm. Ví vẫn là công cụ tốt cho phần chi tiêu trong tuần - vấn đề chỉ là quy mô số dư nằm lại trong đó.",
    },
    quiz: [
      {
        question: "Ví điện tử giữ tiền người dùng ở đâu?",
        options: [
          "Ở tài khoản đảm bảo mở tại ngân hàng, tách khỏi tiền của chính công ty ví",
          "Ở két của công ty cung cấp ví dưới dạng tiền mặt được kiểm đếm định kỳ",
          "Ở tài khoản đầu tư sinh lời do công ty ví tự quản lý và hưởng chênh lệch",
          "Ở tài khoản cá nhân của từng người dùng tại ngân hàng mà họ liên kết",
        ],
        correct: 0,
        explanation:
          "Yêu cầu tách bạch này chính là thứ ngăn tiền người dùng bị dùng vào hoạt động của công ty. Nó là cơ chế bảo vệ thật, chỉ khác với bảo hiểm tiền gửi về bản chất.",
      },
      {
        question: "Vì sao không nên để số dư lớn trong ví điện tử?",
        options: [
          "Vì nó không sinh lãi nên bạn mất phần lợi suất mà tiền gửi mang lại",
          "Vì nhà cung cấp ví có quyền thu phí duy trì trên số dư nhàn rỗi hằng tháng",
          "Vì số dư trong ví bị giới hạn thời gian sử dụng và sẽ hết hạn sau một năm",
          "Vì ví điện tử không cho phép chuyển tiền ngược lại về tài khoản ngân hàng",
        ],
        correct: 0,
        explanation:
          "Chi phí thật của việc để tiền trong ví là khoản lãi không nhận được, và nó chạy âm thầm mỗi ngày. Với vài triệu cho chi tiêu trong tuần thì không đáng kể; với vài chục triệu nằm lại nhiều tháng thì đáng.",
      },
      {
        question: "Rủi ro lớn nhất với người dùng ngân hàng số và ví điện tử là gì?",
        options: [
          "Bị chiếm quyền truy cập tài khoản qua lừa đảo hoặc mất kiểm soát điện thoại",
          "Nhà cung cấp dịch vụ đột ngột ngừng hoạt động và giữ lại toàn bộ số dư",
          "Hệ thống tính sai số dư khiến người dùng mất tiền mà không đối chiếu được",
          "Giao dịch bị chậm vài ngày nên không thanh toán kịp các khoản đến hạn",
        ],
        correct: 0,
        explanation:
          "Rủi ro hệ thống thì có cơ chế quản lý và hiếm khi xảy ra. Rủi ro thật và phổ biến nằm ở phía người dùng: một mã xác thực bị đọc cho người lạ có thể xóa sạch tài khoản trong vài phút, và không cơ chế kỹ thuật nào chặn được điều đó.",
      },
      {
        question: "Nguyên tắc hợp lý cho số dư trong ví điện tử là gì?",
        options: [
          "Giữ vừa đủ cho chi tiêu ngắn hạn, phần còn lại để ở nơi sinh lãi",
          "Giữ tối đa để tận dụng các chương trình hoàn tiền dành cho số dư lớn",
          "Không giữ đồng nào và chỉ nạp đúng số tiền mỗi khi cần thanh toán",
          "Giữ bằng đúng ba tháng chi tiêu như cách tính quỹ khẩn cấp thông thường",
        ],
        correct: 0,
        explanation:
          "Nạp từng lần một thì đánh mất chính sự tiện lợi mà ví mang lại. Còn quỹ khẩn cấp thì nên nằm ở nơi vừa rút được nhanh vừa sinh lãi, chứ không phải trong ví.",
      },
      {
        question: "Ngân hàng số khác ngân hàng truyền thống chủ yếu ở điểm nào?",
        options: [
          "Mô hình vận hành ít chi nhánh, nên thường miễn nhiều loại phí hơn",
          "Không thuộc phạm vi bảo hiểm tiền gửi vì không có mạng lưới chi nhánh",
          "Chỉ nhận tiền gửi không kỳ hạn chứ không cung cấp sản phẩm có kỳ hạn",
          "Lãi suất tiền gửi do thuật toán quyết định nên thay đổi hằng ngày",
        ],
        correct: 0,
        explanation:
          "Nếu đó là ngân hàng được cấp phép thì tiền gửi tại đó được bảo hiểm như mọi ngân hàng khác. Chi phí vận hành thấp hơn là lý do họ cạnh tranh được bằng phí và đôi khi bằng lãi suất.",
      },
    ],
    keyTakeaways: [
      "Ví điện tử là trung gian thanh toán, không phải tiền gửi - không sinh lãi và không được bảo hiểm tiền gửi",
      "Tiền người dùng được giữ tách bạch ở tài khoản đảm bảo tại ngân hàng",
      "Chi phí thật của số dư lớn trong ví là khoản lãi không nhận được",
      "Ngân hàng số vẫn là ngân hàng: tiền gửi ở đó được bảo hiểm như bình thường",
    ],
    practicePrompt: {
      question:
        "Bạn đang để 40 triệu trong ví điện tử vì tiện thanh toán. Nên sắp xếp lại thế nào?",
      options: [
        "Giữ lại phần đủ cho chi tiêu vài tuần, chuyển phần lớn về tiền gửi",
        "Giữ nguyên vì tính tiện lợi quan trọng hơn phần lãi suất nhận được",
        "Chuyển toàn bộ về tài khoản thanh toán để vẫn rút được ngay khi cần",
        "Chia đều giữa ví điện tử và sổ tiết kiệm để cân bằng giữa hai bên",
      ],
      correct: 0,
      explanation:
        "Tài khoản thanh toán cũng gần như không sinh lãi, nên chuyển sang đó chỉ đổi chỗ chứ không giải quyết gì. Chia đều là một con số tùy tiện: mức hợp lý phải xuất phát từ chi tiêu thật của bạn trong vài tuần.",
    },
    summary: {
      keyIdea: "Ví điện tử là công cụ thanh toán, không phải nơi cất tiền - số dư nhàn rỗi ở đó là lãi bị bỏ lại",
      commonMistake: "Coi số dư trong ví như tiền gửi ngân hàng, cả về lợi suất lẫn cơ chế bảo vệ",
      action: "Tính chi tiêu qua ví trong bốn tuần gần nhất và đặt số dư mục tiêu quanh mức đó.",
    },
    application: {
      title: "Đặt mức trần cho ví",
      message:
        "Xem lịch sử giao dịch bốn tuần gần nhất trong ví, cộng lại rồi đặt số dư mục tiêu quanh con số ấy. Phần vượt lên chuyển về tiền gửi.",
      secondary:
        "Nhiều ví có chức năng tự động nạp từ tài khoản liên kết khi số dư xuống thấp - bật nó lên thì giữ được cả sự tiện lợi lẫn phần lãi.",
    },
    sections: [
      {
        type: "lead",
        text: "Với phần lớn người dùng, ví điện tử đã thay thế ví tiền thật. Chuyện đó hoàn toàn hợp lý - vấn đề chỉ nảy sinh khi nó thay thế luôn cả tài khoản tiết kiệm.",
      },
      { type: "heading", text: "Ba thứ đang bị gọi chung là tiền trong điện thoại" },
      {
        type: "conceptTable",
        title: "Ứng dụng nào giữ tiền theo cách nào",
        subtitle: "Trông giống nhau trên màn hình, khác nhau ở phía sau",
        concepts: [
          {
            vi: "Ứng dụng ngân hàng",
            en: "Bank app",
            def: "Chỉ là cửa vào tài khoản ngân hàng của bạn. Tiền vẫn là tiền gửi, vẫn sinh lãi theo sản phẩm và vẫn được bảo hiểm tiền gửi.",
          },
          {
            vi: "Ngân hàng số",
            en: "Digital bank",
            def: "Là ngân hàng được cấp phép, ít chi nhánh nên chi phí thấp hơn. Tiền gửi ở đây được bảo vệ như mọi ngân hàng khác.",
          },
          {
            vi: "Ví điện tử",
            en: "E-wallet",
            def: "Trung gian thanh toán. Tiền giữ tách bạch tại ngân hàng nhưng không phải tiền gửi của bạn, không sinh lãi.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Khác biệt này không nói rằng ví điện tử kém an toàn - tiền của người dùng được giữ tách khỏi tiền của công ty và có cơ chế quản lý riêng. Nó chỉ nói rằng ví được thiết kế cho việc thanh toán, và mọi đồng nằm lại đó lâu hơn mức cần thiết là một đồng không sinh lãi.",
      },
      {
        type: "callout",
        label: "Tiện lợi và lợi suất không phải chọn một",
        text: "Không cần bỏ ví để lấy lại phần lãi. Đặt một mức trần dựa trên chi tiêu thật, bật tự động nạp từ tài khoản liên kết, và bạn giữ được cả hai. Thứ duy nhất cần bỏ là thói quen để tiền nằm trong ví chỉ vì chưa bao giờ nghĩ tới việc chuyển nó đi.",
      },
      {
        type: "closing",
        lines: [
          "Ví điện tử làm rất tốt việc nó sinh ra để làm; cất tiền không nằm trong số đó.",
          "Bài cuối chặng: gộp tất cả thành một bảng - khoản tiền nào thì để ở đâu.",
        ],
      },
    ],
  },
  {
    id: 318,
    slug: "dat-tien-o-dau-cho-tung-muc-dich",
    title: "Chặng 12, Bài 9: Đặt tiền ở đâu cho từng mục đích",
    subtitle: "Câu hỏi không phải nơi nào lãi cao nhất, mà là khi nào bạn cần tới khoản này",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    whyItMatters:
      "Tám bài trước cho bạn các công cụ riêng lẻ. Bài này ghép chúng lại theo đúng cách một người thật ra quyết định: không phải chọn sản phẩm tốt nhất, mà là ghép mỗi khoản tiền với nơi phù hợp với thời điểm bạn cần dùng nó.",
    openingQuestion: "Biến nào quyết định nơi đặt một khoản tiền?",
    openingOptions: [
      "Mức lãi suất cao nhất đang được các ngân hàng niêm yết tại thời điểm đó",
      "Thời điểm bạn cần dùng tới khoản tiền ấy và mức chắc chắn của thời điểm đó",
      "Quy mô khoản tiền, vì số dư càng lớn thì càng có nhiều lựa chọn tốt hơn",
      "Uy tín và quy mô của ngân hàng nơi bạn dự định gửi khoản tiền đó",
    ],
    correctOption: 1,
    explanation:
      "Mọi bài trong chặng này đều quy về một biến duy nhất: khi nào bạn cần tiền. Nó quyết định kỳ hạn, và kỳ hạn quyết định lãi suất - chứ không phải ngược lại. Chọn theo lãi suất cao nhất là cách chắc chắn dẫn tới việc phá sổ giữa chừng và mất gần hết phần lãi ấy. Quy mô khoản tiền chỉ ảnh hưởng tới hạn mức bảo hiểm tiền gửi, tức tới việc chia ra bao nhiêu ngân hàng, chứ không đổi nguyên tắc. Và mức độ chắc chắn của thời điểm cũng quan trọng ngang thời điểm: khoản có thể cần bất cứ lúc nào phải nằm ở nơi rút được ngay, dù lãi thấp.",
    diagram: [
      { label: "Hỏi: khi nào cần tới khoản này", arrow: true },
      { label: "Chắc chắn hay có thể bất ngờ", arrow: true },
      { label: "Ghép với kỳ hạn tương ứng", arrow: true },
      { label: "Lãi suất là kết quả, không phải điểm xuất phát" },
    ],
    realWorldExample: {
      company: "Cùng 700 triệu, hai cách sắp xếp",
      description:
        "Người thứ nhất gửi cả 700 triệu vào kỳ hạn 24 tháng vì lãi cao nhất, rồi tháng thứ tám cần 80 triệu chữa bệnh và phải tất toán toàn bộ - mất gần hết tiền lãi của tám tháng. Người thứ hai tách 60 triệu quỹ khẩn cấp ở nơi rút ngay, 140 triệu kỳ hạn ngắn cho kế hoạch trong năm, 500 triệu chia thành bậc thang dài hạn. Khi có việc, người này rút đúng phần cần và không sổ nào bị động tới.",
    },
    quiz: [
      {
        question: "Quỹ khẩn cấp nên đặt ở đâu?",
        options: [
          "Nơi rút được ngay, chấp nhận lãi thấp vì nó được đánh giá bằng tính sẵn sàng",
          "Kỳ hạn 12 tháng để phần lãi cao bù lại cho rủi ro phải rút sớm",
          "Chứng chỉ tiền gửi vì đây là sản phẩm có mức lãi suất tốt nhất",
          "Chia đều giữa tiền gửi dài hạn và cổ phiếu để chống lại tác động của lạm phát",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp tồn tại để dùng đúng vào lúc bạn không lường trước, nên mọi ràng buộc về thời gian đều làm hỏng chức năng của nó. Đây là khoản duy nhất trong danh mục mà lợi suất không phải tiêu chí.",
      },
      {
        question: "Tiền dành cho một khoản chi đã biết trước sáu tháng nữa nên để đâu?",
        options: [
          "Kỳ hạn ngắn khớp với thời điểm cần dùng, để không phải tất toán trước hạn",
          "Kỳ hạn dài nhất có thể vì mức lãi suất cao hơn hẳn kỳ hạn ngắn",
          "Tài khoản thanh toán để chắc chắn rút được ngay khi tới hạn chi",
          "Ví điện tử để có thể thanh toán trực tiếp ngay khi tới thời điểm cần dùng tiền",
        ],
        correct: 0,
        explanation:
          "Thời điểm đã biết trước là trường hợp dễ nhất: chọn kỳ hạn đáo hạn ngay trước lúc cần. Để ở tài khoản thanh toán hay ví thì mất trắng phần lãi của sáu tháng mà chẳng đổi lại được gì.",
      },
      {
        question: "Khoản chưa có kế hoạch dùng trong nhiều năm nên xử lý thế nào?",
        options: [
          "Bậc thang tiền gửi dài hạn, và cân nhắc kênh khác nếu lãi suất thực đang thấp",
          "Gửi toàn bộ vào một sổ có kỳ hạn dài nhất để tối đa hóa mức lãi suất nhận được",
          "Giữ ở kỳ hạn một tháng và tái tục liên tục để luôn linh hoạt khi cần",
          "Chuyển toàn bộ sang ví điện tử để thuận tiện khi có cơ hội đầu tư",
        ],
        correct: 0,
        explanation:
          "Một sổ duy nhất kỳ hạn dài buộc bạn phá cả khoản khi có việc, còn kỳ hạn một tháng thì bỏ phí phần lãi suốt nhiều năm. Bậc thang lấy được phần lớn của cả hai, và bài lãi suất thực nhắc rằng tiền gửi không phải câu trả lời duy nhất cho khoản rất dài hạn.",
      },
      {
        question: "Khi nào cần chia tiền sang ngân hàng khác?",
        options: [
          "Khi tổng số dư của bạn tại một ngân hàng vượt hạn mức bảo hiểm tiền gửi",
          "Khi bạn đã mở quá năm cuốn sổ tiết kiệm tại cùng một ngân hàng",
          "Khi ngân hàng hiện tại thay đổi mức lãi suất đang niêm yết giữa kỳ hạn",
          "Khi khoản tiền gửi có kỳ hạn dài hơn hai mươi bốn tháng liên tục",
        ],
        correct: 0,
        explanation:
          "Hạn mức gắn với cặp người gửi và tổ chức, nên số sổ không liên quan. Đây là lý do duy nhất trong chặng này để mở quan hệ ở một ngân hàng thứ hai.",
      },
      {
        question: "Sai lầm phổ biến nhất khi sắp xếp tiền là gì?",
        options: [
          "Bắt đầu từ câu hỏi nơi nào lãi cao nhất thay vì khi nào cần dùng tiền",
          "Chia khoản tiết kiệm thành quá nhiều sổ nhỏ nên khó theo dõi ngày đáo hạn",
          "Giữ quỹ khẩn cấp lớn hơn mức ba tháng chi tiêu thông thường",
          "Đặt tiền ở ngân hàng nhỏ thay vì các ngân hàng lớn có uy tín lâu năm",
        ],
        correct: 0,
        explanation:
          "Bắt đầu sai câu hỏi thì mọi bước sau đều lệch: khoản cần dùng sớm bị khóa vào kỳ hạn dài, rồi bị phá, rồi mất đúng phần lãi mà lựa chọn ban đầu nhắm tới.",
      },
    ],
    keyTakeaways: [
      "Biến quyết định là khi nào bạn cần tiền, không phải nơi nào trả lãi cao nhất",
      "Quỹ khẩn cấp đánh đổi lợi suất lấy tính sẵn sàng - đó là chức năng của nó",
      "Khoản có mốc rõ ràng thì chọn kỳ hạn đáo hạn ngay trước mốc đó",
      "Khoản dài hạn dùng bậc thang; hạn mức bảo hiểm quyết định chia ra mấy ngân hàng",
    ],
    practicePrompt: {
      question:
        "Bạn có 400 triệu: 50 triệu dự phòng, 100 triệu cho học phí sau chín tháng, 250 triệu chưa có kế hoạch. Sắp xếp thế nào?",
      options: [
        "50 triệu nơi rút ngay, 100 triệu kỳ hạn 9 tháng, 250 triệu chia bậc thang dài hạn",
        "Gộp cả 400 triệu vào kỳ hạn 12 tháng để hưởng mức lãi suất cao nhất",
        "Chia đều 400 triệu thành bốn sổ 100 triệu cùng kỳ hạn 12 tháng",
        "Giữ cả 400 triệu ở tài khoản thanh toán để luôn linh hoạt cho mọi tình huống có thể xảy ra",
      ],
      correct: 0,
      explanation:
        "Chia đều thành bốn sổ cùng kỳ hạn nghe có vẻ cân đối nhưng không khớp với bất kỳ mốc nào: sổ nào cũng đáo hạn sau học phí. Ghép từng khoản với đúng thời điểm cần dùng là toàn bộ nội dung của chặng này.",
    },
    summary: {
      keyIdea: "Ghép mỗi khoản tiền với thời điểm bạn cần nó; lãi suất là kết quả của việc ghép đúng",
      commonMistake: "Bắt đầu bằng câu hỏi nơi nào lãi cao nhất, rồi phá sổ và mất chính phần lãi đó",
      action: "Chia số tiền bạn đang có thành ba nhóm theo thời điểm cần dùng và đặt mỗi nhóm đúng chỗ.",
    },
    application: {
      title: "Ba nhóm, ba nơi",
      message:
        "Chia tiền của bạn thành: cần bất cứ lúc nào, cần vào một mốc đã biết, và chưa có kế hoạch trong nhiều năm. Nhóm một để nơi rút ngay, nhóm hai chọn kỳ hạn khớp mốc, nhóm ba dùng bậc thang.",
      secondary:
        "Nếu tổng ở một ngân hàng vượt hạn mức bảo hiểm tiền gửi, chia phần vượt sang tổ chức khác trước khi tối ưu lãi suất.",
    },
    sections: [
      {
        type: "lead",
        text: "Tám bài trước là tám công cụ. Bài này không thêm công cụ nào - nó trả lời câu hỏi mà mọi bài kia để ngỏ: với khoản tiền cụ thể đang nằm trong tài khoản của bạn, dùng công cụ nào.",
      },
      { type: "heading", text: "Một câu hỏi thay cho tất cả" },
      {
        type: "paragraph",
        text: "Khi nào tôi cần tới khoản này, và tôi chắc chắn tới mức nào về thời điểm đó. Hai vế ấy quyết định mọi thứ còn lại. Khoản có thể cần bất cứ lúc nào phải nằm ở nơi rút được ngay, và lãi suất thấp là cái giá hợp lý cho chức năng đó. Khoản có mốc rõ ràng thì chọn kỳ hạn đáo hạn ngay trước mốc. Khoản chưa có kế hoạch nào mới là chỗ duy nhất mà câu hỏi lãi suất trở nên chính đáng.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm tiền, ba nơi đặt",
        subtitle: "Phần lớn sai lầm là đặt nhóm một vào chỗ của nhóm ba",
        concepts: [
          {
            vi: "Cần bất cứ lúc nào",
            en: "Emergency",
            def: "Quỹ khẩn cấp. Tiền gửi không kỳ hạn hoặc kỳ hạn rất ngắn. Đánh giá bằng tốc độ lấy ra được, không bằng lãi suất.",
          },
          {
            vi: "Cần vào mốc đã biết",
            en: "Planned",
            def: "Học phí, sửa nhà, cưới hỏi. Chọn kỳ hạn đáo hạn ngay trước mốc - đây là trường hợp dễ nhất và ít khi bị làm sai.",
          },
          {
            vi: "Chưa có kế hoạch",
            en: "Long-term",
            def: "Bậc thang tiền gửi, chia theo hạn mức bảo hiểm nếu số dư lớn. Nếu lãi suất thực đang âm kéo dài, đây là phần nên cân nhắc kênh khác.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thứ tự ưu tiên khi ba nguyên tắc xung đột",
        text: "Đầu tiên là tính sẵn sàng của quỹ khẩn cấp - không có ngoại lệ nào cho khoản này. Thứ hai là hạn mức bảo hiểm tiền gửi, vì nó là rủi ro mất vốn chứ không phải chuyện lợi suất. Cuối cùng mới tới việc tối ưu lãi suất. Đảo thứ tự này chính là cách phần lớn sai lầm trong chặng bắt đầu.",
      },
      {
        type: "closing",
        lines: [
          "Nơi lãi cao nhất và nơi đúng nhất hiếm khi là một, và nơi đúng nhất luôn thắng.",
          "Bài cuối chặng: một buổi rà soát toàn bộ tiền gửi của bạn, làm một lần rồi lặp lại mỗi năm.",
        ],
      },
    ],
  },
  {
    id: 319,
    slug: "ra-soat-tien-gui-hang-nam",
    title: "Chặng 12, Bài 10: Buổi rà soát tiền gửi hằng năm",
    subtitle: "Chín bài trước là kiến thức; bài này là ba mươi phút biến chúng thành tiền",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "✅",
    track: "personal",
    whyItMatters:
      "Mọi thứ trong chặng này đều trôi theo thời gian: lãi suất đổi, sổ tự tái tục ở mức thấp hơn, số dư vượt hạn mức bảo hiểm, phí quay lại vì gói miễn phí đổi điều kiện. Không có gì trong số đó tự báo cho bạn biết, nên cần một buổi rà soát định kỳ - và nó ngắn hơn nhiều so với vẻ ngoài.",
    openingQuestion: "Vì sao cần rà soát tiền gửi định kỳ dù không có gì thay đổi trong cách bạn dùng tiền?",
    openingOptions: [
      "Vì lãi suất, số dư và điều kiện miễn phí đều đổi theo thời gian mà không ai báo",
      "Vì ngân hàng yêu cầu khách hàng xác nhận lại thông tin tài khoản mỗi năm một lần",
      "Vì sổ tiết kiệm sẽ tự động bị đóng nếu không có giao dịch trong mười hai tháng",
      "Vì bảo hiểm tiền gửi chỉ có hiệu lực nếu chủ tài khoản xác nhận số dư hằng năm",
    ],
    correctOption: 0,
    explanation:
      "Cách bạn dùng tiền không đổi không có nghĩa là mọi thứ đứng yên. Sổ tự tái tục theo lãi suất mới, và trong một chu kỳ giảm lãi suất thì mức mới thấp hơn hẳn. Số dư lớn dần và có thể đã vượt hạn mức bảo hiểm tiền gửi tại một ngân hàng. Gói miễn phí có thể đã đổi điều kiện nên phí quay lại. Không cơ chế nào trong số này gửi thông báo cho bạn, và tất cả đều được phát hiện trong cùng một buổi ngồi xuống - đó là lý do gộp chúng thành một việc định kỳ thay vì bốn việc rời rạc.",
    diagram: [
      { label: "Liệt kê mọi khoản gửi và ngày đáo hạn", arrow: true },
      { label: "So lãi suất đang hưởng với mặt bằng hiện tại", arrow: true },
      { label: "Cộng số dư theo từng ngân hàng, đối chiếu hạn mức", arrow: true },
      { label: "Rà phí định kỳ trong sao kê mười hai tháng" },
    ],
    realWorldExample: {
      company: "Ba mươi phút, bốn phát hiện",
      description:
        "Một người ngồi xuống rà soát lần đầu sau ba năm. Kết quả: một sổ đã tái tục hai lần và đang chạy thấp hơn mặt bằng 1,3%; tổng số dư tại ngân hàng chính đã vượt hạn mức bảo hiểm; hai khoản phí định kỳ quay lại từ mười tháng trước vì gói cũ đổi điều kiện; và quỹ khẩn cấp bị khóa nhầm trong một sổ kỳ hạn 18 tháng. Không phát hiện nào cần kiến thức mới - chỉ cần ngồi xuống.",
    },
    quiz: [
      {
        question: "Việc nào nên làm đầu tiên trong buổi rà soát?",
        options: [
          "Liệt kê mọi khoản gửi kèm ngân hàng, số tiền, lãi suất và ngày đáo hạn",
          "Gọi điện cho từng ngân hàng để hỏi mức lãi suất ưu đãi hiện đang có",
          "Chuyển toàn bộ tiền về một ngân hàng duy nhất cho dễ theo dõi trong các năm sau",
          "Tất toán các sổ có lãi suất thấp nhất để gửi lại theo mặt bằng mới",
        ],
        correct: 0,
        explanation:
          "Không có danh sách thì mọi bước sau đều làm trên trí nhớ, và trí nhớ là thứ đã để sổ tái tục ba lần mà không ai biết. Tất toán sớm cũng là bước sai vì nó kích hoạt đúng điều khoản rút trước hạn.",
      },
      {
        question: "Phát hiện một sổ đang chạy lãi suất thấp hơn mặt bằng 1,3% thì nên làm gì?",
        options: [
          "Chờ tới ngày đáo hạn rồi mới chuyển, vì tất toán sớm sẽ mất gần hết lãi",
          "Tất toán ngay lập tức để chuyển sang nơi có mức lãi suất cao hơn",
          "Yêu cầu ngân hàng điều chỉnh lãi suất của sổ đó theo mặt bằng hiện hành",
          "Giữ nguyên vì chênh lệch hơn một điểm phần trăm là mức không đáng kể",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ bài rút trước hạn được dùng tới. Chênh lệch 1,3% trong phần kỳ hạn còn lại gần như luôn nhỏ hơn phần lãi bị mất khi tất toán sớm, nên câu trả lời đúng là đánh dấu ngày đáo hạn và hành động vào đúng ngày đó.",
      },
      {
        question: "Bao lâu nên rà soát một lần?",
        options: [
          "Mỗi năm một lần, và thêm một lần khi mặt bằng lãi suất biến động mạnh",
          "Mỗi tháng một lần để luôn nắm được mức lãi suất mới nhất của thị trường",
          "Năm năm một lần vì các điều kiện tiền gửi hiếm khi thay đổi đáng kể",
          "Chỉ khi bạn có thêm một khoản tiền lớn cần gửi vào ngân hàng",
        ],
        correct: 0,
        explanation:
          "Mỗi tháng là quá dày cho một thứ thay đổi chậm, và nó biến việc này thành gánh nặng rồi bị bỏ. Mỗi năm bắt được gần như mọi thứ, vì phần lớn kỳ hạn đều đáo hạn ít nhất một lần trong khoảng đó.",
      },
      {
        question: "Dấu hiệu nào cho thấy quỹ khẩn cấp đang bị đặt sai chỗ?",
        options: [
          "Nó nằm trong sổ có kỳ hạn nên muốn dùng thì phải chấp nhận mất phần lãi",
          "Nó đang được hưởng mức lãi suất thấp hơn các khoản tiết kiệm dài hạn",
          "Nó chiếm tỷ trọng nhỏ hơn hẳn so với tổng khoản tiết kiệm của bạn",
          "Nó nằm ở ngân hàng khác với nơi bạn nhận lương hằng tháng",
        ],
        correct: 0,
        explanation:
          "Lãi thấp hơn là đặc điểm bình thường của quỹ khẩn cấp chứ không phải lỗi. Lỗi là khi nó bị khóa: một quỹ khẩn cấp mà dùng tới phải trả giá thì đã thôi làm đúng chức năng của nó.",
      },
      {
        question: "Vì sao nên gộp bốn việc rà soát vào cùng một buổi?",
        options: [
          "Vì cả bốn đều cần chính danh sách khoản gửi mà bạn vừa lập ra",
          "Vì ngân hàng chỉ cho phép thay đổi thông tin tài khoản một lần mỗi năm",
          "Vì các khoản phí chỉ được hoàn lại nếu khiếu nại toàn bộ cùng một lúc",
          "Vì việc rà soát nhiều lần trong năm sẽ ảnh hưởng tới điểm tín dụng của bạn",
        ],
        correct: 0,
        explanation:
          "Chi phí lớn nhất của việc này là ngồi xuống và mở hết ứng dụng ngân hàng ra. Khi đã trả chi phí đó rồi thì ba việc còn lại gần như miễn phí, nên tách chúng ra làm bốn lần là tự nhân bốn phần khó nhất.",
      },
    ],
    keyTakeaways: [
      "Mọi thứ trôi theo thời gian: lãi suất tái tục, số dư vượt hạn mức, phí quay lại",
      "Bắt đầu bằng một danh sách đầy đủ - không có nó thì mọi bước sau chạy trên trí nhớ",
      "Sổ đang chạy lãi thấp thì chờ đáo hạn rồi chuyển, đừng tất toán sớm",
      "Mỗi năm một lần là đủ, vì phần lớn kỳ hạn đều đáo hạn ít nhất một lần trong khoảng đó",
    ],
    practicePrompt: {
      question:
        "Rà soát xong bạn thấy tổng số dư ở ngân hàng chính đã vượt hạn mức bảo hiểm, và một sổ còn bốn tháng nữa mới đáo hạn. Nên làm gì?",
      options: [
        "Chuyển phần vượt khi sổ đó đáo hạn, đánh dấu lịch ngay từ bây giờ",
        "Tất toán sổ ngay hôm nay để đưa phần vượt sang ngân hàng khác",
        "Mở thêm vài sổ nhỏ tại chính ngân hàng đó để chia nhỏ số dư ra",
        "Bỏ qua vì rủi ro ngân hàng gặp vấn đề trong bốn tháng là rất thấp",
      ],
      correct: 0,
      explanation:
        "Mở thêm sổ tại cùng ngân hàng không thay đổi gì vì hạn mức cộng gộp theo tổ chức. Tất toán sớm thì trả một khoản chắc chắn để né một rủi ro rất nhỏ trong bốn tháng - đánh đổi không hợp lý. Đánh dấu lịch là bước vừa đúng vừa rẻ.",
    },
    summary: {
      keyIdea: "Ba mươi phút mỗi năm bắt được gần như mọi thứ đã trôi khỏi chỗ đúng của nó",
      commonMistake: "Cho rằng không thay đổi gì thì không cần xem lại - trong khi lãi suất và điều kiện tự đổi",
      action: "Đặt một buổi rà soát ba mươi phút vào lịch, lặp lại hằng năm vào cùng một tháng.",
    },
    application: {
      title: "Buổi rà soát đầu tiên, làm ngay tuần này",
      message:
        "Mở mọi ứng dụng ngân hàng, lập một bảng gồm: ngân hàng, số tiền, lãi suất, ngày đáo hạn. Rồi làm bốn việc - so lãi với mặt bằng, cộng số dư theo ngân hàng, rà phí trong sao kê, kiểm quỹ khẩn cấp có bị khóa không.",
      secondary:
        "Giữ lại bảng đó. Năm sau bạn chỉ cần cập nhật thay vì lập lại từ đầu, và buổi rà soát thứ hai sẽ mất chưa tới mười lăm phút.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước giải thích cách mọi thứ vận hành. Bài này chỉ có một nội dung: ngồi xuống ba mươi phút và áp chúng vào số tiền thật của bạn.",
      },
      { type: "heading", text: "Bốn thứ trôi đi mà không báo" },
      {
        type: "list",
        items: [
          "Sổ tự tái tục theo lãi suất mới - trong chu kỳ giảm, mức mới có thể thấp hơn nhiều",
          "Số dư lớn dần và có thể đã vượt hạn mức bảo hiểm tiền gửi tại một ngân hàng",
          "Điều kiện miễn phí đổi, nên phí định kỳ quay lại dù cách bạn dùng không đổi",
          "Quỹ khẩn cấp bị khóa vào một kỳ hạn dài trong lúc sắp xếp lại tiền",
        ],
      },
      {
        type: "paragraph",
        text: "Không thứ nào trong bốn thứ trên gửi thông báo, và không thứ nào gây hậu quả ngay lập tức - đó chính là lý do chúng kéo dài nhiều năm. Điểm chung thứ hai quan trọng hơn: cả bốn đều được phát hiện từ cùng một danh sách, nên chi phí kiểm cái thứ hai, thứ ba và thứ tư gần như bằng không khi đã kiểm cái thứ nhất.",
      },
      {
        type: "conceptTable",
        title: "Bốn bước, và điều cần làm với mỗi phát hiện",
        subtitle: "Phần lớn kết luận là đánh dấu lịch, không phải hành động ngay",
        concepts: [
          {
            vi: "Lãi suất đang hưởng",
            en: "Rate check",
            def: "So với mặt bằng hiện tại. Thấp hơn thì đánh dấu ngày đáo hạn để chuyển - đừng tất toán sớm.",
          },
          {
            vi: "Số dư theo ngân hàng",
            en: "Insurance limit",
            def: "Cộng gộp mọi sổ tại từng nơi, so với hạn mức bảo hiểm. Vượt thì lên kế hoạch chuyển phần vượt vào ngày đáo hạn gần nhất.",
          },
          {
            vi: "Phí định kỳ",
            en: "Recurring fees",
            def: "Lọc sao kê mười hai tháng. Với mỗi khoản, hỏi nếu được chào hôm nay thì bạn có mua không.",
          },
          {
            vi: "Vị trí quỹ khẩn cấp",
            en: "Emergency access",
            def: "Kiểm xem nó có bị khóa vào kỳ hạn nào không. Đây là thứ duy nhất đáng sửa ngay kể cả khi phải chịu thiệt.",
          },
        ],
      },
      {
        type: "callout",
        label: "Phần lớn phát hiện không cần hành động ngay",
        text: "Trực giác sau khi phát hiện một sổ đang chạy lãi thấp là sửa ngay lập tức, và đó thường là quyết định đắt nhất trong cả buổi. Điều khoản rút trước hạn khiến việc tất toán sớm gần như luôn tốn hơn phần chênh lệch lãi suất của quãng còn lại. Ngoại lệ duy nhất là quỹ khẩn cấp bị khóa - vì ở đó cái bạn mua lại là khả năng dùng tiền khi có việc.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 12. Bạn đã biết tiền của mình đang nằm ở đâu, hưởng bao nhiêu, và được bảo vệ tới đâu.",
          "Điều còn lại là ba mươi phút mỗi năm để những câu trả lời đó vẫn còn đúng.",
        ],
      },
    ],
  },
];
