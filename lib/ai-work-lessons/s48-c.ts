import type { Lesson } from "../lesson-types";

// Chặng 48, bài 11-15. Giáo trình: scripts/curriculum/stage-48.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và cách kiểm kết quả.

type Opts = [string, string, string, string];
// Phương án đúng viết đầu tiên; vị trí được xáo lại khi dựng dữ liệu.
const Q = (question: string, options: Opts, explanation: string) => ({ question, options, correct: 0, explanation });

export const S48_C_LESSONS: Lesson[] = [
  {
    id: 2370,
    slug: "bo-cau-hoi-thu-truoc-khi-giao-cho-dong-nghiep",
    title: "Chặng 48, Bài 11: Bộ mười câu hỏi thử trước khi cho ai dùng",
    subtitle: "Thử vài câu dễ thì câu nào cũng qua. Mười câu được chọn có chủ ý mới cho bạn biết trợ lý hỏng ở đâu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn sắp nhắn cả phòng: 'Có trợ lý trả lời quy trình rồi, cứ hỏi nó'. Nhưng bạn mới thử ba câu dễ nhất, đúng những câu bạn biết chắc tài liệu có. Đồng nghiệp sẽ hỏi những câu bạn chưa nghĩ tới, và câu sai đầu tiên xảy ra trước mặt họ. Mười câu thử chọn kỹ, viết trước khi chạy, là cách rẻ nhất để gặp lỗi trước họ.",
    openingQuestion:
      "Trợ lý của bạn đã trả lời đúng ba câu bạn hỏi thử. Bạn định giao cho cả phòng. Việc nào nên làm trước?",
    openingOptions: [
      "Viết mười câu gồm câu thường gặp, câu khó và câu ngoài phạm vi rồi thử",
      "Giao luôn, vì ba câu đúng liên tiếp đã cho thấy trợ lý ổn rồi",
      "Thử thêm mười câu dễ giống ba câu vừa rồi cho chắc ăn",
      "Đợi đồng nghiệp dùng thật rồi ai gặp câu sai thì báo lại",
    ],
    correctOption: 0,
    explanation:
      "Ba câu dễ chỉ cho biết trợ lý làm được việc dễ. Lỗi thật thường nằm ở chỗ tài liệu thiếu, hai quy định nói khác nhau hoặc câu hỏi không thuộc việc của trợ lý. Một bộ thử có đủ ba loại câu cho bạn thấy cả ba kiểu lỗi trước khi ai khác gặp. Giao luôn thì người dùng đầu tiên thành người thử. Mười câu dễ nữa chỉ lặp lại điều đã biết. Đợi báo lại thì niềm tin của đồng nghiệp mất trước khi bạn kịp sửa.",
    diagram: [
      { label: "Viết mười câu: thường gặp, khó, ngoài phạm vi", arrow: true },
      { label: "Ghi đáp án mong đợi bên cạnh từng câu, trước khi chạy", arrow: true },
      { label: "Chạy từng câu trong cuộc trò chuyện mới, chép lại câu trả lời", arrow: true },
      { label: "Chấm đúng, sai hoặc bỏ rồi sửa bản dặn cho những câu trượt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Thu làm hành chính, dựng trợ lý trả lời về quy trình đặt phòng họp. Chị thử ba câu chị tự nghĩ, đều đúng. Khi viết đủ mười câu, câu thứ tám là 'phòng họp lớn có máy chiếu không?', một thông tin không hề có trong tài liệu nền. Trợ lý đáp 'có' rất tự tin. Nhờ bộ thử, chị phát hiện lỗi trước khi cả phòng hỏi, rồi dặn thêm: thiếu thông tin thì nói chưa có và chỉ người phụ trách.",
    },
    quiz: [
      Q(
        "Vì sao bộ thử nên có vài câu ngoài phạm vi của trợ lý?",
        [
          "Để biết trợ lý nói 'không biết' hay đoán bừa",
          "Để trợ lý học thêm kiến thức mới ngoài tài liệu nền đã đưa cho nó",
          "Để bộ thử đủ mười câu tròn số, dễ tính điểm phần trăm sau này",
          "Vì người dùng thật chỉ hỏi toàn câu nằm ngoài phạm vi của trợ lý",
        ],
        "Người dùng thật luôn hỏi lệch phạm vi ở một lúc nào đó, và chỗ nguy hiểm là trợ lý đoán thay vì nói không biết. Câu hỏi thử không dạy trợ lý thêm gì, nó chỉ đo phản ứng. Đủ mười câu là hệ quả chứ không phải lý do. Và người dùng thật hỏi cả câu thường lẫn câu lệch, không chỉ câu lệch.",
      ),
      Q(
        "Khi nào nên ghi đáp án mong đợi cho từng câu trong bộ thử?",
        [
          "Trước khi chạy, để không chấm theo cảm giác sau khi đã đọc câu trả lời của trợ lý",
          "Sau khi chạy, vì lúc đó bạn đã thấy trợ lý trả lời những gì nên so đáp án với câu trả lời được dễ hơn",
          "Chỉ cần ghi với câu khó, còn câu thường gặp thì đọc là biết đúng hay sai",
          "Không cần ghi, vì bạn là người viết tài liệu nên nhìn là nhận ra ngay",
        ],
        "Ghi trước giúp bạn chấm theo điều đúng chứ không theo độ trôi chảy của câu trả lời. Ghi sau thì bạn dễ chấp nhận một câu nghe hợp lý. Câu thường gặp cũng cần đáp án viết sẵn vì chính ở đó bạn hay bỏ qua lỗi nhỏ như sai một con số. Còn nhớ tài liệu thì bạn vẫn có thể lẫn giữa hai bản cũ và mới.",
      ),
      Q(
        "Bộ thử có 5 câu thường gặp, 3 câu khó, còn lại là câu ngoài phạm vi. Có bao nhiêu câu ngoài phạm vi?",
        [
          "2 (= 10 - 5 - 3, trừ lần lượt từng nhóm)",
          "3 (= 10 - 5 - 3 + 1, cộng nhầm thêm một câu)",
          "5 (= 10 - 5, quên trừ câu khó nên ra con số to hơn)",
          "8 (= 5 + 3, đó là số câu trong phạm vi chứ không phải ngoài)",
        ],
        "Mười câu trừ 5 câu thường gặp còn 5, trừ tiếp 3 câu khó còn 2 câu. Ba con số kia đều là lỗi tính quen thuộc: cộng thừa một, quên một nhóm, hoặc lấy nhầm tổng hai nhóm đầu. Hai câu ngoài phạm vi là đủ để thấy trợ lý phản ứng ra sao mà không chiếm cả bộ thử.",
      ),
      Q(
        "Bạn chạy mười câu trong cùng một cuộc trò chuyện dài. Lỗi nào dễ xảy ra nhất?",
        [
          "Câu trả lời sau chịu ảnh hưởng của các câu trước nên kết quả lệch với người dùng thật",
          "Trợ lý chạy chậm dần và bỏ dở câu cuối vì đã quá tải sau mười câu",
          "Trợ lý quên hết bản dặn ngay sau câu thứ hai và trả lời chung chung",
          "Mười câu trong một cuộc trò chuyện không bao giờ gây khác biệt gì cả",
        ],
        "Mỗi đồng nghiệp thường mở một cuộc trò chuyện mới với một câu hỏi. Chạy dồn mười câu làm câu sau chịu ảnh hưởng của câu trước, nên kết quả đo không giống cách dùng thật. Trợ lý không 'quá tải' sau mười câu và cũng không quên bản dặn ngay lập tức; còn nói không gây khác biệt là sai vì ngữ cảnh dài có tác động.",
      ),
      Q(
        "Sau khi có kết quả, câu trượt nào nên sửa trước?",
        [
          "Câu thường gặp bị sai, vì nhiều người sẽ hỏi nó mỗi ngày",
          "Câu ngoài phạm vi hiếm gặp nhất, vì nó khó nhất trong bộ thử",
          "Câu có đáp án dài nhất, vì đó là câu khó viết tài liệu nhất",
          "Câu nào cũng như nhau, cứ sửa theo thứ tự từ trên xuống dưới",
        ],
        "Mức thiệt hại bằng số lần bị hỏi nhân với hậu quả khi sai. Câu thường gặp sai là lỗi nhỏ nhưng lặp lại hằng ngày, nên sửa trước. Độ khó của câu không quyết định mức ưu tiên, và độ dài đáp án chẳng nói gì về số người hỏi. Sửa theo thứ tự trên xuống thì có thể mất cả buổi cho câu không ai hỏi.",
      ),
    ],
    keyTakeaways: [
      "Mười câu thử gồm câu thường gặp, câu khó và câu ngoài phạm vi, không chỉ câu dễ.",
      "Ghi đáp án mong đợi trước khi chạy để chấm không bị ảnh hưởng bởi độ trôi chảy.",
      "Chạy mỗi câu trong cuộc trò chuyện mới, giống cách đồng nghiệp sẽ dùng.",
      "Sửa trước những câu thường gặp bị sai, vì chúng lặp lại mỗi ngày.",
    ],
    practicePrompt: {
      question:
        "Anh Bình viết mười câu thử, cả mười đều là câu anh đã biết trợ lý trả lời được từ lần thử trước. Điều gì còn thiếu trong bộ thử?",
      options: [
        "Câu khó và câu ngoài phạm vi, vì chỉ có chúng mới lộ chỗ trợ lý yếu",
        "Thêm mười câu dễ nữa để con số thống kê trông đáng tin hơn hẳn trước",
        "Một câu hỏi thật dài để kiểm tra trợ lý có đọc hết không",
        "Không thiếu gì, vì mười câu đúng liên tiếp là bằng chứng đủ rồi",
      ],
      correct: 0,
      explanation:
        "Bộ thử chỉ gồm câu đã biết sẽ luôn đúng và không cho bạn thông tin mới. Câu khó và câu ngoài phạm vi là nơi lỗi nằm. Thêm câu dễ chỉ làm con số to hơn mà không đáng tin hơn. Một câu dài không đại diện cho kiểu lỗi nào cụ thể, và mười câu đúng của bộ tự chọn thì chưa phải bằng chứng.",
    },
    summary: {
      keyIdea: "Bộ thử tốt được chọn để tìm lỗi, không phải để chứng minh trợ lý ổn.",
      formula: "Mười câu (thường gặp + khó + ngoài phạm vi) + đáp án viết trước + cuộc trò chuyện mới = biết trợ lý hỏng ở đâu.",
      commonMistake: "Thử toàn câu mình biết chắc rồi kết luận trợ lý đã sẵn sàng giao cho cả phòng.",
      action: "Viết đủ mười câu thử cho trợ lý của bạn, kèm đáp án mong đợi, trước khi chạy câu nào.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy trợ lý (hoặc bản dặn) bạn đang có cho công việc của mình. Viết mười câu: năm câu đồng nghiệp hay hỏi nhất, ba câu khó (tài liệu thiếu hoặc hai nguồn nói khác nhau), hai câu ngoài phạm vi. Ghi đáp án mong đợi bên cạnh, rồi chạy từng câu trong cuộc trò chuyện mới và đánh dấu đúng, sai hoặc bỏ.",
      secondary: "Lưu bảng mười câu thành một tệp để lần sau chạy lại sau mỗi lần sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Trợ lý của bạn trả lời trơn tru ba câu đầu, và bạn thấy yên tâm. Bài này nói vì sao cảm giác đó đánh lừa bạn, và cách dựng mười câu thử để thấy lỗi trước khi đồng nghiệp gặp.",
      },
      {
        type: "feynman",
        title: "Bộ câu hỏi thử đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới bài thi lái xe: người chấm không chỉ cho bạn chạy thẳng đường vắng, mà bắt lùi chuồng, dừng dốc và qua ngã tư. Bộ thử cho trợ lý cũng vậy: có chặng dễ, chặng khó và cả chặng 'không được làm'.",
        columns: ["Thành phần", "Bài thi lái xe", "Bộ mười câu thử"],
        rows: [
          ["Chặng dễ", "Chạy thẳng đường vắng", "Câu đồng nghiệp hay hỏi nhất"],
          ["Chặng khó", "Dừng dốc, lùi chuồng", "Câu tài liệu thiếu hoặc hai nguồn nói khác nhau"],
          ["Chặng cấm", "Không vượt đèn đỏ", "Câu ngoài phạm vi: phải nói không biết"],
          ["Ghi điểm", "Bảng chấm có sẵn trước khi thi", "Đáp án mong đợi viết trước khi chạy"],
        ],
        oneLiner: "Đừng hỏi trợ lý những gì bạn biết nó làm được; hãy hỏi những gì đồng nghiệp sẽ hỏi.",
      },
      { type: "heading", text: "Vì sao ba câu đầu luôn đúng" },
      {
        type: "paragraph",
        text: "Khi tự thử, ta gõ những câu ta biết tài liệu có trả lời, vì chính ta viết tài liệu. Đồng nghiệp thì không biết tài liệu có gì, nên họ hỏi bằng lời của họ, hỏi cả điều tài liệu chưa nói, và hỏi cả chuyện chẳng liên quan. Bộ thử vì thế cần được chọn thay cho những người hỏi đó.",
      },
      {
        type: "flow",
        title: "Từ mười câu tới bảng kết quả",
        steps: [
          { label: "Chọn năm câu thường gặp", detail: "Nhìn lại tin nhắn đồng nghiệp đã hỏi bạn trong hai tuần qua: câu nào lặp lại nhiều nhất thì đưa vào, viết đúng bằng lời của họ." },
          { label: "Thêm ba câu khó", detail: "Một câu mà tài liệu thiếu thông tin, một câu mà hai tài liệu nói khác nhau, một câu cần ghép hai đoạn mới ra đáp án." },
          { label: "Thêm hai câu ngoài phạm vi", detail: "Hỏi điều trợ lý không được trả lời, ví dụ chuyện nghỉ phép khi nó chỉ phụ trách bảng giá. Đáp án mong đợi là: nói không phải việc của mình và chỉ người phụ trách." },
          { label: "Ghi đáp án mong đợi", detail: "Viết một dòng cho mỗi câu, trước khi chạy. Dòng này là thước để chấm." },
          { label: "Chạy và chấm", detail: "Mỗi câu một cuộc trò chuyện mới. Chép câu trả lời, đánh dấu đúng, sai hoặc bỏ, và ghi một dòng lý do cho câu trượt." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý câu khó cho bộ thử",
        task: "Bạn muốn AI giúp nghĩ ra các câu hỏi khó cho trợ lý về quy trình đặt phòng họp. Lắp prompt sao cho câu gợi ý hữu ích.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Nghĩ giúp tôi vài câu hỏi về phòng họp.", feedback: "Không nói trợ lý đọc tài liệu gì, AI gợi ý câu chung chung mà tài liệu của bạn có thể chẳng liên quan." },
              { text: "Trợ lý của tôi chỉ đọc quy trình đặt phòng họp (dán đoạn tài liệu). Đồng nghiệp là nhân viên văn phòng, không biết tài liệu.", good: true, feedback: "Có tài liệu thật và người hỏi thật, nên câu gợi ý bám đúng những gì trợ lý đang có." },
            ],
          },
          {
            id: "kinds",
            label: "Loại câu cần",
            options: [
              { text: "Cho 10 câu hỏi hay nhất.", feedback: "'Hay nhất' không nói loại nào, bạn nhận mười câu dễ na ná nhau và lại chọn thiếu câu khó." },
              { text: "Cho 3 câu tài liệu chưa nói rõ, 2 câu ngoài phạm vi, 2 câu hai đoạn tài liệu mâu thuẫn.", good: true, feedback: "Nêu đúng từng loại và số lượng, nên bạn nhận được những câu làm lộ chỗ yếu." },
            ],
          },
          {
            id: "answer",
            label: "Phần đáp án",
            options: [
              { text: "Kèm luôn đáp án đúng cho từng câu.", feedback: "AI sẽ tự bịa đáp án cho câu tài liệu chưa nói rõ, và bạn sẽ chấm theo đáp án bịa đó." },
              { text: "Chỉ ghi câu hỏi và nêu câu đó kiểm điều gì. Đáp án tôi tự viết từ tài liệu.", good: true, feedback: "Bạn tự giữ phần đáp án, nên thước chấm đến từ tài liệu thật chứ không từ AI." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "kinds", "answer"],
            text: "1. Phòng họp lớn có đặt được vào sáng thứ Bảy không? (Kiểm: tài liệu chưa nói.)\n2. Đặt phòng xong muốn đổi giờ thì làm thế nào? (Kiểm: thiếu thông tin.)\n3. Tôi muốn xin nghỉ phép thì gặp ai? (Kiểm: ngoài phạm vi.)\n4. Quy trình nói đặt trước 1 ngày, nhưng ghi chú cuối trang nói 2 ngày. Theo cái nào? (Kiểm: hai đoạn mâu thuẫn.)",
          },
          {
            requires: ["context"],
            text: "1. Phòng họp đặt thế nào?\n2. Phòng họp có mấy chiếc ghế?\n3. Ai duyệt đặt phòng?\n(Các câu đều dễ, đáp án đã có sẵn trong tài liệu, không có câu nào lộ chỗ yếu.)",
          },
          {
            text: "1. Phòng họp tốt nên có những gì? (Câu chung, không liên quan tài liệu.)\n2. Đáp án: phòng họp lớn có sức chứa 30 người. (Con số AI tự bịa, tài liệu của bạn không nói.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bộ thử có chủ ý",
          text: "Có câu thường gặp, câu khó và câu ngoài phạm vi. Đáp án viết trước. Chạy trong cuộc trò chuyện mới. Bạn biết trợ lý sai ở loại câu nào và sửa đúng chỗ.",
        },
        right: {
          label: "Thử vài câu nghĩ ra lúc đó",
          text: "Toàn câu bạn biết chắc. Đáp án lấy theo cảm giác sau khi đọc. Chạy liền trong một cuộc trò chuyện dài. Kết quả đẹp nhưng lỗi thật vẫn chờ đồng nghiệp.",
        },
      },
      {
        type: "callout",
        label: "Lưu bộ thử như lưu tài liệu",
        text: "Mười câu này dùng lại sau mỗi lần bạn sửa bản dặn hay đổi tài liệu nền. Bạn lưu thành một bảng nhỏ gồm câu hỏi, đáp án mong đợi và kết quả. Câu nào liên quan luật lao động, thuế hay hợp đồng thì đáp án phải do bộ phận pháp chế hoặc kế toán trưởng xác nhận, không do AI.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Năm trước khi nhắn cả phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Trợ lý về đặt phòng họp của bạn trả lời đúng ba câu thử. Mai bạn định báo cả phòng 15 người dùng. Bạn còn một buổi chiều.",
            choices: [
              { label: "Nhắn cả phòng luôn, vì ba câu đã đúng", next: "bad_now" },
              { label: "Dành 20 phút viết mười câu thử có đủ loại", next: "s2" },
            ],
          },
          bad_now: {
            text: "Sáng hôm sau, một đồng nghiệp hỏi 'phòng họp lớn có máy chiếu không?' và trợ lý đáp có, dù tài liệu không nói vậy. Người đó đặt phòng theo lời đáp và lên họp mới thấy không có máy chiếu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn viết xong mười câu và đáp án mong đợi. Chạy xong thấy 7 câu đúng, 2 câu sai, 1 câu trợ lý bỏ trả lời.",
            choices: [
              { label: "Bỏ qua hai câu sai vì nhìn chung bảy trên mười là khá rồi", next: "bad_skip" },
              { label: "Xem hai câu sai là câu gì, sửa bản dặn rồi chạy lại cả mười câu", next: "s3" },
            ],
          },
          bad_skip: {
            text: "Hai câu sai hoá ra đều là câu thường gặp (đổi giờ và huỷ đặt phòng). Tuần đầu có sáu người hỏi và sáu người nhận câu trả lời sai, rồi quay lại hỏi bạn như trước.",
            ending: "bad",
          },
          s3: {
            text: "Bạn thêm vào bản dặn: 'Điều gì tài liệu chưa nói thì trả lời là chưa có thông tin và chỉ người phụ trách'. Chạy lại cả mười câu thì được chín đúng, một câu bỏ.",
            choices: [
              { label: "Lưu bảng mười câu, báo cả phòng kèm lưu ý trợ lý có thể trả lời 'chưa có thông tin'", next: "good" },
              { label: "Báo cả phòng, không lưu bảng vì đã xong việc", next: "bad_nosave" },
            ],
          },
          bad_nosave: {
            text: "Hai tháng sau tài liệu đổi, bạn sửa bản dặn nhưng không còn bộ câu để chạy lại. Bạn không biết lần sửa đó có làm hỏng câu nào đang đúng hay không.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp dùng thật và thỉnh thoảng nhận 'chưa có thông tin', rồi hỏi bạn. Lần sau tài liệu đổi, bạn chạy lại mười câu trong vài phút trước khi báo phòng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết năm câu thường gặp bằng lời của đồng nghiệp, ba câu khó, hai câu ngoài phạm vi.",
          "Bước 2 - Ghi đáp án mong đợi bên cạnh từng câu, trước khi chạy.",
          "Bước 3 - Chạy mỗi câu trong cuộc trò chuyện mới, chép lại câu trả lời.",
          "Bước 4 - Chấm đúng, sai hoặc bỏ; sửa câu thường gặp bị sai trước; lưu bảng để chạy lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mười câu được chọn có chủ ý cho bạn thấy lỗi trước đồng nghiệp.",
          "Bài sau: câu hỏi ngoài phạm vi và cách dạy trợ lý biết từ chối.",
        ],
      },
    ],
  },
  {
    id: 2371,
    slug: "cau-hoi-lech-ngoai-pham-vi-tro-ly-co-tu-choi",
    title: "Chặng 48, Bài 12: Câu hỏi lệch ngoài phạm vi: trợ lý có biết từ chối",
    subtitle: "Một người thạo bảng giá nhưng bị hỏi chuyện luật lao động: nói 'không rõ, hỏi chị Hoa' mới là câu trả lời giỏi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚧",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trợ lý phần bảng giá của phòng bạn có một hôm bị đồng nghiệp hỏi: 'Nghỉ việc thì phải báo trước mấy ngày?'. Nó không có tài liệu về chuyện đó, nhưng vì được dặn 'luôn giúp người dùng' nên nó trả lời một con số nghe rất thật. Người kia tin và làm theo. Dạy trợ lý biết từ chối đúng chỗ quan trọng không kém dạy nó trả lời đúng.",
    openingQuestion:
      "Đồng nghiệp hỏi trợ lý bảng giá một câu về luật lao động, và nó trả lời trôi chảy. Nguyên nhân thường gặp nhất là gì?",
    openingOptions: [
      "Bản dặn không nói rõ phạm vi, nên trợ lý cố giúp bằng cách đoán",
      "Trợ lý cố tình lừa người dùng để tỏ ra thông minh hơn cả người thật",
      "Trợ lý đã đọc toàn bộ luật lao động nên trả lời chắc chắn đúng",
      "Đồng nghiệp hỏi sai cách nên trợ lý hiểu nhầm câu hỏi",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý không có ý lừa, nó chỉ tiếp tục viết ra câu nghe hợp lý nhất. Khi bản dặn chỉ nói 'trả lời câu hỏi của người dùng' mà không nói điều gì nằm ngoài việc của nó, nó sẽ lấp chỗ trống bằng phỏng đoán. Nó cũng không có tài liệu luật trong tay, nên câu trả lời trôi chảy không chứng tỏ đúng. Còn cách hỏi của đồng nghiệp chỉ là cớ: dù hỏi khéo hay vụng, thiếu ranh giới trong bản dặn vẫn sinh ra lỗi.",
    diagram: [
      { label: "Bản dặn nêu việc trợ lý làm và việc không làm", arrow: true },
      { label: "Câu ngoài phạm vi tới trợ lý", arrow: true },
      { label: "Trợ lý nói rõ đây không phải việc của nó", arrow: true },
      { label: "Trợ lý chỉ tên người hoặc phòng phụ trách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: phòng kinh doanh của anh Khoa có trợ lý tra cứu bảng giá. Anh thử hỏi 'hợp đồng mẫu có phải đóng dấu không?' và nó trả lời chắc nịch dù tài liệu nền chỉ có bảng giá. Anh thêm vào bản dặn hai dòng: việc trợ lý làm là tra bảng giá, hợp đồng và pháp lý thì nói không thuộc việc của mình và chỉ chị phụ trách pháp chế. Lần thử lại, trợ lý chuyển câu hỏi về đúng người.",
    },
    quiz: [
      Q(
        "Cách nào dạy trợ lý từ chối câu ngoài phạm vi hiệu quả nhất?",
        [
          "Ghi rõ việc nó làm, việc nó không làm và người để chuyển câu hỏi đến",
          "Dặn chung là chỉ trả lời khi thật sự chắc chắn về câu trả lời",
          "Dặn nó luôn giúp người dùng hết sức, kể cả khi câu hỏi hơi lệch",
          "Xoá hết tài liệu nền để nó không còn gì mà nói sang chuyện khác",
        ],
        "Trợ lý không tự biết ranh giới việc của nó; ranh giới phải được viết ra kèm địa chỉ để chuyển. 'Chỉ trả lời khi chắc chắn' quá mơ hồ vì nó luôn 'cảm thấy chắc'. Dặn luôn giúp tối đa là đẩy nó đoán nhiều hơn. Xoá tài liệu nền thì mất luôn phần trả lời đúng, không dạy được cách từ chối.",
      ),
      Q(
        "Sau khi bạn dặn, trợ lý đáp 'Việc này nằm ngoài phần tôi phụ trách.' và dừng. Câu trả lời đó còn thiếu gì?",
        [
          "Một địa chỉ: nên hỏi ai hoặc phòng nào tiếp theo",
          "Một lời xin lỗi dài để người hỏi không bị phật lòng vì bị từ chối",
          "Một câu đoán sơ bộ để người hỏi có gì đó tham khảo tạm thời",
          "Một đoạn giải thích tại sao tài liệu nền không có thông tin đó",
        ],
        "Từ chối mà không chỉ đường thì người hỏi bế tắc và quay lại hỏi bạn, không đỡ việc gì. Xin lỗi dài không giúp họ tiến thêm. Một câu đoán sơ bộ là đúng điều ta đang muốn tránh. Giải thích nội bộ về tài liệu nền thì họ không cần, họ cần biết gặp ai.",
      ),
      Q(
        "Trợ lý bảng giá được hỏi 'giá ngày mai có tăng không?'. Câu trả lời nào đúng hướng nhất?",
        [
          "Tôi chỉ có bảng giá hiện hành; dự báo thay đổi giá hãy hỏi chị phụ trách giá",
          "Có thể tăng khoảng 5% vì thường cuối tháng giá điều chỉnh lên nhẹ",
          "Giá sẽ giữ nguyên, bạn cứ yên tâm báo khách theo bảng hiện tại",
          "Tôi không thể trả lời bất kỳ câu nào liên quan đến giá ngày mai hay sau này",
        ],
        "Tài liệu nền chỉ có giá hiện hành, nên trợ lý nói rõ điều nó có và chỉ người quyết định giá. Con số 5% là bịa, 'giữ nguyên' là khẳng định không có căn cứ. Câu cuối chặn cả những câu mà nó vẫn trả lời được từ bảng hiện hành, nên từ chối quá tay cũng làm người dùng bỏ đi.",
      ),
      Q(
        "Sau khi thêm dòng từ chối vào bản dặn, bạn nên kiểm tra thêm điều gì?",
        [
          "Trợ lý có còn trả lời đúng các câu thường gặp, không từ chối nhầm",
          "Trợ lý có từ chối được hai câu ngoài phạm vi, vậy là đủ để kết luận",
          "Trợ lý có nói 'xin lỗi' đủ nhiều lần trong mỗi câu trả lời hay không",
          "Trợ lý có trả lời ngắn hơn trước, vì ngắn luôn tốt hơn dài",
        ],
        "Dặn từ chối quá rộng có thể làm trợ lý từ chối cả câu trong phạm vi. Vì vậy sau mỗi lần vá phải chạy lại cả bộ thử, cả câu thường gặp. Chỉ kiểm hai câu từ chối thì không thấy tác dụng phụ đó. Số lần xin lỗi và độ ngắn dài không phản ánh đúng hay sai.",
      ),
      Q(
        "Đồng nghiệp ép: 'Cứ đoán giúp mình, mình không trách đâu'. Trợ lý nên làm gì?",
        [
          "Vẫn nói chưa có thông tin và chỉ người phụ trách, dù người hỏi cho phép đoán",
          "Đoán và ghi chú rằng đây chỉ là phỏng đoán, để người hỏi tự chịu trách nhiệm nếu con số hoá ra sai",
          "Đoán một con số thấp, vì số thấp ít gây hại hơn nếu hoá ra sai",
          "Đổi chủ đề sang một việc khác mà nó trả lời được cho người hỏi bớt phật ý",
        ],
        "Lời cho phép của một người không làm phỏng đoán thành dữ kiện. Người hỏi có thể chuyển tiếp câu đó cho khách hay cấp trên mà không ghi chú. Con số thấp vẫn là con số bịa. Đổi chủ đề thì người hỏi vẫn không có câu trả lời và chưa biết hỏi ai.",
      ),
    ],
    keyTakeaways: [
      "Trợ lý lấp chỗ trống bằng phỏng đoán nếu bản dặn không nêu ranh giới việc của nó.",
      "Bản dặn cần nói việc làm, việc không làm và người để chuyển câu hỏi tới.",
      "Từ chối phải kèm địa chỉ; từ chối mà không chỉ đường chỉ chuyển việc về bạn.",
      "Sau mỗi lần vá, chạy lại cả bộ thử để chắc trợ lý không từ chối nhầm câu đúng phạm vi.",
    ],
    practicePrompt: {
      question:
        "Chị Lan dặn trợ lý: 'Không trả lời câu ngoài phạm vi.' Trợ lý đáp câu ngoài phạm vi bằng một câu cụt 'Tôi không trả lời được', người hỏi quay sang nhắn chị. Sửa gì trước?",
      options: [
        "Thêm tên người hoặc phòng để chuyển câu hỏi tới vào bản dặn",
        "Bỏ dòng từ chối để trợ lý lại cố giúp như trước khi có dòng đó",
        "Làm dòng từ chối dài và nghiêm khắc hơn cho trợ lý nhớ kỹ",
        "Xoá tài liệu nền để trợ lý không còn gì để trả lời sai",
      ],
      correct: 0,
      explanation:
        "Từ chối trống không đẩy việc ngược về chị Lan. Chỉ cần thêm địa chỉ chuyển tiếp là người hỏi có bước tiếp. Bỏ dòng từ chối đưa trợ lý về trạng thái đoán bừa. Làm dòng đó nghiêm hơn không thêm thông tin người hỏi cần, và xoá tài liệu nền thì trợ lý mất cả phần việc đúng.",
    },
    summary: {
      keyIdea: "Biết từ chối đúng chỗ là một phần việc của trợ lý, và phải được viết vào bản dặn.",
      formula: "Việc làm + việc không làm + người chuyển tới = trợ lý không đoán bừa và không bỏ người hỏi bơ vơ.",
      commonMistake: "Chỉ dặn 'chỉ trả lời khi chắc chắn' mà không nói ranh giới và không chỉ địa chỉ chuyển.",
      action: "Viết hai dòng vào bản dặn: việc nó không làm, và ai phụ trách những việc đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bản dặn của trợ lý bạn đang có. Viết thêm ba dòng: nó làm việc gì, hai loại câu hỏi nó không làm, và tên người hoặc phòng nhận các câu đó. Rồi thử hai câu ngoài phạm vi thật mà đồng nghiệp hay hỏi và ghi lại trợ lý có chỉ đúng người không.",
      secondary: "Chạy thêm hai câu thường gặp để chắc trợ lý không từ chối nhầm.",
    },
    sections: [
      {
        type: "lead",
        text: "Một trợ lý giỏi không phải cái gì cũng trả lời. Bài này cho bạn cách dạy trợ lý nói 'việc này không thuộc tôi, hỏi chị Hoa' thay vì đoán cho trơn tru.",
      },
      {
        type: "feynman",
        title: "Biết từ chối đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới chị lễ tân khách sạn: hỏi phòng còn trống không thì chị trả lời ngay, hỏi về bệnh đau bụng thì chị chỉ phòng y tế chứ không kê thuốc. Chị giỏi vì biết ranh giới việc của mình và biết chỉ đường.",
        columns: ["Thành phần", "Chị lễ tân", "Trợ lý của bạn"],
        rows: [
          ["Việc của mình", "Đặt phòng, giờ ăn sáng", "Tra bảng giá trong tài liệu nền"],
          ["Việc không phải của mình", "Khám bệnh, tư vấn luật", "Luật lao động, hợp đồng, thuế"],
          ["Chỉ đường", "'Bạn xuống quầy y tế ở tầng 1'", "'Chị Hoa phòng pháp chế phụ trách'"],
          ["Ai dặn ranh giới", "Quản lý khách sạn", "Bạn, trong bản dặn"],
        ],
        oneLiner: "Ranh giới viết ra trong bản dặn biến một trợ lý cố giúp thành một trợ lý biết chuyển.",
      },
      { type: "heading", text: "Vì sao trợ lý trả lời cả điều nó không biết" },
      {
        type: "paragraph",
        text: "Trợ lý luôn viết ra đoạn chữ hợp lý nhất cho câu hỏi. Không ai bảo nó dừng thì nó vẫn viết, và câu hỏi về luật lao động cũng được đáp bằng giọng chắc nịch như câu về bảng giá. Giọng chắc không phải bằng chứng đúng. Muốn nó dừng, bạn phải nói rõ chỗ dừng.",
      },
      {
        type: "flow",
        title: "Vá một bản dặn thiếu ranh giới",
        steps: [
          { label: "Thử một câu ngoài phạm vi", detail: "Hỏi điều trợ lý không có tài liệu, ví dụ chuyện nghỉ phép khi nó chỉ làm bảng giá. Chép lại nguyên văn câu trả lời." },
          { label: "Xem nó đoán hay chuyển", detail: "Nếu nó trả lời bằng con số hay quy định cụ thể không có trong tài liệu, đó là đoán. Nếu nó nói không biết mà không chỉ ai, đó là từ chối cụt." },
          { label: "Viết ranh giới vào bản dặn", detail: "Một dòng cho việc nó làm, một dòng cho việc nó không làm, một dòng cho tên người hoặc phòng phụ trách các việc đó." },
          { label: "Chạy lại câu đó", detail: "Kiểm nó nói rõ đây không phải việc của mình và chỉ đúng người." },
          { label: "Chạy lại câu thường gặp", detail: "Đảm bảo dòng mới không làm trợ lý từ chối nhầm câu nó vốn trả lời được." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Vá bản dặn cho trợ lý bảng giá",
        task: "Trợ lý bảng giá vừa trả lời bừa một câu về luật lao động. Lắp đoạn dặn thêm để nó biết từ chối.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi",
            options: [
              { text: "Hãy trả lời thật hữu ích cho mọi câu hỏi của người dùng.", feedback: "Hướng dặn này chính là nguyên nhân: 'mọi câu hỏi' khuyến khích trợ lý đoán cả điều nằm ngoài tài liệu." },
              { text: "Bạn chỉ tra bảng giá trong tài liệu nền. Không trả lời về luật lao động, hợp đồng hay thuế.", good: true, feedback: "Phạm vi nêu thẳng cả việc làm lẫn loại việc không làm, nên trợ lý biết đâu là đường biên." },
            ],
          },
          {
            id: "how",
            label: "Cách từ chối",
            options: [
              { text: "Nếu câu hỏi khó thì từ chối.", feedback: "'Khó' là mơ hồ: trợ lý sẽ từ chối cả câu bảng giá hơi phức tạp mà nó vẫn làm được." },
              { text: "Khi câu hỏi nằm ngoài bảng giá, nói rõ đây không phải việc của bạn và không đoán.", good: true, feedback: "Điều kiện từ chối gắn với tài liệu nền chứ không gắn với độ khó, nên ít từ chối nhầm." },
            ],
          },
          {
            id: "who",
            label: "Chuyển tới ai",
            options: [
              { text: "Không cần chỉ ai, để người dùng tự tìm.", feedback: "Người hỏi bế tắc rồi quay lại nhắn bạn, nên bạn không bớt việc nào." },
              { text: "Chỉ chị Hoa phòng pháp chế cho câu luật và hợp đồng, anh Nam kế toán cho câu thuế.", good: true, feedback: "Có tên cụ thể nên người hỏi biết bước tiếp theo ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "how", "who"],
            text: "Câu hỏi này về luật lao động, không thuộc phần bảng giá tôi phụ trách và tôi không có tài liệu về nó, nên tôi không trả lời để tránh đoán sai. Bạn hãy hỏi chị Hoa phòng pháp chế. Nếu cần tra giá một sản phẩm, tôi giúp được ngay.",
          },
          {
            requires: ["scope"],
            text: "Tôi không trả lời câu này. (Đúng hướng là từ chối, nhưng người hỏi không biết đi đâu tiếp và quay lại nhắn bạn.)",
          },
          {
            text: "Theo thông lệ, nhân viên nghỉ việc cần báo trước khoảng 30 ngày. (Con số bịa, không có trong tài liệu nền, nói bằng giọng rất chắc.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ranh giới viết rõ trong bản dặn",
          text: "Trợ lý nói rõ điều nó không làm và chỉ đúng người. Đồng nghiệp biết bước tiếp theo. Bạn ít bị hỏi lại hơn và không có con số bịa nào đi ra ngoài.",
        },
        right: {
          label: "Dặn chung 'luôn giúp người dùng'",
          text: "Trợ lý lấp chỗ trống bằng câu nghe hợp lý. Người hỏi tin và làm theo. Lỗi chỉ lộ khi hậu quả đã xảy ra, và bạn mới biết khi có người phàn nàn.",
        },
      },
      {
        type: "callout",
        label: "Câu nào cần người có thẩm quyền",
        text: "Luật lao động, hợp đồng, thuế, bảo hiểm, đền bù: trợ lý không nên đưa câu trả lời cho những việc này, dù bạn có tài liệu nền. Bản dặn nên chỉ thẳng tới bộ phận pháp chế, kế toán trưởng hoặc chuyên gia phụ trách.",
      },
      {
        type: "scenario",
        title: "Đồng nghiệp hỏi trợ lý bảng giá chuyện luật lao động",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn thử hỏi trợ lý bảng giá: 'Nghỉ việc phải báo trước mấy ngày?'. Nó đáp rất chắc: 'Thường là 30 ngày'. Bạn biết tài liệu nền không có điều đó.",
            choices: [
              { label: "Bỏ qua vì nhìn chung trợ lý trả lời giá đúng, chuyện này hiếm gặp", next: "bad_ignore" },
              { label: "Thêm vào bản dặn dòng phạm vi và người phụ trách rồi thử lại", next: "s2" },
            ],
          },
          bad_ignore: {
            text: "Hai tuần sau có đồng nghiệp hỏi đúng câu đó, tin con số 30 ngày và nộp đơn theo đó. Sau đó mới biết mình phải theo quy định trong hợp đồng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thêm: 'Chỉ tra bảng giá. Câu về luật, hợp đồng, thuế: nói không thuộc việc của bạn và chỉ chị Hoa phòng pháp chế.' Thử lại thì trợ lý từ chối đúng và nêu tên chị Hoa. Nhưng khi bạn hỏi 'giá gói A là bao nhiêu?', nó cũng từ chối.",
            choices: [
              { label: "Giữ nguyên, vì từ chối thừa còn hơn trả lời sai", next: "bad_over" },
              { label: "Sửa điều kiện từ chối thành 'ngoài bảng giá trong tài liệu nền' rồi chạy lại cả bộ thử", next: "good" },
            ],
          },
          bad_over: {
            text: "Trợ lý từ chối luôn cả câu hỏi giá thường gặp. Đồng nghiệp thấy nó vô dụng và lại nhắn hỏi bạn như trước khi có trợ lý.",
            ending: "bad",
          },
          good: {
            text: "Trợ lý trả lời đúng giá gói A và vẫn từ chối câu luật kèm tên chị Hoa. Bạn lưu lại phiên bản bản dặn này.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Thử một câu ngoài phạm vi và chép lại nguyên văn câu trả lời.",
          "Bước 2 - Viết vào bản dặn: việc nó làm, việc không làm, người phụ trách phần còn lại.",
          "Bước 3 - Chạy lại câu đó và các câu thường gặp.",
          "Bước 4 - Lưu phiên bản bản dặn và kết quả thử.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ranh giới rõ làm trợ lý đáng tin hơn một trợ lý cái gì cũng đáp.",
          "Bài sau: khi trợ lý nêu sai một con số, lần theo nguồn.",
        ],
      },
    ],
  },
  {
    id: 2372,
    slug: "khi-tro-ly-tu-tin-tra-loi-sai-mot-con-so",
    title: "Chặng 48, Bài 13: Trợ lý tự tin nêu sai một con số: lần theo nguồn",
    subtitle: "Con số sai có ba nơi để ẩn: tài liệu, bản dặn hoặc chính trợ lý. Lần theo từng nơi theo thứ tự.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách hỏi phí giao hàng nội thành, đồng nghiệp hỏi trợ lý và nó đáp 30.000 đồng, trong khi bảng giá ghi 25.000. Bạn không biết sai do tài liệu cũ, do bản dặn, hay do trợ lý tự suy ra. Sửa bừa một chỗ có thể không hết lỗi, nên cần một cách lần theo từng nơi, theo thứ tự.",
    openingQuestion:
      "Trợ lý báo phí giao hàng 30.000 đồng, bảng giá tài liệu nền ghi 25.000. Nên kiểm điều gì đầu tiên?",
    openingOptions: [
      "Con số nằm ở đâu trong tài liệu nền mà trợ lý thực sự đã đọc",
      "Đổi sang công cụ AI khác xem kết quả có khác không",
      "Dặn trợ lý 'hãy cẩn thận hơn với các con số' vào cuối bản dặn hiện có",
      "Xoá hết tài liệu nền rồi tải lên lại cho chắc",
    ],
    correctOption: 0,
    explanation:
      "Con số sai có thể đến từ ba nơi: tài liệu nền có hai bản giá, bản dặn dặn thứ gì đó ảnh hưởng tới số, hoặc trợ lý tự suy ra khi tài liệu không nói rõ. Kiểm nguồn trước cho bạn biết đang ở nơi nào. Đổi công cụ chỉ thay người trả lời, không thay nguồn. Dặn 'cẩn thận hơn' quá mơ hồ để sửa được. Xoá rồi tải lại làm mất manh mối để lần theo.",
    diagram: [
      { label: "Tìm con số trợ lý nêu trong tài liệu nền", arrow: true },
      { label: "Không có hoặc có hai bản: lỗi ở tài liệu", arrow: true },
      { label: "Có một bản đúng nhưng trợ lý vẫn sai: xem bản dặn", arrow: true },
      { label: "Bản dặn cũng ổn: trợ lý tự suy ra, buộc nó dẫn nguồn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: trợ lý của một phòng chăm sóc khách hàng báo phí giao hàng khác bảng giá. Người phụ trách tìm con số trong tài liệu nền và thấy có hai tệp: bảng giá đầu năm và bảng giá mới, cả hai đều được tải lên. Trợ lý đọc cả hai và chọn số ở bản cũ. Sửa là gỡ bản cũ khỏi tài liệu nền, không phải sửa trợ lý.",
    },
    quiz: [
      Q(
        "Theo thứ tự lần theo, bạn nên xem gì sau khi thấy con số trợ lý nêu không có trong tài liệu?",
        [
          "Trợ lý có tự suy ra con số đó không, rồi buộc nó dẫn nguồn",
          "Lỗi chính tả trong tên tệp tài liệu nền đã tải lên",
          "Số lần trợ lý đã được hỏi trong tuần để xem có quá tải không",
          "Có nên đổi người viết bản dặn cho đỡ sai hay không",
        ],
        "Con số không có trong tài liệu thì nguồn duy nhất còn lại là trợ lý tự đưa ra. Cách chữa là buộc trợ lý chỉ nêu điều có nguồn và ghi rõ đoạn đã dùng. Tên tệp sai chính tả không đổi con số. Số câu hỏi không làm trợ lý bịa, và đổi người viết không đụng vào nguyên nhân.",
      ),
      Q(
        "Tài liệu nền có hai tệp bảng giá, một đầu năm và một mới, và trợ lý nêu số ở tệp cũ. Nguyên nhân là gì?",
        [
          "Tài liệu nền có hai nguồn mâu thuẫn và trợ lý chọn nhầm một",
          "Trợ lý ưu tiên tệp có tên ngắn hơn trong danh sách tài liệu",
          "Trợ lý chỉ đọc tệp đầu tiên rồi bỏ những tệp còn lại",
          "Trợ lý bị lỗi tạm thời và sẽ tự hết nếu hỏi lại vài lần",
        ],
        "Trợ lý không biết tệp nào 'hiện hành' nếu tài liệu không nói rõ; nó chọn đoạn khớp nhất với câu hỏi, có thể là bản cũ. Nó không ưu tiên theo độ dài tên, và không phải lúc nào cũng chỉ đọc tệp đầu. Hỏi lại nhiều lần có thể ra số khác nhau nhưng không chữa được nguồn mâu thuẫn.",
      ),
      Q(
        "Bản dặn có câu 'làm tròn mọi con số cho dễ đọc', và trợ lý báo phí giao 25.000 thành 30.000. Sửa ở đâu?",
        [
          "Bản dặn: bỏ dòng làm tròn hoặc giới hạn nó cho số liệu không phải giá",
          "Tài liệu nền: sửa bảng giá thành 30.000 để khớp với câu trả lời",
          "Câu hỏi của người dùng: dặn họ hỏi thật chính xác từng chữ",
          "Không sửa gì, vì làm tròn sai 5.000 đồng chỉ là chuyện nhỏ",
        ],
        "Lỗi sinh ra từ chính dòng dặn, nên sửa dòng dặn. Sửa bảng giá cho khớp câu sai là làm sai dữ liệu thật. Đổ cho cách hỏi là đẩy lỗi sang người dùng. Và với giá thì 5.000 đồng nhân với nhiều đơn là khoản có thật, không phải chuyện nhỏ.",
      ),
      Q(
        "Bạn muốn mọi con số trợ lý nêu đều kiểm được. Dòng dặn nào đúng hướng nhất?",
        [
          "Mỗi con số phải kèm tên tệp và đoạn trích nguyên văn từ tài liệu nền",
          "Hãy chắc chắn rằng mọi con số đều chính xác trước khi nêu ra",
          "Khi nêu con số, hãy viết in đậm để người dùng dễ thấy",
          "Không nêu con số nào, chỉ mô tả bằng lời chung chung",
        ],
        "Kèm tên tệp và đoạn trích cho người dùng chỗ để đối chiếu trong vài giây. 'Hãy chắc chắn' chỉ là lời nhắc mà trợ lý luôn cảm thấy đã làm xong. In đậm làm số bịa nổi bật chứ không đáng tin hơn. Không nêu số thì mất luôn giá trị của trợ lý tra giá.",
      ),
      Q(
        "Lỗi số lặp lại ở ba câu hỏi khác nhau, cùng một tệp nguồn. Điều đó gợi ý gì?",
        [
          "Nguồn có vấn đề, nên sửa tệp đó trước khi sửa từng câu",
          "Ba câu hỏi được viết sai và cần viết lại cho rõ ràng hơn",
          "Trợ lý cần được dặn dài hơn cho mỗi loại câu hỏi riêng",
          "Đó là trùng hợp, mỗi lỗi phải sửa riêng lẻ từng cái một",
        ],
        "Một nguồn chung gây cùng một kiểu lỗi ở nhiều câu nghĩa là sửa một chỗ sẽ sửa cả ba. Sửa từng câu thì tốn công mà lỗi vẫn ở đó. Câu hỏi không phải là nguyên nhân chung, và dặn dài hơn cho từng loại câu không đụng tới tệp gây lỗi.",
      ),
    ],
    keyTakeaways: [
      "Con số sai đến từ ba nơi: tài liệu nền, bản dặn hoặc trợ lý tự suy ra.",
      "Tìm con số trong tài liệu nền trước; thiếu hoặc mâu thuẫn là lỗi tài liệu.",
      "Dòng dặn như 'làm tròn mọi số' có thể tự tạo ra con số sai.",
      "Buộc trợ lý dẫn tên tệp và đoạn trích cho mỗi con số để kiểm được trong vài giây.",
    ],
    practicePrompt: {
      question:
        "Trợ lý nói 'miễn phí giao hàng từ 300.000 đồng', bảng giá nền ghi 500.000. Bản dặn không nói gì về số. Bước lần theo tiếp theo là gì?",
      options: [
        "Tìm xem số 300.000 có xuất hiện ở tệp nào trong tài liệu nền không",
        "Dặn trợ lý 'từ nay luôn đúng' vào bản dặn rồi hỏi lại",
        "Sửa bảng giá nền thành 300.000 cho khớp với câu trả lời vừa rồi của nó",
        "Bỏ qua, vì khách thường không để ý mức miễn phí giao hàng",
      ],
      correct: 0,
      explanation:
        "Nếu số 300.000 nằm trong một tệp cũ thì lỗi ở tài liệu; nếu không có ở đâu thì trợ lý tự suy ra. 'Luôn đúng' không là dòng dặn có tác dụng. Sửa bảng giá cho khớp lời sai là làm hỏng dữ liệu thật, còn khách rất hay để ý mức miễn phí vì nó quyết định họ mua thêm hay không.",
    },
    summary: {
      keyIdea: "Khi trợ lý sai con số, tìm nguồn theo thứ tự thay vì sửa ngẫu nhiên.",
      formula: "Tìm số trong tài liệu, xem bản dặn, rồi buộc trợ lý dẫn nguồn = biết lỗi nằm ở đâu.",
      commonMistake: "Dặn trợ lý 'cẩn thận hơn' hoặc đổi công cụ mà không xem con số đến từ đâu.",
      action: "Lần sau gặp số sai, tìm con số đó trong từng tệp nền trước khi làm bất cứ điều gì khác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Hỏi trợ lý của bạn ba câu có đáp án là một con số (giá, hạn, mức). Với mỗi câu, tìm con số đó trong tài liệu nền và ghi nó nằm ở tệp và đoạn nào. Nếu có một câu không tìm thấy, ghi lại là 'trợ lý tự suy ra' và thêm dòng dặn bắt nó dẫn tên tệp cho mỗi con số.",
      secondary: "Kiểm xem tài liệu nền có hai tệp cùng chủ đề nào không và gỡ tệp cũ đi.",
    },
    sections: [
      {
        type: "lead",
        text: "Con số sai của trợ lý nguy hiểm vì nó được nói bằng giọng chắc chắn. Bài này dạy cách lần theo nguồn của con số sai: tài liệu, bản dặn hay chính trợ lý.",
      },
      {
        type: "feynman",
        title: "Lần theo nguồn đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc kiểm tra một hoá đơn tiền điện cao bất thường: bạn xem công tơ ghi bao nhiêu, xem bảng giá áp dụng, rồi mới xem người tính có nhầm không. Bạn đi từ nguồn gốc tới kết quả, không đoán.",
        columns: ["Thành phần", "Hoá đơn tiền điện", "Con số của trợ lý"],
        rows: [
          ["Dữ liệu gốc", "Chỉ số công tơ", "Tài liệu nền đã tải lên"],
          ["Quy tắc áp dụng", "Bảng giá bậc thang", "Bản dặn của bạn"],
          ["Người tính", "Nhân viên ghi hoá đơn", "Trợ lý viết câu trả lời"],
          ["Thứ tự kiểm", "Công tơ, bảng giá, người tính", "Tài liệu, bản dặn, trợ lý"],
        ],
        oneLiner: "Đi từ dữ liệu gốc tới câu trả lời, từng bước một, rồi mới kết luận ai sai.",
      },
      { type: "heading", text: "Ba nơi con số có thể sai" },
      {
        type: "paragraph",
        text: "Một con số có thể sai vì tài liệu nền có hai bản giá khác nhau, vì bản dặn có một dòng làm lệch số (như làm tròn), hoặc vì trợ lý tự suy ra khi tài liệu không nói. Ba nguyên nhân cần ba cách sửa khác nhau, nên việc đầu tiên là biết đang ở nơi nào.",
      },
      {
        type: "flow",
        title: "Ba bước lần theo con số sai",
        steps: [
          { label: "Tìm con số trong tài liệu nền", detail: "Mở từng tệp nền và tìm con số trợ lý nêu. Có hai tệp khác nhau cùng nói về giá nghĩa là lỗi ở tài liệu." },
          { label: "Đọc bản dặn tìm dòng ảnh hưởng tới số", detail: "Tìm những chữ như làm tròn, ước lượng, tóm tắt. Những dòng này có thể làm 25.000 thành 30.000 mà không ai cố ý." },
          { label: "Nếu số không ở đâu cả, trợ lý tự suy ra", detail: "Số không có trong tài liệu và bản dặn không ảnh hưởng, nghĩa là trợ lý điền cho đủ câu. Cách chữa là buộc nó dẫn nguồn." },
          { label: "Sửa đúng nơi và chạy lại", detail: "Gỡ tệp cũ, sửa dòng dặn hoặc thêm yêu cầu dẫn nguồn, rồi chạy lại câu sai cùng bộ mười câu." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát câu trả lời về phí giao hàng",
        task: "Tài liệu nền của bạn chỉ có: phí giao nội thành 25.000 đồng; đơn từ 500.000 đồng miễn phí giao; ngoại thành chưa có bảng giá (số liệu minh hoạ). Trợ lý trả lời một khách như dưới đây. Đánh dấu những đoạn trợ lý tự thêm hoặc sai.",
        segments: [
          { text: "Chào bạn, về phí giao hàng tôi trả lời như sau." },
          { text: "Giao nội thành có phí 25.000 đồng cho mỗi đơn." },
          { text: "Đơn từ 300.000 đồng được miễn phí giao hàng.", error: "Tài liệu ghi mức miễn phí là 500.000 đồng. Con số 300.000 không có ở tệp nào: trợ lý tự suy ra hoặc lẫn với nguồn khác." },
          { text: "Giao ngoại thành có phí 45.000 đồng.", error: "Tài liệu nói ngoại thành chưa có bảng giá. Con số 45.000 là trợ lý bịa để câu trả lời đầy đủ." },
          { text: "Thời gian giao nội thành thường là trong ngày làm việc.", error: "Tài liệu không có thông tin thời gian giao. Đây là câu nghe hợp lý nhưng không có nguồn." },
          { text: "Nếu cần thêm, bạn cứ hỏi nhé." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lần theo từng nơi theo thứ tự",
          text: "Tìm số trong tài liệu, xem bản dặn, rồi xử lý phần trợ lý tự suy ra. Sửa đúng chỗ và lỗi không quay lại. Bạn cũng biết luôn mình nên kiểm tệp nào lần sau.",
        },
        right: {
          label: "Dặn 'cẩn thận hơn' rồi hy vọng",
          text: "Không biết lỗi từ đâu nên sửa vào chỗ không liên quan. Lỗi lặp lại vài hôm sau. Bạn mất niềm tin vào trợ lý mà không hiểu lý do.",
        },
      },
      {
        type: "callout",
        label: "Con số liên quan tiền và quy định",
        text: "Với giá, mức phạt, thuế hay điều khoản, trợ lý chỉ nên đọc lại từ tài liệu đã được duyệt, không tính hay suy ra. Những con số này hỏi bộ phận kế toán trưởng hoặc pháp chế, và bản dặn nên dặn thẳng: thiếu số thì nói chưa có, không ước lượng.",
      },
      {
        type: "scenario",
        title: "Trợ lý báo phí giao hàng khác bảng giá",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách hỏi phí giao hàng và trợ lý đáp 30.000 đồng. Bảng giá ghi 25.000. Bạn là người phụ trách trợ lý.",
            choices: [
              { label: "Dặn thêm 'hãy cẩn thận với số liệu' vào bản dặn rồi thôi", next: "bad_vague" },
              { label: "Tìm con số 30.000 trong các tệp tài liệu nền", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Một tuần sau trợ lý vẫn nêu 30.000 cho vài khách khác, vì nguồn của lỗi không được chạm tới. Phòng mất niềm tin và bắt đầu tra bảng giá thủ công.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 30.000 nằm trong bảng giá đầu năm vẫn còn được tải lên cùng bảng giá mới (25.000).",
            choices: [
              { label: "Gỡ bảng giá đầu năm khỏi tài liệu nền, chạy lại bộ mười câu", next: "good" },
              { label: "Sửa bảng giá đầu năm thành 25.000 cho khớp, vẫn giữ cả hai tệp", next: "s3" },
            ],
          },
          s3: {
            text: "Hai tệp bây giờ ghi cùng số nhưng vẫn là hai bản trùng nhau. Đến kỳ đổi giá sau, bạn chỉ cập nhật một tệp.",
            choices: [
              { label: "Gỡ hẳn tệp đầu năm ngay bây giờ", next: "good" },
              { label: "Để đó, lần sau nhớ sửa cả hai tệp là được", next: "bad_dup" },
            ],
          },
          bad_dup: {
            text: "Kỳ giá sau bạn chỉ sửa một tệp và quên tệp kia. Trợ lý lại nêu giá cũ, và lỗi quay lại đúng như lần đầu.",
            ending: "bad",
          },
          good: {
            text: "Tài liệu nền chỉ còn một bảng giá hiện hành. Trợ lý nêu đúng 25.000 và bạn thêm dòng dặn: mỗi con số kèm tên tệp nguồn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Tìm con số sai trong từng tệp tài liệu nền.",
          "Bước 2 - Đọc bản dặn, tìm dòng về làm tròn, ước lượng hay tóm tắt.",
          "Bước 3 - Nếu số không có ở đâu, buộc trợ lý dẫn tên tệp và đoạn trích cho mỗi con số.",
          "Bước 4 - Sửa đúng nơi và chạy lại bộ mười câu.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Số sai có ba nơi ẩn náu, và lần theo theo thứ tự thì tìm ra trong vài phút.",
          "Bài sau: đếm tỷ lệ trả lời đúng trên bộ thử để thấy mỗi lần sửa có hiệu quả hay không.",
        ],
      },
    ],
  },
  {
    id: 2373,
    slug: "do-ty-le-cau-tra-loi-dung-tren-bo-thu",
    title: "Chặng 48, Bài 14: Đếm tỷ lệ trả lời đúng trên bộ thử của bạn",
    subtitle: "Một bảng nhỏ: mỗi lần sửa bản dặn, bao nhiêu câu trên mười câu đúng. Nhìn số để biết sửa có ích hay không.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn sửa bản dặn ba lần trong tuần và lần nào cũng thấy trợ lý 'có vẻ tốt hơn'. Nhưng 'có vẻ' là cảm giác, và một lần sửa có thể đã làm hỏng hai câu khác mà bạn không chạy lại để thấy. Đếm số câu đúng trên cùng bộ thử sau mỗi lần sửa biến cảm giác thành một con số so sánh được.",
    openingQuestion:
      "Bạn vừa sửa bản dặn và thử lại hai câu từng sai: giờ cả hai đều đúng. Bạn nên kết luận thế nào?",
    openingOptions: [
      "Chạy lại cả mười câu rồi so số câu đúng với lần trước",
      "Bản dặn đã tốt hơn, hai câu đúng là đủ bằng chứng",
      "Sửa thêm một lần nữa cho chắc rồi mới kiểm tra",
      "Hỏi đồng nghiệp xem họ thấy trợ lý có trả lời tốt hơn không",
    ],
    correctOption: 0,
    explanation:
      "Sửa cho câu này có thể làm hỏng câu khác mà bạn không chạy lại thì không thấy. Chỉ chạy cả bộ và so cùng một thước mới biết tổng thể tốt hơn hay tệ hơn. Hai câu đúng là bằng chứng quá nhỏ. Sửa thêm trước khi kiểm thì chồng thêm một thay đổi chưa biết tác dụng, còn ý kiến đồng nghiệp là cảm giác chứ không phải phép đo lặp lại được.",
    diagram: [
      { label: "Chạy cả mười câu với bản dặn hiện tại", arrow: true },
      { label: "Chấm đúng, sai hoặc bỏ theo đáp án viết trước", arrow: true },
      { label: "Ghi một dòng: ngày, thay đổi, số câu đúng", arrow: true },
      { label: "So với dòng trước: tăng thì giữ, giảm thì quay lại bản cũ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Tuấn ở phòng nhân sự sửa bản dặn cho trợ lý hỏi đáp quy trình nghỉ phép. Lần sửa thứ hai anh thấy trợ lý trả lời hai câu khó tốt hơn hẳn. Nhưng khi chạy cả mười câu, số đúng tụt từ 7 xuống 6, vì một câu thường gặp giờ bị từ chối nhầm. Nhờ bảng so sánh, anh quay về bản cũ và chỉ sửa một dòng.",
    },
    quiz: [
      Q(
        "Vì sao sau mỗi lần sửa bản dặn nên chạy lại cả mười câu thay vì chỉ câu vừa sai?",
        [
          "Vì sửa cho câu này có thể làm hỏng câu khác",
          "Vì chạy ít câu thì trợ lý chạy chậm hơn chạy nhiều câu",
          "Vì mười câu tròn số thì máy tính tính tỷ lệ chính xác hơn",
          "Vì bản dặn chỉ có hiệu lực sau khi trợ lý đã trả lời đủ mười câu",
        ],
        "Một dòng dặn mới tác động lên mọi câu, nên kiểm lại cả bộ mới thấy tác dụng phụ. Tốc độ của trợ lý không phụ thuộc số câu đã hỏi. 'Tròn số' chỉ giúp đọc dễ, không làm phép đo chính xác hơn. Và bản dặn có hiệu lực ngay, không cần chờ trả lời đủ mười câu.",
      ),
      Q(
        "Lần 1 trợ lý đúng 5 trên 10 câu, lần 2 đúng 7 trên 10. Điểm tăng bao nhiêu điểm phần trăm?",
        [
          "20 điểm phần trăm (= 70% - 50%, hiệu hai lần đạt)",
          "40 điểm phần trăm (= 2 / 5, tăng tương đối so với lần 1)",
          "2 điểm phần trăm (= 7 - 5, lấy số câu làm số phần trăm)",
          "70 điểm phần trăm (= 7 / 10, mức đạt lần 2, không phải phần tăng)",
        ],
        "Lần 1 là 50%, lần 2 là 70%, tăng 20 điểm phần trăm. Phương án 40 là tỷ lệ tăng tương đối, một cách đọc khác của cùng hai con số nhưng không phải điểm phần trăm. Phương án 2 bỏ qua việc đổi ra phần trăm, và 70 là mức đạt chứ không phải mức tăng.",
      ),
      Q(
        "Bảng theo dõi nên có những cột nào là hữu ích nhất?",
        [
          "Ngày, thay đổi đã làm, số câu đúng",
          "Ngày, tên người sửa, màu sắc của giao diện trợ lý",
          "Số lần trợ lý được hỏi, thời gian trả lời, số chữ của bản dặn",
          "Chỉ cần số câu đúng, vì ngày và thay đổi bạn sẽ tự nhớ",
        ],
        "Ba cột này cho bạn biết sửa gì đã làm số tăng hay giảm, và quay về đâu khi cần. Tên người sửa có ích khi nhiều người chỉnh, nhưng màu giao diện thì không liên quan. Số lần hỏi và thời gian trả lời đo mức dùng chứ không đo đúng sai. Tự nhớ thì sau hai tuần chẳng ai nhớ lần sửa nào đã thay đổi gì.",
      ),
      Q(
        "Một lần sửa làm số câu đúng giảm từ 8 xuống 6 trên mười câu. Bạn nên làm gì?",
        [
          "Quay về bản dặn trước, rồi tìm xem câu nào vừa trượt và vì sao",
          "Giữ bản mới vì nó đã giải quyết thêm hai câu khó mà bản cũ chưa làm được lần nào",
          "Sửa tiếp trên bản mới đến khi số câu đúng lên lại 8",
          "Bỏ bộ thử này đi vì nó đã trở nên quá khó so với trợ lý",
        ],
        "Số giảm nghĩa là lần sửa gây hại nhiều hơn ích. Quay về bản cũ giúp bạn giữ mức 8, rồi xem câu nào trượt để hiểu tác dụng phụ. Giữ bản mới dựa trên hai câu khó bỏ qua bốn câu hỏng. Sửa tiếp chồng thay đổi lên nền đang hỏng, và bỏ bộ thử là tự tắt đèn báo.",
      ),
      Q(
        "Bộ thử đạt 10 trên 10 suốt ba tháng và không ai cập nhật. Điều gì hợp lý nhất?",
        [
          "Bộ thử đã hết khả năng tìm lỗi mới, cần thêm câu từ những câu đồng nghiệp hỏi thật",
          "Trợ lý đã hoàn hảo, nên ngừng kiểm tra để tiết kiệm thời gian",
          "Bộ thử quá khó nên điểm tối đa là dấu hiệu của sai sót đếm",
          "Nên xoá hết câu đi và viết lại mười câu hoàn toàn giống hệt",
        ],
        "Điểm tối đa kéo dài cho biết bộ thử không còn chạm tới chỗ yếu, chứ không chứng tỏ trợ lý hoàn hảo. Thay vào đó, thêm những câu đồng nghiệp đã hỏi và trợ lý trả lời sai. Ngừng kiểm thì lỗi mới đến bất ngờ. Điểm tối đa không phải dấu hiệu đếm sai, và viết lại mười câu giống hệt không thêm gì.",
      ),
    ],
    keyTakeaways: [
      "Chạy lại cả bộ thử sau mỗi lần sửa, không chỉ câu vừa sai.",
      "Ghi một dòng cho mỗi lần: ngày, thay đổi, số câu đúng.",
      "Số giảm nghĩa là quay về bản trước rồi tìm vì sao.",
      "Điểm tối đa kéo dài là lúc thêm câu mới từ câu đồng nghiệp hỏi thật.",
    ],
    practicePrompt: {
      question:
        "Chị Mai sửa bản dặn và thấy trợ lý đúng 9 trên 10 câu, lần trước là 8 trên 10. Chị định giữ bản mới mà không xem câu nào đã đổi. Còn thiếu bước nào?",
      options: [
        "Xem câu nào đổi từ đúng sang sai và câu nào từ sai sang đúng",
        "Sửa thêm để được 10 trên 10 ngay trong cùng buổi làm việc hôm nay",
        "Không thiếu gì, vì số tăng là đủ chứng minh bản mới tốt hơn",
        "Xoá các câu vẫn sai khỏi bộ thử để lần sau điểm cao hơn",
      ],
      correct: 0,
      explanation:
        "Số tổng tăng vẫn có thể che việc một câu thường gặp vừa đổi sang sai trong khi hai câu khó đổi sang đúng. Xem từng câu cho bạn biết đánh đổi. Sửa thêm ngay chồng thay đổi khác lên, còn xoá câu sai khỏi bộ thử là làm đẹp số chứ không sửa được trợ lý.",
    },
    summary: {
      keyIdea: "Đếm số câu đúng trên cùng bộ thử để biết mỗi lần sửa có ích hay không.",
      formula: "Chạy cả bộ + chấm theo đáp án viết trước + ghi một dòng = so sánh được trước và sau.",
      commonMistake: "Chỉ thử lại câu vừa sai rồi kết luận bản dặn đã tốt hơn.",
      action: "Lập bảng ba cột và điền dòng đầu tiên với số câu đúng của bản dặn hiện tại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bộ mười câu thử của bạn (hoặc viết nhanh mười câu). Chạy với bản dặn hiện tại và chấm đúng, sai, bỏ theo đáp án bạn đã ghi. Lập bảng ba cột ngày, thay đổi, số câu đúng và điền dòng đầu. Sửa một dòng bản dặn rồi chạy lại cả mười câu và điền dòng thứ hai.",
      secondary: "Ghi ra câu nào đổi từ đúng sang sai, nếu có.",
    },
    sections: [
      {
        type: "lead",
        text: "Sửa bản dặn mà không đếm thì cảm giác dẫn đường, và cảm giác dễ sai. Bài này cho bạn một bảng ba cột để mỗi lần sửa có một con số đi kèm.",
      },
      {
        type: "feynman",
        title: "Đếm tỷ lệ đúng đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới một người tập chạy ghi thời gian mỗi buổi vào sổ. Sau mỗi lần đổi giày hay đổi bài tập, họ so số mới với số cũ, không dựa vào cảm giác 'hôm nay chạy nhẹ'.",
        columns: ["Thành phần", "Sổ tập chạy", "Bảng chấm bộ thử"],
        rows: [
          ["Phép đo", "Thời gian chạy cùng một quãng", "Số câu đúng trên cùng mười câu"],
          ["Thay đổi", "Đổi giày, đổi bài tập", "Sửa một dòng bản dặn"],
          ["Ghi lại", "Ngày, thay đổi, kết quả", "Ngày, thay đổi, số câu đúng"],
          ["Quyết định", "Giữ cái làm nhanh hơn", "Giữ bản làm số câu đúng tăng"],
        ],
        oneLiner: "Đổi một thứ mỗi lần, đo trên cùng bộ thử, ghi lại - đó là toàn bộ phương pháp.",
      },
      { type: "heading", text: "Vì sao cảm giác 'tốt hơn' không đủ" },
      {
        type: "paragraph",
        text: "Một dòng dặn thêm vào ảnh hưởng tới mọi câu trả lời, không chỉ câu bạn đang nhắm tới. Nó có thể làm hai câu khó đúng hơn và làm một câu thường gặp hỏng đi. Nếu chỉ xem hai câu đầu, bạn thấy tiến bộ; nếu đếm cả mười câu, bạn thấy cái giá.",
      },
      {
        type: "chart",
        title: "Số câu đúng theo từng lần sửa bản dặn",
        caption: "Số liệu minh hoạ. Kéo thanh trượt để xem: nếu mỗi lần sửa tăng một ít câu đúng thì sau bao nhiêu lần chạm mức mục tiêu 9 trên 10. Đường thực tế của bạn có thể đi xuống ở vài lần sửa, và đó chính là lúc bảng giúp bạn quay lại.",
        kind: "line",
        xLabel: "Lần sửa bản dặn",
        yLabel: "Số câu đúng (trên 10)",
        x: { from: 0, to: 8, step: 1 },
        params: [
          { id: "start", label: "Số câu đúng ban đầu", min: 2, max: 8, step: 1, value: 5, unit: " câu" },
          { id: "gain", label: "Số câu tăng mỗi lần sửa", min: 0.2, max: 2, step: 0.1, value: 0.8, unit: " câu" },
        ],
        series: [
          { label: "Số câu đúng", expr: "min(10, start + gain * x)" },
          { label: "Mục tiêu 9 câu", expr: "9" },
        ],
      },
      {
        type: "flow",
        title: "Một vòng chấm và sửa",
        steps: [
          { label: "Chạy mười câu với bản dặn hiện tại", detail: "Mỗi câu trong cuộc trò chuyện mới, chép lại câu trả lời." },
          { label: "Chấm theo đáp án viết trước", detail: "Đúng là khớp đáp án, sai là lệch, bỏ là trợ lý không trả lời. Ghi một dòng lý do cho câu sai." },
          { label: "Ghi một dòng vào bảng", detail: "Ngày, thay đổi bạn vừa làm, số câu đúng. Chỉ đổi một thứ mỗi lần để biết thứ nào gây ra kết quả." },
          { label: "So với dòng trước", detail: "Tăng thì giữ bản mới. Giảm thì quay về bản trước và xem câu nào đổi từ đúng sang sai." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng bảng chấm cho bộ thử",
        task: "Bạn muốn nhờ AI dựng một bảng chấm để ghi kết quả bộ thử. Lắp prompt cho bảng dùng được ngay.",
        parts: [
          {
            id: "cols",
            label: "Các cột",
            options: [
              { text: "Làm cho tôi một bảng theo dõi trợ lý.", feedback: "Quá chung, AI thêm cột về số người dùng và thời gian mà bạn không cần." },
              { text: "Bảng có các cột: số thứ tự câu, câu hỏi, đáp án mong đợi, câu trả lời, chấm (đúng/sai/bỏ), ghi chú.", good: true, feedback: "Các cột bám đúng việc chấm, nên bạn điền ngay được." },
            ],
          },
          {
            id: "rule",
            label: "Cách chấm",
            options: [
              { text: "Tự đánh giá từng câu xem trợ lý trả lời tốt không.", feedback: "AI tự chấm theo cảm giác, nên một câu trôi chảy mà sai số vẫn được chấm đúng." },
              { text: "Chỉ để trống cột chấm cho tôi tự điền so với đáp án mong đợi tôi đã viết.", good: true, feedback: "Bạn giữ quyền chấm theo thước đã viết trước, không để AI quyết." },
            ],
          },
          {
            id: "sum",
            label: "Dòng tổng",
            options: [
              { text: "Thêm một dòng tổng số điểm thưởng cho trợ lý.", feedback: "Điểm thưởng là chỉ số không ai hiểu và không giúp so trước sau." },
              { text: "Thêm dòng tổng: số câu đúng trên mười, và ô ghi thay đổi bản dặn của lần chạy.", good: true, feedback: "Có số để so sánh và có ghi chú thay đổi để biết vì sao số đổi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["cols", "rule", "sum"],
            text: "Bảng gồm: STT | Câu hỏi | Đáp án mong đợi | Câu trả lời của trợ lý | Chấm (đúng/sai/bỏ) | Ghi chú.\nDòng cuối: Tổng số câu đúng: __ / 10. Thay đổi bản dặn lần này: __________.\n(Cột chấm để trống, bạn điền.)",
          },
          {
            requires: ["cols"],
            text: "Bảng gồm các cột như bạn yêu cầu và cột chấm đã được điền sẵn 'đúng' cho mọi câu.\n(AI tự chấm nên con số đẹp nhưng không đáng tin.)",
          },
          {
            text: "Bảng theo dõi: Số người dùng | Thời gian phản hồi | Điểm thưởng | Mức hài lòng.\n(Các cột không liên quan tới việc đúng hay sai.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đếm trên cả bộ thử sau mỗi lần sửa",
          text: "Thấy ngay lần sửa nào làm tăng hoặc giảm. Quay về bản cũ được khi số giảm. Có lịch sử để giải thích vì sao trợ lý hành xử như bây giờ.",
        },
        right: {
          label: "Thử lại câu vừa sai",
          text: "Chỉ thấy một phần. Tác dụng phụ lên câu khác nằm im. Sau vài tuần không ai nhớ bản dặn đã đổi những gì và vì sao.",
        },
      },
      {
        type: "scenario",
        title: "Sửa bản dặn lần thứ ba trong tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn sửa bản dặn lần thứ ba. Trợ lý giờ trả lời hai câu khó tốt hơn. Bạn chưa chạy cả bộ.",
            choices: [
              { label: "Giữ bản mới luôn, vì hai câu khó đã đúng", next: "bad_keep" },
              { label: "Chạy cả mười câu và ghi số vào bảng", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Một tuần sau đồng nghiệp báo trợ lý từ chối cả câu đặt phòng thường gặp. Bạn không biết lần sửa nào gây ra vì không có bảng để so.",
            ending: "bad",
          },
          s2: {
            text: "Bảng ghi: lần trước 8/10, lần này 7/10. Hai câu khó đúng hơn nhưng ba câu thường gặp đổi sang sai.",
            choices: [
              { label: "Quay về bản trước rồi sửa lại chỉ một dòng để thêm phần câu khó", next: "good" },
              { label: "Giữ bản mới và sửa tiếp các câu sai, không quay lại", next: "s3" },
            ],
          },
          s3: {
            text: "Bạn sửa thêm ba dòng nữa trên bản mới. Số lên 8/10 nhưng bản dặn đã dài gấp đôi và bạn khó giải thích vì sao nó hoạt động.",
            choices: [
              { label: "Quay lại bản 8/10 ban đầu và thử cách sửa gọn hơn", next: "good" },
              { label: "Giữ bản dài vì số đã bằng lần trước", next: "bad_long" },
            ],
          },
          bad_long: {
            text: "Bản dặn dài đến nỗi sau này không ai dám sửa, vì không biết dòng nào đang giữ câu nào đúng. Khi tài liệu đổi, trợ lý sai lại và không ai biết sửa ở đâu.",
            ending: "bad",
          },
          good: {
            text: "Bạn giữ bản 8/10 và thêm một dòng cho phần câu khó, rồi chạy lại: 9/10. Bảng ghi rõ dòng nào mang lại thêm một câu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chạy cả mười câu với bản dặn hiện tại và chấm đúng, sai, bỏ.",
          "Bước 2 - Ghi một dòng: ngày, thay đổi, số câu đúng.",
          "Bước 3 - Mỗi lần chỉ đổi một thứ, rồi chạy lại cả bộ.",
          "Bước 4 - Số giảm thì quay về bản trước; số tối đa kéo dài thì thêm câu mới.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một bảng ba cột biến cảm giác 'có vẻ tốt hơn' thành con số để so.",
          "Bài sau: chia sẻ trợ lý cho nhóm, ai được sửa và ai chỉ dùng.",
        ],
      },
    ],
  },
  {
    id: 2374,
    slug: "chia-se-tro-ly-cho-nhom-ai-duoc-sua-ai-chi-dung",
    title: "Chặng 48, Bài 15: Chia sẻ trợ lý cho nhóm: ai được sửa, ai chỉ dùng",
    subtitle: "Một bếp chỉ nên có một người nêm nếm cuối cùng. Trợ lý dùng chung cũng cần một người chủ và một cuốn sổ ghi thay đổi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ba người trong phòng cùng chỉnh bản dặn của trợ lý: một người thêm giọng thân thiện, một người thêm quy định mới, một người xoá một dòng vì thấy thừa. Hôm sau trợ lý trả lời khác hẳn và không ai biết ai đã đổi gì. Khi nhiều tay cùng sửa mà không có người chủ, lỗi xuất hiện mà không ai lần theo được.",
    openingQuestion:
      "Ba đồng nghiệp đều có quyền sửa bản dặn và hôm nay trợ lý trả lời lạ. Điều gì nên có trước khi cho thêm người quyền sửa?",
    openingOptions: [
      "Một người chủ duyệt mọi thay đổi và một nơi ghi ai đổi gì, vì sao",
      "Cho tất cả mọi người quyền sửa để ai thấy lỗi thì sửa được ngay lập tức",
      "Khoá hẳn, không ai được sửa kể cả người chủ để khỏi có lỗi",
      "Sửa bản dặn mỗi người một bản riêng, không cần thống nhất",
    ],
    correctOption: 0,
    explanation:
      "Nhiều tay sửa cùng một bản dặn mà không có người duyệt làm hành vi của trợ lý thay đổi ngoài tầm kiểm soát. Một người chủ và một cuốn sổ ghi ngày, người sửa, lý do giúp lần theo khi có lỗi. Cho mọi người sửa tự do là nguyên nhân của tình huống này. Khoá hẳn thì trợ lý không cập nhật được khi tài liệu đổi. Mỗi người một bản thì cả phòng nhận câu trả lời khác nhau cho cùng một câu hỏi.",
    diagram: [
      { label: "Chỉ định một người chủ của trợ lý", arrow: true },
      { label: "Người dùng chỉ hỏi; đề xuất sửa gửi cho người chủ", arrow: true },
      { label: "Người chủ sửa, ghi ngày, người đề xuất và lý do", arrow: true },
      { label: "Chạy lại bộ mười câu trước khi báo cả phòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: phòng marketing có trợ lý soạn tin đăng mạng xã hội theo giọng thương hiệu. Ba người đều chỉnh được bản dặn. Một tuần sau, giọng của trợ lý lúc trang trọng lúc suồng sã và không ai nhận đã đổi. Trưởng phòng chỉ định chị Ngân làm chủ, mọi đề xuất sửa gửi chị, chị ghi vào một bảng ngày, người đề xuất, lý do rồi chạy lại bộ câu thử trước khi báo phòng.",
    },
    quiz: [
      Q(
        "Ai nên có quyền sửa bản dặn của trợ lý dùng chung?",
        [
          "Một người chủ; người khác đề xuất và gửi cho người đó",
          "Tất cả mọi người trong phòng, để sửa lỗi được nhanh hơn",
          "Chỉ trưởng phòng, dù ông ấy không biết rõ nội dung bản dặn",
          "Người vừa thấy lỗi gần nhất, bất kể người đó là ai",
        ],
        "Một người chủ làm mọi thay đổi đi qua cùng một cửa, nên bản dặn nhất quán và có người chịu trách nhiệm. Mọi người cùng sửa gây ra mâu thuẫn giữa các dòng dặn. Trưởng phòng có quyền cao nhưng chưa chắc đủ hiểu bản dặn để sửa. Người thấy lỗi gần nhất là cách chọn ngẫu nhiên.",
      ),
      Q(
        "Một dòng ghi trong sổ thay đổi cần có những gì để có ích sau ba tháng?",
        [
          "Ngày, người đề xuất, nội dung đổi và lý do",
          "Ngày và chữ 'đã sửa' để biết bản dặn có được cập nhật",
          "Tên người sửa và lời khen về chất lượng của thay đổi",
          "Toàn bộ bản dặn mới chép lại, không cần ghi gì khác",
        ],
        "Lý do là thứ dễ mất nhất và cần nhất, vì nó cho biết lần sau có nên gỡ dòng đó không. Chỉ ghi ngày thì không ai biết đổi gì. Lời khen không giúp lần theo. Chép toàn bộ bản dặn mới thì phải so từng dòng mới thấy chỗ đổi.",
      ),
      Q(
        "Hai đồng nghiệp cùng đề xuất sửa cùng một dòng bản dặn theo hai hướng khác nhau. Người chủ nên làm gì?",
        [
          "Hỏi lý do của cả hai, quyết định một hướng và ghi vào sổ",
          "Áp dụng cả hai hướng để không ai phật ý",
          "Chọn hướng của người có chức vụ cao hơn trong phòng",
          "Bỏ cả hai đề xuất và không ghi lại vì chưa ai đúng hẳn",
        ],
        "Hai hướng mâu thuẫn áp cùng lúc sẽ tạo một dòng dặn tự mâu thuẫn. Hỏi lý do cho người chủ thông tin để chọn, và ghi vào sổ để lần sau không tranh luận lại. Chọn theo chức vụ không bảo đảm đúng. Bỏ hết mà không ghi thì cả hai sẽ đề xuất lại.",
      ),
      Q(
        "Bạn là chủ trợ lý. Sau khi sửa một dòng theo đề xuất, bước nào nên có trước khi báo cả phòng?",
        [
          "Chạy lại cả bộ mười câu thử và so số câu đúng với lần trước",
          "Hỏi lại người đề xuất xem họ hài lòng về câu chữ hay chưa rồi mới giữ",
          "Đợi ba ngày xem có ai phàn nàn rồi mới tính chuyện kiểm tra",
          "Sao chép bản dặn sang một cuộc trò chuyện khác cho chắc ăn",
        ],
        "Chỉ cách chạy lại bộ thử mới cho biết dòng mới có làm hỏng câu nào không. Người đề xuất hài lòng về chữ chưa chứng tỏ trợ lý trả lời đúng. Đợi phàn nàn là để đồng nghiệp thử thay bạn. Sao chép sang cuộc trò chuyện khác không kiểm gì.",
      ),
      Q(
        "Một đồng nghiệp xin tự sửa bản dặn vì 'chỉ thêm một chữ'. Phản hồi nào hợp lý?",
        [
          "Nhờ họ gửi đề xuất, bạn thêm chữ đó và chạy lại bộ thử",
          "Cho họ sửa vì một chữ thì không thể ảnh hưởng tới trợ lý",
          "Từ chối và không giải thích, vì quyền sửa chỉ của người chủ",
          "Cho họ sửa nhưng không cần ghi vì thay đổi quá nhỏ",
        ],
        "Một chữ như 'luôn' hay 'không' có thể đảo nghĩa cả một dòng dặn, nên thay đổi nhỏ vẫn cần kiểm. Gửi đề xuất vẫn giữ được thiện chí và quy trình. Từ chối không giải thích làm đồng nghiệp ngừng góp ý, và sửa không ghi chép phá đúng thứ ta vừa dựng.",
      ),
    ],
    keyTakeaways: [
      "Một trợ lý dùng chung cần một người chủ; người khác đề xuất, không tự sửa.",
      "Mỗi thay đổi ghi vào sổ: ngày, người đề xuất, nội dung, lý do.",
      "Sau mỗi thay đổi chạy lại bộ mười câu trước khi báo cả phòng.",
      "Thay đổi nhỏ vẫn có thể đảo nghĩa, nên không có ngoại lệ cho 'chỉ một chữ'.",
    ],
    practicePrompt: {
      question:
        "Phòng của anh Sơn có bốn người cùng sửa được bản dặn. Trợ lý đổi giọng mà không ai nhận đã đổi. Việc làm đầu tiên là gì?",
      options: [
        "Chỉ định một người chủ và lập sổ thay đổi từ hôm nay",
        "Khoá quyền sửa của cả bốn người và dùng mãi bản hiện tại",
        "Dặn trợ lý tự ghi lại những lần nó bị sửa đổi",
        "Hỏi từng người xem ai đã sửa rồi phạt người đó",
      ],
      correct: 0,
      explanation:
        "Không có người chủ và sổ ghi thì lỗi sau này sẽ lặp lại dù lần này tìm ra thủ phạm. Khoá hẳn thì bản dặn cũ dần sai khi tài liệu đổi. Trợ lý không tự biết ai sửa nó và không đáng tin để ghi lại. Phạt người sửa khiến mọi người ngại báo khi đã lỡ đổi.",
    },
    summary: {
      keyIdea: "Trợ lý dùng chung cần một người chủ và một sổ ghi thay đổi.",
      formula: "Một người chủ + sổ ngày, người đề xuất, lý do + chạy lại bộ thử = thay đổi có kiểm soát.",
      commonMistake: "Cho cả nhóm cùng sửa bản dặn vì 'như vậy cho nhanh' rồi không ai biết ai đã đổi gì.",
      action: "Chọn tên một người chủ cho trợ lý của phòng và lập sổ thay đổi với bốn cột.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một đoạn ba dòng cho phòng bạn: ai là chủ của trợ lý, cách gửi đề xuất sửa, và nơi ghi sổ thay đổi. Lập sổ với bốn cột ngày, người đề xuất, nội dung đổi, lý do, và điền dòng đầu là bản dặn hiện tại. Gửi đoạn này cho một đồng nghiệp và hỏi họ thấy rõ chưa.",
      secondary: "Gắn bộ mười câu thử vào cùng nơi với sổ thay đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Trợ lý chỉ của một mình bạn thì bạn sửa thoải mái. Khi cả phòng dùng, mỗi lần sửa là một thay đổi cho nhiều người. Bài này cho cách chia vai và ghi sổ để trợ lý không đổi tính mà không ai hay.",
      },
      {
        type: "feynman",
        title: "Chia sẻ trợ lý đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới một bếp ăn chung: ai cũng được ăn, nhưng chỉ một người nêm nếm và sửa công thức, kèm cuốn sổ ghi 'hôm nay giảm muối vì khách ăn nhạt'. Nếu ai cũng thêm gia vị thì nồi canh hôm nay mặn, hôm sau nhạt.",
        columns: ["Thành phần", "Bếp ăn chung", "Trợ lý dùng chung"],
        rows: [
          ["Người dùng", "Người ăn", "Đồng nghiệp hỏi trợ lý"],
          ["Người chủ", "Đầu bếp nêm nếm", "Người duy nhất sửa bản dặn"],
          ["Đề xuất", "Khách nhắn 'hơi mặn'", "Đồng nghiệp gửi đề xuất sửa"],
          ["Sổ ghi", "Sổ công thức, ngày và lý do đổi", "Sổ thay đổi bản dặn"],
        ],
        oneLiner: "Ai cũng được dùng và góp ý, nhưng chỉ một người chạm vào công thức.",
      },
      { type: "heading", text: "Khi ba người cùng sửa" },
      {
        type: "paragraph",
        text: "Mỗi người sửa vì một lý do hợp lý: người này muốn giọng thân thiện, người kia muốn thêm quy định mới, người thứ ba thấy một dòng thừa. Nhưng các dòng dặn tác động lẫn nhau, và không ai nhìn được toàn bộ. Kết quả là trợ lý hành xử khác đi mà không ai biết vì sao.",
      },
      {
        type: "flow",
        title: "Đường đi của một đề xuất sửa",
        steps: [
          { label: "Đồng nghiệp gặp câu trả lời chưa ổn", detail: "Họ chụp hoặc chép câu hỏi và câu trả lời, ghi điều mong đợi. Họ không tự sửa bản dặn." },
          { label: "Gửi đề xuất cho người chủ", detail: "Một dòng: câu hỏi, câu trả lời hiện tại, câu trả lời mong đợi và vì sao." },
          { label: "Người chủ quyết định và sửa", detail: "Nếu hai đề xuất mâu thuẫn, người chủ hỏi lý do và chọn một hướng. Sửa một dòng mỗi lần." },
          { label: "Ghi sổ thay đổi", detail: "Ngày, người đề xuất, nội dung đổi, lý do. Giữ lại bản dặn cũ để quay về khi cần." },
          { label: "Chạy lại bộ thử rồi báo phòng", detail: "Chỉ báo khi số câu đúng không giảm. Nếu giảm thì quay về bản cũ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn quy tắc dùng chung cho phòng",
        task: "Bạn cần nhờ AI soạn một trang ngắn về quy tắc dùng chung trợ lý cho phòng 8 người. Lắp prompt để bản nháp dùng được.",
        parts: [
          {
            id: "roles",
            label: "Vai trò",
            options: [
              { text: "Ai cũng được sửa khi thấy cần để nhanh chóng.", feedback: "Đây là nguồn của sự cố: nhiều tay sửa, không người chịu trách nhiệm." },
              { text: "Một người chủ duy nhất sửa bản dặn. Mọi người khác chỉ dùng và gửi đề xuất cho người chủ.", good: true, feedback: "Vai trò rõ: một cửa cho mọi thay đổi và một người chịu trách nhiệm." },
            ],
          },
          {
            id: "log",
            label: "Sổ thay đổi",
            options: [
              { text: "Ghi lại các thay đổi quan trọng khi nhớ ra.", feedback: "'Khi nhớ ra' nghĩa là thường không ghi, và không ai định nghĩa thế nào là quan trọng." },
              { text: "Mỗi thay đổi ghi ngày, người đề xuất, nội dung đổi, lý do, và lưu bản dặn cũ.", good: true, feedback: "Bốn mục cố định cho phép lần theo và quay lại bản cũ." },
            ],
          },
          {
            id: "check",
            label: "Kiểm sau sửa",
            options: [
              { text: "Sau khi sửa, hỏi thử một câu xem trợ lý còn chạy không.", feedback: "Một câu không phát hiện được câu khác đã hỏng." },
              { text: "Sau mỗi thay đổi chạy lại bộ mười câu thử và chỉ báo phòng khi số câu đúng không giảm.", good: true, feedback: "Bộ thử bảo vệ khỏi tác dụng phụ, và điều kiện báo phòng rõ ràng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["roles", "log", "check"],
            text: "Quy tắc dùng chung trợ lý\n1. Chủ trợ lý: một người (ghi tên). Chỉ người này sửa bản dặn.\n2. Mọi người khác: dùng và gửi đề xuất cho chủ.\n3. Sổ thay đổi: ngày | người đề xuất | nội dung đổi | lý do. Lưu bản dặn cũ.\n4. Sau mỗi thay đổi: chạy lại bộ mười câu; báo phòng khi số câu đúng không giảm.",
          },
          {
            requires: ["roles"],
            text: "Quy tắc dùng chung trợ lý\n1. Chủ trợ lý: một người.\n2. Thay đổi quan trọng nên được ghi lại.\n(Thiếu nội dung sổ và thiếu bước kiểm, nên sau này vẫn khó lần theo.)",
          },
          {
            text: "Quy tắc dùng chung trợ lý\n1. Ai thấy trợ lý trả lời chưa tốt thì sửa bản dặn luôn.\n2. Nhắn vào nhóm chat khi đã sửa.\n(Đúng kiểu quy tắc tạo ra sự cố: nhiều tay sửa, không sổ, không kiểm.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một chủ, một sổ, một bộ thử",
          text: "Mọi thay đổi đi qua một người. Có lý do cho từng dòng dặn. Quay về bản cũ được trong vài phút và cả phòng nhận câu trả lời nhất quán.",
        },
        right: {
          label: "Ai thấy lỗi thì sửa",
          text: "Dòng dặn mâu thuẫn chồng lên nhau. Không ai biết lần sửa nào gây ra lỗi. Mỗi người tin trợ lý là 'bản của mình', và lòng tin của cả phòng giảm dần.",
        },
      },
      {
        type: "callout",
        label: "Người chủ không phải người giỏi nhất",
        text: "Người chủ không cần giỏi công nghệ nhất. Họ cần là người hiểu công việc mà trợ lý phục vụ và có thời gian ghi sổ. Nếu thay đổi chạm tới quy định hay điều khoản, họ hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi sửa bản dặn.",
      },
      {
        type: "scenario",
        title: "Ba người sửa, trợ lý đổi tính",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng nay trợ lý của phòng trả lời cộc lốc, trong khi hôm qua còn lịch sự. Ba người đều có quyền sửa bản dặn và đều nói 'tôi không đổi gì'.",
            choices: [
              { label: "Hỏi từng người rồi sửa lại dòng bạn đoán là bị đổi", next: "bad_guess" },
              { label: "Chỉ định một người chủ và lập sổ thay đổi từ hôm nay", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Bạn đoán sai dòng. Trợ lý đổi giọng thêm một lần, và ba người bắt đầu đổ lỗi cho nhau về bản dặn mà không ai có bằng chứng.",
            ending: "bad",
          },
          s2: {
            text: "Chị Ngân được chọn làm chủ. Một đồng nghiệp đề xuất thêm giọng 'suồng sã', người khác đề xuất giọng 'trang trọng' cho cùng một dòng.",
            choices: [
              { label: "Hỏi lý do của cả hai, chọn một hướng và ghi sổ", next: "s3" },
              { label: "Áp cả hai dòng vào bản dặn cho công bằng", next: "bad_both" },
            ],
          },
          bad_both: {
            text: "Bản dặn giờ vừa dặn 'suồng sã' vừa dặn 'trang trọng'. Trợ lý đổi giọng tuỳ câu hỏi và cả phòng không đoán được nó sẽ trả lời thế nào.",
            ending: "bad",
          },
          s3: {
            text: "Chị Ngân chọn giọng lịch sự vừa phải, ghi ngày, người đề xuất và lý do vào sổ. Bản dặn đã đổi một dòng.",
            choices: [
              { label: "Chạy lại bộ mười câu thử, báo phòng khi số câu đúng không giảm", next: "good" },
              { label: "Báo phòng luôn vì chỉ đổi một dòng nhỏ", next: "bad_nocheck" },
            ],
          },
          bad_nocheck: {
            text: "Dòng mới làm trợ lý từ chối nhầm câu đặt lịch thường gặp. Vì không chạy bộ thử nên bốn người gặp lỗi trước khi chị Ngân biết.",
            ending: "bad",
          },
          good: {
            text: "Số câu đúng giữ nguyên 9/10. Chị Ngân báo phòng kèm đường dẫn sổ thay đổi, và từ đó mọi đề xuất đi qua chị.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một người chủ cho trợ lý và nói rõ cho cả phòng biết.",
          "Bước 2 - Lập sổ thay đổi: ngày, người đề xuất, nội dung đổi, lý do.",
          "Bước 3 - Đề xuất sửa gửi cho người chủ, không tự sửa.",
          "Bước 4 - Sau mỗi thay đổi chạy lại bộ mười câu rồi mới báo phòng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một người chủ, một sổ ghi, một bộ thử: ba thứ giữ trợ lý dùng chung ổn định.",
          "Bài sau: trợ lý dùng chung và tài liệu nhạy cảm nằm ở đâu.",
        ],
      },
    ],
  },
];
