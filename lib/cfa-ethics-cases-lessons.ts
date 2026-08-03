import type { Lesson } from "./lesson-types";

// CFA Ethics, phần cuối (ids 1603-1612).
//
// Sau ba loạt trước, mọi Standard đều đã có bài riêng và Ethics ở 38 bài
// (10.7% corpus) so với trọng số 15-20%. Loạt này đóng phần lớn khoảng cách
// còn lại, và nó có hai nửa khác nhau về mục đích.
//
// Năm bài đầu lấp nốt những gì chưa có bài riêng: VI(B), VI(C), I(D) ở góc
// hành vi cá nhân, quy trình xử lý kỷ luật của CFA Institute, và việc dùng
// nghiên cứu của bên thứ ba dưới Standard V(A).
//
// Năm bài sau là case study nhiều tầng. Đây không phải phần đệm: đề thi
// Ethics ra theo tình huống chứ không theo tên Standard, và kỹ năng bị chấm
// điểm là nhận ra một hành vi chạm vào những Standard nào - thứ chỉ luyện
// được bằng cách đi qua nhiều tình huống hoàn chỉnh.
//
// Lưu ý khi viết tiếp: ba loạt trước đều bị audit bắt vì đáp án đúng được
// viết thành mệnh đề đầy đủ trong khi nhiễu để ngắn. Ở loạt này đáp án đúng
// được viết ngắn từ đầu, phần lý do để ở explanation.

export const CFA_ETHICS_CASES_LESSONS: Lesson[] = [
  {
    id: 1603,
    slug: "cfa-ethics-standard-6b-thu-tu-uu-tien-giao-dich",
    title: "CFA Ethics 39: Standard VI(B) - Khách hàng đi trước, và tài khoản người thân tính là ai",
    subtitle: "Đi trước lệnh khách, phân bổ khi thiếu hàng, và ranh giới của tài khoản gia đình",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🥇",
    whyItMatters:
      "Đây là Standard mà vi phạm để lại dấu vết rõ nhất trong dữ liệu giao dịch, nên cũng là chỗ bị phát hiện nhiều nhất - và câu hỏi khó nhất không phải về bản thân bạn mà về tài khoản của người nhà.",
    openingQuestion:
      "Bạn quản lý danh mục và đồng thời quản lý tài khoản đầu tư của vợ/chồng mình. Tài khoản đó được xếp vào nhóm nào?",
    openingOptions: [
      "Tài khoản khách hàng bình thường, đối xử như mọi khách khác",
      "Tài khoản cá nhân của bạn, phải xếp sau khách hàng",
      "Tài khoản riêng, không chịu ràng buộc của Standard VI(B)",
      "Tùy theo việc tài khoản đó có trả phí quản lý hay không",
    ],
    correctOption: 1,
    explanation:
      "Nguyên tắc là nhìn vào lợi ích chứ không nhìn vào tên trên tài khoản. Tài khoản của người thân sống chung mà bạn được hưởng lợi từ nó thì được coi là tài khoản cá nhân của chính bạn, và phải xếp sau khách hàng. Có một ngoại lệ đáng chú ý: nếu người thân đó là khách hàng thật sự, trả phí như mọi khách khác, thì họ được đối xử như khách hàng - và Standard III(B) về đối xử công bằng lại yêu cầu không được thiệt thòi hơn ai. Đặt họ xuống cuối hàng vì sợ mang tiếng cũng là một dạng đối xử không công bằng.",
    diagram: [
      { label: "Nhìn vào lợi ích, không nhìn vào tên tài khoản", arrow: true },
      { label: "Người thân sống chung, bạn hưởng lợi: tính là cá nhân", arrow: true },
      { label: "Người thân là khách trả phí thật: đối xử như khách", arrow: true },
      { label: "Đẩy họ xuống cuối hàng cũng là bất công bằng" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao đây là Standard dễ bị phát hiện nhất",
      description:
        "Mọi lệnh đều có dấu thời gian, và việc đối chiếu lệnh cá nhân với lệnh khách hàng là thao tác tự động. Một lệnh cá nhân đặt trước lệnh khách cùng mã trong cùng ngày hiện ra ngay trong báo cáo giám sát, không cần ai tố cáo. Đây là lý do các công ty áp thời gian chờ - thường vài ngày sau khi khuyến nghị được phát hành - trước khi nhân viên được giao dịch mã đó: quy tắc cứng dễ tuân thủ và dễ kiểm chứng hơn một nguyên tắc chung.",
    },
    quiz: [
      {
        question: "Tài khoản của người thân sống chung được xếp vào nhóm nào?",
        options: [
          "Tài khoản cá nhân, nếu bạn hưởng lợi từ nó",
          "Tài khoản khách hàng trong mọi trường hợp",
          "Nhóm riêng không chịu ràng buộc của Standard VI(B)",
          "Tùy theo quy mô tài sản trong tài khoản đó",
        ],
        correct: 0,
        explanation:
          "Nguyên tắc nhìn vào lợi ích chứ không nhìn tên tài khoản - đây là chỗ Standard VI(B) khó áp dụng nhất trong thực tế.",
      },
      {
        question: "Nếu người thân là khách hàng thật, trả phí như mọi khách thì sao?",
        options: [
          "Đối xử như khách hàng, không được thiệt thòi hơn ai",
          "Vẫn phải xếp sau mọi khách hàng khác để tránh mang tiếng",
          "Phải chấm dứt quan hệ để loại bỏ xung đột lợi ích",
          "Chuyển tài khoản đó sang cho đồng nghiệp quản lý",
        ],
        correct: 0,
        explanation:
          "Đẩy họ xuống cuối hàng vì sợ mang tiếng là vi phạm Standard III(B) - hai Standard này ràng buộc nhau ở đúng điểm đó.",
      },
      {
        question: "Vì sao vi phạm Standard VI(B) dễ bị phát hiện?",
        options: [
          "Vì mọi lệnh đều có dấu thời gian để đối chiếu tự động",
          "Vì nhân viên thường tự khai báo khi đã giao dịch trước",
          "Vì khách hàng luôn nhận ra ngay khi bị đi trước lệnh",
          "Vì cơ quan quản lý giám sát trực tiếp mọi tài khoản cá nhân",
        ],
        correct: 0,
        explanation:
          "Không cần ai tố cáo - báo cáo giám sát tự sinh ra bằng chứng khi có lệnh cá nhân đặt trước lệnh khách cùng mã.",
      },
      {
        question: "Thời gian chờ sau khi phát hành khuyến nghị có tác dụng gì?",
        options: [
          "Biến nguyên tắc chung thành quy tắc cứng dễ kiểm chứng",
          "Cho phép nhân viên có thêm thời gian phân tích trước khi mua",
          "Giảm chi phí giao dịch nhờ tránh giai đoạn biến động mạnh",
          "Đáp ứng yêu cầu bắt buộc của cơ quan quản lý thị trường",
        ],
        correct: 0,
        explanation:
          "Một quy tắc cứng vừa dễ tuân thủ vừa dễ chứng minh là đã tuân thủ - hai điều mà nguyên tắc chung không cho.",
      },
      {
        question: "Standard VI(B) có cấm nhân viên đầu tư cá nhân không?",
        options: [
          "Không, chỉ yêu cầu khách hàng được ưu tiên trước",
          "Có, cấm hoàn toàn với mọi mã công ty đang theo dõi",
          "Có, trừ khi được bộ phận tuân thủ phê duyệt từng lệnh",
          "Không, và cũng không đặt ràng buộc nào về thứ tự",
        ],
        correct: 0,
        explanation:
          "Cấm hoàn toàn sẽ đẩy nhân viên ra khỏi chính thị trường họ làm việc; thứ Standard đòi là thứ tự, không phải cấm đoán.",
      },
    ],
    keyTakeaways: [
      "Nhìn vào lợi ích, không nhìn tên trên tài khoản",
      "Người thân sống chung mà bạn hưởng lợi: tính là tài khoản cá nhân",
      "Người thân là khách trả phí thật: đối xử như khách, không đẩy xuống cuối",
      "Dấu thời gian lệnh làm vi phạm hiện ra tự động, không cần ai tố cáo",
      "Thời gian chờ biến nguyên tắc chung thành quy tắc kiểm chứng được",
    ],
    practicePrompt: {
      question:
        "Bạn sắp phát hành khuyến nghị Mua cho một cổ phiếu và muốn mua cho tài khoản cá nhân. Thứ tự đúng là gì?",
      options: [
        "Mua trước rồi phát hành, vì bạn đã có phân tích từ trước",
        "Phát hành khuyến nghị, chờ hết thời gian chờ theo quy định công ty, rồi mới đặt lệnh cá nhân",
        "Mua cùng lúc phát hành để không ai đi trước ai",
        "Mua sau khi khách hàng đầu tiên đã khớp lệnh xong",
      ],
      correct: 1,
      explanation:
        "Mua cùng lúc nghe công bằng nhưng vẫn sai: khách hàng cần thời gian nhận và xử lý khuyến nghị, nên đặt lệnh đồng thời vẫn là tận dụng lợi thế biết trước. Chờ khách đầu tiên khớp cũng chưa đủ vì phần lớn khách còn chưa kịp phản ứng. Thời gian chờ tồn tại đúng để loại bỏ những phán đoán vụn vặt này.",
    },
  },
  {
    id: 1604,
    slug: "cfa-ethics-standard-6c-phi-gioi-thieu",
    title: "CFA Ethics 40: Standard VI(C) - Phí giới thiệu chảy theo chiều nào cũng phải nói",
    subtitle: "Nhận phí, trả phí, và cả những khoản không phải tiền",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    whyItMatters:
      "Standard này ngắn và hay bị coi là chuyện thủ tục, nhưng nó xử lý một xung đột rất thật: lời giới thiệu có động cơ tài chính đằng sau nghe giống hệt lời khuyên vô tư.",
    openingQuestion:
      "Bạn giới thiệu một khách hàng sang một công ty quản lý tài sản khác và nhận phí giới thiệu. Nghĩa vụ của bạn là gì?",
    openingOptions: [
      "Không có nghĩa vụ nào vì bạn không còn phục vụ khách đó",
      "Công bố cho khách sự tồn tại và bản chất của khoản phí",
      "Chỉ cần báo cho nhà tuyển dụng của bạn là đủ",
      "Chỉ phải công bố nếu khách hàng chủ động hỏi về việc này",
    ],
    correctOption: 1,
    explanation:
      "Standard VI(C) không cấm nhận phí giới thiệu - mô hình này hợp pháp và phổ biến. Nó buộc công bố, vì thiếu thông tin đó khách hàng không phân biệt được một lời giới thiệu dựa trên chất lượng dịch vụ với một lời giới thiệu dựa trên mức hoa hồng. Nghĩa vụ chạy theo cả hai chiều: nhận phí phải nói, mà trả phí cho người giới thiệu khách đến với bạn cũng phải nói. Và phạm vi không dừng ở tiền - một thỏa thuận giới thiệu qua lại, hay việc được nhận lại dịch vụ nào đó, đều nằm trong phạm vi phải công bố.",
    diagram: [
      { label: "Không cấm nhận hay trả phí giới thiệu", arrow: true },
      { label: "Buộc công bố cả hai chiều: nhận và trả", arrow: true },
      { label: "Phạm vi gồm cả lợi ích phi tiền mặt", arrow: true },
      { label: "Công bố trước khi khách ra quyết định, không phải sau" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Thời điểm công bố quyết định giá trị của việc công bố",
      description:
        "Công bố phải diễn ra trước khi khách hàng ra quyết định dùng dịch vụ được giới thiệu, không phải trong bản báo cáo tổng kết cuối năm. Một khoản phí giới thiệu được tiết lộ sau khi khách đã chuyển tài sản sang bên kia thì đã mất hết tác dụng - thứ khách cần là thông tin để cân nhắc, và cân nhắc chỉ có ý nghĩa trước khi quyết định. Đây là lý do Standard nêu rõ cả khách hàng tiềm năng chứ không chỉ khách hàng hiện tại.",
    },
    quiz: [
      {
        question: "Standard VI(C) yêu cầu gì với phí giới thiệu?",
        options: [
          "Công bố sự tồn tại và bản chất của khoản phí cho khách",
          "Cấm hoàn toàn việc nhận phí giới thiệu từ bên thứ ba",
          "Nộp khoản phí đó cho nhà tuyển dụng của bạn quản lý",
          "Chỉ công bố khi khoản phí vượt một tỷ lệ nhất định",
        ],
        correct: 0,
        explanation:
          "Mô hình giới thiệu hợp pháp và phổ biến; thứ Standard xử lý là việc khách không phân biệt được lời khuyên vô tư với lời khuyên có động cơ.",
      },
      {
        question: "Nghĩa vụ công bố chạy theo chiều nào?",
        options: [
          "Cả hai: nhận phí phải nói, trả phí cũng phải nói",
          "Chỉ khi nhận phí, vì đó là lúc có xung đột lợi ích",
          "Chỉ khi trả phí, vì đó là chi phí khách gián tiếp gánh",
          "Chỉ chiều nào có giá trị lớn hơn trong hai chiều",
        ],
        correct: 0,
        explanation:
          "Trả phí cho người giới thiệu cũng tạo xung đột: khách được đưa tới bạn vì có người được trả tiền, không hẳn vì bạn phù hợp nhất.",
      },
      {
        question: "Thỏa thuận giới thiệu qua lại không có tiền thì sao?",
        options: [
          "Vẫn phải công bố vì nó vẫn tạo động cơ tài chính",
          "Không cần công bố vì không có khoản tiền nào đổi tay",
          "Chỉ cần báo nhà tuyển dụng chứ không cần báo khách",
          "Chỉ phải công bố nếu hai bên có văn bản ký kết chính thức",
        ],
        correct: 0,
        explanation:
          "Giá trị kinh tế không nhất thiết đi kèm tiền mặt - một dòng khách hàng đều đặn cũng là lợi ích đáng kể.",
      },
      {
        question: "Công bố phí giới thiệu phải diễn ra khi nào?",
        options: [
          "Trước khi khách ra quyết định dùng dịch vụ được giới thiệu",
          "Trong báo cáo tổng kết định kỳ gửi khách cuối mỗi năm",
          "Ngay sau khi khoản phí thực sự được chi trả cho bạn",
          "Bất cứ lúc nào trong năm tài chính phát sinh khoản phí",
        ],
        correct: 0,
        explanation:
          "Thông tin để cân nhắc chỉ có giá trị trước khi cân nhắc - công bố sau quyết định là thủ tục chứ không phải công bố.",
      },
      {
        question: "Vì sao Standard nêu rõ cả 'khách hàng tiềm năng'?",
        options: [
          "Vì người chưa là khách vẫn đang ra quyết định dựa trên lời bạn",
          "Vì khách hàng tiềm năng thường không có hợp đồng ràng buộc",
          "Vì quy định yêu cầu lưu hồ sơ với mọi bên đã tiếp xúc",
          "Vì khách hàng tiềm năng chưa được bảo vệ bởi Standard nào khác",
        ],
        correct: 0,
        explanation:
          "Đúng thời điểm lời giới thiệu có tác dụng lớn nhất là lúc người ta chưa quyết định - nên đó là lúc nghĩa vụ công bố quan trọng nhất.",
      },
    ],
    keyTakeaways: [
      "Không cấm phí giới thiệu - buộc công bố",
      "Nghĩa vụ chạy cả hai chiều: nhận và trả",
      "Phạm vi gồm cả lợi ích phi tiền mặt và thỏa thuận qua lại",
      "Phải công bố trước khi khách quyết định, không phải sau",
      "Áp dụng cho cả khách hàng tiềm năng, không chỉ khách hiện tại",
    ],
    practicePrompt: {
      question:
        "Một công ty bảo hiểm đề nghị trả bạn hoa hồng cho mỗi khách hàng bạn giới thiệu mua sản phẩm của họ. Bạn cần làm gì trước khi nhận?",
      options: [
        "Chỉ cần đảm bảo sản phẩm đó thực sự phù hợp với khách",
        "Công bố thỏa thuận cho khách trước khi giới thiệu, và báo nhà tuyển dụng theo Standard IV(B)",
        "Nhận và ghi nhận vào hồ sơ nội bộ để đối chiếu sau này",
        "Từ chối vì mọi hoa hồng từ nhà cung cấp sản phẩm đều bị cấm",
      ],
      correct: 1,
      explanation:
        "Phương án đầu đúng một nửa và đó là chỗ dễ dừng lại: sản phẩm phù hợp là yêu cầu của Standard III(C), nhưng nó không thay thế nghĩa vụ công bố của VI(C). Hai Standard cùng kích hoạt ở đây, cộng thêm IV(B) vì đây là thù lao ngoài lương - và cả ba đều phải làm, không phải chọn một.",
    },
  },
  {
    id: 1605,
    slug: "cfa-ethics-standard-1d-hanh-vi-ca-nhan",
    title: "CFA Ethics 41: Standard I(D) - Khi hành vi ngoài công việc chạm tới uy tín nghề",
    subtitle: "Ranh giới giữa đời tư và nghề nghiệp, và ba dấu hiệu khiến một việc riêng thành việc chung",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🪞",
    whyItMatters:
      "Đây là Standard duy nhất chạm tới hành vi ngoài phạm vi công việc, nên nó cũng là chỗ dễ hiểu sai theo cả hai hướng: hoặc tưởng đời tư hoàn toàn nằm ngoài, hoặc tưởng mọi sai sót cá nhân đều bị xử lý.",
    openingQuestion:
      "Standard I(D) áp dụng cho hành vi cá nhân nào ngoài công việc?",
    openingOptions: [
      "Mọi hành vi cá nhân, vì thành viên CFA phải gương mẫu",
      "Hành vi liên quan tới tính trung thực, đáng tin cậy hoặc năng lực nghề",
      "Không hành vi nào, vì đời tư nằm ngoài phạm vi chuẩn mực",
      "Chỉ hành vi đã bị tòa án kết án bằng bản án có hiệu lực",
    ],
    correctOption: 1,
    explanation:
      "Standard I(D) không phải quy tắc đạo đức đời sống nói chung. Nó khoanh vào ba thứ có liên hệ trực tiếp tới việc bạn có đáng được giao tiền của người khác hay không: trung thực, đáng tin cậy, và năng lực chuyên môn. Gian lận trong một kỳ thi ở trường, khai man hồ sơ, hay lừa đảo trong một giao dịch cá nhân đều rơi vào phạm vi - không phải vì chúng xấu nói chung mà vì chúng nói lên điều gì đó về cách người này xử sự khi có cơ hội và không ai nhìn. Ngược lại, một tranh chấp dân sự thông thường hay một va chạm giao thông thì không.",
    diagram: [
      { label: "Ba tiêu chí: trung thực, đáng tin cậy, năng lực nghề", arrow: true },
      { label: "Không phải quy tắc đạo đức đời sống nói chung", arrow: true },
      { label: "Không cần bản án mới cấu thành vi phạm", arrow: true },
      { label: "Câu hỏi: hành vi này nói gì về việc giao tiền cho người đó" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao lạm dụng rượu hoặc chất kích thích có thể thuộc phạm vi",
      description:
        "Một mình nó thì không. Nó rơi vào phạm vi Standard I(D) khi ảnh hưởng tới năng lực chuyên môn - ra quyết định đầu tư trong tình trạng không tỉnh táo, hoặc để tình trạng đó làm hỏng nghĩa vụ với khách hàng. Đây là ví dụ rõ nhất cho nguyên tắc chung của Standard này: nó không phán xét lối sống, nó hỏi hành vi đó có làm bạn không còn thực hiện được nghĩa vụ nghề nghiệp hay không.",
    },
    quiz: [
      {
        question: "Standard I(D) khoanh vào ba tiêu chí nào?",
        options: [
          "Trung thực, đáng tin cậy, và năng lực chuyên môn",
          "Trung thực, tuân thủ pháp luật, và đóng góp cộng đồng",
          "Năng lực chuyên môn, thâm niên, và kết quả đầu tư",
          "Tuân thủ pháp luật, giữ bí mật, và tránh xung đột lợi ích",
        ],
        correct: 0,
        explanation:
          "Ba tiêu chí này đều liên hệ trực tiếp tới câu hỏi có nên giao tiền của người khác cho người này hay không.",
      },
      {
        question: "Có cần bản án của tòa mới cấu thành vi phạm Standard I(D) không?",
        options: [
          "Không, hành vi đủ để cấu thành mà không cần kết án hình sự",
          "Có, phải có bản án có hiệu lực pháp luật mới xử lý được",
          "Có, hoặc ít nhất phải có quyết định khởi tố của cơ quan điều tra",
          "Không, nhưng phải có đơn tố cáo chính thức từ bên bị hại",
        ],
        correct: 0,
        explanation:
          "Chuẩn nghề nghiệp và chuẩn hình sự khác nhau - một hành vi có thể không cấu thành tội mà vẫn cho thấy sự thiếu trung thực.",
      },
      {
        question: "Tranh chấp dân sự thông thường có thuộc phạm vi Standard I(D) không?",
        options: [
          "Không, nếu nó không nói gì về trung thực hay năng lực nghề",
          "Có, vì mọi tranh chấp pháp lý đều ảnh hưởng uy tín nghề",
          "Có, nếu giá trị tranh chấp vượt một ngưỡng nhất định",
          "Không, vì Standard I(D) chỉ áp dụng cho hành vi hình sự",
        ],
        correct: 0,
        explanation:
          "Standard không phán xét việc có tranh chấp, nó xét hành vi trong tranh chấp đó có cho thấy sự gian dối hay không.",
      },
      {
        question: "Vì sao gian lận trong một kỳ thi ở trường lại thuộc phạm vi?",
        options: [
          "Vì nó cho thấy cách người đó xử sự khi có cơ hội và không ai nhìn",
          "Vì mọi hành vi gian lận đều bị pháp luật xử lý như nhau",
          "Vì kết quả học tập là một phần hồ sơ nghề nghiệp",
          "Vì CFA Institute yêu cầu kê khai toàn bộ lịch sử học tập",
        ],
        correct: 0,
        explanation:
          "Đây là logic của cả Standard: hành vi ở một bối cảnh dự báo hành vi ở bối cảnh khác khi cấu trúc cám dỗ giống nhau.",
      },
      {
        question: "Lạm dụng chất kích thích rơi vào phạm vi khi nào?",
        options: [
          "Khi nó ảnh hưởng tới năng lực thực hiện nghĩa vụ nghề nghiệp",
          "Trong mọi trường hợp vì đó là hành vi thiếu chuẩn mực",
          "Chỉ khi bị cơ quan chức năng xử phạt hành chính",
          "Không bao giờ, vì đó hoàn toàn thuộc phạm vi đời tư",
        ],
        correct: 0,
        explanation:
          "Standard không phán xét lối sống - nó hỏi hành vi đó có làm bạn không còn thực hiện được nghĩa vụ hay không.",
      },
    ],
    keyTakeaways: [
      "Ba tiêu chí: trung thực, đáng tin cậy, năng lực chuyên môn",
      "Không phải quy tắc đạo đức đời sống nói chung",
      "Không cần bản án hình sự mới cấu thành vi phạm",
      "Logic: hành vi ở bối cảnh này dự báo hành vi ở bối cảnh khác",
      "Câu hỏi cuối cùng luôn là: có nên giao tiền người khác cho người này",
    ],
    practicePrompt: {
      question:
        "Một đồng nghiệp bị phát hiện khai gian bằng cấp trong hồ sơ xin việc từ mười năm trước. Vụ việc không liên quan gì tới công việc hiện tại. Standard I(D) có áp dụng không?",
      options: [
        "Không, vì đã quá lâu và không ảnh hưởng công việc hiện tại",
        "Có: khai gian bằng cấp thuộc nhóm hành vi về tính trung thực, và Standard không đặt thời hiệu",
        "Chỉ áp dụng nếu công ty hiện tại chịu thiệt hại từ việc đó",
        "Không, vì đây là vấn đề giữa người đó và nhà tuyển dụng cũ",
      ],
      correct: 1,
      explanation:
        "Hai phương án bác bỏ đều dựa vào tiêu chí Standard không dùng: thời gian đã trôi qua, và có thiệt hại hay chưa. Tiêu chí thật là bản chất hành vi - khai gian bằng cấp nằm thẳng trong nhóm trung thực. Việc nó xảy ra ở một nhà tuyển dụng khác cũng không đổi gì, vì Standard I(D) không giới hạn ở quan hệ lao động hiện tại.",
    },
  },
  {
    id: 1606,
    slug: "cfa-ethics-quy-trinh-xu-ly-ky-luat",
    title: "CFA Ethics 42: Chuyện gì xảy ra khi có khiếu nại - quy trình kỷ luật của CFA Institute",
    subtitle: "Từ nguồn phát hiện tới chế tài, và vì sao hợp tác điều tra là một nghĩa vụ riêng",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "⚙️",
    whyItMatters:
      "Biết chế tài tồn tại là một chuyện; biết quy trình chạy ra sao đổi cách bạn phản ứng khi nhận được thư điều tra - và phản ứng sai ở bước đó có thể nặng hơn chính vi phạm gốc.",
    openingQuestion:
      "Bạn nhận được yêu cầu cung cấp thông tin từ bộ phận Professional Conduct của CFA Institute. Nghĩa vụ của bạn là gì?",
    openingOptions: [
      "Không có nghĩa vụ nào vì đây không phải cơ quan nhà nước",
      "Hợp tác đầy đủ - không hợp tác là một vi phạm riêng biệt",
      "Chỉ trả lời nếu có luật sư đại diện tham gia cùng",
      "Chỉ cung cấp thông tin nếu vi phạm được chứng minh trước",
    ],
    correctOption: 1,
    explanation:
      "Không hợp tác với cuộc điều tra là vi phạm độc lập với vi phạm đang bị điều tra, và trong nhiều trường hợp nó dẫn tới chế tài nặng hơn. Lý do rất thực tế: CFA Institute không có quyền cưỡng chế của nhà nước - không thể triệu tập, không thể khám xét - nên toàn bộ khả năng thực thi của hệ thống dựa vào việc thành viên tự nguyện hợp tác. Bỏ qua thư yêu cầu, cung cấp thông tin sai lệch, hoặc tiêu hủy tài liệu liên quan đều chuyển một vụ việc có thể kết thúc bằng nhắc nhở thành một vụ đình chỉ tư cách.",
    diagram: [
      { label: "Nguồn: tự báo cáo, khiếu nại, giám sát, hoặc báo chí", arrow: true },
      { label: "Điều tra: yêu cầu thông tin, thành viên phải hợp tác", arrow: true },
      { label: "Kết luận: không vi phạm, hoặc đề xuất chế tài", arrow: true },
      { label: "Chế tài: từ nhắc nhở tới thu hồi chứng chỉ vĩnh viễn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Tự báo cáo là một nguồn thật, không chỉ trên lý thuyết",
      description:
        "Mỗi năm khi gia hạn tư cách thành viên, mọi thành viên và candidate phải hoàn thành bản khai về hành vi nghề nghiệp - trong đó khai báo các vụ việc pháp lý, kỷ luật hoặc khiếu nại liên quan tới mình. Khai không trung thực ở bước này tự nó là vi phạm Standard I(C), và nó thường bị phát hiện muộn hơn nhiều so với việc khai đúng ngay từ đầu, khi vụ việc gốc có thể đã được xử lý nhẹ.",
    },
    quiz: [
      {
        question: "Không hợp tác với cuộc điều tra được xử lý thế nào?",
        options: [
          "Là một vi phạm riêng, có thể nặng hơn vi phạm đang bị điều tra",
          "Không bị xử lý vì thành viên có quyền im lặng",
          "Chỉ bị nhắc nhở nếu vi phạm gốc được chứng minh là có",
          "Được xem là tình tiết giảm nhẹ vì thể hiện sự thận trọng",
        ],
        correct: 0,
        explanation:
          "Toàn bộ khả năng thực thi của hệ thống dựa vào việc thành viên hợp tác, nên phá vỡ điều đó bị xử lý nghiêm.",
      },
      {
        question: "Vì sao hệ thống phụ thuộc vào sự hợp tác của thành viên?",
        options: [
          "Vì CFA Institute không có quyền cưỡng chế như cơ quan nhà nước",
          "Vì các vụ việc thường xảy ra ở nhiều quốc gia khác nhau",
          "Vì thành viên có quyền chọn không tham gia chương trình kỷ luật",
          "Vì quy trình được thiết kế để hạn chế chi phí điều tra",
        ],
        correct: 0,
        explanation:
          "Không triệu tập được, không khám xét được - nên hợp tác tự nguyện là điều kiện để hệ thống hoạt động.",
      },
      {
        question: "Bản khai hành vi nghề nghiệp hằng năm dùng để làm gì?",
        options: [
          "Khai báo các vụ việc pháp lý, kỷ luật hoặc khiếu nại liên quan",
          "Xác nhận số giờ đào tạo chuyên môn đã hoàn thành trong năm",
          "Cập nhật thông tin liên hệ và nơi làm việc hiện tại",
          "Đánh giá mức độ hài lòng với các dịch vụ của tổ chức",
        ],
        correct: 0,
        explanation:
          "Đây là nguồn phát hiện quan trọng, và khai không trung thực ở đây tự nó là vi phạm Standard I(C).",
      },
      {
        question: "Chế tài nặng nhất trong quy trình kỷ luật là gì?",
        options: [
          "Thu hồi chứng chỉ và tư cách thành viên vĩnh viễn",
          "Phạt tiền theo mức độ thiệt hại đã gây ra cho khách hàng",
          "Chuyển hồ sơ sang cơ quan điều tra của nhà nước",
          "Công bố công khai danh tính trên trang của tổ chức",
        ],
        correct: 0,
        explanation:
          "Chế tài của CFA Institute nằm trong phạm vi tư cách nghề nghiệp - nó không thay thế và không loại trừ xử lý pháp luật.",
      },
      {
        question: "Tiêu hủy tài liệu liên quan trong lúc bị điều tra dẫn tới gì?",
        options: [
          "Chuyển một vụ có thể kết thúc nhẹ thành vụ đình chỉ tư cách",
          "Không ảnh hưởng nếu tài liệu đã quá thời hạn lưu trữ",
          "Chỉ bị xử lý nếu chứng minh được có ý định che giấu",
          "Được chấp nhận nếu tuân theo chính sách lưu trữ của công ty",
        ],
        correct: 0,
        explanation:
          "Phản ứng sai trong quá trình điều tra thường gây hậu quả nặng hơn chính vi phạm gốc - đây là điểm thực tế nhất của bài này.",
      },
    ],
    keyTakeaways: [
      "Không hợp tác điều tra là vi phạm riêng, thường nặng hơn vi phạm gốc",
      "Hệ thống dựa vào hợp tác tự nguyện vì không có quyền cưỡng chế",
      "Bản khai hành vi nghề nghiệp hằng năm là nguồn phát hiện thật",
      "Khai không trung thực trong bản khai là vi phạm Standard I(C)",
      "Chế tài từ nhắc nhở tới thu hồi chứng chỉ vĩnh viễn",
    ],
    practicePrompt: {
      question:
        "Bạn nhận thư yêu cầu giải trình về một khiếu nại mà bạn tin là hoàn toàn vô căn cứ. Nên làm gì?",
      options: [
        "Bỏ qua vì khiếu nại không có cơ sở nên không cần trả lời",
        "Trả lời đầy đủ và đúng hạn, cung cấp tài liệu chứng minh - việc bạn tin mình vô can không thay thế nghĩa vụ hợp tác",
        "Trả lời ngắn gọn rằng khiếu nại vô căn cứ, không kèm tài liệu",
        "Chờ tới khi có yêu cầu lần thứ hai rồi mới phản hồi",
      ],
      correct: 1,
      explanation:
        "Đây là tình huống nguy hiểm nhất trong bài, vì niềm tin mình vô can làm người ta thấy việc trả lời là không cần thiết. Nhưng nghĩa vụ hợp tác không phụ thuộc vào việc bạn có vi phạm hay không - và một hồ sơ đầy đủ chính là thứ chứng minh bạn vô can nhanh nhất.",
    },
  },
  {
    id: 1607,
    slug: "cfa-ethics-dung-nghien-cuu-ben-thu-ba",
    title: "CFA Ethics 43: Dùng nghiên cứu của bên thứ ba - trách nhiệm vẫn là của bạn",
    subtitle: "Thẩm định nguồn, hiểu phương pháp, và khi nào được coi là đã đủ cần cù",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📚",
    whyItMatters:
      "Không ai tự làm mọi phân tích, nên câu hỏi này áp dụng cho gần như mọi khuyến nghị bạn từng đưa - nhưng phần lớn người học chỉ nghĩ tới Standard V(A) khi tự mình dựng mô hình.",
    openingQuestion:
      "Bạn dùng báo cáo của một tổ chức nghiên cứu uy tín làm cơ sở cho khuyến nghị của mình. Standard V(A) yêu cầu gì?",
    openingOptions: [
      "Không yêu cầu gì thêm vì tổ chức đó đã có uy tín",
      "Thẩm định phương pháp và tính hợp lý của nghiên cứu đó",
      "Chỉ cần ghi rõ nguồn trong báo cáo của bạn",
      "Phải tự làm lại toàn bộ phân tích từ dữ liệu gốc",
    ],
    correctOption: 1,
    explanation:
      "Standard V(A) cho phép dựa vào nghiên cứu của bên khác, nhưng không cho phép chuyển trách nhiệm sang họ. Mức thẩm định cần thiết phụ thuộc vào hoàn cảnh: một tổ chức có quy trình đã được kiểm chứng và bạn đã dùng nhiều lần thì mức thẩm định thấp hơn một nguồn mới hoặc một nguồn có xung đột lợi ích rõ. Những câu hỏi tối thiểu luôn phải trả lời được: nghiên cứu dựa trên giả định gì, dữ liệu lấy từ đâu, có ai trả tiền cho nghiên cứu này không, và kết luận có nhất quán với những gì bạn biết về doanh nghiệp không. Không trả lời được thì bạn đang đưa khuyến nghị không có cơ sở của chính mình.",
    diagram: [
      { label: "Được dựa vào nghiên cứu bên thứ ba", arrow: true },
      { label: "Không được chuyển trách nhiệm sang họ", arrow: true },
      { label: "Mức thẩm định tùy nguồn: quen thuộc hay mới, có xung đột không", arrow: true },
      { label: "Không trả lời được các câu hỏi tối thiểu thì không có cơ sở" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ba câu hỏi lọc nhanh một nguồn nghiên cứu",
      description:
        "Ai trả tiền cho nghiên cứu này - nếu là chính doanh nghiệp được phân tích thì Standard I(B) cũng vào cuộc. Phương pháp có được mô tả đủ để người khác kiểm chứng không - một kết luận không kèm cách đi tới nó thì không thẩm định được. Và kết luận có mâu thuẫn với nguồn nào khác bạn tin cậy không - mâu thuẫn không tự nó chứng minh sai, nhưng nó là tín hiệu phải đào sâu trước khi dùng.",
    },
    quiz: [
      {
        question: "Dùng nghiên cứu bên thứ ba thì trách nhiệm thuộc về ai?",
        options: [
          "Vẫn là người đưa khuyến nghị, không chuyển đi được",
          "Bên nghiên cứu, vì họ là tác giả của phân tích gốc",
          "Chia đều cho hai bên theo mức độ đóng góp vào kết luận",
          "Bên nghiên cứu nếu họ là tổ chức có uy tín được công nhận",
        ],
        correct: 0,
        explanation:
          "Được dựa vào không có nghĩa là được chuyển trách nhiệm - đây là điểm phân biệt cốt lõi của Standard V(A).",
      },
      {
        question: "Mức thẩm định cần thiết phụ thuộc vào điều gì?",
        options: [
          "Nguồn quen thuộc hay mới, và có xung đột lợi ích rõ không",
          "Độ dài của báo cáo nghiên cứu được sử dụng",
          "Mức phí bạn đã trả để tiếp cận nghiên cứu đó",
          "Việc nghiên cứu đó có được công bố công khai hay không",
        ],
        correct: 0,
        explanation:
          "Chuẩn là hợp lý theo hoàn cảnh - một nguồn đã dùng nhiều lần với quy trình kiểm chứng được đòi hỏi ít hơn một nguồn mới.",
      },
      {
        question: "Câu hỏi nào thuộc nhóm tối thiểu phải trả lời được?",
        options: [
          "Nghiên cứu dựa trên giả định gì và ai trả tiền cho nó",
          "Nghiên cứu được công bố vào ngày nào trong năm",
          "Có bao nhiêu tổ chức khác cũng trích dẫn nghiên cứu đó",
          "Tác giả nghiên cứu có bằng cấp chuyên môn gì",
        ],
        correct: 0,
        explanation:
          "Giả định và nguồn tài trợ là hai thứ quyết định nhất tới việc kết luận có đáng tin hay không.",
      },
      {
        question: "Nghiên cứu do chính doanh nghiệp được phân tích trả tiền thì sao?",
        options: [
          "Standard I(B) về tính độc lập cũng vào cuộc cùng V(A)",
          "Không được sử dụng dưới bất kỳ hình thức nào",
          "Được dùng bình thường nếu ghi rõ nguồn trong báo cáo",
          "Chỉ cần thẩm định nếu kết luận là khuyến nghị Mua",
        ],
        correct: 0,
        explanation:
          "Hai Standard cùng áp dụng, và điều đó nâng mức thẩm định cần thiết lên chứ không phải chỉ thêm một dòng ghi nguồn.",
      },
      {
        question: "Kết luận mâu thuẫn với một nguồn tin cậy khác nghĩa là gì?",
        options: [
          "Tín hiệu phải đào sâu, chưa phải bằng chứng sai",
          "Bằng chứng rằng một trong hai nguồn đã tính toán sai",
          "Lý do để loại bỏ cả hai nguồn khỏi phân tích của bạn",
          "Điều bình thường không cần xử lý gì thêm",
        ],
        correct: 0,
        explanation:
          "Mâu thuẫn giữa hai nguồn đáng tin thường chỉ ra một giả định khác nhau ở đâu đó - và tìm ra nó là phần có giá trị nhất.",
      },
    ],
    keyTakeaways: [
      "Được dựa vào nghiên cứu bên thứ ba, không được chuyển trách nhiệm",
      "Mức thẩm định tùy nguồn: quen thuộc hay mới, có xung đột hay không",
      "Câu hỏi tối thiểu: giả định gì, dữ liệu đâu, ai trả tiền, có nhất quán không",
      "Nghiên cứu do bên được phân tích trả tiền kéo theo cả Standard I(B)",
      "Mâu thuẫn giữa các nguồn là tín hiệu đào sâu, không phải bằng chứng sai",
    ],
    practicePrompt: {
      question:
        "Bạn dùng dự báo ngành từ một công ty tư vấn cho phần định giá. Sau đó phát hiện dự báo đó do chính doanh nghiệp bạn đang phân tích đặt hàng. Nên làm gì?",
      options: [
        "Giữ nguyên vì công ty tư vấn là bên độc lập",
        "Thẩm định lại các giả định chính, công bố nguồn gốc tài trợ, và tìm nguồn đối chiếu độc lập trước khi giữ kết luận",
        "Bỏ hoàn toàn phần định giá dựa trên dự báo đó",
        "Giữ nguyên nhưng thêm ghi chú nhỏ về nguồn tài trợ",
      ],
      correct: 1,
      explanation:
        "Bỏ hoàn toàn là phản ứng quá tay - nghiên cứu do bên phát hành đặt hàng không tự động sai, và Standard I(B) chấp nhận mô hình này khi được công bố. Nhưng ghi chú nhỏ thì không đủ theo VI(A). Ba việc phải làm cùng lúc, và việc tìm nguồn đối chiếu là thứ biến một khuyến nghị mượn cơ sở thành khuyến nghị có cơ sở của chính bạn.",
    },
  },
  {
    id: 1608,
    slug: "cfa-ethics-case-suc-ep-tu-bo-phan-ban-hang",
    title: "CFA Ethics 44: Case - Nhà phân tích dưới sức ép từ bộ phận bảo lãnh phát hành",
    subtitle: "Một tình huống, bốn Standard, và thứ tự các bước xử lý",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🧯",
    whyItMatters:
      "Đề thi Ethics ra theo tình huống chứ không theo tên Standard, và kỹ năng bị chấm là nhận ra một chuỗi hành vi chạm vào những Standard nào. Đây là dạng case xuất hiện nhiều nhất.",
    openingQuestion:
      "Bạn viết khuyến nghị Trung lập cho một doanh nghiệp mà công ty bạn sắp bảo lãnh phát hành. Trưởng bộ phận bảo lãnh yêu cầu nâng lên Mua và nói rằng hợp đồng có thể mất. Vi phạm nào đã xảy ra tại thời điểm này?",
    openingOptions: [
      "Chưa có vi phạm nào cho tới khi bạn thực sự đổi khuyến nghị",
      "Đã có: việc tạo và truyền sức ép lên tính độc lập vi phạm Standard I(B), bất kể bạn có chịu thua hay không",
      "Chỉ vi phạm nếu doanh nghiệp đó biết về cuộc trao đổi này",
      "Chỉ vi phạm Standard IV(A) về nghĩa vụ với nhà tuyển dụng",
    ],
    correctOption: 1,
    explanation:
      "Đây là điểm hay bị bỏ qua nhất trong dạng case này. Vi phạm Standard I(B) nằm ở phía người tạo sức ép và nó hoàn tất ngay khi sức ép được truyền đi - nếu chỉ tính lúc nhà phân tích đã đổi khuyến nghị thì mọi lần gây sức ép không thành công đều vô can, và điều đó khiến Standard mất hết tác dụng phòng ngừa. Với bạn - người nhận sức ép - nghĩa vụ chưa bị vi phạm nhưng đã phát sinh: giữ nguyên kết luận có cơ sở, ghi lại sự việc, và đưa vấn đề lên bộ phận tuân thủ. Im lặng làm theo thì thêm vi phạm V(A) vì khuyến nghị mới không còn cơ sở hợp lý, và V(B) vì bạn đang trình bày một ý kiến không phải của mình như thể là phân tích của bạn.",
    diagram: [
      { label: "I(B): vi phạm hoàn tất khi sức ép được truyền đi", arrow: true },
      { label: "Nếu đổi khuyến nghị: thêm V(A) - mất cơ sở hợp lý", arrow: true },
      { label: "Và V(B) - trình bày ý kiến người khác như của mình", arrow: true },
      { label: "Bức tường thông tin lẽ ra đã phải chặn cuộc trao đổi này" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao đây là case kinh điển của mâu thuẫn cấu trúc",
      description:
        "Doanh thu bảo lãnh phát hành đến từ chính các doanh nghiệp mà bộ phận phân tích đánh giá, nên xung đột không nằm ở một cá nhân xấu mà nằm trong cấu trúc kinh doanh. Đó là lý do cách xử lý không phải trông chờ vào ý chí cá nhân mà là các cơ chế: bức tường thông tin, thù lao của nhà phân tích không gắn với doanh thu bảo lãnh, và quy trình phê duyệt báo cáo không đi qua bộ phận bảo lãnh. Một công ty thiếu ba thứ đó thì nhà phân tích ở đó đang làm việc trong điều kiện gần như không thể tuân thủ.",
    },
    quiz: [
      {
        question: "Vi phạm Standard I(B) hoàn tất tại thời điểm nào?",
        options: [
          "Khi sức ép được tạo ra và truyền đi",
          "Khi nhà phân tích thực sự đổi khuyến nghị",
          "Khi báo cáo đã được phát hành ra cho khách hàng",
          "Khi doanh nghiệp được phân tích biết về sự việc",
        ],
        correct: 0,
        explanation:
          "Nếu chỉ tính lúc đã đổi khuyến nghị thì mọi sức ép không thành công đều vô can - và Standard mất hết tác dụng phòng ngừa.",
      },
      {
        question: "Nếu nhà phân tích chịu thua và đổi khuyến nghị, thêm vi phạm nào?",
        options: [
          "V(A) vì mất cơ sở hợp lý, và V(B) vì trình bày sai",
          "Chỉ thêm V(A) vì khuyến nghị không còn cơ sở phân tích",
          "Chỉ thêm IV(A) vì làm tổn hại lợi ích nhà tuyển dụng",
          "Không thêm vi phạm nào vì I(B) đã bao trùm toàn bộ",
        ],
        correct: 0,
        explanation:
          "Khuyến nghị mới không dựa trên phân tích nào, và nó được trình bày như thể là kết luận của nhà phân tích - hai vi phạm riêng.",
      },
      {
        question: "Nghĩa vụ của người nhận sức ép là gì?",
        options: [
          "Giữ kết luận có cơ sở, ghi lại sự việc, đưa lên tuân thủ",
          "Nghỉ việc ngay để không dính líu tới báo cáo đó",
          "Đổi khuyến nghị nhưng ghi chú lý do ở cuối báo cáo",
          "Chờ xem hợp đồng bảo lãnh có thực sự mất hay không",
        ],
        correct: 0,
        explanation:
          "Ba bước này là mức phản ứng tương xứng - nghỉ việc là lựa chọn cuối khi mọi kênh nội bộ đã đóng.",
      },
      {
        question: "Cơ chế nào lẽ ra đã chặn cuộc trao đổi này từ đầu?",
        options: [
          "Bức tường thông tin giữa bộ phận bảo lãnh và bộ phận phân tích",
          "Quy trình đăng ký trước giao dịch cá nhân của nhân viên",
          "Danh sách hạn chế các mã nhân viên không được giao dịch",
          "Quy định về lưu trữ hồ sơ nghiên cứu trong bảy năm",
        ],
        correct: 0,
        explanation:
          "Đây chính là chức năng bức tường thông tin được dựng lên để thực hiện - và sự tồn tại của cuộc trao đổi cho thấy nó không hoạt động.",
      },
      {
        question: "Vì sao xung đột này được gọi là mâu thuẫn cấu trúc?",
        options: [
          "Vì doanh thu bảo lãnh đến từ doanh nghiệp bị phân tích",
          "Vì hai bộ phận luôn có mâu thuẫn cá nhân với nhau",
          "Vì quy định hiện hành chưa phân định rõ trách nhiệm hai bên",
          "Vì nhà phân tích thường có ít quyền lực hơn trong tổ chức",
        ],
        correct: 0,
        explanation:
          "Xung đột nằm trong mô hình kinh doanh chứ không ở một cá nhân, nên giải pháp phải là cơ chế chứ không phải ý chí cá nhân.",
      },
    ],
    keyTakeaways: [
      "I(B) vi phạm ngay khi sức ép được truyền, không chờ tới lúc chịu thua",
      "Đổi khuyến nghị thì thêm V(A) và V(B) - ba vi phạm chồng lên nhau",
      "Phản ứng đúng: giữ kết luận, ghi lại, đưa lên tuân thủ",
      "Bức tường thông tin lẽ ra phải chặn cuộc trao đổi từ đầu",
      "Xung đột nằm trong cấu trúc kinh doanh, nên giải pháp phải là cơ chế",
    ],
    practicePrompt: {
      question:
        "Bạn nêu vấn đề với bộ phận tuân thủ nhưng họ không xử lý gì trong hai tuần, và hạn phát hành báo cáo đã tới. Bước tiếp theo?",
      options: [
        "Phát hành khuyến nghị Mua theo yêu cầu vì đã báo cáo rồi",
        "Phát hành đúng kết luận có cơ sở của bạn, và tiếp tục leo thang lên cấp cao hơn - đã báo cáo không chuyển được trách nhiệm về nội dung bạn ký tên",
        "Không phát hành báo cáo nào và để hạn trôi qua",
        "Phát hành bản Trung lập nhưng không ký tên mình",
      ],
      correct: 1,
      explanation:
        "Việc đã báo cáo lên tuân thủ bảo vệ bạn khỏi cáo buộc im lặng đồng lõa, nhưng nó không chuyển trách nhiệm về nội dung một báo cáo mang tên bạn. Không phát hành gì là bỏ nghĩa vụ với khách hàng đang chờ; bỏ tên khỏi báo cáo là né trách nhiệm chứ không giải quyết xung đột.",
    },
  },
  {
    id: 1609,
    slug: "cfa-ethics-case-co-hoi-dau-tu-ca-nhan",
    title: "CFA Ethics 45: Case - Một cơ hội đầu tư đến với bạn trước khi đến với khách hàng",
    subtitle: "Phân bổ, thứ tự ưu tiên và công bố - ba Standard cùng chạm vào một quyết định",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🎟️",
    whyItMatters:
      "Đây là dạng tình huống mà bản năng đầu tiên gần như luôn sai, vì lời mời riêng nghe giống một đặc quyền cá nhân trong khi nó thực chất là một cơ hội thuộc về khách hàng.",
    openingQuestion:
      "Một quỹ đầu tư mời riêng bạn tham gia vòng gọi vốn hạn chế, quy mô nhỏ, không đủ chỗ cho khách hàng. Bạn được tham gia không?",
    openingOptions: [
      "Được, vì lời mời dành cho cá nhân bạn chứ không cho công ty",
      "Phải xét trước xem cơ hội này có phù hợp với khách hàng nào không - nếu có, khách được ưu tiên",
      "Được, nếu bạn công bố việc tham gia cho khách hàng biết",
      "Không được trong mọi trường hợp vì đây là xung đột lợi ích",
    ],
    correctOption: 1,
    explanation:
      "Câu hỏi đầu tiên không phải bạn có được tham gia không, mà cơ hội này có thuộc về khách hàng không. Nếu nó phù hợp với mục tiêu đầu tư của một hoặc nhiều khách hàng bạn đang phục vụ, thì Standard VI(B) đặt họ trước bạn - kể cả khi lời mời gửi đích danh tên bạn, vì bạn nhận được lời mời đó nhờ vị trí nghề nghiệp chứ không nhờ tư cách cá nhân. Quy mô nhỏ không phải lý do loại khách ra: cách xử lý đúng là phân bổ theo tỷ lệ theo quy trình có sẵn, không phải kết luận rằng vì chia không đủ nên thôi để mình lấy. Chỉ khi cơ hội thật sự không phù hợp với bất kỳ khách hàng nào thì mới tới lượt bạn - và khi đó vẫn phải công bố theo VI(A) nếu nó có thể ảnh hưởng tới khuyến nghị của bạn sau này.",
    sections: [
      {
        "type": "lead",
        "text": "Một cơ hội đầu tư hấp dẫn đến với bạn trước khi đến với khách hàng. Câu hỏi đầu tiên không phải bạn có được tham gia không, mà cơ hội này có thuộc về khách hàng không."
      },
      {
        "type": "heading",
        "text": "Thứ tự phải hỏi"
      },
      {
        "type": "paragraph",
        "text": "Nếu cơ hội phù hợp với mục tiêu đầu tư của một hoặc nhiều khách hàng bạn đang phục vụ, Standard VI(B) đặt họ trước bạn. Điều này đúng kể cả khi lời mời được gửi đích danh tên bạn - vì bạn nhận được nó nhờ vị trí nghề nghiệp chứ không nhờ tư cách cá nhân."
      },
      {
        "type": "callout",
        "label": "Lập luận hay bị dùng sai",
        "text": "'Quy mô quá nhỏ, chia ra không đủ cho ai' không phải lý do loại khách hàng ra. Cách xử lý đúng là phân bổ theo tỷ lệ theo quy trình đã có sẵn."
      },
      {
        "type": "heading",
        "text": "Khi nào mới tới lượt bạn"
      },
      {
        "type": "paragraph",
        "text": "Chỉ khi cơ hội thật sự không phù hợp với bất kỳ khách hàng nào - sai nhóm tài sản, sai mức rủi ro, sai kỳ hạn. Và ngay cả khi đó, nếu khoản đầu tư cá nhân này có thể ảnh hưởng tới khuyến nghị của bạn về sau, Standard VI(A) vẫn buộc công bố."
      },
      {
        "type": "list",
        "items": [
          "VI(B) - thứ tự ưu tiên giao dịch: khách hàng trước, công ty, rồi mới tới cá nhân.",
          "III(B) - đối xử công bằng: phân bổ theo quy trình đã công bố, không tùy nghi.",
          "VI(A) - công bố xung đột: nếu khoản đầu tư riêng có thể chi phối lời khuyên của bạn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Cơ hội đến với bạn vì công việc của bạn.",
          "Nên nó thuộc về công việc trước, thuộc về bạn sau."
        ]
      }
    ],
    diagram: [
      { label: "Câu hỏi 1: cơ hội này có thuộc về khách hàng không", arrow: true },
      { label: "Nếu có: VI(B) đặt khách trước bạn", arrow: true },
      { label: "Quy mô nhỏ thì phân bổ theo tỷ lệ, không loại khách ra", arrow: true },
      { label: "Nếu không phù hợp với khách nào: mới tới lượt bạn, kèm công bố" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao 'lời mời gửi đích danh tôi' không phải lập luận",
      description:
        "Bạn nhận được lời mời vì bạn quản lý tiền của người khác - đó là thứ khiến bạn đáng được mời. Cơ hội đến qua cánh cửa nghề nghiệp thì thuộc về vai trò nghề nghiệp, không thuộc về cá nhân. Đây cũng là logic của Standard IV(A) về cơ hội kinh doanh: một cơ hội đến với bạn nhờ vị trí ở công ty thì phải được đưa cho công ty trước, không phải giữ lại cho mình.",
    },
    quiz: [
      {
        question: "Câu hỏi đầu tiên khi nhận một cơ hội đầu tư riêng là gì?",
        options: [
          "Cơ hội này có hợp với khách hàng nào không",
          "Giá trị khoản đầu tư có vượt ngưỡng phải kê khai không",
          "Lời mời có ghi đích danh tên bạn hay tên công ty",
          "Bạn có đủ vốn cá nhân để tham gia hay không",
        ],
        correct: 0,
        explanation:
          "Thứ tự này quyết định mọi thứ sau đó - hỏi ngược lại là cách phần lớn vi phạm dạng này bắt đầu.",
      },
      {
        question: "Lời mời gửi đích danh tên bạn có làm cơ hội thành của riêng không?",
        options: [
          "Không, vì bạn được mời nhờ vị trí nghề nghiệp",
          "Có, vì lời mời không gửi cho công ty hay khách hàng",
          "Có, nếu bạn dùng tiền cá nhân để tham gia",
          "Không, trừ khi bạn công bố việc tham gia cho khách",
        ],
        correct: 0,
        explanation:
          "Cơ hội đến qua cánh cửa nghề nghiệp thuộc về vai trò nghề nghiệp - cùng logic với Standard IV(A) về cơ hội kinh doanh.",
      },
      {
        question: "Quy mô nhỏ không đủ chia cho mọi khách thì xử lý thế nào?",
        options: [
          "Phân bổ theo tỷ lệ theo quy trình có sẵn từ trước",
          "Giữ lại cho tài khoản cá nhân vì chia không đủ",
          "Ưu tiên khách hàng có quy mô tài sản lớn nhất",
          "Bỏ qua cơ hội để tránh mọi tranh chấp về phân bổ",
        ],
        correct: 0,
        explanation:
          "Đây là đúng tình huống Standard III(B) được viết cho, và quy trình phải tồn tại trước khi biết ai được lợi.",
      },
      {
        question: "Khi nào bạn mới được tham gia cho tài khoản cá nhân?",
        options: [
          "Khi cơ hội không phù hợp với khách hàng nào",
          "Khi bạn đã công bố ý định tham gia cho khách hàng biết",
          "Khi khách hàng từ chối tham gia sau khi được chào",
          "Khi giá trị khoản đầu tư dưới mức trọng yếu của bạn",
        ],
        correct: 0,
        explanation:
          "Và ngay cả khi đó vẫn còn nghĩa vụ công bố theo VI(A) nếu nó có thể ảnh hưởng tới khuyến nghị sau này của bạn.",
      },
      {
        question: "Ba Standard nào cùng chạm vào tình huống này?",
        options: [
          "VI(B) thứ tự ưu tiên, III(B) đối xử công bằng, VI(A) công bố",
          "I(B) độc lập, V(A) cơ sở hợp lý, V(C) lưu trữ hồ sơ",
          "IV(A) trung thành, IV(B) thù lao thêm, IV(C) giám sát",
          "III(A) trung thành, III(C) phù hợp, III(E) bảo mật",
        ],
        correct: 0,
        explanation:
          "Nhận ra một tình huống chạm nhiều Standard cùng lúc là chính kỹ năng dạng case này rèn luyện.",
      },
    ],
    keyTakeaways: [
      "Hỏi trước: cơ hội này có thuộc về khách hàng không",
      "Lời mời đích danh không làm cơ hội thành của riêng bạn",
      "Quy mô nhỏ thì phân bổ theo tỷ lệ, không phải lý do loại khách",
      "Chỉ khi không phù hợp với khách nào thì mới tới lượt bạn",
      "Ba Standard cùng chạm: VI(B), III(B) và VI(A)",
    ],
    practicePrompt: {
      question:
        "Sau khi phân bổ cho khách, còn dư một phần nhỏ và bạn muốn lấy phần đó. Được không?",
      options: [
        "Không, phần dư phải được trả lại cho bên chào bán",
        "Được, nếu khách hàng phù hợp đã được phân bổ đầy đủ theo quy trình và bạn công bố vị thế cá nhân đó",
        "Được, không cần công bố vì bạn chỉ lấy phần dư",
        "Không, vì tham gia cùng khách hàng luôn là xung đột lợi ích",
      ],
      correct: 1,
      explanation:
        "Hai phương án phủ định đều quá tay: Standard không cấm bạn đầu tư cùng khách, nó đòi khách được ưu tiên trước. Khi thứ tự đó đã được tôn trọng và có bằng chứng, phần còn lại là hợp lệ - nhưng nghĩa vụ công bố theo VI(A) không biến mất chỉ vì phần bạn lấy là phần dư.",
    },
  },
  {
    id: 1610,
    slug: "cfa-ethics-case-chuyen-viec-va-khach-hang",
    title: "CFA Ethics 46: Case - Chuyển việc và mang theo những gì",
    subtitle: "Một chuỗi quyết định trải qua ba tháng, và Standard nào kích hoạt ở mỗi bước",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📦",
    whyItMatters:
      "Chuyển việc là chuỗi quyết định chứ không phải một quyết định, và mỗi bước có một câu trả lời khác nhau - đó là lý do nó là dạng case ưa thích của đề thi.",
    openingQuestion:
      "Trong ba tháng trước khi nghỉ, hành động nào của bạn là vi phạm?",
    openingOptions: [
      "Đăng ký thành lập công ty mới và thuê văn phòng",
      "Sao chép danh sách khách hàng vào máy tính cá nhân",
      "Trao đổi với nhà tuyển dụng tiềm năng về cơ hội mới",
      "Chuẩn bị hồ sơ năng lực cá nhân để gửi đi",
    ],
    correctOption: 1,
    explanation:
      "Ba hành động kia đều là chuẩn bị hợp pháp cho một bước đi nghề nghiệp bình thường. Sao chép danh sách khách hàng thì khác về bản chất: đó là tài sản của nhà tuyển dụng, và việc mang nó đi phục vụ mục đích cạnh tranh với chính họ. Điểm tinh tế là hành vi này hoàn tất ngay lúc sao chép, không phải lúc bạn dùng danh sách đó - cũng như việc bạn có thể tự nhớ được tên một số khách không làm việc sao chép thành hợp lệ. Kiến thức trong đầu bạn thì đi theo bạn; một file thì không, kể cả khi nội dung file đó bạn cũng nhớ được.",
    sections: [
      {
        "type": "lead",
        "text": "Chuyển việc là chuyện bình thường trong nghề. Nhưng khoảng thời gian giữa lúc quyết định đi và lúc chính thức nghỉ là nơi Standard IV(A) về lòng trung thành với nhà tuyển dụng bị vi phạm nhiều nhất."
      },
      {
        "type": "heading",
        "text": "Được phép làm gì trong lúc còn đang làm thuê"
      },
      {
        "type": "list",
        "items": [
          "Chuẩn bị thủ tục thành lập doanh nghiệp riêng ngoài giờ làm việc.",
          "Trao đổi với nhà tuyển dụng mới về điều kiện và thời điểm bắt đầu.",
          "Thuê văn phòng, mở tài khoản, làm những việc hành chính không dùng nguồn lực công ty hiện tại."
        ]
      },
      {
        "type": "paragraph",
        "text": "Ba việc trên đều là chuẩn bị hợp pháp cho một bước đi nghề nghiệp bình thường. Ranh giới bị vượt qua khi bạn dùng nguồn lực hoặc quan hệ của nhà tuyển dụng hiện tại để cạnh tranh với chính họ - liên hệ trước với khách hàng, hoặc sao chép dữ liệu."
      },
      {
        "type": "callout",
        "label": "Điểm tinh tế nhất",
        "text": "Sao chép danh sách khách hàng hoàn tất vi phạm ngay lúc sao chép, không phải lúc bạn dùng nó. Và việc bạn tự nhớ được tên một số khách hàng không làm hành vi sao chép trở nên hợp lệ."
      },
      {
        "type": "paragraph",
        "text": "Cách phân biệt gọn nhất: kiến thức trong đầu bạn thì đi theo bạn, một file thì không - kể cả khi nội dung file đó bạn cũng nhớ được. Sau khi đã nghỉ việc, nghĩa vụ theo Standard IV(A) chấm dứt; điều còn ràng buộc bạn khi đó chỉ là các thỏa thuận riêng đã ký, nếu có."
      },
      {
        "type": "closing",
        "lines": [
          "Chuẩn bị ra đi là quyền của bạn.",
          "Dùng tài sản của người đang trả lương bạn để làm việc đó thì không."
        ]
      }
    ],
    diagram: [
      { label: "Chuẩn bị hành chính: hợp lệ", arrow: true },
      { label: "Trao đổi với nhà tuyển dụng mới: hợp lệ", arrow: true },
      { label: "Sao chép tài sản công ty: vi phạm, hoàn tất lúc sao chép", arrow: true },
      { label: "Kiến thức đi theo bạn, file thì không" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ba tháng sau khi nghỉ, câu trả lời đổi",
      description:
        "Sau khi quan hệ lao động chấm dứt, nghĩa vụ theo Standard IV(A) cũng chấm dứt. Liên hệ khách hàng cũ bằng thông tin công khai - danh bạ, mạng nghề nghiệp, hoặc chính khách chủ động tìm bạn - là hợp lệ. Thứ còn ràng buộc chỉ là các thỏa thuận riêng nếu có: cam kết không cạnh tranh, không lôi kéo khách, hoặc bảo mật. Đây là lý do cùng một hành động - gọi điện cho một khách hàng cũ - là vi phạm ở tháng thứ ba và hợp lệ ở tháng thứ tư.",
    },
    quiz: [
      {
        question: "Hành vi sao chép danh sách khách hàng hoàn tất khi nào?",
        options: [
          "Ngay lúc sao chép, không phải lúc sử dụng danh sách",
          "Khi bạn dùng danh sách để liên hệ khách hàng đầu tiên",
          "Khi có khách hàng thực sự chuyển sang theo bạn",
          "Khi công ty cũ phát hiện ra việc sao chép đó",
        ],
        correct: 0,
        explanation:
          "Nếu chỉ tính lúc sử dụng thì việc lấy tài sản của người khác chỉ thành vấn đề khi nó có hiệu quả - điều đó không hợp lý.",
      },
      {
        question: "Việc bạn tự nhớ được tên một số khách có làm sao chép thành hợp lệ không?",
        options: [
          "Không, kiến thức trong đầu và file là hai thứ khác nhau",
          "Có, vì nội dung đó vốn đã nằm trong trí nhớ của bạn",
          "Có, nếu bạn chỉ nhớ được dưới một nửa danh sách",
          "Không, trừ khi bạn xóa file ngay sau khi sao chép",
        ],
        correct: 0,
        explanation:
          "Đây là ranh giới thực tế được dùng phổ biến nhất, và nó không phụ thuộc vào việc bạn nhớ được bao nhiêu.",
      },
      {
        question: "Sau khi đã nghỉ việc, liên hệ khách hàng cũ bằng thông tin công khai thì sao?",
        options: [
          "Hợp lệ, trừ khi có thỏa thuận riêng ràng buộc",
          "Vi phạm vì khách hàng thuộc về công ty cũ vĩnh viễn",
          "Chỉ hợp lệ sau khi hết thời hạn sáu tháng kể từ ngày nghỉ",
          "Chỉ hợp lệ nếu công ty cũ đồng ý bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Nghĩa vụ theo IV(A) chấm dứt cùng quan hệ lao động; thứ còn lại là các cam kết hợp đồng riêng nếu có.",
      },
      {
        question: "Vì sao cùng một cuộc gọi lại khác nhau ở tháng thứ ba và tháng thứ tư?",
        options: [
          "Vì nghĩa vụ trung thành tồn tại trong quan hệ lao động",
          "Vì khách hàng cần thời gian để cân nhắc việc chuyển đổi",
          "Vì công ty cũ có quyền giữ khách trong ba tháng đầu",
          "Vì quy định yêu cầu thời gian chờ ba tháng sau khi nghỉ",
        ],
        correct: 0,
        explanation:
          "Toàn bộ Standard IV(A) tồn tại trong khoảng thời gian bạn còn đang nhận lương của bên đó.",
      },
      {
        question: "Mô hình định giá bạn tự xây ở công ty cũ thì mang theo được không?",
        options: [
          "Không mang file, nhưng dựng lại bằng kiến thức thì được",
          "Được, vì đó là sản phẩm trí tuệ do chính bạn tạo ra",
          "Được nếu bạn xây nó ngoài giờ làm việc chính thức",
          "Không, và cũng không được dựng lại mô hình tương tự",
        ],
        correct: 0,
        explanation:
          "Ranh giới nằm ở vật mang thông tin chứ không ở nội dung - và đây cũng là chỗ Standard V(A) yêu cầu bạn dựng lại cơ sở của chính mình.",
      },
    ],
    keyTakeaways: [
      "Chuẩn bị hành chính và trao đổi với nhà tuyển dụng mới đều hợp lệ",
      "Sao chép tài sản công ty vi phạm ngay lúc sao chép",
      "Nhớ được nội dung không làm việc sao chép thành hợp lệ",
      "Sau khi nghỉ, IV(A) chấm dứt - chỉ còn thỏa thuận riêng nếu có",
      "Kiến thức đi theo bạn, file thì không",
    ],
    practicePrompt: {
      question:
        "Một khách hàng cũ chủ động gọi cho bạn hai tuần sau khi bạn nghỉ, đề nghị chuyển tài sản sang chỗ mới. Bạn nhận được không?",
      options: [
        "Không, vì hai tuần là quá sớm sau khi nghỉ việc",
        "Được, nếu bạn không chủ động liên hệ trước và không có cam kết không lôi kéo khách ràng buộc bạn",
        "Được, nhưng phải thông báo cho công ty cũ trước",
        "Không, vì khách hàng vẫn thuộc về công ty cũ",
      ],
      correct: 1,
      explanation:
        "Hai điều kiện phải cùng đúng, và điều kiện đầu là chỗ dễ bị bỏ qua: nếu bạn đã liên hệ trước khi nghỉ thì cuộc gọi này không thực sự là khách chủ động. Không có thời hạn chờ nào trong Standard IV(A) - nó chấm dứt cùng quan hệ lao động, nên hai tuần hay hai tháng không khác nhau.",
    },
  },
  {
    id: 1611,
    slug: "cfa-ethics-case-phat-hien-sai-pham",
    title: "CFA Ethics 47: Case - Phát hiện sai phạm ở nơi mình làm việc",
    subtitle: "Thứ tự các bước, giới hạn của nghĩa vụ tố cáo, và điểm mà rời đi là câu trả lời đúng",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚨",
    whyItMatters:
      "Đây là tình huống mà chuẩn mực nói ít hơn người ta tưởng - nó không buộc bạn thành người tố cáo - nhưng thứ nó buộc thì tuyệt đối, và nhiều người bỏ qua vì tưởng im lặng là trung lập.",
    openingQuestion:
      "Bạn phát hiện một đồng nghiệp đang phân bổ các lệnh có lãi vào tài khoản cá nhân và lệnh lỗ vào tài khoản khách. Bước đầu tiên là gì?",
    openingOptions: [
      "Báo ngay cho cơ quan quản lý bên ngoài công ty",
      "Nêu vấn đề qua kênh nội bộ và ngừng mọi tham gia liên quan",
      "Nói trực tiếp với các khách hàng bị ảnh hưởng",
      "Thu thập thêm bằng chứng trong vài tháng trước khi hành động",
    ],
    correctOption: 1,
    explanation:
      "Chuẩn mực CFA không buộc thành viên tố cáo ra bên ngoài - ở nhiều nơi việc đó còn bị luật hạn chế, và một cáo buộc sai gây tổn hại thật cho người bị cáo buộc. Thứ nó buộc là hai điều: tách mình khỏi hành vi vi phạm, và đưa vấn đề lên trong nội bộ qua kênh phù hợp. Phương án thu thập thêm bằng chứng trong vài tháng nghe thận trọng nhưng thường sai, vì trong thời gian đó thiệt hại cho khách hàng tiếp tục tích lũy và sự im lặng của bạn dần trở thành đồng thuận. Nếu kênh nội bộ không xử lý, các bước tiếp theo là leo thang lên cấp cao hơn hoặc lên hội đồng quản trị, và cuối cùng là cân nhắc rời khỏi tổ chức.",
    sections: [
      {
        "type": "lead",
        "text": "Bạn phát hiện đồng nghiệp hoặc cấp trên đang làm điều sai. Chuẩn mực CFA nói rất rõ về hai việc bạn phải làm - và cũng rõ về việc nó không đòi hỏi."
      },
      {
        "type": "heading",
        "text": "Hai nghĩa vụ bắt buộc"
      },
      {
        "type": "list",
        "items": [
          "Tách mình khỏi hành vi vi phạm: ngừng tham gia, ngừng ký, ngừng để tên mình gắn vào.",
          "Đưa vấn đề lên trong nội bộ qua kênh phù hợp - bộ phận tuân thủ hoặc cấp quản lý ngoài chuỗi liên quan."
        ]
      },
      {
        "type": "callout",
        "label": "Điều chuẩn mực KHÔNG đòi hỏi",
        "text": "Tố cáo ra bên ngoài. Ở nhiều nơi việc đó còn bị luật hạn chế, và một cáo buộc sai gây tổn hại thật cho người bị cáo buộc. Kênh nội bộ là bước đi trước."
      },
      {
        "type": "heading",
        "text": "Vì sao 'thu thập thêm bằng chứng' thường là câu trả lời sai"
      },
      {
        "type": "paragraph",
        "text": "Nghe rất thận trọng, nhưng trong vài tháng chờ đợi đó thiệt hại cho khách hàng tiếp tục tích lũy, và sự im lặng của bạn dần trở thành đồng thuận. Việc tách mình khỏi hành vi vi phạm được nêu trước vì nó không cần điều kiện tiên quyết nào - bạn làm được ngay hôm nay, kể cả khi chưa chắc chắn tuyệt đối."
      },
      {
        "type": "paragraph",
        "text": "Nếu kênh nội bộ không xử lý, các bước tiếp theo là leo thang lên cấp cao hơn, rồi lên hội đồng quản trị, và cuối cùng là cân nhắc rời khỏi tổ chức. Một điểm cần nhớ suốt quá trình: làm theo chỉ đạo của cấp trên chưa bao giờ là lập luận miễn trách trong khung đạo đức nghề nghiệp."
      },
      {
        "type": "closing",
        "lines": [
          "Bạn không bắt buộc phải là người tố cáo.",
          "Nhưng bạn bắt buộc không được là người tiếp tay."
        ]
      }
    ],
    diagram: [
      { label: "Ngừng mọi tham gia liên quan tới hành vi đó", arrow: true },
      { label: "Nêu vấn đề qua kênh nội bộ phù hợp", arrow: true },
      { label: "Không xử lý: leo thang lên cấp cao hơn", arrow: true },
      { label: "Vẫn không xử lý: cân nhắc rời khỏi tổ chức" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao 'tôi chỉ làm theo chỉ đạo' không phải lập luận",
      description:
        "Standard I(A) nói thẳng rằng thành viên phải tách mình khỏi mọi hành vi vi phạm, và điều đó không có ngoại lệ cho việc hành vi đến từ cấp trên. Tiếp tục thực hiện phần việc của mình trong một quy trình mà bạn biết là sai chính là tham gia, dù bạn không phải người khởi xướng và không hưởng lợi. Đây cũng là lý do nghĩa vụ tách mình được nêu trước nghĩa vụ báo cáo: bạn có thể chưa biết phải báo cho ai, nhưng bạn luôn có thể ngừng làm.",
    },
    quiz: [
      {
        question: "Chuẩn mực CFA có buộc thành viên tố cáo ra bên ngoài không?",
        options: [
          "Không, nhưng buộc tách mình và nêu vấn đề trong nội bộ",
          "Có, phải báo cơ quan quản lý ngay khi phát hiện",
          "Có, nếu thiệt hại vượt một ngưỡng giá trị nhất định",
          "Không, và cũng không buộc phải làm gì khác",
        ],
        correct: 0,
        explanation:
          "Ở nhiều nơi tố cáo ra ngoài còn bị luật hạn chế, và một cáo buộc sai gây tổn hại thật - nên chuẩn dừng ở nghĩa vụ nội bộ.",
      },
      {
        question: "Vì sao 'thu thập thêm bằng chứng trong vài tháng' thường là sai?",
        options: [
          "Vì thiệt hại tiếp tục tích lũy và im lặng dần thành đồng thuận",
          "Vì bằng chứng thu thập riêng lẻ không có giá trị pháp lý",
          "Vì quy định yêu cầu báo cáo trong vòng bảy ngày làm việc",
          "Vì đồng nghiệp có thể phát hiện và tiêu hủy chứng cứ",
        ],
        correct: 0,
        explanation:
          "Nghe thận trọng nhưng thực chất là trì hoãn, và cái giá của trì hoãn rơi vào khách hàng chứ không rơi vào bạn.",
      },
      {
        question: "Nghĩa vụ nào được nêu trước trong thứ tự xử lý?",
        options: [
          "Tách mình khỏi hành vi vi phạm",
          "Báo cáo lên bộ phận tuân thủ của công ty",
          "Thông báo cho khách hàng bị ảnh hưởng",
          "Lưu giữ bằng chứng về hành vi vi phạm",
        ],
        correct: 0,
        explanation:
          "Bạn có thể chưa biết phải báo cho ai, nhưng bạn luôn có thể ngừng làm - nên nghĩa vụ này không có điều kiện tiên quyết nào.",
      },
      {
        question: "'Tôi chỉ làm theo chỉ đạo cấp trên' được xử lý thế nào?",
        options: [
          "Không phải lập luận - tiếp tục thực hiện chính là tham gia",
          "Là tình tiết giảm nhẹ nếu chứng minh được có chỉ đạo",
          "Miễn trách nhiệm vì trách nhiệm thuộc về người ra lệnh",
          "Chỉ được chấp nhận nếu bạn không hưởng lợi từ vi phạm",
        ],
        correct: 0,
        explanation:
          "Standard I(A) không có ngoại lệ cho việc hành vi đến từ cấp trên - đó là toàn bộ ý nghĩa của nghĩa vụ tách mình.",
      },
      {
        question: "Bước cuối cùng khi mọi kênh nội bộ không xử lý là gì?",
        options: [
          "Cân nhắc rời khỏi tổ chức",
          "Công bố sự việc lên truyền thông",
          "Tự thông báo cho toàn bộ khách hàng bị ảnh hưởng",
          "Tiếp tục làm việc nhưng ghi lại mọi sự việc",
        ],
        correct: 0,
        explanation:
          "Ở lại trong một tổ chức mà bạn biết đang vi phạm và không chịu sửa là quay lại vấn đề tham gia mà bước đầu tiên đã xử lý.",
      },
    ],
    keyTakeaways: [
      "Chuẩn mực không buộc tố cáo ra ngoài, nhưng buộc tách mình và nêu nội bộ",
      "Tách mình được nêu trước vì nó không cần điều kiện tiên quyết nào",
      "Thu thập bằng chứng kéo dài là trì hoãn - cái giá rơi vào khách hàng",
      "Làm theo chỉ đạo cấp trên không phải lập luận miễn trách",
      "Kênh nội bộ bế tắc: leo thang, rồi cân nhắc rời tổ chức",
    ],
    practicePrompt: {
      question:
        "Bạn đã báo lên tuân thủ, họ kết luận không có vi phạm, nhưng bạn vẫn tin là có. Nên làm gì?",
      options: [
        "Chấp nhận kết luận vì đã hoàn thành nghĩa vụ báo cáo",
        "Tiếp tục tách mình khỏi hoạt động liên quan, và cân nhắc leo thang lên cấp cao hơn nếu cơ sở của bạn vẫn vững",
        "Báo ngay ra cơ quan quản lý bên ngoài",
        "Tự thu thập thêm bằng chứng để báo cáo lại lần hai",
      ],
      correct: 1,
      explanation:
        "Phương án đầu là chỗ nhiều người dừng lại, và nó sai ở một điểm cụ thể: nghĩa vụ tách mình không phụ thuộc vào việc bộ phận tuân thủ kết luận ra sao. Bạn đã hoàn thành nghĩa vụ báo cáo, nhưng nếu vẫn tin hành vi đó là vi phạm thì tiếp tục tham gia vào nó vẫn là tham gia.",
    },
  },
  {
    id: 1612,
    slug: "cfa-ethics-case-ra-mat-quy-moi",
    title: "CFA Ethics 48: Case - Ra mắt một quỹ mới và mọi thứ có thể sai trong tài liệu chào bán",
    subtitle: "Hiệu suất mô phỏng, danh xưng, chuẩn tham chiếu và lời hứa - bốn Standard trong một bộ tài liệu",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚀",
    whyItMatters:
      "Tài liệu chào bán là nơi nhiều Standard giao nhau nhất trong một sản phẩm duy nhất, và cũng là nơi áp lực thương mại lớn nhất - nên đây là case tổng hợp phù hợp nhất để khép lại phần Ethics.",
    openingQuestion:
      "Tài liệu chào bán quỹ mới ghi: 'Chiến lược đạt 18%/năm giai đoạn 2019-2024' - trong đó 2019-2022 là mô phỏng ngược. Vấn đề nằm ở đâu?",
    openingOptions: [
      "Không có vấn đề nếu phần mô phỏng được tính đúng phương pháp",
      "Trình bày sai lệch: gộp mô phỏng với vận hành thật thành một con số duy nhất",
      "Chỉ là vấn đề nếu giai đoạn mô phỏng cho kết quả cao hơn",
      "Vấn đề duy nhất là chưa nêu rõ mức phí đã trừ hay chưa",
    ],
    correctOption: 1,
    explanation:
      "Một con số duy nhất phủ lên cả hai giai đoạn phát đi thông điệp rằng chiến lược đã hoạt động liên tục sáu năm, trong khi bốn năm đầu không có đồng nào thật được đầu tư và các tham số đã được chọn sau khi biết kết quả. Standard III(D) yêu cầu trình bày công bằng, chính xác và đầy đủ - và ở đây cả ba đều bị chạm: không công bằng vì mô phỏng và thực tế không cùng loại bằng chứng, không đầy đủ vì người đọc không biết đâu là đâu, và không chính xác về mặt điều nó ngụ ý dù từng con số riêng lẻ có thể đúng.",
    diagram: [
      { label: "III(D): gộp mô phỏng với thật là trình bày sai lệch", arrow: true },
      { label: "VII(B): danh xưng của đội ngũ phải mô tả đúng tình trạng", arrow: true },
      { label: "V(B): chuẩn tham chiếu phải cùng nhóm tài sản", arrow: true },
      { label: "I(C): mọi tuyên bố về năng lực phải kiểm chứng được" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Chuẩn tham chiếu là chỗ sai lệch dễ nhất và khó bắt nhất",
      description:
        "Chọn một chỉ số dễ vượt làm chuẩn tham chiếu không sai một con số nào, nhưng nó biến một kết quả trung bình thành một kết quả vượt trội trên giấy. Standard V(B) yêu cầu nêu rõ quy trình và cơ sở, và việc chuẩn tham chiếu phải cùng nhóm tài sản, cùng phân khúc và cùng mức rủi ro nằm trong yêu cầu đó. So một quỹ cổ phiếu vốn hóa vừa với lãi suất tiền gửi là ví dụ cực đoan; so nó với một chỉ số vốn hóa lớn là ví dụ tinh vi hơn nhiều và phổ biến hơn nhiều.",
    },
    quiz: [
      {
        question: "Gộp hiệu suất mô phỏng với hiệu suất thật vi phạm Standard nào?",
        options: [
          "III(D) - Performance Presentation",
          "V(A) - Diligence and Reasonable Basis",
          "VI(A) - Disclosure of Conflicts",
          "IV(B) - Additional Compensation",
        ],
        correct: 0,
        explanation:
          "Ba yêu cầu của III(D) - công bằng, chính xác, đầy đủ - đều bị chạm cùng lúc trong cách trình bày này.",
      },
      {
        question: "Vì sao chọn chuẩn tham chiếu dễ vượt lại là vấn đề?",
        options: [
          "Vì nó biến kết quả trung bình thành vượt trội trên giấy",
          "Vì quy định bắt buộc dùng đúng một chỉ số cho mỗi loại quỹ",
          "Vì chuẩn tham chiếu ảnh hưởng trực tiếp tới mức phí hiệu suất",
          "Vì nhà đầu tư không có cách nào kiểm tra chỉ số đó",
        ],
        correct: 0,
        explanation:
          "Đây là dạng sai lệch tinh vi nhất: mọi con số đều đúng và vẫn dẫn người đọc tới một kết luận sai.",
      },
      {
        question: "Đội ngũ quỹ gồm người đã đỗ ba cấp độ nhưng chưa đủ kinh nghiệm thì ghi thế nào?",
        options: [
          "Mô tả đúng tình trạng, không dùng danh xưng CFA",
          "Ghi 'CFA' vì đã hoàn thành toàn bộ các kỳ thi",
          "Ghi 'CFA (chờ cấp)' để thể hiện giai đoạn cuối",
          "Không cần nêu gì về tiến độ chương trình CFA",
        ],
        correct: 0,
        explanation:
          "Standard VII(B) áp dụng nguyên vẹn trong tài liệu marketing - đây là chỗ áp lực thương mại hay đẩy người ta đi quá.",
      },
      {
        question: "Tuyên bố 'đội ngũ có 50 năm kinh nghiệm tổng hợp' thuộc phạm vi Standard nào?",
        options: [
          "I(C) - tuyên bố năng lực phải kiểm chứng được",
          "III(A) - nghĩa vụ trung thành với khách hàng",
          "IV(C) - trách nhiệm của người giám sát",
          "VI(B) - thứ tự ưu tiên giao dịch",
        ],
        correct: 0,
        explanation:
          "Cách cộng dồn kinh nghiệm của nhiều người không sai, nhưng nó phải đúng và không tạo ấn tượng về chiều sâu không có thật.",
      },
      {
        question: "Nếu quỹ tuyên bố tuân thủ GIPS thì điều gì bắt buộc đi kèm?",
        options: [
          "Toàn bộ công ty phải tuân thủ, không riêng quỹ này",
          "Chỉ cần quỹ này được xác minh bởi bên độc lập",
          "Chỉ cần công bố phương pháp tính hiệu suất của quỹ",
          "Chỉ cần có ít nhất năm năm lịch sử hoạt động thật",
        ],
        correct: 0,
        explanation:
          "Tuân thủ ở cấp công ty là quy tắc nền của GIPS, và nó tồn tại để chặn đúng việc gắn nhãn cho sản phẩm đẹp nhất.",
      },
    ],
    keyTakeaways: [
      "Gộp mô phỏng với vận hành thật chạm cả ba yêu cầu của III(D)",
      "Chuẩn tham chiếu sai loại là sai lệch không cần một con số sai nào",
      "VII(B) áp dụng nguyên vẹn trong tài liệu marketing",
      "Mọi tuyên bố về năng lực đội ngũ phải kiểm chứng được theo I(C)",
      "Tuyên bố GIPS kéo theo nghĩa vụ ở cấp toàn công ty",
    ],
    practicePrompt: {
      question:
        "Bộ phận kinh doanh muốn ghi 'mục tiêu lợi nhuận 15%/năm' lên trang bìa tài liệu. Bạn phản hồi thế nào?",
      options: [
        "Đồng ý vì đó là mục tiêu chứ không phải cam kết",
        "Yêu cầu nêu rõ đây là mục tiêu kèm giả định và điều kiện thị trường để đạt được, và không đặt nó ở vị trí tạo ấn tượng là kết quả kỳ vọng chắc chắn",
        "Từ chối vì mọi con số hướng tới tương lai đều bị cấm",
        "Đồng ý nếu thêm dòng miễn trừ trách nhiệm ở chân trang",
      ],
      correct: 1,
      explanation:
        "Standard V(B) không cấm nêu mục tiêu - nó đòi tách rõ sự thật khỏi ý kiến và nêu giả định đằng sau. Dòng miễn trừ ở chân trang là cách phổ biến nhất và nó không đạt chuẩn, vì vị trí và mức nổi bật là một phần của việc công bố có ý nghĩa hay không.",
    },
  },
];
