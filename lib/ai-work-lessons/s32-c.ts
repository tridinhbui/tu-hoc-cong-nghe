import type { Lesson } from "../lesson-types";

// Chặng 32, bài 11-15. Giáo trình: scripts/curriculum/stage-32.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm kết quả.

type Opt = [string, string, string, string];
const Q = (question: string, options: Opt, explanation: string) => ({ question, options: [...options], correct: 0, explanation });

export const S32_C_LESSONS: Lesson[] = [
  {
    id: 2050,
    slug: "bang-theo-doi-tien-do-mot-nhin-la-hieu",
    title: "Chặng 32, Bài 11: Bảng theo dõi tiến độ mà sếp nhìn một lần là hiểu",
    subtitle: "Sáu mươi dòng thì không ai đọc. Mười dòng có màu và tiêu chí thì sếp hiểu trong nửa phút.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng tiến độ có mặt để sếp quyết định nhanh: cần thêm người, dời hạn hay để yên. Bảng quá dài thì sếp bỏ qua, và vấn đề thật nằm im ở dòng thứ 43 cho tới khi quá muộn. Bảng ngắn với màu có tiêu chí rõ giúp bạn được hỏi đúng câu cần hỏi, thay vì bị hỏi tất cả.",
    openingQuestion:
      "Bảng tiến độ của bạn có 60 dòng, cập nhật đều mỗi tuần, nhưng sếp vẫn hỏi lại từng việc trong buổi họp. Nguyên nhân hợp lý nhất là gì?",
    openingOptions: [
      "Bảng đủ chi tiết nhưng không cho thấy chỗ nào cần sếp quyết",
      "Bảng chưa đủ chi tiết nên cần thêm nhiều cột ghi chú nữa cho sếp",
      "Sếp không quen đọc bảng tính nên cần đổi sang file khác",
      "Bảng cập nhật chưa đủ nhanh nên cần cập nhật mỗi ngày",
    ],
    correctOption: 0,
    explanation:
      "Bảng 60 dòng trả lời câu hỏi \"đã làm gì\", còn sếp cần biết \"chỗ nào đang có vấn đề và mình phải làm gì\". Thêm cột ghi chú làm bảng dài hơn, đổi sang file khác không sửa được chuyện thiếu tóm tắt, và cập nhật mỗi ngày chỉ khiến người đọc thấy thêm nhiều chữ. Cách sửa là gộp về khoảng mười dòng, mỗi dòng có trạng thái theo tiêu chí và ghi rõ việc nào cần người quyết.",
    diagram: [
      { label: "Bảng gốc 60 dòng của cả đội", arrow: true },
      { label: "Gộp thành ~10 hạng mục lớn", arrow: true },
      { label: "Gán xanh / vàng / đỏ theo tiêu chí viết sẵn", arrow: true },
      { label: "Dòng đỏ ghi rõ: cần ai quyết điều gì" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng vận hành 8 người",
      description:
        "Chị quản lý gửi sếp bảng tiến độ dự án chuyển kho gồm 60 dòng. Ba tuần liền sếp chỉ hỏi miệng. Chị gộp về 9 hạng mục, đặt tiêu chí màu và thêm một cột \"cần sếp quyết\". Buổi họp sau, sếp chỉ dừng ở hai dòng đỏ và ra quyết định luôn thay vì đọc lại cả bảng. Đây là tình huống tưởng tượng để minh hoạ, không phải số liệu của một công ty có thật.",
    },
    quiz: [
      Q(
        "Một hạng mục trễ 4 ngày và đang chặn hai việc khác. Theo tiêu chí ví dụ của bài, nó nên có màu gì?",
        [
          "Đỏ, vì trễ lâu và chặn việc khác nên cần người quyết",
          "Vàng, vì mới trễ 4 ngày và vẫn còn thời gian để cứu vãn",
          "Xanh, vì việc vẫn đang được làm và chưa bị huỷ bỏ",
          "Vàng, vì chỉ đỏ khi có ít nhất ba việc khác bị chặn",
        ],
        "Tiêu chí ví dụ: đỏ khi trễ hơn 3 ngày hoặc đang chặn việc khác. Ở đây có cả hai điều kiện. Vàng dành cho trễ nhẹ có cách xử lý. Xanh không hợp vì đang làm không có nghĩa là đúng hạn. Ngưỡng ba việc bị chặn là một luật không có trong tiêu chí.",
      ),
      Q(
        "Vì sao phải viết tiêu chí cho từng màu trước khi tô màu?",
        [
          "Để cùng một tình trạng luôn ra cùng một màu, ai tô cũng như nhau",
          "Để bảng nhìn đẹp và giống bảng theo dõi trong sách dự án",
          "Để AI có lý do tô đỏ nhiều dòng hơn và làm sếp chú ý hơn tới dự án",
          "Để người phụ trách việc không dám báo trễ vì sợ bị tô đỏ trước mặt cả đội",
        ],
        "Màu không tiêu chí chỉ là cảm giác của người tô: hôm nay lạc quan thì tô vàng, hôm sau lo thì tô đỏ. Tiêu chí viết sẵn làm màu có nghĩa cố định. Đẹp mắt không phải mục đích, và bảng tốt cũng không nhằm làm ai sợ hay tô đỏ cho nhiều.",
      ),
      Q(
        "AI gộp 60 dòng thành 10 hạng mục. Bước kiểm nào đáng làm nhất trước khi gửi sếp?",
        [
          "Đếm lại: mọi dòng gốc phải nằm trong đúng một hạng mục",
          "Xem tiêu đề hạng mục có ngắn và nghe chuyên nghiệp không",
          "Kiểm xem AI có dùng đúng số màu xanh, vàng, đỏ cân bằng không",
          "Hỏi lại AI \"bạn có chắc đã gộp đủ chưa\" và tin câu trả lời",
        ],
        "Gộp dòng dễ làm rơi mất một việc hoặc xếp việc vào hạng mục sai, và AI vẫn viết bảng trông đầy đủ. Đối chiếu số dòng gốc với hạng mục là kiểm được bằng cách đếm. Tiêu đề hay hay dở là chuyện phụ. Số màu \"cân bằng\" không phải mục tiêu vì thực tế có thể toàn xanh. Hỏi lại chính AI không phải là kiểm chứng.",
      ),
      Q(
        "Bảng có dòng đỏ nhưng cột \"cần sếp quyết\" để trống. Vấn đề chính là gì?",
        [
          "Sếp biết có chuyện nhưng không biết mình phải làm gì",
          "Bảng thiếu một cột nên nhìn chưa cân đối khi in ra",
          "Người nhập chưa điền hết nên bảng bị tính là chưa xong",
          "Dòng đỏ chỉ cần báo động, việc quyết là của người làm",
        ],
        "Đèn đỏ mà không nói cần gì thì chỉ chuyển nỗi lo từ bạn sang sếp. Một dòng đỏ tốt kèm quyết định cụ thể: thêm người, dời hạn, hay bỏ bớt phạm vi. Chuyện cân đối khi in và chuyện bảng chưa xong đều là chi tiết phụ. Nếu việc quyết luôn của người làm thì không cần báo sếp.",
      ),
      Q(
        "Nên gửi cho AI phần nào của bảng gốc để nhờ gộp hạng mục?",
        [
          "Tên việc, trạng thái, ngày hạn; bỏ họ tên và số liệu nhạy cảm",
          "Toàn bộ bảng kể cả lương, chi phí chi tiết và họ tên đầy đủ",
          "Chỉ tên cột, vì AI biết sẵn nội dung dự án của công ty bạn",
          "Ảnh chụp màn hình cả bảng để AI khỏi phải đọc từng ô",
        ],
        "Việc gộp chỉ cần tên việc, trạng thái và hạn. Họ tên, chi phí hay lương không giúp gộp tốt hơn mà chỉ thêm rủi ro khi dán vào công cụ ngoài công ty. Chỉ đưa tên cột thì AI không có gì để gộp và sẽ tự bịa nội dung. Ảnh chụp không làm giảm dữ liệu gửi đi.",
      ),
    ],
    keyTakeaways: [
      "Bảng cho sếp trả lời \"chỗ nào cần tôi quyết\", không phải \"đã làm những gì\".",
      "Gộp khoảng 10 hạng mục; mỗi dòng gốc thuộc đúng một hạng mục.",
      "Màu xanh, vàng, đỏ phải có tiêu chí viết sẵn, không theo cảm giác.",
      "Dòng đỏ luôn kèm quyết định cụ thể cần ai đưa ra.",
      "AI gợi ý gộp và tô màu theo tiêu chí bạn đưa; bạn đếm và đối chiếu lại.",
    ],
    practicePrompt: {
      question: "Hạng mục \"Đào tạo nhân viên kho\" trễ 2 ngày, chưa chặn việc nào, người phụ trách đã có kế hoạch bù. Màu nào hợp tiêu chí ví dụ của bài?",
      options: [
        "Vàng: trễ nhẹ, có cách xử lý và chưa chặn việc khác",
        "Đỏ: mọi việc đã trễ đều phải báo động cho sếp biết",
        "Xanh: hai ngày là nhỏ nên coi như vẫn đúng hạn",
        "Không tô: chỉ tô màu cho việc trễ từ 5 ngày trở lên",
      ],
      correct: 0,
      explanation:
        "Trễ 2 ngày, có kế hoạch bù, chưa chặn ai: đúng mô tả vàng. Đỏ dành cho trễ hơn 3 ngày hoặc chặn việc khác, nên tô đỏ mọi việc trễ làm sếp mất khả năng phân biệt. Xanh che dấu hiệu sớm. Bỏ trống thì tạo ra dòng không ai biết tình trạng.",
    },
    summary: {
      keyIdea: "Bảng tốt là bảng làm sếp ra quyết định nhanh, không phải bảng đầy đủ nhất.",
      formula: "Gộp ~10 hạng mục + màu có tiêu chí + cột \"cần quyết\" cho dòng đỏ.",
      commonMistake: "Tô màu theo cảm giác, và để dòng đỏ mà không nói cần sếp làm gì.",
      action: "Viết ba tiêu chí xanh, vàng, đỏ cho đội bạn rồi tô lại bảng hiện có.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bảng tiến độ thật của bạn (bỏ họ tên và số nhạy cảm). Nhờ AI gộp còn khoảng 10 hạng mục. Đếm để chắc mọi dòng gốc còn nằm đâu đó, viết ba tiêu chí màu, tô lại, và điền cột \"cần sếp quyết\" cho mọi dòng đỏ.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn: có dòng nào AI làm rơi hoặc gộp sai không, và dòng đỏ nào bạn đã nói rõ cần quyết gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn gửi bảng tiến độ 60 dòng. Sếp cuộn hai lần, đóng file, rồi hỏi miệng: \"Tóm lại đang ổn không?\" Bài này giúp bạn thu bảng về mười dòng mà câu hỏi đó tự có câu trả lời.",
      },
      {
        type: "feynman",
        title: "Bảng tiến độ đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới bảng đồng hồ trên xe máy: bạn không cần biết từng pít-tông, chỉ cần kim tốc độ, mức xăng và một đèn cảnh báo.",
        columns: ["Thành phần", "Bảng đồng hồ xe", "Bảng tiến độ"],
        rows: [
          ["Số lượng", "Vài chỉ báo, không phải mọi bộ phận", "Khoảng 10 hạng mục, không phải mọi việc nhỏ"],
          ["Cảnh báo", "Đèn đỏ khi có gì đó thật sự cần dừng", "Dòng đỏ theo tiêu chí viết sẵn"],
          ["Ngưỡng", "Nhà sản xuất định sẵn khi nào đèn sáng", "Đội bạn thống nhất trước khi nào là vàng, đỏ"],
          ["Người xem", "Người lái, cần biết ngay có nên dừng", "Sếp, cần biết ngay có phải quyết gì"],
        ],
        oneLiner: "Bảng tiến độ là đồng hồ xe: ít chỉ báo, ngưỡng rõ, và đèn đỏ nghĩa là có việc cần người quyết.",
      },
      { type: "heading", text: "Vì sao 60 dòng không ai đọc" },
      {
        type: "paragraph",
        text: "Người làm việc cần chi tiết, người quyết định cần tóm tắt. Bảng 60 dòng phục vụ người thứ nhất và vô tình bắt người thứ hai tự làm phép tóm tắt trong đầu. Sếp không làm việc đó, nên chọn hỏi miệng.",
      },
      {
        type: "chart",
        title: "Tiến độ kế hoạch và thực tế theo tuần",
        caption:
          "Số liệu minh hoạ, không phải dữ liệu thật. Kéo thanh trượt để thấy vì sao một tuần trễ nhỏ vẫn nên được nhìn thấy sớm: khoảng cách giữa hai đường lớn dần mỗi tuần.",
        kind: "line",
        xLabel: "Tuần",
        yLabel: "% việc đã xong",
        x: { from: 0, to: 8, step: 1 },
        params: [
          { id: "rate", label: "Phần trăm việc xong mỗi tuần (thực tế)", min: 5, max: 20, step: 0.5, value: 10, unit: "%" },
        ],
        series: [
          { label: "Kế hoạch", expr: "min(100, x * 12.5)" },
          { label: "Thực tế", expr: "min(100, x * rate)" },
        ],
      },
      { type: "heading", text: "Ba việc AI làm giúp bạn, ba việc bạn giữ" },
      {
        type: "list",
        items: [
          "AI giúp: đề xuất cách gộp 60 dòng thành khoảng 10 hạng mục, viết một câu tóm tắt mỗi hạng mục, gợi ý màu theo tiêu chí bạn viết.",
          "Bạn giữ 1: đếm lại để không dòng nào bị rơi hoặc gộp nhầm hạng mục.",
          "Bạn giữ 2: quyết tiêu chí xanh, vàng, đỏ. Ví dụ: đỏ khi trễ hơn 3 ngày hoặc chặn việc khác; vàng khi trễ 1-3 ngày nhưng có cách xử lý; xanh còn lại. Đội bạn tự chọn ngưỡng.",
          "Bạn giữ 3: viết cột \"cần sếp quyết\", vì chỉ bạn biết đội cần gì.",
        ],
      },
      {
        type: "comparison",
        left: { label: "Bảng 60 dòng", text: "Đầy đủ, khó đọc. Không dòng nào nổi lên. Sếp phải tự tìm chỗ có vấn đề, thường là bỏ qua." },
        right: { label: "Bảng 10 dòng có màu", text: "Nhìn 30 giây thấy ngay dòng đỏ. Mỗi dòng đỏ có việc cần quyết, nên buổi họp đi thẳng vào điểm chính." },
      },
      {
        type: "callout",
        label: "Cẩn thận khi gộp",
        text: "AI gộp rất trôi nhưng có thể bỏ sót một việc khó hoặc dồn hai việc khác nhau vào một dòng làm nó trông ổn. Mỗi lần gộp, hãy đếm: số dòng gốc phải bằng tổng số dòng nằm trong các hạng mục.",
      },
      {
        type: "scenario",
        title: "Chuẩn bị bảng cho buổi họp thứ Hai",
        start: "s1",
        nodes: {
          s1: {
            text: "Chủ nhật, bạn nhờ AI gộp bảng 60 dòng thành 10 hạng mục và gợi ý màu. AI trả về bảng 10 dòng gọn gàng, 8 xanh, 1 vàng, 1 đỏ. Bạn làm gì?",
            choices: [
              { label: "Gửi luôn cho sếp, vì bảng trông rất gọn và chuyên nghiệp", next: "bad_blind" },
              { label: "Đối chiếu: đếm số dòng gốc trong mỗi hạng mục và kiểm màu với tiêu chí", next: "s2" },
            ],
          },
          bad_blind: {
            text: "Thứ Hai sếp hỏi vì sao việc \"đặt hàng thiết bị\" không thấy đâu. AI đã dồn nó vào hạng mục xanh, trong khi thực tế nó đang trễ 6 ngày. Sếp mất niềm tin vào cả bảng.",
            ending: "bad",
          },
          s2: {
            text: "Đếm ra 58 dòng, thiếu 2 dòng gốc. Việc \"đặt hàng thiết bị\" đang trễ 6 ngày bị dồn vào hạng mục xanh. Bạn xử lý thế nào?",
            choices: [
              { label: "Đưa hai việc trở lại, đổi hạng mục đó thành đỏ theo tiêu chí và ghi cần sếp duyệt mua gấp", next: "good" },
              { label: "Xoá hạng mục đó khỏi bảng để bảng khỏi có màu đỏ", next: "bad_hide" },
            ],
          },
          bad_hide: {
            text: "Bảng toàn xanh nên sếp yên tâm. Hai tuần sau thiết bị vẫn chưa về, dự án trễ cả tháng và sếp hỏi vì sao không ai báo.",
            ending: "bad",
          },
          good: {
            text: "Buổi họp thứ Hai dừng ở đúng một dòng đỏ. Sếp duyệt mua gấp ngay tại chỗ, việc được gỡ trong tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mười dòng có màu, tiêu chí rõ, và mỗi dòng đỏ nói cần ai quyết gì.",
          "Bài sau: nhờ AI đọc bảng để phát hiện trễ tiến độ sớm hơn.",
        ],
      },
    ],
  },
  {
    id: 2051,
    slug: "nhan-ra-tre-tien-do-som-tu-du-lieu",
    title: "Chặng 32, Bài 12: Nhận ra trễ tiến độ sớm từ dữ liệu bạn đã có",
    subtitle: "Thứ Tư mà chưa có việc nào xong là một dấu hiệu. Bạn không cần phần mềm mới, chỉ cần đọc bảng đúng cách.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trễ tiến độ hiếm khi đến bất ngờ ở ngày cuối. Nó thường lộ ra từ giữa tuần: việc mới mở nhiều hơn việc đóng, việc nằm im lâu, việc chưa ai nhận. Nếu bạn thấy sớm ba ngày, bạn còn kịp xin người hoặc dời hạn. Thấy vào ngày cuối thì chỉ còn kịp xin lỗi.",
    openingQuestion:
      "Thứ Tư, bảng việc của đội có 14 việc đang mở, 0 việc đóng trong tuần này, hạn giao là thứ Sáu. Dấu hiệu nào đáng lo nhất?",
    openingOptions: [
      "Tuần đã đi quá nửa mà chưa có việc nào hoàn thành",
      "Số việc đang mở là 14, con số này nghe có vẻ khá nhiều",
      "Hạn giao rơi vào thứ Sáu, vốn là ngày mọi người bận rộn",
      "Bảng việc chưa được sắp xếp lại theo tên người phụ trách",
    ],
    correctOption: 0,
    explanation:
      "Việc mở nhiều chưa chắc là xấu, vì nó phụ thuộc quy mô dự án. Điều đáng lo là dòng chảy: việc vào mà không có việc ra nghĩa là mọi thứ đang tắc ở đâu đó, và hai ngày còn lại khó đủ để đóng 14 việc. Ngày hạn cố định và cách sắp xếp bảng không nói gì về tốc độ hoàn thành. Nhìn số việc đóng theo ngày là cách nhanh nhất để thấy sớm.",
    diagram: [
      { label: "Lấy bảng việc: ngày mở, ngày đóng, người nhận", arrow: true },
      { label: "Nhờ AI tìm mẫu hình: việc nằm lâu, chưa có người, ngày trống", arrow: true },
      { label: "Bạn đối chiếu từng dòng AI nêu với bảng gốc", arrow: true },
      { label: "Hỏi người phụ trách trước khi báo sếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm marketing 5 người",
      description:
        "Nhóm có kế hoạch ra ấn phẩm vào thứ Sáu. Thứ Tư, chị trưởng nhóm nhờ AI đọc bảng việc và thấy: 9 việc mở, 1 việc đóng, và 3 việc chưa ghi người nhận. Chị hỏi thẳng ba việc đó ngay chiều thứ Tư và kịp nhờ một đồng nghiệp bên nhóm khác. Đây là tình huống tưởng tượng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Dấu hiệu nào cho thấy tiến độ có thể đang trễ dù chưa qua hạn?",
        [
          "Số việc mở tăng đều, số việc đóng gần như đứng yên",
          "Trong bảng có vài việc được tạo cùng một ngày đầu tuần",
          "Có người ghi ngày hoàn thành sớm hơn ngày hạn",
          "Bảng việc được chia thành nhiều cột màu khác nhau",
        ],
        "Việc mở tăng mà việc đóng đứng yên nghĩa là công việc đang chất lại thay vì chảy đi. Tạo nhiều việc cùng ngày là bình thường khi lập kế hoạch. Hoàn thành sớm là tin tốt, và màu sắc của bảng không cho biết gì về tốc độ.",
      ),
      Q(
        "Bạn hỏi AI: \"Bảng này có chậm không?\" và không gửi kèm ngày mở, ngày đóng. Điều gì dễ xảy ra?",
        [
          "AI trả lời tự tin về mức độ chậm nhưng thực ra chỉ đoán",
          "AI báo lỗi và từ chối trả lời vì thiếu dữ liệu ngày tháng",
          "AI tự tra lịch làm việc của công ty để có đủ ngày tháng",
          "AI trả lời đúng vì nó đã quen đọc các bảng việc thông thường",
        ],
        "AI luôn cố trả lời. Thiếu ngày mở và ngày đóng, nó chỉ có thể viết câu nghe hợp lý, như \"dự án có thể trễ khoảng hai tuần\" chẳng dựa vào đâu. Nó không truy cập lịch công ty, và quen đọc bảng nói chung không thay được dữ liệu của bạn.",
      ),
      Q(
        "AI nói: \"Việc số 7 đã nằm ở trạng thái đang làm 9 ngày.\" Bạn nên làm gì trước khi báo sếp?",
        [
          "Mở bảng gốc, tính lại từ ngày bắt đầu, rồi hỏi người phụ trách việc 7",
          "Báo sếp ngay vì AI đã đưa ra con số cụ thể là 9 ngày, nghe rất đáng tin",
          "Hỏi lại AI \"con số 9 có chính xác không\" và tin câu trả lời",
          "Bỏ qua, vì một việc nằm lâu không đủ để coi là dấu hiệu",
        ],
        "Con số của AI nghe cụ thể nhưng có thể sai vì đếm nhầm cuối tuần hoặc lấy nhầm cột. Bạn tính lại từ bảng gốc, rồi hỏi người phụ trách vì có thể việc đang chờ bên khác. Báo ngay và hỏi lại AI đều chưa phải kiểm chứng, còn việc nằm lâu chính là dấu hiệu cần xem.",
      ),
      Q(
        "Khi nhờ AI tìm mẫu hình đáng lo, cách viết nào hạn chế việc AI bịa?",
        [
          "Chỉ dựa vào bảng tôi đưa, thiếu dữ liệu thì ghi rõ là không đủ dữ liệu",
          "Hãy phân tích thật sâu và đưa ra dự đoán chi tiết nhất có thể về toàn bộ dự án",
          "Hãy cho tôi biết dự án sẽ trễ bao lâu để tôi báo sếp trước khi họp",
          "Hãy dùng kinh nghiệm quản lý dự án của bạn để đoán giúp tôi con số",
        ],
        "Cho phép AI ghi \"không đủ dữ liệu\" cho nó một lối ra thay vì phải bịa. Yêu cầu dự đoán chi tiết nhất, dự báo số ngày trễ hoặc dùng kinh nghiệm đều mời AI viết những điều không có trong bảng của bạn.",
      ),
      Q(
        "AI chỉ ra ba việc chưa có người nhận. Bước tiếp theo hợp lý nhất là gì?",
        [
          "Hỏi người điều phối để giao người cho từng việc",
          "Tự nhận cả ba việc để bảng đỡ có chỗ trống",
          "Xoá ba việc khỏi bảng để danh sách trông sạch hơn",
          "Chờ tới cuối tuần xem có ai tự nhận không rồi mới hỏi",
        ],
        "Việc chưa có người nhận thường là việc sẽ trễ vì không ai thấy mình phải làm. Hỏi ngay người có quyền giao việc là cách nhanh nhất. Tự nhận hết làm bạn quá tải, xoá việc làm mất dấu, còn chờ đến cuối tuần là chờ đến khi đã trễ.",
      ),
    ],
    keyTakeaways: [
      "Nhìn dòng chảy: việc mở so với việc đóng theo ngày, không chỉ tổng số việc.",
      "Ba mẫu hình đáng hỏi: việc nằm lâu, việc chưa có người, ngày không việc nào đóng.",
      "Đưa AI ngày mở, ngày đóng, người nhận; nếu thiếu, AI sẽ bịa.",
      "Cho AI quyền ghi \"không đủ dữ liệu\".",
      "Mọi dòng AI nêu đều phải đối chiếu với bảng gốc trước khi báo sếp.",
    ],
    practicePrompt: {
      question: "Thứ Ba, đội mở 8 việc mới và đóng 1 việc. Hạn của dự án là thứ Sáu tuần sau. Cách phản ứng nào hợp lý nhất?",
      options: [
        "Đối chiếu bảng, hỏi người nhận các việc mở lâu nhất xem có đang vướng gì không",
        "Chưa làm gì vì hạn còn hơn một tuần và mới có một ngày số liệu",
        "Báo sếp dự án sẽ trễ vì đã đóng quá ít việc trong ngày hôm nay",
        "Giao thêm người vào mọi việc đang mở để chắc chắn kịp hạn",
      ],
      correct: 0,
      explanation:
        "Một ngày số liệu chưa đủ để kết luận trễ, nhưng đủ để bắt đầu hỏi. Kết luận ngay và báo trễ thì quá sớm. Chờ mà không hỏi thì bỏ lỡ dấu hiệu sớm. Giao thêm người cho mọi việc là phản ứng thái quá, tốn kém và chưa chắc đúng chỗ nghẽn.",
    },
    summary: {
      keyIdea: "Trễ tiến độ lộ ra ở dòng chảy công việc từ giữa tuần, không phải ở ngày hạn.",
      formula: "Việc mở tăng + việc đóng đứng yên + việc chưa ai nhận = cần hỏi ngay.",
      commonMistake: "Nhờ AI kết luận từ dữ liệu thiếu rồi báo sếp con số nó nêu mà chưa đối chiếu.",
      action: "Mỗi thứ Tư, nhìn số việc đóng trong tuần và hỏi người phụ trách ba việc nằm lâu nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Xuất bảng việc thật của bạn với ba cột: ngày mở, ngày đóng, người nhận (bỏ dữ liệu nhạy cảm). Nhờ AI liệt kê việc nằm lâu nhất, việc chưa có người và ngày không việc nào đóng. Đối chiếu từng dòng, rồi nhắn hỏi đúng một người về một việc.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn: AI nêu dòng nào bạn kiểm ra là sai, và người bạn đã hỏi trả lời gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Tư, bạn liếc bảng việc: 14 việc mở, 0 việc đóng, hạn giao là thứ Sáu. Chưa ai báo trễ, nhưng bạn có cảm giác không ổn. Bài này biến cảm giác đó thành ba câu hỏi cụ thể.",
      },
      {
        type: "feynman",
        title: "Nhận ra trễ tiến độ đơn giản hơn bạn nghĩ",
        intro: "Nhìn bồn rửa bát: nếu bạn mở vòi (việc mới) mà nước không thoát (việc xong), bạn không cần chờ nước tràn mới biết cống đang tắc.",
        columns: ["Thành phần", "Bồn rửa bát", "Bảng việc"],
        rows: [
          ["Nước vào", "Vòi chảy đều", "Việc mới được mở mỗi ngày"],
          ["Nước ra", "Cống thoát nước", "Việc được đóng mỗi ngày"],
          ["Dấu hiệu sớm", "Mực nước dâng dù chưa tràn", "Số việc mở tăng, số việc đóng đứng yên"],
          ["Việc cần làm", "Xem cống tắc chỗ nào", "Hỏi người phụ trách việc nằm lâu nhất"],
        ],
        oneLiner: "Trễ tiến độ là bồn nước dâng: nhìn nước vào và nước ra mỗi ngày, đừng chờ tới lúc tràn.",
      },
      { type: "heading", text: "Ba mẫu hình đáng hỏi" },
      {
        type: "list",
        items: [
          "Việc nằm lâu: một việc đang mở nhiều ngày hơn hẳn các việc cùng cỡ.",
          "Việc chưa có người: không ai ghi tên nhận, nên không ai thấy mình phải làm.",
          "Ngày không đóng việc nào: nhiều ngày liền có việc mở nhưng không có việc nào xong.",
        ],
      },
      {
        type: "chart",
        title: "Việc mở và việc đóng theo ngày",
        caption:
          "Số liệu minh hoạ, không phải dữ liệu thật. Đường Đã đóng bắt đầu chậm vì có \"độ trễ\" ban đầu. Kéo độ trễ và tốc độ đóng để thấy khoảng cách giữa hai đường lớn dần thế nào.",
        kind: "line",
        xLabel: "Ngày",
        yLabel: "Số việc cộng dồn",
        x: { from: 1, to: 10, step: 1 },
        params: [
          { id: "open", label: "Việc mới mở mỗi ngày", min: 1, max: 8, step: 0.5, value: 4, unit: "việc" },
          { id: "close", label: "Việc đóng mỗi ngày", min: 1, max: 8, step: 0.5, value: 3, unit: "việc" },
          { id: "lag", label: "Số ngày đầu chưa đóng việc nào", min: 0, max: 6, step: 1, value: 3, unit: "ngày" },
        ],
        series: [
          { label: "Đã mở", expr: "x * open" },
          { label: "Đã đóng", expr: "max(0, x - lag) * close" },
        ],
      },
      { type: "heading", text: "Nhờ AI đọc bảng, và giữ quyền kết luận" },
      {
        type: "paragraph",
        text: "AI đọc nhanh một bảng 60 dòng và liệt kê các mẫu hình ở trên trong vài giây. Nhưng nó chỉ thấy những gì bạn đưa: thiếu cột ngày thì nó sẽ đoán. Hãy đưa đủ dữ liệu, cho phép nó nói \"không đủ dữ liệu\", và coi câu trả lời là danh sách để hỏi người, chưa phải kết luận.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI đọc bảng việc tuần này",
        task: "Bạn có bảng việc của đội với ngày mở, ngày đóng và người nhận. Lắp một prompt để AI chỉ ra mẫu hình đáng lo, không bịa thêm.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Dán bảng việc gồm tên việc, ngày mở, ngày đóng, người nhận.", good: true, feedback: "Đủ dữ liệu để AI đếm ngày, nên câu trả lời dựa được vào bảng." },
              { text: "Chỉ nói: \"đội tôi có 14 việc mở và chưa thấy việc nào xong\".", feedback: "Không có ngày và người nhận, AI không thể chỉ ra việc cụ thể và sẽ tự bịa." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Cho tôi biết dự án có trễ không.", feedback: "Câu hỏi có/không này ép AI kết luận cả khi thiếu căn cứ." },
              { text: "Liệt kê: việc mở lâu hơn 3 ngày, việc chưa có người nhận, và ngày nào không có việc nào đóng.", good: true, feedback: "Ba mẫu hình cụ thể, mỗi cái kiểm được trên bảng." },
            ],
          },
          {
            id: "guard",
            label: "Ràng buộc chống bịa",
            options: [
              { text: "Chỉ dựa vào bảng tôi đưa; thiếu dữ liệu thì ghi \"không đủ dữ liệu\"; mỗi dòng nêu số thứ tự việc.", good: true, feedback: "Có số thứ tự thì bạn đối chiếu được, và AI có lối ra thay vì bịa." },
              { text: "Hãy dự đoán thật chi tiết để tôi báo sếp.", feedback: "Mời AI viết cả điều không có trong bảng, như số ngày trễ dự kiến." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "guard"],
            text: "1) Việc 7 \"Đặt hàng thiết bị\": mở từ 02/10, đã 9 ngày chưa đóng.\n2) Việc 11, 12, 14: chưa có người nhận.\n3) Các ngày 03/10, 04/10, 05/10: không có việc nào đóng.\nKhông đủ dữ liệu để kết luận dự án có trễ hạn hay không, vì bảng không ghi khối lượng mỗi việc.",
          },
          {
            requires: ["data"],
            text: "Dự án có dấu hiệu chậm. Một số việc mở lâu và một vài việc chưa có người phụ trách. Bạn nên xem lại tiến độ tổng thể.\n(Đúng hướng nhưng không nêu được việc nào, ngày nào, nên bạn chưa hỏi được ai.)",
          },
          {
            text: "Dựa trên kinh nghiệm, dự án của bạn sẽ trễ khoảng 12 ngày, nguyên nhân chính là thiếu nhân sự ở khâu thiết kế.\n(AI không có ngày, người hay khâu nào - \"12 ngày\" và \"thiết kế\" đều do nó bịa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Đối chiếu trước khi báo",
        text: "Mỗi dòng AI nêu, bạn mở bảng gốc kiểm lại: đúng số việc, đúng ngày, đúng người. Rồi hỏi người phụ trách. Có thể việc nằm lâu là do chờ khách phản hồi, và khi đó không phải lỗi của người làm.",
      },
      {
        type: "scenario",
        title: "Thứ Tư và bảng việc không có việc nào đóng",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Tư, AI liệt kê: việc 7 mở 9 ngày, ba việc chưa có người, chưa có việc nào đóng tuần này. Hạn giao là thứ Sáu. Bạn làm gì?",
            choices: [
              { label: "Nhắn ngay cho sếp: \"Dự án chắc chắn trễ, AI đã phân tích\"", next: "bad_alarm" },
              { label: "Mở bảng đối chiếu, rồi nhắn người phụ trách việc 7 hỏi việc đang vướng gì", next: "s2" },
            ],
          },
          bad_alarm: {
            text: "Sếp lo lắng và gọi họp khẩn. Hoá ra việc 7 chỉ đang chờ khách phản hồi, và ba việc kia đã có người nhưng chưa ghi vào bảng. Bạn mất uy tín vì báo động sai.",
            ending: "bad",
          },
          s2: {
            text: "Người phụ trách nói việc 7 đang chờ báo giá từ nhà cung cấp; hai trong ba việc chưa có người thật sự chưa ai làm. Bạn tiếp tục thế nào?",
            choices: [
              { label: "Nhờ người điều phối giao hai việc còn trống, và báo sếp: rủi ro trễ nếu báo giá không về trước thứ Năm", next: "good" },
              { label: "Không làm gì, vì việc 7 đã có lý do chờ nên không cần báo ai", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Báo giá về thứ Sáu chiều, hai việc trống vẫn chưa ai làm. Dự án trễ, và sếp hỏi vì sao thứ Tư đã thấy dấu hiệu mà không ai nói.",
            ending: "bad",
          },
          good: {
            text: "Hai việc trống có người nhận ngay chiều thứ Tư. Sếp biết rủi ro về báo giá nên chủ động gọi nhà cung cấp, và dự án kịp hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nhìn việc vào và việc ra mỗi ngày; hỏi người trước khi kết luận.",
          "Bài sau: đăng ký rủi ro ngắn, không chép cả sách vào.",
        ],
      },
    ],
  },
  {
    id: 2052,
    slug: "dang-ky-rui-ro-ngan-dung-tri-tuong-tuong",
    title: "Chặng 32, Bài 13: Đăng ký rủi ro ngắn, đừng chép cả sách vào",
    subtitle: "AI liệt kê 40 rủi ro nghe rất đúng và không rủi ro nào dùng được. Bạn chọn năm cái có tên người và dấu hiệu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚠️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản đăng ký rủi ro 40 dòng thường nằm im trong thư mục, vì không ai biết dòng nào là của mình. Năm rủi ro có người theo dõi và dấu hiệu báo thì được nhắc lại mỗi tuần. Rủi ro là thứ chưa xảy ra nên chỉ người đã ghi tên mới nhớ để nhìn.",
    openingQuestion:
      "AI đưa cho bạn 40 rủi ro cho dự án chuyển kho, như \"thiếu nhân lực\", \"thay đổi yêu cầu\", \"chậm tiến độ\". Vì sao danh sách này ít giá trị nhất?",
    openingOptions: [
      "Chung chung, không nói việc gì của dự án này đang có nguy cơ",
      "Quá dài, nên AI có thể đã bỏ sót vài rủi ro rất quan trọng khác",
      "Viết bằng tiếng Việt quá trang trọng nên nhân viên khó nhớ",
      "Không xếp theo thứ tự chữ cái nên khó tra cứu khi cần",
    ],
    correctOption: 0,
    explanation:
      "Rủi ro như \"thiếu nhân lực\" hay \"chậm tiến độ\" đúng với mọi dự án, nên không giúp ai làm gì khác đi. Rủi ro dùng được phải gắn vào chuyện cụ thể, ví dụ \"nhà cung cấp kệ chỉ hứa miệng ngày giao\". Độ dài không phải vấn đề chính, cách xếp chữ cái không giúp hành động, và giọng văn là chuyện phụ.",
    diagram: [
      { label: "AI liệt kê rủi ro chung cho loại dự án", arrow: true },
      { label: "Bạn lọc: chỉ giữ rủi ro có thật ở dự án này", arrow: true },
      { label: "Mỗi rủi ro: người theo dõi, dấu hiệu báo, việc làm nếu xảy ra", arrow: true },
      { label: "Xem lại đăng ký mỗi tuần trong buổi họp ngắn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: dự án chuyển văn phòng của một công ty nhỏ",
      description:
        "Trưởng dự án nhờ AI liệt kê rủi ro và nhận 40 dòng. Chị giữ năm dòng: hợp đồng thuê mới có thể chưa ký kịp, đội IT chỉ có một người biết cấu hình mạng, thợ sơn chưa chốt lịch, ba phòng ban chưa gửi danh sách thiết bị, và ngày nghỉ lễ rơi giữa tuần chuyển. Mỗi dòng có người theo dõi và một dấu hiệu báo. Đây là tình huống tưởng tượng, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Điều gì làm một rủi ro trong đăng ký trở nên dùng được?",
        [
          "Có người theo dõi, dấu hiệu báo và việc làm nếu nó xảy ra",
          "Có mức độ nghiêm trọng ghi bằng số từ 1 đến 10",
          "Được AI sắp xếp theo từng nhóm và đánh số thứ tự",
          "Được dùng lại từ đăng ký của một dự án tương tự cũ",
        ],
        "Rủi ro là thứ chưa xảy ra, nên chỉ người có tên và dấu hiệu rõ mới được nhìn đều. Con số nghiêm trọng, đánh số nhóm hay chép từ dự án cũ đều không tạo ra hành động. Nếu không ai biết dấu hiệu, không ai biết khi nào phải làm gì.",
      ),
      Q(
        "Rủi ro nào sau đây cụ thể đủ để theo dõi?",
        [
          "Nhà cung cấp kệ mới hứa miệng ngày giao 15/10, chưa có văn bản",
          "Có thể xảy ra chậm trễ trong quá trình chuyển kho",
          "Nhân lực có thể không đủ ở một số thời điểm của dự án",
          "Thay đổi bất ngờ có thể ảnh hưởng tới kết quả dự án",
        ],
        "Rủi ro đầu nêu ai, cái gì, ngày nào, và điều kiện thiếu (chưa có văn bản), nên có thể hỏi \"đã có xác nhận chưa\". Ba rủi ro còn lại đúng với mọi dự án và không chỉ ra việc gì cần làm khác đi ngay hôm nay.",
      ),
      Q(
        "Vì sao nên giữ khoảng năm rủi ro thay vì bốn mươi?",
        [
          "Đội chỉ theo dõi thật được số rủi ro nhỏ mỗi tuần",
          "Vì bốn mươi rủi ro chắc chắn có nhiều cái AI đã bịa ra",
          "Vì sếp chỉ chấp nhận đăng ký rủi ro dài tối đa một trang",
          "Vì càng ít rủi ro thì dự án càng ít khả năng gặp sự cố",
        ],
        "Khả năng theo dõi của một đội có hạn: năm rủi ro được nhắc mỗi tuần hiệu quả hơn bốn mươi rủi ro không ai đọc. Không phải rủi ro nào của AI cũng bịa, sếp không có quy tắc cố định về độ dài, và ghi ít rủi ro không làm sự cố ít đi, chỉ làm bạn bất ngờ hơn.",
      ),
      Q(
        "AI ghi: \"Theo thống kê, 70% dự án chuyển kho bị trễ.\" Bạn nên xử lý con số này thế nào?",
        [
          "Xoá đi, trừ khi bạn tìm được nguồn thật để đối chiếu",
          "Giữ lại vì con số cụ thể làm bản đăng ký thuyết phục hơn",
          "Đổi thành 60% cho đỡ đáng sợ khi đưa sếp xem",
          "Giữ lại nhưng ghi thêm là con số do AI cung cấp",
        ],
        "Đây là mẫu \"thống kê\" nghe chính xác mà AI thường bịa: không có tên khảo sát, năm hay đơn vị công bố. Nếu bạn không tìm được nguồn, xoá đi. Đổi con số hay ghi \"do AI cung cấp\" không làm nó đúng lên, chỉ đưa thêm một con số không kiểm chứng vào tài liệu.",
      ),
      Q(
        "Dấu hiệu báo của rủi ro \"nhà cung cấp có thể giao trễ\" nên viết thế nào?",
        [
          "Đến thứ Năm chưa có xác nhận vận đơn bằng văn bản",
          "Nhà cung cấp có vẻ không nhiệt tình trong các cuộc gọi",
          "Cảm giác chung của cả đội là việc này đang chậm lại",
          "Sếp hỏi thăm về tình hình giao hàng nhiều lần trong tuần",
        ],
        "Dấu hiệu tốt phải quan sát được và có mốc: \"đến thứ Năm chưa có xác nhận vận đơn\" ai cũng kiểm được. \"Có vẻ không nhiệt tình\" và \"cảm giác chung\" là cảm nhận cá nhân, còn sếp hỏi nhiều là phản ứng chứ không phải dấu hiệu của nhà cung cấp.",
      ),
    ],
    keyTakeaways: [
      "Rủi ro chung chung đúng với mọi dự án nên không giúp ai làm gì.",
      "Giữ khoảng năm rủi ro thật của dự án này, không phải bốn mươi.",
      "Mỗi rủi ro có người theo dõi, dấu hiệu quan sát được và việc làm nếu xảy ra.",
      "Con số \"theo thống kê\" của AI: không có nguồn thật thì bỏ.",
      "Xem lại đăng ký mỗi tuần, nếu không nó chỉ là tài liệu nằm trong thư mục.",
    ],
    practicePrompt: {
      question: "Rủi ro nào dưới đây đã sẵn sàng đưa vào đăng ký rủi ro của một dự án chuyển văn phòng?",
      options: [
        "Hợp đồng thuê tòa nhà mới chưa ký, chị Hà theo dõi, báo động nếu chưa ký vào thứ Sáu",
        "Có thể phát sinh các vấn đề liên quan tới hợp đồng thuê",
        "Rủi ro pháp lý, cần được theo dõi cẩn thận bởi cả đội",
        "Các vấn đề chưa lường trước, ảnh hưởng tới dự án",
      ],
      correct: 0,
      explanation:
        "Chỉ lựa chọn đầu có cả ba phần: việc cụ thể (hợp đồng chưa ký), người theo dõi (chị Hà) và dấu hiệu có mốc (chưa ký vào thứ Sáu). Ba lựa chọn còn lại nghe hợp lý nhưng không ai biết mình phải nhìn gì hay khi nào.",
    },
    summary: {
      keyIdea: "Đăng ký rủi ro ngắn với tên người và dấu hiệu tốt hơn danh sách dài không ai đọc.",
      formula: "Mỗi rủi ro = việc cụ thể + người theo dõi + dấu hiệu có mốc + việc làm nếu xảy ra.",
      commonMistake: "Chấp nhận danh sách AI đưa, kể cả những con số thống kê không có nguồn.",
      action: "Chọn năm rủi ro thật của dự án và viết đủ bốn phần cho mỗi cái.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một dự án bạn đang làm. Nhờ AI liệt kê rủi ro cho loại dự án đó, rồi bạn gạch bỏ mọi dòng chung chung, giữ lại năm dòng bạn thấy thật. Với mỗi dòng, viết tên người theo dõi, một dấu hiệu có mốc, và một việc làm nếu nó xảy ra.",
      secondary: "Ngày mai dashboard sẽ hỏi: bạn giữ những rủi ro nào, và có con số nào của AI bạn không tìm được nguồn phải xoá?",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp bảo: \"Làm cho anh cái đăng ký rủi ro.\" Bạn hỏi AI và trong 10 giây có 40 dòng. Chữ nào cũng đúng, nhưng đọc xong bạn không biết ngày mai phải làm gì khác. Bài này chỉ cách chọn năm dòng đáng giữ.",
      },
      {
        type: "feynman",
        title: "Đăng ký rủi ro đơn giản hơn bạn nghĩ",
        intro: "Trước khi đi xa bằng xe máy, bạn không kiểm 40 thứ. Bạn xem lốp, phanh, xăng, đèn, dầu - năm thứ mà nếu hỏng thì chuyến đi hỏng.",
        columns: ["Thành phần", "Kiểm xe trước chuyến đi", "Đăng ký rủi ro"],
        rows: [
          ["Số mục", "Vài thứ hay hỏng thật", "Khoảng năm rủi ro thật của dự án"],
          ["Dấu hiệu", "Lốp mòn, phanh mềm", "Điều quan sát được, có mốc thời gian"],
          ["Người kiểm", "Chính bạn", "Một người có tên"],
          ["Nếu hỏng", "Biết trước phải sửa hay đổi lịch", "Biết trước phải làm gì"],
        ],
        oneLiner: "Đăng ký rủi ro giống kiểm xe trước chuyến đi: vài thứ hay hỏng thật, có người xem và có dấu hiệu.",
      },
      { type: "heading", text: "AI liệt kê giỏi, chọn thì kém" },
      {
        type: "paragraph",
        text: "AI đã đọc rất nhiều dự án tương tự nên liệt kê rủi ro chung rất nhanh. Nhưng nó không biết nhà cung cấp của bạn hứa miệng, cũng không biết người duy nhất cấu hình mạng sắp nghỉ phép. Những rủi ro đó chỉ bạn biết.",
      },
      {
        type: "flow",
        title: "Từ 40 dòng của AI tới 5 dòng của bạn",
        steps: [
          { label: "AI liệt kê", detail: "Bạn cho AI biết loại dự án và ngày dự kiến, nhờ liệt kê rủi ro thường gặp. Đây là danh sách nguyên liệu, chưa phải kết quả." },
          { label: "Bạn gạch chung chung", detail: "Bỏ mọi dòng nghe đúng với mọi dự án: \"chậm tiến độ\", \"thiếu nhân lực\", \"thay đổi yêu cầu\"." },
          { label: "Thêm rủi ro của riêng bạn", detail: "Nghĩ tới điều chỉ bạn biết: hứa miệng, người duy nhất biết việc, ngày lễ trùng lịch." },
          { label: "Gắn người và dấu hiệu", detail: "Mỗi rủi ro: ai theo dõi, dấu hiệu quan sát được có mốc, việc làm nếu nó xảy ra." },
          { label: "Xem lại mỗi tuần", detail: "Năm phút đầu buổi họp: rủi ro nào đã đổi trạng thái, rủi ro mới nào xuất hiện." },
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận con số thống kê",
        text: "AI hay viết \"theo thống kê, x% dự án...\" mà không có tên khảo sát, năm hay nơi công bố. Không tìm được nguồn thật thì xoá con số đó, giữ lại phần ý nghĩa nếu cần.",
      },
      {
        type: "comparison",
        left: { label: "Rủi ro chung", text: "\"Thiếu nhân lực có thể làm chậm dự án.\" Không ai biết mình phải nhìn gì, không ai được giao." },
        right: { label: "Rủi ro cụ thể", text: "\"Chỉ anh Khoa biết cấu hình mạng và anh nghỉ phép 8-12/10.\" Có người, có mốc, có việc làm ngay: nhờ anh Khoa ghi lại cách làm trước ngày 7/10." },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đăng ký rủi ro do AI nháp",
        task: "Dự án: chuyển kho sang địa điểm mới. Bạn biết: hợp đồng thuê kho mới chưa ký, kệ hàng đã đặt nhưng nhà cung cấp chỉ hứa miệng ngày giao, chỉ anh Khoa biết cấu hình máy quét. AI nháp đăng ký rủi ro dưới đây. Đánh dấu những đoạn AI tự thêm hoặc không dùng được.",
        segments: [
          { text: "Rủi ro 1: Hợp đồng thuê kho mới chưa ký. Người theo dõi: chị Hà. Dấu hiệu: đến thứ Sáu chưa có bản ký." },
          {
            text: "Rủi ro 2: Theo thống kê, 70% dự án chuyển kho bị trễ hơn hai tuần.",
            error: "Không có nguồn, không có tên khảo sát. Đây là con số AI nghe quen nên viết ra; bạn không kiểm chứng được nên phải xoá.",
          },
          { text: "Rủi ro 3: Nhà cung cấp kệ mới chỉ hứa miệng ngày giao. Người theo dõi: anh Nam. Dấu hiệu: đến thứ Tư chưa có xác nhận bằng văn bản." },
          {
            text: "Rủi ro 4: Có thể xảy ra các vấn đề bất ngờ ảnh hưởng tới tiến độ chung.",
            error: "Câu này đúng với mọi dự án, không có người, không có dấu hiệu, nên không ai biết theo dõi gì. Phải cụ thể hoặc bỏ.",
          },
          {
            text: "Rủi ro 5: Nhà cung cấp máy quét đã xác nhận giao đúng hạn, không còn rủi ro.",
            error: "Bạn không cung cấp thông tin này cho AI; nhà cung cấp máy quét không hề xuất hiện trong dữ liệu. AI tự thêm một xác nhận không có thật.",
          },
          { text: "Rủi ro 6: Chỉ anh Khoa biết cấu hình máy quét. Dấu hiệu: anh Khoa vắng mặt. Việc làm: nhờ anh ghi lại cách làm trước thứ Sáu." },
        ],
      },
      {
        type: "scenario",
        title: "Buổi họp xem lại rủi ro thứ Hai",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Hai, đăng ký có năm rủi ro. Rủi ro 3 nói nhà cung cấp kệ phải xác nhận bằng văn bản đến thứ Tư. Nhưng nay là thứ Năm và anh Nam báo vẫn chưa có gì. Bạn làm gì?",
            choices: [
              { label: "Ghi thêm một dòng vào cuối bản đăng ký rồi để đó, vì đã ghi là đủ", next: "bad_note" },
              { label: "Đổi rủi ro 3 sang trạng thái đã xảy ra, bàn phương án khác ngay trong buổi họp", next: "s2" },
            ],
          },
          bad_note: {
            text: "Không ai nhìn dòng đó nữa. Hai tuần sau kệ không về, kho mới đứng trống, và sếp hỏi vì sao bản đăng ký ghi rõ mà không ai làm gì.",
            ending: "bad",
          },
          s2: {
            text: "Cả đội bàn: chờ thêm, đặt kệ ở nhà cung cấp khác, hay dùng kệ tạm. Việc làm nếu xảy ra đã ghi sẵn: hỏi báo giá nhà cung cấp dự phòng.",
            choices: [
              { label: "Gọi nhà cung cấp dự phòng ngay chiều nay để có báo giá, báo sếp quyết nếu chênh chi phí", next: "good" },
              { label: "Chờ thêm một tuần xem nhà cung cấp có phản hồi không", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Nhà cung cấp im lặng tiếp. Sau một tuần, phương án dự phòng chỉ còn giá cao hơn và giao muộn hơn, và dự án trễ đúng mức bản đăng ký đã cảnh báo.",
            ending: "bad",
          },
          good: {
            text: "Chiều nay có báo giá. Sếp duyệt phương án dự phòng vào sáng hôm sau. Kệ vẫn kịp trước ngày chuyển.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm rủi ro thật, mỗi cái có tên người và dấu hiệu, tốt hơn bốn mươi dòng chung chung.",
          "Bài sau: khách đòi thêm việc giữa chừng, và người có thẩm quyền quyết.",
        ],
      },
    ],
  },
  {
    id: 2053,
    slug: "tinh-huong-khach-doi-them-viec-giua-chung",
    title: "Chặng 32, Bài 14: Tình huống khách đòi thêm việc giữa chừng",
    subtitle: "\"Thêm cái nhỏ thôi\" hiếm khi nhỏ. Bạn không từ chối và không nhận bừa: bạn nêu cái giá và để người có quyền quyết.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Yêu cầu thêm giữa chừng là nguyên nhân quen thuộc khiến dự án trễ và vượt chi phí mà không ai chịu trách nhiệm: mỗi việc nhỏ được nhận bằng một chữ \"ok\", và cuối cùng dự án gánh ba mươi việc nhỏ. Bạn không có quyền từ chối khách, nhưng bạn có thể làm cho cái giá hiện ra để người có thẩm quyền quyết.",
    openingQuestion:
      "Khách nhắn: \"Thêm cho tôi cái báo cáo theo khu vực nữa nhé, nhỏ thôi.\" Dự án đang chạy đúng hạn. Cách xử lý nào tốt nhất?",
    openingOptions: [
      "Nêu việc thêm cần bao lâu và ảnh hưởng gì, rồi hỏi người có quyền quyết",
      "Đồng ý luôn cho khách vui và tự làm thêm ngoài giờ để kịp hạn",
      "Từ chối thẳng vì việc này không có trong hợp đồng ban đầu",
      "Hứa sẽ làm nếu còn thời gian, rồi làm khi nào rảnh thì làm",
    ],
    correctOption: 0,
    explanation:
      "Nhận ngay và làm thêm ngoài giờ giấu cái giá đi, nên lần sau khách sẽ nhờ tiếp và bạn không có căn cứ để dừng. Từ chối thẳng dễ làm mất quan hệ dù đôi khi yêu cầu thêm hợp lý. \"Rảnh thì làm\" khiến cả hai bên không biết bao giờ có việc. Nêu tác động rồi chuyển cho người có thẩm quyền giữ được quan hệ và không để bạn gánh một mình.",
    diagram: [
      { label: "Khách nhắn yêu cầu thêm", arrow: true },
      { label: "Bạn ước lượng: thêm bao nhiêu công, việc nào bị đẩy lùi", arrow: true },
      { label: "Viết phản hồi nêu tác động thời gian và chi phí", arrow: true },
      { label: "Người có thẩm quyền quyết: nhận, dời hạn hay đổi phạm vi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: dự án báo cáo bán hàng cho một khách hàng",
      description:
        "Đội bạn làm bộ báo cáo doanh thu theo tháng cho khách. Giữa chừng, khách nhắn thêm báo cáo theo khu vực và theo nhân viên. Bạn ước lượng hai ngày công cho báo cáo theo khu vực và ba ngày cho báo cáo theo nhân viên, rồi gửi phản hồi cho trưởng dự án kèm ba phương án. Con số ở đây là số liệu minh hoạ, không phải của một dự án có thật.",
    },
    quiz: [
      Q(
        "Một phản hồi tốt cho yêu cầu thêm phải có gì?",
        [
          "Việc thêm tốn bao lâu, đẩy lùi gì, và ai được quyền quyết",
          "Lời xin lỗi và lời hứa sẽ cố gắng hết sức để đáp ứng khách",
          "Danh sách tất cả yêu cầu thêm từ đầu dự án tới giờ, sắp theo ngày",
          "Một mẫu giá đầy đủ cho mọi thay đổi có thể xảy ra về sau",
        ],
        "Phản hồi tốt cho người quyết thấy cái giá: thời gian, chi phí, việc bị đẩy lùi. Lời xin lỗi và lời hứa cố gắng không nói được gì về tác động. Danh sách mọi yêu cầu cũ là tài liệu khác. Mẫu giá cho mọi thay đổi vượt xa phạm vi một yêu cầu đang cần quyết.",
      ),
      Q(
        "Ai nên quyết định nhận thêm yêu cầu của khách?",
        [
          "Người có thẩm quyền về phạm vi và chi phí của dự án",
          "Bất kỳ ai trong đội nhận được tin nhắn của khách",
          "AI, vì nó tính được tác động nhanh và khách quan",
          "Khách hàng, vì họ là người trả tiền cho dự án",
        ],
        "Nhận thêm việc là quyết định về phạm vi, thời gian và tiền, nên thuộc người có thẩm quyền đó (trưởng dự án hoặc người ký hợp đồng). AI giúp soạn phản hồi nhưng không có thẩm quyền. Khách được quyền đề nghị, nhưng khi việc thay đổi giá và hạn thì cần cả hai bên đồng ý.",
      ),
      Q(
        "AI viết bản phản hồi nháp: \"Việc này chỉ mất khoảng một ngày và không ảnh hưởng chi phí.\" Bạn chưa cung cấp số ước lượng nào. Điều gì đang xảy ra?",
        [
          "AI bịa con số để câu trả lời nghe dễ chịu với khách",
          "AI đã tính đúng vì nó biết dự án của bạn từ trước",
          "AI đã tra trong hợp đồng để lấy được con số một ngày",
          "AI đoán đúng vì việc thêm báo cáo thường là việc rất nhỏ",
        ],
        "AI không có dữ liệu dự án của bạn, nên \"một ngày\" và \"không ảnh hưởng chi phí\" chỉ là câu dễ nghe. Nó không đọc hợp đồng nếu bạn không đưa vào, và việc \"thường nhỏ\" không tính được cho dự án cụ thể. Con số phải do đội bạn ước lượng.",
      ),
      Q(
        "Sếp hỏi vì sao không nhận luôn việc thêm cho khách vui. Câu trả lời tốt nhất là gì?",
        [
          "Nhận cũng được, nhưng phải quyết cách bù thời gian trước",
          "Vì hợp đồng cấm nhận bất kỳ việc nào ngoài danh sách ban đầu",
          "Vì khách hàng thường không quan tâm dự án trễ vài ngày so với kế hoạch",
          "Vì đội không bao giờ đủ người cho việc phát sinh giữa chừng",
        ],
        "Câu trả lời trung thực: nhận hoàn toàn có thể, miễn là cái giá được quyết trước - dời hạn, thêm người hay bỏ một việc khác. Bạn không biết hợp đồng có cấm hay không nếu chưa đọc, và không nên hứa hay nói thay khách hoặc thay đội những điều chưa kiểm.",
      ),
      Q(
        "Sau khi người có thẩm quyền chọn \"nhận nhưng dời hạn 3 ngày\", việc tiếp theo là gì?",
        [
          "Ghi lại quyết định và báo cả hai bên bằng văn bản",
          "Không cần làm gì thêm vì mọi người đã biết miệng",
          "Cập nhật lịch riêng của bạn và giữ kín cho tới ngày giao",
          "Chờ khách nhắn hỏi về hạn mới rồi mới trả lời",
        ],
        "Quyết định miệng dễ bị hiểu khác nhau hoặc quên. Ghi lại và báo bằng văn bản cho cả hai bên giữ được hạn mới và cái giá đã thống nhất. Giữ kín làm khách bất ngờ khi giao, còn chờ khách hỏi khiến bạn phải chữa cháy thay vì chủ động.",
      ),
    ],
    keyTakeaways: [
      "\"Thêm cái nhỏ\" nào cũng có cái giá: thời gian, chi phí hoặc việc khác bị đẩy lùi.",
      "Việc của bạn là nêu tác động, không phải nhận hay từ chối một mình.",
      "Người có thẩm quyền về phạm vi và chi phí quyết; AI chỉ giúp soạn.",
      "Không để AI bịa số ước lượng: con số do đội bạn tính.",
      "Quyết định xong thì ghi lại và báo hai bên bằng văn bản.",
    ],
    practicePrompt: {
      question: "Khách nhắn thêm một báo cáo. Bạn ước lượng 2 ngày công, và đội đang kín lịch. Việc đầu tiên cần làm là gì?",
      options: [
        "Gửi trưởng dự án bản tóm tắt: việc thêm, 2 ngày công, việc bị đẩy lùi, các phương án",
        "Nhắn khách ngay rằng đội sẽ làm thêm và giao đúng hạn cũ",
        "Nhờ AI ước lượng thời gian để có con số khách quan hơn",
        "Chờ khách nhắc lại lần hai để biết chắc họ thật sự cần",
      ],
      correct: 0,
      explanation:
        "Trưởng dự án cần đủ dữ kiện để quyết: việc gì, mất bao nhiêu, ảnh hưởng gì, có phương án nào. Nhắn khách đồng ý là tự quyết thay người có thẩm quyền. Nhờ AI ước lượng là để một bên không biết đội làm con số thay đội. Chờ khách nhắc lại chỉ làm chậm phản hồi.",
    },
    summary: {
      keyIdea: "Bạn không nhận, không từ chối một mình: bạn làm cái giá hiện ra để người có quyền quyết.",
      formula: "Yêu cầu thêm = việc gì + mất bao lâu + đẩy lùi gì + các phương án.",
      commonMistake: "Đồng ý nhanh cho khách vui, rồi tự gánh thêm giờ làm.",
      action: "Lần tới có yêu cầu thêm, viết bốn dòng trên trước khi trả lời khách.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một yêu cầu thêm từng gặp ở dự án của bạn, hoặc lấy một yêu cầu đang chờ. Viết ra việc, thời gian bạn ước lượng và việc bị đẩy lùi. Nhờ AI soạn phản hồi ba phương án cho người quyết, rồi sửa mọi con số cho đúng ước lượng của bạn.",
      secondary: "Ngày mai dashboard sẽ hỏi: bạn đã sửa con số nào AI tự viết, và người quyết chọn phương án nào?",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, khách nhắn: \"Thêm cho tôi cái báo cáo theo khu vực nữa nhé, nhỏ thôi.\" Bạn nhìn lịch: cả đội kín tuần sau. Bài này dạy bạn viết câu trả lời không nhận bừa, không từ chối cụt.",
      },
      {
        type: "feynman",
        title: "Yêu cầu thêm giữa chừng đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới việc gọi món thêm giữa bữa ở quán ăn: khách nói \"thêm đĩa rau nhé\", nhưng bếp đang làm các món khác, nên bếp phải nói bao lâu và có ảnh hưởng món khác không.",
        columns: ["Thành phần", "Gọi thêm món giữa bữa", "Yêu cầu thêm giữa dự án"],
        rows: [
          ["Yêu cầu", "\"Thêm đĩa rau\"", "\"Thêm báo cáo theo khu vực\""],
          ["Cái giá", "Bao lâu, có làm chậm các món khác không", "Bao nhiêu công, việc nào bị đẩy lùi"],
          ["Người quyết", "Quản lý quán hoặc bếp trưởng", "Người có thẩm quyền về phạm vi và chi phí"],
          ["Cách nói", "\"Đĩa rau thêm 10 phút, món ra chậm chút\"", "\"Thêm hai ngày, hạn dời hoặc bỏ một việc khác\""],
        ],
        oneLiner: "Gọi thêm giữa bữa không bị từ chối, chỉ được báo giờ và ảnh hưởng: yêu cầu thêm trong dự án cũng vậy.",
      },
      { type: "heading", text: "Cái giá ẩn của chữ \"ok\"" },
      {
        type: "paragraph",
        text: "Một chữ \"ok\" cho việc nhỏ nghe rất dễ. Nhưng mười chữ \"ok\" như vậy là mười việc không có trong kế hoạch, không có trong hạn, và không ai được giao. Khi dự án trễ, không ai nhớ từng chữ \"ok\", chỉ thấy đội trễ.",
      },
      {
        type: "flow",
        title: "Từ tin nhắn của khách tới quyết định có văn bản",
        steps: [
          { label: "Nhận yêu cầu", detail: "Đọc kỹ khách muốn gì. Hỏi lại một câu nếu chưa rõ, nhưng chưa hứa gì." },
          { label: "Ước lượng cái giá", detail: "Bạn và đội ước lượng: bao nhiêu ngày công, có cần người thêm không, việc nào phải lùi. Đây là con số của đội, không phải của AI." },
          { label: "Soạn phản hồi ba phương án", detail: "AI giúp viết gọn: nhận và dời hạn, nhận và bỏ một việc khác, hoặc để giai đoạn sau. Bạn kiểm mọi con số." },
          { label: "Người có thẩm quyền quyết", detail: "Trưởng dự án hoặc người ký hợp đồng chọn phương án, vì họ chịu trách nhiệm về phạm vi và chi phí." },
          { label: "Ghi lại và báo hai bên", detail: "Quyết định được ghi bằng văn bản và gửi cả khách lẫn đội, để mọi người cùng hiểu một hạn." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Trả lời \"ok\" ngay", text: "Khách vui hôm nay. Đội gánh thêm việc không hạn, không ai biết dự án đã đổi. Lần sau khách nhờ tiếp." },
        right: { label: "Nêu tác động và chuyển người quyết", text: "Khách thấy mọi yêu cầu có cái giá. Người quyết chọn được phương án. Đội có căn cứ khi dự án đổi hạn." },
      },
      {
        type: "callout",
        label: "Việc AI không được quyết",
        text: "AI soạn phản hồi nhanh, nhưng nó không biết đội bạn mất bao lâu và không được hứa thay ai. Mọi con số về thời gian, chi phí và ngày giao phải do đội ước lượng và người có thẩm quyền duyệt. Về điều khoản hợp đồng, hỏi bộ phận pháp chế hoặc người ký hợp đồng.",
      },
      {
        type: "scenario",
        title: "Khách nhắn: \"Thêm cái nhỏ thôi\"",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ Sáu, khách nhắn: \"Thêm báo cáo theo khu vực nhé, nhỏ thôi.\" Bạn ước lượng 2 ngày công; đội đang kín lịch tuần sau, hạn giao vào thứ Sáu tuần sau. Bạn làm gì?",
            choices: [
              { label: "Trả lời khách: \"Được ạ, vẫn giao đúng hạn\", rồi tự làm thêm buổi tối", next: "bad_ok" },
              { label: "Soạn tóm tắt gửi trưởng dự án: việc thêm, 2 ngày công, việc bị lùi, hai phương án", next: "s2" },
            ],
          },
          bad_ok: {
            text: "Bạn làm thêm hai tối, nhưng khách nghĩ mọi yêu cầu đều đúng hạn và nhờ thêm báo cáo khác vào tuần sau. Bạn kiệt sức, hạn thứ Sáu vẫn trượt một ngày, và không ai ghi nhận việc thêm.",
            ending: "bad",
          },
          s2: {
            text: "AI nháp phản hồi và có câu \"Việc này chỉ mất khoảng nửa ngày, không ảnh hưởng chi phí.\" Bạn xử lý câu này thế nào?",
            choices: [
              { label: "Sửa thành 2 ngày công theo ước lượng của đội, ghi rõ việc bị lùi, rồi gửi", next: "good" },
              { label: "Giữ nguyên vì AI viết rất tự tin và trông hợp lý", next: "bad_ai" },
            ],
          },
          bad_ai: {
            text: "Trưởng dự án đọc \"nửa ngày\", đồng ý ngay và báo khách giao đúng hạn. Sau đó đội mất hai ngày, hạn thứ Sáu bị trượt, và trưởng dự án hỏi vì sao con số lại chênh.",
            ending: "bad",
          },
          good: {
            text: "Trưởng dự án đọc, chọn dời báo cáo thêm sang giai đoạn sau và báo khách bằng văn bản. Khách đồng ý, đội giữ được hạn thứ Sáu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi yêu cầu thêm có cái giá; bạn làm cái giá hiện ra, người có quyền quyết.",
          "Bài sau: gom mọi thứ vào một trang tiến độ và rủi ro cho dự án đang chạy.",
        ],
      },
    ],
  },
  {
    id: 2054,
    slug: "mini-project-bang-tien-do-va-rui-ro-mot-trang",
    title: "Chặng 32, Bài 15: Mini project: một trang tiến độ và rủi ro cho dự án đang chạy",
    subtitle: "Ba phần gói trong một trang: dự án đang ở đâu, ba rủi ro, và điều bạn cần sếp quyết.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp thường có ba phút và một câu hỏi: \"Dự án đang thế nào và tôi cần làm gì?\" Một trang cho ba phần trả lời cả hai. Làm được trang này bằng dữ liệu thật của bạn nghĩa là bạn đã gom cả ba bài trước: bảng có màu, dấu hiệu trễ sớm, và rủi ro có tên người.",
    openingQuestion:
      "Bạn có bảng tiến độ, đăng ký rủi ro và một yêu cầu thêm chưa quyết. Sếp cần một trang duy nhất. Thứ tự nào hợp lý nhất?",
    openingOptions: [
      "Trạng thái chung, ba rủi ro lớn nhất, rồi điều cần sếp quyết",
      "Toàn bộ bảng tiến độ trước, rủi ro và quyết định để ở phụ lục",
      "Lịch sử dự án từ ngày khởi động, rồi mới tới tình hình hiện tại",
      "Danh sách mọi việc đã xong trong tháng, rồi tới việc chưa xong",
    ],
    correctOption: 0,
    explanation:
      "Người đọc bận cần biết ngay tình hình chung, rồi tới điều đáng lo và điều họ phải làm. Đặt toàn bộ bảng trước hoặc để quyết định ở phụ lục làm điều quan trọng nhất bị chôn. Lịch sử dự án và danh sách việc đã xong là thông tin người đọc có thể hỏi sau, không phải điều họ cần trước.",
    diagram: [
      { label: "Lấy dữ liệu thật: bảng việc, đăng ký rủi ro, yêu cầu chờ quyết", arrow: true },
      { label: "Nhờ AI nháp một trang theo mẫu ba phần", arrow: true },
      { label: "Bạn đối chiếu từng con số và tên với dữ liệu gốc", arrow: true },
      { label: "Gửi sếp, kèm đúng một điều cần quyết" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: dự án triển khai quy trình mới ở một phòng kế toán",
      description:
        "Trưởng dự án gom ba nguồn: bảng việc 40 dòng, đăng ký rủi ro và một email xin thêm việc. Trang của chị có ba phần: trạng thái \"vàng\" kèm hai câu giải thích, ba rủi ro có người theo dõi, và một quyết định cần sếp trả lời trước thứ Năm. Sếp đọc trong hai phút và trả lời ngay trong buổi họp. Đây là tình huống tưởng tượng, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Trang tiến độ một trang nên có những phần nào?",
        [
          "Trạng thái chung, ba rủi ro, một quyết định cần từ sếp",
          "Danh sách đầy đủ mọi việc, người làm, ngày mở và ngày đóng",
          "Lịch sử dự án, biên bản mọi buổi họp, và thư từ với khách",
          "Lời giới thiệu dài về dự án và kế hoạch chi tiết cho quý sau",
        ],
        "Sếp đọc trang này để biết tình hình, điều đáng lo và việc mình phải làm. Danh sách đầy đủ, lịch sử họp hay lời giới thiệu dài đều là thông tin nền, để người đọc hỏi khi cần chứ không phải nội dung chính của một trang.",
      ),
      Q(
        "Nhờ AI nháp trang, bạn nên đưa AI gì?",
        [
          "Dữ liệu thật đã bỏ thông tin nhạy cảm, và mẫu ba phần",
          "Chỉ tên dự án, để AI tự nghĩ ra tình hình hợp lý",
          "Toàn bộ thư từ nội bộ để AI nắm hết bối cảnh dự án",
          "Chỉ mẫu ba phần, vì AI sẽ tự điền số liệu cho bạn",
        ],
        "AI viết đúng chỗ khi có dữ liệu thật; thiếu dữ liệu nó sẽ điền chữ nghe hợp lý. Bạn cũng không cần đưa toàn bộ thư từ, vì thêm dữ liệu nhạy cảm chỉ tăng rủi ro. Chỉ có mẫu mà không có số liệu, AI tự điền là bịa.",
      ),
      Q(
        "AI viết: \"Dự án đạt 85% tiến độ, dự kiến hoàn thành đúng hạn.\" Bảng của bạn chưa hề ghi phần trăm. Bạn nên làm gì?",
        [
          "Tự tính phần trăm từ bảng việc và viết lại theo số thật",
          "Giữ nguyên vì 85% là con số rất phổ biến ở giai đoạn này",
          "Đổi thành 80% cho khiêm tốn hơn rồi gửi sếp xem",
          "Thêm chữ \"khoảng\" trước 85% để câu bớt tuyệt đối",
        ],
        "Con số 85% do AI nghĩ ra, không nằm trong dữ liệu của bạn. Cách đúng là tính từ bảng: số việc xong chia tổng số việc, rồi viết lại. Đổi sang 80% vẫn là số bịa, và thêm \"khoảng\" không làm nó đúng hơn.",
      ),
      Q(
        "Phần \"cần sếp quyết\" nên viết thế nào?",
        [
          "Một câu hỏi có hai hoặc ba phương án và hạn trả lời",
          "Một đoạn văn dài mô tả mọi khó khăn của cả đội",
          "Một lời nhắn nhờ sếp quan tâm thêm tới dự án",
          "Một danh sách năm câu hỏi để sếp chọn câu muốn trả lời",
        ],
        "Sếp ra quyết định nhanh nhất khi có câu hỏi rõ, vài phương án và hạn trả lời. Đoạn văn dài mô tả khó khăn và lời nhờ quan tâm không cho sếp việc cụ thể để làm. Năm câu hỏi cùng lúc thì sếp không biết câu nào gấp.",
      ),
      Q(
        "Trước khi gửi sếp, bước kiểm nào không được bỏ?",
        [
          "Đối chiếu từng con số và tên người với dữ liệu gốc",
          "Kiểm xem trang có đủ màu sắc để nhìn bắt mắt",
          "Nhờ AI đọc lại và xác nhận là mọi thứ đã chính xác trước khi gửi đi",
          "Đếm số chữ để chắc trang không quá một trăm chữ",
        ],
        "Người gửi là bạn nên người chịu trách nhiệm cho từng con số cũng là bạn. Đối chiếu với dữ liệu gốc là kiểm chứng thật. Màu sắc và số chữ là chuyện trình bày. Nhờ AI xác nhận chính nó viết ra không phải kiểm chứng, vì nó có thể xác nhận luôn điều đã bịa.",
      ),
    ],
    keyTakeaways: [
      "Một trang ba phần: trạng thái, ba rủi ro, một quyết định cần từ sếp.",
      "Đưa AI dữ liệu thật đã bỏ thông tin nhạy cảm, không để nó tự điền số.",
      "Tự tính phần trăm tiến độ từ bảng việc; đừng nhận con số AI nghĩ ra.",
      "Phần cần quyết: câu hỏi rõ, vài phương án, hạn trả lời.",
      "Đối chiếu mọi số và tên với dữ liệu gốc trước khi gửi.",
    ],
    practicePrompt: {
      question: "Bảng có 40 việc: 26 xong, 9 đang làm, 5 chưa bắt đầu. Trang tiến độ nên ghi phần trăm việc xong là bao nhiêu?",
      options: [
        "65% (= 26 ÷ 40)",
        "85% (= (26 + 9) ÷ 40, tính cả việc đang làm)",
        "72,5% (= 29 ÷ 40, làm tròn sai số việc)",
        "80% (= 32 ÷ 40, tính theo việc sắp xong)",
      ],
      correct: 0,
      explanation:
        "Việc xong chỉ tính những việc đã đóng: 26 trên 40, tức 65%. Việc đang làm chưa xong nên không được cộng vào; cộng vào thì ra 87,5%, không phải 85%, và là lỗi phổ biến làm bảng đẹp hơn thực tế. Hai đáp án còn lại dùng số việc không có cơ sở trong bảng.",
    },
    summary: {
      keyIdea: "Một trang tốt cho sếp biết tình hình, điều đáng lo và việc mình phải quyết.",
      formula: "Trạng thái + ba rủi ro có người + một quyết định có hạn.",
      commonMistake: "Để AI điền phần trăm tiến độ hoặc ngày dự kiến mà bảng chưa hề ghi.",
      action: "Làm trang này cho dự án đang chạy của bạn và đối chiếu từng con số.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bảng việc, đăng ký rủi ro và một quyết định đang chờ của dự án thật của bạn (bỏ họ tên và số nhạy cảm). Nhờ AI nháp một trang ba phần. Tự tính phần trăm việc xong, đối chiếu ba rủi ro và tên người, rồi gửi cho một người đọc thử.",
      secondary: "Ngày mai dashboard sẽ hỏi: con số nào trong nháp AI bạn phải sửa, và người đọc thử nói gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhắn: \"Cho anh biết dự án đang thế nào, ba phút thôi.\" Bạn có bảng tiến độ, đăng ký rủi ro và một yêu cầu thêm chưa quyết, tất cả ở ba nơi khác nhau. Bài cuối này gom chúng lại thành một trang.",
      },
      {
        type: "feynman",
        title: "Trang tiến độ đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới tấm bảng thông báo ở cửa phòng khám: bệnh nhân không đọc cả hồ sơ, chỉ cần biết còn chờ bao lâu, ai đang khám, và mình cần làm gì tiếp.",
        columns: ["Thành phần", "Bảng ở cửa phòng khám", "Trang tiến độ dự án"],
        rows: [
          ["Tình hình", "Còn mấy người trước bạn", "Trạng thái xanh, vàng hay đỏ, kèm hai câu giải thích"],
          ["Điều đáng lo", "Bác sĩ đang có ca cấp cứu nên chậm", "Ba rủi ro có người theo dõi"],
          ["Việc cần làm", "Chờ ở ghế hay đi làm xét nghiệm", "Một quyết định cần sếp, có hạn trả lời"],
          ["Người đọc", "Người đang chờ, ít thời gian", "Sếp, có khoảng ba phút"],
        ],
        oneLiner: "Trang tiến độ là bảng thông báo ở cửa phòng khám: tình hình, điều đáng lo, và việc người đọc phải làm.",
      },
      { type: "heading", text: "Ba phần, một trang" },
      {
        type: "list",
        items: [
          "Phần 1 - Trạng thái: một màu theo tiêu chí ở bài 11, kèm phần trăm việc xong tính từ bảng và hai câu giải thích.",
          "Phần 2 - Ba rủi ro: lấy từ đăng ký rủi ro ở bài 13, mỗi cái có tên người theo dõi và dấu hiệu có mốc.",
          "Phần 3 - Cần sếp quyết: một câu hỏi có hai hoặc ba phương án và hạn trả lời, như phản hồi ở bài 14.",
        ],
      },
      {
        type: "flow",
        title: "Từ ba nguồn dữ liệu tới một trang",
        steps: [
          { label: "Gom dữ liệu thật", detail: "Bảng việc, đăng ký rủi ro và yêu cầu thêm đang chờ. Bỏ họ tên, lương và số nhạy cảm trước khi đưa cho AI." },
          { label: "Tự tính số", detail: "Phần trăm việc xong, số việc trễ, số việc đang chặn nhau: bạn tính từ bảng, không để AI tính." },
          { label: "AI nháp theo mẫu", detail: "Bạn đưa mẫu ba phần và dữ liệu; AI viết nháp câu chữ. Nó chỉ được dùng số bạn cung cấp." },
          { label: "Bạn đối chiếu", detail: "Mỗi con số, tên người và ngày trong nháp được đối chiếu với dữ liệu gốc. Số nào không tìm thấy trong dữ liệu thì xoá." },
          { label: "Gửi kèm một câu hỏi", detail: "Kết thúc trang bằng đúng một điều cần sếp trả lời, kèm hạn." },
        ],
      },
      {
        type: "callout",
        label: "AI thích điền chỗ trống",
        text: "Khi mẫu có ô \"tiến độ ...%\" mà bạn không đưa số, AI sẽ điền một con số nghe hợp lý như 85%. Bạn tự tính phần trăm từ bảng và đưa cho AI, hoặc để trống và tự điền.",
      },
      {
        type: "comparison",
        left: { label: "Nháp AI chưa kiểm", text: "Đọc trôi chảy, có phần trăm đẹp, ngày dự kiến rõ ràng. Nhưng phần trăm và ngày không nằm trong dữ liệu của bạn." },
        right: { label: "Trang đã đối chiếu", text: "Ít số hơn nhưng con số nào cũng truy được về bảng gốc. Khi sếp hỏi \"số này ở đâu ra\", bạn mở bảng trong năm giây." },
      },
      {
        type: "scenario",
        title: "Một trang gửi sếp lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ AI nháp trang một trang từ dữ liệu thật. Nháp ghi \"Tiến độ 85%, dự kiến hoàn thành đúng hạn, không có rủi ro lớn\". Bảng có 40 việc: 26 xong, 9 đang làm, 5 chưa làm. Bạn làm gì?",
            choices: [
              { label: "Gửi sếp ngay vì chữ nghĩa trôi chảy và có vẻ chuyên nghiệp", next: "bad_blind" },
              { label: "Tự tính phần trăm từ bảng, so lại với đăng ký rủi ro và viết lại nháp", next: "s2" },
            ],
          },
          bad_blind: {
            text: "Sếp báo lại cho khách rằng dự án đạt 85%. Tuần sau, khách hỏi vì sao con số của đội chỉ có 65% và hai rủi ro đã ghi trong đăng ký lại không có trong báo cáo.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tính ra 65% (26 trên 40). Trong đăng ký rủi ro còn ba rủi ro đang mở, một cái đã có dấu hiệu. Nháp còn thiếu phần cần quyết. Bạn hoàn thiện thế nào?",
            choices: [
              { label: "Viết 65%, nêu ba rủi ro có người và dấu hiệu, thêm một câu hỏi hai phương án có hạn trả lời", next: "good" },
              { label: "Xoá hết rủi ro và phần cần quyết để trang ngắn, chỉ giữ 65%", next: "bad_short" },
            ],
          },
          bad_short: {
            text: "Trang ngắn gọn nhưng sếp không biết điều gì đáng lo và cũng không có gì để quyết. Một rủi ro đã có dấu hiệu bị trôi qua, và tuần sau nó thành sự cố.",
            ending: "bad",
          },
          good: {
            text: "Sếp đọc trong hai phút, trả lời câu hỏi ngay và nhắc đội xử lý rủi ro đã có dấu hiệu. Trang được dùng lại làm mẫu cho báo cáo tuần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "scenario",
        title: "Người đọc thử hỏi ngược lại",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi trang cho đồng nghiệp đọc thử. Chị hỏi: \"Rủi ro số 2 ai theo dõi? Sao không thấy tên?\" Trong nháp, dòng đó không ghi người. Bạn làm gì?",
            choices: [
              { label: "Chọn đại một cái tên trong đội để dòng đó nhìn đủ", next: "bad_name" },
              { label: "Hỏi lại người điều phối để giao đúng người, rồi bổ sung tên và dấu hiệu", next: "good" },
            ],
          },
          bad_name: {
            text: "Người bị ghi tên không hề biết mình đang theo dõi rủi ro. Khi rủi ro xảy ra, không ai nhìn dấu hiệu, và đăng ký không cứu được gì.",
            ending: "bad",
          },
          good: {
            text: "Người điều phối giao rủi ro cho anh Nam. Anh xác nhận dấu hiệu và mốc, và trang đã sẵn sàng gửi sếp.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Trạng thái, ba rủi ro, một quyết định: một trang, mọi con số truy được về dữ liệu gốc.",
          "Bạn đã có đủ bộ công cụ cho phần theo dõi tiến độ và rủi ro của chặng này.",
        ],
      },
    ],
  },
];
