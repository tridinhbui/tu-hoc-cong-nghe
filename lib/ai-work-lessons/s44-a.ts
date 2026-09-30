import type { Lesson } from "../lesson-types";

// Chặng 44, bài 1-5. Giáo trình: scripts/curriculum/stage-44.json.
// Bài không dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và kiểm kết quả
// với trợ lý đọc tài liệu nói chung (NotebookLM là một ví dụ). Không nêu nút bấm, giá, giới hạn.

type Opt = string;
const q = (question: string, correct: Opt, wrong: [Opt, Opt, Opt], explanation: string) => ({
  question,
  options: [correct, ...wrong],
  correct: 0,
  explanation,
});

// Tình huống hai lượt quyết định: lượt 1 có một nhánh xấu, lượt 2 có một nhánh tốt và một nhánh xấu.
const scen = (
  title: string,
  s1: string,
  bad1: [string, string],
  good1: string,
  s2: string,
  good2: [string, string],
  bad2: [string, string],
  goodEnd: string,
) => ({
  type: "scenario" as const,
  title,
  start: "s1",
  nodes: {
    s1: {
      text: s1,
      choices: [
        { label: bad1[0], next: "bad1" },
        { label: good1, next: "s2" },
      ],
    },
    bad1: { text: bad1[1], ending: "bad" as const },
    s2: {
      text: s2,
      choices: [
        { label: bad2[0], next: "bad2" },
        { label: good2[0], next: "good" },
      ],
    },
    bad2: { text: bad2[1], ending: "bad" as const },
    good: { text: good2[1] + " " + goodEnd, ending: "good" as const },
  },
});

export const S44_A_LESSONS: Lesson[] = [
  // ───────────── Bài 1 ─────────────
  {
    id: 2280,
    slug: "hoi-mot-tai-lieu-thay-vi-doc-het-30-trang",
    title: "Chặng 44, Bài 1: Hỏi một tài liệu thay vì đọc hết 30 trang",
    subtitle: "Bạn không cần đọc cả cuốn sổ tay để biết một bước: hỏi thẳng, rồi mở đúng trang xác nhận.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người đi làm thường chỉ cần một câu trả lời nằm đâu đó trong 30 trang quy trình. Trợ lý đọc tài liệu giúp bạn đi thẳng tới câu đó, nhưng chỉ có ích khi bạn vẫn mở trang gốc xác nhận. Thói quen này tiết kiệm hàng giờ mỗi tuần mà không đánh đổi độ tin cậy.",
    openingQuestion:
      "Bạn có bản quy trình 30 trang và cần biết ai duyệt khoản chi trên 5 triệu. Bạn tải nó lên một trợ lý đọc tài liệu và hỏi. Bước nào sau khi nhận câu trả lời là quan trọng nhất?",
    openingOptions: [
      "Mở đúng trang được trích để tự xác nhận",
      "Hỏi lại chính trợ lý xem nó có chắc chắn về câu trả lời vừa rồi không",
      "Chuyển tiếp ngay câu trả lời cho cả nhóm",
      "Tải thêm cả thư mục để nó có đủ dữ liệu",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý đọc tài liệu trả lời bám vào tài liệu bạn đưa, nhưng vẫn có thể hiểu sai hoặc lấy nhầm đoạn. Cách xác nhận chắc chắn là mở đúng trang nó chỉ tới và đọc lại câu đó. Hỏi lại chính nó không phải kiểm chứng, vì nó có thể khẳng định lại điều vừa nói. Gửi cả nhóm khi chưa kiểm là lan truyền một câu chưa xác nhận. Tải thêm thư mục chỉ làm việc kiểm tra phức tạp hơn.",
    diagram: [
      { label: "Tải tài liệu của bạn lên", arrow: true },
      { label: "Hỏi một câu cụ thể", arrow: true },
      { label: "Nhận câu trả lời kèm chỗ trích", arrow: true },
      { label: "Mở trang gốc và xác nhận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên hành chính mới vào làm được giao cuốn quy trình mua sắm dày khoảng 30 trang. Thay vì đọc từ đầu, chị tải lên một trợ lý đọc tài liệu, hỏi \"khoản chi trên 5 triệu ai duyệt\", rồi mở đúng trang được chỉ để đọc lại. Chị xong việc trong vài phút và vẫn có câu trả lời mà mình kiểm được.",
    },
    quiz: [
      q(
        "Bạn tải bản quy trình lên và hỏi một câu. Điều gì làm câu trả lời đáng tin hơn chat thường?",
        "Nó bám vào tài liệu bạn đưa và chỉ ra được chỗ tương ứng",
        ["Nó luôn đúng vì tài liệu do chính công ty bạn viết ra", "Nó trả lời nhanh hơn nhiều nên ít có cơ hội nào để mắc lỗi hơn chat thường", "Nó đã được học thuộc mọi quy trình của các công ty khác"],
        "Điểm khác cốt lõi là câu trả lời bám vào nguồn bạn đưa và chỉ được chỗ tương ứng để bạn kiểm. Tài liệu đúng không đảm bảo câu trả lời đúng vì vẫn có thể hiểu sai. Nhanh không đồng nghĩa với chính xác, và công cụ không được học sẵn quy trình riêng của công ty.",
      ),
      q(
        "Sau khi có câu trả lời kèm trích dẫn, việc nên làm với việc quan trọng là gì?",
        "Mở đúng đoạn được trích và đọc lại",
        ["Tin luôn vì đã có trích dẫn đi kèm câu trả lời rồi", "Hỏi cùng câu đó thêm ba lần rồi lấy câu trả lời xuất hiện nhiều nhất", "Chỉ xem tiêu đề của mục được trích là đủ"],
        "Trích dẫn chỉ cho bạn chỗ để kiểm, không phải bằng chứng đã đúng. Hỏi lặp lại vẫn chỉ là ý kiến của cùng một công cụ, và xem tiêu đề không cho biết đoạn có nói đúng như câu trả lời hay không. Chỉ đọc lại chính đoạn đó mới xác nhận được.",
      ),
      q(
        "Câu nào là câu hỏi tốt để đưa cho bản quy trình 30 trang?",
        "Khoản chi trên 5 triệu cần ai duyệt và trong bao lâu",
        ["Cho tôi biết mọi điều quan trọng trong tài liệu này", "Tài liệu này có hay không và có nên đọc hết hay không nhỉ", "Viết cho tôi một bài dài về chủ đề của tài liệu này"],
        "Câu hỏi tốt nhắm vào một việc bạn cần biết và câu trả lời có thể nằm ở một đoạn cụ thể. Các câu chung chung như \"mọi điều quan trọng\" hoặc \"có hay không\" khiến công cụ tự chọn điều gì là quan trọng thay bạn, còn yêu cầu viết bài dài khuyến khích nó thêm thứ không có trong tài liệu.",
      ),
      q(
        "Bạn nhận được câu trả lời nhưng trang gốc bị thiếu một dòng chú thích nhỏ ở cuối trang. Điều gì hợp lý?",
        "Đọc cả phần quanh đoạn trích, gồm cả chú thích",
        ["Bỏ qua chú thích vì công cụ đã đọc rồi", "Coi chú thích là thừa nếu câu trả lời nghe hợp lý", "Xoá chú thích khỏi tài liệu để lần sau khỏi nhầm"],
        "Chú thích thường chứa ngoại lệ hoặc điều kiện làm đổi nghĩa câu trả lời. Đọc phần quanh đoạn trích mới thấy đủ ngữ cảnh. Giả định công cụ đã đọc kỹ hoặc coi chú thích là thừa là cách một điều kiện quan trọng bị bỏ sót, còn xoá nội dung tài liệu gốc thì chỉ tạo thêm rủi ro.",
      ),
      q(
        "Vì sao chỉ cần đọc đúng trang được trích mà không đọc lại cả 30 trang?",
        "Vì việc cần xác nhận chỉ là một câu hỏi cụ thể",
        ["Vì các trang khác chắc chắn không có gì quan trọng cả", "Vì công cụ đã đọc kỹ hơn bạn nên phần còn lại là thừa", "Vì đọc cả 30 trang bị cấm khi dùng trợ lý đọc tài liệu"],
        "Bạn chỉ cần xác nhận một câu trả lời cho một câu hỏi, nên đọc trang được trích và phần quanh nó là đủ. Không thể chắc các trang khác không quan trọng với những câu hỏi khác. Công cụ đọc nhanh hơn không có nghĩa là đọc hiểu đúng hơn, và không có quy định nào cấm đọc lại.",
      ),
    ],
    keyTakeaways: [
      "Trợ lý đọc tài liệu trả lời bám vào tài liệu bạn đưa, không phải kiến thức chung.",
      "Hỏi một câu cụ thể về việc bạn cần, không hỏi \"tóm tắt hết\".",
      "Trích dẫn là chỗ để kiểm, chưa phải bằng chứng đúng.",
      "Việc quan trọng: luôn mở trang gốc và đọc lại đoạn được chỉ.",
    ],
    practicePrompt: {
      question:
        "Bạn cần biết hạn nộp hồ sơ hoàn ứng trong bản quy trình 30 trang. Cách dùng trợ lý nào hợp lý nhất?",
      options: [
        "Hỏi đúng câu đó rồi mở trang được trích để đọc lại",
        "Nhờ nó tóm tắt cả quy trình rồi tự đoán hạn nộp cho nhanh",
        "Hỏi qua chat thường không cần tải tài liệu lên",
        "Nhờ nó viết ra hạn nộp phổ biến ở các công ty",
      ],
      correct: 0,
      explanation:
        "Hỏi thẳng câu bạn cần rồi kiểm ở trang gốc là cách nhanh nhất mà vẫn chắc. Tóm tắt cả quy trình rồi đoán bỏ mất độ chính xác. Chat thường không có tài liệu của bạn nên sẽ nói theo hiểu biết chung, còn \"hạn phổ biến\" không phải hạn của công ty bạn.",
    },
    summary: {
      keyIdea: "Hỏi thẳng vào tài liệu của mình, rồi dùng trích dẫn để đi tới trang gốc.",
      formula: "Tài liệu của bạn + câu hỏi cụ thể + mở trang được trích = câu trả lời đã kiểm.",
      commonMistake: "Thấy có trích dẫn đi kèm là tin luôn mà không mở trang.",
      action: "Chọn một tài liệu dài của bạn, hỏi một câu, và mở trang được trích để đối chiếu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu công việc dài của bạn (quy trình, hướng dẫn, hợp đồng mẫu không có thông tin nhạy cảm). Nếu công ty cho phép, tải lên một trợ lý đọc tài liệu, hỏi một câu bạn thật sự đang cần biết, rồi mở trang được trích và ghi lại câu trả lời đúng hay sai.",
      secondary: "Ngày mai hãy cho biết trợ lý trả lời đúng hay có chỗ lệch, và chỗ lệch là gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, bạn được giao xử lý một khoản chi và cần biết ai duyệt. Cuốn quy trình dài 30 trang nằm trong thư mục chung. Bài này cho bạn cách hỏi thẳng vào đó mà không phải đọc hết, và không phải tin mù quáng.",
      },
      {
        type: "feynman",
        title: "Hỏi tài liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn có một đồng nghiệp đã đọc kỹ cuốn quy trình. Bạn hỏi một câu, người đó lật sách và nói \"ở trang 12 này\". Bạn vẫn liếc trang 12 để chắc.",
        columns: ["Thành phần", "Đồng nghiệp đã đọc kỹ cuốn quy trình", "Trợ lý đọc tài liệu"],
        rows: [
          ["Nguồn trả lời", "Cuốn quy trình trước mặt", "Tài liệu bạn tải lên"],
          ["Cách chỉ chỗ", "\"Ở trang 12\"", "Trích dẫn trỏ về đoạn gốc"],
          ["Điểm dễ sai", "Nhớ nhầm hoặc hiểu ngược", "Hiểu sai đoạn hoặc lấy nhầm đoạn"],
          ["Việc của bạn", "Liếc trang được chỉ", "Mở đoạn được trích và đọc lại"],
        ],
        oneLiner: "Trợ lý đọc tài liệu là đồng nghiệp lật sách rất nhanh: bạn vẫn là người xác nhận ở trang gốc.",
      },
      { type: "heading", text: "Từ 30 trang xuống một câu" },
      {
        type: "paragraph",
        text: "Khi bạn tải tài liệu lên, công cụ chia nó thành nhiều đoạn nhỏ để tìm. Khi bạn hỏi, nó chọn những đoạn có vẻ liên quan nhất rồi viết câu trả lời dựa trên chúng. Điều này khác chat thường: chat thường trả lời từ những gì nó đã học chung, còn ở đây câu trả lời bị buộc vào tài liệu của bạn.",
      },
      {
        type: "flow",
        title: "Một câu hỏi đi qua tài liệu như thế nào",
        steps: [
          { label: "Bạn tải tài liệu lên", detail: "Công cụ đọc và chia tài liệu thành nhiều đoạn nhỏ để dễ tìm." },
          { label: "Bạn hỏi một câu cụ thể", detail: "Câu hỏi càng gần một việc cụ thể thì càng dễ tìm đúng đoạn." },
          { label: "Công cụ chọn đoạn liên quan", detail: "Nó lấy vài đoạn có vẻ khớp nhất với câu hỏi, chưa chắc đúng." },
          { label: "Viết câu trả lời kèm chỗ trích", detail: "Câu trả lời dựa trên các đoạn đã chọn, kèm số nhỏ chỉ về nguồn." },
          { label: "Bạn mở trang gốc xác nhận", detail: "Bạn đọc lại đoạn được trích để xem nó có thật sự nói như vậy." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi tài liệu của bạn",
          text: "Câu trả lời bám vào văn bản bạn đưa và chỉ ra chỗ tương ứng. Bạn kiểm được ngay ở trang gốc. Hợp với câu hỏi như \"ai duyệt\", \"hạn nộp\", \"điều kiện là gì\".",
        },
        right: {
          label: "Hỏi chat thường",
          text: "Câu trả lời đến từ hiểu biết chung, không biết quy trình riêng của công ty bạn. Nghe hợp lý nhưng không có chỗ nào để đối chiếu, nên dễ trả lời như thể là quy định của bạn.",
        },
      },
      {
        type: "list",
        items: [
          "Chọn tài liệu bạn được phép tải lên, không chứa thông tin nhạy cảm.",
          "Hỏi một câu về việc bạn cần, có chủ ngữ và điều kiện rõ.",
          "Đọc câu trả lời và tìm chỗ được trích.",
          "Mở đúng đoạn đó và đọc cả câu trước, câu sau.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Hỏi bản quy trình chi tiêu",
        task: "Bạn muốn biết ai duyệt khoản chi trên 5 triệu trong bản quy trình đã tải lên. Lắp câu hỏi cho trợ lý.",
        parts: [
          {
            id: "scope",
            label: "Nêu rõ nguồn",
            options: [
              { text: "Chỉ dựa vào tài liệu đã tải lên, không dùng kiến thức chung.", good: true, feedback: "Buộc câu trả lời bám vào tài liệu, và bạn dễ phát hiện khi nó đi ra ngoài." },
              { text: "Trả lời theo cách làm phổ biến ở các công ty.", feedback: "Nó sẽ nói theo thông lệ chung, có thể khác quy định của công ty bạn." },
            ],
          },
          {
            id: "ask",
            label: "Câu hỏi",
            options: [
              { text: "Khoản chi trên 5 triệu cần ai duyệt và cần giấy tờ gì?", good: true, feedback: "Cụ thể, có ngưỡng số tiền, nên câu trả lời có thể nằm ở một đoạn kiểm được." },
              { text: "Nói cho tôi về quy trình chi tiêu.", feedback: "Quá rộng, nó sẽ tóm tắt lan man và có thể bỏ sót đúng chỗ bạn cần." },
            ],
          },
          {
            id: "cite",
            label: "Yêu cầu chỗ trích",
            options: [
              { text: "Chỉ rõ đoạn hoặc trang bạn dựa vào, và nói nếu tài liệu không đề cập.", good: true, feedback: "Bạn có chỗ để mở kiểm, và có lối thoát để nó nói \"không có\" thay vì đoán." },
              { text: "Trả lời ngắn gọn thôi, khỏi giải thích.", feedback: "Bạn mất chỗ để kiểm, và nếu nó sai bạn cũng không biết nó lấy từ đâu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "ask", "cite"],
            text: "Theo tài liệu, khoản chi trên 5 triệu cần trưởng phòng duyệt, kèm phiếu đề nghị và báo giá (mục 4.2, trang 12). Tài liệu không nêu thời gian xử lý.\n\n(Trả lời gọn, có chỗ trích, và nói rõ điều tài liệu không đề cập. Đây là ví dụ minh hoạ.)",
          },
          {
            requires: ["ask"],
            text: "Khoản chi trên 5 triệu thường cần cấp quản lý duyệt và có chứng từ đi kèm.\n\n(Đúng hướng nhưng nói theo thông lệ, không chỉ ra đoạn nào của tài liệu, nên bạn chưa kiểm được.)",
          },
          {
            text: "Quy trình chi tiêu của công ty gồm nhiều bước, trong đó giám đốc tài chính duyệt mọi khoản trên 5 triệu trong vòng 24 giờ...\n\n(Lan man và tự thêm chi tiết như \"24 giờ\" mà không có nguồn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Trước khi tải tài liệu lên, kiểm tra công ty cho phép công cụ nào và loại tài liệu nào. Bảng lương, hợp đồng khách hàng, hồ sơ cá nhân không nên đưa vào công cụ chưa được duyệt.",
      },
      scen(
        "Câu trả lời đã có, trang gốc thì sao",
        "Bạn hỏi ai duyệt khoản chi trên 5 triệu và nhận câu trả lời \"trưởng phòng\" kèm trích dẫn số 2. Bạn đang gấp và sếp đang chờ.",
        ["Chuyển ngay cho sếp vì đã có trích dẫn đi kèm", "Sếp làm theo, nhưng trang gốc ghi khoản trên 5 triệu cần giám đốc duyệt chứ không phải trưởng phòng. Hồ sơ bị trả lại và mất thêm hai ngày."],
        "Bấm vào trích dẫn số 2 để mở đoạn gốc",
        "Đoạn gốc ghi: \"Khoản chi từ 5 triệu đến dưới 20 triệu do trưởng phòng duyệt; từ 20 triệu trở lên do giám đốc duyệt\". Khoản của bạn là 8 triệu.",
        ["Ghi lại đúng câu gốc và số trang, rồi báo sếp", "Sếp nhận câu trả lời kèm số trang, và nếu có ai hỏi lại bạn mở đúng đoạn trong vài giây."],
        ["Sửa câu trả lời thành \"giám đốc\" cho chắc ăn", "Bạn tự đổi mà không đọc hết đoạn, và làm hồ sơ đi sai cấp duyệt."],
        "Việc kiểm mất hai phút và tránh được một lần trả hồ sơ.",
      ),
      {
        type: "closing",
        lines: [
          "Hỏi thẳng vào tài liệu của bạn, rồi mở trang gốc xác nhận.",
          "Bài sau: vì sao trợ lý đọc tài liệu trả lời khác chat thường.",
        ],
      },
    ],
  },
  // ───────────── Bài 2 ─────────────
  {
    id: 2281,
    slug: "tro-ly-doc-tai-lieu-khac-chat-thuong-cho-nao",
    title: "Chặng 44, Bài 2: Trợ lý đọc tài liệu khác trò chuyện thường ở chỗ nào",
    subtitle: "Cùng một câu hỏi, hai nơi trả lời khác nhau: vì một nơi nhìn vào tài liệu của bạn, nơi kia thì không.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nếu bạn không biết hai loại công cụ này khác nhau ở đâu, bạn sẽ hỏi chat thường về quy định nội bộ và tin câu trả lời như thể nó đến từ tài liệu công ty. Hiểu sự khác biệt giúp bạn chọn đúng nơi để hỏi và biết khi nào cần kiểm.",
    openingQuestion:
      "Bạn hỏi cùng câu \"nghỉ phép năm được chuyển sang năm sau không\" ở hai nơi và nhận hai câu trả lời khác nhau. Nguyên nhân cốt lõi nhất là gì?",
    openingOptions: [
      "Một nơi bám vào tài liệu của bạn, nơi kia dùng hiểu biết chung",
      "Một nơi thông minh hơn hẳn nên luôn trả lời đúng hơn dù không đọc tài liệu",
      "Một nơi được cập nhật quy định mới hơn từng ngày",
      "Một nơi cố tình trả lời khác để tạo cảm giác đa dạng",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý đọc tài liệu buộc câu trả lời vào văn bản bạn đưa, còn chat thường trả lời từ những gì nó đã học chung và không biết quy định riêng của công ty bạn. Không có nơi nào \"thông minh hơn\" một cách tuyệt đối, và không nơi nào tự cập nhật nội quy công ty bạn. Chúng cũng không trả lời khác chỉ để đa dạng, mà khác vì nguồn đầu vào khác.",
    diagram: [
      { label: "Câu hỏi của bạn", arrow: true },
      { label: "Nguồn: tài liệu của bạn hay kiến thức chung", arrow: true },
      { label: "Câu trả lời", arrow: true },
      { label: "Cách kiểm: mở đoạn gốc hoặc tra nguồn khác" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên nhân sự hỏi chat thường về chính sách nghỉ phép và nhận câu trả lời nghe rất chuẩn, nhưng khác nội quy công ty. Khi tải nội quy lên trợ lý đọc tài liệu và hỏi lại, câu trả lời chỉ ra đúng điều khoản của công ty. Hai câu trả lời khác nhau vì hai công cụ nhìn vào hai nguồn khác nhau.",
    },
    quiz: [
      q(
        "Điểm khác cốt lõi giữa trợ lý đọc tài liệu và chat thường là gì?",
        "Câu trả lời bám vào tài liệu bạn đưa",
        ["Trợ lý đọc tài liệu chỉ dùng được với tệp có đuôi PDF", "Chat thường không trả lời tiếng Việt", "Trợ lý đọc tài liệu không thể mắc lỗi khi trả lời"],
        "Điểm khác cốt lõi là nguồn của câu trả lời: một bên bám vào tài liệu bạn đưa, một bên dựa vào hiểu biết chung. Kiểu tệp và ngôn ngữ không phải khác biệt cốt lõi, và không công cụ nào miễn nhiễm với lỗi nên bạn vẫn phải kiểm.",
      ),
      q(
        "Bạn hỏi chat thường về nội quy công ty mình chưa từng đưa vào. Câu trả lời nghe rất tự tin. Nên hiểu ra sao?",
        "Đó là suy đoán từ hiểu biết chung, chưa phải nội quy của bạn",
        ["Đó là nội quy của công ty, vì nó nói chắc chắn như vậy", "Đó là nội quy được cập nhật mới nhất từ phòng nhân sự", "Đó là nội quy đúng vì nhiều công ty cũng làm vậy"],
        "Chat thường không thấy tài liệu của bạn nên chỉ nói theo thông lệ chung. Giọng chắc chắn không phải bằng chứng, và nhiều công ty làm giống nhau không có nghĩa công ty bạn giống họ. Nó cũng không có kênh cập nhật nội quy của bạn.",
      ),
      q(
        "Việc nào hợp với trợ lý đọc tài liệu hơn chat thường?",
        "Tìm điều kiện hoàn ứng trong quy trình của công ty bạn",
        ["Nghĩ ra một loạt tên gọi hay cho một sản phẩm mới của cả nhóm", "Viết lại một câu chào hàng cho tự nhiên hơn", "Giải thích khái niệm chung trong ngành cho người mới"],
        "Việc cần đúng theo văn bản riêng của bạn là sở trường của trợ lý đọc tài liệu. Nghĩ tên, viết lại câu hay giải thích khái niệm chung thì không cần tài liệu cụ thể, nên chat thường làm được và thường linh hoạt hơn.",
      ),
      q(
        "Trợ lý đọc tài liệu trả lời sai. Lý do nào có thể xảy ra?",
        "Nó chọn nhầm đoạn hoặc hiểu ngược ý đoạn được chọn",
        ["Nó tự ý sửa tài liệu gốc trước khi trả lời bạn", "Nó cố tình giấu bớt thông tin quan trọng để bạn phải hỏi lại nhiều lần", "Nó không cần đọc tài liệu vì đã biết trước đáp án"],
        "Ngay cả khi bám vào tài liệu, công cụ có thể lấy nhầm đoạn hoặc hiểu sai nghĩa. Nó không sửa tài liệu gốc, không cố tình giấu thông tin, và không thể biết đáp án của tài liệu riêng mà chưa đọc.",
      ),
      q(
        "Bạn muốn biết một khái niệm chung trong ngành, không liên quan tới tài liệu nào của bạn. Chọn gì?",
        "Chat thường, rồi kiểm với một nguồn đáng tin",
        ["Trợ lý đọc tài liệu, tải một tệp trống lên cho có nguồn", "Trợ lý đọc tài liệu, vì chỉ nó mới không bịa được", "Không hỏi công cụ nào, vì khái niệm chung luôn sai"],
        "Câu hỏi chung không cần tài liệu riêng nên chat thường phù hợp, nhưng vẫn kiểm với nguồn đáng tin. Tệp trống không tạo ra nguồn để bám. Không công cụ nào không thể bịa, và khái niệm chung không phải lúc nào cũng sai.",
      ),
    ],
    keyTakeaways: [
      "Khác biệt cốt lõi: nguồn của câu trả lời là tài liệu của bạn hay kiến thức chung.",
      "Việc theo văn bản riêng của công ty: dùng trợ lý đọc tài liệu.",
      "Việc chung, không cần tài liệu: chat thường vẫn hợp.",
      "Cả hai đều có thể sai, nên việc quan trọng luôn cần kiểm.",
    ],
    practicePrompt: {
      question: "Bạn cần biết hạn nộp báo cáo theo hướng dẫn nội bộ của phòng mình. Nên hỏi ở đâu?",
      options: [
        "Trợ lý đọc tài liệu đã nạp hướng dẫn nội bộ đó",
        "Chat thường, vì nó biết hết mọi phòng ban",
        "Hỏi bất kỳ nơi nào, vì câu trả lời giống nhau",
        "Không hỏi nơi nào, vì hạn nộp không có trong tài liệu",
      ],
      correct: 0,
      explanation:
        "Hạn nộp theo hướng dẫn nội bộ chỉ có trong tài liệu của bạn, nên cần công cụ nhìn vào tài liệu đó. Chat thường không biết phòng của bạn, hai nơi trả lời khác nhau như bài đã cho thấy, và không có lý do gì để cho rằng hạn nộp không nằm trong hướng dẫn.",
    },
    summary: {
      keyIdea: "Hai công cụ khác nhau ở nguồn của câu trả lời, nên cùng câu hỏi có thể ra hai kết quả.",
      formula: "Việc theo văn bản riêng → trợ lý đọc tài liệu. Việc chung → chat thường, rồi kiểm nguồn.",
      commonMistake: "Hỏi chat thường về quy định nội bộ rồi coi câu trả lời là quy định của công ty.",
      action: "Lần tới cần tra quy định nội bộ, hãy nạp đúng văn bản thay vì hỏi chung.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một câu hỏi về quy định nội bộ của phòng bạn. Hỏi chat thường trước, ghi lại câu trả lời. Sau đó nạp văn bản quy định vào trợ lý đọc tài liệu (nếu công ty cho phép) và hỏi lại đúng câu đó, rồi so sánh hai câu trả lời với đoạn gốc.",
      secondary: "Ngày mai hãy cho biết hai câu trả lời khác nhau ở đâu và câu nào khớp với văn bản.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn hỏi cùng một câu ở hai công cụ và nhận hai câu trả lời trái nhau. Ai đúng? Bài này giải thích vì sao có chuyện đó, và cách chọn đúng nơi để hỏi cho từng loại việc.",
      },
      {
        type: "feynman",
        title: "Hai cách trả lời đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung hai người: một người đang cầm sẵn cuốn nội quy công ty bạn, người kia chưa từng thấy cuốn đó nhưng đọc rất nhiều sách về nhân sự nói chung.",
        columns: ["Thành phần", "Hai người được hỏi", "Hai công cụ"],
        rows: [
          ["Người cầm nội quy", "Lật đúng điều khoản và đọc cho bạn", "Trợ lý đọc tài liệu, bám vào tài liệu bạn đưa"],
          ["Người chưa thấy nội quy", "Nói theo thông lệ chung", "Chat thường, nói theo hiểu biết chung"],
          ["Điểm dễ sai", "Người thứ hai nói rất chắc dù chưa thấy cuốn sách", "Chat thường nói tự tin về quy định riêng"],
          ["Cách kiểm", "Xem điều khoản trong cuốn nội quy", "Mở đoạn gốc của tài liệu"],
        ],
        oneLiner: "Cùng câu hỏi, hai nguồn khác nhau cho hai câu trả lời khác nhau; nguồn của bạn mới là chuẩn.",
      },
      { type: "heading", text: "Nguồn quyết định câu trả lời" },
      {
        type: "paragraph",
        text: "Chat thường trả lời từ những gì nó đã học chung: nó giỏi giải thích, viết nháp, gợi ý. Nhưng nó không biết quy định riêng của công ty bạn, và khi không biết, nó vẫn có thể viết một câu nghe hợp lý. Trợ lý đọc tài liệu thu hẹp lại: nó lấy đoạn từ tài liệu bạn đưa để trả lời, nên bạn có chỗ để kiểm.",
      },
      {
        type: "flow",
        title: "Hai con đường của cùng một câu hỏi",
        steps: [
          { label: "Bạn đặt một câu hỏi", detail: "Ví dụ: nghỉ phép năm có được chuyển sang năm sau không." },
          { label: "Chat thường: dùng hiểu biết chung", detail: "Nó nói theo thông lệ, không biết nội quy riêng của bạn." },
          { label: "Trợ lý đọc tài liệu: tìm trong tài liệu", detail: "Nó lấy đoạn liên quan trong văn bản bạn nạp vào." },
          { label: "Hai câu trả lời có thể khác nhau", detail: "Khác nhau vì nguồn khác nhau, không phải vì một bên cố tình sai." },
          { label: "Bạn đối chiếu với đoạn gốc", detail: "Văn bản của công ty là nơi phân xử." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hợp với trợ lý đọc tài liệu",
          text: "Điều kiện, hạn nộp, người duyệt, ngoại lệ trong văn bản riêng của bạn. Việc cần chỗ để mở kiểm ngay.",
        },
        right: {
          label: "Hợp với chat thường",
          text: "Nghĩ tên, viết nháp, đổi giọng văn, giải thích khái niệm chung. Việc không cần đúng theo một văn bản cụ thể.",
        },
      },
      {
        type: "list",
        items: [
          "Việc cần đúng theo văn bản riêng: dùng công cụ nhìn vào văn bản đó.",
          "Việc chung, cần ý tưởng: chat thường rất hợp.",
          "Khi hai nơi trả lời khác nhau, đừng chọn theo giọng chắc chắn hơn: mở văn bản gốc.",
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận",
        text: "Câu trả lời tự tin không có nghĩa là bám tài liệu. Nếu công cụ không chỉ ra được đoạn nào của văn bản, hãy coi đó là hiểu biết chung chứ không phải quy định của công ty.",
      },
      scen(
        "Hai câu trả lời, một quyết định",
        "Chị Hà hỏi chat thường: \"nghỉ phép năm có chuyển sang năm sau không\" và nhận câu \"được chuyển tối đa 5 ngày\". Chị chuẩn bị trả lời một nhân viên đang chờ.",
        ["Trả lời luôn theo câu của chat thường", "Nhân viên lên kế hoạch nghỉ theo 5 ngày, nhưng nội quy công ty không cho chuyển. Đầu năm sau anh bị trừ ngày phép và khiếu nại tới chị."],
        "Nạp nội quy vào trợ lý đọc tài liệu và hỏi lại",
        "Trợ lý trả lời: \"Nội quy không cho chuyển ngày phép sang năm sau\", kèm trích dẫn tới mục 3. Câu trả lời này khác câu của chat thường.",
        ["Mở mục 3 trong nội quy để đọc lại rồi trả lời", "Chị đọc đúng điều khoản, xác nhận không được chuyển và trả lời nhân viên kèm số mục."],
        ["Bỏ qua trích dẫn, chọn câu trả lời mà chị thấy hợp lý hơn", "Chị chọn theo cảm giác và có thể chọn sai, vì không ai mở nội quy để phân xử."],
        "Nhân viên biết sớm để sắp xếp nghỉ đúng quy định.",
      ),
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát câu trả lời của chat thường",
        task: "Bạn hỏi chat thường về nội quy công ty mà nó chưa từng thấy. Nội quy thật chỉ ghi: \"Ngày phép không dùng hết sẽ hết hiệu lực vào ngày 31/12. Nghỉ phép cần báo trước ít nhất 3 ngày làm việc.\" Đánh dấu những câu nó tự thêm.",
        segments: [
          { text: "Ngày phép không dùng hết sẽ hết hiệu lực vào cuối năm." },
          { text: "Bạn được chuyển tối đa 5 ngày sang quý đầu của năm sau.", error: "Nội quy không cho chuyển ngày phép, nên đây là chi tiết chat thường tự thêm theo thông lệ chung." },
          { text: "Nghỉ phép cần báo trước ít nhất 3 ngày làm việc." },
          { text: "Nghỉ liền quá 10 ngày phải được giám đốc duyệt.", error: "Nội quy không nhắc tới mức 10 ngày hay giám đốc duyệt; đây là một điều luật nghe hợp lý nhưng chưa từng có." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Khác nhau ở nguồn: tài liệu của bạn hay hiểu biết chung.",
          "Bài sau: cách viết câu hỏi cụ thể để được câu trả lời dùng được.",
        ],
      },
    ],
  },
  // ───────────── Bài 3 ─────────────
  {
    id: 2282,
    slug: "cau-hoi-tot-cho-tai-lieu-cu-the-thay-vi-chung-chung",
    title: "Chặng 44, Bài 3: Câu hỏi tốt cho tài liệu: cụ thể thay vì chung chung",
    subtitle: "\"Tóm tắt giúp tôi\" cho ra thứ nhạt. Ba câu hỏi nhắm đúng việc thì cho ra thứ bạn dùng được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎯",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Câu hỏi quyết định chất lượng câu trả lời. \"Tóm tắt\" làm công cụ tự quyết định điều gì quan trọng, và nó chọn theo cách chung nhất. Viết lại thành vài câu nhắm đúng việc của bạn là cách rẻ nhất để nhận về thứ dùng được ngay.",
    openingQuestion:
      "Bạn tải hợp đồng dịch vụ lên và gõ \"tóm tắt giúp tôi\". Kết quả là năm đoạn văn chung chung. Cách sửa hiệu quả nhất là gì?",
    openingOptions: [
      "Hỏi vài câu cụ thể về những điều bạn cần biết",
      "Gõ lại \"tóm tắt\" nhiều lần cho tới khi hay hơn",
      "Thêm chữ \"làm ơn\" để nó cố gắng hơn khi trả lời",
      "Yêu cầu nó tóm tắt dài gấp ba để có nhiều ý hơn",
    ],
    correctOption: 0,
    explanation:
      "\"Tóm tắt\" để công cụ tự chọn điều quan trọng, nên nó chọn theo mức phổ biến chứ không theo việc của bạn. Những câu hỏi cụ thể như thời hạn, mức phạt, điều kiện chấm dứt đưa nó tới đúng chỗ bạn cần. Gõ lại cùng yêu cầu vẫn cho cùng loại kết quả, lời lịch sự không thêm thông tin, và tóm tắt dài hơn chỉ làm dày phần chung chung.",
    diagram: [
      { label: "Việc bạn cần làm với tài liệu", arrow: true },
      { label: "Tách thành vài câu hỏi cụ thể", arrow: true },
      { label: "Mỗi câu trả lời kèm chỗ trích", arrow: true },
      { label: "Bạn kiểm từng câu ở trang gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên mua hàng cần đọc hợp đồng nhà cung cấp trước buổi ký. Yêu cầu \"tóm tắt hợp đồng\" trả về năm đoạn chung chung. Khi chị đổi thành ba câu hỏi về thời hạn thanh toán, mức phạt trễ giao hàng và điều kiện chấm dứt, chị nhận ba câu trả lời ngắn có trích dẫn, mở đúng ba điều khoản và ghi chú để hỏi bộ phận pháp chế.",
    },
    quiz: [
      q(
        "Vì sao \"tóm tắt giúp tôi\" thường cho kết quả nhạt?",
        "Công cụ phải tự chọn điều gì là quan trọng",
        ["Công cụ không hiểu từ \"tóm tắt\" nên trả lời ngẫu nhiên", "Tóm tắt luôn quá ngắn nên bỏ hết chi tiết cần thiết", "Tài liệu thường quá dài nên công cụ từ chối đọc hết"],
        "Khi bạn không nói mình cần gì, công cụ tự chọn theo mức phổ biến, kết quả nhạt và không nhắm đúng việc của bạn. Công cụ hiểu từ \"tóm tắt\" rất rõ, độ dài do bạn hoặc công cụ chọn chứ không luôn ngắn, và không phải lúc nào nó cũng từ chối tài liệu dài.",
      ),
      q(
        "Câu nào là cách viết lại tốt hơn cho \"tóm tắt hợp đồng\"?",
        "Thời hạn thanh toán và mức phạt khi giao trễ là gì",
        ["Hợp đồng này nói gì, nói ngắn hơn giúp tôi", "Cho tôi biết hợp đồng có tốt hay không", "Liệt kê mọi từ khoá quan trọng của hợp đồng này"],
        "Câu tốt nhắm vào những việc bạn cần biết và có thể trả lời bằng một điều khoản để kiểm. \"Nói ngắn hơn\" vẫn để công cụ tự chọn, còn \"tốt hay không\" là ý kiến chứ không phải nội dung tài liệu. Liệt kê mọi từ khoá cũng không nhắm vào việc của bạn.",
      ),
      q(
        "Một câu hỏi tốt cho tài liệu thường có đặc điểm nào?",
        "Nhắm vào một việc và có thể trả lời bằng một đoạn",
        ["Đủ rộng để công cụ tự do chọn hướng trả lời", "Có nhiều câu hỏi nhỏ dồn vào chung một câu dài", "Dùng từ chuyên môn nhất có thể để câu hỏi trông chính xác hơn"],
        "Câu hỏi tốt hẹp và trả lời được bằng một đoạn cụ thể, nên dễ kiểm. Câu quá rộng để công cụ tự do chọn hướng, dồn nhiều câu vào một câu dài làm câu trả lời lẫn lộn, còn từ chuyên môn không làm câu hỏi chính xác hơn nếu bạn không nêu rõ việc cần biết.",
      ),
      q(
        "Bạn cần chuẩn bị cho buổi ký hợp đồng. Bộ câu hỏi nào hợp lý?",
        "Ba câu về thời hạn, mức phạt và điều kiện chấm dứt",
        ["Một câu duy nhất: hãy tóm tắt và phân tích rủi ro cho tôi", "Câu hỏi về lịch sử của công ty đối tác trên mạng", "Mười câu hỏi giống hệt nhau chỉ khác vài từ"],
        "Ba câu nhắm vào ba việc bạn cần cân nhắc khi ký, và mỗi câu có chỗ trích để mở kiểm. Một câu \"phân tích rủi ro\" quá rộng và đòi hỏi nhận định, lịch sử công ty đối tác không nằm trong hợp đồng, còn mười câu gần giống nhau cho mười câu trả lời giống nhau.",
      ),
      q(
        "Sau khi nhận ba câu trả lời cho hợp đồng, bước hợp lý nhất là gì?",
        "Mở đúng điều khoản được trích cho từng câu",
        ["Chỉ đọc câu trả lời đầu tiên vì thường đúng nhất", "Gộp ba câu thành một câu rồi hỏi lại công cụ", "Bỏ qua trích dẫn nếu ba câu nghe khớp nhau"],
        "Mỗi câu trả lời có chỗ trích riêng, nên cần mở từng điều khoản để kiểm. Câu đầu không đúng hơn các câu sau, gộp lại và hỏi lại chỉ làm mất chỗ để kiểm, và ba câu nghe khớp nhau không chứng minh chúng khớp với hợp đồng.",
      ),
    ],
    keyTakeaways: [
      "\"Tóm tắt\" để công cụ tự chọn điều quan trọng; câu hỏi cụ thể chọn thay bạn.",
      "Tách việc của bạn thành vài câu hỏi hẹp, mỗi câu một việc.",
      "Nhắm vào thứ kiểm được: con số, thời hạn, điều kiện, người phụ trách.",
      "Mỗi câu trả lời cần một chỗ trích để bạn mở kiểm.",
    ],
    practicePrompt: {
      question: "Bạn cần chuẩn bị họp về một báo cáo quý dài 40 trang. Câu hỏi nào tốt nhất để bắt đầu?",
      options: [
        "Chỉ số nào giảm so với quý trước và theo báo cáo vì sao",
        "Tóm tắt báo cáo này trong ba dòng cho tôi",
        "Báo cáo này có quan trọng với công ty hay không",
        "Cho tôi biết mọi điều thú vị và đáng chú ý nhất trong báo cáo",
      ],
      correct: 0,
      explanation:
        "Câu này nhắm vào một việc bạn cần cho buổi họp và trả lời được bằng những đoạn cụ thể để kiểm. Tóm tắt ba dòng, \"có quan trọng hay không\" và \"điều thú vị\" đều để công cụ tự quyết định điều gì đáng nói, nên kết quả nhạt hoặc lệch khỏi việc của bạn.",
    },
    summary: {
      keyIdea: "Câu hỏi cụ thể đưa công cụ tới đúng chỗ; câu chung chung để nó tự chọn thay bạn.",
      formula: "Việc của bạn → ba câu hỏi hẹp → mỗi câu một chỗ trích → kiểm từng chỗ.",
      commonMistake: "Bắt đầu bằng \"tóm tắt\" rồi thất vọng vì kết quả nhạt.",
      action: "Viết lại một yêu cầu \"tóm tắt\" gần đây của bạn thành ba câu hỏi hẹp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu công việc bạn từng nhờ \"tóm tắt\". Viết ra giấy việc bạn thật sự cần làm với nó, rồi biến thành ba câu hỏi hẹp. Hỏi trợ lý đọc tài liệu (nếu công ty cho phép) và mở chỗ trích của từng câu để kiểm.",
      secondary: "Ngày mai hãy so sánh: ba câu hỏi hẹp có dùng được hơn bản tóm tắt cũ không?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có hợp đồng dài và chỉ vài phút để chuẩn bị. Gõ \"tóm tắt giúp tôi\" là phản xạ, nhưng kết quả thường nhạt. Bài này cho bạn cách viết lại thành vài câu hỏi đúng việc.",
      },
      {
        type: "feynman",
        title: "Câu hỏi tốt đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ đồng nghiệp xem giúp một tệp dày. Nói \"xem giúp anh\" thì họ sẽ báo lại điều họ thấy quan trọng. Nói \"xem thời hạn thanh toán ghi thế nào\" thì họ tìm đúng chỗ.",
        columns: ["Thành phần", "Nhờ đồng nghiệp", "Hỏi trợ lý đọc tài liệu"],
        rows: [
          ["Nhờ chung chung", "\"Xem giúp anh\"", "\"Tóm tắt giúp tôi\""],
          ["Kết quả", "Họ chọn điều họ cho là quan trọng", "Công cụ chọn theo mức phổ biến"],
          ["Nhờ cụ thể", "\"Thời hạn thanh toán ghi thế nào\"", "Câu hỏi hẹp về đúng việc bạn cần"],
          ["Kết quả", "Họ lật đúng trang", "Câu trả lời ngắn, có chỗ trích"],
        ],
        oneLiner: "Hỏi hẹp là chỉ cho công cụ đúng trang cần đọc, thay vì để nó tự quyết định.",
      },
      { type: "heading", text: "Từ một việc thành ba câu hỏi" },
      {
        type: "paragraph",
        text: "Trước khi hỏi, hãy tự trả lời: sau khi đọc tài liệu này, tôi sẽ làm gì? Ký hợp đồng, chuẩn bị họp, trả lời một khách hàng? Mỗi việc sinh ra vài điều bạn cần biết, và mỗi điều là một câu hỏi hẹp. Ba câu hỏi hẹp thường đáng giá hơn một bản tóm tắt dài.",
      },
      {
        type: "flow",
        title: "Viết lại \"tóm tắt\" thành câu hỏi",
        steps: [
          { label: "Nêu việc bạn cần làm", detail: "Ví dụ: chuẩn bị ký hợp đồng với nhà cung cấp." },
          { label: "Liệt kê điều cần biết để làm việc đó", detail: "Thời hạn thanh toán, mức phạt trễ, điều kiện chấm dứt." },
          { label: "Mỗi điều là một câu hỏi hẹp", detail: "Một câu một việc, dễ trả lời bằng một đoạn." },
          { label: "Yêu cầu chỗ trích cho từng câu", detail: "Bạn cần biết mở đoạn nào để kiểm." },
          { label: "Mở kiểm từng chỗ", detail: "Đọc lại đoạn gốc và ghi đúng hay sai." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu hỏi chung chung",
          text: "\"Tóm tắt giúp tôi\", \"hợp đồng này có ổn không\", \"cho tôi biết điều quan trọng\". Công cụ tự chọn và tự đánh giá thay bạn, khó kiểm.",
        },
        right: {
          label: "Câu hỏi cụ thể",
          text: "\"Thời hạn thanh toán là bao nhiêu ngày\", \"mức phạt khi giao trễ ghi thế nào\", \"điều kiện chấm dứt là gì\". Mỗi câu kiểm được bằng một điều khoản.",
        },
      },
      {
        type: "list",
        items: [
          "Bắt đầu bằng việc bạn sẽ làm, không phải bằng công cụ.",
          "Mỗi câu hỏi chỉ một việc và nên có con số, hạn, người hoặc điều kiện.",
          "Yêu cầu chỗ trích và cho phép nó nói \"tài liệu không nêu\".",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết lại yêu cầu tóm tắt hợp đồng",
        task: "Bạn chuẩn bị ký hợp đồng nhà cung cấp và có 10 phút. Lắp yêu cầu cho trợ lý đọc tài liệu.",
        parts: [
          {
            id: "goal",
            label: "Việc bạn cần làm",
            options: [
              { text: "Tôi chuẩn bị ký hợp đồng này và cần biết những điều kiện ảnh hưởng tới chi phí của tôi.", good: true, feedback: "Nêu việc bạn sẽ làm, nên công cụ biết điều gì là quan trọng với bạn." },
              { text: "Tóm tắt giúp tôi.", feedback: "Không nói việc của bạn, nên nó tự chọn theo mức phổ biến." },
            ],
          },
          {
            id: "questions",
            label: "Các câu hỏi",
            options: [
              { text: "Trả lời ba câu: thời hạn thanh toán, mức phạt khi giao trễ, điều kiện chấm dứt.", good: true, feedback: "Ba câu hẹp, mỗi câu kiểm được bằng một điều khoản." },
              { text: "Cho tôi biết hợp đồng này có rủi ro gì không.", feedback: "Quá rộng và đòi nhận định, nên nó có thể thêm rủi ro không có trong văn bản." },
            ],
          },
          {
            id: "cite",
            label: "Chỗ trích",
            options: [
              { text: "Với mỗi câu, chỉ ra điều khoản bạn dựa vào; nếu hợp đồng không nêu thì nói rõ.", good: true, feedback: "Bạn có chỗ để mở kiểm, và nó có lối thoát thay vì đoán." },
              { text: "Trả lời tự nhiên, không cần nhắc tới điều khoản.", feedback: "Bạn không biết mở đoạn nào để kiểm, và nếu nó thêm chi tiết bạn khó phát hiện." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "questions", "cite"],
            text: "1. Thời hạn thanh toán: 30 ngày kể từ ngày nhận hoá đơn (Điều 5).\n2. Phạt giao trễ: hợp đồng không nêu mức phạt cụ thể.\n3. Chấm dứt: mỗi bên báo trước bằng văn bản (Điều 9).\n\n(Ví dụ minh hoạ: ba câu ngắn, có điều khoản, và nói rõ chỗ hợp đồng không nêu.)",
          },
          {
            requires: ["questions"],
            text: "Thời hạn thanh toán là 30 ngày; giao trễ bị phạt 0,5% mỗi ngày; chấm dứt cần báo trước 15 ngày.\n\n(Có đủ ba ý nhưng không chỉ ra điều khoản, và \"0,5% mỗi ngày\" bạn không kiểm được.)",
          },
          {
            text: "Hợp đồng quy định quyền và nghĩa vụ của hai bên về việc cung cấp dịch vụ, thanh toán và xử lý tranh chấp, nhìn chung là cân bằng...\n\n(Nhạt và chung chung; câu \"cân bằng\" là nhận định không có trong văn bản.)",
          },
        ],
      },
      scen(
        "Chuẩn bị họp trong 15 phút",
        "Bạn nhận báo cáo quý 40 trang lúc 13 giờ, họp lúc 13 giờ 15. Bạn cần biết điều gì đã đổi so với quý trước.",
        ["Gõ \"tóm tắt báo cáo\" và đọc nguyên văn khi họp", "Bản tóm tắt chung chung, sếp hỏi chỉ số nào giảm và vì sao thì bạn không có câu trả lời."],
        "Viết ba câu hỏi: chỉ số nào giảm, vì sao theo báo cáo, ai phụ trách",
        "Ba câu trả lời ngắn có trích dẫn. Câu thứ hai nói doanh thu vùng phía Nam giảm vì hai khách lớn hoãn đơn, kèm số trang.",
        ["Mở đúng trang được trích cho từng câu rồi mới vào họp", "Bạn đọc lại hai đoạn gốc, khớp với câu trả lời, và ghi số trang vào ghi chú. Khi sếp hỏi, bạn trả lời được ngay."],
        ["Nhớ ba câu trả lời và bỏ qua trích dẫn vì đã có ba câu rõ ràng", "Bạn nói tự tin, nhưng một câu trích sai chỗ và không ai kịp mở lại trong buổi họp."],
        "Bạn vào họp với ba điều đã kiểm.",
      ),
      {
        type: "closing",
        lines: [
          "Hỏi hẹp, một việc một câu, kèm chỗ trích.",
          "Bài sau: khi câu trả lời không hề có trong tài liệu.",
        ],
      },
    ],
  },
  // ───────────── Bài 4 ─────────────
  {
    id: 2283,
    slug: "cau-tra-loi-khong-co-trong-tai-lieu",
    title: "Chặng 44, Bài 4: Khi câu trả lời không hề có trong tài liệu",
    subtitle: "Một công cụ tốt dám nói \"tài liệu không nêu\". Một công cụ tệ thì đoán và nghe rất thuyết phục.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🕳️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Thứ nguy hiểm nhất không phải câu trả lời sai rõ ràng mà là câu trả lời bịa nghe hợp lý cho điều tài liệu không hề nói. Biết cách thử xem công cụ có dám nói \"không có\" giúp bạn biết khi nào có thể tin nó, và khi nào phải hạ cảnh giác.",
    openingQuestion:
      "Bạn hỏi bản quy trình về mức phạt nộp hồ sơ trễ, nhưng văn bản không đề cập chuyện đó. Trợ lý trả lời \"phạt 2% mỗi ngày\". Điều này cho bạn biết gì?",
    openingOptions: [
      "Nó đã điền vào chỗ trống bằng điều không có trong tài liệu",
      "Nó tìm thấy mức phạt ở một trang mà bạn đã bỏ sót",
      "Nó đã tra quy định chung của luật và điền vào giúp bạn cho đủ ý",
      "Nó đưa ra một con số cố tình để bạn hỏi lại thêm",
    ],
    correctOption: 0,
    explanation:
      "Khi văn bản không nói về mức phạt, mọi con số cụ thể đều là thứ công cụ tự thêm vào để trả lời cho trọn. Bạn có thể kiểm bằng cách hỏi nó chỉ đoạn nào, và nếu không có đoạn nào thì đó là bịa. Nó không tra luật thay bạn, không cố tình đưa số để bạn hỏi lại, và nếu có ở trang khác thì nó chỉ ra được trang đó.",
    diagram: [
      { label: "Hỏi điều tài liệu không nói", arrow: true },
      { label: "Công cụ tốt: nói tài liệu không nêu", arrow: true },
      { label: "Công cụ tệ: đoán và viết như thật", arrow: true },
      { label: "Bạn đòi chỗ trích để phân biệt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một kế toán hỏi trợ lý đọc tài liệu về thời hạn hoàn ứng trong bản quy trình không nêu hạn đó. Lần đầu nó đưa ra \"10 ngày\" nghe rất chắc. Khi chị hỏi \"chỉ ra đoạn nào\", nó không chỉ được. Chị chuyển sang hỏi trưởng phòng và biết công ty chưa có quy định về hạn.",
    },
    quiz: [
      q(
        "Bạn hỏi điều tài liệu không hề nêu. Phản hồi nào cho thấy công cụ đáng tin hơn?",
        "Tài liệu không nêu điều này",
        ["Một con số cụ thể đi kèm lời giải thích rất chi tiết", "Câu trả lời dài và trang trọng nhưng không có trích dẫn", "Một câu trả lời theo cách làm phổ biến của nhiều công ty"],
        "Với điều không có trong văn bản, câu đáng tin nhất là thừa nhận tài liệu không nêu. Số cụ thể và giải thích chi tiết chỉ làm câu bịa nghe thuyết phục hơn. Trả lời dài mà không có trích dẫn khiến bạn không kiểm được, và cách làm phổ biến không phải quy định của bạn.",
      ),
      q(
        "Cách thử đơn giản nhất để biết công cụ có bịa không là gì?",
        "Hỏi một điều bạn chắc chắn tài liệu không nói và xem phản ứng",
        ["Hỏi đúng một câu mà cả ba lần đều được trả lời khớp nhau", "Hỏi bằng giọng thật nghiêm khắc, dọa trước để nó không dám bịa", "Đếm số chữ của câu trả lời để đoán độ chính xác"],
        "Bạn chủ động đưa ra một câu bẫy mà bạn biết không có đáp án, rồi xem nó nói \"không có\" hay bịa. Ba lần khớp nhau chưa chắc đúng vì nó có thể bịa nhất quán, giọng nghiêm khắc không đổi cách nó hoạt động, và độ dài câu trả lời không nói gì về độ chính xác.",
      ),
      q(
        "Trợ lý đưa ra \"phạt 2% mỗi ngày\" mà tài liệu không nói. Bạn nên làm gì tiếp?",
        "Hỏi nó chỉ ra đoạn nào chứa câu đó",
        ["Ghi con số vào báo cáo vì nó rất cụ thể", "Hỏi lại cùng câu nhiều lần và lấy con số xuất hiện nhiều", "Chuyển con số này cho đối tác để họ xác nhận giúp bạn luôn"],
        "Đòi chỗ trích là cách nhanh nhất để lộ ra một con số bịa: nếu không có đoạn nào, nó không có nguồn. Tự cụ thể không chứng minh gì, hỏi lại nhiều lần vẫn là cùng một công cụ, và chuyển con số chưa kiểm cho đối tác là lan truyền điều có thể sai.",
      ),
      q(
        "Vì sao một câu bịa lại dễ tin hơn một câu nói \"tài liệu không nêu\"?",
        "Vì nó được viết trôi chảy và đầy đủ như một câu trả lời thật",
        ["Vì công cụ chỉ bịa khi nó cực kỳ chắc chắn về điều đó", "Vì câu bịa luôn dài hơn và có nhiều số liệu hơn", "Vì người dùng thường không có tài liệu để đối chiếu"],
        "Công cụ viết trôi chảy nên câu bịa có hình thức y như câu đúng, và câu \"không nêu\" nghe như thất bại dù đó là câu trung thực. Công cụ bịa không cần chắc chắn, câu bịa không phải lúc nào cũng dài hơn, và người dùng vẫn có tài liệu để đối chiếu.",
      ),
      q(
        "Bạn muốn giảm khả năng công cụ tự điền chỗ trống. Câu dặn nào hợp lý?",
        "Chỉ dựa vào tài liệu này, nếu không nêu thì nói rõ là không nêu",
        ["Luôn trả lời đầy đủ, không được để trống bất cứ ý nào", "Trả lời càng chi tiết càng tốt, kể cả khi tài liệu ngắn và không có ý đó", "Nếu không chắc thì cứ đoán theo cách làm thông thường"],
        "Câu dặn cho phép nói \"không nêu\" và giới hạn nguồn giúp giảm việc tự điền. Yêu cầu không được để trống, chi tiết tối đa hoặc đoán theo thông lệ đều khuyến khích công cụ thêm thứ không có trong văn bản.",
      ),
    ],
    keyTakeaways: [
      "Điều không có trong tài liệu, công cụ vẫn có thể trả lời và nghe rất thật.",
      "Thử: hỏi điều bạn chắc chắn không có và xem nó nói \"không nêu\" hay bịa.",
      "Đòi chỗ trích: câu không có đoạn nào là câu đáng ngờ.",
      "Cho phép công cụ nói \"tài liệu không nêu\" ngay trong yêu cầu.",
    ],
    practicePrompt: {
      question: "Bạn hỏi mức phạt mà văn bản không nêu và nhận con số cụ thể. Bước tiếp theo hợp lý là gì?",
      options: [
        "Hỏi nó chỉ ra đoạn chứa con số đó",
        "Ghi con số vào để đủ thông tin trong báo cáo",
        "Hỏi lại tới khi nó đưa ra con số khác dễ tin hơn",
        "Tin con số vì công cụ đã đọc kỹ tài liệu",
      ],
      correct: 0,
      explanation:
        "Đòi chỗ trích phân biệt được câu có nguồn và câu tự thêm. Ghi vào báo cáo hoặc tin vì \"đã đọc kỹ\" là chấp nhận điều chưa kiểm, và hỏi lại tới khi ra con số dễ tin hơn chỉ chọn câu bịa nghe đẹp nhất.",
    },
    summary: {
      keyIdea: "Công cụ tốt dám nói \"tài liệu không nêu\"; hãy thử nó bằng câu hỏi bạn biết không có đáp án.",
      formula: "Hỏi điều không có → xem nó nói gì → đòi chỗ trích → không có đoạn nào thì coi là bịa.",
      commonMistake: "Thấy một con số cụ thể là coi như đã có nguồn.",
      action: "Thêm câu \"nếu tài liệu không nêu thì nói rõ\" vào mọi yêu cầu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu bạn biết rõ. Viết hai câu hỏi có đáp án trong tài liệu và hai câu hỏi bạn chắc chắn không có. Hỏi cả bốn câu, ghi lại công cụ nói \"không nêu\" hay tự đưa ra câu trả lời ở hai câu bẫy.",
      secondary: "Ngày mai hãy cho biết công cụ có bịa ở câu bẫy nào không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn hỏi một điều mà tài liệu không hề nói, và công cụ vẫn trả lời rất gọn gàng. Bài này dạy bạn cách thử để biết nó đang đọc hay đang đoán.",
      },
      {
        type: "feynman",
        title: "Nói \"không có\" đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn hỏi một đồng nghiệp về một điều khoản mà cuốn sổ không hề có. Người trung thực nói \"cuốn này không nói\". Người sợ mất mặt thì đoán một câu nghe hợp lý.",
        columns: ["Thành phần", "Hai người đồng nghiệp", "Hai kiểu công cụ"],
        rows: [
          ["Người trung thực", "\"Cuốn này không nói chuyện đó\"", "Công cụ nói tài liệu không nêu"],
          ["Người đoán", "Nói một con số nghe rất chắc", "Công cụ điền chỗ trống bằng điều không có"],
          ["Hậu quả", "Bạn hành động theo điều bịa", "Báo cáo chứa số liệu không có nguồn"],
          ["Cách phân biệt", "Hỏi \"anh xem ở trang nào\"", "Đòi chỗ trích cho câu trả lời"],
        ],
        oneLiner: "Đừng chỉ nghe câu trả lời: hãy hỏi nó xem ở đâu, vì câu bịa không có chỗ để chỉ.",
      },
      { type: "heading", text: "Vì sao công cụ lại điền vào chỗ trống" },
      {
        type: "paragraph",
        text: "Công cụ được xây để viết câu trả lời trôi chảy. Khi văn bản không có điều bạn hỏi, một câu nghe hợp lý vẫn dễ viết hơn một câu từ chối. Bạn không thể nhìn vào câu trả lời mà biết nó bịa: hình thức của nó giống hệt câu đúng. Nên cần một phép thử.",
      },
      {
        type: "flow",
        title: "Phép thử câu bẫy",
        steps: [
          { label: "Chọn một điều tài liệu không nói", detail: "Bạn phải chắc chắn văn bản không đề cập điều đó." },
          { label: "Hỏi thẳng như một câu hỏi bình thường", detail: "Đừng gợi ý rằng đây là câu bẫy." },
          { label: "Đọc phản ứng", detail: "Nói \"không nêu\" là dấu hiệu tốt; đưa con số cụ thể là dấu hiệu cần cẩn thận." },
          { label: "Đòi chỗ trích", detail: "Hỏi nó chỉ ra đoạn nào; nếu không chỉ được thì đó là câu bịa." },
          { label: "Ghi kết quả", detail: "Bạn biết công cụ này đáng tin đến đâu với loại tài liệu của bạn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dấu hiệu tốt",
          text: "Nói rõ \"tài liệu không nêu\", chỉ ra đúng đoạn khi có, và phân biệt điều văn bản nói với điều nó suy ra.",
        },
        right: {
          label: "Dấu hiệu cần cẩn thận",
          text: "Con số rất cụ thể mà không chỉ được đoạn nào, câu trả lời quá trọn vẹn cho câu hỏi bạn biết là khó, và giọng chắc chắn tuyệt đối.",
        },
      },
      {
        type: "list",
        items: [
          "Thêm câu \"nếu tài liệu không nêu thì nói rõ\" vào yêu cầu.",
          "Đòi chỗ trích cho mọi con số, ngày, tên, mức phạt.",
          "Thấy một chi tiết bạn không nhớ từng đọc, hãy mở trang gốc tìm nó.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát câu trả lời về mức phạt",
        task: "Bạn hỏi trợ lý về việc nộp hồ sơ hoàn ứng trễ. Văn bản chỉ ghi: \"Hồ sơ hoàn ứng nộp trong 10 ngày kể từ khi kết thúc công tác. Hồ sơ gửi về phòng kế toán.\" Đánh dấu những câu trợ lý tự thêm.",
        segments: [
          { text: "Hồ sơ hoàn ứng phải được nộp trong 10 ngày kể từ khi kết thúc công tác." },
          { text: "Hồ sơ được gửi về phòng kế toán." },
          { text: "Nộp trễ bị phạt 2% số tiền tạm ứng cho mỗi ngày trễ.", error: "Văn bản không nói gì về mức phạt; con số 2% là công cụ tự điền." },
          { text: "Sau 30 ngày không hoàn ứng, khoản tiền sẽ bị trừ vào lương.", error: "Không có điều khoản nào về trừ lương trong văn bản; đây là hậu quả do công cụ tự nghĩ ra." },
        ],
      },
      scen(
        "Câu hỏi bẫy trước khi tin",
        "Bạn sắp dùng trợ lý đọc tài liệu cho một bộ quy trình nhiều trang. Bạn muốn biết nó có bịa không trước khi dựa vào nó.",
        ["Dùng luôn cho việc thật vì nó trả lời nhanh và nghe chắc", "Bạn dựa vào một câu trả lời về mức phạt mà văn bản không có. Đối tác hỏi lại điều khoản đó và bạn không chỉ ra được."],
        "Hỏi thử một điều bạn chắc chắn văn bản không nói",
        "Bạn hỏi \"mức phạt khi nộp trễ\" và công cụ trả lời \"phạt 2% mỗi ngày\". Bạn biết văn bản không có mức phạt.",
        ["Hỏi nó chỉ ra đoạn nào và ghi lại rằng công cụ này cần kiểm kỹ", "Nó không chỉ được đoạn nào. Bạn ghi chú: với công cụ này, mọi con số phải mở trang gốc, và luôn thêm câu dặn \"nếu không nêu thì nói rõ\"."],
        ["Bỏ qua vì con số nghe hợp lý và chuyển sang việc khác", "Bạn quên chuyện đó và sau này tin một con số bịa tương tự vào báo cáo thật."],
        "Bạn biết cách dùng công cụ này an toàn hơn.",
      ),
      {
        type: "closing",
        lines: [
          "Thử bằng câu hỏi không có đáp án, rồi đòi chỗ trích.",
          "Bài sau: gom thành một bộ câu hỏi cho tài liệu công việc thật của bạn.",
        ],
      },
    ],
  },
  // ───────────── Bài 5 ─────────────
  {
    id: 2284,
    slug: "du-an-nho-bo-cau-hoi-cho-mot-tai-lieu-cong-viec",
    title: "Chặng 44, Bài 5: Dự án nhỏ: bộ câu hỏi cho một tài liệu công việc của bạn",
    subtitle: "Chọn một tài liệu thật, viết 5 câu hỏi, chấm mỗi câu trả lời đúng hay sai theo trang gốc.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước đã dạy từng mảnh: hỏi cụ thể, đòi chỗ trích, thử câu bẫy. Bài này ghép lại thành một việc bạn làm với tài liệu thật của mình và có kết quả đo được: bao nhiêu câu trả lời đúng, sai một phần, sai. Số liệu đó là cơ sở để biết nên tin công cụ tới đâu.",
    openingQuestion:
      "Bạn chọn một tài liệu công việc thật để làm dự án. Tiêu chí nào giúp chọn tài liệu tốt nhất cho việc này?",
    openingOptions: [
      "Tài liệu bạn biết rõ, đủ dài và không nhạy cảm",
      "Tài liệu mới nhất vì công cụ chưa từng thấy nó",
      "Tài liệu bạn chưa đọc để công cụ tìm hộ bạn",
      "Tài liệu nhạy cảm nhất để thử độ tin cậy cao nhất",
    ],
    correctOption: 0,
    explanation:
      "Bạn cần biết rõ tài liệu để chấm đúng sai, và nó đủ dài thì hỏi mới có lợi. Không nhạy cảm để bạn được phép tải lên. Chọn tài liệu bạn chưa đọc khiến bạn không có gì để chấm, còn tài liệu nhạy cảm là rủi ro rò rỉ. \"Mới nhất\" không phải tiêu chí, vì bạn không cần công cụ chưa từng thấy nó.",
    diagram: [
      { label: "Chọn một tài liệu thật và an toàn", arrow: true },
      { label: "Viết 5 câu hỏi cụ thể", arrow: true },
      { label: "Hỏi và ghi câu trả lời cùng chỗ trích", arrow: true },
      { label: "Chấm từng câu theo trang gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chuyên viên vận hành chọn bản hướng dẫn xử lý khiếu nại dài 25 trang mà chị biết khá rõ. Chị viết năm câu hỏi, trong đó có một câu bẫy, hỏi trợ lý đọc tài liệu và mở từng chỗ trích. Kết quả: ba câu đúng, một câu sai một phần vì bỏ sót ngoại lệ, một câu bẫy được trả lời \"tài liệu không nêu\". Chị biết mình nên kiểm kỹ hơn ở phần ngoại lệ.",
    },
    quiz: [
      q(
        "Vì sao nên chọn tài liệu bạn đã biết rõ cho dự án này?",
        "Bạn cần đủ hiểu biết để chấm đúng hay sai",
        ["Vì tài liệu quen thì công cụ luôn trả lời đúng hơn", "Vì tài liệu ngắn thì không cần kiểm lại trang gốc", "Vì công cụ chỉ đọc được những tài liệu bạn từng đọc"],
        "Mục đích của dự án là đo độ tin cậy, mà muốn chấm bạn phải biết đáp án hoặc tìm được nó nhanh. Công cụ không trả lời đúng hơn chỉ vì bạn quen tài liệu, tài liệu ngắn vẫn cần kiểm, và công cụ đọc được cả tài liệu bạn chưa đọc.",
      ),
      q(
        "Bộ 5 câu hỏi nên có đặc điểm nào?",
        "Có vài câu dễ, một câu về ngoại lệ và một câu bẫy không có đáp án",
        ["Cả năm câu đều dễ để ra kết quả đẹp", "Cả năm câu đều là câu bẫy để thử công cụ tối đa", "Năm câu chung chung để công cụ có nhiều chỗ trả lời"],
        "Bộ câu hỏi đa dạng cho bạn bức tranh thật: câu dễ cho thấy khả năng cơ bản, câu ngoại lệ thử độ kỹ, câu bẫy thử việc nói \"không nêu\". Toàn câu dễ cho kết quả đẹp mà không chứng minh gì, toàn câu bẫy không cho biết công cụ có dùng được không, và câu chung chung khó chấm.",
      ),
      q(
        "Một câu trả lời đúng ý chính nhưng bỏ sót một ngoại lệ quan trọng. Chấm thế nào?",
        "Sai một phần",
        ["Đúng, ý chính đã khớp với tài liệu", "Sai hoàn toàn, không dùng được nữa", "Không chấm, chỉ thiếu một chi tiết"],
        "Thiếu ngoại lệ quan trọng làm câu trả lời không đủ dùng nhưng cũng không sai hẳn, nên ghi \"sai một phần\" và ghi rõ phần thiếu. Chấm đúng bỏ qua rủi ro thật, chấm sai hoàn toàn làm mất thông tin về mức độ, và không chấm thì mất một dữ liệu.",
      ),
      q(
        "Kết quả 3 đúng, 1 sai một phần, 1 câu bẫy được trả lời \"không nêu\". Nên rút ra gì?",
        "Có thể dùng để tìm nhanh, nhưng phần ngoại lệ cần kiểm kỹ",
        ["Tin hoàn toàn vì đa số câu đã đúng", "Bỏ công cụ vì đã có một câu sai một phần", "Kết quả vô nghĩa vì chỉ có năm câu hỏi"],
        "Kết quả cho thấy công cụ hữu ích cho tìm nhanh và biết nói \"không nêu\", nhưng ngoại lệ dễ bị bỏ sót nên cần kiểm kỹ ở đó. Năm câu là mẫu nhỏ nhưng vẫn cho hướng, nên không phải vô nghĩa, và một câu sai một phần không đủ để bỏ công cụ.",
      ),
      q(
        "Trước khi tải tài liệu công việc lên công cụ, bạn nên làm gì?",
        "Kiểm tra công ty cho phép công cụ và loại tài liệu đó",
        ["Xoá tên công ty rồi tải lên vì như vậy là ẩn danh", "Tải lên bản cá nhân rồi hỏi công ty sau", "Chỉ cần tắt lịch sử trò chuyện là đủ an toàn"],
        "Việc đầu tiên là xem chính sách của công ty: công cụ nào được duyệt và loại tài liệu nào được phép. Xoá tên chưa chắc làm nội dung hết nhạy cảm, hỏi sau là đã gửi rồi, và tắt lịch sử không thay đổi việc dữ liệu đã rời khỏi công ty.",
      ),
    ],
    keyTakeaways: [
      "Chọn tài liệu thật, bạn biết rõ, đủ dài và không nhạy cảm.",
      "Viết 5 câu hỏi: vài câu dễ, một câu ngoại lệ, một câu bẫy.",
      "Chấm từng câu ở trang gốc: đúng, sai một phần hoặc sai.",
      "Kết quả cho biết nên tin công cụ tới đâu với loại tài liệu của bạn.",
    ],
    practicePrompt: {
      question: "Một câu trả lời đúng ý chính nhưng thiếu điều kiện áp dụng ở chú thích. Bạn ghi thế nào trong bảng chấm?",
      options: [
        "Sai một phần, kèm ghi chú điều kiện bị thiếu",
        "Đúng, vì ý chính khớp với tài liệu gốc nên giữ nguyên",
        "Sai, vì công cụ không đọc chú thích nên không đáng tin",
        "Bỏ khỏi bảng vì câu này không rõ đúng hay sai",
      ],
      correct: 0,
      explanation:
        "Câu thiếu điều kiện áp dụng dùng được một phần và có thể gây hiểu lầm, nên ghi sai một phần cùng phần thiếu để lần sau bạn biết chỗ cần kiểm. Ghi đúng bỏ qua rủi ro, kết luận chung về việc không đọc chú thích là quá tay, và bỏ khỏi bảng làm mất dữ liệu quý.",
    },
    summary: {
      keyIdea: "Biến điều bạn vừa học thành một phép đo nhỏ trên tài liệu thật của mình.",
      formula: "Chọn tài liệu + 5 câu hỏi (có ngoại lệ, có câu bẫy) + chấm theo trang gốc = độ tin cậy đã đo.",
      commonMistake: "Chỉ hỏi câu dễ rồi kết luận công cụ đáng tin.",
      action: "Làm bảng chấm 5 câu cho một tài liệu thật ngay hôm nay.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu công việc không nhạy cảm mà bạn biết rõ. Viết 5 câu hỏi: hai câu dễ, hai câu về điều kiện hoặc ngoại lệ, một câu bẫy không có đáp án. Hỏi trợ lý đọc tài liệu (nếu công ty cho phép), mở từng chỗ trích và chấm: đúng, sai một phần, sai.",
      secondary: "Ngày mai hãy cho biết bảng chấm của bạn có mấy câu đúng, mấy câu sai một phần và mấy câu sai.",
    },
    sections: [
      {
        type: "lead",
        text: "Đến giờ bạn đã biết hỏi hẹp, đòi chỗ trích và thử câu bẫy. Dự án nhỏ này gom chúng lại thành một phép đo: trên tài liệu thật của bạn, công cụ đáng tin đến đâu?",
      },
      {
        type: "feynman",
        title: "Bảng chấm đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn thử một người mới bằng năm câu hỏi về cuốn sổ tay của bạn. Bạn không cần biết người đó giỏi hay dở nói chung, chỉ cần biết họ trả lời đúng bao nhiêu câu về cuốn sổ đó.",
        columns: ["Thành phần", "Thử người mới", "Thử công cụ"],
        rows: [
          ["Đề thi", "Năm câu bạn tự ra", "Năm câu hỏi về tài liệu của bạn"],
          ["Có câu khó", "Một câu về ngoại lệ", "Một câu về điều kiện hoặc ngoại lệ"],
          ["Có câu bẫy", "Một câu không có trong sổ", "Một câu tài liệu không nêu"],
          ["Chấm điểm", "Lật sổ đối chiếu", "Mở trang gốc, ghi đúng, sai một phần, sai"],
        ],
        oneLiner: "Đo công cụ bằng chính tài liệu của bạn: năm câu, một bảng chấm, và kết luận có căn cứ.",
      },
      { type: "heading", text: "Chuẩn bị bộ câu hỏi" },
      {
        type: "paragraph",
        text: "Chọn tài liệu bạn biết rõ và được phép tải lên. Viết năm câu hỏi trước khi mở công cụ, để bạn không bị câu trả lời của nó dẫn dắt. Trong đó nên có hai câu dễ (đáp án nằm trong một đoạn), hai câu về điều kiện hoặc ngoại lệ, và một câu bẫy mà bạn chắc chắn tài liệu không nêu.",
      },
      {
        type: "flow",
        title: "Các bước của dự án",
        steps: [
          { label: "Chọn tài liệu", detail: "Thật, bạn biết rõ, đủ dài và không nhạy cảm." },
          { label: "Viết 5 câu hỏi", detail: "Hai câu dễ, hai câu điều kiện hoặc ngoại lệ, một câu bẫy." },
          { label: "Hỏi và ghi câu trả lời", detail: "Chép nguyên câu trả lời cùng chỗ trích của từng câu." },
          { label: "Mở trang gốc chấm điểm", detail: "Đúng, sai một phần hoặc sai; ghi phần lệch." },
          { label: "Rút ra cách dùng", detail: "Chỗ nào tin được, chỗ nào phải kiểm kỹ." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng chấm nghèo",
          text: "Chỉ ghi \"tốt\" hoặc \"không tốt\". Không nhớ câu nào sai, sai ở đâu, nên lần sau vẫn không biết chỗ nào cần kiểm.",
        },
        right: {
          label: "Bảng chấm dùng được",
          text: "Mỗi câu ghi: câu hỏi, câu trả lời, số trang, kết quả (đúng, sai một phần, sai) và phần lệch. Nhìn bảng biết ngay loại câu nào cần kiểm kỹ.",
        },
      },
      {
        type: "list",
        items: [
          "Viết câu hỏi trước, hỏi công cụ sau.",
          "Ghi lại nguyên văn câu trả lời và số trang được trích.",
          "Chấm ở trang gốc, không chấm theo cảm giác.",
          "Ghi rõ phần lệch của câu sai một phần để lần sau biết cần kiểm gì.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết yêu cầu cho một câu hỏi trong bộ",
        task: "Bạn đã chọn bản hướng dẫn xử lý khiếu nại và muốn hỏi câu về ngoại lệ hoàn tiền. Lắp yêu cầu.",
        parts: [
          {
            id: "scope",
            label: "Nguồn",
            options: [
              { text: "Chỉ dựa vào tài liệu này; nếu không nêu thì nói rõ là không nêu.", good: true, feedback: "Giữ câu trả lời bám tài liệu và cho phép nói \"không có\"." },
              { text: "Trả lời như một chuyên gia xử lý khiếu nại.", feedback: "Nó sẽ nói theo kinh nghiệm chung và có thể thêm quy định không có trong tài liệu." },
            ],
          },
          {
            id: "ask",
            label: "Câu hỏi",
            options: [
              { text: "Trường hợp nào không được hoàn tiền dù khách khiếu nại đúng hạn?", good: true, feedback: "Nhắm vào ngoại lệ, nên bạn thử được độ kỹ của công cụ." },
              { text: "Nói cho tôi về chính sách hoàn tiền.", feedback: "Rộng và dễ nhận về câu trả lời nhạt, không thử được phần ngoại lệ." },
            ],
          },
          {
            id: "cite",
            label: "Chỗ trích",
            options: [
              { text: "Ghi rõ mục hoặc trang bạn dựa vào cho từng trường hợp.", good: true, feedback: "Bạn có chỗ để mở chấm điểm từng trường hợp." },
              { text: "Trả lời ngắn gọn dưới ba dòng.", feedback: "Ngắn nhưng bạn không có chỗ để kiểm, và có thể mất luôn ngoại lệ quan trọng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "ask", "cite"],
            text: "Theo tài liệu, không hoàn tiền trong hai trường hợp: sản phẩm đã sử dụng quá 30 ngày (mục 5.1) và sản phẩm đặt theo yêu cầu riêng (mục 5.3). Tài liệu không nêu trường hợp thứ ba nào.\n\n(Ví dụ minh hoạ: từng trường hợp có mục và có câu \"không nêu\".)",
          },
          {
            requires: ["ask"],
            text: "Không hoàn tiền nếu sản phẩm đã dùng quá lâu, đặt theo yêu cầu riêng, hoặc khách đổi ý.\n\n(Đúng hướng nhưng không chỉ mục nào; \"khách đổi ý\" bạn cần kiểm vì có thể là điều tự thêm.)",
          },
          {
            text: "Chính sách hoàn tiền nhìn chung linh hoạt tuỳ từng trường hợp và ưu tiên quyền lợi của khách hàng...\n\n(Nhạt, không thử được ngoại lệ, và câu \"ưu tiên quyền lợi khách hàng\" là nhận định không có trong văn bản.)",
          },
        ],
      },
      scen(
        "Bảng chấm cho tài liệu của bạn",
        "Bạn đã hỏi xong năm câu và có năm câu trả lời kèm chỗ trích. Đến lúc chấm.",
        ["Chấm nhanh theo cảm giác: nghe khớp thì ghi đúng", "Bạn ghi cả năm câu đúng. Sau đó bạn tin công cụ và bỏ qua một ngoại lệ mà nó bỏ sót, khiến một khách hàng bị trả lời sai."],
        "Mở từng chỗ trích ở trang gốc và ghi kết quả từng câu",
        "Ba câu đúng, một câu sai một phần vì thiếu ngoại lệ ở chú thích, và câu bẫy được trả lời \"tài liệu không nêu\".",
        ["Ghi rõ phần lệch của câu sai một phần và cách dùng cho lần sau", "Bạn có một bảng thật: công cụ tốt với tìm nhanh, cần kiểm kỹ ngoại lệ và chú thích."],
        ["Chỉ ghi \"khá tốt\" rồi cất bảng đi", "Bạn mất thông tin chỗ nào công cụ hay lệch, và lần sau lại tin ở đúng chỗ đó."],
        "Bạn có căn cứ để quyết định nên tin công cụ tới đâu.",
      ),
      {
        type: "closing",
        lines: [
          "Năm câu hỏi, một bảng chấm, một kết luận có căn cứ.",
          "Bài sau: bấm vào trích dẫn để về đúng trang gốc.",
        ],
      },
    ],
  },
];
