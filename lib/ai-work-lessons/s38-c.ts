import type { Lesson } from "../lesson-types";

// Chặng 38, bài 11-15. Giáo trình: scripts/curriculum/stage-38.json.
// Không nêu tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm kết quả.
// Mọi tình huống và số liệu trong các bài này là minh hoạ, không phải dữ liệu của công ty thật.

type Q = Lesson["quiz"][number];
const q = (question: string, correct: string, d1: string, d2: string, d3: string, explanation: string): Q => ({
  question,
  options: [correct, d1, d2, d3],
  correct: 0,
  explanation,
});

export const S38_C_LESSONS: Lesson[] = [
  {
    id: 2170,
    slug: "mo-ta-su-co-may-dung-cho-ky-thuat-vien-de-hieu",
    title: "Chặng 38, Bài 11: Mô tả sự cố máy dừng để kỹ thuật viên hiểu ngay",
    subtitle: "Một mẫu báo ba dòng thay được mười câu hỏi lại qua điện thoại.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛠️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi máy dừng, mỗi phút hỏi đi hỏi lại là một phút dây chuyền đứng im. Một báo sự cố nói rõ thấy gì, lúc nào và đã thử gì giúp kỹ thuật viên đi thẳng tới việc cần làm thay vì mở đầu bằng một loạt câu hỏi.",
    openingQuestion:
      "Máy đóng gói của tổ bạn vừa dừng giữa ca. Bạn nhắn kỹ thuật viên: \"Máy hư rồi anh ơi\". Anh gọi lại hỏi liền mười câu. Bạn nhờ AI dựng một mẫu báo sự cố. Mẫu tốt cần có gì?",
    openingOptions: [
      "Hiện tượng thấy được, thời điểm và những việc bạn đã thử",
      "Tên người có lỗi và mức độ nghiêm trọng theo cảm nhận",
      "Một đoạn văn dài kể lại cả tuần làm việc của tổ máy đó",
      "Nguyên nhân bạn đoán, viết chắc chắn để anh khỏi phải nghĩ",
    ],
    correctOption: 0,
    explanation:
      "Kỹ thuật viên cần biết ba thứ để bắt đầu: máy đang biểu hiện gì, dừng lúc nào và bạn đã thử những gì. Ba thông tin đó là điều bạn quan sát được, nên chính xác và kiểm được. Tên người có lỗi không giúp sửa máy. Kể cả tuần làm chìm thông tin cần thiết. Nguyên nhân đoán chắc chắn có thể dẫn người sửa đi sai hướng ngay từ đầu.",
    diagram: [
      { label: "Máy dừng: ghi điều thấy và giờ dừng", arrow: true },
      { label: "Ghi những việc đã thử và kết quả", arrow: true },
      { label: "AI dựng mẫu báo, bạn xoá mọi chỗ đoán", arrow: true },
      { label: "Gửi cho kỹ thuật viên, ghi lại giờ gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: tổ vận hành máy đóng gói",
      description:
        "Một tổ trưởng nhắn \"máy hư\" lúc 9 giờ 40. Kỹ thuật viên mất gần mười phút hỏi lại mới biết máy kêu rít rồi tự dừng, đèn đỏ nhấp nháy và tổ đã khởi động lại một lần. Lần sau tổ dùng mẫu ba dòng nên câu trả lời có sẵn trong tin nhắn đầu. Đây là tình huống minh hoạ, không phải một công ty thật.",
    },
    quiz: [
      q(
        "Báo sự cố máy dừng, phần nào giúp kỹ thuật viên hiểu ngay nhất?",
        "Hiện tượng thấy được, giờ xảy ra và việc đã thử trước khi báo",
        "Chỉ tên máy và câu \"máy hư\" cho ngắn gọn",
        "Nguyên nhân bạn đoán, viết chi tiết để họ khỏi tìm",
        "Lời than về lần hỏng trước để họ rút kinh nghiệm",
        "Ba thông tin quan sát được cho kỹ thuật viên điểm xuất phát. Câu \"máy hư\" buộc họ hỏi lại, nguyên nhân đoán có thể dẫn đi sai hướng, còn chuyện lần trước là thông tin cũ chưa chắc liên quan.",
      ),
      q(
        "Máy kêu rít rồi tự dừng lúc 9 giờ 40, đèn đỏ nhấp nháy. Cách ghi hiện tượng nào tốt nhất?",
        "Kêu rít rồi dừng lúc 9:40, đèn đỏ nhấp nháy",
        "Máy hư nặng, cần xử lý gấp",
        "Máy có vấn đề về động cơ nên dừng đột ngột lúc buổi sáng",
        "Chắc dây curoa đứt vì lần trước cũng kêu rít như vậy",
        "Phương án đúng chỉ chép lại điều nghe và thấy cùng giờ. Hai phương án còn lại nêu kết luận về động cơ hoặc dây curoa mà chưa ai kiểm, còn \"hư nặng\" là cảm nhận không giúp ai hình dung.",
      ),
      q(
        "AI dựng mẫu báo có dòng \"Nguyên nhân: bạc đạn mòn\" mà bạn chưa kiểm tra. Nên làm gì?",
        "Đổi thành \"nghi ngờ\" hoặc xoá, chỉ giữ điều bạn quan sát",
        "Giữ nguyên vì AI viết nghe khá chắc chắn",
        "Giữ nguyên rồi thêm chữ \"khẩn cấp\" để kỹ thuật viên tới ngay",
        "Nhờ AI viết lại dòng đó bằng giọng chuyên môn hơn cho thuyết phục",
        "Một nguyên nhân chưa kiểm không thuộc phần quan sát của bạn. Nghe chắc chắn không phải bằng chứng, thêm chữ khẩn cấp không làm nó đúng hơn và viết văn chuyên môn hơn chỉ che bớt việc chưa kiểm.",
      ),
      q(
        "Bạn ghi \"đã khởi động lại một lần, máy dừng lại sau 2 phút\". Việc đó giúp gì cho kỹ thuật viên?",
        "Họ khỏi làm lại bước đó và biết máy phản ứng ra sao",
        "Nó chứng tỏ bạn đã làm đủ trách nhiệm của ca mình",
        "Nó cho họ biết bạn có đáng tin hay không để quyết định tới sớm hay muộn",
        "Nó chuyển trách nhiệm sửa máy sang người khác nếu máy hỏng nặng",
        "Việc đã thử là dữ kiện kỹ thuật: máy dừng lại sau khi khởi động lại gợi ý lỗi còn nguyên. Ba phương án nhiễu biến nó thành chuyện chứng minh trách nhiệm hay đánh giá con người, không phải mục đích của báo cáo.",
      ),
      q(
        "Ca sáng máy dừng 3 lần, mỗi lần 15 phút. Ca chiều dừng 2 lần, mỗi lần 20 phút. Tổng phút dừng của hai ca?",
        "85 phút (= 3 × 15 + 2 × 20)",
        "35 phút (= 15 + 20, chỉ cộng một lần dừng của mỗi ca)",
        "5 lần (= 3 + 2, đếm số lần thay vì số phút)",
        "65 phút (= 3 × 15 + 20, quên nhân số lần ở ca chiều)",
        "Ca sáng 3 × 15 = 45, ca chiều 2 × 20 = 40, tổng 85 phút. Ba phương án nhiễu lần lượt bỏ bớt lần dừng, đếm sai đại lượng hoặc quên nhân ở một ca.",
      ),
    ],
    keyTakeaways: [
      "Báo sự cố có ba phần: thấy gì, lúc nào, đã thử gì.",
      "Chỉ ghi điều quan sát được; điều đoán thì đánh dấu \"nghi ngờ\".",
      "AI dựng mẫu và soạn nháp; bạn xoá mọi kết luận chưa kiểm.",
      "Ghi giờ dừng và giờ chạy lại để đo được phút dừng mỗi ca.",
    ],
    practicePrompt: {
      question:
        "Băng tải dừng lúc 14:05, có mùi khét nhẹ. Tổ đã ngắt điện và bật lại, băng tải vẫn không chạy. Dòng nào nên có trong báo sự cố?",
      options: [
        "Dừng 14:05, có mùi khét nhẹ, đã ngắt điện bật lại nhưng không chạy",
        "Băng tải cháy motor, cần thay ngay trước 15:00",
        "Băng tải hỏng do ca trước bảo dưỡng không kỹ",
        "Băng tải có sự cố nghiêm trọng, đề nghị ưu tiên xử lý",
      ],
      correct: 0,
      explanation:
        "Đáp án đúng chỉ gồm điều thấy, giờ và việc đã làm. Phương án cháy motor và lỗi bảo dưỡng ca trước là kết luận chưa ai kiểm, còn \"nghiêm trọng\" là đánh giá không cho kỹ thuật viên biết phải nhìn vào đâu.",
    },
    summary: {
      keyIdea: "Một báo sự cố tốt trả lời trước ba câu kỹ thuật viên sắp hỏi: thấy gì, lúc nào, đã thử gì.",
      formula: "Hiện tượng + thời điểm + việc đã thử = báo sự cố đọc một lần là hiểu.",
      commonMistake: "Viết nguyên nhân đoán như thể đã chắc chắn, khiến người sửa đi theo hướng sai.",
      action: "Soạn một mẫu báo ba dòng cho máy hay gặp sự cố nhất của tổ bạn và dán ở bảng thông báo.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một sự cố máy hoặc thiết bị bạn từng gặp và còn nhớ. Nhờ AI dựng mẫu báo gồm ba dòng: hiện tượng, giờ xảy ra, việc đã thử. Điền mẫu bằng chuyện thật, tự gạch mọi chữ đoán nguyên nhân, rồi đưa cho một đồng nghiệp đọc và hỏi anh ấy còn cần hỏi thêm gì.",
      secondary: "Mai bạn sẽ được hỏi: đồng nghiệp còn hỏi thêm câu nào sau khi đọc mẫu của bạn?",
    },
    sections: [
      {
        type: "lead",
        text: "Chín giờ bốn mươi, máy dừng. Bạn cầm điện thoại nhắn \"máy hư anh ơi\" và ba phút sau kỹ thuật viên gọi lại hỏi: hư kiểu gì, từ lúc nào, đã thử gì chưa. Câu trả lời cho cả ba nằm sẵn trong đầu bạn, chỉ là chưa được viết ra.",
      },
      {
        type: "feynman",
        title: "Báo sự cố cho kỹ thuật viên đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nhớ lúc gọi cấp cứu: người trực máy không hỏi bạn buồn hay giận, họ hỏi ai bị gì, ở đâu, lúc nào, đã làm gì. Báo sự cố máy cũng là một cuộc gọi như vậy, chỉ khác là đối tượng là máy.",
        columns: ["Thành phần", "Gọi cấp cứu", "Báo sự cố máy"],
        rows: [
          ["Điều thấy", "Người này ngất, thở yếu", "Máy kêu rít, đèn đỏ nhấp nháy"],
          ["Thời điểm", "Vừa xảy ra cách đây hai phút", "Dừng lúc 9:40"],
          ["Việc đã làm", "Đã đặt nằm nghiêng", "Đã ngắt điện và khởi động lại một lần"],
        ],
        oneLiner: "Báo sự cố là kể điều thấy, giờ và việc đã làm, chưa cần biết vì sao.",
      },
      { type: "heading", text: "Vì sao \"máy hư\" chưa đủ" },
      {
        type: "paragraph",
        text: "\"Hư\" là một kết luận, và mỗi người hiểu một kiểu: kêu to, không chạy hay chạy chậm. Kỹ thuật viên phải hỏi lại để đổi kết luận đó về lại điều bạn quan sát. Nếu bạn viết sẵn điều quan sát, họ bỏ được bước đó.",
      },
      {
        type: "chart",
        title: "Phút dừng máy trong một ca",
        caption: "Số liệu minh hoạ. Kéo thanh trượt để xem bao nhiêu phút dừng đến từ việc mỗi lần dừng kéo dài, và bao nhiêu phút có thể tiết kiệm nếu báo rõ ngay từ tin đầu.",
        kind: "line",
        xLabel: "Số lần máy dừng trong ca",
        yLabel: "Tổng phút dừng",
        x: { from: 1, to: 8, step: 1 },
        params: [
          { id: "mins", label: "Phút mỗi lần dừng", min: 5, max: 40, step: 5, value: 20, unit: "phút" },
          { id: "saved", label: "Phút tiết kiệm mỗi lần nhờ báo rõ", min: 0, max: 15, step: 1, value: 8, unit: "phút" },
        ],
        series: [
          { label: "Báo mơ hồ (phải hỏi lại)", expr: "x*mins" },
          { label: "Báo rõ ba dòng", expr: "x*max(mins-saved,0)" },
        ],
      },
      {
        type: "list",
        items: [
          "Điều thấy: tiếng kêu, mùi, đèn báo, chỗ máy dừng trong chu trình.",
          "Thời điểm: giờ dừng, và máy đang chạy sản phẩm nào nếu có.",
          "Việc đã thử: ngắt điện, kiểm dây, bật lại, và máy phản ứng ra sao sau mỗi việc.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng mẫu báo sự cố máy dừng",
        task: "Bạn muốn một mẫu ngắn để cả tổ dùng khi máy dừng. Lắp yêu cầu sao cho mẫu chỉ ghi điều quan sát được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết cho tôi mẫu báo cáo máy hỏng.", feedback: "AI không biết máy gì, ai đọc, dùng lúc nào, nên trả về một mẫu chung chung dài dòng." },
              { text: "Tổ tôi vận hành máy đóng gói, cần mẫu để nhắn kỹ thuật viên ngay khi máy dừng giữa ca.", good: true, feedback: "AI biết người dùng, người nhận và lúc dùng, nên mẫu ngắn và bám vào việc thật." },
            ],
          },
          {
            id: "fields",
            label: "Các mục cần có",
            options: [
              { text: "Có đủ mục để kỹ thuật viên hài lòng.", feedback: "\"Hài lòng\" không phải mục nào cả. AI tự bịa thêm mục, thường thêm cả mục nguyên nhân và người chịu trách nhiệm." },
              { text: "Ba mục: điều thấy được, giờ xảy ra, việc đã thử và kết quả.", good: true, feedback: "Mỗi mục là một thứ bạn quan sát được, nên không còn chỗ cho phỏng đoán lọt vào." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc khi chưa biết",
            options: [
              { text: "Chỗ nào chưa biết thì tự điền nguyên nhân có khả năng nhất.", feedback: "Đây là đường tới nguyên nhân bịa: mẫu ghi một điều nghe hợp lý mà không ai kiểm." },
              { text: "Chỗ nào chưa biết thì để trống hoặc ghi \"chưa rõ\", không suy đoán.", good: true, feedback: "Chỗ trống được giữ nguyên, để kỹ thuật viên biết đâu là điều thật sự chưa ai biết." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "fields", "rule"],
            text: "BÁO SỰ CỐ MÁY DỪNG\n1. Điều thấy: ...\n2. Giờ xảy ra: ...\n3. Việc đã thử và kết quả: ...\n(Chỗ chưa rõ ghi \"chưa rõ\". Mẫu không có mục nguyên nhân hay người chịu trách nhiệm.)",
          },
          {
            requires: ["context"],
            text: "Mẫu báo cáo: tên máy, mô tả sự cố, mức độ nghiêm trọng, nguyên nhân, người chịu trách nhiệm, đề xuất xử lý.\n\n(Có bối cảnh nhưng thiếu quy tắc nên AI thêm mục nguyên nhân và người chịu trách nhiệm mà chưa ai điều tra.)",
          },
          {
            text: "Máy hỏng do bạc đạn mòn và ca đêm không bôi trơn đúng lịch. Đề nghị thay bạc đạn trong hôm nay.\n\n(AI không có dữ liệu nào nên tự bịa nguyên nhân và cả lỗi của ca đêm.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Nếu sự cố có người bị thương hoặc có nguy cơ mất an toàn, dừng lại và báo bộ phận an toàn lao động theo quy định công ty trước. Mẫu báo trong bài này dành cho sự cố máy thông thường, không thay quy trình an toàn.",
      },
      {
        type: "scenario",
        title: "Sếp hỏi lúc máy dừng",
        start: "s1",
        nodes: {
          s1: {
            text: "Máy dừng lúc 9:40. Điện thoại của bạn có tin của sếp: \"Tình hình sao rồi?\" Bạn đã ngắt điện, bật lại một lần nhưng máy vẫn không chạy.",
            choices: [
              { label: "Nhắn: \"Chắc hỏng bạc đạn, nhờ kỹ thuật thay gấp\"", next: "bad_guess" },
              { label: "Nhắn ba dòng: dừng 9:40, kêu rít rồi đèn đỏ, đã bật lại một lần vẫn không chạy", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Kỹ thuật viên mang sẵn bạc đạn tới nhưng lỗi nằm ở cảm biến. Mất thêm hai mươi phút để quay lại lấy đồ và kiểm tra lại từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Kỹ thuật viên đọc xong, hỏi lại đúng một câu: \"Đèn đỏ nhấp nháy nhanh hay chậm?\" Bạn trả lời được ngay vì đã nhìn kỹ.",
            choices: [
              { label: "Trả lời điều bạn thấy, và ghi \"chưa rõ\" cho chỗ bạn không chắc", next: "good" },
              { label: "Trả lời cho chắc là nhanh dù thực ra chưa để ý", next: "bad_invent" },
            ],
          },
          bad_invent: {
            text: "Kỹ thuật viên tra theo mã đèn nhanh và đi sai hướng. Khi phát hiện chi tiết đó bịa, mất thêm thời gian để làm lại từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Kỹ thuật viên biết chính xác điều bạn thấy và điều bạn chưa chắc, nên kiểm đúng chỗ. Máy chạy lại sớm hơn và cả tổ biết chỗ nào trong mẫu còn cần quan sát kỹ hơn lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Báo sự cố tốt chỉ kể điều thấy, giờ xảy ra và việc đã thử.",
          "Bài sau: lập lịch bảo trì phòng ngừa từ số giờ chạy của máy.",
        ],
      },
    ],
  },
  {
    id: 2171,
    slug: "lap-lich-bao-tri-phong-ngua-tu-so-gio-chay",
    title: "Chặng 38, Bài 12: Lập lịch bảo trì phòng ngừa từ số giờ chạy máy",
    subtitle: "Bảo trì quá dày tốn tiền, quá thưa thì máy tự dừng lúc bạn không chọn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảo trì phòng ngừa là chọn trước lúc nào dừng máy, thay vì để máy chọn giúp bạn vào đúng đợt gấp hàng. Nhìn được đánh đổi giữa hai kiểu dừng giúp bạn đề xuất lịch có căn cứ thay vì làm theo thói quen.",
    openingQuestion:
      "Xưởng bạn bảo trì máy ép mỗi tháng một lần vì \"từ trước tới giờ vẫn vậy\". Sếp hỏi có nên kéo dài lên hai tháng để đỡ dừng máy không. Bạn nhờ AI hỗ trợ. Điều gì nên có trong câu trả lời?",
    openingOptions: [
      "So chi phí dừng có kế hoạch với chi phí hỏng đột xuất theo số giờ chạy",
      "Câu chắc nịch: hai tháng là đủ vì máy mới nên khó hỏng",
      "Danh sách lịch bảo trì của các xưởng khác trong khu công nghiệp",
      "Đề xuất giữ nguyên mỗi tháng vì càng bảo trì nhiều càng tốt",
    ],
    correctOption: 0,
    explanation:
      "Khoảng cách bảo trì là một đánh đổi: bảo trì dày thì tốn công và dừng máy nhiều lần có kế hoạch, bảo trì thưa thì khả năng hỏng đột xuất tăng. Câu trả lời tốt đặt hai loại chi phí cạnh nhau và tính theo số giờ chạy thực tế. Kết luận chắc nịch về máy mới thiếu số liệu, lịch của xưởng khác chưa chắc hợp với máy bạn, và bảo trì càng nhiều càng tốt bỏ qua phần chi phí.",
    diagram: [
      { label: "Lấy số giờ chạy và các lần hỏng đã ghi", arrow: true },
      { label: "AI tính chi phí theo từng khoảng cách bảo trì", arrow: true },
      { label: "Bạn kiểm giả định chi phí với bộ phận bảo trì", arrow: true },
      { label: "Chọn khoảng cách và xem lại sau ba tháng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: xưởng ép nhựa nhỏ",
      description:
        "Một xưởng bảo trì máy ép theo lịch tháng nhưng máy vẫn hỏng bơm dầu vào những đợt đông đơn. Khi quản đốc tính theo số giờ chạy thay vì theo tháng, các đợt gấp hàng khiến máy chạy nhiều giờ hơn và lịch phải dày hơn ở những đợt đó. Đây là tình huống minh hoạ, không phải một công ty thật.",
    },
    quiz: [
      q(
        "Khoảng cách giữa hai lần bảo trì quá dài thì điều gì dễ xảy ra nhất?",
        "Máy hỏng đột xuất nhiều hơn và dừng lâu hơn",
        "Chi phí bảo trì giảm nên tổng chi phí cả năm cũng giảm theo",
        "Máy chạy êm hơn vì ít bị tháo ra lắp vào nhiều lần",
        "Máy dừng có kế hoạch nhiều hơn vì phải sửa bù các lần đã bỏ",
        "Bảo trì thưa thì linh kiện mòn không được thay kịp, hỏng đột xuất tăng. Nói tổng chi phí luôn giảm là bỏ qua phần hỏng, còn máy êm hơn hay dừng có kế hoạch nhiều hơn đều đi ngược với thực tế.",
      ),
      q(
        "Bảo trì phòng ngừa khác sửa khi hỏng ở điểm nào?",
        "Dừng máy theo kế hoạch, chọn lúc ít ảnh hưởng, trước khi hỏng xảy ra",
        "Chỉ thay linh kiện mới, không kiểm hay bôi trơn",
        "Chỉ làm khi kỹ thuật viên rảnh, không theo số giờ chạy",
        "Tốn thêm chi phí mà không giảm được lần dừng nào cho xưởng",
        "Điểm khác chính là chủ động chọn thời điểm dừng. Bảo trì phòng ngừa gồm kiểm, bôi trơn và thay theo số giờ chạy, nên ba mô tả còn lại đều sai về nội dung hoặc về mục tiêu.",
      ),
      q(
        "Máy chạy 3.000 giờ mỗi năm, bảo trì sau mỗi 600 giờ chạy. Số lần bảo trì mỗi năm?",
        "5 lần (= 3.000 / 600)",
        "0,2 lần (= 600 / 3.000, chia ngược)",
        "6 lần (= 3.000 / 600 + 1, cộng thêm một lần đầu năm)",
        "2.400 lần (= 3.000 − 600, trừ thay vì chia)",
        "Số lần bảo trì bằng số giờ chạy chia cho khoảng cách: 3.000 / 600 = 5. Chia ngược cho ra số thập phân vô nghĩa, cộng thêm một lần là tự thêm điều kiện không có, còn phép trừ không cho ra số lần.",
      ),
      q(
        "Trên biểu đồ, kéo thanh \"chi phí mỗi lần hỏng đột xuất\" lên cao thì điểm tổng chi phí thấp nhất dịch chuyển thế nào?",
        "Dịch về khoảng cách ngắn hơn, tức bảo trì thường xuyên hơn",
        "Dịch về khoảng cách dài hơn, vì hỏng đột xuất trở nên hiếm đi và không đáng phòng",
        "Đứng yên vì chi phí hỏng không liên quan tới lịch bảo trì",
        "Biến mất, vì lúc đó nên chờ hỏng rồi sửa cho đỡ tốn",
        "Khi mỗi lần hỏng đắt hơn, đường tổng chi phí bên phía khoảng cách dài dốc lên, nên điểm thấp nhất lùi về khoảng cách ngắn. Phương án còn lại đều đảo chiều hoặc bỏ qua mối liên hệ giữa hai loại chi phí.",
      ),
      q(
        "Lịch bảo trì nên căn cứ chính vào đâu?",
        "Số giờ chạy thực tế của máy và lịch sử hỏng của chính nó",
        "Ngày đẹp trong tháng để cả xưởng nghỉ cùng lúc",
        "Lịch của xưởng lân cận vì họ cũng dùng loại máy đó",
        "Thói quen từng ca: ca nào rảnh thì ca đó làm việc này",
        "Máy hao mòn theo giờ chạy chứ không theo lịch treo tường, và lịch sử hỏng của chính máy đó là bằng chứng gần nhất. Ba phương án còn lại chọn theo sự tiện lợi hoặc theo máy khác, không theo tình trạng thật.",
      ),
    ],
    keyTakeaways: [
      "Bảo trì phòng ngừa là chọn trước lúc dừng máy, thay vì để máy tự dừng.",
      "Khoảng cách tối ưu nằm ở điểm hai loại chi phí gặp nhau, không ở hai đầu.",
      "Tính theo số giờ chạy thực tế, không theo lịch tháng cố định.",
      "Giả định chi phí do AI nêu phải được bộ phận bảo trì xác nhận.",
    ],
    practicePrompt: {
      question:
        "Chi phí dừng bảo trì mỗi lần là 4 đơn vị, chi phí mỗi lần hỏng đột xuất là 30 đơn vị (số liệu minh hoạ). Một máy hỏng đột xuất 2 lần một năm. Cách nghĩ đúng là gì?",
      options: [
        "So 2 × 30 = 60 với chi phí bảo trì thêm để xem có giảm được số lần hỏng không",
        "Bỏ bảo trì vì 4 đơn vị mỗi lần đã lớn hơn 30",
        "Chỉ nhìn số lần bảo trì, số lần hỏng là chuyện may rủi",
        "Cộng 4 + 30 = 34 rồi coi là chi phí mỗi năm",
      ],
      correct: 0,
      explanation:
        "Hỏng đột xuất tốn 2 × 30 = 60 mỗi năm, nên bảo trì thêm đáng làm nếu nó giảm được số lần hỏng với chi phí thấp hơn 60. Bỏ bảo trì vì 4 lớn hơn 30 là so sai đại lượng, bỏ qua số lần hỏng là bỏ dữ liệu, còn cộng 4 + 30 gộp hai thứ không cùng loại.",
    },
    summary: {
      keyIdea: "Lịch bảo trì tốt nằm ở điểm cân bằng giữa chi phí dừng có kế hoạch và chi phí hỏng đột xuất.",
      formula: "Tổng chi phí = chi phí bảo trì + chi phí hỏng đột xuất; chọn khoảng cách làm tổng nhỏ nhất.",
      commonMistake: "Giữ lịch theo thói quen cả năm mà không xem lại số giờ chạy và số lần hỏng thật.",
      action: "Ghi số giờ chạy và số lần hỏng của một máy trong ba tháng để có số liệu thật cho lần bàn lịch tới.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một máy hoặc thiết bị bạn phụ trách hoặc hay dùng. Lấy số giờ chạy (hoặc số ca chạy) và các lần hỏng trong nửa năm gần nhất. Nhờ AI lập bảng so hai phương án lịch bảo trì, rồi gạch chân những giả định về chi phí mà bạn chưa biết để hỏi bộ phận bảo trì hoặc kế toán.",
      secondary: "Mai bạn sẽ được hỏi: giả định chi phí nào bạn chưa biết và bạn định hỏi ai?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai đầu tháng, xưởng dừng máy ép để bảo trì đúng lịch, và đúng tuần sau, khi đơn hàng dồn về, một máy khác tự dừng vì hỏng bơm dầu. Cả hai lần dừng đều tốn thời gian, chỉ khác ở chỗ lần đầu do bạn chọn và lần sau thì không.",
      },
      {
        type: "feynman",
        title: "Lịch bảo trì đơn giản hơn bạn nghĩ",
        intro:
          "Xe máy của bạn thay nhớt theo số cây số, không theo ngày trên lịch. Thay quá sớm thì tốn tiền nhớt, thay quá muộn thì máy mòn nhanh và một hôm xe chết giữa đường. Máy trong xưởng cũng vậy, chỉ có điều đơn vị đo là giờ chạy.",
        columns: ["Thành phần", "Thay nhớt xe máy", "Bảo trì máy trong xưởng"],
        rows: [
          ["Đơn vị đo", "Số cây số đã chạy", "Số giờ chạy của máy"],
          ["Làm quá dày", "Tốn nhớt, tốn thời gian ghé tiệm", "Dừng máy nhiều lần có kế hoạch"],
          ["Làm quá thưa", "Xe chết giữa đường", "Máy hỏng đột xuất, dừng lâu"],
        ],
        oneLiner: "Chọn khoảng cách bảo trì là chọn điểm hai loại chi phí bằng nhau, không phải chọn hai đầu.",
      },
      { type: "heading", text: "Hai loại dừng máy" },
      {
        type: "paragraph",
        text: "Dừng có kế hoạch thì ngắn, bạn chọn được giờ và có sẵn phụ tùng. Dừng đột xuất thì dài hơn, hay đến vào lúc bận nhất và thường kéo theo hư hại lan sang chi tiết khác. Lịch bảo trì là cách đổi nhiều lần dừng ngắn lấy ít lần dừng dài.",
      },
      {
        type: "chart",
        title: "Chi phí theo khoảng cách giữa hai lần bảo trì",
        caption: "Số liệu minh hoạ, đơn vị chi phí tương đối trên mỗi 1.000 giờ chạy. Kéo thanh trượt xem điểm thấp nhất dịch chuyển thế nào khi hai loại chi phí thay đổi.",
        kind: "line",
        xLabel: "Giờ chạy giữa hai lần bảo trì",
        yLabel: "Chi phí trên 1.000 giờ chạy",
        x: { from: 100, to: 1000, step: 100 },
        params: [
          { id: "plan", label: "Chi phí mỗi lần bảo trì", min: 1, max: 10, step: 1, value: 5, unit: "đơn vị" },
          { id: "fail", label: "Chi phí mỗi lần hỏng đột xuất", min: 10, max: 80, step: 5, value: 50, unit: "đơn vị" },
        ],
        series: [
          { label: "Chi phí bảo trì có kế hoạch", expr: "plan*1000/x" },
          { label: "Chi phí hỏng đột xuất", expr: "fail*x^2/200000" },
          { label: "Tổng cộng", expr: "plan*1000/x+fail*x^2/200000" },
        ],
      },
      {
        type: "list",
        items: [
          "Dữ liệu cần lấy: số giờ chạy mỗi ca, ngày và thời gian mỗi lần hỏng, linh kiện đã thay.",
          "Điều bạn giao cho AI: dựng bảng và so hai ba phương án khoảng cách.",
          "Điều bạn tự kiểm: chi phí mỗi lần hỏng và mỗi lần bảo trì, vì AI không biết số thật của xưởng bạn.",
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Chu kỳ bảo trì của từng loại máy còn theo hướng dẫn của nhà sản xuất và quy định an toàn của công ty. AI chỉ giúp bạn so phương án, không thay tài liệu bảo trì chính thức. Chưa chắc thì hỏi kỹ thuật viên hoặc trưởng bộ phận bảo trì.",
      },
      {
        type: "scenario",
        title: "Sếp muốn kéo dài lịch bảo trì",
        start: "s1",
        nodes: {
          s1: {
            text: "Đợt gấp hàng sắp tới. Sếp hỏi: \"Bảo trì máy ép có hoãn thêm hai tuần được không? Chạy cho kịp đơn.\" Bạn có bảng số giờ chạy và ba lần hỏng bơm dầu trong sáu tháng.",
            choices: [
              { label: "Đồng ý hoãn vì đơn gấp, máy vẫn đang chạy tốt", next: "bad_skip" },
              { label: "Nhờ AI so hai phương án: hoãn hai tuần và bảo trì một buổi tối cuối tuần", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Giữa đợt gấp, máy hỏng bơm dầu lần thứ tư và dừng hai ngày vì chờ phụ tùng. Đơn hàng trễ nhiều hơn so với việc dừng một buổi tối.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về bảng so sánh. Phương án hoãn có tổng chi phí thấp hơn, nhưng nó dùng chi phí mỗi lần hỏng do AI tự giả định, không phải số của xưởng.",
            choices: [
              { label: "Hỏi bộ phận bảo trì số thật rồi tính lại trước khi trả lời sếp", next: "good" },
              { label: "Đưa nguyên bảng cho sếp vì trông có số liệu đầy đủ", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Sếp quyết định dựa trên số giả định. Khi bộ phận bảo trì nói chi phí thật cao gấp ba, quyết định đã không còn hợp lý và bạn không có căn cứ nào để giải thích.",
            ending: "bad",
          },
          good: {
            text: "Với số thật, bảo trì một buổi tối cuối tuần rẻ hơn hoãn. Bạn đưa sếp hai phương án cùng nguồn của từng con số, và sếp chọn phương án dừng có kế hoạch.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lịch bảo trì tốt nằm ở điểm cân bằng, tính theo số giờ chạy thực tế.",
          "Bài sau: bắt lỗi khi AI kết luận nguyên nhân gốc quá vội.",
        ],
      },
    ],
  },
  {
    id: 2172,
    slug: "bat-loi-nguyen-nhan-goc-do-ai-de-xuat",
    title: "Chặng 38, Bài 13: Bắt lỗi nguyên nhân gốc do AI đề xuất",
    subtitle: "Kết luận \"do thao tác viên\" ngay dòng đầu là dấu hiệu dừng hỏi quá sớm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi AI nói \"lỗi do người vận hành\", câu trả lời nghe gọn nên dễ được chấp nhận. Nhưng kết luận đó thường là điểm dừng của người lười hỏi, không phải nguyên nhân gốc. Biết hỏi \"vì sao\" thêm vài lớp và đòi bằng chứng giúp bạn sửa đúng chỗ thay vì đổ lỗi.",
    openingQuestion:
      "Máy dập dừng ba lần trong tuần. Bạn nhờ AI phân tích và dòng đầu tiên nó viết: \"Nguyên nhân: thao tác viên vận hành sai quy trình\". Phản ứng hợp lý nhất là gì?",
    openingOptions: [
      "Hỏi tiếp \"vì sao\" và đòi bằng chứng cho từng lớp",
      "Ghi vào báo cáo luôn vì kết luận này nghe rất hợp lý",
      "Yêu cầu AI viết lại thành \"nguyên nhân: lỗi con người\"",
      "Bỏ qua phân tích của AI và tự viết lại từ trí nhớ",
    ],
    correctOption: 0,
    explanation:
      "\"Thao tác viên sai\" mới là lớp bề mặt: vì sao họ thao tác như vậy, quy trình có rõ không, máy có báo gì trước đó không. Hỏi tiếp nhiều lớp và đòi bằng chứng ở mỗi lớp đưa bạn tới nguyên nhân có thể sửa. Ghi luôn thì đổ lỗi cho người mà chưa kiểm chứng, đổi cách gọi thành \"lỗi con người\" không thêm thông tin nào, và bỏ hẳn phân tích lại vứt đi phần AI làm đúng là gợi ý các câu hỏi.",
    diagram: [
      { label: "AI nêu một nguyên nhân ở dòng đầu", arrow: true },
      { label: "Hỏi vì sao lần một, lần hai, lần ba", arrow: true },
      { label: "Đòi bằng chứng cho từng lớp", arrow: true },
      { label: "Dừng ở nguyên nhân bạn sửa được và có chứng cứ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: xưởng dập kim loại",
      description:
        "Một xưởng ghi \"thao tác viên bấm nhầm nút\" cho ba lần dừng máy liên tiếp. Khi hỏi thêm mới thấy hai nút đặt sát nhau và không có nhãn, và ca nào cũng có người bấm nhầm. Sửa bằng cách tách nút và dán nhãn thì lỗi hết lặp lại. Đây là tình huống minh hoạ, không phải một công ty thật.",
    },
    quiz: [
      q(
        "AI kết luận \"do thao tác viên\" ngay dòng đầu. Bạn nên làm gì trước?",
        "Hỏi \"vì sao\" nhiều lớp và đòi bằng chứng cho từng lớp",
        "Ghi luôn vào báo cáo vì kết luận đã rõ ràng",
        "Nhờ AI viết lại kết luận cho nhẹ nhàng, khó mích lòng người",
        "Hỏi thao tác viên có thừa nhận hay không rồi chốt",
        "Kết luận sớm nhất thường chỉ là lớp bề mặt, nên cần hỏi tiếp để ra nguyên nhân sửa được. Ghi luôn hay làm nhẹ câu chữ vẫn giữ nguyên chưa kiểm, còn chỉ hỏi người bị nêu tên thì bằng chứng chỉ có một phía.",
      ),
      q(
        "Hỏi \"vì sao\" lần đầu ra \"dây curoa đứt\". Câu hỏi tiếp theo hợp lý là gì?",
        "Vì sao dây đứt: mòn, căng quá hay kẹt vật lạ?",
        "Ai thay dây curoa lần gần nhất?",
        "Dây curoa mới giá bao nhiêu để đặt hàng cho nhanh?",
        "Có nên đổi sang loại máy khác không?",
        "Lớp \"vì sao\" tiếp theo đi sâu vào cơ chế đứt dây. Hỏi ai thay dây là chuyển sang tìm người, hỏi giá là chuyển sang mua hàng, và hỏi đổi máy là nhảy tới giải pháp lớn khi chưa hiểu nguyên nhân.",
      ),
      q(
        "Bằng chứng nào cho thấy \"do thao tác viên\" là đúng?",
        "Nhật ký ca, video hoặc lời kể cho thấy thao tác đó trùng giờ dừng",
        "Việc thao tác viên đó từng bị nhắc nhở trước đây",
        "Ý kiến chung của cả tổ rằng chuyện này hay xảy ra",
        "Việc AI nói chắc chắn và đưa ra nhiều chi tiết",
        "Bằng chứng phải gắn thao tác với đúng thời điểm dừng. Lần bị nhắc trước đó và ý kiến chung chỉ là tin đồn về thói quen, còn AI nói chắc chỉ cho thấy nó viết trôi chảy chứ không chứng minh điều gì.",
      ),
      q(
        "Chuỗi vì sao dừng lại ở \"thao tác sai\" là chưa đủ vì sao?",
        "Người thao tác sai thường vì quy trình, đào tạo hoặc thiết kế máy chưa tốt",
        "Vì thao tác viên thường không sai gì cả",
        "Vì kỹ thuật viên mới là người chịu trách nhiệm về máy",
        "Vì báo cáo nên tìm nguyên nhân từ máy chứ không từ người, bất kể sự việc cụ thể ra sao",
        "Một thao tác sai lặp lại thường cho thấy điều gì đó trong hệ thống đã dẫn họ tới đó. Nói thao tác viên không bao giờ sai, hoặc chỉ tìm ở máy, đều là kết luận trước khi có bằng chứng.",
      ),
      q(
        "Chuỗi \"vì sao\" nên dừng ở đâu là hợp lý?",
        "Khi tới điều bạn sửa được và có bằng chứng cho từng bước",
        "Đúng ba lần hỏi, vì ba là con số thường được dùng trong các buổi phân tích sự cố",
        "Khi AI không còn đưa ra thêm câu trả lời nào cho câu hỏi tiếp theo của bạn",
        "Khi có tên một người để ghi vào báo cáo cho cuộc họp kịp giờ kết thúc",
        "Điểm dừng theo nội dung: có nguyên nhân sửa được và mỗi bước đều có chứng cứ. Số lần hỏi cố định chỉ là quy ước, AI hết trả lời không có nghĩa là hết nguyên nhân, và tên người không phải nguyên nhân.",
      ),
    ],
    keyTakeaways: [
      "Kết luận ở dòng đầu thường chỉ là lớp bề mặt.",
      "Hỏi \"vì sao\" nhiều lớp, mỗi lớp đòi bằng chứng.",
      "Nguyên nhân gốc tốt là điều bạn sửa được, không phải tên một người.",
      "AI viết trôi chảy không có nghĩa là AI đúng.",
    ],
    practicePrompt: {
      question:
        "Nhật ký ca cho thấy máy dừng đúng lúc thao tác viên bấm nút số 2, nhưng ba ca khác nhau đều có chuyện tương tự. Kết luận hợp lý nhất là gì?",
      options: [
        "Cần xem vì sao nhiều người khác nhau cùng bấm nút đó: có thể do bố trí hoặc hướng dẫn",
        "Cả ba thao tác viên đều cẩu thả, cần nhắc nhở cả ba",
        "Nút số 2 hỏng nên thay nút là xong",
        "Chưa cần làm gì vì lỗi này không nặng",
      ],
      correct: 0,
      explanation:
        "Cùng một thao tác lặp lại ở nhiều người thường chỉ ra nguyên nhân nằm ở hệ thống. Kết luận cẩu thả hay thay nút đều nhảy tới giải pháp khi chưa hiểu nguyên nhân, còn bỏ qua vì không nặng là bỏ dữ liệu.",
    },
    summary: {
      keyIdea: "Kết luận đầu tiên của AI là điểm bắt đầu của việc hỏi, không phải điểm kết thúc.",
      formula: "Nguyên nhân bề mặt → hỏi vì sao → bằng chứng → lớp sâu hơn → điều sửa được.",
      commonMistake: "Chấp nhận \"lỗi con người\" làm nguyên nhân gốc vì nó nghe gọn và dễ ghi.",
      action: "Lấy một sự cố cũ có kết luận \"do người\" và hỏi thêm ít nhất ba lớp vì sao.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một sự cố trong công việc của bạn mà kết luận cuối cùng là \"do người\". Nhờ AI đề xuất chuỗi vì sao, sau đó với mỗi lớp, ghi bên cạnh bằng chứng có hoặc chưa có. Gạch chân lớp đầu tiên mà bạn thật sự sửa được bằng một thay đổi trong quy trình hoặc bố trí.",
      secondary: "Mai bạn sẽ được hỏi: lớp nào trong chuỗi vì sao là lớp bạn sửa được?",
    },
    sections: [
      {
        type: "lead",
        text: "Cuộc họp sự cố kéo dài mười phút thì có người nói \"chắc do thao tác\". Nghe hợp lý, cả phòng gật đầu, và biên bản ghi một dòng. Ba tuần sau máy dừng lại y như cũ vì chưa ai hỏi vì sao thao tác đó xảy ra.",
      },
      {
        type: "feynman",
        title: "Nguyên nhân gốc đơn giản hơn bạn nghĩ",
        intro:
          "Trần nhà bị ướt một vệt. Bạn có thể lau vệt đó, nhưng vài hôm sau nó lại ướt. Muốn hết hẳn phải lần theo vệt nước lên tới chỗ ống nước hoặc mái nhà bị rò. Vệt ướt là hiện tượng, chỗ rò mới là nguyên nhân.",
        columns: ["Thành phần", "Trần nhà dột", "Sự cố máy"],
        rows: [
          ["Điều nhìn thấy", "Một vệt nước trên trần", "Máy dừng, thao tác bị nêu là sai"],
          ["Hỏi tiếp", "Nước đến từ đâu?", "Vì sao thao tác đó xảy ra?"],
          ["Điểm sửa", "Chỗ ống bị rò", "Quy trình, bố trí hoặc đào tạo chưa rõ"],
        ],
        oneLiner: "Lần theo vệt ướt lên chỗ rò: hỏi vì sao cho tới khi gặp điều sửa được.",
      },
      { type: "heading", text: "Vì sao AI hay dừng quá sớm" },
      {
        type: "paragraph",
        text: "AI được huấn luyện để trả lời gọn và tự tin. Với câu hỏi \"nguyên nhân là gì\", câu trả lời gọn nhất thường là một người hoặc một hành động. Nó không biết quy trình thật của xưởng bạn, nên nó điền chỗ trống bằng điều nghe phổ biến.",
      },
      {
        type: "flow",
        title: "Từ kết luận vội tới nguyên nhân gốc",
        steps: [
          { label: "Đọc kết luận của AI", detail: "Xem nó dựa trên dữ liệu nào bạn đã đưa. Nếu bạn chưa đưa nhật ký ca thì kết luận đó chỉ là phỏng đoán." },
          { label: "Hỏi vì sao lần một", detail: "Hỏi vì sao thao tác đó xảy ra, và đòi AI nói rõ dữ kiện nào ủng hộ." },
          { label: "Tìm bằng chứng thật", detail: "Mở nhật ký ca, video, hướng dẫn vận hành. Nếu không có bằng chứng thì ghi rõ là chưa kiểm." },
          { label: "Hỏi thêm lớp sâu hơn", detail: "Quy trình có rõ không, máy có báo trước không, người mới có được hướng dẫn không." },
          { label: "Dừng ở điều sửa được", detail: "Viết nguyên nhân gốc thành một việc có thể sửa, đi kèm bằng chứng của từng bước." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản phân tích nguyên nhân do AI viết",
        task: "AI viết bản phân tích sự cố máy dập. Bấm vào những đoạn bạn nghĩ là bịa hoặc chưa có bằng chứng, rồi nộp.",
        segments: [
          { text: "Máy dập số 4 dừng ba lần trong tuần, mỗi lần khoảng 20 phút, theo nhật ký ca mà bạn cung cấp." },
          { text: "Nguyên nhân chính: thao tác viên ca đêm vận hành sai quy trình.", error: "Bạn chưa đưa nhật ký nào cho thấy thao tác cụ thể nào sai. Kết luận này là phỏng đoán chỉ tên người." },
          { text: "Ca sáng và ca chiều cũng có một lần dừng, nên thao tác viên ca đêm không phải người duy nhất gặp sự cố." },
          { text: "Trước mỗi lần dừng, cảm biến áp suất báo cảnh báo khoảng 30 giây, theo ghi chú của tổ." },
          { text: "Thao tác viên này đã bị nhắc nhở hai lần trong năm ngoái vì lỗi tương tự.", error: "Bạn không nói gì về lịch sử nhắc nhở. AI bịa chi tiết này để làm kết luận thêm sức nặng." },
          { text: "Cần kiểm thêm: quy trình xử lý khi cảm biến cảnh báo có được viết rõ và dạy cho người mới hay chưa." },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Phân tích sự cố là để sửa quy trình, không phải để kỷ luật ai. Nếu có việc liên quan tới người, việc đánh giá thuộc trách nhiệm của quản lý và bộ phận nhân sự theo quy định công ty, không phải của bản phân tích do AI viết.",
      },
      {
        type: "scenario",
        title: "Họp sự cố lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đề xuất \"nguyên nhân: thao tác viên ca đêm\". Trưởng ca hỏi bạn: \"Vậy ghi vào biên bản nhé?\" Bạn có sẵn nhật ký ca và ghi chú cảnh báo cảm biến.",
            choices: [
              { label: "Đồng ý ghi luôn để họp cho kịp giờ", next: "bad_blame" },
              { label: "Xin thêm 10 phút, hỏi AI vì sao thao tác đó xảy ra rồi đối chiếu nhật ký", next: "s2" },
            ],
          },
          bad_blame: {
            text: "Biên bản ghi tên một người. Hai tuần sau ca khác gặp đúng lỗi đó vì hướng dẫn xử lý cảnh báo vẫn chưa được viết rõ, và người đêm đó cảm thấy bị đổ lỗi oan.",
            ending: "bad",
          },
          s2: {
            text: "Nhật ký cho thấy cảnh báo cảm biến xuất hiện 30 giây trước mỗi lần dừng và không ai biết phải làm gì khi thấy nó. AI đề xuất thêm một lớp: hướng dẫn xử lý cảnh báo chưa có.",
            choices: [
              { label: "Ghi nguyên nhân là hướng dẫn xử lý cảnh báo chưa có, kèm nhật ký làm bằng chứng", next: "good" },
              { label: "Ghi thêm rằng hai người ca đêm cần đào tạo lại vì AI gợi ý như vậy", next: "bad_extra" },
            ],
          },
          bad_extra: {
            text: "Gợi ý đào tạo lại hai người không có bằng chứng nào trong nhật ký. Biên bản lại chỉ tên người, và nguyên nhân thật là thiếu hướng dẫn bị lu mờ.",
            ending: "bad",
          },
          good: {
            text: "Biên bản ghi một việc sửa được: viết và dạy hướng dẫn xử lý cảnh báo cho cả ba ca. Mọi người thấy mình được hỏi đúng chỗ, và lỗi này không lặp lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Kết luận đầu tiên của AI là chỗ bắt đầu hỏi, không phải chỗ dừng.",
          "Bài sau: viết báo cáo sự cố nói việc, không quy lỗi cho người.",
        ],
      },
    ],
  },
  {
    id: 2173,
    slug: "viet-bao-cao-su-co-khong-quy-loi-cho-ai",
    title: "Chặng 38, Bài 14: Viết báo cáo sự cố nói việc, không quy lỗi cho người",
    subtitle: "Một bản báo cáo kể diễn biến sẽ được đọc lại nhiều năm, còn bản chê người thì bị né tránh.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Báo cáo sự cố sẽ được đọc bởi người không có mặt: sếp, ca sau, người mới vào. Nếu nó chỉ ghi \"ai làm sai\", mọi người học cách giấu. Nếu nó kể việc theo trình tự, người đọc học được điều cần đổi.",
    openingQuestion:
      "Sau buổi họp sự cố, bạn phải viết báo cáo. Bạn nhờ AI dựng bản nháp từ ghi chú cuộc họp. Điều gì làm bản nháp đáng tin cậy hơn?",
    openingOptions: [
      "Kể theo trình tự thời gian bằng ngôn ngữ trung tính, mô tả việc",
      "Dùng từ mạnh như \"cẩu thả\", \"thiếu trách nhiệm\" để nhấn mạnh sự việc",
      "Chỉ ghi kết luận cuối cùng, bỏ phần diễn biến cho gọn",
      "Để AI tự quyết mức độ nghiêm trọng và người chịu trách nhiệm",
    ],
    correctOption: 0,
    explanation:
      "Báo cáo trung tính theo trình tự cho người đọc thấy chuyện gì xảy ra, việc nào đã làm, ai quyết định dựa trên thông tin gì. Từ mạnh biến báo cáo thành lời buộc tội và làm người ta né tránh lần sau. Chỉ ghi kết luận mất phần diễn biến mà người đọc cần để học. Để AI tự định người chịu trách nhiệm là giao một việc cần bằng chứng và thẩm quyền cho một công cụ không có cả hai.",
    diagram: [
      { label: "Gom ghi chú cuộc họp và nhật ký ca", arrow: true },
      { label: "AI dựng bản nháp theo trình tự thời gian", arrow: true },
      { label: "Bạn đổi mọi từ đánh giá người thành mô tả việc", arrow: true },
      { label: "Người có mặt đọc lại mốc giờ, rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhà máy đóng gói thực phẩm",
      description:
        "Hai bản báo cáo về cùng một lần dừng chuyền. Bản một viết \"công nhân X quên mở van\", bản hai viết \"van số 3 đóng lúc 14:05 khi áp suất tăng, hướng dẫn ca chưa ghi việc kiểm van\". Chỉ bản hai giúp ca sau biết cần kiểm gì. Đây là tình huống minh hoạ, không phải một công ty thật.",
    },
    quiz: [
      q(
        "Báo cáo sự cố nên được viết theo trình tự nào?",
        "Theo thời gian: điều xảy ra, việc đã làm, kết quả, việc tiếp theo",
        "Theo mức độ lỗi của từng người, từ nặng tới nhẹ",
        "Kết luận trước, còn chi tiết diễn biến thì bỏ",
        "Theo thứ tự ai phát biểu trước trong cuộc họp",
        "Trình tự thời gian giúp người đọc dựng lại sự việc. Xếp theo mức lỗi là chấm điểm người, chỉ kết luận làm mất bối cảnh, còn theo thứ tự phát biểu phản ánh cuộc họp chứ không phản ánh sự cố.",
      ),
      q(
        "Câu nào sau đây trung tính, nói việc thay vì quy lỗi?",
        "Van số 3 đóng lúc 14:05 khi áp suất tăng",
        "Anh Nam quên mở van số 3 lúc 14:05",
        "Van số 3 bị đóng do cẩu thả của ca chiều hôm đó",
        "Ca chiều làm việc thiếu trách nhiệm",
        "Câu đúng ghi lại sự kiện, giờ và điều kiện, có thể kiểm được. Ba câu còn lại gán ý định hoặc tính cách (quên, cẩu thả, thiếu trách nhiệm) mà báo cáo không chứng minh được.",
      ),
      q(
        "Bản nháp của AI có câu \"do sự bất cẩn của tổ vận hành\". Nên sửa thế nào?",
        "Thay bằng điều đã xảy ra và bằng chứng, bỏ chữ đánh giá",
        "Giữ nguyên vì AI tổng hợp từ ghi chú cuộc họp",
        "Đổi thành \"do sự thiếu chú ý\" cho nhẹ hơn nhưng vẫn giữ ý",
        "Xoá cả đoạn và không nói gì tới thao tác của tổ",
        "Cách sửa đúng là đưa việc đã xảy ra vào chỗ chữ đánh giá. Đổi từ nhẹ hơn vẫn là đánh giá, còn xoá cả đoạn lại làm mất thông tin người đọc cần.",
      ),
      q(
        "Ai nên đọc lại bản nháp trước khi gửi đi?",
        "Người có mặt tại sự cố, để kiểm mốc giờ và diễn biến",
        "Chỉ chính bạn, vì bạn là người viết",
        "Người chưa hề biết sự cố để xem có đủ hấp dẫn không",
        "Chính AI, nhờ nó tự kiểm lại bản của nó cho chắc chắn",
        "Người có mặt biết mốc giờ nào đúng và chi tiết nào sai lệch. Tự đọc dễ bỏ sót, người không biết sự cố không kiểm được sự thật, còn AI kiểm bản của chính mình không thêm nguồn thông tin mới.",
      ),
      q(
        "Sự cố bắt đầu lúc 14:05 và máy chạy lại lúc 15:20. Thời gian dừng?",
        "75 phút (= 15:20 − 14:05)",
        "85 phút (= 60 + 20 + 5, cộng hai số phút thay vì trừ)",
        "65 phút (= 60 + 5, chỉ lấy số phút của giờ bắt đầu)",
        "95 phút (= 15:20 − 13:45, lấy nhầm mốc bắt đầu)",
        "Từ 14:05 tới 15:20 là 1 giờ 15 phút, tức 75 phút. Cộng hai số phút, bỏ số phút của mốc kết thúc hoặc lấy nhầm mốc bắt đầu đều cho ra số khác.",
      ),
    ],
    keyTakeaways: [
      "Báo cáo sự cố kể việc theo trình tự thời gian.",
      "Ngôn ngữ trung tính: mô tả sự kiện, không gán tính cách hay ý định.",
      "AI dựng nháp; người có mặt kiểm mốc giờ và diễn biến.",
      "Thông tin chưa rõ thì ghi \"chưa rõ\", không đoán.",
    ],
    practicePrompt: {
      question:
        "Ghi chú họp có câu: \"Chị Lan làm chậm nên máy dừng lâu\". Cách viết lại trung tính là gì?",
      options: [
        "Ca chiều nhận cảnh báo lúc 14:05 và bắt đầu xử lý lúc 14:35",
        "Chị Lan xử lý chậm 30 phút nên máy dừng lâu hơn mức yêu cầu của ca",
        "Ca chiều phản ứng chậm, gây kéo dài thời gian dừng",
        "Chị Lan cần được nhắc nhở về tốc độ xử lý",
      ],
      correct: 0,
      explanation:
        "Câu đúng nêu hai mốc giờ và để người đọc thấy khoảng cách. Ba câu còn lại vẫn gán chậm cho một người hoặc một ca, đề xuất nhắc nhở khi chưa biết vì sao có khoảng trống 30 phút.",
    },
    summary: {
      keyIdea: "Báo cáo tốt kể việc theo trình tự, để người đọc tự thấy điều cần đổi mà không cần ai bị nêu tên.",
      formula: "Diễn biến theo giờ + việc đã làm + kết quả + việc tiếp theo, không có từ đánh giá người.",
      commonMistake: "Để nguyên từ đánh giá do AI hoặc ghi chú họp đưa vào, khiến báo cáo thành lời buộc tội.",
      action: "Đọc lại một báo cáo cũ và gạch mọi chữ đánh giá người, rồi viết lại thành việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú của một cuộc họp hoặc một sự cố gần đây trong công việc của bạn. Nhờ AI dựng báo cáo theo trình tự thời gian, rồi tự đọc và gạch mọi chữ đánh giá người (cẩu thả, quên, chậm, thiếu trách nhiệm). Viết lại từng chỗ thành sự việc kèm giờ, và nhờ một đồng nghiệp có mặt kiểm lại mốc giờ.",
      secondary: "Mai bạn sẽ được hỏi: bạn đã đổi bao nhiêu chữ đánh giá người thành mô tả việc?",
    },
    sections: [
      {
        type: "lead",
        text: "Năm giờ chiều, cuộc họp sự cố vừa kết thúc và sếp nói: \"Chiều nay gửi báo cáo nhé.\" Ghi chú của bạn nửa gạch đầu dòng, nửa câu dang dở, và có hai chỗ ai đó buột miệng chê một đồng nghiệp. Báo cáo sẽ đi đâu tiếp theo tuỳ vào cách bạn viết những chỗ đó.",
      },
      {
        type: "feynman",
        title: "Báo cáo sự cố đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới người tường thuật một trận bóng: họ nói \"phút thứ 30, cầu thủ số 7 sút trúng xà ngang\". Họ không nói \"cầu thủ số 7 vụng về\". Người nghe vẫn hiểu chuyện gì xảy ra và tự đánh giá được. Báo cáo sự cố cũng nên tường thuật như vậy.",
        columns: ["Thành phần", "Tường thuật trận bóng", "Báo cáo sự cố"],
        rows: [
          ["Nội dung", "Phút nào, ai làm gì, kết quả ra sao", "Giờ nào, việc gì xảy ra, máy phản ứng ra sao"],
          ["Điều tránh", "Chê cầu thủ vụng về", "Gán chữ cẩu thả, quên, thiếu trách nhiệm"],
          ["Người nghe", "Khán giả không có mặt", "Ca sau, sếp, người mới vào"],
        ],
        oneLiner: "Tường thuật diễn biến bằng việc và giờ, để người đọc tự thấy điều cần thay đổi.",
      },
      { type: "heading", text: "Vì sao ngôn ngữ trung tính quan trọng" },
      {
        type: "paragraph",
        text: "Nếu báo cáo thường chỉ tên người, lần sau ai cũng giấu nửa sự thật khi có sự cố. Báo cáo trung tính thì khác: người liên quan dám kể đủ, nên bạn có dữ kiện tốt hơn để sửa. Đó là lý do trung tính không phải chuyện lịch sự mà là chuyện chất lượng dữ liệu.",
      },
      {
        type: "flow",
        title: "Từ ghi chú họp tới báo cáo sự cố",
        steps: [
          { label: "Gom nguồn", detail: "Ghi chú cuộc họp, nhật ký ca, tin nhắn báo sự cố. Ghi rõ nguồn nào cho mốc giờ nào." },
          { label: "AI dựng khung theo giờ", detail: "Nhờ AI xếp các sự kiện theo thời gian, mỗi dòng một sự việc, ghi \"chưa rõ\" nếu thiếu mốc." },
          { label: "Bạn đổi chữ đánh giá thành việc", detail: "Tìm các chữ như quên, cẩu thả, chậm và thay bằng điều đã xảy ra kèm giờ." },
          { label: "Người có mặt kiểm lại", detail: "Nhờ một người có mặt đọc mốc giờ và diễn biến, sửa chỗ AI hoặc bạn nhớ nhầm." },
          { label: "Gửi và lưu", detail: "Gửi đúng người cần đọc, lưu bản gốc kèm nhật ký để sau này đối chiếu." },
        ],
      },
      {
        type: "list",
        items: [
          "Nên có: giờ, sự kiện, việc đã làm, kết quả, việc tiếp theo và người phụ trách từng việc.",
          "Nên tránh: từ đánh giá tính cách, phỏng đoán ý định, tên người kèm lời chê.",
          "Chưa rõ thì ghi \"chưa rõ\" và ghi ai sẽ làm rõ.",
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Nếu sự cố dẫn tới thương tích, thiệt hại lớn hoặc có thể liên quan trách nhiệm pháp lý, bản báo cáo phải theo mẫu và quy trình của công ty. Hỏi bộ phận pháp chế hoặc an toàn lao động trước khi gửi ra ngoài, và không nhờ AI quyết định ai chịu trách nhiệm.",
      },
      {
        type: "scenario",
        title: "Bản nháp của AI có một câu nặng lời",
        start: "s1",
        nodes: {
          s1: {
            text: "AI dựng bản nháp từ ghi chú họp. Câu thứ ba viết: \"Chị Lan làm việc thiếu trách nhiệm nên máy dừng 75 phút.\" Chỉ còn nửa tiếng nữa là tới hạn gửi.",
            choices: [
              { label: "Giữ nguyên vì ghi chú họp có người nói vậy", next: "bad_keep" },
              { label: "Đối chiếu nhật ký ca, viết lại câu thành sự việc kèm giờ", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Báo cáo tới tay cả phòng. Chị Lan phản đối vì nhật ký ca cho thấy cảnh báo tới lúc 14:35 chứ không phải 14:05. Cuộc họp lại phải làm lại và mọi người bớt cởi mở ở lần sau.",
            ending: "bad",
          },
          s2: {
            text: "Nhật ký cho thấy cảnh báo hiện lúc 14:05, ca chiều bắt đầu xử lý lúc 14:35, máy chạy lại 15:20. Bạn còn một chỗ chưa rõ: vì sao có khoảng 30 phút giữa hai mốc đầu.",
            choices: [
              { label: "Ghi hai mốc giờ và ghi rõ \"khoảng 30 phút chưa rõ lý do, cần hỏi ca chiều\"", next: "good" },
              { label: "Điền lý do hợp lý nhất cho khoảng 30 phút đó cho báo cáo gọn", next: "bad_fill" },
            ],
          },
          bad_fill: {
            text: "Lý do bạn điền là điều bạn đoán. Khi ca chiều đọc, họ thấy sai và không còn tin bản báo cáo là công bằng.",
            ending: "bad",
          },
          good: {
            text: "Báo cáo nêu đúng hai mốc giờ và một câu hỏi mở. Ca chiều giải thích rằng lúc đó có cuộc gọi khẩn từ kho, và cả phòng thấy cần một cách phân việc khi có hai cảnh báo cùng lúc.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Báo cáo tốt kể việc theo giờ, bằng ngôn ngữ trung tính, và có người có mặt kiểm lại.",
          "Bài sau: mini-dự án ghép mẫu báo, chuỗi nguyên nhân và hành động thành một hồ sơ.",
        ],
      },
    ],
  },
  {
    id: 2174,
    slug: "mini-ho-so-mot-su-co-tu-bao-den-khac-phuc",
    title: "Chặng 38, Bài 15: Mini-dự án: hồ sơ một sự cố từ lúc báo đến lúc khắc phục",
    subtitle: "Ghép ba mảnh bạn đã học thành một hồ sơ cả ca đọc được trong năm phút.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ba kỹ năng rời rạc, báo sự cố, tìm nguyên nhân và viết báo cáo, chỉ có ích khi chúng nằm chung trong một hồ sơ. Hồ sơ giúp ca sau đọc một lần là biết chuyện gì đã xảy ra, vì sao và ai đang làm gì để nó không lặp lại.",
    openingQuestion:
      "Bạn đã có mẫu báo sự cố, một chuỗi vì sao và một báo cáo trung tính. Bạn nhờ AI ghép thành hồ sơ một sự cố. Cấu trúc nào giúp cả ca đọc là hiểu?",
    openingOptions: [
      "Báo sự cố, chuỗi nguyên nhân có bằng chứng, hành động khắc phục có người và hạn",
      "Ba tài liệu riêng dán lại, không cần nối với nhau",
      "Một trang kể chuyện văn vẻ có lời nhận định của bạn",
      "Chỉ danh sách hành động vì đó là điều mọi người cần làm",
    ],
    correctOption: 0,
    explanation:
      "Hồ sơ tốt có ba phần nối nhau: điều đã xảy ra, vì sao, và việc sẽ làm. Mỗi hành động khắc phục cần một người phụ trách và một hạn, nếu không sẽ không ai làm. Dán ba tài liệu rời làm người đọc phải tự nối. Trang văn vẻ ẩn dữ kiện dưới nhận định. Chỉ danh sách hành động mất lý do vì sao cần làm, nên ca sau khó đánh giá có làm đủ hay chưa.",
    diagram: [
      { label: "Phần 1: mẫu báo sự cố, ghi điều thấy và giờ", arrow: true },
      { label: "Phần 2: chuỗi vì sao, mỗi lớp có bằng chứng", arrow: true },
      { label: "Phần 3: hành động khắc phục, người phụ trách, hạn", arrow: true },
      { label: "Cả ca đọc và ghi lại ngày kiểm việc đã xong chưa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: tổ bảo trì của một nhà máy nhỏ",
      description:
        "Một tổ bảo trì lập hồ sơ một trang cho mỗi sự cố: phần báo, phần chuỗi vì sao và phần việc cần làm có tên và hạn. Sau vài tháng tổ nhận ra ba sự cố khác nhau cùng dẫn tới một nguyên nhân là hướng dẫn thiếu. Đây là tình huống minh hoạ, không phải một công ty thật.",
    },
    quiz: [
      q(
        "Hồ sơ một sự cố nên có những phần nào để cả ca đọc là hiểu?",
        "Điều đã xảy ra, chuỗi nguyên nhân có bằng chứng, hành động khắc phục có người và hạn",
        "Chỉ kết luận và tên người chịu trách nhiệm",
        "Ba tài liệu riêng dán liền nhau, không cần nối",
        "Ý kiến chung của cả tổ về việc này",
        "Ba phần nối nhau kể được sự việc, lý do và việc tiếp theo. Chỉ có kết luận và tên người là đổ lỗi, ba tài liệu rời buộc người đọc tự nối, còn ý kiến chung không phải dữ kiện.",
      ),
      q(
        "Một hành động khắc phục tốt cần những gì?",
        "Việc cụ thể, người phụ trách, hạn và cách kiểm đã xong",
        "Một lời hứa sẽ cố gắng hơn trong những lần làm việc sau này của cả tổ",
        "Chỉ tên bộ phận, chưa cần tên người",
        "Việc chung chung như \"nâng cao ý thức\" cho toàn xưởng",
        "Việc có người, hạn và cách kiểm mới đo được có làm xong hay chưa. Lời hứa cố gắng, chỉ tên bộ phận hay khẩu hiệu chung đều không ai chịu trách nhiệm và không kiểm được.",
      ),
      q(
        "AI dựng hồ sơ có dòng \"Người phụ trách: anh Hùng, hạn: thứ Sáu\" mà bạn chưa hề phân công. Nên làm gì?",
        "Xoá hoặc đánh dấu \"chưa phân công\" rồi hỏi người có thẩm quyền",
        "Giữ nguyên vì AI thường chọn người phù hợp với việc dựa trên hồ sơ trước",
        "Giữ nguyên nhưng báo anh Hùng sau khi hồ sơ được gửi đi",
        "Đổi thành tên bạn cho chắc chắn có người làm",
        "Phân công việc là quyết định của người có thẩm quyền, không phải của AI hay của bạn. Giữ tên AI gán hoặc tự nhận thay đều tạo ra cam kết chưa ai đồng ý.",
      ),
      q(
        "Hồ sơ có 4 hành động khắc phục, đến hôm kiểm 3 việc đã xong. Tỷ lệ hoàn thành?",
        "75% (= 3 / 4)",
        "133% (= 4 / 3, chia ngược tử và mẫu)",
        "25% (= 1 / 4, tính phần chưa xong)",
        "34% (= 3 + 4 = 7, lấy nhầm tổng số lần đếm)",
        "Tỷ lệ hoàn thành bằng số việc xong chia tổng số việc: 3 / 4 = 75%. Chia ngược cho vượt 100%, còn 25% là phần chưa xong và phương án cuối tính không có ý nghĩa.",
      ),
      q(
        "Vì sao nên ghi ngày kiểm lại các hành động khắc phục?",
        "Để biết việc đã xong thật hay chỉ nằm trên giấy",
        "Để có cớ nhắc người chậm trễ trong buổi họp tới",
        "Để hồ sơ trông đầy đủ và chuyên nghiệp hơn khi được xem xét",
        "Để bắt buộc mọi người làm trong đúng ngày đó",
        "Ngày kiểm biến hành động thành việc có kết thúc, nên sự cố mới thật sự khép lại. Dùng nó để nhắc người chậm hay trang trí hồ sơ thì hỏng mục đích, và ép mọi người làm đúng ngày là điều một ngày kiểm không làm được.",
      ),
    ],
    keyTakeaways: [
      "Hồ sơ sự cố gồm ba phần nối nhau: điều xảy ra, vì sao, việc sẽ làm.",
      "Mỗi hành động khắc phục có việc cụ thể, người phụ trách, hạn.",
      "Phân công là quyết định của người có thẩm quyền, không phải của AI.",
      "Ghi ngày kiểm để biết việc đã xong thật.",
    ],
    practicePrompt: {
      question:
        "Hồ sơ ghi hành động: \"Cần cải thiện hướng dẫn vận hành\". Cách viết lại tốt hơn là gì?",
      options: [
        "Viết thêm bước xử lý cảnh báo áp suất vào hướng dẫn máy dập, chị Mai, hạn thứ Sáu",
        "Nhắc mọi người đọc kỹ hướng dẫn hơn",
        "Cải thiện toàn bộ hệ thống hướng dẫn vận hành",
        "Giao bộ phận kỹ thuật xử lý sớm",
      ],
      correct: 0,
      explanation:
        "Câu đúng có việc cụ thể, người và hạn. Nhắc mọi người, cải thiện toàn bộ hệ thống hay giao cho bộ phận đều thiếu ít nhất một trong ba thứ, nên không kiểm được khi nào xong.",
    },
    summary: {
      keyIdea: "Hồ sơ sự cố nối ba mảnh: điều đã xảy ra, vì sao, và việc sẽ làm có người và hạn.",
      formula: "Báo sự cố + chuỗi vì sao có bằng chứng + hành động (việc, người, hạn, cách kiểm).",
      commonMistake: "Ghi hành động chung chung, không người, không hạn, nên không ai làm và không ai kiểm.",
      action: "Lập một hồ sơ một trang cho sự cố gần nhất của tổ bạn và đưa cả ca đọc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một sự cố thật hoặc gần thật trong công việc của bạn. Nhờ AI ghép hồ sơ một trang gồm ba phần: điều đã xảy ra theo giờ, chuỗi vì sao có ghi bằng chứng, và ít nhất hai hành động khắc phục có việc, người, hạn. Chỗ nào người hay hạn chưa được phân công thì ghi \"chưa phân công\", rồi đưa cho một đồng nghiệp đọc thử.",
      secondary: "Mai bạn sẽ được hỏi: hồ sơ của bạn có bao nhiêu hành động đã có người và hạn?",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, tổ bạn có một sự cố đã được báo, đã họp và đã có vài ý kiến về nguyên nhân, nhưng mỗi thứ nằm ở một chỗ: tin nhắn, ghi chú họp, một file nháp. Tuần sau ca mới vào hỏi \"chuyện gì đã xảy ra vậy\" và không ai có một trang nào để đưa.",
      },
      {
        type: "feynman",
        title: "Hồ sơ sự cố đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hồ sơ bệnh án: lý do đến khám, chẩn đoán dựa trên kết quả nào, và hướng điều trị kèm lịch tái khám. Bác sĩ khác đọc một lần là biết mình cần làm gì. Hồ sơ sự cố cũng có ba phần như vậy.",
        columns: ["Thành phần", "Hồ sơ bệnh án", "Hồ sơ sự cố"],
        rows: [
          ["Phần đầu", "Lý do khám, triệu chứng, giờ khởi phát", "Điều thấy, giờ dừng, việc đã thử"],
          ["Phần giữa", "Chẩn đoán dựa trên kết quả xét nghiệm", "Chuỗi vì sao dựa trên bằng chứng"],
          ["Phần cuối", "Điều trị và lịch tái khám", "Hành động khắc phục, người phụ trách, ngày kiểm"],
        ],
        oneLiner: "Hồ sơ tốt cho người đọc thấy chuyện gì, vì sao, và ai đang làm gì tiếp.",
      },
      { type: "heading", text: "Ghép ba mảnh thành một" },
      {
        type: "paragraph",
        text: "Ba mảnh bạn đã học đều nằm sẵn trong các bài trước: mẫu báo ba dòng, chuỗi vì sao có bằng chứng, báo cáo trung tính theo giờ. Việc còn lại là ghép chúng lại và thêm một phần cuối: hành động khắc phục.",
      },
      {
        type: "flow",
        title: "Từ ba mảnh rời tới một hồ sơ",
        steps: [
          { label: "Lấy phần báo sự cố", detail: "Điều thấy, giờ dừng, việc đã thử. Đây là phần mở đầu, giữ nguyên chữ của người quan sát." },
          { label: "Thêm chuỗi vì sao", detail: "Mỗi lớp một dòng, cạnh nó là bằng chứng hoặc chữ \"chưa kiểm\"." },
          { label: "Viết hành động khắc phục", detail: "Mỗi hành động: việc cụ thể, người phụ trách, hạn, cách kiểm đã xong." },
          { label: "Đọc lại bằng mắt người ngoài", detail: "Nhờ một đồng nghiệp không dự cuộc họp đọc và nói chỗ nào họ chưa hiểu." },
          { label: "Đặt ngày kiểm", detail: "Ghi ngày sẽ mở hồ sơ ra hỏi việc đã xong chưa, rồi cập nhật kết quả." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI ghép hồ sơ một sự cố",
        task: "Bạn có ba mảnh nội dung về một sự cố máy dập và muốn AI ghép thành một trang. Lắp yêu cầu sao cho hồ sơ dùng được.",
        parts: [
          {
            id: "source",
            label: "Dữ liệu đưa cho AI",
            options: [
              { text: "Ghép giúp tôi hồ sơ cho sự cố máy dập hôm qua.", feedback: "AI không có dữ liệu nào nên tự dựng chi tiết, thường là giờ giấc và nguyên nhân nghe hợp lý nhưng không có thật." },
              { text: "Đây là ba mảnh gốc dán nguyên văn: mẫu báo, chuỗi vì sao đã có bằng chứng, nhật ký ca.", good: true, feedback: "AI làm việc trên dữ liệu của bạn, nên hồ sơ bám đúng những gì đã được kiểm." },
            ],
          },
          {
            id: "shape",
            label: "Khuôn hồ sơ",
            options: [
              { text: "Viết thành một bài tổng kết hay và dễ đọc.", feedback: "Bài văn ẩn dữ kiện dưới nhận định, người đọc không tra được hành động nào của ai." },
              { text: "Ba phần: điều đã xảy ra theo giờ, chuỗi vì sao kèm bằng chứng, hành động gồm việc, người, hạn.", good: true, feedback: "Mỗi thông tin có đúng một chỗ, nên chỗ thiếu người hay hạn lộ ra ngay." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc khi thiếu tin",
            options: [
              { text: "Thiếu người phụ trách hay hạn thì tự chọn người và hạn hợp lý.", feedback: "Phân công là quyết định của người có thẩm quyền. AI gán tên và hạn tạo ra cam kết chưa ai đồng ý." },
              { text: "Thiếu người phụ trách hay hạn thì ghi \"chưa phân công\", không tự chọn.", good: true, feedback: "Chỗ trống được giữ nguyên để bạn hỏi người có thẩm quyền." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "shape", "rule"],
            text: "HỒ SƠ SỰ CỐ - MÁY DẬP SỐ 4\n1. Diễn biến: 14:05 dừng, 14:35 bắt đầu xử lý, 15:20 chạy lại.\n2. Vì sao: cảnh báo áp suất không có hướng dẫn xử lý (bằng chứng: nhật ký ca).\n3. Hành động: viết hướng dẫn xử lý cảnh báo - người phụ trách: chưa phân công - hạn: chưa phân công.",
          },
          {
            requires: ["source"],
            text: "Bài tổng kết: Sự cố máy dập hôm qua là một bài học quý giá về tầm quan trọng của việc tuân thủ quy trình. Cả tổ cần cố gắng hơn nữa.\n\n(Có dữ liệu nhưng thiếu khuôn, nên AI viết văn chung chung mất hẳn giờ, bằng chứng và hành động.)",
          },
          {
            text: "Máy dập dừng lúc 10:15 do bạc đạn mòn. Anh Hùng phụ trách thay bạc đạn trước thứ Sáu.\n\n(AI không có dữ liệu nên bịa giờ, nguyên nhân và cả người phụ trách.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Hồ sơ sự cố có tên người và số liệu của công ty. Chỉ dán vào công cụ AI mà công ty cho phép, và bỏ thông tin không cần thiết. Nếu sự cố có thương tích hoặc liên quan tới trách nhiệm pháp lý, hỏi bộ phận an toàn lao động hoặc pháp chế trước khi lập và gửi hồ sơ.",
      },
      {
        type: "scenario",
        title: "Hồ sơ đã ghép xong, sếp hỏi",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đã ghép hồ sơ. Phần hành động ghi: \"Viết hướng dẫn xử lý cảnh báo - anh Hùng - hạn thứ Sáu\". Bạn chưa hề phân công cho anh Hùng. Sếp bảo: \"Gửi cả ca luôn nhé.\"",
            choices: [
              { label: "Gửi luôn vì hồ sơ trông đầy đủ", next: "bad_send" },
              { label: "Đổi thành \"chưa phân công\", hỏi sếp ai phụ trách rồi mới gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Anh Hùng đọc thấy mình bị giao việc mà không ai hỏi. Anh phản đối, hồ sơ phải sửa và gửi lại, và cả ca không còn tin những dòng khác trong hồ sơ.",
            ending: "bad",
          },
          s2: {
            text: "Sếp chọn chị Mai và hạn thứ Năm. Bạn cập nhật hồ sơ. Sếp hỏi thêm: \"Sao biết việc này đã xong hay chưa?\"",
            choices: [
              { label: "Thêm dòng ngày kiểm và cách kiểm: hướng dẫn được dán tại máy và cả ba ca đã đọc", next: "good" },
              { label: "Trả lời rằng sẽ nhắc chị Mai sau và không ghi gì vào hồ sơ", next: "bad_track" },
            ],
          },
          bad_track: {
            text: "Không có ngày kiểm nào được ghi. Ba tuần sau không ai nhớ việc đó, và hướng dẫn vẫn chưa được viết khi sự cố lặp lại.",
            ending: "bad",
          },
          good: {
            text: "Hồ sơ có việc, người, hạn và cách kiểm. Thứ Năm hồ sơ được mở ra, hướng dẫn đã dán ở máy, và sự cố này được khép lại đúng nghĩa.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một hồ sơ tốt nối điều đã xảy ra, vì sao, và việc sẽ làm có người và hạn.",
          "Bạn đã hoàn thành phần sự cố của chặng này: báo, hỏi vì sao, viết và ghép thành hồ sơ.",
        ],
      },
    ],
  },
];
