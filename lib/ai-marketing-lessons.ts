import type { Lesson } from "./lesson-types";

// Chặng "Marketing với AI" (ids 1770-1775, personal track, Chặng 22).
//
// Viết cho người non-tech đến từ hành trình /hoc-theo-nhu-cau/ai-marketing:
// mỗi bài mở bằng một ví dụ đời thường (quán cà phê), rồi mới tới công cụ.
// Không dạy tên công cụ cụ thể nào - chúng đổi mỗi quý; dạy cách giao việc,
// cách kiểm, và cách đo, vì ba thứ đó đúng với mọi công cụ.
//
// Dải 1770-1779 còn trống bốn id cho bài bổ sung mà không phải đánh số lại.

export const AI_MARKETING_LESSONS: Lesson[] = [
  {
    id: 1770,
    slug: "marketing-voi-ai-bat-dau-tu-dau",
    title: "Chặng 22, Bài 1: Marketing với AI bắt đầu từ đâu",
    subtitle: "AI viết nhanh hơn bạn - nhưng nó không biết khách của bạn là ai.",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "📣",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Hầu hết người mới dùng AI để làm marketing bắt đầu bằng việc nhờ nó viết bài đăng, và nhận về những đoạn văn trơn tru mà không ai đọc. Biết AI giỏi ở khâu nào và dở ở khâu nào giúp bạn đặt nó vào đúng chỗ ngay từ đầu.",
    openingQuestion:
      "Bạn mở một tiệm bánh nhỏ và nhờ AI viết mười bài đăng quảng cáo. Bài nào cũng hay nhưng không ai bấm vào. Lý do khả dĩ nhất là gì?",
    openingOptions: [
      "AI không biết khách của bạn là ai nên viết cho một người chung chung",
      "Mạng xã hội tự động chặn mọi bài đăng do AI viết ra nên không ai thấy",
      "Mười bài là quá ít, phải đăng ít nhất một trăm bài thì mới có hiệu quả",
      "Bài do AI viết luôn sai chính tả nên người đọc thấy kém chuyên nghiệp",
    ],
    correctOption: 0,
    explanation:
      "AI viết cho người đọc mà bạn mô tả cho nó. Không mô tả gì, nó viết cho một người trung bình không có thật - và bài viết cho mọi người thì không chạm được ai. Vấn đề không nằm ở câu chữ, cũng không ở số lượng: nó nằm ở chỗ chưa ai nói cho AI biết khách của tiệm bánh là ai, họ lo gì, và vì sao họ nên chọn tiệm này thay vì tiệm bên cạnh. Đó là phần việc của bạn, không phải của AI.",
    diagram: [
      { label: "Bạn: hiểu khách là ai, cần gì", arrow: true },
      { label: "AI: viết nháp nhiều phiên bản thật nhanh", arrow: true },
      { label: "Bạn: chọn, sửa, kiểm lại", arrow: true },
      { label: "Số liệu: khách thật phản ứng ra sao" },
    ],
    realWorldExample: {
      company: "Một quán cà phê ở Đà Lạt",
      description:
        "Chủ quán nhờ AI viết bài giới thiệu và nhận về những câu kiểu \"không gian lãng mạn, đồ uống tuyệt hảo\". Khi chủ quán kể thêm rằng khách chủ yếu là sinh viên ôn thi cần chỗ ngồi yên tĩnh có ổ cắm, AI viết lại hoàn toàn khác - và đó mới là bài có người bấm vào.",
    },
    quiz: [
      {
        question: "Trong marketing, AI giỏi nhất ở khâu nào?",
        options: [
          "Viết nhanh nhiều bản nháp để bạn chọn và sửa",
          "Chọn giúp bạn nên bán cho ai",
          "Biết chính xác khách hàng của bạn nghĩ gì mà không cần dữ liệu",
          "Thay bạn trả lời mọi bình luận mà không cần ai đọc lại trước",
        ],
        correct: 0,
        explanation:
          "Tốc độ viết nháp là thế mạnh thật của AI: mười phiên bản tiêu đề trong vài giây. Chọn nhóm khách và hiểu họ nghĩ gì thì cần dữ liệu và hiểu biết mà chỉ bạn có. Còn trả lời khách mà không ai đọc lại là cách nhanh nhất để một câu bịa đặt đi thẳng tới người mua.",
      },
      {
        question: "Vì sao một bài đăng \"viết cho mọi người\" thường không hiệu quả?",
        options: [
          "Vì không ai thấy bài đó đang nói với chính mình",
          "Vì mạng xã hội chỉ hiện bài cho người đã theo dõi trang từ trước đó",
          "Vì bài viết cho nhiều người thì bắt buộc phải dài hơn mức người ta chịu đọc",
          "Vì AI chỉ viết được cho một nhóm",
        ],
        correct: 0,
        explanation:
          "Người đọc lướt nhanh và chỉ dừng lại khi thấy một câu nói đúng hoàn cảnh của mình. Bài viết chung chung không có câu nào như vậy. Độ dài và thuật toán đều có ảnh hưởng, nhưng chúng là chuyện phụ so với việc bài viết không nhắm vào ai cả.",
      },
      {
        question: "Trước khi nhờ AI viết, việc quan trọng nhất bạn cần làm là gì?",
        options: [
          "Mô tả rõ khách là ai, họ lo gì và bạn giúp gì",
          "Chọn công cụ AI đắt nhất vì nó luôn viết hay hơn các công cụ miễn phí",
          "Học thuộc mẫu câu lệnh trên mạng",
          "Chuẩn bị sẵn thật nhiều ảnh đẹp vì AI cần ảnh mới viết được chữ",
        ],
        correct: 0,
        explanation:
          "Chất lượng đầu ra phụ thuộc vào thứ bạn đưa vào nhiều hơn là vào công cụ. Một mô tả khách hàng rõ ràng biến một công cụ miễn phí thành trợ lý tốt; một câu lệnh chép trên mạng không có thông tin gì về khách của bạn thì công cụ nào cũng viết chung chung như nhau.",
      },
      {
        question: "AI viết một bài có câu \"được 10.000 khách tin dùng\". Bạn nên làm gì?",
        options: [
          "Kiểm lại con số, vì AI có thể tự bịa ra nó",
          "Đăng luôn, số lớn thì thuyết phục hơn",
          "Tăng lên 20.000 cho ấn tượng",
          "Giữ nguyên, AI chỉ viết điều đúng",
        ],
        correct: 0,
        explanation:
          "AI hay điền những con số nghe hợp lý vào chỗ trống - nó không biết tiệm của bạn có bao nhiêu khách. Đăng một con số bịa là quảng cáo sai sự thật, và khách phát hiện ra thì mất niềm tin nhanh hơn mọi bài đăng dựng lại được. Mọi con số và lời hứa trong bài đều phải qua tay bạn.",
      },
      {
        question: "Vòng làm việc đúng khi dùng AI cho marketing là gì?",
        options: [
          "Hiểu khách → AI viết nháp → bạn sửa → đo phản ứng",
          "AI viết → đăng ngay → chờ xem có ai mua hay không rồi tính tiếp",
          "Đo phản ứng → AI viết → đăng → rồi mới đi tìm hiểu khách là ai",
          "Bạn tự viết hết → nhờ AI chấm điểm bài → đăng bài được điểm cao nhất",
        ],
        correct: 0,
        explanation:
          "AI nằm ở giữa vòng, không ở đầu và không ở cuối. Đầu vòng là hiểu biết về khách, thứ AI không có; cuối vòng là số liệu thật, thứ AI không đoán được. Bỏ qua bước đầu thì viết chung chung, bỏ qua bước cuối thì không biết bài nào thật sự có hiệu quả.",
      },
    ],
    keyTakeaways: [
      "AI viết nháp nhanh, nhưng không biết khách của bạn là ai.",
      "Bài viết cho mọi người thì không chạm được ai.",
      "Mô tả khách hàng rõ ràng quan trọng hơn chọn công cụ nào.",
      "Mọi con số và lời hứa AI viết ra đều phải kiểm lại.",
      "Vòng đúng: hiểu khách → AI nháp → bạn sửa → đo phản ứng.",
    ],
    practicePrompt: {
      question: "Câu lệnh nào sẽ cho ra bài đăng tốt nhất cho một tiệm bánh?",
      options: [
        "Viết bài cho mẹ bỉm sữa đặt bánh sinh nhật, lo bánh nhiều đường",
        "Viết một bài quảng cáo thật hay và hấp dẫn cho tiệm bánh của tôi",
        "Viết bài quảng cáo tiệm bánh dài khoảng năm trăm chữ, thật nhiều biểu tượng",
        "Viết bài giống bài của tiệm bánh nổi tiếng nhất thành phố",
      ],
      correct: 0,
      explanation:
        "Câu lệnh đầu tiên nói rõ người đọc là ai và nỗi lo của họ, nên AI có chỗ bám để viết một bài chạm đúng người. Các câu còn lại chỉ nói về hình thức - hay, dài, nhiều biểu tượng, giống ai đó - mà không cho AI biết gì về khách của bạn.",
    },
    summary: {
      keyIdea: "AI là người viết nháp siêu nhanh; hiểu khách và kiểm chứng vẫn là việc của bạn.",
      formula: "Hiểu khách → AI viết nháp → bạn sửa và kiểm → đo phản ứng thật.",
      commonMistake: "Nhờ AI viết mà không nói khách là ai, rồi đăng luôn không kiểm.",
      action: "Viết ba câu mô tả khách hàng chính của bạn: họ là ai, họ lo gì, bạn giúp gì.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Viết ba câu mô tả khách hàng chính của bạn. Rồi nhờ AI viết cùng một bài đăng hai lần: lần đầu không kèm ba câu đó, lần hai có kèm. Đặt hai bản cạnh nhau.",
      secondary: "Bạn sẽ thấy tận mắt: thứ làm bài viết khác đi không phải công cụ, mà là thông tin bạn đưa vào.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này dành cho người muốn dùng AI để bán hàng, làm nội dung, hay quảng bá một dự án nhỏ. Bài đầu không dạy công cụ nào - nó chỉ ra AI đứng ở đâu trong việc marketing, vì đặt sai chỗ là lý do phổ biến nhất khiến người mới thất vọng.",
      },
      {
        type: "feynman",
        title: "Marketing với AI đơn giản hơn bạn nghĩ",
        intro: "Hãy tưởng tượng bạn mở một quán cà phê. Marketing là làm sao để người đi qua dừng lại, bước vào, và quay lại lần sau.",
        columns: ["Thành phần", "Ở quán cà phê", "Khi làm với AI"],
        rows: [
          ["Nội dung", "Biển hiệu, tờ rơi, thực đơn", "AI viết nháp bài đăng, tiêu đề, email trong vài giây"],
          ["Khách hàng", "Người đi ngang qua cửa quán", "AI giúp phác hoạ chân dung khách: họ là ai, cần gì"],
          ["Dữ liệu", "Sổ ghi khách quen và món họ hay gọi", "Số liệu lượt xem, lượt bấm, đơn hàng"],
          ["Thử nghiệm", "Đổi biển hiệu xem khách có vào nhiều hơn", "Thử hai phiên bản quảng cáo, giữ bản hiệu quả hơn"],
        ],
        oneLiner: "AI viết biển hiệu nhanh hơn, còn dữ liệu cho bạn biết biển nào khách thật sự dừng lại xem.",
      },
      { type: "heading", text: "AI giỏi gì, dở gì" },
      {
        type: "comparison",
        left: {
          label: "Giao cho AI",
          text: "Viết nhiều bản nháp tiêu đề, bài đăng, email. Viết lại một đoạn theo giọng khác. Tóm tắt phản hồi của khách thành vài ý chính. Gợi ý ý tưởng khi bạn bí.",
        },
        right: {
          label: "Giữ cho mình",
          text: "Quyết định bán cho ai. Mọi con số, lời hứa, giá cả. Trả lời khách đang bực. Chọn bản nào được đăng. Những việc này cần hiểu biết và trách nhiệm mà AI không có.",
        },
      },
      { type: "heading", text: "Vì sao bài của AI thường nhạt" },
      {
        type: "paragraph",
        text: "AI viết cho người đọc mà bạn mô tả. Không mô tả gì, nó viết cho một người trung bình không có thật - và câu chữ trơn tru nhưng không nói với ai cả. Thêm ba câu về khách hàng thật vào câu lệnh thường thay đổi kết quả nhiều hơn mọi mẹo viết câu lệnh cộng lại.",
      },
      {
        type: "callout",
        label: "Con số là vùng nguy hiểm",
        text: "AI hay điền những con số nghe hợp lý: \"10.000 khách tin dùng\", \"giảm 50% thời gian\". Nó không biết số thật của bạn. Mọi con số và lời hứa phải qua tay bạn trước khi đăng.",
      },
      {
        type: "closing",
        lines: [
          "AI không thay bạn hiểu khách. Nó thay bạn gõ phím.",
          "Bài sau: cách vẽ chân dung khách hàng để AI có chỗ bám mà viết.",
        ],
      },
    ],
  },
  {
    id: 1771,
    slug: "chan-dung-khach-hang-cho-ai",
    title: "Chặng 22, Bài 2: Chân dung khách hàng - thứ AI cần mà không tự có",
    subtitle: "Ba câu về khách hàng thật đáng giá hơn mọi mẹo viết câu lệnh.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧑‍🤝‍🧑",
    track: "personal",
    whyItMatters:
      "Chân dung khách hàng là tài liệu bạn dán vào mọi câu lệnh marketing. Viết nó một lần cẩn thận thì mọi bài đăng, email, quảng cáo về sau đều có chỗ bám; không có nó, lần nào bạn cũng nhận về cùng một kiểu văn chung chung.",
    openingQuestion:
      "Chân dung khách hàng nào giúp AI viết bài tốt nhất cho một lớp dạy bơi trẻ em?",
    openingOptions: [
      "Bố mẹ đi làm, con 5-8 tuổi, sợ con đuối nước khi đi biển hè",
      "Mọi người thích bơi lội và muốn có sức khoẻ tốt hơn mỗi ngày",
      "Khách hàng từ 18 đến 65 tuổi, thu nhập trung bình, sống ở thành phố lớn",
      "Những người đang tìm một lớp học bơi chất lượng với giá phải chăng",
    ],
    correctOption: 0,
    explanation:
      "Chân dung tốt nói ai là người trả tiền, hoàn cảnh của họ, và nỗi lo khiến họ hành động. \"Bố mẹ đi làm, con 5-8 tuổi, sợ con đuối nước khi đi biển hè\" cho AI cả ba: người đọc là bố mẹ chứ không phải đứa trẻ, thời điểm là trước hè, và lý do là nỗi sợ cụ thể. Các lựa chọn còn lại mô tả gần như bất kỳ ai, nên AI cũng sẽ viết cho bất kỳ ai.",
    diagram: [
      { label: "Ai trả tiền?", arrow: true },
      { label: "Hoàn cảnh của họ lúc này?", arrow: true },
      { label: "Nỗi lo khiến họ tìm tới bạn?", arrow: true },
      { label: "Dán cả ba vào mọi câu lệnh" },
    ],
    realWorldExample: {
      company: "Một shop đồ handmade",
      description:
        "Shop ban đầu mô tả khách là \"người yêu đồ thủ công\". Sau khi đọc lại tin nhắn khách hỏi, chủ shop nhận ra phần lớn là người đi tìm quà sinh nhật gấp cho đồng nghiệp. Bài đăng đổi sang \"quà tặng đồng nghiệp, giao trong ngày\" - và tin nhắn hỏi mua tăng rõ rệt.",
    },
    quiz: [
      {
        question: "Chân dung khách hàng tốt cần trả lời ba câu hỏi nào?",
        options: [
          "Ai trả tiền, hoàn cảnh của họ, nỗi lo khiến họ hành động",
          "Họ bao nhiêu tuổi, sống ở đâu, dùng điện thoại hãng nào",
          "Họ thích màu gì, nghe nhạc gì, theo dõi những người nổi tiếng nào",
          "Tên thật, số điện thoại và địa chỉ nhà của từng khách hàng",
        ],
        correct: 0,
        explanation:
          "Tuổi và nơi ở giúp một chút, nhưng không nói vì sao người ta mua. Nỗi lo và hoàn cảnh mới là thứ biến một bài đăng thành câu trả lời cho vấn đề của họ. Còn tên và số điện thoại từng người thì không phải chân dung - đó là dữ liệu cá nhân, và không được dán vào công cụ AI.",
      },
      {
        question: "Tìm hiểu nỗi lo thật của khách ở đâu là nhanh và rẻ nhất?",
        options: [
          "Đọc lại tin nhắn, bình luận và câu hỏi khách đã gửi",
          "Hỏi AI xem khách hàng của ngành bạn thường lo lắng về điều gì",
          "Thuê một công ty nghiên cứu thị trường làm khảo sát toàn quốc",
          "Tự đoán xem mình sẽ lo gì",
        ],
        correct: 0,
        explanation:
          "Khách đã nói nỗi lo của họ bằng chính lời của họ - trong tin nhắn hỏi hàng, bình luận, đánh giá. Đó là nguồn thật và miễn phí. AI chỉ đoán được nỗi lo của khách trung bình trong ngành, còn tự đoán thì thường ra nỗi lo của chính bạn chứ không phải của khách.",
      },
      {
        question: "Vì sao nên dùng lại đúng từ ngữ khách hay dùng trong bài đăng?",
        options: [
          "Vì khách nhận ra vấn đề của mình khi đọc đúng lời mình nói",
          "Vì dùng từ của khách giúp bài viết luôn đúng chính tả hơn",
          "Vì mạng xã hội ưu tiên hiện những bài có từ khoá khách hay tìm",
          "Vì như vậy AI không cần viết gì nữa, chỉ việc chép lại tin nhắn",
        ],
        correct: 0,
        explanation:
          "Khách viết \"bé nhà mình sợ nước\", còn người bán hay viết \"khắc phục tâm lý e ngại môi trường nước\". Câu đầu làm bố mẹ dừng lại vì nó giống hệt điều họ nghĩ. Từ khoá tìm kiếm có vai trò, nhưng lý do chính là cảm giác \"đúng là mình\" khi đọc.",
      },
      {
        question: "Một doanh nghiệp nhỏ nên có bao nhiêu chân dung khách hàng?",
        options: [
          "Một hoặc hai, cho nhóm khách mang lại nhiều đơn nhất",
          "Càng nhiều càng tốt, ít nhất mười chân dung để phủ mọi nhóm khách",
          "Không cần, AI tự biết khách từng ngành",
          "Đúng bằng số sản phẩm đang bán, mỗi sản phẩm một chân dung riêng",
        ],
        correct: 0,
        explanation:
          "Mười chân dung nghĩa là mười kiểu bài và không kiểu nào được làm kỹ. Với doanh nghiệp nhỏ, một hai nhóm khách thường mang lại phần lớn đơn hàng; tập trung vào họ trước rồi mở rộng sau. Và AI không tự biết khách của bạn - đó là lý do chân dung tồn tại.",
      },
      {
        question: "Khi dán chân dung khách vào câu lệnh, điều gì KHÔNG được đưa vào?",
        options: [
          "Tên, số điện thoại, địa chỉ của khách hàng cụ thể",
          "Độ tuổi và hoàn cảnh chung của nhóm khách hàng chính",
          "Những nỗi lo mà khách hay nhắc tới khi nhắn tin hỏi",
          "Những từ ngữ mà khách hay dùng để mô tả vấn đề của mình",
        ],
        correct: 0,
        explanation:
          "Chân dung mô tả một nhóm người, không phải một người cụ thể. Thông tin cá nhân của khách thật không bao giờ được dán vào công cụ AI - bạn không kiểm soát được nó đi đâu sau đó, và việc chia sẻ nó mà không có sự đồng ý có thể vi phạm quy định về dữ liệu cá nhân.",
      },
    ],
    keyTakeaways: [
      "Chân dung khách hàng trả lời: ai trả tiền, hoàn cảnh, nỗi lo.",
      "Nỗi lo thật nằm sẵn trong tin nhắn và bình luận của khách.",
      "Dùng đúng từ khách dùng để họ thấy \"đúng là mình\".",
      "Doanh nghiệp nhỏ: một hai chân dung là đủ để bắt đầu.",
      "Chân dung mô tả nhóm người, không bao giờ chứa thông tin cá nhân thật.",
    ],
    practicePrompt: {
      question: "Đâu là cách viết nỗi lo của khách tốt nhất cho chân dung?",
      options: [
        "\"Sợ mua quần áo online về không vừa, đổi trả lại mất công\"",
        "\"Khách hàng mong muốn trải nghiệm mua sắm thuận tiện và tốt\"",
        "\"Khách quan tâm tới chất lượng sản phẩm và dịch vụ hậu mãi đi kèm\"",
        "\"Người dùng có nhu cầu về thời trang phù hợp với xu hướng hiện đại\"",
      ],
      correct: 0,
      explanation:
        "Câu đầu tiên là một nỗi lo cụ thể, viết bằng lời của khách, và gợi ngay cách giải quyết: bảng size rõ ràng, đổi trả dễ. Ba câu còn lại đúng với mọi cửa hàng trên đời nên không giúp AI viết được gì khác đi.",
    },
    summary: {
      keyIdea: "Chân dung khách hàng là thứ AI cần mà không tự có được.",
      formula: "Ai trả tiền + hoàn cảnh lúc này + nỗi lo khiến họ hành động.",
      commonMistake: "Mô tả khách bằng tuổi và thu nhập mà bỏ qua nỗi lo thật của họ.",
      action: "Đọc lại mười tin nhắn khách gần nhất và ghi ra ba nỗi lo lặp lại nhiều nhất.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở mười tin nhắn hoặc bình luận khách gần nhất. Gạch chân mọi câu nói về nỗi lo hay vấn đề. Viết lại thành một chân dung ba câu, dùng đúng từ khách dùng.",
      secondary: "Lưu nó vào một tệp ghi chú. Từ giờ, câu lệnh marketing nào cũng bắt đầu bằng việc dán ba câu này vào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước kết luận: AI viết nhạt vì nó không biết khách của bạn là ai. Bài này là cách sửa - viết một chân dung khách hàng ngắn, đủ cụ thể để dán vào mọi câu lệnh.",
      },
      {
        type: "feynman",
        title: "Chân dung khách hàng đơn giản hơn bạn nghĩ",
        intro: "Hãy tưởng tượng bạn nhờ một người bạn mua quà giúp. Nói \"mua quà cho một người\" thì bạn ấy chịu. Nói \"mua quà cho mẹ mình, 55 tuổi, hay đau lưng\" thì bạn ấy biết ngay nên mua gì.",
        columns: ["Thành phần", "Khi nhờ mua quà", "Khi nhờ AI viết"],
        rows: [
          ["Ai", "\"Cho mẹ mình\"", "Ai là người đọc và trả tiền"],
          ["Hoàn cảnh", "\"55 tuổi, ở nhà nhiều\"", "Họ đang ở giai đoạn nào, thời điểm nào"],
          ["Nỗi lo", "\"Hay đau lưng\"", "Vấn đề khiến họ đi tìm giải pháp"],
        ],
        oneLiner: "Nói cho AI biết người đọc là ai, như khi nhờ bạn mua quà cho đúng người.",
      },
      { type: "heading", text: "Nỗi lo thật nằm ở đâu" },
      {
        type: "list",
        items: [
          "Tin nhắn khách hỏi trước khi mua - họ hỏi gì, lo gì.",
          "Bình luận và đánh giá - cả khen lẫn chê.",
          "Lý do khách huỷ đơn hoặc đổi trả.",
          "Câu hỏi bạn phải trả lời đi trả lời lại nhiều lần nhất.",
        ],
      },
      {
        type: "paragraph",
        text: "Những nguồn này miễn phí và nằm sẵn trong điện thoại của bạn. Chúng tốt hơn mọi khảo sát vì khách viết ra khi đang thật sự cần, bằng chính lời của họ.",
      },
      {
        type: "callout",
        label: "Không dán thông tin cá nhân",
        text: "Chân dung mô tả một nhóm người. Tên, số điện thoại, địa chỉ của khách thật không bao giờ được dán vào công cụ AI.",
      },
      {
        type: "closing",
        lines: [
          "Ba câu viết cẩn thận một lần, dùng lại cho mọi câu lệnh về sau.",
          "Bài sau: dùng chân dung đó để AI viết nội dung đúng giọng của bạn.",
        ],
      },
    ],
  },
  {
    id: 1772,
    slug: "viet-noi-dung-cung-ai-dung-giong",
    title: "Chặng 22, Bài 3: Viết nội dung cùng AI mà vẫn đúng giọng mình",
    subtitle: "Đưa cho AI một bài mẫu bạn thích - nó bắt chước giọng nhanh hơn bạn tưởng.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "✍️",
    track: "personal",
    whyItMatters:
      "Khách nhận ra giọng văn \"AI viết\" rất nhanh: câu nào cũng tròn trịa, từ nào cũng hoa mỹ. Một thương hiệu nhỏ sống nhờ cảm giác có người thật đứng sau. Biết cách giữ giọng của mình khi dùng AI là khác biệt giữa bài được đọc và bài bị lướt qua.",
    openingQuestion:
      "Cách nào giúp AI viết đúng giọng thân mật, hài hước của trang bạn nhanh nhất?",
    openingOptions: [
      "Dán hai ba bài cũ bạn thích nhất làm mẫu cho nó bắt chước",
      "Viết \"hãy viết thật thân mật và hài hước\" ở cuối câu lệnh",
      "Yêu cầu AI dùng thật nhiều biểu tượng cảm xúc trong từng câu viết ra",
      "Để AI tự chọn giọng văn phù hợp nhất với ngành của bạn",
    ],
    correctOption: 0,
    explanation:
      "\"Thân mật và hài hước\" có hàng nghìn cách hiểu, và AI sẽ chọn cách trung bình nhất. Một bài mẫu thì cho nó thấy chính xác: câu dài bao nhiêu, xưng hô thế nào, đùa kiểu gì. Bắt chước từ ví dụ là thứ mô hình ngôn ngữ làm rất tốt. Biểu tượng cảm xúc chỉ là trang trí bề mặt, còn để AI tự chọn thì nó sẽ chọn giọng quảng cáo chung chung.",
    diagram: [
      { label: "Chân dung khách hàng", arrow: true },
      { label: "Hai ba bài mẫu đúng giọng", arrow: true },
      { label: "Việc cần viết, dài bao nhiêu", arrow: true },
      { label: "Bạn đọc to và sửa những câu không giống mình" },
    ],
    realWorldExample: {
      company: "Một trang dạy nấu ăn",
      description:
        "Chủ trang hay viết kiểu kể chuyện, xưng \"mình\", có lỗi vụng về trong bếp. Khi nhờ AI mà không đưa mẫu, bài ra toàn \"công thức tuyệt hảo cho bữa ăn gia đình\". Khi dán ba bài cũ làm mẫu, AI viết lại đúng kiểu kể chuyện - chủ trang chỉ phải sửa vài câu.",
    },
    quiz: [
      {
        question: "Vì sao một bài mẫu hiệu quả hơn lời mô tả giọng văn?",
        options: [
          "Vì bài mẫu cho thấy chính xác, còn lời mô tả thì mơ hồ",
          "Vì AI không hiểu tính từ",
          "Vì bài mẫu làm câu lệnh dài hơn nên AI sẽ cố gắng viết kỹ hơn",
          "Vì AI chỉ được phép chép lại nguyên văn các bài có sẵn",
        ],
        correct: 0,
        explanation:
          "AI hiểu từ \"hài hước\", nhưng hài hước có quá nhiều kiểu và nó sẽ chọn kiểu phổ biến nhất. Bài mẫu thu hẹp lại đúng kiểu của bạn: độ dài câu, cách xưng hô, loại câu đùa. Độ dài câu lệnh tự nó không làm kết quả tốt hơn; thứ có ích là thông tin trong đó.",
      },
      {
        question: "Dấu hiệu nào cho thấy một bài đăng \"nghe như AI viết\"?",
        options: [
          "Câu nào cũng tròn trịa, nhiều từ hoa mỹ, không có chi tiết riêng",
          "Bài viết có đúng chính tả và không có lỗi ngữ pháp nào cả",
          "Bài viết ngắn dưới một trăm chữ và có kèm một hình ảnh minh hoạ",
          "Bài viết có nhắc tới tên sản phẩm và giá bán cụ thể của nó",
        ],
        correct: 0,
        explanation:
          "Đúng chính tả hay ngắn gọn không phải dấu hiệu gì cả - người viết giỏi cũng vậy. Dấu hiệu thật là sự trơn tru không có góc cạnh: tính từ khen ngợi chồng chất, không có một chi tiết nào chỉ bạn mới biết. Thêm một chi tiết thật là cách sửa nhanh nhất.",
      },
      {
        question: "Sau khi AI viết xong, bước kiểm tra giọng văn đơn giản nhất là gì?",
        options: [
          "Đọc to lên xem có giống mình nói không",
          "Nhờ một công cụ AI khác chấm điểm xem bài có hay không",
          "Đếm số từ để chắc chắn bài không quá dài hay quá ngắn",
          "Đăng thử rồi xoá nếu sau một giờ không có ai thích bài",
        ],
        correct: 0,
        explanation:
          "Tai bắt được câu \"không phải mình\" nhanh hơn mắt. Câu nào đọc to lên thấy ngượng miệng là câu cần sửa. Nhờ AI khác chấm thì nó chấm theo chuẩn trung bình - đúng thứ bạn đang muốn tránh. Đăng rồi xoá thì khách đã kịp đọc.",
      },
      {
        question: "Thứ gì chỉ bạn thêm được vào bài mà AI không thể tự viết?",
        options: [
          "Chi tiết thật: chuyện hôm nay ở tiệm, lời khách vừa nói",
          "Tiêu đề hấp dẫn có chứa từ khoá mà khách hay tìm kiếm trên mạng",
          "Lời kêu gọi mua hàng ở cuối bài",
          "Danh sách lợi ích của sản phẩm viết thành các gạch đầu dòng",
        ],
        correct: 0,
        explanation:
          "Tiêu đề, lời kêu gọi, danh sách lợi ích - AI viết được tất cả. Thứ nó không có là chuyện vừa xảy ra ở chỗ bạn: vị khách quen hôm nay, mẻ bánh bị cháy, câu khen của một bà cụ. Những chi tiết đó làm bài có người thật đứng sau, và không công cụ nào bịa được mà không thành nói dối.",
      },
      {
        question: "Nên nhờ AI viết bao nhiêu phiên bản cho một bài đăng quan trọng?",
        options: [
          "Ba đến năm bản, rồi chọn và ghép phần hay nhất",
          "Một bản, vì bản đầu luôn tốt nhất",
          "Năm mươi bản, rồi đăng hết để thử",
          "Không bản nào, bài quan trọng tự viết",
        ],
        correct: 0,
        explanation:
          "Viết nháp nhiều bản gần như miễn phí với AI, nên một bản là bỏ phí thế mạnh của nó. Nhưng năm mươi bản thì bạn không đọc kỹ nổi, và đăng hết làm khách thấy trang lộn xộn. Ba đến năm bản đủ để thấy các hướng khác nhau và ghép phần tốt của từng bản.",
      },
    ],
    keyTakeaways: [
      "Bài mẫu dạy AI giọng văn tốt hơn mọi lời mô tả.",
      "Giọng \"AI viết\" là trơn tru, hoa mỹ, không có chi tiết riêng.",
      "Đọc to để bắt những câu không giống mình.",
      "Chi tiết thật là thứ chỉ bạn thêm được.",
      "Nhờ ba đến năm bản nháp, rồi chọn và ghép.",
    ],
    practicePrompt: {
      question: "AI viết: \"Tiệm bánh mang đến trải nghiệm ẩm thực tuyệt vời.\" Sửa thế nào là tốt nhất?",
      options: [
        "\"Sáng nay mẻ bánh mì bơ tỏi hết lúc 8 giờ - mai mình làm gấp đôi\"",
        "\"Tiệm bánh mang đến trải nghiệm ẩm thực vô cùng tuyệt vời và khó quên\"",
        "\"Tiệm bánh số một thành phố với hàng nghìn khách hàng hài lòng mỗi ngày\"",
        "\"Trải nghiệm ẩm thực tuyệt vời đang chờ bạn tại tiệm bánh của chúng tôi\"",
      ],
      correct: 0,
      explanation:
        "Câu đầu thay lời khen chung chung bằng một chi tiết thật, có thời gian, có món cụ thể, có giọng người nói. Hai câu giữa chỉ thêm tính từ hoặc thêm một con số bịa; câu cuối đảo thứ tự cho có vẻ khác mà vẫn nói đúng điều trống rỗng cũ.",
    },
    summary: {
      keyIdea: "AI bắt chước giọng văn từ ví dụ; chi tiết thật thì chỉ bạn có.",
      formula: "Chân dung khách + bài mẫu + việc cần viết → nhiều bản nháp → đọc to và sửa.",
      commonMistake: "Tả giọng văn bằng tính từ thay vì đưa bài mẫu, rồi đăng bản đầu tiên.",
      action: "Chọn ba bài cũ bạn thích nhất và lưu thành \"bộ mẫu giọng văn\".",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn ba bài bạn từng viết và thích nhất. Dán chúng cùng chân dung khách vào câu lệnh, nhờ AI viết bài mới theo đúng giọng đó. Đọc to và sửa mọi câu nghe không giống bạn.",
      secondary: "Thêm đúng một chi tiết thật của hôm nay trước khi đăng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có chân dung khách hàng. Giờ là lúc để AI viết - nhưng viết theo giọng của bạn, không phải giọng quảng cáo chung chung mà khách đã quen lướt qua.",
      },
      {
        type: "feynman",
        title: "Giữ giọng văn khi dùng AI đơn giản hơn bạn nghĩ",
        intro: "Nhờ AI viết đúng giọng giống như dạy một người bạn nhại giọng bạn: nói \"nói giống mình đi\" thì khó, cho nghe vài đoạn ghi âm thì dễ.",
        columns: ["Thành phần", "Khi dạy bạn nhại giọng", "Khi nhờ AI viết"],
        rows: [
          ["Ví dụ", "Cho nghe vài đoạn ghi âm", "Dán hai ba bài cũ làm mẫu"],
          ["Thử nhiều lần", "Nhại vài lần, chọn lần giống nhất", "Nhờ ba đến năm bản nháp"],
          ["Nghe lại", "Nghe xem có giống không", "Đọc to, sửa câu không giống mình"],
        ],
        oneLiner: "Đừng tả giọng văn của bạn - hãy cho AI xem vài bài mẫu.",
      },
      { type: "heading", text: "Câu lệnh bốn phần" },
      {
        type: "list",
        items: [
          "Chân dung khách hàng (bài trước).",
          "Hai ba bài mẫu đúng giọng của bạn.",
          "Việc cần viết: bài gì, về cái gì, dài khoảng bao nhiêu.",
          "Số bản nháp: ba đến năm bản để chọn.",
        ],
      },
      {
        type: "paragraph",
        text: "Không cần mẹo phức tạp nào. Bốn phần này cho AI đủ thông tin để viết đúng người đọc, đúng giọng, đúng việc - phần còn lại là bạn chọn và sửa.",
      },
      {
        type: "callout",
        label: "Một chi tiết thật",
        text: "Trước khi đăng, thêm đúng một chi tiết chỉ bạn biết: chuyện hôm nay ở tiệm, lời một vị khách. Nó biến bài của AI thành bài của bạn.",
      },
      {
        type: "closing",
        lines: [
          "AI viết nháp, bạn đặt dấu vân tay.",
          "Bài sau: làm sao biết bài nào thật sự hiệu quả - bằng cách đếm, không bằng cảm giác.",
        ],
      },
    ],
  },
  {
    id: 1773,
    slug: "do-hieu-qua-noi-dung-dung-cach",
    title: "Chặng 22, Bài 4: Đo xem bài nào hiệu quả - đếm đúng thứ cần đếm",
    subtitle: "Lượt thích làm vui, đơn hàng mới trả tiền điện.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "AI làm việc viết nội dung rẻ đi rất nhiều, nên bạn sẽ đăng nhiều hơn trước. Không đo thì nhiều hơn chỉ là ồn hơn. Biết đếm đúng con số giúp bạn làm nhiều thứ có hiệu quả, bỏ đi thứ không có - thay vì cứ đăng theo cảm giác.",
    openingQuestion:
      "Bài A được 500 lượt thích, 2 đơn hàng. Bài B được 40 lượt thích, 15 đơn hàng. Bạn nên viết thêm bài giống bài nào?",
    openingOptions: [
      "Bài B, vì mục tiêu của bạn là đơn hàng chứ không phải lượt thích",
      "Bài A, vì nhiều lượt thích nghĩa là nhiều người biết tới trang hơn",
      "Cả hai như nhau, vì lượt thích và đơn hàng đều quan trọng ngang nhau",
      "Không bài nào, vì 15 đơn là quá ít để kết luận bất cứ điều gì chắc chắn",
    ],
    correctOption: 0,
    explanation:
      "Lượt thích đo sự chú ý, đơn hàng đo việc bán được. Nếu bạn đang bán hàng thì bài B làm đúng việc gấp bảy lần bài A dù ít người thích hơn. Lượt thích có giá trị - nó giúp nhiều người thấy trang hơn - nhưng nó không trả được tiền nguyên liệu. Mười lăm đơn chưa phải bằng chứng tuyệt đối, nhưng đủ để thử viết thêm vài bài cùng kiểu rồi xem tiếp.",
    diagram: [
      { label: "Chọn MỘT con số đúng mục tiêu", arrow: true },
      { label: "Đăng hai phiên bản khác nhau một điểm", arrow: true },
      { label: "Đếm sau cùng một khoảng thời gian", arrow: true },
      { label: "Giữ bản thắng, thử điểm tiếp theo" },
    ],
    realWorldExample: {
      company: "Một shop mỹ phẩm online",
      description:
        "Shop từng đo thành công bằng lượt thích và đăng toàn ảnh đẹp. Khi bắt đầu đếm tin nhắn hỏi mua theo từng bài, họ thấy những bài quay cảnh dùng thử thật, ít lượt thích hơn, lại mang về nhiều tin nhắn nhất. Họ đổi hẳn cách làm nội dung.",
    },
    quiz: [
      {
        question: "Nếu mục tiêu là bán hàng, con số nào đáng theo dõi nhất?",
        options: [
          "Số tin nhắn hỏi mua hoặc đơn hàng từ bài đó",
          "Số lượt thích và lượt chia sẻ mà bài đó nhận được",
          "Số người theo dõi trang tăng thêm trong tuần đăng bài",
          "Số lượt hiển thị bài viết",
        ],
        correct: 0,
        explanation:
          "Lượt thích, người theo dõi và lượt hiển thị đều là con số của sự chú ý. Chúng hữu ích để hiểu vì sao một bài bán được hay không, nhưng không phải thứ bạn đang đi tìm. Chọn con số gần nhất với tiền vào túi, rồi dùng các con số kia để giải thích nó.",
      },
      {
        question: "Muốn biết tiêu đề nào tốt hơn, cách thử đúng là gì?",
        options: [
          "Hai bài giống hệt nhau, chỉ khác tiêu đề",
          "Hai bài khác cả tiêu đề, ảnh và giờ đăng để thử được nhiều thứ cùng lúc",
          "Đăng một tiêu đề hôm nay, tiêu đề kia vào dịp lễ tuần sau",
          "Hỏi AI xem tiêu đề nào hay hơn rồi chỉ đăng tiêu đề đó thôi",
        ],
        correct: 0,
        explanation:
          "Đổi nhiều thứ cùng lúc thì bài thắng không cho bạn biết thắng nhờ cái gì. Đăng hai thời điểm khác nhau thì dịp lễ làm lệch kết quả. Chỉ khác đúng một điểm mới trả lời được câu hỏi về điểm đó. AI đoán được tiêu đề nào nghe hay, nhưng không đoán được khách thật của bạn sẽ bấm vào đâu.",
      },
      {
        question: "Bài A có 3 đơn, bài B có 4 đơn. Kết luận nào hợp lý?",
        options: [
          "Chưa đủ để nói bài nào tốt hơn, cần thêm dữ liệu",
          "Bài B tốt hơn hẳn, vì nó bán được nhiều hơn bài A một phần ba",
          "Bài A tốt hơn vì khách kỹ hơn",
          "Bỏ cả hai kiểu bài, vì con số đơn hàng quá thấp so với kỳ vọng",
        ],
        correct: 0,
        explanation:
          "Chênh một đơn với con số nhỏ như vậy rất dễ là may rủi: một khách tình cờ lướt qua đúng lúc là đủ lật kết quả. Cần thêm vài lần thử, hoặc chờ số đơn lớn hơn, trước khi đổi cả cách làm. Chênh lệch càng nhỏ thì càng cần nhiều dữ liệu mới tin được.",
      },
      {
        question: "Vì sao nên chọn MỘT con số chính thay vì theo dõi mười con số?",
        options: [
          "Vì nhiều con số thì luôn có con số tăng, dễ tự lừa mình",
          "Vì các nền tảng mạng xã hội chỉ cho xem một con số duy nhất",
          "Vì nhiều con số làm tài khoản bị hạn chế",
          "Vì chín con số còn lại lúc nào cũng sai và không có giá trị gì",
        ],
        correct: 0,
        explanation:
          "Với mười con số, tuần nào cũng có vài con số đẹp lên, và bạn sẽ luôn tìm được lý do để thấy mình đang làm tốt. Một con số chính gắn với mục tiêu buộc bạn nhìn thẳng vào kết quả. Các con số khác vẫn đúng và vẫn hữu ích - để giải thích, không để chấm điểm.",
      },
      {
        question: "AI giúp gì tốt nhất ở khâu đo lường?",
        options: [
          "Tóm tắt bình luận của khách thành vài ý chính lặp lại",
          "Tự tạo số liệu khi chưa có",
          "Đoán trước bài nào bán chạy",
          "Quyết định thay bạn nên làm gì",
        ],
        correct: 0,
        explanation:
          "Đọc trăm bình luận để tìm điểm chung rất tốn thời gian - việc đó AI làm nhanh và khá tốt. Nhưng nó không tạo ra được số liệu thật, không biết trước khách của bạn sẽ phản ứng thế nào, và quyết định dựa trên số liệu vẫn là việc của người chịu trách nhiệm về cửa hàng.",
      },
    ],
    keyTakeaways: [
      "Lượt thích đo sự chú ý; đơn hàng đo việc bán được.",
      "Chọn một con số chính gắn với mục tiêu.",
      "Thử hai phiên bản chỉ khác nhau đúng một điểm.",
      "Chênh lệch nhỏ trên số nhỏ thường chỉ là may rủi.",
      "AI giỏi tóm tắt phản hồi, không tạo ra được số liệu thật.",
    ],
    practicePrompt: {
      question: "Bạn muốn biết ảnh chụp sản phẩm hay ảnh khách dùng thử bán tốt hơn. Làm thế nào?",
      options: [
        "Hai bài cùng chữ, cùng giờ, chỉ khác ảnh; đếm tin nhắn hỏi mua",
        "Đăng ảnh sản phẩm tuần này, tuần sau đăng ảnh khách với nội dung mới",
        "Đăng cả hai ảnh vào cùng một bài rồi xem bài đó có bao nhiêu lượt thích",
        "Hỏi ý kiến bạn bè xem họ thích ảnh nào hơn rồi đăng ảnh đó",
      ],
      correct: 0,
      explanation:
        "Chỉ khác đúng ảnh thì kết quả nói về ảnh. Đổi cả nội dung lẫn tuần đăng thì không biết cái gì tạo ra khác biệt. Gộp hai ảnh vào một bài thì không tách được, và bạn bè không phải khách của bạn - cũng không phải người trả tiền.",
    },
    summary: {
      keyIdea: "Đo một con số gắn với mục tiêu, và thử từng thay đổi một.",
      formula: "Một con số chính + hai phiên bản khác đúng một điểm + cùng khoảng thời gian.",
      commonMistake: "Chấm bài bằng lượt thích khi mục tiêu thật là bán hàng.",
      action: "Viết ra con số chính của bạn và đếm nó cho năm bài đăng gần nhất.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Viết ra mục tiêu của bạn trong một câu, rồi chọn một con số gắn với nó. Lật lại năm bài gần nhất và ghi con số đó cho từng bài vào một bảng.",
      secondary: "Bài có con số cao nhất có điểm gì khác? Đó là giả thuyết cho lần thử tiếp theo.",
    },
    sections: [
      {
        type: "lead",
        text: "AI làm việc viết rẻ đi, nên bạn sẽ đăng nhiều hơn. Bài này là thứ giữ cho \"nhiều hơn\" không thành \"ồn hơn\": đếm đúng con số, và thử từng thay đổi một.",
      },
      {
        type: "feynman",
        title: "Đo hiệu quả đơn giản hơn bạn nghĩ",
        intro: "Quán đông hay vắng, bạn nhìn là biết. Trên mạng thì không - bạn phải đếm. Và đếm đúng thứ quan trọng hơn đếm thật nhiều thứ.",
        columns: ["Câu hỏi", "Ở quán cà phê", "Trên mạng"],
        rows: [
          ["Đếm gì?", "Số ly bán được, không phải số người nhìn vào", "Đơn hàng, không phải lượt thích"],
          ["Thử thế nào?", "Đổi đúng biển hiệu, giữ nguyên thực đơn", "Hai bài chỉ khác đúng một điểm"],
          ["Tin khi nào?", "Đông một ngày chưa nói lên gì", "Chênh lệch nhỏ trên số nhỏ là may rủi"],
        ],
        oneLiner: "Đếm thứ trả tiền điện cho bạn, và mỗi lần chỉ thử một thay đổi.",
      },
      { type: "heading", text: "Con số chú ý và con số kết quả" },
      {
        type: "comparison",
        left: {
          label: "Con số chú ý",
          text: "Lượt hiển thị, lượt thích, lượt chia sẻ, người theo dõi. Cho biết bao nhiêu người thấy bài. Hữu ích để giải thích, dễ gây ảo tưởng nếu dùng để chấm điểm.",
        },
        right: {
          label: "Con số kết quả",
          text: "Tin nhắn hỏi mua, đơn hàng, người đăng ký, khách quay lại. Gần với mục tiêu thật. Chọn một con số trong nhóm này làm thước đo chính.",
        },
      },
      {
        type: "paragraph",
        text: "Phép thử đơn giản nhất: hai bài giống hệt nhau, chỉ khác đúng một điểm - tiêu đề, hoặc ảnh, hoặc lời kêu gọi. Đăng cùng khung giờ, đếm sau cùng một khoảng thời gian. Bản thắng giữ lại, rồi thử điểm tiếp theo.",
      },
      {
        type: "callout",
        label: "Cẩn thận với số nhỏ",
        text: "Ba đơn so với bốn đơn chưa nói lên gì. Chênh lệch càng nhỏ thì càng cần thử thêm vài lần mới tin được.",
      },
      {
        type: "closing",
        lines: [
          "AI làm bạn viết nhanh hơn; con số làm bạn viết đúng hơn.",
          "Bài sau: những ranh giới pháp lý và đạo đức khi dùng AI để quảng cáo.",
        ],
      },
    ],
  },
  {
    id: 1774,
    slug: "ranh-gioi-khi-quang-cao-bang-ai",
    title: "Chặng 22, Bài 5: Ranh giới khi quảng cáo bằng AI",
    subtitle: "Nói sai về sản phẩm thì AI viết hay bạn viết cũng là bạn chịu.",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "AI viết lời quảng cáo rất tự tin, kể cả khi nó hứa những điều sản phẩm không làm được. Người chịu trách nhiệm trước khách và trước pháp luật là người đăng, không phải công cụ. Biết trước những ranh giới này rẻ hơn nhiều so với một lần bị khách tố hay bị gỡ trang.",
    openingQuestion:
      "AI viết cho sản phẩm trà thảo mộc của bạn: \"Giúp giảm 5kg trong một tuần, chữa mất ngủ.\" Vấn đề lớn nhất là gì?",
    openingOptions: [
      "Đó là lời hứa về sức khoẻ mà bạn không chứng minh được",
      "Câu văn quá ngắn nên chưa đủ sức thuyết phục người mua",
      "Con số 5kg quá thấp, nên viết 10kg cho hấp dẫn hơn nhiều",
      "AI không được phép viết về sản phẩm ăn uống theo luật",
    ],
    correctOption: 0,
    explanation:
      "Lời hứa giảm cân và chữa bệnh là loại khẳng định mà quảng cáo thực phẩm không được đưa ra nếu không có căn cứ - và AI viết nó chỉ vì đó là kiểu câu hay xuất hiện trong quảng cáo trà giảm cân nó đã đọc. Đăng lên thì bạn là người nói điều đó với khách, không phải AI. Vấn đề không phải ở câu văn hay con số, mà ở chỗ bạn đang hứa một điều không chứng minh được.",
    diagram: [
      { label: "AI viết nháp lời quảng cáo", arrow: true },
      { label: "Soát: lời hứa nào không chứng minh được?", arrow: true },
      { label: "Soát: có dùng dữ liệu hay hình ảnh của ai không?", arrow: true },
      { label: "Chỉ đăng điều bạn dám đứng tên" },
    ],
    realWorldExample: {
      company: "Một shop thực phẩm chức năng",
      description:
        "Shop dùng AI viết hàng loạt bài quảng cáo và đăng thẳng không đọc lại. Một bài có câu \"thay thế thuốc điều trị\". Khách phản ánh, bài bị nền tảng gỡ và trang bị hạn chế quảng cáo nhiều tuần - mất nhiều hơn toàn bộ thời gian AI đã tiết kiệm.",
    },
    quiz: [
      {
        question: "Ai chịu trách nhiệm về một lời quảng cáo sai do AI viết?",
        options: [
          "Người hoặc doanh nghiệp đăng lời quảng cáo đó",
          "Công ty làm ra công cụ AI đã viết câu quảng cáo sai",
          "Nền tảng mạng xã hội vì đã cho phép bài đó hiện lên",
          "Không ai, vì máy viết",
        ],
        correct: 0,
        explanation:
          "Công cụ chỉ đưa ra bản nháp; quyết định đăng là của bạn. Với khách hàng và với quy định về quảng cáo, người nói là người đăng. \"AI viết đấy\" không phải lời bào chữa - nó chỉ cho thấy bài đã được đăng mà không ai đọc lại.",
      },
      {
        question: "Loại lời hứa nào cần soát kỹ nhất trong bản nháp của AI?",
        options: [
          "Hứa về sức khoẻ, kết quả chắc chắn, hoặc so sánh \"số một\"",
          "Mô tả màu sắc và kích thước sản phẩm cho khách dễ hình dung",
          "Lời chào hỏi và cảm ơn khách ở đầu hoặc cuối bài đăng",
          "Thông tin giờ mở cửa, địa chỉ cửa hàng và cách đặt hàng",
        ],
        correct: 0,
        explanation:
          "Chữa bệnh, giảm cân, \"cam kết hiệu quả 100%\", \"số một thị trường\" - đây là những khẳng định cần bằng chứng, và là thứ AI hay tự thêm vào vì chúng rất phổ biến trong quảng cáo nó đã đọc. Màu sắc, giờ mở cửa cũng cần đúng, nhưng sai ở đó thì dễ sửa và ít hậu quả hơn nhiều.",
      },
      {
        question: "Dùng AI tạo ảnh một người nổi tiếng cầm sản phẩm của bạn thì sao?",
        options: [
          "Không được, vì dùng hình ảnh người khác khi chưa đồng ý",
          "Được, vì ảnh do AI tạo ra chứ không phải ảnh chụp thật",
          "Được, miễn là ghi chú nhỏ ở cuối rằng ảnh do AI tạo ra",
          "Được, nếu người nổi tiếng đó chưa từng quảng cáo cho ai",
        ],
        correct: 0,
        explanation:
          "Ảnh do AI tạo vẫn là dùng hình ảnh của một người thật để bán hàng, và khiến khách tin rằng người đó giới thiệu sản phẩm của bạn. Một dòng ghi chú nhỏ không sửa được ấn tượng sai đó. Muốn dùng hình ảnh ai thì cần sự đồng ý của chính người đó.",
      },
      {
        question: "Có nên dùng AI viết đánh giá của khách hàng để đăng lên trang không?",
        options: [
          "Không, vì đánh giá bịa là lừa khách hàng",
          "Có, nếu đánh giá viết đúng những gì sản phẩm làm được",
          "Có, vì đối thủ cạnh tranh cũng đang làm y như vậy",
          "Có, nếu dùng tên giả",
        ],
        correct: 0,
        explanation:
          "Khách đọc đánh giá vì tin đó là trải nghiệm của người thật. Một đánh giá bịa, dù nội dung đúng, vẫn là giả vờ có người đã mua và hài lòng. Việc AI làm được ở đây là giúp bạn xin đánh giá thật: viết tin nhắn nhờ khách cũ để lại vài dòng.",
      },
      {
        question: "Câu lệnh nào giúp AI tự tránh lời hứa quá đà ngay từ bản nháp?",
        options: [
          "\"Không hứa kết quả sức khoẻ, không dùng số liệu mà tôi không đưa\"",
          "\"Hãy viết thật thuyết phục để khách mua ngay trong hôm nay\"",
          "\"Viết giống các bài quảng cáo bán chạy nhất trong ngành của tôi\"",
          "\"Viết thật ngắn gọn, không quá năm mươi chữ cho mỗi bài đăng\"",
        ],
        correct: 0,
        explanation:
          "Nói rõ giới hạn ngay trong câu lệnh làm bản nháp sạch hơn nhiều. \"Thật thuyết phục\" và \"giống bài bán chạy\" thì làm ngược lại: kéo AI về đúng những lời hứa quá đà phổ biến trong ngành. Độ ngắn không liên quan - một câu ngắn vẫn có thể hứa sai.",
      },
    ],
    keyTakeaways: [
      "Người đăng chịu trách nhiệm, không phải công cụ AI.",
      "Soát kỹ lời hứa về sức khoẻ, kết quả chắc chắn, \"số một\".",
      "Không dùng hình ảnh người thật khi chưa có sự đồng ý.",
      "Không dùng AI viết đánh giá giả của khách hàng.",
      "Ghi rõ giới hạn ngay trong câu lệnh để bản nháp sạch từ đầu.",
    ],
    practicePrompt: {
      question: "Trong bản nháp AI viết cho kem chống nắng, câu nào cần sửa trước khi đăng?",
      options: [
        "\"Bảo vệ da tuyệt đối 100%, không bao giờ bị cháy nắng\"",
        "\"Chỉ số chống nắng SPF 50, thoa lại sau khi bơi hoặc ra mồ hôi\"",
        "\"Kết cấu mỏng nhẹ, thấm nhanh, không để lại vệt trắng trên da\"",
        "\"Tuýp 50ml, dùng được khoảng một tháng nếu thoa mỗi sáng\"",
      ],
      correct: 0,
      explanation:
        "\"Tuyệt đối 100%\" và \"không bao giờ\" là lời hứa không sản phẩm chống nắng nào chứng minh được, và dễ khiến khách chủ quan. Ba câu còn lại mô tả thông số và cách dùng - vẫn cần kiểm lại cho đúng với sản phẩm thật, nhưng không phải lời hứa quá đà.",
    },
    summary: {
      keyIdea: "AI viết nháp, bạn chịu trách nhiệm về từng lời hứa được đăng.",
      formula: "Bản nháp → soát lời hứa → soát hình ảnh và dữ liệu → chỉ đăng điều dám đứng tên.",
      commonMistake: "Đăng thẳng bản nháp của AI vì nghĩ máy viết thì không phải lỗi của mình.",
      action: "Thêm câu \"không hứa kết quả, không dùng số liệu tôi không đưa\" vào mẫu câu lệnh của bạn.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lật lại năm bài đăng gần nhất. Gạch chân mọi lời hứa về kết quả và mọi con số. Với từng cái, hỏi: mình có bằng chứng không?",
      secondary: "Cái nào không có bằng chứng thì sửa thành mô tả điều sản phẩm thật sự làm.",
    },
    sections: [
      {
        type: "lead",
        text: "AI viết lời quảng cáo rất tự tin. Bài này về những chỗ sự tự tin đó có thể kéo bạn vào rắc rối - và cách soát nhanh trước khi đăng.",
      },
      {
        type: "feynman",
        title: "Quảng cáo đúng mực đơn giản hơn bạn nghĩ",
        intro: "Nhờ AI viết quảng cáo giống nhờ một người bán hàng mới rất nhiệt tình: họ sẵn sàng hứa mọi thứ để chốt đơn. Là chủ tiệm, bạn phải dặn trước điều gì không được hứa.",
        columns: ["Thành phần", "Với người bán hàng mới", "Với AI"],
        rows: [
          ["Hứa quá đà", "\"Dùng là khỏi, chị yên tâm!\"", "\"Cam kết hiệu quả 100%\""],
          ["Mượn danh", "\"Ca sĩ X cũng dùng loại này\"", "Ảnh AI tạo người nổi tiếng cầm sản phẩm"],
          ["Khen giả", "Nhờ người quen vào khen", "Đánh giá khách hàng do AI viết"],
          ["Dặn trước", "Quy định rõ điều không được nói", "Ghi giới hạn ngay trong câu lệnh"],
        ],
        oneLiner: "AI là người bán hàng nhiệt tình quá mức - bạn là chủ tiệm chịu trách nhiệm cho mọi lời nó hứa.",
      },
      { type: "heading", text: "Ba thứ soát trước khi đăng" },
      {
        type: "list",
        items: [
          "Lời hứa: sức khoẻ, kết quả chắc chắn, \"số một\", \"tuyệt đối\".",
          "Con số: mọi con số phải là số thật bạn đưa cho AI.",
          "Người thật: hình ảnh, tên, lời chứng thực của ai đó - có đồng ý chưa?",
        ],
      },
      {
        type: "paragraph",
        text: "Soát ba thứ này mất hai phút cho mỗi bài. Một lần bị khách tố quảng cáo sai hay bị nền tảng hạn chế trang thì mất nhiều tuần, nhiều hơn toàn bộ thời gian AI đã tiết kiệm cho bạn.",
      },
      {
        type: "callout",
        label: "Không dán dữ liệu khách",
        text: "Danh sách khách hàng, số điện thoại, lịch sử mua hàng của từng người không được dán vào công cụ AI để \"viết tin nhắn cá nhân hoá\".",
      },
      {
        type: "closing",
        lines: [
          "Lời quảng cáo đúng mực không kém thuyết phục - nó được khách tin lâu hơn.",
          "Bài cuối: gộp mọi thứ thành một quy trình làm nội dung hằng tuần.",
        ],
      },
    ],
  },
  {
    id: 1775,
    slug: "quy-trinh-noi-dung-hang-tuan-voi-ai",
    title: "Chặng 22, Bài 6: Tổng kết - quy trình nội dung hằng tuần với AI",
    subtitle: "Một buổi mỗi tuần, lặp lại được, thay vì mỗi ngày nghĩ lại từ đầu.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🗓️",
    track: "personal",
    whyItMatters:
      "Người làm marketing một mình thường bỏ cuộc không phải vì thiếu ý tưởng mà vì mỗi ngày phải nghĩ lại từ đầu. Một quy trình hằng tuần có AI hỗ trợ biến việc làm nội dung thành thói quen chạy đều, đủ nhẹ để duy trì cả năm.",
    openingQuestion:
      "Cách làm nội dung nào dễ duy trì nhất cho người bán hàng một mình?",
    openingOptions: [
      "Một buổi cố định mỗi tuần: xem số liệu, lên chủ đề, AI viết nháp",
      "Mỗi sáng nghĩ xem hôm nay đăng gì rồi nhờ AI viết ngay lúc đó",
      "Nhờ AI viết sẵn nội dung cho cả năm trong một lần rồi hẹn giờ đăng",
      "Chỉ đăng khi có cảm hứng, vì bài viết lúc có cảm hứng luôn hay hơn",
    ],
    correctOption: 0,
    explanation:
      "Nghĩ mỗi sáng thì ngày bận là ngày không đăng, và mỗi lần đều tốn công khởi động. Viết sẵn cả năm thì nội dung không học được gì từ số liệu, và mùa, giá, sản phẩm đều đổi. Chờ cảm hứng thì không đều. Một buổi cố định mỗi tuần vừa đủ đều để thành thói quen, vừa đủ gần để lần sau học được từ lần trước.",
    diagram: [
      { label: "Xem số liệu tuần trước", arrow: true },
      { label: "Chọn 3-5 chủ đề cho tuần này", arrow: true },
      { label: "AI viết nháp, bạn sửa và soát", arrow: true },
      { label: "Hẹn giờ đăng, ghi lại để tuần sau so" },
    ],
    realWorldExample: {
      company: "Một người dạy tiếng Anh online",
      description:
        "Trước đây cô đăng bài thất thường, tuần nhiều tuần không. Sau khi dành riêng tối Chủ nhật một tiếng - xem bài nào mang học viên về, chọn năm chủ đề, nhờ AI nháp rồi tự sửa - cô đăng đều năm bài mỗi tuần suốt nhiều tháng mà không thấy quá tải.",
    },
    quiz: [
      {
        question: "Bước đầu tiên của buổi làm nội dung hằng tuần nên là gì?",
        options: [
          "Xem số liệu tuần trước: bài nào mang về kết quả",
          "Nhờ AI gợi ý thật nhiều ý tưởng mới chưa từng làm bao giờ",
          "Xem đối thủ tuần này đăng gì để làm theo cho kịp xu hướng",
          "Viết ngay bài đầu tiên",
        ],
        correct: 0,
        explanation:
          "Bắt đầu từ số liệu thì mỗi tuần học được từ tuần trước: làm thêm thứ đã hiệu quả, bớt thứ không. Bắt đầu từ ý tưởng mới hay từ đối thủ thì mỗi tuần lại là một lần đoán mới. Ý tưởng và đối thủ vẫn có ích - nhưng sau khi bạn biết điều gì đang hiệu quả với khách của chính mình.",
      },
      {
        question: "Vì sao không nên nhờ AI viết sẵn nội dung cho cả năm?",
        options: [
          "Vì nội dung đó không học được gì từ phản ứng của khách",
          "Vì AI không đủ khả năng viết nhiều bài trong một lần yêu cầu",
          "Vì không hẹn giờ được quá một tháng",
          "Vì bài viết sẵn sẽ tự hết hạn và biến mất sau vài tuần đăng",
        ],
        correct: 0,
        explanation:
          "Giá trị của làm hằng tuần là vòng phản hồi: tuần này đo, tuần sau sửa. Viết sẵn cả năm là khoá cứng mọi bài vào hiểu biết của ngày đầu tiên, trong khi mùa vụ, giá cả và chính khách hàng đều thay đổi. AI viết được nhiều bài một lúc - vấn đề không nằm ở đó.",
      },
      {
        question: "Thứ nào nên lưu lại để dùng mỗi tuần mà không phải viết lại?",
        options: [
          "Chân dung khách, bộ bài mẫu giọng văn, danh sách điều không được hứa",
          "Toàn bộ các bài đã đăng từ trước tới nay của trang trong một tệp",
          "Mật khẩu tài khoản mạng xã hội để dán vào công cụ AI cho tiện",
          "Danh sách số điện thoại khách hàng để AI viết tin nhắn cho từng người",
        ],
        correct: 0,
        explanation:
          "Ba thứ đó là \"bộ khung câu lệnh\" từ các bài trước - dán vào là AI có đủ bối cảnh ngay. Lưu toàn bộ bài cũ thì quá nhiều để dùng. Còn mật khẩu và dữ liệu cá nhân của khách tuyệt đối không được đưa vào công cụ AI.",
      },
      {
        question: "Một tuần bạn quá bận, không làm được buổi nội dung. Nên làm gì?",
        options: [
          "Đăng ít hơn tuần đó và quay lại buổi cố định tuần sau",
          "Bỏ hẳn quy trình, vì đã không duy trì được thì không hợp với mình",
          "Nhờ AI viết và đăng thẳng mọi bài mà không cần đọc lại",
          "Đăng bù gấp đôi vào tuần sau để giữ đúng tổng số bài",
        ],
        correct: 0,
        explanation:
          "Quy trình tốt chịu được một tuần hỏng. Bỏ hẳn vì một lần lỡ là biến một sự cố thành thất bại. Đăng không đọc lại là bỏ qua đúng bước soát lời hứa ở bài trước. Đăng bù gấp đôi làm tuần sau nặng hơn và dễ lỡ tiếp - quay lại nhịp bình thường là đủ.",
      },
      {
        question: "Sau vài tháng, dấu hiệu nào cho thấy quy trình đang hoạt động tốt?",
        options: [
          "Con số chính tăng dần và bạn vẫn duy trì được đều đặn",
          "Số bài đăng mỗi tuần tăng lên gấp đôi so với lúc bắt đầu",
          "AI viết bài hay tới mức bạn không cần sửa câu nào nữa",
          "Lượt thích mỗi bài tăng đều bất kể có bán được hàng hay không",
        ],
        correct: 0,
        explanation:
          "Quy trình tồn tại để phục vụ mục tiêu, và mục tiêu nằm ở con số chính bạn chọn ở bài 4. Đăng nhiều hơn hay nhiều lượt thích hơn không nói gì nếu con số đó đứng yên. Và nếu bạn không còn sửa câu nào, rất có thể bạn đã ngừng đọc kỹ - chứ chưa chắc AI đã viết tốt hơn.",
      },
    ],
    keyTakeaways: [
      "Một buổi cố định mỗi tuần dễ duy trì hơn nghĩ mỗi ngày.",
      "Bắt đầu buổi làm việc từ số liệu tuần trước.",
      "Lưu bộ khung: chân dung khách, bài mẫu, điều không được hứa.",
      "Lỡ một tuần thì quay lại nhịp cũ, không bỏ và không bù gấp đôi.",
      "Đánh giá quy trình bằng con số chính, không bằng số bài đăng.",
    ],
    practicePrompt: {
      question: "Buổi nội dung hằng tuần của bạn nên sắp theo thứ tự nào?",
      options: [
        "Xem số liệu → chọn chủ đề → AI nháp → sửa và soát → hẹn giờ",
        "AI nháp → hẹn giờ → xem số liệu → chọn chủ đề cho tuần sau",
        "Chọn chủ đề → hẹn giờ → AI nháp → xem số liệu → sửa lại bài đã đăng",
        "Sửa và soát → AI nháp → chọn chủ đề → xem số liệu → hẹn giờ đăng",
      ],
      correct: 0,
      explanation:
        "Số liệu đứng đầu để chủ đề tuần này học được từ tuần trước. Sửa và soát đứng sau bản nháp và trước khi hẹn giờ, để không bài nào ra ngoài mà chưa qua tay bạn. Các thứ tự khác hoặc đăng trước khi soát, hoặc chọn chủ đề mà không nhìn kết quả.",
    },
    summary: {
      keyIdea: "Một buổi mỗi tuần, bắt đầu từ số liệu, với bộ khung câu lệnh dùng lại được.",
      formula: "Số liệu → chủ đề → AI nháp → bạn sửa và soát → hẹn giờ → ghi lại.",
      commonMistake: "Nghĩ nội dung mỗi ngày từ đầu, hoặc viết sẵn cả năm rồi không đo gì.",
      action: "Chọn một khung giờ cố định mỗi tuần và đặt lịch nhắc ngay bây giờ.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tạo một tệp ghi chú tên \"Bộ khung marketing\" gồm ba phần: chân dung khách, ba bài mẫu giọng văn, danh sách điều không được hứa. Rồi đặt lịch nhắc một buổi cố định mỗi tuần.",
      secondary: "Buổi đầu tiên chỉ cần ba bài. Đều quan trọng hơn nhiều.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước là từng mảnh: AI đứng ở đâu, chân dung khách, giọng văn, đo lường, ranh giới. Bài cuối ghép chúng thành một quy trình chạy mỗi tuần.",
      },
      {
        type: "feynman",
        title: "Làm nội dung đều đặn đơn giản hơn bạn nghĩ",
        intro: "Làm nội dung mỗi tuần giống đi chợ nấu ăn cho cả tuần: xem tủ lạnh còn gì, lên thực đơn, đi chợ một lần, sơ chế sẵn. Không ai muốn mỗi bữa lại chạy ra chợ.",
        columns: ["Bước", "Nấu ăn cả tuần", "Nội dung cả tuần"],
        rows: [
          ["Xem lại", "Tuần trước món nào cả nhà ăn hết", "Bài nào mang về kết quả"],
          ["Lên thực đơn", "Chọn năm món cho tuần này", "Chọn ba đến năm chủ đề"],
          ["Sơ chế", "Rửa, thái, chia hộp", "AI viết nháp, bạn sửa và soát"],
          ["Cất tủ", "Mỗi ngày lấy ra nấu", "Hẹn giờ đăng cho cả tuần"],
        ],
        oneLiner: "Nấu nội dung một lần cho cả tuần, bắt đầu từ việc xem tuần trước món nào hết sạch.",
      },
      { type: "heading", text: "Bộ khung dùng lại mỗi tuần" },
      {
        type: "list",
        items: [
          "Chân dung khách hàng (bài 2).",
          "Hai ba bài mẫu giọng văn (bài 3).",
          "Con số chính bạn đo (bài 4).",
          "Danh sách điều không được hứa (bài 5).",
        ],
      },
      {
        type: "paragraph",
        text: "Dán bộ khung vào đầu câu lệnh là AI có đủ bối cảnh ngay, không phải giải thích lại từ đầu mỗi tuần. Phần việc của bạn thu lại còn: đọc số liệu, chọn chủ đề, sửa và soát.",
      },
      {
        type: "callout",
        label: "Lỡ một tuần không sao",
        text: "Quy trình tốt chịu được một tuần hỏng. Đừng bỏ, cũng đừng đăng bù gấp đôi - quay lại nhịp cũ vào tuần sau là đủ.",
      },
      {
        type: "closing",
        lines: [
          "Bạn vừa đi hết chặng Marketing với AI: hiểu khách, viết đúng giọng, đo đúng số, giữ đúng ranh giới.",
          "Việc tiếp theo không phải học thêm - mà là chạy buổi đầu tiên tuần này.",
        ],
      },
    ],
  },
];
