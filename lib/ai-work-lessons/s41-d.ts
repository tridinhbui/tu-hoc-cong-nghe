import type { Lesson } from "../lesson-types";

// Chặng 41, bài 16-20. Giáo trình: scripts/curriculum/stage-41.json.
// Đáp án đúng luôn viết ở vị trí đầu; vị trí được xáo lại lúc build.
const Q = (question: string, options: string[], explanation: string) => ({ question, options, correct: 0, explanation });

export const S41_D_LESSONS: Lesson[] = [
  {
    id: 2235,
    slug: "freelancer-xep-lich-tuan-tu-viec-va-han-chot",
    title: "Chặng 41, Bài 16: Xếp lịch tuần từ danh sách việc và hạn chót thật",
    subtitle: "Lịch tuần giống việc xếp đồ vào vali: vali có sức chứa, đồ không vừa thì phải bỏ bớt.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Freelancer không có sếp chia việc nên rất dễ nhận quá sức rồi thức khuya chữa cháy. Một lịch tuần dựa trên hạn chót và số giờ thật cho bạn biết việc nào nhận được, việc nào phải lùi, trước khi lỡ hẹn với khách.",
    openingQuestion:
      "Sáng thứ Hai bạn có năm việc của ba khách, mỗi việc một hạn khác nhau. Bạn nhờ AI xếp lịch tuần. Điều gì quyết định lịch đó dùng được hay không?",
    openingOptions: [
      "Bạn đưa hạn chót thật và số giờ ước lượng cho từng việc",
      "AI được dặn xếp lịch thật gọn gàng và đẹp mắt nên tự biết việc nào gấp",
      "Lịch có đủ năm việc, không bỏ sót việc nào",
      "AI xếp việc theo thứ tự khách nhắn tin trước",
    ],
    correctOption: 0,
    explanation:
      "AI không biết khách nào chốt hạn thứ Năm hay bạn cần bao nhiêu giờ để làm xong một việc. Nếu không được đưa, nó sẽ tự đoán và xếp một lịch trông hợp lý nhưng có thể không khả thi. Lịch đẹp hay đủ việc chưa nói lên điều gì, còn thứ tự khách nhắn không phản ánh việc nào gấp. Hạn chót thật cùng số giờ là dữ kiện làm lịch dùng được.",
    diagram: [
      { label: "Liệt kê việc, hạn chót, số giờ ước lượng", arrow: true },
      { label: "AI xếp thành lịch từng ngày", arrow: true },
      { label: "Bạn cộng giờ và so với giờ thật có", arrow: true },
      { label: "Cắt hoặc lùi phần không khả thi, báo khách sớm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một bạn thiết kế đồ hoạ nhận cùng lúc bộ nhận diện cho quán cà phê, banner cho cửa hàng và sửa một bản trình bày. Bạn dán ba hạn và số giờ ước tính vào công cụ AI. Bản lịch đầu xếp tổng 52 giờ vào tuần chỉ có 40 giờ trống. Bạn lùi banner sang tuần sau, báo khách từ thứ Hai, và cả ba khách vẫn nhận đúng hẹn mới.",
    },
    quiz: [
      Q(
        "Khi nhờ AI xếp lịch tuần, bạn nên đưa thông tin nào trước tiên?",
        [
          "Hạn chót thật của từng việc và số giờ bạn ước lượng cho việc đó",
          "Danh sách việc, còn số giờ để AI tự ước lượng cho hợp lý",
          "Chỉ tên khách hàng, vì AI biết khách nào cần gấp hơn",
          "Số giờ bạn muốn nghỉ mỗi ngày, hạn chót thì AI tự chọn",
        ],
        "AI không biết hạn thật của khách hay tốc độ làm việc của bạn, nên cần cả hai dữ kiện. Nếu để nó tự ước lượng giờ hoặc hạn thì lịch chỉ là phỏng đoán. Tên khách không nói gì về mức gấp, và hạn thì không phải thứ AI được tự chọn."
      ),
      Q(
        "AI xếp lịch tổng 52 giờ nhưng tuần này bạn chỉ có 40 giờ trống. Nên làm gì?",
        [
          "Cắt hoặc lùi bớt việc rồi báo khách sớm",
          "Tin lịch của AI vì nó đã tính, làm thêm buổi tối cho kịp",
          "Nhờ AI ước lượng lại từng việc ngắn đi để vừa 40 giờ",
          "Chia đều 52 giờ ra bảy ngày, kể cả chủ nhật, cho đủ",
        ],
        "52 giờ vào 40 giờ là chênh 12 giờ, không phải lỗi trình bày. Nén số giờ trên giấy không làm việc nhanh hơn thật, còn làm bù buổi tối và chủ nhật chỉ hoãn vấn đề sang tuần sau. Cách duy nhất khớp thực tế là bỏ hoặc lùi bớt việc rồi báo khách sớm."
      ),
      Q(
        "Vì sao khi lập lịch nên cộng thêm thời gian cho nhắn tin, họp ngắn và sửa bài?",
        [
          "Vì giờ làm thật gồm cả giao tiếp và chỉnh sửa, không chỉ giờ làm ra sản phẩm",
          "Vì AI luôn tính thiếu giờ nên phải cộng bù cho mọi lịch, dù bạn làm nhanh cỡ nào",
          "Vì khách trả thêm tiền cho từng giờ trả lời tin nhắn",
          "Vì lịch dày thì khách nghĩ bạn đắt khách nên nể hơn",
        ],
        "Một việc ước 6 giờ thường kéo theo trao đổi, chờ phản hồi và sửa vòng hai. Nếu chỉ tính giờ làm ra sản phẩm, lịch sẽ thiếu vài giờ mỗi việc. Lý do không phải AI tính thiếu, không phải tiền công, cũng không phải chuyện gây ấn tượng."
      ),
      Q(
        "Bạn ước lượng một việc mất 6 giờ và cộng thêm 1 giờ trao đổi. Năm việc như vậy chiếm bao nhiêu giờ?",
        [
          "35 giờ (= 5 × (6 + 1))",
          "30 giờ (= 5 × 6, quên giờ trao đổi)",
          "36 giờ (= 6 × 6, nhầm số việc)",
          "7 giờ (= 6 + 1, quên nhân)",
        ],
        "Mỗi việc chiếm 6 + 1 = 7 giờ, năm việc là 5 × 7 = 35 giờ. Bỏ giờ trao đổi cho ra 30, nhầm số việc cho ra 36, còn không nhân với số việc chỉ cho 7. Cộng đúng giúp bạn thấy 35 giờ đã gần hết một tuần 40 giờ."
      ),
      Q(
        "Lịch AI xếp có việc thứ Ba mà khách chưa từng nói hạn. Điều đúng là gì?",
        [
          "Hỏi lại khách, vì hạn đó là AI tự điền",
          "Giữ nguyên, AI thường đoán đúng hạn của khách",
          "Xoá hạn khỏi lịch và làm khi nào rảnh thì làm",
          "Đẩy việc đó lên thứ Hai cho chắc, không cần hỏi",
        ],
        "Hạn AI tự điền là dữ kiện bịa ra cho lịch trông đầy đủ. Bạn cần xác nhận với khách thay vì tin nó. Xoá hạn hoặc tự đẩy sớm đều là đoán tiếp, và có thể làm bạn dồn việc vào ngày không cần."
      ),
      Q(
        "Sau khi có lịch từ AI, bước nào giúp bạn tránh lỡ hẹn nhất?",
        [
          "Cộng tổng giờ từng ngày và so với giờ bạn thật sự có",
          "Đọc lịch một lần xem có dễ nhìn không rồi lưu lại",
          "Gửi luôn lịch cho khách để họ tự thấy bạn bận cỡ nào",
          "Nhờ AI kiểm lại chính lịch nó vừa xếp cho chắc chắn",
        ],
        "Lỗi lịch nằm ở phép cộng giờ và giờ trống thật, thứ bạn phải tự đối chiếu. Dễ nhìn chưa chứng minh lịch khả thi, khách không cần xem lịch nội bộ của bạn, và AI tự kiểm bài của chính nó dễ xác nhận cả chỗ sai."
      ),
    ],
    keyTakeaways: [
      "Đưa AI hạn chót thật và số giờ ước lượng, đừng để nó tự đoán.",
      "Giờ làm thật gồm cả nhắn tin, sửa bài và chờ phản hồi.",
      "Cộng tổng giờ và so với giờ trống của bạn: lịch dùng được hay không nằm ở phép cộng này.",
      "Không vừa thì cắt hoặc lùi việc và báo khách sớm, đừng nén giờ trên giấy.",
    ],
    practicePrompt: {
      question:
        "Bạn có 40 giờ trống. AI xếp bốn việc tổng 46 giờ, trong đó một việc 8 giờ có hạn tuần sau. Cách xử lý hợp lý là gì?",
      options: [
        "Lùi việc 8 giờ sang tuần sau và báo khách",
        "Giữ hết bốn việc, làm thêm buổi tối cho đủ 46 giờ",
        "Bảo AI ghi tổng giờ thành 40 để lịch trông vừa",
        "Bỏ việc có khách khó tính nhất vì họ hay sửa nhiều",
      ],
      correct: 0,
      explanation:
        "Việc 8 giờ có hạn tuần sau nên lùi được mà không lỡ hẹn, lại đưa tổng về 38 giờ, dưới 40. Làm thêm buổi tối chỉ dồn áp lực, sửa số giờ trên giấy không đổi thực tế, và bỏ việc theo tính khách thì bỏ qua yếu tố hạn chót.",
    },
    summary: {
      keyIdea: "Lịch tuần là phép cộng giờ, không phải bảng đẹp: AI xếp, bạn cộng và cắt.",
      formula: "Giờ trống = giờ có trong tuần − Σ (giờ làm + giờ trao đổi) của mọi việc.",
      commonMistake: "Tin tổng giờ AI ghi và nhận thêm việc khi lịch đã hết chỗ.",
      action: "Cộng lại số giờ của tuần này và đánh dấu việc nào phải lùi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy các việc có thật của tuần này (ít nhất 4 việc). Ghi cạnh mỗi việc hạn chót thật và số giờ bạn ước lượng, thêm 1 giờ trao đổi. Nhờ AI xếp thành lịch từng ngày, rồi tự cộng giờ và gạch tên việc nào vượt số giờ trống của bạn.",
      secondary: "Ngày mai kiểm lại: giờ thật bạn làm mỗi việc chênh bao nhiêu so với ước lượng?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, năm việc của ba khách cùng nhìn bạn. Bài này dạy cách đưa cho AI đúng dữ kiện để có lịch tuần, và cách bạn tự kiểm xem lịch có khả thi.",
      },
      {
        type: "feynman",
        title: "Xếp lịch tuần đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc xếp đồ vào vali: vali chỉ chứa được một sức nặng nhất định, và đồ vượt quá thì phải bỏ lại chứ không thể ép cho vừa.",
        columns: ["Thành phần", "Xếp vali", "Xếp lịch tuần"],
        rows: [
          ["Sức chứa", "Vali chứa được vài chục ký", "Tuần có khoảng 40 giờ làm thật"],
          ["Đồ cần xếp", "Quần áo, giày, sạc", "Các việc của khách, mỗi việc một số giờ"],
          ["Người giúp", "Bạn bè gợi ý cách xếp gọn", "AI đề xuất thứ tự từng ngày"],
          ["Khi quá tải", "Bỏ bớt đồ", "Cắt hoặc lùi việc và báo khách sớm"],
        ],
        oneLiner: "AI giúp sắp thứ tự, nhưng sức chứa của tuần vẫn do bạn cộng và quyết định.",
      },
      { type: "heading", text: "Vấn đề: lịch trông đầy đặn mà vẫn lỡ hẹn" },
      {
        type: "paragraph",
        text: "Nhiều freelancer nhờ AI lập lịch và nhận về một bảng ngon mắt. Nhưng bảng chỉ dùng được khi giờ trong đó khớp giờ thật. Nếu bạn không đưa hạn và số giờ, AI sẽ tự điền cho lịch trông đầy đủ.",
      },
      {
        type: "chart",
        title: "Giờ trống còn lại khi nhận thêm việc",
        caption:
          "Số liệu minh hoạ. Giờ trống = tổng giờ có trong tuần trừ đi số việc nhân (giờ làm + giờ trao đổi mỗi việc). Kéo thanh trượt cho khớp với bạn.",
        kind: "line",
        xLabel: "Số việc nhận trong tuần",
        yLabel: "Giờ còn trống",
        x: { from: 0, to: 10, step: 1 },
        params: [
          { id: "tong", label: "Giờ có trong tuần", min: 20, max: 60, step: 1, value: 40, unit: "giờ" },
          { id: "lam", label: "Giờ làm mỗi việc", min: 1, max: 12, step: 0.5, value: 6, unit: "giờ" },
          { id: "trao", label: "Giờ trao đổi mỗi việc", min: 0, max: 4, step: 0.5, value: 1, unit: "giờ" },
        ],
        series: [{ label: "Giờ còn trống", expr: "max(0, tong - x * (lam + trao))" }],
      },
      {
        type: "paragraph",
        text: "Với các số mặc định, mỗi việc chiếm 7 giờ, nên sau khoảng năm việc gần như hết giờ. Khi đường trên biểu đồ chạm 0, việc thứ sáu không còn chỗ: phải lùi hoặc từ chối.",
      },
      {
        type: "flow",
        title: "Từ danh sách việc đến lịch dùng được",
        steps: [
          { label: "Liệt kê việc", detail: "Ghi mỗi việc kèm tên khách, hạn chót thật do khách nói và số giờ bạn ước lượng." },
          { label: "Nhờ AI xếp", detail: "Đưa cả danh sách và số giờ trống mỗi ngày. Yêu cầu AI ghi rõ tổng giờ từng ngày." },
          { label: "Bạn cộng lại", detail: "Tự cộng giờ từng ngày và so với giờ trống thật, không dựa vào con số AI ghi." },
          { label: "Cắt phần không khả thi", detail: "Việc nào vượt sức chứa thì lùi hoặc từ chối, ưu tiên việc có hạn gần." },
          { label: "Báo khách sớm", detail: "Khách bị lùi được báo ngay đầu tuần kèm ngày mới bạn chắc chắn làm được." },
        ],
      },
      {
        type: "list",
        items: [
          "Việc 1: ghi hạn do khách nói, không ghi hạn bạn đoán.",
          "Việc 2: ước lượng giờ theo lần làm trước của bạn, thêm giờ trao đổi.",
          "Việc 3: nói với AI số giờ trống mỗi ngày, gồm cả ngày bạn bận việc riêng.",
          "Việc 4: kiểm tổng giờ từng ngày trước khi tin lịch.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI xếp lịch tuần cho năm việc",
        task: "Bạn có năm việc của ba khách, tổng khoảng 35 giờ, mỗi ngày làm được 8 giờ từ thứ Hai đến thứ Sáu. Lắp một prompt để AI xếp lịch.",
        parts: [
          {
            id: "viec",
            label: "Danh sách việc",
            options: [
              { text: "Tôi có vài việc cho khách, hãy xếp lịch giúp tôi.", feedback: "AI không biết bao nhiêu việc, việc gì. Nó sẽ tự bịa ra việc để lấp lịch." },
              {
                text: "Năm việc: logo quán A (hạn thứ Năm, 8 giờ), banner B (hạn thứ Sáu, 7 giờ), sửa slide C (hạn thứ Tư, 5 giờ), poster A (hạn thứ Sáu, 9 giờ), tài liệu C (hạn thứ Ba, 6 giờ).",
                good: true,
                feedback: "Đủ tên, hạn thật và số giờ. AI có dữ kiện để xếp theo hạn thay vì đoán.",
              },
            ],
          },
          {
            id: "rang",
            label: "Ràng buộc",
            options: [
              { text: "Xếp sao cho hợp lý nhất.", feedback: "\"Hợp lý\" không đo được. AI có thể xếp 12 giờ vào một ngày mà vẫn coi là hợp lý." },
              { text: "Mỗi ngày tối đa 8 giờ, thứ Hai đến thứ Sáu. Việc hạn sớm xếp trước, ghi tổng giờ từng ngày.", good: true, feedback: "Có trần giờ mỗi ngày và quy tắc thứ tự. Kết quả kiểm được bằng phép cộng." },
            ],
          },
          {
            id: "dau",
            label: "Cách xử lý khi quá tải",
            options: [
              { text: "Nếu không vừa thì cứ nén giờ từng việc cho vừa.", feedback: "Nén giờ trên giấy không làm bạn làm nhanh hơn. Lịch vừa mà việc vẫn chưa xong." },
              { text: "Nếu tổng vượt giờ có, nêu rõ việc nào nên lùi, đừng tự đổi số giờ tôi đưa.", good: true, feedback: "AI chỉ ra việc cần lùi, còn số giờ giữ nguyên. Bạn quyết định cắt gì." },
            ],
          },
        ],
        responses: [
          {
            requires: ["viec", "rang", "dau"],
            text: "Thứ Hai: tài liệu C (6 giờ) + logo A (2 giờ) = 8 giờ.\nThứ Ba: tài liệu C hoàn tất trước hạn; logo A (6 giờ) + slide C (2 giờ) = 8 giờ.\nThứ Tư: slide C (3 giờ, hạn chiều) + banner B (5 giờ) = 8 giờ.\nThứ Năm: logo A hoàn tất; banner B (2 giờ) + poster A (6 giờ) = 8 giờ.\nThứ Sáu: poster A (3 giờ) và hạn banner B, poster A.\nTổng: 35 giờ trên 40 giờ có. Lưu ý: chưa tính giờ trao đổi; nếu mỗi việc thêm 1 giờ thì nên lùi poster A.",
          },
          {
            requires: ["viec"],
            text: "Thứ Hai: logo A. Thứ Ba: banner B. Thứ Tư: slide C. Thứ Năm và thứ Sáu: poster A, tài liệu C.\n(Có đủ việc, nhưng không có giờ từng ngày nên bạn không kiểm được, và tài liệu C bị xếp sau hạn thứ Ba.)",
          },
          {
            text: "Thứ Hai: viết kế hoạch nội dung mạng xã hội 10 giờ. Thứ Ba: họp khách mới 4 giờ. Thứ Tư đến thứ Sáu: các việc còn lại.\n(AI bịa ra việc không có trong danh sách của bạn và một ngày tới 10 giờ.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: hạn AI tự điền không phải hạn khách hẹn",
        text: "Nếu lịch có ngày hoặc giờ mà bạn chưa từng đưa, đó là AI điền cho đầy đủ. Hỏi lại khách trước khi tin, và không hứa với khách ngày chỉ có trên lịch của AI.",
      },
      {
        type: "scenario",
        title: "Lịch vượt 12 giờ, khách đang chờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Lịch AI xếp tổng 52 giờ trong khi bạn chỉ có 40. Khách A hạn thứ Sáu tuần sau chưa gấp, khách B hạn thứ Ba tuần này.",
            choices: [
              { label: "Làm hết, thức khuya để bù 12 giờ", next: "bad_sleep" },
              { label: "Lùi việc của khách A sang tuần sau, báo trước hôm nay", next: "s2" },
            ],
          },
          bad_sleep: {
            text: "Bạn kiệt sức từ thứ Tư, sửa sai nhiều ở bài của khách B và trễ luôn hạn thứ Ba. Cả hai khách đều biết bạn vượt sức.",
            ending: "bad",
          },
          s2: {
            text: "Khách A hỏi vì sao lùi. Bạn cần trả lời ngắn và có ngày mới.",
            choices: [
              { label: "Nói: \"Tôi xin lùi tới thứ Ba tuần sau, tuần này tôi dành cho việc gấp khác.\"", next: "good" },
              { label: "Hứa vẫn giao thứ Sáu và làm sau, hy vọng kịp", next: "bad_promise" },
            ],
          },
          bad_promise: {
            text: "Bạn hứa ngày cũ nhưng lịch không có chỗ. Thứ Năm bạn xin lỗi vì chưa xong, khách A mất niềm tin.",
            ending: "bad",
          },
          good: {
            text: "Khách A đồng ý ngày mới, khách B nhận đúng hạn thứ Ba. Bạn giữ được cả hai khách mà không thức trắng đêm nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI xếp thứ tự, bạn cộng giờ và quyết định cắt gì.",
          "Bài sau: dựng bảng thu chi để cuối quý biết mình thật sự kiếm được bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 2236,
    slug: "freelancer-ghi-thu-chi-va-de-danh-thue-cho-ke-toan",
    title: "Chặng 41, Bài 17: Ghi thu chi hằng tháng để hỏi kế toán đúng câu",
    subtitle: "Sổ thu chi giống cuốn sổ ghi tiền chợ: không ghi thì cuối tháng chẳng nhớ tiền đi đâu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Freelancer nhận tiền từ nhiều khách, nhiều lần, nên cuối quý rất khó nhớ mình đã thu bao nhiêu. Một bảng thu chi gọn giúp bạn biết thu nhập thật và chuẩn bị đúng câu hỏi cho kế toán, thay vì nhờ AI tính thuế rồi tin luôn con số.",
    openingQuestion:
      "Cuối quý bạn không nhớ đã nhận bao nhiêu tiền từ các khách. Bạn định nhờ AI tính luôn thuế phải nộp. Việc nào nên giao cho AI ở đây?",
    openingOptions: [
      "Dựng bảng thu chi và soạn danh sách câu hỏi cho kế toán",
      "Tính số thuế phải nộp rồi bạn nộp đúng số đó",
      "Quyết định khoản chi nào được trừ khi tính thuế",
      "Chọn cách kê khai có lợi nhất để nộp ít thuế nhất trong mọi cách hợp lệ",
    ],
    correctOption: 0,
    explanation:
      "AI làm tốt việc sắp xếp bảng và gợi ý câu hỏi, nhưng số thuế phải nộp phụ thuộc quy định hiện hành và hoàn cảnh riêng của bạn, thứ AI có thể nhớ lỗi thời hoặc bịa ra. Khoản chi nào được trừ và cách kê khai là câu hỏi cho kế toán hoặc cơ quan thuế. Vai trò đúng của AI là giúp bạn tới buổi hỏi với số liệu gọn và câu hỏi rõ ràng.",
    diagram: [
      { label: "Ghi mỗi khoản thu và chi vào một bảng", arrow: true },
      { label: "AI gom theo tháng, dựng danh sách câu hỏi", arrow: true },
      { label: "Bạn đối chiếu với sao kê và hoá đơn", arrow: true },
      { label: "Hỏi kế toán, họ quyết định phần thuế" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một freelancer viết nội dung ghi lại mỗi khoản nhận từ khách vào một bảng: ngày, khách, số tiền, đã nhận chưa. Cuối quý bạn nhờ AI gom theo tháng và soạn ba câu hỏi cho kế toán về khoản nào được tính là chi phí. Nhờ có bảng, buổi gặp kế toán mất 20 phút thay vì hai giờ lục sao kê.",
    },
    quiz: [
      Q(
        "Bạn nên nhờ AI làm gì với bảng thu chi của mình?",
        [
          "Gom theo tháng và soạn câu hỏi cho kế toán",
          "Kết luận số thuế bạn phải nộp quý này",
          "Quyết định khoản chi nào được trừ khỏi thu nhập tính thuế",
          "Thay bạn đối chiếu với sao kê ngân hàng rồi coi như đúng",
        ],
        "AI sắp xếp và gợi ý câu hỏi rất tốt. Số thuế phải nộp, khoản chi được trừ là quy định và hoàn cảnh riêng, kế toán hoặc cơ quan thuế mới chốt. Đối chiếu sao kê là việc của bạn vì AI không thấy tài khoản thật."
      ),
      Q(
        "Một dòng thu ghi 12 triệu từ khách X, nhưng sao kê chỉ thấy 10 triệu. Điều đúng là gì?",
        [
          "Tìm hiểu lý do lệch trước khi dùng dòng đó",
          "Giữ 12 triệu vì đó là số hợp đồng ghi",
          "Ghi lại thành 10 triệu và bỏ qua khoản 2 triệu còn lại",
          "Nhờ AI chọn số nào hợp lý hơn giữa hai số này",
        ],
        "Chênh 2 triệu có thể do phí, chưa thanh toán hết hoặc ghi nhầm, nên phải tìm nguyên nhân. Giữ số hợp đồng làm bảng thu vượt tiền thật. Bỏ qua 2 triệu che mất khoản khách còn nợ, và AI không biết số nào đúng nếu không có sao kê."
      ),
      Q(
        "Vì sao bảng thu chi nên ghi cả chi phí cố định như phần mềm và điện thoại?",
        [
          "Vì thu nhập thật là phần còn lại sau khi trừ những chi phí này",
          "Vì kế toán chỉ nhận bảng có ghi chi phí cố định",
          "Vì AI cần chi phí cố định để tự tính thuế thay cho bạn và cả kế toán sau này",
          "Vì chi phí cố định làm thu nhập nhìn ít đi và đỡ bị hỏi",
        ],
        "Tiền khách trả chưa phải tiền bạn giữ được: phần mềm, điện thoại, chỗ làm việc đều lấy đi một phần. Ghi chúng để biết thu nhập thật. Lý do không phải yêu cầu của kế toán, việc để AI tự tính thuế, hay chuyện làm thu nhập trông ít đi."
      ),
      Q(
        "Thu tháng 1 là 18 triệu, thu tháng 2 là 24 triệu, chi phí cố định 3 triệu mỗi tháng. Phần còn lại của hai tháng là bao nhiêu?",
        [
          "36 triệu (= 42 − 6)",
          "39 triệu (= 42 − 3, trừ một lần)",
          "42 triệu (= 18 + 24, quên trừ)",
          "18 triệu (= 24 − 3 − 3)",
        ],
        "Tổng thu là 18 + 24 = 42 triệu, chi phí cố định hai tháng là 3 × 2 = 6 triệu, còn lại 42 − 6 = 36 triệu. Chỉ trừ một lần cho 39, quên trừ cho 42, và bỏ tháng 1 cho 18."
      ),
      Q(
        "Trước khi gặp kế toán, danh sách câu hỏi nào có ích nhất?",
        [
          "Khoản này bạn dùng vừa cho việc vừa cho riêng, tính chi phí thế nào?",
          "Bạn cứ tính giùm tôi nộp bao nhiêu là được, tôi tin bạn hoàn toàn, khỏi cần giải thích",
          "Có cách nào khai ít đi mà không ai biết không?",
          "Tôi không cần ghi hoá đơn đúng không, vì tôi làm tự do?",
        ],
        "Câu hỏi tốt nêu tình huống cụ thể mà kế toán mới chốt được, như khoản dùng chung. Câu giao hết cho người khác thì không chuẩn bị gì, còn hai câu cuối hỏi cách né và giả định sai. Kế toán trả lời tốt khi bạn có số và hoàn cảnh rõ."
      ),
      Q(
        "AI ghi trong bảng \"khoản này được trừ thuế theo điều luật số 5\". Nên xử lý thế nào?",
        [
          "Coi đó là câu hỏi và hỏi kế toán, vì AI có thể nhớ sai quy định",
          "Tin luôn vì AI có ghi số điều luật cụ thể",
          "Ghi điều luật đó vào tờ khai vì nó trông rất chính xác và có số điều rõ ràng",
          "Xoá con số điều luật và giữ lại kết luận được trừ thuế",
        ],
        "Số điều luật do AI nêu có thể bịa hoặc lỗi thời dù trông chuẩn xác. Chỉ nên coi là gợi ý để hỏi kế toán. Đưa vào tờ khai thì rủi ro cho bạn, còn xoá số điều luật mà giữ kết luận thì vẫn dựa trên điều chưa kiểm chứng."
      ),
    ],
    keyTakeaways: [
      "Ghi mỗi khoản thu và chi ngay khi phát sinh: ngày, khách, số tiền, đã nhận chưa.",
      "Thu nhập thật là thu trừ chi phí, gồm cả chi phí cố định.",
      "AI gom bảng và soạn câu hỏi; không nhờ AI tính thuế hay quyết định khoản được trừ.",
      "Đối chiếu bảng với sao kê rồi mới đem đi hỏi kế toán.",
    ],
    practicePrompt: {
      question:
        "AI trả lời: \"Với thu nhập quý này, bạn sẽ nộp khoảng 4 triệu thuế.\" Bạn chưa cho nó biết chi phí. Cách xử lý đúng là gì?",
      options: [
        "Coi đó là phỏng đoán và hỏi kế toán con số thật",
        "Để dành 4 triệu và coi như xong phần thuế quý này",
        "Nhờ AI tính lại với con số thấp hơn cho đỡ lo",
        "Bỏ qua, vì thuế nhỏ nên không cần ghi thu chi",
      ],
      correct: 0,
      explanation:
        "AI chưa biết chi phí và quy định áp dụng cho bạn, nên 4 triệu chỉ là con số nghe hợp lý. Để dành theo số đó có thể thiếu hoặc thừa, tính lại thấp hơn là chọn số theo ý muốn, còn bỏ ghi thu chi thì mất căn cứ để hỏi kế toán.",
    },
    summary: {
      keyIdea: "Bảng thu chi cho bạn biết thu nhập thật; kế toán mới là người trả lời về thuế.",
      formula: "Thu nhập thật = tổng thu − chi phí cố định − chi phí phát sinh.",
      commonMistake: "Nhờ AI tính thuế rồi nộp theo con số nghe có vẻ chắc chắn.",
      action: "Ghi mọi khoản thu, chi của tháng này vào một bảng và đối chiếu sao kê.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở sao kê tháng vừa rồi của bạn. Ghi các khoản thu và chi vào bảng có cột ngày, khách hoặc mục chi, số tiền, đã nhận chưa. Nhờ AI gom theo tuần và soạn ba câu hỏi cho kế toán. Chỉ đưa số cần thiết, che số tài khoản.",
      secondary: "Gạch chân mọi con số AI thêm mà không có trong sao kê của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối quý, bạn mở điện thoại tìm xem khách nào đã trả tiền chưa. Bài này dạy cách dựng bảng thu chi và tận dụng AI để chuẩn bị câu hỏi, không để AI tính thuế thay kế toán.",
      },
      {
        type: "feynman",
        title: "Bảng thu chi đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới cuốn sổ ghi tiền chợ của mẹ: ghi mỗi khoản mua thì cuối tháng biết tiền đi đâu, không ghi thì chỉ nhớ mang máng.",
        columns: ["Thành phần", "Sổ ghi tiền chợ", "Bảng thu chi của freelancer"],
        rows: [
          ["Ghi cái gì", "Mỗi lần mua thứ gì, giá bao nhiêu", "Mỗi lần thu tiền từ khách, mỗi khoản chi"],
          ["Cuối tháng", "Cộng xem chi bao nhiêu", "Cộng thu, trừ chi để thấy thu nhập thật"],
          ["Khi nghi ngờ", "Hỏi lại chủ quán", "Đối chiếu sao kê ngân hàng"],
          ["Người giúp", "Hàng xóm gợi ý cách tiết kiệm", "AI gom bảng; kế toán trả lời về thuế"],
        ],
        oneLiner: "Bảng thu chi là cuốn sổ chợ của công việc: ghi đều thì cuối quý biết mình kiếm được bao nhiêu.",
      },
      { type: "heading", text: "Vấn đề: thu nhập nhìn to nhưng giữ lại thì nhỏ" },
      {
        type: "paragraph",
        text: "Khách trả tiền nhiều đợt, một số đợt chậm, còn chi phí như phần mềm và điện thoại thì đều đặn mỗi tháng. Nếu không ghi, bạn dễ nghĩ tháng nào cũng khá trong khi phần giữ lại rất mỏng.",
      },
      {
        type: "chart",
        title: "Thu nhập theo tháng và chi phí cố định",
        caption: "Số liệu minh hoạ của một freelancer giả định, đơn vị triệu đồng. Không dùng làm mốc so sánh thu nhập thật.",
        kind: "bar",
        xLabel: "Tháng",
        yLabel: "Triệu đồng",
        data: [
          { label: "Tháng 1", values: [18, 3] },
          { label: "Tháng 2", values: [24, 3] },
          { label: "Tháng 3", values: [12, 3] },
          { label: "Tháng 4", values: [21, 3] },
        ],
        seriesLabels: ["Thu từ khách", "Chi phí cố định"],
      },
      {
        type: "paragraph",
        text: "Tháng 3 thu thấp nhưng chi phí cố định vẫn 3 triệu. Nhìn cả bốn tháng cạnh nhau, bạn thấy thu nhập lên xuống mạnh còn chi phí thì đều, nên cần chừa một khoản dự phòng.",
      },
      {
        type: "flow",
        title: "Từ sao kê đến buổi hỏi kế toán",
        steps: [
          { label: "Ghi từng khoản", detail: "Mỗi khoản thu hoặc chi một dòng: ngày, khách hoặc mục chi, số tiền, đã nhận hay chưa." },
          { label: "Đối chiếu sao kê", detail: "So từng dòng với sao kê ngân hàng. Dòng nào lệch thì tìm lý do trước khi làm tiếp." },
          { label: "Nhờ AI gom bảng", detail: "Nhờ AI cộng theo tháng, tìm dòng thiếu thông tin và soạn danh sách câu hỏi cho kế toán." },
          { label: "Bạn kiểm số", detail: "Cộng lại vài tháng bằng tay hoặc bảng tính để chắc AI không thêm hay bớt con số." },
          { label: "Hỏi kế toán", detail: "Mang bảng và câu hỏi tới hỏi. Họ trả lời về khoản được trừ và cách kê khai." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giao cho AI",
          text: "Gom thu chi theo tháng, gợi ý cột còn thiếu, tìm dòng chưa có ngày, soạn danh sách câu hỏi để hỏi kế toán.",
        },
        right: {
          label: "Không giao cho AI",
          text: "Tính số thuế phải nộp, kết luận khoản nào được trừ, chọn cách kê khai. Hỏi bộ phận kế toán hoặc chuyên gia thuế.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt thu chi do AI viết",
        task: "Bảng của bạn có: tháng 1 thu 18 triệu, tháng 2 thu 24 triệu, chi phí cố định 3 triệu mỗi tháng, khách Y còn nợ 6 triệu chưa trả. Đánh dấu các đoạn AI tự thêm.",
        segments: [
          { text: "Hai tháng đầu quý bạn thu tổng cộng 42 triệu đồng." },
          { text: "Chi phí cố định mỗi tháng là 3 triệu đồng." },
          { text: "Khách Y còn nợ 6 triệu chưa thanh toán." },
          {
            text: "Bạn sẽ phải nộp thuế 5 triệu đồng cho quý này.",
            error: "Bảng không có thông tin nào để tính thuế; con số 5 triệu là AI bịa. Thuế phải hỏi kế toán.",
          },
          {
            text: "Khoản phần mềm 1,2 triệu chắc chắn được trừ khi tính thuế theo quy định hiện hành.",
            error: "AI khẳng định khoản được trừ mà không có cơ sở. Đây là câu hỏi cho kế toán, không phải kết luận.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: che thông tin nhạy cảm trước khi dán",
        text: "Số tài khoản, mã số thuế và tên đầy đủ của khách không cần thiết cho việc gom bảng. Thay bằng ký hiệu như khách A, khách B, và chỉ dán những dòng cần thiết.",
      },
      {
        type: "scenario",
        title: "Cuối quý, bảng thu chi chưa khớp sao kê",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng của bạn ghi thu 60 triệu nhưng sao kê chỉ thấy 54 triệu. Kế toán hẹn gặp ngày mai.",
            choices: [
              { label: "Mang bảng 60 triệu tới vì đó là số hợp đồng", next: "bad_gap" },
              { label: "Tìm dòng lệch 6 triệu trước, tối nay", next: "s2" },
            ],
          },
          bad_gap: {
            text: "Kế toán đối chiếu sao kê và thấy lệch 6 triệu. Buổi gặp mất thời gian tìm nguyên nhân thay vì trả lời câu hỏi của bạn.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy khách Y còn nợ đúng 6 triệu chưa chuyển. Bạn đã ghi là đã nhận.",
            choices: [
              { label: "Sửa dòng đó thành chưa nhận, ghi ngày hẹn trả và mang bảng đã sửa", next: "good" },
              { label: "Xoá dòng đó khỏi bảng cho khớp sao kê", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Bảng khớp sao kê nhưng bạn quên rằng khách Y còn nợ. Ba tuần sau bạn không nhớ để nhắc.",
            ending: "bad",
          },
          good: {
            text: "Bảng khớp sao kê và ghi rõ khoản còn nợ. Buổi gặp kế toán tập trung vào ba câu hỏi bạn chuẩn bị.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghi đều, đối chiếu sao kê, để AI gom bảng còn kế toán trả lời về thuế.",
          "Bài sau: báo khách khi bạn quá tải mà không mất uy tín.",
        ],
      },
    ],
  },
  {
    id: 2237,
    slug: "freelancer-thoi-gian-nghi-va-bao-khach-khi-qua-tai",
    title: "Chặng 41, Bài 18: Báo khách khi quá tải mà không mất uy tín",
    subtitle: "Báo lùi hạn giống báo hoãn chuyến xe: nói sớm, kèm giờ mới thì khách còn kịp sắp xếp.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⏳",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quá tải là chuyện của mọi freelancer. Điều làm mất khách không phải việc trễ mà là báo trễ vào phút chót, không có phương án. Một tin nhắn báo sớm, rõ ràng và có ngày mới bạn chắc chắn làm được giữ lại niềm tin lâu hơn một lời hứa vội.",
    openingQuestion:
      "Bạn nhận quá nhiều việc và chắc chắn trễ một dự án. Bạn nhờ AI soạn tin báo khách. Điều gì làm tin nhắn đó giữ được uy tín?",
    openingOptions: [
      "Báo sớm, nêu lý do ngắn và đưa ngày mới bạn chắc làm được",
      "Xin lỗi thật nhiều và hứa sẽ không bao giờ tái phạm",
      "Đưa ngày mới sớm nhất có thể để khách thấy bạn nỗ lực",
      "Để AI viết cho thật cảm động rồi gửi một lần sát ngày hạn",
    ],
    correctOption: 0,
    explanation:
      "Khách cần biết sớm để sắp xếp và cần một ngày mới đáng tin. Xin lỗi nhiều và hứa không tái phạm tốn chữ mà không cho khách thông tin. Ngày mới quá sớm mà bạn chưa chắc làm được sẽ dẫn tới lần trễ thứ hai, còn gửi sát hạn làm mất cơ hội cho khách xoay sở. Ngày mới phải được kiểm với lịch tuần của bạn trước khi hứa.",
    diagram: [
      { label: "Nhận ra sẽ trễ, báo ngay khi biết", arrow: true },
      { label: "AI soạn tin nêu lý do ngắn, ngày mới, phương án", arrow: true },
      { label: "Bạn kiểm ngày mới với lịch tuần thật", arrow: true },
      { label: "Gửi khách và ghi lại để theo dõi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một bạn dựng video nhận ba dự án cùng tuần. Đến thứ Hai, bạn thấy chắc chắn trễ dự án cuối tuần. Bạn nhờ AI soạn tin báo khách với hai phương án: giao bản thô đúng hạn hoặc bản hoàn chỉnh sau hai ngày. Bạn kiểm lịch trước khi gửi, khách chọn bản hoàn chỉnh và vẫn tiếp tục hợp tác.",
    },
    quiz: [
      Q(
        "Khi biết sẽ trễ hạn, thời điểm nào là tốt nhất để báo khách?",
        [
          "Ngay khi bạn nhận ra, kể cả khi còn nhiều ngày",
          "Vào đúng ngày hạn, để khách khỏi lo sớm",
          "Sau khi làm xong, đưa kèm bản hoàn chỉnh",
          "Chờ khách hỏi tiến độ rồi mới trả lời",
        ],
        "Báo càng sớm khách càng có thời gian sắp xếp. Chờ tới hạn hoặc chờ khách hỏi biến chuyện trễ thành chuyện thiếu trung thực. Giao xong mới báo thì khách đã lỡ kế hoạch của họ."
      ),
      Q(
        "Tin nhắn báo lùi hạn nên có những gì?",
        [
          "Lý do ngắn, ngày mới chắc chắn và phương án cho khách",
          "Lời xin lỗi dài, lý do kể chi tiết và lời hứa không tái phạm",
          "Một câu ngắn báo trễ, còn lại để khách tự hỏi thêm",
          "Ngày mới sớm nhất bạn có thể mong, kèm giảm giá dịch vụ",
        ],
        "Khách cần ba thứ: vì sao, khi nào và làm gì trong lúc chờ. Xin lỗi quá dài không thêm thông tin, một câu cộc lốc khiến khách lo, còn ngày mới sớm nhất và giảm giá đều là cam kết bạn chưa kiểm được."
      ),
      Q(
        "AI soạn: \"Chúng tôi cam kết giao lúc 9 giờ sáng thứ Sáu.\" Bạn chưa xem lịch. Nên làm gì?",
        [
          "Kiểm lịch tuần rồi mới sửa hoặc giữ ngày đó",
          "Gửi luôn vì AI đã chọn giờ hợp lý",
          "Đổi thành thứ Sáu tuần sau cho chắc rồi gửi",
          "Bỏ giờ cụ thể, chỉ ghi \"sớm nhất có thể\"",
        ],
        "Ngày giờ do AI điền là dữ kiện chưa kiểm, và cam kết sai làm bạn trễ lần hai. Đổi ngẫu nhiên thành tuần sau chưa chắc đúng, còn \"sớm nhất có thể\" khiến khách không có mốc nào để sắp xếp."
      ),
      Q(
        "Bạn hẹn giao thứ Sáu nhưng cần thêm 6 giờ, mỗi ngày làm được 3 giờ cho việc này. Sớm nhất giao sau mấy ngày làm việc?",
        [
          "2 ngày (= 6 ÷ 3)",
          "1 ngày (= 6 ÷ 6, nhầm giờ mỗi ngày)",
          "3 ngày (= 6 ÷ 3 + 1)",
          "18 ngày (= 6 × 3)",
        ],
        "6 giờ chia cho 3 giờ mỗi ngày là 2 ngày làm việc. Chia nhầm cho 6 ra 1 ngày, tự cộng một ngày ra 3, nhân thay vì chia ra 18. Tính đúng giúp bạn hứa ngày mới mà làm được."
      ),
      Q(
        "Phương án nào thể hiện bạn tôn trọng khách khi báo lùi?",
        [
          "Đưa hai lựa chọn: giao bản thô đúng hạn hoặc bản đủ sau hai ngày",
          "Chỉ báo trễ và để khách tự tìm cách xoay xở",
          "Nói là vì khách gửi tài liệu muộn, dù chưa chắc đúng",
          "Giảm chất lượng bản giao cho kịp mà không báo khách",
        ],
        "Cho khách hai lựa chọn giúp họ giữ quyền quyết định theo nhu cầu riêng. Đổ lỗi khi chưa chắc, im lặng về việc giảm chất lượng, hay bỏ mặc khách đều làm mất niềm tin."
      ),
      Q(
        "Sau khi gửi tin báo lùi, việc nào nên làm tiếp?",
        [
          "Ghi ngày mới vào lịch và bảo vệ thời gian đó",
          "Nhận thêm việc mới vì đã có thêm hai ngày",
          "Chờ khách phản hồi rồi mới quyết định làm hay không",
          "Nhờ AI nhắc khách mỗi ngày cho tới hạn mới",
        ],
        "Ngày mới chỉ có ý nghĩa khi lịch của bạn giữ chỗ cho nó. Nhận việc mới lấp mất thời gian đó, chờ phản hồi làm chậm thêm, và nhắc khách hằng ngày gây phiền mà không giúp bạn xong việc."
      ),
    ],
    keyTakeaways: [
      "Báo lùi ngay khi nhận ra, đừng chờ tới hạn.",
      "Tin nhắn gồm lý do ngắn, ngày mới chắc chắn và phương án cho khách.",
      "AI soạn chữ, bạn kiểm ngày mới với lịch tuần thật.",
      "Giữ chỗ cho ngày mới trong lịch, đừng nhận thêm việc chen vào.",
    ],
    practicePrompt: {
      question:
        "AI soạn tin báo khách với ngày mới là thứ Hai. Lịch của bạn thứ Hai đã kín. Bạn làm gì?",
      options: [
        "Đổi sang ngày còn chỗ trong lịch rồi mới gửi",
        "Gửi luôn ngày thứ Hai và làm thêm cuối tuần",
        "Xoá ngày cụ thể, ghi khoảng đầu tuần sau",
        "Nhờ AI xếp lại lịch để thứ Hai có chỗ, không cắt gì",
      ],
      correct: 0,
      explanation:
        "Ngày hứa phải dựa trên chỗ trống thật. Hứa thứ Hai rồi làm bù cuối tuần chỉ dồn áp lực, khoảng \"đầu tuần\" mơ hồ, và nhờ AI xếp lại mà không cắt việc chỉ tạo một lịch đẹp không khả thi.",
    },
    summary: {
      keyIdea: "Uy tín đến từ việc báo sớm và giữ đúng ngày mới, không phải từ việc không bao giờ trễ.",
      formula: "Tin báo tốt = lý do ngắn + ngày mới đã kiểm + phương án cho khách.",
      commonMistake: "Hứa ngày mới do AI chọn mà chưa kiểm lịch, rồi trễ lần hai.",
      action: "Soạn sẵn một mẫu tin báo lùi hạn để dùng khi cần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ một dự án thật bạn từng trễ hoặc sắp trễ. Nhờ AI soạn tin báo khách với lý do ngắn, ngày mới và một phương án. Sau đó mở lịch tuần của bạn, kiểm ngày mới có chỗ trống thật không, sửa nếu cần rồi lưu thành mẫu.",
      secondary: "Ngày mai kiểm: bạn đã giữ chỗ cho ngày mới trong lịch chưa?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn tính lại giờ và nhận ra chắc chắn trễ một dự án. Bài này dạy cách báo khách sớm, rõ, và cách kiểm ngày mới trước khi hứa.",
      },
      {
        type: "feynman",
        title: "Báo lùi hạn đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc báo hoãn chuyến xe: hãng báo sớm và cho giờ mới thì khách còn đổi kế hoạch được, báo sát giờ thì khách kẹt giữa đường.",
        columns: ["Thành phần", "Hoãn chuyến xe", "Báo lùi hạn dự án"],
        rows: [
          ["Khi nào báo", "Ngay khi biết xe hỏng", "Ngay khi nhận ra sẽ trễ"],
          ["Nói gì", "Vì sao hoãn, giờ khởi hành mới", "Lý do ngắn, ngày mới, phương án"],
          ["Điều khách cần", "Biết để đổi kế hoạch", "Biết để sắp xếp công việc của họ"],
          ["Người giúp", "Nhân viên soạn thông báo", "AI soạn chữ; bạn kiểm ngày mới"],
        ],
        oneLiner: "Báo sớm kèm giờ mới đáng tin thì khách thông cảm; báo sát hạn không có phương án thì khách mất niềm tin.",
      },
      { type: "heading", text: "Vấn đề: sợ nói nên nói muộn" },
      {
        type: "paragraph",
        text: "Nhiều freelancer im lặng vì ngại khách phật ý, rồi báo vào phút chót. Lúc đó khách hết thời gian xoay xở, và chuyện trễ trở thành chuyện mất tin. AI giúp bạn soạn tin nhanh, nên không còn lý do trì hoãn.",
      },
      {
        type: "flow",
        title: "Từ lúc nhận ra trễ đến tin nhắn gửi khách",
        steps: [
          { label: "Nhận ra sẽ trễ", detail: "Cộng lại giờ còn lại của dự án và so với thời gian còn tới hạn. Thấy thiếu thì báo ngay hôm đó." },
          { label: "Nhờ AI soạn", detail: "Đưa AI dự án, hạn cũ, lý do thật và hai phương án. Yêu cầu tin ngắn, lịch sự, không hứa ngày nào." },
          { label: "Kiểm ngày mới", detail: "Bạn mở lịch tuần, tìm ngày còn chỗ trống thật rồi điền vào tin." },
          { label: "Gửi khách", detail: "Gửi kèm phương án để khách chọn. Không kể lể dài dòng hay đổ lỗi." },
          { label: "Giữ chỗ trong lịch", detail: "Ghi ngày mới vào lịch, tránh nhận thêm việc chen vào thời gian đó." },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1: viết lý do thật trong một câu, không thêm chi tiết bịa.",
          "Bước 2: đưa hai phương án, ví dụ bản thô đúng hạn hoặc bản đủ trễ hai ngày.",
          "Bước 3: tự điền ngày mới sau khi xem lịch, đừng để AI điền.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin báo khách lùi hạn hai ngày",
        task: "Dự án video cho khách Hoa Sen hẹn giao thứ Sáu nhưng bạn cần thêm 6 giờ. Lắp một prompt để AI soạn tin.",
        parts: [
          {
            id: "boi",
            label: "Bối cảnh",
            options: [
              { text: "Soạn tin nhắn xin lỗi khách vì trễ.", feedback: "AI không biết dự án nào, trễ bao lâu. Nó sẽ tự bịa lý do và ngày." },
              { text: "Khách Hoa Sen, dự án video giới thiệu, hạn thứ Sáu. Tôi cần thêm 6 giờ, làm được 3 giờ mỗi ngày.", good: true, feedback: "Đủ khách, dự án, hạn và giờ còn thiếu. AI dựa vào đó viết đúng tình huống." },
            ],
          },
          {
            id: "ngay",
            label: "Ngày mới",
            options: [
              { text: "Hãy chọn ngày mới hợp lý nhất cho khách.", feedback: "AI không biết lịch của bạn, nên ngày nó chọn chỉ là đoán." },
              { text: "Để trống ngày mới trong tin, tôi sẽ tự điền sau khi kiểm lịch.", good: true, feedback: "Bạn giữ quyền chốt ngày, và ngày hứa sẽ dựa trên lịch thật." },
            ],
          },
          {
            id: "giong",
            label: "Giọng và phương án",
            options: [
              { text: "Viết thật cảm động để khách thương.", feedback: "Cảm xúc quá mức làm tin dài và khó tin, khách cần thông tin." },
              { text: "Giọng lịch sự, ngắn dưới 100 chữ, đưa hai phương án: bản thô đúng hạn hoặc bản đủ sau hai ngày.", good: true, feedback: "Ngắn, rõ, có lựa chọn. Khách quyết định dễ mà vẫn thấy được tôn trọng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["boi", "ngay", "giong"],
            text: "Chào chị, em xin báo sớm: video giới thiệu cần thêm khoảng 6 giờ hoàn thiện nên sẽ không kịp thứ Sáu. Em đề xuất hai cách: (1) giao bản thô đúng thứ Sáu để chị xem trước; (2) giao bản hoàn chỉnh vào [ngày mới, em điền sau khi kiểm lịch]. Chị chọn cách nào tiện hơn ạ?",
          },
          {
            requires: ["boi"],
            text: "Chào chị, em xin lỗi vì dự án trễ. Em hứa sẽ giao vào thứ Ba tuần sau, chắc chắn không có gì thay đổi nữa ạ.\n(Có đủ dữ kiện nhưng AI tự điền ngày thứ Ba và cam kết chắc chắn khi bạn chưa kiểm lịch.)",
          },
          {
            text: "Chào chị Hoa, do một vấn đề kỹ thuật với máy quay và khách trước phản hồi chậm, video sẽ giao vào 10/10 kèm chỉnh sửa miễn phí ạ.\n(AI bịa lý do và ngày, còn hứa sửa miễn phí chưa ai đồng ý.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: đừng để AI bịa lý do",
        text: "AI hay thêm lý do nghe hợp lý như trục trặc kỹ thuật hoặc khách gửi tài liệu muộn. Nếu không đúng, khách kiểm ra sẽ mất tin. Chỉ giữ lý do thật, và cắt phần nào bạn không chắc.",
      },
      {
        type: "scenario",
        title: "Thứ Tư, bạn biết chắc sẽ trễ dự án hạn thứ Sáu",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Tư, bạn tính ra còn thiếu 6 giờ so với hạn thứ Sáu. Khách chưa biết gì.",
            choices: [
              { label: "Im lặng, cố làm hết và xin lỗi nếu trễ", next: "bad_silent" },
              { label: "Soạn tin báo khách ngay hôm nay bằng AI", next: "s2" },
            ],
          },
          bad_silent: {
            text: "Thứ Sáu bạn vẫn chưa xong. Bạn báo lúc 4 giờ chiều, khách đã hứa bản giao cho sếp của họ.",
            ending: "bad",
          },
          s2: {
            text: "AI soạn xong tin, ngày mới ghi là thứ Hai. Lịch của bạn thứ Hai kín một việc khác.",
            choices: [
              { label: "Đổi sang ngày còn trống trong lịch rồi gửi kèm hai phương án", next: "good" },
              { label: "Gửi luôn thứ Hai, làm thêm cuối tuần cho kịp", next: "bad_weekend" },
            ],
          },
          bad_weekend: {
            text: "Bạn kiệt sức, giao thứ Hai vẫn sai sót và bản đầu bị khách trả lại. Ngày mới hứa lại trượt.",
            ending: "bad",
          },
          good: {
            text: "Khách chọn bản hoàn chỉnh sau hai ngày. Bạn giữ được ngày đó trong lịch và giao đúng hẹn mới.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Báo sớm, ngày mới đã kiểm, có phương án cho khách.",
          "Bài sau: dùng AI khi làm cho khách mà vẫn giữ bí mật của họ.",
        ],
      },
    ],
  },
  {
    id: 2238,
    slug: "freelancer-kiem-soat-cong-cu-ai-khi-lam-cho-khach",
    title: "Chặng 41, Bài 19: Dùng AI khi làm cho khách: hỏi khách và giữ bí mật",
    subtitle: "Tài liệu của khách như chìa khoá nhà hàng xóm gửi bạn giữ: chưa được phép thì không đưa cho ai khác.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi làm cho khách, tài liệu chưa công bố không thuộc về bạn. Dán nó vào công cụ AI là gửi ra ngoài, có thể vi phạm thoả thuận. Biết hỏi khách, che thông tin nhạy cảm và nói rõ công đoạn dùng AI giúp bạn giữ được khách và tránh rắc rối.",
    openingQuestion:
      "Khách gửi bản thảo sản phẩm chưa ra mắt và nhờ bạn biên tập. Bạn muốn dùng AI cho nhanh. Bước đầu tiên đúng là gì?",
    openingOptions: [
      "Hỏi khách xem hợp đồng có cho phép dùng công cụ AI không",
      "Dán bản thảo vào AI trước, để khách biết sau khi giao",
      "Tắt lịch sử trò chuyện rồi dán, vì như vậy là đủ an toàn",
      "Chỉ dán một nửa bản thảo, vì nửa còn lại vẫn được giữ kín",
    ],
    correctOption: 0,
    explanation:
      "Bản thảo chưa công bố có thể bị ràng buộc bởi điều khoản bảo mật hoặc thoả thuận với khách. Người quyết định có được đưa vào công cụ AI hay không là khách, hoặc điều khoản trong hợp đồng, không phải bạn. Dán trước rồi báo sau là đã lỡ gửi ra ngoài. Tắt lịch sử hay chia đôi nội dung không thay đổi việc thông tin nhạy cảm vẫn rời khỏi máy bạn.",
    diagram: [
      { label: "Đọc điều khoản bảo mật và hỏi khách", arrow: true },
      { label: "Ẩn tên, số, chi tiết nhạy cảm khỏi tài liệu", arrow: true },
      { label: "Dùng AI cho công đoạn được phép", arrow: true },
      { label: "Ghi rõ với khách công đoạn nào có dùng AI" },
    ],
    realWorldExample: {
      company: "Samsung (2023)",
      description:
        "Năm 2023, nhân viên Samsung dán mã nguồn nội bộ vào ChatGPT để nhờ sửa lỗi, sau đó công ty hạn chế dùng AI tạo sinh trên thiết bị công ty. Với freelancer, bài học tương tự: thứ bạn dán vào ô chat là một lần gửi dữ liệu ra ngoài, nên với tài liệu của khách phải hỏi trước.",
    },
    quiz: [
      Q(
        "Khách gửi tài liệu chưa công bố. Ai quyết định được dùng AI xử lý nó?",
        [
          "Khách hoặc điều khoản trong hợp đồng với khách",
          "Bạn, vì bạn là người trực tiếp làm việc",
          "Công cụ AI, vì nó có chính sách bảo mật",
          "Không ai, cứ dùng miễn có tắt lịch sử",
        ],
        "Tài liệu thuộc về khách, và thoả thuận giữa hai bên quyết định điều gì được làm với nó. Việc bạn tiện tay dùng không tạo ra quyền. Chính sách của công cụ không thay thế cho sự cho phép của khách, và tắt lịch sử không thay đổi việc nội dung đã rời khỏi máy bạn."
      ),
      Q(
        "Bạn muốn AI giúp viết lại một đoạn nhưng tài liệu có tên người và số liệu nội bộ. Cách hợp lý là gì?",
        [
          "Thay tên và số bằng ký hiệu như A, B, X rồi mới dán",
          "Dán nguyên văn vì AI chỉ đọc và không lưu lại gì, nên không cần ẩn",
          "Dán rồi nhờ AI tự xoá phần nhạy cảm giúp bạn",
          "Dán chỉ số liệu, vì tên người thì không quan trọng",
        ],
        "Thay bằng ký hiệu giữ được cấu trúc đoạn văn mà không đưa thông tin thật ra ngoài. Dán nguyên văn hay nhờ AI xoá sau đều đã gửi dữ liệu đi. Số liệu nội bộ tự nó cũng nhạy cảm, không chỉ tên người."
      ),
      Q(
        "Vì sao nên ghi rõ với khách công đoạn nào có dùng AI?",
        [
          "Để khách biết và quyết định, tránh hiểu lầm về cách làm việc",
          "Để khách giảm giá vì bạn làm ít việc hơn",
          "Vì AI bắt buộc mọi sản phẩm phải ghi nguồn",
          "Vì khách thường sẽ từ chối mọi công việc có AI",
        ],
        "Khách có quyền biết cách sản phẩm của họ được làm, nhất là khi liên quan đến tài liệu của họ. Ghi rõ không tự động là giảm giá, không phải luật của công cụ, và khách nhiều khi đồng ý nếu được nói minh bạch."
      ),
      Q(
        "Hợp đồng ghi \"không tiết lộ nội dung cho bên thứ ba\". Việc nào rủi ro nhất?",
        [
          "Dán nguyên chương trình đề án của khách vào AI",
          "Dùng AI gợi ý tiêu đề dựa trên chủ đề chung của bài",
          "Nhờ AI giải thích một khái niệm chung bạn chưa rõ",
          "Nhờ AI sửa một câu viết của chính bạn, không có số liệu khách",
        ],
        "Nội dung khách chưa công bố mà dán vào AI là đưa cho bên thứ ba, trái với điều khoản. Gợi ý tiêu đề chung, giải thích khái niệm chung hay sửa câu của chính bạn không chứa thông tin của khách nên rủi ro thấp."
      ),
      Q(
        "Bạn chưa chắc hợp đồng có cho dùng AI. Bước nào hợp lý nhất?",
        [
          "Nhắn khách hỏi rõ, và chờ trả lời rồi mới dùng",
          "Dùng thử với một đoạn nhỏ xem khách có biết không",
          "Cho rằng im lặng nghĩa là được phép dùng",
          "Nhờ AI đọc hợp đồng rồi tin kết luận của nó",
        ],
        "Khi chưa chắc thì hỏi khách là cách rẻ nhất. Dùng thử một đoạn nhỏ vẫn là gửi dữ liệu đi, im lặng không phải cho phép, và AI đọc hợp đồng có thể hiểu sai điều khoản nên vẫn phải hỏi người có thẩm quyền."
      ),
    ],
    keyTakeaways: [
      "Tài liệu chưa công bố của khách chỉ đưa vào AI khi khách hoặc hợp đồng cho phép.",
      "Thay tên, số và chi tiết nhạy cảm bằng ký hiệu trước khi dán.",
      "Ghi rõ với khách công đoạn nào có dùng AI.",
      "Chưa chắc thì hỏi khách trước, hỏi pháp chế nếu có tranh chấp về điều khoản.",
    ],
    practicePrompt: {
      question:
        "Khách nhờ bạn tóm tắt báo cáo nội bộ 20 trang. Hợp đồng không nói gì về AI. Cách làm nào hợp lý?",
      options: [
        "Hỏi khách bằng tin nhắn ngắn, được phép mới dùng và ẩn tên riêng",
        "Dán cả báo cáo, vì hợp đồng không cấm nên là được",
        "Tóm tắt từng trang bằng AI rồi giao, không cần nói",
        "Từ chối việc vì mọi việc có tài liệu nội bộ đều rủi ro nên không nhận",
      ],
      correct: 0,
      explanation:
        "Hợp đồng im lặng không có nghĩa là cho phép. Hỏi khách ngắn gọn và ẩn thông tin nhạy cảm cân bằng giữa tốc độ và tôn trọng. Dán cả báo cáo hay giao mà không nói đều bỏ qua khách, còn từ chối hẳn thì bỏ phí việc có thể làm được.",
    },
    summary: {
      keyIdea: "Tài liệu của khách là của khách: hỏi, ẩn, rồi mới dùng AI, và nói rõ với họ.",
      formula: "Được phép + ẩn thông tin nhạy cảm + ghi rõ công đoạn dùng AI.",
      commonMistake: "Dán bản thảo vào AI trước rồi mới nghĩ tới chuyện hỏi khách.",
      action: "Soạn một tin nhắn mẫu hỏi khách về việc dùng AI.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một dự án hiện tại. Đọc lại hợp đồng hoặc tin nhắn với khách, tìm điều khoản về bảo mật. Nhờ AI soạn một tin nhắn ngắn hỏi khách có đồng ý cho dùng AI ở công đoạn nào, rồi liệt kê ba thông tin bạn sẽ thay bằng ký hiệu.",
      secondary: "Nếu hợp đồng có tranh cãi về điều khoản, hỏi bộ phận pháp chế hoặc chuyên gia.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách gửi bản thảo chưa ra mắt và bạn muốn xong sớm. Bài này dạy cách dùng AI mà vẫn giữ bí mật cho khách, và nói rõ với họ điều bạn đã làm.",
      },
      {
        type: "feynman",
        title: "Giữ bí mật cho khách đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới chìa khoá nhà hàng xóm gửi bạn giữ khi đi vắng: bạn không đưa nó cho người sửa ống nước nếu hàng xóm chưa đồng ý.",
        columns: ["Thành phần", "Chìa khoá nhà hàng xóm", "Tài liệu của khách"],
        rows: [
          ["Của ai", "Của hàng xóm", "Của khách"],
          ["Muốn đưa cho người khác", "Phải hỏi hàng xóm", "Phải hỏi khách hoặc xem hợp đồng"],
          ["Cách giảm rủi ro", "Chỉ đưa chìa của khoá cần mở", "Chỉ đưa phần cần thiết, ẩn thông tin nhạy cảm"],
          ["Nói lại", "Báo hàng xóm đã ai vào", "Báo khách công đoạn nào có dùng AI"],
        ],
        oneLiner: "Tài liệu khách gửi bạn giữ như chìa khoá nhà hàng xóm: hỏi trước, đưa ít, và báo lại.",
      },
      { type: "heading", text: "Vấn đề: tiện tay dán rồi mới nghĩ" },
      {
        type: "paragraph",
        text: "Dán vào ô chat rất nhanh và không ai thấy. Nhưng đó là gửi nội dung ra một hệ thống bên ngoài. Với tài liệu khách chưa công bố, khoảnh khắc dán là lúc bạn có thể vi phạm điều khoản mà không hay biết.",
      },
      {
        type: "flow",
        title: "Trước khi đưa tài liệu của khách cho AI",
        steps: [
          { label: "Đọc điều khoản", detail: "Tìm trong hợp đồng hoặc thoả thuận chỗ nói về bảo mật, bên thứ ba, sử dụng công cụ." },
          { label: "Hỏi khách", detail: "Nhắn ngắn: công đoạn nào bạn muốn dùng AI, khách có đồng ý không. Chờ trả lời rõ ràng." },
          { label: "Ẩn thông tin nhạy cảm", detail: "Thay tên người, công ty, số liệu bằng ký hiệu. Chỉ giữ phần cấu trúc AI cần để giúp." },
          { label: "Dùng AI ở công đoạn được phép", detail: "Chỉ làm những việc khách đã đồng ý, ví dụ gợi ý cách diễn đạt hoặc sửa lỗi chính tả." },
          { label: "Ghi rõ với khách", detail: "Khi giao, nói công đoạn nào có dùng AI và bạn đã kiểm lại kết quả." },
        ],
      },
      {
        type: "list",
        items: [
          "Việc 1: ẩn tên và số liệu thật trước khi dán bất cứ thứ gì.",
          "Việc 2: chỉ dán phần cần thiết, không dán cả tài liệu.",
          "Việc 3: ghi lại công đoạn nào bạn dùng AI để báo khách.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn tin hỏi khách về việc dùng AI",
        task: "Khách gửi bản thảo chưa công bố. Bạn muốn dùng AI gợi ý cách diễn đạt. Lắp một prompt để AI soạn tin hỏi khách.",
        parts: [
          {
            id: "ngu",
            label: "Bối cảnh",
            options: [
              { text: "Soạn tin nhắn cho khách.", feedback: "AI không biết bạn hỏi điều gì, nên viết chung chung." },
              { text: "Tôi biên tập bản thảo chưa công bố cho khách. Tôi muốn dùng AI gợi ý cách diễn đạt và cần hỏi khách có đồng ý không.", good: true, feedback: "Nói rõ việc, tài liệu chưa công bố, và mục tiêu là xin phép." },
            ],
          },
          {
            id: "gioi",
            label: "Giới hạn",
            options: [
              { text: "Nói với khách là tôi sẽ dán cả bản thảo vào AI.", feedback: "Dán cả bản thảo là rủi ro cao. Tin nhắn nên nêu phần nhỏ và đã ẩn thông tin." },
              { text: "Nói tôi chỉ dùng cho đoạn đã thay tên và số bằng ký hiệu, và giữ nguyên nội dung của khách.", good: true, feedback: "Giới hạn rõ, khách yên tâm vì thông tin nhạy cảm không rời khỏi máy bạn." },
            ],
          },
          {
            id: "giong",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết dài để khách thấy tôi chuyên nghiệp.", feedback: "Tin dài dễ bị bỏ qua, khách cần câu hỏi rõ để trả lời có hoặc không." },
              { text: "Lịch sự, dưới 80 chữ, kết thúc bằng câu hỏi có hoặc không.", good: true, feedback: "Ngắn và có câu hỏi rõ, khách trả lời nhanh." },
            ],
          },
        ],
        responses: [
          {
            requires: ["ngu", "gioi", "giong"],
            text: "Chào anh/chị, em đang biên tập bản thảo và muốn dùng công cụ AI để gợi ý cách diễn đạt. Em chỉ dùng cho các đoạn đã thay tên và số liệu bằng ký hiệu, không dán nguyên bản thảo. Anh/chị có đồng ý cho em làm cách này không ạ?",
          },
          {
            requires: ["ngu"],
            text: "Chào anh/chị, em xin phép dùng AI hỗ trợ biên tập. Em sẽ đưa toàn bộ bản thảo vào để có kết quả tốt nhất, mong anh/chị đồng ý ạ.\n(Có xin phép nhưng nói dán toàn bộ bản thảo, làm khách lo.)",
          },
          {
            text: "Chào anh/chị, em đã dùng AI theo tiêu chuẩn bảo mật cao nhất, mọi dữ liệu đều được mã hoá và không ai đọc được.\n(AI tự khẳng định bảo mật mà bạn chưa kiểm, đúng kiểu khẳng định sai không nên gửi khách.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: đừng cam kết thay nhà cung cấp AI",
        text: "Đừng nói với khách rằng dữ liệu tuyệt đối an toàn khi chưa đọc chính sách của công cụ. Nói điều bạn tự làm được: ẩn thông tin, chỉ dán phần nhỏ, và kiểm lại kết quả.",
      },
      {
        type: "scenario",
        title: "Khách gửi bản thảo chưa công bố",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách gửi bản thảo 15 trang chưa công bố, nhờ biên tập trong hai ngày. Hợp đồng có điều khoản bảo mật.",
            choices: [
              { label: "Dán cả bản thảo vào AI để làm cho nhanh", next: "bad_paste" },
              { label: "Nhắn khách hỏi có được dùng AI không, chờ trả lời", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bạn xong sớm, nhưng khách phát hiện bản thảo đã đưa cho bên thứ ba. Họ nêu điều khoản bảo mật và chấm dứt hợp tác.",
            ending: "bad",
          },
          s2: {
            text: "Khách trả lời: \"Được, nhưng đừng đưa tên nhân vật và số liệu thật.\"",
            choices: [
              { label: "Thay tên và số bằng ký hiệu, chỉ dán từng đoạn, rồi ghi lại đã dùng AI", next: "good" },
              { label: "Dán cả bản thảo vì khách đã đồng ý dùng AI", next: "bad_overreach" },
            ],
          },
          bad_overreach: {
            text: "Khách chỉ đồng ý với điều kiện ẩn tên và số. Việc dán nguyên bản vượt điều kiện, khách mất tin dù bạn đã hỏi.",
            ending: "bad",
          },
          good: {
            text: "Bạn giao đúng hạn và ghi rõ công đoạn dùng AI. Khách yên tâm và giao thêm việc lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hỏi khách, ẩn thông tin nhạy cảm, nói rõ công đoạn dùng AI.",
          "Bài sau: ghép mọi thứ đã học thành hệ thống làm việc một tháng của bạn.",
        ],
      },
    ],
  },
  {
    id: 2239,
    slug: "freelancer-du-an-cuoi-he-thong-mot-thang-lam-viec-cua-ban",
    title: "Chặng 41, Bài 20: Dự án cuối: hệ thống làm việc một tháng của freelancer",
    subtitle: "Bộ công cụ làm việc giống hộp đồ nghề: mỗi món có chỗ riêng, cần là lấy ra dùng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi bài trong chặng chỉ giải quyết một khoảnh khắc. Sức mạnh nằm ở việc ghép chúng: mẫu tin nhận khách, báo giá, lịch tuần, bảng thu chi và quy tắc dùng AI. Có sẵn một bộ dùng ngay giúp bạn bớt quyết định lặp lại, và luôn kiểm cùng một cách.",
    openingQuestion:
      "Bạn đã có mẫu tin, báo giá, lịch tuần, bảng thu chi và quy tắc dùng AI. Điều gì làm cả bộ đó dùng được cho một tháng làm việc?",
    openingOptions: [
      "Mỗi phần có chỗ để lưu và một bước kiểm tra do bạn làm",
      "AI tự cập nhật mọi phần mỗi tháng, bạn chỉ cần xem lại",
      "Bộ mẫu được viết thật hay để gây ấn tượng với khách",
      "Mọi phần được gộp vào một tệp dài, đọc từ trên xuống",
    ],
    correctOption: 0,
    explanation:
      "Một bộ làm việc chỉ dùng được khi từng phần có nơi để lưu và một bước kiểm tra do bạn thực hiện, vì AI có thể sai ở mỗi phần đó. AI không tự cập nhật đúng theo tình hình thật của bạn. Mẫu hay để gây ấn tượng không giúp làm việc, và một tệp dài gộp tất cả thì khó tìm và khó sửa từng phần.",
    diagram: [
      { label: "Mẫu tin nhận khách và báo giá", arrow: true },
      { label: "Lịch tuần và bảng thu chi", arrow: true },
      { label: "Quy tắc dùng AI và bước kiểm", arrow: true },
      { label: "Xem lại cuối tháng và chỉnh bộ mẫu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một bạn viết nội dung tự do gom năm phần vào một thư mục: mẫu tin trả lời khách hỏi giá, mẫu báo giá, lịch tuần, bảng thu chi và một trang quy tắc dùng AI. Cuối tháng bạn xem lại mẫu nào dùng nhiều, mẫu nào phải sửa, và chỉnh lại. Tháng sau bạn nhận việc nhanh hơn mà không quên bước kiểm.",
    },
    quiz: [
      Q(
        "Mục đích chính của việc gom mẫu tin, lịch, bảng thu chi và quy tắc vào một bộ là gì?",
        [
          "Bớt quyết định lặp lại và luôn kiểm theo cùng một cách",
          "Để khách nhìn thấy bạn có nhiều tài liệu hơn người khác",
          "Để AI tự làm việc thay bạn mỗi khi có khách mới",
          "Để không phải kiểm lại kết quả AI vì đã có mẫu chuẩn",
        ],
        "Bộ làm việc giúp bạn làm cùng một việc theo cùng một cách, ít quên bước và ít phải nghĩ lại. Khách không cần thấy tài liệu nội bộ, AI không tự làm thay, và mẫu chuẩn không loại bỏ bước kiểm."
      ),
      Q(
        "Bạn dùng lại mẫu báo giá của khách trước cho khách mới. Điều nào phải làm?",
        [
          "Đọc lại từng con số, tên và điều khoản trước khi gửi",
          "Chỉ đổi tên khách, còn lại giữ nguyên vì đã dùng tốt",
          "Nhờ AI đổi hết và gửi luôn vì nó biết khách mới",
          "Giữ nguyên số tiền vì khách nào cũng như nhau",
        ],
        "Mẫu cũ thường còn số liệu, phạm vi và điều khoản của khách trước. Chỉ đổi tên thì các chi tiết cũ vẫn sót lại. AI không biết khách mới nếu bạn chưa đưa, và mỗi khách có phạm vi việc khác nhau."
      ),
      Q(
        "Quy tắc dùng AI của bạn nên có gì?",
        [
          "Việc gì được giao, việc gì không, và bước kiểm tra sau mỗi lần dùng",
          "Danh sách các công cụ AI mới nhất và cách dùng từng nút bấm",
          "Cam kết rằng AI luôn đúng nên khỏi cần kiểm khi việc đơn giản",
          "Lời hứa với khách rằng không dùng AI cho bất cứ việc gì",
        ],
        "Quy tắc tốt cho biết việc nào giao được, việc nào không, và cách kiểm. Danh sách nút bấm lỗi thời nhanh, AI không luôn đúng, và lời hứa tuyệt đối không dùng AI là cam kết bạn có thể không giữ."
      ),
      Q(
        "Bảng thu chi cuối tháng cho thấy thu 30 triệu, chi phí cố định 4 triệu, nợ chưa thu 6 triệu. Số tiền đã thu và còn giữ là bao nhiêu?",
        [
          "20 triệu (= 30 − 6 − 4)",
          "26 triệu (= 30 − 4, tính cả nợ)",
          "24 triệu (= 30 − 6, quên chi phí)",
          "16 triệu (= 30 − 4 − 6 − 4)",
        ],
        "Nếu 30 triệu là tổng doanh thu gồm cả 6 triệu chưa thu thì tiền đã thu là 30 − 6 = 24 triệu, trừ chi phí cố định 4 triệu còn 20 triệu. Tính cả nợ chưa thu cho 26, quên chi phí cho 24, trừ hai lần cho 16."
      ),
      Q(
        "Cuối tháng, việc nào giúp bộ làm việc tốt hơn?",
        [
          "Xem mẫu nào dùng nhiều, mẫu nào phải sửa nhiều, rồi chỉnh lại",
          "Thay hết mẫu bằng mẫu mới từ AI cho mới mẻ",
          "Không đổi gì vì bộ đã hoàn chỉnh ngay từ đầu",
          "Xoá các mẫu ít dùng để bộ trông gọn hơn",
        ],
        "Xem lại cho biết mẫu nào thật sự hữu ích và mẫu nào gây sửa nhiều. Thay hết bằng mẫu mới mất kinh nghiệm, không đổi gì bỏ qua thực tế, còn xoá mẫu ít dùng có thể xoá luôn mẫu cần trong tình huống hiếm."
      ),
      Q(
        "Khi một phần trong bộ dựa vào quy định (ví dụ thuế, hợp đồng), bạn nên làm gì?",
        [
          "Hỏi kế toán hoặc pháp chế và ghi ngày cập nhật",
          "Nhờ AI cập nhật quy định mỗi tháng cho chắc",
          "Giữ nguyên vì quy định hiếm khi thay đổi trong một năm làm việc",
          "Xoá phần đó khỏi bộ vì AI không nên đụng tới",
        ],
        "Quy định có thể thay đổi và AI có thể nhớ lỗi thời. Người có chuyên môn xác nhận và bạn ghi ngày để biết khi nào xem lại. Tin AI, bỏ mặc, hay xoá phần đó đều không giải quyết được."
      ),
    ],
    keyTakeaways: [
      "Bộ làm việc gồm mẫu tin, báo giá, lịch tuần, bảng thu chi và quy tắc dùng AI.",
      "Mỗi phần có nơi lưu và một bước kiểm do bạn làm.",
      "Dùng lại mẫu cũ thì đọc lại từng số, tên, điều khoản.",
      "Cuối tháng xem lại và chỉnh, phần liên quan quy định thì hỏi chuyên gia.",
    ],
    practicePrompt: {
      question:
        "Bạn gom xong năm phần mẫu. Bước nào giúp nó thật sự dùng được cho tháng tới?",
      options: [
        "Thử dùng từng phần với một việc thật và ghi chỗ cần sửa",
        "Lưu vào thư mục và coi như xong, để đó khi cần",
        "Gửi bộ mẫu cho khách để họ thấy bạn chuyên nghiệp ngay khi xong",
        "Nhờ AI viết lại toàn bộ cho thật khác nhau",
      ],
      correct: 0,
      explanation:
        "Chỉ khi dùng với việc thật bạn mới biết mẫu nào thiếu, thừa hay sai. Cất vào thư mục không kiểm gì, gửi mẫu cho khách không có ích cho công việc của bạn, và viết lại toàn bộ làm mất phần đã ổn.",
    },
    summary: {
      keyIdea: "Ghép các bài thành một bộ, mỗi phần có chỗ lưu và bước kiểm của bạn.",
      formula: "Bộ làm việc = mẫu + lịch + bảng thu chi + quy tắc dùng AI + xem lại cuối tháng.",
      commonMistake: "Dùng lại mẫu cũ mà không đọc lại số liệu và điều khoản.",
      action: "Tạo thư mục có năm phần và thử mỗi phần với một việc thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tạo một thư mục có năm tệp: mẫu tin trả lời khách hỏi giá, mẫu báo giá, lịch tuần, bảng thu chi, trang quy tắc dùng AI. Lấy nội dung từ các bài trước hoặc từ việc thật của bạn. Ghi ở đầu mỗi tệp: dùng khi nào, và bước kiểm nào bạn sẽ làm.",
      secondary: "Đặt nhắc cuối tháng để xem lại và chỉnh bộ mẫu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã đi qua nhiều khoảnh khắc: khách hỏi giá, báo giá, lịch tuần, thu chi, báo lùi hạn, giữ bí mật. Bài cuối ghép chúng thành một bộ dùng ngay cho nghề của bạn.",
      },
      {
        type: "feynman",
        title: "Hệ thống làm việc đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới hộp đồ nghề của thợ: mỗi dụng cụ có chỗ riêng, thợ không phải lục tung khi cần đúng cái mỏ lết.",
        columns: ["Thành phần", "Hộp đồ nghề", "Bộ làm việc freelancer"],
        rows: [
          ["Cái gì", "Búa, mỏ lết, tua vít", "Mẫu tin, báo giá, lịch, bảng thu chi, quy tắc"],
          ["Chỗ để", "Mỗi món một ngăn", "Mỗi phần một tệp, tên rõ ràng"],
          ["Trước khi dùng", "Kiểm cỡ vừa với ốc", "Đọc lại số, tên, điều khoản cho khách này"],
          ["Bảo dưỡng", "Lau dầu, thay món hỏng", "Xem lại cuối tháng, chỉnh mẫu"],
        ],
        oneLiner: "Bộ làm việc là hộp đồ nghề của bạn: mỗi món có chỗ, và luôn kiểm trước khi dùng.",
      },
      { type: "heading", text: "Vấn đề: mỗi lần lại làm từ đầu" },
      {
        type: "paragraph",
        text: "Không có bộ mẫu, mỗi khách mới bạn lại nghĩ lại cách trả lời, cách báo giá, cách xếp lịch. Việc lặp lại tốn thời gian và dễ quên bước kiểm. Bộ làm việc gom những thứ đó một chỗ.",
      },
      {
        type: "flow",
        title: "Một tháng làm việc với bộ của bạn",
        steps: [
          { label: "Tuần 1: nhận khách", detail: "Dùng mẫu tin trả lời hỏi giá và mẫu báo giá. Đọc lại số và điều khoản cho từng khách." },
          { label: "Đầu mỗi tuần: xếp lịch", detail: "Đưa AI danh sách việc, hạn thật và số giờ. Bạn cộng giờ và cắt phần không khả thi." },
          { label: "Trong tuần: làm việc và báo khách", detail: "Nếu quá tải, dùng mẫu báo lùi hạn có phương án. Dùng AI theo quy tắc, ẩn thông tin nhạy cảm." },
          { label: "Cuối tuần: ghi thu chi", detail: "Ghi khoản thu và chi vào bảng, đối chiếu sao kê." },
          { label: "Cuối tháng: xem lại", detail: "Xem mẫu nào dùng nhiều, phải sửa nhiều, chỉnh lại. Câu hỏi thuế và hợp đồng đem hỏi chuyên gia." },
        ],
      },
      {
        type: "list",
        items: [
          "Phần 1: mẫu tin trả lời khách hỏi giá, hỏi lại ba điều trước khi nêu số.",
          "Phần 2: mẫu báo giá với phạm vi việc và số lần sửa rõ ràng.",
          "Phần 3: lịch tuần từ hạn chót thật, cộng giờ và cắt phần thừa.",
          "Phần 4: bảng thu chi và danh sách câu hỏi cho kế toán.",
          "Phần 5: trang quy tắc dùng AI cho khách: hỏi, ẩn, ghi rõ.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát trang quy tắc dùng AI do AI soạn",
        task: "Bạn nhờ AI soạn trang quy tắc dùng AI khi làm cho khách. Bạn đã dặn: hỏi khách trước, ẩn thông tin nhạy cảm, luôn kiểm lại kết quả. Đánh dấu những đoạn không đúng với điều bạn dặn.",
        segments: [
          { text: "Trước khi dùng AI với tài liệu của khách, hỏi khách hoặc xem hợp đồng." },
          { text: "Thay tên người, công ty và số liệu thật bằng ký hiệu trước khi dán." },
          {
            text: "Nếu tài liệu đã cũ hơn một năm, có thể dán nguyên văn vì chắc chắn đã công khai.",
            error: "Bạn chưa dặn ngoại lệ này. Tài liệu cũ vẫn có thể còn bảo mật, nên phải hỏi khách.",
          },
          { text: "Luôn đọc lại mọi con số và tên trong kết quả trước khi giao." },
          {
            text: "AI của các nhà cung cấp lớn đảm bảo tuyệt đối dữ liệu không bao giờ bị lộ.",
            error: "AI tự khẳng định điều bạn không dặn và không ai kiểm chứng được. Không nên đưa vào quy tắc.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: phần liên quan quy định cần người có chuyên môn",
        text: "Điều khoản hợp đồng, thuế và bảo mật thay đổi theo hoàn cảnh. Ghi ngày bạn cập nhật từng phần và hỏi kế toán hoặc pháp chế khi không chắc, đừng để AI tự kết luận.",
      },
      {
        type: "scenario",
        title: "Khách mới đến khi lịch đã kín",
        start: "s1",
        nodes: {
          s1: {
            text: "Đầu tháng, một khách mới nhắn hỏi giá cho việc gấp. Lịch tuần của bạn đã có 38 trên 40 giờ.",
            choices: [
              { label: "Nhận ngay và hứa giao trong hai ngày", next: "bad_over" },
              { label: "Dùng mẫu tin hỏi lại ba điều, rồi kiểm lịch tuần trước khi báo giá", next: "s2" },
            ],
          },
          bad_over: {
            text: "Bạn nhận việc mà lịch chỉ còn 2 giờ. Hai khách cũ bị trễ và khách mới nhận bản làm vội.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi trả lời, khách cần 10 giờ trong tuần này. Bạn chỉ còn 2 giờ.",
            choices: [
              { label: "Báo giá kèm ngày giao sau tuần này, có ghi phạm vi rõ", next: "good" },
              { label: "Nhận nhưng nhờ AI ép giờ từng việc cũ cho có chỗ", next: "bad_squeeze" },
            ],
          },
          bad_squeeze: {
            text: "Giờ trên giấy vừa, giờ thật thì không. Bạn thức khuya và cả ba khách đều nhận việc thiếu chỉn chu.",
            ending: "bad",
          },
          good: {
            text: "Khách mới đồng ý ngày sau tuần này. Các khách cũ vẫn nhận đúng hạn và bạn không phải thức khuya.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một bộ làm việc gọn, mỗi phần có chỗ lưu và bước kiểm của bạn.",
          "Xem lại cuối tháng, chỉnh dần, và luôn kiểm trước khi gửi khách.",
        ],
      },
    ],
  },
];
