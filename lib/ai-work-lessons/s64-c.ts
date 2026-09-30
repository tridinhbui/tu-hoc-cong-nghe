import type { Lesson } from "../lesson-types";

// Chặng 64, bài 11-15. Giáo trình: scripts/curriculum/stage-64.json.
// Không dựa vào tính năng riêng của công cụ nào: nội dung dạy cách hỏi và cách ghi lại,
// và luôn đối chiếu với tài liệu chính thức của bên cung cấp.
export const S64_C_LESSONS: Lesson[] = [
  {
    id: 2690,
    slug: "hoi-nha-cung-cap-gi-ve-du-lieu-ban-dua-vao",
    title: "Chặng 64, Bài 11: Hỏi nhà cung cấp gì về dữ liệu bạn đưa vào",
    subtitle: "Bốn câu hỏi ngắn, hỏi bằng văn bản, trả lời phải có nguồn và có ngày.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "❓",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi phòng bạn muốn dùng một công cụ AI mới, người đầu tiên bị hỏi “có an toàn không?” thường là bạn. Nếu chỉ có câu trả lời miệng của người bán hàng, bạn không có gì để đưa cho sếp hay bộ phận pháp chế. Bốn câu hỏi đúng chỗ biến cảm giác “hình như ổn” thành một trang ghi chú có nguồn, có ngày, ai đọc cũng kiểm lại được.",
    openingQuestion:
      "Nhân viên bán hàng của một công cụ AI nói qua điện thoại: “Dữ liệu của anh chị hoàn toàn an toàn.” Bạn nên làm gì tiếp theo để sếp có cái mà quyết định?",
    openingOptions: [
      "Gửi lại bốn câu hỏi cụ thể bằng văn bản và xin đường dẫn tài liệu chính thức",
      "Ghi nguyên câu đó vào biên bản họp làm bằng chứng vì người bán đã nói rõ ràng",
      "Thử công cụ một tuần với dữ liệu thật rồi xem có sự cố nào xảy ra hay không",
      "Hỏi một đồng nghiệp ở công ty khác xem họ có từng dùng công cụ này chưa",
    ],
    correctOption: 0,
    explanation:
      "“Hoàn toàn an toàn” là một cảm giác, không phải một thông tin: nó không nói dữ liệu được giữ bao lâu, có dùng để huấn luyện không, xoá thế nào, ai đọc được. Lời nói qua điện thoại cũng không để lại dấu vết để kiểm lại. Ghi nó vào biên bản thì chỉ ghi lại một lời hứa, thử bằng dữ liệu thật là đã rủi ro trước khi có câu trả lời, còn kinh nghiệm của đồng nghiệp là thông tin tham khảo chứ không phải cam kết của nhà cung cấp.",
    diagram: [
      { label: "Bốn câu hỏi gửi bằng văn bản", arrow: true },
      { label: "Nhà cung cấp trả lời và chỉ ra tài liệu", arrow: true },
      { label: "Bạn mở tài liệu, chép câu liên quan kèm ngày", arrow: true },
      { label: "Sếp hoặc pháp chế quyết định dựa trên trang ghi chú" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng marketing 8 người",
      description:
        "Một phòng marketing muốn dùng công cụ AI để viết lại nội dung bài đăng. Chị trưởng phòng không hỏi “có an toàn không”, mà gửi bốn câu về lưu giữ, huấn luyện, xoá và người truy cập. Hai câu được trả lời kèm đường dẫn tài liệu, một câu trả lời chung chung, một câu chưa có. Chị ghi rõ câu nào còn trống vào phiếu gửi sếp, và sếp quyết định chỉ cho dùng với nội dung đã công khai cho tới khi có thêm câu trả lời.",
    },
    quiz: [
      {
        question:
          "Sếp hỏi nhà cung cấp có dùng dữ liệu công ty mình để huấn luyện mô hình không. Nguồn trả lời đáng tin nhất là gì?",
        options: [
          "Điều khoản và tài liệu chính thức của nhà cung cấp, ghi lại ngày bạn đọc và đường dẫn",
          "Lời nhân viên bán hàng trong cuộc gọi, vì họ hiểu sản phẩm nhất",
          "Bài đăng của người dùng khác trên mạng nói rằng họ đã thử",
          "Câu trả lời của chính chatbot khi bạn hỏi nó về chính sách dữ liệu",
        ],
        correct: 0,
        explanation:
          "Chỉ tài liệu chính thức mới là cam kết có thể dẫn lại, và điều khoản đổi theo thời gian nên phải ghi ngày đọc. Lời người bán không để lại dấu vết, bài đăng của người dùng là trải nghiệm cá nhân, còn chatbot có thể trả lời nghe rất chắc mà không dựa vào văn bản chính sách nào.",
      },
      {
        question: "Vì sao câu “chúng tôi bảo mật dữ liệu của bạn” là chưa đủ?",
        options: [
          "Nó không nói giữ bao lâu, ai đọc được, xoá thế nào",
          "Vì chữ “bảo mật” chỉ có nghĩa khi dữ liệu được mã hoá bằng khoá riêng của chính bạn",
          "Vì câu đó chỉ dành cho gói miễn phí, còn gói trả phí thì không cần nêu",
          "Vì nhà cung cấp phải nêu con số phần trăm dữ liệu được bảo mật",
        ],
        correct: 0,
        explanation:
          "“Bảo mật” là một khẩu hiệu; thứ bạn cần là các điều cụ thể: thời gian lưu giữ, người truy cập, cách xoá. Mã hoá bằng khoá riêng là một thiết kế cụ thể, không phải điều kiện để chữ đó có nghĩa. Gói miễn phí hay trả phí đều cần trả lời bốn câu hỏi, và không có thứ gọi là phần trăm bảo mật để nêu.",
      },
      {
        question: "Bạn dán bảng báo giá khách vào công cụ rồi muốn xoá. Câu hỏi nào về việc xoá là đủ cụ thể?",
        options: [
          "Xoá trong bao lâu, gồm cả bản sao lưu không, có xác nhận không",
          "Có nút xoá cuộc trò chuyện trên màn hình không, vậy là đủ rồi",
          "Mỗi tháng được xoá bao nhiêu lần mà không bị tính thêm phí",
          "Sau khi xoá, người dùng chung tài khoản có còn thấy nội dung đó trên màn hình của họ không",
        ],
        correct: 0,
        explanation:
          "Nút xoá trên màn hình chỉ ẩn nội dung khỏi tầm nhìn của bạn, chưa nói gì về bản sao lưu hay máy chủ. Phí theo số lần xoá là chuyện giá, không phải chuyện dữ liệu. Câu về người dùng chung tài khoản hỏi về màn hình chứ không hỏi dữ liệu còn nằm ở đâu ở phía nhà cung cấp.",
      },
      {
        question: "Câu hỏi nào khai thác đúng chuyện ai phía nhà cung cấp đọc được nội dung bạn dán vào?",
        options: [
          "Nhân viên của nhà cung cấp hoặc bên thứ ba có được xem nội dung khi nào, vì lý do gì",
          "Đồng nghiệp trong phòng có thấy lịch sử của tôi không",
          "Giao diện có hiện cảnh báo rõ ràng mỗi lần tôi sắp dán dữ liệu nhạy cảm vào ô chat hay không",
          "Tốc độ trả lời có chậm đi khi nhiều người cùng dùng không",
        ],
        correct: 0,
        explanation:
          "Câu hỏi về truy cập phải chỉ vào những người đứng sau hệ thống: nhân viên nhà cung cấp, nhà thầu phụ, trường hợp nào được xem và có ghi lại không. Lịch sử giữa các đồng nghiệp là chuyện phân quyền nội bộ, cảnh báo giao diện là chuyện thiết kế, còn tốc độ không liên quan tới dữ liệu.",
      },
      {
        question: "Nhà cung cấp trả lời: “Xem trang chính sách của chúng tôi.” Việc đúng tiếp theo là gì?",
        options: [
          "Mở trang đó, chép câu liên quan kèm ngày đọc vào danh sách",
          "Coi như đã có câu trả lời và đánh dấu đạt cho cả bốn câu hỏi",
          "Nhờ chatbot của nhà cung cấp tóm tắt trang đó thay bạn đọc",
          "Gửi sếp đường dẫn kèm chữ “an toàn” khi chưa ai mở ra đọc",
        ],
        correct: 0,
        explanation:
          "Đường dẫn chỉ là chỗ để tìm câu trả lời, chưa phải câu trả lời. Bạn phải đọc, chép đúng câu liên quan và ghi ngày vì trang có thể đổi. Đánh dấu đạt khi chưa đọc là tự tin vào thứ chưa thấy, còn nhờ chatbot tóm tắt có thể lại thêm chi tiết không có trong văn bản gốc.",
      },
    ],
    keyTakeaways: [
      "Bốn câu hỏi: lưu giữ bao lâu, có dùng huấn luyện không, xoá thế nào, ai truy cập.",
      "Hỏi bằng văn bản: lời nói qua điện thoại không kiểm lại được.",
      "Mỗi câu trả lời cần một nguồn chính thức và ngày bạn đọc.",
      "Câu nào chưa có trả lời thì ghi là “chưa rõ”, đừng ghi là “đạt”.",
      "Chính sách có thể đổi: ghi ngày để biết bản nào bạn đã đọc.",
    ],
    practicePrompt: {
      question:
        "Bạn nhận được email của nhà cung cấp: “Dữ liệu được xử lý an toàn theo tiêu chuẩn cao nhất.” Bạn ghi gì vào ô “lưu giữ bao lâu” trong danh sách?",
      options: [
        "Chưa rõ: trả lời chưa nêu thời gian, đã hỏi lại ngày hôm nay",
        "Đạt: nhà cung cấp đã xác nhận là an toàn theo tiêu chuẩn cao nhất",
        "Khoảng 30 ngày, vì đó là thời gian phổ biến của các công cụ khác",
        "Bỏ trống ô này để khỏi làm sếp lo lắng vì một chi tiết nhỏ chưa rõ",
      ],
      correct: 0,
      explanation:
        "Câu trả lời không nêu con số nào thì ô đó vẫn là “chưa rõ”, và ghi như vậy là trung thực với sếp. Đoán 30 ngày theo công cụ khác là tự bịa dữ kiện, bỏ trống thì ẩn mất điều sếp cần biết, còn “đạt” chỉ dựa vào một tính từ.",
    },
    summary: {
      keyIdea: "Mỗi lời hứa về dữ liệu cần một nguồn chính thức và một ngày đọc.",
      formula: "Bốn câu hỏi + trả lời bằng văn bản + nguồn + ngày = một trang ghi chú dùng được.",
      commonMistake: "Tin lời người bán hàng hoặc tóm tắt của chatbot thay vì mở tài liệu chính thức.",
      action: "Soạn bốn câu hỏi cho một công cụ phòng bạn đang muốn dùng và gửi bằng email.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đang dùng hoặc muốn dùng. Tìm trang điều khoản hoặc chính sách dữ liệu chính thức của nó, chép vào một trang ghi chú câu liên quan tới bốn điều: lưu giữ, huấn luyện, xoá, người truy cập. Điều nào không tìm thấy thì ghi “chưa rõ” và viết luôn câu hỏi gửi nhà cung cấp.",
      secondary: "Ghi ngày bạn đọc ở đầu trang ghi chú để lần sau biết có cần đọc lại không.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Ba, đồng nghiệp hào hứng: “Công cụ này tóm tắt biên bản giỏi lắm, mình dùng nhé?” Sếp quay sang hỏi bạn một câu: dữ liệu đưa vào đó đi đâu? Bài này cho bạn bốn câu hỏi để trả lời bằng tài liệu thay vì bằng cảm giác.",
      },
      {
        type: "feynman",
        title: "Hỏi nhà cung cấp AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn gửi chìa khoá nhà cho một dịch vụ dọn dẹp. Bạn sẽ không hài lòng với câu “chúng tôi rất đáng tin”; bạn muốn biết họ giữ chìa bao lâu, ai được cầm, có làm bản sao không và khi nào trả lại.",
        columns: ["Điều cần biết", "Gửi chìa khoá cho dịch vụ dọn nhà", "Đưa dữ liệu cho công cụ AI"],
        rows: [
          ["Giữ bao lâu", "Họ giữ chìa tới hết hợp đồng hay tới lúc nào?", "Dữ liệu bạn dán được lưu trong bao lâu, ở đâu?"],
          ["Dùng vào việc khác", "Họ có mang chìa đi làm bản cho việc khác không?", "Có dùng nội dung của bạn để huấn luyện mô hình không?"],
          ["Trả lại", "Trả chìa thế nào, họ có xác nhận không?", "Xoá thế nào, bao lâu, có gồm bản sao lưu không?"],
          ["Ai được cầm", "Chỉ người dọn hay cả người khác trong công ty họ?", "Nhân viên nhà cung cấp hoặc bên thứ ba có được xem không?"],
        ],
        oneLiner: "Hỏi như khi giao chìa khoá nhà: giữ bao lâu, dùng vào đâu, trả lại thế nào, ai được cầm.",
      },
      { type: "heading", text: "Bốn câu hỏi, mỗi câu một dòng trong trang ghi chú" },
      {
        type: "paragraph",
        text: "Trong bài này có hai thuật ngữ mới: “huấn luyện” nghĩa là nhà cung cấp dùng nội dung người dùng để dạy thêm cho mô hình của họ, và “lưu giữ” là thời gian nội dung nằm lại trên hệ thống của họ sau khi bạn dùng xong. Hai điều này thường nằm ở hai chỗ khác nhau trong tài liệu, nên phải hỏi riêng.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi tới trang ghi chú có nguồn",
        steps: [
          { label: "Soạn bốn câu hỏi", detail: "Viết mỗi câu trên một dòng: lưu giữ, huấn luyện, xoá, người truy cập. Nêu rõ loại dữ liệu bạn định đưa vào để họ trả lời đúng ngữ cảnh." },
          { label: "Gửi bằng văn bản", detail: "Gửi qua email hoặc biểu mẫu chính thức để có dấu vết. Lời nói qua điện thoại không ai kiểm lại được sau này." },
          { label: "Đối chiếu tài liệu chính thức", detail: "Với mỗi câu trả lời, mở điều khoản hoặc trang chính sách và tìm câu tương ứng. Nếu câu trả lời khác văn bản, tin văn bản và hỏi lại." },
          { label: "Ghi nguồn và ngày", detail: "Chép câu liên quan, đường dẫn và ngày đọc vào một dòng. Chính sách có thể đổi nên ngày là một phần của câu trả lời." },
          { label: "Đánh dấu điều còn trống", detail: "Câu nào chưa có nguồn thì ghi “chưa rõ”. Sếp cần thấy chỗ trống để quyết định dùng với dữ liệu nào." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu trả lời dùng được",
          text: "Nêu con số hoặc điều kiện cụ thể, chỉ đường dẫn tới văn bản chính thức, nói rõ áp dụng cho gói nào, và viết bằng văn bản để bạn lưu lại.",
        },
        right: {
          label: "Câu trả lời chưa dùng được",
          text: "Chỉ dùng tính từ như “an toàn”, “tiêu chuẩn cao”, “yên tâm”, hoặc nói miệng, hoặc chỉ dẫn chung “xem trang web của chúng tôi” mà không nêu trang nào.",
        },
      },
      {
        type: "callout",
        label: "Đừng nhờ chatbot trả lời thay nhà cung cấp",
        text: "Hỏi chính chatbot “các bạn có dùng dữ liệu của tôi không?” cho ra một câu nghe chắc chắn, nhưng nó có thể không dựa vào văn bản chính sách nào. Chỉ tài liệu chính thức và câu trả lời bằng văn bản của nhà cung cấp mới tính là nguồn.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt chính sách dữ liệu",
        task:
          "Tình huống minh hoạ: trang chính sách của một công cụ tên “X” chỉ ghi ba điều: (1) dữ liệu của khách hàng doanh nghiệp mặc định không dùng để huấn luyện, (2) chưa nêu thời gian lưu giữ, (3) nội dung được xoá khi quản trị viên gửi yêu cầu. Bạn nhờ AI tóm tắt và nó trả về bản dưới đây. Bấm vào những câu không có trong trang chính sách.",
        segments: [
          { text: "Công cụ X mặc định không dùng dữ liệu khách hàng doanh nghiệp để huấn luyện mô hình." },
          {
            text: "Dữ liệu được lưu giữ đúng 30 ngày rồi tự động xoá.",
            error: "Trang chính sách chưa nêu thời gian lưu giữ. Con số 30 ngày là AI tự điền cho nghe cụ thể.",
          },
          { text: "Nội dung được xoá khi quản trị viên của công ty gửi yêu cầu." },
          {
            text: "Việc xoá áp dụng ngay lập tức cho mọi bản sao lưu.",
            error: "Trang chính sách không nói gì về bản sao lưu hay tốc độ xoá. Đây là điều bạn phải hỏi lại, không phải điều đã biết.",
          },
          {
            text: "Nhân viên của nhà cung cấp không bao giờ xem được nội dung khách hàng.",
            error: "Trang không nhắc tới ai được xem. “Không bao giờ” là kết luận AI thêm vào, và là một cam kết mà chưa ai đưa ra.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sếp cần câu trả lời trước thứ Sáu",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: “Em xem công cụ tóm tắt biên bản này có dùng được cho phòng mình không, thứ Sáu anh cần ý kiến.” Bạn chưa biết gì về cách nhà cung cấp xử lý dữ liệu.",
            choices: [
              { label: "Nhắn hỏi anh bán hàng qua chat và chép câu “an toàn” của anh ấy vào báo cáo", next: "bad_oral" },
              { label: "Soạn bốn câu hỏi gửi bằng email và đọc trang chính sách chính thức song song", next: "s2" },
            ],
          },
          bad_oral: {
            text: "Thứ Sáu sếp trình ban giám đốc câu “nhà cung cấp cam kết an toàn”. Pháp chế hỏi cam kết ở văn bản nào, bạn không có. Quyết định bị hoãn và bạn phải làm lại từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Thứ Năm nhà cung cấp trả lời hai câu kèm đường dẫn, một câu chung chung, một câu chưa có. Bạn chỉ còn một buổi chiều.",
            choices: [
              { label: "Điền “đạt” cho cả bốn dòng để báo cáo trông gọn và đủ", next: "bad_fill" },
              { label: "Điền hai dòng có nguồn, ghi “chưa rõ” cho hai dòng còn lại kèm câu hỏi đã gửi", next: "good" },
              { label: "Xoá hai dòng còn thiếu khỏi báo cáo để khỏi bị hỏi", next: "bad_hide" },
            ],
          },
          bad_fill: {
            text: "Sếp cho phép dùng với mọi loại tài liệu. Hai tháng sau có người dán bảng giá khách hàng vào; khi được hỏi bản sao lưu giữ bao lâu, không ai trả lời được vì chưa từng có ai hỏi.",
            ending: "bad",
          },
          bad_hide: {
            text: "Báo cáo nhìn đầy đủ nhưng thiếu đúng hai điều quan trọng nhất. Sếp quyết định mà không biết mình đang bỏ qua điều gì.",
            ending: "bad",
          },
          good: {
            text: "Sếp đọc trang ghi chú, thấy ngay chỗ nào đã rõ và chỗ nào còn trống. Ông cho dùng với nội dung đã công khai trong lúc chờ nhà cung cấp trả lời nốt, và hẹn xem lại khi có văn bản.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bốn câu hỏi, bằng văn bản, có nguồn và có ngày.",
          "Bài sau: điền một phiếu ngắn để đề nghị thêm công cụ mới vào danh sách.",
        ],
      },
    ],
  },
  {
    id: 2691,
    slug: "mini-yeu-cau-them-mot-cong-cu-moi-vao-danh-sach",
    title: "Chặng 64, Bài 12: Mini: yêu cầu thêm một công cụ mới vào danh sách",
    subtitle: "Một phiếu nửa trang: việc cụ thể, dữ liệu cụ thể, nguồn cụ thể.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nếu việc xin thêm công cụ khó hơn việc tự cài, người ta sẽ tự cài. Một phiếu ngắn, biết rõ cần điền gì, làm cho con đường đúng trở thành con đường dễ, và cho người duyệt đủ thông tin để trả lời trong vài ngày thay vì vài tuần.",
    openingQuestion:
      "Bạn thấy một công cụ dịch biên bản họp rất hợp việc của mình, nhưng nó chưa có trong danh sách công cụ được duyệt. Phần nào của phiếu đề nghị quan trọng nhất với người duyệt?",
    openingOptions: [
      "Việc cụ thể bạn sẽ làm và loại dữ liệu nào sẽ được đưa vào công cụ",
      "Một đoạn dài kể công cụ đó nổi tiếng thế nào và nhiều người đang dùng ra sao",
      "Lời hứa rằng bạn sẽ cẩn thận, kèm tên ba đồng nghiệp sẵn sàng bảo lãnh cho bạn",
      "Bản so sánh giá của năm công cụ cùng loại để người duyệt chọn giúp bạn",
    ],
    correctOption: 0,
    explanation:
      "Người duyệt cần trả lời một câu: với việc này và loại dữ liệu này, rủi ro có chấp nhận được không. Việc cụ thể và loại dữ liệu là hai thông tin quyết định câu trả lời đó. Độ nổi tiếng không nói gì về dữ liệu của bạn, lời hứa cẩn thận không thay được thông tin, còn bảng so sánh giá là việc của bộ phận mua sắm và làm phiếu dài thêm mà không giúp quyết định.",
    diagram: [
      { label: "Việc cụ thể bạn muốn làm", arrow: true },
      { label: "Loại dữ liệu sẽ đưa vào", arrow: true },
      { label: "Nguồn chính sách bạn đã đọc", arrow: true },
      { label: "Người duyệt trả lời: dùng, dùng có điều kiện, hoặc chưa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kế hoạch 12 người",
      description:
        "Một phòng có nhiều yêu cầu thêm công cụ gửi bằng tin nhắn một dòng: “cho em dùng app này nhé”. Người duyệt mất nhiều ngày hỏi lại từng việc. Khi phòng đổi sang phiếu nửa trang có năm dòng, đa số yêu cầu được trả lời ngay trong lần đọc đầu, vì mọi thứ người duyệt cần đã nằm sẵn trên phiếu.",
    },
    quiz: [
      {
        question: "Dòng “việc cụ thể” trong phiếu nên viết thế nào?",
        options: [
          "Dịch biên bản họp nội bộ từ tiếng Anh sang tiếng Việt, khoảng 3 bản mỗi tuần",
          "Hỗ trợ công việc hằng ngày cho nhanh hơn và đỡ vất vả hơn cho cả nhóm",
          "Dùng thử một thời gian cho vui và xem nó làm được gì",
          "Tăng năng suất cá nhân và cả nhóm trong năm nay theo mục tiêu chung của công ty",
        ],
        correct: 0,
        explanation:
          "Phiếu tốt nêu việc làm được, đối tượng và tần suất để người duyệt hình dung được dữ liệu chạy qua công cụ. “Hỗ trợ công việc”, “dùng thử” hay “tăng năng suất” đều đúng với mọi công cụ nên không giúp phân biệt việc nào rủi ro thấp, việc nào cao.",
      },
      {
        question: "Bạn định dán biên bản họp có tên khách hàng vào công cụ. Ở dòng “dữ liệu”, ghi thế nào là trung thực?",
        options: [
          "Biên bản nội bộ, có tên khách hàng",
          "Nội dung chung, không có gì nhạy cảm",
          "Dữ liệu công việc thông thường, rủi ro thấp theo đánh giá của tôi",
          "Sẽ làm sạch tên khách hàng trước khi dán, nhưng chưa biết làm thế nào",
        ],
        correct: 0,
        explanation:
          "Dòng dữ liệu phải nêu đúng loại: ở đây là biên bản có tên khách hàng. Viết “không nhạy cảm” khi có tên khách là khai thiếu, còn tự đánh giá “rủi ro thấp” là việc của người duyệt. Hứa làm sạch mà chưa có cách làm thì người duyệt không có gì để tin.",
      },
      {
        question: "Dòng “nguồn chính sách” nên điền gì?",
        options: [
          "Đường dẫn trang chính sách dữ liệu của công cụ, kèm ngày bạn đọc",
          "Tên công ty làm ra công cụ, năm họ thành lập và trụ sở chính ở đâu",
          "Số người dùng mà công cụ tự công bố trên trang chủ của chính nó",
          "Điểm đánh giá của công cụ trên một trang xếp hạng phần mềm nổi tiếng",
        ],
        correct: 0,
        explanation:
          "Người duyệt cần kiểm lại điều bạn đã đọc, nên cần đường dẫn đúng trang và ngày. Tên công ty, số người dùng hay điểm xếp hạng nói về độ phổ biến, không nói dữ liệu được xử lý ra sao.",
      },
      {
        question: "Vì sao phiếu nên có dòng “điều tôi chưa biết”?",
        options: [
          "Để người duyệt thấy chỗ cần hỏi thêm, thay vì tưởng bạn đã kiểm hết",
          "Để phiếu đủ năm dòng cho đẹp, nhìn chuyên nghiệp và khó bị trả lại",
          "Để người duyệt có lý do từ chối ngay mà khỏi đọc phần còn lại",
          "Để bạn tránh phải chịu trách nhiệm nếu công cụ sau này có sự cố",
        ],
        correct: 0,
        explanation:
          "Nói rõ điều chưa biết giúp người duyệt quyết định đúng: cho dùng có điều kiện hoặc hỏi nhà cung cấp. Dòng này không phải để đủ số dòng, để bị từ chối hay để chuyển trách nhiệm đi. Giấu chỗ trống mới là cách làm mất lòng tin.",
      },
      {
        question: "Phiếu được duyệt “có điều kiện: chỉ với tài liệu đã công khai”. Bạn làm gì tuần sau?",
        options: [
          "Dùng công cụ với thông cáo và bài đăng đã đăng, chưa dán tài liệu nội bộ",
          "Dùng với mọi tài liệu vì phiếu đã được duyệt rồi, không cần nhớ điều kiện nữa",
          "Dùng cả tài liệu nội bộ nhưng xoá cuộc trò chuyện ngay sau khi dùng xong",
          "Nhờ đồng nghiệp dán giúp tài liệu nội bộ bằng tài khoản của họ",
        ],
        correct: 0,
        explanation:
          "Điều kiện là một phần của quyết định duyệt. Dùng mọi tài liệu thì bỏ qua điều kiện, xoá cuộc trò chuyện sau khi dán không rút lại được dữ liệu đã gửi đi, và nhờ người khác dán bằng tài khoản của họ là lách điều kiện chứ không tuân theo.",
      },
    ],
    keyTakeaways: [
      "Phiếu nửa trang: công cụ, việc cụ thể, dữ liệu, nguồn chính sách, điều chưa biết.",
      "Việc và dữ liệu càng cụ thể thì người duyệt càng trả lời nhanh.",
      "Điền đúng loại dữ liệu, kể cả khi nó làm phiếu khó được duyệt hơn.",
      "Điều kiện khi duyệt là một phần của quyết định, không phải lời khuyên.",
    ],
    practicePrompt: {
      question:
        "Phiếu của bạn bị trả lại với một dòng: “Chưa rõ dữ liệu nào sẽ được dán vào.” Bạn sửa thế nào?",
      options: [
        "Liệt kê loại tài liệu cụ thể sẽ dán và loại nào sẽ không bao giờ dán",
        "Viết lại cho dài hơn và dùng từ trang trọng hơn để người duyệt an tâm",
        "Gửi lại nguyên phiếu cũ và nhờ sếp trực tiếp gọi cho người duyệt",
        "Bỏ dòng dữ liệu đi vì người duyệt chắc sẽ tự hiểu qua dòng việc",
      ],
      correct: 0,
      explanation:
        "Người duyệt đã nói rõ họ thiếu gì: loại dữ liệu. Liệt kê cả loại sẽ không dán cho thấy bạn hiểu ranh giới. Viết dài hơn không thêm thông tin, nhờ sếp gọi chỉ lách qua vấn đề, còn bỏ dòng dữ liệu đi là bỏ đúng thứ họ cần nhất.",
    },
    summary: {
      keyIdea: "Phiếu đề nghị tốt làm cho việc xin phép dễ hơn việc tự cài.",
      formula: "Việc cụ thể + loại dữ liệu + nguồn chính sách + điều chưa biết = phiếu được trả lời nhanh.",
      commonMistake: "Viết phiếu mơ hồ kiểu “hỗ trợ công việc” rồi ngạc nhiên vì bị hỏi lại nhiều lần.",
      action: "Điền thử một phiếu cho công cụ bạn đang muốn dùng, đủ năm dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn muốn dùng mà chưa chắc được phép. Điền phiếu năm dòng: công cụ, việc cụ thể kèm tần suất, loại dữ liệu sẽ đưa vào và loại sẽ không đưa, đường dẫn chính sách kèm ngày đọc, điều bạn chưa biết. Nếu chưa có mẫu phiếu của công ty, cứ viết vào một email nháp.",
      secondary: "Nhờ một đồng nghiệp đọc thử: họ có trả lời được câu “được hay không” chỉ từ phiếu không?",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Tư, bạn thấy một công cụ dịch biên bản họp tiếng Anh rất hợp việc của mình. Nó chưa có trong danh sách được duyệt. Bạn có hai lựa chọn: tự cài cho nhanh, hoặc điền một phiếu. Bài này làm cho lựa chọn thứ hai chỉ mất mười phút.",
      },
      {
        type: "feynman",
        title: "Phiếu đề nghị công cụ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn xin nhà hàng ăn tối cho đoàn đông người có người dị ứng. Bạn không nói “cho mình ăn nhé”, mà nói số người, món nào cần tránh và giờ đến, để bếp trả lời được ngay.",
        columns: ["Thông tin", "Đặt bàn cho đoàn", "Phiếu đề nghị công cụ AI"],
        rows: [
          ["Làm gì", "Ăn tối cho 12 người vào thứ Sáu", "Dịch biên bản họp, khoảng 3 bản mỗi tuần"],
          ["Điều cần tránh", "Hai người dị ứng hải sản", "Dữ liệu nào tuyệt đối không dán vào"],
          ["Bằng chứng", "Menu bạn đã xem", "Trang chính sách bạn đã đọc, kèm ngày"],
          ["Điều chưa rõ", "Bếp có làm được món chay không?", "Điều bạn chưa biết và đã hỏi nhà cung cấp"],
        ],
        oneLiner: "Phiếu tốt nói việc gì, dữ liệu gì, đã đọc gì và còn chưa biết gì.",
      },
      { type: "heading", text: "Năm dòng của một phiếu" },
      {
        type: "paragraph",
        text: "Một phiếu vừa đủ chỉ có năm dòng. Có hai từ cần nhớ: “phạm vi dùng” là việc cụ thể bạn sẽ làm bằng công cụ này, và “loại dữ liệu” là mức nhạy cảm của thứ bạn đưa vào, như nội dung đã công khai, tài liệu nội bộ hay thông tin khách hàng.",
      },
      {
        type: "list",
        items: [
          "Dòng 1 - Công cụ: tên gọi và đường dẫn chính thức.",
          "Dòng 2 - Việc cụ thể: làm gì, cho ai, bao nhiêu lần mỗi tuần.",
          "Dòng 3 - Dữ liệu: loại sẽ đưa vào, và loại tuyệt đối không đưa.",
          "Dòng 4 - Nguồn chính sách: đường dẫn trang đã đọc và ngày đọc.",
          "Dòng 5 - Điều chưa biết: câu hỏi còn trống, đã hỏi ai, hẹn khi nào.",
        ],
      },
      {
        type: "flow",
        title: "Đường đi của một phiếu",
        steps: [
          { label: "Bạn điền năm dòng", detail: "Viết ngắn, cụ thể, đúng loại dữ liệu. Nếu chưa biết một dòng thì ghi “chưa biết” thay vì bỏ trống." },
          { label: "Người duyệt đọc", detail: "Họ so việc và loại dữ liệu với mức rủi ro cho phép, rồi xem nguồn chính sách có đủ không." },
          { label: "Một trong ba kết quả", detail: "Duyệt, duyệt có điều kiện (ví dụ chỉ với nội dung đã công khai), hoặc chưa duyệt kèm điều cần bổ sung." },
          { label: "Công cụ vào danh sách", detail: "Nếu được duyệt, công cụ và điều kiện của nó được ghi vào danh sách để mọi người cùng tra." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn nháp phiếu đề nghị",
        task:
          "Bạn muốn dùng công cụ dịch biên bản họp tiếng Anh, khoảng 3 bản mỗi tuần, biên bản có tên khách hàng. Lắp yêu cầu để AI soạn nháp phiếu, rồi bạn sẽ kiểm lại từng dòng.",
        parts: [
          {
            id: "job",
            label: "Việc cần làm",
            options: [
              { text: "Soạn phiếu đề nghị công cụ cho tôi.", feedback: "AI không biết công cụ, việc hay dữ liệu, nên sẽ tự điền cho đủ mẫu." },
              {
                text: "Dịch biên bản họp nội bộ tiếng Anh sang tiếng Việt, khoảng 3 bản mỗi tuần, do tôi dùng trong phòng kế hoạch.",
                good: true,
                feedback: "Việc, tần suất và người dùng rõ ràng: nháp phiếu sẽ có dòng “việc cụ thể” dùng được.",
              },
            ],
          },
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              {
                text: "Biên bản có tên khách hàng; tuyệt đối không dán hợp đồng, bảng giá hay thông tin cá nhân.",
                good: true,
                feedback: "Nêu cả loại sẽ dán và loại cấm dán: người duyệt thấy ngay ranh giới.",
              },
              { text: "Dữ liệu công việc bình thường.", feedback: "Mơ hồ: AI sẽ viết “rủi ro thấp” và người duyệt không có gì để đánh giá." },
            ],
          },
          {
            id: "rule",
            label: "Điều AI không được làm",
            options: [
              { text: "Viết cho thuyết phục để được duyệt.", feedback: "Mục tiêu sai: AI sẽ thêm lời quả quyết về an toàn mà bạn chưa kiểm." },
              {
                text: "Không được tự điền chính sách lưu giữ hay huấn luyện; chỗ nào tôi chưa cung cấp, ghi “chưa biết”.",
                good: true,
                feedback: "Cấm bịa kèm chỗ trống rõ ràng: phiếu trung thực và người duyệt thấy điều cần hỏi tiếp.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["job", "data", "rule"],
            text: "1. Công cụ: [bạn điền tên và đường dẫn]\n2. Việc cụ thể: dịch biên bản họp nội bộ tiếng Anh sang tiếng Việt, khoảng 3 bản mỗi tuần, cho phòng kế hoạch.\n3. Dữ liệu: biên bản có tên khách hàng. Không dán hợp đồng, bảng giá hay thông tin cá nhân.\n4. Nguồn chính sách: [chưa biết - bạn điền sau khi đọc]\n5. Điều chưa biết: thời gian lưu giữ; có dùng để huấn luyện không.",
          },
          {
            requires: ["job"],
            text: "1. Công cụ: [tên]\n2. Việc cụ thể: dịch biên bản họp, 3 bản mỗi tuần.\n3. Dữ liệu: dữ liệu công việc thông thường, rủi ro thấp.\n4. Nguồn chính sách: công cụ tuân thủ các tiêu chuẩn bảo mật cao.\n5. Điều chưa biết: không có.\n\n(Dòng 3, 4, 5 đã được AI tự điền nghe trơn tru, nhưng không có gì để kiểm.)",
          },
          {
            text: "Kính gửi bộ phận duyệt, tôi xin đề nghị bổ sung công cụ vô cùng hữu ích này, đã được hàng triệu người tin dùng và đạt chứng nhận bảo mật quốc tế...\n\n(Văn quảng cáo: “hàng triệu người” và “chứng nhận” là AI bịa, còn việc và dữ liệu thì không có.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Phiếu của bạn được duyệt có điều kiện",
        start: "s1",
        nodes: {
          s1: {
            text: "Người duyệt trả lời: “Duyệt có điều kiện: chỉ dùng với nội dung đã công khai, chưa dán biên bản có tên khách.” Nhưng bạn đã hứa với trưởng nhóm sẽ dịch xong 3 biên bản họp khách hàng ngay tuần này.",
            choices: [
              { label: "Dán biên bản có tên khách vào luôn vì công cụ đã được duyệt rồi", next: "bad_ignore" },
              { label: "Nhắn lại người duyệt: nêu việc, hỏi xem làm thế nào để dịch được biên bản có tên khách", next: "s2" },
            ],
          },
          bad_ignore: {
            text: "Tuần sau người duyệt xem nhật ký thấy biên bản có tên khách. Công cụ bị khoá cả phòng, và lần đề nghị sau của bạn bị xem xét rất kỹ.",
            ending: "bad",
          },
          s2: {
            text: "Người duyệt đề nghị hai cách: xoá tên khách khỏi biên bản trước khi dán, hoặc chờ nhà cung cấp trả lời câu hỏi lưu giữ.",
            choices: [
              { label: "Thay tên khách bằng “Khách A, Khách B” rồi dán bản đã làm sạch, ghi chú lại trong phiếu", next: "good" },
              { label: "Làm sạch một nửa số tên cho nhanh, phần còn lại để nguyên vì “khó nhận ra”", next: "bad_half" },
            ],
          },
          bad_half: {
            text: "Một biên bản còn sót tên và số tiền hợp đồng của khách. Dù không ai phát hiện ngay, bạn đã vượt điều kiện và không có gì để trình bày nếu bị hỏi.",
            ending: "bad",
          },
          good: {
            text: "Bạn dịch xong ba biên bản đã thay tên, đối chiếu lại bản gốc khi cần. Người duyệt thấy bạn tuân theo điều kiện nên sẵn sàng xem lại khi nhà cung cấp trả lời đủ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm dòng ngắn: việc cụ thể, dữ liệu, nguồn, điều chưa biết.",
          "Bài sau: dạy cả phòng cách dùng AI an toàn trong 45 phút.",
        ],
      },
    ],
  },
  {
    id: 2692,
    slug: "dao-tao-mot-buoi-45-phut-de-nguoi-ta-nho-den-thu-nam",
    title: "Chặng 64, Bài 13: Buổi đào tạo 45 phút để người ta còn nhớ đến thứ Năm",
    subtitle: "Một ví dụ hỏng, một ví dụ tốt, một bài tay làm ngay.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quy tắc một trang chỉ có tác dụng khi người ta nhớ và dùng nó vào một chiều thứ Năm bận rộn. Buổi đào tạo dài, nhiều slide và đầy thuật ngữ thường bị quên trước khi tới cửa phòng họp. Một buổi ngắn xoay quanh việc thật của chính họ thì để lại thói quen.",
    openingQuestion:
      "Bạn được giao dạy cả phòng cách dùng AI an toàn trong 45 phút. Phần nào nên chiếm nhiều thời gian nhất?",
    openingOptions: [
      "Phần người học tự làm một việc thật trên tài liệu của chính họ",
      "Phần giải thích AI hoạt động ra sao, để họ hiểu sâu nguyên lý bên trong",
      "Phần đọc lại toàn bộ quy tắc của công ty từng điều một cho đầy đủ",
      "Phần giới thiệu tất cả công cụ AI đang có trên thị trường để họ tự chọn",
    ],
    correctOption: 0,
    explanation:
      "Người lớn nhớ cái họ tự làm trong việc của mình lâu hơn cái họ nghe. Một bài tay 15 phút trên tài liệu thật biến quy tắc thành phản xạ. Giảng nguyên lý, đọc hết quy tắc hay điểm danh công cụ là thông tin nhiều nhưng không ai dùng ngay được vào việc thứ Năm, nên dễ quên nhất.",
    diagram: [
      { label: "Mở bằng một ví dụ hỏng có thật trong việc của họ", arrow: true },
      { label: "Cho xem một ví dụ làm tốt, cùng việc", arrow: true },
      { label: "Mỗi người làm một bài tay ngay trong buổi", arrow: true },
      { label: "Cuối buổi: mỗi người mang về một việc để thử trước thứ Năm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng chăm sóc khách hàng 15 người",
      description:
        "Một phòng từng tổ chức buổi đào tạo 90 phút về AI với 60 slide; hai tuần sau khảo sát nhanh cho thấy ít ai nhớ quy tắc nào. Lần sau, người hướng dẫn chỉ dùng 45 phút: một email có dán danh sách khách vào ô chat, cách làm lại an toàn, rồi mỗi người tự làm sạch một email của mình. Điều họ nhớ nhất là bài tay chứ không phải phần giảng.",
    },
    quiz: [
      {
        question: "Cách mở đầu nào giữ chú ý tốt hơn trong buổi 45 phút?",
        options: [
          "Cho xem một ví dụ hỏng từ chính loại việc của họ",
          "Giới thiệu chương trình và mục tiêu của cả buổi theo từng mục",
          "Kể lịch sử của AI từ những năm đầu tới nay để tạo bối cảnh",
          "Trình bày các con số thống kê chung về rủi ro khi dùng AI ở công sở",
        ],
        correct: 0,
        explanation:
          "Ví dụ hỏng trong chính việc của họ khiến người nghe nghĩ “mình cũng từng làm vậy”, đó là lý do để ở lại nghe. Danh sách mục tiêu, lịch sử và thống kê chung đều đúng nhưng không chạm vào việc hôm nay của họ.",
      },
      {
        question: "Vì sao bài tay nên làm bằng tài liệu của chính người học (đã làm sạch), không bằng tài liệu mẫu?",
        options: [
          "Vì khi việc là của mình, cách làm sạch dữ liệu biến thành thói quen thật",
          "Vì tài liệu mẫu do người hướng dẫn soạn thường có lỗi nhỏ nên không nên dùng để học",
          "Vì tài liệu thật giúp người hướng dẫn thu thập dữ liệu về phòng",
          "Vì làm bằng tài liệu mẫu thì cần nhiều thời gian hơn để chuẩn bị",
        ],
        correct: 0,
        explanation:
          "Người học cần thấy cách làm đúng trong đúng loại tài liệu họ gặp hằng ngày. Tài liệu mẫu không có lỗi gì đặc biệt, buổi đào tạo không nhằm thu thập dữ liệu, và chuyện chuẩn bị lâu hay ngắn không phải lý do chọn.",
      },
      {
        question: "Buổi đào tạo có ba phần: ví dụ hỏng, ví dụ tốt, bài tay. Thứ tự hợp lý là gì?",
        options: [
          "Ví dụ hỏng, rồi ví dụ tốt cùng việc, rồi bài tay",
          "Bài tay trước, rồi mới giải thích vì sao phải làm vậy",
          "Ví dụ tốt, rồi bài tay, rồi ví dụ hỏng để kết thúc vui",
          "Ba phần làm song song cho mỗi nhóm một phần rồi trình bày lại",
        ],
        correct: 0,
        explanation:
          "Ví dụ hỏng tạo lý do, ví dụ tốt cho thấy con đường, bài tay giúp họ tự đi. Làm bài tay khi chưa thấy đúng sai thì người học đoán mò, đặt ví dụ hỏng cuối buổi làm người học ra về với hình ảnh sai, còn chia nhóm song song khiến mỗi người chỉ thấy một phần.",
      },
      {
        question: "Cuối buổi, bạn nên xin người học điều gì?",
        options: [
          "Mỗi người chọn một việc thật trước thứ Năm để thử và kể lại",
          "Ký tên xác nhận đã dự buổi đào tạo để lưu vào hồ sơ nhân sự của phòng",
          "Đánh giá điểm từ 1 đến 5 cho người hướng dẫn",
          "Đọc lại toàn bộ tài liệu buổi đào tạo vào tối hôm đó",
        ],
        correct: 0,
        explanation:
          "Một việc cụ thể kèm hạn là cách biến buổi học thành hành động. Chữ ký và điểm đánh giá không đổi thói quen của ai, còn giao đọc lại cả tài liệu buổi tối là việc dễ bị bỏ quên nhất.",
      },
      {
        question: "Một đồng nghiệp hỏi: “Nếu tôi không nhớ quy tắc thì làm sao?” Câu trả lời nào giúp nhiều nhất?",
        options: [
          "Mọi người giữ một thẻ một trang, đính ở nơi làm việc, với ba câu hỏi trước khi dán",
          "Nếu không nhớ thì đừng dùng AI, cứ làm thủ công cho chắc",
          "Hỏi lại người hướng dẫn mỗi lần bạn dùng AI trong tuần tới",
          "Học thuộc toàn bộ quy tắc trong tối nay vì mai sẽ có kiểm tra",
        ],
        correct: 0,
        explanation:
          "Con người không cần nhớ hết mà cần có một thứ nhắc đúng lúc. Thẻ ba câu hỏi ngay trước khi dán là thứ đó. Cấm dùng thì mất lợi ích, hỏi người hướng dẫn mỗi lần không bền, còn kiểm tra học thuộc làm người ta sợ hơn là hiểu.",
      },
    ],
    keyTakeaways: [
      "Ngắn hơn, cụ thể hơn: ba phần và một bài tay.",
      "Mở bằng ví dụ hỏng trong chính việc của họ.",
      "Dành phần lớn thời gian cho bài tay trên tài liệu thật, đã làm sạch.",
      "Kết thúc bằng một việc cụ thể phải thử trước thứ Năm.",
      "Để lại một thẻ nhắc ngắn thay vì đòi người ta nhớ hết.",
    ],
    practicePrompt: {
      question:
        "Còn 10 phút và bạn chưa dạy xong phần “ví dụ tốt”. Bạn cắt phần nào?",
      options: [
        "Cắt bớt phần giải thích thêm, giữ nguyên bài tay và việc mang về",
        "Cắt bài tay vì tự họ sẽ thử sau khi về chỗ ngồi",
        "Cắt việc mang về để kịp nói hết các ví dụ còn lại",
        "Kéo dài thêm 15 phút, vì một buổi đào tạo dở dang thì còn tệ hơn",
      ],
      correct: 0,
      explanation:
        "Bài tay và việc mang về là hai thứ tạo thói quen, đừng cắt. Cắt bài tay để “tự thử sau” thường không bao giờ xảy ra, cắt việc mang về làm buổi học chỉ còn là nghe, còn kéo dài thêm thì làm mất chính lợi thế của buổi 45 phút.",
    },
    summary: {
      keyIdea: "Buổi đào tạo ngắn thắng buổi dài khi nó xoay quanh việc thật và có bài tay.",
      formula: "Ví dụ hỏng + ví dụ tốt + bài tay + một việc mang về = 45 phút còn nhớ tới thứ Năm.",
      commonMistake: "Đọc hết quy tắc và điểm danh công cụ, còn người học chưa được tự làm gì.",
      action: "Phác một buổi 45 phút cho phòng bạn: ghi một ví dụ hỏng, một ví dụ tốt và một bài tay.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Phác kế hoạch một buổi 45 phút cho phòng bạn trên một trang giấy: (1) một ví dụ hỏng có thật trong việc của phòng, đã bỏ tên người và khách, (2) cách làm lại đúng, (3) một bài tay 15 phút, (4) việc mỗi người mang về. Đưa cho một đồng nghiệp đọc và hỏi họ có hình dung được buổi học không.",
      secondary: "Viết ba câu hỏi “trước khi dán” lên một thẻ một trang để phát cuối buổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn dạy cả phòng cách dùng AI an toàn. Thứ Năm, có người dán danh sách khách hàng vào ô chat như chưa từng có buổi học. Khoảng cách đó không nằm ở sự chăm chú của người học mà ở thiết kế buổi học. Bài này đưa ra một thiết kế 45 phút.",
      },
      {
        type: "feynman",
        title: "Một buổi đào tạo nhớ lâu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dạy ai đó đi xe đạp. Bạn không đọc cho họ 40 trang lý thuyết thăng bằng; bạn cho xem một lần ngã, một lần đi đúng, rồi đỡ yên xe cho họ tự đạp.",
        columns: ["Phần", "Dạy đi xe đạp", "Dạy dùng AI an toàn"],
        rows: [
          ["Ví dụ hỏng", "Ngã vì phanh gấp trước khi đổi hướng", "Dán danh sách khách vào ô chat rồi gửi"],
          ["Ví dụ tốt", "Phanh nhẹ, đổi hướng, vẫn đứng vững", "Thay tên bằng “Khách A”, rồi mới dán"],
          ["Tự làm", "Học viên tự đạp, bạn đỡ yên", "Mỗi người làm sạch một email của chính mình"],
          ["Mang về", "Mỗi ngày đạp 10 phút", "Một việc thật để thử trước thứ Năm"],
        ],
        oneLiner: "Cho xem ngã, cho xem đi đúng, rồi để họ tự đạp.",
      },
      { type: "heading", text: "Vấn đề: người ta quên khi chỉ nghe" },
      {
        type: "paragraph",
        text: "Thông tin chỉ nghe thường tan nhanh; thứ người ta tự làm trong việc của mình thì ở lại lâu hơn. Vì vậy 45 phút nên chia thành ba phần, mỗi phần có một nhiệm vụ: ví dụ hỏng để tạo lý do, ví dụ tốt để chỉ đường, bài tay để tạo thói quen. Hai thuật ngữ duy nhất cần dạy là “dữ liệu nhạy cảm” và “làm sạch dữ liệu”.",
      },
      {
        type: "flow",
        title: "Bốn mươi lăm phút chia thế nào",
        steps: [
          { label: "0-7 phút: ví dụ hỏng", detail: "Chiếu một đoạn hội thoại thật trong loại việc của phòng, đã bỏ tên. Hỏi cả phòng: chỗ nào nên dừng lại?" },
          { label: "7-17 phút: ví dụ tốt", detail: "Làm lại đúng cùng việc đó trước mặt mọi người: làm sạch, hỏi, kiểm kết quả. Nói to từng bước đang nghĩ gì." },
          { label: "17-37 phút: bài tay", detail: "Mỗi người lấy một tài liệu của chính mình, làm sạch theo cách vừa thấy. Người hướng dẫn đi quanh xem và chỉ chỗ sót." },
          { label: "37-45 phút: mang về", detail: "Mỗi người ghi một việc sẽ thử trước thứ Năm, nhận thẻ ba câu hỏi “trước khi dán”, rồi kết thúc đúng giờ." },
        ],
      },
      {
        type: "list",
        items: [
          "Ví dụ hỏng phải lấy từ việc của chính họ, đã bỏ tên người và khách.",
          "Ví dụ tốt cùng việc đó, để so sánh được từng bước.",
          "Bài tay dùng tài liệu thật đã làm sạch, hoặc bản mẫu giống tới mức không phân biệt được.",
          "Chỉ dạy hai thuật ngữ mới; mọi thứ khác dùng chữ đời thường.",
        ],
      },
      {
        type: "callout",
        label: "Đừng nhồi thêm",
        text: "Mỗi khi muốn thêm một slide “cho đầy đủ”, hãy hỏi: người học có dùng được điều này vào việc thứ Năm không? Nếu không, để vào tài liệu đọc thêm chứ đừng đưa vào buổi học.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai, còn một tiếng trước buổi đào tạo",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 60 slide của bộ phận IT gửi sang. Buổi học 45 phút, 15 người. Bạn chỉ còn một tiếng chuẩn bị.",
            choices: [
              { label: "Chiếu lần lượt cả 60 slide, nói nhanh để kịp", next: "bad_slides" },
              { label: "Chọn một ví dụ hỏng, một ví dụ tốt và một bài tay, bỏ phần còn lại vào tài liệu đọc thêm", next: "s2" },
            ],
          },
          bad_slides: {
            text: "Hết 45 phút, bạn mới tới slide 38. Mọi người gật đầu lịch sự. Thứ Năm có người hỏi: “Quy tắc nào nói về danh sách khách nhỉ?”",
            ending: "bad",
          },
          s2: {
            text: "Bạn chọn ví dụ: một email gửi khách có dán cả danh sách. Tới phần bài tay, một người nói: “Tài liệu của em nhạy cảm, em không dán lên màn hình chung được.”",
            choices: [
              { label: "Bảo họ cứ mở lên, vì đây là buổi học nội bộ", next: "bad_push" },
              { label: "Cho họ làm trên máy mình, tự thay tên bằng ký hiệu, không ai phải chiếu lên", next: "good" },
            ],
          },
          bad_push: {
            text: "Người đó im lặng, mở một tài liệu khác không liên quan cho xong. Bài tay mất ý nghĩa với người cần nó nhất, và cả phòng thấy buổi học chưa tôn trọng dữ liệu của họ.",
            ending: "bad",
          },
          good: {
            text: "Mỗi người làm sạch trên máy mình, bạn đi quanh chỉ những chỗ sót như tên viết tắt và số điện thoại. Cuối buổi ai cũng ghi được một việc để thử trước thứ Năm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ví dụ hỏng, ví dụ tốt, bài tay, một việc mang về.",
          "Bài sau: tạo bài tập tìm lỗi để nhân viên mới tự luyện.",
        ],
      },
    ],
  },
  {
    id: 2693,
    slug: "bai-tap-tim-loi-cho-nhan-vien-moi-dung-ai-an-toan",
    title: "Chặng 64, Bài 14: Bài tập tìm lỗi cho nhân viên mới: dùng AI an toàn",
    subtitle: "Ba đoạn hội thoại, mỗi đoạn một chỗ dán không nên dán.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhân viên mới dễ làm đúng quy tắc nhất khi họ đã từng tự nhận ra lỗi của người khác. Một bài tập tìm lỗi ngắn, làm trong ngày đầu, rẻ hơn nhiều so với một sự cố ở tuần thứ hai, và cho bạn biết người mới hiểu tới đâu trước khi họ chạm vào dữ liệu thật.",
    openingQuestion:
      "Bạn soạn bài tập tìm lỗi cho nhân viên mới: một đoạn hội thoại với AI có chỗ dán dữ liệu không nên dán. Đoạn nào là bài tập tốt nhất?",
    openingOptions: [
      "Một đoạn trông rất bình thường, lỗi nằm ở một dòng dán bảng khách hàng có tên và số điện thoại",
      "Một đoạn mà ngay dòng đầu người dán đã viết “đây là dữ liệu mật” để lỗi lộ rõ",
      "Một đoạn chỉ có câu hỏi về thời tiết hôm nay cho thấy người dùng vô tư",
      "Một đoạn rất ngắn hai dòng, mỗi dòng đều là lời chào",
    ],
    correctOption: 0,
    explanation:
      "Bài tập tốt giống thật: lỗi nằm lẫn giữa thao tác bình thường như ngoài đời, nên người học phải tự nhận ra. Nếu lỗi được dán nhãn sẵn thì không cần nhận ra gì cả, đoạn chỉ có thời tiết không có lỗi nào để tìm, còn đoạn chỉ có lời chào không chứa dữ liệu nào để phán đoán.",
    diagram: [
      { label: "Viết hội thoại giống ngoài đời", arrow: true },
      { label: "Giấu đúng một chỗ dán không nên", arrow: true },
      { label: "Người học chỉ ra chỗ đó và nói vì sao", arrow: true },
      { label: "So với đáp án, nói cách làm lại an toàn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: bộ phận nhân sự của một công ty 120 người",
      description:
        "Bộ phận nhân sự tạo ba đoạn hội thoại dùng chung cho mọi nhân viên mới: một đoạn có dán danh sách ứng viên, một đoạn dán đoạn hợp đồng khách, một đoạn dán số liệu doanh thu chưa công bố. Nhân viên mới làm bài trong ngày đầu, và người hướng dẫn chỉ cần xem ai bỏ sót đoạn nào để biết nhắc điều gì trong tuần đầu.",
    },
    quiz: [
      {
        question: "Đoạn hội thoại nào là chỗ dán không nên: người dùng nhờ AI “viết lại email cho lịch sự hơn”?",
        options: [
          "Email có kèm họ tên, số điện thoại và địa chỉ giao hàng của khách",
          "Email hẹn họp giữa hai đồng nghiệp, chỉ có giờ và phòng",
          "Email cảm ơn đồng nghiệp đã hỗ trợ trong dự án tuần trước",
          "Email nhắc cả nhóm nộp báo cáo vào chiều thứ Sáu",
        ],
        correct: 0,
        explanation:
          "Họ tên, số điện thoại và địa chỉ là thông tin cá nhân của khách, nên không đưa vào công cụ chưa được duyệt. Email hẹn họp, cảm ơn hay nhắc hạn không chứa dữ liệu cá nhân hay bí mật nên không phải chỗ lỗi.",
      },
      {
        question: "Một nhân viên mới dán bảng doanh thu quý chưa công bố vào ô chat “để AI vẽ biểu đồ”. Vì sao là lỗi?",
        options: [
          "Số liệu chưa công bố bị gửi ra ngoài công ty, dù mục đích chỉ là vẽ biểu đồ",
          "Vì AI không biết vẽ biểu đồ từ bảng số liệu nên kết quả nhất định sẽ bị sai lệch",
          "Vì bảng số liệu dài quá sẽ làm công cụ chạy rất chậm",
          "Vì doanh thu quý chỉ được xem bởi phòng kế toán, không ai khác",
        ],
        correct: 0,
        explanation:
          "Vấn đề không nằm ở chất lượng biểu đồ mà ở chỗ số liệu đã rời khỏi công ty. Mục đích tốt không làm dữ liệu bớt nhạy cảm. Việc AI vẽ tốt hay không và bảng dài hay ngắn đều không phải lý do, còn chuyện ai được xem lại phụ thuộc vào quy định của công ty, không phải một luật chung.",
      },
      {
        question: "Cách làm lại an toàn cho một email có tên khách hàng là gì?",
        options: [
          "Thay tên và số liên lạc bằng “Khách A”, rồi dán phần còn lại",
          "Xoá nguyên email rồi gõ lại toàn bộ từ đầu bằng tay",
          "Giữ nguyên tên, chỉ bỏ dấu cho AI khó nhận ra đó là tên người",
          "Dán cả email nhưng thêm câu “đừng lưu lại thông tin này”",
        ],
        correct: 0,
        explanation:
          "Thay bằng ký hiệu giữ được nội dung cần nhờ AI mà bỏ phần nhận dạng. Gõ lại bằng tay thì mất lợi ích của công cụ, bỏ dấu tên vẫn là tên, và một câu dặn AI đừng lưu không thay được chính sách của nhà cung cấp về lưu giữ dữ liệu.",
      },
      {
        question: "Bạn làm bài tập cho nhân viên mới. Đoạn hội thoại nên có bao nhiêu chỗ lỗi?",
        options: [
          "Đúng một chỗ, để người học tập trung nhận ra và giải thích",
          "Càng nhiều chỗ càng tốt để kiểm tra người học có tinh mắt không",
          "Không có chỗ nào, để xem người học có lo xa quá mức không",
          "Hai chỗ trở lên nhưng không có đáp án để họ tự thảo luận",
        ],
        correct: 0,
        explanation:
          "Một chỗ lỗi rõ ràng giúp người học luyện đúng một phản xạ và bạn chấm được. Quá nhiều chỗ thì họ bị ngợp, không có chỗ nào thì họ dễ nghi ngờ mọi thứ, và thiếu đáp án thì không ai biết mình đúng hay sai.",
      },
      {
        question: "Người học chỉ ra đúng chỗ lỗi nhưng không giải thích được vì sao. Bạn nên làm gì?",
        options: [
          "Hỏi họ dữ liệu đó có thể đi đâu nếu bị gửi ra ngoài công ty, rồi cùng nói tiếp",
          "Đánh dấu đạt vì họ đã chỉ đúng chỗ rồi",
          "Đọc điều khoản tương ứng trong quy tắc cho họ nghe và sang đoạn tiếp theo",
          "Bắt họ làm lại cả bài tập từ đầu cho tới khi giải thích được",
        ],
        correct: 0,
        explanation:
          "Chỉ đúng chỗ mà không biết vì sao thì lần sau sẽ sót ở đoạn khác. Câu hỏi về đường đi của dữ liệu dẫn họ tự hiểu lý do. Đánh dấu đạt bỏ phí cơ hội dạy, đọc điều khoản thì quay lại kiểu đọc một chiều, còn bắt làm lại cả bài thì khiến người mới nản.",
      },
    ],
    keyTakeaways: [
      "Bài tập tìm lỗi: giống thật, lỗi lẫn trong thao tác bình thường, đúng một chỗ.",
      "Người học phải nói được vì sao, không chỉ chỉ ra chỗ.",
      "Đưa kèm cách làm lại an toàn: thay tên bằng ký hiệu, bỏ phần nhận dạng.",
      "Làm bài trong ngày đầu, trước khi chạm vào dữ liệu thật.",
    ],
    practicePrompt: {
      question:
        "Bạn viết đoạn hội thoại mẫu nhưng dòng lỗi có chữ “[DỮ LIỆU MẬT]” đứng ngay trước. Có vấn đề gì?",
      options: [
        "Lỗi được dán nhãn sẵn nên người học không cần nhận ra gì cả",
        "Không có vấn đề gì, vì nhãn giúp người mới khỏi bối rối",
        "Chữ in hoa trông thiếu chuyên nghiệp trong một tài liệu đào tạo",
        "Nhãn chiếm chỗ và làm đoạn hội thoại dài hơn cần thiết",
      ],
      correct: 0,
      explanation:
        "Bài tập tìm lỗi chỉ có giá trị khi người học tự nhận ra. Dán nhãn sẵn thì họ chỉ đọc nhãn. Chuyện bối rối của người mới nên giải quyết bằng phần giải thích sau bài, còn kiểu chữ hay độ dài không phải vấn đề chính.",
    },
    summary: {
      keyIdea: "Nhận ra lỗi của người khác là cách luyện nhanh nhất để không mắc lỗi đó.",
      formula: "Hội thoại giống thật + đúng một chỗ lỗi + giải thích vì sao + cách làm lại = một bài tập.",
      commonMistake: "Đánh dấu chỗ lỗi sẵn hoặc nhét quá nhiều lỗi, khiến người học không luyện được gì.",
      action: "Soạn một đoạn hội thoại với AI có một chỗ dán không nên, dựa trên việc thật của phòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Soạn một đoạn hội thoại 6-8 dòng giữa một nhân viên và một công cụ AI, dựa trên một việc thật trong phòng bạn. Ở một dòng, cho nhân viên dán một loại dữ liệu không nên dán (đã đổi hết tên, số và chi tiết thật). Ghi riêng đáp án: dòng nào, vì sao, làm lại thế nào. Đưa cho một đồng nghiệp làm thử.",
      secondary: "Hỏi đồng nghiệp: họ có nhận ra chỗ lỗi không, và có thấy đoạn hội thoại giống thật không?",
    },
    sections: [
      {
        type: "lead",
        text: "Ngày đầu đi làm, bạn mới nhận máy và tài khoản. Tuần đầu, bạn đã có thể dán thứ gì đó vào một ô chat chỉ vì “ai cũng làm vậy”. Bài này cho bạn một cách rẻ để dạy người mới nhận ra lỗi trước khi họ mắc nó.",
      },
      {
        type: "feynman",
        title: "Bài tập tìm lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung người mới học lái xe. Trước khi ra đường, họ xem video về một cú rẽ không bật xi nhan và được hỏi: lỗi ở đâu? Họ nhớ chỗ đó lâu hơn cả một bài giảng về luật giao thông.",
        columns: ["Phần", "Học lái xe", "Học dùng AI an toàn"],
        rows: [
          ["Tình huống", "Video một cú rẽ ngoài phố", "Một đoạn hội thoại với AI về việc thật của phòng"],
          ["Chỗ lỗi", "Quên bật xi nhan", "Một dòng dán bảng có tên và số điện thoại khách"],
          ["Câu hỏi", "Lỗi ở đâu, vì sao nguy hiểm?", "Lỗi ở đâu, dữ liệu đó có thể đi đâu?"],
          ["Làm lại", "Bật xi nhan trước khi rẽ", "Thay tên bằng “Khách A”, bỏ số liên lạc"],
        ],
        oneLiner: "Cho người mới thấy một cú lỗi trước khi họ tự mắc nó.",
      },
      { type: "heading", text: "Một bài tập gồm những gì" },
      {
        type: "paragraph",
        text: "Một bài tập tìm lỗi có ba hội thoại, mỗi hội thoại khoảng 6-8 dòng, đúng một chỗ dán không nên dán. Hai thuật ngữ đáng dạy là “dữ liệu cá nhân” (thông tin nhận ra được một người) và “dữ liệu chưa công bố” (số liệu hoặc kế hoạch công ty chưa cho ra ngoài).",
      },
      {
        type: "flow",
        title: "Soạn một bài tập trong 20 phút",
        steps: [
          { label: "Chọn một việc thật", detail: "Lấy việc người mới sẽ làm: soạn email khách, tóm tắt họp, làm báo cáo. Bài tập giống việc thật thì mới luyện được phản xạ thật." },
          { label: "Viết hội thoại bình thường", detail: "Sáu tới tám dòng với cách nói người thật hay dùng. Bỏ hết tên, số, chi tiết thật của khách và nhân viên." },
          { label: "Giấu một chỗ lỗi", detail: "Chọn một dòng người dùng dán dữ liệu không nên dán. Đừng đánh dấu, đừng đặt nhãn, đừng làm nó nổi hơn các dòng khác." },
          { label: "Viết đáp án riêng", detail: "Ghi dòng nào, dữ liệu đó có thể đi đâu, và cách làm lại an toàn. Đáp án tách khỏi bài để người học tự nghĩ trước." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Đoạn hội thoại số 1: soạn email nhắc thanh toán",
        task:
          "Tình huống minh hoạ: một nhân viên mới nhờ AI soạn email nhắc khách thanh toán. Đọc đoạn hội thoại, bấm vào dòng nào có chỗ dán không nên dán.",
        segments: [
          { text: "Nhân viên: “Chào, mình cần viết email nhắc khách thanh toán hoá đơn trễ hạn, giọng lịch sự.”" },
          { text: "AI: “Bạn cho mình biết khoảng thời gian trễ hạn và bạn muốn đề nghị gì?”" },
          {
            text: "Nhân viên: “Đây nhé: bảng công nợ tháng 9 gồm họ tên, số điện thoại, địa chỉ và số tiền nợ của 40 khách.” (dán cả bảng)",
            error: "Bảng này chứa thông tin cá nhân và số tiền nợ của 40 khách, đã gửi ra ngoài công ty. Chỉ cần mô tả một ca mẫu đã thay tên bằng “Khách A”.",
          },
          { text: "AI: “Đây là bản nháp email nhắc thanh toán, bạn sửa tên người nhận trước khi gửi.”" },
          { text: "Nhân viên: “Cảm ơn, mình sẽ đọc lại số tiền rồi mới gửi.”" },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Đoạn hội thoại số 2: tóm tắt một buổi họp",
        task:
          "Tình huống minh hoạ: một nhân viên mới nhờ AI tóm tắt biên bản họp. Bấm vào dòng có dữ liệu không nên dán.",
        segments: [
          { text: "Nhân viên: “Mình cần tóm tắt biên bản họp tuần thành 5 ý chính.”" },
          {
            text: "Nhân viên: “Biên bản đây: kế hoạch ra mắt sản phẩm mới vào tháng sau, giá dự kiến, danh sách đối tác chưa công bố.” (dán nguyên biên bản)",
            error: "Kế hoạch ra mắt, giá dự kiến và danh sách đối tác chưa công bố là thông tin nội bộ chưa được phép ra ngoài công ty.",
          },
          { text: "AI: “Năm ý chính là: mốc ra mắt, giá, đối tác, rủi ro, việc cần làm.”" },
          { text: "Nhân viên: “Tốt, mình sẽ đối chiếu từng ý với biên bản gốc trước khi gửi.”" },
        ],
      },
      {
        type: "scenario",
        title: "Chị Hà chấm bài tập của nhân viên mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Nam là nhân viên mới. Anh làm bài tập và bỏ sót đoạn số 2, nhưng chỉ đúng đoạn số 1 và 3. Chị Hà, người hướng dẫn, đang xem kết quả.",
            choices: [
              { label: "Đánh dấu “chưa đạt”, nhắn anh Nam phải làm lại cả bài tập cho nghiêm túc", next: "bad_harsh" },
              { label: "Hỏi anh Nam khi đọc đoạn 2 anh nghĩ dữ liệu đi đâu, rồi cùng xem dòng bị sót", next: "s2" },
            ],
          },
          bad_harsh: {
            text: "Anh Nam làm lại, đúng cả ba đoạn, nhưng từ đó anh ít hỏi chị Hà những câu mơ hồ. Tuần sau anh tự quyết định một việc mà lẽ ra nên hỏi.",
            ending: "bad",
          },
          s2: {
            text: "Anh Nam nói: “Em nghĩ biên bản nội bộ thì dán cho AI tóm tắt cũng được, vì em không ghi tên khách.”",
            choices: [
              { label: "Nói: “Đúng, không tên khách thì ổn”, rồi sang đoạn tiếp theo", next: "bad_agree" },
              { label: "Giải thích: kế hoạch ra mắt và giá dự kiến cũng là dữ liệu chưa công bố, dù không có tên ai", next: "good" },
            ],
          },
          bad_agree: {
            text: "Anh Nam ghi nhớ sai một điều: “không tên khách là an toàn”. Tuần sau anh dán bảng giá nội bộ vào ô chat với cùng lý do.",
            ending: "bad",
          },
          good: {
            text: "Anh Nam hiểu rằng dữ liệu nhạy cảm không chỉ là tên người mà còn là kế hoạch, giá và đối tác chưa công bố. Anh làm lại đoạn 2 bằng cách mô tả chung mà không dán biên bản.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba hội thoại, mỗi hội thoại một chỗ lỗi, kèm lý do và cách làm lại.",
          "Bài sau: người quản lý hỏi gì khi nhận kết quả có AI hỗ trợ.",
        ],
      },
    ],
  },
  {
    id: 2694,
    slug: "nguoi-quan-ly-phai-hoi-gi-khi-cap-duoi-nop-ket-qua-do-ai",
    title: "Chặng 64, Bài 15: Người quản lý hỏi gì khi cấp dưới nộp kết quả có AI hỗ trợ",
    subtitle: "Ba câu hỏi để duyệt kỹ mà người nộp không thấy bị nghi ngờ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi cấp dưới nộp một báo cáo trôi chảy, người quản lý không biết phần nào do người viết, phần nào do AI, và phần nào đã được kiểm. Hỏi sai kiểu thì hoặc bỏ sót lỗi, hoặc làm người ta giấu việc dùng AI. Ba câu hỏi đúng giữ được cả chất lượng lẫn sự trung thực.",
    openingQuestion:
      "Cấp dưới nộp bản tóm tắt thị trường rất trơn tru, bạn đoán có AI hỗ trợ. Cách mở đầu nào giữ được sự trung thực của họ?",
    openingOptions: [
      "Hỏi tự nhiên: “Phần nào em đã kiểm lại với nguồn gốc?”",
      "Hỏi thẳng: “Cái này có phải AI viết không, nói thật đi?”",
      "Im lặng, tự kiểm toàn bộ số liệu rồi âm thầm sửa lỗi giúp họ",
      "Yêu cầu họ cam kết bằng văn bản là không dùng AI lần sau",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi về phần đã kiểm áp dụng cho mọi kết quả, dù có AI hay không, nên người nộp không thấy bị nghi ngờ và sẵn sàng kể thật. Hỏi thẳng kiểu chất vấn khiến họ giấu lần sau, tự kiểm âm thầm làm người nộp không học được gì và bạn mất thời gian, còn bắt cam kết không dùng AI là cấm chứ không phải quản lý chất lượng.",
    diagram: [
      { label: "Nhận kết quả, đoán có AI hỗ trợ", arrow: true },
      { label: "Hỏi ba câu giống nhau cho mọi kết quả", arrow: true },
      { label: "Nghe: phần nào đã kiểm, phần nào chưa", arrow: true },
      { label: "Quyết định: nhận, yêu cầu kiểm thêm, hoặc trả lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm phân tích 6 người",
      description:
        "Một trưởng nhóm từng hỏi “em có dùng AI không?” và nhận về câu trả lời ngập ngừng. Khi đổi sang hỏi ba câu về dữ liệu đã đưa vào, phần đã kiểm, và phần là ý riêng, các báo cáo tới tay chị kèm sẵn một dòng ghi chú ngắn. Chị thôi phải đoán, và các lỗi số liệu được bắt từ trước khi báo cáo lên giám đốc.",
    },
    quiz: [
      {
        question: "Ba câu hỏi nào giúp người quản lý duyệt kết quả có AI hỗ trợ mà không làm người nộp phòng thủ?",
        options: [
          "Dữ liệu nào đã đưa vào, phần nào đã kiểm lại, phần nào là ý của riêng em",
          "Em dùng công cụ nào, dùng mất bao lâu, em có bị phụ thuộc vào nó không",
          "Em có chắc không, em có dám ký tên bảo đảm không, lần sau em có dùng nữa không",
          "Em tốn bao nhiêu tiền cho công cụ, có ai hướng dẫn em không, em học được gì",
        ],
        correct: 0,
        explanation:
          "Ba câu đầu trả lời đúng ba điều quản lý cần: dữ liệu có an toàn không, chất lượng đã kiểm chưa, ai chịu trách nhiệm về ý kiến. Các bộ câu hỏi khác hoặc nói về công cụ và chi phí, hoặc mang giọng chất vấn chứ không giúp đánh giá kết quả.",
      },
      {
        question: "Người nộp trả lời: “Em đã kiểm hết rồi ạ.” Bạn hỏi tiếp câu nào hữu ích nhất?",
        options: [
          "Em kiểm con số nào, đối chiếu nguồn nào?",
          "Em kiểm bằng cách nào, em thấy chỗ nào khó nhất?",
          "Em có thực sự chắc chắn về những gì em vừa nói không?",
          "Em mất mấy tiếng để kiểm và em có làm một mình không?",
        ],
        correct: 0,
        explanation:
          "“Đã kiểm hết” là một nhận định, chưa có bằng chứng. Hỏi con số cụ thể và nguồn đối chiếu buộc họ chỉ ra việc đã làm. Các câu chung chung hoặc hỏi thời gian sẽ chỉ nhận về những câu trả lời chung chung.",
      },
      {
        question: "Bạn phát hiện một con số trong báo cáo không khớp nguồn gốc. Bước đầu tiên là gì?",
        options: [
          "Cho người nộp xem số và nguồn, hỏi họ cách con số đó được tạo ra",
          "Nhắn cả nhóm rằng từ nay cấm nộp báo cáo có AI hỗ trợ",
          "Sửa số im lặng, rồi gửi lên cấp trên mà không nói với ai",
          "Ghi nhận một lỗi vào hồ sơ đánh giá cuối năm của người nộp",
        ],
        correct: 0,
        explanation:
          "Cho xem số và nguồn rồi hỏi cách tạo ra biến lỗi thành bài học và cho bạn biết lỗi xuất phát từ đâu. Cấm cả nhóm là phản ứng thái quá, sửa im lặng không cải thiện được gì, còn ghi ngay vào hồ sơ đánh giá làm người ta giấu lỗi lần sau.",
      },
      {
        question: "Vì sao nên hỏi cùng ba câu cho mọi kết quả, dù không nghi có AI?",
        options: [
          "Để không ai cảm thấy mình bị nghi ngờ riêng, và thói quen kiểm được giữ đều",
          "Để tiết kiệm thời gian, vì hỏi ít thì duyệt nhanh hơn",
          "Để có bằng chứng xử lý nhân viên khi có sự cố xảy ra",
          "Để biết ai dùng AI nhiều nhất trong nhóm và so sánh giữa họ với nhau về hiệu quả",
        ],
        correct: 0,
        explanation:
          "Hỏi đều thì việc hỏi trở thành quy trình bình thường, không còn là dấu hiệu nghi ngờ. Mục tiêu không phải tiết kiệm thời gian, tạo hồ sơ xử lý hay xếp hạng người dùng nhiều nhất.",
      },
      {
        question: "Người nộp nói: “Em nhờ AI viết, em không kiểm vì em tin nó.” Cách phản hồi tốt nhất là gì?",
        options: [
          "Cảm ơn vì nói thật, rồi cùng kiểm ba con số quan trọng nhất ngay tại chỗ",
          "Khen vì trung thực rồi nhận báo cáo luôn, vì lần sau họ sẽ kiểm",
          "Phạt nhẹ vì tội không kiểm để cả nhóm rút kinh nghiệm",
          "Yêu cầu họ tự kiểm lại toàn bộ ở nhà rồi nộp lại vào sáng ngày mai",
        ],
        correct: 0,
        explanation:
          "Sự thật thà cần được hoan nghênh, và việc kiểm cần được làm ngay để người nộp thấy cách làm. Nhận báo cáo chưa kiểm là nhận rủi ro, phạt làm người ta giấu lần sau, còn gửi về nhà kiểm sẽ mất cơ hội dạy tại chỗ.",
      },
    ],
    keyTakeaways: [
      "Ba câu hỏi: dữ liệu đã đưa vào, phần đã kiểm, phần là ý riêng.",
      "Hỏi giống nhau cho mọi kết quả để không ai thấy bị nghi ngờ riêng.",
      "“Đã kiểm” cần đi kèm con số cụ thể và nguồn đối chiếu.",
      "Cảm ơn sự trung thực: phạt người nói thật làm lần sau họ im lặng.",
    ],
    practicePrompt: {
      question:
        "Báo cáo có một con số sai. Người nộp nói: “Em nhờ AI và không kiểm.” Điều gì làm lần sau họ vẫn kể thật?",
      options: [
        "Bạn cùng kiểm với họ và ghi nhận việc họ nói thật",
        "Bạn nhắc nhở nghiêm khắc và ghi lỗi vào hồ sơ đánh giá",
        "Bạn sửa số im lặng rồi không nhắc chuyện này nữa với họ",
        "Bạn cấm họ dùng AI trong các báo cáo gửi lên cấp trên",
      ],
      correct: 0,
      explanation:
        "Người thấy thật thà được đối xử tử tế và có người cùng sửa sẽ còn kể thật. Ghi lỗi hay cấm dùng dạy họ giấu, còn sửa im lặng khiến họ không học được cách kiểm.",
    },
    summary: {
      keyIdea: "Ba câu hỏi đều như nhau cho mọi kết quả giữ được chất lượng mà không làm ai phải giấu.",
      formula: "Dữ liệu đã đưa vào + phần đã kiểm + phần là ý riêng = đủ để quyết định nhận hay trả lại.",
      commonMistake: "Hỏi như chất vấn, “có phải AI viết không”, khiến người nộp học cách giấu.",
      action: "Lần tới nhận một báo cáo, hỏi ba câu trên và ghi lại câu trả lời.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một báo cáo hoặc email bạn sắp nhận hoặc vừa nhận từ đồng nghiệp hoặc cấp dưới. Viết ba câu hỏi theo giọng của bạn (dữ liệu đã đưa vào, phần đã kiểm, phần là ý riêng) và hỏi thử một người. Nếu bạn tự nộp báo cáo, hãy thử trả lời ba câu đó cho chính mình trước khi gửi.",
      secondary: "Ghi lại cách người đối diện phản ứng: họ thoải mái kể hay phòng thủ?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu chiều, cấp dưới nộp báo cáo thị trường rất trơn tru, đúng kiểu văn AI viết. Bạn chỉ có mười phút trước cuộc họp. Hỏi “có phải AI viết không” là câu bạn muốn hỏi nhất, và cũng là câu tệ nhất. Bài này cho bạn ba câu hỏi tốt hơn.",
      },
      {
        type: "feynman",
        title: "Duyệt kết quả có AI hỗ trợ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhận một món ăn từ bếp nhà hàng. Bạn không hỏi “bếp trưởng có nhờ phụ bếp không?”; bạn hỏi nguyên liệu tươi chưa, đã nếm chưa, món nào là công thức riêng.",
        columns: ["Điều cần biết", "Nhận món ăn từ bếp", "Nhận kết quả có AI hỗ trợ"],
        rows: [
          ["Đầu vào", "Nguyên liệu lấy từ đâu?", "Dữ liệu nào đã được đưa vào công cụ?"],
          ["Kiểm tra", "Đã nếm trước khi bưng ra chưa?", "Phần nào đã kiểm lại với nguồn gốc?"],
          ["Dấu ấn riêng", "Món nào là công thức riêng của bếp?", "Phần nào là ý kiến của chính người nộp?"],
          ["Quyết định", "Bưng ra hay làm lại", "Nhận, kiểm thêm hoặc trả lại"],
        ],
        oneLiner: "Hỏi như hỏi món ăn: đầu vào, đã nếm chưa, đâu là phần riêng.",
      },
      { type: "heading", text: "Ba câu hỏi và vì sao mỗi câu có mặt" },
      {
        type: "paragraph",
        text: "Hai thuật ngữ cần nhớ: “đối chiếu” là đặt con số hoặc câu khẳng định cạnh nguồn gốc để xem có khớp không, và “ý riêng” là phần đánh giá hay kết luận do chính người nộp đứng tên. Ba câu hỏi bao phủ ba rủi ro: dữ liệu rời công ty, nội dung sai, và không ai chịu trách nhiệm.",
      },
      {
        type: "list",
        items: [
          "Câu 1 - Dữ liệu nào em đã đưa vào công cụ? (rủi ro: dữ liệu rời công ty)",
          "Câu 2 - Phần nào em đã kiểm lại với nguồn gốc, bằng cách nào? (rủi ro: nội dung sai)",
          "Câu 3 - Phần nào là ý riêng của em? (rủi ro: không ai đứng tên kết luận)",
        ],
      },
      {
        type: "flow",
        title: "Mười phút duyệt một báo cáo",
        steps: [
          { label: "Mở bằng câu hỏi chung", detail: "Nói: “Anh hỏi ba câu như với mọi báo cáo nhé.” Câu đó cho người nộp biết họ không bị nghi ngờ riêng." },
          { label: "Nghe câu trả lời về dữ liệu", detail: "Nếu họ đã dán dữ liệu không nên dán, dừng lại ở đây: đó là việc cần xử lý trước cả chất lượng báo cáo." },
          { label: "Kiểm ba con số", detail: "Chọn ba con số quan trọng nhất và hỏi nguồn. Bạn không cần kiểm hết, nhưng người nộp cần biết bạn sẽ kiểm." },
          { label: "Hỏi phần ý riêng", detail: "Yêu cầu họ chỉ ra kết luận nào do họ đứng tên. Phần không ai đứng tên là phần cần viết lại." },
          { label: "Quyết định và phản hồi", detail: "Nhận, yêu cầu kiểm thêm hoặc trả lại, kèm một câu nói rõ vì sao. Cảm ơn nếu họ kể thật." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu hỏi giữ được sự trung thực",
          text: "“Em đã kiểm phần nào với nguồn?” “Em đã đưa vào những dữ liệu nào?” Hai câu áp dụng cho mọi báo cáo, có hay không có AI, nên người trả lời không cảm thấy bị nhắm vào.",
        },
        right: {
          label: "Câu hỏi làm người ta giấu",
          text: "“Có phải AI viết không, nói thật đi?” Câu này nghe như chất vấn, nên người nộp học được rằng nói thật thì bị nghi ngờ, và lần sau họ ít nói hơn.",
        },
      },
      {
        type: "callout",
        label: "Đừng phạt sự thật thà",
        text: "Nếu người nộp kể rằng họ đã dùng AI và chưa kiểm, hãy cảm ơn trước rồi kiểm cùng họ. Người bị phạt vì nói thật sẽ không nói thật lần sau, và bạn sẽ mất đúng thông tin cần nhất.",
      },
      {
        type: "scenario",
        title: "Báo cáo trôi chảy lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Mai nộp bản tóm tắt đối thủ rất trơn tru, có một bảng ba con số. Bạn có mười phút trước cuộc họp. Bạn nghi có AI hỗ trợ.",
            choices: [
              { label: "Hỏi: “Cái này có phải AI viết không, em nói thật đi?”", next: "bad_accuse" },
              { label: "Hỏi ba câu giống như với mọi báo cáo: dữ liệu, phần đã kiểm, phần là ý riêng", next: "s2" },
            ],
          },
          bad_accuse: {
            text: "Chị Mai đáp: “Dạ không ạ, em tự làm.” Lần sau chị giấu hẳn việc dùng AI. Con số sai của bản này tới tay giám đốc mà không ai kiểm.",
            ending: "bad",
          },
          s2: {
            text: "Chị Mai nói: “Em dán báo cáo của đối thủ đã công khai vào công cụ, rồi kiểm hai trong ba con số. Con số thứ ba em chưa kiểm được.”",
            choices: [
              { label: "Cảm ơn chị đã nói rõ, cùng kiểm con số thứ ba trong mười phút còn lại", next: "good" },
              { label: "Bỏ luôn cả bảng khỏi báo cáo để cho an toàn", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Báo cáo còn lại là những nhận xét chung. Giám đốc hỏi: “Đối thủ tăng bao nhiêu?” và nhóm không có gì để trả lời.",
            ending: "bad",
          },
          good: {
            text: "Hai bạn tìm ra con số thứ ba lệch một chữ số so với nguồn và sửa kịp. Chị Mai biết kể thật không bị trách, nên lần sau chị sẽ tự ghi chú phần đã kiểm vào báo cáo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba câu hỏi, hỏi đều cho mọi báo cáo, và cảm ơn sự thật thà.",
          "Bài sau: một nhật ký dùng AI ngắn, để truy lại chứ không để canh chừng.",
        ],
      },
    ],
  },
];
