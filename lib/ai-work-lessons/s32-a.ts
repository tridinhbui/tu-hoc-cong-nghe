import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 32, bài 1-5. Giáo trình: scripts/curriculum/stage-32.json.
// Không khẳng định tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm.

// Đáp án đúng luôn viết ở vị trí 0; build sẽ cân lại vị trí.
const qz = (question: string, right: string, wrong: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S32_A_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 1 ─────────────────────────
  {
    id: 2040,
    slug: "mot-trang-pham-vi-truoc-khi-bat-dau",
    title: "Chặng 32, Bài 1: Một trang phạm vi trước khi ai đó bắt đầu làm",
    subtitle: "Ba người nghe cùng một câu và hiểu ba kiểu: một trang giấy kéo họ về cùng một chỗ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phần lớn dự án trượt không phải vì làm dở mà vì mỗi người tưởng mình đang làm cùng một thứ. Một trang phạm vi viết trước khi bắt đầu rẻ hơn rất nhiều so với việc làm lại sau hai tuần. AI viết trang này nhanh, và giỏi soi chỗ mơ hồ, nhưng bạn mới là người biết khách thật sự cần gì.",
    openingQuestion:
      "Khách nhắn: \"làm cho tôi cái website\". Anh thiết kế nghĩ là trang giới thiệu, chị lập trình nghĩ là có giỏ hàng, bạn nghĩ chỉ cần đăng được bài. Bạn nhờ AI viết trang phạm vi. Bước nào quan trọng nhất trước khi gửi khách?",
    openingOptions: [
      "Đọc lại từng câu, tìm chỗ AI tự thêm điều khách chưa hề nói",
      "Kiểm tra bố cục và font chữ để trang phạm vi trông chuyên nghiệp",
      "Nhờ AI viết thêm nhiều mục để phạm vi trông đầy đủ hơn nữa với khách",
      "Gửi luôn cho khách vì AI đã viết rất nhiều bản phạm vi tương tự",
    ],
    correctOption: 0,
    explanation:
      "Trang phạm vi có tác dụng khi nó chỉ chứa điều đã thoả thuận. AI rất hay lấp chỗ trống bằng điều nghe hợp lý, ví dụ tự thêm thanh toán trực tuyến hay đa ngôn ngữ, và khách gật đầu vì nghe có lợi. Sau đó cả đội phải làm thứ chưa ai tính công. Bố cục đẹp không giúp gì cho việc này, viết thêm mục còn làm phạm vi phình ra, và gửi luôn thì bạn cam kết thay khách những thứ họ chưa nói.",
    diagram: [
      { label: "Bạn ghi lại đúng câu khách nói", arrow: true },
      { label: "AI viết trang phạm vi và liệt kê chỗ mơ hồ", arrow: true },
      { label: "Bạn gạch điều AI tự thêm, hỏi lại khách", arrow: true },
      { label: "Khách và đội cùng đọc, cùng đồng ý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Lan làm điều phối cho một cửa hàng gốm nhỏ. Khách chỉ nói \"làm cho tôi cái website\". Chị đưa AI câu đó cùng ngân sách và hạn chót, xin trang phạm vi kèm danh sách câu hỏi còn mơ hồ. AI liệt kê thêm mục \"thanh toán trực tuyến\" mà khách chưa nhắc. Chị gạch mục đó, hỏi lại khách và ghi vào phần \"chưa làm ở đợt này\". Cả ba người trong đội đọc cùng một trang trước khi bắt tay vào việc.",
    },
    quiz: [
      qz(
        "Một trang phạm vi tốt cần có phần nào mà người mới thường bỏ quên?",
        "Danh sách những việc chưa làm ở đợt này, kèm lý do ngắn",
        [
          "Danh sách tên mọi người từng tham gia cuộc họp đầu tiên",
          "Bản mô tả chi tiết từng tính năng theo cách viết của kỹ thuật",
          "Lời cam kết chất lượng thật hoa mỹ để khách yên tâm",
        ],
        "Phần \"không làm\" là chỗ chặn được những yêu cầu bồi thêm giữa chừng. Danh sách người dự họp không nói được đội sẽ làm gì. Mô tả kiểu kỹ thuật thì khách không đọc nổi và không đồng ý được. Lời cam kết hoa mỹ chỉ tạo thêm kỳ vọng, không khoanh được việc.",
      ),
      qz(
        "AI viết phạm vi có mục \"thanh toán trực tuyến\" mà khách chưa hề nhắc. Nên làm gì?",
        "Gạch ra, hỏi lại khách rồi mới quyết",
        [
          "Giữ lại vì nghe hợp lý, có lợi cho cửa hàng của khách nữa",
          "Để nguyên và báo giá thêm cho khách sau khi làm xong phần chính",
          "Xoá im lặng, coi như AI viết thừa và không cần nhắc tới",
        ],
        "Mục do AI tự thêm chưa phải yêu cầu của khách; cách đúng là hỏi lại. Giữ lại vì nghe có lợi sẽ ôm thêm việc chưa ai đồng ý. Tính tiền thêm sau khi làm xong là gây bất ngờ cho khách. Xoá im lặng thì mất cơ hội biết khách có cần thật hay không.",
      ),
      qz(
        "Vì sao nên nhờ AI liệt kê các câu hỏi còn mơ hồ, thay vì chỉ nhờ viết phạm vi?",
        "Nó chỉ ra chỗ cần hỏi khách trước khi bắt đầu làm",
        [
          "Danh sách câu hỏi dài hơn nên trông chuyên nghiệp hơn với khách",
          "AI tự trả lời giúp bạn nên bạn đỡ phải hỏi ai cả",
          "Bản phạm vi chỉ hợp lệ khi có ít nhất mười câu hỏi đi kèm",
        ],
        "Câu hỏi mơ hồ là việc cần làm cụ thể: bạn cầm nó đi hỏi khách. Độ dài của danh sách không đo độ chuyên nghiệp. AI đoán câu trả lời nhưng người trả lời đúng là khách. Không có quy định nào đòi đủ mười câu; có bao nhiêu chỗ mơ hồ thì hỏi bấy nhiêu.",
      ),
      qz(
        "Trang phạm vi nên dài khoảng bao nhiêu để cả đội và khách đều đọc hết?",
        "Một trang, đọc dưới năm phút",
        [
          "Mười trang, để không sót chi tiết nào",
          "Ba trang, mỗi bên một trang riêng",
          "Không giới hạn, cứ AI viết xong là được",
        ],
        "Ai cũng đọc được một trang, nên mới có tác dụng kéo mọi người về cùng một chỗ. Mười trang thì khách ký mà không đọc. Chia mỗi bên một trang riêng làm ba bên có ba bản khác nhau, đúng cái bạn muốn tránh. AI viết nhanh không có nghĩa là người đọc đọc nhanh.",
      ),
      qz(
        "Ai là người chịu trách nhiệm cuối cùng về nội dung trang phạm vi?",
        "Bạn, người ký gửi trang đó cho khách và đội",
        [
          "AI, vì chính nó viết trang đó",
          "Khách, vì họ là người đưa ra yêu cầu ban đầu",
          "Người thiết kế, vì họ là người bắt tay vào làm đầu tiên",
        ],
        "Người gửi trang đi là người cam kết với khách và với đội. AI không chịu trách nhiệm được điều nó viết. Khách chỉ chịu trách nhiệm về điều họ nói, không phải điều AI thêm. Người thiết kế chỉ làm theo những gì trang ghi, nên nếu trang sai thì lỗi nằm ở người gửi.",
      ),
    ],
    keyTakeaways: [
      "Ghi lại đúng câu khách nói, rồi mới nhờ AI viết trang phạm vi.",
      "Trang phạm vi cần cả phần \"làm\" lẫn phần \"chưa làm ở đợt này\".",
      "Gạch điều AI tự thêm mà khách chưa nói; đừng giữ lại chỉ vì nghe hợp lý.",
      "Cả khách lẫn đội đọc cùng một trang trước khi ai đó bắt đầu làm.",
    ],
    practicePrompt: {
      question: "Câu nào dưới đây đủ rõ để đưa vào phần \"làm\" của trang phạm vi?",
      options: [
        "Trang chủ có ảnh gốm, giới thiệu ngắn và số điện thoại đặt hàng",
        "Website đẹp, hiện đại, dễ dùng và thân thiện với người xem mới vào",
        "Làm hết các phần khách cần cho việc bán gốm trực tuyến",
        "Giao sản phẩm thật tốt và đúng như kỳ vọng của khách",
      ],
      correct: 0,
      explanation:
        "Một mục phạm vi tốt liệt kê thứ cụ thể mà ai cũng nhìn thấy và đếm được. \"Đẹp, hiện đại, dễ dùng\" là cảm nhận, mỗi người hiểu một kiểu. \"Hết các phần khách cần\" mở cửa cho mọi yêu cầu bồi thêm. \"Đúng như kỳ vọng\" không cho ai biết cụ thể là gì.",
    },
    summary: {
      keyIdea: "Trang phạm vi là chỗ cả đội và khách nhìn cùng một thứ trước khi tốn công sức.",
      formula: "Câu khách nói + ngân sách + hạn chót → AI viết nháp và liệt kê chỗ mơ hồ → bạn gạch, hỏi lại → cả hai bên đồng ý.",
      commonMistake: "Giữ nguyên mục AI tự thêm vì nghe hợp lý, rồi phải làm thứ khách chưa từng yêu cầu.",
      action: "Chọn một việc sắp giao và viết ra một câu bắt đầu bằng \"Đợt này chưa làm...\".",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn sắp giao hoặc vừa nhận. Ghi lại đúng câu người giao đã nói, thêm hạn chót và ngân sách nếu có. Nhờ AI viết trang phạm vi một trang kèm danh sách chỗ còn mơ hồ. Gạch mọi điều AI tự thêm mà người giao chưa nói, rồi chọn hai câu hỏi để hỏi lại họ.",
      secondary: "Ngày mai gửi hai câu hỏi đó cho người giao việc và ghi lại câu trả lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ hai, khách nhắn một dòng: \"làm cho tôi cái website\". Đến chiều, ba người trong đội đã hiểu ba kiểu khác nhau. Bài này chỉ một việc: dùng AI viết một trang phạm vi để cả ba cùng nhìn vào một chỗ.",
      },
      {
        type: "feynman",
        title: "Trang phạm vi đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ thợ sửa căn bếp. Nếu chỉ nói \"sửa bếp cho đẹp\", ông thợ tự hiểu. Nếu hai bên cùng ký một tờ ghi \"thay tủ trên, không đụng tường, xong trước mùng 5\", cả hai cùng biết thế nào là xong.",
        columns: ["Việc", "Sửa căn bếp", "Dự án của bạn"],
        rows: [
          ["Tờ giấy ghi", "Thay gì, không đụng gì, xong khi nào", "Làm gì, chưa làm gì, hạn chót"],
          ["Người kia hay tự thêm", "Ông thợ thấy tường cũ nên đề nghị đập luôn", "AI thấy trang bán hàng nên tự thêm thanh toán"],
          ["Bạn phải kiểm", "Mục nào chủ nhà đã đồng ý thật", "Mục nào khách đã nói thật"],
        ],
        oneLiner: "Trang phạm vi là tờ giấy hai bên cùng đọc trước khi ai cầm dụng cụ.",
      },
      { type: "heading", text: "Vì sao một câu mơ hồ lại đắt" },
      {
        type: "paragraph",
        text: "Câu \"làm cho tôi cái website\" chứa quá ít thông tin, và người nghe tự lấp chỗ trống bằng kinh nghiệm của mình. Anh thiết kế thấy trang giới thiệu, chị lập trình thấy giỏ hàng. Không ai nói dối, họ chỉ hiểu khác. Thuật ngữ mới duy nhất ở đây là phạm vi: danh sách những việc sẽ làm trong lần này, và cả những việc sẽ không làm.",
      },
      {
        type: "comparison",
        left: {
          label: "Không có trang phạm vi",
          text: "Mỗi người tự nhớ theo cách mình hiểu. Tuần thứ ba khách hỏi \"sao chưa có thanh toán\", đội nói \"anh có nhắc đâu\", và không ai có giấy để chứng minh.",
        },
        right: {
          label: "Có trang phạm vi một trang",
          text: "Cả đội đọc cùng một trang. Khi khách bồi thêm yêu cầu, bạn chỉ vào dòng \"chưa làm ở đợt này\" và hai bên bàn chuyện làm thêm có tính công hay không.",
        },
      },
      { type: "heading", text: "Từ câu của khách đến trang cả đội đọc" },
      {
        type: "flow",
        title: "Bốn bước tạo trang phạm vi",
        steps: [
          { label: "Ghi đúng câu khách nói", detail: "Chép nguyên văn, kèm hạn chót và ngân sách nếu có. Đừng diễn giải trước khi đưa cho AI." },
          { label: "Nhờ AI viết nháp và liệt kê chỗ mơ hồ", detail: "Xin một trang gồm phần làm, phần chưa làm và danh sách câu hỏi cần hỏi lại khách." },
          { label: "Gạch điều AI tự thêm", detail: "Đọc từng dòng, tự hỏi khách đã nói câu này chưa. Nếu chưa, chuyển thành câu hỏi thay vì giữ làm yêu cầu." },
          { label: "Gửi khách và đội cùng đọc", detail: "Chỉ gửi khi mỗi dòng đều là điều đã thoả thuận, và mọi người trả lời \"đồng ý\" bằng chữ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu lệnh nhờ AI viết trang phạm vi",
        task: "Khách của tiệm gốm nói \"làm cho tôi cái website\", ngân sách 15 triệu, hạn hai tuần. Chọn từng phần của câu lệnh để AI viết trang phạm vi dùng được.",
        parts: [
          {
            id: "input",
            label: "Điều bạn đưa vào",
            options: [
              { text: "Khách muốn làm website, cứ viết phạm vi đầy đủ giúp tôi.", feedback: "AI không biết ngân sách hay hạn chót nên tự giả định một dự án cỡ lớn, rồi viết phạm vi to hơn khách cần." },
              { text: "Nguyên văn câu khách nói, ngân sách 15 triệu, hạn hai tuần, tiệm gốm 3 nhân viên.", good: true, feedback: "AI có giới hạn thật để viết trong khung đó, nên phạm vi vừa với ngân sách và thời gian." },
            ],
          },
          {
            id: "unknown",
            label: "Chỗ chưa rõ",
            options: [
              { text: "Phần nào chưa rõ thì cứ đoán hợp lý và viết luôn vào.", feedback: "AI đoán rồi viết như thể khách đã nói. Bạn không phân biệt được đâu là điều khách yêu cầu, đâu là điều AI thêm." },
              { text: "Phần nào khách chưa nói, đừng đoán: liệt kê thành câu hỏi riêng cho tôi hỏi lại.", good: true, feedback: "Chỗ mơ hồ được tách ra thành danh sách câu hỏi, không lẫn vào phần yêu cầu." },
            ],
          },
          {
            id: "shape",
            label: "Hình thức trang",
            options: [
              { text: "Một trang gồm ba phần: làm ở đợt này, chưa làm ở đợt này, câu hỏi cần hỏi khách.", good: true, feedback: "Có cả phần chưa làm, nên khi khách bồi thêm yêu cầu bạn có chỗ để chỉ vào." },
              { text: "Viết thật chi tiết mọi tính năng có thể có của một website bán hàng.", feedback: "Bạn nhận một bản dài liệt kê cả những thứ chưa ai yêu cầu, và không có phần nào ghi điều sẽ không làm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "unknown", "shape"],
            text: "LÀM Ở ĐỢT NÀY (2 tuần, 15 triệu): trang chủ có ảnh gốm và giới thiệu tiệm; trang liên hệ có số điện thoại và địa chỉ; nút gọi nhanh trên điện thoại.\nCHƯA LÀM Ở ĐỢT NÀY: giỏ hàng và thanh toán, viết bài thường xuyên, tiếng Anh.\nCÂU HỎI CẦN HỎI KHÁCH: (1) Tiệm đã có sẵn ảnh chụp sản phẩm chưa? (2) Khách đặt hàng qua điện thoại hay cần đặt trên trang? (3) Ai duyệt bản cuối?",
          },
          {
            requires: ["input"],
            text: "PHẠM VI: trang chủ, trang sản phẩm, giỏ hàng, thanh toán trực tuyến, quản lý đơn hàng.\n(Có giới hạn thật nhưng không tách chỗ chưa rõ: AI tự đoán khách cần bán hàng trực tuyến và viết như thể khách đã nói.)",
          },
          {
            text: "PHẠM VI: website bán hàng đầy đủ gồm đa ngôn ngữ, blog, thanh toán, chat trực tuyến, ứng dụng di động, quản trị kho hàng.\n(Không có giới hạn nào: AI bịa một dự án lớn hơn ngân sách gấp nhiều lần.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Điều AI hay làm",
        text: "AI thích lấp chỗ trống bằng những thứ nghe hợp lý, và khách thường gật đầu vì nghe có lợi. Hãy coi mọi dòng mà khách chưa nói là một câu hỏi, chứ không phải một yêu cầu.",
      },
      {
        type: "scenario",
        title: "Bản nháp đã có, bạn gửi khách thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa bản phạm vi ba phần trông rất chỉn chu. Trong phần \"làm\" có một dòng \"tích hợp thanh toán trực tuyến\" mà khách chưa từng nhắc. Bạn làm gì?",
            choices: [
              { label: "Gửi luôn, vì nghe hợp lý và khách chắc sẽ thích", next: "bad1" },
              { label: "Chuyển dòng đó thành câu hỏi và hỏi khách trước", next: "s2" },
            ],
          },
          bad1: {
            text: "Khách gật đầu và ký. Đến tuần thứ hai, đội mới nhận ra thanh toán cần thêm nhiều việc mà ngân sách không tính. Bạn phải xin thêm tiền và thời gian, khách thấy bị đổi giá giữa chừng.",
            ending: "bad",
          },
          s2: {
            text: "Khách trả lời: \"Chưa cần, khách cứ gọi điện đặt hàng.\" Bạn chuyển dòng đó sang phần \"chưa làm ở đợt này\". Bạn còn lại một chỗ mơ hồ: ai duyệt bản cuối.",
            choices: [
              { label: "Ghi tên một người duyệt và một ngày duyệt vào trang rồi gửi cả đội", next: "good1" },
              { label: "Để trống mục duyệt, khi nào xong tính tiếp", next: "bad2" },
            ],
          },
          good1: {
            text: "Cả ba người trong đội và khách cùng đọc một trang một trang, và ai cũng trả lời \"đồng ý\". Hai tuần sau, sản phẩm xong đúng như trang đã ghi, không có yêu cầu bất ngờ.",
            ending: "good",
          },
          bad2: {
            text: "Không ai biết ai duyệt, nên bản cuối chờ ba ngày mà không có phản hồi. Hạn chót trượt vì một việc mà đáng lẽ chỉ cần ghi một cái tên.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chép nguyên văn câu khách nói, kèm hạn và ngân sách.",
          "Bước 2 - Nhờ AI viết nháp và liệt kê chỗ mơ hồ.",
          "Bước 3 - Gạch điều AI tự thêm, biến thành câu hỏi.",
          "Bước 4 - Gửi cả khách và đội, chờ chữ \"đồng ý\".",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI viết phạm vi trong một phút, nhưng nó không biết khách đã nói gì và chưa nói gì.",
          "Bạn là người phân biệt hai điều đó.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 2 ─────────────────────────
  {
    id: 2041,
    slug: "chia-viec-lon-thanh-viec-nho-co-nguoi-nhan",
    title: "Chặng 32, Bài 2: Chia việc lớn thành việc nhỏ có người nhận, có ngày xong",
    subtitle: "Kế hoạch chỉ ghi \"triển khai\" thì không ai biết sáng mai làm gì.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một dòng \"triển khai hệ thống\" trong kế hoạch nghe rất ổn, nhưng không ai biết ai làm gì trong sáng thứ ba. Việc nhỏ có người nhận và ngày xong là chỗ tiến độ bắt đầu nhìn thấy được. AI chia nhanh, còn bạn kiểm thứ tự trước sau và người nhận.",
    openingQuestion:
      "Kế hoạch của bạn hiện chỉ có một dòng: \"Triển khai\". Bạn nhờ AI tách thành các việc nhỏ và nhận về 14 dòng trông rất kỹ. Điều gì nên kiểm trước khi chia cho mọi người?",
    openingOptions: [
      "Việc nào phải xong trước việc nào, và mỗi việc đã có người nhận chưa",
      "Số dòng có đủ nhiều để trông kế hoạch chi tiết và đáng tin cậy với khách",
      "Từng dòng có bắt đầu bằng động từ cho tiếng Việt nghe mượt mà",
      "Các việc có được gom nhóm theo màu để cả đội nhìn vào dễ hơn",
    ],
    correctOption: 0,
    explanation:
      "Danh sách việc chỉ dùng được khi thứ tự và người nhận đúng. AI hay xếp việc theo thứ tự nghe tự nhiên, nhưng không biết việc \"gửi email cho khách\" phải chờ việc \"khách duyệt danh sách\". Nó cũng không biết ai trong đội đang kẹt. Số dòng, cách dùng động từ hay màu sắc là trình bày, nhìn qua là thấy, còn thứ tự phụ thuộc và người nhận thì chỉ bạn kiểm được.",
    diagram: [
      { label: "Một việc lớn chỉ có một dòng", arrow: true },
      { label: "AI tách thành việc dưới hai ngày", arrow: true },
      { label: "Bạn kiểm thứ tự phụ thuộc và gắn người nhận", arrow: true },
      { label: "Mỗi việc có tên người và ngày xong" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Khoa điều phối việc chuyển văn phòng nhỏ 12 người sang chỗ mới. Kế hoạch ban đầu chỉ có dòng \"Chuyển văn phòng\". Anh nhờ AI tách thành các việc dưới hai ngày. AI xếp \"đóng gói tài liệu\" trước \"chốt ngày chuyển\", trong khi phải chốt ngày trước mới biết đóng gói lúc nào. Anh đổi thứ tự, gắn tên từng người và ngày xong, rồi mới chia cho cả đội.",
    },
    quiz: [
      qz(
        "Một việc \"tốt\" trong danh sách công việc nhỏ nên có những gì?",
        "Một động từ cụ thể, một người nhận và một ngày xong",
        [
          "Một mô tả dài để không ai có thể hiểu sai điều cần làm",
          "Một mức ưu tiên, còn tên người nhận sẽ điền sau khi họp",
          "Một nhóm phụ trách chung để ai rảnh thì cầm việc đó",
        ],
        "Động từ, người nhận và ngày xong là ba thứ giúp việc không bị trôi. Mô tả dài chưa chắc rõ hơn và không cho ai biết người nào chịu trách nhiệm. Để trống người nhận thì cuộc họp xong việc vẫn không ai làm. Giao cho nhóm chung là cách nhanh nhất để mỗi người tưởng người kia đã làm.",
      ),
      qz(
        "Vì sao nên yêu cầu AI tách thành việc dưới hai ngày?",
        "Việc ngắn thì chậm trễ lộ ra sớm, không dồn tới cuối",
        [
          "Việc nhỏ hơn hai ngày thì không cần ai kiểm tra lại nữa cả",
          "Việc ngắn AI làm hộ, không cần phân người",
          "Danh sách càng nhiều dòng thì dự án càng dễ được phê duyệt",
        ],
        "Việc tối đa hai ngày mà không thấy tiến triển thì bạn biết ngay hôm sau. Việc một tuần có thể trễ năm ngày mà không ai hay. Việc ngắn vẫn cần người kiểm và người nhận. Số dòng không liên quan tới chuyện phê duyệt.",
      ),
      qz(
        "AI xếp \"gửi thư mời họp cho khách\" trước \"khách duyệt danh sách khách mời\". Đây là lỗi gì?",
        "Sai thứ tự phụ thuộc: thư mời phải chờ danh sách được duyệt",
        [
          "Sai chính tả vì phải viết \"gửi thư mời\" thành một từ ghép",
          "Không sai gì, vì hai việc này có thể làm song song hoàn toàn",
          "Sai độ dài vì việc gửi thư mời chắc chắn dài hơn hai ngày",
        ],
        "Việc B cần kết quả của việc A thì B phải đứng sau A: đó là phụ thuộc. Thư mời gửi trước khi duyệt danh sách sẽ phải gửi lại. Làm song song chỉ đúng khi hai việc không cần nhau. Lỗi ở đây không liên quan tới chính tả hay độ dài mà tới thứ tự.",
      ),
      qz(
        "Nên nhờ AI gắn tên người nhận cho từng việc không?",
        "Không, bạn tự gắn vì chỉ bạn biết ai đang rảnh và ai đang kẹt",
        [
          "Có, vì AI biết năng lực của từng người trong đội bạn rõ nhất",
          "Có, nhưng chỉ khi bạn đã đưa cho nó bảng lương của cả đội",
          "Không cần, vì việc nào không có người nhận thì tự có người làm",
        ],
        "Người nhận là quyết định về con người và khối lượng, nên là của bạn. AI không biết năng lực thật của đội. Bảng lương không cho biết ai rảnh và là dữ liệu nhạy cảm không nên đưa vào công cụ khi chưa được phép. Việc không có người nhận thường là việc không ai làm.",
      ),
      qz(
        "Sau khi AI chia xong 14 việc, bạn phát hiện việc số 9 cần kết quả của việc số 12. Nên làm gì?",
        "Đổi thứ tự để việc 12 đứng trước việc 9, rồi kiểm lại ngày xong",
        [
          "Giữ nguyên thứ tự AI xếp, vì nó đã tính sẵn mọi phụ thuộc",
          "Xoá việc 9 khỏi danh sách để tránh xung đột thứ tự",
          "Đổi số thứ tự thành 9 và 12 nhưng giữ nguyên ngày xong",
        ],
        "Ngày xong phải đi theo thứ tự mới, nếu không việc 9 vẫn tới hạn trước khi việc 12 xong. AI không đảm bảo đã tính hết phụ thuộc. Xoá việc 9 làm mất một phần công việc thật. Đổi số mà giữ ngày là chỉ sửa nhãn, không sửa vấn đề.",
      ),
    ],
    keyTakeaways: [
      "Mỗi việc nhỏ có ba thứ: động từ cụ thể, người nhận, ngày xong.",
      "Yêu cầu AI tách việc thành mảnh dưới hai ngày để chậm trễ lộ sớm.",
      "Tự kiểm thứ tự phụ thuộc: việc nào cần kết quả của việc nào.",
      "Tên người nhận là quyết định của bạn, không giao cho AI.",
    ],
    practicePrompt: {
      question: "Dòng nào dưới đây là một việc nhỏ đủ tốt để đưa vào danh sách?",
      options: [
        "Chị Hoa gửi bảng giá cho khách A trước thứ tư",
        "Triển khai giai đoạn hai của dự án cho hoàn chỉnh",
        "Cả nhóm chuẩn bị tài liệu và phối hợp với nhau",
        "Sớm hoàn thiện các việc còn lại theo đúng kế hoạch",
      ],
      correct: 0,
      explanation:
        "Dòng đầu có động từ cụ thể, một người nhận và một hạn: ai cũng biết xong là thế nào. \"Triển khai giai đoạn hai\" vẫn là một việc lớn. \"Cả nhóm chuẩn bị\" không có người chịu trách nhiệm. \"Sớm hoàn thiện\" không có ngày cụ thể để kiểm.",
    },
    summary: {
      keyIdea: "Việc nhỏ có người nhận và ngày xong là đơn vị mà bạn theo dõi được.",
      formula: "Việc lớn → AI tách thành việc dưới hai ngày → bạn kiểm thứ tự phụ thuộc → gắn người nhận và ngày xong.",
      commonMistake: "Nhận danh sách AI chia rồi giao luôn, không kiểm xem việc nào phải xong trước.",
      action: "Chọn một dòng \"triển khai\" trong kế hoạch của bạn và tách nó thành các việc dưới hai ngày.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lớn đang nằm trong kế hoạch chỉ với một dòng. Nhờ AI tách thành các việc dưới hai ngày, mỗi việc bắt đầu bằng một động từ. Sau đó tự vẽ mũi tên giữa các việc để kiểm việc nào cần kết quả của việc nào, đổi thứ tự nếu sai, và điền tên người cùng ngày xong cho từng dòng.",
      secondary: "Ngày mai hỏi lại từng người nhận xem việc của họ có rõ chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Kế hoạch của bạn có một dòng: \"Triển khai\". Sáng thứ ba, ba người hỏi bạn cùng một câu: \"Vậy hôm nay em làm gì?\". Bài này dạy cách nhờ AI tách dòng đó thành những việc nhỏ, và cách bạn kiểm chúng.",
      },
      {
        type: "feynman",
        title: "Chia việc lớn đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nấu bữa cơm cho mười người. Nếu chỉ ghi \"nấu tiệc\" thì chẳng ai biết bắt đầu. Nếu ghi \"anh Nam đi chợ thứ sáu, chị Mai ướp thịt thứ bảy sáng\" thì mỗi người biết việc của mình, và biết việc nào phải chờ việc nào.",
        columns: ["Việc", "Nấu tiệc", "Dự án của bạn"],
        rows: [
          ["Việc lớn", "\"Nấu tiệc\"", "\"Triển khai\""],
          ["Việc nhỏ", "Đi chợ, ướp thịt, nấu canh", "Chốt danh sách, gửi thư mời, xin duyệt"],
          ["Phải xong trước", "Đi chợ trước khi ướp thịt", "Chốt danh sách trước khi gửi thư mời"],
          ["Người kia làm hộ được", "Gợi ý các bước và thứ tự", "AI tách và gợi ý thứ tự"],
          ["Bạn phải kiểm", "Ai đi chợ được, ai đang bận", "Ai nhận việc nào, có kịp không"],
        ],
        oneLiner: "AI tách việc lớn thành mảnh, bạn quyết định mảnh nào của ai và mảnh nào đi trước.",
      },
      { type: "heading", text: "Vì sao dưới hai ngày" },
      {
        type: "paragraph",
        text: "Một việc kéo dài một tuần có thể trượt ba ngày mà không ai biết. Một việc hai ngày mà hôm sau chưa thấy đâu là dấu hiệu bạn nhìn ra được ngay. Vì vậy hãy nhờ AI tách tới mức mỗi việc dưới hai ngày. Thuật ngữ mới ở đây là phụ thuộc: việc B cần kết quả của việc A thì B phụ thuộc A và phải đứng sau A.",
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch một dòng",
          text: "\"Triển khai\", hạn cuối tháng. Không ai biết bắt đầu từ đâu. Đến ngày 28 mới phát hiện thiếu một khâu và không còn thời gian sửa.",
        },
        right: {
          label: "Kế hoạch có việc nhỏ",
          text: "Mười bốn dòng, mỗi dòng có tên, ngày xong và việc phải chờ. Trễ ở dòng nào là thấy ngay hôm sau, và bạn xử lý khi vẫn còn thời gian.",
        },
      },
      { type: "heading", text: "Từ một dòng đến danh sách có người nhận" },
      {
        type: "flow",
        title: "Bốn bước chia việc",
        steps: [
          { label: "Viết mục tiêu của việc lớn", detail: "Một câu cho biết xong là thế nào, ví dụ \"12 người làm việc được ở chỗ mới vào thứ hai\"." },
          { label: "Nhờ AI tách thành việc dưới hai ngày", detail: "Xin mỗi việc bắt đầu bằng động từ, ghi rõ việc nào phải chờ việc nào." },
          { label: "Kiểm thứ tự phụ thuộc", detail: "Tự vẽ mũi tên. Nếu việc B cần kết quả của việc A mà A đứng sau, đổi lại thứ tự." },
          { label: "Gắn người nhận và ngày xong", detail: "Bạn quyết định người nhận vì chỉ bạn biết ai đang rảnh. Ngày xong đi theo thứ tự đã sửa." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu lệnh nhờ AI tách việc chuyển văn phòng",
        task: "Văn phòng 12 người chuyển sang chỗ mới trong ba tuần. Chọn từng phần của câu lệnh để AI tách được danh sách dùng ngay.",
        parts: [
          {
            id: "goal",
            label: "Việc lớn và đích đến",
            options: [
              { text: "Lập kế hoạch chuyển văn phòng chi tiết cho tôi.", feedback: "AI không biết thế nào là xong, nên viết một kế hoạch chung chung với mốc thời gian tự đặt." },
              { text: "Chuyển 12 người sang chỗ mới trong ba tuần; xong khi mọi người làm việc được vào thứ hai tuần thứ tư.", good: true, feedback: "Có đích đến cụ thể để AI chia ngược lại từ đó." },
            ],
          },
          {
            id: "size",
            label: "Cỡ mỗi việc",
            options: [
              { text: "Tách thành các giai đoạn lớn để dễ theo dõi.", feedback: "Giai đoạn lớn kéo dài cả tuần, chậm trễ nằm im tới cuối." },
              { text: "Tách thành việc dưới hai ngày, mỗi việc bắt đầu bằng một động từ.", good: true, feedback: "Việc ngắn và có động từ nên bạn nhìn ra trễ hạn ngay hôm sau." },
            ],
          },
          {
            id: "dep",
            label: "Thứ tự trước sau",
            options: [
              { text: "Ghi cạnh mỗi việc: nó phải chờ việc nào xong trước.", good: true, feedback: "Bạn có sẵn cột phụ thuộc để kiểm lại, thay vì tự đoán thứ tự." },
              { text: "Sắp xếp theo thứ tự hợp lý nhất, tôi tự hiểu.", feedback: "AI xếp theo cảm giác. Bạn không có chỗ nào để đối chiếu và dễ bỏ sót việc bị xếp ngược." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "size", "dep"],
            text: "1. Chốt ngày chuyển với chủ nhà mới (1 ngày) - chờ: không.\n2. Đặt xe và người khuân vác theo ngày đã chốt (1 ngày) - chờ: việc 1.\n3. Báo địa chỉ mới cho khách và nhà cung cấp (2 ngày) - chờ: việc 1.\n4. Đóng gói tài liệu từng phòng (2 ngày) - chờ: việc 1.\n5. Kiểm tra mạng và ổ điện ở chỗ mới (1 ngày) - chờ: không.\n6. Dán nhãn thùng theo sơ đồ chỗ ngồi mới (1 ngày) - chờ: việc 4.",
          },
          {
            requires: ["goal"],
            text: "Giai đoạn 1: chuẩn bị chuyển (tuần 1). Giai đoạn 2: đóng gói và vận chuyển (tuần 2). Giai đoạn 3: ổn định chỗ mới (tuần 3).\n(Có đích đến nhưng cỡ việc còn lớn: không có người nhận và không ghi việc nào chờ việc nào.)",
          },
          {
            text: "Kế hoạch chuyển văn phòng: chuẩn bị, thực hiện, hoàn tất. Giao cho bộ phận hành chính chịu trách nhiệm chung, hoàn tất trong thời gian sớm nhất.\n(Không có đích, không có cỡ, không có thứ tự: AI viết một câu nghe ổn nhưng không dùng để chia việc được.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thứ tự là chỗ AI hay sai",
        text: "AI xếp việc theo thứ tự nghe tự nhiên, không theo việc thật cần gì. Hãy tự hỏi với từng dòng: việc này cần kết quả của việc nào? Nếu việc đó đứng sau, đổi lại chỗ.",
      },
      {
        type: "scenario",
        title: "Danh sách 14 việc đã có, bạn chia thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa 14 việc, mỗi việc dưới hai ngày. Trông rất đầy đủ. Bạn thấy việc \"đóng gói tài liệu\" nằm trước việc \"chốt ngày chuyển\". Bạn làm gì?",
            choices: [
              { label: "Gửi danh sách cho cả đội, vì ai cũng thấy đầy đủ", next: "bad1" },
              { label: "Đổi việc chốt ngày lên trước và kiểm lại ngày xong của các việc sau", next: "s2" },
            ],
          },
          bad1: {
            text: "Đội bắt đầu đóng gói tài liệu ngay tuần đầu. Sau đó chủ nhà mới báo dời ngày chuyển thêm một tuần, nên thùng nằm chật cả văn phòng và nhiều tài liệu phải mở ra dùng lại.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi đổi, bạn còn thấy sáu việc chưa có tên người nhận. Chị Mai đang bận cuối tháng, anh Nam thì rảnh.",
            choices: [
              { label: "Gắn tên từng người dựa trên lịch thật, hỏi lại chị Mai trước khi giao", next: "good1" },
              { label: "Để AI tự gắn tên cho từng người theo tên trong danh sách", next: "bad2" },
            ],
          },
          good1: {
            text: "Mỗi việc có tên người, ngày xong và việc phải chờ. Thứ tư tuần đầu, bạn thấy việc số 3 trễ một ngày và kịp nhắc. Cuối tuần thứ ba mọi người vào chỗ mới đúng hạn.",
            ending: "good",
          },
          bad2: {
            text: "AI gắn ba việc cho chị Mai đúng tuần chị bận nhất. Việc trễ, chị bực vì không ai hỏi ý kiến, và bạn phải chia lại việc khi chỉ còn hai ngày.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết đích đến của việc lớn bằng một câu.",
          "Bước 2 - Xin AI tách việc dưới hai ngày, bắt đầu bằng động từ.",
          "Bước 3 - Vẽ mũi tên phụ thuộc, sửa thứ tự nếu ngược.",
          "Bước 4 - Gắn tên và ngày xong bằng tay, sau khi hỏi người nhận.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI chia một việc lớn thành mười bốn mảnh trong vài giây.",
          "Bạn mới là người biết mảnh nào đi trước, và mảnh nào của ai.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 3 ─────────────────────────
  {
    id: 2042,
    slug: "uoc-luong-thoi-gian-va-cai-bay-lac-quan",
    title: "Chặng 32, Bài 3: Ước lượng thời gian và cái bẫy lạc quan",
    subtitle: "Đội nói ba ngày, lần trước cũng nói vậy mà mất chín: lấy số liệu cũ để hiệu chỉnh.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ước lượng thường được nói lúc mọi thứ suôn sẻ, trong khi thực tế luôn có chờ duyệt, sửa lại và người nghỉ ốm. Những số cũ của chính đội bạn cho biết đội hay nhanh hơn hay chậm hơn lời hứa bao nhiêu. AI tính tỷ lệ đó trong vài giây, còn bạn quyết định dùng thế nào.",
    openingQuestion:
      "Đội nói việc mới mất ba ngày. Lần trước cũng nói ba ngày và mất chín. Bạn có bảng số ngày ước lượng và số ngày thực tế của sáu việc cũ. Nên làm gì với con số ba ngày lần này?",
    openingOptions: [
      "Nhân với tỷ lệ thực tế chia ước lượng của các việc cũ, rồi hỏi lại đội",
      "Giữ ba ngày vì đội đã cam kết và nên tin vào lời của người trực tiếp làm việc",
      "Cộng thêm đúng hai ngày cho chắc, con số nào cũng cộng như vậy",
      "Hỏi lại đội đến khi họ nói con số lớn hơn thì mới chịu chấp nhận",
    ],
    correctOption: 0,
    explanation:
      "Lời ước lượng thường là kịch bản suôn sẻ nhất. Số liệu cũ cho biết đội bạn thật sự chậm hơn lời hứa bao nhiêu lần, và bạn dùng tỷ lệ đó làm hệ số. Giữ nguyên ba ngày là tin vào một thói quen đã sai một lần. Cộng cố định hai ngày không đổi theo cỡ việc: việc nhỏ dư thừa, việc lớn vẫn thiếu. Ép đội nói số lớn hơn chỉ dạy họ nói phóng đại, không cho bạn thêm thông tin.",
    diagram: [
      { label: "Đội nói số ngày ước lượng", arrow: true },
      { label: "Bạn lấy tỷ lệ thực tế chia ước lượng từ số cũ", arrow: true },
      { label: "Nhân hệ số, hỏi lại đội chỗ lệch nhiều", arrow: true },
      { label: "Hẹn ngày dựa trên số đã hiệu chỉnh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Thu điều phối đội nội dung bốn người. Sáu bài viết trước, đội ước lượng tổng 22 ngày nhưng thực tế mất 40 ngày, tức khoảng 1,8 lần. Bài mới đội nói 5 ngày. Chị nhân 5 với 1,8 được 9 ngày, hỏi đội chỗ nào có thể chậm, rồi hẹn với sếp \"khoảng 9 ngày\" thay vì \"5 ngày\". Bài xong ở ngày thứ 8. Đây là số liệu minh hoạ.",
    },
    quiz: [
      qz(
        "Sáu việc cũ ước lượng tổng 22 ngày, thực tế mất 40 ngày. Việc mới ước lượng 5 ngày. Con số hiệu chỉnh hợp lý là bao nhiêu?",
        "Khoảng 9 ngày (5 × 40 ÷ 22 ≈ 9)",
        [
          "6,8 ngày (5 + 1,8, cộng thay vì nhân)",
          "2,8 ngày (5 ÷ 1,8, chia ngược lại hệ số)",
          "23 ngày (5 × 40 ÷ 22 rồi nhân thêm cho chắc ăn)",
        ],
        "Tỷ lệ thực tế chia ước lượng là 40 ÷ 22 ≈ 1,8 nên 5 ngày thành khoảng 9 ngày. Cộng 1,8 vào 5 coi hệ số là số ngày, sai bản chất. Chia cho 1,8 thì đội còn nhanh hơn lời hứa, ngược với số liệu. Số 23 nhân hệ số thêm lần nữa, tính hai lần cùng một sai lệch.",
      ),
      qz(
        "Vì sao lời ước lượng của người làm thường thấp hơn thực tế?",
        "Họ hình dung kịch bản suôn sẻ, quên các lần chờ duyệt và sửa",
        [
          "Họ cố tình nói thấp để bị giao thêm việc cho nhiều hơn",
          "Họ không biết đếm ngày nên tính sai số ngày nghỉ và làm việc",
          "Người làm chậm hơn khi bị theo dõi nên luôn tốn thêm thời gian",
        ],
        "Sai lệch thường đến từ việc quên chờ đợi, sửa lại, người vắng, chứ không phải ý đồ. Nghĩ họ cố tình nói thấp làm bạn nghi ngờ đội một cách vô căn cứ. Sai số ngày là lỗi hiếm, không giải thích được xu hướng lặp đi lặp lại. Việc bị theo dõi làm chậm là suy đoán không có số liệu.",
      ),
      qz(
        "Nên lấy bao nhiêu việc cũ để tính hệ số hiệu chỉnh cho đội?",
        "Vài việc gần đây, cùng loại với việc sắp làm",
        [
          "Chỉ một việc gần nhất, vì nó mới nhất",
          "Mọi việc từ ngày lập đội, kể cả loại khác",
          "Bỏ việc cũ, hỏi AI một hệ số chung",
        ],
        "Vài việc cùng loại đủ để thấy xu hướng mà không bị lệch bởi một trường hợp lạ. Một việc duy nhất có thể là ngoại lệ. Trộn mọi loại việc và mọi thời kỳ làm hệ số mất nghĩa. AI không có số liệu của đội bạn nên không có hệ số chung cho mọi đội.",
      ),
      qz(
        "Sau khi có số 9 ngày, bạn nên báo với sếp thế nào?",
        "\"Khoảng 9 ngày, dựa trên sáu việc trước của đội\"",
        [
          "\"Đúng 9 ngày\", cho sếp con số chắc chắn",
          "\"5 ngày như đội nói\", và giữ 9 ngày làm số dự phòng riêng",
          "\"Chưa biết\", vì ước lượng chưa bao giờ chính xác cả",
        ],
        "Nói khoảng và nói cơ sở cho sếp biết con số đến từ đâu và còn sai số. \"Đúng 9 ngày\" hứa chính xác mà bạn không có. Báo 5 ngày rồi giữ 9 ngày riêng là giấu thông tin với sếp. \"Chưa biết\" bỏ mất số liệu bạn có, và sếp không lập kế hoạch được.",
      ),
      qz(
        "Khi hỏi lại đội về một việc bị lệch nhiều, câu hỏi nào có ích nhất?",
        "\"Bước nào lần trước bị chờ hoặc phải làm lại?\"",
        [
          "\"Sao lần này lại nói ba ngày, lần trước cũng thế mà trễ?\"",
          "\"Có thể nói con số lớn hơn để chúng ta yên tâm không?\"",
          "\"Ai chịu trách nhiệm nếu trễ?\"",
        ],
        "Hỏi về bước bị chờ hoặc làm lại đưa cuộc nói chuyện về nguyên nhân cụ thể mà đội có thể sửa. Câu đầu tiên quy lỗi và khiến đội phòng thủ. Xin số lớn hơn chỉ dạy đội nói phóng đại. Hỏi ai chịu trách nhiệm trước khi việc bắt đầu tạo áp lực mà không thêm hiểu biết.",
      ),
    ],
    keyTakeaways: [
      "Lời ước lượng thường là kịch bản suôn sẻ nhất, thực tế hay dài hơn.",
      "Hệ số hiệu chỉnh = tổng số ngày thực tế ÷ tổng số ngày ước lượng của các việc cũ.",
      "Nhân hệ số cho số mới, đừng cộng cố định một số ngày.",
      "Báo sếp một khoảng kèm cơ sở, không hứa con số chính xác.",
    ],
    practicePrompt: {
      question: "Năm việc cũ: ước lượng 2, 3, 4, 5, 6 ngày (tổng 20), thực tế tổng 30 ngày. Việc mới ước lượng 4 ngày. Số hiệu chỉnh là?",
      options: [
        "6 ngày (4 × 30 ÷ 20)",
        "5,5 ngày (4 + 1,5, cộng thay vì nhân)",
        "2,7 ngày (4 ÷ 1,5, chia ngược lại hệ số)",
        "4 ngày (giữ nguyên lời đội đã nói ban đầu)",
      ],
      correct: 0,
      explanation:
        "Hệ số là 30 ÷ 20 = 1,5 nên 4 ngày thành 6 ngày. Cộng 1,5 vào 4 coi hệ số là số ngày. Chia cho 1,5 đảo ngược hướng lệch. Giữ 4 ngày là bỏ qua số liệu cũ.",
    },
    summary: {
      keyIdea: "Số liệu cũ của chính đội bạn cho biết lời ước lượng lệch bao nhiêu, và bạn dùng tỷ lệ đó để hiệu chỉnh.",
      formula: "Hệ số = tổng số ngày thực tế ÷ tổng số ngày ước lượng của các việc cũ; số hiệu chỉnh = ước lượng mới × hệ số.",
      commonMistake: "Cộng thêm một số ngày cố định vào mọi ước lượng, không tính theo cỡ từng việc.",
      action: "Lấy năm việc gần đây của bạn, ghi ước lượng và thực tế, rồi tính hệ số của đội.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm năm việc gần đây của đội bạn, ghi số ngày đã ước lượng và số ngày thực tế thành hai cột. Nhờ AI tính tổng, hệ số và cho biết việc nào lệch nhiều nhất, rồi tự cộng lại bằng tay để kiểm. Áp hệ số vào một việc sắp làm và ghi ra con số đã hiệu chỉnh.",
      secondary: "Ngày mai hỏi người làm việc lệch nhiều nhất: bước nào lần đó bị chờ hoặc làm lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Đội nói ba ngày. Lần trước cũng nói ba ngày, và bạn đã trả lời khách \"thứ sáu xong\" rồi phải xin lỗi vào thứ ba tuần sau. Bài này dùng số liệu cũ của chính đội để nói lại một con số thật hơn.",
      },
      {
        type: "feynman",
        title: "Hiệu chỉnh ước lượng đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn có người bạn hay hẹn \"năm phút nữa tới\". Ba lần liền anh ấy tới sau mười phút. Lần thứ tư, bạn không cần tức giận: bạn chỉ cần tự nhân đôi lời hẹn của anh ấy.",
        columns: ["Việc", "Người bạn hay hẹn muộn", "Đội của bạn"],
        rows: [
          ["Lời hứa", "\"Năm phút nữa tới\"", "\"Việc này ba ngày\""],
          ["Thực tế lần trước", "Mười phút", "Chín ngày"],
          ["Bạn tự tính", "Nhân đôi lời hẹn", "Nhân hệ số từ các việc cũ"],
        ],
        oneLiner: "Lấy lời hứa nhân với mức lệch trong quá khứ, thay vì tin lời hứa lần này.",
      },
      { type: "heading", text: "Bẫy lạc quan" },
      {
        type: "paragraph",
        text: "Khi ước lượng, người làm hình dung một tuần suôn sẻ: không ai ốm, khách duyệt ngay, không sửa lại. Thực tế luôn có những lần chờ và sửa, nên số thật thường dài hơn. Thuật ngữ mới duy nhất ở đây là hệ số hiệu chỉnh: số bạn nhân vào lời ước lượng để bù cho mức lệch đội thường mắc, tính từ các việc cũ.",
      },
      {
        type: "chart",
        title: "Sáu việc cũ: ước lượng và thực tế",
        caption: "Số liệu minh hoạ, đơn vị là ngày. Tổng ước lượng 22 ngày, tổng thực tế 40 ngày, hệ số khoảng 1,8.",
        kind: "bar",
        yLabel: "Số ngày",
        data: [
          { label: "Việc A", values: [3, 9] },
          { label: "Việc B", values: [2, 3] },
          { label: "Việc C", values: [5, 8] },
          { label: "Việc D", values: [4, 7] },
          { label: "Việc E", values: [2, 3] },
          { label: "Việc F", values: [6, 10] },
        ],
        seriesLabels: ["Ước lượng", "Thực tế"],
      },
      {
        type: "comparison",
        left: {
          label: "Tin nguyên lời ước lượng",
          text: "Đội nói 5 ngày, bạn hẹn khách 5 ngày. Việc xong ở ngày 9, bạn phải xin lỗi và mất một phần niềm tin của khách.",
        },
        right: {
          label: "Hiệu chỉnh bằng số cũ",
          text: "Bạn nhân 5 với 1,8 được khoảng 9 ngày và hẹn \"khoảng 9 ngày\". Việc xong ở ngày 8, và khách thấy bạn hứa ít mà làm được nhiều.",
        },
      },
      { type: "heading", text: "Nhờ AI tính, bạn kiểm" },
      {
        type: "list",
        items: [
          "Đưa AI hai cột: ước lượng và thực tế của các việc cũ cùng loại.",
          "Xin tổng hai cột, hệ số và việc lệch nhiều nhất; tự cộng lại bằng tay.",
          "Nhân hệ số vào con số mới, làm tròn lên số ngày nguyên.",
          "Hỏi đội về việc lệch nhiều nhất: bước nào bị chờ hoặc làm lại.",
        ],
      },
      {
        type: "callout",
        label: "AI tính nhanh nhưng có thể tính sai",
        text: "AI cộng và chia rất nhanh, nhưng vẫn có lần cộng thiếu một dòng. Hãy tự cộng lại hai cột tổng bằng tay hoặc bảng tính trước khi dùng hệ số để hẹn ai.",
      },
      {
        type: "scenario",
        title: "Đội nói ba ngày, bạn xử lý thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách hỏi bao giờ xong việc mới. Đội nói ba ngày. Bạn có bảng sáu việc cũ cho thấy đội thường mất gần gấp đôi lời hứa. Bạn trả lời khách thế nào?",
            choices: [
              { label: "\"Ba ngày ạ\", vì đội đã tự nói vậy", next: "bad1" },
              { label: "Tính hệ số từ bảng cũ trước, rồi mới trả lời khách", next: "s2" },
            ],
          },
          bad1: {
            text: "Việc xong ở ngày thứ sáu. Khách đã lên kế hoạch dựa trên ngày thứ ba nên phải dời cuộc họp và bực bội. Bạn xin lỗi, nhưng con số ba ngày ban đầu không đổi được.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tính được hệ số khoảng 1,8, nên ba ngày thành khoảng năm ngày rưỡi. Đội nghe xong bảo: \"Lần này chị chưa chắc bị chờ duyệt, tụi em nhanh hơn.\"",
            choices: [
              { label: "Hỏi bước nào lần trước bị chờ duyệt, xem lần này có khác thật không", next: "good1" },
              { label: "Bỏ hệ số, tin lời đội vì họ nói chắc chắn", next: "bad2" },
            ],
          },
          good1: {
            text: "Đội chỉ ra hai bước: chờ khách duyệt nội dung và chờ thiết kế xong ảnh. Lần này khách duyệt được sớm hơn, nên bạn hẹn khách \"khoảng năm ngày\". Việc xong ở ngày thứ năm.",
            ending: "good",
          },
          bad2: {
            text: "Đội nói chắc nhưng vẫn phải chờ khách duyệt ba ngày và ảnh thiết kế trễ hai ngày. Việc xong ở ngày thứ tám, và con số bạn hẹn khách lại sai như lần trước.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lời hứa của đội nói về kịch bản suôn sẻ, còn số liệu cũ nói về điều thật sự xảy ra.",
          "Bạn nhân hai thứ đó lại với nhau và hẹn bằng con số đã hiệu chỉnh.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 4 ─────────────────────────
  {
    id: 2043,
    slug: "soat-ke-hoach-ai-viet-tim-buoc-thieu",
    title: "Chặng 32, Bài 4: Soát kế hoạch do AI viết để tìm bước bị thiếu",
    subtitle: "Kế hoạch trông trơn tru nhưng quên khâu khách duyệt: tập đọc từ cuối lên đầu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Kế hoạch do AI viết đọc rất trôi, và chính vì trôi nên mắt bạn lướt qua chỗ thiếu. Một khâu bị quên, như khách duyệt hay xin chữ ký, chỉ lộ ra khi việc đã chạy nửa chừng. Một cách đọc ngược, từ kết quả cuối về các bước trước, giúp bạn tìm ra chỗ hụt trước khi cả đội bắt đầu.",
    openingQuestion:
      "AI viết cho bạn kế hoạch tổ chức sự kiện khách hàng, năm bước, câu chữ rất mạch lạc. Bạn đọc từ trên xuống thấy ổn. Cách kiểm nào dễ tìm ra một bước bị quên nhất?",
    openingOptions: [
      "Đọc từ kết quả cuối lên, hỏi mỗi bước cần điều gì xảy ra trước nó",
      "Đọc lại từ đầu thêm hai lần nữa cho chắc là không sót bước nào trong kế hoạch",
      "Nhờ AI đọc lại kế hoạch chính nó viết và hỏi có ổn không",
      "Kiểm tra chính tả và cách đánh số các bước cho thật đồng đều",
    ],
    correctOption: 0,
    explanation:
      "Đọc xuôi từ đầu, mắt bạn đi theo mạch truyện của AI nên khó thấy chỗ thiếu. Đọc ngược từ kết quả cuối, bạn hỏi mỗi bước: điều gì phải có trước nó? Khách chưa duyệt thì không in được thiệp, và khâu duyệt không có trong kế hoạch sẽ lộ ra ngay. Đọc xuôi thêm lần nữa vẫn đi theo mạch cũ. AI tự đọc lại thường khen bản của mình. Chính tả và đánh số chỉ sửa hình thức, không tìm ra bước thiếu.",
    diagram: [
      { label: "Kế hoạch AI viết đọc rất trôi", arrow: true },
      { label: "Bạn đọc ngược từ kết quả cuối", arrow: true },
      { label: "Mỗi bước hỏi: điều gì phải có trước nó", arrow: true },
      { label: "Bổ sung khâu thiếu rồi mới chia việc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Mai điều phối một buổi gặp khách cho công ty 40 người. AI viết kế hoạch năm bước: chốt địa điểm, mời khách, in thiệp, chuẩn bị bài nói, tổ chức. Chị đọc ngược: \"in thiệp\" cần gì trước? Cần khách duyệt nội dung thiệp, mà kế hoạch không có khâu đó. Chị thêm một bước \"khách duyệt thiệp\" vào trước \"in thiệp\" và tránh một lần in lại toàn bộ.",
    },
    quiz: [
      qz(
        "Vì sao kế hoạch do AI viết dễ che giấu bước bị thiếu?",
        "Câu chữ mạch lạc làm bạn đọc lướt và tin",
        [
          "AI cố tình bỏ bước để bạn phải nhờ nó viết thêm lần nữa",
          "AI chỉ viết được năm bước nên các bước sau đều bị cắt",
          "AI không biết công việc nào cần có khách duyệt trong thực tế",
        ],
        "Văn trôi chảy tạo cảm giác đầy đủ, nên mắt bạn không dừng ở chỗ thiếu. AI không có ý đồ giữ bước lại. Giới hạn số bước không có, nó viết bao nhiêu tuỳ yêu cầu. AI biết khâu duyệt là gì nhưng không biết dự án của bạn cần nó, vì bạn chưa nói.",
      ),
      qz(
        "Khi đọc ngược một kế hoạch, câu hỏi nào cần hỏi ở mỗi bước?",
        "Điều gì phải xảy ra trước bước này",
        [
          "Bước này dài bao nhiêu chữ",
          "Bước này nghe có giống các kế hoạch bạn từng đọc không",
          "Bước này có động từ mạnh và hay hơn các bước khác không",
        ],
        "Hỏi \"điều gì phải có trước\" kéo ra phụ thuộc, tức khâu bị quên. Độ dài chữ, cảm giác quen thuộc hay độ mạnh của động từ đều là hình thức và không cho biết bước có đủ điều kiện để làm hay không.",
      ),
      qz(
        "Nên nhờ AI tự soát lại kế hoạch của chính nó không?",
        "Nên, nhưng bạn vẫn đọc ngược và tự quyết định",
        [
          "Nên, và tin kết quả vì nó tự viết ra",
          "Không bao giờ, vì AI luôn soát sai",
          "Không cần, vì AI viết ra là đủ bước",
        ],
        "AI soát thêm được vài chỗ, nhưng có xu hướng cho rằng bản của mình ổn. Không dùng nó là bỏ một công cụ hữu ích. Coi kết quả là đúng thì lại giao quyền quyết định cho AI. Kế hoạch AI viết không đảm bảo đủ bước.",
      ),
      qz(
        "Khâu nào trong các khâu sau thường bị quên nhất khi kế hoạch nhìn từ bên trong đội?",
        "Khâu duyệt hoặc đồng ý của bên ngoài đội",
        [
          "Khâu chuẩn bị nội dung mà chính đội tự làm",
          "Khâu in ấn vì nó có tên rõ ràng, dễ thấy",
          "Khâu chốt ngày vì cả đội đều nhớ rất rõ",
        ],
        "Khâu do người ngoài đội làm, như khách duyệt hay chờ chữ ký, không nằm trong công việc hằng ngày nên dễ bị quên. Việc của chính đội, việc có tên rõ ràng và ngày cụ thể thì cả đội nhớ.",
      ),
      qz(
        "Sau khi tìm ra bước thiếu \"khách duyệt thiệp\", bạn nên làm gì tiếp theo?",
        "Chèn nó vào trước \"in thiệp\", gắn người nhận và ngày, rồi kiểm lại các ngày sau",
        [
          "Nhờ AI viết lại toàn bộ kế hoạch mà không cần nói thêm điều gì",
          "Ghi chú vào cuối kế hoạch và nhắc miệng khi tới bước in thiệp",
          "Bỏ bước in thiệp để kế hoạch không cần thêm khâu duyệt nữa",
        ],
        "Một bước thêm vào cần có chỗ đúng, người nhận và ngày, và các ngày sau bị đẩy theo. Nhờ AI viết lại toàn bộ mà không nói gì thêm có thể làm mất chỗ bạn đã sửa. Ghi chú cuối rồi nhắc miệng dễ bị quên. Bỏ in thiệp làm mất một phần kết quả thật.",
      ),
    ],
    keyTakeaways: [
      "Văn trôi chảy không chứng minh kế hoạch đủ bước.",
      "Đọc ngược từ kết quả cuối và hỏi: điều gì phải có trước bước này?",
      "Khâu của bên ngoài đội, như khách duyệt, là chỗ hay bị quên nhất.",
      "Thêm bước thì phải gắn người, ngày và kiểm lại các ngày sau.",
    ],
    practicePrompt: {
      question: "Kế hoạch: chốt địa điểm, mời khách, in thiệp, chuẩn bị bài nói, tổ chức. Bước nào rõ ràng đang thiếu ở trước \"in thiệp\"?",
      options: [
        "Khách duyệt nội dung thiệp",
        "Đặt tên cho sự kiện thật hay",
        "Chọn font chữ cho tiêu đề thiệp",
        "Chụp ảnh cả đội trước khi in",
      ],
      correct: 0,
      explanation:
        "In thiệp cần nội dung đã được khách đồng ý, nên thiếu bước duyệt là thiếu điều kiện để in. Đặt tên và chọn font là chi tiết trình bày, không chặn việc in. Chụp ảnh đội không liên quan tới tấm thiệp.",
    },
    summary: {
      keyIdea: "Kế hoạch đọc trôi chưa chắc đã đủ; đọc ngược từ kết quả cuối để tìm chỗ hụt.",
      formula: "Kết quả cuối → từng bước lùi lại → hỏi điều gì phải có trước → bổ sung khâu thiếu, gắn người và ngày.",
      commonMistake: "Đọc xuôi một lần thấy ổn rồi chia việc, không hỏi từng bước cần gì trước nó.",
      action: "Lấy một kế hoạch đang chạy và đọc ngược, tìm một khâu của bên ngoài đội chưa được ghi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một kế hoạch đang chạy, viết tay hoặc do AI viết. Đọc ngược từ kết quả cuối lên đầu, với mỗi bước hỏi điều gì phải có trước nó. Đánh dấu ít nhất một khâu của bên ngoài đội, như khách hay sếp duyệt, mà kế hoạch chưa ghi. Thêm khâu đó vào, gắn người nhận và ngày, rồi kiểm lại các ngày sau.",
      secondary: "Ngày mai hỏi lại người bên ngoài đội xem họ có biết mình nằm trong kế hoạch không.",
    },
    sections: [
      {
        type: "lead",
        text: "AI vừa viết cho bạn kế hoạch một sự kiện khách hàng. Câu chữ mượt, năm bước rõ ràng, bạn đọc từ trên xuống và thấy ổn. Bài này dạy một cách đọc khác để thấy cái mắt thường lướt qua.",
      },
      {
        type: "feynman",
        title: "Soát kế hoạch đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn kiểm tra bài toán tìm đường. Đi từ nhà tới chỗ hẹn thì mọi thứ nghe hợp lý. Nhưng nếu đi từ chỗ hẹn ngược về nhà, bạn phát hiện con hẻm giữa đường đang sửa và không đi qua được.",
        columns: ["Cách đọc", "Đi từ nhà tới chỗ hẹn", "Đọc kế hoạch"],
        rows: [
          ["Đọc xuôi", "Nghe đường nào cũng đi được", "Câu chữ trôi, bước nào cũng có vẻ hợp lý"],
          ["Đọc ngược", "Từ chỗ hẹn hỏi: muốn tới đây phải đi qua đâu", "Từ kết quả cuối hỏi: muốn có bước này phải có gì trước"],
          ["Thứ lộ ra", "Con hẻm đang sửa", "Khâu khách duyệt bị quên"],
        ],
        oneLiner: "Đọc ngược buộc mỗi bước phải chứng minh điều kiện của nó đã có.",
      },
      { type: "heading", text: "Vì sao chỗ thiếu nằm im" },
      {
        type: "paragraph",
        text: "Văn của AI trôi chảy và có cấu trúc, nên bạn có cảm giác đã đọc một kế hoạch hoàn chỉnh. Khâu bị quên thường là khâu của người ngoài đội: khách duyệt, sếp ký, bộ phận khác gửi hàng. Những khâu này không nằm trong việc hằng ngày của đội nên dễ bị bỏ. Thuật ngữ mới là điều kiện đầu vào: thứ phải có sẵn thì bước mới làm được.",
      },
      {
        type: "flow",
        title: "Bốn bước đọc ngược",
        steps: [
          { label: "Đặt ngón tay ở kết quả cuối", detail: "Ví dụ \"buổi gặp khách diễn ra\". Đây là điểm bạn bắt đầu đọc." },
          { label: "Lùi một bước, hỏi điều kiện", detail: "Bước trước là \"in thiệp\". Muốn in thiệp cần gì có sẵn? Cần nội dung đã duyệt và danh sách khách." },
          { label: "Tìm điều kiện trong kế hoạch", detail: "Nếu nội dung thiệp đã duyệt không nằm ở bước nào, đó là chỗ thiếu." },
          { label: "Chèn bước thiếu, gắn người và ngày", detail: "Đặt nó ở trước bước cần nó, ghi người nhận và ngày, và đẩy các ngày sau nếu cần." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm chỗ hụt trong kế hoạch AI viết",
        task: "AI viết kế hoạch buổi gặp khách 40 người. Bấm vào những đoạn bạn thấy đáng ngờ, rồi nộp.",
        segments: [
          { text: "Bước 1 (thứ hai): Chốt địa điểm là phòng họp tầng 3, sức chứa 40 người." },
          { text: "Bước 2 (thứ ba): Gửi thư mời tới toàn bộ khách trong danh sách." },
          {
            text: "Bước 3 (thứ tư): In 40 tấm thiệp và gửi ngay sang xưởng in.",
            error: "Thiếu khâu khách duyệt nội dung thiệp. Nếu khách sửa lời sau khi in thì phải in lại toàn bộ.",
          },
          { text: "Bước 4 (thứ năm): Chuẩn bị bài nói mười phút cho giám đốc." },
          {
            text: "Bước 5 (thứ sáu): Tổ chức buổi gặp, ngân sách đã được duyệt đủ theo kế hoạch.",
            error: "Kế hoạch không có bước nào cho việc ngân sách được duyệt. AI viết như thể việc đó đã xong.",
          },
        ],
      },
      {
        type: "callout",
        label: "Khâu của người ngoài đội",
        text: "Hai loại khâu hay bị quên nhất: người ngoài đội duyệt hoặc đồng ý, và việc phải chờ một bên khác gửi tới. Với mỗi bước, hãy hỏi: có ai ngoài đội phải làm gì trước bước này không?",
      },
      {
        type: "scenario",
        title: "Kế hoạch trông ổn, bạn làm gì?",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đọc xuôi kế hoạch AI viết và thấy ổn. Cuộc họp chia việc bắt đầu sau mười phút. Bạn có thể đọc thêm một lượt hoặc làm gì khác trước khi vào phòng.",
            choices: [
              { label: "Vào họp và chia việc luôn, vì kế hoạch đã đọc rồi", next: "bad1" },
              { label: "Đọc ngược từ kết quả cuối, hỏi mỗi bước cần gì trước nó", next: "s2" },
            ],
          },
          bad1: {
            text: "Đội in 40 thiệp vào thứ tư. Thứ năm khách nhắn sửa một dòng tên công ty. Toàn bộ thiệp phải in lại, tốn thêm hai ngày và một khoản tiền không có trong ngân sách.",
            ending: "bad",
          },
          s2: {
            text: "Đọc ngược, bạn thấy bước \"in thiệp\" cần nội dung thiệp đã được khách đồng ý, mà kế hoạch không có. Bạn còn thấy bước cuối cần ngân sách đã duyệt, và cũng không có.",
            choices: [
              { label: "Thêm hai bước thiếu vào đúng chỗ, gắn người nhận và ngày", next: "good1" },
              { label: "Chỉ ghi chú \"nhớ xin duyệt\" ở cuối kế hoạch", next: "bad2" },
            ],
          },
          good1: {
            text: "Hai bước mới có tên người và ngày. Khách duyệt thiệp vào thứ ba, thiệp in đúng một lần. Ngân sách được duyệt từ thứ hai, và buổi gặp diễn ra đúng lịch.",
            ending: "good",
          },
          bad2: {
            text: "Ghi chú nằm cuối trang và không ai nhìn thấy khi chia việc. Thiệp vẫn in trước khi khách duyệt, và ghi chú chỉ được đọc khi đã quá muộn.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đọc xong xuôi rồi, đọc ngược từ kết quả cuối.",
          "Bước 2 - Mỗi bước hỏi: điều gì phải có trước nó?",
          "Bước 3 - Tìm điều kiện đó trong kế hoạch; không thấy thì là chỗ thiếu.",
          "Bước 4 - Chèn bước thiếu, gắn người và ngày, kiểm ngày sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kế hoạch trôi chảy không có nghĩa là kế hoạch đủ.",
          "Đọc từ cuối lên, và hỏi mỗi bước: điều gì phải có trước nó?",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 5 ─────────────────────────
  {
    id: 2044,
    slug: "mini-project-ke-hoach-mot-trang-cho-du-an-nho",
    title: "Chặng 32, Bài 5: Mini project: kế hoạch một trang cho một dự án nhỏ",
    subtitle: "Trong 20 phút: phạm vi, danh sách việc, mốc và người chịu trách nhiệm cho một việc thật của bạn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: phạm vi, chia việc, ước lượng, soát bước thiếu. Bài này ghép chúng lại trên một việc thật của bạn, đủ nhỏ để làm trong hai mươi phút. Một trang kế hoạch có người chịu trách nhiệm và mốc kiểm là thứ bạn có thể đưa cho đồng nghiệp ngay hôm sau.",
    openingQuestion:
      "Bạn có một việc nhỏ thật: sắp xếp lại kho tài liệu chung của phòng, khoảng hai tuần. Bạn muốn có một trang kế hoạch. Thứ tự nào đưa ra được bản dùng được nhanh nhất?",
    openingOptions: [
      "Phạm vi trước, rồi việc nhỏ, mốc kiểm và người chịu trách nhiệm",
      "Người chịu trách nhiệm trước, phần còn lại sẽ nghĩ khi bắt tay làm",
      "Mốc kiểm trước, rồi mới viết phạm vi cho khớp với các mốc đó",
      "Việc nhỏ trước, vì phạm vi sẽ tự hiện ra khi liệt kê xong việc",
    ],
    correctOption: 0,
    explanation:
      "Phạm vi trả lời câu hỏi việc này gồm gì và không gồm gì; chỉ khi đó việc nhỏ mới có biên giới. Việc nhỏ đã có thì mới đặt được mốc kiểm và gắn người chịu trách nhiệm cho từng mảnh. Đảo thứ tự khiến mỗi bước thiếu chỗ dựa: chọn người khi chưa biết việc, đặt mốc khi chưa biết phạm vi, hoặc liệt kê việc mà chưa có biên giới để dừng.",
    diagram: [
      { label: "Viết phạm vi: làm gì, chưa làm gì", arrow: true },
      { label: "Tách việc dưới hai ngày, ước lượng có hiệu chỉnh", arrow: true },
      { label: "Đặt mốc kiểm, gắn người chịu trách nhiệm", arrow: true },
      { label: "Đọc ngược tìm bước thiếu rồi chia sẻ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Đức trưởng nhóm hành chính muốn sắp xếp lại kho tài liệu chung, 300 tệp, trong hai tuần. Anh viết phạm vi, nhờ AI tách việc và ước lượng, hiệu chỉnh bằng số của lần dọn kho trước, đặt hai mốc kiểm và ghi tên người phụ trách từng phần. Khi đọc ngược, anh thấy thiếu bước \"hỏi các phòng khác có cần giữ tệp cũ không\" và thêm vào trước khi xoá.",
    },
    quiz: [
      qz(
        "Trong một trang kế hoạch dự án nhỏ, mục nào giúp người đọc hiểu việc dừng ở đâu?",
        "Phần \"chưa làm ở đợt này\" trong phạm vi",
        [
          "Danh sách tên toàn bộ những người có quan tâm tới việc",
          "Bảng màu phân loại việc theo mức ưu tiên cao thấp",
          "Đoạn giới thiệu dài về lý do vì sao cần làm dự án",
        ],
        "Phần chưa làm là chỗ vẽ ranh giới, nên khi có yêu cầu thêm bạn có chỗ để chỉ vào. Danh sách người quan tâm không nói ranh giới. Màu ưu tiên cho thứ tự làm chứ không cho điểm dừng. Đoạn lý do giải thích vì sao làm, không nói dừng ở đâu.",
      ),
      qz(
        "Vì sao mỗi mốc kiểm nên có một người chịu trách nhiệm cụ thể?",
        "Có tên người thì mới biết hỏi ai khi mốc đó trễ",
        [
          "Ghi tên là mốc tự động hoàn thành",
          "Nhiều người chung trách nhiệm cho kỹ",
          "Họ phải tự làm hết mọi việc trong mốc",
        ],
        "Tên người cho bạn một người cụ thể để hỏi khi trễ. Ghi tên không làm mốc hoàn thành tự động. Chia cho nhiều người khiến mỗi người tưởng người kia lo. Người chịu trách nhiệm không nhất thiết là người làm hết: họ đảm bảo việc xong và báo khi vướng.",
      ),
      qz(
        "AI ước lượng dọn kho 6 ngày. Lần dọn trước ước 4 ngày, thực tế 6 ngày. Số hiệu chỉnh là bao nhiêu?",
        "9 ngày (6 × 6 ÷ 4 = 9)",
        [
          "8 ngày (6 + 2, cộng chênh lệch cũ)",
          "4 ngày (6 ÷ 1,5)",
          "6 ngày (giữ nguyên lời AI đã ước)",
        ],
        "Hệ số là 6 ÷ 4 = 1,5 nên 6 ngày thành 9 ngày. Cộng chênh lệch lần trước là 6 + 2 = 8 coi mức lệch cố định, không theo cỡ việc. Chia cho 1,5 đi ngược hướng. Giữ nguyên là bỏ qua số cũ của chính bạn.",
      ),
      qz(
        "Đọc ngược kế hoạch dọn kho, bước \"xoá tệp cũ\" đang thiếu điều kiện nào?",
        "Xác nhận các phòng khác không còn cần các tệp đó",
        [
          "Đổi tên tất cả thư mục theo cùng một quy ước chung",
          "Chọn một ngày đẹp trời để cả phòng cùng ngồi dọn",
          "Chụp lại màn hình kho tài liệu trước khi bắt đầu dọn",
        ],
        "Xoá là bước khó hoàn tác, nên điều kiện đầu vào là người dùng khác đồng ý. Đổi tên thư mục là việc sau hoặc trước đều được. Chọn ngày và chụp màn hình là chi tiết, không chặn việc xoá.",
      ),
      qz(
        "Kế hoạch một trang xong, bạn nên làm gì trước khi chia sẻ cho đồng nghiệp?",
        "Tự đọc lại bằng mắt của người chưa biết gì về việc này",
        [
          "Nhờ AI viết thêm hai trang chi tiết cho đầy đủ",
          "Gửi luôn để đồng nghiệp tự tìm chỗ thiếu",
          "Xoá phần chưa làm vì người đọc chỉ cần việc sẽ làm",
        ],
        "Người chưa biết gì sẽ dừng ở đúng những chỗ mơ hồ, và bạn sửa được trước khi gửi. Thêm trang làm kế hoạch dài mà không rõ hơn. Gửi để người khác tìm lỗi là đẩy việc của bạn cho họ. Xoá phần chưa làm là bỏ mất chỗ chặn yêu cầu thêm.",
      ),
    ],
    keyTakeaways: [
      "Thứ tự đúng: phạm vi, việc nhỏ, mốc kiểm, người chịu trách nhiệm.",
      "Ước lượng cần hiệu chỉnh bằng số cũ của chính bạn, nhân chứ không cộng cố định.",
      "Đọc ngược trước khi chia sẻ để tìm khâu của người ngoài đội còn thiếu.",
      "Mỗi mốc kiểm có một tên người, không có nhóm chung.",
    ],
    practicePrompt: {
      question: "Đâu là cách viết mốc kiểm tốt nhất cho việc dọn kho tài liệu?",
      options: [
        "Thứ tư ngày 15: 150 tệp đã được phân loại, chị Hoa xác nhận",
        "Giữa tháng: đã làm được khoảng một nửa việc dọn kho tài liệu",
        "Khi nào xong phần chính thì cả nhóm cùng xem lại kết quả",
        "Cuối dự án: kho tài liệu gọn gàng và dễ dùng cho mọi người",
      ],
      correct: 0,
      explanation:
        "Mốc tốt có ngày, con số đếm được và tên người xác nhận. \"Giữa tháng, khoảng một nửa\" không có ngày và con số cụ thể. \"Khi nào xong phần chính\" không có ngày và không có người. \"Gọn gàng, dễ dùng\" là cảm nhận, không kiểm được.",
    },
    summary: {
      keyIdea: "Ghép bốn bài trước thành một trang: phạm vi, việc nhỏ, mốc kiểm, người chịu trách nhiệm.",
      formula: "Phạm vi → việc dưới hai ngày → ước lượng đã hiệu chỉnh → mốc kiểm có tên → đọc ngược → chia sẻ.",
      commonMistake: "Bắt đầu bằng việc chọn người hoặc đặt mốc khi phạm vi còn chưa rõ.",
      action: "Chọn một việc thật trong hai tuần tới và viết một trang kế hoạch cho nó hôm nay.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc thật của bạn, kéo dài khoảng hai tuần. Viết phạm vi làm và chưa làm, nhờ AI tách việc dưới hai ngày, hiệu chỉnh ước lượng bằng số của một việc cũ, đặt hai mốc kiểm có ngày, số đếm được và tên người. Đọc ngược tìm một khâu thiếu, rồi gửi trang đó cho một đồng nghiệp đọc thử.",
      secondary: "Ngày mai hỏi đồng nghiệp: chỗ nào trong trang họ phải đoán.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa đi qua bốn bài: viết phạm vi, chia việc, hiệu chỉnh ước lượng, soát bước thiếu. Bài này ghép chúng thành một trang giấy cho một việc thật của bạn, và bạn có thể gửi trang đó cho đồng nghiệp ngay hôm nay.",
      },
      {
        type: "feynman",
        title: "Kế hoạch một trang đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn chuẩn bị đi du lịch cuối tuần với ba người bạn. Bạn không cần một quyển sách hướng dẫn. Một tờ giấy ghi đi đâu, không đi đâu, ai đặt vé, mấy giờ kiểm tra lại là đủ cho cả nhóm.",
        columns: ["Trên tờ giấy", "Chuyến đi cuối tuần", "Dự án nhỏ của bạn"],
        rows: [
          ["Đi đâu, không đi đâu", "Ăn ở phố cổ, không đi núi", "Phạm vi làm và chưa làm"],
          ["Ai đặt vé", "Lan đặt xe, Minh đặt phòng", "Tên người nhận từng việc"],
          ["Mấy giờ kiểm lại", "Tối thứ năm hỏi xem đã có vé chưa", "Mốc kiểm có ngày và số đếm được"],
        ],
        oneLiner: "Một trang ngắn đủ để cả nhóm biết đích, việc của mình, và lúc nào kiểm.",
      },
      { type: "heading", text: "Bốn mảnh ghép" },
      {
        type: "paragraph",
        text: "Bạn đã biết phạm vi giúp cả nhóm cùng nhìn một chỗ, việc nhỏ dưới hai ngày giúp thấy trễ sớm, hệ số hiệu chỉnh giúp hẹn thật hơn, và đọc ngược giúp tìm khâu thiếu. Bài này không có thuật ngữ mới. Điều mới duy nhất là thứ tự: mảnh nào đặt trước mảnh nào.",
      },
      {
        type: "flow",
        title: "Từ ý định đến trang kế hoạch trong 20 phút",
        steps: [
          { label: "Viết phạm vi (4 phút)", detail: "Hai câu \"làm\", hai câu \"chưa làm ở đợt này\". Nếu phần chưa làm trống, phạm vi chưa đủ chặt." },
          { label: "Tách việc và ước lượng (6 phút)", detail: "Nhờ AI tách việc dưới hai ngày, ước lượng từng việc rồi nhân với hệ số từ việc cũ của bạn." },
          { label: "Đặt mốc và người (4 phút)", detail: "Hai mốc kiểm, mỗi mốc có ngày, một con số đếm được và một tên người xác nhận." },
          { label: "Đọc ngược và chia sẻ (6 phút)", detail: "Đọc từ kết quả cuối lên, thêm khâu thiếu, rồi nhờ một đồng nghiệp đọc thử và chỉ chỗ họ phải đoán." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu lệnh nhờ AI dựng trang kế hoạch",
        task: "Bạn sắp xếp lại kho tài liệu chung của phòng, 300 tệp, hai tuần, bốn người. Chọn từng phần của câu lệnh để AI dựng được bản nháp dùng được.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi",
            options: [
              { text: "Sắp xếp lại kho tài liệu cho gọn gàng và khoa học.", feedback: "\"Gọn gàng, khoa học\" không đo được. AI tự chọn cách sắp và có thể xoá những thứ bạn không muốn xoá." },
              { text: "Phân loại 300 tệp vào 6 thư mục, chưa xoá tệp nào, chưa đổi tên tệp, hai tuần.", good: true, feedback: "Có con số, có phần chưa làm, nên AI không thêm việc ngoài phạm vi." },
            ],
          },
          {
            id: "history",
            label: "Số liệu cũ",
            options: [
              { text: "Lần dọn trước ước 4 ngày, thực tế 6 ngày; hiệu chỉnh ước lượng theo tỷ lệ đó.", good: true, feedback: "AI có số thật của bạn để tính hệ số 1,5 thay vì tự đoán." },
              { text: "Ước lượng theo kinh nghiệm chung của AI về việc dọn kho.", feedback: "AI không có số liệu của bạn, nên đưa một con số nghe hợp lý nhưng không dựa trên đội bạn." },
            ],
          },
          {
            id: "output",
            label: "Điều cần nhận lại",
            options: [
              { text: "Một trang: phạm vi, danh sách việc có ngày, hai mốc kiểm, và câu hỏi cần hỏi lại tôi.", good: true, feedback: "Có bản một trang để chia sẻ và có danh sách chỗ AI chưa chắc để bạn bổ sung." },
              { text: "Kế hoạch chi tiết nhất có thể, càng dài càng tốt.", feedback: "Bạn nhận nhiều trang mà không ai đọc, và các chỗ AI tự đoán bị lẫn vào phần chắc chắn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "history", "output"],
            text: "PHẠM VI: phân loại 300 tệp vào 6 thư mục trong 2 tuần. Chưa làm: xoá tệp, đổi tên tệp.\nVIỆC (đã nhân hệ số 1,5): lập 6 thư mục (1 ngày); phân loại 100 tệp đầu (3 ngày); phân loại 200 tệp còn lại (5 ngày); rà lại (2 ngày).\nMỐC: ngày 5 xong 100 tệp, ngày 10 xong 300 tệp.\nCÂU HỎI: Ai xác nhận mỗi mốc? Có tệp nào cần hỏi phòng khác không?",
          },
          {
            requires: ["scope"],
            text: "PHẠM VI: phân loại 300 tệp vào 6 thư mục. VIỆC: phân loại, rà lại. Ước lượng: 6 ngày.\n(Có phạm vi chặt, nhưng thiếu số liệu cũ nên ước lượng chưa hiệu chỉnh, và không có mốc hay câu hỏi.)",
          },
          {
            text: "KẾ HOẠCH: Tổ chức lại kho tài liệu một cách khoa học. Xoá tệp trùng, đổi tên chuẩn hoá, phân loại lại toàn bộ, đào tạo nhân viên dùng quy trình mới.\n(Không có phạm vi chặt nên AI thêm cả xoá tệp, đổi tên và đào tạo mà bạn chưa hề yêu cầu.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thứ tự là chỗ dễ đảo nhất",
        text: "Người ta hay chọn người và đặt mốc trước vì đó là việc nghe có vẻ quyết đoán. Nhưng chưa có phạm vi và việc nhỏ thì cả người lẫn mốc đều đặt trên cát. Đi từ phạm vi xuống.",
      },
      {
        type: "scenario",
        title: "Bạn dựng trang kế hoạch như thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 20 phút cho trang kế hoạch dọn kho. Đồng nghiệp ngồi cạnh gợi ý: \"Cứ ghi tên mọi người và ngày bắt đầu trước, chi tiết tính sau.\" Bạn làm gì?",
            choices: [
              { label: "Ghi tên và ngày trước, phạm vi tính sau", next: "bad1" },
              { label: "Viết phạm vi làm và chưa làm trước", next: "s2" },
            ],
          },
          bad1: {
            text: "Bạn ghi bốn cái tên và ngày bắt đầu. Sang tuần thứ hai, hai người hỏi \"có xoá tệp cũ không?\" và hai người khác đã tự bắt đầu xoá. Phạm vi không có nên mỗi người làm một kiểu.",
            ending: "bad",
          },
          s2: {
            text: "Phạm vi đã có. AI tách việc và ước lượng 6 ngày. Bạn nhớ lần dọn trước ước 4 ngày mà mất 6 ngày.",
            choices: [
              { label: "Nhân 6 với hệ số 1,5 được 9 ngày, đặt hai mốc kiểm có tên người", next: "s3" },
              { label: "Giữ 6 ngày vì AI đã tính rồi", next: "bad2" },
            ],
          },
          bad2: {
            text: "Việc thật mất chín ngày. Mốc ngày 10 trong kế hoạch trễ hai ngày, và bạn phải xin đồng nghiệp làm thêm giờ để kịp hạn hai tuần.",
            ending: "bad",
          },
          s3: {
            text: "Bạn đọc ngược và thấy bước \"xoá tệp cũ\" chưa nằm trong phạm vi. Nhưng có một tệp cần hỏi phòng khác xem còn dùng không.",
            choices: [
              { label: "Thêm câu hỏi cho phòng khác vào trang và gửi đồng nghiệp đọc thử", next: "good1" },
              { label: "Bỏ qua, coi đó là việc nhỏ có thể tính sau", next: "bad3" },
            ],
          },
          good1: {
            text: "Đồng nghiệp đọc thử và hỏi thêm một câu về tệp cũ. Bạn sửa vào trang. Hai tuần sau kho được phân loại xong đúng hạn, không có tệp nào bị mất.",
            ending: "good",
          },
          bad3: {
            text: "Một tệp hợp đồng cũ nằm trong thư mục bị dời đi và phòng kế toán không tìm thấy. Mất nửa ngày để tìm lại, và uy tín của kế hoạch giảm vì một chi tiết đã có thể hỏi từ đầu.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Phạm vi: hai câu làm, hai câu chưa làm.",
          "Bước 2 - Việc dưới hai ngày, ước lượng nhân hệ số cũ.",
          "Bước 3 - Hai mốc kiểm, mỗi mốc có ngày, số đếm được, tên người.",
          "Bước 4 - Đọc ngược, thêm khâu thiếu, nhờ một người đọc thử.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang kế hoạch ngắn nhưng chặt, có người và có mốc, tốt hơn mười trang không ai đọc.",
          "Hôm nay hãy dựng một trang cho một việc thật của bạn.",
        ],
      },
    ],
  },
];
