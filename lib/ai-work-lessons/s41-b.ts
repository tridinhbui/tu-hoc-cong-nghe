import type { Lesson } from "../lesson-types";

// Chặng 41, bài 6-10. Giáo trình: scripts/curriculum/stage-41.json.
// Bài học dạy khái niệm bền (cách giao việc cho AI và cách kiểm kết quả), không dựa vào tính năng riêng của công cụ nào.
export const S41_B_LESSONS: Lesson[] = [
  {
    id: 2225,
    slug: "freelancer-tinh-gia-tu-gio-lam-that-cua-ban",
    title: "Chặng 41, Bài 6: Tính giá từ số giờ làm thật thay vì đoán",
    subtitle: "Ghi lại ba việc gần nhất, để AI làm phép tính, còn con số giờ là của bạn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách hỏi làm một logo bao nhiêu, và bạn buột miệng nói một con số nghe hợp lý. Đến tuần sau bạn mới nhận ra mình đã ngồi sửa đến 15 tiếng, chia ra thì công một giờ chỉ bằng nửa mức bạn mong. Giá đoán thường nghiêng về phía bạn thiệt, vì ta hay quên giờ trao đổi và giờ sửa.",
    openingQuestion:
      "Bạn chưa biết mình làm một logo mất bao lâu, mà khách đang chờ báo giá. Cách nào cho con số đáng tin nhất?",
    openingOptions: [
      "Ghi số giờ thật của ba việc gần nhất, lấy trung bình rồi tính giá",
      "Hỏi AI giá một logo trên thị trường rồi báo đúng con số đó cho khách ngay",
      "Báo giá cao một chút vì khách nào cũng sẽ đòi bớt",
      "Báo giá thấp để chắc chắn nhận được việc, sau này tăng giá sau",
    ],
    correctOption: 0,
    explanation:
      "Số giờ thật của chính bạn là dữ liệu duy nhất bạn có, gồm cả giờ trao đổi và giờ sửa mà ta hay quên. AI giúp ở khâu tính toán và tạo bảng, không biết bạn làm nhanh hay chậm. Con số thị trường mà AI đưa ra là ước chừng chung, không gắn với tốc độ của bạn. Báo cao để chờ mặc cả hay báo thấp để giữ khách đều là đoán, và cả hai cách đều để lại thiệt về sau.",
    diagram: [
      { label: "Ghi số giờ thật của ba việc gần nhất", arrow: true },
      { label: "Bạn chọn giá theo giờ mong muốn", arrow: true },
      { label: "AI làm phép tính và thêm phần dự phòng cho giờ sửa", arrow: true },
      { label: "Bạn kiểm lại phép tính rồi mới báo giá" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn thiết kế đồ hoạ tự do ghi lại ba dự án logo gần nhất, số giờ lần lượt là 9, 12 và 15 (số liệu minh hoạ). Bạn nhờ AI tính trung bình và thêm một khoản dự phòng cho giờ sửa. Khi so với mức giá bạn hay báo, bạn thấy mình đã báo thấp vì không đếm giờ trao đổi qua tin nhắn. Bạn tự quyết mức giá theo giờ mới, AI chỉ làm phép nhân.",
    },
    quiz: [
      {
        question: "Vì sao nên ghi số giờ thật của các việc đã làm trước khi báo giá?",
        options: [
          "Vì đó là dữ liệu duy nhất phản ánh tốc độ thật của bạn",
          "Vì AI từ chối tính giá nếu bạn chưa ghi đủ ba việc",
          "Vì khách hàng luôn yêu cầu xem bảng ghi giờ của bạn",
          "Vì giá theo giờ của người khác trên mạng chắc chắn sai hết",
        ],
        correct: 0,
        explanation:
          "Chỉ bạn biết mình làm nhanh hay chậm, kể cả giờ trao đổi và giờ sửa. AI vẫn tính được khi thiếu dữ liệu nhưng sẽ dựa vào giả định chung. Khách không nhất thiết đòi xem bảng giờ, và giá của người khác chỉ để tham khảo chứ không sai hẳn.",
      },
      {
        question: "Bạn ghi ba việc mất 8, 10 và 12 giờ. Muốn thêm 20% dự phòng cho giờ sửa thì tính thế nào?",
        options: [
          "Trung bình là 10 giờ, nhân 1,2 được 12 giờ",
          "10 + 20 = 30 giờ, vì phần trăm cộng thẳng vào số giờ",
          "12 giờ là việc dài nhất nên lấy nó, không cần cộng thêm dự phòng",
          "(8 + 10 + 12) × 1,2 = 36 giờ, coi đó là số giờ cho một dự án",
        ],
        correct: 0,
        explanation:
          "Trung bình (8 + 10 + 12) chia 3 bằng 10 giờ; thêm 20% là nhân 1,2 nên ra 12 giờ. Cộng 20 vào số giờ là nhầm phần trăm với số tuyệt đối. Nhân cả tổng ba việc cho ra giờ của ba dự án chứ không phải của một. Lấy việc dài nhất không phải là dự phòng có cơ sở.",
      },
      {
        question: "Bạn nhờ AI tính giá và nó trả về một con số mà không ghi phép tính. Nên làm gì?",
        options: [
          "Bảo AI viết ra phép tính từng bước, rồi bạn tự nhân lại bằng máy tính",
          "Dùng luôn con số vì AI làm toán không bao giờ sai",
          "Làm tròn con số lên cho đẹp rồi gửi khách ngay để khỏi mất thời gian chờ",
          "Hỏi lại AI cùng câu đó và chọn con số xuất hiện nhiều lần nhất",
        ],
        correct: 0,
        explanation:
          "Muốn tin một con số, bạn phải thấy được cách ra nó và tự tính lại. AI có thể nhầm khi nhân chuỗi nhiều bước dù câu chữ nghe trôi chảy. Hỏi nhiều lần rồi chọn số hay gặp nhất vẫn không chứng minh phép tính đúng, và làm tròn khi chưa kiểm là chồng thêm một lớp đoán.",
      },
      {
        question: "Giờ sửa theo yêu cầu khách nên nằm ở đâu trong cách tính giá?",
        options: [
          "Có số lần sửa đã tính trong giá, sửa thêm thì tính riêng",
          "Không tính, vì sửa cho khách hài lòng là tất nhiên",
          "Tính hết mọi lần sửa khách có thể đòi vào giờ làm ban đầu, dù khách chưa đòi lần nào",
          "Chỉ tính khi khách tỏ ra khó chịu về kết quả sau lần sửa đầu tiên",
        ],
        correct: 0,
        explanation:
          "Khách cần biết trước giá đã gồm bao nhiêu lần sửa để hai bên cùng hiểu. Không tính thì giờ sửa ăn vào thu nhập của bạn mà không ai để ý. Cộng mọi lần sửa có thể xảy ra làm giá phồng lên và khó nhận việc. Tính tuỳ tâm trạng khách thì mỗi khách một kiểu, không công bằng và khó lặp lại.",
      },
      {
        question: "Kết quả AI đưa ra là 'giá trung bình cho một logo là 5 triệu đồng'. Cách dùng đúng con số này là gì?",
        options: [
          "Xem nó là gợi ý chưa có nguồn, chỉ dùng để đối chiếu với giá từ giờ thật của bạn",
          "Báo đúng 5 triệu vì AI đã tổng hợp từ nhiều nguồn trên mạng",
          "Trừ đi 20% để rẻ hơn thị trường rồi báo cho dễ nhận việc",
          "Nhân đôi lên 10 triệu vì AI thường báo thấp hơn giá thật",
        ],
        correct: 0,
        explanation:
          "AI không cho nguồn thì bạn không biết con số từ đâu, nên chỉ để tham khảo. Nó không biết ngành, thành phố và kinh nghiệm của bạn. Tự giảm 20% hay nhân đôi đều là thêm một phép đoán lên trên phép đoán đã có, còn giá của bạn phải xuất phát từ số giờ thật.",
      },
    ],
    keyTakeaways: [
      "Giá tốt bắt đầu từ số giờ thật của ba việc gần nhất, không phải từ cảm giác.",
      "Đếm cả giờ trao đổi và giờ sửa, đây là chỗ ta hay quên nhất.",
      "AI làm phép tính, con số giờ và mức giá theo giờ do bạn quyết.",
      "Luôn yêu cầu AI viết phép tính từng bước rồi tự nhân lại.",
      "Giá phải nói rõ đã gồm bao nhiêu lần sửa.",
    ],
    practicePrompt: {
      question:
        "Chị Mai ghi ba việc mất 6, 9 và 9 giờ. Chị nhờ AI tính giá với 300 nghìn đồng một giờ, dự phòng 25%. AI trả về 2,7 triệu đồng. Bước nào chị nên làm tiếp?",
      options: [
        "Tự tính lại: trung bình 8 giờ, nhân 1,25 được 10 giờ, nhân 300 nghìn được 3 triệu đồng",
        "Nhận 2,7 triệu vì AI tính trước nhanh hơn chị",
        "Bỏ phần dự phòng cho số cuối tròn trịa hơn",
        "Chọn việc mất 9 giờ làm chuẩn và bỏ hẳn việc 6 giờ",
      ],
      correct: 0,
      explanation:
        "Trung bình (6 + 9 + 9) chia 3 bằng 8 giờ, nhân 1,25 bằng 10 giờ, nhân 300 nghìn bằng 3 triệu, khác với 2,7 triệu của AI nên chị phải hỏi lại phép tính. Nhận ngay con số chưa kiểm là bỏ qua điểm mấu chốt. Bỏ dự phòng làm chị thiệt ở giờ sửa, còn bỏ việc ngắn nhất thì trung bình lệch lên và không có lý do chính đáng.",
    },
    summary: {
      keyIdea: "Giá từ số giờ thật, AI làm phép tính, bạn kiểm lại từng bước.",
      formula: "Giá = số giờ trung bình × (1 + dự phòng) × giá theo giờ bạn muốn.",
      commonMistake: "Báo giá theo cảm giác rồi quên tính giờ trao đổi và giờ sửa.",
      action: "Ghi số giờ thật của ba việc gần nhất, kể cả giờ nhắn tin với khách.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch hoặc tin nhắn, ghi số giờ bạn đã bỏ ra cho ba việc gần nhất (làm, sửa, trao đổi). Nhờ AI tính trung bình và giá với một mức giờ bạn chọn và dự phòng 20%, đòi nó viết phép tính từng bước, rồi tự nhân lại. Ghi lại con số cuối vào một ghi chú tên 'giá của tôi'.",
      secondary: "Nếu chưa có ba việc để ghi, dùng hai việc và ghi chú rõ là còn thiếu dữ liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, khách nhắn hỏi làm một bộ nhận diện thương hiệu nhỏ bao nhiêu. Bạn gõ đại một con số, và tuần sau mới thấy mình làm gần như không công. Bài này dạy cách dựa vào giờ làm thật của chính bạn.",
      },
      {
        type: "feynman",
        title: "Tính giá từ giờ làm thật đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới người bán cơm hộp: cô biết mỗi suất tốn bao nhiêu gạo, bao nhiêu công nấu, nên cô định giá không cần đoán. Việc của bạn cũng vậy, chỉ có nguyên liệu là giờ làm.",
        columns: ["Thành phần", "Cơm hộp", "Việc tự do"],
        rows: [
          ["Nguyên liệu", "Gạo, thịt, rau", "Giờ làm, giờ sửa, giờ trao đổi"],
          ["Cách biết", "Cân, đếm mỗi ngày", "Ghi giờ ba việc gần nhất"],
          ["Hao hụt", "Cơm cháy, nước sốt đổ", "Sửa nhiều lần hơn dự tính"],
          ["Ai làm phép tính", "Máy tính bỏ túi", "AI, bạn kiểm lại"],
        ],
        oneLiner: "Muốn biết bán bao nhiêu thì phải biết mình đã bỏ ra bao nhiêu, rồi cộng thêm phần hao hụt.",
      },
      { type: "heading", text: "Giờ nào cũng là giờ làm việc" },
      {
        type: "paragraph",
        text: "Khi nghĩ tới một việc, ta thường chỉ nghĩ tới giờ ngồi làm. Nhưng còn giờ nhắn tin hỏi lại yêu cầu, giờ gửi file, giờ sửa theo góp ý. Cộng tất cả vào, con số thường lớn hơn cảm giác ban đầu gần gấp rưỡi. Đó là chỗ giá đoán hay thiệt.",
      },
      {
        type: "list",
        items: [
          "Giờ làm chính: thời gian bạn thực sự tạo ra sản phẩm.",
          "Giờ trao đổi: nhắn tin, họp, gửi file, chờ khách trả lời.",
          "Giờ sửa: các lần chỉnh theo góp ý của khách.",
        ],
      },
      {
        type: "chart",
        title: "Giá thay đổi thế nào khi số giờ và dự phòng đổi",
        caption:
          "Số liệu minh hoạ. Kéo thanh trượt để xem hai đường: giá không có dự phòng và giá có thêm phần dự phòng cho giờ sửa. Giá theo giờ tính bằng nghìn đồng.",
        kind: "line",
        xLabel: "Số giờ làm cho một việc",
        yLabel: "Giá (nghìn đồng)",
        x: { from: 2, to: 20, step: 2 },
        params: [
          { id: "rate", label: "Giá theo giờ", min: 100, max: 500, step: 50, value: 250, unit: "nghìn/giờ" },
          { id: "buf", label: "Dự phòng giờ sửa", min: 0, max: 50, step: 5, value: 20, unit: "%" },
        ],
        series: [
          { label: "Giá không dự phòng", expr: "x * rate" },
          { label: "Giá có dự phòng", expr: "x * rate * (1 + buf / 100)" },
        ],
      },
      { type: "heading", text: "AI làm phép tính, bạn giữ dữ liệu" },
      {
        type: "paragraph",
        text: "AI rất giỏi biến ba con số thành một bảng gọn, nhưng nó không biết bạn làm nhanh hay chậm. Nếu bạn không đưa số giờ thật, nó sẽ điền một con số nghe hợp lý, và bạn khó phát hiện. Vì vậy, bạn đưa dữ liệu, còn nó chỉ tính.",
      },
      {
        type: "callout",
        label: "Luôn tự nhân lại một lần",
        text: "Bảo AI viết phép tính từng bước, rồi bạn bấm máy tính một lần. Nếu hai con số khác nhau, tin phép tính bạn vừa tự làm. Đừng đưa con số chưa kiểm vào báo giá gửi khách.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu, khách hỏi giá bộ nhận diện",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách hỏi giá một bộ nhận diện nhỏ. Bạn chưa từng đếm số giờ cho việc này, nhưng đã làm ba việc tương tự và còn lịch sử tin nhắn.",
            choices: [
              { label: "Báo ngay một con số theo cảm giác cho khách vui", next: "bad_guess" },
              { label: "Xin khách một ngày, ghi giờ ba việc trước rồi nhờ AI tính", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Bạn báo một con số thấp. Việc thực tế mất gần gấp đôi thời gian, và bạn phải làm thêm ban đêm mà không được trả thêm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có ba con số giờ. AI trả về bảng với giá cuối, nhưng không ghi cách tính.",
            choices: [
              { label: "Gửi luôn con số đó cho khách vì trông rất chỉn chu", next: "bad_trust" },
              { label: "Bảo AI viết phép tính từng bước, rồi tự nhân lại bằng máy tính", next: "good" },
            ],
          },
          bad_trust: {
            text: "AI đã nhân nhầm phần dự phòng. Bạn báo giá thấp hơn mức mình định, và chỉ phát hiện khi khách đã đồng ý.",
            ending: "bad",
          },
          good: {
            text: "Con số bạn tự tính khớp với AI sau khi AI sửa một chỗ nhân sai. Bạn báo giá với tự tin và ghi lại số giờ để dùng cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giờ thật của bạn là nguyên liệu, AI là chiếc máy tính, và bạn là người kiểm.",
          "Bài sau: viết báo giá ghi rõ việc nào trong giá, việc nào ngoài giá.",
        ],
      },
    ],
  },
  {
    id: 2226,
    slug: "freelancer-viet-bao-gia-ro-pham-vi-so-lan-sua",
    title: "Chặng 41, Bài 7: Viết báo giá ghi rõ việc gì trong giá, việc gì ngoài giá",
    subtitle: "Một báo giá ghi rõ số lần sửa và giá việc phát sinh giúp cả hai bên đỡ ngượng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách nhắn 'sửa thêm chút xíu nhé', rồi thêm một chút nữa, và bạn ngại nói thẳng vì giá ban đầu chưa từng nói giới hạn. Một báo giá rõ ràng từ đầu giúp bạn từ chối việc phát sinh mà không phải cãi nhau, vì chuyện đã nằm trên giấy trước khi bắt đầu.",
    openingQuestion:
      "Khách hay xin sửa thêm sau khi đã chốt. Bạn muốn nhờ AI dựng báo giá để hạn chế chuyện này. Điều gì phải có trong báo giá?",
    openingOptions: [
      "Việc nằm trong giá, số lần sửa đã gồm và giá cho việc phát sinh",
      "Một câu thật lịch sự, hy vọng khách sẽ tự hiểu là không sửa quá nhiều",
      "Giá thật thấp để khách ngại đòi sửa thêm",
      "Bảng liệt kê dài mọi kiểu sửa có thể xảy ra, không cần nêu giá",
    ],
    correctOption: 0,
    explanation:
      "Ranh giới rõ ràng cần ba phần: cái gì đã nằm trong giá, số lần sửa đã gồm, và giá khi phát sinh. Câu lịch sự chung chung không đặt ranh giới nào nên khách không biết mình đang vượt. Giá thấp không ngăn khách xin thêm, chỉ khiến bạn thiệt hơn. Liệt kê kiểu sửa mà không nêu giá thì khi phát sinh bạn vẫn phải thương lượng từ đầu.",
    diagram: [
      { label: "Bạn liệt kê việc chắc chắn có trong giá", arrow: true },
      { label: "Ghi số lần sửa đã gồm và giá phát sinh", arrow: true },
      { label: "AI dựng báo giá theo khuôn bạn đưa", arrow: true },
      { label: "Bạn đọc lại, sửa con số rồi gửi khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một người viết nội dung tự do nhận việc viết năm bài blog. Báo giá ghi rõ: giá gồm năm bài, mỗi bài hai lần chỉnh, việc chụp ảnh và đăng bài thuộc phần tính riêng. Khi khách xin thêm một bài giữa chừng, người viết chỉ cần trỏ vào dòng đó và báo giá bổ sung, không phải tranh luận.",
    },
    quiz: [
      {
        question: "Vì sao báo giá nên nêu số lần sửa đã gồm trong giá?",
        options: [
          "Để hai bên biết khi nào việc sửa vượt phần đã thoả thuận",
          "Để khách hạn chế tối đa việc phản hồi và góp ý về sản phẩm của bạn",
          "Để báo giá trông dài hơn và chuyên nghiệp hơn với khách hàng mới",
          "Vì AI chỉ dựng được báo giá khi có đủ mục số lần sửa cụ thể",
        ],
        correct: 0,
        explanation:
          "Con số cụ thể làm ranh giới rõ, không ai phải đoán khi nào là 'thêm'. Mục đích không phải ngăn khách góp ý. Độ dài không làm báo giá chuyên nghiệp hơn, và AI dựng được báo giá dù thiếu mục đó, chỉ là báo giá sẽ mơ hồ.",
      },
      {
        question: "Bạn nhờ AI viết báo giá và nó tự thêm dòng 'bảo hành trọn đời'. Nên làm gì?",
        options: [
          "Xoá dòng đó, vì đó là cam kết bạn chưa từng đồng ý đưa ra",
          "Giữ lại vì nghe uy tín, khách sẽ thích và bạn có thêm lợi thế khi cạnh tranh về giá",
          "Đổi thành 'bảo hành 10 năm' cho có vẻ thực tế hơn",
          "Hỏi khách xem họ có muốn giữ cam kết đó hay không",
        ],
        correct: 0,
        explanation:
          "Cam kết trong báo giá là của bạn, không phải của AI, nên bất cứ dòng nào bạn không chủ động đưa vào phải xoá. Đổi số năm chỉ là bịa cam kết khác. Hỏi khách có giữ không là đẩy trách nhiệm về khâu bạn phải tự quyết. Nếu có điều khoản bảo hành thật, hãy hỏi người am hiểu trước khi ghi.",
      },
      {
        question: "Khách xin thêm một bản thiết kế nữa sau khi chốt. Báo giá đã ghi rõ giá mỗi bản phát sinh. Cách hợp lý nhất là gì?",
        options: [
          "Trỏ vào dòng phát sinh trong báo giá và gửi giá cho bản thêm",
          "Làm luôn cho khách vui và không nhắc gì đến chuyện tiền",
          "Từ chối thẳng mà không giải thích lý do vì đó là quy định của bạn",
          "Báo giá cao gấp đôi bảng giá phát sinh để khách tự bỏ ý định",
        ],
        correct: 0,
        explanation:
          "Khi đã ghi rõ, bạn chỉ việc dẫn lại điều hai bên đã đồng ý, nhẹ nhàng và không gây tranh cãi. Làm miễn phí mà không nói làm khách quen dần với việc thêm không tính tiền. Từ chối không giải thích khiến khách thấy bị đối xử cứng. Tăng giá gấp đôi so với bảng giá là tự phá cam kết của chính bạn.",
      },
      {
        question: "Trong prompt nhờ AI dựng báo giá, phần nào bạn nên tự cung cấp chứ không để AI tự nghĩ?",
        options: [
          "Con số giá, số lần sửa và việc nằm ngoài giá",
          "Giọng văn lịch sự, cách chào đầu thư và câu mở đầu",
          "Cách trình bày bảng và thứ tự các mục trong báo giá",
          "Lời cảm ơn cuối thư và câu chúc khách một ngày tốt lành",
        ],
        correct: 0,
        explanation:
          "Giá, số lần sửa và phạm vi là quyết định kinh doanh của bạn, AI không có căn cứ để chọn. Chào hỏi, trình bày bảng và lời cảm ơn là phần chữ nghĩa mà AI làm tốt, chỉ cần bạn đọc lại một lượt. Đưa số cho AI nghĩ ra thì nó sẽ điền con số nghe hợp lý.",
      },
      {
        question: "Khách yêu cầu bạn ký một điều khoản phạt do giao trễ, nằm trong mẫu hợp đồng họ gửi. Bạn nên làm gì với phần này của báo giá?",
        options: [
          "Không tự soạn điều khoản phạt, hỏi người có chuyên môn trước khi đồng ý",
          "Nhờ AI viết điều khoản phạt và ký ngay nếu nghe hợp lý",
          "Bỏ qua điều khoản đó vì báo giá chỉ là văn bản tham khảo chứ chưa phải hợp đồng chính thức",
          "Đặt mức phạt bằng một nửa giá trị việc để nghe công bằng",
        ],
        correct: 0,
        explanation:
          "Điều khoản phạt có hệ quả pháp lý và tài chính, nên cần hỏi người có chuyên môn thay vì tự soạn hay để AI soạn. AI viết được câu văn nghe hợp lý nhưng không chịu trách nhiệm về nó. Bỏ qua vì đó là báo giá là hiểu nhầm, vì khách có thể coi các điều bạn đồng ý là cam kết. Con số một nửa cũng chỉ là con số đoán.",
      },
    ],
    keyTakeaways: [
      "Báo giá tốt nói rõ: trong giá có gì, sửa mấy lần, phát sinh tính thế nào.",
      "Giá, số lần sửa và phạm vi là của bạn; AI lo phần chữ.",
      "Xoá mọi cam kết AI tự thêm mà bạn chưa quyết.",
      "Điều khoản phạt hay bảo hành: hỏi người có chuyên môn.",
      "Ranh giới ghi từ đầu giúp bạn từ chối việc thêm mà không cãi nhau.",
    ],
    practicePrompt: {
      question:
        "Anh Sơn nhờ AI viết báo giá. AI trả về bản ghi 'sửa không giới hạn cho đến khi khách hài lòng'. Anh chưa từng định nói vậy. Anh nên làm gì?",
      options: [
        "Đổi thành số lần sửa cụ thể và ghi giá cho lần sửa thêm",
        "Giữ nguyên vì nghe tận tâm với khách",
        "Xoá luôn mục sửa và không đề cập gì tới nó",
        "Bảo AI viết thật ngắn để khách khỏi để ý dòng đó, không ghi số lần",
      ],
      correct: 0,
      explanation:
        "'Không giới hạn' là cam kết không có đáy, và AI thêm nó vì nghe hay chứ không vì anh cần. Số lần cụ thể cộng giá phát sinh mới đặt được ranh giới. Bỏ hẳn mục sửa thì chuyện sửa lại mơ hồ như trước. Cố rút ngắn để khách không chú ý là giấu điều khoản, dễ gây hiểu lầm về sau.",
    },
    summary: {
      keyIdea: "Báo giá là chỗ đặt ranh giới trước, nên đừng để AI đặt hộ.",
      formula: "Báo giá rõ = việc trong giá + số lần sửa + giá cho việc phát sinh.",
      commonMistake: "Để AI viết cả báo giá rồi gửi mà không đọc lại các cam kết nó tự thêm.",
      action: "Viết ba dòng: việc trong giá, số lần sửa, giá phát sinh, rồi nhờ AI dàn thành báo giá.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một báo giá bạn từng gửi (hoặc một việc bạn định báo). Viết ra ba dòng: việc nằm trong giá, số lần sửa đã gồm, giá cho mỗi lần phát sinh. Nhờ AI dựng báo giá theo ba dòng đó, rồi gạch mọi câu cam kết bạn không hề đưa ra.",
      secondary: "Lưu bản đã sửa thành 'báo giá mẫu' để dùng lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách nói 'sửa thêm chút xíu thôi', lần thứ tư. Bạn ngại nhắc vì chưa bao giờ nói rõ giới hạn. Bài này giúp bạn viết báo giá nói sẵn điều đó, để chuyện khó nói trở thành chuyện đã thoả thuận.",
      },
      {
        type: "feynman",
        title: "Báo giá rõ phạm vi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới thực đơn quán ăn: món nào đã có trong giá, món nào gọi thêm tính riêng, ai cũng biết trước khi ăn. Báo giá của bạn cũng là thực đơn cho công việc.",
        columns: ["Phần", "Thực đơn quán ăn", "Báo giá của bạn"],
        rows: [
          ["Đã gồm trong giá", "Bát phở kèm rau", "Bản thiết kế chính, hai lần sửa"],
          ["Gọi thêm", "Trứng chần, thêm thịt", "Bản thiết kế phụ, lần sửa thứ ba"],
          ["Giá gọi thêm", "Ghi cạnh từng món", "Giá cố định cho từng loại phát sinh"],
          ["Ai đọc kỹ", "Khách trước khi gọi", "Khách trước khi đồng ý"],
        ],
        oneLiner: "Cái gì tính riêng thì ghi ngay từ đầu, khi ai cũng còn vui vẻ.",
      },
      { type: "heading", text: "Ba phần không thể thiếu" },
      {
        type: "paragraph",
        text: "Một báo giá làm được việc của nó cần ba thứ: việc nằm trong giá là gì, số lần sửa đã gồm là bao nhiêu, và mỗi việc phát sinh tính bao nhiêu. Thiếu một phần, sẽ có lúc khách và bạn hiểu khác nhau.",
      },
      {
        type: "flow",
        title: "Từ ba dòng của bạn tới báo giá gửi khách",
        steps: [
          { label: "Viết ba dòng của bạn", detail: "Việc trong giá, số lần sửa, giá phát sinh. Đây là quyết định của bạn, AI chưa tham gia." },
          { label: "Đưa AI khuôn báo giá", detail: "Nhờ AI dàn ba dòng đó thành thư ngắn, lịch sự, không thêm cam kết nào ngoài ba dòng." },
          { label: "Đọc lại từng câu", detail: "Tìm mọi câu hứa bạn chưa đưa ra, như bảo hành hay thời hạn, rồi xoá hoặc hỏi người có chuyên môn." },
          { label: "Kiểm con số", detail: "Đối chiếu giá và số lần sửa với ba dòng ban đầu rồi mới gửi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng báo giá có ranh giới",
        task: "Bạn nhận việc thiết kế bộ poster cho một quán cà phê. Lắp prompt để AI dựng báo giá không thêm cam kết ngoài ý bạn.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi",
            options: [
              { text: "Viết báo giá cho việc thiết kế poster.", feedback: "Không nói phạm vi thì AI tự nghĩ ra số poster và loại file, và khách sẽ hiểu theo bản AI viết." },
              { text: "Giá gồm 3 poster và 2 lần sửa mỗi poster; chụp ảnh và in ấn nằm ngoài giá.", good: true, feedback: "Phạm vi cụ thể - AI dàn chữ theo đúng điều bạn quyết." },
            ],
          },
          {
            id: "extra",
            label: "Việc phát sinh",
            options: [
              { text: "Nếu cần sửa thêm thì tính thêm tiền hợp lý.", feedback: "'Hợp lý' là chữ mở, khách và bạn sẽ hiểu hai mức khác nhau." },
              { text: "Lần sửa thứ ba trở đi và poster thêm: giá do tôi ghi (điền số), AI không tự đặt con số.", good: true, feedback: "Số tiền do bạn đặt, AI không có cơ hội bịa mức giá." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Làm cho hay để khách ấn tượng.", feedback: "Không giới hạn thì AI thêm bảo hành, thời hạn giao hay ưu đãi mà bạn chưa hề định." },
              { text: "Chỉ dùng thông tin tôi cung cấp, không thêm bảo hành, ưu đãi hay thời hạn nào.", good: true, feedback: "Giới hạn rõ - báo giá chỉ chứa điều bạn đã quyết." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "extra", "limit"],
            text: "Chào anh/chị,\n\nBáo giá gồm 3 poster, mỗi poster 2 lần sửa. Chụp ảnh và in ấn tính riêng. Từ lần sửa thứ ba hoặc poster thêm, giá là [điền số]. Anh/chị xác nhận để em bắt đầu.\n\nCảm ơn anh/chị.",
          },
          {
            requires: ["scope"],
            text: "Chào anh/chị,\n\nBáo giá gồm 3 poster, mỗi poster 2 lần sửa. Việc sửa thêm chúng tôi cam kết giá ưu đãi 10% và bảo hành file trong 12 tháng...\n\n(Phạm vi đúng, nhưng AI tự thêm ưu đãi và bảo hành bạn chưa hề đưa ra.)",
          },
          {
            text: "Kính gửi Quý khách,\n\nChúng tôi xin gửi báo giá thiết kế poster với chất lượng cao nhất và sự tận tâm tuyệt đối, sẵn sàng chỉnh sửa theo mong muốn của Quý khách...\n\n(Không có số lần sửa, không có giá phát sinh; ranh giới vẫn để trống.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Báo giá có ranh giới",
          text: "Ghi rõ số lần sửa, việc ngoài giá và giá phát sinh. Khi khách xin thêm, bạn chỉ dẫn lại điều đã đồng ý. Ít tranh luận, khách biết trước.",
        },
        right: {
          label: "Báo giá chung chung",
          text: "Câu chữ lịch sự nhưng không có con số hay giới hạn. Mỗi lần khách xin thêm, bạn phải thương lượng từ đầu. Dễ dẫn tới việc làm không công.",
        },
      },
      {
        type: "callout",
        label: "Điều khoản phạt và bảo hành",
        text: "Khi khách đưa vào điều khoản phạt, bảo hành hay quyền sử dụng sản phẩm, đừng tự soạn và đừng để AI soạn rồi gửi. Hỏi bộ phận pháp chế, luật sư hoặc người có chuyên môn trước khi đồng ý.",
      },
      {
        type: "scenario",
        title: "Khách xin thêm lần sửa thứ tư",
        start: "s1",
        nodes: {
          s1: {
            text: "Báo giá đã ghi 2 lần sửa. Khách nhắn: 'Em sửa giúp chị lần nữa nhé, chỉ đổi cái màu thôi'. Đây đã là lần thứ ba.",
            choices: [
              { label: "Sửa luôn vì chỉ là đổi màu, ngại nhắc chuyện tiền", next: "bad_free" },
              { label: "Dẫn lại dòng số lần sửa trong báo giá và gửi giá cho lần thêm", next: "s2" },
            ],
          },
          bad_free: {
            text: "Bạn sửa. Hai ngày sau khách lại nhờ đổi phông chữ rồi đổi bố cục, và bạn thấy khó nói không vì đã miễn phí lần trước.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nhắn lịch sự kèm giá. Khách im lặng nửa ngày rồi hỏi: 'Có cách nào rẻ hơn không?'",
            choices: [
              { label: "Đề nghị gộp các chỗ muốn đổi vào một lần sửa để giữ giá đó", next: "good" },
              { label: "Giảm giá xuống một nửa không cần lý do để khách khỏi bực", next: "bad_cut" },
            ],
          },
          bad_cut: {
            text: "Khách nhận ưu đãi, nhưng lần sau khách lại mặc cả tiếp và bạn không còn gì để dựa vào.",
            ending: "bad",
          },
          good: {
            text: "Khách gom mọi chỗ cần đổi vào một danh sách. Bạn sửa một lần, khách hài lòng và hiểu giới hạn từ giờ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ranh giới ghi từ đầu là cách lịch sự nhất để nói không sau này.",
          "Bài sau: lập danh sách điều cần hỏi luật sư trước khi ký hợp đồng.",
        ],
      },
    ],
  },
  {
    id: 2227,
    slug: "freelancer-hop-dong-cho-luat-su-xem-danh-sach-can-hoi",
    title: "Chặng 41, Bài 8: Lập danh sách điều cần hỏi luật sư trước khi ký hợp đồng",
    subtitle: "AI giúp bạn biết cần hỏi gì, còn ký hay không là việc của bạn và người có chuyên môn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách gửi hợp đồng bốn trang chữ nhỏ và giục ký trong hôm nay. Bạn đọc mà không chắc câu nào ảnh hưởng tới mình. Nhờ AI nói 'có nên ký không' là quá rủi ro, nhưng nhờ nó gạch ra những mục cần hỏi thì rất hữu ích: bạn vào cuộc gặp với luật sư có sẵn danh sách thay vì bối rối.",
    openingQuestion:
      "Khách gửi hợp đồng dài và bạn nhờ AI đọc giúp. Yêu cầu nào an toàn và hữu ích nhất?",
    openingOptions: [
      "Liệt kê các mục cần hỏi luật sư, mỗi mục kèm trích đoạn liên quan",
      "Cho biết hợp đồng này an toàn hay không để tôi quyết định ký",
      "Viết lại hợp đồng theo hướng có lợi nhất cho tôi rồi gửi khách và ký luôn",
      "Tóm tắt trong một câu để tôi đỡ mất thời gian đọc bản gốc",
    ],
    correctOption: 0,
    explanation:
      "Danh sách mục cần hỏi kèm trích đoạn giúp bạn biết đâu là chỗ cần người có chuyên môn xem, và kiểm được từng mục với bản gốc. Hỏi 'có an toàn không' là nhờ AI đưa ra kết luận pháp lý mà nó không chịu trách nhiệm. Viết lại hợp đồng có lợi cho bạn không phải điều khách đã đồng ý và có thể sai về pháp lý. Tóm một câu làm mất chính những chi tiết quan trọng nhất.",
    diagram: [
      { label: "Dán hợp đồng (đã che thông tin nhạy cảm)", arrow: true },
      { label: "AI liệt kê mục cần hỏi, kèm trích đoạn", arrow: true },
      { label: "Bạn đối chiếu từng trích đoạn với bản gốc", arrow: true },
      { label: "Mang danh sách đã kiểm tới hỏi luật sư" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhiếp ảnh gia tự do nhận được hợp đồng chụp ảnh sự kiện. Cô nhờ AI liệt kê các mục nên hỏi: ai giữ quyền sử dụng ảnh, khi nào được thanh toán, khi nào một bên được chấm dứt hợp đồng. Khi đối chiếu, cô thấy một trích đoạn AI đưa ra không có trong hợp đồng và loại nó khỏi danh sách trước khi gặp luật sư.",
    },
    quiz: [
      {
        question: "Vì sao không nên nhờ AI kết luận 'hợp đồng này nên ký hay không'?",
        options: [
          "Vì đó là kết luận pháp lý, cần người có chuyên môn chịu trách nhiệm",
          "Vì AI không đọc được hợp đồng có nhiều hơn hai trang",
          "Vì hợp đồng nào cũng nên ký nếu khách đã chịu đưa giá",
          "Vì AI luôn trả lời là nên ký để khách hàng vui lòng",
        ],
        correct: 0,
        explanation:
          "Ký hay không phụ thuộc vào luật áp dụng và hoàn cảnh của bạn, và AI không chịu trách nhiệm nếu sai. AI đọc được văn bản dài, chỉ là kết luận của nó có thể sai mà vẫn trôi chảy. Không phải hợp đồng nào cũng nên ký, và AI không có thiên hướng cố định là trả lời nên ký.",
      },
      {
        question: "Ba nhóm mục nào thường đáng đưa vào danh sách cần hỏi luật sư của một freelancer?",
        options: [
          "Quyền sử dụng sản phẩm, điều kiện thanh toán, điều kiện chấm dứt",
          "Màu chữ, cỡ chữ, cách đánh số các điều khoản và việc bản hợp đồng có in hai mặt hay không",
          "Tên công ty của khách và địa chỉ văn phòng của họ",
          "Lời chào đầu thư và cách xưng hô giữa hai bên",
        ],
        correct: 0,
        explanation:
          "Quyền sử dụng quyết định ai được dùng sản phẩm sau khi giao, thanh toán quyết định khi nào bạn nhận tiền, chấm dứt quyết định điều gì xảy ra nếu hợp tác đổ vỡ. Trình bày, tên công ty và lời chào không đổi quyền lợi của bạn.",
      },
      {
        question: "AI liệt kê một mục kèm trích đoạn 'điều 7: phạt 30% giá trị hợp đồng nếu giao trễ'. Bạn nên làm gì trước khi đưa mục này cho luật sư?",
        options: [
          "Tìm đúng câu đó trong bản gốc để chắc AI không bịa",
          "Đưa luôn vì AI trích dẫn chính xác từng chữ một nên khỏi cần tìm lại",
          "Sửa con số 30% thành 10% cho bớt nặng nề rồi đưa tiếp cho luật sư",
          "Bỏ qua mục đó vì phạt do giao trễ thường không xảy ra trong thực tế",
        ],
        correct: 0,
        explanation:
          "AI có thể bịa trích đoạn nghe rất thật, nên phải tìm lại đúng câu trong bản gốc. Tin trích dẫn chính xác là bỏ qua khả năng đó. Tự sửa con số là làm sai lệch tài liệu bạn đưa cho luật sư. Bỏ qua mục phạt là chủ quan với chỗ có thể tốn tiền nhất.",
      },
      {
        question: "Bạn muốn dán hợp đồng vào công cụ AI. Việc nào nên làm trước?",
        options: [
          "Che tên, số tiền, địa chỉ và thông tin nhạy cảm nếu không cần cho việc hỏi",
          "Dán nguyên văn vì hợp đồng đã được khách gửi chính thức cho bạn nên chắc chắn được phép chia sẻ",
          "Xoá phần thanh toán để AI không thấy con số nào",
          "Dán cả email khách kèm theo để AI có thêm ngữ cảnh",
        ],
        correct: 0,
        explanation:
          "Hợp đồng thường chứa thông tin của khách và có thể có điều khoản giữ bí mật, nên che những gì không cần cho việc hỏi. Việc khách gửi cho bạn không có nghĩa là bạn được đưa cho bên thứ ba. Xoá phần thanh toán làm mất đúng mục cần hỏi. Thêm email làm tăng lượng thông tin bị chia sẻ không cần thiết.",
      },
      {
        question: "Cách nào cho danh sách câu hỏi mang tới luật sư hữu ích nhất?",
        options: [
          "Mỗi mục ghi trích đoạn, số điều và câu hỏi cụ thể của bạn",
          "Chỉ ghi 'hợp đồng này có ổn không' rồi đưa cả bản gốc",
          "Một đoạn văn dài kể lại toàn bộ hợp đồng theo lời AI",
          "Danh sách càng dài càng tốt, không cần sắp thứ tự quan trọng",
        ],
        correct: 0,
        explanation:
          "Trích đoạn kèm câu hỏi cụ thể giúp luật sư trả lời nhanh và đúng trọng tâm, đỡ tốn thời gian và phí của bạn. Một câu hỏi chung chung buộc luật sư đọc lại tất cả. Đoạn kể lại theo lời AI có thể lệch nội dung. Danh sách dài không xếp thứ tự khiến điều quan trọng chìm giữa những điều vặt.",
      },
    ],
    keyTakeaways: [
      "AI giúp bạn biết cần hỏi gì, không giúp bạn quyết định ký.",
      "Mỗi mục trong danh sách phải kèm trích đoạn để bạn đối chiếu bản gốc.",
      "Ba nhóm đáng hỏi: quyền sử dụng, thanh toán, chấm dứt.",
      "Che thông tin nhạy cảm trước khi đưa hợp đồng cho AI.",
      "Mang danh sách đã kiểm tới người có chuyên môn.",
    ],
    practicePrompt: {
      question:
        "Chị Hà nhờ AI đọc hợp đồng và AI trả lời 'hợp đồng này an toàn, chị có thể ký'. Chị nên hiểu câu đó thế nào?",
      options: [
        "Là ý kiến chưa ai chịu trách nhiệm, cần hỏi lại luật sư",
        "Là kết luận đáng tin vì AI đã đọc toàn bộ hợp đồng",
        "Là lời khuyên chắc chắn nếu khách là công ty lớn, vì họ có luật sư",
        "Là cơ sở đủ để ký nếu chị chưa vội có luật sư",
      ],
      correct: 0,
      explanation:
        "AI không chịu trách nhiệm pháp lý và có thể bỏ sót điều khoản quan trọng. Việc đọc hết văn bản không biến kết luận thành đáng tin. Công ty lớn không làm hợp đồng tự động công bằng với freelancer. Có luật sư hay không không thay đổi việc lời khuyên đó thiếu người chịu trách nhiệm.",
    },
    summary: {
      keyIdea: "AI làm danh sách câu hỏi, người có chuyên môn đưa câu trả lời.",
      formula: "Danh sách tốt = mục cần hỏi + trích đoạn gốc + câu hỏi cụ thể.",
      commonMistake: "Nhờ AI kết luận có nên ký không rồi làm theo mà không hỏi ai.",
      action: "Lấy một hợp đồng bạn từng nhận, che tên khách và nhờ AI liệt kê mục cần hỏi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một hợp đồng hoặc bản thoả thuận bạn đã ký hay đang cân nhắc, che tên và số tiền. Nhờ AI liệt kê mục cần hỏi về quyền sử dụng, thanh toán và chấm dứt, mỗi mục kèm trích đoạn. Tìm từng trích đoạn trong bản gốc và gạch bỏ mục nào không có thật.",
      secondary: "Lưu danh sách đã kiểm lại để dùng lại cho hợp đồng sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách gửi hợp đồng dài và nhắn 'chị ký giúp em trong hôm nay nhé'. Bạn đọc mà không chắc câu nào quan trọng. Bài này dạy cách nhờ AI làm việc đúng sức của nó: chỉ ra chỗ cần hỏi, không thay ai kết luận.",
      },
      {
        type: "feynman",
        title: "Danh sách hỏi luật sư đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lần đi khám bệnh: nếu bạn ghi sẵn các triệu chứng vào giấy, bác sĩ sẽ hỏi đúng chỗ và bạn không quên điều nào. Danh sách câu hỏi là tờ giấy đó, còn AI giúp bạn ghi.",
        columns: ["Thành phần", "Đi khám bệnh", "Hỏi luật sư"],
        rows: [
          ["Tờ giấy ghi sẵn", "Triệu chứng, thời gian", "Mục cần hỏi, trích đoạn"],
          ["Người giúp ghi", "Người nhà nhắc bạn", "AI liệt kê chỗ đáng chú ý"],
          ["Người kết luận", "Bác sĩ", "Luật sư hoặc người có chuyên môn"],
          ["Điều bạn kiểm", "Không quên triệu chứng nào", "Trích đoạn có thật trong bản gốc"],
        ],
        oneLiner: "AI giúp bạn hỏi cho đúng, người có chuyên môn mới là người trả lời.",
      },
      { type: "heading", text: "Ba nhóm mục hay gặp" },
      {
        type: "list",
        items: [
          "Quyền sử dụng sản phẩm: sau khi giao, ai được dùng, dùng vào đâu, trong bao lâu.",
          "Thanh toán: khi nào được trả, trả theo mốc nào, trễ thì xử lý ra sao.",
          "Chấm dứt: bên nào được dừng, báo trước bao lâu, phần đã làm được tính thế nào.",
        ],
      },
      {
        type: "paragraph",
        text: "Bạn không cần hiểu hết thuật ngữ để nhờ AI chỉ ra ba nhóm này. Điều bạn cần là mỗi mục phải kèm đúng câu trong hợp đồng, để bạn và luật sư cùng nhìn vào một chỗ.",
      },
      {
        type: "flow",
        title: "Từ hợp đồng dài tới danh sách câu hỏi",
        steps: [
          { label: "Che thông tin nhạy cảm", detail: "Thay tên khách và số tiền bằng ký hiệu nếu không cần cho việc hỏi." },
          { label: "Nhờ AI liệt kê mục cần hỏi", detail: "Yêu cầu: mỗi mục ghi trích đoạn và câu hỏi cụ thể, không đưa kết luận ký hay không ký." },
          { label: "Đối chiếu với bản gốc", detail: "Tìm từng trích đoạn trong hợp đồng thật, gạch mục nào AI bịa hoặc dẫn sai." },
          { label: "Sắp thứ tự và mang đi hỏi", detail: "Đặt mục ảnh hưởng tiền và quyền lên đầu rồi mang tới người có chuyên môn." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát danh sách AI vừa liệt kê",
        task: "Hợp đồng thật chỉ có: thanh toán trong 30 ngày sau khi giao, khách giữ quyền sử dụng ảnh cho một chiến dịch, mỗi bên báo trước 15 ngày nếu muốn dừng. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Mục 1, thanh toán: hợp đồng nói trả trong 30 ngày sau khi giao. Cần hỏi nếu trễ thì xử lý thế nào." },
          { text: "Mục 2, quyền sử dụng: khách giữ quyền dùng ảnh cho một chiến dịch. Cần hỏi 'một chiến dịch' kéo dài bao lâu." },
          { text: "Mục 3, chấm dứt: mỗi bên báo trước 15 ngày. Cần hỏi phần đã làm được tính tiền thế nào." },
          { text: "Mục 4: hợp đồng ghi phí phạt 30% nếu giao trễ, nên cần thương lượng giảm.", error: "Hợp đồng không hề có điều khoản phạt. AI bịa một điều khoản nghe hợp lý, và nếu bạn mang mục này đi hỏi sẽ mất thời gian." },
          { text: "Mục 5: theo luật hiện hành, khách phải giữ bí mật mọi ảnh chưa công bố.", error: "Hợp đồng không nhắc bí mật, và AI viện dẫn một quy định luật không có nguồn. Việc luật nào áp dụng là câu hỏi cho luật sư." },
          { text: "Kết luận: hợp đồng khá công bằng nên bạn có thể ký.", error: "Đây là kết luận AI tự đưa ra dù bạn không hỏi. Ký hay không là việc của bạn và người có chuyên môn." },
        ],
      },
      {
        type: "callout",
        label: "AI trích dẫn có thể bịa",
        text: "AI có thể viết ra một 'điều 7' nghe rất thật mà hợp đồng không có. Mọi mục đưa cho luật sư phải tìm được trong bản gốc. Với điều khoản về quyền sử dụng, phạt và chấm dứt, hỏi bộ phận pháp chế hoặc luật sư, đừng tự đoán.",
      },
      {
        type: "scenario",
        title: "Hợp đồng đến lúc 4 giờ chiều, khách muốn ký hôm nay",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách gửi hợp đồng bốn trang và nhắn: 'Chị xem rồi ký giúp em trong hôm nay nhé'. Bạn chưa từng đọc hợp đồng kiểu này.",
            choices: [
              { label: "Nhờ AI cho biết có nên ký và làm theo", next: "bad_sign" },
              { label: "Nhờ AI liệt kê mục cần hỏi, kèm trích đoạn", next: "s2" },
            ],
          },
          bad_sign: {
            text: "AI nói hợp đồng ổn. Bạn ký, và ba tháng sau mới thấy khách được dùng sản phẩm không giới hạn mà không phải trả thêm.",
            ending: "bad",
          },
          s2: {
            text: "AI đưa danh sách 5 mục kèm trích đoạn. Có một mục bạn không tìm thấy trong hợp đồng.",
            choices: [
              { label: "Vẫn đưa mục đó cho luật sư vì AI thường đúng", next: "bad_fake" },
              { label: "Gạch mục đó, giữ bốn mục tìm thấy và xin khách lùi hạn ký vài ngày", next: "good" },
            ],
          },
          bad_fake: {
            text: "Luật sư mất thời gian tìm một điều khoản không tồn tại và tính phí cho cả phần đó.",
            ending: "bad",
          },
          good: {
            text: "Bạn gặp luật sư với bốn câu hỏi đã kiểm. Buổi hỏi ngắn, và bạn ký với hiểu biết rõ ràng hơn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI chỉ ra chỗ cần hỏi, người có chuyên môn trả lời, còn bạn là người đối chiếu.",
          "Bài sau: nhắc khách thanh toán trễ mà vẫn giữ quan hệ.",
        ],
      },
    ],
  },
  {
    id: 2228,
    slug: "freelancer-tin-nhac-thanh-toan-khong-lam-mat-long",
    title: "Chặng 41, Bài 9: Nhắc khách thanh toán trễ mà vẫn giữ quan hệ",
    subtitle: "Ba tin nhắn từ nhẹ tới rõ ràng, chỉ ghi số tiền và ngày theo đúng hóa đơn thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "💌",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hóa đơn đã quá hạn hai tuần và bạn ngại nhắc vì sợ mất khách. Càng để lâu, tin nhắn càng khó viết và càng dễ nghe như trách móc. Có sẵn ba mức tin nhắc từ nhẹ tới rõ, bạn nhắc đúng lúc bằng giọng dễ nghe, và con số luôn lấy từ hóa đơn thật.",
    openingQuestion:
      "Hóa đơn quá hạn hai tuần, khách vẫn nhắn tin bình thường. Bạn nhờ AI soạn tin nhắc. Điều nào phải đúng nhất?",
    openingOptions: [
      "Số tiền và ngày phải đúng theo hóa đơn thật của bạn",
      "Câu chữ phải thật khéo để khách không thể phật lòng",
      "Có nhắc tới phí phạt để khách thấy nghiêm túc hơn",
      "Tin nhắn thật dài để giải thích hết lý do bạn cần tiền",
    ],
    correctOption: 0,
    explanation:
      "Một tin nhắc sai số tiền hay sai ngày làm bạn mất uy tín và khách có cớ trì hoãn thêm. Giọng khéo giúp giữ quan hệ nhưng không quan trọng bằng con số đúng. Nhắc phí phạt khi hợp đồng chưa ghi là tự bịa quy định. Tin dài giải thích lý do khiến khách khó thấy điều cần làm, là thanh toán khoản nào và khi nào.",
    diagram: [
      { label: "Lấy số tiền, số hóa đơn, ngày đến hạn từ hóa đơn thật", arrow: true },
      { label: "AI soạn ba mức tin: nhẹ, rõ, nghiêm túc", arrow: true },
      { label: "Bạn đối chiếu từng con số với hóa đơn", arrow: true },
      { label: "Gửi mức phù hợp với số ngày trễ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một người làm video tự do có hóa đơn quá hạn hai tuần. Cô nhờ AI soạn ba tin nhắc, điền số tiền và ngày từ hóa đơn thật. Trước khi gửi, cô phát hiện AI viết nhầm ngày đến hạn, sửa lại và gửi tin nhẹ nhất trước. Khách trả lời xin lỗi vì quên và thanh toán trong ngày.",
    },
    quiz: [
      {
        question: "Vì sao số tiền và ngày trong tin nhắc phải lấy thẳng từ hóa đơn?",
        options: [
          "Vì sai một con số là khách có lý do trì hoãn thêm",
          "Vì AI không viết được con số nên phải để bạn điền",
          "Vì khách chỉ đọc tin nhắn khi có con số tròn trịa",
          "Vì luật quy định mọi tin nhắc đều phải kèm hóa đơn",
        ],
        correct: 0,
        explanation:
          "Khi số tiền hoặc ngày không khớp, khách có cớ nói 'chị nhầm rồi' và chuyện kéo dài thêm. AI viết được con số, chỉ là nó có thể viết sai mà nghe rất tự tin. Con số tròn không làm khách đọc nhanh hơn, và không có quy định nào bắt tin nhắc phải đính kèm hóa đơn.",
      },
      {
        question: "Hóa đơn 12 triệu đồng quá hạn 14 ngày. AI viết 'khoản phí phạt 2% mỗi tuần sẽ được tính thêm'. Bạn nên làm gì?",
        options: [
          "Xoá câu đó nếu hợp đồng chưa ghi phí phạt, và hỏi kế toán trước khi nhắc phí",
          "Giữ lại để khách thấy bạn nghiêm túc hơn, sợ hậu quả và nhanh chóng thanh toán trong tuần này",
          "Đổi thành 1% mỗi tuần cho nhẹ nhàng hơn rồi gửi",
          "Giữ nguyên 2% vì AI đã tính đúng theo thông lệ chung",
        ],
        correct: 0,
        explanation:
          "Phí phạt chỉ có hiệu lực khi hai bên đã thoả thuận, nên câu AI tự thêm là bịa quy định. Giảm xuống 1% vẫn là con số không có căn cứ. Thông lệ chung không thay được điều khoản bạn và khách đã ký. Hỏi người có chuyên môn nếu bạn muốn đưa phí vào các hợp đồng sau.",
      },
      {
        question: "Ba tin nhắc từ nhẹ tới rõ ràng nên khác nhau chủ yếu ở điểm nào?",
        options: [
          "Mức độ rõ ràng về hạn thanh toán và bước tiếp theo",
          "Số lần dùng từ xin lỗi trong tin nhắn",
          "Độ dài, tin sau dài gấp đôi tin trước",
          "Số con số trong tin, tin cuối ghi nhiều số nhất",
        ],
        correct: 0,
        explanation:
          "Tin đầu chỉ nhắc nhẹ, tin sau nêu rõ hạn và điều gì xảy ra tiếp theo. Xin lỗi nhiều không làm khách trả nhanh hơn. Độ dài không phản ánh mức nghiêm túc. Cả ba tin đều phải có cùng số tiền và số hóa đơn đúng, không có tin nào ghi nhiều số hơn.",
      },
      {
        question: "Hóa đơn 8 triệu đồng, hạn ngày 10, hôm nay là ngày 24. Khách còn nợ bao nhiêu và trễ mấy ngày?",
        options: [
          "8 triệu đồng và trễ 14 ngày",
          "8 triệu cộng phí trễ hạn 14 ngày, do tiền tự tăng theo ngày",
          "8 triệu đồng và trễ 24 ngày, tính từ đầu tháng",
          "Không xác định được vì phải chờ khách phản hồi trước",
        ],
        correct: 0,
        explanation:
          "Trễ hạn tính từ ngày đến hạn: 24 trừ 10 bằng 14 ngày, và số nợ vẫn là 8 triệu vì phí chỉ tính khi hợp đồng có ghi. Tính từ đầu tháng là nhầm mốc. Cộng phí tự động là giả định chưa có căn cứ. Số nợ và ngày trễ xác định được từ hóa đơn, không phải chờ khách.",
      },
      {
        question: "Khách đã trễ hơn một tháng và không trả lời nhiều tin nhắn. Bước nào phù hợp?",
        options: [
          "Hỏi kế toán hoặc luật sư về bước tiếp theo, đừng tự đe doạ khách",
          "Nhờ AI soạn thư doạ kiện thật gay gắt để khách sợ mà thanh toán ngay trong ngày",
          "Đăng công khai tên khách và khoản nợ lên mạng xã hội",
          "Ngừng nhắc và xoá khoản đó khỏi sổ vì đòi cũng vô ích",
        ],
        correct: 0,
        explanation:
          "Khi tin nhắn không còn tác dụng, hỏi người có chuyên môn về cách xử lý hợp pháp. Thư doạ kiện tự soạn có thể gây rắc rối cho chính bạn. Đăng tên khách lên mạng có thể vi phạm quyền riêng tư và hủy quan hệ. Xoá khoản nợ khỏi sổ khi chưa thử các cách chính đáng là bỏ tiền của mình.",
      },
    ],
    keyTakeaways: [
      "Số tiền, số hóa đơn và ngày lấy từ hóa đơn thật, không để AI viết.",
      "Ba tin nhắc: nhẹ, rõ ràng, nghiêm túc, gửi theo số ngày trễ.",
      "Không nhắc phí phạt nếu hợp đồng chưa ghi.",
      "Trễ hơn một tháng và im lặng: hỏi người có chuyên môn.",
      "Nhắc sớm và nhẹ giữ quan hệ tốt hơn nhắc muộn và gay gắt.",
    ],
    practicePrompt: {
      question:
        "Anh Đạt có hóa đơn 6 triệu đồng số 0312, hạn ngày 5, hôm nay là 19. AI soạn tin nhắc ghi 'hóa đơn 0321, 6 triệu, quá hạn 9 ngày'. Có mấy chỗ sai?",
      options: [
        "Hai chỗ: số hóa đơn phải là 0312 và số ngày trễ phải là 14",
        "Một chỗ: chỉ số hóa đơn bị đảo còn ngày trễ là đúng theo bản nháp",
        "Không chỗ nào, vì AI luôn lấy đúng số từ hóa đơn",
        "Ba chỗ, vì số tiền 6 triệu cũng phải đổi sang đồng",
      ],
      correct: 0,
      explanation:
        "Số hóa đơn bị đảo (0321 thay vì 0312), và ngày 19 trừ ngày 5 bằng 14 chứ không phải 9. Số tiền 6 triệu vẫn đúng và không cần đổi đơn vị. Nghĩ rằng chỉ có một lỗi hoặc không có lỗi là bỏ sót việc đối chiếu từng con số với hóa đơn thật.",
    },
    summary: {
      keyIdea: "Nhắc thanh toán là chuyện của con số đúng và giọng đủ nhẹ.",
      formula: "Tin nhắc tốt = số hóa đơn đúng + số tiền đúng + ngày đúng + một bước tiếp theo rõ ràng.",
      commonMistake: "Để AI tự điền con số hoặc thêm phí phạt mà hợp đồng chưa ghi.",
      action: "Soạn ba tin nhắc mẫu và điền số từ một hóa đơn thật của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một hóa đơn bạn đã gửi (đã trả hoặc chưa cũng được). Nhờ AI soạn ba tin nhắc với chỗ trống {so_hoa_don}, {so_tien}, {han}. Điền số thật vào từng tin, tự tính số ngày trễ, đối chiếu với hóa đơn rồi lưu vào ghi chú.",
      secondary: "Ghi lại tin nào nghe chưa đúng giọng bạn để chỉnh lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Hóa đơn đã quá hạn hai tuần, và bạn mở khung chat rồi lại đóng vì chưa biết viết sao. Bài này cho bạn ba mức tin nhắc và một quy tắc: con số phải khớp hóa đơn đến từng chữ số.",
      },
      {
        type: "feynman",
        title: "Nhắc thanh toán đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chuyện bạn cho hàng xóm mượn cái thang. Lần đầu bạn hỏi vu vơ 'thang còn ở nhà anh không', lần sau nói rõ bạn cần dùng hôm nay. Nhắc tiền cũng vậy, từ nhẹ tới rõ, và luôn nói đúng cái thang nào.",
        columns: ["Mức", "Mượn thang", "Nhắc thanh toán"],
        rows: [
          ["Nhẹ", "Hỏi vu vơ xem còn ở nhà không", "Nhắc lịch sự hóa đơn đã quá hạn"],
          ["Rõ ràng", "Nói cần dùng hôm nay", "Ghi số tiền, ngày và hỏi ngày dự kiến trả"],
          ["Nghiêm túc", "Hẹn giờ qua lấy", "Nêu mốc cuối và bước tiếp theo bạn sẽ làm"],
          ["Điều không đổi", "Đúng cái thang", "Đúng số hóa đơn, số tiền"],
        ],
        oneLiner: "Tăng dần độ rõ ràng, giữ nguyên độ chính xác.",
      },
      { type: "heading", text: "Tiền chưa thu không tự tăng theo ngày" },
      {
        type: "paragraph",
        text: "Nhiều người nghĩ hóa đơn trễ càng lâu thì số nợ càng lớn. Thật ra số tiền chỉ tăng khi hợp đồng có ghi phí trễ hạn. Nếu không, khoản chưa thu vẫn đúng bằng số trên hóa đơn, chỉ có số ngày trễ tăng lên. Biểu đồ dưới cho bạn thấy hai trường hợp.",
      },
      {
        type: "chart",
        title: "Số tiền chưa thu theo số ngày trễ",
        caption:
          "Số liệu minh hoạ. Đường 1 là số nợ khi hợp đồng không ghi phí trễ hạn. Đường 2 chỉ đúng khi hợp đồng đã ghi phí theo tuần; hãy kéo phí về 0 để xem hai đường trùng nhau.",
        kind: "line",
        xLabel: "Số ngày trễ",
        yLabel: "Tiền chưa thu (triệu đồng)",
        x: { from: 0, to: 30, step: 5 },
        params: [
          { id: "amount", label: "Số tiền hóa đơn", min: 5, max: 50, step: 5, value: 12, unit: "triệu" },
          { id: "fee", label: "Phí trễ hạn theo hợp đồng", min: 0, max: 3, step: 0.5, value: 0, unit: "% mỗi tuần" },
        ],
        series: [
          { label: "Không có phí trễ hạn", expr: "amount" },
          { label: "Nếu hợp đồng ghi phí", expr: "amount * (1 + fee / 100 * x / 7)" },
        ],
      },
      {
        type: "flow",
        title: "Từ hóa đơn quá hạn tới ba tin nhắc",
        steps: [
          { label: "Lấy ba con số từ hóa đơn", detail: "Số hóa đơn, số tiền, ngày đến hạn. Ghi ra giấy hoặc một dòng ghi chú trước khi mở AI." },
          { label: "Nhờ AI soạn ba tin có chỗ trống", detail: "Ba mức: nhắc nhẹ, nhắc rõ, nhắc nghiêm túc. Bắt buộc dùng chỗ trống, không tự điền số." },
          { label: "Điền và tính số ngày trễ", detail: "Bạn điền số, tự tính hôm nay trừ ngày đến hạn." },
          { label: "Chọn mức theo số ngày trễ", detail: "Trễ vài ngày gửi tin nhẹ; hai tuần gửi tin rõ; chưa phản hồi sau đó mới tới mức cuối." },
        ],
      },
      {
        type: "callout",
        label: "Không tự bịa phí phạt hay lời doạ",
        text: "Chỉ nhắc phí trễ hạn khi hợp đồng đã ghi. Chuyện đòi nợ pháp lý hay nêu lãi suất, hỏi kế toán trưởng hoặc luật sư trước khi viết vào tin nhắn.",
      },
      {
        type: "scenario",
        title: "Hóa đơn quá hạn hai tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Hóa đơn 12 triệu đồng, hạn ngày 10, hôm nay là 24. Khách vẫn nhắn tin về việc khác nhưng chưa nhắc gì tới tiền.",
            choices: [
              { label: "Gửi luôn tin nghiêm túc nhất, ghi rõ sẽ tính phí phạt", next: "bad_harsh" },
              { label: "Gửi tin rõ ràng: ghi số hóa đơn, số tiền, hỏi ngày dự kiến trả", next: "s2" },
            ],
          },
          bad_harsh: {
            text: "Hợp đồng không hề ghi phí phạt. Khách phản đối, nói bạn đưa điều kiện không có thật, và quan hệ trở nên căng thẳng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn soát tin nhắn AI viết: số tiền đúng, nhưng ngày trễ AI ghi là 9 ngày.",
            choices: [
              { label: "Sửa thành 14 ngày sau khi tự tính 24 trừ 10, rồi gửi", next: "good" },
              { label: "Để nguyên vì chênh vài ngày cũng không sao", next: "bad_wrong" },
            ],
          },
          bad_wrong: {
            text: "Khách trả lời: 'chưa tới hai tuần mà chị nhắc rồi', và dùng lỗi đó để hoãn thêm vài ngày.",
            ending: "bad",
          },
          good: {
            text: "Khách xin lỗi vì quên và chuyển khoản trong ngày. Bạn lưu ba tin mẫu để dùng lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nhắc sớm, nhắc nhẹ, và luôn nói đúng con số trên hóa đơn.",
          "Bài sau: dự án nhỏ ghép báo giá, danh sách hỏi luật sư và tin nhắc thanh toán thành một thư mục dùng lại.",
        ],
      },
    ],
  },
  {
    id: 2229,
    slug: "freelancer-du-an-nho-bo-bao-gia-va-hoa-don-mau",
    title: "Chặng 41, Bài 10: Dự án nhỏ: bộ báo giá và tin nhắc thanh toán dùng lại",
    subtitle: "Ghép ba thứ đã học thành một thư mục, và đánh dấu phần nào phải để người có chuyên môn duyệt.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi lần nhận việc mới, bạn lại lục tin nhắn cũ tìm báo giá, hỏi lại chỗ này chỗ kia và viết tin nhắc từ đầu. Một thư mục gọn gồm báo giá mẫu, danh sách hỏi luật sư và ba tin nhắc giúp bạn nhận việc trong mười phút thay vì một buổi. Và bạn biết rõ phần nào tự sửa được, phần nào phải hỏi người khác.",
    openingQuestion:
      "Bạn ghép báo giá mẫu, danh sách hỏi luật sư và ba tin nhắc thành một thư mục. Điều gì làm thư mục đó dùng lại an toàn nhất?",
    openingOptions: [
      "Ghi rõ chỗ trống cần điền và phần nào phải có người chuyên môn duyệt",
      "Đặt tên file thật đẹp để trông như một bộ sản phẩm chuyên nghiệp với khách hàng",
      "Điền sẵn số liệu của khách gần nhất để lần sau chỉ cần sửa ít",
      "Gộp tất cả vào một file dài để khỏi phải mở nhiều tệp",
    ],
    correctOption: 0,
    explanation:
      "Chỗ trống rõ ràng giúp bạn không quên điền số thật mỗi lần, còn đánh dấu phần cần duyệt giúp bạn nhớ hỏi người có chuyên môn thay vì gửi nguyên. Tên file đẹp không làm mẫu an toàn hơn. Điền sẵn số của khách cũ dễ khiến bạn gửi nhầm con số cho khách mới. Gộp tất cả vào một file dài làm khó tìm đúng phần cần dùng.",
    diagram: [
      { label: "Gom báo giá mẫu, danh sách hỏi luật sư, ba tin nhắc", arrow: true },
      { label: "Đánh dấu chỗ trống và phần cần duyệt", arrow: true },
      { label: "Thử với một khách giả định, điền số thật", arrow: true },
      { label: "Ghi lại chỗ cần chỉnh giọng rồi lưu thư mục" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một người thiết kế web tự do gom ba mẫu vào một thư mục và ghi nhãn 'cần luật sư xem' cho điều khoản quyền sử dụng. Lần đầu thử với khách giả định, cô thấy mẫu tin nhắc còn để lại tên khách cũ. Cô sửa thành chỗ trống, và từ đó mỗi lần đều điền số mới từ hóa đơn thật.",
    },
    quiz: [
      {
        question: "Vì sao mẫu dùng lại nên để chỗ trống thay vì điền sẵn số của khách gần nhất?",
        options: [
          "Vì số cũ còn sót lại dễ bị gửi nhầm cho khách mới",
          "Vì AI không chấp nhận mẫu có số liệu điền sẵn",
          "Vì chỗ trống giúp mẫu ngắn hơn và dễ đọc hơn",
          "Vì khách mới luôn muốn thấy chỗ trống được để lại trong mẫu họ nhận",
        ],
        correct: 0,
        explanation:
          "Số cũ trông như thật nên bạn dễ quên đổi, và một khách nhận nhầm con số của người khác gây thiệt hại thật. AI nhận mẫu có số điền sẵn được, chỉ là rủi ro thuộc về bạn. Độ ngắn không phải lý do chính, và khách không nhìn thấy mẫu, họ chỉ thấy bản đã điền.",
      },
      {
        question: "Phần nào trong thư mục nên đánh dấu 'cần người có chuyên môn duyệt' trước khi dùng?",
        options: [
          "Điều khoản quyền sử dụng, phí phạt và mọi câu cam kết pháp lý",
          "Lời chào đầu thư, câu cảm ơn cuối thư và cách xưng hô với khách hàng",
          "Màu sắc, bố cục của file báo giá và kiểu chữ dùng cho tiêu đề",
          "Tên file, cách sắp xếp thư mục và thứ tự các tệp bên trong nó",
        ],
        correct: 0,
        explanation:
          "Điều khoản quyền sử dụng, phạt và cam kết có hệ quả tiền bạc và pháp lý, nên cần người có chuyên môn xem. Lời chào, bố cục và tên file chỉ ảnh hưởng thẩm mỹ, bạn tự chỉnh được.",
      },
      {
        question: "Bạn thử mẫu với một khách giả định và thấy giọng tin nhắc nghe khác bạn. Nên làm gì?",
        options: [
          "Ghi lại chỗ khác và đưa AI thêm một tin bạn đã viết để chỉnh giọng",
          "Bỏ qua vì khách sẽ không để ý giọng nghe thế nào",
          "Xóa hết mẫu rồi viết lại mọi tin từ đầu bằng tay",
          "Chuyển sang giọng cứng nhắc hơn cho giống thư của công ty",
        ],
        correct: 0,
        explanation:
          "Một tin bạn tự viết là ví dụ tốt nhất để AI bắt chước giọng của bạn, và việc ghi lại chỗ khác giúp lần sau chỉnh nhanh. Khách thường nhận ra thư nghe xa lạ. Viết lại từ đầu bỏ phí công đã làm, còn giọng cứng nhắc làm xa khách hơn.",
      },
      {
        question: "Thư mục có ba tệp mẫu. Cách đặt tên nào giúp bạn dùng lại đúng nhất?",
        options: [
          "Tên nói rõ mẫu dùng khi nào, ví dụ 'bao-gia-mau', 'nhac-lan-1', 'hoi-luat-su'",
          "Đánh số 1, 2, 3 theo thứ tự dùng để gọn và dễ nhớ hơn",
          "Dùng tên khách gần nhất để nhớ mẫu từng dùng cho ai",
          "Đặt tên theo ngày tạo để biết ngay mẫu nào là mới nhất",
        ],
        correct: 0,
        explanation:
          "Tên nói rõ mục đích giúp bạn mở đúng tệp mà không cần đọc lại. Đánh số chỉ cho biết thứ tự, không cho biết nội dung. Tên khách gợi số liệu cũ dễ bị gửi nhầm. Ngày tạo cho biết mẫu cũ hay mới chứ không cho biết mẫu dùng làm gì.",
      },
      {
        question: "Sau một tháng dùng bộ mẫu, khi nào nên cập nhật lại các mẫu?",
        options: [
          "Khi có chỗ nào phải sửa tay lặp lại nhiều lần trong khi dùng",
          "Mỗi tuần đều cập nhật lại toàn bộ mẫu dù chưa có gì thay đổi để cho chắc ăn",
          "Khi AI có phiên bản mới, vì mẫu cũ sẽ không chạy nữa",
          "Không bao giờ, vì mẫu đã dùng được thì không nên đụng vào",
        ],
        correct: 0,
        explanation:
          "Chỗ phải sửa tay lặp lại là dấu hiệu mẫu chưa khớp cách làm của bạn, nên đưa sửa đó vào mẫu. Cập nhật đều đặn mà không có lý do chỉ mất thời gian. Mẫu bạn lưu là văn bản nên không phụ thuộc phiên bản AI. Không bao giờ sửa thì mẫu lạc hậu dần so với cách bạn làm việc.",
      },
    ],
    keyTakeaways: [
      "Mẫu dùng lại phải có chỗ trống, không điền sẵn số của khách cũ.",
      "Đánh dấu phần cần người có chuyên môn duyệt: quyền sử dụng, phạt, cam kết.",
      "Thử với khách giả định trước khi dùng với khách thật.",
      "Tên tệp nói rõ mẫu dùng khi nào.",
      "Chỗ nào bạn sửa tay lặp lại thì đưa vào mẫu.",
    ],
    practicePrompt: {
      question:
        "Chị Lan gom mẫu xong, thử với khách giả định và thấy tin nhắc còn ghi số tiền 'khách A đã trả'. Chị nên làm gì trước khi dùng thật?",
      options: [
        "Thay số đó bằng chỗ trống {so_tien} và thử lại với khách giả định",
        "Giữ nguyên số và chỉ đổi khi nhớ ra lúc gửi khách mới",
        "Xoá luôn ô số tiền để mẫu gọn hơn",
        "Gửi thử cho khách A vì họ đã trả rồi nên không sao",
      ],
      correct: 0,
      explanation:
        "Số cũ phải đổi thành chỗ trống để lần sau bạn luôn phải điền số mới. Trông chờ nhớ ra lúc gửi là nguy cơ nhầm số. Xoá ô số tiền làm mất thông tin cốt lõi của tin nhắc. Gửi cho khách đã trả sẽ gây khó chịu vì họ không còn nợ.",
    },
    summary: {
      keyIdea: "Bộ mẫu tốt có chỗ trống, có nhãn cần duyệt, và đã thử với khách giả định.",
      formula: "Bộ mẫu = báo giá mẫu + danh sách hỏi luật sư + ba tin nhắc + nhãn phần cần duyệt.",
      commonMistake: "Để sót số liệu của khách cũ trong mẫu rồi gửi nhầm cho khách mới.",
      action: "Gom ba mẫu vào một thư mục và thử điền cho một khách giả định.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tạo một thư mục tên 'nhan-viec-mau' và đặt vào ba tệp: báo giá mẫu, danh sách hỏi luật sư, tin nhắc thanh toán. Thay mọi con số cũ bằng chỗ trống {so_tien}, {ngay}, {so_hoa_don}. Ghi bên cạnh điều khoản nào cần người có chuyên môn duyệt, rồi thử điền cho một khách giả định trong 5 phút.",
      secondary: "Ghi chỗ nào phải sửa giọng cho giống bạn để chỉnh lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần bạn nhận việc mới và lại lục lọi tin nhắn cũ để tìm cách báo giá. Bài dự án nhỏ này gom ba thứ bạn vừa học thành một thư mục, để lần sau nhận việc chỉ mất mười phút.",
      },
      {
        type: "feynman",
        title: "Bộ mẫu dùng lại đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp dụng cụ sửa nhà: mỗi món có chỗ riêng, nhìn là biết dùng khi nào, và cái nào nguy hiểm thì có nhãn. Bộ mẫu của bạn cũng là hộp dụng cụ đó.",
        columns: ["Thành phần", "Hộp dụng cụ", "Thư mục mẫu"],
        rows: [
          ["Mỗi món một chỗ", "Búa, kìm, tua vít", "Báo giá, danh sách hỏi luật sư, tin nhắc"],
          ["Chỗ trống", "Ngăn chưa có đồ", "{so_tien}, {ngay}, {so_hoa_don}"],
          ["Nhãn cảnh báo", "Dán nhãn dụng cụ điện", "Nhãn 'cần người có chuyên môn duyệt'"],
          ["Thử trước khi dùng", "Thử khoan lên gỗ vụn", "Thử với khách giả định"],
        ],
        oneLiner: "Sắp sẵn từng món, dán nhãn món nguy hiểm, và thử trước khi dùng thật.",
      },
      { type: "heading", text: "Bốn việc cho dự án nhỏ" },
      {
        type: "list",
        items: [
          "Gom ba mẫu vào một thư mục và đặt tên nói rõ khi nào dùng.",
          "Thay mọi con số cũ bằng chỗ trống có tên.",
          "Đánh dấu phần cần người có chuyên môn duyệt.",
          "Thử với một khách giả định và ghi chỗ cần sửa.",
        ],
      },
      {
        type: "flow",
        title: "Từ ba mẫu rời tới một thư mục dùng lại",
        steps: [
          { label: "Gom ba mẫu đã làm", detail: "Báo giá rõ phạm vi, danh sách hỏi luật sư, ba tin nhắc thanh toán. Copy vào một thư mục." },
          { label: "Đổi số cũ thành chỗ trống", detail: "Tìm mọi con số và tên khách cũ, thay bằng chỗ trống có tên như {so_tien}." },
          { label: "Dán nhãn phần cần duyệt", detail: "Ghi 'cần người có chuyên môn duyệt' cạnh quyền sử dụng, phí phạt, bảo hành." },
          { label: "Thử và ghi lại chỗ cần chỉnh", detail: "Điền cho một khách giả định, ghi nơi giọng chưa giống bạn hoặc số còn sót." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dọn mẫu thành chỗ trống",
        task: "Bạn có tin nhắc thanh toán còn ghi tên và số của khách cũ. Lắp prompt để AI biến nó thành mẫu dùng lại an toàn.",
        parts: [
          {
            id: "blank",
            label: "Chỗ trống",
            options: [
              { text: "Sửa tin này cho hợp với mọi khách nhé.", feedback: "Không nói rõ chỗ trống, AI tự đổi số cũ bằng số khác nghe hợp lý, bạn khó phát hiện." },
              { text: "Thay tên khách, số hóa đơn, số tiền, ngày bằng {ten}, {so_hoa_don}, {so_tien}, {ngay}; không tự điền giá trị.", good: true, feedback: "Chỗ trống có tên - bạn điền số thật mỗi lần và AI không được bịa." },
            ],
          },
          {
            id: "voice",
            label: "Giọng của bạn",
            options: [
              { text: "Viết cho thật chuyên nghiệp.", feedback: "Từ 'chuyên nghiệp' khiến AI viết giọng công ty, xa với cách bạn nói chuyện." },
              { text: "Giữ nguyên giọng và độ dài của tin gốc, chỉ đổi phần chỗ trống.", good: true, feedback: "Giữ giọng gốc - AI chỉ làm phần cơ học, không viết lại theo giọng lạ." },
            ],
          },
          {
            id: "flag",
            label: "Phần cần duyệt",
            options: [
              { text: "Thêm điều khoản phạt trễ hạn để tin nhắc mạnh hơn.", feedback: "AI tự đặt mức phạt, tức là cam kết bạn chưa quyết và chưa ai chuyên môn xem." },
              { text: "Không thêm điều khoản nào; nếu thấy câu cam kết hay phí phạt thì gạch dưới để tôi hỏi người chuyên môn.", good: true, feedback: "AI chỉ đánh dấu chứ không quyết thay bạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["blank", "voice", "flag"],
            text: "Chào {ten},\n\nEm nhắc nhẹ hóa đơn {so_hoa_don}, số tiền {so_tien}, đã quá hạn từ {ngay}. Anh/chị cho em biết ngày dự kiến thanh toán nhé.\n\nCảm ơn anh/chị.\n\n(Không có câu cam kết nào cần gạch dưới.)",
          },
          {
            requires: ["blank"],
            text: "Chào {ten},\n\nEm nhắc hóa đơn {so_hoa_don}, số tiền {so_tien}. Nếu trễ thêm, phí phạt 2% mỗi tuần sẽ được tính...\n\n(Chỗ trống đúng nhưng AI tự thêm phí phạt bạn chưa hề quyết.)",
          },
          {
            text: "Kính gửi Quý khách hàng,\n\nChúng tôi trân trọng nhắc Quý khách thanh toán hóa đơn 0245 với số tiền 12.500.000 đồng...\n\n(Số của khách cũ vẫn còn, giọng đã thành giọng công ty.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mẫu có chỗ trống và nhãn",
          text: "Mỗi lần dùng, bạn buộc phải điền số thật. Phần cần duyệt được đánh dấu nên khó quên. Dễ kiểm và dùng nhanh.",
        },
        right: {
          label: "Mẫu điền sẵn số cũ",
          text: "Trông có vẻ nhanh vì chỉ sửa vài chỗ, nhưng dễ sót số cũ. Không có nhãn nên điều khoản nhạy cảm bị gửi đi mà chưa ai xem.",
        },
      },
      {
        type: "callout",
        label: "Phần nào cần người có chuyên môn",
        text: "Điều khoản quyền sử dụng, phí phạt, bảo hành, bí mật thông tin: hỏi bộ phận pháp chế, luật sư hoặc kế toán trưởng trước khi đưa vào mẫu dùng lại. AI giúp soạn và nhắc, không thay họ.",
      },
      {
        type: "scenario",
        title: "Thử bộ mẫu với khách giả định",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gom xong ba mẫu và có một khách giả định là 'Minh Phát', hóa đơn 5 triệu, hạn ngày 10. Bạn cần thử trước khi dùng thật.",
            choices: [
              { label: "Bỏ qua bước thử vì mẫu đã đẹp rồi", next: "bad_skip" },
              { label: "Điền số của khách giả định vào từng mẫu và đọc lại", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Lần đầu dùng thật, tin nhắc còn dòng 'khách A đã trả'. Khách mới thấy tên người khác và hỏi lại, bạn ngượng và mất thời gian giải thích.",
            ending: "bad",
          },
          s2: {
            text: "Khi điền, bạn thấy một mẫu còn sót số tiền cũ và giọng tin thứ hai nghe cứng.",
            choices: [
              { label: "Đổi số cũ thành chỗ trống, đưa AI một tin bạn viết để chỉnh giọng", next: "good" },
              { label: "Ghi chú trong đầu để nhớ sửa sau", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Bạn quên. Vài tuần sau tin nhắc gửi đi với con số cũ và một khách nhắn lại thắc mắc.",
            ending: "bad",
          },
          good: {
            text: "Bạn sửa ngay, lưu thư mục có nhãn cần duyệt, và lần nhận việc sau chỉ mất mười phút để điền.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chỗ trống, nhãn cần duyệt và một lần thử là ba thói quen biến ba mẫu rời thành một bộ dùng lại.",
          "Bài sau: viết mô tả dự án cho portfolio từ ghi chú của chính bạn.",
        ],
      },
    ],
  },
];
