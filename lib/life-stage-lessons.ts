import type { Lesson } from "./lesson-types";

// Chặng 20 của track cá nhân: tài chính theo giai đoạn tuổi.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Mười chín chặng trước dạy từng công cụ riêng lẻ.
// Chặng này trả lời câu hỏi mà không chặng nào trả lời: ở tuổi của tôi, việc
// nào quan trọng nhất bây giờ. Cùng một lời khuyên đúng có thể vô dụng nếu đưa
// sai giai đoạn - bảo một người hai mươi tuổi tối ưu danh mục hưu trí, hay bảo
// một người năm mươi tuổi chấp nhận biến động cao, đều là dùng đúng công cụ ở
// sai thời điểm.
//
// Ids 390-393 nối tiếp Chặng 19 (380-384).

export const LIFE_STAGE_LESSONS: Lesson[] = [
  {
    id: 390,
    slug: "tai-chinh-tuoi-hai-muoi",
    title: "Chặng 20, Bài 1: Tuổi hai mươi - thói quen quan trọng hơn số tiền",
    subtitle: "Số tiền lúc này quá nhỏ để tạo khác biệt; thói quen thì không",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🌱",
    track: "personal",
    whyItMatters:
      "Đây là giai đoạn có ít tiền nhất và nhiều thời gian nhất - một tổ hợp khiến mọi lời khuyên về tối ưu hóa trở nên vô nghĩa, trong khi vài thói quen được thiết lập lúc này lại quyết định hai mươi năm sau.",
    openingQuestion: "Với người hai mươi tuổi mới đi làm, việc nào tạo khác biệt lớn nhất?",
    openingOptions: [
      "Chọn được kênh đầu tư có lợi suất cao nhất cho khoản tiết kiệm đầu tiên",
      "Thiết lập thói quen để dành đều đặn và tăng thu nhập, dù số tiền còn nhỏ",
      "Tích lũy đủ quỹ khẩn cấp sáu tháng trước khi làm bất cứ việc gì khác",
      "Mua bảo hiểm nhân thọ sớm để hưởng mức phí thấp của tuổi trẻ",
    ],
    correctOption: 1,
    explanation:
      "Ở tuổi này số tiền quá nhỏ để việc chọn kênh tạo ra khác biệt đáng kể - chênh lệch vài phần trăm lợi suất trên một khoản nhỏ là con số không đáng kể so với chênh lệch giữa để dành đều và không để dành gì. Ngược lại, thời gian thì nhiều nhất, và hai thứ tận dụng được thời gian là thói quen tiết kiệm được duy trì và thu nhập được nâng lên sớm. Quỹ khẩn cấp vẫn cần nhưng nó không phải điều kiện chặn mọi việc khác; mua bảo hiểm nhân thọ khi chưa có ai phụ thuộc thì thường chưa cần. Nói gọn: ở giai đoạn này, tỷ lệ để dành quan trọng hơn lợi suất, và tốc độ tăng thu nhập quan trọng hơn cả hai.",
    diagram: [
      { label: "Ít tiền nhất, nhiều thời gian nhất", arrow: true },
      { label: "Chọn kênh: tác động nhỏ vì số tiền nhỏ", arrow: true },
      { label: "Thói quen và thu nhập: tác động lớn nhất", arrow: true },
      { label: "Tối ưu hóa để dành cho giai đoạn sau" },
    ],
    realWorldExample: {
      company: "Hai lựa chọn ở tuổi hai mươi ba",
      description:
        "Một người dành nhiều tháng nghiên cứu để chọn kênh đầu tư tốt nhất cho khoản tiết kiệm mười triệu. Một người khác bỏ tiền vào chỗ đơn giản nhất và dành thời gian ấy học một kỹ năng nâng được thu nhập. Sau năm năm, chênh lệch lợi suất trên mười triệu là con số nhỏ; chênh lệch thu nhập thì lặp lại mỗi tháng và còn làm nền cho mọi lần tăng sau.",
    },
    quiz: [
      {
        question: "Vì sao việc chọn kênh đầu tư ít quan trọng ở tuổi hai mươi?",
        options: [
          "Vì số tiền còn nhỏ nên chênh lệch lợi suất tạo ra con số không đáng kể",
          "Vì người trẻ không được phép tham gia phần lớn kênh đầu tư chính thức trên thị trường",
          "Vì mọi kênh đầu tư đều cho lợi suất như nhau trong ngắn hạn",
          "Vì rủi ro đầu tư ở tuổi này cao hơn do thiếu kinh nghiệm",
        ],
        correct: 0,
        explanation:
          "Hai phần trăm chênh lệch trên mười triệu là hai trăm nghìn một năm. Cùng khoảng thời gian dùng để nghiên cứu có thể tạo ra khoản lớn hơn nhiều nếu dồn vào việc nâng thu nhập.",
      },
      {
        question: "Vì sao tỷ lệ để dành quan trọng hơn lợi suất ở giai đoạn này?",
        options: [
          "Vì bạn kiểm soát hoàn toàn tỷ lệ để dành, còn lợi suất thì không",
          "Vì tỷ lệ để dành cao sẽ được ngân hàng thưởng thêm lãi suất ưu đãi",
          "Vì lợi suất chỉ có ý nghĩa với các khoản đầu tư trên một tỷ đồng",
          "Vì để dành nhiều sẽ giúp bạn được vay với lãi suất thấp hơn sau này",
        ],
        correct: 0,
        explanation:
          "Đây là nguyên tắc chung nhưng nó mạnh nhất ở giai đoạn số tiền còn nhỏ. Bạn quyết định được tỷ lệ ngay hôm nay; lợi suất thì thị trường quyết định và bạn chỉ nhận kết quả.",
      },
      {
        question: "Thói quen nào đáng thiết lập nhất ở tuổi hai mươi?",
        options: [
          "Chuyển một phần thu nhập vào khoản riêng ngay khi lương về, tự động",
          "Ghi lại mọi khoản chi tiêu hằng ngày và phân loại chúng trong suốt nhiều năm liền",
          "Đọc tin tức thị trường mỗi ngày để nắm bắt cơ hội đầu tư",
          "So sánh mức chi tiêu của mình với bạn bè cùng độ tuổi",
        ],
        correct: 0,
        explanation:
          "Tự động hóa là thói quen duy nhất không cần được duy trì bằng ý chí. Nó thực hiện quyết định của bạn hàng trăm lần trong nhiều năm mà không cần bạn nhớ lại lần nào.",
      },
      {
        question: "Sai lầm phổ biến nhất của giai đoạn này là gì?",
        options: [
          "Để lạm phát lối sống nuốt hết phần thu nhập tăng thêm sau mỗi lần tăng lương",
          "Đầu tư quá thận trọng nên bỏ lỡ phần lớn giai đoạn tăng trưởng của thị trường chứng khoán",
          "Không mua đủ các loại bảo hiểm cần thiết ngay từ khi mới đi làm",
          "Chi quá ít cho bản thân nên không có động lực làm việc lâu dài",
        ],
        correct: 0,
        explanation:
          "Đây là lý do nhiều người thu nhập tăng gấp đôi sau mười năm mà tài sản ròng gần như đứng yên. Chi tiêu dâng theo thu nhập một cách tự nhiên nếu không có gì chặn lại.",
      },
      {
        question: "Khi nào nên bắt đầu quan tâm tới việc tối ưu danh mục đầu tư?",
        options: [
          "Khi khoản tích lũy đã đủ lớn để chênh lệch lợi suất tạo ra con số đáng kể",
          "Ngay từ khoản tiết kiệm đầu tiên để tạo thói quen quản lý danh mục",
          "Sau khi đã hoàn thành mọi mục tiêu lớn của đời như mua nhà, mua xe và lập gia đình",
          "Khi thị trường bước vào giai đoạn tăng trưởng rõ rệt và ổn định",
        ],
        correct: 0,
        explanation:
          "Không có ngưỡng cố định, nhưng nguyên tắc thì rõ: công sức nên đi vào chỗ tạo ra khác biệt lớn nhất. Với khoản nhỏ đó là tỷ lệ để dành và thu nhập; khi khoản đã lớn thì trọng tâm dịch chuyển.",
      },
    ],
    keyTakeaways: [
      "Ít tiền nhất, nhiều thời gian nhất - nên thói quen quan trọng hơn tối ưu hóa",
      "Bạn kiểm soát tỷ lệ để dành; lợi suất thì không",
      "Tự động hóa là thói quen duy nhất không cần duy trì bằng ý chí",
      "Lạm phát lối sống là thứ làm mười năm tăng lương không đổi được tài sản ròng",
    ],
    practicePrompt: {
      question:
        "Bạn hai mươi ba tuổi, vừa được tăng lương ba triệu mỗi tháng. Việc nên làm ngay?",
      options: [
        "Tăng khoản chuyển tự động lên trước khi phần tăng kịp hòa vào chi tiêu",
        "Giữ nguyên mức để dành và dùng phần tăng để nâng chất lượng sống",
        "Dùng toàn bộ phần tăng để đầu tư vào kênh có lợi suất cao nhất",
        "Chờ vài tháng xem mức thu nhập mới có ổn định không rồi mới quyết định",
      ],
      correct: 0,
      explanation:
        "Khoảng thời gian ngay sau khi tăng lương là cửa sổ duy nhất mà phần tăng chưa được coi là mặc định. Sau vài tháng, mức sống đã dâng lên và việc cắt lại khó hơn nhiều so với việc không để nó dâng.",
    },
    summary: {
      keyIdea: "Ở tuổi hai mươi, tỷ lệ để dành và tốc độ tăng thu nhập quan trọng hơn lợi suất rất nhiều",
      commonMistake: "Dành nhiều công sức tối ưu một khoản nhỏ, trong khi để lạm phát lối sống ăn phần tăng lương",
      action: "Đặt lệnh chuyển tự động ngay khi lương về, và tăng nó mỗi lần thu nhập tăng.",
    },
    application: {
      title: "Một lệnh tự động, một quy tắc",
      message:
        "Đặt lệnh chuyển một phần lương vào khoản riêng ngay ngày lương về. Quy tắc kèm theo: mỗi lần tăng lương, nâng lệnh đó lên trước khi tiêu bất cứ đồng nào của phần tăng.",
      secondary:
        "Hai việc này mất mười lăm phút để thiết lập và chúng chạy trong nhiều năm. Không việc nào trong chặng này có tỷ lệ giữa công sức và kết quả tốt hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười chín chặng trước dạy từng công cụ. Chặng này trả lời câu hỏi còn lại: ở tuổi của tôi, việc nào đáng làm trước - vì cùng một lời khuyên đúng có thể vô dụng nếu đưa sai giai đoạn.",
      },
      { type: "heading", text: "Ít tiền, nhiều thời gian" },
      {
        type: "paragraph",
        text: "Tổ hợp này quyết định mọi ưu tiên của giai đoạn. Khi số tiền còn nhỏ, chênh lệch lợi suất giữa các kênh tạo ra con số không đáng kể - trong khi chênh lệch giữa để dành mười phần trăm và không để dành gì thì lớn hơn nhiều lần. Và khi thời gian còn nhiều, hai thứ tận dụng được nó tốt nhất là một thói quen được duy trì và một mức thu nhập được nâng lên sớm, vì cả hai đều cộng dồn.",
      },
      {
        type: "conceptTable",
        title: "Ba việc, xếp theo tác động ở giai đoạn này",
        subtitle: "Thứ tự này đảo ngược khi khoản tích lũy đã lớn",
        concepts: [
          {
            vi: "Tăng thu nhập",
            en: "Grow income",
            def: "Tác động lớn nhất và cộng dồn mạnh nhất - Chặng 11 nói kỹ. Ở tuổi này, một kỹ năng mới đáng giá hơn một chiến lược đầu tư.",
          },
          {
            vi: "Tỷ lệ để dành",
            en: "Savings rate",
            def: "Bạn kiểm soát hoàn toàn, và nó quyết định nhiều hơn lợi suất khi số tiền còn nhỏ.",
          },
          {
            vi: "Chọn kênh đầu tư",
            en: "Asset selection",
            def: "Quan trọng thật, nhưng tác động tỷ lệ với quy mô khoản tiền. Nó sẽ thành ưu tiên hàng đầu ở giai đoạn sau.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cửa sổ ngay sau khi tăng lương",
        text: "Có một khoảng vài tuần sau mỗi lần tăng lương mà phần tăng chưa được coi là mặc định. Nâng khoản để dành trong khoảng ấy gần như không gây cảm giác mất mát. Để qua vài tháng, mức sống đã dâng lên và cùng một hành động lúc đó là một khoản cắt giảm - khó hơn hẳn.",
      },
      {
        type: "closing",
        lines: [
          "Ở giai đoạn này, việc bạn làm quan trọng hơn nhiều so với việc bạn làm tối ưu tới đâu.",
          "Bài sau: tuổi ba mươi - giai đoạn mọi khoản lớn chồng lên nhau.",
        ],
      },
    ],
  },
  {
    id: 391,
    slug: "tai-chinh-tuoi-ba-muoi",
    title: "Chặng 20, Bài 2: Tuổi ba mươi - giai đoạn chồng lấn",
    subtitle: "Thu nhập cao hơn hẳn tuổi hai mươi, và mọi khoản lớn đều tới cùng lúc",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🏗️",
    track: "personal",
    whyItMatters:
      "Đây là giai đoạn áp lực tài chính lớn nhất của phần lớn người: cưới, nhà, con, và bố mẹ bắt đầu già - tất cả trong khoảng mười năm, đúng lúc thu nhập vừa đủ để mọi thứ trông khả thi nhưng chưa đủ để làm tất cả cùng lúc.",
    openingQuestion: "Đặc điểm tài chính nổi bật nhất của giai đoạn ba mươi tuổi là gì?",
    openingOptions: [
      "Thu nhập đạt đỉnh nên có thể thực hiện mọi mục tiêu lớn cùng lúc",
      "Nhiều khoản chi lớn chồng lên nhau trong khi thu nhập chưa đạt đỉnh",
      "Rủi ro sức khỏe tăng cao nên chi phí y tế trở thành khoản lớn nhất",
      "Thời gian tích lũy còn lại quá ngắn nên phải chấp nhận rủi ro cao hơn",
    ],
    correctOption: 1,
    explanation:
      "Chặng 18 đã chỉ ra rằng vấn đề không nằm ở từng khoản mà ở những năm chúng chồng lên nhau, và giai đoạn này chính là nơi chúng chồng lên nhau nhiều nhất. Cưới hỏi, khoản trả trước mua nhà, đứa con đầu lòng và những khoản định kỳ đi kèm thường rơi vào cùng một quãng vài năm. Thu nhập lúc này cao hơn hẳn tuổi hai mươi - đủ để mỗi mục tiêu riêng lẻ trông khả thi - nhưng nó thường chưa đạt đỉnh, nên làm tất cả cùng lúc thì không. Chính khoảng cách giữa cảm giác khả thi và khả năng thật là chỗ nhiều gia đình vay nhiều hơn mức nên vay.",
    diagram: [
      { label: "Cưới, nhà, con dồn vào một quãng ngắn", arrow: true },
      { label: "Thu nhập cao hơn nhưng chưa đạt đỉnh", arrow: true },
      { label: "Mỗi mục tiêu riêng lẻ trông khả thi", arrow: true },
      { label: "Nên phải chọn thứ tự, không thể làm hết" },
    ],
    realWorldExample: {
      company: "Ba việc trong bốn năm",
      description:
        "Một cặp vợ chồng ba mươi mốt tuổi: cưới năm ngoái, mua nhà năm nay, dự định sinh con năm sau. Mỗi quyết định khi cân nhắc riêng đều nằm trong khả năng của thu nhập hiện tại. Nhưng khoản trả góp mua nhà, chi phí nuôi con và việc một người giảm giờ làm chồng lên nhau ở năm thứ ba - và lúc đó không còn phương án nào rẻ để điều chỉnh.",
    },
    quiz: [
      {
        question: "Vì sao giai đoạn này dễ vay nhiều hơn mức nên vay?",
        options: [
          "Vì mỗi mục tiêu riêng lẻ đều trông khả thi khi so với thu nhập hiện tại",
          "Vì ngân hàng ưu tiên cho vay nhóm tuổi này với hạn mức cao nhất",
          "Vì lãi suất cho vay thường thấp nhất đối với người trong độ tuổi lao động",
          "Vì chi phí sinh hoạt ở giai đoạn này thấp hơn các giai đoạn khác",
        ],
        correct: 0,
        explanation:
          "Mỗi lần cân nhắc, người ta so một khoản với thu nhập chứ không so tổng của những gì đang tới. Phép so từng khoản luôn cho ra câu trả lời lạc quan hơn thực tế.",
      },
      {
        question: "Việc nào quan trọng nhất ở giai đoạn này?",
        options: [
          "Xếp thứ tự các mục tiêu và chấp nhận không làm tất cả cùng lúc",
          "Tối đa hóa hạn mức vay để thực hiện được nhiều mục tiêu nhất",
          "Tập trung toàn bộ nguồn lực vào mục tiêu mua nhà trước tiên",
          "Hoãn mọi mục tiêu lớn cho tới khi thu nhập đạt mức cao nhất",
        ],
        correct: 0,
        explanation:
          "Hoãn tất cả không khả thi vì một số mục tiêu có ràng buộc sinh học hoặc xã hội. Xếp thứ tự là việc khó nhưng nó là việc duy nhất còn làm được khi chưa tới thời điểm.",
      },
      {
        question: "Vì sao quỹ khẩn cấp đặc biệt quan trọng ở giai đoạn này?",
        options: [
          "Vì số người phụ thuộc và nghĩa vụ nợ đều đang ở mức cao nhất",
          "Vì thu nhập ở giai đoạn này biến động nhiều hơn các giai đoạn khác",
          "Vì đây là giai đoạn duy nhất bắt buộc phải có quỹ khẩn cấp",
          "Vì lãi suất tiền gửi thường cao nhất trong giai đoạn này",
        ],
        correct: 0,
        explanation:
          "Một sự cố ở tuổi hai mươi ảnh hưởng tới một người. Cùng sự cố ở tuổi ba mươi lăm ảnh hưởng tới cả gia đình, và nó xảy ra khi khoản vay mua nhà vẫn phải trả đúng hạn mỗi tháng.",
      },
      {
        question: "Vế bảo vệ nào trở nên cần thiết ở giai đoạn này mà tuổi hai mươi thì chưa?",
        options: [
          "Bảo vệ vế thu nhập, vì giờ đã có người phụ thuộc vào nó",
          "Bảo hiểm cho các tài sản có giá trị lớn như xe và nhà",
          "Bảo hiểm y tế bổ sung ngoài bảo hiểm y tế cơ bản",
          "Bảo hiểm cho các khoản đầu tư dài hạn đang nắm giữ",
        ],
        correct: 0,
        explanation:
          "Chặng 19 đã nói yếu tố quyết định là có ai phụ thuộc vào dòng thu nhập ấy không. Ở tuổi hai mươi thường chưa có; ở giai đoạn này thì thường đã có cả con nhỏ lẫn khoản vay dài hạn.",
      },
      {
        question: "Sai lầm phổ biến khi cả hai vợ chồng cùng đi làm là gì?",
        options: [
          "Lập kế hoạch dựa trên hai nguồn thu nhập mà không tính tình huống chỉ còn một",
          "Chia tách hoàn toàn tài chính nên không có kế hoạch chung nào",
          "Dùng toàn bộ thu nhập của một người cho chi tiêu và người kia để dành",
          "Không mở tài khoản chung nên khó theo dõi chi tiêu của gia đình",
        ],
        correct: 0,
        explanation:
          "Khoản vay được duyệt trên hai nguồn thu và mức sống được xây trên hai nguồn thu. Nhưng sinh con, bệnh tật hay mất việc đều có thể rút xuống còn một - và kế hoạch cần chịu được kịch bản đó.",
      },
    ],
    keyTakeaways: [
      "Đây là giai đoạn các khoản lớn chồng lên nhau nhiều nhất, đúng lúc thu nhập chưa đạt đỉnh",
      "Mỗi mục tiêu riêng lẻ trông khả thi - đó là lý do dễ vay quá mức",
      "Xếp thứ tự và chấp nhận không làm hết là việc duy nhất còn làm được sớm",
      "Kế hoạch dựa trên hai nguồn thu cần chịu được kịch bản chỉ còn một",
    ],
    practicePrompt: {
      question:
        "Vợ chồng bạn ba mươi hai tuổi, muốn mua nhà và sinh con trong hai năm tới. Việc nên làm trước?",
      options: [
        "Đặt cả hai lên trục thời gian và tính kịch bản chỉ còn một nguồn thu nhập",
        "Ưu tiên mua nhà trước vì giá bất động sản có xu hướng tăng theo thời gian",
        "Ưu tiên sinh con trước vì yếu tố tuổi tác quan trọng hơn yếu tố giá cả",
        "Vay tối đa cho khoản mua nhà để giữ lại tiền mặt cho việc sinh con",
      ],
      correct: 0,
      explanation:
        "Thứ tự đúng phụ thuộc vào hoàn cảnh của từng gia đình, nên không có câu trả lời chung. Nhưng phép tính kịch bản một nguồn thu thì ai cũng cần làm - và nó thường thay đổi cả thứ tự lẫn quy mô của cả hai mục tiêu.",
    },
    summary: {
      keyIdea: "Giai đoạn này không thiếu khả năng cho từng mục tiêu, nó thiếu khả năng cho tất cả cùng lúc",
      commonMistake: "Cân nhắc từng mục tiêu riêng lẻ và lập kế hoạch dựa trên hai nguồn thu nhập ổn định",
      action: "Đặt mọi mục tiêu lớn của năm năm tới lên một trục và tính kịch bản một nguồn thu.",
    },
    application: {
      title: "Hai phép kiểm cho giai đoạn này",
      message:
        "Thứ nhất: đặt mọi mục tiêu lớn lên một trục thời gian và tìm những năm chồng lấn. Thứ hai: tính lại kế hoạch với giả định chỉ còn một nguồn thu nhập trong sáu tháng.",
      secondary:
        "Nếu phép kiểm thứ hai cho kết quả không sống được, đó không phải lý do để bỏ mục tiêu - nhưng nó là lý do để điều chỉnh quy mô hoặc thứ tự khi còn kịp.",
    },
    sections: [
      {
        type: "lead",
        text: "Nếu tuổi hai mươi là giai đoạn ít tiền và nhiều thời gian, tuổi ba mươi là giai đoạn nhiều tiền hơn và ít khoảng trống hơn - mọi khoản lớn trong đời đều muốn xảy ra trong cùng một thập kỷ.",
      },
      { type: "heading", text: "Khoảng cách giữa khả thi và làm được" },
      {
        type: "paragraph",
        text: "Thu nhập ở giai đoạn này đủ để mỗi mục tiêu riêng lẻ trông vừa tầm: đám cưới vừa tầm, khoản trả trước vừa tầm, chi phí nuôi con vừa tầm. Nhưng ba thứ ấy không đến lần lượt mà chồng lên nhau, và phép so từng khoản với thu nhập không bao giờ cho thấy điều đó. Đây là lý do giai đoạn này tạo ra nhiều khoản vay vượt sức nhất - không phải vì ai đó tính sai, mà vì họ tính từng khoản một.",
      },
      {
        type: "callout",
        label: "Kế hoạch nên chịu được kịch bản một nguồn thu",
        text: "Khoản vay được duyệt trên hai bảng lương, và mức sống cũng được xây trên hai bảng lương. Nhưng sinh con, bệnh tật hoặc một đợt mất việc đều có thể rút xuống còn một - và ba tình huống ấy đều có xác suất cao nhất chính trong giai đoạn này. Một kế hoạch chỉ chạy được khi cả hai cùng đi làm là một kế hoạch không có lớp đệm nào.",
      },
      {
        type: "list",
        items: [
          "Đặt mọi mục tiêu lớn lên một trục thời gian - Chặng 18 đã có công cụ này",
          "Chọn trước thứ tự, và chọn trước mục tiêu nào sẽ giảm quy mô nếu cần",
          "Tính kịch bản chỉ còn một nguồn thu trong sáu tháng",
          "Bổ sung lớp bảo vệ vế thu nhập - giờ đã có người phụ thuộc vào nó",
        ],
      },
      {
        type: "closing",
        lines: [
          "Giai đoạn này không thiếu khả năng cho từng việc; nó thiếu khả năng cho tất cả cùng lúc.",
          "Bài sau: tuổi bốn mươi - đỉnh thu nhập và cửa sổ cuối cùng.",
        ],
      },
    ],
  },
  {
    id: 392,
    slug: "tai-chinh-tuoi-bon-muoi-nam-muoi",
    title: "Chặng 20, Bài 3: Tuổi bốn mươi và năm mươi",
    subtitle: "Thu nhập cao nhất, và cửa sổ tích lũy cuối cùng đang khép lại",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⏳",
    track: "personal",
    whyItMatters:
      "Đây là giai đoạn có khả năng tích lũy lớn nhất và cũng là giai đoạn cuối còn đủ thời gian để phần tích lũy sinh lời đáng kể. Sau đó, mọi thiếu hụt chỉ còn cách bù bằng tiết kiệm nhiều hơn chứ không còn thời gian để bù bằng tăng trưởng.",
    openingQuestion: "Vì sao giai đoạn bốn mươi tới năm mươi là cửa sổ quan trọng nhất?",
    openingOptions: [
      "Vì thu nhập thường cao nhất trong khi các khoản chi lớn đã qua phần nặng nhất",
      "Vì đây là giai đoạn thị trường tài chính cho lợi suất cao nhất theo lịch sử",
      "Vì các sản phẩm đầu tư dài hạn chỉ mở cho người trên bốn mươi tuổi",
      "Vì chi phí sinh hoạt giảm mạnh khi con cái đã lớn và tự lập",
    ],
    correctOption: 0,
    explanation:
      "Ở giai đoạn này thu nhập thường đạt hoặc gần đạt đỉnh của cả sự nghiệp, trong khi khoản trả trước mua nhà đã xong và chi phí nuôi con nhỏ đã qua phần nặng nhất. Khoảng chênh lệch giữa thu nhập và chi tiêu vì thế rộng nhất - đây là cửa sổ tích lũy lớn nhất mà nhiều người có. Đồng thời vẫn còn mười lăm tới hai mươi năm trước khi nghỉ hưu, đủ để phần tích lũy sinh lời đáng kể. Sau giai đoạn này, khoảng thời gian ấy ngắn lại nhanh, và mọi thiếu hụt chỉ còn cách bù bằng để dành nhiều hơn - một cách đắt hơn hẳn. Chi phí sinh hoạt thường chưa giảm ở đây vì học phí của con đang vào giai đoạn cao nhất.",
    diagram: [
      { label: "Thu nhập gần đỉnh sự nghiệp", arrow: true },
      { label: "Khoản nặng nhất của giai đoạn trước đã qua", arrow: true },
      { label: "Còn 15-20 năm để phần tích lũy sinh lời", arrow: true },
      { label: "Sau đây chỉ còn cách bù bằng để dành nhiều hơn" },
    ],
    realWorldExample: {
      company: "Cùng một khoản thiếu, hai thời điểm phát hiện",
      description:
        "Hai người cùng phát hiện mình thiếu cho kế hoạch hưu trí. Người thứ nhất phát hiện ở tuổi bốn mươi hai và còn hai mươi năm để xử lý - phần tích lũy thêm mỗi tháng còn có thời gian sinh lời. Người thứ hai phát hiện ở tuổi năm mươi tám và chỉ còn vài năm, nên gần như toàn bộ khoản thiếu phải được bù bằng chính tiền để dành. Cùng một khoản thiếu, hai mức khó khác hẳn nhau.",
    },
    quiz: [
      {
        question: "Vì sao phát hiện thiếu hụt sớm lại dễ xử lý hơn nhiều?",
        options: [
          "Vì còn thời gian để phần tích lũy thêm sinh lời, thay vì phải bù toàn bộ bằng tiền",
          "Vì các sản phẩm đầu tư dành cho người trẻ có mức phí thấp hơn",
          "Vì thu nhập ở tuổi bốn mươi luôn cao hơn thu nhập ở tuổi năm mươi, theo mọi khảo sát lương",
          "Vì chi phí sinh hoạt của gia đình giảm dần theo từng năm tuổi",
        ],
        correct: 0,
        explanation:
          "Đây là cùng cơ chế mà Chặng 3 nói về sức mạnh của thời gian, nhìn từ phía ngược lại: mỗi năm trôi qua làm phần đóng góp của tăng trưởng nhỏ đi và phần phải tự bỏ ra lớn lên.",
      },
      {
        question: "Khoản chi nào thường đạt đỉnh ở giai đoạn này?",
        options: [
          "Học phí cho con ở bậc học cao, cùng với chi phí chăm sóc bố mẹ già",
          "Chi phí nuôi con nhỏ trong những năm đầu đời của trẻ",
          "Khoản trả trước và mọi chi phí liên quan tới việc mua căn nhà đầu tiên của gia đình",
          "Chi phí tổ chức cưới hỏi và các sự kiện lớn của gia đình",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ hai chặng trước gặp nhau: học phí bậc cao và chăm sóc bố mẹ có thể rơi vào cùng một thập kỷ, và cả hai đều thuộc nhóm khoản lớn biết trước được.",
      },
      {
        question: "Danh mục đầu tư nên thay đổi thế nào khi tiến gần tuổi nghỉ hưu?",
        options: [
          "Giảm dần tỷ trọng tài sản biến động mạnh khi khoảng thời gian còn lại ngắn đi",
          "Tăng tỷ trọng tài sản biến động mạnh để bù cho thời gian còn lại ít",
          "Giữ nguyên tỷ trọng vì mỗi lần thay đổi danh mục đều làm phát sinh chi phí giao dịch",
          "Chuyển toàn bộ sang tiền gửi ngay khi bước sang tuổi năm mươi",
        ],
        correct: 0,
        explanation:
          "Tăng rủi ro để bù thời gian là phản xạ dễ hiểu và là sai lầm tốn kém nhất ở giai đoạn này - một đợt giảm sâu khi còn năm năm thì không đủ thời gian hồi phục. Còn chuyển toàn bộ sang tiền gửi thì quá sớm ở tuổi năm mươi.",
      },
      {
        question: "Việc nào nên làm ở đầu giai đoạn này?",
        options: [
          "Tính xem mức tích lũy hiện tại đủ cho bao nhiêu năm sau khi nghỉ làm",
          "Chuyển toàn bộ danh mục sang các kênh có lợi suất cao nhất thị trường",
          "Trả hết mọi khoản nợ hiện có trước khi tiếp tục tích lũy thêm",
          "Giảm chi tiêu xuống mức tối thiểu để tối đa hóa phần để dành",
        ],
        correct: 0,
        explanation:
          "Phép tính này cho biết bạn đang ở đâu so với đích, và nó là điều kiện để mọi quyết định sau đó có cơ sở. Làm nó ở tuổi bốn mươi còn đủ thời gian để điều chỉnh; làm ở tuổi năm mươi tám thì chỉ còn để biết.",
      },
      {
        question: "Vì sao đây là giai đoạn cuối để tăng thu nhập tạo ra khác biệt lớn?",
        options: [
          "Vì phần thu nhập tăng thêm còn nhiều năm để được tích lũy và sinh lời",
          "Vì sau tuổi năm mươi thì pháp luật hạn chế việc thay đổi công việc và ngành nghề",
          "Vì mức lương trong ngành tài chính giảm dần sau tuổi năm mươi",
          "Vì các cơ hội thăng tiến chỉ dành cho người dưới năm mươi tuổi",
        ],
        correct: 0,
        explanation:
          "Chặng 11 nói mỗi lần tăng lương lặp lại mọi tháng sau đó. Giá trị của việc lặp lại ấy phụ thuộc vào còn bao nhiêu tháng phía trước - và đó là con số đang giảm dần.",
      },
    ],
    keyTakeaways: [
      "Cửa sổ tích lũy lớn nhất: thu nhập gần đỉnh, khoản nặng của giai đoạn trước đã qua",
      "Phát hiện thiếu hụt sớm dễ xử lý hơn nhiều vì còn thời gian để tăng trưởng góp phần",
      "Học phí bậc cao và chăm sóc bố mẹ có thể rơi vào cùng thập kỷ này",
      "Giảm dần tài sản biến động khi thời gian còn lại ngắn - đừng tăng rủi ro để bù thời gian",
    ],
    practicePrompt: {
      question:
        "Bạn bốn mươi ba tuổi và chưa từng tính xem mình cần bao nhiêu để nghỉ hưu. Nên làm gì?",
      options: [
        "Làm phép tính đó ngay, vì còn khoảng hai mươi năm để điều chỉnh nếu thiếu",
        "Tập trung tăng tỷ trọng cổ phiếu để bù cho những năm chưa tích lũy",
        "Chờ tới khi con cái học xong để có bức tranh chi tiêu rõ ràng hơn",
        "Ưu tiên trả hết khoản vay mua nhà trước khi tính chuyện hưu trí",
      ],
      correct: 0,
      explanation:
        "Chờ tới khi con học xong là chờ mất mười năm quý nhất trong cả cửa sổ này. Phép tính có thể sai số nhưng nó cho bạn một con số để điều chỉnh - còn không có con số nào thì không biết mình đang thiếu hay đủ.",
    },
    summary: {
      keyIdea: "Đây là cửa sổ tích lũy lớn nhất và cuối cùng còn đủ thời gian để tăng trưởng góp phần",
      commonMistake: "Hoãn phép tính hưu trí tới khi các khoản chi khác xong, tức hoãn qua hết cửa sổ",
      action: "Tính xem mức tích lũy hiện tại đủ cho bao nhiêu năm sau khi ngừng đi làm.",
    },
    application: {
      title: "Một phép tính, làm trong tuần này",
      message:
        "Ước tính chi tiêu một năm khi nghỉ làm, nhân với số năm bạn dự kiến sống sau đó. Đặt con số ấy cạnh mức tích lũy hiện tại - khoảng cách là thứ bạn còn hai mươi năm để xử lý.",
      secondary:
        "Phép tính này có sai số lớn và điều đó không sao. Giá trị của nó không nằm ở độ chính xác mà ở chỗ nó biến một nỗi lo mơ hồ thành một con số có thể hành động.",
    },
    sections: [
      {
        type: "lead",
        text: "Nếu tuổi ba mươi là giai đoạn mọi thứ chồng lên nhau, giai đoạn này là lúc phần nặng nhất đã qua và thu nhập thì gần đỉnh. Đó là cửa sổ tích lũy lớn nhất - và nó không mở lại.",
      },
      { type: "heading", text: "Vì sao thời điểm phát hiện quan trọng hơn quy mô thiếu hụt" },
      {
        type: "paragraph",
        text: "Một khoản thiếu hụt phát hiện ở tuổi bốn mươi hai có hai mươi năm để được lấp bằng cả tiền để dành lẫn phần sinh lời của nó. Cùng khoản ấy phát hiện ở tuổi năm mươi tám chỉ còn vài năm, nên gần như toàn bộ phải được lấp bằng tiền để dành trực tiếp - tức là cần một mức để dành cao hơn nhiều lần. Đây là lý do phép tính hưu trí nên được làm ở đầu giai đoạn này chứ không phải ở cuối.",
      },
      {
        type: "conceptTable",
        title: "Ba việc của giai đoạn này",
        subtitle: "Thứ tự quan trọng vì cửa sổ đang khép lại",
        concepts: [
          {
            vi: "Đo khoảng cách",
            en: "Measure the gap",
            def: "Tính mức cần cho hưu trí và so với mức đang có. Phải làm đầu tiên vì mọi quyết định sau đều cần con số này.",
          },
          {
            vi: "Tối đa hóa phần dư",
            en: "Widen the gap",
            def: "Khoảng chênh giữa thu nhập và chi tiêu rộng nhất ở giai đoạn này. Giữ cho lạm phát lối sống không lấp đầy nó.",
          },
          {
            vi: "Giảm dần rủi ro",
            en: "De-risk gradually",
            def: "Không phải ngay lập tức, mà theo thời gian còn lại. Đừng tăng rủi ro để bù cho những năm đã mất.",
          },
        ],
      },
      {
        type: "callout",
        label: "Tăng rủi ro để bù thời gian là sai lầm đắt nhất ở đây",
        text: "Phản xạ khi thấy mình chậm là dồn vào tài sản có kỳ vọng cao hơn. Nhưng biến động cao chỉ chấp nhận được khi còn đủ thời gian chờ hồi phục - và đó chính là thứ đang thiếu. Một đợt giảm sâu khi còn năm năm không có cách nào bù lại, trong khi cùng đợt giảm ấy ở tuổi ba mươi chỉ là một quãng trên đường dài.",
      },
      {
        type: "closing",
        lines: [
          "Cửa sổ này rộng nhất và cũng là cửa sổ cuối cùng còn có thời gian đứng về phía bạn.",
          "Bài cuối chặng: chuyển từ tích lũy sang sử dụng.",
        ],
      },
    ],
  },
  {
    id: 393,
    slug: "chuyen-tu-tich-luy-sang-su-dung",
    title: "Chặng 20, Bài 4: Tổng kết - chuyển từ tích lũy sang sử dụng",
    subtitle: "Cả ba giai đoạn trước đều là xây; giai đoạn cuối là một bài toán khác hẳn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🌅",
    track: "personal",
    whyItMatters:
      "Phần lớn kiến thức tài chính cá nhân nói về việc tích lũy. Nhưng giai đoạn sử dụng có bài toán riêng và một rủi ro không tồn tại ở giai đoạn trước: tiền hết trước khi đời hết.",
    openingQuestion: "Rủi ro lớn nhất của giai đoạn sau khi ngừng đi làm là gì?",
    openingOptions: [
      "Thị trường giảm mạnh làm giá trị danh mục đầu tư sụt xuống",
      "Sống lâu hơn số năm mà khoản tích lũy đủ chi trả",
      "Lạm phát làm chi phí sinh hoạt tăng nhanh hơn dự kiến ban đầu",
      "Chi phí y tế phát sinh vượt quá khả năng chi trả của quỹ hưu trí",
    ],
    correctOption: 1,
    explanation:
      "Ba rủi ro còn lại đều có thật và đều nghiêm trọng, nhưng chúng đều là các cách khiến rủi ro thứ hai xảy ra sớm hơn. Rủi ro gốc là sống lâu hơn tiền - và điều làm nó khó xử lý là bạn không biết mình cần chuẩn bị cho bao nhiêu năm. Một kế hoạch tính đủ cho hai mươi năm sẽ thất bại nếu bạn sống hai mươi lăm năm, và không có cách nào biết trước con số đúng. Đây là lý do giai đoạn sử dụng cần một cách tiếp cận khác giai đoạn tích lũy: không phải tối đa hóa lợi suất, mà là bảo đảm dòng tiền không cạn trong một khoảng thời gian chưa biết.",
    diagram: [
      { label: "Giai đoạn tích lũy: tối đa hóa phần tăng", arrow: true },
      { label: "Giai đoạn sử dụng: bảo đảm không cạn", arrow: true },
      { label: "Rủi ro gốc: sống lâu hơn tiền", arrow: true },
      { label: "Và không ai biết trước cần chuẩn bị bao nhiêu năm" },
    ],
    realWorldExample: {
      company: "Cùng một danh mục, hai thứ tự thị trường",
      description:
        "Hai người nghỉ làm cùng năm với danh mục giống hệt nhau và rút cùng một mức mỗi năm. Người thứ nhất gặp vài năm thị trường tốt ngay sau khi nghỉ; người thứ hai gặp một đợt giảm sâu trong ba năm đầu. Về dài hạn lợi suất trung bình của hai người gần như nhau, nhưng người thứ hai rút tiền ra đúng lúc danh mục đang thấp - và điều đó làm khoản của họ cạn sớm hơn nhiều năm.",
    },
    quiz: [
      {
        question: "Vì sao thứ tự các năm tốt xấu lại quan trọng ở giai đoạn rút tiền?",
        options: [
          "Vì rút tiền khi danh mục đang thấp làm giảm phần còn lại có thể hồi phục",
          "Vì thuế suất áp dụng khác nhau tùy vào kết quả đầu tư của từng năm",
          "Vì các quỹ đầu tư giới hạn số lần rút tiền trong những năm thị trường xấu",
          "Vì lợi suất trung bình dài hạn thay đổi theo thứ tự các năm tốt xấu",
        ],
        correct: 0,
        explanation:
          "Trong giai đoạn tích lũy, thứ tự không quan trọng vì bạn không rút gì ra. Khi đã rút đều đặn, một đợt giảm sớm buộc bạn bán nhiều đơn vị hơn cho cùng một số tiền - và phần bán đi đó không còn để hồi phục.",
      },
      {
        question: "Mục tiêu của danh mục thay đổi thế nào ở giai đoạn này?",
        options: [
          "Từ tối đa hóa tăng trưởng sang bảo đảm dòng tiền ổn định và không cạn",
          "Từ đa dạng hóa rộng sang tập trung vào vài tài sản có lợi suất cao nhất",
          "Từ nắm giữ dài hạn sang giao dịch thường xuyên để tạo dòng tiền",
          "Từ tài sản trong nước sang tài sản quốc tế để phân tán rủi ro",
        ],
        correct: 0,
        explanation:
          "Đây là thay đổi về mục tiêu chứ không chỉ về tỷ trọng. Một danh mục tốt cho giai đoạn tích lũy có thể hoàn toàn không phù hợp cho giai đoạn rút tiền, dù lợi suất kỳ vọng của nó cao hơn.",
      },
      {
        question: "Vì sao vẫn nên giữ một phần tài sản tăng trưởng sau khi nghỉ làm?",
        options: [
          "Vì giai đoạn sử dụng có thể kéo dài hai ba mươi năm và lạm phát vẫn chạy",
          "Vì tài sản tăng trưởng dễ bán hơn khi cần tiền mặt gấp",
          "Vì quy định yêu cầu quỹ hưu trí phải duy trì một tỷ trọng cổ phiếu tối thiểu",
          "Vì tài sản an toàn không được bảo hiểm tiền gửi bảo vệ sau tuổi nghỉ hưu",
        ],
        correct: 0,
        explanation:
          "Chuyển toàn bộ sang tài sản an toàn nghe hợp lý nhưng nó bỏ qua một điều: hai ba mươi năm là khoảng thời gian đủ dài để lạm phát bào mòn đáng kể sức mua của một danh mục hoàn toàn không tăng trưởng.",
      },
      {
        question: "Điều gì làm rủi ro sống lâu hơn tiền khó xử lý nhất?",
        options: [
          "Bạn không biết trước cần chuẩn bị cho bao nhiêu năm",
          "Không có sản phẩm tài chính nào tạo được dòng tiền ổn định dài hạn",
          "Chi phí sinh hoạt của người cao tuổi luôn tăng nhanh hơn lạm phát chung",
          "Việc rút tiền từ các khoản đầu tư dài hạn bị hạn chế sau tuổi nghỉ hưu",
        ],
        correct: 0,
        explanation:
          "Mọi rủi ro khác đều ước lượng được bằng một khoảng. Riêng cái này thì biến số chính là chính tuổi thọ của bạn, và không ai lập kế hoạch được cho một con số mà mình không thể biết.",
      },
      {
        question: "Nguyên tắc nào giúp giảm rủi ro này nhiều nhất?",
        options: [
          "Giữ mức rút linh hoạt, giảm bớt trong những năm thị trường xấu",
          "Rút một mức cố định mỗi năm bất kể thị trường diễn biến thế nào",
          "Rút toàn bộ phần lợi nhuận mỗi năm và giữ nguyên phần vốn gốc",
          "Chuyển toàn bộ danh mục sang tiền gửi để có dòng tiền chắc chắn",
        ],
        correct: 0,
        explanation:
          "Mức rút linh hoạt trực tiếp xử lý vấn đề thứ tự các năm: giảm rút trong năm xấu nghĩa là bán ít đơn vị hơn ở vùng giá thấp, và phần giữ lại còn cơ hội hồi phục.",
      },
    ],
    keyTakeaways: [
      "Rủi ro gốc của giai đoạn này là sống lâu hơn tiền, và không ai biết trước cần bao nhiêu năm",
      "Thứ tự các năm tốt xấu quan trọng khi đang rút, dù không quan trọng khi đang tích lũy",
      "Mục tiêu danh mục đổi từ tối đa hóa tăng trưởng sang bảo đảm không cạn",
      "Vẫn cần một phần tài sản tăng trưởng vì giai đoạn này có thể kéo dài hai ba mươi năm",
    ],
    practicePrompt: {
      question:
        "Bạn sắp ngừng đi làm và đang giữ danh mục phần lớn là cổ phiếu. Nên làm gì?",
      options: [
        "Giảm dần tỷ trọng theo lộ trình, và chuẩn bị vài năm chi tiêu ở tài sản an toàn",
        "Chuyển toàn bộ sang tiền gửi ngay để loại bỏ hoàn toàn rủi ro biến động",
        "Giữ nguyên danh mục vì lợi suất dài hạn của cổ phiếu vẫn cao nhất",
        "Tăng tỷ trọng cổ phiếu trả cổ tức cao để tạo dòng tiền hằng năm",
      ],
      correct: 0,
      explanation:
        "Có sẵn vài năm chi tiêu ở tài sản an toàn là cách trực tiếp nhất xử lý vấn đề thứ tự: khi thị trường xấu, bạn rút từ phần an toàn và không phải bán tài sản ở vùng giá thấp.",
    },
    summary: {
      keyIdea: "Giai đoạn sử dụng là bài toán khác giai đoạn tích lũy, với rủi ro gốc là sống lâu hơn tiền",
      commonMistake: "Giữ nguyên cách quản lý danh mục của giai đoạn tích lũy sau khi đã bắt đầu rút tiền",
      action: "Nếu còn dưới mười năm nữa mới ngừng đi làm, lên lộ trình giảm dần rủi ro từ bây giờ.",
    },
    application: {
      title: "Hai việc trước khi bắt đầu rút",
      message:
        "Chuẩn bị vài năm chi tiêu ở tài sản có giá trị biết trước, để không phải bán tài sản biến động vào năm thị trường xấu. Và đặt quy tắc rút linh hoạt thay vì một con số cố định.",
      secondary:
        "Vẫn giữ một phần tăng trưởng. Giai đoạn này có thể kéo dài hai ba mươi năm, và một danh mục hoàn toàn không tăng trưởng sẽ mất sức mua qua khoảng thời gian đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước là ba giai đoạn xây dựng. Bài này về giai đoạn cuối, và nó là bài toán khác hẳn - không phải làm sao để tiền lớn lên, mà làm sao để nó không cạn trước.",
      },
      { type: "heading", text: "Vì sao thứ tự các năm đột nhiên quan trọng" },
      {
        type: "paragraph",
        text: "Trong giai đoạn tích lũy, một đợt giảm sâu chỉ là một quãng trên đường dài - bạn không bán gì nên nó không thành khoản lỗ thật, và những năm sau bù lại. Khi đã bắt đầu rút đều đặn thì khác: rút trong năm giá thấp nghĩa là bán nhiều đơn vị hơn cho cùng một số tiền, và phần đã bán đi không còn ở đó để hồi phục. Hai người có cùng lợi suất trung bình có thể ra hai kết quả rất khác nhau chỉ vì thứ tự các năm tốt xấu.",
      },
      {
        type: "callout",
        label: "Rủi ro không đo được cần một cách xử lý khác",
        text: "Mọi rủi ro khác trong hai mươi chặng đều ước lượng được bằng một khoảng. Rủi ro sống lâu hơn tiền thì biến số chính là tuổi thọ của chính bạn - và không ai lập kế hoạch được cho một con số không thể biết. Cách xử lý vì thế không phải tính chính xác hơn, mà là để lại biên độ: rút linh hoạt, giữ một phần tăng trưởng, và không tiêu tới mức chỉ vừa đủ cho kịch bản trung bình.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 20. Cùng một lời khuyên có thể đúng ở giai đoạn này và sai ở giai đoạn kia.",
          "Và câu hỏi đáng hỏi ở mọi tuổi vẫn là: ở giai đoạn của tôi, việc nào tạo khác biệt lớn nhất.",
        ],
      },
    ],
  },
];
