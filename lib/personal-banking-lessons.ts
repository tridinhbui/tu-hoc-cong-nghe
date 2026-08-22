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
        "Mở quyền đọc cho tất cả mọi người để chắc chắn dịch vụ luôn đọc được tệp đó",
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
    title: "Chặng 12, Bài 5: DNS - từ tên miền tới địa chỉ IP",
    subtitle: "Lớp tra cứu mà mọi thứ dựa vào, và cũng là chỗ hỏng bị đổ oan nhiều nhất",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    whyItMatters:
      "Câu đùa lúc nào cũng là DNS tồn tại vì nó đúng nhiều hơn mức người ta muốn thừa nhận. Hiểu bộ nhớ đệm và thời gian sống của bản ghi sẽ giải thích được vì sao đổi cấu hình xong mà nửa người dùng vẫn vào chỗ cũ.",
    openingQuestion: "Khi trình duyệt cần mở một tên miền, việc đầu tiên nó làm là gì?",
    openingOptions: [
      "Tra tên miền đó ra địa chỉ IP",
      "Mở kết nối TCP tới máy chủ rồi hỏi tên miền đó thuộc về ai trong quá trình bắt tay",
      "Tải chứng chỉ TLS của tên miền về để kiểm tra tính hợp lệ của nó trước tiên",
      "Gửi yêu cầu HTTP kèm tên miền để máy chủ gần nhất tự chuyển tiếp hộ nó",
    ],
    correctOption: 0,
    explanation:
      "Mạng chỉ định tuyến theo địa chỉ IP, nên tên miền phải được dịch ra số trước khi bất cứ kết nối nào mở được. Việc tra đó đi qua nhiều tầng bộ nhớ đệm: trình duyệt, hệ điều hành, máy chủ phân giải của nhà mạng, rồi mới tới máy chủ tên có thẩm quyền. Mỗi bản ghi mang theo một khoảng thời gian sống, và trong khoảng đó các tầng phía trước trả lời bằng bản đã lưu chứ không hỏi lại. Đây chính là lý do đổi bản ghi DNS không có hiệu lực ngay: bạn phải chờ hết thời gian sống của bản cũ ở mọi tầng, và bạn không kiểm soát được các tầng đó.",
    diagram: [
      { label: "Trình duyệt hỏi hệ điều hành", arrow: true },
      { label: "Hệ điều hành hỏi máy phân giải", arrow: true },
      { label: "Máy phân giải hỏi máy chủ tên có thẩm quyền", arrow: true },
      { label: "Mỗi tầng lưu lại theo thời gian sống" },
    ],
    realWorldExample: {
      company: "Đổi xong rồi mà nửa người dùng vẫn vào chỗ cũ",
      description:
        "Một đội chuyển máy chủ, đổi bản ghi DNS, kiểm tra trên máy mình thấy đã đúng, rồi thông báo hoàn tất. Trong hai ngày sau đó vẫn có người vào máy chủ cũ. Không ai làm sai - bản ghi cũ có thời gian sống hai mươi bốn giờ và vẫn đang nằm trong bộ nhớ đệm của nhiều nhà mạng. Cách xử lý là hạ thời gian sống xuống trước khi chuyển vài ngày.",
    },
    quiz: [
      {
        question: "Thời gian sống của một bản ghi DNS quyết định điều gì?",
        options: [
          "Các tầng đệm giữ bản trả lời cũ trong bao lâu trước khi hỏi lại",
          "Khoảng thời gian tối đa mà một máy chủ tên được phép chậm trả lời",
          "Số lần một máy phân giải được thử lại khi lần hỏi đầu tiên thất bại",
          "Thời hạn còn lại của tên miền trước khi chủ sở hữu phải gia hạn nó",
        ],
        correct: 0,
        explanation:
          "Đây là con số quyết định một lần chuyển đổi mượt hay lộn xộn. Đặt cao thì tra cứu nhanh và nhẹ cho máy chủ tên; đặt thấp thì đổi có hiệu lực nhanh. Thông lệ là hạ nó xuống vài phút trước khi chuyển, rồi nâng lại sau khi mọi thứ đã ổn định.",
      },
      {
        question: "Bản ghi A và bản ghi CNAME khác nhau thế nào?",
        options: [
          "A trỏ thẳng tới một địa chỉ IP, CNAME trỏ tới một tên miền khác",
          "A dùng cho tên miền chính còn CNAME chỉ dùng được cho tên miền phụ ở dưới",
          "A do nhà cung cấp tên miền quản lý, CNAME do nhà cung cấp máy chủ quản lý",
          "A áp dụng cho lưu lượng đi vào, còn CNAME áp dụng cho lưu lượng đi ra ngoài",
        ],
        correct: 0,
        explanation:
          "CNAME là một lớp chuyển hướng: nó bảo hãy đi hỏi tên kia. Nhờ vậy khi nhà cung cấp đổi IP, bạn không phải sửa gì. Đổi lại là thêm một vòng tra cứu, và có vài chỗ không dùng CNAME được - điển hình là tên miền gốc.",
      },
      {
        question: "Vì sao lỗi DNS thường bị chẩn đoán nhầm thành lỗi ứng dụng?",
        options: [
          "Vì biểu hiện là trang không mở được, giống hệt khi máy chủ bị sập",
          "Vì máy chủ DNS luôn trả về mã lỗi giống với mã lỗi của tầng ứng dụng",
          "Vì hệ điều hành không ghi lại nhật ký nào cho các lượt tra cứu tên miền",
          "Vì trình duyệt tự động thử lại nhiều lần nên lỗi chỉ hiện ra rất muộn",
        ],
        correct: 0,
        explanation:
          "Cùng một triệu chứng, nhiều nguyên nhân - đúng tình huống của bài tường lửa. Cách tách nhanh nhất là tra tên miền ra IP rồi thử gọi thẳng vào IP đó: gọi được nghĩa là dịch vụ vẫn sống và vấn đề nằm ở lớp tên.",
      },
      {
        question: "Vì sao nên hạ thời gian sống TRƯỚC khi chuyển máy chủ?",
        options: [
          "Để bản ghi cũ hết hạn nhanh, nên lúc chuyển thì mọi nơi cập nhật sớm",
          "Để máy chủ tên có thẩm quyền kịp đồng bộ bản ghi mới sang các máy dự phòng",
          "Để nhà cung cấp tên miền xác minh lại quyền sở hữu trước khi cho đổi",
          "Để trình duyệt của người dùng xoá sạch bộ nhớ đệm ngay khi bạn đổi",
        ],
        correct: 0,
        explanation:
          "Bạn không xoá được bộ nhớ đệm của người khác, nên thứ duy nhất kiểm soát được là hạn dùng của bản ghi bạn phát ra. Hạ xuống vài phút, chờ qua khoảng thời gian sống cũ, rồi mới chuyển - lúc đó cả thế giới sẽ hỏi lại rất nhanh.",
      },
      {
        question: "Điều gì đúng về máy chủ phân giải của nhà mạng?",
        options: [
          "Nó trả lời từ bộ nhớ đệm, nên có thể chưa thấy thay đổi bạn vừa làm",
          "Nó luôn hỏi lại máy chủ có thẩm quyền để bảo đảm dữ liệu là mới nhất",
          "Nó chỉ phục vụ các tên miền đã đăng ký trong cùng một quốc gia",
          "Nó lưu bản ghi vĩnh viễn cho tới khi chủ tên miền chủ động yêu cầu xoá",
        ],
        correct: 0,
        explanation:
          "Đệm là toàn bộ lý do DNS chịu tải được ở quy mô Internet - nếu mọi lượt tra đều đi tới tận máy chủ có thẩm quyền thì hệ thống không trụ nổi. Cái giá là bạn mất quyền kiểm soát thời điểm thay đổi được nhìn thấy.",
      },
    ],
    keyTakeaways: [
      "Mạng định tuyến theo IP, nên mọi tên miền phải được tra ra số trước",
      "Nhiều tầng đệm cùng lưu câu trả lời theo thời gian sống của bản ghi",
      "Đổi bản ghi không có hiệu lực ngay - phải chờ bản cũ hết hạn ở mọi tầng",
      "Hạ thời gian sống trước khi chuyển là cách duy nhất bạn kiểm soát được",
    ],
    practicePrompt: {
      question:
        "Trang của bạn không mở được. Phép thử nào tách nhanh nhất lỗi DNS khỏi lỗi máy chủ?",
      options: [
        "Tra tên miền ra IP, rồi thử gọi thẳng vào IP đó",
        "Khởi động lại dịch vụ web trên máy chủ rồi thử tải lại trang một lần nữa",
        "Xoá toàn bộ bộ nhớ đệm của trình duyệt rồi mở lại trang trong cửa sổ ẩn danh",
        "Kiểm tra chứng chỉ TLS của tên miền còn hạn sử dụng hay đã hết hạn rồi",
      ],
      correct: 0,
      explanation:
        "Hai bước, và chúng chia đôi bài toán: tra được ra IP nghĩa là lớp tên ổn; gọi thẳng IP mà vào được nghĩa là dịch vụ vẫn sống và vấn đề nằm ở DNS. Ba cách kia đều đang sửa mò một trong hai nửa mà chưa biết nửa nào hỏng.",
    },
    summary: {
      keyIdea: "DNS là lớp tra cứu có đệm nhiều tầng, nên thay đổi luôn có độ trễ bạn không kiểm soát",
      commonMistake: "Đổi bản ghi rồi kỳ vọng mọi người dùng thấy ngay lập tức",
      action: "Tra một tên miền bạn sở hữu và đọc thời gian sống của bản ghi đó.",
    },
    application: {
      title: "Trước mỗi lần chuyển máy chủ",
      message:
        "Hạ thời gian sống xuống vài phút, chờ hết khoảng thời gian sống cũ, chuyển, xác nhận, rồi nâng lại. Bốn bước, và bước đầu phải làm trước vài ngày chứ không phải trong ngày chuyển.",
      secondary:
        "Bỏ bước đầu là chấp nhận một khoảng thời gian mà một phần người dùng vẫn đi vào máy chủ cũ.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước nói về cổng và về ai được đi qua. Bài này lùi thêm một bước: trước khi có kết nối nào, phải biết đi tới đâu đã.",
      },
      { type: "heading", text: "Một cái tên, bốn tầng trả lời" },
      {
        type: "paragraph",
        text: "Trình duyệt hỏi hệ điều hành, hệ điều hành hỏi máy phân giải của nhà mạng, máy đó hỏi tiếp lên cho tới máy chủ tên có thẩm quyền. Bất kỳ tầng nào còn giữ câu trả lời chưa hết hạn đều trả lời ngay mà không hỏi tiếp. Chuỗi đệm này làm DNS nhanh và chịu tải, đồng thời làm mọi thay đổi có độ trễ.",
      },
      {
        type: "conceptTable",
        title: "Ba thứ đáng nhớ khi đụng tới DNS",
        subtitle: "Ba thứ này giải thích gần hết các tình huống bạn sẽ gặp",
        concepts: [
          {
            vi: "Thời gian sống",
            en: "TTL",
            def: "Bao lâu thì các tầng đệm phải hỏi lại. Đây là con số duy nhất bạn kiểm soát được, và phải hạ TRƯỚC khi chuyển.",
          },
          {
            vi: "Bản ghi A",
            en: "A record",
            def: "Trỏ thẳng một tên miền tới một địa chỉ IP. Đơn giản nhất, và đổi IP thì phải sửa tay.",
          },
          {
            vi: "Bản ghi CNAME",
            en: "CNAME",
            def: "Trỏ tên này sang tên khác. Nhà cung cấp đổi IP thì bạn không phải làm gì, đổi lại là thêm một vòng tra cứu.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lúc nào cũng là DNS",
        text: "Câu đùa này phổ biến vì lỗi DNS có triệu chứng giống hệt lỗi máy chủ sập, lỗi tường lửa và lỗi cấu hình - trang không mở được. Phép thử tách nó ra chỉ tốn hai lệnh: tra tên ra IP, rồi gọi thẳng vào IP. Làm hai bước đó trước sẽ tiết kiệm phần lớn thời gian bạn định dành để đoán.",
      },
      {
        type: "closing",
        lines: [
          "Một lớp tra cứu có đệm thì nhanh, và cái giá luôn là bạn không kiểm soát thời điểm thay đổi được nhìn thấy.",
          "Bài sau: TLS và chứng chỉ - vì sao có ổ khoá, và ổ khoá đó bảo đảm điều gì.",
        ],
      },
    ],
  },
  {
    id: 315,
    slug: "bao-hiem-tien-gui-viet-nam",
    title: "Chặng 12, Bài 6: TLS, chứng chỉ và lớp bảo vệ phía trước",
    subtitle: "Ổ khoá chứng minh bạn đang nói với đúng máy chủ, không chứng minh máy chủ đó tử tế",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🔒",
    track: "personal",
    whyItMatters:
      "Ổ khoá trên thanh địa chỉ là thứ ai cũng thấy và ít người đọc đúng. Hiểu nó bảo đảm gì - và không bảo đảm gì - vừa đổi cách bạn cấu hình máy chủ, vừa đổi cách bạn giải thích cho người dùng khi có cảnh báo.",
    openingQuestion: "Ổ khoá trên thanh địa chỉ bảo đảm điều gì?",
    openingOptions: [
      "Kết nối được mã hoá và bạn đang nói với đúng tên miền đó",
      "Trang web này đã được kiểm duyệt và không chứa nội dung lừa đảo nào cả",
      "Chủ sở hữu trang đã được xác minh danh tính pháp lý bởi một cơ quan nhà nước",
      "Dữ liệu bạn gửi lên sẽ được máy chủ lưu trữ và bảo vệ theo đúng quy định",
    ],
    correctOption: 0,
    explanation:
      "TLS làm đúng hai việc: mã hoá đường truyền, và chứng minh máy chủ ở đầu kia thật sự sở hữu tên miền bạn đang gõ. Nó không nói gì về việc trang đó tử tế hay không - một trang lừa đảo hoàn toàn xin được chứng chỉ hợp lệ cho tên miền của chính nó, và sẽ có ổ khoá xanh y hệt ngân hàng. Đây là ngộ nhận có hậu quả thật, vì nhiều người được dạy rằng thấy ổ khoá là an toàn. Câu đúng hơn: ổ khoá bảo đảm không ai nghe lén hay sửa dữ liệu trên đường, và bạn đang nói chuyện với đúng tên miền hiện trên thanh địa chỉ - phần còn lại là việc bạn phải tự đánh giá tên miền đó.",
    diagram: [
      { label: "Chứng chỉ chứng minh sở hữu tên miền", arrow: true },
      { label: "Bắt tay TLS thoả thuận khoá phiên", arrow: true },
      { label: "Đường truyền được mã hoá từ đó", arrow: true },
      { label: "Nhưng nội dung bên trong thì không được bảo chứng" },
    ],
    realWorldExample: {
      company: "Trang lừa đảo cũng có ổ khoá",
      description:
        "Một trang giả mạo ngân hàng đăng ký tên miền gần giống, xin chứng chỉ miễn phí trong vài phút, và hiện ổ khoá đầy đủ. Mọi thứ TLS hứa đều đúng: kết nối được mã hoá, và đó đúng là tên miền hiện trên thanh địa chỉ. Vấn đề là tên miền đó không phải của ngân hàng - thứ mà TLS chưa bao giờ nhận sẽ kiểm giúp bạn.",
    },
    quiz: [
      {
        question: "Chứng chỉ TLS chứng minh điều gì?",
        options: [
          "Rằng máy chủ này sở hữu tên miền ghi trong chứng chỉ",
          "Rằng nội dung trang đã được một bên thứ ba kiểm duyệt và phê duyệt",
          "Rằng doanh nghiệp đứng sau trang đã đăng ký kinh doanh hợp pháp",
          "Rằng dữ liệu người dùng gửi lên sẽ được mã hoá cả khi lưu trong ổ đĩa",
        ],
        correct: 0,
        explanation:
          "Loại chứng chỉ phổ biến nhất chỉ xác thực quyền kiểm soát tên miền, và cách xác thực là bạn chứng minh mình đặt được một tệp hoặc một bản ghi DNS. Có loại xác minh cả pháp nhân, nhưng trình duyệt hiện nay gần như không hiển thị khác biệt đó nữa.",
      },
      {
        question: "Chứng chỉ hết hạn gây ra chuyện gì?",
        options: [
          "Trình duyệt chặn lại và hiện cảnh báo, dù máy chủ vẫn chạy bình thường",
          "Kết nối vẫn mở nhưng dữ liệu sẽ được truyền đi mà không còn mã hoá nữa",
          "Máy chủ tự động chuyển sang phục vụ qua HTTP thường cho tới khi gia hạn",
          "Chỉ những người dùng mới bị ảnh hưởng, còn người đã vào trước thì vẫn vào được",
        ],
        correct: 0,
        explanation:
          "Đây là một trong những sự cố dễ tránh nhất mà vẫn xảy ra thường xuyên, vì nó âm thầm cho tới đúng ngày hết hạn. Tự động gia hạn cộng một cảnh báo trước vài tuần là cách xử lý tiêu chuẩn, và nó thuộc phần vận hành chứ không phải phần lập trình.",
      },
      {
        question: "Proxy ngược đặt trước ứng dụng để làm gì?",
        options: [
          "Kết thúc TLS, phân phối lưu lượng và chặn bớt trước khi tới ứng dụng",
          "Tăng tốc độ xử lý của ứng dụng bằng cách biên dịch lại mã trước khi chạy",
          "Thay thế tường lửa vì nó đã lọc được toàn bộ lưu lượng đi vào máy chủ",
          "Lưu trữ dữ liệu người dùng để ứng dụng không phải gọi cơ sở dữ liệu",
        ],
        correct: 0,
        explanation:
          "Gom ba việc vào một chỗ: xử lý chứng chỉ một lần thay vì trong từng ứng dụng, chia lưu lượng cho nhiều bản chạy, và chặn những thứ không nên tới được mã của bạn. Nó không thay tường lửa - hai lớp làm hai việc khác nhau, như bài trước đã nói.",
      },
      {
        question: "Giới hạn tần suất bảo vệ khỏi chuyện gì?",
        options: [
          "Một nguồn gửi quá nhiều yêu cầu làm cạn tài nguyên của dịch vụ",
          "Người dùng gửi dữ liệu sai định dạng khiến ứng dụng ném ra ngoại lệ",
          "Kẻ tấn công đoán được mật khẩu quản trị của máy chủ qua đường mạng",
          "Chứng chỉ TLS bị giả mạo bởi một tổ chức cấp chứng chỉ không đáng tin",
        ],
        correct: 0,
        explanation:
          "Nó là van xả áp: khi một nguồn vượt ngưỡng, dịch vụ từ chối sớm thay vì gục cả hệ thống. Đúng bài học của Chặng 8 về hàng đợi dài ra - từ chối có kiểm soát tốt hơn nhiều so với sập không kiểm soát.",
      },
      {
        question: "Vì sao chỉ cấu hình TLS ở proxy ngược là chưa đủ trong mạng nội bộ?",
        options: [
          "Vì chặng từ proxy tới ứng dụng vẫn có thể đang chạy không mã hoá",
          "Vì proxy ngược không hỗ trợ các phiên bản TLS mới nhất hiện nay",
          "Vì mỗi ứng dụng bắt buộc phải có chứng chỉ riêng theo chuẩn hiện hành",
          "Vì trình duyệt sẽ cảnh báo nếu phát hiện có proxy đứng giữa đường truyền",
        ],
        correct: 0,
        explanation:
          "Kết thúc TLS ở proxy nghĩa là từ đó vào trong là lưu lượng thường. Trong mạng riêng thì thường chấp nhận được, nhưng phải là một quyết định có ý thức - và ở môi trường nhiều bên dùng chung thì nên mã hoá cả chặng trong.",
      },
    ],
    keyTakeaways: [
      "TLS bảo đảm mã hoá đường truyền và đúng tên miền, không bảo đảm trang tử tế",
      "Chứng chỉ phổ biến chỉ xác thực quyền kiểm soát tên miền, không xác minh pháp nhân",
      "Chứng chỉ hết hạn làm trình duyệt chặn dù máy chủ vẫn chạy bình thường",
      "Proxy ngược gom việc kết thúc TLS, chia tải và chặn bớt vào một chỗ",
    ],
    practicePrompt: {
      question:
        "Người dùng báo trình duyệt cảnh báo không an toàn khi vào trang của bạn. Nguyên nhân nên kiểm đầu tiên là gì?",
      options: [
        "Chứng chỉ đã hết hạn hoặc không khớp tên miền đang truy cập",
        "Máy chủ đang quá tải nên không kịp hoàn tất bắt tay TLS với trình duyệt",
        "Người dùng đang dùng một trình duyệt phiên bản cũ không hỗ trợ TLS mới",
        "Nhà mạng của người dùng đang chặn cổng dùng cho kết nối được mã hoá",
      ],
      correct: 0,
      explanation:
        "Hết hạn và sai tên miền chiếm gần hết số lần, và cả hai đều kiểm được trong vài giây bằng cách xem chi tiết chứng chỉ. Ba nguyên nhân kia có thật nhưng hiếm hơn nhiều, và đều tốn công hơn để loại trừ.",
    },
    summary: {
      keyIdea: "Ổ khoá nói bạn đang nói chuyện riêng tư với đúng tên miền đó, không nói tên miền đó đáng tin",
      commonMistake: "Dạy người dùng rằng thấy ổ khoá là an toàn",
      action: "Mở chi tiết chứng chỉ của một trang bạn hay dùng và đọc xem nó xác thực cái gì.",
    },
    application: {
      title: "Ba việc cho mọi dịch vụ công khai",
      message:
        "Tự động gia hạn chứng chỉ kèm cảnh báo trước vài tuần; đặt một proxy ngược phía trước để kết thúc TLS ở một chỗ; bật giới hạn tần suất ngay từ ngày đầu, đừng đợi tới lúc bị dồn tải.",
      secondary:
        "Cả ba đều là việc vận hành, đều làm một lần, và đều rẻ hơn nhiều so với sự cố mà chúng ngăn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước đưa bạn tới đúng máy chủ. Bài này nói về việc chứng minh máy chủ đó đúng là nó, và về lớp mỏng đặt phía trước mà gần như dịch vụ nào cũng nên có.",
      },
      { type: "heading", text: "TLS hứa hai điều, và chỉ hai điều" },
      {
        type: "paragraph",
        text: "Điều thứ nhất là không ai đọc hay sửa được dữ liệu trên đường. Điều thứ hai là máy chủ ở đầu kia thật sự kiểm soát tên miền bạn đang gõ. Cả hai đều quan trọng, và cả hai đều không nói gì về việc nội dung phía sau có đáng tin hay không - phần đó không có công nghệ nào thay bạn đánh giá được.",
      },
      {
        type: "conceptTable",
        title: "Ba việc của lớp đứng trước ứng dụng",
        subtitle: "Gom vào một chỗ rẻ hơn làm lại trong từng dịch vụ",
        concepts: [
          {
            vi: "Kết thúc TLS",
            en: "TLS termination",
            def: "Chứng chỉ được cấu hình một lần ở proxy thay vì trong mỗi ứng dụng. Đổi lại, chặng từ proxy vào trong cần một quyết định có ý thức.",
          },
          {
            vi: "Chia tải",
            en: "Load balancing",
            def: "Phân phối yêu cầu cho nhiều bản chạy, và ngừng gửi vào bản đang hỏng. Đây là chỗ dự phòng của Chặng 8 thành hiện thực.",
          },
          {
            vi: "Giới hạn tần suất",
            en: "Rate limiting",
            def: "Từ chối sớm khi một nguồn vượt ngưỡng. Từ chối có kiểm soát luôn tốt hơn sập không kiểm soát.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ổ khoá không phải huy hiệu tin cậy",
        text: "Chứng chỉ miễn phí cấp trong vài phút cho bất kỳ ai chứng minh được mình kiểm soát tên miền - kể cả tên miền giả mạo gần giống tên ngân hàng. Vì vậy dạy người dùng rằng có ổ khoá là an toàn là dạy sai, và sai theo hướng nguy hiểm. Câu đúng là: ổ khoá nghĩa là không ai chen giữa được, còn bạn vẫn phải đọc kỹ chính cái tên miền đó.",
      },
      {
        type: "closing",
        lines: [
          "Mã hoá đường truyền và tin nội dung là hai câu hỏi khác nhau, và chỉ câu đầu được công nghệ trả lời.",
          "Bài sau: SSH - đăng nhập vào máy chủ bằng khoá thay cho mật khẩu.",
        ],
      },
    ],
  },
  {
    id: 316,
    slug: "phi-ngan-hang-va-cach-khong-mat-oan",
    title: "Chặng 12, Bài 7: SSH - đăng nhập bằng khoá thay mật khẩu",
    subtitle: "Cùng cặp khoá của Chặng 15, lần này dùng để vào máy chủ",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🗝️",
    track: "personal",
    whyItMatters:
      "SSH là cửa vào mọi máy chủ bạn sẽ quản, nên nó cũng là mục tiêu bị rà quét nhiều nhất. Chuyển từ mật khẩu sang khoá là thay đổi một lần, mất mười phút, và loại hẳn cả một lớp tấn công đoán mật khẩu.",
    openingQuestion: "Đăng nhập SSH bằng khoá an toàn hơn mật khẩu ở điểm nào?",
    openingOptions: [
      "Không có gì để đoán từ xa",
      "Khoá được đổi tự động mỗi phiên",
      "Kết nối được mã hoá mạnh hơn hẳn",
      "Máy chủ nhớ thiết bị của bạn lại",
    ],
    correctOption: 0,
    explanation:
      "Mật khẩu là bí mật ngắn mà máy chủ phải giữ bản đối chiếu, nên nó vừa đoán được từ xa vừa lộ được nếu máy chủ bị chiếm. Khoá thì khác: khoá riêng tư không bao giờ rời máy bạn, còn máy chủ chỉ giữ khoá công khai để kiểm chữ ký - đúng cặp vai đã gặp ở phần chuỗi khối. Kẻ tấn công rà quét cả ngày cũng không có gì để thử, vì không có bí mật nào truyền qua đường mạng để mà đoán. Cần nói rõ: kết nối SSH được mã hoá như nhau trong cả hai cách, và máy chủ không hề nhớ thiết bị - thứ thay đổi chỉ là cách chứng minh danh tính.",
    diagram: [
      { label: "Khoá riêng tư không rời máy bạn", arrow: true },
      { label: "Máy chủ chỉ giữ khoá công khai", arrow: true },
      { label: "Không có bí mật nào truyền qua mạng", arrow: true },
      { label: "Nên không có gì để đoán từ xa" },
    ],
    realWorldExample: {
      company: "Nhật ký của một máy chủ mới dựng",
      description:
        "Một máy chủ vừa mở cổng SSH ra Internet thường nhận hàng nghìn lượt thử đăng nhập mỗi ngày, gần như toàn bộ là tự động, thử những tên người dùng và mật khẩu phổ biến. Tắt đăng nhập bằng mật khẩu làm toàn bộ lưu lượng đó thành vô hại ngay lập tức - chúng vẫn tới, nhưng không còn gì để thử.",
    },
    quiz: [
      {
        question: "Khoá riêng tư nên được lưu ở đâu?",
        options: [
          "Trên máy của bạn, có đặt cụm mật khẩu bảo vệ tệp khoá",
          "Trên máy chủ, để bạn đăng nhập được từ bất kỳ máy nào cần dùng tới",
          "Trong một thư mục dùng chung của đội để mọi người vào được cùng một máy",
          "Trong trình quản lý mật khẩu của trình duyệt cùng với các mật khẩu khác",
        ],
        correct: 0,
        explanation:
          "Khoá riêng tư mà rời khỏi máy bạn thì nó không còn riêng tư. Cụm mật khẩu bảo vệ tệp khoá là lớp thứ hai: mất máy thì người nhặt được vẫn chưa dùng được khoá ngay. Đội cần chung quyền thì mỗi người một khoá, cùng thêm vào danh sách được phép.",
      },
      {
        question: "Sau khi bật đăng nhập bằng khoá, việc nên làm tiếp là gì?",
        options: [
          "Tắt hẳn đăng nhập bằng mật khẩu trong cấu hình máy chủ",
          "Đổi cổng SSH sang một số ngẫu nhiên trên bốn mươi nghìn cho khó tìm",
          "Đặt thêm một mật khẩu thật dài cho tài khoản để phòng trường hợp mất khoá",
          "Giới hạn số lần đăng nhập sai trước khi tài khoản bị khoá tạm thời lại",
        ],
        correct: 0,
        explanation:
          "Để mật khẩu vẫn bật nghĩa là lối vào cũ còn nguyên, và toàn bộ lợi ích của khoá biến mất - kẻ tấn công chỉ cần đi đường kia. Ba biện pháp kia đều hữu ích nhưng đều là lớp phụ, và không cái nào thay được việc đóng hẳn lối đoán mật khẩu.",
      },
      {
        question: "Cảnh báo khoá máy chủ đã thay đổi nghĩa là gì?",
        options: [
          "Máy chủ trả về khoá khác lần trước, có thể do dựng lại hoặc bị chen giữa",
          "Khoá riêng tư của bạn đã hết hạn và cần được tạo lại từ đầu",
          "Máy chủ đang yêu cầu bạn đổi mật khẩu vì đã dùng quá lâu không đổi",
          "Kết nối của bạn đang đi qua một mạng riêng ảo nên địa chỉ đã đổi",
        ],
        correct: 0,
        explanation:
          "SSH ghi nhớ khoá của máy chủ ngay lần đầu, nên lần sau khác đi là nó dừng lại và hỏi. Phần lớn trường hợp là bạn vừa dựng lại máy, nhưng đây cũng đúng là dấu hiệu của tấn công chen giữa - nên đừng xoá dòng nhớ đó theo phản xạ mà không kiểm.",
      },
      {
        question: "Vì sao nên tắt đăng nhập thẳng bằng tài khoản quản trị?",
        options: [
          "Vì tên tài khoản đó ai cũng biết, nên chỉ còn mỗi bí mật là mật khẩu",
          "Vì tài khoản quản trị không hỗ trợ đăng nhập bằng khoá công khai",
          "Vì hệ điều hành sẽ ghi nhật ký chậm hơn khi đăng nhập bằng tài khoản đó",
          "Vì các phiên làm việc dưới quyền quản trị luôn bị ngắt sau mười lăm phút",
        ],
        correct: 0,
        explanation:
          "Đăng nhập bằng tài khoản thường rồi nâng quyền khi cần buộc kẻ tấn công phải đoán đúng hai thứ thay vì một, và để lại dấu vết rõ hơn trong nhật ký. Đây là đặc quyền tối thiểu của Bài 2, lần này áp cho phiên đăng nhập.",
      },
      {
        question: "Quyền của tệp khoá riêng tư nên đặt thế nào?",
        options: [
          "Chỉ chủ sở hữu đọc được, không cho nhóm và người khác",
          "Cho cả nhóm đọc để đồng nghiệp dùng chung khi cần trực thay",
          "Cho mọi người đọc nhưng không cho ai ghi vào tệp đó nữa",
          "Không cần đặt gì vì SSH tự bảo vệ tệp khoá bằng cơ chế riêng",
        ],
        correct: 0,
        explanation:
          "SSH từ chối dùng khoá nếu quyền quá rộng, và đó là một trong số ít chỗ phần mềm chủ động ép bạn làm đúng. Cùng nguyên tắc chín ký tự của Bài 2 - lần này với một tệp mà cấp quyền sai là mất luôn máy chủ.",
      },
    ],
    keyTakeaways: [
      "Khoá riêng tư không rời máy bạn, máy chủ chỉ giữ khoá công khai",
      "Bật khoá xong phải tắt hẳn đăng nhập bằng mật khẩu, nếu không lối cũ vẫn mở",
      "Cảnh báo khoá máy chủ đổi là dấu hiệu đáng kiểm, không phải phiền toái để bỏ qua",
      "Đăng nhập bằng tài khoản thường rồi nâng quyền, đừng vào thẳng bằng quản trị",
    ],
    practicePrompt: {
      question:
        "Bạn vừa thêm khoá công khai lên máy chủ và đăng nhập bằng khoá thành công. Việc tiếp theo là gì?",
      options: [
        "Tắt đăng nhập bằng mật khẩu, sau khi đã chắc chắn khoá dùng được",
        "Xoá tài khoản quản trị mặc định của hệ điều hành để giảm bề mặt tấn công",
        "Sao chép khoá riêng tư lên máy chủ để lần sau đăng nhập từ máy khác cho tiện",
        "Đổi cổng SSH sang số khác rồi thông báo cổng mới cho cả đội cùng biết",
      ],
      correct: 0,
      explanation:
        "Thứ tự quan trọng: xác nhận khoá dùng được TRƯỚC, rồi mới tắt mật khẩu - làm ngược lại là tự khoá mình ra ngoài. Phương án ba là sai nghiêm trọng nhất: đưa khoá riêng tư lên máy chủ phá bỏ toàn bộ mô hình bảo mật này.",
    },
    summary: {
      keyIdea: "SSH bằng khoá loại bỏ thứ đoán được từ xa, vì không có bí mật nào truyền qua mạng",
      commonMistake: "Bật khoá nhưng vẫn để đăng nhập bằng mật khẩu, nên lối cũ còn nguyên",
      action: "Kiểm cấu hình SSH của một máy chủ bạn quản và xác nhận mật khẩu đã bị tắt.",
    },
    application: {
      title: "Bốn dòng cấu hình đáng kiểm",
      message:
        "Tắt đăng nhập mật khẩu; tắt đăng nhập thẳng bằng tài khoản quản trị; giới hạn nguồn được phép gọi vào cổng SSH; và đặt quyền tệp khoá chỉ cho chủ sở hữu đọc.",
      secondary:
        "Bốn dòng, làm một lần, và chúng loại gần hết lưu lượng rà quét tự động mà máy chủ nào cũng nhận.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước nói về đường đi tới máy chủ. Bài này nói về cửa mà chính bạn dùng để vào - và vì sao cửa đó nên khoá bằng chìa chứ không bằng mật khẩu.",
      },
      { type: "heading", text: "Cùng một cặp khoá, một mục đích khác" },
      {
        type: "paragraph",
        text: "Khoá riêng tư ký, khoá công khai kiểm - đúng cặp vai đã gặp khi nói về chuỗi khối. Ở đây máy chủ giữ khoá công khai của bạn trong danh sách được phép, và mỗi lần đăng nhập là một lần ký thử thách. Khoá riêng tư không đi đâu cả, nên không có gì để nghe lén và không có gì để đoán.",
      },
      {
        type: "conceptTable",
        title: "Ba tệp bạn sẽ đụng tới",
        subtitle: "Nhầm vai trò của chúng là gốc của phần lớn rắc rối",
        concepts: [
          {
            vi: "Khoá riêng tư",
            en: "Private key",
            def: "Nằm trên máy bạn, không bao giờ sao chép đi đâu. Chỉ chủ sở hữu đọc được, và nên có cụm mật khẩu bảo vệ.",
          },
          {
            vi: "Khoá công khai",
            en: "Public key",
            def: "Sao chép thoải mái. Đây là thứ bạn thêm vào danh sách được phép trên từng máy chủ cần vào.",
          },
          {
            vi: "Khoá của máy chủ",
            en: "Host key",
            def: "Của máy chủ chứ không phải của bạn. SSH nhớ nó lần đầu và cảnh báo nếu lần sau khác đi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Xác nhận trước, tắt sau",
        text: "Thứ tự hai bước này quan trọng hơn vẻ ngoài của nó: tắt đăng nhập mật khẩu trước khi chắc chắn khoá dùng được là cách tự khoá mình ra khỏi máy chủ, và nếu đó là máy ở xa thì bạn không còn đường nào vào lại ngoài bảng điều khiển của nhà cung cấp. Mở một phiên thứ hai để làm chỗ lui là thói quen đáng có.",
      },
      {
        type: "closing",
        lines: [
          "Lối vào an toàn nhất là lối không có gì để đoán, chứ không phải lối có mật khẩu dài nhất.",
          "Bài sau: shell script - gom những việc bạn đang gõ lặp lại mỗi ngày.",
        ],
      },
    ],
  },
  {
    id: 317,
    slug: "ngan-hang-so-va-vi-dien-tu",
    title: "Chặng 12, Bài 8: Shell script - gom việc lặp lại",
    subtitle: "Gõ ba lần cùng một dãy lệnh là lúc nên viết nó ra một tệp",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    whyItMatters:
      "Việc lặp lại bằng tay là nơi sai sót sinh ra: bỏ sót một bước, gõ nhầm một tham số, làm đúng thứ tự hôm nay và sai thứ tự tuần sau. Một tệp script biến quy trình trong đầu bạn thành thứ đọc được, sửa được và chạy lại được giống hệt.",
    openingQuestion: "Khi nào nên gom các lệnh vào một script?",
    openingOptions: [
      "Khi bạn gõ lại lần thứ ba",
      "Khi có hơn mười lệnh cần chạy",
      "Khi cần chạy chúng trên máy chủ",
      "Khi đội có nhiều hơn ba người",
    ],
    correctOption: 0,
    explanation:
      "Ngưỡng hợp lý không nằm ở số lệnh mà ở số lần lặp. Một dãy hai lệnh chạy mỗi ngày đáng viết ra hơn một dãy mười lệnh chạy đúng một lần. Lần thứ ba là mốc tốt vì tới lúc đó bạn đã biết quy trình ổn định và biết chỗ nào hay sai. Giá trị lớn nhất của script cũng không phải tiết kiệm thời gian gõ - nó là biến thứ chỉ tồn tại trong trí nhớ một người thành thứ cả đội đọc được, và biến một quy trình có thể làm sai thứ tự thành một quy trình chạy giống nhau mọi lần.",
    diagram: [
      { label: "Lần một: gõ tay, còn đang thử", arrow: true },
      { label: "Lần hai: gõ lại, bắt đầu thấy quen", arrow: true },
      { label: "Lần ba: viết ra tệp", arrow: true },
      { label: "Từ đó: sửa được, đọc được, lặp được" },
    ],
    realWorldExample: {
      company: "Quy trình nằm trong đầu một người",
      description:
        "Một đội có quy trình phát hành bảy bước mà chỉ một người thuộc. Người đó nghỉ phép một tuần, và đợt phát hành bị hoãn - không phải vì khó, mà vì không ai chắc thứ tự. Viết bảy bước ấy thành một tệp mất nửa giờ, và nó cũng chính là tài liệu mà trước đó không ai viết.",
    },
    quiz: [
      {
        question: "Vì sao nên đặt dừng-khi-lỗi ở đầu mỗi script?",
        options: [
          "Để script dừng ngay tại bước hỏng thay vì chạy tiếp trên trạng thái sai",
          "Để script chạy nhanh hơn vì không phải kiểm tra kết quả sau từng lệnh",
          "Để hệ điều hành ghi lại nhật ký chi tiết hơn cho từng lệnh đã chạy",
          "Để các lệnh phía sau tự động thử lại khi lệnh phía trước thất bại",
        ],
        correct: 0,
        explanation:
          "Mặc định của shell là chạy tiếp bất kể lệnh trước thành công hay không, và đó là mặc định nguy hiểm: bước sao lưu thất bại rồi bước xoá vẫn chạy. Một dòng ở đầu tệp đổi hẳn hành vi đó, và nó thuộc nhóm mặc định-an-toàn của Bài 4.",
      },
      {
        question: "Vì sao nên bọc biến trong dấu nháy kép?",
        options: [
          "Vì đường dẫn có dấu cách sẽ bị tách thành nhiều tham số nếu không bọc",
          "Vì shell chỉ nhận diện biến khi tên biến nằm trong dấu nháy kép",
          "Vì dấu nháy kép giúp shell đọc giá trị biến nhanh hơn khi chạy",
          "Vì không bọc thì giá trị biến sẽ bị chuyển hết thành chữ thường",
        ],
        correct: 0,
        explanation:
          "Đây là lỗi kinh điển và hậu quả có thể rất nặng: một biến chứa đường dẫn có dấu cách, không bọc nháy, đi vào lệnh xoá và xoá nhầm chỗ. Bọc nháy là thói quen rẻ nhất trong toàn bộ việc viết script.",
      },
      {
        question: "Script nên nhận đầu vào qua đâu là tốt nhất?",
        options: [
          "Qua tham số dòng lệnh, để chạy lại với giá trị khác mà không sửa tệp",
          "Ghi thẳng giá trị vào trong tệp, để ai đọc cũng biết nó đang chạy với gì",
          "Qua một tệp cấu hình riêng đặt cùng thư mục với script đó",
          "Hỏi người dùng nhập vào từng lần chạy để tránh nhầm giá trị cũ",
        ],
        correct: 0,
        explanation:
          "Tham số làm script dùng lại được ở nhiều môi trường mà không phải sửa mã - cùng lý do hàm nhận tham số thay vì gán cứng. Hỏi người dùng mỗi lần thì không tự động hoá được, và đó là điều bài sau về cron sẽ cần.",
      },
      {
        question: "Điều gì nên tránh tuyệt đối trong script?",
        options: [
          "Ghi mật khẩu hoặc khoá thẳng vào trong tệp script",
          "Dùng vòng lặp để xử lý danh sách tệp trong một thư mục",
          "Gọi một script khác từ bên trong script hiện tại",
          "In ra màn hình từng bước mà script đang thực hiện",
        ],
        correct: 0,
        explanation:
          "Script thường được đưa vào kho mã, sao chép giữa máy, và chia sẻ trong đội - ba con đường để một bí mật đi ra ngoài. Cách đúng là đọc từ biến môi trường hoặc từ một kho bí mật, để tệp script không bao giờ chứa giá trị thật.",
      },
      {
        question: "Vì sao nên in ra những gì script sắp làm trước khi làm?",
        options: [
          "Để người chạy kịp phát hiện nếu nó nhắm sai đường dẫn hoặc sai máy",
          "Để hệ điều hành có thời gian giải phóng bộ nhớ trước khi thao tác nặng",
          "Để các lệnh phía sau chạy nhanh hơn nhờ đã được nạp sẵn vào bộ nhớ",
          "Để nhật ký hệ thống ghi lại đầy đủ thời điểm bắt đầu của từng bước",
        ],
        correct: 0,
        explanation:
          "Với script có thao tác phá huỷ, một chế độ chạy thử chỉ in ra dự định mà không làm gì là lớp bảo vệ rẻ nhất bạn có thể thêm. Nó bắt được đúng loại lỗi nguy hiểm nhất: chạy đúng script trên nhầm máy.",
      },
    ],
    keyTakeaways: [
      "Ngưỡng viết script là số lần lặp, không phải số lệnh - lần thứ ba là mốc tốt",
      "Đặt dừng-khi-lỗi ở đầu tệp, vì mặc định của shell là chạy tiếp bất kể lỗi",
      "Bọc biến trong nháy kép, nhất là khi biến đó là đường dẫn",
      "Không bao giờ ghi bí mật vào tệp script - đọc từ môi trường hoặc kho bí mật",
    ],
    practicePrompt: {
      question:
        "Script sao lưu của bạn có hai bước: nén thư mục rồi xoá bản nén cũ. Rủi ro lớn nhất là gì?",
      options: [
        "Bước nén thất bại mà script vẫn chạy tiếp sang bước xoá",
        "Bước nén chạy quá lâu khiến script bị hệ thống dừng giữa chừng",
        "Bản nén mới chiếm nhiều dung lượng hơn bản cũ vừa bị xoá đi",
        "Hai bước chạy song song nên bản cũ bị xoá trước khi nén xong",
      ],
      correct: 0,
      explanation:
        "Mặc định của shell là chạy tiếp, nên nén hỏng rồi vẫn xoá là kịch bản có thật và mất dữ liệu thật. Một dòng dừng-khi-lỗi ở đầu tệp loại bỏ hẳn nó - và đây là lý do dòng đó nên có mặt trước cả khi bạn viết lệnh đầu tiên.",
    },
    summary: {
      keyIdea: "Script biến quy trình trong trí nhớ một người thành thứ cả đội đọc được và chạy lại giống nhau",
      commonMistake: "Bỏ dừng-khi-lỗi, nên một bước hỏng vẫn để các bước sau chạy trên trạng thái sai",
      action: "Lấy một dãy lệnh bạn đã gõ ba lần tuần này và viết nó ra một tệp.",
    },
    application: {
      title: "Bốn dòng đầu của mọi script",
      message:
        "Dừng khi có lỗi; báo lỗi khi dùng biến chưa gán; báo lỗi cả khi một lệnh giữa đường ống thất bại; và in ra thứ sắp làm nếu script có thao tác phá huỷ.",
      secondary:
        "Bốn dòng đó không liên quan tới việc script của bạn làm gì, và chúng chặn phần lớn cách mà script gây hại.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước là kiến thức để hiểu máy chủ. Hai bài cuối chặng là công cụ để làm việc với nó hằng ngày mà không phải nhớ mọi thứ trong đầu.",
      },
      { type: "heading", text: "Ngưỡng nằm ở số lần lặp" },
      {
        type: "paragraph",
        text: "Đừng hỏi dãy lệnh này có đủ dài để viết thành script không. Hỏi bạn đã gõ nó bao nhiêu lần. Lần thứ ba là mốc hợp lý: đủ để biết quy trình đã ổn định, và đủ sớm để chưa ai kịp làm sai thứ tự. Thứ bạn thu được không chỉ là thời gian - nó là một quy trình chạy giống nhau mọi lần.",
      },
      {
        type: "conceptTable",
        title: "Ba mặc định của shell nên đổi ngay",
        subtitle: "Cả ba đều đặt ở đầu tệp và không liên quan tới nội dung script",
        concepts: [
          {
            vi: "Dừng khi lỗi",
            en: "set -e",
            def: "Mặc định là chạy tiếp bất kể lỗi. Đây là mặc định nguy hiểm nhất, và đổi nó chỉ tốn một dòng.",
          },
          {
            vi: "Báo lỗi biến chưa gán",
            en: "set -u",
            def: "Không có nó, một biến gõ sai tên trở thành chuỗi rỗng - và một đường dẫn rỗng trong lệnh xoá là chuyện đã xảy ra với nhiều người.",
          },
          {
            vi: "Bắt lỗi trong đường ống",
            en: "set -o pipefail",
            def: "Mặc định chỉ lấy mã trả về của lệnh CUỐI trong chuỗi ống, nên một lệnh giữa đường thất bại sẽ bị bỏ qua hoàn toàn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Script nguy hiểm nhất là script chạy trên nhầm máy",
        text: "Lỗi cú pháp thì shell báo ngay. Lỗi thật sự đắt là một script hoàn toàn đúng chạy trên môi trường không định chạy - dọn dữ liệu thử trên máy sản xuất. Vì vậy với mọi script có thao tác phá huỷ, hãy in ra tên máy và đường dẫn sắp tác động, rồi chờ xác nhận. Rẻ hơn nhiều so với thứ nó ngăn.",
      },
      {
        type: "closing",
        lines: [
          "Viết một việc ra thành tệp là cách rẻ nhất để nó thôi phụ thuộc vào trí nhớ của một người.",
          "Bài sau: cron - để những tệp đó tự chạy đúng giờ mà không cần ai nhớ.",
        ],
      },
    ],
  },
  {
    id: 318,
    slug: "dat-tien-o-dau-cho-tung-muc-dich",
    title: "Chặng 12, Bài 9: Cron và tác vụ chạy định kỳ",
    subtitle: "Chạy đúng giờ là phần dễ; biết nó có chạy hay không mới là phần khó",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⏰",
    track: "personal",
    whyItMatters:
      "Cron là công cụ đầu tiên ai cũng dùng và cũng là công cụ hỏng im lặng nhất: nó không báo gì khi chạy, và cũng không báo gì khi không chạy. Biết trước hai cái bẫy của nó tiết kiệm được kiểu sự cố tệ nhất - phát hiện sau ba tuần rằng bản sao lưu chưa từng chạy.",
    openingQuestion: "Rủi ro lớn nhất của một tác vụ cron là gì?",
    openingOptions: [
      "Hỏng mà không ai biết",
      "Chạy chậm hơn dự kiến",
      "Chiếm quá nhiều bộ nhớ",
      "Khó viết đúng cú pháp giờ",
    ],
    correctOption: 0,
    explanation:
      "Cron chạy lệnh rồi thôi. Nếu lệnh thất bại, mặc định không có ai được báo - đầu ra bị gửi vào thư nội bộ mà gần như không ai đọc, và trên nhiều máy chủ thì bị vứt đi hẳn. Hệ quả là một tác vụ có thể chết từ tuần trước và mọi thứ trông vẫn bình thường cho tới ngày bạn cần thứ nó đáng lẽ tạo ra. Cú pháp năm trường thì khó nhớ thật, nhưng viết sai cú pháp lộ ra ngay; hỏng im lặng thì không. Vì vậy phần quan trọng nhất khi đặt một tác vụ định kỳ không phải là lịch chạy, mà là cách bạn biết nó đã chạy.",
    diagram: [
      { label: "Cron chạy lệnh theo lịch", arrow: true },
      { label: "Lệnh hỏng thì không ai được báo", arrow: true },
      { label: "Đầu ra thường bị vứt đi", arrow: true },
      { label: "Nên phải tự dựng cách biết nó đã chạy" },
    ],
    realWorldExample: {
      company: "Bản sao lưu chưa từng chạy",
      description:
        "Một đội đặt cron sao lưu hằng đêm, kiểm tra thủ công lần đầu thấy chạy được, rồi yên tâm. Ba tháng sau ổ đĩa hỏng, và họ phát hiện tác vụ đã chết từ tuần thứ hai vì một thay đổi đường dẫn. Đây đúng cảnh báo của Chặng 1: bản sao lưu chưa từng phục hồi thử thì chưa phải bản sao lưu - và ở đây nó còn chưa từng được tạo ra.",
    },
    quiz: [
      {
        question: "Vì sao script chạy tay được nhưng vào cron lại hỏng?",
        options: [
          "Vì cron chạy với môi trường tối giản, thiếu biến và đường dẫn quen thuộc",
          "Vì cron giới hạn thời gian chạy tối đa của mỗi tác vụ là năm phút",
          "Vì cron luôn chạy script dưới một tài khoản khách không có quyền ghi",
          "Vì cron không cho phép script gọi tới các lệnh nằm ngoài thư mục gốc",
        ],
        correct: 0,
        explanation:
          "Đây là bẫy phổ biến nhất. Phiên đăng nhập của bạn nạp cả một tập biến môi trường mà cron không có, nên một lệnh tìm thấy khi gõ tay lại không tìm thấy khi cron chạy. Cách chữa gọn: dùng đường dẫn tuyệt đối và tự đặt các biến cần thiết ngay trong script.",
      },
      {
        question: "Cách tốt nhất để biết một tác vụ định kỳ vẫn sống là gì?",
        options: [
          "Cho nó báo về một nơi, và cảnh báo khi quá hạn mà chưa thấy báo",
          "Đọc nhật ký hệ thống mỗi tuần một lần để kiểm tra các dòng liên quan",
          "Đặt thêm một tác vụ thứ hai chạy sau để kiểm tra kết quả của tác vụ đầu",
          "Ghi thời điểm chạy vào một tệp rồi mở tệp đó xem khi thấy nghi ngờ",
        ],
        correct: 0,
        explanation:
          "Điểm mấu chốt là cảnh báo phải kích hoạt khi KHÔNG có tín hiệu, chứ không phải khi có lỗi - vì trường hợp tệ nhất là tác vụ không chạy chút nào, và lúc đó nó cũng chẳng báo lỗi được. Ba cách kia đều đòi hỏi ai đó nhớ đi kiểm.",
      },
      {
        question: "Hai lượt chạy chồng lên nhau gây ra chuyện gì?",
        options: [
          "Hai tiến trình cùng ghi vào một chỗ, dữ liệu có thể hỏng",
          "Cron tự động huỷ lượt thứ hai và ghi lại một cảnh báo trong nhật ký",
          "Lượt thứ hai phải xếp hàng chờ cho tới khi lượt đầu kết thúc hẳn",
          "Hệ điều hành gộp hai lượt thành một để tiết kiệm tài nguyên máy chủ",
        ],
        correct: 0,
        explanation:
          "Cron không hề biết lượt trước đã xong chưa - tới giờ là nó chạy. Một tác vụ mười phút đặt lịch mỗi năm phút sẽ có hai bản cùng chạy. Cách chuẩn là dùng khoá tệp để bản thứ hai tự thoát ngay khi thấy bản đầu còn sống.",
      },
      {
        question: "Vì sao nên ghi nhật ký của tác vụ ra tệp riêng?",
        options: [
          "Vì mặc định đầu ra bị gửi đi hoặc vứt bỏ, nên không còn gì để đọc lại",
          "Vì nhật ký hệ thống chỉ giữ lại các dòng trong vòng hai mươi bốn giờ",
          "Vì cron không có quyền ghi vào nhật ký chung của hệ điều hành",
          "Vì ghi ra tệp riêng làm tác vụ chạy nhanh hơn đáng kể so với ghi chung",
        ],
        correct: 0,
        explanation:
          "Khi sự cố xảy ra, câu hỏi đầu tiên là lần chạy gần nhất báo gì - và nếu đầu ra đã bị vứt thì không ai trả lời được. Chuyển hướng cả đầu ra thường lẫn đầu ra lỗi vào một tệp có xoay vòng là thao tác một lần, dùng lại mãi.",
      },
      {
        question: "Máy chủ đặt múi giờ khác gây ra vấn đề gì với cron?",
        options: [
          "Tác vụ chạy đúng giờ máy chủ nhưng lệch giờ mà bạn đang nghĩ tới",
          "Cron sẽ từ chối chạy các tác vụ có lịch nằm ngoài giờ hành chính",
          "Tác vụ bị chạy hai lần trong ngày để bù cho phần chênh lệch múi giờ",
          "Hệ điều hành tự động chuyển lịch sang múi giờ của người tạo tác vụ",
        ],
        correct: 0,
        explanation:
          "Cron dùng múi giờ của máy chủ, và máy chủ đám mây rất hay để mặc định là giờ quốc tế. Đặt hai giờ sáng cho một tác vụ nặng có thể hoá ra là chín giờ sáng giờ Việt Nam - ngay giữa giờ cao điểm.",
      },
    ],
    keyTakeaways: [
      "Cron hỏng im lặng: không chạy thì cũng không có ai được báo",
      "Môi trường của cron tối giản, nên script chạy tay được vẫn có thể hỏng",
      "Cron không biết lượt trước xong chưa - cần khoá tệp để tránh chạy chồng",
      "Cảnh báo phải kích hoạt khi KHÔNG có tín hiệu, không phải khi có lỗi",
    ],
    practicePrompt: {
      question:
        "Bạn đặt cron sao lưu hằng đêm. Việc quan trọng nhất cần làm thêm là gì?",
      options: [
        "Dựng cảnh báo khi quá hạn mà chưa nhận được tín hiệu chạy xong",
        "Đặt lịch chạy vào lúc hai giờ sáng để tránh giờ cao điểm của hệ thống",
        "Ghi nhật ký của tác vụ ra một tệp riêng để tiện đọc lại khi cần",
        "Nén bản sao lưu lại để tiết kiệm dung lượng ổ đĩa trên máy chủ",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều nên làm, nhưng chúng chỉ hữu ích khi bạn đã biết có chuyện. Cảnh báo theo thiếu-tín-hiệu là thứ duy nhất phát hiện được trường hợp tệ nhất: tác vụ không chạy chút nào, và vì không chạy nên cũng không tạo ra lỗi nào để ai nhìn thấy.",
    },
    summary: {
      keyIdea: "Đặt lịch là phần dễ; phần khó là dựng cách biết tác vụ có thật sự chạy hay không",
      commonMistake: "Kiểm tay một lần rồi coi như xong, trong khi cron hỏng hoàn toàn im lặng",
      action: "Với một tác vụ định kỳ bạn đang có, kiểm xem lần chạy gần nhất là khi nào.",
    },
    application: {
      title: "Bốn việc cho mỗi tác vụ định kỳ",
      message:
        "Dùng đường dẫn tuyệt đối; ghi nhật ký ra tệp riêng; khoá tệp để không chạy chồng; và cảnh báo khi quá hạn mà chưa thấy tín hiệu chạy xong.",
      secondary:
        "Ba việc đầu giúp bạn chẩn đoán khi có sự cố. Việc thứ tư là thứ cho bạn biết đã có sự cố.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước gom việc lặp lại vào một tệp. Bài này để tệp đó tự chạy đúng giờ - và nói về cái giá đi kèm mà ít tài liệu nhắc tới.",
      },
      { type: "heading", text: "Chạy được là một chuyện, biết nó chạy là chuyện khác" },
      {
        type: "paragraph",
        text: "Đặt một dòng lịch là việc của năm phút. Phần còn lại - và phần quyết định tác vụ đó có đáng tin không - là làm sao bạn biết nó vẫn đang chạy. Cron không trả lời câu đó: nó không báo khi chạy xong, không báo khi thất bại, và tuyệt nhiên không báo khi không chạy chút nào.",
      },
      {
        type: "conceptTable",
        title: "Ba cái bẫy quen thuộc",
        subtitle: "Cả ba đều lộ ra muộn, và đó chính là vấn đề",
        concepts: [
          {
            vi: "Môi trường tối giản",
            en: "Minimal environment",
            def: "Cron không nạp biến môi trường của phiên đăng nhập. Script chạy tay được vẫn có thể không tìm thấy lệnh khi cron chạy.",
          },
          {
            vi: "Chạy chồng",
            en: "Overlapping runs",
            def: "Tới giờ là chạy, bất kể lượt trước xong chưa. Cần khoá tệp để bản thứ hai tự thoát.",
          },
          {
            vi: "Hỏng im lặng",
            en: "Silent failure",
            def: "Đầu ra bị vứt, không ai được báo. Chỉ cảnh báo theo thiếu-tín-hiệu mới bắt được trường hợp không chạy chút nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cảnh báo khi vắng mặt, không phải khi có lỗi",
        text: "Đây là điểm đảo ngược so với mọi thứ bạn quen: thường thì hệ thống báo khi có lỗi. Nhưng một tác vụ định kỳ chết hẳn thì không sinh ra lỗi nào - nó chỉ đơn giản là im lặng. Cách duy nhất bắt được là đảo chiều phép kiểm: mỗi lần chạy xong thì báo về một nơi, và nơi đó kêu lên khi quá hạn mà chưa thấy gì.",
      },
      {
        type: "closing",
        lines: [
          "Thứ hỏng đáng sợ nhất không phải thứ kêu to, mà là thứ im lặng đúng lúc bạn cần nó nhất.",
          "Bài sau: gộp cả chặng thành một buổi rà soát máy chủ làm được trong nửa giờ.",
        ],
      },
    ],
  },
  {
    id: 319,
    slug: "ra-soat-tien-gui-hang-nam",
    title: "Chặng 12, Bài 10: Buổi rà soát máy chủ nửa giờ",
    subtitle: "Chín bài trước gộp thành một danh sách chạy được mỗi quý",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Kiến thức hạ tầng dễ đọng lại thành vài lệnh rời rạc rồi quên. Bài cuối gộp cả chặng thành một buổi rà soát có thứ tự, đủ ngắn để làm thật mỗi quý, và đủ đầy để bắt được những thứ trôi dần mà không ai để ý.",
    openingQuestion: "Nên bắt đầu buổi rà soát máy chủ từ đâu?",
    openingOptions: [
      "Từ danh sách cổng đang mở",
      "Từ dung lượng ổ đĩa còn lại",
      "Từ phiên bản hệ điều hành",
      "Từ nhật ký lỗi tuần qua",
    ],
    correctOption: 0,
    explanation:
      "Danh sách cổng đang lắng nghe là thứ trả lời câu hỏi rủi ro nhất - ai từ ngoài vào được - và nó thường là thứ trôi nhiều nhất theo thời gian, vì mỗi lần thử nghiệm một dịch vụ mới lại để lại một cổng mở mà không ai nhớ đóng. Ba mục kia đều đáng kiểm nhưng đứng sau: ổ đĩa đầy thì gây sự cố nhưng có cảnh báo trước, phiên bản cũ là rủi ro chậm, còn nhật ký lỗi thì phản ánh chuyện đã xảy ra chứ không phải cửa còn đang mở. Thứ tự chung của cả buổi: đi từ bề mặt tấn công vào trong, rồi mới tới sức khoẻ vận hành.",
    diagram: [
      { label: "Cổng đang mở - bề mặt tấn công", arrow: true },
      { label: "Quyền và lối vào - SSH, tài khoản", arrow: true },
      { label: "Tác vụ định kỳ - còn chạy không", arrow: true },
      { label: "Sức khoẻ - đĩa, bản vá, chứng chỉ" },
    ],
    realWorldExample: {
      company: "Ba thứ luôn tìm thấy trong buổi rà soát đầu tiên",
      description:
        "Gần như buổi rà soát đầu tiên nào cũng tìm ra ba thứ giống nhau: một cổng mở từ lần thử nghiệm nào đó không ai nhớ, một tác vụ định kỳ đã chết mà không ai biết, và một chứng chỉ sắp hết hạn trong vòng một tháng. Không thứ nào trong ba là sự cố lúc tìm ra - cả ba đều sẽ là sự cố nếu không ai đi tìm.",
    },
    quiz: [
      {
        question: "Vì sao rà soát cổng nên đứng đầu danh sách?",
        options: [
          "Vì nó trả lời câu hỏi ai từ ngoài vào được, và nó trôi nhiều nhất theo thời gian",
          "Vì lệnh liệt kê cổng chạy nhanh hơn các lệnh kiểm tra khác trên máy chủ",
          "Vì hệ điều hành chỉ cho phép xem danh sách cổng vào lúc đầu mỗi phiên đăng nhập của bạn",
          "Vì số cổng mở quyết định lượng bộ nhớ mà hệ thống dành cho phần mạng",
        ],
        correct: 0,
        explanation:
          "Bề mặt tấn công là thứ vừa nguy hiểm nhất vừa dễ trôi nhất, vì mở một cổng thì có người làm còn đóng lại thì thường không ai nhớ. Đặt nó đầu danh sách bảo đảm nó luôn được kiểm, kể cả khi buổi rà soát bị cắt ngắn.",
      },
      {
        question: "Với mỗi tác vụ định kỳ, câu hỏi cần trả lời là gì?",
        options: [
          "Lần chạy thành công gần nhất là khi nào",
          "Tác vụ đó đang chiếm bao nhiêu bộ nhớ khi chạy",
          "Ai là người đã tạo ra tác vụ đó lúc ban đầu",
          "Tác vụ đó có đang chạy đúng múi giờ hay không",
        ],
        correct: 0,
        explanation:
          "Đây là câu hỏi duy nhất phát hiện được kiểu hỏng im lặng của Bài 9. Ba câu kia đều có ích nhưng đều giả định tác vụ vẫn đang chạy - còn câu này kiểm chính giả định đó.",
      },
      {
        question: "Với danh sách tài khoản trên máy, nên tìm gì?",
        options: [
          "Tài khoản của người đã rời đội và khoá công khai không còn ai nhận",
          "Tài khoản có mật khẩu ngắn hơn mười hai ký tự theo quy định chung của đội",
          "Tài khoản chưa đăng nhập lần nào kể từ khi máy chủ được dựng lên",
          "Tài khoản đang chạy nhiều tiến trình nhất trên máy chủ hiện tại",
        ],
        correct: 0,
        explanation:
          "Lối vào của người đã rời đội là rủi ro rõ ràng nhất và cũng bị bỏ quên thường xuyên nhất, vì việc thu hồi quyền hiếm khi nằm trong quy trình bàn giao. Với đăng nhập bằng khoá, cần rà cả danh sách khoá được phép chứ không chỉ danh sách tài khoản.",
      },
      {
        question: "Chứng chỉ TLS nên được kiểm điều gì?",
        options: [
          "Còn bao nhiêu ngày tới hạn, và việc gia hạn có tự động chưa",
          "Được cấp bởi tổ chức nào và tổ chức đó có trụ sở ở đâu",
          "Độ dài khoá có đạt mức khuyến nghị của năm hiện tại hay chưa đạt",
          "Có bao nhiêu tên miền phụ đang dùng chung chứng chỉ đó",
        ],
        correct: 0,
        explanation:
          "Chứng chỉ hết hạn là sự cố hoàn toàn dự đoán được, nên để nó xảy ra là một lỗi vận hành thuần tuý. Hai câu hỏi đó - còn mấy ngày, và gia hạn đã tự động chưa - đủ để loại hẳn cả lớp sự cố này.",
      },
      {
        question: "Nên kết thúc buổi rà soát bằng việc gì?",
        options: [
          "Ghi lại thứ đã sửa và thứ cố ý bỏ qua, kèm lý do",
          "Khởi động lại máy chủ để mọi thay đổi cấu hình có hiệu lực",
          "Tạo một bản sao lưu đầy đủ ngay sau khi rà soát xong",
          "Gửi báo cáo cho toàn đội kèm ảnh chụp màn hình từng bước",
        ],
        correct: 0,
        explanation:
          "Phần giá trị nhất của buổi rà soát nằm ở lần sau: biết thứ gì đã cố ý bỏ qua và vì sao giúp bạn không phải điều tra lại từ đầu. Một danh sách ngắn cũng đủ, miễn là nó tồn tại.",
      },
    ],
    keyTakeaways: [
      "Đi từ bề mặt tấn công vào trong, rồi mới tới sức khoẻ vận hành",
      "Với mỗi tác vụ định kỳ, câu hỏi là lần chạy thành công gần nhất khi nào",
      "Rà cả khoá được phép, không chỉ danh sách tài khoản",
      "Ghi lại thứ cố ý bỏ qua kèm lý do - đó là phần có giá trị cho lần sau",
    ],
    practicePrompt: {
      question:
        "Buổi rà soát tìm ra một cổng mở mà không ai nhớ đã mở. Việc nên làm là gì?",
      options: [
        "Tìm tiến trình đang lắng nghe trên cổng đó rồi quyết định dựa trên nó",
        "Đóng ngay cổng đó lại vì không ai nhớ nghĩa là không ai cần tới nó",
        "Ghi lại vào danh sách theo dõi rồi kiểm tra lại ở buổi rà soát sau",
        "Giới hạn cổng đó chỉ cho phép truy cập từ dải địa chỉ nội bộ của riêng đội",
      ],
      correct: 0,
      explanation:
        "Đóng ngay có thể làm sập một thứ đang phục vụ thật, còn để lại thì rủi ro vẫn nguyên. Bước đúng nằm giữa: một lệnh cho biết tiến trình nào đang nghe, và từ đó câu hỏi trở thành dịch vụ này có cần cho người ngoài gọi vào không - câu mà bạn trả lời được.",
    },
    summary: {
      keyIdea: "Một buổi rà soát nửa giờ mỗi quý bắt được những thứ trôi dần mà không sự cố nào báo trước",
      commonMistake: "Chỉ kiểm khi đã có sự cố, tức là chỉ nhìn thấy thứ đã kêu to",
      action: "Đặt lịch nửa giờ cho quý này và chạy đúng bốn bước trong sơ đồ của bài.",
    },
    application: {
      title: "Danh sách rà soát, theo thứ tự",
      message:
        "Cổng đang mở và tiến trình đứng sau; lối vào gồm tài khoản và khoá được phép; tác vụ định kỳ với lần chạy gần nhất; rồi tới đĩa, bản vá và hạn chứng chỉ.",
      secondary:
        "Ghi lại thứ đã sửa và thứ cố ý bỏ qua kèm lý do - lần sau bạn đọc lại thay vì điều tra lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước đi từ tiến trình tới cron. Bài này gộp chúng thành một việc làm được trong nửa giờ và lặp lại mỗi quý.",
      },
      { type: "heading", text: "Từ ngoài vào trong" },
      {
        type: "paragraph",
        text: "Thứ tự không tuỳ tiện. Bắt đầu từ thứ người ngoài chạm được - cổng đang mở - rồi tới lối vào của chính bạn, rồi tới những thứ chạy ngầm, cuối cùng mới là sức khoẻ chung. Buổi rà soát bị cắt ngắn giữa chừng thì phần bỏ dở cũng là phần ít rủi ro nhất.",
      },
      {
        type: "conceptTable",
        title: "Bốn bước, mỗi bước một câu hỏi",
        subtitle: "Trả lời được bốn câu này là xong buổi rà soát",
        concepts: [
          {
            vi: "Bề mặt tấn công",
            en: "Attack surface",
            def: "Cổng nào đang mở, tiến trình nào đứng sau, và người ngoài có thật sự cần gọi vào không.",
          },
          {
            vi: "Lối vào",
            en: "Access",
            def: "Tài khoản nào còn tồn tại, khoá nào còn trong danh sách được phép, và ai trong số đó đã rời đội.",
          },
          {
            vi: "Việc chạy ngầm",
            en: "Scheduled jobs",
            def: "Mỗi tác vụ định kỳ có lần chạy thành công gần nhất là khi nào - câu hỏi duy nhất bắt được kiểu hỏng im lặng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ba thứ luôn tìm thấy ở lần rà soát đầu tiên",
        text: "Một cổng mở không ai nhớ, một tác vụ định kỳ đã chết, và một chứng chỉ sắp hết hạn. Chúng xuất hiện gần như mọi lần, ở mọi đội, vì cả ba đều là thứ trôi dần mà không sinh ra lỗi nào. Đó chính là lý do buổi rà soát tồn tại - nó đi tìm những thứ không tự kêu lên.",
      },
      {
        type: "closing",
        lines: [
          "Vận hành tốt không phải là xử lý sự cố nhanh, mà là gặp ít sự cố hơn vì đã đi tìm chúng trước.",
          "Chặng sau: đám mây và hạ tầng thuê ngoài - cùng những câu hỏi này, ở quy mô lớn hơn.",
        ],
      },
    ],
  },
];
