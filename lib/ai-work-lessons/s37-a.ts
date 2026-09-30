import type { Lesson } from "../lesson-types";

// Chặng 37, bài 1-5. Giáo trình: scripts/curriculum/stage-37.json.
// Không nêu tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm kết quả.

type Q = Lesson["quiz"][number];
const q = (question: string, correct: string, d1: string, d2: string, d3: string, explanation: string): Q => ({
  question,
  options: [correct, d1, d2, d3],
  correct: 0,
  explanation,
});

export const S37_A_LESSONS: Lesson[] = [
  {
    id: 2140,
    slug: "doc-nhanh-ba-bao-gia-khac-cach-trinh-bay",
    title: "Chặng 37, Bài 1: Đọc nhanh ba báo giá trình bày mỗi nơi một kiểu",
    subtitle: "Ba nhà cung cấp nói ba thứ tiếng: bạn cần một cái bảng chung trước khi so giá.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người làm mua hàng hay chọn nhầm vì so hai con số không cùng loại: giá đã có thuế với giá chưa có thuế, giá một cái với giá một thùng. Đưa ba báo giá về một bảng chung là bước rẻ nhất để không trả thêm tiền vì một cột bị hiểu sai.",
    openingQuestion:
      "Thứ Hai bạn nhận ba báo giá cho cùng một loại hộp carton: một file PDF, một file Excel và một tin nhắn dài. Bạn nhờ AI đọc giúp. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Yêu cầu AI đưa cả ba về cùng một bảng, có cột đơn vị và cột thuế",
      "Nhờ AI nói ngay nhà nào rẻ nhất để gọi chốt trong buổi sáng",
      "Chỉ dán file Excel vì nó gọn nhất, hai báo giá kia để sau và so sau",
      "Nhờ AI viết lại ba báo giá cho cùng một giọng văn dễ đọc",
    ],
    correctOption: 0,
    explanation:
      "Trước khi so giá phải so cùng loại: cùng đơn vị tính, cùng có hoặc không có thuế, cùng điều kiện giao. Bảng chung buộc mỗi thông tin nằm đúng một cột, nên chỗ nào thiếu là lộ ra ngay. Hỏi thẳng nhà nào rẻ nhất sẽ nhận về một con số nghe chắc chắn nhưng có thể so hai thứ khác loại. Bỏ bớt báo giá thì mất phương án, còn viết lại giọng văn không làm số liệu sạch hơn.",
    diagram: [
      { label: "Thu ba báo giá: PDF, Excel, tin nhắn", arrow: true },
      { label: "Nhờ AI chép vào một bảng chung", arrow: true },
      { label: "Bạn kiểm đơn vị và thuế từng dòng với bản gốc", arrow: true },
      { label: "Ô nào thiếu thì ghi rõ để hỏi lại nhà cung cấp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng đồ gia dụng nhỏ",
      description:
        "Chị chủ cửa hàng nhận ba báo giá hộp carton. Hai nơi ghi giá một cái, một nơi ghi giá một thùng 100 cái. Khi nhìn lướt, nơi giá một thùng trông rẻ hơn hẳn. Sau khi đưa cả ba về giá một cái, chị thấy nơi đó thực ra đắt hơn. Đây là ví dụ minh hoạ, không phải số liệu của một công ty thật.",
    },
    quiz: [
      q(
        "Ba báo giá cho cùng một mặt hàng nhưng khác định dạng. Cách xử lý đúng là gì?",
        "Đưa về một bảng chung: cùng cột, cùng đơn vị tính, cùng cách ghi thuế",
        "So thẳng con số nổi bật nhất ở đầu mỗi báo giá",
        "Chọn báo giá trình bày chuyên nghiệp nhất để chắc uy tín",
        "Nhờ AI cho biết nhà nào tốt nhất rồi liên hệ chốt luôn",
        "Chỉ bảng chung mới cho phép so sánh công bằng. Con số ở đầu báo giá có thể là giá một thùng hay giá chưa thuế, trình bày đẹp không nói gì về giá, còn hỏi thẳng AI sẽ nhận một kết luận chưa ai kiểm chứng.",
      ),
      q(
        "Báo giá A ghi 96.000 đồng một thùng 24 cái. Báo giá B ghi 4.200 đồng một cái. Rẻ hơn theo giá một cái là bên nào?",
        "A rẻ hơn: 4.000 đồng một cái (= 96.000 / 24)",
        "A, vì 96.000 đồng nhỏ hơn nhiều so với 4.200 đồng",
        "B, vì 4.200 đồng là con số nhiều chữ số hơn",
        "A, vì hàng đóng thùng luôn rẻ hơn hàng bán lẻ",
        "Giá một cái của A là 96.000 chia 24 bằng 4.000 đồng, tức A rẻ hơn B. So 96.000 với 4.200 là so thùng với cái, còn bốn phương án nhiễu đều bỏ bước quy đổi về cùng đơn vị.",
      ),
      q(
        "Nhờ AI đưa báo giá vào bảng, bạn kiểm lại điều gì đầu tiên?",
        "Từng con số, đơn vị và thuế so với bản gốc",
        "Số cột của bảng, vì bảng nhiều cột thì trông đầy đủ hơn",
        "Độ dài câu chữ ở cột ghi chú của AI, có văn vẻ và dễ đọc",
        "Màu sắc và cách trình bày để bảng đẹp trước khi gửi đi",
        "AI chép sai số hoặc gộp nhầm thuế rất dễ, và lỗi đó nằm trong con số chứ không nằm ở hình thức. Số cột, câu chữ ghi chú hay màu sắc đều là chuyện trình bày, không giúp bạn biết bảng có đúng với bản gốc hay chưa.",
      ),
      q(
        "Báo giá dạng tin nhắn không nói rõ có gồm thuế hay không. Bảng chung nên ghi thế nào?",
        "Để ô thuế là \"chưa rõ\" và đánh dấu để hỏi lại",
        "Điền \"đã gồm thuế\" vì phần lớn báo giá đều đã gồm",
        "Điền \"chưa gồm thuế\" rồi cộng thêm phần trăm thuế cho an toàn",
        "Bỏ cột thuế vì báo giá này không nhắc tới",
        "Điều chưa được nói thì không được đoán. Điền bừa \"đã gồm\" hay \"chưa gồm\" rồi cộng thêm đều tạo ra một con số không có trong báo giá, còn bỏ cột thì giấu mất chỗ cần hỏi. Ô \"chưa rõ\" giữ đúng sự thật và chỉ ra việc cần làm.",
      ),
      q(
        "Vì sao nên đưa cả file PDF gốc cho AI thay vì chỉ gõ lại vài con số?",
        "Để AI chép đúng từ nguồn và bạn đối chiếu lại được",
        "Vì file PDF luôn có nhiều thông tin hơn tin nhắn",
        "Vì AI đọc PDF không bao giờ nhầm chữ số như đọc chữ gõ tay",
        "Vì gõ lại số bằng tay bị cấm trong quy trình mua hàng",
        "Nguồn gốc cho phép AI trích đúng chỗ và bạn mở bản gốc để kiểm. Nhưng AI vẫn có thể đọc nhầm chữ số, nên không phải \"không bao giờ nhầm\". Chuyện PDF nhiều thông tin hơn hay quy trình cấm gõ tay đều là điều bịa thêm cho hợp lý.",
      ),
    ],
    keyTakeaways: [
      "Muốn so giá, phải đưa các báo giá về cùng một bảng, cùng đơn vị, cùng cách ghi thuế.",
      "AI giỏi chép và sắp xếp; bạn giỏi kiểm với bản gốc.",
      "Ô nào báo giá chưa nói thì ghi \"chưa rõ\", không đoán.",
      "Quy đổi về giá một cái trước khi kết luận nhà nào rẻ hơn.",
    ],
    practicePrompt: {
      question:
        "Báo giá X ghi 250.000 đồng một hộp 50 cái, chưa thuế. Báo giá Y ghi 5.400 đồng một cái, đã có thuế. Bước đúng để so hai bên là gì?",
      options: [
        "Quy cả hai về giá một cái và cùng có hoặc cùng chưa có thuế",
        "So thẳng 250.000 với 5.400 rồi chọn số nhỏ hơn",
        "Chọn Y vì nó ghi giá một cái nên dễ hiểu hơn",
        "Chọn X vì hộp 50 cái thường là quy cách rẻ hơn",
      ],
      correct: 0,
      explanation:
        "X là 250.000 chia 50 bằng 5.000 đồng một cái chưa thuế, trong khi Y đã gồm thuế, nên chưa thể kết luận. Phải đưa về cùng loại rồi mới so. So thẳng 250.000 với 5.400 là so hộp với cái. Chọn theo cách ghi hay theo quy cách đều bỏ bước kiểm tra.",
    },
    summary: {
      keyIdea: "Không so được ba báo giá cho tới khi chúng nằm trong một bảng cùng đơn vị và cùng thuế.",
      formula: "Báo giá thô → bảng chung (AI chép) → đối chiếu bản gốc (bạn) → ô thiếu thì hỏi lại.",
      commonMistake: "So con số to nhất trên trang mà không xem nó là giá một cái hay một thùng, đã thuế hay chưa.",
      action: "Lấy ba báo giá gần nhất của bạn và dựng bảng chung, đánh dấu mọi ô \"chưa rõ\".",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm ba báo giá hoặc bảng giá thật gần đây của công ty bạn cho cùng một loại hàng. Nhờ AI đưa vào một bảng có cột: nhà cung cấp, đơn vị tính, giá, thuế, phí giao, ghi chú. Sau đó đối chiếu ít nhất năm ô với bản gốc và ghi lại ô nào AI chép sai hoặc bạn thấy còn thiếu.",
      secondary: "Mai bạn sẽ được hỏi: có bao nhiêu ô \"chưa rõ\" trong bảng và bạn định hỏi ai?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, hộp thư của bạn có ba báo giá cho cùng một món hàng: một file PDF có logo, một bảng Excel nhiều sheet và một tin nhắn dài. Chưa cần chọn nhà nào, việc cần làm trước là làm cho ba thứ đó nói cùng một ngôn ngữ.",
      },
      {
        type: "feynman",
        title: "Đưa ba báo giá về một bảng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới ba người bạn cùng kể về giá cà phê: một người nói theo ly, một người theo cân, một người theo ly cỡ lớn. Bạn không so được cho tới khi hỏi cùng một câu: một ly cỡ như nhau là bao nhiêu?",
        columns: ["Thành phần", "Ba người kể giá cà phê", "Ba báo giá"],
        rows: [
          ["Cách nói", "Mỗi người một đơn vị: ly, cân, ly lớn", "Mỗi nơi một kiểu: giá cái, giá thùng, có hoặc chưa thuế"],
          ["Việc cần làm", "Quy về giá một ly cỡ như nhau", "Quy về giá một đơn vị cùng thuế, cùng điều kiện giao"],
          ["Ai giúp", "Bạn tự nhẩm hoặc ghi ra giấy", "AI chép vào bảng, bạn đối chiếu với bản gốc"],
        ],
        oneLiner: "Chỉ so được khi mọi thứ nằm cùng đơn vị: bảng chung là cái thước đo chung.",
      },
      { type: "heading", text: "Vấn đề: cùng một món hàng, ba cách kể" },
      {
        type: "paragraph",
        text: "Nhà cung cấp trình bày theo thói quen của họ. Một nơi ghi giá một thùng, một nơi ghi giá một cái chưa thuế, nơi thứ ba viết trong tin nhắn và nhắc thuế ở một câu cuối. Đọc bằng mắt thì dễ bỏ sót, nhất là khi đang có mười việc khác cần làm.",
      },
      {
        type: "flow",
        title: "Từ ba báo giá lộn xộn tới một bảng dùng được",
        steps: [
          { label: "Thu đủ ba bản gốc", detail: "Giữ nguyên file và tin nhắn gốc trong một thư mục. Bạn sẽ quay lại đối chiếu, nên đừng chỉ giữ bản đã sửa." },
          { label: "Đặt trước các cột", detail: "Bạn nói với AI các cột cần có: nhà cung cấp, đơn vị tính, giá, thuế, phí giao, thời hạn hiệu lực, ghi chú." },
          { label: "AI chép vào bảng", detail: "AI trích từng thông tin từ mỗi báo giá vào đúng cột. Chỗ nào bản gốc không nói, yêu cầu nó ghi \"chưa rõ\" chứ không đoán." },
          { label: "Bạn đối chiếu với bản gốc", detail: "Mở bản gốc, kiểm từng dòng về số, đơn vị, thuế. Đây là bước không giao được cho AI." },
          { label: "Ghi lại việc cần hỏi", detail: "Mọi ô \"chưa rõ\" trở thành một câu hỏi gửi nhà cung cấp, tách riêng khỏi bảng." },
        ],
      },
      {
        type: "list",
        items: [
          "Cột đơn vị tính: cái, hộp, thùng, cuộn. Ghi cả quy cách, ví dụ \"thùng 24 cái\".",
          "Cột thuế: ghi rõ \"đã gồm\" hoặc \"chưa gồm\", không để trống.",
          "Cột điều kiện: phí giao, thời hạn hiệu lực, số lượng đặt tối thiểu.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gom ba báo giá vào một bảng",
        task: "Bạn có ba báo giá hộp carton từ ba nơi khác nhau và muốn AI dựng một bảng để so. Lắp yêu cầu sao cho bảng dùng được ngay.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "So giúp tôi ba báo giá này.", feedback: "AI không biết bạn cần so gì. Nó sẽ tự chọn tiêu chí và có thể chỉ so mỗi con số to nhất." },
              { text: "Tôi đang mua hộp carton cho kho. Đây là ba báo giá gốc dán nguyên văn, tôi cần bảng để so cùng điều kiện.", good: true, feedback: "AI biết mục đích và có dữ liệu gốc để trích, nên bảng bám vào văn bản chứ không bịa." },
            ],
          },
          {
            id: "columns",
            label: "Khuôn bảng",
            options: [
              { text: "Làm bảng cho đẹp.", feedback: "Đẹp không phải yêu cầu. Bạn sẽ nhận bảng thiếu đơn vị hoặc thuế và phải hỏi đi hỏi lại." },
              { text: "Cột: nhà cung cấp, đơn vị tính, giá, thuế đã gồm hay chưa, phí giao, hiệu lực, ghi chú.", good: true, feedback: "Mỗi thông tin có đúng một chỗ, nên chỗ nào thiếu là thấy ngay." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc khi thiếu tin",
            options: [
              { text: "Ô nào thiếu thì tự điền giá trị hợp lý nhất.", feedback: "Đây chính là đường dẫn tới số bịa: AI điền một con số nghe hợp lý mà không nơi nào ghi." },
              { text: "Ô nào bản gốc không nói thì ghi \"chưa rõ\", không đoán.", good: true, feedback: "Chỗ trống được giữ nguyên, để bạn biến nó thành câu hỏi gửi nhà cung cấp." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "columns", "rule"],
            text: "| Nhà cung cấp | Đơn vị | Giá | Thuế | Phí giao | Hiệu lực |\n| A | thùng 100 cái | 430.000 | chưa gồm | miễn phí | 30 ngày |\n| B | 1 cái | 4.500 | đã gồm | chưa rõ | chưa rõ |\n| C | thùng 50 cái | 240.000 | chưa rõ | 150.000 | 7 ngày |\n\nCác ô \"chưa rõ\" cần hỏi lại. (Số liệu minh hoạ.)",
          },
          {
            requires: ["context"],
            text: "So sánh: nhà B có vẻ rẻ nhất vì giá thấp nhất trong ba báo giá.\n\n(Có dữ liệu gốc nhưng thiếu khuôn bảng, nên AI so ba con số không cùng đơn vị và kết luận vội.)",
          },
          {
            text: "Ba nhà đều có giá cạnh tranh. Nhà A bao gồm miễn phí giao hàng toàn quốc và bảo hành 12 tháng.\n\n(AI không có dữ liệu gốc nên tự bịa \"miễn phí giao toàn quốc\" và \"bảo hành 12 tháng\", hai điều không ai nói.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Tên và giá công ty trong báo giá là dữ liệu của công ty bạn. Chỉ dán vào công cụ AI mà công ty cho phép, và bỏ những thông tin không cần cho việc so giá, ví dụ số điện thoại cá nhân của người bán.",
      },
      {
        type: "scenario",
        title: "Bảng AI vừa lập trông rất gọn",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả về bảng ba nhà cung cấp. Nhà B ghi \"4.500 đồng, đã gồm thuế\" nhưng ô phí giao và hiệu lực trống. Sếp hỏi lúc 4 giờ chiều: \"Chốt nhà B được chưa?\"",
            choices: [
              { label: "Báo sếp chốt B vì bảng đã rõ, còn ô trống để sau", next: "bad_rush" },
              { label: "Mở báo giá gốc của B, kiểm giá và thuế rồi xem chỗ nào còn thiếu", next: "s2" },
            ],
          },
          bad_rush: {
            text: "Tuần sau kế toán báo B tính thêm phí giao 300.000 đồng mỗi chuyến và báo giá chỉ có hiệu lực 7 ngày, đã hết hạn. Giá phải đàm phán lại.",
            ending: "bad",
          },
          s2: {
            text: "Trong tin nhắn của B, bạn thấy thuế \"đã gồm\" đúng, nhưng không có chữ nào về phí giao hay hiệu lực. Hai ô đó đúng là chưa rõ.",
            choices: [
              { label: "Trả lời sếp: \"B có vẻ rẻ, nhưng em cần hỏi B hai điều rồi mới chốt\"", next: "good" },
              { label: "Tự điền \"miễn phí giao, hiệu lực 30 ngày\" cho bảng đẹp", next: "bad_invent" },
            ],
          },
          bad_invent: {
            text: "Bảng gửi sếp giờ có hai thông tin không nguồn nào ghi. Sếp dựa vào đó để duyệt, và khi B tính phí giao thì bạn không có căn cứ nào để giải thích.",
            ending: "bad",
          },
          good: {
            text: "Sếp thấy bạn nói rõ việc đã chắc và việc còn hỏi. Hai câu hỏi gửi B trong 5 phút, và quyết định được đưa ra khi đã đủ thông tin.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba báo giá chỉ so được khi nằm trong một bảng: cùng đơn vị, cùng thuế, cùng điều kiện.",
          "Bài sau: soạn email hỏi nhà cung cấp những điều báo giá chưa nói.",
        ],
      },
    ],
  },
  {
    id: 2141,
    slug: "hoi-lai-nha-cung-cap-dieu-bao-gia-chua-noi",
    title: "Chặng 37, Bài 2: Hỏi lại nhà cung cấp những điều báo giá chưa nói",
    subtitle: "Một email ngắn, lịch sự, hỏi đúng ba điều còn thiếu, tốt hơn một cuộc gọi hỏi lung tung.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "✉️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Báo giá thiếu phí vận chuyển hay thời hạn hiệu lực là chỗ chi phí ẩn nằm. Một email hỏi bổ sung viết rõ ràng buộc nhà cung cấp trả lời bằng chữ, để bạn có căn cứ về sau thay vì chỉ có lời nói qua điện thoại.",
    openingQuestion:
      "Báo giá của nhà cung cấp ghi giá hàng nhưng không nhắc phí vận chuyển hay thời hạn hiệu lực. Bạn nhờ AI soạn email hỏi lại. Nội dung nào nên có trong email?",
    openingOptions: [
      "Nêu rõ hai điều cần hỏi và xin họ trả lời bằng văn bản",
      "Lời khen báo giá và đề nghị giảm giá thêm mười phần trăm",
      "Đoán phí vận chuyển giúp họ và hỏi họ có đồng ý trước không",
      "Câu hỏi chung: \"Anh chị có thể cho thêm thông tin không?\"",
    ],
    correctOption: 0,
    explanation:
      "Email tốt hỏi đúng những điều còn thiếu, mỗi ý một dòng, và nhờ họ trả lời bằng chữ để có căn cứ sau này. Xin giảm giá là một việc khác và làm loãng câu hỏi. Tự đoán phí thay họ có thể tạo ra một con số họ vô tình đồng ý. Câu hỏi quá chung chung khiến họ trả lời một dòng mơ hồ, và bạn lại phải hỏi thêm.",
    diagram: [
      { label: "Liệt kê điều báo giá chưa nói", arrow: true },
      { label: "AI soạn nháp: mỗi câu hỏi một dòng", arrow: true },
      { label: "Bạn kiểm giọng văn và không có lời hứa thừa", arrow: true },
      { label: "Gửi và ghi lại ngày chờ trả lời" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên mua hàng ở công ty in ấn",
      description:
        "Một nhân viên nhận báo giá giấy in nhưng không thấy phí giao. Cô gọi điện, người bán nói miệng \"miễn phí\". Tới lúc giao, hoá đơn có thêm dòng phí vận chuyển và không ai nhớ đã nói gì. Lần sau cô gửi email ngắn hỏi ba ý và lưu câu trả lời. Đây là ví dụ minh hoạ.",
    },
    quiz: [
      q(
        "Vì sao nên hỏi lại nhà cung cấp bằng email thay vì chỉ gọi điện?",
        "Câu trả lời bằng chữ là căn cứ để đối chiếu về sau",
        "Vì gọi điện thoại làm nhà cung cấp mất thiện cảm với bạn ngay",
        "Vì email luôn được trả lời nhanh hơn điện thoại trong mọi trường hợp",
        "Vì email không cần đọc lại trước khi gửi đi cho họ",
        "Điều nhà cung cấp viết ra có thể mở lại khi hoá đơn khác với lời hứa. Gọi điện không làm mất thiện cảm, và email không đảm bảo nhanh hơn. Email vẫn cần đọc lại kỹ, vì bạn là người chịu trách nhiệm cho từng câu trong đó.",
      ),
      q(
        "Bạn cần hỏi ba điều: phí giao, hiệu lực báo giá, số lượng tối thiểu. Cách trình bày tốt nhất?",
        "Ba câu hỏi đánh số, mỗi câu một dòng",
        "Một đoạn văn dài kể chuyện, ba câu hỏi nằm lẫn bên trong",
        "Chỉ hỏi phí giao, hai điều còn lại chờ họ tự nói ra sau",
        "Một câu duy nhất: \"Vui lòng cho thêm các thông tin còn lại\"",
        "Câu hỏi đánh số buộc người trả lời trả lời từng ý, và bạn dễ thấy ý nào bị bỏ sót. Đoạn văn dài che mất câu hỏi, còn một câu chung chung cho phép họ trả lời qua loa. Chỉ hỏi một ý khiến hai chỗ hở còn lại vẫn không có lời đáp.",
      ),
      q(
        "AI soạn nháp email có câu \"Chúng tôi sẵn sàng đặt 2.000 cái ngay tuần này\". Bạn chưa hề định đặt như vậy. Nên làm gì?",
        "Xoá hoặc sửa câu đó trước khi gửi",
        "Giữ lại vì email nên thể hiện thiện chí mua hàng",
        "Giữ lại và đợi xem họ có phản hồi hay không",
        "Nhờ AI viết lại câu đó nhưng vẫn giữ con số 2.000",
        "AI hay thêm lời cam kết để email nghe tích cực. Một con số đặt hàng bạn chưa quyết là điều nhà cung cấp có thể xem như đơn hàng. Giữ lại, chờ phản hồi hay chỉnh lại câu đều để nguyên con số bạn chưa hề đồng ý.",
      ),
      q(
        "Bạn nhờ AI soạn email hỏi lại. Thông tin nào nên đưa cho AI để nó viết đúng?",
        "Tên món hàng, mã báo giá và những điều cụ thể bạn muốn hỏi",
        "Toàn bộ hợp đồng khung với nhà cung cấp kèm điều khoản bảo mật",
        "Chỉ một câu \"viết email hỏi nhà cung cấp\" để AI tự chọn ý",
        "Giá mà đối thủ của họ đã báo để tạo áp lực đàm phán",
        "AI cần đủ dữ kiện để hỏi đúng: món hàng, mã báo giá, điều còn thiếu. Đưa cả hợp đồng khung là gửi nhiều dữ liệu hơn mức cần, còn một câu quá ngắn thì AI phải bịa chi tiết. Nêu giá đối thủ là chuyện đàm phán chứ không phải câu hỏi làm rõ.",
      ),
      q(
        "Sau khi gửi email hỏi, hai ngày chưa có trả lời. Việc hợp lý là gì?",
        "Nhắn nhắc lại ngắn gọn, nhắc đúng ba câu hỏi đang chờ",
        "Coi như họ đồng ý các điều kiện phổ biến rồi đặt hàng luôn",
        "Gửi thêm một email dài hơn, kể lại toàn bộ câu chuyện từ đầu",
        "Chọn luôn nhà cung cấp khác mà không nhắn họ một chữ nào",
        "Im lặng không phải là đồng ý, và nó cũng chưa phải là từ chối. Nhắn nhắc ngắn gọn giữ cuộc trao đổi mở mà không tốn công. Đặt hàng khi chưa có trả lời là chấp nhận rủi ro chi phí, còn email dài hay bỏ đi không nhắn đều tốn thời gian hoặc cơ hội.",
      ),
    ],
    keyTakeaways: [
      "Hỏi đúng những điều báo giá chưa nói: phí giao, hiệu lực, số lượng tối thiểu.",
      "Mỗi câu hỏi một dòng, đánh số, xin trả lời bằng chữ.",
      "AI soạn nháp; bạn xoá mọi lời cam kết mà bạn chưa hề quyết.",
      "Ghi ngày gửi để nhắc lại khi chưa có trả lời.",
    ],
    practicePrompt: {
      question:
        "Báo giá ghi \"giá tại kho\" và không nói giao hàng thế nào. Câu hỏi nào làm rõ tốt nhất?",
      options: [
        "\"Giá này đã gồm vận chuyển tới kho chúng tôi chưa? Nếu chưa, phí là bao nhiêu?\"",
        "\"Anh chị cho hỏi thêm về việc giao hàng của báo giá này nhé?\"",
        "\"Giá tại kho chắc là chưa có phí giao, đúng không anh chị?\"",
        "\"Anh chị giảm giúp chúng tôi vì phải tự chở hàng về kho nhé?\"",
      ],
      correct: 0,
      explanation:
        "Câu đúng hỏi một điều cụ thể, có thể trả lời bằng có hoặc không rồi bằng một con số. Câu thứ hai quá chung chung. Câu thứ ba tự đoán thay họ. Câu thứ tư xin giảm giá thay vì làm rõ điều kiện.",
    },
    summary: {
      keyIdea: "Chỗ báo giá im lặng là chỗ chi phí ẩn: hỏi bằng chữ, hỏi từng ý.",
      formula: "Điều chưa rõ → câu hỏi đánh số → AI soạn nháp → bạn xoá lời hứa thừa → gửi → ghi ngày.",
      commonMistake: "Hỏi bằng một câu chung chung hoặc chỉ gọi điện, nên không có gì để đối chiếu về sau.",
      action: "Chọn một báo giá đang thiếu thông tin và viết ra ba câu hỏi cần làm rõ.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một báo giá thật còn thiếu ít nhất một thông tin, ví dụ phí giao hoặc hiệu lực. Nhờ AI soạn email hỏi bổ sung, tối đa 120 chữ, ba câu hỏi đánh số. Đọc lại, xoá mọi con số hay lời hứa bạn không tự viết, rồi lưu bản nháp (chưa cần gửi).",
      secondary: "Mai bạn sẽ được hỏi: email đã gửi chưa, và AI có thêm câu nào bạn phải xoá không?",
    },
    sections: [
      {
        type: "lead",
        text: "Báo giá về rồi, giá nghe hợp lý, nhưng bạn nhận ra hai chỗ trống: không thấy phí vận chuyển, không thấy báo giá có hiệu lực tới ngày nào. Bây giờ bạn cần một email hỏi lại, ngắn và lịch sự.",
      },
      {
        type: "feynman",
        title: "Hỏi lại nhà cung cấp đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn hỏi người bán ở chợ về một chiếc quạt. Người ấy nói giá mà quên bảo có giao tận nhà không. Bạn hỏi thẳng một câu: \"Giá này đã gồm chở về nhà chưa chị?\" Câu hỏi cụ thể thì được trả lời cụ thể.",
        columns: ["Thành phần", "Hỏi người bán ở chợ", "Email hỏi nhà cung cấp"],
        rows: [
          ["Câu hỏi", "\"Giá này đã gồm chở về nhà chưa?\"", "Mỗi điều thiếu một câu hỏi rõ, đánh số"],
          ["Giọng nói", "Thân thiện, đi thẳng vào điều cần biết", "Lịch sự, ngắn, không kể lể"],
          ["Chứng cứ", "Chỉ có lời nói", "Có chữ trả lời để đối chiếu về sau"],
        ],
        oneLiner: "Hỏi cụ thể để nhận trả lời cụ thể, và giữ câu trả lời bằng chữ.",
      },
      { type: "heading", text: "Vấn đề: giá có, điều kiện thì không" },
      {
        type: "paragraph",
        text: "Một báo giá đầy đủ nói bốn điều: giá, đơn vị, phí giao và thời hạn hiệu lực. Khi thiếu hai điều sau, con số giá không nói lên tổng chi phí. Điều quan trọng là hỏi ngay, trước khi bạn báo sếp hoặc đặt hàng.",
      },
      {
        type: "flow",
        title: "Từ một chỗ hở tới email hỏi lại",
        steps: [
          { label: "Gạch chỗ hở", detail: "Đọc báo giá và ghi từng điều còn thiếu: phí giao, hiệu lực, số lượng tối thiểu, cách thanh toán." },
          { label: "Đưa dữ kiện cho AI", detail: "Cho AI biết món hàng, mã báo giá, bạn là ai và các điều cần hỏi. Không đưa thông tin không cần thiết." },
          { label: "Đọc nháp", detail: "Tìm câu nào cam kết thay bạn, con số nào bạn không cho, lời khen nào thừa và xoá đi." },
          { label: "Gửi và ghi ngày", detail: "Gửi rồi ghi ngày gửi vào bảng theo dõi để còn nhắc lại nếu chưa có trả lời." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Email hỏi tốt",
          text: "Mở đầu một câu nêu báo giá nào. Ba câu hỏi đánh số, mỗi câu trả lời được bằng một dòng. Kết thúc bằng lời cảm ơn và mong nhận trả lời bằng email.",
        },
        right: {
          label: "Email hỏi kém",
          text: "Kể dài về nhu cầu, hỏi một câu chung chung, tự đoán phí thay họ hoặc lồng thêm việc xin giảm giá khiến họ không biết trả lời phần nào trước.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn email hỏi phí giao và hiệu lực",
        task: "Nhà cung cấp Hòa Phát Pack gửi báo giá hộp carton mã HP-204, giá 4.500 đồng một cái, không nói phí giao và hiệu lực. Bạn cần AI soạn nháp email hỏi lại.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết email hỏi nhà cung cấp về báo giá.", feedback: "Thiếu tên hàng, mã báo giá và điều cần hỏi: AI chỉ viết được một lá thư chung." },
              { text: "Tôi là nhân viên mua hàng. Nhà cung cấp Hòa Phát Pack gửi báo giá hộp HP-204, giá 4.500 đồng một cái, chưa ghi phí giao và hiệu lực.", good: true, feedback: "Đủ người, hàng, mã và chỗ hở: AI hỏi đúng chỗ." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Hỏi hai điều: phí giao tới kho và ngày hết hiệu lực. Đánh số từng câu, xin trả lời bằng email.", good: true, feedback: "Hai câu hỏi rõ, bằng chữ: người trả lời không thể trả lời lảng." },
              { text: "Hỏi họ mọi thứ còn thiếu và xin giảm giá thêm nếu được.", feedback: "Lẫn hai việc khác nhau. Câu xin giảm giá làm loãng câu hỏi làm rõ." },
            ],
          },
          {
            id: "limits",
            label: "Giới hạn",
            options: [
              { text: "Viết thật dễ thương để họ có cảm tình.", feedback: "Không đo được. AI có thể viết dài và thêm lời cam kết." },
              { text: "Tối đa 100 chữ, lịch sự, không nêu số lượng hay lời hứa đặt hàng nào.", good: true, feedback: "Có giới hạn độ dài và cấm hứa thay bạn: bản nháp gửi được gần như ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "limits"],
            text: "Kính gửi Hòa Phát Pack,\n\nCảm ơn anh chị đã gửi báo giá hộp HP-204. Xin anh chị cho biết:\n1. Phí vận chuyển tới kho của chúng tôi là bao nhiêu?\n2. Báo giá có hiệu lực tới ngày nào?\n\nMong anh chị trả lời bằng email. Trân trọng cảm ơn.",
          },
          {
            requires: ["context"],
            text: "Kính gửi Hòa Phát Pack,\n\nCảm ơn anh chị đã gửi báo giá. Chúng tôi rất hài lòng và sẵn sàng đặt 3.000 cái ngay. Anh chị cho hỏi thêm về giá và các điều kiện...\n\n(Có dữ kiện nhưng thiếu giới hạn: AI tự thêm cam kết đặt 3.000 cái.)",
          },
          {
            text: "Kính gửi Quý công ty,\n\nChúng tôi quan tâm sản phẩm của Quý công ty và mong nhận thêm thông tin. Được biết phí giao là 200.000 đồng, xin xác nhận.\n\n(AI không biết bối cảnh nên tự bịa phí giao 200.000 đồng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Chỉ đưa cho AI những thông tin cần cho câu hỏi: tên hàng, mã báo giá, điều cần làm rõ. Hợp đồng khung, giá đối thủ hay thông tin cá nhân của người bán không cần cho việc này.",
      },
      {
        type: "scenario",
        title: "Một bản nháp có lời hứa thừa",
        start: "s1",
        nodes: {
          s1: {
            text: "AI soạn xong email. Bạn thấy cuối thư có câu: \"Nếu phí giao hợp lý, chúng tôi sẽ đặt hàng ngay trong tuần này.\" Sếp chưa duyệt việc đặt hàng.",
            choices: [
              { label: "Gửi luôn, vì câu đó có điều kiện \"nếu hợp lý\"", next: "bad_promise" },
              { label: "Xoá câu đó và giữ lại hai câu hỏi", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Nhà cung cấp trả lời báo phí giao rồi nhắc: \"Anh chị hứa đặt trong tuần này nhé, chúng tôi đã giữ hàng.\" Bạn phải giải thích với sếp vì sao email của mình nghe như cam kết.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gửi email. Ba ngày sau vẫn chưa có trả lời và sếp hỏi tiến độ.",
            choices: [
              { label: "Nhắn nhắc ngắn, nhắc lại hai câu hỏi và trả lời sếp là đang chờ", next: "good" },
              { label: "Tự ước tính phí giao rồi ghi vào bảng như đã xác nhận", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Bảng gửi sếp có một con số phí giao không nguồn. Khi nhà cung cấp báo mức khác, bạn phải sửa lại bảng và giải thích vì sao con số cũ nhìn như chắc chắn.",
            ending: "bad",
          },
          good: {
            text: "Nhà cung cấp trả lời trong ngày. Bạn cập nhật hai ô còn trống bằng câu trả lời bằng chữ và sếp thấy con số nào cũng có nguồn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chỗ báo giá im lặng là chỗ chi phí ẩn: hỏi từng ý và giữ câu trả lời bằng chữ.",
          "Bài sau: bắt lỗi trong bảng so sánh báo giá do AI lập.",
        ],
      },
    ],
  },
  {
    id: 2142,
    slug: "bat-loi-bang-so-sanh-bao-gia-do-ai-lap",
    title: "Chặng 37, Bài 3: Bắt lỗi trong bảng so sánh báo giá do AI lập",
    subtitle: "AI lập bảng rất nhanh, nhưng một dòng cộng nhầm thuế đủ làm lệch cả quyết định.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng so sánh là thứ sếp nhìn để duyệt. Nếu AI cộng thuế hai lần hoặc bỏ sót một dòng, quyết định dựa trên một bảng sạch đẹp nhưng sai. Thói quen đối chiếu từng cột với file gốc chỉ mất mười phút và tránh được chuyện đó.",
    openingQuestion:
      "AI đưa bạn bảng so sánh ba báo giá trông rất chuyên nghiệp. Cách kiểm lỗi hiệu quả nhất là gì?",
    openingOptions: [
      "Lấy vài dòng và đối chiếu từng cột với file gốc",
      "Hỏi lại AI \"bảng này có chắc đúng không\" rồi tin theo",
      "Xem bảng có đủ màu sắc và định dạng rõ ràng hay chưa",
      "Đếm số dòng trong bảng có bằng số nhà cung cấp hay không",
    ],
    correctOption: 0,
    explanation:
      "Cách chắc chắn duy nhất là đặt bảng cạnh bản gốc và so từng con số. Hỏi lại AI không phải kiểm chứng, vì nó có thể xác nhận luôn điều nó vừa viết sai. Màu sắc và định dạng nói về hình thức, không nói về giá. Số dòng đúng cũng không cho biết từng dòng có cộng đúng thuế hay không.",
    diagram: [
      { label: "AI lập bảng từ ba báo giá", arrow: true },
      { label: "Đối chiếu từng cột với file gốc", arrow: true },
      { label: "Soát ba loại lỗi: thuế, dòng thiếu, đơn vị", arrow: true },
      { label: "Sửa bảng rồi mới gửi sếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng mua hàng công ty phân phối",
      description:
        "Nhân viên nhờ AI lập bảng so ba nhà cung cấp. Báo giá B đã gồm thuế nhưng AI cộng thêm mười phần trăm nữa, làm B trông đắt hơn A. Nếu không kiểm, sếp chọn A. Sau khi đối chiếu, B thực ra rẻ hơn. Đây là ví dụ minh hoạ, không phải số liệu công ty thật.",
    },
    quiz: [
      q(
        "AI cộng thêm mười phần trăm thuế vào một báo giá đã gồm thuế. Lỗi này gọi là gì?",
        "Cộng thuế hai lần, làm giá cao hơn thực tế",
        "Bỏ sót một dòng của báo giá",
        "Đọc nhầm đơn vị tính từ cái sang thùng",
        "Bịa ra một nhà cung cấp không có trong báo giá",
        "Khi báo giá đã gồm thuế mà AI vẫn cộng thêm thì thuế bị tính hai lần và giá bị đẩy lên. Bỏ sót dòng, nhầm đơn vị hay bịa nhà cung cấp là những lỗi khác, mỗi lỗi có dấu hiệu riêng khi đối chiếu.",
      ),
      q(
        "Bảng của AI ghi \"A: 1.000 cái x 5.200 = 5.200.000\". Bạn kiểm tính lại. Điều gì đúng?",
        "1.000 x 5.200 = 5.200.000, dòng này đúng",
        "Phải là 520.000 vì 1.000 x 520 mới đúng",
        "Phải là 52.000.000 vì thêm ba số không cho chắc",
        "Không kiểm được nếu không nhờ AI tính lại giùm",
        "Bạn tự nhân được bằng tay: 1.000 nhân 5.200 bằng 5.200.000. Hai đáp án còn lại làm phép nhân sai số chữ số. Kiểm tính không cần hỏi AI, chỉ cần máy tính trên điện thoại.",
      ),
      q(
        "Bảng liệt kê hai nhà cung cấp trong khi bạn gửi ba báo giá. Nên làm gì?",
        "Tìm nhà bị thiếu, đối chiếu file gốc rồi thêm lại",
        "Bỏ qua, vì hai nhà là đủ để so",
        "Nhờ AI giải thích vì sao nó bỏ nhà thứ ba",
        "Chọn luôn một trong hai nhà có trong bảng",
        "Nhà bị bỏ có thể chính là nhà rẻ nhất, nên bỏ qua là bỏ mất phương án. Hỏi AI vì sao nó bỏ sẽ nhận một lời giải thích nghe hợp lý nhưng không thay được việc kiểm. Chọn từ bảng thiếu là quyết định trên dữ liệu chưa đủ.",
      ),
      q(
        "Vì sao AI dễ lập bảng đẹp nhưng vẫn sai số?",
        "Nó sinh chữ nghe hợp lý, không tính như bảng tính",
        "Vì nó cố tình làm sai để bạn phải kiểm lại",
        "Vì bảng có kẻ ô đẹp thì luôn chứa ít lỗi hơn bảng thường",
        "Vì báo giá của nhà cung cấp thường sai từ đầu",
        "AI sinh chữ theo xác suất nên có thể viết ra một con số nghe đúng mà không đúng. Nó không có ý đồ làm sai, và định dạng đẹp không liên quan tới độ chính xác. Đổ lỗi cho báo giá gốc là bỏ qua việc AI chép chưa đúng.",
      ),
      q(
        "Phần nào trong bảng so sánh KHÔNG nên giao hẳn cho AI mà không kiểm?",
        "Cột tổng tiền và mọi phép tính có thuế",
        "Cột tên nhà cung cấp chép từ tiêu đề file",
        "Tiêu đề của bảng và cách đặt tên các cột",
        "Thứ tự sắp xếp các dòng theo ABC cho dễ đọc",
        "Chỗ có số và thuế là chỗ sai gây thiệt hại tiền. Tên nhà cung cấp, tiêu đề và thứ tự dòng nhìn là kiểm được và sai cũng không đổi quyết định. Số thì phải tự tính lại và so với bản gốc.",
      ),
    ],
    keyTakeaways: [
      "Bảng do AI lập có thể sai mà vẫn đẹp: đối chiếu từng cột với file gốc.",
      "Ba lỗi hay gặp: cộng thuế hai lần, bỏ sót một dòng, nhầm đơn vị.",
      "Hỏi lại AI không phải là kiểm chứng.",
      "Tự tính lại các phép nhân và cộng bằng máy tính.",
    ],
    practicePrompt: {
      question:
        "Báo giá B ghi \"4.400 đồng một cái, đã gồm thuế\". Bảng AI ghi B là 4.840 đồng. Nguyên nhân có khả năng nhất là gì?",
      options: [
        "AI cộng thêm mười phần trăm thuế (= 4.400 x 1,1) vào giá đã gồm thuế",
        "AI đổi đơn vị từ cái sang thùng nhưng quên ghi chú",
        "AI làm tròn giá lên cho gọn vì số lẻ khó đọc",
        "Nhà cung cấp B đã tăng giá sau khi gửi báo giá",
      ],
      correct: 0,
      explanation:
        "4.400 nhân 1,1 bằng 4.840 đồng, đúng bằng số AI ghi: dấu hiệu cộng thuế hai lần. Đổi đơn vị sẽ đổi số theo bội khác, làm tròn không nhảy đúng 10 phần trăm, và nhà cung cấp tăng giá thì cần chứng cứ chứ không phải suy đoán.",
    },
    summary: {
      keyIdea: "Bảng AI lập là bản nháp: đối chiếu từng cột với file gốc trước khi gửi.",
      formula: "Bảng AI → đối chiếu với gốc → sửa thuế, dòng thiếu, đơn vị → mới gửi sếp.",
      commonMistake: "Tin bảng vì nó đẹp và đầy đủ ô, không kiểm con số.",
      action: "Lấy một bảng so sánh gần nhất và tự tính lại ba dòng bằng máy tính.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bảng so sánh do AI lập (hoặc nhờ AI lập từ ba báo giá thật của bạn). Đối chiếu ít nhất ba dòng với file gốc: giá, thuế, đơn vị. Ghi lại từng lỗi tìm được và loại của nó (thuế, thiếu dòng, đơn vị, khác).",
      secondary: "Mai bạn sẽ được hỏi: có bao nhiêu lỗi, thuộc loại nào?",
    },
    sections: [
      {
        type: "lead",
        text: "AI vừa đưa bạn một bảng so sánh ba báo giá rất gọn: màu sắc hài hoà, có cả dòng tổng. Sếp chỉ cần nhìn bảng này để duyệt. Trước khi gửi, bạn đặt nó cạnh file gốc và tìm chỗ sai.",
      },
      {
        type: "feynman",
        title: "Bắt lỗi bảng AI lập đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn nhờ một bạn ghi hộ hoá đơn đi chợ vào sổ. Bạn không đọc lại cả sổ, mà lấy tờ hoá đơn ra so vài dòng: số tiền, món nào có, món nào thiếu. Cách đó nhanh và chắc hơn hỏi bạn ấy \"chắc đúng chứ\".",
        columns: ["Thành phần", "Ghi hộ hoá đơn đi chợ", "Bảng so sánh do AI lập"],
        rows: [
          ["Người ghi", "Một người bạn nhanh tay", "AI chép rất nhanh"],
          ["Lỗi hay gặp", "Ghi nhầm số, bỏ sót món", "Cộng thuế hai lần, bỏ sót dòng, nhầm đơn vị"],
          ["Cách kiểm", "Lấy hoá đơn gốc ra so từng dòng", "Mở file gốc so từng cột, tự tính lại"],
        ],
        oneLiner: "Đặt bản chép cạnh bản gốc và so từng dòng: đó là cách kiểm duy nhất chắc chắn.",
      },
      { type: "heading", text: "Ba loại lỗi hay gặp" },
      {
        type: "paragraph",
        text: "Với bảng so sánh báo giá, phần lớn lỗi rơi vào ba nhóm: thuế bị tính hai lần hoặc không tính, một dòng hay một khoản phí bị bỏ sót, và đơn vị bị nhầm giữa cái với thùng. Biết ba nhóm này bạn sẽ biết nhìn vào đâu trước.",
      },
      {
        type: "flow",
        title: "Cách rà một bảng do AI lập",
        steps: [
          { label: "Đếm nhà cung cấp và dòng", detail: "Bảng có đủ số nhà cung cấp và đủ các khoản phí như trong bản gốc không? Thiếu một dòng là thiếu một phương án hoặc một chi phí." },
          { label: "Soát cột thuế", detail: "Với mỗi nhà, xem báo giá ghi đã gồm hay chưa gồm thuế và bảng có làm theo đúng như vậy không." },
          { label: "Soát đơn vị", detail: "Cái, hộp, thùng: quy đổi về cùng đơn vị và kiểm lại phép nhân chia." },
          { label: "Tự tính lại dòng tổng", detail: "Dùng máy tính hoặc bảng tính để cộng lại. Không nhờ AI kiểm chính bảng của AI." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng so sánh ba báo giá",
        task: "Báo giá gốc: A ghi 5.200 đồng một cái, chưa thuế. B ghi 5.500 đồng một cái, đã gồm thuế. C ghi 4.800 đồng một cái, chưa thuế, phí giao 300.000 đồng cho cả đơn 1.000 cái. Đơn cần 1.000 cái, thuế 10 phần trăm. Bảng của AI dưới đây có chỗ sai: đánh dấu những đoạn không khớp với bản gốc.",
        segments: [
          { text: "Nhu cầu: 1.000 cái, so ba nhà cung cấp A, B và C." },
          { text: "Nhà A: 5.200 đồng một cái, chưa thuế, tổng 5.720.000 đồng gồm thuế." },
          {
            text: "Nhà B: 5.500 đồng một cái, đã gồm thuế, cộng thêm 10 phần trăm thành 6.050.000 đồng.",
            error: "Báo giá B đã gồm thuế. Cộng thêm 10 phần trăm là tính thuế hai lần, làm B đắt hơn thực tế: tổng đúng là 5.500.000 đồng.",
          },
          { text: "Nhà C: 4.800 đồng một cái, chưa thuế, tổng 5.280.000 đồng gồm thuế.", error: "Bảng quên phí giao 300.000 đồng của C. Tổng đúng là 5.280.000 cộng thêm phí giao (tuỳ cách tính thuế cho phí đó), không phải chỉ 5.280.000." },
          { text: "Nhận xét: B đắt nhất trong ba nhà.", error: "Kết luận này dựa trên con số B bị tính thuế hai lần, nên sai theo. Với 5.500.000 đồng, B không phải nhà đắt nhất." },
          { text: "Đề xuất: các con số cần kiểm lại với file gốc trước khi duyệt." },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Số trong bài chỉ để minh hoạ. Cách tính thuế cho phí giao và chuyện thuế được tách hay gộp trong hoá đơn là việc của kế toán trưởng hoặc chuyên gia thuế: khi nghi ngờ, hỏi họ thay vì tự kết luận.",
      },
      {
        type: "scenario",
        title: "Hạn nộp bảng là 3 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ AI lập bảng lúc 2 giờ chiều. Kết quả đẹp, nhưng nhà B ghi giá cao hơn bản gốc bạn nhớ. Còn một tiếng.",
            choices: [
              { label: "Gửi sếp ngay để kịp hạn, sửa sau nếu có gì", next: "bad_rush" },
              { label: "Mở báo giá B gốc, kiểm giá và thuế", next: "s2" },
            ],
          },
          bad_rush: {
            text: "Sếp duyệt loại B vì \"quá đắt\". Vài ngày sau bạn phát hiện AI đã cộng thuế hai lần và B mới là nhà rẻ nhất. Việc mở lại phương án mất thêm một tuần.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy B ghi đã gồm thuế, còn bảng cộng thêm 10 phần trăm. Bạn sửa giá B rồi soát tiếp thấy phí giao của C bị thiếu.",
            choices: [
              { label: "Bổ sung phí giao của C, kiểm lại tổng ba nhà rồi mới gửi", next: "good" },
              { label: "Xoá cột phí giao khỏi bảng cho khỏi phải giải thích", next: "bad_hide" },
            ],
          },
          bad_hide: {
            text: "Bảng gọn hơn nhưng giấu một khoản chi phí thật. Khi C giao hàng và tính phí, sếp thấy tổng chi cao hơn bảng và hỏi bạn vì sao bỏ cột đó.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi lúc 2 giờ 50 với ghi chú ba chỗ đã sửa so với bản AI. Sếp duyệt trên con số đã đối chiếu và bạn có căn cứ trả lời mọi câu hỏi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bảng AI lập nhanh nhưng phải đối chiếu từng cột với file gốc trước khi gửi.",
          "Bài sau: tính tổng chi phí mua hàng thật sự, không chỉ đơn giá.",
        ],
      },
    ],
  },
  {
    id: 2143,
    slug: "tinh-tong-chi-phi-mua-hang-that-su",
    title: "Chặng 37, Bài 4: Tính tổng chi phí mua hàng thật sự, không chỉ đơn giá",
    subtitle: "Giá một cái rẻ hơn chưa chắc là tổng tiền rẻ hơn: phí giao và số lượng tối thiểu đổi cả cuộc chơi.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhà cung cấp giá thấp thường giao xa hoặc đặt tối thiểu lớn, và những khoản đó không nằm ở đơn giá. Biết tính tổng chi phí theo số lượng đặt giúp bạn thấy tại sao nhà rẻ hơn ở số lượng này lại đắt hơn ở số lượng khác.",
    openingQuestion:
      "Nhà cung cấp B có đơn giá thấp hơn A nhưng phí giao cao hơn nhiều. Bạn đặt số lượng vừa phải. Cách so sánh đúng là gì?",
    openingOptions: [
      "Tính tổng chi phí cho đúng số lượng bạn định đặt rồi so tổng",
      "Chọn B vì đơn giá thấp hơn và đơn giá là con số dễ so nhất",
      "Chọn A vì phí giao là khoản nhỏ so với tiền hàng nói chung, bỏ qua được",
      "Hỏi AI nhà nào rẻ hơn rồi làm theo, không cần tự tính",
    ],
    correctOption: 0,
    explanation:
      "Tổng chi phí là tiền hàng cộng phí giao cộng các khoản đi kèm, tính cho đúng số lượng bạn định đặt. Chỉ nhìn đơn giá bỏ qua khoản phí cố định, nên nhà rẻ hơn ở giá một cái có thể đắt hơn ở tổng tiền khi đặt ít. Cho rằng phí giao luôn nhỏ là đoán bừa, và hỏi AI mà không tự kiểm thì con số nào cũng chưa có chứng cứ.",
    diagram: [
      { label: "Liệt kê đơn giá, phí giao, số lượng tối thiểu", arrow: true },
      { label: "Tổng chi phí = đơn giá x số lượng + phí cố định", arrow: true },
      { label: "Kéo số lượng để tìm điểm hai nhà hoà giá", arrow: true },
      { label: "Chọn nhà theo số lượng bạn thật sự cần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán cà phê chọn nhà cung cấp cốc giấy",
      description:
        "Quán thấy nhà B có giá cốc thấp hơn nhưng phí giao cố định cao. Với đơn nhỏ hàng tháng, tổng tiền của B cao hơn A. Khi quán gom đơn lớn hơn theo quý, B mới rẻ hơn. Đây là ví dụ minh hoạ, số liệu không phải của một quán thật.",
    },
    quiz: [
      q(
        "Tổng chi phí mua hàng nên được tính như thế nào?",
        "Đơn giá nhân số lượng, cộng phí giao và các khoản phí khác",
        "Đơn giá thấp nhất trong các báo giá nhân số lượng",
        "Chỉ tiền hàng, vì phí giao thường được nhà cung cấp gánh hộ cho",
        "Đơn giá trung bình của các nhà nhân với số nhà",
        "Tổng chi phí gồm cả tiền hàng lẫn mọi khoản đi kèm. Lấy đơn giá thấp nhất bỏ phí giao, còn coi phí giao do nhà cung cấp gánh là giả định không ai nói. Đơn giá trung bình nhân số nhà là công thức không mô tả khoản chi nào.",
      ),
      q(
        "A: 52.000 đồng một cái, phí giao 400.000 đồng. B: 48.000 đồng một cái, phí giao 1.500.000 đồng. Đặt 100 cái, nhà nào rẻ hơn?",
        "A: 5.600.000 đồng, còn B là 6.300.000 đồng",
        "B, vì đơn giá thấp hơn A tới 4.000 đồng một cái",
        "B: 4.800.000 đồng, vì phí giao đã tính vào đơn giá",
        "Bằng nhau, vì chênh đơn giá bù đúng cho chênh phí giao",
        "A là 100 x 52.000 + 400.000 = 5.600.000 đồng. B là 100 x 48.000 + 1.500.000 = 6.300.000 đồng. Đơn giá thấp hơn chỉ tiết kiệm 400.000 đồng nhưng phí giao chênh 1.100.000 đồng. Các đáp án kia bỏ phí giao hoặc giả định sai.",
      ),
      q(
        "Với hai nhà ở câu trên, số lượng đặt lớn dần thì điều gì xảy ra?",
        "B dần rẻ hơn vì phí giao cố định chia ra cho nhiều cái hơn",
        "A luôn rẻ hơn ở mọi số lượng vì phí giao của A thấp hơn",
        "Hai nhà luôn cách nhau một khoảng cố định không đổi",
        "B đắt hơn dần vì đơn giá thấp không bền khi đặt nhiều",
        "Chênh đơn giá 4.000 đồng nhân số lượng tăng dần, còn chênh phí giao 1.100.000 đồng thì cố định. Tới một mức số lượng, B thắng. Nói A luôn rẻ hoặc hai nhà cách đều là bỏ qua cách hai đường tổng chi phí giao nhau.",
      ),
      q(
        "Nhà cung cấp yêu cầu đặt tối thiểu 1.000 cái, bạn chỉ cần 300. Nên làm gì?",
        "Tính thêm chi phí hàng tồn dư và so với nhà không đặt tối thiểu",
        "Đặt 1.000 cái, vì đơn giá thấp nên chắc chắn có lợi",
        "Bỏ qua yêu cầu tối thiểu và đặt 300, họ sẽ nhượng bộ",
        "Chọn nhà này vì có yêu cầu tối thiểu nghĩa là hàng tốt, bán chạy",
        "Số hàng dư nằm trong kho, chiếm chỗ và có thể hỏng hoặc lỗi thời, nên phải tính thành chi phí. Đặt nhiều chưa chắc lợi. Tin họ nhượng bộ hay suy ra chất lượng từ điều kiện tối thiểu đều chưa có căn cứ.",
      ),
      q(
        "Kéo thanh số lượng để tìm điểm hoà giá giúp bạn biết điều gì?",
        "Số lượng mà từ đó nhà này rẻ hơn nhà kia",
        "Nhà cung cấp nào giao hàng nhanh hơn ở khu vực của bạn",
        "Chất lượng hàng của hai nhà có tương đương nhau không",
        "Nhà cung cấp nào đáng tin cậy hơn trong dài hạn",
        "Điểm hoà giá chỉ cho biết chuyện tiền: số lượng mà hai tổng chi phí bằng nhau. Tốc độ giao, chất lượng hay độ tin cậy là chuyện khác và cần dữ liệu khác, ví dụ lịch sử giao hàng.",
      ),
    ],
    keyTakeaways: [
      "So tổng chi phí cho đúng số lượng bạn định đặt, không chỉ đơn giá.",
      "Phí giao cố định càng chia cho nhiều hàng thì càng nhẹ.",
      "Số lượng tối thiểu lớn có thể kéo theo chi phí tồn dư.",
      "Điểm hoà giá cho biết số lượng đổi nhà nào rẻ hơn, không nói gì về chất lượng.",
    ],
    practicePrompt: {
      question:
        "A: 60 đồng một cái, phí giao 500. B: 55 đồng một cái, phí giao 1.500 (đơn vị nghìn đồng, minh hoạ). Từ số lượng nào B bắt đầu rẻ hơn A?",
      options: [
        "Trên 200 cái (= (1.500 - 500) / (60 - 55))",
        "Trên 100 cái (= 500 / 5, chỉ dùng phí giao của A)",
        "Trên 300 cái (= 1.500 / 5, chỉ dùng phí giao của B)",
        "Ở mọi số lượng, vì B luôn có đơn giá thấp hơn A",
      ],
      correct: 0,
      explanation:
        "Điểm hoà giá là nơi chênh phí giao bằng chênh tiền hàng: 1.000 / 5 = 200. Dùng phí giao của một nhà thôi cho 100 hoặc 300, đều sai. Nói B luôn rẻ hơn là bỏ qua phí giao cao hơn.",
    },
    summary: {
      keyIdea: "Tổng chi phí = đơn giá x số lượng + phí cố định: nhà rẻ nhất phụ thuộc vào số lượng bạn đặt.",
      formula: "Điểm hoà giá = chênh phí cố định / chênh đơn giá.",
      commonMistake: "Chọn nhà có đơn giá thấp nhất mà không tính phí giao và tối thiểu.",
      action: "Chọn hai báo giá đang cân nhắc và tính tổng chi phí ở ba mức số lượng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy hai báo giá thật cho cùng một mặt hàng. Ghi đơn giá, phí giao và số lượng tối thiểu của mỗi nhà. Tính tổng chi phí ở số lượng bạn thường đặt, ở một nửa và ở gấp đôi số đó. Ghi lại nhà nào rẻ hơn ở từng mức.",
      secondary: "Mai bạn sẽ được hỏi: điểm hoà giá của hai nhà là bao nhiêu và bạn thường đặt ở phía nào?",
    },
    sections: [
      {
        type: "lead",
        text: "Hai nhà cung cấp cốc giấy: một nhà có giá một cái thấp hơn nhưng ở xa, phí giao cao và bắt đặt nhiều. Nhìn đơn giá thì rõ ràng nhà đó rẻ. Nhưng đơn của bạn chỉ là đơn nhỏ hàng tháng, và tổng tiền sẽ nói câu chuyện khác.",
      },
      {
        type: "feynman",
        title: "Tổng chi phí đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chuyện đi chợ xa. Chợ xa bán rau rẻ hơn năm trăm đồng một bó, nhưng bạn tốn thêm tiền xăng đi lại. Nếu chỉ mua hai bó thì tiền xăng ăn hết phần rẻ. Mua ba chục bó cho cả xóm thì tiền xăng chia ra, và chợ xa lời.",
        columns: ["Thành phần", "Đi chợ xa mua rau", "Đặt hàng nhà cung cấp"],
        rows: [
          ["Giá mỗi món", "Rẻ hơn một chút mỗi bó rau", "Đơn giá thấp hơn mỗi cái"],
          ["Chi phí cố định", "Tiền xăng đi một chuyến", "Phí giao mỗi đơn, phí đặt tối thiểu"],
          ["Mua nhiều", "Tiền xăng chia ra, chợ xa có lợi", "Phí cố định chia ra, nhà đơn giá thấp có lợi"],
        ],
        oneLiner: "Rẻ mỗi món chưa chắc rẻ cả chuyến: phải cộng cả khoản cố định rồi mới so.",
      },
      { type: "heading", text: "Vấn đề: hai con số, hai cách rẻ" },
      {
        type: "paragraph",
        text: "Nhà A có đơn giá cao hơn nhưng phí giao thấp. Nhà B có đơn giá thấp hơn nhưng phí giao cao. Đặt ít thì phí giao chiếm phần lớn nên A rẻ hơn. Đặt nhiều thì chênh đơn giá cộng dồn và B bắt đầu thắng. Bạn cần biết mình đứng ở phía nào của điểm hoà giá.",
      },
      {
        type: "chart",
        title: "Tổng chi phí theo số lượng đặt",
        caption: "Số liệu minh hoạ, đơn vị nghìn đồng. Kéo các thanh trượt để thấy điểm hai đường giao nhau, tức số lượng mà từ đó nhà B bắt đầu rẻ hơn nhà A.",
        kind: "line",
        xLabel: "Số lượng đặt (cái)",
        yLabel: "Tổng chi phí (nghìn đồng)",
        x: { from: 50, to: 1000, step: 50 },
        params: [
          { id: "pa", label: "Đơn giá nhà A", min: 40, max: 80, step: 1, value: 52, unit: "nghìn/cái" },
          { id: "pb", label: "Đơn giá nhà B", min: 40, max: 80, step: 1, value: 48, unit: "nghìn/cái" },
          { id: "fa", label: "Phí giao nhà A", min: 0, max: 3000, step: 100, value: 400, unit: "nghìn" },
          { id: "fb", label: "Phí giao nhà B", min: 0, max: 3000, step: 100, value: 1500, unit: "nghìn" },
        ],
        series: [
          { label: "Nhà A", expr: "x * pa + fa" },
          { label: "Nhà B", expr: "x * pb + fb" },
        ],
      },
      {
        type: "list",
        items: [
          "Tiền hàng = đơn giá x số lượng.",
          "Chi phí cố định = phí giao mỗi đơn, phí đặt tối thiểu.",
          "Chi phí ẩn cần cân nhắc: hàng thừa nằm kho, thời gian chờ giao lâu.",
        ],
      },
      {
        type: "flow",
        title: "Cách tính tổng chi phí cho một đơn",
        steps: [
          { label: "Chốt số lượng cần", detail: "Dựa vào nhu cầu thật của bạn, không dựa vào mức tối thiểu nhà cung cấp đặt ra." },
          { label: "Ghi đủ mọi khoản", detail: "Đơn giá, phí giao, thuế theo cách báo giá ghi, các phí khác. Khoản nào chưa rõ thì hỏi lại." },
          { label: "Tính tổng từng nhà", detail: "Tiền hàng cộng khoản cố định. Bạn tự nhẩm hoặc dùng bảng tính, AI chỉ hỗ trợ trình bày." },
          { label: "Kéo thử số lượng khác", detail: "Xem kết luận có đổi không khi đặt nhiều hơn hoặc ít hơn, để biết quyết định của bạn có bền không." },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Chất lượng, tốc độ giao và độ tin cậy không nằm trong tổng chi phí. Nhà rẻ hơn về tiền vẫn có thể giao trễ hoặc hàng lỗi nhiều hơn: hai chuyện đó cần dữ liệu riêng chứ không suy ra từ giá.",
      },
      {
        type: "scenario",
        title: "Đặt bao nhiêu và chọn nhà nào",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhà B đơn giá thấp hơn A nhưng bắt đặt tối thiểu 1.000 cái, phí giao cao. Tháng này bạn chỉ dùng khoảng 300 cái. Sếp nhắn: \"Nhà B rẻ hơn, chọn B nhé.\"",
            choices: [
              { label: "Đặt B đủ 1.000 cái vì đơn giá thấp", next: "bad_excess" },
              { label: "Tính tổng chi phí cả hai nhà với 300 cái, tính thêm số hàng dư nếu đặt B", next: "s2" },
            ],
          },
          bad_excess: {
            text: "Sáu tháng sau 700 cái vẫn nằm trong kho, chiếm chỗ, và một phần đã đổi mẫu nên khó dùng. Tiền tiết kiệm nhờ đơn giá thấp không bù đủ chi phí hàng dư.",
            ending: "bad",
          },
          s2: {
            text: "Với 300 cái, A tổng rẻ hơn B. Nếu bạn dự kiến dùng thêm trong sáu tháng tới thì B có thể có lợi, nhưng bạn không chắc lượng dùng.",
            choices: [
              { label: "Báo sếp rõ: A rẻ hơn cho 300 cái, B chỉ có lợi nếu dùng đủ 1.000 cái trong thời hạn nào đó", next: "good" },
              { label: "Chọn A và không giải thích gì với sếp", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Sếp thấy quyết định trái với ý mình mà không có lý do đi kèm. Bạn mất thời gian giải thích lại, còn con số so sánh nằm trong đầu bạn chứ không nằm trong email.",
            ending: "bad",
          },
          good: {
            text: "Sếp thấy hai con số so sánh và điều kiện để B có lợi. Ông chọn A cho đơn này và giao bạn theo dõi mức dùng để cân nhắc B lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tổng chi phí = đơn giá x số lượng + phí cố định: nhà nào rẻ hơn phụ thuộc vào số lượng bạn đặt.",
          "Bài sau: soạn email đặt hàng rõ đến mức không cần hỏi lại.",
        ],
      },
    ],
  },
  {
    id: 2144,
    slug: "soan-email-dat-hang-ro-rang-mot-lan-la-xong",
    title: "Chặng 37, Bài 5: Soạn email đặt hàng rõ đến mức không cần hỏi lại",
    subtitle: "Thiếu một mã hàng là kho giao sai: một mẫu đặt hàng gọn giữ được cả tuần công sức.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đơn hàng mơ hồ thường trả giá bằng hàng giao sai, giao nhầm địa điểm hoặc phải gọi qua lại. Một mẫu email đặt hàng có đủ mã hàng, số lượng, địa điểm và ngày cần giúp người nhận làm đúng ngay lần đầu.",
    openingQuestion:
      "Bạn viết: \"Anh gửi cho em 200 thùng nước như lần trước nhé.\" Kho giao nhầm loại nước. Thiếu sót lớn nhất của email này là gì?",
    openingOptions: [
      "Thiếu mã hàng cụ thể nên người nhận phải đoán \"lần trước\" là loại nào",
      "Câu chào đầu thư chưa đủ trang trọng với nhà cung cấp lâu năm của công ty",
      "Chưa cảm ơn nhà cung cấp vì đã hỗ trợ trong lần đặt trước",
      "Chưa ghi tên đầy đủ của công ty ở phần chữ ký cuối thư",
    ],
    correctOption: 0,
    explanation:
      "\"Như lần trước\" chỉ có nghĩa với người còn nhớ lần trước. Người nhận có thể đã đổi, đã nhầm hoặc là người khác nhận đơn. Mã hàng, số lượng, địa điểm và ngày cần là những thông tin buộc phải viết ra. Lời chào, cảm ơn hay chữ ký là phần lịch sự, không làm hàng giao sai hay đúng.",
    diagram: [
      { label: "Gom thông tin: mã hàng, số lượng", arrow: true },
      { label: "Thêm địa điểm giao và ngày cần", arrow: true },
      { label: "AI dựng mẫu, bạn điền dữ liệu thật", arrow: true },
      { label: "Đọc lại từng mã rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: kho của một cửa hàng vật liệu xây dựng nhỏ",
      description:
        "Chủ cửa hàng nhắn nhà cung cấp \"gửi như đơn tháng trước\". Người nhận đơn tháng này là nhân viên mới, tra đơn cũ sai và giao xi măng loại khác. Từ đó cửa hàng dùng một mẫu đặt hàng cố định, ghi mã từng loại. Đây là ví dụ minh hoạ, không phải cửa hàng thật.",
    },
    quiz: [
      q(
        "Một email đặt hàng đủ thông tin cần có những gì?",
        "Mã hàng, số lượng, địa điểm giao, ngày cần và người liên hệ",
        "Tên hàng chung chung và lời hẹn giao \"sớm nhất có thể\"",
        "Chỉ số lượng, vì nhà cung cấp đã biết mình đặt gì",
        "Tham chiếu \"như đơn lần trước\" để email ngắn hơn",
        "Người nhận đơn phải làm được mà không hỏi lại: mã hàng để đúng loại, số lượng, địa điểm, ngày cần, người liên hệ khi có vấn đề. \"Như lần trước\" và \"sớm nhất có thể\" là những cách nói buộc họ phải đoán.",
      ),
      q(
        "Vì sao nên dùng mã hàng thay cho tên hàng chung?",
        "Mã hàng chỉ một loại duy nhất, tên hàng có thể trùng",
        "Vì mã hàng ngắn hơn nên email bớt dài, người nhận đọc nhanh hơn",
        "Vì nhà cung cấp không hiểu tên hàng tiếng Việt của bạn",
        "Vì mã hàng cho phép đàm phán giá thấp hơn",
        "Một tên như \"nước ngọt 330\" có thể ứng với nhiều loại. Mã hàng trỏ đúng một loại. Chuyện ngắn gọn chỉ là lợi phụ. Nhà cung cấp hiểu tiếng Việt, và mã hàng không liên quan tới việc đàm phán giá.",
      ),
      q(
        "AI dựng mẫu đặt hàng và điền sẵn mã \"NC-330\". Bạn chưa từng đưa mã đó cho nó. Nên làm gì?",
        "Xoá mã đó và điền mã lấy từ bảng giá hoặc báo giá thật",
        "Giữ lại, vì mã do AI sinh nhìn rất giống mã thật",
        "Giữ lại rồi chờ nhà cung cấp báo lại nếu họ thấy mã bị sai",
        "Nhờ AI kiểm tra lại mã do chính nó vừa tạo ra",
        "AI không biết mã hàng của nhà cung cấp, nên nó bịa một mã nghe hợp lý. Mã sai làm kho giao sai hoặc từ chối đơn. Nhờ chính AI kiểm lại chỉ nhận lại lời xác nhận, không thay được việc đối chiếu với báo giá.",
      ),
      q(
        "Bạn cần hàng vào thứ Sáu tuần này, nhưng chỉ ghi \"giao trong tuần\". Rủi ro là gì?",
        "Nhà cung cấp có thể giao thứ Bảy khi kho của bạn đóng cửa",
        "Không có rủi ro, vì \"trong tuần\" là đủ rõ ràng",
        "Nhà cung cấp sẽ tự động giao vào ngày rẻ nhất cho họ",
        "Nhà cung cấp sẽ giao sớm hơn để lấy lòng khách hàng",
        "\"Trong tuần\" cho phép bất kỳ ngày nào, kể cả ngày bạn không nhận được hàng. Ngày cụ thể kèm giờ nhận hàng của kho tránh được. Nhà cung cấp không tự chọn ngày rẻ nhất và cũng không tự giao sớm.",
      ),
      q(
        "Sau khi AI dựng mẫu đặt hàng, bước nào nên làm trước khi gửi?",
        "Đọc lại từng mã hàng, số lượng và ngày với báo giá",
        "Gửi luôn nếu mẫu trông đầy đủ và có bố cục gọn",
        "Xoá phần địa điểm để email ngắn hơn cho dễ đọc",
        "Nhờ AI thêm lời cam kết đặt lâu dài để nhà cung cấp ưu tiên giao",
        "Mẫu do AI dựng chỉ là khung, dữ liệu thật phải tới từ bạn. Mẫu đẹp không đảm bảo mã hay số đúng. Xoá địa điểm là bỏ mất thông tin cần thiết, còn thêm lời cam kết là gánh nghĩa vụ mà bạn chưa quyết.",
      ),
    ],
    keyTakeaways: [
      "Đơn hàng cần: mã hàng, số lượng, địa điểm giao, ngày cần, người liên hệ.",
      "Không viết \"như lần trước\": viết rõ ra.",
      "AI dựng khung mẫu, dữ liệu thật do bạn điền.",
      "Đọc lại từng mã với báo giá trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Câu nào trong email đặt hàng rõ nhất?",
      options: [
        "\"Đặt 200 thùng mã NC-330, giao kho Bình Dương trước 10 giờ sáng thứ Sáu 17/10.\"",
        "\"Đặt 200 thùng nước ngọt như đơn tháng trước, giao tuần này.\"",
        "\"Đặt khoảng 200 thùng loại thường dùng, giao sớm nhất có thể.\"",
        "\"Đặt 200 thùng nước, mã và địa điểm giao như trong email cũ.\"",
      ],
      correct: 0,
      explanation:
        "Câu đúng có mã hàng, số lượng, nơi giao, ngày và giờ nhận. Các câu còn lại dựa vào \"như tháng trước\", \"loại thường dùng\", \"như email cũ\" hoặc \"sớm nhất có thể\", tất cả đều buộc người nhận đoán. (Mã và địa điểm minh hoạ.)",
    },
    summary: {
      keyIdea: "Đơn hàng rõ là đơn mà người nhận làm đúng ngay lần đầu, không cần hỏi lại.",
      formula: "Mã hàng + số lượng + nơi giao + ngày giờ cần + người liên hệ = một đơn không cần hỏi lại.",
      commonMistake: "Viết \"như lần trước\" hoặc \"trong tuần\" và trông chờ người nhận hiểu ý.",
      action: "Dựng một mẫu đặt hàng cố định và điền thử bằng đơn thật gần nhất của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đơn đặt hàng gần đây của bạn (email hoặc tin nhắn). Nhờ AI dựng mẫu email đặt hàng có các dòng: mã hàng, số lượng, địa điểm giao, ngày giờ cần, người liên hệ. Điền lại đơn cũ đó vào mẫu, đối chiếu mã với báo giá và lưu mẫu để dùng lần sau.",
      secondary: "Mai bạn sẽ được hỏi: mẫu đã lưu chưa, và có mã nào bạn phải sửa lại sau khi AI điền không?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba kho gọi: nhà cung cấp giao nhầm loại nước. Bạn mở lại email đặt hàng và thấy mình viết \"như lần trước\". Người nhận lần này không phải người nhận lần trước. Bài này là mẫu email để chuyện đó không lặp lại.",
      },
      {
        type: "feynman",
        title: "Email đặt hàng rõ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn gọi taxi. Bạn không nói \"đón tôi chỗ như hôm qua\": bạn nói địa chỉ đón, điểm đến, giờ đi. Tài xế lạ nào cũng làm được ngay mà không cần hỏi lại.",
        columns: ["Thành phần", "Gọi taxi", "Email đặt hàng"],
        rows: [
          ["Thứ cần đúng", "Địa chỉ đón và điểm đến", "Mã hàng và địa điểm giao"],
          ["Thời gian", "Giờ đi cụ thể", "Ngày giờ cần nhận hàng"],
          ["Liên hệ", "Số điện thoại người đi", "Người liên hệ khi có vấn đề"],
        ],
        oneLiner: "Viết đủ để một người lạ làm đúng ngay lần đầu, không cần hỏi lại.",
      },
      { type: "heading", text: "Vấn đề: thông tin nằm trong đầu bạn" },
      {
        type: "paragraph",
        text: "Người đặt hàng thường quen với hàng, kho và nhà cung cấp, nên viết ngắn. Nhưng người nhận không ở trong đầu bạn. Khi email thiếu mã hàng hay ngày cụ thể, họ đoán, và đoán sai thì kho nhận hàng không đúng ý.",
      },
      {
        type: "flow",
        title: "Từ ý định tới email đặt hàng rõ",
        steps: [
          { label: "Gom thông tin thật", detail: "Lấy mã hàng từ báo giá, số lượng từ nhu cầu, địa chỉ kho và ngày giờ nhận hàng của kho." },
          { label: "AI dựng khung mẫu", detail: "Nhờ AI làm một mẫu có các dòng cố định: mã, số lượng, địa điểm, ngày giờ, người liên hệ. Bạn tự điền dữ liệu." },
          { label: "Đối chiếu từng mã", detail: "So từng mã hàng và số lượng trong email với báo giá. Mã AI tự điền phải được thay bằng mã thật." },
          { label: "Gửi và giữ bản lưu", detail: "Gửi rồi lưu email vào thư mục đơn hàng để có căn cứ khi nhà cung cấp giao khác." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đơn hàng mơ hồ",
          text: "\"Anh gửi 200 thùng nước như lần trước, giao sớm nhé.\" Không mã, không ngày, không nơi giao. Người nhận phải đoán và có thể đoán sai.",
        },
        right: {
          label: "Đơn hàng rõ",
          text: "\"Đặt 200 thùng mã NC-330, giao kho Bình Dương trước 10 giờ thứ Sáu 17/10, liên hệ chị Hoa.\" Người nhận làm được ngay mà không cần hỏi.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng mẫu email đặt hàng",
        task: "Bạn thường đặt nước ngọt cho cửa hàng và muốn có một mẫu email cố định, có chỗ trống để điền. Lắp yêu cầu để AI dựng đúng khung.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết email đặt hàng.", feedback: "AI không biết ai đặt, đặt gì: nó viết một lá thư chung và tự điền chi tiết." },
              { text: "Tôi phụ trách mua hàng của một cửa hàng. Tôi cần mẫu email đặt nước ngọt gửi nhà cung cấp, để dùng lại mỗi tháng.", good: true, feedback: "AI biết vai trò và mục đích dùng lại, nên dựng khung có chỗ trống." },
            ],
          },
          {
            id: "fields",
            label: "Các dòng bắt buộc",
            options: [
              { text: "Có đủ thông tin cần thiết.", feedback: "\"Cần thiết\" không được định nghĩa: AI đoán và thường bỏ mã hàng hoặc ngày." },
              { text: "Có các dòng: mã hàng, số lượng, địa điểm giao, ngày giờ cần nhận, người liên hệ.", good: true, feedback: "Mỗi thông tin có một dòng riêng: thiếu là thấy ngay trong mẫu." },
            ],
          },
          {
            id: "blank",
            label: "Chỗ chưa biết",
            options: [
              { text: "Thông tin nào chưa có thì tự điền cho hợp lý.", feedback: "Đây là đường dẫn tới mã và ngày bịa. Mã hàng do AI sinh ra không tồn tại ở nhà cung cấp." },
              { text: "Chỗ nào chưa có dữ liệu thì để ngoặc vuông [ ] cho tôi tự điền.", good: true, feedback: "Chỗ trống giữ nguyên: bạn điền dữ liệu thật từ báo giá." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "fields", "blank"],
            text: "Kính gửi [tên nhà cung cấp],\n\nChúng tôi xin đặt hàng như sau:\n- Mã hàng: [mã]\n- Số lượng: [số]\n- Địa điểm giao: [địa chỉ kho]\n- Ngày giờ cần nhận: [ngày, giờ]\n- Người liên hệ: [tên, số điện thoại]\n\nXin xác nhận đơn bằng email. Trân trọng cảm ơn.",
          },
          {
            requires: ["context"],
            text: "Kính gửi nhà cung cấp,\n\nChúng tôi xin đặt 100 thùng nước ngọt loại thường dùng, giao trong tuần này.\n\n(Có bối cảnh nhưng thiếu khuôn: AI tự điền \"100 thùng\" và \"trong tuần này\", những chỗ bạn phải tự chốt.)",
          },
          {
            text: "Kính gửi Quý công ty,\n\nXin đặt mã hàng NC-330, số lượng 500, giao ngày 20/10.\n\n(AI không có dữ liệu nên tự bịa mã NC-330, số lượng 500 và ngày 20/10.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Mẫu do AI dựng là cái khung. Mã hàng, số lượng và ngày phải tới từ báo giá và kế hoạch của bạn. Đừng dán bảng giá hay thông tin khách hàng không cần cho việc dựng khung vào công cụ AI mà công ty chưa cho phép.",
      },
      {
        type: "scenario",
        title: "Điền mẫu đặt hàng lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dùng mẫu để đặt 200 thùng. AI đã điền sẵn mã hàng NC-330 trông rất thật. Bạn có báo giá gốc trong hộp thư nhưng đang vội.",
            choices: [
              { label: "Gửi luôn vì mã trông hợp lý", next: "bad_code" },
              { label: "Mở báo giá, so mã và thay bằng mã thật", next: "s2" },
            ],
          },
          bad_code: {
            text: "Nhà cung cấp trả lời: \"Mã NC-330 không có trong danh mục.\" Đơn bị treo hai ngày và hàng về sau hạn bạn cần.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy mã thật là NC-330A cho loại lon 330 ml. Ngày cần nhận thì mẫu ghi \"tuần này\".",
            choices: [
              { label: "Đổi thành \"trước 10 giờ sáng thứ Sáu 17/10\" và ghi người liên hệ", next: "good" },
              { label: "Để \"tuần này\" vì nhà cung cấp biết mình cần gấp", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Nhà cung cấp giao vào chiều thứ Bảy khi kho đóng cửa. Xe phải quay lại và bạn trả thêm một chuyến.",
            ending: "bad",
          },
          good: {
            text: "Nhà cung cấp xác nhận đơn trong vòng một giờ mà không hỏi lại. Hàng về đúng mã, đúng ngày.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đơn rõ là đơn có mã, số lượng, nơi giao, ngày giờ, người liên hệ: người nhận làm đúng ngay lần đầu.",
          "Bài sau: mini-dự án gom ba báo giá thành một bảng so sánh gửi sếp duyệt.",
        ],
      },
    ],
  },
];
