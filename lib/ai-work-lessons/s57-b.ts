import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 57, bài 6-10. Giáo trình: scripts/curriculum/stage-57.json.
// Không nêu nút bấm, giá hay tính năng riêng của công cụ nào: chỉ dạy cách mô tả,
// cách kiểm và cách giao việc cho AI dựng công cụ nhỏ.

const Q = (question: string, correct: string, wrong: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [correct, ...wrong],
  correct: 0,
  explanation,
});

export const S57_B_LESSONS: Lesson[] = [
  {
    id: 2545,
    slug: "bieu-mau-thu-thap-thong-tin-khach-can-nhung-truong-nao",
    title: "Chặng 57, Bài 6: Biểu mẫu nhận yêu cầu: hỏi những gì, bỏ những gì",
    subtitle: "Mỗi ô trong biểu mẫu là một câu hỏi bạn bắt người khác trả lời. Chỉ hỏi điều bạn sẽ dùng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi yêu cầu đến qua tin nhắn, mỗi người viết một kiểu: người thì quên ngày cần, người thì quên số lượng, bạn phải nhắn hỏi lại từng người. Một biểu mẫu tốt hỏi đúng những điều bạn cần để bắt tay vào việc, và không hỏi thêm điều gì. Ít ô thì người gửi điền xong, nhiều ô thì họ bỏ dở hoặc điền bừa cho nhanh.",
    openingQuestion:
      "Đội bạn nhận yêu cầu làm báo giá qua Zalo, email và nói miệng. Bạn định làm biểu mẫu thay cho tất cả. Bước đầu tiên nên là gì?",
    openingOptions: [
      "Liệt kê những gì bạn luôn phải hỏi lại rồi biến chúng thành ô",
      "Thêm thật nhiều ô để không bỏ sót điều gì có thể cần sau này hết",
      "Sao chép nguyên biểu mẫu của một công ty lớn rồi chỉnh tên",
      "Nhờ AI vẽ một biểu mẫu đẹp rồi mới nghĩ xem hỏi gì",
    ],
    correctOption: 0,
    explanation:
      "Những câu bạn phải nhắn hỏi lại nhiều lần chính là các ô cần có, vì chúng đã được chứng minh bằng công việc thật. Thêm ô \"phòng khi cần\" làm người điền mệt và làm dữ liệu rác. Biểu mẫu của công ty khác hỏi theo quy trình của họ, không phải của bạn. Giao diện đẹp là bước cuối, sau khi bạn biết mình cần hỏi gì.",
    diagram: [
      { label: "Nhìn 10 yêu cầu cũ, ghi những câu bạn phải hỏi lại", arrow: true },
      { label: "Giữ ô nào bạn thực sự dùng để làm việc", arrow: true },
      { label: "Đánh dấu ô bắt buộc và ô tuỳ chọn", arrow: true },
      { label: "Thử điền bằng một yêu cầu thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng thiết kế 5 người",
      description:
        "Phòng nhận yêu cầu làm banner qua tin nhắn. Mỗi lần thiếu kích thước hoặc hạn giao, nhân viên phải nhắn hỏi lại. Trưởng phòng xem 10 yêu cầu cũ, thấy câu hỏi lại nhiều nhất là kích thước, hạn giao, nội dung chữ và người duyệt, nên biểu mẫu mới chỉ có bốn ô bắt buộc đó cộng một ô ghi chú. Số lần nhắn hỏi lại giảm rõ rệt.",
    },
    quiz: [
      Q(
        "Khi thiết kế biểu mẫu nhận yêu cầu, nên giữ ô nào?",
        "Ô bạn luôn phải nhắn hỏi lại khi yêu cầu đến bằng tin nhắn",
        [
          "Ô hỏi ngày sinh người gửi, để sau này có thể chúc mừng",
          "Ô hỏi sở thích cá nhân của người gửi",
          "Ô hỏi mọi thông tin có thể hữu ích trong tương lai xa",
        ],
        "Câu bạn hay hỏi lại là nhu cầu đã chứng minh bằng việc thật. Ba ô còn lại đều là kiểu \"phòng khi cần\": không ảnh hưởng việc bạn đang làm, chỉ làm người điền thêm mệt và sinh thêm dữ liệu cá nhân phải giữ an toàn."
      ),
      Q(
        "Một ô \"ngày cần xong\" nên là ô nào trong ba loại sau?",
        "Bắt buộc",
        [
          "Tuỳ chọn, vì nhiều người chưa biết ngày cụ thể để điền",
          "Ẩn đi, vì hỏi ngày làm người gửi thấy bị thúc ép công việc",
          "Gộp vào ô ghi chú dài để người gửi tự viết tuỳ thích",
        ],
        "Thiếu hạn giao là lý do bạn phải nhắn hỏi lại nhiều nhất, nên ô này bắt buộc. Để tuỳ chọn thì nhiều người bỏ trống, ẩn đi thì bạn mất thông tin, còn gộp vào ô ghi chú thì mỗi người viết một kiểu và bạn không lọc được theo ngày."
      ),
      Q(
        "Biểu mẫu có 18 ô và chỉ 42% người gửi điền xong. Nên làm gì trước?",
        "Bỏ những ô mà chưa ai dùng để làm việc",
        [
          "Thêm thanh tiến độ hiện số ô đã điền xong",
          "Nhắn cả phòng yêu cầu phải điền đủ 18 ô mới được xử lý",
          "Chia 18 ô thành nhiều trang để người điền không thấy ô nào",
        ],
        "Điền dở thường vì quá nhiều ô chẳng phục vụ việc gì. Thanh tiến độ và chia trang chỉ che số ô, còn ép điền đủ thì người ta điền bừa để qua. Bớt ô là cách duy nhất giảm công sức thật."
      ),
      Q(
        "Ô \"Mô tả yêu cầu\" chỉ có một khung trống. Cách nào giúp câu trả lời dùng được hơn?",
        "Đặt câu hỏi gợi ý dưới ô: cần gì, cho ai, dùng vào việc gì",
        [
          "Giữ khung trống để người gửi viết thoải mái nhất có thể, khỏi bị ép",
          "Giới hạn ô còn 20 chữ để người gửi buộc phải viết cô đọng",
          "Đổi tên ô thành \"Nhập nội dung\" cho ngắn gọn dễ hiểu",
        ],
        "Khung trống không gợi ý thì mỗi người viết một kiểu, còn tên ô chung chung hay giới hạn quá ngắn cũng chẳng chỉ ra điều cần nói. Ba câu gợi ý nhỏ dẫn người gửi nói đúng những ý bạn cần."
      ),
      Q(
        "Trước khi phát biểu mẫu cho cả phòng, việc nào đáng làm nhất?",
        "Tự điền thử bằng ba yêu cầu thật gần đây và xem chỗ nào vướng",
        [
          "Gửi cho sếp xem và chờ sếp duyệt từng ô một, rồi mới phát cho mọi người",
          "Nhờ AI đọc lại biểu mẫu và tin vào nhận xét tổng quát của nó",
          "Phát ngay cho cả phòng rồi sửa dần theo phàn nàn sau",
        ],
        "Điền thử bằng yêu cầu thật lộ ra ô thiếu, ô thừa và câu hỏi khó hiểu trong vài phút. Sếp duyệt không thay được việc thử, nhận xét chung chung của AI không biết yêu cầu thật của bạn, còn phát ngay thì biến cả phòng thành người thử mà không báo trước."
      ),
    ],
    keyTakeaways: [
      "Mỗi ô là một câu hỏi bạn bắt người khác trả lời: chỉ hỏi điều bạn sẽ dùng.",
      "Ô nên có: những câu bạn luôn phải nhắn hỏi lại.",
      "Ô bắt buộc chỉ dành cho điều thiếu là không làm được việc.",
      "Gợi ý dưới ô mở giúp câu trả lời dùng được ngay.",
      "Điền thử bằng yêu cầu thật trước khi phát cho cả phòng.",
    ],
    practicePrompt: {
      question:
        "Bạn xem lại 10 yêu cầu cũ và thấy luôn phải hỏi lại: hạn giao, số lượng, người duyệt. Ô \"Email người gửi\" thì chưa ai dùng vì bạn trả lời trực tiếp trên nhóm chat. Nên xử lý ô email thế nào?",
      options: [
        "Bỏ ô email, giữ hạn giao, số lượng và người duyệt",
        "Giữ ô email và đặt bắt buộc, phòng khi sau này cần liên hệ",
        "Giữ ô email nhưng đổi thành tuỳ chọn để không bị chê hỏi nhiều",
        "Gộp email, hạn giao và số lượng vào một ô ghi chú cho gọn",
      ],
      correct: 0,
      explanation:
        "Ô chưa ai dùng thì bỏ: mỗi ô thừa tốn công người điền và thêm dữ liệu cá nhân phải bảo vệ. Giữ \"phòng khi cần\" hay để tuỳ chọn vẫn là hỏi thừa. Gộp vào ô ghi chú khiến bạn mất khả năng lọc theo hạn giao.",
    },
    summary: {
      keyIdea: "Biểu mẫu tốt hỏi ít, đúng chỗ bạn hay bị thiếu.",
      formula: "Câu hay hỏi lại = ô cần có. Ô chưa ai dùng = bỏ.",
      commonMistake: "Thêm ô \"phòng khi cần\" rồi thắc mắc vì sao người ta bỏ dở.",
      action: "Đếm xem tuần qua bạn nhắn hỏi lại những gì, và ghi ba thứ hay gặp nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở 10 yêu cầu gần nhất bạn nhận (tin nhắn, email) của chính bạn. Gạch ra những câu bạn phải hỏi lại. Viết danh sách tối đa 6 ô, ghi ô nào bắt buộc, rồi nhờ AI chỉ soạn giúp câu hỏi và gợi ý dưới mỗi ô. Mai bạn sẽ được hỏi: danh sách ô của bạn gồm những gì?",
      secondary: "Gửi danh sách cho một đồng nghiệp hay gửi yêu cầu cho bạn và hỏi họ có ô nào khó hiểu không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn mở ba nơi để tìm yêu cầu của tuần: Zalo, email và ghi chú trên giấy. Thiếu hạn giao, thiếu số lượng, hỏi lại từng người. Bài này chỉ làm một việc: chọn ra những câu hỏi đáng có trong biểu mẫu.",
      },
      {
        type: "feynman",
        title: "Biểu mẫu tốt đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tờ phiếu gọi món ở quán ăn. Phiếu chỉ có bàn số mấy, món gì, cay hay không cay. Nó không hỏi ngày sinh của khách, vì bếp không dùng điều đó để nấu.",
        columns: ["Thành phần", "Phiếu gọi món", "Biểu mẫu nhận yêu cầu"],
        rows: [
          ["Mục đích", "Bếp nấu đúng món ngay lần đầu", "Bạn bắt tay làm ngay mà không phải hỏi lại"],
          ["Ô nên có", "Bàn, món, mức cay", "Hạn giao, số lượng, người duyệt"],
          ["Ô nên bỏ", "Ngày sinh, nghề nghiệp khách", "Thông tin cá nhân bạn không dùng tới"],
          ["Kiểm thử", "Bếp đọc thử một phiếu thật", "Điền thử bằng yêu cầu thật gần đây"],
        ],
        oneLiner: "Biểu mẫu là phiếu gọi món: chỉ hỏi điều bếp cần để nấu, không hỏi thêm.",
      },
      { type: "heading", text: "Vấn đề: yêu cầu đến từ ba hướng" },
      {
        type: "paragraph",
        text: "Một người nhắn \"làm giúp báo giá gấp\" mà quên nói cho khách nào. Người khác gửi email đủ ý nhưng dài ba đoạn. Mỗi lần thiếu là một lượt nhắn hỏi lại, và người kia chỉ trả lời vào tối. Biểu mẫu (form) là tờ giấy có các ô trống, ai cũng điền cùng một thứ tự.",
      },
      {
        type: "flow",
        title: "Từ đống tin nhắn tới biểu mẫu",
        steps: [
          { label: "Gom yêu cầu cũ", detail: "Mở 10 yêu cầu gần nhất bạn đã nhận, bất kể đến từ kênh nào. Đây là nguyên liệu thật, thay cho việc đoán xem người khác sẽ hỏi gì." },
          { label: "Gạch câu hỏi lại", detail: "Đánh dấu mỗi chỗ bạn phải nhắn hỏi thêm. Câu nào xuất hiện từ ba lần trở lên gần như chắc chắn thành một ô của biểu mẫu." },
          { label: "Chọn ô bắt buộc", detail: "Ô bắt buộc là thông tin thiếu thì bạn không thể bắt tay làm. Những thứ còn lại để tuỳ chọn hoặc bỏ hẳn." },
          { label: "Viết gợi ý dưới ô", detail: "Dưới ô mô tả, ghi một câu ví dụ để người gửi biết nên viết gì. Câu gợi ý tốt hơn một ô to trống." },
          { label: "Điền thử rồi phát", detail: "Tự điền ba yêu cầu thật gần đây. Ô nào bạn do dự hoặc phải đoán là ô cần viết lại trước khi phát cho cả phòng." },
        ],
      },
      { type: "heading", text: "Ô nào ở lại, ô nào ra đi" },
      {
        type: "comparison",
        left: {
          label: "Giữ lại",
          text: "Ô bạn hỏi lại nhiều lần. Ô khiến việc không thể bắt đầu nếu thiếu. Ô cho phép lọc và xếp theo thứ tự ưu tiên, như hạn giao hay loại yêu cầu.",
        },
        right: {
          label: "Bỏ đi",
          text: "Ô \"phòng khi cần\". Ô hỏi lại điều hệ thống đã biết, như tên người gửi khi họ đã đăng nhập. Ô hỏi thông tin cá nhân không dùng vào công việc.",
        },
      },
      {
        type: "callout",
        label: "Nhờ AI đúng chỗ",
        text: "AI giúp tốt ở việc soạn câu hỏi ngắn và câu gợi ý dưới ô. AI không biết phòng bạn hay thiếu thông tin nào, nên danh sách ô phải xuất phát từ yêu cầu cũ của bạn. Đừng dán thông tin khách thật vào khi chưa hỏi công ty cho phép.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn danh sách ô cho biểu mẫu yêu cầu thiết kế",
        task: "Phòng bạn hay bị thiếu kích thước, hạn giao và người duyệt. Lắp một prompt để AI đề xuất danh sách ô.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Làm cái biểu mẫu nhận yêu cầu giúp tôi.", feedback: "AI không biết phòng bạn làm gì và thiếu điều gì, nên nó trả về danh sách 20 ô chung cho mọi ngành." },
              { text: "Phòng tôi có 5 người thiết kế, nhận yêu cầu làm banner qua tin nhắn. Hay bị thiếu kích thước, hạn giao và người duyệt.", good: true, feedback: "Nói rõ ai, làm gì và thiếu gì, nên AI hiểu ô nào đáng ưu tiên." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Đề xuất tối đa 6 ô, đánh dấu ô nào bắt buộc, và viết một câu gợi ý dưới ô mô tả.", good: true, feedback: "Giới hạn số ô và yêu cầu đánh dấu bắt buộc giúp bạn nhận danh sách gọn." },
              { text: "Cho tôi mọi ô có thể cần, càng đầy đủ càng tốt.", feedback: "Đây chính là cách tạo biểu mẫu 20 ô mà người ta bỏ dở." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết đẹp một chút.", feedback: "Không có khuôn cụ thể, bạn sẽ nhận một đoạn văn thay vì danh sách bạn dán được vào biểu mẫu." },
              { text: "Trả về một bảng: tên ô, bắt buộc hay tuỳ chọn, câu gợi ý.", good: true, feedback: "Bảng ba cột dán thẳng vào công cụ làm biểu mẫu và dễ đối chiếu với yêu cầu cũ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Ô | Loại | Gợi ý |\n| Kích thước | Bắt buộc | Ví dụ: 1080x1080 cho bài đăng |\n| Hạn giao | Bắt buộc | Ngày và giờ cần nhận bản hoàn chỉnh |\n| Người duyệt | Bắt buộc | Ai quyết định bản cuối |\n| Nội dung chữ | Bắt buộc | Dán đúng chữ cần in lên banner |\n| Mô tả | Tuỳ chọn | Cần gì, cho ai, dùng vào việc gì? |\n| Tệp đính kèm | Tuỳ chọn | Logo, ảnh, bản mẫu tham khảo |",
          },
          {
            requires: ["context"],
            text: "Gợi ý các ô: họ tên, email, số điện thoại, phòng ban, ngày cần, kích thước, mô tả, tệp đính kèm, mức ưu tiên, ngân sách, ghi chú...\n\n(Có đúng ô bạn thiếu, nhưng thêm nhiều ô bạn chưa ai dùng và không nói ô nào bắt buộc.)",
          },
          {
            text: "Biểu mẫu nhận yêu cầu thường gồm: tên, email, điện thoại, địa chỉ, ngày sinh, nghề nghiệp, mục đích, ngân sách, nguồn biết đến...\n\n(Danh sách chung cho mọi ngành, AI không biết phòng bạn thiếu gì nên hỏi cả thứ bạn không dùng.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Biểu mẫu 14 ô và chuyện bị bỏ dở",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn phát biểu mẫu 14 ô cho cả phòng. Sau một tuần chỉ 4 trong 11 người gửi yêu cầu qua biểu mẫu, còn lại vẫn nhắn Zalo. Bạn làm gì?",
            choices: [
              { label: "Nhắn cả phòng: từ tuần sau ai không điền biểu mẫu sẽ không được xử lý", next: "bad_force" },
              { label: "Hỏi ba người vẫn nhắn Zalo ô nào khiến họ ngại, rồi xem ô nào chưa ai dùng", next: "s2" },
            ],
          },
          bad_force: {
            text: "Mọi người điền cho có: ô nào cũng viết \"x\" hoặc \"không\". Bạn có đủ 14 ô nhưng vẫn phải nhắn hỏi lại hạn giao và số lượng.",
            ending: "bad",
          },
          s2: {
            text: "Ba người nói: phần địa chỉ, ngân sách và mức ưu tiên khó điền, và họ không hiểu vì sao phải điền. Bạn kiểm lại 10 yêu cầu cũ: bạn chưa dùng cả ba ô.",
            choices: [
              { label: "Bỏ ba ô đó, còn 11 ô, rồi nhờ hai người điền thử lại", next: "good" },
              { label: "Giữ ba ô nhưng đổi thành tuỳ chọn để ai cũng thấy không bị ép", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Vẫn là 14 ô. Người gửi vẫn mất thời gian đọc ba ô họ không hiểu, và một nửa số người vẫn quay lại nhắn Zalo cho nhanh.",
            ending: "bad",
          },
          good: {
            text: "Biểu mẫu còn 11 ô, hai người thử điền xong trong 2 phút. Tuần sau 9 trong 11 người dùng biểu mẫu và bạn nhắn hỏi lại ít hẳn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi ô là một câu hỏi bạn bắt người khác trả lời: chỉ hỏi điều bạn sẽ dùng.",
          "Bài sau: biểu mẫu cho phép nhập ngày 31/02 thì sao, và cách bắt lỗi.",
        ],
      },
    ],
  },
  {
    id: 2546,
    slug: "bieu-mau-cho-nhap-sai-ngay-thang-va-so-dien-thoai",
    title: "Chặng 57, Bài 7: Biểu mẫu cho phép nhập sai: ngày tháng, số điện thoại, ô bỏ trống",
    subtitle: "Biểu mẫu không kiểm tra thì nhận cả ngày 31/02. Dữ liệu sai vào là lỗi ở mọi bước sau.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🛑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một ngày giao sai hoặc một số điện thoại thiếu số chẳng báo lỗi ngay. Nó nằm im trong bảng cho tới khi có người gọi nhầm khách hoặc bỏ lỡ hạn giao. Ngăn chỗ vào rẻ hơn rất nhiều so với sửa ở chỗ ra, và nhờ AI dựng luật kiểm tra chỉ mất vài phút nếu bạn biết luật nào cần.",
    openingQuestion:
      "Biểu mẫu của bạn nhận được ngày cần xong là 31/02 và số điện thoại \"0912\". Vì sao nên chặn ngay lúc nhập thay vì để kiểm lại sau?",
    openingOptions: [
      "Lỗi bị chặn lúc nhập thì người gửi sửa ngay được, còn để sau thì không ai biết nữa",
      "Vì tất cả người gửi đều cố tình nhập sai để thử biểu mẫu",
      "Vì kiểm tra sau luôn tốn nhiều tiền hơn một lần gọi AI",
      "Vì biểu mẫu nào không có luật kiểm tra thì không được cho phép chạy",
    ],
    correctOption: 0,
    explanation:
      "Lúc nhập, người gửi còn nhớ mình định viết gì và sửa trong vài giây. Để sau, bạn thấy số điện thoại thiếu mà không biết hỏi ai, hoặc phải nhắn hỏi lại. Phần lớn lỗi nhập sai là vô tình, không phải cố ý. Không có luật nào cấm biểu mẫu thiếu kiểm tra, nhưng thiếu thì dữ liệu sai sẽ chảy sang mọi bước sau.",
    diagram: [
      { label: "Người gửi nhập dữ liệu vào ô", arrow: true },
      { label: "Luật kiểm tra đọc giá trị ngay lúc nhập", arrow: true },
      { label: "Sai thì báo lỗi ngay cạnh ô, nói rõ cần sửa gì", arrow: true },
      { label: "Đúng thì dữ liệu mới vào bảng theo dõi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kho nhận lịch giao hàng",
      description:
        "Biểu mẫu đặt lịch giao không kiểm ngày. Một yêu cầu ghi ngày 31/04, bảng xếp lịch tự hiểu thành 1/05 theo cách của nó, và xe giao chạy trễ một ngày so với điều khách tưởng. Khi bổ sung luật \"ngày phải có thật và không ở quá khứ\", lỗi này hết xảy ra.",
    },
    quiz: [
      Q(
        "Luật kiểm tra nào chặn được ngày \"31/02\" trong biểu mẫu?",
        "Ngày phải là một ngày có thật trên lịch",
        [
          "Ô ngày chỉ cho nhập đúng 10 ký tự, kể cả dấu gạch chéo",
          "Ô ngày không được để trống",
          "Ô ngày chỉ nhận các chữ số từ 0 đến 9 và dấu gạch chéo",
        ],
        "Chỉ luật \"ngày có thật\" mới biết tháng 2 không có ngày 31. Đủ 10 ký tự, không bỏ trống hay chỉ gồm chữ số đều đúng với \"31/02/2026\", nên ba luật kia cho lọt lỗi đó."
      ),
      Q(
        "Số điện thoại \"0912\" bị chặn. Luật nào làm được điều đó?",
        "Độ dài số điện thoại",
        [
          "Số phải bắt đầu bằng chữ số 0, và \"0912\" bắt đầu bằng 0",
          "Số không được chứa khoảng trắng hay dấu chấm giữa các chữ số",
          "Ô số điện thoại không được để trống khi gửi biểu mẫu",
        ],
        "\"0912\" có đủ chữ số 0 đầu, không có khoảng trắng và không bỏ trống, nên ba luật kia đều cho qua. Chỉ luật về độ dài, thường 10 số, mới chặn được số thiếu."
      ),
      Q(
        "Người dùng để trống ô \"số lượng\" mà ô này bắt buộc. Thông báo lỗi nào tốt nhất?",
        "Vui lòng nhập số lượng, ví dụ 20",
        [
          "Dữ liệu không hợp lệ, vui lòng kiểm tra lại toàn bộ biểu mẫu",
          "Lỗi 400: yêu cầu không đúng định dạng ở trường số 3",
          "Có trường chưa điền",
        ],
        "Thông báo tốt nói rõ ô nào và nhập gì. Ba thông báo còn lại bắt người dùng tự dò lỗi nằm ở đâu, và mã lỗi kỹ thuật thì người không biết code không hiểu."
      ),
      Q(
        "Ô \"Ngày cần xong\" nên có thêm luật nào ngoài \"ngày có thật\"?",
        "Không được là ngày đã qua",
        [
          "Phải nằm trong tháng hiện tại, để ngày không bị xa quá",
          "Phải rơi vào ngày thường, vì ai cũng không làm việc cuối tuần",
          "Phải nhập dưới dạng chữ, chẳng hạn \"mùng mười tháng ba\"",
        ],
        "Ngày cần xong đã qua là lỗi vô lý và dễ chặn. Giới hạn trong tháng hiện tại thì chặn luôn các dự án dài, và cấm cuối tuần là giả định không phải phòng nào cũng đúng, còn nhập bằng chữ làm máy khó đọc."
      ),
      Q(
        "Bạn nhờ AI dựng luật kiểm tra. Cách nhờ nào cho kết quả tốt nhất?",
        "Liệt kê từng ô và từng luật, rồi đưa ví dụ vài giá trị đúng và sai cho mỗi luật",
        [
          "Nhờ \"kiểm tra giúp tôi mọi lỗi có thể xảy ra trong biểu mẫu\"",
          "Nhờ AI tự quyết luật nào cần, rồi tin là nó đã nghĩ đủ",
          "Chỉ mô tả mục đích biểu mẫu và để AI đoán các luật cần thiết",
        ],
        "Khi bạn nêu luật và đưa ví dụ đúng, sai, AI dựng đúng và bạn kiểm được bằng chính các ví dụ đó. Nhờ chung chung hay để AI tự đoán thì nó bỏ sót luật riêng của phòng bạn, như định dạng mã đơn."
      ),
    ],
    keyTakeaways: [
      "Dữ liệu sai vào càng sớm, thiệt hại càng lớn ở các bước sau.",
      "Ngày phải có thật, số điện thoại phải đủ độ dài, ô bắt buộc không được trống.",
      "Thông báo lỗi nói rõ ô nào và nhập gì cho đúng.",
      "Nhờ AI kèm ví dụ đúng và sai cho mỗi luật.",
      "Tự thử từng luật bằng giá trị sai cố ý.",
    ],
    practicePrompt: {
      question:
        "Biểu mẫu chấp nhận ngày cần xong là 15/03/2020 trong khi hôm nay là năm sau. Luật nào bổ sung hợp lý nhất?",
      options: [
        "Ngày cần xong không được sớm hơn ngày hôm nay",
        "Ngày cần xong phải đúng 10 ký tự gồm cả dấu gạch chéo",
        "Ngày cần xong chỉ được chọn trong năm hiện tại",
        "Ngày cần xong phải khác ngày lập yêu cầu ít nhất một tháng",
      ],
      correct: 0,
      explanation:
        "Ngày quá khứ là lỗi rõ ràng và chặn được bằng một luật đơn giản. Đủ 10 ký tự không ngăn được ngày quá khứ. Giới hạn trong năm hiện tại chặn cả việc lên kế hoạch cuối năm. Bắt cách một tháng thì chặn mất các đơn gấp hợp lệ.",
    },
    summary: {
      keyIdea: "Chặn lỗi ở cửa vào rẻ hơn rất nhiều so với sửa dữ liệu sai ở cửa ra.",
      formula: "Ô + luật + ví dụ đúng + ví dụ sai + thông báo lỗi rõ = ô được bảo vệ.",
      commonMistake: "Chỉ kiểm định dạng (đủ 10 ký tự) mà quên kiểm ý nghĩa (ngày có thật).",
      action: "Chọn ô quan trọng nhất trong biểu mẫu và viết ba giá trị sai để thử nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy biểu mẫu hoặc bảng nhập liệu bạn dùng thật (hoặc danh sách ô của bài trước). Với ba ô quan trọng nhất, viết mỗi ô một luật, một ví dụ đúng và hai ví dụ sai. Nhờ AI viết câu thông báo lỗi cho từng ô. Mai bạn sẽ được hỏi: ô nào của bạn nhận được giá trị sai đáng ngạc nhiên nhất?",
      secondary: "Nhờ đồng nghiệp cố tình nhập sai vào ba ô đó và xem thông báo nào họ hiểu ngay.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn mở bảng theo dõi tuần trước và thấy một dòng có hạn giao là 31/02 và số điện thoại khách chỉ có bốn số. Không ai biết đã gõ thế nào. Bài này giúp bạn tìm những luật còn thiếu ở cửa vào.",
      },
      {
        type: "feynman",
        title: "Kiểm tra dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung nhân viên bảo vệ ở cổng công ty. Anh nhìn thẻ: có ảnh không, còn hạn không, đúng người không. Anh không cần hiểu công việc của bạn, chỉ cần biết thẻ có hợp lệ.",
        columns: ["Thành phần", "Bảo vệ ở cổng", "Luật kiểm tra trong biểu mẫu"],
        rows: [
          ["Việc làm", "Nhìn thẻ lúc người vào", "Nhìn giá trị lúc người gửi nhập"],
          ["Luật", "Thẻ còn hạn, đúng người", "Ngày có thật, đủ số điện thoại"],
          ["Khi sai", "Dừng lại, nói rõ thiếu gì", "Báo lỗi cạnh ô, nói cần sửa gì"],
          ["Điều không làm", "Không xét bạn làm việc giỏi hay dở", "Không đoán người gửi có muốn nói điều khác"],
        ],
        oneLiner: "Luật kiểm tra là người bảo vệ ở cổng: chặn thẻ hết hạn ngay lúc vào.",
      },
      { type: "heading", text: "Bốn luật đủ dùng cho phần lớn biểu mẫu nhỏ" },
      {
        type: "list",
        items: [
          "Bắt buộc: ô nào thiếu thì không làm được việc thì không được trống.",
          "Ngày có thật, và nếu là hạn giao thì không ở quá khứ.",
          "Số điện thoại đủ độ dài, không chứa chữ cái.",
          "Số lượng là số nguyên dương, không âm và không bằng không.",
        ],
      },
      {
        type: "flow",
        title: "Điều xảy ra khi người gửi nhập dữ liệu",
        steps: [
          { label: "Người gửi gõ vào ô", detail: "Giá trị chỉ mới nằm trên màn hình của họ. Nó chưa vào bảng theo dõi của bạn." },
          { label: "Luật đọc giá trị", detail: "Công cụ đem giá trị so với luật của ô: ngày có thật không, số điện thoại đủ độ dài không, ô bắt buộc có trống không." },
          { label: "Sai thì báo ngay", detail: "Thông báo hiện cạnh đúng ô lỗi, nói rõ cần sửa gì và có ví dụ. Người gửi sửa trong vài giây khi còn nhớ mình định gõ gì." },
          { label: "Đúng mới được gửi", detail: "Khi mọi ô hợp lệ thì nút gửi mới chạy, và dữ liệu sạch mới chảy sang bảng theo dõi." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát luật của một biểu mẫu mẫu do AI dựng",
        task: "Bạn nhờ AI dựng biểu mẫu đặt lịch giao hàng và đọc phần mô tả luật kiểm tra của nó. Đánh dấu những luật AI mô tả thiếu hoặc sai so với mong muốn: ngày phải có thật và không quá khứ, số điện thoại 10 số, số lượng dương.",
        segments: [
          { text: "Ô \"Tên người nhận\" là bắt buộc và không được trống." },
          {
            text: "Ô \"Ngày giao\" chỉ cần nhập đủ 10 ký tự theo dạng NN/TT/NNNN.",
            error: "Luật chỉ kiểm độ dài nên cho lọt ngày 31/02/2026 và cả ngày đã qua. Cần thêm luật ngày có thật và không ở quá khứ.",
          },
          {
            text: "Ô \"Số điện thoại\" chấp nhận mọi chuỗi chữ số từ 4 đến 15 ký tự.",
            error: "Số 5 chữ số vẫn lọt. Số điện thoại di động trong nước cần luật độ dài đúng, không cho mọi chuỗi ngắn qua.",
          },
          { text: "Ô \"Số lượng\" phải là số nguyên lớn hơn 0." },
          {
            text: "Nếu có ô nhập sai, biểu mẫu hiện dòng chữ \"Dữ liệu không hợp lệ\" ở đầu trang.",
            error: "Thông báo không chỉ ra ô nào sai và cần sửa gì. Lỗi nên hiện cạnh ô và nói rõ, ví dụ \"Số điện thoại cần đủ 10 số\".",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết luật kiểm tra cho ô ngày và ô số điện thoại",
        task: "Bạn muốn AI viết mô tả luật cho hai ô này để kiểm tra lại và dán vào công cụ.",
        parts: [
          {
            id: "rules",
            label: "Luật",
            options: [
              { text: "Kiểm tra ô ngày và ô số điện thoại cho đúng.", feedback: "\"Cho đúng\" không phải luật: AI tự chọn luật lỏng và bạn không biết nó chặn gì." },
              { text: "Ngày phải có thật và không ở quá khứ. Số điện thoại phải đủ 10 chữ số, chỉ gồm số.", good: true, feedback: "Hai luật nêu được bằng một câu mỗi ô, kiểm được bằng ví dụ." },
            ],
          },
          {
            id: "examples",
            label: "Ví dụ",
            options: [
              { text: "Đúng: 15/12/2026 và 0912345678. Sai: 31/02/2026, 05/01/2020 và 0912.", good: true, feedback: "Ví dụ đúng và sai cho AI biết biên giới của luật, và bạn tự thử lại được." },
              { text: "Không cần ví dụ, AI đã biết ngày tháng là gì.", feedback: "Không có ví dụ thì AI tự đoán định dạng, và bạn không có mốc để kiểm nó làm đúng." },
            ],
          },
          {
            id: "message",
            label: "Thông báo lỗi",
            options: [
              { text: "Thông báo chung \"Dữ liệu sai\" cho mọi trường hợp.", feedback: "Người gửi không biết ô nào sai, sẽ bỏ cuộc hoặc nhắn hỏi bạn." },
              { text: "Mỗi ô một thông báo ngắn nêu cần sửa gì, kèm một ví dụ.", good: true, feedback: "Người gửi sửa ngay tại ô mà không phải hỏi ai." },
            ],
          },
        ],
        responses: [
          {
            requires: ["rules", "examples", "message"],
            text: "Ô ngày: phải là ngày có thật và không sớm hơn hôm nay. Nếu sai, hiện: \"Ngày không hợp lệ, ví dụ 15/12/2026\".\nÔ số điện thoại: đúng 10 chữ số. Nếu sai, hiện: \"Số điện thoại cần đủ 10 số, ví dụ 0912345678\".\nThử: 31/02/2026 bị chặn, 05/01/2020 bị chặn, 0912 bị chặn.",
          },
          {
            requires: ["rules"],
            text: "Ô ngày kiểm có thật và không quá khứ. Ô số điện thoại đủ 10 số.\n\n(Đúng luật nhưng không có ví dụ để bạn thử và thông báo lỗi còn chung chung.)",
          },
          {
            text: "Ô ngày và ô số điện thoại cần được kiểm tra hợp lệ trước khi gửi.\n\n(AI không biết luật cụ thể nên viết câu đúng mà không làm được gì.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Tự thử bằng giá trị sai cố ý",
        text: "Sau khi AI dựng luật, đừng thử bằng giá trị đúng. Hãy gõ thử những giá trị sai bạn đã chuẩn bị: ngày 31/02, số điện thoại 4 số, ô bắt buộc để trống. Luật nào không chặn được giá trị sai tương ứng là luật chưa hoạt động.",
      },
      {
        type: "closing",
        lines: [
          "Luật kiểm tra là người bảo vệ ở cổng: chặn giá trị sai trước khi nó vào bảng.",
          "Bài sau: tự làm máy tính báo giá nhiều dòng và kiểm thứ tự tính bằng tay.",
        ],
      },
    ],
  },
  {
    id: 2547,
    slug: "may-tinh-bao-gia-nhieu-dong-va-chiet-khau",
    title: "Chặng 57, Bài 8: Máy tính báo giá có nhiều dòng và chiết khấu",
    subtitle: "Công thức đúng mà thứ tự tính sai vẫn ra con số sai. Tự thử bằng tay hai dòng hàng là đủ biết.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Báo giá là chỗ một con số sai nhìn thấy ngay: khách đối chiếu hoá đơn và hỏi. Khi AI dựng máy tính báo giá, nó có thể tính chiết khấu trước hay sau khi cộng các dòng mà không báo bạn. Hai cách ra hai kết quả khác nhau, và chỉ bạn biết cách nào phòng bạn áp dụng. Tự thử bằng tay hai dòng hàng cho bạn biết ngay.",
    openingQuestion:
      "Báo giá gồm 2 dòng: 10 cái giá 100 nghìn và 5 cái giá 200 nghìn, giảm 10% cho cả đơn. Tổng tiền đúng là bao nhiêu?",
    openingOptions: [
      "1.800 nghìn (= (1.000 + 1.000) × 0,9)",
      "2.000 nghìn (quên trừ phần giảm giá 10%)",
      "1.900 nghìn (= 2.000 − 100, trừ nhầm 100 nghìn thay vì 10%)",
      "1.700 nghìn (= 2.000 × 0,9 − 100, giảm hai lần)",
    ],
    correctOption: 0,
    explanation:
      "Mỗi dòng: 10 × 100 = 1.000 nghìn và 5 × 200 = 1.000 nghìn, cộng lại 2.000 nghìn. Giảm 10% cho cả đơn là 2.000 × 0,9 = 1.800 nghìn. Con số 2.000 quên bước giảm, 1.900 trừ nhầm số cố định 100 thay vì tính phần trăm, còn 1.700 giảm hai lần (2.000 × 0,9 = 1.800, rồi trừ thêm 100).",
    diagram: [
      { label: "Mỗi dòng: số lượng × đơn giá = thành tiền dòng", arrow: true },
      { label: "Cộng thành tiền của mọi dòng ra tổng trước giảm", arrow: true },
      { label: "Trừ chiết khấu tính trên tổng", arrow: true },
      { label: "Tổng tiền báo cho khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kinh doanh thiết bị văn phòng",
      description:
        "Một nhân viên nhờ AI dựng máy tính báo giá, dùng thử với đơn một dòng thấy đúng. Khi khách đặt ba dòng hàng kèm giảm 5%, máy tính ra tổng lệch vì nó tính giảm trên từng dòng rồi làm tròn từng dòng. Sau đó nhân viên luôn tự tính tay một đơn hai dòng có giảm giá trước khi đưa cho đồng nghiệp dùng.",
    },
    quiz: [
      Q(
        "Báo giá hai dòng: 4 × 250 nghìn và 2 × 100 nghìn. Tổng trước giảm là bao nhiêu?",
        "1.200 nghìn",
        [
          "950 nghìn (= 4 × 250 − 2 × 100 − 50, cộng thiếu một dòng)",
          "350 nghìn (= 250 + 100, cộng hai đơn giá mà quên số lượng)",
          "1.100 nghìn (= 4 × 250 + 100, quên nhân dòng thứ hai)",
        ],
        "Dòng 1: 4 × 250 = 1.000. Dòng 2: 2 × 100 = 200. Tổng 1.200 nghìn. Cộng hai đơn giá cho 350, quên nhân dòng hai cho 1.100, còn 950 là phép cộng trừ lung tung không có cách tính nào đỡ lấy."
      ),
      Q(
        "Đơn 2.000 nghìn, chiết khấu 10% cho cả đơn. Công thức nào đúng?",
        "2.000 × (1 − 0,10) = 1.800 nghìn",
        [
          "2.000 − 10 = 1.990 nghìn, vì trừ thẳng số 10 vào tổng tiền",
          "2.000 ÷ 0,10 = 20.000 nghìn, vì chia cho tỷ lệ chiết khấu",
          "2.000 × 0,10 = 200 nghìn",
        ],
        "Giảm 10% nghĩa là khách trả 90% giá. Trừ 10 thẳng ra 1.990 (coi 10% là 10 đồng). Chia cho 0,10 ra 20.000 vô lý. Nhân 0,10 ra 200 là số tiền được giảm chứ không phải tiền phải trả."
      ),
      Q(
        "Máy tính AI dựng in ra tổng 1.750 nghìn cho đơn bạn vừa tính tay ra 1.800 nghìn. Làm gì?",
        "Xem AI tính giảm trước hay sau khi cộng, và tính lại từng bước bằng tay",
        [
          "Tin máy vì máy không bao giờ sai phép tính, nên lệch 50 nghìn chắc là do bạn tính nhầm",
          "Làm tròn 1.750 lên 1.800 cho đẹp rồi dùng luôn",
          "Đổi hết các con số thử cho tới khi máy ra đúng 1.800",
        ],
        "Hai con số lệch là tín hiệu thứ tự tính khác nhau hoặc một công thức sai. Phải truy tới bước gây lệch. Tin máy, làm tròn hay đổi số thử cho khớp đều giấu lỗi, và lỗi đó sẽ lộ ra với khách thật."
      ),
      Q(
        "Khi nhờ AI dựng máy tính báo giá, điều nào quan trọng nhất phải nói rõ?",
        "Thứ tự tính: giảm giá áp lên tổng cả đơn hay từng dòng",
        [
          "Màu nền và phông chữ của bảng báo giá",
          "Tên bạn và tên công ty hiện trên đầu trang",
          "Số dòng hàng tối đa, để bảng khỏi dài quá",
        ],
        "Thứ tự áp giảm giá thay đổi con số cuối, còn màu sắc, tên công ty hay số dòng tối đa không đổi kết quả. Phải nói rõ vì AI sẽ tự chọn một cách nếu bạn không nêu."
      ),
      Q(
        "Đơn hai dòng 1.000 và 1.000 nghìn, chiết khấu 10% cho cả đơn. Bạn đọc thấy máy in 1.000 × 0,9 + 1.000 × 0,9 = 1.800. Kết luận nào đúng?",
        "Kết quả trùng vì phép nhân phân phối, cách tính này đúng khi giảm đều mọi dòng",
        [
          "Máy sai vì giảm giá chỉ được áp lên tổng cuối, không bao giờ áp lên từng dòng riêng lẻ của đơn",
          "Máy sai vì hai dòng phải được cộng trước khi làm bất cứ phép nhân nào",
          "Máy đúng ngẫu nhiên, với số khác thì hai cách chắc chắn ra hai kết quả",
        ],
        "Nhân giảm giá vào từng dòng rồi cộng bằng nhân giảm giá vào tổng khi tỷ lệ giảm như nhau ở mọi dòng. Chỗ hai cách khác nhau là khi làm tròn từng dòng hoặc khi mức giảm khác nhau theo dòng. Nên phải nói rõ giảm theo dòng hay theo đơn."
      ),
    ],
    keyTakeaways: [
      "Thành tiền một dòng = số lượng × đơn giá; tổng = cộng các dòng.",
      "Giảm 10% nghĩa là nhân với 0,9, không phải trừ thẳng số 10.",
      "Thứ tự tính (giảm theo dòng hay theo đơn) phải được nói rõ cho AI.",
      "Tự tính tay một đơn hai dòng có giảm giá trước khi tin máy.",
      "Hai kết quả lệch nhau là tín hiệu để tìm bước sai, không phải để làm tròn cho khớp.",
    ],
    practicePrompt: {
      question:
        "Đơn hai dòng: 3 × 500 nghìn và 2 × 250 nghìn, giảm 20% cho cả đơn. Khách phải trả bao nhiêu?",
      options: [
        "1.600 nghìn (= (1.500 + 500) × 0,8)",
        "1.980 nghìn (= 2.000 − 20, trừ thẳng 20 thay vì 20%)",
        "400 nghìn (= 2.000 × 0,2, đó là tiền được giảm)",
        "2.000 nghìn (quên bước giảm giá 20% nên giữ nguyên tổng)",
      ],
      correct: 0,
      explanation:
        "Dòng 1: 3 × 500 = 1.500. Dòng 2: 2 × 250 = 500. Tổng 2.000. Giảm 20% còn 80%: 2.000 × 0,8 = 1.600 nghìn. 1.980 coi 20% là số 20, 400 là số tiền được giảm, còn 2.000 là bỏ qua giảm giá.",
    },
    summary: {
      keyIdea: "Máy tính đúng khi từng bước đúng, và chỉ bạn biết thứ tự tính của phòng mình.",
      formula: "Tổng = (cộng các dòng số lượng × đơn giá) × (1 − chiết khấu).",
      commonMistake: "Kiểm bằng một đơn một dòng rồi tin máy cho mọi đơn nhiều dòng.",
      action: "Chọn hai dòng hàng thật, tính tay, rồi so với con số máy in ra.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một báo giá thật gần đây của bạn (hai dòng hàng trở lên, có giảm giá nếu có). Ghi ra giấy cách tính của phòng bạn, rồi nhờ AI dựng máy tính cho đúng cách đó. Tự tính tay một đơn và so với máy. Mai bạn sẽ được hỏi: máy và tay có khớp không, nếu lệch thì do bước nào?",
      secondary: "Thử thêm một đơn có giảm 0% và một đơn có số lượng bằng 1 để xem máy có xử lý biên không.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng bạn đưa cho khách một báo giá tám dòng, có giảm 8% cho cả đơn. Khách đối chiếu hoá đơn và hỏi vì sao tổng lệch vài trăm nghìn. Bài này dạy một thói quen rẻ: tự thử hai dòng hàng bằng tay trước khi tin máy.",
      },
      {
        type: "feynman",
        title: "Máy tính báo giá đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đi chợ với tờ giấy ghi từng món: 3 cân cam, 2 cân táo. Bạn nhân giá từng món, cộng lại, rồi người bán giảm cho khách quen. Nếu thứ tự là cộng trước rồi mới giảm, hay giảm từng món rồi mới cộng, con số có thể lệch.",
        columns: ["Thành phần", "Đi chợ với tờ giấy", "Máy tính báo giá"],
        rows: [
          ["Mỗi món", "Số cân × giá mỗi cân", "Số lượng × đơn giá"],
          ["Gộp lại", "Cộng tiền các món", "Cộng thành tiền các dòng"],
          ["Giảm giá", "Giảm cho cả giỏ hoặc từng món", "Chiết khấu theo đơn hoặc theo dòng"],
          ["Kiểm tra", "Nhẩm lại bằng tay trước khi trả tiền", "Tính tay hai dòng rồi so với máy"],
        ],
        oneLiner: "Máy tính báo giá là tờ giấy đi chợ: nhân từng món, cộng, giảm - và bạn nhẩm lại một lần.",
      },
      { type: "heading", text: "Vì sao một dòng thì đúng mà nhiều dòng thì lệch" },
      {
        type: "paragraph",
        text: "Với một dòng hàng chỉ có một cách tính nên AI khó sai. Có hai dòng và một mức giảm thì nảy ra câu hỏi: giảm áp lên từng dòng hay lên tổng? Làm tròn từng dòng hay làm tròn cuối? AI chọn một cách và không báo bạn, nên tự thử bằng tay là cách nhanh nhất để phát hiện.",
      },
      {
        type: "chart",
        title: "Tổng tiền thay đổi thế nào theo mức chiết khấu",
        caption: "Số liệu minh hoạ: dòng A và dòng B là hai dòng hàng bất kỳ. Kéo thanh trượt để xem tổng tiền (nghìn đồng) giảm theo mức chiết khấu từ 0% đến 30%. Thử bằng số của đơn thật của bạn.",
        kind: "line",
        xLabel: "Chiết khấu (%)",
        yLabel: "Tổng tiền (nghìn đồng)",
        x: { from: 0, to: 30, step: 5 },
        params: [
          { id: "slA", label: "Số lượng dòng A", min: 1, max: 50, step: 1, value: 10, unit: "cái" },
          { id: "giaA", label: "Đơn giá dòng A", min: 10, max: 500, step: 10, value: 100, unit: "nghìn" },
          { id: "slB", label: "Số lượng dòng B", min: 1, max: 50, step: 1, value: 5, unit: "cái" },
          { id: "giaB", label: "Đơn giá dòng B", min: 10, max: 500, step: 10, value: 200, unit: "nghìn" },
        ],
        series: [{ label: "Tổng sau chiết khấu", expr: "(slA * giaA + slB * giaB) * (1 - x / 100)" }],
      },
      {
        type: "comparison",
        left: {
          label: "Giảm trên cả đơn",
          text: "Cộng mọi dòng trước, rồi nhân với (1 − mức giảm). Một phép tính cuối, dễ tự kiểm bằng tay. Phù hợp khi phòng bạn cho giảm theo tổng giá trị đơn.",
        },
        right: {
          label: "Giảm trên từng dòng",
          text: "Mỗi dòng có mức giảm riêng, nhân rồi mới cộng. Kết quả có thể lệch vài đồng khi làm tròn từng dòng. Phải nói rõ với AI nếu bạn cần cách này.",
        },
      },
      {
        type: "flow",
        title: "Cách thử máy tính báo giá bằng hai dòng hàng",
        steps: [
          { label: "Chọn hai dòng hàng thật", detail: "Lấy số lượng và đơn giá từ một báo giá bạn đã gửi khách. Chọn số tròn để tính nhẩm được." },
          { label: "Tính tay thành tiền từng dòng", detail: "Ghi ra giấy số lượng nhân đơn giá cho mỗi dòng. Đừng nhờ máy tính ở bước này." },
          { label: "Cộng rồi áp chiết khấu", detail: "Cộng hai dòng, sau đó nhân với (1 trừ mức giảm). Ghi con số cuối cùng bạn mong đợi." },
          { label: "Nhập vào máy và so", detail: "Nhập đúng hai dòng đó. Khớp thì thử thêm đơn giảm 0%; lệch thì tìm bước sai, đừng làm tròn cho khớp." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng máy tính báo giá nhiều dòng",
        task: "Bạn cần máy tính nhập nhiều dòng hàng và một mức chiết khấu cho cả đơn. Lắp prompt để AI dựng đúng.",
        parts: [
          {
            id: "structure",
            label: "Cấu trúc",
            options: [
              { text: "Làm máy tính báo giá cho tôi.", feedback: "AI tự quyết số dòng, cách giảm giá và cách làm tròn, rồi không nói cho bạn biết." },
              { text: "Nhập được 1 đến 10 dòng hàng (tên, số lượng, đơn giá) và một ô chiết khấu phần trăm cho cả đơn.", good: true, feedback: "Nêu rõ các ô nhập và mức giảm áp lên cả đơn, không chỗ nào để AI đoán." },
            ],
          },
          {
            id: "order",
            label: "Thứ tự tính",
            options: [
              { text: "Cộng thành tiền các dòng, rồi nhân với (1 − chiết khấu). Làm tròn đến đồng ở tổng cuối.", good: true, feedback: "Thứ tự và chỗ làm tròn được nêu rõ, và bạn tự tính tay theo đúng thứ tự này." },
              { text: "Tính sao cho ra con số hợp lý.", feedback: "\"Hợp lý\" là thứ AI tự đoán, và bạn không có mốc để kiểm." },
            ],
          },
          {
            id: "test",
            label: "Ví dụ để tự thử",
            options: [
              { text: "Không cần ví dụ, tôi sẽ tự thử sau.", feedback: "Không có ví dụ chuẩn trong yêu cầu thì AI không tự kiểm được, và bạn không có sẵn mốc." },
              { text: "Ví dụ kiểm: 10 × 100 và 5 × 200, giảm 10% thì phải ra 1.800.", good: true, feedback: "Ví dụ có đáp án giúp cả AI và bạn kiểm máy ngay lần chạy đầu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["structure", "order", "test"],
            text: "Đã dựng máy tính: nhập tối đa 10 dòng (tên, số lượng, đơn giá) và một ô chiết khấu phần trăm.\nThành tiền mỗi dòng = số lượng × đơn giá. Tổng = cộng các dòng × (1 − chiết khấu), làm tròn ở cuối.\nKiểm ví dụ của bạn: 10 × 100 + 5 × 200 = 2.000; giảm 10% = 1.800. Khớp.",
          },
          {
            requires: ["structure"],
            text: "Đã dựng máy tính nhập nhiều dòng và chiết khấu. Tổng hiện ở cuối.\n\n(Không rõ thứ tự tính nên AI tự chọn giảm theo từng dòng và làm tròn từng dòng: với một số đơn tổng lệch vài đồng so với tính tay.)",
          },
          {
            text: "Đã dựng máy tính báo giá. Nhập tên hàng, số lượng, giá và nhận tổng.\n\n(Bản mặc định chỉ có một dòng hàng và không có chiết khấu: không dùng được cho báo giá thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Máy in 1.750 trong khi bạn tính tay ra 1.800",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn thử đơn hai dòng 10 × 100 và 5 × 200, giảm 10%. Tay ra 1.800 nghìn, máy AI dựng in ra 1.750 nghìn. Đã 4 giờ chiều và khách chờ báo giá.",
            choices: [
              { label: "Báo 1.750 cho khách vì máy in ra rồi, lệch 50 nghìn không đáng kể", next: "bad_trust" },
              { label: "Hỏi AI máy đang tính theo thứ tự nào, rồi so từng bước với cách tính tay của bạn", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Khách đối chiếu và thấy báo giá ít hơn 50 nghìn so với giá niêm yết sau giảm. Bạn phải xin lỗi và báo lại, còn đồng nghiệp hỏi sao máy báo giá chưa ai kiểm.",
            ending: "bad",
          },
          s2: {
            text: "AI trả lời: máy tính giảm 10% rồi trừ thêm 50 nghìn phí cố định mà bạn chưa hề yêu cầu. Bạn cần sửa yêu cầu.",
            choices: [
              { label: "Yêu cầu AI bỏ khoản 50 nghìn, tính lại đúng thứ tự rồi tự thử hai đơn nữa", next: "good" },
              { label: "Sửa tay con số cuối mỗi lần in cho khớp", next: "bad_patch" },
            ],
          },
          bad_patch: {
            text: "Mỗi báo giá bạn phải nhớ cộng lại 50 nghìn. Tuần sau đồng nghiệp dùng máy không biết điều này và báo giá thiếu liên tục.",
            ending: "bad",
          },
          good: {
            text: "Máy in đúng 1.800 cho đơn thử và đúng cho hai đơn khác bạn tính tay. Bạn ghi thứ tự tính vào mô tả của công cụ để đồng nghiệp đọc được.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Máy đúng khi từng bước đúng: tự tính tay hai dòng hàng trước khi tin nó.",
          "Bài sau: bảng theo dõi cho cả nhóm nhỏ, và chuyện ai đang giữ đơn nào.",
        ],
      },
    ],
  },
  {
    id: 2548,
    slug: "bang-theo-doi-viec-can-lam-cho-ca-nhom-nho",
    title: "Chặng 57, Bài 9: Bảng theo dõi đơn hoặc việc cho cả nhóm nhỏ",
    subtitle: "Bảng tốt trả lời ba câu: việc nào, ai giữ, bao giờ xong. Thiếu một cột là có người cãi nhau.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhóm nhỏ thường theo dõi việc bằng trí nhớ và tin nhắn. Hai người cùng nghĩ người kia đang làm đơn, hoặc không ai biết đơn nào quá hạn. Một bảng có ba cột đúng (trạng thái, người phụ trách, ngày hẹn) thay một buổi họp đứng mỗi sáng. Bạn chỉ cần chọn cột, AI dựng bảng.",
    openingQuestion:
      "Nhóm 6 người cãi nhau vì hai người cùng làm một đơn và một đơn khác không ai làm. Cột nào chắc chắn phải có để tránh chuyện này?",
    openingOptions: [
      "Người phụ trách: mỗi việc có đúng một tên",
      "Mức ưu tiên từ 1 đến 10 cho mọi việc",
      "Ghi chú dài để mỗi người tự kể tình hình của mình",
      "Ngày tạo việc, tính theo giờ và phút",
    ],
    correctOption: 0,
    explanation:
      "Hai người cùng làm một đơn là do không ai ghi tên ai giữ, và đơn không ai làm cũng vì thế. Cột người phụ trách với đúng một tên trả lời câu \"ai chịu trách nhiệm\" ngay. Mức ưu tiên, ghi chú và ngày tạo hữu ích nhưng không giải quyết chuyện giẫm chân nhau.",
    diagram: [
      { label: "Việc mới vào bảng với trạng thái Mới", arrow: true },
      { label: "Có người nhận: điền tên vào cột người phụ trách", arrow: true },
      { label: "Đang làm: cập nhật trạng thái và ngày hẹn", arrow: true },
      { label: "Xong hoặc bị chặn: ghi rõ lý do và người liên quan" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: bộ phận chăm sóc đơn hàng 5 người",
      description:
        "Bộ phận theo dõi đơn qua nhóm chat. Đơn khách VIP bị nhắc hai lần vì hai người cùng trả lời, còn một đơn khác quá hạn ba ngày mà không ai hay. Bộ phận chuyển sang bảng có 5 cột: mã đơn, trạng thái, người phụ trách, ngày hẹn, ghi chú. Họp đứng đầu ngày chỉ còn nhìn bảng.",
    },
    quiz: [
      Q(
        "Bảng theo dõi việc của nhóm nhỏ nên có tối thiểu những cột nào?",
        "Tên việc, trạng thái, người phụ trách, ngày hẹn",
        [
          "Tên việc, màu sắc, biểu tượng cảm xúc, ngày tạo",
          "Tên việc, ghi chú dài, tệp đính kèm, liên kết mạng xã hội",
          "Tên việc, số điện thoại, địa chỉ, ngày sinh người phụ trách",
        ],
        "Bốn cột đầu trả lời ba câu nhóm hỏi mỗi ngày: việc gì, ai làm, bao giờ xong. Màu sắc, tệp đính kèm hay thông tin cá nhân của người phụ trách không giúp trả lời các câu đó."
      ),
      Q(
        "Một việc có hai người cùng tên trong cột \"Người phụ trách\". Nên làm gì?",
        "Chọn một người chịu trách nhiệm, người kia ghi ở cột hỗ trợ",
        [
          "Giữ hai tên, vì hai người làm thì nhanh hơn một người",
          "Xoá cả hai tên và chờ có người tự nhận việc này",
          "Đổi cột thành ô ghi chú để ai cũng viết được tên mình",
        ],
        "Hai tên thì khi việc trễ không ai nhận là mình, xoá tên thì việc thành không chủ, và ô ghi chú mở thì mỗi người viết một kiểu. Một người chịu trách nhiệm, người còn lại hỗ trợ, là đủ rõ."
      ),
      Q(
        "Cột \"Trạng thái\" nên có bao nhiêu giá trị là hợp lý cho nhóm nhỏ?",
        "Từ 3 đến 5 giá trị, như Mới, Đang làm, Chờ khách, Xong",
        [
          "Hơn 12 giá trị, để mô tả chính xác mọi tình huống có thể xảy ra",
          "Chỉ 2 giá trị là Xong và Chưa xong, để bảng thật đơn giản",
          "Không giới hạn, cho mỗi người tự gõ trạng thái mình muốn",
        ],
        "Quá nhiều giá trị thì không ai nhớ mình chọn cái nào, quá ít thì mất tình trạng Chờ khách, còn để tự gõ thì mỗi người viết một kiểu và bạn không lọc được. Ba đến năm giá trị cố định là vừa đủ."
      ),
      Q(
        "Cột \"Ngày hẹn\" giúp nhóm nhỏ làm được điều gì mà cột trạng thái không làm được?",
        "Phát hiện việc quá hạn mà chưa ai nhắc tới",
        [
          "Cho biết ai đang rảnh để chia thêm việc",
          "Cho biết việc nào khó hơn để giao người giỏi hơn",
          "Cho biết khách hàng nào quan trọng nhất của nhóm",
        ],
        "Trạng thái chỉ nói việc đang ở đâu, còn ngày hẹn so với hôm nay cho thấy việc nào đã trễ. Ngày hẹn không nói ai rảnh, việc nào khó hay khách nào quan trọng."
      ),
      Q(
        "Nhờ AI dựng bảng theo dõi, mô tả nào giúp AI làm đúng nhất?",
        "Liệt kê tên cột, các giá trị trạng thái cố định và ai được sửa cột nào",
        [
          "Nói \"làm bảng theo dõi việc cho nhóm tôi\" rồi chờ AI tự đoán các cột cần có và cả cách chia trạng thái",
          "Dán toàn bộ tin nhắn cũ của nhóm và nhờ AI tự chọn các cột",
          "Gửi ảnh chụp bảng của nhóm khác rồi nhờ làm y hệt",
        ],
        "Khi bạn nêu rõ cột, giá trị và quyền sửa, AI dựng đúng ý. Mô tả mơ hồ hay dán tin nhắn cũ thì AI tự chọn cột, còn sao chép bảng nhóm khác thì mang theo cột không hợp với việc của bạn."
      ),
    ],
    keyTakeaways: [
      "Bảng tốt trả lời ba câu: việc nào, ai giữ, bao giờ xong.",
      "Mỗi việc có đúng một người chịu trách nhiệm.",
      "Trạng thái chọn từ 3 đến 5 giá trị cố định.",
      "Ngày hẹn giúp thấy ngay việc quá hạn.",
      "Nói rõ cột, giá trị trạng thái và quyền sửa khi nhờ AI dựng.",
    ],
    practicePrompt: {
      question:
        "Một việc vừa xong nhưng bạn thấy cột \"Trạng thái\" vẫn ghi \"Đang làm\" suốt ba ngày, vì người làm quên cập nhật. Cách nào giảm chuyện này tốt nhất?",
      options: [
        "Đặt rule đầu ngày mỗi người tự rà các việc của mình trong bảng",
        "Thêm cột \"Ghi chú cập nhật\" để người làm viết nhiều hơn",
        "Giao một người chuyên nhắc mọi người cập nhật mỗi chiều",
        "Đổi cột trạng thái thành ô nhập chữ tự do để linh hoạt hơn cho mọi người",
      ],
      correct: 0,
      explanation:
        "Thói quen nhỏ, cố định và do chính người giữ việc làm là cách bền nhất. Thêm cột ghi chú tăng việc phải điền. Giao một người chuyên nhắc thì thêm một việc và một điểm nghẽn. Ô chữ tự do làm bạn không lọc được theo trạng thái.",
    },
    summary: {
      keyIdea: "Bảng theo dõi tốt biến câu hỏi \"ai đang giữ đơn này\" thành một cái liếc mắt.",
      formula: "Việc + một người giữ + trạng thái cố định + ngày hẹn = nhóm không giẫm chân nhau.",
      commonMistake: "Thêm quá nhiều cột và trạng thái, rồi không ai chịu cập nhật.",
      action: "Viết ra 4 cột và 4 trạng thái cho một việc nhóm bạn đang theo dõi bằng tin nhắn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại việc nhóm bạn đang theo dõi bằng tin nhắn (đơn hàng, yêu cầu, lịch giao). Viết tên 4 đến 5 cột và 3 đến 5 giá trị trạng thái, rồi nhờ AI dựng bảng mẫu có 3 dòng ví dụ. Mai bạn sẽ được hỏi: các cột và giá trị trạng thái bạn chọn là gì?",
      secondary: "Cho một đồng nghiệp nhìn bảng và hỏi: nhìn vào đây bạn có biết việc nào quá hạn không?",
    },
    sections: [
      {
        type: "lead",
        text: "Buổi họp đứng 8 giờ sáng lại kéo dài 25 phút chỉ để hỏi ai đang giữ đơn nào. Nhóm bạn không thiếu người giỏi, chỉ thiếu một nơi ghi việc ai cũng nhìn thấy. Bài này chọn các cột cho nơi đó.",
      },
      {
        type: "feynman",
        title: "Bảng theo dõi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tấm bảng trắng ở bếp nhà hàng với các phiếu món dán lên: món nào, bàn nào, đầu bếp nào đang làm, còn bao lâu nữa. Nhìn một cái là biết món nào đang trễ.",
        columns: ["Thành phần", "Bảng phiếu món ở bếp", "Bảng theo dõi việc của nhóm"],
        rows: [
          ["Một phiếu", "Món và số bàn", "Một việc hoặc một đơn"],
          ["Ai làm", "Tên đầu bếp ghi trên phiếu", "Cột người phụ trách"],
          ["Đang ở đâu", "Phiếu ở cột chờ, đang nấu hoặc xong", "Cột trạng thái"],
          ["Trễ chưa", "Nhìn giờ trên phiếu", "Cột ngày hẹn so với hôm nay"],
        ],
        oneLiner: "Bảng theo dõi là bảng phiếu món ở bếp: nhìn một cái biết món nào ai làm và trễ chưa.",
      },
      { type: "heading", text: "Ba câu một bảng phải trả lời" },
      {
        type: "list",
        items: [
          "Việc nào đang có: tên việc hoặc mã đơn, một dòng một việc.",
          "Ai đang giữ: đúng một người chịu trách nhiệm cho mỗi việc.",
          "Đang ở đâu và bao giờ xong: trạng thái cố định và ngày hẹn.",
        ],
      },
      {
        type: "flow",
        title: "Hành trình của một việc trong bảng",
        steps: [
          { label: "Mới", detail: "Việc vừa vào bảng, chưa có người nhận. Dòng này nên nổi bật để ai rảnh nhận." },
          { label: "Đang làm", detail: "Người phụ trách điền tên mình và ngày hẹn. Từ đây mọi người biết đơn có chủ." },
          { label: "Chờ khách", detail: "Việc dừng vì đợi bên ngoài. Ghi rõ đang chờ gì để không ai tưởng đơn bị bỏ quên." },
          { label: "Xong", detail: "Người phụ trách đổi trạng thái khi thật sự hoàn thành. Dòng này có thể ẩn đi sau một tuần." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng gọn, có người dùng",
          text: "Bốn hoặc năm cột, trạng thái có 4 giá trị cố định, mỗi việc có đúng một tên. Nhóm cập nhật trong vài giây mỗi lần.",
        },
        right: {
          label: "Bảng nặng, không ai cập nhật",
          text: "Mười hai cột, trạng thái gõ tự do, hai tên trên một việc. Sau hai tuần bảng lệch khỏi thực tế và nhóm quay lại nhắn tin.",
        },
      },
      {
        type: "callout",
        label: "Cách giao việc cho AI",
        text: "Đừng nhờ \"làm cái bảng theo dõi\". Hãy nói: các cột là gì, trạng thái gồm những giá trị nào, ai được sửa cột nào. AI sẽ dựng đúng, và bạn kiểm bằng cách thêm ba dòng thử.",
      },
      {
        type: "scenario",
        title: "Hai người cùng làm một đơn, một đơn không ai làm",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng thứ Hai, hai đồng nghiệp cùng gọi khách về đơn số 204, còn đơn 207 đã trễ hai ngày mà không ai hay. Bạn phải thiết kế bảng theo dõi trong 20 phút. Bạn bắt đầu từ đâu?",
            choices: [
              { label: "Thêm cột Mức ưu tiên, Nguồn đơn, Ghi chú, Người tạo, Tệp đính kèm để bảng thật đầy đủ", next: "bad_many" },
              { label: "Viết 4 cột: Mã đơn, Trạng thái, Người phụ trách, Ngày hẹn, rồi thêm 3 dòng thử", next: "s2" },
            ],
          },
          bad_many: {
            text: "Bảng có 9 cột. Sau một tuần mọi người chỉ điền tên đơn và bỏ trống các cột khác. Đơn 207 vẫn không ai biết đã trễ.",
            ending: "bad",
          },
          s2: {
            text: "Bảng 4 cột chạy được. Nhưng hai đồng nghiệp lại ghi \"Đang làm\" ở cùng đơn 204 vì cột Người phụ trách cho phép hai tên.",
            choices: [
              { label: "Đổi cột để mỗi đơn chỉ nhận một tên, và thêm cột Người hỗ trợ tuỳ chọn", next: "good" },
              { label: "Nhắn nhóm chat: từ nay ai làm đơn nào thì nhớ nói một tiếng", next: "bad_chat" },
            ],
          },
          bad_chat: {
            text: "Nhắn nhóm chat hoạt động hai ngày rồi lại bị trôi giữa hàng chục tin khác. Hai người tiếp tục làm trùng một đơn vào tuần sau.",
            ending: "bad",
          },
          good: {
            text: "Bảng chỉ cho một tên phụ trách. Đơn 207 hiện màu đỏ vì ngày hẹn đã qua, và sáng thứ Ba có người nhận ngay. Buổi họp đứng rút còn 8 phút.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng theo dõi đơn cho nhóm 5 người",
        task: "Nhóm bạn cần bảng theo dõi đơn hàng với trạng thái cố định. Lắp prompt để AI dựng đúng.",
        parts: [
          {
            id: "columns",
            label: "Các cột",
            options: [
              { text: "Làm bảng theo dõi đơn giúp tôi.", feedback: "AI tự chọn cột và thường thêm nhiều cột bạn không cần." },
              { text: "Bốn cột: Mã đơn, Trạng thái, Người phụ trách, Ngày hẹn; và một cột Ghi chú tuỳ chọn.", good: true, feedback: "Cột rõ ràng, khớp ba câu nhóm hay hỏi, AI không phải đoán." },
            ],
          },
          {
            id: "status",
            label: "Trạng thái",
            options: [
              { text: "Trạng thái là ô nhập chữ tự do để mọi người gõ thoải mái.", feedback: "Mỗi người gõ một kiểu (\"xong\", \"done\", \"ok\") và bạn không lọc được." },
              { text: "Trạng thái chọn từ: Mới, Đang làm, Chờ khách, Xong.", good: true, feedback: "Giá trị cố định giúp lọc và đếm đơn theo trạng thái." },
            ],
          },
          {
            id: "rules",
            label: "Quyền sửa",
            options: [
              { text: "Mỗi đơn chỉ có một người phụ trách, và chỉ người đó sửa trạng thái.", good: true, feedback: "Một chủ duy nhất cho mỗi đơn, không còn chuyện hai người cùng làm." },
              { text: "Ai cũng sửa được mọi ô cho nhanh.", feedback: "Trạng thái bị đổi chéo và không ai biết ai đã sửa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["columns", "status", "rules"],
            text: "Bảng gồm: Mã đơn | Trạng thái (Mới, Đang làm, Chờ khách, Xong) | Người phụ trách (một tên) | Ngày hẹn | Ghi chú.\nQuy tắc: mỗi đơn có một người phụ trách; chỉ người đó đổi trạng thái. Ngày hẹn đã qua hiện màu đỏ.\nĐã thêm 3 dòng thử: đơn 204 Đang làm, đơn 207 quá hạn, đơn 210 Xong.",
          },
          {
            requires: ["columns"],
            text: "Bảng gồm Mã đơn, Trạng thái, Người phụ trách, Ngày hẹn, Ghi chú.\n\n(Đủ cột nhưng trạng thái gõ tự do và ai cũng sửa được mọi ô: sau một tuần dữ liệu lộn xộn và không ai nhận trách nhiệm.)",
          },
          {
            text: "Bảng gồm: Tên, Email, Điện thoại, Địa chỉ, Nguồn, Ưu tiên, Ghi chú, Tệp, Người tạo, Ngày tạo...\n\n(AI không biết nhóm bạn cần gì nên dựng bảng 10 cột theo mẫu chung, trong đó không có cột Người phụ trách và Ngày hẹn.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Một việc, một người giữ, một trạng thái cố định, một ngày hẹn.",
          "Bài sau: nối biểu mẫu với bảng để yêu cầu mới tự hiện thành dòng mới.",
        ],
      },
    ],
  },
  {
    id: 2549,
    slug: "du-an-nho-bieu-mau-ket-noi-bang-theo-doi",
    title: "Chặng 57, Bài 10: Dự án nhỏ: biểu mẫu nhập, bảng theo dõi hiện ra ngay",
    subtitle: "Nối hai mảnh đã có thành một dòng chảy: người gửi điền, dòng mới hiện ra ở bảng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔗",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Biểu mẫu và bảng theo dõi riêng lẻ đều có ích, nhưng khi vẫn phải chép tay từ biểu mẫu sang bảng thì việc lặp lại vẫn còn và dễ chép sai. Nối hai mảnh lại nghĩa là mỗi yêu cầu vào bảng đúng một lần, đúng cột, không ai chạm vào. Bài này dạy cách nối và cách kiểm bằng ba yêu cầu thử.",
    openingQuestion:
      "Bạn đã có biểu mẫu nhận yêu cầu và bảng theo dõi, nhưng vẫn phải chép từ cái này sang cái kia. Bước đầu tiên để nối chúng là gì?",
    openingOptions: [
      "Ghi rõ ô nào của biểu mẫu đi vào cột nào của bảng",
      "Nhờ AI nối và tin là nó tự biết ô nào khớp cột nào",
      "Xoá bảng cũ rồi làm lại cả hai từ đầu cho đồng bộ",
      "Gửi biểu mẫu cho cả phòng dùng ngay để kiểm cách nối",
    ],
    correctOption: 0,
    explanation:
      "Khi bạn ghi rõ \"ô Hạn giao đi vào cột Ngày hẹn\", AI và bạn cùng có một bản đồ để làm theo và để kiểm. Nếu để AI tự đoán, tên ô khác tên cột là nó đoán sai. Xoá làm lại tốn công mà không giải quyết việc nối. Phát cho cả phòng khi chưa thử là biến họ thành người thử mà không báo.",
    diagram: [
      { label: "Người gửi điền biểu mẫu và bấm Gửi", arrow: true },
      { label: "Mỗi ô của biểu mẫu được đưa vào đúng cột của bảng", arrow: true },
      { label: "Một dòng mới hiện ở bảng với trạng thái Mới", arrow: true },
      { label: "Người phụ trách nhận việc và cập nhật dòng đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm hỗ trợ khách hàng 4 người",
      description:
        "Nhóm có biểu mẫu nhận yêu cầu và một bảng theo dõi, nhưng trưởng nhóm phải chép tay từng yêu cầu sang bảng mỗi sáng. Sau khi nối, mỗi yêu cầu tự thành một dòng với trạng thái Mới. Trưởng nhóm gửi ba yêu cầu thử, thấy ba dòng hiện ra nhưng ô Hạn giao của một dòng bị lệch cột, sửa ngay trước khi phát cho cả nhóm.",
    },
    quiz: [
      Q(
        "Sau khi nối biểu mẫu với bảng, cách kiểm nào đáng tin nhất?",
        "Gửi ba yêu cầu thử có nội dung khác nhau và đối chiếu từng ô với dòng mới",
        [
          "Gửi một yêu cầu thử, thấy có dòng mới hiện ra là đủ",
          "Đọc lại cách nối AI mô tả và tin là nó đã nối đúng",
          "Hỏi AI \"đã nối xong chưa\" và chờ câu trả lời xác nhận",
        ],
        "Ba yêu cầu khác nhau lộ ra lỗi lệch cột hay mất ô. Một yêu cầu có thể đúng vì tình cờ. Mô tả của AI hay lời xác nhận của nó chưa chứng minh dữ liệu vào đúng chỗ, vì chỉ nhìn dòng thật mới thấy."
      ),
      Q(
        "Ô \"Hạn giao\" của biểu mẫu xuất hiện trong cột \"Người phụ trách\" của bảng. Đây là lỗi gì?",
        "Ánh xạ ô sang cột bị lệch vị trí",
        [
          "Luật kiểm tra ngày bị thiếu ở biểu mẫu, nên ngày đi lạc sang cột khác",
          "Bảng bị đầy nên dữ liệu tràn sang cột bên cạnh một cách tự nhiên",
          "Người gửi điền nhầm ô, nên AI không có cách nào tránh được",
        ],
        "Hạn giao đi sai cột là do cách nối (ánh xạ) sai, không phải do luật ngày, bảng đầy hay người gửi điền nhầm. Sửa bản đồ ô sang cột và thử lại bằng yêu cầu thử."
      ),
      Q(
        "Mỗi yêu cầu mới vào bảng nên có trạng thái ban đầu là gì?",
        "Mới, và người phụ trách để trống",
        [
          "Đang làm, để báo khách rằng việc đã bắt đầu",
          "Xong, để bảng trông gọn và không còn việc tồn",
          "Người gửi tự chọn",
        ],
        "Yêu cầu vừa đến thì chưa có ai nhận, nên Mới và chưa có tên. Đánh Đang làm thì nhóm tưởng đã có người giữ, Xong thì mất việc, còn cho người gửi tự chọn là để họ quyết định việc của nhóm."
      ),
      Q(
        "Nếu hai người cùng gửi một yêu cầu giống nhau trong 1 phút, bảng nên xử lý thế nào?",
        "Tạo hai dòng riêng, sau đó người phụ trách gộp nếu thật sự trùng",
        [
          "Tự động xoá một dòng vì máy biết đó là bản trùng",
          "Chặn người gửi thứ hai và không báo lý do cho họ",
          "Cho cả hai dòng vào nhưng tự đổi thành một dòng duy nhất",
        ],
        "Hai yêu cầu giống nhau có thể của hai khách khác nhau, máy không biết chắc. Giữ cả hai dòng rồi người phụ trách quyết định gộp là an toàn. Tự xoá hay chặn không báo làm mất yêu cầu thật."
      ),
      Q(
        "Khi nhờ AI nối biểu mẫu với bảng, phần nào của yêu cầu quan trọng nhất?",
        "Bản đồ từng ô của biểu mẫu sang từng cột của bảng",
        [
          "Tên đẹp cho công cụ hiện trên đầu trang web, để cả phòng dễ nhớ",
          "Màu sắc và phông chữ của dòng mới trong bảng",
          "Lời chào hiện ra sau khi người gửi bấm gửi",
        ],
        "Nếu bản đồ ô sang cột sai, dữ liệu vào sai cột dù giao diện đẹp đến đâu. Tên công cụ, màu sắc hay lời chào đều có thể sửa sau mà không làm hỏng dữ liệu."
      ),
    ],
    keyTakeaways: [
      "Nối hai mảnh nghĩa là mỗi yêu cầu vào bảng đúng một lần, không chép tay.",
      "Viết bản đồ ô sang cột trước khi nhờ AI nối.",
      "Yêu cầu mới vào bảng với trạng thái Mới và chưa có người phụ trách.",
      "Kiểm bằng ba yêu cầu thử khác nhau, đối chiếu từng ô.",
      "Yêu cầu giống nhau vẫn giữ hai dòng và để người phụ trách quyết định gộp.",
    ],
    practicePrompt: {
      question:
        "Bạn gửi ba yêu cầu thử và thấy cả ba dòng mới đều có Hạn giao đúng, nhưng Số lượng của dòng thứ hai bị trống. Đây nhiều khả năng là gì?",
      options: [
        "Ô Số lượng của yêu cầu thứ hai chưa được nối hoặc người gửi để trống",
        "Bảng bị đầy sau hai dòng nên dòng thứ ba chép lại",
        "AI cố tình bỏ ô này vì nó cho rằng số lượng không quan trọng với đơn hàng",
        "Biểu mẫu luôn mất một ô mỗi khi có ba yêu cầu liên tiếp",
      ],
      correct: 0,
      explanation:
        "Dòng hai trống còn hai dòng kia đúng nghĩa là ánh xạ đang chạy, vấn đề nằm ở yêu cầu thứ hai: hoặc người gửi để trống ô, hoặc ô này không bắt buộc. Kiểm lại luật bắt buộc của ô. Bảng không bị đầy sau hai dòng, AI không tự bỏ ô và không có lỗi mất ô theo chu kỳ.",
    },
    summary: {
      keyIdea: "Nối biểu mẫu với bảng là việc viết ra bản đồ ô sang cột, rồi thử bằng dữ liệu giả.",
      formula: "Bản đồ ô - cột + ba yêu cầu thử + đối chiếu từng ô = nối đúng.",
      commonMistake: "Thấy một dòng hiện ra đã tin là nối xong, không kiểm từng ô.",
      action: "Viết bản đồ ô sang cột cho biểu mẫu và bảng của bạn trước khi nhờ AI nối.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dùng biểu mẫu và bảng theo dõi bạn viết ở hai bài trước. Viết bản đồ ô sang cột, nhờ AI nối, rồi gửi ba yêu cầu thử có nội dung khác nhau (một bình thường, một thiếu ô tuỳ chọn, một có ghi chú dài). Đối chiếu từng ô. Mai bạn sẽ được hỏi: ba dòng mới có đúng không, nếu sai thì sai ở ô nào?",
      secondary: "Xoá ba dòng thử trước khi cho đồng nghiệp dùng thật và ghi lại ngày bạn nối.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi sáng bạn mở biểu mẫu, đọc năm yêu cầu mới và chép từng cái sang bảng. Mất mười phút, và hôm nào vội thì chép lệch cột. Bài này nối hai mảnh lại để việc chép đó biến mất.",
      },
      {
        type: "feynman",
        title: "Nối biểu mẫu với bảng đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung hộp thư góp ý ở cổng công ty và người thư ký. Thư vào hộp, thư ký lấy ra và dán vào đúng cột của sổ theo dõi: tên, ngày, nội dung. Nếu dán sai cột thì sổ hỏng dù hộp thư vẫn tốt.",
        columns: ["Thành phần", "Hộp thư và sổ theo dõi", "Biểu mẫu và bảng theo dõi"],
        rows: [
          ["Đầu vào", "Thư bỏ vào hộp", "Yêu cầu người gửi điền"],
          ["Người chuyển", "Thư ký dán vào sổ", "Công cụ nối tự đưa vào bảng"],
          ["Bản đồ", "Mảnh nào vào cột nào của sổ", "Ô nào của biểu mẫu vào cột nào của bảng"],
          ["Kiểm tra", "Thả thư thử rồi xem sổ", "Gửi ba yêu cầu thử rồi xem ba dòng"],
        ],
        oneLiner: "Nối biểu mẫu với bảng là cho người thư ký một bản đồ: mảnh này dán vào cột kia, rồi thả thư thử.",
      },
      { type: "heading", text: "Bản đồ ô sang cột là phần quan trọng nhất" },
      {
        type: "paragraph",
        text: "Hai mảnh nối được khi bạn chỉ rõ ô nào đi vào cột nào. Tên ô và tên cột thường khác nhau (\"Hạn giao\" và \"Ngày hẹn\"), nên AI không tự đoán được. Một bảng hai cột là đủ: bên trái ô của biểu mẫu, bên phải cột của bảng.",
      },
      {
        type: "flow",
        title: "Điều xảy ra khi người gửi bấm Gửi",
        steps: [
          { label: "Người gửi điền và bấm Gửi", detail: "Luật kiểm tra ở biểu mẫu chạy trước. Chỉ khi mọi ô hợp lệ thì yêu cầu mới đi tiếp." },
          { label: "Công cụ đọc từng ô", detail: "Mỗi ô của biểu mẫu được lấy ra cùng tên và giá trị. Đây là bước cần bản đồ để biết ô nào đi đâu." },
          { label: "Đưa vào đúng cột", detail: "Theo bản đồ, giá trị vào đúng cột của bảng. Cột Trạng thái tự điền Mới, cột Người phụ trách để trống." },
          { label: "Dòng mới hiện ra", detail: "Bảng thêm một dòng ở cuối. Người phụ trách thấy, nhận việc và cập nhật." },
        ],
      },
      {
        type: "list",
        items: [
          "Viết bản đồ hai cột: ô của biểu mẫu, cột của bảng.",
          "Ghi các cột tự điền: trạng thái Mới, người phụ trách trống, ngày nhận là hôm nay.",
          "Nhờ AI nối theo đúng bản đồ, rồi gửi ba yêu cầu thử khác nhau.",
          "Đối chiếu từng ô với dòng mới, rồi xoá ba dòng thử.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nối có bản đồ",
          text: "Bạn đưa AI bản đồ ô sang cột và ba yêu cầu thử. AI nối đúng, bạn đối chiếu từng ô và phát hiện lỗi lệch cột ngay khi thử.",
        },
        right: {
          label: "Nối để AI tự đoán",
          text: "Bạn chỉ nói \"nối giúp tôi\". AI tự ghép ô với cột theo tên gần giống, nên một ô bị lệch mà không ai hay cho tới khi có người tìm không ra hạn giao.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI nối biểu mẫu yêu cầu với bảng theo dõi",
        task: "Biểu mẫu có 5 ô, bảng có 6 cột. Lắp prompt để AI nối đúng và bạn kiểm được.",
        parts: [
          {
            id: "map",
            label: "Bản đồ",
            options: [
              { text: "Nối biểu mẫu với bảng cho tôi.", feedback: "AI tự ghép theo tên gần giống, dễ lệch cột mà không báo." },
              { text: "Mã yêu cầu > Mã đơn; Hạn giao > Ngày hẹn; Số lượng > Số lượng; Mô tả > Ghi chú; Người gửi > Người gửi.", good: true, feedback: "Mỗi ô có đích rõ ràng. AI làm theo và bạn đối chiếu lại bằng chính bản đồ này." },
            ],
          },
          {
            id: "auto",
            label: "Cột tự điền",
            options: [
              { text: "Trạng thái luôn là Mới, Người phụ trách để trống, Ngày nhận là ngày gửi.", good: true, feedback: "Ba cột còn lại được nói rõ nên dòng mới nào cũng đúng khuôn." },
              { text: "Các cột còn lại tuỳ AI điền cho hợp lý.", feedback: "AI có thể tự gán người phụ trách hoặc trạng thái Đang làm, nên việc chưa ai nhận lại có tên." },
            ],
          },
          {
            id: "test",
            label: "Ba yêu cầu thử",
            options: [
              { text: "Sau khi nối thì bảo tôi là xong, tôi sẽ thử khi có người gửi thật.", feedback: "Lỗi lệch cột sẽ xuất hiện với dữ liệu thật và khó sửa." },
              { text: "Tạo ba yêu cầu thử khác nhau (đủ ô, thiếu ô tuỳ chọn, ghi chú dài) và cho tôi xem ba dòng kết quả.", good: true, feedback: "Ba dòng thử lộ ngay mọi ô lệch cột hay mất dữ liệu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["map", "auto", "test"],
            text: "Đã nối theo bản đồ. Ba yêu cầu thử:\n1. YC-001 | Mới | (trống) | 15/12 | 20 | Banner khai trương\n2. YC-002 | Mới | (trống) | 18/12 | 5 | (để trống, vì ô tuỳ chọn)\n3. YC-003 | Mới | (trống) | 20/12 | 100 | Ghi chú dài 300 chữ vẫn nằm trong một ô\nMỗi ô khớp với bản đồ của bạn.",
          },
          {
            requires: ["map"],
            text: "Đã nối 5 ô vào 5 cột theo bản đồ.\n\n(Bản đồ đúng nhưng chưa nói cột tự điền và chưa yêu cầu yêu cầu thử, nên trạng thái và người phụ trách bị AI điền theo ý nó, thường là Đang làm và một tên có sẵn.)",
          },
          {
            text: "Đã nối biểu mẫu với bảng. Mỗi lần gửi sẽ có một dòng mới.\n\n(AI ghép theo tên gần giống: ô Hạn giao bị đưa vào cột Người gửi vì cả hai cùng bắt đầu bằng một từ bạn chưa chỉ rõ. Không có bước thử nên lỗi chỉ lộ ra khi dùng thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Ba yêu cầu thử và một dòng lệch cột",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã nối xong. Bạn gửi ba yêu cầu thử, ba dòng hiện ra. Nhìn lướt thấy ổn, và đồng nghiệp đang giục dùng thật.",
            choices: [
              { label: "Phát cho cả phòng ngay vì ba dòng đều hiện ra", next: "bad_skip" },
              { label: "Đối chiếu từng ô của từng dòng với yêu cầu đã gửi", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Ngày hôm sau có người hỏi vì sao Hạn giao của yêu cầu YC-002 hiện ở cột Người phụ trách. Bạn mất cả buổi sửa dữ liệu của hai mươi dòng thật.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy ở dòng thứ hai, ô Số lượng (5) bị đưa vào cột Ghi chú và ghi chú bị mất. Hai dòng còn lại đúng.",
            choices: [
              { label: "Sửa bản đồ cho đúng, nối lại và gửi thêm ba yêu cầu thử mới", next: "good" },
              { label: "Sửa tay dòng thứ hai rồi bỏ qua vì hai dòng kia đúng", next: "bad_patch" },
            ],
          },
          bad_patch: {
            text: "Dòng thử đã đẹp nhưng lỗi ánh xạ vẫn còn. Mỗi yêu cầu có ghi chú dài lại bị lệch, và cả phòng mất hai ngày mới nhận ra.",
            ending: "bad",
          },
          good: {
            text: "Sau khi sửa bản đồ, sáu dòng thử đều đúng từng ô. Bạn xoá các dòng thử, ghi ngày nối và bản đồ vào mô tả công cụ rồi phát cho cả phòng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nối hai mảnh bằng một bản đồ rõ ràng, rồi thử bằng ba yêu cầu giả.",
          "Bài sau: dữ liệu của công cụ thực sự nằm ở đâu: máy bạn hay máy chủ.",
        ],
      },
    ],
  },
];
