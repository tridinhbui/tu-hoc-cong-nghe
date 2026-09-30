import type { Lesson } from "../lesson-types";

// Chặng 33, bài 11-15. Giáo trình: scripts/curriculum/stage-33.json.
// Không dựa vào tính năng riêng của một công cụ AI nào, nên không cần nguồn tài liệu.

// Đáp án đúng luôn đặt ở vị trí 0; vị trí được xáo lại lúc build (lib/lesson-quiz-balance.js).
const Q = (question: string, options: string[], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S33_C_LESSONS: Lesson[] = [
  {
    id: 2070,
    slug: "dat-muc-tieu-nhom-tu-viec-dang-lam",
    title: "Chặng 33, Bài 11: Đặt mục tiêu quý từ những việc nhóm đang làm",
    subtitle: "Từ danh sách hai chục việc lộn xộn đến ba bốn mục tiêu có thể đo được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đến hạn nộp mục tiêu quý, nhiều trưởng nhóm chỉ có một danh sách việc đang làm. Chép nguyên danh sách thành mục tiêu thì sếp đọc không ra nhóm định đạt gì, còn nhờ AI đặt mục tiêu thì nó dễ điền những con số nghe rất hợp lý nhưng chưa ai đo. Biết gom việc theo kết quả và kiểm con số giúp bạn nộp một bản mục tiêu mà cuối quý còn dám mở ra đối chiếu.",
    openingQuestion:
      "Thứ Sáu là hạn nộp mục tiêu quý mới. Trong tay bạn chỉ có danh sách 23 việc nhóm đang làm. Cách bắt đầu hợp lý nhất là gì?",
    openingOptions: [
      "Gom các việc theo kết quả chúng tạo ra, chọn 3-4 mục tiêu có số đo",
      "Chép nguyên 23 việc thành 23 mục tiêu để không sót việc nào của nhóm",
      "Nhờ AI đặt mục tiêu rồi lấy luôn các con số nó đưa ra để kịp nộp báo cáo",
      "Chọn con số tăng trưởng thật lớn để tạo động lực, sau này tính tiếp",
    ],
    correctOption: 0,
    explanation:
      "Một mục tiêu là kết quả nhóm muốn đạt, không phải một việc phải làm. Gom các việc theo kết quả chúng cùng phục vụ giúp hai mươi ba dòng còn lại ba bốn ý mà sếp đọc một lần là hiểu. Chép nguyên danh sách thì mục tiêu nào cũng ngang nhau và không ai biết ưu tiên gì. Con số AI đưa hay con số lớn tự nghĩ ra đều chưa có gốc từ số liệu của nhóm, nên cuối quý bạn không có gì để đối chiếu.",
    diagram: [
      { label: "Danh sách việc nhóm đang làm", arrow: true },
      { label: "Gom theo kết quả chúng cùng phục vụ", arrow: true },
      { label: "Mỗi kết quả: một con số đo và số nền hiện tại", arrow: true },
      { label: "Bạn kiểm số với dữ liệu thật rồi mới nộp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm chăm sóc khách hàng nộp mục tiêu quý gồm 18 dòng, dòng nào cũng bắt đầu bằng động từ như \"triển khai\", \"cập nhật\", \"rà soát\". Sếp trả lại với một câu hỏi: nếu hết quý chỉ làm được một nửa thì nhóm coi như thành công hay thất bại? Chị gom 18 dòng thành 3 mục tiêu, mỗi mục tiêu một con số lấy từ báo cáo tháng trước, và lần sau sếp duyệt trong một buổi.",
    },
    quiz: [
      Q(
        "Điểm khác nhau giữa một mục tiêu và một danh sách việc là gì?",
        [
          "Mục tiêu nêu kết quả cần đạt và đo được, không liệt kê việc",
          "Mục tiêu dài hơn vì phải liệt kê nhiều việc hơn để không sót gì",
          "Mục tiêu dùng chữ trang trọng như \"nâng cao\", \"tối ưu hoá\"",
          "Mục tiêu chỉ cần sếp đọc thấy hợp lý, con số có hay không cũng được",
        ],
        "Danh sách việc trả lời câu hỏi \"làm gì\", mục tiêu trả lời \"đạt được gì và đo bằng gì\". Liệt kê thêm việc không biến nó thành mục tiêu, chữ trang trọng không cho ta biết thế nào là xong, và bỏ con số thì cuối quý không ai chứng minh được nhóm đã đạt hay chưa."
      ),
      Q(
        "AI đề xuất mục tiêu \"giảm thời gian xử lý đơn từ 48 giờ xuống 24 giờ\". Bạn nên làm gì trước?",
        [
          "Đối chiếu con số 48 giờ với số liệu thật của nhóm",
          "Nhận luôn vì AI đã tính từ danh sách việc bạn vừa dán vào cho nó",
          "Ghi vào bản mục tiêu, cuối quý không đạt thì giải thích sau với sếp",
          "Hỏi lại AI rằng con số này có đúng không rồi tin vào câu trả lời của nó",
        ],
        "Danh sách việc không chứa thời gian xử lý, nên 48 giờ chỉ là con số AI điền cho nghe có lý. Phải mở số liệu thật để biết hiện nay là bao nhiêu. Hỏi lại chính AI không phải kiểm chứng vì nó có thể khẳng định điều nó vừa nghĩ ra, còn ghi vào rồi giải thích sau là đặt cược cả quý lên một con số chưa ai đo."
      ),
      Q(
        "Nhóm hoàn thành trung bình 6 việc mỗi tuần. Trong 12 tuần, ước tính hợp lý là bao nhiêu việc?",
        [
          "72 việc (= 6 việc × 12 tuần)",
          "18 việc (= 6 + 12, cộng hai con số thay vì nhân)",
          "2 việc (= 12 ÷ 6, lấy số tuần chia cho số việc mỗi tuần)",
          "78 việc (= 6 × 13, tính dư một tuần vì đếm cả tuần chưa bắt đầu)",
        ],
        "Mỗi tuần 6 việc, 12 tuần thì nhân lên được 72. Cộng 6 với 12 cho 18 là nhầm phép tính, chia 12 cho 6 cho 2 là đảo ngược quan hệ, còn 13 tuần là đếm dư. Đây cũng là ví dụ số liệu minh hoạ: khi đặt mục tiêu bạn phải lấy tốc độ thật của nhóm chứ không lấy tốc độ mong muốn."
      ),
      Q(
        "Mục tiêu nào dưới đây kiểm được vào cuối quý?",
        [
          "Giảm tỷ lệ đơn trả lại từ 12% xuống 8% (số minh hoạ)",
          "Cải thiện chất lượng phục vụ khách hàng trong suốt quý này",
          "Làm việc chủ động hơn và có tinh thần trách nhiệm cao hơn",
          "Hoàn thành tốt mọi việc được giao đúng như kỳ vọng của sếp",
        ],
        "Chỉ mục tiêu đầu có số nền, số đích và hạn nên cuối quý ai cũng đọc được nó đã đạt hay chưa. Ba mục tiêu còn lại là mong muốn: mỗi người hiểu \"tốt hơn\" một kiểu, nên cuối quý sẽ chỉ còn tranh luận cảm tính thay vì đối chiếu số."
      ),
      Q(
        "Nhóm chưa từng đo thời gian giao hàng, nhưng mục tiêu lại muốn rút ngắn nó. Cách xử lý nào ổn nhất?",
        [
          "Ghi rõ chưa có số nền, dành hai tuần đầu quý để đo rồi mới chốt số đích",
          "Nhờ AI ước số nền cho tròn, rồi ghi vào bản mục tiêu như số thật của nhóm",
          "Bỏ mục tiêu này đi vì không có số thì không thể đặt mục tiêu nào cả",
          "Lấy số nền của một nhóm khác trong công ty rồi coi đó là của nhóm mình",
        ],
        "Thiếu số nền không có nghĩa là bỏ mục tiêu; nó có nghĩa là bước đầu tiên của mục tiêu là đo. AI ước số nền thì đó vẫn là số bịa mang vẻ đã đo. Bỏ hẳn thì mất một mục tiêu quan trọng, còn mượn số của nhóm khác sẽ đo sai vì quy trình và khách hàng mỗi nơi một khác."
      ),
    ],
    keyTakeaways: [
      "Mục tiêu là kết quả cần đạt, không phải danh sách việc đang làm.",
      "Gom 20 việc thành 3-4 mục tiêu; mỗi mục tiêu có số nền, số đích và hạn.",
      "Con số AI đưa ra chưa có gốc từ dữ liệu của nhóm bạn: luôn đối chiếu số thật.",
      "Chưa có số nền thì ghi rõ và biến việc đo thành bước đầu tiên của quý.",
    ],
    practicePrompt: {
      question:
        "Bạn nhờ AI gom 20 việc thành mục tiêu quý và nó trả về \"tăng 30% mức độ hài lòng của khách\". Bạn chưa từng đo mức hài lòng. Nên làm gì?",
      options: [
        "Coi 30% là chỗ trống cần điền, đo số nền rồi tự chọn số đích",
        "Giữ nguyên 30% vì AI đã đọc rất nhiều mục tiêu quý của nhóm khác",
        "Đổi 30% thành 50% cho mục tiêu nghe hấp dẫn hơn với ban lãnh đạo",
        "Xoá luôn chữ \"hài lòng\" vì đây là thứ không thể đo được trong quý",
      ],
      correct: 0,
      explanation:
        "AI chưa từng thấy số khảo sát của nhóm bạn nên 30% chỉ là mẫu quen thuộc. Số nền phải đo, số đích do bạn và sếp chọn. Giữ nguyên hay tự đổi 50% đều là số không có gốc; xoá luôn thì bỏ mất điều khách quan tâm, trong khi hoàn toàn có thể đo bằng một khảo sát ngắn.",
    },
    summary: {
      keyIdea: "Mục tiêu là kết quả đo được; việc đang làm chỉ là cách để tới đó.",
      formula: "Việc nhóm đang làm → gom theo kết quả → mỗi kết quả có số nền + số đích + hạn.",
      commonMistake: "Nộp con số AI đề xuất mà chưa đối chiếu với số liệu thật của nhóm.",
      action: "Lấy danh sách việc hiện tại, gạch nối các việc cùng phục vụ một kết quả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy danh sách việc nhóm bạn đang làm tuần này (không cần đủ, 10-15 việc là được). Nhờ AI gom thành 3-4 mục tiêu theo cách lắp trong bài, rồi với mỗi mục tiêu ghi hai ô: con số nền bạn tự tra được và nguồn của nó. Ô nào chưa tra được thì viết \"chưa có số nền\". Ngày mai dashboard sẽ hỏi bạn có bao nhiêu ô như vậy.",
      secondary: "Không dán tên người hay số lương vào công cụ, chỉ dán tên việc.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba, sếp nhắn nhắc: thứ Sáu nộp mục tiêu quý cho nhóm. Bạn mở file lên và thấy 23 dòng việc đang làm, dòng nào cũng đúng nhưng không dòng nào là mục tiêu. Bài này giúp bạn biến danh sách đó thành vài mục tiêu đo được, và tập kiểm con số AI đưa ra.",
      },
      {
        type: "feynman",
        title: "Đặt mục tiêu từ danh sách việc đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một chuyến đi cả nhà: bạn có một túi đồ cần mang - kem chống nắng, giày, sạc, thuốc, sách. Nhưng \"mang gì\" chưa phải mục tiêu chuyến đi. Mục tiêu là \"cả nhà nghỉ được ba ngày ở biển, không ai phải chạy đi mua đồ\". Túi đồ chỉ là cách để đạt mục tiêu đó.",
        columns: ["Thành phần", "Chuyến đi cả nhà", "Nhóm của bạn"],
        rows: [
          ["Túi đồ", "Kem chống nắng, giày, sạc", "Danh sách 23 việc đang làm"],
          ["Mục tiêu", "Cả nhà nghỉ ba ngày, không phải đi mua lại đồ", "Kết quả nhóm muốn đạt trong quý"],
          ["Cách biết đã đạt", "Cuối chuyến không ai phải mua thêm gì", "Một con số so với số nền, có hạn"],
        ],
        oneLiner: "Việc đang làm là túi đồ, mục tiêu là chuyến đi: đặt mục tiêu là gom túi đồ theo điều bạn muốn đạt.",
      },
      { type: "heading", text: "Vì sao danh sách việc chưa phải mục tiêu" },
      {
        type: "paragraph",
        text: "Danh sách việc trả lời \"chúng ta bận gì\". Sếp đọc nó và vẫn không biết nhóm bạn tạo ra giá trị gì. Ba bốn mục tiêu, mỗi mục tiêu một con số, cho phép sếp ủng hộ đúng chỗ và cho phép bạn nói không với việc không phục vụ mục tiêu nào.",
      },
      {
        type: "chart",
        title: "Tiến độ nhóm nếu giữ tốc độ hiện tại",
        caption:
          "Số liệu minh hoạ. Kéo hai thanh trượt để xem nhóm có tới đích trong 12 tuần không. Đường đích là số việc bạn muốn hoàn thành; đường còn lại là tốc độ thật nhân số tuần.",
        kind: "line",
        xLabel: "Tuần trong quý",
        yLabel: "Số việc hoàn thành cộng dồn",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "rate", label: "Việc xong mỗi tuần", min: 1, max: 12, step: 1, value: 6, unit: "việc" },
          { id: "target", label: "Đích cả quý", min: 20, max: 100, step: 5, value: 60, unit: "việc" },
        ],
        series: [
          { label: "Việc xong cộng dồn", expr: "x * rate" },
          { label: "Đích cả quý", expr: "target" },
        ],
      },
      { type: "heading", text: "Ba bước từ danh sách đến mục tiêu" },
      {
        type: "list",
        items: [
          "Bước 1 - Gom: đặt các việc cùng phục vụ một kết quả cạnh nhau, đặt tên kết quả đó.",
          "Bước 2 - Đo: mỗi kết quả cần một con số và hạn, kèm số nền hiện tại bạn tra được.",
          "Bước 3 - Kiểm: mọi con số AI đưa mà bạn không cung cấp đều coi là chưa kiểm chứng.",
        ],
      },
      {
        type: "flow",
        title: "Từ danh sách việc tới mục tiêu quý",
        steps: [
          { label: "Liệt kê việc", detail: "Chép danh sách việc nhóm đang làm, chỉ ghi tên việc, không kèm tên người hay thông tin nhạy cảm." },
          { label: "Nhờ AI gom nhóm", detail: "AI giỏi nhìn ra các việc giống nhau. Bạn yêu cầu gom thành 3-4 kết quả và ghi việc nào thuộc kết quả nào." },
          { label: "Đặt số đo", detail: "Với mỗi kết quả hỏi: đo bằng gì, hiện nay là bao nhiêu, quý sau muốn bao nhiêu. Chỗ nào bạn chưa biết, AI phải ghi là chưa có số nền." },
          { label: "Bạn tra số nền", detail: "Mở báo cáo, bảng theo dõi hoặc hỏi người phụ trách để có số thật. Đây là bước AI không thay được." },
          { label: "Chốt và nộp", detail: "Chỉ giữ số đã có nguồn. Số chưa kiểm được thì đổi thành mục tiêu \"đo số nền trong hai tuần đầu\"." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Danh sách việc",
          text: "\"Làm báo cáo tuần, trả lời khách, cập nhật bảng theo dõi, họp với kho...\" Đọc xong sếp không biết nhóm sẽ khác đi ra sao vào cuối quý.",
        },
        right: {
          label: "Mục tiêu",
          text: "\"Rút thời gian trả lời khách từ 6 giờ xuống 3 giờ.\" (số minh hoạ) Có số nền, số đích, cuối quý ai cũng đối chiếu được.",
        },
      },
      {
        type: "callout",
        label: "Chỗ AI dễ bịa nhất",
        text: "Khi bạn yêu cầu mục tiêu có số, AI sẽ tự điền số nếu bạn không đưa. Nó chưa hề thấy báo cáo của nhóm bạn, nên \"giảm 30%\" chỉ là con số quen tai. Luôn dặn: chỗ nào chưa có số, ghi là cần bổ sung.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gom 20 việc thành mục tiêu quý",
        task: "Nhóm 5 người phụ trách chăm sóc khách sau bán hàng, có danh sách 20 việc đang làm. Lắp prompt để AI gom thành mục tiêu và không bịa số.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Giúp tôi đặt mục tiêu quý cho nhóm.", feedback: "AI không biết nhóm làm gì nên sẽ viết mục tiêu chung cho mọi nhóm." },
              {
                text: "Nhóm 5 người, chăm sóc khách sau bán hàng. Đây là 20 việc đang làm (dán danh sách). Chưa có số liệu nào ngoài danh sách này.",
                good: true,
                feedback: "AI biết nhóm làm gì, có nguyên liệu và biết rõ ranh giới: chưa có số liệu nào khác để nó dựa vào.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Gom thành 3-4 mục tiêu quý, mỗi mục tiêu ghi việc nào thuộc về nó, cách đo, và chỗ nào cần tôi bổ sung số nền.",
                good: true,
                feedback: "Yêu cầu rõ số lượng, cách đo và buộc AI chỉ ra chỗ thiếu thay vì tự lấp.",
              },
              { text: "Đặt mục tiêu thật tham vọng với số liệu cụ thể.", feedback: "\"Số liệu cụ thể\" khi bạn chưa đưa số nào là mời AI tự nghĩ ra số." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một đoạn văn ngắn cho sếp đọc.", feedback: "Đoạn văn khó thấy mục tiêu nào thiếu số và việc nào chưa được gom." },
              {
                text: "Trình bày dạng bảng: mục tiêu, việc thuộc mục tiêu, cách đo, số nền, ghi \"cần bổ sung\" nếu tôi chưa đưa.",
                good: true,
                feedback: "Bảng để bạn quét thấy ô \"cần bổ sung\" và biết phải tra gì trước khi nộp.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Mục tiêu | Việc thuộc mục tiêu | Cách đo | Số nền |\n|---|---|---|---|\n| 1. Khách được trả lời nhanh hơn | Trả lời tin nhắn, phân loại yêu cầu, lập mẫu trả lời | Thời gian trung bình từ lúc khách hỏi đến lúc có trả lời | Cần bổ sung |\n| 2. Ít khiếu nại lặp lại hơn | Ghi nhận khiếu nại, họp với kho, cập nhật quy trình | Số khiếu nại cùng một lỗi trong tháng | Cần bổ sung |\n| 3. Báo cáo gọn và đúng hạn | Báo cáo tuần, cập nhật bảng theo dõi | Số tuần nộp đúng hạn / tổng số tuần | Cần bổ sung |\n\nLưu ý: tôi chưa có số liệu nào của nhóm nên ở cột số nền không điền gì.",
          },
          {
            requires: ["context"],
            text: "Gợi ý mục tiêu quý cho nhóm chăm sóc khách sau bán hàng:\n1. Nâng cao trải nghiệm khách hàng\n2. Tối ưu hoá quy trình xử lý yêu cầu\n3. Cải thiện chất lượng báo cáo\n\n(Nghe hợp lý nhưng chung chung: không có số đo nên cuối quý không ai đối chiếu được, và không nói việc nào thuộc mục tiêu nào.)",
          },
          {
            text: "Mục tiêu quý 4:\n1. Tăng mức hài lòng của khách lên 92%\n2. Giảm 35% thời gian xử lý khiếu nại\n3. Đạt 100% báo cáo đúng hạn\n\n(Toàn số AI tự điền: bạn chưa hề cung cấp mức hài lòng hay thời gian xử lý, nên không ai biết nhóm đang ở đâu.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Đêm trước hạn nộp mục tiêu quý",
        start: "s1",
        nodes: {
          s1: {
            text: "Chín giờ tối, bạn có bản mục tiêu AI vừa gom, trong đó dòng đầu ghi \"giảm thời gian xử lý đơn từ 48 giờ xuống 24 giờ\". Bạn chưa từng đo thời gian này. Sáng mai phải nộp.",
            choices: [
              { label: "Nộp luôn vì bản này trông chuyên nghiệp và đã đủ số đo", next: "bad_submit" },
              { label: "Mở bảng theo dõi đơn của nhóm để xem 48 giờ có thật không", next: "s2" },
            ],
          },
          bad_submit: {
            text: "Sang tuần thứ ba của quý, một bạn trong nhóm tính thử: thời gian xử lý hiện nay chỉ khoảng 30 giờ, nên mục tiêu 24 giờ gần như đã đạt mà chẳng ai làm gì. Sếp hỏi nhóm đã \"đặt mục tiêu\" hay chỉ chép một con số.",
            ending: "bad",
          },
          s2: {
            text: "Bảng theo dõi đơn không có cột thời gian xử lý, chỉ có ngày nhận và ngày giao. Bạn có thể tính, nhưng mất vài giờ. Đã 9 rưỡi tối.",
            choices: [
              { label: "Giữ 48 giờ trong bản nộp, tối nay tính sau", next: "bad_keep" },
              { label: "Ghi mục tiêu là \"đo số nền trong 2 tuần đầu, chốt số đích ở tuần 3\", nộp kèm lý do", next: "good" },
            ],
          },
          bad_keep: {
            text: "Tối đó bạn quá mệt để tính, và số 48 nằm nguyên trong bản nộp. Cuối quý, khi đối chiếu, số nền thật khác hẳn con số bạn ghi. Cả bản mục tiêu mất giá trị vì một dòng chưa từng được kiểm.",
            ending: "bad",
          },
          good: {
            text: "Sếp đọc bản nộp, thấy dòng đầu nói thẳng chưa có số nền và có kế hoạch đo trong hai tuần. Sếp đồng ý và hỏi thêm bạn cần gì để đo. Đến tuần 3, mục tiêu có số thật.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mục tiêu là kết quả đo được; việc đang làm chỉ là con đường.",
          "Bài sau: nhóm phân vân giữa hai hướng đi và bạn cần một bảng so sánh thật thà.",
        ],
      },
    ],
  },
  {
    id: 2071,
    slug: "so-sanh-hai-huong-truoc-khi-quyet",
    title: "Chặng 33, Bài 12: So sánh hai hướng đi trước khi chốt",
    subtitle: "AI lập bảng được và mất rất nhanh; điều nó không biết về nhóm bạn mới là chỗ quyết định.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhóm đang cãi nhau giữa hai cách làm và cuộc họp đã kéo hai buổi mà chưa chốt. Nhờ AI lập bảng được và mất giúp bạn nhìn cả hai phía trong năm phút. Nhưng nếu bạn coi bảng của AI là kết luận, bạn sẽ quyết theo hoàn cảnh chung của mọi nhóm chứ không phải hoàn cảnh của nhóm mình.",
    openingQuestion:
      "Nhóm đang phân vân giữa giữ cách theo dõi việc bằng email và chuyển sang một bảng chung. Bạn nhờ AI lập bảng được và mất. Việc quan trọng nhất bạn làm sau đó là gì?",
    openingOptions: [
      "Đánh dấu những chỗ AI chỉ đoán vì không biết hoàn cảnh nhóm mình",
      "Đếm xem hướng nào có nhiều dòng \"được\" hơn rồi chọn hướng đó",
      "Gửi luôn bảng cho cả nhóm vì nó khách quan hơn ý kiến của từng người",
      "Nhờ AI chọn giúp một hướng để cuộc họp không kéo dài thêm nữa",
    ],
    correctOption: 0,
    explanation:
      "AI biết những ưu và nhược điểm chung của mỗi hướng, nhưng không biết nhóm bạn có 6 người hay 60, mọi người quen công cụ nào, hạn chót ra sao. Những chỗ đó chính là chỗ quyết định, nên phải do bạn đánh dấu và bổ sung. Đếm số dòng được thì coi mọi lợi ích nặng như nhau. Bảng \"khách quan\" thực ra mang giả định của AI, còn để AI chọn là giao quyết định cho thứ không chịu hậu quả nào.",
    diagram: [
      { label: "Nêu hai hướng và hoàn cảnh của nhóm", arrow: true },
      { label: "AI lập bảng được và mất theo từng hướng", arrow: true },
      { label: "Bạn đánh dấu chỗ AI chỉ đoán", arrow: true },
      { label: "Cả nhóm bổ sung và chốt quyết định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm vận hành 7 người phân vân giữa tự làm báo cáo cuối tháng và giao cho một người chuyên trách. AI lập bảng và nói giao chuyên trách \"tiết kiệm thời gian\". Trưởng nhóm gạch chân dòng đó và hỏi: tiết kiệm của ai, và ai nhận thêm việc? Câu hỏi đó lộ ra rằng người chuyên trách duy nhất đang nghỉ thai sản hai tháng, điều AI hoàn toàn không biết.",
    },
    quiz: [
      Q(
        "Điều gì AI KHÔNG thể biết khi so sánh hai hướng đi cho nhóm của bạn?",
        [
          "Nhóm bạn có bao nhiêu người, quen làm việc ra sao và hạn chót nào",
          "Những ưu và nhược điểm chung thường gặp khi chọn giữa hai hướng đi như thế này",
          "Cách trình bày một bảng so sánh có cột được và cột mất",
          "Những câu hỏi thường được đặt ra khi chọn giữa hai cách làm",
        ],
        "AI đọc rất nhiều nên biết ưu nhược điểm chung và biết trình bày bảng, cũng như liệt kê câu hỏi thường gặp. Điều nó không thể biết là hoàn cảnh riêng: số người, thói quen, hạn chót, người sắp nghỉ. Nếu bạn không nói, nó sẽ điền bằng hoàn cảnh phổ biến nhất."
      ),
      Q(
        "Bảng AI có 5 dòng được cho hướng A và 3 dòng được cho hướng B. Kết luận hợp lý là gì?",
        [
          "Chưa kết luận được vì mỗi dòng nặng nhẹ khác nhau với nhóm",
          "Chọn hướng A vì có nhiều dòng được hơn hướng B",
          "Chọn hướng B vì ít dòng thì thường gọn và ít rủi ro hơn",
          "Hướng A thắng 5 so với 3 nên coi như cả nhóm đã đồng thuận và có thể chốt luôn",
        ],
        "Số dòng không phải điểm số. Một dòng \"tiết kiệm thời gian\" có thể nặng hơn bốn dòng \"trông chuyên nghiệp hơn\" tuỳ hoàn cảnh nhóm bạn. Hướng ít dòng chưa chắc gọn hơn, và tỷ số 5-3 không nói gì về việc cả nhóm đã đồng ý hay chưa."
      ),
      Q(
        "Prompt nào giúp AI lập bảng so sánh có ích nhất?",
        [
          "Hai hướng, quy mô nhóm, hạn chót và điều cần tránh nhất",
          "So sánh hai hướng đi này và cho tôi biết hướng nào tốt hơn",
          "So sánh thật khách quan và chi tiết nhất có thể, càng dài càng tốt",
          "Bạn là chuyên gia hàng đầu, hãy đưa ra quyết định đúng nhất cho tôi",
        ],
        "Bối cảnh cụ thể cho AI dữ kiện để cân được và biết điều gì đáng lo với bạn. Yêu cầu \"hướng nào tốt hơn\" đẩy nó tới phán chung chung. \"Khách quan, càng dài càng tốt\" chỉ tăng độ dài, còn gọi nó là chuyên gia hàng đầu không cho nó thêm thông tin nào."
      ),
      Q(
        "Trong bảng AI có dòng \"Chuyển sang bảng chung giúp tiết kiệm khoảng 5 giờ mỗi tuần\". Bạn nên xử lý thế nào?",
        [
          "Coi đó là giả định chưa kiểm, hỏi cơ sở và thử ước lại bằng số thật của nhóm",
          "Giữ nguyên vì AI đã tính dựa trên rất nhiều nhóm làm việc giống hệt nhóm của bạn từ trước tới nay",
          "Đổi thành 10 giờ để cuộc họp thấy rõ lợi ích của việc chuyển đổi",
          "Xoá dòng đó vì mọi con số AI đưa ra đều không đáng dùng khi quyết định",
        ],
        "Bạn chưa đưa số giờ họp hay số lần báo cáo của nhóm nên 5 giờ là con số AI đoán. Hãy hỏi nó dựa vào đâu và tự ước bằng dữ liệu thật. Giữ nguyên là tin số không có gốc, phóng đại thì gian dối với chính nhóm mình, còn xoá hết mọi con số thì bỏ mất phần AI giúp được khi có dữ liệu."
      ),
      Q(
        "Ai nên là người chốt quyết định sau khi có bảng so sánh?",
        [
          "Bạn cùng nhóm, người chịu trách nhiệm cho kết quả của hướng được chọn",
          "AI, vì nó đã đọc nhiều hơn bất kỳ ai trong nhóm",
          "Người phát biểu to nhất trong buổi họp hôm đó",
          "Bảng điểm, vì hướng nào tổng điểm cao hơn thì được chọn",
        ],
        "AI không chịu hậu quả của quyết định nên không thể chốt thay. Bảng chỉ là dữ kiện đã được sắp xếp để cả nhóm nhìn cùng một chỗ. Quyết định thuộc về người chịu trách nhiệm cùng nhóm, chứ không phải người nói to hay một phép cộng điểm mà mỗi tiêu chí có trọng số khác nhau."
      ),
    ],
    keyTakeaways: [
      "AI lập bảng được và mất rất nhanh, nhưng chỉ dựa trên hoàn cảnh phổ biến.",
      "Đưa cho AI hoàn cảnh nhóm: quy mô, hạn chót, điều muốn tránh nhất.",
      "Đánh dấu và tự điền chỗ AI chỉ đoán; đó là chỗ quyết định.",
      "Không đếm số dòng được; tự cân từng dòng theo hoàn cảnh nhóm.",
      "Người chịu trách nhiệm cùng nhóm chốt, không phải AI.",
    ],
    practicePrompt: {
      question:
        "Bảng AI cho hai hướng có cột \"Nguồn lực cần thiết\" ghi \"1 người làm bán thời gian\". Nhóm bạn chỉ có 4 người và ai cũng kín lịch. Cách hiểu nào đúng?",
      options: [
        "Đây là giả định của AI; bạn kiểm xem nhóm mình có ai nhận thêm được không",
        "Đây là con số đã được tính chính xác, nhóm chỉ cần bố trí một người là đủ rồi",
        "Hướng đó chắc chắn hợp với nhóm vì AI đã ghi rõ nguồn lực ở đó",
        "Cột này chỉ dành cho nhóm lớn nên nhóm 4 người có thể bỏ qua nó",
      ],
      correct: 0,
      explanation:
        "AI không biết ai trong nhóm còn rảnh, nên \"1 người bán thời gian\" là giả định. Kiểm xem giả định đó có đúng với nhóm bạn hay không chính là phần việc của người dẫn dắt. Con số chính xác hay bỏ qua cột đều làm mất đúng thông tin về nguồn lực mà quyết định phụ thuộc.",
    },
    summary: {
      keyIdea: "AI đưa bảng được và mất chung; bạn thêm hoàn cảnh riêng của nhóm rồi cùng nhóm chốt.",
      formula: "Hai hướng + hoàn cảnh nhóm → bảng AI → đánh dấu giả định → nhóm chốt.",
      commonMistake: "Đếm số dòng được ở mỗi bên rồi coi đó là kết luận.",
      action: "Chọn một quyết định đang chờ, nhờ AI lập bảng và gạch chân ba giả định cần kiểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quyết định nhỏ nhóm bạn đang phân vân giữa hai hướng. Viết 3 dòng hoàn cảnh (số người, hạn chót, điều muốn tránh nhất) và nhờ AI lập bảng được và mất. Sau đó dùng bút đánh dấu ba chỗ AI đang giả định về nhóm bạn và ghi bên cạnh câu trả lời thật. Ngày mai dashboard sẽ hỏi bạn ba giả định đó là gì.",
      secondary: "Chỉ mô tả hoàn cảnh chung, không dán tên người hay dữ liệu nội bộ chưa được duyệt.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai buổi họp liền mà nhóm vẫn chưa chốt: giữ cách cũ hay chuyển sang cách mới. Mỗi người có lý của mình, và bạn là người phải kết luận. Bài này dạy cách nhờ AI dựng cái bảng giúp cả nhóm nhìn cùng một chỗ, mà không để nó quyết thay.",
      },
      {
        type: "feynman",
        title: "So sánh hai hướng với AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn mời một người tư vấn ngoài, rất giỏi, đọc rất nhiều, ngồi họp với bạn mười phút. Anh ấy nói rất hay về ưu nhược điểm chung của hai cách làm, nhưng anh chưa từng bước vào văn phòng của bạn. Anh không biết ai đang quá tải, hay sếp ghét điều gì.",
        columns: ["Thành phần", "Người tư vấn ngoài", "AI lập bảng"],
        rows: [
          ["Biết gì", "Kinh nghiệm chung của nhiều nơi", "Điều đã đọc về nhiều tình huống tương tự"],
          ["Không biết gì", "Người, thói quen, hạn chót của nhóm bạn", "Y hệt: chỉ biết những gì bạn kể trong prompt"],
          ["Ai quyết", "Bạn và nhóm - người chịu hậu quả", "Bạn và nhóm - người chịu hậu quả"],
        ],
        oneLiner: "AI là người tư vấn ngoài chưa bước vào phòng họp: nghe nó về điều chung, tự điền điều riêng.",
      },
      { type: "heading", text: "Bảng được và mất: nó giúp gì" },
      {
        type: "paragraph",
        text: "Khi hai người cãi nhau, mỗi người thường chỉ nói lợi ích của phía mình. Một bảng có cả hai phía, viết cạnh nhau, làm cho cuộc họp bớt căng: mọi người nhìn vào bảng thay vì nhìn vào nhau. AI dựng cái bảng đó trong vài phút, việc bạn mất vài chục phút mới làm nổi.",
      },
      {
        type: "list",
        items: [
          "Nêu hai hướng bằng một câu mỗi hướng, không thêm nhận xét.",
          "Kể hoàn cảnh nhóm: bao nhiêu người, hạn chót, điều muốn tránh nhất.",
          "Yêu cầu bảng có cột \"được\", \"mất\" và \"AI đang giả định gì\".",
        ],
      },
      {
        type: "flow",
        title: "Từ hai hướng phân vân đến một quyết định có lý do",
        steps: [
          { label: "Nêu hai hướng", detail: "Mỗi hướng một câu, viết trung lập. Nếu bạn đã thiên về một bên thì AI sẽ dễ viết bảng thiên về bên đó." },
          { label: "Đưa hoàn cảnh", detail: "Số người, hạn chót, điều muốn tránh nhất. Đây là những mảnh AI không thể tự biết." },
          { label: "AI lập bảng", detail: "Được, mất và giả định của mỗi hướng. Đọc lướt để thấy toàn cảnh." },
          { label: "Bạn gạch chân giả định", detail: "Với mỗi giả định, tự hỏi: điều này có đúng với nhóm mình không? Ghi câu trả lời thật bên cạnh." },
          { label: "Nhóm chốt", detail: "Mang bảng đã sửa vào cuộc họp. Người chịu trách nhiệm chốt và ghi lý do." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "AI làm tốt",
          text: "Liệt kê ưu nhược điểm thường gặp, nhắc điều bạn dễ quên (chi phí đào tạo, thời gian chuyển đổi), trình bày gọn thành bảng để cả nhóm cùng nhìn.",
        },
        right: {
          label: "Bạn phải làm",
          text: "Cân từng dòng theo hoàn cảnh nhóm, kiểm các con số AI tự điền, hỏi những người bị ảnh hưởng, và chịu trách nhiệm cho lựa chọn cuối cùng.",
        },
      },
      {
        type: "callout",
        label: "Đừng để bảng chọn thay bạn",
        text: "Bảng nhiều dòng \"được\" hơn không có nghĩa hướng đó tốt hơn. Một dòng như \"không bị gián đoạn khi người phụ trách nghỉ\" có thể nặng hơn cả năm dòng còn lại, và chỉ bạn mới biết điều đó.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập bảng so sánh hai cách theo dõi việc",
        task: "Nhóm 6 người đang theo dõi việc bằng email và muốn thử một bảng theo dõi chung. Lắp prompt để AI lập bảng được và mất, đồng thời chỉ ra chỗ nó chỉ đoán.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Nên theo dõi việc bằng email hay bằng bảng chung?", feedback: "Không có hoàn cảnh nào, nên AI trả lời bằng lời khuyên chung cho mọi nhóm." },
              {
                text: "Nhóm 6 người, hiện theo dõi việc qua email, có 3 người hay đi công tác, hạn chốt cách làm là cuối tháng.",
                good: true,
                feedback: "Có số người, thói quen và hạn, những mảnh mà AI không thể tự biết.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Cho tôi biết cách nào tốt hơn.", feedback: "Bạn giao AI đi phán, trong khi nó không chịu hậu quả và không biết hết hoàn cảnh." },
              {
                text: "Lập bảng được và mất của từng cách, và có một cột \"giả định của bạn về nhóm tôi\".",
                good: true,
                feedback: "Cột giả định buộc AI lộ ra những chỗ nó đang đoán để bạn kiểm.",
              },
            ],
          },
          {
            id: "format",
            label: "Điều cần tránh",
            options: [
              {
                text: "Tôi lo nhất là việc bị sót khi người phụ trách đi công tác, hãy lưu ý điều này khi cân từng dòng.",
                good: true,
                feedback: "Nói rõ điều quan trọng nhất giúp AI xếp mức nặng nhẹ cho các dòng.",
              },
              { text: "Hãy viết thật chi tiết và đầy đủ mọi mặt.", feedback: "\"Đầy đủ mọi mặt\" cho ra bảng dài mà mọi dòng nặng ngang nhau." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| | Giữ email | Chuyển bảng chung | Giả định của tôi về nhóm bạn |\n|---|---|---|---|\n| Được | Quen tay, không cần học lại | Ai cũng thấy việc nào chưa xong, kể cả khi người phụ trách đi công tác | Tôi giả định 3 người đi công tác hay quên cập nhật, hãy kiểm |\n| Mất | Dễ sót việc khi người phụ trách vắng | Cả nhóm cần thời gian làm quen | Tôi giả định cả 6 người chịu dùng, hãy hỏi |\n\nVì bạn lo nhất là sót việc khi người phụ trách vắng, dòng đầu tiên đáng cân nhắc nhất. Đây là thông tin chung, còn quyết định phụ thuộc vào điều bạn kiểm ở cột cuối.",
          },
          {
            requires: ["context"],
            text: "So sánh:\n- Email: quen thuộc, dễ dùng, nhưng dễ thất lạc.\n- Bảng chung: minh bạch, nhưng cần thời gian làm quen.\n\nCả hai đều có ưu nhược điểm riêng, nên tuỳ hoàn cảnh nhóm bạn.\n\n(Đúng nhưng chung chung: không cân theo hoàn cảnh và không chỉ ra chỗ nào AI đang đoán.)",
          },
          {
            text: "Nên chuyển sang bảng chung: sẽ giúp nhóm tiết kiệm 8 giờ mỗi tuần và giảm 40% sai sót ngay từ tháng đầu.\n\n(Toàn con số AI tự nghĩ ra và lại phán thay bạn, trong khi bạn chưa đưa số giờ hay số sai sót nào của nhóm.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Buổi họp chốt cách theo dõi việc",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn mang vào họp bảng do AI lập. Một dòng ghi: \"Chuyển sang bảng chung tiết kiệm khoảng 5 giờ mỗi tuần cho cả nhóm.\" Một bạn hỏi: 5 giờ này ở đâu ra?",
            choices: [
              { label: "Trả lời \"AI tính ra như vậy\" và chuyển sang phần tiếp theo", next: "bad_ai" },
              { label: "Nói thật đây là ước lượng chung, rồi hỏi cả nhóm mỗi người đang mất bao nhiêu phút mỗi tuần cho việc cập nhật", next: "s2" },
            ],
          },
          bad_ai: {
            text: "Không ai phản đối ngay, nhưng trong bụng nhiều người không tin. Ba tuần sau bảng chung chạy, mọi người vẫn mất cùng thời gian, và họ nói với nhau \"đã bảo con số đó không có thật\". Lần sau bạn đề xuất gì cũng bị hỏi vặn.",
            ending: "bad",
          },
          s2: {
            text: "Cả nhóm ước thấy chỉ mất khoảng 40 phút mỗi người mỗi tuần vào việc này. Số thật nhỏ hơn 5 giờ nhiều. Nhưng một bạn nói: điều bực nhất là việc bị sót khi người phụ trách vắng.",
            choices: [
              { label: "Chốt chuyển sang bảng chung vì lý do sót việc, ghi số giờ tiết kiệm là chưa rõ", next: "good" },
              { label: "Bỏ ý định chuyển vì thời gian tiết kiệm nhỏ hơn AI nói", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Quyết định nghe có lý theo con số, nhưng lỗi sót việc mỗi khi người phụ trách vắng vẫn tiếp diễn, đúng thứ nhóm khó chịu nhất. Bạn bỏ mất lý do thật để chuyển chỉ vì lý do AI đưa ra hoá ra sai.",
            ending: "bad",
          },
          good: {
            text: "Nhóm chốt thử bảng chung một tháng với lý do thật của chính họ, và ghi ngày xem lại. Cả nhóm thấy mình được nghe, còn bạn có một quyết định có lý do để giải thích với sếp.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI cho bảng chung; bạn và nhóm cho điều riêng, rồi cùng chốt.",
          "Bài sau: một bảng so sánh có những con số không ai cung cấp - bạn sẽ soát từng số.",
        ],
      },
    ],
  },
  {
    id: 2072,
    slug: "bat-loi-trong-bang-so-sanh-cua-ai",
    title: "Chặng 33, Bài 13: Bảng so sánh của AI có chỗ bịa số",
    subtitle: "Bảng đẹp, số chính xác đến hai chữ số thập phân, và không ai biết chúng từ đâu ra.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng so sánh có con số luôn thuyết phục hơn bảng toàn chữ, và AI biết điều đó. Nếu bạn không hỏi mỗi số từ đâu ra thì con số nó tự nghĩ sẽ đi thẳng vào slide họp và vào quyết định của nhóm. Soát từng số mất năm phút, còn sửa một quyết định dựa trên số bịa có thể mất cả quý.",
    openingQuestion:
      "Bảng AI so sánh tự làm và thuê ngoài có dòng \"chi phí thuê ngoài rẻ hơn 35%\". Bạn chưa từng đưa báo giá nào. Điều đầu tiên bạn hỏi là gì?",
    openingOptions: [
      "Con số 35% này dựa trên báo giá hay dữ liệu nào bạn đã đưa cho tôi",
      "Có thể làm tròn 35% thành 40% cho dễ nhớ trong buổi họp không",
      "Bạn có chắc không, để tôi hỏi lại thêm một lần nữa cho yên tâm trước khi họp",
      "Có thể thêm một dòng khác cũng có con số rõ ràng như vậy không",
    ],
    correctOption: 0,
    explanation:
      "Bạn chưa đưa báo giá nào, nên 35% chỉ có thể đến từ việc AI đoán. Hỏi nó dựa trên dữ liệu nào giúp lộ ra ngay rằng nó không có nguồn. Làm tròn hay thêm dòng có số chỉ tạo thêm số không gốc. Còn hỏi lại \"có chắc không\" thì AI thường trả lời tự tin y như lần đầu, nên nó không thay được việc hỏi nguồn.",
    diagram: [
      { label: "Bảng AI có các con số", arrow: true },
      { label: "Hỏi từng số: bạn đã đưa hay AI tự thêm?", arrow: true },
      { label: "Số không có nguồn thì gạch bỏ hoặc đánh dấu chưa kiểm", arrow: true },
      { label: "Chỉ số đã kiểm mới dùng để quyết định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm mua hàng nhờ AI so sánh hai cách nhập hàng. Bảng có dòng \"thời gian giao trung bình: 3,2 ngày so với 5,8 ngày\". Chị hỏi số này ở đâu ra thì AI trả lời đó là ước lượng ngành. Chị gạch cả hai số, ghi \"hỏi nhà cung cấp\" và gửi email xin báo cáo giao hàng thật của ba tháng qua, số liệu thật hoá ra khác hẳn.",
    },
    quiz: [
      Q(
        "Điều gì cho biết một con số trong bảng của AI có thể là bịa?",
        [
          "Bạn chưa từng đưa nó vào prompt và cũng không có nguồn nào kèm theo",
          "Nó có phần thập phân, ví dụ 3,2 hoặc 12,5",
          "Nó nằm ở dòng cuối của bảng nên ít được ai đọc kỹ và dễ lọt qua",
          "Nó khác với con số bạn nhớ mang máng từ buổi họp trước",
        ],
        "Dấu hiệu chắc chắn nhất là số xuất hiện mà bạn không hề đưa và không có nguồn. Số thập phân không nói gì về thật hay bịa, vị trí trong bảng cũng vậy, còn trí nhớ mang máng của bạn có thể sai hơn AI. Cách kiểm đúng là truy ngược từng số về nơi nó xuất hiện."
      ),
      Q(
        "AI trả lời \"số này lấy từ báo cáo ngành 2023\" nhưng không kèm đường dẫn hay tên báo cáo. Nên làm gì?",
        [
          "Coi số đó là chưa kiểm chứng cho tới khi bạn tự tìm được báo cáo",
          "Tin vì nó đã nêu năm rõ ràng và tên loại báo cáo nên chắc là có thật",
          "Ghi vào bảng nguồn \"báo cáo ngành 2023\" để nhìn cho đáng tin",
          "Nhờ AI viết thêm tên báo cáo và đường dẫn cho đầy đủ rồi dùng luôn cho kịp buổi họp",
        ],
        "Một cái năm và cụm \"báo cáo ngành\" rất dễ bịa mà vẫn nghe thật. Không thể chép nguồn chưa mở ra vào bảng, và nhờ AI viết tên báo cáo thì có thể nó bịa luôn tên. Chỉ khi bạn tự mở báo cáo và thấy con số ở đó thì số mới được coi là kiểm chứng."
      ),
      Q(
        "Bảng có dòng \"nhóm bạn xử lý 120 cuộc gọi mỗi tuần\" và bạn nhớ mình đã đưa đúng số này cho AI. Nên xử lý thế nào?",
        [
          "Giữ, vì đó là số của bạn; chỉ kiểm xem nó còn đúng với tuần này không",
          "Gạch bỏ như mọi con số khác trong bảng vì số AI đưa ra đều không đáng tin",
          "Đổi ngay thành số khác để bảng nhìn không giống bản gốc",
          "Hỏi AI nguồn của 120 rồi tin vào câu trả lời mà nó đưa",
        ],
        "Số bạn tự đưa vào có gốc rõ ràng, việc bạn cần kiểm chỉ là nó còn cập nhật không. Gạch mọi số là cực đoan và bỏ mất dữ kiện thật. Đổi số cho khác đi là làm sai lệch chính dữ kiện của bạn, còn hỏi AI nguồn của số bạn vừa đưa thì vô nghĩa vì nguồn là chính bạn."
      ),
      Q(
        "Sau khi soát bảng, có 3 số chưa kiểm được và cuộc họp chốt trong 10 phút nữa. Bạn nên làm gì?",
        [
          "Giữ bảng nhưng gạch 3 số đó, ghi \"chưa kiểm chứng\" và nói rõ trong họp",
          "Xoá luôn 3 số và giữ bảng như đã đủ, không nhắc tới chúng",
          "Giữ nguyên 3 số vì không ai trong buổi họp sẽ kiểm tra chúng",
          "Hoãn cuộc họp vì bảng có số chưa kiểm thì không thể dùng được",
        ],
        "Nói thật rằng số chưa kiểm cho phép cuộc họp tiếp tục mà không dựa vào số không có gốc. Xoá lặng lẽ thì mất thông tin rằng có dữ kiện cần bổ sung. Giữ nguyên là chấp nhận rủi ro không ai được biết, còn hoãn họp thì quá tay khi phần lớn bảng vẫn dùng được."
      ),
      Q(
        "Cách nào giúp AI ít bịa số hơn trong lần lập bảng sau?",
        [
          "Dặn rõ: chỉ dùng số tôi cung cấp, chỗ nào thiếu ghi \"cần bổ sung\"",
          "Dặn AI \"đừng bịa\" ở cuối prompt bằng chữ in hoa cho nó nhớ",
          "Hỏi AI \"số nào là thật\" sau khi đã có bảng để nó tự lọc",
          "Chọn một AI đắt hơn vì nó không bao giờ đưa ra số sai",
        ],
        "Cho AI một luật cụ thể và một lối thoát (ghi \"cần bổ sung\") làm giảm cám dỗ điền số. Chữ in hoa \"đừng bịa\" không thay đổi cách nó viết, còn hỏi nó số nào thật thì nó có thể khẳng định cả số nó vừa nghĩ ra. Không có công cụ nào đảm bảo không bao giờ sai số."
      ),
    ],
    keyTakeaways: [
      "Số nào bạn không đưa và không có nguồn thì coi là chưa kiểm chứng.",
      "Hỏi từng số: bạn đưa hay AI tự thêm? Nguồn ở đâu?",
      "Nguồn phải được mở ra và thấy số ở đó; tên báo cáo AI viết chưa đủ.",
      "Số chưa kiểm thì gạch hoặc đánh dấu, và nói rõ trong họp.",
      "Dặn AI chỉ dùng số bạn cung cấp và ghi \"cần bổ sung\" chỗ còn thiếu.",
    ],
    practicePrompt: {
      question:
        "Bảng có dòng \"Thời gian đào tạo: 2 tuần (hướng A) so với 6 tuần (hướng B)\". Bạn chưa hề cung cấp số nào về đào tạo. Cách xử lý đúng là gì?",
      options: [
        "Gạch hai số, ghi \"chưa kiểm\" và hỏi người sẽ đào tạo ước lượng thật",
        "Giữ hai số vì chúng có vẻ hợp lý với những gì bạn từng biết",
        "Cộng hai số lại thành 8 tuần để tính tổng thời gian cho cả hai hướng",
        "Chỉ giữ số của hướng A vì nó nhỏ hơn và có lợi cho đề xuất",
      ],
      correct: 0,
      explanation:
        "Bạn không cung cấp thời gian đào tạo nên cả hai số đều do AI đoán. Người phụ trách đào tạo mới là nguồn thật. Giữ vì \"hợp lý\" là tin cảm giác, cộng hai số vô nghĩa vì đó là hai hướng thay thế nhau chứ không cộng dồn, còn chọn số có lợi cho mình là thiên vị dữ liệu.",
    },
    summary: {
      keyIdea: "Mỗi con số trong bảng phải trả lời được: ai đưa, nguồn ở đâu, bạn đã mở ra chưa.",
      formula: "Số bạn đưa → giữ. Số AI thêm + có nguồn mở được → giữ. Số AI thêm + không nguồn → gạch.",
      commonMistake: "Hỏi lại chính AI \"có chắc không\" và coi câu trả lời là kiểm chứng.",
      action: "Lấy một bảng AI từng làm cho bạn và tô màu các số bạn không cung cấp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm một bảng so sánh hay báo cáo ngắn mà AI đã viết cho bạn trong tuần qua (hoặc nhờ AI làm mới một bảng về việc nhóm bạn). Với mỗi con số, đánh dấu một trong ba nhãn: \"tôi đưa\", \"có nguồn đã mở\", \"chưa kiểm\". Đếm số nhãn \"chưa kiểm\" và xử lý từng số đó. Ngày mai dashboard sẽ hỏi bạn có bao nhiêu số chưa kiểm.",
      secondary: "Không dán dữ liệu khách hàng hay số nội bộ nhạy cảm vào công cụ khi thử.",
    },
    sections: [
      {
        type: "lead",
        text: "Buổi họp sắp bắt đầu, bạn vừa nhận bảng so sánh từ AI: sạch, có màu, đầy con số. Bạn định chiếu nó lên màn hình. Nhưng nhìn kỹ, có vài con số bạn không nhớ đã đưa cho ai. Bài này dạy cách soát từng số trong năm phút.",
      },
      {
        type: "feynman",
        title: "Bắt lỗi bảng của AI đơn giản hơn bạn nghĩ",
        intro:
          "Bạn nhờ người quen đi chợ hộ và ghi lại giá: cá 90, rau 20, thịt 130. Về nhà có đủ hoá đơn thì bạn mới tin giá; nếu không có hoá đơn thì đó chỉ là trí nhớ của người đi chợ. AI cũng vậy: con số không có hoá đơn thì phải hỏi lại.",
        columns: ["Thành phần", "Đi chợ hộ", "Bảng của AI"],
        rows: [
          ["Con số", "Giá từng món", "Từng ô số trong bảng"],
          ["Bằng chứng", "Hoá đơn, tem giá", "Nguồn mở được, hoặc số chính bạn đưa"],
          ["Không có bằng chứng", "Chỉ là nhớ lại, có thể nhầm", "Có thể là số AI tự nghĩ cho nghe hợp lý"],
        ],
        oneLiner: "Số không có hoá đơn là số chưa kiểm: hỏi nguồn, mở nguồn, rồi mới tin.",
      },
      { type: "heading", text: "Vì sao AI bịa số trong bảng" },
      {
        type: "paragraph",
        text: "AI viết chữ tiếp theo nghe hợp lý nhất. Trong một bảng so sánh, một ô số bỏ trống nghe kỳ, còn một con số như \"rẻ hơn 35%\" nghe hoàn chỉnh. Nên khi bạn không đưa số, nó dễ điền số cho đầy bảng, và điền bằng đúng giọng chắc chắn như phần thật.",
      },
      {
        type: "list",
        items: [
          "Hỏi: số này bạn đưa cho AI, hay AI tự thêm?",
          "Nếu AI thêm: nó ghi nguồn nào, và nguồn đó bạn mở ra thấy số chưa?",
          "Không có nguồn mở được: gạch số hoặc ghi \"chưa kiểm\" và nói rõ khi trình bày.",
        ],
      },
      {
        type: "flow",
        title: "Soát một bảng trong năm phút",
        steps: [
          { label: "Tô các con số", detail: "Dùng bút hoặc màu tô mọi số trong bảng, kể cả số nhỏ và phần trăm. Đừng bỏ sót chỗ nào." },
          { label: "Gạch số bạn đã đưa", detail: "Số nào chính bạn cung cấp thì có gốc, chỉ cần kiểm nó còn đúng thời điểm này không." },
          { label: "Hỏi nguồn số còn lại", detail: "Với số AI tự thêm, hỏi nó dựa vào đâu. Nếu nó nói chung chung như \"ước lượng ngành\", coi như chưa có nguồn." },
          { label: "Tự mở nguồn", detail: "Nếu có nguồn, bạn mở ra và tìm đúng con số. Chỉ khi thấy nó ở đó bạn mới coi là đã kiểm." },
          { label: "Đánh dấu hoặc gạch", detail: "Số chưa kiểm được thì gạch hoặc ghi \"chưa kiểm\", và nói thẳng khi trình bày." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Số đáng tin",
          text: "Số chính bạn đưa vào prompt, hoặc số có nguồn mà bạn đã mở ra và thấy đúng con số đó.",
        },
        right: {
          label: "Số cần nghi ngờ",
          text: "Số bạn chưa hề đưa, phần trăm tròn trĩnh, nguồn chỉ nói chung chung như \"theo nghiên cứu\" hay \"ước tính ngành\".",
        },
      },
      {
        type: "callout",
        label: "Hỏi lại AI chưa phải kiểm chứng",
        text: "Hỏi \"bạn có chắc không?\" thường được đáp bằng một câu tự tin, thậm chí xin lỗi rồi đổi sang một con số khác cũng không có nguồn. Kiểm chứng là việc bạn mở nguồn ngoài AI, không phải một lượt hỏi nữa.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng so sánh tự làm và thuê ngoài chăm sóc khách",
        task: "Bạn đưa AI: nhóm có 4 người, nhận khoảng 120 cuộc gọi mỗi tuần (số minh hoạ), chưa có báo giá nào của bên thuê ngoài. Nhờ AI so sánh. Đánh dấu những đoạn AI tự thêm mà bạn chưa đưa.",
        segments: [
          { text: "Nhóm hiện có 4 người, xử lý khoảng 120 cuộc gọi mỗi tuần." },
          {
            text: "Chi phí thuê ngoài rẻ hơn khoảng 35% so với tự làm.",
            error: "Bạn chưa đưa báo giá nào của bên thuê ngoài, nên 35% là con số AI tự điền cho bảng có vẻ chắc chắn.",
          },
          { text: "Tự làm giúp nhóm hiểu khách hơn vì trực tiếp nghe từng cuộc gọi." },
          {
            text: "Nhà cung cấp thuê ngoài phổ biến nhất trả lời khách trong vòng 5 phút.",
            error: "Không có nhà cung cấp cụ thể nào được nêu và không có nguồn cho con số 5 phút; AI dựng một thông số cho nghe thật.",
          },
          { text: "Thuê ngoài cần thời gian hướng dẫn để họ nắm được sản phẩm của công ty." },
          {
            text: "Sau 6 tháng, thuê ngoài giúp tăng mức hài lòng của khách thêm 12 điểm phần trăm.",
            error: "Bạn chưa đưa số liệu hài lòng nào, và \"6 tháng\", \"12 điểm\" là chi tiết không có căn cứ nhưng nghe rất cụ thể.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Mười phút trước buổi họp chốt hướng đi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa soát và tìm thấy 3 số trong bảng không có nguồn. Buổi họp bắt đầu sau 10 phút, và sếp muốn dùng bảng này để quyết.",
            choices: [
              { label: "Xoá lặng lẽ 3 số đó và trình bày phần còn lại như thể bảng vốn dĩ như vậy", next: "bad_hide" },
              { label: "Gạch 3 số, ghi \"chưa kiểm\" bên cạnh và chuẩn bị nói rõ khi trình bày", next: "s2" },
            ],
          },
          bad_hide: {
            text: "Buổi họp trôi chảy. Nhưng sếp hỏi lại về chi phí, và không ai biết dòng chi phí đang thiếu vì đâu. Sau đó có người tìm ra bản gốc có 3 số bạn đã xoá và hỏi vì sao bạn giấu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nói: \"Bảng này có 3 số tôi chưa kiểm được: chi phí, thời gian trả lời và mức hài lòng. Nếu quyết hôm nay, mình nên dựa vào phần còn lại.\" Sếp hỏi: \"Vậy cần gì để kiểm?\"",
            choices: [
              { label: "Nói \"Xin báo giá từ hai bên thuê ngoài, hạn thứ Năm, tôi phụ trách\" và ghi vào biên bản họp", next: "good" },
              { label: "Nói \"Chắc cũng gần đúng, cứ quyết luôn cũng được\"", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Sếp đồng ý vì bạn nghe tự tin. Hai tuần sau báo giá thật về, cao hơn con số trong bảng rất nhiều, và bạn phải quay lại họp lại từ đầu, mất nhiều thời gian hơn lúc đầu.",
            ending: "bad",
          },
          good: {
            text: "Cả phòng đồng ý hoãn phần chi phí tới thứ Năm và chốt các phần khác ngay. Sếp ghi nhận bạn đã nói thẳng chỗ chưa chắc chắn, và lần sau tin bảng của bạn hơn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Số không có hoá đơn là số chưa kiểm: hỏi nguồn, mở nguồn, rồi mới dùng.",
          "Bài sau: hai người trong nhóm bất đồng và cùng tìm đến bạn.",
        ],
      },
    ],
  },
  {
    id: 2073,
    slug: "khi-hai-nguoi-trong-nhom-bat-dong",
    title: "Chặng 33, Bài 14: Hai bạn trong nhóm bất đồng và cùng tìm đến bạn",
    subtitle: "Mỗi người một phiên bản câu chuyện, và bạn cần dữ kiện trước khi nói bất cứ điều gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhắn riêng cho bạn cùng một lúc, hai bạn trong nhóm kể hai phiên bản khác nhau của cùng một chuyện, và cả hai đều thấy mình đúng. Nếu bạn tin phiên bản đầu tiên, người kia sẽ nhận ra ngay. Điều bạn cần là hỏi dữ kiện, nghe cả hai phía, chọn bước tiếp theo mà cả hai chấp nhận được. AI chỉ giúp bạn chuẩn bị, và chuyện riêng của họ không được đưa vào công cụ.",
    openingQuestion:
      "Sáng nay hai bạn trong nhóm nhắn riêng cho bạn, mỗi người kể một phiên bản khác nhau về chuyện ai làm sai bàn giao. Bước đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Hỏi từng người dữ kiện: ai làm gì, lúc nào, có ghi lại ở đâu không",
      "Chọn tin người bạn quen làm việc lâu hơn vì bạn hiểu tính người đó",
      "Nhắn chung vào nhóm rằng ai sai thì nên nhận lỗi để mọi chuyện êm và công việc không bị ảnh hưởng",
      "Chưa làm gì cho tới khi hai người tự xử với nhau xong và báo lại",
    ],
    correctOption: 0,
    explanation:
      "Trước khi quyết định điều gì bạn cần dữ kiện, và hỏi từng người những câu có thể kiểm được như ai làm gì, lúc nào, có ghi lại ở đâu. Chọn tin người quen lâu hơn là thiên vị mà hai người đều nhìn ra. Nhắn vào nhóm bắt ai đó nhận lỗi trước cả nhóm là làm xấu mặt một người khi chưa biết ai đúng. Còn đợi họ tự xử thì mâu thuẫn thường nặng thêm và bạn mất cơ hội hiểu chuyện gì thật sự xảy ra.",
    diagram: [
      { label: "Nghe từng người, hỏi dữ kiện kiểm được", arrow: true },
      { label: "Đối chiếu với ghi chép bàn giao thật", arrow: true },
      { label: "Chọn bước tiếp theo: gặp chung hoặc sửa quy trình", arrow: true },
      { label: "Nói lại điều đã thống nhất, ghi một dòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: hai bạn trong nhóm vận hành cùng nhắn cho trưởng nhóm về một lỗi bàn giao ca. Chị hỏi mỗi người một câu giống nhau: bạn đã ghi bàn giao ở đâu và lúc mấy giờ? Hoá ra cả hai đều đã nói bằng miệng nhưng không ai ghi lại. Chị không phân xử ai sai mà đề xuất một mẫu bàn giao ghi ba dòng, và hai bạn cùng đồng ý dùng.",
    },
    quiz: [
      Q(
        "Khi hai người nhắn riêng kể hai phiên bản khác nhau, bạn nên hỏi họ điều gì trước?",
        [
          "Sự việc xảy ra lúc nào, ai làm gì và có ghi chép ở đâu",
          "Bạn cảm thấy thế nào về người kia và vì sao bạn tức",
          "Bạn nghĩ người kia là người như thế nào khi làm việc chung",
          "Bạn muốn tôi phạt hay nhắc nhở người kia theo cách nào",
        ],
        "Câu hỏi dữ kiện cho bạn thứ để đối chiếu và ít gây tranh cãi. Câu hỏi về cảm xúc có lúc cần, nhưng chưa phải bước đầu. Hỏi \"người kia là người thế nào\" mời đánh giá tính cách, còn hỏi muốn phạt ai như thế nào thì bạn đã tự đặt mình làm quan toà trước khi biết chuyện."
      ),
      Q(
        "Điều nào KHÔNG nên đưa vào công cụ AI khi bạn chuẩn bị cho chuyện này?",
        [
          "Tên hai người, nội dung tin nhắn riêng và chi tiết chuyện cá nhân của họ",
          "Mô tả tình huống theo vai trò như bạn A bàn giao và bạn B nhận, không có tên hay chi tiết riêng",
          "Câu hỏi về cách mở đầu một buổi trò chuyện ba bên cho cân bằng",
          "Yêu cầu gợi ý ba câu hỏi dữ kiện trung lập để hỏi mỗi người",
        ],
        "Tin nhắn riêng và chi tiết cá nhân của đồng nghiệp là thông tin nhạy cảm; dán vào ô chat là gửi nó ra ngoài công ty và ra ngoài sự tin cậy của họ. Mô tả theo vai trò, hỏi cách mở đầu hay xin câu hỏi dữ kiện thì không lộ ai là ai nên an toàn hơn nhiều."
      ),
      Q(
        "Sau khi nghe cả hai, bạn thấy cả hai đều có phần đúng và chưa ai ghi lại việc bàn giao. Bước tiếp theo hợp lý là gì?",
        [
          "Đề xuất một cách ghi bàn giao đơn giản mà cả hai cùng dùng từ nay",
          "Chọn một người nhận lỗi trước cả hai để chuyện nhanh chóng khép lại và không kéo dài",
          "Bảo hai người tự làm lành và đừng làm phiền bạn nữa",
          "Ghi nhận cả hai bị nhắc nhở để bảo đảm công bằng như nhau",
        ],
        "Khi lỗi nằm ở quy trình, sửa quy trình là bước có ích nhất và không cần ai thua. Bắt một người nhận lỗi, đẩy hai người tự lo, hay nhắc nhở cả hai đều không giải quyết nguyên nhân, và cả hai sẽ thấy bạn không thật sự lắng nghe."
      ),
      Q(
        "Một người nhờ bạn: \"Đừng nói với bạn kia là em đã kể nhé.\" Bạn nên trả lời thế nào?",
        [
          "Nói rõ bạn sẽ không nói ai kể gì, nhưng không hứa giữ kín mọi thứ nếu chuyện ảnh hưởng tới công việc",
          "Hứa giữ kín mọi thứ để họ yên tâm và tiếp tục kể cho bạn nghe những chuyện khác nữa, vì họ đã tin bạn rồi",
          "Nói ngay rằng bạn sẽ báo lại cho người kia biết ai đã kể gì, vì minh bạch giữa hai bên là điều tốt nhất",
          "Từ chối nghe tiếp vì chuyện riêng của hai người thì không liên quan gì đến vai trò của bạn cả",
        ],
        "Bạn không nên hứa điều mình không giữ được: nếu vấn đề ảnh hưởng công việc, có thể bạn phải hành động. Nhưng bạn có thể hứa cẩn trọng về việc ai kể gì. Hứa giữ kín tuyệt đối dễ thành lời hứa gãy, kể lại ngay làm mất niềm tin, còn từ chối nghe là bỏ rơi người đang cần bạn."
      ),
      Q(
        "Điều gì cho thấy bạn đã xử lý xong một mâu thuẫn theo hướng tốt?",
        [
          "Cả hai hiểu rõ cái gì đã thống nhất và biết bước làm tiếp theo",
          "Không ai nhắn cho bạn về chuyện này nữa trong vài ngày tới",
          "Người bị coi là sai đã xin lỗi trước mặt cả nhóm cho bạn thấy là xong",
          "Cả hai nói \"ok, không sao\" khi bạn hỏi ở cuối cuộc họp",
        ],
        "Kết quả tốt là cả hai nói lại được điều đã thống nhất và bước tiếp theo, ghi lại ngắn gọn. Im lặng có thể chỉ là giận ngầm, lời xin lỗi trước cả nhóm dễ để lại vết, còn \"ok, không sao\" trong họp thường là cách để chấm dứt sự khó chịu chứ không phải giải quyết nó."
      ),
    ],
    keyTakeaways: [
      "Hai phiên bản khác nhau: hỏi dữ kiện kiểm được trước, chưa phán ai đúng.",
      "Nhiều mâu thuẫn là lỗi quy trình, sửa quy trình để không ai phải thua.",
      "Chuyện riêng của đồng nghiệp không đưa vào công cụ AI; mô tả theo vai trò.",
      "Không hứa giữ kín điều bạn không giữ được.",
      "Kết thúc bằng một dòng ghi: đã thống nhất gì, ai làm gì tiếp.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn AI giúp soạn câu hỏi cho buổi gặp ba bên. Cách nào vừa hữu ích vừa an toàn?",
      options: [
        "Mô tả theo vai trò \"người bàn giao\" và \"người nhận\", không kèm tên hay tin nhắn",
        "Dán nguyên hai tin nhắn riêng và tên hai người để AI hiểu rõ nhất",
        "Dán tên hai người và nhờ AI đoán ai có khả năng là người sai",
        "Bỏ hẳn AI vì mọi chuyện liên quan tới mâu thuẫn trong nhóm đều không nên đụng tới, dù chỉ để nhờ gợi ý",
      ],
      correct: 0,
      explanation:
        "AI chỉ cần cấu trúc tình huống để gợi ý câu hỏi, không cần biết ai là ai. Mô tả theo vai trò giữ được bí mật. Dán tin nhắn riêng và tên vi phạm sự tin cậy, nhờ AI đoán ai sai là để một hệ thống không biết gì về hai người phán, và bỏ hẳn AI thì mất phần trợ giúp hợp lý ở bước chuẩn bị.",
    },
    summary: {
      keyIdea: "Nghe cả hai, hỏi dữ kiện, tìm chỗ quy trình hở, và giữ chuyện riêng ngoài công cụ AI.",
      formula: "Dữ kiện kiểm được → đối chiếu ghi chép → bước tiếp theo cả hai chấp nhận → ghi một dòng.",
      commonMistake: "Tin phiên bản đến trước hoặc tin người mình quen hơn, rồi nói trước khi có dữ kiện.",
      action: "Viết sẵn ba câu hỏi dữ kiện trung lập để dùng lần tới có người tìm bạn kể về đồng nghiệp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nghĩ tới một bất đồng nhỏ đã từng xảy ra trong nhóm. Không dùng tên người, viết tình huống theo vai trò trong 3 dòng, nhờ AI gợi ý ba câu hỏi dữ kiện và một cách mở đầu buổi trò chuyện. Chọn ra câu hỏi bạn thấy dùng được và chép vào sổ tay. Ngày mai dashboard sẽ hỏi bạn có ba câu hỏi đó chưa.",
      secondary: "Tên, tin nhắn riêng và chuyện gia đình hay sức khoẻ của ai đó tuyệt đối không dán vào công cụ.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín giờ sáng, hai tin nhắn riêng đến trong vòng năm phút. Bạn A nói bạn B không bàn giao đủ. Bạn B nói bạn A không đọc ghi chú. Cả hai đều xin bạn \"giúp giải quyết\" và mỗi người kể rất thuyết phục. Bài này dạy bạn bước đầu tiên, khi chưa biết ai đúng.",
      },
      {
        type: "feynman",
        title: "Hai phiên bản của một câu chuyện đơn giản hơn bạn nghĩ",
        intro:
          "Hai người đứng ở hai góc của một ngã tư nhìn một va chạm giao thông. Mỗi người kể đúng những gì mình thấy và hai lời kể khác nhau. Không ai nói dối, họ chỉ nhìn từ hai góc. Người điều tra giỏi không chọn một lời kể mà hỏi: bạn đứng đâu, bạn thấy lúc mấy giờ, có camera nào không?",
        columns: ["Thành phần", "Va chạm ở ngã tư", "Hai người trong nhóm"],
        rows: [
          ["Hai lời kể", "Mỗi người đứng một góc", "Mỗi người kể từ vị trí và cảm xúc của mình"],
          ["Câu hỏi giúp ích", "Bạn đứng đâu, có camera không?", "Bạn làm gì lúc nào, ghi lại ở đâu?"],
          ["Điều cần tìm", "Sự việc thật, không phải ai to tiếng hơn", "Chỗ quy trình hở, không phải người để đổ lỗi"],
        ],
        oneLiner: "Hai lời kể khác nhau chưa chắc có ai nói dối: hỏi dữ kiện, tìm chỗ hở của quy trình.",
      },
      { type: "heading", text: "Vì sao nên hỏi dữ kiện trước" },
      {
        type: "paragraph",
        text: "Khi người ta kể một mâu thuẫn, họ thường đưa cảm xúc và kết luận: \"bạn ấy luôn như vậy\". Dữ kiện là thứ có thể kiểm: gửi lúc nào, ghi ở đâu, ai có mặt. Hỏi dữ kiện làm cuộc trò chuyện bớt đổ lỗi và cho bạn thứ để đối chiếu thay vì phải chọn tin ai.",
      },
      {
        type: "list",
        items: [
          "Nghe hết trước, chưa đưa kết luận và chưa hứa gì.",
          "Hỏi ba câu dữ kiện: chuyện xảy ra lúc nào, ai làm gì, có ghi lại ở đâu.",
          "Đối chiếu với ghi chép thật nếu có, rồi mới nghĩ tới bước tiếp theo.",
        ],
      },
      {
        type: "flow",
        title: "Từ hai lời kể đến một bước tiếp theo",
        steps: [
          { label: "Nghe từng người riêng", detail: "Cho mỗi người kể hết. Chưa đồng tình hay phản đối, chỉ tóm tắt lại để họ thấy bạn đã hiểu." },
          { label: "Hỏi dữ kiện", detail: "Lúc nào, ai làm gì, có ghi lại ở đâu. Những câu này có thể kiểm và ít gây tranh cãi." },
          { label: "Đối chiếu ghi chép", detail: "Mở tin nhắn, biên bản, bảng theo dõi. Nếu không có ghi chép thì chính việc này là chỗ hở." },
          { label: "Chọn bước tiếp", detail: "Gặp chung có bạn ở giữa, hoặc sửa quy trình, hoặc cả hai. Không ai phải nhận lỗi trước cả nhóm." },
          { label: "Ghi một dòng", detail: "Ghi lại điều đã thống nhất và ai làm gì tiếp, gửi cho cả hai để không có phiên bản thứ ba." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nên nói",
          text: "\"Mình muốn hiểu rõ trước: bạn đã gửi ghi chú bàn giao lúc mấy giờ, và gửi ở đâu?\" Câu hỏi có thể kiểm, không nghiêng về ai.",
        },
        right: {
          label: "Nên tránh",
          text: "\"Bạn kia luôn như vậy à?\" hay \"Nghe thì lỗi bên bạn kia rồi\". Câu đầu mời đánh giá tính cách, câu sau kết luận khi chưa có dữ kiện.",
        },
      },
      {
        type: "callout",
        label: "Chuyện riêng không vào ô chat",
        text: "Tin nhắn riêng, tên người, chuyện gia đình hay sức khoẻ của đồng nghiệp không đưa vào công cụ AI. Nếu cần AI giúp, mô tả theo vai trò: \"người bàn giao\", \"người nhận\". AI chỉ cần cấu trúc, không cần biết ai là ai.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chuẩn bị câu hỏi mà không lộ chuyện riêng",
        task: "Hai đồng nghiệp bất đồng về chuyện bàn giao. Lắp prompt để AI gợi ý câu hỏi cho buổi gặp, mà không đưa tên hay tin nhắn riêng vào.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Bạn Lan và bạn Hùng cãi nhau chuyện bàn giao, đây là tin nhắn riêng của họ gửi tôi (dán tin nhắn).", feedback: "Tên và tin nhắn riêng của đồng nghiệp bị gửi ra ngoài công ty và ngoài sự tin cậy của họ." },
              {
                text: "Hai đồng nghiệp trong nhóm bất đồng về việc bàn giao ca: một người nói đã bàn giao đủ, người kia nói chưa nhận được. Không có tên hay chi tiết riêng.",
                good: true,
                feedback: "Đủ cấu trúc tình huống để AI gợi ý mà không lộ ai là ai.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Gợi ý 5 câu hỏi dữ kiện trung lập, không nghiêng về bên nào, để tôi hỏi từng người.",
                good: true,
                feedback: "Rõ số lượng, rõ tính chất câu hỏi, và giữ AI khỏi việc phán ai đúng.",
              },
              { text: "Cho tôi biết ai có khả năng làm sai nhiều hơn.", feedback: "AI không biết gì về hai người và không nên phán; câu trả lời sẽ là suy đoán nghe hợp lý." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một bài phân tích dài về nguyên nhân mâu thuẫn.", feedback: "Bạn cần câu hỏi để dùng ngay, không cần một bài phân tích." },
              {
                text: "Liệt kê câu hỏi ngắn, kèm một câu mở đầu để buổi trò chuyện không nghe như phán xử.",
                good: true,
                feedback: "Dùng được ngay và giữ giọng điệu công bằng ngay từ lời đầu tiên.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Câu mở đầu gợi ý: \"Mình muốn hiểu rõ chuyện bàn giao để hai bạn không phải mất thời gian như thế này nữa. Mình chưa kết luận gì cả.\"\n\nCâu hỏi dữ kiện:\n1. Việc bàn giao diễn ra lúc nào?\n2. Bạn bàn giao bằng cách nào (nói miệng, tin nhắn, bảng theo dõi)?\n3. Có chỗ nào ghi lại việc đó không?\n4. Bạn nhận được những gì và thiếu gì?\n5. Lần tới, bạn muốn bàn giao theo cách nào để chắc chắn hơn?",
          },
          {
            requires: ["context"],
            text: "Bạn có thể hỏi mỗi người: \"Bạn cảm thấy thế nào về chuyện này? Tại sao bạn cho rằng đối phương đã làm sai?\" Sau đó nên lắng nghe kỹ và cân nhắc.\n\n(Câu hỏi thiên về cảm xúc và quy lỗi, chưa có dữ kiện để đối chiếu.)",
          },
          {
            text: "Dựa trên mô tả, nhiều khả năng người bàn giao chưa cẩn thận và đây là lỗi lặp lại. Bạn nên nhắc nhở người đó trước.\n\n(AI phán một người sai dù không hề có dữ kiện, chỉ bám vào chi tiết ít ỏi bạn đưa.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Hai tin nhắn riêng trong một buổi sáng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn A nhắn: \"Em đã bàn giao đủ, bạn B không đọc.\" Năm phút sau bạn B nhắn: \"Bạn A chưa bàn giao gì cả, em làm sao đọc được.\" Cả hai đều xin bạn can thiệp hôm nay.",
            choices: [
              { label: "Nhắn ngay vào nhóm: \"Ai sai thì nhận lỗi, đừng để ảnh hưởng công việc chung\"", next: "bad_group" },
              { label: "Nhắn riêng từng người hỏi dữ kiện: bàn giao lúc nào, bằng cách nào, có ghi lại ở đâu", next: "s2" },
            ],
          },
          bad_group: {
            text: "Cả hai cảm thấy bị làm xấu mặt trước nhóm khi chưa ai biết ai đúng. Người bị hiểu lầm giận cả bạn, còn nhóm bắt đầu bàn tán. Mâu thuẫn từ hai người lan thành cả nhóm.",
            ending: "bad",
          },
          s2: {
            text: "Cả hai đều nói đã bàn giao \"qua điện thoại chiều thứ Sáu\" và không ai ghi lại. Không ai nói dối, nhưng cũng không ai chứng minh được.",
            choices: [
              { label: "Mời cả hai họp 15 phút, đề xuất mẫu bàn giao ghi ba dòng, cả hai cùng dùng từ tuần sau", next: "good" },
              { label: "Bảo cả hai từ nay nhớ nói rõ hơn và không cần đề xuất gì thêm", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Hai tuần sau việc y hệt lại xảy ra vì chỗ hở không được vá. Lần này cả hai thấy bạn không thật sự giải quyết chuyện và không còn nhắn cho bạn nữa.",
            ending: "bad",
          },
          good: {
            text: "Không ai phải nhận lỗi. Cả hai đồng ý ghi bàn giao ba dòng: đã làm gì, còn gì dở, cần gì từ người nhận. Bạn ghi lại một dòng thống nhất và gửi cho cả hai.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hỏi dữ kiện, tìm chỗ quy trình hở, giữ chuyện riêng ngoài công cụ.",
          "Bài sau: lập nhật ký quyết định để nhóm nhớ vì sao mình đã chọn như vậy.",
        ],
      },
    ],
  },
  {
    id: 2074,
    slug: "mini-du-an-nhat-ky-quyet-dinh",
    title: "Chặng 33, Bài 15: Mini-dự án: nhật ký quyết định của nhóm",
    subtitle: "Ba tháng sau có người hỏi vì sao chọn cách này, và bạn mở ra một trang là trả lời được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhóm chốt một quyết định trong buổi họp, và ba tháng sau không ai nhớ nổi vì sao. Người mới vào hỏi, sếp hỏi, và mỗi người nhớ một kiểu. Một cuốn nhật ký ngắn, mỗi quyết định vài dòng, giúp bạn tránh cãi lại chuyện đã chốt và học được từ những lựa chọn cũ. AI giúp gọn lời văn, nhưng không được thêm lý do nhóm chưa từng nói.",
    openingQuestion:
      "Ba tháng trước nhóm chọn hướng A, giờ có người mới hỏi vì sao không chọn hướng B. Không ai nhớ rõ. Cách nào ngăn chuyện này từ lần sau?",
    openingOptions: [
      "Ghi ngay sau họp: bối cảnh, phương án, lý do chọn và ngày xem lại",
      "Nhờ AI nhớ giúp và hỏi lại nó khi cần nhắc chuyện cũ của nhóm",
      "Chụp ảnh bảng trắng sau họp rồi lưu vào thư mục chung của nhóm trên máy tính",
      "Dặn từng người nhớ lý do rồi hỏi họ khi có người cần biết",
    ],
    correctOption: 0,
    explanation:
      "Nhật ký quyết định hữu ích vì nó ghi bốn thứ mà trí nhớ mất đầu tiên: bối cảnh lúc đó, các phương án đã cân, lý do chọn và ngày xem lại. AI không lưu chuyện của nhóm bạn giữa các lần dùng và cũng không biết lý do thật, nên hỏi nó nhớ chuyện cũ chỉ được câu trả lời nghe hợp lý. Ảnh bảng trắng thường chỉ có từ khoá rời rạc, còn nhờ từng người nhớ thì mỗi người sẽ nhớ một kiểu.",
    diagram: [
      { label: "Quyết định được chốt trong họp", arrow: true },
      { label: "Ghi thô ngay sau họp: bối cảnh, phương án, lý do", arrow: true },
      { label: "AI gọn lời văn, không thêm lý do mới", arrow: true },
      { label: "Bạn đối chiếu ghi thô, lưu và đặt ngày xem lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm vận hành 8 người lập nhật ký quyết định từ quý đầu năm, mỗi quyết định chỉ năm dòng. Nửa năm sau, khi sếp mới hỏi vì sao nhóm dùng một mẫu báo cáo phức tạp, trưởng nhóm mở nhật ký ra: lý do khi đó là khách lớn yêu cầu định dạng đó, và đã hết hiệu lực từ quý trước. Nhóm bỏ mẫu cũ trong một buổi thay vì tranh cãi cả tuần.",
    },
    quiz: [
      Q(
        "Một dòng nhật ký quyết định nên có những thứ gì?",
        [
          "Bối cảnh, các phương án đã cân, lý do chọn và ngày xem lại",
          "Tên người phát biểu nhiều nhất và thời gian họp kéo dài",
          "Toàn bộ biên bản họp chép nguyên văn từng câu từng chữ",
          "Chỉ kết quả cuối cùng, vì lý do thì ai cũng nhớ ra sau này",
        ],
        "Nhật ký chỉ cần ghi những điều người đọc sau này cần để hiểu quyết định: bối cảnh khi đó, phương án đã cân, lý do chọn và ngày xem lại. Ai nói nhiều nhất hoặc biên bản nguyên văn thì dài và không giúp gì, còn chỉ ghi kết quả thì mất đúng thứ trí nhớ quên đầu tiên là lý do."
      ),
      Q(
        "Bạn nhờ AI gọn lại ghi chú thô và nó thêm \"vì chi phí thấp hơn\" trong khi nhóm chưa nói tới chi phí. Nên làm gì?",
        [
          "Xoá lý do đó, chỉ giữ những lý do có trong ghi chú thô của bạn",
          "Giữ lại vì nghe hợp lý và làm nhật ký đầy đủ hơn",
          "Sửa \"chi phí thấp hơn\" thành số phần trăm cụ thể cho thuyết phục",
          "Nhờ AI giải thích thêm vì sao chi phí thấp hơn để lý do vững hơn",
        ],
        "Nhật ký ghi điều nhóm đã thật sự nghĩ, không phải điều nghe hợp lý. Một lý do AI thêm vào sẽ được người đọc sau này tin là lý do thật của nhóm. Thêm số hay nhờ AI giải thích thêm chỉ làm lý do bịa trông thuyết phục hơn."
      ),
      Q(
        "Vì sao nên ghi \"ngày xem lại\" cho mỗi quyết định?",
        [
          "Vì hoàn cảnh đổi và quyết định cần được kiểm lại đúng lúc",
          "Vì ghi ngày xem lại làm nhật ký trông đầy đủ và bài bản hơn",
          "Vì sau ngày đó quyết định tự động hết hiệu lực không cần bàn",
          "Vì sếp thường yêu cầu mọi ghi chú họp phải kèm một mốc thời gian",
        ],
        "Quyết định tốt ở hoàn cảnh này có thể sai ở hoàn cảnh sau; ngày xem lại nhắc nhóm kiểm lại khi lý do có thể đã đổi. Nó không phải trang trí, không làm quyết định tự hết hạn, và cũng không phải quy định của sếp mà là công cụ của chính nhóm."
      ),
      Q(
        "Nhóm ghi ghi chú thô sau họp, có chi tiết \"bạn X phản đối vì sắp nghỉ đẻ\". Cách xử lý nào hợp lý nhất khi đưa vào AI để gọn lời?",
        [
          "Bỏ chi tiết cá nhân và tên, chỉ giữ lý do liên quan tới công việc",
          "Dán nguyên ghi chú vì AI chỉ gọn lời nên không ảnh hưởng gì",
          "Đổi tên bạn X thành chữ cái khác nhưng giữ lại lý do nghỉ đẻ",
          "Không dùng AI bao giờ vì mọi ghi chú họp đều nhạy cảm",
        ],
        "Chuyện riêng như thai sản không thuộc nhật ký công việc và không nên vào công cụ AI. Đổi tên nhưng giữ chi tiết vẫn làm lộ ra người đó. Không dùng AI nữa thì quá tay vì phần lớn ghi chú họp gọn lại được khi đã bỏ phần cá nhân."
      ),
      Q(
        "Sau khi AI gọn lời, bước cuối cùng bạn làm là gì?",
        [
          "Đối chiếu bản gọn với ghi chú thô, rồi mới lưu vào nhật ký",
          "Lưu ngay vì AI chỉ gọn lời nên không thể làm sai nội dung",
          "Gửi cho AI thêm một lần nữa để nó tự kiểm tra lại chính nó",
          "Chia sẻ cho cả nhóm đọc trước và coi im lặng là đã đồng ý",
        ],
        "AI có thể bỏ sót hoặc thêm chi tiết khi gọn lời, nên đối chiếu với ghi chú thô là bước chốt. Nhờ AI tự kiểm là để chính người viết chấm bài, còn coi im lặng là đồng ý thì bỏ qua khả năng cả nhóm chỉ chưa đọc."
      ),
    ],
    keyTakeaways: [
      "Nhật ký quyết định: bối cảnh, phương án, lý do chọn, ngày xem lại.",
      "Ghi thô ngay sau họp khi mọi người còn nhớ, rồi mới nhờ AI gọn lời.",
      "AI chỉ gọn lại, không thêm lý do nhóm chưa từng nói.",
      "Chuyện riêng và tên người không đưa vào công cụ AI.",
      "Đối chiếu bản gọn với ghi chú thô trước khi lưu.",
    ],
    practicePrompt: {
      question:
        "Bạn có ghi chú thô ba dòng sau buổi họp. Yêu cầu nào giúp AI gọn lời mà không thêm điều nhóm chưa nói?",
      options: [
        "Gọn thành 5 dòng theo khung cho sẵn, chỉ dùng ý có trong ghi chú của tôi",
        "Viết lại cho hay và thuyết phục hơn để sếp đọc thấy ấn tượng",
        "Bổ sung các lý do mà một quyết định như vậy thường có",
        "Viết dài hơn, thêm phân tích để nhật ký trông chuyên nghiệp",
      ],
      correct: 0,
      explanation:
        "Ràng buộc \"chỉ dùng ý có trong ghi chú\" và khung cố định giữ AI đúng việc gọn lời. Viết cho ấn tượng, bổ sung lý do thường có, hay phân tích thêm đều mời AI thêm những điều nhóm chưa từng nói vào nhật ký.",
    },
    summary: {
      keyIdea: "Nhật ký quyết định là trí nhớ chung của nhóm; AI chỉ gọn lời, không sáng tác lý do.",
      formula: "Ghi thô sau họp → AI gọn theo khung → bạn đối chiếu → lưu + ngày xem lại.",
      commonMistake: "Để AI thêm những lý do nghe hợp lý rồi coi đó là lý do thật của nhóm.",
      action: "Chọn ba quyết định gần đây nhất của nhóm và viết mỗi quyết định thành năm dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nghĩ tới ba quyết định nhóm đã chốt trong tháng qua. Với mỗi quyết định, ghi thô bốn ý: bối cảnh, các phương án, lý do chọn, ngày xem lại. Nhờ AI gọn thành năm dòng theo cách lắp trong bài, rồi đối chiếu với ghi thô và xoá mọi điều bạn không nhớ nhóm đã nói. Lưu thành một trang. Ngày mai dashboard sẽ hỏi bạn đã có mấy quyết định trong nhật ký.",
      secondary: "Bỏ tên người và mọi chuyện riêng trước khi đưa ghi chú vào công cụ.",
    },
    sections: [
      {
        type: "lead",
        text: "Người mới vào nhóm hỏi: \"Vì sao mình dùng cách này mà không dùng cách kia?\" Bạn chỉ nhớ mang máng, hai đồng nghiệp nhớ hai kiểu khác nhau, và cuộc họp lại bắt đầu từ đầu. Mini-dự án này giúp bạn lập một cuốn nhật ký ngắn để lần sau chỉ cần mở một trang.",
      },
      {
        type: "feynman",
        title: "Nhật ký quyết định đơn giản hơn bạn nghĩ",
        intro:
          "Nhà bạn có một cuốn sổ ghi mỗi lần sửa nhà: ngày nào, thợ nào, vì sao chọn loại gạch này thay vì loại kia. Ba năm sau nứt tường, bạn mở sổ ra và biết ngay mình từng cân nhắc gì. Nhật ký quyết định của nhóm là cuốn sổ đó, viết ngắn để ai cũng chịu viết.",
        columns: ["Thành phần", "Sổ sửa nhà", "Nhật ký quyết định của nhóm"],
        rows: [
          ["Ghi cái gì", "Việc sửa, thợ, loại vật liệu", "Quyết định, phương án, lý do chọn"],
          ["Khi nào ghi", "Ngay khi vừa sửa xong", "Ngay sau buổi họp chốt"],
          ["Ai dùng sau này", "Bạn của ba năm sau", "Người mới, sếp và chính nhóm ở quý sau"],
        ],
        oneLiner: "Nhật ký quyết định là cuốn sổ sửa nhà của nhóm: ghi ngắn, ghi ngay, để lần sau khỏi phải đoán.",
      },
      { type: "heading", text: "Một dòng nhật ký gồm những gì" },
      {
        type: "paragraph",
        text: "Năm dòng là đủ. Dòng một: quyết định gì. Dòng hai: bối cảnh lúc đó. Dòng ba: các phương án đã cân. Dòng bốn: vì sao chọn phương án này. Dòng năm: ngày xem lại. Quan trọng nhất là dòng bốn, vì lý do là thứ mất đầu tiên khỏi trí nhớ của cả nhóm.",
      },
      {
        type: "list",
        items: [
          "Quyết định: một câu, bắt đầu bằng động từ.",
          "Bối cảnh và các phương án đã cân: chỉ ghi những gì thật sự được bàn.",
          "Lý do chọn: bằng lời của nhóm, không phải lời bóng bẩy của ai khác.",
          "Ngày xem lại: khi nào nên kiểm xem lý do còn đúng.",
        ],
      },
      {
        type: "flow",
        title: "Từ buổi họp đến một dòng nhật ký",
        steps: [
          { label: "Ghi thô ngay sau họp", detail: "Trong mười phút sau họp, viết nhanh bốn ý khi mọi người còn nhớ. Không cần đẹp, cần đúng." },
          { label: "Nhờ AI gọn lời", detail: "Đưa ghi thô cho AI cùng khung năm dòng và một luật: chỉ dùng ý có trong ghi chú." },
          { label: "Đối chiếu", detail: "Đặt bản gọn cạnh ghi thô. Mọi câu không có trong ghi thô đều bị xoá, dù nghe hợp lý đến đâu." },
          { label: "Lưu và đặt ngày xem lại", detail: "Lưu vào một trang chung của nhóm và đặt nhắc ngày xem lại, để quyết định cũ không thành luật bất thành văn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ghi chú tốt",
          text: "\"Chọn bảng chung để theo dõi việc. Lý do: 3 người hay đi công tác, việc bị sót. Đã cân giữ email. Xem lại ngày 15/12.\" Ngắn, thật, đủ bốn thứ.",
        },
        right: {
          label: "Ghi chú AI thêm mắm muối",
          text: "\"Chọn bảng chung nhằm tối ưu hoá quy trình, giảm chi phí và nâng cao hiệu suất toàn diện.\" Nghe trơn tru nhưng hai lý do trong đó nhóm chưa từng nói tới.",
        },
      },
      {
        type: "callout",
        label: "Luật số một khi nhờ AI gọn lời",
        text: "Gọn lời là bỏ chữ thừa, không thêm ý. Luôn dặn AI: \"chỉ dùng ý có trong ghi chú của tôi\", rồi đối chiếu. Một lý do AI thêm vào nhật ký sau này sẽ được coi là lý do thật của nhóm, và không ai nhớ nó từng do máy viết.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gọn ghi chú họp thành nhật ký quyết định",
        task: "Nhóm vừa chốt chuyển sang bảng theo dõi chung. Bạn có ghi thô: 3 người hay đi công tác nên việc bị sót, đã cân việc giữ email, xem lại tháng 12. Lắp prompt để AI gọn thành nhật ký mà không thêm điều nhóm chưa nói.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết nhật ký quyết định về việc chuyển sang bảng chung.", feedback: "Không có ghi thô nên AI phải tự nghĩ ra lý do và bối cảnh." },
              {
                text: "Đây là ghi chú thô sau họp: chuyển sang bảng chung; 3 người hay đi công tác nên việc bị sót; đã cân việc giữ email; xem lại tháng 12.",
                good: true,
                feedback: "AI có đúng nguyên liệu thật của nhóm, không cần và không có lý do gì để bịa thêm.",
              },
            ],
          },
          {
            id: "task",
            label: "Luật",
            options: [
              { text: "Viết cho hay và đầy đủ, thêm những lý do cần thiết.", feedback: "\"Thêm lý do cần thiết\" mời AI sáng tác lý do nhóm chưa từng nói." },
              {
                text: "Chỉ dùng ý có trong ghi chú của tôi; nếu thiếu mục nào thì ghi \"chưa có\" chứ không tự điền.",
                good: true,
                feedback: "Luật rõ và có lối thoát: thiếu thì ghi \"chưa có\", không thể lấp bằng chữ bịa.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              {
                text: "Năm dòng: quyết định, bối cảnh, phương án đã cân, lý do chọn, ngày xem lại.",
                good: true,
                feedback: "Khung cố định để mọi mục nhật ký đều giống nhau, dễ đọc và dễ tìm sau này.",
              },
              { text: "Viết một đoạn văn xuôi thật mượt.", feedback: "Đoạn văn mượt che chỗ thiếu, và khó thấy mục nào đang trống." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "1. Quyết định: Chuyển sang bảng theo dõi việc chung.\n2. Bối cảnh: 3 người trong nhóm hay đi công tác.\n3. Phương án đã cân: giữ theo dõi việc qua email.\n4. Lý do chọn: việc bị sót khi người phụ trách vắng.\n5. Ngày xem lại: tháng 12.",
          },
          {
            requires: ["context"],
            text: "Quyết định: Nhóm chuyển sang bảng theo dõi chung nhằm cải thiện hiệu quả phối hợp và đảm bảo tiến độ công việc trong dài hạn.\nLý do: tăng tính minh bạch.\n\n(Gọn và trôi chảy, nhưng \"hiệu quả phối hợp\" và \"minh bạch\" không có trong ghi thô; lý do thật bị thay bằng lời chung chung.)",
          },
          {
            text: "Quyết định: Chuyển sang bảng chung.\nBối cảnh: Chi phí phần mềm email tăng 20%.\nLý do: giảm chi phí, tăng năng suất 15%.\nNgày xem lại: cuối quý.\n\n(Chi phí 20% và năng suất 15% do AI tự nghĩ ra, còn lý do thật của nhóm bị bỏ mất.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Ba tháng sau, có người hỏi \"vì sao\"",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ AI gọn ghi thô và nó viết lý do chọn là \"tiết kiệm chi phí và tăng năng suất\". Ghi thô của bạn chỉ có: \"3 người hay đi công tác, việc bị sót\". Bạn định lưu.",
            choices: [
              { label: "Lưu ngay, vì \"tiết kiệm chi phí\" nghe hợp lý và hay hơn bản thô", next: "bad_save" },
              { label: "Đối chiếu với ghi thô, xoá lý do không có trong đó, sửa lại đúng ý nhóm", next: "s2" },
            ],
          },
          bad_save: {
            text: "Ba tháng sau sếp mới hỏi nhóm đã tiết kiệm được bao nhiêu chi phí. Không ai có số, vì nhóm chưa hề nói tới chi phí. Lý do trong nhật ký hoá ra là lý do của máy, và cả nhóm phải giải thích vì sao ghi như vậy.",
            ending: "bad",
          },
          s2: {
            text: "Bản nhật ký giờ chỉ còn lý do thật: việc bị sót khi người phụ trách vắng. Bạn còn một ô trống: chưa ghi ngày xem lại. Sếp mới vừa nhắn hỏi về chuyện này.",
            choices: [
              { label: "Đặt ngày xem lại là tháng 12 và gửi cho cả nhóm đọc trước khi lưu", next: "good" },
              { label: "Bỏ ô ngày xem lại vì \"quyết định đã chốt thì thôi\"", next: "bad_nodate" },
            ],
          },
          bad_nodate: {
            text: "Nhật ký chạy được vài tháng, nhưng khi 3 người kia không còn đi công tác nữa, không ai nhớ quay lại xem bảng chung còn cần không. Cả nhóm cứ theo lệ cũ vì không có mốc nào nhắc.",
            ending: "bad",
          },
          good: {
            text: "Tháng 12, nhóm mở nhật ký ra và thấy rõ lý do ban đầu: 3 người hay đi công tác. Giờ họ ít đi hơn, nên nhóm điều chỉnh cách dùng bảng chung cho gọn hơn, có lý do và có ghi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghi thô ngay, AI gọn lời, bạn đối chiếu; lý do chỉ có thể là lý do thật của nhóm.",
          "Bài sau: chặng tiếp theo, truyền đạt thay đổi để cả nhóm đọc và hiểu.",
        ],
      },
    ],
  },
];
