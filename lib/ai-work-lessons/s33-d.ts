import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 33, bài 16-20. Giáo trình: scripts/curriculum/stage-33.json.
// Không có khẳng định nào dựa vào tính năng riêng của một công cụ AI: bài dạy
// cách giao việc và cách kiểm kết quả, nên không cần nguồn tài liệu công cụ.

// Đáp án đúng viết trước rồi để ở vị trí 0; vị trí được xáo lại lúc build.
const q = (question: string, right: string, wrong: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S33_D_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 16 ─────────────────────────
  {
    id: 2075,
    slug: "thong-bao-thay-doi-de-nguoi-ta-doc-het",
    title: "Chặng 33, Bài 16: Thông báo một thay đổi để cả nhóm đọc và hiểu",
    subtitle: "Một tấm biển báo đường đóng tốt nói được bốn điều - thông báo của bạn cũng vậy.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📢",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một thay đổi được báo bằng thư dài mà không ai đọc hết còn tệ hơn không báo: người ta làm theo cách cũ, rồi bạn phải sửa lỗi. Nhờ AI viết bản ngắn đủ bốn điều giúp bạn tiết kiệm nửa giờ soạn và tránh chuỗi câu hỏi 'thế bây giờ làm sao' suốt tuần.",
    openingQuestion:
      "Từ tuần sau, phiếu đề nghị mua hàng đổi sang một biểu mẫu mới. Bạn nhờ AI: 'Viết thông báo cho nhóm.' Bản nháp trả về ba đoạn văn dài về lợi ích của sự đổi mới. Điều gì đáng lo nhất?",
    openingOptions: [
      "Người đọc chưa biết đổi từ ngày nào, ai bị ảnh hưởng, hỏi ai",
      "Giọng văn hơi trang trọng so với cách nhóm vẫn nói chuyện hằng ngày",
      "Bản nháp có thể dài hơn một trang màn hình điện thoại",
      "AI chưa đưa lời cảm ơn cả nhóm ở đoạn cuối thông báo",
    ],
    correctOption: 0,
    explanation:
      "Bạn chỉ đưa cho AI một câu lệnh mơ hồ, nên nó lấp chỗ trống bằng đoạn văn về lợi ích chung chung. Thứ người đọc cần là bốn điều rất cụ thể: điều gì đổi, từ khi nào, ảnh hưởng ai, hỏi ai khi vướng. Giọng văn, độ dài hay lời cảm ơn là chuyện chỉnh sau trong một phút; thiếu ngày và người để hỏi thì cả nhóm vẫn làm theo cách cũ và bạn phải giải thích lại từng người.",
    diagram: [
      { label: "Bạn liệt kê bốn dữ kiện thật", arrow: true },
      { label: "Đưa AI dữ kiện và giới hạn độ dài", arrow: true },
      { label: "AI viết bản ngắn theo khuôn", arrow: true },
      { label: "Bạn đối chiếu ngày, tên, số rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng vận hành nhỏ đổi cách gửi phiếu đề nghị mua hàng. Lần đầu, trưởng nhóm gửi thư ba đoạn nói về 'tối ưu quy trình' mà không ghi ngày áp dụng; tuần sau vẫn còn phiếu theo mẫu cũ và phải làm lại. Lần hai, thông báo chỉ bốn dòng: đổi gì, từ thứ Hai nào, ai bị ảnh hưởng, hỏi ai. Số phiếu sai mẫu giảm rõ rệt. Đây là tình huống minh hoạ, không phải số liệu của một công ty có thật.",
    },
    quiz: [
      q(
        "Một thông báo thay đổi cần trả lời được bốn câu nào để người đọc làm theo được?",
        "Điều gì đổi, từ khi nào, ảnh hưởng ai, hỏi ai khi vướng",
        [
          "Vì sao đổi, ai quyết định, ai phản đối, lỗi của bên nào",
          "Quy trình cũ ra sao, ai thiết kế, tốn bao nhiêu, lãi bao nhiêu",
          "Lời xin lỗi vì phiền, lời cảm ơn, lời mong thông cảm, chữ ký",
        ],
        "Bốn câu đó là thứ người đọc cần để hành động. Giải thích lý do và lời xin lỗi có thể thêm một dòng nhưng không thay được ngày áp dụng hay tên người hỏi. Chuyện ai phản đối, lỗi bên nào là chuyện nội bộ của người ra quyết định, đưa vào thông báo chỉ gây thêm tranh cãi.",
      ),
      q(
        "Bạn viết 'quy trình mới áp dụng sắp tới'. Vấn đề lớn nhất của câu này là gì?",
        "Người đọc không biết ngày nào phải làm theo",
        [
          "'Sắp tới' nghe hơi cứng, đổi giọng đi",
          "Nên viết ngày theo kiểu số La Mã để cả nhóm nhìn là nhớ ngay",
          "Không có vấn đề gì vì mọi người sẽ tự nhắn hỏi lại khi cần đến",
        ],
        "'Sắp tới' với người này là tuần sau, với người kia là tháng sau, nên mỗi người làm theo một mốc. Đổi giọng văn không sửa được lỗ hổng đó, còn 'tự hỏi lại' nghĩa là bạn trả lời cùng một câu hỏi nhiều lần. Một ngày cụ thể như 'thứ Hai 6/10' là đủ.",
      ),
      q(
        "AI đã viết xong bản nháp. Việc nào bạn phải làm trước khi gửi?",
        "Đối chiếu từng ngày, tên và con số với thông tin bạn có",
        [
          "Chỉ đọc lại giọng văn, vì AI luôn giữ đúng mọi dữ kiện đã đưa vào",
          "Nhờ chính AI xác nhận rằng bản nháp không còn lỗi nào",
          "Rút bản nháp còn tiêu đề, vì người đọc chỉ liếc qua là đủ",
        ],
        "AI có thể đổi ngày, thêm tên hoặc làm tròn số khi diễn đạt lại, và nó viết sai với cùng giọng tự tin. Hỏi lại chính nó không phải là kiểm chứng, còn cắt còn tiêu đề thì mất luôn phần người đọc cần làm. Chỉ so với nguồn của bạn mới chắc.",
      ),
      q(
        "Vì sao thông báo nên có ngày cụ thể và tên người hỏi thay vì 'liên hệ bộ phận liên quan'?",
        "Người đọc biết hạn và biết gõ cửa ai mà không phải đoán",
        [
          "Vì thư dài hơn thì trông chính thức và đáng tin hơn với cả nhóm",
          "Vì có tên người hỏi thì cả nhóm sẽ không còn thắc mắc nào nữa",
          "Để khi bị chê thì có người để đổ lỗi",
        ],
        "Cụ thể giúp người đọc hành động ngay, không phải đoán. Độ dài không làm thông báo đáng tin hơn; thắc mắc vẫn còn nhưng biết hỏi ai thì giải quyết nhanh. Còn đổ trách nhiệm là mục đích sai: tên người hỏi để hỗ trợ, không để phân bổ lỗi.",
      ),
      q(
        "Nhóm 8 người, thay đổi chỉ chạm tới 3 người. Nên viết thế nào?",
        "Nêu rõ ai bị ảnh hưởng và ai không bị đổi gì",
        [
          "Gửi riêng ba người đó, năm người còn lại không cần biết thay đổi",
          "Ghi 'áp dụng cho toàn bộ nhóm' cho chắc, ai cần thì tự đọc kỹ",
          "Chỉ viết 'một số bạn' để không ai cảm thấy mình bị gọi tên",
        ],
        "Năm người không bị ảnh hưởng vẫn cần biết mình không phải làm gì, nếu không họ sẽ lo hoặc hỏi lại. Ghi 'toàn bộ nhóm' làm tám người đọc kỹ một việc chỉ liên quan ba người, còn 'một số bạn' khiến ai cũng tự hỏi liệu có phải mình.",
      ),
    ],
    keyTakeaways: [
      "Thông báo tốt trả lời bốn câu: đổi gì, từ khi nào, ảnh hưởng ai, hỏi ai.",
      "Đưa AI dữ kiện thật của bạn, đừng để nó tự lấp chỗ trống bằng lời chung chung.",
      "Ngày cụ thể và tên người hỏi thắng 'sắp tới' và 'bộ phận liên quan'.",
      "Nói cả ai không bị ảnh hưởng, để họ khỏi phải lo.",
      "Đối chiếu ngày, tên, số trong bản nháp với nguồn trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Bạn cần báo: từ thứ Hai 6/10, báo cáo tuần nộp trước 16 giờ thứ Năm thay vì thứ Sáu; chỉ nhóm bán hàng bị ảnh hưởng; hỏi chị Hà khi vướng. Bản nào đúng nhất?",
      options: [
        "Từ thứ Hai 6/10, nhóm bán hàng nộp báo cáo tuần trước 16 giờ thứ Năm. Các nhóm khác giữ nguyên. Vướng thì hỏi chị Hà.",
        "Báo cáo tuần sẽ nộp sớm hơn một ngày từ tuần sau. Cả nhóm lưu ý và cố gắng thực hiện tốt để giữ hiệu quả chung.",
        "Từ thứ Hai 6/10 báo cáo tuần nộp trước 16 giờ thứ Năm, áp dụng cho toàn bộ các nhóm. Liên hệ bộ phận liên quan khi cần.",
        "Nhóm bán hàng lưu ý thời hạn nộp báo cáo mới, chi tiết sẽ được gửi sau. Mọi thắc mắc xin phản hồi lại cho quản lý.",
      ],
      correct: 0,
      explanation:
        "Bản đầu có đủ bốn điều: đổi gì, từ ngày nào, ai bị ảnh hưởng, hỏi ai. Bản hai dùng 'sớm hơn một ngày', 'tuần sau', nên không có mốc rõ. Bản ba ghi sai phạm vi (toàn bộ các nhóm) và 'bộ phận liên quan'. Bản bốn hẹn 'chi tiết gửi sau' nên người đọc chưa làm được gì.",
    },
    summary: {
      keyIdea: "Thông báo tốt là bản ngắn mà người đọc làm theo được ngay, không phải bản dài nhất.",
      formula: "Đổi gì + từ khi nào + ảnh hưởng ai + hỏi ai. Rồi đối chiếu với dữ kiện thật.",
      commonMistake: "Để AI tự viết vì sao nên đổi, và bỏ trống ngày áp dụng với người hỏi.",
      action: "Chọn một thay đổi sắp tới của nhóm, viết bốn dữ kiện thật, nhờ AI dựng bản nháp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thay đổi có thật sắp tới ở nhóm bạn (hạn nộp, mẫu biểu, giờ họp, cách xin duyệt). Viết ra bốn dữ kiện: đổi gì, từ ngày nào, ai bị ảnh hưởng, hỏi ai. Nhờ AI viết bản dưới 80 chữ, đối chiếu từng ngày và tên rồi lưu lại. Ngày mai dashboard sẽ hỏi bạn đã gửi bản đó chưa.",
      secondary: "Nếu chưa có thay đổi nào, thử với một việc nhỏ: đổi giờ họp giao ban hoặc đổi nơi lưu file chung.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn gửi cả nhóm một thư dài về quy trình mới. Thứ Năm, ba người vẫn nộp theo mẫu cũ và hai người nhắn riêng hỏi 'vậy từ bao giờ ạ?'. Thư không thiếu chữ, nó thiếu bốn điều rất nhỏ.",
      },
      {
        type: "feynman",
        title: "Thông báo thay đổi đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới tấm biển 'Đường đóng để sửa' ở đầu ngõ. Người lái xe chỉ liếc một giây, nhưng biển tốt vẫn cho họ đủ bốn thứ để quyết định rẽ hay không.",
        columns: ["Điều người đọc cần", "Tấm biển đường đóng", "Thông báo cho nhóm"],
        rows: [
          ["Cái gì đổi", "Đường Lê Lợi đóng", "Phiếu mua hàng đổi sang mẫu mới"],
          ["Từ khi nào", "Từ 5 giờ sáng ngày 5/10", "Từ thứ Hai 6/10"],
          ["Ai bị ảnh hưởng", "Xe ô tô; xe máy vẫn đi", "Nhóm bán hàng; nhóm khác giữ nguyên"],
          ["Hỏi ai / đi đâu", "Rẽ phải, đi vòng cổng B", "Vướng thì hỏi chị Hà"],
        ],
        oneLiner: "Một thông báo tốt cũng là tấm biển đường: người đọc chỉ liếc mà biết đổi gì, khi nào, tới mình không, hỏi ai.",
      },
      { type: "heading", text: "Vì sao thư dài lại bị bỏ qua" },
      {
        type: "paragraph",
        text: "Người trong nhóm đọc thông báo giữa hai cuộc họp. Nếu ba dòng đầu nói về 'tinh thần đổi mới', họ dừng lại trước khi tới chỗ có ngày và tên. Bạn không cần ngắn vì lười, bạn cần ngắn vì người đọc chỉ có ít giây. Và khi nhờ AI, bạn phải đưa dữ kiện, nếu không nó sẽ viết phần 'vì sao' đầy chữ thay cho phần 'khi nào'.",
      },
      {
        type: "flow",
        title: "Từ ý trong đầu tới thông báo đã gửi",
        steps: [
          { label: "Ghi bốn dữ kiện", detail: "Viết nháp ra giấy hoặc ghi chú: đổi gì, từ ngày nào, ai bị ảnh hưởng, hỏi ai. Đây là phần chỉ bạn biết, AI không thể đoán." },
          { label: "Đưa AI dữ kiện và giới hạn", detail: "Dán bốn dữ kiện, nói rõ người đọc là ai, dưới bao nhiêu chữ, giọng nào. Không dán thông tin nhạy cảm của người khác vào công cụ chưa được công ty duyệt." },
          { label: "AI viết bản nháp", detail: "Nó diễn đạt trôi chảy. Nhưng nó có thể tự thêm 'lợi ích', làm tròn ngày, hoặc đổi thứ tự các ý." },
          { label: "Bạn đối chiếu", detail: "So từng ngày, tên, con số với bốn dữ kiện gốc. Xoá mọi câu nó tự thêm mà bạn không biết có đúng không." },
          { label: "Gửi và hẹn nhìn lại", detail: "Gửi, rồi đặt nhắc ba ngày sau hỏi nhanh xem có ai còn làm theo cách cũ không." },
        ],
      },
      {
        type: "list",
        items: [
          "Dòng đầu: điều gì đổi, bằng một câu.",
          "Dòng hai: từ khi nào, ghi ngày cụ thể chứ không ghi 'sắp tới'.",
          "Dòng ba: ai bị ảnh hưởng và ai không.",
          "Dòng bốn: hỏi ai, kênh nào khi vướng.",
          "Nếu cần, dòng năm: một câu vì sao, không quá hai câu.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản ai cũng bỏ qua",
          text: "Nhằm nâng cao hiệu quả làm việc, từ thời gian tới chúng ta sẽ áp dụng quy trình mới. Mọi người lưu ý thực hiện và liên hệ bộ phận liên quan nếu cần.",
        },
        right: {
          label: "Bản người đọc làm theo được",
          text: "Từ thứ Hai 6/10, phiếu mua hàng dùng mẫu mới trong thư mục Chung. Chỉ nhóm bán hàng bị ảnh hưởng. Vướng thì hỏi chị Hà.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "AI hay thêm câu nghe hợp lý như 'mẫu mới giúp giảm 30% thời gian'. Nếu con số đó không do bạn đưa vào, đó là số nó bịa. Xoá hoặc thay bằng dữ kiện thật của bạn.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết thông báo đổi hạn nộp báo cáo",
        task: "Từ thứ Hai 6/10, nhóm bán hàng (6 người) nộp báo cáo tuần trước 16 giờ thứ Năm thay vì thứ Sáu. Nhóm khác giữ nguyên. Hỏi chị Hà khi vướng. Lắp prompt để AI viết bản thông báo.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Có thay đổi về báo cáo tuần, viết thông báo cho nhóm.", feedback: "AI không biết đổi gì, từ ngày nào, nên sẽ bịa hạn và bịa lý do." },
              { text: "Từ thứ Hai 6/10, nhóm bán hàng (6 người) nộp báo cáo tuần trước 16 giờ thứ Năm, không phải thứ Sáu. Nhóm khác giữ nguyên. Vướng hỏi chị Hà.", good: true, feedback: "Đủ bốn dữ kiện thật: AI chỉ việc diễn đạt, không phải đoán." },
            ],
          },
          {
            id: "readers",
            label: "Người đọc và giọng",
            options: [
              { text: "Viết cho tất cả mọi người, giọng thật chuyên nghiệp.", feedback: "'Tất cả' làm nhóm không bị ảnh hưởng đọc thừa, và 'chuyên nghiệp' làm bản nháp cứng." },
              { text: "Người đọc là nhóm bán hàng đang bận. Giọng thân thiện, ngắn, xưng 'mình' và 'các bạn'.", good: true, feedback: "AI biết viết cho ai và giọng nào, nên bản nháp gần dùng được ngay." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết đầy đủ và chi tiết để không ai thắc mắc.", feedback: "'Đầy đủ' thường thành ba đoạn văn, người đọc dừng ngay trước chỗ có ngày." },
              { text: "Dưới 60 chữ, ngày ở dòng đầu, không thêm lý do hay con số tôi chưa đưa.", good: true, feedback: "Giới hạn chữ và cấm tự thêm số giúp bản nháp ngắn và không bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "readers", "limit"],
            text: "Chào các bạn nhóm bán hàng,\n\nTừ thứ Hai 6/10, báo cáo tuần nộp trước 16 giờ thứ Năm (trước đây là thứ Sáu). Các nhóm khác giữ nguyên.\n\nVướng gì cứ hỏi chị Hà nhé.",
          },
          {
            requires: ["facts"],
            text: "Kính gửi toàn thể anh chị em,\n\nNhằm nâng cao hiệu quả và tối ưu hoá quy trình, từ 6/10 nhóm bán hàng nộp báo cáo tuần trước 16 giờ thứ Năm. Mong mọi người nghiêm túc thực hiện...\n\n(Đủ dữ kiện nhưng bản nháp dài và văn hoa; người đọc phải đi tìm ngày trong đoạn thứ hai.)",
          },
          {
            text: "Kính gửi cả nhóm,\n\nĐể theo kịp xu thế, báo cáo tuần sẽ nộp sớm hơn từ tuần sau, dự kiến giúp tiết kiệm 30% thời gian tổng hợp. Liên hệ bộ phận liên quan khi cần.\n\n(AI không có dữ kiện nên tự bịa 'tuần sau' và '30%', và bỏ mất tên người hỏi.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản nháp AI viết trơn tru, còn 10 phút trước khi gửi",
        start: "s1",
        nodes: {
          s1: {
            text: "AI viết xong bản nháp bốn dòng rất gọn. Dòng hai ghi 'từ thứ Hai 13/10', nhưng bạn nhớ thay đổi bắt đầu từ thứ Hai 6/10. Bạn còn 10 phút.",
            choices: [
              { label: "Gửi luôn vì bản nháp đọc rất tự nhiên và chắc AI đã hiểu đúng", next: "bad_send" },
              { label: "Đối chiếu ngày với ghi chú gốc, sửa thành 6/10 rồi soát tiếp các dòng còn lại", next: "s2" },
            ],
          },
          bad_send: {
            text: "Cả nhóm hiểu là áp dụng từ 13/10. Tuần đầu năm người vẫn nộp thứ Sáu, phải nộp lại và bạn mất một buổi giải thích.",
            ending: "bad",
          },
          s2: {
            text: "Bạn sửa ngày. Khi soát dòng ba, bạn thấy AI ghi 'toàn bộ các nhóm', dù chỉ nhóm bán hàng bị ảnh hưởng.",
            choices: [
              { label: "Để nguyên vì ghi rộng cho chắc, ai không liên quan sẽ tự bỏ qua", next: "bad_wide" },
              { label: "Sửa thành 'chỉ nhóm bán hàng, các nhóm khác giữ nguyên'", next: "good" },
            ],
          },
          bad_wide: {
            text: "Nhóm kho và nhóm kế toán nhắn hỏi có phải đổi hạn không. Bạn phải trả lời từng người và thư lại làm nhiều người thêm lo.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi đúng giờ. Không ai hỏi lại ngày hay phạm vi, và thứ Năm tuần sau cả sáu báo cáo tới đúng hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Thông báo tốt là tấm biển đường: đổi gì, khi nào, ai, hỏi ai.",
          "AI viết nháp, còn ngày, tên và số phải do bạn đối chiếu.",
          "Việc hôm nay: viết bốn dữ kiện của một thay đổi có thật ở nhóm bạn.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 17 ─────────────────────────
  {
    id: 2076,
    slug: "doc-lai-thong-bao-truoc-khi-gui",
    title: "Chặng 33, Bài 17: Đọc lại thông báo dưới con mắt người bị ảnh hưởng",
    subtitle: "Đọc bản nháp như người nhận thư báo cắt nước: điều đầu tiên họ tìm là mình phải làm gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản nháp AI viết trôi chảy nên rất dễ gửi luôn. Nhưng chính vì trôi chảy nó che đi hai lỗi: thiếu điều người nhận quan tâm nhất và thêm điều bạn chưa từng nói. Bốn câu hỏi của người đọc giúp bạn soát trong năm phút, trước khi cả nhóm đọc.",
    openingQuestion:
      "Bạn nhờ AI viết thông báo đổi cách xin duyệt mua hàng. Bản nháp mở đầu bằng 'chúng ta bước vào giai đoạn chuyển đổi số đầy hứng khởi'. Nếu là người có phiếu đang chờ duyệt, bạn tìm gì đầu tiên khi đọc?",
    openingOptions: [
      "Phiếu đang chờ của mình có phải làm lại gì không",
      "Ai đứng sau quyết định chuyển đổi số lần này",
      "Hệ thống mới do công ty nào cung cấp",
      "Câu chúc cuối thư có thân thiện với cả nhóm không",
    ],
    correctOption: 0,
    explanation:
      "Người có phiếu đang chờ quan tâm việc trước mắt của mình: phiếu cũ có còn hiệu lực hay không, phải nộp lại hay không. Thông báo dài nhưng không trả lời điều đó thì họ sẽ nhắn hỏi bạn. Ai quyết định, hệ thống của ai hay lời chúc cuối thư có thể có mặt nhưng không giúp họ biết cần làm gì ngày mai. Đọc bản nháp bằng đúng câu hỏi này là cách soát nhanh nhất.",
    diagram: [
      { label: "AI viết bản nháp trôi chảy", arrow: true },
      { label: "Bạn đọc như người bị ảnh hưởng, với bốn câu hỏi", arrow: true },
      { label: "Đánh dấu chỗ thiếu và chỗ AI tự thêm", arrow: true },
      { label: "Sửa bằng dữ kiện thật rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng nhóm gửi thông báo đổi cách duyệt phiếu chi. Bản nháp AI ghi 'phiếu cũ sẽ được hệ thống tự chuyển sang', trong khi thực tế phiếu cũ phải nộp lại trước một hạn cụ thể. Ba người tin và không nộp lại, phiếu của họ bị treo cả tuần. Đây là tình huống minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      q(
        "Bốn câu hỏi nào người bị ảnh hưởng thường đặt ra khi đọc một thông báo thay đổi?",
        "Cái gì đổi, tôi có bị ảnh hưởng không, tôi phải làm gì và khi nào, hỏi ai",
        [
          "Ai quyết định, vì sao chọn cách này, tốn bao nhiêu, ai được lợi",
          "Thông báo dài mấy đoạn, gửi lúc mấy giờ, ai ký, ai nhận trước",
          "Lịch sử của quy trình, ai từng đề xuất, lần trước sửa gì, sửa khi nào",
        ],
        "Người đọc bị ảnh hưởng chỉ đọc để biết hành động của mình. Các câu về ai quyết định, tốn bao nhiêu hay ai được lợi là câu của người ra quyết định, và câu về giờ gửi, người ký là hình thức. Đó không phải thứ giúp họ làm việc ngày mai.",
      ),
      q(
        "Phần nào trong bản nháp AI viết thường là chỗ bịa nhất, cần soát kỹ nhất?",
        "Câu nói về việc chưa hề được bạn xác nhận",
        [
          "Câu chào đầu thư, vì nó là công thức",
          "Câu cảm ơn cuối thư vì hay xã giao",
          "Câu tả lợi ích chung, vì AI hay bỏ qua",
        ],
        "AI bịa nhiều nhất ở những chỗ bạn không đưa dữ kiện: lời hứa, ngày, con số, việc 'sẽ tự động'. Câu chào và cảm ơn có sai cũng chỉ là chuyện giọng. Còn phần lợi ích, AI thường viết dư chứ không bỏ qua.",
      ),
      q(
        "Bản nháp ghi 'phiếu cũ sẽ tự chuyển sang hệ thống mới', nhưng ghi chú của bạn nói phiếu cũ phải nộp lại trước 3/10. Nên làm gì?",
        "Sửa theo ghi chú gốc và ghi rõ hạn nộp lại 3/10",
        [
          "Giữ câu của AI vì đọc tiện hơn cho nhóm",
          "Xoá đoạn nói về phiếu cũ cho thư gọn",
          "Hỏi lại AI câu đó đúng không rồi theo nó",
        ],
        "Ghi chú gốc là nguồn duy nhất về việc đã xảy ra, nên bản nháp phải sửa theo nó. Xoá đoạn phiếu cũ là bỏ đúng điều người có phiếu đang chờ cần biết. Còn hỏi lại AI chỉ cho một câu trả lời trôi chảy khác chứ không phải kiểm chứng.",
      ),
      q(
        "Vì sao một thông báo không có lỗi chính tả vẫn có thể là thông báo tệ?",
        "Nó có thể bỏ sót điều người nhận cần làm",
        [
          "Vì chính tả đúng nghĩa là AI đã viết, mà thư do AI viết thường kém",
          "Vì thông báo tốt phải có ít nhất một vài lỗi để trông giống người viết",
          "Vì người nhận chỉ đánh giá thư qua độ dài của phần tiêu đề",
        ],
        "Chính tả sạch chỉ cho biết câu văn ổn. Thư vẫn tệ nếu thiếu ngày, thiếu việc phải làm hoặc thêm lời hứa bạn chưa nói. Không có luật nào nói thư do AI viết thì kém, và người đọc cũng không đánh giá qua độ dài tiêu đề.",
      ),
      q(
        "Khi soát bản nháp, cách nào nhanh và đáng tin nhất?",
        "Đọc lần lượt theo bốn câu hỏi của người nhận",
        [
          "Đọc lướt một lần rồi kiểm nhanh chính tả",
          "Dán vào một công cụ AI khác và hỏi bản nháp có ổn không",
          "Đưa cả bản nháp cho đồng nghiệp thân nhất đọc và góp ý về giọng văn",
        ],
        "Bốn câu hỏi chỉ đúng chỗ thiếu và chỗ bịa, mất khoảng năm phút. Đọc lướt thường bỏ qua chỗ thiếu vì bạn biết sẵn ngữ cảnh. Một AI khác cũng tạo câu trả lời nghe hợp lý, còn đồng nghiệp nhận xét về giọng văn thì chưa chắc phát hiện được ngày sai.",
      ),
    ],
    keyTakeaways: [
      "Đọc bản nháp như người bị ảnh hưởng, không như người viết.",
      "Bốn câu hỏi: cái gì đổi, có tới tôi không, tôi làm gì và khi nào, hỏi ai.",
      "AI hay thêm lời hứa, ngày và số bạn chưa đưa: soát các câu 'sẽ tự động'.",
      "Điều người có việc đang dở quan tâm nhất thường là thứ AI bỏ sót.",
      "Sửa theo ghi chú gốc, không theo câu trả lời của AI.",
    ],
    practicePrompt: {
      question:
        "Bản nháp ghi: 'Hệ thống mới sẽ hỗ trợ đầy đủ mọi loại phiếu ngay từ ngày đầu.' Ghi chú của bạn chỉ nói hệ thống mới chạy cho phiếu mua hàng. Nên làm gì?",
      options: [
        "Sửa thành 'chỉ phiếu mua hàng' và ghi loại phiếu khác vẫn dùng mẫu cũ",
        "Giữ nguyên câu vì nghe tích cực và giúp cả nhóm yên tâm",
        "Xoá câu và không nhắc gì tới các loại phiếu khác để thư gọn hơn nhiều nữa",
        "Đổi thành 'phần lớn các loại phiếu' cho khỏi hứa quá nhiều",
      ],
      correct: 0,
      explanation:
        "Câu của AI là lời hứa bạn chưa nói. Người dùng phiếu khác sẽ tin và làm theo hệ thống mới. Xoá câu làm họ không biết mình thuộc diện nào; 'phần lớn' vẫn là một con số không có căn cứ. Sửa đúng phạm vi và nói rõ phần còn lại vẫn dùng mẫu cũ mới trả lời được câu hỏi 'có tới tôi không'.",
    },
    summary: {
      keyIdea: "Người viết biết sẵn ngữ cảnh nên đọc lướt qua chỗ thiếu; người nhận thì không.",
      formula: "Cái gì đổi + có tới tôi không + tôi làm gì, khi nào + hỏi ai. Đọc bản nháp qua bốn câu này.",
      commonMistake: "Gửi bản nháp vì nó trôi chảy, mà không hỏi nó bỏ sót gì và tự thêm gì.",
      action: "Lấy một thông báo bạn đã gửi trong tháng, đọc lại qua bốn câu hỏi và ghi chỗ thiếu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một thông báo hoặc email thay đổi bạn đã gửi (hoặc sắp gửi) cho nhóm. In hoặc mở nó ra, đọc lần lượt qua bốn câu hỏi của người nhận và ghi bên lề: câu nào chưa được trả lời, câu nào bạn không chắc có đúng. Sửa bản của bạn và lưu bản đã soát. Ngày mai dashboard sẽ hỏi bạn tìm được bao nhiêu chỗ.",
      secondary: "Nhờ AI chỉ ra 'những chỗ người đọc bị ảnh hưởng có thể hiểu sai', rồi tự quyết định chỗ nào đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa nhờ AI viết thông báo và đọc thấy rất ổn. Bạn đọc ổn vì bạn biết mọi chuyện. Người bị ảnh hưởng thì không, và họ sẽ tìm ngay một thứ: việc của mình là gì.",
      },
      {
        type: "feynman",
        title: "Đọc như người nhận thư đơn giản hơn bạn nghĩ",
        intro:
          "Bạn nhận một lá thư báo khu nhà sẽ cắt nước. Bạn không đọc từ đầu tới cuối; mắt bạn chạy tìm ngay 'khi nào cắt', 'nhà mình có bị không', 'phải trữ nước hay làm gì', 'gọi số nào'.",
        columns: ["Câu hỏi", "Người nhận thư cắt nước", "Người nhận thông báo của bạn"],
        rows: [
          ["Cái gì đổi", "Nước sẽ bị cắt", "Cách nộp phiếu mua hàng đổi"],
          ["Có tới tôi không", "Khu nhà mình hay khu bên cạnh", "Nhóm tôi hay nhóm khác"],
          ["Tôi làm gì, khi nào", "Trữ nước trước 8 giờ sáng", "Nộp lại phiếu cũ trước 3/10"],
          ["Hỏi ai", "Số điện thoại ban quản lý", "Chị Hà"],
        ],
        oneLiner: "Trước khi gửi, đọc bản nháp bằng mắt người nhận thư cắt nước: tìm ngay bốn câu trả lời.",
      },
      { type: "heading", text: "Hai lỗi AI hay để lại" },
      {
        type: "paragraph",
        text: "Lỗi thứ nhất là thiếu: AI viết trôi nhưng bỏ điều người nhận quan tâm nhất, thường là việc phải làm với thứ đang dở. Lỗi thứ hai là thừa: nó tự thêm một lời hứa, một ngày hay một con số bạn không đưa. Cả hai đều khó thấy khi bạn đọc bằng mắt người viết, vì câu văn nghe rất hợp lý.",
      },
      {
        type: "flow",
        title: "Năm phút soát một bản nháp",
        steps: [
          { label: "Đặt mình vào chỗ người nhận", detail: "Chọn một người trong nhóm có nhiều việc đang dở nhất. Tưởng tượng họ vừa mở thư giữa hai cuộc họp." },
          { label: "Tìm câu trả lời cho bốn câu hỏi", detail: "Gạch chân câu trả lời cho: cái gì đổi, có tới tôi không, tôi làm gì và khi nào, hỏi ai. Câu nào không gạch được là chỗ thiếu." },
          { label: "Đánh dấu chỗ AI tự thêm", detail: "Tìm câu có 'sẽ tự động', 'đầy đủ', số phần trăm, ngày tháng. Với mỗi câu, hỏi: mình có đưa dữ kiện này cho AI không?" },
          { label: "Sửa theo ghi chú gốc", detail: "Thêm chỗ thiếu bằng dữ kiện thật, xoá hoặc sửa chỗ tự thêm. Không nhờ AI quyết định câu nào đúng." },
          { label: "Đọc lại một lần rồi gửi", detail: "Đọc lại lần cuối chỉ để kiểm lỗi mới sinh ra khi sửa, rồi gửi." },
        ],
      },
      {
        type: "list",
        items: [
          "Việc đang dở của tôi có bị ảnh hưởng không: phiếu, hồ sơ, đơn đang chờ.",
          "Hạn cuối là ngày nào, chứ không phải 'sớm nhất có thể'.",
          "Nếu tôi không làm gì thì chuyện gì xảy ra.",
          "Người hỏi có thật sự trả lời được không, hay chỉ là một địa chỉ hộp thư chung.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đọc bằng mắt người viết",
          text: "Câu văn mượt, giọng thân thiện, có lời cảm ơn. Không thấy gì thiếu vì bạn tự điền phần thiếu từ trí nhớ của mình.",
        },
        right: {
          label: "Đọc bằng mắt người nhận",
          text: "Phiếu đang chờ của tôi thì sao? Hạn là ngày nào? Câu 'sẽ tự chuyển sang' này ai nói? Chỗ nào cũng thấy một câu hỏi chưa có lời đáp.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Nhờ AI 'chỉ ra chỗ người đọc có thể hiểu sai' rất hữu ích để tìm chỗ nghi ngờ, nhưng nó không biết sự thật của nhóm bạn. Chỗ nào nó nêu ra, bạn phải tự đối chiếu với ghi chú gốc.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát thông báo đổi cách xin duyệt mua hàng",
        task: "Dữ kiện thật của bạn: từ thứ Hai 6/10, phiếu mua hàng trên 5 triệu xin duyệt qua biểu mẫu trực tuyến; phiếu cũ đang chờ phải nộp lại trước 3/10; chưa có buổi hướng dẫn nào; hỏi chị Hà. Đánh dấu những đoạn AI tự thêm hoặc đảo sự thật.",
        segments: [
          { text: "Từ thứ Hai 6/10, phiếu mua hàng trên 5 triệu đồng sẽ xin duyệt qua biểu mẫu trực tuyến." },
          {
            text: "Mọi phiếu cũ đang chờ duyệt sẽ được hệ thống tự chuyển sang, bạn không phải làm gì.",
            error: "Dữ kiện thật nói phiếu cũ phải nộp lại trước 3/10. AI đảo ngược và bịa lời hứa 'tự chuyển'.",
          },
          { text: "Phiếu dưới 5 triệu đồng vẫn dùng cách cũ." },
          {
            text: "Mọi người sẽ được hướng dẫn trực tiếp vào tuần sau.",
            error: "Chưa có buổi hướng dẫn nào. AI tự thêm một lời hứa khiến người đọc chờ hướng dẫn thay vì tự nộp lại phiếu.",
          },
          { text: "Vướng gì cứ hỏi chị Hà." },
          {
            text: "Thay đổi này giúp giảm thời gian duyệt xuống dưới một ngày.",
            error: "Không có dữ kiện nào nói thời gian duyệt. Đây là con số AI bịa cho nghe thuyết phục.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản đã soát, nhưng anh Long nhắn riêng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã sửa xong và định gửi. Anh Long nhóm kho nhắn: 'Phiếu nhập kho của mình cũng dùng biểu mẫu mới à?' Thông báo chưa nói rõ điều này.",
            choices: [
              { label: "Trả lời riêng anh Long 'không đâu' rồi gửi thư như cũ", next: "bad_private" },
              { label: "Thêm một dòng 'phiếu nhập kho không đổi' vào thông báo rồi mới gửi", next: "s2" },
            ],
          },
          bad_private: {
            text: "Bốn người khác trong nhóm kho hiểu nhầm giống anh Long và lần lượt nhắn hỏi. Bạn trả lời lặp lại cùng một câu bốn lần.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thêm dòng đó. Trước khi gửi, bạn thấy AI ghi 'nhóm kế toán duyệt trong ngày'. Bạn chưa hỏi kế toán về điều này.",
            choices: [
              { label: "Giữ lại vì nghe hợp lý và chắc kế toán sẽ cố gắng làm được", next: "bad_promise" },
              { label: "Xoá cho tới khi bạn xác nhận với kế toán, chỉ ghi điều đã biết", next: "good" },
            ],
          },
          bad_promise: {
            text: "Tuần đầu kế toán duyệt trong ba ngày. Cả nhóm cho rằng bạn nói sai và phàn nàn về thay đổi.",
            ending: "bad",
          },
          good: {
            text: "Thông báo chỉ chứa điều bạn đã biết. Anh Long và cả nhóm kho không phải hỏi lại, kế toán cũng không bị hứa thay.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đọc bản nháp bằng mắt người nhận: có tới tôi không, tôi phải làm gì.",
          "Chỗ thiếu và chỗ AI tự thêm là hai loại lỗi cần tìm.",
          "Việc hôm nay: đọc lại một thông báo cũ qua bốn câu hỏi.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 18 ─────────────────────────
  {
    id: 2077,
    slug: "tra-loi-khi-nhom-lo-lang-ve-thay-doi",
    title: "Chặng 33, Bài 18: Cả nhóm lo lắng sau một thay đổi và ai cũng hỏi bạn",
    subtitle: "Một hướng dẫn viên giỏi khi xe hỏng nói rõ: đã biết gì, chưa biết gì, và không hứa gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau thông báo, câu hỏi ập tới đúng lúc bạn bận nhất. Trả lời vội bằng lời hứa 'không sao đâu' nghe dễ chịu, nhưng nếu sau này khác đi thì bạn mất lòng tin. Phân biệt ba loại câu trả lời giúp bạn thật thà mà vẫn trấn an được.",
    openingQuestion:
      "Sau thông báo đổi cách chia ca, một bạn hỏi bạn: 'Chị ơi, có ai bị giảm ca làm không?' Bạn chưa biết chắc vì ban quản lý chưa chốt. Câu trả lời nào đúng nhất?",
    openingOptions: [
      "Chưa chốt được; tôi sẽ báo lại vào thứ Sáu khi có thông tin",
      "Không ai bị giảm ca đâu, mọi người yên tâm làm việc",
      "Tôi cũng không rõ lắm, bạn đừng hỏi nữa kẻo mọi người lo lắng thêm",
      "Có, sẽ có người bị giảm, nhưng tôi chưa biết là ai",
    ],
    correctOption: 0,
    explanation:
      "Câu đúng có ba phần: điều chưa biết, lý do chưa biết, và mốc bạn sẽ quay lại. Nói 'không ai bị giảm' là hứa điều bạn không nắm; nếu sau đó khác đi, bạn mất lòng tin của cả nhóm. Gạt câu hỏi đi làm người hỏi lo hơn. Còn nói 'có người bị giảm' là khẳng định một điều bạn cũng chưa biết, cũng là bịa theo hướng xấu.",
    diagram: [
      { label: "Nghe câu hỏi và điều đang lo", arrow: true },
      { label: "Phân loại: đã biết, chưa biết, không được hứa", arrow: true },
      { label: "Trả lời đúng loại, nêu mốc quay lại", arrow: true },
      { label: "Ghi câu hỏi và làm đúng lời hẹn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Sau khi công ty thông báo thay đổi cách chia ca, một trưởng nhóm bán lẻ được hỏi 'có ai bị giảm giờ không'. Cô trả lời 'chưa chốt, thứ Sáu chị báo' và đúng thứ Sáu nhắn lại dù chưa có thông tin mới. Nhóm chấp nhận, vì họ biết chắc lúc nào có câu trả lời. Đây là tình huống minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      q(
        "Ba loại câu trả lời thật thà khi nhóm hỏi về thay đổi là gì?",
        "Điều đã biết, điều chưa biết kèm mốc báo lại, và điều không được hứa",
        [
          "Điều hay, điều dở, và điều để mặc mọi người tự đoán",
          "Điều chắc chắn tốt, điều có thể tốt, và điều nên giấu",
          "Điều cấp trên nói, điều đồng nghiệp nói, điều bạn nghĩ",
        ],
        "Ba loại này giúp bạn chỉ nói điều mình nắm. 'Hay và dở' là đánh giá chứ không phải trạng thái thông tin. Giấu thông tin hay để người ta tự đoán khiến tin đồn chạy thay bạn, còn phân loại theo người nói thì không cho biết điều nào bạn thật sự chắc.",
      ),
      q(
        "Người hỏi nói: 'Có ai mất việc không?' Bạn thật sự không biết. Câu nào đúng?",
        "Tôi chưa có thông tin về việc đó, thứ Sáu tôi hỏi và báo lại",
        [
          "Không đâu, cấp trên chỉ đổi cách làm thôi, cứ yên tâm",
          "Chuyện đó nhạy cảm nên tôi xin phép không trả lời câu hỏi nào",
          "Có thể có, bạn nên bắt đầu tìm việc khác từ bây giờ để chủ động",
        ],
        "Thật thà nhưng không hứa là cách duy nhất giữ lòng tin. 'Không đâu' là lời hứa bạn không nắm. Từ chối trả lời làm nỗi lo lớn hơn, còn khuyên tìm việc khác là suy đoán gây hoảng loạn khi bạn chưa có dữ kiện.",
      ),
      q(
        "Vì sao nên nêu một mốc khi trả lời 'chưa biết'?",
        "Người hỏi biết khi nào có tin, nên bớt hỏi lại",
        [
          "Vì mốc càng xa thì áp lực trả lời của bạn càng giảm hẳn",
          "Vì có mốc nghĩa là sau đó bạn không cần nói gì thêm nữa",
          "Vì mốc thể hiện bạn đã biết câu trả lời chỉ chưa tiện nói",
        ],
        "Mốc biến 'chưa biết' thành 'biết khi nào sẽ biết', và người hỏi không phải đoán hay hỏi lại. Nhưng bạn phải giữ đúng mốc, kể cả khi chưa có gì mới thì cũng nhắn báo. Mốc xa chỉ kéo dài lo lắng, và nó không hề ngụ ý bạn đang giấu điều gì.",
      ),
      q(
        "AI có thể giúp gì khi bạn soạn câu trả lời cho nhóm đang lo lắng?",
        "Gợi ý cách diễn đạt từ những gì bạn ghi là đã biết",
        [
          "Cho biết câu trả lời thật của ban quản lý về việc chưa chốt",
          "Dự đoán chính xác ban quản lý sẽ quyết định thế nào tuần tới",
          "Xác nhận với nhóm rằng mọi chuyện sẽ ổn",
        ],
        "AI chỉ diễn đạt lại dữ kiện bạn cung cấp. Nó không biết quyết định của ban quản lý, không dự đoán được, và không nên thay bạn hứa hẹn. Nếu bạn đưa phần 'chưa biết', nó vẫn có thể viết ra lời hứa cho có vẻ trọn vẹn, nên phải soát lại.",
      ),
      q(
        "Nhiều người hỏi cùng một câu. Cách xử lý hợp lý nhất là gì?",
        "Gửi một câu trả lời chung cho cả nhóm, nêu rõ mốc báo lại",
        [
          "Trả lời riêng từng người để mỗi người cảm thấy được coi trọng",
          "Đợi tới khi có thông tin đầy đủ rồi mới nói với bất kỳ ai",
          "Chỉ trả lời người hỏi to nhất, mọi người khác sẽ tự nghe thấy",
        ],
        "Một câu chung đảm bảo mọi người nghe cùng một nội dung, bạn khỏi trả lời lặp lại và tin đồn ít chỗ len vào. Trả lời riêng dễ khiến mỗi người nghe một phiên bản hơi khác. Im lặng chờ đủ tin làm nỗi lo lớn lên, còn chọn người hỏi to nhất bỏ sót những người ngại hỏi.",
      ),
    ],
    keyTakeaways: [
      "Chia câu hỏi thành ba loại: đã biết, chưa biết, không được hứa.",
      "'Chưa biết' luôn đi kèm lý do và một mốc báo lại.",
      "Không hứa điều bạn không nắm, dù nó nghe rất trấn an.",
      "Trả lời chung cho cả nhóm để mọi người nghe cùng một điều.",
      "AI diễn đạt dữ kiện của bạn, không thay bạn quyết định điều gì được nói.",
    ],
    practicePrompt: {
      question:
        "Nhóm hỏi: 'Bao giờ thì có hướng dẫn chi tiết?' Bạn biết ban quản lý hứa 'trong tuần này' nhưng chưa có ngày. Câu nào đúng?",
      options: [
        "Ban quản lý nói trong tuần này, chưa có ngày cụ thể; thứ Tư tôi báo lại",
        "Thứ Tư sẽ có hướng dẫn chi tiết, mọi người yên tâm chờ nhé",
        "Cũng chưa biết, khi nào có thì có, các bạn cứ làm việc bình thường",
        "Chắc là đầu tuần sau, vì thường các đợt trước cũng ra chậm vài ngày mà thôi",
      ],
      correct: 0,
      explanation:
        "Câu đúng tách điều đã biết (trong tuần này) khỏi điều chưa biết (ngày cụ thể) và có mốc quay lại. Câu hai bịa ngày; câu ba không cho mốc nên người hỏi tiếp tục lo; câu bốn dự đoán từ thói quen và biến thành lời hứa mơ hồ.",
    },
    summary: {
      keyIdea: "Trấn an thật sự đến từ việc nói đúng điều mình biết, không đến từ lời hứa.",
      formula: "Đã biết + chưa biết (kèm lý do và mốc) + điều tôi không hứa được.",
      commonMistake: "Nói 'không sao đâu' để cho qua, rồi thực tế khác đi.",
      action: "Viết ba cột đã biết, chưa biết, không hứa cho một thay đổi đang diễn ra ở nhóm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thay đổi đang gây lo lắng ở nhóm bạn. Ghi ba cột: điều đã biết, điều chưa biết, điều bạn không được hứa. Với mỗi điều 'chưa biết', ghi mốc bạn sẽ báo lại. Nhờ AI viết một tin nhắn chung dưới 100 chữ từ ba cột đó, đọc lại để chắc không có lời hứa nào lẻn vào, rồi gửi. Ngày mai dashboard sẽ hỏi bạn đã gửi và giữ mốc chưa.",
      secondary: "Đặt nhắc trên lịch đúng mốc bạn đã hẹn, để không quên báo lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Thông báo vừa gửi xong, và trong mười phút bạn nhận năm tin nhắn hỏi cùng một điều: 'thế có ảnh hưởng tới em không?' Bạn chưa có câu trả lời chắc, nhưng ai cũng đang chờ.",
      },
      {
        type: "feynman",
        title: "Trấn an thật thà đơn giản hơn bạn nghĩ",
        intro:
          "Xe khách chạy giữa đường thì hỏng. Hướng dẫn viên giỏi không nói 'không sao đâu, năm phút nữa chạy'. Họ nói rõ: xe hỏng ở đâu, đã gọi thợ chưa, chưa biết bao lâu, và sẽ báo lại lúc mấy giờ.",
        columns: ["Loại thông tin", "Hướng dẫn viên trên xe hỏng", "Trưởng nhóm sau thay đổi"],
        rows: [
          ["Đã biết", "Xe hỏng lốp, đã gọi thợ", "Cách nộp phiếu đổi từ 6/10"],
          ["Chưa biết", "Thợ tới sau bao lâu, sẽ báo lúc 10 giờ", "Ca làm có đổi không, thứ Sáu báo"],
          ["Không được hứa", "Không nói 'năm phút là xong'", "Không nói 'không ai bị ảnh hưởng'"],
          ["Sau đó", "Đúng 10 giờ báo lại, dù chưa có tin mới", "Đúng thứ Sáu nhắn, dù chưa có tin mới"],
        ],
        oneLiner: "Trấn an bằng sự thật: điều đã biết, điều chưa biết kèm mốc, và không hứa điều không nắm.",
      },
      { type: "heading", text: "Vì sao lời hứa nhẹ nhàng lại nguy hiểm" },
      {
        type: "paragraph",
        text: "'Không sao đâu' làm người nghe dễ chịu trong năm phút. Nhưng nếu tuần sau thực tế khác, họ nhớ bạn đã nói gì và ngừng tin những lần bạn trấn an sau. Người đang lo thường không cần bạn chắc chắn; họ cần biết bạn đang nói thật và biết khi nào sẽ có thêm tin.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi dồn dập tới câu trả lời chung",
        steps: [
          { label: "Gom các câu hỏi", detail: "Chép các câu hỏi bạn nhận vào một danh sách, gộp những câu giống nhau. Thường chỉ còn ba đến năm câu." },
          { label: "Phân loại từng câu", detail: "Với mỗi câu: bạn đã biết chắc, chưa biết, hay là điều bạn không thể hứa. Ghi nguồn cho phần 'đã biết' để chắc mình không nhớ nhầm." },
          { label: "Soạn trả lời theo loại", detail: "Đã biết thì nói thẳng. Chưa biết thì nói vì sao và mốc báo lại. Không hứa được thì nói điều bạn có thể làm thay: hỏi giúp, cập nhật đúng hạn." },
          { label: "Nhờ AI làm mượt, rồi soát lời hứa", detail: "AI viết lại cho ngắn và thân thiện. Bạn đọc từng câu tìm lời hứa hoặc ngày AI tự thêm." },
          { label: "Gửi chung và giữ mốc", detail: "Gửi một lần cho cả nhóm, đặt nhắc đúng mốc và báo lại đúng lúc, kể cả khi chưa có tin mới." },
        ],
      },
      {
        type: "list",
        items: [
          "Đã biết: nói ngắn, chính xác, kèm nguồn nếu cần.",
          "Chưa biết: 'chưa có thông tin về việc này, vì ban quản lý chưa chốt; thứ Sáu mình báo lại'.",
          "Không hứa được: 'mình không thể hứa điều này, nhưng mình sẽ hỏi và nói lại đúng như mình nghe'.",
          "Không bịa để lấp im lặng, không đoán bằng 'chắc là'.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trấn an bằng lời hứa",
          text: "'Không ai bị ảnh hưởng đâu, yên tâm nhé.' Người nghe nhẹ lòng năm phút. Nếu sau đó có ảnh hưởng, họ nhớ đúng câu này.",
        },
        right: {
          label: "Trấn an bằng sự thật",
          text: "'Mình biết thay đổi bắt đầu 6/10. Ca làm chưa chốt; thứ Sáu mình báo lại. Mình không hứa trước điều mình chưa biết.'",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Với chuyện nhạy cảm như việc làm, thu nhập hay quy định, bạn không nên trả lời thay bộ phận nhân sự hay pháp chế. Hãy nói 'mình sẽ hỏi bộ phận nhân sự' và đưa họ một mốc.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin trả lời chung cho nhóm",
        task: "Sau thông báo đổi cách chia ca, nhóm hỏi ba điều. Đã biết: đổi từ 6/10. Chưa biết: ca làm cụ thể, ban quản lý chưa chốt. Không hứa được: có ai bị giảm giờ hay không. Lắp prompt để AI soạn một tin chung.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Nhóm đang lo, hãy viết tin trấn an cho mọi người.", feedback: "AI không biết điều nào chắc điều nào chưa, nên sẽ tự hứa cho trọn vẹn." },
              { text: "Đã biết: đổi từ 6/10. Chưa biết: ca cụ thể. Không hứa được: chuyện giảm giờ. Tôi báo lại thứ Sáu.", good: true, feedback: "AI có ba loại thông tin nên câu trả lời không thể lẫn 'chưa biết' vào 'đã biết'." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Viết sao cho mọi người yên tâm nhất có thể.", feedback: "'Yên tâm nhất có thể' là lệnh để AI hứa những điều không ai biết." },
              { text: "Không được hứa điều nào không có trong dữ kiện; không đoán, không dùng 'chắc là'.", good: true, feedback: "Cấm hứa và cấm đoán chặn đúng lỗi AI hay mắc khi muốn làm người đọc dễ chịu." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một bài dài, thật chân thành.", feedback: "Bài dài làm người đang lo lắng phải tìm câu trả lời trong nhiều đoạn văn." },
              { text: "Ba dòng ngắn: đã biết, chưa biết kèm mốc, và điều tôi không hứa. Giọng thân thiện.", good: true, feedback: "Ba dòng theo ba loại giúp người lo lắng thấy ngay câu trả lời cho điều mình hỏi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "rule", "format"],
            text: "Các bạn ơi, mình trả lời chung nhé:\n- Đã biết: cách chia ca mới bắt đầu từ 6/10.\n- Chưa biết: ca cụ thể của từng người, ban quản lý chưa chốt; thứ Sáu mình báo lại.\n- Mình chưa hứa được chuyện giờ làm; mình sẽ hỏi và nói đúng như mình nghe.",
          },
          {
            requires: ["facts"],
            text: "Chào các bạn, mình hiểu mọi người đang lo. Cách chia ca mới bắt đầu từ 6/10, còn ca cụ thể thì mình sẽ báo sau. Mình tin mọi thứ sẽ ổn thôi và cả nhóm sẽ thích nghi nhanh...\n\n(Có dữ kiện nhưng thêm câu 'mọi thứ sẽ ổn thôi', một lời hứa không ai đảm bảo được.)",
          },
          {
            text: "Các bạn yên tâm nhé, không ai bị giảm giờ, ca làm mới sẽ được thông báo vào thứ Tư và còn tốt hơn ca cũ.\n\n(AI không có dữ kiện nên bịa cả ba điều: 'không ai giảm giờ', 'thứ Tư', 'tốt hơn'. Nếu gửi, bạn đã hứa thay ban quản lý.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bốn người hỏi cùng một câu, bạn chưa có tin",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng thứ Ba, bốn người nhắn riêng hỏi: 'Ca mới của em thế nào?' Ban quản lý nói thứ Sáu mới chốt. Bạn mở khung chat với nhóm.",
            choices: [
              { label: "Nhắn chung: 'Ca mới thứ Sáu chốt, mình sẽ báo ngay khi có, chưa hứa được ca cụ thể'", next: "s2" },
              { label: "Nhắn chung: 'Đừng lo, ca mới chắc không khác nhiều đâu'", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Thứ Sáu ca mới khác khá nhiều với ca cũ. Hai người nhớ câu 'chắc không khác nhiều' và cho rằng bạn giấu họ.",
            ending: "bad",
          },
          s2: {
            text: "Nhóm bớt nhắn hỏi. Thứ Sáu tới, ban quản lý lùi việc chốt ca sang tuần sau, nên bạn vẫn chưa có gì để báo.",
            choices: [
              { label: "Im lặng chờ tới khi có tin chính thức rồi báo một lần", next: "bad_silent" },
              { label: "Vẫn nhắn đúng thứ Sáu: 'Chưa chốt, tuần sau mình báo lại', kèm một mốc mới", next: "good" },
            ],
          },
          bad_silent: {
            text: "Thứ Sáu trôi qua không ai nhận được gì. Nhóm bắt đầu đồn đoán và nhiều người nghĩ tin xấu đang bị giấu.",
            ending: "bad",
          },
          good: {
            text: "Dù không có tin mới, nhóm biết bạn giữ lời và biết mốc kế tiếp. Số tin nhắn riêng giảm hẳn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nói đúng điều biết, điều chưa biết kèm mốc, và không hứa điều không nắm.",
          "Giữ mốc đã hẹn, kể cả khi chưa có tin mới.",
          "Việc hôm nay: viết ba cột đã biết, chưa biết, không hứa cho một thay đổi ở nhóm bạn.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 19 ─────────────────────────
  {
    id: 2078,
    slug: "giu-ba-gio-tap-trung-moi-tuan",
    title: "Chặng 33, Bài 19: Tìm ba giờ tập trung mỗi tuần khi lịch kín họp",
    subtitle: "Giờ trong tuần giống ngăn kéo: nếu không xếp, nó tự đầy bằng những thứ nhỏ nhất.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⏳",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người dẫn dắt thường là người bị chia nhỏ thời gian nhất: họp, xin ý kiến, trả lời tin nhắn. Nếu không có vài giờ liền để suy nghĩ, việc quan trọng như kế hoạch hoặc phản hồi nhóm cứ bị đẩy sang tuần sau. Nhìn thời gian bằng số giúp bạn cắt đúng chỗ.",
    openingQuestion:
      "Lịch tuần của bạn kín họp và bạn nhờ AI: 'Xếp cho tôi thời gian tập trung.' Bạn chưa đưa danh sách cuộc họp. Điều gì rất dễ xảy ra?",
    openingOptions: [
      "AI đề xuất lịch nghe hợp lý nhưng dựa trên cuộc họp nó tự nghĩ ra",
      "AI từ chối trả lời vì không có quyền truy cập vào lịch làm việc của bạn",
      "AI tự động huỷ các cuộc họp không cần thiết trong lịch của bạn",
      "AI trả về đúng lịch tuần của bạn nhưng đã sắp xếp lại giờ",
    ],
    correctOption: 0,
    explanation:
      "Không có dữ kiện, AI vẫn tạo ra một câu trả lời trôi chảy: nó bịa các cuộc họp trung bình rồi đề xuất dựa trên chúng. Nó không tự thấy lịch của bạn và không thể huỷ cuộc họp nào; công cụ chỉ làm được những gì bạn cho nó làm. Muốn đề xuất dùng được, bạn phải dán danh sách thật: cuộc họp nào, bao lâu, mục đích, ai dự.",
    diagram: [
      { label: "Ghi lại giờ họp thật trong tuần", arrow: true },
      { label: "Nhìn ngày nào và cuộc nào ngốn giờ", arrow: true },
      { label: "Nhờ AI đề xuất bỏ, gộp, rút ngắn", arrow: true },
      { label: "Bạn quyết định rồi chặn giờ trên lịch" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng phòng kinh doanh ghi lại giờ họp một tuần và thấy 14 giờ, trong đó ba cuộc lặp lại hằng tuần không ai nhớ mục đích. Chị đề nghị gộp hai cuộc và chuyển một cuộc thành báo cáo viết, rồi chặn ba giờ sáng thứ Ba, thứ Năm. Số liệu này là minh hoạ; chính việc tự ghi lại mới cho bạn con số thật.",
    },
    quiz: [
      q(
        "Bước đầu tiên để tìm ba giờ tập trung là gì?",
        "Ghi lại giờ họp thật trong tuần vừa rồi",
        [
          "Xin sếp cho không phải họp vào các buổi sáng thứ Ba và thứ Năm",
          "Chặn ba giờ trống trên lịch rồi từ chối mọi cuộc họp trùng với nó",
          "Nhờ AI xếp một lịch lý tưởng rồi cố gắng làm theo đúng từng giờ",
        ],
        "Không biết thời gian đang đi đâu thì mọi thay đổi đều là đoán. Xin không họp cả buổi mà chưa có số là khó thuyết phục. Chặn giờ trống rồi từ chối tất cả làm bạn đụng đầu với người khác, còn lịch lý tưởng của AI không xuất phát từ tuần thật của bạn.",
      ),
      q(
        "Trong lịch có 12 giờ họp, 3 giờ là họp lặp lại không ai nhớ mục đích. Nên xử lý thế nào?",
        "Hỏi từng người dự xem cuộc họp có còn cần không",
        [
          "Huỷ luôn cả ba vì họp lặp thường vô ích",
          "Giữ nguyên hết vì sợ người khác phản đối",
          "Dời cả ba sang chiều thứ Sáu cho đỡ vướng",
        ],
        "Không nhớ mục đích không có nghĩa là vô ích; có thể đó là nơi ai đó vẫn nhận thông tin quan trọng. Hỏi những người dự trước khi huỷ để tránh bỏ mất điều cần. Giữ hết thì không tìm ra được giờ nào; dời sang thứ Sáu chỉ chuyển vấn đề chứ không giải quyết.",
      ),
      q(
        "Bạn dán danh sách 8 cuộc họp và nhờ AI đề xuất. AI đề xuất 'huỷ cuộc họp X vì trùng nội dung'. Nên làm gì?",
        "Tự kiểm tra xem X có thật sự trùng nội dung không rồi mới quyết",
        [
          "Huỷ ngay vì AI đã đọc nội dung cả tám cuộc họp trước khi đề xuất",
          "Bỏ qua mọi đề xuất huỷ vì AI không hiểu công việc của nhóm",
          "Gửi luôn đề xuất của AI cho những người dự để họ tự quyết định",
        ],
        "AI chỉ thấy tiêu đề và mô tả bạn dán; 'trùng nội dung' là phỏng đoán từ đó. Bạn biết ngữ cảnh nên là người kiểm và quyết. Huỷ ngay là tin vào phỏng đoán, bỏ qua mọi đề xuất là phí phần nó làm tốt, còn gửi thẳng đề xuất của AI cho người khác là chuyển bản nháp chưa soát thành ý kiến của bạn.",
      ),
      q(
        "Biểu đồ giờ họp theo ngày cho thấy thứ Tư có nhiều giờ họp nhất. Điều này giúp gì cho bạn?",
        "Bạn thấy ngày nào nên bảo vệ và ngày nào đã kín",
        [
          "Nó chứng minh thứ Tư kém hiệu quả nhất",
          "Nó cho biết bạn nên bỏ hẳn thói quen tổ chức cuộc họp vào thứ Tư",
          "Nó cho thấy cả nhóm cũng có lịch họp dày vào thứ Tư như bạn vậy",
        ],
        "Biểu đồ chỉ cho thấy phân bố giờ họp của riêng bạn: ngày nào đã kín thì tìm giờ tập trung ở ngày khác. Nó không đo hiệu quả, không nói rằng phải bỏ thói quen nào, và cũng không cho biết lịch của người khác trong nhóm.",
      ),
      q(
        "Vì sao ba giờ tập trung nên là ít đoạn dài thay vì nhiều đoạn 15 phút?",
        "Việc cần suy nghĩ sâu cần thời gian liền mạch",
        [
          "Vì 15 phút không đủ để nhắn một tin",
          "Vì đoạn dài dễ chặn trên lịch hơn còn đoạn ngắn thì không chặn được",
          "Vì ít đoạn dài giúp bạn tránh được toàn bộ email và tin nhắn",
        ],
        "Viết kế hoạch, soạn phản hồi hay suy nghĩ về quyết định cần thời gian liền để vào guồng; đoạn 15 phút bị chia nhỏ hay dừng giữa chừng. Việc đó không liên quan tới chặn lịch, và ba giờ liền cũng không ngăn được tin nhắn: bạn vẫn phải đặt trạng thái không làm phiền.",
      ),
    ],
    keyTakeaways: [
      "Ghi giờ họp thật trước khi tìm cách giảm.",
      "Dán danh sách cuộc họp thật cho AI; nếu không nó sẽ bịa lịch.",
      "AI đề xuất bỏ, gộp, rút ngắn; bạn kiểm ngữ cảnh rồi mới quyết.",
      "Hỏi người dự trước khi huỷ một cuộc họp lặp lại.",
      "Ba giờ tập trung nên là ít đoạn liền, và phải chặn trên lịch.",
    ],
    practicePrompt: {
      question:
        "Lịch tuần: họp 3 giờ (thứ Hai), 2 giờ (thứ Ba), 4 giờ (thứ Tư), 2 giờ (thứ Năm), 1 giờ (thứ Sáu). Bạn muốn một ngày ít họp nhất để giữ ba giờ tập trung. Chọn ngày nào?",
      options: [
        "Thứ Sáu, vì ngày đó chỉ có 1 giờ họp",
        "Thứ Tư, vì ngày họp dài nhất nên cần thêm thời gian tập trung",
        "Thứ Hai, vì ngày đầu tuần luôn phù hợp nhất để làm việc sâu",
        "Thứ Năm, vì 2 giờ họp nằm ở giữa của các ngày còn lại",
      ],
      correct: 0,
      explanation:
        "Thứ Sáu chỉ có 1 giờ họp, nên dễ giữ ba giờ liền nhất mà không phải bỏ cuộc họp nào. Thứ Tư kín nhất (4 giờ) nên khó, thứ Hai có 3 giờ họp, và 'ở giữa' không phải là lý do để chọn. Con số chỉ hữu ích khi bạn đọc đúng ngày ít họp.",
    },
    summary: {
      keyIdea: "Muốn có giờ tập trung, trước hết phải thấy thời gian đang đi đâu, bằng số thật.",
      formula: "Giờ họp thật theo ngày → ngày ít họp nhất → bỏ / gộp / rút ngắn → chặn lịch.",
      commonMistake: "Nhờ AI xếp lịch lý tưởng mà không đưa danh sách cuộc họp thật.",
      action: "Ghi lại giờ họp mỗi ngày của tuần này và tìm ngày ít họp nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch tuần này của bạn và ghi ra số giờ họp mỗi ngày. Chép danh sách các cuộc họp (tên, độ dài, ai dự, mục đích) rồi nhờ AI đề xuất cuộc nào có thể bỏ, gộp hoặc rút ngắn. Chọn một ngày, chặn trên lịch một khối ba giờ liền và đặt tên nó là việc cụ thể (ví dụ 'soạn kế hoạch quý'). Ngày mai dashboard sẽ hỏi bạn đã chặn giờ chưa.",
      secondary: "Không cần huỷ cuộc họp nào ngay hôm nay; chỉ cần hỏi người dự xem cuộc lặp lại có còn cần không.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, bạn nhìn lại: cả tuần trả lời, họp, xin ý kiến, mà bản kế hoạch quý vẫn chưa viết dòng nào. Bạn không lười; lịch của bạn không còn một khoảng trống đủ dài để nghĩ.",
      },
      {
        type: "feynman",
        title: "Giờ tập trung đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một ngăn kéo. Nếu bạn cứ nhét đồ vào mà không chừa chỗ, ngăn kéo đầy bằng những thứ nhỏ nhất. Giờ trong tuần của bạn cũng vậy: những việc nhỏ lấp đầy, còn việc lớn không có chỗ để đặt vào.",
        columns: ["Điều bạn thấy", "Ngăn kéo", "Lịch tuần của bạn"],
        rows: [
          ["Thứ hay lấp đầy", "Cuộn dây, pin cũ, giấy lẻ", "Họp ngắn, tin nhắn, xin ý kiến nhỏ"],
          ["Thứ bị đẩy ra", "Chiếc hộp lớn cần cả một ngăn", "Viết kế hoạch, soạn phản hồi, suy nghĩ"],
          ["Cách giữ chỗ", "Bỏ đồ cũ và đặt ngăn cho hộp lớn", "Bỏ, gộp, rút ngắn cuộc họp và chặn ba giờ liền"],
          ["Muốn chắc ngăn nào đầy", "Đổ ra và xem từng món", "Ghi lại giờ họp thật rồi xem từng ngày"],
        ],
        oneLiner: "Muốn có ba giờ tập trung, phải đổ ngăn kéo ra xem, rồi dọn và giữ chỗ trước.",
      },
      { type: "heading", text: "Nhìn thời gian bằng số" },
      {
        type: "paragraph",
        text: "Cảm giác 'họp cả ngày' thường đúng ở vài ngày và sai ở những ngày khác. Khi bạn ghi số giờ họp từng ngày, bạn thấy ngay ngày nào ít họp nhất và ngày nào không còn chỗ. Đó là cơ sở để chặn giờ, thay vì chặn bừa rồi bị cuộc họp khác lấn vào.",
      },
      {
        type: "chart",
        title: "Giờ họp theo ngày trong tuần (ví dụ)",
        caption: "Số liệu minh hoạ cho một tuần của một trưởng nhóm. Thay bằng số giờ họp thật của bạn để thấy ngày nào còn chỗ.",
        kind: "bar",
        yLabel: "Giờ họp",
        data: [
          { label: "Thứ Hai", values: [3] },
          { label: "Thứ Ba", values: [2] },
          { label: "Thứ Tư", values: [4] },
          { label: "Thứ Năm", values: [2] },
          { label: "Thứ Sáu", values: [1] },
        ],
        seriesLabels: ["Giờ họp (số liệu minh hoạ)"],
      },
      {
        type: "list",
        items: [
          "Bỏ: cuộc họp lặp lại mà không ai nhớ mục đích, sau khi hỏi những người dự.",
          "Gộp: hai cuộc họp cùng nhóm người, cùng chủ đề trong cùng tuần.",
          "Rút ngắn: từ 60 xuống 30 phút, hoặc từ họp thành báo cáo viết.",
          "Chặn: ba giờ liền trên lịch, có tên việc cụ thể, để người khác thấy bạn 'bận'.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhờ AI khi chưa đưa dữ kiện",
          text: "'Xếp cho tôi thời gian tập trung.' AI bịa các cuộc họp điển hình rồi đề xuất, nghe hợp lý nhưng không khớp với lịch thật của bạn.",
        },
        right: {
          label: "Nhờ AI khi đã dán danh sách",
          text: "Dán tên cuộc họp, độ dài, ai dự, mục đích. AI đề xuất bỏ, gộp, rút ngắn dựa trên chính danh sách đó, và bạn kiểm từng đề xuất.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Danh sách cuộc họp có thể chứa tên người và nội dung nhạy cảm. Chỉ dán tên cuộc họp, độ dài và mục đích chung vào công cụ AI công ty đã duyệt; bỏ qua phần bàn về lương, đánh giá hoặc khách hàng cụ thể.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI đề xuất cắt giờ họp",
        task: "Tuần của bạn có 12 giờ họp trong 8 cuộc, trong đó 3 cuộc lặp lại hằng tuần. Bạn muốn ba giờ tập trung liền để soạn kế hoạch quý. Lắp prompt để AI đề xuất.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              { text: "Lịch của tôi kín họp lắm, giúp tôi với.", feedback: "AI không thấy cuộc họp nào, nên sẽ bịa lịch điển hình rồi đề xuất." },
              { text: "Danh sách 8 cuộc họp tuần này: tên, độ dài, ai dự, mục đích; ba cuộc lặp lại hằng tuần là A, B, C.", good: true, feedback: "Có dữ liệu thật nên đề xuất bám vào đúng các cuộc họp của bạn." },
            ],
          },
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Tôi muốn giảm họp thật nhiều.", feedback: "'Thật nhiều' không có số nên AI đề xuất bỏ gần hết, kể cả cuộc họp quan trọng." },
              { text: "Tôi cần một khối ba giờ liền để soạn kế hoạch. Đề xuất cuộc nào có thể bỏ, gộp hoặc rút ngắn, kèm lý do và rủi ro.", good: true, feedback: "Có mục tiêu đo được và yêu cầu nêu rủi ro, nên đề xuất kiểm được." },
            ],
          },
          {
            id: "role",
            label: "Ranh giới",
            options: [
              { text: "Cứ quyết định thay tôi cuộc nào bỏ.", feedback: "AI không biết ngữ cảnh của từng cuộc họp; để nó quyết định là giao sai việc." },
              { text: "Chỉ đề xuất, không quyết định. Ghi rõ chỗ nào bạn đoán vì thiếu thông tin.", good: true, feedback: "Bạn giữ quyền quyết định và biết chỗ nào phải tự kiểm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "goal", "role"],
            text: "Đề xuất (bạn quyết định):\n1. Cuộc A (60 phút, lặp lại): rút xuống 30 phút, vì mục đích chỉ là cập nhật tiến độ. Rủi ro: người dự có thể muốn thảo luận.\n2. Cuộc B và C cùng nhóm người: gộp thành một cuộc 45 phút. Rủi ro: chưa rõ chủ đề có khác nhau không, cần hỏi người dự.\n3. Khối ba giờ liền: sáng thứ Sáu (ngày ít họp nhất).\nChỗ tôi đoán: cuộc B có thể quan trọng hơn mô tả.",
          },
          {
            requires: ["data"],
            text: "Bạn có thể bỏ cuộc A và cuộc C, gộp phần còn lại và giữ sáng thứ Sáu để tập trung. Nên giảm tổng thời gian họp khoảng một nửa.\n\n(Có danh sách thật nhưng thiếu ranh giới nên AI quyết định thay bạn và đưa ra con số 'một nửa' không có căn cứ.)",
          },
          {
            text: "Bạn nên bỏ các cuộc họp giao ban hằng ngày, họp tư vấn khách hàng thứ Tư và cuộc họp chiến lược thứ Năm để có ba giờ tập trung.\n\n(AI không có danh sách nên bịa tên cuộc họp không hề có trong lịch của bạn.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bạn đã có đề xuất, giờ làm sao?",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đề xuất bỏ cuộc họp lặp lại thứ Ba. Bạn không nhớ mục đích của nó. Cuộc họp này có bốn người dự, trong đó có chị Mai bên vận hành.",
            choices: [
              { label: "Huỷ luôn vì AI đề xuất và bạn cũng không nhớ mục đích", next: "bad_cancel" },
              { label: "Nhắn hỏi chị Mai và ba người dự xem họ còn cần cuộc họp này không", next: "s2" },
            ],
          },
          bad_cancel: {
            text: "Hoá ra đó là cuộc chị Mai báo trước lịch bảo trì. Tuần sau bạn bị bất ngờ vì hệ thống ngừng và phải xử lý gấp.",
            ending: "bad",
          },
          s2: {
            text: "Hai người trả lời: cuộc họp vẫn cần nhưng có thể rút xuống 30 phút. Bạn có ba giờ liền cần đặt vào lịch.",
            choices: [
              { label: "Ghi ba giờ vào lịch nhưng không đặt tên, chỉ để khoảng trống", next: "bad_blank" },
              { label: "Chặn khối ba giờ sáng thứ Sáu và đặt tên là 'soạn kế hoạch quý'", next: "good" },
            ],
          },
          bad_blank: {
            text: "Hai người thấy khoảng trống trên lịch và xếp cuộc họp vào đó. Ba giờ của bạn biến mất trước cả khi bạn dùng tới.",
            ending: "bad",
          },
          good: {
            text: "Khối có tên rõ ràng nên người khác ít xếp cuộc họp vào đó. Bạn có ba giờ tập trung đầu tiên trong tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghi giờ họp thật rồi mới quyết định cắt gì.",
          "AI đề xuất, bạn hỏi người dự rồi quyết.",
          "Việc hôm nay: chặn một khối ba giờ có tên cụ thể trên lịch tuần này.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 20 ─────────────────────────
  {
    id: 2079,
    slug: "mini-du-an-ke-hoach-cua-nguoi-dan-dat",
    title: "Chặng 33, Bài 20: Mini-dự án: kế hoạch một quý cho vai trò dẫn dắt của bạn",
    subtitle: "Ghép giao việc, 1-1, mục tiêu, nhật ký quyết định và giờ tập trung vào một trang.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn kỹ năng trong chặng này chỉ có tác dụng nếu chúng có chỗ trong tuần của bạn. Một kế hoạch một trang biến chúng thành lịch cụ thể. Và nhờ AI đóng vai người chất vấn sẽ cho bạn thấy chỗ hở trước khi sếp thấy.",
    openingQuestion:
      "Bạn đã viết kế hoạch một trang cho quý tới và nhờ AI: 'Đóng vai sếp, đánh giá kế hoạch này.' Bạn nhận về bản nhận xét rất khen ngợi. Bước hợp lý tiếp theo là gì?",
    openingOptions: [
      "Yêu cầu AI chỉ hỏi, không khen, và mỗi câu hỏi gắn với một mục trong kế hoạch",
      "Tin vào lời khen vì AI đã đọc cả kế hoạch của bạn",
      "Nhờ AI viết lại toàn bộ kế hoạch cho hay hơn",
      "Gửi kế hoạch cho sếp ngay vì AI cũng đã duyệt xong",
    ],
    correctOption: 0,
    explanation:
      "AI hay xu nịnh khi bạn hỏi mơ hồ 'đánh giá', vì nó chọn lời dễ nghe. Nhờ nó đóng vai người chất vấn và chỉ được đặt câu hỏi, mỗi câu gắn với một mục cụ thể, buộc nó tìm chỗ hở. Tin lời khen là bỏ mất điều bạn cần thấy. Nhờ viết lại cho hay hơn là đổi văn phong chứ không kiểm nội dung, còn gửi ngay thì cho sếp đọc thứ bạn chưa tự soát.",
    diagram: [
      { label: "Ghép bốn mảnh vào một trang", arrow: true },
      { label: "AI đóng vai sếp và chỉ hỏi", arrow: true },
      { label: "Bạn trả lời từng câu, sửa chỗ hở", arrow: true },
      { label: "Đặt lịch xem lại giữa quý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng nhóm mới viết kế hoạch quý gồm bốn phần: cách giao việc, lịch 1-1, mục tiêu và ba giờ tập trung. Khi nhờ AI chất vấn, câu hỏi 'nếu chị nghỉ hai tuần, ai duyệt phiếu?' làm chị nhận ra kế hoạch chưa có người thay thế. Chị bổ sung một dòng trước khi gặp sếp. Đây là tình huống minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      q(
        "Một kế hoạch một trang cho vai trò dẫn dắt nên gồm những mảnh nào từ chặng này?",
        "Cách giao việc, lịch 1-1, mục tiêu nhóm, nhật ký quyết định, giờ tập trung",
        [
          "Sơ đồ tổ chức, bảng lương, mô tả công việc, chính sách nghỉ phép",
          "Báo cáo tài chính, kế hoạch tuyển dụng, ngân sách đào tạo, cơ cấu thưởng",
          "Danh sách khách hàng, doanh số quý trước, giá bán, chương trình khuyến mãi",
        ],
        "Kế hoạch này nói về cách bạn dẫn dắt nhóm, nên mỗi mảnh là một thói quen lặp lại: giao việc, gặp riêng, đặt mục tiêu, ghi quyết định, giữ giờ tập trung. Sơ đồ tổ chức, bảng lương, tài chính hay danh sách khách hàng là nội dung của bộ phận khác chứ không phải thói quen dẫn dắt.",
      ),
      q(
        "Vì sao nên yêu cầu AI đóng vai sếp và 'chỉ hỏi, không khen'?",
        "Để buộc AI tìm chỗ hở thay vì chọn lời dễ nghe",
        [
          "Vì AI khen luôn sai và câu hỏi thì luôn đúng, nên không bao giờ lệch",
          "Vì chỉ khi AI hỏi thì mới có người quyết định thay cho bạn",
          "Vì khen sẽ làm tốn thêm nhiều từ trong phần giới hạn độ dài",
        ],
        "AI có xu hướng hùa theo người dùng, nên nhận xét mơ hồ thường thiên về khen. Chỉ cho hỏi buộc nó tìm điểm hở. Lời khen không phải luôn sai, và quyết định vẫn là của bạn. Chuyện độ dài cũng không phải lý do.",
      ),
      q(
        "AI hỏi: 'Nếu bạn nghỉ hai tuần thì ai duyệt phiếu?' Bạn nên làm gì?",
        "Trả lời thật; nếu chưa có câu trả lời, ghi nó thành việc phải làm",
        [
          "Trả lời 'sẽ có người thay' cho xong, vì AI chỉ đang hỏi cho có",
          "Bỏ câu hỏi vì AI không hiểu cơ cấu của nhóm của bạn",
          "Nhờ AI tự bịa câu trả lời rồi dán vào kế hoạch của bạn",
        ],
        "Câu hỏi này lộ ra một chỗ hở thật, nên phải trả lời thật hoặc biến nó thành việc: chọn người thay, ghi quyền duyệt. Trả lời qua loa che lỗ hổng chứ không lấp nó. AI có thể không rành cơ cấu nhưng câu hỏi về người thay thế là hợp lý với bất kỳ nhóm nào. Còn nhờ AI bịa đáp án thì kế hoạch chứa lời hứa không có thật.",
      ),
      q(
        "Điều gì cho thấy kế hoạch một trang của bạn đủ cụ thể?",
        "Mỗi mục có việc làm, có ngày hoặc tần suất và người chịu trách nhiệm",
        [
          "Kế hoạch dùng nhiều từ như 'tối ưu' và 'nâng cao' ở mọi mục",
          "Kế hoạch dài hơn một trang vì đã ghi đủ mọi việc có thể xảy ra",
          "Kế hoạch được AI khen và đánh giá là rất toàn diện",
        ],
        "Cụ thể là người đọc chỉ ra được: việc gì, bao lâu một lần hoặc trước ngày nào, ai làm. Từ như 'tối ưu' che chỗ chưa rõ. Dài hơn một trang không đồng nghĩa với đủ; lời khen của AI không đo được tính cụ thể.",
      ),
      q(
        "Khi nào nên xem lại kế hoạch một quý?",
        "Giữa quý, để chỉnh khi còn kịp",
        [
          "Chỉ vào cuối quý khi mọi việc đã xong và không thể thay đổi nữa",
          "Mỗi ngày để mọi thay đổi nhỏ đều được cập nhật ngay lập tức",
          "Không cần xem lại vì đã có AI kiểm tra kế hoạch từ đầu rồi",
        ],
        "Nhìn giữa quý là đủ sớm để sửa và đủ thưa để không thành gánh nặng. Chờ cuối quý thì chỉ còn tổng kết, xem mỗi ngày làm kế hoạch thành việc phải bảo trì liên tục, còn AI kiểm tra lần đầu không nói được điều gì sẽ thay đổi sau đó.",
      ),
    ],
    keyTakeaways: [
      "Kế hoạch một trang ghép năm mảnh: giao việc, 1-1, mục tiêu, nhật ký quyết định, giờ tập trung.",
      "Nhờ AI đóng vai sếp chỉ được hỏi, không được khen.",
      "Mỗi câu hỏi gắn với một mục để bạn biết sửa chỗ nào.",
      "Câu hỏi làm bạn thấy chỗ hở là câu hỏi tốt; ghi nó thành việc phải làm.",
      "Đặt lịch xem lại giữa quý.",
    ],
    practicePrompt: {
      question:
        "Kế hoạch của bạn ghi 'cải thiện việc giao việc trong quý này'. Cách sửa nào cụ thể nhất?",
      options: [
        "Mỗi việc giao cho nhóm có một trang: kết quả, hạn, mức chất lượng, ai quyết định",
        "Cố gắng giao việc rõ ràng hơn và theo dõi chặt hơn trong suốt quý",
        "Áp dụng công cụ AI cho toàn bộ quy trình giao việc của nhóm",
        "Tổ chức một buổi họp để cả nhóm cùng bàn cách giao việc tốt hơn",
      ],
      correct: 0,
      explanation:
        "Bản đầu có việc làm, có nội dung và áp dụng được ngay cho từng việc giao. 'Cố gắng rõ ràng hơn' không đo được, 'áp dụng AI cho toàn bộ quy trình' quá rộng và chưa nói gì về nội dung, còn 'tổ chức buổi họp' là việc chuẩn bị chứ chưa phải thay đổi cách giao việc.",
    },
    summary: {
      keyIdea: "Kế hoạch tốt là thứ người khác đọc xong chỉ ra được việc, tần suất và người làm.",
      formula: "Năm mảnh dẫn dắt + AI đóng vai người chất vấn + trả lời thật + xem lại giữa quý.",
      commonMistake: "Nhờ AI 'đánh giá' rồi tin lời khen thay vì bắt nó đặt câu hỏi.",
      action: "Viết kế hoạch một trang cho quý tới và nhờ AI chất vấn năm câu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết kế hoạch một trang cho quý tới, mỗi mảnh một dòng: cách giao việc, lịch 1-1 (tần suất, với ai), mục tiêu nhóm, cách ghi nhật ký quyết định, khối giờ tập trung. Nhờ AI đóng vai sếp và chỉ hỏi năm câu, mỗi câu gắn với một mục. Ghi câu trả lời của bạn và sửa kế hoạch ở chỗ hở. Ngày mai dashboard sẽ hỏi bạn tìm được chỗ hở nào.",
      secondary: "Đặt một lịch giữa quý để đọc lại kế hoạch và hỏi: mục nào đang chạy, mục nào chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học cách giao việc, phản hồi, đặt mục tiêu, ghi quyết định và giữ giờ tập trung. Nhưng nếu chúng chỉ nằm trong đầu, tuần sau bạn lại quay về cách cũ. Bài này ghép chúng thành một trang cho quý tới.",
      },
      {
        type: "feynman",
        title: "Kế hoạch một quý đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới lịch tập thể dục. 'Tôi sẽ khoẻ hơn' không có sức thúc đẩy. 'Thứ Ba, thứ Năm, sáng, chạy 30 phút' thì có: người ta biết việc gì, khi nào, bao lâu một lần.",
        columns: ["Điều cần có", "Lịch tập thể dục", "Kế hoạch một quý"],
        rows: [
          ["Việc cụ thể", "Chạy 30 phút", "Mỗi việc giao có một trang giao việc"],
          ["Tần suất", "Thứ Ba và thứ Năm", "1-1 hai tuần một lần với từng người"],
          ["Thời điểm", "Sáng sớm", "Ba giờ tập trung sáng thứ Sáu"],
          ["Người kiểm", "Bạn tập cùng", "AI đóng vai sếp chất vấn, và sếp thật"],
        ],
        oneLiner: "Kế hoạch tốt giống lịch tập: việc gì, khi nào, bao lâu một lần, ai kiểm.",
      },
      { type: "heading", text: "Năm mảnh, một trang" },
      {
        type: "paragraph",
        text: "Mỗi mảnh chỉ một hoặc hai dòng. Nếu một mục cần nửa trang, đó là dấu hiệu bạn chưa quyết rõ. Mục đích không phải để nộp cho ai, mà để mỗi thứ Hai bạn nhìn vào và biết tuần này mình sẽ làm gì khác với tuần trước.",
      },
      {
        type: "flow",
        title: "Từ năm mảnh tới kế hoạch đã qua chất vấn",
        steps: [
          { label: "Viết năm mảnh", detail: "Mỗi mảnh một hoặc hai dòng: cách giao việc, lịch 1-1, mục tiêu nhóm, cách ghi quyết định, khối giờ tập trung. Ghi tần suất và tên người cụ thể." },
          { label: "Đưa AI vai chất vấn", detail: "Dán kế hoạch, nói AI đóng vai một sếp công bằng nhưng khó tính, chỉ được hỏi, không khen, không viết lại kế hoạch." },
          { label: "Trả lời từng câu", detail: "Mỗi câu hỏi gắn với một mục. Nếu bạn không trả lời được, ghi câu đó thành việc phải làm." },
          { label: "Sửa chỗ hở", detail: "Chỉ sửa những chỗ câu hỏi làm lộ ra thật sự. Không sửa thứ gì chỉ vì AI hỏi." },
          { label: "Đặt lịch xem lại", detail: "Chặn 30 phút giữa quý để đọc lại kế hoạch và chọn mục cần chỉnh." },
        ],
      },
      {
        type: "list",
        items: [
          "Giao việc: mỗi việc một trang (kết quả, hạn, mức chất lượng, ai quyết định).",
          "1-1: bao lâu một lần, với ai, bao lâu mỗi buổi.",
          "Mục tiêu nhóm: hai đến ba mục tiêu, mỗi mục một cách đo.",
          "Nhật ký quyết định: quyết định gì, ngày nào, dựa vào gì.",
          "Giờ tập trung: khối ba giờ liền có tên việc cụ thể.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch mơ hồ",
          text: "'Cải thiện giao việc, tăng cường trao đổi, nâng cao hiệu quả nhóm.' Người đọc không chỉ ra được việc nào, khi nào, ai làm.",
        },
        right: {
          label: "Kế hoạch cụ thể",
          text: "'Mỗi việc giao có một trang. 1-1 hai tuần một lần, 30 phút. Ba giờ sáng thứ Sáu soạn kế hoạch. Nhật ký quyết định ghi trong thư mục Chung.'",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "AI đóng vai sếp không biết sếp thật của bạn muốn gì. Nó chỉ cho bạn thấy chỗ hở nói chung. Câu hỏi nào hợp với nhóm bạn, chỉ bạn biết; và người duyệt cuối cùng vẫn là sếp thật.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI đóng vai sếp chất vấn kế hoạch",
        task: "Bạn có kế hoạch một trang với năm mục. Lắp prompt để AI đóng vai sếp và chất vấn, không viết lại thay bạn.",
        parts: [
          {
            id: "input",
            label: "Đầu vào",
            options: [
              { text: "Tôi có một kế hoạch cho quý tới, bạn đánh giá đi.", feedback: "AI không thấy kế hoạch nên sẽ đánh giá một kế hoạch tưởng tượng." },
              { text: "Dán kế hoạch năm mục của bạn: giao việc, 1-1, mục tiêu, nhật ký quyết định, giờ tập trung.", good: true, feedback: "AI có nội dung thật để chất vấn." },
            ],
          },
          {
            id: "role",
            label: "Vai và luật",
            options: [
              { text: "Hãy đóng vai người thân thiện, góp ý nhẹ nhàng giúp tôi.", feedback: "Vai thân thiện khiến AI khen nhiều hơn hỏi." },
              { text: "Đóng vai sếp công bằng nhưng khó tính. Chỉ được đặt câu hỏi, không khen, không viết lại kế hoạch.", good: true, feedback: "Vai rõ và luật chỉ hỏi buộc AI tìm chỗ hở." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Cho tôi nhiều câu hỏi nhất có thể.", feedback: "Nhiều câu hỏi lan man, và bạn không biết sửa mục nào." },
              { text: "Đúng năm câu, mỗi câu gắn với một mục và nêu rõ chỗ hở nó nhắm tới.", good: true, feedback: "Mỗi câu nhắm một mục nên bạn sửa được ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "role", "format"],
            text: "1. (Giao việc) Nếu người nhận không đồng ý với mức chất lượng ghi trong trang, ai quyết định cuối cùng?\n2. (1-1) Hai tuần một lần với tám người là bao nhiêu giờ mỗi tuần, và bạn lấy giờ đó ở đâu?\n3. (Mục tiêu) Hai mục tiêu có cách đo chưa, hay chỉ là mong muốn?\n4. (Nhật ký) Ai đọc nhật ký này và khi nào?\n5. (Giờ tập trung) Nếu sếp xếp họp trùng khối giờ đó, bạn xử lý thế nào?",
          },
          {
            requires: ["input"],
            text: "Kế hoạch của bạn rất toàn diện và cụ thể. Năm mục đều rõ ràng, thể hiện tầm nhìn tốt. Bạn chỉ cần chú ý thực hiện nhất quán.\n\n(Có kế hoạch nhưng thiếu vai và luật nên AI khen chung chung, không chỉ ra chỗ hở nào.)",
          },
          {
            text: "Bản kế hoạch quý của bạn có mục tiêu tăng doanh số 20% và triển khai hệ thống mới rất ấn tượng. Tôi thấy nó rất tốt.\n\n(AI không thấy kế hoạch nên bịa mục tiêu '20%' và 'hệ thống mới' không có trong kế hoạch của bạn.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Năm câu hỏi đã có, giờ làm gì?",
        start: "s1",
        nodes: {
          s1: {
            text: "AI hỏi: 'Hai tuần một lần với tám người là bao nhiêu giờ mỗi tuần?' Bạn nhẩm: bốn buổi mỗi tuần, mỗi buổi 30 phút, tức hai giờ. Bạn chưa xếp chỗ nào trong lịch.",
            choices: [
              { label: "Ghi 'sẽ sắp xếp' rồi tiếp tục vì lịch thì luôn xoay xở được", next: "bad_later" },
              { label: "Ghi hai giờ vào kế hoạch và chặn thử bốn khối 30 phút trong tuần tới", next: "s2" },
            ],
          },
          bad_later: {
            text: "Sau ba tuần, buổi 1-1 đầu tiên vẫn chưa diễn ra vì lịch luôn bị lấp bởi họp. Kế hoạch trở thành một trang giấy nằm trong thư mục.",
            ending: "bad",
          },
          s2: {
            text: "Bạn xem lại kế hoạch. Mục tiêu nhóm ghi 'tăng chất lượng', AI đã hỏi mục này có cách đo chưa nhưng bạn chưa trả lời.",
            choices: [
              { label: "Giữ nguyên vì 'chất lượng' ai cũng hiểu là gì", next: "bad_vague" },
              { label: "Hỏi nhóm và sếp xem 'chất lượng' đo bằng gì, rồi ghi số đo vào mục tiêu", next: "good" },
            ],
          },
          bad_vague: {
            text: "Cuối quý mỗi người hiểu 'chất lượng' một kiểu. Bạn không có gì để đối chiếu và buổi tổng kết thành tranh luận.",
            ending: "bad",
          },
          good: {
            text: "Mục tiêu có số đo, 1-1 có lịch chặn và kế hoạch được xem lại giữa quý. Bạn có một trang giấy thật sự chạy được.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm mảnh, một trang: giao việc, 1-1, mục tiêu, nhật ký, giờ tập trung.",
          "AI đóng vai sếp chỉ hỏi; bạn trả lời thật và sửa chỗ hở.",
          "Việc hôm nay: viết kế hoạch một trang và xin AI năm câu hỏi.",
        ],
      },
    ],
  },
];
