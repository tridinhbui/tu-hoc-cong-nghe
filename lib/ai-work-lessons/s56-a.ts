import type { Lesson } from "../lesson-types";

// Chặng 56, bài 1-5. Giáo trình: scripts/curriculum/stage-56.json.
// Không nêu đường dẫn nút bấm, giá hay tính năng riêng của công cụ nào: chỉ dạy cách giao việc và kiểm kết quả.

type Quiz = Lesson["quiz"][number];
// Đáp án đúng đặt ở vị trí 0; vị trí được xáo lại lúc build (lib/lesson-quiz-balance.js).
const q = (question: string, right: string, wrong: [string, string, string], explanation: string): Quiz => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S56_A_LESSONS: Lesson[] = [
  {
    id: 2520,
    slug: "trang-gioi-thieu-dau-tien-cho-ai",
    title: "Chặng 56, Bài 1: Bạn cần một trang giới thiệu cho ai, để họ làm gì",
    subtitle: "Trước khi nhờ AI dựng gì, hãy viết ba câu: ai xem, cần biết gì, bấm nút nào.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhờ AI dựng trang khi chưa biết trang dành cho ai thì AI sẽ dựng một trang chung chung, đẹp nhưng không ai bấm. Ba câu viết trước mất năm phút, và tiết kiệm được cả buổi sửa đi sửa lại những thứ không ai cần.",
    openingQuestion:
      "Chị Hoa bán bánh tự làm muốn có một trang web. Chị gõ cho AI: \"Làm cho tôi trang web bán bánh thật đẹp.\" Điều gì dễ xảy ra nhất?",
    openingOptions: [
      "AI dựng trang chung chung vì chưa biết khách",
      "AI hỏi lại chị đủ mọi thứ rồi mới dựng đúng ý chị",
      "AI tự biết chị bán bánh gì và giá bao nhiêu để điền",
      "AI dựng đúng trang mà chị đang nghĩ trong đầu",
    ],
    correctOption: 0,
    explanation:
      "AI chỉ đọc được những gì bạn gõ. Câu \"thật đẹp\" không nói khách là ai, họ cần gì, bấm nút nào, nên AI điền vào chỗ trống bằng những thứ phổ biến nhất: khẩu hiệu chung chung, ảnh mẫu, giá tự nghĩ ra. Nó thường không hỏi lại mà cứ dựng luôn, và nó không biết chị bán bánh gì. Ba câu trả lời về người xem, điều họ cần và nút họ bấm là thứ duy nhất làm trang thành của chị.",
    diagram: [
      { label: "Ai sẽ mở trang này?", arrow: true },
      { label: "Họ cần biết gì trong vài giây đầu?", arrow: true },
      { label: "Họ nên bấm nút nào?", arrow: true },
      { label: "Ba câu đó làm đề bài cho AI" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một tiệm bánh tại nhà dựng trang mà chưa nghĩ ai xem: trang có đủ lịch sử tiệm, câu chuyện người làm bánh, nhưng số điện thoại đặt bánh nằm tận cuối. Khách từ tin nhắn giới thiệu chỉ muốn biết giá và cách đặt, lướt một lúc rồi thoát. Sau khi viết lại ba câu, tiệm đưa nút \"Đặt bánh\" lên ngay đầu trang. Đây là tình huống giả định để minh hoạ, không phải số liệu có thật.",
    },
    quiz: [
      q(
        "Trước khi nhờ AI dựng trang, việc nào nên làm đầu tiên?",
        "Viết ra người xem là ai và họ cần làm gì trên trang",
        ["Chọn màu chủ đạo và kiểu chữ cho cả trang", "Xin AI gợi ý ba mẫu trang đẹp nhất", "Đặt tên miền và chọn chỗ lưu trang"],
        "Màu sắc, mẫu trang và tên miền đều có thể chọn sau, vì chúng phụ thuộc vào người xem và điều họ cần. Nếu chưa biết ai xem và họ cần làm gì thì mọi lựa chọn sau đó chỉ là đoán. Hỏi AI xin mẫu đẹp khi chưa có đề bài sẽ ra mẫu chung chung cho mọi người.",
      ),
      q(
        "\"Nút chính\" của một trang giới thiệu tiệm bánh nên là gì?",
        "Gọi hoặc nhắn tin để đặt bánh",
        [
          "Xem toàn bộ lịch sử tiệm từ ngày đầu mở cửa",
          "Theo dõi trang mạng xã hội để nhận tin mới",
          "Đọc thêm về đội ngũ làm bánh của tiệm",
        ],
        "Nút chính là việc bạn muốn người xem làm nhất. Với tiệm bánh đó là đặt bánh hoặc gọi. Theo dõi trang mạng xã hội hay đọc lịch sử là việc phụ, để ở dưới. Khi nút chính mờ nhạt hoặc có quá nhiều nút ngang nhau, khách không biết bấm gì và thường thoát ra.",
      ),
      q(
        "Một trang nên có bao nhiêu \"việc chính\" cho người xem ở lần đầu?",
        "Một việc chính, còn lại là việc phụ bên dưới",
        [
          "Ba việc ngang nhau để khách tự chọn việc nào tuỳ thích",
          "Càng nhiều việc càng tốt để trang trông đầy đặn hơn",
          "Hai việc: khách mới và khách cũ",
        ],
        "Trang đầu tiên của người mới chỉ nên dẫn người xem tới một việc chính, ví dụ gọi đặt bánh. Ba việc ngang nhau làm khách phân vân, còn chất thêm cho đầy thì trang rối. Hai việc cho hai loại khách là hợp lý ở trang lớn sau này, chưa phải ở trang giới thiệu đầu tiên.",
      ),
      q(
        "Chị Hoa viết: \"Khách là mẹ trẻ 25-40 tuổi, cần biết giá, cách đặt, xem bánh trên điện thoại.\" Câu này dùng để làm gì?",
        "Làm đề bài để AI quyết định bố cục và thứ tự các phần",
        [
          "Đăng lên trang như lời giới thiệu tiệm để khách đọc",
          "Chỉ để chị tự đọc lại, AI không cần biết những điều này",
          "Dùng để AI tự tìm khách và gửi tin quảng cáo cho họ",
        ],
        "Câu mô tả người xem là bản ghi chú cho người làm, chứ không phải lời quảng cáo. Nó cho AI biết ưu tiên giá, cách đặt và màn hình điện thoại. AI không tự tìm khách hay gửi tin, và thiếu câu này nó sẽ đoán sai người xem.",
      ),
      q(
        "Vì sao nên viết ba câu ra giấy hoặc ghi chú trước, không gõ thẳng cho AI?",
        "Viết ra buộc bạn quyết định, rồi dán vào là có đề bài rõ ràng",
        [
          "Vì AI chỉ đọc được chữ viết sẵn trên giấy, không đọc chữ gõ vào khung chat",
          "Vì gõ thẳng vào khung chat luôn tốn nhiều tiền hơn chép từ ghi chú",
          "Vì ba câu trên giấy có thể thay cho mọi lần nhờ AI sau này",
        ],
        "Điều quý là bạn phải nghĩ xong trước khi nhờ. Khi đã có ba câu, dán cho AI là xong đề bài. AI đọc chữ gõ trực tiếp bình thường, không tốn thêm tiền. Và ba câu chỉ là đề bài cho trang này, mỗi trang hay mỗi việc mới cần được xác định lại.",
      ),
    ],
    keyTakeaways: [
      "Trước khi nhờ AI dựng trang, viết ba câu: ai xem, cần biết gì, bấm nút nào.",
      "Mỗi trang đầu tiên chỉ có một việc chính cho người xem.",
      "AI không biết việc của bạn; thiếu ba câu đó nó điền bằng thứ phổ biến.",
      "Ba câu là ghi chú cho người làm, không phải chữ đăng lên trang.",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn mở phòng tập yoga nhỏ, muốn một trang giới thiệu. Anh nên viết câu nào làm câu thứ ba (nút chính)?",
      options: [
        "Người xem bấm \"Đăng ký buổi tập thử\"",
        "Người xem đọc hết bài viết về lịch sử môn yoga trên trang",
        "Người xem bấm vào mọi nút mạng xã hội, bản đồ và email cùng lúc",
        "Người xem thấy trang đẹp và nhớ tên phòng tập",
      ],
      correct: 0,
      explanation:
        "Nút chính là một hành động cụ thể, đo được: đăng ký tập thử. Đọc lịch sử yoga không đưa khách đến phòng tập. Bấm mọi nút cùng lúc là nhiều việc ngang nhau, không phải một việc chính. Thấy đẹp và nhớ tên là cảm nhận, không phải hành động để kiểm tra trang có hiệu quả hay không.",
    },
    summary: {
      keyIdea: "Trang tốt bắt đầu từ ba câu trả lời, không phải từ một mẫu đẹp.",
      formula: "Ai xem + cần biết gì + bấm nút nào = đề bài cho AI.",
      commonMistake: "Nhờ AI \"dựng trang đẹp\" khi chưa biết ai xem và họ cần làm gì.",
      action: "Viết ba câu cho trang của bạn vào ghi chú điện thoại trước khi mở AI.",
    },
    application: {
      title: "Viết ba câu trong 15 phút",
      message:
        "Chọn một việc của chính bạn cần có trang giới thiệu (cửa hàng, dịch vụ, lớp học, nhóm). Viết đúng ba câu: người xem là ai; họ cần biết gì trong 10 giây đầu; họ nên bấm nút nào. Đọc lại và gạch bớt nếu có hai nút chính. Mai bạn sẽ được hỏi ba câu đó là gì.",
      secondary: "Đưa ba câu cho một người quen và hỏi họ hiểu trang này để làm gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Bảy, chị Hoa ngồi trước máy tính, định nhờ AI làm cho tiệm bánh một trang web. Chị gõ được một câu rồi dừng: trang này dành cho ai, để họ làm gì? Bài này trả lời câu đó trước khi AI dựng bất cứ thứ gì.",
      },
      {
        type: "feynman",
        title: "Trang giới thiệu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tấm bảng hiệu trước cửa tiệm bánh. Người đi ngang chỉ nhìn ba giây: tiệm bán gì, có hợp với mình không, vào hay đi tiếp. Trang web chính là tấm bảng đó, chỉ khác là người đi ngang đang cầm điện thoại.",
        columns: ["Câu hỏi", "Bảng hiệu trước tiệm", "Trang giới thiệu"],
        rows: [
          ["Ai nhìn?", "Người đi ngang qua phố", "Người mở trang từ tin nhắn hay tìm kiếm"],
          ["Họ cần biết gì?", "Tiệm bán gì, mở cửa chưa", "Bán gì, giá thế nào, đặt ra sao"],
          ["Hành động", "Bước vào tiệm", "Bấm nút gọi hoặc đặt bánh"],
        ],
        oneLiner: "Trang web là tấm bảng hiệu: ai nhìn, cần biết gì, rồi bước vào đâu.",
      },
      { type: "heading", text: "Ba câu cần viết trước khi nhờ AI" },
      {
        type: "paragraph",
        text: "AI giống một người thợ làm theo bản vẽ. Nếu bạn đưa bản vẽ trống, anh ta dựng theo thói quen của anh ta. Ba câu dưới đây là bản vẽ ngắn nhất có thể có, và bạn viết được trong vài phút.",
      },
      {
        type: "flow",
        title: "Từ ba câu tới đề bài cho AI",
        steps: [
          { label: "Ai xem", detail: "Mô tả người xem bằng việc họ đang làm: mẹ trẻ đang tìm bánh sinh nhật cho con, xem trên điện thoại, cần giá ngay." },
          { label: "Họ cần biết gì", detail: "Liệt kê điều họ tìm trong vài giây đầu: bánh gì, giá khoảng bao nhiêu, đặt trước mấy ngày. Đừng thêm điều bạn thích kể nhưng họ không hỏi." },
          { label: "Họ bấm nút nào", detail: "Chọn một hành động chính, ví dụ gọi hoặc nhắn tin đặt bánh. Các việc khác là phụ và nằm bên dưới." },
          { label: "Dán thành đề bài", detail: "Ba câu đó là phần mở đầu của yêu cầu cho AI ở các bài sau. Không cần viết hay, chỉ cần đủ ý và thật." },
        ],
      },
      {
        type: "list",
        items: [
          "Câu 1 - Người xem: ai, đang ở đâu, dùng thiết bị gì.",
          "Câu 2 - Điều họ cần biết: bán gì, giá, cách liên hệ.",
          "Câu 3 - Nút chính: một hành động cụ thể, không phải \"khám phá thêm\".",
          "Kiểm: đưa ba câu cho một người quen, hỏi họ hiểu trang này để làm gì.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đề bài mơ hồ",
          text: "\"Làm trang web bán bánh thật đẹp.\" AI không biết khách là ai nên dựng trang chung chung, đầy khẩu hiệu và ảnh mẫu, còn số điện thoại nằm đâu cũng được.",
        },
        right: {
          label: "Đề bài ba câu",
          text: "\"Khách là mẹ trẻ xem bằng điện thoại, cần biết giá và cách đặt, nút chính là Gọi đặt bánh.\" AI đưa giá và nút gọi lên đầu, bỏ phần dài dòng.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Ba câu là ghi chú cho người làm, không phải chữ đăng lên trang. Đừng bắt AI chép nguyên văn ba câu đó thành tiêu đề, và đừng để nó tự điền giá hay giờ mở cửa khi bạn chưa cho (bài 3 sẽ nói kỹ).",
      },
      {
        type: "scenario",
        title: "Chị Hoa chuẩn bị nhờ AI dựng trang",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Hoa đã mở AI. Chị định gõ yêu cầu đầu tiên. Chị có tiệm bánh nhỏ, khách chủ yếu nhắn tin hỏi giá rồi đặt trước vài ngày.",
            choices: [
              { label: "Gõ ngay \"Làm trang bán bánh thật đẹp\" rồi chờ xem AI dựng gì", next: "bad_vague" },
              { label: "Viết trước ba câu: ai xem, cần biết gì, bấm nút nào", next: "s2" },
            ],
          },
          bad_vague: {
            text: "AI dựng một trang đủ thứ: khẩu hiệu \"Hương vị của yêu thương\", ảnh mẫu nước ngoài, bảng giá tự nghĩ ra. Chị mất một buổi gỡ từng thứ, và vẫn chưa có chỗ nào nói cách đặt bánh.",
            ending: "bad",
          },
          s2: {
            text: "Chị viết: khách là mẹ trẻ xem bằng điện thoại, cần biết giá và đặt trước mấy ngày. Khi chị nghĩ nút chính, chị phân vân giữa \"Đặt bánh\" và \"Xem câu chuyện tiệm\".",
            choices: [
              { label: "Chọn cả hai làm nút chính cho công bằng", next: "bad_two" },
              { label: "Chọn \"Đặt bánh\" làm nút chính, câu chuyện tiệm để phần phụ phía dưới", next: "s3" },
            ],
          },
          bad_two: {
            text: "Hai nút to ngang nhau ở đầu trang. Khách mới bấm \"Xem câu chuyện\", đọc một lúc rồi quay lại tin nhắn mà không đặt bánh.",
            ending: "bad",
          },
          s3: {
            text: "Chị dán ba câu cho AI và đưa một người bạn đọc thử. Bạn chị nói: \"Trang này để đặt bánh, đúng không?\"",
            choices: [
              { label: "Xác nhận đúng, rồi nhờ AI dựng theo ba câu đó ở bài sau", next: "good" },
              { label: "Bỏ ý kiến bạn, vì ba câu do mình viết thì mình biết rõ hơn", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Chị bỏ qua lời nhận xét. Hai tuần sau một khách khác cũng hỏi \"trang này bán hay chỉ để xem?\", vì ba câu vẫn chưa rõ với người ngoài.",
            ending: "bad",
          },
          good: {
            text: "Ba câu đủ rõ: người ngoài đọc xong là hiểu trang để đặt bánh. Chị có đề bài để giao AI ở bài sau, và không phải gỡ thứ thừa.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba câu: ai xem, cần biết gì, bấm nút nào.",
          "Bài sau: nhờ AI mô tả trang từ trên xuống dưới, rồi bạn gạch bớt.",
        ],
      },
    ],
  },
  {
    id: 2521,
    slug: "mo-ta-trang-bang-loi-thuong",
    title: "Chặng 56, Bài 2: Mô tả trang bằng lời thường: từ trên xuống dưới",
    subtitle: "Liệt kê các phần theo thứ tự cuộn, nhờ AI đề xuất bố cục, rồi bạn gạch bớt.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📜",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn không cần biết thuật ngữ thiết kế. Chỉ cần nói \"đầu trang có gì, rồi tới đâu, cuối trang có gì\" là AI hiểu. Có danh sách phần theo thứ tự cuộn, bạn gạch bớt dễ hơn nhiều so với sửa một trang đã dựng xong.",
    openingQuestion:
      "Anh Tuấn nhờ AI: \"Đề xuất bố cục trang giới thiệu phòng tập yoga, người xem dùng điện thoại, nút chính là đăng ký tập thử.\" AI trả về tám phần. Anh nên làm gì tiếp?",
    openingOptions: [
      "Đọc từng phần, gạch phần thừa rồi giữ phần cần",
      "Giữ cả tám phần vì AI đề xuất thì chắc chắn đều cần thiết",
      "Nhờ AI thêm tám phần nữa cho trang đầy đặn chuyên nghiệp",
      "Xoá hết rồi tự nghĩ lại bố cục mà không xem gì của AI",
    ],
    correctOption: 0,
    explanation:
      "AI đưa danh sách đầy đủ theo thói quen của nhiều trang khác, chứ không theo phòng tập của anh Tuấn. Việc của anh là cắt: phần nào giúp người xem tới nút đăng ký thì giữ, phần nào chỉ để cho đủ bộ thì bỏ. Giữ hết thì trang dài và loãng, xoá hết thì bỏ phí phần AI làm nhanh, còn thêm phần nữa chỉ làm trang rối thêm.",
    diagram: [
      { label: "Ba câu của bài 1", arrow: true },
      { label: "Nhờ AI liệt kê các phần theo thứ tự cuộn", arrow: true },
      { label: "Bạn gạch bớt phần không phục vụ nút chính", arrow: true },
      { label: "Danh sách phần cuối cùng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng tập nhỏ nhận danh sách tám phần từ AI: đầu trang, giới thiệu, lợi ích, lịch tập, giáo viên, cảm nhận học viên, câu hỏi thường gặp, liên hệ. Chủ phòng chỉ có ba học viên sẵn lòng viết cảm nhận nên bỏ phần đó, và gộp câu hỏi thường gặp vào phần liên hệ. Trang còn sáu phần, đúng những gì người xem điện thoại cần để đăng ký. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "\"Theo thứ tự cuộn\" nghĩa là gì khi mô tả trang?",
        "Liệt kê các phần từ đầu tới cuối trang, theo thứ tự lướt xuống",
        [
          "Sắp xếp các phần theo thứ tự chữ cái tên của chúng",
          "Xếp phần quan trọng nhất ở dưới cùng của trang",
          "Sắp theo thứ tự bạn viết xong từng phần nội dung",
        ],
        "Người xem điện thoại lướt từ trên xuống, nên thứ tự các phần quyết định họ thấy gì trước. Sắp theo chữ cái hay theo thời gian bạn viết không liên quan tới cách người đọc lướt. Phần quan trọng nhất ở dưới cùng là cách làm ngược: nhiều người thoát trước khi tới đó.",
      ),
      q(
        "Phần nào thường nên nằm ngay đầu trang của một phòng tập nhỏ?",
        "Tên phòng tập, một câu nói bán gì, và nút đăng ký",
        [
          "Lịch sử thành lập phòng tập cùng ảnh chụp các buổi khai trương",
          "Một bài viết dài về lợi ích của yoga với sức khoẻ con người",
          "Danh sách tất cả các khoá học cùng học phí từng khoá",
        ],
        "Đầu trang phải trả lời ngay: đây là gì, tôi làm gì tiếp. Tên, một câu giải thích và nút chính làm đủ việc đó. Lịch sử, bài dài hay bảng giá đầy đủ đều có chỗ của chúng ở phía dưới, dành cho người đã quan tâm và muốn tìm hiểu thêm.",
      ),
      q(
        "AI đề xuất một phần \"Cảm nhận học viên\" nhưng bạn chưa có lời nào thật. Nên làm gì?",
        "Gạch phần đó, khi có lời thật thì thêm sau",
        [
          "Nhờ AI viết vài lời cảm nhận cho đẹp rồi đăng",
          "Giữ khung trống và điền sau một năm",
          "Copy cảm nhận từ trang web của phòng tập khác",
        ],
        "Cảm nhận là lời của người thật, nên không thể nhờ AI viết hay chép từ nơi khác: đó là bịa hoặc vi phạm và làm mất lòng tin. Để khung trống trên trang cũng khiến khách nghi ngờ. Gạch đi, và thêm khi có lời thật, đúng với nguyên tắc chỉ đăng điều có thật.",
      ),
      q(
        "Khi nhờ AI đề xuất bố cục, thông tin nào nên đưa cho nó?",
        "Ba câu của bài 1, thiết bị người xem và số phần tối đa",
        [
          "Chỉ cần tên trang, còn lại AI sẽ tự hiểu phần cần thiết",
          "Toàn bộ thông tin cá nhân của bạn như số chứng minh",
          "Một mẫu trang của đối thủ để AI chép y nguyên lại",
        ],
        "AI đề xuất tốt khi biết người xem, việc chính và giới hạn (ví dụ sáu phần, xem bằng điện thoại). Chỉ có tên thì nó đoán. Thông tin cá nhân như số chứng minh không liên quan và không nên đưa. Chép nguyên trang đối thủ là sao chép và cũng không hợp với phòng tập của bạn.",
      ),
      q(
        "Danh sách phần AI đưa dài 10 mục, nút chính chỉ cần 4-5 mục. Cách cắt nào hợp lý?",
        "Giữ phần nào giúp người xem tới nút chính, gộp hoặc bỏ phần còn lại",
        [
          "Bỏ các phần cuối cùng của trang vì người xem thường không lướt tới tận đó",
          "Giữ đủ 10 mục và thu nhỏ chữ cho vừa màn hình",
          "Bỏ ngẫu nhiên năm mục cho ngắn rồi xem kết quả",
        ],
        "Tiêu chí cắt là có giúp người xem tới nút chính hay không, không phải vị trí. Phần cuối như liên hệ lại rất cần. Thu nhỏ chữ làm khó đọc trên điện thoại, còn bỏ ngẫu nhiên có thể bỏ mất phần quan trọng như giá hay cách đặt.",
      ),
    ],
    keyTakeaways: [
      "Mô tả trang theo thứ tự cuộn: đầu trang, giữa, cuối trang.",
      "AI đề xuất đủ bộ theo thói quen; bạn cắt theo nút chính.",
      "Chỉ giữ phần bạn có nội dung thật: không có thì gạch.",
      "Đưa cho AI ba câu, thiết bị người xem và số phần tối đa.",
    ],
    practicePrompt: {
      question:
        "Bạn nhờ AI đề xuất bố cục trang cho lớp học nấu ăn cuối tuần. Đâu là phần chắc chắn phải có?",
      options: [
        "Lịch lớp, học phí và cách đăng ký",
        "Bài viết dài về lịch sử món ăn Việt từ thời xưa",
        "Mười ảnh chụp món ăn đã làm ở các lớp cũ",
        "Bản đồ thế giới các nước có món tương tự",
      ],
      correct: 0,
      explanation:
        "Người xem cần biết lớp diễn ra khi nào, giá bao nhiêu, đăng ký thế nào: đó là thứ dẫn tới nút chính. Lịch sử món ăn, mười ảnh và bản đồ đều có thể hay, nhưng không giúp ai đăng ký nếu thiếu ba thông tin kia. Có ảnh thật thì nên thêm vài tấm, nhưng không phải phần bắt buộc.",
    },
    summary: {
      keyIdea: "Mô tả trang bằng lời thường từ trên xuống, rồi cắt bớt.",
      formula: "Ba câu + thiết bị người xem + số phần tối đa = bố cục AI đề xuất, bạn gạch.",
      commonMistake: "Giữ mọi phần AI đưa ra vì tin rằng đủ bộ thì chuyên nghiệp.",
      action: "Viết danh sách 5-6 phần trang của bạn theo thứ tự cuộn.",
    },
    application: {
      title: "Lập danh sách phần trong 20 phút",
      message:
        "Lấy ba câu đã viết ở bài 1. Nhờ một công cụ AI bạn hay dùng đề xuất các phần của trang theo thứ tự cuộn, tối đa 6 phần, xem bằng điện thoại. Gạch mọi phần bạn chưa có nội dung thật, rồi chép danh sách còn lại vào ghi chú. Mai bạn sẽ được hỏi trang bạn còn mấy phần.",
      secondary: "Ghi bên cạnh mỗi phần: nội dung thật lấy từ đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Anh Tuấn đã có ba câu cho phòng tập yoga. Giờ anh cần nói cho AI biết trang gồm những phần nào, theo thứ tự nào. Bạn không cần biết thuật ngữ thiết kế: chỉ cần kể trang từ đầu đến cuối như kể đường đi.",
      },
      {
        type: "feynman",
        title: "Mô tả trang đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn chỉ đường cho một người lạ đi từ cổng vào tới phòng tập: qua cổng, rẽ trái, cầu thang, phòng thứ hai bên phải. Mô tả trang cũng vậy: người xem đi từ đầu trang xuống cuối, bạn nói họ gặp gì ở mỗi chặng.",
        columns: ["Chỉ đường", "Bản đồ đi bộ", "Mô tả trang"],
        rows: [
          ["Điểm xuất phát", "Cổng vào toà nhà", "Đầu trang: tên và nút chính"],
          ["Các chặng giữa", "Rẽ trái, lên cầu thang", "Các phần: giới thiệu, lịch, giá"],
          ["Điểm đến", "Cửa phòng tập", "Cuối trang: liên hệ"],
        ],
        oneLiner: "Mô tả trang là chỉ đường từ đầu trang xuống cuối trang, từng chặng một.",
      },
      { type: "heading", text: "Kể trang theo thứ tự cuộn" },
      {
        type: "paragraph",
        text: "Hãy viết mỗi phần một dòng, theo thứ tự người xem lướt xuống: đầu trang, giới thiệu, lịch và giá, liên hệ. Mỗi dòng chỉ cần nói phần đó để làm gì cho người xem. Nếu không nói được, phần đó có thể thừa.",
      },
      {
        type: "flow",
        title: "Từ danh sách của bạn đến bố cục cuối cùng",
        steps: [
          { label: "Bạn đưa ba câu", detail: "Người xem, điều họ cần, nút chính, cùng ghi chú: xem bằng điện thoại, tối đa sáu phần." },
          { label: "AI đề xuất danh sách", detail: "AI liệt kê các phần theo thứ tự cuộn, thường đủ bộ giống nhiều trang khác, trong đó có phần bạn chưa cần." },
          { label: "Bạn gạch bớt", detail: "Giữ phần giúp người xem tới nút chính và phần bạn có nội dung thật. Gạch phần còn lại, gộp phần gần nhau." },
          { label: "Bạn chốt danh sách", detail: "Danh sách ngắn này là đề bài cho các bài dựng từng phần sau." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Danh sách AI đề xuất",
          text: "Mười mục: đầu trang, giới thiệu, lợi ích, khoá học, giá, giáo viên, cảm nhận, câu hỏi, blog, liên hệ. Đủ bộ nhưng dài, nhiều mục bạn chưa có nội dung.",
        },
        right: {
          label: "Danh sách sau khi gạch",
          text: "Sáu mục: đầu trang, giới thiệu, lịch và giá, giáo viên, câu hỏi thường gặp, liên hệ. Mỗi mục bạn đã có nội dung thật.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI đề xuất bố cục trang phòng tập",
        task: "Anh Tuấn muốn AI liệt kê các phần trang giới thiệu phòng tập yoga. Hãy lắp prompt sao cho AI trả về danh sách vừa đủ.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Làm trang web cho tôi.", feedback: "AI không biết trang cho ai, việc gì; nó sẽ liệt kê đủ bộ chung chung cho mọi loại trang." },
              {
                text: "Phòng tập yoga nhỏ; khách là người đi làm 25-45 tuổi xem bằng điện thoại; nút chính là đăng ký tập thử.",
                good: true,
                feedback: "Có người xem, thiết bị và nút chính: AI ưu tiên đúng các phần giúp đăng ký.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Liệt kê các phần của trang theo thứ tự cuộn, mỗi phần một dòng nói phần đó để làm gì.",
                good: true,
                feedback: "Đúng hình thức danh sách để bạn gạch bớt: mỗi dòng giải thích mục đích nên bạn biết phần nào thừa.",
              },
              { text: "Viết luôn toàn bộ nội dung cho cả trang.", feedback: "AI sẽ tự bịa giá, lịch, tên giáo viên; bạn chưa có bố cục đã phải xoá chữ giả." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Càng nhiều phần càng tốt.", feedback: "AI đưa mười mấy phần, trong đó nhiều phần bạn không có nội dung; bạn mất công gạch." },
              { text: "Tối đa 6 phần; không thêm phần nào cần nội dung tôi chưa có như cảm nhận học viên.", good: true, feedback: "Giới hạn số phần và nói rõ điều tránh nên danh sách ngắn và không có phần phải bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "limit"],
            text: "Bố cục 6 phần (xem bằng điện thoại):\n1. Đầu trang: tên phòng tập, một câu nói bán gì, nút \"Đăng ký tập thử\".\n2. Giới thiệu: phòng tập dành cho ai, tập thế nào.\n3. Lịch và giá: các buổi trong tuần, học phí bạn cung cấp.\n4. Giáo viên: ảnh và vài dòng bạn viết.\n5. Câu hỏi thường gặp: 3-4 câu.\n6. Liên hệ: số điện thoại, địa chỉ, nút gọi.",
          },
          {
            requires: ["context"],
            text: "Bố cục gợi ý:\n1. Đầu trang. 2. Giới thiệu. 3. Lợi ích của yoga. 4. Các khoá học. 5. Bảng giá. 6. Giáo viên. 7. Cảm nhận học viên. 8. Câu hỏi thường gặp. 9. Blog. 10. Liên hệ.\n\n(Đúng người xem nhưng quá dài, lẫn phần cần nội dung bạn chưa có.)",
          },
          {
            text: "Trang chủ gồm: banner lớn, giới thiệu công ty, dịch vụ, khách hàng tiêu biểu, đối tác, tin tức, tuyển dụng, liên hệ.\n\n(Khuôn chung của một trang công ty: không biết đây là phòng tập, nên có \"đối tác\", \"tuyển dụng\" chẳng liên quan.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "AI đề xuất theo số đông các trang nó từng đọc, không theo việc của bạn. Phần cuối cùng quyết định vẫn là bạn: phần nào có nội dung thật và giúp người xem tới nút chính thì giữ.",
      },
      {
        type: "scenario",
        title: "Anh Tuấn gạch danh sách mười mục",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả về mười mục. Anh Tuấn chỉ có ảnh một giáo viên, bảng giá và lịch tập. Anh chưa có lời học viên nào.",
            choices: [
              { label: "Giữ cả mười mục rồi nhờ AI điền nội dung cho đủ", next: "bad_fill" },
              { label: "Gạch các mục anh chưa có nội dung thật, giữ sáu mục", next: "s2" },
            ],
          },
          bad_fill: {
            text: "AI điền ba lời học viên với tên và lời khen nghe rất thật. Một học viên thật đọc thấy và hỏi: \"Em có nói vậy bao giờ đâu?\"",
            ending: "bad",
          },
          s2: {
            text: "Còn sáu mục. Anh muốn dán danh sách cho AI ở bước sau, và băn khoăn nên dán kèm điều gì.",
            choices: [
              { label: "Dán danh sách kèm thứ tự cuộn và nút chính ở mục đầu", next: "good" },
              { label: "Dán danh sách nhưng xáo thứ tự cho trang trông khác biệt", next: "bad_order" },
            ],
          },
          bad_order: {
            text: "Phần liên hệ xuất hiện trước phần giới thiệu, và nút đăng ký tụt xuống giữa trang. Người xem điện thoại phải lướt mới thấy nút, nhiều người thoát ra trước đó.",
            ending: "bad",
          },
          good: {
            text: "Danh sách sáu mục đúng thứ tự, nút chính ở đầu trang. Anh có đề bài rõ để giao AI từng phần ở các bài sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mô tả trang từ trên xuống, để AI đề xuất và bạn gạch bớt.",
          "Bài sau: gom nội dung thật trước khi dựng.",
        ],
      },
    ],
  },
  {
    id: 2522,
    slug: "chon-noi-dung-that-truoc-khi-dung",
    title: "Chặng 56, Bài 3: Gom nội dung thật trước: ảnh, giá, số điện thoại, giờ mở cửa",
    subtitle: "AI không biết cửa hàng bạn mở lúc mấy giờ. Bạn đưa thông tin thật, nó mới không bịa.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chữ giả trên trang là loại lỗi nguy hiểm: trông đúng, nên không ai sửa. Khách gọi số sai, tới cửa lúc tiệm đã đóng, hay thấy giá khác giá thật đều mất lòng tin. Gom thông tin thật vào một bảng trước khi dựng thì AI chỉ việc điền, không bịa.",
    openingQuestion:
      "Chị Hoa nhờ AI dựng phần liên hệ cho tiệm bánh nhưng chưa đưa số điện thoại hay giờ mở cửa. AI trả về trang có số điện thoại, giờ mở cửa và địa chỉ rất đầy đủ. Điều gì đang xảy ra?",
    openingOptions: [
      "AI tự nghĩ ra những thông tin trông thật vì bị thiếu",
      "AI tra được thông tin thật của tiệm qua mạng xã hội",
      "AI đoán đúng vì tiệm bánh nào cũng mở cùng giờ đó",
      "AI lấy thông tin từ hồ sơ đăng ký kinh doanh của chị",
    ],
    correctOption: 0,
    explanation:
      "AI viết chữ nghe hợp lý, không tra cứu tiệm của chị. Khi thiếu số điện thoại hay giờ mở cửa, nó điền giá trị trông thật, vì một trang liên hệ \"đầy đủ\" là khuôn quen thuộc. Nó không có quyền xem hồ sơ kinh doanh hay mạng xã hội của chị, và giờ mở cửa mỗi tiệm mỗi khác. Vì vậy bảng thông tin thật phải do chị chuẩn bị và đưa vào.",
    diagram: [
      { label: "Bạn gom thông tin thật vào một bảng", arrow: true },
      { label: "Dán bảng cho AI, dặn: chỉ dùng thông tin trong bảng", arrow: true },
      { label: "AI điền vào trang", arrow: true },
      { label: "Bạn đối chiếu từng số với bảng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một tiệm sửa xe nhờ AI dựng trang. Bản nháp có giờ mở cửa \"8h-20h\" và số điện thoại đầu 090, trong khi tiệm đóng cửa lúc 18h và số thật khác. Chủ tiệm đọc lướt nên bỏ qua; tuần đầu có khách tới lúc 19h thấy cửa đóng. Nếu đưa bảng thông tin thật trước, AI chỉ chép lại. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Vì sao AI có thể điền số điện thoại nghe rất thật dù bạn chưa cung cấp?",
        "Nó sinh chữ trông hợp lý, không tra thông tin thật của bạn",
        [
          "Nó đã lưu sẵn thông tin liên hệ mọi doanh nghiệp trong thành phố của bạn",
          "Nó kết nối với danh bạ điện thoại của bạn để lấy số đúng",
          "Nó đoán đúng theo thống kê số điện thoại phổ biến nhất",
        ],
        "AI sinh chữ có xác suất cao, nên một số điện thoại trông thật là đầu ra bình thường khi thiếu dữ liệu. Nó không có sẵn danh bạ doanh nghiệp và không tự đọc danh bạ của bạn. Đoán theo thống kê cũng không ra số thật của bạn, chỉ ra một dãy số nghe giống thật.",
      ),
      q(
        "Bảng thông tin thật nên gồm những gì cho trang của một tiệm nhỏ?",
        "Tên, địa chỉ, giờ mở cửa, số điện thoại, giá, ảnh thật",
        [
          "Chỉ cần tên tiệm và vài dòng giới thiệu ngắn",
          "Tên tiệm và khẩu hiệu ngắn gọn mà AI tự nghĩ giúp",
          "Giá các món, cùng mức giảm giá AI gợi ý thêm cho hấp dẫn",
        ],
        "Mọi thứ khách cần để liên hệ và quyết định phải nằm trong bảng: địa chỉ, giờ, số, giá, ảnh. Chỉ có tên tiệm thì AI phải bịa phần còn lại. Khẩu hiệu hay mức giảm giá do AI nghĩ là thông tin mới tiệm chưa hề cam kết, nên không được đưa lên trang.",
      ),
      q(
        "Khi dán bảng thông tin cho AI, câu dặn nào đúng nhất?",
        "Chỉ dùng thông tin trong bảng; thiếu gì thì ghi \"chưa có\", đừng tự thêm",
        [
          "Hãy dùng bảng này và thêm những gì còn thiếu cho hoàn chỉnh",
          "Dùng bảng làm tham khảo, tự do sáng tạo phần còn lại",
          "Viết thật đầy đủ mọi thông tin khách có thể cần tìm",
        ],
        "Câu dặn phải cấm tự thêm và cho AI chỗ trống hợp lệ (\"chưa có\"). Nếu dặn \"thêm cho hoàn chỉnh\" hay \"sáng tạo phần còn lại\", AI sẽ lấp chỗ trống bằng thông tin bịa. \"Viết đầy đủ mọi thông tin\" có cùng hậu quả với chỗ thiếu.",
      ),
      q(
        "Bản nháp có giờ \"mở cửa 7h-22h\" mà bảng của bạn ghi 8h-20h. Bạn nên làm gì?",
        "Sửa theo bảng rồi rà lại mọi số khác",
        [
          "Bỏ qua vì chênh lệch giờ nhỏ, khách sẽ tự hiểu",
          "Tin AI vì nó viết tự tin, còn bảng của bạn có thể sai",
          "Xoá luôn dòng giờ mở cửa để khỏi bị sai số",
        ],
        "Bảng của bạn là nguồn đúng; bản nháp lệch là lỗi cần sửa, và lệch giờ làm khách tới tiệm khi đóng cửa. Nếu AI đổi một con số thì có thể đã đổi thêm con số khác, nên cần rà cả trang. Xoá dòng giờ thì mất thông tin khách cần nhất.",
      ),
      q(
        "Ảnh nào phù hợp nhất để đưa lên trang giới thiệu tiệm của bạn?",
        "Ảnh bạn tự chụp sản phẩm và cửa tiệm thật",
        [
          "Ảnh đẹp lấy từ trang web của tiệm khác",
          "Ảnh do AI tạo ra giống hệt món bạn bán",
          "Ảnh minh hoạ chung lấy từ một kho ảnh miễn phí",
        ],
        "Khách đến tiệm phải thấy đúng thứ họ đã xem. Ảnh lấy của tiệm khác có thể vi phạm quyền tác giả và là ảnh của người khác. Ảnh AI tạo ra không phải sản phẩm của bạn, và ảnh kho chung ít giúp khách tin. Ảnh thật, dù chụp điện thoại, tạo được lòng tin.",
      ),
    ],
    keyTakeaways: [
      "AI không biết giờ, giá, số điện thoại của bạn: thiếu thì nó bịa.",
      "Gom thông tin thật vào một bảng trước khi dựng.",
      "Dặn AI: chỉ dùng bảng; thiếu gì ghi \"chưa có\".",
      "Sau khi dựng, đối chiếu từng số với bảng.",
    ],
    practicePrompt: {
      question:
        "Chị Hoa chưa quyết giá mới cho bánh kem, nên bảng thông tin để trống ô giá. Cách nào đúng?",
      options: [
        "Ghi \"chưa có giá, liên hệ để biết\" vào bảng rồi dặn AI dùng nguyên văn",
        "Để AI điền một mức giá hợp lý rồi chị sửa lại sau cho nhanh",
        "Xoá luôn mục giá khỏi bảng để trang khỏi có chỗ trống",
        "Điền giá của tiệm bánh lớn gần đó để khách dễ so sánh",
      ],
      correct: 0,
      explanation:
        "Ô trống có tên rõ ràng là cách an toàn: AI chép \"liên hệ để biết\" thay vì bịa. Nếu để AI điền giá hợp lý, một con số giả có thể lên trang mà không ai nhớ sửa. Xoá mục giá làm mất thông tin khách cần, còn điền giá tiệm khác là cam kết một mức giá bạn không đặt ra.",
    },
    summary: {
      keyIdea: "AI điền chỗ trống bằng chữ trông thật; bạn phải đưa thông tin thật trước.",
      formula: "Bảng thông tin thật + \"chỉ dùng bảng\" + đối chiếu sau = trang không chữ giả.",
      commonMistake: "Đọc lướt bản nháp vì nó trông đầy đủ và tự tin.",
      action: "Lập bảng thông tin thật một trang: tên, địa chỉ, giờ, số, giá, ảnh.",
    },
    application: {
      title: "Lập bảng thông tin thật trong 20 phút",
      message:
        "Mở một ghi chú hay bảng tính và lập bảng cho trang của bạn: tên, địa chỉ, giờ mở cửa, số điện thoại, giá 3-5 mục chính, và danh sách 3-5 ảnh thật bạn có. Ô nào chưa biết thì ghi \"chưa có\". Mai bạn sẽ được hỏi bảng còn bao nhiêu ô chưa có.",
      secondary: "Gọi thử số điện thoại trong bảng để chắc nó đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Hoa nhìn bản nháp phần liên hệ AI vừa dựng: số điện thoại, giờ mở cửa, địa chỉ, tất cả trông rất thật. Chỉ có một vấn đề: chị chưa hề đưa cho AI thông tin nào trong số đó.",
      },
      {
        type: "feynman",
        title: "Nội dung thật đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ một người thợ in làm danh thiếp nhưng không đưa số điện thoại. Người thợ rất khéo, nên tự điền một dãy số cho đẹp. Danh thiếp in ra rất sang, chỉ có số là số của ai đó khác.",
        columns: ["Tình huống", "Thợ in danh thiếp", "AI dựng trang"],
        rows: [
          ["Bạn không đưa số", "Thợ tự điền cho đẹp", "AI điền số trông hợp lý"],
          ["Kết quả", "Danh thiếp đẹp, số sai", "Trang đẹp, thông tin sai"],
          ["Cách tránh", "Đưa tờ giấy ghi số thật", "Đưa bảng thông tin thật và dặn chỉ dùng bảng"],
        ],
        oneLiner: "Muốn thông tin đúng, phải đưa nó; AI chỉ chép chứ không biết thay bạn.",
      },
      { type: "heading", text: "Bảng thông tin thật" },
      {
        type: "paragraph",
        text: "Bảng gồm mọi thứ khách cần và bạn là người duy nhất biết: tên, địa chỉ, giờ, số điện thoại, giá, ảnh. Viết một lần, dùng cho mọi phần của trang, và khi thông tin đổi thì sửa ở một chỗ.",
      },
      {
        type: "flow",
        title: "Từ bảng thông tin tới trang không có chữ giả",
        steps: [
          { label: "Gom thông tin thật", detail: "Tên, địa chỉ, giờ mở cửa, số điện thoại, giá, ảnh. Ô nào chưa có thì ghi \"chưa có\" chứ không để trống." },
          { label: "Dặn AI chỉ dùng bảng", detail: "Dán bảng và dặn: chỉ dùng thông tin trong bảng; thiếu thì ghi \"chưa có\", không tự thêm." },
          { label: "AI điền vào trang", detail: "AI chép thông tin vào đúng chỗ và viết phần chữ nối. Nó không cần đoán nên ít bịa." },
          { label: "Bạn đối chiếu", detail: "Đọc từng số, từng giờ, từng giá trên trang, so với bảng. Gọi thử số điện thoại." },
        ],
      },
      {
        type: "list",
        items: [
          "Ảnh: chỉ dùng ảnh bạn tự chụp hoặc có quyền dùng.",
          "Giá: ghi đúng giá hiện tại, hoặc \"liên hệ để biết\" nếu chưa chốt.",
          "Giờ mở cửa: ghi cả ngày nghỉ, ví dụ \"Chủ nhật nghỉ\".",
          "Số điện thoại: gọi thử một lần trước khi đưa vào bảng.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp phần liên hệ: đâu là chữ AI bịa?",
        task: "Bảng thông tin thật của tiệm chỉ có: tên \"Bánh nhà Hoa\"; giờ mở cửa 7h-19h, nghỉ Chủ nhật; số điện thoại 0900 123 456 (ví dụ); đặt trước ít nhất 2 ngày. Đánh dấu những câu AI tự thêm ngoài bảng.",
        segments: [
          { text: "Bánh nhà Hoa mở cửa 7h-19h từ thứ Hai đến thứ Bảy." },
          { text: "Gọi 0900 123 456 để đặt bánh, hoặc nhắn tin bất cứ lúc nào." },
          {
            text: "Giao bánh miễn phí trong bán kính 5km.",
            error: "Bảng không nói gì về giao hàng hay miễn phí. AI tự thêm một cam kết tiệm chưa hề đưa ra.",
          },
          { text: "Khách vui lòng đặt trước ít nhất 2 ngày." },
          {
            text: "Tiệm đã phục vụ hơn 5.000 khách hàng trong 3 năm qua.",
            error: "Con số 5.000 và 3 năm không có trong bảng. AI bịa số liệu để nghe uy tín.",
          },
          {
            text: "Tiệm nằm cạnh chợ Bến Thành, đường Lê Lợi.",
            error: "Bảng không ghi địa chỉ; AI điền một địa điểm có thật nhưng không phải của tiệm.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc",
        text: "Một con số hay giờ sai trên trang còn tệ hơn trang trống: khách tin nó. Mỗi thông tin trên trang phải trả lời được câu hỏi: nó có trong bảng của tôi không?",
      },
      {
        type: "scenario",
        title: "Chị Hoa kiểm bản nháp phần liên hệ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản nháp có giờ 7h-19h, số điện thoại đúng, nhưng cũng có câu \"Giao miễn phí trong 5km\". Chị chưa từng hứa như vậy.",
            choices: [
              { label: "Giữ câu đó vì nghe hấp dẫn, khách sẽ thích", next: "bad_promise" },
              { label: "Xoá câu đó và dặn AI: chỉ dùng thông tin trong bảng", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Hôm sau một khách ở cách tiệm 4km đặt bánh và hỏi về giao miễn phí. Chị phải từ chối hoặc chịu lỗ phí giao để giữ lời.",
            ending: "bad",
          },
          s2: {
            text: "AI chỉnh lại, câu giao hàng đã biến mất. Chị còn việc cuối trước khi đăng.",
            choices: [
              { label: "Gọi thử số điện thoại và đối chiếu giờ mở cửa với bảng", next: "good" },
              { label: "Đăng luôn vì bản nháp mới trông ổn", next: "bad_unchecked" },
            ],
          },
          bad_unchecked: {
            text: "Hai hôm sau chị nhận ra AI đã đổi \"nghỉ Chủ nhật\" thành \"mở cả tuần\" khi viết lại. Một khách đến vào Chủ nhật thấy cửa đóng.",
            ending: "bad",
          },
          good: {
            text: "Số gọi được, giờ khớp bảng, không còn cam kết lạ. Trang chỉ có thông tin thật của tiệm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đưa thông tin thật trước; thiếu thì ghi \"chưa có\".",
          "Bài sau: mở trang AI dựng trong trình duyệt và xem mình đang nhìn gì.",
        ],
      },
    ],
  },
  {
    id: 2523,
    slug: "xem-truoc-trang-lan-dau-trong-trinh-duyet",
    title: "Chặng 56, Bài 4: Xem trang lần đầu trong trình duyệt và biết mình đang nhìn gì",
    subtitle: "Mở trang AI dựng, so từng phần với bản mô tả của bạn, ghi chỗ khác biệt.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI đưa cho bạn một trang chạy được, và rất dễ nhìn lướt rồi nói \"được rồi\". Mỗi khác biệt so với điều bạn muốn là một lỗi chưa ai thấy. So từng phần với bản mô tả và ghi lại thành danh sách cụ thể thì lần sửa sau của AI mới có mục tiêu.",
    openingQuestion:
      "AI đưa anh Tuấn một trang. Anh mở lên, thấy đẹp, và định nhắn AI: \"Được rồi, làm tiếp.\" Anh bỏ sót bước nào?",
    openingOptions: [
      "So từng phần với bản mô tả, ghi khác biệt",
      "Xin AI chấm điểm cho trang mà nó vừa tự dựng",
      "Gửi trang cho mọi người quen xin ý kiến cùng một lúc",
      "Đóng trang lại và mở lại xem có giống lần đầu không",
    ],
    correctOption: 0,
    explanation:
      "\"Đẹp\" là cảm nhận, còn việc anh Tuấn cần biết là trang có đúng bản mô tả hay không: đủ phần chưa, đúng thứ tự chưa, nút chính ở đâu. Nhờ AI tự chấm điểm thì nó có xu hướng khen bản nó vừa làm. Hỏi mọi người cùng lúc sẽ ra nhiều ý kiến rời rạc, còn đóng mở lại không so với gì cả. Ghi lại khác biệt cho AI mục tiêu sửa rõ.",
    diagram: [
      { label: "Mở trang trong trình duyệt", arrow: true },
      { label: "Đối chiếu từng phần với bản mô tả", arrow: true },
      { label: "Ghi chỗ khác biệt thành danh sách", arrow: true },
      { label: "Đưa danh sách cho AI sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chủ một phòng khám thú y nhận trang đầu tiên từ AI. Bản mô tả có nút \"Đặt lịch khám\" ở đầu trang, nhưng trang lại có nút \"Tìm hiểu thêm\" và nút đặt lịch nằm ở cuối. Nếu chỉ xem lướt thì thấy ổn. Khi so từng phần với bản mô tả, chủ phòng khám ghi được ba khác biệt và đưa cho AI sửa từng cái. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Khi mở trang AI dựng lần đầu, việc nào hữu ích nhất?",
        "So từng phần với bản mô tả và ghi chỗ khác biệt",
        [
          "Đánh giá cảm giác chung xem đẹp hay chưa",
          "Hỏi AI xem nó tự thấy trang đã hoàn hảo chưa",
          "Kiểm tra xem tên miền có dễ nhớ hay không",
        ],
        "So với bản mô tả biến \"đẹp hay chưa\" thành danh sách cụ thể: thiếu phần nào, sai thứ tự chỗ nào. Cảm giác chung không cho AI mục tiêu sửa. AI tự đánh giá thường có xu hướng khen, còn tên miền là chuyện khác, không phải thứ trang vừa dựng thể hiện.",
      ),
      q(
        "Khác biệt nào nên ghi lại trong danh sách khi so trang với bản mô tả?",
        "Phần thiếu, thừa, sai thứ tự, nút không nổi",
        [
          "Mọi chỗ bạn thấy màu sắc chưa hợp sở thích cá nhân",
          "Chỉ những lỗi chính tả vì các phần còn lại là việc của AI",
          "Những gì AI đã làm đúng để khen cho nó làm tiếp",
        ],
        "Danh sách khác biệt dựa trên bản mô tả: phần thiếu, thừa, sai thứ tự, nút chính. Màu sắc chuyện sở thích có thể để sau. Chỉ ghi lỗi chính tả bỏ qua cấu trúc, là phần quan trọng hơn. Ghi chỗ đúng thì không giúp sửa gì.",
      ),
      q(
        "Bản mô tả yêu cầu nút \"Đăng ký tập thử\" ở đầu trang. Trang có nút đó ở cuối. Ghi chú nào tốt nhất?",
        "Nút Đăng ký tập thử đang ở cuối trang, cần chuyển lên đầu trang",
        [
          "Nút trông chưa hợp lắm với cả trang, cần xem lại",
          "Bố cục trang chưa đúng ý, cần làm lại từ đầu toàn bộ trang cho chuẩn hơn",
          "Nút đăng ký nên to hơn, sáng hơn và đổi màu sang cam cho nổi bật",
        ],
        "Ghi chú tốt nói rõ cái gì, ở đâu, cần thế nào. \"Chưa hợp lắm\" không cho AI biết sửa gì. \"Làm lại từ đầu\" phá cả những phần đã đúng. Đổi màu và kích thước là chuyện khác: vấn đề thật là vị trí nút chứ không phải độ nổi.",
      ),
      q(
        "Vì sao không nên nhờ chính AI kiểm xem trang đã đúng ý bạn chưa?",
        "Nó có thể khen bản nó vừa làm, còn bạn mới biết ý mình",
        [
          "Vì AI không đọc được trang web mà nó tự dựng ra",
          "Vì AI chỉ kiểm được phần chữ chứ không kiểm được bố cục",
          "Vì kiểm bằng AI luôn tốn thời gian hơn tự kiểm",
        ],
        "Điều cần so là bản dựng với ý của bạn, mà ý đó nằm trong bản mô tả bạn viết và trong đầu bạn. AI có thể đọc lại trang, nhưng dễ xác nhận là \"đúng yêu cầu\" dù thiếu phần. Kiểm bằng mắt của bạn nhanh hơn khi đã có bản mô tả, và không phụ thuộc vào việc AI đọc bố cục hay chữ.",
      ),
      q(
        "Sau khi so xong bạn có ba khác biệt. Nên đưa cho AI theo cách nào?",
        "Từng khác biệt một, nói rõ chỗ nào cần đổi thành gì",
        [
          "Một câu chung \"sửa giúp các lỗi nhỏ của trang\" cho gọn",
          "Dán cả bản mô tả lần nữa và nhờ AI dựng lại từ đầu",
          "Chỉ đưa khác biệt quan trọng nhất, còn lại tự sửa tay",
        ],
        "Khác biệt cụ thể cho AI mục tiêu đo được và dễ kiểm lại sau khi sửa. Câu chung chung khiến nó tự đoán \"lỗi nhỏ\" là gì. Dựng lại từ đầu có thể làm mất phần đã đúng. Tự sửa tay thì nhanh hơn với người biết làm, nhưng không luyện được cách giao việc rõ ràng.",
      ),
    ],
    keyTakeaways: [
      "Mở trang và so từng phần với bản mô tả, không chỉ nhìn \"đẹp hay chưa\".",
      "Ghi khác biệt: phần thiếu, thừa, sai thứ tự, nút chính không nổi.",
      "Mỗi ghi chú nói rõ chỗ nào, cần đổi thành gì.",
      "Đưa cho AI từng khác biệt một.",
    ],
    practicePrompt: {
      question:
        "Bản mô tả có sáu phần. Trang AI dựng có năm phần, thiếu \"Câu hỏi thường gặp\", và có thêm phần \"Blog\" bạn không yêu cầu. Ghi chú nào đúng?",
      options: [
        "Thiếu phần Câu hỏi thường gặp; thừa phần Blog, cần bỏ",
        "Trang gần đủ rồi, thiếu một phần thì khách cũng không để ý",
        "Thêm phần Câu hỏi thường gặp và giữ luôn phần Blog cho phong phú",
        "Bố cục chưa đúng, nhờ AI làm lại hết cho giống bản mô tả ban đầu",
      ],
      correct: 0,
      explanation:
        "Ghi chú đúng nêu cả phần thiếu và phần thừa, vì cả hai đều khác bản mô tả. Bỏ qua phần thiếu làm trang không đủ thông tin khách cần. Giữ phần Blog bạn không yêu cầu là chấp nhận thứ AI tự thêm. \"Làm lại\" chung chung có thể phá những phần đã đúng.",
    },
    summary: {
      keyIdea: "Xem trang là so với bản mô tả, không chỉ thấy đẹp hay chưa.",
      formula: "Mở trang + bản mô tả cạnh nhau = danh sách khác biệt cụ thể.",
      commonMistake: "Nói \"được rồi\" khi mới nhìn lướt.",
      action: "Đặt bản mô tả cạnh trang và đánh dấu từng phần.",
    },
    application: {
      title: "So trang với bản mô tả trong 20 phút",
      message:
        "Mở một trang bất kỳ AI dựng cho bạn (hoặc nhờ AI dựng một trang đơn giản theo danh sách phần ở bài 2). Đặt danh sách phần cạnh trang, đánh dấu từng phần: đúng, thiếu, thừa, sai thứ tự. Ghi 3 khác biệt, mỗi cái một câu nói rõ chỗ nào cần đổi thành gì. Mai bạn sẽ được hỏi ba khác biệt đó.",
      secondary: "Thử làm một chỉnh sửa nhỏ trong bài thực hành trên trang này trước khi nhờ AI sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Anh Tuấn vừa mở trang đầu tiên AI dựng cho phòng tập. Nó trông ổn. Nhưng \"ổn\" không phải thứ anh cần biết. Anh cần biết trang có đúng bản mô tả anh đã viết hay không.",
      },
      {
        type: "feynman",
        title: "Xem trang đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhận căn hộ mới từ chủ đầu tư. Người kỹ tính cầm bản vẽ đi từng phòng: phòng ngủ có đủ hai không, cửa sổ ở đúng hướng không. Xem trang AI dựng cũng vậy: bản mô tả là bản vẽ, trang là căn hộ.",
        columns: ["Việc làm", "Nhận căn hộ", "Xem trang AI dựng"],
        rows: [
          ["Công cụ", "Bản vẽ căn hộ", "Bản mô tả các phần của trang"],
          ["Cách đi", "Từng phòng một", "Từng phần từ trên xuống"],
          ["Ghi lại", "Phòng nào thiếu, sai chỗ", "Phần thiếu, thừa, sai thứ tự"],
        ],
        oneLiner: "Cầm bản mô tả đi từng phần của trang như cầm bản vẽ đi từng phòng.",
      },
      { type: "heading", text: "So từng phần với bản mô tả" },
      {
        type: "paragraph",
        text: "Đặt bản mô tả bên cạnh trang. Đi từ trên xuống: phần nào đúng, phần nào thiếu, phần nào thừa, phần nào đổi thứ tự. Đừng sửa ngay, hãy ghi lại trước, vì có danh sách rõ thì lần nhờ AI sau mới ra đúng việc.",
      },
      {
        type: "flow",
        title: "Từ lúc mở trang đến danh sách khác biệt",
        steps: [
          { label: "Mở trang trong trình duyệt", detail: "Trình duyệt là ứng dụng bạn dùng để đọc web hằng ngày. Mở trang AI dựng ở đó để xem đúng như khách sẽ thấy." },
          { label: "Đặt bản mô tả cạnh trang", detail: "Mở danh sách phần của bài 2. Mỗi dòng của danh sách là một phần bạn cần tìm thấy trên trang." },
          { label: "Đi từng phần", detail: "Tìm từng phần, đánh dấu: đúng, thiếu, thừa, sai thứ tự. Xem nút chính có nổi ở đầu trang không." },
          { label: "Ghi thành danh sách", detail: "Mỗi khác biệt một câu: chỗ nào, cần đổi thành gì. Danh sách này là đề bài cho lần sửa kế tiếp." },
        ],
      },
      {
        type: "sim",
        tool: "editor",
        mission: "change-heading",
        title: "Thử đổi một tiêu đề nhỏ",
        task: "Mở trình soạn thảo mô phỏng và đổi tiêu đề chính của trang theo nhiệm vụ. Đây là cách làm quen với việc một chỗ nhỏ đổi được mà không đụng chỗ khác.",
      },
      {
        type: "comparison",
        left: {
          label: "Ghi chú mơ hồ",
          text: "\"Nút chưa hợp lắm.\" \"Trang hơi lạ.\" \"Sửa các lỗi nhỏ giúp tôi.\" AI không biết chỗ nào, nên đoán và có thể đổi sai chỗ.",
        },
        right: {
          label: "Ghi chú cụ thể",
          text: "\"Nút Đăng ký tập thử đang ở cuối trang, chuyển lên đầu.\" \"Thiếu phần Câu hỏi thường gặp.\" AI làm đúng việc, bạn kiểm lại dễ.",
        },
      },
      {
        type: "callout",
        label: "Mẹo",
        text: "Đừng nhờ AI tự đánh giá trang nó vừa dựng: nó hay xác nhận là đúng yêu cầu. Mắt của bạn, với bản mô tả trong tay, là thước đo duy nhất biết bạn muốn gì.",
      },
      {
        type: "scenario",
        title: "Anh Tuấn xem trang lần đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh mở trang, thấy đẹp. Bản mô tả có sáu phần; trang có năm phần và nút đăng ký đang ở cuối trang.",
            choices: [
              { label: "Nhắn AI \"được rồi, làm tiếp phần giá\"", next: "bad_skip" },
              { label: "Đặt bản mô tả cạnh trang, ghi từng khác biệt", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Hai hôm sau anh dựng thêm ba phần, rồi mới thấy nút đăng ký vẫn ở cuối trang. Giờ phải sửa ở cả bốn phần vì AI đã dựng các phần sau theo bố cục cũ.",
            ending: "bad",
          },
          s2: {
            text: "Anh ghi được hai khác biệt: nút đăng ký ở cuối thay vì đầu, thiếu phần câu hỏi thường gặp. Anh định nhắn AI.",
            choices: [
              { label: "Nhắn: \"Sửa các lỗi của trang giúp tôi\"", next: "bad_vague" },
              { label: "Nhắn từng việc: chuyển nút lên đầu trang; thêm phần câu hỏi thường gặp với nội dung anh đưa", next: "good" },
            ],
          },
          bad_vague: {
            text: "AI sửa theo cách nó hiểu: đổi màu nút, thêm phần \"Blog\", nhưng nút vẫn ở cuối. Anh phải nhắn lại và kiểm cả những chỗ AI tự đổi.",
            ending: "bad",
          },
          good: {
            text: "AI làm đúng hai việc. Anh kiểm lại toàn trang, nút đã ở đầu, phần câu hỏi có đủ, không chỗ nào khác bị đổi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Xem trang là so với bản mô tả, rồi ghi khác biệt cụ thể.",
          "Bài sau: dự án nhỏ, vẽ bản phác giấy trước khi nhờ AI dựng.",
        ],
      },
    ],
  },
  {
    id: 2524,
    slug: "du-an-nho-ban-nhap-giay-cua-trang",
    title: "Chặng 56, Bài 5: Dự án nhỏ: bản phác giấy của trang trước khi nhờ AI",
    subtitle: "Vẽ tay bố cục, ghi chữ thật vào từng khung, chụp lại làm đề bài cho AI.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✏️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản phác giấy là đề bài có hình. Nó buộc bạn quyết định thứ tự và chữ thật trước khi AI dựng, và nó rẻ: sửa một nét bút mất vài giây, sửa một trang đã dựng mất cả buổi. Chụp lại là bạn có đề bài cho bài sau.",
    openingQuestion:
      "Chị Hoa muốn nhờ AI dựng trang tiệm bánh. Cách chuẩn bị nào cho đề bài tốt nhất?",
    openingOptions: [
      "Vẽ tay bố cục, ghi chữ thật vào từng khung rồi chụp lại",
      "Kể miệng cho AI nghe ý tưởng và chờ nó tự chọn bố cục cho mình",
      "Tìm trang của tiệm khác rồi nhờ AI dựng giống hệt",
      "Viết một đoạn văn thật dài mô tả cảm xúc mong muốn",
    ],
    correctOption: 0,
    explanation:
      "Bản phác có hình và chữ thật cho AI biết thứ tự các phần, chỗ đặt nút chính và chữ nào vào khung nào: ít chỗ để đoán nhất. Kể miệng hay đoạn văn cảm xúc thì mơ hồ, còn dựng giống hệt trang của tiệm khác là chép bố cục và chữ của người khác, không phải của chị. Vẽ tay cũng rẻ: sửa một nét bút nhanh hơn sửa cả trang.",
    diagram: [
      { label: "Ba câu và danh sách phần", arrow: true },
      { label: "Vẽ mỗi phần một khung, theo thứ tự cuộn", arrow: true },
      { label: "Ghi chữ thật vào từng khung", arrow: true },
      { label: "Chụp bản phác làm đề bài cho AI" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chủ xưởng may nhỏ vẽ bản phác trên giấy A4: sáu khung, mỗi khung ghi tiêu đề, một dòng chữ thật và chỗ đặt ảnh. Khi nhờ AI dựng, bản phác giúp anh nói rõ phần nào ở đâu, và hai lần nhờ là xong phần đầu trang. Anh cũng thấy ngay khung \"Giá\" còn trống thông tin, nên điền số thật trước khi dựng. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Bản phác giấy của trang nên vẽ những gì?",
        "Các khung theo thứ tự cuộn, mỗi khung ghi tên phần và chữ thật",
        [
          "Một bức tranh thật đẹp, đầy đủ màu sắc và họa tiết trang trí",
          "Chỉ phần đầu trang vì các phần khác AI tự nghĩ được",
          "Logo và màu chủ đạo, còn bố cục để AI quyết định",
        ],
        "Bản phác là bản vẽ bố cục, không phải tranh: khung, thứ tự và chữ thật là thứ AI cần. Vẽ đẹp tốn công mà AI vẫn không đọc được ý đồ bố cục. Chỉ vẽ đầu trang bỏ chừa phần còn lại cho AI đoán, và chỉ có logo, màu thì chưa nói gì về thứ tự các phần.",
      ),
      q(
        "Vì sao ghi chữ thật vào khung ngay từ bản phác?",
        "Để AI dùng đúng chữ của bạn và bạn thấy ngay phần nào còn thiếu chữ",
        [
          "Vì chữ viết trong khung sẽ tự động hiện lên trang mà không cần nhờ AI nữa",
          "Vì ghi chữ giả như \"Lorem ipsum\" làm AI dựng chậm hơn",
          "Vì khung trống thì AI sẽ từ chối không dựng cho bạn",
        ],
        "Chữ thật trong khung buộc bạn thấy ô nào chưa có nội dung, và AI chép đúng chữ thay vì bịa. Chữ không tự hiện lên trang mà phải qua bước AI dựng. Chữ giả không làm AI chậm đi, và AI cũng không từ chối khung trống, nó chỉ điền bằng chữ tự nghĩ ra.",
      ),
      q(
        "Bản phác của bạn có khung \"Giá\" nhưng chưa biết giá. Nên làm gì?",
        "Ghi \"chưa có giá\" và điền số thật trước khi dựng",
        [
          "Để AI đoán giá phổ biến rồi bạn sửa sau nếu thấy sai",
          "Bỏ khung Giá vì khách chỉ cần gọi điện để hỏi giá sau",
          "Vẽ khung trống và hy vọng AI sẽ điền một con số hợp lý",
        ],
        "Ghi rõ \"chưa có giá\" đánh dấu chỗ thiếu thay vì che giấu nó, và nhắc bạn chốt số trước khi dựng. AI đoán giá tạo con số giả mà dễ bị quên sửa. Bỏ khung Giá loại bỏ thông tin khách hay hỏi nhất. Khung trống cũng khiến AI tự điền.",
      ),
      q(
        "Chụp bản phác bằng điện thoại để đưa AI. Điều gì nên kiểm trước khi gửi?",
        "Chữ trong ảnh đọc rõ, đủ sáng và không có thông tin riêng tư",
        [
          "Ảnh phải chỉnh màu thật đẹp như một tấm ảnh nghệ thuật đích thực",
          "Ảnh phải chụp toàn bộ bàn làm việc để AI biết bối cảnh",
          "Ảnh chụp càng nhỏ càng tốt để AI đọc nhanh hơn",
        ],
        "Điều cần là AI đọc được chữ trong ảnh: rõ, đủ sáng, không bị cắt. Đừng để lộ thông tin riêng tư xung quanh như giấy tờ trên bàn. Chỉnh màu đẹp không giúp gì, chụp cả bàn làm thêm nhiễu, còn ảnh quá nhỏ thì chữ bị mờ không đọc được.",
      ),
      q(
        "Sau khi có bản phác, bạn định nhờ AI dựng cả trang cùng lúc cho nhanh. Vì sao nên làm từng phần?",
        "Dựng từng phần, xem rồi mới làm tiếp thì sửa sớm được, đỡ phá phần đúng",
        [
          "Vì AI không thể dựng quá một phần trong một lần nhờ dù bạn đã đưa đủ bản phác",
          "Vì làm từng phần luôn rẻ hơn làm cả trang một lần",
          "Vì bản phác chỉ dùng được cho phần đầu của trang",
        ],
        "Dựng từng phần cho bạn nhịp xem, ghi nhận xét, nhờ tiếp: lỗi bị bắt sớm khi còn nhỏ. Nếu dựng cả trang, lỗi ở đầu lan xuống mọi phần sau. AI vẫn dựng được nhiều phần, nhưng khó sửa hơn; chi phí không phải lý do chính. Bản phác dùng được cho cả trang.",
      ),
    ],
    keyTakeaways: [
      "Bản phác giấy là đề bài có hình: khung, thứ tự và chữ thật.",
      "Ghi chữ thật vào khung; khung nào thiếu thì ghi \"chưa có\".",
      "Chụp đủ sáng, đọc rõ chữ, không để lộ thông tin riêng tư.",
      "Dùng bản phác để nhờ AI dựng từng phần, không cả trang một lần.",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn chụp bản phác, nhưng chữ trong ảnh hơi mờ vì thiếu sáng. Anh nên làm gì?",
      options: [
        "Chụp lại ở chỗ sáng hơn để chữ đọc rõ",
        "Gửi luôn vì AI đoán được chữ mờ là chữ gì",
        "Chỉnh màu ảnh cho đẹp hơn rồi gửi như cũ",
        "Đưa thêm một ảnh nữa của chính căn phòng tập",
      ],
      correct: 0,
      explanation:
        "Chữ mờ khiến AI đoán, mà đoán sai chữ thật là một lỗi. Chụp lại đủ sáng là cách rẻ nhất. Chỉnh màu không làm chữ rõ hơn nếu ảnh đã mờ. Ảnh căn phòng là thông tin khác, không thay cho bản phác đọc được.",
    },
    summary: {
      keyIdea: "Vẽ giấy trước: rẻ, nhanh, và biến ý thành đề bài AI đọc được.",
      formula: "Khung theo thứ tự cuộn + chữ thật trong mỗi khung + ảnh rõ = đề bài.",
      commonMistake: "Vẽ cho đẹp thay vì vẽ cho rõ thứ tự và chữ thật.",
      action: "Vẽ sáu khung trên một tờ giấy và ghi chữ thật vào từng khung.",
    },
    application: {
      title: "Vẽ bản phác trong 20 phút",
      message:
        "Lấy một tờ giấy A4. Vẽ các khung theo thứ tự cuộn, mỗi phần trong danh sách của bài 2 một khung. Ghi chữ thật vào từng khung: tiêu đề, một hai dòng nội dung, chỗ đặt ảnh, nút chính ở khung đầu. Khung nào thiếu thông tin thì ghi \"chưa có\". Chụp ảnh đủ sáng và lưu lại. Mai bạn sẽ được hỏi bản phác có mấy khung.",
      secondary: "Đưa bản phác cho một người quen và hỏi họ đoán trang này để làm gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Hoa đã có ba câu, danh sách phần và bảng thông tin thật. Còn một bước nữa trước khi nhờ AI: đặt mọi thứ lên một tờ giấy, để thấy trang trông ra sao trước khi tốn một phút của AI.",
      },
      {
        type: "feynman",
        title: "Bản phác giấy đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ thợ mộc đóng một cái kệ. Bạn vẽ nguệch ngoạc trên tờ giấy: ba tầng, tầng dưới cao hơn, ghi số đo. Thợ nhìn là hiểu ngay, không cần bạn giải thích nửa tiếng. Bản phác trang cũng vậy.",
        columns: ["Phần việc", "Bản vẽ kệ cho thợ mộc", "Bản phác trang cho AI"],
        rows: [
          ["Hình", "Ba tầng, vị trí từng tầng", "Khung từng phần theo thứ tự cuộn"],
          ["Số liệu", "Số đo thật", "Chữ thật trong từng khung"],
          ["Sửa", "Một nét bút", "Một nét bút, trước khi AI dựng"],
        ],
        oneLiner: "Bản phác là bản vẽ kệ cho thợ: nguệch ngoạc cũng được, miễn đủ thứ tự và số đo thật.",
      },
      { type: "heading", text: "Vẽ gì, ghi gì" },
      {
        type: "paragraph",
        text: "Mỗi phần của trang là một khung hình chữ nhật, xếp từ trên xuống dưới. Trong khung ghi tên phần, chữ thật sẽ hiện lên trang, và chỗ đặt ảnh nếu có. Nút chính vẽ rõ ở khung đầu.",
      },
      {
        type: "flow",
        title: "Từ tờ giấy trắng đến đề bài cho AI",
        steps: [
          { label: "Vẽ khung theo thứ tự cuộn", detail: "Mỗi phần trong danh sách là một khung. Khung đầu chứa tên và nút chính. Đừng tô vẽ, chỉ cần rõ thứ tự." },
          { label: "Ghi chữ thật vào khung", detail: "Tiêu đề, một hai dòng nội dung, giá, số điện thoại lấy từ bảng thông tin thật. Khung thiếu thì ghi \"chưa có\"." },
          { label: "Đánh dấu chỗ đặt ảnh", detail: "Vẽ ô ảnh và ghi tên ảnh thật bạn sẽ dùng, hoặc \"chưa có ảnh\"." },
          { label: "Chụp lại", detail: "Chụp đủ sáng, thẳng góc, chữ đọc rõ, không lộ giấy tờ riêng tư xung quanh. Ảnh này là đề bài cho bài sau." },
        ],
      },
      {
        type: "list",
        items: [
          "Vẽ bằng bút chì để tẩy được; đừng mất thời gian làm đẹp.",
          "Mỗi khung một phần; nếu phần quá dài, chia thành hai khung.",
          "Khung thiếu thông tin ghi \"chưa có\", đừng để AI đoán.",
          "Nhờ một người quen nhìn và nói trang này để làm gì.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Không có bản phác",
          text: "Bạn kể miệng \"trang có giới thiệu, sản phẩm, liên hệ\". AI tự chọn thứ tự, tự đặt nút, tự viết chữ; bạn sửa từng chỗ sau khi đã dựng xong.",
        },
        right: {
          label: "Có bản phác",
          text: "Sáu khung, chữ thật, nút ở khung đầu. AI chép đúng thứ tự, đúng chữ, và chỗ còn thiếu bạn đã thấy từ khi vẽ.",
        },
      },
      {
        type: "callout",
        label: "Nhắc",
        text: "Ảnh chụp bản phác chỉ nên chứa bản phác. Kiểm xem xung quanh có giấy tờ, danh sách khách hàng hay thông tin riêng tư lọt vào khung hình không, trước khi gửi cho bất kỳ công cụ nào.",
      },
      {
        type: "scenario",
        title: "Chị Hoa vẽ và chụp bản phác",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị có tờ giấy trắng, danh sách sáu phần và bảng thông tin thật. Chị muốn bắt đầu vẽ.",
            choices: [
              { label: "Vẽ thật kỹ, tô màu, vẽ cả hoa văn cho đẹp như trang thật", next: "bad_pretty" },
              { label: "Vẽ sáu khung, ghi chữ thật vào từng khung, khung nào thiếu thì ghi \"chưa có\"", next: "s2" },
            ],
          },
          bad_pretty: {
            text: "Chị mất hai tiếng tô màu, nhưng chưa ghi chữ thật nào. Đến khi nhờ AI, chị vẫn phải gõ lại toàn bộ nội dung, và bản vẽ đẹp không giúp AI biết nút chính ở đâu.",
            ending: "bad",
          },
          s2: {
            text: "Chị chụp bản phác bằng điện thoại. Trong ảnh có một phần bàn, nơi để tờ danh sách số điện thoại khách đặt bánh.",
            choices: [
              { label: "Gửi nguyên ảnh vì AI chỉ đọc phần bản phác", next: "bad_leak" },
              { label: "Chụp lại, bỏ danh sách khách ra ngoài khung hình", next: "good" },
            ],
          },
          bad_leak: {
            text: "Ảnh có số điện thoại khách hàng của chị lọt vào một công cụ bên ngoài. Chị nhớ ra sau khi gửi, và không còn cách lấy lại.",
            ending: "bad",
          },
          good: {
            text: "Ảnh chỉ có bản phác, chữ rõ, đủ sáng. Chị có đề bài sẵn để giao AI dựng phần đầu trang ở bài sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bản phác giấy: khung theo thứ tự, chữ thật, nút chính ở đầu.",
          "Bài sau: đưa bản phác cho AI dựng phần đầu trang.",
        ],
      },
    ],
  },
];
