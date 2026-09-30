import type { Lesson } from "../lesson-types";

// Chặng 35, bài 11-15. Giáo trình: scripts/curriculum/stage-35.json.
// Không bài nào dựa vào tính năng riêng của một công cụ AI; mọi số liệu là minh hoạ.

const q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S35_C_LESSONS: Lesson[] = [
  {
    id: 2110,
    slug: "dat-gia-phong-theo-mua-vu",
    title: "Chặng 35, Bài 11: Cân nhắc giá phòng khi mùa vắng và mùa đông",
    subtitle: "Giá cao hơn không luôn là tiền nhiều hơn: bảng thử giá cho bạn thấy điểm cân bằng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sắp tới mùa đông khách, chủ cơ sở bảo bạn tăng giá phòng, còn bạn không chắc tăng bao nhiêu thì khách vẫn tới. Đoán bằng cảm giác thì dễ hụt cả tiền lẫn khách. Nhờ AI dựng một bảng thử vài mức giá từ số đêm bán thật, bạn tự nhìn thấy doanh thu đổi ra sao trước khi quyết.",
    openingQuestion:
      "Cơ sở của bạn có 20 phòng. Đêm thường bán được 15 phòng giá 800.000 đồng. Chủ muốn nâng lên 900.000 đồng. Bạn nên làm gì trước?",
    openingOptions: [
      "Thử vài mức giá trong bảng với số đêm bán thật để xem doanh thu",
      "Nâng ngay lên 900.000 đồng vì mỗi phòng bán được thu thêm 100.000",
      "Hỏi AI giá phòng tối ưu rồi áp dụng đúng con số nó đưa ra",
      "Giữ nguyên giá, vì đổi giá lúc nào cũng làm khách bỏ đi hết",
    ],
    correctOption: 0,
    explanation:
      "Doanh thu một đêm là số phòng bán được nhân với giá. Khi giá tăng, giá mỗi phòng lên nhưng số phòng bán được có thể giảm, và hai chuyện này kéo ngược nhau. Bảng thử giá đặt cạnh nhau vài mức để bạn thấy điểm mà tăng thêm không còn lời. Chỉ nhìn phần thu thêm mỗi phòng thì quên phòng bị mất. AI không biết khách của bạn nhạy giá tới đâu. Giữ nguyên mãi cũng bỏ lỡ mùa đông khách.",
    diagram: [
      { label: "Lấy số đêm bán và giá cũ của chính cơ sở", arrow: true },
      { label: "Nhờ AI dựng bảng thử 3-4 mức giá kèm giả định", arrow: true },
      { label: "Tự xem doanh thu và tỷ lệ lấp đầy từng mức", arrow: true },
      { label: "Chọn mức, ghi lý do, xét lại sau vài tuần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một homestay 12 phòng nhờ AI dựng bảng thử ba mức giá cho mùa đông. Chủ nhà nhập số đêm bán của mùa trước và tự ghi giả định: mỗi lần tăng 100.000 đồng thì mất khoảng hai phòng. Bảng cho thấy mức giữa cho doanh thu cao nhất, mức cao nhất thì lấp đầy quá thấp. Số trong ví dụ này chỉ để minh hoạ cách làm.",
    },
    quiz: [
      q(
        "Nâng giá phòng chắc chắn làm doanh thu đêm đó tăng không?",
        [
          "Chưa chắc, còn tuỳ số phòng bán được giảm đi bao nhiêu khi giá tăng",
          "Chắc chắn tăng, vì mỗi phòng bán được thu thêm 100.000 đồng nên tổng phải cao hơn",
          "Chắc chắn giảm vì khách thấy giá cao là bỏ đi",
          "Không đổi, vì doanh thu chỉ phụ thuộc vào số phòng có sẵn",
        ],
        "Doanh thu bằng giá nhân số phòng bán, nên nó đi lên hay xuống tuỳ hai lực ngược nhau. Nói chắc chắn tăng là quên phòng bị mất, nói chắc chắn giảm là quên phần thu thêm. Doanh thu cũng không cố định theo số phòng có sẵn, mà theo số phòng thật sự bán được.",
      ),
      q(
        "20 phòng, giá 800.000 đồng, bán 15 phòng. Nâng giá lên 900.000 đồng và bán 13 phòng. Doanh thu đêm đó đổi thế nào?",
        [
          "Giảm còn 11,7 triệu (13 × 900.000), trước đó là 12 triệu (15 × 800.000)",
          "Tăng lên 13,5 triệu (15 × 900.000, dùng nhầm số phòng cũ trong khi số phòng bán đã giảm còn 13)",
          "Tăng lên 18 triệu (20 × 900.000, tính cả phòng còn trống)",
          "Giữ nguyên 12 triệu (chỉ so số phòng cũ, bỏ qua giá mới)",
        ],
        "Trước: 15 × 800.000 = 12.000.000. Sau: 13 × 900.000 = 11.700.000, tức giảm 300.000 đồng dù giá cao hơn. Con số 13,5 triệu dùng số phòng cũ, 18 triệu tính cả phòng không bán, và giữ nguyên 12 triệu là không tính lại.",
      ),
      q(
        "Bán 15 trong 20 phòng thì tỷ lệ lấp đầy là bao nhiêu?",
        [
          "75% (15 ÷ 20)",
          "133% (20 ÷ 15, chia ngược số phòng)",
          "25% (5 ÷ 20, lấy phần phòng còn trống)",
          "15% (lấy nguyên số phòng bán làm phần trăm)",
        ],
        "Tỷ lệ lấp đầy là số phòng bán chia tổng số phòng: 15 ÷ 20 = 0,75. Chia ngược cho 133%, một tỷ lệ không thể vượt 100%. Lấy phòng trống cho 25% là tỷ lệ bỏ trống, còn 15% là nhầm số phòng với phần trăm.",
      ),
      q(
        "Vì sao không nên hỏi AI 'giá phòng tối ưu' rồi dùng luôn con số đó?",
        [
          "AI không biết khách của bạn nhạy giá tới đâu, con số đó là đoán",
          "AI không làm được các phép nhân chia nên bạn phải tự bấm máy tính mọi con số",
          "AI chỉ trả lời được khi bạn hỏi bằng tiếng Anh",
          "AI luôn đưa giá thấp hơn mức thị trường để khách vui",
        ],
        "Mức nhạy giá của khách bạn nằm trong số đêm bán của chính bạn, AI không thấy nó nếu bạn không đưa. AI làm được phép tính, chỉ không nên dùng nó thay số liệu thật. Nó hiểu tiếng Việt, và không có quy luật nào bắt nó đưa giá thấp.",
      ),
      q(
        "Nên đưa gì vào bảng thử giá để kết quả đáng tin?",
        [
          "Số đêm bán và giá thật, tách mùa vắng và mùa đông, kèm giả định của bạn",
          "Giá của các nơi khác mà bạn chỉ nhớ mang máng từ lần đi xem, không cần ghi nguồn",
          "Tên và số điện thoại khách đã ở, để AI đoán ai chịu giá cao",
          "Chỉ giá phòng, vì số phòng bán không ảnh hưởng doanh thu",
        ],
        "Bảng tốt bắt đầu từ số của bạn và giả định ghi rõ để sửa được. Giá nhớ mang máng không kiểm được. Thông tin cá nhân của khách không cần cho bài toán giá và không nên đưa vào công cụ chưa được duyệt. Thiếu số phòng bán thì không tính được doanh thu.",
      ),
    ],
    keyTakeaways: [
      "Doanh thu đêm = số phòng bán được × giá; giá lên thường làm số phòng bán xuống.",
      "Bảng thử giá đặt vài mức cạnh nhau để bạn nhìn thấy điểm cân bằng.",
      "Số đêm bán thật của bạn quan trọng hơn con số AI đưa ra.",
      "Giả định (giá tăng thì mất bao nhiêu phòng) phải ghi rõ để chỉnh được.",
      "Mùa vắng và mùa đông cần bảng riêng, đừng dùng chung một giá.",
    ],
    practicePrompt: {
      question:
        "Cơ sở 10 phòng, giá 1.000.000 đồng bán 8 phòng (8 triệu). Nếu giảm giá còn 900.000 đồng bán được 9 phòng, doanh thu đổi thế nào?",
      options: [
        "Giảm còn 8,1 triệu, chỉ thu thêm 100.000 dù bán thêm một phòng",
        "Tăng mạnh lên 9 triệu (9 × 1.000.000, dùng nhầm giá cũ)",
        "Giảm còn 7,2 triệu (8 × 900.000, dùng nhầm số phòng cũ)",
        "Không đổi, vì giảm giá thì phòng bán thêm bù đúng phần mất, vẫn 8 triệu",
      ],
      correct: 0,
      explanation:
        "Giá mới: 9 × 900.000 = 8.100.000, chỉ hơn 8.000.000 một chút, nên giảm giá ở đây gần như không lời thêm mà còn tốn thêm công dọn phòng. 9 triệu dùng giá cũ, 7,2 triệu dùng số phòng cũ, còn kết luận không đổi là chưa tính.",
    },
    summary: {
      keyIdea: "Thử giá bằng bảng chứ không bằng cảm giác: doanh thu là giá nhân số phòng bán được.",
      formula: "Doanh thu đêm = số phòng bán × giá; tỷ lệ lấp đầy = phòng bán ÷ tổng phòng.",
      commonMistake: "Chỉ nhìn phần thu thêm mỗi phòng mà quên số phòng bị mất khi giá tăng.",
      action: "Lấy số đêm bán mùa trước của bạn và dựng bảng thử ba mức giá.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy số đêm bán và giá của một tuần thật ở cơ sở của bạn (hoặc nơi bạn làm). Nhờ AI dựng bảng thử ba mức giá quanh giá hiện tại, ghi giả định 'tăng 100.000 thì mất bao nhiêu phòng' bằng con số bạn tự chọn. Xem mức nào doanh thu cao nhất và ghi lại một dòng lý do.",
      secondary: "Đánh dấu giả định nào bạn thấy chưa chắc để đối chiếu với số bán tuần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Năm chủ cơ sở nhắn: 'Mùa đông tới rồi, tăng giá đi.' Bạn cần một con số, không phải một cảm giác. Bài này dạy cách nhờ AI dựng bảng thử giá từ số của bạn, rồi tự đọc kết quả.",
      },
      {
        type: "feynman",
        title: "Thử giá đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới quầy bán trà đá ở cổng trường. Bán 3.000 đồng thì đông khách, bán 5.000 đồng thì vắng hơn nhưng mỗi ly lãi hơn. Chủ quầy không đoán mà thử vài ngày rồi đếm tiền. Bảng thử giá là cách thử đó trên giấy, trước khi thử thật.",
        columns: ["Việc", "Quầy trà đá", "Phòng khách sạn"],
        rows: [
          ["Giá thử", "3.000, 4.000, 5.000 đồng", "800.000, 900.000, 1.000.000 đồng"],
          ["Số khách", "Số ly bán được mỗi buổi", "Số phòng bán được mỗi đêm"],
          ["Tiền thu", "Giá × số ly", "Giá × số phòng"],
          ["Điều phải nhớ", "Giá cao thì ly bán ít đi", "Giá cao thì phòng trống nhiều hơn"],
        ],
        oneLiner: "Đừng hỏi giá nào 'đúng'; hãy đặt vài mức cạnh nhau và xem mức nào cho nhiều tiền nhất.",
      },
      { type: "heading", text: "Hai lực kéo ngược nhau" },
      {
        type: "paragraph",
        text: "Khi bạn tăng giá, mỗi phòng bán được thu thêm tiền. Nhưng cũng có khách chuyển sang nơi khác, nên số phòng bán được giảm. Doanh thu là kết quả của hai lực này. Vì thế một mức giá cao hơn chưa chắc cho nhiều tiền hơn, và bảng thử là cách nhìn cả hai lực cùng lúc.",
      },
      {
        type: "chart",
        title: "Doanh thu một đêm theo giá phòng",
        caption:
          "Số liệu minh hoạ, không phải số của cơ sở nào. Kéo thanh trượt để xem: khách càng nhạy giá thì điểm cao nhất của doanh thu càng dịch về mức giá thấp.",
        kind: "line",
        xLabel: "Giá một đêm (nghìn đồng)",
        yLabel: "Doanh thu một đêm (nghìn đồng)",
        x: { from: 500, to: 1500, step: 100 },
        params: [
          { id: "rooms", label: "Số phòng của cơ sở", min: 10, max: 40, step: 2, value: 20, unit: " phòng" },
          { id: "drop", label: "Mất bao nhiêu điểm lấp đầy mỗi lần tăng 100 nghìn", min: 2, max: 12, step: 1, value: 6, unit: " điểm" },
        ],
        series: [{ label: "Doanh thu một đêm", expr: "rooms * max(0, min(100, 90 - drop * (x - 600) / 100)) / 100 * x" }],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng thử giá",
        task: "Bạn có 20 phòng, giá 800.000 đồng và số đêm bán của mùa trước. Lắp prompt để AI dựng bảng thử giá dùng được.",
        parts: [
          {
            id: "data",
            label: "Số liệu đưa vào",
            options: [
              { text: "Cơ sở tôi bán khá tốt vào mùa đông, hãy đề xuất giá hợp lý.", feedback: "Không có số nào, AI tự bịa tỷ lệ lấp đầy và trả về một mức giá nghe hợp lý nhưng không dựa vào khách của bạn." },
              { text: "20 phòng, giá hiện tại 800.000 đồng, mùa trước bán trung bình 15 phòng mỗi đêm (số tôi lấy từ sổ đặt phòng).", good: true, feedback: "Có số thật để tính, AI không phải đoán nền của bảng." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Cho tôi biết giá phòng tốt nhất.", feedback: "Một con số duy nhất, không có gì để bạn đối chiếu hay chỉnh. Bạn chỉ có thể tin hoặc không tin." },
              { text: "Dựng bảng 4 mức giá (800, 900, 1.000, 1.100 nghìn) gồm: số phòng bán dự kiến, tỷ lệ lấp đầy, doanh thu một đêm.", good: true, feedback: "Bảng có cột rõ ràng, bạn nhìn cạnh nhau và tự chọn." },
            ],
          },
          {
            id: "assume",
            label: "Giả định",
            options: [
              { text: "Không cần nêu, AI biết khách thường phản ứng thế nào.", feedback: "AI đưa vào giả định ngầm mà bạn không thấy, nên bảng trông chắc chắn nhưng không kiểm được." },
              { text: "Giả định mỗi lần tăng 100.000 đồng thì mất 2 phòng; ghi rõ giả định ở đầu bảng để tôi tự chỉnh.", good: true, feedback: "Giả định nằm ngay trên bảng, bạn sửa con số là bảng đổi theo." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "assume"],
            text: "Giả định: mỗi +100.000 đồng thì mất 2 phòng.\n\nGiá 800.000: bán 15 phòng, lấp đầy 75%, doanh thu 12.000.000.\nGiá 900.000: bán 13 phòng, lấp đầy 65%, doanh thu 11.700.000.\nGiá 1.000.000: bán 11 phòng, lấp đầy 55%, doanh thu 11.000.000.\nGiá 1.100.000: bán 9 phòng, lấp đầy 45%, doanh thu 9.900.000.\n\nVới giả định này, giữ 800.000 cho doanh thu cao nhất. Nếu khách bớt nhạy giá (mất 1 phòng mỗi bậc), hãy sửa giả định và tính lại.",
          },
          {
            requires: ["data"],
            text: "Dựa trên 15 phòng bán mỗi đêm, tôi đề xuất giá 950.000 đồng, tỷ lệ lấp đầy khoảng 82% và doanh thu tăng 14%.\n\n(Con số 82% và 14% không có nguồn: AI tự thêm, bạn không kiểm được nó tính ra từ đâu.)",
          },
          {
            text: "Giá phòng tốt nhất là 1.200.000 đồng vì đây là mùa cao điểm và khách sẵn sàng chi nhiều hơn.\n\n(Không có số liệu nào của bạn: câu trả lời chỉ là ý kiến chung.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng thử vài mức giá",
          text: "Có số phòng bán, lấp đầy và doanh thu cạnh nhau. Giả định nằm trên bảng để sửa. Bạn tự nhìn ra mức nào lời nhất và vì sao.",
        },
        right: {
          label: "Hỏi một con số giá tốt nhất",
          text: "Chỉ nhận về một mức giá, không thấy lý do. Giả định ngầm của AI không kiểm được. Khi sai, bạn không biết sai ở đâu.",
        },
      },
      {
        type: "callout",
        label: "Mùa vắng khác mùa đông",
        text: "Mùa vắng, mục tiêu thường là lấp phòng trống vì phòng trống thì không thu được đồng nào. Mùa đông, mục tiêu là đừng bán rẻ những phòng chắc chắn sẽ bán được. Dựng hai bảng riêng. Quyết định cuối cùng về giá là của chủ cơ sở và người quản lý; AI chỉ giúp bạn nhìn rõ số.",
      },
      {
        type: "scenario",
        title: "Chủ cơ sở muốn tăng giá ngay",
        start: "s1",
        nodes: {
          s1: {
            text: "Chủ cơ sở bảo: 'Tăng lên 1.000.000 đồng cho mùa đông.' Bạn đang có số đêm bán của mùa trước.",
            choices: [
              { label: "Đồng ý luôn vì chủ đã quyết", next: "bad_blind" },
              { label: "Xin vài phút, dựng bảng thử 3 mức giá từ số đêm bán thật", next: "s2" },
            ],
          },
          bad_blind: {
            text: "Giá lên, nhưng cuối tuần đầu chỉ bán được 9 phòng thay vì 15. Doanh thu thấp hơn tuần trước dù giá cao hơn, và không ai biết vì sao.",
            ending: "bad",
          },
          s2: {
            text: "Bảng cho thấy 900.000 đồng cho doanh thu hơi cao hơn 800.000, còn 1.000.000 đồng thì thấp hơn. Bạn báo lại cho chủ.",
            choices: [
              { label: "Đề nghị thử 900.000 đồng hai tuần, rồi đối chiếu số bán thật với bảng", next: "good" },
              { label: "Nói AI tính ra 1.000.000 đồng là tối ưu để chủ yên tâm", next: "bad_lie" },
            ],
          },
          bad_lie: {
            text: "Chủ tin, áp dụng 1.000.000 đồng và sau đó phát hiện bảng không hề nói vậy. Từ đó chủ không còn tin các con số bạn đưa.",
            ending: "bad",
          },
          good: {
            text: "Hai tuần sau số bán thật gần với bảng, và bạn chỉnh giả định cho lần sau. Chủ thấy quyết định có căn cứ.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Lấy số đêm bán và giá của mùa trước từ sổ của bạn.",
          "Bước 2 - Nhờ AI dựng bảng 3-4 mức giá, ghi rõ giả định.",
          "Bước 3 - Tự đọc doanh thu và tỷ lệ lấp đầy, chọn mức và ghi một dòng lý do.",
          "Bước 4 - Sau hai tuần, đối chiếu số bán thật với bảng rồi chỉnh.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Giá thử trên giấy trước, rồi mới thử ngoài đời.",
          "Bài sau: bảng tính giá tour có thể thiếu khoản chi mà không ai nhận ra.",
        ],
      },
    ],
  },
  {
    id: 2111,
    slug: "soat-bang-tinh-gia-tour",
    title: "Chặng 35, Bài 12: Bảng tính giá tour có dòng chi phí bị bỏ sót",
    subtitle: "Bảng đẹp mà thiếu ba khoản chi thì lãi trên giấy chỉ là lãi tưởng tượng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn nhờ AI tính giá một tour 10 khách và nó trả về bảng gọn gàng, lãi trông rất đẹp. Nhưng nếu bảng bỏ sót phí vào cổng, tiền tip hay xe đón, bạn báo giá thấp hơn cần thiết và bán một tour lỗ mà không biết. Bài này tập soi từng dòng chi phí trước khi báo giá.",
    openingQuestion:
      "AI trả về bảng giá vốn tour 10 khách trông rất đầy đủ và tính ra lãi 2,3 triệu. Bạn nên làm gì trước khi báo giá cho khách?",
    openingOptions: [
      "Đối chiếu từng dòng bảng với danh sách chi phí thật của tour",
      "Báo giá luôn, vì bảng có tổng và có phép tính rất rõ ràng",
      "Nhờ AI tính lại một lần nữa cho cùng bảng đó xem có khớp, vì hai lần ra cùng số là đủ tin",
      "Cộng thêm 10% vào giá vốn cho chắc mà không cần soát bảng",
    ],
    correctOption: 0,
    explanation:
      "Lỗi hay gặp nhất của bảng giá tour không nằm ở phép cộng mà ở dòng chi phí không được nhắc tới. Bảng có tổng rõ ràng vẫn có thể thiếu vé vào cổng, tiền tip hay xe đón. Chỉ đối chiếu với danh sách chi phí thật của bạn mới lộ chỗ thiếu. Nhờ AI tính lại thì nó tính lại đúng cái bảng thiếu đó. Cộng thêm 10% là đoán, có thể vẫn chưa đủ.",
    diagram: [
      { label: "Liệt kê mọi khoản chi thật của tour từ hợp đồng, hoá đơn", arrow: true },
      { label: "Nhờ AI dựng bảng giá vốn theo danh sách đó", arrow: true },
      { label: "Đối chiếu từng dòng: khoản nào có trong danh sách mà thiếu trong bảng", arrow: true },
      { label: "Tính lại giá vốn mỗi khách và lãi rồi mới báo giá" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên điều hành tour nhờ AI tính giá tour 10 khách. Bảng ghi xe, hướng dẫn viên và ăn trưa nhưng thiếu vé vào cổng, tiền tip và xe đón sân bay. Nhờ đối chiếu với danh sách hoá đơn của tour trước, cô thấy lãi thật chỉ còn 400.000 đồng chứ không phải 2,3 triệu, và nâng giá bán trước khi gửi khách. Số liệu chỉ để minh hoạ.",
    },
    quiz: [
      q(
        "Bảng giá tour có tổng cộng rõ ràng và đúng phép cộng thì có thể báo giá chưa?",
        [
          "Chưa, cần kiểm bảng có đủ mọi khoản chi thật của tour hay chưa",
          "Rồi, vì phép cộng đã đúng thì tổng chắc chắn đúng và không cần soát thêm gì nữa",
          "Rồi, vì AI đã tự kiểm mọi dòng chi phí của tour trước khi trình bày bảng cho bạn",
          "Chưa, vì bảng giá tour chỉ có giá trị khi in ra giấy",
        ],
        "Cộng đúng các dòng có trong bảng vẫn cho tổng thiếu nếu bảng bỏ sót khoản chi. AI không có danh sách chi phí thật của bạn để so sánh. Còn giấy hay màn hình không liên quan tới độ đúng của con số.",
      ),
      q(
        "Tour 10 khách: xe 3,2 triệu, hướng dẫn viên 1 triệu, xe đón 400.000 đồng, ăn 250.000 đồng/khách, vé cổng 120.000 đồng/khách, tip 30.000 đồng/khách. Tổng giá vốn là bao nhiêu?",
        [
          "8,6 triệu (4,6 triệu cố định + 400.000 × 10 khách)",
          "6,7 triệu (bảng của AI, đã bỏ vé cổng, tip và xe đón ra khỏi tổng)",
          "4,6 triệu (chỉ tính khoản cố định, bỏ phần theo đầu khách)",
          "10,5 triệu (tính thêm 190.000 × 10, nhân đôi vé và tip)",
        ],
        "Cố định: 3.200.000 + 1.000.000 + 400.000 = 4.600.000. Theo đầu khách: 250.000 + 120.000 + 30.000 = 400.000, nhân 10 là 4.000.000. Tổng 8.600.000. 6,7 triệu là bảng thiếu ba khoản, 4,6 triệu chỉ có phần cố định, còn 10,5 triệu cộng trùng.",
      ),
      q(
        "Giá bán 900.000 đồng/khách, 10 khách, giá vốn thật 8,6 triệu. Lãi là bao nhiêu?",
        [
          "400.000 đồng",
          "2,3 triệu đồng (9 triệu trừ 6,7 triệu của bảng thiếu)",
          "9 triệu đồng (chưa trừ giá vốn nào)",
          "17,6 triệu đồng (9 triệu cộng 8,6 triệu, sai dấu)",
        ],
        "Lãi là doanh thu trừ giá vốn: 10 × 900.000 = 9.000.000, trừ 8.600.000 còn 400.000 đồng. Lấy 6,7 triệu là dùng lại bảng thiếu. 9 triệu là doanh thu, chưa phải lãi, và cộng hai số thay vì trừ cho kết quả vô lý.",
      ),
      q(
        "Vì sao giá vốn mỗi khách giảm khi đoàn đông hơn?",
        [
          "Khoản cố định như xe và hướng dẫn viên được chia cho nhiều người hơn",
          "Vì mỗi khách thêm vào thì nhà cung cấp tự giảm mọi loại phí",
          "Vì AI tự động tính lại giá vốn thấp hơn khi số khách tăng",
          "Vì khách đi đông thì ăn ít hơn và không cần tiền tip",
        ],
        "Xe và hướng dẫn viên tốn như nhau dù 8 hay 20 người, nên chia cho nhiều người thì phần mỗi người giảm. Khoản theo đầu khách như ăn và vé thì không giảm. Nhà cung cấp không tự giảm phí, AI chỉ tính theo số bạn đưa, và tip vẫn tính theo khách.",
      ),
      q(
        "Cách nào giúp AI ít bỏ sót khoản chi khi dựng bảng giá vốn?",
        [
          "Đưa danh sách khoản chi thật và bảo nó chỉ dùng các khoản đó",
          "Bảo nó 'tính đầy đủ mọi chi phí có thể có của một tour du lịch'",
          "Không đưa danh sách để nó tự nhớ các khoản chi thông dụng",
          "Cho nó xem bảng giá của tour công ty khác để bắt chước",
        ],
        "Danh sách khoản chi của chính bạn là nguồn để AI tính và để bạn đối chiếu. Yêu cầu 'đầy đủ mọi chi phí có thể có' khiến AI thêm khoản không tồn tại. Không đưa danh sách thì nó chọn theo thói quen chung. Bảng của tour khác có khoản chi khác.",
      ),
    ],
    keyTakeaways: [
      "Bảng cộng đúng vẫn có thể thiếu dòng chi phí; lỗi nằm ở cái không được nhắc.",
      "Đối chiếu bảng với danh sách chi phí thật (hợp đồng, hoá đơn) từng dòng.",
      "Khoản cố định chia cho số khách; khoản theo đầu khách thì không đổi mỗi người.",
      "Lãi = doanh thu trừ giá vốn đầy đủ, không trừ giá vốn của bảng thiếu.",
      "Giao AI danh sách khoản chi thật thay vì bảo nó tự nhớ.",
    ],
    practicePrompt: {
      question:
        "Bảng AI ghi giá vốn tour 6 khách là 5 triệu. Danh sách thật của bạn có thêm tip 40.000 đồng/khách và vé 100.000 đồng/khách mà bảng bỏ qua. Giá vốn đúng là bao nhiêu?",
      options: [
        "5,84 triệu (5 triệu + 140.000 × 6 khách)",
        "5,14 triệu (5 triệu + 140.000, chỉ cộng cho một khách)",
        "5 triệu, vì bảng của AI đã tính sẵn mọi khoản cần thiết",
        "4,16 triệu (5 triệu trừ 140.000 × 6, sai dấu)",
      ],
      correct: 0,
      explanation:
        "Thêm 40.000 + 100.000 = 140.000 đồng mỗi khách, nhân 6 khách là 840.000, nên giá vốn 5.840.000. Cộng một lần cho một khách chỉ ra 5,14 triệu. Giữ nguyên 5 triệu là tin bảng thiếu, còn trừ thay vì cộng ra số nhỏ hơn cả bảng ban đầu.",
    },
    summary: {
      keyIdea: "Giá tour chỉ đúng khi bảng đủ mọi khoản chi; phần thiếu thường là phần không ai nhắc tới.",
      formula: "Giá vốn = khoản cố định + (khoản theo đầu khách × số khách); lãi = doanh thu - giá vốn.",
      commonMistake: "Tin bảng vì phép cộng đúng, trong khi vé vào cổng, tip hoặc xe đón đã bị bỏ sót.",
      action: "Lấy danh sách chi phí của một tour thật và soi bảng AI từng dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tour hoặc chuyến đi bạn đã bán (hoặc một chuyến giả định của nhóm bạn). Liệt kê mọi khoản chi từ hoá đơn, chia thành cố định và theo đầu khách. Nhờ AI dựng bảng giá vốn theo danh sách đó, rồi đối chiếu từng dòng và tính lại lãi bằng tay.",
      secondary: "Ghi lại khoản nào dễ bị quên nhất ở loại tour của bạn để làm danh sách mẫu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng giá tour do AI làm thường trông rất chỉn chu, và chính vẻ chỉn chu đó khiến ta bớt soát. Bài này dạy cách soi từng dòng để tìm khoản chi bị bỏ sót trước khi báo giá cho khách.",
      },
      {
        type: "feynman",
        title: "Soát bảng giá tour đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc đi chợ về rồi đối chiếu hoá đơn với giỏ đồ. Hoá đơn có thể cộng đúng từng món mà vẫn thiếu một món bạn đã mua. Muốn biết, bạn phải nhìn giỏ, không chỉ nhìn tờ hoá đơn.",
        columns: ["Việc", "Đi chợ", "Bảng giá tour"],
        rows: [
          ["Thứ cần đối chiếu", "Giỏ đồ thật", "Danh sách chi phí thật của tour"],
          ["Cái dễ thiếu", "Món mua thêm cuối cùng", "Vé vào cổng, tiền tip, xe đón"],
          ["Kiểm phép cộng", "Cộng lại các món trên hoá đơn", "Cộng lại các dòng trong bảng"],
          ["Cái phép cộng không thấy", "Món không có trên hoá đơn", "Khoản chi không có trong bảng"],
        ],
        oneLiner: "Phép cộng đúng chưa đủ; hãy hỏi bảng có đủ mọi khoản đã tiêu thật hay không.",
      },
      { type: "heading", text: "Hai loại chi phí cần tách riêng" },
      {
        type: "paragraph",
        text: "Chi phí cố định là khoản tốn như nhau dù đoàn 8 hay 20 người: thuê xe, hướng dẫn viên, xe đón. Chi phí theo đầu khách là khoản tăng theo số người: ăn, vé vào cổng, tiền tip. Tách hai loại giúp bạn thấy vì sao đoàn đông thì giá vốn mỗi người giảm, và vì sao đoàn ít người dễ lỗ.",
      },
      {
        type: "chart",
        title: "Giá vốn mỗi khách theo số khách",
        caption:
          "Số liệu minh hoạ. Đường trên là giá vốn đủ khoản; đường dưới là giá vốn của bảng thiếu (bỏ qua một phần chi theo đầu khách). Kéo thanh trượt để thấy khoảng chênh.",
        kind: "line",
        xLabel: "Số khách trong đoàn",
        yLabel: "Giá vốn mỗi khách (nghìn đồng)",
        x: { from: 4, to: 30, step: 2 },
        params: [
          { id: "fixed", label: "Chi phí cố định của tour", min: 2000, max: 8000, step: 200, value: 4600, unit: " nghìn" },
          { id: "var", label: "Chi phí theo đầu khách", min: 200, max: 700, step: 20, value: 400, unit: " nghìn" },
          { id: "miss", label: "Khoản bảng bỏ sót mỗi khách", min: 0, max: 200, step: 10, value: 150, unit: " nghìn" },
        ],
        series: [
          { label: "Giá vốn đủ khoản", expr: "fixed / x + var" },
          { label: "Giá vốn của bảng thiếu", expr: "fixed / x + var - miss" },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng giá vốn tour AI vừa tính",
        task: "Dữ liệu thật của bạn: xe 3.200.000 đ, hướng dẫn viên 1.000.000 đ, xe đón 400.000 đ (cố định); ăn 250.000 đ, vé cổng 120.000 đ, tip 30.000 đ mỗi khách; 10 khách, giá bán 900.000 đ/khách. Đánh dấu những dòng AI làm sai.",
        segments: [
          { text: "Tour 10 khách có xe 3.200.000 đồng và hướng dẫn viên 1.000.000 đồng." },
          { text: "Ăn trưa 250.000 đồng mỗi khách, tổng cộng 2.500.000 đồng." },
          { text: "Vé vào cổng, tiền tip và xe đón không cần tính vì thường nhà cung cấp đã gồm sẵn.", error: "Dữ liệu của bạn ghi rõ ba khoản này là chi phí thật. 'Thường đã gồm sẵn' là AI tự đoán, không có nguồn nào cho tour của bạn." },
          { text: "Tổng giá vốn là 6.700.000 đồng.", error: "Thiếu vé cổng 1.200.000, tip 300.000 và xe đón 400.000, tổng 1.900.000. Giá vốn đúng là 8.600.000 đồng." },
          { text: "Doanh thu là 10 × 900.000 = 9.000.000 đồng." },
          { text: "Lãi là 2.300.000 đồng, biên lãi cao hơn mức thường thấy của ngành tour.", error: "Lãi thật là 9.000.000 - 8.600.000 = 400.000 đồng. Câu 'cao hơn mức thường thấy của ngành' là AI thêm vào, không có số liệu để kiểm." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng dựng từ danh sách chi thật",
          text: "Mỗi dòng truy ra được một hoá đơn hoặc hợp đồng. Thiếu khoản nào bạn thấy ngay khi đối chiếu. Lãi tính ra sát với thực tế.",
        },
        right: {
          label: "Bảng AI tự nhớ các khoản chi",
          text: "Có thể thiếu khoản chỉ có ở tour của bạn. Có thể thêm khoản không hề có. Lãi trông đẹp nhưng không ai truy ra từ đâu.",
        },
      },
      {
        type: "callout",
        label: "Chuyện thuế và hợp đồng",
        text: "Bảng này chỉ tính giá vốn và lãi thô. Phần thuế, hoá đơn và điều khoản với nhà cung cấp hãy hỏi kế toán trưởng hoặc bộ phận pháp chế trước khi đưa vào báo giá.",
      },
      {
        type: "scenario",
        title: "Trước khi gửi báo giá cho đoàn 10 khách",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa bảng giá vốn 6,7 triệu, lãi 2,3 triệu. Khách đang chờ báo giá trong một giờ.",
            choices: [
              { label: "Gửi báo giá ngay theo bảng của AI", next: "bad_send" },
              { label: "Đối chiếu bảng với danh sách hoá đơn của tour trước", next: "s2" },
            ],
          },
          bad_send: {
            text: "Khách chốt tour. Khi quyết toán, giá vốn thật là 8,6 triệu và lãi chỉ 400.000 đồng, chưa kể công điều hành.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy bảng thiếu vé cổng, tip và xe đón. Lãi thật chỉ 400.000 đồng.",
            choices: [
              { label: "Tính lại giá bán theo giá vốn đủ khoản rồi mới báo", next: "good" },
              { label: "Giữ giá cũ và hy vọng khách sẽ tự bù các khoản kia", next: "bad_hope" },
            ],
          },
          bad_hope: {
            text: "Khách không bù gì cả. Tour chạy đúng như bảng thiếu và bạn gánh phần chênh.",
            ending: "bad",
          },
          good: {
            text: "Bạn báo giá mới có đủ khoản, khách chấp nhận. Bảng danh sách chi phí được lưu làm mẫu cho tour sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê mọi khoản chi thật, chia cố định và theo đầu khách.",
          "Bước 2 - Nhờ AI dựng bảng theo đúng danh sách đó, cấm thêm khoản khác.",
          "Bước 3 - Đối chiếu từng dòng, tính lại giá vốn và lãi bằng tay.",
          "Bước 4 - Lưu danh sách làm mẫu cho tour sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảng đẹp là chuyện của AI; bảng đủ là chuyện của bạn.",
          "Bài sau: khách gửi ảnh giá bên khác và đòi bạn giảm.",
        ],
      },
    ],
  },
  {
    id: 2112,
    slug: "khach-doi-gia-vi-thay-noi-khac-re-hon",
    title: "Chặng 35, Bài 13: Khách đòi giảm vì thấy nơi khác rẻ hơn",
    subtitle: "Đừng hạ giá vội: so đúng thứ với đúng thứ, rồi nói về điều khách nhận được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách gửi ảnh chụp một nơi khác giá thấp hơn và hỏi thẳng: sao bên bạn đắt hơn? Hạ giá ngay thì lãi mất, còn cãi lại thì khách bỏ đi. Có cách thứ ba: xem hai bên có cùng thứ không, rồi nói rõ điều khách được. AI giúp bạn soạn câu trả lời, nhưng phải tự bạn biết mình có gì.",
    openingQuestion:
      "Khách nhắn: 'Chỗ khác cùng loại phòng chỉ 700.000 đồng, bên chị 850.000 đồng. Giảm đi thì tôi đặt.' Bạn nên làm gì đầu tiên?",
    openingOptions: [
      "Xem hai bên có thật sự giống nhau về những gì đi kèm",
      "Hạ ngay xuống 700.000 đồng để khách khỏi đi nơi khác",
      "Bảo khách rằng nơi kia chắc chắn tệ hơn nên không đáng tin",
      "Nhờ AI viết câu từ chối thật cứng rắn và không giải thích",
    ],
    correctOption: 0,
    explanation:
      "Hai mức giá chỉ so sánh được khi cùng một thứ: cùng ngày, cùng loại phòng, cùng điều kiện huỷ, có hay không bữa sáng, giờ nhận phòng, vị trí. Xem trước rồi mới nói giúp bạn trả lời đúng điều khách đang thấy. Hạ giá ngay mất lãi mà chưa biết khách có so sánh đúng không. Chê nơi kia là điều bạn không kiểm chứng được. Từ chối cứng thì khách cảm thấy bị đuổi, không được nghe.",
    diagram: [
      { label: "Đọc kỹ ảnh giá khách gửi: ngày, loại phòng, điều kiện", arrow: true },
      { label: "So từng mục với những gì bạn có thật", arrow: true },
      { label: "Nói điều khách nhận được, không chê nơi khác", arrow: true },
      { label: "Chỉ giảm nếu bạn (không phải AI) đã quyết và có điều kiện đổi lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một khách sạn nhỏ nhận tin khách so 700.000 đồng của nơi khác với 850.000 đồng của mình. Lễ tân xem ảnh thì thấy giá kia là phòng không bữa sáng, không được huỷ, còn phòng của khách sạn có bữa sáng và huỷ miễn phí đến hai ngày trước. Cô nêu đúng hai điểm khác đó, không chê nơi kia, và khách tự chọn. Số liệu chỉ để minh hoạ.",
    },
    quiz: [
      q(
        "Khách gửi ảnh giá rẻ hơn của nơi khác. Điều nào cần làm trước khi trả lời?",
        [
          "Kiểm xem hai giá có cùng ngày, cùng loại phòng và cùng điều kiện huỷ không",
          "Giảm giá ngay cho bằng nơi kia để khỏi mất khách, chuyện lãi tính sau",
          "Nhờ AI kết luận nơi kia có phải lừa đảo không",
          "Trả lời ngay rằng giá bên bạn không thể đổi",
        ],
        "Cùng ngày, cùng loại phòng, cùng điều kiện huỷ, có bữa sáng hay không mới là so sánh công bằng. Giảm ngay là mất lãi khi chưa biết khách so đúng chưa. AI không kiểm được một trang giá bên ngoài mà bạn chưa đưa, và nói chắc chắn không đổi giá thì đóng cửa với cả khách chỉ hiểu nhầm.",
      ),
      q(
        "Câu nào giúp giữ khách mà không chê nơi khác?",
        [
          "Giá bên em gồm bữa sáng và huỷ miễn phí đến hai ngày trước, anh/chị so giúp em nhé",
          "Nơi đó rẻ vì phòng cũ và phục vụ kém nên anh/chị đừng tin vào giá rẻ đó",
          "Giá em đã là rẻ nhất trong khu vực này rồi, anh/chị đi so thêm nơi nào khác cũng sẽ thấy đúng như vậy thôi ạ",
          "Nếu thấy rẻ thì anh/chị cứ đặt bên đó",
        ],
        "Nêu những gì khách nhận được, kèm lời mời so lại, vừa thật vừa mở cho khách chọn. Chê nơi khác là điều bạn không kiểm được và gây phản cảm. 'Rẻ nhất khu vực' là câu khó chứng minh. Còn bảo khách đi nơi khác là bỏ mất cuộc trò chuyện.",
      ),
      q(
        "Bạn quyết định giảm 50.000 đồng cho khách đặt 3 đêm. Điều gì nên đi kèm mức giảm?",
        [
          "Một điều kiện rõ ràng, như đặt trực tiếp và không đổi ngày",
          "Một lời hứa miệng rằng lần sau cũng giảm như thế",
          "Không điều kiện gì để khách thấy mình hào phóng",
          "Một mức giảm khác cho mỗi khách để khỏi ai so sánh",
        ],
        "Giảm giá đổi lấy điều kiện (đặt trực tiếp, số đêm, không đổi ngày) thì cơ sở vẫn giữ được lợi ích. Hứa lần sau cũng giảm là cam kết bạn chưa có quyền hứa. Không điều kiện thì mất lãi mà chẳng được gì. Giảm khác nhau cho từng khách dễ gây bất bình khi họ so lại.",
      ),
      q(
        "Nhờ AI soạn câu trả lời về giá, bạn nên đưa thêm điều gì?",
        [
          "Những gì phòng thật sự có và điều kiện huỷ, để AI không hứa thêm",
          "Chỉ ảnh giá của nơi kia và bảo AI thắng khách bằng mọi cách, bất kể phải hứa gì thêm",
          "Tên và số điện thoại khách để AI cá nhân hoá câu trả lời",
          "Không đưa gì, vì AI biết cơ sở của bạn có gì",
        ],
        "AI chỉ biết những gì bạn đưa. Nếu không nêu thứ có và điều kiện huỷ, nó dễ hứa bữa sáng, nâng hạng hay hoàn tiền mà cơ sở không có. Bảo thắng khách bằng mọi cách khiến nó dùng lời lẽ ép. Thông tin cá nhân của khách không cần cho việc soạn câu trả lời.",
      ),
      q(
        "AI viết: 'Chúng tôi sẽ hoàn tiền nếu chị không hài lòng.' Cơ sở của bạn chưa có chính sách đó. Nên làm gì?",
        [
          "Xoá câu đó hoặc thay bằng chính sách huỷ thật của cơ sở",
          "Giữ lại vì nghe thân thiện và khách sẽ yên tâm",
          "Giữ lại và chỉ áp dụng khi khách thật sự phàn nàn",
          "Bỏ chữ 'sẽ' để câu nghe bớt cam kết hơn một chút",
        ],
        "Cam kết hoàn tiền là điều chỉ cơ sở mới có quyền hứa; AI tự thêm nó nghe thân thiện nhưng bạn phải gánh. Áp dụng khi khách phàn nàn tức đã hứa thật. Bỏ một chữ cũng không thay đổi việc khách đọc đó là lời hứa. Cách đúng là chỉ nêu chính sách bạn có.",
      ),
    ],
    keyTakeaways: [
      "So giá chỉ đúng khi cùng ngày, loại phòng, điều kiện huỷ và những thứ đi kèm.",
      "Nêu điều khách nhận được, không chê nơi khác.",
      "Giảm giá thì đổi lấy điều kiện rõ ràng, do bạn quyết chứ không phải AI.",
      "Đưa AI những gì có thật để nó không hứa thêm.",
      "Câu trả lời soạn xong, bạn đọc từng lời hứa trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Khách so 700.000 đồng (phòng không bữa sáng, không huỷ được) với 850.000 đồng của bạn (có bữa sáng, huỷ miễn phí). Bạn nên trả lời theo hướng nào?",
      options: [
        "Nêu hai điểm khác: bữa sáng và huỷ miễn phí, rồi để khách chọn",
        "Nói phòng kia chắc chắn tệ nên khách đừng đặt",
        "Hạ đúng 150.000 đồng để bằng giá kia mà không hỏi khách cần gì thêm",
        "Im lặng vì khách sẽ tự hiểu vì sao giá cao hơn",
      ],
      correct: 0,
      explanation:
        "Hai giá khác nhau vì hai thứ khác nhau; nói ra đúng điều khác đó giúp khách so lại cho công bằng. Chê phòng kia không kiểm được, hạ đúng 150.000 mất lãi và bỏ qua giá trị, còn im lặng thì khách chỉ thấy con số.",
    },
    summary: {
      keyIdea: "Trước khi giảm giá, so đúng thứ với đúng thứ rồi nói điều khách nhận được.",
      formula: "So cùng ngày + cùng loại phòng + cùng điều kiện = mới đáng gọi là 'nơi khác rẻ hơn'.",
      commonMistake: "Hạ giá ngay theo ảnh khách gửi mà chưa xem hai bên có cùng thứ không.",
      action: "Viết ra ba điều đi kèm giá của bạn mà khách thường không để ý.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một lần khách đòi giảm vì thấy nơi khác rẻ hơn (hoặc tưởng tượng một lần). Liệt kê ba thứ đi kèm giá của bạn và điều kiện huỷ thật. Nhờ AI soạn câu trả lời dựa đúng danh sách đó, rồi gạch mọi lời hứa mà cơ sở của bạn chưa có.",
      secondary: "Lưu câu trả lời tốt nhất vào sổ tay để dùng lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách gửi ảnh giá của nơi khác và hỏi vì sao bên bạn đắt hơn. Bạn có hai lựa chọn dễ nhưng dở: hạ giá hoặc cãi lại. Bài này tập một cách thứ ba, qua một tình huống bạn tự chọn nhánh.",
      },
      {
        type: "feynman",
        title: "Trả lời khách đòi giảm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người khách hỏi quả cam ở quầy bên cạnh rẻ hơn. Người bán khéo sẽ hỏi lại: cam đó có vỏ mỏng, ngọt, mới hái không? Rồi mới nói cam của mình khác chỗ nào. Không chê quầy kia, không hạ giá liền.",
        columns: ["Việc", "Quầy cam", "Phòng khách sạn"],
        rows: [
          ["Cái khách thấy", "Giá một ký", "Giá một đêm"],
          ["Cái chưa thấy", "Cam ngọt hay chua", "Bữa sáng, điều kiện huỷ, vị trí"],
          ["Bước đầu", "Hỏi khách đang so loại cam nào", "Xem ảnh giá: ngày, loại phòng, điều kiện"],
          ["Bước hai", "Nói cam mình có gì", "Nói điều khách nhận được khi ở bên bạn"],
        ],
        oneLiner: "Giá chỉ là con số; điều khách nhận được mới là thứ đáng so sánh.",
      },
      { type: "heading", text: "Bốn thứ cần so trước khi trả lời" },
      {
        type: "list",
        items: [
          "Ngày ở và số đêm: giá hai bên có cùng ngày không.",
          "Loại phòng và sức chứa: cùng diện tích, cùng số người.",
          "Điều kiện huỷ và đổi: huỷ được không, đến khi nào.",
          "Những thứ đi kèm: bữa sáng, đưa đón, giờ nhận phòng sớm.",
        ],
      },
      {
        type: "flow",
        title: "Từ ảnh giá của khách tới câu trả lời",
        steps: [
          { label: "Đọc kỹ ảnh khách gửi", detail: "Tìm ngày, loại phòng, điều kiện huỷ và phần ghi nhỏ. Giá rẻ nhất thường đi kèm điều kiện chặt nhất." },
          { label: "So với những gì bạn có", detail: "Đặt hai cột cạnh nhau, ghi cả điểm yếu của bạn, không giấu." },
          { label: "Nhờ AI soạn câu trả lời", detail: "Đưa AI danh sách những gì bạn có thật; bảo nó không hứa thêm điều gì ngoài danh sách." },
          { label: "Đọc từng lời hứa", detail: "Mọi câu có 'sẽ', 'đảm bảo', 'hoàn tiền' bạn phải kiểm với chính sách của cơ sở." },
          { label: "Gửi và ghi lại kết quả", detail: "Khách đặt hay không, để lần sau biết cách nói nào hiệu quả." },
        ],
      },
      {
        type: "scenario",
        title: "Ảnh giá 700.000 đồng và câu hỏi thẳng",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách nhắn: 'Chỗ khác cùng phòng đôi 700.000 đồng, bên chị 850.000 đồng. Giảm đi thì tôi đặt ngay.' Bạn mở ảnh và thấy giá kia ghi nhỏ: 'không bữa sáng, không hoàn huỷ'.",
            choices: [
              { label: "Hạ ngay xuống 700.000 đồng", next: "bad_cut" },
              { label: "Nêu hai điểm khác: bữa sáng và huỷ miễn phí, rồi để khách chọn", next: "s2" },
              { label: "Nói nơi kia chắc là phòng tệ nên mới rẻ", next: "bad_diss" },
            ],
          },
          bad_cut: {
            text: "Khách đặt, nhưng bạn mất 150.000 đồng mỗi đêm và khách cũng chưa biết gì về bữa sáng hay chính sách huỷ. Lần sau họ lại đòi giảm.",
            ending: "bad",
          },
          bad_diss: {
            text: "Khách thấy bạn nói xấu người khác mà không có bằng chứng, và họ không đọc phần ghi nhỏ nên vẫn tin giá kia rẻ hơn. Họ đặt bên kia.",
            ending: "bad",
          },
          s2: {
            text: "Khách trả lời: 'Bữa sáng bên chị gồm những gì? Tôi đặt 3 đêm được giảm không?'",
            choices: [
              { label: "Nêu bữa sáng thật, rồi đề nghị giảm nhẹ cho 3 đêm nếu đặt trực tiếp, sau khi hỏi chủ", next: "good" },
              { label: "Hứa giảm 200.000 đồng mỗi đêm để chốt nhanh, khỏi hỏi chủ", next: "bad_promise" },
            ],
          },
          bad_promise: {
            text: "Bạn hứa quá quyền. Chủ không đồng ý mức đó, và bạn phải nhắn lại rút lời hứa với khách; khách bực và huỷ.",
            ending: "bad",
          },
          good: {
            text: "Khách hiểu vì sao giá khác nhau, đặt 3 đêm với mức giảm chủ đã đồng ý. Bạn lưu câu trả lời vào sổ tay.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Trả lời bằng điều khách nhận được",
          text: "Khách thấy hai bên khác nhau ở đâu. Bạn giữ được giá hoặc chỉ giảm có điều kiện. Không chê ai, nên khách vẫn tôn trọng bạn.",
        },
        right: {
          label: "Trả lời bằng cách hạ giá ngay",
          text: "Mất lãi ngay lập tức. Khách học được rằng cứ đòi là được giảm. Điều bạn có mà nơi kia không thì không ai nhắc tới.",
        },
      },
      {
        type: "callout",
        label: "Việc chỉ chủ mới được quyết",
        text: "Mức giảm, hoàn tiền, nâng hạng phòng miễn phí là quyết định của chủ cơ sở hoặc người quản lý. AI có thể soạn câu chữ, nhưng nếu bạn chưa được giao quyền, hãy nói 'em xin phép hỏi lại và báo anh/chị trong 15 phút' thay vì hứa.",
      },
      {
        type: "closing",
        lines: [
          "Giá là con số, giá trị là điều khách nhận được.",
          "Bài sau: đọc hàng chục đánh giá để tìm ba việc sửa được trong tuần.",
        ],
      },
    ],
  },
  {
    id: 2113,
    slug: "doc-danh-gia-khach-san-de-tim-viec-can-sua",
    title: "Chặng 35, Bài 14: Đọc đánh giá của khách để tìm việc cần sửa trước",
    subtitle: "Bốn mươi đánh giá là bốn mươi câu chuyện; gom theo chủ đề rồi chọn việc sửa được trong tuần.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⭐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hàng chục đánh giá dồn về trong tháng, có người khen, người chê, người viết dài dòng. Đọc hết rồi chọn việc sửa thì mất cả buổi, còn không đọc thì cứ lặp lại lỗi cũ. Nhờ AI gom theo chủ đề, bạn thấy chủ đề nào lặp nhiều nhất rồi chọn ba việc làm được ngay trong tuần.",
    openingQuestion:
      "Bạn có 40 đánh giá của khách trong tháng và một tuần để sửa vài điều. Cách nào giúp chọn việc sửa hợp lý nhất?",
    openingOptions: [
      "Gom đánh giá theo chủ đề, đếm số lần lặp rồi chọn việc sửa được",
      "Sửa ngay điều của đánh giá gay gắt nhất vì nó nghe nghiêm trọng nhất",
      "Nhờ AI cho biết cơ sở tệ ở đâu rồi làm theo mọi điều nó nói",
      "Đọc năm đánh giá gần nhất và sửa các điều trong đó",
    ],
    correctOption: 0,
    explanation:
      "Điều đáng sửa là điều nhiều khách nhắc và bạn làm được, không phải điều được viết gay gắt nhất. Gom theo chủ đề và đếm số lần cho thấy vấn đề lặp lại. Chọn việc trong tầm tay giúp có kết quả trong tuần, còn chuyện ngoài tầm như tiếng ồn từ đường phố thì ghi nhận nhưng chưa xử lý được. Chỉ đọc năm đánh giá gần nhất là mẫu quá nhỏ. AI tóm tắt được nhưng bạn mới biết việc nào làm nổi.",
    diagram: [
      { label: "Gom 30-50 đánh giá thật của cơ sở vào một chỗ", arrow: true },
      { label: "Nhờ AI gom theo chủ đề, mỗi chủ đề kèm câu trích", arrow: true },
      { label: "Bạn đếm số lần, đối chiếu với đánh giá gốc", arrow: true },
      { label: "Chọn 3 việc sửa được trong tuần, bỏ qua việc ngoài tầm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một khách sạn nhỏ nhờ AI gom 40 đánh giá của tháng. Kết quả có ba chủ đề lặp lại: nước nóng chậm, bữa sáng hết sớm và chỉ dẫn đường vào khó tìm. Quản lý chọn làm ba việc trong tuần: đặt lịch kiểm bình nóng lạnh, thêm khay bữa sáng lúc 8 giờ và gửi ảnh chỉ đường trong tin xác nhận đặt phòng. Tiếng ồn ngoài phố được ghi nhận nhưng để riêng vì ngoài tầm. Số liệu chỉ để minh hoạ.",
    },
    quiz: [
      q(
        "Điều gì cho biết một vấn đề đáng sửa trước trong hàng chục đánh giá?",
        [
          "Nhiều khách khác nhau nhắc tới và bạn có thể làm được ngay",
          "Đánh giá viết gay gắt nhất",
          "Đánh giá mới nhất trong danh sách",
          "Đánh giá của khách có nhiều lượt thích nhất",
        ],
        "Một vấn đề lặp lại ở nhiều khách và nằm trong tầm tay là ứng viên tốt nhất. Đánh giá gay gắt hay mới nhất có thể chỉ là một trường hợp. Lượt thích cho thấy nhiều người đọc, không cho thấy nhiều khách gặp cùng vấn đề.",
      ),
      q(
        "AI gom đánh giá thành 5 chủ đề nhưng chủ đề 'thái độ lễ tân' không kèm câu trích nào. Bạn nên làm gì?",
        [
          "Yêu cầu AI trích nguyên văn câu của khách cho từng chủ đề rồi đối chiếu bản gốc",
          "Tin chủ đề đó vì AI đã đọc hết mọi đánh giá",
          "Xoá chủ đề đó khỏi danh sách vì không có trích dẫn thì coi như AI đã nghĩ ra nó, khỏi mất công kiểm",
          "Nhờ AI viết thêm vài câu trích giả cho đủ bộ",
        ],
        "Câu trích nguyên văn cho phép bạn kiểm chủ đề có thật hay do AI suy ra. Tin luôn là bỏ qua khả năng AI gộp nhầm. Xoá luôn chủ đề có thể bỏ sót vấn đề thật. Viết trích giả là bịa lời khách, nguy hiểm nhất.",
      ),
      q(
        "Trong 40 đánh giá, 14 nhắc nước nóng chậm, 9 nhắc bữa sáng hết sớm, 3 nhắc tiếng ồn ngoài phố. Chủ đề nào chiếm tỷ lệ cao nhất?",
        [
          "Nước nóng chậm, 14 ÷ 40 = 35%",
          "Bữa sáng hết sớm, 9 ÷ 40 = 22,5%",
          "Tiếng ồn ngoài phố, 3 ÷ 40 = 7,5%",
          "Nước nóng chậm, 14 ÷ 23 = 61% (chia cho tổng ba chủ đề, không phải 40)",
        ],
        "Chia mỗi chủ đề cho tổng số đánh giá: 14 ÷ 40 = 35%, cao nhất. Bữa sáng 22,5% và tiếng ồn 7,5% thấp hơn. Cách chia cho 23 là chia cho tổng các chủ đề, sai vì một đánh giá có thể không thuộc chủ đề nào và mẫu số phải là toàn bộ đánh giá.",
      ),
      q(
        "Đánh giá phàn nàn về tiếng ồn của xe cộ ngoài phố. Nên xử lý thế nào?",
        [
          "Ghi nhận và tìm việc trong tầm, như nhắc trước hoặc phát nút bịt tai",
          "Bỏ qua hoàn toàn vì cơ sở không kiểm soát được tiếng xe ngoài phố, sửa gì cũng vô ích",
          "Hứa với khách sẽ dẹp hết tiếng ồn quanh khu vực",
          "Nhờ AI viết phản hồi bảo khách là phòng rất yên tĩnh",
        ],
        "Điều ngoài tầm vẫn có phần nhỏ trong tầm, như báo khách trước và hỗ trợ. Bỏ qua hẳn thì khách sau vẫn ngạc nhiên. Hứa dẹp tiếng ồn là hứa điều không làm được. Bảo phòng rất yên tĩnh trái với điều khách vừa viết.",
      ),
      q(
        "Trả lời một đánh giá chê, câu nào phù hợp nhất?",
        [
          "Cảm ơn anh đã góp ý về nước nóng; chúng tôi đang kiểm lại và sẽ báo bạn khi xong",
          "Chúng tôi rất tiếc, anh hiểu nhầm rồi",
          "Chúng tôi sẽ bồi thường đầy đủ cho mọi bất tiện và hoàn lại toàn bộ tiền phòng của anh",
          "Cảm ơn anh, chúng tôi luôn làm rất tốt mọi mặt",
        ],
        "Cảm ơn, gọi đúng vấn đề và hứa điều có thể làm là cách trả lời đọc được và thật. Bảo khách hiểu nhầm là đổ lỗi. Bồi thường đầy đủ là cam kết cơ sở chưa duyệt. Nói luôn làm tốt mọi mặt phủ nhận điều khách đã trải qua.",
      ),
    ],
    keyTakeaways: [
      "Gom theo chủ đề, đếm số lần, rồi mới chọn việc sửa.",
      "Đòi AI trích nguyên văn câu của khách cho từng chủ đề.",
      "Chọn ba việc sửa được trong tuần; việc ngoài tầm thì ghi nhận.",
      "Tỷ lệ = số đánh giá nhắc chủ đề ÷ tổng số đánh giá.",
      "Trả lời đánh giá chê bằng lời cảm ơn và điều bạn thật sự làm.",
    ],
    practicePrompt: {
      question:
        "AI báo: 'Khách phàn nàn nhiều nhất về bữa sáng.' Bạn đếm lại thì bữa sáng có 6 trong 30 đánh giá, còn wifi có 11. Bạn nên tin thế nào?",
      options: [
        "Tin số đếm của bạn: wifi 11 ÷ 30 nhiều hơn bữa sáng 6 ÷ 30",
        "Tin AI vì nó đã đọc hết 30 đánh giá nên chắc không thể đếm sai",
        "Sửa cả hai vì không thể biết chủ đề nào quan trọng hơn",
        "Bỏ cả hai vì đánh giá chỉ là ý kiến chủ quan",
      ],
      correct: 0,
      explanation:
        "Số đếm của bạn từ bản gốc là căn cứ: wifi 11 trên 30 đánh giá, bữa sáng 6 trên 30. AI có thể tóm sai thứ tự, nên đối chiếu là bước bắt buộc. Sửa cả hai không cần thiết trong một tuần, và bỏ cả hai thì bỏ qua cả vấn đề lặp lại nhiều nhất.",
    },
    summary: {
      keyIdea: "Đếm chủ đề lặp lại rồi chọn việc sửa được, thay vì chạy theo đánh giá gay gắt.",
      formula: "Tỷ lệ chủ đề = số đánh giá nhắc chủ đề đó ÷ tổng số đánh giá.",
      commonMistake: "Tin bản tóm tắt của AI mà không đối chiếu với đánh giá gốc.",
      action: "Chọn ba việc sửa được trong tuần và ghi ai làm, làm khi nào.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 20-30 đánh giá thật của cơ sở bạn hoặc nơi bạn hay ghé (dán vào, bỏ tên người viết). Nhờ AI gom theo chủ đề, mỗi chủ đề kèm hai câu trích nguyên văn. Tự đếm số lần mỗi chủ đề, rồi chọn ba việc sửa được trong tuần và ghi ai làm.",
      secondary: "Ghi một chủ đề ngoài tầm mà bạn sẽ chỉ theo dõi.",
    },
    sections: [
      {
        type: "lead",
        text: "Đánh giá của khách là nguồn thông tin miễn phí, nhưng đọc từng cái thì mất cả buổi và dễ chạy theo cái gay gắt nhất. Bài này dạy cách nhờ AI gom lại rồi bạn tự đếm để chọn việc.",
      },
      {
        type: "feynman",
        title: "Đọc đánh giá đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp thư góp ý ở quán ăn. Một mẩu giấy chê món hơi mặn có thể chỉ là khẩu vị một người, nhưng nếu mười mẩu cùng chê thì bếp phải xem lại. Việc của bạn là xếp các mẩu giấy vào từng chồng rồi đếm chồng nào dày nhất.",
        columns: ["Việc", "Hộp góp ý quán ăn", "Đánh giá khách sạn"],
        rows: [
          ["Thu gom", "Lấy hết giấy trong hộp", "Gom đánh giá của cả tháng"],
          ["Xếp chồng", "Mặn, phục vụ chậm, bàn bẩn", "Nước nóng, bữa sáng, đường vào"],
          ["Đếm", "Chồng nào dày nhất", "Chủ đề nào nhiều lượt nhất"],
          ["Quyết định", "Sửa chồng dày, làm được ngay", "Ba việc sửa được trong tuần"],
        ],
        oneLiner: "Một lời chê là ý kiến, nhiều lời chê giống nhau mới là tín hiệu.",
      },
      { type: "heading", text: "AI gom, bạn kiểm và quyết" },
      {
        type: "paragraph",
        text: "AI làm tốt việc đọc nhanh và xếp chồng. Nó làm dở việc biết chủ đề nào bạn sửa nổi. Vì thế bạn giao phần gom cho AI, đòi câu trích nguyên văn để kiểm, tự đếm số lần, và tự quyết việc cần sửa.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gom 40 đánh giá theo chủ đề",
        task: "Bạn có 40 đánh giá của khách trong tháng. Lắp prompt để AI gom chủ đề dùng được và kiểm được.",
        parts: [
          {
            id: "input",
            label: "Đầu vào",
            options: [
              { text: "Tóm tắt xem khách nghĩ gì về khách sạn chúng tôi.", feedback: "Một bản tóm tắt chung chung, AI chọn ý nghe hợp lý và bạn không biết nó bỏ sót gì." },
              { text: "Dưới đây là 40 đánh giá (đã bỏ tên khách). Chỉ dùng nội dung này, không thêm thông tin nào khác.", good: true, feedback: "Nguồn rõ, bỏ tên người viết, AI không có cớ thêm điều không có." },
            ],
          },
          {
            id: "output",
            label: "Khuôn dạng kết quả",
            options: [
              { text: "Cho tôi biết các vấn đề chính.", feedback: "Không có số lần, không có bằng chứng, bạn không biết vấn đề nào lặp nhiều." },
              { text: "Gom theo chủ đề; mỗi chủ đề ghi số đánh giá nhắc tới và trích nguyên văn hai câu của khách.", good: true, feedback: "Có số lần và câu trích để bạn đối chiếu với bản gốc." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Đề xuất luôn cách sửa và ngân sách cần thiết.", feedback: "AI bịa ngân sách và hứa cải tiến mà nó không biết cơ sở làm được hay không." },
              { text: "Chỉ gom chủ đề; không đề xuất cách sửa và không suy đoán nguyên nhân.", good: true, feedback: "AI giữ đúng việc gom; việc chọn sửa cái gì để bạn quyết." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "output", "limit"],
            text: "1. Nước nóng chậm - 14 đánh giá. Trích: 'Đợi gần 10 phút mới có nước nóng.' / 'Tắm buổi sáng nước rất lạnh.'\n2. Bữa sáng hết sớm - 9 đánh giá. Trích: 'Tới 8 giờ 30 đã hết bánh mì.' / 'Khay đồ ăn trống trơn.'\n3. Đường vào khó tìm - 6 đánh giá. Trích: 'Google Maps chỉ sai ngõ.' / 'Đi vòng mất 20 phút.'\n4. Tiếng ồn ngoài phố - 3 đánh giá. Trích: 'Xe chạy suốt đêm.' / 'Ồn từ sáng sớm.'\n\n(Bạn đối chiếu câu trích với đánh giá gốc rồi tự đếm lại.)",
          },
          {
            requires: ["input"],
            text: "Khách nhìn chung hài lòng nhưng có phàn nàn về vài dịch vụ. Cơ sở nên đầu tư thêm 200 triệu đồng để nâng cấp phòng và tuyển thêm 5 nhân viên.\n\n(Không có số lần, không có trích dẫn; con số 200 triệu và 5 nhân viên là AI tự bịa.)",
          },
          {
            text: "Khách khen cơ sở sạch sẽ, nhân viên thân thiện. Có một số ý kiến về giá.\n\n(Không nguồn, không đếm: AI viết những điều thường gặp ở mọi khách sạn.)",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ 40 đánh giá tới ba việc trong tuần",
        steps: [
          { label: "Gom đánh giá vào một chỗ", detail: "Sao chép các đánh giá của tháng, bỏ tên và thông tin nhận dạng của khách trước khi đưa vào bất kỳ công cụ nào." },
          { label: "AI gom chủ đề kèm trích dẫn", detail: "Bạn đòi số lần và câu trích nguyên văn, cấm đề xuất cách sửa." },
          { label: "Bạn đối chiếu và đếm", detail: "Chọn hai chủ đề, tìm câu trích trong bản gốc, đếm lại số lần." },
          { label: "Chọn việc trong tầm", detail: "Mỗi việc cần một người chịu trách nhiệm và một ngày xong; việc ngoài tầm ghi để theo dõi." },
        ],
      },
      {
        type: "callout",
        label: "Riêng tư của khách",
        text: "Bỏ tên, số phòng và mọi thông tin nhận dạng trước khi dán đánh giá vào công cụ AI, và chỉ dùng công cụ mà cơ sở đã cho phép. Nếu chưa chắc, hỏi người phụ trách công nghệ hoặc pháp chế của cơ sở.",
      },
      {
        type: "scenario",
        title: "Chọn việc sửa trong tuần từ bản gom của AI",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa 4 chủ đề: nước nóng chậm (14), bữa sáng hết sớm (9), đường vào khó tìm (6), tiếng ồn ngoài phố (3). Bạn có một tuần và một ngân sách nhỏ.",
            choices: [
              { label: "Sửa tiếng ồn vì đánh giá đó viết gay gắt nhất", next: "bad_loud" },
              { label: "Đối chiếu vài câu trích với bản gốc rồi chọn nước nóng, bữa sáng, đường vào", next: "s2" },
            ],
          },
          bad_loud: {
            text: "Bạn tốn cả tuần tìm cách chống ồn mà không ăn thua, trong khi 14 khách vẫn tiếp tục đợi nước nóng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn chọn ba việc. Nhân viên kỹ thuật hỏi nước nóng chậm là lỗi gì.",
            choices: [
              { label: "Nhờ AI kết luận nguyên nhân rồi bảo thợ làm theo", next: "bad_cause" },
              { label: "Nhờ thợ kiểm bình nóng lạnh và đường ống, báo lại kết quả", next: "good" },
            ],
          },
          bad_cause: {
            text: "AI nói do bình cũ, bạn thay bình tốn nhiều tiền mà nguyên nhân thật là van đường ống bị nghẹt. Vấn đề vẫn còn.",
            ending: "bad",
          },
          good: {
            text: "Thợ tìm ra van bị nghẹt và sửa trong một buổi. Bạn ghi lại việc đã làm để trả lời các đánh giá liên quan.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI gom, bạn kiểm, bạn quyết, và thợ mới biết nguyên nhân thật.",
          "Bài sau: mini-dự án dựng bảng giá phòng cho một mùa.",
        ],
      },
    ],
  },
  {
    id: 2114,
    slug: "mini-du-an-bang-gia-phong-mot-mua",
    title: "Chặng 35, Bài 15: Mini-dự án: bảng giá phòng cho một mùa",
    subtitle: "Ba mức giá cho ngày thường, cuối tuần và lễ, kèm một dòng ghi khi nào xét lại.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối chặng này bạn ghép những gì đã học: thử giá, kiểm chi phí, nghe khách nói. Kết quả là một bảng giá phòng cho cả mùa, có ba mức (ngày thường, cuối tuần, lễ) và một dòng ghi khi nào xét lại. Số thật do bạn nhập; AI giúp dựng khung và soát chỗ thiếu.",
    openingQuestion:
      "Bạn được giao dựng bảng giá phòng cho mùa tới từ số liệu của mình. Cách nào cho bảng đáng tin nhất?",
    openingOptions: [
      "Dùng số bán thật của bạn cho từng loại ngày rồi ghi rõ khi nào xét lại",
      "Nhờ AI tự bịa số đêm bán cho từng loại ngày rồi dùng luôn bảng, vì AI có kiến thức về du lịch",
      "Đặt một mức giá duy nhất cho cả mùa để khỏi phải giải thích",
      "Sao chép bảng giá của một khách sạn lớn rồi trừ đi 10% cho an toàn",
    ],
    correctOption: 0,
    explanation:
      "Bảng đáng tin bắt đầu từ số bán thật của bạn cho từng loại ngày, vì ngày thường, cuối tuần và lễ có nhu cầu khác nhau. Dòng ghi khi nào xét lại (ví dụ sau hai tuần bán thấp hơn dự kiến) giúp bảng không thành luật cứng. AI bịa số đêm thì bảng không dựa trên khách thật. Một mức giá cho cả mùa bỏ lỡ cuối tuần và lễ. Sao chép bảng của nơi khác không tính chi phí và khách của bạn.",
    diagram: [
      { label: "Nhập số đêm bán thật cho ngày thường, cuối tuần, lễ", arrow: true },
      { label: "Nhờ AI dựng khung bảng giá và công thức tính", arrow: true },
      { label: "Bạn kiểm số và giả định, đặt ba mức giá", arrow: true },
      { label: "Ghi điều kiện xét lại, chốt bảng cho mùa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: người quản lý một homestay 8 phòng dựng bảng giá cho mùa hè. Cô nhập số đêm bán của mùa trước cho ngày thường, cuối tuần và dịp lễ, nhờ AI dựng khung bảng và tự ghi giả định về khách. Cô đặt ba mức giá và một dòng: 'Sau hai tuần, nếu lấp đầy ngày thường dưới 40% thì xét lại giá ngày thường.' Số liệu chỉ để minh hoạ.",
    },
    quiz: [
      q(
        "Vì sao nên có ba mức giá thay vì một mức cho cả mùa?",
        [
          "Ngày thường, cuối tuần và lễ có nhu cầu khác nhau, nên giá hợp lý cũng khác",
          "Vì nhiều mức giá làm khách khó so sánh với nơi khác",
          "Vì AI chỉ làm được bảng khi có đúng ba mức giá",
          "Vì luật buộc mỗi khách sạn phải niêm yết ba mức giá",
        ],
        "Nhu cầu ngày lễ thường cao hơn ngày thường nên cùng một giá sẽ hoặc bỏ lỡ tiền hoặc bỏ trống phòng. Mục đích không phải làm khó khách. AI làm được bảng với bất kỳ số mức nào, và tôi không nêu điều luật nào; nếu cần biết quy định niêm yết, hỏi bộ phận pháp chế.",
      ),
      q(
        "Ngày thường bán 6 trong 10 phòng giá 700.000 đồng. Doanh thu một ngày thường là bao nhiêu?",
        [
          "4,2 triệu (6 × 700.000)",
          "7 triệu (10 × 700.000, tính cả phòng trống)",
          "1,17 triệu (700.000 ÷ 6, chia thay vì nhân)",
          "60% (6 ÷ 10, lẫn tỷ lệ lấp đầy với doanh thu)",
        ],
        "Doanh thu bằng số phòng bán nhân giá: 6 × 700.000 = 4.200.000. 7 triệu tính cả phòng không bán, chia ra 1,17 triệu là dùng sai phép tính, và 60% là tỷ lệ lấp đầy chứ không phải tiền.",
      ),
      q(
        "Dòng 'khi nào xét lại' trong bảng giá nên viết thế nào?",
        [
          "Nêu điều kiện cụ thể, như sau hai tuần nếu lấp đầy dưới 40% thì xét lại giá",
          "Xét lại khi nào thấy cần",
          "Không cần dòng này vì giá đã chốt cho cả mùa",
          "Xét lại mỗi ngày dựa vào cảm giác của người quản lý, thấy phòng vắng thì hạ giá ngay",
        ],
        "Điều kiện có số và mốc thời gian giúp mọi người biết khi nào bảng cần đổi mà không tranh cãi. 'Khi nào thấy cần' không ai kiểm được. Không có dòng này là biến bảng thành luật cứng. Đổi mỗi ngày theo cảm giác làm giá rối và khó giải thích với khách.",
      ),
      q(
        "AI dựng bảng giá và tự điền số đêm bán mùa trước là 'khoảng 18 phòng mỗi đêm'. Số này bạn chưa từng đưa. Nên làm gì?",
        [
          "Coi đó là số AI bịa, thay bằng số thật từ sổ đặt phòng của bạn",
          "Giữ lại vì con số nghe hợp lý với một cơ sở có quy mô như của bạn",
          "Giữ lại nhưng giảm 10% cho an toàn",
          "Nhờ AI xác nhận lại con số đó một lần nữa",
        ],
        "Số bạn chưa đưa thì AI không thể biết, nên nó bịa cho bảng đầy đủ. Giảm 10% một con số bịa vẫn là số bịa. Hỏi lại AI không làm số đó có thật; nó chỉ trả lời lại theo cách nghe chắc hơn. Số thật từ sổ đặt phòng mới đúng.",
      ),
      q(
        "Bảng giá nên có những cột nào để người khác đọc và kiểm được?",
        [
          "Loại ngày, giá, số phòng dự kiến bán, doanh thu dự kiến và giả định",
          "Chỉ giá và tên loại ngày, để bảng gọn dễ nhìn và khách khỏi bị rối mắt",
          "Tên khách đã ở và số điện thoại để tiện liên hệ",
          "Giá của các đối thủ mà bạn không ghi rõ nguồn",
        ],
        "Giá cùng số phòng dự kiến, doanh thu và giả định cho phép người đọc kiểm tính toán. Bảng chỉ có giá thì không thấy vì sao chọn mức đó. Thông tin cá nhân của khách không thuộc bảng giá và không nên đưa vào công cụ chưa duyệt. Giá đối thủ không nguồn thì không kiểm được.",
      ),
    ],
    keyTakeaways: [
      "Ba loại ngày, ba mức giá, mỗi mức dựa trên số bán thật của loại ngày đó.",
      "Doanh thu dự kiến = số phòng dự kiến bán × giá; luôn ghi giả định.",
      "Số do bạn nhập; AI dựng khung và soát chỗ thiếu.",
      "Ghi điều kiện xét lại có số và mốc thời gian.",
      "Quyết định giá cuối cùng thuộc về chủ hoặc quản lý.",
    ],
    practicePrompt: {
      question:
        "Bảng của bạn: lễ 1.200.000 đồng bán 9 trong 10 phòng. Cuối tuần 900.000 đồng bán 7 phòng. Doanh thu lễ và cuối tuần lần lượt là bao nhiêu?",
      options: [
        "10,8 triệu (9 × 1,2 triệu) và 6,3 triệu (7 × 900.000)",
        "12 triệu (10 × 1,2 triệu) và 9 triệu (10 × 900.000), tính cả phòng trống",
        "10,8 triệu và 6,3 triệu, nhưng đổi chỗ hai loại ngày cho nhau",
        "9 triệu và 7 triệu, chỉ đếm số phòng bán được mà không nhân giá",
      ],
      correct: 0,
      explanation:
        "Lễ: 9 × 1.200.000 = 10.800.000. Cuối tuần: 7 × 900.000 = 6.300.000. Phương án tính cả phòng trống ra số quá cao, phương án đổi chỗ là nhầm nhãn, và phương án chỉ đếm phòng thiếu bước nhân với giá.",
    },
    summary: {
      keyIdea: "Bảng giá tốt có ba mức, dựa trên số bán thật, ghi giả định và điều kiện xét lại.",
      formula: "Doanh thu dự kiến từng loại ngày = số phòng dự kiến bán × giá của loại ngày đó.",
      commonMistake: "Để AI tự điền số đêm bán rồi coi bảng như đã có bằng chứng.",
      action: "Dựng bảng giá cho một mùa từ số thật của bạn, ghi một dòng xét lại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy số đêm bán thật của mùa trước, chia thành ngày thường, cuối tuần và lễ. Nhờ AI dựng khung bảng (loại ngày, giá, số phòng dự kiến, doanh thu, giả định). Bạn tự đặt ba mức giá và viết một dòng: 'Sau bao lâu, nếu điều gì xảy ra thì xét lại giá nào.'",
      secondary: "Gửi bảng cho chủ hoặc quản lý và ghi lại điều họ muốn đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Mini-dự án này gom lại cả nửa sau của chặng: thử giá, kiểm chi phí, hiểu khách. Kết quả là một bảng giá phòng cho cả mùa, có ba mức giá và dòng ghi khi nào xét lại. Số thật do bạn nhập.",
      },
      {
        type: "feynman",
        title: "Bảng giá một mùa đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới bảng giá vé xe buýt: giờ cao điểm, giờ thường, ngày lễ, mỗi loại một mức. Nhà xe không đặt một giá cho mọi lúc, vì lúc nào cũng có người đi nhưng đông khác nhau. Bảng giá phòng là cùng ý đó, thêm một dòng ghi khi nào xem lại.",
        columns: ["Việc", "Bảng giá vé xe buýt", "Bảng giá phòng một mùa"],
        rows: [
          ["Loại thời điểm", "Giờ thường, giờ cao điểm, lễ", "Ngày thường, cuối tuần, lễ"],
          ["Căn cứ", "Số người đi từng giờ", "Số đêm bán của từng loại ngày"],
          ["Điều phải ghi", "Áp dụng từ ngày nào", "Giả định và khi nào xét lại"],
          ["Ai quyết", "Công ty xe buýt", "Chủ hoặc quản lý cơ sở"],
        ],
        oneLiner: "Mỗi loại ngày một mức giá dựa trên số thật, và một dòng nói khi nào xem lại.",
      },
      { type: "heading", text: "Giá đi theo mức lấp đầy dự kiến" },
      {
        type: "paragraph",
        text: "Một cách nghĩ đơn giản: nơi nào dự kiến đông thì giá cao hơn, dự kiến vắng thì giá thấp hơn để lấp phòng. Cuối tuần thường cộng thêm một phần trăm so với ngày thường. Biểu đồ dưới cho bạn thử sức, và toàn bộ số ở đó chỉ là minh hoạ.",
      },
      {
        type: "chart",
        title: "Giá phòng theo mức lấp đầy dự kiến",
        caption:
          "Số liệu minh hoạ, không phải bảng giá của cơ sở nào. Kéo thanh trượt để xem giá ngày thường và cuối tuần đổi ra sao khi mức lấp đầy dự kiến thay đổi.",
        kind: "line",
        xLabel: "Mức lấp đầy dự kiến (%)",
        yLabel: "Giá phòng một đêm (nghìn đồng)",
        x: { from: 30, to: 100, step: 10 },
        params: [
          { id: "base", label: "Giá cơ sở khi lấp đầy 50%", min: 500, max: 1500, step: 50, value: 800, unit: " nghìn" },
          { id: "k", label: "Độ nhạy của giá theo lấp đầy", min: 0.2, max: 1.2, step: 0.1, value: 0.6 },
          { id: "w", label: "Phụ thu cuối tuần", min: 0, max: 40, step: 5, value: 15, unit: "%" },
        ],
        series: [
          { label: "Ngày thường", expr: "base * (1 + k * (x - 50) / 100)" },
          { label: "Cuối tuần", expr: "base * (1 + k * (x - 50) / 100) * (1 + w / 100)" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung bảng giá một mùa",
        task: "Bạn có số đêm bán của mùa trước cho ba loại ngày. Lắp prompt để AI dựng khung bảng, còn số và mức giá do bạn nhập.",
        parts: [
          {
            id: "data",
            label: "Số liệu",
            options: [
              { text: "Tự ước lượng số đêm bán cho ngày thường, cuối tuần và lễ giúp tôi.", feedback: "AI bịa số đêm bán, bảng trông đầy đủ nhưng không dựa trên khách của bạn." },
              { text: "Ngày thường bán trung bình 6/10 phòng, cuối tuần 8/10, lễ 9/10 (từ sổ đặt phòng của tôi). Chỉ dùng số này.", good: true, feedback: "Số thật, có nguồn, AI chỉ tính từ đó." },
            ],
          },
          {
            id: "table",
            label: "Khuôn dạng bảng",
            options: [
              { text: "Làm cho tôi một bảng giá đẹp.", feedback: "Không nói cột nào, AI tự chọn và có thể bỏ cột giả định hoặc doanh thu." },
              { text: "Bảng 3 dòng (ngày thường, cuối tuần, lễ), các cột: giá tôi nhập, số phòng dự kiến bán, doanh thu dự kiến, giả định.", good: true, feedback: "Có đủ cột để bạn kiểm từng con số." },
            ],
          },
          {
            id: "rule",
            label: "Quyền quyết định",
            options: [
              { text: "Tự đặt luôn ba mức giá tối ưu cho tôi.", feedback: "AI tự chọn giá và bạn không biết dựa vào đâu; lại thay quản lý quyết chuyện không phải của nó." },
              { text: "Để trống cột giá cho tôi nhập; thêm một dòng 'khi nào xét lại' để tôi điền điều kiện.", good: true, feedback: "Quyết định giá và điều kiện xét lại vẫn thuộc về bạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "table", "rule"],
            text: "Bảng giá mùa (điền cột giá bạn quyết):\n\nNgày thường | giá: ___ | dự kiến bán 6/10 phòng | doanh thu: 6 × giá | giả định: giống mùa trước\nCuối tuần | giá: ___ | dự kiến bán 8/10 phòng | doanh thu: 8 × giá | giả định: giống mùa trước\nLễ | giá: ___ | dự kiến bán 9/10 phòng | doanh thu: 9 × giá | giả định: giống mùa trước\n\nKhi nào xét lại: ___ (bạn điền: mốc thời gian và điều kiện có số).",
          },
          {
            requires: ["table"],
            text: "Ngày thường: 650.000 đồng, bán 7 phòng. Cuối tuần: 950.000 đồng, bán 9 phòng. Lễ: 1.500.000 đồng, bán 10 phòng.\n\n(Giá và số phòng bán do AI tự điền, không có nguồn từ số liệu của bạn.)",
          },
          {
            text: "Bảng giá tham khảo: ngày thường thấp, cuối tuần cao hơn, lễ cao nhất. Chúc bạn kinh doanh thuận lợi!\n\n(Không có cột, không có số: AI chỉ nói chung chung.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng do bạn nhập số, AI dựng khung",
          text: "Mọi số truy ra được sổ đặt phòng. Giả định nằm trên bảng để chỉnh. Giá và điều kiện xét lại do bạn quyết.",
        },
        right: {
          label: "Bảng AI tự điền số và giá",
          text: "Số đêm bán là số bịa cho đủ ô. Không biết mức giá dựa vào đâu. Bạn phải gánh trách nhiệm cho quyết định không phải của mình.",
        },
      },
      {
        type: "scenario",
        title: "Hai tuần sau khi áp dụng bảng giá mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng giá đã chạy hai tuần. Ngày thường chỉ lấp đầy 35%, thấp hơn dự kiến 60%. Bảng của bạn có dòng: 'Sau hai tuần nếu ngày thường lấp đầy dưới 40% thì xét lại giá ngày thường.'",
            choices: [
              { label: "Để nguyên vì bảng đã chốt cả mùa", next: "bad_stuck" },
              { label: "Xét lại theo dòng đã ghi, thử hạ nhẹ giá ngày thường sau khi hỏi quản lý", next: "s2" },
            ],
          },
          bad_stuck: {
            text: "Ngày thường vắng suốt cả tháng. Doanh thu mùa thấp hơn kế hoạch và không ai nhớ bảng có dòng xét lại.",
            ending: "bad",
          },
          s2: {
            text: "Quản lý đồng ý thử. Bạn muốn biết số ngày thường tuần sau ra sao.",
            choices: [
              { label: "Nhờ AI dự đoán trước con số chắc chắn của tuần sau", next: "bad_predict" },
              { label: "Ghi số đêm bán mỗi ngày trong tuần, đối chiếu với bảng vào cuối tuần", next: "good" },
            ],
          },
          bad_predict: {
            text: "AI đưa một con số nghe chắc chắn, bạn dựa vào đó để hẹn nhân viên và đặt hàng, nhưng số thật khác xa và kế hoạch phải sửa gấp.",
            ending: "bad",
          },
          good: {
            text: "Cuối tuần bạn so số bán thật với bảng, thấy ngày thường lên 48%. Bạn ghi kết quả vào dòng xét lại và giữ giá mới.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chia số đêm bán mùa trước thành ngày thường, cuối tuần, lễ.",
          "Bước 2 - Nhờ AI dựng khung bảng, để trống cột giá.",
          "Bước 3 - Bạn nhập giá, tính doanh thu dự kiến bằng tay, kiểm với AI.",
          "Bước 4 - Viết dòng xét lại có mốc thời gian và điều kiện có số.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Số của bạn, khung của AI, quyết định của bạn.",
          "Bài sau: những tình huống khó, bắt đầu từ khách khiếu nại ngay đêm đầu tiên.",
        ],
      },
    ],
  },
];
