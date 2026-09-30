import type { Lesson } from "../lesson-types";

// Chặng 36, bài 6-10. Giáo trình: scripts/curriculum/stage-36.json.
// Không dựa vào tính năng riêng của công cụ AI nào; số liệu trong bài là số liệu minh hoạ.
export const S36_B_LESSONS: Lesson[] = [
  {
    id: 2125,
    slug: "so-sanh-hai-khu-vuc-bang-so-lieu-that",
    title: "Chặng 36, Bài 6: So sánh hai khu vực cho khách bằng số liệu bạn tự thu thập",
    subtitle: "Vài con số bạn tự ghi, một bảng hai cột - khách nhìn là thấy hai phường khác nhau ở đâu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách phân vân giữa hai phường và hỏi bạn 'chỗ nào hợp hơn'. Nếu bạn nhờ AI kể về hai phường, nó sẽ trả lời trôi chảy nhưng số liệu là thứ nó đoán. Nếu bạn tự ghi số rồi nhờ AI xếp thành bảng, khách nhận một trang có nguồn, còn bạn nói chuyện với khách bằng chính con số của mình.",
    openingQuestion:
      "Khách phân vân giữa phường A và phường B. Bạn đã ghi giá rao của 12 căn mỗi nơi vào sổ. Bạn nhờ AI làm gì để có bảng so sánh dùng được?",
    openingOptions: [
      "Đưa AI đúng số bạn ghi và nhờ nó chỉ trình bày thành một bảng",
      "Nhờ AI cho biết giá trung bình của hai phường theo hiểu biết của nó",
      "Nhờ AI chọn giúp phường nào tốt hơn rồi gửi thẳng kết luận cho khách",
      "Bỏ hết số liệu, nhờ AI viết đoạn giới thiệu chung về hai phường",
    ],
    correctOption: 0,
    explanation:
      "Số liệu phải xuất phát từ sổ ghi của bạn, có ngày và có nguồn; AI chỉ làm việc nó giỏi là sắp xếp và diễn đạt lại cho dễ đọc. Nếu hỏi giá trung bình theo hiểu biết của AI thì con số không có nguồn kiểm được, và có thể đã cũ hoặc bịa. Nhờ AI chọn phường tốt hơn là giao quyết định của khách cho một công cụ không biết hoàn cảnh của họ. Đoạn giới thiệu chung không giúp khách so sánh gì cả.",
    diagram: [
      { label: "Ghi số bạn tự thu thập: giá rao, quãng đường, trường học", arrow: true },
      { label: "Đưa AI đúng những số đó, kèm ngày ghi", arrow: true },
      { label: "AI xếp thành bảng hai cột dễ đọc", arrow: true },
      { label: "Bạn đối chiếu từng ô với sổ ghi rồi mới gửi khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người môi giới ghi giá rao của mười mấy căn ở hai phường vào bảng tính trong hai buổi sáng. Cô đưa bảng đó cho AI và nhờ trình bày thành một trang, có ghi ngày thu thập ở cuối. Khi khách hỏi 'con số này lấy ở đâu', cô mở sổ chỉ từng dòng. Đây là tình huống minh hoạ, không phải một trường hợp có thật cụ thể.",
    },
    quiz: [
      {
        question: "Vì sao nên đưa AI số liệu bạn đã ghi thay vì hỏi nó giá trung bình của hai phường?",
        options: [
          "AI không có sổ ghi của bạn, nên nếu hỏi trống nó sẽ điền số nghe hợp lý",
          "AI chỉ tính được số trung bình khi có từ 100 căn trở lên",
          "Giá rao thấp hơn giá bán nên phải bỏ hết số liệu giá rao",
          "AI nhớ giá từng phường nhưng hay chia sai khi tính trung bình",
        ],
        correct: 0,
        explanation:
          "AI dự đoán chữ nghe hợp lý nên số nó tự đưa ra không có nguồn để kiểm. Không có mốc 100 căn nào; 12 căn vẫn đủ để so sánh thô nếu ghi rõ là mẫu nhỏ. Giá rao vẫn dùng được, chỉ cần gọi đúng tên là giá rao. Và AI không 'nhớ giá từng phường' theo cách bạn có thể kiểm.",
      },
      {
        question: "Mỗi căn trong sổ ghi nên có những thông tin nào để so sánh công bằng?",
        options: [
          "Giá rao, diện tích và ngày ghi của căn đó",
          "Chỉ giá rao, vì diện tích khách tự xem được trên tin đăng",
          "Giá rao và tên người đăng, để khách tiện liên hệ trực tiếp",
          "Giá rao và số lượt xem tin, vì tin nhiều người xem là tin tốt",
        ],
        correct: 0,
        explanation:
          "Giá rao mà không có diện tích thì không so được: 3 tỷ cho 50 m² khác 3 tỷ cho 80 m². Ngày ghi cho biết số còn mới hay đã cũ. Thiếu diện tích là lỗi hay gặp nhất; tên người đăng là thông tin cá nhân không giúp so sánh, và lượt xem cho biết tin hút mắt chứ không cho biết căn đáng giá.",
      },
      {
        question: "Bảng AI trả về ghi 'phường B rẻ hơn khoảng 8%' trong khi sổ của bạn chưa tính ra con số đó. Bạn làm gì?",
        options: [
          "Tự bấm lại phép tính từ sổ ghi, số nào không ra thì gạch",
          "Giữ nguyên vì AI tính nhanh và chắc chắn chính xác hơn người",
          "Đổi thành 'khoảng 10%' cho tròn số dễ nhớ với khách",
          "Xoá cả bảng và nhờ AI làm lại đến khi ra đúng con số mong muốn",
        ],
        correct: 0,
        explanation:
          "Con số nào không truy ngược được về sổ thì phải bỏ hoặc tính lại bằng máy tính. AI có thể chia sai hoặc tự thêm số; nhanh không có nghĩa là đúng. Làm tròn cho đẹp là tự sửa số liệu, và nhờ làm lại tới khi ra con số bạn muốn là ép số theo kết luận có sẵn.",
      },
      {
        question: "Câu nào nên đứng cuối trang so sánh gửi khách?",
        options: [
          "Số liệu tự thu thập ngày 12/9, giá rao chưa phải giá bán",
          "Phường B là lựa chọn tốt hơn cho gia đình bạn, mời bạn xem nhà sớm",
          "Số liệu chỉ mang tính tham khảo, không chịu trách nhiệm",
          "Nguồn: hiểu biết chung của AI về thị trường hai phường",
        ],
        correct: 0,
        explanation:
          "Ngày thu thập và loại giá cho khách biết số này cũ mới ra sao và là giá gì. Đoạn kết luận thay khách là điều bạn không nên tự quyết. Câu 'không chịu trách nhiệm' chung chung không nói được số đến từ đâu, và 'hiểu biết của AI' không phải nguồn kiểm được.",
      },
      {
        question: "Khách hỏi 'phường nào tốt hơn?'. Cách trả lời nào đúng tinh thần bài này?",
        options: [
          "Đưa bảng và hỏi khách coi trọng điều gì nhất: giá, đi làm hay trường học",
          "Nói ngay phường có giá rao thấp hơn vì đó thường là lựa chọn hợp lý nhất cho khách",
          "Nhờ AI chọn một phường rồi chuyển nguyên câu trả lời cho khách",
          "Trả lời 'phường nào cũng tốt' để khách không thấy bị ép",
        ],
        correct: 0,
        explanation:
          "Bảng trả lời 'khác nhau ở đâu', còn 'tốt hơn' phụ thuộc điều khách ưu tiên, nên câu hỏi ngược lại mới đúng. Chọn theo giá rẻ nhất bỏ qua đi làm và trường học. Chuyển nguyên lời AI là giao quyết định cho công cụ. Còn 'phường nào cũng tốt' nghe khéo nhưng không giúp khách chọn gì.",
      },
    ],
    keyTakeaways: [
      "Số liệu do bạn tự ghi, có ngày và có nguồn; AI chỉ xếp cho dễ đọc.",
      "Mỗi căn ghi tối thiểu giá rao, diện tích và ngày ghi thì mới so sánh được.",
      "Số nào không truy ngược được về sổ của bạn thì gạch hoặc tự tính lại.",
      "Bảng cho khách thấy khác nhau ở đâu; chọn phường là việc của khách.",
    ],
    practicePrompt: {
      question: "Trang so sánh hai phường gửi khách cần ghi kèm điều gì để khách tự kiểm được?",
      options: [
        "Ngày thu thập và nguồn của từng nhóm số liệu",
        "Tên công cụ AI và phiên bản đã dùng để dựng bảng số liệu",
        "Lời khẳng định phường nào sẽ tăng giá nhanh hơn",
        "Số điện thoại của các chủ nhà đã ghi trong sổ",
      ],
      correct: 0,
      explanation:
        "Ngày và nguồn cho khách biết số còn mới không và lấy ở đâu để tự hỏi lại. Tên công cụ không giúp kiểm số. Lời khẳng định tăng giá là lời hứa không có căn cứ, và số điện thoại chủ nhà là thông tin của người khác không nên đưa vào một trang gửi khách.",
    },
    summary: {
      keyIdea: "Bảng so sánh tốt bắt đầu từ số bạn tự ghi; AI chỉ là người xếp bảng.",
      commonMistake: "Hỏi AI giá từng khu vực rồi đưa khách con số không ai kiểm được.",
      action: "Ghi giá rao, diện tích, ngày của 6 căn ở mỗi phường rồi nhờ AI xếp thành bảng.",
    },
    application: {
      title: "Bảng nhỏ cho hai khu vực của bạn",
      message:
        "Chọn hai khu vực bạn hay tư vấn. Tự ghi giá rao, diện tích và ngày ghi của 5 căn mỗi nơi vào một bảng tính (khoảng 20 phút). Đưa đúng bảng đó cho AI, nhờ dựng bảng hai cột, rồi đối chiếu từng ô với sổ. Ngày mai bạn sẽ được hỏi: có ô nào AI đưa ra mà sổ của bạn không có không?",
      secondary: "Nếu chưa đủ 5 căn mỗi nơi, ghi 3 căn và ghi rõ 'mẫu nhỏ' trên bảng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, khách nhắn: 'Em phân vân phường A với phường B, chị thấy nơi nào hợp hơn?' Bạn có trong đầu vài con số rời rạc, và một chiếc AI sẵn sàng viết cả bài về hai phường. Bài này dạy cách dùng AI để trình bày số của bạn, không phải để nó bịa số thay bạn.",
      },
      {
        type: "feynman",
        title: "So sánh hai khu vực đơn giản hơn bạn nghĩ",
        intro:
          "Bạn đã từng chọn giữa hai quán phở: ghi giá tô, hỏi xa nhà bao nhiêu phút, có chỗ đậu xe không, rồi mới chọn. So hai phường cũng vậy, chỉ khác là dòng ghi nhiều hơn và có AI giúp kẻ bảng cho gọn.",
        columns: ["Việc", "Chuyện hai quán phở", "Chuyện hai phường"],
        rows: [
          ["Ghi số", "Giá tô, số phút đi bộ", "Giá rao từng căn, quãng đường đi làm"],
          ["Xếp bảng", "Kẻ hai cột trên tờ giấy", "AI dựng bảng từ số bạn đưa"],
          ["Kiểm lại", "Nhìn lại hoá đơn thật", "Đối chiếu từng ô với sổ ghi của bạn"],
        ],
        oneLiner: "Bạn ghi số, AI kẻ bảng, bạn kiểm - không ai được thay ai.",
      },
      { type: "heading", text: "Số liệu là của bạn, AI chỉ xếp chỗ" },
      {
        type: "paragraph",
        text: "Hãy nghĩ AI như một người trợ lý rất nhanh tay nhưng chưa từng đi xem phường của bạn. Đưa cho anh ta cuốn sổ bạn ghi, anh ta kẻ bảng đẹp trong vài giây. Hỏi anh ta 'giá phường B bao nhiêu' khi không có sổ, anh ta vẫn trả lời, vì anh ta luôn cố trả lời cho nghe hợp lý - đó chính là chỗ số bị bịa.",
      },
      {
        type: "list",
        items: [
          "Giá rao của từng căn (gọi đúng là giá rao, không phải giá bán).",
          "Diện tích của căn đó, để chia ra được giá mỗi mét vuông.",
          "Ngày bạn ghi, vì số cũ vài tháng có thể đã khác.",
          "Quãng đường tới nơi khách đi làm, tự đo bằng ứng dụng bản đồ.",
        ],
      },
      {
        type: "comparison",
        left: { label: "AI tự nhớ số", text: "Nhanh, trôi chảy, nhưng không có nguồn. Bạn không thể chỉ cho khách xem con số đó lấy ở đâu." },
        right: { label: "AI xếp số bạn ghi", text: "Vẫn nhanh, và mỗi ô đều truy ngược được về một dòng trong sổ của bạn." },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng so sánh hai phường",
        task: "Lắp một yêu cầu gồm ba phần: nguồn số liệu, việc cần làm và khuôn dạng. Xem câu trả lời của AI khác nhau thế nào.",
        parts: [
          {
            id: "nguon",
            label: "Nguồn số liệu",
            options: [
              {
                text: "Dán sổ ghi: 12 căn mỗi phường, gồm giá rao, diện tích, ngày ghi",
                good: true,
                feedback: "Tốt: AI có số thật của bạn nên chỉ việc xếp, mỗi ô truy ngược được về sổ.",
              },
              {
                text: "Không dán gì, chỉ nêu tên hai phường",
                feedback: "AI sẽ tự điền giá trung bình nghe hợp lý, và bạn không có nguồn nào để đưa khách xem.",
              },
              {
                text: "Nói 'lấy số liệu mới nhất trên mạng'",
                feedback: "AI không tự đi đo giúp bạn; nó sẽ trả lời như thể đã tra, còn con số thì không ai kiểm được.",
              },
            ],
          },
          {
            id: "viec",
            label: "Việc cần làm",
            options: [
              {
                text: "Chỉ trình bày lại số đã đưa, không thêm số nào khác",
                good: true,
                feedback: "Tốt: giới hạn này ngăn AI chèn thêm con số không có trong sổ.",
              },
              {
                text: "Phân tích và cho biết phường nào đáng mua hơn",
                feedback: "Kết luận thay khách, dựa trên một mẫu nhỏ; AI sẽ nói rất tự tin dù không đủ căn cứ.",
              },
              {
                text: "Bổ sung các thông tin còn thiếu để bảng đầy đủ hơn",
                feedback: "'Bổ sung' nghĩa là cho phép AI tự thêm số; ô nào thiếu sẽ bị điền bằng con số đoán.",
              },
            ],
          },
          {
            id: "dang",
            label: "Khuôn dạng",
            options: [
              {
                text: "Bảng hai cột, ô nào không có số thì ghi 'chưa có số liệu'",
                good: true,
                feedback: "Tốt: chỗ trống được để trống thay vì bị lấp bằng số bịa, và bảng dễ đọc.",
              },
              {
                text: "Một đoạn văn dài, viết cuốn hút cho khách",
                feedback: "Đoạn văn trôi làm con số chìm đi, và khách khó so hai phường cạnh nhau.",
              },
              {
                text: "Bảng, nhưng ô nào thiếu thì điền số ước tính hợp lý",
                feedback: "'Ước tính hợp lý' là lệnh bịa: bảng nhìn đầy đủ nhưng có ô không có nguồn.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["nguon", "viec", "dang"],
            text: "Bảng so sánh (theo số bạn đưa, ghi ngày 12/9)\n- Giá rao trung bình: Phường A 62 triệu/m², Phường B 55 triệu/m²\n- Diện tích thường gặp: A 55-70 m², B 60-85 m²\n- Quãng đường tới nơi làm: chưa có số liệu\nMẫu nhỏ: 12 căn mỗi phường. Mọi ô đều lấy từ sổ ghi của bạn.",
          },
          {
            requires: ["nguon"],
            text: "Phường A giá trung bình khoảng 62 triệu/m², phường B khoảng 55 triệu/m². Phường B nhiều lựa chọn hơn cho gia đình, trường học gần và giao thông thuận tiện, được nhiều người tìm mua gần đây.",
          },
          {
            text: "Phường A thường có giá cao hơn khoảng 15-20% nhờ hạ tầng tốt, giao thông thuận lợi, gần trường và bệnh viện. Phường B phù hợp ngân sách vừa phải và được đánh giá có tiềm năng tăng giá cao.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ghi ngày, ghi loại giá",
        text: "Cuối mỗi trang gửi khách, viết một dòng: 'Số liệu tự thu thập ngày ..., là giá rao, chưa phải giá bán'. Dòng đó tốn 10 giây và trả lời trước câu hỏi khó nhất của khách.",
      },
      {
        type: "chart",
        title: "Giá rao theo nhóm diện tích của các căn bạn đã ghi",
        caption: "Số liệu minh hoạ (triệu đồng mỗi m²), không phải số thị trường thật. Bảng của bạn sẽ dùng số bạn tự ghi.",
        kind: "bar",
        xLabel: "Nhóm diện tích",
        yLabel: "Triệu đồng/m²",
        data: [
          { label: "Dưới 50 m²", values: [66, 60] },
          { label: "50-70 m²", values: [62, 55] },
          { label: "Trên 70 m²", values: [58, 52] },
        ],
        seriesLabels: ["Phường A", "Phường B"],
      },
      {
        type: "scenario",
        title: "Khách hỏi: phường nào tốt hơn?",
        start: "hoi",
        nodes: {
          hoi: {
            text: "Bạn đã có bảng hai phường. Khách nhắn: 'Vậy chị chốt giúp em phường nào tốt hơn đi.' Bạn định trả lời thế nào?",
            choices: [
              { label: "Gửi bảng, rồi hỏi khách: bảng có ba điều, anh chị coi trọng điều nào nhất?", next: "hoiLai" },
              { label: "Nhờ AI chọn một phường, chép nguyên câu trả lời gửi khách", next: "chepAI" },
              { label: "Nói 'phường B, vì giá rao thấp hơn' cho nhanh", next: "nhanh" },
            ],
          },
          hoiLai: {
            text: "Khách trả lời: đi làm quan trọng nhất. Bạn tự đo quãng đường hai phường tới nơi làm và thêm một dòng vào bảng, ghi ngày đo.",
            choices: [
              { label: "Gửi bảng đã cập nhật và hẹn xem hai căn ở phường gần hơn", next: "tot" },
              { label: "Sửa quãng đường làm tròn xuống một chút cho phường bạn muốn bán", next: "xau" },
            ],
          },
          chepAI: {
            text: "AI viết: 'Phường A chắc chắn tốt hơn vì hạ tầng và tiềm năng tăng giá.' Khách hỏi 'căn cứ ở đâu?' và bạn không có gì trong sổ để chỉ.",
            ending: "bad",
          },
          nhanh: {
            text: "Khách chọn phường B, rồi mới biết đi làm mỗi ngày mất thêm gần một giờ. Bảng của bạn chưa có dòng quãng đường nên không ai cảnh báo trước.",
            ending: "bad",
          },
          tot: {
            text: "Khách xem hai căn với con số rõ ràng trong tay và tự quyết định. Họ nhớ bạn là người đưa dữ liệu chứ không đẩy ý kiến.",
            ending: "good",
          },
          xau: {
            text: "Sau này khách tự đo lại và thấy số của bạn thấp hơn thật. Bạn mất niềm tin, và trang so sánh trước đó cũng bị nghi ngờ theo.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Số liệu của bạn, ngày của bạn, kiểm của bạn.",
          "AI xếp bảng nhanh, nhưng chỉ đáng tin ở những ô bạn kiểm được.",
          "Việc hôm nay: ghi 5 căn mỗi phường, dựng bảng, đối chiếu từng ô.",
        ],
      },
    ],
  },
  {
    id: 2126,
    slug: "tinh-tien-tra-hang-thang-de-khach-hinh-dung",
    title: "Chặng 36, Bài 7: Tính khoản trả hàng tháng để khách hình dung",
    subtitle: "Kéo hai thanh trượt, thấy ngay khoản trả mỗi tháng đổi ra sao - và nói với khách đây chỉ là ước tính.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách nào cũng hỏi 'vay chừng này thì mỗi tháng trả bao nhiêu'. Trả lời bừa thì họ lập kế hoạch tài chính trên con số sai; từ chối trả lời thì họ đi hỏi nơi khác. Bài này cho bạn cách cho khách một con số ước tính rõ ràng, có giả định đi kèm, và chỉ đúng chỗ để hỏi con số chính thức.",
    openingQuestion:
      "Khách hỏi: 'Em vay 1 tỷ trong 20 năm thì mỗi tháng trả khoảng bao nhiêu?' Bạn chưa có bảng lãi chính thức. Cách trả lời nào ổn nhất?",
    openingOptions: [
      "Ước tính theo một mức lãi giả định, nói rõ giả định và hẹn hỏi ngân hàng",
      "Chia 1 tỷ cho 240 tháng rồi báo đó là khoản trả hàng tháng",
      "Từ chối trả lời vì lãi thay đổi và không ai biết trước được",
      "Nhờ AI cho biết lãi suất vay mua nhà hiện tại rồi báo khách đó là con số chắc chắn",
    ],
    correctOption: 0,
    explanation:
      "Một con số ước tính có giả định (mức lãi, số năm, cách trả) vẫn giúp khách hình dung, miễn là bạn nói rõ nó chỉ là ước tính và ngân hàng mới là nơi báo con số thật. Chia gốc cho số tháng bỏ quên tiền lãi nên ra số thấp hơn thực tế. Từ chối hẳn thì khách mất cơ hội hình dung. Còn lãi suất hiện hành là thông tin của từng ngân hàng, AI không có sẵn và dễ nói số cũ.",
    diagram: [
      { label: "Hỏi khách: vay bao nhiêu, bao nhiêu năm", arrow: true },
      { label: "Chọn mức lãi giả định và nói rõ đó là giả định", arrow: true },
      { label: "Kéo thanh trượt để xem khoản trả mỗi tháng", arrow: true },
      { label: "Gửi con số ước tính, hẹn khách hỏi ngân hàng để có số chính thức" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người môi giới lập sẵn một bảng tính nhỏ: ô số tiền vay, ô số năm, ô lãi giả định. Mỗi khi khách hỏi, cô đổi ba ô và đọc kết quả, luôn nói kèm 'đây là ước tính theo lãi giả định, anh chị hỏi ngân hàng để có số chính thức'. Đây là tình huống minh hoạ, số liệu chỉ để dễ hình dung.",
    },
    quiz: [
      {
        question: "Vì sao lấy 1.000 triệu chia cho 240 tháng (ra khoảng 4,2 triệu) chưa phải khoản trả hàng tháng?",
        options: [
          "Nó chỉ trả phần gốc, còn lãi tính trên số dư chưa trả thì bị bỏ quên",
          "Vì 240 tháng là số quá dài nên ngân hàng luôn tự rút ngắn kỳ hạn còn 120 tháng",
          "Vì phải cộng thêm đúng 1% vào mỗi tháng bất kể lãi suất",
          "Vì ngân hàng chỉ cho vay theo năm nên không có khoản trả theo tháng",
        ],
        correct: 0,
        explanation:
          "4,2 triệu = 1.000 ÷ 240 chỉ hoàn trả gốc; tháng nào cũng còn nợ nên tháng nào cũng phát sinh lãi. Ngân hàng không tự rút ngắn kỳ hạn, không có quy tắc cộng cố định 1%, và việc trả theo tháng là điều rất phổ biến chứ không phải ngoại lệ.",
      },
      {
        question: "Kéo thời hạn vay từ 15 năm lên 25 năm, vẫn số tiền và lãi cũ. Điều gì xảy ra?",
        options: [
          "Khoản trả mỗi tháng giảm nhưng tổng lãi phải trả cả kỳ tăng",
          "Khoản trả mỗi tháng giảm và tổng lãi cũng giảm theo",
          "Khoản trả mỗi tháng tăng vì phải trả trong khoảng thời gian dài hơn",
          "Cả hai giữ nguyên vì số tiền vay và lãi không đổi",
        ],
        correct: 0,
        explanation:
          "Chia khoản nợ cho nhiều tháng hơn thì mỗi tháng nhẹ hơn (khoảng 10,7 triệu còn 9,1 triệu theo số minh hoạ), nhưng nợ tồn tại lâu hơn nên tổng lãi tăng. Nói tổng lãi giảm là nhầm hai chiều; nói khoản trả tăng thì ngược thực tế; và kỳ hạn là biến số thật sự đổi kết quả.",
      },
      {
        question: "Câu nào nên gửi khách?",
        options: [
          "Ước tính khoảng 9,7 triệu mỗi tháng nếu lãi giả định 10%/năm; ngân hàng báo số chính thức",
          "Anh chị trả đúng 9,7 triệu mỗi tháng suốt 20 năm, chắc chắn không đổi, tôi tính đủ rồi",
          "Khoảng 9,7 triệu, đã gồm mọi loại phí bảo hiểm và phí trả nợ trước hạn của ngân hàng nên khỏi hỏi",
          "Khoảng 4,2 triệu mỗi tháng, vì lấy 1 tỷ chia 240 tháng, không cần tính thêm tiền lãi gì nữa cả",
        ],
        correct: 0,
        explanation:
          "Con số kèm giả định và địa chỉ hỏi số thật là cách nói trung thực. 'Chắc chắn' hứa điều bạn không kiểm soát, 'đã tính mọi phí' là điều bạn không biết, và 4,2 triệu là phép chia bỏ quên lãi nên thấp hơn thực tế.",
      },
      {
        question: "Khách hỏi lãi suất có thay đổi không. Bảng của bạn đang dùng lãi 10% cố định. Bạn nên nói gì?",
        options: [
          "Bảng chỉ đúng với mức lãi giả định; nếu lãi đổi thì khoản trả cũng đổi",
          "Lãi luôn cố định suốt kỳ vay nên bảng này dùng cả đời được",
          "Lãi có đổi theo thời gian nhưng khoản trả hàng tháng thì không bao giờ đổi theo",
          "Bạn không cần nói gì, con số tự khắc đúng",
        ],
        correct: 0,
        explanation:
          "Với cùng khoản vay, lãi cao hơn thì mỗi tháng phải trả nhiều hơn (khoảng 9,7 lên 11,0 triệu khi lãi từ 10% lên 12%, số minh hoạ). Nói lãi luôn cố định là điều chỉ ngân hàng và hợp đồng xác nhận được. Nói khoản trả không đổi khi lãi đổi là sai, và im lặng khiến khách hiểu bảng là số cuối cùng.",
      },
      {
        question: "Ai là nơi cho khách con số khoản vay chính thức?",
        options: [
          "Ngân hàng, dựa trên hồ sơ và điều khoản thực tế của khách",
          "Bạn, vì bạn đã tính bằng bảng tính rất kỹ lưỡng và có kinh nghiệm nhiều năm",
          "AI, vì nó biết công thức tính khoản vay",
          "Chủ nhà, vì họ biết giá bán thật của căn",
        ],
        correct: 0,
        explanation:
          "Số chính thức phụ thuộc hồ sơ, mức lãi, phí và điều khoản của từng khách, chỉ bên cho vay có. Bảng tính của bạn và công thức của AI đều dựa trên giả định. Chủ nhà biết giá bán, không biết điều kiện vay của khách.",
      },
    ],
    keyTakeaways: [
      "Khoản trả hàng tháng gồm cả gốc và lãi, không phải chỉ số tiền vay chia cho số tháng.",
      "Kéo dài kỳ hạn làm khoản mỗi tháng nhẹ hơn nhưng tổng lãi cả kỳ tăng.",
      "Luôn nói giả định (lãi, số năm) khi đưa con số cho khách.",
      "Con số chính thức do ngân hàng báo; bảng của bạn chỉ là ước tính.",
    ],
    practicePrompt: {
      question: "Bảng ước tính khoản trả hàng tháng gửi khách cần ghi rõ điều gì?",
      options: [
        "Mức lãi giả định và số năm đã dùng để tính",
        "Lời cam kết ngân hàng sẽ cho vay đúng mức đó",
        "Tên ngân hàng có lãi thấp nhất để khách chọn",
        "Kết luận khách có đủ khả năng trả hay không",
      ],
      correct: 0,
      explanation:
        "Giả định là thứ khiến con số có nghĩa và cho khách biết khi nào nó không còn đúng. Cam kết vay được là điều chỉ ngân hàng quyết định, gợi ý ngân hàng là tư vấn bạn nên để chuyên gia làm, và kết luận khả năng trả là việc của khách với người có chuyên môn.",
    },
    summary: {
      keyIdea: "Một con số ước tính có giả định đi kèm giúp khách hình dung mà không hứa thay ngân hàng.",
      commonMistake: "Chia số tiền vay cho số tháng rồi báo đó là khoản trả hàng tháng.",
      action: "Lập bảng ba ô (số tiền, số năm, lãi giả định) và luôn ghi 'ước tính' bên cạnh kết quả.",
    },
    application: {
      title: "Bảng ước tính ba ô cho khách của bạn",
      message:
        "Trong 20 phút, mở một bảng tính và dựng ba ô: số tiền vay, số năm, lãi giả định. Hỏi AI công thức khoản trả đều hàng tháng, tự kiểm bằng một ví dụ nhỏ bạn tính được bằng máy tính. Ghi ở dưới bảng dòng 'ước tính, hỏi ngân hàng để có số chính thức'. Ngày mai bạn sẽ được hỏi: bảng của bạn ra bao nhiêu với khoản vay 1.000 triệu, 20 năm?",
      secondary: "Không đưa mức lãi cụ thể của một ngân hàng vào bảng; chỉ dùng lãi giả định.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách đứng ở cửa căn hộ mẫu, quay sang hỏi: 'Nếu vay 1 tỷ, mỗi tháng em trả khoảng bao nhiêu?' Bạn không muốn nói bừa, cũng không muốn nói 'em không biết'. Có một cách ở giữa: một con số ước tính, kèm giả định, kèm chỗ hỏi số thật.",
      },
      {
        type: "feynman",
        title: "Khoản trả hàng tháng đơn giản hơn bạn nghĩ",
        intro:
          "Bạn mượn bạn thân 10 triệu và hẹn trả dần 10 tháng. Nếu bạn ấy lấy thêm chút tiền công mỗi tháng trên số bạn còn nợ, thì mỗi tháng bạn trả nhiều hơn 1 triệu một chút. Vay mua nhà cũng thế, chỉ khác là lãi tính theo tháng và kéo dài nhiều năm.",
        columns: ["Yếu tố", "Chuyện mượn 10 triệu", "Chuyện vay mua nhà"],
        rows: [
          ["Số gốc", "10 triệu mượn", "Số tiền vay"],
          ["Thời gian", "10 tháng", "Số năm vay"],
          ["Công thêm", "Tiền công bạn ấy lấy", "Lãi suất tính trên số còn nợ"],
        ],
        oneLiner: "Khoản trả hàng tháng = gốc chia đều + lãi trên phần còn nợ, nên nó luôn lớn hơn gốc chia đều.",
      },
      { type: "heading", text: "Ba núm vặn: số tiền, số năm, lãi" },
      {
        type: "paragraph",
        text: "Hãy nghĩ khoản trả hàng tháng như âm lượng của một chiếc loa có ba núm vặn. Vặn tiền vay lên thì to hơn. Vặn số năm dài ra thì nhỏ đi nhưng loa bật lâu hơn. Vặn lãi lên thì to hơn. Bạn không cần thuộc công thức; bạn cần thấy núm nào làm gì, và biểu đồ dưới đây cho bạn vặn thử.",
      },
      {
        type: "list",
        items: [
          "Tiền vay tăng, khoản trả mỗi tháng tăng theo.",
          "Số năm vay dài hơn, mỗi tháng nhẹ hơn nhưng tổng lãi cả kỳ nhiều hơn.",
          "Lãi suất tăng, khoản trả mỗi tháng tăng.",
          "Ngân hàng có thể tính cách khác (lãi đổi theo kỳ, phí đi kèm), nên số của bạn luôn là ước tính.",
        ],
      },
      {
        type: "chart",
        title: "Khoản trả mỗi tháng theo số năm vay (trả đều gốc và lãi)",
        caption: "Số liệu minh hoạ tính theo công thức trả đều, không phải mức lãi hay điều khoản của ngân hàng nào. Kéo thanh trượt để đổi số tiền vay và lãi giả định.",
        kind: "line",
        xLabel: "Số năm vay",
        yLabel: "Triệu đồng mỗi tháng",
        x: { from: 5, to: 30, step: 5 },
        params: [
          { id: "vay", label: "Số tiền vay", min: 500, max: 3000, step: 100, value: 1000, unit: " triệu" },
          { id: "lai", label: "Lãi giả định", min: 6, max: 14, step: 0.5, value: 10, unit: "%/năm" },
        ],
        series: [
          { label: "Theo lãi giả định", expr: "vay*(lai/1200)*(1+lai/1200)^(12*x)/((1+lai/1200)^(12*x)-1)" },
          { label: "Nếu lãi cao hơn 2 điểm %", expr: "vay*((lai+2)/1200)*(1+(lai+2)/1200)^(12*x)/((1+(lai+2)/1200)^(12*x)-1)" },
        ],
      },
      {
        type: "callout",
        label: "Nói thế nào cho đúng",
        text: "Đưa số theo dạng: 'Ước tính khoảng ... triệu mỗi tháng nếu lãi giả định ...%/năm trong ... năm. Ngân hàng sẽ báo số chính thức theo hồ sơ của anh chị.' Đủ ba vế: số, giả định, nơi hỏi.",
      },
      {
        type: "comparison",
        left: { label: "Nói kiểu chốt hạ", text: "'Anh chị trả đúng 9,7 triệu mỗi tháng.' Nghe chắc chắn, nhưng nếu lãi khác thì khách nhớ bạn đã nói sai." },
        right: { label: "Nói kiểu ước tính", text: "'Khoảng 9,7 triệu nếu lãi 10% cố định; ngân hàng sẽ báo chính thức.' Khách vẫn hình dung được và không bị hứa suông." },
      },
      {
        type: "scenario",
        title: "Khách hỏi con số lúc đứng giữa căn hộ mẫu",
        start: "hoi",
        nodes: {
          hoi: {
            text: "Khách hỏi: 'Vay 1 tỷ, 20 năm thì mỗi tháng trả bao nhiêu?' Bảng ba ô của bạn đang mở sẵn trên điện thoại, lãi giả định 10%/năm.",
            choices: [
              { label: "Đọc số từ bảng, nói rõ là ước tính theo lãi giả định", next: "uocTinh" },
              { label: "Chia 1 tỷ cho 240 tháng rồi nói con số đó cho nhanh", next: "chiGoc" },
              { label: "Nói 'không biết, chị hỏi ngân hàng đi'", next: "tuChoi" },
            ],
          },
          uocTinh: {
            text: "Khách nghe 'khoảng 9,7 triệu mỗi tháng nếu lãi 10%'. Khách hỏi: 'Nếu lãi lên 12% thì sao?' Bạn định trả lời thế nào?",
            choices: [
              { label: "Kéo thanh lãi, đọc số mới (khoảng 11 triệu), nhắc lại đây chỉ là ước tính", next: "tot" },
              { label: "Nói 'lãi sẽ không lên đâu, chị yên tâm'", next: "hua" },
            ],
          },
          chiGoc: {
            text: "Khách ghi nhớ '4,2 triệu mỗi tháng' và tính kế hoạch chi tiêu theo. Đến khi ngân hàng báo hơn 9 triệu, khách thấy mình bị báo thiếu một nửa.",
            ending: "bad",
          },
          tuChoi: {
            text: "Khách gật đầu rồi mở điện thoại hỏi người môi giới khác vừa trả lời được ngay một con số ước tính. Bạn mất một buổi chăm khách chỉ vì không có bảng.",
            ending: "bad",
          },
          tot: {
            text: "Khách biết khoản vay nhạy thế nào với lãi, và tự hỏi ngân hàng những câu đúng. Họ quay lại xem căn thứ hai với bạn.",
            ending: "good",
          },
          hua: {
            text: "Nửa năm sau lãi đổi và khoản trả tăng. Khách nhớ câu bạn đã 'yên tâm'. Bạn hứa điều không ai kiểm soát được, và mất uy tín.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Gốc cộng lãi mới là khoản trả hàng tháng.",
          "Số ước tính luôn đi kèm giả định và địa chỉ hỏi số thật.",
          "Việc hôm nay: dựng bảng ba ô và thử với khoản vay 1.000 triệu, 20 năm.",
        ],
      },
    ],
  },
  {
    id: 2127,
    slug: "kiem-tra-con-so-ai-tinh-gia-moi-met-vuong",
    title: "Chặng 36, Bài 8: Kiểm lại con số AI tính giá mỗi mét vuông",
    subtitle: "Cùng một căn có hai diện tích khác nhau. AI dễ chia lẫn, và một phép chia sai đủ làm khách hiểu sai cả căn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Giá mỗi mét vuông là con số khách nhớ lâu nhất và đem ra so với căn khác. AI chia rất nhanh nhưng hay chia lẫn khi tin đăng ghi cả diện tích thông thủy lẫn diện tích tim tường, rồi còn tự thêm một câu so sánh nghe có lý. Bạn cần một thói quen 30 giây để bấm lại phép chia trước khi gửi.",
    openingQuestion:
      "Tin đăng ghi giá 3,2 tỷ, diện tích tim tường 68 m², thông thủy 63 m². AI trả lời 'giá mỗi m² thông thủy khoảng 42 triệu'. Bạn làm gì trước khi gửi khách?",
    openingOptions: [
      "Tự bấm lại phép chia 3.200 ÷ 63 bằng máy tính rồi đối chiếu",
      "Gửi luôn, vì AI tính toán chính xác hơn người nên không cần bấm lại máy",
      "Làm tròn thành 45 triệu cho đẹp con số",
      "Nhờ AI tính lại lần hai, nếu ra cùng số thì đúng",
    ],
    correctOption: 0,
    explanation:
      "3.200 ÷ 63 ra khoảng 50,8 triệu, không phải 42 triệu. Chỉ một lần bấm máy tính là bắt được lỗi. AI không tính toán như máy tính mà dự đoán chữ nghe hợp lý, nên nhanh không đồng nghĩa với đúng. Làm tròn cho đẹp là tự sửa số liệu. Nhờ AI tính lại có thể ra cùng một lỗi, vì nó lặp lại cùng cách dự đoán.",
    diagram: [
      { label: "Ghi rõ giá và loại diện tích trong tin đăng", arrow: true },
      { label: "AI chia ra giá mỗi mét vuông", arrow: true },
      { label: "Bạn bấm lại phép chia bằng máy tính", arrow: true },
      { label: "Chỉ giữ số khớp, gạch câu so sánh không có nguồn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người môi giới nhờ AI làm bảng giá mỗi m² của ba căn trong cùng toà nhà. Hai căn ghi diện tích tim tường, căn thứ ba ghi thông thủy; AI chia thẳng mà không hỏi. Khi cô nhân ngược lại, con số của căn thứ ba lệch nhiều so với hai căn kia và cô sửa trước khi gửi khách. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Giá 3.200 triệu, diện tích thông thủy 63 m². Giá mỗi m² thông thủy là bao nhiêu?",
        options: [
          "Khoảng 50,8 triệu mỗi mét vuông",
          "Khoảng 47,1 triệu (= 3.200 ÷ 68, dùng nhầm tim tường)",
          "Khoảng 42 triệu (chia sai, ra thấp hơn cả giá theo tim tường)",
          "Khoảng 0,02 triệu (= 63 ÷ 3.200, chia ngược)",
        ],
        correct: 0,
        explanation:
          "3.200 ÷ 63 = 50,8 triệu mỗi m². Con số 47,1 là 3.200 ÷ 68, tức đã dùng diện tích tim tường thay vì thông thủy. Con số 42 không ra từ phép chia nào hợp lý. Con số 0,02 là chia ngược, lấy diện tích chia cho giá.",
      },
      {
        question: "Diện tích tim tường và thông thủy khác nhau thế nào?",
        options: [
          "Tim tường tính tới giữa bức tường nên lớn hơn thông thủy, vốn chỉ đo phần bên trong",
          "Thông thủy lớn hơn vì tính luôn cả phần tường ngoài và ban công",
          "Hai loại luôn bằng nhau, chỉ khác nhau ở tên gọi trong hợp đồng và tin đăng",
          "Tim tường chỉ dùng cho nhà phố, thông thủy chỉ dùng cho chung cư",
        ],
        correct: 0,
        explanation:
          "Đo tới giữa tường thì gồm cả nửa bề dày tường nên lớn hơn phần ở được bên trong. Khẳng định thông thủy lớn hơn là ngược; hai loại khác nhau vài mét vuông nên không bằng nhau; và việc dùng loại nào phụ thuộc hợp đồng, tin đăng, không chia theo loại nhà.",
      },
      {
        question: "Cùng một mức giá, chia cho diện tích nhỏ hơn (thông thủy) thì giá mỗi m² như thế nào so với chia cho tim tường?",
        options: [
          "Cao hơn so với tính theo tim tường",
          "Thấp hơn, vì diện tích nhỏ thì giá mỗi m² cũng nhỏ theo",
          "Bằng nhau, vì tổng giá cả căn không thay đổi gì cả",
          "Không so được nếu chưa biết tên chủ đầu tư",
        ],
        correct: 0,
        explanation:
          "Số bị chia cố định, số chia nhỏ đi thì thương lớn lên: 3.200 ÷ 63 lớn hơn 3.200 ÷ 68. Nghĩ 'diện tích nhỏ thì giá mỗi m² nhỏ' là lẫn tổng giá với đơn giá. Giá cả căn không đổi nhưng đơn giá thì đổi theo cách đo. Tên chủ đầu tư không liên quan tới phép chia.",
      },
      {
        question: "AI viết 'căn bên cạnh giá 45 triệu/m² nên căn này rẻ hơn' trong khi ghi chú của bạn không có căn nào bên cạnh. Bạn xử lý thế nào?",
        options: [
          "Xoá câu đó, vì không có căn bên cạnh nào trong dữ liệu bạn đưa",
          "Giữ lại, vì AI thường đã biết sẵn giá thị trường của các căn xung quanh dự án",
          "Sửa 45 thành 50 cho khớp số vừa tính được",
          "Giữ lại nhưng thêm chữ 'theo nguồn tin đáng tin cậy'",
        ],
        correct: 0,
        explanation:
          "Không có dữ liệu thì câu so sánh là bịa; AI chèn con số cho câu văn nghe có lý. Không có thị trường xung quanh nào AI 'biết' theo cách bạn kiểm được. Sửa số cho khớp là tạo số giả thứ hai, và thêm chữ 'nguồn tin đáng tin' là gắn nhãn cho thứ không có nguồn.",
      },
      {
        question: "Cách kiểm nhanh một phép chia giá mỗi m² là gì?",
        options: [
          "Nhân đơn giá với diện tích, xem có ra đúng tổng giá ban đầu không",
          "Đọc lại kết quả, nếu nghe hợp lý thì đúng",
          "Chạy lại cùng yêu cầu với AI cho tới khi ra hai lần giống nhau hoàn toàn",
          "So với một căn khác cùng phường mà bạn nhớ mang máng",
        ],
        correct: 0,
        explanation:
          "Nhân ngược: 50,8 × 63 ≈ 3.200 là khớp, còn 42 × 63 ≈ 2.646 thì lệch ngay. Nghe hợp lý là điều AI giỏi tạo ra. Hai lần giống nhau vẫn có thể cùng sai. Và căn nhớ mang máng là một nguồn không kiểm được.",
      },
    ],
    keyTakeaways: [
      "Luôn ghi rõ loại diện tích (tim tường hay thông thủy) đi kèm mỗi giá mỗi m².",
      "Chia lại bằng máy tính hoặc nhân ngược, đừng tin con số chỉ vì nó nghe hợp lý.",
      "Câu so sánh với căn không có trong dữ liệu của bạn là câu bịa, gạch đi.",
      "So các căn với nhau thì dùng cùng một cách đo diện tích.",
    ],
    practicePrompt: {
      question: "Vì sao không nên so giá mỗi m² của một căn tính theo tim tường với căn khác tính theo thông thủy?",
      options: [
        "Hai cách đo cho diện tích khác nhau nên đơn giá không cùng thước đo",
        "Vì chủ đầu tư không cho phép so sánh hai căn",
        "Vì giá mỗi m² chỉ tính được cho căn tim tường",
        "Vì thông thủy luôn rẻ hơn tim tường",
      ],
      correct: 0,
      explanation:
        "Cùng tổng giá nhưng chia cho hai diện tích khác nhau sẽ ra hai đơn giá khác nhau, nên so trực tiếp là so lệch thước. Không có quy định cấm so hai căn; đơn giá tính được cho cả hai loại; và thông thủy cho ra đơn giá cao hơn chứ không rẻ hơn.",
    },
    summary: {
      keyIdea: "Phép chia nào AI làm, bạn nhân ngược lại trước khi gửi khách.",
      commonMistake: "Tin con số vì nó nghe hợp lý, hoặc so hai căn đo bằng hai loại diện tích.",
      action: "Lấy ba căn gần nhất, tự tính giá mỗi m² bằng máy tính rồi đối chiếu với AI.",
    },
    application: {
      title: "Bấm lại ba phép chia",
      message:
        "Lấy ba tin đăng bạn đã có, ghi giá, diện tích và loại diện tích. Nhờ AI tính giá mỗi m², rồi bạn tự nhân ngược lại bằng máy tính (khoảng 15 phút). Ghi chỗ nào lệch. Ngày mai bạn sẽ được hỏi: AI có tính sai căn nào không, và sai ở đâu?",
      secondary: "Nếu tin đăng không ghi loại diện tích, hỏi chủ nhà trước khi tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn dán thông tin một căn vào AI và nhờ tính giá mỗi mét vuông. Nó trả về bảng gọn gàng, vài câu nhận xét, cả một câu so với căn bên cạnh. Trông chuyên nghiệp, nhưng trong bảng đó có một con số chia sai và một câu bịa. Bài này dạy cách tìm chúng trong 30 giây.",
      },
      {
        type: "feynman",
        title: "Kiểm phép chia đơn giản hơn bạn nghĩ",
        intro:
          "Người bán rau tính tiền: 3 ký giá 90 nghìn, bạn nhẩm ngay một ký hơn 30 nghìn. Nếu họ báo 20 nghìn, bạn thấy lệch liền vì nhân ngược 3 × 20 chỉ ra 60. Giá mỗi mét vuông cũng thế: nhân đơn giá với diện tích phải ra lại tổng giá.",
        columns: ["Bước", "Chuyện mua rau", "Chuyện giá mỗi m²"],
        rows: [
          ["Số có sẵn", "3 ký, 90 nghìn", "Giá 3.200 triệu, diện tích 63 m²"],
          ["Người khác tính", "Người bán báo 20 nghìn/ký", "AI báo 42 triệu/m²"],
          ["Bạn nhân ngược", "3 × 20 = 60, lệch", "42 × 63 ≈ 2.646, lệch"],
        ],
        oneLiner: "Nhân ngược đơn giá với số lượng là cách nhanh nhất để bắt một phép chia sai.",
      },
      { type: "heading", text: "Hai loại diện tích, hai cách chia" },
      {
        type: "paragraph",
        text: "Diện tích thông thủy là phần bên trong, đo giữa hai mặt tường. Diện tích tim tường tính tới giữa bề dày bức tường nên lớn hơn vài mét vuông. Cùng một tổng giá, chia cho số nhỏ ra đơn giá cao hơn. AI thường không hỏi bạn dùng loại nào, nó chọn một số rồi chia.",
      },
      {
        type: "list",
        items: [
          "Ghi loại diện tích ngay cạnh con số, ví dụ '68 m² tim tường'.",
          "Bấm lại phép chia bằng máy tính, rồi nhân ngược để kiểm.",
          "So các căn với nhau bằng cùng một loại diện tích.",
          "Câu nào nhắc tới căn, dự án, số liệu bạn không đưa là câu cần gạch.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tính giá mỗi m² của AI",
        task: "Bấm vào những đoạn bạn nghi sai hoặc bịa rồi nộp. Dữ liệu bạn đưa AI: giá 3.200 triệu, diện tích tim tường 68 m², thông thủy 63 m². Không có thông tin gì về căn khác.",
        segments: [
          { text: "Giá rao của căn là 3,2 tỷ đồng, tức 3.200 triệu." },
          { text: "Diện tích tim tường 68 m², diện tích thông thủy 63 m², theo ghi chú của bạn." },
          { text: "Giá mỗi m² tính theo tim tường: 3.200 ÷ 68 ≈ 47 triệu." },
          {
            text: "Giá mỗi m² tính theo thông thủy: 3.200 ÷ 63 ≈ 42 triệu.",
            error: "3.200 ÷ 63 ≈ 50,8 triệu. AI chia sai; nhân ngược 42 × 63 ≈ 2.646 không ra 3.200.",
          },
          {
            text: "Vì thông thủy nhỏ hơn tim tường nên giá mỗi m² thông thủy thấp hơn.",
            error: "Ngược lại: cùng một giá, diện tích nhỏ hơn cho đơn giá cao hơn.",
          },
          {
            text: "Căn bên cạnh đang rao 45 triệu/m² nên căn này rẻ hơn.",
            error: "Không có căn bên cạnh nào trong dữ liệu bạn đưa; đây là số bịa. Kể cả nếu có, 47 lớn hơn 45 nên 'rẻ hơn' cũng sai.",
          },
          { text: "Khi so giá giữa các căn, cần dùng cùng một cách đo diện tích." },
        ],
      },
      {
        type: "flow",
        title: "Từ bản tính của AI tới bản gửi khách",
        steps: [
          { label: "Ghi dữ liệu và loại diện tích", detail: "Viết giá, diện tích, loại diện tích, nguồn tin đăng. Đây là những gì AI được phép dùng." },
          { label: "AI tính và nhận xét", detail: "Để AI chia ra đơn giá. Coi mọi câu nhắc tới căn khác hoặc số ngoài dữ liệu là nghi vấn." },
          { label: "Bạn nhân ngược từng số", detail: "Đơn giá nhân diện tích phải ra lại tổng giá, lệch quá vài phần trăm là sai." },
          { label: "Gạch câu không nguồn", detail: "Câu so sánh với căn bạn không có dữ liệu thì xoá, không sửa số cho khớp." },
          { label: "Ghi loại diện tích khi gửi", detail: "Kèm dòng 'tính theo diện tích thông thủy' để khách khỏi so lệch." },
        ],
      },
      {
        type: "callout",
        label: "Đừng sửa số cho khớp",
        text: "Khi phát hiện lệch, việc đúng là tính lại từ dữ liệu gốc hoặc bỏ con số, không phải chỉnh một số khác để nhìn ăn khớp. Số 'sửa cho đẹp' là số giả thứ hai.",
      },
      {
        type: "scenario",
        title: "Khách hỏi lại con số đã gửi",
        start: "hoi",
        nodes: {
          hoi: {
            text: "Bạn đã gửi khách bảng AI tính. Khách nhắn: 'Chị ơi em tự chia thì ra khoảng 51 triệu chứ đâu phải 42?'",
            choices: [
              { label: "Cảm ơn khách, tự bấm lại và nhận lỗi, gửi bảng đã sửa kèm loại diện tích", next: "nhanLoi" },
              { label: "Nói 'AI tính mà, chắc không sai đâu'", next: "chuAI" },
              { label: "Sửa lặng lẽ con số và không nhắc gì", next: "lang" },
            ],
          },
          nhanLoi: {
            text: "Khách thấy bạn nhận lỗi và có cách kiểm. Bạn thêm vào mẫu làm việc một bước nhân ngược trước khi gửi.",
            ending: "good",
          },
          chuAI: {
            text: "Khách tự chia lại lần nữa, thấy mình đúng và bắt đầu nghi ngờ mọi con số khác trong bảng của bạn.",
            ending: "bad",
          },
          lang: {
            text: "Khách nhận hai bảng có hai con số khác nhau và không hiểu vì sao. Bạn không nói gì nên khách đoán rằng bạn không chắc về mọi thứ.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nhân ngược mọi phép chia AI đưa ra.",
          "Câu so sánh không có nguồn trong dữ liệu là câu bịa.",
          "Việc hôm nay: bấm lại giá mỗi m² của ba căn gần nhất.",
        ],
      },
    ],
  },
  {
    id: 2128,
    slug: "viet-gioi-thieu-du-an-khong-sao-chep-cua-chu-dau-tu",
    title: "Chặng 36, Bài 9: Viết giới thiệu dự án bằng lời của bạn, không chép brochure",
    subtitle: "Từ 40 trang tài liệu dày đặc thành một trang đời thường - và gạch những câu hứa hẹn chưa có căn cứ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Tài liệu dự án thường viết để bán: câu nào cũng tích cực, nhiều câu nghe như lời hứa. Chép nguyên vào tin nhắn cho khách thì bạn đang nhân danh mình nói những điều bạn chưa kiểm. Nhờ AI rút ý bằng lời đời thường rồi bạn tự gạch câu hứa là cách vừa nhanh vừa giữ được uy tín.",
    openingQuestion:
      "Bạn được phát tài liệu dự án 40 trang. Khách cần một trang giới thiệu dễ hiểu. Cách làm nào hợp lý nhất?",
    openingOptions: [
      "Nhờ AI rút ý chính bằng lời đời thường rồi tự gạch câu hứa hẹn chưa có căn cứ",
      "Chép nguyên đoạn mở đầu của brochure vì nó do chủ đầu tư viết",
      "Nhờ AI viết lại thật hấp dẫn để khách thấy dự án hơn hẳn các nơi khác",
      "Chỉ gửi khách file tài liệu 40 trang để khỏi bị nói là nói sai",
    ],
    correctOption: 0,
    explanation:
      "Tài liệu bán hàng chứa cả sự kiện (vị trí, số toà, mặt bằng) lẫn lời quảng bá (tiềm năng, vượt trội, sinh lời). AI giúp rút phần sự kiện thành lời dễ hiểu; bạn giữ vai người gạch câu chưa có căn cứ. Chép nguyên brochure là nói thay chủ đầu tư những điều bạn chưa kiểm. Nhờ AI viết hấp dẫn hơn thường làm lời hứa thêm mạnh. Gửi nguyên 40 trang thì khách vẫn không hiểu gì.",
    diagram: [
      { label: "Dán từng phần tài liệu (không phải cả 40 trang)", arrow: true },
      { label: "Nhờ AI rút ý bằng lời đời thường, tách sự kiện và lời quảng bá", arrow: true },
      { label: "Bạn gạch câu hứa hẹn chưa có căn cứ", arrow: true },
      { label: "Viết lại một trang bằng giọng của bạn và ghi nguồn từng ý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người môi giới nhận brochure dày có câu 'cam kết lợi nhuận hấp dẫn'. Cô nhờ AI tách các câu thành hai nhóm: điều có thể kiểm (địa chỉ, số toà, tiến độ ghi trong tài liệu) và điều chỉ là quảng bá. Nhóm thứ hai cô không đưa vào tin nhắn cho khách và hỏi chủ đầu tư bằng văn bản nếu khách quan tâm. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Vì sao nên dán từng phần tài liệu vào AI thay vì cả 40 trang một lần?",
        options: [
          "Từng phần ngắn giúp AI bám sát nội dung và bạn dễ đối chiếu lại nguồn",
          "AI chỉ đọc được 5 trang, phần còn lại nó bỏ qua",
          "Dán cả tài liệu sẽ bị chủ đầu tư biết ngay",
          "Từng phần ngắn thì AI chắc chắn không bao giờ sai",
        ],
        correct: 0,
        explanation:
          "Đoạn ngắn giữ AI gần văn bản gốc và cho bạn biết ý nào lấy từ trang nào. Không có giới hạn cố định 5 trang. Việc chủ đầu tư biết hay không không phải lý do kỹ thuật, và chia nhỏ giảm rủi ro nhưng không bao giờ làm AI hết sai.",
      },
      {
        question: "Câu nào trong brochure là lời quảng bá nên gạch, không đưa vào trang của bạn?",
        options: [
          "Dự án sẽ mang lại lợi nhuận vượt trội cho mọi nhà đầu tư",
          "Dự án gồm hai toà, mỗi toà 30 tầng, theo tài liệu chủ đầu tư",
          "Dự án nằm ở phường A, cách đường lớn khoảng 300 m theo bản đồ tài liệu",
          "Dự kiến bàn giao quý 4 năm tới theo lịch chủ đầu tư công bố",
        ],
        correct: 0,
        explanation:
          "'Lợi nhuận vượt trội cho mọi nhà đầu tư' là lời hứa về tương lai không ai kiểm được. Ba câu còn lại là dữ kiện có thể kiểm: số toà, vị trí, lịch công bố. Chúng vẫn cần ghi là 'theo tài liệu chủ đầu tư' và nên hỏi lại bằng văn bản khi khách quyết định.",
      },
      {
        question: "AI viết thêm 'hồ bơi và trường quốc tế ngay trong khuôn viên' trong khi tài liệu bạn dán không nhắc hai thứ này. Đó là gì?",
        options: [
          "Chi tiết bịa, phải xoá và không gửi khách",
          "Thông tin bổ sung hữu ích mà tài liệu quên ghi",
          "Chi tiết đúng vì dự án nào cũng có tiện ích tương tự",
          "Thông tin AI lấy từ trang web của chủ đầu tư",
        ],
        correct: 0,
        explanation:
          "Không có trong nguồn bạn đưa thì nó do AI đoán cho câu văn đầy đặn. Nói hồ bơi và trường học sai sẽ khiến khách quyết định vì điều không tồn tại. AI không tự truy cập trang web của chủ đầu tư giúp bạn, và 'dự án nào cũng có' là suy đoán.",
      },
      {
        question: "Cách ghi nào đúng khi đưa một dữ kiện từ brochure vào trang giới thiệu?",
        options: [
          "'Theo tài liệu chủ đầu tư, dự kiến bàn giao quý 4' kèm ngày bạn đọc tài liệu",
          "'Bàn giao quý 4' được viết như một sự thật mà chính bạn đã tự đi kiểm chứng tận nơi",
          "'Bàn giao quý 4, cam kết không trễ' cho khách yên tâm",
          "Bỏ hết dữ kiện tiến độ vì có thể thay đổi",
        ],
        correct: 0,
        explanation:
          "Ghi nguồn và ngày cho khách biết ý là của ai và cũ mới ra sao. Viết như sự thật đã kiểm là nhận trách nhiệm về điều bạn chưa xác minh. Thêm 'cam kết không trễ' là hứa thay chủ đầu tư. Bỏ hết cũng không cần thiết, vì tiến độ khách cần biết, chỉ cần nói đúng nguồn.",
      },
      {
        question: "Một chỉ dẫn tốt cho AI khi rút ý tài liệu dự án là gì?",
        options: [
          "Rút ý bằng lời đời thường, chia hai nhóm: dữ kiện kiểm được và lời quảng bá",
          "Viết lại thật hấp dẫn, giàu cảm xúc và thuyết phục để khách thấy dự án là cơ hội hiếm",
          "Rút ý và bổ sung những gì còn thiếu cho đầy đủ",
          "Tóm tắt ngắn nhất có thể, càng ngắn càng tốt",
        ],
        correct: 0,
        explanation:
          "Tách hai nhóm cho bạn thấy ngay câu nào cần gạch. 'Hấp dẫn, thuyết phục' làm lời quảng bá mạnh thêm. 'Bổ sung những gì còn thiếu' là cho phép AI tự thêm chi tiết. Còn ngắn nhất có thể có nguy cơ làm mất dữ kiện quan trọng như tiến độ hay diện tích.",
      },
    ],
    keyTakeaways: [
      "Tài liệu dự án gồm dữ kiện kiểm được và lời quảng bá; hãy tách hai loại này ra.",
      "Chi tiết AI thêm mà tài liệu không có là chi tiết bịa, phải xoá.",
      "Mỗi dữ kiện đưa cho khách nên ghi 'theo tài liệu chủ đầu tư' và ngày đọc.",
      "Lời hứa về lợi nhuận hay giá tăng không nên viết ra dưới tên bạn.",
    ],
    practicePrompt: {
      question: "Câu nào nên hỏi chủ đầu tư bằng văn bản thay vì tự viết cho khách?",
      options: [
        "Mức giá bàn giao và điều khoản phạt nếu chậm tiến độ",
        "Dự án có bao nhiêu toà và căn hộ theo mặt bằng tài liệu",
        "Địa chỉ dự án trên bản đồ tài liệu",
        "Tên chủ đầu tư ghi trên brochure",
      ],
      correct: 0,
      explanation:
        "Giá và điều khoản chậm tiến độ ảnh hưởng tiền của khách, nên cần văn bản của chủ đầu tư, không phải lời bạn diễn đạt lại. Số toà, địa chỉ và tên chủ đầu tư là dữ kiện in sẵn trong tài liệu, bạn đọc ra và ghi nguồn được.",
    },
    summary: {
      keyIdea: "AI giúp rút ý; bạn giữ việc phân loại sự kiện và lời quảng bá.",
      commonMistake: "Chép nguyên lời quảng bá của brochure và nói như lời của mình.",
      action: "Chọn một dự án, rút ý một trang, gạch mọi câu hứa hẹn chưa có căn cứ.",
    },
    application: {
      title: "Một trang giới thiệu dự án bằng lời của bạn",
      message:
        "Lấy tài liệu của một dự án bạn đang tư vấn. Dán một phần khoảng 2-3 trang vào AI, nhờ rút ý và chia hai nhóm (dữ kiện kiểm được, lời quảng bá). Trong 20 phút, viết lại một trang ngắn bằng giọng của bạn, chỉ dùng nhóm dữ kiện và ghi 'theo tài liệu chủ đầu tư'. Ngày mai bạn sẽ được hỏi: bạn đã gạch những câu nào?",
      secondary: "Không dán thông tin cá nhân của khách hay hợp đồng thật vào AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Chủ đầu tư phát cho bạn cuốn tài liệu dự án dày 40 trang, bìa bóng, câu nào cũng đẹp. Khách nhắn: 'Chị tóm giúp em dự án này có gì.' Chép thì nhanh nhưng bạn sẽ nói những điều mình chưa kiểm; viết lại từ đầu thì mất cả buổi. Có cách thứ ba.",
      },
      {
        type: "feynman",
        title: "Rút ý tài liệu dự án đơn giản hơn bạn nghĩ",
        intro:
          "Người bạn kể cho bạn nghe một cuốn sách 300 trang. Bạn nhờ anh ấy kể bằng lời thường, và bạn tự để ý chỗ nào là chuyện thật, chỗ nào chỉ là lời khen của tác giả. Tài liệu dự án cũng vậy: AI kể lại, còn bạn là người nghe tỉnh táo.",
        columns: ["Vai", "Chuyện tóm tắt sách", "Chuyện tài liệu dự án"],
        rows: [
          ["Người kể lại", "Bạn kể sách bằng lời thường", "AI rút ý bằng lời đời thường"],
          ["Người nghe tỉnh táo", "Bạn tự biết chỗ nào tác giả khoe", "Bạn gạch câu hứa hẹn chưa có căn cứ"],
          ["Điều giữ lại", "Ý chính của sách", "Dữ kiện có trong tài liệu, kèm nguồn"],
        ],
        oneLiner: "AI kể lại cho gọn, còn việc phân biệt sự thật và lời khen là của bạn.",
      },
      { type: "heading", text: "Hai loại câu trong một cuốn brochure" },
      {
        type: "paragraph",
        text: "Câu loại một trả lời được 'ở đâu, bao nhiêu, khi nào': vị trí, số toà, tiến độ dự kiến. Bạn có thể ghi nguồn và hỏi lại được. Câu loại hai là lời khen: 'tiềm năng', 'vượt trội', 'sinh lời hấp dẫn'. Câu loại hai nghe hay nhưng không có ai chịu trách nhiệm cho nó.",
      },
      {
        type: "list",
        items: [
          "Dữ kiện: địa chỉ, số toà, số tầng, tiến độ dự kiến, diện tích căn theo mặt bằng tài liệu.",
          "Lời quảng bá: tiềm năng tăng giá, lợi nhuận, 'cơ hội hiếm có', 'cam kết'.",
          "Dữ kiện vẫn phải ghi nguồn 'theo tài liệu chủ đầu tư' vì bạn chưa tự kiểm.",
          "Lời quảng bá thì không viết dưới tên bạn; nếu khách quan tâm thì hỏi chủ đầu tư bằng văn bản.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI rút ý tài liệu dự án",
        task: "Lắp yêu cầu gồm ba phần: nội dung đưa vào, cách rút ý và điều phải làm với câu hứa. Xem AI đáp khác nhau ra sao.",
        parts: [
          {
            id: "noidung",
            label: "Nội dung đưa vào",
            options: [
              {
                text: "Dán hai trang mô tả vị trí và tiến độ, nói rõ chỉ dùng phần này",
                good: true,
                feedback: "Tốt: AI bám vào đúng đoạn bạn đưa và bạn dễ đối chiếu lại từng ý.",
              },
              {
                text: "Chỉ nêu tên dự án và nhờ AI kể những gì nó biết",
                feedback: "AI không có tài liệu của bạn nên sẽ điền các chi tiết nghe hợp lý, có thể sai hoàn toàn.",
              },
              {
                text: "Dán cả 40 trang, trộn lẫn phần pháp lý và hợp đồng mẫu",
                feedback: "Quá dài và lẫn nhiều loại nội dung, AI dễ bỏ sót dữ kiện quan trọng mà bạn khó phát hiện.",
              },
            ],
          },
          {
            id: "cach",
            label: "Cách rút ý",
            options: [
              {
                text: "Rút bằng lời đời thường, chia hai nhóm: dữ kiện và lời quảng bá",
                good: true,
                feedback: "Tốt: bạn thấy ngay câu nào kiểm được, câu nào cần gạch.",
              },
              {
                text: "Viết lại hấp dẫn hơn để khách muốn mua",
                feedback: "AI sẽ làm lời quảng bá mạnh thêm, và bạn nói những lời mạnh hơn cả brochure.",
              },
              {
                text: "Tóm tắt càng ngắn càng tốt trong hai câu",
                feedback: "Hai câu sẽ làm mất tiến độ và diện tích, những điều khách cần nhất, mà bạn không biết đã mất gì.",
              },
            ],
          },
          {
            id: "hua",
            label: "Xử lý câu hứa",
            options: [
              {
                text: "Đánh dấu mọi câu về lợi nhuận, tăng giá, cam kết và không đưa vào bản tóm tắt",
                good: true,
                feedback: "Tốt: lời hứa không có căn cứ bị giữ ngoài trang mang tên bạn.",
              },
              {
                text: "Giữ hết các câu ấy nhưng đổi thành lời văn nhẹ nhàng hơn",
                feedback: "Đổi giọng không làm lời hứa có căn cứ; khách vẫn đọc ra một lời hứa dưới tên bạn.",
              },
              {
                text: "Để AI tự quyết câu nào giữ, câu nào bỏ",
                feedback: "AI không biết câu nào có căn cứ; nó thường giữ những câu nghe hay nhất.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["noidung", "cach", "hua"],
            text: "Dữ kiện (theo tài liệu chủ đầu tư):\n- Vị trí: phường A, gần đường lớn\n- Quy mô: 2 toà, mỗi toà 30 tầng\n- Tiến độ dự kiến: bàn giao quý 4 năm tới\nLời quảng bá (không đưa vào bản gửi khách): 'tiềm năng tăng giá', 'lợi nhuận hấp dẫn', 'cam kết bàn giao đúng hẹn'.",
          },
          {
            requires: ["noidung"],
            text: "Dự án hai toà ở phường A, bàn giao quý 4, là cơ hội đầu tư hiếm có với tiềm năng tăng giá vượt trội, nhiều tiện ích đẳng cấp và cam kết lợi nhuận hấp dẫn cho người mua.",
          },
          {
            text: "Dự án cao cấp với hồ bơi, trường quốc tế, trung tâm thương mại ngay dưới chân toà, chắc chắn sẽ tăng giá mạnh trong vài năm tới và mang lại lợi nhuận cao cho nhà đầu tư.",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ tài liệu 40 trang tới trang gửi khách",
        steps: [
          { label: "Chọn phần cần dùng", detail: "Khách hỏi gì thì chỉ lấy phần đó: vị trí, quy mô, tiến độ. Mỗi lần dán 2-3 trang." },
          { label: "AI rút ý và tách nhóm", detail: "Yêu cầu chia hai nhóm: dữ kiện kiểm được và lời quảng bá." },
          { label: "Bạn gạch câu hứa", detail: "Mọi câu về lợi nhuận, tăng giá, cam kết đều ra khỏi bản gửi." },
          { label: "Đối chiếu với tài liệu gốc", detail: "Chi tiết nào không tìm thấy trong tài liệu bạn đưa (hồ bơi, trường học...) là chi tiết bịa." },
          { label: "Ghi nguồn và ngày", detail: "Mỗi ý kèm 'theo tài liệu chủ đầu tư, đọc ngày ...'." },
        ],
      },
      {
        type: "callout",
        label: "Dấu hiệu của một lời hứa",
        text: "Nhìn thấy 'chắc chắn', 'cam kết', 'đảm bảo', 'vượt trội', 'sinh lời' thì dừng lại: đó là ý kiến hoặc lời hứa, không phải dữ kiện. Nếu khách cần, hỏi chủ đầu tư bằng văn bản.",
      },
      {
        type: "scenario",
        title: "Khách hỏi về câu 'cam kết lợi nhuận'",
        start: "hoi",
        nodes: {
          hoi: {
            text: "Bản rút ý của bạn đã sạch, nhưng khách đã đọc brochure và hỏi: 'Trong tài liệu ghi cam kết lợi nhuận hấp dẫn, chị xác nhận giúp em nhé?'",
            choices: [
              { label: "Nói bạn chưa có văn bản nào xác nhận, và sẽ hỏi chủ đầu tư bằng văn bản", next: "vanBan" },
              { label: "Nói 'cam kết thì chắc chắn rồi, brochure ghi mà'", next: "chacchan" },
            ],
          },
          vanBan: {
            text: "Bạn soạn câu hỏi: lợi nhuận nào, tính thế nào, ai chịu trách nhiệm, và gửi chủ đầu tư. Bạn chưa biết câu trả lời, và bạn nói thẳng với khách như vậy.",
            choices: [
              { label: "Chờ văn bản trả lời rồi mới chuyển thông tin cho khách", next: "tot" },
              { label: "Nói thay chủ đầu tư 'chắc họ sẽ đồng ý' để khách yên tâm", next: "doan" },
            ],
          },
          chacchan: {
            text: "Khách coi lời bạn như đảm bảo. Sau này lợi nhuận không như kỳ vọng, khách quay lại hỏi trách nhiệm của người đã nói 'chắc chắn'.",
            ending: "bad",
          },
          tot: {
            text: "Khách nhận được câu trả lời của chính chủ đầu tư bằng văn bản và tự quyết định với thông tin thật. Bạn giữ được niềm tin.",
            ending: "good",
          },
          doan: {
            text: "Bạn nói thay điều mình không biết. Khi văn bản trả lời khác đi, bạn thành người đã hứa hộ.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI rút ý, bạn phân loại và gạch.",
          "Chi tiết không có trong tài liệu bạn đưa là chi tiết bịa.",
          "Việc hôm nay: rút một trang dự án, tách dữ kiện và lời quảng bá.",
        ],
      },
    ],
  },
  {
    id: 2129,
    slug: "mini-ban-so-sanh-khu-vuc-gui-khach",
    title: "Chặng 36, Bài 10: Mini-dự án: bản so sánh hai khu vực gửi khách một trang",
    subtitle: "Ghép mọi thứ đã học thành một trang: số liệu có nguồn, ngày thu thập, loại diện tích, và chỗ nào chỉ là ước tính.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: ghi số, tính khoản trả, kiểm phép chia, gạch câu hứa. Bài này ghép chúng thành một trang khách đọc một mình, trước khi gặp bạn. Trang tốt là trang mà mỗi con số đều có nguồn và ngày, để khách gặp bạn với câu hỏi hay hơn thay vì với sự nghi ngờ.",
    openingQuestion:
      "Bạn sắp gửi khách trang so sánh hai phường. Trang nào an toàn nhất để khách tự đọc trước khi gặp?",
    openingOptions: [
      "Trang có bảng số, ngày thu thập, loại diện tích, và dòng ghi rõ số nào là ước tính",
      "Trang có bảng số đẹp và một câu kết luận nên chọn phường nào",
      "Trang chỉ có lời mô tả hai phường để khách cảm nhận, không có số",
      "Trang có nhiều số nhất có thể, càng nhiều càng chứng tỏ bạn chuyên nghiệp",
    ],
    correctOption: 0,
    explanation:
      "Khách đọc một mình nên trang phải tự trả lời 'số này từ đâu, ngày nào, tính theo cái gì, chỗ nào chỉ là ước tính'. Kết luận thay khách là điều bạn không nên tự quyết. Trang không có số thì không giúp so sánh. Nhiều số hơn không tốt hơn nếu số nào cũng không rõ nguồn, và càng nhiều số càng khó kiểm.",
    diagram: [
      { label: "Chọn hai khu vực và 5 căn mỗi nơi, ghi giá rao, diện tích, ngày", arrow: true },
      { label: "AI xếp thành bảng một trang, không thêm số", arrow: true },
      { label: "Bạn tự kiểm: nhân ngược, gạch câu bịa và câu hứa", arrow: true },
      { label: "Thêm nguồn, ngày, loại diện tích rồi mới gửi khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một người môi giới gửi khách trang so sánh hai phường: mỗi con số có ghi 'ghi ngày 12/9' và 'giá rao', khoản vay có dòng 'ước tính, hỏi ngân hàng'. Khách in ra, gạch bút chì những chỗ muốn hỏi, và buổi gặp sau đó đi thẳng vào đúng những câu ấy. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Mỗi con số trên trang gửi khách nên đi kèm những gì?",
        options: [
          "Nguồn, ngày ghi và loại giá hay loại diện tích",
          "Chỉ đơn vị, vì khách tự hiểu phần còn lại",
          "Tên công cụ AI đã dùng để tính con số đó",
          "Một câu nhận xét con số này tốt hay xấu",
        ],
        correct: 0,
        explanation:
          "Nguồn, ngày và loại đo cho khách biết số đến từ đâu và cũ mới ra sao. Chỉ đơn vị thì khách không kiểm được, tên công cụ không giúp kiểm số, còn nhận xét tốt xấu là quyết định của khách chứ không phải của trang số liệu.",
      },
      {
        question: "Khoản trả hàng tháng ước tính trên trang nên trình bày ra sao?",
        options: [
          "Ghi 'ước tính' cùng mức lãi giả định, số năm và nơi hỏi số chính thức",
          "Ghi con số thật tròn trịa và đơn giản, không kèm điều kiện gì để khách dễ nhớ và dễ truyền đạt",
          "Ghi thêm 'ngân hàng chắc chắn duyệt vay' cho khách yên tâm",
          "Bỏ khoản vay ra khỏi trang vì có thể gây tranh luận",
        ],
        correct: 0,
        explanation:
          "Ước tính với giả định là cách trung thực để khách hình dung mà không hứa thay ngân hàng. Con số trần không kèm giả định dễ bị hiểu như cam kết. 'Ngân hàng chắc chắn duyệt' là lời hứa bạn không kiểm soát. Bỏ hẳn thì khách mất một thông tin hữu ích.",
      },
      {
        question: "Trước khi gửi, bạn đọc lại và thấy AI ghi 'phường B sắp có tuyến đường mới nên giá sẽ tăng'. Bạn làm gì?",
        options: [
          "Xoá câu đó, vì không có trong số liệu bạn đưa và là dự đoán tăng giá",
          "Giữ lại vì nghe hợp lý và có vẻ đúng",
          "Đổi 'sẽ tăng' thành 'chắc chắn tăng' để câu rõ ràng và khách dễ hiểu hơn nhiều",
          "Giữ lại nhưng in nghiêng để khách biết đó là nhận xét",
        ],
        correct: 0,
        explanation:
          "Câu này vừa không có trong dữ liệu vừa là dự đoán giá, tức lời hứa không căn cứ. Nghe hợp lý là chuẩn mà AI giỏi tạo ra chứ không phải chuẩn của sự thật. Đổi thành 'chắc chắn' làm nặng thêm lời hứa, và in nghiêng không đổi được bản chất của câu.",
      },
      {
        question: "Bạn nhân ngược thấy một ô giá mỗi m² lệch khoảng 20% so với tổng giá chia diện tích. Việc đầu tiên là gì?",
        options: [
          "Tự tính lại ô đó từ dữ liệu gốc và sửa theo kết quả tính được",
          "Chỉnh số trong ô cho bằng các ô hàng xóm để cả cột nhìn đều và đẹp mắt",
          "Giữ nguyên vì 20% là sai lệch nhỏ",
          "Xoá cả bảng và bắt đầu lại từ đầu",
        ],
        correct: 0,
        explanation:
          "Chỉ ô lệch cần tính lại từ dữ liệu gốc; các ô đã khớp vẫn dùng được. Chỉnh cho đều là sửa số để đẹp, không phải sửa cho đúng. Lệch 20% không phải nhỏ, khách sẽ thấy khi tự chia. Còn xoá cả bảng thì bỏ phí phần đã kiểm đúng.",
      },
      {
        question: "Ai nên quyết định phường nào hợp với khách?",
        options: [
          "Khách, dựa trên bảng và điều họ coi trọng",
          "AI, vì nó nhìn được mọi số liệu cùng lúc",
          "Bạn, vì bạn hiểu thị trường hơn khách",
          "Chủ nhà, vì họ là người muốn bán được căn nhanh nhất",
        ],
        correct: 0,
        explanation:
          "Bảng chỉ cho thấy khác nhau ở đâu; điều gì quan trọng hơn (giá, đi làm hay trường học) là của khách. AI không biết hoàn cảnh của khách. Bạn có thể tư vấn nhưng không thay khách quyết định. Còn chủ nhà có lợi ích riêng nên không phải người quyết định giúp khách.",
      },
    ],
    keyTakeaways: [
      "Một trang gửi khách phải tự trả lời: số từ đâu, ngày nào, đo theo cái gì.",
      "Số liệu ước tính luôn có giả định và nơi hỏi số chính thức.",
      "Câu dự đoán giá hoặc hứa hẹn không có trong dữ liệu thì gạch.",
      "Khách là người quyết định; trang chỉ cho thấy hai khu vực khác nhau ở đâu.",
    ],
    practicePrompt: {
      question: "Trang một trang gửi khách nên kết thúc bằng gì?",
      options: [
        "Ngày thu thập, loại giá và dòng nhắc mọi khoản ước tính cần xác nhận với người có chuyên môn",
        "Một lời mời chốt cọc ngay để giữ căn",
        "Lời khẳng định số liệu của bạn chính xác tuyệt đối",
        "Danh sách các căn khách nên mua",
      ],
      correct: 0,
      explanation:
        "Ngày, loại giá và lời nhắc xác nhận cho khách biết trang này có giới hạn gì. Mời chốt cọc tạo áp lực, khẳng định chính xác tuyệt đối là lời hứa không giữ được, và danh sách nên mua là quyết định của khách.",
    },
    summary: {
      keyIdea: "Trang so sánh tốt cho khách thấy số từ đâu, ngày nào, và chỗ nào chỉ là ước tính.",
      commonMistake: "Gửi trang có kết luận và dự đoán tăng giá mà không có số liệu nào của chính bạn.",
      action: "Dựng trang một trang cho hai khu vực thật, kiểm từng ô và gửi thử cho đồng nghiệp đọc.",
    },
    application: {
      title: "Trang so sánh hai khu vực đầu tiên của bạn",
      message:
        "Chọn hai khu vực bạn thật sự tư vấn. Dùng bảng số đã ghi ở bài 6, thêm một dòng khoản trả ước tính (bài 7), nhân ngược giá mỗi m² (bài 8), gạch câu hứa (bài 9). Dựng trang một trang trong 20 phút và gửi thử cho một đồng nghiệp. Ngày mai bạn sẽ được hỏi: đồng nghiệp gạch chỗ nào không rõ nguồn?",
      secondary: "Chưa gửi trang này cho khách thật cho tới khi đồng nghiệp đã đọc.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách nhắn: 'Chị gửi em bản so sánh để em đọc trước, cuối tuần mình gặp.' Bạn có sổ ghi giá rao, một bảng khoản vay, và một bản tính giá mỗi m² đã nhân ngược. Việc còn lại là ghép chúng thành một trang khách đọc một mình mà không hiểu lầm.",
      },
      {
        type: "feynman",
        title: "Trang gửi khách đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ thực đơn quán quen: món gì, giá bao nhiêu, cỡ nào, có ghi rõ 'chưa gồm thuế phục vụ' không. Khách tự đọc, tự gọi được và ít khi phải hỏi lại. Trang so sánh hai khu vực cũng là một tờ thực đơn như thế, chỉ có số thay cho món ăn.",
        columns: ["Phần", "Thực đơn quán", "Trang so sánh"],
        rows: [
          ["Món và giá", "Tên món, giá từng món", "Giá rao, diện tích, giá mỗi m²"],
          ["Điều kiện", "Chưa gồm thuế phục vụ", "Đây là giá rao, ghi ngày ..."],
          ["Ghi chú", "Món theo mùa", "Khoản vay chỉ là ước tính theo lãi giả định"],
        ],
        oneLiner: "Trang tốt trả lời trước những câu khách sẽ hỏi: số này là gì, lúc nào, tính thế nào.",
      },
      { type: "heading", text: "Một trang, bốn khối" },
      {
        type: "paragraph",
        text: "Trang một trang không cần đẹp cầu kỳ; nó cần đủ bốn khối theo thứ tự khách sẽ đọc. Khối đầu là bảng giá và diện tích. Khối hai là quãng đường và những thứ gần đó bạn tự đo. Khối ba là khoản trả ước tính. Khối cuối là chú thích nguồn, ngày và giới hạn.",
      },
      {
        type: "list",
        items: [
          "Khối 1: giá rao, diện tích và giá mỗi m² của từng khu vực, ghi loại diện tích.",
          "Khối 2: quãng đường tới nơi khách đi làm và trường học, ghi ngày bạn đo.",
          "Khối 3: khoản trả hàng tháng ước tính, kèm lãi giả định và số năm.",
          "Khối 4: nguồn, ngày thu thập, dòng 'đây là giá rao, chưa phải giá bán'.",
        ],
      },
      {
        type: "flow",
        title: "Ghép trang so sánh từ các bài trước",
        steps: [
          { label: "Lấy sổ ghi của bạn (bài 6)", detail: "Giá rao, diện tích, ngày ghi của 5 căn mỗi khu vực. Đây là toàn bộ số liệu được phép dùng." },
          { label: "Nhờ AI xếp bảng", detail: "Yêu cầu chỉ trình bày lại số đã đưa; ô thiếu ghi 'chưa có số liệu'." },
          { label: "Thêm khoản trả ước tính (bài 7)", detail: "Ghi 'ước tính', mức lãi giả định, số năm và nơi hỏi số chính thức." },
          { label: "Nhân ngược từng giá mỗi m² (bài 8)", detail: "Đơn giá nhân diện tích phải ra lại tổng giá; ô lệch thì tính lại từ dữ liệu gốc." },
          { label: "Gạch câu hứa và dự đoán (bài 9)", detail: "Mọi câu về tăng giá, lợi nhuận, cam kết ra khỏi trang." },
          { label: "Gửi thử cho đồng nghiệp", detail: "Nhờ họ gạch chỗ nào không biết số từ đâu, rồi sửa trước khi gửi khách." },
        ],
      },
      {
        type: "callout",
        label: "Một câu hỏi cho mỗi ô",
        text: "Trước khi gửi, hỏi từng ô trong bảng: 'Số này nằm ở dòng nào trong sổ của mình?' Ô nào không trả lời được thì gạch hoặc ghi 'chưa có số liệu'.",
      },
      {
        type: "comparison",
        left: { label: "Trang khó kiểm", text: "Đẹp, nhiều số, có câu 'phường B sắp tăng giá' và 'chắc chắn vay được'. Khách đọc xong vẫn không biết số từ đâu." },
        right: { label: "Trang dễ kiểm", text: "Ít số hơn nhưng mỗi số có nguồn, ngày, loại đo; ước tính ghi rõ là ước tính. Khách mang đúng câu hỏi tới buổi gặp." },
      },
      {
        type: "scenario",
        title: "Trang so sánh trước giờ gửi",
        start: "kiem",
        nodes: {
          kiem: {
            text: "Bảng đã xong. Bạn đọc lại lần cuối và thấy hai điều: một dòng 'phường B sắp có đường mới nên giá tăng' do AI thêm vào, và ô quãng đường của phường A chưa đo, đang trống.",
            choices: [
              { label: "Xoá dòng dự đoán, tự đo quãng đường phường A, ghi ngày đo rồi mới gửi", next: "kiemKy" },
              { label: "Giữ dòng dự đoán vì nghe có lý, ô trống thì điền số ước tính cho đầy bảng", next: "vaiSo" },
              { label: "Gửi luôn cho kịp giờ khách hẹn, sửa sau nếu khách hỏi", next: "vội" },
            ],
          },
          kiemKy: {
            text: "Trang sạch và có nguồn. Trước khi gửi khách, bạn còn hai lựa chọn.",
            choices: [
              { label: "Gửi thử cho một đồng nghiệp đọc, sửa chỗ họ gạch rồi gửi khách", next: "tot" },
              { label: "Gửi khách luôn, vì đã tự kiểm kỹ", next: "chuquan" },
            ],
          },
          vaiSo: {
            text: "Khách hỏi 'đường mới nào vậy chị?' và bạn không có gì để chỉ. Con số quãng đường ước tính của phường A cũng lệch nhiều so với thực tế khi khách tự đi thử.",
            ending: "bad",
          },
          vội: {
            text: "Khách đọc, hỏi lại hai chỗ, rồi hỏi tiếp một chỗ nữa. Bạn phải sửa trước mặt khách và buổi gặp mất nửa thời gian để chữa cháy.",
            ending: "bad",
          },
          tot: {
            text: "Đồng nghiệp gạch một câu chưa rõ nguồn. Bạn sửa, gửi khách, và buổi gặp cuối tuần bắt đầu bằng đúng những câu hỏi khách gạch bút chì trên trang.",
            ending: "good",
          },
          chuquan: {
            text: "Trang tốt, nhưng khách hỏi một chỗ mà bạn vì quen tay nên không nhận ra là khó hiểu. Một lần đọc thử của người khác sẽ bắt được điều này.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi ô trong trang trả lời được: lấy từ dòng nào trong sổ của bạn.",
          "Ước tính luôn ghi 'ước tính' và có nơi hỏi số chính thức.",
          "Việc hôm nay: dựng trang một trang cho hai khu vực của bạn và nhờ một người đọc thử.",
        ],
      },
    ],
  },
];
