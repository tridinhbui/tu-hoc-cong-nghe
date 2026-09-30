import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 31, bài 1-5. Giáo trình: scripts/curriculum/stage-31.json.
// Không khẳng định tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm.

// Đáp án đúng luôn viết ở vị trí 0; build sẽ cân lại vị trí.
const qz = (question: string, right: string, wrong: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S31_A_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 1 ─────────────────────────
  {
    id: 2020,
    slug: "giao-an-45-phut-tu-mot-muc-tieu",
    title: "Chặng 31, Bài 1: Giáo án 45 phút chỉ từ một mục tiêu bài học",
    subtitle: "Bạn biết lớp mình, AI biết nhiều kiểu tiết học: ghép hai thứ đó lại trong mười phút.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Soạn giáo án buổi tối thường mất cả tiếng, phần lớn thời gian là nghĩ ra cách chia tiết. Nếu bạn đưa đúng mục tiêu và giới hạn của lớp, AI cho bạn ba phương án để chọn, và bạn dành sức cho việc mà chỉ bạn làm được: biết lớp mình cần gì.",
    openingQuestion:
      "Tối nay bạn phải soạn tiết mai: lớp 6, 38 em, 45 phút, không có máy chiếu. Bạn nhờ AI \"soạn giáo án bài phân số\". Kết quả có vẻ đầy đủ. Điều gì nên làm trước khi in?",
    openingOptions: [
      "Cộng số phút từng bước và đối chiếu với đồ dùng lớp bạn có",
      "Đọc lại giọng văn cho đúng kiểu giáo án nộp tổ",
      "Nhờ AI viết dài hơn để giáo án trông đầy đặn và kỹ lưỡng hơn",
      "In luôn, vì AI đã đọc rất nhiều giáo án của các giáo viên khác",
    ],
    correctOption: 0,
    explanation:
      "AI không biết lớp bạn có 38 em, không có máy chiếu và chỉ có 45 phút. Nó viết một giáo án nghe hợp lý cho một lớp trung bình trong tưởng tượng, nên hay gặp hai lỗi: các bước cộng lại vượt quá thời lượng, và có hoạt động cần thiết bị mà lớp không có. Giọng văn hay độ dài thì nhìn là thấy và sửa được ngay; còn tổng số phút và đồ dùng chỉ lộ ra khi bạn đứng trên lớp, lúc đó đã muộn.",
    diagram: [
      { label: "Bạn viết mục tiêu, thời lượng, sĩ số, đồ dùng", arrow: true },
      { label: "AI đề xuất ba phương án chia bước", arrow: true },
      { label: "Bạn cộng giờ và đối chiếu lớp thật", arrow: true },
      { label: "Chọn một phương án, sửa rồi dạy" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Cô Hà dạy Toán lớp 6, 38 em, chỉ có bảng và giấy nháp. Cô đưa AI mục tiêu \"cuối tiết, em tự quy đồng hai phân số có mẫu khác nhau\", kèm 45 phút và sĩ số, rồi xin ba phương án. Một phương án cộng ra 55 phút và cần máy chiếu; cô loại nó, chọn phương án còn lại và tự thêm một ví dụ lấy từ cuộc thi cắt bánh của lớp hôm trước.",
    },
    quiz: [
      qz(
        "Nên đưa cho AI điều gì trước khi nhờ đề xuất các bước của một tiết học?",
        "Mục tiêu đo được của tiết, thời lượng, sĩ số và đồ dùng sẵn có",
        [
          "Chỉ tên bài trong sách giáo khoa, còn lại AI tự biết lớp bạn",
          "Danh sách cả lớp kèm điểm từng em để AI hiểu học sinh hơn",
          "Một câu ngắn \"soạn giúp giáo án\" để AI tự quyết định hết",
        ],
        "Mục tiêu, thời lượng, sĩ số và đồ dùng là những dữ kiện AI không thể đoán. Chỉ đưa tên bài thì nó soạn cho một lớp tưởng tượng. Danh sách kèm điểm là dữ liệu học sinh không cần thiết cho việc này và không nên đưa vào công cụ nhà trường chưa cho phép. Câu ngắn quá thì AI tự lấp chỗ trống bằng điều nó đoán.",
      ),
      qz(
        "Vì sao nên xin ba phương án thay vì một giáo án hoàn chỉnh?",
        "Có cái để so và chọn theo lớp mình",
        [
          "AI sẽ tự chọn phương án đúng nhất cho lớp của bạn",
          "Ba phương án đều đã cộng đủ 45 phút, không phải kiểm lại",
          "Bạn đỡ phải đọc kỹ vì phương án nào cũng dùng ngay được",
        ],
        "Người chọn phương án phù hợp là bạn, vì chỉ bạn biết lớp. AI không biết phương án nào đúng nhất cho lớp đó. Việc cộng số phút vẫn là của bạn: AI có thể chia sai. Và phương án nào cũng cần đọc, vì mỗi phương án có thể chứa một hoạt động lớp bạn không làm được.",
      ),
      qz(
        "AI đề xuất các bước 10 + 15 + 20 + 10 phút cho tiết 45 phút. Bạn nên làm gì?",
        "Cộng ra 55 phút, nên nhờ rút bớt hoặc bỏ một bước",
        [
          "Giữ nguyên: 10 + 15 + 20 = 45 (thiếu bước cuối)",
          "Cứ dạy theo, phần dư bù vào tiết sau",
          "Tin AI vì nó chia đúng thời lượng bạn đã nêu",
        ],
        "10 + 15 + 20 + 10 = 55 phút, dư 10 phút. Cộng thiếu một bước là lỗi rất hay gặp khi đọc lướt. Dạy theo rồi bù tiết sau làm dồn việc và bỏ mất phần luyện tập cuối tiết. AI không đảm bảo con số cộng lại khớp, kể cả khi bạn đã nêu rõ thời lượng.",
      ),
      qz(
        "Chỗ nào AI dễ gợi ý sai nhất khi soạn giáo án cho lớp của bạn?",
        "Thiết bị và đồ dùng mà lớp bạn thực sự có",
        [
          "Các phần chung của một tiết học như khởi động, luyện tập, tổng kết",
          "Cách chia thời gian theo tỷ lệ cho từng phần",
          "Cách viết mục tiêu nghe cho trang trọng",
        ],
        "Các phần chung của tiết học là kiến thức phổ biến AI nắm khá tốt. Còn thiết bị lớp bạn có thì nó không thấy, nên dễ gợi ý video hay máy chiếu. Chia tỷ lệ thời gian và diễn đạt mục tiêu là việc chữ và số đơn giản, bạn kiểm được ngay bằng mắt.",
      ),
      qz(
        "Sau khi dạy xong theo giáo án AI đề xuất, ghi lại điều gì giúp lần soạn sau tốt hơn?",
        "Bước nào thừa giờ, bước nào thiếu giờ ở lớp thật",
        [
          "Phương án AI viết dài nhất để lần sau dùng lại cho nhanh",
          "Số trang giáo án đã in ra để lưu hồ sơ",
          "Cảm nhận chung của bạn về công cụ AI hôm đó",
        ],
        "Ghi bước thừa hoặc thiếu giờ giúp lần sau bạn đưa cho AI đúng giới hạn thật hơn. Độ dài của phương án không nói lên chất lượng. Số trang in ra và cảm nhận chung chung không đổi được điều gì trong lần soạn kế tiếp.",
      ),
    ],
    keyTakeaways: [
      "Đưa AI bốn thứ nó không đoán được: mục tiêu đo được, thời lượng, sĩ số, đồ dùng.",
      "Xin ba phương án để so sánh; người chọn là bạn, vì chỉ bạn biết lớp.",
      "Luôn cộng lại số phút các bước, AI có thể chia sai.",
      "Đối chiếu từng hoạt động với đồ dùng lớp thật trước khi in.",
    ],
    practicePrompt: {
      question:
        "Mục tiêu nào dưới đây đủ rõ để đưa cho AI soạn tiết học?",
      options: [
        "Cuối tiết, em tự làm được 3 bài quy đồng hai phân số",
        "Học sinh hiểu và yêu thích bài phân số hơn trước đây",
        "Dạy hết phần lý thuyết trong sách ở trang 30 đến 34",
        "Bài giảng hấp dẫn, sinh động, phù hợp với mọi đối tượng",
      ],
      correct: 0,
      explanation:
        "Mục tiêu tốt nói học sinh làm được gì và bạn nhìn thấy được. \"Hiểu và yêu thích\" không đo được. \"Dạy hết phần lý thuyết\" là việc của người dạy chứ không phải kết quả của người học. \"Hấp dẫn, sinh động\" là mong muốn, AI sẽ viết tuỳ ý.",
    },
    summary: {
      keyIdea: "AI đề xuất cách chia tiết; bạn cho nó biết lớp và bạn quyết định chọn cái nào.",
      formula: "Mục tiêu đo được + thời lượng + sĩ số + đồ dùng → ba phương án → bạn cộng giờ, chọn, sửa.",
      commonMistake: "In nguyên giáo án AI viết mà không cộng số phút và không đối chiếu đồ dùng của lớp.",
      action: "Tối nay viết một mục tiêu bắt đầu bằng \"Cuối tiết, học sinh tự làm được...\" cho tiết mai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tiết bạn sắp dạy. Viết một câu mục tiêu bắt đầu bằng \"Cuối tiết, học sinh tự làm được...\", ghi thêm thời lượng, sĩ số và đồ dùng có trong lớp, rồi nhờ AI đề xuất ba phương án chia bước. Cộng số phút từng phương án và gạch tên phương án cần đồ dùng lớp không có.",
      secondary: "Ngày mai sau tiết, ghi một dòng: bước nào thừa giờ, bước nào thiếu giờ.",
    },
    sections: [
      {
        type: "lead",
        text: "Tối nay bạn phải soạn tiết mai, và bạn chưa biết bắt đầu từ đâu. Bài này chỉ một việc: biến một câu mục tiêu thành ba phương án chia tiết mà bạn chọn được trong vài phút.",
      },
      {
        type: "feynman",
        title: "Nhờ AI chia tiết học đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một người bạn hay đi ăn nhiều nơi gợi ý thực đơn cho bữa tiệc. Bạn ấy biết rất nhiều món, nhưng chưa từng gặp khách của bạn.",
        columns: ["Việc", "Bạn nhờ người bạn gợi ý thực đơn", "Bạn nhờ AI chia tiết học"],
        rows: [
          ["Bạn phải nói trước", "Bao nhiêu khách, ngân sách, ai ăn chay", "Mục tiêu, sĩ số, thời lượng, đồ dùng"],
          ["Người kia làm tốt", "Gợi ý nhiều món và thứ tự lên món", "Đề xuất nhiều cách chia bước và hoạt động"],
          ["Người kia không biết", "Khách của bạn dị ứng món gì", "Lớp bạn có máy chiếu hay không, em nào yếu"],
          ["Bạn phải kiểm", "Món có nấu kịp trong bếp nhà bạn không", "Các bước có cộng đủ 45 phút, có làm được ở lớp không"],
        ],
        oneLiner: "AI gợi ý nhiều cách chia tiết; bạn nói rõ lớp mình và bạn chọn.",
      },
      { type: "heading", text: "Một mục tiêu tốt nói học sinh làm được gì" },
      {
        type: "paragraph",
        text: "Hãy so hai câu: \"Dạy bài phân số\" và \"Cuối tiết, học sinh tự làm được ba bài quy đồng hai phân số có mẫu khác nhau\". Câu thứ nhất nói việc của bạn, câu thứ hai nói kết quả của em. Chỉ câu thứ hai cho AI biết tiết học cần dẫn tới đâu, và cho bạn biết cuối tiết đã đạt hay chưa. Thuật ngữ mới duy nhất ở đây là mục tiêu đo được: mục tiêu mà bạn nhìn vào bài làm của em là biết đạt hay chưa.",
      },
      {
        type: "comparison",
        left: {
          label: "Đưa AI câu mơ hồ",
          text: "\"Soạn giáo án bài phân số cho lớp 6.\" AI tự chọn độ khó, tự giả định có máy chiếu, tự chia thời gian. Kết quả nghe đầy đủ nhưng là giáo án của một lớp tưởng tượng.",
        },
        right: {
          label: "Đưa AI bốn dữ kiện",
          text: "\"Mục tiêu: cuối tiết em tự quy đồng hai phân số. 45 phút, 38 em, chỉ có bảng và giấy nháp. Đề xuất 3 phương án, mỗi bước ghi số phút.\" AI viết trong khung bạn đã vẽ.",
        },
      },
      { type: "heading", text: "Từng bước từ mục tiêu đến phương án" },
      {
        type: "flow",
        title: "Từ một câu mục tiêu đến tiết học đã chọn",
        steps: [
          { label: "Viết mục tiêu", detail: "Một câu bắt đầu bằng \"Cuối tiết, học sinh tự làm được...\". Nếu bạn không nhìn thấy được kết quả, viết lại." },
          { label: "Nêu giới hạn của lớp", detail: "Thời lượng, sĩ số, thiết bị có trong lớp, và điều lớp đã học trước đó. Đây là những thứ AI không thể đoán." },
          { label: "Xin ba phương án", detail: "Yêu cầu mỗi phương án chia thành bước có số phút, để bạn so sánh và loại bỏ nhanh." },
          { label: "Cộng giờ và đối chiếu", detail: "Tự cộng số phút, gạch bước cần đồ dùng không có. AI có thể chia sai hoặc quên giới hạn bạn đã nêu." },
          { label: "Chọn, sửa, dạy, ghi lại", detail: "Chọn một phương án, thêm ví dụ của riêng lớp bạn, dạy xong ghi bước nào thừa giờ hoặc thiếu giờ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu lệnh nhờ AI chia tiết phân số",
        task: "Bạn dạy Toán lớp 6, 38 em, 45 phút, chỉ có bảng và giấy nháp. Chọn từng phần của câu lệnh để AI đề xuất phương án dùng được.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Dạy bài phân số cho hay và dễ hiểu.", feedback: "\"Hay và dễ hiểu\" không đo được. AI tự chọn dạy tới đâu và bạn không biết cuối tiết đã đạt chưa." },
              { text: "Cuối tiết, em tự quy đồng được hai phân số có mẫu khác nhau ở ba bài tập.", good: true, feedback: "Nói rõ học sinh làm được gì. AI biết tiết cần dẫn tới bài luyện cuối, và bạn kiểm được ngay." },
            ],
          },
          {
            id: "limits",
            label: "Giới hạn của lớp",
            options: [
              { text: "Lớp 6, 38 em, 45 phút, chỉ có bảng và giấy nháp, không máy chiếu.", good: true, feedback: "AI sẽ không gợi ý video hay trò chơi cần màn hình, và chia thời gian đúng 45 phút." },
              { text: "Lớp học bình thường như các lớp khác.", feedback: "AI tự giả định lớp có máy chiếu và ít em, rồi gợi ý hoạt động lớp bạn không làm được." },
            ],
          },
          {
            id: "ask",
            label: "Điều cần AI làm",
            options: [
              { text: "Đề xuất 3 phương án khác nhau, mỗi bước ghi số phút, tổng đúng 45 phút.", good: true, feedback: "Có ba lựa chọn để so, và số phút ghi rõ để bạn cộng lại kiểm." },
              { text: "Soạn luôn giáo án đầy đủ chi tiết, tôi in ra dạy.", feedback: "Bạn chỉ nhận một bản để tin hoặc bỏ, không có lựa chọn, và nhiều khả năng còn lỗi thời gian." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "limits", "ask"],
            text: "Phương án A (45 phút): Khởi động chia bánh 5 phút; ví dụ mẫu trên bảng 10 phút; làm cặp bài 1 và 2 trên giấy nháp 15 phút; bài 3 tự làm 10 phút; chữa và chốt cách tìm mẫu chung 5 phút.\nPhương án B (45 phút): Bắt đầu bằng một bài sai sẵn để cả lớp tìm lỗi 10 phút; hướng dẫn cách đúng 10 phút; luyện tập theo nhóm bốn 15 phút; tự làm bài cuối 10 phút.\nPhương án C (45 phút): Học sinh tự thử 8 phút trước, rồi giáo viên giảng lại chỗ vướng 12 phút; luyện tập 15 phút; kiểm tra nhanh 10 phút.",
          },
          {
            requires: ["goal"],
            text: "Giáo án bài Phân số (lớp 6): Ổn định, khởi động, giảng bài mới, luyện tập, củng cố, dặn dò.\nHoạt động 2: cho học sinh xem video minh hoạ trên máy chiếu (12 phút).\n(Có mục tiêu nhưng không có giới hạn lớp: AI tự xếp video và không ghi số phút cho các bước còn lại.)",
          },
          {
            text: "Giáo án bài Phân số: Giúp học sinh yêu thích Toán học, phát huy tối đa năng lực. Cho học sinh chơi trò chơi trên máy tính bảng, xem video 15 phút, làm bài kiểm tra trực tuyến.\n(Không có mục tiêu hay giới hạn: AI bịa thiết bị lớp không có và không đo được điều gì.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Cộng lại, luôn luôn",
        text: "AI viết ra con số nghe rất hợp lý, kể cả khi bốn bước cộng lại thành 55 phút thay vì 45. Hãy tự cộng số phút của mỗi phương án và đối chiếu từng hoạt động với đồ dùng có trong lớp. Đừng đưa vào công cụ AI tên hay điểm của từng học sinh khi nhà trường chưa cho phép.",
      },
      {
        type: "scenario",
        title: "Ba phương án đã có, bạn chọn thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "Mười giờ tối. AI vừa đưa ba phương án cho tiết phân số. Phương án 1 trông kỹ nhất, nhưng bạn thấy có ghi \"cho xem video\". Bạn làm gì?",
            choices: [
              { label: "Chép nguyên phương án 1 vào giáo án, đi ngủ", next: "bad1" },
              { label: "Cộng số phút từng bước và đối chiếu với đồ dùng có trong lớp", next: "s2" },
            ],
          },
          bad1: {
            text: "Sáng hôm sau, lớp không có máy chiếu, bạn mất 8 phút xoay xở. Các bước còn lại cộng lại thành 52 phút, nên phần luyện tập cuối tiết bị bỏ. Cuối tiết, nhiều em chưa tự làm được bài nào.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy phương án 1 dài 52 phút và cần máy chiếu. Phương án 2 dài 45 phút, chỉ cần bảng và giấy nháp. Bạn muốn giữ ý hay nhất của phương án 1: bài sai sẵn để cả lớp tìm lỗi.",
            choices: [
              { label: "Chọn phương án 2 và nhờ AI thêm hoạt động bài sai sẵn vào, giữ tổng 45 phút", next: "good1" },
              { label: "Giữ phương án 1, cắt bớt phần luyện tập cuối cho vừa giờ", next: "bad2" },
            ],
          },
          good1: {
            text: "AI trả về bản có bài sai sẵn ở 8 phút đầu, các bước sau bớt mỗi bước một ít. Bạn cộng lại đúng 45 phút. Ngày mai bạn dạy theo, và cuối tiết đa số em tự làm được bài luyện cuối.",
            ending: "good",
          },
          bad2: {
            text: "Bạn cắt phần luyện tập cuối cho vừa giờ. Học sinh nghe giảng đủ nhưng không được tự làm, nên cuối tiết mục tiêu \"tự làm được ba bài\" không đạt.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết mục tiêu bằng việc học sinh làm được.",
          "Bước 2 - Nêu thời lượng, sĩ số, đồ dùng.",
          "Bước 3 - Xin ba phương án có số phút.",
          "Bước 4 - Cộng giờ, gạch hoạt động lớp không làm được, chọn một.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI nghĩ ra nhiều cách chia tiết trong vài giây, nhưng nó chưa từng bước vào lớp của bạn.",
          "Bạn đưa lớp thật cho nó, và bạn là người chọn.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 2 ─────────────────────────
  {
    id: 2021,
    slug: "vi-du-doi-thuong-cho-khai-niem-kho",
    title: "Chặng 31, Bài 2: Tìm ví dụ đời thường cho khái niệm học sinh hay quên",
    subtitle: "Năm ví dụ AI đưa ra, một ví dụ đúng tuổi: bạn là người lọc.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🍕",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi cả lớp ngơ ra trước một khái niệm, thứ thiếu thường không phải lời giảng mà là một hình ảnh quen thuộc. AI nghĩ ra ví dụ rất nhanh, nhưng ví dụ nào hợp tuổi và đúng bản chất khái niệm thì chỉ bạn quyết định được.",
    openingQuestion:
      "Cả lớp 5 không hiểu vì sao phải quy đồng mẫu số. Bạn nhờ AI \"cho ví dụ đời thường\" và nhận về năm ví dụ. Điều gì nên làm trước khi mang vào lớp?",
    openingOptions: [
      "Kiểm từng ví dụ có đúng bản chất và học sinh lứa tuổi này tự hình dung được không",
      "Chọn ví dụ nghe vui nhất, vì học sinh nhớ lâu những gì làm các em cười",
      "Dùng cả năm ví dụ trong một tiết để học sinh có nhiều cách hiểu hơn",
      "Chọn ví dụ có nhiều con số nhất để học sinh có thêm bài để luyện tập",
    ],
    correctOption: 0,
    explanation:
      "AI viết ví dụ nghe trôi chảy, nhưng có thể sai bản chất (ví dụ trông giống mà không đúng khái niệm) hoặc quá tầm tuổi (lãi suất, cổ phiếu cho em lớp 5). Một ví dụ sai bản chất còn tệ hơn không có ví dụ, vì học sinh nhớ rất chắc cái sai. Vui, nhiều hay nhiều số đều không nói ví dụ có đúng và có hợp tuổi hay không; chỉ bước kiểm của bạn nói được điều đó.",
    diagram: [
      { label: "Nêu khái niệm và tuổi học sinh", arrow: true },
      { label: "AI đưa năm ví dụ", arrow: true },
      { label: "Bạn kiểm: đúng bản chất, hợp tuổi, tự làm được", arrow: true },
      { label: "Mang một ví dụ vào lớp và hỏi lại học sinh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Thầy Sơn dạy Toán lớp 5, cần một ví dụ cho việc quy đồng mẫu số. AI đưa năm ví dụ, trong đó có chia bánh giữa hai khay cắt khác nhau và so sánh lãi suất hai khoản tiết kiệm. Thầy bỏ ví dụ lãi suất vì học sinh chưa quen, chọn chia bánh (một khay cắt 2, một khay cắt 3, cùng cắt lại thành 6 phần), rồi để học sinh tự cắt giấy trong lớp.",
    },
    quiz: [
      qz(
        "Khi nhờ AI tìm ví dụ đời thường, nên nêu thêm điều gì ngoài tên khái niệm?",
        "Tuổi học sinh và điều các em đã biết trước đó",
        [
          "Càng nhiều ví dụ càng tốt, ít nhất là mười",
          "Yêu cầu AI chọn ví dụ hay nhất giúp bạn để đỡ mất công",
          "Một đề nghị viết ví dụ thật cảm động để học sinh nhớ lâu",
        ],
        "Tuổi và kiến thức nền quyết định ví dụ nào các em hình dung được. Xin thật nhiều ví dụ chỉ thêm việc lọc. AI không biết ví dụ nào hợp lớp bạn nhất nên đừng giao việc chọn cho nó. Cảm động không giúp hiểu khái niệm, còn dễ làm lệch bản chất.",
      ),
      qz(
        "Ví dụ nào cho khái niệm \"quy đồng mẫu số\" đúng bản chất và hợp học sinh lớp 5?",
        "Cắt lại hai khay bánh chia khác nhau thành các phần bằng nhau",
        [
          "Tính lãi suất hai khoản tiết kiệm có kỳ hạn khác nhau",
          "So sánh hai chiếc bánh cùng cắt thành 8 phần nhưng lấy ba phần một chiếc",
          "Đếm số bạn nam và số bạn nữ trong lớp rồi viết thành phân số",
        ],
        "Quy đồng là đưa các phân số về cùng loại phần bằng nhau để so hoặc cộng. Cắt lại khay bánh đúng ý đó và các em tự làm được. Lãi suất quá tầm tuổi. Hai bánh cùng cắt 8 phần đã cùng mẫu, không cần quy đồng. Đếm nam nữ chỉ là viết phân số, chưa có mẫu khác nhau.",
      ),
      qz(
        "AI đưa ví dụ \"1/2 + 1/3 = 2/5 vì cộng tử với tử, mẫu với mẫu\" để minh hoạ. Nên xử lý thế nào?",
        "Loại ngay vì kết quả sai bản chất, đúng phải là 5/6",
        [
          "Giữ lại vì các em dễ nhớ quy tắc cộng tử với tử, mẫu với mẫu",
          "Giữ lại nhưng ghi chú kết quả gần đúng để các em tự sửa sau",
          "Nhờ AI viết lại phần giải thích cho nghe thuyết phục hơn nữa",
        ],
        "1/2 + 1/3 = 3/6 + 2/6 = 5/6, không phải 2/5 (2/5 nhỏ hơn cả 1/2). Đây chính là lỗi mà bài học về quy đồng nhằm tránh. Ví dụ dễ nhớ nhưng sai thì học sinh nhớ chắc điều sai. Gần đúng không tồn tại ở đây, và viết lại cho thuyết phục chỉ làm cái sai nghe đúng hơn.",
      ),
      qz(
        "Cách nhanh nhất để thử một ví dụ AI đưa có hợp lớp hay không là gì?",
        "Tự làm thử bằng tay theo ví dụ đó trong hai phút",
        [
          "Hỏi lại AI \"ví dụ này có đúng không\" và tin theo câu trả lời",
          "Đếm xem ví dụ có bao nhiêu chữ để chắc chắn không quá dài",
          "Đọc to ví dụ lên xem nghe có hay và dễ nhớ không",
        ],
        "Tự làm bằng tay lộ ngay chỗ sai và chỗ khó với học sinh. Hỏi lại AI không phải kiểm chứng vì nó có thể xác nhận cái nó vừa viết. Độ dài chữ và độ hay khi đọc không nói ví dụ có dạy đúng khái niệm hay không.",
      ),
      qz(
        "Sau khi chọn được một ví dụ, việc nào giúp bạn biết ví dụ có thực sự hiệu quả?",
        "Hỏi vài em giải thích lại bằng lời của mình",
        [
          "Dùng ví dụ đó cho mọi khái niệm khó khác",
          "Hỏi xem em nào không thích ví dụ này",
          "Đếm số em cười hoặc gật đầu lúc giảng",
        ],
        "Nghe học sinh nói lại bằng lời mình cho thấy các em hiểu hay chỉ nhớ hình ảnh. Dùng lại một ví dụ cho mọi khái niệm sẽ làm nó lệch bản chất ở chỗ khác. Thích hay không thích, cười hay gật đầu chưa nói điều gì về việc hiểu.",
      ),
    ],
    keyTakeaways: [
      "Nêu khái niệm, tuổi học sinh và điều các em đã biết khi nhờ AI tìm ví dụ.",
      "Một ví dụ tốt phải đúng bản chất khái niệm và học sinh tự làm hay tự hình dung được.",
      "Tự làm thử ví dụ bằng tay hai phút trước khi mang vào lớp.",
      "Hỏi học sinh nói lại bằng lời mình để biết ví dụ có tác dụng.",
    ],
    practicePrompt: {
      question:
        "Một ví dụ AI đưa nghe rất hay nhưng bạn không chắc nó đúng bản chất khái niệm. Việc hợp lý nhất là gì?",
      options: [
        "Tự làm thử bằng tay, và nếu lệch thì bỏ hoặc sửa",
        "Dùng luôn, vì AI đã đọc nhiều sách giáo khoa hơn bạn",
        "Hỏi AI xem có chắc không rồi dùng nếu nó trả lời chắc",
        "Chỉ dùng khi ví dụ đó ngắn hơn hai câu để dễ nhớ",
      ],
      correct: 0,
      explanation:
        "Tự làm thử là cách kiểm độc lập duy nhất trong bốn cách. AI đọc nhiều không đồng nghĩa ví dụ nào cũng đúng. Hỏi lại AI chỉ cho một câu trả lời tự tin khác. Độ ngắn không liên quan tới độ đúng.",
    },
    summary: {
      keyIdea: "AI đưa ví dụ nhanh; bạn lọc theo đúng bản chất, đúng tuổi, và tự làm được.",
      formula: "Khái niệm + tuổi + kiến thức nền → năm ví dụ → bạn thử bằng tay → một ví dụ vào lớp.",
      commonMistake: "Dùng ví dụ nghe vui hoặc dễ nhớ mà chưa kiểm xem nó có sai bản chất không.",
      action: "Chọn một khái niệm lớp hay quên và xin AI năm ví dụ hợp tuổi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một khái niệm mà lớp bạn hay quên. Nhờ AI đưa năm ví dụ đời thường, nói rõ tuổi học sinh và điều các em đã học. Tự làm thử từng ví dụ hai phút, gạch ví dụ sai bản chất hoặc quá tầm tuổi, và giữ lại một ví dụ để mang vào lớp.",
      secondary: "Sau khi dùng trong lớp, hỏi hai em nói lại khái niệm bằng lời mình và ghi lại các em nói gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa giảng lần thứ hai và cả lớp vẫn nhìn bạn như nhìn một bức tường. Lúc này thứ lớp cần là một hình ảnh quen thuộc. Bài này dạy cách nhờ AI nghĩ ví dụ, và cách lọc để chỉ mang vào lớp cái đúng.",
      },
      {
        type: "feynman",
        title: "Tìm ví dụ với AI đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn hỏi một người bạn hay đi chợ: \"Có gì để cả nhà hình dung 'chia đều' không?\". Bạn ấy đưa ra nhiều thứ ngay, nhưng một số thứ chỉ hợp với nhà bạn ấy.",
        columns: ["Việc", "Hỏi bạn hay đi chợ", "Hỏi AI"],
        rows: [
          ["Nhanh ở chỗ", "Nhớ ra nhiều chuyện đi chợ trong vài giây", "Viết ra nhiều ví dụ trong vài giây"],
          ["Không biết", "Nhà bạn có trẻ nhỏ hay không", "Học sinh lớp bạn bao nhiêu tuổi, đã học gì"],
          ["Dễ nhầm", "Một chuyện nghe giống mà không đúng ý", "Một ví dụ nghe giống mà sai bản chất khái niệm"],
          ["Bạn phải kiểm", "Thử xem cả nhà có hiểu không", "Tự làm thử bằng tay, rồi hỏi học sinh nói lại"],
        ],
        oneLiner: "AI cho nhiều ví dụ; bạn chọn cái đúng bản chất và hợp tuổi.",
      },
      { type: "heading", text: "Ví dụ tốt đúng ở hai chỗ" },
      {
        type: "paragraph",
        text: "Một ví dụ dùng được phải đúng bản chất: làm theo nó ra đúng khái niệm, không chỉ giống bề ngoài. Nó cũng phải hợp tuổi: học sinh tự hình dung hoặc tự làm bằng đồ trong lớp. Hai chữ đúng bản chất và hợp tuổi là hai câu hỏi bạn dùng để lọc mọi ví dụ AI đưa.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI tìm ví dụ cho khái niệm quy đồng mẫu số",
        task: "Bạn dạy lớp 5 (10 tuổi). Các em đã biết phân số có cùng mẫu số, chưa biết quy đồng. Lắp câu lệnh để AI đưa năm ví dụ dùng được.",
        parts: [
          {
            id: "who",
            label: "Học sinh là ai",
            options: [
              { text: "Học sinh của tôi.", feedback: "AI không biết tuổi hay điều các em đã học, nên trộn cả ví dụ cho người lớn vào." },
              { text: "Lớp 5, 10 tuổi, đã biết cộng hai phân số cùng mẫu, chưa biết quy đồng.", good: true, feedback: "AI biết ví dụ phải dùng phần bằng nhau và đồ vật quen thuộc, tránh khái niệm các em chưa gặp." },
            ],
          },
          {
            id: "ask",
            label: "Điều cần AI làm",
            options: [
              { text: "Đưa 5 ví dụ khác nhau, mỗi ví dụ một hai câu, và nói học sinh có thể tự làm gì bằng đồ trong lớp.", good: true, feedback: "Ví dụ ngắn, có hành động các em làm được. Bạn lọc nhanh và thử được bằng tay." },
              { text: "Cho tôi ví dụ hay nhất về quy đồng.", feedback: "AI chọn theo ý nó, chỉ một ví dụ, và bạn không có gì để so sánh hay loại bỏ." },
            ],
          },
          {
            id: "limit",
            label: "Điều cần tránh",
            options: [
              { text: "Không cần dặn thêm, AI tự biết.", feedback: "AI dễ chọn ví dụ tiền, lãi suất hay cổ phiếu vì nghe thuyết phục, dù học sinh 10 tuổi chưa biết." },
              { text: "Chỉ dùng đồ có trong lớp hoặc ở nhà; tránh tiền, lãi suất và thứ trẻ 10 tuổi chưa gặp.", good: true, feedback: "Chặn từ đầu các ví dụ quá tầm tuổi, bạn đỡ phải loại về sau." },
            ],
          },
        ],
        responses: [
          {
            requires: ["who", "ask", "limit"],
            text: "1) Chia bánh: một khay cắt làm 2, một khay cắt làm 3; muốn so hai miếng thì cắt lại cả hai thành 6 phần. Các em tự cắt giấy.\n2) Thước dây: đoạn 1/2 m và 1/3 m; đánh dấu thêm vạch để đo cùng đơn vị 1/6 m.\n3) Giấy kẻ ô: tô 1/2 và 1/3 của cùng một hình chữ nhật 6 ô.\n4) Chia kẹo: hộp 2 ngăn và hộp 3 ngăn, gộp lại thành 6 ngăn nhỏ.\n5) Xếp hàng: chia lớp thành 2 hàng rồi thành 3 hàng, tìm số nhóm chung.",
          },
          {
            requires: ["who"],
            text: "1) Chia bánh giữa các bạn.\n2) Tính lãi suất hai khoản tiết kiệm khác kỳ hạn.\n3) So sánh phần trăm đạt của hai đội bóng.\n4) Đọc bản đồ có tỷ lệ khác nhau.\n5) Chia điểm thi.\n(Có nhắc tuổi nhưng thiếu điều cần làm và điều cần tránh: nhiều ví dụ quá tầm 10 tuổi.)",
          },
          {
            text: "Quy đồng mẫu số giống như quy đổi ngoại tệ khi đi du lịch, hoặc chuyển đổi đơn vị đo trong vật lý. Ví dụ: 1/2 + 1/3 = 2/5.\n(AI không biết tuổi hay yêu cầu nên chọn ví dụ trừu tượng và còn viết sai một phép tính.)",
          },
        ],
      },
      { type: "heading", text: "Kiểm từng ví dụ trước khi mang vào lớp" },
      {
        type: "flow",
        title: "Bốn câu hỏi lọc một ví dụ",
        steps: [
          { label: "Đúng bản chất không?", detail: "Làm theo ví dụ, kết quả có đúng khái niệm không? Ví dụ \"cộng tử với tử, mẫu với mẫu\" trông đơn giản nhưng cho kết quả sai." },
          { label: "Hợp tuổi không?", detail: "Học sinh của bạn có biết những thứ trong ví dụ không? Lãi suất hay cổ phiếu thường quá tầm em nhỏ." },
          { label: "Tự làm được không?", detail: "Các em có thể cắt, xếp, tô hay đo bằng đồ trong lớp không? Ví dụ làm được bằng tay thì nhớ lâu hơn." },
          { label: "Nói lại được không?", detail: "Sau khi dùng, hỏi vài em giải thích lại bằng lời của mình. Nếu các em chỉ nhắc lại hình ảnh, ví dụ chưa đủ." },
        ],
      },
      {
        type: "callout",
        label: "Nghe hợp lý chưa chắc đúng",
        text: "AI viết ví dụ với cùng một giọng tự tin dù đúng hay sai. Bạn nên tự làm thử một ví dụ trước khi dùng, nhất là ví dụ có phép tính.",
      },
      {
        type: "scenario",
        title: "Năm ví dụ trên bàn, bạn chọn thế nào?",
        start: "s1",
        nodes: {
          s1: {
            text: "AI vừa đưa năm ví dụ về quy đồng. Ví dụ đầu tiên dùng lãi suất hai khoản tiết kiệm và đọc rất thuyết phục. Bạn chỉ còn 15 phút chuẩn bị.",
            choices: [
              { label: "Dùng luôn ví dụ đầu tiên vì nó thuyết phục nhất", next: "bad1" },
              { label: "Tự thử nhanh từng ví dụ bằng câu hỏi: em có tự làm bằng tay được không?", next: "s2" },
            ],
          },
          bad1: {
            text: "Em lớp 5 chưa biết lãi suất là gì. Cả lớp im lặng, bạn phải giảng thêm hai khái niệm mới chỉ để hiểu ví dụ. Khái niệm quy đồng gần như chưa được chạm tới.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi thử, hai ví dụ qua được: chia bánh hai khay và thước dây. Cả hai đều đúng bản chất và làm được bằng giấy hoặc dây trong lớp.",
            choices: [
              { label: "Mang chia bánh vào lớp, để học sinh tự cắt giấy rồi mời vài em nói lại", next: "good1" },
              { label: "Chọn ví dụ ít phải chuẩn bị nhất, rồi cứ giảng như thường", next: "bad2" },
            ],
          },
          good1: {
            text: "Các em cắt giấy, thấy hai miếng khác nhau muốn so được thì phải cắt cùng cỡ. Ba em nói lại bằng lời của mình. Bạn biết ví dụ có tác dụng và giữ lại cho năm sau.",
            ending: "good",
          },
          bad2: {
            text: "Bạn chọn ví dụ vì đỡ chuẩn bị mà không để học sinh làm. Các em nghe kể, gật đầu, nhưng vào bài tập vẫn cộng tử với tử, mẫu với mẫu.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI giỏi nghĩ ra nhiều ví dụ; bạn giỏi biết lớp mình.",
          "Ghép hai thứ đó: nhờ AI nghĩ, tự tay thử, và chỉ mang vào lớp cái đúng.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 3 ─────────────────────────
  {
    id: 2022,
    slug: "bat-loi-kien-thuc-trong-bai-giang-ai-viet",
    title: "Chặng 31, Bài 3: Bắt lỗi kiến thức trong bài giảng do AI viết",
    subtitle: "Bản giải thích trôi chảy, tự tin - và sai một công thức. Bạn đối chiếu sách trước khi phát.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một công thức sai trong tờ phát tay sẽ đến với cả lớp, và các em chép nó vào vở như chân lý. AI viết bài giảng rất nhanh, nhưng nó sai với cùng giọng tự tin như khi đúng. Bài này cho bạn một thói quen mười phút để bắt lỗi trước khi phát.",
    openingQuestion:
      "AI viết cho bạn một bản giải thích diện tích hình tròn, dài một trang, văn rất mạch lạc. Trong bản có một công thức và một câu \"theo sách giáo khoa trang 87\". Thứ gì nên đối chiếu với sách trước tiên?",
    openingOptions: [
      "Công thức, ví dụ tính và câu dẫn nguồn",
      "Giọng văn, để phù hợp với học sinh lớp bạn",
      "Số dòng của bản giải thích cho vừa một trang",
      "Tên hình vẽ AI đề xuất kèm theo, cùng chú thích",
    ],
    correctOption: 0,
    explanation:
      "Lỗi của AI nằm ở những chỗ có thể sai mà nghe vẫn đúng: công thức, phép tính ví dụ, số liệu và nguồn dẫn. Trang 87 có thể không tồn tại hoặc không nói điều đó, vì AI tạo ra nguồn nghe hợp lý khi không có nguồn thật. Giọng văn, số dòng, tên hình vẽ là những thứ bạn nhìn là thấy và sửa được, không làm học sinh học sai kiến thức.",
    diagram: [
      { label: "AI viết bản giải thích", arrow: true },
      { label: "Bạn gạch công thức, số, nguồn dẫn", arrow: true },
      { label: "Đối chiếu sách giáo khoa và tự giải lại ví dụ", arrow: true },
      { label: "Sửa hoặc bỏ chỗ sai, rồi mới phát" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Cô Mai nhờ AI viết bản giải thích diện tích hình tròn cho lớp 9. Trong bản có dòng S = 2πr² kèm ví dụ bán kính 3 cm ra 18π cm². Cô so với sách giáo khoa và thấy công thức đúng là S = πr², ví dụ đúng phải là 9π cm². Cô sửa bản, rồi ghi lại thói quen: mọi công thức AI viết đều đối chiếu sách trước khi phát.",
    },
    quiz: [
      qz(
        "Trong bản giải thích do AI viết, những chỗ nào cần đối chiếu sách trước tiên?",
        "Công thức, phép tính ví dụ, số liệu và nguồn dẫn",
        [
          "Cách xưng hô và giọng điệu chung của bài",
          "Độ dài của các đoạn văn và cách chia tiêu đề",
          "Từ nối giữa câu và cách ngắt đoạn",
        ],
        "Công thức, ví dụ tính, số liệu, nguồn dẫn là chỗ AI có thể sai mà nghe vẫn đúng và học sinh sẽ chép vào vở. Giọng điệu, độ dài, từ nối là việc trình bày mà bạn nhìn là biết và sửa được, không làm học sinh hiểu sai kiến thức.",
      ),
      qz(
        "AI viết \"S = 2πr², bán kính 3 cm cho 18π cm²\". Kết luận đúng là gì?",
        "Sai công thức; đúng là S = πr², ra 9π cm²",
        [
          "Đúng, vì 2 × π × 3² = 18π cm² khớp với ví dụ",
          "Sai ở chỗ bán kính, đúng phải là 6 cm để ra 18π cm²",
          "Đúng một nửa: công thức sai nhưng đáp số 18π cm² vẫn đúng",
        ],
        "Diện tích hình tròn là πr² nên r = 3 cm cho 9π cm². Phép nhân 2 × π × 9 = 18π đúng số học nhưng dùng sai công thức, đó là kiểu sai khó thấy. Đổi bán kính thành 6 cm không sửa được công thức. Đáp số 18π cm² cũng sai chứ không phải \"đúng một nửa\".",
      ),
      qz(
        "AI viết \"theo sách giáo khoa Toán 9, trang 87\". Bạn chưa mở sách. Nên coi câu này thế nào?",
        "Chưa tin, mở sách kiểm trang và nội dung thật",
        [
          "Đáng tin vì AI ghi cả số trang cụ thể",
          "Đáng tin nếu AI xác nhận lại khi bạn hỏi \"có chắc không\"",
          "Giữ lại vì học sinh sẽ không ai mở sách ra kiểm số trang",
        ],
        "AI có thể tạo số trang trông rất thật khi nó không có sách trong tay. Số trang cụ thể không chứng minh gì. Hỏi lại AI có thể chỉ cho một câu xác nhận tự tin khác. Giữ một nguồn chưa kiểm là để nguồn sai vào tay học sinh và đồng nghiệp.",
      ),
      qz(
        "Cách kiểm nào giúp bắt lỗi công thức mà không cần tin AI lần nữa?",
        "Tự giải lại ví dụ bằng công thức trong sách",
        [
          "Nhờ AI giải lại ví dụ để so hai kết quả",
          "Hỏi AI nó đã dùng công thức nào rồi hỏi cùng câu ở lần chat mới",
          "Đọc lại bản viết to lên xem chỗ nào nghe lạ tai thì sửa",
        ],
        "Giải lại bằng công thức trong sách là kiểm độc lập. Cho AI giải lại hay hỏi lại chỉ cho ta thêm một câu trả lời từ chính nguồn đang cần kiểm, và hai lần cùng sai vẫn khớp nhau. Nghe lạ tai không phát hiện được công thức sai vì bản sai vẫn nghe trôi chảy.",
      ),
      qz(
        "Bạn phát hiện một lỗi trong bản AI viết. Việc nào nên làm tiếp?",
        "Soát tiếp các công thức và số khác trong cùng bản",
        [
          "Chỉ sửa đúng chỗ lỗi đó rồi phát, các chỗ còn lại chắc đúng",
          "Bỏ cả bản, từ nay không dùng AI để viết bài giảng nữa",
          "Nhờ AI kiểm giúp xem trong bản còn lỗi nào khác không",
        ],
        "Một lỗi thường không đứng một mình: nếu AI sai công thức thì phép tính hay nguồn cạnh đó cũng cần kiểm. Chỉ sửa một chỗ rồi tin phần còn lại là để lỗi sót đi tiếp. Bỏ hẳn AI là bỏ phần nó làm tốt như viết nháp. Nhờ AI tự kiểm thì lại tin nguồn vừa sai.",
      ),
    ],
    keyTakeaways: [
      "Lỗi của AI nằm ở công thức, phép tính ví dụ, số liệu và nguồn dẫn, nơi sai mà vẫn nghe đúng.",
      "Số trang, tên sách AI đưa ra chưa phải bằng chứng cho tới khi bạn mở sách.",
      "Kiểm bằng cách tự giải lại ví dụ với công thức trong sách, không hỏi lại AI.",
      "Thấy một lỗi thì soát tiếp cả bản.",
    ],
    practicePrompt: {
      question:
        "Bản giải thích của AI có câu \"Theo khảo sát của một trường đại học, 80% học sinh nhớ bài lâu hơn khi học bằng ví dụ\". Bạn nên làm gì?",
      options: [
        "Yêu cầu nguồn cụ thể, mở kiểm; không có nguồn thì bỏ câu",
        "Giữ câu vì con số 80% nghe rất khoa học và thuyết phục",
        "Đổi 80% thành \"nhiều\" cho an toàn rồi vẫn giữ câu ở lại",
        "Giữ câu vì AI thường đúng khi nói về việc học của học sinh",
      ],
      correct: 0,
      explanation:
        "Một con số kèm nguồn chung chung như \"một trường đại học\" là dấu hiệu AI bịa cho nghe có căn cứ. Cách xử lý là đòi nguồn cụ thể và mở ra kiểm. Đổi 80% thành \"nhiều\" vẫn giữ một khẳng định chưa kiểm. Con số nghe thuyết phục không làm nó đúng.",
    },
    summary: {
      keyIdea: "AI sai với giọng tự tin: chỗ cần kiểm là công thức, ví dụ tính, số liệu và nguồn.",
      formula: "Gạch công thức, số, nguồn → đối chiếu sách → tự giải lại ví dụ → sửa hoặc bỏ → phát.",
      commonMistake: "Tin số trang hay tên sách vì AI ghi rất cụ thể.",
      action: "Lần tới khi AI viết bài giảng, gạch mọi công thức và mọi nguồn rồi đối chiếu sách.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI viết một trang giải thích cho một bài bạn sắp dạy. In ra hoặc chép vào một tệp, gạch mọi công thức, số liệu, ví dụ tính và nguồn dẫn. Đối chiếu từng chỗ với sách giáo khoa, tự giải lại ví dụ, và ghi lại số chỗ đã sai hoặc chưa kiểm được.",
      secondary: "Chỗ nào không kiểm được thì đánh dấu \"chưa kiểm\" và không đưa vào tờ phát.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn định phát bản giải thích do AI viết cho cả lớp vào tiết sau. Bản đọc rất suôn, nhưng bạn có một nỗi lo nhỏ về một công thức. Bài này biến nỗi lo đó thành một quy trình mười phút.",
      },
      {
        type: "feynman",
        title: "Bắt lỗi bài AI viết đơn giản hơn bạn nghĩ",
        intro: "Hình dung một bạn thực tập sinh viết rất nhanh và rất tự tin, nhưng thỉnh thoảng nhớ nhầm công thức. Bạn không cần bỏ bạn ấy, chỉ cần đọc lại những chỗ dễ nhầm trước khi gửi đi.",
        columns: ["Việc", "Bài của thực tập sinh", "Bài do AI viết"],
        rows: [
          ["Viết nhanh, trôi", "Xong một trang trong mười phút", "Xong một trang trong vài giây"],
          ["Chỗ dễ nhầm", "Công thức, số liệu, tên sách", "Công thức, phép tính ví dụ, nguồn dẫn"],
          ["Vì sao khó thấy", "Bạn ấy viết như chắc chắn", "AI dùng cùng giọng tự tin khi đúng và khi sai"],
          ["Cách kiểm", "Đối chiếu sách, tự làm lại ví dụ", "Đối chiếu sách, tự giải lại ví dụ"],
        ],
        oneLiner: "Đọc lại đúng những chỗ dễ nhầm với sách, và tự giải lại ví dụ trước khi phát.",
      },
      { type: "heading", text: "Sai mà vẫn nghe đúng" },
      {
        type: "paragraph",
        text: "AI viết bằng cách đoán chữ tiếp theo nghe hợp lý, nên nó có thể viết một công thức gần giống công thức thật. Đó là lý do kiểu sai của nó khác kiểu sai của người: một người nhớ nhầm thường ngập ngừng, còn AI thì không. Từ đây có hai chữ cần nhớ: công thức và nguồn dẫn, là hai nơi lỗi hay ẩn.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản giải thích hình tròn do AI viết",
        task: "Bạn nhờ AI viết bản giải thích về hình tròn cho lớp 9, và sách giáo khoa của bạn nói: chu vi C = 2πr và diện tích S = πr². Đánh dấu những đoạn sai hoặc không có nguồn.",
        segments: [
          { text: "Hình tròn tâm O bán kính r gồm mọi điểm cách O một khoảng bằng r." },
          { text: "Chu vi hình tròn tính bằng C = 2πr." },
          { text: "Diện tích hình tròn tính bằng S = 2πr², nên bán kính 3 cm cho diện tích 18π cm².", error: "Sai công thức: diện tích là S = πr², nên r = 3 cm cho 9π cm². Phép nhân 2 × π × 9 = 18π đúng số học nhưng dùng sai công thức." },
          { text: "Số π xấp xỉ 3,14." },
          { text: "Chứng minh chi tiết công thức này có ở trang 87 sách giáo khoa Toán 9.", error: "Bạn không đưa AI sách nào cả; trang 87 là chi tiết AI tự tạo để nghe có căn cứ. Phải mở sách kiểm mới biết có hay không." },
          { text: "Ví dụ: bán kính 5 cm thì chu vi là 10π cm." },
        ],
      },
      {
        type: "callout",
        label: "Bốn loại chỗ cần gạch",
        text: "Khi đọc bản AI viết, hãy gạch bút màu lên bốn loại: công thức, phép tính ví dụ, số liệu, nguồn dẫn. Bốn loại đó là nơi lỗi làm học sinh học sai. Những phần còn lại bạn đọc như đọc bản nháp của đồng nghiệp.",
      },
      {
        type: "flow",
        title: "Mười phút trước khi phát một bản AI viết",
        steps: [
          { label: "Gạch", detail: "Dùng bút màu gạch mọi công thức, phép tính ví dụ, số liệu và nguồn dẫn trong bản." },
          { label: "Đối chiếu", detail: "Mở sách giáo khoa hoặc tài liệu bạn tin và so từng chỗ đã gạch. Không dùng AI để kiểm AI." },
          { label: "Tự giải lại", detail: "Làm lại từng ví dụ tính bằng công thức trong sách, xem có ra đúng đáp số trong bản không." },
          { label: "Sửa hoặc bỏ", detail: "Sửa chỗ sai. Chỗ nào chưa kiểm được, ghi \"chưa kiểm\" hoặc bỏ khỏi tờ phát." },
          { label: "Soát tiếp", detail: "Một lỗi thường có bạn đồng hành: nếu tìm thấy một chỗ sai thì đọc kỹ cả bản lần nữa." },
        ],
      },
      {
        type: "scenario",
        title: "Bản giải thích đã in, chuông sắp reo",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã in 40 bản do AI viết. Bạn thấy một công thức lạ mắt nhưng đã hết giờ chuẩn bị. Bạn làm gì?",
            choices: [
              { label: "Phát luôn, vì bản viết quá mạch lạc và tự tin", next: "bad1" },
              { label: "Mở sách đối chiếu công thức và tự giải lại ví dụ trước khi phát", next: "s2" },
            ],
          },
          bad1: {
            text: "Cả lớp chép công thức sai vào vở. Hai tuần sau, một em giải bài kiểm tra bằng công thức đó và mất điểm. Bạn phải giảng lại cho cả lớp.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy công thức sách khác bản AI, và một câu dẫn nguồn không có trong sách. Bạn chưa kịp sửa xong cả bản trước giờ phát.",
            choices: [
              { label: "Sửa công thức, gạch câu dẫn nguồn, ghi tay ngoài lề rồi phát", next: "good1" },
              { label: "Phát nguyên bản và nói miệng với lớp \"chỗ này cô sửa sau\"", next: "bad2" },
            ],
          },
          good1: {
            text: "Học sinh nhận tờ đã sửa với công thức đúng. Một em hỏi vì sao có gạch một câu, và bạn dùng đó để dạy cả lớp cách hỏi \"nguồn này ở đâu?\".",
            ending: "good",
          },
          bad2: {
            text: "Các em chép bản in và không ghi lời dặn miệng. Công thức sai vẫn nằm trong vở nhiều em cho tới lúc thi.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI viết nhanh, và sai với cùng giọng tự tin như khi đúng.",
          "Mười phút đối chiếu công thức, ví dụ và nguồn là cái giá của một tờ phát đúng.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 4 ─────────────────────────
  {
    id: 2023,
    slug: "chinh-do-kho-cua-bai-doc-theo-trinh-do",
    title: "Chặng 31, Bài 4: Chỉnh độ khó của một bài đọc cho ba nhóm trình độ",
    subtitle: "Cùng một bài, ba độ khó: ý chính không đổi, chỉ câu chữ thay đổi.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📚",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trong cùng một lớp, có em đọc trôi chảy và có em đọc từng chữ. Viết lại một bài đọc thành ba bản mất cả buổi nếu làm tay, còn AI làm trong vài phút. Nhưng bản dễ hơn hay làm rụng mất ý chính, và em cần bản dễ nhất lại là người thiệt nhất.",
    openingQuestion:
      "Bạn nhờ AI viết lại bài đọc về vòng tuần hoàn của nước thành ba mức độ khó. Bản dễ ngắn gọn, nghe rất hợp với em đọc chậm. Điều gì cần kiểm nhất trước khi phát?",
    openingOptions: [
      "Cả ba bản còn đủ những ý bắt buộc của bài không",
      "Bản dễ có đủ ngắn để em đọc chậm đọc xong trong giờ",
      "Bản khó có dùng nhiều từ mới lạ so với bản gốc không",
      "Ba bản có cùng số câu không",
    ],
    correctOption: 0,
    explanation:
      "Khi nhờ AI làm bản dễ hơn, nó thường cắt bớt ý cho ngắn, và ý bị cắt hay là ý khó nhất, cũng là ý quan trọng nhất. Nếu bản dễ mất mục tiêu bài học thì em đọc chậm đọc xong mà không học được điều lớp học được. Độ ngắn, số từ mới hay số câu là chuyện trình bày; ba bản dạy cùng một ý mới là điều kiện để công bằng.",
    diagram: [
      { label: "Liệt kê những ý bắt buộc của bài", arrow: true },
      { label: "AI viết ba bản, giữ đủ ý, đổi câu chữ", arrow: true },
      { label: "Bạn tick từng ý trong từng bản", arrow: true },
      { label: "Phát bản A, B, C không gắn nhãn học sinh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Cô Thu dạy lớp 5, có bài đọc về vòng tuần hoàn của nước gồm bốn ý: bốc hơi, ngưng tụ, mưa, nước chảy về biển. Cô ghi bốn ý đó cho AI, xin ba bản và tick từng ý. Bản dễ nhất thiếu ý ngưng tụ; cô nhờ AI thêm lại một câu ngắn về mây hình thành thế nào, rồi phát ba bản mang tên A, B, C.",
    },
    quiz: [
      qz(
        "Muốn ba phiên bản bài đọc dạy cùng một nội dung, nên nói gì với AI?",
        "Liệt kê những ý bắt buộc và yêu cầu giữ đủ ở cả ba bản",
        [
          "Viết lại cho dễ hơn và khó hơn, còn lại để AI tự cân nhắc",
          "Cắt bớt bản dễ cho ngắn để em đọc chậm khỏi bị ngợp",
          "Đổi hẳn chủ đề của bản khó cho hấp dẫn hơn với em giỏi",
        ],
        "Danh sách ý bắt buộc cho AI một khung: chỉ đổi câu chữ, không đổi nội dung. Nói \"dễ hơn, khó hơn\" mà không kèm khung, AI tự cắt ý. Cắt ngắn cho dễ đọc là lý do bản dễ mất ý. Đổi chủ đề là làm ra bài khác chứ không phải bản khó của cùng một bài.",
      ),
      qz(
        "Bản dễ hơn AI viết lại thường gặp vấn đề nào nhất?",
        "Bỏ mất ý khó nhất của bài để câu văn ngắn gọn",
        [
          "Giữ quá nhiều ý nên dài hơn bản gốc",
          "Dùng toàn từ khó hơn bản gốc để học sinh tra từ điển",
          "Đổi thứ tự bài đọc thành một câu chuyện không liên quan",
        ],
        "Khi bị yêu cầu đơn giản hoá, AI dễ bỏ ý phức tạp và giữ ý dễ nói, nên bản dễ thiếu đúng phần cần học nhất. Ngược lại, bản dễ dài hơn hay dùng từ khó hơn là hiếm. Đổi thành chuyện không liên quan cũng ít xảy ra nếu bạn đã đưa bài gốc và nêu các ý.",
      ),
      qz(
        "Sau khi có ba bản, cách kiểm nhanh nhất để biết bản nào đã mất ý là gì?",
        "Tick từng ý bắt buộc trong từng bản",
        [
          "Nhờ AI tự đọc và cho biết bản nào đã đầy đủ ý",
          "Đọc lướt tiêu đề của ba bản xem có giống nhau không",
          "Đếm số từ ba bản, bản nào gần số từ bản gốc thì đủ ý",
        ],
        "Tick từng ý trong từng bản là kiểm trực tiếp và mất vài phút. AI tự chấm bài của chính nó thường trả lời \"đầy đủ\". Tiêu đề giống nhau không nói gì về thân bài, và số từ gần bản gốc vẫn có thể thiếu một ý được thay bằng câu dài dòng.",
      ),
      qz(
        "Cách nào phát ba bản mà không làm các em thấy mình bị xếp loại?",
        "Đặt tên trung tính A, B, C và để em thử bản nào cũng được",
        [
          "Ghi trên đầu tờ giấy \"nhóm giỏi\", \"nhóm yếu\"",
          "Phát bản dễ cho bàn đầu, bản khó cho bàn cuối",
          "Phát theo điểm kiểm tra và đọc to tên từng em",
        ],
        "Tên trung tính A, B, C và cho em tự thử giúp các em không bị gắn nhãn, đồng thời cho phép đổi bản nếu chọn chưa hợp. Ghi nhóm giỏi/yếu, xếp theo bàn hay đọc tên theo điểm đều làm cả lớp biết ai bị xếp vào đâu.",
      ),
      qz(
        "Bạn chỉ có thời gian đọc kỹ một bản. Bản nào nên đọc kỹ nhất?",
        "Bản dễ nhất, vì nó hay mất ý nhất",
        [
          "Bản khó nhất, vì em giỏi đọc và sẽ hỏi nếu có lỗi",
          "Bản giữa, vì nó đại diện cho cả hai bản còn lại",
          "Bản nào cũng vậy, AI viết đều",
        ],
        "Bản dễ nhất là bản bị cắt nhiều nhất nên rủi ro mất ý cao nhất, và em đọc bản đó ít khi biết để hỏi. Bản khó ít bị mất ý; bản giữa không đại diện được cho bản dễ. Cả ba bản không đều nhau: độ đơn giản hoá càng lớn thì càng dễ thiếu.",
      ),
    ],
    keyTakeaways: [
      "Liệt kê những ý bắt buộc của bài rồi yêu cầu AI giữ đủ ở cả ba bản.",
      "Bản dễ hay mất ý khó nhất; đó là bản cần kiểm kỹ nhất.",
      "Tick từng ý trong từng bản; đừng để AI tự chấm bản của chính nó.",
      "Đặt tên trung tính A, B, C để các em không bị gắn nhãn.",
    ],
    practicePrompt: {
      question:
        "Bài đọc có 4 ý bắt buộc. Bản dễ AI viết chỉ chứa 3 ý. Bạn nên làm gì?",
      options: [
        "Nhờ AI thêm lại ý thiếu bằng câu ngắn rồi tick lại cả bốn ý",
        "Phát luôn vì 3 ý đủ để em đọc chậm nắm được đại ý bài",
        "Bỏ bản dễ và phát bản giữa cho cả lớp để khỏi mất công làm lại",
        "Chuyển ý thiếu sang phần câu hỏi để em tự tìm ở nhà",
      ],
      correct: 0,
      explanation:
        "Bản dễ thiếu ý thì cần thêm lại ý bằng câu ngắn và kiểm lại. Phát bản thiếu nghĩa là em đọc chậm học ít hơn cả lớp. Bỏ bản dễ khiến em cần nó nhất không có gì. Dồn ý thiếu về nhà bắt em tự tìm phần khó nhất mà không có ai hướng dẫn.",
    },
    summary: {
      keyIdea: "Ba bản, cùng một nội dung: chỉ độ khó của câu chữ đổi, ý bắt buộc thì không.",
      formula: "Ý bắt buộc → ba bản → tick từng ý → đặt tên A, B, C → phát.",
      commonMistake: "Xin \"bản dễ hơn\" mà không nêu ý bắt buộc, nên bản dễ bị cắt mất ý khó nhất.",
      action: "Viết ra các ý bắt buộc của một bài đọc rồi nhờ AI làm ba bản.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bài đọc bạn sắp dùng. Ghi ra 3 đến 5 ý bắt buộc, rồi nhờ AI viết ba bản (dễ, giữa, khó) giữ đủ các ý đó. Tick từng ý trong từng bản, nhất là bản dễ nhất, và bổ sung ý bị thiếu trước khi phát.",
      secondary: "Đặt tên ba bản là A, B, C và ghi lại em nào tự chọn bản nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có một bài đọc, và trong lớp có em đọc lướt như gió, có em đọc từng chữ. Bài này giúp bạn tạo ba phiên bản rồi kiểm chúng vẫn dạy cùng ý, thay vì phát ba bài khác nhau mà không biết.",
      },
      {
        type: "feynman",
        title: "Chỉnh độ khó bài đọc đơn giản hơn bạn nghĩ",
        intro: "Hình dung một nồi cháo cho cả nhà: người lớn ăn cơm, em bé ăn cháo xay. Món là một, dinh dưỡng phải như nhau, chỉ độ nhuyễn khác.",
        columns: ["Việc", "Nấu một món cho cả nhà", "Viết một bài đọc ba mức"],
        rows: [
          ["Giữ nguyên", "Các nguyên liệu và chất dinh dưỡng chính", "Các ý bắt buộc của bài"],
          ["Đổi", "Độ nhuyễn của món ăn", "Độ dài câu, từ ngữ, mức giải thích"],
          ["Sai lầm hay gặp", "Xay quá kỹ làm mất bớt nguyên liệu", "Đơn giản quá làm mất ý khó nhất"],
          ["Cách kiểm", "Đối chiếu nguyên liệu trong từng bát", "Tick từng ý trong từng bản"],
        ],
        oneLiner: "Đổi độ khó của câu chữ, không đổi những ý phải có.",
      },
      { type: "heading", text: "Trước hết liệt kê ý bắt buộc" },
      {
        type: "paragraph",
        text: "Trước khi mở AI, hãy ghi ra 3 đến 5 ý mà em nào đọc xong cũng phải biết. Với bài về vòng tuần hoàn của nước, đó có thể là bốn ý: nước bốc hơi, hơi nước ngưng tụ thành mây, mây rơi thành mưa, nước chảy về biển. Đây là khung để AI viết trong đó, và là danh sách để bạn tick sau.",
      },
      {
        type: "comparison",
        left: {
          label: "Câu lệnh mơ hồ",
          text: "\"Viết lại bài này cho dễ hơn và khó hơn.\" AI tự quyết định bỏ gì, giữ gì. Bản dễ ngắn đi nhiều và có thể thiếu hẳn một ý.",
        },
        right: {
          label: "Câu lệnh có khung",
          text: "\"Bài này có 4 ý bắt buộc: bốc hơi, ngưng tụ, mưa, chảy về biển. Viết ba bản (dễ, giữa, khó), cả ba đủ bốn ý, chỉ đổi câu chữ.\" AI có khung để viết và bạn có danh sách để tick.",
        },
      },
      {
        type: "flow",
        title: "Từ một bài đọc thành ba bản đã kiểm",
        steps: [
          { label: "Ghi các ý bắt buộc", detail: "Viết 3 đến 5 ý mà em nào đọc xong cũng phải biết. Đây là mục tiêu dạy, không phải mục tiêu đọc nhanh." },
          { label: "Xin ba bản", detail: "Nêu rõ: cả ba bản giữ đủ các ý, chỉ đổi độ dài câu và từ ngữ. Đưa bài gốc vào lệnh." },
          { label: "Tick từng ý", detail: "Với mỗi bản, đánh dấu từng ý bắt buộc. Kiểm kỹ nhất bản dễ, vì đó là bản dễ mất ý nhất." },
          { label: "Bổ sung chỗ thiếu", detail: "Nếu thiếu ý, nhờ AI thêm lại bằng một câu ngắn rồi tick lại. Không phát bản còn thiếu." },
          { label: "Đặt tên trung tính", detail: "Ghi A, B, C thay cho dễ, giữa, khó. Để các em thử bản nào cũng được và đổi bản khi thấy chưa hợp." },
        ],
      },
      {
        type: "scenario",
        title: "Ba bản đọc của cô Thu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bài đọc về vòng tuần hoàn của nước gồm bốn ý: bốc hơi, ngưng tụ, mưa, chảy về biển. Bạn cần ba phiên bản trước giờ ra chơi. Bạn nhờ AI thế nào?",
            choices: [
              { label: "\"Viết lại bài này dễ hơn và khó hơn\", rồi phát ngay", next: "bad1" },
              { label: "Nêu rõ bốn ý bắt buộc, xin ba bản đủ bốn ý, chỉ đổi câu chữ", next: "s2" },
            ],
          },
          bad1: {
            text: "Bản dễ ngắn, đọc rất trôi nhưng không có ý ngưng tụ. Em đọc chậm nghe bài xong không hiểu mây từ đâu ra. Bài kiểm tra sau đó hỏi đúng phần này, và các em nhóm đọc chậm mất điểm.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về ba bản. Bản khó và bản giữa nhìn đủ ý, bản dễ đọc rất ngắn. Bạn chỉ còn vài phút trước giờ vào lớp.",
            choices: [
              { label: "Tick từng ý trong cả ba bản, kỹ nhất bản dễ, rồi mới phát", next: "good1" },
              { label: "Chỉ đọc bản khó vì bản dễ ngắn, chắc không lỗi", next: "bad2" },
            ],
          },
          good1: {
            text: "Bạn thấy bản dễ thiếu ý ngưng tụ, nhờ AI thêm một câu ngắn về mây, tick lại đủ bốn ý và ghi tên ba bản là A, B, C. Cả lớp học cùng nội dung và không em nào bị gắn nhãn.",
            ending: "good",
          },
          bad2: {
            text: "Bản dễ thiếu một ý và bạn không biết. Em nào chọn bản đó học ít hơn cả lớp, và bạn chỉ biết khi chấm bài kiểm tra.",
            ending: "bad",
          },
        },
      },
      {
        type: "callout",
        label: "Không gắn nhãn học sinh",
        text: "Đừng ghi \"bản cho em yếu\". Tên trung tính A, B, C và quyền thử bản nào cũng được giúp em đọc chậm không thấy mình bị xếp loại. Cũng đừng đưa tên hay điểm cụ thể của học sinh vào công cụ AI khi nhà trường chưa cho phép.",
      },
      {
        type: "closing",
        lines: [
          "Ba bản, một nội dung: đó là điều kiện để công bằng trong lớp.",
          "AI đổi được câu chữ; bạn là người giữ cho ý không rụng.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 5 ─────────────────────────
  {
    id: 2024,
    slug: "mini-project-goi-tai-lieu-mot-tiet-hoc",
    title: "Chặng 31, Bài 5: Mini project: gói tài liệu cho một tiết học",
    subtitle: "Trong 20 phút: giáo án, phiếu bài tập và ba câu khởi động cho một tiết thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: chia tiết, tìm ví dụ, bắt lỗi, chỉnh độ khó. Bài này ghép chúng lại cho một tiết thật của bạn, để bạn có một gói dùng được ngay và một quy trình làm lại cho các tiết sau.",
    openingQuestion:
      "Bạn cần giáo án, phiếu bài tập và ba câu khởi động cho tiết mai. Bạn nhờ AI làm cả ba cùng lúc, mỗi thứ dài tuỳ ý. Cách làm nào ít rủi ro sai lệch nhất?",
    openingOptions: [
      "Làm lần lượt từ một mục tiêu, và để mỗi thứ bám thứ trước",
      "Làm cả ba thứ trong một lệnh để AI tự xử lý cho nhanh gọn",
      "Nhờ AI làm phiếu bài tập trước rồi suy giáo án từ phiếu",
      "Dùng ba công cụ AI khác nhau rồi chọn bản đẹp nhất mỗi thứ",
    ],
    correctOption: 0,
    explanation:
      "Ba thứ của một tiết phải cùng phục vụ một mục tiêu: giáo án nói dạy gì, phiếu bài tập kiểm điều đó, câu khởi động dẫn vào. Làm lần lượt và cho mỗi thứ bám thứ trước thì bạn kiểm được sự khớp. Làm cả ba trong một lệnh dễ ra ba thứ mỗi thứ một hướng. Làm phiếu bài tập trước khi có giáo án hay dùng ba công cụ khác nhau thì càng khó khớp nhau hơn.",
    diagram: [
      { label: "Một mục tiêu đo được", arrow: true },
      { label: "Giáo án 45 phút", arrow: true },
      { label: "Phiếu bài tập bám giáo án", arrow: true },
      { label: "Ba câu khởi động, rồi bạn kiểm và sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Thầy Sơn làm gói cho tiết quy đồng phân số. Thầy đưa AI mục tiêu và giới hạn lớp, xin giáo án, rồi nhờ làm phiếu 6 câu ghi mỗi câu ứng với bước nào của giáo án, cuối cùng xin ba câu khởi động. Khi đối chiếu, thầy thấy câu 5 của phiếu không ứng với bước nào, nên bỏ câu đó và cộng lại số phút của giáo án.",
    },
    quiz: [
      qz(
        "Vì sao nên làm giáo án, phiếu bài tập và câu khởi động lần lượt thay vì cùng lúc?",
        "Mỗi thứ bám thứ trước nên bạn kiểm được sự khớp",
        [
          "AI chỉ làm được một việc mỗi lần gửi",
          "Mỗi lần AI chỉ nhớ được một thứ nên cần tách ra cho đỡ quên",
          "Làm lần lượt lâu hơn nhưng cho bản dài và kỹ hơn hẳn",
        ],
        "Làm lần lượt cho phép phiếu bài tập dựa vào giáo án đã duyệt, nên bạn kiểm được từng câu có ứng với bước nào không. AI hoàn toàn làm được nhiều thứ trong một lệnh, nhưng bạn khó kiểm sự khớp. Lý do không phải nhớ hay độ dài mà là khả năng đối chiếu.",
      ),
      qz(
        "Cách nào đảm bảo phiếu bài tập thật sự bám giáo án?",
        "Yêu cầu ghi mỗi câu ứng với bước nào của giáo án",
        [
          "Yêu cầu phiếu có đúng 6 câu dù giáo án ra sao",
          "Yêu cầu phiếu khó hơn giáo án cho thử thách",
          "Nhờ AI cam kết phiếu bám giáo án rồi tin",
        ],
        "Ghi rõ mỗi câu ứng với bước nào là bằng chứng bạn kiểm được, và câu không ứng với bước nào thì bỏ. Số câu cố định không nói phiếu bám gì. Phiếu khó hơn giáo án là kiểm tra điều chưa dạy. Lời cam kết của AI không phải bằng chứng.",
      ),
      qz(
        "AI đưa ba câu khởi động, một câu hỏi về nội dung của bài sau. Nên xử lý thế nào?",
        "Bỏ câu đó vì khởi động phải ứng với mục tiêu của tiết này",
        [
          "Giữ lại vì câu hỏi trước bài sau làm học sinh tò mò hơn",
          "Giữ lại và dạy luôn phần đó để tiết sau đỡ mất thời gian",
          "Đổi câu đó thành câu khó hơn để học sinh giỏi cũng có phần",
        ],
        "Câu khởi động đúng chỗ khi nó dẫn vào mục tiêu của tiết đang dạy. Một câu về bài sau làm lệch trọng tâm và ăn mất phút của tiết. Dạy luôn phần đó làm giáo án vượt quá 45 phút. Câu khó hơn cũng không dẫn vào mục tiêu chung.",
      ),
      qz(
        "Sau khi có đủ gói, bước kiểm cuối nào quan trọng nhất trước khi in?",
        "Cộng số phút giáo án và thử tự làm phiếu bài tập",
        [
          "Xem ba tài liệu có cùng phông chữ và cùng cỡ chữ không",
          "Đếm số trang của cả gói để chắc không quá 3 trang giấy",
          "Kiểm ba tài liệu có cùng một dòng đầu trang tiêu đề không",
        ],
        "Tổng số phút và tự làm phiếu là hai cách bắt lỗi thật: giáo án quá giờ hoặc phiếu có câu vô lý. Phông chữ, số trang, đầu trang là trình bày, sửa được trong một phút và không làm tiết học hỏng.",
      ),
      qz(
        "Vì sao nên lưu lại câu lệnh đã dùng cho gói tài liệu tiết này?",
        "Lần sau đổi bài mà dùng lại được, đỡ viết lại từ đầu",
        [
          "Vì AI sẽ nhớ lớp bạn và không cần mô tả lại ở lần sau",
          "Vì câu lệnh đã dùng đảm bảo không còn lỗi",
          "Vì nhà trường thường yêu cầu nộp lại câu lệnh khi kiểm tra",
        ],
        "Câu lệnh tốt là khung bạn thay tên bài và mục tiêu là dùng lại. AI không tự nhớ lớp của bạn giữa các lần dùng nếu bạn không đưa lại thông tin. Một câu lệnh tốt không đảm bảo hết lỗi, bạn vẫn phải kiểm mỗi lần. Yêu cầu nộp câu lệnh không phải lý do chung.",
      ),
    ],
    keyTakeaways: [
      "Một mục tiêu, ba tài liệu: giáo án, phiếu bài tập, câu khởi động cùng phục vụ mục tiêu đó.",
      "Làm lần lượt, mỗi thứ bám thứ trước, để kiểm được sự khớp.",
      "Bắt AI ghi mỗi câu phiếu ứng với bước nào; câu không ứng thì bỏ.",
      "Cộng lại số phút và tự làm phiếu trước khi in; lưu câu lệnh để dùng lại.",
    ],
    practicePrompt: {
      question:
        "Phiếu bài tập AI viết có 6 câu, nhưng câu 5 không ứng với bước nào của giáo án. Bạn nên làm gì?",
      options: [
        "Bỏ câu 5 hoặc thêm một bước vào giáo án để câu đó có chỗ",
        "Giữ câu 5 vì phiếu càng đủ câu thì càng thể hiện kỹ lưỡng",
        "Dồn câu 5 vào bài về nhà mà không kiểm xem em làm được không",
        "Đổi số thứ tự để câu 5 thành câu cuối và ít ai để ý tới nó",
      ],
      correct: 0,
      explanation:
        "Một câu không ứng với bước nào kiểm điều chưa dạy. Bạn hoặc bỏ câu, hoặc thêm bước vào giáo án. Giữ vì đủ câu hay đổi số thứ tự chỉ che mất lỗi. Dồn vào bài về nhà bắt học sinh làm việc mình chưa dạy.",
    },
    summary: {
      keyIdea: "Gói tài liệu tốt: một mục tiêu, ba thứ khớp nhau, và bạn kiểm từng mối nối.",
      formula: "Mục tiêu → giáo án → phiếu bài tập (mỗi câu ứng một bước) → ba câu khởi động → kiểm giờ, tự làm phiếu.",
      commonMistake: "Nhờ AI làm cả ba cùng lúc rồi in luôn, nên ba thứ không khớp với nhau.",
      action: "Làm gói cho tiết thật tuần này và lưu lại câu lệnh.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tiết bạn sẽ dạy trong tuần này. Viết mục tiêu, nhờ AI làm lần lượt giáo án 45 phút, phiếu bài tập 6 câu (ghi mỗi câu ứng với bước nào) và ba câu khởi động. Cộng lại số phút, tự làm phiếu, bỏ câu không khớp, và lưu câu lệnh vào một tệp để dùng lại.",
      secondary: "Sau tiết, ghi một dòng: tài liệu nào dùng được nguyên bản, tài liệu nào phải sửa nhiều.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học từng mảnh: chia tiết, tìm ví dụ, bắt lỗi, chỉnh độ khó. Hôm nay ghép lại cho một tiết thật, trong 20 phút, và lưu quy trình để tuần sau làm lại cho tiết khác.",
      },
      {
        type: "feynman",
        title: "Làm gói tài liệu với AI đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn chuẩn bị một bữa cơm gia đình: có món chính, món ăn kèm và món khai vị. Ba món phải hợp nhau, nếu không bàn ăn sẽ lộn xộn.",
        columns: ["Việc", "Chuẩn bị bữa cơm", "Chuẩn bị gói tài liệu tiết học"],
        rows: [
          ["Thứ quyết định trước", "Bữa ăn cho ai, bao nhiêu người", "Mục tiêu tiết học, sĩ số, thời lượng"],
          ["Ba phần", "Khai vị, món chính, món phụ", "Câu khởi động, giáo án, phiếu bài tập"],
          ["Nhờ người trợ giúp", "Nhờ bạn gợi ý từng món, món sau hợp món trước", "Nhờ AI làm lần lượt, mỗi thứ bám thứ trước"],
          ["Kiểm cuối", "Nếm thử, xem có kịp giờ ăn không", "Cộng số phút, tự làm phiếu"],
        ],
        oneLiner: "Ba tài liệu phải hợp nhau như ba món trong một bữa: đi từ một mục tiêu, kiểm từng mối nối.",
      },
      { type: "heading", text: "Vì sao làm lần lượt" },
      {
        type: "paragraph",
        text: "Giáo án nói dạy gì, phiếu bài tập kiểm điều đó, câu khởi động dẫn vào. Nếu nhờ AI làm cả ba cùng lúc, mỗi thứ có thể đi một hướng: phiếu hỏi điều giáo án không dạy, khởi động nói về bài sau. Làm lần lượt thì thứ sau bám thứ trước, và bạn kiểm được từng mối nối.",
      },
      {
        type: "flow",
        title: "Gói tài liệu trong 20 phút",
        steps: [
          { label: "Mục tiêu (3 phút)", detail: "Viết một câu: cuối tiết, học sinh tự làm được gì. Ghi thời lượng, sĩ số, đồ dùng." },
          { label: "Giáo án (5 phút)", detail: "Xin AI ba phương án có số phút, chọn một, cộng lại giờ và sửa theo lớp bạn." },
          { label: "Phiếu bài tập (5 phút)", detail: "Dán giáo án đã chọn, xin phiếu 6 câu và yêu cầu ghi mỗi câu ứng với bước nào." },
          { label: "Ba câu khởi động (3 phút)", detail: "Xin ba câu hỏi ngắn dẫn vào mục tiêu của tiết này, không nói về bài sau." },
          { label: "Kiểm và lưu (4 phút)", detail: "Tự làm phiếu, bỏ câu không khớp, lưu câu lệnh vào một tệp để dùng cho tiết sau." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu lệnh làm phiếu bài tập bám giáo án",
        task: "Bạn đã có giáo án 45 phút cho tiết quy đồng phân số. Lắp câu lệnh để AI làm phiếu bài tập khớp với giáo án đó.",
        parts: [
          {
            id: "input",
            label: "Thông tin đưa vào",
            options: [
              { text: "Tôi dạy quy đồng phân số. Làm phiếu bài tập giúp tôi.", feedback: "AI không thấy giáo án nên tự nghĩ phiếu cho một tiết khác, có thể hỏi điều bạn chưa dạy." },
              { text: "Dán giáo án 45 phút đã chọn cùng mục tiêu: cuối tiết em tự quy đồng hai phân số.", good: true, feedback: "AI có căn cứ để viết câu hỏi đúng những gì bạn dạy và mục tiêu cần đạt." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn của phiếu",
            options: [
              { text: "6 câu, tăng dần độ khó, mỗi câu ghi ứng với bước nào của giáo án.", good: true, feedback: "Có khuôn rõ để bạn kiểm câu nào không có bước tương ứng và bỏ đi." },
              { text: "Nhiều câu tuỳ ý, càng khó càng tốt để học sinh phải suy nghĩ.", feedback: "Số câu và độ khó không kiểm được, và AI có thể hỏi những gì chưa dạy." },
            ],
          },
          {
            id: "check",
            label: "Đáp án và cách kiểm",
            options: [
              { text: "Không cần đáp án, tôi tự nghĩ khi chấm.", feedback: "Bạn không có gì để đối chiếu, và lỗi của phiếu chỉ lộ ra lúc học sinh làm." },
              { text: "Kèm đáp án và lời giải ngắn để tôi tự làm lại từng câu trước khi in.", good: true, feedback: "Bạn có thể tự làm và so; nếu lời giải của AI sai bạn thấy ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "shape", "check"],
            text: "Phiếu bài tập (6 câu).\nCâu 1 (bước ví dụ mẫu): Quy đồng 1/2 và 1/3. Đáp án: 3/6 và 2/6.\nCâu 2 (bước ví dụ mẫu): Quy đồng 2/3 và 3/4. Đáp án: 8/12 và 9/12.\nCâu 3 (bước làm cặp): Quy đồng 1/4 và 5/6. Đáp án: 3/12 và 10/12.\nCâu 4 (bước làm cặp): So sánh 2/5 và 3/10 sau khi quy đồng. Đáp án: 4/10 lớn hơn 3/10.\nCâu 5 (bước tự làm): Quy đồng 3/8 và 1/6. Đáp án: 9/24 và 4/24.\nCâu 6 (bước tự làm): Quy đồng rồi cộng 1/2 + 1/3. Đáp án: 5/6.",
          },
          {
            requires: ["input"],
            text: "Phiếu bài tập.\nCâu 1: Quy đồng 1/2 và 1/3.\nCâu 2: Quy đồng 2/3 và 3/4.\nCâu 3: Tính 1/2 + 1/3.\nCâu 4: Giải thích vì sao 1/2 > 1/3.\nCâu 5: Tìm mẫu số chung nhỏ nhất của ba phân số bất kỳ.\n(Có bám giáo án nhưng không ghi câu ứng bước nào, không có đáp án: câu 5 có thể đã vượt phần bạn dạy.)",
          },
          {
            text: "Phiếu bài tập nâng cao: Câu 1: Giải phương trình có chứa phân số. Câu 2: Tính diện tích hình có cạnh là phân số. Câu 3: Chứng minh quy đồng luôn cho mẫu số nhỏ nhất.\n(Không có giáo án: AI tự nghĩ câu hỏi khó hơn bài, và câu 3 không đúng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Kiểm mối nối, không chỉ từng tài liệu",
        text: "Một giáo án đúng và một phiếu đúng vẫn có thể không khớp nhau. Kiểm ba mối nối: câu phiếu nào ứng bước nào, câu khởi động có dẫn vào mục tiêu không, và tổng số phút của giáo án có đủ 45 phút không.",
      },
      {
        type: "scenario",
        title: "Hai mươi phút cho một gói tài liệu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 20 phút và cần cả gói cho tiết mai. AI đã trả giáo án 45 phút bạn chọn được. Bây giờ cần phiếu bài tập.",
            choices: [
              { label: "Xin phiếu 6 câu, ghi mỗi câu ứng bước nào của giáo án, kèm đáp án", next: "s2" },
              { label: "Xin phiếu bài tập nâng cao thật nhiều câu cho lớp có việc để làm", next: "bad1" },
            ],
          },
          bad1: {
            text: "Phiếu có 12 câu, nhiều câu vượt phần bạn dạy. Cả lớp làm không hết, các em nản và bạn mất thêm nửa tiết để giảng phần chưa dạy.",
            ending: "bad",
          },
          s2: {
            text: "AI trả phiếu 6 câu kèm đáp án. Bạn tự làm thử thì thấy câu 5 không ứng với bước nào và một đáp án bị sai. Còn 8 phút.",
            choices: [
              { label: "Sửa đáp án sai, bỏ câu 5, cộng lại số phút giáo án rồi xin ba câu khởi động", next: "good1" },
              { label: "In luôn cả gói, câu 5 cứ để đó cho học sinh giỏi làm thêm", next: "bad2" },
            ],
          },
          good1: {
            text: "Bạn xong gói: giáo án 45 phút, phiếu 5 câu đã kiểm, ba câu khởi động bám mục tiêu. Bạn lưu câu lệnh vào một tệp để dùng cho tiết sau.",
            ending: "good",
          },
          bad2: {
            text: "Đáp án sai vẫn nằm trong phiếu, và một số em làm đúng lại bị đánh dấu sai. Câu 5 chưa dạy làm cả lớp bối rối.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một mục tiêu, ba tài liệu khớp nhau, và bạn kiểm từng mối nối trước khi in.",
          "Lưu câu lệnh lại: tuần sau bạn chỉ thay tên bài và làm lại trong mười phút.",
        ],
      },
    ],
  },
];
