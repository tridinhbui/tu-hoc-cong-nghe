import type { Lesson } from "../lesson-types";

// Chặng 57, bài 1-5. Giáo trình: scripts/curriculum/stage-57.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách mô tả, giao việc và tự thử kết quả.
export const S57_A_LESSONS: Lesson[] = [
  {
    id: 2540,
    slug: "chon-viec-lap-lai-dang-lam-thanh-cong-cu-nho",
    title: "Chặng 57, Bài 1: Chọn đúng một việc lặp lại đáng làm thành công cụ nhỏ",
    subtitle: "Đếm số lần lặp và số phút mất trước khi chọn việc, đừng chọn theo cảm giác.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ai mới nghe chuyện tự làm công cụ nhỏ cũng muốn làm ngay một thứ thật to. Kết quả thường là hai tuần mất công mà việc hằng ngày vẫn y nguyên. Chọn đúng một việc nhỏ, lặp đều, luật cố định thì công cụ đầu tiên mới có người dùng - trước hết là chính bạn.",
    openingQuestion:
      "Thứ Hai nào bạn cũng gõ lại bảng báo giá cho khách, chỉ đổi tên khách và số lượng. Bạn muốn làm công cụ nhỏ để bớt việc này. Bước đầu tiên hợp lý là gì?",
    openingOptions: [
      "Ghi lại số lần làm và số phút mất mỗi lần trong hai tuần",
      "Nhờ AI dựng ngay một ứng dụng quản lý bán hàng đầy đủ tính năng",
      "Hỏi xem công cụ nào đang được nhiều người ca ngợi nhất hiện nay",
      "Chờ công ty mua phần mềm chính thức rồi mới tính chuyện làm",
    ],
    correctOption: 0,
    explanation:
      "Muốn biết việc nào đáng làm thành công cụ thì phải có con số: bao nhiêu lần mỗi tuần, mỗi lần mất bao nhiêu phút. Một ứng dụng đầy đủ tính năng là dự án to, dễ bỏ dở giữa chừng. Chạy theo công cụ đang được khen không liên quan tới việc của bạn. Còn chờ phần mềm chính thức thì bạn tiếp tục gõ lại bảng báo giá hàng tuần mà không biết mình mất bao nhiêu.",
    diagram: [
      { label: "Ghi việc lặp lại trong hai tuần", arrow: true },
      { label: "Đếm số lần và số phút mỗi lần", arrow: true },
      { label: "Chọn việc có luật cố định, lặp nhiều nhất", arrow: true },
      { label: "Làm công cụ nhỏ chỉ cho đúng việc đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kinh doanh một cửa hàng vật liệu",
      description:
        "Một nhân viên gõ lại bảng báo giá mỗi ngày làm việc, mỗi lần khoảng 12 phút. Sau hai tuần ghi chép, chị thấy việc này chiếm hơn một giờ mỗi ngày - nhiều hơn cả việc họp và việc báo cáo cộng lại. Chị chọn đúng việc đó làm công cụ đầu tiên, bỏ qua ý định làm phần mềm quản lý cả cửa hàng. Số liệu trong tình huống chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Việc nào trong bốn việc sau đáng làm thành công cụ nhỏ nhất?",
        options: [
          "Bảng báo giá gõ lại hằng tuần, bố cục luôn giống nhau",
          "Bài thuyết trình năm lần mỗi năm, nội dung mỗi lần khác",
          "Email chúc mừng sinh nhật, mỗi người một câu riêng",
          "Việc cả phòng mỗi người làm một kiểu, chưa ai chốt cách",
        ],
        correct: 0,
        explanation:
          "Công cụ nhỏ hợp với việc lặp nhiều và luật cố định, như bảng báo giá cùng bố cục. Việc năm lần một năm thì tiết kiệm được rất ít. Email riêng từng người thì chính sự riêng tư là giá trị, không có luật để gói lại. Việc chưa ai chốt cách làm thì phải thống nhất cách làm trước, rồi mới nói tới công cụ.",
      },
      {
        question: "Một việc lặp 6 lần mỗi tuần, mỗi lần 15 phút. Công cụ làm xong chỉ còn 3 phút mỗi lần. Mỗi tuần tiết kiệm bao nhiêu phút?",
        options: [
          "72 phút mỗi tuần (= 6 × (15 − 3))",
          "90 phút (= 6 × 15, quên trừ 3 phút vẫn còn mất)",
          "12 phút (= 15 − 3, quên nhân với 6 lần mỗi tuần)",
          "18 phút (= 6 × 3, phần còn mất)",
        ],
        correct: 0,
        explanation:
          "Tiết kiệm mỗi lần là 15 − 3 = 12 phút, nhân 6 lần là 72 phút. 90 phút là tổng thời gian trước khi có công cụ chứ chưa phải phần tiết kiệm. 12 phút mới là một lần. 18 phút là thời gian vẫn còn mất sau khi có công cụ.",
      },
      {
        question: "Vì sao không nên chọn việc mà mỗi lần làm lại một kiểu khác nhau?",
        options: [
          "Không có luật cố định để mô tả, AI phải tự đoán",
          "Công cụ nhỏ chỉ dùng cho việc tiền bạc",
          "AI từ chối mọi việc có hơn hai bước xử lý liên tiếp",
          "Việc khác nhau mỗi lần thì tính ra luôn mất ít thời gian",
        ],
        correct: 0,
        explanation:
          "Công cụ chỉ gói lại được thứ có luật. Việc mỗi lần một kiểu thì chỗ nào cũng là ngoại lệ, và AI sẽ tự điền ngoại lệ bằng phỏng đoán. Công cụ nhỏ không chỉ dành cho việc tiền bạc. AI không hề từ chối việc nhiều bước. Việc khác nhau mỗi lần vẫn có thể tốn nhiều thời gian, chỉ là khó gói lại.",
      },
      {
        question: "Trước khi quyết định làm công cụ, bạn nên đo gì?",
        options: [
          "Số lần lặp và số phút thật mỗi lần trong hai tuần",
          "Mức độ hào hứng của đồng nghiệp khi nghe ý tưởng này",
          "Chờ công ty có quy trình chính thức",
          "Tên công cụ đang được nhiều người nhắc tới trên mạng xã hội",
        ],
        correct: 0,
        explanation:
          "Số lần và số phút là hai con số duy nhất cho biết việc có đáng làm hay không. Sự hào hứng của đồng nghiệp có thể tới từ ý tưởng mới lạ chứ không phải từ việc thật. Chờ quy trình công ty có thể kéo dài nhiều tháng. Tên công cụ đang được nhắc không nói gì về việc của bạn.",
      },
      {
        question: "Công cụ mất 6 giờ để làm xong và tiết kiệm 72 phút mỗi tuần. Sau mấy tuần thì hoà vốn thời gian?",
        options: [
          "5 tuần (= 360 phút ÷ 72 phút mỗi tuần)",
          "6 tuần (= 6 giờ, nhầm số giờ làm công cụ với số tuần)",
          "30 tuần (= 360 ÷ 12, chia cho phần tiết kiệm của một lần)",
          "0,2 tuần (= 72 ÷ 360, chia ngược tiết kiệm cho công làm)",
        ],
        correct: 0,
        explanation:
          "6 giờ là 360 phút, chia cho 72 phút tiết kiệm mỗi tuần được 5 tuần. Nhầm số giờ thành số tuần cho ra 6. Chia cho 12 là chia cho phần tiết kiệm của một lần chứ chưa phải của cả tuần. Chia ngược ra 0,2 là con số vô lý vì không ai hoà vốn trong chưa đầy một ngày.",
      },
    ],
    keyTakeaways: [
      "Chọn việc theo con số: số lần lặp và số phút mỗi lần.",
      "Việc đáng làm là việc lặp nhiều và có luật cố định.",
      "Tiết kiệm mỗi tuần = (phút trước − phút sau) × số lần.",
      "Bắt đầu bằng một việc nhỏ, đừng bắt đầu bằng một phần mềm to.",
    ],
    practicePrompt: {
      question:
        "Anh Hùng (kế toán) mỗi tháng chép tay 40 dòng từ sao kê vào bảng theo dõi, mất 50 phút, luật chép luôn giống nhau. Anh còn một việc khác: viết thư xin lỗi khách, mỗi lần khác nội dung, một tháng chừng hai lần. Nên chọn việc nào làm công cụ trước?",
      options: [
        "Việc chép 40 dòng, vì lặp đều và có luật cố định",
        "Thư xin lỗi khách, vì viết thư khó hơn nên tiết kiệm nhiều hơn",
        "Cả hai cùng lúc để chỉ phải bắt tay vào làm một lần",
        "Không việc nào, vì mỗi tháng một lần thì chẳng đáng làm",
      ],
      correct: 0,
      explanation:
        "Việc chép 40 dòng lặp mỗi tháng và luật cố định nên gói lại được. Thư xin lỗi mỗi lần một nội dung, lại hiếm, công cụ không giúp được nhiều. Làm cả hai cùng lúc khiến cả hai dang dở. Một lần mỗi tháng nhưng 50 phút vẫn là 10 giờ một năm, đủ để cân nhắc.",
    },
    summary: {
      keyIdea: "Công cụ nhỏ đáng làm khi việc lặp nhiều và có luật cố định.",
      formula: "Tiết kiệm mỗi tuần = (phút trước − phút sau) × số lần mỗi tuần.",
      commonMistake: "Chọn việc theo cảm giác hoặc chọn việc quá to, không đếm số lần và số phút.",
      action: "Ghi lại mọi việc lặp của bạn trong hai tuần, cạnh mỗi việc ghi số lần và số phút.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch hoặc sổ của bạn tuần vừa rồi, liệt kê 5 việc bạn làm lặp lại. Cạnh mỗi việc ghi số lần và số phút mỗi lần, rồi tính tổng phút mỗi tuần. Khoanh tròn một việc có tổng phút cao nhất mà luật làm luôn giống nhau - đó là ứng viên cho công cụ đầu tiên.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn việc nào đã được khoanh tròn và nó mất bao nhiêu phút mỗi tuần.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai nào cũng vậy: bạn mở bảng báo giá tuần trước, đổi tên khách, đổi số lượng, kiểm lại phép nhân, rồi lưu thành tệp mới. Mười lăm phút, rồi cả tuần lặp lại. Bài đầu của chặng này không dạy làm công cụ - nó dạy chọn đúng một việc để làm.",
      },
      {
        type: "feynman",
        title: "Chọn việc làm công cụ đơn giản hơn bạn nghĩ",
        intro: "Giống như khi bạn mua một chiếc xe đẩy cho kho: bạn không mua vì nó trông đẹp, bạn mua khi ngày nào cũng khuân cùng một loại thùng qua cùng một lối đi.",
        columns: ["Thành phần", "Chiếc xe đẩy trong kho", "Công cụ nhỏ"],
        rows: [
          ["Khi nào đáng mua", "Khi ngày nào cũng khuân cùng một loại thùng", "Khi việc lặp nhiều và luật làm luôn giống nhau"],
          ["Khi nào phí", "Khi chỉ dùng một lần trong năm", "Khi việc hiếm hoặc mỗi lần mỗi khác"],
          ["Cách biết", "Đếm số chuyến khuân mỗi ngày", "Đếm số lần và số phút mỗi lần"],
          ["Thứ cần chốt trước", "Thùng nặng bao nhiêu, đi lối nào", "Nhập gì, ra gì, luật tính ra sao"],
        ],
        oneLiner: "Công cụ nhỏ là chiếc xe đẩy cho một chuyến đi cố định - đếm chuyến đi trước, rồi mới mua.",
      },
      { type: "heading", text: "Vấn đề: việc lặp lại ăn mất thời gian mà không ai đếm" },
      {
        type: "paragraph",
        text: "Việc lặp lại nguy hiểm vì mỗi lần nó trông nhỏ: mười phút ở đây, mười lăm phút ở kia. Cộng cả tuần thì nó lớn hơn nhiều việc bạn thấy là quan trọng. Muốn biết, bạn chỉ cần hai con số: số lần mỗi tuần và số phút mỗi lần.",
      },
      {
        type: "chart",
        title: "Số phút mất mỗi tuần theo số lần lặp",
        caption: "Số liệu minh hoạ. Kéo thanh trượt cho khớp với việc của bạn: đường cao là khi chưa có công cụ, đường thấp là khi công cụ rút mỗi lần còn vài phút.",
        kind: "line",
        xLabel: "Số lần lặp mỗi tuần",
        yLabel: "Phút mất mỗi tuần",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "before", label: "Phút mỗi lần khi làm tay", min: 2, max: 60, step: 1, value: 15, unit: "phút" },
          { id: "after", label: "Phút mỗi lần khi có công cụ", min: 0, max: 20, step: 1, value: 3, unit: "phút" },
        ],
        series: [
          { label: "Làm tay", expr: "x * before" },
          { label: "Có công cụ", expr: "x * after" },
        ],
      },
      { type: "heading", text: "Ba câu hỏi để chọn việc" },
      {
        type: "list",
        items: [
          "Việc này lặp lại bao nhiêu lần mỗi tuần hoặc mỗi tháng? Càng nhiều càng đáng.",
          "Mỗi lần các bước có giống nhau không? Nếu có thì mô tả được thành luật.",
          "Sai một lần thì hậu quả lớn cỡ nào? Bắt đầu bằng việc sai chỉ mất chút thời gian sửa, đừng bắt đầu bằng việc liên quan tới tiền lớn.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nên làm thành công cụ",
          text: "Bảng báo giá hằng tuần, chép số từ sao kê vào bảng theo dõi, tính thành tiền từ số lượng và đơn giá, nhập yêu cầu khách vào một mẫu có sẵn.",
        },
        right: {
          label: "Chưa nên làm",
          text: "Việc mỗi lần mỗi khác, việc một năm vài lần, việc chưa ai thống nhất cách làm, việc mà sai một lần có thể mất tiền lớn hoặc mất khách.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp chọn việc từ danh sách của bạn",
        task: "Bạn đã ghi hai tuần việc lặp lại: báo giá (5 lần mỗi tuần, 12 phút), chép sao kê (1 lần mỗi tuần, 40 phút), thư xin lỗi khách (hiếm, mỗi lần khác). Lắp một câu lệnh để AI giúp chọn một việc làm công cụ.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              {
                text: "Giúp tôi chọn việc làm công cụ nào cho đáng.",
                feedback: "AI không có danh sách việc của bạn, nó sẽ bịa ra vài việc chung chung rồi khuyên.",
              },
              {
                text: "Danh sách việc tuần qua: báo giá 5 lần × 12 phút; chép sao kê 1 lần × 40 phút; thư xin lỗi khách hiếm và mỗi lần khác.",
                good: true,
                feedback: "Có số lần và số phút thật, AI chỉ việc tính và so sánh trên dữ liệu của bạn.",
              },
            ],
          },
          {
            id: "rule",
            label: "Tiêu chí chọn",
            options: [
              {
                text: "Chọn việc nào hay nhất.",
                feedback: "\"Hay nhất\" không đo được, AI sẽ chọn theo độ phổ biến của ví dụ nó từng đọc.",
              },
              {
                text: "Chọn việc có tổng phút mỗi tuần lớn và các bước luôn giống nhau; nêu phép tính để tôi kiểm.",
                good: true,
                feedback: "Tiêu chí rõ và đòi phép tính, nên bạn kiểm được lời khuyên bằng máy tính bỏ túi.",
              },
            ],
          },
          {
            id: "format",
            label: "Cách trả lời",
            options: [
              {
                text: "Trả lời dài và chi tiết nhé.",
                feedback: "Câu trả lời dài dễ chứa phần AI tự thêm, còn bạn thì chỉ cần một bảng ngắn.",
              },
              {
                text: "Trả lời bằng bảng ba cột: việc, phút mỗi tuần, lý do; sau bảng là một việc được chọn.",
                good: true,
                feedback: "Bảng ngắn, dễ đối chiếu từng dòng với danh sách ban đầu.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "rule", "format"],
            text: "Việc | Phút mỗi tuần | Lý do\nBáo giá | 60 (= 5 × 12) | lặp nhiều, bố cục cố định\nChép sao kê | 40 (= 1 × 40) | luật cố định nhưng chỉ một lần mỗi tuần\nThư xin lỗi | không tính được | mỗi lần khác, không có luật chung\n\nChọn: báo giá - tổng phút cao nhất và luật cố định.",
          },
          {
            requires: ["data"],
            text: "Báo giá mất nhiều thời gian nhất nên nên làm trước. Chép sao kê cũng đáng cân nhắc.\n\n(Đúng hướng nhưng AI không nêu phép tính, bạn phải tự kiểm và không biết nó dựa vào tiêu chí nào.)",
          },
          {
            text: "Bạn nên làm công cụ quản lý thư từ khách hàng vì 80% nhân viên văn phòng mất hơn 6 giờ mỗi tuần cho việc này.\n\n(Không có dữ liệu, AI bịa cả việc lẫn con số 80% và 6 giờ - không khớp với danh sách của bạn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng bỏ qua con số",
        text: "Cảm giác \"việc này phiền lắm\" và tổng phút mất mỗi tuần thường không khớp nhau. Việc phiền nhất hay là việc gây bực, chưa chắc là việc tốn nhiều giờ nhất. Hãy đo hai tuần rồi mới chọn.",
      },
      {
        type: "scenario",
        title: "Chị Mai chọn việc đầu tiên",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Mai (nhân viên kinh doanh) muốn giảm việc giấy tờ. Chị đang có ba ý tưởng. Sếp cho chị một buổi chiều tuần này để làm thử một công cụ.",
            choices: [
              { label: "Làm ngay phần mềm quản lý toàn bộ khách và đơn hàng cho cả phòng", next: "bad_big" },
              { label: "Ghi lại việc lặp lại của mình trong hai tuần trước rồi chọn một việc", next: "s2" },
            ],
          },
          bad_big: {
            text: "Sau buổi chiều chị Mai mới có một trang trống và một danh sách tính năng dài. Hai tuần sau ý tưởng bị bỏ dở, còn bảng báo giá vẫn gõ tay như cũ.",
            ending: "bad",
          },
          s2: {
            text: "Sau hai tuần, chị thấy báo giá chiếm 60 phút mỗi tuần, chép sao kê 40 phút mỗi tuần, còn thư xin lỗi chỉ hai lần cả tháng. Chị cần chọn.",
            choices: [
              { label: "Chọn thư xin lỗi vì viết thư là việc mình ghét nhất", next: "bad_feel" },
              { label: "Chọn bảng báo giá: lặp nhiều nhất, luật tính cố định", next: "good" },
            ],
          },
          bad_feel: {
            text: "Công cụ thư xin lỗi chạy được nhưng mỗi thư lại cần sửa tay vì nội dung mỗi lần khác. Chị vẫn mất 60 phút mỗi tuần cho báo giá và thấy công cụ chẳng giúp gì.",
            ending: "bad",
          },
          good: {
            text: "Chị làm công cụ chỉ cho bảng báo giá. Tuần sau, thời gian mỗi lần từ 12 phút còn 3 phút và chị biết chính xác mình tiết kiệm được gần 45 phút mỗi tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chọn việc bằng số: số lần lặp và số phút mỗi lần.",
          "Bài sau: viết công cụ đó ra một trang giấy trước khi nhờ AI dựng.",
        ],
      },
    ],
  },
  {
    id: 2541,
    slug: "mo-ta-cong-cu-bang-mot-trang-giay-truoc-khi-nho-ai",
    title: "Chặng 57, Bài 2: Mô tả công cụ trên một trang giấy trước khi nhờ AI dựng",
    subtitle: "Ai dùng, nhập gì, ra gì: ba dòng này quyết định AI dựng đúng hay đoán bừa.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi bạn nói mơ hồ, AI vẫn dựng xong một thứ trông rất hoàn chỉnh - chỉ là nó tự điền chỗ trống bằng phỏng đoán. Bạn phát hiện ra sau khi đã dùng. Một trang giấy ghi rõ ba điều cơ bản, cộng câu dặn AI hỏi lại, rẻ hơn rất nhiều so với dựng lại từ đầu.",
    openingQuestion:
      "Bạn gõ cho AI: \"Làm công cụ tính báo giá giúp tôi.\" Nó dựng ngay một công cụ có thuế 10% và phí vận chuyển mà bạn chưa hề nhắc. Nguyên nhân chính là gì?",
    openingOptions: [
      "Bạn chưa nói rõ nhập gì, ra gì nên AI tự đoán những phần đó",
      "AI cố tình thêm thuế để công cụ trông chuyên nghiệp hơn",
      "AI đọc trộm bảng báo giá cũ của công ty bạn trên mạng",
      "Công cụ tính báo giá luôn bắt buộc có thuế và phí vận chuyển",
    ],
    correctOption: 0,
    explanation:
      "AI không đọc được ý nghĩ: chỗ nào bạn không nói, nó điền bằng thứ hay gặp nhất - ở đây là thuế và phí vận chuyển. Nó không có ý đồ thêm cho đẹp, cũng không truy cập dữ liệu công ty của bạn. Và không có luật nào bắt báo giá phải có thuế hay phí vận chuyển; nó tuỳ vào việc của bạn, nên bạn phải nói rõ.",
    diagram: [
      { label: "Viết ai dùng công cụ", arrow: true },
      { label: "Viết nhập gì, ra gì", arrow: true },
      { label: "Dặn AI hỏi lại chỗ còn thiếu", arrow: true },
      { label: "Trả lời câu hỏi rồi mới cho dựng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng hành chính một công ty nhỏ",
      description:
        "Một bạn hành chính nhờ AI làm công cụ tính tiền văn phòng phẩm và chỉ gõ một dòng. Công cụ ra với mười ô nhập, trong khi bạn chỉ cần ba: tên món, số lượng, đơn giá. Lần sau bạn viết một trang giấy ba dòng, dặn AI hỏi lại nếu thiếu, và nhận được công cụ vừa đúng ba ô.",
    },
    quiz: [
      {
        question: "Ba điều tối thiểu nên viết trong trang mô tả công cụ là gì?",
        options: [
          "Ai dùng, nhập gì, ra gì",
          "Tên công cụ, màu sắc, biểu tượng đại diện",
          "Người làm ra nó, ngày làm xong, số phiên bản",
          "Hãng AI, tên mô hình, giờ bắt đầu dựng thử",
        ],
        correct: 0,
        explanation:
          "Ai dùng quyết định độ phức tạp, nhập gì và ra gì quyết định toàn bộ phép tính ở giữa. Tên, màu sắc, biểu tượng là chi tiết sau cùng và không ảnh hưởng tới việc công cụ đúng hay sai. Người làm và số phiên bản thuộc về quản lý tài liệu. Hãng AI cũng không liên quan tới nội dung cần mô tả.",
      },
      {
        question: "Vì sao nên dặn AI \"hãy hỏi lại tôi những chỗ còn thiếu trước khi dựng\"?",
        options: [
          "Để chỗ trống hiện ra thành câu hỏi, không bị âm thầm đoán",
          "Để AI có thêm thời gian xử lý nên dựng ra kết quả tốt hơn hẳn",
          "Vì AI luôn bỏ qua yêu cầu nếu bạn không dặn nó hỏi lại",
          "Vì hỏi nhiều câu thì AI sẽ tự tính phí thấp hơn cho bạn",
        ],
        correct: 0,
        explanation:
          "Câu hỏi lại biến phỏng đoán ngầm thành câu hỏi nhìn thấy được, để bạn trả lời. AI không cần thời gian suy nghĩ thêm theo nghĩa đó. Nó cũng không bỏ qua yêu cầu khi bạn không dặn. Và số câu hỏi không liên quan gì tới chi phí.",
      },
      {
        question: "Dòng nào trong bản mô tả là mô tả \"ra gì\" rõ nhất?",
        options: [
          "Hiện tổng tiền sau thuế làm tròn tới đồng, kèm dòng chữ \"đã gồm thuế\"",
          "Hiện kết quả thật đẹp và dễ nhìn cho mọi người xem",
          "Tính toán sao cho thật đúng ý tôi",
          "Cho ra kết quả thật nhanh gọn",
        ],
        correct: 0,
        explanation:
          "\"Ra gì\" phải nói được con số nào, làm tròn thế nào, kèm chữ gì. \"Đẹp và dễ nhìn\" là cảm giác, mỗi người hiểu một kiểu. \"Tính toán cho đúng\" thì đúng theo luật nào vẫn chưa nói. \"Nhanh\" chỉ nói tốc độ, không nói kết quả gồm những gì.",
      },
      {
        question: "Bạn viết \"người dùng: nhân viên mới\". Điều này giúp AI quyết định điều gì?",
        options: [
          "Giao diện ít ô, chữ dễ hiểu, không có thuật ngữ khó",
          "Mức chiết khấu nào được áp cho khách của nhân viên mới",
          "Công cụ nên lưu dữ liệu trên máy chủ hay trên trình duyệt",
          "Bao nhiêu khách hàng có thể dùng công cụ cùng một lúc",
        ],
        correct: 0,
        explanation:
          "Biết người dùng là ai giúp AI chọn mức độ đơn giản của giao diện và cách dùng từ. Mức chiết khấu là luật tính, bạn phải ghi riêng. Chỗ lưu dữ liệu là một quyết định khác, sẽ học ở phần sau. Số người dùng cùng lúc cũng không suy ra được từ chữ \"nhân viên mới\".",
      },
      {
        question: "Bạn mô tả 3 ô nhập: số lượng, đơn giá, chiết khấu. Sau đó thêm ô \"ghi chú\" mà chưa nói ghi chú để làm gì. Điều gì dễ xảy ra?",
        options: [
          "AI đoán ô ghi chú và có thể đưa nó vào phép tính",
          "AI tự xoá ô ghi chú vì không hiểu ô này dùng để làm gì",
          "AI báo lỗi và dừng việc dựng",
          "AI giữ nguyên ô ghi chú và đảm bảo nó không ảnh hưởng gì",
        ],
        correct: 0,
        explanation:
          "Ô nào không có chú thích, AI sẽ đoán vai trò của nó, và có khi đoán sai, như đưa số trong ghi chú vào phép tính. AI hiếm khi tự xoá một ô bạn đã yêu cầu. Nó cũng không dừng để chờ bạn trừ khi bạn dặn hỏi lại. Và không ai đảm bảo ô đó vô hại nếu không nói.",
      },
    ],
    keyTakeaways: [
      "Một trang giấy: ai dùng, nhập gì, ra gì.",
      "Chỗ nào bạn không nói, AI tự điền bằng thứ hay gặp nhất.",
      "Dặn AI hỏi lại những chỗ còn thiếu trước khi dựng.",
      "\"Ra gì\" phải nói con số cụ thể, không nói cảm giác.",
    ],
    practicePrompt: {
      question:
        "Bạn viết mô tả cho công cụ tính tiền ship: nhập khoảng cách (km) và cân nặng (kg). Dòng nào dưới đây hoàn chỉnh nhất cho phần \"ra gì\"?",
      options: [
        "Hiện phí ship theo đồng, kèm công thức đã dùng để tôi kiểm lại",
        "Hiện phí ship thật chính xác và rõ ràng cho khách xem",
        "Tính phí ship theo cách phổ biến mà các hãng vận chuyển hay dùng",
        "Hiện phí ship, phần còn lại AI tự quyết định cho hợp lý",
      ],
      correct: 0,
      explanation:
        "Nói rõ đơn vị (đồng) và đòi công thức, nên bạn kiểm được kết quả. \"Chính xác và rõ ràng\" không nói chính xác theo luật nào. \"Cách phổ biến\" để AI chọn luật thay bạn. Để AI tự quyết định phần còn lại chính là cách chỗ trống bị điền bằng phỏng đoán.",
    },
    summary: {
      keyIdea: "Một trang giấy ba dòng thay cho ba lượt dựng lại.",
      formula: "Ai dùng + nhập gì + ra gì + \"hãy hỏi lại tôi chỗ còn thiếu\".",
      commonMistake: "Gõ một câu rất ngắn rồi ngạc nhiên vì AI thêm những thứ bạn chưa hề nhắc.",
      action: "Viết một trang giấy cho công cụ bạn chọn ở bài trước, rồi nhờ AI hỏi lại trước khi dựng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy việc bạn đã khoanh tròn ở bài trước. Viết ba dòng: ai dùng, nhập những ô nào, ra những con số hoặc chữ nào. Dán cho AI kèm câu \"hãy hỏi lại tôi mọi chỗ còn thiếu, đừng dựng vội\". Ghi lại số câu hỏi AI đưa ra và câu nào bạn chưa nghĩ tới.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn AI đã hỏi lại bao nhiêu câu và câu nào làm bạn bất ngờ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã chọn được việc lặp lại đáng làm. Giờ đến lúc nhờ AI dựng, và đây là chỗ nhiều người vấp: gõ một câu ngắn, nhận một công cụ trông đầy đủ, rồi mất cả buổi sửa những thứ mình chưa hề yêu cầu. Giải pháp rẻ nhất là một trang giấy, viết trước khi bấm gửi.",
      },
      {
        type: "feynman",
        title: "Mô tả công cụ đơn giản hơn bạn nghĩ",
        intro: "Giống như khi bạn giao việc cho một thợ may: bạn không chỉ nói \"may cho tôi cái áo\", bạn nói ai mặc, số đo bao nhiêu và mặc vào dịp nào.",
        columns: ["Thành phần", "Đặt may một chiếc áo", "Nhờ AI dựng công cụ"],
        rows: [
          ["Ai dùng", "Người mặc là ai, cao thấp ra sao", "Nhân viên mới, kế toán hay chính bạn"],
          ["Đầu vào", "Số đo, loại vải", "Các ô sẽ nhập: số lượng, đơn giá..."],
          ["Đầu ra", "Kiểu áo, màu, cỡ khuy", "Con số hoặc chữ hiện ra, làm tròn thế nào"],
          ["Nếu thiếu", "Thợ may đoán số đo, áo không vừa", "AI đoán các ô, công cụ không khớp việc"],
        ],
        oneLiner: "Bạn giao việc cho AI như đặt may áo: nói ai dùng, đo gì, ra gì - và nhờ nó hỏi lại khi còn thiếu.",
      },
      { type: "heading", text: "Vấn đề: chỗ trống không bao giờ để trống" },
      {
        type: "paragraph",
        text: "AI không để lại ô trống. Chỗ nào bạn chưa nói, nó điền bằng thứ thường gặp nhất trong những công cụ tương tự. Kết quả trông rất hoàn chỉnh, nên bạn khó nhận ra chỗ nào là của mình, chỗ nào là do nó đoán.",
      },
      {
        type: "flow",
        title: "Từ trang giấy tới bản dựng đầu tiên",
        steps: [
          {
            label: "Viết ba dòng",
            detail: "Ai dùng, nhập những gì, ra những gì. Dùng từ bạn vẫn dùng trong công việc, không cần thuật ngữ công nghệ.",
          },
          {
            label: "Thêm một ví dụ có số",
            detail: "Một ví dụ thật: nhập 3 món đơn giá 50.000, kết quả phải là 150.000. Ví dụ này sau đó thành bài thử cho công cụ.",
          },
          {
            label: "Dặn AI hỏi lại",
            detail: "Thêm câu: hãy hỏi tôi mọi chỗ còn thiếu hoặc mơ hồ, chưa dựng vội. AI sẽ liệt kê các chỗ nó phải đoán.",
          },
          {
            label: "Trả lời từng câu",
            detail: "Mỗi câu trả lời của bạn thành một dòng bổ sung vào trang giấy, và từ đó chỉ cần sửa trang giấy, đừng sửa tay công cụ.",
          },
          {
            label: "Cho dựng bản đầu",
            detail: "Bản đầu tiên chỉ cần làm đúng ví dụ có số. Tính năng thêm vào sau, từng cái một.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Ai dùng: bạn, cả nhóm hay khách bên ngoài - quyết định độ đơn giản.",
          "Nhập gì: liệt kê từng ô, kiểu số hay chữ, bắt buộc hay không.",
          "Ra gì: con số hoặc chữ nào, làm tròn, đơn vị tiền.",
          "Một ví dụ có số để tự kiểm lại kết quả.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết trang giấy cho công cụ tính tiền hàng",
        task: "Bạn cần một công cụ cho nhân viên bán hàng nhập số lượng và đơn giá để ra thành tiền. Lắp một câu lệnh để AI hỏi lại trước khi dựng.",
        parts: [
          {
            id: "who",
            label: "Ai dùng và nhập gì",
            options: [
              {
                text: "Làm công cụ tính tiền.",
                feedback: "Không có người dùng, không có ô nhập - AI sẽ dựng một công cụ mà ô nhập do nó tự nghĩ.",
              },
              {
                text: "Nhân viên bán hàng dùng trên máy tính; nhập số lượng và đơn giá (đồng) cho một mặt hàng.",
                good: true,
                feedback: "Người dùng, thiết bị và hai ô nhập được nêu rõ.",
              },
            ],
          },
          {
            id: "out",
            label: "Ra gì và ví dụ",
            options: [
              {
                text: "Hiện thành tiền = số lượng × đơn giá, định dạng có dấu chấm ngăn nghìn. Ví dụ: 3 × 50.000 = 150.000.",
                good: true,
                feedback: "Có luật, định dạng và một ví dụ có số để tự thử.",
              },
              {
                text: "Hiện kết quả cho đẹp.",
                feedback: "\"Đẹp\" không phải kết quả, AI có thể thêm thuế hoặc phí mà bạn không cần.",
              },
            ],
          },
          {
            id: "ask",
            label: "Dặn hỏi lại",
            options: [
              {
                text: "Hãy hỏi lại tôi từng chỗ còn thiếu hoặc mơ hồ, chưa dựng vội.",
                good: true,
                feedback: "Chỗ trống hiện thành câu hỏi, bạn trả lời từng cái.",
              },
              {
                text: "Nếu thiếu gì thì cứ tự quyết định cho hợp lý.",
                feedback: "Chính câu này bảo AI đoán - và bạn sẽ không biết nó đã đoán những gì.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["who", "out", "ask"],
            text: "Trước khi dựng, tôi có ba câu hỏi:\n1. Số lượng có thể là số lẻ (ví dụ 2,5) không?\n2. Nếu để trống ô nào thì hiện thông báo hay coi là 0?\n3. Có cần cộng nhiều mặt hàng thành một tổng không, hay chỉ một mặt hàng mỗi lần?\n\n(Mỗi câu là một chỗ AI sẽ phải đoán nếu bạn không trả lời.)",
          },
          {
            requires: ["who", "out"],
            text: "Đây là công cụ tính thành tiền: nhập số lượng và đơn giá, bấm tính sẽ ra 150.000 với ví dụ của bạn. Tôi đã thêm ô chiết khấu phần trăm và thuế giá trị gia tăng mặc định 10%.\n\n(Đúng với ví dụ nhưng AI tự thêm ô và thuế vì bạn không dặn nó hỏi lại.)",
          },
          {
            text: "Tôi đã làm xong ứng dụng quản lý bán hàng, gồm báo cáo doanh thu, nhắc nợ khách, và xuất hoá đơn tự động.\n\n(Mô tả quá ngắn, AI dựng thứ to hơn nhiều so với bạn cần và bạn không biết phần nào đúng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Mô tả chưa xong khi chưa có ví dụ có số",
        text: "Ví dụ \"3 × 50.000 = 150.000\" làm hai việc: nó cho AI một đích cụ thể, và nó là bài thử đầu tiên cho bạn khi công cụ chạy. Viết ví dụ trước, đừng để AI chọn số cho bạn.",
      },
      {
        type: "scenario",
        title: "Cô Hà nhờ AI dựng công cụ tính tiền ship",
        start: "s1",
        nodes: {
          s1: {
            text: "Cô Hà cần công cụ tính phí ship cho đơn của cửa hàng. Cô đã viết xong trang giấy: nhập km và kg, ra phí ship. AI trả lời bằng ba câu hỏi về cách làm tròn và mức phí theo khu vực.",
            choices: [
              { label: "Trả lời: \"Cứ làm như các hãng vận chuyển hay làm\"", next: "bad_vague" },
              { label: "Trả lời từng câu bằng số cụ thể: làm tròn lên 1.000 đồng, nội thành 15.000 đồng, ngoại thành 25.000 đồng", next: "s2" },
            ],
          },
          bad_vague: {
            text: "AI tự chọn một bảng giá nghe hợp lý. Công cụ chạy trơn, nhưng mức phí không khớp hợp đồng thật của cửa hàng. Một tuần sau cô Hà thu thiếu tiền ship của cả chục đơn mà không hiểu vì sao.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ chạy. Cô Hà thử đơn nội thành nặng 2 kg và đơn ngoại thành nặng 5 kg. Hai kết quả khớp với tính tay.",
            choices: [
              { label: "Ghi các câu trả lời vào trang giấy rồi mới dùng", next: "good" },
              { label: "Chỉ nhớ trong đầu, trang giấy không cần cập nhật", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Hai tháng sau cô Hà đổi mức phí ngoại thành nhưng quên mất công cụ đang dùng con số cũ vì trang giấy không ghi lại. Đơn mới bị tính sai một thời gian dài.",
            ending: "bad",
          },
          good: {
            text: "Trang giấy giờ có đủ mức phí và cách làm tròn. Khi phí đổi, cô sửa trang giấy trước rồi nhờ AI cập nhật công cụ theo, nên hai thứ luôn khớp nhau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba dòng mô tả, một ví dụ có số, một câu dặn hỏi lại.",
          "Bài sau: tập tìm chỗ mơ hồ trong một bản mô tả chưa tốt.",
        ],
      },
    ],
  },
  {
    id: 2542,
    slug: "tim-loi-trong-mo-ta-cong-cu-truoc-khi-dung",
    title: "Chặng 57, Bài 3: Tìm chỗ mơ hồ trong một bản mô tả công cụ mẫu",
    subtitle: "Mỗi chỗ mơ hồ là một chỗ AI sẽ đoán bừa. Tập nhìn ra chúng trước khi dựng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau bài trước bạn đã biết viết mô tả. Kỹ năng thứ hai là đọc lại mô tả của chính mình hoặc của đồng nghiệp và chỉ ra chỗ hớ. Tìm lỗi trên giấy mất ba phút; tìm lỗi trong công cụ đã dựng và đã có người dùng mất cả buổi.",
    openingQuestion:
      "Đồng nghiệp gửi bạn bản mô tả: \"Làm cái bảng tính tiền giúp tôi, cho nhiều khách, nhanh nhanh, nhìn đẹp đẹp.\" Bạn đọc thấy chỗ nào đáng lo nhất?",
    openingOptions: [
      "Không ghi tính tiền theo luật gì, nên AI sẽ tự chọn một luật",
      "Câu văn hơi cộc lốc và dùng từ lặp lại nhiều lần, nên đọc chưa mượt",
      "Không nói ai sẽ trả tiền cho việc dựng công cụ này",
      "Chữ \"bảng\" nên là \"bảng tính\" cho đúng chính tả hơn",
    ],
    correctOption: 0,
    explanation:
      "\"Tính tiền\" mà không nói luật (đơn giá nhân số lượng, có thuế hay chiết khấu hay không) thì AI phải tự chọn và kết quả sai theo cách bạn khó phát hiện. Giọng văn cộc lốc không làm công cụ sai. Ai trả tiền dựng công cụ không liên quan tới đầu vào và đầu ra. Và chính tả không làm AI hiểu sai ý.",
    diagram: [
      { label: "Đọc bản mô tả từng câu", arrow: true },
      { label: "Hỏi: câu này AI phải đoán điều gì?", arrow: true },
      { label: "Đánh dấu chỗ mơ hồ", arrow: true },
      { label: "Viết lại bằng số và ví dụ cụ thể" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kế toán một công ty phân phối",
      description:
        "Một bạn kế toán nhờ AI làm bảng tính tiền cho nhân viên sales và chỉ viết \"tính tiền cho nhiều khách\". Công cụ ra với một ô chọn khách nhưng không ai định nghĩa danh sách khách lấy từ đâu; mỗi sales tự gõ tên một kiểu. Sau bài học này, bạn kế toán đọc lại bản mô tả trước khi gửi và tự gạch ra bốn chỗ mơ hồ.",
    },
    quiz: [
      {
        question: "\"Cho nhiều khách dùng\" trong một bản mô tả công cụ mơ hồ ở điểm nào?",
        options: [
          "Không nói nhiều khách là mấy người và dữ liệu có tách riêng không",
          "Từ \"khách\" không phải thuật ngữ chuẩn dùng trong mô tả công cụ",
          "Câu này quá ngắn nên AI sẽ bỏ qua hoàn toàn mà không đọc",
          "Nhiều khách dùng thì công cụ chắc chắn chạy chậm hơn hẳn bình thường",
        ],
        correct: 0,
        explanation:
          "\"Nhiều khách\" có thể là hai người dùng chung hay hai trăm người, và dữ liệu của họ tách biệt hay trộn lẫn - mỗi cách là một cách dựng khác nhau. \"Khách\" là từ thường ngày, hoàn toàn dùng được. AI không bỏ qua câu ngắn. Và chuyện chạy chậm không chắc có, cũng không phải lỗi của bản mô tả.",
      },
      {
        question: "\"Làm cho nhanh\" nên được viết lại thành điều gì để AI hiểu đúng?",
        options: [
          "Bấm tính là hiện kết quả ngay, không phải chờ tải lại cả trang",
          "Nhanh gấp đôi so với các công cụ hiện có trên thị trường",
          "Nhanh tới mức người dùng không kịp nhận ra đang chờ",
          "Nhanh hơn mức mà cả phòng hiện đang mong đợi ở nó",
        ],
        correct: 0,
        explanation:
          "\"Nhanh\" phải gắn với một hành vi nhìn thấy được: bấm là ra kết quả. Nhanh gấp đôi so với công cụ khác là một con số bạn không đo được. \"Không kịp nhận ra\" vẫn là cảm giác, không phải yêu cầu. Và \"hơn mong đợi\" cũng không cho AI một tiêu chuẩn để làm theo.",
      },
      {
        question: "Trong bản mô tả, chỗ nào đã đủ rõ để AI không phải đoán?",
        options: [
          "Ô nhập gồm số lượng (số nguyên) và đơn giá (đồng)",
          "Giao diện trông gọn gàng và thân thiện với người dùng",
          "Phần tính toán phải thật chính xác trong mọi trường hợp",
          "Công cụ phải phù hợp với cách làm việc của phòng ban",
        ],
        correct: 0,
        explanation:
          "Số lượng là số nguyên và đơn giá tính bằng đồng: hai ô nhập có kiểu và đơn vị, AI không còn gì để đoán. \"Gọn gàng thân thiện\" là cảm giác. \"Chính xác trong mọi trường hợp\" không nói trường hợp nào và luật nào. \"Phù hợp cách làm việc\" thì không có gì cụ thể để kiểm.",
      },
      {
        question: "Bản mô tả ghi: \"Tính tiền, có giảm giá nếu khách quen.\" Điều gì AI buộc phải đoán?",
        options: [
          "Khách quen là ai, giảm bao nhiêu phần trăm, tính trước hay sau thuế",
          "Khách quen là người mua nhiều hơn mười lần trong suốt một năm",
          "Giảm giá luôn là mười phần trăm cho mọi loại hàng hoá",
          "Giảm giá chỉ áp dụng vào ngày lễ và các dịp khuyến mãi",
        ],
        correct: 0,
        explanation:
          "Ba chỗ trống cùng lúc: định nghĩa khách quen, mức giảm, và thứ tự tính. Cả ba đều đổi kết quả cuối. Các phương án khác đều là những luật cụ thể mà AI có thể tự nghĩ ra - nhưng bản mô tả không hề nói, nên đó chính là thứ AI sẽ bịa.",
      },
      {
        question: "Sau khi tìm ra bốn chỗ mơ hồ, bước tiếp theo hợp lý nhất là gì?",
        options: [
          "Viết lại từng chỗ bằng số hoặc ví dụ cụ thể",
          "Gửi nguyên bản cũ kèm thêm câu \"nhớ làm thật cẩn thận\"",
          "Nhờ AI tự quyết định giùm cả bốn chỗ rồi dùng luôn",
          "Bỏ bốn chỗ đó cho gọn",
        ],
        correct: 0,
        explanation:
          "Mỗi chỗ mơ hồ cần được thay bằng một con số hoặc ví dụ có thể kiểm. \"Cẩn thận\" không đưa thêm thông tin nào. Nhờ AI quyết định tức là cho phép nó đoán, đúng thứ ta đang tránh. Còn bỏ hết các chỗ đó thì công cụ thiếu luật và AI vẫn tự điền.",
      },
    ],
    keyTakeaways: [
      "Hỏi từng câu: AI phải đoán điều gì ở đây?",
      "Từ cảm giác như \"nhanh\", \"đẹp\" chưa phải yêu cầu.",
      "Mỗi chỗ mơ hồ thay bằng số hoặc ví dụ kiểm được.",
      "Đọc mô tả trước khi dựng rẻ hơn sửa sau khi dùng.",
    ],
    practicePrompt: {
      question:
        "Câu nào dưới đây đã cụ thể, không còn chỗ để AI đoán?",
      options: [
        "Đơn giá nhập bằng đồng, số lượng nhập số nguyên từ 1 đến 999",
        "Đơn giá nhập sao cho hợp lý với từng loại mặt hàng",
        "Số lượng nhập theo cách mà người dùng quen nhất",
        "Nhập dữ liệu thật dễ để ai cũng dùng được ngay",
      ],
      correct: 0,
      explanation:
        "Câu đúng nêu kiểu số, đơn vị và khoảng giá trị - kiểm được bằng cách thử nhập 0 hoặc 1000. Các câu khác đều để AI chọn hộ: hợp lý theo loại nào, quen nhất với ai, dễ tới mức nào.",
    },
    summary: {
      keyIdea: "Chỗ mơ hồ trong mô tả là chỗ AI sẽ đoán bừa.",
      formula: "Đọc từng câu → hỏi \"AI phải đoán gì?\" → thay bằng số hoặc ví dụ.",
      commonMistake: "Dùng những từ cảm giác như \"nhanh\", \"đẹp\", \"hợp lý\" và tưởng đó là yêu cầu.",
      action: "Đọc lại trang mô tả của bạn và gạch chân mọi từ cảm giác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở trang mô tả bạn viết ở bài trước. Đọc từng câu và gạch chân mọi chỗ AI sẽ phải đoán: từ cảm giác, luật chưa nói, đơn vị chưa rõ. Viết lại từng chỗ đó bằng một con số hoặc một ví dụ, rồi đếm xem bạn tìm được bao nhiêu chỗ.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn tìm ra bao nhiêu chỗ mơ hồ trong mô tả của chính mình.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đồng nghiệp gửi bạn tin nhắn: \"Nhờ em làm cái bảng tính tiền cho nhiều khách, nhanh nhanh, nhìn đẹp đẹp.\" Bạn định trả lời \"ok\" và gõ vào AI. Khoan. Bài này tập một thói quen nhỏ: trước khi dựng, đọc từng câu và hỏi \"chỗ này AI sẽ phải đoán gì?\"",
      },
      {
        type: "feynman",
        title: "Soát mô tả đơn giản hơn bạn nghĩ",
        intro: "Giống như khi bạn đọc lại một bản hợp đồng thuê nhà: bạn không đọc để khen văn hay, bạn đọc để tìm chỗ hai bên có thể hiểu khác nhau.",
        columns: ["Thành phần", "Đọc hợp đồng thuê nhà", "Đọc bản mô tả công cụ"],
        rows: [
          ["Câu hỏi", "Chỗ nào hai bên có thể hiểu khác nhau?", "Chỗ nào AI phải đoán?"],
          ["Dấu hiệu", "\"Giá hợp lý\", \"sớm nhất có thể\"", "\"Nhanh\", \"đẹp\", \"nhiều khách\""],
          ["Cách sửa", "Ghi con số: 5 triệu, trước ngày 5", "Ghi con số hoặc ví dụ kiểm được"],
          ["Nếu bỏ qua", "Tranh cãi sau khi đã ký", "Công cụ sai sau khi đã dùng"],
        ],
        oneLiner: "Đọc mô tả công cụ như đọc hợp đồng: tìm chỗ hai bên có thể hiểu khác nhau, rồi ghi bằng con số.",
      },
      { type: "heading", text: "Vấn đề: lỗi trong mô tả không hiện ra ngay" },
      {
        type: "paragraph",
        text: "Một câu mô tả mơ hồ không báo lỗi khi bạn gõ. AI vẫn dựng xong, công cụ vẫn chạy. Chỉ tới khi kết quả lệch với phép tính tay của bạn thì mới lộ ra, và lúc đó bạn phải đoán ngược xem AI đã đoán gì.",
      },
      {
        type: "flow",
        title: "Bốn bước soát một bản mô tả",
        steps: [
          {
            label: "Đọc chậm từng câu",
            detail: "Đừng đọc lướt. Mỗi câu hỏi: câu này nói rõ điều gì, và bỏ trống điều gì?",
          },
          {
            label: "Đánh dấu từ cảm giác",
            detail: "Nhanh, đẹp, nhiều, hợp lý, tiện. Những từ này mỗi người hiểu một kiểu và không kiểm được bằng mắt hoặc số.",
          },
          {
            label: "Đánh dấu luật còn thiếu",
            detail: "Tính tiền theo luật nào, làm tròn ra sao, có thuế hay giảm giá không, ô để trống thì sao.",
          },
          {
            label: "Viết lại bằng số",
            detail: "Mỗi chỗ đã đánh dấu thay bằng một con số, một đơn vị hoặc một ví dụ có kết quả để kiểm.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản mô tả \"làm cái bảng tính tiền giúp tôi\"",
        task: "Đọc bản mô tả của đồng nghiệp. Đánh dấu những câu mà AI sẽ phải đoán bừa vì chưa đủ thông tin. Câu đã rõ thì để nguyên.",
        segments: [
          { text: "Nhân viên kinh doanh sẽ dùng công cụ này trên máy tính ở văn phòng." },
          {
            text: "Làm cái bảng tính tiền giúp tôi.",
            error: "\"Tính tiền\" chưa nói luật: chỉ nhân số lượng với đơn giá, hay có thuế, phí, chiết khấu? AI sẽ tự chọn một luật.",
          },
          {
            text: "Dùng được cho nhiều khách cùng lúc.",
            error: "Không nói bao nhiêu khách, và dữ liệu của mỗi khách tách riêng hay trộn chung - hai cách dựng khác hẳn nhau.",
          },
          {
            text: "Phải chạy thật nhanh.",
            error: "\"Nhanh\" là cảm giác, không có mốc nào để đo. AI không biết nhanh là bấm xong ra kết quả ngay hay dưới một giây.",
          },
          { text: "Hai ô nhập: số lượng (số nguyên) và đơn giá (đồng)." },
          {
            text: "Nhìn cho đẹp.",
            error: "\"Đẹp\" mỗi người hiểu một kiểu. AI sẽ chọn màu và cỡ chữ theo thói quen của nó, rồi bạn phải sửa đi sửa lại.",
          },
        ],
      },
      {
        type: "callout",
        label: "Mẹo: mỗi từ cảm giác thay bằng một con số",
        text: "\"Nhanh\" thành \"bấm tính là hiện kết quả ngay\". \"Nhiều khách\" thành \"tối đa 5 người dùng chung, mỗi người thấy riêng dữ liệu của mình\". \"Đẹp\" thành \"chữ lớn, màu xanh đậm, không quá 5 màu\". Nếu không thay được bằng con số, hãy hỏi lại người đã viết.",
      },
      {
        type: "list",
        items: [
          "Nhờ người khác đọc bản mô tả mà không giải thích gì: họ hiểu khác bạn ở đâu?",
          "Nhờ AI liệt kê các chỗ nó sẽ phải đoán, không dựng gì cả.",
          "Mỗi chỗ tìm ra, thêm một dòng vào trang giấy.",
        ],
      },
      {
        type: "scenario",
        title: "Anh Tuấn nhận bản mô tả của đồng nghiệp",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Tuấn nhận bản mô tả từ đồng nghiệp: \"Làm bảng tính tiền cho nhiều khách, nhanh, đẹp.\" Anh được giao nhờ AI dựng công cụ này trước cuối ngày.",
            choices: [
              { label: "Dán nguyên văn cho AI dựng vì đồng nghiệp đã viết rồi", next: "bad_paste" },
              { label: "Đọc từng câu, gạch ra các chỗ AI phải đoán rồi hỏi lại đồng nghiệp", next: "s2" },
            ],
          },
          bad_paste: {
            text: "AI dựng một công cụ có thuế 10% và phí vận chuyển. Đồng nghiệp xem xong nói \"mình có nhờ thuế đâu\". Cả hai mất nửa ngày để gỡ các phần AI tự thêm.",
            ending: "bad",
          },
          s2: {
            text: "Anh gạch ra bốn chỗ: luật tính tiền, số khách, \"nhanh\", \"đẹp\". Anh nhắn hỏi đồng nghiệp từng chỗ. Đồng nghiệp trả lời đủ ba chỗ, riêng chỗ \"đẹp\" thì nói \"sao cũng được\".",
            choices: [
              { label: "Bỏ dòng \"đẹp\", để AI chọn kiểu giao diện bình thường rồi chỉnh sau", next: "good" },
              { label: "Giữ nguyên chữ \"đẹp\" trong mô tả cho đủ ý người viết", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "AI dựng giao diện nhiều màu và hiệu ứng. Đồng nghiệp lại không thích. Chữ \"đẹp\" vẫn chưa nói được điều gì cụ thể nên hai người cãi nhau về màu sắc cả buổi chiều.",
            ending: "bad",
          },
          good: {
            text: "Mô tả giờ có luật tính tiền, số khách và hành vi \"bấm là ra\". Công cụ dựng đúng ngay lần đầu, chỉ phần màu sắc chỉnh thêm một lần.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi chỗ AI phải đoán là một chỗ có thể sai.",
          "Bài sau: quyết định trước khi tốn công - làm mới hay dùng phần mềm có sẵn.",
        ],
      },
    ],
  },
  {
    id: 2543,
    slug: "cong-cu-nho-hay-dung-phan-mem-co-san",
    title: "Chặng 57, Bài 4: Làm mới hay dùng phần mềm có sẵn: quyết định trước khi tốn công",
    subtitle: "Không phải việc nào cũng cần tự làm. Biết khi nào nên dùng đồ sẵn là một kỹ năng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhờ AI dựng công cụ dễ tới mức nhiều người làm ngay mà không hỏi: phần mềm đang dùng đã có tính năng này chưa? Tự làm lại thứ đã có là tốn công hai lần: một lần làm, một lần bảo trì mãi về sau. Bài này dạy ba câu hỏi để quyết định trong mười phút.",
    openingQuestion:
      "Phòng bạn cần theo dõi ngày nghỉ phép của 12 người. Công ty đang dùng phần mềm nhân sự có sẵn mục nghỉ phép nhưng chưa ai mở ra xem. Bạn định nhờ AI dựng một công cụ riêng. Bước đầu đúng nhất là gì?",
    openingOptions: [
      "Hỏi phòng nhân sự xem phần mềm sẵn có đã làm được việc này chưa",
      "Dựng ngay công cụ riêng vì tự làm thì chắc chắn hợp ý mình hơn hẳn",
      "Mua thêm một phần mềm nhân sự khác đang được quảng cáo nhiều",
      "Không theo dõi nghỉ phép nữa vì đã có đồng nghiệp nhớ giùm",
    ],
    correctOption: 0,
    explanation:
      "Phần mềm có sẵn thường đã được công ty trả tiền, có người quản trị và có dữ liệu chung - tự làm lại là tạo thêm một nơi lưu nghỉ phép thứ hai, dễ lệch với nơi chính thức. Dựng ngay vì \"hợp ý\" bỏ qua cái giá bảo trì. Mua thêm phần mềm thứ hai chỉ lặp lại vấn đề. Còn \"nhớ giùm\" là không theo dõi gì cả.",
    diagram: [
      { label: "Việc này đã có trong phần mềm đang dùng chưa?", arrow: true },
      { label: "Nếu có: thử dùng trước", arrow: true },
      { label: "Nếu thiếu: thiếu đúng chỗ nào?", arrow: true },
      { label: "Chỉ làm công cụ cho phần thiếu đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm vận hành một cửa hàng thương mại điện tử nhỏ",
      description:
        "Một nhóm bốn người tự dựng bảng theo dõi đơn, rồi phát hiện công cụ quản lý bán hàng họ đã trả tiền hàng tháng có sẵn cột trạng thái đơn và lọc theo người phụ trách. Nhóm mất hai tuần làm, rồi tuần thứ ba mới biết. Sau đó họ chỉ tự làm đúng một thứ phần mềm không có: báo cáo tay cuối tuần theo mẫu của sếp.",
    },
    quiz: [
      {
        question: "Câu hỏi nào nên đặt ra đầu tiên khi nghĩ tới việc tự làm công cụ?",
        options: [
          "Phần mềm đang dùng đã có sẵn tính năng này chưa?",
          "Công cụ mới sẽ có màu nào cho hợp với logo công ty?",
          "Nên đặt tên công cụ bằng tiếng Việt hay tiếng Anh?",
          "Có nên khoe công cụ này trong buổi họp toàn công ty không?",
        ],
        correct: 0,
        explanation:
          "Nếu đồ sẵn đã đủ dùng thì mọi công sức sau đó là thừa. Màu sắc, tên gọi và chuyện khoe trong họp đều là chi tiết sau khi đã quyết định có làm hay không, và chúng không làm cho công cụ đáng làm hơn.",
      },
      {
        question: "Tự làm công cụ thường đáng hơn dùng đồ sẵn trong trường hợp nào?",
        options: [
          "Việc theo luật riêng của phòng mà phần mềm sẵn có không có",
          "Việc nhiều người trong công ty đang làm giống hệt nhau",
          "Việc phần mềm đang dùng đã làm được chỉ cần bật một tính năng",
          "Việc mà chưa ai trong phòng hiểu rõ luật làm như thế nào",
        ],
        correct: 0,
        explanation:
          "Luật riêng của phòng là thứ phần mềm đại trà không có và không bao giờ có. Việc nhiều người làm giống nhau thường đã có phần mềm phục vụ. Tính năng sẵn có chỉ cần bật thì khỏi làm. Việc chưa ai hiểu luật thì phải làm rõ luật trước, rồi mới bàn tới công cụ.",
      },
      {
        question: "Vì sao \"tự làm lại thứ đã có\" tốn công hơn vẻ ngoài của nó?",
        options: [
          "Công cụ tự làm còn phải bảo trì và dữ liệu nằm ở hai nơi",
          "Công cụ tự làm luôn chạy chậm hơn mọi phần mềm có sẵn",
          "Công cụ tự làm không bao giờ dùng được cho nhiều người",
          "Công cụ tự làm bị cấm dùng trong mọi công ty hiện nay",
        ],
        correct: 0,
        explanation:
          "Chi phí ẩn là bảo trì mãi về sau và dữ liệu bị tách ra hai nơi, dễ lệch nhau. Tốc độ phụ thuộc cách làm, không phải chuyện tự làm hay không. Công cụ tự làm có thể dùng cho nhiều người. Và không có quy định chung nào cấm; mỗi công ty có quy định riêng, nên hỏi bộ phận IT.",
      },
      {
        question: "Bạn cần theo dõi ngày nghỉ phép của 12 người, mỗi người có 12 ngày mỗi năm. Hai người đã nghỉ 3 và 5 ngày. Phần mềm sẵn có làm được việc này. Lựa chọn đúng?",
        options: [
          "Dùng phần mềm đó và hỏi người quản trị cách xem số ngày còn lại",
          "Dựng bảng riêng vì 12 người là đủ ít để tự tính bằng tay",
          "Dựng bảng riêng để số ngày còn lại hiển thị đúng ý mình",
          "Chờ tới cuối năm rồi tổng kết số ngày nghỉ của từng người",
        ],
        correct: 0,
        explanation:
          "Phần mềm đã có, bảng riêng chỉ tạo thêm nơi lưu thứ hai. Việc ít người không phải lý do để tự làm - vẫn sẽ lệch khi có người nghỉ mà quên ghi. \"Hiển thị đúng ý\" thường là chuyện cài đặt, không đáng một công cụ mới. Chờ cuối năm thì quá muộn để sửa sai.",
      },
      {
        question: "Phần mềm sẵn có thiếu đúng một báo cáo theo mẫu riêng của sếp. Bạn nên làm gì?",
        options: [
          "Xuất dữ liệu từ phần mềm và chỉ làm công cụ cho báo cáo đó",
          "Bỏ phần mềm đó và chuyển cả phòng sang công cụ tự làm",
          "Nhờ công ty mua thêm tính năng đắt tiền rồi mới báo cáo",
          "Gõ tay báo cáo mỗi tuần vì làm công cụ chắc chắn tốn thêm công",
        ],
        correct: 0,
        explanation:
          "Chỉ làm đúng phần thiếu, còn dữ liệu vẫn nằm ở nơi chính thức. Bỏ cả phần mềm là vứt đi thứ đang chạy tốt. Xin mua tính năng mới có thể chậm và đắt so với một báo cáo nhỏ. Gõ tay đều đặn thì chính là loại việc lặp lại mà bài 1 đã dạy nên làm công cụ.",
      },
    ],
    keyTakeaways: [
      "Việc đầu tiên: kiểm xem phần mềm đang dùng đã làm được chưa.",
      "Tự làm là tạo ra nơi lưu thứ hai và việc bảo trì về sau.",
      "Chỉ tự làm phần mà đồ sẵn không có, thường là luật riêng của phòng.",
      "Hỏi người quản trị phần mềm trước khi nhờ AI dựng.",
    ],
    practicePrompt: {
      question:
        "Phòng bạn có ba nhu cầu: (a) chấm công hằng ngày, phần mềm nhân sự đã có; (b) bảng báo giá theo mẫu riêng của phòng, chưa có nơi nào làm; (c) họp trực tuyến, công ty đã có công cụ họp. Nên tự làm cái nào?",
      options: [
        "Chỉ bảng báo giá theo mẫu riêng, hai nhu cầu kia dùng đồ sẵn",
        "Cả ba, vì tự làm thì cả ba đều hợp với cách làm của phòng",
        "Chỉ chấm công, vì đó là việc lặp hằng ngày nhiều nhất",
        "Không cái nào, vì công cụ tự làm luôn kém phần mềm chính thức",
      ],
      correct: 0,
      explanation:
        "Bảng báo giá theo mẫu riêng là thứ duy nhất chưa có nơi nào làm. Chấm công và họp đã có công cụ chính thức, tự làm chỉ tạo ra nơi lưu thứ hai. Việc lặp hằng ngày nhiều chưa phải lý do nếu đồ sẵn đã làm tốt. Và nói công cụ tự làm luôn kém là quá tuyệt đối - nó hợp với luật riêng.",
    },
    summary: {
      keyIdea: "Dùng đồ sẵn trước, chỉ tự làm đúng phần đồ sẵn không có.",
      formula: "Có sẵn chưa? → thiếu đúng chỗ nào? → chỉ làm chỗ thiếu.",
      commonMistake: "Nhờ AI dựng ngay một công cụ rồi mới phát hiện phần mềm đang dùng đã có tính năng đó.",
      action: "Liệt kê công cụ công ty đang cho bạn dùng và kiểm xem việc bạn chọn đã có chưa.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy việc bạn chọn làm công cụ. Liệt kê các phần mềm công ty đang cho bạn dùng (bảng tính, hệ thống quản lý, công cụ nhắn tin...) và kiểm từng cái: có làm được việc này không, thiếu đúng chỗ nào? Nếu không chắc, nhắn hỏi người quản trị hoặc phòng IT một câu cụ thể rồi ghi lại câu trả lời.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn đã tìm thấy phần mềm nào làm được một phần việc và còn thiếu chỗ nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa học cách chọn việc và viết mô tả. Bây giờ có một câu hỏi ít ai đặt ra: liệu công ty đã có sẵn thứ làm việc này chưa? Nhờ AI dựng công cụ nhanh tới mức nhiều người bắt tay vào làm trước khi kiểm. Bài này dạy ba câu hỏi ngắn để quyết định.",
      },
      {
        type: "feynman",
        title: "Làm mới hay dùng đồ sẵn đơn giản hơn bạn nghĩ",
        intro: "Giống như khi bạn cần một chiếc ghế: trước khi mua gỗ về tự đóng, bạn mở kho công ty xem có ghế thừa không.",
        columns: ["Thành phần", "Cần một chiếc ghế", "Cần một công cụ"],
        rows: [
          ["Bước đầu", "Mở kho xem có ghế thừa không", "Hỏi xem phần mềm đang dùng đã làm được chưa"],
          ["Khi thiếu một phần", "Mua thêm tấm đệm, không đóng ghế mới", "Làm công cụ nhỏ chỉ cho phần thiếu"],
          ["Cái giá về sau", "Ghế tự đóng phải tự sửa khi hỏng", "Công cụ tự làm phải tự bảo trì"],
          ["Khi tự làm xứng đáng", "Cần kích cỡ không ghế nào có", "Cần luật riêng của phòng mà không phần mềm nào có"],
        ],
        oneLiner: "Mở kho trước khi đóng ghế: kiểm đồ sẵn, rồi mới tự làm đúng phần còn thiếu.",
      },
      { type: "heading", text: "Vấn đề: tự làm thì thấy nhanh, bảo trì thì thấy sau" },
      {
        type: "paragraph",
        text: "Dựng công cụ bằng AI có thể xong trong một buổi chiều, nên cảm giác là rẻ. Nhưng công cụ sống lâu hơn buổi chiều đó: khi luật đổi, khi người dùng mới vào, khi dữ liệu cần sửa, bạn là người sửa. Đó là cái giá ẩn mà đồ sẵn đã có người lo.",
      },
      {
        type: "flow",
        title: "Ba câu hỏi trước khi tự làm",
        steps: [
          {
            label: "Đã có sẵn chưa?",
            detail: "Kiểm các phần mềm công ty đang cho bạn dùng. Nếu không chắc, hỏi người quản trị một câu cụ thể: phần mềm này có làm được (việc của bạn) không?",
          },
          {
            label: "Thiếu đúng chỗ nào?",
            detail: "Nếu đồ sẵn làm được 80% việc, phần 20% thiếu mới là thứ đáng làm công cụ. Ghi rõ phần thiếu bằng một câu.",
          },
          {
            label: "Ai bảo trì?",
            detail: "Công cụ tự làm cần một người đổi luật khi luật đổi. Nếu không ai nhận, công cụ sẽ lỗi thời trong vài tháng.",
          },
          {
            label: "Dữ liệu nằm ở đâu?",
            detail: "Nếu tự làm sẽ có thêm một nơi lưu dữ liệu. Quyết định trước: nơi nào là bản chính thức để tránh hai nơi lệch nhau.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nên dùng đồ sẵn",
          text: "Chấm công, nghỉ phép, họp trực tuyến, gửi email hàng loạt - những việc nhiều công ty cùng làm và đã có phần mềm phục vụ, thường có người quản trị lo giúp.",
        },
        right: {
          label: "Đáng tự làm",
          text: "Mẫu báo giá theo luật chiết khấu riêng của phòng, bảng nhập yêu cầu theo đúng quy trình nhóm bạn, báo cáo cuối tuần theo mẫu sếp muốn - những việc quá riêng để phần mềm đại trà có sẵn.",
        },
      },
      {
        type: "callout",
        label: "Hỏi IT không phải xin phép",
        text: "Hỏi phòng IT hoặc người quản trị phần mềm \"phần mềm này có làm được việc X không?\" là câu hỏi bình thường và thường tiết kiệm cho bạn cả tuần. Nếu công cụ tự làm sẽ chứa dữ liệu khách hoặc nhân viên, hãy hỏi thêm quy định của công ty về dữ liệu.",
      },
      {
        type: "scenario",
        title: "Phòng chị Lan chọn việc để tự làm",
        start: "s1",
        nodes: {
          s1: {
            text: "Phòng chị Lan có ba nhu cầu: (a) chấm công hằng ngày, phần mềm nhân sự đã có; (b) bảng báo giá theo luật chiết khấu riêng của phòng, chưa nơi nào làm; (c) họp trực tuyến, công ty đã có công cụ họp. Chị Lan chỉ có thời gian làm một thứ trong tuần này.",
            choices: [
              { label: "Tự làm công cụ chấm công cho hợp ý cả phòng", next: "bad_dup" },
              { label: "Tự làm công cụ họp trực tuyến riêng cho phòng", next: "bad_dup2" },
              { label: "Tự làm bảng báo giá theo luật riêng của phòng", next: "s2" },
            ],
          },
          bad_dup: {
            text: "Công cụ chấm công tự làm chạy được, nhưng phòng nhân sự vẫn dùng phần mềm chính thức để tính lương. Chị Lan phải nhập dữ liệu hai nơi và cuối tháng hai bảng lệch nhau.",
            ending: "bad",
          },
          bad_dup2: {
            text: "Công cụ họp tự làm không kết nối được lịch của công ty, khách bên ngoài không vào được. Sau hai tuần, cả phòng quay về công cụ họp chính thức.",
            ending: "bad",
          },
          s2: {
            text: "Chị Lan hỏi phòng IT: phần mềm bán hàng của công ty có thể tính chiết khấu theo bậc riêng của phòng không? Câu trả lời: chưa, cần chờ đợt cập nhật sau ba tháng.",
            choices: [
              { label: "Nhờ AI dựng công cụ nhỏ cho báo giá, xuất kết quả để nhập vào phần mềm chính thức", next: "good" },
              { label: "Bỏ hẳn phần mềm bán hàng để dùng công cụ tự làm cho toàn bộ đơn hàng", next: "bad_all" },
            ],
          },
          bad_all: {
            text: "Công cụ nhỏ phải gánh luôn đơn hàng, kho và công nợ. Hai tháng sau nó quá tải, dữ liệu mất dấu, và phòng kế toán không chấp nhận số liệu từ nó.",
            ending: "bad",
          },
          good: {
            text: "Công cụ chỉ làm đúng việc phần mềm chính thức chưa có: tính chiết khấu theo luật riêng. Dữ liệu đơn hàng vẫn ở nơi chính thức nên không bị lệch.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đồ sẵn trước, tự làm chỉ cho phần còn thiếu.",
          "Bài sau: dự án nhỏ đầu tiên - công cụ tính thành tiền chỉ có một nút.",
        ],
      },
    ],
  },
  {
    id: 2544,
    slug: "du-an-nho-cong-cu-tinh-tien-cong-thu-cong",
    title: "Chặng 57, Bài 5: Dự án nhỏ: bản chạy đầu tiên của một công cụ chỉ có một nút",
    subtitle: "Nhờ AI dựng một công cụ tính thành tiền, rồi tự thử ba con số bằng tay.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ chạy không có nghĩa là công cụ đúng. AI dựng xong rất nhanh và kết quả trông rất tự tin, nhưng người chịu trách nhiệm cho con số là bạn. Thói quen thử ba con số bằng tay trước khi dùng là lớp bảo vệ rẻ nhất và nó áp dụng cho mọi công cụ bạn làm sau này.",
    openingQuestion:
      "AI vừa dựng xong công cụ tính thành tiền từ số lượng và đơn giá, hiện kết quả 150.000 khi bạn nhập 3 và 50.000. Bạn nên làm gì tiếp theo?",
    openingOptions: [
      "Thử thêm vài con số mà bạn tự tính tay được kết quả",
      "Dùng ngay cho đơn thật vì cả ví dụ đầu đã ra đúng rồi",
      "Hỏi lại AI xem công cụ đã đúng chưa rồi tin câu trả lời",
      "Gửi cho cả phòng dùng luôn để mọi người cùng phát hiện lỗi",
    ],
    correctOption: 0,
    explanation:
      "Một ví dụ đúng chưa chứng minh được gì: công cụ có thể đúng với số tròn mà sai với số lẻ hoặc số 0. Bạn cần thêm vài con số mà bạn tự tính được kết quả. Hỏi lại AI không phải là kiểm tra, vì nó có thể khẳng định điều nó vừa làm. Dùng ngay cho đơn thật hoặc phát cho cả phòng là để người khác gánh rủi ro thay bạn.",
    diagram: [
      { label: "Viết mô tả một nút, hai ô nhập", arrow: true },
      { label: "AI dựng bản chạy đầu tiên", arrow: true },
      { label: "Tự tính tay ba ví dụ khác nhau", arrow: true },
      { label: "So kết quả: khớp thì dùng, lệch thì sửa mô tả" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên bán hàng tại một cửa hàng đồ gia dụng",
      description:
        "Một bạn bán hàng nhờ AI dựng công cụ tính thành tiền. Bản đầu khớp ví dụ 3 × 50.000. Bạn thử thêm hai số: một số lượng lẻ 2,5 và một số lượng bằng 0. Số lượng lẻ ra đúng, còn số 0 hiện ra ô trống thay vì 0 đồng. Bạn sửa mô tả một dòng và dựng lại. Toàn bộ quá trình mất khoảng 20 phút, các số trong ví dụ chỉ để minh hoạ.",
    },
    quiz: [
      {
        question: "Ba con số nên thử khi kiểm công cụ tính thành tiền gồm những loại nào?",
        options: [
          "Một số tròn quen thuộc, một số lẻ và một số bằng 0",
          "Ba số tròn khác nhau nhưng cùng độ lớn giống nhau hoàn toàn",
          "Ba số thật lớn để chắc chắn máy không bị quá tải",
          "Ba số bất kỳ do AI tự chọn để bạn so với kết quả của nó",
        ],
        correct: 0,
        explanation:
          "Số tròn kiểm đường đi chính, số lẻ kiểm làm tròn, số 0 kiểm trường hợp biên. Ba số tròn cùng độ lớn chỉ kiểm cùng một chỗ. Số rất lớn kiểm giới hạn chứ không phải lỗi phổ biến. Số AI chọn là để AI tự chấm bài của mình, không phải bạn kiểm.",
      },
      {
        question: "Bạn nhập số lượng 7 và đơn giá 12.000. Công cụ hiện 84.000. Kết quả tính tay đúng là bao nhiêu và công cụ có khớp không?",
        options: [
          "84.000 (= 7 × 12.000), công cụ khớp",
          "19.000 (= 7 + 12.000, cộng thay vì nhân), công cụ sai",
          "8.400 (= 7 × 1.200, sai dấu phẩy thập phân), công cụ sai",
          "840.000 (= 7 × 120.000, thừa một chữ số 0), công cụ sai",
        ],
        correct: 0,
        explanation:
          "7 × 12.000 = 84.000, công cụ khớp với tính tay. Ba phương án còn lại là ba lỗi phổ biến khi tính vội: cộng thay vì nhân, lệch một dấu thập phân, thừa một chữ số 0. Đó cũng là ba lỗi nên thử khi kiểm công cụ.",
      },
      {
        question: "Kết quả lệch với phép tính tay của bạn. Cách sửa hợp lý nhất là gì?",
        options: [
          "Ghi rõ luật tính vào mô tả rồi nhờ AI dựng lại",
          "Đoán và sửa tay từng con số hiện ra trên màn hình",
          "Bỏ công cụ và quay lại tính tay mãi mãi từ nay về sau",
          "Hỏi AI \"công cụ đúng chứ?\" và tin vào câu trả lời của nó",
        ],
        correct: 0,
        explanation:
          "Lỗi ở công cụ thì sửa từ gốc: viết rõ luật vào mô tả và dựng lại. Sửa tay từng con số chỉ che lỗi, lần sau nó hiện ra tiếp. Bỏ hẳn công cụ là phí phần nhiều bạn đã làm được. Và AI có thể xác nhận luôn lỗi nó vừa gây ra.",
      },
      {
        question: "Vì sao công cụ \"chỉ có một nút\" là bản đầu tốt?",
        options: [
          "Ít thành phần nên dễ kiểm và dễ thấy lỗi ở đâu",
          "Một nút luôn cho kết quả chính xác hơn nhiều nút khác",
          "AI từ chối dựng công cụ nhiều nút",
          "Người dùng không cần biết thêm bất kỳ tính năng nào khác",
        ],
        correct: 0,
        explanation:
          "Ít thành phần thì mỗi lỗi chỉ có vài chỗ để nấp. Số nút không quyết định độ chính xác, phép tính bên trong mới quyết định. AI vẫn dựng được công cụ nhiều nút. Và người dùng sau này sẽ cần thêm tính năng; chỉ là bạn thêm từng cái một, kiểm từng cái một.",
      },
      {
        question: "Bạn nhập số lượng 0 và công cụ hiện ô trống. Đây là loại lỗi gì?",
        options: [
          "Lỗi trường hợp biên: luật chưa nói số 0 thì ra gì",
          "Lỗi tính toán cơ bản do AI không biết nhân hai số",
          "Lỗi giao diện do màn hình không đủ rộng để hiện số",
          "Không phải lỗi, không ai nhập 0",
        ],
        correct: 0,
        explanation:
          "Số 0, ô để trống, số âm là trường hợp biên: mô tả không nói nên AI đoán. Đó không phải lỗi nhân, vì 0 nhân bất kỳ số nào vẫn là 0 và AI làm được. Đó cũng không phải lỗi màn hình. Và người dùng thật hoàn toàn có thể gõ 0 hoặc bấm nhầm.",
      },
      {
        question: "Bạn nhờ AI dựng công cụ và nó đưa kết quả cùng câu \"đã kiểm tra kỹ, mọi phép tính đều đúng\". Nên hiểu câu đó thế nào?",
        options: [
          "Chưa phải bằng chứng: tự thử ba con số mới là kiểm tra",
          "Đủ tin cậy để dùng ngay vì AI đã tự kiểm tra xong rồi",
          "Đúng chắc chắn vì AI không bao giờ nói sai về công việc của nó",
          "Chỉ đáng tin nếu câu đó được viết bằng chữ in đậm và có số liệu",
        ],
        correct: 0,
        explanation:
          "Câu \"đã kiểm tra\" cũng chỉ là chữ do AI sinh ra, không phải kết quả một lần kiểm thật. Thử ba con số bằng tay mới là bằng chứng. AI có thể nói sai về chính công việc của nó. Và chữ in đậm hay số liệu đi kèm không làm câu đó đáng tin hơn.",
      },
    ],
    keyTakeaways: [
      "Bản đầu chỉ cần làm đúng một việc, một nút.",
      "Tự thử ba con số: số tròn, số lẻ, số 0.",
      "Công cụ lệch tính tay thì sửa mô tả rồi dựng lại.",
      "Lời khẳng định của AI không thay cho phép thử của bạn.",
    ],
    practicePrompt: {
      question:
        "Bạn thử công cụ với 2 × 25.000 và được 50.000. Thử tiếp với 2,5 × 10.000 và nhận 20.000. Bạn tính tay được 25.000. Điều gì hợp lý nhất?",
      options: [
        "Công cụ đang bỏ phần thập phân của số lượng, sửa mô tả rồi dựng lại",
        "Công cụ đúng, vì ví dụ đầu tiên đã ra đúng kết quả",
        "Bạn tính tay sai, vì máy luôn tính chính xác hơn người",
        "Số lẻ không cần hỗ trợ nên bỏ qua kết quả lệch này",
      ],
      correct: 0,
      explanation:
        "20.000 = 2 × 10.000 nghĩa là công cụ làm tròn 2,5 thành 2. Ví dụ đầu ra đúng chỉ vì nó là số tròn. Máy không chính xác hơn khi luật chưa nói rõ số lẻ. Còn bỏ qua số lẻ chỉ đúng nếu bạn cố ý quyết định như vậy và ghi lại.",
    },
    summary: {
      keyIdea: "Công cụ đúng khi bạn tự thử ba con số và kết quả khớp, không phải khi AI nói nó đúng.",
      formula: "Dựng một nút → thử số tròn, số lẻ, số 0 → khớp thì dùng, lệch thì sửa mô tả.",
      commonMistake: "Thử đúng một ví dụ đẹp rồi coi như công cụ đã đúng.",
      action: "Dựng một công cụ một nút cho việc bạn đã chọn và thử đủ ba con số.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết mô tả một nút cho công cụ tính thành tiền hoặc một phép tính đơn giản trong việc của bạn (ai dùng, nhập gì, ra gì, một ví dụ có số). Nhờ AI dựng. Sau đó tự tính tay ba con số: một số tròn, một số lẻ, một số 0, rồi so với kết quả công cụ và ghi lại ba cặp đó.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn ba con số đã thử là gì và có con nào lệch không.",
    },
    sections: [
      {
        type: "lead",
        text: "Đến đây bạn đã chọn được việc, viết được mô tả, biết khi nào nên dùng đồ sẵn. Bài này là lần đầu bạn dựng thật: một công cụ chỉ có một nút, hai ô nhập, một kết quả. Điều quan trọng nhất không phải AI dựng nhanh thế nào, mà bạn kiểm ra sao.",
      },
      {
        type: "feynman",
        title: "Thử công cụ đơn giản hơn bạn nghĩ",
        intro: "Giống như khi bạn mua một chiếc cân mới: bạn không tin chiếc cân chỉ vì nó hiện số. Bạn đặt lên vài quả cân đã biết trọng lượng rồi xem nó có hiện đúng không.",
        columns: ["Thành phần", "Thử chiếc cân mới", "Thử công cụ tính tiền"],
        rows: [
          ["Vật để thử", "Quả cân 1 kg, 500 g, và không có gì", "Ba số đã biết kết quả: số tròn, số lẻ, số 0"],
          ["Bạn so với", "Trọng lượng ghi trên quả cân", "Kết quả bạn tự tính tay"],
          ["Nếu lệch", "Chỉnh hoặc đổi cân", "Sửa mô tả rồi dựng lại"],
          ["Đừng tin", "Con số chỉ vì nó hiện trên màn hình", "Lời AI nói \"đã kiểm tra kỹ\""],
        ],
        oneLiner: "Công cụ mới như chiếc cân mới: đặt vật đã biết lên trước, rồi mới cân đồ thật.",
      },
      { type: "heading", text: "Vấn đề: công cụ chạy trơn nhưng có thể đúng sai" },
      {
        type: "paragraph",
        text: "Kết quả hiện ra sạch sẽ, có dấu ngăn nghìn, giao diện gọn gàng - và có thể sai. Công cụ thực sự xong khi bạn đã so nó với phép tính tay trên ít nhất ba con số khác nhau.",
      },
      {
        type: "chart",
        title: "Thành tiền theo số lượng và đơn giá",
        caption: "Số liệu minh hoạ. Kéo đơn giá để thấy thành tiền thay đổi. Đây cũng là cách bạn chọn số để thử: số tròn, số lẻ và số 0 đều nằm trên đường này.",
        kind: "line",
        xLabel: "Số lượng",
        yLabel: "Thành tiền (nghìn đồng)",
        x: { from: 0, to: 20, step: 1 },
        params: [
          { id: "price", label: "Đơn giá mỗi món", min: 5, max: 500, step: 5, value: 50, unit: "nghìn đồng" },
        ],
        series: [{ label: "Thành tiền", expr: "x * price" }],
      },
      { type: "heading", text: "Ba con số cần thử" },
      {
        type: "list",
        items: [
          "Số tròn quen thuộc, ví dụ 3 × 50.000 = 150.000: kiểm đường đi chính.",
          "Số lẻ, ví dụ 2,5 × 10.000 = 25.000: kiểm làm tròn và phần thập phân.",
          "Số 0, ví dụ 0 × 50.000 = 0: kiểm trường hợp biên và ô bỏ trống.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng công cụ tính thành tiền",
        task: "Bạn cần công cụ một nút: nhập số lượng và đơn giá, hiện thành tiền. Lắp câu lệnh để AI dựng đúng và bạn có thể kiểm được.",
        parts: [
          {
            id: "what",
            label: "Công cụ làm gì",
            options: [
              {
                text: "Làm cái máy tính tiền cho cửa hàng của tôi.",
                feedback: "Quá rộng: AI dựng một phần mềm bán hàng với nhiều thứ bạn không cần.",
              },
              {
                text: "Công cụ một nút, hai ô nhập: số lượng (cho phép số lẻ) và đơn giá (đồng); hiện thành tiền = số lượng × đơn giá.",
                good: true,
                feedback: "Một việc, hai ô nhập có kiểu, luật tính rõ ràng.",
              },
            ],
          },
          {
            id: "edge",
            label: "Trường hợp biên",
            options: [
              {
                text: "Nếu để trống ô nào thì coi như 0 và hiện 0 đồng; số âm thì hiện thông báo yêu cầu nhập lại.",
                good: true,
                feedback: "Số 0 và số âm đã có luật, AI không phải đoán.",
              },
              {
                text: "Xử lý các trường hợp lạ cho hợp lý.",
                feedback: "\"Hợp lý\" để AI tự chọn luật cho ô trống và số âm, và bạn sẽ không biết nó đã chọn gì.",
              },
            ],
          },
          {
            id: "test",
            label: "Ví dụ để kiểm",
            options: [
              {
                text: "Sau khi dựng, hãy tự kiểm tra rồi báo tôi là đã đúng.",
                feedback: "Tự chấm bài của mình không phải kiểm tra thật - kết quả bạn vẫn phải tự thử.",
              },
              {
                text: "Ví dụ: 3 × 50.000 = 150.000; 2,5 × 10.000 = 25.000; 0 × 50.000 = 0. Hiện từng phép tính để tôi đối chiếu.",
                good: true,
                feedback: "Ba ví dụ có sẵn kết quả đúng, đủ số tròn, số lẻ và số 0.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["what", "edge", "test"],
            text: "Đã dựng. Thử ba ví dụ của bạn:\n- 3 × 50.000 = 150.000 (đúng)\n- 2,5 × 10.000 = 25.000 (đúng)\n- 0 × 50.000 = 0 đồng (đúng)\nÔ để trống coi như 0; số âm hiện thông báo nhập lại.\n\n(Bạn vẫn tự nhập lại ba con số để kiểm, đừng chỉ tin dòng này.)",
          },
          {
            requires: ["what"],
            text: "Công cụ đã dựng: 3 × 50.000 = 150.000. Tôi đã kiểm tra kỹ, mọi phép tính đều đúng.\n\n(Chỉ có một ví dụ tròn. Số lẻ và số 0 chưa ai kiểm, và câu \"đã kiểm tra kỹ\" cũng chỉ là chữ.)",
          },
          {
            text: "Đây là hệ thống bán hàng gồm quản lý kho, công nợ khách và báo cáo doanh thu theo tháng. Số lượng chỉ nhận số nguyên.\n\n(Mô tả quá rộng nên AI dựng thứ to hơn nhiều so với cần, và tự chọn chỉ nhận số nguyên.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thử xong rồi mới dùng",
        text: "Ghi lại ba cặp \"số nhập - kết quả tính tay - kết quả công cụ\" vào một dòng ghi chú. Khi sau này sửa công cụ, bạn chạy lại đúng ba cặp đó để biết sửa có làm hỏng thứ đang đúng không.",
      },
      {
        type: "scenario",
        title: "Bạn Minh thử công cụ trước khi gửi sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn Minh vừa nhờ AI dựng công cụ tính thành tiền. Ví dụ đầu, 3 × 50.000, ra 150.000. Sếp đang chờ và nhắn: \"Gửi anh công cụ để anh dùng cho báo giá chiều nay.\"",
            choices: [
              { label: "Gửi ngay cho sếp vì ví dụ đầu đã đúng", next: "bad_send" },
              { label: "Thử thêm 2,5 × 10.000 và 0 × 50.000 rồi mới gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Chiều đó sếp nhập số lượng 2,5 và công cụ hiện 20.000 thay vì 25.000. Sếp đã gửi báo giá thiếu tiền cho khách trước khi nhận ra.",
            ending: "bad",
          },
          s2: {
            text: "Kết quả: 2,5 × 10.000 ra 20.000 thay vì 25.000. Công cụ đang bỏ phần thập phân. Số 0 thì đúng.",
            choices: [
              { label: "Thêm \"cho phép số lẻ\" vào mô tả, nhờ AI dựng lại, rồi thử lại cả ba số", next: "good" },
              { label: "Nhắn sếp \"anh nhớ chỉ nhập số nguyên nhé\" rồi gửi luôn", next: "bad_rule" },
            ],
          },
          bad_rule: {
            text: "Sếp nhớ được vài ngày. Sang tuần sau, một nhân viên khác dùng công cụ, nhập số lẻ theo thói quen và báo giá thiếu tiền mà không ai hay biết.",
            ending: "bad",
          },
          good: {
            text: "Sau khi sửa mô tả, cả ba con số đều khớp tính tay. Bạn Minh ghi ba cặp số vào ghi chú kèm công cụ và gửi sếp với câu \"đã thử ba trường hợp\".",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một nút, ba con số thử, và bạn là người kiểm cuối cùng.",
          "Bài sau bắt đầu phần biểu mẫu: hỏi những gì, bỏ những gì.",
        ],
      },
    ],
  },
];
