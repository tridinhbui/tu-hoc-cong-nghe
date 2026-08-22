import type { Lesson } from "./lesson-types";

// Chặng "Chuẩn mực kế toán và thuế doanh nghiệp Việt Nam" (ids 1441-1445).
//
// Hai lỗ hổng của Track 2 mà bài kiểm tra tuyển dụng ở Việt Nam hỏi trực tiếp:
// (1) toàn bộ chặng kế toán dạy nguyên lý chung nhưng không nói VAS khác IFRS ở
// đâu, trong khi doanh nghiệp niêm yết đang trong lộ trình chuyển đổi; (2) app
// có tám bài thuế TNCN nhưng không bài nào về thuế doanh nghiệp - kể cả thuế
// hoãn lại, thứ xuất hiện ngay trên bảng cân đối mà người học vừa tập đọc.
//
// Quy tắc viết: các con số thuế suất và ngưỡng cụ thể thay đổi theo từng lần
// sửa luật, nên bài học tập trung vào cơ chế và cách tra cứu, chỉ nêu mức phổ
// thông làm mốc và nói rõ đó là mốc cần kiểm chứng lại tại thời điểm áp dụng.

export const VN_STANDARDS_TAX_LESSONS: Lesson[] = [
  {
    id: 1441,
    slug: "vas-vs-ifrs-khac-biet-nen-tang",
    title: "Chuẩn mực & Dữ liệu, Bài 1: Quy ước mã - vì sao cả đội viết giống nhau",
    subtitle: "Không phải để đẹp, mà để phần khác biệt trong diff là khác biệt thật",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Tranh cãi về dấu cách và dấu ngoặc tiêu tốn thời gian của mọi đội chưa chốt quy ước, và nó không tạo ra giá trị nào. Chốt một lần rồi giao cho máy áp dụng sẽ trả lại toàn bộ thời gian đó cho việc rà soát thứ đáng rà soát.",
    openingQuestion: "Lợi ích lớn nhất của một quy ước mã thống nhất là gì?",
    openingOptions: [
      "Diff chỉ còn thay đổi thật",
      "Mã chạy nhanh hơn khi biên dịch",
      "Giảm số dòng mã phải viết ra",
      "Tìm lỗi cú pháp sớm hơn hẳn",
    ],
    correctOption: 0,
    explanation:
      "Khi mỗi người định dạng một kiểu, một lần sửa nhỏ có thể tạo ra hàng chục dòng thay đổi chỉ vì trình soạn thảo tự canh lại. Người rà soát phải lọc ra đâu là thay đổi thật, và họ sẽ bỏ sót. Quy ước thống nhất làm mọi dòng trong diff đều mang ý nghĩa, và đó là lợi ích lớn hơn nhiều so với chuyện dễ đọc. Quy ước không làm mã chạy nhanh hơn và cũng không giảm số dòng phải viết - đó là hai kỳ vọng sai thường gặp. Việc bắt lỗi cú pháp sớm là của trình biên dịch và linter, hai thứ khác với công cụ định dạng.",
    diagram: [
      { label: "Mỗi người một kiểu định dạng", arrow: true },
      { label: "Diff đầy thay đổi không mang nghĩa", arrow: true },
      { label: "Người rà soát bỏ sót thay đổi thật", arrow: true },
      { label: "Chốt quy ước, giao cho máy áp dụng" },
    ],
    realWorldExample: {
      company: "Ba mươi dòng đổi cho một chữ",
      description:
        "Một pull request sửa đúng một tên biến, nhưng diff hiện ba mươi dòng vì trình soạn thảo của người viết canh lại cả khối. Người rà soát lướt qua và duyệt. Ba dòng trong ba mươi ấy là thay đổi logic thật, và không ai đọc chúng. Sự cố tuần sau bắt nguồn từ đúng một trong ba dòng đó.",
    },
    quiz: [
      {
        question: "Công cụ định dạng khác linter ở điểm nào?",
        options: [
          "Định dạng lo hình thức, linter lo những mẫu mã dễ sinh lỗi",
          "Định dạng chạy khi lưu tệp, còn linter chỉ chạy được trên máy chủ tích hợp",
          "Định dạng do từng người tự cấu hình, còn linter thì áp chung cho cả kho mã",
          "Định dạng làm việc với mã nguồn, còn linter làm việc với mã đã biên dịch",
        ],
        correct: 0,
        explanation:
          "Hai công cụ, hai loại câu hỏi. Định dạng trả lời dấu ngoặc xuống dòng hay không - không có đáp án đúng, chỉ cần thống nhất. Linter trả lời đoạn này có mẫu nào dễ sinh lỗi không - và ở đây có đáp án đúng sai thật.",
      },
      {
        question: "Vì sao nên chạy định dạng tự động thay vì nhắc nhau trong rà soát?",
        options: [
          "Vì nhắc nhau tốn thời gian người và vẫn bỏ sót, còn máy thì không",
          "Vì công cụ định dạng phát hiện được nhiều loại lỗi hơn người rà soát",
          "Vì quy ước do máy áp dụng luôn hợp lý hơn là quy ước do đội tự chọn",
          "Vì chạy tự động giúp giảm số lần phải tải lại kho mã về máy cá nhân",
        ],
        correct: 0,
        explanation:
          "Mọi bình luận rà soát về dấu cách là một lượt trao đổi tốn thời gian của hai người mà không tạo ra giá trị nào. Giao cho máy làm ở bước lưu tệp hoặc bước kiểm tự động thì cuộc trao đổi đó biến mất hoàn toàn.",
      },
      {
        question: "Khi nào một luật linter nên bị tắt đi?",
        options: [
          "Khi nó báo nhiều trường hợp đúng hơn trường hợp sai trong kho mã này",
          "Khi có ai đó trong đội thấy khó chịu vì phải sửa theo nó nhiều lần",
          "Khi nó làm bước kiểm tự động chạy lâu hơn ba mươi giây mỗi lượt",
          "Khi ngôn ngữ đã có sẵn cơ chế biên dịch bắt được cùng loại vấn đề đó",
        ],
        correct: 0,
        explanation:
          "Một luật báo sai nhiều hơn báo đúng sẽ dạy cả đội bỏ qua cảnh báo, và thói quen đó lan sang những luật đáng nghe. Đây là cùng nguyên tắc với cổng kiểm thử: một cổng kêu oan là một cổng mất tác dụng.",
      },
      {
        question: "Áp quy ước mới cho một kho mã cũ nên làm thế nào?",
        options: [
          "Một lượt định dạng riêng, không trộn chung với thay đổi logic nào",
          "Định dạng dần từng tệp mỗi khi có người chạm vào tệp đó lần tới",
          "Chỉ áp cho mã mới viết, còn mã cũ giữ nguyên định dạng đang có",
          "Áp cùng lúc với một đợt sửa lỗi lớn để tiết kiệm số lần kiểm tra",
        ],
        correct: 0,
        explanation:
          "Một commit chỉ định dạng thì người rà soát biết không cần đọc nội dung, và lịch sử về sau lọc được nó ra khi truy nguồn. Trộn định dạng với logic thì đúng vấn đề của bài này lặp lại, chỉ ở quy mô lớn hơn nhiều.",
      },
      {
        question: "Vì sao nên đưa quy ước vào bước kiểm tự động?",
        options: [
          "Vì quy ước chỉ có tác dụng khi không ai bỏ qua được nó",
          "Vì bước kiểm tự động chạy nhanh hơn khi mã đã được định dạng sẵn",
          "Vì nhiều công cụ định dạng chỉ hoạt động trong môi trường tích hợp liên tục",
          "Vì như vậy mỗi người không cần cài công cụ định dạng trên máy của mình",
        ],
        correct: 0,
        explanation:
          "Quy ước dựa vào thiện chí thì sẽ trôi, vì luôn có lúc ai đó vội. Một cổng tự động biến nó thành thứ không cần nhắc - cùng lý do mà mọi cổng khác trong kho mã tồn tại.",
      },
    ],
    keyTakeaways: [
      "Giá trị chính của quy ước là làm mọi dòng trong diff đều mang nghĩa",
      "Định dạng lo hình thức, linter lo mẫu mã dễ sinh lỗi - hai việc khác nhau",
      "Luật linter báo oan nhiều hơn báo đúng thì nên tắt, vì nó dạy đội bỏ qua cảnh báo",
      "Áp quy ước cho kho cũ bằng một lượt riêng, không trộn với thay đổi logic",
    ],
    practicePrompt: {
      question:
        "Đội bạn tranh cãi về kiểu thụt lề đã ba buổi họp. Cách xử lý tốt nhất là gì?",
      options: [
        "Chọn cấu hình mặc định của một công cụ phổ biến rồi áp cho cả kho",
        "Bỏ phiếu để chọn kiểu mà đa số thành viên trong đội đang quen dùng nhất",
        "Cho mỗi người giữ kiểu riêng và cấu hình công cụ bỏ qua phần định dạng",
        "Để người viết nhiều mã nhất trong đội quyết định kiểu chung cho tất cả",
      ],
      correct: 0,
      explanation:
        "Không có kiểu thụt lề nào đúng hơn kiểu nào, nên mọi cách chọn đều tương đương về kỹ thuật - chỉ khác nhau ở chi phí quyết định. Lấy mặc định của một công cụ phổ biến tốn không phút nào và kết thúc cuộc tranh cãi ngay, đó là toàn bộ giá trị.",
    },
    summary: {
      keyIdea: "Quy ước thống nhất tồn tại để diff chỉ còn thay đổi thật, không phải để mã trông đẹp",
      commonMistake: "Nhắc nhau về định dạng trong rà soát thay vì giao hẳn cho máy",
      action: "Kiểm xem kho mã của bạn đã có cấu hình định dạng chạy tự động chưa.",
    },
    application: {
      title: "Ba lớp, mỗi lớp một việc",
      message:
        "Công cụ định dạng chạy lúc lưu tệp; linter chạy lúc kiểm tự động; và người rà soát chỉ còn đọc phần logic. Cắt lớp nào thì phần việc đó rơi xuống lớp sau, và lớp sau luôn đắt hơn.",
      secondary:
        "Người là lớp đắt nhất, nên mọi thứ máy làm được thì đừng để tới lượt người.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này về hai loại chuẩn mực mà một đội ở Việt Nam phải sống cùng: chuẩn nội bộ do đội tự chọn, và quy định pháp luật thì không được chọn. Bài đầu nói về loại thứ nhất.",
      },
      { type: "heading", text: "Chuẩn không phải để đẹp" },
      {
        type: "paragraph",
        text: "Lý do thường được nêu là mã dễ đọc hơn, và nó đúng nhưng nhỏ. Lý do lớn hơn nằm ở diff: khi định dạng đã thống nhất, mọi dòng thay đổi trong một pull request đều là thay đổi có chủ ý. Người rà soát không phải lọc nhiễu, nên họ đọc kỹ hơn phần đáng đọc.",
      },
      {
        type: "conceptTable",
        title: "Ba công cụ, ba câu hỏi khác nhau",
        subtitle: "Gộp chúng vào một chỗ là lý do nhiều đội thấy cổng kiểm phiền phức",
        concepts: [
          {
            vi: "Công cụ định dạng",
            en: "Formatter",
            def: "Trả lời câu hỏi không có đáp án đúng: xuống dòng ở đâu, thụt bao nhiêu. Chỉ cần thống nhất, và nên chạy tự động.",
          },
          {
            vi: "Bộ soi mã",
            en: "Linter",
            def: "Trả lời câu hỏi có đáp án đúng sai: đoạn này có mẫu nào dễ sinh lỗi không. Luật nào báo oan nhiều thì tắt.",
          },
          {
            vi: "Kiểm kiểu",
            en: "Type checker",
            def: "Trả lời câu hỏi chặt hơn cả hai: các mảnh có ghép được với nhau không. Đây là cổng, không phải gợi ý.",
          },
        ],
      },
      {
        type: "callout",
        label: "Một cổng kêu oan là một cổng đã mất tác dụng",
        text: "Điều này đúng với linter y như với mọi cổng khác trong kho mã. Một luật báo sai nhiều hơn báo đúng sẽ dạy cả đội phản xạ bỏ qua, và phản xạ đó không phân biệt luật nào. Thà tắt hẳn một luật gây nhiễu còn hơn giữ nó rồi tập cho mọi người thói quen lướt qua cảnh báo.",
      },
      {
        type: "closing",
        lines: [
          "Chuẩn nội bộ là thứ đội tự chọn, nên chi phí lớn nhất của nó là thời gian tranh cãi.",
          "Bài sau: chuyển cả kho mã sang một chuẩn mới mà không làm vỡ lịch sử.",
        ],
      },
    ],
  },
  {
    id: 1442,
    slug: "lo-trinh-ifrs-tai-viet-nam",
    title: "Chuẩn mực & Dữ liệu, Bài 2: Chuyển kho mã sang một chuẩn mới",
    subtitle: "Một lượt định dạng, một tệp bỏ qua khi truy nguồn, và không trộn logic vào",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "professional",
    whyItMatters:
      "Mọi kho mã sống đủ lâu đều tới lúc phải đổi chuẩn: công cụ mới, ngôn ngữ nâng phiên bản, hoặc đội thống nhất lại. Làm sai một bước thì lịch sử kho mã hỏng vĩnh viễn - mọi lệnh truy nguồn về sau đều chỉ vào đúng cái commit định dạng đó.",
    openingQuestion: "Rủi ro lớn nhất khi định dạng lại toàn bộ kho mã là gì?",
    openingOptions: [
      "Mất dấu vết truy nguồn",
      "Kho mã phình to nhanh hơn",
      "Bước kiểm tự động chạy lâu",
      "Xung đột với nhánh đang mở",
    ],
    correctOption: 0,
    explanation:
      "Lệnh truy nguồn cho biết dòng này ai sửa lần cuối và trong commit nào - đó là cách nhanh nhất để hiểu vì sao một đoạn mã tồn tại. Một lượt định dạng chạm vào mọi dòng sẽ làm mọi câu trả lời đó thành cùng một commit vô nghĩa, và ngữ cảnh lịch sử biến mất. Xung đột với nhánh đang mở là rủi ro có thật nhưng ngắn hạn và xử lý được bằng cách hẹn giờ. May mắn là mất truy nguồn cũng tránh được: hầu hết công cụ hiện nay cho phép khai báo danh sách commit cần bỏ qua khi truy nguồn, và một dòng cấu hình khiến cả đội tự động dùng danh sách đó.",
    diagram: [
      { label: "Một lượt định dạng chạm mọi dòng", arrow: true },
      { label: "Truy nguồn chỉ về commit đó", arrow: true },
      { label: "Khai báo commit cần bỏ qua", arrow: true },
      { label: "Lịch sử thật hiện lại như cũ" },
    ],
    realWorldExample: {
      company: "Ba năm lịch sử biến mất trong một chiều",
      description:
        "Một đội đổi công cụ định dạng, chạy một lượt trên toàn kho, gộp vào nhánh chính. Tuần sau có sự cố, người trực chạy lệnh truy nguồn để hiểu một đoạn logic lạ, và mọi dòng đều trả về cùng một commit tên là chuẩn hoá định dạng. Ba năm ngữ cảnh vẫn còn trong kho, chỉ là không ai với tới được nữa nếu không biết mẹo bỏ qua commit.",
    },
    quiz: [
      {
        question: "Vì sao commit định dạng phải tách riêng khỏi thay đổi logic?",
        options: [
          "Để người rà soát biết ngay là không cần đọc nội dung của commit đó",
          "Để công cụ định dạng chạy nhanh hơn vì không phải xử lý mã mới",
          "Để bước kiểm tự động bỏ qua commit đó và tiết kiệm thời gian chạy",
          "Để tránh xung đột khi nhiều người cùng sửa một tệp trong cùng ngày",
        ],
        correct: 0,
        explanation:
          "Trộn hai loại thay đổi thì người rà soát phải lọc thủ công giữa hàng nghìn dòng, và họ sẽ duyệt qua. Tách riêng thì commit định dạng duyệt trong ba giây, còn commit logic được đọc đúng mức nó đáng.",
      },
      {
        question: "Danh sách commit cần bỏ qua khi truy nguồn có tác dụng gì?",
        options: [
          "Truy nguồn nhảy qua chúng để chỉ về commit thay đổi nghĩa thật sự",
          "Các commit trong danh sách bị xoá khỏi lịch sử của kho mã vĩnh viễn",
          "Bước kiểm tự động sẽ không chạy lại trên các commit nằm trong danh sách",
          "Người rà soát không nhìn thấy các commit đó khi mở pull request ra xem",
        ],
        correct: 0,
        explanation:
          "Không có gì bị xoá - lịch sử vẫn nguyên vẹn, chỉ là lệnh truy nguồn được dặn đi tiếp qua các commit thuần định dạng. Thêm một dòng cấu hình nữa thì cả đội dùng danh sách đó mặc định mà không ai phải nhớ gõ thêm tham số.",
      },
      {
        question: "Nên chạy lượt định dạng vào lúc nào?",
        options: [
          "Khi số nhánh đang mở ít nhất, và báo trước cho cả đội gộp về",
          "Ngay sau một đợt phát hành lớn để có nhiều thời gian xử lý sự cố",
          "Vào cuối tuần khi không ai làm việc nên không phát sinh xung đột nào",
          "Bất cứ lúc nào, vì công cụ hợp nhất tự xử lý được xung đột định dạng",
        ],
        correct: 0,
        explanation:
          "Mỗi nhánh đang mở là một lần hợp nhất đau đớn sắp tới, vì lượt định dạng chạm vào mọi dòng. Hẹn giờ và báo trước biến vấn đề kỹ thuật thành vấn đề lịch, và vấn đề lịch thì dễ giải hơn nhiều.",
      },
      {
        question: "Sau khi chuyển chuẩn, việc bắt buộc phải làm là gì?",
        options: [
          "Đưa công cụ định dạng vào cổng tự động để chuẩn mới không trôi lại",
          "Chạy lại toàn bộ bộ kiểm thử một lần nữa trên nhánh chính đã gộp",
          "Ghi lại quyết định đổi chuẩn vào tài liệu kiến trúc của dự án",
          "Thông báo cho các đội khác đang dùng chung thư viện của kho mã này",
        ],
        correct: 0,
        explanation:
          "Không có cổng thì kho mã trôi lại về trạng thái hỗn hợp trong vài tuần, và toàn bộ công sức của lượt chuyển thành lãng phí. Ba việc kia đều nên làm nhưng không cái nào giữ được chuẩn ở nguyên chỗ.",
      },
      {
        question: "Nâng phiên bản ngôn ngữ khác chuyển chuẩn định dạng ở điểm nào?",
        options: [
          "Nâng phiên bản đổi hành vi lúc chạy, nên phải có kiểm thử bảo chứng",
          "Nâng phiên bản chỉ ảnh hưởng tới cú pháp nên rủi ro sẽ thấp hơn nhiều",
          "Nâng phiên bản không cần tách riêng commit vì nó không chạm nhiều dòng",
          "Nâng phiên bản do công cụ tự làm nên không cần con người rà soát lại",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt quan trọng: định dạng lại thì hành vi chương trình không đổi một chút nào, còn nâng phiên bản thì có thể đổi. Vì vậy lượt hai bắt buộc phải có bộ kiểm thử chạy trước và sau, còn lượt một thì không.",
      },
    ],
    keyTakeaways: [
      "Rủi ro chính là mất truy nguồn, và nó tránh được bằng danh sách commit bỏ qua",
      "Tách hẳn commit định dạng khỏi commit logic - người rà soát cần biết cái nào là cái nào",
      "Chọn thời điểm ít nhánh mở nhất, và báo trước cho đội gộp về",
      "Chuyển xong phải có cổng tự động, nếu không chuẩn sẽ trôi lại",
    ],
    practicePrompt: {
      question:
        "Bạn sắp định dạng lại toàn bộ kho mã. Bước nào phải làm TRƯỚC khi chạy?",
      options: [
        "Hẹn thời điểm và yêu cầu mọi nhánh đang mở gộp về trước đó",
        "Tạo một nhánh sao lưu toàn bộ kho mã để có thể quay lại nếu cần",
        "Chạy thử trên một thư mục nhỏ để ước lượng số dòng sẽ bị thay đổi",
        "Tắt tạm bước kiểm tự động để lượt gộp không bị chặn lại giữa chừng",
      ],
      correct: 0,
      explanation:
        "Nhánh đang mở là chi phí lớn nhất và là chi phí duy nhất không sửa được sau khi đã chạy - mỗi nhánh sẽ phải hợp nhất qua một lượt thay đổi chạm mọi dòng. Sao lưu thì Git đã làm sẵn, và tắt cổng kiểm là đi ngược đúng thứ bài này khuyên.",
    },
    summary: {
      keyIdea: "Chuyển chuẩn là việc một lượt, nhưng nó chạm mọi dòng nên phải bảo vệ lịch sử truy nguồn",
      commonMistake: "Trộn lượt định dạng vào một commit có cả thay đổi logic",
      action: "Kiểm xem kho mã của bạn đã có tệp khai báo commit bỏ qua khi truy nguồn chưa.",
    },
    application: {
      title: "Bốn bước của một lượt chuyển chuẩn",
      message:
        "Hẹn giờ và gọi nhánh về; chạy một lượt duy nhất không kèm logic; thêm commit đó vào danh sách bỏ qua khi truy nguồn; rồi dựng cổng tự động để chuẩn mới ở nguyên chỗ.",
      secondary:
        "Bỏ bước ba thì mất ngữ cảnh lịch sử; bỏ bước bốn thì vài tuần sau quay lại điểm xuất phát.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước chốt một chuẩn. Bài này nói về lần duy nhất khó: áp chuẩn đó lên một kho mã đã có nhiều năm lịch sử.",
      },
      { type: "heading", text: "Thứ dễ mất nhất là thứ không ai nghĩ tới" },
      {
        type: "paragraph",
        text: "Ai cũng lường trước xung đột hợp nhất, và ai cũng xử lý được. Thứ ít người lường là truy nguồn: sau một lượt định dạng, câu hỏi dòng này có từ đâu sẽ trả về đúng một commit cho mọi dòng trong kho. Ngữ cảnh không mất thật, nhưng nó biến mất khỏi công cụ mà người ta thực sự dùng.",
      },
      {
        type: "conceptTable",
        title: "Ba loại lượt chuyển, ba mức rủi ro",
        subtitle: "Chỉ loại đầu là an toàn về hành vi",
        concepts: [
          {
            vi: "Định dạng lại",
            en: "Reformat",
            def: "Không đổi hành vi chương trình chút nào. Rủi ro duy nhất nằm ở lịch sử và ở các nhánh đang mở.",
          },
          {
            vi: "Sửa theo linter",
            en: "Lint fix",
            def: "Có thể đổi hành vi ở những chỗ mã cũ đang dựa vào một mẫu không an toàn. Cần bộ kiểm thử chạy trước và sau.",
          },
          {
            vi: "Nâng phiên bản",
            en: "Version upgrade",
            def: "Đổi hành vi lúc chạy là chuyện bình thường. Đây là loại bắt buộc phải có kiểm thử bảo chứng và nên chia nhỏ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không cổng thì chuẩn sẽ trôi",
        text: "Một kho mã vừa được chuẩn hoá trông rất gọn, và cảm giác đó khiến người ta bỏ qua bước cuối. Nhưng chuẩn dựa vào trí nhớ sẽ trôi ngay trong vài tuần, vì luôn có lúc ai đó vội và không ai muốn làm người nhắc. Cổng tự động là thứ duy nhất giữ được kết quả của cả lượt chuyển.",
      },
      {
        type: "closing",
        lines: [
          "Phần khó của việc đổi chuẩn không nằm ở lệnh chạy, mà ở những thứ lượt chạy đó vô tình chạm vào.",
          "Bài sau: chuyển sang loại chuẩn mực không được chọn - Nghị định 13 và dữ liệu cá nhân.",
        ],
      },
    ],
  },
  {
    id: 1443,
    slug: "thue-thu-nhap-doanh-nghiep-cach-tinh",
    title: "Chuẩn mực & Dữ liệu, Bài 3: Nghị định 13 - dữ liệu cá nhân là gì",
    subtitle: "Định nghĩa rộng hơn bạn tưởng, và nó quyết định phần lớn việc còn lại",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🪪",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Nghị định 13/2023 áp cho mọi tổ chức xử lý dữ liệu cá nhân của người tại Việt Nam, kể cả công ty nước ngoài. Phần lớn đội lập trình gặp nó lần đầu khi pháp chế gửi một bảng câu hỏi, và lúc đó mới phát hiện hệ thống chưa trả lời được câu nào.",
    openingQuestion: "Địa chỉ IP của người dùng có phải dữ liệu cá nhân không?",
    openingOptions: [
      "Có, nếu lần được ra một người",
      "Không, vì đó là số của máy",
      "Chỉ khi người dùng đã đăng nhập",
      "Chỉ khi được lưu quá ba tháng",
    ],
    correctOption: 0,
    explanation:
      "Định nghĩa trong Nghị định 13 xoay quanh khả năng nhận diện: dữ liệu gắn với một con người cụ thể, hoặc giúp nhận diện được người đó, đều thuộc phạm vi. Địa chỉ IP một mình thường chưa nhận diện được ai, nhưng ghép với nhật ký đăng nhập hay lịch sử thao tác thì lần ra được - và trong hệ thống của bạn thì chúng luôn nằm cạnh nhau. Vì vậy câu hỏi đúng không phải trường này có phải dữ liệu cá nhân không, mà là ghép các trường tôi đang lưu lại thì có ra một người cụ thể không. Nghị định còn tách riêng nhóm dữ liệu nhạy cảm - sức khoẻ, sinh trắc học, quan điểm chính trị, tình trạng tài chính - với yêu cầu chặt hơn hẳn.",
    diagram: [
      { label: "Dữ liệu gắn với một người cụ thể", arrow: true },
      { label: "Hoặc ghép lại thì nhận diện được", arrow: true },
      { label: "Nhóm nhạy cảm có yêu cầu chặt hơn", arrow: true },
      { label: "Áp cả với tổ chức ngoài Việt Nam" },
    ],
    realWorldExample: {
      company: "Bảng câu hỏi từ pháp chế",
      description:
        "Câu đầu tiên thường là hệ thống đang lưu những loại dữ liệu cá nhân nào và ở đâu. Nhiều đội không trả lời được, không phải vì giấu, mà vì chưa ai từng lập danh sách đó - dữ liệu nằm rải trong bảng chính, trong nhật ký, trong bộ nhớ đệm, trong bản sao lưu và trong công cụ phân tích của bên thứ ba.",
    },
    quiz: [
      {
        question: "Phạm vi áp dụng của Nghị định 13 phụ thuộc vào điều gì?",
        options: [
          "Việc dữ liệu là của người tại Việt Nam, không phải nơi đặt máy chủ",
          "Việc doanh nghiệp có đăng ký kinh doanh tại Việt Nam hay ở nước ngoài",
          "Việc hệ thống có thu phí người dùng hay đang cung cấp dịch vụ miễn phí",
          "Việc dữ liệu được lưu trong cơ sở dữ liệu hay chỉ nằm trong tệp nhật ký",
        ],
        correct: 0,
        explanation:
          "Đây là điểm nhiều đội hiểu nhầm nhất. Đặt máy chủ ở nước ngoài không đưa bạn ra khỏi phạm vi, vì tiêu chí là dữ liệu của ai chứ không phải máy ở đâu. Một sản phẩm nước ngoài có người dùng Việt Nam vẫn thuộc phạm vi điều chỉnh.",
      },
      {
        question: "Nhóm dữ liệu nhạy cảm khác nhóm cơ bản ở chỗ nào?",
        options: [
          "Yêu cầu về sự đồng ý và bảo vệ chặt hơn, và hậu quả khi lộ nặng hơn",
          "Chỉ được lưu trong cơ sở dữ liệu chứ không được ghi vào tệp nhật ký",
          "Phải được mã hoá bằng thuật toán do cơ quan quản lý chỉ định sẵn",
          "Chỉ được xử lý bởi nhân sự đã qua một khoá đào tạo có chứng chỉ",
        ],
        correct: 0,
        explanation:
          "Sức khoẻ, sinh trắc học, quan điểm chính trị, tình trạng tài chính và một số nhóm khác nằm trong danh mục nhạy cảm. Hệ quả thực tế cho người lập trình: những trường này cần tách riêng, hạn chế truy cập chặt hơn, và tuyệt đối không đi vào nhật ký.",
      },
      {
        question: "Bước đầu tiên để tuân thủ về mặt kỹ thuật là gì?",
        options: [
          "Lập bản đồ dữ liệu: loại nào, nằm ở đâu, ai chạm được",
          "Mã hoá toàn bộ cơ sở dữ liệu bằng khoá do đội tự quản lý",
          "Viết chính sách quyền riêng tư và đăng lên trang chủ của sản phẩm",
          "Chuyển toàn bộ máy chủ về đặt tại một trung tâm dữ liệu trong nước",
        ],
        correct: 0,
        explanation:
          "Không có bản đồ thì mọi biện pháp sau đều là đoán, vì bạn chưa biết mình đang bảo vệ cái gì và ở đâu. Bản đồ này cũng chính là thứ mà mọi bảng câu hỏi từ pháp chế hay từ khách hàng doanh nghiệp đều hỏi tới đầu tiên.",
      },
      {
        question: "Vì sao nhật ký hệ thống là điểm rò rỉ hay bị bỏ sót?",
        options: [
          "Vì nó ghi lại nội dung yêu cầu, và dữ liệu cá nhân đi vào theo đường đó",
          "Vì tệp nhật ký thường không được sao lưu nên dễ mất khi máy chủ hỏng",
          "Vì công cụ đọc nhật ký không hỗ trợ phân quyền theo từng người dùng",
          "Vì nhật ký được ghi ở định dạng văn bản nên không mã hoá được",
        ],
        correct: 0,
        explanation:
          "Một dòng ghi lại toàn bộ thân yêu cầu để tiện gỡ lỗi cũng ghi luôn số điện thoại, địa chỉ và đôi khi cả mật khẩu. Nhật ký thường có thời gian lưu dài, được sao chép sang công cụ giám sát, và được nhiều người đọc hơn cơ sở dữ liệu chính.",
      },
      {
        question: "Bên xử lý dữ liệu khác bên kiểm soát dữ liệu thế nào?",
        options: [
          "Bên kiểm soát quyết định mục đích, bên xử lý làm theo yêu cầu bên kiểm soát",
          "Bên kiểm soát lưu dữ liệu, còn bên xử lý chỉ được đọc chứ không được ghi",
          "Bên kiểm soát là doanh nghiệp trong nước, bên xử lý là đối tác nước ngoài",
          "Bên kiểm soát chịu trách nhiệm pháp lý, còn bên xử lý thì miễn trừ",
        ],
        correct: 0,
        explanation:
          "Phân vai này quyết định ai chịu trách nhiệm gì. Nhà cung cấp đám mây hay công cụ phân tích mà bạn thuê thường là bên xử lý, còn bạn là bên kiểm soát - và điều đó nghĩa là nghĩa vụ vẫn thuộc về bạn, kể cả khi sự cố xảy ra ở phía họ.",
      },
    ],
    keyTakeaways: [
      "Tiêu chí là khả năng nhận diện một người, không phải tên trường dữ liệu",
      "Phạm vi theo dữ liệu của người tại Việt Nam, không theo nơi đặt máy chủ",
      "Nhóm nhạy cảm có yêu cầu chặt hơn và tuyệt đối không nên vào nhật ký",
      "Bước đầu tiên luôn là lập bản đồ dữ liệu, trước mọi biện pháp kỹ thuật khác",
    ],
    practicePrompt: {
      question:
        "Đội bạn ghi toàn bộ thân yêu cầu vào nhật ký để tiện gỡ lỗi. Rủi ro chính là gì?",
      options: [
        "Dữ liệu cá nhân đi vào nhật ký, nơi lưu lâu và nhiều người đọc được",
        "Tệp nhật ký phình to làm ổ đĩa của máy chủ đầy nhanh hơn dự kiến",
        "Ghi quá nhiều làm chậm thời gian phản hồi của từng yêu cầu đi vào",
        "Định dạng nhật ký không đồng nhất nên công cụ phân tích khó đọc được",
      ],
      correct: 0,
      explanation:
        "Ba rủi ro kia có thật và đều xử lý được bằng cấu hình. Rủi ro đầu thì khác về bản chất: nó biến một hệ thống tuân thủ ở tầng cơ sở dữ liệu thành một hệ thống rò rỉ ở tầng nhật ký, nơi thời gian lưu dài hơn và số người đọc được nhiều hơn.",
    },
    summary: {
      keyIdea: "Dữ liệu cá nhân được xác định theo khả năng nhận diện một người, nên phạm vi rộng hơn danh sách trường bạn nghĩ tới",
      commonMistake: "Cho rằng đặt máy chủ ở nước ngoài thì không thuộc phạm vi điều chỉnh",
      action: "Liệt kê mọi nơi hệ thống của bạn đang giữ dữ liệu người dùng, gồm cả nhật ký và bản sao lưu.",
    },
    application: {
      title: "Bản đồ dữ liệu, bốn cột",
      message:
        "Loại dữ liệu; nơi lưu gồm cả nhật ký, bộ nhớ đệm và bản sao lưu; ai chạm được; và giữ trong bao lâu. Bốn cột đó trả lời gần hết mọi bảng câu hỏi tuân thủ bạn sẽ nhận.",
      secondary:
        "Chưa có bản đồ thì mọi biện pháp bảo vệ đều là đoán, vì chưa biết đang bảo vệ cái gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước là chuẩn do đội tự chọn. Từ bài này là loại chuẩn không được chọn, và bắt đầu bằng câu hỏi quyết định mọi thứ phía sau: cái gì được tính là dữ liệu cá nhân.",
      },
      { type: "heading", text: "Tiêu chí là nhận diện, không phải tên trường" },
      {
        type: "paragraph",
        text: "Đừng hỏi trường này có nằm trong danh sách dữ liệu cá nhân không. Hỏi ghép những gì tôi đang lưu lại thì có ra một con người cụ thể không. Một mã định danh vô nghĩa nằm cạnh nhật ký thao tác và địa chỉ IP thì gộp lại vẫn lần ra được người - và trong hệ thống thật, chúng luôn nằm cạnh nhau.",
      },
      {
        type: "conceptTable",
        title: "Ba vai mà nghị định phân biệt",
        subtitle: "Xác định sai vai là xác định sai luôn nghĩa vụ",
        concepts: [
          {
            vi: "Chủ thể dữ liệu",
            en: "Data subject",
            def: "Người mà dữ liệu nói về. Họ có các quyền cụ thể - biết, rút đồng ý, yêu cầu xoá - và bài sau nói kỹ.",
          },
          {
            vi: "Bên kiểm soát",
            en: "Controller",
            def: "Bên quyết định thu dữ liệu để làm gì. Thường là chính doanh nghiệp của bạn, và nghĩa vụ nặng nhất nằm ở đây.",
          },
          {
            vi: "Bên xử lý",
            en: "Processor",
            def: "Bên làm theo yêu cầu của bên kiểm soát - nhà cung cấp đám mây, công cụ phân tích. Thuê ngoài không chuyển được nghĩa vụ đi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nhật ký là chỗ rò rỉ bị bỏ sót nhiều nhất",
        text: "Cơ sở dữ liệu thường được phân quyền cẩn thận, mã hoá, và có người chịu trách nhiệm. Nhật ký thì ghi tự do, lưu lâu, sao chép sang công cụ giám sát của bên thứ ba, và cả đội đều đọc được. Một dòng ghi toàn bộ thân yêu cầu để tiện gỡ lỗi có thể phá vỡ mọi thứ đã làm ở tầng dưới.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi cái gì là dữ liệu cá nhân quyết định phạm vi của mọi việc còn lại trong chặng này.",
          "Bài sau: sự đồng ý và các quyền mà chủ thể dữ liệu có thể yêu cầu bạn thực hiện.",
        ],
      },
    ],
  },
  {
    id: 1444,
    slug: "thue-gtgt-va-thue-nha-thau",
    title: "Chuẩn mực & Dữ liệu, Bài 4: Sự đồng ý và quyền của chủ thể dữ liệu",
    subtitle: "Đồng ý phải rõ ràng và rút được, còn quyền thì phải thực hiện được bằng mã",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "✍️",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Phần này là nơi quy định biến thành công việc lập trình cụ thể: một nút rút đồng ý, một luồng xoá tài khoản chạy được tới tận bản sao lưu, một bản xuất dữ liệu. Thiết kế sau khi hệ thống đã chạy tốn gấp nhiều lần so với tính từ đầu.",
    openingQuestion: "Ô đồng ý đã tích sẵn có hợp lệ không?",
    openingOptions: [
      "Không, vì đồng ý phải chủ động",
      "Có, nếu ghi rõ trong điều khoản",
      "Có, nếu người dùng bỏ tích được",
      "Chỉ hợp lệ với dữ liệu cơ bản",
    ],
    correctOption: 0,
    explanation:
      "Sự đồng ý theo Nghị định 13 phải là hành động chủ động, rõ ràng và cho từng mục đích cụ thể - nên ô tích sẵn, im lặng coi như đồng ý, hay gộp mọi mục đích vào một dòng chấp nhận điều khoản đều không đạt. Điều này có hệ quả trực tiếp lên cách viết mã: bạn cần lưu lại đồng ý cho từng mục đích riêng, kèm thời điểm và phiên bản văn bản mà người dùng đã đọc. Và vì đồng ý rút được bất cứ lúc nào, hệ thống phải có đường rút - nghĩa là mọi luồng xử lý dựa trên đồng ý đều phải kiểm tra trạng thái hiện tại chứ không phải trạng thái lúc đăng ký.",
    diagram: [
      { label: "Đồng ý phải chủ động, cho từng mục đích", arrow: true },
      { label: "Lưu kèm thời điểm và phiên bản văn bản", arrow: true },
      { label: "Rút được bất cứ lúc nào", arrow: true },
      { label: "Nên luồng xử lý phải kiểm trạng thái hiện tại" },
    ],
    realWorldExample: {
      company: "Nút xoá tài khoản dừng ở bảng chính",
      description:
        "Một sản phẩm có nút xoá tài khoản, và nó xoá hàng trong bảng người dùng. Dữ liệu vẫn còn trong bảng đơn hàng, trong nhật ký, trong bộ nhớ đệm, trong công cụ phân tích của bên thứ ba, và trong ba mươi ngày bản sao lưu. Nút đó không sai về ý định - nó chỉ chưa đi hết đường mà nó hứa.",
    },
    quiz: [
      {
        question: "Vì sao phải lưu đồng ý theo từng mục đích riêng?",
        options: [
          "Vì người dùng có thể đồng ý việc này và từ chối việc kia",
          "Vì mỗi mục đích phải được cơ quan quản lý phê duyệt riêng trước khi dùng",
          "Vì lưu gộp làm bảng dữ liệu phình to hơn khi số người dùng tăng lên",
          "Vì hệ thống cần đếm số lượt đồng ý để báo cáo định kỳ hằng quý",
        ],
        correct: 0,
        explanation:
          "Đồng ý nhận thông báo dịch vụ và đồng ý nhận quảng cáo là hai chuyện khác nhau, và người dùng có quyền tách chúng ra. Một cột đồng ý duy nhất không mô tả được trạng thái đó, nên thiết kế bảng phải tính từ đầu.",
      },
      {
        question: "Vì sao phải lưu cả phiên bản văn bản mà người dùng đã đọc?",
        options: [
          "Vì khi chính sách đổi, bạn cần chứng minh họ đồng ý với bản nào",
          "Vì cơ quan quản lý yêu cầu nộp toàn bộ các phiên bản chính sách đã dùng",
          "Vì người dùng có quyền yêu cầu quay lại phiên bản chính sách trước đó",
          "Vì hệ thống cần so sánh các phiên bản để phát hiện thay đổi bất thường",
        ],
        correct: 0,
        explanation:
          "Đồng ý là đồng ý với một nội dung cụ thể, nên khi nội dung đổi thì câu hỏi tự nhiên là họ đã đồng ý với điều khoản nào. Không lưu phiên bản thì không trả lời được, và một bản ghi đồng ý không chứng minh được điều gì thì gần như vô giá trị.",
      },
      {
        question: "Quyền được xoá dữ liệu đặt ra yêu cầu kỹ thuật nào khó nhất?",
        options: [
          "Xoá phải đi tới mọi nơi dữ liệu đã lan, gồm cả bản sao lưu và bên thứ ba",
          "Xoá phải hoàn tất trong vòng hai mươi bốn giờ kể từ khi nhận yêu cầu",
          "Xoá phải được xác nhận bằng chữ ký số của người đại diện doanh nghiệp",
          "Xoá phải ghi đè dữ liệu nhiều lần để không khôi phục được từ ổ đĩa",
        ],
        correct: 0,
        explanation:
          "Đây là lý do bản đồ dữ liệu ở bài trước là bước bắt buộc. Xoá ở bảng chính là phần dễ; phần khó là các bản sao mà không ai liệt kê - và với bản sao lưu thì thường phải xử lý bằng chính sách thời hạn thay vì xoá trực tiếp.",
      },
      {
        question: "Vì sao luồng xử lý phải kiểm trạng thái đồng ý hiện tại?",
        options: [
          "Vì người dùng có thể đã rút đồng ý sau thời điểm đăng ký ban đầu",
          "Vì trạng thái đồng ý được lưu trong bộ nhớ đệm nên nó có thể đã cũ",
          "Vì mỗi phiên đăng nhập tạo ra một bản ghi đồng ý mới trong hệ thống",
          "Vì cơ quan quản lý yêu cầu kiểm tra lại đồng ý sau mỗi mười hai tháng",
        ],
        correct: 0,
        explanation:
          "Kiểm một lần lúc đăng ký rồi lưu kết quả vào cấu hình người dùng là mẫu sai phổ biến: nó biến một trạng thái thay đổi được thành một giá trị đóng băng. Nút rút đồng ý sẽ trông như hoạt động trong khi các luồng nền vẫn chạy như cũ.",
      },
      {
        question: "Yêu cầu xuất dữ liệu của người dùng nên trả về cái gì?",
        options: [
          "Dữ liệu họ đã cung cấp và dữ liệu hệ thống thu về gắn với họ",
          "Toàn bộ bảng dữ liệu có chứa mã định danh của người dùng đó",
          "Bản chụp màn hình hồ sơ cá nhân của họ dưới dạng hình ảnh",
          "Chỉ những trường mà người dùng đã tự tay nhập vào lúc đăng ký",
        ],
        correct: 0,
        explanation:
          "Không chỉ thứ họ gõ vào - lịch sử thao tác, thiết lập, dữ liệu sinh ra trong quá trình dùng cũng gắn với họ. Nhưng cũng không phải cả bảng thô, vì nó có thể chứa dữ liệu của người khác và cấu trúc nội bộ không nên lộ ra.",
      },
    ],
    keyTakeaways: [
      "Đồng ý phải chủ động, tách theo mục đích, và rút được bất cứ lúc nào",
      "Lưu kèm thời điểm và phiên bản văn bản, nếu không bản ghi đó không chứng minh được gì",
      "Luồng xử lý phải kiểm trạng thái hiện tại, không dùng giá trị lưu từ lúc đăng ký",
      "Quyền xoá đi xa hơn bảng chính - tới nhật ký, bộ nhớ đệm, bên thứ ba và bản sao lưu",
    ],
    practicePrompt: {
      question:
        "Sản phẩm của bạn có nút rút đồng ý nhận email quảng cáo. Điều gì phải kiểm để chắc nó thật sự hoạt động?",
      options: [
        "Luồng gửi email đọc trạng thái hiện tại, không dùng danh sách đã dựng sẵn",
        "Nút rút đồng ý có gửi email xác nhận lại cho người dùng hay không",
        "Bản ghi đồng ý cũ có được xoá hẳn khỏi cơ sở dữ liệu sau khi rút hay không",
        "Người dùng có thể đăng ký lại sau khi đã rút đồng ý trước đó hay không",
      ],
      correct: 0,
      explanation:
        "Đây là chỗ hỏng phổ biến nhất và cũng khó thấy nhất: nút chạy, bản ghi đổi, giao diện hiện đúng - nhưng công việc gửi email hằng đêm đang chạy trên một danh sách dựng từ tuần trước. Bản ghi đồng ý cũ thì ngược lại, phải giữ chứ không xoá, vì nó là bằng chứng.",
    },
    summary: {
      keyIdea: "Đồng ý là trạng thái thay đổi được, nên hệ thống phải đọc nó tại thời điểm xử lý chứ không đóng băng nó",
      commonMistake: "Nút xoá tài khoản chỉ xoá bảng chính, còn dữ liệu vẫn nằm ở năm chỗ khác",
      action: "Lần theo một yêu cầu xoá tài khoản trong hệ thống của bạn và ghi lại nó dừng ở đâu.",
    },
    application: {
      title: "Bốn thứ phải dựng được bằng mã",
      message:
        "Bảng đồng ý tách theo mục đích kèm phiên bản; một đường rút đồng ý; một luồng xoá đi hết bản đồ dữ liệu; và một bản xuất dữ liệu cho người dùng.",
      secondary:
        "Cả bốn đều rẻ khi thiết kế từ đầu và đắt khi phải chắp vào một hệ thống đã chạy nhiều năm.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước xác định phạm vi. Bài này là chỗ quy định biến thành việc lập trình cụ thể - và là phần mà đội kỹ thuật thực sự phải làm.",
      },
      { type: "heading", text: "Đồng ý là trạng thái, không phải một lần ký" },
      {
        type: "paragraph",
        text: "Mẫu sai phổ biến là coi đồng ý như một sự kiện lúc đăng ký: hỏi một lần, lưu một cờ, xong. Nhưng đồng ý rút được bất cứ lúc nào, nên nó là trạng thái sống. Mọi luồng dựa trên nó - gửi email, chia sẻ với đối tác, chạy phân tích - đều phải đọc trạng thái tại thời điểm chạy.",
      },
      {
        type: "conceptTable",
        title: "Bốn quyền và việc tương ứng phải làm",
        subtitle: "Mỗi quyền là một luồng phải chạy được, không phải một dòng trong chính sách",
        concepts: [
          {
            vi: "Quyền được biết",
            en: "Right to be informed",
            def: "Nói rõ thu gì, để làm gì, giữ bao lâu - bằng ngôn ngữ người dùng hiểu được, không phải bằng văn bản pháp lý.",
          },
          {
            vi: "Quyền rút đồng ý",
            en: "Right to withdraw",
            def: "Phải dễ như lúc đồng ý. Và quan trọng hơn: mọi luồng nền phải thật sự đọc trạng thái mới.",
          },
          {
            vi: "Quyền được xoá",
            en: "Right to erasure",
            def: "Đi hết bản đồ dữ liệu, gồm nhật ký, bộ nhớ đệm, bên thứ ba. Bản sao lưu thường xử lý bằng chính sách thời hạn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nút chạy không có nghĩa là luồng chạy",
        text: "Đây là dạng lỗi khó phát hiện nhất trong cả chặng: người dùng bấm rút đồng ý, bản ghi đổi, giao diện hiện trạng thái mới, và mọi thứ trông đúng. Nhưng công việc gửi thư hằng đêm đọc một danh sách được dựng sẵn từ tuần trước, nên email vẫn tới. Phép thử duy nhất đáng tin là chạy thật luồng đó và kiểm kết quả ở đầu ra.",
      },
      {
        type: "closing",
        lines: [
          "Quyền của người dùng chỉ có thật khi có một luồng mã chạy được đứng sau nó.",
          "Bài sau: đánh giá tác động xử lý dữ liệu - hồ sơ mà nhiều đội chỉ nghe tới khi đã muộn.",
        ],
      },
    ],
  },
  {
    id: 1445,
    slug: "thue-hoan-lai-deferred-tax",
    title: "Chuẩn mực & Dữ liệu, Bài 5: Đánh giá tác động xử lý dữ liệu",
    subtitle: "Hồ sơ phải lập trước khi xử lý, không phải sau khi có sự cố",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "📋",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Đây là hồ sơ mà nhiều đội chỉ nghe tới khi cơ quan quản lý hoặc một khách hàng doanh nghiệp hỏi tới, và lúc đó lập lại từ đầu rất tốn. Lập đúng lúc thì nó còn có tác dụng thật: nó buộc đội trả lời những câu mà thiết kế hệ thống nên trả lời từ đầu.",
    openingQuestion: "Hồ sơ đánh giá tác động phải lập vào lúc nào?",
    openingOptions: [
      "Trước khi bắt đầu xử lý",
      "Sau khi hệ thống chạy ổn định",
      "Khi cơ quan quản lý yêu cầu",
      "Sau mỗi sự cố lộ dữ liệu",
    ],
    correctOption: 0,
    explanation:
      "Nghị định 13 yêu cầu lập hồ sơ đánh giá tác động xử lý dữ liệu cá nhân từ khi bắt đầu xử lý, và lưu giữ để phục vụ kiểm tra. Đây không phải thủ tục hình thức nếu làm đúng lúc: bộ câu hỏi trong hồ sơ chính là những câu mà một thiết kế hệ thống tử tế phải trả lời - thu dữ liệu gì, để làm gì, giữ bao lâu, ai chạm được, chia sẻ với ai. Lập trước khi viết mã thì nó định hướng thiết kế và gần như không tốn thêm công. Lập sau khi hệ thống chạy vài năm thì nó biến thành một cuộc điều tra khảo cổ trong chính kho mã của mình, và thường phát hiện ra những thứ không ai muốn tìm thấy vào phút chót.",
    diagram: [
      { label: "Lập từ khi bắt đầu xử lý", arrow: true },
      { label: "Trả lời: thu gì, để làm gì, giữ bao lâu", arrow: true },
      { label: "Ai chạm được, chia sẻ với ai", arrow: true },
      { label: "Lưu giữ để phục vụ kiểm tra" },
    ],
    realWorldExample: {
      company: "Cuộc khảo cổ trong kho mã của chính mình",
      description:
        "Một đội được yêu cầu nộp hồ sơ cho hệ thống đã chạy bốn năm. Việc trả lời câu hệ thống thu những loại dữ liệu nào mất ba tuần, vì phải đọc lại mã của bốn thế hệ lập trình viên đã rời công ty. Câu trả lời cuối cùng dài hơn dự đoán ban đầu gấp đôi, và ba trường trong đó không ai còn nhớ vì sao được thu.",
    },
    quiz: [
      {
        question: "Vì sao lập hồ sơ sớm lại rẻ hơn nhiều?",
        options: [
          "Vì lúc đó câu trả lời còn nằm trong đầu người đang thiết kế",
          "Vì cơ quan quản lý giảm mức phí thẩm định cho hồ sơ nộp sớm",
          "Vì mẫu hồ sơ dành cho hệ thống mới ngắn hơn mẫu cho hệ thống cũ",
          "Vì hệ thống chưa có dữ liệu thật nên không phải liệt kê chi tiết",
        ],
        correct: 0,
        explanation:
          "Đây là toàn bộ khác biệt về chi phí. Người đang thiết kế biết ngay vì sao thu trường này; người đọc lại mã bốn năm sau thì phải suy đoán, và đôi khi không suy ra được. Cùng một hồ sơ, một bên mất một buổi và một bên mất ba tuần.",
      },
      {
        question: "Nội dung nào là phần khó nhất của hồ sơ với đội kỹ thuật?",
        options: [
          "Liệt kê đầy đủ nơi dữ liệu đang nằm, gồm cả nhật ký và bên thứ ba",
          "Ghi tên và chức danh của người phụ trách bảo vệ dữ liệu cá nhân",
          "Mô tả kiến trúc tổng thể của hệ thống bằng sơ đồ khối chi tiết",
          "Nêu tên các công nghệ và phiên bản phần mềm đang được sử dụng",
        ],
        correct: 0,
        explanation:
          "Cùng bài toán bản đồ dữ liệu ở Bài 3, và nó khó vì dữ liệu lan theo những đường không ai ghi lại: một lần xuất báo cáo, một công cụ phân tích cài từ năm ngoái, một bản sao lưu để tạm trên máy ai đó.",
      },
      {
        question: "Cơ sở pháp lý của việc xử lý dữ liệu quan trọng thế nào?",
        options: [
          "Nó quyết định bạn có được xử lý hay không, và người dùng có quyền gì",
          "Nó chỉ cần ghi trong chính sách quyền riêng tư chứ không ảnh hưởng tới mã",
          "Nó quyết định thời hạn tối đa mà dữ liệu được phép lưu trên hệ thống",
          "Nó xác định mức phí phải nộp khi đăng ký hồ sơ với cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Xử lý dựa trên đồng ý thì người dùng rút được, và bạn phải dừng. Xử lý dựa trên nghĩa vụ hợp đồng hay nghĩa vụ luật định thì không rút được theo cách đó. Hai trường hợp cho hai luồng mã khác nhau, nên đây là câu hỏi kỹ thuật chứ không chỉ pháp lý.",
      },
      {
        question: "Thời hạn lưu trữ nên được xác định thế nào?",
        options: [
          "Theo mục đích: hết mục đích thì hết lý do giữ dữ liệu đó",
          "Theo dung lượng: giữ tới khi ổ đĩa gần đầy rồi xoá bớt dữ liệu cũ nhất",
          "Theo thông lệ: giữ mười năm giống như hồ sơ kế toán của doanh nghiệp",
          "Theo yêu cầu người dùng: giữ cho tới khi có ai đó yêu cầu xoá đi",
        ],
        correct: 0,
        explanation:
          "Giữ vô thời hạn vì biết đâu sau này cần là mẫu sai phổ biến nhất, và nó biến mọi bản sao lưu thành một khoản nợ tăng dần. Ràng buộc theo mục đích cũng dễ triển khai bằng mã: một tác vụ định kỳ dọn theo tuổi dữ liệu.",
      },
      {
        question: "Khi nào phải cập nhật lại hồ sơ đánh giá tác động?",
        options: [
          "Khi thay đổi mục đích xử lý, loại dữ liệu thu, hoặc bên nhận dữ liệu",
          "Khi nâng cấp phiên bản của cơ sở dữ liệu hoặc khung phần mềm",
          "Khi số lượng người dùng của hệ thống tăng vượt mốc một trăm nghìn",
          "Khi có thay đổi nhân sự trong đội kỹ thuật phụ trách hệ thống đó",
        ],
        correct: 0,
        explanation:
          "Ba yếu tố đó chính là ba trục mà hồ sơ mô tả, nên đổi một trong ba là hồ sơ cũ không còn mô tả đúng thực tế. Thêm một công cụ phân tích mới cũng thuộc nhóm này, dù với đội kỹ thuật nó chỉ là một dòng cấu hình.",
      },
    ],
    keyTakeaways: [
      "Hồ sơ phải lập từ khi bắt đầu xử lý, không phải khi có người hỏi tới",
      "Lập sớm thì gần như miễn phí, vì câu trả lời còn trong đầu người thiết kế",
      "Cơ sở pháp lý quyết định người dùng có rút được hay không - đó là câu hỏi kỹ thuật",
      "Thời hạn lưu theo mục đích, và triển khai được bằng một tác vụ dọn định kỳ",
    ],
    practicePrompt: {
      question:
        "Đội bạn sắp thêm một công cụ phân tích hành vi người dùng của bên thứ ba. Việc phải làm là gì?",
      options: [
        "Cập nhật hồ sơ vì đã có thêm một bên nhận dữ liệu cá nhân",
        "Chỉ cần ghi thêm tên công cụ đó vào chính sách quyền riêng tư",
        "Không cần làm gì nếu công cụ đó chỉ thu dữ liệu ẩn danh về hành vi",
        "Ký hợp đồng bảo mật với nhà cung cấp công cụ rồi triển khai bình thường",
      ],
      correct: 0,
      explanation:
        "Thêm một bên nhận dữ liệu là đúng loại thay đổi buộc phải cập nhật hồ sơ. Phương án ba là bẫy quen thuộc: dữ liệu hành vi gắn với mã định danh thiết bị thường vẫn lần ra được một người, nên ẩn danh ở đây phải chứng minh chứ không phải mặc định.",
    },
    summary: {
      keyIdea: "Hồ sơ đánh giá tác động là bộ câu hỏi mà một thiết kế tử tế phải trả lời, nên làm sớm thì gần như miễn phí",
      commonMistake: "Để tới khi bị hỏi mới lập, lúc người biết câu trả lời đã rời công ty",
      action: "Thử trả lời bốn câu - thu gì, để làm gì, giữ bao lâu, ai chạm được - cho một tính năng bạn đang làm.",
    },
    application: {
      title: "Bốn câu hỏi, hỏi trước khi viết mã",
      message:
        "Thu dữ liệu gì; cơ sở pháp lý nào cho phép; giữ trong bao lâu và ai dọn; ai chạm được và chia sẻ với bên nào. Trả lời được bốn câu là hồ sơ đã xong phần khó nhất.",
      secondary:
        "Và chúng cũng là bốn câu định hình thiết kế bảng dữ liệu, nên đây không phải công việc thêm.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước nói về phạm vi và về quyền. Bài này là hồ sơ ràng buộc hai thứ đó lại - và là thứ duy nhất trong chặng mà làm muộn đắt hơn làm sớm nhiều lần.",
      },
      { type: "heading", text: "Bộ câu hỏi, không phải thủ tục" },
      {
        type: "paragraph",
        text: "Nhìn từ phía pháp chế, đây là hồ sơ phải nộp khi được yêu cầu. Nhìn từ phía kỹ thuật, nó là danh sách câu hỏi mà bất kỳ thiết kế dữ liệu nào cũng nên trả lời trước khi tạo bảng đầu tiên. Hai góc nhìn ấy trùng nhau gần hết, và đó là lý do làm sớm thì gần như không tốn thêm công.",
      },
      {
        type: "conceptTable",
        title: "Ba trục mà hồ sơ mô tả",
        subtitle: "Đổi bất kỳ trục nào cũng phải cập nhật lại hồ sơ",
        concepts: [
          {
            vi: "Mục đích xử lý",
            en: "Purpose",
            def: "Thu để làm gì. Nó cũng chính là thứ quyết định thời hạn lưu - hết mục đích là hết lý do giữ.",
          },
          {
            vi: "Cơ sở pháp lý",
            en: "Legal basis",
            def: "Đồng ý, nghĩa vụ hợp đồng, hay nghĩa vụ luật định. Mỗi loại cho một luồng mã khác nhau khi người dùng yêu cầu dừng.",
          },
          {
            vi: "Bên nhận dữ liệu",
            en: "Recipients",
            def: "Ai được chia sẻ, gồm cả công cụ phân tích và nhà cung cấp hạ tầng. Thêm một công cụ là thêm một bên nhận.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ẩn danh là điều phải chứng minh, không phải mặc định",
        text: "Rất nhiều đội cho rằng dữ liệu hành vi không có tên thì không phải dữ liệu cá nhân. Nhưng một mã định danh thiết bị ổn định, cộng lịch sử thao tác, cộng thời điểm - ghép lại thường lần ra đúng một người. Ẩn danh thật nghĩa là không thể lần ngược kể cả khi ghép với dữ liệu khác, và đó là một tiêu chuẩn cao hơn nhiều so với việc chỉ bỏ cột tên.",
      },
      {
        type: "closing",
        lines: [
          "Hồ sơ làm đúng lúc là tài liệu thiết kế; làm muộn là một cuộc điều tra.",
          "Bài sau: lưu trữ dữ liệu trong nước - yêu cầu nào có thật và áp cho ai.",
        ],
      },
    ],
  },
  {
    id: 1446,
    slug: "chi-phi-duoc-tru-va-khong-duoc-tru",
    title: "Chuẩn mực & Dữ liệu, Bài 6: Lưu trữ dữ liệu trong nước",
    subtitle: "Yêu cầu áp cho một số nhóm dịch vụ, không phải cho mọi hệ thống",
    duration: "7 phút",
    difficulty: "Khó",
    emoji: "🇻🇳",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Đây là chủ đề bị nói quá theo cả hai chiều: có người tưởng mọi máy chủ đều phải đặt trong nước, có người tưởng không ai phải làm gì. Cả hai đều dẫn tới quyết định hạ tầng sai, và hạ tầng thì rất đắt để đổi lại.",
    openingQuestion: "Yêu cầu lưu trữ trong nước áp cho ai?",
    openingOptions: [
      "Một số nhóm dịch vụ nhất định",
      "Mọi hệ thống có người dùng Việt",
      "Chỉ doanh nghiệp nhà nước",
      "Chỉ ngân hàng và viễn thông",
    ],
    correctOption: 0,
    explanation:
      "Nghị định 53/2022 hướng dẫn Luật An ninh mạng đặt yêu cầu lưu trữ dữ liệu tại Việt Nam cho một số nhóm dịch vụ cụ thể - mạng xã hội, dịch vụ nội dung, thương mại điện tử, thanh toán, trò chơi trên mạng và một số nhóm khác - chứ không phải cho mọi hệ thống có người dùng Việt Nam. Quan trọng hơn, với doanh nghiệp nước ngoài thì yêu cầu chỉ phát sinh sau khi có yêu cầu bằng văn bản từ cơ quan có thẩm quyền và các điều kiện kèm theo được đáp ứng. Hệ quả thực tế cho đội kỹ thuật: đừng suy ra kiến trúc từ tin đồn. Xác định nhóm dịch vụ của mình trước, rồi mới quyết định đặt dữ liệu ở đâu.",
    diagram: [
      { label: "Xác định nhóm dịch vụ của mình", arrow: true },
      { label: "Kiểm yêu cầu áp cho nhóm đó", arrow: true },
      { label: "Doanh nghiệp ngoài: cần yêu cầu bằng văn bản", arrow: true },
      { label: "Rồi mới quyết định kiến trúc lưu trữ" },
    ],
    realWorldExample: {
      company: "Chuyển vùng theo tin đồn",
      description:
        "Một đội nghe nói mọi dữ liệu phải nằm trong nước, và lên kế hoạch chuyển toàn bộ hệ thống về một vùng trong nước. Chi phí ước tính ba tháng công. Khi pháp chế đọc kỹ thì dịch vụ của họ không thuộc nhóm phải lưu trong nước, và phần thật sự cần xử lý chỉ là một thoả thuận chuyển dữ liệu với nhà cung cấp.",
    },
    quiz: [
      {
        question: "Bước đầu tiên khi đánh giá yêu cầu lưu trữ trong nước là gì?",
        options: [
          "Xác định dịch vụ của mình thuộc nhóm nào trong danh mục",
          "Liệt kê toàn bộ vùng máy chủ mà nhà cung cấp đám mây đang có",
          "Ước tính chi phí chuyển dữ liệu về một trung tâm dữ liệu trong nước",
          "Kiểm tra tốc độ đường truyền từ Việt Nam tới vùng đang đặt máy chủ",
        ],
        correct: 0,
        explanation:
          "Nếu dịch vụ không thuộc nhóm phải lưu trong nước thì ba câu hỏi kia đều không cần trả lời. Đây là thứ tự tiết kiệm nhất, và nó chỉ tốn một buổi đọc văn bản cùng pháp chế.",
      },
      {
        question: "Lưu trữ trong nước khác với chủ quyền dữ liệu ở điểm nào?",
        options: [
          "Lưu trong nước nói về vị trí vật lý, chủ quyền nói về luật nào áp dụng",
          "Lưu trong nước áp cho dữ liệu cá nhân, chủ quyền áp cho dữ liệu doanh nghiệp",
          "Lưu trong nước là yêu cầu bắt buộc, còn chủ quyền dữ liệu chỉ là khuyến nghị",
          "Lưu trong nước do bộ ngành quản lý, còn chủ quyền dữ liệu do toà án quyết định",
        ],
        correct: 0,
        explanation:
          "Hai khái niệm hay bị dùng lẫn. Đặt máy trong nước không tự động làm dữ liệu thoát khỏi thẩm quyền của luật nước khác nếu bên vận hành là pháp nhân nước đó - và ngược lại. Với đội kỹ thuật, phân biệt này quyết định bạn đang giải bài toán vị trí hay bài toán hợp đồng.",
      },
      {
        question: "Bản sao lưu có thuộc phạm vi yêu cầu lưu trữ không?",
        options: [
          "Có, vì bản sao lưu cũng là nơi dữ liệu đang nằm",
          "Không, vì bản sao lưu chỉ dùng để khôi phục chứ không phục vụ người dùng",
          "Không, nếu bản sao lưu được mã hoá bằng khoá do doanh nghiệp tự quản lý",
          "Chỉ khi bản sao lưu được giữ quá thời hạn mười hai tháng liên tục",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ dễ bỏ sót nhất khi lập kế hoạch: hệ thống chính chuyển về đúng vùng, còn bản sao lưu vẫn nằm ở vùng cũ theo cấu hình mặc định của nhà cung cấp. Cùng bài học với Bài 4 - dữ liệu lan xa hơn bảng chính.",
      },
      {
        question: "Vùng đặt máy chủ ảnh hưởng thế nào tới trải nghiệm người dùng?",
        options: [
          "Vùng xa làm tăng độ trễ của mỗi vòng gọi, và người dùng cảm nhận được",
          "Vùng xa làm giảm băng thông tối đa mà nhà cung cấp cho phép mỗi máy chủ",
          "Vùng xa khiến chứng chỉ TLS phải cấp lại theo quốc gia đặt máy chủ",
          "Vùng xa buộc phải dùng tên miền cấp quốc gia thay cho tên miền quốc tế",
        ],
        correct: 0,
        explanation:
          "Đúng bài học độ trễ của Chặng 7: một vòng gọi qua nửa vòng trái đất mất hàng trăm mili giây, và một trang cần nhiều vòng gọi thì con số đó nhân lên. Đây là lý do kỹ thuật để cân nhắc vùng gần, độc lập với lý do pháp lý.",
      },
      {
        question: "Cách xử lý hợp lý khi yêu cầu pháp lý chưa rõ ràng là gì?",
        options: [
          "Thiết kế để chuyển vùng được, thay vì đoán trước một phương án cố định",
          "Chọn phương án an toàn nhất là đặt toàn bộ dữ liệu trong nước ngay từ đầu",
          "Chờ tới khi có yêu cầu chính thức rồi mới bắt đầu tính tới việc chuyển",
          "Đặt dữ liệu ở nhiều vùng cùng lúc để đáp ứng được mọi khả năng xảy ra",
        ],
        correct: 0,
        explanation:
          "Bài toán thật là bất định, và cách xử lý bất định không phải là đoán mà là giữ cho chi phí đổi ý thấp: tách cấu hình vùng khỏi mã, không phụ thuộc dịch vụ chỉ có ở một vùng, và biết trước dữ liệu nằm ở đâu. Nhiều vùng cùng lúc thì đắt và làm nảy sinh bài toán đồng bộ.",
      },
    ],
    keyTakeaways: [
      "Yêu cầu áp cho một số nhóm dịch vụ, không phải mọi hệ thống có người dùng Việt",
      "Xác định nhóm dịch vụ trước, đừng suy kiến trúc từ tin đồn",
      "Bản sao lưu cũng là nơi dữ liệu nằm, và hay bị bỏ quên khi chuyển vùng",
      "Khi luật chưa rõ, hãy giữ chi phí chuyển vùng thấp thay vì đoán một phương án",
    ],
    practicePrompt: {
      question:
        "Lãnh đạo yêu cầu chuyển toàn bộ hệ thống về vùng trong nước vì nghe nói luật bắt buộc. Việc nên làm trước tiên là gì?",
      options: [
        "Cùng pháp chế xác định dịch vụ có thuộc nhóm phải lưu trong nước không",
        "Lập kế hoạch chuyển vùng chi tiết kèm ước tính thời gian và chi phí",
        "Đo độ trễ từ Việt Nam tới vùng hiện tại để đánh giá lợi ích của việc chuyển",
        "Hỏi nhà cung cấp đám mây xem họ có vùng đặt tại Việt Nam hay không",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều là công việc thật, và đều vô nghĩa nếu câu trả lời cho câu đầu là không thuộc nhóm. Một buổi đọc văn bản cùng pháp chế đứng trước ba tháng công chuyển vùng - đó là toàn bộ lý do thứ tự này quan trọng.",
    },
    summary: {
      keyIdea: "Yêu cầu lưu trữ trong nước có phạm vi cụ thể, nên bước đầu là xác định nhóm chứ không phải chuyển vùng",
      commonMistake: "Suy ra kiến trúc hạ tầng từ tin đồn, rồi trả giá bằng ba tháng công",
      action: "Xác định dịch vụ của bạn thuộc nhóm nào, và ghi lại căn cứ cho kết luận đó.",
    },
    application: {
      title: "Giữ chi phí đổi ý thấp",
      message:
        "Tách cấu hình vùng ra khỏi mã; tránh phụ thuộc dịch vụ chỉ có ở một vùng; biết chính xác dữ liệu và bản sao lưu đang nằm ở đâu. Ba việc đó làm mọi quyết định vùng sau này thành một thay đổi cấu hình.",
      secondary:
        "Với một yêu cầu pháp lý còn đang chuyển động, khả năng đổi ý rẻ đáng giá hơn một phương án đoán trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước nói về dữ liệu cá nhân. Bài này về một yêu cầu khác hẳn - không hỏi bạn xử lý dữ liệu thế nào, mà hỏi dữ liệu đang nằm ở đâu.",
      },
      { type: "heading", text: "Phạm vi hẹp hơn tin đồn" },
      {
        type: "paragraph",
        text: "Yêu cầu lưu trữ trong nước gắn với danh mục nhóm dịch vụ cụ thể, và với doanh nghiệp nước ngoài thì còn kèm điều kiện về yêu cầu bằng văn bản từ cơ quan có thẩm quyền. Vì vậy câu hỏi đầu tiên luôn là dịch vụ của mình có nằm trong danh mục không - và với nhiều đội, câu trả lời là không.",
      },
      {
        type: "conceptTable",
        title: "Ba câu hỏi hay bị gộp làm một",
        subtitle: "Ba bài toán khác nhau, ba cách giải khác nhau",
        concepts: [
          {
            vi: "Lưu trữ trong nước",
            en: "Data localisation",
            def: "Dữ liệu nằm ở đâu về mặt vật lý. Bài toán hạ tầng, và giải bằng lựa chọn vùng.",
          },
          {
            vi: "Chuyển dữ liệu ra ngoài",
            en: "Cross-border transfer",
            def: "Được gửi ra nước ngoài không và với điều kiện gì. Bài toán hồ sơ và hợp đồng - bài sau nói kỹ.",
          },
          {
            vi: "Chủ quyền dữ liệu",
            en: "Data sovereignty",
            def: "Luật nước nào có thẩm quyền với dữ liệu đó. Phụ thuộc pháp nhân vận hành, không chỉ vị trí máy chủ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bản sao lưu là chỗ kế hoạch chuyển vùng hay hụt",
        text: "Chuyển hệ thống chính về đúng vùng là phần ai cũng làm. Bản sao lưu thì thường theo cấu hình mặc định của nhà cung cấp, và mặc định đó rất hay là một vùng khác - đôi khi ở châu lục khác. Nhật ký gửi sang công cụ giám sát của bên thứ ba cũng vậy. Cả hai đều là nơi dữ liệu đang nằm, và cả hai đều không nằm trong sơ đồ kiến trúc mà đội vẽ ra.",
      },
      {
        type: "closing",
        lines: [
          "Đọc kỹ phạm vi trước khi đổi hạ tầng là cách rẻ nhất để không phải đổi hai lần.",
          "Bài sau: chuyển dữ liệu ra nước ngoài - hồ sơ, điều kiện và những gì phải chuẩn bị.",
        ],
      },
    ],
  },
  {
    id: 1447,
    slug: "uu-dai-thue-va-chuyen-gia",
    title: "Chuẩn mực & Dữ liệu, Bài 7: Chuyển dữ liệu ra nước ngoài",
    subtitle: "Dùng một dịch vụ đám mây nước ngoài đã là chuyển dữ liệu ra ngoài",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🌐",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Gần như đội nào cũng đang chuyển dữ liệu ra nước ngoài mà không gọi nó bằng tên đó: một dịch vụ gửi thư, một công cụ phân tích, một nhà cung cấp đám mây. Biết điều này sớm giúp hồ sơ theo kịp thực tế, thay vì phát hiện ra khoảng chênh vào lúc bị hỏi.",
    openingQuestion: "Dùng dịch vụ gửi email của một công ty nước ngoài có phải chuyển dữ liệu ra ngoài không?",
    openingOptions: [
      "Có, vì địa chỉ email đã đi ra",
      "Không, vì chỉ gửi đi chứ không lưu",
      "Chỉ khi gửi kèm tệp đính kèm",
      "Chỉ khi công ty đó ngoài châu Á",
    ],
    correctOption: 0,
    explanation:
      "Chuyển dữ liệu ra nước ngoài không đòi hỏi phải là một cuộc di chuyển lớn có kế hoạch. Gọi một API của nhà cung cấp nước ngoài và gửi kèm địa chỉ email của người dùng đã là chuyển dữ liệu cá nhân ra ngoài lãnh thổ, kể cả khi bên đó không lưu lại lâu. Điều này áp cho gần như mọi công cụ mà một đội hiện đại dùng: dịch vụ gửi thư, công cụ phân tích, nền tảng hỗ trợ khách hàng, dịch vụ lưu trữ tệp. Vì vậy phần khó của hồ sơ chuyển dữ liệu ra nước ngoài thường không phải viết hồ sơ, mà là lập cho đủ danh sách các bên đang nhận - danh sách mà rất ít đội có sẵn.",
    diagram: [
      { label: "Gọi API nhà cung cấp nước ngoài", arrow: true },
      { label: "Gửi kèm dữ liệu cá nhân", arrow: true },
      { label: "Đã là chuyển ra ngoài lãnh thổ", arrow: true },
      { label: "Kể cả khi bên kia không lưu lại" },
    ],
    realWorldExample: {
      company: "Danh sách bên nhận dài hơn dự đoán",
      description:
        "Một đội lập danh sách các bên đang nhận dữ liệu người dùng và dự đoán khoảng ba cái tên. Kết quả cuối cùng là mười một: đám mây, gửi thư giao dịch, gửi thư quảng cáo, phân tích hành vi, theo dõi lỗi, hỗ trợ khách hàng trực tuyến, xác thực đăng nhập, lưu trữ tệp, giám sát hạ tầng, gửi tin nhắn và một công cụ khảo sát mà bộ phận marketing tự cài.",
    },
    quiz: [
      {
        question: "Phần khó nhất của hồ sơ chuyển dữ liệu ra nước ngoài thường là gì?",
        options: [
          "Lập đủ danh sách các bên đang thực sự nhận dữ liệu",
          "Dịch toàn bộ hợp đồng với nhà cung cấp sang tiếng Việt",
          "Chứng minh nước nhận có luật bảo vệ dữ liệu tương đương Việt Nam",
          "Xác định chính xác dung lượng dữ liệu được chuyển đi trong mỗi tháng",
        ],
        correct: 0,
        explanation:
          "Viết hồ sơ là việc của vài ngày khi đã biết nội dung. Lập danh sách thì khó, vì công cụ được thêm vào theo thời gian bởi nhiều bộ phận, và nhiều cái được cài bằng một dòng mã hoặc một thẻ theo dõi mà đội kỹ thuật không hay biết.",
      },
      {
        question: "Công cụ theo dõi lỗi có nằm trong phạm vi không?",
        options: [
          "Có, vì báo cáo lỗi thường kèm dữ liệu người dùng lúc phát sinh",
          "Không, vì nó chỉ ghi lại vết ngăn xếp chứ không ghi dữ liệu người dùng",
          "Không, vì dữ liệu trong báo cáo lỗi được tự động ẩn danh trước khi gửi",
          "Chỉ khi đội bật tuỳ chọn ghi kèm thông tin phiên đăng nhập của người dùng",
        ],
        correct: 0,
        explanation:
          "Một báo cáo lỗi tự động thường kèm mã người dùng, đường dẫn đang mở, đôi khi cả nội dung biểu mẫu đang nhập. Đây là một trong những đường rò dữ liệu bị bỏ sót nhiều nhất, vì nó được cài một lần rồi không ai xem lại nó gửi đi những gì.",
      },
      {
        question: "Nghĩa vụ với bên nhận dữ liệu ở nước ngoài nên được ràng buộc bằng gì?",
        options: [
          "Điều khoản hợp đồng về bảo vệ dữ liệu với bên xử lý",
          "Cam kết miệng từ đại diện bán hàng của nhà cung cấp đó",
          "Chứng chỉ bảo mật quốc tế mà nhà cung cấp đang sở hữu",
          "Điều khoản sử dụng công khai đăng trên trang chủ của họ",
        ],
        correct: 0,
        explanation:
          "Chứng chỉ bảo mật nói về cách họ vận hành nói chung, không tạo ra nghĩa vụ với riêng dữ liệu của bạn. Thứ ràng buộc được là hợp đồng có điều khoản cụ thể - và phần lớn nhà cung cấp lớn đều có sẵn phụ lục dạng này để ký.",
      },
      {
        question: "Vì sao thuê ngoài không chuyển được nghĩa vụ đi?",
        options: [
          "Vì bạn là bên kiểm soát, nên vẫn chịu trách nhiệm về dữ liệu đã giao",
          "Vì nhà cung cấp nước ngoài không chịu sự điều chỉnh của luật Việt Nam",
          "Vì hợp đồng với nhà cung cấp thường có điều khoản miễn trừ trách nhiệm",
          "Vì cơ quan quản lý chỉ làm việc với các doanh nghiệp đăng ký trong nước",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả của phân vai ở Bài 3. Bạn quyết định thu dữ liệu và giao cho ai, nên trách nhiệm vẫn ở bạn - kể cả khi sự cố xảy ra hoàn toàn ở phía nhà cung cấp. Điều đó biến việc chọn nhà cung cấp thành một quyết định tuân thủ, không chỉ là quyết định kỹ thuật.",
      },
      {
        question: "Cách rẻ nhất để giữ danh sách bên nhận luôn đúng là gì?",
        options: [
          "Biến việc thêm một bên nhận thành một bước trong quy trình rà soát mã",
          "Rà soát lại toàn bộ danh sách một lần vào cuối mỗi năm tài chính",
          "Giao cho bộ phận pháp chế tự theo dõi các công cụ mà đội đang dùng",
          "Yêu cầu mọi nhà cung cấp gửi báo cáo định kỳ về dữ liệu đã nhận",
        ],
        correct: 0,
        explanation:
          "Danh sách trôi vì nó được cập nhật theo đợt còn công cụ thì được thêm vào hằng tuần. Gắn nó vào đúng chỗ thay đổi xảy ra - một dòng trong mẫu pull request - giữ nó đúng mà gần như không tốn công.",
      },
    ],
    keyTakeaways: [
      "Gọi API của nhà cung cấp nước ngoài kèm dữ liệu cá nhân đã là chuyển ra ngoài",
      "Phần khó là lập đủ danh sách bên nhận, không phải viết hồ sơ",
      "Công cụ theo dõi lỗi và phân tích là hai đường rò bị bỏ sót nhiều nhất",
      "Thuê ngoài không chuyển nghĩa vụ đi - bên kiểm soát vẫn chịu trách nhiệm",
    ],
    practicePrompt: {
      question:
        "Bạn muốn danh sách bên nhận dữ liệu không bị lạc hậu. Cách nào bền nhất?",
      options: [
        "Thêm một mục trong mẫu pull request khi có thêm phụ thuộc gửi dữ liệu ra ngoài",
        "Đặt lịch nhắc mỗi quý để đội cùng ngồi rà lại danh sách một lượt",
        "Giao cho một người trong đội làm đầu mối theo dõi mọi công cụ mới",
        "Quét mã tự động mỗi đêm để tìm mọi lời gọi đi ra một tên miền bên ngoài kho",
      ],
      correct: 0,
      explanation:
        "Đặt phép kiểm ngay tại thời điểm thay đổi thì nó không thể trôi, đúng nguyên tắc đã dùng cho cổng định dạng ở Bài 1. Quét tự động nghe hay nhưng khó phân biệt lời gọi có kèm dữ liệu cá nhân với lời gọi không, nên nó bổ sung chứ không thay được.",
    },
    summary: {
      keyIdea: "Mọi lời gọi ra nhà cung cấp nước ngoài kèm dữ liệu cá nhân đều là chuyển dữ liệu ra ngoài lãnh thổ",
      commonMistake: "Chỉ tính nhà cung cấp đám mây, bỏ qua công cụ phân tích và theo dõi lỗi",
      action: "Liệt kê mọi bên thứ ba mà hệ thống của bạn đang gửi dữ liệu người dùng tới.",
    },
    application: {
      title: "Danh sách bên nhận, giữ cho đúng",
      message:
        "Tên bên nhận; dữ liệu gì được gửi; mục đích; và hợp đồng có điều khoản bảo vệ dữ liệu chưa. Bốn cột, và cập nhật ngay tại pull request thêm phụ thuộc mới.",
      secondary:
        "Danh sách này cũng chính là thứ mà khách hàng doanh nghiệp sẽ hỏi trước khi ký hợp đồng với bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước hỏi dữ liệu nằm ở đâu. Bài này hỏi nó đi những đâu - và câu trả lời thường dài hơn nhiều so với dự đoán ban đầu của đội.",
      },
      { type: "heading", text: "Chuyển ra ngoài không cần là một cuộc di chuyển" },
      {
        type: "paragraph",
        text: "Hình dung thường thấy là chuyển cả cơ sở dữ liệu sang máy chủ nước ngoài. Thực tế thì mỗi lời gọi API kèm một địa chỉ email, mỗi báo cáo lỗi kèm mã người dùng, mỗi sự kiện phân tích kèm mã thiết bị đều là chuyển dữ liệu ra ngoài - và chúng xảy ra hàng nghìn lần mỗi phút mà không ai gọi tên như vậy.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm bên nhận hay bị quên",
        subtitle: "Đám mây thì ai cũng nhớ, ba nhóm này thì không",
        concepts: [
          {
            vi: "Theo dõi lỗi",
            en: "Error tracking",
            def: "Báo cáo tự động thường kèm mã người dùng, đường dẫn và đôi khi nội dung biểu mẫu đang nhập dở.",
          },
          {
            vi: "Phân tích hành vi",
            en: "Analytics",
            def: "Gửi liên tục theo từng thao tác, thường kèm mã thiết bị ổn định - thứ lần ra được một người.",
          },
          {
            vi: "Công cụ bộ phận khác cài",
            en: "Shadow tools",
            def: "Thẻ theo dõi hay công cụ khảo sát do marketing thêm vào. Đội kỹ thuật thường không biết chúng tồn tại.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chọn nhà cung cấp là một quyết định tuân thủ",
        text: "Vì bên kiểm soát vẫn chịu trách nhiệm, sự cố ở phía nhà cung cấp vẫn là sự cố của bạn trước người dùng và trước cơ quan quản lý. Điều đó đưa hai câu hỏi vào quy trình chọn công cụ, ngang hàng với giá và tính năng: họ có phụ lục về bảo vệ dữ liệu để ký không, và họ đặt dữ liệu ở đâu.",
      },
      {
        type: "closing",
        lines: [
          "Danh sách bên nhận là tài liệu ít ai có sẵn và luôn được hỏi tới đầu tiên.",
          "Bài sau: kiểm tra, xử phạt, và bộ hồ sơ cần có sẵn trước khi bị hỏi.",
        ],
      },
    ],
  },
  {
    id: 1448,
    slug: "quyet-toan-va-thanh-tra-thue",
    title: "Chuẩn mực & Dữ liệu, Bài 8: Kiểm tra, xử phạt và hồ sơ phải có",
    subtitle: "Thứ quyết định buổi kiểm tra không phải hệ thống tốt, mà là hồ sơ có sẵn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🗄️",
    track: "professional",
    interactiveType: "ethics-case",
    whyItMatters:
      "Một hệ thống làm đúng mọi thứ nhưng không chứng minh được thì trong buổi kiểm tra không khác gì hệ thống làm sai. Bài cuối chặng gộp bảy bài trước thành một bộ hồ sơ dựng sẵn, và một quy trình xử lý khi có sự cố lộ dữ liệu.",
    openingQuestion: "Điều gì quyết định kết quả một buổi kiểm tra tuân thủ?",
    openingOptions: [
      "Hồ sơ chứng minh được điều đã làm",
      "Số lượng biện pháp kỹ thuật đã dựng",
      "Quy mô và doanh thu của doanh nghiệp",
      "Việc đã từng xảy ra sự cố hay chưa",
    ],
    correctOption: 0,
    explanation:
      "Trong một buổi kiểm tra, câu hỏi không phải hệ thống của bạn có an toàn không mà là bạn chứng minh được những gì. Mã hoá dữ liệu mà không có tài liệu mô tả phạm vi mã hoá, phân quyền chặt mà không có danh sách ai được truy cập, xoá dữ liệu đúng hạn mà không có nhật ký chứng minh việc xoá đã chạy - cả ba trường hợp đều là làm đúng mà không chứng minh được. Điều này đổi cách nghĩ về công việc tuân thủ: nó không phải một lớp bảo vệ thêm vào hệ thống, mà là việc để lại dấu vết cho những thứ hệ thống vốn đã làm. Phần lớn dấu vết đó sinh ra tự động nếu được thiết kế từ đầu.",
    diagram: [
      { label: "Hệ thống làm đúng", arrow: true },
      { label: "Nhưng không để lại dấu vết", arrow: true },
      { label: "Thì không chứng minh được trong kiểm tra", arrow: true },
      { label: "Nên hãy thiết kế để dấu vết tự sinh" },
    ],
    realWorldExample: {
      company: "Làm đúng mà không chứng minh được",
      description:
        "Một đội có tác vụ dọn dữ liệu quá hạn chạy hằng đêm suốt hai năm. Khi được hỏi chứng minh dữ liệu đã được xoá đúng hạn, họ không có gì để đưa ra: tác vụ chạy im lặng, không ghi lại đã xoá bao nhiêu bản ghi và tới mốc thời gian nào. Việc thêm ba dòng ghi nhật ký lẽ ra tốn mười phút, hai năm trước.",
    },
    quiz: [
      {
        question: "Nghĩa vụ thông báo khi có sự cố lộ dữ liệu đòi hỏi gì về mặt kỹ thuật?",
        options: [
          "Phát hiện được sự cố và xác định được phạm vi trong thời gian ngắn",
          "Có sẵn một mẫu thông báo đã được bộ phận pháp chế phê duyệt trước",
          "Mã hoá toàn bộ dữ liệu để sự cố không còn phải thông báo nữa",
          "Lưu giữ bản sao lưu đủ lâu để khôi phục lại trạng thái trước sự cố",
        ],
        correct: 0,
        explanation:
          "Thời hạn thông báo tính từ khi phát hiện, nên năng lực phát hiện quyết định tất cả. Và thông báo cần nêu phạm vi - loại dữ liệu nào, bao nhiêu người - nên bản đồ dữ liệu ở Bài 3 lại là thứ được dùng tới đúng lúc căng thẳng nhất.",
      },
      {
        question: "Vì sao nhật ký truy cập dữ liệu cá nhân lại quan trọng?",
        options: [
          "Vì nó là bằng chứng ai đã xem gì, và cần khi điều tra một sự cố",
          "Vì cơ quan quản lý yêu cầu nộp toàn bộ nhật ký truy cập theo định kỳ",
          "Vì nó giúp tối ưu hiệu năng bằng cách tìm ra truy vấn được gọi nhiều nhất",
          "Vì nó thay thế được cho việc phân quyền truy cập ở tầng cơ sở dữ liệu",
        ],
        correct: 0,
        explanation:
          "Khi có nghi vấn lộ dữ liệu từ bên trong, câu hỏi đầu tiên là ai đã truy cập những bản ghi đó. Không có nhật ký thì không trả lời được, và một cuộc điều tra không có câu trả lời sẽ mặc định theo hướng xấu nhất.",
      },
      {
        question: "Bộ hồ sơ tối thiểu nên có sẵn gồm những gì?",
        options: [
          "Bản đồ dữ liệu, hồ sơ đánh giá tác động, danh sách bên nhận và quy trình sự cố",
          "Sơ đồ kiến trúc hệ thống, mã nguồn và toàn bộ tài liệu hướng dẫn cách triển khai",
          "Hợp đồng lao động của toàn bộ nhân sự có quyền truy cập dữ liệu",
          "Báo cáo kiểm thử xâm nhập do một đơn vị độc lập bên ngoài thực hiện hằng năm",
        ],
        correct: 0,
        explanation:
          "Bốn tài liệu này chính là kết quả của bảy bài trước cộng lại, và chúng trả lời gần hết mọi câu hỏi trong một buổi kiểm tra. Kiểm thử xâm nhập là việc tốt nhưng trả lời một câu hỏi khác - hệ thống có lỗ hổng không, chứ không phải bạn xử lý dữ liệu thế nào.",
      },
      {
        question: "Vì sao tác vụ dọn dữ liệu nên ghi lại kết quả mỗi lần chạy?",
        options: [
          "Vì đó là bằng chứng duy nhất cho thấy chính sách thời hạn đã được thực thi",
          "Vì hệ thống cần con số đó để ước tính dung lượng ổ đĩa cho tháng tiếp theo",
          "Vì nếu không ghi lại thì tác vụ sẽ phải chạy lại từ đầu vào lần kế tiếp",
          "Vì cơ quan quản lý yêu cầu báo cáo số bản ghi đã xoá theo từng quý",
        ],
        correct: 0,
        explanation:
          "Chính sách viết trên giấy không chứng minh được nó đã chạy. Ba dòng ghi lại số bản ghi đã xoá và mốc thời gian biến một lời khẳng định thành một bằng chứng - và đây cũng chính là tín hiệu mà cảnh báo thiếu-tín-hiệu ở Chặng 12 cần tới.",
      },
      {
        question: "Cách bền nhất để hồ sơ không lạc hậu là gì?",
        options: [
          "Gắn việc cập nhật vào đúng chỗ thay đổi xảy ra trong quy trình phát triển",
          "Đặt lịch rà soát lại toàn bộ hồ sơ vào tháng cuối của mỗi năm tài chính",
          "Giao cho bộ phận pháp chế chủ động hỏi đội kỹ thuật mỗi khi cần",
          "Lưu hồ sơ ngay trong cùng kho mã để mọi người đều nhìn thấy khi làm việc",
        ],
        correct: 0,
        explanation:
          "Đây là nguyên tắc lặp lại lần thứ ba trong chặng, sau cổng định dạng và danh sách bên nhận: thứ gì được kiểm ngay tại thời điểm thay đổi thì không trôi được. Rà soát theo đợt luôn thua tốc độ thay đổi của hệ thống.",
      },
    ],
    keyTakeaways: [
      "Trong kiểm tra, câu hỏi là bạn chứng minh được gì, không phải hệ thống tốt cỡ nào",
      "Năng lực phát hiện sự cố quyết định khả năng thông báo đúng hạn",
      "Bốn hồ sơ nên có sẵn: bản đồ dữ liệu, đánh giá tác động, bên nhận, quy trình sự cố",
      "Gắn việc cập nhật vào quy trình phát triển - rà soát theo đợt luôn bị bỏ lại",
    ],
    practicePrompt: {
      question:
        "Hệ thống của bạn xoá dữ liệu quá hạn đúng chính sách, nhưng tác vụ chạy im lặng. Việc cần bổ sung là gì?",
      options: [
        "Ghi lại mỗi lần chạy: bao nhiêu bản ghi, tới mốc thời gian nào",
        "Gửi email báo cáo cho bộ phận pháp chế sau mỗi lần tác vụ chạy xong",
        "Lưu lại bản sao của dữ liệu đã xoá để chứng minh khi cần đối chiếu",
        "Chuyển tác vụ sang chạy thủ công để có người xác nhận từng lần chạy",
      ],
      correct: 0,
      explanation:
        "Phương án ba tự mâu thuẫn: giữ bản sao của dữ liệu đã xoá là chưa xoá. Chạy thủ công thì đánh đổi độ tin cậy lấy chứng cứ, trong khi ba dòng nhật ký cho bạn cả hai - và cũng là tín hiệu để cảnh báo khi tác vụ ngừng chạy.",
    },
    summary: {
      keyIdea: "Tuân thủ không phải làm thêm biện pháp, mà là để lại dấu vết cho những thứ hệ thống vốn đã làm",
      commonMistake: "Chính sách đúng, tác vụ chạy đúng, nhưng không ghi lại nên không chứng minh được",
      action: "Chọn một chính sách dữ liệu của bạn và kiểm xem có bằng chứng nào cho thấy nó đã chạy không.",
    },
    application: {
      title: "Bốn hồ sơ, dựng một lần rồi giữ cho sống",
      message:
        "Bản đồ dữ liệu; hồ sơ đánh giá tác động; danh sách bên nhận ở nước ngoài; quy trình xử lý sự cố kèm người chịu trách nhiệm. Mỗi hồ sơ gắn với một bước trong quy trình phát triển để nó tự cập nhật.",
      secondary:
        "Cùng bộ hồ sơ này là thứ khách hàng doanh nghiệp yêu cầu khi thẩm định nhà cung cấp - làm một lần dùng cho cả hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước dựng từng mảnh. Bài cuối gộp chúng thành thứ dùng được trong một buổi kiểm tra, và trong một đêm có sự cố.",
      },
      { type: "heading", text: "Làm đúng và chứng minh được là hai việc" },
      {
        type: "paragraph",
        text: "Đội kỹ thuật quen nghĩ về việc thứ nhất và bỏ qua việc thứ hai, vì hệ thống chạy đúng là đủ với họ. Nhưng người kiểm tra không đọc mã của bạn - họ đọc tài liệu và nhật ký. Một chính sách đúng không có dấu vết thực thi, trong mắt họ, không phân biệt được với một chính sách chưa từng chạy.",
      },
      {
        type: "conceptTable",
        title: "Ba loại bằng chứng nên có sẵn",
        subtitle: "Cả ba đều sinh ra tự động nếu thiết kế từ đầu",
        concepts: [
          {
            vi: "Nhật ký truy cập",
            en: "Access log",
            def: "Ai đã xem dữ liệu cá nhân nào và lúc nào. Cần nhất khi điều tra nghi vấn lộ dữ liệu từ bên trong.",
          },
          {
            vi: "Nhật ký thực thi chính sách",
            en: "Retention log",
            def: "Tác vụ dọn đã chạy khi nào, xoá bao nhiêu, tới mốc nào. Ba dòng mã, và là bằng chứng duy nhất cho chính sách thời hạn.",
          },
          {
            vi: "Nhật ký đồng ý",
            en: "Consent log",
            def: "Ai đồng ý cái gì, lúc nào, với phiên bản văn bản nào. Đây là lý do Bài 4 yêu cầu lưu cả phiên bản.",
          },
        ],
      },
      {
        type: "callout",
        label: "Phát hiện sớm quyết định mọi thứ còn lại",
        text: "Thời hạn thông báo sự cố tính từ khi phát hiện, nên một đội phát hiện sau ba tháng không phải là đội có ba tháng để chuẩn bị - họ là đội đã để dữ liệu lộ suốt ba tháng mà không biết. Năng lực phát hiện thuộc về giám sát và cảnh báo, tức là phần Chặng 12 đã nói, và nó là điều kiện tiên quyết cho toàn bộ phần tuân thủ này.",
      },
      {
        type: "closing",
        lines: [
          "Hồ sơ tốt không làm hệ thống an toàn hơn, nhưng nó là thứ duy nhất nói thay bạn khi có người hỏi.",
          "Chặng sau: hệ sinh thái công nghệ Việt Nam - thị trường, vốn và cộng đồng quanh những hệ thống này.",
        ],
      },
    ],
  },
];
