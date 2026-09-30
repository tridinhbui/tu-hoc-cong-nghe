import type { Lesson } from "../lesson-types";

// Chặng 52, bài 6-10. Giáo trình: scripts/curriculum/stage-52.json.
// Nội dung về hàm bảng tính (SUMIF/SUMIFS, VLOOKUP, ISNUMBER, định dạng có điều kiện) là khái niệm bền, không nêu đường dẫn nút bấm hay giá.
export const S52_B_LESSONS: Lesson[] = [
  {
    id: 2445,
    slug: "cong-thuc-tinh-tong-theo-dieu-kien-cho-thu-chi",
    title: "Chặng 52, Bài 6: Công thức tính tổng theo điều kiện cho bảng thu chi cá nhân",
    subtitle: "Cuối tháng bạn hỏi bảng: tháng này ăn uống hết bao nhiêu? Một công thức trả lời, không cần cộng tay.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ngày 30 bạn mở bảng thu chi, thấy 80 dòng chi tiêu và tự hỏi mình đã tiêu bao nhiêu cho ăn uống. Lọc tay rồi bấm máy tính mất mười phút và dễ sót dòng. Một công thức tổng theo điều kiện làm việc đó trong một giây và tự cập nhật mỗi khi bạn thêm khoản mới.",
    openingQuestion:
      "Bảng thu chi của bạn có 80 dòng, mỗi dòng ghi ngày, hạng mục và số tiền. Bạn muốn biết tổng tiền ăn uống tháng này. Cách nào đáng tin và bền nhất?",
    openingOptions: [
      "Dùng công thức cộng các dòng có hạng mục là Ăn uống",
      "Lọc tay từng dòng Ăn uống rồi bấm máy tính cộng lại",
      "Cộng cả cột số tiền rồi trừ ước chừng các hạng mục khác",
      "Đếm số dòng Ăn uống rồi nhân với số tiền một bữa thường ăn",
    ],
    correctOption: 0,
    explanation:
      "Công thức tổng theo điều kiện quét từng dòng, chỉ lấy số tiền của dòng có hạng mục khớp, rồi cộng lại. Thêm khoản mới thì kết quả tự đổi. Lọc tay và bấm máy tính cho cùng kết quả một lần nhưng phải làm lại mỗi tháng và dễ sót dòng. Trừ ước chừng thì sai số ngay từ bước đầu. Đếm dòng nhân số tiền một bữa chỉ là đoán, vì các bữa ăn không bằng nhau.",
    diagram: [
      { label: "Bảng thu chi: Ngày, Hạng mục, Số tiền", arrow: true },
      { label: "Bạn nói điều kiện bằng lời: hạng mục nào, tháng nào", arrow: true },
      { label: "AI viết công thức và giải thích từng phần", arrow: true },
      { label: "Bạn cộng tay 3-4 dòng mẫu để kiểm kết quả" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một cô giáo tiểu học giữ bảng thu chi gia đình trong Google Sheets. Mỗi cuối tháng cô lọc tay từng hạng mục và thường lệch vài chục nghìn so với số dư thực. Cô nhờ AI viết công thức tổng theo hạng mục, rồi tự cộng tay năm dòng để kiểm. Từ đó cô chỉ nhập khoản mới, còn bảng tổng tự chạy.",
    },
    quiz: [
      {
        question: "Bảng có cột Ngày, Hạng mục, Số tiền. Hàm nào cộng số tiền chỉ ở những dòng có Hạng mục là Ăn uống?",
        options: [
          "SUMIF: cộng cột Số tiền ở những dòng có Hạng mục khớp chữ Ăn uống",
          "SUM: cộng cả cột Số tiền rồi tự trừ tay các hạng mục khác",
          "COUNTIF: đếm số dòng Ăn uống rồi nhân với tiền trung bình",
          "IF: đặt trong một ô để nó tự quét cả cột Hạng mục",
        ],
        correct: 0,
        explanation:
          "SUMIF làm đúng việc cần: xét điều kiện trên một cột và cộng ở cột khác. SUM cộng mọi dòng nên lẫn hạng mục khác. COUNTIF chỉ đếm số dòng, không cộng tiền. IF xét một ô duy nhất chứ không tự quét cả cột.",
      },
      {
        question: "Muốn cộng tiền ăn uống chỉ trong tháng 9, cần thêm gì?",
        options: [
          "Thêm điều kiện ngày bằng SUMIFS",
          "Lọc bảng theo tháng 9 bằng tay rồi mới cộng bằng công thức SUMIF cũ",
          "Nhân hai kết quả SUMIF với nhau",
          "Đổi chữ trong cột Hạng mục thành Ăn uống tháng 9 cho mọi dòng mới",
        ],
        correct: 0,
        explanation:
          "SUMIFS nhận nhiều điều kiện cùng lúc và chỉ cộng dòng thoả tất cả. Lọc tay làm công thức không tự cập nhật. Nhân hai kết quả SUMIF cho ra một số vô nghĩa, không phải tổng cần tìm. Đổi chữ hạng mục cho từng tháng làm bảng rối và không đếm theo hạng mục chung được nữa.",
      },
      {
        question: "Vì sao nên để chữ Ăn uống trong một ô riêng rồi trỏ công thức vào ô đó, thay vì gõ thẳng vào công thức?",
        options: [
          "Đổi ô đó sang Đi lại là có tổng mới mà không sửa công thức",
          "Công thức chạy nhanh hơn hẳn vì bảng bỏ qua chữ gõ thẳng",
          "Bảng tính bắt buộc điều kiện nằm trong ô riêng, nếu không sẽ báo lỗi",
          "Ô riêng giúp bảng tự đoán các hạng mục bạn quên nhập",
        ],
        correct: 0,
        explanation:
          "Một công thức, nhiều câu hỏi: chỉ đổi ô điều kiện. Gõ thẳng chữ vào công thức vẫn chạy đúng, không bị báo lỗi và không chậm hơn. Còn việc đoán hạng mục quên nhập thì không công thức nào làm được, bảng chỉ cộng những gì có trong dòng.",
      },
      {
        question:
          "Tháng này có bốn khoản Ăn uống: 50.000, 120.000, 80.000 và 250.000 đồng, cùng hai khoản Đi lại: 60.000 và 40.000 đồng. Công thức tổng cho Ăn uống ra bao nhiêu?",
        options: [
          "500.000 đồng (= 50 + 120 + 80 + 250 nghìn)",
          "600.000 đồng (= 500 + 100, cộng luôn hai khoản Đi lại vào)",
          "125.000 đồng (= 500.000 ÷ 4, đó là trung bình chứ không phải tổng)",
          "4 (= số dòng Ăn uống, đó là kết quả của COUNTIF chứ không phải tổng)",
        ],
        correct: 0,
        explanation:
          "Chỉ cộng bốn khoản Ăn uống: 50 + 120 + 80 + 250 = 500 nghìn. Con số 600.000 là lỗi cộng cả hạng mục khác, 125.000 là chia trung bình, còn 4 là số dòng. Cả ba đều là kết quả của một hàm khác, không phải tổng theo điều kiện.",
      },
      {
        question: "AI đưa bạn một công thức tổng. Bạn nên kiểm thế nào trước khi tin nó?",
        options: [
          "Tự cộng tay 3-4 dòng mẫu rồi so với kết quả công thức",
          "Hỏi lại AI có chắc công thức đúng không và tin câu trả lời đầu",
          "Thấy công thức không báo lỗi đỏ thì coi như đã đúng",
          "Chạy công thức trên toàn bộ dữ liệu rồi nhìn tổng xem có đẹp không",
        ],
        correct: 0,
        explanation:
          "Công thức sai vẫn có thể cho một con số trông hợp lý, nên cần đối chiếu với thứ bạn tự tính. AI xác nhận lại chính mình không phải là kiểm tra. Không báo lỗi chỉ nghĩa là công thức chạy được, không nghĩa là nó cộng đúng dòng. Tổng trông đẹp cũng không chứng minh gì.",
      },
    ],
    keyTakeaways: [
      "Muốn cộng theo điều kiện, dùng công thức tổng có điều kiện thay vì lọc tay.",
      "Thêm điều kiện (ví dụ tháng) thì dùng phiên bản nhiều điều kiện.",
      "Để điều kiện trong một ô riêng: đổi ô là đổi câu hỏi, công thức giữ nguyên.",
      "Nhờ AI viết và giải thích từng phần, nhưng bạn tự cộng tay vài dòng để kiểm.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nhờ AI viết công thức tổng tiền Đi lại, AI trả ra một số. Chị thấy số có vẻ hợp lý nên ghi luôn vào sổ chi tiêu. Bước nào còn thiếu?",
      options: [
        "Tự cộng tay vài dòng Đi lại rồi so với kết quả",
        "Xoá công thức đi và nhập lại kết quả bằng tay cho chắc",
        "Nhờ AI viết lại công thức bằng lời khác cho dễ hiểu hơn",
        "Đổi tên cột Số tiền để công thức chạy nhanh hơn",
      ],
      correct: 0,
      explanation:
        "Một số hợp lý chưa phải số đúng. Cộng tay vài dòng mẫu là cách rẻ nhất để biết công thức có quét đúng dòng không. Xoá công thức thì mất khả năng tự cập nhật. Viết lại bằng lời khác không kiểm được gì, còn đổi tên cột không liên quan tới tốc độ hay độ đúng.",
    },
    summary: {
      keyIdea: "Công thức tổng có điều kiện trả lời câu hỏi theo hạng mục và tự cập nhật khi bảng thêm dòng.",
      formula: "Cột điều kiện + giá trị cần khớp + cột số tiền = tổng của đúng những dòng đó.",
      commonMistake: "Tin con số công thức cho ra mà không cộng tay vài dòng để đối chiếu.",
      action: "Chọn một hạng mục chi tiêu của bạn và nhờ AI viết công thức tổng cho nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bảng thu chi của bạn (hoặc lập nhanh 15 dòng chi tiêu tuần qua với ba cột Ngày, Hạng mục, Số tiền). Nhờ AI viết công thức tổng cho hạng mục Ăn uống, rồi tự cộng tay năm dòng đầu để so với kết quả. Ghi lại hai con số cạnh nhau.",
      secondary: "Thử đổi ô điều kiện sang một hạng mục khác và xem kết quả đổi theo.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng, câu hỏi quen thuộc nhất với một bảng thu chi là: tôi đã tiêu bao nhiêu cho việc này? Bài này dạy bạn nhờ AI viết công thức trả lời câu đó, và tự kiểm bằng vài phép cộng tay.",
      },
      {
        type: "feynman",
        title: "Công thức tổng có điều kiện đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn cầm tập hoá đơn đi chợ và nhặt riêng những tờ ghi rau củ, rồi cộng các tờ đó lại. Công thức tổng có điều kiện làm đúng vậy, chỉ là nhanh hơn và không bao giờ mỏi mắt.",
        columns: ["Bước", "Tập hoá đơn giấy", "Công thức trong bảng"],
        rows: [
          ["Nhặt những tờ cần", "Chọn tờ ghi rau củ", "Chọn dòng có Hạng mục khớp điều kiện"],
          ["Đọc số tiền", "Đọc con số trên tờ đó", "Lấy số ở cột Số tiền của dòng đó"],
          ["Cộng lại", "Bấm máy tính", "Công thức tự cộng"],
          ["Có tờ mới", "Nhặt và cộng lại từ đầu", "Kết quả tự đổi"],
        ],
        oneLiner: "Công thức tổng có điều kiện là người nhặt đúng những dòng bạn chỉ định và cộng giúp bạn.",
      },
      { type: "heading", text: "Bạn chỉ cần nói ba điều với AI" },
      {
        type: "paragraph",
        text: "Để AI viết đúng, bạn không cần biết tên hàm. Bạn chỉ cần nói: bảng của bạn có những cột nào, bạn muốn cộng cột nào, và điều kiện là gì. Hàm phù hợp cho một điều kiện có tên là SUMIF, còn nhiều điều kiện như hạng mục kèm tháng thì là SUMIFS. Hai cái tên này đủ để bạn nhận ra công thức AI đưa có hợp việc không.",
      },
      {
        type: "chart",
        title: "Tổng chi theo hạng mục trong tháng",
        caption: "Số liệu minh hoạ, đơn vị triệu đồng. Đây là dạng kết quả bạn sẽ nhận khi chạy công thức cho từng hạng mục.",
        kind: "bar",
        yLabel: "Triệu đồng",
        data: [
          { label: "Ăn uống", values: [4.2] },
          { label: "Nhà ở", values: [5] },
          { label: "Đi lại", values: [1.3] },
          { label: "Giải trí", values: [0.9] },
        ],
        seriesLabels: ["Tháng này"],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết công thức tổng Ăn uống",
        task: "Bạn có bảng thu chi với cột A là Ngày, B là Hạng mục, C là Số tiền. Lắp yêu cầu để AI viết đúng công thức và giải thích được.",
        parts: [
          {
            id: "table",
            label: "Mô tả bảng",
            options: [
              { text: "Tôi có một bảng chi tiêu, viết giúp công thức tính tổng.", feedback: "AI không biết cột nào là tiền, cột nào là hạng mục nên tự đoán tên cột và công thức sẽ trỏ sai chỗ." },
              { text: "Cột A là Ngày, cột B là Hạng mục, cột C là Số tiền; dữ liệu từ dòng 2 tới dòng 200.", good: true, feedback: "AI biết chính xác cột nào chứa gì và vùng dữ liệu, nên công thức trỏ đúng ô." },
            ],
          },
          {
            id: "goal",
            label: "Điều cần tính",
            options: [
              { text: "Cho tôi tổng chi tiêu.", feedback: "Đó là tổng mọi dòng, không theo hạng mục: bạn nhận về một số mà bạn chưa hỏi." },
              { text: "Tính tổng Số tiền chỉ ở các dòng có Hạng mục là Ăn uống, để chữ Ăn uống trong ô E1.", good: true, feedback: "Điều kiện rõ và có ô riêng, nên đổi E1 là có hạng mục khác." },
            ],
          },
          {
            id: "explain",
            label: "Cách trả lời",
            options: [
              { text: "Chỉ cần đưa công thức, không giải thích.", feedback: "Bạn không có gì để kiểm: công thức sai vẫn trông giống công thức đúng." },
              { text: "Đưa công thức, giải thích từng phần bằng lời thường, và cho một ví dụ 3 dòng kèm kết quả đúng.", good: true, feedback: "Ví dụ 3 dòng cho bạn đối chiếu ngay bằng tay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["table", "goal", "explain"],
            text: "Công thức: =SUMIF(B2:B200, E1, C2:C200)\n\nPhần 1: B2:B200 là nơi xét điều kiện (cột Hạng mục). Phần 2: E1 là chữ cần khớp, ví dụ Ăn uống. Phần 3: C2:C200 là cột Số tiền sẽ được cộng.\n\nVí dụ: 3 dòng Ăn uống 50.000, 120.000, 80.000 và 1 dòng Đi lại 60.000 cho kết quả 250.000.",
          },
          {
            requires: ["table"],
            text: "Công thức: =SUM(C2:C200)\n\n(Đó là tổng mọi dòng, không có điều kiện hạng mục: AI trả lời câu bạn chưa hỏi vì yêu cầu không nói rõ điều cần tính.)",
          },
          {
            text: "Công thức: =SUMIF(A:A, \"Ăn uống\", B:B)\n\n(AI đoán cột: nó cộng cột B, là cột chữ Hạng mục, theo điều kiện trên cột Ngày. Kết quả bằng 0 hoặc vô nghĩa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dấu phân cách có thể khác",
        text: "Tuỳ vùng ngôn ngữ của bảng, các phần trong công thức được ngăn bằng dấu phẩy hoặc dấu chấm phẩy. Nếu công thức AI đưa báo lỗi, hãy thử đổi qua lại hai dấu đó trước khi kết luận công thức sai.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mô tả bảng: cột nào chứa gì, dữ liệu nằm ở dòng nào tới dòng nào.",
          "Bước 2 - Nói điều kiện bằng lời: hạng mục nào, tháng nào.",
          "Bước 3 - Xin công thức kèm giải thích từng phần và một ví dụ ba dòng.",
          "Bước 4 - Tự cộng tay vài dòng để so với kết quả công thức.",
        ],
      },
      {
        type: "scenario",
        title: "Cuối tháng, con số tổng lạ",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa công thức tổng Ăn uống và bảng hiện 6,8 triệu. Bạn nhớ tháng này không ăn nhiều tới vậy.",
            choices: [
              { label: "Tin bảng, ghi 6,8 triệu vào sổ chi tiêu", next: "bad_trust" },
              { label: "Cộng tay vài dòng Ăn uống và so với công thức", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Sau này bạn phát hiện công thức cộng cả khoản Nhà ở vì vùng điều kiện trỏ lệch cột. Bạn đã lên kế hoạch ngân sách tháng sau trên con số sai.",
            ending: "bad",
          },
          s2: {
            text: "Bạn cộng tay năm khoản Ăn uống đầu và thấy công thức cho kết quả lớn hơn. Bạn mở công thức và thấy vùng điều kiện lệch một cột.",
            choices: [
              { label: "Đưa công thức cho AI, nói rõ cột B là Hạng mục, cột C là Số tiền", next: "good" },
              { label: "Xoá công thức và nhập tổng bằng tay mỗi tháng", next: "bad_manual" },
            ],
          },
          bad_manual: {
            text: "Bạn mất lại mười phút mỗi cuối tháng và lại sai sót như cũ, dù công thức chỉ cần sửa một chỗ.",
            ending: "bad",
          },
          good: {
            text: "Công thức mới cho 4,2 triệu, khớp với phép cộng tay. Bạn ghi lại cách kiểm để tháng sau làm lại trong hai phút.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bạn nói điều kiện, AI viết công thức, bạn cộng tay vài dòng để kiểm.",
          "Bài sau: tra giá từ bảng sản phẩm sang bảng đơn hàng mà không gõ tay.",
        ],
      },
    ],
  },
  {
    id: 2446,
    slug: "cong-thuc-tra-cuu-gia-tu-bang-san-pham",
    title: "Chặng 52, Bài 7: Công thức tra cứu giá từ bảng sản phẩm sang bảng đơn hàng",
    subtitle: "Bạn gõ mã hàng, giá tự hiện. Điều cần học là kiểm nó ở cả ba trường hợp, kể cả mã không có thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn bán vài chục món hàng nhỏ và mỗi đơn lại gõ tay giá từng món. Giá đổi một lần là phải sửa ở cả chục dòng cũ, và chỉ cần gõ lệch một số là hoá đơn sai. Công thức tra cứu cho mỗi giá một nơi ở duy nhất, nhưng chỉ đáng tin khi bạn thử nó với cả mã đúng lẫn mã sai.",
    openingQuestion:
      "Bảng sản phẩm có 30 mã kèm giá. Khi lập đơn hàng, bạn gõ mã và muốn giá tự hiện. Điều gì làm cách này đáng tin hơn gõ tay giá?",
    openingOptions: [
      "Mỗi giá lưu một nơi, đổi giá một lần là mọi đơn theo",
      "Công thức tự thương lượng được giá thấp nhất cho bạn",
      "Bảng tính khoá các ô giá nên người khác không sửa được",
      "Mỗi đơn hàng cũ vẫn giữ nguyên giá tại thời điểm bán",
    ],
    correctOption: 0,
    explanation:
      "Công thức tra cứu đọc giá từ bảng sản phẩm mỗi lần bảng tính toán lại, nên giá chỉ tồn tại ở một nơi và không có hai phiên bản lệch nhau. Nó không thương lượng giá, cũng không tự khoá ô nào. Và có một điều cần biết: đơn cũ cũng đổi theo giá mới, vì công thức đọc giá hiện hành. Nếu cần giữ giá lúc bán, phải lưu riêng một cột giá chốt.",
    diagram: [
      { label: "Bạn gõ mã hàng vào bảng đơn hàng", arrow: true },
      { label: "Công thức tìm mã đó ở cột đầu của bảng sản phẩm", arrow: true },
      { label: "Công thức lấy giá ở cột bạn chỉ định", arrow: true },
      { label: "Bạn thử mã đầu, mã cuối và một mã không có thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chủ tiệm bánh nhỏ có bảng 25 loại bánh kèm giá. Trước đây chị gõ tay giá vào phiếu đơn và nhiều lần gõ nhầm 35.000 thành 53.000. Chị nhờ AI viết công thức tra giá theo mã bánh, rồi thử ba mã: mã đầu bảng, mã cuối bảng và một mã chị cố tình gõ sai. Mã sai hiện lỗi rõ ràng nên chị biết công thức không âm thầm điền bậy.",
    },
    quiz: [
      {
        question: "Bạn nhập mã SP07 nhưng bảng sản phẩm không có mã đó. Công thức tra cứu khớp chính xác sẽ làm gì?",
        options: [
          "Báo lỗi #N/A để bạn biết mã không tồn tại",
          "Tự lấy giá của mã gần giống nhất trong bảng để đơn hàng khỏi bị trống",
          "Trả về giá 0 và không báo gì cả",
          "Xoá luôn dòng đơn hàng đó khỏi bảng",
        ],
        correct: 0,
        explanation:
          "Tra cứu khớp chính xác không tìm thấy thì báo lỗi, và lỗi đó là tín hiệu tốt. Nó không đoán mã gần giống, không tự điền giá 0 và không xoá dòng của bạn. Chính vì vậy cần thử một mã không có thật để thấy lỗi đó xuất hiện.",
      },
      {
        question: "Nhà cung cấp đổi giá một sản phẩm. Bạn sửa giá ở đâu?",
        options: [
          "Chỉ ở bảng sản phẩm, các ô tra cứu sẽ lấy giá mới",
          "Ở từng dòng đơn hàng có mã đó",
          "Ở cả bảng sản phẩm lẫn bảng đơn hàng, để hai bên khớp nhau mỗi lần đổi",
          "Xoá bảng đơn hàng cũ rồi lập lại từ đầu sau mỗi lần đổi giá mới",
        ],
        correct: 0,
        explanation:
          "Toàn bộ ý nghĩa của tra cứu là giá nằm một chỗ. Sửa ở từng dòng đơn hàng là quay lại cách gõ tay. Sửa cả hai nơi dễ làm hai bên lệch nhau. Lập lại bảng sau mỗi lần đổi giá là mất công vô ích vì công thức tự cập nhật.",
      },
      {
        question: "Vì sao tra cứu giá từ bảng sản phẩm tốt hơn gõ tay giá vào từng dòng đơn hàng?",
        options: [
          "Mỗi giá chỉ lưu một nơi nên không bị lệch giữa các dòng và khi đổi giá chỉ sửa một chỗ",
          "Bảng tính cấm gõ tay giá khi đã có bảng sản phẩm riêng",
          "Tra cứu làm tệp nhẹ đi nên mở nhanh hơn rõ rệt",
          "Tra cứu tự làm tròn giá về hàng nghìn cho số liệu đẹp hơn",
        ],
        correct: 0,
        explanation:
          "Lợi ích nằm ở độ nhất quán: một nguồn giá, nhiều nơi dùng. Bảng tính không cấm gõ tay, công thức không làm tệp nhẹ hơn và không tự làm tròn giá nào. Nếu bạn tưởng nó làm tròn, hãy kiểm lại, vì làm tròn là việc một công thức khác phải nói rõ.",
      },
      {
        question: "Đơn hàng có SP01 giá 25.000 đồng, số lượng 3, và SP02 giá 40.000 đồng, số lượng 2. Tổng tiền đơn là bao nhiêu?",
        options: [
          "155.000 đồng (= 25.000 × 3 + 40.000 × 2)",
          "65.000 đồng (= 25.000 + 40.000, quên nhân số lượng)",
          "130.000 đồng (= (25.000 + 40.000) × 2, nhân chung một số lượng)",
          "195.000 đồng (= 25.000 × 3 + 40.000 × 3, dùng số lượng 3 cho cả hai)",
        ],
        correct: 0,
        explanation:
          "Mỗi dòng nhân giá với số lượng của chính nó: 75.000 + 80.000 = 155.000. Bỏ qua số lượng cho 65.000, nhân chung một số lượng cho 130.000, còn dùng nhầm số lượng của dòng trên cho 195.000. Sau khi công thức tra giá đúng, lỗi thường nằm ở phép nhân này.",
      },
      {
        question: "Ba mã thử để kiểm công thức tra cứu nên gồm những gì?",
        options: [
          "Một mã đầu bảng, một mã cuối bảng và một mã không tồn tại",
          "Ba mã đầu bảng, vì chúng dễ đối chiếu nhất",
          "Ba mã bất kỳ miễn là khác nhau",
          "Chỉ mã bán chạy nhất, vì các mã còn lại tra cứu giống hệt nên một mã là đủ",
        ],
        correct: 0,
        explanation:
          "Mã đầu và mã cuối lộ ra lỗi vùng tìm bị cắt thiếu, còn mã không tồn tại cho thấy công thức xử lý lỗi ra sao. Ba mã đầu bảng không chạm tới cuối vùng. Ba mã bất kỳ có thể đều nằm giữa. Một mã duy nhất không bảo đảm các mã khác đúng.",
      },
    ],
    keyTakeaways: [
      "Công thức tra cứu cho mỗi giá một nơi duy nhất: đổi giá một lần là mọi đơn theo.",
      "Nhớ rằng đơn cũ cũng đổi giá theo; muốn giữ giá lúc bán thì lưu cột giá riêng.",
      "Mã không tồn tại phải cho lỗi rõ ràng, không được âm thầm ra giá bịa.",
      "Thử ít nhất ba mã: đầu bảng, cuối bảng và một mã không có thật.",
    ],
    practicePrompt: {
      question:
        "Anh Toàn nhờ AI viết công thức tra giá, thử một mã đúng thấy ra giá đúng nên bắt đầu nhập 50 đơn. Bước nào còn thiếu?",
      options: [
        "Thử thêm mã cuối bảng và một mã không có thật",
        "Nhờ AI viết lại công thức cho dài và chi tiết hơn",
        "Nhập cả 50 đơn rồi mới kiểm kết quả một lượt ở cuối",
        "Sao chép công thức xuống 50 dòng mà chưa cần thử mã nào khác",
      ],
      correct: 0,
      explanation:
        "Một mã đúng chỉ chứng minh công thức chạy ở một chỗ. Mã cuối bảng lộ ra vùng tìm bị thiếu, mã không có thật cho biết nó báo lỗi hay điền bậy. Công thức dài hơn không đúng hơn. Nhập hết rồi mới kiểm thì lỗi đã nhân lên 50 lần, và sao chép xuống khi chưa thử là cách nhân lỗi nhanh nhất.",
    },
    summary: {
      keyIdea: "Tra cứu giúp mỗi giá một nơi, nhưng chỉ đáng tin khi bạn đã thử mã đầu, mã cuối và mã không có thật.",
      formula: "Mã hàng + vùng bảng sản phẩm + cột giá + khớp chính xác = giá đúng hoặc lỗi rõ ràng.",
      commonMistake: "Chỉ thử một mã đúng rồi tin rằng mọi mã đều đúng.",
      action: "Dựng bảng 5 sản phẩm và thử công thức tra cứu với 3 mã trước khi nhập đơn thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lập bảng sản phẩm 6 dòng (mã, tên, giá) từ đồ bạn thật sự bán hoặc mua hay dùng. Nhờ AI viết công thức tra giá theo mã vào bảng đơn hàng 5 dòng, rồi thử ba mã: mã đầu, mã cuối và một mã bạn gõ sai cố ý. Chụp hoặc chép lại kết quả của mã sai.",
      secondary: "Hỏi AI vì sao công thức cần khớp chính xác, và so câu trả lời với điều bạn vừa thấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Gõ giá tay vào từng dòng đơn hàng là cách nhanh nhất để có hai giá khác nhau cho cùng một món. Bài này dạy bạn tra giá từ một bảng duy nhất, và quan trọng hơn, cách thử để biết công thức đó không âm thầm sai.",
      },
      {
        type: "feynman",
        title: "Tra cứu giá đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn tìm số điện thoại một người trong danh bạ: bạn gõ tên, danh bạ trả về số. Công thức tra cứu chính là danh bạ đó, chỉ khác là nó tra mã hàng và trả về giá.",
        columns: ["Thành phần", "Danh bạ điện thoại", "Công thức tra giá"],
        rows: [
          ["Thứ bạn đưa vào", "Tên người", "Mã hàng"],
          ["Nơi tìm", "Cuốn danh bạ", "Bảng sản phẩm"],
          ["Thứ trả về", "Số điện thoại", "Giá của mã đó"],
          ["Không có trong sổ", "Không tìm thấy tên", "Báo lỗi, không tự bịa giá"],
        ],
        oneLiner: "Tra cứu là danh bạ của hàng hoá: đưa mã, nhận giá, và nếu không có mã thì nhận một lỗi thẳng thắn.",
      },
      { type: "heading", text: "Một nơi giữ giá, nhiều nơi dùng" },
      {
        type: "paragraph",
        text: "Bảng sản phẩm là nơi duy nhất ghi giá. Bảng đơn hàng chỉ ghi mã và số lượng, còn giá do công thức lấy về. Tên gọi phổ biến của công thức này là VLOOKUP, hoặc XLOOKUP ở bản mới hơn; bạn không cần nhớ chi tiết, chỉ cần nói với AI: tra mã ở cột A của bảng sản phẩm và lấy giá ở cột C, khớp chính xác.",
      },
      {
        type: "flow",
        title: "Một lần tra cứu đi qua những gì",
        steps: [
          { label: "Bạn gõ mã vào ô", detail: "Ví dụ SP02 ở cột Mã hàng của bảng đơn hàng. Đây là thứ duy nhất bạn phải nhập." },
          { label: "Công thức tìm mã ở cột đầu của bảng sản phẩm", detail: "Nó đi từ trên xuống, tìm dòng có mã đúng bằng mã bạn gõ. Khớp chính xác nghĩa là SP02 không được nhầm với SP020." },
          { label: "Lấy giá ở cột bạn chỉ định", detail: "Tìm thấy dòng rồi, công thức đọc ô ở cột giá cùng dòng đó." },
          { label: "Không tìm thấy thì báo lỗi", detail: "Mã sai cho lỗi #N/A. Đó là tín hiệu để bạn biết mã gõ nhầm, tốt hơn nhiều so với một giá bịa." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời giải thích công thức do AI viết",
        task: "AI giải thích công thức tra giá của bạn. Bấm vào những đoạn bạn cho là sai hoặc bịa rồi nộp.",
        segments: [
          { text: "Công thức =VLOOKUP(A2, SanPham!A:C, 3, FALSE) lấy mã hàng ở ô A2 rồi tìm mã đó trong cột đầu của bảng sản phẩm." },
          { text: "Số 3 nghĩa là lấy giá trị ở cột thứ ba của vùng A:C, tức cột giá." },
          { text: "FALSE nghĩa là chỉ chấp nhận mã khớp hoàn toàn, không tìm mã gần giống." },
          {
            text: "Nếu mã không tồn tại, công thức tự động trả về giá thấp nhất trong bảng để đơn hàng không bị trống.",
            error: "Sai: khớp chính xác không tìm thấy thì báo lỗi #N/A, không tự điền giá nào. Bịa ra một giá là đúng điều bạn cần tránh.",
          },
          { text: "Mã tra cứu phải nằm ở cột đầu của vùng, nên nếu cột Mã nằm sau cột Giá thì công thức này không tìm được." },
          {
            text: "Khi giá trong bảng sản phẩm đổi, các đơn hàng cũ đã nhập vẫn giữ nguyên giá cũ.",
            error: "Sai: công thức đọc giá hiện hành mỗi lần tính lại, nên đơn cũ cũng đổi theo. Muốn giữ giá lúc bán phải lưu riêng một cột giá chốt.",
          },
        ],
      },
      {
        type: "callout",
        label: "Che lỗi có thể nguy hiểm",
        text: "Bạn có thể bọc công thức để mã sai hiện chữ Không có mã thay vì #N/A, và nên làm vậy khi bảng đưa cho người khác. Nhưng hãy thử mã sai trước khi bọc: nếu chữ thông báo che mất việc công thức thật sự trả về 0, bạn sẽ không thấy lỗi nữa.",
      },
      {
        type: "scenario",
        title: "Thử ba mã trước khi nhập đơn thật",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa công thức tra giá. Bạn thử mã SP01 ở đầu bảng và ra đúng 25.000 đồng. Còn 50 đơn cần nhập.",
            choices: [
              { label: "Thấy đúng rồi, sao chép công thức xuống 50 dòng và nhập đơn", next: "bad_copy" },
              { label: "Thử thêm mã cuối bảng và một mã gõ sai cố ý", next: "s2" },
            ],
          },
          bad_copy: {
            text: "Mã cuối bảng nằm ngoài vùng công thức nên hiện lỗi. Bạn chỉ thấy khi 12 đơn đã nhập xong, và phải xem lại từng dòng xem dòng nào sai.",
            ending: "bad",
          },
          s2: {
            text: "Mã cuối bảng ra đúng giá. Mã gõ sai hiện #N/A, và bạn thấy một ô trống giá sẽ làm tổng tiền báo lỗi theo.",
            choices: [
              { label: "Nhờ AI bọc công thức để mã sai hiện chữ Không có mã, rồi thử lại mã sai", next: "good" },
              { label: "Bọc công thức để mã sai hiện 0 cho tổng tiền khỏi báo lỗi", next: "bad_zero" },
            ],
          },
          bad_zero: {
            text: "Mã gõ nhầm giờ hiện giá 0 và tổng tiền vẫn chạy. Một đơn thiếu ba món mà không ai hay, vì không còn lỗi nào báo.",
            ending: "bad",
          },
          good: {
            text: "Mã sai hiện Không có mã, mã đúng ra giá đúng. Bạn nhập 50 đơn và soát nhanh các ô có chữ thông báo.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Tạo bảng sản phẩm có cột mã ở ngoài cùng bên trái.",
          "Bước 2 - Nhờ AI viết công thức tra giá, nói rõ khớp chính xác.",
          "Bước 3 - Thử mã đầu bảng, mã cuối bảng và một mã không có thật.",
          "Bước 4 - Chỉ khi ba mã đều đúng mới sao chép xuống các dòng còn lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một nơi giữ giá, ba mã để thử, và lỗi rõ ràng tốt hơn một giá bịa.",
          "Bài sau: vì sao tổng lệch 3 triệu khi có ô chứa chữ trông như số.",
        ],
      },
    ],
  },
  {
    id: 2447,
    slug: "cong-thuc-lan-lon-kieu-so-va-chu-trong-o",
    title: "Chặng 52, Bài 8: Công thức sai vì ô chứa chữ trông như số",
    subtitle: "Tổng cộng lệch 3 triệu mà công thức không báo lỗi nào. Thủ phạm là vài ô nhìn như số nhưng thực chất là chữ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔢",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dán số liệu từ email hoặc từ một tệp của người khác vào bảng, cộng cột ra 12 triệu trong khi thực tế là 15 triệu. Công thức không báo lỗi, con số trông rất thật, và bạn mang nó đi báo cáo. Nhận ra ô chứa chữ trông như số là một trong những kỹ năng rẻ nhất để tránh sai số im lặng.",
    openingQuestion:
      "Cột Số tiền có 40 dòng. Bạn cộng ra 12 triệu nhưng tự cộng tay thấy khoảng 15 triệu. Công thức không báo lỗi. Điều gì có nhiều khả năng nhất?",
    openingOptions: [
      "Vài ô chứa chữ trông như số nên công thức bỏ qua",
      "Bảng tính bị lỗi phần mềm và cần phải cài đặt lại ứng dụng",
      "Công thức cộng bị giới hạn tối đa 12 triệu mỗi cột",
      "AI đã âm thầm sửa một số ô trong cột khi bạn dán vào",
    ],
    correctOption: 0,
    explanation:
      "Công thức cộng chỉ lấy các ô là số thật và lặng lẽ bỏ qua ô là văn bản, nên tổng thấp đi mà không có lỗi đỏ nào. Ô văn bản thường xuất hiện khi dán từ email, có thêm khoảng trắng hoặc chữ đi kèm như đ. Bảng tính hiếm khi lỗi phần mềm theo cách này, công thức cộng không có giới hạn 12 triệu, và AI không tự sửa ô nào trong bảng của bạn nếu bạn không đưa dữ liệu cho nó.",
    diagram: [
      { label: "Tổng nhìn ra sai hoặc lệch so với cộng tay", arrow: true },
      { label: "Soi dấu hiệu: số lệch về bên trái, ô có chữ đi kèm", arrow: true },
      { label: "Kiểm bằng ISNUMBER cho từng ô nghi ngờ", arrow: true },
      { label: "Làm sạch trên bản sao rồi đối chiếu tổng trước và sau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một kế toán viên nhận bảng chi phí từ ba phòng ban qua email rồi dán vào một bảng chung. Tổng chi phí lệch khoảng 3 triệu so với sổ. Chị nhận ra vài ô ở phòng thứ hai căn lề trái, còn các ô khác căn lề phải. Khi kiểm bằng ISNUMBER, đúng những ô đó cho FALSE. Sau khi làm sạch trên bản sao, tổng mới khớp với sổ.",
    },
    quiz: [
      {
        question: "Cột Số tiền có 40 dòng nhưng tổng lệch 3 triệu. Dấu hiệu nào gợi ý có ô chứa chữ?",
        options: [
          "Vài số nằm lệch về bên trái ô, khác các số còn lại",
          "Ô kết quả tổng hiện lỗi #VALUE! ngay khi công thức gặp ô chữ đầu tiên",
          "Ô chữ luôn có nền khác màu ô số",
          "Dòng chứa chữ luôn là dòng có số lớn nhất trong cả cột, nên dễ thấy",
        ],
        correct: 0,
        explanation:
          "Số thật thường căn về bên phải, còn chữ căn về bên trái, nên một ô lệch hàng là dấu hiệu tốt. Công thức cộng bỏ qua ô chữ mà không báo lỗi, không có lỗi đỏ nào. Bảng tính không tự đổi màu ô chữ, và chữ không liên quan tới độ lớn của số.",
      },
      {
        question: "Hàm nào cho biết một ô có phải số thật không?",
        options: [
          "ISNUMBER, trả về TRUE nếu ô chứa số thật",
          "ISTEXT, trả về TRUE nếu ô chứa số vì số nào hiển thị ra cũng là chữ",
          "LEN, trả về TRUE nếu ô có ký tự",
          "ISBLANK, trả về FALSE nếu ô có nội dung nên ô đó đã là số",
        ],
        correct: 0,
        explanation:
          "ISNUMBER trả lời đúng câu hỏi: ô này là số thật hay không. ISTEXT chỉ ra ô chữ chứ không khẳng định số. LEN đếm số ký tự, ô chữ cũng có ký tự. ISBLANK chỉ cho biết ô trống, ô chữ cũng không trống.",
      },
      {
        question: "Vì sao ô ghi 1.500.000 đ (có chữ đ đi kèm) không được công thức cộng tính vào?",
        options: [
          "Chữ đ đi kèm khiến bảng coi cả ô là văn bản, không phải số để cộng",
          "Dấu chấm ngăn nghìn luôn làm công thức cộng bỏ qua ô",
          "Công thức cộng chỉ nhận số nhỏ hơn một triệu",
          "Ô vẫn được cộng nhưng bị làm tròn xuống hàng triệu",
        ],
        correct: 0,
        explanation:
          "Bảng tính chỉ coi là số khi toàn bộ nội dung ô đọc được như một số. Chữ đ làm cả ô thành văn bản. Dấu chấm ngăn nghìn có thể vẫn là số thật, tuỳ vùng ngôn ngữ của bảng. Công thức cộng không có giới hạn một triệu và cũng không làm tròn ô nào.",
      },
      {
        question:
          "Cột có bốn ô: 400.000 và 600.000 là số thật, còn hai ô 1.500.000 là chữ trông như số. Công thức cộng cho ra bao nhiêu?",
        options: [
          "1.000.000 đồng (= 400.000 + 600.000, hai ô chữ bị bỏ qua)",
          "4.000.000 đồng (= cả bốn ô, nếu tất cả đều là số thật)",
          "2.500.000 đồng (= 1.000.000 + 1.500.000, chỉ tính một ô chữ)",
          "3.000.000 đồng (= 1.500.000 × 2, chỉ cộng hai ô chữ, bỏ hai ô số)",
        ],
        correct: 0,
        explanation:
          "Công thức chỉ cộng các ô số thật: 400.000 + 600.000 = 1.000.000. Con số 4.000.000 là tổng đúng nếu cả bốn ô đã sạch, nên chênh 3 triệu chính là phần bị bỏ qua. Hai đáp án còn lại là cộng nhầm: tính một ô chữ hoặc cộng ngược lại hai ô chữ.",
      },
      {
        question: "Cách làm sạch cột ô chữ an toàn nhất là gì?",
        options: [
          "Thử trên bản sao, đối chiếu tổng trước và sau",
          "Xoá hết ô trông như số rồi nhập lại toàn bộ bằng tay cho chắc",
          "Bảo AI tự sửa toàn bộ cột gốc rồi tin rằng tổng mới luôn đúng",
          "Đổi định dạng ô thành số là xong",
        ],
        correct: 0,
        explanation:
          "Làm trên bản sao giữ nguyên dữ liệu gốc, và so tổng trước sau cho biết việc làm sạch có thực sự đổi con số. Nhập lại bằng tay dễ gõ sai thêm. AI có thể chép nhầm số nên cần đối chiếu. Đổi định dạng ô thường không biến ô chữ đã có thành số thật.",
      },
      {
        question: "Bạn đã làm sạch các ô chữ nhưng tổng vẫn chưa khớp với sổ. Điều này nghĩa là gì?",
        options: [
          "Có thể còn ô chữ sót hoặc dòng bị thiếu, cần tìm tiếp",
          "Công thức cộng của bảng tính bị hỏng nên phải cộng hoàn toàn bằng tay",
          "Sổ chắc chắn sai nên bỏ qua con số của sổ và tin bảng",
          "AI đã làm lệch dữ liệu nên nên xoá cột đi dựng lại từ đầu",
        ],
        correct: 0,
        explanation:
          "Chưa khớp nghĩa là vẫn còn chênh lệch chưa giải thích: có thể sót ô chữ, sót dòng, hoặc sổ khác bảng ở một khoản. Công thức cộng hiếm khi hỏng. Coi sổ sai mà không kiểm là đoán. Xoá cột dựng lại mất dữ liệu mà chưa chắc thủ phạm là AI.",
      },
    ],
    keyTakeaways: [
      "Công thức cộng bỏ qua ô chữ mà không báo lỗi, nên tổng thấp đi trong im lặng.",
      "Dấu hiệu: số căn lề trái, có chữ đi kèm như đ, có khoảng trắng thừa.",
      "ISNUMBER cho biết một ô có phải số thật không.",
      "Làm sạch trên bản sao và đối chiếu tổng trước sau.",
    ],
    practicePrompt: {
      question:
        "Bạn thấy tổng thấp hơn cộng tay. Bạn đổi định dạng cả cột sang số và thấy tổng vẫn như cũ. Bước hợp lý tiếp theo là gì?",
      options: [
        "Dùng ISNUMBER kiểm từng ô nghi ngờ để tìm ô còn là chữ",
        "Đổi định dạng thêm lần nữa, rồi lần nữa, cho tới khi tổng thay đổi",
        "Bỏ công thức cộng và viết tổng bằng tay vào ô kết quả",
        "Xoá các dòng có số lớn vì chúng thường là nguyên nhân",
      ],
      correct: 0,
      explanation:
        "Đổi định dạng không luôn biến chữ thành số, nên cần tìm đúng ô còn là chữ bằng ISNUMBER. Đổi định dạng thêm lần nữa không có lý do gì cho kết quả khác. Viết tổng tay bỏ mất khả năng tự cập nhật, còn xoá dòng số lớn làm mất dữ liệu thật mà không chữa được gốc rễ.",
    },
    summary: {
      keyIdea: "Ô chữ trông như số khiến công thức cộng thiếu mà không báo lỗi; hãy nhận ra dấu hiệu và kiểm bằng ISNUMBER.",
      formula: "Tổng lệch + số căn trái + ISNUMBER = FALSE → ô đó là chữ, cần làm sạch.",
      commonMistake: "Đổi định dạng ô rồi tin rằng mọi ô chữ đã thành số.",
      action: "Lần tới dán số từ email vào bảng, hãy thử ISNUMBER trên vài ô trước khi cộng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một cột số trong bảng của bạn (chi tiêu, điểm, doanh thu) hoặc tạo nhanh 10 dòng rồi cố ý gõ ba ô có chữ đ hoặc khoảng trắng. So tổng của công thức cộng với tổng bạn tự cộng tay. Dùng ISNUMBER tìm ô chữ, rồi làm sạch trên một bản sao và ghi lại hai tổng trước và sau.",
      secondary: "Nhờ AI gợi ý cách tách chữ đ khỏi ô, rồi tự kiểm kết quả với ba ô mẫu.",
    },
    sections: [
      {
        type: "lead",
        text: "Sai sót đáng sợ nhất của một bảng tính không phải lỗi đỏ, mà là con số trông hợp lý nhưng thiếu vài triệu. Bài này dạy bạn thấy ô chữ trông như số và xử lý chúng mà không phá dữ liệu gốc.",
      },
      {
        type: "feynman",
        title: "Ô chữ trông như số đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một tờ tiền photocopy: nhìn giống tiền thật nhưng máy đếm tiền không nhận. Ô chứa chữ trông như số cũng vậy: mắt bạn thấy 1.500.000, nhưng công thức cộng không coi nó là số.",
        columns: ["Điều bạn thấy", "Tiền photocopy", "Ô chữ trông như số"],
        rows: [
          ["Bề ngoài", "Giống tờ tiền thật", "Giống con số thật"],
          ["Máy kiểm tra", "Máy đếm tiền", "Công thức cộng"],
          ["Điều xảy ra", "Máy nhả ra, không báo", "Công thức bỏ qua, không báo"],
          ["Cách phát hiện", "Soi dưới đèn", "Căn lề trái, ISNUMBER cho FALSE"],
        ],
        oneLiner: "Ô chữ trông như số là tờ photocopy: công thức lặng lẽ bỏ qua nó, nên bạn phải soi từng tờ đáng ngờ.",
      },
      { type: "heading", text: "Vì sao không có lỗi báo?" },
      {
        type: "paragraph",
        text: "Công thức cộng được thiết kế để bỏ qua ô chữ chứ không dừng lại. Nhờ vậy cột có thêm tiêu đề hay ghi chú vẫn cộng được, nhưng cũng vì vậy ô chữ trông như số bị bỏ qua không ai hay. Bạn chỉ thấy khi con số lệch so với thứ bạn tự tính. Đó là lý do mọi tổng quan trọng cần một lần đối chiếu.",
      },
      {
        type: "flow",
        title: "Từ tổng lệch tới cột sạch",
        steps: [
          { label: "Nhận ra tổng lệch", detail: "So tổng công thức với phép cộng tay vài dòng hoặc với số sổ sách. Lệch là lý do để đi tìm." },
          { label: "Soi dấu hiệu bên ngoài", detail: "Số căn lề trái, có chữ đ hoặc chữ VND đi kèm, có khoảng trắng thừa ở đầu hay cuối ô." },
          { label: "Kiểm bằng ISNUMBER", detail: "Đặt một cột phụ =ISNUMBER(C2) rồi kéo xuống. Ô nào cho FALSE là chữ." },
          { label: "Làm sạch trên bản sao", detail: "Tách chữ đ và khoảng trắng, đổi sang số. Làm trên bản sao để bản gốc còn nguyên." },
          { label: "Đối chiếu tổng", detail: "Tổng mới phải khớp phép cộng tay. Nếu không, vẫn còn ô chữ sót." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát chẩn đoán của AI về cột bị lệch",
        task: "Bạn đưa AI cột Số tiền bị lệch 3 triệu. AI giải thích nguyên nhân và cách sửa. Bấm những đoạn sai hoặc bịa rồi nộp.",
        segments: [
          { text: "Cột Số tiền có 40 dòng nhưng công thức cộng chỉ tính 37 ô, vì 3 ô còn lại bảng tính coi là văn bản." },
          { text: "Công thức cộng bỏ qua ô văn bản mà không báo lỗi, nên tổng thấp đi mà không có cảnh báo nào." },
          {
            text: "Ô có dấu chấm ngăn nghìn như 1.500.000 luôn là văn bản, dù bạn nhập thế nào.",
            error: "Sai: ô này có thể là số thật hoặc chữ tuỳ vùng ngôn ngữ của bảng và cách nhập. Phải kiểm bằng ISNUMBER chứ không đoán theo dấu chấm.",
          },
          { text: "Cách kiểm nhanh: đặt =ISNUMBER(C2) ở cột phụ rồi kéo xuống; ô nào ra FALSE là chữ." },
          {
            text: "Cách sửa nhanh nhất là nhờ AI gõ lại toàn bộ cột số, không cần đối chiếu vì AI chép lại không sai.",
            error: "Sai: AI có thể chép nhầm hoặc lệch số. Phải đối chiếu tổng trước và sau, và giữ bản gốc.",
          },
          { text: "Sau khi làm sạch, tổng mới cần khớp với tổng bạn tự cộng tay vài dòng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Khi ô là số thật",
          text: "Số căn lề phải, ISNUMBER cho TRUE, công thức cộng tính vào tổng. Sắp xếp theo thứ tự lớn nhỏ cho đúng.",
        },
        right: {
          label: "Khi ô là chữ trông như số",
          text: "Số căn lề trái, có thể có chữ hay khoảng trắng đi kèm, ISNUMBER cho FALSE. Công thức cộng bỏ qua ô này, và sắp xếp cũng bị lệch theo.",
        },
      },
      {
        type: "scenario",
        title: "Tổng thiếu 3 triệu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dán bảng chi phí từ email vào bảng chung. Công thức cộng ra 12 triệu, nhưng sổ ghi 15 triệu. Bạn cần nộp báo cáo trong một giờ.",
            choices: [
              { label: "Cộng thêm 3 triệu vào ô tổng bằng tay cho khớp sổ", next: "bad_plug" },
              { label: "Tìm vì sao thiếu: soi số căn trái và thử ISNUMBER", next: "s2" },
            ],
          },
          bad_plug: {
            text: "Báo cáo nộp đúng giờ, nhưng con số 15 triệu không còn nối với các dòng. Tuần sau thêm một dòng mới, tổng không đổi theo, và không ai hiểu vì sao.",
            ending: "bad",
          },
          s2: {
            text: "ISNUMBER cho FALSE ở ba ô có chữ đ. Bạn biết đã tìm ra ba ô bị bỏ qua.",
            choices: [
              { label: "Làm sạch trực tiếp trên bảng gốc, không cần bản sao vì việc này đơn giản", next: "bad_orig" },
              { label: "Sao bảng, làm sạch trên bản sao, rồi đối chiếu tổng với sổ", next: "good" },
            ],
          },
          bad_orig: {
            text: "Một thao tác xoá nhầm ký tự làm hỏng hai ô sẵn là số thật. Bạn không còn bản gốc để so nên mất nửa giờ dựng lại số liệu.",
            ending: "bad",
          },
          good: {
            text: "Sau khi làm sạch, tổng là 15 triệu, khớp sổ, và các dòng mới thêm sau này vẫn được cộng vào. Bạn ghi lại ba ô đã sửa.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nhớ mỗi lần dán dữ liệu ngoài",
        text: "Số dán từ email, tệp PDF hay tin nhắn thường mang theo khoảng trắng và chữ đi kèm. Hãy coi dữ liệu dán vào là chưa sạch cho tới khi tổng đã khớp một con số bạn tự tính.",
      },
      {
        type: "closing",
        lines: [
          "Tổng lệch mà không có lỗi: đi tìm ô chữ trông như số, sửa trên bản sao, rồi đối chiếu.",
          "Bài sau: tô màu tự động để thấy ngay việc quá hạn.",
        ],
      },
    ],
  },
  {
    id: 2448,
    slug: "dinh-dang-co-dieu-kien-de-thay-han-qua-han",
    title: "Chặng 52, Bài 9: Tô màu tự động để thấy ngay việc quá hạn",
    subtitle: "Mỗi sáng mở bảng, việc nào quá hạn tự đỏ, việc sắp tới hạn tự vàng. Bạn chỉ cần một quy tắc và một cách thử.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🎨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng việc cần làm của bạn có 60 dòng, và hạn nộp nằm lẫn trong một cột ngày dài. Bạn phải đọc từng ngày để biết việc nào trễ. Một quy tắc tô màu làm công việc đọc đó mỗi sáng, nhưng chỉ đáng tin nếu bạn đã thử nó với ngày giả, kể cả trường hợp việc đã xong mà vẫn trễ hạn.",
    openingQuestion:
      "Bảng việc của bạn có cột Hạn nộp và cột Trạng thái. Bạn muốn việc quá hạn tự tô đỏ, nhưng việc đã Xong thì không. Quy tắc nào đúng?",
    openingOptions: [
      "Tô đỏ khi hạn đã qua và trạng thái không phải Xong",
      "Tô đỏ mọi dòng có ngày hạn, vì ngày hạn nào cũng cần chú ý",
      "Tô đỏ khi hạn đúng bằng hôm nay và trạng thái còn trống",
      "Tô đỏ những dòng có số ký tự trong tên việc nhiều nhất",
    ],
    correctOption: 0,
    explanation:
      "Một quy tắc tốt có hai điều kiện: ngày hạn nhỏ hơn hôm nay, và việc chưa xong. Thiếu điều kiện thứ hai thì việc làm xong từ tuần trước vẫn đỏ rực và bạn dần ngó lơ màu đỏ. Tô mọi dòng có ngày hạn làm cả bảng đỏ. Điều kiện bằng đúng hôm nay bỏ sót các việc đã trễ từ hôm qua. Tên việc dài hay ngắn chẳng liên quan tới hạn nộp.",
    diagram: [
      { label: "Cột Hạn nộp và cột Trạng thái", arrow: true },
      { label: "Quy tắc đỏ: hạn nhỏ hơn hôm nay và chưa Xong", arrow: true },
      { label: "Quy tắc vàng: hạn trong ba ngày tới và chưa Xong", arrow: true },
      { label: "Thử bằng ngày giả trước khi tin màu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm nhỏ quản lý 40 đầu việc trong bảng chung. Bảng của anh lúc đầu chỉ có quy tắc hạn nhỏ hơn hôm nay nên các việc đã xong vẫn đỏ. Sau hai tuần nhóm bỏ thói quen nhìn màu. Anh nhờ AI thêm điều kiện Trạng thái khác Xong, rồi thử bằng ngày giả trong một ô riêng. Màu đỏ quay lại có ý nghĩa.",
    },
    quiz: [
      {
        question: "Quy tắc tô đỏ dòng quá hạn dựa trên điều kiện nào?",
        options: [
          "Ngày hạn nhỏ hơn ngày hôm nay",
          "Ngày hạn lớn hơn ngày hôm nay, vì hạn càng xa thì càng cần chú ý",
          "Ngày hạn đúng bằng hôm nay và trạng thái còn đang trống",
          "Số ô trong dòng có chữ nhiều hơn số ô còn trống",
        ],
        correct: 0,
        explanation:
          "Quá hạn nghĩa là hạn đã nằm trước hôm nay, tức nhỏ hơn. Điều kiện lớn hơn tô việc chưa tới hạn, ngược hẳn ý muốn. Bằng đúng hôm nay chỉ bắt được việc tới hạn hôm nay, bỏ sót mọi việc trễ từ trước. Số ô có chữ thì không liên quan tới ngày.",
      },
      {
        question: "Bạn muốn dòng đã Xong không còn tô đỏ dù quá hạn. Nên làm gì?",
        options: [
          "Thêm điều kiện cột Trạng thái khác Xong vào quy tắc tô đỏ",
          "Xoá ngày hạn của các dòng đã xong cho khỏi bị tô màu",
          "Tô thêm nền trắng đè lên các dòng xong bằng tay",
          "Đổi ngày hạn các dòng xong thành ngày mai",
        ],
        correct: 0,
        explanation:
          "Đưa điều kiện Trạng thái vào ngay trong quy tắc thì mọi dòng xong tự hết đỏ, kể cả dòng mới. Xoá ngày hạn mất thông tin để nhìn lại. Tô trắng bằng tay phải làm mỗi lần có việc xong. Đổi ngày hạn thành ngày mai làm sai dữ liệu thật.",
      },
      {
        question: "Muốn thử quy tắc tô màu mà không chờ tới ngày thật, nên làm gì?",
        options: [
          "Đưa ngày hôm nay vào một ô ngày giả do bạn tự gõ",
          "Chỉnh đồng hồ máy tính sang ngày khác rồi mở lại bảng, vì bảng đọc giờ của máy",
          "Gõ ngày hạn giả vào các dòng thật của bạn rồi nhớ sửa lại sau",
          "Chờ tới đúng ngày hạn thật rồi mới biết quy tắc có chạy hay không",
        ],
        correct: 0,
        explanation:
          "Khi quy tắc đọc ngày từ một ô, bạn đổi ô đó là thử được mọi tình huống ngay. Chỉnh đồng hồ máy không phải cách đáng tin và có thể làm hỏng việc khác. Sửa dữ liệu thật rồi nhớ trả lại rất dễ quên và làm bảng sai. Chờ ngày thật nghĩa là bạn chỉ biết quy tắc sai khi đã lỡ việc.",
      },
      {
        question:
          "Hôm nay là 10/9. Quy tắc tô vàng là hạn từ ngày mai tới ba ngày sau. Trong các hạn 11/9, 13/9 và 14/9, những ngày nào được tô vàng?",
        options: [
          "11/9 và 13/9 (hôm nay + 3 = 13/9, nên 14/9 nằm ngoài)",
          "11/9, 13/9 và 14/9 (đếm cả ngày thứ tư là 14/9)",
          "Chỉ 11/9 (nhầm khoảng ba ngày thành chỉ riêng ngày mai)",
          "Không ngày nào, vì hạn phải đúng bằng 10/9 mới tô vàng",
        ],
        correct: 0,
        explanation:
          "Cửa sổ ba ngày tính từ hôm nay: 10/9 + 3 = 13/9, nên 11/9 và 13/9 nằm trong, còn 14/9 là ngày thứ tư. Đếm thêm 14/9 là lỗi lệch một ngày. Chỉ tô 11/9 bỏ sót 13/9, còn điều kiện đúng bằng 10/9 là quy tắc của tô đỏ cho hạn trong ngày chứ không phải cảnh báo sớm.",
      },
      {
        question: "Vì sao công thức của quy tắc tô màu thường viết $D2 với dấu $ trước cột D?",
        options: [
          "Để cả dòng tô theo ô ngày hạn của chính dòng đó",
          "Để bảng hiểu số ở cột D là đồng chứ không phải đô la",
          "Để quy tắc chỉ áp vào dòng đầu tiên và bỏ qua các dòng còn lại",
          "Để công thức không bao giờ báo lỗi khi ô ngày bị bỏ trống",
        ],
        correct: 0,
        explanation:
          "Dấu $ trước chữ cột khoá cột D lại, còn số dòng thì đổi theo từng dòng, nên mỗi dòng xét đúng ngày hạn của nó. Dấu $ không nói gì về đơn vị tiền. Quy tắc vẫn áp cho cả vùng chứ không chỉ dòng đầu. Còn ô ngày trống thì cần xử lý riêng bằng một điều kiện khác.",
      },
    ],
    keyTakeaways: [
      "Một quy tắc tô màu tốt có hai điều kiện: hạn đã qua và việc chưa xong.",
      "Màu đỏ chỉ có ý nghĩa khi việc đã xong thì không đỏ.",
      "Đưa ngày hôm nay vào một ô ngày giả để thử mà không sửa dữ liệu thật.",
      "Dấu $ khoá cột, để mỗi dòng xét ngày hạn của chính nó.",
    ],
    practicePrompt: {
      question:
        "Anh Phúc đặt quy tắc tô đỏ khi hạn nhỏ hơn hôm nay. Sau một tuần, nửa bảng đỏ vì nhiều việc đã xong nhưng hạn đã qua. Sửa gì trước hết?",
      options: [
        "Thêm điều kiện Trạng thái khác Xong vào quy tắc",
        "Xoá các dòng việc đã xong khỏi bảng để hết đỏ hẳn",
        "Đổi quy tắc sang tô đỏ mọi dòng cho đồng bộ",
        "Bỏ quy tắc tô màu và đọc lại ngày bằng mắt",
      ],
      correct: 0,
      explanation:
        "Gốc vấn đề là quy tắc thiếu điều kiện trạng thái. Xoá dòng xong mất lịch sử công việc. Tô đỏ mọi dòng làm màu đỏ mất ý nghĩa hoàn toàn. Bỏ quy tắc thì trở về cách đọc ngày bằng mắt vừa chậm vừa dễ sót.",
    },
    summary: {
      keyIdea: "Tô màu theo hạn chỉ hữu ích khi quy tắc có điều kiện trạng thái và đã được thử bằng ngày giả.",
      formula: "Đỏ = hạn nhỏ hơn hôm nay và chưa Xong; Vàng = hạn trong ba ngày tới và chưa Xong.",
      commonMistake: "Quên điều kiện trạng thái nên việc đã xong vẫn đỏ, rồi dần không ai nhìn màu nữa.",
      action: "Đặt hai quy tắc đỏ và vàng cho bảng việc của bạn rồi thử với ngày giả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lập bảng 8 dòng việc của tuần này với cột Việc, Hạn nộp, Trạng thái. Nhờ AI viết hai quy tắc tô màu: đỏ cho việc quá hạn chưa xong, vàng cho việc tới hạn trong ba ngày. Sau đó đưa ngày hôm nay vào một ô riêng, đổi nó sang ngày sau 5 ngày và chụp lại bảng để xem màu đổi ra sao.",
      secondary: "Đổi một dòng thành Xong và kiểm tra nó hết màu.",
    },
    sections: [
      {
        type: "lead",
        text: "Một cột ngày dài không cho bạn biết việc nào đang cháy. Bài này dạy bạn đặt hai quy tắc màu để bảng tự báo, và cách thử chúng bằng ngày giả trước khi tin.",
      },
      {
        type: "feynman",
        title: "Tô màu theo hạn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới đèn giao thông trên đường bạn đi làm: bạn không đọc biển số từng xe, chỉ nhìn màu đèn và biết ngay phải dừng hay đi. Quy tắc tô màu làm điều đó cho bảng việc của bạn.",
        columns: ["Tín hiệu", "Đèn giao thông", "Bảng việc"],
        rows: [
          ["Màu cần dừng ngay", "Đèn đỏ", "Dòng quá hạn chưa xong"],
          ["Màu cảnh báo", "Đèn vàng", "Dòng hạn trong ba ngày tới"],
          ["Không cần chú ý", "Đèn xanh hoặc tắt", "Dòng đã xong hoặc còn xa"],
          ["Ai đổi màu", "Bộ điều khiển tự chạy", "Quy tắc tự tính lại theo ngày"],
        ],
        oneLiner: "Quy tắc tô màu là bộ điều khiển đèn cho bảng việc: nó tự đổi màu khi ngày thay đổi.",
      },
      { type: "heading", text: "Hai quy tắc, mỗi quy tắc hai điều kiện" },
      {
        type: "paragraph",
        text: "Bạn chỉ cần hai quy tắc dựng bằng công thức tuỳ chỉnh. Quy tắc đỏ nói: hạn nhỏ hơn hôm nay và trạng thái khác Xong. Quy tắc vàng nói: hạn từ hôm nay tới hôm nay cộng ba ngày và trạng thái khác Xong. Bạn mô tả bằng lời cho AI, và nó viết công thức; việc của bạn là kiểm xem công thức có đúng ý mình không.",
      },
      {
        type: "list",
        items: [
          "Đỏ: =AND($D2<TODAY(), $E2<>\"Xong\"), tức hạn D đã qua và trạng thái E chưa Xong.",
          "Vàng: =AND($D2>=TODAY(), $D2<=TODAY()+3, $E2<>\"Xong\").",
          "Thay TODAY() bằng ô ngày giả như $H$1 khi bạn muốn thử mà không chờ.",
          "Dấu $ trước cột D giữ cho mỗi dòng xét ngày hạn của chính nó.",
        ],
      },
      {
        type: "flow",
        title: "Đi từ ý muốn tới màu đúng",
        steps: [
          { label: "Nói bằng lời với AI", detail: "Hạn ở cột D, trạng thái ở cột E, dữ liệu từ dòng 2. Đỏ khi hạn đã qua và chưa Xong, vàng khi hạn trong ba ngày tới và chưa Xong." },
          { label: "Nhận công thức cho từng quy tắc", detail: "Hai công thức riêng, mỗi công thức một màu. Yêu cầu AI giải thích từng phần bằng lời." },
          { label: "Đưa ngày hôm nay vào một ô", detail: "Đặt ô H1 chứa ngày. Sửa công thức để đọc ô này thay vì TODAY(). Bạn đổi H1 là đổi cả bảng." },
          { label: "Thử các trường hợp", detail: "Đặt H1 bằng ngày đầu tuần, giữa tuần và sau hạn. Kiểm dòng Xong có hết màu không." },
          { label: "Trả về hôm nay thật", detail: "Khi đã đúng, đổi công thức về TODAY() để bảng tự chạy theo ngày thật." },
        ],
      },
      {
        type: "scenario",
        title: "Thử quy tắc bằng ngày giả",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dựng quy tắc đỏ và vàng cho bảng 8 việc. Hôm nay bảng thấy một dòng đỏ, một dòng vàng. Bạn định dùng ngay.",
            choices: [
              { label: "Dùng luôn, vì hôm nay nhìn đúng", next: "bad_noTest" },
              { label: "Đưa ngày hôm nay vào ô H1 rồi đổi sang ngày sau 5 ngày để thử", next: "s2" },
            ],
          },
          bad_noTest: {
            text: "Tuần sau bạn thấy một việc đã Xong vẫn đỏ vì quy tắc thiếu điều kiện trạng thái. Bạn mất lòng tin vào màu và quay lại đọc ngày bằng mắt.",
            ending: "bad",
          },
          s2: {
            text: "Khi đổi H1 sang 5 ngày sau, hai việc đã Xong vẫn hiện đỏ. Bạn nhận ra công thức chưa xét trạng thái.",
            choices: [
              { label: "Nhờ AI thêm điều kiện Trạng thái khác Xong rồi thử lại H1", next: "good" },
              { label: "Xoá hai dòng đã Xong khỏi bảng cho hết đỏ", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Màu trông gọn, nhưng bạn mất lịch sử những việc đã làm, và lần sau ai hỏi bạn cũng không còn dữ liệu trả lời.",
            ending: "bad",
          },
          good: {
            text: "Sau khi thêm điều kiện, các dòng Xong hết đỏ ở mọi ngày giả. Bạn đổi công thức về TODAY() và ghi chú cách thử vào dòng đầu bảng.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Quy tắc có điều kiện trạng thái",
          text: "Việc đã xong không còn màu, nên màu đỏ chỉ xuất hiện khi còn việc cần làm. Bạn tin màu và nhìn nhanh mỗi sáng.",
        },
        right: {
          label: "Quy tắc chỉ xét ngày",
          text: "Mọi việc có hạn đã qua đều đỏ dù đã xong. Bảng dần đỏ lòm, bạn ngó lơ màu đỏ, và việc thật sự trễ bị lẫn vào.",
        },
      },
      {
        type: "callout",
        label: "Công thức tô màu không tự gọi AI",
        text: "Quy tắc tô màu chỉ là công thức của bảng, chạy mà không có AI. AI chỉ giúp bạn viết nó một lần. Nên khi bạn hỏi AI, hãy mô tả đúng cột nào là ngày hạn, cột nào là trạng thái, và yêu cầu nó giải thích từng phần để bạn kiểm.",
      },
      {
        type: "closing",
        lines: [
          "Hai quy tắc, hai điều kiện, một ô ngày giả để thử.",
          "Bài sau: ghép công thức tổng, tra cứu và tô màu thành bảng công nợ nhỏ.",
        ],
      },
    ],
  },
  {
    id: 2449,
    slug: "mini-du-an-bang-tinh-cong-no-nho-tu-cap-nhat",
    title: "Chặng 52, Bài 10: Mini dự án: bảng công nợ nhỏ tự cộng, tự tô màu quá hạn",
    subtitle: "Ghép ba thứ bạn vừa học thành một bảng mà đồng nghiệp nhập số liệu vào vẫn chạy đúng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn bán hàng hoặc cho vay nhỏ, vài chục khách còn nợ, và mỗi tuần bạn lại ngồi dò sổ xem ai quá hạn, nợ bao nhiêu. Một bảng nhỏ tự cộng, tự tô màu sẽ làm việc dò đó thay bạn. Nhưng bảng chỉ thật sự hữu ích khi người khác nhập dữ liệu vào mà nó không vỡ, nên bạn phải thử nó với dữ liệu xấu trước.",
    openingQuestion:
      "Bạn đã biết công thức tổng theo điều kiện, tra cứu giá và tô màu quá hạn. Bạn muốn ghép chúng thành bảng công nợ cho cả nhóm cùng nhập. Điều gì cần làm trước khi đưa bảng cho người khác?",
    openingOptions: [
      "Nhập thử dữ liệu xấu như ngày trống hay mã sai để xem bảng xử lý",
      "Dặn mọi người nhập cẩn thận rồi tin rằng bảng sẽ luôn đúng",
      "Khoá toàn bộ bảng để người khác chỉ được đọc, không được nhập hay sửa gì",
      "Đưa bảng ngay và sửa dần theo phản hồi từng người gửi tới",
    ],
    correctOption: 0,
    explanation:
      "Người khác sẽ nhập theo cách bạn không nghĩ tới: ngày để trống, gõ chữ vào ô tiền, mã viết hoa viết thường lẫn lộn. Thử những trường hợp đó trước khi giao cho bạn thấy bảng vỡ ở đâu và sửa khi còn rẻ. Chỉ dặn dò thì lỗi vẫn xảy ra. Khoá hết thì bảng không còn dùng chung được. Đưa ngay rồi sửa theo phản hồi khiến người dùng đầu tiên gánh hết lỗi.",
    diagram: [
      { label: "Bảng công nợ: Khách, Số tiền, Hạn thanh toán, Trạng thái", arrow: true },
      { label: "Công thức tổng quá hạn và tổng theo nhóm ngày trễ", arrow: true },
      { label: "Quy tắc tô đỏ, tô vàng theo hạn", arrow: true },
      { label: "Thử dòng dữ liệu xấu rồi mới đưa người khác dùng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chủ cửa hàng vật liệu xây dựng nhỏ theo dõi công nợ 30 khách quen. Chị dựng bảng có tổng quá hạn và tô màu, rồi nhờ người bán hàng cùng nhập. Trước khi giao, chị thử nhập một dòng ngày trống và một dòng số tiền có chữ đ. Công thức tổng bị lệch ở dòng thứ hai, nên chị thêm ghi chú nhập liệu ở đầu bảng và một ô kiểm tra tổng.",
    },
    quiz: [
      {
        question: "Bảng công nợ nhỏ cần ghép những phần nào từ các bài vừa học?",
        options: [
          "Công thức tổng theo điều kiện, tra cứu thông tin khách và tô màu theo hạn",
          "Chỉ tô màu, vì màu đã đủ cho bạn biết ai nợ bao nhiêu",
          "Chỉ công thức cộng cả cột, vì tổng là con số duy nhất cần",
          "Một ảnh chụp bảng số liệu gửi qua tin nhắn mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Bảng vừa cần con số (tổng theo điều kiện), vừa cần tra thông tin từ danh sách khách, vừa cần tín hiệu thị giác cho việc quá hạn. Màu không cho biết số tiền. Tổng cả cột không phân biệt quá hạn và chưa tới hạn. Ảnh chụp thì không tự cập nhật.",
      },
      {
        question: "Người khác thêm khách mới ở dòng cuối mà công thức tổng không tính dòng đó. Cách tránh nào đúng?",
        options: [
          "Để công thức đọc cả cột thay vì một vùng cố định",
          "Dặn mọi người chỉ thêm khách ở dòng sau dòng 100, nơi công thức đã bao trước",
          "Sửa lại công thức bằng tay sau mỗi lần có người thêm dòng mới",
          "Khoá bảng để không ai thêm khách mới được nữa",
        ],
        correct: 0,
        explanation:
          "Công thức đọc cả cột tự tính những dòng thêm sau. Một vùng cố định sẽ bỏ sót dòng mới, và dặn người khác nhớ vị trí là cách dễ quên. Sửa tay mỗi lần thì phụ thuộc vào trí nhớ của bạn. Khoá bảng thì không còn là bảng dùng chung.",
      },
      {
        question:
          "Khách A nợ 3 triệu quá hạn 5 ngày, khách B nợ 2 triệu quá hạn 40 ngày, khách C nợ 4 triệu chưa tới hạn. Tổng công nợ quá hạn là bao nhiêu?",
        options: [
          "5 triệu (= 3 + 2, chỉ tính hai khách đã quá hạn)",
          "9 triệu (= 3 + 2 + 4, cả khách C)",
          "2 triệu (= chỉ khách B, chọn nhầm khoản quá hạn lâu nhất)",
          "4 triệu (= chỉ khách C, đặt nhầm điều kiện thành chưa tới hạn)",
        ],
        correct: 0,
        explanation:
          "Quá hạn là khách A và B: 3 + 2 = 5 triệu. Con số 9 triệu là tổng mọi khoản nợ, nên lẫn cả khách C chưa tới hạn. Chỉ lấy B là bỏ sót A. Chỉ lấy C là đặt điều kiện ngược, tức là khoản chưa tới hạn.",
      },
      {
        question: "Chia công nợ quá hạn thành các nhóm 1-7 ngày, 8-30 ngày và trên 30 ngày để làm gì?",
        options: [
          "Để biết khoản nào cần nhắc gấp hơn",
          "Để bảng tự gửi email đòi nợ cho từng nhóm khách",
          "Để giảm số tiền nợ thật",
          "Để công thức chạy nhanh hơn với các nhóm nhỏ",
        ],
        correct: 0,
        explanation:
          "Nhóm theo số ngày trễ giúp xếp thứ tự ưu tiên nhắc nợ. Bảng chia nhóm không tự gửi email nào, việc đó cần một bước khác. Chia nhóm không làm giảm số tiền nợ thật. Còn tốc độ công thức gần như không đổi với vài chục dòng.",
      },
      {
        question: "Trước khi đưa bảng công nợ cho đồng nghiệp nhập, bạn nên làm gì?",
        options: [
          "Nhập thử vài dòng xấu như mã sai, ngày trống hoặc số tiền có chữ rồi xem bảng phản ứng ra sao",
          "Tin rằng người nhập sẽ luôn nhập đúng vì đã dặn họ một lần từ đầu",
          "Khoá hết các cột để họ chỉ được đọc và không gánh rủi ro nhập sai",
          "Đưa ngay rồi sửa theo phản hồi của từng người dùng đầu tiên gặp lỗi",
        ],
        correct: 0,
        explanation:
          "Dữ liệu xấu là thứ chắc chắn sẽ xuất hiện, nên thử trước cho bạn biết bảng vỡ ở đâu. Chỉ dặn dò thì người mệt vẫn nhập sai. Khoá hết cột thì không còn ai nhập được. Đưa ngay rồi sửa theo phản hồi khiến người dùng đầu tiên gánh lỗi, còn công nợ thì có khi đã bị tính sai.",
      },
      {
        question: "Bạn muốn nhờ AI góp ý cấu trúc bảng công nợ. Dữ liệu nào nên đưa cho AI?",
        options: [
          "Vài dòng khách giả có cùng dạng với dữ liệu thật",
          "Toàn bộ danh sách khách thật kèm số tiền nợ để AI hiểu rõ hơn",
          "Danh sách khách thật nhưng đã đổi tên sang viết tắt, còn số tiền để nguyên",
          "Số điện thoại và địa chỉ khách để AI gợi ý cách nhắc nợ phù hợp",
        ],
        correct: 0,
        explanation:
          "AI cần hình dạng của dữ liệu chứ không cần người thật, nên dữ liệu giả là đủ. Danh sách khách thật kèm công nợ là dữ liệu kinh doanh nhạy cảm, nhất là khi công cụ chưa được công ty hay bạn cân nhắc. Đổi tên viết tắt nhưng giữ số tiền vẫn dễ nhận ra từng khách. Số điện thoại và địa chỉ hoàn toàn không cần cho việc dựng bảng.",
      },
    ],
    keyTakeaways: [
      "Ghép ba thứ: công thức tổng theo điều kiện, tra cứu và tô màu theo hạn.",
      "Cho công thức đọc cả cột để dòng thêm sau vẫn được tính.",
      "Thử dữ liệu xấu trước khi giao bảng cho người khác nhập.",
      "Dùng dữ liệu giả khi nhờ AI góp ý, không dán danh sách công nợ thật.",
    ],
    practicePrompt: {
      question:
        "Chị Mai dựng bảng công nợ, thử với ba dòng đẹp thấy mọi thứ đúng rồi giao cho nhân viên nhập. Hôm sau tổng quá hạn bị lệch. Chị thiếu bước nào?",
      options: [
        "Thử các dòng xấu như ngày trống hoặc số tiền có chữ",
        "Đổi màu tô từ đỏ sang cam cho dễ nhìn hơn",
        "Thêm nhiều cột hơn để bảng trông đầy đủ",
        "Nhờ AI viết lại toàn bộ bảng từ đầu",
      ],
      correct: 0,
      explanation:
        "Dữ liệu đẹp chỉ chứng minh bảng chạy trong điều kiện lý tưởng. Dòng xấu là thứ người thật sẽ nhập, nên phải thử. Đổi màu hay thêm cột không xử lý lệch tổng, còn viết lại cả bảng là việc lớn mà vẫn chưa thử những dòng xấu.",
    },
    summary: {
      keyIdea: "Bảng công nợ nhỏ ghép công thức tổng, tra cứu và tô màu, nhưng chỉ đáng tin sau khi thử dữ liệu xấu.",
      formula: "Tổng quá hạn + tra cứu khách + tô màu hạn + thử dòng xấu = bảng người khác nhập vẫn đúng.",
      commonMistake: "Chỉ thử dữ liệu đẹp rồi giao bảng cho người khác nhập.",
      action: "Dựng bảng công nợ 8 dòng bằng khách giả và thử ba dòng xấu trước khi đụng dữ liệu thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lập bảng 8 dòng công nợ bằng khách giả với cột Khách, Số tiền, Hạn, Trạng thái. Nhờ AI viết công thức tổng công nợ quá hạn và quy tắc tô đỏ cho hạn đã qua. Sau đó cố ý nhập ba dòng xấu: một ngày trống, một số tiền có chữ đ, một khách viết hai kiểu. Ghi lại dòng nào làm công thức sai.",
      secondary: "Thêm một ô kiểm tra tổng đặt cạnh tổng quá hạn để lần sau thấy ngay khi lệch.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước cho bạn ba công cụ rời. Bài này ghép chúng thành một bảng công nợ nhỏ, và dạy điều đắt giá hơn công thức: thử bảng bằng dữ liệu xấu trước khi người khác nhập vào.",
      },
      {
        type: "feynman",
        title: "Bảng tự cập nhật đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới bảng điện tử trong siêu thị báo giá: nhân viên chỉ đổi giá ở một chỗ, bảng tự hiện lại. Bảng công nợ của bạn cũng vậy: người nhập chỉ thêm dòng, còn tổng và màu tự đổi.",
        columns: ["Phần", "Bảng giá siêu thị", "Bảng công nợ"],
        rows: [
          ["Người nhập", "Nhân viên đổi giá", "Đồng nghiệp thêm dòng"],
          ["Phần tự chạy", "Bảng điện tử tự hiện lại", "Tổng và màu tự tính lại"],
          ["Điều đáng sợ", "Nhập nhầm một số", "Nhập ngày trống hay chữ vào ô tiền"],
          ["Cách phòng", "Soát trước khi lên bảng", "Thử dòng xấu trước khi giao"],
        ],
        oneLiner: "Bảng tự cập nhật chỉ tự đúng khi bạn đã thử nó với những dòng người ta sẽ nhập sai.",
      },
      { type: "heading", text: "Bảng gồm ba khối" },
      {
        type: "paragraph",
        text: "Khối thứ nhất là dữ liệu: mỗi khoản nợ một dòng, có Khách, Số tiền, Hạn thanh toán, Trạng thái. Khối thứ hai là phần tính: tổng công nợ quá hạn và tổng theo nhóm ngày trễ. Khối thứ ba là tín hiệu: tô đỏ hạn đã qua, tô vàng hạn trong ba ngày tới. Nhờ AI viết từng khối một và kiểm từng khối, chứ đừng xin cả bảng trong một câu.",
      },
      {
        type: "chart",
        title: "Tổng công nợ theo số ngày quá hạn",
        caption: "Số liệu minh hoạ, đơn vị triệu đồng. Nhóm quá hạn lâu nhất thường cần nhắc trước.",
        kind: "bar",
        yLabel: "Triệu đồng",
        data: [
          { label: "Chưa tới hạn", values: [6] },
          { label: "Trễ 1-7 ngày", values: [3.5] },
          { label: "Trễ 8-30 ngày", values: [2] },
          { label: "Trễ trên 30 ngày", values: [1.2] },
        ],
        seriesLabels: ["Công nợ"],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khối tính tổng quá hạn",
        task: "Bạn cần công thức tổng công nợ quá hạn cho bảng khách. Lắp yêu cầu sao cho AI viết đúng và bạn không phải lộ dữ liệu thật.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa AI",
            options: [
              { text: "Dán cả danh sách 40 khách thật kèm số tiền nợ để AI hiểu bảng.", feedback: "Bạn đã đưa công nợ thật của từng khách cho một công cụ chưa ai duyệt, trong khi AI chỉ cần hình dạng của bảng." },
              { text: "Dán 5 dòng khách giả có cùng cột: Khách, Số tiền, Hạn, Trạng thái.", good: true, feedback: "Dữ liệu giả đủ cho AI thấy hình dạng bảng mà không lộ khách thật." },
            ],
          },
          {
            id: "rule",
            label: "Điều cần tính",
            options: [
              { text: "Cho tôi tổng công nợ.", feedback: "Đó là tổng mọi khoản, gồm cả khoản chưa tới hạn: một số bạn chưa hỏi." },
              { text: "Tính tổng Số tiền ở các dòng có Hạn nhỏ hơn hôm nay và Trạng thái khác Đã trả; đọc cả cột để dòng thêm sau vẫn được tính.", good: true, feedback: "Điều kiện đủ hai vế và nhắc đọc cả cột nên dòng mới cũng được cộng." },
            ],
          },
          {
            id: "check",
            label: "Yêu cầu kiểm",
            options: [
              { text: "Chỉ đưa công thức cho nhanh.", feedback: "Không có ví dụ thì bạn không đối chiếu được công thức với thứ bạn tự tính." },
              { text: "Đưa công thức và cho một ví dụ 3 dòng kèm đáp án đúng để tôi cộng tay đối chiếu.", good: true, feedback: "Ví dụ có đáp án cho bạn kiểm ngay mà không phải tin lời AI." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "rule", "check"],
            text: "Công thức: =SUMIFS(B:B, C:C, \"<\"&TODAY(), D:D, \"<>Đã trả\")\n\nB là Số tiền, C là Hạn, D là Trạng thái. Công thức đọc cả cột nên dòng mới cũng được tính.\n\nVí dụ: 3 triệu hạn hôm qua chưa trả, 2 triệu hạn hôm qua đã trả, 4 triệu hạn ngày mai. Kết quả đúng là 3 triệu.",
          },
          {
            requires: ["data"],
            text: "Công thức: =SUM(B2:B41)\n\n(Đây là tổng mọi khoản và cố định tới dòng 41; AI trả lời câu bạn chưa hỏi và dòng mới sẽ bị bỏ sót.)",
          },
          {
            text: "Dựa trên danh sách của bạn, tổng công nợ quá hạn là khoảng 18,4 triệu, trong đó khách Minh Phát nợ nhiều nhất.\n\n(AI tự bịa ra số liệu và tên khách, vì nó không có dữ liệu thật để tính.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dựng khối dữ liệu với bốn cột và vài dòng khách giả.",
          "Bước 2 - Nhờ AI viết công thức tổng quá hạn và tổng theo nhóm ngày trễ.",
          "Bước 3 - Thêm quy tắc tô đỏ và vàng, thử bằng ngày giả.",
          "Bước 4 - Nhập thử dòng xấu, rồi ghi ba quy ước nhập liệu ở đầu bảng.",
        ],
      },
      {
        type: "scenario",
        title: "Giao bảng công nợ cho nhân viên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng đã có tổng quá hạn và màu. Ngày mai nhân viên bán hàng sẽ bắt đầu nhập. Bạn mới thử với ba dòng đẹp.",
            choices: [
              { label: "Giao luôn, dặn nhân viên nhập cẩn thận", next: "bad_trust" },
              { label: "Nhập thử ba dòng xấu: ngày trống, số tiền có chữ, tên khách viết hai kiểu", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Sau hai ngày, một số tiền có chữ đ làm tổng quá hạn thiếu 3 triệu mà không báo lỗi. Bạn chỉ phát hiện khi đối chiếu sổ cuối tuần.",
            ending: "bad",
          },
          s2: {
            text: "Dòng ngày trống bị tô sai và dòng số tiền có chữ không được cộng. Bạn thấy hai lỗ hổng.",
            choices: [
              { label: "Thêm ghi chú nhập liệu ở đầu bảng và một ô kiểm tra tổng, rồi thử lại", next: "good" },
              { label: "Bỏ qua, vì nhân viên chắc không nhập sai như vậy", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Nhân viên mới nhập vội một khoản có chữ đ ngay tuần đầu. Con số tổng im lặng thiếu tiền, và không ai nghĩ tới việc kiểm.",
            ending: "bad",
          },
          good: {
            text: "Bạn ghi ba quy ước: số tiền chỉ nhập số, ngày không được trống, tên khách chọn từ danh sách. Ô kiểm tra tổng báo ngay khi có dòng chưa đọc được.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Công nợ thật là dữ liệu nhạy cảm",
        text: "Danh sách khách kèm số tiền nợ là thông tin kinh doanh. Khi nhờ AI góp ý, đưa dữ liệu giả có cùng dạng. Mọi quy định về cách nhắc nợ hay tính lãi, hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa vào bảng.",
      },
      {
        type: "closing",
        lines: [
          "Ba khối ghép lại, một lần thử dòng xấu, và một bảng người khác dùng mà vẫn đúng.",
          "Bài sau: nhờ AI viết kịch bản Apps Script đầu tiên, bạn chỉ mô tả việc.",
        ],
      },
    ],
  },
];
