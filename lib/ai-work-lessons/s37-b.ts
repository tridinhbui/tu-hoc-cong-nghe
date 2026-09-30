import type { Lesson } from "../lesson-types";

// Chặng 37, bài 6-10. Giáo trình: scripts/curriculum/stage-37.json.
// Số liệu trong bài đều là số liệu minh hoạ; không dựa vào tính năng riêng của công cụ nào.
type QQ = { question: string; options: string[]; correct: number; explanation: string };
const Q = (question: string, correct: string, wrong: [string, string, string], explanation: string): QQ => ({
  question,
  options: [correct, ...wrong],
  correct: 0,
  explanation,
});

export const S37_B_LESSONS: Lesson[] = [
  {
    id: 2145,
    slug: "mini-bo-ba-bao-gia-mot-bang-so-sanh",
    title: "Chặng 37, Bài 6: Mini-dự án: từ ba báo giá tới bảng so sánh gửi sếp duyệt",
    subtitle: "Làm trọn một vòng: thu báo giá, dựng bảng, kiểm, rồi viết đề xuất ngắn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Năm bài đầu của chặng dạy từng mảnh. Việc thật thì không chia mảnh: sếp nhắn một câu, bạn phải đi từ ba file lộn xộn tới một trang đủ tin cậy để người ta ký. Làm trọn vòng này một lần, bạn biết chỗ nào giao AI, chỗ nào tự giữ.",
    openingQuestion:
      "Sếp nhắn: \"Em chọn nhà cung cấp giấy in cho quý này, thứ Năm anh duyệt.\" Bạn có ba báo giá: một file PDF, một file Excel, một tin nhắn Zalo. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Dựng một bảng có cùng cột và cùng đơn vị cho cả ba nhà",
      "Nhờ AI chọn luôn nhà tốt nhất rồi báo sếp kết quả cuối cùng",
      "Gọi ngay nhà có đơn giá thấp nhất để chốt đơn cho kịp hạn",
      "Gửi cả ba file cho sếp và để sếp tự so sánh trước khi họp",
    ],
    correctOption: 0,
    explanation:
      "Ba báo giá trình bày khác nhau thì không so được: một nhà tính theo ream, một nhà theo thùng, một nhà đã gồm thuế, một nhà chưa. Đưa về cùng một khung là bước biến ba mớ chữ thành ba dòng so được, và cũng là bước lộ ra chỗ nhà nào còn thiếu thông tin. Nhờ AI chọn luôn thì bạn nhận kết luận mà không biết nó dựa vào số nào. Chốt theo đơn giá thấp nhất dễ dính phí giao ẩn. Chuyển cả ba file cho sếp là đẩy đúng phần việc sếp giao cho bạn.",
    diagram: [
      { label: "Thu ba báo giá về một chỗ", arrow: true },
      { label: "Đưa vào một bảng cùng cột, cùng đơn vị", arrow: true },
      { label: "Đối chiếu từng ô với file gốc", arrow: true },
      { label: "Viết đề xuất ngắn, ghi rõ điều chưa chắc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chị phụ trách hành chính ở công ty 40 người nhận ba báo giá giấy in. Nhà A gửi PDF giá chưa gồm thuế, nhà B gửi Excel có phí giao ghi ở dòng cuối, nhà C nhắn tin giá đã gồm thuế nhưng không nói thời hạn hiệu lực. Chị đưa cả ba vào một bảng, thấy ngay ô phí giao của nhà C trống, hỏi lại một email, rồi mới gửi sếp. Đây là tình huống dựng lên để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Ba báo giá đến dưới ba dạng khác nhau. Trước khi so sánh, bạn làm gì?",
        "Đưa cả ba về cùng khung cột và cùng đơn vị tính",
        [
          "Chọn báo giá có đơn giá thấp nhất trước, rồi mới đối chiếu với hai nhà còn lại một cách kỹ lưỡng",
          "Nhờ AI chấm điểm cảm nhận từng báo giá rồi xếp hạng",
          "Gộp ba file thành một PDF cho sếp tự đọc",
        ],
        "So sánh chỉ có nghĩa khi các số cùng một cơ sở. Chọn theo đơn giá trước là quyết định trước khi biết phí ẩn. Điểm cảm nhận của AI không dựa vào số nào bạn kiểm được, còn gộp file là chuyển việc so sánh sang cho sếp.",
      ),
      Q(
        "Báo giá của nhà C không ghi phí giao hàng. Bạn xử lý ô đó thế nào?",
        "Ghi \"chưa rõ\" vào ô và đưa vào danh sách cần hỏi lại nhà cung cấp",
        [
          "Điền 0 vì báo giá không nhắc tới phí giao thì coi như miễn phí",
          "Điền mức phí trung bình của hai nhà kia để cột nhìn đủ",
          "Loại luôn nhà C vì thiếu thông tin thì không thể đưa vào bảng",
        ],
        "Ô trống là một câu hỏi, không phải con số 0. Điền 0 hay điền số trung bình là tự bịa một dữ kiện rồi trình sếp như thật. Loại nhà C ngay thì có thể bỏ mất nhà rẻ nhất chỉ vì chưa hỏi một email.",
      ),
      Q(
        "Đặt 100 ream, nhà B giá 58.000 đồng mỗi ream cộng 300.000 đồng phí giao một lần. Tổng chi phí là bao nhiêu?",
        "6.100.000 đồng, gồm cả phí giao một lần cho cả đơn",
        [
          "5.800.000 đồng (= 58.000 × 100, quên phí giao)",
          "6.400.000 đồng (= 5.800.000 + 300.000 × 2, phí giao hai lần)",
          "5.800.300 đồng (= 5.800.000 + 300, nhầm hàng nghìn)",
        ],
        "Đúng là 58.000 × 100 = 5.800.000, cộng phí giao 300.000 một lần thành 6.100.000. Ba phương án còn lại là ba lỗi cộng hay gặp: quên phí, tính phí hai lần, và nhầm hàng nghìn khi gõ số.",
      ),
      Q(
        "Đoạn đề xuất gửi sếp nên gồm những gì?",
        "Nhà đề xuất, lý do bằng số, và điểm chưa chắc cần xác nhận",
        [
          "Một câu \"em đề xuất nhà B\" thật gọn vì sếp bận và chỉ cần kết luận",
          "Toàn bộ nội dung ba báo giá dán nguyên văn theo thứ tự nhận được",
          "Lời khen nhà cung cấp mà AI viết sẵn cho thuyết phục hơn",
        ],
        "Sếp duyệt được khi thấy lý do bằng số và biết chỗ nào còn hở. Chỉ có kết luận thì sếp phải hỏi lại. Dán nguyên văn thì sếp phải tự so sánh. Lời khen từ AI không phải bằng chứng nào cả.",
      ),
      Q(
        "AI dựng xong bảng so sánh. Cách kiểm hiệu quả nhất trong 10 phút là gì?",
        "Chọn vài ô ở mỗi nhà, rồi đặt từng ô cạnh file báo giá gốc để đối chiếu",
        [
          "Hỏi AI \"bạn có chắc không\" và tin câu trả lời sau đó",
          "Xem bảng đủ cột và đẹp chưa, vì bảng đẹp thường là bảng đúng",
          "Chỉ kiểm dòng tổng, vì tổng đúng thì các dòng bên trên chắc đúng",
        ],
        "Kiểm là đặt ô trong bảng cạnh ô trong file gốc. AI xác nhận lại chính mình không phải kiểm chứng. Bảng đẹp không nói gì về số đúng. Tổng có thể đúng nhờ hai lỗi triệt tiêu nhau.",
      ),
    ],
    keyTakeaways: [
      "So sánh báo giá chỉ có nghĩa khi cùng cột, cùng đơn vị, cùng cơ sở thuế.",
      "Ô trống là câu hỏi cần gửi nhà cung cấp, không phải con số 0.",
      "AI dựng bảng nhanh; bạn đối chiếu từng ô với file gốc.",
      "Đề xuất tốt có nhà chọn, lý do bằng số và chỗ chưa chắc.",
      "Ghi rõ điều chưa chắc là cách giữ uy tín, không phải nhược điểm.",
    ],
    practicePrompt: {
      question:
        "Bảng của bạn có ba dòng, nhưng nhà C thiếu phí giao và thời hạn hiệu lực. Câu nào trong đề xuất gửi sếp là đúng tinh thần?",
      options: [
        "\"Em đề xuất nhà B; riêng nhà C còn thiếu phí giao, em đã hỏi và sẽ báo lại trước thứ Năm.\"",
        "\"Em đề xuất nhà B vì rẻ nhất, các nhà còn lại em thấy không đáng để xem thêm.\"",
        "\"Em đề xuất nhà C vì giá đã gồm thuế; phí giao chắc cũng không đáng kể lắm.\"",
        "\"Em chưa đề xuất được vì báo giá nào cũng thiếu một phần thông tin cả.\"",
      ],
      correct: 0,
      explanation:
        "Câu đúng nêu lựa chọn, nêu chỗ hở và nói rõ việc đang làm để lấp chỗ hở. \"Rẻ nhất\" chưa cộng phí ẩn. \"Chắc không đáng kể\" là đoán trong văn bản trình duyệt. Từ chối đề xuất thì bỏ dở việc sếp giao.",
    },
    summary: {
      keyIdea: "Một đề xuất đáng tin là một bảng cùng cơ sở, số đã đối chiếu và chỗ chưa chắc được nói ra.",
      formula: "Thu về một chỗ → cùng cột, cùng đơn vị → đối chiếu từng ô → đề xuất kèm điểm chưa chắc.",
      commonMistake: "Lấp ô trống bằng số đoán để bảng trông đầy đủ.",
      action: "Lấy ba báo giá gần nhất của bạn và dựng lại thành một bảng cùng cột.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba báo giá hoặc ba bảng giá thật bạn từng nhận cho cùng một loại hàng. Đưa cả ba vào một bảng có cùng cột (đơn giá, đơn vị, phí giao, thuế, thời hạn hiệu lực), nhờ AI dựng khung rồi bạn tự đối chiếu ít nhất năm ô với file gốc. Ghi lại các ô còn trống.",
      secondary: "Ngày mai bạn sẽ được hỏi: có ô nào trong bảng mà bạn phải hỏi lại nhà cung cấp không?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, sếp nhắn một câu: chọn nhà cung cấp giấy in trước thứ Năm. Trong hộp thư có ba báo giá, mỗi nơi một kiểu. Bài này đi trọn từ đống file đó tới một đoạn đề xuất sếp có thể duyệt.",
      },
      {
        type: "feynman",
        title: "Bảng so sánh báo giá đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn đi chợ so giá ba quầy gạo: quầy này bán theo ký, quầy kia theo bao năm ký, quầy thứ ba nói giá đã gồm công chở về nhà. Bạn không thể so cho tới khi tính lại cùng một cách.",
        columns: ["Thành phần", "So giá gạo ở chợ", "So ba báo giá"],
        rows: [
          ["Đơn vị", "Quy hết về giá một ký", "Quy hết về giá một ream"],
          ["Phí đi kèm", "Cộng công chở về nhà", "Cộng phí giao và điều kiện tối thiểu"],
          ["Điều chưa hỏi", "Hỏi quầy có giữ giá tới chiều không", "Hỏi thời hạn hiệu lực của báo giá"],
          ["Người cầm cân", "Bạn tự cân lại vài túi", "Bạn tự đối chiếu vài ô với file gốc"],
        ],
        oneLiner: "So ba báo giá là quy về cùng một cách tính rồi tự cân lại vài ô.",
      },
      { type: "heading", text: "Bốn bước, và ai làm bước nào" },
      {
        type: "paragraph",
        text: "Thu báo giá, dựng bảng, kiểm, viết đề xuất. AI giúp nhiều nhất ở bước hai: đọc PDF, Excel, tin nhắn rồi điền vào cùng khung. Bước ba và bước bốn thuộc về bạn, vì người ký tên dưới đề xuất là bạn và sếp.",
      },
      {
        type: "flow",
        title: "Từ ba báo giá tới đề xuất gửi sếp",
        steps: [
          { label: "Thu về một chỗ", detail: "Đưa cả ba báo giá vào cùng một thư mục. Ghi ngày nhận và người gửi để sau này biết báo giá nào còn hiệu lực." },
          { label: "Dựng khung bảng", detail: "Nhờ AI điền các cột: đơn giá, đơn vị, phí giao, thuế, số lượng tối thiểu, thời hạn. Chỗ báo giá không nói, bảng phải ghi \"chưa rõ\"." },
          { label: "Đối chiếu với file gốc", detail: "Chọn ít nhất một ô mỗi cột và mỗi nhà, đặt cạnh file gốc. Sai một ô thì soát cả dòng đó." },
          { label: "Hỏi lại chỗ còn hở", detail: "Mọi ô \"chưa rõ\" thành một câu hỏi gửi nhà cung cấp. Ghi hạn bạn cần câu trả lời." },
          { label: "Viết đề xuất", detail: "Nêu nhà chọn, hai hay ba lý do bằng số, và điều bạn chưa chắc. Ngắn đủ để sếp đọc trong hai phút." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Đề xuất dễ được duyệt", text: "Có nhà chọn, lý do bằng số cùng cơ sở, chỗ chưa chắc được nói rõ và việc bạn đang làm để lấp chỗ đó." },
        right: { label: "Đề xuất dễ bị hỏi ngược", text: "Chỉ có kết luận, hoặc có số nhưng khác cơ sở thuế, hoặc điền số đoán vào ô trống mà không nói." },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng so sánh ba báo giá",
        task: "Bạn đã có nội dung ba báo giá. Lắp prompt để AI dựng bảng so sánh mà bạn dùng được.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              { text: "So sánh giúp tôi ba nhà cung cấp giấy in.", feedback: "AI không có ba báo giá trong tay, nó sẽ bịa giá cho đủ bảng." },
              { text: "Dưới đây là nguyên văn ba báo giá của nhà A, B, C (dán vào). Chỉ dùng thông tin trong đó.", good: true, feedback: "Có dữ liệu thật và giới hạn nguồn - AI đọc chứ không nhớ hay đoán." },
            ],
          },
          {
            id: "cols",
            label: "Cấu trúc bảng",
            options: [
              { text: "Lập bảng thật đẹp, có cột nào cũng được.", feedback: "Cột do AI tự chọn nên không đủ phí giao và thuế, bạn không so được." },
              { text: "Bảng có cột: nhà, đơn giá mỗi ream, đã gồm thuế chưa, phí giao, đặt tối thiểu, thời hạn hiệu lực.", good: true, feedback: "Cột đúng thứ bạn cần so - phí ẩn và thuế không bị bỏ sót." },
            ],
          },
          {
            id: "gap",
            label: "Chỗ thiếu thông tin",
            options: [
              { text: "Nếu thiếu thì tự ước tính cho đủ bảng.", feedback: "Số ước tính lọt vào bảng như số thật, và sếp sẽ tin nó." },
              { text: "Nếu báo giá không nói, ghi \"chưa rõ\" và liệt kê cuối bảng.", good: true, feedback: "Chỗ hở lộ ra thành danh sách cần hỏi lại thay vì bị che đi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "cols", "gap"],
            text: "| Nhà | Đơn giá/ream | Đã gồm thuế | Phí giao | Đặt tối thiểu | Hiệu lực |\n| A | 62.000 | Chưa | Miễn phí từ 50 ream | 20 ream | 30 ngày |\n| B | 58.000 | Chưa | 300.000 | 10 ream | chưa rõ |\n| C | 65.000 | Rồi | chưa rõ | 10 ream | chưa rõ |\n\nCần hỏi lại: phí giao của C; thời hạn hiệu lực của B và C.",
          },
          {
            requires: ["data"],
            text: "| Nhà | Đơn giá | Ghi chú |\n| A | 62.000 | Giao hàng |\n| B | 58.000 | Rẻ nhất |\n| C | 65.000 | Đã gồm thuế |\n\n(Có số thật nhưng thiếu cột phí giao và thời hạn, nên chưa đủ để so sánh.)",
          },
          {
            text: "| Nhà | Đơn giá | Phí giao | Hiệu lực |\n| A | 60.000 | 200.000 | 60 ngày |\n| B | 55.000 | 250.000 | 45 ngày |\n| C | 63.000 | 0 | 90 ngày |\n\n(AI không có báo giá nên bịa toàn bộ số cho đủ bảng.)",
          },
        ],
      },
      { type: "heading", text: "Đọc lại bảng như một người kiểm toán nhỏ" },
      {
        type: "list",
        items: [
          "Cùng cơ sở thuế: mọi giá đều đã gồm hoặc đều chưa gồm.",
          "Cùng đơn vị: ream với ream, không lẫn thùng.",
          "Không ô nào là số đoán: ô thiếu ghi rõ \"chưa rõ\".",
          "Có ít nhất một ô mỗi nhà đã đối chiếu với file gốc.",
        ],
      },
      {
        type: "callout",
        label: "Giữ uy tín khi chưa chắc",
        text: "Câu \"em chưa chắc điểm này, đã hỏi nhà cung cấp và sẽ báo lại\" làm sếp tin bạn hơn một con số tròn trịa nhưng không ai kiểm được. Người ký duyệt cần biết chỗ nào chắc, chỗ nào chưa.",
      },
      {
        type: "scenario",
        title: "Đêm trước hạn duyệt của sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ Tư, bảng so sánh của bạn xong. Nhà C vẫn chưa trả lời câu hỏi về phí giao. Sáng mai sếp cần bản đề xuất.",
            choices: [
              { label: "Điền phí giao của C bằng mức của nhà B cho đủ bảng rồi gửi sếp", next: "bad_fill" },
              { label: "Ghi ô đó là \"chưa rõ, đã hỏi ngày 17\" và viết đề xuất kèm điều kiện", next: "s2" },
            ],
          },
          bad_fill: {
            text: "Sếp duyệt nhà C dựa trên bảng có vẻ đủ. Sau đó C báo phí giao cao gần gấp đôi B. Đơn đã ký, bạn phải giải thích vì sao con số trong bảng không phải của C.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đề xuất nhà B, ghi rõ C chưa xác nhận phí giao. Sáng hôm sau C mới trả lời, mức phí cao hơn bạn nghĩ.",
            choices: [
              { label: "Cập nhật ô của C, kiểm lại tổng, rồi báo sếp con số mới", next: "good" },
              { label: "Giữ nguyên đề xuất cũ, không báo sếp vì kết luận không đổi", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Kết luận đúng, nhưng sếp cầm bảng có ô \"chưa rõ\" đã cũ. Khi phòng kế toán hỏi số phí giao của C, không ai trả lời được từ tài liệu đã duyệt.",
            ending: "bad",
          },
          good: {
            text: "Bảng được cập nhật, tổng đối chiếu lại, sếp thấy rõ vì sao B vẫn hợp lý. Hồ sơ duyệt khớp với thực tế.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Cùng cơ sở, đối chiếu từng ô, nói rõ chỗ chưa chắc.",
          "Bài sau: đọc bảng tồn kho cuối tuần để tìm mặt hàng sắp hết.",
        ],
      },
    ],
  },
  {
    id: 2146,
    slug: "doc-bang-ton-kho-cuoi-tuan-tim-mat-hang-sap-het",
    title: "Chặng 37, Bài 7: Đọc bảng tồn kho cuối tuần, tìm mặt hàng sắp hết",
    subtitle: "Ba trăm dòng, một buổi chiều thứ Sáu: nhờ AI lọc, rồi tự đếm vài dòng để kiểm.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng tồn kho là loại tài liệu dài, nhiều số, và sai một dòng là hết hàng giữa tuần sau. AI lọc 300 dòng trong vài giây, nhưng con số nó lọc ra chỉ đáng tin khi bạn tự đếm thử vài ngăn hàng ngoài kho.",
    openingQuestion:
      "Chiều thứ Sáu, bạn có bảng tồn kho 300 dòng và nhờ AI \"lọc mặt hàng sắp hết\". AI trả về 14 mặt hàng. Điều gì cần làm trước khi gửi danh sách đó cho bộ phận mua hàng?",
    openingOptions: [
      "Chọn vài dòng và so số tồn trong bảng với số đếm thật ngoài kho",
      "Gửi luôn vì AI đã đọc cả 300 dòng nên chắc không sót dòng nào hết",
      "Hỏi lại AI \"bạn có chắc 14 mặt hàng không\" rồi gửi nếu nó xác nhận",
      "Cắt danh sách còn 5 mặt hàng đầu để bộ phận mua hàng dễ theo dõi",
    ],
    correctOption: 0,
    explanation:
      "Bảng tồn kho chỉ đúng bằng lần cập nhật gần nhất, và AI lọc theo đúng những gì bảng ghi. Nếu số tồn trong bảng lệch với thực tế, danh sách 14 mặt hàng vẫn trông rất gọn mà sai. Đếm thử vài ngăn ngoài kho là cách duy nhất nối bảng với thực tế. AI xác nhận lại chính nó không phải kiểm chứng, và cắt bớt danh sách chỉ giấu đi các mặt hàng có thật sự sắp hết.",
    diagram: [
      { label: "Bảng tồn kho cuối tuần", arrow: true },
      { label: "AI lọc mặt hàng dưới mức an toàn", arrow: true },
      { label: "Bạn đếm thử vài ngăn ngoài kho", arrow: true },
      { label: "Danh sách gửi mua hàng, ghi rõ ngày số liệu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng phân phối đồ uống có bảng tồn kho cập nhật mỗi thứ Sáu. Chị thủ kho nhờ AI lọc mặt hàng dưới mức an toàn, được 14 dòng. Chị đếm thử ba dòng ngoài kho, thấy một dòng bảng ghi 60 thùng nhưng thực tế còn 36 thùng vì một chuyến xuất chưa kịp nhập vào bảng. Chị sửa dòng đó và hỏi lại người nhập liệu. Đây là tình huống dựng lên để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "\"Mức an toàn\" của một mặt hàng trong kho là gì?",
        "Số lượng tối thiểu cần giữ để không đứt hàng khi chờ hàng về",
        [
          "Số lượng tối đa kho có thể chứa trên kệ",
          "Số lượng đã bán trong tuần trước cộng thêm phần dư cho đẹp số",
          "Số lượng khách đã đặt trước nhưng kho chưa giao",
        ],
        "Mức an toàn là ngưỡng dưới để còn hàng bán trong lúc chờ đơn nhập về. Sức chứa tối đa là chuyện khác. Số bán tuần trước chỉ là dữ liệu để tính ngưỡng, còn đơn khách đặt trước là hàng đã có chủ.",
      ),
      Q(
        "Một mặt hàng còn 240 cái, bán trung bình 30 cái mỗi ngày. Hàng đủ bán khoảng mấy ngày?",
        "8 ngày",
        [
          "7.200 ngày (= 240 × 30, nhân thay vì chia)",
          "270 ngày (= 240 + 30, cộng thay vì chia)",
          "210 ngày (= 240 − 30, trừ thay vì chia)",
        ],
        "Số ngày còn đủ bán là tồn chia tốc độ bán: 240 ÷ 30 = 8. Ba phương án còn lại là ba phép tính nhầm phép, và đều cho số ngày phi lý so với một kho thật.",
      ),
      Q(
        "AI lọc ra 14 mặt hàng dưới mức an toàn. Cách kiểm nhanh và đáng tin nhất là gì?",
        "Đếm thật vài ngăn hàng, rồi so từng ngăn với số ghi trong bảng",
        [
          "Nhờ AI lọc lại lần hai bằng cùng bảng để xem kết quả có giống không",
          "Kiểm tên cột xem AI đã đọc đúng cột số tồn chưa rồi tin phần còn lại",
          "Chỉ tin danh sách nếu có đủ 14 mặt hàng thuộc cùng một nhóm",
        ],
        "Chỉ số đếm thật mới nối bảng với thực tế. Lọc lần hai từ cùng bảng lặp lại đúng sai lệch cũ. Kiểm tên cột là bước đầu chứ chưa đủ. Nhóm hàng không nói gì về độ chính xác của số tồn.",
      ),
      Q(
        "Bảng ghi số tồn của một mặt hàng là 60, đếm thật được 36. Bạn làm gì?",
        "Ghi chênh lệch, sửa số và hỏi người nhập liệu nguyên nhân",
        [
          "Giữ số 60 trong bảng vì bảng là tài liệu chính thức của kho",
          "Sửa thành 48, lấy trung bình của số trong bảng và số đếm thật",
          "Xoá dòng đó khỏi danh sách để bảng không bị dòng lệch",
        ],
        "Số đếm thật là căn cứ; chênh lệch là dấu hiệu quy trình nhập liệu có chỗ hở, nên cần hỏi nguyên nhân. Trung bình hai số không phải số thật nào. Xoá dòng thì che đi đúng vấn đề đang cần sửa.",
      ),
      Q(
        "Vì sao nên ghi ngày của số liệu ngay đầu danh sách gửi mua hàng?",
        "Tồn kho đổi mỗi ngày, người đọc cần biết danh sách đúng tới lúc nào",
        [
          "Để AI hiểu bảng thuộc tuần nào khi bạn hỏi tiếp lần sau",
          "Để danh sách trông đầy đủ và chuyên nghiệp hơn khi trình sếp",
          "Vì quy định kế toán bắt buộc mọi danh sách kho phải có ngày",
        ],
        "Số tồn đúng tại một thời điểm; hôm sau có thể đã khác. Người mua hàng cần biết mình đang đọc số của ngày nào. Ngày không giúp AI nhớ, không làm bảng đẹp hơn, và không dựa trên một quy định nào mà bài này khẳng định.",
      ),
    ],
    keyTakeaways: [
      "Mức an toàn là ngưỡng dưới để không đứt hàng khi chờ hàng về.",
      "Số ngày còn đủ bán = tồn ÷ tốc độ bán mỗi ngày.",
      "AI lọc theo đúng những gì bảng ghi, kể cả khi bảng sai.",
      "Đếm thật vài ngăn hàng là cách nối bảng với thực tế.",
      "Ghi ngày của số liệu ở đầu danh sách gửi đi.",
    ],
    practicePrompt: {
      question:
        "Một mặt hàng tồn 90 cái, bán trung bình 15 cái mỗi ngày, hàng về mất 7 ngày. Nhận định nào đúng?",
      options: [
        "Đủ bán 6 ngày, ít hơn 7 ngày chờ hàng nên cần đặt ngay",
        "Đủ bán 105 ngày (= 90 + 15), không cần đặt trong tháng này",
        "Đủ bán 1.350 ngày (= 90 × 15), kho đang thừa hàng rất nhiều",
        "Đủ bán 75 ngày (= 90 − 15), đặt thêm cuối tháng là kịp",
      ],
      correct: 0,
      explanation:
        "90 ÷ 15 = 6 ngày, ít hơn 7 ngày chờ hàng, nên nếu chưa đặt thì sẽ đứt hàng ít nhất một ngày. Ba phương án còn lại dùng nhầm phép cộng, nhân, trừ thay cho phép chia.",
    },
    summary: {
      keyIdea: "Tìm hàng sắp hết là so số ngày còn đủ bán với số ngày chờ hàng về, trên số tồn đã kiểm.",
      formula: "Số ngày đủ bán = tồn ÷ bán mỗi ngày; nếu nhỏ hơn số ngày chờ hàng → đặt ngay.",
      commonMistake: "Tin số tồn trong bảng mà chưa đếm thử ngoài kho.",
      action: "Đếm thử ba mặt hàng ngoài kho và so với số trong bảng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bảng tồn kho hoặc bảng vật tư gần nhất của bạn (mẫu nhỏ 20-30 dòng cũng được, xoá thông tin nhạy cảm). Nhờ AI lọc các mặt hàng có số ngày đủ bán ít hơn số ngày chờ hàng, rồi tự đếm hoặc kiểm chứng ba dòng với số thật. Ghi lại dòng nào lệch.",
      secondary: "Ngày mai bạn sẽ được hỏi: trong ba dòng kiểm thử, có dòng nào số trong bảng lệch với số thật không?",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, bảng tồn kho 300 dòng nằm trên màn hình, và ai đó cần biết thứ Hai mặt hàng nào cần đặt. Bài này dạy bạn nhờ AI lọc nhanh, rồi kiểm bằng vài phút đếm thật.",
      },
      {
        type: "feynman",
        title: "Bảng tồn kho đơn giản hơn bạn nghĩ",
        intro: "Nhà bạn có tủ lạnh: bạn mở ra, thấy còn hai quả trứng và biết mai ăn sáng là hết. Bảng tồn kho là cái tủ lạnh đó, chỉ là có 300 ngăn.",
        columns: ["Thành phần", "Tủ lạnh trong bếp", "Bảng tồn kho"],
        rows: [
          ["Còn bao nhiêu", "Nhìn thấy hai quả trứng", "Cột số tồn của mặt hàng"],
          ["Ăn bao lâu hết", "Mỗi sáng ăn hai quả", "Bán trung bình mỗi ngày"],
          ["Mua bù khi nào", "Đi chợ mất nửa ngày, nên đi từ hôm trước", "Chờ hàng về mất số ngày nhất định"],
          ["Có nhìn nhầm không", "Mở tủ ra nhìn lại cho chắc", "Đếm thử vài ngăn ngoài kho"],
        ],
        oneLiner: "Hàng sắp hết là khi số ngày còn đủ bán ngắn hơn số ngày chờ hàng về.",
      },
      { type: "heading", text: "Một phép chia là đủ" },
      {
        type: "paragraph",
        text: "Số ngày đủ bán bằng tồn chia cho số bán mỗi ngày. Hai mặt hàng cùng còn 240 cái, nhưng một cái bán 10 cái mỗi ngày, cái kia bán 60 cái mỗi ngày: một cái đủ 24 ngày, cái kia chỉ 4. Nhìn số tồn không thôi thì cả hai giống nhau, nhìn tốc độ bán mới thấy cái nào nguy.",
      },
      {
        type: "chart",
        title: "Số ngày hàng còn đủ bán theo tốc độ bán mỗi ngày",
        caption: "Số liệu minh hoạ. Kéo thanh trượt số tồn và mức an toàn (tính bằng ngày chờ hàng). Đường xanh nằm dưới đường ngưỡng nghĩa là mặt hàng đó sẽ hết trước khi hàng về.",
        kind: "line",
        xLabel: "Bán mỗi ngày (cái)",
        yLabel: "Số ngày còn đủ bán",
        x: { from: 5, to: 60, step: 5 },
        params: [
          { id: "stock", label: "Số tồn hiện có", min: 60, max: 600, step: 10, value: 240, unit: "cái" },
          { id: "lead", label: "Số ngày chờ hàng về", min: 1, max: 21, step: 1, value: 7, unit: "ngày" },
        ],
        series: [
          { label: "Số ngày còn đủ bán", expr: "stock / x" },
          { label: "Số ngày chờ hàng về", expr: "lead" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lọc mặt hàng sắp hết từ bảng tồn kho",
        task: "Bạn dán bảng tồn kho cuối tuần. Lắp prompt để AI lọc đúng và nói rõ nó dựa vào đâu.",
        parts: [
          {
            id: "rule",
            label: "Tiêu chí lọc",
            options: [
              { text: "Cho tôi các mặt hàng sắp hết.", feedback: "\"Sắp hết\" không có ngưỡng, AI tự chọn ngưỡng và bạn không biết nó chọn gì." },
              { text: "Lọc mặt hàng có số tồn nhỏ hơn cột \"mức an toàn\" của chính dòng đó.", good: true, feedback: "Tiêu chí nằm trong bảng, kết quả kiểm lại được từng dòng." },
            ],
          },
          {
            id: "out",
            label: "Kết quả cần trả",
            options: [
              { text: "Cho danh sách gọn, chỉ ghi tên mặt hàng.", feedback: "Không có số tồn và mức an toàn thì bạn không thể đối chiếu từng dòng." },
              { text: "Trả bảng gồm mã hàng, tồn, mức an toàn, số dòng trong bảng gốc; đánh số thứ tự.", good: true, feedback: "Có số dòng gốc để bạn mở đúng chỗ kiểm." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu số tồn ở dòng nào lạ thì tự sửa cho hợp lý.", feedback: "AI sửa số theo cảm giác rồi bạn nhận số không ai kiểm được." },
              { text: "Không sửa số; dòng nào tồn trống hoặc âm thì liệt kê riêng cuối bảng.", good: true, feedback: "Số lạ lộ ra để bạn hỏi lại người nhập liệu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["rule", "out", "limit"],
            text: "| # | Mã hàng | Tồn | Mức an toàn | Dòng gốc |\n| 1 | NU-041 | 18 | 40 | 57 |\n| 2 | GI-112 | 6 | 25 | 133 |\n| 3 | BU-009 | 30 | 50 | 201 |\n\nDòng lạ, cần hỏi lại: dòng 88 (tồn âm), dòng 240 (tồn trống).",
          },
          {
            requires: ["rule"],
            text: "NU-041, GI-112, BU-009 sắp hết.\n\n(Đúng mặt hàng nhưng không có số tồn hay dòng gốc, bạn phải tự tìm lại từng cái để kiểm.)",
          },
          {
            text: "Các mặt hàng sắp hết: nước rửa tay, giấy A4, bút bi, băng keo, hộp carton.\n\n(AI không có ngưỡng rõ ràng nên chọn theo cảm giác và thêm cả mặt hàng có thể không có trong bảng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "AI đọc bảng đúng không có nghĩa là bảng đúng",
        text: "AI lọc chính xác theo những gì bảng ghi. Nếu bảng lỡ cập nhật sau chuyến xuất hàng, danh sách vẫn trông rất đúng mà vẫn sai. Đếm thật vài ngăn là bước duy nhất kiểm được lỗi này.",
      },
      {
        type: "list",
        items: [
          "Chọn ba đến năm dòng trong danh sách AI lọc, ưu tiên dòng giá trị cao.",
          "Chọn thêm một hoặc hai dòng AI không lọc ra, để kiểm có sót không.",
          "Đếm thật hoặc nhờ thủ kho xác nhận rồi ghi vào cột bên cạnh.",
          "Dòng nào lệch, hỏi người nhập liệu trước khi gửi danh sách.",
        ],
      },
      {
        type: "scenario",
        title: "Danh sách 14 mặt hàng trước giờ gửi",
        start: "s1",
        nodes: {
          s1: {
            text: "4 giờ chiều thứ Sáu, AI trả về 14 mặt hàng dưới mức an toàn. Bộ phận mua hàng cần danh sách trước 5 giờ.",
            choices: [
              { label: "Gửi ngay vì đã có danh sách đầy đủ và còn kịp giờ", next: "bad_send" },
              { label: "Đếm thử ba mặt hàng ngoài kho rồi mới gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Danh sách gửi đi đúng giờ. Thứ Hai kho phát hiện hai mặt hàng trong danh sách vẫn còn nhiều, và một mặt hàng không có trong danh sách đã hết sạch.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đếm ba mặt hàng, một dòng bảng ghi 60 nhưng thực tế còn 36. Còn 30 phút.",
            choices: [
              { label: "Sửa dòng đó, ghi chú lệch và gửi danh sách kèm ngày số liệu", next: "good" },
              { label: "Kiểm cả 300 dòng ngoài kho cho chắc trước khi gửi", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Bạn không thể kiểm hết 300 dòng trong 30 phút. Quá 5 giờ, bộ phận mua hàng đã tan làm và đơn đặt hàng trễ sang tuần sau.",
            ending: "bad",
          },
          good: {
            text: "Danh sách gửi đúng giờ, có ghi chú dòng đã sửa và ngày số liệu. Bộ phận mua hàng biết chỗ nào đã kiểm, chỗ nào chưa.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI lọc nhanh; bạn đếm thử để biết bảng có khớp với kho.",
          "Bài sau: dự trù lượng đặt từ lịch sử bán, không cần công thức cao siêu.",
        ],
      },
    ],
  },
  {
    id: 2147,
    slug: "du-tru-dat-hang-tu-lich-su-ban-don-gian",
    title: "Chặng 37, Bài 8: Dự trù lượng đặt từ lịch sử bán, không cần công thức cao siêu",
    subtitle: "Trung bình bán mỗi tuần, cộng một phần dự phòng, trừ số đang tồn: ba bước là đủ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📈",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đặt thừa thì vốn nằm trong kho, hàng có thể hết hạn hay lỗi mốt. Đặt thiếu thì khách quay lưng. Bạn không cần mô hình dự báo phức tạp: một phép trung bình, một hệ số dự phòng bạn tự chọn và một phép trừ đã giải quyết phần lớn việc hằng tuần.",
    openingQuestion:
      "Bạn có số bán 12 tuần của một mặt hàng và nhờ AI \"dự đoán tuần sau bán bao nhiêu\". AI trả lời: \"Chính xác 1.237 cái\". Bạn nên hiểu con số đó thế nào?",
    openingOptions: [
      "Một ước lượng dựa trên lịch sử, cần thêm dự phòng vì tương lai còn đổi",
      "Con số chắc chắn vì AI đã tính từ đủ 12 tuần dữ liệu thật",
      "Con số nên lấy tròn lên 1.300 để cho an toàn và dễ nhớ, không cần dự phòng",
      "Con số vô giá trị vì AI không thể dự đoán được việc gì cả",
    ],
    correctOption: 0,
    explanation:
      "Lịch sử cho bạn một xu hướng, không cho bạn tương lai. Con số có bốn chữ số nghe rất chính xác nhưng chỉ là trung bình của quá khứ, chưa tính tuần có khuyến mại, thời tiết, hay đối thủ đổi giá. Vì vậy cần thêm phần dự phòng do bạn chọn. Coi nó là chắc chắn là ngộ nhận độ chính xác. Làm tròn lên tuỳ hứng cũng là một hệ số dự phòng, chỉ là chưa ai chọn có chủ ý. Bỏ hẳn thì phí dữ liệu 12 tuần bạn đã có.",
    diagram: [
      { label: "Lấy số bán 12 tuần, tính trung bình mỗi tuần", arrow: true },
      { label: "Nhân với số tuần muốn đủ hàng", arrow: true },
      { label: "Cộng dự phòng theo hệ số bạn chọn", arrow: true },
      { label: "Trừ số đang tồn, phần còn lại là lượng đặt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng mỹ phẩm có 12 tuần lịch sử bán của một loại kem chống nắng, tổng 1.200 hộp. Trung bình 100 hộp mỗi tuần, tồn hiện có 80 hộp, muốn đủ hàng 2 tuần, chọn dự phòng 20%. Lượng đặt là 100 × 2 × 1,2 − 80 = 160 hộp. Đây là tình huống dựng lên để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Bán 12 tuần được tổng 1.200 hộp. Trung bình mỗi tuần là bao nhiêu?",
        "100 hộp",
        [
          "14.400 hộp (= 1.200 × 12, nhân thay vì chia)",
          "1.188 hộp (= 1.200 − 12, trừ thay vì chia)",
          "1.212 hộp (= 1.200 + 12, cộng thay vì chia)",
        ],
        "Trung bình là tổng chia số kỳ: 1.200 ÷ 12 = 100. Nhân, trừ, cộng đều cho một số lớn hơn nhiều mức bán thật của một tuần và sai về ý nghĩa.",
      ),
      Q(
        "Bán trung bình 100 hộp mỗi tuần, muốn đủ 2 tuần, dự phòng 20%, đang tồn 80. Lượng đặt là bao nhiêu?",
        "160 hộp",
        [
          "120 hộp (= 100 × 2 − 80, quên dự phòng)",
          "240 hộp (= 100 × 2 × 1,2, quên trừ số đang tồn)",
          "140 hộp (= 100 × 2 + 20 − 80, cộng 20 thay vì nhân 1,2)",
        ],
        "Nhu cầu 2 tuần có dự phòng là 100 × 2 × 1,2 = 240, trừ 80 đang tồn còn 160. Ba đáp án còn lại lần lượt bỏ bước dự phòng, bỏ bước trừ tồn, hoặc cộng 20 hộp thay vì tăng 20%.",
      ),
      Q(
        "Trong 12 tuần có một tuần khuyến mại bán 400 hộp, các tuần còn lại khoảng 100. Bạn xử lý thế nào?",
        "Tách tuần khuyến mại ra, tính trung bình các tuần thường còn lại",
        [
          "Giữ nguyên cả 12 tuần vì bỏ bớt dữ liệu là làm sai kết quả",
          "Xoá luôn tuần đó và không nhắc tới trong báo cáo đặt hàng",
          "Lấy tuần 400 hộp làm mức chuẩn để không bao giờ bị thiếu hàng",
        ],
        "Tuần khuyến mại kéo trung bình lên cao hơn mức bán thường, làm bạn đặt thừa những tuần thường. Nên xem riêng, và khi tuần sau có khuyến mại thì dùng số của nó. Xoá âm thầm thì mất thông tin, lấy 400 làm chuẩn thì đặt gấp bốn nhu cầu thường.",
      ),
      Q(
        "Điều gì xảy ra nếu hệ số dự phòng bạn chọn quá cao?",
        "Đặt thừa, vốn nằm trong kho và hàng có nguy cơ tồn lâu",
        [
          "Không có hậu quả gì, vì hàng thừa luôn bán được vào tuần sau",
          "Kho hết hàng thường xuyên hơn vì bị quá tải kệ chứa",
          "Nhà cung cấp tự động giảm giá cho những đơn đặt lớn hơn",
        ],
        "Dự phòng quá cao nghĩa là mua nhiều hơn nhu cầu. Vốn kẹt trong hàng, và với hàng có hạn dùng thì có thể phải bỏ. \"Luôn bán được\" là giả định chưa kiểm. Hết hàng là hậu quả của dự phòng quá thấp, còn chuyện giảm giá là quyết định của nhà cung cấp, không tự sinh ra.",
      ),
      Q(
        "AI nói \"tuần sau bán chính xác 1.237 cái\". Bạn nên xử lý con số đó thế nào?",
        "Coi là ước lượng và cộng thêm dự phòng do bạn chọn",
        [
          "Đặt đúng 1.237 vì AI đã tính từ dữ liệu bạn đưa",
          "Làm tròn xuống 1.200 vì số chẵn dễ kiểm hơn",
          "Bỏ hẳn con số và đặt theo cảm giác của người đã làm lâu",
        ],
        "Tương lai còn đổi nên con số chính xác tới hàng đơn vị chỉ là độ chính xác giả. Nó là điểm xuất phát, dự phòng là phần bạn tự chịu trách nhiệm chọn. Làm tròn xuống làm dự phòng âm, còn bỏ dữ liệu vì cảm giác là phí công đã tính.",
      ),
    ],
    keyTakeaways: [
      "Lượng đặt = trung bình × số tuần cần × (1 + dự phòng) − số đang tồn.",
      "Tuần khuyến mại bất thường nên tách ra, đừng để nó kéo trung bình.",
      "Dự phòng cao gây kẹt vốn, dự phòng thấp gây đứt hàng: hệ số là quyết định của bạn.",
      "Con số dự đoán từ AI là ước lượng, dù nó ghi tới hàng đơn vị.",
      "Ghi giả định vào ngay dưới bảng để người khác kiểm được.",
    ],
    practicePrompt: {
      question:
        "Trung bình 50 cái mỗi tuần, muốn đủ 4 tuần, dự phòng 10%, đang tồn 30. Lượng đặt là bao nhiêu?",
      options: [
        "190 cái",
        "170 cái (= 50 × 4 − 30, quên dự phòng)",
        "220 cái (= 50 × 4 × 1,1, quên trừ số đang tồn)",
        "180 cái (= 50 × 4 + 10 − 30, cộng 10 thay vì nhân 1,1)",
      ],
      correct: 0,
      explanation:
        "50 × 4 = 200; nhân 1,1 được 220; trừ 30 đang tồn còn 190. Các lựa chọn khác bỏ bước dự phòng, bỏ bước trừ tồn hoặc cộng 10 thay vì nhân 1,1.",
    },
    summary: {
      keyIdea: "Dự trù đặt hàng là trung bình quá khứ, cộng một phần dự phòng bạn chọn, trừ số đang có.",
      formula: "Đặt = trung bình tuần × số tuần × (1 + dự phòng) − tồn.",
      commonMistake: "Để một tuần khuyến mại kéo cao mức trung bình, hoặc quên trừ số đang tồn.",
      action: "Tính lượng đặt cho một mặt hàng và ghi giả định (số tuần, hệ số dự phòng).",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một mặt hàng bạn thật sự đặt lặp lại. Lấy số bán 8-12 tuần gần nhất, tách các tuần bất thường, tính trung bình rồi tính lượng đặt cho 2 tuần với dự phòng 10% và 25%. Nhờ AI kiểm phép tính rồi bạn tự làm lại bằng máy tính hoặc bảng tính để so.",
      secondary: "Ngày mai bạn sẽ được hỏi: bạn chọn hệ số dự phòng nào, và vì sao?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn cần đặt hàng cho hai tuần tới và có trong tay số bán 12 tuần. Không cần công thức dự báo phức tạp: bài này chỉ cần trung bình, một hệ số bạn tự chọn và phép trừ.",
      },
      {
        type: "feynman",
        title: "Dự trù lượng đặt đơn giản hơn bạn nghĩ",
        intro: "Nhà bạn ăn trung bình một bao gạo 10 ký mỗi tháng, hôm nay còn 3 ký, và tháng sau nhà có khách nên bạn mua dư một chút. Đó là dự trù đặt hàng, chỉ khác là kho nhiều mặt hàng hơn.",
        columns: ["Thành phần", "Mua gạo cho gia đình", "Đặt hàng cho kho"],
        rows: [
          ["Mức dùng thường ngày", "Trung bình 10 ký mỗi tháng", "Trung bình bán mỗi tuần"],
          ["Đang có", "Còn 3 ký trong thùng", "Số tồn hiện tại"],
          ["Phần dự phòng", "Mua dư vì có khách", "Hệ số dự phòng do bạn chọn"],
          ["Mua thêm bao nhiêu", "Cần đủ cho cả tháng trừ số còn lại", "Đặt = nhu cầu có dự phòng − tồn"],
        ],
        oneLiner: "Dự trù đặt hàng là mức dùng thường ngày cộng phần dự phòng rồi trừ phần đang có.",
      },
      { type: "heading", text: "Ba bước và một quyết định của bạn" },
      {
        type: "paragraph",
        text: "Bước một tính trung bình bán mỗi tuần, tách tuần khuyến mại. Bước hai nhân với số tuần bạn muốn đủ hàng và với hệ số dự phòng. Bước ba trừ số đang tồn. Hệ số dự phòng là chỗ duy nhất cần phán đoán: cao thì đặt thừa, thấp thì dễ đứt hàng.",
      },
      {
        type: "chart",
        title: "Lượng hàng cần đặt theo mức dự phòng",
        caption: "Số liệu minh hoạ. Kéo thanh trượt trung bình bán mỗi tuần, số tuần cần đủ hàng và số đang tồn. Đường thứ hai cho biết lượng cần nếu thực tế bán tăng 20%: nếu đường xanh nằm dưới nó, bạn dự phòng chưa đủ.",
        kind: "line",
        xLabel: "Mức dự phòng (%)",
        yLabel: "Lượng cần đặt (cái)",
        x: { from: 0, to: 50, step: 5 },
        params: [
          { id: "avg", label: "Trung bình bán mỗi tuần", min: 20, max: 300, step: 10, value: 100, unit: "cái" },
          { id: "weeks", label: "Số tuần muốn đủ hàng", min: 1, max: 6, step: 1, value: 2, unit: "tuần" },
          { id: "stock", label: "Số đang tồn", min: 0, max: 400, step: 10, value: 80, unit: "cái" },
        ],
        series: [
          { label: "Lượng đặt theo mức dự phòng", expr: "max(0, avg * weeks * (1 + x / 100) - stock)" },
          { label: "Lượng cần nếu bán tăng 20%", expr: "max(0, avg * weeks * 1.2 - stock)" },
        ],
      },
      {
        type: "list",
        items: [
          "Tách tuần khuyến mại hoặc tuần đặc biệt ra khỏi phép trung bình.",
          "Chọn số tuần muốn đủ hàng bằng thời gian chờ hàng về cộng một chút.",
          "Chọn hệ số dự phòng và ghi lại: 10%, 20% hay 30%.",
          "Trừ số đang tồn và số đã đặt nhưng chưa về.",
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI tính, bạn vẫn tự kiểm",
        text: "AI có thể tính trung bình và lượng đặt trong vài giây, nhưng là phép tính nên có thể sai. Chạy lại đúng một mặt hàng bằng máy tính hoặc bảng tính rồi so với số AI trả. Chỉ cần lệch một con số là bạn biết phải tự tính cả bảng.",
      },
      {
        type: "scenario",
        title: "Tuần trước lễ, đặt bao nhiêu",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi lượng đặt cho mặt hàng bán chạy trước dịp lễ. Trung bình 100 cái mỗi tuần, tồn 80. Năm ngoái dịp lễ này bán nhiều hơn khoảng một phần ba so với tuần thường.",
            choices: [
              { label: "Đặt theo trung bình 12 tuần, không dự phòng, vì đó là số liệu thật", next: "bad_short" },
              { label: "Đặt theo trung bình cộng dự phòng khoảng 30%, rồi ghi giả định", next: "s2" },
            ],
          },
          bad_short: {
            text: "Dịp lễ bán tăng đúng như năm ngoái. Kho hết hàng vào ngày thứ ba, khách chuyển sang mua nơi khác.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đặt 100 × 2 × 1,3 − 80 = 180 cái. Sếp hỏi: \"Sao dự phòng 30%?\"",
            choices: [
              { label: "Nói rõ giả định: năm ngoái dịp lễ tăng khoảng một phần ba, và đây là ước lượng", next: "good" },
              { label: "Nói \"máy tính ra con số này, em không rõ tại sao\"", next: "bad_blank" },
            ],
          },
          bad_blank: {
            text: "Sếp không còn tin vào con số và giữ đơn lại chờ kiểm. Hàng về muộn, và dịp lễ đã qua nửa chừng.",
            ending: "bad",
          },
          good: {
            text: "Sếp thấy giả định rõ, duyệt đơn. Sau lễ bạn so số bán thật với 30% để chỉnh hệ số cho năm sau.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI tính lượng đặt cho một mặt hàng",
        task: "Bạn có số bán 12 tuần của một mặt hàng. Lắp prompt để AI tính lượng đặt và nêu rõ giả định.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              { text: "Kem chống nắng bán tốt, đặt giúp tôi bao nhiêu?", feedback: "Không có số bán, AI sẽ tự bịa mức bán rồi tính trên số bịa." },
              { text: "Số bán 12 tuần: (dán số). Tuần 7 là tuần khuyến mại. Tồn hiện tại 80.", good: true, feedback: "Có số thật, đánh dấu tuần bất thường và số tồn - đủ để tính." },
            ],
          },
          {
            id: "rule",
            label: "Cách tính",
            options: [
              { text: "Tính giúp lượng đặt hợp lý nhất.", feedback: "\"Hợp lý\" không có công thức, AI chọn phương pháp bạn không biết." },
              { text: "Trung bình các tuần trừ tuần 7, nhân 2 tuần, dự phòng 20%, trừ tồn. Ghi từng bước.", good: true, feedback: "Công thức nằm ngay trong lệnh, và từng bước bạn kiểm được." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu thấy số liệu lạ thì tự điều chỉnh cho hợp lý.", feedback: "AI sửa số theo cảm giác và bạn mất dấu vết." },
              { text: "Không tự sửa số; nếu có dòng lạ thì liệt kê để tôi kiểm.", good: true, feedback: "Số lạ hiện ra thành câu hỏi thay vì bị sửa ngầm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "rule", "limit"],
            text: "Trung bình 11 tuần thường: 1.100 ÷ 11 = 100 hộp.\nNhu cầu 2 tuần: 100 × 2 = 200; dự phòng 20%: 200 × 1,2 = 240.\nTrừ tồn 80: lượng đặt 160 hộp.\nGiả định: tuần 7 bị loại; dự phòng 20% do bạn chọn.",
          },
          {
            requires: ["data"],
            text: "Bạn nên đặt khoảng 150-200 hộp.\n\n(Có số thật nhưng không nói cách tính, bạn không kiểm được.)",
          },
          {
            text: "Dựa trên xu hướng thị trường, bạn nên đặt 300 hộp cho mùa nắng.\n\n(AI không có số bán của bạn nên nói theo xu hướng chung.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Trung bình, dự phòng, trừ tồn: ba bước là đủ, và giả định do bạn chọn.",
          "Bài sau: nhận ra dòng tồn kho AI đọc sai đơn vị thùng và cái.",
        ],
      },
    ],
  },
  {
    id: 2148,
    slug: "nhan-ra-dong-ton-kho-do-ai-nhap-sai-don-vi",
    title: "Chặng 37, Bài 9: Nhận ra dòng tồn kho AI đọc sai đơn vị thùng và cái",
    subtitle: "\"Thùng 24\" là loại thùng chứa 24 cái, không phải 24 thùng: một chữ hiểu nhầm, sai cả đơn đặt.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Kho tính bằng thùng, hộp, cái, chai, kiện. Một chữ đọc nhầm đơn vị làm số lượng lệch hàng chục lần, và AI hay nhầm đúng chỗ này vì các chữ trong bảng trông rất giống nhau. Ba phút soi đơn vị trước khi gửi đơn rẻ hơn nhiều so với một xe hàng sai.",
    openingQuestion:
      "Bảng gốc ghi \"Nước suối 500ml - thùng 24 - tồn 30\". AI tóm tắt: \"Nước suối 500ml: 24 thùng, tồn 30\". Lỗi nằm ở đâu?",
    openingOptions: [
      "AI đọc \"thùng 24\" là 24 thùng, trong khi đó là loại thùng chứa 24 chai",
      "AI đọc sai số tồn, đáng ra phải là 24 thay vì 30",
      "AI ghi sai loại nước, đáng ra phải là nước suối 1 lít",
      "Không có lỗi, vì 24 thùng và thùng 24 có cùng ý nghĩa với nhau",
    ],
    correctOption: 0,
    explanation:
      "\"Thùng 24\" là cách gọi loại đóng gói: mỗi thùng có 24 chai. Số 24 mô tả thùng, còn tồn 30 nghĩa là 30 thùng, tức 720 chai. AI đọc số 24 như số lượng nên bản tóm tắt nói 24 thùng và tồn 30 không rõ đơn vị nào. Không có gì sai ở số tồn hay loại nước; và hai cách diễn đạt không hề giống nhau: 24 thùng là 576 chai, còn thùng 24 với tồn 30 là 720 chai.",
    diagram: [
      { label: "Bảng gốc ghi quy cách đóng gói", arrow: true },
      { label: "AI tóm tắt, có thể lẫn số lượng với quy cách", arrow: true },
      { label: "Bạn soi từng đơn vị: thùng, hộp, cái", arrow: true },
      { label: "Quy đổi về một đơn vị trước khi đặt hàng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên mua hàng nhờ AI tóm tắt bảng tồn: bút bi \"hộp 20\", tồn 12. AI viết \"bút bi 20 hộp, tồn 12\". Nhân viên soi lại, thấy 20 là số cây mỗi hộp: 12 hộp là 240 cây. Nếu đặt bù theo bản AI, họ có thể đặt 20 hộp trong khi thật ra chỉ cần 5. Đây là tình huống dựng lên để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Bảng ghi \"Nước suối 500ml, thùng 24, tồn 30\". Kho đang có bao nhiêu chai?",
        "720 chai",
        [
          "54 chai (= 30 + 24, cộng thay vì nhân)",
          "30 chai (coi số tồn 30 là số chai)",
          "1,25 chai (= 30 ÷ 24, chia thay vì nhân)",
        ],
        "Tồn 30 thùng, mỗi thùng 24 chai nên 30 × 24 = 720. Cộng cho ra một số quá nhỏ, giữ nguyên 30 là quên đổi đơn vị, và chia thì cho ra một chai lẻ vô lý.",
      ),
      Q(
        "Vì sao AI dễ đọc nhầm \"thùng 24\" thành \"24 thùng\"?",
        "Chữ và số đứng cạnh nhau, AI không biết số đó là quy cách hay số lượng",
        [
          "Vì AI chỉ đọc được số, không đọc được chữ trong bảng",
          "Vì bảng viết tiếng Việt, AI nào cũng sai khi gặp tiếng Việt",
          "Vì \"thùng\" và \"cái\" là hai chữ AI chưa từng gặp bao giờ",
        ],
        "AI đọc chữ theo ngữ cảnh gần nhất, và cụm \"thùng 24\" có thể hiểu theo hai cách. Nó đọc được cả chữ lẫn số, xử lý tiếng Việt khá tốt, và gặp chữ \"thùng\" rất nhiều lần; lỗi ở chỗ nhập nhằng chứ không ở việc chưa từng thấy.",
      ),
      Q(
        "Cách tốt nhất để tránh nhầm quy cách khi nhờ AI đọc bảng là gì?",
        "Yêu cầu AI ghi số và đơn vị riêng, kèm quy đổi ra đơn vị nhỏ nhất",
        [
          "Yêu cầu AI đọc chậm hơn và cẩn thận hơn trước khi trả lời",
          "Chỉ đưa cho AI cột số, còn cột chữ bạn tự đọc lấy",
          "Xoá cột quy cách đi cho bảng gọn rồi mới đưa cho AI",
        ],
        "Tách đơn vị khỏi số và quy đổi về đơn vị nhỏ nhất làm mọi con số cùng cơ sở, dễ kiểm. \"Đọc chậm hơn\" không phải một chỉ dẫn AI làm được có hệ thống. Bỏ cột chữ hay quy cách đi thì mất chính thông tin gây nhầm.",
      ),
      Q(
        "Bảng ghi \"hộp 20\", tồn 12. Muốn có ít nhất 300 cây bút thì cần đặt thêm tối thiểu mấy hộp?",
        "3 hộp",
        [
          "15 hộp (= 300 ÷ 20, quên trừ số đang tồn)",
          "288 hộp (= 300 − 12, coi cây như hộp)",
          "25 hộp (= 300 ÷ 12, chia cho số tồn)",
        ],
        "Đang có 12 × 20 = 240 cây; thiếu 60 cây; 60 ÷ 20 = 3 hộp. Ba phương án còn lại quên đang có, nhầm cây với hộp, hoặc chia cho số tồn thay vì quy cách.",
      ),
      Q(
        "AI trả bản tóm tắt tồn kho. Cách soi đơn vị hiệu quả nhất là gì?",
        "Với mỗi dòng, hỏi: con số này đếm cái gì, thùng hay chai",
        [
          "Soát chính tả và cách viết hoa tên mặt hàng trong bản tóm tắt",
          "Đếm xem bản tóm tắt có đủ số dòng như bảng gốc không",
          "So tổng số của bản tóm tắt với tổng số của bảng gốc",
        ],
        "Lỗi đơn vị nằm ở nghĩa của con số, nên phải hỏi từng số đếm cái gì. Chính tả và số dòng không nói gì về đơn vị. Tổng số cũng vô ích khi hai bên cộng cùng loại số nhầm đơn vị.",
      ),
    ],
    keyTakeaways: [
      "\"Thùng 24\" là quy cách: mỗi thùng có 24 cái; \"24 thùng\" là số lượng.",
      "AI hay nhầm quy cách với số lượng khi chữ và số đứng cạnh nhau.",
      "Ghi số và đơn vị riêng, quy đổi về đơn vị nhỏ nhất trước khi tính.",
      "Với mỗi con số, hỏi: nó đếm cái gì.",
      "Sai đơn vị làm lệch hàng chục lần, không phải vài phần trăm.",
    ],
    practicePrompt: {
      question:
        "Bảng gốc: \"Bút bi xanh, hộp 20, tồn 12\". Bản AI tóm tắt: \"Bút bi xanh 20 hộp, tồn 12 cây\". Chỗ nào sai?",
      options: [
        "AI đảo đơn vị: 20 là số cây mỗi hộp, và 12 là số hộp",
        "AI ghi sai màu, đáng ra phải là bút bi đỏ chứ không phải xanh",
        "AI đúng về số hộp, chỉ thiếu ghi chú về hạn dùng của bút",
        "AI đúng hoàn toàn, vì 12 cây và 12 hộp là cách viết khác nhau của cùng một số lượng",
      ],
      correct: 0,
      explanation:
        "Bảng ghi 12 hộp, mỗi hộp 20 cây, tức 240 cây. AI hoán đổi hai số và gán sai đơn vị nên nói 20 hộp và 12 cây. Màu không thay đổi, hạn dùng không được nhắc, và 12 cây khác xa 12 hộp.",
    },
    summary: {
      keyIdea: "Trước khi tin một con số trong kho, hỏi nó đếm thùng, hộp hay cái.",
      formula: "Số cái = số thùng × số cái mỗi thùng.",
      commonMistake: "Đọc quy cách đóng gói như một số lượng.",
      action: "Đưa AI ba dòng bảng có đơn vị lẫn và yêu cầu quy đổi ra đơn vị nhỏ nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 10 dòng bảng tồn kho hoặc danh mục hàng của bạn có ghi quy cách (thùng, hộp, lốc, kiện). Nhờ AI ghi lại thành cột riêng: số lượng, đơn vị, quy cách và tổng số cái. Sau đó bạn tự tính lại 3 dòng bằng máy tính.",
      secondary: "Ngày mai bạn sẽ được hỏi: có dòng nào AI đọc sai đơn vị không?",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng kho ghi \"thùng 24\", \"hộp 20\", \"lốc 6\". Người trong nghề đọc là hiểu; AI thì có thể đọc thành 24 thùng. Bài này dạy bạn soi đúng chỗ dễ nhầm nhất trước khi con số đi vào đơn đặt hàng.",
      },
      {
        type: "feynman",
        title: "Đơn vị và quy cách đơn giản hơn bạn nghĩ",
        intro: "Bạn mua một lốc sữa 4 hộp. Nếu ai đó nói \"lốc 4, tồn 10\", bạn hiểu ngay có 10 lốc, mỗi lốc 4 hộp, tổng 40 hộp. Máy đọc chữ thì không phải lúc nào cũng thấy điều bạn thấy.",
        columns: ["Thành phần", "Lốc sữa ở siêu thị", "Bảng tồn kho"],
        rows: [
          ["Quy cách", "Mỗi lốc có 4 hộp", "Thùng 24: mỗi thùng có 24 chai"],
          ["Số lượng", "Mua 10 lốc", "Tồn 30 thùng"],
          ["Tổng số cái", "10 × 4 = 40 hộp", "30 × 24 = 720 chai"],
          ["Nhầm quy cách với số lượng", "Tưởng có 4 lốc", "Tưởng có 24 thùng"],
        ],
        oneLiner: "Quy cách là số cái trong một thùng, số lượng là số thùng: đừng lẫn hai số đó.",
      },
      { type: "heading", text: "Bốn cách đơn vị bị đọc nhầm" },
      {
        type: "paragraph",
        text: "Một là quy cách thành số lượng (thùng 24 thành 24 thùng). Hai là đảo số: hộp 20, tồn 12 thành 20 hộp, 12 cây. Ba là bỏ quên đơn vị: 30 thành 30 chai. Bốn là lẫn hai đơn vị trong cùng một cột. Mỗi cách đều làm số lệch cả chục lần chứ không phải vài phần trăm.",
      },
      {
        type: "flow",
        title: "Soi đơn vị từng dòng một",
        steps: [
          { label: "Đọc dòng gốc", detail: "Đọc nguyên văn dòng trong bảng gốc: tên hàng, quy cách, số lượng." },
          { label: "Đọc dòng AI tóm tắt", detail: "Đặt dòng AI viết cạnh dòng gốc và hỏi: mỗi con số đếm cái gì, thùng hay cái?" },
          { label: "So từng số và từng đơn vị", detail: "Số nào của quy cách, số nào của số lượng. Nếu AI đảo hoặc lẫn thì đánh dấu." },
          { label: "Quy đổi về đơn vị nhỏ nhất", detail: "Nhân số thùng với số cái mỗi thùng để có tổng số cái, rồi mới so, cộng hay đặt hàng." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt tồn kho AI viết",
        task: "Bảng gốc ghi: \"Nước suối 500ml, thùng 24, tồn 30\"; \"Bút bi xanh, hộp 20, tồn 12\"; \"Giấy A4, ream 500 tờ, tồn 50\"; \"Băng keo trong, tồn 8 cuộn\". Đánh dấu những câu AI viết sai.",
        segments: [
          { text: "Bản tóm tắt tồn kho tuần này gồm bốn mặt hàng." },
          {
            text: "Nước suối 500ml: tồn 24 thùng.",
            error: "Bảng gốc ghi \"thùng 24\" và tồn 30 - tức 30 thùng, mỗi thùng 24 chai. AI lấy quy cách 24 làm số lượng.",
          },
          {
            text: "Bút bi xanh: tồn 20 hộp, mỗi hộp 12 cây.",
            error: "AI đảo hai số: gốc là hộp 20 cây, tồn 12 hộp. Đúng phải là 12 hộp, mỗi hộp 20 cây.",
          },
          { text: "Giấy A4: tồn 50 ream, mỗi ream 500 tờ." },
          { text: "Băng keo trong: tồn 8 cuộn." },
          {
            text: "Tổng cả bốn mặt hàng là 82 thùng.",
            error: "Cộng thùng nước, hộp bút, ream giấy và cuộn băng keo vào cùng một số \"thùng\" là lẫn bốn đơn vị khác nhau.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng dựa vào tổng để phát hiện lỗi đơn vị",
        text: "Nếu hai bên cùng cộng một loại số đã nhầm đơn vị, tổng của bảng gốc và tổng của bản tóm tắt vẫn có thể bằng nhau. Cách duy nhất là hỏi từng con số: nó đếm cái gì.",
      },
      {
        type: "list",
        items: [
          "Yêu cầu AI ghi cột riêng: số lượng, đơn vị, quy cách, tổng số cái.",
          "Không cộng các số khác đơn vị vào cùng một tổng.",
          "Tự tính lại ít nhất hai dòng bằng máy tính.",
          "Dòng nào AI ghi \"không rõ đơn vị\" thì hỏi người nhập bảng, đừng đoán.",
        ],
      },
      {
        type: "scenario",
        title: "Đơn đặt bù nước suối",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng gốc ghi nước suối \"thùng 24, tồn 30\". AI tóm tắt \"tồn 24 thùng\". Bạn cần đặt bù để đủ 1.000 chai.",
            choices: [
              { label: "Dựa theo bản AI: có 24 thùng, tức 576 chai, đặt bù thêm phần còn thiếu", next: "bad_wrong" },
              { label: "Soi lại bảng gốc: có 30 thùng, tức 720 chai, rồi tính phần thiếu", next: "s2" },
            ],
          },
          bad_wrong: {
            text: "Bạn tính thiếu 424 chai và đặt dư, vì thực tế kho có 720 chai, chỉ thiếu 280. Hàng thừa nằm trong kho hàng tháng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy thiếu 1.000 − 720 = 280 chai. Mỗi thùng 24 chai nên 280 ÷ 24 xấp xỉ 11,7 thùng.",
            choices: [
              { label: "Đặt 12 thùng vì không đặt được thùng lẻ", next: "good" },
              { label: "Đặt 11 thùng cho vừa số, thiếu bao nhiêu thì tính sau", next: "bad_short" },
            ],
          },
          bad_short: {
            text: "11 thùng chỉ được 264 chai, thiếu 16 chai so với nhu cầu. Đến ngày giao hàng bạn phải xin thêm một đơn nhỏ, phí giao tính lại.",
            ending: "bad",
          },
          good: {
            text: "12 thùng được 288 chai, tổng 1.008 chai, đủ nhu cầu. Đơn khớp với số đếm thật.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi con số trong kho đều nên trả lời được: đếm cái gì?",
          "Bài sau: chấm điểm nhà cung cấp theo tiêu chí bạn tự đặt.",
        ],
      },
    ],
  },
  {
    id: 2149,
    slug: "cham-diem-nha-cung-cap-bang-tieu-chi-cua-ban",
    title: "Chặng 37, Bài 10: Chấm điểm nhà cung cấp theo tiêu chí bạn tự đặt",
    subtitle: "Ba nhà cung cấp làm việc nhiều năm mà chưa ai chấm điểm: bạn đặt thước đo, AI dựng bảng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "⭐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhà cung cấp lâu năm thường được giữ vì quen chứ không vì có số liệu. Một bảng điểm đơn giản, dựa trên số đơn giao đúng hẹn, số đơn lỗi và thời gian phản hồi, biến cảm giác thành thứ có thể đem ra bàn khi đàm phán hay đổi nhà cung cấp.",
    openingQuestion:
      "Bạn có ba nhà cung cấp lâu năm và muốn chấm điểm. Bạn nhờ AI: \"Chấm điểm giúp tôi ba nhà cung cấp này.\" Điều gì làm bảng điểm đó đáng ngờ nhất?",
    openingOptions: [
      "Điểm số do AI tự nghĩ ra vì bạn chưa đưa tiêu chí và số liệu thật",
      "AI chấm điểm quá nghiêm khắc so với mức bạn đang quen thấy, nên cần chấm lại",
      "Bảng điểm ghi bằng thang 10 thay vì thang 100 như công ty dùng",
      "AI chỉ chấm được nhà cung cấp trong nước, không chấm nhà ngoài",
    ],
    correctOption: 0,
    explanation:
      "Không có tiêu chí và số liệu thì AI chỉ có thể viết ra những con số nghe hợp lý, như một thực tập sinh bị hỏi về công ty chưa từng làm việc cùng. Điểm nghe có vẻ thật nhưng không có nguồn nào để kiểm. Thang điểm 10 hay 100 chỉ là cách trình bày, và AI không có phân biệt trong nước hay ngoài nước ở đây. Nói AI nghiêm khắc hay dễ tính cũng sai hướng: vấn đề là điểm không có căn cứ.",
    diagram: [
      { label: "Bạn đặt ba tiêu chí đo được", arrow: true },
      { label: "Bạn đưa số liệu thật từ sổ nhận hàng", arrow: true },
      { label: "AI dựng bảng điểm theo trọng số", arrow: true },
      { label: "Bạn kiểm vài điểm và quyết định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một công ty in ấn có ba nhà cung cấp giấy làm việc nhiều năm. Chị mua hàng đặt ba tiêu chí: giao đúng hẹn (50%), tỷ lệ lỗi hàng (30%), tốc độ phản hồi (20%), lấy số liệu 6 tháng từ sổ nhận hàng. Điểm ba nhà lần lượt là 82, 74 và 68. Nhà điểm thấp nhất từng là nhà được ưu tiên vì quen biết lâu. Đây là tình huống dựng lên để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Tiêu chí nào dưới đây đo được rõ ràng nhất cho một nhà cung cấp?",
        "Tỷ lệ đơn giao đúng hẹn trong 6 tháng gần nhất",
        [
          "Mức độ thân thiện của nhân viên bán hàng qua những lần trao đổi cá nhân",
          "Ấn tượng chung về sự chuyên nghiệp của công ty",
          "Mức độ họ hiểu ngành của bạn",
        ],
        "Tiêu chí tốt là tiêu chí ra được một con số từ sổ sách: bao nhiêu đơn đúng hẹn trên tổng số đơn. Ba phương án còn lại là cảm nhận, mỗi người chấm một khác và không kiểm được.",
      ),
      Q(
        "Nhà A giao đúng hẹn 18 trên 20 đơn. Tỷ lệ giao đúng hẹn là bao nhiêu?",
        "90%",
        [
          "10% (= 2 ÷ 20, nhầm với tỷ lệ trễ)",
          "111% (= 20 ÷ 18, chia ngược)",
          "18% (= 18 ÷ 100, chia cho 100 thay vì cho tổng số đơn)",
        ],
        "Tỷ lệ đúng hẹn = 18 ÷ 20 = 90%. 10% là tỷ lệ trễ, không phải đúng hẹn. Chia ngược cho ra hơn 100%, một tỷ lệ vô lý. Chia cho 100 quên mất tổng đơn thực tế là 20.",
      ),
      Q(
        "Trọng số 50% giao đúng hẹn, 30% lỗi hàng, 20% phản hồi; nhà A được 90, 70, 80 điểm. Điểm tổng là bao nhiêu?",
        "82 điểm",
        [
          "80 điểm (= (90 + 70 + 80) ÷ 3, bỏ qua trọng số)",
          "240 điểm (= 90 + 70 + 80, cộng thẳng không nhân trọng số)",
          "79 điểm (= 0,2 × 90 + 0,3 × 70 + 0,5 × 80, gán ngược trọng số)",
        ],
        "Điểm = 0,5 × 90 + 0,3 × 70 + 0,2 × 80 = 45 + 21 + 16 = 82. Trung bình đơn giản coi ba tiêu chí quan trọng như nhau. Cộng thẳng vượt xa thang 100. Gán ngược trọng số thì tiêu chí phản hồi lại nặng hơn giao đúng hẹn.",
      ),
      Q(
        "AI nên đóng vai trò gì trong việc chấm điểm nhà cung cấp?",
        "Dựng bảng và tính điểm từ số liệu bạn đưa, rồi bạn kiểm lại",
        [
          "Tự tìm thông tin nhà cung cấp trên mạng rồi chấm điểm thay bạn",
          "Quyết định nhà nào giữ, nhà nào thôi, dựa trên điểm tổng",
          "Nhớ lại lịch sử làm việc của công ty với từng nhà cung cấp",
        ],
        "AI giỏi dựng khung và tính từ số liệu có sẵn. Nó không có lịch sử của công ty bạn, thông tin trên mạng thường không phản ánh việc giao hàng thật, và quyết định giữ hay thôi phải là của người chịu trách nhiệm.",
      ),
      Q(
        "Nhà B điểm thấp nhất nhưng cùng công ty làm việc 8 năm. Bạn nên làm gì với bảng điểm?",
        "Mang bảng điểm và số liệu ra trao đổi với nhà B trước khi quyết định",
        [
          "Loại nhà B ngay vì điểm số đã chứng minh họ kém nhất",
          "Bỏ bảng điểm vì thâm niên 8 năm quan trọng hơn con số",
          "Ẩn bảng điểm với nhà B để tránh mất quan hệ làm ăn",
        ],
        "Bảng điểm là căn cứ để nói chuyện, không phải bản án. Nhà B có thể có lý do (đợt vật tư hiếm, thay đổi kho) và cần cơ hội giải thích. Loại ngay là quá vội, bỏ bảng điểm là bỏ chính lý do lập nó, còn ẩn đi thì mất cơ hội cải thiện của cả hai bên.",
      ),
    ],
    keyTakeaways: [
      "Tiêu chí tốt ra được con số từ sổ sách, không phải cảm nhận.",
      "Tỷ lệ đúng hẹn = số đơn đúng hẹn ÷ tổng số đơn.",
      "Điểm tổng = tổng các điểm nhân với trọng số; trọng số cộng lại bằng 100%.",
      "AI dựng bảng từ số liệu bạn đưa; nó không biết lịch sử của công ty bạn.",
      "Bảng điểm là căn cứ để trao đổi với nhà cung cấp, không phải bản án.",
    ],
    practicePrompt: {
      question:
        "Bạn có ba tiêu chí nhưng trọng số cộng lại thành 120%. Điều gì đúng?",
      options: [
        "Cần chỉnh để trọng số cộng lại bằng 100%, nếu không điểm tổng bị phồng",
        "Không sao, vì thang điểm nào cũng chấp nhận trọng số lớn hơn 100%",
        "Cần chia điểm tổng cho 3 vì có ba tiêu chí để về thang 100",
        "Nên bỏ trọng số hoàn toàn và tính trung bình đơn giản ba điểm để khỏi lệch",
      ],
      correct: 0,
      explanation:
        "Trọng số là phần chia của 100% giữa các tiêu chí; cộng lại 120% làm điểm tổng vượt thang. Chia cho 3 không sửa được vì trọng số vẫn sai tỷ lệ, còn trung bình đơn giản coi các tiêu chí ngang nhau, không phản ánh điều bạn thật sự coi trọng.",
    },
    summary: {
      keyIdea: "Chấm điểm nhà cung cấp là biến cảm nhận thành số từ sổ sách, theo tiêu chí bạn tự đặt.",
      formula: "Điểm tổng = Σ (điểm tiêu chí × trọng số), với trọng số cộng lại bằng 100%.",
      commonMistake: "Nhờ AI chấm khi chưa đưa tiêu chí và số liệu thật.",
      action: "Chọn ba tiêu chí, lấy số liệu 6 tháng và lập bảng điểm cho ba nhà cung cấp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba nhà cung cấp bạn đang dùng. Đặt ba tiêu chí và trọng số (cộng lại 100%), lấy số liệu 3-6 tháng từ sổ nhận hàng hoặc email. Nhờ AI dựng bảng điểm từ số liệu đó, rồi tự tính lại điểm của một nhà bằng máy tính.",
      secondary: "Ngày mai bạn sẽ được hỏi: nhà nào có điểm khác với cảm nhận của bạn, và vì sao?",
    },
    sections: [
      {
        type: "lead",
        text: "Ba nhà cung cấp làm việc với bạn nhiều năm, và chưa ai từng chấm điểm họ. Bài này đi từng bước: chọn thước đo, lấy số liệu thật, nhờ AI dựng bảng, rồi kiểm.",
      },
      {
        type: "feynman",
        title: "Bảng điểm nhà cung cấp đơn giản hơn bạn nghĩ",
        intro: "Giống như một cô giáo chấm bài: bài kiểm tra chiếm nhiều điểm hơn bài tập về nhà, rồi cộng lại thành điểm học kỳ. Nhà cung cấp cũng được chấm nhiều môn, mỗi môn một trọng số.",
        columns: ["Thành phần", "Điểm học kỳ của học sinh", "Điểm nhà cung cấp"],
        rows: [
          ["Các môn", "Kiểm tra, bài tập, chuyên cần", "Giao đúng hẹn, lỗi hàng, phản hồi"],
          ["Trọng số", "Kiểm tra chiếm nhiều điểm hơn bài tập", "Giao đúng hẹn 50%, lỗi hàng 30%, phản hồi 20%"],
          ["Căn cứ", "Bài đã làm thật", "Sổ nhận hàng và email thật"],
          ["Điểm tổng", "Cộng điểm từng môn nhân trọng số", "Cộng điểm từng tiêu chí nhân trọng số"],
        ],
        oneLiner: "Điểm nhà cung cấp là điểm từng tiêu chí nhân trọng số, lấy từ số liệu thật.",
      },
      { type: "heading", text: "Ba việc bạn làm, một việc AI làm" },
      {
        type: "paragraph",
        text: "Bạn chọn tiêu chí và trọng số vì đó là điều công ty bạn coi trọng. Bạn lấy số liệu từ sổ nhận hàng hay email. Bạn kiểm kết quả. AI chỉ dựng bảng và tính điểm từ những gì bạn đưa, việc nó làm nhanh và ít sai nếu số liệu đã có.",
      },
      {
        type: "flow",
        title: "Từ tiêu chí tới bảng điểm",
        steps: [
          { label: "Chọn ba tiêu chí đo được", detail: "Ví dụ: tỷ lệ đơn giao đúng hẹn, tỷ lệ đơn có hàng lỗi, thời gian phản hồi email trung bình. Mỗi tiêu chí phải ra được một con số." },
          { label: "Đặt trọng số", detail: "Chia 100% giữa các tiêu chí theo điều bạn coi trọng nhất. Ví dụ 50%, 30%, 20%." },
          { label: "Thu số liệu thật", detail: "Lấy từ sổ nhận hàng, email, phiếu nhập kho của 3-6 tháng gần nhất. Không có số liệu thì ghi \"chưa có\", đừng đoán." },
          { label: "Nhờ AI dựng bảng", detail: "Đưa AI tiêu chí, trọng số, số liệu thật, và yêu cầu ghi từng bước tính." },
          { label: "Kiểm rồi trao đổi", detail: "Tự tính lại một nhà bằng máy tính. Mang bảng điểm ra trao đổi với nhà cung cấp, không dùng nó như bản án." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng điểm ba nhà cung cấp",
        task: "Bạn có số liệu 6 tháng của ba nhà cung cấp. Lắp prompt để AI dựng bảng điểm đáng tin.",
        parts: [
          {
            id: "criteria",
            label: "Tiêu chí và trọng số",
            options: [
              { text: "Chấm theo các tiêu chí thường dùng cho nhà cung cấp.", feedback: "AI tự chọn tiêu chí chung chung, không phải điều công ty bạn coi trọng." },
              { text: "Ba tiêu chí: giao đúng hẹn 50%, lỗi hàng 30%, phản hồi 20%.", good: true, feedback: "Tiêu chí và trọng số do bạn đặt, cộng lại đúng 100%." },
            ],
          },
          {
            id: "data",
            label: "Số liệu",
            options: [
              { text: "Bạn tự tìm thông tin của ba nhà cung cấp rồi chấm.", feedback: "AI không có số liệu giao hàng thật của công ty bạn và sẽ bịa cho đủ bảng." },
              { text: "Số liệu 6 tháng: (dán bảng số đơn, số đơn đúng hẹn, số đơn lỗi, phản hồi). Chỉ dùng số này.", good: true, feedback: "Số liệu thật và giới hạn nguồn - AI tính chứ không đoán." },
            ],
          },
          {
            id: "out",
            label: "Cách trả kết quả",
            options: [
              { text: "Chỉ cần cho tôi điểm tổng của từng nhà.", feedback: "Không có bước tính nên bạn không kiểm được điểm nào." },
              { text: "Bảng gồm điểm từng tiêu chí, phép tính từng bước và điểm tổng; ô thiếu số liệu ghi \"chưa có\".", good: true, feedback: "Bạn thấy từng bước và biết chỗ nào thiếu số liệu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["criteria", "data", "out"],
            text: "Nhà A: 0,5 × 90 + 0,3 × 70 + 0,2 × 80 = 82\nNhà B: 0,5 × 80 + 0,3 × 75 + 0,2 × 60 = 74,5\nNhà C: 0,5 × 70 + 0,3 × 60 + 0,2 × 75 = 68\n\nGhi chú: phản hồi của nhà C \"chưa có\" 2 tháng, dùng số 4 tháng còn lại.",
          },
          {
            requires: ["criteria"],
            text: "Nhà A: 82 điểm. Nhà B: 74 điểm. Nhà C: 68 điểm.\n\n(Tiêu chí đúng nhưng không có bước tính và số liệu nguồn, bạn không kiểm được.)",
          },
          {
            text: "Nhà A: 9/10, rất đáng tin cậy. Nhà B: 7/10. Nhà C: 6/10, nên cân nhắc thay thế.\n\n(AI không có số liệu nên bịa điểm và còn đưa lời khuyên thay thế.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Điểm là căn cứ để nói chuyện",
        text: "Nhà điểm thấp có thể đang gặp một đợt thiếu vật tư, hay chính bạn đổi cách đặt hàng làm họ khó giao. Mang bảng điểm cùng số liệu ra trao đổi trước khi quyết định, vì cả hai bên đều muốn giữ mối làm ăn.",
      },
      {
        type: "list",
        items: [
          "Mỗi tiêu chí phải ra được một con số từ sổ sách.",
          "Trọng số cộng lại đúng 100%.",
          "Số liệu thiếu thì ghi \"chưa có\", không để AI đoán.",
          "Tự tính lại ít nhất một nhà bằng máy tính.",
        ],
      },
      {
        type: "scenario",
        title: "Nhà cung cấp lâu năm điểm thấp nhất",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng điểm cho thấy nhà B, đối tác 8 năm, điểm thấp nhất vì lỗi hàng cao trong 6 tháng qua. Sếp hỏi có nên thôi không.",
            choices: [
              { label: "Đề xuất thôi ngay vì con số đã nói lên tất cả", next: "bad_cut" },
              { label: "Đề nghị gặp nhà B, đưa số liệu và hỏi nguyên nhân trước", next: "s2" },
            ],
          },
          bad_cut: {
            text: "Bạn thôi nhà B. Sau đó phát hiện lỗi hàng tập trung ở một lô vật tư thiếu, đã được xử lý. Nhà mới giá cao hơn và cần vài tháng làm quen quy trình.",
            ending: "bad",
          },
          s2: {
            text: "Nhà B nhận có một lô hàng lỗi do đổi nguồn vật tư và đã khắc phục. Họ hứa kiểm tra chất lượng trước khi giao và cho xem số liệu mới.",
            choices: [
              { label: "Giữ nhà B thêm một quý, hẹn chấm lại bằng số liệu mới", next: "good" },
              { label: "Bỏ hẳn bảng điểm vì nhà B đã giải thích đủ rồi", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Không còn ai theo dõi số liệu. Ba tháng sau nhà B lại giao lỗi, và bạn không có số nào để so với lần trước.",
            ending: "bad",
          },
          good: {
            text: "Nhà B cải thiện, điểm quý sau tăng. Bạn có căn cứ để giữ họ, và cả ba nhà biết mình đang được theo dõi bằng số.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tiêu chí do bạn đặt, số liệu do sổ sách nói, AI dựng bảng.",
          "Bài sau: mini-dự án báo cáo tồn kho một trang kèm đề xuất đặt hàng.",
        ],
      },
    ],
  },
];
