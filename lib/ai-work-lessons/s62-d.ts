import type { Lesson } from "../lesson-types";

// Chặng 62, bài 16-20. Giáo trình: scripts/curriculum/stage-62.json.
export const S62_D_LESSONS: Lesson[] = [
  {
    id: 2655,
    slug: "doc-bieu-do-thanh-loi-ke-chuyen-co-dau-co-giua-co-cuoi",
    title: "Chặng 62, Bài 16: Biến biểu đồ thành lời kể: có đầu, có giữa, có kết",
    subtitle: "Ba câu cho buổi họp ngắn: điều đang xảy ra, vì sao đáng chú ý, cần làm gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗣️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có một biểu đồ đẹp và hai phút trong buổi họp. Nếu chỉ chiếu lên và nói 'mọi người xem nhé', mỗi người sẽ tự đọc ra một ý khác nhau. Ba câu kể có đầu, có giữa, có kết giúp cả phòng rời buổi họp với cùng một ý và biết việc tiếp theo.",
    openingQuestion:
      "Tới lượt bạn, sếp cho hai phút và biểu đồ doanh thu đã hiện lên màn hình. Bạn mở lời thế nào để cả phòng hiểu cùng một điều?",
    openingOptions: [
      "Nói điều đang xảy ra, vì sao đáng chú ý, rồi việc cần làm",
      "Đọc lần lượt từng cột trên biểu đồ từ trái sang phải cho đủ",
      "Nói biểu đồ này bạn dựng mất bao lâu và dùng phần mềm nào",
      "Chiếu im lặng để mọi người tự rút ra kết luận cho mình",
    ],
    correctOption: 0,
    explanation:
      "Một lời kể ngắn đi theo thứ tự người nghe cần: chuyện gì đang diễn ra, vì sao họ nên quan tâm, và họ cần làm gì. Đọc từng cột khiến người nghe phải tự ghép ý và thường hết giờ trước khi tới điều quan trọng. Kể công sức dựng biểu đồ không giúp ai quyết định. Để mọi người tự rút kết luận thì mỗi người sẽ hiểu một kiểu và buổi họp kết thúc mà không ai biết việc tiếp theo.",
    diagram: [
      { label: "Nhìn biểu đồ, tìm một điều nổi bật", arrow: true },
      { label: "Câu 1: điều đang xảy ra, có con số và mốc so sánh", arrow: true },
      { label: "Câu 2: vì sao đáng chú ý với người nghe", arrow: true },
      { label: "Câu 3: việc cần làm, ai làm, khi nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm chăm sóc khách hàng có biểu đồ số cuộc gọi theo tuần. Thay vì chiếu biểu đồ rồi im lặng, chị nói ba câu: số cuộc gọi tuần này cao hơn tuần trước, hai buổi chiều bị quá tải, đề nghị xếp thêm một người trực vào chiều thứ Ba và thứ Năm. Cả phòng quyết định trong năm phút thay vì tranh luận nửa tiếng.",
    },
    quiz: [
      {
        question: "Ba câu kể cho một biểu đồ nên đi theo thứ tự nào?",
        options: [
          "Điều đang xảy ra, vì sao đáng chú ý, rồi việc cần làm",
          "Tên biểu đồ, màu sắc đã dùng, rồi lời cảm ơn người nghe",
          "Việc cần làm trước, rồi đọc lần lượt từng con số một",
          "Đọc từng cột từ trái sang phải cho đến hết biểu đồ",
        ],
        correct: 0,
        explanation:
          "Người nghe cần biết chuyện gì xảy ra, vì sao họ phải để ý, rồi mới tới việc phải làm. Tên biểu đồ và màu sắc không mang thông tin nào để quyết định. Nói việc cần làm khi chưa ai hiểu chuyện gì xảy ra thì họ chưa thấy lý do để đồng ý, còn đọc từng cột thì hết giờ trước khi tới ý chính.",
      },
      {
        question: "Câu đầu, 'điều đang xảy ra', nên chứa gì?",
        options: [
          "Một con số cụ thể kèm mốc so sánh",
          "Mô tả hình dạng biểu đồ và các màu được dùng trong đó",
          "Nguyên nhân chắc chắn khiến con số thay đổi như vậy",
          "Tên phần mềm đã vẽ biểu đồ và ngày vẽ xong bảng",
        ],
        correct: 0,
        explanation:
          "Một con số đứng một mình không nói gì; nó cần mốc như tuần trước hay cùng kỳ năm ngoái. Mô tả màu và hình dạng chỉ lặp lại điều mắt đã thấy, nguyên nhân thuộc về câu sau và thường chưa chắc chắn, còn tên phần mềm thì người nghe không cần để hiểu con số.",
      },
      {
        question:
          "Doanh thu tuần này là 120 triệu, tuần trước là 100 triệu (số liệu minh hoạ). Câu nào mô tả đúng?",
        options: [
          "Tăng 20 triệu, tức 20% so với tuần trước",
          "Tăng 120% (= 120 ÷ 100, quên trừ phần gốc)",
          "Tăng 16,7% (= 20 ÷ 120, chia cho số mới)",
          "Tăng 20 triệu nhưng chưa nói được là nhiều hay ít nên bỏ qua",
        ],
        correct: 0,
        explanation:
          "Mức tăng là 120 − 100 = 20 triệu, chia cho số gốc 100 được 20%. Chia 120 cho 100 ra 1,2 lần, không phải tăng 120%. Chia 20 cho 120 là lấy sai mẫu số, phải chia cho số của tuần trước. Bỏ qua thì bỏ mất mốc so sánh, thứ làm con số có nghĩa.",
      },
      {
        question: "Câu thứ ba, 'cần làm gì', tốt nhất là câu nào?",
        options: [
          "Đề nghị một việc có người làm và hạn cụ thể",
          "Kêu gọi cả nhóm cố gắng hơn nữa trong thời gian tới",
          "Nêu nhận định chung rằng tình hình cần theo dõi thêm",
          "Nhắc lại con số đã nói ở câu đầu",
        ],
        correct: 0,
        explanation:
          "Một đề nghị có tên người và hạn thì buổi họp có thể đồng ý hoặc phản đối ngay. Lời kêu gọi chung chung không ai nhận việc, 'theo dõi thêm' không phải hành động và nhắc lại con số chỉ kéo dài buổi họp mà không thêm gì.",
      },
      {
        question: "Bạn nhờ AI viết ba câu kể cho biểu đồ. Trước khi đọc trong họp, bạn cần làm gì?",
        options: [
          "Đối chiếu từng con số trong câu với bảng gốc",
          "Đọc một lần cho trôi chảy rồi thuộc lòng",
          "Thêm thật nhiều tính từ để câu nghe thuyết phục",
          "Kéo dài thành mười câu để không bỏ sót ý nào",
        ],
        correct: 0,
        explanation:
          "AI viết câu nghe hợp lý nhưng con số có thể lệch hoặc bịa, nên phải dò lại với bảng gốc. Đọc cho trôi chảy không bắt được số sai, tính từ thêm vào làm câu phóng đại hơn dữ liệu, và mười câu phá mục tiêu ngắn gọn cho hai phút.",
      },
    ],
    keyTakeaways: [
      "Kể biểu đồ trong ba câu: điều đang xảy ra, vì sao đáng chú ý, cần làm gì.",
      "Con số luôn đi kèm một mốc so sánh.",
      "Câu cuối là hành động có người và có hạn.",
      "AI giúp gọt câu chữ, còn con số bạn tự đối chiếu với bảng gốc.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nhờ AI viết lời kể cho biểu đồ và nhận về năm câu hay nhưng không có việc cần làm. Nên nhờ thêm gì?",
      options: [
        "Bổ sung một câu đề nghị có người làm và hạn cụ thể",
        "Viết lại bằng giọng thật cảm xúc để người nghe nhớ lâu",
        "Thêm hai đoạn lịch sử của công ty vào phần mở đầu báo cáo",
        "Đổi sang biểu đồ màu khác để lời kể nghe thuyết phục hơn",
      ],
      correct: 0,
      explanation:
        "Thiếu phần kết là thiếu việc cần làm, nên cần đúng câu đó. Giọng cảm xúc không thay cho đề nghị. Lịch sử công ty kéo dài phần mở mà không giúp quyết định, còn đổi màu biểu đồ không liên quan gì tới phần kể còn thiếu.",
    },
    summary: {
      keyIdea: "Biểu đồ cho người nghe thấy, lời kể cho họ biết phải nghĩ gì và làm gì.",
      formula: "Điều đang xảy ra (có mốc) + vì sao đáng chú ý + việc cần làm (ai, khi nào) = ba câu cho buổi họp.",
      commonMistake: "Đọc lần lượt từng cột, hoặc chiếu im lặng rồi để mỗi người tự hiểu.",
      action: "Chọn một biểu đồ bạn sắp trình bày và viết đúng ba câu cho nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biểu đồ bạn đang dùng trong công việc (hoặc vẽ nhanh từ bảng của bạn). Viết ba câu: điều đang xảy ra có con số và mốc so sánh, vì sao đáng chú ý, và một việc cần làm có tên người và hạn. Đọc thành tiếng, bấm giờ, cố gắng dưới 60 giây.",
      secondary: "Ghi lại câu nào bạn vấp nhất khi đọc để ngày mai gọt lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Tư, mười giờ sáng, màn hình hiện biểu đồ của bạn và cả phòng đang nhìn. Bạn có hai phút. Bài này dạy cách biến biểu đồ thành ba câu kể để ai nghe xong cũng hiểu cùng một ý và biết việc tiếp theo.",
      },
      {
        type: "feynman",
        title: "Kể biểu đồ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn kể cho người thân nghe chuyện đi khám về: bạn không đọc toàn bộ phiếu kết quả, bạn nói chuyện gì xảy ra, điều đáng lo hay không, và bước tiếp theo là gì. Kể biểu đồ cũng đúng ba bước như vậy.",
        columns: ["Phần", "Kể chuyện đi khám", "Kể biểu đồ"],
        rows: [
          ["Đầu", "Hôm nay bác sĩ nói gì", "Điều đang xảy ra, có con số và mốc so sánh"],
          ["Giữa", "Điều đó đáng lo hay không", "Vì sao đáng chú ý với người nghe"],
          ["Kết", "Tuần sau phải làm gì", "Việc cần làm, ai làm, khi nào"],
        ],
        oneLiner: "Đừng đọc lại biểu đồ, hãy kể điều nó có nghĩa và việc phải làm tiếp.",
      },
      { type: "heading", text: "Vì sao đọc từng cột là cách kể tệ nhất" },
      {
        type: "paragraph",
        text: "Người nghe đã nhìn thấy các cột, họ không cần bạn đọc lại. Điều họ không nhìn thấy là ý nghĩa: cột nào quan trọng, nó có tốt hay xấu, và họ phải làm gì. Một con số chỉ có nghĩa khi đặt cạnh mốc so sánh như tuần trước hay chỉ tiêu, nên câu đầu luôn có một con số và một mốc.",
      },
      {
        type: "flow",
        title: "Từ biểu đồ tới ba câu kể",
        steps: [
          { label: "Tìm một điều nổi bật", detail: "Nhìn biểu đồ và chọn một điều thôi: cột cao nhất, chỗ tụt xuống hoặc chỗ khác thường. Chọn hai điều là hai bài kể." },
          { label: "Viết câu đầu: điều đang xảy ra", detail: "Một con số và một mốc so sánh. Ví dụ: số cuộc gọi tuần này cao hơn tuần trước." },
          { label: "Viết câu giữa: vì sao đáng chú ý", detail: "Nói điều đó ảnh hưởng gì tới người nghe. Nếu chưa biết nguyên nhân thì nói rõ là chưa biết." },
          { label: "Viết câu kết: việc cần làm", detail: "Một đề nghị có tên người và hạn. Đây là câu khiến buổi họp có kết quả." },
          { label: "Đối chiếu số rồi đọc thành tiếng", detail: "Dò từng con số với bảng gốc, rồi đọc to và bấm giờ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết ba câu kể",
        task: "Bạn có biểu đồ số cuộc gọi chăm sóc khách hàng theo tuần và hai phút để trình bày. Lắp prompt để AI viết ba câu kể dùng được.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa cho AI",
            options: [
              { text: "Viết lời kể cho biểu đồ cuộc gọi của tôi.", feedback: "AI không thấy số nào nên tự bịa con số và xu hướng cho đủ câu." },
              { text: "Dán bảng số cuộc gọi 6 tuần gần nhất và ghi rõ đây là số của tôi.", good: true, feedback: "Có số thật trong tay, AI chỉ việc kể lại điều có trong bảng." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thật hấp dẫn, càng nhiều ý càng tốt.", feedback: "Không có khuôn thì ra một đoạn dài, nhiều ý rời rạc, không có việc cần làm." },
              { text: "Đúng ba câu: điều đang xảy ra có mốc so sánh, vì sao đáng chú ý, một việc cần làm.", good: true, feedback: "Khuôn rõ nên mỗi câu có một việc, vừa hai phút trình bày." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu không biết nguyên nhân thì cứ đoán cho hợp lý.", feedback: "AI sẽ nêu một nguyên nhân nghe chắc chắn mà bảng không hề chứng minh." },
              { text: "Chỉ dùng số trong bảng; chưa biết nguyên nhân thì ghi là chưa biết.", good: true, feedback: "AI không được bịa nguyên nhân, và người nghe biết phần nào đã chắc, phần nào chưa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "shape", "limit"],
            text: "1) Số cuộc gọi tuần này cao hơn tuần trước, và cao nhất trong sáu tuần.\n2) Nguyên nhân chưa rõ, nhưng hai buổi chiều bị quá tải khiến khách phải chờ lâu.\n3) Đề nghị xếp thêm một người trực vào chiều thứ Ba và thứ Năm, bắt đầu từ tuần sau.",
          },
          {
            requires: ["data", "shape"],
            text: "1) Số cuộc gọi tăng mạnh.\n2) Nguyên nhân là chiến dịch khuyến mãi vừa rồi.\n3) Cần cải thiện dịch vụ.\n\n(Đủ ba câu nhưng AI tự nêu nguyên nhân chưa ai xác nhận và câu kết chung chung.)",
          },
          {
            text: "Biểu đồ cho thấy một xu hướng thú vị trong chăm sóc khách hàng. Lượng cuộc gọi đã tăng khoảng 35% nhờ thương hiệu ngày càng mạnh...\n\n(AI không có số nên bịa cả phần trăm lẫn nguyên nhân.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kể có đầu, giữa, kết",
          text: "Cả phòng hiểu cùng một ý trong chưa tới một phút. Có con số và mốc để so sánh. Câu cuối cho họp một việc để đồng ý hoặc phản đối. Dễ đối chiếu số vì chỉ có vài con số.",
        },
        right: {
          label: "Chiếu biểu đồ rồi đọc hoặc im lặng",
          text: "Mỗi người đọc ra một ý khác. Thời gian bị tốn vào các cột nhỏ. Không ai biết việc tiếp theo, và buổi họp phải họp lại.",
        },
      },
      {
        type: "callout",
        label: "Chưa biết nguyên nhân thì nói là chưa biết",
        text: "Câu giữa là chỗ dễ bịa nhất vì ai cũng muốn có lời giải thích. Hãy nói điều bảng cho thấy và điều còn phải hỏi thêm. Bài sau sẽ dạy riêng kỹ năng này.",
      },
      {
        type: "scenario",
        title: "Hai phút trong buổi họp thứ Tư",
        start: "s1",
        nodes: {
          s1: {
            text: "Biểu đồ số cuộc gọi đã hiện trên màn hình. Sếp nhìn đồng hồ và nói: 'Hai phút nhé.'",
            choices: [
              { label: "Đọc từng tuần: tuần một bao nhiêu, tuần hai bao nhiêu...", next: "bad_read" },
              { label: "Nói một câu điều đang xảy ra kèm con số và mốc so sánh", next: "s2" },
            ],
          },
          bad_read: {
            text: "Sau một phút rưỡi bạn mới đọc tới tuần thứ tư. Sếp ngắt lời, hỏi 'vậy kết luận là gì' và bạn hết giờ mà chưa đề nghị được gì.",
            ending: "bad",
          },
          s2: {
            text: "Cả phòng gật đầu, đã hiểu chuyện gì xảy ra. Còn một phút rưỡi.",
            choices: [
              { label: "Nêu luôn nguyên nhân bạn đoán là chắc chắn vì nghe hợp lý", next: "bad_guess" },
              { label: "Nói vì sao đáng chú ý, rồi đề nghị một việc có người và hạn", next: "good" },
            ],
          },
          bad_guess: {
            text: "Bạn nêu nguyên nhân là chiến dịch khuyến mãi. Một đồng nghiệp nói chiến dịch đó chưa chạy, và cả phòng bắt đầu nghi ngờ các con số còn lại của bạn.",
            ending: "bad",
          },
          good: {
            text: "Bạn đề nghị xếp thêm một người trực hai buổi chiều. Sếp đồng ý ngay và giao bạn gửi lịch trong ngày. Buổi họp kết thúc sớm.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhìn biểu đồ và chọn đúng một điều nổi bật.",
          "Bước 2 - Viết ba câu theo thứ tự đầu, giữa, kết.",
          "Bước 3 - Nhờ AI gọt câu nếu muốn, nhưng không để nó thêm số.",
          "Bước 4 - Đối chiếu từng con số với bảng gốc, rồi đọc to và bấm giờ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Biểu đồ để người ta nhìn, lời kể để người ta hiểu và hành động.",
          "Bài sau: khi số tụt mà chưa biết vì sao, cách viết điều chưa biết thay vì đoán.",
        ],
      },
    ],
  },
  {
    id: 2656,
    slug: "nhan-ra-so-lieu-thieu-gia-thich-truoc-khi-noi-nguyen-nhan",
    title: "Chặng 62, Bài 17: Số tụt nhưng chưa biết vì sao: viết điều chưa biết thay vì đoán",
    subtitle: "Sếp đòi lý do: tách điều số liệu cho thấy và điều còn phải hỏi thêm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Doanh thu giảm, sếp hỏi ngay 'tại sao?' và bạn muốn có câu trả lời. Nhưng một lý do đoán mà nói như chắc chắn có thể dẫn cả nhóm đi sửa sai chỗ. Nói rõ điều số liệu cho thấy và điều chưa biết vừa trung thực, vừa cho sếp biết cần hỏi ai tiếp.",
    openingQuestion:
      "Chiều thứ Năm sếp nhắn: 'Doanh thu tuần này giảm, tại sao vậy em?' Bạn mới có bảng số, chưa hỏi ai. Câu trả lời nào đúng nhất?",
    openingOptions: [
      "Nói điều số liệu cho thấy, rồi nêu điều cần hỏi thêm",
      "Chọn một lý do nghe hợp lý nhất và nói như đã chắc chắn",
      "Hứa tuần sau số sẽ tăng lại rồi tính tiếp",
      "Nói chưa biết gì cả và xin sếp đừng hỏi thêm",
    ],
    correctOption: 0,
    explanation:
      "Số liệu trả lời được 'cái gì giảm, giảm ở đâu, giảm bao nhiêu', còn 'vì sao' thường cần thêm thông tin từ người khác. Tách hai phần cho sếp biết bạn chắc điều gì và cần hỏi ai. Đoán một lý do rồi nói chắc có thể khiến cả nhóm sửa sai chỗ. Hứa tuần sau tăng là lời hứa không có căn cứ. Nói chưa biết gì cả bỏ phí những điều bảng số đã cho thấy.",
    diagram: [
      { label: "Liệt kê điều bảng số cho thấy", arrow: true },
      { label: "Liệt kê các giả thuyết có thể giải thích", arrow: true },
      { label: "Ghi mỗi giả thuyết cần hỏi ai hoặc xem số nào", arrow: true },
      { label: "Báo sếp: đã biết gì, chưa biết gì, bước kiểm tiếp theo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chủ cửa hàng thấy doanh thu tuần giảm. Thay vì kết luận ngay là do trời mưa, anh nhìn bảng và thấy số đơn giảm ở cả hai cửa hàng nhưng chỉ một cửa hàng đổi lịch giao. Anh ghi điều đã thấy, ghi ba điều cần hỏi (lịch giao, hàng hết, khuyến mãi tuần trước) rồi mới báo nhóm.",
    },
    quiz: [
      {
        question: "Sếp hỏi 'sao doanh thu tuần này giảm?'. Bạn mới có bảng số. Trả lời thế nào?",
        options: [
          "Nói điều số liệu cho thấy, rồi liệt kê điều cần hỏi thêm",
          "Chọn nguyên nhân có vẻ hợp lý nhất và nói như chắc chắn",
          "Xin lỗi và hứa tuần sau số sẽ tăng trở lại",
          "Nói chưa biết gì cả và xin sếp đừng hỏi thêm nữa",
        ],
        correct: 0,
        explanation:
          "Trả lời thật là cho sếp biết điều chắc chắn và điều cần tìm. Nguyên nhân đoán nghe chắc nhưng chưa được bảng chứng minh. Lời hứa tăng lại không dựa trên dữ kiện nào, còn 'chưa biết gì cả' bỏ đi phần số liệu bạn đã có.",
      },
      {
        question: "Câu nào là điều số liệu CHO THẤY, không phải suy đoán?",
        options: [
          "Đơn hàng giảm ở cả ba chi nhánh",
          "Khách giảm mua vì đối thủ vừa hạ giá bán",
          "Chiến dịch quảng cáo tuần trước kém hiệu quả",
          "Nhân viên bán hàng làm việc kém tích cực hơn",
        ],
        correct: 0,
        explanation:
          "'Giảm ở cả ba chi nhánh' đọc thẳng được từ bảng. Ba câu còn lại đều nêu nguyên nhân (đối thủ, quảng cáo, nhân viên) mà bảng số đơn hàng không chứa, nên chúng là giả thuyết cần kiểm chứ chưa phải sự thật.",
      },
      {
        question: "Vì sao hai sự việc xảy ra cùng lúc chưa chứng minh cái này gây ra cái kia?",
        options: [
          "Có thể có yếu tố thứ ba gây ra cả hai, hoặc chỉ là trùng hợp",
          "Vì biểu đồ chỉ vẽ được một đường trong mỗi lần",
          "Vì hai sự việc luôn độc lập với nhau theo quy luật",
          "Vì số liệu ít hơn 100 dòng thì không được dùng",
        ],
        correct: 0,
        explanation:
          "Cùng lúc chỉ cho biết chúng đi chung, không cho biết cái nào gây ra cái nào. Biểu đồ có thể vẽ nhiều đường. Hai sự việc không phải lúc nào cũng độc lập, và không có mốc 100 dòng nào quyết định được chuyện nhân quả.",
      },
      {
        question: "Bạn thấy tuần thứ ba trong bảng bị trống một cột số. Bạn nên làm gì?",
        options: [
          "Ghi rõ dữ liệu còn thiếu và hỏi ai có thể cung cấp",
          "Điền tạm số trung bình của các tuần trước vào ô thiếu",
          "Bỏ tuần thiếu khỏi biểu đồ mà không ghi chú gì",
          "Chờ đủ dữ liệu mới nói với sếp dù mất cả tháng",
        ],
        correct: 0,
        explanation:
          "Ghi chú chỗ thiếu giúp người đọc biết độ tin cậy và biết ai cần bổ sung. Điền số trung bình tạo ra số không có thật. Lặng lẽ bỏ tuần đó làm biểu đồ đẹp hơn sự thật, còn chờ cả tháng khiến sếp không có gì để quyết định.",
      },
      {
        question: "Câu trả lời nào diễn đạt đúng điều chưa biết?",
        options: [
          "Số giảm ở ba nơi; nguyên nhân chưa rõ, tôi sẽ hỏi thêm",
          "Chắc chắn là do mùa thấp điểm nên tôi không kiểm thêm nữa",
          "Có lẽ do giá, tôi ghi vào báo cáo như sự thật",
          "Nguyên nhân là thời tiết vì tuần trước trời mưa nhiều",
        ],
        correct: 0,
        explanation:
          "Câu đúng tách điều thấy, điều chưa biết và bước tiếp theo. Hai câu dùng 'chắc chắn' và 'như sự thật' biến giả thuyết thành kết luận, còn câu về thời tiết lấy một trùng hợp làm nguyên nhân mà chưa hề kiểm tra.",
      },
    ],
    keyTakeaways: [
      "Bảng số trả lời 'cái gì, ở đâu, bao nhiêu'; 'vì sao' thường cần thêm thông tin.",
      "Mỗi nguyên nhân dự đoán là giả thuyết, cần nói rõ cách kiểm.",
      "Dữ liệu thiếu thì ghi ra, đừng lấp bằng số trung bình.",
      "Nói 'chưa biết, sẽ kiểm bằng cách này' là câu trả lời chuyên nghiệp.",
    ],
    practicePrompt: {
      question:
        "Bảng cho thấy số khách mới giảm, nhưng bạn chưa có số chi tiêu quảng cáo. Bạn viết gì vào báo cáo?",
      options: [
        "Số khách mới giảm; chưa có số quảng cáo nên chưa kết luận",
        "Số khách mới giảm vì quảng cáo hoạt động kém hiệu quả",
        "Số khách mới giảm nhưng đây chỉ là biến động ngẫu nhiên thông thường",
        "Bỏ dòng khách mới khỏi báo cáo vì chưa giải thích được",
      ],
      correct: 0,
      explanation:
        "Báo cáo nên nêu điều thấy và điều còn thiếu. Kết luận quảng cáo kém hay biến động ngẫu nhiên đều chưa có dữ kiện, còn bỏ dòng số khách đi là giấu đúng điều sếp cần biết.",
    },
    summary: {
      keyIdea: "Nói rõ phần số liệu chứng minh và phần còn là giả thuyết, vì sếp quyết định dựa vào độ chắc của từng phần.",
      formula: "Điều bảng cho thấy + điều chưa biết + cách kiểm tiếp theo = câu trả lời trung thực.",
      commonMistake: "Chọn một lý do nghe hợp lý rồi nói như đã chắc chắn.",
      action: "Lần tới khi số tụt, viết ba dòng: đã thấy, chưa biết, sẽ hỏi ai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một con số trong công việc của bạn vừa tăng hoặc giảm bất thường. Viết ba danh sách ngắn: điều bảng cho thấy, ba giả thuyết có thể giải thích, và với mỗi giả thuyết thì cần hỏi ai hoặc xem số nào. Gửi ba danh sách đó cho đồng nghiệp liên quan.",
      secondary: "Ghi lại giả thuyết nào bạn nghĩ đúng nhất trước khi kiểm để sau này so lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhắn giữa chiều thứ Năm: doanh thu giảm, tại sao? Bạn có bảng số nhưng chưa có lời giải thích. Bài này dạy cách trả lời trung thực mà vẫn hữu ích: nói điều số liệu cho thấy và điều còn phải hỏi.",
      },
      {
        type: "feynman",
        title: "Điều chưa biết đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn gọi điện cho thợ sửa điện và nói 'cầu dao nhảy'. Bạn mô tả điều đã thấy, không khẳng định nguyên nhân. Thợ hỏi thêm vài câu rồi mới kết luận. Báo cáo số liệu cũng vậy: điều thấy trước, nguyên nhân sau khi đã kiểm.",
        columns: ["Phần", "Gọi thợ điện", "Báo cáo số liệu"],
        rows: [
          ["Điều thấy", "Cầu dao nhảy, đèn bếp tắt", "Đơn hàng giảm ở cả ba chi nhánh"],
          ["Điều chưa biết", "Do bếp hay do dây", "Do giá, hàng hết hay lịch giao"],
          ["Bước kiểm", "Rút từng thiết bị thử", "Hỏi từng chi nhánh, xem số tồn kho"],
        ],
        oneLiner: "Nói điều đã thấy trước, nguyên nhân chỉ khi đã kiểm.",
      },
      { type: "heading", text: "Số liệu cho thấy cái gì, không cho thấy cái gì" },
      {
        type: "paragraph",
        text: "Một bảng doanh thu cho biết giảm bao nhiêu, ở chi nhánh nào, từ tuần nào. Nó không cho biết khách giảm mua vì giá, vì hàng hết hay vì đối thủ: những điều đó nằm ở nơi khác. Khi hai sự việc xảy ra cùng lúc, còn có thể có một yếu tố thứ ba gây ra cả hai hoặc chỉ là trùng hợp. Vì vậy mọi câu bắt đầu bằng 'vì' cần được xem là giả thuyết cho tới khi kiểm.",
      },
      {
        type: "flow",
        title: "Từ con số tụt tới câu trả lời cho sếp",
        steps: [
          { label: "Ghi điều bảng cho thấy", detail: "Giảm bao nhiêu, ở đâu, từ khi nào, so với mốc nào. Chỉ dùng chữ có trong bảng." },
          { label: "Liệt kê giả thuyết", detail: "Nghĩ ra ba bốn lý do có thể: giá, hàng hết, lịch, mùa vụ. Đây là danh sách cần kiểm, chưa phải kết luận." },
          { label: "Gắn cách kiểm cho từng giả thuyết", detail: "Mỗi giả thuyết cần hỏi ai hoặc xem số nào: ví dụ hỏi kho về hàng hết, hỏi kinh doanh về giá." },
          { label: "Đánh dấu dữ liệu còn thiếu", detail: "Tuần nào trống, chi nhánh nào chưa gửi số. Ghi rõ thay vì lấp bằng số trung bình." },
          { label: "Báo sếp theo ba phần", detail: "Đã thấy gì, chưa biết gì, bao giờ có câu trả lời." },
        ],
      },
      {
        type: "callout",
        label: "Một câu nên nói thành thói quen",
        text: "'Số cho thấy... nguyên nhân thì tôi chưa biết; tôi sẽ kiểm bằng cách... và báo lại vào ngày...'. Câu này vừa trung thực vừa cho sếp thấy bạn đang xử lý.",
      },
      {
        type: "comparison",
        left: {
          label: "Tách điều thấy và điều chưa biết",
          text: "Sếp biết phần nào chắc để quyết định ngay, phần nào cần chờ. Nếu giả thuyết sai thì chưa ai sửa nhầm chỗ. Bạn được tin ở những lần sau vì luôn nói đúng mức độ chắc chắn.",
        },
        right: {
          label: "Nói một lý do như chắc chắn",
          text: "Nghe xong việc nhanh nhưng dễ đi sửa sai chỗ. Khi lý do bị phản bác, các con số khác của bạn cũng bị nghi ngờ. Điều cần hỏi thêm bị quên mất.",
        },
      },
      {
        type: "scenario",
        title: "Chiều thứ Năm: sếp hỏi vì sao doanh thu giảm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng cho thấy số đơn giảm ở cả ba chi nhánh so với tuần trước. Sếp nhắn: 'Nguyên nhân là gì? Họp lúc 4 giờ, anh cần nói với giám đốc.'",
            choices: [
              { label: "Nhắn: 'Chắc do đối thủ hạ giá', vì nghe hợp lý nhất", next: "bad_guess" },
              { label: "Nhắn: số giảm ở cả ba chi nhánh, nguyên nhân chưa rõ, bạn sẽ hỏi ngay", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Sếp báo giám đốc là do đối thủ hạ giá. Sau đó phòng kinh doanh cho biết đối thủ không đổi giá mà kho hết hàng hai mặt hàng chủ lực. Sếp mất uy tín trước giám đốc và bạn là người cung cấp lý do đó.",
            ending: "bad",
          },
          s2: {
            text: "Sếp trả lời 'Ok, em hỏi ai trước?'. Bạn còn hai tiếng và bốn giả thuyết.",
            choices: [
              { label: "Hỏi kho và kinh doanh về hai giả thuyết dễ kiểm nhất, báo sếp kết quả trước 4 giờ", next: "good" },
              { label: "Điền tạm số trung bình cho chi nhánh thiếu số và kết luận luôn", next: "bad_fill" },
            ],
          },
          bad_fill: {
            text: "Số trung bình làm biểu đồ trông nhẹ hơn thực tế. Giám đốc hỏi sao chi nhánh đó ít giảm, và không ai trả lời được vì số ấy không có thật.",
            ending: "bad",
          },
          good: {
            text: "Kho báo hai mặt hàng chủ lực hết từ đầu tuần. Sếp nói với giám đốc: 'Số giảm ở cả ba nơi; một nguyên nhân đã xác nhận là hết hàng, hai giả thuyết khác đang kiểm.' Cuộc họp kết thúc êm.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết điều bảng cho thấy, không chứa chữ 'vì'.",
          "Bước 2 - Liệt kê ba bốn giả thuyết và cách kiểm từng cái.",
          "Bước 3 - Đánh dấu dữ liệu thiếu, không lấp bằng số trung bình.",
          "Bước 4 - Báo sếp đã biết gì, chưa biết gì và bao giờ có thêm.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Giả thuyết là việc cần kiểm, không phải sự thật để báo cáo.",
          "Bài sau: khi AI viết nhận xét dưới biểu đồ, đối chiếu từng con số.",
        ],
      },
    ],
  },
  {
    id: 2657,
    slug: "ai-viet-nhan-xet-duoi-bieu-do-doi-chieu-tung-con-so",
    title: "Chặng 62, Bài 18: AI viết nhận xét dưới biểu đồ: đối chiếu từng con số",
    subtitle: "Dán số liệu và nhận xét AI viết, đánh dấu câu bịa hoặc làm tròn lệch.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI viết nhận xét dưới biểu đồ rất nhanh và câu nào cũng trôi chảy. Nhưng câu trôi chảy không có nghĩa là đúng: nó có thể làm tròn lệch, tính sai phần trăm, hoặc thêm nguyên nhân mà bảng không hề có. Một lần đối chiếu từng con số trước khi gửi giữ cho báo cáo của bạn đáng tin.",
    openingQuestion:
      "AI vừa viết xong bốn câu nhận xét dưới biểu đồ doanh thu của bạn, đọc rất mượt. Sếp sẽ nhận báo cáo sau mười phút nữa. Bạn làm gì trước khi gửi?",
    openingOptions: [
      "Dò từng con số trong nhận xét với bảng số liệu gốc",
      "Đọc lướt xem câu văn có mạch lạc và thuyết phục không",
      "Hỏi lại AI xem nó có chắc không rồi tin câu trả lời",
      "Kiểm con số đầu tiên vì các số sau thường giống nó",
    ],
    correctOption: 0,
    explanation:
      "AI dự đoán chữ nghe hợp lý, nên một con số sai vẫn nằm trong câu rất mượt. Cách kiểm chắc chắn là lấy từng con số và từng khẳng định dò lại với bảng gốc. Đọc lướt xem văn có mượt chỉ kiểm được cách viết chứ không kiểm được sự thật. Hỏi lại AI nó có chắc không thì nó thường khẳng định lại. Chỉ kiểm con số đầu thì bỏ sót các số sau, nơi lỗi làm tròn thường nằm.",
    diagram: [
      { label: "Dán bảng số gốc cùng nhận xét của AI", arrow: true },
      { label: "Gạch chân mọi con số và mọi lời giải thích", arrow: true },
      { label: "Dò từng con số với bảng, tính lại phần trăm", arrow: true },
      { label: "Đánh dấu câu sai, ghi lý do, sửa rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh nhờ AI viết nhận xét cho biểu đồ doanh số quý. AI viết 'tăng gần 50% so với tháng trước', nhưng bảng chỉ ghi 40 lên 46. Khi tính lại, chị thấy mức tăng là 15%. Chị sửa câu và hỏi lại AI vì sao nó viết vậy, đồng thời bỏ thêm một câu nói đến 'nhờ chiến dịch' mà bảng không hề nhắc.",
    },
    quiz: [
      {
        question: "Khi AI viết nhận xét dưới biểu đồ, cách đối chiếu nào đúng?",
        options: [
          "Lấy từng con số trong nhận xét, dò lại với bảng số liệu gốc",
          "Đọc xem câu văn có mạch lạc và nghe thuyết phục không",
          "Hỏi lại chính AI xem nó có chắc không rồi tin câu trả lời",
          "Chỉ kiểm con số đầu tiên vì các số sau thường giống",
        ],
        correct: 0,
        explanation:
          "Dò từng số với bảng gốc là cách duy nhất biết số đó có thật. Văn mượt không chứng minh gì về sự thật, AI được hỏi lại thường khẳng định lại điều đã viết, và lỗi có thể nằm ở con số thứ hai hay thứ ba chứ không chỉ con số đầu.",
      },
      {
        question:
          "Bảng ghi tháng 3 là 40 và tháng 4 là 46 (số liệu minh hoạ). AI viết 'tăng gần 50%'. Mức tăng đúng là bao nhiêu?",
        options: [
          "Tăng 15% (= 6 ÷ 40)",
          "Tăng 13% (= 6 ÷ 46, chia cho số mới)",
          "Tăng 6% (= lấy luôn số chênh lệch làm phần trăm)",
          "Tăng 115% (= 46 ÷ 40, quên trừ phần gốc)",
        ],
        correct: 0,
        explanation:
          "Chênh lệch là 46 − 40 = 6, chia cho số gốc 40 ra 15%. Chia cho 46 là lấy sai mẫu số. Lấy 6 làm phần trăm bỏ qua việc chia cho gốc, còn 46 ÷ 40 = 1,15 lần, nghĩa là tăng 15% chứ không phải 115%.",
      },
      {
        question: "Dấu hiệu nào cho thấy câu nhận xét của AI có thể bịa?",
        options: [
          "Nêu nguyên nhân mà bảng không hề có",
          "Dùng câu văn dài và có nhiều dấu phẩy ở giữa",
          "Nhắc cả hai con số đầu và cuối của biểu đồ",
          "Viết số có phần thập phân thay vì số tròn",
        ],
        correct: 0,
        explanation:
          "Nguyên nhân hay lý do không có trong bảng là thứ AI dễ thêm vào cho câu có vẻ hoàn chỉnh. Câu dài, nhắc số đầu và cuối, hay dùng số thập phân đều không phải dấu hiệu bịa; chúng vẫn có thể hoàn toàn đúng với bảng.",
      },
      {
        question: "Bạn bôi dấu một câu là bịa. Bạn cần làm gì tiếp?",
        options: [
          "Ghi lý do: số nào không khớp hoặc thiếu nguồn nào",
          "Xoá câu đó đi mà không cần ghi lại vì sao",
          "Giữ câu đó và thêm chữ 'theo AI' vào đầu",
          "Nhờ AI viết lại câu đó cho nghe hợp lý hơn rồi dùng",
        ],
        correct: 0,
        explanation:
          "Ghi lý do giúp bạn sửa đúng chỗ và dặn AI lần sau. Xoá lặng lẽ thì lần sau lỗi lặp lại. Thêm 'theo AI' không làm câu sai thành đúng, và nhờ AI viết lại cho hợp lý chỉ tạo một câu bịa khác nghe mượt hơn.",
      },
      {
        question: "Nhận xét đúng số nhưng viết 'tăng vọt' cho mức tăng 3%. Vấn đề là gì?",
        options: [
          "Từ ngữ phóng đại hơn điều con số thể hiện",
          "Con số sai nên phải tính lại toàn bộ bảng",
          "Thiếu đơn vị đo ở cuối câu nên người đọc khó hiểu được",
          "Câu quá ngắn nên cần thêm nguyên nhân để đủ ý",
        ],
        correct: 0,
        explanation:
          "Số vẫn đúng, nhưng 'vọt' làm người đọc tưởng mức tăng lớn hơn thật. Không cần tính lại bảng, đơn vị không phải vấn đề ở đây, và thêm nguyên nhân để câu dài ra chỉ làm tăng nguy cơ bịa.",
      },
    ],
    keyTakeaways: [
      "Câu mượt không có nghĩa là đúng: dò từng con số với bảng gốc.",
      "Tính lại phần trăm bằng chênh lệch chia cho số gốc.",
      "Nguyên nhân không có trong bảng là dấu hiệu nên nghi nhất.",
      "Từ phóng đại ('vọt', 'sụp') cũng là một kiểu sai.",
    ],
    practicePrompt: {
      question:
        "AI viết 'chi phí tăng 10%' nhưng bảng ghi 200 lên 210 triệu (số liệu minh hoạ). Bạn kết luận gì?",
      options: [
        "Đúng: chênh 10 triệu chia cho gốc 200 bằng 5%, nên câu sai",
        "Đúng: 210 − 200 = 10 nên tăng 10%",
        "Đúng: lấy 10 triệu chia 210 ra gần 5%, câu của AI vẫn chấp nhận được",
        "Không kết luận được vì AI không cho biết nguồn dữ liệu",
      ],
      correct: 0,
      explanation:
        "Chênh lệch 10 triệu chia cho số gốc 200 là 5%, nên 'tăng 10%' là sai. Lấy thẳng 10 làm phần trăm bỏ bước chia cho gốc, chia cho 210 là sai mẫu số, và bảng đã đủ để kết luận mà không cần thêm nguồn.",
    },
    summary: {
      keyIdea: "AI viết nhận xét rất nhanh; việc đối chiếu từng con số vẫn là của bạn.",
      formula: "Mức tăng (%) = (số mới − số gốc) ÷ số gốc × 100.",
      commonMistake: "Tin câu nhận xét vì nó đọc mượt, không dò lại với bảng.",
      action: "Lần tới AI viết nhận xét, gạch chân từng con số và từng nguyên nhân rồi dò với bảng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biểu đồ kèm bảng số của bạn và nhờ AI viết bốn câu nhận xét. Dùng bút gạch chân mọi con số và mọi lời giải thích trong đó, dò từng cái với bảng. Ghi lại ít nhất một chỗ lệch (hoặc ghi 'không thấy lệch' nếu thật sự không có).",
      secondary: "Ghi lại loại lỗi AI hay mắc với bảng của bạn để dặn trong lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "AI viết bốn câu nhận xét dưới biểu đồ chỉ trong vài giây, câu nào cũng mượt. Bài này dạy cách đọc chúng như một kiểm toán viên: từng con số, từng lời giải thích đều phải có mặt trong bảng.",
      },
      {
        type: "feynman",
        title: "Đối chiếu nhận xét đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc kiểm hoá đơn điện thoại: bạn không đọc xem văn phong có hay không, bạn dò từng khoản với cuộc gọi thực tế. Nhận xét của AI cũng là một bản 'hoá đơn' cần dò khoản nào có thật, khoản nào tự thêm vào.",
        columns: ["Điều cần dò", "Hoá đơn điện thoại", "Nhận xét của AI"],
        rows: [
          ["Con số", "Số phút, số tiền từng khoản", "Từng con số và phần trăm trong câu"],
          ["Khoản lạ", "Dịch vụ bạn không đăng ký", "Nguyên nhân mà bảng không có"],
          ["Làm tròn", "Tổng bị làm tròn lệch", "'Gần 50%' cho mức tăng thật là 15%"],
        ],
        oneLiner: "Đọc nhận xét của AI như hoá đơn: khoản nào không khớp với bảng thì gạch.",
      },
      { type: "heading", text: "Ba kiểu lỗi AI hay mắc dưới biểu đồ" },
      {
        type: "list",
        items: [
          "Số bịa: một con số không có trong bảng, nhưng câu văn dùng nó rất tự nhiên.",
          "Tính lệch: phần trăm bị chia cho sai mẫu số hoặc làm tròn thành số gần đẹp hơn.",
          "Nguyên nhân thêm vào: lý do nghe hợp lý như 'nhờ chiến dịch' mà bảng không hề nhắc tới.",
        ],
      },
      {
        type: "flow",
        title: "Quy trình dò một bản nhận xét",
        steps: [
          { label: "Đặt bảng gốc cạnh nhận xét", detail: "Mở bảng số liệu ở một bên và bản nhận xét ở bên kia, để mắt chuyển qua lại dễ." },
          { label: "Gạch chân mọi con số và lời giải thích", detail: "Mỗi con số, mỗi từ chỉ xu hướng và mỗi chữ 'vì' đều là một khẳng định cần dò." },
          { label: "Dò số với bảng", detail: "Số có trong bảng không, đúng dòng đúng cột không. Tính lại phần trăm: chênh lệch chia cho số gốc." },
          { label: "Soi lời giải thích", detail: "Nguyên nhân có trong bảng hoặc tài liệu bạn cung cấp không. Nếu không thì đánh dấu là giả thuyết hoặc xoá." },
          { label: "Sửa rồi mới gửi", detail: "Ghi lý do từng chỗ sửa để lần sau dặn AI: 'chỉ dùng số trong bảng'." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm câu sai trong nhận xét của AI",
        task: "Bảng của bạn (số liệu minh hoạ): doanh thu tháng 3 là 40 triệu, tháng 4 là 46 triệu, cửa hàng B và C không có số riêng. Bấm vào các câu đáng ngờ rồi nộp.",
        segments: [
          { text: "Doanh thu tháng 4 đạt 46 triệu, cao hơn tháng 3 là 40 triệu." },
          { text: "Mức tăng vào khoảng gần 50%, một bước nhảy lớn so với mọi tháng trước.", error: "Mức tăng thật là 6 ÷ 40 = 15%, không phải gần 50%; 'mọi tháng trước' cũng không có trong bảng." },
          { text: "Mức tăng này nhờ chiến dịch khuyến mãi khai trương cửa hàng mới.", error: "Bảng không nhắc tới chiến dịch hay cửa hàng mới; đây là nguyên nhân AI tự thêm vào." },
          { text: "Bảng chưa có số riêng cho cửa hàng B và C nên chưa so sánh được từng cửa hàng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đối chiếu từng số với bảng",
          text: "Bắt được số bịa, phần trăm lệch và nguyên nhân thêm vào. Mất thêm vài phút nhưng báo cáo đáng tin. Bạn học được AI hay sai ở đâu để dặn lần sau.",
        },
        right: {
          label: "Đọc lướt vì câu văn đã mượt",
          text: "Nhanh hơn một chút nhưng lỗi đi thẳng vào báo cáo. Khi sếp hỏi con số đó ở đâu, bạn không có câu trả lời. Một lỗi nhỏ làm các con số đúng còn lại cũng bị nghi ngờ.",
        },
      },
      {
        type: "scenario",
        title: "Mười phút trước khi gửi báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đã viết bốn câu nhận xét, trong đó có câu 'tăng gần 50%'. Bảng của bạn ghi 40 triệu lên 46 triệu. Báo cáo phải gửi sau mười phút nữa.",
            choices: [
              { label: "Gửi luôn vì câu văn đã mượt và AI nghe rất tự tin", next: "bad_send" },
              { label: "Tính lại phần trăm từ bảng gốc trước khi gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp đọc 'gần 50%' và nhắc trong cuộc họp giám đốc. Một đồng nghiệp tính lại ra 15%. Sếp phải đính chính trước mọi người.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tính 6 ÷ 40 = 15%. Bạn thấy thêm một câu nói 'nhờ chiến dịch khuyến mãi' mà bảng không hề nhắc.",
            choices: [
              { label: "Sửa số thành 15% và xoá câu chiến dịch vì không có trong bảng", next: "good" },
              { label: "Sửa số thành 15% nhưng giữ câu chiến dịch cho báo cáo phong phú hơn", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Sếp hỏi chiến dịch nào, và bạn không trả lời được vì đó là điều AI tự thêm. Báo cáo bị coi là chưa kiểm kỹ.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi báo cáo với số đúng và không có nguyên nhân thừa. Sếp không có câu hỏi nào về nguồn số, và bạn lưu lại câu dặn AI 'chỉ dùng số trong bảng'.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nhận xét của AI là bản nháp, bảng số của bạn mới là sự thật.",
          "Bài sau: giao dashboard cho đồng nghiệp, ghi rõ nguồn, ngày cập nhật và giới hạn.",
        ],
      },
    ],
  },
  {
    id: 2658,
    slug: "giao-dashboard-cho-dong-nghiep-ghi-nguon-ngay-cap-nhat-va-gioi-han",
    title: "Chặng 62, Bài 19: Giao dashboard cho đồng nghiệp: ghi nguồn, ngày cập nhật, giới hạn",
    subtitle: "Một ghi chú ngắn để người nhận biết số từ đâu, cập nhật khi nào và không nên dùng vào việc gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dựng xong dashboard và gửi cho đồng nghiệp. Ba tuần sau họ dùng một con số cũ để chốt việc và hai người hiểu khác nhau về cùng một ô chỉ số. Một ghi chú ba dòng đi kèm (nguồn, ngày cập nhật, giới hạn) tránh được hầu hết những lần hiểu lầm đó.",
    openingQuestion:
      "Bạn sắp gửi dashboard cho ba đồng nghiệp ở phòng khác. Họ sẽ mở nó nhiều lần trong tháng mà không có bạn bên cạnh. Bạn đính kèm gì?",
    openingOptions: [
      "Ghi chú ngắn về nguồn số, ngày cập nhật và điều không nên dùng số vào",
      "Chỉ gửi đường dẫn vì dashboard đã tự giải thích đủ rồi",
      "Một bản hướng dẫn dài nhiều trang về cách vẽ từng biểu đồ",
      "Lời nhắn rằng số liệu đã được kiểm tra kỹ, hoàn toàn chính xác, cứ dùng",
    ],
    correctOption: 0,
    explanation:
      "Người nhận không có bạn bên cạnh để hỏi, nên ba thông tin cần có sẵn: số lấy từ đâu, cập nhật lần cuối khi nào, và số này không dùng được vào việc gì. Chỉ gửi đường dẫn để mỗi người tự đoán nguồn và độ mới. Hướng dẫn cách vẽ dài thì không ai đọc và không trả lời câu họ cần. Khẳng định hoàn toàn chính xác là lời hứa không ai kiểm được và nó làm họ chủ quan.",
    diagram: [
      { label: "Nguồn: số lấy từ tệp hay hệ thống nào", arrow: true },
      { label: "Ngày cập nhật: chốt số đến thời điểm nào", arrow: true },
      { label: "Giới hạn: số này chưa tính gì, không dùng để làm gì", arrow: true },
      { label: "Đầu mối: hỏi ai khi số có vẻ lệch" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên điều phối kho gửi dashboard tồn kho cho phòng mua hàng. Cô ghi ba dòng ở đầu trang: số lấy từ tệp kiểm kho thứ Hai, chốt lúc 8 giờ sáng, chưa gồm hàng đang về. Tuần sau phòng mua hàng thấy hàng 'sắp hết' nhưng nhớ dòng thứ ba nên hỏi cô trước khi đặt thêm, và tránh được việc đặt trùng.",
    },
    quiz: [
      {
        question: "Ghi chú kèm dashboard tối thiểu nên có gì?",
        options: [
          "Số lấy từ đâu, cập nhật khi nào, không dùng vào việc gì",
          "Tên người vẽ, màu chủ đạo và tên phần mềm đã dùng",
          "Lời giải thích từng công thức bằng ngôn ngữ lập trình",
          "Danh sách mọi người đã từng xem trang này",
        ],
        correct: 0,
        explanation:
          "Người nhận cần nguồn, độ mới và giới hạn để biết mình dùng số có đúng chỗ không. Tên người vẽ và màu sắc không giúp họ quyết định, công thức bằng ngôn ngữ lập trình nằm ngoài nhu cầu của người không làm dữ liệu, và danh sách người xem không nói gì về độ tin cậy của số.",
      },
      {
        question: "Vì sao phải ghi ngày cập nhật?",
        options: [
          "Để người nhận biết số còn mới hay đã cũ",
          "Để chứng minh bạn đã làm xong đúng hạn chót được giao",
          "Để hệ thống tự khoá bảng sau một khoảng thời gian",
          "Để biểu đồ tự đổi màu khi số liệu thay đổi nhiều",
        ],
        correct: 0,
        explanation:
          "Con số không có ngày giống như sữa không có hạn dùng: không ai biết còn dùng được không. Ngày cập nhật không liên quan hạn chót làm việc, việc khoá bảng hay đổi màu là chuyện kỹ thuật khác và không phải lý do của dòng ghi chú này.",
      },
      {
        question: "Dòng 'giới hạn' trong ghi chú nên viết điều gì?",
        options: [
          "Ghi việc số này chưa tính đến, như đơn hoàn trả",
          "Ghi rằng số liệu chắc chắn đúng để người nhận yên tâm",
          "Không ghi gì vì người xem tự hiểu được giới hạn",
          "Ghi tên người nhận để sau này biết ai chịu trách nhiệm",
        ],
        correct: 0,
        explanation:
          "Giới hạn là điều số chưa gồm hoặc không nên dùng vào. Khẳng định chắc chắn đúng là điều bạn không thể bảo đảm. Người xem không có bạn bên cạnh nên không tự đoán được giới hạn, và ghi tên người nhận không liên quan tới độ tin cậy của con số.",
      },
      {
        question: "Đồng nghiệp hỏi vì sao số của họ lệch với dashboard. Ghi chú nào giúp nhất?",
        options: [
          "Tên nguồn và cách tính, để hai bên tìm ra chỗ lệch",
          "Lời nhắn rằng số của bạn đã được kiểm tra rất kỹ",
          "Số điện thoại của bạn để họ gọi khi cần hỏi",
          "Đường dẫn tới thư mục chứa toàn bộ các bảng của cả phòng",
        ],
        correct: 0,
        explanation:
          "Khi hai số lệch nhau, việc đầu tiên là so nguồn và cách tính. Lời khẳng định đã kiểm kỹ không giúp tìm chỗ lệch. Số điện thoại có ích cho việc liên hệ nhưng không giải thích số, còn một thư mục đầy bảng làm họ khó tìm đúng nguồn hơn.",
      },
      {
        question:
          "Dashboard được cập nhật tay vào sáng thứ Hai, đồng nghiệp xem vào thứ Sáu. Ghi chú nên nói gì?",
        options: [
          "Số chốt đến sáng thứ Hai, chưa gồm các ngày sau đó",
          "Số cập nhật từng giờ nên luôn mới như hiện tại",
          "Số chốt đến thứ Sáu vì người xem mở vào hôm đó",
          "Số này mới nhất vì trang mở ra được bất kỳ lúc nào",
        ],
        correct: 0,
        explanation:
          "Ngày chốt là ngày dữ liệu dừng, không phải ngày người xem mở trang. Nói cập nhật từng giờ khi bạn làm tay là sai sự thật. Hai câu còn lại nhầm lẫn giữa lúc mở trang và lúc số được chốt, và người xem sẽ tưởng số mới hơn thực tế.",
      },
    ],
    keyTakeaways: [
      "Mỗi dashboard kèm ba dòng: nguồn, ngày cập nhật, giới hạn.",
      "Ngày cập nhật là ngày số được chốt, không phải ngày mở trang.",
      "Giới hạn nói số này chưa gồm gì và không nên dùng làm gì.",
      "Ghi người để hỏi khi số có vẻ lệch.",
    ],
    practicePrompt: {
      question:
        "Chị Mai gửi dashboard kèm dòng 'số liệu chính xác 100%'. Đồng nghiệp dùng nó chốt thưởng và sau đó thấy lệch. Lỗi ở đâu?",
      options: [
        "Thiếu giới hạn: số này không được dùng để chốt thưởng",
        "Số liệu lẽ ra phải được làm tròn đến hàng chục",
        "Dashboard lẽ ra phải có nhiều biểu đồ màu hơn",
        "Chị Mai lẽ ra phải gửi cho cả công ty chứ không chỉ ba người",
      ],
      correct: 0,
      explanation:
        "Dòng 'chính xác 100%' là lời hứa không kiểm được, trong khi điều cần ghi là số này không dùng cho việc chốt thưởng. Làm tròn, thêm màu và gửi rộng hơn không ngăn người nhận dùng số sai mục đích.",
    },
    summary: {
      keyIdea: "Dashboard đi xa không có bạn đi cùng, nên ghi chú phải trả lời sẵn ba câu hỏi người nhận sẽ có.",
      formula: "Nguồn + ngày cập nhật + giới hạn + người để hỏi = dashboard giao được.",
      commonMistake: "Gửi đường dẫn trần, hoặc ghi 'số liệu chính xác' thay vì ghi giới hạn.",
      action: "Viết ba dòng ghi chú cho dashboard gần nhất bạn đã gửi đi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn dashboard hoặc bảng số bạn hay gửi cho người khác. Viết ba dòng ghi chú: nguồn số (tên tệp hoặc hệ thống), ngày giờ chốt số gần nhất, và một việc không nên dùng số này để làm. Nhờ AI gọt câu ngắn hơn, nhưng bạn tự điền nguồn và ngày. Gửi lại cho đúng người nhận đó.",
      secondary: "Hỏi người nhận xem họ thấy còn thiếu thông tin nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Dashboard của bạn rời khỏi tay bạn vào thứ Sáu và được mở lại vào thứ Ba tuần sau bởi người không biết số từ đâu ra. Bài này dạy một ghi chú ba dòng giữ cho nó không bị dùng sai.",
      },
      {
        type: "feynman",
        title: "Giao dashboard đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới nhãn trên hộp sữa: nơi sản xuất, hạn dùng, cách bảo quản. Nhãn không làm sữa ngon hơn, nhưng người mua biết dùng thế nào và khi nào bỏ đi. Ghi chú kèm dashboard cũng là cái nhãn đó.",
        columns: ["Nhãn", "Hộp sữa", "Dashboard"],
        rows: [
          ["Nguồn", "Nơi sản xuất", "Số lấy từ tệp hay hệ thống nào"],
          ["Hạn", "Hạn sử dụng", "Ngày giờ chốt số gần nhất"],
          ["Lưu ý", "Bảo quản lạnh, không hâm lại", "Chưa gồm gì, không dùng vào việc gì"],
        ],
        oneLiner: "Dashboard cần một cái nhãn: nguồn, hạn, lưu ý.",
      },
      { type: "heading", text: "Ba câu hỏi người nhận sẽ có" },
      {
        type: "paragraph",
        text: "Khi bạn không có mặt, người nhận tự hỏi ba điều: số này từ đâu ra, nó cũ hay mới, và có dùng được cho việc của tôi không. Nếu không có câu trả lời, họ sẽ đoán, và mỗi người đoán một kiểu. Ghi chú của bạn là cách để trả lời trước cả ba.",
      },
      {
        type: "flow",
        title: "Từ dashboard tới bản giao hoàn chỉnh",
        steps: [
          { label: "Ghi nguồn", detail: "Tên tệp hoặc hệ thống mà số lấy từ đó, cùng người quản lý nguồn nếu có. Người nhận biết hỏi ai khi số lệch." },
          { label: "Ghi ngày cập nhật", detail: "Ngày giờ dữ liệu được chốt, không phải ngày bạn gửi. Nếu cập nhật tay, nói cập nhật khi nào." },
          { label: "Ghi giới hạn", detail: "Số này chưa gồm gì (ví dụ đơn hoàn trả) và không nên dùng vào việc gì (ví dụ chốt thưởng)." },
          { label: "Ghi đầu mối", detail: "Tên người và kênh liên hệ khi số có vẻ lệch." },
          { label: "Đưa người nhận thử đọc", detail: "Nhờ một người đọc ghi chú và nói lại số này dùng được vào đâu. Nếu họ nói lệch thì sửa ghi chú." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gọt ghi chú bàn giao",
        task: "Bạn giao dashboard tồn kho cho phòng mua hàng. Lắp prompt để AI giúp viết ghi chú ba dòng mà không tự thêm thông tin.",
        parts: [
          {
            id: "facts",
            label: "Thông tin bạn đưa",
            options: [
              { text: "Viết ghi chú bàn giao cho dashboard tồn kho.", feedback: "AI không biết nguồn hay ngày nên tự điền một tên hệ thống và một ngày nghe hợp lý." },
              { text: "Nguồn: tệp kiểm kho thứ Hai. Chốt 8 giờ sáng thứ Hai. Chưa gồm hàng đang về. Hỏi chị Hà.", good: true, feedback: "Bạn đưa đủ sự kiện nên AI chỉ việc gọt câu, không có chỗ để bịa." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thật đầy đủ và chuyên nghiệp.", feedback: "Không giới hạn nên ra nhiều đoạn dài, ba thông tin chính chìm trong lời văn." },
              { text: "Đúng bốn dòng ngắn: nguồn, ngày chốt, giới hạn, đầu mối.", good: true, feedback: "Khuôn rõ nên người nhận đọc trong mười giây và thấy đủ bốn thứ." },
            ],
          },
          {
            id: "limit",
            label: "Điều cấm",
            options: [
              { text: "Thêm lời bảo đảm số liệu chính xác để họ yên tâm.", feedback: "Lời bảo đảm không kiểm được và làm người nhận chủ quan, dùng số vào việc không hợp." },
              { text: "Không thêm bất kỳ thông tin nào tôi chưa đưa, không viết 'chính xác tuyệt đối'.", good: true, feedback: "AI giữ đúng sự kiện, không hứa thay bạn điều bạn không biết." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "shape", "limit"],
            text: "Nguồn: tệp kiểm kho thứ Hai.\nChốt số: 8 giờ sáng thứ Hai.\nGiới hạn: chưa gồm hàng đang về, đừng dùng để quyết định đặt thêm khi chưa hỏi.\nHỏi chị Hà nếu số có vẻ lệch.",
          },
          {
            requires: ["facts"],
            text: "Nguồn: tệp kiểm kho. Số liệu được cập nhật liên tục và chính xác tuyệt đối, có thể dùng cho mọi quyết định mua hàng.\n\n(Sự kiện đúng nhưng AI thêm lời bảo đảm và xoá mất giới hạn.)",
          },
          {
            text: "Dashboard này được lấy từ hệ thống quản lý kho trung tâm, cập nhật mỗi sáng lúc 7 giờ, rất đáng tin cậy...\n\n(AI bịa tên hệ thống và giờ cập nhật vì bạn không đưa sự kiện nào.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giao kèm ghi chú ba dòng",
          text: "Người nhận biết số đến ngày nào và không dùng được vào đâu. Khi số lệch, họ biết hỏi ai. Dashboard dùng được nhiều tuần mà bạn ít phải giải thích lại.",
        },
        right: {
          label: "Chỉ gửi đường dẫn",
          text: "Mỗi người tự đoán nguồn và độ mới của số. Số cũ bị dùng như số mới. Bạn nhận nhiều câu hỏi 'số này là gì' sau khi sự cố đã xảy ra.",
        },
      },
      {
        type: "scenario",
        title: "Ngày giao dashboard cho phòng mua hàng",
        start: "s1",
        nodes: {
          s1: {
            text: "Dashboard tồn kho đã xong. Bạn chốt số sáng thứ Hai và cập nhật tay mỗi tuần. Phòng mua hàng sẽ xem vào thứ Năm.",
            choices: [
              { label: "Gửi đường dẫn kèm lời nhắn: số liệu chính xác, cứ yên tâm dùng", next: "bad_link" },
              { label: "Gửi kèm ghi chú: nguồn, ngày chốt sáng thứ Hai, chưa gồm hàng đang về", next: "s2" },
            ],
          },
          bad_link: {
            text: "Thứ Năm phòng mua hàng thấy hàng sắp hết và đặt thêm. Hàng thật ra đang về trên xe. Kho nhận đủ hai lô và mất chỗ chứa.",
            ending: "bad",
          },
          s2: {
            text: "Phòng mua hàng đọc ghi chú. Họ hỏi thêm: 'Nếu số chốt từ thứ Hai thì thứ Năm mình có cần hỏi lại không?'",
            choices: [
              { label: "Trả lời: số chưa gồm ba ngày gần đây, hàng đang về hỏi chị Hà trước khi đặt", next: "good" },
              { label: "Trả lời: không cần, số vẫn dùng được", next: "bad_dismiss" },
            ],
          },
          bad_dismiss: {
            text: "Phòng mua hàng đặt dựa trên số cũ ba ngày. Có hai mặt hàng đã được bổ sung và phải trả lại nhà cung cấp.",
            ending: "bad",
          },
          good: {
            text: "Phòng mua hàng hỏi chị Hà, biết hàng về chiều nay và không đặt thêm. Tuần sau họ yêu cầu mọi dashboard đều có ba dòng ghi chú này.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba dòng ghi chú rẻ hơn rất nhiều so với một quyết định sai vì số cũ.",
          "Bài sau là dự án cuối: báo cáo một trang có biểu đồ và lời kể cho cuộc họp.",
        ],
      },
    ],
  },
  {
    id: 2659,
    slug: "du-an-cuoi-bo-bao-cao-mot-trang-co-bieu-do-kem-loi-ke-cho-cuoc-hop",
    title: "Chặng 62, Bài 20: Dự án cuối: báo cáo một trang có biểu đồ kèm lời kể cho cuộc họp",
    subtitle: "Dựng dashboard nhỏ, biểu đồ trung thực, ba câu kể để trình bày 3 phút và thử với một đồng nghiệp.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đây là bài ghép tất cả: một câu hỏi, một biểu đồ trung thực, ba câu kể và một ghi chú nguồn. Khi làm xong, bạn có một trang giấy hoặc một màn hình đủ để trình bày trong ba phút và đủ rõ để đồng nghiệp đọc một mình mà không hiểu lệch.",
    openingQuestion:
      "Bạn có 3 phút trong cuộc họp tuần và bảng số của cả tháng. Bạn chuẩn bị một trang báo cáo thế nào là hợp lý nhất?",
    openingOptions: [
      "Một biểu đồ chính, vài số cần nhớ và ba câu kể kèm ghi chú nguồn",
      "Mọi biểu đồ của cả quý để không ai hỏi thiếu gì",
      "Bản sao toàn bộ bảng số liệu gốc in ra nhiều trang",
      "Một biểu đồ thật đẹp, không cần lời kể đi kèm",
    ],
    correctOption: 0,
    explanation:
      "Ba phút chỉ đủ cho một ý chính, nên trang báo cáo nên có một biểu đồ trung thực, vài số đáng nhớ, ba câu kể và dòng nguồn để ai đọc một mình vẫn hiểu. Đưa mọi biểu đồ làm ý chính chìm đi, in cả bảng gốc thì không ai đọc trong ba phút, và biểu đồ không có lời kể để mỗi người tự hiểu một kiểu.",
    diagram: [
      { label: "Chốt câu hỏi và người nghe", arrow: true },
      { label: "Dựng một biểu đồ trung thực và vài số cần nhớ", arrow: true },
      { label: "Viết ba câu kể và ghi chú nguồn, ngày, giới hạn", arrow: true },
      { label: "Thử với một đồng nghiệp rồi sửa theo điều họ hiểu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm bán hàng chuẩn bị báo cáo một trang cho họp tuần. Chị chọn một biểu đồ cột có trục bắt đầu từ 0, viết ba câu kể, thêm dòng nguồn và ngày. Chị đưa trang cho một đồng nghiệp đọc 30 giây. Anh tóm tắt sai ý chính, nên chị đổi tiêu đề thành câu kết luận và thử lại trước khi vào họp.",
    },
    quiz: [
      {
        question: "Trang báo cáo cho buổi họp 3 phút nên có gì?",
        options: [
          "Một biểu đồ chính, vài số cần nhớ và ba câu kể kèm theo",
          "Mọi biểu đồ của cả quý để không ai hỏi thiếu gì",
          "Bản sao toàn bộ bảng số liệu gốc in ra nhiều trang",
          "Một biểu đồ thật đẹp, không cần lời kể đi kèm",
        ],
        correct: 0,
        explanation:
          "Ba phút chỉ chứa một ý chính nên trang cần gọn và có lời kể. Nhiều biểu đồ làm ý chính chìm, bảng gốc nhiều trang không ai đọc kịp, và biểu đồ không lời kể để mỗi người tự rút một kết luận khác nhau.",
      },
      {
        question: "Vì sao nên thử trang báo cáo với một đồng nghiệp trước buổi họp?",
        options: [
          "Để biết người nghe hiểu đúng hay hiểu lệch",
          "Để đồng nghiệp sửa giúp phần màu sắc cho đẹp hơn",
          "Để họ chấm điểm phần trình bày bằng bảng xếp hạng",
          "Để chắc rằng hôm họp không ai đặt câu hỏi nào nữa",
        ],
        correct: 0,
        explanation:
          "Người viết luôn hiểu trang của mình, nên chỉ người khác mới cho biết ý chính có tới nơi không. Sửa màu không phải mục tiêu chính, chấm điểm không giúp hiểu đúng, và không có cách nào bảo đảm không ai hỏi gì.",
      },
      {
        question: "Ba phút trình bày, thứ tự nào hợp lý?",
        options: [
          "Kết luận trước, chỉ vào biểu đồ, rồi việc cần làm",
          "Đọc lần lượt mọi con số từ trái sang phải trên biểu đồ",
          "Mở đầu bằng cách kể lịch sử của bảng số liệu",
          "Nêu việc cần làm trước, biểu đồ để cuối nếu còn giờ",
        ],
        correct: 0,
        explanation:
          "Kết luận trước cho người nghe biết nhìn vào đâu, rồi biểu đồ làm bằng chứng, rồi việc cần làm. Đọc hết các con số tốn cả giờ, lịch sử bảng không phục vụ quyết định, và nêu việc cần làm trước khi họ hiểu lý do thì khó được đồng ý.",
      },
      {
        question: "Với biểu đồ cột trong báo cáo trung thực, trục dọc nên bắt đầu từ đâu?",
        options: [
          "Số 0, để chiều cao cột phản ánh đúng giá trị",
          "Số nhỏ nhất trong bảng để cột chênh lệch nhìn rõ hơn",
          "Bất kỳ số nào bạn thấy đẹp mắt nhất khi xem",
          "Số trung bình để các cột nằm hai bên đường giữa",
        ],
        correct: 0,
        explanation:
          "Cột biểu diễn giá trị bằng chiều cao, nên phải bắt đầu từ 0 thì tỉ lệ mới đúng. Bắt đầu từ số nhỏ nhất làm chênh lệch nhỏ trông rất lớn, chọn số đẹp mắt là bẻ hình theo ý muốn, còn lấy số trung bình làm gốc phá hẳn ý nghĩa của cột.",
      },
      {
        question: "Sau buổi thử, đồng nghiệp tóm tắt sai ý chính. Bạn nên sửa gì?",
        options: [
          "Sửa tiêu đề và câu đầu cho nói thẳng kết luận",
          "Thêm nhiều số hơn vào trang để ý chính rõ hơn",
          "Đổi sang biểu đồ phức tạp hơn để gây chú ý",
          "Trách người nghe chưa đọc kỹ rồi giữ nguyên trang",
        ],
        correct: 0,
        explanation:
          "Người đọc hiểu sai nghĩa là trang chưa nói rõ ý chính, nên sửa tiêu đề và câu đầu. Thêm nhiều số làm ý chính chìm hơn, biểu đồ phức tạp khó đọc hơn, và đổ lỗi cho người nghe khiến hôm họp cả phòng hiểu sai như vậy.",
      },
    ],
    keyTakeaways: [
      "Một trang, một ý chính, một biểu đồ trung thực.",
      "Tiêu đề nói thẳng kết luận, dưới có ba câu kể.",
      "Ghi chú nguồn, ngày cập nhật và giới hạn đi kèm.",
      "Thử với một người thật trước buổi họp và sửa theo điều họ hiểu.",
    ],
    practicePrompt: {
      question:
        "Anh Tùng làm xong trang báo cáo và định trình bày luôn vì 'mình hiểu rồi'. Bước nào còn thiếu?",
      options: [
        "Đưa cho một đồng nghiệp đọc và hỏi họ hiểu ý chính là gì",
        "Thêm một biểu đồ nữa để trang trông đầy đủ hơn",
        "Tăng cỡ chữ của phần ghi chú nguồn lên bằng cỡ chữ tiêu đề",
        "Đọc lại trang bốn lần cho thuộc từng con số",
      ],
      correct: 0,
      explanation:
        "Bước thiếu là thử với người khác, vì tác giả luôn hiểu trang của mình. Thêm biểu đồ làm trang rối hơn, phóng chữ ghi chú không giúp ai hiểu ý chính, còn đọc lại nhiều lần chỉ làm anh thuộc hơn chứ không biết người nghe hiểu gì.",
    },
    summary: {
      keyIdea: "Báo cáo tốt là báo cáo mà người đọc một mình vẫn nói lại đúng ý chính.",
      formula: "Câu hỏi + biểu đồ trung thực + ba câu kể + nguồn, ngày, giới hạn + thử với một người = trang sẵn sàng.",
      commonMistake: "Trình bày ngay vì mình đã hiểu, không đưa ai đọc thử.",
      action: "Dựng một trang báo cáo thật từ bảng của bạn và nhờ một đồng nghiệp đọc 30 giây.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng số thật bạn báo cáo hằng tuần. Dựng một trang gồm một biểu đồ có trục bắt đầu từ 0, tiêu đề là câu kết luận, ba câu kể và một dòng nguồn, ngày, giới hạn. Đưa cho một đồng nghiệp đọc 30 giây rồi hỏi họ: ý chính của trang này là gì? Ghi lại câu họ nói.",
      secondary: "Nếu câu họ nói khác ý bạn, sửa tiêu đề và thử lại với người khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn có ba phút trong cuộc họp tuần và bảng số của cả tháng. Bài cuối của chặng này ghép mọi thứ đã học thành một trang báo cáo: biểu đồ trung thực, lời kể ba câu và ghi chú nguồn.",
      },
      {
        type: "feynman",
        title: "Báo cáo một trang đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ giấy ghi chú bạn để lại cho người ở nhà khi đi vắng: nói điều quan trọng nhất trước, dặn việc cần làm, ghi lúc nào bạn viết. Họ đọc một mình vẫn làm đúng. Báo cáo một trang cũng là tờ giấy đó.",
        columns: ["Phần", "Giấy ghi chú ở nhà", "Báo cáo một trang"],
        rows: [
          ["Điều quan trọng nhất", "Ống nước bếp đang rỉ", "Tiêu đề là câu kết luận"],
          ["Bằng chứng", "Sàn ướt chỗ này", "Một biểu đồ trung thực, trục từ 0"],
          ["Việc cần làm", "Gọi thợ trước 5 giờ", "Ba câu kể, câu cuối có người và hạn"],
          ["Dấu thời gian", "Viết lúc 9 giờ sáng", "Nguồn, ngày cập nhật, giới hạn"],
        ],
        oneLiner: "Một trang đủ để người đọc một mình vẫn hiểu đúng và biết phải làm gì.",
      },
      { type: "heading", text: "Năm mảnh ghép của trang báo cáo" },
      {
        type: "list",
        items: [
          "Tiêu đề: một câu kết luận, không phải tên bảng.",
          "Biểu đồ: một biểu đồ duy nhất, trục cột bắt đầu từ 0, không nhồi nhiều loại số.",
          "Vài số cần nhớ: ba đến năm con số kèm mốc so sánh.",
          "Ba câu kể: điều đang xảy ra, vì sao đáng chú ý, việc cần làm.",
          "Dòng ghi chú: nguồn, ngày cập nhật, giới hạn.",
        ],
      },
      {
        type: "flow",
        title: "Từ bảng số tới trang sẵn sàng họp",
        steps: [
          { label: "Chốt câu hỏi và người nghe", detail: "Người nghe là ai và họ cần quyết định gì. Nếu không trả lời được thì chưa nên vẽ." },
          { label: "Dựng một biểu đồ trung thực", detail: "Chọn loại biểu đồ hợp với câu hỏi, trục cột bắt đầu từ 0, không cắt đoạn thời gian thuận lợi." },
          { label: "Viết ba câu kể", detail: "Điều đang xảy ra với mốc so sánh, vì sao đáng chú ý, việc cần làm có người và hạn." },
          { label: "Thêm ghi chú nguồn, ngày, giới hạn", detail: "Ba dòng nhỏ dưới biểu đồ để người đọc một mình vẫn biết số từ đâu." },
          { label: "Thử với một đồng nghiệp", detail: "Cho họ đọc 30 giây rồi hỏi ý chính là gì. Hiểu lệch thì sửa tiêu đề và câu đầu." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung trang báo cáo",
        task: "Bạn cần khung một trang báo cáo cho họp tuần từ bảng doanh số. Lắp prompt để AI dựng khung mà không tự điền số.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Làm cho tôi một báo cáo hay về doanh số.", feedback: "Không nói cho ai, để làm gì, nên AI dựng một báo cáo chung chung, nhiều phần thừa." },
              { text: "Báo cáo một trang cho họp tuần 3 phút, người nghe là sếp cần quyết định có thêm người trực hay không.", good: true, feedback: "Người nghe và quyết định rõ nên khung chỉ gồm điều phục vụ quyết định đó." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn dạng",
            options: [
              { text: "Thêm càng nhiều biểu đồ càng tốt để báo cáo phong phú.", feedback: "Nhiều biểu đồ làm ý chính chìm, ba phút không đủ để trình bày." },
              { text: "Khung gồm: tiêu đề kết luận, một biểu đồ, ba câu kể, dòng nguồn và ngày.", good: true, feedback: "Khung khớp với ba phút và đủ để người đọc một mình vẫn hiểu." },
            ],
          },
          {
            id: "limit",
            label: "Điều cấm",
            options: [
              { text: "Tự điền số liệu hợp lý nếu tôi chưa đưa.", feedback: "Số AI tự điền trông thật nhưng không có nguồn, và sẽ xuất hiện trong báo cáo của bạn." },
              { text: "Để các chỗ số là {số}, chỉ tôi điền từ bảng gốc; không thêm nguyên nhân nào.", good: true, feedback: "Số và nguyên nhân đều đến từ bạn, AI chỉ lo khung và câu chữ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "shape", "limit"],
            text: "Tiêu đề: {kết luận một câu}\nBiểu đồ: cột theo tuần, trục bắt đầu từ 0\nKể: 1) {số} tuần này so với {mốc}. 2) Vì sao đáng chú ý với việc quyết định thêm người trực. 3) Đề nghị: {người} làm {việc} trước {hạn}.\nGhi chú: nguồn {tệp}, chốt ngày {ngày}, chưa gồm {điều chưa tính}.",
          },
          {
            requires: ["goal"],
            text: "Tiêu đề: Báo cáo doanh số tuần\nBiểu đồ 1: doanh số theo khu vực. Biểu đồ 2: theo sản phẩm. Biểu đồ 3: theo nhân viên. Biểu đồ 4: so cùng kỳ.\nDoanh số tăng 18% nhờ chiến dịch mới.\n\n(Nhiều biểu đồ không vừa ba phút, và AI tự điền 18% cùng nguyên nhân.)",
          },
          {
            text: "Báo cáo doanh số tuần: doanh số đạt 2,4 tỷ, tăng mạnh so với kỳ trước nhờ nỗ lực của đội ngũ...\n\n(AI bịa số tỷ và lời khen chung chung, không có khung nào dùng được.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Trước khi họp, kiểm ba điều",
        text: "Mỗi con số trên trang khớp với bảng gốc. Trục cột bắt đầu từ 0 và không cắt đoạn thời gian thuận lợi. Một người khác đã đọc và nói lại đúng ý chính. Nếu trang liên quan tới tiền lương hoặc hợp đồng, hỏi bộ phận nhân sự hoặc pháp chế trước khi đưa ra.",
      },
      {
        type: "scenario",
        title: "Hôm trước buổi họp tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Trang báo cáo đã xong: một biểu đồ, ba câu kể, dòng nguồn. Ngày mai họp lúc 9 giờ và bạn có mười phút rảnh chiều nay.",
            choices: [
              { label: "Đọc lại cho thuộc rồi về, vì bạn đã hiểu hết rồi", next: "bad_skip" },
              { label: "Đưa cho một đồng nghiệp đọc 30 giây, hỏi họ ý chính là gì", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Sáng họp, sếp hiểu tiêu đề thành 'doanh số giảm' trong khi bạn muốn nói 'giảm ở một khu vực'. Bạn mất hai phút đính chính giữa buổi họp.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp nói: 'Doanh số cả công ty đang giảm.' Bạn muốn nói giảm ở một khu vực thôi.",
            choices: [
              { label: "Sửa tiêu đề thành câu nói rõ khu vực và đọc thử lại với người khác", next: "good" },
              { label: "Bảo họ đọc kỹ hơn vì ý chính đã rõ", next: "bad_blame" },
            ],
          },
          bad_blame: {
            text: "Bạn giữ nguyên tiêu đề. Sáng họp hai người khác cũng hiểu là cả công ty giảm, và phần thảo luận đi sai hướng.",
            ending: "bad",
          },
          good: {
            text: "Tiêu đề mới nói rõ khu vực. Người thứ hai đọc xong nói lại đúng ý chính. Sáng họp, bạn trình bày trong hai phút rưỡi và cả phòng đồng ý việc cần làm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Biểu đồ trung thực, lời kể ba câu, ghi chú nguồn và một lần thử với người thật: bốn thứ làm nên một trang báo cáo đáng tin.",
          "Bạn đã xong chặng 62: từ câu hỏi, biểu đồ, dashboard tới lời kể cho cuộc họp.",
        ],
      },
    ],
  },
];
