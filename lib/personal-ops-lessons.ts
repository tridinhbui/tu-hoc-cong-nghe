import type { Lesson } from "./lesson-types";

// Chặng 21 của track cá nhân: công cụ và vận hành.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI, VÀ VÌ SAO NÓ ĐỨNG CUỐI. Hai mươi chặng trước là
// kiến thức. Chặng này là thứ biến kiến thức thành một hệ thống chạy được mà
// không cần nhớ - vì thất bại phổ biến nhất trong tài chính cá nhân không phải
// hiểu sai, mà là hiểu đúng rồi không duy trì được.
//
// Ids 400-403 nối tiếp Chặng 20 (390-393).

export const PERSONAL_OPS_LESSONS: Lesson[] = [
  {
    id: 400,
    slug: "he-thong-toi-thieu-can-co",
    title: "Chặng 21, Bài 1: Bộ công cụ tối thiểu cần có",
    subtitle: "Bốn công cụ và một tệp ghi chú - ít hơn thì không đủ, nhiều hơn thì không duy trì được",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    whyItMatters:
      "Phần lớn bộ công cụ thất bại không phải vì thiếu tính năng mà vì quá nhiều bước. Một cấu hình bạn bỏ sau ba tuần thì tệ hơn một cấu hình thô mà bạn dùng được nhiều năm.",
    openingQuestion: "Điều gì quyết định một bộ công cụ làm việc có hiệu quả không?",
    openingOptions: [
      "Mức độ chi tiết của cấu hình và số phím tắt bạn tự đặt ra",
      "Việc bạn có duy trì được nó sau vài tháng hay không",
      "Số lượng extension và công cụ hỗ trợ đang cài trong máy",
      "Tần suất bạn chỉnh lại cấu hình mỗi tuần cho gọn hơn",
    ],
    correctOption: 1,
    explanation:
      "Một cấu hình hoàn hảo mà bạn bỏ sau ba tuần cho ra ba tuần quen tay. Một bộ công cụ thô mà bạn dùng năm năm cho ra năm năm phản xạ, và quan trọng hơn, năm năm công việc chạy qua nó. Đây là lý do tiêu chí thiết kế duy nhất đáng quan tâm là khả năng duy trì - và nó thường có nghĩa là ít bước hơn, ít thứ phải nhớ hơn, ít thứ hỏng khi bạn đổi máy hơn.",
    diagram: [
      { label: "Cấu hình sâu bị bỏ sau ba tuần", arrow: true },
      { label: "Bộ công cụ thô dùng được nhiều năm", arrow: true },
      { label: "Cái thứ hai luôn thắng", arrow: true },
      { label: "Nên tiêu chí thiết kế là: ít bước nhất có thể" },
    ],
    realWorldExample: {
      company: "Cấu hình năm trăm dòng và một tệp ghi chú",
      description:
        "Một người dựng cấu hình trình soạn thảo năm trăm dòng với ba mươi extension và bộ phím tắt riêng. Sáu tuần sau anh ta đổi máy, cấu hình không chạy được, và anh ta quay về mặc định. Một người khác chỉ dùng trình soạn thảo mặc định cộng một tệp ghi chú duy nhất, và làm vậy suốt bốn năm. Người thứ hai gõ chậm hơn vài phần trăm nhưng chưa bao giờ mất một buổi để dựng lại môi trường.",
    },
    quiz: [
      {
        question: "Vì sao tách môi trường phát triển khỏi môi trường thật lại hiệu quả?",
        options: [
          "Vì nó biến ranh giới giữa thử nghiệm và dữ liệu thật thành ranh giới vật lý",
          "Vì máy chủ chạy nhanh hơn khi mỗi môi trường được cấp tài nguyên riêng biệt",
          "Vì mỗi môi trường khi đó được nhà cung cấp sao lưu riêng theo lịch mặc định",
          "Vì nó làm giảm tổng chi phí hạ tầng so với việc dùng chung một môi trường",
        ],
        correct: 0,
        explanation:
          "Khi thử nghiệm và dữ liệu thật nằm chung một chỗ, ranh giới giữa chúng chỉ tồn tại trong ý định - và ý định thì hỏng vào lúc bạn mệt. Tách ra thành hai môi trường biến ranh giới ấy thành một hành động cụ thể phải làm mới vượt qua được.",
      },
      {
        question: "Bốn thứ tối thiểu trong bộ công cụ là gì?",
        options: [
          "Trình soạn thảo, dòng lệnh, quản lý phiên bản, và một tệp ghi chú",
          "Một trình soạn thảo đã cài sẵn ba mươi extension cho mọi ngôn ngữ",
          "Một IDE trả phí, một trình gỡ lỗi, và hai công cụ theo dõi lỗi",
          "Bốn ngôn ngữ lập trình thuộc bốn nhóm khác nhau để luôn linh hoạt",
        ],
        correct: 0,
        explanation:
          "Ba thứ đầu là nơi bạn viết, chạy và quay lại được. Thứ tư là nơi giữ những gì bạn học được, vì thứ không ghi lại thì tháng sau phải tra lại từ đầu. Nhiều hơn thì tốt nếu duy trì được, nhưng đây là mức không nên xuống thấp hơn.",
      },
      {
        question: "Vì sao quản lý phiên bản là thứ quan trọng nhất trong bốn?",
        options: [
          "Vì nó gom mọi thay đổi vào một dòng lịch sử quay lại được",
          "Vì đây là công cụ duy nhất mà nhà tuyển dụng hỏi tới trong buổi phỏng vấn",
          "Vì nó không bị ảnh hưởng khi bạn đổi máy hoặc đổi hẳn hệ điều hành",
          "Vì nó chỉ ra chính xác đoạn mã nào đang gây ra lỗi trên môi trường thật",
        ],
        correct: 0,
        explanation:
          "Ba công cụ kia giúp bạn làm việc hôm nay; công cụ này giữ lại mọi việc bạn đã làm và cho phép hoàn tác. Viết sai mà quay lại được thì chỉ mất vài phút, còn viết sai mà không quay lại được thì mất cả buổi.",
      },
      {
        question: "Sai lầm phổ biến khi dựng bộ công cụ là gì?",
        options: [
          "Cấu hình quá sâu ngay từ đầu nên bỏ dở trước khi kịp quen tay",
          "Không dùng IDE chuyên dụng mà chỉ dùng một trình soạn thảo đơn giản",
          "Cập nhật phiên bản công cụ quá thường xuyên nên hay gặp phải lỗi mới",
          "Cài quá ít extension nên không tận dụng hết sức mạnh của trình soạn thảo",
        ],
        correct: 0,
        explanation:
          "Đây là sai lầm phổ biến nhất và nó xuất phát từ thiện chí. Bắt đầu thô rồi thêm khi thấy thiếu luôn tốt hơn bắt đầu hoàn hảo rồi bỏ - vì cái thiếu thì bạn biết ngay, còn cái thừa thì phải trả giá âm thầm mỗi lần đổi máy.",
      },
      {
        question: "Nên dành bao nhiêu thời gian chăm bộ công cụ?",
        options: [
          "Đủ ít để bạn chắc chắn duy trì được - thường là mười lăm phút mỗi tháng",
          "Ít nhất hai giờ mỗi tháng để cập nhật đầy đủ mọi extension và cấu hình",
          "Mỗi ngày mười phút để cấu hình luôn theo kịp thói quen mới nhất của bạn",
          "Không cần cố định, chỉ chỉnh lại khi gặp việc mà công cụ hiện tại chưa làm được",
        ],
        correct: 0,
        explanation:
          "Ngưỡng đúng là ngưỡng bạn duy trì được vào tuần bận nhất, không phải tuần rảnh nhất. Thiết kế cho tuần bận thì bộ công cụ sống sót; thiết kế cho tuần rảnh thì nó chết vào tháng thứ ba.",
      },
    ],
    keyTakeaways: [
      "Tiêu chí thiết kế duy nhất đáng quan tâm là khả năng duy trì",
      "Tách môi trường biến ranh giới trong đầu thành ranh giới vật lý",
      "Bốn thứ tối thiểu: trình soạn thảo, dòng lệnh, quản lý phiên bản, tệp ghi chú",
      "Thiết kế cho tuần bận nhất, không phải tuần rảnh nhất",
    ],
    practicePrompt: {
      question:
        "Bạn từng dựng ba bộ cấu hình trình soạn thảo và bỏ cả ba sau vài tuần. Nên làm gì khác?",
      options: [
        "Giảm xuống mức thô nhất còn dùng được: mặc định cộng vài thứ",
        "Thử bộ cấu hình thứ tư có sẵn nhiều tính năng tự động hơn ba bộ trước",
        "Quay lại bộ tốt nhất trong ba cái và cố gắng duy trì thêm một lần nữa",
        "Chuyển hẳn sang một IDE trả phí để khỏi phải tự cấu hình bất cứ thứ gì",
      ],
      correct: 0,
      explanation:
        "Ba lần bỏ dở là dữ liệu, không phải thất bại - nó cho biết mức cấu hình bạn đã thử là quá cao với mình. Đổi công cụ mà giữ nguyên mức cấu hình thì gần như chắc chắn cho ra kết quả thứ tư giống hệt.",
    },
    summary: {
      keyIdea: "Bộ công cụ tốt nhất là bộ bạn còn dùng sau hai năm, không phải bộ đầy đủ nhất",
      commonMistake: "Cấu hình quá sâu ngay từ đầu và bỏ dở trước khi kịp thành phản xạ",
      action: "Rút bộ công cụ của bạn xuống bốn thứ và dùng đúng bốn thứ đó trong một tháng.",
    },
    application: {
      title: "Bốn công cụ, một tệp ghi chú",
      message:
        "Chọn một trình soạn thảo, một shell, một cách quản lý phiên bản, và mở đúng một tệp ghi chú. Ghi vào đó mọi lệnh bạn phải tra lại lần thứ hai.",
      secondary:
        "Nếu bạn duy trì được sáu tuần liên tục, khi đó mới thêm extension. Thêm trước khi có thói quen là cách chắc chắn để mất cả hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai mươi chặng trước là kiến thức. Chặng này về thứ biến kiến thức thành kết quả - và thất bại phổ biến nhất ở đây không phải hiểu sai, mà là hiểu đúng rồi không duy trì được.",
      },
      { type: "heading", text: "Bốn công cụ, một tệp ghi chú" },
      {
        type: "conceptTable",
        title: "Cấu trúc tối thiểu",
        subtitle: "Ít hơn thì bạn phải nhớ thay công cụ; nhiều hơn thì khó duy trì",
        concepts: [
          {
            vi: "Trình soạn thảo",
            en: "Editor",
            def: "Nơi bạn viết mã. Đây là công cụ duy nhất bạn mở gần như liên tục, nên nó phải khởi động nhanh và chạy được trên mọi máy bạn dùng.",
          },
          {
            vi: "Dòng lệnh",
            en: "Shell",
            def: "Nơi bạn chạy mọi thứ. Học đúng mười lệnh trước, vì đó là mười lệnh chiếm phần lớn thời gian gõ của bạn trong nhiều năm.",
          },
          {
            vi: "Quản lý phiên bản",
            en: "Version control",
            def: "Nơi giữ lịch sử. Tách riêng khỏi trí nhớ để quay lại được, và để thấy được mình đã đổi những gì kể từ lần chạy được gần nhất.",
          },
          {
            vi: "Tệp ghi chú",
            en: "Notes",
            def: "Cho những gì bạn phải tra lại lần thứ hai. Một tệp phẳng cũng đủ - điều quan trọng là bạn chắc chắn mở lại được nó sau một năm.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thiết kế cho tuần bận nhất",
        text: "Ai cũng dựng bộ công cụ trong một buổi rảnh và với nhiều động lực - và đó chính là lý do phần lớn cấu hình chết. Câu hỏi đúng không phải tôi có dựng được thứ này không, mà là tôi có dựng lại được nó trong mười phút trên một máy trống không. Nếu câu trả lời là không, hãy cắt bớt cho tới khi nó thành có.",
      },
      {
        type: "closing",
        lines: [
          "Một bộ công cụ thô dùng được nhiều năm thắng một cấu hình hoàn hảo bỏ sau ba tuần.",
          "Bài sau: cách để bộ công cụ chạy mà không cần bạn nhớ tới nó.",
        ],
      },
    ],
  },
  {
    id: 401,
    slug: "tu-dong-hoa-toan-bo-he-thong",
    title: "Chặng 21, Bài 2: Tự động hóa toàn bộ quy trình",
    subtitle: "Quyết định một lần hôm nay, thực hiện hai trăm lần trong mười năm tới",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⚙️",
    track: "personal",
    whyItMatters:
      "Mọi quy tắc chất lượng đều cần được thực hiện lặp đi lặp lại trong nhiều năm, và ý chí là nguồn lực cạn kiệt được. Tự động hóa chuyển gánh nặng từ việc nhớ mỗi lần sang việc thiết lập một lần.",
    openingQuestion: "Vì sao tự động hóa hiệu quả hơn kỷ luật cá nhân?",
    openingOptions: [
      "Vì nó thực hiện quyết định của bạn hàng trăm lần mà không cần bạn nhớ lại lần nào",
      "Vì công cụ tự động phát hiện được nhiều loại lỗi hơn hẳn con người",
      "Vì nó giúp bạn tránh được phần lớn lỗi phát sinh khi làm thủ công",
      "Vì các bước chạy tự động được máy chủ ưu tiên xử lý trước",
    ],
    correctOption: 0,
    explanation:
      "Một quyết định tốt cần được thực hiện một lần; một thói quen tốt cần được thực hiện mỗi lần. Tự động hóa biến loại thứ hai thành loại thứ nhất. Điều này quan trọng vì ý chí không phân bổ đều: hôm có việc gấp, hôm mệt mỏi, hôm sắp tới hạn - và chính những hôm đó là lúc quy tắc bị bỏ. Một hook chạy trước khi đẩy mã không biết hôm nay bạn đang vội, nên nó thực hiện đúng điều bạn đã quyết định lúc đầu óc tỉnh táo nhất. Với một dự án mười năm, đó là hàng nghìn lần quyết định được thực hiện từ một lần thiết lập.",
    diagram: [
      { label: "Quyết định lúc đầu óc tỉnh táo", arrow: true },
      { label: "Thiết lập một lần", arrow: true },
      { label: "Thực hiện hàng trăm lần, không cần nhớ", arrow: true },
      { label: "Kể cả trong những hôm bạn sẽ bỏ nếu làm tay" },
    ],
    realWorldExample: {
      company: "Lần đẩy thứ bảy mươi",
      description:
        "Hai người cùng quyết định chạy kiểm thử trước khi đẩy mã. Người thứ nhất nhớ chạy bằng tay mỗi lần. Người thứ hai đặt một hook chạy tự động trước khi đẩy. Sáu mươi lần đầu cả hai đều làm được. Lần thứ bảy mươi có một bản vá gấp lúc nửa đêm - người thứ nhất bỏ qua lần đó rồi bỏ luôn lần thứ bảy mươi mốt, còn người thứ hai thì không có gì để bỏ.",
    },
    quiz: [
      {
        question: "Thứ tự đúng của một quy trình tự động là gì?",
        options: [
          "Viết xong, chạy kiểm tra tự động trước, rồi mới đẩy phần đã qua được",
          "Viết xong, đẩy lên trước, tới cuối tuần mới dọn hết những chỗ còn nợ lại",
          "Viết xong, chia đều thời gian cho mọi việc, rồi điều chỉnh lại vào cuối kỳ",
          "Viết xong, giữ ở máy mình, chỉ đẩy khi đã tích đủ một lượng thay đổi lớn",
        ],
        correct: 0,
        explanation:
          "Dọn nợ vào cuối tuần nghe hợp lý nhưng phần thời gian còn lại gần như luôn nhỏ hơn dự tính, vì việc gấp có xu hướng lấp đầy khoảng trống có sẵn. Đảo thứ tự lại làm chất lượng thành phần cố định và phạm vi thành phần điều chỉnh.",
      },
      {
        question: "Việc nào KHÔNG nên tự động hóa?",
        options: [
          "Quyết định kiến trúc lớn và việc rà soát định kỳ toàn bộ hệ thống",
          "Chạy bộ kiểm thử trước mỗi lần đẩy mã theo một cấu hình đã định trước",
          "Định dạng lại mã theo đúng quy ước chung của cả nhóm khi lưu tệp",
          "Dựng và triển khai bản mới mỗi khi nhánh chính có thay đổi",
        ],
        correct: 0,
        explanation:
          "Tự động hóa hợp với việc lặp lại giống nhau. Việc đòi hỏi phán đoán - có nên tách dịch vụ này không, phần nào cần viết lại - thì cần một người ngồi xuống suy nghĩ, và bài sau nói về buổi đó.",
      },
      {
        question: "Vì sao chạy kiểm tra ngay lúc commit lại quan trọng?",
        options: [
          "Vì lỗi chưa kịp trở thành một phần của thứ bạn coi là đã làm xong",
          "Vì máy chủ tích hợp chỉ nhận được thay đổi vào một số khung giờ cố định",
          "Vì bộ kiểm thử chạy nhanh hơn hẳn khi số dòng thay đổi trong lần chạy còn ít",
          "Vì phần lớn lỗi nghiêm trọng thường xuất hiện vào cuối chu kỳ phát triển",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa lúc viết và lúc phát hiện càng dài thì đoạn mã ấy càng lâu nằm trong đầu bạn như một việc đã xong - và mọi thứ đã được coi là xong đều khó mở ra sửa lại hơn.",
      },
      {
        question: "Rủi ro của một quy trình tự động là gì?",
        options: [
          "Nó chạy tiếp cả khi hoàn cảnh đã đổi, nếu không ai rà soát định kỳ",
          "Nó có thể bỏ sót thay đổi nếu máy chủ tích hợp gặp sự cố kỹ thuật",
          "Nó làm người viết mã mất dần khả năng tự kiểm tra công việc của mình",
          "Nó khiến các bước đã chạy không được ghi lại vào lịch sử của dự án",
        ],
        correct: 0,
        explanation:
          "Đây chính là lý do bài sau về buổi rà soát tồn tại. Ưu điểm lớn nhất của tự động hóa - chạy mà không cần ai để ý - cũng là nhược điểm của nó khi dự án, nhóm hay yêu cầu đã thay đổi.",
      },
      {
        question: "Nên xử lý thế nào khi dự án lớn lên?",
        options: [
          "Nâng mức kiểm tra tự động ngay, trước khi phần thêm kịp hòa vào nợ kỹ thuật",
          "Giữ nguyên mức cũ và dùng toàn bộ phần thời gian tăng thêm để làm tính năng",
          "Chờ vài tháng để chắc chắn quy mô mới đã ổn định rồi mới điều chỉnh",
          "Tách phần mới sang một kho riêng và quyết định cách kiểm tra sau",
        ],
        correct: 0,
        explanation:
          "Có một cửa sổ ngắn ngay khi dự án vừa lớn thêm, lúc chưa ai kịp quen với mức cẩu thả mới. Chờ vài tháng nghe thận trọng nhưng nó để nợ kỹ thuật dâng lên trước - và sau đó việc thêm một bước kiểm tra trở thành một khoản cắt giảm.",
      },
    ],
    keyTakeaways: [
      "Tự động hóa biến một thói quen cần duy trì thành một quyết định thực hiện một lần",
      "Thứ tự đúng: kiểm tra trước, đẩy phần đã qua được",
      "Chạy kiểm tra ngay lúc commit, trước khi lỗi thành thứ bạn coi là đã xong",
      "Việc cần phán đoán thì không tự động hóa - nó thuộc về buổi rà soát",
    ],
    practicePrompt: {
      question:
        "Bạn định chạy kiểm thử trước mỗi lần đẩy nhưng thường quên lúc gấp. Sửa thế nào?",
      options: [
        "Đặt hook chạy tự động trước khi đẩy, và để nó chặn",
        "Đặt nhắc nhở cuối ngày để không quên chạy lại bộ kiểm thử",
        "Giảm bộ kiểm thử xuống mức mà lần nào bạn cũng kịp chạy tay",
        "Ghi lại các lần quên để biết mình hay bỏ sót vào lúc nào",
      ],
      correct: 0,
      explanation:
        "Vấn đề không nằm ở trí nhớ mà ở thứ tự - chạy khi còn nhớ nghĩa là chất lượng phụ thuộc vào hôm đó bạn có vội hay không, và những hôm vội mới đúng là lúc dễ sai nhất. Đặt hook xử lý gốc của vấn đề chứ không xử lý triệu chứng.",
    },
    summary: {
      keyIdea: "Tự động hóa chuyển gánh nặng từ việc nhớ mỗi lần sang việc thiết lập một lần",
      commonMistake: "Để việc dọn dẹp cho phần thời gian còn lại - phần còn lại luôn co lại vừa bằng chỗ trống",
      action: "Đặt một hook chạy kiểm tra tự động trước mỗi lần đẩy mã.",
    },
    application: {
      title: "Một buổi thiết lập, nhiều năm chạy",
      message:
        "Đặt tự động cho từng lớp: định dạng lúc lưu, kiểm thử lúc commit, dựng và triển khai khi nhánh chính đổi. Sau đó làm việc bằng đúng những gì còn lại sau khi các bước ấy đã qua.",
      secondary:
        "Đặt thêm một nhắc nhở hằng năm để xem lại các bước này. Thứ chạy mà không ai để ý cũng là thứ chạy tiếp khi hoàn cảnh đã đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói bộ công cụ phải đủ đơn giản để duy trì. Bài này đi xa hơn một bước: phần lớn quy trình không cần được duy trì nếu nó được thiết lập để tự chạy.",
      },
      { type: "heading", text: "Đảo thứ tự là toàn bộ vấn đề" },
      {
        type: "paragraph",
        text: "Cách mặc định là làm tính năng trước rồi dọn dẹp bằng phần thời gian dư. Cách này thất bại một cách rất đều đặn, vì phần dư không phải một khoảng cố định mà là chỗ trống còn lại - và việc gấp có xu hướng lấp đầy đúng chỗ trống ấy. Đảo lại: để các bước kiểm tra chạy tự động ngay khi bạn commit, rồi làm tiếp bằng những gì đã qua được. Cùng một con người, cùng một quỹ thời gian, nhưng chất lượng giờ là phần cố định còn phạm vi là phần điều chỉnh.",
      },
      {
        type: "callout",
        label: "Tự động hóa cái lặp lại, giữ lại cái cần phán đoán",
        text: "Định dạng mã, chạy kiểm thử, dựng bản mới, triển khai - đây là những việc giống hệt nhau mỗi lần, nên máy làm tốt hơn người. Còn việc quyết định tách dịch vụ, đổi cấu trúc dữ liệu, hay xem xét có nên tiếp tục một hướng không thì cần một người ngồi xuống nghĩ. Ranh giới giữa hai nhóm này là ranh giới giữa bài này và bài sau.",
      },
      {
        type: "list",
        items: [
          "Chạy kiểm tra lúc commit, không phải lúc mở pull request",
          "Một bước riêng cho từng loại lỗi, để mỗi lần đỏ chỉ ra đúng một chuyện",
          "Mỗi lần dự án lớn thêm, nâng mức kiểm tra ngay trong tuần đó",
          "Đặt một nhắc nhở hằng năm để rà lại toàn bộ các bước đang chạy",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kỷ luật là nguồn lực cạn kiệt được; một hook tự động thì không.",
          "Bài sau: một buổi mỗi năm để làm những việc mà máy không làm được.",
        ],
      },
    ],
  },
  {
    id: 402,
    slug: "buoi-ra-soat-tai-chinh-hang-nam",
    title: "Chặng 21, Bài 3: Buổi rà soát hằng năm",
    subtitle: "Một buổi mỗi năm để làm những việc mà tự động hóa không làm được",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    whyItMatters:
      "Tự động hóa giải quyết việc lặp lại nhưng nó không biết dự án của bạn đã đổi. Một buổi mỗi năm bắt được gần như mọi thứ đã trôi khỏi chỗ đúng, và nó là việc duy nhất trong cả track không thể giao cho máy.",
    openingQuestion: "Vì sao một quy trình tự động vẫn cần được rà soát định kỳ?",
    openingOptions: [
      "Vì các bước tự động sẽ bị máy chủ tích hợp vô hiệu sau một thời gian",
      "Vì nó chạy tiếp theo thiết lập cũ kể cả khi dự án và nhóm đã thay đổi",
      "Vì các công cụ mới xuất hiện liên tục và cần được cập nhật kịp thời",
      "Vì nhà cung cấp yêu cầu khai báo lại cấu hình mỗi năm một lần",
    ],
    correctOption: 1,
    explanation:
      "Ưu điểm lớn nhất của tự động hóa là nó chạy mà không cần ai để ý, và đó cũng chính là điểm yếu của nó. Lưu lượng tăng gấp mười nhưng ngưỡng cảnh báo vẫn ở mức của ba năm trước. Số dịch vụ tăng nhưng bộ kiểm thử vẫn chỉ phủ phần lõi cũ. Một bước dựng cho dịch vụ đã gỡ vẫn chạy mỗi lần, trong khi dịch vụ mới thì chưa có bước nào. Không thay đổi nào trong số này gây ra lỗi hay báo động - hệ thống vẫn hoạt động đúng như đã thiết lập, chỉ là thiết lập ấy không còn đúng với hoàn cảnh. Đó là loại sai lệch chỉ một người ngồi xuống nhìn lại mới phát hiện được.",
    diagram: [
      { label: "Quy trình chạy đúng như đã thiết lập", arrow: true },
      { label: "Nhưng dự án đã đổi", arrow: true },
      { label: "Không có lỗi nào báo, không có gì hỏng", arrow: true },
      { label: "Chỉ một buổi ngồi lại mới thấy" },
    ],
    realWorldExample: {
      company: "Ba năm và một ngưỡng không đổi",
      description:
        "Một nhóm đặt cảnh báo khi độ trễ vượt hai trăm mili giây, lúc đó hệ thống nhận hai mươi nghìn request mỗi ngày. Ba năm sau lưu lượng đã gấp ba mươi lần nhưng ngưỡng vẫn là hai trăm. Cảnh báo chạy hoàn hảo suốt ba năm và không có gì hỏng - chỉ là nó chưa từng kêu một lần nào, vì hệ thống đã chậm hơn ngưỡng ấy từ lâu và không ai nhận ra.",
    },
    quiz: [
      {
        question: "Loại sai lệch nào chỉ buổi rà soát mới phát hiện được?",
        options: [
          "Quy trình vẫn chạy đúng thiết lập cũ trong khi dự án đã thay đổi",
          "Bước dựng bị lỗi do máy chủ tích hợp gặp sự cố kỹ thuật kéo dài",
          "Một bước bị cấu hình trùng nên cùng việc được chạy hai lần mỗi lần đẩy",
          "Chi phí máy chủ tăng lên mà nhà cung cấp không gửi thông báo trước",
        ],
        correct: 0,
        explanation:
          "Ba loại kia đều tạo ra dấu vết bất thường mà bạn có thể nhận ra. Loại đầu tiên thì không có dấu hiệu nào - mọi thứ hoạt động đúng, chỉ là đúng theo một thiết lập đã lỗi thời.",
      },
      {
        question: "Việc nào nên có trong buổi rà soát?",
        options: [
          "Đối chiếu ngưỡng cảnh báo hiện tại với lưu lượng hiện tại",
          "Kiểm tra trạng thái của mọi bước dựng vào đúng ngày rà soát",
          "So sánh tốc độ hệ thống với các sản phẩm cùng loại trên thị trường",
          "Đọc lại toàn bộ nhật ký chạy của mười hai tháng vừa qua",
        ],
        correct: 0,
        explanation:
          "Đây là phép kiểm bắt được sai lệch phổ biến nhất: ngưỡng giữ nguyên trong khi lưu lượng đã tăng. Nó mất một phút và thường là phát hiện có giá trị nhất của cả buổi.",
      },
      {
        question: "Vì sao nên gộp nhiều việc rà soát vào cùng một buổi?",
        options: [
          "Vì chi phí lớn nhất là ngồi xuống mở hết cấu hình ra, còn lại gần như miễn phí",
          "Vì các số liệu vận hành chỉ được tổng hợp đồng thời một lần vào cuối mỗi năm",
          "Vì làm nhiều lần trong năm sẽ khiến bạn đổi cấu hình quá thường xuyên",
          "Vì nhà cung cấp chỉ xuất báo cáo sử dụng vào cuối mỗi năm dương lịch",
        ],
        correct: 0,
        explanation:
          "Khi đã bỏ công mở hết cấu hình, bảng điều khiển và tài liệu ra, việc kiểm thêm ba bốn thứ nữa gần như không tốn gì. Chi phí nằm ở lần mở đầu tiên chứ không ở từng phép kiểm.",
      },
      {
        question: "Khi nào nên rà soát ngoài lịch hằng năm?",
        options: [
          "Khi có thay đổi lớn: đổi kiến trúc, thêm dịch vụ, đổi nhà cung cấp, hoặc nhóm đổi người",
          "Khi hệ thống có một đợt chậm bất thường kéo dài vài giờ rồi tự trở lại bình thường",
          "Khi xuất hiện công cụ mới hứa hẹn thay thế được phần lớn quy trình hiện tại",
          "Khi chi phí của một dịch vụ nào đó giảm xuống dưới mức thông thường",
        ],
        correct: 0,
        explanation:
          "Bốn sự kiện này đều làm thay đổi cùng lúc nhiều thứ: hình dạng hệ thống, người chịu trách nhiệm, và những giả định mà cấu hình cũ dựa vào. Còn một đợt chậm rồi tự hết thì thường là lý do tệ nhất để đổi cấu hình.",
      },
      {
        question: "Kết quả quan trọng nhất của một buổi rà soát là gì?",
        options: [
          "Một danh sách ngắn các việc cần điều chỉnh, kèm ngày thực hiện cụ thể",
          "Một bảng tổng hợp đầy đủ mọi số liệu vận hành của năm vừa qua",
          "Một đánh giá về hiệu năng của hệ thống so với mặt bằng chung của ngành",
          "Một dự báo chi tiết về nhu cầu hạ tầng của năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Một bảng tổng hợp đẹp mà không dẫn tới hành động nào thì chỉ là ghi chép. Giá trị của buổi rà soát nằm ở vài việc cụ thể được sửa, và chúng cần có ngày thực hiện chứ không chỉ có ý định.",
      },
    ],
    keyTakeaways: [
      "Tự động hóa chạy đúng thiết lập cũ, kể cả khi dự án đã đổi - và không báo gì",
      "Phép kiểm giá trị nhất: ngưỡng cảnh báo hiện tại so với lưu lượng hiện tại",
      "Gộp mọi việc rà soát vào một buổi, vì chi phí lớn nhất là mở hết cấu hình ra",
      "Kết quả phải là danh sách việc cần sửa kèm ngày, không phải một bảng tổng hợp",
    ],
    practicePrompt: {
      question:
        "Bạn đặt cảnh báo độ trễ ba năm trước và chưa từng xem lại. Nên kiểm gì đầu tiên?",
      options: [
        "Tỷ lệ giữa ngưỡng đã đặt và độ trễ thực tế hiện nay",
        "Số lần cảnh báo đó đã kêu trong suốt ba năm vừa qua",
        "Chi phí mà công cụ giám sát đã thu trong cùng khoảng thời gian",
        "Danh sách người đang nhận thông báo từ cảnh báo đó",
      ],
      correct: 0,
      explanation:
        "Ba phép kiểm kia đều hữu ích nhưng chúng nói về quá khứ. Phép kiểm đầu tiên nói về việc cảnh báo của bạn còn đúng với hiện tại hay không - và đó là thứ duy nhất bạn còn sửa được.",
    },
    summary: {
      keyIdea: "Quy trình tự động không biết dự án của bạn đã đổi, và nó không báo gì khi điều đó xảy ra",
      commonMistake: "Thiết lập một lần rồi tin rằng nó vẫn đúng nhiều năm sau",
      action: "Đặt một buổi rà soát hằng năm vào lịch, cùng tuần với lần nâng phiên bản lớn.",
    },
    application: {
      title: "Một buổi, sáu phép kiểm",
      message:
        "Ngưỡng cảnh báo so với lưu lượng hiện tại. Độ phủ kiểm thử so với số dịch vụ hiện có. Các bước dựng đã thừa hoặc còn thiếu. Phiên bản thư viện và lỗ hổng đã công bố. Bản sao lưu có khôi phục thử được không. Và tài liệu còn khớp với hệ thống thật không.",
      secondary:
        "Kết thúc buổi bằng một danh sách ngắn các việc cần sửa, mỗi việc kèm một ngày. Danh sách không có ngày là danh sách sẽ được đọc lại vào buổi rà soát năm sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước giao phần lặp lại cho máy. Bài này về phần còn lại - những việc cần một người ngồi xuống nhìn lại, và chúng gộp vừa đủ vào một buổi mỗi năm.",
      },
      { type: "heading", text: "Loại sai lệch không phát ra tín hiệu nào" },
      {
        type: "paragraph",
        text: "Một bước dựng hỏng sẽ lộ ra ngay. Một hoá đơn tăng vọt cũng vậy. Nhưng một ngưỡng cảnh báo đúng của ba năm trước, trong khi lưu lượng đã gấp ba mươi lần, thì không tạo ra bất kỳ dấu hiệu nào - hệ thống vẫn chạy hoàn hảo theo đúng những gì được yêu cầu. Đây là loại sai lệch duy nhất mà không công cụ nào bắt được, vì nó không phải lỗi mà là sự lỗi thời.",
      },
      {
        type: "conceptTable",
        title: "Sáu phép kiểm của một buổi",
        subtitle: "Tất cả đều dùng chung một lần mở cấu hình ra",
        concepts: [
          {
            vi: "Ngưỡng cảnh báo",
            en: "Alert thresholds",
            def: "So ngưỡng đã đặt với lưu lượng và độ trễ hiện tại. Đây là phép kiểm bắt được sai lệch phổ biến nhất.",
          },
          {
            vi: "Độ phủ kiểm thử",
            en: "Test coverage",
            def: "Nó được đo trên phần mã hiện có, mà phần mã thì lớn lên theo năm. Cùng số bài kiểm thử phủ được ít hơn.",
          },
          {
            vi: "Các bước dựng",
            en: "Pipeline steps",
            def: "Bước nào chạy cho thứ đã gỡ, bước nào còn thiếu cho dịch vụ mới thêm vào.",
          },
          {
            vi: "Thư viện phụ thuộc",
            en: "Dependencies",
            def: "Gói nào đã bỏ bảo trì, lỗ hổng nào đã công bố, phiên bản nào đang bị khoá lại quá lâu.",
          },
          {
            vi: "Bản sao lưu",
            en: "Backups",
            def: "Có khôi phục thử được không. Một bản sao chưa từng khôi phục thì chưa tính là bản sao.",
          },
          {
            vi: "Tài liệu",
            en: "Documentation",
            def: "Hướng dẫn dựng môi trường có còn chạy được trên một máy trống không, hay đã sai từ hai lần đổi trước.",
          },
        ],
      },
      {
        type: "callout",
        label: "Kết thúc bằng ngày tháng, không bằng ý định",
        text: "Một buổi rà soát tạo ra vài phát hiện, và phần lớn chúng cần một hành động nhỏ: sửa một ngưỡng, gỡ một bước thừa, nâng một thư viện. Nếu chúng rời buổi rà soát dưới dạng ý định thì chúng sẽ xuất hiện lại y nguyên vào buổi rà soát năm sau. Gắn mỗi việc với một ngày cụ thể là khác biệt giữa một buổi có kết quả và một buổi chỉ để biết.",
      },
      {
        type: "closing",
        lines: [
          "Máy làm rất tốt việc lặp lại, và rất tệ việc nhận ra rằng hoàn cảnh đã khác.",
          "Bài cuối: gộp hai mươi mốt chặng thành thứ còn lại khi bạn đóng ứng dụng.",
        ],
      },
    ],
  },
  {
    id: 403,
    slug: "tong-ket-toan-bo-lo-trinh",
    title: "Chặng 21, Bài 4: Tổng kết toàn bộ lộ trình",
    subtitle: "Hai mươi mốt chặng rút thành vài nguyên tắc lặp đi lặp lại ở mọi chủ đề",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    whyItMatters:
      "Không ai nhớ được hai trăm bài học. Nhưng vài nguyên tắc đã xuất hiện lại ở gần như mọi chặng - từ dòng lệnh tới cơ sở dữ liệu, từ giao diện tới bảo mật - và chúng đủ để xử lý cả những công nghệ chưa từng được dạy.",
    openingQuestion: "Nguyên tắc nào xuất hiện ở nhiều chặng nhất trong toàn bộ lộ trình?",
    openingOptions: [
      "Mã chạy nhanh luôn khó đọc hơn mã chạy chậm, không có ngoại lệ nào",
      "Vòng đời của một dữ liệu quyết định nơi nó nên được lưu",
      "Tách nhỏ là cách duy nhất để giảm độ phức tạp của một hệ thống",
      "Học công cụ càng sớm thì tốc độ làm việc về sau càng cao",
    ],
    correctOption: 1,
    explanation:
      "Nguyên tắc này quay lại ở hầu như mọi chặng dưới các hình thức khác nhau. Trạng thái chỉ sống trong một màn hình thì để ngay trong màn hình đó. Thứ phải sống qua lần tải lại trang thì đặt ở localStorage. Thứ phải sống qua lần khởi động lại máy chủ thì phải xuống cơ sở dữ liệu. Thứ tính lại được và cần nhanh thì đặt ở cache. Thứ đổi theo môi trường thì nằm ở biến môi trường, không nằm trong mã. Và cùng một mẩu dữ liệu, cùng một ứng dụng, nhưng vòng đời khác nhau thì câu trả lời khác hẳn. Ba nguyên tắc còn lại đều có phần đúng, nhưng chúng xuất hiện ở ít chặng hơn và thường là hệ quả của nguyên tắc này.",
    diagram: [
      { label: "Câu hỏi đầu tiên: dữ liệu này sống bao lâu", arrow: true },
      { label: "Vòng đời quyết định nơi lưu", arrow: true },
      { label: "Tốc độ là kết quả, không phải điểm xuất phát", arrow: true },
      { label: "Nguyên tắc này áp cho mọi loại dữ liệu" },
    ],
    realWorldExample: {
      company: "Một câu hỏi cho một công nghệ chưa từng học",
      description:
        "Người học xong track này gặp một công nghệ chưa từng xuất hiện trong bất kỳ bài nào. Họ không cần biết tên nó: dữ liệu ở đây sống bao lâu, thứ này chạy ở phía nào, hỏng thì hỏng ra sao và ai biết, và nếu tệ nhất xảy ra thì mất gì. Bốn câu ấy xử lý được phần lớn công nghệ mà không cần một bài học riêng nào.",
    },
    quiz: [
      {
        question: "Câu hỏi nào áp dụng được cho mọi công nghệ, kể cả loại chưa từng học?",
        options: [
          "Dữ liệu ở đây sống bao lâu, và nó phải sống sót qua chuyện gì",
          "Công nghệ này đã tăng bao nhiêu phần trăm lượt tải trong năm vừa qua",
          "Có bao nhiêu công ty lớn đang dùng công nghệ này trong sản phẩm thật",
          "Ai đang phát triển nó và tổ chức đứng sau uy tín tới đâu",
        ],
        correct: 0,
        explanation:
          "Câu này chia mọi kho lưu trữ thành các nhóm với những đánh đổi khác nhau, và nó là câu đầu tiên trong cả chặng cơ sở dữ liệu lẫn chặng triển khai. Không trả lời được nó thì mọi lựa chọn còn lại đều là đoán.",
      },
      {
        question: "Nguyên tắc nào chung cho cả chi phí gọi mạng và chi phí truy vấn?",
        options: [
          "Chúng tính theo LẦN gọi, nên gọi nhiều lần thì trả nhiều lần",
          "Chúng tính theo thời gian chạy nên chạy càng lâu thì trả càng nhiều",
          "Chúng được miễn nếu tổng số lần gọi trong kỳ vượt một ngưỡng nhất định",
          "Chúng luôn thấp hơn chi phí thuê máy chủ tính theo giờ",
        ],
        correct: 0,
        explanation:
          "Đây là điểm phân biệt với chi phí thuê máy, vốn tính theo thời gian. Hai cấu trúc chi phí ngược nhau này quyết định khi nào nên gộp nhiều lần gọi thành một, và khi nào nên để máy chạy sẵn.",
      },
      {
        question: "Điểm chung của mọi kịch bản tấn công trong Chặng 16 là gì?",
        options: [
          "Chúng cần bạn hành động gấp, một mình, và qua kênh do chúng chọn",
          "Chúng luôn nhắm vào những người thiếu kiến thức bảo mật cơ bản và ít kinh nghiệm",
          "Chúng đều xuất phát từ các tên miền và tài khoản mới được đăng ký",
          "Chúng đều đòi hỏi kẻ tấn công phải biết trước mật khẩu của bạn",
        ],
        correct: 0,
        explanation:
          "Ba điều kiện này là cấu trúc chứ không phải chi tiết, nên chúng không đổi khi kịch bản đổi. Đó là lý do một quy tắc duy nhất phá được cả ba cùng lúc.",
      },
      {
        question: "Vì sao thứ tự các tầng trong một hệ thống lại quan trọng?",
        options: [
          "Vì mỗi tầng có một chức năng riêng, và tầng sau không thay được việc của tầng trước",
          "Vì các nền tảng triển khai yêu cầu thứ tự khởi động theo quy định",
          "Vì tầng đầu tiên luôn xử lý được lượng request lớn nhất trong toàn hệ thống",
          "Vì thứ tự này quyết định mức chi phí phải trả cho từng dịch vụ",
        ],
        correct: 0,
        explanation:
          "Cơ sở dữ liệu cho thứ phải đúng và bền; cache cho thứ cần nhanh và dựng lại được; giao diện cho thứ chỉ sống trong một phiên. Cache không làm được việc của cơ sở dữ liệu dù bạn có bao nhiêu cache đi nữa.",
      },
      {
        question: "Điều gì quyết định một bộ công cụ hay quy trình có thành công không?",
        options: [
          "Việc nó được duy trì qua nhiều năm, hơn là việc nó tối ưu tới đâu",
          "Việc nó chọn được đúng công nghệ mới ngay khi chúng vừa xuất hiện",
          "Việc nó chạy nhanh hơn mặt bằng chung của các dự án cùng loại",
          "Việc nó bao phủ đủ mọi tình huống có thể xảy ra trong sản phẩm",
        ],
        correct: 0,
        explanation:
          "Đây là điều mà chặng cuối này tồn tại để nói. Một quy trình thô được duy trì hai mươi năm thắng một quy trình hoàn hảo bị bỏ sau ba tháng, và khoảng cách giữa hai kết quả ấy lớn hơn mọi chênh lệch về tốc độ.",
      },
    ],
    keyTakeaways: [
      "Vòng đời của dữ liệu là câu hỏi đầu tiên ở gần như mọi chặng",
      "Hỏi thứ này chạy ở phía nào - nó quyết định ai nhìn thấy và ai sửa được",
      "Chi phí theo LẦN gọi và chi phí theo THỜI GIAN đòi hỏi hai chiến lược ngược nhau",
      "Duy trì được quan trọng hơn tối ưu - đó là kết luận của cả track",
    ],
    practicePrompt: {
      question:
        "Bạn gặp một công nghệ chưa từng học. Bốn câu hỏi nào nên đặt ra?",
      options: [
        "Dữ liệu sống bao lâu, chạy ở phía nào, hỏng ra sao, xấu nhất mất gì",
        "Ai đang phát triển nó, đã có bao nhiêu người dùng, hiệu năng thế nào",
        "Nó có mã nguồn mở không, giấy phép là gì, cộng đồng lớn tới đâu",
        "Nó phát triển nhanh cỡ nào trong ba năm qua và hướng đi năm tới",
      ],
      correct: 0,
      explanation:
        "Bốn câu này áp được cho mọi công nghệ vì chúng hỏi về cấu trúc chứ không hỏi về danh tính hay độ phổ biến. Ba nhóm câu còn lại đều hữu ích nhưng chúng chỉ trả lời được sau khi bốn câu này đã cho bạn biết công nghệ này có thuộc về bài toán của bạn hay không.",
    },
    summary: {
      keyIdea: "Vài nguyên tắc lặp lại ở mọi chặng, và chúng xử lý được cả những gì chưa từng được dạy",
      commonMistake: "Cố nhớ từng công cụ thay vì nhớ vài câu hỏi áp được cho mọi công cụ",
      action: "Viết ra bốn câu hỏi của bài này và giữ chúng ở nơi bạn xem lại được.",
    },
    application: {
      title: "Bốn câu cho mọi quyết định kỹ thuật",
      message:
        "Dữ liệu ở đây sống bao lâu và phải sống sót qua chuyện gì. Thứ này chạy ở phía người dùng hay phía máy chủ. Khi nó hỏng thì hỏng ra sao và ai biết được. Và nếu kịch bản xấu nhất xảy ra thì tôi mất gì.",
      secondary:
        "Bốn câu này không đòi hỏi bạn biết tên công nghệ. Chúng là thứ còn lại của hai mươi mốt chặng khi bạn đóng ứng dụng và đứng trước một quyết định thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Hơn hai trăm bài học không ai nhớ hết được, và cũng không cần. Vài nguyên tắc đã quay lại ở gần như mọi chặng, và chúng đủ để xử lý cả những tình huống chưa từng xuất hiện trong bài nào.",
      },
      { type: "heading", text: "Năm nguyên tắc lặp lại nhiều nhất" },
      {
        type: "list",
        items: [
          "Vòng đời của dữ liệu quyết định nơi lưu - tốc độ là kết quả, không phải điểm xuất phát",
          "Hỏi thứ này chạy ở phía nào; phía người dùng thì ai cũng đọc và sửa được",
          "Chi phí theo LẦN gọi phạt việc gọi nhiều; chi phí theo THỜI GIAN phạt việc chạy lâu",
          "Xây theo tầng: dữ liệu bền trước, lớp tăng tốc sau, giao diện cuối cùng",
          "Duy trì được quan trọng hơn tối ưu - ở mọi chủ đề, không có ngoại lệ",
        ],
      },
      {
        type: "paragraph",
        text: "Năm nguyên tắc này không phải tóm tắt của track, chúng là những gì còn lại sau khi quên hết chi tiết. Chúng đã xuất hiện ở chặng dòng lệnh và chặng cơ sở dữ liệu, ở chặng giao diện và chặng triển khai, ở chặng bảo mật và chặng đám mây - mỗi lần dưới một hình thức khác nhau nhưng cùng một cấu trúc. Đó là lý do chúng dùng được cho cả những công cụ chưa ra đời.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi cho một công nghệ chưa từng học",
        subtitle: "Chúng hỏi về cấu trúc, nên chúng không lỗi thời",
        concepts: [
          {
            vi: "Dữ liệu sống bao lâu",
            en: "Data lifetime",
            def: "Câu hỏi đầu tiên và thường là câu duy nhất cần thiết. Nó loại bỏ phần lớn lựa chọn không phù hợp trước khi bàn tới bất cứ điều gì khác.",
          },
          {
            vi: "Chạy ở phía nào",
            en: "Where it runs",
            def: "Phía người dùng thì ai cũng đọc được và sửa được. Phía máy chủ thì bạn kiểm soát, nhưng phải trả bằng một vòng gọi mạng.",
          },
          {
            vi: "Hỏng thì hỏng ra sao",
            en: "Failure mode",
            def: "Hỏng ầm ĩ và dừng hẳn, hay hỏng im lặng và trả về dữ liệu sai. Loại thứ hai đắt hơn nhiều vì không ai biết.",
          },
          {
            vi: "Xấu nhất thì mất gì",
            en: "Blast radius",
            def: "Không phải nó nhanh tới đâu, mà nếu nó sập thì kéo theo những gì. Đây là câu quyết định mức dự phòng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Điều duy nhất track này không dạy được",
        text: "Mọi thứ ở trên đều là kiến thức, và kiến thức là phần dễ. Phần khó là làm cùng vài việc đơn giản trong nhiều năm khi không có gì thú vị xảy ra - viết kiểm thử đều, không đẩy thẳng lên nhánh chính, không chạy theo công cụ mới vì nó đang nổi, ngồi xuống rà soát mỗi năm một lần. Không bài học nào thay được điều đó, và cũng không cần: hai mươi mốt chặng vừa rồi tồn tại chỉ để bạn biết chắc mình đang duy trì đúng vài việc.",
      },
      {
        type: "closing",
        lines: [
          "Hết lộ trình. Điều đáng giá nhất không phải bạn nhớ được bao nhiêu, mà là bạn còn lại vài câu hỏi dùng được ở mọi tình huống.",
          "Và câu hỏi đầu tiên, ở mọi chặng, vẫn luôn là: dữ liệu này sống bao lâu và nó phải sống sót qua chuyện gì.",
        ],
      },
    ],
  },
];
