import type { Lesson } from "../lesson-types";

// Chặng 53, bài 6-10. Giáo trình: scripts/curriculum/stage-53.json.
// Bài dạy khái niệm bền (phê duyệt, thời hạn chờ, người thay thế, thông báo); không ghi đường dẫn nút bấm hay gói giấy phép.

const Q = (question: string, right: string, wrong: [string, string, string], explanation: string) => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S53_B_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 6 ─────────────────────────
  {
    id: 2465,
    slug: "luong-phe-duyet-don-xin-nghi-mot-cap",
    title: "Chặng 53, Bài 6: Luồng phê duyệt đơn xin nghỉ một cấp: ai được hỏi, chờ bao lâu",
    subtitle: "Đơn xin nghỉ không nên nằm im dưới chồng thư của người đang đi họp.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đơn xin nghỉ, đề nghị chi, xin truy cập: việc nào cũng cần một người gật đầu. Khi người đó bận, đơn nằm im và người nộp đơn phải đi nhắc. Một luồng phê duyệt tốt không chỉ chuyển đơn đi, mà còn quyết định sẵn người duyệt là ai, chờ tối đa bao lâu và chuyện gì xảy ra khi quá hạn.",
    openingQuestion:
      "Chị Mai nộp đơn xin nghỉ thứ Hai vào chiều thứ Sáu. Tối Chủ nhật đơn vẫn chưa ai mở. Luồng phê duyệt cần có thêm điều gì để chuyện này không lặp lại?",
    openingOptions: [
      "Thời hạn chờ rõ ràng, và việc tự xảy ra khi quá hạn như nhắc người duyệt",
      "Gửi đơn cho năm người cùng lúc để chắc chắn có ít nhất một người đọc trong ngày",
      "Tự động duyệt mọi đơn sau một giờ để không ai phải chờ lâu",
      "Dặn nhân viên nhắn riêng nhờ quản lý xem đơn mỗi lần nộp",
    ],
    correctOption: 0,
    explanation:
      "Đơn nằm im vì luồng chỉ biết gửi đi chứ không biết chờ bao lâu là quá lâu. Khi có thời hạn và việc xảy ra khi hết hạn (nhắc, rồi báo người thay), đơn không phụ thuộc vào việc ai đó nhớ. Gửi cho năm người thì mỗi người nghĩ người kia sẽ lo, và khi có hai kết quả trái nhau thì không ai biết cái nào đúng. Tự duyệt sau một giờ bỏ mất chính việc phê duyệt. Dặn nhắn riêng đẩy công việc của luồng sang người nộp đơn.",
    diagram: [
      { label: "Nhân viên nộp đơn", arrow: true },
      { label: "Luồng gửi tới đúng một người duyệt", arrow: true },
      { label: "Bắt đầu đếm thời hạn chờ", arrow: true },
      { label: "Duyệt hoặc từ chối, hoặc quá hạn thì nhắc", arrow: true },
      { label: "Báo kết quả cho người nộp đơn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng hành chính 30 người nhận đơn xin nghỉ qua email vào hộp thư của trưởng phòng. Có tuần trưởng phòng đi công tác, đơn nằm bốn ngày mà không ai biết. Sau khi chuyển sang luồng có thời hạn chờ hai ngày làm việc và một tin nhắc, đơn không còn nằm im; người nộp đơn cũng thôi phải đi hỏi 'anh xem đơn em chưa'. Đây là tình huống dựng để minh hoạ, không phải số liệu của một công ty thật.",
    },
    quiz: [
      Q(
        "Luồng phê duyệt một cấp gồm những bước nào?",
        "Gửi đơn cho một người duyệt, chờ trả lời, rồi báo kết quả cho người nộp",
        [
          "Gửi đơn cho cả phòng biểu quyết rồi lấy ý kiến của đa số",
          "Lưu đơn vào thư mục chung và chờ người duyệt tình cờ mở ra",
          "Duyệt luôn mọi đơn rồi báo cho quản lý biết sau",
        ],
        "Một cấp nghĩa là đúng một người có quyền quyết định. Biểu quyết cả phòng biến đơn nghỉ thành cuộc họp, để đơn trong thư mục thì không ai được báo, còn duyệt luôn rồi báo sau là bỏ mất bước phê duyệt."
      ),
      Q(
        "Đơn đã chờ quá hạn hai ngày. Việc hợp lý nhất luồng nên làm là gì?",
        "Nhắc người duyệt một lần",
        [
          "Hủy đơn, bắt nộp lại từ đầu",
          "Tự đánh dấu đã duyệt cho xong",
          "Nhảy thẳng lên giám đốc khối",
        ],
        "Quá hạn mới là dấu hiệu cần nhắc, nên nhắc là bước đầu. Hủy đơn làm người nộp mất công mà không giải quyết việc người duyệt bận. Tự đánh dấu đã duyệt và nhảy cấp đều làm sai nguyên tắc ai có quyền thì người đó quyết."
      ),
      Q(
        "Một quản lý xử lý 4 đơn mỗi ngày đang có 12 đơn tồn. Khoảng bao nhiêu ngày để hết đơn tồn (số liệu minh hoạ)?",
        "3 ngày (12 đơn chia 4 đơn mỗi ngày)",
        [
          "48 ngày (12 × 4, nhân thay vì chia)",
          "8 ngày (12 − 4, trừ thay vì chia)",
          "16 ngày (12 + 4, cộng thay vì chia, ra số lớn hơn)",
        ],
        "Thời gian chờ bằng số đơn tồn chia cho số đơn xử lý mỗi ngày: 12 chia 4 là 3 ngày. Nhân, trừ hay cộng hai số này đều không ra một đơn vị thời gian có nghĩa."
      ),
      Q(
        "Vì sao người nộp đơn nên nhận một tin báo ngay sau khi nộp?",
        "Để biết đơn đã tới đúng người duyệt và biết mốc thời hạn chờ",
        [
          "Để người duyệt biết người nộp đang theo dõi và duyệt nhanh hơn",
          "Để luồng có thêm một bước trông đầy đủ, chuyên nghiệp hơn",
          "Vì hệ thống bắt buộc có tin báo mới đếm được thời hạn chờ",
        ],
        "Tin xác nhận cho người nộp biết đơn không bị thất lạc và khi nào nên hỏi lại. Báo để gây áp lực lên người duyệt hay cho đủ bước đều không phải lý do, và thời hạn chờ chạy được mà không cần tin báo."
      ),
      Q(
        "Khi quyết định 'chờ tối đa bao lâu', điều nào nên dựa vào nhất?",
        "Nhịp làm việc thật của người duyệt, tính bằng ngày làm việc và loại đơn gấp hay không",
        [
          "Con số tròn dễ nhớ như 24 giờ dù cuối tuần và ngày lễ vẫn tính vào",
          "Thời hạn ngắn nhất có thể để người duyệt luôn phải trả lời ngay",
          "Thời hạn mà người nộp đơn mong muốn, vì họ là người chờ",
        ],
        "Thời hạn hợp lý phải khớp với người duyệt thật: họ có ngày vắng, đơn gấp cần nhanh hơn đơn thường, và cuối tuần không phải ngày làm việc. Hạn tròn không tính ngày nghỉ sẽ nhắc oan vào Chủ nhật, hạn ngắn nhất làm người duyệt tắt tiếng thông báo, còn theo mong muốn người nộp thì không ai khống chế được."
      ),
    ],
    keyTakeaways: [
      "Phê duyệt một cấp là đúng một người quyết định, không phải nhiều người cùng đoán.",
      "Mỗi luồng cần ba thứ: người duyệt, thời hạn chờ, việc xảy ra khi quá hạn.",
      "Thời gian chờ ước chừng bằng số đơn tồn chia cho số đơn xử lý mỗi ngày.",
      "Người nộp đơn phải nhận tin xác nhận và tin kết quả mà không cần đi hỏi.",
    ],
    practicePrompt: {
      question:
        "Luồng xin nghỉ của phòng bạn vừa chạy, đơn đầu tiên đã chờ 3 ngày. Bạn sửa gì trước?",
      options: [
        "Đặt thời hạn chờ và tin nhắc khi quá hạn",
        "Thay người duyệt bằng người khác mỗi khi đơn chờ lâu",
        "Bỏ phê duyệt, cho nhân viên tự ghi ngày nghỉ vào bảng chung",
        "Gửi thêm email cho toàn phòng để mọi người biết có đơn",
      ],
      correct: 0,
      explanation:
        "Đơn chờ lâu vì luồng thiếu thời hạn và hành động khi quá hạn; đó là phần sửa rẻ nhất và đúng gốc. Đổi người duyệt liên tục làm không ai biết mình chịu trách nhiệm, bỏ phê duyệt làm mất kiểm soát lịch nghỉ, gửi cho cả phòng thì tạo thêm thông báo mà người duyệt vẫn chưa được nhắc.",
    },
    summary: {
      keyIdea: "Phê duyệt tốt là có người duyệt rõ, thời hạn chờ rõ và việc tự xảy ra khi quá hạn.",
      formula: "Ngày chờ ≈ số đơn tồn ÷ số đơn xử lý mỗi ngày.",
      commonMistake: "Chỉ thiết kế đường đi của đơn mà không nghĩ tới lúc người duyệt không trả lời.",
      action: "Viết ra một câu: 'Đơn này gửi cho ..., chờ tối đa ... ngày, quá hạn thì ...'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại đơn thật ở chỗ bạn (xin nghỉ, đề nghị mua, xin truy cập). Ghi lại trên một tờ giấy: ai nộp, ai duyệt, chờ tối đa mấy ngày làm việc, quá hạn thì nhắc ai. Sau đó nhìn lại 3 đơn gần nhất của chính bạn và ghi mỗi đơn đã chờ bao nhiêu ngày.",
      secondary: "Mang tờ giấy đó cho người duyệt xem; hỏi họ hạn chờ nào là thực tế với họ.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu 4 giờ chiều, bạn nộp đơn xin nghỉ thứ Hai. Quản lý đang họp cả ngày, hộp thư đầy. Sáng thứ Hai bạn vẫn chưa biết mình được nghỉ hay không. Bài này dựng một luồng phê duyệt nhỏ nhất, để chuyện đó không phụ thuộc vào trí nhớ của ai.",
      },
      {
        type: "feynman",
        title: "Luồng phê duyệt đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nhớ tờ phiếu xin nghỉ bằng giấy: bạn đặt lên bàn quản lý, nếu không dán thêm tờ nhắc 'cần trả lời trước thứ Năm' thì phiếu trôi xuống dưới chồng giấy. Luồng phê duyệt tự động là chính tờ phiếu đó, cộng thêm người biết tự dán tờ nhắc.",
        columns: ["Thành phần", "Phiếu giấy trên bàn quản lý", "Luồng phê duyệt tự động"],
        rows: [
          ["Người duyệt", "Quản lý trực tiếp, ghi tên trên phiếu", "Một người được chọn sẵn, luồng gửi thẳng tới họ"],
          ["Thời hạn", "Tờ nhắc dán bằng tay, hay bị quên", "Bộ đếm thời gian chạy ngay sau khi gửi"],
          ["Quá hạn", "Bạn phải đi hỏi trực tiếp", "Luồng nhắc người duyệt và báo cho bạn"],
          ["Kết quả", "Chữ ký hoặc lời nói, dễ thất lạc", "Tin báo kết quả gửi cho cả hai bên"],
        ],
        oneLiner: "Luồng phê duyệt là tờ phiếu giấy có sẵn tờ nhắc và không bao giờ thất lạc.",
      },
      { type: "heading", text: "Bốn câu hỏi trước khi dựng luồng" },
      {
        type: "paragraph",
        text: "Trước khi chạm vào công cụ nào, hãy trả lời bốn câu bằng tiếng Việt thường: Ai nộp? Ai duyệt? Chờ tối đa bao lâu? Quá hạn thì chuyện gì xảy ra? Công cụ tự động hoá (như Power Automate) chỉ làm thay phần nối các câu trả lời đó lại với nhau; nó không tự biết bạn muốn chờ hai ngày hay hai tuần.",
      },
      {
        type: "list",
        items: [
          "Nộp đơn: người nộp điền ngày nghỉ và lý do; luồng ghi lại ngày giờ nộp.",
          "Gửi người duyệt: đúng một người, kèm đủ thông tin để quyết định mà không phải hỏi lại.",
          "Chờ: đặt mốc thời hạn theo ngày làm việc; đơn gấp có thể có mốc ngắn hơn.",
          "Quá hạn: nhắc người duyệt một lần, rồi báo người nộp đơn và người thay thế (bài sau).",
          "Kết quả: báo duyệt hoặc từ chối cho người nộp; từ chối luôn kèm lý do ngắn.",
        ],
      },
      {
        type: "chart",
        title: "Đơn tồn càng nhiều, người nộp càng chờ lâu",
        caption:
          "Số liệu minh hoạ, không phải đo thật. Kéo thanh trượt để chọn số đơn người duyệt xử lý mỗi ngày. Đường thứ hai giả định có thêm một người xử lý song song với tốc độ tương đương.",
        kind: "line",
        xLabel: "Số đơn đang tồn",
        yLabel: "Số ngày chờ",
        x: { from: 0, to: 20, step: 1 },
        params: [{ id: "perDay", label: "Đơn xử lý mỗi ngày", min: 1, max: 10, step: 1, value: 3, unit: "đơn" }],
        series: [
          { label: "Một người duyệt", expr: "x / perDay" },
          { label: "Có thêm người xử lý song song", expr: "x / (perDay * 2)" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Luồng thiếu thời hạn",
          text: "Đơn gửi đi là xong việc của luồng. Người duyệt bận thì đơn nằm im, người nộp phải nhắn hỏi, và không ai thấy được đơn nào đang chờ lâu nhất.",
        },
        right: {
          label: "Luồng có thời hạn chờ",
          text: "Mỗi đơn có mốc. Quá mốc thì người duyệt được nhắc, người nộp được báo, và bạn nhìn vào danh sách là thấy đơn nào quá hạn.",
        },
      },
      {
        type: "callout",
        label: "Đừng tự duyệt khi quá hạn",
        text: "Nhiều người muốn 'quá hạn thì tự duyệt cho nhanh'. Với đơn xin nghỉ hay đề nghị chi tiền, việc đó bỏ mất chính lý do có phê duyệt. Quá hạn nên dẫn tới nhắc và chuyển cho người thay thế, không dẫn tới tự gật đầu.",
      },
      {
        type: "scenario",
        title: "Đơn xin nghỉ của anh Hùng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn được giao dựng luồng duyệt đơn xin nghỉ một cấp cho phòng 12 người. Quản lý thường trả lời trong 1 đến 2 ngày làm việc. Bạn chọn thời hạn chờ nào?",
            choices: [
              { label: "Hai ngày làm việc, không tính thứ Bảy và Chủ nhật", next: "s2" },
              { label: "Sáu giờ, để đơn luôn được trả lời nhanh", next: "bad_short" },
            ],
          },
          bad_short: {
            text: "Tin nhắc bắn ra liên tục, kể cả tối thứ Sáu và sáng Chủ nhật. Sau hai tuần quản lý tắt tiếng thông báo của luồng, và đơn xin nghỉ gấp của anh Hùng lại nằm im.",
            ending: "bad",
          },
          s2: {
            text: "Luồng chạy ổn. Đến ngày thứ hai đơn của anh Hùng vẫn chưa được trả lời. Luồng nên làm gì?",
            choices: [
              { label: "Nhắc quản lý một lần và báo anh Hùng là đơn đang chờ", next: "good" },
              { label: "Tự đánh dấu đã duyệt vì quá hạn", next: "bad_auto" },
            ],
          },
          bad_auto: {
            text: "Đơn được duyệt tự động, nhưng đúng tuần đó cả phòng chỉ còn hai người vì quản lý đã hẹn nhiều người nghỉ. Quản lý phải đi gỡ từng đơn và mất niềm tin vào luồng.",
            ending: "bad",
          },
          good: {
            text: "Quản lý nhận tin nhắc, duyệt đơn trong buổi sáng. Anh Hùng nhận tin kết quả và không phải đi hỏi ai. Bạn thấy trên danh sách đơn không còn cái nào nằm quá hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Người duyệt, thời hạn chờ, việc khi quá hạn: ba thứ mỗi luồng phê duyệt cần có.",
          "Bài sau: người duyệt đi vắng hai tuần thì đơn đi đâu.",
        ],
      },
    ],
  },
  // ───────────────────────── Bài 7 ─────────────────────────
  {
    id: 2466,
    slug: "phe-duyet-nhieu-cap-va-truong-hop-nguoi-duyet-di-vang",
    title: "Chặng 53, Bài 7: Phê duyệt nhiều cấp và trường hợp người duyệt đi vắng",
    subtitle: "Quản lý nghỉ phép hai tuần, đơn của cả phòng không nên nghỉ cùng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đơn càng quan trọng thì càng cần nhiều người duyệt, và nhiều người duyệt nghĩa là nhiều điểm có thể tắc. Phần hay bị quên nhất là người duyệt đi vắng: không có người thay thế thì mọi đơn dồn lại đúng lúc họ nghỉ phép. Thiết kế người thay thế từ đầu rẻ hơn nhiều so với gỡ rối khi đơn đã chất đống.",
    openingQuestion:
      "Quản lý nghỉ phép hai tuần, đúng lúc cả phòng nộp đơn. Cách thiết kế nào giúp đơn không nằm mãi?",
    openingOptions: [
      "Đăng ký sẵn người thay thế, và luồng chuyển đơn sang người đó khi quản lý vắng",
      "Cho đơn tự động được duyệt sau ba ngày nếu không ai trả lời để khỏi chờ",
      "Đợi quản lý đi làm lại rồi mới cho nộp đơn",
      "Gửi đơn cho cả cấp trên của quản lý cùng lúc",
    ],
    correctOption: 0,
    explanation:
      "Người thay thế là một người thật được chỉ định trước, có quyền duyệt trong khoảng thời gian đó, nên trách nhiệm vẫn rõ. Tự duyệt sau ba ngày bỏ mất kiểm soát. Bắt cả phòng đợi quản lý về làm công việc đứng im hai tuần. Gửi lên cấp trên cùng lúc thì hai người cùng quyết một đơn và dễ cho hai kết quả khác nhau.",
    diagram: [
      { label: "Nhân viên nộp đơn", arrow: true },
      { label: "Luồng hỏi: người duyệt có đang vắng không", arrow: true },
      { label: "Vắng thì chuyển cho người thay thế đã đăng ký", arrow: true },
      { label: "Đơn lớn thì lên cấp hai duyệt tiếp", arrow: true },
      { label: "Báo kết quả cho người nộp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng mua sắm có hai cấp duyệt: trưởng nhóm cho đơn dưới một mức nhất định, giám đốc khối cho đơn lớn hơn. Khi giám đốc khối đi công tác mười ngày, ba đơn lớn nằm chờ mà không ai biết nên hỏi ai. Bản luồng mới có thêm cột 'người thay thế' cho mỗi cấp, nên sau đó đơn chuyển sang người thay thế ngay khi cấp đó vắng. Đây là tình huống dựng để minh hoạ.",
    },
    quiz: [
      Q(
        "Phê duyệt hai cấp khác một cấp ở điểm nào?",
        "Đơn phải qua người duyệt thứ nhất rồi mới tới người duyệt thứ hai",
        [
          "Hai người duyệt cùng lúc và đơn đi tiếp khi một người đồng ý",
          "Đơn được gửi hai lần cho cùng một người để chắc chắn",
          "Người nộp đơn tự chọn cấp nào duyệt trước cho tiện",
        ],
        "Nhiều cấp là chuỗi: cấp sau chỉ thấy đơn khi cấp trước đã đồng ý. Duyệt song song hay lấy một người đồng ý là thiết kế khác, còn gửi hai lần cho một người thì chỉ gây trùng lặp, không thêm cấp nào."
      ),
      Q(
        "Người thay thế nên được chọn thế nào?",
        "Đăng ký trước trong danh sách và có đúng quyền duyệt của cấp đó",
        [
          "Người thay thế là bất kỳ ai đang online vào đúng lúc đơn về tới hộp thư",
          "Người nộp đơn tự nhờ một đồng nghiệp duyệt giúp mình",
          "Người đầu tiên mở đơn ra xem sẽ thành người duyệt",
        ],
        "Người thay thế phải có tên sẵn, đúng quyền hạn và biết mình được giao việc. Người đang online, đồng nghiệp tự nhờ hay người mở đơn đầu tiên đều không có thẩm quyền rõ ràng, và đơn nghỉ có thể được duyệt bởi người không có quyền."
      ),
      Q(
        "Quản lý vắng 10 ngày làm việc, mỗi ngày phòng nộp 2 đơn (số liệu minh hoạ). Không có người thay thì tối đa bao nhiêu đơn chờ khi họ quay lại?",
        "20 đơn (10 ngày × 2 đơn mỗi ngày)",
        [
          "12 đơn (10 ngày cộng 2 đơn mỗi ngày)",
          "5 đơn (10 ngày chia 2 đơn mỗi ngày)",
          "2 đơn (chỉ tính đơn của ngày cuối cùng)",
        ],
        "Đơn dồn lại theo từng ngày vắng, nên tổng là số ngày nhân số đơn mỗi ngày: 10 nhân 2 là 20 đơn. Cộng, chia hay chỉ tính ngày cuối đều bỏ sót phần lớn đơn đã dồn."
      ),
      Q(
        "Khi người thay thế cũng vắng, luồng nên làm gì?",
        "Đẩy lên người duyệt cấp trên hoặc báo người quản trị luồng để xử lý",
        [
          "Giữ đơn nguyên trong hàng đợi và chờ cho tới khi có người về",
          "Tự đánh dấu đã duyệt vì đã thử hai người mà không được",
          "Xoá đơn để người nộp đơn nộp lại khi có người",
        ],
        "Luôn cần một đường lui cuối cùng: cấp trên hoặc người quản trị luồng. Giữ nguyên đơn tái tạo đúng vấn đề ban đầu, tự duyệt bỏ kiểm soát, còn xoá đơn làm mất dữ liệu và công sức người nộp."
      ),
      Q(
        "Điều nào cần cập nhật mỗi khi phòng thay người hoặc đổi quy định duyệt?",
        "Danh sách người duyệt và người thay thế",
        [
          "Tên của luồng để khớp với chức vụ mới của họ",
          "Giao diện biểu mẫu nộp đơn để trông mới hơn",
          "Màu của tin nhắc để dễ phân biệt từng loại đơn",
        ],
        "Luồng chạy đúng người chỉ khi danh sách người duyệt còn đúng: người đã nghỉ việc vẫn nhận đơn là lỗi hay gặp nhất. Đổi tên, giao diện hay màu sắc không ảnh hưởng ai nhận đơn."
      ),
    ],
    keyTakeaways: [
      "Nhiều cấp là chuỗi: cấp sau chỉ thấy đơn khi cấp trước đã duyệt.",
      "Mỗi cấp có một người thay thế đăng ký sẵn, với đúng quyền của cấp đó.",
      "Đơn dồn lại bằng số ngày vắng nhân số đơn mỗi ngày.",
      "Luôn có đường lui cuối cùng khi cả người duyệt lẫn người thay đều vắng.",
    ],
    practicePrompt: {
      question:
        "Trưởng phòng báo nghỉ phép hai tuần từ thứ Hai. Việc đầu tiên bạn làm với luồng duyệt đơn là gì?",
      options: [
        "Đăng ký người thay thế cho khoảng thời gian đó",
        "Tạm dừng luồng cho tới khi trưởng phòng quay lại",
        "Tự duyệt thay trưởng phòng vì bạn là người dựng luồng",
        "Chuyển hết đơn sang hộp thư chung của cả phòng để ai cũng xem được",
      ],
      correct: 0,
      explanation:
        "Đăng ký người thay thế giữ luồng chạy mà trách nhiệm vẫn rõ. Dừng luồng làm cả phòng không nộp được đơn, người dựng luồng không phải người có quyền duyệt, còn hộp thư chung thì không ai chịu trách nhiệm xử lý.",
    },
    summary: {
      keyIdea: "Mỗi cấp duyệt cần một người thay thế đăng ký sẵn và một đường lui cuối.",
      formula: "Đơn dồn = số ngày vắng × số đơn mỗi ngày.",
      commonMistake: "Nghĩ tới người duyệt lúc họ có mặt mà quên lúc họ nghỉ phép.",
      action: "Viết ra người thay thế cho từng cấp duyệt ở phòng bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một loại đơn có từ hai cấp duyệt trở lên ở chỗ bạn. Kẻ một bảng ba cột: cấp, người duyệt, người thay thế. Điền đủ mọi ô, rồi hỏi từng người thay thế có đồng ý và có quyền làm việc đó không.",
      secondary: "Ghi ngày bạn kiểm tra bảng, và đặt nhắc 3 tháng sau để xem lại ai đã đổi vị trí.",
    },
    sections: [
      {
        type: "lead",
        text: "Quản lý thông báo nghỉ phép hai tuần từ thứ Hai. Đơn xin nghỉ, đề nghị mua, xin truy cập của cả phòng vẫn đổ về mỗi ngày. Bài này dựng thêm cấp duyệt thứ hai và người thay thế, để đơn đi tiếp khi một người vắng mặt.",
      },
      {
        type: "feynman",
        title: "Phê duyệt nhiều cấp đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cổng kiểm soát ở tòa nhà văn phòng: khách qua bảo vệ tầng trệt, rồi tới lễ tân tầng 5. Nếu bảo vệ tầng trệt nghỉ, tòa nhà cử người trực thay, chứ không mở cổng cho ai vào tự do. Luồng nhiều cấp giống vậy: mỗi cổng có một người trực, và một người thay sẵn.",
        columns: ["Thành phần", "Cổng kiểm soát tòa nhà", "Luồng phê duyệt nhiều cấp"],
        rows: [
          ["Cổng", "Bảo vệ tầng trệt, lễ tân tầng 5", "Cấp duyệt thứ nhất, cấp duyệt thứ hai"],
          ["Người vắng", "Người trực thay do tòa nhà cử sẵn", "Người thay thế đăng ký trước"],
          ["Thứ tự", "Qua cổng 1 rồi mới tới cổng 2", "Cấp sau chỉ thấy đơn khi cấp trước đã duyệt"],
          ["Khi tắc", "Quản lý tòa nhà xử lý", "Báo người quản trị luồng"],
        ],
        oneLiner: "Nhiều cấp là nhiều cổng nối tiếp, và mỗi cổng luôn có người trực.",
      },
      { type: "heading", text: "Khi nào cần nhiều cấp, khi nào không" },
      {
        type: "paragraph",
        text: "Thêm cấp duyệt làm đơn an toàn hơn nhưng chậm hơn. Quy tắc dễ dùng: đơn nhỏ, dễ hoàn lại (như xin nghỉ nửa ngày) một cấp là đủ; đơn lớn hay khó quay lại (như chi một khoản tiền lớn) mới cần thêm cấp. Mức 'lớn' là con số do bộ phận tài chính hoặc quản lý của bạn đặt, không phải bạn tự đoán.",
      },
      {
        type: "flow",
        title: "Một đơn đi qua hai cấp có người thay thế",
        steps: [
          { label: "Nộp đơn", detail: "Nhân viên điền biểu mẫu. Luồng ghi ngày giờ và kiểm tra đơn có đủ thông tin chưa." },
          { label: "Tìm người duyệt cấp một", detail: "Luồng xem người duyệt cấp một có đang vắng không. Nếu có, nó chọn người thay thế đã đăng ký." },
          { label: "Chờ cấp một", detail: "Đếm thời hạn chờ. Quá hạn thì nhắc một lần, rồi chuyển đường lui." },
          { label: "Kiểm điều kiện cấp hai", detail: "Đơn nhỏ thì kết thúc ở cấp một. Đơn vượt mức do quản lý đặt thì đi tiếp lên cấp hai." },
          { label: "Báo kết quả", detail: "Người nộp nhận kết quả cuối cùng, kèm tên người đã duyệt hoặc từ chối và lý do nếu từ chối." },
        ],
      },
      {
        type: "list",
        items: [
          "Mỗi cấp có hai cột: người duyệt chính và người thay thế.",
          "Người thay thế có đúng quyền hạn của cấp đó, không hơn.",
          "Có một đường lui cuối cùng: cấp trên hoặc người quản trị luồng.",
          "Khi phòng đổi người, bảng người duyệt được cập nhật trước khi người cũ rời đi.",
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI soạn mô tả luồng thì phải đối chiếu",
        text: "AI giúp viết nháp mô tả luồng rất nhanh, nhưng nó không biết quy định thật của phòng bạn và sẽ điền số ngày, mức tiền hoặc tên cấp cho nghe hợp lý. Mô tả nó viết là bản nháp để bạn đối chiếu với quy định, không phải quy định.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản mô tả luồng do AI viết",
        task:
          "Quy định thật của phòng: đơn xin nghỉ dưới 3 ngày do quản lý trực tiếp duyệt. Từ 3 ngày trở lên thì quản lý duyệt xong, giám đốc khối duyệt tiếp. Quản lý vắng thì người thay thế đã đăng ký sẽ duyệt. Chưa có quy định nào về việc tự động duyệt. AI đã viết bản mô tả bên dưới; hãy đánh dấu những đoạn AI tự thêm.",
        segments: [
          { text: "Nhân viên nộp đơn qua biểu mẫu, luồng ghi lại ngày giờ nộp." },
          {
            text: "Đơn xin nghỉ trên 5 ngày mới cần thêm giám đốc khối duyệt.",
            error: "Quy định thật là từ 3 ngày trở lên; AI tự đổi mức thành 5 ngày nên đơn 3 đến 5 ngày sẽ bỏ qua cấp hai.",
          },
          { text: "Nếu quản lý đang vắng, đơn chuyển cho người thay thế đã đăng ký." },
          {
            text: "Nếu quản lý không trả lời sau 48 giờ, đơn tự động được duyệt.",
            error: "Quy định không có bước tự động duyệt. AI bịa thêm để luồng 'trông hoàn chỉnh', và nó làm mất kiểm soát.",
          },
          {
            text: "Sau cùng, phòng nhân sự xác nhận lại mọi đơn trước khi báo người nộp.",
            error: "Mô tả quy định không nhắc phòng nhân sự; đây là một cấp AI tự thêm, làm luồng dài hơn thực tế.",
          },
          { text: "Người nộp đơn nhận tin báo kết quả." },
        ],
      },
      {
        type: "scenario",
        title: "Quản lý đi phép hai tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu, quản lý báo nghỉ phép hai tuần từ thứ Hai. Bạn là người giữ luồng duyệt đơn của phòng. Bạn làm gì trước?",
            choices: [
              { label: "Hỏi quản lý chọn ai thay, hỏi người đó có đồng ý không, rồi đăng ký vào danh sách", next: "s2" },
              { label: "Để nguyên, nghĩ rằng ai cần gấp sẽ tự nhắn quản lý", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Thứ Tư tuần sau, 9 đơn đã chất trong hàng đợi. Hai người phải hủy kế hoạch nghỉ vì chưa biết mình có được duyệt không. Bạn mất cả buổi sáng đi gỡ.",
            ending: "bad",
          },
          s2: {
            text: "Người thay thế đã đăng ký. Giữa tuần, một đơn nghỉ 4 ngày về. Luồng nên làm gì?",
            choices: [
              { label: "Người thay thế duyệt, rồi đơn đi tiếp lên giám đốc khối vì từ 3 ngày", next: "good" },
              { label: "Người thay thế duyệt và đơn kết thúc, vì quản lý đang vắng", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Đơn 4 ngày không qua cấp hai. Khi giám đốc khối thấy lịch nghỉ trùng với một đợt giao hàng lớn, đơn đã được duyệt xong và phải huỷ gấp.",
            ending: "bad",
          },
          good: {
            text: "Đơn đi đủ hai cấp, người nộp nhận kết quả đúng hạn. Khi quản lý quay lại, trong hàng đợi không còn đơn nào quá hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi cấp một người thay thế, và một đường lui cuối cùng.",
          "Bài sau: viết thông báo để người nhận biết ngay việc cần làm.",
        ],
      },
    ],
  },
  // ───────────────────────── Bài 8 ─────────────────────────
  {
    id: 2467,
    slug: "noi-dung-thong-bao-tu-dong-de-nguoi-nhan-hanh-dong-duoc",
    title: "Chặng 53, Bài 8: Nội dung thông báo tự động để người nhận biết ngay việc cần làm",
    subtitle: "'Có yêu cầu mới' là tin báo, không phải tin để hành động.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔔",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một thông báo tự động được đọc trong ba giây giữa hai cuộc họp. Nếu ba giây đó không cho người đọc biết ai cần gì, hạn nào, bấm vào đâu, họ sẽ để lại 'đọc sau' và sau đó quên. Viết lại nội dung thông báo là cách rẻ nhất để tăng tốc cả một luồng duyệt.",
    openingQuestion:
      "Luồng của bạn gửi thông báo 'Có yêu cầu mới cần duyệt'. Người duyệt mở ra, rồi lại phải hỏi 'yêu cầu của ai, việc gì'. Sửa thế nào cho đúng?",
    openingOptions: [
      "Ghi ai gửi, việc gì, hạn nào và có liên kết mở thẳng tới yêu cầu",
      "Thêm chữ KHẨN viết hoa vào đầu mọi thông báo để người duyệt mở ngay",
      "Gửi thông báo mỗi giờ một lần cho tới khi người duyệt mở ra",
      "Viết thông báo dài hơn, kể lại toàn bộ nội dung đơn",
    ],
    correctOption: 0,
    explanation:
      "Thông báo dùng được khi trả lời sẵn bốn câu: ai, việc gì, hạn nào, bấm đâu. Chữ KHẨN gắn cho mọi thông báo thì chẳng còn khẩn; nhắc mỗi giờ làm người nhận tắt tiếng; kể lại toàn bộ đơn biến thông báo thành email dài mà người ta sẽ không đọc hết. Gọn và đủ bốn thông tin là đúng.",
    diagram: [
      { label: "Sự kiện xảy ra: có đơn mới", arrow: true },
      { label: "Luồng lấy ai, việc gì, hạn nào từ đơn", arrow: true },
      { label: "Ghép vào một mẫu thông báo ngắn", arrow: true },
      { label: "Kèm liên kết mở thẳng đơn", arrow: true },
      { label: "Người nhận biết việc cần làm ngay" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm vận hành nhận thông báo 'Có yêu cầu mới' mỗi khi có đề nghị chi. Người duyệt phải mở từng cái để biết đề nghị của ai, bao nhiêu tiền. Sau khi sửa thành 'Chị Lan đề nghị chi 2 triệu tiền văn phòng phẩm, cần duyệt trước 17h thứ Năm: [liên kết]', người duyệt trả lời nhanh hơn vì không phải mở thêm để hiểu. Đây là tình huống dựng để minh hoạ, không có số liệu thật.",
    },
    quiz: [
      Q(
        "Một thông báo tự động dùng được cần trả lời sẵn những câu hỏi nào?",
        "Ai gửi, việc cần làm, hạn chót và cách bấm vào đâu để làm",
        [
          "Hệ thống nào gửi, phiên bản của luồng và giờ máy chủ",
          "Tên nhân viên tạo luồng và ngày luồng được dựng",
          "Bao nhiêu người khác cũng nhận được cùng thông báo",
        ],
        "Người nhận chỉ cần biết việc của mình: ai cần gì, hạn nào, làm ở đâu. Phiên bản luồng và tên người dựng chỉ có ích cho người bảo trì, còn số người nhận không giúp họ hành động."
      ),
      Q(
        "Tiêu đề thông báo nào tốt nhất?",
        "Duyệt đơn nghỉ của Lan, hạn 17h thứ Năm",
        [
          "Thông báo từ hệ thống phê duyệt tự động số 2",
          "Có yêu cầu mới, vui lòng xem chi tiết trong liên kết bên dưới nhé",
          "Quan trọng: hành động ngay bây giờ nếu anh chị rảnh",
        ],
        "Tiêu đề tốt đã có hành động, đối tượng và hạn. Tiêu đề chung chung hay tên hệ thống buộc người nhận phải mở ra mới biết, còn 'quan trọng, nếu rảnh' tự mâu thuẫn và không cho biết việc gì."
      ),
      Q(
        "Vì sao thông báo nên có liên kết mở thẳng tới yêu cầu?",
        "Để người nhận hành động ngay mà không phải đi tìm đơn trong hộp thư hay danh sách",
        [
          "Để thông báo trông giống các email marketing mà người ta quen",
          "Để hệ thống đếm được số người bấm vào thông báo",
          "Vì thông báo không có liên kết sẽ bị chặn tự động",
        ],
        "Mỗi bước phải tìm là một lý do để người nhận bỏ dở. Liên kết thẳng rút ngắn đường từ đọc tới làm. Giống email marketing không phải mục tiêu, và không có quy tắc nào chặn thông báo thiếu liên kết."
      ),
      Q(
        "Bạn nhờ AI viết ba bản thông báo. Bước tiếp theo hợp lý nhất là gì?",
        "Đọc đối chiếu từng bản với đơn thật, rồi gửi thử cho chính bạn",
        [
          "Chọn bản hay nhất rồi dùng luôn cho cả phòng",
          "Hỏi lại AI bản nào tốt nhất rồi làm đúng theo lời nó, vì nó đã viết",
          "Ghép ba bản thành một bản dài để không bỏ sót ý nào",
        ],
        "AI có thể tự thêm hạn, tên hay số không có trong đơn, nên phải đối chiếu với đơn thật và thử gửi cho chính mình trước. Chọn theo cảm giác hay hỏi lại AI không kiểm tra được sự thật; ghép thành bản dài thì phá mất sự gọn."
      ),
      Q(
        "Dữ liệu nào KHÔNG nên đưa vào nội dung thông báo gửi qua kênh chung?",
        "Số tài khoản ngân hàng hoặc lương cá nhân của người nộp đơn",
        [
          "Tên người nộp và loại đơn mà họ vừa nộp",
          "Hạn chót duyệt và liên kết mở thẳng tới đơn đang chờ người duyệt",
          "Một câu ngắn nói đơn này cần gì từ người duyệt",
        ],
        "Kênh chung có nhiều người xem nên không đưa dữ liệu nhạy cảm lên; người duyệt sẽ xem chi tiết trong đơn sau khi bấm liên kết. Tên, hạn chót và một câu tóm tắt đều là thông tin cần để hành động và có thể để trong thông báo."
      ),
    ],
    keyTakeaways: [
      "Thông báo dùng được trả lời sẵn: ai, việc gì, hạn nào, bấm đâu.",
      "Tiêu đề chứa hành động và hạn; không cần mở ra mới biết việc gì.",
      "AI viết nháp nhanh, nhưng phải đối chiếu với đơn thật trước khi dùng.",
      "Dữ liệu nhạy cảm để trong đơn, không đưa vào thông báo gửi kênh chung.",
    ],
    practicePrompt: {
      question:
        "Bạn cần viết lại thông báo 'Có yêu cầu mới' cho luồng duyệt đề nghị mua sắm. Phần nào nên làm đầu tiên?",
      options: [
        "Liệt kê ai, việc gì, hạn nào và liên kết rồi ghép vào mẫu",
        "Nhờ AI viết một thông báo thật hay và dài rồi dùng luôn không cần sửa",
        "Thêm biểu tượng và màu sắc để thông báo nổi bật",
        "Viết thêm đoạn giới thiệu về quy trình mua sắm",
      ],
      correct: 0,
      explanation:
        "Xác định bốn thông tin trước rồi mới viết thì thông báo luôn đầy đủ. Nhờ AI viết 'thật hay' mà không đưa dữ kiện sẽ ra thông báo bịa chi tiết; biểu tượng và đoạn giới thiệu làm thông báo dài hơn mà không thêm thông tin để hành động.",
    },
    summary: {
      keyIdea: "Thông báo tốt cho người nhận đủ thông tin để hành động trong ba giây.",
      formula: "Thông báo = ai + việc gì + hạn nào + liên kết thẳng.",
      commonMistake: "Viết thông báo như một lời báo tin thay vì lời nhờ hành động.",
      action: "Viết lại một thông báo 'có yêu cầu mới' thành bốn thông tin rồi đọc thử với một đồng nghiệp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một thông báo tự động mà bạn hay nhận (email hệ thống, tin nhắn nhóm). Viết lại nó thành bốn dòng: ai, việc gì, hạn nào, liên kết. Nhờ AI viết thêm hai bản khác nhau, rồi đối chiếu từng con số với thông báo gốc. Gửi bản bạn chọn cho chính bạn để xem trên điện thoại.",
      secondary: "Ghi lại bản nào bạn trả lời nhanh nhất khi nhận trên điện thoại.",
    },
    sections: [
      {
        type: "lead",
        text: "Giữa hai cuộc họp, điện thoại rung: 'Có yêu cầu mới.' Bạn không biết của ai, việc gì, nên bạn để đó. Bài này viết lại thông báo tự động sao cho người nhận biết việc cần làm chỉ sau một lần liếc.",
      },
      {
        type: "feynman",
        title: "Thông báo tự động đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ giấy ghi chú dán trên màn hình: 'Gọi khách Minh Phát trước 3h, số 090...' Nó không cần giải thích vì có sẵn ai, việc gì, hạn nào. Thông báo 'có người gọi' thì không giúp gì. Thông báo tự động chỉ tốt khi nó giống tờ ghi chú đầu tiên.",
        columns: ["Thành phần", "Ghi chú dán màn hình", "Thông báo tự động"],
        rows: [
          ["Ai", "Khách Minh Phát", "Tên người gửi hoặc người nộp đơn"],
          ["Việc gì", "Gọi lại", "Hành động cần làm: duyệt, trả lời, nộp bổ sung"],
          ["Hạn nào", "Trước 3h", "Hạn chót cụ thể, có ngày và giờ"],
          ["Ở đâu", "Số điện thoại ghi sẵn", "Liên kết mở thẳng tới yêu cầu"],
        ],
        oneLiner: "Thông báo tốt là tờ ghi chú dán màn hình: đọc một lần là biết phải làm gì.",
      },
      { type: "heading", text: "Bốn thông tin trong mỗi thông báo" },
      {
        type: "paragraph",
        text: "Thông báo cũ chỉ ghi 'có yêu cầu mới' vì người dựng luồng nghĩ người nhận sẽ mở ra xem. Nhưng người nhận đang làm việc khác, và mỗi lần phải mở ra tìm là một lần họ hoãn. Bốn thông tin cần có: ai, việc gì, hạn nào, liên kết. Thiếu một trong bốn thì người nhận phải hỏi lại.",
      },
      {
        type: "flow",
        title: "Thông báo được ghép từ đơn như thế nào",
        steps: [
          { label: "Đơn mới được nộp", detail: "Luồng bắt đầu khi có đơn mới. Dữ liệu đơn gồm tên người nộp, loại đơn, hạn." },
          { label: "Lấy các trường cần dùng", detail: "Luồng lấy tên, việc cần làm và hạn từ đơn. Nó không tự bịa; thiếu trường thì thông báo thiếu." },
          { label: "Điền vào mẫu", detail: "Mẫu có chỗ trống cho từng thông tin. Một mẫu tốt chỉ dài 2 đến 3 dòng." },
          { label: "Gắn liên kết", detail: "Liên kết mở thẳng tới đúng đơn. Người nhận bấm một lần là tới nơi làm việc." },
          { label: "Gửi tới người nhận", detail: "Gửi cho đúng người duyệt, không cho cả nhóm. Gửi thử cho chính bạn trước khi dùng thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết thông báo duyệt đơn nghỉ",
        task:
          "Chị Lan (phòng Kế toán) nộp đơn nghỉ 2 ngày, 14 và 15/10, cần anh Quang duyệt trước 17h thứ Năm. Lắp một yêu cầu để AI viết nháp thông báo gửi anh Quang.",
        parts: [
          {
            id: "context",
            label: "Dữ kiện",
            options: [
              {
                text: "Có một đơn mới, hãy viết thông báo.",
                feedback: "AI không biết đơn của ai, nghỉ khi nào, hạn nào; nó sẽ tự bịa các chi tiết này.",
              },
              {
                text: "Chị Lan, phòng Kế toán, xin nghỉ 14 và 15/10. Anh Quang duyệt trước 17h thứ Năm.",
                good: true,
                feedback: "Đủ ai, việc gì, ngày nào và hạn; AI chỉ phải sắp xếp, không phải đoán.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              {
                text: "Viết hay một chút.",
                feedback: "'Hay' không đo được; AI viết dài, nhiều chữ chào hỏi, người nhận phải đọc để tìm việc.",
              },
              {
                text: "Tối đa 3 dòng: dòng 1 là tiêu đề có hành động và hạn, dòng 2 là lý do ngắn, dòng 3 là chỗ để liên kết.",
                good: true,
                feedback: "Khuôn dạng rõ nên thông báo đọc được trong ba giây và bạn dễ đối chiếu.",
              },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              {
                text: "Thêm thật nhiều chi tiết để anh Quang khỏi hỏi lại.",
                feedback: "Thêm chi tiết làm thông báo dài và AI có thể thêm cả chi tiết không có trong đơn.",
              },
              {
                text: "Chỉ dùng thông tin tôi đưa, không tự thêm con số hay tên nào. Chỗ nào thiếu thì để [trống].",
                good: true,
                feedback: "Lời dặn này chặn AI bịa và cho bạn thấy chỗ cần điền bằng dữ liệu thật.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "format", "limit"],
            text: "Duyệt đơn nghỉ của Lan (Kế toán), hạn 17h thứ Năm\nLan xin nghỉ 14 và 15/10.\nMở đơn: [liên kết]",
          },
          {
            requires: ["context"],
            text: "Kính gửi anh Quang,\n\nChị Lan phòng Kế toán có gửi đơn xin nghỉ ngày 14 và 15/10. Kính mong anh dành thời gian xem xét và phản hồi sớm trước 17h thứ Năm để chị Lan có thể sắp xếp công việc...\n\n(Đủ dữ kiện nhưng dài dòng, tiêu đề chưa nói rõ hành động.)",
          },
          {
            text: "Có yêu cầu mới từ nhân viên Lan. Đơn xin nghỉ 3 ngày vì lý do sức khoẻ, cần duyệt gấp trong ngày hôm nay.\n\n(AI tự thêm '3 ngày', 'lý do sức khoẻ' và 'trong ngày hôm nay', những điều không có trong đơn.)",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát thông báo AI viết",
        task:
          "Đơn thật: anh Nam đề nghị mua 5 ghế văn phòng, cần chị Hoa duyệt. Chưa có hạn chót, chưa có tổng tiền. AI đã viết thông báo dưới đây; đánh dấu những đoạn AI tự thêm.",
        segments: [
          { text: "Duyệt đề nghị mua ghế của Nam." },
          {
            text: "Tổng tiền 12 triệu, cần duyệt trước 10h sáng mai.",
            error: "Đơn chưa có tổng tiền hay hạn chót; AI bịa cả hai để thông báo trông đủ thông tin.",
          },
          { text: "Nam đề nghị mua 5 ghế văn phòng." },
          {
            text: "Nhà cung cấp là công ty Hoàng Long, đã giảm 10% cho đơn này.",
            error: "Đơn không nhắc nhà cung cấp hay mức giảm; đây là chi tiết AI bịa và có thể gây hiểu nhầm khi duyệt.",
          },
          { text: "Mở đơn để xem chi tiết: [liên kết]." },
        ],
      },
      {
        type: "callout",
        label: "Gửi thử cho chính bạn trước",
        text: "Trước khi bật luồng cho người thật, đặt người nhận là chính bạn và gửi ba thông báo từ ba đơn giả. Xem trên điện thoại: bạn có biết việc cần làm sau một lần liếc không? Nếu không, người thật cũng không biết.",
      },
      {
        type: "closing",
        lines: [
          "Ai, việc gì, hạn nào, bấm đâu: bốn thông tin làm thông báo có thể hành động.",
          "Bài sau: khi thông báo quá nhiều, người ta tắt tiếng tất cả.",
        ],
      },
    ],
  },
  // ───────────────────────── Bài 9 ─────────────────────────
  {
    id: 2468,
    slug: "thong-bao-qua-nhieu-khien-nguoi-ta-tat-tieng",
    title: "Chặng 53, Bài 9: Thông báo quá nhiều khiến mọi người tắt tiếng: gộp và hạn chế",
    subtitle: "Sáu mươi tin mỗi ngày chẳng khác gì không có tin nào.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔕",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi luồng mới chạy, ai cũng thích nhận thông báo. Sau vài tuần, hộp thư đầy và người ta tắt tiếng cả nhóm, kể cả tin thật sự khẩn. Gộp và hạn chế thông báo không làm luồng kém đi, mà làm những tin còn lại được đọc.",
    openingQuestion:
      "Nhóm của bạn nhận khoảng 60 thông báo tự động mỗi ngày và mọi người đã tắt tiếng. Đề xuất nào có khả năng sửa tốt nhất?",
    openingOptions: [
      "Gộp việc thường thành một bản tóm tắt buổi sáng, chỉ giữ tin riêng cho việc khẩn",
      "Bỏ hẳn thông báo và để mọi người tự vào xem danh sách khi rảnh",
      "Gửi mọi thông báo thêm một lần nữa vào cuối ngày cho chắc",
      "Nhắc mọi người bật lại tiếng và đọc hết từng thông báo",
    ],
    correctOption: 0,
    explanation:
      "Phần lớn thông báo là việc thường, đọc lúc nào cũng được; chỉ vài cái thật sự khẩn. Gộp việc thường thành một bản tóm tắt và giữ tin riêng cho việc khẩn làm số lần bị làm phiền giảm mà tin quan trọng vẫn tới. Bỏ hẳn thông báo làm việc khẩn cũng trôi mất. Gửi thêm lần nữa làm thông báo nhiều gấp đôi. Nhắc mọi người đọc hết là đẩy lỗi thiết kế sang người nhận.",
    diagram: [
      { label: "Nhiều sự kiện xảy ra trong ngày", arrow: true },
      { label: "Luồng phân loại: khẩn hay thường", arrow: true },
      { label: "Khẩn: gửi riêng ngay", arrow: true },
      { label: "Thường: gom vào một bản tóm tắt sáng mai", arrow: true },
      { label: "Người nhận đọc một bản, không phải sáu mươi tin" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm chăm sóc khách hàng 8 người có luồng báo mỗi khi có phiếu hỗ trợ mới. Sau hai tháng, cả nhóm tắt tiếng kênh thông báo. Nhóm sửa luồng: phiếu khẩn (khách mất dịch vụ) báo riêng ngay, phiếu còn lại gom thành một bản tóm tắt lúc 8h30. Số tin mỗi người nhận mỗi ngày giảm rõ và không còn phiếu khẩn nào bị bỏ sót. Đây là tình huống dựng để minh hoạ, không có số liệu thật.",
    },
    quiz: [
      Q(
        "Vì sao thông báo quá nhiều lại làm hại luồng?",
        "Người nhận bắt đầu bỏ qua tất cả, kể cả tin thật sự quan trọng",
        [
          "Máy chủ gửi quá nhiều tin nên luồng chạy chậm hơn",
          "Người nhận hết dung lượng hộp thư nên không nhận được tin mới nào nữa",
          "Công ty bị tính thêm phí cho mỗi thông báo gửi đi",
        ],
        "Vấn đề chính là chú ý của người nhận: tin nào cũng như tin nào, nên họ tắt tiếng hết. Tốc độ máy chủ, dung lượng hộp thư hay phí là những vấn đề khác và thường không phải nguyên nhân khiến mọi người bỏ qua."
      ),
      Q(
        "Thông báo nào nên gửi riêng ngay thay vì gộp vào bản tóm tắt?",
        "Việc có hạn trong vài giờ tới mà không ai làm thì gây thiệt hại",
        [
          "Mọi đơn mới của ngày hôm nay, dù hạn còn xa",
          "Tin báo một đơn cũ đã được duyệt xong từ tuần trước, không cần làm thêm",
          "Bản nhắc định kỳ về việc cần làm tuần sau",
        ],
        "Chỉ việc khẩn, có hạn gần và hậu quả thật mới đáng làm phiền ngay. Đơn mới có hạn xa, tin đã xong hay nhắc việc tuần sau đều đọc trong bản tóm tắt vẫn kịp."
      ),
      Q(
        "Nhóm có 60 sự kiện mỗi ngày, trong đó 3 việc khẩn (số liệu minh hoạ). Nếu gộp phần còn lại thành 1 bản tóm tắt, một người nhận khoảng bao nhiêu thông báo?",
        "4 (3 tin khẩn riêng và 1 bản tóm tắt)",
        [
          "57 (60 trừ 3, chỉ bỏ các tin khẩn ra khỏi số tin)",
          "63 (60 cộng 3, coi tin khẩn được gửi thêm)",
          "1 (chỉ tính bản tóm tắt, bỏ các tin khẩn)",
        ],
        "Mỗi tin khẩn vẫn gửi riêng, 3 tin; 57 tin còn lại chỉ thành 1 bản tóm tắt. Tổng là 3 cộng 1 bằng 4. Bớt 3 hay cộng thêm 3 đều bỏ sót việc gộp, còn chỉ tính bản tóm tắt thì quên mất các tin khẩn."
      ),
      Q(
        "Bản tóm tắt buổi sáng nên sắp xếp thế nào?",
        "Việc có hạn gần nhất lên đầu, mỗi việc một dòng kèm liên kết",
        [
          "Theo thứ tự thời gian tới, việc cũ nhất ở dưới cùng",
          "Theo bảng chữ cái tên người nộp để dễ tra cứu",
          "Gộp mọi việc vào một đoạn văn dài để đọc liền mạch",
        ],
        "Người đọc cần biết việc nào làm trước: sắp theo hạn gần nhất, một dòng một việc, có liên kết. Sắp theo chữ cái hay đoạn văn dài buộc họ phải tự tìm việc gấp, và đặt việc cũ nhất xuống dưới thì dễ bỏ lỡ hạn."
      ),
      Q(
        "Sau khi đổi sang bản tóm tắt, bạn nên đo gì để biết có hiệu quả?",
        "Số thông báo mỗi người nhận mỗi ngày và số việc bị trễ hạn",
        [
          "Số người nói rằng họ thích bản tóm tắt mới",
          "Số chữ trung bình của mỗi thông báo mà luồng gửi ra trong tuần",
          "Số lần luồng chạy thành công trong tuần",
        ],
        "Hai số đo đúng mục tiêu: số tin mỗi người nhận có giảm không, và việc có bị trễ không. Sự yêu thích, độ dài chữ hay số lần luồng chạy đều không cho biết người nhận có bỏ lỡ việc hay không."
      ),
    ],
    keyTakeaways: [
      "Thông báo nhiều làm người nhận tắt tiếng tất cả, kể cả việc khẩn.",
      "Việc khẩn gửi riêng; việc thường gộp vào một bản tóm tắt.",
      "Bản tóm tắt sắp theo hạn gần nhất, mỗi việc một dòng kèm liên kết.",
      "Đo số tin mỗi người nhận và số việc trễ hạn để biết sửa có tác dụng.",
    ],
    practicePrompt: {
      question:
        "Phòng bạn nhận 40 thông báo mỗi ngày và có 2 việc thật sự khẩn. Bạn đề xuất gì trước?",
      options: [
        "Giữ 2 tin khẩn gửi riêng, gộp phần còn lại thành một bản tóm tắt",
        "Tắt toàn bộ thông báo và dặn mọi người tự kiểm tra",
        "Chuyển hết thông báo sang một kênh chat chung",
        "Giảm chữ trong mỗi thông báo xuống còn vài từ",
      ],
      correct: 0,
      explanation:
        "Phân loại khẩn và thường rồi gộp phần thường giải quyết đúng gốc của việc quá tải. Tắt hết thì việc khẩn cũng trôi, kênh chat chung vẫn đầy tin, còn rút ngắn chữ không làm giảm số tin phải đọc.",
    },
    summary: {
      keyIdea: "Ít thông báo hơn nhưng đúng chỗ thì được đọc nhiều hơn.",
      formula: "Tin mỗi người mỗi ngày = tin khẩn gửi riêng + số bản tóm tắt.",
      commonMistake: "Thêm thông báo cho mỗi sự kiện mà không hỏi người nhận có cần biết ngay không.",
      action: "Đếm số thông báo tự động bạn nhận trong một ngày và đánh dấu cái nào thật sự khẩn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Hôm nay, đếm mọi thông báo tự động bạn nhận (email hệ thống, tin nhóm, app). Ghi vào bảng: nguồn, có khẩn không, đã hành động chưa. Sau đó viết một đề xuất gộp, ghi rõ tin nào gửi riêng, tin nào vào bản tóm tắt buổi sáng.",
      secondary: "Gửi đề xuất cho một đồng nghiệp và hỏi họ có cảm thấy quá tải tương tự không.",
    },
    sections: [
      {
        type: "lead",
        text: "Tháng đầu, cả nhóm thích việc luồng tự báo. Tháng thứ ba, hộp thư có 60 tin mỗi ngày và mọi người đã tắt tiếng kênh đó. Bài này xem cách gộp để tin thật sự khẩn không bị chìm.",
      },
      {
        type: "feynman",
        title: "Thông báo gộp đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới bản tin buổi sáng ở nhiều cơ quan: thay vì mỗi tin ai đó chạy tới báo miệng, có một tờ tổng hợp phát lúc 8h30. Chỉ khi cháy nhà mới có người chạy vào báo ngay. Thông báo gộp hoạt động y như vậy.",
        columns: ["Thành phần", "Bản tin sáng và tiếng chuông báo cháy", "Thông báo gộp và thông báo khẩn"],
        rows: [
          ["Việc thường", "Gom vào bản tin phát lúc 8h30", "Gom vào một bản tóm tắt buổi sáng"],
          ["Việc khẩn", "Chuông báo cháy, ai cũng nghe", "Thông báo riêng, gửi ngay"],
          ["Tần suất", "Một tờ mỗi ngày", "Một bản tóm tắt mỗi ngày"],
          ["Hậu quả nếu gửi tất cả bằng chuông", "Không ai tin chuông nữa", "Mọi người tắt tiếng kênh thông báo"],
        ],
        oneLiner: "Việc thường vào bản tin, chỉ việc khẩn mới bấm chuông.",
      },
      { type: "heading", text: "Ba cách giảm thông báo" },
      {
        type: "list",
        items: [
          "Gộp: nhiều việc thường thành một bản tóm tắt vào giờ cố định.",
          "Hạn chế: mỗi người một thông báo khẩn tối đa trong một khoảng thời gian, tránh bắn liên tiếp.",
          "Lọc: chỉ gửi cho người thật sự cần hành động, không gửi cho cả nhóm.",
        ],
      },
      {
        type: "chart",
        title: "Số thông báo mỗi người nhận mỗi ngày",
        caption:
          "Số liệu minh hoạ, không phải đo thật. Đường thứ nhất: mỗi sự kiện một thông báo. Đường thứ hai: gộp phần thường, giữ riêng số tin khẩn bạn chọn, cộng thêm một bản tóm tắt.",
        kind: "line",
        xLabel: "Số sự kiện mỗi ngày",
        yLabel: "Số thông báo mỗi người",
        x: { from: 0, to: 60, step: 5 },
        params: [{ id: "urgent", label: "Số tin khẩn mỗi ngày", min: 0, max: 10, step: 1, value: 3, unit: "tin" }],
        series: [
          { label: "Mỗi sự kiện một tin", expr: "x" },
          { label: "Gộp và giữ riêng tin khẩn", expr: "min(x, urgent) + 1" },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đề xuất gộp do AI viết",
        task:
          "Bạn nhờ AI viết đề xuất gộp thông báo cho nhóm. Bạn chỉ cho AI biết: nhóm nhận khoảng 60 thông báo mỗi ngày, có 3 việc khẩn, và nhóm muốn thử bản tóm tắt lúc 8h30. Bạn chưa có bất kỳ khảo sát nào. Đánh dấu những đoạn AI tự thêm.",
        segments: [
          { text: "Nhóm hiện nhận khoảng 60 thông báo mỗi ngày." },
          {
            text: "Theo khảo sát nội bộ, 70% thành viên đã tắt tiếng kênh thông báo.",
            error: "Bạn chưa cung cấp khảo sát nào; AI bịa ra con số 70% để đề xuất nghe có sức thuyết phục.",
          },
          { text: "Đề xuất giữ riêng 3 tin khẩn và gộp phần còn lại." },
          { text: "Bản tóm tắt gửi lúc 8h30 mỗi sáng, xếp việc theo hạn gần nhất." },
          {
            text: "Các công ty lớn như Microsoft và Google đều áp dụng cách gộp này và tăng năng suất 25%.",
            error: "Đây là trích dẫn bịa: bạn không đưa nguồn nào, và con số 25% không có căn cứ. Đừng dùng khi chưa kiểm được nguồn thật.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bản tóm tắt cũng cần thử",
        text: "Sau hai tuần thử bản tóm tắt, hỏi ba người: họ có đọc không, có bỏ lỡ việc nào không. Nếu có người vẫn bỏ lỡ, việc đó có thể cần chuyển sang nhóm tin khẩn.",
      },
      {
        type: "scenario",
        title: "Đề xuất gộp cho nhóm 8 người",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhóm phàn nàn về quá nhiều thông báo. Bạn chuẩn bị đề xuất. Bạn bắt đầu bằng việc nào?",
            choices: [
              { label: "Đếm thông báo thật trong 3 ngày và đánh dấu cái nào khẩn", next: "s2" },
              { label: "Đề xuất tắt hết thông báo cho gọn", next: "bad_off" },
            ],
          },
          bad_off: {
            text: "Sau một tuần không có thông báo, một đơn khẩn của khách lớn nằm im hai ngày. Nhóm bật lại toàn bộ thông báo và tin cũ trở lại như ban đầu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 3 loại thật sự khẩn, còn lại là tin thường. Bạn đề xuất gì?",
            choices: [
              { label: "Tin khẩn gửi riêng ngay; tin thường gộp vào bản tóm tắt 8h30, thử hai tuần", next: "good" },
              { label: "Gửi tin thường mỗi giờ một bản tóm tắt nhỏ", next: "bad_hourly" },
            ],
          },
          bad_hourly: {
            text: "Mỗi giờ một bản tóm tắt vẫn là tám bản mỗi ngày. Mọi người vẫn tắt tiếng, vì nhịp làm phiền gần như không đổi.",
            ending: "bad",
          },
          good: {
            text: "Sau hai tuần, mỗi người nhận khoảng bốn thông báo thay vì sáu mươi. Không việc khẩn nào bị bỏ lỡ và cả nhóm bật lại tiếng cho kênh đó.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Việc khẩn gửi riêng, việc thường gộp lại.",
          "Bài sau: mini dự án nối biểu mẫu, phê duyệt và ghi sổ.",
        ],
      },
    ],
  },
  // ───────────────────────── Bài 10 ─────────────────────────
  {
    id: 2469,
    slug: "mini-du-an-luong-de-nghi-mua-sam-co-duyet-va-ghi-so",
    title: "Chặng 53, Bài 10: Mini dự án: đề nghị mua sắm có duyệt và tự ghi vào sổ",
    subtitle: "Một biểu mẫu, một người gật đầu, một dòng mới trong bảng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🛒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đề nghị mua sắm là việc kết hợp đủ ba thứ bạn vừa học: phê duyệt, thông báo và ghi sổ. Làm xong dự án nhỏ này, bạn có một luồng thật có thể đem đi dùng, và quan trọng hơn là có thói quen thử trước bằng ca thử rồi mới cho người thật dùng.",
    openingQuestion:
      "Bạn nối biểu mẫu đề nghị mua, bước duyệt và bước ghi một dòng vào bảng theo dõi. Điều gì nên làm trước khi cho cả phòng dùng?",
    openingOptions: [
      "Chạy thử bằng vài đề nghị giả, gồm cả trường hợp bị từ chối",
      "Cho cả phòng dùng ngay rồi sửa theo phản hồi của từng người",
      "Chỉ thử trường hợp được duyệt vì đó là trường hợp phổ biến nhất",
      "Đợi người duyệt xem kỹ bản mô tả luồng rồi mới cho chạy",
    ],
    correctOption: 0,
    explanation:
      "Ca thử giả là cách phát hiện lỗi mà không ảnh hưởng tới người thật, và phải có cả ca bị từ chối vì đó là chỗ luồng hay ghi nhầm vào sổ. Cho cả phòng dùng ngay là dùng người thật làm người thử. Chỉ thử ca được duyệt bỏ sót ca từ chối và ca quá hạn. Chỉ đọc bản mô tả thì không chạm vào chỗ luồng ghi sai dữ liệu.",
    diagram: [
      { label: "Biểu mẫu đề nghị mua", arrow: true },
      { label: "Gửi người duyệt, chờ trong thời hạn", arrow: true },
      { label: "Được duyệt: ghi một dòng vào bảng theo dõi", arrow: true },
      { label: "Từ chối hoặc quá hạn: không ghi, báo người nộp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng vận hành 10 người ghi đề nghị mua sắm trong một bảng tính, do một người cập nhật tay. Có tuần bảng thiếu ba khoản đã duyệt vì người cập nhật nghỉ ốm. Phòng dựng luồng: đề nghị đi qua người duyệt, được duyệt thì luồng ghi một dòng vào bảng, bị từ chối thì không ghi. Bảng trở thành bản ghi đáng tin vì không còn phụ thuộc vào một người nhớ cập nhật. Đây là tình huống dựng để minh hoạ.",
    },
    quiz: [
      Q(
        "Khoản đề nghị bị từ chối. Luồng nên làm gì với bảng theo dõi?",
        "Không ghi dòng mua sắm, chỉ báo người nộp kèm lý do",
        [
          "Ghi dòng mua sắm với số tiền bằng không",
          "Ghi dòng mua sắm bình thường rồi đánh dấu là huỷ",
          "Xoá đề nghị khỏi mọi nơi để sổ sách gọn hơn và khỏi ai hỏi lại",
        ],
        "Sổ mua sắm chỉ ghi khoản đã được duyệt; dòng số tiền không hay dòng huỷ làm bảng rối và dễ bị cộng nhầm. Xoá hẳn đề nghị thì mất dấu vết việc đã bị từ chối và lý do."
      ),
      Q(
        "Ba ca thử tối thiểu nên gồm những trường hợp nào?",
        "Được duyệt, bị từ chối và quá hạn không ai trả lời",
        [
          "Ba đề nghị được duyệt với số tiền khác nhau",
          "Một đề nghị nhỏ, một đề nghị lớn và một đề nghị trống",
          "Ba đề nghị do ba người khác nhau nộp",
        ],
        "Ba nhánh kết thúc khác nhau của luồng (duyệt, từ chối, quá hạn) phải đều chạy thử. Ba ca cùng được duyệt, hay ba người khác nhau nhưng cùng một nhánh, không kiểm được nhánh nào ngoài đường thuận."
      ),
      Q(
        "Khi thử luồng, người duyệt và người nhận thông báo nên là ai?",
        "Chính bạn hoặc một đồng nghiệp đã đồng ý, và thư thử gắn nhãn [THỬ]",
        [
          "Người duyệt thật nhưng bạn dặn họ coi như thư chơi",
          "Toàn bộ phòng để ai cũng biết luồng đang chạy",
          "Không ai cả, vì luồng chưa cho chạy thì chưa cần người nhận thông báo nào",
        ],
        "Dùng người thật làm người thử gây nhầm lẫn và có thể khiến đơn thử bị duyệt thật. Người thử là bạn hoặc người đã đồng ý, và nhãn [THỬ] giúp phân biệt. Không có người nhận thì không kiểm được bước thông báo."
      ),
      Q(
        "Bảng theo dõi nên có những cột nào là tối thiểu?",
        "Ngày, người nộp, món đồ, số tiền, người duyệt và trạng thái",
        [
          "Chỉ món đồ và số tiền, các thông tin khác để trong đơn",
          "Tên luồng, phiên bản luồng, ngày dựng luồng và người dựng luồng",
          "Số lần luồng chạy và thời gian chạy mỗi lần",
        ],
        "Bảng là sổ để tra cứu và đối chiếu, nên cần biết ai đề nghị gì, bao nhiêu, ai duyệt, tình trạng. Chỉ món đồ và số tiền làm sổ không truy được trách nhiệm, còn thông tin vận hành luồng không phải thông tin mua sắm."
      ),
      Q(
        "Luồng ghi nhầm một dòng vào bảng sau khi chạy thật. Bước đầu tiên hợp lý là gì?",
        "Tạm dừng luồng, sửa dòng bằng tay, rồi tìm nguyên nhân bằng một ca thử",
        [
          "Để luồng chạy tiếp và sửa tay mỗi khi phát hiện dòng sai",
          "Xoá luồng và quay lại làm bằng tay hoàn toàn",
          "Nhờ AI viết lại toàn bộ luồng rồi bật lên ngay",
        ],
        "Dừng luồng để lỗi không lan thêm, sửa dòng sai, rồi tái hiện lỗi bằng ca thử để tìm nguyên nhân. Để chạy tiếp thì dòng sai tích tụ, xoá hết là bỏ cả phần đã đúng, và để AI viết lại rồi bật ngay bỏ qua bước thử."
      ),
    ],
    keyTakeaways: [
      "Mini dự án nối ba phần: biểu mẫu, phê duyệt, ghi sổ.",
      "Chỉ ghi vào sổ khi được duyệt; từ chối và quá hạn thì không ghi.",
      "Ba ca thử tối thiểu: được duyệt, bị từ chối, quá hạn.",
      "Thử bằng người nhận là bạn và thư gắn nhãn [THỬ].",
    ],
    practicePrompt: {
      question:
        "Bạn dựng xong luồng đề nghị mua sắm. Việc nào nên làm trước khi bật cho cả phòng?",
      options: [
        "Chạy ba ca thử: được duyệt, bị từ chối, quá hạn",
        "Gửi email thông báo luồng mới cho cả phòng rồi sửa theo phản hồi",
        "Đợi tuần sau để xem có ai phàn nàn không",
        "Thêm nhiều bước duyệt hơn cho chắc",
      ],
      correct: 0,
      explanation:
        "Ba ca thử kiểm được cả ba nhánh kết thúc của luồng trước khi người thật dùng. Gửi thông báo luồng mới khi chưa thử là mời người thật đi gặp lỗi, chờ phàn nàn là dùng người dùng làm người thử, thêm bước duyệt thì làm luồng phức tạp hơn mà chưa biết luồng hiện tại có chạy đúng không.",
    },
    summary: {
      keyIdea: "Luồng nhỏ chạy đúng ba nhánh (duyệt, từ chối, quá hạn) đáng tin hơn luồng lớn chỉ thử một nhánh.",
      formula: "Biểu mẫu → người duyệt (có thời hạn) → ghi sổ khi được duyệt.",
      commonMistake: "Chỉ thử trường hợp được duyệt và bỏ qua trường hợp từ chối, quá hạn.",
      action: "Viết ba ca thử, kết quả mong đợi của từng ca, rồi chạy thử từng ca.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một đề nghị thật ở chỗ bạn (mua văn phòng phẩm, xin phần mềm, xin đặt phòng). Viết ra ba ca thử trên một trang: ca được duyệt, ca bị từ chối, ca quá hạn. Mỗi ca ghi sẵn điều bạn mong thấy trong bảng theo dõi và trong tin báo cho người nộp.",
      secondary: "Nếu bạn dựng được luồng, chạy ba ca với người nhận là chính bạn và ghi lại điều khác với mong đợi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học phê duyệt một cấp, người thay thế và thông báo gọn. Bài này nối lại thành một luồng nhỏ có thật: nhân viên điền đề nghị mua, người duyệt gật đầu, và một dòng mới tự xuất hiện trong bảng theo dõi. Quan trọng nhất là ba ca thử trước khi cho ai dùng.",
      },
      {
        type: "feynman",
        title: "Luồng mua sắm có duyệt đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới quy trình đề nghị chi tiêu trên giấy: bạn điền phiếu, sếp ký, kế toán ghi vào sổ. Nếu sếp không ký thì kế toán không ghi gì. Luồng tự động là chính quy trình đó, nhưng phiếu không bị thất lạc và sổ không phụ thuộc người nhớ ghi.",
        columns: ["Thành phần", "Quy trình phiếu giấy", "Luồng tự động"],
        rows: [
          ["Phiếu đề nghị", "Điền tay, đưa cho sếp", "Biểu mẫu điền trực tuyến"],
          ["Chữ ký", "Sếp ký hoặc không ký", "Người duyệt chọn duyệt hoặc từ chối"],
          ["Sổ", "Kế toán ghi khi có chữ ký", "Luồng ghi dòng mới khi được duyệt"],
          ["Từ chối", "Phiếu trả lại, không ghi sổ", "Không ghi dòng, báo người nộp"],
        ],
        oneLiner: "Có chữ ký thì có dòng trong sổ, không có chữ ký thì không có gì.",
      },
      { type: "heading", text: "Ba phần nối lại" },
      {
        type: "paragraph",
        text: "Luồng này nối ba phần bạn đã biết. Biểu mẫu thu thông tin đủ để quyết định. Bước duyệt có một người và một thời hạn chờ. Bước ghi sổ chỉ chạy khi kết quả là duyệt. Phần khó nhất không phải nối mà là nghĩ tới những nhánh không đẹp: bị từ chối, quá hạn, biểu mẫu thiếu thông tin.",
      },
      {
        type: "flow",
        title: "Đề nghị mua sắm đi qua luồng",
        steps: [
          { label: "Điền biểu mẫu", detail: "Nhân viên điền món đồ, số tiền, lý do. Các ô bắt buộc không được bỏ trống, để người duyệt đủ thông tin quyết định." },
          { label: "Gửi người duyệt", detail: "Luồng gửi thông báo ngắn có ai, món gì, bao nhiêu tiền, hạn nào, liên kết. Bắt đầu đếm thời hạn chờ." },
          { label: "Người duyệt quyết định", detail: "Duyệt, từ chối kèm lý do, hoặc không trả lời. Mỗi kết quả đi một nhánh khác nhau." },
          { label: "Ghi vào bảng (chỉ khi duyệt)", detail: "Luồng thêm một dòng: ngày, người nộp, món đồ, số tiền, người duyệt, trạng thái 'đã duyệt'." },
          { label: "Báo người nộp", detail: "Người nộp nhận kết quả. Từ chối thì có lý do; quá hạn thì có tin báo đơn đang được nhắc." },
        ],
      },
      {
        type: "list",
        items: [
          "Ca 1 - Được duyệt: mong thấy một dòng mới đúng số tiền trong bảng, và tin báo duyệt cho người nộp.",
          "Ca 2 - Bị từ chối: mong thấy không có dòng mới, và tin báo từ chối kèm lý do.",
          "Ca 3 - Quá hạn: mong thấy tin nhắc gửi tới người duyệt, không có dòng mới trong bảng.",
          "Mọi ca thử dùng người nhận là bạn và tiêu đề gắn nhãn [THỬ].",
        ],
      },
      {
        type: "callout",
        label: "Đừng thử trên dữ liệu thật của người khác",
        text: "Đề nghị thử dùng món đồ giả và số tiền giả, và người nhận là chính bạn. Nếu thử bằng đề nghị thật của đồng nghiệp, họ có thể nhận tin duyệt thật cho một thứ họ chưa từng xin.",
      },
      {
        type: "scenario",
        title: "Chạy thử luồng đề nghị mua sắm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa dựng xong luồng đề nghị mua sắm và sếp muốn cả phòng dùng từ thứ Hai. Hôm nay là thứ Sáu. Bạn làm gì?",
            choices: [
              { label: "Viết ba ca thử (duyệt, từ chối, quá hạn) và chạy với người nhận là chính bạn", next: "s2" },
              { label: "Bật luôn cho cả phòng và theo dõi phản hồi trong tuần", next: "bad_launch" },
            ],
          },
          bad_launch: {
            text: "Thứ Ba, một đề nghị bị từ chối vẫn được ghi vào bảng với trạng thái sai. Kế toán cộng nhầm 4 triệu và phải đối chiếu lại tất cả các dòng của tuần.",
            ending: "bad",
          },
          s2: {
            text: "Ca 1 và ca 2 chạy đúng. Ca 3 (quá hạn) thì người duyệt không nhận được tin nhắc. Bạn làm gì?",
            choices: [
              { label: "Sửa bước nhắc, chạy lại ca 3 cho tới khi đúng rồi mới cho cả phòng dùng", next: "good" },
              { label: "Bỏ qua ca 3 vì hiếm khi xảy ra", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Tuần sau người duyệt nghỉ ốm, một đề nghị cần gấp nằm im bốn ngày mà không ai được nhắc. Nhóm quay lại hỏi trực tiếp bằng tin nhắn như trước.",
            ending: "bad",
          },
          good: {
            text: "Cả ba ca đều cho kết quả như đã viết trước. Thứ Hai cả phòng dùng luồng, và bảng theo dõi chỉ có các dòng đã duyệt.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Biểu mẫu, duyệt, ghi sổ: ba phần, và ba ca thử.",
          "Bài sau: đặt tên tệp tự động để ba tháng sau vẫn tìm ra.",
        ],
      },
    ],
  },
];
