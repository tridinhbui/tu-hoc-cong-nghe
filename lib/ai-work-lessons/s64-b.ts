import type { Lesson } from "../lesson-types";

// Chặng 64, bài 6-10. Giáo trình: scripts/curriculum/stage-64.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách xếp việc,
// cách kiểm kết quả và cách ghi sổ công cụ. Số liệu trong biểu đồ là minh hoạ.

const g = (text: string, feedback: string) => ({ text, good: true, feedback });
const b = (text: string, feedback: string) => ({ text, feedback });
const Q = (question: string, options: string[], explanation: string) => ({ question, options, correct: 0, explanation });

export const S64_B_LESSONS: Lesson[] = [
  {
    id: 2685,
    slug: "cham-diem-mot-viec-dung-ai-theo-du-lieu-va-hau-qua",
    title: "Chặng 64, Bài 6: Chấm điểm một việc dùng AI theo dữ liệu chạm tới và hậu quả sai",
    subtitle: "Mười việc của phòng, hai câu hỏi cho mỗi việc: đưa vào gì, và nếu sai thì sao.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nói chung chung rằng dùng AI có rủi ro thì không ai biết làm gì tiếp. Chấm điểm từng việc theo hai trục giúp cả phòng thống nhất: việc nào làm ngay, việc nào cần người xem, việc nào chưa nên giao. Ba mươi phút chấm điểm một lần tiết kiệm được nhiều cuộc tranh luận về sau.",
    openingQuestion:
      "Sáng thứ Hai, trưởng phòng hỏi: \"Mười việc lặp lại của phòng mình, việc nào dùng AI được?\" Bạn nên bắt đầu từ đâu?",
    openingOptions: [
      "Hỏi từng việc: đưa vào AI thứ gì, và nếu kết quả sai thì hậu quả là gì",
      "Chọn việc nào tốn nhiều giờ nhất, vì tiết kiệm được nhiều nhất",
      "Chọn việc nào nhân viên trẻ thấy thích, vì họ dùng AI quen tay",
      "Chờ công ty có quy định đầy đủ rồi mới xếp bất kỳ việc nào",
    ],
    correctOption: 0,
    explanation:
      "Hai câu hỏi này quyết định mức cẩn thận cần có: thứ bạn đưa vào quyết định rủi ro lộ thông tin, còn hậu quả khi sai quyết định mức kiểm tra. Tốn nhiều giờ chỉ cho biết việc đáng tự động hoá, chưa cho biết có an toàn không. Sở thích của người trẻ không đo được rủi ro. Còn chờ quy định đầy đủ thì phòng bạn vẫn dùng AI mỗi ngày mà không có khung nào.",
    diagram: [
      { label: "Liệt kê việc lặp lại của phòng", arrow: true },
      { label: "Chấm điểm dữ liệu đưa vào (1-3)", arrow: true },
      { label: "Chấm điểm hậu quả nếu sai (1-3)", arrow: true },
      { label: "Lấy điểm cao hơn làm mức của việc", arrow: true },
      { label: "Mức quyết định cách kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng hành chính 8 người",
      description:
        "Phòng liệt kê 10 việc và chấm điểm từng việc. Việc soạn lời nhắc họp và đổi định dạng biên bản chấm mức 1, làm ngay. Soạn thư phản hồi khiếu nại có tên khách và số tiền hoàn chấm mức 3, có người duyệt trước khi gửi. Sau buổi chấm điểm, cả phòng thôi tranh luận việc này được hay không, vì đã có cùng một thước đo.",
    },
    quiz: [
      Q(
        "Trong bảng hai trục, việc nào nên xếp vào ô cao ở cả hai trục?",
        [
          "Soạn thư phản hồi khiếu nại có tên khách và số tiền hoàn",
          "Viết lại lời chào và phần mở đầu của email mời họp nội bộ",
          "Gợi ý tiêu đề cho bài đăng fanpage sắp đăng",
          "Đổi bảng gạch đầu dòng công khai thành đoạn văn",
        ],
        "Thư khiếu nại chứa tên khách (dữ liệu nhạy cảm) và gắn với tiền hoàn (sai thì mất tiền, mất khách) nên cao cả hai trục. Lời chào email họp, tiêu đề bài đăng và đổi định dạng nội dung công khai đều không chạm dữ liệu nhạy cảm và sai thì sửa được ngay."
      ),
      Q(
        "Trục dữ liệu nhạy cảm đo điều gì?",
        [
          "Loại thông tin bạn đưa vào: tên, lương, hợp đồng",
          "Mức độ khó của việc: việc khó thì coi là nhạy cảm hơn",
          "Số phút AI cần để làm xong và trả kết quả về cho bạn",
          "Số người trong công ty sẽ đọc kết quả sau khi bạn gửi đi",
        ],
        "Trục này chỉ hỏi bạn đưa gì vào ô chat. Độ khó của việc là chuyện khác, không liên quan đến việc lộ thông tin. Thời gian chờ không đo rủi ro. Số người đọc kết quả thuộc về trục hậu quả nếu sai, không phải trục dữ liệu đầu vào."
      ),
      Q(
        "Một việc chỉ dùng số liệu công khai, nhưng kết quả gửi cơ quan quản lý. Xử lý thế nào?",
        [
          "Vẫn cần người duyệt, vì trục hậu quả nếu sai đã cao",
          "Làm ngay không cần duyệt, vì dữ liệu công khai thì đủ an toàn",
          "Cấm dùng AI, vì việc nào hậu quả lớn đều phải cấm hẳn",
          "Chỉ cần soát chính tả là đủ an toàn để gửi đi luôn",
        ],
        "Hai trục độc lập: dữ liệu công khai chỉ làm trục đầu vào thấp, còn hậu quả gửi sai ra cơ quan vẫn cao. Nên dùng AI được nhưng người có trách nhiệm phải kiểm số. Cấm hẳn là quá tay, còn soát chính tả bỏ sót lỗi số liệu, là lỗi nặng nhất."
      ),
      Q(
        "Một việc có điểm dữ liệu 3 và điểm hậu quả 2. Mức của việc là bao nhiêu?",
        [
          "Mức 3 (= max(3, 2), một trục cao là đủ phải cẩn thận)",
          "Mức 2,5 (= (3 + 2) ÷ 2, lấy trung bình hai trục)",
          "Mức 2 (= min(3, 2), lấy trục thấp hơn cho đỡ phiền)",
          "Mức 5 (= 3 + 2, cộng hai trục lại với nhau)",
        ],
        "Lấy điểm cao hơn vì chỉ cần một trục cao là đã có rủi ro thật: trung bình làm điểm cao bị pha loãng, lấy thấp bỏ qua trục nguy hiểm, còn cộng cho ra mức 5 nằm ngoài thang 1-3."
      ),
      Q(
        "Xếp xong mười việc vào bảng, bảng này dùng để làm gì?",
        [
          "Chọn mức kiểm tra cho từng việc trước khi giao AI",
          "Xếp hạng nhân viên theo mức độ dùng AI trong tháng vừa rồi",
          "Chứng minh với sếp rằng AI không có rủi ro nào đáng kể",
          "Lập danh sách việc bị cấm AI vĩnh viễn trong cả công ty",
        ],
        "Bảng là công cụ quyết định cách làm: mức thấp làm ngay, mức cao có người duyệt. Nó không chấm người dùng, không nhằm chứng minh AI vô hại, và cũng không phải danh sách cấm vĩnh viễn, vì mức của việc đổi khi dữ liệu hay công cụ đổi."
      ),
    ],
    keyTakeaways: [
      "Hai câu hỏi cho mỗi việc: đưa vào gì, và nếu sai thì hậu quả gì.",
      "Chấm mỗi trục từ 1 đến 3, rồi lấy điểm cao hơn làm mức của việc.",
      "Dữ liệu công khai không có nghĩa là việc an toàn: hậu quả sai vẫn có thể cao.",
      "Bảng dùng để quyết định mức kiểm, không để chấm người hay để cấm.",
      "Chấm lại khi công cụ hoặc loại dữ liệu đổi.",
    ],
    practicePrompt: {
      question:
        "Chị Hà (kế toán) định nhờ AI soạn bản nhắc công nợ gửi khách, có tên khách và số tiền nợ. Mức của việc này là gì?",
      options: [
        "Mức cao: có tên khách và số tiền, gửi sai thì mất uy tín",
        "Mức thấp: bản nhắc chỉ là thư ngắn, sai cũng chẳng sao",
        "Mức thấp: khách đã biết số nợ nên không có gì quá nhạy cảm cả",
        "Chưa chấm được: phải chờ AI viết xong mới biết mức",
      ],
      correct: 0,
      explanation:
        "Tên khách và số nợ là dữ liệu nhạy cảm, và nhắc sai số tiền thì làm hỏng quan hệ hoặc bị khiếu nại. Thư ngắn không làm hậu quả nhỏ đi. Khách biết số nợ của họ không có nghĩa dữ liệu được phép đưa ra ngoài công ty. Mức chấm được trước khi làm, dựa trên thứ đưa vào và hậu quả sai.",
    },
    summary: {
      keyIdea: "Mỗi việc có hai câu hỏi: đưa gì vào, và sai thì mất gì. Điểm cao hơn quyết định mức cẩn thận.",
      formula: "Mức của việc = max(điểm dữ liệu, điểm hậu quả), mỗi điểm từ 1 đến 3.",
      commonMistake: "Coi việc dữ liệu công khai là an toàn, bỏ qua hậu quả khi kết quả đi ra ngoài.",
      action: "Chấm điểm 10 việc lặp lại của bạn trên giấy, rồi gạch dưới những việc mức 3.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê 10 việc bạn hay làm trong tuần. Với mỗi việc ghi hai con số 1-3: điểm dữ liệu đưa vào và điểm hậu quả nếu sai, rồi lấy số cao hơn. Khoanh tròn 3 việc mức thấp nhất và 3 việc mức cao nhất.",
      secondary: "Ngày mai bạn sẽ được hỏi: việc nào bạn chấm mức 3 mà trước đây vẫn làm hàng ngày mà chưa từng nghĩ về nó?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, trưởng phòng hỏi việc nào trong phòng được dùng AI. Mỗi người trả lời một kiểu, vì chưa ai có thước đo chung. Bài này đưa cho bạn thước đo ấy: hai câu hỏi, chấm 1 đến 3.",
      },
      {
        type: "feynman",
        title: "Chấm điểm việc đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn gửi đồ qua bưu điện. Nhân viên hỏi hai câu: trong hộp có gì, và nếu hỏng thì thiệt hại bao nhiêu. Thư thường thì bỏ hộp, hàng quý thì ký nhận và bảo hiểm. Chấm điểm việc dùng AI cũng hỏi đúng hai câu đó.",
        columns: ["Câu hỏi", "Gửi đồ qua bưu điện", "Việc dùng AI"],
        rows: [
          ["Bên trong có gì", "Thư thường hay đồ quý, đồ của người khác", "Dữ liệu đưa vào: công khai, nội bộ, cá nhân, hợp đồng"],
          ["Nếu hỏng thì sao", "Mất tờ thư hay mất cả lô hàng", "Sai một chữ trong nháp hay sai một số trong báo cáo gửi ngoài"],
          ["Cách xử lý", "Thư bỏ thẳng, hàng quý có người kiểm", "Việc thấp làm ngay, việc cao có người duyệt"],
        ],
        oneLiner: "Chấm điểm việc là hỏi hai câu: bên trong có gì, và nếu sai thì mất gì.",
      },
      { type: "heading", text: "Trục một: bạn đưa gì vào ô chat" },
      {
        type: "paragraph",
        text: "Điểm 1 là thông tin công khai hoặc thứ bạn tự viết ra, chưa có tên ai. Điểm 2 là thông tin nội bộ của công ty nhưng không gắn với một cá nhân cụ thể. Điểm 3 là thông tin cá nhân hoặc bí mật: tên khách kèm số tiền, bảng lương, hợp đồng, số liệu chưa công bố. Quy tắc chung: ô chat là một nơi bên ngoài máy của bạn, nên điểm 3 chỉ đi qua công cụ công ty đã duyệt.",
      },
      { type: "heading", text: "Trục hai: nếu kết quả sai thì sao" },
      {
        type: "paragraph",
        text: "Điểm 1: sai thì bạn thấy ngay và sửa, như tiêu đề bài đăng hay lời chào. Điểm 2: sai thì mất thời gian làm lại hoặc làm phiền đồng nghiệp. Điểm 3: sai mà đã gửi đi thì khó rút lại, như số tiền gửi khách, thông báo cho toàn công ty, hay tài liệu gửi cơ quan quản lý. Trục này nhìn về phía sau: ai sẽ đọc kết quả, và họ sẽ làm gì với nó.",
      },
      {
        type: "flow",
        title: "Từ một việc đến cách làm",
        steps: [
          { label: "Gọi tên việc", detail: "Ghi một câu cụ thể, ví dụ: soạn thư nhắc khách trả tiền tháng này, không ghi chung chung là chăm sóc khách." },
          { label: "Chấm dữ liệu đưa vào", detail: "Hỏi: tôi định dán gì vào ô chat. Có tên, tiền, hợp đồng, lương thì điểm 3." },
          { label: "Chấm hậu quả nếu sai", detail: "Hỏi: kết quả đi tới ai, và nếu sai họ mất gì. Đi ra ngoài công ty hoặc liên quan tiền thì thường điểm 3." },
          { label: "Lấy điểm cao hơn", detail: "Một trục cao là đủ để việc phải cẩn thận. Không lấy trung bình, vì trung bình làm trục nguy hiểm bị pha loãng." },
          { label: "Gắn cách kiểm", detail: "Mức 1: làm ngay. Mức 2: bạn tự đọc kỹ. Mức 3: người thứ hai duyệt, và dùng công cụ đã duyệt." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mức 1-2: làm ngay, tự đọc lại",
          text: "Viết nháp lời nhắc họp, đổi định dạng biên bản không có tên, gợi ý tiêu đề, động não ý tưởng. Đưa vào là thông tin công khai hoặc tự viết, sai thì bạn sửa được ngay.",
        },
        right: {
          label: "Mức 3: có người duyệt",
          text: "Thư gửi khách có tên và số tiền, thông báo cho cả công ty, tài liệu gửi cơ quan quản lý, phân tích hồ sơ nhân sự. Đưa vào là dữ liệu cá nhân hoặc bí mật, hoặc sai thì khó rút lại.",
        },
      },
      {
        type: "callout",
        label: "Dễ nhầm",
        text: "Dữ liệu công khai chưa chắc là việc an toàn. Bản tóm tắt chỉ dùng số liệu công khai nhưng gửi lên cơ quan quản lý vẫn là mức 3, vì trục hậu quả cao. Và ngược lại: việc dữ liệu nhạy cảm mà kết quả chỉ để bạn đọc một mình vẫn cần công cụ đã duyệt.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp chấm điểm danh sách việc",
        task: "Bạn là trưởng nhóm hành chính. Bạn có tên 10 việc lặp lại của nhóm (chỉ tên việc, không có dữ liệu thật). Lắp một prompt nhờ AI chấm điểm và xếp vào bảng hai trục.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              b("Giúp tôi xem việc nào dùng AI được.", "AI không biết việc nào, dữ liệu nào, nên trả về lời khuyên chung mà phòng bạn không dùng được."),
              g("Tôi quản lý nhóm hành chính 8 người. Đây là tên 10 việc lặp lại của nhóm: nhắc họp, biên bản, nhắc công nợ, thông báo nghỉ lễ... (chỉ tên việc, không có dữ liệu thật).", "Có người, việc và ranh giới dữ liệu, và bạn không đưa dữ liệu thật vào. AI chấm dựa trên tên việc, đủ để bạn xem lại."),
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              g("Với mỗi việc, cho điểm 1-3 cho dữ liệu đưa vào và điểm 1-3 cho hậu quả nếu sai, kèm một câu lý do.", "Hai trục, thang cố định, có lý do: bạn dò được AI chấm có hợp lý không, và chỉnh lại nếu không đồng ý."),
              b("Cho tôi biết việc nào nguy hiểm.", "Không có thang, không có tiêu chí. AI sẽ kể một danh sách chung chung và không chấm được từng việc."),
            ],
          },
          {
            id: "format",
            label: "Định dạng và giới hạn",
            options: [
              b("Trình bày cho đẹp.", "Đẹp không phải yêu cầu đo được, và AI có thể viết thành đoạn văn dài khó đối chiếu."),
              g("Xuất thành bảng 5 cột: việc, điểm dữ liệu, điểm hậu quả, mức, lý do. Chỗ nào không chắc thì ghi \"cần hỏi\", không đoán.", "Bảng cố định cột và cho phép nói không biết. AI ít bịa, còn bạn có bảng để sửa trước khi nộp trưởng phòng."),
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Việc | Dữ liệu | Hậu quả | Mức | Lý do |\n| Nhắc họp | 1 | 1 | 1 | Chỉ giờ và phòng, sai thì nhắn lại |\n| Biên bản họp | 2 | 2 | 2 | Nội bộ, sai thì phải sửa và gửi lại |\n| Nhắc công nợ | 3 | 3 | 3 | Có tên khách và tiền, gửi sai mất uy tín |\n| Thông báo nghỉ lễ | 1 | 2 | 2 | Gửi cả công ty, sai lịch gây nhầm cho nhiều người |\n| Hồ sơ nhân sự | cần hỏi | cần hỏi | cần hỏi | Chưa rõ hồ sơ gồm gì, cần bạn cho biết |",
          },
          {
            requires: ["context"],
            text: "Các việc này đều có thể dùng AI, việc nào cũng nên cẩn thận với dữ liệu nhạy cảm và người đọc lại trước khi gửi...\n\n(Có bối cảnh nhưng không có thang chấm và cột cố định, nên AI chỉ nhắc chung chung, bạn chưa có bảng nào để dùng.)",
          },
          {
            text: "Chúng tôi khuyến nghị dùng AI cho mọi việc, vì 95% công ty đã dùng và không có sự cố nào đáng kể...\n\n(Không biết việc nào, AI nói chung chung và còn tự bịa số liệu 95% để nghe có sức nặng.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Một việc bạn định giao AI sáng nay",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần soạn bản nhắc công nợ cho 12 khách, mỗi thư có tên khách và số tiền nợ. Công ty có một công cụ AI đã duyệt và một ứng dụng AI miễn phí bạn tự tải.",
            choices: [
              { label: "Dán cả danh sách khách và số nợ vào ứng dụng miễn phí cho nhanh", next: "bad" },
              { label: "Chấm điểm việc trước: dữ liệu 3, hậu quả 3, nên dùng công cụ đã duyệt", next: "s2" },
            ],
          },
          bad: {
            text: "Mười hai thư xong trong năm phút. Nhưng tên khách và số nợ đã đi ra một dịch vụ công ty không kiểm soát. Cuối tuần, phòng pháp chế hỏi vì sao dữ liệu công nợ nằm ngoài hệ thống.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ đã duyệt cho ra 12 thư. Thư số 7 ghi số nợ 48 triệu, trong khi sổ của bạn ghi 38 triệu.",
            choices: [
              { label: "Gửi luôn, vì 11 thư còn lại đều khớp", next: "bad2" },
              { label: "Đối chiếu từng thư với sổ, sửa thư số 7, rồi nhờ đồng nghiệp xem lại trước khi gửi", next: "good" },
            ],
          },
          bad2: {
            text: "Khách ở thư số 7 gọi điện phản đối số nợ, và cả đội mất một buổi chiều xử lý, xin lỗi, gửi lại.",
            ending: "bad",
          },
          good: {
            text: "Mười hai thư gửi đúng số. Mức 3 tốn thêm mười lăm phút duyệt, nhưng không có thư nào phải thu hồi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hai câu hỏi cho mỗi việc: đưa gì vào, sai thì mất gì.",
          "Bài sau: việc thấp làm ngay, việc cao có người duyệt, và ai nhìn trước khi gửi.",
        ],
      },
    ],
  },
  {
    id: 2686,
    slug: "viec-thap-rui-ro-cho-lam-ngay-viec-cao-can-nguoi-duyet",
    title: "Chặng 64, Bài 7: Việc rủi ro thấp làm ngay, việc cao cần người duyệt",
    subtitle: "Ba việc làm ngay, ba việc có người duyệt, và tên người nhìn kết quả trước khi đi ra ngoài.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🚦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng chấm điểm chỉ có ích khi mỗi mức đi kèm một hành động. Nếu việc thấp cũng bắt duyệt, cả phòng chán và bỏ qua quy trình. Nếu việc cao không ai duyệt, một lỗi nhỏ đi thẳng ra khách hàng. Bài này chốt hai nhóm và ghi rõ ai nhìn trước khi gửi.",
    openingQuestion:
      "Công ty yêu cầu mọi kết quả từ AI đều phải sếp duyệt trước khi dùng. Sau một tháng, điều gì dễ xảy ra nhất?",
    openingOptions: [
      "Sếp duyệt không xuể, và nhân viên lặng lẽ bỏ qua bước duyệt",
      "Chất lượng tăng đều, vì không còn lỗi nào lọt qua nữa",
      "Nhân viên ngừng dùng AI hoàn toàn và quay về cách làm cũ",
      "Sếp học được cách dùng AI nhanh hơn nhờ duyệt nhiều bài mỗi ngày",
    ],
    correctOption: 0,
    explanation:
      "Duyệt mọi thứ biến bước duyệt thành thủ tục: người duyệt bấm đồng ý mà không đọc, hoặc nhân viên lách qua để kịp việc. Khi đó việc thật sự rủi ro cũng không được nhìn kỹ. Chất lượng không tăng đều, vì kiểm tra dàn trải thì mỏng ở chỗ cần dày. Còn bỏ hẳn AI là phản ứng cực đoan, ít gặp hơn kiểu lách quy trình.",
    diagram: [
      { label: "Việc đã chấm mức", arrow: true },
      { label: "Mức thấp: làm ngay, tự đọc lại", arrow: true },
      { label: "Mức cao: người thứ hai duyệt", arrow: true },
      { label: "Ghi tên người duyệt", arrow: true },
      { label: "Kết quả đi ra ngoài" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm chăm sóc khách hàng",
      description:
        "Nhóm chăm sóc khách hàng 6 người chọn ba việc làm ngay: viết lại thư cho gọn, soạn câu trả lời mẫu, tóm tắt cuộc gọi nội bộ. Ba việc có người duyệt: thư hoàn tiền, thư trả lời khiếu nại, thông báo thay đổi chính sách. Mỗi việc nhóm cao có tên một người duyệt cố định, ghi trên bảng dán cạnh màn hình.",
    },
    quiz: [
      Q(
        "Nhóm nào sau đây hợp lý nhất để xếp vào việc làm ngay?",
        [
          "Viết lại email nội bộ cho gọn và đổi bảng thành gạch đầu dòng",
          "Soạn thư xác nhận hoàn tiền có số tiền cụ thể gửi cho từng khách",
          "Phân tích hồ sơ lương của ba nhân viên trong phòng",
          "Soạn thông báo thay đổi chính sách gửi toàn bộ khách",
        ],
        "Viết lại cho gọn và đổi định dạng là việc chữ nội bộ, sai thì bạn thấy ngay. Thư hoàn tiền chạm tiền, hồ sơ lương chạm dữ liệu cá nhân, còn thông báo chính sách đi ra toàn bộ khách và khó rút lại, nên cả ba đều cần người duyệt."
      ),
      Q(
        "Người duyệt một thư hoàn tiền nên là ai?",
        [
          "Một người thứ hai có quyền quyết định về tiền hoàn",
          "Chính người vừa nhờ AI soạn thư, đọc lại một lần nữa",
          "Một thực tập sinh mới, vì họ có nhiều thời gian đọc hơn",
          "Chính AI, bằng cách hỏi nó \"thư này đã đúng chưa\" rồi làm theo",
        ],
        "Người duyệt phải khác người soạn, và phải đủ thẩm quyền để biết số tiền đúng hay sai. Tự đọc lại thì mắt đã quen với lỗi. Thực tập sinh không có thẩm quyền về tiền hoàn. Hỏi lại chính AI thì nó thường khẳng định điều nó vừa viết, không phải là bước kiểm."
      ),
      Q(
        "Vì sao không nên bắt duyệt mọi việc dùng AI trong phòng?",
        [
          "Duyệt dàn trải làm người duyệt mệt và bỏ qua việc thật sự rủi ro",
          "Vì AI luôn đúng nên không cần ai duyệt việc nào cả",
          "Vì duyệt tốn tiền công ty hơn chi phí của mọi lỗi cộng lại",
          "Vì việc thấp rủi ro không thể sai, nên duyệt là thừa",
        ],
        "Sự chú ý của người duyệt là có hạn: dồn vào mọi việc thì mỏng đi ở chỗ cần nhất. AI không luôn đúng, và việc thấp vẫn có thể sai, chỉ là sai thì rẻ và dễ sửa. Duyệt nhiều không tự nó đắt hơn lỗi, điểm mấu chốt là đặt đúng chỗ."
      ),
      Q(
        "Một nhóm có 40 việc mỗi tuần, mỗi việc cao phải duyệt 10 phút. Nếu có 6 việc mức cao thì cần duyệt bao nhiêu phút mỗi tuần?",
        [
          "60 phút (= 6 việc × 10 phút)",
          "400 phút (= 40 việc × 10 phút, duyệt cả những việc thấp)",
          "240 phút (= 40 việc × 6 phút, lấy nhầm cho mọi việc)",
          "16 phút (= 10 phút + 6 phút, cộng thay vì nhân)",
        ],
        "Chỉ những việc mức cao mới cần duyệt, nên 6 × 10 = 60 phút. Con số 400 phút là trường hợp phải duyệt tất cả 40 việc, đúng là chi phí của quy định duyệt tràn lan. Hai đáp án còn lại là nhân hoặc cộng nhầm các con số."
      ),
      Q(
        "Ghi tên người duyệt cạnh mỗi việc mức cao để làm gì?",
        [
          "Để không ai nghĩ người khác sẽ kiểm, rồi cả hai đều bỏ qua",
          "Để biết ai sẽ bị phạt khi có lỗi xảy ra trong tháng",
          "Để AI tự biết gửi kết quả cho ai duyệt thay bạn",
          "Để sau này sếp chia đều số việc duyệt cho mọi người trong nhóm mỗi tuần",
        ],
        "Khi không ai có tên, ai cũng nghĩ có người khác kiểm và không ai kiểm. Tên người duyệt giữ trách nhiệm rõ ràng, không nhằm phạt. AI không tự chuyển việc đi duyệt, và mục đích cũng không phải chia đều việc, mà là bảo đảm có một người chịu trách nhiệm xem."
      ),
    ],
    keyTakeaways: [
      "Việc mức thấp: làm ngay, tự đọc lại một lượt.",
      "Việc mức cao: một người thứ hai, có thẩm quyền, xem trước khi đi ra ngoài.",
      "Duyệt mọi thứ làm bước duyệt thành thủ tục và bị lách.",
      "Mỗi việc mức cao có tên người duyệt cố định.",
      "Người duyệt khác người soạn, và không phải chính AI.",
    ],
    practicePrompt: {
      question:
        "Anh Nam muốn nhờ AI viết lại thông báo họp cho gọn, và nhờ AI soạn thư trả lời khiếu nại có số tiền hoàn. Anh nên làm gì?",
      options: [
        "Làm ngay việc thông báo họp; thư khiếu nại có người thứ hai duyệt",
        "Cả hai việc đều làm ngay, vì AI viết nhanh và hay hơn tay",
        "Cả hai việc đều nhờ sếp duyệt trước khi gửi, để an toàn tuyệt đối mọi bề",
        "Thông báo họp nhờ sếp duyệt; thư khiếu nại tự gửi vì gấp",
      ],
      correct: 0,
      explanation:
        "Thông báo họp là việc thấp, sai thì nhắn lại. Thư khiếu nại có số tiền hoàn là việc cao, cần người thứ hai xem trước khi gửi. Làm cả hai ngay bỏ qua rủi ro tiền, duyệt cả hai làm chậm việc thấp, còn đảo ngược hai việc thì đúng là cách nhét lỗi ra ngoài.",
    },
    summary: {
      keyIdea: "Mỗi mức đi kèm một hành động: thấp thì làm ngay, cao thì có người thứ hai duyệt và có tên người đó.",
      formula: "Thời gian duyệt = số việc mức cao × phút duyệt mỗi việc.",
      commonMistake: "Bắt duyệt mọi thứ: người duyệt mệt, bước duyệt thành thủ tục, việc rủi ro thật bị bỏ qua.",
      action: "Chọn ba việc làm ngay và ba việc cần duyệt của bạn, ghi tên người duyệt cạnh ba việc sau.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Từ bảng 10 việc hôm qua, chọn 3 việc mức thấp sẽ làm ngay và 3 việc mức cao cần duyệt. Với mỗi việc mức cao, ghi tên một người cụ thể sẽ xem kết quả trước khi đi ra ngoài, rồi nhắn cho người đó một tin báo trước.",
      secondary: "Ngày mai bạn sẽ được hỏi: người bạn chọn duyệt là ai, và họ có thực sự đủ thẩm quyền với việc đó không?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã chấm điểm mười việc. Bây giờ mỗi mức cần một hành động. Bài này chia hai nhóm: làm ngay và có người duyệt, đồng thời ghi tên người nhìn kết quả trước khi nó ra khỏi phòng.",
      },
      {
        type: "feynman",
        title: "Làm ngay hay cần duyệt đơn giản hơn bạn nghĩ",
        intro: "Trong một toà nhà văn phòng, thư thường bỏ thẳng vào hộp thư, còn bưu phẩm giá trị thì phải có người ký nhận. Không ai bắt ký nhận cho từng tờ quảng cáo, vì chính điều đó làm người ta bỏ qua việc ký nhận hàng quan trọng.",
        columns: ["Điểm", "Thư trong toà nhà", "Việc dùng AI"],
        rows: [
          ["Loại nhẹ", "Thư thường bỏ thẳng hộp", "Việc mức thấp: làm ngay, tự đọc lại"],
          ["Loại nặng", "Bưu phẩm giá trị cần ký nhận", "Việc mức cao: người thứ hai duyệt"],
          ["Điều cần tránh", "Bắt ký nhận mọi tờ thư", "Bắt duyệt mọi việc, để bước duyệt thành thủ tục"],
        ],
        oneLiner: "Thư thường bỏ thẳng, hàng quý có người ký: việc thấp làm ngay, việc cao có người duyệt.",
      },
      { type: "heading", text: "Nhóm làm ngay: ba việc bạn tự đọc lại" },
      {
        type: "paragraph",
        text: "Nhóm này gồm những việc mà đưa vào không chứa dữ liệu nhạy cảm và sai thì bạn thấy ngay: viết lại email nội bộ cho gọn, gợi ý tiêu đề, đổi định dạng ghi chú họp. Cách kiểm chỉ là bạn đọc lại một lượt trước khi gửi. Chọn ba việc như vậy và cứ thế làm mỗi ngày.",
      },
      { type: "heading", text: "Nhóm có người duyệt: ba việc người thứ hai nhìn" },
      {
        type: "paragraph",
        text: "Nhóm này gồm thư có số tiền, thông báo gửi nhiều người, tài liệu gửi cơ quan quản lý. Người duyệt là người thứ hai, có thẩm quyền với nội dung đó, và không phải chính AI. Họ không cần đọc lại từ đầu: bạn đưa cho họ kết quả cùng nguồn của từng con số, để họ đối chiếu trong vài phút.",
      },
      {
        type: "flow",
        title: "Đường đi của một việc mức cao",
        steps: [
          { label: "Bạn giao việc cho AI", detail: "Dùng công cụ đã duyệt, đưa vào đúng phần dữ liệu cần thiết, không đưa cả hồ sơ." },
          { label: "Bạn tự đọc và đối chiếu số", detail: "Mở nguồn gốc cho từng con số và tên người trong kết quả. Đây là bước của bạn, không chuyển cho người duyệt." },
          { label: "Gửi người duyệt kèm nguồn", detail: "Đưa người duyệt bản nháp và nguồn, để họ kiểm trong vài phút thay vì đọc từ đầu." },
          { label: "Người duyệt xác nhận", detail: "Họ ghi lại là đã xem, hoặc gửi trả với chỗ cần sửa. Không có xác nhận thì việc chưa đi ra ngoài." },
          { label: "Kết quả đi ra ngoài", detail: "Chỉ khi có xác nhận, thư mới được gửi, thông báo mới được đăng." },
        ],
      },
      {
        type: "list",
        items: [
          "Mỗi việc mức cao có một tên người duyệt cố định, không ghi \"phòng\" hay \"ai đó\".",
          "Người duyệt khác người soạn, và có thẩm quyền với chính nội dung đó.",
          "Người soạn đưa nguồn của từng con số để người duyệt kiểm nhanh.",
          "Có người vắng thì có người thay, ghi sẵn trên cùng bảng.",
        ],
      },
      {
        type: "callout",
        label: "Ba người, không ai kiểm",
        text: "Nhóm ba người cùng nhìn một thư và ai cũng nghĩ hai người kia đã kiểm. Đó là lý do phải ghi một cái tên: một người chịu trách nhiệm xem thì chắc chắn có người xem.",
      },
      {
        type: "scenario",
        title: "Thư hoàn tiền lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách khiếu nại lỗi giao hàng, bạn cần gửi thư xác nhận hoàn 2 triệu đồng trước 5 giờ. Công cụ AI đã duyệt viết xong nháp. Chị Mai là người duyệt các khoản hoàn của nhóm, đang trong phòng.",
            choices: [
              { label: "Gửi ngay cho kịp 5 giờ, vì nháp đọc rất ổn", next: "bad_send" },
              { label: "Đối chiếu số tiền với phiếu khiếu nại, rồi gửi chị Mai kèm phiếu", next: "s2" },
            ],
          },
          bad_send: {
            text: "Nháp ghi hoàn 20 triệu thay vì 2 triệu. Khách vui, còn kế toán phải xử lý thu hồi khoản chênh lệch suốt tuần sau.",
            ending: "bad",
          },
          s2: {
            text: "Chị Mai nói đang họp, hai mươi phút nữa mới xem được. Còn 40 phút đến 5 giờ.",
            choices: [
              { label: "Nhờ người thay chị Mai đã ghi trên bảng duyệt", next: "good" },
              { label: "Gửi luôn rồi báo chị Mai sau, vì đã tự đối chiếu số", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Số tiền đúng, nhưng thư lại hứa thêm điều kiện bảo hành mà chính sách không có. Chị Mai mới thấy khi khách trích dẫn lại. Đã gửi ra thì phải xin lỗi.",
            ending: "bad",
          },
          good: {
            text: "Người thay duyệt trong mười phút, sửa một câu hứa bảo hành thừa, và thư gửi lúc 4 giờ 40. Bảng duyệt có sẵn tên người thay nên không ai phải chờ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Thư thường bỏ thẳng hộp, hàng quý có người ký: làm ngay và có người duyệt.",
          "Bài sau: vì sao AI viết sai mà nghe rất chắc chắn, và tìm chỗ phải kiểm.",
        ],
      },
    ],
  },
  {
    id: 2687,
    slug: "ai-viet-sai-nhung-nghe-rat-chac-chan-dieu-phong-can-biet",
    title: "Chặng 64, Bài 8: AI viết sai nhưng nghe rất chắc chắn: điều cả phòng cần biết",
    subtitle: "Giọng tự tin không phải bằng chứng. Tập tìm đúng chỗ phải kiểm trong một bản tóm tắt trôi chảy.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người đọc thường tin những gì được viết rành mạch. AI viết rất rành mạch, kể cả khi nó tự thêm một con số hay đảo ngược một kết luận. Nếu cả phòng không biết điều này, lỗi lọt qua vì câu văn nghe hợp lý, không vì ai cẩu thả.",
    openingQuestion:
      "Bản tóm tắt AI viết dài một trang, không có lỗi chính tả, câu nào cũng trơn tru. Cách nào đúng nhất để biết có chỗ sai hay không?",
    openingOptions: [
      "Đối chiếu số, tên, ngày và kết luận với tài liệu gốc",
      "Đọc lại cả trang xem có câu nào nghe gượng không",
      "Hỏi lại AI \"bạn có chắc chắn không\" rồi xem nó trả lời thế nào",
      "Xem độ dài bản tóm tắt, bản càng dài càng ít sai",
    ],
    correctOption: 0,
    explanation:
      "Đối chiếu với nguồn gốc là cách duy nhất biết một con số hay tên người có trong tài liệu hay không. Đọc xem câu nào gượng không hiệu quả vì phần bịa thường nghe trơn tru như phần đúng. Hỏi AI chắc chắn không thì nó thường đáp là chắc, vì đó là câu trả lời hợp lý nhất để viết tiếp. Độ dài không liên quan đến độ đúng.",
    diagram: [
      { label: "AI viết bản tóm tắt trôi chảy", arrow: true },
      { label: "Bạn gạch chân số, tên, ngày, kết luận", arrow: true },
      { label: "Đối chiếu từng mục với tài liệu gốc", arrow: true },
      { label: "Mục không có trong nguồn: xoá hoặc hỏi lại", arrow: true },
      { label: "Bản đã kiểm mới được gửi đi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: bản tóm tắt cuộc họp",
      description:
        "Một nhân viên nhờ AI tóm tắt biên bản họp giao ban. Bản tóm tắt có câu: \"Ngân sách quảng cáo quý 4 đã duyệt 350 triệu\". Biên bản gốc chỉ ghi ngân sách chưa chốt. Câu được viết rất tự nhiên, không ai thấy gượng. Lỗi chỉ lộ ra khi phòng tài chính hỏi con số đó lấy từ đâu.",
    },
    quiz: [
      Q(
        "Vì sao AI có thể viết sai mà vẫn nghe rất chắc chắn?",
        [
          "Nó sinh chữ nghe hợp lý, không kiểm tra từng ý với sự thật",
          "Nó cố ý nói dối để người dùng tin và dùng nhiều hơn",
          "Nó chỉ sai khi người dùng hỏi bằng câu không lịch sự",
          "Nó cần thêm vài phút để suy nghĩ rồi mới sửa được lỗi của mình",
        ],
        "AI sinh chữ tiếp theo hợp lý nhất, nên câu sai vẫn trôi chảy như câu đúng. Không có ý định nói dối, vì nó không biết nó đang bịa. Độ lịch sự của câu hỏi không quyết định sự đúng sai, và nó cũng không tự rà lại sau khi viết nếu bạn không yêu cầu."
      ),
      Q(
        "Trong bản tóm tắt, loại chi tiết nào đáng kiểm đầu tiên?",
        [
          "Con số, tên người, ngày tháng và kết luận chính",
          "Câu mở đầu và câu kết luận, vì dễ thấy nhất",
          "Những câu dài, vì AI hay viết dài khi bịa",
          "Những câu có từ chuyên ngành, vì AI hay dùng sai thuật ngữ",
        ],
        "Số, tên, ngày và kết luận là những thứ có thể đối chiếu trực tiếp với nguồn và gây hậu quả nhất nếu sai. Câu đầu và câu cuối không chắc chứa dữ kiện. Độ dài câu và thuật ngữ không cho biết phần nào bịa, nên không phải cách chọn chỗ kiểm."
      ),
      Q(
        "Bạn hỏi AI \"bạn có chắc chắn về các con số này không\" và nó đáp \"Chắc chắn\". Nên hiểu thế nào?",
        [
          "Không thay cho việc kiểm: nó chỉ viết câu trả lời hợp lý",
          "Các con số đã được xác nhận và có thể dùng ngay lập tức",
          "AI đã tra lại nguồn gốc, nên lần này đáng tin hơn hẳn",
          "Các con số đúng ít nhất 90% vì nó trả lời chắc chắn",
        ],
        "Lời \"chắc chắn\" là chữ nghe hợp lý như mọi chữ khác, không phải kết quả một lần kiểm. Nó cũng không tra lại nguồn nếu không có công cụ tìm kiếm, và không có tỷ lệ 90% nào gắn với câu đó. Chỉ có đối chiếu với tài liệu gốc mới xác nhận được."
      ),
      Q(
        "Đối chiếu một bản tóm tắt 10 số mất khoảng 30 giây mỗi số, bạn tốn bao lâu?",
        [
          "5 phút (= 10 số × 30 giây = 300 giây)",
          "3 phút (= 10 số × 30 giây ÷ 100, nhầm đơn vị)",
          "30 giây (= chỉ kiểm một số đại diện cho cả bản)",
          "40 phút (= 10 số × 4 phút, nhân nhầm mỗi số)",
        ],
        "10 số × 30 giây = 300 giây, tức 5 phút. Con số này cho thấy kiểm không tốn nhiều so với cái giá của một số sai bị gửi đi. Kiểm một số đại diện không được vì AI có thể sai ở số khác, và hai đáp án còn lại là nhân chia nhầm đơn vị."
      ),
      Q(
        "Tìm thấy một số AI tự thêm vào, không có trong nguồn. Bước tiếp theo hợp lý là gì?",
        [
          "Xoá số đó hoặc hỏi lại nguồn, rồi kiểm cả các số còn lại",
          "Sửa số đó cho khớp và coi như các số khác đều đúng",
          "Bỏ hẳn bản tóm tắt và không bao giờ dùng AI nữa",
          "Gửi đi kèm ghi chú nhỏ rằng số đó có thể chưa chính xác",
        ],
        "Khi có một chỗ bịa, xác suất còn chỗ khác là đáng kể, nên phải kiểm tiếp phần còn lại. Chỉ sửa một số rồi tin phần còn lại là chủ quan. Bỏ hẳn AI là phản ứng quá tay. Gửi kèm ghi chú chưa chính xác là đẩy việc kiểm cho người nhận."
      ),
    ],
    keyTakeaways: [
      "Giọng tự tin và câu văn trơn tru không phải bằng chứng của sự đúng.",
      "Gạch chân số, tên, ngày và kết luận, rồi đối chiếu từng mục với nguồn.",
      "Hỏi lại AI có chắc không không phải là cách kiểm.",
      "Một chỗ bịa cho thấy có thể còn chỗ khác: kiểm hết phần còn lại.",
      "Kiểm mười số mất vài phút, rẻ hơn nhiều một số sai đã gửi đi.",
    ],
    practicePrompt: {
      question:
        "AI tóm tắt biên bản có câu \"Đội thống nhất tăng ngân sách 20%\". Biên bản gốc chỉ ghi \"sẽ bàn việc tăng ngân sách\". Đây là loại lỗi nào?",
      options: [
        "Kết luận bị đẩy quá xa: từ sẽ bàn thành đã thống nhất, cộng thêm số 20%",
        "Lỗi chính tả, vì AI gõ sai một chữ trong câu tóm tắt",
        "Không phải lỗi, vì tóm tắt luôn được phép diễn đạt lại",
        "Lỗi dịch thuật, vì AI đọc nhầm tiếng Việt ở biên bản",
      ],
      correct: 0,
      explanation:
        "AI biến một ý chưa chốt thành một quyết định và thêm con số không có trong nguồn. Đó là dạng lỗi tự tin nhất, vì câu nghe như một tóm tắt bình thường. Diễn đạt lại chỉ đúng khi giữ nguyên ý, và ở đây ý đã bị đổi. Đây cũng không phải lỗi chính tả hay dịch thuật.",
    },
    summary: {
      keyIdea: "AI viết trôi chảy cả khi sai, nên giọng tự tin không phải bằng chứng. Bằng chứng là nguồn.",
      formula: "Thời gian kiểm = số mục cần kiểm × thời gian mỗi mục (10 số × 30 giây = 5 phút).",
      commonMistake: "Đọc xem câu có gượng không, hoặc hỏi AI có chắc không, thay vì đối chiếu nguồn.",
      action: "Lần tới AI tóm tắt cho bạn, gạch chân mọi số, tên, ngày rồi đối chiếu từng cái.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biên bản hoặc báo cáo 1-2 trang của bạn, nhờ công cụ AI đã duyệt tóm tắt. Gạch chân mọi con số, tên và ngày trong bản tóm tắt, rồi đối chiếu từng cái với bản gốc và ghi lại: bao nhiêu mục khớp, bao nhiêu mục lạ.",
      secondary: "Ngày mai bạn sẽ được hỏi: bạn tìm thấy mấy chỗ AI tự thêm, và đó là loại chi tiết gì (số, ngày hay kết luận)?",
    },
    sections: [
      {
        type: "lead",
        text: "Bản tóm tắt dài một trang, không lỗi chính tả, câu nào cũng trôi. Và có một dòng sai. Bài này giúp bạn biết tìm chỗ nào trước, vì cả phòng sẽ gặp đúng tình huống này nhiều lần.",
      },
      {
        type: "feynman",
        title: "AI viết sai mà vẫn chắc giọng: đơn giản hơn bạn nghĩ",
        intro: "Hình dung một nhân viên bán hàng nói rất trôi chảy. Bạn hỏi một thông số mà anh ta không nhớ, anh ta vẫn trả lời ngay, giọng chắc nịch. Giọng chắc nịch tới từ thói quen nói trôi, không từ việc anh ta đã kiểm. AI cũng vậy.",
        columns: ["Điểm", "Nhân viên bán hàng nói trôi", "AI tạo sinh"],
        rows: [
          ["Giọng nói", "Chắc chắn, không ngập ngừng", "Câu trơn tru, không lỗi chính tả"],
          ["Khi không biết", "Vẫn trả lời cho trôi chuyện", "Sinh chữ nghe hợp lý, kể cả số và tên bịa"],
          ["Cách kiểm", "Xem phiếu thông số gốc", "Đối chiếu với tài liệu gốc"],
        ],
        oneLiner: "Giọng chắc không phải bằng chứng: muốn biết đúng hay sai thì phải mở tài liệu gốc.",
      },
      { type: "heading", text: "Ba loại lỗi hay lẫn trong câu văn trơn tru" },
      {
        type: "paragraph",
        text: "Loại một: chi tiết bịa, như số, ngày, tên người không có trong nguồn. Loại hai: kết luận bị đẩy quá xa, như \"sẽ bàn\" thành \"đã thống nhất\". Loại ba: lẫn nguồn, như gán ý của người này cho người kia. Cả ba đều đọc lên nghe bình thường, nên không thể dựa vào cảm giác.",
      },
      {
        type: "flow",
        title: "Đi tìm chỗ phải kiểm trong 4 bước",
        steps: [
          { label: "Gạch chân mọi con số", detail: "Số tiền, phần trăm, số lượng, thứ hạng. Con số là thứ dễ bịa nhất và hậu quả nhất." },
          { label: "Gạch chân tên và ngày", detail: "Tên người, tên công ty, tên tài liệu, ngày tháng, thứ trong tuần. Tên sai thì mất uy tín, ngày sai thì hỏng lịch." },
          { label: "Đánh dấu câu kết luận", detail: "Những câu nói đã quyết, đã duyệt, sẽ làm. So xem biên bản gốc có dùng cùng mức chắc chắn không." },
          { label: "Đối chiếu từng dấu với nguồn", detail: "Mỗi mục phải tìm được trong tài liệu gốc. Không tìm thấy thì xoá, hoặc hỏi lại người họp." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Cách kiểm hiệu quả",
          text: "Mở tài liệu gốc cạnh bản tóm tắt. Đối chiếu từng số, tên, ngày. So mức chắc chắn của kết luận. Xoá mọi thứ không có trong nguồn.",
        },
        right: {
          label: "Cách kiểm không hiệu quả",
          text: "Đọc xem câu có gượng không. Hỏi lại AI có chắc không. Nhìn độ dài bản tóm tắt. Tin vì bản tóm tắt \"nghe đúng giọng\" của sếp.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt buổi họp với nhà cung cấp",
        task: "Biên bản gốc chỉ ghi: nhà cung cấp đề xuất giao hàng trong khoảng 2 tuần, giá chưa báo, công ty sẽ xem xét thêm, anh Bình phụ trách liên hệ lại. Đánh dấu những đoạn AI tự thêm hoặc đảo ý.",
        segments: [
          { text: "Buổi họp với nhà cung cấp bàn về thời gian giao hàng." },
          {
            text: "Nhà cung cấp cam kết giao trong đúng 14 ngày.",
            error: "Biên bản chỉ ghi \"đề xuất khoảng 2 tuần\". AI đổi đề xuất thành cam kết và khoảng thành đúng 14 ngày.",
          },
          { text: "Anh Bình phụ trách liên hệ lại với nhà cung cấp." },
          {
            text: "Giá đã chốt ở mức 85 triệu đồng cho cả lô.",
            error: "Biên bản ghi giá chưa báo. AI bịa luôn số 85 triệu.",
          },
          {
            text: "Công ty đã đồng ý ký hợp đồng trong tuần này.",
            error: "Biên bản chỉ ghi công ty sẽ xem xét thêm. AI biến xem xét thành đồng ý ký.",
          },
          { text: "Công ty sẽ xem xét thêm trước khi quyết định." },
        ],
      },
      {
        type: "callout",
        label: "Kiểm phần nào trước",
        text: "Khi chỉ có năm phút, kiểm số tiền, ngày và những câu nói \"đã quyết\". Đây là ba nơi một lỗi gây hậu quả lớn nhất, và cũng là ba nơi AI hay làm đẹp câu văn nhất.",
      },
      {
        type: "scenario",
        title: "Bản tóm tắt gửi sếp sau cuộc họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ công cụ AI đã duyệt tóm tắt biên bản họp. Bản tóm tắt có câu \"Hạn nộp báo cáo là 17/10\". Bạn nhớ biên bản chỉ ghi \"thứ Sáu tuần này\".",
            choices: [
              { label: "Giữ nguyên, vì 17/10 nghe rất đúng là một ngày thứ Sáu", next: "bad" },
              { label: "Mở biên bản gốc và lịch, kiểm ngày, rồi sửa theo đúng nguồn", next: "s2" },
            ],
          },
          bad: {
            text: "Ngày thứ Sáu tuần này thực ra là 10/10. Hạn bị ghi sai một tuần, và nhóm báo cáo nộp trễ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy thứ Sáu tuần này là 10/10 và sửa. Còn một câu: \"Ngân sách đã được duyệt\", trong khi biên bản ghi \"chưa chốt\".",
            choices: [
              { label: "Sửa thành chưa chốt, đối chiếu tiếp các số còn lại, rồi gửi sếp", next: "good" },
              { label: "Giữ câu đó, vì sếp chắc cũng đoán là sẽ duyệt", next: "bad2" },
            ],
          },
          bad2: {
            text: "Phòng marketing đọc bản tóm tắt và bắt đầu đặt chi phí. Khi ngân sách không được duyệt, họ phải huỷ các khoản đã đặt.",
            ending: "bad",
          },
          good: {
            text: "Bản tóm tắt gửi sếp có hạn 10/10, ngân sách ghi chưa chốt, và mỗi số đã đối chiếu. Mất thêm năm phút nhưng không ai phải sửa lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giọng chắc không phải bằng chứng: bằng chứng nằm ở tài liệu gốc.",
          "Bài sau: nhân ba con số để biết việc nào đáng kiểm kỹ.",
        ],
      },
    ],
  },
  {
    id: 2688,
    slug: "chi-phi-cua-mot-loi-sai-duoc-gui-di-mot-viec-ba-so-nhan",
    title: "Chặng 64, Bài 9: Chi phí một lỗi được gửi đi: ba con số nhân với nhau",
    subtitle: "Số lần dùng, tỷ lệ lỗi lọt, thiệt hại mỗi lỗi: nhân ba số để biết việc nào đáng kiểm.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Không thể kiểm kỹ mọi thứ vì không đủ thời gian, và cũng không thể kiểm qua loa mọi thứ. Muốn biết việc nào đáng kiểm kỹ, bạn cần một phép tính đơn giản. Chỉ có ba số, và bạn ước lượng được trong năm phút, không cần số chính xác.",
    openingQuestion:
      "Hai việc: A chạy 1.000 lần mỗi tháng, mỗi lỗi thiệt hại rất nhỏ. B chạy 20 lần mỗi tháng, mỗi lỗi thiệt hại rất lớn. Việc nào đáng kiểm kỹ hơn?",
    openingOptions: [
      "Chưa biết: phải nhân số lần, tỷ lệ lỗi lọt và thiệt hại mỗi lỗi",
      "Việc A, vì chạy nhiều lần thì chắc chắn lỗi nhiều hơn",
      "Việc B, vì thiệt hại một lỗi lớn hơn thiệt hại của A nên B rủi ro hơn",
      "Cả hai như nhau, vì AI sai ở mọi việc với tỷ lệ bằng nhau",
    ],
    correctOption: 0,
    explanation:
      "Chỉ một trong ba số không đủ: A có nhiều lần nhưng mỗi lần rẻ, B ít lần nhưng mỗi lần đắt, và tỷ lệ lỗi lọt qua có thể khác nhau ở hai việc. Phải nhân cả ba để so sánh được. Nghĩ rằng chạy nhiều thì lỗi nhiều, hay thiệt hại lớn thì đáng lo hơn, đều chỉ nhìn một nửa. Và AI không sai đều ở mọi việc, tỷ lệ phụ thuộc vào việc và cách kiểm.",
    diagram: [
      { label: "Số lần dùng mỗi tháng", arrow: true },
      { label: "Nhân tỷ lệ lỗi lọt qua bước kiểm", arrow: true },
      { label: "Nhân thiệt hại mỗi lỗi", arrow: true },
      { label: "Thiệt hại dự kiến mỗi tháng", arrow: true },
      { label: "Dồn sức kiểm vào việc có số lớn nhất" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm kế toán công nợ",
      description:
        "Một nhóm dùng AI soạn thư nhắc nợ 200 lần mỗi tháng. Họ ước lượng khoảng 5% thư lọt qua bước kiểm với một lỗi nhỏ, thiệt hại khoảng 400 nghìn đồng mỗi lỗi (số liệu minh hoạ). Nhân lên ra 4 triệu đồng mỗi tháng. Khi thêm một người duyệt chặn phần lớn lỗi, con số giảm xuống còn một phần nhỏ, rẻ hơn công duyệt.",
    },
    quiz: [
      Q(
        "Mỗi tháng dùng AI 200 lần, tỷ lệ lỗi lọt qua 5%, thiệt hại 400 nghìn đồng mỗi lỗi. Thiệt hại dự kiến mỗi tháng là bao nhiêu?",
        [
          "4 triệu đồng (= 200 × 0,05 × 400 nghìn)",
          "40 triệu đồng (= 200 × 0,5 × 400 nghìn, nhầm 5% thành 0,5)",
          "80 triệu đồng (= 200 × 400 nghìn, quên nhân tỷ lệ lỗi lọt)",
          "410 nghìn đồng (= 10 lỗi + 400 nghìn, cộng thay vì nhân)",
        ],
        "200 × 5% = 10 lỗi lọt, mỗi lỗi 400 nghìn nên 4 triệu. Số 40 triệu do đổi 5% thành 0,5, số 80 triệu do quên tỷ lệ lỗi nên coi mọi lần đều sai, còn 410 nghìn do cộng 10 lỗi với 400 nghìn thay vì nhân."
      ),
      Q(
        "Một người duyệt chặn 90% lỗi trong ví dụ trên (4 triệu đồng/tháng). Thiệt hại dự kiến còn bao nhiêu?",
        [
          "0,4 triệu đồng (= 4 triệu × 10% lỗi còn lọt qua)",
          "3,6 triệu đồng (= 4 triệu × 90%, lấy phần bị chặn thay vì phần lọt)",
          "3,9 triệu đồng (= 4 triệu − 0,1, nhầm đơn vị của 10%)",
          "4 triệu đồng (= người duyệt không đổi số lần dùng nên không đổi)",
        ],
        "Người duyệt chặn 90% thì còn 10% lỗi lọt: 4 triệu × 10% = 0,4 triệu. Con số 3,6 triệu là phần đã được chặn chứ không phải phần còn thiệt hại. Con số 3,9 trừ sai đơn vị. Còn 4 triệu sai vì người duyệt làm giảm tỷ lệ lỗi lọt, đâu cần đổi số lần dùng."
      ),
      Q(
        "Việc A: 1.000 lần × 2% lọt × 50 nghìn. Việc B: 20 lần × 5% lọt × 20 triệu. Việc nào đáng kiểm kỹ hơn?",
        [
          "Việc B, vì 20 × 5% × 20 triệu = 20 triệu, so với 1 triệu của A",
          "Việc A, vì chạy 1.000 lần, nhiều hơn B tới 50 lần",
          "Việc A, vì tỷ lệ lọt 2% dù nhỏ nhưng nhân với số lần lớn",
          "Hai việc ngang nhau, vì tổng số lỗi lọt qua đều là 20",
        ],
        "A: 1.000 × 2% × 50 nghìn = 1 triệu. B: 20 × 5% × 20 triệu = 20 triệu, gấp 20 lần. Nhìn số lần chạy hay tỷ lệ lọt riêng lẻ đều dẫn đến kết luận sai. Số lỗi lọt cũng khác nhau: A có 20 lỗi, B chỉ 1 lỗi, nhưng mỗi lỗi B đắt hơn nhiều."
      ),
      Q(
        "Nếu thiệt hại mỗi lỗi bằng 0 (sai chỉ cần sửa lại, không mất gì) thì thiệt hại dự kiến là bao nhiêu?",
        [
          "Bằng 0, vì một trong ba số nhân bằng 0 thì cả tích bằng 0",
          "Bằng tổng hai số còn lại, vì số 0 chỉ bị bỏ khỏi phép cộng",
          "Vẫn lớn nếu số lần dùng lớn, vì số lần mới quyết định tích",
          "Không tính được, vì phép nhân không dùng với số 0",
        ],
        "Phép nhân ba số cho tích bằng 0 nếu một số bằng 0. Điều này giải thích vì sao việc sửa được ngay và không tốn gì (như viết nháp nội bộ) không cần kiểm kỹ dù dùng nhiều. Công thức không phải phép cộng, và phép nhân với 0 vẫn tính bình thường."
      ),
      Q(
        "Muốn giảm thiệt hại dự kiến của một việc, cách nào thường rẻ nhất?",
        [
          "Giảm tỷ lệ lỗi lọt: thêm bước đối chiếu hoặc người duyệt",
          "Giảm số lần dùng AI xuống còn một nửa cho cả công ty",
          "Giảm thiệt hại mỗi lỗi bằng cách bớt nói chuyện với khách",
          "Đổi tên công cụ AI sang một công cụ khác tên mới hơn",
        ],
        "Thêm bước đối chiếu hay người duyệt làm tỷ lệ lọt giảm mạnh mà vẫn giữ được lợi ích của việc dùng AI. Giảm số lần dùng mất luôn phần tiết kiệm. Giảm giao tiếp với khách không giảm thiệt hại. Đổi tên công cụ không đổi tỷ lệ lọt nào, vì tỷ lệ phụ thuộc vào cách kiểm."
      ),
    ],
    keyTakeaways: [
      "Thiệt hại dự kiến = số lần dùng × tỷ lệ lỗi lọt × thiệt hại mỗi lỗi.",
      "Cần nhân cả ba số: một số riêng lẻ dễ dẫn đến kết luận sai.",
      "Một số bằng 0 thì cả tích bằng 0: việc sai không mất gì thì không cần kiểm kỹ.",
      "Bước kiểm làm giảm tỷ lệ lỗi lọt, thường là đòn bẩy rẻ nhất.",
      "Số ước lượng thô là đủ để so hai việc với nhau.",
    ],
    practicePrompt: {
      question:
        "Việc C: 50 lần mỗi tháng, 10% lỗi lọt, mỗi lỗi thiệt hại 2 triệu đồng. Thiệt hại dự kiến mỗi tháng là bao nhiêu?",
      options: [
        "10 triệu đồng (= 50 × 0,1 × 2 triệu)",
        "100 triệu đồng (= 50 × 1 × 2 triệu, nhầm 10% thành 1)",
        "52,1 triệu đồng (= 50 + 0,1 + 2, cộng thay vì nhân)",
        "1 triệu đồng (= 50 × 0,01 × 2 triệu, nhầm 10% thành 0,01)",
      ],
      correct: 0,
      explanation:
        "50 × 10% = 5 lỗi lọt, mỗi lỗi 2 triệu thì 10 triệu mỗi tháng. Nhầm 10% thành 1 cho ra 100 triệu, nhầm thành 0,01 cho ra 1 triệu, còn cộng ba con số là không hiểu đây là phép nhân. Đổi phần trăm sang số thập phân đúng là bước hay sai nhất.",
    },
    summary: {
      keyIdea: "Ba con số nhân với nhau cho biết việc nào đáng kiểm: số lần, tỷ lệ lỗi lọt, thiệt hại mỗi lỗi.",
      formula: "Thiệt hại dự kiến = số lần × tỷ lệ lỗi lọt × thiệt hại mỗi lỗi.",
      commonMistake: "Chỉ nhìn một số: chạy nhiều lần, hoặc thiệt hại một lỗi lớn, rồi kết luận việc nào đáng lo.",
      action: "Chọn hai việc và tính thiệt hại dự kiến mỗi tháng cho từng việc bằng số ước lượng thô.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn hai việc bạn dùng AI trong tháng này. Với mỗi việc ước lượng ba con số (số lần, tỷ lệ lỗi lọt, thiệt hại mỗi lỗi tính bằng tiền hoặc giờ), rồi nhân lại. Ghi việc nào có tích lớn hơn và viết một bước kiểm mới cho việc đó.",
      secondary: "Ngày mai bạn sẽ được hỏi: hai tích của bạn là bao nhiêu, và bạn chọn bước kiểm nào để giảm tỷ lệ lỗi lọt?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn không có thời gian kiểm kỹ mọi việc. Phải chọn. Bài này đưa cho bạn một phép nhân ba số để chọn, và bạn có thể làm nó trên giấy trong năm phút.",
      },
      {
        type: "feynman",
        title: "Chi phí của một lỗi đơn giản hơn bạn nghĩ",
        intro: "Một cửa hàng đóng gói 200 đơn mỗi tháng. Cứ 20 đơn thì có 1 đơn nhầm địa chỉ, và mỗi đơn nhầm tốn 400 nghìn để gửi lại. Chủ cửa hàng không cần phần mềm: lấy 200 chia 20 được 10 đơn nhầm, nhân 400 nghìn ra 4 triệu mỗi tháng. Chi phí một lỗi được gửi đi tính y như vậy.",
        columns: ["Số", "Cửa hàng đóng gói", "Việc dùng AI"],
        rows: [
          ["Số lần", "200 đơn mỗi tháng", "Số lần dùng AI cho việc đó mỗi tháng"],
          ["Tỷ lệ lỗi", "1 đơn nhầm trên 20 đơn", "Phần kết quả sai lọt qua bước kiểm"],
          ["Thiệt hại mỗi lỗi", "400 nghìn để gửi lại", "Tiền, thời gian hay uy tín mất khi một lỗi đi ra ngoài"],
        ],
        oneLiner: "Nhân số lần với tỷ lệ lỗi lọt và thiệt hại mỗi lỗi: ra con số mỗi tháng của việc đó.",
      },
      { type: "heading", text: "Vì sao phải nhân cả ba" },
      {
        type: "paragraph",
        text: "Chỉ nhìn số lần thì việc chạy nhiều có vẻ đáng lo, nhưng mỗi lần có thể rẻ. Chỉ nhìn thiệt hại thì việc hiếm mà đắt có vẻ đáng lo, nhưng có thể gần như không sai. Nhân ba số cho một con số duy nhất, nên hai việc rất khác nhau so sánh được với nhau. Và nếu một số bằng 0, tích bằng 0: việc mà sai chẳng mất gì thì không cần kiểm kỹ.",
      },
      {
        type: "chart",
        title: "Thiệt hại dự kiến mỗi tháng theo tỷ lệ lỗi lọt qua",
        caption: "Số liệu minh hoạ. Kéo hai thanh trượt cho giống việc của bạn. Đường trên là không có người duyệt, đường dưới là có người duyệt chặn 90% lỗi. Đơn vị: triệu đồng mỗi tháng.",
        kind: "line",
        xLabel: "Tỷ lệ lỗi lọt qua (%)",
        yLabel: "Thiệt hại dự kiến (triệu đồng/tháng)",
        x: { from: 0, to: 20, step: 1 },
        params: [
          { id: "uses", label: "Số lần dùng mỗi tháng", min: 10, max: 1000, step: 10, value: 200, unit: "lần" },
          { id: "damage", label: "Thiệt hại mỗi lỗi", min: 50, max: 5000, step: 50, value: 400, unit: "nghìn đồng" },
        ],
        series: [
          { label: "Không có người duyệt", expr: "x / 100 * uses * damage / 1000" },
          { label: "Có người duyệt chặn 90% lỗi", expr: "x / 100 * uses * damage / 1000 * 0.1" },
        ],
      },
      { type: "heading", text: "Ba cách giảm con số, từ rẻ đến đắt" },
      {
        type: "list",
        items: [
          "Giảm tỷ lệ lỗi lọt: thêm bước đối chiếu số với nguồn hoặc một người duyệt. Thường là cách rẻ nhất.",
          "Giảm thiệt hại mỗi lỗi: gửi nháp trước cho người nhận biết đây là bản dự thảo, hoặc chia nhỏ việc để lỗi nằm trong phạm vi nhỏ.",
          "Giảm số lần dùng: chỉ làm nếu hai cách trên không đủ, vì mất luôn lợi ích tiết kiệm thời gian.",
        ],
      },
      {
        type: "flow",
        title: "Ước lượng thiệt hại dự kiến trong năm phút",
        steps: [
          { label: "Đếm số lần mỗi tháng", detail: "Nhìn lại lịch hoặc hộp thư: việc này xảy ra khoảng bao nhiêu lần một tháng." },
          { label: "Đoán tỷ lệ lỗi lọt", detail: "Trong 20 kết quả bạn từng nhận, khoảng mấy cái có lỗi mà bạn không bắt được. Số thô là đủ." },
          { label: "Đoán thiệt hại mỗi lỗi", detail: "Nếu một lỗi đi ra ngoài, tốn bao nhiêu tiền hoặc giờ để sửa, xin lỗi, làm lại." },
          { label: "Nhân ba số", detail: "Số lần × tỷ lệ lỗi lọt × thiệt hại. Đổi phần trăm sang số thập phân trước khi nhân." },
          { label: "So với công kiểm", detail: "Nếu thiệt hại lớn hơn nhiều công của một bước kiểm thì thêm bước đó." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI hỗ trợ ước lượng thiệt hại dự kiến",
        task: "Bạn dùng AI để soạn 120 thư nhắc lịch hẹn mỗi tháng cho khách. Bạn thử ước lượng thiệt hại dự kiến và nhờ AI kiểm phép nhân, không nhờ nó đoán giúp các con số. Lắp prompt.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              g("Tôi soạn 120 thư nhắc lịch hẹn mỗi tháng. Ước lượng của tôi: khoảng 5% thư lọt qua với một lỗi ngày giờ, mỗi lỗi tốn khoảng 300 nghìn đồng vì khách lỡ hẹn.", "Bạn đưa ba con số của chính mình, nên AI chỉ việc tính và diễn giải dựa trên số của bạn."),
              b("Tính giúp tôi việc này có rủi ro không.", "Không có số nào, AI sẽ tự đoán số lần, tỷ lệ và thiệt hại, rồi nói chắc như thật."),
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              b("Cho tôi biết con số cuối cùng là bao nhiêu thôi.", "Chỉ có đáp án, bạn không kiểm được phép nhân, và AI dễ nhầm khi đổi phần trăm."),
              g("Hiển thị từng bước nhân, dùng đúng ba số tôi đưa. Sau đó nói việc này có đáng thêm người duyệt không nếu một người duyệt tốn khoảng 60 nghìn mỗi lần.", "Có từng bước để bạn kiểm, và yêu cầu so với công duyệt nên kết quả trả lời được câu hỏi quyết định."),
            ],
          },
          {
            id: "format",
            label: "Định dạng và giới hạn",
            options: [
              g("Ngắn gọn dưới 120 chữ. Không tự thêm số mới ngoài ba số tôi đưa. Nếu thiếu thông tin thì hỏi lại tôi.", "Giới hạn chặn AI bịa thêm số, và cho phép nó hỏi lại thay vì đoán."),
              b("Viết chi tiết và chuyên nghiệp nhất có thể.", "Chi tiết hơn không tốt hơn, và AI dễ thêm số liệu thị trường bịa để trông chuyên nghiệp."),
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Các bước: 120 × 5% = 6 thư lỗi lọt. 6 × 300 nghìn = 1,8 triệu đồng mỗi tháng.\n\nMột người duyệt 60 nghìn mỗi thư: 120 × 60 nghìn = 7,2 triệu, cao hơn 1,8 triệu. Duyệt toàn bộ không đáng. Bạn có thể chỉ duyệt các thư có ngày giờ, vì lỗi nằm ở đó.",
          },
          {
            requires: ["context"],
            text: "Với 120 thư mỗi tháng và 5% lọt, thiệt hại khoảng vài triệu đồng mỗi tháng, tuỳ theo từng trường hợp. Nên xem xét thêm bước kiểm để giảm rủi ro...\n\n(Có số của bạn nhưng không có yêu cầu hiển thị bước, nên AI nói gần đúng và không cho bạn kiểm phép nhân.)",
          },
          {
            text: "Theo thống kê ngành, trung bình 12% thư nhắc lịch có lỗi và mỗi lỗi gây thiệt hại khoảng 2 triệu đồng, tức khoảng 28,8 triệu mỗi tháng...\n\n(Không có số nào từ bạn nên AI tự bịa tỷ lệ 12% và 2 triệu, nghe có nguồn mà không có nguồn nào.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Số thô vẫn hữu ích",
        text: "Bạn không cần số chính xác. Chỉ cần đúng bậc độ lớn: 1 triệu hay 20 triệu mỗi tháng thì quyết định khác hẳn, còn 4,1 hay 3,9 triệu thì không. Nếu hai việc có tích gần nhau, ưu tiên việc có thiệt hại một lỗi lớn hơn, vì nó khó rút lại.",
      },
      {
        type: "scenario",
        title: "Chọn chỗ đặt người duyệt duy nhất",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhóm bạn chỉ có một người rảnh duyệt. Hai việc dùng AI: (A) 500 lần mỗi tháng viết lại email nội bộ, 2% lọt, mỗi lỗi 20 nghìn. (B) 15 lần mỗi tháng soạn thư báo giá, 10% lọt, mỗi lỗi 6 triệu.",
            choices: [
              { label: "Đặt người duyệt vào việc A vì chạy 500 lần, nhiều hơn rất nhiều", next: "bad" },
              { label: "Tính nhanh hai tích: A khoảng 0,2 triệu, B khoảng 9 triệu, đặt vào việc B", next: "s2" },
            ],
          },
          bad: {
            text: "Người duyệt xem 500 email nội bộ mỗi tháng và mệt. Trong khi đó thư báo giá không ai xem, và một thư báo sai giá làm công ty mất hợp đồng.",
            ending: "bad",
          },
          s2: {
            text: "Người duyệt xem 15 thư báo giá mỗi tháng. Nhóm hỏi có nên bỏ hẳn kiểm cho việc A không.",
            choices: [
              { label: "Bỏ hẳn, và cũng bỏ việc tự đọc lại luôn", next: "bad2" },
              { label: "Giữ tự đọc lại một lượt cho việc A, vì đó là bước rẻ", next: "good" },
            ],
          },
          bad2: {
            text: "Một email nội bộ gửi nhầm ngày họp lan ra cả phòng. Thiệt hại nhỏ nhưng lặp lại nhiều lần, và mọi người mất niềm tin vào bản nháp AI.",
            ending: "bad",
          },
          good: {
            text: "Việc B được duyệt kỹ, việc A chỉ cần tự đọc. Thiệt hại dự kiến của cả hai đều ở mức chấp nhận được, và người duyệt không bị quá tải.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Số lần × tỷ lệ lỗi lọt × thiệt hại mỗi lỗi: ba số nhân cho biết việc nào đáng kiểm.",
          "Bài sau: danh sách công cụ được duyệt, mỗi dòng ghi những gì.",
        ],
      },
    ],
  },
  {
    id: 2689,
    slug: "danh-sach-cong-cu-duoc-duyet-ghi-nhung-gi-moi-dong",
    title: "Chặng 64, Bài 10: Danh sách công cụ được duyệt: mỗi dòng ghi những gì",
    subtitle: "Dùng cho việc gì, loại dữ liệu nào được vào, ai chịu trách nhiệm, khi nào xem lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi không có danh sách, mỗi người tự chọn công cụ theo thói quen, và không ai biết dữ liệu công ty đang đi tới những đâu. Một danh sách ngắn, mỗi dòng bốn thông tin, cho phép cả phòng dùng AI nhanh mà vẫn biết đâu là ranh giới.",
    openingQuestion:
      "Phòng bạn có một danh sách công cụ AI được duyệt, nhưng mỗi dòng chỉ ghi tên công cụ. Điều gì còn thiếu nhất?",
    openingOptions: [
      "Dùng cho việc gì, dữ liệu loại nào được vào, và ai chịu trách nhiệm",
      "Logo và màu sắc của công cụ, để dễ nhận ra trong danh sách",
      "Số người đã từng dùng thử công cụ trong toàn công ty, nên là an toàn",
      "Lời nhận xét của từng người về việc họ thích công cụ nào",
    ],
    correctOption: 0,
    explanation:
      "Tên công cụ không nói được nó dùng cho việc gì và dữ liệu nào được phép vào. Một công cụ duyệt cho việc viết nháp công khai chưa chắc được phép nhận hợp đồng khách hàng. Và không có người chịu trách nhiệm thì khi công cụ đổi điều khoản, không ai biết để xem lại. Logo, số người dùng hay lời nhận xét không giúp quyết định dán gì vào ô chat.",
    diagram: [
      { label: "Tên công cụ", arrow: true },
      { label: "Dùng cho việc gì", arrow: true },
      { label: "Loại dữ liệu được vào", arrow: true },
      { label: "Người chịu trách nhiệm", arrow: true },
      { label: "Ngày xem lại kế tiếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng nhân sự 5 người",
      description:
        "Phòng dùng hai công cụ AI. Danh sách ghi công cụ thứ nhất cho viết thông báo nội bộ, chỉ thông tin công khai, do chị Hạnh phụ trách, xem lại mỗi quý. Công cụ thứ hai do công ty duyệt riêng, được nhận hồ sơ ứng viên đã ẩn tên. Một nhân viên mới chỉ cần nhìn một dòng là biết dán gì vào đâu.",
    },
    quiz: [
      Q(
        "Mỗi dòng trong danh sách công cụ được duyệt nên ghi gì?",
        [
          "Việc dùng, loại dữ liệu được vào, người chịu trách nhiệm, ngày xem lại",
          "Tên công cụ, giá tiền mỗi tháng và số người đã từng dùng thử trong quý, không kèm ngày xem lại",
          "Tên công cụ và đường dẫn tải về cho mọi nhân viên trong công ty",
          "Tên công cụ kèm lời giới thiệu của nhà cung cấp",
        ],
        "Bốn thông tin cho phép một người mới biết ngay cách dùng công cụ an toàn: việc gì, dữ liệu nào, hỏi ai, bao giờ đổi. Giá và số người dùng thử không quyết định dữ liệu nào được vào, đường dẫn tải chỉ giúp tìm, và lời giới thiệu của nhà cung cấp là quảng cáo, không phải quy tắc của công ty."
      ),
      Q(
        "Cột dữ liệu được vào ghi \"chỉ thông tin công khai\". Một nhân viên muốn dán hợp đồng khách hàng. Đúng là gì?",
        [
          "Không dán: hợp đồng vượt quá loại dữ liệu đã ghi cho công cụ",
          "Dán được, vì công cụ đã nằm trong danh sách được duyệt của công ty",
          "Dán được nếu tắt lịch sử trò chuyện trong công cụ đó",
          "Dán được, vì chỉ vài trang nên không ảnh hưởng nhiều tới ai",
        ],
        "Được duyệt là duyệt cho một loại việc và dữ liệu cụ thể, không phải cho mọi thứ. Tắt lịch sử không làm hợp đồng bớt thuộc loại bí mật, và độ dài cũng không đổi loại dữ liệu. Nếu cần xử lý hợp đồng, phải xin duyệt một công cụ hoặc cách làm khác."
      ),
      Q(
        "Vì sao mỗi dòng cần một người chịu trách nhiệm có tên?",
        [
          "Để có người theo dõi khi công cụ đổi điều khoản và cập nhật dòng",
          "Để người đó tự trả tiền cho công cụ thay cho cả phòng mỗi tháng",
          "Để người đó là người duy nhất được phép dùng công cụ",
          "Để người đó tự viết mọi bản nháp cho cả phòng",
        ],
        "Điều khoản và tính năng của công cụ có thể đổi, và không ai theo dõi nếu không có người được giao. Người chịu trách nhiệm không phải người duy nhất dùng, không trả tiền thay, và cũng không viết hộ cả phòng: họ giữ dòng đó còn đúng."
      ),
      Q(
        "Ngày xem lại nên đặt khoảng bao lâu một lần cho một công cụ mới được duyệt?",
        [
          "Mỗi quý, rồi kéo dài ra nếu không có thay đổi gì",
          "Một lần duy nhất, vì đã duyệt thì coi như xong luôn",
          "Mỗi giờ, vì công cụ AI đổi từng phút một",
          "Khi có sự cố xảy ra, không cần lịch cố định",
        ],
        "Xem lại theo lịch đều đặn giúp bắt thay đổi trước khi thành sự cố. Duyệt một lần rồi bỏ qua bỏ mất việc điều khoản đổi. Mỗi giờ thì không ai làm nổi. Đợi có sự cố mới xem là phản ứng sau khi dữ liệu đã đi ra ngoài."
      ),
      Q(
        "Công cụ nào nên có dòng riêng trong danh sách?",
        [
          "Mọi công cụ AI cả phòng được phép dùng cho công việc",
          "Chỉ những công cụ có trả phí hàng tháng cho công ty",
          "Chỉ công cụ do phòng IT tự xây dựng và vận hành",
          "Chỉ công cụ mà sếp trực tiếp đang dùng hằng ngày",
        ],
        "Rủi ro đến từ cách công cụ được dùng và dữ liệu đi vào, không phụ thuộc có trả phí hay do ai vận hành. Công cụ miễn phí mà nhân viên tự dùng còn cần ghi nhiều hơn. Danh sách chỉ hữu ích khi nó đầy đủ, nên mọi công cụ dùng cho việc công ty đều phải có dòng."
      ),
    ],
    keyTakeaways: [
      "Mỗi dòng ghi bốn thứ: việc dùng, dữ liệu được vào, người chịu trách nhiệm, ngày xem lại.",
      "Được duyệt là duyệt cho một loại việc và dữ liệu, không phải cho mọi thứ.",
      "Mỗi dòng có một người có tên, để có người theo dõi khi công cụ đổi.",
      "Xem lại theo lịch, ví dụ mỗi quý, không đợi có sự cố.",
      "Danh sách ngắn và đầy đủ hơn danh sách dài mà thiếu công cụ thật đang dùng.",
    ],
    practicePrompt: {
      question:
        "Chị Lan muốn thêm công cụ dịch có AI vào danh sách của phòng. Dòng nào đầy đủ nhất?",
      options: [
        "Dịch tài liệu công khai; không nhận hợp đồng; anh Sơn phụ trách; xem lại quý sau",
        "Công cụ dịch có AI, rất tiện, cả phòng thích dùng",
        "Dịch mọi tài liệu của phòng, kể cả hợp đồng, vì nhanh",
        "Công cụ dịch; người phụ trách: phòng hành chính",
      ],
      correct: 0,
      explanation:
        "Dòng đầy đủ nêu việc, loại dữ liệu được vào, một người có tên và ngày xem lại. Lời khen không phải thông tin. Cho dịch mọi thứ kể cả hợp đồng là bỏ qua ranh giới dữ liệu. Người phụ trách là cả một phòng thì không có người cụ thể để hỏi.",
    },
    summary: {
      keyIdea: "Danh sách công cụ hữu ích khi mỗi dòng trả lời bốn câu: dùng cho việc gì, dữ liệu nào, ai phụ trách, khi nào xem lại.",
      formula: "Dòng đầy đủ = việc + loại dữ liệu được vào + người phụ trách + ngày xem lại.",
      commonMistake: "Chỉ ghi tên công cụ, rồi coi được duyệt nghĩa là dán gì vào cũng được.",
      action: "Viết bốn dòng đầu tiên cho bốn công cụ AI phòng bạn thực sự đang dùng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê các công cụ AI bạn và đồng nghiệp đang dùng cho công việc, kể cả công cụ miễn phí tự dùng. Với mỗi công cụ viết một dòng bốn thông tin: việc dùng, loại dữ liệu được vào, một người phụ trách có tên, ngày xem lại. Gửi bản nháp cho một đồng nghiệp để hỏi thiếu gì.",
      secondary: "Ngày mai bạn sẽ được hỏi: có công cụ nào bạn đang dùng mà chưa ai trong phòng biết, và bạn điền cột dữ liệu được vào như thế nào?",
    },
    sections: [
      {
        type: "lead",
        text: "Một đồng nghiệp hỏi: \"Em dán hợp đồng này vào công cụ kia được không?\" Nếu câu trả lời là \"để chị hỏi\", phòng bạn cần một danh sách. Bài này dựng khung của nó, mỗi dòng bốn thông tin.",
      },
      {
        type: "feynman",
        title: "Danh sách công cụ được duyệt đơn giản hơn bạn nghĩ",
        intro: "Hình dung sổ giữ chìa khoá của một toà nhà. Mỗi chìa ghi mở phòng nào, ai đang giữ, và khi nào đổi khoá. Không có sổ thì không biết ai vào được đâu. Danh sách công cụ AI là cuốn sổ ấy: mỗi công cụ ghi việc nào, dữ liệu nào, ai giữ, khi nào xem lại.",
        columns: ["Thông tin", "Sổ chìa khoá", "Danh sách công cụ AI"],
        rows: [
          ["Mở được gì", "Mở phòng nào", "Dùng cho việc gì, dữ liệu nào được vào"],
          ["Ai chịu trách nhiệm", "Ai đang giữ chìa", "Người phụ trách dòng đó"],
          ["Bao giờ đổi", "Ngày đổi khoá kế tiếp", "Ngày xem lại kế tiếp"],
        ],
        oneLiner: "Danh sách công cụ là sổ chìa khoá: mỗi dòng nói mở được gì, ai giữ, và khi nào xem lại.",
      },
      { type: "heading", text: "Bốn cột, không hơn" },
      {
        type: "paragraph",
        text: "Cột một: dùng cho việc gì, ví dụ viết nháp thông báo nội bộ. Cột hai: loại dữ liệu được vào, ví dụ chỉ thông tin công khai, không nhận tên khách hay số tiền. Cột ba: người chịu trách nhiệm, một cái tên. Cột bốn: ngày xem lại, ví dụ cuối quý. Thêm cột thì không ai điền, bớt cột thì mất điều cần biết.",
      },
      {
        type: "flow",
        title: "Dựng danh sách trong bốn bước",
        steps: [
          { label: "Liệt kê công cụ đang dùng thật", detail: "Hỏi từng người đang dùng công cụ AI nào, kể cả công cụ miễn phí tự tải. Danh sách chỉ hữu ích nếu phản ánh thực tế." },
          { label: "Ghi việc và dữ liệu cho từng công cụ", detail: "Dựa vào bảng chấm mức ở các bài trước: công cụ này dùng cho việc mức nào, dữ liệu tối đa là loại nào." },
          { label: "Gắn người phụ trách", detail: "Một cái tên cho mỗi dòng. Người này theo dõi khi công cụ đổi điều khoản và nhắc xem lại." },
          { label: "Đặt ngày xem lại", detail: "Mỗi quý cho công cụ mới, kéo dài dần nếu không có thay đổi. Ghi ngày vào lịch chung." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dòng đầy đủ",
          text: "Dịch tài liệu công khai sang tiếng Anh. Không nhận hợp đồng hay tên khách. Người phụ trách: anh Sơn. Xem lại: cuối quý 4.",
        },
        right: {
          label: "Dòng thiếu",
          text: "Công cụ dịch có AI. Cả phòng dùng được. Người phụ trách: phòng hành chính. Không có ngày xem lại, không nói dữ liệu nào được vào.",
        },
      },
      {
        type: "callout",
        label: "Không ghi gì về tính năng cụ thể",
        text: "Đừng ghi nút bấm, giá tiền hay phiên bản vào danh sách: những thứ này đổi liên tục và dòng sẽ lỗi thời trong vài tuần. Ghi những thứ bền: việc dùng, dữ liệu được vào, người phụ trách, ngày xem lại.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn khung danh sách công cụ",
        task: "Bạn cần khung bảng danh sách công cụ cho phòng hành chính. Lắp một prompt nhờ AI soạn khung, không kèm tên công cụ thật hay dữ liệu nội bộ.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              b("Làm cho tôi một danh sách công cụ.", "Không biết phòng nào, danh sách để làm gì, nên AI trả về một danh sách tên công cụ phổ biến, không phải khung bạn cần."),
              g("Tôi quản lý phòng hành chính 8 người. Phòng cần một bảng công cụ AI được duyệt. Tôi chỉ cần khung bảng và hướng dẫn điền, chưa có tên công cụ cụ thể.", "Có phòng, mục đích và ranh giới: bạn chỉ xin khung, nên AI không bịa tên công cụ."),
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              g("Soạn khung bảng 4 cột: dùng cho việc gì, loại dữ liệu được vào, người chịu trách nhiệm, ngày xem lại. Mỗi cột kèm một ví dụ điền.", "Bốn cột cố định và có ví dụ: kết quả dùng được ngay và bạn đối chiếu được với bài học."),
              b("Soạn gì cũng được, miễn hữu ích cho phòng.", "Không có tiêu chí, AI thêm cột thừa như giá tiền và phiên bản, là những thứ đổi liên tục."),
            ],
          },
          {
            id: "format",
            label: "Định dạng và giới hạn",
            options: [
              b("Trình bày đẹp và dài để trông chuyên nghiệp.", "Dài không hơn: bảng 15 cột không ai điền, và AI dễ thêm cột tự nghĩ ra."),
              g("Trình bày thành bảng, không quá 4 cột, không ghi giá tiền hay tên nút bấm. Nếu cần thêm thông tin từ tôi thì hỏi.", "Chặn cột thừa và chi tiết dễ lỗi thời, cho phép hỏi lại thay vì đoán."),
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Dùng cho việc gì | Loại dữ liệu được vào | Người chịu trách nhiệm | Ngày xem lại |\n| Viết nháp thông báo nội bộ | Chỉ thông tin công khai | (tên một người) | (ngày cuối quý) |\n\nHướng dẫn: mỗi cột một câu; dữ liệu được vào ghi loại cao nhất được phép; người chịu trách nhiệm là một cái tên, không phải phòng ban.",
          },
          {
            requires: ["context"],
            text: "Dưới đây là một danh sách công cụ AI phổ biến cho văn phòng: công cụ viết nháp, công cụ dịch, công cụ tóm tắt... mỗi công cụ có nhiều tính năng hữu ích cho phòng hành chính.\n\n(Có bối cảnh nhưng không yêu cầu khung bảng bốn cột, nên AI liệt kê công cụ phổ biến thay vì soạn khung bạn cần.)",
          },
          {
            text: "Danh sách công cụ được duyệt gồm: Công cụ Alpha Pro (299.000 đồng/tháng), Công cụ Beta Plus (phiên bản 4.2)...\n\n(Không biết bạn cần gì, AI tự bịa tên công cụ, giá và phiên bản. Toàn bộ là chi tiết không có thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Đồng nghiệp muốn dùng một công cụ mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Tuấn trong nhóm nghe nói về một công cụ AI mới và muốn dùng ngay để tóm tắt hợp đồng khách hàng. Công cụ chưa có trong danh sách của phòng.",
            choices: [
              { label: "Cho dùng thử ngay, vì nhiều người khen công cụ này", next: "bad" },
              { label: "Bảo anh Tuấn ghi một dòng bốn thông tin và gửi người phụ trách danh sách xem trước", next: "s2" },
            ],
          },
          bad: {
            text: "Anh Tuấn dán ba hợp đồng vào công cụ chưa ai xem điều khoản. Hai tuần sau, phòng pháp chế phát hiện điều khoản của công cụ cho phép lưu nội dung nhập vào.",
            ending: "bad",
          },
          s2: {
            text: "Người phụ trách xem điều khoản và đồng ý cho dùng với thông tin công khai, không nhận hợp đồng. Anh Tuấn vẫn muốn tóm tắt hợp đồng.",
            choices: [
              { label: "Cho phép hợp đồng, vì công cụ giờ đã nằm trong danh sách", next: "bad2" },
              { label: "Giữ ranh giới: hợp đồng chỉ đi qua công cụ đã duyệt riêng cho loại dữ liệu đó", next: "good" },
            ],
          },
          bad2: {
            text: "Dòng ghi rõ chỉ thông tin công khai, nhưng không ai đọc dòng. Hợp đồng vẫn bị dán vào, và danh sách trở thành một tờ giấy không ai theo.",
            ending: "bad",
          },
          good: {
            text: "Công cụ mới được dùng cho phần việc công khai, hợp đồng đi qua công cụ đã duyệt riêng. Một dòng mới được thêm vào danh sách, có người phụ trách và ngày xem lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi dòng: dùng cho việc gì, dữ liệu nào vào, ai phụ trách, khi nào xem lại.",
          "Công cụ được duyệt cho một loại việc, không phải cho mọi thứ.",
        ],
      },
    ],
  },
];
