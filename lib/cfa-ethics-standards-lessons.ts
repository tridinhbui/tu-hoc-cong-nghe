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
];
