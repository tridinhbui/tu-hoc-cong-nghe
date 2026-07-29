import type { Lesson } from "./lesson-types";

// Chặng "Thuế TNCN & Lương thực nhận" (ids 1301-1308, personal track).
//
// Every figure here is dated and cited because Vietnamese PIT changed
// substantially for tax period 2026 and stale numbers are worse than no
// lesson at all. Sources used when writing (July 2026):
//   - Luật Thuế TNCN 2025 (Luật 109/2025/QH15), Điều 9: 5-bậc table,
//     applied from kỳ tính thuế 2026.
//   - Nghị quyết 110/2025/UBTVQH15: giảm trừ gia cảnh 15,5tr bản thân /
//     6,2tr mỗi người phụ thuộc.
//   - Nghị định 253/2026/NĐ-CP (30/6/2026): khấu trừ 10% thu nhập vãng lai
//     từ 5 triệu đồng/lần (raised from 2 triệu).
//   - Nghị quyết 198/2025/QH15: bỏ thuế khoán với hộ kinh doanh từ 1/1/2026.
//   - Luật BHXH 2024: NLĐ đóng 10,5%, doanh nghiệp 21,5%, tổng 32%.
// Re-verify before each tax year; the lessons tell learners to do the same.

export const VN_TAX_LESSONS: Lesson[] = [
  {
    id: 1301,
    slug: "luong-gross-vs-net-thuc-nhan",
    title: "Chặng Thuế, Bài 1: Lương Gross vs Net - bạn thực nhận bao nhiêu?",
    subtitle: "Từ con số trên hợp đồng đến số tiền vào tài khoản",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "💵",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Gần như mọi quyết định tài chính cá nhân - ngân sách, quỹ khẩn cấp, khả năng trả nợ - đều dựa trên thu nhập THỰC NHẬN, không phải con số ghi trên hợp đồng. Bài này cho bạn công thức đi từ gross sang net để mọi kế hoạch sau đó đứng trên số liệu đúng.",
    openingQuestion:
      "Hợp đồng ghi lương 30 triệu/tháng (gross), bạn chưa có người phụ thuộc. Số tiền thực tế vào tài khoản mỗi tháng khoảng bao nhiêu?",
    openingOptions: [
      "Đúng 30 triệu, vì thuế do công ty chịu",
      "Khoảng 26,2 triệu, sau khi trừ bảo hiểm bắt buộc và thuế TNCN",
      "Khoảng 21 triệu, vì thuế TNCN chiếm khoảng 30% lương",
      "Không thể tính được nếu chưa biết thưởng cuối năm",
    ],
    correctOption: 1,
    explanation:
      "Lương gross 30 triệu bị trừ hai lớp: (1) bảo hiểm bắt buộc phần người lao động đóng 10,5% = 3,15 triệu; (2) thuế TNCN tính trên phần thu nhập còn lại sau khi trừ giảm trừ gia cảnh. Với 1 người độc thân năm 2026, thuế khoảng 635.000 đồng. Net ≈ 30 - 3,15 - 0,635 = 26,215 triệu.",
    diagram: [
      { label: "Lương GROSS (ghi trên hợp đồng)", arrow: true },
      { label: "− Bảo hiểm bắt buộc (10,5%)", arrow: true },
      { label: "− Thuế TNCN (lũy tiến)", arrow: true },
      { label: "= Lương NET (vào tài khoản)" },
    ],
    interactiveType: "budget",
    realWorldExample: {
      company: "Thị trường tuyển dụng Việt Nam",
      description:
        "Tin tuyển dụng ở Việt Nam có nơi ghi lương gross, có nơi ghi net, và rất nhiều nơi không ghi rõ. Cùng một con số '30 triệu' có thể lệch nhau hơn 3,7 triệu đồng mỗi tháng tùy cách hiểu - tương đương gần 45 triệu một năm. Đây là lý do câu hỏi đầu tiên cần hỏi khi nhận offer là: 'Con số này là gross hay net?'",
    },
    quiz: [
      {
        question: "Lương gross là gì?",
        options: [
          "Số tiền thực tế chuyển vào tài khoản mỗi tháng",
          "Tổng thu nhập trước khi trừ bảo hiểm bắt buộc và thuế TNCN",
          "Lương cơ bản không bao gồm phụ cấp",
          "Lương sau thuế nhưng trước bảo hiểm",
        ],
        correct: 1,
        explanation:
          "Gross là tổng thu nhập trước mọi khoản khấu trừ. Net là số cuối cùng bạn nhận được sau khi trừ bảo hiểm bắt buộc và thuế TNCN.",
      },
      {
        question: "Hai lớp khấu trừ chính đi từ gross xuống net là gì?",
        options: [
          "Thuế GTGT và thuế TNCN",
          "Phí công đoàn và thuế TNCN",
          "Bảo hiểm bắt buộc (BHXH/BHYT/BHTN) và thuế TNCN",
          "Chỉ có thuế TNCN, bảo hiểm do công ty đóng toàn bộ",
        ],
        correct: 2,
        explanation:
          "Người lao động đóng 10,5% cho bảo hiểm bắt buộc, sau đó thuế TNCN được tính trên phần thu nhập còn lại sau các khoản giảm trừ.",
      },
      {
        question:
          "Vì sao cần hỏi rõ 'gross hay net' trước khi nhận việc?",
        options: [
          "Vì hai con số có thể lệch nhau hàng chục triệu đồng mỗi năm, ảnh hưởng trực tiếp đến ngân sách sống",
          "Vì luật bắt buộc doanh nghiệp phải ghi net",
          "Vì gross luôn cao hơn net đúng 10%",
          "Vì chỉ có lương net mới được dùng để vay ngân hàng",
        ],
        correct: 0,
        explanation:
          "Chênh lệch gross-net thường 12-20% tùy mức lương và số người phụ thuộc. Hiểu nhầm sẽ khiến toàn bộ kế hoạch chi tiêu lệch ngay từ đầu.",
      },
      {
        question:
          "Nếu công ty cam kết trả 'net 26 triệu', ai chịu phần thuế và bảo hiểm?",
        options: [
          "Người lao động vẫn tự nộp riêng",
          "Không ai phải nộp vì đã là net",
          "Doanh nghiệp quy đổi ngược ra gross và chịu phần chênh lệch để bạn nhận đủ 26 triệu",
          "Cơ quan thuế miễn trừ hoàn toàn",
        ],
        correct: 2,
        explanation:
          "Với hợp đồng net, doanh nghiệp phải 'gross-up': tính ngược ra mức gross tương ứng sao cho sau khi trừ bảo hiểm và thuế, bạn nhận đúng con số net đã cam kết.",
      },
    ],
    keyTakeaways: [
      "Gross = trước khấu trừ; Net = sau bảo hiểm bắt buộc và thuế TNCN - luôn hỏi rõ khi nhận offer",
      "Hai lớp khấu trừ: bảo hiểm bắt buộc 10,5% (phần người lao động), rồi thuế TNCN lũy tiến",
      "Mọi kế hoạch ngân sách và trả nợ phải dựa trên lương NET, không phải gross",
    ],
    practicePrompt: {
      question:
        "Bạn nhận hai offer: Công ty A trả 32 triệu gross, Công ty B trả 27 triệu net. Bạn độc thân, chưa có người phụ thuộc. Nhận xét nào đúng?",
      options: [
        "Offer A tốt hơn vì con số 32 lớn hơn 27",
        "Hai offer tương đương vì chênh lệch đúng bằng thuế",
        "Cần quy đổi A về net trước khi so sánh; 32 triệu gross cho người độc thân thực nhận khoảng 27,8 triệu, nên A nhỉnh hơn B một chút",
        "Không thể so sánh vì gross và net là hai đại lượng khác nhau hoàn toàn",
      ],
      correct: 2,
      explanation:
        "So sánh offer phải đưa về cùng một thước đo. 32 triệu gross: bảo hiểm 10,5% = 3,36 triệu; thu nhập tính thuế = 32 − 3,36 − 15,5 = 13,14 triệu; thuế = 10×5% + 3,14×10% = 0,5 + 0,314 = 0,814 triệu; net ≈ 27,8 triệu. Vậy A cao hơn B khoảng 0,8 triệu/tháng.",
    },
    summary: {
      keyIdea: "Gross − bảo hiểm bắt buộc − thuế TNCN = Net",
      formula: "Net = Gross − (Gross × 10,5%) − Thuế TNCN",
      commonMistake:
        "Lập ngân sách trên lương gross, dẫn đến chi tiêu vượt quá số tiền thực có mỗi tháng.",
      action: "Tính lại lương net thật của bạn ngay hôm nay và đối chiếu với bảng lương gần nhất.",
    },
    application: {
      title: "Kiểm tra bảng lương của chính bạn",
      message:
        "Mở bảng lương tháng gần nhất, tìm ba dòng: tổng thu nhập (gross), khấu trừ bảo hiểm, và thuế TNCN. Cộng ngược lại xem có khớp với số tiền vào tài khoản không.",
      secondary:
        "Nếu lệch, thường là do có phụ cấp không chịu thuế hoặc bạn chưa đăng ký người phụ thuộc - hai chủ đề của các bài tiếp theo.",
    },
    sections: [
      {
        type: "lead",
        text: "Con số ghi trên hợp đồng lao động và con số ngân hàng báo về mỗi tháng gần như không bao giờ giống nhau. Khoảng cách giữa chúng không phải là bí ẩn - nó là hai phép trừ có công thức rõ ràng, và hiểu chúng là điều kiện tiên quyết để lập bất kỳ kế hoạch tài chính cá nhân nào.",
      },
      { type: "heading", text: "Hai lớp khấu trừ, theo đúng thứ tự" },
      {
        type: "paragraph",
        text: "Thứ tự rất quan trọng vì lớp sau tính trên phần còn lại của lớp trước. **Lớp 1 - bảo hiểm bắt buộc:** người lao động đóng 10,5% tiền lương làm căn cứ đóng (8% hưu trí, 1,5% BHYT, 1% BHTN). **Lớp 2 - thuế TNCN:** tính trên thu nhập sau khi đã trừ bảo hiểm VÀ trừ giảm trừ gia cảnh, theo biểu lũy tiến từng phần.",
      },
      {
        type: "formula",
        title: "Công thức đi từ gross sang net",
        equation: "Net = Gross − Bảo hiểm bắt buộc − Thuế TNCN",
        variables: [
          { symbol: "Gross", name: "Tổng thu nhập", description: "Con số ghi trên hợp đồng, trước mọi khấu trừ" },
          { symbol: "Bảo hiểm", name: "Phần người lao động đóng", description: "10,5% tiền lương làm căn cứ đóng" },
          { symbol: "Thuế TNCN", name: "Thuế thu nhập cá nhân", description: "Tính lũy tiến trên thu nhập tính thuế" },
        ],
        example: {
          title: "Lương gross 30 triệu, độc thân, năm 2026",
          calculation:
            "Bảo hiểm = 30 × 10,5% = 3,15tr → Thu nhập tính thuế = 30 − 3,15 − 15,5 = 11,35tr → Thuế = (10 × 5%) + (1,35 × 10%) = 0,5 + 0,135 = 0,635tr",
          result: "Net ≈ 26,215 triệu đồng",
          explanation:
            "Tổng khấu trừ 3,785 triệu, tương đương 12,6% lương gross. Tỷ lệ này tăng dần khi lương tăng, do biểu thuế lũy tiến.",
        },
      },
      { type: "heading", text: "Vì sao 'gross hay net' là câu hỏi phải hỏi" },
      {
        type: "paragraph",
        text: "Với mức lương 30 triệu, khoảng cách gross-net là gần 3,8 triệu đồng mỗi tháng - hơn 45 triệu một năm. Một ứng viên hiểu nhầm '30 triệu' là net trong khi doanh nghiệp nói gross sẽ lập kế hoạch chi tiêu vượt quá khả năng thực tế ngay từ tháng đầu tiên.",
      },
      {
        type: "comparison",
        left: {
          label: "Hợp đồng ghi GROSS",
          text: "Bạn chịu phần bảo hiểm 10,5% và toàn bộ thuế TNCN. Số vào tài khoản thấp hơn con số trên hợp đồng.",
        },
        right: {
          label: "Hợp đồng ghi NET",
          text: "Doanh nghiệp quy đổi ngược (gross-up) và chịu phần chênh lệch, đảm bảo bạn nhận đúng con số cam kết.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý về trần đóng bảo hiểm",
        text: "Tiền lương làm căn cứ đóng BHXH/BHYT/BHTN có mức trần theo quy định, nên với lương rất cao, phần bảo hiểm không tăng mãi theo tỷ lệ 10,5%. Hãy tra cứu mức trần hiện hành khi tính cho các mức lương lớn.",
      },
      {
        type: "conceptTable",
        title: "Thuật ngữ bảng lương",
        concepts: [
          { vi: "Lương gross", en: "Gross salary", def: "Tổng thu nhập trước khi trừ bảo hiểm bắt buộc và thuế TNCN" },
          { vi: "Lương net", en: "Net salary / take-home pay", def: "Số tiền thực nhận sau mọi khấu trừ bắt buộc" },
          { vi: "Quy đổi ngược", en: "Gross-up", def: "Tính ngược từ net ra gross để doanh nghiệp trả đủ mức net cam kết" },
          { vi: "Thu nhập tính thuế", en: "Taxable income", def: "Phần thu nhập còn lại sau khi trừ bảo hiểm và giảm trừ gia cảnh" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Gross là con số để thương lượng; net là con số để sống.",
          "Bài tiếp theo: vì sao 'lên bậc thuế' không hề đáng sợ như nhiều người tưởng.",
        ],
      },
    ],
  },

  {
    id: 1302,
    slug: "bieu-thue-luy-tien-tung-phan-5-bac",
    title: "Chặng Thuế, Bài 2: Biểu thuế lũy tiến - hiểu đúng chuyện 'lên bậc thuế'",
    subtitle: "Vì sao tăng lương không bao giờ khiến bạn nhận ít tiền hơn",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "Rất nhiều người từ chối tăng lương hoặc làm thêm vì sợ 'nhảy bậc thuế bị đánh thuế cao hơn'. Đây là hiểu lầm phổ biến nhất về thuế TNCN, và nó khiến người ta bỏ lỡ thu nhập thật. Bài này sửa dứt điểm hiểu lầm đó.",
    openingQuestion:
      "Thu nhập tính thuế của bạn đang là 9,8 triệu/tháng (bậc 1, thuế suất 5%). Nếu được tăng lên 11 triệu, vượt qua ngưỡng 10 triệu sang bậc 2 (10%), điều gì xảy ra?",
    openingOptions: [
      "Toàn bộ 11 triệu bị đánh thuế 10%, nên bạn thực nhận ít hơn trước",
      "Chỉ phần 1 triệu vượt ngưỡng bị đánh 10%, 10 triệu đầu vẫn chỉ chịu 5%",
      "Bạn phải nộp bù thuế cho cả những tháng trước đó",
      "Thuế suất áp dụng cho cả năm bị nâng lên 10% từ đầu năm",
    ],
    correctOption: 1,
    explanation:
      "Đây là bản chất của 'lũy tiến TỪNG PHẦN': mỗi bậc thuế chỉ áp cho phần thu nhập nằm trong bậc đó. 10 triệu đầu luôn chịu 5% dù tổng thu nhập của bạn là bao nhiêu. Chỉ 1 triệu vượt ngưỡng mới chịu 10%. Vì vậy thu nhập tăng thì tiền thực nhận LUÔN tăng - không bao giờ có chuyện tăng lương mà nhận ít đi.",
    diagram: [
      { label: "10 triệu đầu → 5%", arrow: true },
      { label: "Phần trên 10-30 triệu → 10%", arrow: true },
      { label: "Phần trên 30-60 triệu → 20%", arrow: true },
      { label: "Cộng lại = tổng thuế phải nộp" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Hiểu lầm phổ biến nơi công sở",
      description:
        "Câu 'đừng nhận thêm dự án, coi chừng nhảy bậc thuế' là lời khuyên sai được truyền miệng rất rộng. Với biểu lũy tiến từng phần, phần thu nhập tăng thêm chỉ bị đánh thuế ở mức của bậc tương ứng, phần thu nhập cũ hoàn toàn không bị ảnh hưởng. Từ chối thu nhập vì sợ bậc thuế luôn là quyết định thiệt hại.",
    },
    quiz: [
      {
        question: "'Lũy tiến từng phần' nghĩa là gì?",
        options: [
          "Toàn bộ thu nhập bị đánh theo thuế suất của bậc cao nhất đạt tới",
          "Mỗi phần thu nhập chỉ chịu thuế suất của bậc mà phần đó rơi vào",
          "Thuế suất tăng dần theo từng tháng trong năm",
          "Thuế được nộp thành nhiều đợt trong năm",
        ],
        correct: 1,
        explanation:
          "Thu nhập được 'cắt lát' theo các bậc; mỗi lát chịu thuế suất riêng của bậc đó rồi cộng lại.",
      },
      {
        question:
          "Thu nhập tính thuế 35 triệu/tháng năm 2026. Thuế được tính thế nào?",
        options: [
          "35 × 20% = 7 triệu",
          "35 × 10% = 3,5 triệu",
          "(10 × 5%) + (20 × 10%) + (5 × 20%) = 3,5 triệu",
          "(10 × 5%) + (25 × 20%) = 5,75 triệu",
        ],
        correct: 2,
        explanation:
          "Cắt lát: 10 triệu đầu × 5% = 0,5; phần trên 10 đến 30 (tức 20 triệu) × 10% = 2; phần trên 30 đến 35 (tức 5 triệu) × 20% = 1. Tổng = 3,5 triệu.",
      },
      {
        question: "Thuế suất biên (marginal) khác thuế suất hiệu dụng (effective) thế nào?",
        options: [
          "Chúng luôn bằng nhau",
          "Biên là thuế suất áp cho đồng thu nhập tiếp theo; hiệu dụng là tổng thuế chia tổng thu nhập, luôn thấp hơn biên",
          "Hiệu dụng luôn cao hơn biên vì cộng thêm bảo hiểm",
          "Biên chỉ áp dụng cho người có thu nhập trên 100 triệu",
        ],
        correct: 1,
        explanation:
          "Với thu nhập tính thuế 35 triệu: thuế suất biên là 20% (bậc đang đứng), nhưng hiệu dụng chỉ 3,5/35 = 10%. Người ta hay nhầm hai con số này.",
      },
      {
        question: "Vì sao tăng lương không bao giờ làm giảm tiền thực nhận?",
        options: [
          "Vì thuế suất tối đa chỉ 35%, luôn nhỏ hơn 100% nên phần tăng thêm vẫn còn lại phần lớn",
          "Vì nhà nước hoàn lại phần chênh lệch cuối năm",
          "Vì bậc thuế chỉ tính theo thu nhập cả năm chứ không theo tháng",
          "Vì công ty chịu phần thuế tăng thêm",
        ],
        correct: 0,
        explanation:
          "Ngay ở bậc cao nhất 35%, bạn vẫn giữ được 65% của phần thu nhập tăng thêm. Không có ngưỡng nào khiến thu nhập ròng giảm khi thu nhập gộp tăng.",
      },
    ],
    keyTakeaways: [
      "Biểu thuế 2026 có 5 bậc: 5% / 10% / 20% / 30% / 35% theo các mốc 10 - 30 - 60 - 100 triệu",
      "Lũy tiến TỪNG PHẦN: mỗi bậc chỉ áp cho phần thu nhập nằm trong bậc đó, không áp cho toàn bộ",
      "Thuế suất hiệu dụng luôn thấp hơn thuế suất biên - đừng nhầm hai con số",
      "Tăng thu nhập luôn làm tăng tiền thực nhận, không có ngoại lệ",
    ],
    practicePrompt: {
      question:
        "Anh Nam có thu nhập tính thuế 62 triệu/tháng. Anh được đề nghị làm thêm một dự án mang lại 3 triệu/tháng, nhưng lo rằng sẽ 'nhảy sang bậc 30%' và bị thiệt. Lời khuyên đúng là gì?",
      options: [
        "Nên từ chối vì toàn bộ 65 triệu sẽ bị đánh thuế 30%",
        "Nên nhận: chỉ 3 triệu tăng thêm chịu 30%, tức nộp thêm 0,9 triệu và vẫn giữ lại 2,1 triệu",
        "Nên nhận nhưng yêu cầu trả bằng tiền mặt để tránh thuế",
        "Nên từ chối vì thuế suất hiệu dụng sẽ vượt 30%",
      ],
      correct: 1,
      explanation:
        "Anh Nam đã ở bậc 4 (trên 60 triệu, thuế suất 30%). Phần 3 triệu tăng thêm chịu đúng 30% = 0,9 triệu, anh giữ lại 2,1 triệu. Phần 60 triệu cũ vẫn chịu các thuế suất bậc thấp như trước, hoàn toàn không đổi. Từ chối là tự bỏ đi 2,1 triệu mỗi tháng.",
    },
    summary: {
      keyIdea: "Mỗi bậc thuế chỉ áp cho phần thu nhập nằm trong bậc đó",
      commonMistake:
        "Tưởng rằng vượt ngưỡng thì TOÀN BỘ thu nhập bị đánh theo thuế suất mới, dẫn đến từ chối cơ hội tăng thu nhập.",
      action: "Tự tính thuế suất hiệu dụng của bạn và so với thuế suất biên để thấy khoảng cách.",
    },
    application: {
      title: "Tính thuế suất hiệu dụng của bạn",
      message:
        "Lấy tổng thuế TNCN cả năm chia cho tổng thu nhập cả năm. Con số này gần như luôn thấp hơn nhiều so với 'bậc thuế' mà bạn nghĩ mình đang chịu.",
      secondary: "Đây là con số nên dùng khi so sánh các cơ hội việc làm, không phải thuế suất biên.",
    },
    sections: [
      {
        type: "lead",
        text: "Nếu chỉ có một hiểu lầm về thuế cần được sửa dứt điểm, thì đó là câu 'coi chừng nhảy bậc thuế'. Hiểu sai cơ chế lũy tiến từng phần khiến nhiều người chủ động từ chối thu nhập - một thiệt hại hoàn toàn không cần thiết.",
      },
      { type: "heading", text: "Biểu thuế 5 bậc áp dụng từ kỳ tính thuế 2026" },
      {
        type: "paragraph",
        text: "Theo Điều 9 Luật Thuế thu nhập cá nhân 2025 (Luật 109/2025/QH15), biểu thuế lũy tiến từng phần rút từ 7 bậc xuống còn 5 bậc, áp dụng cho thu nhập từ tiền lương, tiền công. Quan trọng: các mốc dưới đây tính trên **thu nhập tính thuế** - tức là phần còn lại SAU khi đã trừ bảo hiểm bắt buộc và giảm trừ gia cảnh, chứ không phải lương gross.",
      },
      {
        type: "list",
        items: [
          "Bậc 1 - đến 10 triệu đồng/tháng: thuế suất 5%",
          "Bậc 2 - trên 10 đến 30 triệu đồng/tháng: thuế suất 10%",
          "Bậc 3 - trên 30 đến 60 triệu đồng/tháng: thuế suất 20%",
          "Bậc 4 - trên 60 đến 100 triệu đồng/tháng: thuế suất 30%",
          "Bậc 5 - trên 100 triệu đồng/tháng: thuế suất 35%",
        ],
      },
      { type: "heading", text: "Cắt lát thu nhập: cách tính đúng" },
      {
        type: "formula",
        title: "Ví dụ: thu nhập tính thuế 35 triệu đồng/tháng",
        equation: "Thuế = (10 × 5%) + (20 × 10%) + (5 × 20%)",
        example: {
          title: "Cắt lát theo bậc",
          calculation:
            "Lát 1: 10 triệu × 5% = 0,5 triệu · Lát 2: 20 triệu (phần từ 10 đến 30) × 10% = 2 triệu · Lát 3: 5 triệu (phần từ 30 đến 35) × 20% = 1 triệu",
          result: "Tổng thuế = 3,5 triệu đồng",
          explanation:
            "Thuế suất biên là 20% (bậc đang đứng), nhưng thuế suất hiệu dụng chỉ là 3,5 / 35 = 10%. Đây là lý do 'bậc thuế' nghe đáng sợ hơn thực tế rất nhiều.",
        },
      },
      {
        type: "callout",
        label: "Điểm mấu chốt",
        text: "Không tồn tại mức thu nhập nào mà khi vượt qua, tiền thực nhận của bạn giảm xuống. Ngay ở bậc cao nhất 35%, mỗi đồng tăng thêm bạn vẫn giữ lại 65 xu. Từ chối tăng lương vì sợ thuế luôn là quyết định sai về mặt số học.",
      },
      {
        type: "comparison",
        left: {
          label: "Hiểu SAI (lũy tiến toàn phần)",
          text: "Thu nhập 35 triệu → toàn bộ chịu 20% → thuế 7 triệu. Cách hiểu này không đúng với luật Việt Nam.",
        },
        right: {
          label: "Hiểu ĐÚNG (lũy tiến từng phần)",
          text: "Thu nhập 35 triệu → cắt lát theo bậc → thuế 3,5 triệu. Đúng bằng một nửa con số hiểu sai.",
        },
      },
      {
        type: "conceptTable",
        title: "Thuật ngữ về bậc thuế",
        concepts: [
          { vi: "Lũy tiến từng phần", en: "Progressive marginal taxation", def: "Mỗi phần thu nhập chịu thuế suất của bậc tương ứng, không áp chung một mức" },
          { vi: "Thuế suất biên", en: "Marginal tax rate", def: "Thuế suất áp cho đồng thu nhập tiếp theo bạn kiếm được" },
          { vi: "Thuế suất hiệu dụng", en: "Effective tax rate", def: "Tổng thuế chia tổng thu nhập - luôn thấp hơn thuế suất biên" },
          { vi: "Thu nhập tính thuế", en: "Taxable income", def: "Thu nhập sau khi trừ bảo hiểm bắt buộc và giảm trừ gia cảnh" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Bậc thuế áp cho từng lát thu nhập, không áp cho toàn bộ.",
          "Bài tiếp theo: giảm trừ gia cảnh - khoản trừ lớn nhất mà nhiều người quên đăng ký.",
        ],
      },
    ],
  },

  {
    id: 1303,
    slug: "giam-tru-gia-canh-nguoi-phu-thuoc",
    title: "Chặng Thuế, Bài 3: Giảm trừ gia cảnh - khoản trừ lớn nhất bạn có",
    subtitle: "15,5 triệu cho bản thân, 6,2 triệu mỗi người phụ thuộc",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "👨‍👩‍👧",
    track: "personal",
    whyItMatters:
      "Giảm trừ gia cảnh là khoản trừ lớn nhất trong công thức thuế TNCN - lớn hơn cả bảo hiểm bắt buộc. Quên đăng ký một người phụ thuộc có thể khiến bạn nộp thừa hàng triệu đồng mỗi năm, và rất nhiều người không biết mình đủ điều kiện đăng ký.",
    openingQuestion:
      "Năm 2026, mức giảm trừ gia cảnh cho bản thân người nộp thuế là bao nhiêu mỗi tháng?",
    openingOptions: [
      "11 triệu đồng, giữ nguyên như nhiều năm trước",
      "9 triệu đồng",
      "15,5 triệu đồng, tăng mạnh so với mức cũ",
      "Không có mức cố định, phụ thuộc vào tỉnh thành nơi làm việc",
    ],
    correctOption: 2,
    explanation:
      "Theo Nghị quyết 110/2025/UBTVQH15, từ kỳ tính thuế 2026 mức giảm trừ cho bản thân tăng từ 11 triệu lên 15,5 triệu đồng/tháng, và mỗi người phụ thuộc tăng từ 4,4 triệu lên 6,2 triệu đồng/tháng - mức tăng gần 41%.",
    diagram: [
      { label: "Thu nhập sau bảo hiểm", arrow: true },
      { label: "− 15,5tr (bản thân)", arrow: true },
      { label: "− 6,2tr × số người phụ thuộc", arrow: true },
      { label: "= Thu nhập tính thuế" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Người lao động có con nhỏ và cha mẹ già",
      description:
        "Một nhân viên lương 30 triệu gross, có 2 người phụ thuộc (một con nhỏ và một cha/mẹ ngoài tuổi lao động không có thu nhập) sẽ có tổng giảm trừ 15,5 + 12,4 = 27,9 triệu đồng. Sau khi trừ tiếp bảo hiểm 3,15 triệu, thu nhập tính thuế còn ÂM - tức là không phải nộp một đồng thuế TNCN nào. Nếu không đăng ký người phụ thuộc, người này vẫn phải nộp thuế bình thường.",
    },
    quiz: [
      {
        question: "Mức giảm trừ gia cảnh năm 2026 cho mỗi người phụ thuộc là bao nhiêu?",
        options: [
          "4,4 triệu đồng/tháng",
          "6,2 triệu đồng/tháng",
          "15,5 triệu đồng/tháng",
          "Bằng 50% mức giảm trừ bản thân, tùy thu nhập",
        ],
        correct: 1,
        explanation:
          "Nghị quyết 110/2025/UBTVQH15 quy định 6,2 triệu đồng/tháng cho mỗi người phụ thuộc, tăng từ mức 4,4 triệu trước đó.",
      },
      {
        question: "Công thức tính tổng giảm trừ gia cảnh là gì?",
        options: [
          "15,5 triệu × số thành viên trong gia đình",
          "6,2 triệu × số người phụ thuộc, không tính bản thân",
          "15,5 triệu + (6,2 triệu × số người phụ thuộc)",
          "15,5 triệu, cố định bất kể số người phụ thuộc",
        ],
        correct: 2,
        explanation:
          "Bản thân người nộp thuế luôn được 15,5 triệu, cộng thêm 6,2 triệu cho mỗi người phụ thuộc đã đăng ký hợp lệ.",
      },
      {
        question:
          "Nếu bạn không đăng ký người phụ thuộc dù đủ điều kiện, hậu quả là gì?",
        options: [
          "Bạn nộp thuế nhiều hơn mức đáng phải nộp",
          "Bạn bị phạt vi phạm hành chính",
          "Không ảnh hưởng gì vì cơ quan thuế tự động cập nhật",
          "Người phụ thuộc sẽ phải tự nộp thuế thay",
        ],
        correct: 0,
        explanation:
          "Giảm trừ người phụ thuộc chỉ được áp dụng khi bạn chủ động đăng ký và có hồ sơ chứng minh. Không đăng ký nghĩa là tự nguyện nộp thừa.",
      },
      {
        question:
          "Một người phụ thuộc có thể được đăng ký giảm trừ bởi mấy người nộp thuế cùng lúc?",
        options: [
          "Không giới hạn, ai nuôi cũng đăng ký được",
          "Tối đa hai người, ví dụ cả bố và mẹ",
          "Chỉ một người duy nhất trong một kỳ tính thuế",
          "Tùy theo thỏa thuận nội bộ gia đình, không có quy định",
        ],
        correct: 2,
        explanation:
          "Mỗi người phụ thuộc chỉ được tính giảm trừ một lần vào một người nộp thuế trong kỳ tính thuế. Vợ chồng cần thống nhất ai là người đăng ký để tránh trùng lặp bị loại khi quyết toán.",
      },
    ],
    keyTakeaways: [
      "Năm 2026: giảm trừ bản thân 15,5 triệu/tháng, mỗi người phụ thuộc 6,2 triệu/tháng (NQ 110/2025/UBTVQH15)",
      "Tổng giảm trừ = 15,5tr + 6,2tr × số người phụ thuộc",
      "Phải chủ động đăng ký kèm hồ sơ chứng minh - không đăng ký là tự nộp thừa thuế",
      "Mỗi người phụ thuộc chỉ được đăng ký cho MỘT người nộp thuế trong cùng kỳ tính thuế",
    ],
    practicePrompt: {
      question:
        "Chị Lan lương gross 28 triệu, có 1 con nhỏ nhưng chưa đăng ký người phụ thuộc. Nếu đăng ký, mỗi tháng chị tiết kiệm được bao nhiêu tiền thuế? (Bảo hiểm 10,5%)",
      options: [
        "Không tiết kiệm được gì vì thu nhập đã dưới ngưỡng chịu thuế",
        "Khoảng 620.000 đồng - đúng bằng 10% của 6,2 triệu",
        "Khoảng 310.000 đồng, vì phần thu nhập giảm trừ thêm nằm ở bậc 5%",
        "Khoảng 6,2 triệu đồng, bằng đúng mức giảm trừ",
      ],
      correct: 2,
      explanation:
        "Chưa đăng ký: thu nhập tính thuế = 28 − 2,94 − 15,5 = 9,56 triệu, nằm trọn bậc 1 → thuế = 9,56 × 5% = 478.000đ. Sau khi đăng ký: 9,56 − 6,2 = 3,36 triệu → thuế = 3,36 × 5% = 168.000đ. Tiết kiệm = 478.000 − 168.000 = 310.000đ/tháng, tức khoảng 3,7 triệu/năm. Vì phần được giảm trừ nằm ở bậc 5%, tiết kiệm đúng bằng 6,2tr × 5%.",
    },
    summary: {
      keyIdea: "Tổng giảm trừ = 15,5tr (bản thân) + 6,2tr × số người phụ thuộc",
      formula: "Thu nhập tính thuế = Gross − Bảo hiểm − Giảm trừ gia cảnh",
      commonMistake:
        "Không đăng ký người phụ thuộc đủ điều kiện, hoặc để cả vợ và chồng cùng đăng ký một đứa con.",
      action: "Rà lại danh sách người phụ thuộc bạn đủ điều kiện đăng ký và bổ sung hồ sơ ngay.",
    },
    application: {
      title: "Rà soát người phụ thuộc của bạn",
      message:
        "Liệt kê con dưới tuổi quy định, cha mẹ ngoài tuổi lao động không có thu nhập hoặc thu nhập rất thấp, người thân bạn đang trực tiếp nuôi dưỡng. Đối chiếu với điều kiện hiện hành rồi nộp hồ sơ đăng ký qua công ty.",
      secondary:
        "Nếu phát hiện đã bỏ sót trong các kỳ trước, phần nộp thừa có thể được xử lý khi quyết toán - chủ đề của bài 6.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong công thức thuế TNCN, giảm trừ gia cảnh là khoản trừ lớn nhất - lớn hơn cả phần bảo hiểm bắt buộc 10,5%. Với mức mới năm 2026, riêng khoản giảm trừ bản thân đã đủ để một người lương dưới 19 triệu gần như không phải nộp thuế.",
      },
      { type: "heading", text: "Mức giảm trừ mới từ kỳ tính thuế 2026" },
      {
        type: "paragraph",
        text: "Theo Nghị quyết 110/2025/UBTVQH15, mức giảm trừ gia cảnh được nâng đáng kể: **bản thân người nộp thuế từ 11 lên 15,5 triệu đồng/tháng**, và **mỗi người phụ thuộc từ 4,4 lên 6,2 triệu đồng/tháng**. Đây là mức tăng gần 41%, phản ánh việc điều chỉnh theo mặt bằng giá cả và thu nhập.",
      },
      {
        type: "formula",
        title: "Tổng mức giảm trừ gia cảnh",
        equation: "Giảm trừ = 15,5 triệu + (6,2 triệu × số người phụ thuộc)",
        example: {
          title: "Người có 2 người phụ thuộc",
          calculation: "15,5 + (6,2 × 2) = 15,5 + 12,4",
          result: "27,9 triệu đồng/tháng",
          explanation:
            "Với lương gross 30 triệu và bảo hiểm 3,15 triệu, thu nhập tính thuế = 30 − 3,15 − 27,9 = −1,05 triệu. Số âm nghĩa là không phát sinh thuế TNCN phải nộp.",
        },
      },
      { type: "heading", text: "Phải đăng ký thì mới được trừ" },
      {
        type: "paragraph",
        text: "Khoản giảm trừ cho bản thân được áp dụng tự động, nhưng giảm trừ cho người phụ thuộc thì **không**. Bạn phải chủ động kê khai và nộp hồ sơ chứng minh qua bộ phận nhân sự hoặc trực tiếp với cơ quan thuế. Rất nhiều người đủ điều kiện nhưng chưa từng đăng ký, và mỗi tháng trôi qua là một khoản nộp thừa không lấy lại được nếu không quyết toán.",
      },
      {
        type: "callout",
        label: "Một người phụ thuộc, một người đăng ký",
        text: "Mỗi người phụ thuộc chỉ được tính giảm trừ vào MỘT người nộp thuế trong cùng kỳ tính thuế. Vợ chồng cùng đăng ký một đứa con là lỗi thường gặp và sẽ bị loại khi cơ quan thuế đối chiếu dữ liệu - hãy thống nhất trước xem ai đăng ký thì có lợi hơn (thường là người có thu nhập ở bậc thuế cao hơn).",
      },
      {
        type: "conceptTable",
        title: "Thuật ngữ giảm trừ gia cảnh",
        concepts: [
          { vi: "Giảm trừ gia cảnh", en: "Family circumstance deduction", def: "Khoản được trừ khỏi thu nhập trước khi tính thuế, gồm phần bản thân và phần người phụ thuộc" },
          { vi: "Người phụ thuộc", en: "Dependant", def: "Người mà người nộp thuế có trách nhiệm nuôi dưỡng theo điều kiện luật định" },
          { vi: "Hồ sơ chứng minh", en: "Supporting documents", def: "Giấy tờ xác nhận quan hệ và điều kiện của người phụ thuộc khi đăng ký" },
          { vi: "Mã số thuế người phụ thuộc", en: "Dependant tax code", def: "Mã do cơ quan thuế cấp, dùng để tránh một người được kê khai trùng ở nhiều nơi" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Giảm trừ gia cảnh là khoản trừ lớn nhất - nhưng chỉ khi bạn đăng ký.",
          "Bài tiếp theo: 10,5% lương trừ cho bảo hiểm đi về đâu và bạn nhận lại được gì.",
        ],
      },
    ],
  },

  {
    id: 1304,
    slug: "bhxh-bhyt-bhtn-10-phay-5-phan-tram",
    title: "Chặng Thuế, Bài 4: BHXH, BHYT, BHTN - 10,5% lương đi về đâu?",
    subtitle: "Khoản trừ lớn thứ hai trên bảng lương và quyền lợi bạn đổi lại",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Nhiều người coi 10,5% bảo hiểm là 'tiền mất', nhưng thực chất đây là khoản mua quyền lợi hưu trí, y tế và thất nghiệp - và doanh nghiệp còn đóng thêm 21,5% nữa cho bạn. Hiểu đúng giúp bạn đánh giá tổng gói đãi ngộ chứ không chỉ nhìn con số lương.",
    openingQuestion:
      "Trên bảng lương, người lao động đóng 10,5% cho bảo hiểm bắt buộc. Doanh nghiệp đóng thêm bao nhiêu phần trăm nữa?",
    openingOptions: [
      "Không đóng thêm, toàn bộ do người lao động chịu",
      "10,5%, chia đôi bằng nhau với người lao động",
      "21,5%, tức tổng cộng 32% quỹ lương",
      "5%, chỉ cho phần bảo hiểm y tế",
    ],
    correctOption: 2,
    explanation:
      "Tổng mức đóng bảo hiểm bắt buộc là 32% tiền lương làm căn cứ đóng: người lao động 10,5% (8% hưu trí, 1,5% BHYT, 1% BHTN) và doanh nghiệp 21,5% (14% hưu trí, 3% ốm đau-thai sản, 0,5% tai nạn lao động, 3% BHYT, 1% BHTN). Phần doanh nghiệp đóng cũng là chi phí thực tế họ bỏ ra cho bạn.",
    diagram: [
      { label: "Tiền lương làm căn cứ đóng", arrow: true },
      { label: "NLĐ đóng 10,5%", arrow: true },
      { label: "DN đóng 21,5%", arrow: true },
      { label: "Tổng 32% vào các quỹ bảo hiểm" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Chi phí thực của một nhân sự",
      description:
        "Với lương gross 30 triệu, doanh nghiệp không chỉ chi 30 triệu. Họ còn đóng 21,5% × 30 = 6,45 triệu tiền bảo hiểm, nâng chi phí thực lên 36,45 triệu/tháng. Trong khi đó người lao động nhận về khoảng 26,2 triệu. Khoảng cách hơn 10 triệu này là điều cả hai phía nên hiểu khi thương lượng lương.",
    },
    quiz: [
      {
        question: "Trong 10,5% người lao động đóng, phần lớn nhất dành cho quỹ nào?",
        options: [
          "Bảo hiểm y tế (1,5%)",
          "Bảo hiểm thất nghiệp (1%)",
          "Quỹ hưu trí và tử tuất (8%)",
          "Quỹ tai nạn lao động (0,5%)",
        ],
        correct: 2,
        explanation:
          "8% trong tổng 10,5% đi vào quỹ hưu trí - tức phần lớn nhất, và cũng là khoản tích lũy cho lương hưu sau này của chính bạn.",
      },
      {
        question: "Tổng mức đóng bảo hiểm bắt buộc của cả hai bên là bao nhiêu?",
        options: [
          "21% tiền lương làm căn cứ đóng",
          "32% tiền lương làm căn cứ đóng",
          "10,5% tiền lương làm căn cứ đóng",
          "Tùy thỏa thuận giữa doanh nghiệp và người lao động",
        ],
        correct: 1,
        explanation:
          "10,5% (người lao động) + 21,5% (doanh nghiệp) = 32%. Đây là mức bắt buộc theo luật, không phải khoản thỏa thuận.",
      },
      {
        question: "Vì sao nói bảo hiểm bắt buộc không hoàn toàn là 'tiền mất'?",
        options: [
          "Vì được hoàn lại toàn bộ khi nghỉ việc",
          "Vì đổi lại quyền lợi hưu trí, khám chữa bệnh và trợ cấp thất nghiệp",
          "Vì được trừ thẳng vào thuế phải nộp theo tỷ lệ 1:1",
          "Vì doanh nghiệp sẽ trả lại vào lương tháng 13",
        ],
        correct: 1,
        explanation:
          "Đây là khoản mua quyền lợi: lương hưu khi về già, chi trả khám chữa bệnh qua BHYT, và trợ cấp khi mất việc qua BHTN.",
      },
      {
        question:
          "Bảo hiểm bắt buộc ảnh hưởng thế nào đến thuế TNCN của bạn?",
        options: [
          "Không ảnh hưởng, hai khoản độc lập nhau",
          "Làm tăng thuế vì bị tính là thu nhập",
          "Được trừ khỏi thu nhập trước khi tính thuế, nên làm giảm thuế phải nộp",
          "Chỉ ảnh hưởng nếu bạn có người phụ thuộc",
        ],
        correct: 2,
        explanation:
          "Bảo hiểm bắt buộc là khoản được trừ trước khi tính thu nhập tính thuế, nên nó vừa mua quyền lợi vừa gián tiếp giảm số thuế bạn phải nộp.",
      },
    ],
    keyTakeaways: [
      "Người lao động đóng 10,5%: 8% hưu trí + 1,5% BHYT + 1% BHTN",
      "Doanh nghiệp đóng thêm 21,5%, tổng cộng 32% tiền lương làm căn cứ đóng",
      "Bảo hiểm bắt buộc được trừ TRƯỚC khi tính thuế TNCN, nên gián tiếp giảm thuế",
      "Tiền lương làm căn cứ đóng có mức trần - lương rất cao không đóng tăng mãi theo tỷ lệ",
    ],
    practicePrompt: {
      question:
        "Lương gross của bạn là 24 triệu đồng. Tổng số tiền đi vào các quỹ bảo hiểm mỗi tháng (cả phần bạn và phần doanh nghiệp) là bao nhiêu?",
      options: [
        "2,52 triệu đồng - chỉ tính phần bạn đóng",
        "5,16 triệu đồng - chỉ tính phần doanh nghiệp đóng",
        "7,68 triệu đồng - tổng 32% của 24 triệu",
        "24 triệu đồng - toàn bộ lương",
      ],
      correct: 2,
      explanation:
        "Phần bạn đóng: 24 × 10,5% = 2,52 triệu. Phần doanh nghiệp: 24 × 21,5% = 5,16 triệu. Tổng vào quỹ = 24 × 32% = 7,68 triệu đồng/tháng. Con số này cho thấy chi phí thực doanh nghiệp bỏ ra cho bạn cao hơn nhiều so với lương gross.",
    },
    summary: {
      keyIdea: "NLĐ 10,5% + DN 21,5% = 32% tiền lương làm căn cứ đóng",
      commonMistake:
        "Coi 10,5% là tiền mất trắng, và chỉ nhìn lương gross khi so sánh gói đãi ngộ giữa các công ty.",
      action: "Đối chiếu mức lương đóng bảo hiểm trên bảng lương với lương gross thực tế của bạn.",
    },
    application: {
      title: "Kiểm tra mức lương đóng bảo hiểm",
      message:
        "Trên bảng lương, tìm dòng 'tiền lương đóng BHXH'. Nhiều doanh nghiệp đóng trên mức thấp hơn lương gross thực tế - điều này làm giảm khấu trừ hiện tại nhưng cũng làm giảm lương hưu và trợ cấp sau này.",
      secondary: "Đây là đánh đổi đáng cân nhắc, đặc biệt nếu bạn còn nhiều năm làm việc phía trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau thuế, bảo hiểm bắt buộc là dòng khấu trừ lớn nhất trên bảng lương. Nhưng khác với thuế, đây là khoản bạn đổi lấy quyền lợi cụ thể - và phần doanh nghiệp đóng cho bạn còn lớn gấp đôi phần bạn tự đóng.",
      },
      { type: "heading", text: "Ai đóng bao nhiêu" },
      {
        type: "list",
        items: [
          "Người lao động - tổng 10,5%: quỹ hưu trí và tử tuất 8%, bảo hiểm y tế 1,5%, bảo hiểm thất nghiệp 1%",
          "Doanh nghiệp - tổng 21,5%: hưu trí 14%, ốm đau và thai sản 3%, tai nạn lao động - bệnh nghề nghiệp 0,5%, bảo hiểm y tế 3%, bảo hiểm thất nghiệp 1%",
          "Tổng cộng 32% tiền lương làm căn cứ đóng chảy vào các quỹ bảo hiểm",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Góc nhìn 'tiền mất'",
          text: "Mỗi tháng bị trừ 10,5% lương, không thấy nhận lại gì ngay lập tức.",
        },
        right: {
          label: "Góc nhìn 'mua quyền lợi'",
          text: "Đổi lại lương hưu khi về già, chi trả khám chữa bệnh, trợ cấp khi mất việc - và doanh nghiệp góp thêm 21,5% cho cùng các quỹ đó.",
        },
      },
      { type: "heading", text: "Tác động kép lên thuế TNCN" },
      {
        type: "paragraph",
        text: "Bảo hiểm bắt buộc được trừ khỏi thu nhập TRƯỚC khi tính thuế. Nghĩa là ngoài việc mua quyền lợi, khoản này còn kéo thu nhập tính thuế xuống, giúp bạn nộp ít thuế hơn. Với lương gross 30 triệu, phần bảo hiểm 3,15 triệu giúp giảm thu nhập tính thuế đúng bằng con số đó.",
      },
      {
        type: "callout",
        label: "Cẩn thận với mức lương đóng bảo hiểm thấp",
        text: "Một số doanh nghiệp đóng bảo hiểm trên mức lương thấp hơn lương thực trả. Trước mắt bạn bị trừ ít hơn, nhưng lương hưu, trợ cấp thất nghiệp và chế độ thai sản đều tính trên mức đã đóng - nên thiệt hại dài hạn thường lớn hơn phần lợi ngắn hạn.",
      },
      {
        type: "conceptTable",
        title: "Ba loại bảo hiểm bắt buộc",
        concepts: [
          { vi: "Bảo hiểm xã hội", en: "Social insurance (BHXH)", def: "Quỹ hưu trí, tử tuất, ốm đau, thai sản - trụ cột lương hưu sau này" },
          { vi: "Bảo hiểm y tế", en: "Health insurance (BHYT)", def: "Chi trả một phần chi phí khám chữa bệnh theo quy định" },
          { vi: "Bảo hiểm thất nghiệp", en: "Unemployment insurance (BHTN)", def: "Trợ cấp và hỗ trợ tìm việc khi mất việc làm" },
          { vi: "Tiền lương làm căn cứ đóng", en: "Contribution salary base", def: "Mức lương dùng để tính các khoản đóng, có quy định mức trần" },
        ],
      },
      {
        type: "closing",
        lines: [
          "10,5% không biến mất - nó đổi thành quyền lợi và giảm thuế cho bạn.",
          "Bài tiếp theo: cải cách thuế 2026 và số tiền bạn thực sự được lợi.",
        ],
      },
    ],
  },

  {
    id: 1305,
    slug: "cai-cach-thue-tncn-2026-tu-7-bac-xuong-5-bac",
    title: "Chặng Thuế, Bài 5: Cải cách thuế 2026 - từ 7 bậc xuống 5 bậc, ai được lợi?",
    subtitle: "So sánh số tiền thuế trước và sau cải cách",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "personal",
    whyItMatters:
      "Đây là thay đổi thuế TNCN lớn nhất trong hơn một thập kỷ, vừa áp dụng từ kỳ tính thuế 2026. Nếu bạn chưa tính lại lương net theo quy định mới, ngân sách cá nhân của bạn đang dựa trên số liệu cũ.",
    openingQuestion:
      "Cải cách thuế TNCN áp dụng từ kỳ tính thuế 2026 thay đổi những gì?",
    openingOptions: [
      "Chỉ tăng mức giảm trừ gia cảnh, biểu thuế giữ nguyên 7 bậc",
      "Chỉ giảm số bậc từ 7 xuống 5, giữ nguyên mức giảm trừ",
      "Vừa giảm từ 7 xuống 5 bậc, vừa nâng mức giảm trừ gia cảnh, đồng thời hạ thuế suất ở các bậc giữa",
      "Chuyển sang thuế suất cố định 10% cho mọi mức thu nhập",
    ],
    correctOption: 2,
    explanation:
      "Cải cách gồm ba thay đổi cùng lúc: (1) biểu thuế rút từ 7 xuống 5 bậc với khoảng cách giữa các bậc rộng hơn; (2) thuế suất bậc 2 giảm từ 15% xuống 10%, bậc 3 từ 25% xuống 20%; (3) giảm trừ gia cảnh tăng từ 11 lên 15,5 triệu (bản thân) và từ 4,4 lên 6,2 triệu (người phụ thuộc). Cả ba đều theo hướng giảm gánh nặng thuế.",
    diagram: [
      { label: "Trước: 7 bậc, giảm trừ 11tr", arrow: true },
      { label: "Rút gọn còn 5 bậc", arrow: true },
      { label: "Hạ thuế suất bậc giữa", arrow: true },
      { label: "Sau: 5 bậc, giảm trừ 15,5tr" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Người lương 30 triệu, độc thân",
      description:
        "Theo quy định cũ: thu nhập tính thuế = 30 − 3,15 − 11 = 15,85 triệu, thuế phải nộp khoảng 1.627.500 đồng/tháng. Theo quy định 2026: thu nhập tính thuế = 30 − 3,15 − 15,5 = 11,35 triệu, thuế chỉ còn 635.000 đồng/tháng. Tiết kiệm gần 993.000 đồng mỗi tháng, tương đương khoảng 11,9 triệu đồng một năm.",
    },
    quiz: [
      {
        question: "Thuế suất bậc 2 thay đổi như thế nào sau cải cách?",
        options: [
          "Tăng từ 10% lên 15%",
          "Giảm từ 15% xuống 10%",
          "Giữ nguyên 10%",
          "Bị xóa bỏ hoàn toàn",
        ],
        correct: 1,
        explanation:
          "Bậc 2 giảm từ 15% xuống 10%, và bậc 3 giảm từ 25% xuống 20% - hai bậc mà phần lớn người làm công ăn lương rơi vào.",
      },
      {
        question: "Nhóm nào hưởng lợi rõ rệt nhất từ cải cách này?",
        options: [
          "Chỉ nhóm thu nhập trên 100 triệu/tháng",
          "Nhóm thu nhập trung bình, do vừa được nâng giảm trừ vừa được hạ thuế suất bậc giữa",
          "Chỉ nhóm không có người phụ thuộc",
          "Không ai được lợi, đây chỉ là thay đổi kỹ thuật",
        ],
        correct: 1,
        explanation:
          "Nhóm thu nhập trung bình hưởng lợi kép: mức giảm trừ cao hơn kéo thu nhập tính thuế xuống, đồng thời phần còn lại chịu thuế suất thấp hơn ở các bậc giữa.",
      },
      {
        question: "Ngưỡng chịu thuế suất cao nhất 35% thay đổi ra sao?",
        options: [
          "Giảm từ 100 triệu xuống 80 triệu",
          "Nâng từ 80 triệu lên 100 triệu đồng/tháng",
          "Giữ nguyên ở 80 triệu",
          "Bỏ hẳn mức 35%",
        ],
        correct: 1,
        explanation:
          "Ngưỡng áp thuế suất 35% được nâng từ trên 80 triệu lên trên 100 triệu đồng thu nhập tính thuế mỗi tháng.",
      },
      {
        question: "Việc rút từ 7 bậc xuống 5 bậc mang lại lợi ích gì ngoài giảm thuế?",
        options: [
          "Không có lợi ích nào khác",
          "Bắt buộc mọi người phải quyết toán thuế hằng năm",
          "Biểu thuế đơn giản hơn, khoảng cách bậc rộng hơn nên ít bị nhảy bậc khi thu nhập tăng nhẹ",
          "Giúp doanh nghiệp không phải đóng bảo hiểm",
        ],
        correct: 2,
        explanation:
          "Ít bậc và khoảng cách rộng hơn khiến việc tính thuế đơn giản hơn, đồng thời một khoản tăng lương vừa phải ít khả năng đẩy bạn sang bậc cao hơn.",
      },
    ],
    keyTakeaways: [
      "Biểu thuế 2026: 5 bậc (5/10/20/30/35%) theo mốc 10 - 30 - 60 - 100 triệu, thay cho 7 bậc cũ",
      "Thuế suất bậc 2 giảm 15%→10%, bậc 3 giảm 25%→20%",
      "Giảm trừ gia cảnh tăng: bản thân 11→15,5 triệu, người phụ thuộc 4,4→6,2 triệu",
      "Người lương 30 triệu độc thân tiết kiệm khoảng 993.000 đồng/tháng so với quy định cũ",
    ],
    practicePrompt: {
      question:
        "Anh Hùng lương gross 45 triệu, độc thân. Theo quy định 2026, thuế TNCN mỗi tháng của anh là bao nhiêu? (Bảo hiểm 10,5%)",
      options: [
        "Khoảng 4,5 triệu đồng",
        "Khoảng 1,98 triệu đồng",
        "Khoảng 2,52 triệu đồng",
        "Khoảng 900.000 đồng",
      ],
      correct: 1,
      explanation:
        "Bảo hiểm = 45 × 10,5% = 4,725 triệu. Thu nhập tính thuế = 45 − 4,725 − 15,5 = 24,775 triệu. Cắt lát theo bậc: 10 triệu × 5% = 500.000đ; phần từ 10 đến 24,775 triệu (tức 14,775 triệu) × 10% = 1.477.500đ. Tổng thuế = 1.977.500 đồng, tức khoảng 1,98 triệu. Đáng chú ý: thuế suất hiệu dụng chỉ khoảng 4,4% lương gross, dù anh Hùng đang 'ở bậc 10%'.",
    },
    summary: {
      keyIdea: "Cải cách 2026 giảm số bậc, hạ thuế suất bậc giữa và nâng mức giảm trừ - cả ba đều giảm thuế",
      commonMistake:
        "Vẫn tính lương net theo mức giảm trừ 11 triệu cũ, dẫn đến ước lượng sai thu nhập thực nhận.",
      action: "Tính lại lương net của bạn theo biểu thuế và mức giảm trừ 2026.",
    },
    application: {
      title: "Tính lại ngân sách theo mức thuế mới",
      message:
        "Nếu bạn lập ngân sách từ trước năm 2026, hãy tính lại lương net theo mức giảm trừ 15,5 triệu và biểu thuế 5 bậc. Khoản chênh lệch có thể dùng để tăng tỷ lệ tiết kiệm thay vì lặng lẽ trôi vào chi tiêu.",
      secondary:
        "Quy định thuế thay đổi theo thời gian - hãy kiểm tra lại vào mỗi đầu năm tài chính.",
    },
    sections: [
      {
        type: "lead",
        text: "Từ kỳ tính thuế 2026, thuế thu nhập cá nhân Việt Nam thay đổi theo hướng có lợi cho người nộp thuế trên cả ba mặt cùng lúc: ít bậc hơn, thuế suất thấp hơn ở các bậc giữa, và mức giảm trừ cao hơn đáng kể.",
      },
      { type: "heading", text: "Ba thay đổi đồng thời" },
      {
        type: "list",
        items: [
          "Biểu thuế rút từ 7 bậc xuống 5 bậc, khoảng cách giữa các bậc rộng hơn (Điều 9 Luật 109/2025/QH15)",
          "Thuế suất bậc 2 giảm từ 15% xuống 10%; bậc 3 giảm từ 25% xuống 20%",
          "Ngưỡng chịu thuế suất cao nhất 35% nâng từ trên 80 triệu lên trên 100 triệu đồng/tháng",
          "Giảm trừ gia cảnh tăng gần 41%: bản thân 11 → 15,5 triệu, người phụ thuộc 4,4 → 6,2 triệu (NQ 110/2025/UBTVQH15)",
        ],
      },
      { type: "heading", text: "So sánh bằng con số thật" },
      {
        type: "formula",
        title: "Người lương gross 30 triệu, độc thân",
        equation: "Tiết kiệm = Thuế theo quy định cũ − Thuế theo quy định 2026",
        example: {
          title: "Trước và sau cải cách",
          calculation:
            "CŨ: TNTT = 30 − 3,15 − 11 = 15,85tr → thuế = (5×5%) + (5×10%) + (5,85×15%) = 1.627.500đ  ||  MỚI: TNTT = 30 − 3,15 − 15,5 = 11,35tr → thuế = (10×5%) + (1,35×10%) = 635.000đ",
          result: "Tiết kiệm ≈ 992.500 đồng/tháng, khoảng 11,9 triệu đồng/năm",
          explanation:
            "Lợi ích đến từ hai phía: mức giảm trừ cao hơn kéo thu nhập tính thuế xuống 4,5 triệu, đồng thời phần thu nhập còn lại chịu thuế suất thấp hơn nhờ bậc 2 hạ từ 15% xuống 10%.",
        },
      },
      {
        type: "callout",
        label: "Về thời điểm áp dụng",
        text: "Luật Thuế thu nhập cá nhân 2025 có hiệu lực từ 1/7/2026, nhưng các quy định về thu nhập từ tiền lương, tiền công và giảm trừ gia cảnh được áp dụng từ kỳ tính thuế năm 2026 - tức tính cho cả năm 2026. Khoản chênh lệch của những tháng đầu năm sẽ được xử lý khi quyết toán.",
      },
      {
        type: "comparison",
        left: {
          label: "Biểu thuế cũ - 7 bậc",
          text: "Các mốc 5 - 10 - 18 - 32 - 52 - 80 triệu, thuế suất 5/10/15/20/25/30/35%. Bậc hẹp nên dễ nhảy bậc khi tăng lương.",
        },
        right: {
          label: "Biểu thuế 2026 - 5 bậc",
          text: "Các mốc 10 - 30 - 60 - 100 triệu, thuế suất 5/10/20/30/35%. Bậc rộng hơn, đơn giản hơn, thuế thấp hơn ở vùng thu nhập phổ biến.",
        },
      },
      {
        type: "closing",
        lines: [
          "Cải cách 2026 giảm thuế rõ rệt nhất cho nhóm thu nhập trung bình.",
          "Bài tiếp theo: quyết toán thuế cuối năm - khi nào bạn được hoàn tiền.",
        ],
      },
    ],
  },

  {
    id: 1306,
    slug: "quyet-toan-thue-tncn-hoan-thue",
    title: "Chặng Thuế, Bài 6: Quyết toán thuế cuối năm và hoàn thuế",
    subtitle: "Khi nào bạn phải làm, khi nào bạn được nhận tiền về",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Thuế bị khấu trừ hằng tháng chỉ là con số tạm tính. Quyết toán là lúc tính lại cho đúng cả năm - và với rất nhiều người, đây là lúc nhận lại tiền nộp thừa. Không quyết toán nghĩa là tự bỏ khoản hoàn thuế đó.",
    openingQuestion:
      "Vì sao nhiều người làm công ăn lương lại được HOÀN thuế khi quyết toán cuối năm?",
    openingOptions: [
      "Vì nhà nước thưởng cho người nộp thuế đúng hạn",
      "Vì thuế khấu trừ hằng tháng là tạm tính, chưa phản ánh đủ giảm trừ hoặc thu nhập không đều giữa các tháng",
      "Vì thuế suất được giảm hồi tố mỗi năm",
      "Vì công ty luôn khấu trừ thừa 10% theo quy định",
    ],
    correctOption: 1,
    explanation:
      "Hằng tháng công ty tạm khấu trừ dựa trên thu nhập tháng đó. Đến cuối năm, thuế được tính lại trên tổng thu nhập cả năm với đầy đủ các khoản giảm trừ. Nếu bạn đăng ký người phụ thuộc muộn, có tháng thu nhập thấp, hoặc chỉ làm việc một phần năm, số tạm khấu trừ thường cao hơn số thực phải nộp - phần chênh lệch được hoàn lại.",
    diagram: [
      { label: "Tạm khấu trừ hằng tháng", arrow: true },
      { label: "Tổng hợp thu nhập cả năm", arrow: true },
      { label: "Tính lại thuế với đủ giảm trừ", arrow: true },
      { label: "Nộp thêm hoặc được hoàn" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Người đi làm từ giữa năm",
      description:
        "Một bạn tốt nghiệp và bắt đầu đi làm từ tháng 7 với lương 20 triệu. Mỗi tháng công ty tạm khấu trừ thuế như thể bạn có thu nhập đó cả 12 tháng. Nhưng khi quyết toán, tổng thu nhập cả năm chỉ là 6 tháng lương, trong khi giảm trừ bản thân được tính cho cả 12 tháng. Kết quả gần như chắc chắn là được hoàn lại toàn bộ hoặc phần lớn số thuế đã tạm nộp.",
    },
    quiz: [
      {
        question: "Thuế TNCN khấu trừ hằng tháng có tính chất gì?",
        options: [
          "Là số thuế cuối cùng, không thay đổi",
          "Là số tạm tính, sẽ được tính lại khi quyết toán cả năm",
          "Là khoản đặt cọc không hoàn lại",
          "Chỉ áp dụng cho người có thu nhập trên 100 triệu",
        ],
        correct: 1,
        explanation:
          "Khấu trừ hằng tháng là tạm tính. Quyết toán mới là bước xác định nghĩa vụ thuế thực sự của cả năm.",
      },
      {
        question:
          "Trường hợp nào KHẢ NĂNG CAO dẫn đến được hoàn thuế?",
        options: [
          "Thu nhập đều đặn cả 12 tháng và đã đăng ký đủ người phụ thuộc từ đầu năm",
          "Chỉ đi làm nửa năm, hoặc đăng ký người phụ thuộc muộn",
          "Có thêm thu nhập từ nhiều nơi khác nhau",
          "Thu nhập vượt mức 100 triệu mỗi tháng",
        ],
        correct: 1,
        explanation:
          "Khi thu nhập không trải đều cả năm hoặc giảm trừ chưa được tính đủ ngay từ đầu, số tạm khấu trừ thường vượt số thực phải nộp.",
      },
      {
        question:
          "Người có thu nhập từ hai nơi trở lên cần lưu ý gì?",
        options: [
          "Không cần làm gì, mỗi nơi tự khấu trừ là xong",
          "Thường phải tự quyết toán, vì mỗi nơi chỉ khấu trừ trên phần thu nhập của họ nên tổng có thể chưa đúng",
          "Được miễn thuế ở nơi thứ hai",
          "Phải nộp thuế hai lần cho cùng một khoản thu nhập",
        ],
        correct: 1,
        explanation:
          "Mỗi đơn vị chi trả chỉ nhìn thấy phần thu nhập của mình. Khi cộng gộp cả năm, tổng thu nhập có thể rơi vào bậc thuế cao hơn, nên cần tự quyết toán để tính lại cho đúng.",
      },
      {
        question: "Ủy quyền quyết toán cho công ty phù hợp với ai?",
        options: [
          "Người chỉ có thu nhập từ một nơi duy nhất trong năm",
          "Người có thu nhập từ nhiều nguồn khác nhau",
          "Người muốn tự kê khai thêm các khoản giảm trừ đặc thù",
          "Mọi người, không có ngoại lệ",
        ],
        correct: 0,
        explanation:
          "Ủy quyền cho công ty là cách đơn giản nhất khi bạn chỉ có một nguồn thu nhập. Có nhiều nguồn thì thường phải tự quyết toán để tổng hợp đầy đủ.",
      },
    ],
    keyTakeaways: [
      "Thuế khấu trừ hằng tháng chỉ là tạm tính; quyết toán mới xác định nghĩa vụ thực của cả năm",
      "Đi làm không trọn năm hoặc đăng ký người phụ thuộc muộn thường dẫn đến được hoàn thuế",
      "Có thu nhập từ hai nơi trở lên thì thường phải TỰ quyết toán, không ủy quyền được",
      "Không quyết toán khi có số nộp thừa nghĩa là tự bỏ khoản tiền đáng được nhận lại",
    ],
    practicePrompt: {
      question:
        "Bạn đi làm từ tháng 9/2026, lương 25 triệu/tháng, độc thân, không có thu nhập nào khác trong năm. Khi quyết toán, khả năng cao điều gì xảy ra?",
      options: [
        "Phải nộp thêm thuế vì lương khá cao",
        "Không phải làm gì vì mới đi làm",
        "Được hoàn lại phần lớn hoặc toàn bộ thuế đã tạm khấu trừ, vì giảm trừ gia cảnh tính cho cả năm trong khi bạn chỉ có thu nhập 4 tháng",
        "Bị phạt vì kê khai muộn",
      ],
      correct: 2,
      explanation:
        "Tổng thu nhập cả năm = 25 × 4 = 100 triệu. Giảm trừ bản thân cả năm = 15,5 × 12 = 186 triệu, đã lớn hơn tổng thu nhập, chưa kể bảo hiểm. Vậy nghĩa vụ thuế cả năm bằng 0, và toàn bộ số đã tạm khấu trừ trong 4 tháng được hoàn lại - nhưng chỉ khi bạn làm thủ tục quyết toán.",
    },
    summary: {
      keyIdea: "Quyết toán = tính lại thuế trên tổng thu nhập cả năm với đầy đủ giảm trừ",
      commonMistake:
        "Bỏ qua quyết toán vì nghĩ 'công ty đã trừ rồi', trong khi thực tế đang có số nộp thừa chờ được hoàn.",
      action: "Kiểm tra xem năm nay bạn thuộc diện tự quyết toán hay được ủy quyền cho công ty.",
    },
    application: {
      title: "Xác định bạn có được hoàn thuế không",
      message:
        "Cộng tổng thu nhập chịu thuế cả năm, trừ tổng bảo hiểm và tổng giảm trừ gia cảnh (nhân 12 tháng). Tính thuế trên phần còn lại rồi so với tổng số đã bị khấu trừ trên các bảng lương.",
      secondary:
        "Nếu số đã khấu trừ lớn hơn, bạn đang có tiền chờ được hoàn. Thủ tục và thời hạn quyết toán do cơ quan thuế quy định theo từng năm - hãy tra cứu mốc thời gian hiện hành.",
    },
    sections: [
      {
        type: "lead",
        text: "Con số thuế bị trừ trên bảng lương mỗi tháng không phải là con số cuối cùng. Nó chỉ là ước tính tạm thời, và cuối năm mọi thứ được tính lại một lần cho đúng - đó là quyết toán.",
      },
      { type: "heading", text: "Vì sao tạm tính hằng tháng thường lệch" },
      {
        type: "paragraph",
        text: "Công ty khấu trừ dựa trên thu nhập của riêng tháng đó, giả định mức thu nhập ổn định. Nhưng thực tế nhiều yếu tố khiến con số cả năm khác đi: bạn chỉ đi làm một phần năm, có tháng thưởng cao đột biến, đăng ký người phụ thuộc giữa năm, hoặc đổi việc. Quyết toán gom tất cả lại và tính trên tổng thể.",
      },
      {
        type: "list",
        items: [
          "Đi làm không trọn 12 tháng - giảm trừ vẫn tính đủ năm nên thường nộp thừa",
          "Đăng ký người phụ thuộc muộn - các tháng trước chưa được trừ 6,2 triệu/người",
          "Thu nhập không đều giữa các tháng - tháng cao bị khấu trừ ở bậc cao hơn mức trung bình cả năm",
          "Có thu nhập từ nhiều nơi - mỗi nơi chỉ khấu trừ trên phần của mình",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ủy quyền cho công ty",
          text: "Phù hợp khi bạn chỉ có thu nhập từ MỘT nơi duy nhất trong năm. Công ty làm thay, bạn chỉ ký xác nhận.",
        },
        right: {
          label: "Tự quyết toán",
          text: "Cần làm khi có thu nhập từ hai nơi trở lên, hoặc muốn kê khai bổ sung các khoản giảm trừ mà công ty chưa cập nhật.",
        },
      },
      {
        type: "callout",
        label: "Hoàn thuế không tự động",
        text: "Ngay cả khi bạn chắc chắn đã nộp thừa, cơ quan thuế không tự chuyển tiền về. Bạn phải làm thủ tục quyết toán và đề nghị hoàn thuế. Không làm nghĩa là khoản tiền đó ở lại ngân sách.",
      },
      {
        type: "conceptTable",
        title: "Thuật ngữ quyết toán",
        concepts: [
          { vi: "Tạm khấu trừ", en: "Withholding", def: "Số thuế công ty trừ trước trên bảng lương hằng tháng" },
          { vi: "Quyết toán thuế", en: "Tax finalisation", def: "Tính lại nghĩa vụ thuế trên tổng thu nhập cả năm" },
          { vi: "Hoàn thuế", en: "Tax refund", def: "Nhận lại phần đã nộp thừa so với nghĩa vụ thực tế" },
          { vi: "Ủy quyền quyết toán", en: "Authorised finalisation", def: "Nhờ đơn vị chi trả thu nhập quyết toán thay, áp dụng khi chỉ có một nguồn thu nhập" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Quyết toán là bước duy nhất biến số nộp thừa thành tiền quay lại túi bạn.",
          "Bài tiếp theo: thu nhập ngoài lương - freelance, cho thuê nhà và hộ kinh doanh.",
        ],
      },
    ],
  },

  {
    id: 1307,
    slug: "thue-thu-nhap-ngoai-luong-freelance-cho-thue-nha",
    title: "Chặng Thuế, Bài 7: Thu nhập ngoài lương - freelance, cho thuê nhà, hộ kinh doanh",
    subtitle: "Ba nguồn thu nhập phổ biến và cách chúng bị đánh thuế khác nhau",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "💼",
    track: "personal",
    whyItMatters:
      "Ngày càng nhiều người có thu nhập ngoài lương chính. Mỗi loại thu nhập lại có cách tính thuế riêng, và các ngưỡng vừa thay đổi lớn từ 2026. Không nắm rõ dễ dẫn đến vừa nộp sai vừa bị truy thu.",
    openingQuestion:
      "Bạn nhận 6 triệu đồng cho một dự án freelance từ một công ty không ký hợp đồng lao động dài hạn với bạn. Công ty sẽ làm gì?",
    openingOptions: [
      "Trả đủ 6 triệu, bạn tự đi nộp thuế sau",
      "Khấu trừ 10% thuế TNCN trước khi trả, vì khoản này từ 5 triệu đồng/lần trở lên",
      "Khấu trừ theo biểu lũy tiến 5 bậc như lương",
      "Không khấu trừ gì vì đây không phải tiền lương",
    ],
    correctOption: 1,
    explanation:
      "Theo Nghị định 253/2026/NĐ-CP, thu nhập vãng lai từ 5 triệu đồng/lần trở lên bị khấu trừ 10% thuế TNCN tại nguồn. Ngưỡng này đã được nâng từ mức 2 triệu trước đây. Bạn nhận về 5,4 triệu, và 600.000 đồng được nộp thay. Khoản này sẽ được tính lại khi bạn quyết toán cả năm.",
    diagram: [
      { label: "Thu nhập vãng lai ≥ 5 triệu/lần", arrow: true },
      { label: "Khấu trừ 10% tại nguồn", arrow: true },
      { label: "Tổng hợp khi quyết toán năm", arrow: true },
      { label: "Nộp thêm hoặc được hoàn" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Người làm thêm ngoài giờ",
      description:
        "Một nhân viên văn phòng nhận thêm các dự án thiết kế, mỗi dự án 6-8 triệu đồng. Mỗi lần thanh toán, bên chi trả khấu trừ 10%. Cuối năm khi quyết toán, toàn bộ thu nhập lương và freelance được cộng gộp, tính lại theo biểu lũy tiến. Nếu tổng thu nhập vẫn ở bậc thấp, phần đã khấu trừ 10% có thể cao hơn nghĩa vụ thực và được hoàn lại.",
    },
    quiz: [
      {
        question:
          "Ngưỡng khấu trừ 10% với thu nhập vãng lai theo quy định 2026 là bao nhiêu?",
        options: [
          "Từ 2 triệu đồng/lần trở lên",
          "Từ 5 triệu đồng/lần trở lên",
          "Từ 10 triệu đồng/lần trở lên",
          "Mọi khoản thu nhập, không có ngưỡng",
        ],
        correct: 1,
        explanation:
          "Nghị định 253/2026/NĐ-CP nâng ngưỡng từ 2 triệu lên 5 triệu đồng/lần. Dưới ngưỡng này không bị khấu trừ tại nguồn, nhưng vẫn phải kê khai khi quyết toán.",
      },
      {
        question:
          "Cá nhân cho thuê nhà chịu thuế TNCN khi doanh thu vượt ngưỡng nào mỗi năm?",
        options: [
          "100 triệu đồng",
          "200 triệu đồng",
          "500 triệu đồng",
          "Chịu thuế từ đồng đầu tiên",
        ],
        correct: 2,
        explanation:
          "Luật Thuế TNCN 2025 nâng ngưỡng chịu thuế cho hoạt động kinh doanh, trong đó có cho thuê nhà, từ 200 triệu lên 500 triệu đồng/năm.",
      },
      {
        question:
          "Thay đổi lớn nào áp dụng với hộ kinh doanh từ 1/1/2026?",
        options: [
          "Được miễn toàn bộ thuế",
          "Bỏ phương pháp thuế khoán, chuyển sang kê khai",
          "Phải đóng bảo hiểm xã hội bắt buộc như người lao động",
          "Không có thay đổi nào",
        ],
        correct: 1,
        explanation:
          "Theo Nghị quyết 198/2025/QH15, hộ kinh doanh và cá nhân kinh doanh không còn áp dụng phương pháp khoán thuế từ 1/1/2026, thay vào đó là kê khai theo doanh thu thực tế.",
      },
      {
        question:
          "Vì sao thu nhập bị khấu trừ 10% vẫn cần kê khai khi quyết toán?",
        options: [
          "Vì 10% chỉ là tạm tính; tổng thu nhập cả năm mới quyết định nghĩa vụ thực và có thể được hoàn lại",
          "Vì phải nộp thêm 10% nữa",
          "Vì luật bắt buộc dù không ảnh hưởng số thuế",
          "Vì khoản đó bị đánh thuế hai lần",
        ],
        correct: 0,
        explanation:
          "Mức 10% là khấu trừ tại nguồn cố định, không phản ánh bậc thuế thực của bạn. Khi gộp cả năm và trừ các khoản giảm trừ, nghĩa vụ thực có thể thấp hơn - phần chênh được hoàn.",
      },
    ],
    keyTakeaways: [
      "Thu nhập vãng lai từ 5 triệu đồng/lần trở lên bị khấu trừ 10% tại nguồn (NĐ 253/2026/NĐ-CP)",
      "Cho thuê nhà: ngưỡng chịu thuế nâng từ 200 lên 500 triệu đồng doanh thu/năm",
      "Hộ kinh doanh bỏ thuế khoán từ 1/1/2026, chuyển sang kê khai (NQ 198/2025/QH15)",
      "Mọi khoản đã khấu trừ 10% vẫn phải gộp vào quyết toán năm - và thường được hoàn một phần",
    ],
    practicePrompt: {
      question:
        "Chị Mai có lương chính 18 triệu/tháng và nhận thêm 4 dự án freelance trong năm, mỗi dự án 7 triệu đồng. Nhận định nào đúng?",
      options: [
        "Các khoản freelance được miễn thuế vì đã có lương chính chịu thuế",
        "Mỗi dự án bị khấu trừ 10% (700.000đ), và cuối năm chị cần quyết toán gộp cả lương lẫn freelance để tính lại cho đúng",
        "Mỗi dự án bị đánh thuế theo biểu lũy tiến riêng biệt",
        "Chị phải đăng ký hộ kinh doanh mới được nhận dự án freelance",
      ],
      correct: 1,
      explanation:
        "Mỗi dự án 7 triệu vượt ngưỡng 5 triệu nên bị khấu trừ 10% = 700.000đ, tổng 2,8 triệu cho cả 4 dự án. Vì có thu nhập từ nhiều nguồn, chị Mai thuộc diện tự quyết toán: cộng 216 triệu lương + 28 triệu freelance, trừ bảo hiểm và giảm trừ gia cảnh, rồi tính theo biểu lũy tiến. Số đã khấu trừ được đối trừ vào nghĩa vụ cuối cùng.",
    },
    summary: {
      keyIdea: "Mỗi loại thu nhập ngoài lương có cơ chế thuế riêng, nhưng tất cả đều gộp lại khi quyết toán",
      commonMistake:
        "Tưởng rằng đã bị khấu trừ 10% là xong nghĩa vụ, nên không quyết toán và mất phần được hoàn.",
      action: "Lập danh sách mọi nguồn thu nhập ngoài lương của bạn trong năm nay.",
    },
    application: {
      title: "Lập sổ theo dõi thu nhập ngoài lương",
      message:
        "Ghi lại từng khoản: ngày nhận, số tiền, bên chi trả, số thuế đã bị khấu trừ. Cuối năm bạn sẽ cần đúng những thông tin này để quyết toán và đòi lại phần nộp thừa.",
      secondary:
        "Quy định về hộ kinh doanh và ngưỡng doanh thu đang trong giai đoạn chuyển đổi - hãy tra cứu hướng dẫn mới nhất trước khi kê khai.",
    },
    sections: [
      {
        type: "lead",
        text: "Thu nhập ngoài lương ngày càng phổ biến: làm freelance, cho thuê căn hộ, bán hàng online. Ba nguồn này bị đánh thuế theo ba cơ chế khác nhau, và cả ba đều vừa có thay đổi lớn từ năm 2026.",
      },
      { type: "heading", text: "1. Thu nhập vãng lai: khấu trừ 10% tại nguồn" },
      {
        type: "paragraph",
        text: "Khi bạn nhận thù lao từ một đơn vị không ký hợp đồng lao động dài hạn với bạn, khoản đó được coi là thu nhập vãng lai. Theo Nghị định 253/2026/NĐ-CP, các khoản **từ 5 triệu đồng/lần trở lên** bị khấu trừ 10% ngay khi chi trả. Ngưỡng này đã được nâng từ mức 2 triệu áp dụng trước đây - một thay đổi có lợi cho người làm các công việc nhỏ lẻ.",
      },
      {
        type: "callout",
        label: "10% không phải con số cuối cùng",
        text: "Mức khấu trừ 10% là cố định, không phụ thuộc bậc thuế thực của bạn. Nếu tổng thu nhập cả năm của bạn nằm ở bậc thấp, số thực phải nộp có thể ít hơn nhiều - phần chênh lệch được hoàn khi quyết toán. Đây là lý do người có thu nhập freelance gần như luôn nên quyết toán.",
      },
      { type: "heading", text: "2. Cho thuê nhà: ngưỡng 500 triệu đồng/năm" },
      {
        type: "paragraph",
        text: "Luật Thuế TNCN 2025 nâng ngưỡng doanh thu chịu thuế cho hoạt động kinh doanh của cá nhân, bao gồm cho thuê bất động sản, **từ 200 triệu lên 500 triệu đồng/năm**. Dưới ngưỡng này không phát sinh nghĩa vụ thuế TNCN từ hoạt động cho thuê; vượt ngưỡng thì phần vượt chịu thuế theo tỷ lệ trên doanh thu chứ không theo biểu lũy tiến như tiền lương.",
      },
      { type: "heading", text: "3. Hộ kinh doanh: bỏ thuế khoán từ 2026" },
      {
        type: "paragraph",
        text: "Theo Nghị quyết 198/2025/QH15, từ ngày 1/1/2026 hộ kinh doanh và cá nhân kinh doanh **không còn áp dụng phương pháp thuế khoán** - cách tính ấn định một mức thuế cố định hằng tháng bất kể doanh thu thực tế. Thay vào đó là kê khai theo doanh thu thực. Thay đổi này đòi hỏi ghi chép sổ sách và hóa đơn nghiêm túc hơn nhiều so với trước.",
      },
      {
        type: "conceptTable",
        title: "Ba loại thu nhập ngoài lương",
        concepts: [
          { vi: "Thu nhập vãng lai", en: "Occasional income", def: "Thù lao từ đơn vị không ký hợp đồng lao động dài hạn; khấu trừ 10% nếu từ 5 triệu/lần" },
          { vi: "Cho thuê tài sản", en: "Rental income", def: "Chịu thuế khi doanh thu vượt 500 triệu đồng/năm, tính theo tỷ lệ trên doanh thu" },
          { vi: "Hộ kinh doanh", en: "Household business", def: "Từ 1/1/2026 kê khai theo doanh thu thực, không còn thuế khoán" },
          { vi: "Khấu trừ tại nguồn", en: "Withholding at source", def: "Bên chi trả giữ lại thuế và nộp thay trước khi trả tiền cho bạn" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Mỗi nguồn thu nhập có luật chơi riêng, nhưng cuối năm tất cả gặp nhau ở bản quyết toán.",
          "Bài cuối chặng: ráp toàn bộ lại qua ba hồ sơ thật.",
        ],
      },
    ],
  },

  {
    id: 1308,
    slug: "case-tong-ket-tinh-thue-toi-uu-hop-phap",
    title: "Chặng Thuế, Bài 8: Tổng kết - tính thuế cho 3 hồ sơ thật",
    subtitle: "Ráp toàn bộ công thức và những cách tối ưu hợp pháp",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    whyItMatters:
      "Bảy bài trước cho bạn từng mảnh ghép. Bài này ráp chúng lại thành một quy trình bạn có thể áp dụng cho chính bảng lương của mình, và chỉ ra những cách giảm thuế hoàn toàn hợp pháp mà nhiều người bỏ qua.",
    openingQuestion:
      "Thứ tự đúng để đi từ lương gross đến số thuế TNCN phải nộp là gì?",
    openingOptions: [
      "Gross → trừ thuế → trừ bảo hiểm → trừ giảm trừ gia cảnh",
      "Gross → trừ giảm trừ gia cảnh → trừ bảo hiểm → áp biểu thuế",
      "Gross → trừ bảo hiểm bắt buộc → trừ giảm trừ gia cảnh → áp biểu thuế lũy tiến",
      "Gross → áp biểu thuế → trừ bảo hiểm và giảm trừ",
    ],
    correctOption: 2,
    explanation:
      "Thứ tự bắt buộc: (1) trừ bảo hiểm bắt buộc 10,5%; (2) trừ giảm trừ gia cảnh 15,5 triệu + 6,2 triệu mỗi người phụ thuộc; (3) phần còn lại là thu nhập tính thuế, áp biểu lũy tiến 5 bậc. Đảo thứ tự sẽ ra kết quả sai vì mỗi bước tính trên phần còn lại của bước trước.",
    diagram: [
      { label: "Lương gross", arrow: true },
      { label: "− Bảo hiểm 10,5%", arrow: true },
      { label: "− Giảm trừ gia cảnh", arrow: true },
      { label: "Áp biểu 5 bậc → Thuế phải nộp" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Ba hồ sơ điển hình",
      description:
        "Cùng mức lương gross 30 triệu đồng nhưng ba hoàn cảnh gia đình khác nhau cho ra ba số thuế chênh nhau hoàn toàn: người độc thân nộp 635.000đ/tháng, người có 1 người phụ thuộc nộp 325.000đ, còn người có 2 người phụ thuộc không phải nộp đồng nào. Cùng một mức lương, khác biệt duy nhất là số người phụ thuộc đã đăng ký.",
    },
    quiz: [
      {
        question:
          "Với lương gross 30 triệu và 2 người phụ thuộc, thu nhập tính thuế là bao nhiêu?",
        options: [
          "11,35 triệu đồng",
          "5,15 triệu đồng",
          "Số âm, tức không phát sinh thuế phải nộp",
          "27,9 triệu đồng",
        ],
        correct: 2,
        explanation:
          "30 − 3,15 (bảo hiểm) − 27,9 (giảm trừ 15,5 + 6,2×2) = −1,05 triệu. Thu nhập tính thuế âm nghĩa là không phát sinh nghĩa vụ thuế TNCN.",
      },
      {
        question: "Cách nào sau đây là tối ưu thuế HỢP PHÁP?",
        options: [
          "Nhờ công ty trả một phần lương bằng tiền mặt không qua sổ sách",
          "Đăng ký đầy đủ người phụ thuộc đủ điều kiện và tham gia quỹ hưu trí bổ sung tự nguyện trong hạn mức",
          "Khai thấp thu nhập thực nhận",
          "Chia nhỏ hợp đồng freelance xuống dưới 5 triệu mỗi lần để né khấu trừ",
        ],
        correct: 1,
        explanation:
          "Đăng ký người phụ thuộc và đóng quỹ hưu trí bổ sung tự nguyện là các khoản giảm trừ được pháp luật cho phép. Các phương án còn lại đều là hành vi trốn thuế hoặc lách luật, có rủi ro pháp lý.",
      },
      {
        question:
          "Người lương gross 19 triệu, độc thân, không có người phụ thuộc, phải nộp thuế bao nhiêu mỗi tháng?",
        options: [
          "Khoảng 500.000 đồng",
          "Khoảng 75.000 đồng",
          "Không phải nộp đồng nào",
          "Khoảng 1,5 triệu đồng",
        ],
        correct: 1,
        explanation:
          "Bảo hiểm = 19 × 10,5% = 1,995 triệu. Thu nhập tính thuế = 19 − 1,995 − 15,5 = 1,505 triệu, nằm trọn trong bậc 1. Thuế = 1,505 × 5% ≈ 75.000 đồng/tháng. Với mức giảm trừ 15,5 triệu mới, ngưỡng bắt đầu phát sinh thuế được đẩy lên quanh mức lương gross 17,3 triệu - cao hơn nhiều so với trước cải cách.",
      },
      {
        question:
          "Điều gì nên làm ngay sau khi học xong chặng này?",
        options: [
          "Không cần làm gì, kiến thức sẽ tự áp dụng",
          "Rà lại người phụ thuộc chưa đăng ký, tính lại lương net theo mức 2026, và kiểm tra xem có thuộc diện được hoàn thuế không",
          "Đàm phán lại lương với công ty",
          "Chuyển toàn bộ thu nhập sang hình thức freelance",
        ],
        correct: 1,
        explanation:
          "Ba hành động cụ thể này đều có thể mang lại tiền thật ngay: giảm trừ bị bỏ sót, ngân sách sai lệch, và khoản hoàn thuế chưa đòi.",
      },
    ],
    keyTakeaways: [
      "Quy trình: Gross → trừ bảo hiểm 10,5% → trừ giảm trừ gia cảnh → áp biểu lũy tiến 5 bậc",
      "Cùng mức lương, số người phụ thuộc đã đăng ký tạo khác biệt rất lớn về số thuế",
      "Tối ưu hợp pháp: đăng ký đủ người phụ thuộc, quỹ hưu trí bổ sung tự nguyện, quyết toán để đòi hoàn",
      "Quy định thuế thay đổi theo năm - luôn kiểm tra lại mức giảm trừ và biểu thuế hiện hành",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn lương gross 40 triệu, có 1 người phụ thuộc đã đăng ký. Thuế TNCN mỗi tháng của anh là bao nhiêu?",
      options: [
        "Khoảng 2,4 triệu đồng",
        "Khoảng 910.000 đồng",
        "Khoảng 1,8 triệu đồng",
        "Khoảng 4 triệu đồng",
      ],
      correct: 1,
      explanation:
        "Bảo hiểm = 40 × 10,5% = 4,2 triệu. Giảm trừ gia cảnh = 15,5 + 6,2 = 21,7 triệu. Thu nhập tính thuế = 40 − 4,2 − 21,7 = 14,1 triệu. Cắt lát theo bậc: 10 triệu × 5% = 500.000đ; phần 4,1 triệu còn lại × 10% = 410.000đ. Tổng thuế = 910.000 đồng/tháng, tương đương thuế suất hiệu dụng chỉ 2,3% lương gross.",
    },
    summary: {
      keyIdea: "Gross − Bảo hiểm − Giảm trừ gia cảnh = Thu nhập tính thuế → áp biểu 5 bậc",
      formula: "Thuế = Σ (phần thu nhập trong mỗi bậc × thuế suất bậc đó)",
      commonMistake:
        "Bỏ sót người phụ thuộc chưa đăng ký và không quyết toán - hai khoản tiền thật bị bỏ lại.",
      action: "Áp dụng quy trình 3 bước lên chính bảng lương tháng này của bạn.",
    },
    application: {
      title: "Checklist hành động sau chặng",
      message:
        "1) Rà soát và đăng ký mọi người phụ thuộc đủ điều kiện. 2) Tính lại lương net theo biểu thuế và mức giảm trừ 2026. 3) Kiểm tra xem bạn thuộc diện tự quyết toán hay ủy quyền, và có số nộp thừa để đòi hoàn không.",
      secondary:
        "Quan trọng: các con số trong chặng này đúng tại thời điểm biên soạn (giữa 2026). Chính sách thuế thay đổi theo năm - hãy đối chiếu với văn bản hiện hành hoặc hỏi chuyên gia thuế trước khi ra quyết định lớn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước cho bạn từng mảnh: gross vs net, biểu lũy tiến, giảm trừ gia cảnh, bảo hiểm, cải cách 2026, quyết toán, thu nhập ngoài lương. Bài này ráp tất cả thành một quy trình ba bước và kiểm chứng bằng ba hồ sơ thật.",
      },
      { type: "heading", text: "Quy trình ba bước, đúng thứ tự" },
      {
        type: "formula",
        title: "Từ lương gross đến số thuế phải nộp",
        equation: "Thu nhập tính thuế = Gross − Bảo hiểm (10,5%) − Giảm trừ gia cảnh",
        variables: [
          { symbol: "Bước 1", name: "Trừ bảo hiểm bắt buộc", description: "10,5% tiền lương làm căn cứ đóng" },
          { symbol: "Bước 2", name: "Trừ giảm trừ gia cảnh", description: "15,5 triệu + 6,2 triệu × số người phụ thuộc" },
          { symbol: "Bước 3", name: "Áp biểu lũy tiến 5 bậc", description: "Cắt lát theo mốc 10 - 30 - 60 - 100 triệu" },
        ],
      },
      { type: "heading", text: "Ba hồ sơ, cùng lương 30 triệu gross" },
      {
        type: "list",
        items: [
          "**Hồ sơ A - độc thân:** TNTT = 30 − 3,15 − 15,5 = 11,35tr → thuế = (10×5%) + (1,35×10%) = 635.000đ/tháng",
          "**Hồ sơ B - 1 người phụ thuộc:** TNTT = 30 − 3,15 − 21,7 = 5,15tr → thuế = 5,15 × 5% = 257.500đ/tháng",
          "**Hồ sơ C - 2 người phụ thuộc:** TNTT = 30 − 3,15 − 27,9 = −1,05tr → không phát sinh thuế phải nộp",
        ],
      },
      {
        type: "callout",
        label: "Khác biệt đến từ đâu",
        text: "Ba người cùng lương, cùng công ty, cùng mức bảo hiểm. Khác biệt duy nhất là số người phụ thuộc đã ĐĂNG KÝ. Từ 635.000đ xuống 0 đồng mỗi tháng - tức hơn 7,6 triệu đồng một năm - chỉ nhờ hoàn tất một thủ tục hành chính.",
      },
      { type: "heading", text: "Tối ưu hợp pháp vs lách luật" },
      {
        type: "comparison",
        left: {
          label: "Hợp pháp - nên làm",
          text: "Đăng ký đầy đủ người phụ thuộc đủ điều kiện; tham gia quỹ hưu trí bổ sung tự nguyện trong hạn mức được trừ; quyết toán để đòi lại phần nộp thừa.",
        },
        right: {
          label: "Rủi ro - không nên",
          text: "Nhận lương ngoài sổ sách; khai thấp thu nhập; chia nhỏ hợp đồng để né ngưỡng khấu trừ. Đây là trốn thuế, có thể bị truy thu và xử phạt.",
        },
      },
      {
        type: "callout",
        label: "Kiểm chứng trước khi quyết định",
        text: "Toàn bộ số liệu trong chặng này dựa trên Luật Thuế TNCN 2025 (109/2025/QH15), Nghị quyết 110/2025/UBTVQH15, Nghị định 253/2026/NĐ-CP và Nghị quyết 198/2025/QH15, đúng tại thời điểm biên soạn. Chính sách thuế được điều chỉnh định kỳ - với các quyết định tài chính lớn, hãy đối chiếu văn bản hiện hành hoặc tham vấn chuyên gia thuế.",
      },
      {
        type: "closing",
        lines: [
          "Thuế không phải thứ để sợ - nó là một công thức ba bước bạn hoàn toàn tự tính được.",
          "Và phần lớn số tiền tiết kiệm được đến từ việc hoàn tất thủ tục, không phải mẹo vặt.",
        ],
      },
    ],
  },
];
