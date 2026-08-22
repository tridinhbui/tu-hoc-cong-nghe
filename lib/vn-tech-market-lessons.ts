import type { Lesson } from "./lesson-types";

// Chặng 14 của track cá nhân: thị trường IT Việt Nam trong thực tế.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Các chặng trước đã dạy nghề: ngôn ngữ, hệ thống,
// kiểm thử, triển khai. Không chặng nào nói người học phải làm gì để có được
// công việc đầu tiên ở Việt Nam: hồ sơ trông ra sao thì được gọi, phỏng vấn
// gồm những vòng nào, lương ghi trên tin tuyển dụng là gross hay net, ESOP có
// thật là tiền không. Người học xong phần kỹ thuật viết được phần mềm nhưng
// vẫn không biết đọc một lời mời làm việc.
//
// Ids 330-339 nối tiếp Chặng 13 (320-327), chừa 328-329 làm chỗ chèn.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.
//
// KHÔNG BÀI NÀO Ở ĐÂY KHAI interactiveType. Bản chứng khoán của chặng này gắn
// "fee-drag" vào bài phí giao dịch; widget đó vẽ phí quỹ bào mòn lợi suất qua
// nhiều năm, và bài thay thế nó nói về thuế thu nhập cá nhân một tháng - cùng
// hình dạng "một khoản bị trừ" nhưng khác hẳn trục thời gian. Ép một widget
// tài chính vào bài công nghệ để giữ cho ô không trống là cách nhanh nhất tạo
// ra thứ trông như minh họa mà không minh họa gì. Trường này không bắt buộc.

export const VN_TECH_MARKET_LESSONS: Lesson[] = [
  {
    id: 330,
    slug: "ho-so-nghe-nghiep-github-va-cv",
    title: "Chặng 14, Bài 1: Hồ sơ nghề nghiệp - GitHub và CV",
    subtitle: "Người đọc hồ sơ có bao nhiêu giây, và họ tìm cái gì trong đó",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🪪",
    track: "personal",
    whyItMatters:
      "Đây là rào cản đầu tiên và cũng là chỗ dễ hiểu sai nhất, vì phần lớn người mới viết hồ sơ cho chính mình đọc chứ không cho người tuyển dụng đọc. Vài nguyên tắc đơn giản loại được phần lớn lý do bị loại từ vòng hồ sơ.",
    openingQuestion: "Người sàng hồ sơ ở vòng đầu thường tìm gì trước tiên?",
    openingOptions: [
      "Bằng chứng ứng viên đã làm được thứ gần giống việc mà công ty đang cần tuyển",
      "Số lượng công nghệ được liệt kê, vì càng nhiều thì càng dễ ghép vào dự án",
      "Điểm trung bình đại học và tên trường, vì đó là thước đo khách quan nhất",
      "Số năm kinh nghiệm cộng dồn, vì thời gian phản ánh độ thành thạo tương ứng",
    ],
    correctOption: 0,
    explanation:
      "Người sàng hồ sơ vòng đầu thường không phải kỹ sư, và họ có vài chục hồ sơ cho một vị trí. Thứ họ tìm là sự trùng khớp: mô tả công việc nói cần React và một API có xác thực, hồ sơ nào cho thấy đã làm đúng thứ đó thì được đọc tiếp. Một danh sách hai mươi công nghệ không tạo ra sự trùng khớp nào mà còn làm loãng thứ có thật - nếu bạn giỏi ba thứ và liệt kê hai mươi, người đọc không biết ba thứ nào. Điểm số và số năm là những thứ có mặt trong hồ sơ nhưng hiếm khi là thứ quyết định gọi hay không gọi, vì chúng không trả lời được câu hỏi duy nhất đang được hỏi: người này có làm được việc này không.",
    diagram: [
      { label: "Đọc kỹ mô tả công việc, gạch ra thứ họ thật sự cần", arrow: true },
      { label: "Chọn 2-3 dự án chứng minh đúng thứ đó", arrow: true },
      { label: "Mỗi dự án nói rõ: làm gì, khó ở đâu, giải ra sao", arrow: true },
      { label: "README chạy được trong năm phút, không cần hỏi lại" },
    ],
    realWorldExample: {
      company: "Hai hồ sơ cùng một vị trí",
      description:
        "Một bạn liệt kê mười tám công nghệ và mười hai kho mã, phần lớn là bài tập khóa học chưa có README. Một bạn khác đưa ba kho, mỗi kho một đoạn mô tả ngắn nói rõ vấn đề đã giải và một lệnh để chạy thử. Vị trí đó cần dựng API và làm việc với dữ liệu; bạn thứ hai được gọi, dù tổng số dòng mã ít hơn hẳn. Người đọc không đo khối lượng, họ tìm bằng chứng.",
    },
    quiz: [
      {
        question: "Vì sao liệt kê quá nhiều công nghệ lại phản tác dụng?",
        options: [
          "Nó làm loãng những thứ bạn thật sự thạo, người đọc không biết tin vào đâu",
          "Nhà tuyển dụng có phần mềm tự động loại hồ sơ liệt kê trên mười công nghệ",
          "Mỗi công nghệ ghi thêm sẽ kéo dài vòng phỏng vấn kỹ thuật ra thêm một buổi",
          "Danh sách dài làm hồ sơ vượt quá một trang và bị hệ thống cắt bớt phần cuối",
        ],
        correct: 0,
        explanation:
          "Người đọc mặc định rằng thứ bạn ghi ra là thứ bạn trả lời được câu hỏi về nó. Hai mươi dòng đồng nghĩa với hai mươi lời hứa, và chỉ cần hỏi trúng một dòng bạn không thạo là toàn bộ danh sách mất tin cậy. Ba dòng chắc chắn có sức nặng hơn hai mươi dòng mơ hồ.",
      },
      {
        question: "README của một kho mã trong hồ sơ nên đạt điều gì trước hết?",
        options: [
          "Người lạ chạy được dự án mà không phải hỏi thêm câu nào",
          "Trình bày đầy đủ kiến trúc hệ thống kèm sơ đồ các thành phần và luồng dữ liệu",
          "Liệt kê hết mọi thư viện đã dùng cùng phiên bản chính xác của từng thư viện",
          "Kể lại quá trình học công nghệ đó và những khó khăn đã gặp trong lúc làm",
        ],
        correct: 0,
        explanation:
          "Người đọc hồ sơ không có nhiều thời gian cho mỗi ứng viên. Một kho mã không chạy được trong vài phút thì trên thực tế không được xem, dù mã bên trong tốt tới đâu. Kiến trúc và quá trình học đều có chỗ của nó, nhưng chúng đứng sau câu hỏi đầu tiên là chạy được hay không.",
      },
      {
        question: "Cách mô tả một dự án trong CV nào có sức thuyết phục hơn?",
        options: [
          "Nói rõ vấn đề, cách giải và kết quả đo được",
          "Liệt kê tên các công nghệ đã dùng trong dự án theo thứ tự từ nền tảng tới giao diện",
          "Mô tả đầy đủ mọi tính năng của sản phẩm để người đọc hình dung được toàn bộ phạm vi",
          "Ghi thời lượng thực hiện và số người tham gia để người đọc ước lượng được quy mô",
        ],
        correct: 0,
        explanation:
          "Công nghệ chỉ nói bạn đã ngồi cạnh thứ gì, không nói bạn đã làm được gì với nó. Vấn đề - cách giải - kết quả là hình dạng mà người phỏng vấn sẽ hỏi lại ở vòng sau, nên viết sẵn theo hình dạng đó vừa dễ đọc vừa giúp chính bạn ôn trước. Con số đo được, dù nhỏ, luôn mạnh hơn tính từ.",
      },
      {
        question: "Đóng góp mã nguồn mở giúp hồ sơ ở điểm nào là chính?",
        options: [
          "Nó là bằng chứng công khai rằng bạn làm việc được trong mã của người khác",
          "Nó chứng minh năng lực kỹ thuật cao hơn hẳn so với các dự án cá nhân tự làm",
          "Nó giúp hồ sơ được các công cụ tìm kiếm của nhà tuyển dụng xếp lên vị trí cao hơn",
          "Nó thay thế được phần kinh nghiệm làm việc với những ai chưa từng đi làm chính thức",
        ],
        correct: 0,
        explanation:
          "Phần lớn công việc thật là đọc và sửa mã có sẵn của người khác, không phải viết mới từ đầu. Một pull request được nhận cho thấy bạn đọc được quy ước của dự án lạ, mô tả được thay đổi của mình, và chịu được vòng phản hồi. Đó là thứ dự án cá nhân không chứng minh nổi, vì trong dự án cá nhân bạn là người duy nhất phải hài lòng.",
      },
      {
        question: "Một dự án làm theo hướng dẫn từng bước có nên đưa vào hồ sơ?",
        options: [
          "Có, nếu bạn đã mở rộng nó thêm và nói rõ phần nào là của mình",
          "Không, vì mọi dự án làm theo hướng dẫn đều bị nhà tuyển dụng nhận ra và loại ngay",
          "Có, và nên đưa càng nhiều càng tốt vì số lượng dự án là thứ được đếm trước tiên",
          "Không, trừ khi bạn đã viết lại toàn bộ mã nguồn từ đầu mà không nhìn hướng dẫn nữa",
        ],
        correct: 0,
        explanation:
          "Người phỏng vấn nhận ra các dự án hướng dẫn phổ biến rất nhanh, nhưng vấn đề không nằm ở việc bạn từng làm theo hướng dẫn - ai cũng bắt đầu như vậy. Vấn đề là đưa nó vào như thể toàn bộ là của mình. Nói rõ điểm xuất phát rồi chỉ ra phần bạn thêm vào biến nó từ một điểm trừ thành một câu chuyện về cách bạn học.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn có sáu kho mã trên GitHub, trong đó bốn kho là bài tập khóa học chưa hoàn chỉnh. Nên làm gì trước khi nộp hồ sơ?",
      options: [
        "Ghim hai kho tốt nhất và viết README tử tế cho chúng",
        "Xóa hết bốn kho bài tập đi vì hồ sơ có kho dở sẽ bị đánh giá thấp ngay lập tức",
        "Giữ nguyên tất cả vì số lượng kho mã cho thấy bạn hoạt động đều đặn và chăm chỉ",
        "Bổ sung README ngắn cho cả sáu kho để không kho nào bị trống khi người ta mở ra",
      ],
      correct: 0,
      explanation:
        "GitHub cho phép ghim vài kho lên đầu trang, và phần lớn người xem không cuộn quá đó. Đầu tư vào hai kho được ghim có tác dụng lớn hơn hẳn việc rải công sức đều cho sáu kho. Không cần xóa gì - các kho bài tập nằm phía dưới không gây hại, chúng chỉ không được đọc.",
    },
    keyTakeaways: [
      "Hồ sơ được đọc để tìm sự trùng khớp với mô tả công việc, không phải để đo khối lượng",
      "Ba thứ chắc chắn có sức nặng hơn hai mươi thứ mơ hồ",
      "Một kho mã không chạy được trong vài phút thì trên thực tế không được xem",
      "Vấn đề - cách giải - kết quả là hình dạng mà vòng sau sẽ hỏi lại",
    ],
    summary: {
      keyIdea: "Hồ sơ không phải bản kê khai mọi thứ bạn từng chạm vào, mà là một lập luận ngắn rằng bạn làm được đúng việc đang tuyển.",
    },
    application: {
      message: "Mở mô tả công việc của một vị trí bạn muốn, gạch chân những thứ họ nêu đích danh, rồi đối chiếu với hai kho mã bạn định ghim.",
    },
    sections: [
      {
        type: "lead",
        text: "Một vị trí lập trình viên ở Việt Nam thường nhận vài chục tới vài trăm hồ sơ. Người sàng vòng đầu không đọc mã của bạn; họ tìm lý do để đọc tiếp, và cũng tìm lý do để dừng.",
      },
      {
        type: "heading",
        text: "Hồ sơ trả lời một câu hỏi duy nhất",
      },
      {
        type: "paragraph",
        text: "Câu hỏi đó là: người này có làm được việc này không. Mọi thứ trong hồ sơ hoặc góp phần trả lời nó, hoặc chiếm chỗ. Một danh sách công nghệ dài không trả lời được, vì nó không phân biệt thứ bạn dùng hằng ngày với thứ bạn cài thử một buổi tối. Một dự án được mô tả bằng vấn đề đã giải thì trả lời được, kể cả khi dự án nhỏ.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ người đọc tìm, theo thứ tự",
        concepts: [
          {
            vi: "Sự trùng khớp",
            en: "Relevance",
            def: "Mô tả công việc nêu gì thì hồ sơ nên cho thấy bằng chứng về đúng thứ đó, đặt ở chỗ dễ thấy nhất.",
          },
          {
            vi: "Bằng chứng chạy được",
            en: "Working proof",
            def: "Một liên kết mở ra là thấy, hoặc một lệnh chạy là lên. Thứ phải hỏi thêm mới hiểu thì thường không được hỏi.",
          },
          {
            vi: "Cách bạn kể vấn đề",
            en: "Problem framing",
            def: "Người đọc suy ra cách bạn nghĩ từ cách bạn mô tả. Đây là thứ duy nhất trong hồ sơ dự đoán được vòng phỏng vấn.",
          },
          {
            vi: "Dấu vết làm việc chung",
            en: "Collaboration",
            def: "Pull request, review, issue được trả lời tử tế. Phần lớn công việc thật là mã của người khác.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng phóng đại mức thành thạo",
        text: "Ghi 'thành thạo' một công nghệ nghĩa là bạn nhận trước một loạt câu hỏi ở vòng kỹ thuật. Chênh lệch giữa mức bạn ghi và mức bạn trả lời được là thứ người phỏng vấn nhớ lâu nhất, và nó làm hỏng cả những phần bạn khai đúng - vì sau đó không có dòng nào trong hồ sơ còn được tin nữa.",
      },
      {
        type: "closing",
        lines: [
          "Viết hồ sơ là việc của một buổi tối; chọn đúng thứ để viết vào là việc của ba mươi phút đọc mô tả công việc trước buổi tối đó.",
          "Bài sau: hồ sơ qua được rồi thì phía sau là mấy vòng, và mỗi vòng đo cái gì.",
        ],
      },
    ],
  },
  {
    id: 331,
    slug: "cac-vong-phong-van-ky-thuat",
    title: "Chặng 14, Bài 2: Các vòng phỏng vấn và mỗi vòng đo gì",
    subtitle: "Vì sao có vòng chỉ hỏi thuật toán, và vòng đó không đo thứ bạn tưởng",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎙️",
    track: "personal",
    whyItMatters:
      "Người mới thường ôn tất cả các vòng theo cùng một cách, rồi trượt ở vòng mà lẽ ra chuẩn bị đúng hướng sẽ qua. Mỗi vòng có một câu hỏi riêng đang được trả lời, và biết câu hỏi đó thì cách chuẩn bị thay đổi hẳn.",
    openingQuestion: "Ở vòng thuật toán, người phỏng vấn quan tâm nhất điều gì?",
    openingOptions: [
      "Cách bạn đi từ đề bài mơ hồ tới lời giải, nói ra thành lời",
      "Bạn có đưa ra được lời giải tối ưu nhất về độ phức tạp trong thời gian cho phép hay không",
      "Số lượng bài tập tương tự bạn đã từng luyện qua trước đó trên các nền tảng trực tuyến",
      "Mã bạn viết có biên dịch và chạy đúng ngay lần đầu mà không cần sửa lại dòng nào",
    ],
    correctOption: 0,
    explanation:
      "Vòng thuật toán trông như đang chấm lời giải, nhưng thứ thật sự được quan sát là quá trình. Người phỏng vấn muốn thấy bạn hỏi lại khi đề chưa rõ, nêu một cách làm thô trước rồi mới cải tiến, tự tìm ra trường hợp biên, và nói ra được vì sao bạn chọn cấu trúc dữ liệu này thay vì cái kia. Một người ra lời giải tối ưu trong im lặng khó đánh giá hơn một người giải chậm hơn nhưng suy nghĩ rành mạch, bởi vì công việc thật gần với cái thứ hai hơn nhiều: không ai ném cho bạn một đề bài đã phát biểu sẵn và ngồi chờ trong yên lặng.",
    diagram: [
      { label: "Hỏi lại cho tới khi đề bài hết mơ hồ", arrow: true },
      { label: "Nêu cách làm thô, ước lượng độ phức tạp", arrow: true },
      { label: "Chỉ ra chỗ chậm, đề xuất cải tiến", arrow: true },
      { label: "Viết mã, tự tìm trường hợp biên trước khi bị hỏi" },
    ],
    realWorldExample: {
      company: "Hai ứng viên cùng một bài",
      description:
        "Một bạn nhận ra ngay đây là bài đã luyện, viết một mạch lời giải tối ưu trong bảy phút rồi ngồi im. Một bạn khác mất hai mươi phút, bắt đầu bằng cách duyệt toàn bộ, tự chỉ ra chỗ lặp thừa, rồi rút xuống. Bạn thứ hai được đánh giá cao hơn, vì buổi phỏng vấn đã cho thấy cách bạn ấy làm việc còn buổi kia chỉ cho thấy bạn ấy đã gặp bài này rồi.",
    },
    quiz: [
      {
        question: "Khi đề bài phỏng vấn còn mơ hồ, nên làm gì trước tiên?",
        options: [
          "Hỏi lại để làm rõ đầu vào, ràng buộc và điều được coi là đúng",
          "Chọn cách hiểu hợp lý nhất rồi ghi chú giả định vào mã và tiếp tục giải luôn",
          "Giải cho trường hợp tổng quát nhất để chắc chắn phủ được mọi cách hiểu có thể",
          "Đề nghị người phỏng vấn cho một ví dụ đầu vào rồi suy ngược ra yêu cầu từ ví dụ đó",
        ],
        correct: 0,
        explanation:
          "Đề bài mơ hồ thường là cố ý. Trong công việc thật, yêu cầu đến dưới dạng chưa đủ và người làm được việc là người biết hỏi. Bỏ qua bước hỏi để lao vào giải là tín hiệu xấu ngay cả khi lời giải đúng, vì nó cho thấy bạn sẽ làm y như vậy với một yêu cầu thật.",
      },
      {
        question: "Vòng thiết kế hệ thống chủ yếu đo năng lực nào?",
        options: [
          "Khả năng đánh đổi giữa các phương án và nói rõ lý do chọn",
          "Mức độ thuộc lòng kiến trúc của các hệ thống lớn đang phổ biến trong ngành hiện nay",
          "Số lượng thành phần bạn vẽ được lên bảng trong khoảng thời gian được cho phép",
          "Khả năng nhớ chính xác giới hạn kỹ thuật và thông số của từng công nghệ được nhắc tới",
        ],
        correct: 0,
        explanation:
          "Không có thiết kế đúng cho một bài mở. Có những đánh đổi, và người phỏng vấn nghe xem bạn có nhận ra mình đang đánh đổi cái gì lấy cái gì hay không. Một thiết kế đơn giản kèm lý do vững thường được chấm cao hơn một sơ đồ nhiều thành phần mà không giải thích được vì sao cần từng thành phần.",
      },
      {
        question: "Vòng phỏng vấn hành vi phục vụ mục đích gì?",
        options: [
          "Dự đoán cách bạn xử sự khi có bất đồng hoặc khi mọi thứ hỏng",
          "Kiểm tra xem tính cách của bạn có phù hợp với văn hóa chung của toàn công ty hay không",
          "Xác nhận lại những thông tin đã ghi trong hồ sơ và bổ sung các chi tiết còn thiếu sót",
          "Đánh giá khả năng diễn đạt bằng lời nói vì đây là kỹ năng cần cho các cuộc họp sau này",
        ],
        correct: 0,
        explanation:
          "Câu hỏi hành vi luôn hỏi về quá khứ - kể một lần bạn bất đồng với đồng nghiệp, một lần bạn làm hỏng thứ gì đó - vì hành vi đã xảy ra dự đoán hành vi sắp tới tốt hơn lời hứa. Chuẩn bị vòng này nghĩa là chuẩn bị vài tình huống thật kèm kết cục thật, kể cả kết cục không đẹp.",
      },
      {
        question: "Bị bí giữa một bài phỏng vấn thì cách xử lý nào tốt hơn?",
        options: [
          "Nói ra chỗ mình đang mắc và hướng đang cân nhắc",
          "Giữ im lặng để tập trung suy nghĩ cho tới khi tìm ra hướng đi rồi mới trình bày lại",
          "Chuyển sang một cách tiếp cận khác hẳn để tránh mất thêm thời gian ở chỗ đang bí",
          "Thừa nhận là không giải được và đề nghị chuyển sang câu hỏi tiếp theo cho đỡ mất giờ",
        ],
        correct: 0,
        explanation:
          "Người phỏng vấn không đọc được suy nghĩ, nên im lặng năm phút với họ trông giống hệt như không nghĩ ra gì. Nói ra chỗ mắc thường mở đường cho một gợi ý, và cách bạn nhận gợi ý rồi đi tiếp cũng là một phần đang được đánh giá - vì đó chính là hình dạng của một buổi làm việc chung.",
      },
      {
        question: "Vì sao nên chuẩn bị câu hỏi để hỏi lại người phỏng vấn?",
        options: [
          "Vì bạn cũng đang chọn nơi làm, và có thứ chỉ hỏi mới biết",
          "Vì phần lớn công ty có tính điểm cho việc ứng viên đặt câu hỏi ở cuối mỗi buổi phỏng vấn",
          "Vì nó kéo dài buổi phỏng vấn và tạo ấn tượng rằng bạn quan tâm nghiêm túc tới vị trí này",
          "Vì câu trả lời sẽ cho bạn thông tin để trả lời tốt hơn ở các vòng phỏng vấn tiếp theo sau",
        ],
        correct: 0,
        explanation:
          "Quy trình phỏng vấn có hai chiều, và chiều thứ hai dễ bị quên khi người ta đang lo được nhận hay không. Quy trình review ra sao, ai quyết định thứ tự ưu tiên, người mới mất bao lâu để đưa được thay đổi đầu tiên lên - đây là những thứ quyết định một năm sắp tới của bạn, và sau khi ký thì hỏi đã muộn.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn được hẹn ba vòng: thuật toán, thiết kế hệ thống, và hành vi. Chỉ còn một tuần. Phân bổ thế nào là hợp lý nhất?",
      options: [
        "Chia theo vòng bạn yếu nhất, và viết sẵn tình huống thật cho vòng hành vi",
        "Dồn toàn bộ cho vòng thuật toán vì đây là vòng có tiêu chí rõ ràng và dễ luyện tập nhất",
        "Chia đều thời gian cho cả ba vòng để không vòng nào bị bỏ sót trong lúc chuẩn bị gấp",
        "Ưu tiên vòng thiết kế hệ thống vì đây là vòng khó nhất và cần nhiều thời gian nhất",
      ],
      correct: 0,
      explanation:
        "Chia đều nghe công bằng nhưng bỏ qua việc ba vòng không ở cùng mức với bạn. Vòng hành vi đặc biệt đáng chú ý vì nhiều người bỏ hẳn không chuẩn bị, trong khi nó chỉ cần một buổi tối viết ra vài tình huống thật - đây là chỗ tỷ lệ đổi công sức lấy kết quả cao nhất trong ba vòng.",
    },
    keyTakeaways: [
      "Vòng thuật toán quan sát quá trình, không chỉ chấm lời giải cuối",
      "Vòng thiết kế nghe bạn đánh đổi cái gì lấy cái gì, không đếm số thành phần",
      "Vòng hành vi hỏi quá khứ vì hành vi đã xảy ra dự đoán tốt hơn lời hứa",
      "Im lặng khi bí trông giống hệt như không nghĩ ra gì",
    ],
    summary: {
      keyIdea: "Ba vòng phỏng vấn hỏi ba câu khác nhau; ôn cả ba theo một cách là cách chắc chắn để chuẩn bị sai ít nhất hai vòng.",
    },
    application: {
      message: "Viết ra ba tình huống thật đã xảy ra với bạn - một lần bất đồng, một lần làm hỏng, một lần phải học gấp - mỗi cái ba câu.",
    },
    sections: [
      {
        type: "lead",
        text: "Quy trình tuyển kỹ sư ở Việt Nam thường có hai tới bốn vòng. Chúng trông giống nhau ở chỗ đều là một buổi nói chuyện, nhưng mỗi vòng đang trả lời một câu hỏi khác nhau về bạn.",
      },
      {
        type: "heading",
        text: "Mỗi vòng có một câu hỏi riêng",
      },
      {
        type: "paragraph",
        text: "Vòng thuật toán hỏi: người này nghĩ thế nào khi gặp thứ chưa biết. Vòng thiết kế hỏi: người này có nhìn ra đánh đổi không. Vòng hành vi hỏi: làm việc cùng người này thì thế nào khi có chuyện. Biết câu hỏi thì biết cần luyện gì - và cũng biết thứ gì luyện thêm cũng không giúp được.",
      },
      {
        type: "conceptTable",
        title: "Ba vòng, ba cách chuẩn bị",
        concepts: [
          {
            vi: "Thuật toán",
            en: "Coding",
            def: "Luyện nói trong lúc giải, không chỉ giải. Thu âm lại một lần là thấy ngay mình im lặng bao lâu.",
          },
          {
            vi: "Thiết kế hệ thống",
            en: "System design",
            def: "Tập nêu hai phương án rồi chọn một kèm lý do. Một sơ đồ đơn giản có lý do vững hơn một sơ đồ rậm.",
          },
          {
            vi: "Hành vi",
            en: "Behavioral",
            def: "Viết sẵn tình huống thật kèm kết cục thật. Kết cục không đẹp mà rút được bài học thường mạnh hơn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đề mơ hồ là cố ý",
        text: "Rất nhiều đề phỏng vấn thiếu ràng buộc quan trọng, và đó không phải sơ suất của người ra đề. Yêu cầu trong công việc thật cũng đến ở dạng thiếu như vậy. Ứng viên lao thẳng vào giải đã tự trả lời câu hỏi mà buổi phỏng vấn định hỏi, chỉ là trả lời sai.",
      },
      {
        type: "closing",
        lines: [
          "Chuẩn bị phỏng vấn không phải luyện nhiều hơn, mà là luyện đúng thứ mỗi vòng đang đo.",
          "Bài sau: qua hết các vòng rồi thì còn bao lâu nữa tới ngày đi làm, và trong khoảng đó có gì.",
        ],
      },
    ],
  },
  {
    id: 332,
    slug: "tu-nop-ho-so-toi-ngay-di-lam",
    title: "Chặng 14, Bài 3: Từ nộp hồ sơ tới ngày đi làm mất bao lâu",
    subtitle: "Vì sao lời mời làm việc có hạn trả lời, và bàn giao ở công ty cũ là bao nhiêu ngày",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    whyItMatters:
      "Người chuyển việc lần đầu hay tính nhầm mốc thời gian, rồi rơi vào cảnh nghỉ việc cũ trước khi có hợp đồng mới trong tay, hoặc phải trả lời một lời mời trong hai ngày mà chưa kịp so với nơi khác. Biết trước các mốc thì thương lượng được cả ba mốc.",
    openingQuestion: "Thời điểm nào là an toàn để nộp đơn xin nghỉ ở công ty cũ?",
    openingOptions: [
      "Sau khi đã ký hợp đồng lao động hoặc thư mời chính thức với nơi mới",
      "Ngay khi nhận được thông báo miệng rằng bạn đã qua hết các vòng và được chọn",
      "Trước khi phỏng vấn vòng cuối để chủ động về thời gian và tránh trùng lịch bàn giao",
      "Sau khi thỏa thuận xong mức lương với nơi mới dù hợp đồng còn đang được soạn thảo",
    ],
    correctOption: 0,
    explanation:
      "Một lời mời miệng và một thỏa thuận lương chưa phải là ràng buộc, và các đợt dừng tuyển vẫn xảy ra sau khi đã báo tin cho ứng viên - có khi vì ngân sách bị cắt ở tầng trên, không liên quan gì tới bạn. Khoảng cách giữa lúc nghe tin vui và lúc có chữ ký là khoảng thời gian bạn không có gì trong tay cả. Nộp đơn nghỉ trong khoảng đó là tự bỏ vị trí cũ để đổi lấy một thứ chưa tồn tại. Quy tắc đơn giản và không có ngoại lệ đáng để phá: giấy tờ nơi mới xong rồi mới báo nơi cũ.",
    diagram: [
      { label: "Nộp hồ sơ, chờ phản hồi: 1-3 tuần", arrow: true },
      { label: "Các vòng phỏng vấn: 1-4 tuần", arrow: true },
      { label: "Lời mời và thương lượng: vài ngày tới 1 tuần", arrow: true },
      { label: "Bàn giao ở nơi cũ rồi mới tới ngày đi làm" },
    ],
    realWorldExample: {
      company: "Hai người cùng nhận lời mời trong một tuần",
      description:
        "Một bạn nghe điện thoại báo trúng tuyển vào sáng thứ Hai và nộp đơn nghỉ ngay chiều hôm đó. Hợp đồng bên mới bị hoãn hai tuần vì đợt duyệt ngân sách, và bạn ấy có một khoảng trống không lương không dự tính. Một bạn khác nhận tin tương tự, cảm ơn, và chỉ báo nơi cũ sau khi thư mời có chữ ký nằm trong hộp thư. Cùng một tin vui, khác nhau ở thứ tự.",
    },
    quiz: [
      {
        question: "Hạn trả lời ngắn trong một lời mời làm việc thường nhằm mục đích gì?",
        options: [
          "Giảm khả năng bạn so sánh với lời mời khác đang chờ",
          "Giúp bộ phận nhân sự sắp xếp lịch tiếp nhận người mới cho kịp với kế hoạch của quý",
          "Đảm bảo ứng viên đủ nghiêm túc với vị trí này chứ không dùng nó làm quân bài dự phòng",
          "Tuân thủ quy định về thời hạn hiệu lực của thư mời làm việc theo luật lao động hiện hành",
        ],
        correct: 0,
        explanation:
          "Áp lực thời gian là công cụ thương lượng, không phải một ràng buộc hành chính. Xin thêm vài ngày là chuyện bình thường và hiếm khi bị từ chối - nếu bị từ chối dứt khoát, bản thân điều đó đã là thông tin về nơi bạn sắp vào làm.",
      },
      {
        question: "Thời gian báo trước khi nghỉ việc phụ thuộc chủ yếu vào đâu?",
        options: [
          "Loại hợp đồng lao động bạn đang ký và điều khoản trong đó",
          "Thỏa thuận riêng giữa bạn với quản lý trực tiếp về khối lượng công việc cần bàn giao lại",
          "Số năm bạn đã làm ở công ty đó, càng lâu thì thời gian báo trước càng phải kéo dài thêm",
          "Chính sách nội bộ của phòng nhân sự, mỗi công ty tự quy định một mức khác nhau",
        ],
        correct: 0,
        explanation:
          "Thời gian báo trước là điều khoản trong hợp đồng và có mức tối thiểu theo luật, khác nhau giữa hợp đồng xác định thời hạn và không xác định thời hạn. Quản lý có thể đồng ý rút ngắn, nhưng đó là nhân nhượng chứ không phải quyền mặc định của bạn - nên đọc hợp đồng trước khi hứa ngày đi làm với nơi mới.",
      },
      {
        question: "Lời mời làm việc bằng miệng có giá trị thế nào?",
        options: [
          "Là ý định của nơi tuyển, chưa ràng buộc cho tới khi có văn bản",
          "Có giá trị pháp lý tương đương văn bản nếu có người thứ ba chứng kiến cuộc trao đổi đó",
          "Ràng buộc bên tuyển nhưng không ràng buộc ứng viên cho tới khi ứng viên xác nhận lại",
          "Không có giá trị gì và chỉ nên coi là một lời động viên sau khi kết thúc phỏng vấn",
        ],
        correct: 0,
        explanation:
          "Nó là tín hiệu thật và đáng mừng, nhưng nó nằm ở giữa hai trạng thái. Sự thận trọng cần có không nằm ở chỗ nghi ngờ thiện chí của họ, mà ở chỗ hiểu rằng giữa ý định và chữ ký còn vài khâu duyệt nội bộ mà bạn không nhìn thấy và không tác động được.",
      },
      {
        question: "Nếu nơi mới muốn bạn đi làm sớm hơn thời gian bàn giao cho phép?",
        options: [
          "Nói rõ ràng buộc hiện có và đề xuất một ngày khả thi",
          "Nhận lời rồi thương lượng với nơi cũ sau, vì phần lớn công ty đều linh động về việc này",
          "Từ chối lời mời vì lệch ngày đi làm là dấu hiệu nơi mới không tôn trọng quy trình chuẩn",
          "Nghỉ phép hết số ngày còn lại ở nơi cũ để rút ngắn thời gian bàn giao xuống mức cần thiết",
        ],
        correct: 0,
        explanation:
          "Ngày đi làm gần như luôn thương lượng được, và một ứng viên nói rõ ràng buộc của mình thì đáng tin hơn một ứng viên hứa bừa rồi xin lùi. Cách bạn rời nơi cũ cũng là thứ ngành này nhớ lâu, vì thị trường IT ở Việt Nam nhỏ hơn nhiều so với cảm giác lúc đang tìm việc.",
      },
      {
        question: "Không nhận được phản hồi sau khi nộp hồ sơ hai tuần thì nên hiểu thế nào?",
        options: [
          "Là chuyện thường gặp; gửi một thư hỏi ngắn rồi tiếp tục nộp nơi khác",
          "Là hồ sơ đã bị loại, vì các công ty đều phản hồi trong vòng một tuần nếu thấy phù hợp",
          "Là hồ sơ đang được chuyển qua nhiều cấp duyệt và sắp có lịch phỏng vấn được gửi tới",
          "Là nên gọi trực tiếp cho bộ phận nhân sự để hỏi kết quả vì thư điện tử dễ bị bỏ sót",
        ],
        correct: 0,
        explanation:
          "Nhiều nơi không hồi âm hồ sơ bị loại, và nhiều nơi khác chỉ đơn giản là chậm. Suy diễn từ sự im lặng gần như luôn sai theo cả hai hướng. Thứ nằm trong tầm kiểm soát của bạn là số lượng hồ sơ đang chạy song song, nên đừng dừng lại chờ một nơi.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn nhận lời mời từ công ty A với hạn trả lời ba ngày, trong khi công ty B hẹn phỏng vấn vòng cuối sau một tuần. Nên làm gì?",
      options: [
        "Xin A lùi hạn, đồng thời báo B rằng bạn đang có lời mời và hỏi họ đẩy lịch được không",
        "Nhận lời A ngay cho chắc rồi vẫn đi phỏng vấn B, nếu B tốt hơn thì rút lời với A sau",
        "Từ chối A vì ba ngày là quá gấp và một nơi ép thời gian như vậy thường không đáng vào",
        "Bỏ vòng cuối của B vì trong tay đã có một lời mời chắc chắn còn B thì vẫn chưa có gì",
      ],
      correct: 0,
      explanation:
        "Cả hai bên đều xê dịch được và cả hai đều đã gặp tình huống này nhiều lần. Nói thật với B rằng bạn đang có lời mời thường khiến họ đẩy nhanh chứ không phật ý. Nhận lời rồi rút là lựa chọn tệ nhất trong bốn: nó đốt một mối quan hệ trong một thị trường mà người ta gặp lại nhau.",
    },
    keyTakeaways: [
      "Giấy tờ nơi mới xong rồi mới báo nơi cũ - không có ngoại lệ đáng để phá",
      "Hạn trả lời ngắn là công cụ thương lượng, xin lùi là chuyện bình thường",
      "Thời gian báo trước nằm trong hợp đồng, không nằm ở thiện chí của quản lý",
      "Im lặng sau khi nộp hồ sơ không mang thông tin; đừng dừng lại chờ một nơi",
    ],
    summary: {
      keyIdea: "Chuyển việc là một chuỗi mốc thời gian chồng lên nhau, và phần lớn rủi ro nằm ở chỗ hai mốc bị đảo thứ tự.",
    },
    application: {
      message: "Mở hợp đồng lao động hiện tại, tìm điều khoản thời gian báo trước, và ghi con số đó ra trước khi bắt đầu nộp hồ sơ.",
    },
    sections: [
      {
        type: "lead",
        text: "Từ lúc bấm nộp hồ sơ tới ngày ngồi vào chỗ mới thường là bốn tới mười tuần. Khoảng đó không phải một quãng chờ liền mạch mà là bốn khúc, mỗi khúc có rủi ro riêng.",
      },
      {
        type: "heading",
        text: "Khúc nguy hiểm nhất nằm ở giữa",
      },
      {
        type: "paragraph",
        text: "Đó là khoảng từ lúc nghe tin trúng tuyển tới lúc có chữ ký. Bạn cảm thấy mọi thứ đã xong, nên đây cũng là lúc người ta hay báo nghỉ ở nơi cũ, kể chuyện với đồng nghiệp, và ngừng nộp hồ sơ nơi khác. Cả ba việc đều là bỏ đi thứ mình đang có để đổi lấy thứ chưa cầm được.",
      },
      {
        type: "conceptTable",
        title: "Bốn mốc và thứ đáng làm ở mỗi mốc",
        concepts: [
          {
            vi: "Nộp và chờ",
            en: "Application",
            def: "Giữ nhiều hồ sơ chạy song song. Đây là mốc duy nhất mà số lượng thật sự giúp được.",
          },
          {
            vi: "Các vòng",
            en: "Interviews",
            def: "Ghi lại ngay sau mỗi buổi những gì được hỏi. Vòng sau và công ty sau đều dùng lại được.",
          },
          {
            vi: "Lời mời",
            en: "Offer",
            def: "Đọc kỹ, hỏi thẳng phần chưa rõ, xin thêm ngày nếu cần. Sau khi ký thì hỏi đã muộn.",
          },
          {
            vi: "Bàn giao",
            en: "Notice",
            def: "Theo đúng điều khoản hợp đồng. Rời tử tế là khoản đầu tư rẻ nhất vào lần chuyển việc sau.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng nghỉ việc cũ trước khi có chữ ký",
        text: "Nghe hiển nhiên tới mức không cần nói, nhưng đây là sai lầm phổ biến nhất trong cả chặng, và nó luôn xảy ra vào đúng lúc người ta thấy vui nhất chứ không phải lúc thiếu cẩn thận. Một cuộc điện thoại báo tin tốt không phải là hợp đồng, và khoảng cách giữa hai thứ đó có thể là hai tuần không lương.",
      },
      {
        type: "closing",
        lines: [
          "Thứ tự các mốc quan trọng hơn tốc độ đi qua chúng.",
          "Bài sau: con số ghi trên lời mời là gross hay net, và giữa hai con số đó có những gì.",
        ],
      },
    ],
  },
  {
    id: 333,
    slug: "luong-gross-net-thue-va-bao-hiem",
    title: "Chặng 14, Bài 4: Gross, net, thuế và bảo hiểm",
    subtitle: "Con số trên lời mời và con số về tài khoản khác nhau ở những khoản nào",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Hai lời mời ghi cùng một con số có thể chênh nhau vài triệu mỗi tháng chỉ vì một bên nói gross còn bên kia nói net. Không quy về cùng một gốc thì mọi so sánh lương đều vô nghĩa, và đây là phép tính người ta hay bỏ qua đúng lúc cần nó nhất.",
    openingQuestion: "Lương gross khác lương net ở chỗ nào?",
    openingOptions: [
      "Gross là trước khi trừ bảo hiểm bắt buộc và thuế thu nhập cá nhân",
      "Gross là tổng thu nhập cả năm còn net là phần được chia đều ra theo từng tháng làm việc",
      "Gross đã gồm thưởng và phụ cấp còn net chỉ tính riêng phần lương cứng theo hợp đồng",
      "Gross là mức công ty đề xuất ban đầu còn net là mức cuối cùng sau khi hai bên thương lượng",
    ],
    correctOption: 0,
    explanation:
      "Gross là con số trong hợp đồng, trước khi trừ đi phần bảo hiểm xã hội, bảo hiểm y tế và bảo hiểm thất nghiệp mà người lao động đóng, rồi trừ tiếp thuế thu nhập cá nhân. Net là phần còn lại thực sự vào tài khoản. Khoảng cách giữa hai con số này không cố định theo tỷ lệ: nó phụ thuộc mức lương, số người phụ thuộc bạn đăng ký, và mức trần đóng bảo hiểm. Vì vậy không có hệ số nào đổi gross sang net cho mọi trường hợp - phải tính theo từng mức. Khi nghe một mức lương, câu hỏi đầu tiên luôn là con số đó thuộc loại nào.",
    diagram: [
      { label: "Lương gross ghi trong hợp đồng", arrow: true },
      { label: "Trừ bảo hiểm bắt buộc phần người lao động đóng", arrow: true },
      { label: "Trừ giảm trừ gia cảnh, còn lại là thu nhập tính thuế", arrow: true },
      { label: "Trừ thuế lũy tiến từng bậc, phần còn lại là net" },
    ],
    realWorldExample: {
      company: "Hai lời mời cùng ghi 30 triệu",
      description:
        "Một nơi ghi 30 triệu gross, một nơi ghi 30 triệu net. Nhìn qua thì như nhau và người nhận suýt chọn theo yếu tố khác. Quy về cùng gốc thì nơi thứ hai cao hơn khoảng bốn tới năm triệu mỗi tháng, tức gần một tháng lương mỗi năm - lớn hơn mọi khác biệt về phúc lợi mà hai bên đang đem ra so.",
    },
    quiz: [
      {
        question: "Vì sao không có một hệ số cố định để đổi gross sang net?",
        options: [
          "Vì thuế tính lũy tiến từng bậc và giảm trừ khác nhau theo từng người",
          "Vì mỗi công ty áp dụng một cách tính bảo hiểm riêng tùy theo chính sách nội bộ của họ",
          "Vì tỷ lệ đóng bảo hiểm được điều chỉnh hằng năm nên hệ số của năm trước không còn đúng",
          "Vì phần thưởng và phụ cấp được cộng vào gross theo những cách khác nhau ở mỗi nơi",
        ],
        correct: 0,
        explanation:
          "Thuế lũy tiến nghĩa là phần thu nhập cao hơn chịu thuế suất cao hơn, nên tỷ lệ thuế trên tổng thu nhập tăng dần khi lương tăng. Cộng thêm giảm trừ gia cảnh khác nhau theo số người phụ thuộc, hai người cùng mức gross vẫn ra hai mức net khác nhau.",
      },
      {
        question: "Đăng ký thêm một người phụ thuộc có tác dụng gì?",
        options: [
          "Giảm phần thu nhập chịu thuế, nên net tăng lên",
          "Giảm trực tiếp số thuế phải nộp đúng bằng mức giảm trừ được quy định cho mỗi người",
          "Giảm mức đóng bảo hiểm xã hội bắt buộc tương ứng với số người phụ thuộc đã đăng ký",
          "Không đổi net trong năm hiện tại mà chỉ được hoàn lại vào kỳ quyết toán thuế cuối năm",
        ],
        correct: 0,
        explanation:
          "Giảm trừ gia cảnh trừ vào thu nhập trước khi tính thuế, không trừ thẳng vào số thuế. Vì thuế lũy tiến, cùng một mức giảm trừ tiết kiệm được nhiều tiền hơn với người có lương cao hơn - phần thu nhập được cắt bỏ nằm ở bậc thuế cao nhất của người đó.",
      },
      {
        question: "Đóng bảo hiểm xã hội trên mức lương thấp hơn thực nhận thì hệ quả là gì?",
        options: [
          "Net cao hơn ngay, đổi lại quyền lợi sau này tính trên mức đã đóng",
          "Không ảnh hưởng tới quyền lợi vì các chế độ bảo hiểm đều tính theo mức lương thực nhận",
          "Người lao động phải bù phần chênh lệch khi làm thủ tục hưởng chế độ ở thời điểm sau này",
          "Chỉ ảnh hưởng tới trợ cấp thất nghiệp còn lương hưu vẫn được tính trên thu nhập thật",
        ],
        correct: 0,
        explanation:
          "Nhiều nơi tách lương thành phần cứng đóng bảo hiểm và phần phụ cấp không đóng, khiến net trước mắt cao hơn. Cái giá nằm ở chỗ mọi chế độ - thai sản, thất nghiệp, hưu trí - đều tính trên mức đã đóng chứ không phải mức bạn nhận. Đây là một đánh đổi có thật, không phải một mẹo.",
      },
      {
        question: "Lương tháng thứ 13 thường được xử lý thế nào về thuế?",
        options: [
          "Cộng vào thu nhập chịu thuế của kỳ nhận nên có thể đẩy lên bậc cao hơn",
          "Được miễn thuế thu nhập cá nhân vì đây là khoản thưởng chứ không phải tiền lương",
          "Chịu một mức thuế suất cố định riêng, tách khỏi cách tính lũy tiến của lương hằng tháng",
          "Được chia đều cho mười hai tháng khi tính thuế nên không làm thay đổi bậc thuế của bạn",
        ],
        correct: 0,
        explanation:
          "Đây là lý do net của tháng nhận thưởng thường thấp hơn tỷ lệ mọi người trông đợi: một khoản lớn dồn vào một kỳ có thể rơi vào bậc thuế cao hơn. Quyết toán cuối năm điều chỉnh lại theo tổng cả năm, nên phần chênh không mất đi, nhưng dòng tiền trong tháng đó thì đúng là ít hơn.",
      },
      {
        question: "Khi so hai lời mời, bước đầu tiên nên là gì?",
        options: [
          "Quy cả hai về cùng một gốc, gross hoặc net, rồi mới so",
          "Cộng hết mọi khoản thưởng và phúc lợi được nêu vào để có bức tranh đầy đủ nhất về thu nhập",
          "So phần lương cứng trước vì đây là khoản chắc chắn còn thưởng thì phụ thuộc kết quả kinh doanh",
          "Hỏi mức lương trung bình của vị trí đó trên thị trường rồi xem nơi nào gần mức đó hơn",
        ],
        correct: 0,
        explanation:
          "Mọi bước so sánh khác đều vô nghĩa nếu hai con số không cùng gốc. Đây cũng là chỗ dễ bị dẫn dắt nhất, vì bên đưa ra con số gross lớn hơn không có lý do gì để nhắc bạn rằng nó là gross. Quy về cùng gốc mất mười phút và thường đảo ngược thứ hạng.",
      },
    ],
    practicePrompt: {
      question:
        "Nơi A đề nghị 25 triệu net. Nơi B đề nghị 30 triệu gross kèm tháng thứ 13. Bạn nên làm gì để so?",
      options: [
        "Tính net của B rồi cộng thêm phần tháng thứ 13 chia đều cho mười hai tháng",
        "Chọn B vì 30 triệu lớn hơn 25 triệu và còn có thêm một tháng lương thưởng vào cuối năm",
        "Chọn A vì net là con số chắc chắn còn gross thì còn phụ thuộc vào nhiều khoản khấu trừ",
        "So mức đóng bảo hiểm của hai nơi trước vì đó là khoản chênh lệch lớn nhất giữa gross và net",
      ],
      correct: 0,
      explanation:
        "Đây là phép tính duy nhất trả lời được câu hỏi, và nó cho kết quả gần nhau hơn nhiều so với cảm giác ban đầu. Sau khi quy về cùng gốc, chênh lệch còn lại thường nhỏ tới mức các yếu tố khác - việc bạn sẽ làm, người bạn sẽ làm cùng - trở thành thứ đáng cân nhắc hơn.",
    },
    keyTakeaways: [
      "Nghe một mức lương thì câu hỏi đầu tiên luôn là gross hay net",
      "Không có hệ số cố định đổi gross sang net vì thuế lũy tiến và giảm trừ khác nhau",
      "Đóng bảo hiểm trên mức thấp làm net tăng ngay và giảm mọi chế độ sau này",
      "Thưởng dồn vào một kỳ có thể rơi vào bậc thuế cao hơn",
    ],
    summary: {
      keyIdea: "Con số trên lời mời và con số về tài khoản là hai đại lượng khác nhau; so sánh mà không quy về cùng gốc thì luôn có một bên được lợi, và đó không phải bạn.",
    },
    application: {
      message: "Lấy mức lương hiện tại của bạn, tra bậc thuế và mức giảm trừ, rồi tự tính lại net một lần để biết khoảng cách thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Tin tuyển dụng ở Việt Nam ghi lương theo cả hai kiểu và thường không nói rõ là kiểu nào. Với cùng một mức, khoảng cách giữa gross và net đủ lớn để đảo ngược thứ tự hai lời mời.",
      },
      {
        type: "heading",
        text: "Từ gross xuống net đi qua hai lớp",
      },
      {
        type: "paragraph",
        text: "Lớp thứ nhất là bảo hiểm bắt buộc, tính theo tỷ lệ trên lương đóng bảo hiểm và có mức trần. Lớp thứ hai là thuế thu nhập cá nhân, tính lũy tiến trên phần còn lại sau khi trừ giảm trừ gia cảnh. Vì lớp thứ hai lũy tiến, tỷ lệ hao hụt không cố định mà tăng dần theo mức lương.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ cần hỏi rõ trước khi ký",
        concepts: [
          {
            vi: "Gross hay net",
            en: "Gross or net",
            def: "Câu hỏi rẻ nhất trong toàn bộ quá trình thương lượng, và là câu người ta hay quên hỏi nhất.",
          },
          {
            vi: "Lương đóng bảo hiểm",
            en: "Insurance base",
            def: "Có bằng lương hợp đồng không, hay tách thành lương cứng cộng phụ cấp. Ảnh hưởng mọi chế độ sau này.",
          },
          {
            vi: "Tháng thứ 13 và thưởng",
            en: "Bonus",
            def: "Là cam kết hay tùy kết quả. Hai thứ này khác nhau hoàn toàn khi đưa vào phép so sánh.",
          },
          {
            vi: "Kỳ xét tăng lương",
            en: "Review cycle",
            def: "Sáu tháng hay một năm, và lần xét đầu tiên tính từ lúc nào. Mốc này quyết định năm đầu.",
          },
        ],
      },
      {
        type: "callout",
        label: "Net cao hơn không phải lúc nào cũng tốt hơn",
        text: "Một nơi có thể đưa net cao hơn bằng cách hạ lương đóng bảo hiểm xuống mức tối thiểu và đẩy phần còn lại sang phụ cấp. Tiền vào tài khoản nhiều hơn ngay tháng này, đổi lại trợ cấp thai sản, thất nghiệp và lương hưu đều tính trên con số nhỏ hơn. Đây là một lựa chọn hợp lệ, nhưng phải biết là mình đang chọn.",
      },
      {
        type: "closing",
        lines: [
          "Không quy về cùng gốc thì mọi so sánh lương đều là so hai thứ khác nhau.",
          "Bài sau: các báo cáo lương ngành IT nói gì, và con số trung bình trong đó có dùng được không.",
        ],
      },
    ],
  },
  {
    id: 334,
    slug: "doc-bao-cao-luong-nganh-it",
    title: "Chặng 14, Bài 5: Đọc báo cáo lương ngành IT",
    subtitle: "Một con số trung bình nói được gì, và nó giấu đi cái gì",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "Báo cáo lương là thứ duy nhất người mới có để biết mình đang được trả cao hay thấp, nhưng đọc sai nó còn tệ hơn không đọc: nó tạo ra một mức kỳ vọng có vẻ khách quan mà thực ra đến từ một mẫu không giống bạn.",
    openingQuestion: "Vì sao trung vị thường phản ánh mức lương phổ biến tốt hơn trung bình?",
    openingOptions: [
      "Vì một nhóm nhỏ lương rất cao kéo trung bình lên nhưng không kéo trung vị",
      "Vì trung vị được tính trên toàn bộ mẫu còn trung bình chỉ tính trên phần mẫu đã xác minh được",
      "Vì trung vị loại bỏ những giá trị bất thường ở cả hai đầu trước khi thực hiện phép tính",
      "Vì trung vị được cập nhật thường xuyên hơn nên phản ánh sát thị trường ở thời điểm hiện tại",
    ],
    correctOption: 0,
    explanation:
      "Phân bố lương trong ngành IT lệch phải: phần lớn người tập trung ở một khoảng, và một nhóm nhỏ - làm cho công ty nước ngoài, vị trí quản lý, hoặc lĩnh vực đang khan người - nằm cao hơn hẳn. Trung bình cộng bị nhóm nhỏ đó kéo lên, nên nó cao hơn mức mà đa số thực sự nhận. Trung vị là con số ở giữa khi xếp tất cả theo thứ tự, nên nó không bị vài giá trị lớn làm lệch. Khi một báo cáo chỉ đưa trung bình mà không đưa trung vị hay các phân vị, con số đó gần như chắc chắn cao hơn mức bạn nên lấy làm mốc.",
    diagram: [
      { label: "Xem mẫu: ai trả lời, bao nhiêu người, ở đâu", arrow: true },
      { label: "Tìm trung vị và phân vị, không dừng ở trung bình", arrow: true },
      { label: "Lọc theo đúng vị trí, cấp bậc và thành phố của bạn", arrow: true },
      { label: "Đối chiếu với vài tin tuyển dụng thật đang mở" },
    ],
    realWorldExample: {
      company: "Một báo cáo và một thực tế",
      description:
        "Một bạn đọc thấy mức trung bình cho vị trí của mình rồi lấy đó làm mức đề nghị, và bị loại ở vòng thương lượng ở ba nơi liên tiếp. Đọc kỹ lại thì mẫu của báo cáo chủ yếu là người làm cho công ty nước ngoài tại hai thành phố lớn, còn bạn ấy đang ứng tuyển ở nơi khác và loại hình khác. Con số không sai; nó chỉ trả lời một câu hỏi khác.",
    },
    quiz: [
      {
        question: "Báo cáo lương thu thập qua khảo sát tự nguyện có thiên lệch gì?",
        options: [
          "Người có lương tốt sẵn lòng trả lời hơn, nên mẫu lệch lên trên",
          "Người trả lời thường khai thấp hơn thực tế vì e ngại thông tin bị lộ ra ngoài công ty",
          "Mẫu nghiêng về người mới đi làm vì họ quan tâm tới báo cáo lương nhiều hơn người lâu năm",
          "Số liệu bị lặp do một người có thể trả lời nhiều lần trong cùng một đợt khảo sát",
        ],
        correct: 0,
        explanation:
          "Đây là thiên lệch tự chọn mẫu và nó có mặt ở gần như mọi khảo sát lương. Người đang hài lòng với mức của mình có động lực chia sẻ hơn người đang thấy mình bị trả thấp. Kết quả là cả trung bình lẫn trung vị đều nhích lên so với thị trường thật, và không có cách nào chỉnh lại từ phía người đọc.",
      },
      {
        question: "Cùng một chức danh ở hai công ty có thể khác nhau thế nào?",
        options: [
          "Phạm vi trách nhiệm khác hẳn, nên chức danh không so sánh trực tiếp được",
          "Chức danh được chuẩn hóa theo cấp bậc chung của ngành nên khác biệt chủ yếu là ở mức lương",
          "Khác nhau về số năm kinh nghiệm tối thiểu mà công ty yêu cầu cho chức danh đó",
          "Khác nhau chủ yếu ở quy mô đội nhóm mà người giữ chức danh đó phải quản lý trực tiếp",
        ],
        correct: 0,
        explanation:
          "Chức danh trong ngành này không có chuẩn chung. Một nơi gọi là senior sau ba năm, một nơi sau bảy năm, và có nơi dùng chức danh cao để bù cho lương thấp. Vì vậy lọc báo cáo theo chức danh cho ra một tập hợp trộn lẫn nhiều mức thực tế khác nhau, và đó là lý do khoảng phân vị rộng hơn ta tưởng.",
      },
      {
        question: "Khoảng giữa phân vị 25 và phân vị 75 cho biết điều gì?",
        options: [
          "Nửa số người ở giữa nhận mức nằm trong khoảng đó",
          "Mức lương thấp nhất và cao nhất mà báo cáo ghi nhận được sau khi loại các giá trị bất thường",
          "Khoảng mà công ty thường đề nghị cho ứng viên mới trước khi bước vào vòng thương lượng",
          "Độ tin cậy của số liệu, khoảng càng hẹp thì mẫu khảo sát càng lớn và càng đáng tin cậy",
        ],
        correct: 0,
        explanation:
          "Đây là thông tin hữu ích hơn hẳn một con số đơn lẻ, vì nó cho thấy độ rộng của thị trường. Một khoảng rộng nghĩa là cùng chức danh mà mức trả rất khác nhau, và khi đó vị trí của bạn trong khoảng phụ thuộc vào loại hình công ty và năng lực cụ thể nhiều hơn là vào chức danh.",
      },
      {
        question: "Báo cáo lương của năm ngoái nên dùng thế nào?",
        options: [
          "Dùng để thấy khoảng và thứ bậc, không dùng làm mức đề nghị",
          "Cộng thêm tỷ lệ lạm phát của năm để quy đổi con số về mặt bằng giá của thời điểm hiện tại",
          "Không dùng được vì thị trường lao động ngành IT thay đổi quá nhanh trong vòng một năm",
          "Dùng nguyên vẹn vì các báo cáo lương thường có độ trễ và số liệu đã phản ánh xu hướng",
        ],
        correct: 0,
        explanation:
          "Cấu trúc của thị trường - vị trí nào trả cao hơn vị trí nào, khoảng cách giữa các cấp bậc - thay đổi chậm và vẫn dùng được. Mức tuyệt đối thì thay đổi nhanh hơn, và theo cả hai chiều tùy chu kỳ tuyển dụng, nên cộng thêm một tỷ lệ cố định là đoán chứ không phải điều chỉnh.",
      },
      {
        question: "Nguồn nào bổ sung tốt nhất cho một báo cáo lương?",
        options: [
          "Vài tin tuyển dụng đang mở có ghi khoảng lương cho đúng vị trí bạn nhắm",
          "Số liệu thống kê thu nhập bình quân của ngành do các cơ quan quản lý công bố hằng năm",
          "Mức lương của bạn bè cùng khóa vì họ có xuất phát điểm và số năm kinh nghiệm tương đương",
          "Các bài viết tổng hợp xu hướng lương được đăng trên những trang tin về công nghệ trong nước",
        ],
        correct: 0,
        explanation:
          "Tin tuyển dụng đang mở là dữ liệu của hiện tại và của đúng phân khúc bạn đang nhắm tới, hai điều mà báo cáo tổng hợp không có. Nó ít mẫu hơn nhiều, nên không thay thế được báo cáo, nhưng nó neo con số vào thứ đang thật sự được trả chứ không phải thứ đã được trả.",
      },
    ],
    practicePrompt: {
      question:
        "Báo cáo ghi trung bình cho vị trí của bạn là 35 triệu, trung vị 28 triệu. Nên lấy mốc nào khi thương lượng?",
      options: [
        "Lấy trung vị làm mốc, rồi điều chỉnh theo loại hình công ty và thành phố",
        "Lấy trung bình vì đó là con số đại diện cho toàn bộ mẫu khảo sát chứ không phải một điểm giữa",
        "Lấy khoảng giữa hai con số vì như vậy cân bằng được cả hai cách tính và giảm rủi ro sai lệch",
        "Lấy trung bình rồi trừ đi một khoản dự phòng để chừa chỗ cho bên tuyển thương lượng xuống",
      ],
      correct: 0,
      explanation:
        "Chênh lệch bảy triệu giữa trung bình và trung vị chính là dấu hiệu phân bố lệch phải, tức nhóm lương rất cao đang kéo trung bình lên. Lấy trung vị rồi điều chỉnh theo hoàn cảnh cụ thể của bạn là cách dùng đúng cả hai con số, thay vì lấy một con số đứng giữa chúng mà không đại diện cho gì.",
    },
    keyTakeaways: [
      "Phân bố lương lệch phải nên trung bình luôn cao hơn mức đa số nhận",
      "Khảo sát tự nguyện lệch lên trên, và không chỉnh lại được từ phía người đọc",
      "Chức danh không có chuẩn chung nên lọc theo chức danh trộn lẫn nhiều mức thực tế",
      "Khoảng phân vị hữu ích hơn bất kỳ con số đơn lẻ nào",
    ],
    summary: {
      keyIdea: "Báo cáo lương trả lời câu hỏi của mẫu mà nó thu được, không phải câu hỏi của bạn; đọc mẫu trước rồi mới đọc con số.",
    },
    application: {
      message: "Tìm một báo cáo lương IT gần đây, ghi ra ba điều: ai trả lời, bao nhiêu người, và có trung vị không.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi năm có vài báo cáo lương ngành IT tại Việt Nam, và chúng là mốc tham chiếu duy nhất mà người đi xin việc có. Vấn đề không nằm ở việc chúng sai, mà ở việc chúng trả lời một câu hỏi hẹp hơn tiêu đề gợi ra.",
      },
      {
        type: "heading",
        text: "Đọc mẫu trước, đọc con số sau",
      },
      {
        type: "paragraph",
        text: "Mọi báo cáo đều là kết quả của một mẫu cụ thể: bao nhiêu người trả lời, họ ở thành phố nào, làm cho loại công ty nào. Một con số rút ra từ mẫu không giống bạn thì không nói gì về bạn. Đây là phần luôn nằm ở cuối báo cáo và luôn bị bỏ qua, dù nó quyết định toàn bộ giá trị của những gì đứng trước.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi đặt cho mọi báo cáo lương",
        concepts: [
          {
            vi: "Ai trả lời",
            en: "Who answered",
            def: "Khảo sát tự nguyện nghiêng về người đang hài lòng. Mọi con số vì thế nhích lên trên.",
          },
          {
            vi: "Có trung vị không",
            en: "Median",
            def: "Chỉ có trung bình thì con số đó cao hơn mức phổ biến. Phân bố lương luôn lệch phải.",
          },
          {
            vi: "Lọc được tới đâu",
            en: "Segmentation",
            def: "Theo thành phố, loại hình công ty và cấp bậc. Không lọc được thì con số quá thô để dùng.",
          },
          {
            vi: "Số liệu của khi nào",
            en: "Vintage",
            def: "Cấu trúc thị trường thay đổi chậm và vẫn dùng được; mức tuyệt đối thì không.",
          },
        ],
      },
      {
        type: "callout",
        label: "Một con số không phải một mức lương",
        text: "Cùng chức danh, cùng số năm, hai người vẫn có thể chênh nhau gấp rưỡi vì loại hình công ty, sản phẩm họ làm, và cả thời điểm họ được tuyển. Dùng một con số duy nhất làm mốc thương lượng là bỏ qua chính độ rộng ấy - thứ mà báo cáo đã nói ra nếu nó có đưa phân vị.",
      },
      {
        type: "closing",
        lines: [
          "Báo cáo lương hữu ích nhất khi được dùng để hiểu khoảng, và tệ nhất khi được dùng để chốt một điểm.",
          "Bài sau: cùng một mức lương ở ba loại hình công ty là ba công việc khác nhau.",
        ],
      },
    ],
  },
  {
    id: 335,
    slug: "outsourcing-product-va-agency",
    title: "Chặng 14, Bài 6: Outsourcing, product và agency",
    subtitle: "Ba loại công ty, ba kiểu công việc, và cái nào hợp với giai đoạn nào",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🏢",
    track: "personal",
    whyItMatters:
      "Phần lớn việc làm IT ở Việt Nam nằm ở ba loại hình này, và chúng khác nhau nhiều hơn mức lương gợi ra. Chọn nhầm loại hình cho giai đoạn nghề nghiệp của mình là lý do phổ biến khiến người ta nghỉ sau một năm dù không có gì sai với công ty.",
    openingQuestion: "Khác biệt lớn nhất giữa làm ở công ty sản phẩm và làm outsourcing là gì?",
    openingOptions: [
      "Bạn có sống cùng hậu quả của quyết định kỹ thuật mình đưa ra hay không",
      "Mức độ hiện đại của công nghệ được sử dụng, công ty sản phẩm thường dùng công nghệ mới hơn",
      "Quy mô đội ngũ kỹ thuật, công ty sản phẩm thường có đội lớn hơn và phân chia vai trò rõ hơn",
      "Áp lực thời hạn, làm outsourcing thì thời hạn do khách hàng đặt nên luôn gấp hơn đáng kể",
    ],
    correctOption: 0,
    explanation:
      "Ở công ty sản phẩm, thứ bạn viết hôm nay bạn sẽ còn phải sửa trong hai năm tới, nên nợ kỹ thuật là vấn đề của chính bạn và chất lượng có động lực nội tại. Ở outsourcing, dự án thường bàn giao rồi khép lại, nên vòng phản hồi giữa quyết định và hậu quả bị cắt - bạn ít khi biết cái mình chọn là đúng hay sai. Đổi lại, outsourcing cho bạn đi qua nhiều miền nghiệp vụ và nhiều kiểu khách hàng trong thời gian ngắn, thứ mà một sản phẩm duy nhất không cho được. Không loại nào hơn; chúng dạy hai bộ kỹ năng khác nhau.",
    diagram: [
      { label: "Outsourcing: nhiều dự án, ít chiều sâu, học nhanh về diện", arrow: true },
      { label: "Product: một sản phẩm, sống cùng hậu quả, học sâu", arrow: true },
      { label: "Agency: nhịp nhanh, thiên về giao diện và thời hạn", arrow: true },
      { label: "Chọn theo thứ bạn còn thiếu, không theo mức lương" },
    ],
    realWorldExample: {
      company: "Hai năm ở hai nơi",
      description:
        "Một bạn làm outsourcing hai năm, đi qua bốn dự án ở bốn lĩnh vực, quen với việc đọc mã lạ và nói chuyện với khách hàng, nhưng chưa từng thấy hệ thống nào của mình chạy qua năm thứ hai. Một bạn khác ở một công ty sản phẩm, làm đúng một hệ thống, và đã hai lần phải sửa chính thứ mình viết năm ngoái. Người thứ nhất phỏng vấn tốt hơn về diện, người thứ hai trả lời sâu hơn về đánh đổi.",
    },
    quiz: [
      {
        question: "Vì sao outsourcing thường cho học nhanh về diện?",
        options: [
          "Vì bạn đi qua nhiều dự án và nhiều miền nghiệp vụ trong thời gian ngắn",
          "Vì các công ty outsourcing đầu tư nhiều hơn cho đào tạo nội bộ và chứng chỉ chuyên môn",
          "Vì khách hàng nước ngoài thường yêu cầu áp dụng những công nghệ mới nhất của thị trường",
          "Vì quy trình làm việc chuẩn hóa cao nên người mới tiếp cận được nhiều mảng cùng lúc",
        ],
        correct: 0,
        explanation:
          "Một người làm outsourcing ba năm có thể đã chạm vào y tế, bán lẻ và tài chính, mỗi thứ vài tháng. Đó là vốn thật khi phỏng vấn và khi chuyển ngành. Cái giá là ít khi ở lại đủ lâu để thấy một quyết định kiến trúc già đi, mà đó lại là chỗ hiểu biết sâu hình thành.",
      },
      {
        question: "Nợ kỹ thuật được nhìn nhận khác nhau thế nào giữa hai loại hình?",
        options: [
          "Ở công ty sản phẩm nó là chi phí của chính đội; ở dự án bàn giao thì thường không",
          "Ở công ty sản phẩm nó được ghi nhận và ưu tiên xử lý theo quy trình còn ở nơi khác thì không",
          "Ở outsourcing nó nghiêm trọng hơn vì khách hàng sẽ kiểm tra chất lượng mã trước khi nghiệm thu",
          "Không khác nhau vì nợ kỹ thuật đều làm chậm tiến độ như nhau ở bất kỳ loại hình nào",
        ],
        correct: 0,
        explanation:
          "Động lực dọn nợ kỹ thuật đến từ việc chính bạn sẽ gặp lại nó. Khi dự án kết thúc lúc bàn giao, khoản nợ đó chuyển sang người khác và không bao giờ quay lại bàn của bạn. Đây không phải chuyện ai chuyên nghiệp hơn ai - đó là hai cấu trúc khuyến khích khác nhau, và cấu trúc thắng thói quen.",
      },
      {
        question: "Đặc trưng nhịp làm việc ở agency là gì?",
        options: [
          "Nhiều dự án ngắn, thời hạn cứng, thiên về phần người dùng nhìn thấy",
          "Chu kỳ phát triển dài với nhiều giai đoạn phân tích yêu cầu trước khi bắt đầu viết mã",
          "Đội ngũ lớn chia theo chuyên môn hẹp nên mỗi người chỉ phụ trách một phần rất nhỏ",
          "Ít áp lực thời hạn hơn vì khách hàng của agency thường là các dự án dài hạn nhiều năm",
        ],
        correct: 0,
        explanation:
          "Agency sống bằng việc giao đúng hẹn những thứ có thể nhìn thấy được, nên nhịp nhanh và trọng tâm nghiêng về giao diện, trải nghiệm và tích hợp. Nó rèn tốc độ và khả năng ước lượng, và ít rèn những thứ chỉ lộ ra khi một hệ thống chạy nhiều năm dưới tải thật.",
      },
      {
        question: "Người mới ra trường nên ưu tiên tiêu chí nào khi chọn nơi đầu tiên?",
        options: [
          "Có người đi trước để học và có quy trình review mã tử tế",
          "Mức lương khởi điểm cao nhất trong các lời mời nhận được để tạo nền cho những lần sau",
          "Công nghệ mới nhất để hồ sơ trông hấp dẫn hơn với các nhà tuyển dụng trong vài năm tới",
          "Công ty lớn và có tên tuổi vì tên công ty trong hồ sơ sẽ mở được nhiều cánh cửa hơn về sau",
        ],
        correct: 0,
        explanation:
          "Tốc độ tiến bộ trong hai năm đầu phụ thuộc gần như hoàn toàn vào việc có ai đọc mã của bạn và nói cho bạn biết chỗ nào chưa được. Một nơi lương cao hơn hai triệu nhưng không có review mã sẽ khiến bạn mất nhiều hơn thế mỗi tháng, chỉ là khoản mất đó không hiện ra trên bảng lương.",
      },
      {
        question: "Chuyển từ outsourcing sang công ty sản phẩm thường vướng ở đâu?",
        options: [
          "Câu hỏi về đánh đổi dài hạn, thứ ít gặp khi dự án kết thúc lúc bàn giao",
          "Yêu cầu về công nghệ vì công ty sản phẩm thường dùng bộ công nghệ hoàn toàn khác biệt",
          "Số năm kinh nghiệm vì công ty sản phẩm quy đổi kinh nghiệm outsourcing ở tỷ lệ thấp hơn",
          "Quy trình phỏng vấn dài hơn với nhiều vòng nên ứng viên khó sắp xếp thời gian tham dự",
        ],
        correct: 0,
        explanation:
          "Người phỏng vấn ở công ty sản phẩm hay hỏi kiểu hai năm sau thì cái này ra sao, và đây là câu hỏi mà kinh nghiệm dự án ngắn không tự sinh ra câu trả lời. Cách chuẩn bị là chọn sẵn một quyết định kỹ thuật bạn từng đưa ra và nghĩ trước xem nó sẽ già đi thế nào.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn đã làm outsourcing ba năm và muốn đi sâu hơn về hệ thống. Nên ưu tiên gì khi chọn nơi tiếp theo?",
      options: [
        "Nơi bạn ở lại đủ lâu với một hệ thống và có cơ hội thấy nó lớn lên",
        "Nơi trả lương cao hơn rõ rệt vì ba năm kinh nghiệm đã đủ để yêu cầu mức tương xứng hơn",
        "Nơi dùng công nghệ mà bạn chưa từng làm để mở rộng thêm diện kỹ năng đã có sẵn",
        "Nơi có đội ngũ đông và cơ cấu rõ ràng để có nhiều đồng nghiệp giàu kinh nghiệm hơn",
      ],
      correct: 0,
      explanation:
        "Thứ bạn đang thiếu là chiều sâu, và chiều sâu chỉ hình thành khi bạn sống cùng hậu quả của quyết định mình đưa ra. Thêm một công nghệ nữa vào danh sách là tiếp tục tích lũy theo chiều bạn đã mạnh, tức là trả tiền cho thứ mình đã có.",
    },
    keyTakeaways: [
      "Khác biệt cốt lõi là bạn có sống cùng hậu quả quyết định của mình hay không",
      "Outsourcing cho diện, sản phẩm cho chiều sâu, agency cho tốc độ",
      "Cấu trúc khuyến khích quyết định thói quen về nợ kỹ thuật, không phải ý chí cá nhân",
      "Nơi đầu tiên nên chọn theo chất lượng review mã, không theo mức lương",
    ],
    summary: {
      keyIdea: "Ba loại hình dạy ba bộ kỹ năng khác nhau; câu hỏi đúng không phải nơi nào tốt hơn mà là bạn đang thiếu bộ nào.",
    },
    application: {
      message: "Viết ra ba kỹ năng bạn muốn có sau hai năm tới, rồi xem loại hình nào tạo ra chúng như một phần của công việc hằng ngày.",
    },
    sections: [
      {
        type: "lead",
        text: "Cùng một chức danh và cùng một mức lương, ba loại hình công ty này tạo ra ba người kỹ sư khác nhau sau ba năm. Khác biệt không nằm ở công nghệ mà ở vòng phản hồi.",
      },
      {
        type: "heading",
        text: "Vòng phản hồi quyết định bạn học được gì",
      },
      {
        type: "paragraph",
        text: "Học nghề kỹ thuật là quá trình ra quyết định rồi thấy hậu quả. Khi vòng đó khép lại - bạn sửa chính thứ mình viết năm ngoái - bạn học được về đánh đổi dài hạn. Khi vòng đó bị cắt ở lúc bàn giao, bạn học được về tốc độ, về việc tiếp cận mã lạ, và về cách làm việc với người ngoài đội. Cả hai đều là học, chỉ là học hai thứ.",
      },
      {
        type: "conceptTable",
        title: "Ba loại hình và thứ mỗi loại cho",
        concepts: [
          {
            vi: "Outsourcing",
            en: "Outsourcing",
            def: "Nhiều miền nghiệp vụ, nhiều mã lạ, nhiều kiểu khách. Diện rộng nhanh, ít khi ở lại đủ lâu.",
          },
          {
            vi: "Product",
            en: "Product",
            def: "Một hệ thống sống nhiều năm. Nợ kỹ thuật là của bạn, và đó là lý do bạn học được về nó.",
          },
          {
            vi: "Agency",
            en: "Agency",
            def: "Dự án ngắn, hẹn cứng, trọng phần nhìn thấy được. Rèn ước lượng và tốc độ giao hàng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không có loại hình nào là bước lùi",
        text: "Ngành hay xếp hạng ngầm ba loại này, thường đặt công ty sản phẩm lên trên. Xếp hạng đó bỏ qua việc kỹ sư nào cũng cần cả diện lẫn chiều sâu, và người thiếu diện gặp khó khi phải làm việc với hệ thống ngoài vùng quen của mình đúng như người thiếu chiều sâu gặp khó khi được hỏi về hai năm sau.",
      },
      {
        type: "closing",
        lines: [
          "Chọn loại hình theo thứ bạn còn thiếu, chứ không theo thứ tự mà người khác xếp sẵn.",
          "Bài sau: phần thù lao không phải tiền mặt - cổ phần thưởng, và khi nào nó thành tiền thật.",
        ],
      },
    ],
  },
  {
    id: 336,
    slug: "esop-va-vesting",
    title: "Chặng 14, Bài 7: ESOP và vesting",
    subtitle: "Cổ phần thưởng thành tiền thật vào lúc nào, và những mốc quyết định điều đó",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    whyItMatters:
      "Nhiều lời mời ở công ty công nghệ gồm một phần cổ phần thưởng, và phần đó thường được nói tới bằng một con số lớn. Con số ấy có thành tiền hay không phụ thuộc vào vài mốc trong hợp đồng mà ít ai đọc trước khi ký.",
    openingQuestion: "Vesting trong một gói cổ phần thưởng nghĩa là gì?",
    openingOptions: [
      "Lịch trình mà theo đó bạn dần thật sự sở hữu số cổ phần được hứa",
      "Thời điểm công ty xác định giá trị của mỗi cổ phần dựa trên kết quả kinh doanh trong kỳ",
      "Quá trình chuyển đổi cổ phần thưởng thành cổ phiếu phổ thông sau khi công ty niêm yết",
      "Khoảng thời gian bạn không được phép bán số cổ phần đã nhận cho bất kỳ bên thứ ba nào",
    ],
    correctOption: 0,
    explanation:
      "Cổ phần thưởng gần như không bao giờ được trao hết một lần. Nó được trao dần theo thời gian bạn còn làm việc, thường trong ba tới bốn năm, và rất phổ biến là có một mốc chặn ở năm đầu: nghỉ trước mốc đó thì không nhận được gì cả, kể cả phần tương ứng với mười một tháng đã làm. Sau mốc đó, phần còn lại thường được trao đều theo tháng hoặc quý. Hiểu điều này quan trọng vì nó đổi hẳn ý nghĩa của con số trong lời mời: đó không phải một khoản bạn có, mà là một khoản bạn sẽ có nếu ở lại đủ lâu.",
    diagram: [
      { label: "Ký hợp đồng, số cổ phần được hứa nhưng chưa thuộc về bạn", arrow: true },
      { label: "Qua mốc chặn năm đầu, một phần được trao", arrow: true },
      { label: "Phần còn lại trao dần theo tháng hoặc quý", arrow: true },
      { label: "Thành tiền chỉ khi có sự kiện thanh khoản" },
    ],
    realWorldExample: {
      company: "Nghỉ trước mốc một tháng",
      description:
        "Một bạn nhận lời mời có phần cổ phần thưởng được nhắc tới như một khoản đáng kể, rồi nghỉ sau mười một tháng vì tìm được nơi khác trả tiền mặt cao hơn. Toàn bộ phần cổ phần về không vì chưa qua mốc chặn năm đầu. Nơi mới trả cao hơn ba triệu mỗi tháng, nên đổi lại là chuyện có thể tính được - chỉ có điều bạn ấy không hề tính, vì không biết mốc đó tồn tại.",
    },
    quiz: [
      {
        question: "Mốc chặn năm đầu trong lịch vesting có tác dụng gì với người lao động?",
        options: [
          "Nghỉ trước mốc thì không nhận được phần nào, kể cả phần đã tích lũy",
          "Trì hoãn việc nhận cổ phần sang năm sau nhưng phần tích lũy vẫn được giữ nguyên cho bạn",
          "Cho phép công ty mua lại số cổ phần đã trao với giá gốc nếu bạn nghỉ trong năm đầu tiên",
          "Giới hạn số cổ phần được trao trong năm đầu ở một tỷ lệ thấp hơn các năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Đây là điều khoản có sức nặng nhất trong cả gói và cũng là điều khoản ít được nhắc tới nhất lúc trao đổi. Nó biến năm đầu tiên thành một khoảng tất cả hoặc không có gì, nên nếu bạn định nghỉ trong khoảng đó thì phần cổ phần trong lời mời nên được tính bằng không khi so sánh.",
      },
      {
        question: "Cổ phần của một công ty chưa niêm yết khác cổ phiếu niêm yết ở điểm nào là chính?",
        options: [
          "Không có nơi bán, nên giá trị ghi trên giấy chưa phải tiền có thể tiêu",
          "Không được chia lợi nhuận cho tới khi công ty hoàn tất thủ tục niêm yết trên sàn chứng khoán",
          "Số lượng cổ phần thay đổi liên tục nên tỷ lệ sở hữu của bạn không được xác định rõ ràng",
          "Giá trị được công ty công bố mỗi quý nên biến động ít hơn nhiều so với cổ phiếu trên sàn",
        ],
        correct: 0,
        explanation:
          "Thanh khoản là khác biệt cốt lõi. Một mức định giá trong vòng gọi vốn cho ra một con số, nhưng con số đó chỉ thành tiền khi có sự kiện thanh khoản - công ty bán lại, niêm yết, hoặc mở đợt mua lại cổ phần của nhân viên. Không có sự kiện nào thì nó vẫn là một con số trên giấy, dù định giá cao tới đâu.",
      },
      {
        question: "Vì sao nên hỏi rõ số cổ phần chiếm bao nhiêu phần trăm?",
        options: [
          "Vì số lượng cổ phần không có ý nghĩa nếu không biết tổng số đang lưu hành",
          "Vì tỷ lệ phần trăm là căn cứ để tính số cổ tức bạn sẽ được nhận hằng năm từ công ty",
          "Vì các công ty có nghĩa vụ công bố tỷ lệ này cho người lao động theo quy định hiện hành",
          "Vì tỷ lệ phần trăm quyết định bạn có quyền biểu quyết trong các cuộc họp cổ đông hay không",
        ],
        correct: 0,
        explanation:
          "Mười nghìn cổ phần nghe lớn nhưng không nói gì cho tới khi biết tổng là một triệu hay một trăm triệu. Đây là câu hỏi hoàn toàn hợp lệ khi thương lượng, và phản ứng của bên tuyển trước câu hỏi này cũng là thông tin đáng giá về mức độ minh bạch của nơi bạn sắp vào.",
      },
      {
        question: "Pha loãng qua các vòng gọi vốn ảnh hưởng thế nào tới phần của nhân viên?",
        options: [
          "Tỷ lệ sở hữu giảm đi, dù số cổ phần bạn nắm không đổi",
          "Số cổ phần được điều chỉnh tăng tương ứng để giữ nguyên tỷ lệ sở hữu ban đầu của bạn",
          "Không ảnh hưởng vì phần dành cho nhân viên được tách riêng khỏi phần dành cho nhà đầu tư",
          "Giá trị mỗi cổ phần giảm theo tỷ lệ pha loãng nên tổng giá trị phần của bạn không đổi",
        ],
        correct: 0,
        explanation:
          "Mỗi vòng gọi vốn phát hành thêm cổ phần, nên phần trăm của những người có sẵn giảm xuống. Điều này không nhất thiết xấu - vòng gọi vốn thường đi kèm định giá cao hơn, nên một phần trăm nhỏ hơn của một chiếc bánh lớn hơn vẫn có thể lớn hơn. Nhưng nó nghĩa là tỷ lệ hôm nay không phải tỷ lệ mãi mãi.",
      },
      {
        question: "Nên so sánh một lời mời có cổ phần với một lời mời toàn tiền mặt thế nào?",
        options: [
          "Coi phần cổ phần là khoản không chắc chắn và so phần tiền mặt trước",
          "Chia giá trị cổ phần theo định giá hiện tại cho số năm vesting rồi cộng vào lương hằng năm",
          "Ưu tiên lời mời có cổ phần vì đó là phần có khả năng tăng giá trị nhiều lần trong tương lai",
          "Ước lượng xác suất công ty thành công rồi nhân với giá trị cổ phần để có con số kỳ vọng",
        ],
        correct: 0,
        explanation:
          "Phần tiền mặt là thứ chắc chắn và trả các hóa đơn của bạn; phần cổ phần là một khả năng. Trộn hai thứ vào một con số duy nhất làm mất đi thông tin quan trọng nhất là mức độ chắc chắn. Cách dùng đúng là hỏi phần tiền mặt có đủ sống không, rồi coi cổ phần như phần thưởng có thể không tới.",
      },
    ],
    practicePrompt: {
      question:
        "Lời mời gồm lương thấp hơn nơi khác 4 triệu mỗi tháng, bù lại có cổ phần vesting 4 năm với mốc chặn 1 năm. Đánh giá thế nào?",
      options: [
        "Hỏi tỷ lệ phần trăm và điều kiện thanh khoản, rồi xem phần tiền mặt có đủ sống không",
        "Nhận vì bốn năm vesting cho thấy công ty có kế hoạch dài hạn và tin vào giá trị của cổ phần",
        "Từ chối vì mốc chặn một năm là điều khoản bất lợi và cho thấy công ty không tin nhân viên",
        "Tính giá trị cổ phần theo định giá gần nhất rồi so với phần lương bị thiếu trong bốn năm",
      ],
      correct: 0,
      explanation:
        "Bốn triệu mỗi tháng là khoản chắc chắn và bạn sẽ mất nó ngay từ tháng đầu. Phần cổ phần chỉ có nghĩa sau khi biết tỷ lệ và biết con đường nào dẫn tới thanh khoản. Mốc chặn một năm là điều khoản rất phổ biến chứ không phải dấu hiệu xấu, nhưng nó nói cho bạn biết năm đầu là một canh bạc tất cả hoặc không.",
    },
    keyTakeaways: [
      "Cổ phần thưởng là khoản sẽ có nếu ở lại đủ lâu, không phải khoản đang có",
      "Mốc chặn năm đầu biến năm đầu thành tất cả hoặc không có gì",
      "Số cổ phần vô nghĩa nếu không biết tổng số đang lưu hành",
      "Phần tiền mặt là chắc chắn; đừng trộn nó với phần chỉ là khả năng",
    ],
    summary: {
      keyIdea: "Cổ phần thưởng có thể là khoản lớn nhất trong sự nghiệp của bạn hoặc bằng không, và vài dòng trong hợp đồng quyết định nó rơi vào đâu.",
    },
    application: {
      message: "Nếu bạn đang có gói cổ phần, tìm ba con số trong hợp đồng: tỷ lệ phần trăm, mốc chặn, và điều kiện khi nghỉ việc.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần thù lao không phải tiền mặt xuất hiện ngày càng nhiều trong các lời mời ở Việt Nam. Nó được nói tới bằng những con số lớn, và những con số ấy có một khoảng cách rất xa với tiền trong tài khoản.",
      },
      {
        type: "heading",
        text: "Ba lớp ngăn giữa lời hứa và tiền",
      },
      {
        type: "paragraph",
        text: "Lớp thứ nhất là thời gian: vesting trao dần, và mốc chặn có thể xóa sạch nếu bạn đi sớm. Lớp thứ hai là tỷ lệ: số cổ phần chỉ có nghĩa khi đặt cạnh tổng số, và tổng số thì tăng qua mỗi vòng gọi vốn. Lớp thứ ba là thanh khoản: phải có ai đó mua thì mới thành tiền. Một gói tốt là gói vượt qua được cả ba, và ba câu hỏi ấy đều hỏi được trước khi ký.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi trước khi ký",
        concepts: [
          {
            vi: "Bao nhiêu phần trăm",
            en: "Percentage",
            def: "Số cổ phần không nói gì nếu không có tổng số đang lưu hành để đặt cạnh.",
          },
          {
            vi: "Lịch vesting",
            en: "Vesting schedule",
            def: "Mấy năm, mốc chặn ở đâu, sau mốc thì trao theo tháng hay theo quý.",
          },
          {
            vi: "Khi nghỉ việc thì sao",
            en: "On leaving",
            def: "Phần đã vest có được giữ không, và nếu phải mua thì mua trong bao lâu với giá nào.",
          },
          {
            vi: "Đường tới thanh khoản",
            en: "Liquidity",
            def: "Đã có đợt mua lại nào chưa, hay chỉ có kế hoạch. Đây là câu phân biệt gói thật với gói trên giấy.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng để cổ phần giữ chân bạn ở nơi không hợp",
        text: "Vesting được thiết kế để giữ người, và nó làm việc đó rất tốt - kể cả khi công việc đã không còn phù hợp. Luôn có một mốc tiếp theo sắp tới, nên luôn có lý do ở thêm sáu tháng. Cách thoát khỏi vòng này là quy phần sắp vest ra một con số cụ thể rồi hỏi thẳng: nếu ai đó đưa mình đúng số tiền đó để ở lại thêm sáu tháng, mình có nhận không.",
      },
      {
        type: "closing",
        lines: [
          "Cổ phần thưởng là một khả năng có điều kiện, và các điều kiện đều nằm trong hợp đồng bạn được đọc trước.",
          "Bài sau: khoản ngược lại - những điều khoản khiến bạn nợ công ty khi muốn đi.",
        ],
      },
    ],
  },
  {
    id: 337,
    slug: "cam-ket-dao-tao-va-rang-buoc",
    title: "Chặng 14, Bài 8: Cam kết đào tạo và các điều khoản ràng buộc",
    subtitle: "Nhận thêm hôm nay, nợ lại ngày mai - và khoản nợ đó lớn tới đâu",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Đây là nhóm điều khoản có sức ràng buộc lớn nhất trong một hợp đồng lao động, và cũng là nhóm được đọc lướt nhiều nhất vì nó nằm ở phần cuối, sau phần lương. Một điều khoản ký trong mười giây có thể quyết định hai năm tiếp theo của bạn.",
    openingQuestion: "Cam kết đào tạo trong hợp đồng lao động thường ràng buộc điều gì?",
    openingOptions: [
      "Bạn phải làm đủ một thời gian nhất định, nếu nghỉ sớm thì hoàn lại chi phí",
      "Bạn phải hoàn thành toàn bộ chương trình đào tạo và đạt kết quả tối thiểu theo yêu cầu",
      "Bạn không được chia sẻ nội dung đào tạo ra bên ngoài trong suốt thời gian còn làm việc",
      "Công ty được quyền phân công bạn vào bất kỳ dự án nào sau khi kết thúc khóa đào tạo",
    ],
    correctOption: 0,
    explanation:
      "Cơ chế của nó giống một khoản vay: công ty trả trước chi phí đào tạo, đổi lại bạn cam kết ở lại một khoảng thời gian, và nghỉ sớm thì phải hoàn lại phần tương ứng. Điều khiến nó khác một khoản vay thông thường là số tiền phải hoàn thường không rõ ràng khi ký - nó có thể gồm học phí, chi phí đi lại, và cả lương trả trong thời gian đào tạo. Đọc kỹ nghĩa là biết trước ba con số: thời gian cam kết, số tiền tối đa phải hoàn, và số đó giảm dần theo thời gian đã làm hay giữ nguyên cho tới ngày cuối.",
    diagram: [
      { label: "Công ty trả trước chi phí đào tạo", arrow: true },
      { label: "Bạn cam kết ở lại một khoảng thời gian", arrow: true },
      { label: "Nghỉ sớm thì hoàn lại theo công thức trong hợp đồng", arrow: true },
      { label: "Công thức đó quyết định bạn có thật sự đi được hay không" },
    ],
    realWorldExample: {
      company: "Khóa đào tạo ba tháng và hai năm cam kết",
      description:
        "Một bạn được cử đi đào tạo ba tháng, ký cam kết ở lại hai năm. Sau mười tháng, công việc đổi hướng và bạn ấy muốn đi. Hợp đồng ghi hoàn toàn bộ chi phí nếu nghỉ trước hạn, không giảm dần theo thời gian đã làm - nên số phải hoàn sau mười tháng bằng đúng số phải hoàn sau một tuần. Nếu điều khoản có giảm dần theo tháng, con số ấy đã nhỏ hơn nhiều.",
    },
    quiz: [
      {
        question: "Điều khoản hoàn chi phí đào tạo giảm dần theo thời gian khác gì loại giữ nguyên?",
        options: [
          "Càng làm lâu thì số phải hoàn càng nhỏ, nên bạn dần lấy lại quyền lựa chọn",
          "Số phải hoàn được chia đều cho các tháng còn lại thay vì phải trả một lần khi nghỉ việc",
          "Chỉ áp dụng cho phần học phí còn các chi phí khác vẫn phải hoàn lại đầy đủ như ban đầu",
          "Thời gian cam kết được rút ngắn tương ứng với phần chi phí mà bạn đã hoàn lại trước đó",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt lớn nhất giữa hai kiểu điều khoản và nó hoàn toàn thương lượng được lúc ký. Loại giữ nguyên tạo ra một vách đứng: cho tới ngày cuối cùng của cam kết, chi phí ra đi vẫn nguyên vẹn. Loại giảm dần biến nó thành một con dốc, và mỗi tháng bạn làm việc đều mua lại một phần tự do.",
      },
      {
        question: "Điều khoản không cạnh tranh sau khi nghỉ việc nên được đọc thế nào?",
        options: [
          "Xem phạm vi và thời hạn có cụ thể không, vì phạm vi rộng vô hạn là dấu hiệu đáng hỏi lại",
          "Bỏ qua vì các điều khoản loại này không có giá trị thực thi trong lĩnh vực phần mềm",
          "Chấp nhận như một thủ tục chuẩn vì mọi hợp đồng lao động ngành IT đều có điều khoản này",
          "Yêu cầu xóa bỏ hoàn toàn vì nó hạn chế quyền làm việc được pháp luật bảo vệ",
        ],
        correct: 0,
        explanation:
          "Một điều khoản nêu rõ danh sách vài đối thủ trực tiếp trong sáu tháng là chuyện khác hẳn một điều khoản cấm làm cho mọi công ty phần mềm trong ba năm. Cả hai đều gọi là không cạnh tranh, và khoảng cách giữa chúng chính là thứ cần đọc. Câu hỏi này hoàn toàn hợp lệ khi thương lượng.",
      },
      {
        question: "Vì sao nên hỏi rõ con số tối đa phải hoàn ngay khi ký?",
        options: [
          "Vì chi phí đào tạo có thể gồm nhiều khoản mà bạn không hình dung được lúc đó",
          "Vì con số này được dùng làm căn cứ tính thuế thu nhập cá nhân trong năm bạn nghỉ việc",
          "Vì công ty có nghĩa vụ giảm số tiền phải hoàn nếu bạn yêu cầu làm rõ ngay từ lúc ký kết",
          "Vì con số đó sẽ thay đổi theo thời giá nếu không được ghi cố định trong văn bản hợp đồng",
        ],
        correct: 0,
        explanation:
          "Nhiều người hình dung chi phí đào tạo là học phí, rồi phát hiện nó còn gồm lương đã trả trong thời gian học, chi phí đi lại và ăn ở. Con số cuối cùng có thể gấp nhiều lần con số bạn tưởng. Hỏi một câu lúc ký rẻ hơn rất nhiều so với biết vào lúc bạn đã muốn đi.",
      },
      {
        question: "Thưởng ký hợp đồng kèm điều kiện hoàn lại có đặc điểm gì?",
        options: [
          "Nó là tiền ứng trước, không phải tiền thưởng, cho tới khi qua mốc quy định",
          "Nó được tính vào thu nhập chịu thuế nên phần thực nhận thấp hơn con số được công bố",
          "Nó thường có giá trị lớn hơn phần chênh lệch lương nên bù được cho mức lương thấp hơn",
          "Nó chỉ phải hoàn lại nếu bạn chủ động nghỉ việc chứ không áp dụng khi công ty cho nghỉ",
        ],
        correct: 0,
        explanation:
          "Cách gọi làm người ta nhầm. Một khoản thưởng phải hoàn nếu nghỉ trong mười hai tháng thì trong mười hai tháng đó nó vẫn là tiền của công ty. Xử lý đúng là để riêng khoản đó ra, không tiêu, cho tới khi qua mốc - lúc đó nó mới thật sự là của bạn.",
      },
      {
        question: "Khi một điều khoản trong hợp đồng còn mơ hồ thì nên làm gì?",
        options: [
          "Đề nghị ghi rõ bằng văn bản trước khi ký, không dựa vào giải thích miệng",
          "Ghi lại lời giải thích của bộ phận nhân sự vào thư điện tử để làm bằng chứng khi cần tới",
          "Ký trước rồi đề nghị bổ sung phụ lục làm rõ trong thời gian thử việc còn hiệu lực",
          "Tham khảo cách các công ty khác trong ngành diễn giải điều khoản tương tự để suy ra ý nghĩa",
        ],
        correct: 0,
        explanation:
          "Người giải thích cho bạn hôm nay có thể không còn ở đó khi điều khoản được áp dụng, và thứ ràng buộc hai bên là văn bản chứ không phải cuộc trò chuyện. Đề nghị làm rõ trước khi ký là chuyện bình thường; một nơi khó chịu với đề nghị đó đã trả lời cho bạn một câu hỏi khác.",
      },
    ],
    practicePrompt: {
      question:
        "Hợp đồng có cam kết đào tạo hai năm, hoàn toàn bộ chi phí nếu nghỉ sớm, không nêu con số cụ thể. Nên làm gì?",
      options: [
        "Đề nghị ghi rõ con số tối đa và xin cơ chế giảm dần theo thời gian đã làm",
        "Ký và giữ liên lạc tốt với quản lý để sau này có thể thương lượng miễn giảm nếu cần nghỉ sớm",
        "Từ chối lời mời vì cam kết hai năm là quá dài đối với một vị trí kỹ sư ở giai đoạn đầu",
        "Ký nhưng lập kế hoạch tiết kiệm đủ số tiền dự kiến phải hoàn để giữ được quyền lựa chọn",
      ],
      correct: 0,
      explanation:
        "Cả hai đề nghị này đều phổ biến và thường được chấp nhận, vì chúng không đòi công ty bỏ điều khoản mà chỉ đòi nó rõ ràng và công bằng theo thời gian. Tiết kiệm sẵn một khoản không rõ độ lớn thì không lập kế hoạch được, còn trông vào thiện chí tương lai là để một điều khoản văn bản phụ thuộc vào một mối quan hệ.",
    },
    keyTakeaways: [
      "Cam kết đào tạo hoạt động như một khoản vay, chỉ khác là số phải trả thường không rõ lúc ký",
      "Điều khoản giảm dần biến vách đứng thành con dốc; nó thương lượng được",
      "Thưởng ký hợp đồng có điều kiện hoàn lại vẫn là tiền của công ty cho tới khi qua mốc",
      "Giải thích miệng không ràng buộc; chỉ văn bản mới ràng buộc",
    ],
    summary: {
      keyIdea: "Các điều khoản ràng buộc không xấu, nhưng chúng mua quyền lựa chọn của bạn bằng một cái giá mà bạn phải tự đọc ra.",
    },
    application: {
      message: "Mở hợp đồng hiện tại, tìm phần cam kết và điều khoản sau khi nghỉ việc, rồi trả lời: nếu nghỉ tháng sau, mình nợ bao nhiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần cuối hợp đồng lao động là nơi có mật độ điều khoản ràng buộc cao nhất, và cũng là nơi người ta đọc nhanh nhất vì phần lương đã ở phía trên và đã đọc kỹ rồi.",
      },
      {
        type: "heading",
        text: "Chúng đều có cùng một hình dạng",
      },
      {
        type: "paragraph",
        text: "Nhận thêm gì đó hôm nay - đào tạo, một khoản thưởng ký hợp đồng, một thiết bị - đổi lấy một ràng buộc về sau. Đó là hình dạng của việc vay, và câu hỏi đặt ra cũng giống hệt khi vay: vay bao nhiêu, trả trong bao lâu, và nếu muốn trả sớm thì được không. Điều khác biệt duy nhất là ở đây thứ đem ra thế chấp là quyền lựa chọn của bạn.",
      },
      {
        type: "conceptTable",
        title: "Bốn điều khoản đáng đọc chậm",
        concepts: [
          {
            vi: "Cam kết đào tạo",
            en: "Training bond",
            def: "Hỏi ba con số: thời gian, mức tối đa phải hoàn, và có giảm dần theo tháng không.",
          },
          {
            vi: "Thưởng ký hợp đồng",
            en: "Signing bonus",
            def: "Là tiền ứng trước cho tới khi qua mốc. Để riêng, đừng tiêu, cho tới lúc đó.",
          },
          {
            vi: "Không cạnh tranh",
            en: "Non-compete",
            def: "Phạm vi và thời hạn phải cụ thể. Rộng vô hạn là dấu hiệu để hỏi lại, không phải để ký.",
          },
          {
            vi: "Sở hữu trí tuệ",
            en: "IP assignment",
            def: "Có bao trùm cả dự án cá nhân làm ngoài giờ không. Nếu có thì đề nghị loại trừ rõ ràng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thương lượng điều khoản không phải là thiếu thiện chí",
        text: "Nhiều người ngại hỏi vì sợ trông như đang tính chuyện nghỉ ngay từ lúc chưa vào. Nhưng thời điểm duy nhất bạn có sức thương lượng là lúc họ đã chọn bạn và bạn chưa ký. Sau chữ ký, mọi đề nghị sửa đều là xin. Hỏi rõ một điều khoản cho thấy bạn đọc hợp đồng, và đó là điều nên có ở người sắp làm việc cho họ.",
      },
      {
        type: "closing",
        lines: [
          "Điều khoản ràng buộc không phải bẫy; nó chỉ là một cái giá không được nói ra thành lời.",
          "Bài sau: quay lại đầu quy trình - đọc một tin tuyển dụng và tách phần thật khỏi phần chữ đệm.",
        ],
      },
    ],
  },
  {
    id: 338,
    slug: "doc-tin-tuyen-dung",
    title: "Chặng 14, Bài 9: Đọc một tin tuyển dụng",
    subtitle: "Phần nào là yêu cầu thật, phần nào là danh sách mong muốn, phần nào là chữ đệm",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    whyItMatters:
      "Đọc tin tuyển dụng theo nghĩa đen là lý do phổ biến nhất khiến người ta tự loại mình khỏi những vị trí hoàn toàn phù hợp. Tin tuyển dụng là một thể loại văn bản có quy ước riêng, và biết quy ước đó đổi hẳn số vị trí bạn dám nộp.",
    openingQuestion: "Không đáp ứng đủ mọi yêu cầu trong tin tuyển dụng thì nên làm gì?",
    openingOptions: [
      "Vẫn nộp nếu đáp ứng được phần lớn nhóm yêu cầu cốt lõi",
      "Chỉ nộp khi đáp ứng đủ toàn bộ yêu cầu bắt buộc để tránh mất thời gian của cả hai bên",
      "Nộp kèm thư giải thích lý do vì sao những yêu cầu còn thiếu không quan trọng với vị trí này",
      "Chờ tích lũy thêm kinh nghiệm cho những phần còn thiếu rồi nộp ở đợt tuyển dụng tiếp theo",
    ],
    correctOption: 0,
    explanation:
      "Danh sách yêu cầu trong tin tuyển dụng gần như luôn là mô tả một ứng viên lý tưởng không tồn tại, được gộp lại từ mong muốn của nhiều người: quản lý kỹ thuật, đội đang thiếu người, và bộ phận nhân sự. Rất ít vị trí nhận được ứng viên đủ mọi gạch đầu dòng, và người tuyển biết điều đó. Thứ họ thật sự cần thường nằm ở hai ba dòng đầu và ở phần mô tả công việc hằng ngày, còn phần cuối danh sách hay là những thứ có thì tốt. Tự loại mình vì thiếu hai dòng cuối là bỏ qua một vị trí mà lẽ ra bạn đã cạnh tranh được.",
    diagram: [
      { label: "Đọc phần mô tả công việc trước, không đọc yêu cầu trước", arrow: true },
      { label: "Tách nhóm cốt lõi khỏi nhóm có thì tốt", arrow: true },
      { label: "Đối chiếu nhóm cốt lõi với thứ bạn chứng minh được", arrow: true },
      { label: "Đủ phần lớn nhóm cốt lõi thì nộp" },
    ],
    realWorldExample: {
      company: "Hai người đọc cùng một tin",
      description:
        "Tin ghi mười một yêu cầu. Một bạn đối chiếu đủ mười một, thấy thiếu ba, và không nộp. Một bạn khác thấy phần mô tả công việc nói về dựng API và làm việc với dữ liệu - đúng thứ mình đã làm - nên nộp dù cũng thiếu ba dòng ấy. Bạn thứ hai được gọi, và ở buổi phỏng vấn thì hai trong ba thứ thiếu không hề được nhắc tới.",
    },
    quiz: [
      {
        question: "Phần nào trong tin tuyển dụng cho biết công việc thật sự là gì?",
        options: [
          "Phần mô tả công việc hằng ngày, không phải danh sách yêu cầu",
          "Danh sách công nghệ được liệt kê vì đó là thứ bạn sẽ dùng trong phần lớn thời gian làm việc",
          "Phần giới thiệu về công ty vì nó cho biết sản phẩm và định hướng phát triển sắp tới",
          "Phần quyền lợi và phúc lợi vì mức đầu tư cho vị trí phản ánh tầm quan trọng của công việc",
        ],
        correct: 0,
        explanation:
          "Danh sách yêu cầu mô tả một người, còn phần mô tả công việc mô tả một việc - và bạn đang chọn việc. Đây cũng là phần khó viết cho có lệ nhất, nên nó thường trung thực hơn: một tin có phần mô tả công việc mơ hồ thường phản ánh một vị trí mà chính công ty cũng chưa xác định rõ.",
      },
      {
        question: "Tin ghi tuyển một vị trí nhưng liệt kê cả giao diện, hệ thống và triển khai thì gợi ý gì?",
        options: [
          "Đội có thể đang ít người, nên một người phải kiêm nhiều mảng",
          "Công ty đang tìm ứng viên có nền tảng rộng để phát triển thành vị trí quản lý kỹ thuật sau này",
          "Đây là cách viết chuẩn của các tin tuyển dụng nhằm thu hút được nhiều ứng viên hơn",
          "Vị trí này sẽ được phân công cụ thể vào một mảng sau khi ứng viên hoàn thành thử việc",
        ],
        correct: 0,
        explanation:
          "Đây không phải điều xấu và với nhiều người còn là điều tốt, vì kiêm nhiều mảng là cách học nhanh. Nhưng nó là một thông tin, và nó dẫn tới một câu đáng hỏi ở buổi phỏng vấn: đội hiện có bao nhiêu người, và người vào vị trí này sẽ chịu trách nhiệm chính ở mảng nào.",
      },
      {
        question: "Tin không ghi khoảng lương thường nên hiểu thế nào?",
        options: [
          "Là chuyện phổ biến ở Việt Nam; hỏi khoảng lương sớm là hợp lệ",
          "Là dấu hiệu mức lương thấp hơn mặt bằng nên công ty tránh công bố công khai trên tin tuyển",
          "Là công ty muốn ứng viên đưa ra con số trước để có lợi thế trong quá trình thương lượng",
          "Là mức lương sẽ được quyết định hoàn toàn dựa trên kết quả các vòng phỏng vấn kỹ thuật",
        ],
        correct: 0,
        explanation:
          "Suy diễn từ việc thiếu thông tin này gần như luôn sai vì phần lớn tin ở Việt Nam đều không ghi. Điều nằm trong tầm tay bạn là hỏi khoảng lương ở buổi trao đổi đầu tiên, trước khi bỏ ra nhiều buổi cho các vòng sau. Đây là câu hỏi bình thường và trả lời được ngay.",
      },
      {
        question: "Yêu cầu số năm kinh nghiệm nên được đọc thế nào?",
        options: [
          "Là ước lượng thô về mức độ tự chủ mong đợi, không phải ngưỡng cứng",
          "Là ngưỡng bắt buộc mà bộ phận nhân sự dùng để lọc hồ sơ trước khi chuyển cho đội kỹ thuật",
          "Là căn cứ để xác định mức lương khởi điểm nên khai đúng số năm là quan trọng nhất",
          "Là yêu cầu tối thiểu theo cấp bậc mà công ty áp dụng thống nhất cho mọi vị trí kỹ thuật",
        ],
        correct: 0,
        explanation:
          "Thứ người tuyển thật sự muốn biết là bạn có tự làm được một việc từ đầu tới cuối mà không cần cầm tay hay không. Số năm là cách viết tắt cho điều đó, và nó là cách viết tắt tệ - hai người cùng ba năm có thể ở hai mức rất khác nhau. Bằng chứng cụ thể luôn thắng con số năm.",
      },
      {
        question: "Dấu hiệu nào trong tin tuyển dụng đáng để hỏi thêm trước khi nộp?",
        options: [
          "Mô tả công việc chung chung tới mức không suy ra được một ngày làm việc trông thế nào",
          "Danh sách yêu cầu dài hơn mười gạch đầu dòng vì điều đó cho thấy kỳ vọng không thực tế",
          "Tin được đăng lại nhiều lần trong vài tháng vì điều đó cho thấy vị trí khó tuyển được người",
          "Phần giới thiệu công ty dài hơn phần mô tả công việc vì công ty đang tập trung quảng bá",
        ],
        correct: 0,
        explanation:
          "Danh sách dài và tin đăng lại đều có những lý do vô hại. Nhưng một mô tả công việc không cho hình dung nổi một ngày làm việc thì thường phản ánh một vị trí chưa được xác định rõ ở chính nơi tuyển, và đó là thứ bạn sẽ sống cùng chứ không phải một chi tiết trên trang tin.",
      },
    ],
    practicePrompt: {
      question:
        "Một tin có mười yêu cầu, bạn đáp ứng bảy và thiếu ba, trong đó có một thứ nằm ngay dòng đầu. Nên làm gì?",
      options: [
        "Nộp, và chuẩn bị sẵn cách nói về thứ thiếu ở dòng đầu",
        "Không nộp vì thiếu yêu cầu ở dòng đầu tiên nghĩa là thiếu đúng thứ quan trọng nhất của vị trí",
        "Nộp mà không nhắc gì tới ba thứ còn thiếu để hồ sơ tập trung vào bảy thứ bạn đã đáp ứng được",
        "Dành vài tuần học thứ thiếu ở dòng đầu rồi mới nộp để hồ sơ không có điểm yếu rõ ràng nào",
      ],
      correct: 0,
      explanation:
        "Bảy trên mười là tỷ lệ tốt hơn phần lớn hồ sơ mà vị trí đó nhận được. Thứ thiếu ở dòng đầu đúng là đáng chú ý, nhưng cách xử lý là chuẩn bị một câu trả lời trung thực - bạn đã làm thứ gần nhất với nó là gì, và bạn học thứ mới nhanh ra sao - chứ không phải rút lui hay giấu đi.",
    },
    keyTakeaways: [
      "Danh sách yêu cầu mô tả một người lý tưởng không tồn tại",
      "Phần mô tả công việc trung thực hơn phần yêu cầu, và bạn đang chọn việc",
      "Số năm kinh nghiệm là cách viết tắt tệ cho mức độ tự chủ",
      "Tự loại mình vì vài dòng cuối là cách phổ biến nhất để bỏ lỡ vị trí phù hợp",
    ],
    summary: {
      keyIdea: "Tin tuyển dụng là một thể loại có quy ước riêng; đọc nó theo nghĩa đen khiến bạn nộp ít hơn hẳn số vị trí mà bạn có cửa.",
    },
    application: {
      message: "Lấy một tin bạn từng thấy mình không đủ điều kiện, tách yêu cầu thành hai nhóm cốt lõi và có thì tốt, rồi đếm lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Một tin tuyển dụng được viết bởi vài người khác nhau với vài mục đích khác nhau, rồi ghép lại thành một văn bản trông như một danh sách điều kiện. Đọc nó như danh sách điều kiện là hiểu sai thể loại.",
      },
      {
        type: "heading",
        text: "Ba phần với ba mức độ thật khác nhau",
      },
      {
        type: "paragraph",
        text: "Phần mô tả công việc thường thật nhất, vì nó khó viết cho có lệ. Phần yêu cầu là hỗn hợp giữa thứ cần thật và thứ có thì tốt, xếp lẫn vào nhau mà không đánh dấu. Phần giới thiệu công ty và phúc lợi gần như luôn là văn quảng cáo, và không nên rút ra kết luận gì từ đó ngoài những khoản được nêu bằng con số.",
      },
      {
        type: "conceptTable",
        title: "Cách đọc theo thứ tự",
        concepts: [
          {
            vi: "Mô tả công việc trước",
            en: "Responsibilities first",
            def: "Đây là thứ bạn sẽ làm mỗi ngày. Không hình dung nổi một ngày thì đó là tín hiệu.",
          },
          {
            vi: "Tách yêu cầu làm hai nhóm",
            en: "Split the list",
            def: "Nhóm cốt lõi thường nằm ở đầu và lặp lại trong phần mô tả. Nhóm cuối hay là có thì tốt.",
          },
          {
            vi: "Đối chiếu bằng bằng chứng",
            en: "Match with proof",
            def: "Với mỗi mục cốt lõi, bạn chỉ ra được thứ gì. Không có bằng chứng thì mục đó coi như thiếu.",
          },
          {
            vi: "Hỏi khoảng lương sớm",
            en: "Ask early",
            def: "Trước khi bỏ ra nhiều buổi cho các vòng. Câu hỏi bình thường và trả lời được ngay.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đủ phần lớn nhóm cốt lõi là đủ để nộp",
        text: "Chi phí của một hồ sơ bị loại gần như bằng không, còn chi phí của việc không nộp vào một vị trí phù hợp thì không thấy được và vì thế không ai tính. Sự bất đối xứng đó nghiêng hẳn về phía nộp. Người tuyển sẽ tự quyết định phần thiếu có quan trọng không - đó là việc của họ, không phải việc bạn quyết hộ.",
      },
      {
        type: "closing",
        lines: [
          "Tin tuyển dụng mô tả người lý tưởng; quy trình tuyển dụng thì chọn người tốt nhất trong số đã nộp.",
          "Bài sau: gộp cả chặng lại thành một kế hoạch cho lần ứng tuyển đầu tiên.",
        ],
      },
    ],
  },
  {
    id: 339,
    slug: "ke-hoach-ung-tuyen-dau-tien",
    title: "Chặng 14, Bài 10: Tổng kết - kế hoạch cho lần ứng tuyển đầu tiên",
    subtitle: "Gộp chín bài trước thành một việc làm được trong hai tuần",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    whyItMatters:
      "Biết từng phần mà không có thứ tự thì vẫn không bắt đầu được. Bài này xếp mọi thứ đã học thành một chuỗi việc có thể làm ngay, và chỉ ra chỗ nào tốn công mà ít tác dụng.",
    openingQuestion: "Việc nào nên làm đầu tiên khi bắt đầu tìm việc?",
    openingOptions: [
      "Đọc kỹ vài tin tuyển dụng cho vị trí bạn nhắm tới",
      "Cập nhật lại toàn bộ hồ sơ và các kho mã trên GitHub cho thật hoàn chỉnh trước khi nộp đi đâu",
      "Luyện thuật toán mỗi ngày trong vài tuần để sẵn sàng cho vòng phỏng vấn kỹ thuật đầu tiên",
      "Học thêm một công nghệ đang được nhiều nơi tuyển để hồ sơ cạnh tranh hơn với ứng viên khác",
    ],
    correctOption: 0,
    explanation:
      "Ba việc còn lại đều hữu ích nhưng đều là chuẩn bị mù nếu chưa biết thị trường đang cần gì cho đúng vị trí bạn nhắm. Đọc vài tin tuyển dụng mất một buổi tối và nó quyết định ba việc kia: kho mã nào đáng đầu tư, vòng nào cần ôn kỹ, và công nghệ nào thật sự xuất hiện lặp lại chứ không phải chỉ nổi trên mạng. Bắt đầu bằng việc đọc cũng làm lộ ra rằng bạn đã đủ điều kiện nộp cho một số vị trí ngay bây giờ, và mỗi tuần chuẩn bị thêm là một tuần không có hồ sơ nào đang chạy.",
    diagram: [
      { label: "Đọc 5-10 tin tuyển dụng, gạch thứ lặp lại", arrow: true },
      { label: "Sửa hồ sơ và ghim 2 kho mã theo thứ đã gạch", arrow: true },
      { label: "Nộp song song nhiều nơi, giữ một bảng theo dõi", arrow: true },
      { label: "Ôn theo vòng đã được hẹn, không ôn dàn trải" },
    ],
    realWorldExample: {
      company: "Hai cách bắt đầu",
      description:
        "Một bạn dành sáu tuần hoàn thiện hồ sơ và luyện thuật toán trước khi nộp nơi đầu tiên, rồi phát hiện phần lớn vị trí mình nhắm tới không có vòng thuật toán mà hỏi rất kỹ về dựng API. Một bạn khác nộp mười nơi ngay tuần đầu với hồ sơ chưa hoàn hảo, và sau ba buổi phỏng vấn đã biết chính xác mình yếu ở đâu. Sáu tuần sau, người thứ hai đang thương lượng lời mời.",
    },
    quiz: [
      {
        question: "Vì sao nên nộp song song nhiều nơi thay vì lần lượt từng nơi?",
        options: [
          "Vì lời mời cùng lúc cho bạn thứ để so, và vì im lặng là chuyện thường gặp",
          "Vì các công ty thường trao đổi thông tin với nhau nên nộp lần lượt sẽ bị đánh giá là thiếu quyết tâm",
          "Vì nộp nhiều nơi giúp hồ sơ của bạn được các hệ thống tuyển dụng xếp hạng cao hơn",
          "Vì tỷ lệ được gọi phỏng vấn tăng lên theo cấp số nhân khi số hồ sơ đang chạy tăng lên",
        ],
        correct: 0,
        explanation:
          "Hai lý do và cả hai đều thực tế. Không có lời mời thứ hai thì mọi cuộc thương lượng đều diễn ra ở thế bạn không có lựa chọn nào khác. Và vì nhiều nơi không hồi âm hoặc hồi âm rất chậm, nộp lần lượt biến quá trình vài tuần thành vài tháng mà không tăng thêm cơ hội nào.",
      },
      {
        question: "Sau mỗi buổi phỏng vấn nên làm gì ngay?",
        options: [
          "Ghi lại các câu đã được hỏi và chỗ mình trả lời chưa tốt",
          "Gửi thư cảm ơn tới người phỏng vấn để tạo ấn tượng tốt trước khi họ đưa ra quyết định cuối",
          "Ôn lại ngay những phần kiến thức đã bị hỏi để chuẩn bị cho vòng tiếp theo của chính nơi đó",
          "Đánh giá lại mức lương mong muốn dựa trên những thông tin thu được trong buổi phỏng vấn",
        ],
        correct: 0,
        explanation:
          "Trí nhớ về một buổi phỏng vấn mờ đi rất nhanh, và các nơi khác hỏi những câu trùng nhau nhiều hơn ta tưởng. Mười lăm phút ghi lại ngay sau buổi đầu tiên là thứ giúp buổi thứ ba trôi chảy - đây là việc có tỷ lệ đổi công sức lấy kết quả cao nhất trong cả quá trình.",
      },
      {
        question: "Bị từ chối ở vài nơi liên tiếp thì nên xử lý thế nào?",
        options: [
          "Xem lại chúng bị dừng ở vòng nào, vì mỗi vòng chỉ ra một vấn đề khác nhau",
          "Hạ mức lương mong muốn xuống để tăng khả năng được nhận ở những nơi tiếp theo",
          "Nộp thêm thật nhiều nơi nữa vì tuyển dụng là quá trình có yếu tố may rủi rất lớn",
          "Dừng lại vài tuần để bổ sung kỹ năng rồi mới quay lại tìm việc với hồ sơ tốt hơn",
        ],
        correct: 0,
        explanation:
          "Bị loại ở vòng hồ sơ, ở vòng kỹ thuật, hay ở vòng cuối là ba vấn đề hoàn toàn khác nhau và cần ba cách xử lý khác nhau. Gộp chúng lại thành cảm giác chung không dẫn tới hành động nào cụ thể. Chỉ cần biết mình dừng ở đâu là biết nên sửa gì.",
      },
      {
        question: "Nhận được lời mời đầu tiên thì việc cần làm trước khi trả lời là gì?",
        options: [
          "Đọc kỹ toàn bộ văn bản, gồm cả phần điều khoản ràng buộc ở cuối",
          "So mức lương với báo cáo thị trường để biết chắc con số được đề nghị có hợp lý hay không",
          "Thông báo cho các nơi khác đang trong quy trình để họ đẩy nhanh tiến độ xét duyệt hồ sơ",
          "Xác nhận lại với quản lý trực tiếp về phạm vi công việc và định hướng phát triển của vị trí",
        ],
        correct: 0,
        explanation:
          "Ba việc kia đều nên làm, nhưng chúng đều xoay quanh con số lương. Phần cuối văn bản - cam kết đào tạo, thưởng có điều kiện hoàn lại, lịch vesting - chứa những điều khoản có sức ràng buộc lớn nhất và là phần duy nhất mà sau khi ký thì không còn sửa được nữa.",
      },
      {
        question: "Điều gì đáng theo dõi nhất trong suốt quá trình tìm việc?",
        options: [
          "Số hồ sơ đang chạy và vòng mà mỗi hồ sơ đang dừng lại",
          "Số giờ đã dành cho việc luyện tập và ôn thi để đảm bảo tiến độ chuẩn bị được duy trì đều",
          "Mức lương cao nhất được đề nghị cho tới thời điểm hiện tại để làm mốc cho các cuộc thương lượng",
          "Số lượng công nghệ mới bạn đã học được trong thời gian tìm việc để bổ sung vào hồ sơ",
        ],
        correct: 0,
        explanation:
          "Đây là hai con số nói cho bạn biết nên làm gì tiếp theo. Ít hồ sơ đang chạy thì việc cần làm là nộp thêm; nhiều hồ sơ dừng ở cùng một vòng thì việc cần làm là sửa đúng vòng đó. Mọi thứ khác đều là đầu vào, còn hai con số này là thứ duy nhất chỉ ra hành động.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn có hai tuần trước khi muốn bắt đầu nộp hồ sơ nghiêm túc. Phân bổ thế nào là hợp lý nhất?",
      options: [
        "Một buổi đọc tin tuyển dụng, hai buổi sửa hồ sơ, rồi nộp và ôn theo lịch được hẹn",
        "Hai tuần luyện thuật toán liên tục vì đây là phần khó nhất và cần nhiều thời gian nhất để tiến bộ",
        "Một tuần hoàn thiện các kho mã trên GitHub và một tuần viết lại hồ sơ cho thật chỉn chu",
        "Chia đều cho bốn việc: đọc tin, sửa hồ sơ, luyện thuật toán và ôn thiết kế hệ thống",
      ],
      correct: 0,
      explanation:
        "Ba phương án kia đều là chuẩn bị trước khi biết cần chuẩn bị gì, và cả ba đều đẩy ngày nộp đầu tiên lùi lại ít nhất một tuần. Ôn theo lịch đã được hẹn hiệu quả hơn hẳn ôn dàn trải, vì lúc đó bạn biết chính xác vòng nào và ở đâu - còn hồ sơ thì luôn có thể sửa tiếp trong lúc đang chạy.",
    },
    keyTakeaways: [
      "Đọc tin tuyển dụng trước, vì nó quyết định mọi việc chuẩn bị còn lại",
      "Nộp song song: lời mời cùng lúc là thứ duy nhất tạo ra sức thương lượng",
      "Ghi lại câu hỏi ngay sau mỗi buổi - việc rẻ nhất với tác dụng lớn nhất",
      "Bị loại ở vòng nào chỉ ra vấn đề gì; đừng gộp chúng thành một cảm giác chung",
    ],
    summary: {
      keyIdea: "Tìm việc là một quy trình có thứ tự, và phần lớn thời gian bị mất nằm ở việc chuẩn bị cho những thứ chưa biết có cần hay không.",
    },
    application: {
      message: "Mở một bảng ba cột - nơi nộp, ngày nộp, vòng hiện tại - và điền dòng đầu tiên trong tuần này.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước mỗi bài giải một mảnh. Bài này xếp chúng lại theo thứ tự thời gian, vì thứ tự chính là phần mà biết từng mảnh riêng lẻ không cho được.",
      },
      {
        type: "heading",
        text: "Chuẩn bị vừa đủ để bắt đầu, rồi sửa trong lúc chạy",
      },
      {
        type: "paragraph",
        text: "Sai lầm phổ biến nhất không phải chuẩn bị sơ sài mà là chuẩn bị quá lâu trước khi có thông tin. Mỗi tuần hoàn thiện hồ sơ trong im lặng là một tuần không biết thị trường phản ứng ra sao với hồ sơ đó. Ba buổi phỏng vấn dạy nhiều hơn ba tuần tự ôn, và cách duy nhất để có ba buổi phỏng vấn là nộp trước khi thấy mình sẵn sàng.",
      },
      {
        type: "conceptTable",
        title: "Bốn việc theo thứ tự",
        concepts: [
          {
            vi: "Đọc thị trường",
            en: "Read the market",
            def: "Năm tới mười tin cho đúng vị trí bạn nhắm. Gạch thứ lặp lại; đó là nhóm cốt lõi thật.",
          },
          {
            vi: "Sửa hồ sơ theo thứ đã gạch",
            en: "Target the resume",
            def: "Hai kho mã được ghim, mỗi kho một README chạy được. Đủ để bắt đầu, không cần hoàn hảo.",
          },
          {
            vi: "Nộp song song",
            en: "Apply in parallel",
            def: "Nhiều nơi cùng lúc, một bảng theo dõi. Lời mời cùng lúc là thứ duy nhất tạo sức thương lượng.",
          },
          {
            vi: "Ôn theo lịch đã hẹn",
            en: "Prepare per round",
            def: "Biết vòng nào rồi mới ôn vòng đó. Ghi lại câu hỏi ngay sau mỗi buổi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Hai con số duy nhất đáng theo dõi",
        text: "Số hồ sơ đang chạy, và vòng mà mỗi hồ sơ đang dừng. Con số thứ nhất ít thì việc cần làm là nộp thêm chứ không phải ôn thêm. Con số thứ hai dồn ở một vòng thì việc cần làm là sửa đúng vòng đó. Mọi thứ khác - số giờ đã ôn, số công nghệ đã học - đều dễ đo và không chỉ ra hành động nào.",
      },
      {
        type: "closing",
        lines: [
          "Chặng này không làm bạn giỏi hơn về kỹ thuật; nó chỉ đảm bảo phần kỹ thuật bạn có được nhìn thấy.",
          "Thị trường IT Việt Nam nhỏ hơn cảm giác lúc đang tìm việc, nên cách bạn đi qua quy trình này cũng là thứ ở lại.",
        ],
      },
    ],
  },
];
