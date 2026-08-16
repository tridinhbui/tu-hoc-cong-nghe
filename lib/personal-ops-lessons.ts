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
    title: "Chặng 21, Bài 1: Hệ thống tối thiểu cần có",
    subtitle: "Bốn tài khoản và một bảng - ít hơn thì không đủ, nhiều hơn thì không duy trì được",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    whyItMatters:
      "Phần lớn hệ thống quản lý tài chính thất bại không phải vì thiếu tính năng mà vì quá nhiều bước. Một hệ thống bạn bỏ sau ba tuần thì tệ hơn một hệ thống thô mà bạn duy trì được nhiều năm.",
    openingQuestion: "Điều gì quyết định một hệ thống quản lý tài chính có hiệu quả không?",
    openingOptions: [
      "Mức độ chi tiết của việc phân loại và theo dõi từng khoản chi tiêu",
      "Việc bạn có duy trì được nó sau vài tháng hay không",
      "Số lượng công cụ và ứng dụng hỗ trợ mà bạn đang sử dụng",
      "Tần suất bạn cập nhật số liệu vào hệ thống mỗi tuần",
    ],
    correctOption: 1,
    explanation:
      "Một hệ thống chi tiết hoàn hảo mà bạn bỏ sau ba tuần cho ra ba tuần dữ liệu. Một hệ thống thô mà bạn duy trì năm năm cho ra năm năm dữ liệu và, quan trọng hơn, năm năm các quyết định được đưa ra dựa trên nó. Đây là lý do tiêu chí thiết kế duy nhất đáng quan tâm là khả năng duy trì - và nó thường có nghĩa là ít bước hơn, ít phân loại hơn, ít việc phải nhớ hơn. Chặng 1 đã nói điều này khi bàn về theo dõi chi tiêu, và nó đúng cho toàn bộ hệ thống chứ không riêng phần ghi chép.",
    diagram: [
      { label: "Hệ thống chi tiết bị bỏ sau ba tuần", arrow: true },
      { label: "Hệ thống thô duy trì được nhiều năm", arrow: true },
      { label: "Cái thứ hai luôn thắng", arrow: true },
      { label: "Nên tiêu chí thiết kế là: ít bước nhất có thể" },
    ],
    realWorldExample: {
      company: "Bảng tính hoàn hảo và tờ giấy",
      description:
        "Một người dựng bảng tính phân loại chi tiêu thành ba mươi mục với biểu đồ tự động. Sau một tháng bảng ngừng được cập nhật vì mỗi lần nhập mất quá lâu. Một người khác chỉ ghi bốn con số mỗi tháng - thu, chi, để dành, tài sản ròng - và làm điều đó suốt bốn năm. Người thứ hai có ít dữ liệu hơn nhiều nhưng biết rõ mình đang đi hướng nào, còn người thứ nhất thì không.",
    },
    quiz: [
      {
        question: "Vì sao chia tài khoản theo mục đích lại hiệu quả?",
        options: [
          "Vì nó làm ranh giới giữa các loại tiền trở nên vật lý thay vì chỉ nằm trong đầu",
          "Vì ngân hàng trả lãi cao hơn cho khách hàng có nhiều tài khoản",
          "Vì mỗi tài khoản được bảo hiểm tiền gửi riêng theo hạn mức đầy đủ",
          "Vì nó giúp giảm tổng phí quản lý so với việc dùng một tài khoản duy nhất cho mọi việc",
        ],
        correct: 0,
        explanation:
          "Khi quỹ khẩn cấp và tiền chi tiêu nằm chung một chỗ, ranh giới giữa chúng chỉ tồn tại trong ý định. Tách ra thành hai tài khoản biến ranh giới ấy thành một hành động cụ thể phải thực hiện mới vượt qua được.",
      },
      {
        question: "Bốn con số tối thiểu nên theo dõi hằng tháng là gì?",
        options: [
          "Thu nhập, chi tiêu, phần để dành, và tài sản ròng",
          "Số dư từng tài khoản ngân hàng vào ngày cuối tháng",
          "Chi tiêu chia theo ba mươi hạng mục đã phân loại sẵn",
          "Lợi suất của từng khoản đầu tư đang nắm giữ",
        ],
        correct: 0,
        explanation:
          "Ba con số đầu cho biết dòng tiền tháng đó, con số thứ tư cho biết bạn đang đi đâu qua nhiều năm. Chi tiết hơn thì tốt nếu duy trì được, nhưng bốn con số này là mức không nên xuống thấp hơn.",
      },
      {
        question: "Vì sao tài sản ròng là chỉ số quan trọng nhất trong bốn?",
        options: [
          "Vì nó tổng hợp mọi quyết định tài chính vào một con số duy nhất theo thời gian",
          "Vì nó là chỉ số duy nhất ngân hàng dùng khi xét duyệt hồ sơ vay",
          "Vì nó không bị ảnh hưởng bởi biến động thu nhập giữa các tháng",
          "Vì nó cho biết chính xác bạn còn thiếu bao nhiêu tiền cho mục tiêu hưu trí của mình",
        ],
        correct: 0,
        explanation:
          "Thu nhập cao mà tài sản ròng đứng yên là một tình huống hoàn toàn có thật, và nó chỉ lộ ra khi theo dõi con số này. Ba chỉ số kia mô tả một tháng; con số này mô tả hướng đi.",
      },
      {
        question: "Sai lầm phổ biến khi thiết lập hệ thống là gì?",
        options: [
          "Xây quá chi tiết ngay từ đầu nên bỏ dở trước khi có đủ dữ liệu để dùng",
          "Không dùng phần mềm chuyên dụng mà chỉ ghi bằng bảng tính đơn giản",
          "Theo dõi tài sản ròng quá thường xuyên nên bị ảnh hưởng bởi biến động",
          "Chia quá ít tài khoản nên không phân biệt được các loại tiền có mục đích khác nhau",
        ],
        correct: 0,
        explanation:
          "Đây là sai lầm phổ biến nhất và nó xuất phát từ thiện chí. Bắt đầu thô rồi thêm chi tiết khi thấy cần luôn tốt hơn bắt đầu hoàn hảo rồi bỏ.",
      },
      {
        question: "Nên dành bao nhiêu thời gian mỗi tháng cho việc này?",
        options: [
          "Đủ ít để bạn chắc chắn duy trì được - thường là mười lăm tới ba mươi phút",
          "Ít nhất hai giờ để cập nhật đầy đủ mọi hạng mục chi tiêu",
          "Mỗi ngày mười phút để số liệu luôn được cập nhật kịp thời",
          "Không cần thời gian cố định, chỉ cập nhật khi có giao dịch lớn phát sinh trong tháng",
        ],
        correct: 0,
        explanation:
          "Ngưỡng đúng là ngưỡng bạn duy trì được vào tháng bận nhất trong năm, không phải tháng rảnh nhất. Thiết kế cho tháng bận thì hệ thống sống sót; thiết kế cho tháng rảnh thì nó chết vào tháng thứ ba.",
      },
    ],
    keyTakeaways: [
      "Tiêu chí thiết kế duy nhất đáng quan tâm là khả năng duy trì",
      "Chia tài khoản theo mục đích biến ranh giới trong đầu thành ranh giới vật lý",
      "Bốn con số tối thiểu: thu, chi, để dành, tài sản ròng",
      "Thiết kế cho tháng bận nhất, không phải tháng rảnh nhất",
    ],
    practicePrompt: {
      question:
        "Bạn từng thử ba ứng dụng quản lý chi tiêu và bỏ cả ba sau vài tuần. Nên làm gì khác?",
      options: [
        "Giảm xuống mức thô nhất còn dùng được: bốn con số mỗi tháng, ghi ở đâu cũng được",
        "Thử ứng dụng thứ tư có nhiều tính năng tự động hơn ba ứng dụng trước",
        "Quay lại ứng dụng tốt nhất trong ba cái và cố gắng duy trì thêm lần nữa",
        "Thuê một người hỗ trợ nhập liệu để không phải tự làm việc này nữa",
      ],
      correct: 0,
      explanation:
        "Ba lần bỏ dở là dữ liệu, không phải thất bại - nó cho biết mức chi tiết bạn đã thử là quá cao với mình. Đổi công cụ mà giữ nguyên mức chi tiết thì gần như chắc chắn cho ra kết quả thứ tư giống hệt.",
    },
    summary: {
      keyIdea: "Hệ thống tốt nhất là hệ thống bạn còn dùng sau hai năm, không phải hệ thống đầy đủ nhất",
      commonMistake: "Xây quá chi tiết ngay từ đầu và bỏ dở trước khi thu được dữ liệu dùng được",
      action: "Rút hệ thống của bạn xuống bốn con số mỗi tháng và duy trì đúng bốn con số đó.",
    },
    application: {
      title: "Bốn con số, một lần mỗi tháng",
      message:
        "Vào một ngày cố định mỗi tháng, ghi bốn con số: thu nhập, chi tiêu, phần để dành, tài sản ròng. Ghi ở bất cứ đâu bạn chắc chắn mở lại được sau một năm.",
      secondary:
        "Nếu bạn duy trì được sáu tháng liên tục, khi đó mới thêm chi tiết. Thêm trước khi có thói quen là cách chắc chắn để mất cả hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai mươi chặng trước là kiến thức. Chặng này về thứ biến kiến thức thành kết quả - và thất bại phổ biến nhất ở đây không phải hiểu sai, mà là hiểu đúng rồi không duy trì được.",
      },
      { type: "heading", text: "Bốn tài khoản, bốn con số" },
      {
        type: "conceptTable",
        title: "Cấu trúc tối thiểu",
        subtitle: "Ít hơn thì các loại tiền trộn vào nhau; nhiều hơn thì khó duy trì",
        concepts: [
          {
            vi: "Tài khoản chi tiêu",
            en: "Spending",
            def: "Nơi lương về và nơi mọi khoản chi hằng tháng đi ra. Đây là tài khoản duy nhất bạn nhìn thường xuyên.",
          },
          {
            vi: "Quỹ khẩn cấp",
            en: "Emergency",
            def: "Tách hẳn ra để ranh giới trở nên vật lý. Rút được nhanh nhưng không nằm trong tầm tay hằng ngày.",
          },
          {
            vi: "Quỹ mục tiêu",
            en: "Goals",
            def: "Cho các khoản lớn đã biết trước ở Chặng 18. Có thể là vài sổ tiết kiệm theo từng mốc thời gian.",
          },
          {
            vi: "Tài khoản đầu tư",
            en: "Investing",
            def: "Cho phần dài hạn. Tách riêng để không bị rút nhầm khi cần tiền, và để đo được kết quả riêng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thiết kế cho tháng bận nhất",
        text: "Ai cũng thiết kế hệ thống trong một buổi rảnh và với nhiều động lực - và đó chính là lý do phần lớn hệ thống chết. Câu hỏi đúng không phải tôi có làm được việc này không, mà là tôi có làm được nó vào tháng bận nhất trong năm không. Nếu câu trả lời là không, hãy cắt bớt cho tới khi nó thành có.",
      },
      {
        type: "closing",
        lines: [
          "Một hệ thống thô duy trì được nhiều năm thắng một hệ thống hoàn hảo bỏ sau ba tuần.",
          "Bài sau: cách để hệ thống chạy mà không cần bạn nhớ tới nó.",
        ],
      },
    ],
  },
  {
    id: 401,
    slug: "tu-dong-hoa-toan-bo-he-thong",
    title: "Chặng 21, Bài 2: Tự động hóa toàn bộ hệ thống",
    subtitle: "Quyết định một lần hôm nay, thực hiện hai trăm lần trong mười năm tới",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⚙️",
    track: "personal",
    whyItMatters:
      "Mọi kế hoạch tài chính đều cần được thực hiện lặp đi lặp lại trong nhiều năm, và ý chí là nguồn lực cạn kiệt được. Tự động hóa chuyển gánh nặng từ việc nhớ mỗi tháng sang việc thiết lập một lần.",
    openingQuestion: "Vì sao tự động hóa hiệu quả hơn kỷ luật cá nhân?",
    openingOptions: [
      "Vì nó thực hiện quyết định của bạn hàng trăm lần mà không cần bạn nhớ lại lần nào",
      "Vì ngân hàng thường ưu đãi lãi suất cho các lệnh chuyển tiền định kỳ",
      "Vì nó giúp bạn tránh được các loại phí giao dịch phát sinh khi làm thủ công",
      "Vì các khoản chuyển tự động được ưu tiên xử lý trước trong hệ thống",
    ],
    correctOption: 0,
    explanation:
      "Một quyết định tốt cần được thực hiện một lần; một thói quen tốt cần được thực hiện mỗi tháng. Tự động hóa biến loại thứ hai thành loại thứ nhất. Điều này quan trọng vì ý chí không phân bổ đều: tháng có việc gấp, tháng mệt mỏi, tháng có cám dỗ lớn - và chính những tháng đó là lúc kế hoạch bị bỏ. Một lệnh chuyển tự động không biết tháng này bạn đang bận, nên nó thực hiện đúng điều bạn đã quyết định lúc đầu óc tỉnh táo nhất. Với một kế hoạch mười năm, đó là khoảng một trăm hai mươi lần quyết định được thực hiện từ một lần thiết lập.",
    diagram: [
      { label: "Quyết định lúc đầu óc tỉnh táo", arrow: true },
      { label: "Thiết lập một lần", arrow: true },
      { label: "Thực hiện hàng trăm lần, không cần nhớ", arrow: true },
      { label: "Kể cả trong những tháng bạn sẽ bỏ nếu làm tay" },
    ],
    realWorldExample: {
      company: "Tháng thứ bảy",
      description:
        "Hai người cùng quyết định để dành hai mươi phần trăm thu nhập. Người thứ nhất chuyển tay mỗi tháng sau khi đã chi tiêu xong. Người thứ hai đặt lệnh tự động vào ngày lương về. Sáu tháng đầu cả hai đều làm được. Tháng thứ bảy có một khoản chi bất ngờ - người thứ nhất bỏ tháng đó và rồi bỏ luôn tháng thứ tám, còn người thứ hai thì không có gì để bỏ.",
    },
    quiz: [
      {
        question: "Thứ tự đúng của một hệ thống tự động là gì?",
        options: [
          "Lương về, chuyển tự động phần để dành, rồi phần còn lại mới dùng để chi tiêu",
          "Lương về, chi tiêu trong tháng, tới cuối tháng chuyển toàn bộ phần còn dư sang tiết kiệm",
          "Lương về, chia đều cho mọi mục tiêu, rồi điều chỉnh lại vào cuối tháng",
          "Lương về, giữ nguyên trong tài khoản, chuyển khi số dư đạt một mức nhất định",
        ],
        correct: 0,
        explanation:
          "Chuyển phần dư vào cuối tháng nghe hợp lý nhưng phần dư gần như luôn nhỏ hơn dự tính, vì chi tiêu có xu hướng lấp đầy khoảng trống có sẵn. Đảo thứ tự lại làm phần để dành thành khoản cố định và chi tiêu thành phần điều chỉnh.",
      },
      {
        question: "Việc nào KHÔNG nên tự động hóa?",
        options: [
          "Quyết định phân bổ lớn và việc rà soát định kỳ toàn bộ hệ thống",
          "Chuyển tiền vào quỹ khẩn cấp mỗi tháng theo một mức cố định đã định trước",
          "Đóng các khoản phí bảo hiểm định kỳ theo lịch đã cam kết",
          "Chuyển một khoản đều đặn vào tài khoản đầu tư dài hạn",
        ],
        correct: 0,
        explanation:
          "Tự động hóa hợp với việc lặp lại giống nhau. Việc đòi hỏi phán đoán - có nên đổi tỷ trọng không, mục tiêu nào cần điều chỉnh - thì cần một người ngồi xuống suy nghĩ, và bài sau nói về buổi đó.",
      },
      {
        question: "Vì sao đặt lệnh vào đúng ngày lương về lại quan trọng?",
        options: [
          "Vì tiền chưa kịp trở thành một phần của số dư khả dụng trong đầu bạn",
          "Vì ngân hàng chỉ cho phép đặt lệnh định kỳ vào một số ngày cố định",
          "Vì lãi suất được tính theo số dư đầu kỳ, nên chuyển càng sớm thì phần lãi nhận được càng cao",
          "Vì các khoản chi tiêu lớn thường phát sinh vào cuối tháng nhiều hơn",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa ngày lương về và ngày chuyển càng dài thì số tiền ấy càng lâu nằm trong tài khoản chi tiêu - và mọi thứ nằm ở đó đều dần được coi là tiền có thể dùng.",
      },
      {
        question: "Rủi ro của một hệ thống tự động là gì?",
        options: [
          "Nó chạy tiếp cả khi hoàn cảnh đã đổi, nếu không ai rà soát định kỳ",
          "Nó có thể chuyển nhầm số tiền nếu ngân hàng gặp sự cố kỹ thuật",
          "Nó làm người dùng mất khả năng quản lý tài chính một cách chủ động",
          "Nó khiến các khoản chuyển không được ghi nhận vào lịch sử giao dịch",
        ],
        correct: 0,
        explanation:
          "Đây chính là lý do bài sau về buổi rà soát tồn tại. Ưu điểm lớn nhất của tự động hóa - chạy mà không cần ai để ý - cũng là nhược điểm của nó khi thu nhập, mục tiêu hay hoàn cảnh đã thay đổi.",
      },
      {
        question: "Nên xử lý thế nào khi thu nhập tăng?",
        options: [
          "Nâng mức chuyển tự động ngay, trước khi phần tăng kịp hòa vào chi tiêu",
          "Giữ nguyên mức cũ và dùng toàn bộ phần tăng để nâng chất lượng cuộc sống hằng ngày",
          "Chờ vài tháng để chắc chắn thu nhập mới ổn định rồi mới điều chỉnh",
          "Chuyển phần tăng vào một tài khoản riêng và quyết định sau",
        ],
        correct: 0,
        explanation:
          "Chặng 20 gọi đây là cửa sổ ngay sau khi tăng lương. Chờ vài tháng nghe thận trọng nhưng nó để mức sống dâng lên trước - và sau đó việc nâng khoản để dành trở thành một khoản cắt giảm.",
      },
    ],
    keyTakeaways: [
      "Tự động hóa biến một thói quen cần duy trì thành một quyết định thực hiện một lần",
      "Thứ tự đúng: để dành trước, chi tiêu bằng phần còn lại",
      "Đặt lệnh vào đúng ngày lương về, trước khi tiền thành số dư khả dụng trong đầu",
      "Việc cần phán đoán thì không tự động hóa - nó thuộc về buổi rà soát",
    ],
    practicePrompt: {
      question:
        "Bạn đang chuyển tiền tiết kiệm bằng tay vào cuối tháng và thường không đủ như dự định. Sửa thế nào?",
      options: [
        "Đặt lệnh tự động vào ngày lương về và chi tiêu bằng phần còn lại",
        "Đặt nhắc nhở vào cuối tháng để không quên thực hiện việc chuyển tiền",
        "Giảm mục tiêu tiết kiệm xuống mức mà tháng nào cũng đạt được",
        "Ghi chép chi tiêu chi tiết hơn để biết tiền đang đi đâu mất",
      ],
      correct: 0,
      explanation:
        "Vấn đề không nằm ở trí nhớ mà ở thứ tự - chuyển phần dư nghĩa là để dành thứ còn lại sau khi tiêu, và phần còn lại luôn co lại vừa bằng nhu cầu. Đảo thứ tự xử lý gốc của vấn đề chứ không xử lý triệu chứng.",
    },
    summary: {
      keyIdea: "Tự động hóa chuyển gánh nặng từ việc nhớ mỗi tháng sang việc thiết lập một lần",
      commonMistake: "Để dành phần dư cuối tháng - phần dư luôn co lại vừa bằng chỗ trống có sẵn",
      action: "Đặt lệnh chuyển tự động vào đúng ngày lương về cho từng mục tiêu.",
    },
    application: {
      title: "Một buổi thiết lập, nhiều năm chạy",
      message:
        "Đặt lệnh tự động vào ngày lương về cho từng mục tiêu: quỹ khẩn cấp, quỹ mục tiêu, đầu tư. Sau đó chi tiêu bằng đúng những gì còn lại trong tài khoản chi tiêu.",
      secondary:
        "Đặt thêm một nhắc nhở hằng năm để xem lại các lệnh này. Thứ chạy mà không ai để ý cũng là thứ chạy tiếp khi hoàn cảnh đã đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói hệ thống phải đủ đơn giản để duy trì. Bài này đi xa hơn một bước: phần lớn hệ thống không cần được duy trì nếu nó được thiết lập để tự chạy.",
      },
      { type: "heading", text: "Đảo thứ tự là toàn bộ vấn đề" },
      {
        type: "paragraph",
        text: "Cách mặc định là chi tiêu trước rồi để dành phần dư. Cách này thất bại một cách rất đều đặn, vì phần dư không phải một con số cố định mà là khoảng trống còn lại - và chi tiêu có xu hướng lấp đầy đúng khoảng trống ấy. Đảo lại: chuyển phần để dành ngay khi lương về, rồi sống bằng những gì còn lại. Cùng một thu nhập, cùng một con người, nhưng phần để dành giờ là khoản cố định còn chi tiêu là phần điều chỉnh.",
      },
      {
        type: "callout",
        label: "Tự động hóa cái lặp lại, giữ lại cái cần phán đoán",
        text: "Chuyển tiền theo lịch, đóng phí định kỳ, mua theo kỳ - đây là những việc giống hệt nhau mỗi lần, nên máy làm tốt hơn người. Còn việc quyết định tỷ trọng danh mục, điều chỉnh mục tiêu khi hoàn cảnh đổi, hay xem xét có nên tiếp tục một khoản không thì cần một người ngồi xuống nghĩ. Ranh giới giữa hai nhóm này là ranh giới giữa bài này và bài sau.",
      },
      {
        type: "list",
        items: [
          "Đặt lệnh vào đúng ngày lương về, không phải cuối tháng",
          "Một lệnh riêng cho từng mục tiêu, để mỗi khoản có đích rõ ràng",
          "Mỗi lần tăng thu nhập, nâng lệnh lên ngay trong tháng đó",
          "Đặt một nhắc nhở hằng năm để rà lại toàn bộ các lệnh đang chạy",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kỷ luật là nguồn lực cạn kiệt được; một lệnh tự động thì không.",
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
      "Tự động hóa giải quyết việc lặp lại nhưng nó không biết hoàn cảnh của bạn đã đổi. Một buổi mỗi năm bắt được gần như mọi thứ đã trôi khỏi chỗ đúng, và nó là việc duy nhất trong cả track không thể giao cho máy.",
    openingQuestion: "Vì sao một hệ thống tự động vẫn cần được rà soát định kỳ?",
    openingOptions: [
      "Vì các lệnh tự động có thể bị ngân hàng hủy sau một thời gian nhất định",
      "Vì nó chạy tiếp theo thiết lập cũ kể cả khi thu nhập và mục tiêu đã thay đổi",
      "Vì cơ quan thuế yêu cầu kê khai lại thông tin tài chính mỗi năm một lần",
      "Vì các sản phẩm tài chính mới xuất hiện liên tục và cần được cập nhật",
    ],
    correctOption: 1,
    explanation:
      "Ưu điểm lớn nhất của tự động hóa là nó chạy mà không cần ai để ý, và đó cũng chính là điểm yếu của nó. Thu nhập tăng nhưng lệnh chuyển vẫn ở mức của ba năm trước. Chi tiêu tăng nhưng quỹ khẩn cấp vẫn được tính theo mức cũ. Một mục tiêu đã hoàn thành nhưng khoản chuyển cho nó vẫn chạy, trong khi mục tiêu mới thì chưa có lệnh nào. Không thay đổi nào trong số này gây ra lỗi hay báo động - hệ thống vẫn hoạt động đúng như đã thiết lập, chỉ là thiết lập ấy không còn đúng với hoàn cảnh. Đó là loại sai lệch chỉ một người ngồi xuống nhìn lại mới phát hiện được.",
    diagram: [
      { label: "Hệ thống chạy đúng như đã thiết lập", arrow: true },
      { label: "Nhưng hoàn cảnh đã đổi", arrow: true },
      { label: "Không có lỗi nào báo, không có gì hỏng", arrow: true },
      { label: "Chỉ một buổi ngồi lại mới thấy" },
    ],
    realWorldExample: {
      company: "Ba năm và một lệnh không đổi",
      description:
        "Một người đặt lệnh chuyển ba triệu mỗi tháng vào quỹ đầu tư, thời điểm thu nhập là hai mươi triệu. Ba năm sau thu nhập đã là ba mươi lăm triệu nhưng lệnh vẫn là ba triệu. Hệ thống chạy hoàn hảo suốt ba năm và không có gì hỏng - chỉ là tỷ lệ để dành đã tụt từ mười lăm phần trăm xuống dưới chín, và không có tín hiệu nào báo điều đó.",
    },
    quiz: [
      {
        question: "Loại sai lệch nào chỉ buổi rà soát mới phát hiện được?",
        options: [
          "Hệ thống vẫn chạy đúng thiết lập cũ trong khi hoàn cảnh đã thay đổi",
          "Các giao dịch bị ghi nhận sai số tiền do lỗi kỹ thuật trong hệ thống của ngân hàng",
          "Khoản chuyển tự động bị trùng lặp nên tiền bị chuyển hai lần",
          "Phí dịch vụ tăng lên mà không được thông báo tới khách hàng",
        ],
        correct: 0,
        explanation:
          "Ba loại kia đều tạo ra dấu vết bất thường mà bạn có thể nhận ra. Loại đầu tiên thì không có dấu hiệu nào - mọi thứ hoạt động đúng, chỉ là đúng theo một thiết lập đã lỗi thời.",
      },
      {
        question: "Việc nào nên có trong buổi rà soát?",
        options: [
          "Đối chiếu tỷ lệ để dành hiện tại với thu nhập hiện tại",
          "Kiểm tra số dư của mọi tài khoản vào ngày rà soát",
          "So sánh lợi suất danh mục với các chỉ số thị trường trong năm",
          "Cập nhật lại toàn bộ phân loại chi tiêu của mười hai tháng qua",
        ],
        correct: 0,
        explanation:
          "Đây là phép kiểm bắt được sai lệch phổ biến nhất: khoản chuyển giữ nguyên trong khi thu nhập đã tăng. Nó mất một phút và thường là phát hiện có giá trị nhất của cả buổi.",
      },
      {
        question: "Vì sao nên gộp nhiều việc rà soát vào cùng một buổi?",
        options: [
          "Vì chi phí lớn nhất là ngồi xuống mở hết thông tin ra, còn lại gần như miễn phí",
          "Vì các thông tin tài chính chỉ được cập nhật đồng thời một lần vào cuối mỗi năm tài chính",
          "Vì làm nhiều lần trong năm sẽ khiến bạn quyết định quá thường xuyên",
          "Vì ngân hàng chỉ cung cấp sao kê tổng hợp vào cuối mỗi năm tài chính",
        ],
        correct: 0,
        explanation:
          "Chặng 12 đã dùng chính lập luận này cho buổi rà soát tiền gửi. Khi đã bỏ công mở hết tài khoản và giấy tờ ra, việc kiểm thêm ba bốn thứ nữa gần như không tốn gì.",
      },
      {
        question: "Khi nào nên rà soát ngoài lịch hằng năm?",
        options: [
          "Khi có thay đổi lớn: đổi việc, sinh con, mua nhà, hoặc thay đổi tình trạng gia đình",
          "Khi thị trường có biến động mạnh trong một khoảng thời gian ngắn và danh mục giảm nhiều",
          "Khi xuất hiện sản phẩm tài chính mới có lợi suất hấp dẫn hơn",
          "Khi số dư của một tài khoản nào đó giảm xuống dưới mức thông thường",
        ],
        correct: 0,
        explanation:
          "Bốn sự kiện này đều làm thay đổi cùng lúc nhiều thứ: thu nhập, chi tiêu, người phụ thuộc và nhu cầu bảo vệ. Còn biến động thị trường thì thường là lý do tệ nhất để ra quyết định.",
      },
      {
        question: "Kết quả quan trọng nhất của một buổi rà soát là gì?",
        options: [
          "Một danh sách ngắn các việc cần điều chỉnh, kèm ngày thực hiện cụ thể",
          "Một bảng tổng hợp đầy đủ mọi con số tài chính của năm vừa qua",
          "Một đánh giá về hiệu quả đầu tư của năm so với mặt bằng chung của thị trường",
          "Một dự báo chi tiết về tình hình tài chính của năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Một bảng tổng hợp đẹp mà không dẫn tới hành động nào thì chỉ là ghi chép. Giá trị của buổi rà soát nằm ở vài việc cụ thể được sửa, và chúng cần có ngày thực hiện chứ không chỉ có ý định.",
      },
    ],
    keyTakeaways: [
      "Tự động hóa chạy đúng thiết lập cũ, kể cả khi hoàn cảnh đã đổi - và không báo gì",
      "Phép kiểm giá trị nhất: tỷ lệ để dành hiện tại so với thu nhập hiện tại",
      "Gộp mọi việc rà soát vào một buổi, vì chi phí lớn nhất là mở hết thông tin ra",
      "Kết quả phải là danh sách việc cần sửa kèm ngày, không phải một bảng tổng hợp",
    ],
    practicePrompt: {
      question:
        "Bạn đặt lệnh chuyển tự động ba năm trước và chưa từng xem lại. Nên kiểm gì đầu tiên?",
      options: [
        "Tỷ lệ giữa khoản chuyển và thu nhập hiện tại của bạn",
        "Lợi suất mà khoản đầu tư đó đã đạt được trong ba năm qua",
        "Phí quản lý mà quỹ đầu tư đã thu trong cùng khoảng thời gian",
        "Số dư hiện tại của tài khoản nhận khoản chuyển đó",
      ],
      correct: 0,
      explanation:
        "Ba phép kiểm kia đều hữu ích nhưng chúng nói về kết quả của quá khứ. Phép kiểm đầu tiên nói về việc hệ thống của bạn còn đúng với hiện tại hay không - và đó là thứ duy nhất bạn còn sửa được.",
    },
    summary: {
      keyIdea: "Hệ thống tự động không biết hoàn cảnh của bạn đã đổi, và nó không báo gì khi điều đó xảy ra",
      commonMistake: "Thiết lập một lần rồi tin rằng nó vẫn đúng nhiều năm sau",
      action: "Đặt một buổi rà soát hằng năm vào lịch, cùng tháng với buổi rà soát tiền gửi.",
    },
    application: {
      title: "Một buổi, sáu phép kiểm",
      message:
        "Tỷ lệ để dành so với thu nhập hiện tại. Quỹ khẩn cấp so với chi tiêu hiện tại. Các mục tiêu đã xong hoặc mới xuất hiện. Lãi suất và phí của các khoản đang có. Các lớp bảo vệ còn hiệu lực không. Và trục thời gian các khoản lớn có gì đổi.",
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
        text: "Một lệnh chuyển sai số tiền sẽ lộ ra ngay. Một khoản phí bất thường cũng vậy. Nhưng một lệnh chuyển đúng số tiền của ba năm trước, trong khi thu nhập đã tăng gấp rưỡi, thì không tạo ra bất kỳ dấu hiệu nào - hệ thống vẫn chạy hoàn hảo theo đúng những gì được yêu cầu. Đây là loại sai lệch duy nhất mà không công cụ nào bắt được, vì nó không phải lỗi mà là sự lỗi thời.",
      },
      {
        type: "conceptTable",
        title: "Sáu phép kiểm của một buổi",
        subtitle: "Tất cả đều dùng chung một lần mở thông tin ra",
        concepts: [
          {
            vi: "Tỷ lệ để dành",
            en: "Savings rate",
            def: "So khoản chuyển tự động với thu nhập hiện tại. Đây là phép kiểm bắt được sai lệch phổ biến nhất.",
          },
          {
            vi: "Quỹ khẩn cấp",
            en: "Emergency fund",
            def: "Nó được đo bằng số tháng chi tiêu, mà chi tiêu thì tăng theo năm. Cùng số dư đỡ được ít tháng hơn.",
          },
          {
            vi: "Mục tiêu",
            en: "Goals",
            def: "Cái nào đã xong mà lệnh vẫn chạy, cái nào mới xuất hiện mà chưa có lệnh nào.",
          },
          {
            vi: "Lãi suất và phí",
            en: "Rates & fees",
            def: "Buổi rà soát tiền gửi của Chặng 12 nằm gọn ở đây - sổ nào đang chạy dưới mặt bằng, phí nào quay lại.",
          },
          {
            vi: "Lớp bảo vệ",
            en: "Protection",
            def: "Thẻ bảo hiểm còn hiệu lực không, nhu cầu bảo vệ có đổi không sau các thay đổi trong năm.",
          },
          {
            vi: "Trục các khoản lớn",
            en: "Big-ticket map",
            def: "Bản đồ của Chặng 18 có mốc nào dịch chuyển, có năm nào giờ mới thành năm chồng lấn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Kết thúc bằng ngày tháng, không bằng ý định",
        text: "Một buổi rà soát tạo ra vài phát hiện, và phần lớn chúng cần một hành động nhỏ: đổi một lệnh, chuyển một khoản, gia hạn một thẻ. Nếu chúng rời buổi rà soát dưới dạng ý định thì chúng sẽ xuất hiện lại y nguyên vào buổi rà soát năm sau. Gắn mỗi việc với một ngày cụ thể là khác biệt giữa một buổi có kết quả và một buổi chỉ để biết.",
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
      "Không ai nhớ được hai trăm bài học. Nhưng vài nguyên tắc đã xuất hiện lại ở gần như mọi chặng - từ ngân sách tới bất động sản, từ vàng tới lừa đảo - và chúng đủ để xử lý cả những tình huống chưa từng được dạy.",
    openingQuestion: "Nguyên tắc nào xuất hiện ở nhiều chặng nhất trong toàn bộ lộ trình?",
    openingOptions: [
      "Lợi suất cao luôn đi kèm rủi ro cao, không có ngoại lệ nào",
      "Khung thời gian của khoản tiền quyết định nơi nó nên được đặt",
      "Đa dạng hóa là cách duy nhất để giảm rủi ro trong đầu tư",
      "Tiết kiệm càng sớm thì kết quả cuối cùng càng lớn",
    ],
    correctOption: 1,
    explanation:
      "Nguyên tắc này quay lại ở hầu như mọi chặng dưới các hình thức khác nhau. Quỹ khẩn cấp phải rút được ngay nên nó chấp nhận lãi thấp. Tiền cho một mốc đã biết thì chọn kỳ hạn khớp mốc đó. Cổ phiếu chỉ hợp với tiền không cần dùng trong nhiều năm. Vàng và crypto thuộc nhóm dài hạn hơn nữa. Đất nền không hợp với bất kỳ mốc cụ thể nào. Và cùng một khoản tiền, cùng một người, nhưng khung thời gian khác nhau thì câu trả lời khác hẳn. Ba nguyên tắc còn lại đều đúng và đều quan trọng, nhưng chúng xuất hiện ở ít chặng hơn và thường là hệ quả của nguyên tắc này.",
    diagram: [
      { label: "Câu hỏi đầu tiên: khi nào cần khoản này", arrow: true },
      { label: "Khung thời gian quyết định nơi đặt", arrow: true },
      { label: "Lợi suất là kết quả, không phải điểm xuất phát", arrow: true },
      { label: "Nguyên tắc này áp cho mọi loại tài sản" },
    ],
    realWorldExample: {
      company: "Một câu hỏi cho một tài sản chưa từng học",
      description:
        "Người học xong track này gặp một sản phẩm tài chính chưa từng xuất hiện trong bất kỳ bài nào. Họ không cần biết tên nó: khoản tiền này để làm gì và khi nào cần, tài sản này tạo ra dòng tiền gì, chi phí giao dịch bao nhiêu, và nếu mọi thứ xấu nhất xảy ra thì mất bao nhiêu. Bốn câu ấy xử lý được phần lớn sản phẩm mà không cần một bài học riêng nào.",
    },
    quiz: [
      {
        question: "Câu hỏi nào áp dụng được cho mọi loại tài sản, kể cả loại chưa từng học?",
        options: [
          "Tài sản này tạo ra dòng tiền gì, và nếu không thì lãi đến từ đâu",
          "Tài sản này đã tăng giá bao nhiêu phần trăm trong năm vừa qua và trong ba năm gần đây",
          "Có bao nhiêu người đang nắm giữ tài sản này trên thị trường",
          "Tổ chức nào đang phát hành và uy tín của họ tới đâu",
        ],
        correct: 0,
        explanation:
          "Câu này chia mọi tài sản thành hai nhóm với hai cách định giá khác nhau, và nó là câu đầu tiên trong cả chặng vàng lẫn chặng crypto. Không có dòng tiền thì kết quả phụ thuộc hoàn toàn vào người mua sau.",
      },
      {
        question: "Nguyên tắc nào chung cho cả chi phí giao dịch của vàng và của cổ phiếu?",
        options: [
          "Chúng tính theo LẦN giao dịch, nên giao dịch nhiều lần thì trả nhiều lần",
          "Chúng tính theo thời gian nắm giữ nên giữ càng lâu trả càng nhiều",
          "Chúng được miễn nếu tổng giá trị giao dịch trong kỳ vượt một ngưỡng nhất định",
          "Chúng luôn thấp hơn phí quản lý của các quỹ đầu tư chuyên nghiệp",
        ],
        correct: 0,
        explanation:
          "Đây là điểm phân biệt với phí quản lý quỹ, vốn tính theo thời gian. Hai cấu trúc chi phí ngược nhau này quyết định chiến lược nào phù hợp với công cụ nào.",
      },
      {
        question: "Điểm chung của mọi kịch bản lừa đảo trong Chặng 16 là gì?",
        options: [
          "Chúng cần bạn hành động gấp, một mình, và qua kênh do chúng chọn",
          "Chúng luôn nhắm vào những người thiếu kiến thức tài chính cơ bản và ít kinh nghiệm",
          "Chúng đều xuất phát từ các số điện thoại và tài khoản mới lập",
          "Chúng đều hứa một mức lợi nhuận cụ thể bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Ba điều kiện này là cấu trúc chứ không phải chi tiết, nên chúng không đổi khi kịch bản đổi. Đó là lý do một quy tắc duy nhất phá được cả ba cùng lúc.",
      },
      {
        question: "Vì sao thứ tự các lớp trong danh mục lại quan trọng?",
        options: [
          "Vì mỗi lớp có một chức năng riêng, và lớp sau không thay được việc của lớp trước",
          "Vì các sản phẩm tài chính yêu cầu thứ tự tham gia theo quy định",
          "Vì lớp đầu tiên luôn cho mức lợi suất cao nhất trong toàn bộ danh mục đầu tư",
          "Vì thứ tự này quyết định mức thuế phải nộp cho từng loại tài sản",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp cho giá trị biết trước; tài sản sinh dòng tiền cho tăng trưởng; lớp phân tán giảm biến động. Vàng không làm được việc của quỹ khẩn cấp dù bạn có bao nhiêu vàng đi nữa.",
      },
      {
        question: "Điều gì quyết định một kế hoạch tài chính có thành công không?",
        options: [
          "Việc nó được duy trì qua nhiều năm, hơn là việc nó tối ưu tới đâu",
          "Việc nó chọn được đúng thời điểm vào và ra khỏi thị trường ở mỗi chu kỳ",
          "Việc nó đạt được lợi suất cao hơn mặt bằng chung mỗi năm",
          "Việc nó bao phủ đủ mọi loại tài sản có trên thị trường",
        ],
        correct: 0,
        explanation:
          "Đây là điều mà chặng cuối này tồn tại để nói. Một kế hoạch thô được duy trì hai mươi năm thắng một kế hoạch hoàn hảo bị bỏ sau ba tháng, và khoảng cách giữa hai kết quả ấy lớn hơn mọi chênh lệch về lợi suất.",
      },
    ],
    keyTakeaways: [
      "Khung thời gian của khoản tiền là câu hỏi đầu tiên ở gần như mọi chặng",
      "Hỏi tài sản này tạo ra dòng tiền gì - nó chia mọi tài sản thành hai nhóm",
      "Chi phí theo LẦN và chi phí theo THỜI GIAN đòi hỏi hai chiến lược ngược nhau",
      "Duy trì được quan trọng hơn tối ưu - đó là kết luận của cả track",
    ],
    practicePrompt: {
      question:
        "Bạn gặp một sản phẩm tài chính chưa từng học. Bốn câu hỏi nào nên đặt ra?",
      options: [
        "Khoản tiền này khi nào cần, nó tạo ra gì, chi phí bao nhiêu, xấu nhất mất bao nhiêu",
        "Ai đang bán nó, đã có bao nhiêu người mua, lợi suất năm ngoái là bao nhiêu",
        "Nó có được cấp phép không, tổ chức phát hành là ai, phí quản lý bao nhiêu",
        "Nó tăng giá bao nhiêu trong ba năm qua và dự báo năm tới thế nào",
      ],
      correct: 0,
      explanation:
        "Bốn câu này áp được cho mọi sản phẩm vì chúng hỏi về cấu trúc chứ không hỏi về danh tính hay lịch sử. Ba nhóm câu còn lại đều hữu ích nhưng chúng chỉ trả lời được sau khi bốn câu này đã cho bạn biết sản phẩm này có thuộc về bạn hay không.",
    },
    summary: {
      keyIdea: "Vài nguyên tắc lặp lại ở mọi chặng, và chúng xử lý được cả những gì chưa từng được dạy",
      commonMistake: "Cố nhớ từng sản phẩm thay vì nhớ vài câu hỏi áp được cho mọi sản phẩm",
      action: "Viết ra bốn câu hỏi của bài này và giữ chúng ở nơi bạn xem lại được.",
    },
    application: {
      title: "Bốn câu cho mọi quyết định tài chính",
      message:
        "Khoản tiền này khi nào tôi cần tới. Tài sản này tạo ra dòng tiền gì, hay lãi chỉ đến từ giá bán lại. Chi phí giao dịch và chi phí nắm giữ là bao nhiêu. Và nếu kịch bản xấu nhất xảy ra thì tôi mất bao nhiêu.",
      secondary:
        "Bốn câu này không đòi hỏi bạn biết tên sản phẩm. Chúng là thứ còn lại của hai mươi mốt chặng khi bạn đóng ứng dụng và đứng trước một quyết định thật.",
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
          "Khung thời gian quyết định nơi đặt tiền - lợi suất là kết quả, không phải điểm xuất phát",
          "Hỏi tài sản tạo ra dòng tiền gì; nếu không có thì lãi phụ thuộc hoàn toàn vào người mua sau",
          "Chi phí theo LẦN giao dịch phạt người giao dịch nhiều; chi phí theo THỜI GIAN phạt người giữ lâu",
          "Xây theo lớp: giá trị biết trước trước, tài sản sinh dòng tiền sau, lớp phân tán cuối cùng",
          "Duy trì được quan trọng hơn tối ưu - ở mọi chủ đề, không có ngoại lệ",
        ],
      },
      {
        type: "paragraph",
        text: "Năm nguyên tắc này không phải tóm tắt của track, chúng là những gì còn lại sau khi quên hết chi tiết. Chúng đã xuất hiện ở chặng ngân sách và chặng bất động sản, ở chặng vàng và chặng crypto, ở chặng lừa đảo và chặng hưu trí - mỗi lần dưới một hình thức khác nhau nhưng cùng một cấu trúc. Đó là lý do chúng dùng được cho cả những sản phẩm chưa ra đời.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi cho một sản phẩm chưa từng học",
        subtitle: "Chúng hỏi về cấu trúc, nên chúng không lỗi thời",
        concepts: [
          {
            vi: "Khi nào tôi cần khoản này",
            en: "Time horizon",
            def: "Câu hỏi đầu tiên và thường là câu duy nhất cần thiết. Nó loại bỏ phần lớn lựa chọn không phù hợp trước khi bàn tới bất cứ điều gì khác.",
          },
          {
            vi: "Nó tạo ra dòng tiền gì",
            en: "Cash flow",
            def: "Có thì định giá được bằng dòng tiền ấy. Không có thì kết quả phụ thuộc hoàn toàn vào việc có người trả giá cao hơn.",
          },
          {
            vi: "Chi phí là bao nhiêu",
            en: "Costs",
            def: "Cả chi phí giao dịch lẫn chi phí nắm giữ. Hai cấu trúc chi phí này quyết định chiến lược nào khả thi.",
          },
          {
            vi: "Xấu nhất thì mất bao nhiêu",
            en: "Downside",
            def: "Không phải kỳ vọng tăng bao nhiêu, mà mất bao nhiêu thì mình vẫn ổn. Đây là câu quyết định tỷ trọng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Điều duy nhất track này không dạy được",
        text: "Mọi thứ ở trên đều là kiến thức, và kiến thức là phần dễ. Phần khó là làm cùng vài việc đơn giản trong nhiều năm khi không có gì thú vị xảy ra - để dành đều, không đụng vào quỹ khẩn cấp, không hành động theo tin tức, ngồi xuống rà soát mỗi năm một lần. Không bài học nào thay được điều đó, và cũng không cần: hai mươi mốt chặng vừa rồi tồn tại chỉ để bạn biết chắc mình đang duy trì đúng vài việc.",
      },
      {
        type: "closing",
        lines: [
          "Hết lộ trình. Điều đáng giá nhất không phải bạn nhớ được bao nhiêu, mà là bạn còn lại vài câu hỏi dùng được ở mọi tình huống.",
          "Và câu hỏi đầu tiên, ở mọi chặng, vẫn luôn là: khoản tiền này để làm gì và khi nào tôi cần tới nó.",
        ],
      },
    ],
  },
];
