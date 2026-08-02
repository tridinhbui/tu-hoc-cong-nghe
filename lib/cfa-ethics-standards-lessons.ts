import type { Lesson } from "./lesson-types";

// CFA Ethics, phần mở rộng theo từng Standard (ids 1571-1582).
//
// Ethics chiếm 15-20% đề thi CFA Level I - nặng nhất trong mười môn - nhưng
// trước loạt bài này nó chỉ có 14 bài trong khi Financial Statement Analysis
// có 77. Đo theo tỷ trọng bài học thì Ethics ở 4.3%, lệch 13 điểm phần trăm
// so với trọng số đề thi và là khoảng cách lớn nhất của cả mười môn.
//
// Loạt bài cũ đi theo hướng tổng quan và case tổng hợp: Code of Ethics, bảy
// nhóm Standards, GIPS, rồi các case study ghép nhiều Standard. Phần còn
// thiếu là chiều sâu của từng Standard riêng lẻ và hai Learning Module nền
// tảng mà đề cương chính thức đặt trước tất cả - khung ra quyết định đạo đức,
// và vì sao ngành đầu tư đặc biệt phụ thuộc vào niềm tin.
//
// Vì thế thứ tự ở đây là: hai bài nền tảng, rồi lần lượt các Standard chưa
// được đào sâu - I(A), I(B), I(C), II(A) mosaic, II(B), III(B), III(D),
// IV(B), V(B), VII(B).

export const CFA_ETHICS_STANDARDS_LESSONS: Lesson[] = [
  {
    id: 1571,
    slug: "cfa-ethics-khung-ra-quyet-dinh-dao-duc",
    title: "CFA Ethics 15: Khung ra quyết định đạo đức - công cụ dùng khi chưa biết Standard nào áp dụng",
    subtitle: "Đề thi cho tình huống chưa từng gặp, không cho tên Standard - khung này là thứ dùng để bắt đầu",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    whyItMatters:
      "Thuộc lòng bảy nhóm Standards vẫn không đủ, vì tình huống thật hiếm khi tự dán nhãn. Khung ra quyết định là thứ dùng khi bạn cảm thấy có gì đó sai nhưng chưa gọi được tên nó - và đó chính là dạng câu hỏi khó nhất trong đề.",
    openingQuestion:
      "Bạn được sếp yêu cầu đổi khuyến nghị từ 'Trung lập' sang 'Mua' cho một cổ phiếu mà công ty bạn sắp bảo lãnh phát hành. Bước đầu tiên nên làm là gì?",
    openingOptions: [
      "Từ chối ngay và nộp đơn nghỉ việc để giữ tính chính trực",
      "Xác định rõ tình huống: ai bị ảnh hưởng, nghĩa vụ của bạn với từng bên, và sự thật nào đang bị bỏ qua",
      "Làm theo yêu cầu vì sếp chịu trách nhiệm cuối cùng về báo cáo",
      "Đổi khuyến nghị nhưng ghi chú nhỏ ở cuối báo cáo để tự bảo vệ",
    ],
    correctOption: 1,
    explanation:
      "Phản xạ đầu tiên của phần lớn người học là nhảy thẳng tới hành động - từ chối, tuân theo, hoặc tìm cách lách. Khung ra quyết định đặt một bước trước đó: mô tả tình huống cho đủ trước khi phán xét nó. Ai là người bị ảnh hưởng thật sự - khách hàng đọc báo cáo, nhà tuyển dụng, thị trường nói chung? Nghĩa vụ nào đang xung đột với nghĩa vụ nào? Có sự thật nào bạn chưa biết mà nếu biết sẽ đổi kết luận không? Rất nhiều tình huống trông như vi phạm hóa ra chỉ thiếu một lần công bố, và ngược lại, nhiều tình huống trông vô hại lại vi phạm khi nhìn từ phía người bị ảnh hưởng.",
    diagram: [
      { label: "Nhận diện: sự thật, các bên liên quan, nghĩa vụ, xung đột", arrow: true },
      { label: "Cân nhắc: hỏi ý kiến, tìm thêm dữ kiện, xét các phương án", arrow: true },
      { label: "Hành động: làm, hoặc leo thang lên cấp cao hơn", arrow: true },
      { label: "Nhìn lại: kết quả có đúng như dự kiến không" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao bước 'nhìn lại' hay bị bỏ qua nhất",
      description:
        "Ba bước đầu diễn ra dưới áp lực và ai cũng nhớ làm. Bước thứ tư xảy ra sau khi mọi chuyện đã qua, không ai thúc, và không có hậu quả tức thì nếu bỏ. Nhưng đó là bước duy nhất biến một lần xử lý thành kinh nghiệm dùng lại được - và là bước phân biệt người xử lý tốt tình huống thứ hai với người lặp lại đúng sai lầm cũ dưới một cái tên khác.",
    },
    quiz: [
      {
        question: "Bước đầu tiên trong khung ra quyết định đạo đức là gì?",
        options: [
          "Nhận diện sự thật, các bên liên quan và nghĩa vụ đang xung đột",
          "Tra cứu Standard nào áp dụng rồi đối chiếu từng câu chữ của nó",
          "Báo cáo ngay sự việc lên bộ phận tuân thủ của công ty",
          "Đánh giá xem hành vi đó có bị pháp luật xử phạt hay không",
        ],
        correct: 0,
        explanation:
          "Tra Standard là bước sau. Không mô tả đủ tình huống thì tra sẽ ra nhầm Standard, và câu trả lời đúng cho câu hỏi sai vẫn là câu trả lời sai.",
      },
      {
        question: "Vì sao 'hỏi ý kiến người khác' được đưa hẳn vào khung như một bước?",
        options: [
          "Vì người trong cuộc khó thấy điểm mù của chính mình",
          "Vì quy định buộc phải có ít nhất hai người cùng ký xác nhận",
          "Vì trách nhiệm được chia sẻ khi có nhiều người cùng quyết định",
          "Vì cấp trên luôn có thẩm quyền quyết định thay cho cấp dưới",
        ],
        correct: 0,
        explanation:
          "Áp lực và lợi ích cá nhân bóp méo phán đoán theo cách người trong cuộc không tự nhận ra. Hỏi ý kiến không phải để chia sẻ trách nhiệm - trách nhiệm vẫn thuộc về người hành động.",
      },
      {
        question:
          "Trong tình huống mở đầu, phương án nào phù hợp với bước 'hành động' của khung?",
        options: [
          "Nêu vấn đề với sếp, và nếu không được thì leo thang lên tuân thủ",
          "Đổi khuyến nghị theo yêu cầu rồi ghi chú nhỏ ở cuối báo cáo",
          "Im lặng làm theo vì sếp là người chịu trách nhiệm cuối cùng",
          "Nghỉ việc ngay lập tức để không dính líu tới báo cáo đó",
        ],
        correct: 0,
        explanation:
          "Khung không đòi hỏi hành động cực đoan. Leo thang trong nội bộ là bước hợp lý và thường đủ; nghỉ việc là lựa chọn cuối khi mọi kênh nội bộ đã đóng.",
      },
      {
        question: "Bước 'nhìn lại' sau khi đã xử lý xong có tác dụng gì?",
        options: [
          "Biến một lần xử lý thành kinh nghiệm dùng được cho lần sau",
          "Cho phép rút lại quyết định nếu kết quả không như mong muốn",
          "Chuyển trách nhiệm sang bộ phận tuân thủ khi có hậu quả xấu",
          "Thỏa mãn yêu cầu lưu hồ sơ bắt buộc theo chuẩn mực nghề nghiệp",
        ],
        correct: 0,
        explanation:
          "Đây là bước không ai thúc và không có hậu quả tức thì nếu bỏ, nên nó bị bỏ nhiều nhất - và cũng là bước duy nhất khiến lần sau khác lần này.",
      },
      {
        question: "Vì sao khung này hữu ích với dạng câu hỏi tình huống trong đề thi?",
        options: [
          "Vì đề mô tả tình huống chứ không nêu tên Standard nào",
          "Vì đề luôn có một phương án đúng theo khung và ba phương án sai",
          "Vì khung cho phép loại trừ nhanh mà không cần đọc hết tình huống",
          "Vì đề Ethics luôn hỏi về quy trình chứ không hỏi về nội dung",
        ],
        correct: 0,
        explanation:
          "Việc chuyển từ mô tả tình huống sang tên Standard là chính phần bị chấm điểm. Khung là công cụ làm bước chuyển đó có hệ thống thay vì đoán theo cảm giác.",
      },
    ],
    keyTakeaways: [
      "Bốn bước: nhận diện, cân nhắc, hành động, nhìn lại",
      "Mô tả tình huống trước khi phán xét - tra Standard quá sớm hay ra nhầm Standard",
      "Hỏi ý kiến để bù điểm mù, không phải để chia sẻ trách nhiệm",
      "Leo thang nội bộ là hành động hợp lý; nghỉ việc là lựa chọn cuối",
      "Bước nhìn lại bị bỏ nhiều nhất vì không ai thúc, nhưng nó là bước duy nhất tạo kinh nghiệm",
    ],
    practicePrompt: {
      question:
        "Bạn phát hiện một đồng nghiệp thường xuyên làm tròn số liệu hiệu suất lên trong tài liệu gửi khách. Áp dụng khung, bước tiếp theo là gì?",
      options: [
        "Báo ngay cho cơ quan quản lý bên ngoài công ty",
        "Xác định mức độ: sai lệch bao nhiêu, ai đọc tài liệu đó, có phải chủ ý không - rồi mới chọn cách xử lý",
        "Bỏ qua vì đó là việc của bộ phận tuân thủ",
        "Nói thẳng với khách hàng của đồng nghiệp đó",
      ],
      correct: 1,
      explanation:
        "Làm tròn 0,1 điểm phần trăm trong một bản nháp nội bộ và làm tròn 3 điểm trong tài liệu chào khách là hai tình huống khác hẳn nhau, dù mô tả ban đầu giống nhau. Bước nhận diện tồn tại để tách hai trường hợp đó ra trước khi chọn hành động - và cả hai lựa chọn cực đoan ở trên đều bỏ qua đúng bước này.",
    },
  },
  {
    id: 1572,
    slug: "cfa-ethics-niem-tin-trong-nganh-dau-tu",
    title: "CFA Ethics 16: Vì sao ngành đầu tư phụ thuộc vào niềm tin nhiều hơn mọi ngành khác",
    subtitle: "Sản phẩm là một lời hứa về tương lai, và người mua gần như không có cách nào tự kiểm chứng",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🤝",
    whyItMatters:
      "Đây là bài giải thích vì sao có Code of Ethics ngay từ đầu. Không hiểu phần này thì bảy nhóm Standards chỉ là danh sách quy tắc phải nhớ, thay vì các hệ quả logic của một vấn đề cụ thể.",
    openingQuestion:
      "Điều gì khiến dịch vụ tài chính khó đánh giá chất lượng hơn so với mua một chiếc điện thoại?",
    openingOptions: [
      "Vì dịch vụ tài chính có giá cao hơn nhiều so với hàng tiêu dùng",
      "Vì kết quả phụ thuộc vào tương lai và bị lẫn với may rủi, nên khách hàng không tách được kỹ năng khỏi vận may",
      "Vì ngành tài chính chịu nhiều quy định pháp lý hơn các ngành khác",
      "Vì hợp đồng tài chính thường dài và khó đọc đối với người thường",
    ],
    correctOption: 1,
    explanation:
      "Một chiếc điện thoại hỏng thì bạn biết ngay nó hỏng. Một danh mục lỗ 20% thì bạn không biết đó là do người quản lý kém, do thị trường chung, hay do một rủi ro đã được cảnh báo trước mà bạn chấp nhận. Kinh tế học gọi đây là hàng hóa tín nhiệm - loại hàng mà người mua không đánh giá được chất lượng ngay cả sau khi đã tiêu dùng. Với hàng hóa tín nhiệm, cơ chế thị trường thông thường không tự lọc được bên kém, vì tín hiệu chất lượng bị nhiễu quá nặng. Đó là lý do ngành này cần một lớp ràng buộc bổ sung - đạo đức nghề nghiệp và quy định - thay vì để cạnh tranh tự xử lý.",
    diagram: [
      { label: "Kết quả đến chậm và lẫn với may rủi", arrow: true },
      { label: "Khách hàng không tự kiểm chứng được chất lượng", arrow: true },
      { label: "Cạnh tranh không tự lọc được bên kém", arrow: true },
      { label: "Cần ràng buộc đạo đức và quy định bù vào" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao mất niềm tin lan ra cả ngành",
      description:
        "Một hãng điện thoại làm sản phẩm lỗi thì khách chuyển sang hãng khác, và ngành vẫn hoạt động bình thường. Một vụ lừa đảo đầu tư lớn thì người ta rút tiền khỏi cả loại sản phẩm đó, kể cả ở những công ty không liên quan - vì nếu không phân biệt được bên tốt với bên xấu từ đầu, thì phản ứng hợp lý là tránh cả nhóm. Đây là lý do chi phí của hành vi phi đạo đức trong ngành này không dừng ở người gây ra nó.",
    },
    quiz: [
      {
        question: "Vì sao dịch vụ đầu tư được xếp vào nhóm 'hàng hóa tín nhiệm'?",
        options: [
          "Vì người mua không đánh giá được chất lượng ngay cả sau khi dùng",
          "Vì nó luôn đòi hỏi một khoản tiền đặt cọc trước khi sử dụng",
          "Vì nó chỉ được cung cấp bởi các tổ chức đã được cấp phép",
          "Vì giá của nó do thị trường quyết định chứ không do người bán",
        ],
        correct: 0,
        explanation:
          "Khác với hàng hóa tìm kiếm (đánh giá được trước khi mua) và hàng hóa trải nghiệm (đánh giá được sau khi dùng), hàng hóa tín nhiệm vẫn mờ mịt kể cả sau nhiều năm.",
      },
      {
        question: "Vì sao cạnh tranh thị trường không tự loại bỏ được bên làm ăn kém?",
        options: [
          "Vì tín hiệu chất lượng bị nhiễu bởi may rủi nên khó nhận ra",
          "Vì các công ty lớn có thể ngăn công ty mới gia nhập thị trường",
          "Vì khách hàng không được phép chuyển sang nhà cung cấp khác",
          "Vì phí dịch vụ được quy định thống nhất nên không cạnh tranh được",
        ],
        correct: 0,
        explanation:
          "Một người quản lý kém vẫn có thể có ba năm lãi nhờ thị trường chung, và một người giỏi vẫn có thể có ba năm lỗ. Trong nhiễu đó, thị trường mất rất lâu mới phân loại được.",
      },
      {
        question: "Vì sao một vụ bê bối làm tổn hại cả những công ty không liên quan?",
        options: [
          "Vì khách hàng không phân biệt được bên tốt với bên xấu nên tránh cả nhóm",
          "Vì cơ quan quản lý sẽ đình chỉ hoạt động của toàn bộ ngành một thời gian",
          "Vì các công ty trong ngành đều nắm cổ phần chéo lẫn nhau khá lớn",
          "Vì chi phí bồi thường được chia đều cho mọi công ty cùng ngành",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả trực tiếp của bài toán thông tin: nếu không tách được bên tốt khỏi bên xấu, phản ứng hợp lý của khách hàng là rút khỏi cả loại sản phẩm.",
      },
      {
        question: "Quan hệ giữa đạo đức nghề nghiệp và quy định pháp luật là gì?",
        options: [
          "Đạo đức thường đi trước và rộng hơn phạm vi luật quy định",
          "Đạo đức chỉ là cách diễn đạt khác của cùng những điều luật cấm",
          "Luật đi trước, đạo đức chỉ bổ sung khi luật chưa kịp cập nhật",
          "Hai hệ thống hoàn toàn độc lập và không giao nhau ở điểm nào",
        ],
        correct: 0,
        explanation:
          "Luật ra đời sau khi tổn hại đã xảy ra đủ nhiều để được ghi nhận. Đạo đức nghề nghiệp bao phủ cả vùng chưa có luật, và đó là lý do Standard I(A) yêu cầu tuân theo bên nghiêm ngặt hơn.",
      },
      {
        question: "Vì sao tính chính trực được đặt lên trên lợi ích cá nhân trong Code of Ethics?",
        options: [
          "Vì ngành chỉ tồn tại được khi khách hàng còn tin vào nó",
          "Vì lợi ích cá nhân luôn mâu thuẫn với lợi ích của khách hàng",
          "Vì thu nhập trong ngành đã đủ cao để không cần ưu tiên thêm",
          "Vì cơ quan quản lý xử phạt rất nặng mọi hành vi tư lợi",
        ],
        correct: 0,
        explanation:
          "Đây là lập luận về lợi ích chung dài hạn: mỗi lần một người trong ngành đặt lợi ích riêng lên trước, chi phí rơi vào toàn ngành dưới dạng niềm tin mất đi.",
      },
    ],
    keyTakeaways: [
      "Dịch vụ đầu tư là hàng hóa tín nhiệm: chất lượng không kiểm chứng được ngay cả sau khi dùng",
      "May rủi che lấp kỹ năng, nên tín hiệu chất lượng bị nhiễu nặng",
      "Vì thế cạnh tranh không tự lọc bên kém - cần ràng buộc đạo đức và quy định bù vào",
      "Bê bối lan ra cả ngành vì khách hàng không phân biệt được bên tốt với bên xấu",
      "Đạo đức đi trước và rộng hơn luật; luật thường chỉ ghi nhận sau khi tổn hại đã xảy ra",
    ],
    practicePrompt: {
      question:
        "Một quỹ có ba năm liên tiếp vượt chỉ số tham chiếu. Kết luận nào an toàn nhất?",
      options: [
        "Người quản lý có kỹ năng vượt trội đã được chứng minh",
        "Ba năm là quá ngắn để tách kỹ năng khỏi may rủi - cần xem cả quy trình đầu tư và mức rủi ro đã gánh",
        "Quỹ chắc chắn sẽ tiếp tục vượt chỉ số trong năm tới",
        "Không kết luận được gì vì hiệu suất quá khứ hoàn toàn vô nghĩa",
      ],
      correct: 1,
      explanation:
        "Đây chính là bài toán hàng hóa tín nhiệm áp vào một con số cụ thể. Ba năm không đủ mẫu để loại bỏ may rủi, nhưng nói hiệu suất quá khứ hoàn toàn vô nghĩa cũng sai - nó là bằng chứng yếu, không phải không bằng chứng. Cách đọc đúng là bổ sung thứ ít nhiễu hơn: quy trình đầu tư có kỷ luật không, và mức lợi nhuận đó đổi bằng bao nhiêu rủi ro.",
    },
  },
  {
    id: 1573,
    slug: "cfa-ethics-standard-1a-knowledge-of-the-law",
    title: "CFA Ethics 17: Standard I(A) - Khi luật địa phương lỏng hơn Code of Ethics",
    subtitle: "Quy tắc chọn bên nghiêm ngặt hơn, và nghĩa vụ tách mình khỏi hành vi vi phạm",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    whyItMatters:
      "Đây là Standard đầu tiên và cũng là Standard bị hiểu sai nhiều nhất: rất nhiều người mặc định 'làm đúng luật sở tại là đủ'. Với người làm việc xuyên biên giới hoặc ở thị trường mới nổi, hiểu sai chỗ này dẫn thẳng tới vi phạm.",
    openingQuestion:
      "Bạn làm việc ở một nước mà luật cho phép nhận hoa hồng từ bên thứ ba mà không cần công bố cho khách hàng, trong khi Code of Ethics yêu cầu công bố. Bạn phải làm gì?",
    openingOptions: [
      "Theo luật sở tại, vì luật có hiệu lực pháp lý cao hơn quy tắc nghề nghiệp",
      "Theo tiêu chuẩn nghiêm ngặt hơn - ở đây là Code of Ethics, tức vẫn phải công bố",
      "Tùy chọn, miễn là nhất quán trong suốt thời gian làm việc tại nước đó",
      "Theo yêu cầu của nhà tuyển dụng vì họ chịu trách nhiệm pháp lý cuối cùng",
    ],
    correctOption: 1,
    explanation:
      "Standard I(A) không nói 'tuân thủ luật', nó nói tuân thủ tiêu chuẩn NGHIÊM NGẶT HƠN trong ba thứ: luật nơi bạn làm việc, luật nơi hoạt động diễn ra, và Code of Ethics cùng Standards. Điều này chạy theo cả hai chiều. Nếu luật địa phương cấm điều mà Code cho phép, bạn theo luật. Nếu Code khắt khe hơn luật, bạn theo Code - và đây là chiều hay bị bỏ qua, vì nó không có ai cưỡng chế ngoài chính CFA Institute. Hệ quả thực tế: chuyển sang một thị trường quản lý lỏng hơn không làm nghĩa vụ của bạn nhẹ đi chút nào.",
    diagram: [
      { label: "Luật nơi bạn làm việc", arrow: true },
      { label: "Luật nơi hoạt động diễn ra", arrow: true },
      { label: "Code of Ethics và Standards", arrow: true },
      { label: "Áp dụng bên NGHIÊM NGẶT NHẤT trong ba" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Nghĩa vụ tách mình (dissociation)",
      description:
        "Khi biết đồng nghiệp hoặc cấp trên đang vi phạm, Standard I(A) không buộc bạn phải tố cáo ra bên ngoài - luật một số nơi thậm chí hạn chế điều đó. Thứ nó buộc là tách mình khỏi hành vi đó: ngừng tham gia, nêu vấn đề với cấp quản lý hoặc bộ phận tuân thủ, và nếu không được xử lý thì cân nhắc rời khỏi vai trò liên quan. Im lặng tiếp tục làm là hình thức tham gia, dù bạn không phải người khởi xướng.",
    },
    quiz: [
      {
        question: "Standard I(A) yêu cầu áp dụng tiêu chuẩn nào khi luật và Code mâu thuẫn?",
        options: [
          "Tiêu chuẩn nghiêm ngặt hơn giữa luật và Code of Ethics",
          "Luôn là luật, vì luật có hiệu lực cưỡng chế còn Code thì không",
          "Luôn là Code, vì thành viên CFA cam kết tuân thủ nó trước tiên",
          "Tiêu chuẩn của nước nơi nhà tuyển dụng đặt trụ sở chính",
        ],
        correct: 0,
        explanation:
          "Quy tắc chạy hai chiều. Chiều 'luật khắt khe hơn Code' thì ai cũng nhớ; chiều 'Code khắt khe hơn luật' mới là chiều hay bị bỏ qua.",
      },
      {
        question: "Chuyển sang làm việc ở thị trường có quy định lỏng hơn thì nghĩa vụ thay đổi thế nào?",
        options: [
          "Không nhẹ đi, vì Code vẫn ràng buộc ở mức của nó",
          "Nhẹ đi tương ứng với mức quy định của thị trường mới đó",
          "Nặng thêm vì phải tuân thủ đồng thời luật của cả hai nước",
          "Tạm ngưng cho tới khi đăng ký lại tư cách thành viên tại nước mới",
        ],
        correct: 0,
        explanation:
          "Code là mức sàn đi theo người, không theo địa lý. Đây là điểm khiến Standard I(A) có ý nghĩa thực tế với người làm việc xuyên biên giới.",
      },
      {
        question: "Khi biết đồng nghiệp đang vi phạm, Standard I(A) buộc bạn làm gì?",
        options: [
          "Tách mình khỏi hành vi đó và nêu vấn đề trong nội bộ",
          "Tố cáo ngay ra cơ quan quản lý bên ngoài công ty",
          "Ghi lại bằng chứng nhưng tiếp tục công việc như bình thường",
          "Chờ tới khi có thiệt hại thực tế xảy ra rồi mới hành động",
        ],
        correct: 0,
        explanation:
          "Standard không bắt buộc tố cáo ra ngoài - ở nhiều nơi việc đó còn bị luật hạn chế. Thứ bắt buộc là ngừng tham gia và đưa vấn đề lên trong nội bộ.",
      },
      {
        question: "Tiếp tục làm việc bình thường sau khi phát hiện vi phạm bị coi là gì?",
        options: [
          "Một hình thức tham gia, dù bạn không phải người khởi xướng",
          "Trung lập, vì bạn không trực tiếp thực hiện hành vi vi phạm",
          "Hợp lệ nếu bạn đã ghi lại việc mình không đồng tình",
          "Chỉ vi phạm khi bạn được hưởng lợi tài chính từ việc đó",
        ],
        correct: 0,
        explanation:
          "Đây là điểm cốt lõi của nghĩa vụ tách mình: sự hiện diện tiếp tục của bạn cho hành vi đó thêm tính chính danh, bất kể bạn nghĩ gì bên trong.",
      },
      {
        question: "Standard I(A) có yêu cầu thành viên phải trở thành chuyên gia pháp lý không?",
        options: [
          "Không, nhưng phải hiểu đủ luật liên quan tới công việc của mình",
          "Có, mọi thành viên phải có chứng chỉ hành nghề luật tương ứng",
          "Không, vì trách nhiệm pháp lý hoàn toàn thuộc bộ phận pháp chế",
          "Có, và phải tự cập nhật toàn bộ thay đổi pháp luật của mọi quốc gia",
        ],
        correct: 0,
        explanation:
          "Yêu cầu là hiểu biết hợp lý về luật áp dụng cho hoạt động nghề nghiệp của mình, và tìm tư vấn khi vượt quá phạm vi đó - không phải trở thành luật sư.",
      },
    ],
    keyTakeaways: [
      "Áp dụng bên nghiêm ngặt nhất trong ba: luật nơi làm việc, luật nơi hoạt động, và Code",
      "Chiều 'Code khắt khe hơn luật' là chiều hay bị bỏ qua vì không ai cưỡng chế",
      "Sang thị trường quản lý lỏng hơn không làm nghĩa vụ nhẹ đi",
      "Nghĩa vụ là tách mình và nêu trong nội bộ, không phải tố cáo ra ngoài",
      "Im lặng làm tiếp là một hình thức tham gia",
    ],
    practicePrompt: {
      question:
        "Công ty bạn ở nước A có quy định cấm mua bán cổ phiếu trong 30 ngày quanh ngày phát hành báo cáo. Bạn được cử sang chi nhánh nước B, nơi không có quy định này. Bạn nên làm gì?",
      options: [
        "Áp dụng quy định lỏng hơn của nước B vì bạn đang làm việc tại đó",
        "Giữ nguyên chuẩn 30 ngày, vì đó là tiêu chuẩn nghiêm ngặt hơn trong các tiêu chuẩn áp dụng cho bạn",
        "Hỏi khách hàng xem họ muốn bạn theo chuẩn nào",
        "Ngừng hoàn toàn việc đầu tư cá nhân trong thời gian ở nước B",
      ],
      correct: 1,
      explanation:
        "Quy định nội bộ của công ty và luật nước A vẫn nằm trong nhóm tiêu chuẩn áp dụng cho bạn, nên việc di chuyển địa lý không gỡ bỏ chúng. Ngừng hoàn toàn việc đầu tư cá nhân thì an toàn nhưng vượt quá mức Standard yêu cầu - Standard đòi tiêu chuẩn nghiêm ngặt nhất trong các tiêu chuẩn ĐANG áp dụng, chứ không đòi mức khắt khe nhất có thể tưởng tượng ra.",
    },
  },
  {
    id: 1574,
    slug: "cfa-ethics-standard-1b-doc-lap-khach-quan",
    title: "CFA Ethics 18: Standard I(B) - Áp lực làm lệch phân tích đến từ đâu",
    subtitle: "Quà tặng, nghiên cứu do tổ chức phát hành trả tiền, và sức ép từ chính bên bán",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    whyItMatters:
      "Standard I(B) không nói về hối lộ - nó nói về những áp lực hợp pháp, thường xuyên và khó từ chối làm lệch phán đoán mà người trong cuộc không tự nhận ra. Đây là dạng vi phạm phổ biến nhất trong thực tế nghề phân tích.",
    openingQuestion:
      "Một công ty niêm yết mời bạn bay hạng thương gia và ở khách sạn năm sao để thăm nhà máy của họ, chi phí do họ chi trả toàn bộ. Bạn nên xử lý thế nào?",
    openingOptions: [
      "Nhận lời vì thăm nhà máy là hoạt động nghiên cứu chính đáng",
      "Từ chối mọi chuyến thăm nhà máy để giữ tính khách quan tuyệt đối",
      "Đi thăm nhà máy, nhưng công ty bạn tự chi trả chi phí đi lại và lưu trú",
      "Nhận lời rồi công bố việc này ở cuối báo cáo phân tích",
    ],
    correctOption: 2,
    explanation:
      "Chuyến thăm nhà máy là nghiên cứu tốt và Standard không cấm nó. Thứ tạo vấn đề là ai trả tiền. Khi bên được phân tích chi trả một khoản có giá trị đáng kể, nó tạo cảm giác mắc nợ - nghiên cứu tâm lý gọi là thiên kiến đáp trả - và nó hoạt động dưới mức nhận thức, kể cả với người tin chắc mình khách quan. Cách xử lý chuẩn trong ngành là đi, nhưng tự trả chi phí, hoặc chỉ nhận mức thù tiếp tối thiểu và thông thường. Công bố ở cuối báo cáo là bước bổ sung, không thay thế được việc loại bỏ chính xung đột đó.",
    diagram: [
      { label: "Quà tặng, chuyến đi, thù lao từ bên được phân tích", arrow: true },
      { label: "Cảm giác mắc nợ hoạt động dưới mức nhận thức", arrow: true },
      { label: "Phán đoán lệch mà người trong cuộc không thấy", arrow: true },
      { label: "Xử lý: loại bỏ xung đột trước, công bố sau" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Nghiên cứu do tổ chức phát hành trả tiền",
      description:
        "Với doanh nghiệp nhỏ ít được theo dõi, có mô hình trong đó chính doanh nghiệp trả tiền để được một đơn vị viết báo cáo phân tích. Standard I(B) không cấm mô hình này, nhưng đặt hai điều kiện: thù lao phải là mức phẳng đã thỏa thuận trước, không gắn với kết luận hay với diễn biến giá cổ phiếu; và mối quan hệ chi trả phải được công bố nổi bật chứ không giấu ở chân trang. Thù lao gắn với khuyến nghị 'Mua' thì không còn là nghiên cứu nữa.",
    },
    quiz: [
      {
        question: "Standard I(B) nhắm vào loại áp lực nào là chính?",
        options: [
          "Áp lực hợp pháp và thường xuyên làm lệch phán đoán chuyên môn",
          "Hành vi hối lộ trực tiếp bằng tiền mặt để đổi lấy khuyến nghị",
          "Sức ép từ cơ quan quản lý khi thanh tra hoạt động phân tích",
          "Cạnh tranh về phí giữa các công ty chứng khoán trong ngành",
        ],
        correct: 0,
        explanation:
          "Hối lộ đã bị luật hình sự xử lý. Standard I(B) xử lý vùng xám hợp pháp nhưng vẫn làm lệch - và đó là vùng rộng hơn nhiều.",
      },
      {
        question: "Vì sao quà tặng giá trị lớn bị coi là vấn đề dù người nhận tin mình khách quan?",
        options: [
          "Vì thiên kiến đáp trả hoạt động dưới mức nhận thức",
          "Vì quà tặng luôn kèm theo yêu cầu ngầm phải viết báo cáo tốt",
          "Vì giá trị món quà phải được kê khai vào thu nhập chịu thuế",
          "Vì các đồng nghiệp khác sẽ mất động lực làm việc khách quan",
        ],
        correct: 0,
        explanation:
          "Standard không chờ có bằng chứng phán đoán đã lệch mới coi là vi phạm - chính sự tồn tại của xung đột tiềm ẩn đã đủ để cần tránh.",
      },
      {
        question: "Cách xử lý chuẩn với lời mời thăm nhà máy do doanh nghiệp chi trả là gì?",
        options: [
          "Vẫn đi nhưng công ty của bạn tự chi trả chi phí đi lại",
          "Từ chối mọi chuyến thăm nhà máy để tránh mọi rủi ro xung đột",
          "Nhận lời và ghi chú việc được tài trợ ở cuối báo cáo phân tích",
          "Nhận lời nếu giá trị chuyến đi dưới mức trần công ty quy định",
        ],
        correct: 0,
        explanation:
          "Từ chối hoàn toàn thì mất một nguồn thông tin tốt. Trả tiền cho chính mình giữ được nguồn thông tin mà không tạo nghĩa vụ nào.",
      },
      {
        question: "Nghiên cứu do tổ chức phát hành trả tiền được chấp nhận với điều kiện nào?",
        options: [
          "Thù lao phẳng, không gắn kết luận, và quan hệ chi trả được công bố rõ",
          "Báo cáo phải đưa ra khuyến nghị trung lập trong mọi trường hợp",
          "Doanh nghiệp trả tiền không được đọc báo cáo trước khi phát hành",
          "Mô hình này bị cấm hoàn toàn theo Standard I(B) hiện hành",
        ],
        correct: 0,
        explanation:
          "Điểm quyết định là thù lao có gắn với kết luận hay không. Trả tiền để có một báo cáo là hợp lệ; trả tiền để có một kết luận thì không.",
      },
      {
        question: "Công bố xung đột lợi ích có thay thế được việc loại bỏ nó không?",
        options: [
          "Không, công bố là bước bổ sung sau khi đã loại bỏ những gì loại bỏ được",
          "Có, vì khi đã công bố thì người đọc tự chịu trách nhiệm đánh giá",
          "Có, miễn là phần công bố được đặt ở đầu báo cáo thay vì cuối",
          "Không, vì Standard I(B) cấm hoàn toàn mọi hình thức công bố",
        ],
        correct: 0,
        explanation:
          "Thứ tự đúng là tránh trước, công bố phần không tránh được. Công bố một xung đột lẽ ra có thể tránh không làm phán đoán bớt lệch đi chút nào.",
      },
    ],
    keyTakeaways: [
      "Standard I(B) nhắm vào áp lực hợp pháp làm lệch phán đoán, không phải hối lộ",
      "Thiên kiến đáp trả hoạt động dưới mức nhận thức - tin mình khách quan không phải bằng chứng",
      "Chuyến thăm nhà máy: đi được, nhưng tự trả chi phí",
      "Nghiên cứu do bên phát hành trả tiền: thù lao phẳng, không gắn kết luận, công bố rõ",
      "Thứ tự đúng là tránh trước, công bố phần còn lại - không phải công bố thay cho tránh",
    ],
    practicePrompt: {
      question:
        "Sếp bộ phận bảo lãnh phát hành nhắc bạn rằng khuyến nghị 'Bán' của bạn có thể làm mất một hợp đồng lớn cho công ty. Đây là tình huống gì?",
      options: [
        "Trao đổi nội bộ bình thường giữa hai bộ phận",
        "Áp lực từ bên trong công ty lên tính độc lập - đúng thứ Standard I(B) và bức tường thông tin tồn tại để chặn",
        "Vi phạm Standard III vì liên quan tới nghĩa vụ với khách hàng",
        "Chỉ là vấn đề nếu bạn thực sự đổi khuyến nghị sau đó",
      ],
      correct: 1,
      explanation:
        "Áp lực nội bộ từ bộ phận bảo lãnh phát hành lên bộ phận phân tích là xung đột kinh điển mà cả Standard I(B) lẫn cơ chế bức tường thông tin được dựng lên để xử lý. Phương án cuối sai ở chỗ quan trọng: vi phạm nằm ở việc tạo ra và truyền đi áp lực đó, không phải ở việc bạn có chịu thua hay không - nếu chỉ tính lúc đã đổi khuyến nghị thì mọi sức ép không thành công đều vô can.",
    },
  },
  {
    id: 1575,
    slug: "cfa-ethics-standard-1c-trinh-bay-sai-lech",
    title: "CFA Ethics 19: Standard I(C) - Đạo văn, trích dẫn và nội dung do AI tạo ra",
    subtitle: "Trình bày sai lệch không cần có ý định lừa dối mới thành vi phạm",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    whyItMatters:
      "Đây là Standard mà công cụ AI vừa làm cho khó hơn hẳn: sao chép giờ không còn để lại dấu vết dễ thấy, và ranh giới giữa 'tham khảo' với 'lấy làm của mình' mờ đi. Quy tắc thì không đổi, nhưng số lần bạn phải áp dụng nó mỗi ngày thì tăng vọt.",
    openingQuestion:
      "Bạn dùng một mô hình ngôn ngữ để soạn phần tổng quan ngành cho báo cáo của mình, rồi biên tập lại đôi chỗ. Theo Standard I(C), điều này có vấn đề không?",
    openingOptions: [
      "Không, vì bạn đã biên tập lại nên đó là sản phẩm của bạn",
      "Có vấn đề nếu bạn để người đọc hiểu đó là phân tích của chính bạn, và nếu bạn không kiểm chứng được từng khẳng định trong đó",
      "Không, vì công cụ AI không phải là một tác giả có bản quyền",
      "Có, vì Standard I(C) cấm hoàn toàn việc dùng công cụ AI trong phân tích",
    ],
    correctOption: 1,
    explanation:
      "Standard I(C) có hai vế và cả hai đều bị chạm ở đây. Vế thứ nhất là quy kết sai nguồn: trình bày công sức của người khác - hay của một công cụ - như của mình là trình bày sai lệch, dù không ai bị thiệt hại tài chính. Vế thứ hai nặng hơn với nghề phân tích: nội dung do mô hình ngôn ngữ sinh ra có thể chứa số liệu bịa đặt trông rất thuyết phục, nên đưa vào báo cáo mà chưa kiểm chứng là đưa vào những khẳng định bạn không có cơ sở. CFA Institute không cấm dùng công cụ; nó yêu cầu bạn chịu trách nhiệm cho từng chữ mang tên bạn.",
    diagram: [
      { label: "Quy kết sai nguồn: lấy công sức người khác làm của mình", arrow: true },
      { label: "Khẳng định chưa kiểm chứng: số liệu không có cơ sở", arrow: true },
      { label: "Không cần ý định lừa dối vẫn thành vi phạm", arrow: true },
      { label: "Chịu trách nhiệm cho từng chữ mang tên bạn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ngoại lệ cho dữ liệu thực tế đã công bố",
      description:
        "Standard I(C) không buộc trích dẫn nguồn cho những dữ kiện thực tế đã được công bố rộng rãi - tỷ giá, lãi suất điều hành, số liệu thống kê chính thức. Ranh giới nằm ở chỗ: dữ kiện thì không, nhưng phân tích, dự báo, cách phân loại và cách diễn giải của người khác thì phải ghi nguồn. Chép một bảng số liệu GDP thì không cần; chép cách một nhà kinh tế chia giai đoạn chu kỳ và giải thích nguyên nhân thì phải.",
    },
    quiz: [
      {
        question: "Vi phạm Standard I(C) có đòi hỏi ý định lừa dối không?",
        options: [
          "Không, sơ suất trong việc ghi nguồn vẫn đủ cấu thành vi phạm",
          "Có, phải chứng minh được người đó cố ý gây hiểu nhầm cho người đọc",
          "Có, và phải kèm thiệt hại tài chính thực tế cho khách hàng",
          "Không, nhưng chỉ áp dụng với tài liệu phát hành ra bên ngoài",
        ],
        correct: 0,
        explanation:
          "Đây là điểm nghiêm khắc của Standard này: chuẩn đánh giá là kết quả gây hiểu nhầm, không phải trạng thái tâm lý của người viết.",
      },
      {
        question: "Trường hợp nào KHÔNG bắt buộc phải ghi nguồn?",
        options: [
          "Dữ kiện thực tế đã được công bố rộng rãi như lãi suất điều hành",
          "Cách phân loại giai đoạn chu kỳ kinh tế của một nhà kinh tế cụ thể",
          "Dự báo tăng trưởng do một tổ chức nghiên cứu công bố gần đây",
          "Mô hình định giá do một đồng nghiệp trong công ty xây dựng",
        ],
        correct: 0,
        explanation:
          "Ranh giới là dữ kiện với diễn giải. Con số thì thuộc về mọi người; cách sắp xếp và giải thích con số thì thuộc về người nghĩ ra nó.",
      },
      {
        question: "Rủi ro riêng khi đưa nội dung do mô hình ngôn ngữ sinh ra vào báo cáo là gì?",
        options: [
          "Nội dung có thể chứa số liệu bịa nhưng trông rất thuyết phục",
          "Công cụ AI giữ bản quyền với mọi nội dung mà nó sinh ra",
          "Cơ quan quản lý cấm sử dụng công cụ AI trong phân tích đầu tư",
          "Nội dung do AI viết luôn dài hơn mức cần thiết cho một báo cáo",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ Standard I(C) gặp Standard V(A): một khẳng định bạn không kiểm chứng được là một khẳng định không có cơ sở hợp lý.",
      },
      {
        question: "Ghi trong CV rằng mình 'đang học Level II' khi chưa qua Level I là gì?",
        options: [
          "Vi phạm Standard I(C) về trình bày sai trình độ chuyên môn",
          "Cách diễn đạt chấp nhận được vì bạn thực sự đang ôn nội dung đó",
          "Chỉ vi phạm nếu nhà tuyển dụng ra quyết định dựa vào thông tin đó",
          "Vi phạm Standard IV vì liên quan tới quan hệ với nhà tuyển dụng",
        ],
        correct: 0,
        explanation:
          "Trình độ chuyên môn nằm trong phạm vi Standard I(C) cùng với kinh nghiệm và kết quả đầu tư. CFA Institute xử lý nhóm vi phạm này rất nghiêm.",
      },
      {
        question: "Dùng lại báo cáo của đồng nghiệp trong cùng công ty thì xử lý thế nào?",
        options: [
          "Vẫn phải ghi rõ phần nào là công sức của người khác",
          "Không cần, vì tài liệu nội bộ thuộc sở hữu chung của công ty",
          "Không cần nếu đồng nghiệp đó đã đồng ý bằng lời nói trước đó",
          "Chỉ cần ghi nguồn khi báo cáo được gửi ra ngoài công ty",
        ],
        correct: 0,
        explanation:
          "Quyền sở hữu của công ty với tài liệu và nghĩa vụ quy kết đúng công sức là hai chuyện khác nhau. Công ty sở hữu tài liệu không làm bạn thành tác giả của nó.",
      },
    ],
    keyTakeaways: [
      "Không cần ý định lừa dối - sơ suất ghi nguồn vẫn là vi phạm",
      "Dữ kiện đã công bố rộng rãi thì không cần nguồn; diễn giải và dự báo thì cần",
      "Nội dung do AI sinh ra: chịu trách nhiệm cho từng chữ mang tên bạn",
      "Số liệu chưa kiểm chứng được là khẳng định không có cơ sở - chạm cả Standard V(A)",
      "Công ty sở hữu tài liệu không làm bạn thành tác giả của nó",
    ],
    practicePrompt: {
      question:
        "Bạn trích một đoạn phân tích của tổ chức khác vào báo cáo, có ghi nguồn đầy đủ, nhưng bỏ đi phần cảnh báo rủi ro đi kèm trong nguyên bản. Đánh giá thế nào?",
      options: [
        "Hợp lệ vì đã ghi nguồn đầy đủ theo yêu cầu",
        "Vẫn là trình bày sai lệch: trích có chọn lọc làm đổi ý nghĩa của nguyên bản dù từng chữ đều đúng",
        "Chỉ có vấn đề nếu tổ chức kia phản đối việc trích dẫn",
        "Hợp lệ nếu bạn tự thêm phần cảnh báo rủi ro của riêng mình",
      ],
      correct: 1,
      explanation:
        "Ghi nguồn xử lý được vế quy kết, không xử lý được vế gây hiểu nhầm. Một đoạn trích chính xác từng chữ vẫn có thể tạo ấn tượng ngược hẳn với nguyên bản nếu phần điều kiện bị cắt đi - và người đọc thì tin rằng họ đang đọc quan điểm đầy đủ của bên được trích.",
    },
  },
  {
    id: 1576,
    slug: "cfa-ethics-mosaic-theory",
    title: "CFA Ethics 20: Mosaic theory - ranh giới giữa phân tích giỏi và giao dịch nội gián",
    subtitle: "Vì sao ghép nhiều mảnh thông tin không trọng yếu lại là hợp pháp, còn một mảnh trọng yếu thì không",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🧩",
    whyItMatters:
      "Đây là khái niệm bảo vệ chính nghề phân tích: nếu ghép thông tin công khai mà ra kết luận vượt trội cũng bị cấm, thì không còn lý do gì để nghiên cứu. Nhưng ranh giới rất hẹp, và đề thi khai thác đúng chỗ hẹp đó.",
    openingQuestion:
      "Bạn phỏng vấn mười nhà cung cấp của một hãng bán lẻ, mỗi người chỉ nói về đơn hàng của riêng họ. Ghép lại, bạn kết luận doanh thu quý này sẽ giảm mạnh và bán cổ phiếu trước khi công ty công bố. Đây có phải giao dịch nội gián?",
    openingOptions: [
      "Có, vì bạn biết trước kết quả mà thị trường chưa biết",
      "Không, nếu từng mảnh thông tin riêng lẻ không trọng yếu và không phải thông tin nội bộ - kết luận là sản phẩm phân tích của bạn",
      "Có, vì bạn đã tiếp xúc trực tiếp với các bên liên quan tới công ty",
      "Không, vì thông tin từ nhà cung cấp không bao giờ được coi là trọng yếu",
    ],
    correctOption: 1,
    explanation:
      "Mosaic theory nói rằng kết luận trọng yếu được tạo ra bằng cách ghép các mảnh không trọng yếu và không phải thông tin nội bộ là tài sản hợp pháp của người phân tích. Logic đằng sau rất thẳng: nếu cấm điều này thì phần thưởng cho việc nghiên cứu biến mất, và thị trường mất đi chính cơ chế đưa thông tin vào giá. Ranh giới nằm ở ba câu hỏi. Từng mảnh có trọng yếu không - nếu một nhà cung cấp nói cho bạn biết tổng doanh thu chưa công bố thì mảnh đó đã trọng yếu rồi. Nguồn có nghĩa vụ giữ bí mật không - nếu người nói đang vi phạm nghĩa vụ của họ, bạn không sạch chỉ vì bạn là người nghe. Và bạn có biết điều đó không.",
    diagram: [
      { label: "Từng mảnh: không trọng yếu và không phải thông tin nội bộ", arrow: true },
      { label: "Nguồn không vi phạm nghĩa vụ bảo mật nào", arrow: true },
      { label: "Ghép lại bằng phân tích của chính bạn", arrow: true },
      { label: "Kết luận trọng yếu - hợp pháp, là tài sản của bạn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao lưu hồ sơ là phần quan trọng nhất của mosaic",
      description:
        "Khi cơ quan quản lý xem lại một giao dịch có lãi lớn ngay trước một tin xấu, câu hỏi họ đặt ra là bạn biết điều đó bằng cách nào. Không có hồ sơ, lời giải thích 'tôi tự phân tích ra' không phân biệt được với lời chối. Có hồ sơ - biên bản phỏng vấn, ngày tháng, nguồn công khai đã đọc, bản nháp lập luận - thì chính chuỗi tài liệu đó là bằng chứng cho mosaic. Đây là lý do Standard V(C) về lưu trữ hồ sơ gắn chặt với Standard II(A) trong thực tế hơn là trên giấy.",
    },
    quiz: [
      {
        question: "Mosaic theory bảo vệ điều gì?",
        options: [
          "Quyền dùng kết luận rút ra từ việc ghép các mảnh không trọng yếu",
          "Quyền tiếp cận thông tin nội bộ nếu dùng cho mục đích nghiên cứu",
          "Quyền công bố thông tin trọng yếu trước khi doanh nghiệp công bố",
          "Quyền giữ bí mật phương pháp phân tích với cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Nếu không có nguyên tắc này thì mọi kết luận vượt trội đều đáng ngờ, và nghiên cứu đầu tư mất hết động cơ kinh tế.",
      },
      {
        question: "Điều gì phá vỡ tính hợp pháp của một mosaic?",
        options: [
          "Một mảnh trong đó là thông tin trọng yếu chưa công bố",
          "Việc kết luận cuối cùng là thông tin trọng yếu với thị trường",
          "Việc bạn đã tiếp xúc trực tiếp với nhân sự của doanh nghiệp",
          "Việc bạn giao dịch trước khi công bố báo cáo phân tích của mình",
        ],
        correct: 0,
        explanation:
          "Kết luận trọng yếu là mục tiêu chứ không phải vấn đề. Vấn đề nằm ở đầu vào: một mảnh trọng yếu chưa công bố làm hỏng toàn bộ chuỗi.",
      },
      {
        question: "Nếu nguồn tin của bạn đang vi phạm nghĩa vụ bảo mật của họ thì sao?",
        options: [
          "Bạn không sạch chỉ vì mình là người nghe chứ không phải người nói",
          "Bạn vô can vì nghĩa vụ bảo mật là chuyện giữa họ và công ty họ",
          "Bạn chỉ vi phạm nếu đã trả tiền để có được thông tin đó",
          "Bạn vô can nếu công bố lại thông tin đó ra công chúng ngay",
        ],
        correct: 0,
        explanation:
          "Yếu tố quyết định là bạn biết hoặc buộc phải biết rằng nguồn đang vi phạm. Nhận thức đó kéo bạn vào chuỗi trách nhiệm.",
      },
      {
        question: "Vì sao lưu hồ sơ nghiên cứu lại quan trọng với mosaic?",
        options: [
          "Vì nó là bằng chứng phân biệt phân tích thật với lời chối",
          "Vì cơ quan quản lý bắt buộc nộp hồ sơ trước mỗi giao dịch lớn",
          "Vì hồ sơ giúp đồng nghiệp tái sử dụng lại kết quả nghiên cứu",
          "Vì thời hạn lưu trữ hồ sơ được quy định trong Standard II(A)",
        ],
        correct: 0,
        explanation:
          "Không có hồ sơ thì lời giải thích 'tôi tự phân tích ra' nghe giống hệt lời chối. Chuỗi tài liệu chính là mosaic được chứng minh.",
      },
      {
        question: "Nhà đầu tư nhận được thông tin trọng yếu chưa công bố một cách vô tình nên làm gì?",
        options: [
          "Không giao dịch, và báo cho bộ phận tuân thủ của công ty",
          "Giao dịch bình thường vì không chủ động tìm kiếm thông tin đó",
          "Chia sẻ lại cho các khách hàng lớn để đảm bảo công bằng",
          "Chờ đủ 24 giờ rồi giao dịch vì thông tin đã cũ đi",
        ],
        correct: 0,
        explanation:
          "Cách có được thông tin không quan trọng - nghĩa vụ phát sinh từ việc bạn đang nắm nó. Chia sẻ tiếp lại là một vi phạm riêng.",
      },
    ],
    keyTakeaways: [
      "Ghép mảnh không trọng yếu ra kết luận trọng yếu là hợp pháp và là tài sản của bạn",
      "Một mảnh trọng yếu chưa công bố làm hỏng cả chuỗi",
      "Nguồn vi phạm nghĩa vụ bảo mật thì người nghe cũng bị kéo vào",
      "Kết luận trọng yếu là mục tiêu, không phải vấn đề - đầu vào mới là chỗ xét",
      "Lưu hồ sơ là thứ phân biệt mosaic với lời chối khi bị hỏi lại",
    ],
    practicePrompt: {
      question:
        "Một nhân viên hãng bay nói với bạn rằng sân bay đang vắng bất thường tháng này. Bạn ghép với dữ liệu giá vé công khai và bán cổ phiếu ngành hàng không. Đánh giá?",
      options: [
        "Vi phạm vì bạn có thông tin từ người trong ngành",
        "Hợp lệ theo mosaic: quan sát về lưu lượng không phải thông tin nội bộ trọng yếu của một doanh nghiệp cụ thể, và nguồn không vi phạm nghĩa vụ nào",
        "Vi phạm vì bạn giao dịch trước khi công bố phân tích",
        "Hợp lệ chỉ khi bạn công bố nguồn tin trong báo cáo",
      ],
      correct: 1,
      explanation:
        "Kiểm ba câu hỏi: mảnh này có phải thông tin trọng yếu chưa công bố của một doanh nghiệp cụ thể không - không, đó là quan sát chung về ngành; nguồn có vi phạm nghĩa vụ bảo mật không - không, lưu lượng sân bay không phải bí mật kinh doanh của hãng nào; bạn có biết về vi phạm nào không - không có vi phạm nào để biết. Phương án đầu là hiểu nhầm phổ biến nhất: nói chuyện với người trong ngành chính là công việc của nhà phân tích.",
    },
  },
  {
    id: 1577,
    slug: "cfa-ethics-standard-2b-thao-tung-thi-truong",
    title: "CFA Ethics 21: Standard II(B) - Hai kiểu thao túng, và vì sao ý định là yếu tố quyết định",
    subtitle: "Thao túng bằng giao dịch và thao túng bằng thông tin - cùng một hành vi có thể hợp lệ hoặc không",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🎭",
    whyItMatters:
      "Đây là Standard mà hành vi bên ngoài không quyết định được vi phạm hay không. Đặt lệnh rồi hủy là chuyện diễn ra hàng triệu lần mỗi ngày và hoàn toàn bình thường - thứ biến nó thành vi phạm là mục đích đằng sau, nên phải học cách đọc mục đích từ mô hình hành vi.",
    openingQuestion:
      "Một nhà giao dịch đặt lệnh mua lớn rồi hủy trước khi khớp, lặp lại nhiều lần trong phiên. Điều gì quyết định đây là thao túng hay giao dịch bình thường?",
    openingOptions: [
      "Số lượng lệnh bị hủy - vượt một ngưỡng nhất định thì thành vi phạm",
      "Mục đích: đặt lệnh để tạo ảo giác về cung cầu nhằm dẫn dụ người khác, hay để thăm dò thanh khoản và điều chỉnh chiến lược thật",
      "Giá trị của các lệnh đó so với vốn điều lệ của công ty chứng khoán",
      "Việc nhà giao dịch có thực sự kiếm được lợi nhuận từ hành vi đó không",
    ],
    correctOption: 1,
    explanation:
      "Standard II(B) là một trong số ít Standards mà ý định nằm ngay trong định nghĩa vi phạm. Hủy lệnh là hoạt động hợp pháp và cần thiết: chiến lược thay đổi, giá dịch chuyển, thanh khoản không như dự kiến. Thứ tạo ra vi phạm là đặt lệnh mà bạn không có ý định khớp, nhằm làm người khác tin rằng có lực cầu hoặc lực cung không tồn tại. Vì ý định không quan sát trực tiếp được, cơ quan quản lý đọc nó qua mô hình hành vi: tỷ lệ hủy cực cao, lệnh đặt xa giá khớp rồi rút đúng khi giá tiến tới, và vị thế thật đi ngược hướng lệnh đang hiển thị. Lợi nhuận thực tế không phải điều kiện - thao túng thất bại vẫn là thao túng.",
    diagram: [
      { label: "Thao túng bằng giao dịch: lệnh giả, giao dịch vòng tròn", arrow: true },
      { label: "Thao túng bằng thông tin: tung tin sai để dẫn dụ giá", arrow: true },
      { label: "Ý định nằm trong định nghĩa vi phạm", arrow: true },
      { label: "Đọc ý định qua mô hình hành vi, không qua lời khai" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ranh giới với hoạt động tạo lập thị trường",
      description:
        "Nhà tạo lập thị trường đặt và hủy lệnh liên tục theo đúng nghề của họ, và tỷ lệ hủy của họ rất cao. Điều đó không phải thao túng vì mục đích là duy trì báo giá hai chiều và quản trị rủi ro tồn kho, chứ không phải tạo ảo giác. Đây là lý do một chỉ số đơn lẻ như tỷ lệ hủy không bao giờ đủ để kết luận - phải xét cùng với việc bên đó có nghĩa vụ tạo lập không, và các lệnh đó có phục vụ nghĩa vụ ấy không.",
    },
    quiz: [
      {
        question: "Yếu tố nào nằm ngay trong định nghĩa vi phạm của Standard II(B)?",
        options: [
          "Ý định làm sai lệch giá hoặc khối lượng để đánh lừa thị trường",
          "Mức lợi nhuận nhà giao dịch thu được từ chuỗi hành vi đó",
          "Số lượng lệnh bị hủy trong một phiên giao dịch nhất định",
          "Việc cơ quan quản lý đã phát hiện và lập biên bản hay chưa",
        ],
        correct: 0,
        explanation:
          "Chính vì ý định nằm trong định nghĩa mà cùng một chuỗi lệnh có thể hợp lệ với bên này và là vi phạm với bên kia.",
      },
      {
        question: "Thao túng thất bại, không thu được lợi nhuận nào, thì sao?",
        options: [
          "Vẫn là vi phạm, vì lợi nhuận không phải điều kiện cấu thành",
          "Không vi phạm, vì thị trường đã không bị ảnh hưởng trên thực tế",
          "Chỉ vi phạm nếu có nhà đầu tư khác chứng minh được thiệt hại",
          "Được xem là hành vi thử nghiệm chiến lược và không bị xử lý",
        ],
        correct: 0,
        explanation:
          "Chuẩn đánh giá là hành vi cộng ý định, không phải kết quả. Nếu tính theo kết quả thì mọi lần thao túng vụng về đều vô can.",
      },
      {
        question: "Vì sao tỷ lệ hủy lệnh cao không tự nó chứng minh thao túng?",
        options: [
          "Vì nhà tạo lập thị trường hủy lệnh liên tục theo đúng nghề của họ",
          "Vì hệ thống giao dịch tự động hủy lệnh khi hết phiên giao dịch",
          "Vì quy định hiện hành không giới hạn số lệnh được phép hủy",
          "Vì lệnh bị hủy không được ghi lại trong sổ lệnh của sàn",
        ],
        correct: 0,
        explanation:
          "Đây là lý do phải xét mô hình hành vi trong bối cảnh vai trò của bên giao dịch, chứ không đọc một chỉ số đơn lẻ.",
      },
      {
        question: "Thao túng bằng thông tin khác thao túng bằng giao dịch ở chỗ nào?",
        options: [
          "Nó tác động lên giá qua việc lan truyền nhận định sai lệch",
          "Nó chỉ áp dụng với thị trường trái phiếu chứ không phải cổ phiếu",
          "Nó luôn được thực hiện bởi tổ chức chứ không phải cá nhân",
          "Nó chỉ bị xử lý khi thông tin sai được đăng trên báo chí chính thống",
        ],
        correct: 0,
        explanation:
          "Hai kiểu cùng một mục đích và cùng bị cấm: một bên bóp méo tín hiệu qua sổ lệnh, bên kia qua nội dung được lan truyền.",
      },
      {
        question: "Đăng nhận định lạc quan về cổ phiếu mình đang nắm giữ có vi phạm không?",
        options: [
          "Không, nếu nhận định có cơ sở thật và vị thế được công bố rõ",
          "Có, mọi phát ngôn công khai về cổ phiếu mình nắm đều bị cấm",
          "Không, vì mỗi người có quyền tự do bày tỏ quan điểm đầu tư",
          "Có, trừ khi bạn bán hết vị thế trước khi đăng bài viết đó",
        ],
        correct: 0,
        explanation:
          "Vấn đề không nằm ở việc nói tốt về thứ mình sở hữu - đó là chuyện thường. Nó nằm ở nhận định không có cơ sở và ở việc giấu vị thế.",
      },
    ],
    keyTakeaways: [
      "Hai kiểu: thao túng bằng giao dịch và thao túng bằng thông tin",
      "Ý định nằm trong định nghĩa vi phạm, nên cùng hành vi có thể hợp lệ hoặc không",
      "Lợi nhuận không phải điều kiện - thao túng thất bại vẫn là thao túng",
      "Đọc ý định qua mô hình hành vi: tỷ lệ hủy, thời điểm rút lệnh, vị thế thật",
      "Tỷ lệ hủy cao không tự chứng minh gì - nhà tạo lập thị trường cũng vậy",
    ],
    practicePrompt: {
      question:
        "Cuối quý, một nhà quản lý quỹ mua thêm mạnh vào chính các mã đang chiếm tỷ trọng lớn trong danh mục, trong phiên cuối cùng. Đánh giá?",
      options: [
        "Hợp lệ vì mua vào tài sản mình đã tin tưởng là chiến lược nhất quán",
        "Đáng ngờ là thao túng để đẩy giá trị danh mục cuối kỳ - hành vi có tên riêng trong ngành và bị Standard II(B) cấm",
        "Chỉ vi phạm nếu quỹ đó tính phí hiệu suất trên NAV cuối kỳ",
        "Hợp lệ vì giao dịch diễn ra công khai trên sàn tập trung",
      ],
      correct: 1,
      explanation:
        "Hành vi này được gọi là làm đẹp bảng điểm cuối kỳ, và nó vi phạm vì mục đích là đẩy giá tham chiếu chứ không phải xây dựng vị thế. Phương án ba gần đúng nhưng nhầm chỗ: phí hiệu suất giải thích động cơ, không phải điều kiện cấu thành - báo cáo hiệu suất đẹp lên đã đủ là lợi ích, kể cả khi không có đồng phí nào gắn vào.",
    },
  },
  {
    id: 1578,
    slug: "cfa-ethics-standard-3b-doi-xu-cong-bang",
    title: "CFA Ethics 22: Standard III(B) - Công bằng không có nghĩa là như nhau",
    subtitle: "Phân bổ lệnh, phát hành báo cáo, và quyền được phục vụ khác nhau theo dịch vụ đã mua",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    whyItMatters:
      "Standard này hay bị đọc thành 'mọi khách hàng phải được đối xử giống hệt nhau', dẫn tới kết luận sai ở cả hai hướng. Hiểu đúng ranh giới giữa công bằng và đồng nhất là thứ quyết định cách bạn thiết kế quy trình phân bổ và phát hành báo cáo.",
    openingQuestion:
      "Công ty bạn có gói dịch vụ cao cấp trả phí cao hơn. Khách gói đó có được nhận báo cáo phân tích sớm hơn khách gói thường không?",
    openingOptions: [
      "Không, mọi khách hàng phải nhận thông tin cùng một thời điểm",
      "Được, nếu chênh lệch dịch vụ được công bố trước và mọi khách trong cùng một gói được đối xử như nhau",
      "Được, vì khách trả phí cao hơn thì đương nhiên nhận được nhiều hơn",
      "Không, trừ khi khách gói thường đồng ý bằng văn bản với việc đó",
    ],
    correctOption: 1,
    explanation:
      "Chữ trong Standard là công bằng, không phải đồng nhất - và khác biệt đó có chủ ý. Ngành đầu tư có nhiều mức dịch vụ khác nhau, và bán một gói cao cấp không tự nó là vi phạm. Hai điều kiện biến nó thành hợp lệ: chênh lệch phải được công bố trước để khách gói thường biết mình đang mua gì và không mua gì; và trong cùng một nhóm dịch vụ thì không ai được ưu tiên hơn ai. Cái bị cấm là ưu tiên ngầm - cho một khách quen biết lệnh trước trong khi cả hai trả cùng mức phí, hoặc gọi điện cho vài khách lớn trước khi báo cáo phát hành cho tất cả.",
    diagram: [
      { label: "Công bằng ≠ đồng nhất: nhiều mức dịch vụ là hợp lệ", arrow: true },
      { label: "Điều kiện 1: chênh lệch được công bố trước", arrow: true },
      { label: "Điều kiện 2: trong cùng một nhóm thì không ai ưu tiên hơn ai", arrow: true },
      { label: "Cái bị cấm là ưu tiên ngầm, không phải phân tầng dịch vụ" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Phân bổ lệnh khi không đủ hàng",
      description:
        "Một đợt IPO hấp dẫn hoặc một lệnh lớn chỉ khớp được một phần đặt ra bài toán chia phần. Cách xử lý được chấp nhận trong ngành là phân bổ theo tỷ lệ đặt lệnh, quyết định bằng quy trình viết sẵn từ trước chứ không phán đoán tại chỗ, và cùng một mức giá bình quân cho mọi tài khoản trong nhóm. Điểm mấu chốt là quy trình phải tồn tại TRƯỚC khi có lệnh - một quy tắc nghĩ ra sau khi đã biết ai được lợi thì không còn là quy tắc.",
    },
    quiz: [
      {
        question: "Standard III(B) dùng chữ 'công bằng' thay vì 'đồng nhất' vì sao?",
        options: [
          "Vì nhiều mức dịch vụ khác nhau là hợp lệ nếu được công bố trước",
          "Vì không thể phục vụ mọi khách hàng cùng lúc về mặt kỹ thuật",
          "Vì khách hàng tổ chức luôn được ưu tiên hơn khách hàng cá nhân",
          "Vì chữ đồng nhất chỉ áp dụng cho việc phân bổ lệnh giao dịch",
        ],
        correct: 0,
        explanation:
          "Cấm phân tầng dịch vụ sẽ cấm luôn cả mô hình kinh doanh hợp pháp. Standard cấm ưu tiên ngầm, không cấm bán nhiều gói khác nhau.",
      },
      {
        question: "Gọi điện báo trước cho vài khách lớn rồi mới phát hành báo cáo cho tất cả là gì?",
        options: [
          "Vi phạm, vì đó là ưu tiên ngầm trong cùng một nhóm dịch vụ",
          "Hợp lệ, vì khách lớn đóng góp phần lớn doanh thu của công ty",
          "Hợp lệ nếu nội dung cuộc gọi trùng với nội dung báo cáo",
          "Chỉ vi phạm nếu khách đó thực sự giao dịch trước khi báo cáo ra",
        ],
        correct: 0,
        explanation:
          "Đây là dạng vi phạm phổ biến nhất của Standard này, và nó thường không có ý xấu - chỉ là thói quen chăm sóc khách quan trọng.",
      },
      {
        question: "Khi một lệnh lớn chỉ khớp được một phần, cách phân bổ nào phù hợp?",
        options: [
          "Theo tỷ lệ đặt lệnh, cùng giá bình quân, theo quy trình có sẵn",
          "Ưu tiên tài khoản có quy mô lớn nhất để tối ưu chi phí giao dịch",
          "Phân bổ cho tài khoản nào đặt lệnh sớm nhất trong ngày hôm đó",
          "Giữ lại toàn bộ và chỉ phân bổ khi lệnh đã khớp hoàn toàn",
        ],
        correct: 0,
        explanation:
          "Ba yếu tố phải cùng có: tỷ lệ, giá bình quân chung, và quy trình viết trước. Thiếu yếu tố cuối thì hai yếu tố đầu vẫn có thể bị bẻ cong.",
      },
      {
        question: "Vì sao quy trình phân bổ phải tồn tại trước khi có lệnh?",
        options: [
          "Vì quy tắc nghĩ ra sau khi biết ai được lợi thì không còn là quy tắc",
          "Vì quy định buộc nộp quy trình cho cơ quan quản lý mỗi quý",
          "Vì hệ thống giao dịch cần được cấu hình trước khi vào phiên",
          "Vì khách hàng có quyền yêu cầu xem quy trình trước khi đặt lệnh",
        ],
        correct: 0,
        explanation:
          "Đây là nguyên tắc chung của mọi cơ chế chống thiên vị: quyết định luật chơi phải diễn ra trước khi biết luật đó có lợi cho ai.",
      },
      {
        question: "Thay đổi khuyến nghị từ 'Mua' sang 'Bán' thì thông báo thế nào?",
        options: [
          "Thông báo đồng thời cho mọi khách đang nắm giữ khuyến nghị cũ",
          "Chỉ cần cập nhật trong báo cáo định kỳ tiếp theo của công ty",
          "Ưu tiên báo cho khách có vị thế lớn nhất để họ kịp xử lý",
          "Đăng công khai trước rồi mới gửi bản chi tiết cho khách hàng",
        ],
        correct: 0,
        explanation:
          "Đảo chiều khuyến nghị là loại thông tin nhạy cảm nhất với thời điểm, nên đây là chỗ nghĩa vụ đối xử công bằng bị thử thách mạnh nhất.",
      },
    ],
    keyTakeaways: [
      "Công bằng không phải đồng nhất - phân tầng dịch vụ là hợp lệ",
      "Hai điều kiện: công bố chênh lệch trước, và không ưu tiên ngầm trong cùng nhóm",
      "Phân bổ lệnh: theo tỷ lệ, cùng giá bình quân, theo quy trình viết sẵn",
      "Quy trình phải có TRƯỚC khi có lệnh, nếu không nó không phải quy trình",
      "Đảo chiều khuyến nghị là lúc nghĩa vụ này bị thử thách mạnh nhất",
    ],
    practicePrompt: {
      question:
        "Bạn phát hiện một đồng nghiệp thường xuyên gọi cho ba khách quen ngay sau khi báo cáo được duyệt, trước giờ phát hành chính thức. Đây là gì?",
      options: [
        "Chăm sóc khách hàng bình thường, không liên quan tới Standard nào",
        "Vi phạm Standard III(B): ba khách đó được ưu tiên ngầm so với các khách cùng gói dịch vụ",
        "Vi phạm Standard II vì liên quan tới thông tin chưa công bố",
        "Chỉ vi phạm nếu ba khách đó trả phí thấp hơn những khách khác",
      ],
      correct: 1,
      explanation:
        "Phương án đầu là cách chính người vi phạm thường tự mô tả hành vi của mình, và cũng là lý do dạng vi phạm này tồn tại lâu mà không ai nêu ra. Phương án ba nhầm Standard: báo cáo phân tích của chính công ty không phải thông tin nội bộ của tổ chức phát hành, nên đây là bài toán đối xử công bằng chứ không phải giao dịch nội gián.",
    },
  },
  {
    id: 1579,
    slug: "cfa-ethics-standard-3d-trinh-bay-hieu-suat",
    title: "CFA Ethics 23: Standard III(D) - Con số hiệu suất trung thực trông như thế nào",
    subtitle: "Thiên lệch sống sót, chọn khoảng thời gian đẹp, và hiệu suất mô phỏng ngược",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    whyItMatters:
      "Hiệu suất là con số quyết định phần lớn dòng vốn, nên nó cũng là con số chịu áp lực bóp méo lớn nhất - và phần lớn cách bóp méo đều không cần nói dối một chữ nào. Học nhận diện chúng có ích cả khi bạn trình bày lẫn khi bạn đọc của người khác.",
    openingQuestion:
      "Một công ty quảng cáo 'các quỹ của chúng tôi trung bình lãi 14%/năm trong 10 năm qua', tính trên các quỹ hiện đang hoạt động. Vấn đề ở đâu?",
    openingOptions: [
      "Không có vấn đề nếu từng con số đều đúng và kiểm chứng được",
      "Thiên lệch sống sót: các quỹ đóng cửa vì kết quả kém đã bị loại khỏi phép tính, nên con số trung bình bị đẩy lên",
      "Vấn đề là mười năm quá dài để có ý nghĩa với nhà đầu tư mới",
      "Vấn đề là chưa nêu rõ mức phí quản lý đã được trừ hay chưa",
    ],
    correctOption: 1,
    explanation:
      "Đây là dạng bóp méo tinh vi nhất vì không có con số nào sai. Mỗi quỹ còn sống thật sự đạt mức lãi đó; phép trung bình cũng tính đúng. Thứ sai là mẫu: các quỹ kém thường bị đóng hoặc sáp nhập, và khi biến mất khỏi danh sách thì chúng cũng biến mất khỏi phép tính. Kết quả là con số quảng cáo mô tả một nhóm mà nhà đầu tư mười năm trước không thể chọn được, vì lúc đó họ chưa biết quỹ nào sẽ sống sót. Standard III(D) yêu cầu trình bày công bằng và đầy đủ, và đó chính là lý do GIPS bắt buộc gộp toàn bộ tài khoản cùng chiến lược vào một composite thay vì để công ty tự chọn.",
    diagram: [
      { label: "Thiên lệch sống sót: quỹ kém rơi khỏi mẫu", arrow: true },
      { label: "Chọn khoảng thời gian: bắt đầu ngay sau đáy", arrow: true },
      { label: "Hiệu suất mô phỏng ngược: chiến lược tối ưu trên quá khứ", arrow: true },
      { label: "Cả ba đều đúng từng con số mà vẫn gây hiểu nhầm" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Hiệu suất mô phỏng ngược (backtest)",
      description:
        "Một chiến lược được tối ưu trên dữ liệu quá khứ gần như luôn cho kết quả đẹp, vì các tham số đã được chọn sau khi biết kết quả. Standard III(D) không cấm trình bày backtest, nhưng buộc ghi rõ rằng đây là kết quả mô phỏng chứ không phải hiệu suất thật của tiền thật - và ghi ở chỗ người đọc thấy, không phải chân trang. Trộn lẫn giai đoạn mô phỏng với giai đoạn vận hành thật thành một đường liền mạch là dạng trình bày sai lệch rõ ràng.",
    },
    quiz: [
      {
        question: "Thiên lệch sống sót làm sai lệch con số hiệu suất bằng cách nào?",
        options: [
          "Loại các quỹ kém khỏi mẫu, đẩy mức trung bình còn lại lên cao",
          "Tính trùng lợi nhuận của cùng một tài khoản ở nhiều quỹ khác nhau",
          "Bỏ qua phí quản lý khi tính lợi nhuận ròng cho nhà đầu tư",
          "Dùng lợi nhuận danh nghĩa thay vì lợi nhuận đã trừ lạm phát",
        ],
        correct: 0,
        explanation:
          "Không con số nào sai, chỉ có mẫu là sai - và đó là lý do dạng bóp méo này khó bị bắt bằng cách kiểm tra số liệu.",
      },
      {
        question: "Vì sao GIPS bắt buộc gộp mọi tài khoản cùng chiến lược vào một composite?",
        options: [
          "Để công ty không thể chỉ chọn những tài khoản có kết quả đẹp",
          "Để giảm chi phí tính toán hiệu suất cho bộ phận vận hành quỹ",
          "Để nhà đầu tư so sánh được giữa các công ty ở cùng quy mô vốn",
          "Để cơ quan quản lý chỉ cần kiểm tra một con số duy nhất mỗi quý",
        ],
        correct: 0,
        explanation:
          "Composite là câu trả lời trực tiếp cho việc chọn lọc mẫu: nếu buộc phải gộp hết thì không còn gì để chọn.",
      },
      {
        question: "Trình bày kết quả mô phỏng ngược (backtest) được phép không?",
        options: [
          "Được, nếu ghi rõ đó là mô phỏng và ghi ở chỗ người đọc thấy",
          "Không, Standard III(D) cấm hoàn toàn mọi hình thức mô phỏng",
          "Được, và không cần ghi chú nếu phương pháp đã công bố đầy đủ",
          "Không, trừ khi chiến lược đó đã chạy thật ít nhất ba năm",
        ],
        correct: 0,
        explanation:
          "Vấn đề không nằm ở việc mô phỏng mà ở việc để người đọc tưởng đó là tiền thật. Ghi chú ở chân trang không đạt chuẩn 'công bằng và đầy đủ'.",
      },
      {
        question: "Chọn ngày bắt đầu ngay sau một đợt sụp đổ để tính hiệu suất là gì?",
        options: [
          "Chọn khoảng thời gian có lợi - một dạng trình bày sai lệch",
          "Cách làm chuẩn vì loại bỏ được giai đoạn bất thường của thị trường",
          "Hợp lệ nếu ngày bắt đầu trùng với ngày quỹ chính thức hoạt động",
          "Chỉ có vấn đề khi khoảng thời gian được chọn dưới ba năm",
        ],
        correct: 0,
        explanation:
          "Cách kiểm tra nhanh: thử dịch ngày bắt đầu sớm hơn hoặc muộn hơn vài tháng. Nếu con số đổi hẳn thì nó đang mô tả khoảng thời gian chứ không mô tả kỹ năng.",
      },
      {
        question: "Nghĩa vụ cốt lõi mà Standard III(D) đặt ra là gì?",
        options: [
          "Trình bày hiệu suất một cách công bằng, chính xác và đầy đủ",
          "Bảo đảm hiệu suất báo cáo vượt chỉ số tham chiếu của ngành",
          "Công bố hiệu suất theo tần suất tối thiểu là mỗi quý một lần",
          "Chỉ được trình bày hiệu suất đã qua kiểm toán độc lập xác nhận",
        ],
        correct: 0,
        explanation:
          "Ba chữ này gánh toàn bộ Standard: chính xác chặn nói dối, công bằng chặn chọn lọc mẫu, đầy đủ chặn việc bỏ đi phần bất lợi.",
      },
    ],
    keyTakeaways: [
      "Ba cách bóp méo phổ biến đều không cần một con số sai nào",
      "Thiên lệch sống sót: quỹ kém rơi khỏi mẫu nên trung bình bị đẩy lên",
      "Composite của GIPS tồn tại để triệt tiêu việc chọn lọc mẫu",
      "Backtest được phép, nhưng phải ghi rõ là mô phỏng và ghi ở chỗ dễ thấy",
      "Công bằng, chính xác, đầy đủ - ba chữ gánh toàn bộ Standard",
    ],
    practicePrompt: {
      question:
        "Tài liệu chào bán ghi: 'Chiến lược đạt 22%/năm giai đoạn 2015-2024', trong đó 2015-2019 là mô phỏng và 2020-2024 là vận hành thật, vẽ thành một đường liền. Đánh giá?",
      options: [
        "Hợp lệ vì cả hai giai đoạn đều được tính đúng phương pháp",
        "Trình bày sai lệch: gộp mô phỏng với vận hành thật thành một đường khiến người đọc tưởng toàn bộ là tiền thật",
        "Chỉ có vấn đề nếu giai đoạn mô phỏng cho kết quả cao hơn giai đoạn thật",
        "Hợp lệ nếu có ghi chú nhỏ ở cuối tài liệu về giai đoạn mô phỏng",
      ],
      correct: 1,
      explanation:
        "Đường liền mạch là chính vấn đề, bất kể ghi chú. Nó phát đi thông điệp rằng một chiến lược đã hoạt động liên tục mười năm, trong khi một nửa thời gian đó không có đồng nào thật được đầu tư và các tham số đã được chọn sau khi biết kết quả. Phương án cuối là cách các tài liệu chào bán thật hay dùng, và nó không đạt chuẩn 'công bằng và đầy đủ'.",
    },
  },
  {
    id: 1580,
    slug: "cfa-ethics-standard-4b-thu-lao-them",
    title: "CFA Ethics 24: Standard IV(B) - Mọi khoản thu ngoài lương đều phải được nhà tuyển dụng biết",
    subtitle: "Công việc phụ, thù lao từ khách hàng, và vì sao đồng ý bằng miệng không đủ",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "💼",
    whyItMatters:
      "Đây là Standard ngắn nhất và cũng dễ vi phạm nhất mà không nhận ra, vì phần lớn các khoản thu thêm đều bắt đầu từ thiện chí - dạy thêm một lớp, tư vấn giúp một người quen, nhận thưởng từ một khách hài lòng.",
    openingQuestion:
      "Một khách hàng hài lòng đề nghị thưởng riêng cho bạn nếu danh mục của họ vượt 15% năm tới. Bạn nên làm gì?",
    openingOptions: [
      "Từ chối vì mọi khoản thưởng từ khách hàng đều bị cấm tuyệt đối",
      "Nhận nếu được nhà tuyển dụng đồng ý bằng văn bản, sau khi đã báo rõ bản chất, số tiền và thời hạn",
      "Nhận vì đó là phần thưởng cho kết quả tốt của chính bạn",
      "Nhận nhưng chỉ cần báo miệng cho quản lý trực tiếp là đủ",
    ],
    correctOption: 1,
    explanation:
      "Standard IV(B) không cấm nhận thù lao thêm - nó cấm nhận mà nhà tuyển dụng không biết. Lý do rất cụ thể: một khoản thưởng gắn với hiệu suất danh mục của một khách hàng tạo động cơ ưu tiên khách đó hơn các khách khác, và tạo động cơ gánh thêm rủi ro để chạm ngưỡng thưởng. Nhà tuyển dụng là bên duy nhất nhìn được toàn bộ danh mục khách hàng của bạn, nên họ phải là bên đánh giá xung đột này. Văn bản là bắt buộc chứ không phải hình thức: khi có tranh chấp sau này, đồng ý bằng miệng không phân biệt được với việc không hề xin phép.",
    diagram: [
      { label: "Mọi khoản thu ngoài lương, kể cả phi tiền mặt", arrow: true },
      { label: "Báo rõ: bản chất, số tiền, thời hạn, bên chi trả", arrow: true },
      { label: "Nhà tuyển dụng đồng ý BẰNG VĂN BẢN", arrow: true },
      { label: "Rồi mới được nhận" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao phạm vi rộng hơn tiền",
      description:
        "Standard IV(B) áp dụng cho mọi thứ có thể tạo xung đột với lợi ích của nhà tuyển dụng, không chỉ tiền mặt. Một vị trí trong hội đồng quản trị của doanh nghiệp khác, một công việc tư vấn cuối tuần, cổ phần trong một công ty khởi nghiệp mà bạn cũng đang phân tích - tất cả đều nằm trong phạm vi. Câu hỏi kiểm tra nhanh là: nếu nhà tuyển dụng biết chuyện này, họ có muốn biết không? Nếu câu trả lời là có, thì nghĩa vụ báo cáo đã phát sinh.",
    },
    quiz: [
      {
        question: "Standard IV(B) cấm điều gì?",
        options: [
          "Nhận thù lao thêm mà nhà tuyển dụng không biết và không đồng ý",
          "Nhận bất kỳ khoản thù lao nào ngoài lương từ nhà tuyển dụng chính",
          "Làm thêm công việc thứ hai trong cùng lĩnh vực tài chính đầu tư",
          "Nhận quà tặng từ khách hàng có giá trị vượt mức trần quy định",
        ],
        correct: 0,
        explanation:
          "Trọng tâm là sự minh bạch với nhà tuyển dụng, không phải cấm kiếm thêm. Nhiều thỏa thuận hoàn toàn được chấp nhận sau khi báo cáo.",
      },
      {
        question: "Vì sao đồng ý bằng miệng của quản lý không đủ?",
        options: [
          "Vì khi có tranh chấp, nó không phân biệt được với việc không xin phép",
          "Vì quản lý trực tiếp không có thẩm quyền phê duyệt khoản thu thêm",
          "Vì Standard yêu cầu phải có xác nhận của bộ phận pháp chế công ty",
          "Vì thỏa thuận miệng không có giá trị pháp lý theo luật lao động",
        ],
        correct: 0,
        explanation:
          "Yêu cầu văn bản không phải thủ tục hành chính - nó là thứ duy nhất còn lại khi trí nhớ hai bên khác nhau sau hai năm.",
      },
      {
        question: "Phạm vi của 'thù lao thêm' theo Standard IV(B) gồm những gì?",
        options: [
          "Mọi lợi ích có thể xung đột với nhà tuyển dụng, kể cả phi tiền mặt",
          "Chỉ các khoản tiền mặt nhận trực tiếp từ khách hàng của công ty",
          "Chỉ những khoản có giá trị vượt một phần trăm lương năm của bạn",
          "Chỉ các khoản phát sinh từ hoạt động trong cùng ngành tài chính",
        ],
        correct: 0,
        explanation:
          "Ghế hội đồng quản trị, cổ phần khởi nghiệp, công việc tư vấn cuối tuần - đều nằm trong phạm vi dù không có đồng tiền mặt nào đổi tay ngay.",
      },
      {
        question: "Vì sao thưởng gắn với hiệu suất của một khách hàng tạo xung đột?",
        options: [
          "Nó tạo động cơ ưu tiên khách đó và gánh thêm rủi ro để chạm ngưỡng",
          "Nó khiến khách hàng khác phải trả mức phí quản lý cao hơn",
          "Nó làm hiệu suất báo cáo của toàn bộ quỹ bị tính sai lệch",
          "Nó buộc nhà quản lý phải công bố danh mục cho khách hàng đó",
        ],
        correct: 0,
        explanation:
          "Hai xung đột cùng lúc: lệch phân bổ sự chú ý giữa các khách, và lệch khẩu vị rủi ro so với mức khách hàng đã chọn.",
      },
      {
        question: "Câu hỏi kiểm tra nhanh xem có phải báo cáo hay không là gì?",
        options: [
          "Nếu nhà tuyển dụng biết chuyện này, họ có muốn biết không",
          "Khoản thu này có vượt quá một phần lương tháng của bạn không",
          "Việc này có diễn ra trong giờ làm việc chính thức hay không",
          "Bên chi trả có phải khách hàng hiện tại của công ty hay không",
        ],
        correct: 0,
        explanation:
          "Câu hỏi này bao được cả những trường hợp không có tiền và không trong giờ làm - đúng những trường hợp hay bị bỏ qua nhất.",
      },
    ],
    keyTakeaways: [
      "Không cấm kiếm thêm - cấm kiếm thêm mà nhà tuyển dụng không biết",
      "Phải báo rõ bản chất, số tiền, thời hạn và bên chi trả",
      "Đồng ý phải bằng văn bản; miệng không phân biệt được với không xin phép",
      "Phạm vi gồm cả lợi ích phi tiền mặt: ghế HĐQT, cổ phần, tư vấn cuối tuần",
      "Kiểm tra nhanh: nếu nhà tuyển dụng biết, họ có muốn biết không",
    ],
    practicePrompt: {
      question:
        "Bạn được mời dạy một khóa cuối tuần về phân tích tài chính, có thù lao, không liên quan tới khách hàng nào của công ty. Có cần báo không?",
      options: [
        "Không, vì hoàn toàn không liên quan tới khách hàng của công ty",
        "Có: đây vẫn là thù lao ngoài lương và chiếm thời gian, năng lực chuyên môn mà nhà tuyển dụng có quyền biết để tự đánh giá",
        "Không, vì diễn ra ngoài giờ làm việc chính thức",
        "Chỉ cần báo nếu thù lao vượt một tháng lương của bạn",
      ],
      correct: 1,
      explanation:
        "Hai phương án 'không' đều dựa trên tiêu chí mà Standard không dùng: liên quan khách hàng, và trong hay ngoài giờ. Tiêu chí thật là có tạo ra xung đột tiềm tàng hay không, và bên đánh giá điều đó là nhà tuyển dụng chứ không phải bạn. Rất có thể họ đồng ý ngay - nhưng quyết định đó phải là của họ.",
    },
  },
  {
    id: 1581,
    slug: "cfa-ethics-standard-5b-trao-doi-voi-khach-hang",
    title: "CFA Ethics 25: Standard V(B) - Tách sự thật khỏi ý kiến khi nói với khách hàng",
    subtitle: "Nêu rõ quy trình, giới hạn của mô hình, và những gì đã thay đổi kể từ lần trước",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💬",
    whyItMatters:
      "Phần lớn khiếu nại của khách hàng không đến từ việc mất tiền, mà từ việc mất tiền theo cách họ không hiểu và không được cảnh báo. Standard V(B) là Standard xử lý đúng khoảng cách đó.",
    openingQuestion:
      "Trong báo cáo, bạn viết: 'Doanh nghiệp sẽ đạt tăng trưởng doanh thu 25% năm tới nhờ nhà máy mới đi vào hoạt động'. Vấn đề ở đâu?",
    openingOptions: [
      "Không có vấn đề nếu phân tích của bạn thực sự dẫn tới con số đó",
      "Câu này trình bày một dự báo như thể là sự thật - phải nêu rõ đây là ước tính của bạn và dựa trên giả định nào",
      "Vấn đề là con số 25% quá cụ thể nên dễ bị sai",
      "Vấn đề là chưa nêu rõ nguồn dữ liệu về nhà máy mới",
    ],
    correctOption: 1,
    explanation:
      "Chữ 'sẽ' làm toàn bộ khác biệt. Việc nhà máy đi vào hoạt động có thể là sự thật đã công bố; con số 25% thì luôn là ý kiến, dù được xây trên mô hình cẩn thận đến đâu. Standard V(B) yêu cầu phân biệt rõ hai loại này, vì khách hàng đọc chúng theo hai cách hoàn toàn khác nhau và ra quyết định khác nhau. Yêu cầu thứ hai của Standard đi xa hơn: phải nêu quy trình và giới hạn của phân tích - mô hình dựa trên giả định gì, giả định nào nhạy nhất, và điều gì sẽ khiến kết luận đổi. Một khách hàng biết dự báo phụ thuộc vào giá đầu vào sẽ phản ứng khác hẳn khi giá đầu vào tăng vọt.",
    diagram: [
      { label: "Tách rõ sự thật với ý kiến của mình", arrow: true },
      { label: "Nêu quy trình và giả định chính của phân tích", arrow: true },
      { label: "Nêu giới hạn: điều gì làm kết luận đổi", arrow: true },
      { label: "Báo khi quy trình hoặc giả định thay đổi" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Nghĩa vụ báo khi quy trình thay đổi",
      description:
        "Standard V(B) không chỉ áp dụng lúc trình bày lần đầu. Nếu quy trình đầu tư thay đổi - đổi mô hình định giá, đổi tiêu chí chọn cổ phiếu, đổi mức đòn bẩy tối đa - thì khách hàng phải được báo, kể cả khi kết quả vẫn tốt. Lý do là khách hàng đã chọn bạn dựa trên một quy trình cụ thể; đổi quy trình mà không nói là thay đổi sản phẩm họ đã mua mà không hỏi họ.",
    },
    quiz: [
      {
        question: "Standard V(B) yêu cầu phân biệt rõ hai thứ nào?",
        options: [
          "Sự thật và ý kiến của người phân tích",
          "Dữ liệu quá khứ và dữ liệu dự báo tương lai",
          "Khách hàng cá nhân và khách hàng tổ chức",
          "Phân tích cơ bản và phân tích kỹ thuật",
        ],
        correct: 0,
        explanation:
          "Khách hàng đọc một sự thật và một ý kiến theo hai cách hoàn toàn khác nhau, nên trộn lẫn chúng làm hỏng chính quyết định của họ.",
      },
      {
        question: "Vì sao phải nêu giới hạn của mô hình phân tích?",
        options: [
          "Để khách biết điều gì sẽ khiến kết luận thay đổi",
          "Để giảm trách nhiệm pháp lý của người phân tích khi dự báo sai",
          "Vì quy định buộc mọi báo cáo phải có phần cảnh báo rủi ro",
          "Để khách hàng có thể tự xây lại mô hình đó cho riêng mình",
        ],
        correct: 0,
        explanation:
          "Mục đích là giúp khách phản ứng đúng khi điều kiện đổi, không phải để người phân tích tự bảo vệ - dù nó cũng có tác dụng đó.",
      },
      {
        question: "Khi quy trình đầu tư thay đổi nhưng kết quả vẫn tốt thì sao?",
        options: [
          "Vẫn phải báo, vì khách đã chọn dựa trên quy trình cụ thể đó",
          "Không cần báo, vì nghĩa vụ chỉ phát sinh khi kết quả xấu đi",
          "Chỉ cần ghi trong báo cáo thường niên tiếp theo của quỹ",
          "Chỉ cần báo nếu mức phí quản lý cũng thay đổi theo",
        ],
        correct: 0,
        explanation:
          "Đổi quy trình mà không nói là đổi sản phẩm khách đã mua mà không hỏi họ - kết quả tốt không làm điều đó hợp lệ.",
      },
      {
        question: "Viết 'doanh nghiệp sẽ tăng trưởng 25%' thay vì 'chúng tôi ước tính 25%' là gì?",
        options: [
          "Trình bày một ý kiến như thể là sự thật",
          "Cách viết súc tích được chấp nhận trong báo cáo phân tích",
          "Chỉ là vấn đề văn phong, không liên quan tới Standard nào",
          "Vi phạm Standard I(C) về trình bày sai trình độ chuyên môn",
        ],
        correct: 0,
        explanation:
          "Một chữ thay đổi cách khách đọc cả câu, và đó chính là thứ Standard V(B) nhắm tới - không phải văn phong mà là điều người đọc tin.",
      },
      {
        question: "Với khách hàng cá nhân ít kinh nghiệm, nghĩa vụ này thay đổi thế nào?",
        options: [
          "Không đổi về bản chất, nhưng cách diễn đạt phải phù hợp để họ hiểu được",
          "Nhẹ hơn, vì khách không có nền tảng để hiểu chi tiết kỹ thuật",
          "Nặng hơn, phải trình bày toàn bộ mô hình định lượng đã sử dụng",
          "Không áp dụng, vì Standard này chỉ dành cho khách hàng tổ chức",
        ],
        correct: 0,
        explanation:
          "Truyền đạt cho người không hiểu được thì chưa gọi là đã truyền đạt. Đơn giản hóa cách nói là bắt buộc; bỏ bớt nội dung thì không.",
      },
    ],
    keyTakeaways: [
      "Tách rõ sự thật với ý kiến - khách đọc hai loại đó theo hai cách khác nhau",
      "Nêu quy trình, giả định chính, và điều gì sẽ làm kết luận đổi",
      "Đổi quy trình phải báo, kể cả khi kết quả vẫn tốt",
      "Một chữ 'sẽ' thay vì 'chúng tôi ước tính' đã đủ chuyển ý kiến thành sự thật",
      "Với khách ít kinh nghiệm: đơn giản hóa cách nói, không bỏ bớt nội dung",
    ],
    practicePrompt: {
      question:
        "Bạn dùng một mô hình định giá cho kết quả rất nhạy với giả định tăng trưởng dài hạn. Nên trình bày thế nào với khách?",
      options: [
        "Chỉ đưa kết quả cuối cùng để tránh làm khách rối",
        "Nêu rõ kết quả phụ thuộc mạnh vào giả định nào, và khoảng giá trị thay đổi ra sao khi giả định đó đổi",
        "Đưa toàn bộ bảng tính để khách tự kiểm tra",
        "Chọn giả định thận trọng nhất rồi chỉ báo con số đó",
      ],
      correct: 1,
      explanation:
        "Ba phương án còn lại đều là cách tránh né khác nhau: giấu bớt, đổ hết sang khách, hoặc thay khách quyết định mức thận trọng. Phương án đúng chuyển đúng thứ khách cần - biết kết quả mong manh ở chỗ nào - mà không bắt họ đọc mô hình. Bảng độ nhạy là cách chuẩn để làm việc đó.",
    },
  },
  {
    id: 1582,
    slug: "cfa-ethics-standard-7b-dung-danh-xung-cfa",
    title: "CFA Ethics 26: Standard VII(B) - Dùng đúng danh xưng CFA, và vì sao quy tắc chặt đến vậy",
    subtitle: "Charterholder, candidate, và những cách diễn đạt nghe vô hại nhưng vi phạm",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🎓",
    whyItMatters:
      "Đây là Standard mà một candidate có thể vi phạm ngay trước khi biết Standard nào tồn tại - chỉ bằng một dòng trên hồ sơ xin việc hoặc mạng nghề nghiệp. CFA Institute xử lý nhóm vi phạm này rất nghiêm vì nó chạm trực tiếp vào giá trị của danh xưng.",
    openingQuestion:
      "Bạn đã thi đỗ cả ba cấp độ nhưng chưa đủ kinh nghiệm làm việc yêu cầu. Bạn được ghi gì trên hồ sơ?",
    openingOptions: [
      "'CFA' - vì đã hoàn thành toàn bộ ba kỳ thi",
      "Mô tả chính xác rằng đã đỗ cả ba cấp độ và đang hoàn thiện yêu cầu kinh nghiệm, nhưng chưa được dùng danh xưng CFA",
      "'CFA (chờ cấp)' - vì chỉ còn thiếu thủ tục hành chính",
      "Tùy chọn, miễn là không gây hiểu nhầm cho nhà tuyển dụng",
    ],
    correctOption: 1,
    explanation:
      "Danh xưng CFA chỉ thuộc về người đã hoàn thành cả ba kỳ thi, đủ kinh nghiệm làm việc theo yêu cầu, nộp đơn và được cấp - và duy trì tư cách thành viên. Thiếu bất kỳ điều kiện nào thì không được dùng, kể cả khi phần thi đã xong hết. Các biến thể như 'CFA (chờ cấp)' hay 'CFA Level III passed' đặt cạnh tên đều bị coi là vi phạm vì chúng tạo ấn tượng sở hữu danh xưng. Cách viết được chấp nhận là mô tả trạng thái bằng câu, trong phần kinh nghiệm hoặc học vấn, chứ không phải như một hậu tố sau tên.",
    diagram: [
      { label: "Đỗ cả ba kỳ thi", arrow: true },
      { label: "Đủ kinh nghiệm làm việc theo yêu cầu", arrow: true },
      { label: "Nộp đơn, được cấp, duy trì tư cách thành viên", arrow: true },
      { label: "Đủ cả bốn mới được dùng danh xưng CFA" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao không có 'CFA Level II' như một danh hiệu",
      description:
        "Cách viết được chấp nhận là 'CFA Level II candidate' - và chỉ khi bạn thực sự đã đăng ký hợp lệ cho kỳ thi Level II. Không tồn tại danh hiệu 'CFA Level II' như một thứ đã đạt được, vì các cấp độ là các chặng của một chương trình chứ không phải các chứng chỉ riêng. Việc đỗ một cấp độ cũng không được diễn đạt như một bằng cấp độc lập - nó là tiến độ, không phải kết quả cuối.",
    },
    quiz: [
      {
        question: "Điều kiện nào KHÔNG bắt buộc để được dùng danh xưng CFA?",
        options: [
          "Làm việc tại một tổ chức đã đăng ký với CFA Institute",
          "Hoàn thành cả ba kỳ thi của chương trình CFA",
          "Đáp ứng yêu cầu về số năm kinh nghiệm làm việc phù hợp",
          "Duy trì tư cách thành viên của CFA Institute còn hiệu lực",
        ],
        correct: 0,
        explanation:
          "Điều kiện gắn với cá nhân chứ không với nơi làm việc. Ba điều kiện còn lại đều bắt buộc và thiếu một là không được dùng.",
      },
      {
        question: "Đỗ cả ba kỳ thi nhưng chưa đủ kinh nghiệm thì được ghi thế nào?",
        options: [
          "Mô tả trạng thái bằng câu, không đặt CFA như hậu tố sau tên",
          "Ghi 'CFA' vì phần khó nhất của chương trình đã hoàn thành",
          "Ghi 'CFA (chờ cấp)' để thể hiện rõ đang ở giai đoạn cuối",
          "Ghi 'CFA Level III' như một chứng chỉ riêng đã đạt được",
        ],
        correct: 0,
        explanation:
          "Mọi biến thể đặt cạnh tên đều tạo ấn tượng sở hữu danh xưng, và đó chính là thứ bị cấm.",
      },
      {
        question: "Cách viết nào được chấp nhận cho một người đang thi Level II?",
        options: [
          "'CFA Level II candidate', nếu đã đăng ký hợp lệ cho kỳ thi đó",
          "'CFA Level I' như một chứng chỉ đã đạt được ở cấp độ một",
          "'CFA (đang học)' đặt ngay sau tên trên hồ sơ nghề nghiệp",
          "'Ứng viên CFA' mà không cần nêu rõ đang ở cấp độ nào",
        ],
        correct: 0,
        explanation:
          "Chữ 'candidate' là bắt buộc, và nó phải đúng sự thật - đăng ký hợp lệ chứ không phải chỉ đang có ý định thi.",
      },
      {
        question: "Vì sao không tồn tại danh hiệu 'CFA Level II'?",
        options: [
          "Vì các cấp độ là chặng của chương trình, không phải chứng chỉ",
          "Vì CFA Institute chỉ cấp chứng chỉ cho Level I và Level III",
          "Vì kết quả từng cấp độ không được lưu trữ sau khi thi xong",
          "Vì tên các cấp độ đã được đăng ký nhãn hiệu bởi bên thứ ba",
        ],
        correct: 0,
        explanation:
          "Đây là lý do mọi cách diễn đạt biến một cấp độ thành bằng cấp độc lập đều sai - nó mô tả tiến độ như thể là kết quả cuối.",
      },
      {
        question: "Vì sao CFA Institute xử lý nhóm vi phạm này rất nghiêm?",
        options: [
          "Vì danh xưng chỉ có giá trị khi nó thuộc về người đủ điều kiện",
          "Vì đây là nhóm vi phạm gây thiệt hại tài chính lớn nhất cho khách hàng",
          "Vì luật pháp nhiều nước hình sự hóa việc dùng sai danh xưng nghề nghiệp",
          "Vì đây là nhóm vi phạm duy nhất có thể phát hiện tự động bằng hệ thống",
        ],
        correct: 0,
        explanation:
          "Danh xưng là một tín hiệu chất lượng, và tín hiệu chỉ có giá trị khi không ai phát nó ra được nếu chưa đủ điều kiện.",
      },
    ],
    keyTakeaways: [
      "Bốn điều kiện: đỗ ba kỳ thi, đủ kinh nghiệm, được cấp, duy trì tư cách thành viên",
      "Thiếu một điều kiện thì không được dùng, kể cả khi đã thi xong hết",
      "'CFA (chờ cấp)', 'CFA Level III' đặt cạnh tên đều là vi phạm",
      "'CFA Level II candidate' được chấp nhận nếu đã đăng ký hợp lệ",
      "Các cấp độ là chặng của một chương trình, không phải chứng chỉ riêng",
    ],
    practicePrompt: {
      question:
        "Trên trang mạng nghề nghiệp, bạn ghi tên mình kèm hậu tố 'CFA Level II Candidate' ngay sau họ tên. Đánh giá?",
      options: [
        "Hợp lệ vì đã ghi rõ chữ Candidate nên không gây hiểu nhầm",
        "Không nên: hướng dẫn của CFA Institute yêu cầu mô tả trạng thái candidate trong phần nội dung, không đặt như hậu tố sau tên",
        "Hợp lệ nếu bạn thực sự đã đăng ký kỳ thi Level II",
        "Vi phạm vì không tồn tại khái niệm CFA Level II Candidate",
      ],
      correct: 1,
      explanation:
        "Đây là chỗ hai điều đúng dễ bị lẫn. 'CFA Level II candidate' là cách diễn đạt hợp lệ - nên phương án cuối sai. Nhưng vị trí đặt nó cũng bị quy định: hậu tố sau tên là chỗ dành cho danh xưng đã sở hữu, nên đặt tư cách candidate ở đó tạo đúng ấn tượng mà quy tắc muốn tránh, dù từng chữ đều đúng.",
    },
  },
];
