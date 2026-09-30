import type { Lesson } from "../lesson-types";

// Chặng 31, bài 6-10. Giáo trình: scripts/curriculum/stage-31.json.
// Nội dung dạy khái niệm bền (không nút bấm, không giá, không tính năng theo phiên bản công cụ).
export const S31_B_LESSONS: Lesson[] = [
  {
    id: 2025,
    slug: "soan-de-kiem-tra-bam-sat-muc-tieu",
    title: "Chặng 31, Bài 6: Soạn đề kiểm tra bám sát mục tiêu, không chỉ hỏi cho có",
    subtitle: "Một bảng nhỏ trước khi nhờ AI: mỗi câu hỏi phải trả lời được câu 'em cần biết làm gì'.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Tối Chủ nhật bạn cần đề kiểm tra 15 phút cho sáng mai. Nhờ AI 'ra đề chương 3' thì có ngay 20 câu, nhưng phần lớn chỉ hỏi học sinh nhớ lại câu chữ trong sách. Điểm cao chưa chắc là hiểu bài. Một bảng ma trận nhỏ, viết trong năm phút, giúp đề kiểm đúng điều bạn muốn biết.",
    openingQuestion:
      "Bạn nhờ AI 'ra đề kiểm tra chương 3' và nhận 20 câu trông rất ổn. Điều gì nên làm trước khi in đề?",
    openingOptions: [
      "Đối chiếu từng câu với mục tiêu bài học bạn đã dạy",
      "In luôn vì AI đã đọc toàn bộ chương nên đề chắc chắn đủ ý",
      "Bỏ ra vài câu cuối cho đề ngắn lại, không cần xem mục tiêu",
      "Nhờ AI ra thêm 20 câu nữa rồi chọn ngẫu nhiên trong 40 câu",
    ],
    correctOption: 0,
    explanation:
      "Mục tiêu bài học là thước đo của đề: bạn dạy học sinh làm được việc gì thì đề mới hỏi việc đó. AI không biết lớp bạn đã học đến đâu, nó chỉ đoán một đề 'chương 3 thường hỏi gì', nên hay dồn vào câu nhớ định nghĩa. In ngay vì tin AI đã đọc chương là nhầm: nó không biết bạn nhấn mạnh phần nào. Cắt câu cuối làm mất luôn những câu khó nhất. Ra thêm 40 câu rồi chọn ngẫu nhiên chỉ nhân đôi vấn đề.",
    diagram: [
      { label: "Ghi 3 mục tiêu học sinh cần làm được", arrow: true },
      { label: "Lập ma trận: câu nào hỏi mục tiêu nào, mức nào", arrow: true },
      { label: "Nhờ AI soạn câu theo từng ô của ma trận", arrow: true },
      { label: "Đối chiếu từng câu với ma trận, bỏ câu không khớp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một giáo viên tiểu học ra đề 10 câu về phép nhân. Kết quả cả lớp đều 9-10 điểm, nhưng tuần sau nhiều em vẫn không giải được bài toán có lời văn. Đề chỉ hỏi bảng cửu chương thuộc lòng, không có câu nào hỏi 'khi nào dùng phép nhân'. Lần sau cô lập ma trận trước: 4 câu nhớ, 4 câu hiểu, 2 câu vận dụng, rồi mới nhờ AI soạn từng ô.",
    },
    quiz: [
      {
        question: "Ma trận đề kiểm tra dùng để làm gì?",
        options: [
          "Bảo đảm mỗi câu hỏi ứng với một mục tiêu và một mức độ đã chọn từ trước",
          "Để AI biết cần viết bao nhiêu câu",
          "Để đề nhìn chuyên nghiệp và giống đề thi của các trường lớn",
          "Để học sinh khó đoán trước câu hỏi hơn khi ôn tập ở nhà",
        ],
        correct: 0,
        explanation:
          "Ma trận là bản đối chiếu giữa mục tiêu và câu hỏi, nên nhìn vào là biết đề có bỏ sót mục tiêu nào không. Nó không chỉ để AI đếm số câu, cũng không phải để đề nhìn sang trọng, và mục đích không phải giấu câu hỏi khỏi học sinh: ma trận là công cụ của người ra đề.",
      },
      {
        question: "Một đề có 10 câu, cả 10 đều hỏi 'hãy nêu định nghĩa'. Vấn đề chính là gì?",
        options: [
          "Đề chỉ đo trí nhớ",
          "Đề quá dễ nên học sinh nào cũng được điểm rất cao",
          "Đề quá nhiều câu nên học sinh không đủ thời gian làm hết",
          "Đề dùng từ 'định nghĩa' nhiều lần nên câu hỏi bị lặp từ",
        ],
        correct: 0,
        explanation:
          "Toàn câu nhớ lại thì điểm cao chỉ cho biết em thuộc bài, chưa cho biết em dùng được kiến thức. Độ khó không phải điểm chính: câu nhớ có thể khó nếu bài dài. Số câu 10 cho 15 phút là vừa phải, và lặp một từ trong đề là lỗi hình thức nhỏ, không phải lỗi đo lường.",
      },
      {
        question: "Bạn muốn AI soạn câu vận dụng. Cách viết yêu cầu nào đúng hơn cả?",
        options: [
          "Đưa mục tiêu 'giải bài toán có lời văn dùng phép nhân', lớp 3, và xin 2 câu tình huống đời thường",
          "Viết 'soạn cho tôi vài câu khó về phép nhân dành cho học sinh lớp 3'",
          "Nhờ 'ra đề hay về phép nhân cho lớp 3, đủ mọi mức độ nhận thức' rồi để AI tự quyết số câu cho từng mức độ và từng dạng bài",
          "Dán cả chương sách và bảo AI tự chọn phần quan trọng để hỏi",
        ],
        correct: 0,
        explanation:
          "Yêu cầu tốt nêu mục tiêu, lớp, số câu và loại tình huống, nên AI có thứ để bám. 'Câu khó' mỗi người hiểu một cách. 'Đủ mọi mức độ' dồn cho AI việc quyết định tỉ lệ mà lẽ ra bạn phải quyết. Dán cả chương để AI tự chọn thì bạn mất quyền chọn phần trọng tâm.",
      },
      {
        question: "AI đưa một câu hỏi rất hay nhưng không ứng với mục tiêu nào trong ma trận. Bạn nên làm gì?",
        options: [
          "Bỏ câu đó hoặc để dành cho đề khác",
          "Giữ lại vì câu hay thì học sinh nào cũng có lợi khi làm",
          "Sửa lại ma trận cho khớp câu vừa nhận từ AI",
          "Cộng thêm điểm cho câu đó để bù cho việc không có trong ma trận",
        ],
        correct: 0,
        explanation:
          "Câu hay nhưng ngoài mục tiêu sẽ đo một thứ bạn chưa dạy. Sửa ma trận cho khớp câu là đảo ngược thứ tự: ma trận là thước, không phải bản ghi lại đề. Thêm điểm chỉ làm điểm số lệch khỏi những điều bạn thật sự muốn kiểm tra.",
      },
      {
        question: "Đề có 12 câu, trong đó 10 câu mức 'nhớ', 2 câu mức 'hiểu', 0 câu 'vận dụng'. Kết luận nào hợp lý?",
        options: [
          "Đề chỉ kiểm được khoảng 1/6 phần hiểu (2 trên 12) và chưa hề kiểm vận dụng",
          "Đề cân đối vì số câu nhớ nhiều là bình thường ở mọi khối lớp",
          "Đề thiếu 2 câu để đủ 14 câu nên cần bổ sung thêm câu",
          "Đề tốt vì 10 + 2 = 12 câu, tổng khớp đúng với thời gian làm bài 15 phút của cả lớp hôm nay",
        ],
        correct: 0,
        explanation:
          "2 chia 12 là khoảng một phần sáu, và số câu vận dụng bằng 0 nghĩa là mục tiêu vận dụng chưa được đo. Tỉ lệ nào là hợp lý tuỳ mục tiêu của bạn, chứ không có mức chung cho mọi lớp. Việc thêm câu cho đủ 14 không giải quyết mức độ, và tổng câu khớp thời gian chỉ nói về độ dài đề.",
      },
    ],
    keyTakeaways: [
      "Viết mục tiêu trước, đề sau: mỗi câu phải ứng với một mục tiêu.",
      "Ma trận nhỏ (mục tiêu x mức độ) giúp thấy đề đang thiên về đâu.",
      "Giao cho AI từng ô của ma trận, đừng giao cả đề.",
      "Câu hay nhưng ngoài mục tiêu thì bỏ.",
      "Điểm cao chỉ có nghĩa nếu đề hỏi đúng điều cần biết.",
    ],
    practicePrompt: {
      question:
        "Cô Lan có 3 mục tiêu cho chương 3 nhưng để AI ra đề trước, rồi mới xem đề hỏi gì. Bước nào nên làm trước?",
      options: [
        "Viết 3 mục tiêu và số câu cho mỗi mục tiêu rồi mới nhờ AI",
        "Nhờ AI ra đề lần nữa, mong lần sau sẽ trúng mục tiêu hơn",
        "In đề rồi xem học sinh làm được gì để suy ra mục tiêu",
        "Đếm xem đề có bao nhiêu câu trắc nghiệm và bao nhiêu tự luận",
      ],
      correct: 0,
      explanation:
        "Thứ tự đúng là mục tiêu, ma trận, rồi mới đến đề. Xin lại đề mà không đổi cách hỏi chỉ đổi câu chữ. Suy mục tiêu từ bài làm là đảo ngược quy trình. Đếm dạng câu chỉ nói về hình thức đề, không nói đề có đo đúng mục tiêu hay không.",
    },
    summary: {
      keyIdea: "Đề tốt bắt đầu từ mục tiêu, không từ câu hỏi.",
      formula: "Mục tiêu + ma trận (mức độ x số câu) + AI soạn từng ô + bạn đối chiếu = đề bám sát.",
      commonMistake: "Nhờ AI ra cả đề một lượt rồi tin rằng nó đã bao quát chương.",
      action: "Viết 3 mục tiêu cho bài sắp kiểm tra và một bảng 3 dòng 3 cột.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bài kiểm tra 15 phút bạn sắp ra. Viết 3 mục tiêu, kẻ bảng 3 dòng (mục tiêu) x 3 cột (nhớ, hiểu, vận dụng), điền số câu mỗi ô. Nhờ AI soạn đúng các ô đó, rồi đánh dấu câu nào ngoài bảng.",
      secondary: "Chụp bảng lại; hôm sau ghi câu nào học sinh sai nhiều nhất thuộc ô nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Đề kiểm tra tốt trả lời được một câu: 'em này đã làm được điều tôi dạy chưa?'. AI soạn câu hỏi rất nhanh, nhưng câu hỏi nhanh chưa chắc hỏi đúng chỗ. Bài này dạy cách đặt ma trận nhỏ để AI phục vụ mục tiêu của bạn.",
      },
      {
        type: "feynman",
        title: "Ma trận đề kiểm tra đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới danh sách đi chợ. Bạn viết trước cần mua gì, bao nhiêu, rồi mới đi. Nếu đi chợ trước rồi mới xem mình mua được gì thì về nhà mới biết thiếu hành và dư bánh kẹo. Ma trận chính là danh sách đi chợ của đề kiểm tra.",
        columns: ["Thành phần", "Danh sách đi chợ", "Ma trận đề"],
        rows: [
          ["Viết trước", "Món cần nấu, số người ăn", "Mục tiêu, mức độ cần đo"],
          ["Đi mua", "Mua đúng thứ trong danh sách", "AI soạn câu cho từng ô"],
          ["Kiểm lại", "Đối chiếu giỏ hàng với danh sách", "Đối chiếu từng câu với ma trận"],
          ["Món lạ ngoài danh sách", "Bỏ lại hoặc mua lần sau", "Bỏ câu hoặc để đề khác"],
        ],
        oneLiner: "Danh sách trước, mua sau; ma trận trước, đề sau.",
      },
      { type: "heading", text: "Vì sao đề 'ra cho có' dễ đánh lừa" },
      {
        type: "paragraph",
        text: "Câu nhớ lại (nêu định nghĩa, điền chỗ trống) dễ soạn nên AI đưa ra rất nhiều. Cả lớp thuộc bài thì điểm cao, và bạn tưởng cả lớp đã hiểu. Tuần sau gặp tình huống mới, các em khựng lại. Ma trận giúp bạn thấy trước: bao nhiêu câu chỉ đo trí nhớ, bao nhiêu câu đo việc dùng kiến thức.",
      },
      {
        type: "chart",
        title: "Cùng 12 câu: đề soạn tự do và đề theo ma trận",
        caption: "Số liệu minh hoạ cho một đề 12 câu; con số thật phụ thuộc mục tiêu của bạn.",
        kind: "bar",
        xLabel: "Mức độ nhận thức",
        yLabel: "Số câu",
        data: [
          { label: "Nhớ", values: [10, 4] },
          { label: "Hiểu", values: [2, 4] },
          { label: "Vận dụng", values: [0, 3] },
          { label: "Phân tích", values: [0, 1] },
        ],
        seriesLabels: ["Đề soạn tự do", "Đề theo ma trận"],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn một ô của ma trận",
        task: "Bạn cần 2 câu vận dụng cho mục tiêu 'dùng phép nhân giải bài toán có lời văn', lớp 3. Lắp yêu cầu để AI bám đúng ô này.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Ra đề phép nhân hay cho lớp 3.", feedback: "Không nói học sinh cần làm được việc gì, AI dồn vào câu tính nhẩm quen thuộc." },
              { text: "Mục tiêu: giải bài toán có lời văn bằng phép nhân, số nhỏ hơn 100.", good: true, feedback: "Mục tiêu nói rõ việc học sinh làm, nên câu hỏi phải có tình huống chứ không chỉ phép tính." },
            ],
          },
          {
            id: "level",
            label: "Mức độ và số câu",
            options: [
              { text: "Ra đủ các mức độ, càng nhiều câu càng tốt.", feedback: "AI tự chọn tỉ lệ và số câu, bạn phải cắt bớt, và các câu nhớ lại chiếm phần lớn." },
              { text: "Đúng 2 câu ở mức vận dụng, mỗi câu một tình huống khác nhau.", good: true, feedback: "Ô của ma trận được nêu chính xác nên bạn nhận đúng phần cần." },
            ],
          },
          {
            id: "context",
            label: "Bối cảnh lớp",
            options: [
              { text: "Không cần nói gì thêm, AI biết trình độ lớp 3.", feedback: "AI đoán trình độ trung bình; câu có thể dùng từ hoặc đơn vị lớp bạn chưa học." },
              { text: "Lớp 3 ở thành phố, học sinh chưa học nhân số có hai chữ số; tình huống về chợ, trường học.", good: true, feedback: "Giới hạn kiến thức và bối cảnh giúp câu hỏi vừa sức và gần gũi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "level", "context"],
            text: "Câu 1: Mỗi rổ có 6 quả cam. Cô bán hàng có 5 rổ. Hỏi cô có tất cả bao nhiêu quả cam?\n\nCâu 2: Lớp em có 8 bàn, mỗi bàn xếp 4 quyển vở để phát. Hỏi cần chuẩn bị bao nhiêu quyển vở? Hãy viết phép tính em dùng.",
          },
          {
            requires: ["goal"],
            text: "Câu 1: Tính 6 x 5.\nCâu 2: Tính 8 x 4.\nCâu 3: Một lớp có 35 học sinh chia thành nhóm 5 em...\n\n(Mục tiêu đúng nhưng AI thêm câu thứ ba và có câu chia, ngoài yêu cầu.)",
          },
          {
            text: "Câu 1: Nêu định nghĩa phép nhân.\nCâu 2: Điền vào chỗ trống: 6 x 5 = ...\nCâu 3: Viết bảng cửu chương 6.\n\n(Toàn câu nhớ lại, không có câu vận dụng nào.)",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ mục tiêu tới đề đã đối chiếu",
        steps: [
          { label: "Viết 3 mục tiêu", detail: "Mỗi mục tiêu bắt đầu bằng một động từ: giải, so sánh, giải thích. Không dùng 'biết' hay 'hiểu' vì khó đo." },
          { label: "Kẻ ma trận", detail: "Hàng là mục tiêu, cột là mức độ (nhớ, hiểu, vận dụng). Điền số câu cho từng ô, tổng khớp thời gian làm bài." },
          { label: "Nhờ AI soạn từng ô", detail: "Mỗi lần một ô hoặc một hàng, nêu rõ lớp và giới hạn kiến thức. Không xin cả đề một lần." },
          { label: "Đối chiếu từng câu", detail: "Gắn mỗi câu vào một ô. Câu không ô nào nhận thì bỏ. Ô nào còn thiếu câu thì xin thêm." },
          { label: "Tự làm thử đề", detail: "Bạn làm nhanh cả đề để chắc đáp án đúng và thời gian đủ. Bước này sẽ có bài riêng." },
        ],
      },
      {
        type: "callout",
        label: "AI không biết lớp của bạn",
        text: "AI chưa nghe bạn giảng, chưa biết bài nào bạn dạy kỹ, bài nào lướt qua. Ma trận và mục tiêu là cách bạn đưa lớp học của mình vào cuộc trò chuyện. Nếu trường có quy định riêng về cấu trúc đề, hỏi tổ trưởng chuyên môn.",
      },
      {
        type: "scenario",
        title: "Tối Chủ nhật, đề kiểm tra 15 phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 30 phút để chuẩn bị đề 15 phút cho sáng mai. Bạn đã có ba mục tiêu trong sổ giáo án.",
            choices: [
              { label: "Nhờ AI 'ra đề chương 3' rồi in luôn", next: "bad_print" },
              { label: "Kẻ ma trận 3 mục tiêu, rồi nhờ AI soạn từng ô", next: "s2" },
            ],
          },
          bad_print: {
            text: "Đề có 12 câu, 10 câu là nhớ lại. Cả lớp được điểm cao, nhưng đến bài sau bạn mới thấy nhiều em chưa dùng được kiến thức.",
            ending: "bad",
          },
          s2: {
            text: "AI đưa câu 7 rất hay về một tình huống nhưng không thuộc mục tiêu nào trong ma trận.",
            choices: [
              { label: "Giữ câu 7 vì nó hay và thay cho một câu khác", next: "bad_keep" },
              { label: "Bỏ câu 7, xin thêm một câu cho ô còn thiếu", next: "good" },
            ],
          },
          bad_keep: {
            text: "Câu 7 đo một thứ bạn chưa dạy. Nhiều em sai câu đó và bạn không biết nên trách bài giảng hay bài đề.",
            ending: "bad",
          },
          good: {
            text: "Đề in lúc 9 giờ tối, mỗi câu đều có ô của mình. Sáng hôm sau bạn nhìn kết quả và biết mục tiêu nào cần dạy lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết 3 mục tiêu bằng động từ đo được.",
          "Bước 2 - Kẻ ma trận và điền số câu mỗi ô.",
          "Bước 3 - Nhờ AI soạn từng ô, nêu lớp và giới hạn kiến thức.",
          "Bước 4 - Đối chiếu từng câu với ma trận, bỏ câu ngoài ô.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mục tiêu là thước, ma trận là bảng đo, AI chỉ là người soạn từng câu.",
          "Bài sau: kiểm đáp án và phương án nhiễu của đề AI tạo ra.",
        ],
      },
    ],
  },
  {
    id: 2026,
    slug: "kiem-dap-an-de-thi-ai-tao-ra",
    title: "Chặng 31, Bài 7: Kiểm đáp án và phương án nhiễu của đề AI tạo ra",
    subtitle: "Đề trắc nghiệm AI viết trông rất gọn - cho tới khi hai em cùng giơ tay nói câu B và D đều đúng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI soạn 10 câu trắc nghiệm trong nửa phút, kèm đáp án. Nhưng nó có thể cho hai phương án cùng đúng, đánh dấu sai chữ cái đáp án, hoặc thêm phương án nhiễu vô lý mà em nào cũng loại được. Học sinh sẽ là người phát hiện đầu tiên, giữa giờ kiểm tra. Tự làm đề trước khi phát mất mười phút và tránh được cảnh đó.",
    openingQuestion:
      "AI vừa đưa đề 10 câu trắc nghiệm kèm bảng đáp án. Việc nào giúp bắt lỗi hiệu quả nhất trước khi in?",
    openingOptions: [
      "Tự làm đề như một học sinh, rồi so với bảng đáp án",
      "Nhờ chính AI đó kiểm tra lại đề của nó và bảo đảm không sai",
      "Đọc lướt bảng đáp án và thấy hợp lý là in luôn cho học sinh",
      "Chỉ kiểm câu đầu và câu cuối, các câu giữa chắc giống nhau",
    ],
    correctOption: 0,
    explanation:
      "Tự làm đề cho bạn thấy ngay câu nào có hai đáp án đúng, câu nào đáp án đánh dấu sai, câu nào mơ hồ. Nhờ chính AI kiểm lại thì nó thường xác nhận cái nó vừa viết, vì nó dự đoán chữ nghe hợp lý chứ không thật sự làm bài. Đọc lướt bảng đáp án chỉ thấy đáp án nghe hợp lý, không thấy câu hỏi có hai nghiệm. Kiểm đầu và cuối bỏ sót các câu ở giữa, nơi lỗi nằm cùng xác suất.",
    diagram: [
      { label: "AI soạn đề và bảng đáp án", arrow: true },
      { label: "Bạn tự làm đề, không nhìn bảng đáp án", arrow: true },
      { label: "So kết quả của bạn với bảng, ghi câu lệch", arrow: true },
      { label: "Sửa hoặc bỏ câu lệch, rồi mới in" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một giáo viên nhờ AI soạn 10 câu trắc nghiệm về quang hợp rồi in luôn. Ở câu 4, hai phương án 'khí các-bô-níc' và 'CO2' cùng đúng. Ba học sinh giơ tay hỏi, cô phải dừng cả lớp để sửa và chia lại thời gian. Nếu cô tự làm đề trước, lỗi này lộ ra chỉ sau vài phút.",
    },
    quiz: [
      {
        question: "Vì sao nên tự làm đề trước khi nhìn bảng đáp án của AI?",
        options: [
          "Vì khi không nhìn đáp án, bạn mới thấy câu nào có hai lựa chọn cùng hợp lý",
          "Vì bảng đáp án của AI luôn sai",
          "Vì làm đề giúp bạn nhớ lại kiến thức đã dạy khi ôn tập",
          "Vì nhìn đáp án trước sẽ làm bạn quên mất câu hỏi đã đọc",
        ],
        correct: 0,
        explanation:
          "Người đã thấy đáp án thường bị đáp án dẫn đường và không nhận ra câu mơ hồ. Bảng đáp án không phải lúc nào cũng sai; nhiều câu đúng, vấn đề là những câu sai không tự báo. Ôn kiến thức là lợi ích phụ, không phải lý do chính, và quên câu hỏi không phải là rủi ro thật.",
      },
      {
        question: "Câu trắc nghiệm có hai phương án cùng đúng. Cách xử lý nào hợp lý nhất?",
        options: [
          "Sửa một phương án cho chắc chắn sai, hoặc đổi câu hỏi để chỉ một đáp án đúng",
          "Giữ nguyên, học sinh chọn cái nào cũng được điểm",
          "Xoá câu đó khỏi đề cho nhanh",
          "Chấp nhận cả hai đáp án và giải thích cho học sinh sau khi kiểm tra xong, để các em không thấy thiệt",
        ],
        correct: 0,
        explanation:
          "Câu trắc nghiệm tốt chỉ có một đáp án đúng rõ ràng. Chấp nhận cả hai đáp án thì điểm không còn phản ánh hiểu biết. Xoá đi nhanh nhưng mất một ô mục tiêu. Giải thích sau kiểm tra khiến những em chọn nhầm đã mất điểm khi làm bài.",
      },
      {
        question: "Phương án nhiễu 'Con mèo' cho câu hỏi về quang hợp có vấn đề gì?",
        options: [
          "Quá vô lý nên ai cũng loại ngay",
          "Không có vấn đề gì vì phương án nhiễu nào cũng phải sai",
          "Làm học sinh cười và mất tập trung trong giờ kiểm tra",
          "Làm câu hỏi khó hơn vì học sinh phải đọc thêm một phương án",
        ],
        correct: 0,
        explanation:
          "Phương án nhiễu tốt là lỗi học sinh thật sự hay mắc, ví dụ nhầm khí ô-xi với khí các-bô-níc. Phương án vô lý chỉ là chỗ trống, câu bốn lựa chọn chỉ còn ba. Chuyện học sinh cười là hệ quả phụ, không phải vấn đề đo lường, và một phương án ai cũng loại được không làm câu khó hơn.",
      },
      {
        question: "Bảng đáp án ghi câu 6 là C, nhưng khi tự làm bạn thấy đáp án đúng là B. Việc nên làm là gì?",
        options: [
          "Đọc lại câu và kiểm với tài liệu gốc để biết ai đúng: bạn hay bảng",
          "Tin bảng đáp án của AI vì máy không mệt như người",
          "Đổi luôn bảng thành B vì bạn làm bài kỹ hơn máy và chắc chắn hơn về câu này",
          "Xoá câu 6 khỏi đề mà không cần tìm hiểu lý do lệch",
        ],
        correct: 0,
        explanation:
          "Lệch nghĩa là một trong hai sai, và phải xem tài liệu gốc mới biết. Tin máy vì không mệt là suy luận sai: AI vẫn bịa. Đổi theo bạn mà chưa kiểm cũng có thể sai, vì bạn có lúc nhầm. Xoá câu mà không tìm lý do làm bạn không biết đề còn lỗi tương tự ở câu khác hay không.",
      },
      {
        question: "Một câu có phương án 'Tất cả các đáp án trên'. Điều nào đúng nhất?",
        options: [
          "Nên cẩn thận vì học sinh đoán ra được mà chưa hiểu hết",
          "Nên dùng ở mọi câu vì giúp câu hỏi trông đầy đủ và học sinh thấy công bằng hơn",
          "Luôn là đáp án đúng nên học sinh khôn ngoan sẽ chọn nó mà không cần đọc các phương án",
          "Không bao giờ dùng, vì mọi đề chuẩn theo quy định đều không có phương án như vậy",
        ],
        correct: 0,
        explanation:
          "Học sinh chỉ cần biết hai phương án đúng là suy ra được phương án 'tất cả', dù chưa hiểu phương án còn lại. Dùng ở mọi câu làm đề dễ đoán. Nó không luôn là đáp án đúng, và cũng không phải 'không bao giờ dùng': dùng có chủ ý ở vài câu thì được.",
      },
    ],
    keyTakeaways: [
      "AI viết đề nhanh nhưng đáp án của nó cần người làm thử.",
      "Tự làm đề trước khi nhìn bảng đáp án.",
      "Mỗi câu chỉ có một đáp án đúng rõ ràng.",
      "Phương án nhiễu tốt là lỗi thật của học sinh.",
      "Câu lệch giữa bạn và bảng: kiểm tài liệu gốc.",
    ],
    practicePrompt: {
      question:
        "Thầy Nam nhờ AI kiểm lại đề do chính AI soạn và AI trả lời 'đề không có lỗi'. Thầy nên làm gì?",
      options: [
        "Tự làm đề và so với bảng đáp án, vì AI không tự phát hiện được lỗi của mình",
        "Tin kết quả vì AI đã kiểm tra bằng cách đọc lại cả đề",
        "Nhờ AI kiểm thêm lần nữa để chắc chắn hơn",
        "Chỉ đọc bảng đáp án xem có câu nào trông lạ không",
      ],
      correct: 0,
      explanation:
        "AI đọc lại đề của mình thường xác nhận nó, vì nó chọn chữ nghe hợp lý chứ không làm bài. Hỏi lần nữa không đổi được điều đó. Đọc bảng đáp án chỉ thấy đáp án, không thấy câu hỏi có hai nghiệm; chỉ làm thử mới thấy.",
    },
    summary: {
      keyIdea: "Đáp án AI viết là bản nháp, bạn làm thử để biết nó có đúng không.",
      formula: "Đề của AI + bạn tự làm không nhìn đáp án + so lệch + sửa = đề sẵn sàng phát.",
      commonMistake: "Nhờ chính AI kiểm lại đề của nó rồi tin rằng đề đã sạch lỗi.",
      action: "Lần tới có đề AI soạn, tự làm trong 10 phút trước khi in.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đề trắc nghiệm AI soạn cho bài sắp dạy (hoặc nhờ AI soạn 8 câu ngay bây giờ). Che bảng đáp án, tự làm cả đề, ghi lại câu nào bạn lưỡng lự, rồi so với bảng. Với mỗi câu lệch, ghi một dòng: lỗi nằm ở câu hỏi, đáp án hay phương án nhiễu.",
      secondary: "Chọn một phương án nhiễu vô lý và viết lại thành một lỗi học sinh hay mắc.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đề trắc nghiệm hỏng không tự báo lỗi. Nó chỉ lộ ra khi học sinh hỏi 'thưa cô, câu này có hai đáp án ạ?'. Bài này dạy cách bắt lỗi trước khi in bằng đúng việc bạn giỏi nhất: làm bài như một học sinh.",
      },
      {
        type: "feynman",
        title: "Kiểm đề AI đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới người thợ may thử áo. Áo trông đẹp khi treo, nhưng chỉ khi có người mặc vào mới biết tay áo ngắn hay cổ áo chật. Đề trắc nghiệm cũng vậy: đọc thì hợp lý, làm thử mới biết lỗi.",
        columns: ["Thành phần", "Thử áo", "Kiểm đề"],
        rows: [
          ["Nhìn thoáng qua", "Áo treo trên móc nhìn đẹp", "Đọc lướt đề thấy hợp lý"],
          ["Thử thật", "Người mặc vào áo", "Bạn tự làm đề như học sinh"],
          ["Lỗi lộ ra", "Tay áo ngắn, cổ chật", "Hai đáp án đúng, đáp án ghi sai"],
          ["Sửa", "Thợ chỉnh trước khi giao", "Bạn sửa trước khi phát"],
        ],
        oneLiner: "Đề chưa được thử thì chưa biết vừa hay không: hãy làm thử trước khi phát.",
      },
      { type: "heading", text: "Ba kiểu lỗi hay gặp" },
      {
        type: "paragraph",
        text: "Thứ nhất, hai phương án cùng đúng hoặc cùng chấp nhận được. Thứ hai, bảng đáp án ghi sai chữ cái: câu hỏi đúng, phương án đúng nhưng đánh dấu nhầm. Thứ ba, phương án nhiễu vô lý, làm câu bốn lựa chọn chỉ còn hai. Cả ba đều khó thấy khi đọc lướt và dễ thấy khi làm thử.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát câu trắc nghiệm AI vừa viết",
        task: "AI soạn câu hỏi về quang hợp cho lớp 7. Bạn tự làm thử và thấy vài chỗ lạ. Bấm vào những dòng đáng ngờ.",
        segments: [
          { text: "Câu 4: Cây xanh hấp thụ khí nào để quang hợp?" },
          { text: "A. Khí ô-xi" },
          { text: "B. Khí các-bô-níc" },
          { text: "C. Con mèo", error: "Phương án nhiễu vô lý, ai cũng loại ngay nên câu chỉ còn ba lựa chọn. Nên thay bằng lỗi học sinh hay nhầm, ví dụ khí ni-tơ." },
          { text: "D. Khí CO2", error: "D và B là cùng một chất (khí các-bô-níc chính là CO2), nên câu có hai đáp án đúng." },
          { text: "Đáp án: A", error: "Đáp án đánh dấu là A (khí ô-xi), trong khi cây hấp thụ khí các-bô-níc; bảng đáp án ghi sai chữ cái." },
        ],
      },
      {
        type: "flow",
        title: "Quy trình làm thử đề trước khi phát",
        steps: [
          { label: "Che bảng đáp án", detail: "Gập hoặc ẩn bảng đáp án để bạn không bị dẫn đường bởi đáp án AI đưa." },
          { label: "Làm bài như học sinh", detail: "Đọc từng câu, chọn đáp án, ghi câu nào bạn phải nghĩ lâu hoặc lưỡng lự vì chúng thường có vấn đề." },
          { label: "So với bảng đáp án", detail: "Câu khớp thì yên tâm. Câu lệch là điểm cần kiểm: câu hỏi, đáp án hay phương án nhiễu." },
          { label: "Kiểm tài liệu gốc cho câu lệch", detail: "Xem sách giáo khoa hoặc giáo án để biết bảng hay bạn nhầm. Không đoán." },
          { label: "Sửa rồi làm lại câu đã sửa", detail: "Sửa xong, đọc lại câu đó một lần như học sinh để chắc chỉ còn một đáp án đúng." },
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI cùng làm, không nhờ AI chấm chính nó",
        text: "Bạn có thể nhờ AI viết lại một phương án nhiễu cho thành lỗi học sinh hay nhầm, và khi làm vậy hãy cho AI biết lỗi nào bạn từng thấy ở lớp. Nhưng đừng để AI làm trọng tài cho đề của chính nó: kiểm đáp án là việc của bạn.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Ba, 10 phút trước giờ kiểm tra",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có đề 10 câu do AI soạn và bảng đáp án. Còn 10 phút nữa vào lớp.",
            choices: [
              { label: "Nhờ AI 'kiểm tra xem đề có lỗi không' rồi in", next: "bad_ai" },
              { label: "Che bảng đáp án và tự làm đề trong 8 phút", next: "s2" },
            ],
          },
          bad_ai: {
            text: "AI trả lời đề không có lỗi. Giữa giờ, ba học sinh hỏi câu 4 có hai đáp án. Bạn phải dừng lớp, sửa trên bảng và chia lại thời gian.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy câu 4 có hai phương án cùng nghĩa, và câu 7 bạn chọn B nhưng bảng ghi C.",
            choices: [
              { label: "Sửa câu 4 và đổi bảng câu 7 thành B mà không xem lại sách", next: "bad_guess" },
              { label: "Sửa câu 4, mở sách kiểm câu 7 rồi mới chốt đáp án", next: "good" },
            ],
          },
          bad_guess: {
            text: "Bạn đổi theo trí nhớ mà không mở sách. Sáng hôm sau có em mang sách đến, chỉ ra đáp án câu 7 không khớp, và bạn phải chấm lại cả lớp.",
            ending: "bad",
          },
          good: {
            text: "Sách xác nhận B đúng, bảng của AI ghi nhầm. Đề vào lớp đúng giờ và không ai phải hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Che bảng đáp án, tự làm cả đề.",
          "Bước 2 - Ghi câu bạn lưỡng lự và câu lệch với bảng.",
          "Bước 3 - Kiểm tài liệu gốc cho câu lệch, sửa câu, đáp án hoặc phương án nhiễu.",
          "Bước 4 - Đọc lại câu đã sửa một lần nữa trước khi in.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI viết đề, bạn làm thử: đó là chỗ đáng tin duy nhất.",
          "Bài sau: viết rubric chấm bài để học sinh hiểu vì sao được điểm đó.",
        ],
      },
    ],
  },
  {
    id: 2027,
    slug: "rubric-cham-bai-viet-de-hoc-sinh-hieu",
    title: "Chặng 31, Bài 8: Viết rubric chấm bài để học sinh hiểu vì sao được điểm đó",
    subtitle: "Khi một em hỏi 'sao em chỉ được 6', bạn có sẵn bốn dòng để chỉ vào thay vì giải thích cảm tính.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn chấm 35 bài văn ngắn, và tới bài thứ 30 bạn nhận ra mình chấm khác so với bài thứ 3. Sau đó một em hỏi 'sao em chỉ được 6' và bạn chỉ nói được 'bài em chưa sâu'. Rubric là bảng bốn mức viết bằng lời dễ hiểu: em nhìn vào là biết mình ở đâu và cần làm gì để lên mức sau. AI giúp nháp bảng rất nhanh, nhưng bạn phải là người chốt từng mức.",
    openingQuestion:
      "Một em cầm bài đạt 6 điểm và hỏi 'sao em chỉ được 6 ạ?'. Điều gì giúp bạn trả lời cụ thể nhất?",
    openingOptions: [
      "Bảng rubric có mô tả từng mức, để chỉ ra em đang ở mức nào",
      "Nhắc lại rằng cô đã chấm kỹ và điểm này là công bằng với cả lớp",
      "Nói bài em chưa sâu và cần cố gắng hơn ở lần sau",
      "Cho AI viết một lời nhận xét dài để gửi cho em đọc",
    ],
    correctOption: 0,
    explanation:
      "Rubric cho em thấy từng tiêu chí đang ở mức nào và mức kế tiếp trông ra sao, nên lời giải thích dựa trên bảng chứ không dựa trên cảm nhận. Nhắc rằng chấm kỹ và công bằng không cho em biết cần sửa gì. 'Chưa sâu' là nhận xét ai nghe cũng thấy mơ hồ. Một lời nhận xét dài do AI viết thì có thể hay nhưng không gắn với tiêu chí bạn dùng khi chấm.",
    diagram: [
      { label: "Chọn 3-4 tiêu chí cho bài viết", arrow: true },
      { label: "Mô tả bốn mức bằng việc em làm được", arrow: true },
      { label: "Thử rubric trên hai bài mẫu đã chấm", arrow: true },
      { label: "Phát cho học sinh và chấm bằng chính bảng đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một giáo viên ngữ văn nhờ AI nháp rubric cho bài nghị luận ngắn. AI đưa mức 'xuất sắc: lập luận sâu sắc, thuyết phục'. Cô sửa lại thành 'nêu được hai lý do, mỗi lý do có một ví dụ từ bài đọc' để em nào cũng hiểu. Khi một em hỏi vì sao được 6, cô chỉ vào dòng 'mới có một lý do, chưa có ví dụ' và em tự biết cần thêm gì.",
    },
    quiz: [
      {
        question: "Vì sao mô tả từng mức của rubric nên dùng việc em làm được thay cho tính từ?",
        options: [
          "Vì học sinh nhìn vào mô tả là biết mình đã làm được gì và cần làm thêm gì",
          "Vì tính từ khó đánh máy hơn động từ",
          "Vì AI không hiểu các tính từ tiếng Việt",
          "Vì rubric dùng động từ thì bảng tự động ngắn hơn nhiều và chấm bài cũng nhanh hơn rất nhiều lần",
        ],
        correct: 0,
        explanation:
          "'Sâu sắc' hay 'thuyết phục' mỗi người hiểu một cách, còn 'nêu được hai lý do có ví dụ' thì đếm được. Lý do không nằm ở việc đánh máy hay AI không hiểu từ. Bảng dùng động từ cũng không tự ngắn lại: nó thường dài hơn một chút vì cụ thể hơn.",
      },
      {
        question: "Rubric bốn mức nên có bao nhiêu tiêu chí cho một bài viết ngắn?",
        options: [
          "Ba đến bốn",
          "Càng nhiều càng công bằng, khoảng mười đến mười hai tiêu chí cho chắc chắn không sót",
          "Chỉ một tiêu chí là 'chất lượng chung' để linh hoạt khi chấm từng bài",
          "Mỗi học sinh một bộ tiêu chí riêng để phù hợp với năng lực từng em",
        ],
        correct: 0,
        explanation:
          "Ba đến bốn tiêu chí đủ bao quát bài ngắn mà học sinh nhớ được. Mười hai tiêu chí làm rubric quá dài để chấm và để em đọc. Một tiêu chí chung chung quay lại vấn đề cũ là chấm cảm tính. Mỗi em một bộ tiêu chí thì không so sánh được và bạn không kịp chấm.",
      },
      {
        question: "AI nháp rubric với mô tả 'xuất sắc: bài viết hay, cuốn hút, giàu cảm xúc'. Bạn nên làm gì?",
        options: [
          "Viết lại thành hành vi quan sát được, ví dụ 'có mở bài nêu ý chính và hai ví dụ cụ thể'",
          "Giữ nguyên vì AI viết bằng ngôn từ đẹp hơn giáo viên",
          "Thêm tính từ cho mỗi mức để các mức khác nhau rõ hơn, và thêm cả dòng mô tả cảm xúc cho mức cao nhất",
          "Bỏ mức xuất sắc, chỉ giữ ba mức còn lại để chấm nhanh hơn",
        ],
        correct: 0,
        explanation:
          "Mô tả như 'cuốn hút' không cho phép hai người chấm cho cùng điểm. Viết lại thành điều nhìn thấy trong bài thì em hiểu và bạn nhất quán. Ngôn từ đẹp không làm rubric rõ hơn, thêm tính từ càng mơ hồ hơn, và bỏ mức cao nhất khiến em giỏi không có mục tiêu để vươn tới.",
      },
      {
        question: "Bạn muốn biết rubric mới có dùng được không. Cách kiểm nào hợp lý nhất?",
        options: [
          "Chấm thử hai bài đã có điểm của năm trước và xem có ra cùng mức không",
          "Phát ngay cho cả lớp và sửa nếu có em thắc mắc điểm",
          "Nhờ AI chấm thử và xem AI có đồng ý với rubric không",
          "Đọc lại thật kỹ bảng rubric ở nhà cho tới khi thấy hợp lý",
        ],
        correct: 0,
        explanation:
          "Chấm lại bài đã biết điểm cho thấy rubric có cho cùng kết quả bạn mong muốn không. Phát ngay cho cả lớp thì cả lớp là người thử nghiệm. AI chấm thử chỉ cho biết AI hiểu bảng thế nào, không kiểm được bảng có khớp với phán đoán của bạn. Đọc đi đọc lại không thay được một lần chấm thật.",
      },
      {
        question: "Rubric có bốn mức. Một em ở giữa mức 2 và mức 3 trong tiêu chí lập luận. Cách xử lý nào tốt nhất?",
        options: [
          "Chọn mức em đạt đủ mọi dòng mô tả, và ghi một dòng cần thêm gì để lên mức sau",
          "Cho mức cao hơn để động viên em, vì điểm không quan trọng bằng tinh thần",
          "Cho mức thấp hơn để em phải cố gắng hơn ở lần sau",
          "Tự thêm mức 2,5 vào rubric chỉ riêng cho em này",
        ],
        correct: 0,
        explanation:
          "Một mức chỉ được tính khi em đạt đủ các dòng mô tả của mức đó, và một dòng nhận xét cho biết bước kế tiếp. Nâng mức để động viên làm rubric mất ý nghĩa với cả lớp. Hạ mức để em cố gắng là phạt không có cơ sở. Thêm mức riêng cho một em phá vỡ tính thống nhất.",
      },
      {
        question: "Có nên đưa rubric cho học sinh trước khi các em làm bài không?",
        options: [
          "Nên, vì em biết bài được đánh giá theo điều gì ngay khi làm",
          "Không nên, vì học sinh sẽ chỉ làm đúng theo bảng mà không chịu nghĩ thêm điều gì ngoài bảng",
          "Chỉ đưa sau khi chấm để em xem lại điểm của mình",
          "Chỉ đưa cho nhóm học yếu để các em có định hướng làm bài",
        ],
        correct: 0,
        explanation:
          "Rubric đưa trước biến tiêu chí thành mục tiêu em hướng tới. Lo học sinh làm đúng theo bảng là có thể, nhưng vẫn tốt hơn để em đoán ý cô. Đưa sau khi chấm chỉ giải thích điểm mà không giúp em làm tốt hơn. Đưa riêng cho nhóm yếu tạo cảm giác gắn nhãn.",
      },
    ],
    keyTakeaways: [
      "Rubric là bảng tiêu chí x mức, viết bằng điều nhìn thấy trong bài.",
      "Ba đến bốn tiêu chí là đủ cho bài ngắn.",
      "AI nháp nhanh nhưng hay dùng tính từ mơ hồ, bạn viết lại thành hành vi.",
      "Thử rubric trên vài bài đã chấm trước khi dùng.",
      "Đưa rubric cho học sinh trước khi làm bài.",
    ],
    practicePrompt: {
      question:
        "Cô Hà nhờ AI viết rubric, thấy mức cao nhất ghi 'bài viết xuất sắc, sáng tạo'. Cô nên làm gì tiếp?",
      options: [
        "Viết lại thành điều nhìn thấy trong bài, rồi chấm thử hai bài cũ",
        "Giữ nguyên và bắt đầu chấm luôn vì AI viết đủ ý",
        "Đổi 'xuất sắc' thành 'rất xuất sắc' để mức cao nhất nổi bật hơn hẳn",
        "Bỏ hẳn tiêu chí 'sáng tạo' vì học sinh khó hiểu được từ này",
      ],
      correct: 0,
      explanation:
        "Tính từ mơ hồ cần được thay bằng hành vi quan sát được, và một lần chấm thử chỉ ra chỗ còn chưa khớp. Giữ nguyên thì hai người chấm vẫn ra hai kết quả. Đổi thành 'rất xuất sắc' chỉ thêm một tính từ. Bỏ tiêu chí đi thì mất đi thứ cô muốn đo, trong khi có thể mô tả nó cụ thể hơn.",
    },
    summary: {
      keyIdea: "Rubric tốt cho học sinh thấy mình đang ở đâu và bước kế tiếp là gì.",
      formula: "3-4 tiêu chí x 4 mức, mỗi mức là điều nhìn thấy trong bài + thử trên bài cũ = rubric dùng được.",
      commonMistake: "Giữ nguyên rubric AI viết bằng tính từ đẹp rồi chấm theo cảm nhận.",
      action: "Viết bốn dòng mô tả cho một tiêu chí duy nhất của bài sắp chấm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại bài bạn sắp chấm. Nhờ AI nháp rubric 3 tiêu chí x 4 mức, sau đó viết lại mọi tính từ mơ hồ thành điều nhìn thấy trong bài. Lấy hai bài cũ đã có điểm, chấm thử bằng rubric và xem điểm có khớp với điểm cũ không.",
      secondary: "Ghi một dòng: mức nào khó phân biệt nhất, để sửa mô tả lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Điểm số chỉ có ý nghĩa với học sinh khi các em hiểu vì sao mình được điểm đó. Rubric là cách trả lời câu hỏi 'sao em chỉ được 6' bằng bảng thay vì bằng cảm nhận. Bài này dạy cách dựng rubric bốn mức, có AI nháp và bạn chốt.",
      },
      {
        type: "feynman",
        title: "Rubric đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới thang đo chiều cao ở cửa phòng con: mỗi vạch có ghi số. Con không hỏi 'sao con thấp thế' mà nhìn vạch là biết cao bao nhiêu và còn thiếu bao nhiêu. Rubric là thang vạch cho một bài viết.",
        columns: ["Thành phần", "Thang đo chiều cao", "Rubric"],
        rows: [
          ["Vạch chia", "Mỗi vạch một số đo", "Mỗi mức một mô tả"],
          ["Dùng để", "Biết con cao bao nhiêu", "Biết bài đang ở mức nào"],
          ["Nhìn lên trên", "Vạch kế tiếp còn thiếu bao nhiêu", "Mức kế tiếp cần thêm điều gì"],
          ["Ai cũng đọc được", "Số đo rõ ràng", "Mô tả bằng việc nhìn thấy trong bài"],
        ],
        oneLiner: "Rubric là thang vạch cho bài viết: em nhìn vào thấy mình đang ở đâu và còn thiếu gì.",
      },
      { type: "heading", text: "AI nháp được gì, không nháp được gì" },
      {
        type: "paragraph",
        text: "AI nháp bảng rất nhanh: đưa tiêu chí, nó điền bốn mức. Nhưng nó viết bằng tính từ nghe hay như 'sâu sắc', 'thuyết phục', và nó không biết lớp bạn viết ở trình độ nào. Phần bạn làm là đổi tính từ thành điều em thật sự làm trong bài, và thử bảng trên vài bài cũ.",
      },
      {
        type: "flow",
        title: "Từ ba tiêu chí tới rubric dùng được",
        steps: [
          { label: "Chọn 3-4 tiêu chí", detail: "Ví dụ với bài nghị luận ngắn: nêu ý chính, lý do và ví dụ, trình bày. Đủ để bao quát, ít để em nhớ." },
          { label: "Nhờ AI nháp bốn mức", detail: "Nói rõ lớp, loại bài và yêu cầu 'mô tả bằng điều nhìn thấy trong bài, không dùng tính từ chung'." },
          { label: "Viết lại các mô tả mơ hồ", detail: "Chỗ nào ghi 'hay, sâu sắc' thì đổi thành 'có hai lý do, mỗi lý do một ví dụ'." },
          { label: "Chấm thử hai bài cũ", detail: "Bài đã có điểm mà bạn tin: nếu rubric cho kết quả khác, sửa mô tả cho tới khi khớp." },
          { label: "Phát cho học sinh trước khi làm bài", detail: "Em biết tiêu chí từ đầu, và khi nhận điểm chỉ cần nhìn bảng để hiểu." },
        ],
      },
      {
        type: "callout",
        label: "Rubric không thay phán đoán của bạn",
        text: "Nếu chấm xong thấy một bài rõ ràng hay mà rubric cho điểm thấp, đừng ép bài vào bảng. Đó là dấu hiệu bảng thiếu một tiêu chí hoặc mô tả chưa đúng. Ghi lại rồi sửa rubric, đừng lặng lẽ chấm ngoài bảng. Quy định chấm điểm của trường thì hỏi tổ trưởng chuyên môn.",
      },
      {
        type: "scenario",
        title: "Em hỏi: sao em chỉ được 6?",
        start: "s1",
        nodes: {
          s1: {
            text: "Sau giờ trả bài, Minh cầm bài viết 6 điểm đến hỏi 'cô ơi, sao em chỉ được 6 ạ? Bạn kia viết giống em mà được 8'.",
            choices: [
              { label: "Nói bài em chưa sâu bằng bạn, lần sau cố gắng hơn", next: "bad_vague" },
              { label: "Mở rubric, chỉ vào từng tiêu chí em đạt và tiêu chí còn thiếu", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Minh không biết 'sâu' là gì và không biết sửa chỗ nào. Em ra về với cảm giác bị so sánh, và lần sau vẫn viết như cũ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn chỉ ra Minh đạt mức 3 ở 'ý chính' và 'trình bày', nhưng mức 2 ở 'lý do và ví dụ' vì mới có một lý do, chưa có ví dụ. Minh hỏi: 'vậy bài bạn kia hơn em ở đâu?'.",
            choices: [
              { label: "Đọc cho Minh nghe bài của bạn kia để em so sánh", next: "bad_compare" },
              { label: "Chỉ vào dòng mức 3 của tiêu chí đó: cần hai lý do, mỗi lý do có ví dụ", next: "good" },
            ],
          },
          bad_compare: {
            text: "Bài của bạn kia bị đem ra so sánh trước mặt em khác. Bạn kia ngại, Minh vẫn chưa biết chính xác cần viết thêm gì cho bài của mình.",
            ending: "bad",
          },
          good: {
            text: "Minh đọc dòng mô tả và nói 'em chỉ cần thêm một ví dụ cho lý do thứ nhất ạ'. Tuần sau em nộp bài sửa và lên mức 3.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn 3-4 tiêu chí cho loại bài sắp chấm.",
          "Bước 2 - Nhờ AI nháp bốn mức, cấm dùng tính từ chung chung.",
          "Bước 3 - Viết lại mô tả thành điều nhìn thấy trong bài, rồi chấm thử hai bài cũ.",
          "Bước 4 - Đưa rubric cho học sinh trước khi các em làm bài.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Rubric bốn dòng cho em thấy mình đang ở đâu và bước kế tiếp là gì.",
          "Bài sau: phản hồi bài làm nhanh mà vẫn cụ thể.",
        ],
      },
    ],
  },
  {
    id: 2028,
    slug: "phan-hoi-bai-lam-nhanh-ma-van-cu-the",
    title: "Chặng 31, Bài 9: Phản hồi bài làm nhanh mà vẫn cụ thể",
    subtitle: "40 bài tự luận, 40 lời nhận xét: AI nháp câu chữ, bạn thêm một chi tiết chỉ bài này mới có.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có 40 bài tự luận và chỉ còn buổi tối. Viết nhận xét riêng cho từng em thì mất hết đêm. Nhờ AI viết cả loạt thì ra 40 câu 'em cần phát triển ý hơn' nghe giống hệt nhau, học sinh đọc là biết chẳng ai đọc bài mình. Cách vừa nhanh vừa thật là để AI nháp khung, còn bạn thêm một chi tiết lấy từ chính bài của em.",
    openingQuestion:
      "AI viết 40 lời nhận xét, nghe rất lịch sự nhưng nhiều câu giống nhau. Bạn nên xử lý thế nào?",
    openingOptions: [
      "Giữ khung AI nháp và thêm vào mỗi lời một chi tiết lấy từ bài của em đó",
      "Gửi luôn vì AI viết đúng chính tả và giọng văn lịch sự",
      "Viết lại cả 40 lời từ đầu bằng tay, không dùng AI nữa",
      "Chỉ đổi tên học sinh trong 40 lời nhận xét cho khác nhau",
    ],
    correctOption: 0,
    explanation:
      "Khung do AI nháp tiết kiệm phần khó nhất là tìm câu chữ. Một chi tiết lấy từ bài của em, như 'đoạn kể về chuyến đi ở quê rất sống động', chứng tỏ bạn đã đọc bài và làm lời nhận xét thành của riêng em. Gửi luôn thì học sinh nhận ra ngay lời chung. Viết tay hết bỏ phí phần AI làm tốt. Chỉ đổi tên vẫn giữ nguyên lời chung, chỉ đeo thêm tên.",
    diagram: [
      { label: "Đọc bài, ghi 1 chi tiết riêng của từng em", arrow: true },
      { label: "Nhờ AI nháp khung nhận xét theo tiêu chí", arrow: true },
      { label: "Ghép chi tiết riêng vào khung", arrow: true },
      { label: "Đọc lại một lượt, bỏ câu không đúng bài em đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một giáo viên lớp 8 nhờ AI viết nhận xét cho 40 bài tả người. Khung AI đưa ra: 'Bài viết có bố cục rõ ràng, cần bổ sung chi tiết'. Cô thêm cho từng em một câu như 'Câu tả đôi tay của bà rất thật'. Một phụ huynh sau đó nói con đã đọc lại lời nhận xét hai lần, vì em thấy cô thật sự đọc bài mình.",
    },
    quiz: [
      {
        question: "Vì sao nhận xét do AI viết cả loạt thường bị học sinh nhận ra là 'lời chung'?",
        options: [
          "Vì AI không đọc bài của từng em kỹ như bạn, nên lời nhận xét không gắn với chi tiết riêng nào",
          "Vì AI luôn viết dài hơn giáo viên nên học sinh ngại đọc",
          "Vì AI dùng từ khó nên học sinh không hiểu hết",
          "Vì máy không thể viết được giọng dịu dàng như người, nên lời nhận xét nào của máy cũng nghe lạnh lùng và xa cách",
        ],
        correct: 0,
        explanation:
          "Nếu bạn chỉ dán vài dòng, AI đoán lời nhận xét hợp với hầu hết bài, nên nhiều em nhận cùng một câu. Độ dài không phải là dấu hiệu chính. Từ khó không phải điểm yếu chung của AI. AI viết giọng dịu dàng được, vấn đề là nó không biết chi tiết của bài.",
      },
      {
        question: "Chi tiết riêng nào giúp nhận xét thật sự dành cho em Lan?",
        options: [
          "Nhắc tới câu 'ánh nắng rơi trên mái tóc bà' trong bài của Lan và nói vì sao câu đó hay",
          "Ghi thêm 'Lan là học sinh chăm ngoan'",
          "Viết nhận xét thật dài để thể hiện sự quan tâm",
          "Nhắc rằng Lan đã tiến bộ nhiều so với đầu năm học",
        ],
        correct: 0,
        explanation:
          "Chi tiết có thật là câu trong bài của Lan, chỉ bài này mới có. 'Chăm ngoan' và 'tiến bộ' áp dụng cho hầu hết học sinh và không nói gì về bài. Nhận xét dài không có nghĩa là cụ thể, nó có thể dài mà vẫn chung chung.",
      },
      {
        question: "Bạn nhờ AI: 'nhận xét bài em Nam, bài về chuyến đi biển' mà không dán bài. AI viết 'em miêu tả đàn cá heo rất sống động'. Điều gì đúng?",
        options: [
          "Câu đó có thể bịa: AI chưa thấy bài nên không biết trong bài có cá heo hay không",
          "Câu đó đúng vì chuyến đi biển thường có cá heo",
          "Câu đó an toàn vì chỉ khen thêm cho em",
          "Câu đó chỉ sai nếu bài của Nam không có chi tiết nào về biển hoặc về các loài động vật sống dưới nước",
        ],
        correct: 0,
        explanation:
          "AI dự đoán câu nghe hợp lý và có thể bịa một chi tiết chưa từng có trong bài. Nam đọc lời nhận xét sẽ thấy cô không đọc kỹ. Khen thêm vô căn cứ vẫn là sai sự thật. Ngay cả bài có nói về biển, cá heo vẫn có thể là chi tiết AI tự thêm.",
      },
      {
        question: "Thời gian chấm 40 bài. Cách nào tiết kiệm nhất mà vẫn cụ thể?",
        options: [
          "Ghi nhanh một chi tiết riêng khi đọc mỗi bài, sau đó nhờ AI dựng khung và ghép lại",
          "Nhờ AI đọc và nhận xét cả 40 bài chỉ với một câu lệnh",
          "Bỏ nhận xét cho những em đạt điểm cao và chỉ viết cho em yếu",
          "Viết một lời nhận xét chung cho cả lớp, in ra rồi dán vào mỗi bài để không ai bị nói là thiên vị",
        ],
        correct: 0,
        explanation:
          "Ghi chú một chi tiết trong lúc đọc mất khoảng nửa phút, còn AI lo phần câu chữ. Một câu lệnh cho cả 40 bài không có chi tiết riêng nào. Bỏ nhận xét ở em giỏi khiến các em không biết mình tốt ở đâu và vẫn có thể tiến thêm. Lời nhận xét chung cho cả lớp là chính cái ta muốn tránh.",
      },
      {
        question: "Nhận xét nên gồm những phần nào để học sinh biết làm gì tiếp?",
        options: [
          "Một điểm làm tốt, một điểm cần sửa và một việc cụ thể để làm ở lần sau",
          "Liệt kê đầy đủ mọi lỗi chính tả và ngữ pháp có trong bài để em thấy hết chỗ cần sửa",
          "Chỉ khen thật nhiều để em có thêm động lực, còn chuyện sửa lỗi thì để dành lần sau",
          "Chỉ ghi điểm số và một nhận xét chung về thái độ học tập của em trong cả học kỳ",
        ],
        correct: 0,
        explanation:
          "Ba phần cho em biết cái gì giữ, cái gì sửa và sửa bằng cách nào. Liệt kê mọi lỗi làm em choáng và không biết bắt đầu từ đâu. Chỉ khen thì em không biết cần sửa gì. Điểm cùng nhận xét về thái độ không nói gì về bài viết.",
      },
    ],
    keyTakeaways: [
      "AI nháp khung, bạn thêm một chi tiết riêng từ bài của em.",
      "Đừng nhờ AI nhận xét bài mà nó chưa được đọc: nó có thể bịa chi tiết.",
      "Nhận xét tốt có một điểm tốt, một điểm cần sửa, một việc làm tiếp.",
      "Ghi chú chi tiết riêng ngay khi đọc bài, mất nửa phút mỗi bài.",
      "Đọc lại một lượt để bỏ câu không đúng bài em đó.",
    ],
    practicePrompt: {
      question:
        "Cô Mai có 40 nhận xét AI viết, nhiều câu giống nhau. Cô chỉ có 30 phút. Cách nào hợp lý nhất?",
      options: [
        "Thêm một chi tiết riêng vào mỗi lời, khoảng 45 giây mỗi bài",
        "Gửi luôn để kịp giờ, và giải thích với học sinh rằng đây là nhận xét tự động",
        "Chọn ngẫu nhiên 10 bài để thêm chi tiết riêng, 30 bài còn lại gửi nguyên",
        "Nhờ AI viết lại 40 lời nhận xét thêm lần nữa cho khác nhau hơn",
      ],
      correct: 0,
      explanation:
        "Bốn mươi bài x 45 giây là 30 phút, vừa đủ, và mỗi em đều nhận một chi tiết riêng. Gửi luôn thì mất đúng điều cô muốn giữ. Chọn ngẫu nhiên khiến 30 em nhận lời chung mà không biết vì sao khác bạn. Viết lại lần nữa chỉ xáo câu chữ, chi tiết riêng vẫn chưa có.",
    },
    summary: {
      keyIdea: "Nhận xét nhanh vẫn cụ thể nếu có một chi tiết lấy từ chính bài của em.",
      formula: "Khung AI nháp + 1 chi tiết riêng từ bài + đọc lại = nhận xét không bị nhận ra là lời chung.",
      commonMistake: "Nhờ AI nhận xét bài mà nó chưa được đọc, rồi gửi nguyên văn.",
      action: "Đọc 5 bài, ghi mỗi bài một chi tiết riêng, rồi nhờ AI dựng khung cho 5 bài đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 5 bài tự luận của học sinh. Đọc mỗi bài và ghi một chi tiết riêng, tối đa một dòng. Nhờ AI dựng khung nhận xét gồm điểm tốt, điểm cần sửa, việc làm tiếp, rồi ghép chi tiết riêng vào từng lời. Đọc to lời nhận xét của bài thứ 3 và hỏi: có thể dán vào bài khác không?",
      secondary: "Đo thời gian: 5 bài mất bao nhiêu phút, để ước lượng cho cả lớp.",
    },
    sections: [
      {
        type: "lead",
        text: "Học sinh nhận ra ngay khi lời nhận xét không viết cho mình. Nhưng bạn cũng không thể viết tay 40 lời trong một buổi tối. Bài này dạy cách chia việc: AI lo khung câu, bạn lo một chi tiết chỉ bài này mới có.",
      },
      {
        type: "feynman",
        title: "Nhận xét nhanh mà cụ thể đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tấm thiệp chúc mừng in sẵn. Lời chúc in sẵn thì đẹp, nhưng người nhận chỉ thấy ấm lòng khi bạn viết thêm tay một câu về kỷ niệm của hai người. Nhận xét bài làm cũng vậy: khung là phần in sẵn, chi tiết riêng là câu viết tay.",
        columns: ["Thành phần", "Thiệp in sẵn", "Nhận xét bài làm"],
        rows: [
          ["Phần in sẵn", "Lời chúc chung", "Khung: điểm tốt, cần sửa, việc làm tiếp"],
          ["Câu viết tay", "Kỷ niệm của hai người", "Chi tiết lấy từ bài của em"],
          ["Ai làm", "Nhà in và bạn", "AI nháp và bạn"],
          ["Người nhận thấy", "Có người nghĩ tới mình", "Cô đã đọc bài mình"],
        ],
        oneLiner: "Khung cho AI, chi tiết cho bạn: một câu riêng làm cả lời nhận xét thành của em.",
      },
      { type: "heading", text: "Nhanh hơn bao nhiêu?" },
      {
        type: "paragraph",
        text: "Thử tính bằng thanh trượt bên dưới. Viết tay hết mất nhiều phút mỗi bài, còn dùng khung AI thì mỗi bài chỉ tốn thời gian nháp và thêm chi tiết riêng. Con số ở đây là minh hoạ, bạn chỉnh theo tốc độ của mình.",
      },
      {
        type: "chart",
        title: "Thời gian chấm nhận xét theo số bài",
        caption: "Số liệu minh hoạ: thời gian mỗi bài do bạn chỉnh bằng thanh trượt, không phải số đo thật của một công cụ nào.",
        kind: "line",
        xLabel: "Số bài cần nhận xét",
        yLabel: "Tổng số phút",
        x: { from: 5, to: 60, step: 5 },
        params: [
          { id: "tay", label: "Phút mỗi bài khi viết tay hoàn toàn", min: 3, max: 10, step: 1, value: 6, unit: "phút" },
          { id: "nhap", label: "Phút mỗi bài để dựng khung với AI", min: 0, max: 3, step: 1, value: 1, unit: "phút" },
          { id: "them", label: "Phút mỗi bài để thêm chi tiết riêng", min: 1, max: 4, step: 1, value: 1, unit: "phút" },
        ],
        series: [
          { label: "Viết tay hoàn toàn", expr: "x*tay" },
          { label: "Khung AI + chi tiết riêng", expr: "x*(nhap+them)" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI nháp khung nhận xét",
        task: "Bạn có ghi chú cho bài của em Lan: bài tả bà, câu 'ánh nắng rơi trên mái tóc bà' rất hay, bố cục rõ, thiếu chi tiết về giọng nói. Lắp yêu cầu để AI nháp khung mà không bịa chi tiết.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Nhận xét bài tả bà của em Lan, viết thật hay.", feedback: "AI chưa thấy bài nên tự bịa một chi tiết nghe hợp lý, Lan đọc sẽ biết cô chưa đọc kỹ." },
              { text: "Ghi chú của tôi: tả bà, câu 'ánh nắng rơi trên mái tóc bà' hay, bố cục rõ, thiếu tả giọng nói.", good: true, feedback: "Ghi chú thật giúp AI chỉ dùng những điều bạn đã thấy trong bài." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn dạng",
            options: [
              { text: "Viết một đoạn nhận xét đầy đủ.", feedback: "Không có cấu trúc nên AI trộn khen và chê, em không biết việc cần làm tiếp." },
              { text: "Ba câu: một điểm tốt, một điểm cần sửa, một việc làm tiếp; xưng cô, gọi em.", good: true, feedback: "Khung ba phần giúp em biết giữ gì, sửa gì và làm gì tiếp." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Có thể thêm ví dụ để nhận xét phong phú hơn.", feedback: "AI tự thêm ví dụ không có trong bài của em, bạn phải gỡ từng cái." },
              { text: "Chỉ dùng chi tiết trong ghi chú; chỗ nào thiếu thì để [bổ sung], không tự thêm.", good: true, feedback: "Chỗ trống rõ ràng cho bạn biết nơi cần thêm, thay vì chi tiết bịa nằm im." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "shape", "limit"],
            text: "Lan à, câu 'ánh nắng rơi trên mái tóc bà' rất đẹp, cô đọc mà thấy được hình ảnh bà. Bài của em bố cục rõ nhưng còn thiếu phần tả giọng nói của bà. Lần sau em thử thêm một câu tả giọng bà khi gọi em về ăn cơm nhé.",
          },
          {
            requires: ["input"],
            text: "Lan à, câu 'ánh nắng rơi trên mái tóc bà' rất đẹp. Em cũng tả rất sống động chiếc áo bà mặc và căn bếp nhỏ...\n\n(Ghi chú đúng nhưng AI thêm chiếc áo và căn bếp mà bài không có.)",
          },
          {
            text: "Lan à, em đã có một bài văn rất hay, giàu cảm xúc và bố cục hoàn chỉnh. Em cần phát triển ý hơn nữa và tiếp tục cố gắng nhé.\n\n(Lời chung có thể dán cho bất kỳ em nào.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Không dán bài của học sinh vào công cụ chưa được duyệt",
        text: "Bài làm có tên, đôi khi có chuyện gia đình. Chỉ đưa vào công cụ AI mà trường cho phép, và ưu tiên đưa ghi chú của bạn thay vì cả bài. Quy định về dữ liệu học sinh thì hỏi ban giám hiệu hoặc bộ phận công nghệ của trường.",
      },
      {
        type: "scenario",
        title: "Tối thứ Năm, 40 bài tự luận",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn chỉ có 90 phút để nhận xét 40 bài. AI đã nháp 40 lời, trong đó nhiều câu giống hệt.",
            choices: [
              { label: "Gửi hết 40 lời cho kịp giờ", next: "bad_send" },
              { label: "Đọc nhanh từng bài, thêm một chi tiết riêng vào mỗi lời", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sáng hôm sau hai em so bài và thấy nhận xét giống nhau từng chữ. Các em nói với cả lớp là cô dùng nhận xét tự động.",
            ending: "bad",
          },
          s2: {
            text: "Sau 20 bài, bạn thấy lời nhận xét của bài 15 nhắc tới một chi tiết mà AI thêm vào và bài không có.",
            choices: [
              { label: "Bỏ qua vì chỉ là một chi tiết nhỏ, em chắc không để ý", next: "bad_ignore" },
              { label: "Xoá chi tiết bịa, thay bằng chi tiết thật từ bài, rồi xem lại 5 lời gần nhất", next: "good" },
            ],
          },
          bad_ignore: {
            text: "Em đó đọc thấy cô khen một đoạn mà em không hề viết, và em hiểu rằng cô không đọc kỹ bài của mình.",
            ending: "bad",
          },
          good: {
            text: "Bạn xong lúc 10 giờ tối. Mỗi em nhận một lời nhận xét có một chi tiết thật, và không có chi tiết nào bịa.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đọc bài và ghi một chi tiết riêng cho mỗi em.",
          "Bước 2 - Nhờ AI dựng khung ba phần từ ghi chú, cấm thêm chi tiết.",
          "Bước 3 - Ghép chi tiết riêng, đọc lại để bỏ câu không đúng bài.",
          "Bước 4 - Kiểm thử một lời: nếu dán sang bài khác được, sửa lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI lo khung, bạn lo một chi tiết thật: đó là cách nhanh mà vẫn là lời của cô.",
          "Bài sau: gói đề, rubric và nhận xét mẫu cho một đơn vị bài học.",
        ],
      },
    ],
  },
  {
    id: 2029,
    slug: "mini-project-bo-de-va-rubric-mot-don-vi",
    title: "Chặng 31, Bài 10: Mini project: một đề kiểm tra, một rubric, một bộ nhận xét mẫu",
    subtitle: "Ba tờ giấy khớp nhau cho một đơn vị bài học, làm xong trong 20 phút thay vì cả buổi tối.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối đơn vị bài học bạn cần đề kiểm tra, cách chấm và lời nhận xét, và thường làm ba việc này rời nhau vào ba thời điểm. Đề hỏi một đằng, rubric chấm một nẻo, nhận xét lại khen chuyện khác. Ghép ba thứ ngay từ mục tiêu giúp chúng khớp nhau, và AI giúp bạn làm cả ba trong một buổi ngắn.",
    openingQuestion:
      "Bạn cần một đề kiểm tra, một rubric và vài nhận xét mẫu cho đơn vị bài học vừa dạy. Điểm bắt đầu nào giữ cho ba thứ khớp nhau?",
    openingOptions: [
      "Ba mục tiêu của đơn vị bài học, viết ra trước cả ba thứ",
      "Đề kiểm tra do AI soạn, rồi rubric và nhận xét làm theo đề",
      "Rubric do AI nháp, rồi đề và nhận xét làm theo bảng của nó",
      "Nhận xét mẫu viết trước cho học sinh, rồi tính ngược lại đề",
    ],
    correctOption: 0,
    explanation:
      "Mục tiêu là điểm chung: đề hỏi mục tiêu nào, rubric mô tả mức nào của mục tiêu đó, nhận xét nhắc đúng mục tiêu đó. Nếu bắt đầu từ đề AI soạn, rubric và nhận xét sẽ theo những gì AI tình cờ hỏi. Nếu bắt đầu từ rubric AI nháp, mục tiêu của bạn bị thay bằng mục tiêu AI đoán. Viết nhận xét trước rồi suy ngược lại đề là đi ngược thứ tự và dễ bỏ sót mục tiêu.",
    diagram: [
      { label: "Ba mục tiêu của đơn vị bài học", arrow: true },
      { label: "Ma trận đề: mỗi câu ứng với một mục tiêu", arrow: true },
      { label: "Rubric: mỗi tiêu chí lấy từ chính các mục tiêu đó", arrow: true },
      { label: "Nhận xét mẫu theo từng mức của rubric" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một giáo viên khoa học lớp 6 kết thúc đơn vị 'các trạng thái của nước'. Cô viết ba mục tiêu, nhờ AI soạn đề từ ma trận, nháp rubric bốn mức và ba nhận xét mẫu. Khi soát, cô phát hiện đề có một câu hỏi về vòng tuần hoàn nước, ngoài ba mục tiêu, và bỏ câu đó đi. Cả gói xong trong hai mươi phút.",
    },
    quiz: [
      {
        question: "Vì sao đề, rubric và nhận xét mẫu nên cùng xuất phát từ ba mục tiêu?",
        options: [
          "Để ba thứ khớp nhau: đề hỏi gì thì rubric chấm đúng thứ đó",
          "Để soạn ít việc hơn cho mình",
          "Để học sinh thấy bạn làm việc có hệ thống và chuyên nghiệp trong mắt phụ huynh",
          "Để AI có ít chữ hơn phải đọc trong mỗi lần bạn yêu cầu",
        ],
        correct: 0,
        explanation:
          "Khớp nhau là mục đích: học sinh làm đề, được chấm bằng bảng, đọc nhận xét, và cả ba nói về cùng một thứ. Tiết kiệm việc là hệ quả phụ chứ không phải lý do chính. Vẻ chuyên nghiệp không giúp học sinh học tốt hơn. Và số chữ AI phải đọc không phải mối quan tâm ở đây.",
      },
      {
        question: "Rubric của bạn có tiêu chí 'giải thích bằng ví dụ' nhưng đề không có câu nào đòi giải thích. Vấn đề là gì?",
        options: [
          "Tiêu chí không có chỗ nào để em thể hiện, nên đề và rubric lệch nhau",
          "Không có vấn đề, rubric có thể dài hơn đề",
          "Cần thêm tiêu chí vào đề để rubric có thêm chỗ dùng trong mọi bài",
          "Cần đổi rubric sang loại có sáu mức thay vì bốn mức để đủ chi tiết mà học sinh vẫn đọc được",
        ],
        correct: 0,
        explanation:
          "Một tiêu chí không được đề hỏi thì không ai đạt hay không đạt nó, bảng thành vô nghĩa ở dòng đó. Rubric không nên có dòng nào đề không đo, và ngược lại. Thêm tiêu chí không phải giải pháp, còn việc chuyển sáu mức không liên quan tới sự lệch.",
      },
      {
        question: "Nhận xét mẫu nên viết theo cách nào để dùng lại cho nhiều em?",
        options: [
          "Viết theo từng mức của rubric, có chỗ trống để thêm chi tiết riêng của em",
          "Viết một lời khen chung dùng cho mọi em ở mọi mức",
          "Viết một lời nhận xét thật dài, đủ mọi trường hợp có thể xảy ra ở lớp",
          "Chỉ viết nhận xét cho mức thấp nhất vì em giỏi không cần lời góp ý",
        ],
        correct: 0,
        explanation:
          "Mỗi mức của rubric có thể có một câu khung, bạn ghép thêm chi tiết riêng từng em, như bài trước đã làm. Lời khen chung không giúp em biết cần làm gì. Lời nhận xét quá dài cho mọi trường hợp thì không ai đọc hết. Bỏ qua em giỏi khiến em không biết mình cần giữ gì.",
      },
      {
        question: "AI đưa vào đề một câu hỏi về vòng tuần hoàn nước, ngoài ba mục tiêu của đơn vị. Bạn nên làm gì?",
        options: [
          "Bỏ câu đó hoặc dành cho đơn vị sau",
          "Giữ lại vì câu đó là kiến thức đúng và hay",
          "Thêm một mục tiêu thứ tư vào đơn vị để hợp thức hoá câu đó",
          "Chấm câu đó nhưng không tính điểm vào tổng",
        ],
        correct: 0,
        explanation:
          "Câu ngoài mục tiêu đo điều bạn chưa dạy. Đúng và hay không đủ để câu ở lại đề này. Thêm mục tiêu sau khi thấy câu là đảo ngược thứ tự làm việc. Chấm mà không tính điểm làm em mất thời gian làm câu vô nghĩa.",
      },
      {
        question: "Gói ba thứ đã xong. Bước nào cuối cùng đáng làm nhất trước khi dùng cho lớp?",
        options: [
          "Tự làm đề, chấm thử một bài mẫu bằng rubric và đọc một nhận xét mẫu",
          "Nhờ AI cho điểm chất lượng của cả gói rồi coi con số ấy là bằng chứng gói đã đủ tốt để dùng",
          "In ra và cất đi, đợi tới ngày kiểm tra mới xem lại",
          "Gửi cho học sinh xem trước để các em góp ý hoàn toàn",
        ],
        correct: 0,
        explanation:
          "Làm thử cả chuỗi (làm đề, chấm bằng rubric, đọc nhận xét) cho thấy chỗ nào ba thứ chưa khớp. Điểm chất lượng từ AI là con số không có căn cứ đo. Cất đi rồi xem lại ngày kiểm tra là quá muộn để sửa. Học sinh góp ý sau khi biết đề thì đề không còn giá trị kiểm tra.",
      },
      {
        question: "Trong gói có câu 'Theo quy định, đề kiểm tra phải có 30% câu vận dụng' do AI thêm vào phần hướng dẫn. Cách xử lý nào đúng?",
        options: [
          "Kiểm với quy định của trường hoặc tổ chuyên môn, chưa nói ra khi chưa xác nhận",
          "Giữ vì AI thường trích đúng các quy định phổ biến trong ngành giáo dục nên có thể tin và dùng luôn",
          "Thêm số điều luật vào để câu trông có căn cứ hơn",
          "Đổi 30% thành 20% cho hợp với đề của mình",
        ],
        correct: 0,
        explanation:
          "AI có thể bịa quy định và tỉ lệ nghe rất thật. Quy định là việc của tổ chuyên môn hoặc ban giám hiệu, hỏi họ chứ không tin máy. Thêm số điều luật là bịa nặng hơn. Đổi số thành 20% vẫn là dùng một con số không có nguồn.",
      },
    ],
    keyTakeaways: [
      "Ba thứ (đề, rubric, nhận xét) cùng xuất phát từ ba mục tiêu.",
      "Đề hỏi đúng thứ rubric chấm, nhận xét nhắc đúng thứ đó.",
      "Câu hoặc tiêu chí ngoài mục tiêu thì bỏ.",
      "Làm thử cả chuỗi: làm đề, chấm bằng rubric, đọc nhận xét.",
      "Quy định do AI nêu cần được tổ chuyên môn xác nhận.",
    ],
    practicePrompt: {
      question:
        "Thầy Đạt soạn xong đề và rubric riêng rẽ. Khi chấm thử, hai tiêu chí của rubric không có câu nào trong đề đo. Nên làm gì?",
      options: [
        "Quay lại ba mục tiêu, sửa đề hoặc rubric cho hai bên cùng đo mục tiêu ấy",
        "Chấm theo cảm nhận cho hai tiêu chí đó vì đề chưa kịp sửa",
        "Xoá luôn hai tiêu chí khỏi rubric, không cần xét mục tiêu",
        "Nhờ AI viết thêm hai câu đề bất kỳ cho đủ tiêu chí",
      ],
      correct: 0,
      explanation:
        "Hai thứ lệch nhau thì cần quay về mục tiêu chung để quyết định sửa bên nào. Chấm theo cảm nhận bỏ mất ý nghĩa của rubric. Xoá tiêu chí có thể bỏ mất mục tiêu bạn thật sự muốn đo. Hai câu bất kỳ cho đủ số không đo mục tiêu nào.",
    },
    summary: {
      keyIdea: "Một gói khớp nhau bắt đầu từ ba mục tiêu, không từ ba văn bản rời.",
      formula: "3 mục tiêu + ma trận đề + rubric cùng tiêu chí + nhận xét theo mức = gói bài kiểm tra khớp nhau.",
      commonMistake: "Soạn đề, rubric, nhận xét vào ba thời điểm khác nhau nên chúng nói ba chuyện khác nhau.",
      action: "Viết 3 mục tiêu cho đơn vị bài sắp kết thúc và dán vào đầu cả ba văn bản.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn đơn vị bài học sắp kết thúc. Viết 3 mục tiêu, nhờ AI soạn đề 8 câu theo ma trận, nháp rubric 3 tiêu chí x 4 mức và một nhận xét mẫu cho mỗi mức. Tự làm đề, chấm thử một bài bằng rubric, rồi gạch mọi câu hoặc tiêu chí không thuộc mục tiêu nào.",
      secondary: "Lưu ba thứ chung một tệp để tuần sau đơn vị mới chỉ cần đổi mục tiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước bạn đã học từng mảnh: ma trận đề, làm thử đáp án, rubric, nhận xét cụ thể. Bài này ghép chúng thành một gói cho một đơn vị bài học, và mọi mảnh đều xuất phát từ ba mục tiêu.",
      },
      {
        type: "feynman",
        title: "Một gói ba mảnh đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc nấu một bữa cơm: thực đơn, danh sách đi chợ và cách chia phần ăn cho từng người. Nếu thực đơn ghi canh chua mà danh sách đi chợ không có me, bữa cơm hỏng. Đề, rubric và nhận xét cũng phải cùng đọc từ một thực đơn: ba mục tiêu.",
        columns: ["Thành phần", "Bữa cơm", "Gói kiểm tra"],
        rows: [
          ["Thực đơn chung", "Món nào, cho mấy người", "Ba mục tiêu của đơn vị"],
          ["Đi chợ", "Mua đúng nguyên liệu của thực đơn", "Đề: mỗi câu ứng với một mục tiêu"],
          ["Chia phần", "Phần cho từng người", "Rubric: mức cho từng tiêu chí"],
          ["Lời nhắn khi ăn", "Nhắc món nào ngon, món nào cần thêm", "Nhận xét mẫu theo từng mức"],
        ],
        oneLiner: "Cùng một thực đơn cho ba việc: ba mục tiêu cho đề, rubric và nhận xét.",
      },
      { type: "heading", text: "Thứ tự làm để ba thứ không lệch nhau" },
      {
        type: "paragraph",
        text: "Làm theo thứ tự mục tiêu, ma trận và đề, rubric, nhận xét mẫu. Mỗi bước lấy đầu ra của bước trước làm đầu vào cho AI. Khi mỗi thứ đều dán ba mục tiêu ở đầu, AI ít có cơ hội đi lạc sang chủ đề khác.",
      },
      {
        type: "flow",
        title: "Từ ba mục tiêu tới gói đã thử",
        steps: [
          { label: "Viết ba mục tiêu", detail: "Mỗi mục tiêu bắt đầu bằng một động từ đo được: giải thích, so sánh, tính. Dán chúng vào đầu mọi yêu cầu gửi AI." },
          { label: "Ma trận và đề", detail: "Mỗi mục tiêu vài câu ở các mức khác nhau. AI soạn từng ô, bạn tự làm thử để kiểm đáp án." },
          { label: "Rubric ba tiêu chí", detail: "Tiêu chí lấy từ ba mục tiêu, bốn mức mô tả bằng điều nhìn thấy trong bài." },
          { label: "Nhận xét mẫu theo mức", detail: "Một câu khung cho mỗi mức: điểm tốt, điểm cần sửa, việc làm tiếp. Bạn sẽ thêm chi tiết riêng từng em khi chấm thật." },
          { label: "Làm thử cả chuỗi", detail: "Tự làm đề, chấm bài mẫu bằng rubric, đọc nhận xét. Gạch mọi câu hay tiêu chí không thuộc mục tiêu nào." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát gói kiểm tra AI vừa ghép",
        task: "Ba mục tiêu của bạn: nêu ba trạng thái của nước, giải thích vì sao nước đá tan, đọc biểu đồ nhiệt độ. AI ghép gói bên dưới. Bấm những dòng lệch hoặc do AI tự thêm.",
        segments: [
          { text: "Đề câu 1: Kể tên ba trạng thái của nước." },
          { text: "Đề câu 2: Vì sao viên nước đá để ngoài nắng thì tan?" },
          { text: "Đề câu 3: Vòng tuần hoàn nước gồm những bước nào?", error: "Vòng tuần hoàn nước không nằm trong ba mục tiêu; câu này đo điều chưa dạy trong đơn vị." },
          { text: "Rubric - tiêu chí 1: nêu đủ ba trạng thái và một ví dụ cho mỗi trạng thái." },
          { text: "Rubric - tiêu chí 3: đọc biểu đồ nhiệt độ, nói được nhiệt độ lúc nước sôi.", error: "Đề không có câu nào dùng biểu đồ, nên tiêu chí này không có chỗ nào để em thể hiện." },
          { text: "Hướng dẫn: theo quy định, đề kiểm tra phải có 30% câu vận dụng.", error: "Không có quy định nào được cung cấp; tỉ lệ 30% là AI tự thêm. Quy định về đề phải hỏi tổ chuyên môn." },
        ],
      },
      {
        type: "callout",
        label: "Mini project: bạn là người duyệt",
        text: "AI ghép rất nhanh và vì thế cũng lệch rất nhanh. Bạn không cần đọc mọi chữ, chỉ cần với từng câu, từng tiêu chí hỏi: 'nó thuộc mục tiêu nào?'. Không trả lời được thì bỏ hoặc sửa.",
      },
      {
        type: "scenario",
        title: "Cuối đơn vị, 20 phút để ghép cả gói",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dạy xong đơn vị 'các trạng thái của nước' và có 20 phút. Bạn đã viết ba mục tiêu.",
            choices: [
              { label: "Nhờ AI soạn luôn cả đề, rubric và nhận xét trong một yêu cầu", next: "bad_all" },
              { label: "Dán ba mục tiêu, nhờ AI soạn đề trước, rồi dùng đề đó để làm rubric", next: "s2" },
            ],
          },
          bad_all: {
            text: "Gói trông đầy đủ, nhưng rubric có tiêu chí về biểu đồ mà đề không có. Khi chấm bạn phải bỏ hai dòng và chấm theo cảm nhận.",
            ending: "bad",
          },
          s2: {
            text: "Đề có 8 câu. Bạn tự làm thử và thấy câu 6 không thuộc mục tiêu nào.",
            choices: [
              { label: "Giữ câu 6 vì kiến thức đúng và hay", next: "bad_keep" },
              { label: "Bỏ câu 6, xin thêm một câu cho mục tiêu còn thiếu, rồi làm rubric", next: "good" },
            ],
          },
          bad_keep: {
            text: "Rubric không có dòng nào cho câu 6, nên bạn chấm nó bằng cảm nhận và hai em hỏi vì sao câu đó ít điểm.",
            ending: "bad",
          },
          good: {
            text: "Bạn có đề, rubric và ba nhận xét mẫu khớp nhau sau 20 phút. Khi chấm thật, mỗi lời nhận xét chỉ cần thêm một chi tiết riêng của em.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết ba mục tiêu, dán vào đầu mọi yêu cầu gửi AI.",
          "Bước 2 - Ma trận và đề, tự làm thử để kiểm đáp án.",
          "Bước 3 - Rubric ba tiêu chí lấy từ chính mục tiêu, nhận xét mẫu theo từng mức.",
          "Bước 4 - Làm thử cả chuỗi, gạch mọi thứ không thuộc mục tiêu nào.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba mục tiêu đứng đầu, đề rubric nhận xét đi theo, và bạn duyệt từng chỗ lệch.",
          "Bài sau: nhận xét do AI viết, khi nào nghe đúng mà sai với em này.",
        ],
      },
    ],
  },
];
